// --------------------------------------------------
// API-Sports Rugby Service (CLEAN + PRODUCTION READY)
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

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  console.log("API SPORTS RESPONSE:", data);

  return data.response ?? [];
}

/**
 * Fetch all leagues (debug / discovery)
 */
export async function fetchRugbyLeagues() {
  return apiSportsFetch("leagues");
}

/**
 * 🔥 GENERIC FIXTURES BY LEAGUE (MAIN ENTRY POINT)
 */
export async function fetchFixturesByLeague(
  leagueId: number,
  season: number = 2024
) {
  // 🔥 Try primary endpoint
  let data = await apiSportsFetch(
    `games?league=${leagueId}&season=${season}`
  );

  if (data && data.length > 0) {
    console.log("✅ GAMES endpoint working:", leagueId);
    return data;
  }

  console.warn("⚠️ GAMES EMPTY → trying fixtures endpoint");

  // 🔁 Fallback endpoint (some leagues use this)
  data = await apiSportsFetch(
    `fixtures?league=${leagueId}&season=${season}`
  );

  if (data && data.length > 0) {
    console.log("✅ FIXTURES endpoint working:", leagueId);
    return data;
  }

  console.warn("❌ NO DATA FROM API FOR LEAGUE:", leagueId);

  return [];
}

/**
 * 🔥 SVNS LEAGUES (CORRECTED)
 */
export const SVNS_LEAGUES = [
  110, // Australia
  119, // Canada
  121, // France
  115, // Hong Kong
  113, // New Zealand
  120, // Singapore
  112, // South Africa
  130, // Spain
  114, // USA
];

/**
 * 🔥 SIX NATIONS WOMEN
 */
export const SIX_NATIONS_WOMEN_LEAGUE = 55;