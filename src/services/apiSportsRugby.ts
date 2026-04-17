// --------------------------------------------------
// API-Sports Rugby Service (UPDATED)
// --------------------------------------------------

const BASE_URL =
  process.env.REACT_APP_API_BASE ||
  "https://v1.rugby.api-sports.io";

const API_KEY = "98844306cf41e6b4f567f722527415a2";

/**
 * Generic API-Sports request
 */
async function apiSportsFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  const data = await response.json();

  console.log("API SPORTS RESPONSE:", data);

  return data.response ?? [];
}

/**
 * 🔥 NEW — Fetch ALL rugby leagues
 */
export async function fetchRugbyLeagues() {
  return apiSportsFetch("leagues");
}

/**
 * Existing (Six Nations only)
 */
export async function fetchRugbyFixtures() {
  return apiSportsFetch("fixtures?league=1116&season=2026");
}
// --------------------------------------------------
// 🔥 GENERIC FIXTURES BY LEAGUE (NEW)
// --------------------------------------------------

export async function fetchFixturesByLeague(
  leagueId: number,
  season: number
) {
  return apiSportsFetch(`fixtures?league=${leagueId}&season=${season}`);
}
export const SVNS_LEAGUES = [
  110, // Australia
  119, // Canada
  111, // Dubai
  115, // Hong Kong
  113, // New Zealand
  116, // Scotland
  120, // Singapore
  112, // South Africa
  130, // Spain
  114, // USA
];