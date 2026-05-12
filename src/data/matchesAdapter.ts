// --------------------------------------------------
// RAZ SYSTEM — MATCHES ADAPTER (FIXED FINAL)
// DIRECT API + SAFE FILTERING + NO DATA LOSS
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
    COMPETITIONS.some(
      (c) => c.conceptId === match.competitionId
    )
  );
}

function isInternational(match: MatchData): boolean {
  return COMPETITIONS.some(
    (comp) =>
      comp.conceptId === match.competitionId &&
      comp.category === "international"
  );
}

function isDomestic(match: MatchData): boolean {
  return COMPETITIONS.some(
    (comp) =>
      comp.conceptId === match.competitionId &&
      comp.category === "domestic"
  );
}

/* ==================================================
   STATE RESOLUTION
   ================================================== */

function getMatchState(match: MatchData) {
  if (match.score) return "final";
  return "upcoming";
}

/* ==================================================
   TOURNAMENT RESOLVER
   ================================================== */

function resolveTournamentInstanceId(
  match: MatchData
): string | undefined {
  if (!match.tournament) return undefined;

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
   🔥 DIRECT API FETCH (FINAL FIX)
   ================================================== */

async function fetchFromApi(
  leagueId?: string,
  gender?: "men" | "women"
): Promise<MatchData[] | null> {
  try {
    if (!leagueId || !gender) return null;

    const key = `${leagueId}-${gender}`;
    const entry = LEAGUE_API_MAP[key];

    if (!entry) {
      console.warn("NO API MAP ENTRY:", key);
      return null;
    }

    // 🔥 DIRECT API CALL
    let apiData = await fetchFixturesByLeague(entry.id, 2026);

if (!apiData || apiData.length === 0) {
  console.warn("⚠️ 2026 EMPTY → FALLBACK TO 2025");
  apiData = await fetchFixturesByLeague(entry.id, 2025);
}

    const converted = convertApiSportsFixtures(apiData);

    console.log("🔥 DIRECT API MATCHES:", converted.length);

    return converted;
  } catch (err) {
    console.warn("DIRECT API FAILED");
    return null;
  }
}

/* ==================================================
   MAIN
   ================================================== */

export async function getMatches(options?: {
  type?: "international" | "domestic";
  gender?: "men" | "women";
  leagueId?: string;
  includeAll?: boolean;
}): Promise<MatchData[]> {
  let data: MatchData[] = [];

  const apiData = await fetchFromApi(
    options?.leagueId,
    options?.gender
  );

  // 🔥 SAFE MERGE (API + LOCAL)
  if (!apiData || apiData.length === 0) {
    console.warn("USING LOCAL MATCHES ONLY");
    data = matches2026;
  } else {
    const merged = [...matches2026];

    apiData.forEach((am) => {
      const exists = merged.some(
        (m) => m.matchKey === am.matchKey
      );

      if (!exists) {
        merged.push(am);
      }
    });

    data = merged;
  }

  /* ==================================================
     FILTERING
     ================================================== */

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

  // 🔥 FIXED LEAGUE FILTER (NO MORE EMPTY RESULTS)
  if (options?.leagueId) {
    const key = options.leagueId.toLowerCase();

    filtered = filtered.filter((m) =>
      m.competitionId?.toLowerCase().includes(key)
    );
  }

  /* ==================================================
     SORT + FINAL MAP
     ================================================== */

  filtered.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  return filtered.map((match) => {
    const tournamentInstanceId =
      match.tournamentInstanceId ||
      resolveTournamentInstanceId(match);

    return {
      ...match,
      tournamentInstanceId,
      importance: calculateImportance(match),
      state: getMatchState(match),
    };
  });
}