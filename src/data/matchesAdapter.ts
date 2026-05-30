// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER
// PHASE 5 — LIVE API PRIORITY ENGINE
// --------------------------------------------------

import type { MatchData } from "../data/matches/types";

import { matches2026 } from "./matches";

import { COMPETITIONS } from "../contracts/competitionRegistry";

import { calculateImportance } from "../contracts/importanceEngine";

import { LEAGUE_API_MAP } from "../contracts/leagueApiMap";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

import { fetchFixturesByLeague } from "../services/apiSportsRugby";

import { tournaments2026 } from "./tournamentMeta";

/* ==================================================
   VALIDATION
   ================================================== */

function isValidStructure(
  match: MatchData
): boolean {
  return (
    !!match.id &&
    !!match.date &&
    !!match.home?.name &&
    !!match.away?.name &&
    !!match.competitionId
  );
}

function isValidCompetition(
  match: MatchData
): boolean {
  return (
    match.competitionId !==
      "unknown" &&
    COMPETITIONS.some(
      (c) =>
        c.conceptId ===
        match.competitionId
    )
  );
}

function isInternational(
  match: MatchData
): boolean {
  return COMPETITIONS.some(
    (comp) =>
      comp.conceptId ===
        match.competitionId &&
      comp.category ===
        "international"
  );
}

function isDomestic(
  match: MatchData
): boolean {
  return COMPETITIONS.some(
    (comp) =>
      comp.conceptId ===
        match.competitionId &&
      comp.category ===
        "domestic"
  );
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

  const normalize = (
    str: string
  ) =>
    str
      .toLowerCase()
      .replace(/\s+/g, "");

  const matchKey = normalize(
    match.tournament
  );

  const found =
    tournaments2026.find((t) => {
      if (!t.matchKey) {
        return false;
      }

      return (
        normalize(t.matchKey) ===
        matchKey
      );
    });

  return found?.instanceId;
}

/* ==================================================
   API FETCH
   ================================================== */

async function fetchFromApi(
  leagueId?: string,
  gender?: "men" | "women"
): Promise<MatchData[] | null> {
  try {
    if (!leagueId || !gender) {
      return null;
    }

    const key =
      `${leagueId}-${gender}`;

    const entry =
      LEAGUE_API_MAP[key];

    if (!entry) {
      console.warn(
        "NO API MAP ENTRY:",
        key
      );

      return null;
    }

    /* ==========================================
       PRIMARY SEASON
       ========================================== */

    const timestamp =
  Date.now();

let apiData =
  await fetchFixturesByLeague(
    entry.id,
    2026,
    timestamp
  );

    /* ==========================================
       FALLBACK SEASON
       ========================================== */

    if (
      !apiData ||
      apiData.length === 0
    ) {
      console.warn(
        "⚠️ 2026 EMPTY → FALLBACK TO 2025"
      );

     apiData =
  await fetchFixturesByLeague(
    entry.id,
    2025,
    timestamp
  );
    }

    const converted =
      convertApiSportsFixtures(
        apiData
      );

    console.log(
      "🔥 DIRECT API MATCHES:",
      converted.length
    );

    return converted;
  } catch (err) {
    console.warn(
      "DIRECT API FAILED"
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
  const mergedMap = new Map<
    string,
    MatchData
  >();

  /* ==========================================
     START WITH LOCAL
     ========================================== */

  localMatches.forEach((match) => {
  if (!match.matchKey) return;

  mergedMap.set(
    match.matchKey,
    match
  );
});

  /* ==========================================
     API OVERRIDES LOCAL
     ========================================== */

  apiMatches.forEach((apiMatch) => {
    if (!apiMatch.matchKey) {
  return;
}

const existing =
  mergedMap.get(
    apiMatch.matchKey
  );

    /* ======================================
       NEW MATCH
       ====================================== */

    if (!existing) {
      mergedMap.set(
        apiMatch.matchKey,
        apiMatch
      );

      return;
    }

    /* ======================================
       API HAS LIVE/FINAL DATA
       ====================================== */

    const apiHasPriority =
      apiMatch.state === "live" ||
      apiMatch.state === "final" ||
      !!apiMatch.score;

    if (apiHasPriority) {
      mergedMap.set(
        apiMatch.matchKey,
        {
          ...existing,
          ...apiMatch,
        }
      );

      return;
    }

    /* ======================================
       PRESERVE EXISTING OTHERWISE
       ====================================== */

    mergedMap.set(
      apiMatch.matchKey,
      {
        ...apiMatch,
        ...existing,
      }
    );
  });

  return Array.from(
    mergedMap.values()
  );
}

/* ==================================================
   MAIN
   ================================================== */

export async function getMatches(
  options?: {
    type?:
      | "international"
      | "domestic";

    gender?:
      | "men"
      | "women";

    leagueId?: string;

    includeAll?: boolean;
  }
): Promise<MatchData[]> {
  let data: MatchData[] = [];

  const apiData =
    await fetchFromApi(
      options?.leagueId,
      options?.gender
    );

  /* ==========================================
     MERGE
     ========================================== */

  if (
    !apiData ||
    apiData.length === 0
  ) {
    console.warn(
      "USING LOCAL MATCHES ONLY"
    );

    data = matches2026;
  } else {
    data = mergeMatches(
      matches2026,
      apiData
    );
  }

  /* ==========================================
     FILTERING
     ========================================== */

  let filtered =
    data.filter(
      isValidStructure
    );

  if (!options?.includeAll) {
    filtered =
      filtered.filter(
        isValidCompetition
      );
  }

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

  /* ==========================================
     LEAGUE FILTER
     ========================================== */

  if (options?.leagueId) {
    const key =
      options.leagueId.toLowerCase();

    filtered = filtered.filter(
      (m) =>
        m.competitionId
          ?.toLowerCase()
          .includes(key)
    );
  }

  /* ==========================================
     SORT
     ========================================== */

  filtered.sort(
    (a, b) =>
      new Date(
        a.date
      ).getTime() -
      new Date(
        b.date
      ).getTime()
  );

  /* ==========================================
     FINAL MAP
     ========================================== */

  return filtered.map(
    (match) => {
      const tournamentInstanceId =
        match.tournamentInstanceId ||
        resolveTournamentInstanceId(
          match
        );

      return {
        ...match,

        tournamentInstanceId,

        importance:
          calculateImportance(
            match
          ),

        // 🔥 PRESERVE TRUE API STATE
        state:
          match.state ||
          "upcoming",
      };
    }
  );
}