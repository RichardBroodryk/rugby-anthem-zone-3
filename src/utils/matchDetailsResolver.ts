import { matchDetails2026 } from "../data/matchDetails2026";
import type { MatchData } from "../data/matches/types";
import type { MatchDetails } from "../data/matchDetails2026";

/* ==================================================
   NORMALIZER (SHARED LOGIC)
   ================================================== */

function normalizeName(value?: string): string {
  if (!value) return "unknown";

  return value
    .toLowerCase()
    .replace(/\b(women|w|7s|sevens)\b/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
}

/* ==================================================
   BUILD LEGACY KEY (DETAILS FILE FORMAT)
   ================================================== */

function buildLegacyKey(match: MatchData): string {
  const home = normalizeName(match.home?.name);
  const away = normalizeName(match.away?.name);

  return `${home}-vs-${away}`;
}

/* ==================================================
   EXTRACT TEAMS FROM NEW KEY
   (competition_date_home_away)
   ================================================== */

function extractTeamsFromKey(matchKey: string) {
  const parts = matchKey.split("_");

  if (parts.length < 4) return null;

  return {
    home: normalizeName(parts[2]),
    away: normalizeName(parts[3]),
  };
}

/* ==================================================
   MAIN RESOLVER (ROBUST)
   ================================================== */

export function getMatchDetails(
  match: MatchData
): MatchDetails | undefined {
  if (!match) return undefined;

  /* -----------------------------------------------
     1. DIRECT MATCH (IF KEYS MATCH EXACTLY)
  ------------------------------------------------ */
  if (match.matchKey) {
    const direct = matchDetails2026.find(
      (d) => d.matchKey === match.matchKey
    );
    if (direct) return direct;
  }

  /* -----------------------------------------------
     2. TRY LEGACY FORMAT (MOST IMPORTANT)
  ------------------------------------------------ */
  const legacyKey = buildLegacyKey(match);

  const legacyMatch = matchDetails2026.find(
    (d) => d.matchKey === legacyKey
  );

  if (legacyMatch) return legacyMatch;

  /* -----------------------------------------------
     3. HANDLE NEW FORMAT KEYS
  ------------------------------------------------ */
  if (match.matchKey) {
    const extracted = extractTeamsFromKey(match.matchKey);

    if (extracted) {
      const fallbackKey = `${extracted.home}-vs-${extracted.away}`;

      const fallbackMatch = matchDetails2026.find(
        (d) => d.matchKey === fallbackKey
      );

      if (fallbackMatch) return fallbackMatch;
    }
  }

  /* -----------------------------------------------
     4. FINAL FALLBACK (NO KEY CASE)
  ------------------------------------------------ */
  const fallbackKey = `${normalizeName(match.home?.name)}-vs-${normalizeName(
    match.away?.name
  )}`;

  return matchDetails2026.find(
    (d) => d.matchKey === fallbackKey
  );
}