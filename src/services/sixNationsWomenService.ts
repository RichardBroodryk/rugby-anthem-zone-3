import type { MatchData } from "../data/matches/types";

import {
  fetchFixturesByLeague,
  SIX_NATIONS_WOMEN_LEAGUE,
} from "./apiSportsRugby";

import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ==================================================
   SIX NATIONS WOMEN SERVICE — LIVE CLEAN (FIXED)
   ================================================== */

export async function fetchSixNationsWomenMatches(): Promise<MatchData[]> {
  try {
    const rawFixtures = await fetchFixturesByLeague(
      SIX_NATIONS_WOMEN_LEAGUE,
      2024 // ✅ FIXED SEASON
    );

    if (!rawFixtures.length) {
      console.warn("No Six Nations Women fixtures returned");
      return [];
    }

    const converted = convertApiSportsFixtures(rawFixtures);
    console.log("RAW SNW FIXTURES:", rawFixtures);
console.log("CONVERTED SNW:", converted);

    const snwMatches = converted.filter(
      (m) => m.competitionId === "six-nations-women"
    );

    console.log("Six Nations Women matches:", snwMatches.length);
    console.log(
  "SNW teams:",
  [...new Set(snwMatches.map((m) => m.home.name))]
);

    console.log(
      "SNW teams:",
      [...new Set(snwMatches.map((m) => m.home.name))]
    );

    return snwMatches.map((match) => ({
      ...match,
      gender: "women",
    })) as MatchData[];
  } catch (err) {
    console.error("Six Nations Women fetch failed", err);
    return [];
  }
}