// --------------------------------------------------
// RAZ SYSTEM — LEAGUE API MAP
// PHASE 3 — CANONICAL IDS
// --------------------------------------------------

export type LeagueApiEntry = {
  id: number;

  conceptId: string;

  name: string;

  category:
    | "international"
    | "domestic";

  gender: "men" | "women";
};

export const LEAGUE_API_MAP: Record<
  string,
  LeagueApiEntry
> = {
  // ==================================================
  // DOMESTIC — MEN
  // ==================================================

  "urc-men": {
    id: 76,
    conceptId: "urc-men",
    name: "United Rugby Championship",
    category: "domestic",
    gender: "men",
  },

  "premiership-men": {
    id: 13,
    conceptId: "premiership-men",
    name: "Premiership Rugby",
    category: "domestic",
    gender: "men",
  },

  "top14-men": {
    id: 16,
    conceptId: "top14-men",
    name: "Top 14",
    category: "domestic",
    gender: "men",
  },

  "super-men": {
    id: 71,
    conceptId: "super-men",
    name: "Super Rugby",
    category: "domestic",
    gender: "men",
  },

  "japan-men": {
    id: 27,
    conceptId: "japan-men",
    name: "Japan League One",
    category: "domestic",
    gender: "men",
  },

  "investec-men": {
    id: 54,
    conceptId: "investec-men",
    name: "Investec Champions Cup",
    category: "domestic",
    gender: "men",
  },

  "epcr-men": {
    id: 52,
    conceptId: "epcr-men",
    name: "EPCR Challenge Cup",
    category: "domestic",
    gender: "men",
  },

  // ==================================================
  // WOMEN
  // ==================================================

  "premiership-women": {
    id: 15,
    conceptId: "premiership-women",
    name: "Premier 15s",
    category: "domestic",
    gender: "women",
  },
};