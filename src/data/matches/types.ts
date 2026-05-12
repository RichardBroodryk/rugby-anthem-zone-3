// src/data/matches/types.ts

export interface MatchTeam {
  name: string;
  country: string;
}

export interface MatchScore {
  home: number;
  away: number;
}

export interface MatchData {
  id: number;
  matchKey?: string;

  competitionId: string;
  tournament: string;
  tournamentInstanceId?: string;

  stage?: string;
  gender?: "men" | "women";
  round?: string;
  pool?: string;

  date: string;
  venue: string;

  home: MatchTeam;
  away: MatchTeam;

  // ✅ Match score structure
  score?: MatchScore;

  state?: "upcoming" | "starting" | "live" | "final";
  importance?: number;

  // SVNS placement matches
  placement?: number;
}