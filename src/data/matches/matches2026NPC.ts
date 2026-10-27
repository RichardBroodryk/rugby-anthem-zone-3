import type { MatchData } from "./types";

// ==================================================
// MEN'S DOMESTIC MATCHES 2026
// BUNNINGS NPC — PLAYOFFS
// ==================================================

export const matches2026NPC: MatchData[] = [
 {
  id: 9201,
  matchKey: "northland-vs-otago-npc-2026",
  competitionId: "npc",
  tournamentInstanceId: "npc-2026",
  tournament: "Bunnings NPC 2026",
  gender: "men",
  round: "Semi-Final",
  date: "2026-10-16",
  venue: "Semenoff Stadium, Whangārei",
  home: {
    name: "Northland",
    country: "npc-northland",
  },
  away: {
    name: "Otago",
    country: "npc-otago",
  },
  score: { home: 38, away: 19 },
  state: "final",
  startTime: "19:10",
},
  {
  id: 9202,
  matchKey: "canterbury-vs-taranaki-npc-2026",
  competitionId: "npc",
  tournamentInstanceId: "npc-2026",
  tournament: "Bunnings NPC 2026",
  gender: "men",
  round: "Semi-Final",
  date: "2026-10-18",
  venue: "One NZ Stadium, Christchurch",
  home: {
    name: "Canterbury",
    country: "npc-canterbury",
  },
  away: {
    name: "Taranaki",
    country: "npc-taranaki",
  },
  score: { home: 38, away: 28 },
  state: "final",
  startTime: "15:35",
},

{
  id: 9203,
  matchKey: "canterbury-vs-northland-npc-final-2026",
  competitionId: "npc",
  tournamentInstanceId: "npc-2026",
  tournament: "Bunnings NPC 2026",
  gender: "men",
  round: "Grand Final",
  date: "2026-10-26",
  venue: "One NZ Stadium, Christchurch",
  home: {
    name: "Canterbury",
    country: "npc-canterbury",
  },
  away: {
    name: "Northland",
    country: "npc-northland",
  },
  score: { home: 43, away: 24 },
  state: "final",
  startTime: "14:05",
},
];