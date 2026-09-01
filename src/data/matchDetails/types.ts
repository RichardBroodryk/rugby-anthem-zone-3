/* ==================================================
   MATCH DETAILS TYPES
   ================================================== */

export type Player = {
  number: number;
  name: string;
};

export type TimelineEvent = {
  minute: string;
  label: string;
};

export type PerformanceStat = {
  category: string;
  player: string;
  value: string;
};

export type MatchTeamStats = {
  metresMade: number;
  carries: number;
  defendersBeaten: number;
  cleanBreaks: number;
  offloads: number;
  tacklesMade: number;
  tacklesMissed: number;
  turnoversWon: number;
  penaltiesConceded: number;
};

export type MatchStats = {
  home: MatchTeamStats;
  away: MatchTeamStats;
};

export type MatchDetails = {
  matchKey: string;
  highlightsUrl?: string;
  matchStats?: MatchStats;
  timeline?: TimelineEvent[];
  lineups?: {
    homeStarting: Player[];
    homeBench: Player[];
    awayStarting: Player[];
    awayBench: Player[];
  };
  performances?: PerformanceStat[];
};