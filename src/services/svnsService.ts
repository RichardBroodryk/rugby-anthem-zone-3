import type { MatchData } from "../data/matches/types";

import { SVNS_EVENTS_2026 } from "../data/svnsEvents";
import { fetchFixturesByLeague } from "./apiSportsRugby";
import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SVNS SERVICE — LIVE EVENT AWARE
   ================================================== */

export async function fetchSvnsMatches(): Promise<MatchData[]> {
  try {
    /* ================= ACTIVE EVENTS ================= */

    const activeEvents = SVNS_EVENTS_2026.filter(
      (event) => event.status === "live" && event.leagueId
    );

    if (!activeEvents.length) {
      console.warn("No active SVNS events");
      return [];
    }

    /* ================= FETCH ALL ACTIVE EVENTS ================= */

    const responses = await Promise.all(
      activeEvents.map((event) =>
        fetchFixturesByLeague(event.leagueId as number, 2026)
      )
    );

    const rawFixtures = responses.flat();

    /* ================= CONVERT TO MATCHDATA ================= */

    const baseMatches = convertApiSportsFixtures(rawFixtures);

    /* ================= ENHANCE MATCHDATA ================= */

    const enhancedMatches: MatchData[] = baseMatches.map((match) => ({
      ...match,

      // 🔥 SVNS SPECIFIC FIELDS
      gender: inferGender(match),
      round: inferRound(match),
      pool: undefined, // API does not provide pools
    })) as MatchData[];

    return enhancedMatches;
  } catch (err) {
    console.error("SVNS fetch failed", err);
    return [];
  }
}

/* ==================================================
   HELPERS
   ================================================== */

function inferGender(match: MatchData): "men" | "women" {
  const name = match.tournament?.toLowerCase() || "";

  if (name.includes("women")) return "women";
  return "men";
}

function inferRound(match: MatchData): MatchData["round"] {
  const name = match.tournament?.toLowerCase() || "";

  if (name.includes("quarter")) return "quarter-final";
  if (name.includes("semi")) return "semi-final";
  if (name.includes("final")) return "final";

  return "pool";
}