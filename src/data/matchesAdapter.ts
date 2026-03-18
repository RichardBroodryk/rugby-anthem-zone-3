// ==================================================
// MATCHES ADAPTER — AUTHORITATIVE
// Rugby Anthem Zone
// Purpose:
//   - Fetch live fixtures from backend when available
//   - Fall back to local canonical dataset if API fails
//   - Normalize API responses to MatchData format
// ==================================================

import { matches2026, MatchData } from "./matches2026";

/* ================= API BASE ================= */

const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://rugby-anthem-backend.fly.dev";

/* ================= NORMALIZER ================= */

function normalizeMatch(m: any): MatchData {
  return {
    id: m.id,
    tournament: m.tournament,
    date: m.date,
    venue: m.venue,

    home: {
      name: m.home?.name || m.homeTeam || "",
      country: m.home?.country || "",
    },

    away: {
      name: m.away?.name || m.awayTeam || "",
      country: m.away?.country || "",
    },

    score: m.score
      ? {
          home: m.score.home,
          away: m.score.away,
        }
      : undefined,
  };
}

/* ================= FETCH MATCHES ================= */

export async function getMatches(): Promise<MatchData[]> {
  try {
    const res = await fetch(`${API_BASE}/api/stats/fixtures`);

    if (!res.ok) {
      throw new Error("API request failed");
    }

    const apiMatches = await res.json();

    if (!Array.isArray(apiMatches) || apiMatches.length === 0) {
      console.warn("API returned empty dataset — using fallback matches2026");
      return matches2026;
    }

    /* Normalize API data */
    const normalizedMatches = apiMatches.map(normalizeMatch);

    return normalizedMatches;
  } catch (err) {
    console.warn("Using fallback matches2026 dataset");
    return matches2026;
  }
}