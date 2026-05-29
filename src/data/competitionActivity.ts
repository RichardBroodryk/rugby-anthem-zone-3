export type ActivityMatch = {
  home: string;
  away: string;

  homeScore?: number;
  awayScore?: number;

  date: string;
};

export type LeagueActivity = {
  recentResults?: ActivityMatch[];

  upcomingFixtures?: ActivityMatch[];
};

export const competitionActivity: Record<
  string,
  LeagueActivity
> = {
  /* ==================================================
     URC
     ================================================== */

  "urc-men": {
    recentResults: [
      {
        home: "Leinster",
        away: "Lions",
        homeScore: 32,
        awayScore: 21,
        date: "24 May 2026",
      },

      {
        home: "Stormers",
        away: "Cardiff",
        homeScore: 28,
        awayScore: 19,
        date: "24 May 2026",
      },
    ],

    upcomingFixtures: [
      {
        home: "Glasgow Warriors",
        away: "Connacht",
        date: "29 May 2026",
      },

      {
        home: "Bulls",
        away: "Munster",
        date: "30 May 2026",
      },
    ],
  },

  /* ==================================================
     PREMIERSHIP
     ================================================== */

  "premiership-men": {
    recentResults: [
      {
        home: "Bath",
        away: "Saracens",
        homeScore: 31,
        awayScore: 27,
        date: "18 May 2026",
      },
    ],

    upcomingFixtures: [
      {
        home: "Northampton Saints",
        away: "Bristol Bears",
        date: "30 May 2026",
      },
    ],
  },

  /* ==================================================
     SUPER RUGBY
     ================================================== */

  "super-men": {
    recentResults: [
      {
        home: "Chiefs",
        away: "Reds",
        homeScore: 36,
        awayScore: 24,
        date: "20 May 2026",
      },
    ],

    upcomingFixtures: [
      {
        home: "Hurricanes",
        away: "Crusaders",
        date: "5 June 2026",
      },
    ],
  },

  /* ==================================================
     JAPAN
     ================================================== */

  "japan-men": {
    recentResults: [
      {
        home: "Tokyo Sungoliath",
        away: "BlackRams Tokyo",
        homeScore: 29,
        awayScore: 25,
        date: "22 May 2026",
      },
    ],

    upcomingFixtures: [
      {
        home: "Kobe Steelers",
        away: "Tokyo Sungoliath",
        date: "30 May 2026",
      },
    ],
  },
};