// --------------------------------------------------
// RAZ SYSTEM — MATCHES INDEX (MASTER MERGE + LIVE)
// --------------------------------------------------

/* ==================================================
   TYPES
   ================================================== */

import type { MatchData } from "./types";

/* ==================================================
   LOCAL DATASETS
   ================================================== */

import { matches2026Men } from "./matches2026Men";
import { matches2026Women } from "./matches2026Women";
import { svnsMatches2026 } from "./matches2026Svns";

/* ==================================================
   🔥 API INTEGRATION (NEW)
   ================================================== */

import { fetchFixturesByLeague } from "../../services/apiSportsRugby";
import { convertApiSportsFixtures } from "../../utils/apiSportsConverter";
import { LEAGUE_API_MAP } from "../../contracts/leagueApiMap";

/* ==================================================
   NORMALIZERS
   ================================================== */

function normalizeKey(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(women|w|7s|sevens)\b/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function normalizeDate(date?: string): string {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toISOString().split("T")[0];
}

function buildMatchKey(match: MatchData): string {
  return [
    match.competitionId,
    normalizeDate(match.date),
    normalizeKey(match.home.name),
    normalizeKey(match.away.name),
  ].join("_");
}

/* ==================================================
   HELPERS
   ================================================== */

const sortByDate = (a: MatchData, b: MatchData) =>
  new Date(a.date).getTime() - new Date(b.date).getTime();

const isValidMatch = (match: MatchData): boolean => {
  if (!match.id || !match.home || !match.away) {
    console.warn("⚠️ Invalid match detected", match);
    return false;
  }
  return true;
};

/* ==================================================
   LOCAL MASTER DATASET
   ================================================== */

export const matches2026: MatchData[] = [
  ...matches2026Men,
  ...matches2026Women,
  ...svnsMatches2026,
]
  .map((m) => ({
    ...m,
    matchKey: m.matchKey || buildMatchKey(m),
  }))
  .filter(isValidMatch)
  .sort(sortByDate);

/* ==================================================
   HELPERS (SAFE)
   ================================================== */

export const getMensMatches = (): MatchData[] =>
  matches2026Men.slice().sort(sortByDate);

export const getWomensMatches = (): MatchData[] =>
  matches2026Women.slice().sort(sortByDate);

/* ==================================================
   🔥 LIVE MATCHES MERGE (FINAL FIX)
   ================================================== */

export const getAllMatches = async (): Promise<MatchData[]> => {
  try {
    const leagues = Object.values(LEAGUE_API_MAP);

    const apiResults = await Promise.all(
      leagues.map((l) =>
        fetchFixturesByLeague(l.id, 2026).catch(() => [])
      )
    );

    const flatApi = apiResults.flat();

    const converted = convertApiSportsFixtures(flatApi);

    // 🔥 MERGE LOCAL + API (NO DUPLICATES)
    const merged = [...matches2026];

    converted.forEach((apiMatch) => {
      const exists = merged.some(
        (m) => m.matchKey === apiMatch.matchKey
      );

      if (!exists) {
        merged.push(apiMatch);
      }
    });

    return merged.sort(sortByDate);
  } catch (err) {
    console.warn("⚠️ API FAILED — USING LOCAL DATA");
    return matches2026;
  }
};