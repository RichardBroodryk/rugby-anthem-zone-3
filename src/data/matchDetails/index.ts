/* ==================================================
   MATCH DETAILS 2026 — INDEX
   ================================================== */

import type { MatchDetails } from "./types";
import { matchDetailsMen } from "./matchDetailsMen";
import { matchDetailsDomesticMen } from "./matchDetailsDomesticMen";
import { matchDetailsPremMen } from "./matchDetailsPremMen";
import { matchDetailsWomen } from "./matchDetailsWomen";
import { getCompetition } from "../../contracts/competitionRegistry";

// ==================================================
// COMBINED DATASET (Backward Compatibility)
// ==================================================

export const matchDetails2026: MatchDetails[] = [
  ...matchDetailsMen,
  ...matchDetailsDomesticMen,
  ...matchDetailsPremMen,
  ...matchDetailsWomen,
];

// ==================================================
// GENDER-SPECIFIC EXPORTS
// ==================================================

export const matchDetailsMen2026 = matchDetailsMen;
export const matchDetailsDomesticMen2026 = matchDetailsDomesticMen;
export const matchDetailsPremMen2026 = matchDetailsPremMen;
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

    return matchDetailsWomen.find(
      (d) => d.matchKey === expectedKey
    );
  }

  const expectedKey = `${home}-vs-${away}`;

  const competition = getCompetition(match.competitionId);

  // ==================================================
  // GALLAGHER PREM — MEN
  // ==================================================

  if (match.competitionId === "premiership") {
    return matchDetailsPremMen.find(
      (d) => d.matchKey === expectedKey
    );
  }

  // ==================================================
  // OTHER DOMESTIC MEN
  // ==================================================

  if (
    competition?.category === "domestic" &&
    competition.gender === "men"
  ) {
    return matchDetailsDomesticMen.find(
      (d) => d.matchKey === expectedKey
    );
  }

  // ==================================================
  // INTERNATIONAL MEN
  // ==================================================

  return matchDetailsMen.find(
    (d) => d.matchKey === expectedKey
  );
};