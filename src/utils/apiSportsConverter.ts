import type { MatchData } from "../data/matches/types";
import { API_TO_CONCEPT_MAP } from "../contracts/competitionIdMap";

/* ==================================================
   NORMALIZER (FIXED FOR FLAGS)
   ================================================== */

function normalizeCountry(name?: string): string {
  if (!name) return "unknown";

  return name
    .toLowerCase()
    .replace(/\b(7s|sevens|women|w)\b/g, "") // remove noise
    .replace(/\s+/g, "-")                    // spaces → dash
    .replace(/-+/g, "-")                     // collapse dashes
    .replace(/^-|-$/g, "")                   // trim dashes
    .replace(/'/g, "")
    .trim();
}

/* ==================================================
   CONVERTER (STRICT + SAFE)
   ================================================== */

export function convertApiSportsFixture(
  fixture: any
): MatchData | null {
  const home = fixture.teams?.home;
  const away = fixture.teams?.away;

  const homeScore = fixture.scores?.home?.total;
  const awayScore = fixture.scores?.away?.total;

  const leagueId = fixture.league?.id;

  /* 🔒 HARD FILTER — ONLY ALLOWED COMPETITIONS */
  const competitionId = API_TO_CONCEPT_MAP[leagueId];

  if (!competitionId) {
    return null; // 🚫 DROP UNKNOWN LEAGUES
  }

  /* ==================================================
     MATCH STATE
     ================================================== */

  let state: MatchData["state"] = "upcoming";

  const status = fixture.fixture?.status?.short;

  if (status === "FT") state = "final";
  else if (status === "1H" || status === "2H") state = "live";
  else if (status === "NS") state = "upcoming";

  /* ==================================================
     RETURN CLEAN STRUCTURE
     ================================================== */

return {
  id: Number(fixture.fixture?.id),

  competitionId,

  tournament: fixture.league?.name ?? "Unknown",

  // 🔥 ADD THIS
  stage:
    fixture.fixture?.stage ||
    fixture.fixture?.round ||
    fixture.league?.round ||
    "",

  date: fixture.fixture?.date ?? "",
  venue: fixture.fixture?.venue?.name ?? "TBC",

  home: {
    name: home?.name ?? "Unknown",
    country: normalizeCountry(home?.name),
  },

  away: {
    name: away?.name ?? "Unknown",
    country: normalizeCountry(away?.name),
  },

  score:
    homeScore != null && awayScore != null
      ? { home: homeScore, away: awayScore }
      : undefined,

  state,

  importance: 50,
};
}

/* ==================================================
   BATCH CONVERTER (SAFE)
   ================================================== */

export function convertApiSportsFixtures(
  fixtures: any[]
): MatchData[] {
  return fixtures
    .map(convertApiSportsFixture)
    .filter((m): m is MatchData => m !== null);
}