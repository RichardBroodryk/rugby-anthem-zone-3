// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER
// PHASE 5 — LIVE API PRIORITY ENGINE
//
// PURPOSE:
// - Highlightly is the live source of truth for match
//   status and scores.
// - Local matches2026 remains the fallback/curated
//   fixture source.
// - We deliberately fetch a rolling date window so that
//   completed matches do not disappear simply because
//   the calendar has moved to the next day.
// - Match details such as lineups, players, coaches,
//   officials and curated content remain in
//   matchDetails2026.ts.
// --------------------------------------------------

import type { MatchData } from "../data/matches/types";

import { matches2026 } from "./matches";

import { getCompetition } from "../contracts/competitionRegistry";
import { calculateImportance } from "../contracts/importanceEngine";
import { tournaments2026 } from "./tournamentMeta";

import { API_BASE_URL } from "../config/api";

/* ==================================================
   TYPES
   ================================================== */

type MatchType = "international" | "domestic";

type GetMatchesOptions = {
  type?: MatchType;
  gender?: "men" | "women";
  leagueId?: string;
  includeAll?: boolean;
};

/* ==================================================
   CONSTANTS
   ================================================== */

/*
 * We fetch a rolling window rather than TODAY only.
 *
 * Yesterday:
 *   keeps recently completed matches such as NZ vs Stormers
 *
 * Today:
 *   supplies today's live/upcoming matches
 *
 * Future:
 *   supplies the next fixtures so the Home page can
 *   automatically move to the next match.
 *
 * Seven days is enough for the Home / Match Centre
 * workflow without requesting an unnecessarily large
 * amount of data.
 */

const PAST_DAYS = 2;
const FUTURE_DAYS = 14;

/* ==================================================
   VALIDATION
   ================================================== */

function isValidStructure(match: MatchData): boolean {
  return (
    !!match.id &&
    !!match.date &&
    !!match.home?.name &&
    !!match.away?.name &&
    !!match.competitionId
  );
}

function isValidCompetition(match: MatchData): boolean {
  return (
    match.competitionId !== "unknown" &&
    !!getCompetition(match.competitionId)
  );
}

function isInternational(match: MatchData): boolean {
  const competition = getCompetition(match.competitionId);

  return competition?.category === "international";
}

function isDomestic(match: MatchData): boolean {
  const competition = getCompetition(match.competitionId);

  return competition?.category === "domestic";
}

/* ==================================================
   DATE HELPERS
   ================================================== */

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);

  result.setUTCDate(result.getUTCDate() + amount);

  return result;
}

/* ==================================================
   TOURNAMENT RESOLVER
   ================================================== */

function resolveTournamentInstanceId(
  match: MatchData
): string | undefined {
  if (!match.tournament) {
    return undefined;
  }

  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "");

  const matchKey = normalize(match.tournament);

  const found = tournaments2026.find((t) => {
    if (!t.matchKey) return false;

    return normalize(t.matchKey) === matchKey;
  });

  return found?.instanceId;
}

/* ==================================================
   SINGLE DATE API FETCH
   ================================================== */

async function fetchDateFromApi(
  date: string
): Promise<MatchData[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/stats/fixtures?date=${date}`
    );

    if (!response.ok) {
      throw new Error(
        `Fixture request failed for ${date}: HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.warn(
        "⚠️ FIXTURE RESPONSE WAS NOT AN ARRAY:",
        date,
        data
      );

      return [];
    }

    console.log(
      `🔥 HIGHLIGHTLY FIXTURES ${date}:`,
      data.length
    );

    return data;
  } catch (error) {
    console.warn(
      `⚠️ BACKEND FIXTURE FETCH FAILED FOR ${date}`,
      error
    );

    return [];
  }
}

/* ==================================================
   ROLLING API FETCH
   ================================================== */

async function fetchFromApi(
  _options?: GetMatchesOptions
): Promise<MatchData[]> {
  const today = new Date();

  const dates: string[] = [];

  for (
    let offset = -PAST_DAYS;
    offset <= FUTURE_DAYS;
    offset++
  ) {
    dates.push(
      formatDate(addDays(today, offset))
    );
  }

  /*
   * Fetch all dates concurrently.
   *
   * This means the adapter receives:
   * - recent completed games
   * - today's games
   * - upcoming games
   */

  const responses = await Promise.all(
    dates.map((date) => fetchDateFromApi(date))
  );

  const apiMatches = responses.flat();

  /*
   * Remove duplicate matches.
   *
   * Highlightly should normally give one record per
   * match, but this protects us if the same match appears
   * in overlapping data.
   */

  const unique = new Map<string, MatchData>();

  apiMatches.forEach((match) => {
    const key =
      match.matchKey ||
      String(match.id);

    unique.set(key, match);
  });

  const result = Array.from(unique.values());

  console.log(
    "🔥 HIGHLIGHTLY ROLLING MATCHES:",
    result.length
  );

  return result;
}

/* ==================================================
   MATCH ID / KEY RESOLUTION
   ================================================== */

function buildMatchKey(match: MatchData): string {
  if (match.matchKey) {
    return match.matchKey;
  }

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

  return `${normalize(
    match.home.name
  )}-vs-${normalize(match.away.name)}`;
}

/* ==================================================
   API PRIORITY MERGE
   ================================================== */

function mergeMatches(
  localMatches: MatchData[],
  apiMatches: MatchData[]
): MatchData[] {
  const mergedMap = new Map<string, MatchData>();

  /*
   * Start with local data.
   *
   * This preserves the curated fixture information
   * already built into matches2026.
   */

  localMatches.forEach((match) => {
    const key = buildMatchKey(match);

    mergedMap.set(key, match);
  });

  /*
   * Overlay Highlightly.
   *
   * Highlightly owns:
   * - live state
   * - final state
   * - score
   * - live fixture information
   */

  apiMatches.forEach((apiMatch) => {
    const key = buildMatchKey(apiMatch);

    const existing = mergedMap.get(key);

    if (!existing) {
      mergedMap.set(key, {
        ...apiMatch,
        matchKey: key,
      });

      return;
    }

    const apiHasPriority =
      apiMatch.state === "live" ||
      apiMatch.state === "final" ||
      !!apiMatch.score;

    if (apiHasPriority) {
      mergedMap.set(key, {
        ...existing,
        ...apiMatch,
        matchKey:
          apiMatch.matchKey ||
          existing.matchKey ||
          key,
      });

      return;
    }

    /*
     * If the API record does not contain a better
     * state/score, preserve the richer local record.
     */

    mergedMap.set(key, {
      ...apiMatch,
      ...existing,
      matchKey:
        existing.matchKey ||
        apiMatch.matchKey ||
        key,
    });
  });

  return Array.from(mergedMap.values());
}

/* ==================================================
   MAIN MATCH FETCH
   ================================================== */

export async function getMatches(
  options?: GetMatchesOptions
): Promise<MatchData[]> {
  let data: MatchData[];

  const apiData = await fetchFromApi(options);

  /*
   * IMPORTANT:
   *
   * We do NOT throw away local data merely because
   * Highlightly returned an empty response.
   *
   * Local data remains the fallback.
   */

  if (apiData.length === 0) {
    console.warn(
      "⚠️ USING LOCAL MATCHES ONLY"
    );

    data = matches2026;
  } else {
    data = mergeMatches(
      matches2026,
      apiData
    );
  }

  /* ==================================================
     VALIDATION
     ================================================== */

  let filtered = data.filter(
    isValidStructure
  );

  if (!options?.includeAll) {
    filtered = filtered.filter(
      isValidCompetition
    );
  }

  /* ==================================================
     TYPE FILTER
     ================================================== */

  if (options?.type === "international") {
    filtered = filtered.filter(
      isInternational
    );
  }

  if (options?.type === "domestic") {
    filtered = filtered.filter(
      isDomestic
    );
  }

  /* ==================================================
     GENDER FILTER
     ================================================== */

  if (options?.gender) {
    filtered = filtered.filter(
      (match) => {
        if (options.gender === "women") {
          return (
            match.gender === "women" ||
            match.home.name.includes(" W") ||
            match.away.name.includes(" W") ||
            match.competitionId
              .toLowerCase()
              .includes("women") ||
            match.tournament
              .toLowerCase()
              .includes("women")
          );
        }

        return !(
          match.gender === "women" ||
          match.home.name.includes(" W") ||
          match.away.name.includes(" W") ||
          match.competitionId
            .toLowerCase()
            .includes("women") ||
          match.tournament
            .toLowerCase()
            .includes("women")
        );
      }
    );
  }

  /* ==================================================
     LEAGUE / COMPETITION FILTER
     ================================================== */

  if (options?.leagueId) {
    const key =
      options.leagueId.toLowerCase();

    filtered = filtered.filter(
      (match) =>
        match.competitionId
          ?.toLowerCase() === key ||
        match.tournamentInstanceId
          ?.toLowerCase() === key ||
        match.tournament
          ?.toLowerCase()
          .replace(/\s+/g, "-") === key
    );
  }

  /* ==================================================
     SORT
     ================================================== */

  filtered.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  /* ==================================================
     FINAL NORMALIZATION
     ================================================== */

  return filtered.map((match) => {
    const tournamentInstanceId =
      match.tournamentInstanceId ||
      resolveTournamentInstanceId(match);

    return {
      ...match,

      matchKey:
        match.matchKey ||
        buildMatchKey(match),

      tournamentInstanceId,

      importance:
        calculateImportance(match),

      state:
        match.state ||
        (match.score
          ? "final"
          : "upcoming"),
    };
  });
}

/* ==================================================
   TOURNAMENT HELPER
   ================================================== */

export async function getTournamentMatches(
  tournament: {
    conceptId: string;
    gender?: "men" | "women" | "mixed";
    instanceId?: string;
    name?: string;
  }
): Promise<MatchData[]> {
  const allMatches =
    await getMatches({
      includeAll: true,

      gender:
        tournament.gender === "mixed"
          ? undefined
          : tournament.gender,
    });

  return allMatches
    .filter((match) => {
      /*
       * Direct concept match.
       */

      if (
        match.competitionId ===
        tournament.conceptId
      ) {
        return true;
      }

      /*
       * Tournament instance match.
       */

      if (
        tournament.instanceId &&
        match.tournamentInstanceId ===
          tournament.instanceId
      ) {
        return true;
      }

      /*
       * Tournament name match.
       */

      if (
        tournament.name &&
        match.tournament
          .toLowerCase() ===
          tournament.name.toLowerCase()
      ) {
        return true;
      }

      return false;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );
}