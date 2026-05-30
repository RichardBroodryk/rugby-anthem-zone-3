import type { MatchData } from "../data/matches/types";

import { SVNS_EVENTS_2026 } from "../data/svnsEvents";
import { fetchFixturesByLeague } from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SVNS SERVICE — LIVE API + SAFE FALLBACK
   ================================================== */

export async function fetchSvnsMatches(): Promise<MatchData[]> {
  try {
    /* ==================================================
       STEP 1 — ACTIVE EVENTS
       ================================================== */

    const activeEvents = SVNS_EVENTS_2026.filter(
      (event) => event.status === "live" && event.leagueId
    );

    console.log("ACTIVE SVNS EVENTS:", activeEvents);

    if (!activeEvents.length) {
      console.warn("No active SVNS events");
      return [];
    }

    /* ==================================================
       STEP 2 — LEAGUE IDS
       ================================================== */

    const leagueIds = activeEvents.map(
      (e) => e.leagueId as number
    );

    console.log("SVNS LEAGUE IDS:", leagueIds);

    /* ==================================================
       STEP 3 — FETCH FIXTURES
       ================================================== */

    const responses = await Promise.all(
      leagueIds.map((leagueId) =>
        fetchFixturesByLeague(leagueId, 2026)
      )
    );

    const rawFixtures = responses.flat();

    console.log("SVNS RAW FIXTURES:", rawFixtures);
    console.log(
      "SVNS RAW FIXTURE COUNT:",
      rawFixtures.length
    );

    if (!rawFixtures.length) {
      console.warn(
        "SVNS API returned zero fixtures"
      );

      return [];
    }

    /* ==================================================
       STEP 4 — CONVERT API FIXTURES
       ================================================== */

    const converted =
      convertApiSportsFixtures(rawFixtures);

    console.log("SVNS CONVERTED:", converted);

    if (!converted.length) {
      console.warn(
        "SVNS conversion returned zero matches"
      );

      return [];
    }

    /* ==================================================
       STEP 5 — ENRICH MATCHES
       ================================================== */

    const enhancedMatches: MatchData[] =
      converted.map((match) => ({
        ...match,

        competitionId: "svns",

        gender: inferGender(match),

        round: inferRound(match.stage),

        pool: extractPool(match.stage),
      }));

    console.log(
      "SVNS ENHANCED MATCHES:",
      enhancedMatches
    );

    return enhancedMatches;
  } catch (err) {
    console.error("SVNS fetch failed:", err);

    return [];
  }
}

/* ==================================================
   HELPERS
   ================================================== */

function inferGender(
  match: MatchData
): "men" | "women" {
  const teams = [
    match.home.name.toLowerCase(),
    match.away.name.toLowerCase(),
  ];

  if (
    teams.some((t) =>
      [
        "brazil",
        "japan",
        "canada",
        "france",
        "australia",
      ].includes(t)
    )
  ) {
    return "women";
  }

  return "men";
}

function inferRound(
  stage?: string
): MatchData["round"] {
  if (!stage) return "pool";

  const s = stage.toLowerCase();

  if (s.includes("quarter"))
    return "quarter-final";

  if (s.includes("semi"))
    return "semi-final";

  if (
    s.includes("final") &&
    !s.includes("semi") &&
    !s.includes("quarter")
  ) {
    return "final";
  }

  return "pool";
}

function extractPool(
  stage?: string
): string | undefined {
  if (!stage) return undefined;

  const s = stage.toLowerCase();

  if (s.includes("pool a")) return "A";

  if (s.includes("pool b")) return "B";

  if (s.includes("pool c")) return "C";

  return undefined;
}