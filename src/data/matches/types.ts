// ==================================================
// RAZ SYSTEM — MATCH TYPES (FINAL STABLE)
// ==================================================

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

  competitionId: string;
  tournament: string;
  tournamentInstanceId?: string;

  // ✅ SVNS SUPPORT
  stage?: string;
  gender?: "men" | "women";
  round?: string;
  pool?: string; 
  placement?: number;

  date: string;
  venue: string;

  home: MatchTeam;
  away: MatchTeam;

  score?: MatchScore;

  state?: "upcoming" | "starting" | "live" | "final";
  importance?: number;
}