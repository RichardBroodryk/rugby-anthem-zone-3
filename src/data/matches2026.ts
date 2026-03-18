// --------------------------------------------------
// Standardized match format for 2026 (AUTHORITATIVE)
// --------------------------------------------------

export interface MatchData {
  id: number;
  tournament: string;
  date: string;
  venue: string;

  home: {
    name: string;
    country: string;
  };

  away: {
    name: string;
    country: string;
  };

  score?: {
    home: number;
    away: number;
  };
}

// --------------------------------------------------
// 2026 MATCHES — CANONICAL DATASET
// --------------------------------------------------

export const matches2026: MatchData[] = [

  // ==================================================
  // SIX NATIONS 2026
  // ==================================================

  {
    id: 101,
    tournament: "Six Nations 2026",
    date: "2026-02-05",
    venue: "Stade de France",
    home: { name: "France", country: "france" },
    away: { name: "Ireland", country: "ireland" },
    score: { home: 36, away: 14 },
  },
  {
    id: 102,
    tournament: "Six Nations 2026",
    date: "2026-02-07",
    venue: "Stadio Olimpico",
    home: { name: "Italy", country: "italy" },
    away: { name: "Scotland", country: "scotland" },
    score: { home: 18, away: 15 },
  },
  {
    id: 103,
    tournament: "Six Nations 2026",
    date: "2026-02-07",
    venue: "Twickenham",
    home: { name: "England", country: "england" },
    away: { name: "Wales", country: "wales" },
    score: { home: 48, away: 7 },
  },

  {
    id: 104,
    tournament: "Six Nations 2026",
    date: "2026-02-14",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Italy", country: "italy" },
    score: { home: 20, away: 13 },
  },
  {
    id: 105,
    tournament: "Six Nations 2026",
    date: "2026-02-14",
    venue: "Murrayfield",
    home: { name: "Scotland", country: "scotland" },
    away: { name: "England", country: "england" },
    score: { home: 31, away: 20 },
  },
  {
    id: 106,
    tournament: "Six Nations 2026",
    date: "2026-02-15",
    venue: "Principality Stadium",
    home: { name: "Wales", country: "wales" },
    away: { name: "France", country: "france" },
    score: { home: 12, away: 54 },
  },

  {
    id: 107,
    tournament: "Six Nations 2026",
    date: "2026-02-21",
    venue: "Twickenham",
    home: { name: "England", country: "england" },
    away: { name: "Ireland", country: "ireland" },
    score: { home: 21, away: 42 },
  },
  {
    id: 108,
    tournament: "Six Nations 2026",
    date: "2026-02-21",
    venue: "Principality Stadium",
    home: { name: "Wales", country: "wales" },
    away: { name: "Scotland", country: "scotland" },
    score: { home: 23, away: 26 },
  },
  {
    id: 109,
    tournament: "Six Nations 2026",
    date: "2026-02-22",
    venue: "Stade Pierre-Mauroy",
    home: { name: "France", country: "france" },
    away: { name: "Italy", country: "italy" },
    score: { home: 33, away: 8 },
  },

  {
    id: 110,
    tournament: "Six Nations 2026",
    date: "2026-03-06",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Wales", country: "wales" },
    score: { home: 27, away: 17 },
  },
  {
    id: 111,
    tournament: "Six Nations 2026",
    date: "2026-03-07",
    venue: "Murrayfield",
    home: { name: "Scotland", country: "scotland" },
    away: { name: "France", country: "france" },
    score: { home: 50, away: 40 },
  },
  {
    id: 112,
    tournament: "Six Nations 2026",
    date: "2026-03-07",
    venue: "Stadio Olimpico",
    home: { name: "Italy", country: "italy" },
    away: { name: "England", country: "england" },
    score: { home: 23, away: 18 },
  },

  {
    id: 113,
    tournament: "Six Nations 2026",
    date: "2026-03-14",
    venue: "Aviva Stadium",
    home: { name: "Ireland", country: "ireland" },
    away: { name: "Scotland", country: "scotland" },
    score: { home: 43, away: 21 },
  },
  {
    id: 114,
    tournament: "Six Nations 2026",
    date: "2026-03-14",
    venue: "Principality Stadium",
    home: { name: "Wales", country: "wales" },
    away: { name: "Italy", country: "italy" },
    score: { home: 31, away: 17 },
  },
  {
    id: 115,
    tournament: "Six Nations 2026",
    date: "2026-03-14",
    venue: "Stade de France",
    home: { name: "France", country: "france" },
    away: { name: "England", country: "england" },
    score: { home: 48, away: 46 },
  },

  // ==================================================
  // NATIONS CHAMPIONSHIP 2026 — JULY WINDOW
  // ==================================================

  {
    id: 201,
    tournament: "Nations Championship 2026",
    date: "2026-07-03",
    venue: "Christchurch",
    home: { name: "New Zealand", country: "new-zealand" },
    away: { name: "France", country: "france" },
  },
  {
    id: 202,
    tournament: "Nations Championship 2026",
    date: "2026-07-03",
    venue: "Sydney",
    home: { name: "Australia", country: "australia" },
    away: { name: "Ireland", country: "ireland" },
  },
  {
    id: 203,
    tournament: "Nations Championship 2026",
    date: "2026-07-03",
    venue: "Johannesburg",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "England", country: "england" },
  },
  {
    id: 204,
    tournament: "Nations Championship 2026",
    date: "2026-07-03",
    venue: "Cordoba",
    home: { name: "Argentina", country: "argentina" },
    away: { name: "Scotland", country: "scotland" },
  },

  // ==================================================
  // INTERNATIONAL TESTS
  // ==================================================

  {
    id: 301,
    tournament: "Men's International Tests 2026",
    date: "2026-08-08",
    venue: "Hanazono Rugby Stadium",
    home: { name: "Japan", country: "japan" },
    away: { name: "Australia", country: "australia" },
  },
  {
    id: 302,
    tournament: "Men's International Tests 2026",
    date: "2026-10-10",
    venue: "Eden Park",
    home: { name: "New Zealand", country: "new-zealand" },
    away: { name: "Australia", country: "australia" },
  },

  // ==================================================
  // RIVAL TOUR — SOUTH AFRICA vs NEW ZEALAND
  // ==================================================

  {
    id: 401,
    tournament: "Men's SA vs NZ Rival Tour 2026",
    date: "2026-08-22",
    venue: "Loftus Versfeld",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
  },
  {
    id: 402,
    tournament: "Men's SA vs NZ Rival Tour 2026",
    date: "2026-09-12",
    venue: "M&T Bank Stadium",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
  },

  // ==================================================
  // WOMEN — INTERNATIONAL TESTS
  // ==================================================

  {
    id: 501,
    tournament: "Women's International Tests 2026",
    date: "2026-03-27",
    venue: "Canberra",
    home: { name: "Australia", country: "australia" },
    away: { name: "Fiji", country: "fiji" },
  },

  // ==================================================
  // WOMEN — SA vs NZ TOUR
  // ==================================================

  {
    id: 601,
    tournament: "Women's SA vs NZ Rival Tour 2026",
    date: "2026-09-05",
    venue: "Johannesburg",
    home: { name: "South Africa", country: "south-africa" },
    away: { name: "New Zealand", country: "new-zealand" },
  },

];