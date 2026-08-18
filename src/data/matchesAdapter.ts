// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER
// PHASE 5 — LIVE API PRIORITY ENGINE
//
// PURPOSE:
// - Highlightly is the live source of truth for match
//   status, scores and Highlightly match identity.
// - Local matches2026 remains the fallback/curated
//   fixture source.
// - Local and Highlightly records are reconciled even
//   when their matchKey formats differ.
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

const PAST_DAYS = 2;
const FUTURE_DAYS = 14;
const API_CACHE_TTL = 60 * 1000;
const API_REQUEST_TIMEOUT = 2500;

let apiMatchesCache: MatchData[] | null = null;
let apiMatchesCacheTime = 0;
let apiMatchesRequest: Promise<MatchData[]> | null = null;

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

  result.setUTCDate(
    result.getUTCDate() + amount
  );

  return result;
}

/* ==================================================
   NAME NORMALISATION
   ================================================== */

function normalizeTeamName(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "");
}

/* ==================================================
   MATCH IDENTITY
   ==================================================

   Local curated matches and Highlightly matches can
   have different matchKey formats.

   Primary identity:

   home + away + date

   Example:

   LOCAL:
   sa-nz-rival-tour_2026-08-07_stormers_new-zealand

   HIGHLIGHTLY:
   stormers-vs-new-zealand

   They are nevertheless the SAME match.

   Therefore matchKey alone must NEVER be used as
   the only reconciliation mechanism.
   ================================================== */

function buildMatchIdentityKey(
  match: MatchData
): string {
  const date = match.date
    ? match.date.split("T")[0]
    : "";

  const home = normalizeTeamName(
    match.home?.name || ""
  );

  const away = normalizeTeamName(
    match.away?.name || ""
  );

  return `${home}|${away}|${date}`;
}

/* ==================================================
   MATCH KEY NORMALISATION
   ==================================================

   Used as a SECONDARY reconciliation mechanism.

   This is deliberately separate from the primary
   team/date identity.

   If both records carry the same canonical matchKey,
   we can safely treat them as the same match even if
   another part of the local identity differs.
   ================================================== */

function normalizeMatchKey(
  value?: string
): string {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
    str
      .toLowerCase()
      .replace(/\s+/g, "");

  const matchKey =
    normalize(match.tournament);

  const found =
    tournaments2026.find((t) => {
      if (!t.matchKey) return false;

      return (
        normalize(t.matchKey) ===
        matchKey
      );
    });

  return found?.instanceId;
}

/* ==================================================
   SINGLE DATE API FETCH
   ================================================== */

async function fetchDateFromApi(
  date: string
): Promise<MatchData[]> {
  const controller =
    new AbortController();

  const timeout =
    window.setTimeout(() => {
      controller.abort();
    }, API_REQUEST_TIMEOUT);

  try {
    const response =
      await fetch(
        `${API_BASE_URL}/api/stats/fixtures?date=${date}`,
        {
          signal:
            controller.signal,
        }
      );

    if (!response.ok) {
      throw new Error(
        `Fixture request failed for ${date}: HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

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
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      console.warn(
        `⚠️ BACKEND FIXTURE REQUEST TIMED OUT FOR ${date}`
      );
    } else {
      console.warn(
        `⚠️ BACKEND FIXTURE FETCH FAILED FOR ${date}`,
        error
      );
    }

    return [];
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchSeasonFromApi(
  league: string
): Promise<MatchData[]> {
  const controller =
    new AbortController();

  const timeout =
    window.setTimeout(() => {
      controller.abort();
    }, API_REQUEST_TIMEOUT);

  try {
    const query =
      new URLSearchParams();

    query.set(
      "league",
      league
    );

    const response =
      await fetch(
        `${API_BASE_URL}/api/stats/fixtures?${query.toString()}`,
        {
          signal:
            controller.signal,
        }
      );

    if (!response.ok) {
      throw new Error(
        `Season fixture request failed: HTTP ${response.status}`
      );
    }

    const data =
      await response.json();

    if (!Array.isArray(data)) {
      console.warn(
        "⚠️ NPC SEASON RESPONSE WAS NOT AN ARRAY:",
        data
      );

      return [];
    }

    console.log(
      "🔥 NPC SEASON FIXTURES:",
      data.length
    );

    return data;
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      console.warn(
        "⚠️ NPC SEASON REQUEST TIMED OUT"
      );
    } else {
      console.warn(
        "⚠️ NPC SEASON FETCH FAILED:",
        error
      );
    }

    return [];
  } finally {
    window.clearTimeout(timeout);
  }
}
/* ==================================================
   ROLLING API FETCH
   ================================================== */

async function fetchFromApi(
  options?: GetMatchesOptions
): Promise<MatchData[]> {
  if (!apiMatchesRequest) {
    apiMatchesRequest =
      (async () => {
        const now =
          Date.now();

        // Check if this is an NPC request
        const isNpc =
          options?.leagueId
            ?.toLowerCase() === "npc";

        if (isNpc) {
         const npcMatches =
  await fetchSeasonFromApi(
    "npc"
  );

          const unique =
            new Map<string, MatchData>();

          npcMatches.forEach(
            (match) => {
              const key =
                buildMatchIdentityKey(
                  match
                );

              if (!key) {
                return;
              }

              unique.set(
                key,
                match
              );
            }
          );

          const result =
            Array.from(
              unique.values()
            );

          console.log(
            "🔥 NPC 2026 SEASON MATCHES:",
            result.length
          );

          if (result.length > 0) {
            apiMatchesCache =
              result;

            apiMatchesCacheTime =
              Date.now();
          }

          return result;
        }

        if (
          apiMatchesCache &&
          now -
            apiMatchesCacheTime <
            API_CACHE_TTL
        ) {
          console.log(
            "🔥 HIGHLIGHTLY CACHE HIT:",
            apiMatchesCache.length
          );

          return apiMatchesCache;
        }

        const today =
          new Date();

        const dates: string[] =
          [];

        for (
          let offset =
            -PAST_DAYS;
          offset <=
            FUTURE_DAYS;
          offset++
        ) {
          dates.push(
            formatDate(
              addDays(
                today,
                offset
              )
            )
          );
        }

        /*
         * Fetch all dates concurrently.
         *
         * The backend itself protects Highlightly with its
         * cache and request lock.
         */

        const responses =
          await Promise.all(
            dates.map(
              (date) =>
                fetchDateFromApi(
                  date
                )
            )
          );

        const apiMatches =
          responses.flat();

        /*
         * Remove duplicates returned by the API.
         */

        const unique =
          new Map<
            string,
            MatchData
          >();

        apiMatches.forEach(
          (match) => {
            const key =
              buildMatchIdentityKey(
                match
              );

            if (!key) {
              return;
            }

            unique.set(
              key,
              match
            );
          }
        );

        const result =
          Array.from(
            unique.values()
          );

        console.log(
          "🔥 HIGHLIGHTLY ROLLING MATCHES:",
          result.length
        );

        /*
         * Only cache a successful API response.
         *
         * An empty response is NOT cached so that a
         * temporary backend failure does not suppress
         * Highlightly indefinitely.
         */

        if (
          result.length > 0
        ) {
          apiMatchesCache =
            result;

          apiMatchesCacheTime =
            Date.now();
        }

        return result;
      })();
  }

  try {
    return await apiMatchesRequest;
  } finally {
    apiMatchesRequest =
      null;
  }
}

/* ==================================================
   MATCH ID / KEY RESOLUTION
   ================================================== */

function buildMatchKey(
  match: MatchData
): string {
  if (match.matchKey) {
    return match.matchKey;
  }

  const normalize =
    (value: string) =>
      value
        .toLowerCase()
        .replace(/\s+/g, "-");

  return `${normalize(
    match.home.name
  )}-vs-${normalize(
    match.away.name
  )}`;
}

/* ==================================================
   EXISTING MATCH RESOLUTION
   ==================================================

   Reconciliation order:

   1. Exact team + date identity.
   2. Exact normalised matchKey.

   This allows Highlightly's real ID to be attached
   to a local curated match even where the two records
   do not have identical identity formatting.
   ================================================== */

function findExistingMatch(
  mergedMap: Map<string, MatchData>,
  apiMatch: MatchData
): {
  identity: string;
  match: MatchData;
} | undefined {
  const identity =
    buildMatchIdentityKey(
      apiMatch
    );

  const direct =
    mergedMap.get(identity);

  if (direct) {
    return {
      identity,
      match: direct,
    };
  }

  const apiKey =
    normalizeMatchKey(
      apiMatch.matchKey
    );

  if (!apiKey) {
    return undefined;
  }

  for (
    const [
      existingIdentity,
      existingMatch,
    ] of mergedMap.entries()
  ) {
    const existingKey =
      normalizeMatchKey(
        existingMatch.matchKey
      );

    if (
      existingKey &&
      existingKey === apiKey
    ) {
      return {
        identity:
          existingIdentity,
        match:
          existingMatch,
      };
    }
  }

  return undefined;
}

/* ==================================================
   API PRIORITY MERGE
   ================================================== */

function mergeMatches(
  localMatches: MatchData[],
  apiMatches: MatchData[]
): MatchData[] {
  const mergedMap =
    new Map<
      string,
      MatchData
    >();

  /*
   * Start with local curated data.
   *
   * The identity key is deliberately independent
   * from match.matchKey.
   */

  localMatches.forEach(
    (match) => {
      const identity =
        buildMatchIdentityKey(
          match
        );

      if (!identity) {
        return;
      }

      mergedMap.set(
        identity,
        match
      );
    }
  );

  /*
   * Overlay Highlightly.
   */

  apiMatches.forEach(
    (apiMatch) => {
      const resolved =
        findExistingMatch(
          mergedMap,
          apiMatch
        );

      /*
       * No local record exists.
       *
       * This is a genuinely new Highlightly match.
       */

      if (!resolved) {
        const identity =
          buildMatchIdentityKey(
            apiMatch
          );

        const key =
          buildMatchKey(
            apiMatch
          );

        mergedMap.set(
          identity,
          {
            ...apiMatch,

            highlightlyId:
              apiMatch.highlightlyId ??
              apiMatch.id,

            matchKey:
              key,
          }
        );

        return;
      }

      const {
        identity,
        match: existing,
      } = resolved;

      /*
       * The local record exists.
       *
       * Highlightly now becomes the authority for
       * dynamic match information.
       *
       * IMPORTANT:
       *
       * Preserve the local RAZ route ID.
       *
       * Preserve the REAL Highlightly ID separately.
       */

      const key =
        existing.matchKey ||
        apiMatch.matchKey ||
        buildMatchKey(
          existing
        );

      const apiHasPriority =
        apiMatch.state ===
          "live" ||
        apiMatch.state ===
          "final" ||
        !!apiMatch.score;

      if (
        apiHasPriority
      ) {
        const merged:
          MatchData = {
          ...existing,
          ...apiMatch,

          /*
           * Preserve RAZ route identity.
           */
          id: existing.id,

          /*
           * ALWAYS preserve the real
           * Highlightly match ID.
           */
          highlightlyId:
            apiMatch.highlightlyId ??
            apiMatch.id ??
            existing.highlightlyId,

          /*
           * Preserve curated match key.
           */
          matchKey:
            key,

          /*
           * Preserve trusted local flag identity.
           */
          home: {
            ...apiMatch.home,
            country:
              existing.home.country ||
              apiMatch.home.country,
          },

          away: {
            ...apiMatch.away,
            country:
              existing.away.country ||
              apiMatch.away.country,
          },
        };

        console.log(
          "🔄 MATCH RECONCILED:",
          {
            id: existing.id,
            highlightlyId:
              merged.highlightlyId,
            matchKey:
              merged.matchKey,
            home:
              existing.home.name,
            away:
              existing.away.name,
            date:
              existing.date,
            score:
              merged.score,
            state:
              merged.state,
          }
        );

        mergedMap.set(
          identity,
          merged
        );

        return;
      }

      /*
       * Highlightly has no useful live/final state yet.
       *
       * Preserve the richer local curated record,
       * but still retain the real Highlightly ID.
       */

      mergedMap.set(
        identity,
        {
          ...apiMatch,
          ...existing,

          id: existing.id,

          highlightlyId:
            apiMatch.highlightlyId ??
            apiMatch.id ??
            existing.highlightlyId,

          matchKey:
            key,
        }
      );
    }
  );

  return Array.from(
    mergedMap.values()
  );
}

/* ==================================================
   MAIN MATCH FETCH
   ================================================== */

export async function getMatches(
  options?: GetMatchesOptions
): Promise<MatchData[]> {
  let data: MatchData[];

  const apiData =
    await fetchFromApi(
      options
    );

  /*
   * IMPORTANT:
   *
   * We do NOT throw away local data merely because
   * Highlightly returned an empty response.
   *
   * Local data remains the fallback.
   */

  if (
    apiData.length === 0
  ) {
    console.warn(
      "⚠️ USING LOCAL MATCHES ONLY"
    );

    data =
      matches2026;
  } else {
    data =
      mergeMatches(
        matches2026,
        apiData
      );
  }

  /* ==================================================
     VALIDATION
     ================================================== */

  let filtered =
    data.filter(
      isValidStructure
    );

  if (
    !options?.includeAll
  ) {
    filtered =
      filtered.filter(
        isValidCompetition
      );
  }

  /* ==================================================
     TYPE FILTER
     ================================================== */

  if (
    options?.type ===
    "international"
  ) {
    filtered =
      filtered.filter(
        isInternational
      );
  }

  if (
    options?.type ===
    "domestic"
  ) {
    filtered =
      filtered.filter(
        isDomestic
      );
  }

  /* ==================================================
     GENDER FILTER
     ================================================== */

  if (options?.gender) {
    filtered =
      filtered.filter(
        (match) => {
          const isWomen =
            match.gender ===
              "women" ||
            match.home.name.includes(
              " W"
            ) ||
            match.away.name.includes(
              " W"
            ) ||
            match.competitionId
              .toLowerCase()
              .includes(
                "women"
              ) ||
            match.tournament
              .toLowerCase()
              .includes(
                "women"
              );

          if (
            options.gender ===
            "women"
          ) {
            return isWomen;
          }

          return !isWomen;
        }
      );
  }

  /* ==================================================
     LEAGUE / COMPETITION FILTER
     ================================================== */

  if (
    options?.leagueId
  ) {
    const key =
      options.leagueId.toLowerCase();

    filtered =
      filtered.filter(
        (match) =>
          match.competitionId
            ?.toLowerCase() ===
            key ||
          match.tournamentInstanceId
            ?.toLowerCase() ===
            key ||
          match.tournament
            ?.toLowerCase()
            .replace(
              /\s+/g,
              "-"
            ) === key
      );
  }

  /* ==================================================
     SORT
     ================================================== */

  filtered.sort(
    (a, b) =>
      new Date(
        a.date
      ).getTime() -
      new Date(
        b.date
      ).getTime()
  );

  /* ==================================================
     FINAL NORMALIZATION
     ================================================== */

  return filtered.map(
    (match) => {
      const tournamentInstanceId =
        match.tournamentInstanceId ||
        resolveTournamentInstanceId(
          match
        );

      return {
        ...match,

        matchKey:
          match.matchKey ||
          buildMatchKey(
            match
          ),

        tournamentInstanceId,

        importance:
          calculateImportance(
            match
          ),

        state:
          match.state ||
          (match.score
            ? "final"
            : "upcoming"),
      };
    }
  );
}

/* ==================================================
   TOURNAMENT HELPER
   ================================================== */

export async function getTournamentMatches(
  tournament: {
    conceptId: string;
    gender?:
      | "men"
      | "women"
      | "mixed";
    instanceId?: string;
    name?: string;
  }
): Promise<MatchData[]> {
  const allMatches =
    await getMatches({
      includeAll:
        true,

      gender:
        tournament.gender ===
        "mixed"
          ? undefined
          : tournament.gender,
    });

  return allMatches
    .filter(
      (match) => {
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
      }
    )
    .sort(
      (a, b) =>
        new Date(
          a.date
        ).getTime() -
        new Date(
          b.date
        ).getTime()
    );
}