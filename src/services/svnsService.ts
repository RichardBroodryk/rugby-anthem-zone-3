import type { MatchData } from "../data/matches/types";

import { SVNS_EVENTS_2026 } from "../data/svnsEvents";
import { fetchFixturesByLeague } from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SVNS SERVICE — CHAMPIONSHIP ONLY (FIXED)
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

    /* ✅ FIX: SET LEAGUE IDS */
    const leagueIds = activeEvents.map((e) => e.leagueId as number);

    const responses = await Promise.all(
      leagueIds.map((leagueId) =>
        fetchFixturesByLeague(leagueId, 2024) // ✅ FIXED SEASON
      )
    );

    const rawFixtures = responses.flat();
    console.log("SVNS RAW FIXTURES:", rawFixtures);

    if (!rawFixtures.length) {
      console.warn("SVNS API returned no fixtures");
      return [];
    }

    const converted = convertApiSportsFixtures(rawFixtures);

    const svnsMatches = converted.filter(
      (m) => m.competitionId === "svns"
    );

    console.log("SVNS matches:", svnsMatches.length);

    const enhancedMatches: MatchData[] = svnsMatches.map((match) => ({
      ...match,
      gender: inferGender(match),
      round: inferRound(match),
      pool: inferPool(match),
    }));

    console.log("SVNS enriched:", enhancedMatches);

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
  return name.includes("women") ? "women" : "men";
}

function inferRound(match: MatchData): MatchData["round"] {
  const name = match.tournament?.toLowerCase() || "";

  if (name.includes("quarter")) return "quarter-final";
  if (name.includes("semi")) return "semi-final";
  if (name.includes("final")) return "final";

  return "pool";
}

function inferPool(match: MatchData): string | undefined {
  const teams = [
    match.home.name.toLowerCase(),
    match.away.name.toLowerCase(),
  ];

  if (
    teams.some((t) =>
      ["fiji", "japan", "new zealand", "brazil"].includes(t)
    )
  )
    return "A";

  if (
    teams.some((t) =>
      ["canada", "great britain", "australia", "south africa"].includes(t)
    )
  )
    return "B";

  if (
    teams.some((t) =>
      ["france", "argentina", "usa", "spain"].includes(t)
    )
  )
    return "C";

  return undefined;
}