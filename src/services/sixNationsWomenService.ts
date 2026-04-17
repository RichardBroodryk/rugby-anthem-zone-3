import type { MatchData } from "../data/matches/types";
import { fetchRugbyFixtures } from "./apiSportsRugby";
import { convertApiSportsFixtures } from "../utils/apiSportsConverter";

/* ================= FETCH ================= */

export async function fetchSixNationsWomen(): Promise<MatchData[]> {
  try {
    const raw = await fetchRugbyFixtures();

    const baseMatches = convertApiSportsFixtures(raw);

    return baseMatches
      .filter((m) =>
        m.tournament?.toLowerCase().includes("women")
      )
      .map((m) => ({
        ...m,

        gender: "women",

        // Six Nations = round-based
        round: "pool",

        pool: undefined,
      })) as MatchData[];
  } catch (err) {
    console.error("Six Nations Women fetch failed", err);
    return [];
  }
}