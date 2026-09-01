/* ==================================================
   MATCH DETAILS 2026 — INDEX
   ================================================== */

import type { MatchDetails } from "./types";
import { matchDetailsMen } from "./matchDetailsMen";
import { matchDetailsWomen } from "./matchDetailsWomen";

// ==================================================
// COMBINED DATASET (Backward Compatibility)
// ==================================================

export const matchDetails2026: MatchDetails[] = [
  ...matchDetailsMen,
  ...matchDetailsWomen,
];

// ==================================================
// GENDER-SPECIFIC EXPORTS
// ==================================================

export const matchDetailsMen2026 = matchDetailsMen;
export const matchDetailsWomen2026 = matchDetailsWomen;

// ==================================================
// GENDER-AWARE RESOLVER
// ==================================================

export const getMatchDetails = (
  match: any,
  gender?: "men" | "women"
): MatchDetails | undefined => {
  if (!match) return undefined;

  let home = (match.home?.name || "").toLowerCase().replace(/\s+/g, "-");
  let away = (match.away?.name || "").toLowerCase().replace(/\s+/g, "-");

  const targetGender = gender || match.gender || "men";

  if (targetGender === "women") {
    if (!home.endsWith("-w")) home = `${home}-w`;
    if (!away.endsWith("-w")) away = `${away}-w`;
    const expectedKey = `${home}-vs-${away}`;
    return matchDetailsWomen.find((d) => d.matchKey === expectedKey);
  }

  const expectedKey = `${home}-vs-${away}`;
  return matchDetailsMen.find((d) => d.matchKey === expectedKey);
};