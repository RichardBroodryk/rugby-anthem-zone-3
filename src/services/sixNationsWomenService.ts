import type { MatchData } from "../data/matches/types";

import {
  fetchFixturesByLeague,
  SIX_NATIONS_WOMEN_LEAGUE,
} from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SIX NATIONS WOMEN SERVICE — LIVE DATA
   ================================================== */

export async function fetchSixNationsWomenMatches(): Promise<MatchData[]> {
  try {
    const rawFixtures = await fetchFixturesByLeague(
      SIX_NATIONS_WOMEN_LEAGUE,
      2026
    );

    if (!rawFixtures.length) {
      console.warn("No Six Nations Women fixtures returned");
      return [];
    }

    const matches = convertApiSportsFixtures(rawFixtures);

    return matches.map((match) => ({
      ...match,
      gender: "women",
    })) as MatchData[];
  } catch (err) {
    console.error("Six Nations Women fetch failed", err);
    return [];
  }
}