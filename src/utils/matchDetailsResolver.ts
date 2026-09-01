import { matchDetails2026 } from "../data/matchDetails";
import type { MatchData } from "../data/matches/types";
import type { MatchDetails } from "../data/matchDetails/types";

/* ==================================================
   NORMALIZERS
   ================================================== */

function normalizeExactName(value?: string): string {
  if (!value) return "unknown";

  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeLegacyName(value?: string): string {
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
   BUILD KEYS
   ================================================== */

function buildExactKey(match: MatchData): string {
  const home = normalizeExactName(match.home?.name);
  const away = normalizeExactName(match.away?.name);

  return `${home}-vs-${away}`;
}

function buildLegacyKey(match: MatchData): string {
  const home = normalizeLegacyName(match.home?.name);
  const away = normalizeLegacyName(match.away?.name);

  return `${home}-vs-${away}`;
}

/* ==================================================
   EXTRACT TEAMS FROM NEW KEY
   ==================================================

   Supports:

   competition_date_home_away

   Example:

   sa-nz-rival-tour_2026-08-07_stormers_new-zealand
   ================================================== */

function extractTeamsFromKey(matchKey: string) {
  const parts = matchKey.split("_");

  if (parts.length < 4) {
    return null;
  }

  return {
    home: normalizeExactName(parts[2]),
    away: normalizeExactName(parts[3]),
  };
}

/* ==================================================
   MAIN RESOLVER
   ================================================== */

export function getMatchDetails(
  match: MatchData
): MatchDetails | undefined {
  if (!match) {
    return undefined;
  }

  /* -----------------------------------------------
     1. EXACT MATCH KEY
     ----------------------------------------------- */

  if (match.matchKey) {
    const direct = matchDetails2026.find(
      (details) =>
        details.matchKey === match.matchKey
    );

    if (direct) {
      return direct;
    }
  }

  /* -----------------------------------------------
     2. EXACT HOME + AWAY KEY
     
     This is important for Rivals Tour matches.
     
     Example:
     
     Stormers
     New Zealand
     
     →
     
     stormers-vs-new-zealand
     ----------------------------------------------- */

  const exactKey = buildExactKey(match);

  const exactMatch = matchDetails2026.find(
    (details) =>
      details.matchKey === exactKey
  );

  if (exactMatch) {
    return exactMatch;
  }

  /* -----------------------------------------------
     3. LEGACY NORMALISED KEY
     
     Preserves compatibility with the older
     women/sevens detail format.
     
     Example:
     
     england-w-vs-ireland-w
     
     can resolve through:
     
     england-vs-ireland
     ----------------------------------------------- */

  const legacyKey = buildLegacyKey(match);

  const legacyMatch = matchDetails2026.find(
    (details) =>
      details.matchKey === legacyKey
  );

  if (legacyMatch) {
    return legacyMatch;
  }

  /* -----------------------------------------------
     4. HANDLE HIGHLIGHTLY / NEW MATCH KEY FORMAT
     
     Example:
     
     sa-nz-rival-tour_2026-08-07_stormers_new-zealand
     ----------------------------------------------- */

  if (match.matchKey) {
    const extracted =
      extractTeamsFromKey(match.matchKey);

    if (extracted) {
      const extractedExactKey =
        `${extracted.home}-vs-${extracted.away}`;

      const extractedMatch =
        matchDetails2026.find(
          (details) =>
            details.matchKey ===
            extractedExactKey
        );

      if (extractedMatch) {
        return extractedMatch;
      }

      const extractedLegacyKey =
        `${normalizeLegacyName(
          extracted.home
        )}-vs-${normalizeLegacyName(
          extracted.away
        )}`;

      const extractedLegacyMatch =
        matchDetails2026.find(
          (details) =>
            details.matchKey ===
            extractedLegacyKey
        );

      if (extractedLegacyMatch) {
        return extractedLegacyMatch;
      }
    }
  }

  /* -----------------------------------------------
     5. NO MATCH DETAILS
     ----------------------------------------------- */

  return undefined;
}