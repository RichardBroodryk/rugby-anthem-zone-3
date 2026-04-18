import type { MatchData } from "../data/matches/types";

import { SVNS_EVENTS_2026 } from "../data/svnsEvents";
import { fetchFixturesByLeague } from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SVNS SERVICE — CHAMPIONSHIP ONLY (CLEAN + STABLE)
   ================================================== */

export async function fetchSvnsMatches(): Promise<MatchData[]> {
  try {
    const activeEvents = SVNS_EVENTS_2026.filter(
      (event) => event.status === "live" && event.leagueId
    );

    if (!activeEvents.length) {
      console.warn("No active SVNS championship events");
      return [];
    }

    const leagueIds = activeEvents.map(
      (e) => e.leagueId as number
    );

    const responses = await Promise.all(
      leagueIds.map((leagueId) =>
        fetchFixturesByLeague(leagueId, 2024)
      )
    );

    const rawFixtures = responses.flat();

    console.log("SVNS RAW FIXTURES:", rawFixtures);

    if (!rawFixtures.length) {
      console.warn("SVNS API returned no fixtures");
      return [];
    }

    /* ==================================================
       STEP 1 — CONVERT + DROP INVALID
       ================================================== */
    const converted = convertApiSportsFixtures(rawFixtures);

    /* ==================================================
       STEP 2 — HARD FILTER (ISOLATION)
       ================================================== */
    const svnsMatches = converted.filter(
      (m) => m.competitionId === "svns"
    );

    console.log("SVNS matches:", svnsMatches.length);

    /* ==================================================
       STEP 3 — ENRICH WITH REAL STRUCTURE
       ================================================== */
    const enhancedMatches: MatchData[] = svnsMatches.map(
      (match) => ({
        ...match,

        gender: inferGender(match),

        round: inferRound(match.stage),

        pool: extractPool(match.stage),
      })
    );

    console.log("SVNS enriched:", enhancedMatches);

    return enhancedMatches;
  } catch (err) {
    console.error("SVNS fetch failed", err);
    return [];
  }
}

/* ==================================================
   HELPERS — CLEAN + USED
   ================================================== */

function inferGender(match: MatchData): "men" | "women" {
  const teams = [
    match.home.name.toLowerCase(),
    match.away.name.toLowerCase(),
  ];

  // crude but works for now — SVNS women teams overlap but we split later
  if (
    teams.some((t) =>
      ["brazil", "japan"].includes(t)
    )
  ) {
    return "women";
  }

  return "men";
}

function inferRound(stage?: string): MatchData["round"] {
  if (!stage) return "pool";

  const s = stage.toLowerCase();

  if (s.includes("quarter")) return "quarter-final";
  if (s.includes("semi")) return "semi-final";
  if (s.includes("final")) return "final";

  return "pool";
}

function extractPool(stage?: string): string | undefined {
  if (!stage) return undefined;

  const s = stage.toLowerCase();

  if (s.includes("pool a")) return "A";
  if (s.includes("pool b")) return "B";
  if (s.includes("pool c")) return "C";

  return undefined;
}