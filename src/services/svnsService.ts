import type { MatchData } from "../data/matches/types";

import { SVNS_EVENTS_2026 } from "../data/svnsEvents";
import {
  fetchFixturesByLeague,
  SVNS_LEAGUES,
} from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SVNS SERVICE — LIVE + FALLBACK SAFE
   ================================================== */

export async function fetchSvnsMatches(): Promise<MatchData[]> {
  try {
    const activeEvents = SVNS_EVENTS_2026.filter(
      (event) => event.status === "live" && event.leagueId
    );

    let leagueIds: number[] = [];

    if (activeEvents.length) {
      console.log("Using ACTIVE SVNS events");
      leagueIds = activeEvents.map((e) => e.leagueId as number);
    } else {
      console.warn("No active events → fallback to ALL SVNS leagues");
      leagueIds = SVNS_LEAGUES;
    }

    const responses = await Promise.all(
      leagueIds.map((leagueId) =>
        fetchFixturesByLeague(leagueId, 2026)
      )
    );

    const rawFixtures = responses.flat();

    if (!rawFixtures.length) {
      console.warn("SVNS API returned no fixtures");
      return [];
    }

    const baseMatches = convertApiSportsFixtures(rawFixtures);

    const enhancedMatches: MatchData[] = baseMatches.map((match) => ({
      ...match,
      gender: inferGender(match),
      round: inferRound(match),
      pool: inferPool(match),
    }));

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