// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER
// PHASE 5 — LIVE API PRIORITY ENGINE
// --------------------------------------------------

import type { MatchData } from "../data/matches/types";

import { matches2026 } from "./matches";
import {
  getCompetition,
} from "../contracts/competitionRegistry";
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
   API FETCH
   ================================================== */

async function fetchFromApi(
  options?: GetMatchesOptions
): Promise<MatchData[] | null> {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const response = await fetch(
      `${API_BASE_URL}/api/stats/fixtures?date=${today}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const matches: MatchData[] = await response.json();

    if (!matches.length) {
      return null;
    }

    console.log(
      "🔥 HIGHLIGHTLY MATCHES:",
      matches.length
    );

    return matches;
  } catch (err) {
    console.warn(
      "BACKEND FIXTURE FETCH FAILED",
      err
    );

    return null;
  }
}

/* ==================================================
   API PRIORITY MERGE
   ================================================== */

function mergeMatches(
  localMatches: MatchData[],
  apiMatches: MatchData[]
): MatchData[] {
  const mergedMap = new Map<string, MatchData>();

  // Start with local
  localMatches.forEach((match) => {
    if (!match.matchKey) return;
    mergedMap.set(match.matchKey, match);
  });

  // API overrides local when it has better state / score
  apiMatches.forEach((apiMatch) => {
    if (!apiMatch.matchKey) return;

    const existing = mergedMap.get(apiMatch.matchKey);

    if (!existing) {
      mergedMap.set(apiMatch.matchKey, apiMatch);
      return;
    }

    const apiHasPriority =
      apiMatch.state === "live" ||
      apiMatch.state === "final" ||
      !!apiMatch.score;

    if (apiHasPriority) {
      mergedMap.set(apiMatch.matchKey, {
        ...existing,
        ...apiMatch,
      });
      return;
    }

    mergedMap.set(apiMatch.matchKey, {
      ...apiMatch,
      ...existing,
    });
  });

  return Array.from(mergedMap.values());
}

/* ==================================================
   MAIN
   ================================================== */

export async function getMatches(
  options?: GetMatchesOptions
): Promise<MatchData[]> {
  let data: MatchData[] = [];

  const apiData = await fetchFromApi(options);

  if (!apiData || apiData.length === 0) {
    console.warn("USING LOCAL MATCHES ONLY");
    data = matches2026;
  } else {
    data = mergeMatches(matches2026, apiData);
  }

  let filtered = data.filter(isValidStructure);

  if (!options?.includeAll) {
    filtered = filtered.filter(isValidCompetition);
  }

  if (options?.type === "international") {
    filtered = filtered.filter(isInternational);
  }

  if (options?.type === "domestic") {
    filtered = filtered.filter(isDomestic);
  }

  if (options?.gender) {
    filtered = filtered.filter((match) => {
      if (options.gender === "women") {
        return (
          match.gender === "women" ||
          match.home.name.includes(" W") ||
          match.away.name.includes(" W") ||
          match.competitionId.includes("women") ||
          match.tournament.toLowerCase().includes("women")
        );
      }

      return !(
        match.gender === "women" ||
        match.home.name.includes(" W") ||
        match.away.name.includes(" W") ||
        match.competitionId.includes("women") ||
        match.tournament.toLowerCase().includes("women")
      );
    });
  }

  if (options?.leagueId) {
    const key = options.leagueId.toLowerCase();

    filtered = filtered.filter(
      (m) =>
        m.competitionId?.toLowerCase() === key ||
        m.tournamentInstanceId?.toLowerCase() === key ||
        m.tournament?.toLowerCase().replace(/\s+/g, "-") === key
    );
  }

  filtered.sort(
    (a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return filtered.map((match) => {
    const tournamentInstanceId =
      match.tournamentInstanceId ||
      resolveTournamentInstanceId(match);

    return {
      ...match,
      tournamentInstanceId,
      importance: calculateImportance(match),
      state: match.state || (match.score ? "final" : "upcoming"),
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
  const allMatches = await getMatches({
    includeAll: true,
    gender:
      tournament.gender === "mixed"
        ? undefined
        : tournament.gender,
  });

  return allMatches
    .filter((match) => {
      if (match.competitionId === tournament.conceptId) {
        return true;
      }

      if (
        tournament.instanceId &&
        match.tournamentInstanceId === tournament.instanceId
      ) {
        return true;
      }

      if (
        tournament.name &&
        match.tournament.toLowerCase() === tournament.name.toLowerCase()
      ) {
        return true;
      }

      return false;
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}