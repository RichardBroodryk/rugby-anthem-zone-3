// --------------------------------------------------
// RAZ — API LEAGUE MAP (CORRECTED FINAL)
// --------------------------------------------------

export type LeagueApiEntry = {
  id: number;
  name: string;
  category: "international" | "domestic";
  gender: "men" | "women";
};

export const LEAGUE_API_MAP: Record<string, LeagueApiEntry> = {
  // ================= INTERNATIONAL =================

  "six-nations-men": {
    id: 1116,
    name: "Six Nations",
    category: "international",
    gender: "men",
  },

  "six-nations-women": {
    id: 1117,
    name: "Women's Six Nations",
    category: "international",
    gender: "women",
  },

  "rugby-championship": {
    id: 1118,
    name: "Rugby Championship",
    category: "international",
    gender: "men",
  },

  "world-cup": {
    id: 1120,
    name: "Rugby World Cup",
    category: "international",
    gender: "men",
  },

  // ================= DOMESTIC — MEN (FIXED) =================

  "urc-men": {
    id: 76,
    name: "United Rugby Championship",
    category: "domestic",
    gender: "men",
  },

  "premiership-men": {
    id: 10,
    name: "Premiership Rugby",
    category: "domestic",
    gender: "men",
  },

  "top14-men": {
    id: 16,
    name: "Top 14",
    category: "domestic",
    gender: "men",
  },

  "super-rugby-men": {
    id: 71,
    name: "Super Rugby",
    category: "domestic",
    gender: "men",
  },

  "japan-league-men": {
    id: 27,
    name: "Japan League One",
    category: "domestic",
    gender: "men",
  },

  "investec-men": {
    id: 54,
    name: "Champions Cup",
    category: "domestic",
    gender: "men",
  },

  "epcr-men": {
    id: 52,
    name: "Challenge Cup",
    category: "domestic",
    gender: "men",
  },

  // ================= WOMEN =================

  "premiership-women": {
    id: 15,
    name: "Premier 15s",
    category: "domestic",
    gender: "women",
  },
};