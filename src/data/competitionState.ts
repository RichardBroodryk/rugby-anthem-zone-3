/* ==================================================
   RAZ SYSTEM — COMPETITION STATES
   ================================================== */

export type CompetitionState =
  | "regular-season"
  | "playoffs"
  | "final"
  | "completed";

export type CompetitionPhase =
  | "league"
  | "quarter-finals"
  | "semi-finals"
  | "grand-final";

export type CompetitionFixture = {
  home: string;
  away: string;

  date: string;
  venue: string;
};

export type CompetitionStateEntry = {
  state: CompetitionState;

  phase?: CompetitionPhase;

  bannerTitle?: string;
  bannerSubtitle?: string;

  champion?: string;
  runnerUp?: string;
  finalScore?: string;

  fixtures?: CompetitionFixture[];
};

export const competitionState: Record<
  string,
  CompetitionStateEntry
> = {
  /* ==================================================
     URC
     ================================================== */

  "urc-men": {
    state: "playoffs",

    phase: "quarter-finals",

    bannerTitle:
      "2026 URC Playoffs Underway",

    bannerSubtitle:
      "Quarter-finals • Semi-finals • Grand Final",

    fixtures: [
      {
        home: "Glasgow Warriors",
        away: "Connacht",
        date: "Friday, 29 May — 19:45",
        venue: "Scotstoun Stadium",
      },

      {
        home: "Bulls",
        away: "Munster",
        date: "Saturday, 30 May — 12:00",
        venue: "Loftus Versfeld",
      },

      {
        home: "Stormers",
        away: "Cardiff",
        date: "Saturday, 30 May — 14:30",
        venue: "DHL Stadium",
      },

      {
        home: "Leinster",
        away: "Lions",
        date: "Saturday, 30 May — 20:00",
        venue: "Aviva Stadium",
      },
    ],
  },

  /* ==================================================
     PREMIERSHIP
     ================================================== */

  "premiership-men": {
    state: "regular-season",

    phase: "league",

    bannerTitle:
      "Premiership Run-In",

    bannerSubtitle:
      "Top 4 qualify for the playoffs • Final on 20 June 2026",
  },

  /* ==================================================
     TOP 14
     ================================================== */

  "top14-men": {
    state: "playoffs",

    phase: "quarter-finals",

    bannerTitle:
      "Top 14 Barrage Phase",

    bannerSubtitle:
      "Toulouse qualified directly for the semi-finals",

    fixtures: [
      {
        home: "Bayonne",
        away: "Clermont",
        date: "June 2026",
        venue: "France",
      },
    ],
  },

  /* ==================================================
     SUPER RUGBY
     ================================================== */

  "super-men": {
    state: "regular-season",

    phase: "league",

    bannerTitle:
      "Super Rugby Pacific Race",

    bannerSubtitle:
      "Top 8 qualify for the quarter-finals",
  },

  /* ==================================================
     CHAMPIONS CUP
     ================================================== */

  "investec-men": {
    state: "completed",

    phase: "grand-final",

    bannerTitle:
      "2026 Champions Cup Completed",

    bannerSubtitle:
      "Union Bordeaux-Bègles crowned champions",

    champion:
      "Union Bordeaux-Bègles",

    runnerUp: "Leinster",

    finalScore: "28-20",
  },

  /* ==================================================
     JAPAN LEAGUE ONE
     ================================================== */

  "japan-men": {
    state: "playoffs",

    phase: "quarter-finals",

    bannerTitle:
      "Japan Rugby League One Playoffs",

    bannerSubtitle:
      "Top 6 qualified • Kobe Steelers and Wild Knights receive byes",

    fixtures: [
      {
        home: "Tokyo Sungoliath",
        away: "BlackRams Tokyo",
        date: "May 2026",
        venue: "Japan",
      },
    ],
  },

  /* ==================================================
     SVNS
     ================================================== */

  "svns": {
    state: "playoffs",

    phase: "quarter-finals",

    bannerTitle:
      "2026 SVNS World Championship",

    bannerSubtitle:
      "Valladolid Leg Live",
  },
};