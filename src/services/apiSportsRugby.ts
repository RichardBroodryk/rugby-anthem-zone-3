// --------------------------------------------------
// API-Sports Rugby Service
// PHASE 5 — LIVE ENGINE HARDENED
// --------------------------------------------------

const BASE_URL =
  process.env.REACT_APP_API_BASE ||
  "https://v1.rugby.api-sports.io";

const API_KEY =
  process.env.REACT_APP_API_SPORTS_KEY || "";

/* ==================================================
   VALIDATION
   ================================================== */

if (!API_KEY) {
  console.warn(
    "⚠️ REACT_APP_API_SPORTS_KEY missing"
  );
}

/* ==================================================
   REQUEST TIMEOUT
   ================================================== */

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 15000
) {
  const controller =
    new AbortController();

  const timeoutId = setTimeout(
    () => {
      controller.abort();
    },
    timeout
  );

  try {
    const response = await fetch(
      url,
      {
        ...options,
        signal:
          controller.signal,
      }
    );

    clearTimeout(timeoutId);

    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/* ==================================================
   GENERIC FETCH
   ================================================== */

async function apiSportsFetch(
  endpoint: string
) {
  try {
    const response =
      await fetchWithTimeout(
        `${BASE_URL}/${endpoint}`,
        {
          method: "GET",

          headers: {
            "x-apisports-key":
              API_KEY,
          },
        }
      );

    if (!response.ok) {
      console.error(
        "API ERROR:",
        response.status,
        endpoint
      );

      throw new Error(
        `API error: ${response.status}`
      );
    }

    const data =
      await response.json();

    console.log(
      "🏉 API RESPONSE:",
      endpoint,
      data
    );

    return data.response ?? [];
  } catch (err) {
    console.error(
      "API FETCH FAILED:",
      endpoint,
      err
    );

    return [];
  }
}

/* ==================================================
   LEAGUES
   ================================================== */

export async function fetchRugbyLeagues() {
  return apiSportsFetch(
    "leagues"
  );
}

/* ==================================================
   FIXTURES BY LEAGUE
   ================================================== */

export async function fetchFixturesByLeague(
  leagueId: number,
  season: number = 2026,
  cacheBust?: number
) {
  console.log(
    "🏉 FETCHING LEAGUE:",
    leagueId,
    "SEASON:",
    season
  );

  /* ==========================================
     PRIMARY — GAMES
     ========================================== */

  let data =
  await apiSportsFetch(
    `games?league=${leagueId}&season=${season}&_=${cacheBust || Date.now()}`
  );

  if (
    data &&
    data.length > 0
  ) {
    console.log(
      "✅ GAMES ENDPOINT OK:",
      leagueId
    );

    return data;
  }

  console.warn(
    "⚠️ GAMES EMPTY → TRYING FIXTURES"
  );

  /* ==========================================
     FALLBACK — FIXTURES
     ========================================== */

 data =
  await apiSportsFetch(
    `fixtures?league=${leagueId}&season=${season}&_=${cacheBust || Date.now()}`
  );

  if (
    data &&
    data.length > 0
  ) {
    console.log(
      "✅ FIXTURES ENDPOINT OK:",
      leagueId
    );

    return data;
  }

  console.warn(
    "❌ NO API DATA:",
    leagueId,
    season
  );

  return [];
}

/* ==================================================
   SVNS LEAGUES
   ================================================== */

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

/* ==================================================
   SIX NATIONS WOMEN
   ================================================== */

export const SIX_NATIONS_WOMEN_LEAGUE =
  55;