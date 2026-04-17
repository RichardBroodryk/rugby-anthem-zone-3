import type { MatchData } from "../data/matches/types";
import { fetchRugbyFixtures } from "./apiSportsRugby";
import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ================= FETCH SVNS ================= */

export async function fetchSvnsMatches(): Promise<MatchData[]> {
  try {
    const raw = await fetchRugbyFixtures();

    const baseMatches = convertApiSportsFixtures(raw);

    // 🔥 FILTER SVNS (IMPORTANT — adjust if needed)
    const svnsMatches = baseMatches.filter(
      (m) => m.competitionId === "svns"
    );

    // 🔥 ENHANCE DATA
    return svnsMatches.map((m) => ({
      ...m,

      gender: inferGender(m),
      round: inferRound(m),
      pool: inferPool(m),
    })) as MatchData[];
  } catch (err) {
    console.error("SVNS fetch failed", err);
    return [];
  }
}

/* ================= HELPERS ================= */

function inferGender(match: any): "men" | "women" {
  if (match.tournament?.toLowerCase().includes("women")) {
    return "women";
  }
  return "men";
}

function inferRound(match: any): MatchData["round"] {
  const name = match.tournament?.toLowerCase() || "";

  if (name.includes("quarter")) return "quarter-final";
  if (name.includes("semi")) return "semi-final";
  if (name.includes("final")) return "final";

  return "pool";
}

function inferPool(match: any): string | undefined {
  // ⚠️ API-Sports usually does NOT provide pools
  return undefined;
}