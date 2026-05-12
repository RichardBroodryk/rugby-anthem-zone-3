// --------------------------------------------------
// RAZ SYSTEM — LEAGUE ↔ COMPETITION MAP (FIXED)
// --------------------------------------------------

export const LEAGUE_COMPETITION_MAP: Record<
  string,
  { men: string; women: string }
> = {
  urc: {
    men: "urc",
    women: "urc",
  },

  premiership: {
    men: "premiership",
    women: "premiership-women",
  },

  super: {
    men: "super-rugby",
    women: "super-rugby-women",
  },

  top14: {
    men: "top-14",
    women: "elite-1-women",
  },

  japan: {
    men: "japan-league-one",
    women: "japan-league-one",
  },

  investec: {
    men: "champions-cup",
    women: "champions-cup",
  },

  epcr: {
    men: "challenge-cup",
    women: "challenge-cup",
  },
};