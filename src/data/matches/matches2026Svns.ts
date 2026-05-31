// src/data/matches/matches2026Svns.ts

import type { MatchData } from "./types";

/* ==================================================
   HELPERS
   ================================================== */

function buildMatchKey(
  home: string,
  away: string
) {
  const normalize = (value: string) =>
    value
      .toLowerCase()
      .replace(/\b(women|w|7s|sevens)\b/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .trim();

  return `${normalize(home)}-vs-${normalize(
    away
  )}`;
}

/* ==================================================
   RAW MATCHES
   ================================================== */

const rawMatches: Omit<
  MatchData,
  "matchKey"
>[] = [
  /* ==================================================
     HONG KONG FINALS
     ================================================== */

  {
    id: 21001,
    competitionId: "svns",
    tournament:
      "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",

    stage: "hong-kong",

    gender: "women",

    round: "final",

    placement: 1,

    state: "final",

    date: "2026-04-19T18:00:00",

    venue: "Kai Tak Sports Park",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Australia",
      country: "australia",
    },

    score: {
      home: 19,
      away: 14,
    },
  },

  {
    id: 21002,
    competitionId: "svns",
    tournament:
      "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",

    stage: "hong-kong",

    gender: "women",

    round: "third-place",

    placement: 3,

    state: "final",

    date: "2026-04-19T16:40:00",

    venue: "Kai Tak Sports Park",

    home: {
      name: "France",
      country: "france",
    },

    away: {
      name: "Canada",
      country: "canada",
    },

    score: {
      home: 31,
      away: 7,
    },
  },

  {
    id: 22001,
    competitionId: "svns",
    tournament:
      "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",

    stage: "hong-kong",

    gender: "men",

    round: "final",

    placement: 1,

    state: "final",

    date: "2026-04-19T20:30:00",

    venue: "Kai Tak Sports Park",

    home: {
      name: "South Africa",
      country: "south-africa",
    },

    away: {
      name: "Argentina",
      country: "argentina",
    },

    score: {
      home: 35,
      away: 7,
    },
  },

  {
    id: 22002,
    competitionId: "svns",
    tournament:
      "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",

    stage: "hong-kong",

    gender: "men",

    round: "third-place",

    placement: 3,

    state: "final",

    date: "2026-04-19T18:50:00",

    venue: "Kai Tak Sports Park",

    home: {
      name: "Spain",
      country: "spain",
    },

    away: {
      name: "New Zealand",
      country: "new-zealand",
    },

    score: {
      home: 32,
      away: 28,
    },
  },

  /* ==================================================
     VALLADOLID — WOMEN DAY 1
     ================================================== */

  /* ================= POOL A ================= */

  {
    id: 31001,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T05:44:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Japan",
      country: "japan",
    },

    away: {
      name: "Brazil",
      country: "brazil",
    },

    score: {
      home: 24,
      away: 7,
    },
  },

  {
    id: 31002,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T06:50:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Argentina",
      country: "argentina",
    },

    score: {
      home: 38,
      away: 7,
    },
  },

  {
    id: 31003,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T11:02:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Japan",
      country: "japan",
    },

    score: {
      home: 31,
      away: 12,
    },
  },

  {
    id: 31004,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T11:24:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Brazil",
      country: "brazil",
    },

    score: {
      home: 40,
      away: 12,
    },
  },

  {
    id: 31005,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T11:46:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Japan",
      country: "japan",
    },

    away: {
      name: "Argentina",
      country: "argentina",
    },

    score: {
      home: 33,
      away: 10,
    },
  },

  /* ================= POOL B ================= */

  {
    id: 31101,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T12:08:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Fiji",
      country: "fiji",
    },

    away: {
      name: "USA",
      country:
        "united-states-of-america",
    },

    score: {
      home: 26,
      away: 19,
    },
  },

  {
    id: 31102,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T12:30:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Australia",
      country: "australia",
    },

    away: {
      name: "South Africa",
      country: "south-africa",
    },

    score: {
      home: 26,
      away: 12,
    },
  },

  {
    id: 31103,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T12:52:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "USA",
      country:
        "united-states-of-america",
    },

    away: {
      name: "South Africa",
      country: "south-africa",
    },

    score: {
      home: 26,
      away: 12,
    },
  },

  {
    id: 31104,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T13:14:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Australia",
      country: "australia",
    },

    away: {
      name: "Fiji",
      country: "fiji",
    },

    score: {
      home: 45,
      away: 5,
    },
  },

  /* ================= POOL C ================= */

  {
    id: 31201,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T13:36:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "France",
      country: "france",
    },

    away: {
      name: "Great Britain",
      country: "great-britain",
    },

    score: {
      home: 34,
      away: 0,
    },
  },

  {
    id: 31202,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T13:58:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Canada",
      country: "canada",
    },

    away: {
      name: "Spain",
      country: "spain",
    },

    score: {
      home: 35,
      away: 5,
    },
  },

  {
    id: 31203,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T14:20:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "France",
      country: "france",
    },

    away: {
      name: "Spain",
      country: "spain",
    },

    score: {
      home: 33,
      away: 7,
    },
  },

  {
    id: 31204,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "women",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T14:42:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Canada",
      country: "canada",
    },

    away: {
      name: "Great Britain",
      country: "great-britain",
    },

    score: {
      home: 21,
      away: 12,
    },
  },

  /* ==================================================
     VALLADOLID — MEN DAY 1
     ================================================== */

  /* ================= POOL A ================= */

  {
    id: 32001,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T15:04:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "South Africa",
      country: "south-africa",
    },

    away: {
      name: "Great Britain",
      country: "great-britain",
    },

    score: {
      home: 17,
      away: 12,
    },
  },

  {
    id: 32002,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T15:26:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Australia",
      country: "australia",
    },

    away: {
      name: "Kenya",
      country: "kenya",
    },

    score: {
      home: 15,
      away: 10,
    },
  },

  {
    id: 32003,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T15:48:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "South Africa",
      country: "south-africa",
    },

    away: {
      name: "Kenya",
      country: "kenya",
    },

    score: {
      home: 14,
      away: 0,
    },
  },

  {
    id: 32004,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "A",

    state: "final",

    date: "2026-05-29T16:10:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Australia",
      country: "australia",
    },

    away: {
      name: "Great Britain",
      country: "great-britain",
    },

    score: {
      home: 26,
      away: 21,
    },
  },

  /* ================= POOL B ================= */

  {
    id: 32101,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T16:32:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Uruguay",
      country: "uruguay",
    },

    score: {
      home: 40,
      away: 0,
    },
  },

  {
    id: 32102,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T16:54:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Argentina",
      country: "argentina",
    },

    away: {
      name: "Germany",
      country: "germany",
    },

    score: {
      home: 26,
      away: 17,
    },
  },

  {
    id: 32103,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T17:16:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Germany",
      country: "germany",
    },

    score: {
      home: 33,
      away: 12,
    },
  },

  {
    id: 32104,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "B",

    state: "final",

    date: "2026-05-29T17:38:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Argentina",
      country: "argentina",
    },

    away: {
      name: "Uruguay",
      country: "uruguay",
    },

    score: {
      home: 40,
      away: 14,
    },
  },

  /* ================= POOL C ================= */

  {
    id: 32201,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T18:00:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Fiji",
      country: "fiji",
    },

    away: {
      name: "France",
      country: "france",
    },

    score: {
      home: 26,
      away: 12,
    },
  },

  {
    id: 32202,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T18:22:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Spain",
      country: "spain",
    },

    away: {
      name: "USA",
      country:
        "united-states-of-america",
    },

    score: {
      home: 26,
      away: 21,
    },
  },

  {
    id: 32203,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T18:44:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "Fiji",
      country: "fiji",
    },

    away: {
      name: "USA",
      country:
        "united-states-of-america",
    },

    score: {
      home: 19,
      away: 7,
    },
  },

  {
    id: 32204,

    competitionId: "svns",

    tournament:
      "HSBC SVNS World Championship 2026",

    tournamentInstanceId: "svns-2026",

    stage: "valladolid",

    gender: "men",

    round: "pool",

    pool: "C",

    state: "final",

    date: "2026-05-29T19:06:00",

    venue: "Estadio José Zorrilla",

    home: {
      name: "France",
      country: "france",
    },

    away: {
      name: "Spain",
      country: "spain",
    },

    score: {
      home: 19,
      away: 14,
    },
  },

    /* ==================================================
     WOMEN — VALLADOLID DAY 2
     ================================================== */

  // POOL A

  {
    id: 32001,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "pool",
    pool: "A",
    state: "final",
    date: "2026-05-30T09:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Japan",
      country: "japan",
    },

    score: {
      home: 47,
      away: 14,
    },
  },

  {
    id: 32002,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "pool",
    pool: "A",
    state: "final",
    date: "2026-05-30T09:25:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Brazil",
      country: "brazil",
    },

    away: {
      name: "Argentina",
      country: "argentina",
    },

    score: {
      home: 29,
      away: 7,
    },
  },

  // POOL B

  {
    id: 32101,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "pool",
    pool: "B",
    state: "final",
    date: "2026-05-30T10:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "USA",
      country: "united-states-of-america",
    },

    away: {
      name: "Australia",
      country: "australia",
    },

    score: {
      home: 14,
      away: 10,
    },
  },

  {
    id: 32102,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "pool",
    pool: "B",
    state: "final",
    date: "2026-05-30T10:24:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Fiji",
      country: "fiji",
    },

    away: {
      name: "South Africa",
      country: "south-africa",
    },

    score: {
      home: 17,
      away: 12,
    },
  },

  // POOL C

  {
    id: 32201,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "pool",
    pool: "C",
    state: "final",
    date: "2026-05-30T11:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Canada",
      country: "canada",
    },

    away: {
      name: "France",
      country: "france",
    },

    score: {
      home: 24,
      away: 7,
    },
  },

  {
    id: 32202,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "pool",
    pool: "C",
    state: "final",
    date: "2026-05-30T11:22:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Spain",
      country: "spain",
    },

    away: {
      name: "Great Britain",
      country: "great-britain",
    },

    score: {
      home: 26,
      away: 0,
    },
  },

  /* ==================================================
     WOMEN — QUARTER FINALS
     ================================================== */

  {
    id: 32301,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "quarter-final",
    state: "final",
    date: "2026-05-30T18:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "USA",
      country: "united-states-of-america",
    },

    away: {
      name: "Fiji",
      country: "fiji",
    },

    score: {
      home: 40,
      away: 12,
    },
  },

  {
    id: 32302,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "quarter-final",
    state: "final",
    date: "2026-05-30T18:30:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "New Zealand",
      country: "new-zealand",
    },

    away: {
      name: "Spain",
      country: "spain",
    },

    score: {
      home: 33,
      away: 7,
    },
  },

  {
    id: 32303,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "quarter-final",
    state: "final",
    date: "2026-05-30T19:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Australia",
      country: "australia",
    },

    away: {
      name: "France",
      country: "france",
    },

    score: {
      home: 21,
      away: 5,
    },
  },

  {
    id: 32304,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "women",
    round: "quarter-final",
    state: "final",
    date: "2026-05-30T19:30:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Canada",
      country: "canada",
    },

    away: {
      name: "Japan",
      country: "japan",
    },

    score: {
      home: 40,
      away: 5,
    },
  },
    /* ==================================================
     MEN — VALLADOLID DAY 2
     ================================================== */

  // POOL A

  {
    id: 33001,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "pool",
    pool: "A",
    state: "final",
    date: "2026-05-30T12:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Australia",
      country: "australia",
    },

    away: {
      name: "South Africa",
      country: "south-africa",
    },

    score: {
      home: 24,
      away: 14,
    },
  },

  {
    id: 33002,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "pool",
    pool: "A",
    state: "final",
    date: "2026-05-30T12:25:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Great Britain",
      country: "great-britain",
    },

    away: {
      name: "Kenya",
      country: "kenya",
    },

    score: {
      home: 21,
      away: 10,
    },
  },

  // POOL B

  {
    id: 33101,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "pool",
    pool: "B",
    state: "final",
    date: "2026-05-30T13:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Argentina",
      country: "argentina",
    },

    away: {
      name: "New Zealand",
      country: "new-zealand",
    },

    score: {
      home: 14,
      away: 12,
    },
  },

  {
    id: 33102,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "pool",
    pool: "B",
    state: "final",
    date: "2026-05-30T13:22:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Germany",
      country: "germany",
    },

    away: {
      name: "Uruguay",
      country: "uruguay",
    },

    score: {
      home: 21,
      away: 7,
    },
  },

  // POOL C

  {
    id: 33201,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "pool",
    pool: "C",
    state: "final",
    date: "2026-05-30T14:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "Spain",
      country: "spain",
    },

    away: {
      name: "Fiji",
      country: "fiji",
    },

    score: {
      home: 14,
      away: 12,
    },
  },

  {
    id: 33202,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "pool",
    pool: "C",
    state: "final",
    date: "2026-05-30T14:24:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "France",
      country: "france",
    },

    away: {
      name: "USA",
      country: "united-states-of-america",
    },

    score: {
      home: 22,
      away: 7,
    },
  },

  /* ==================================================
     MEN — QUARTER FINALS
     ================================================== */

  {
    id: 33301,
    competitionId: "svns",
    tournament: "HSBC SVNS World Championship 2026",
    tournamentInstanceId: "svns-2026",
    stage: "valladolid",
    gender: "men",
    round: "quarter-final",
    state: "final",
    date: "2026-05-30T20:00:00",
    venue: "Estadio José Zorrilla",

    home: {
      name: "South Africa",
      country: "south-africa",
    },

    away: {
      name: "Spain",
      country: "spain",
    },

    score: {
      home: 14,
      away: 12,
    },
  },
];

/* ==================================================
   EXPORT
   ================================================== */

export const svnsMatches2026: MatchData[] =
  rawMatches.map((match) => ({
    ...match,

    matchKey: buildMatchKey(
      match.home.name,
      match.away.name
    ),
  }));