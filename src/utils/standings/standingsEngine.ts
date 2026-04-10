// ==================================================
// RAZ SYSTEM — STANDINGS ENGINE (V2 - EXTENDED)
// ==================================================

import type { MatchData } from "../../data/matches/types";

export type TeamStanding = {
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
};

export function buildStandings(matches: MatchData[]): TeamStanding[] {
  const table: Record<string, TeamStanding> = {};

  const ensureTeam = (name: string) => {
    if (!table[name]) {
      table[name] = {
        team: name,
        played: 0,
        won: 0,
        lost: 0,
        points: 0,
        pointsFor: 0,
        pointsAgainst: 0,
        pointsDiff: 0,
      };
    }
  };

  matches.forEach((match) => {
    if (!match.score) return;

    const home = match.home.name;
    const away = match.away.name;

    ensureTeam(home);
    ensureTeam(away);

    const homeScore = match.score.home;
    const awayScore = match.score.away;

    table[home].played += 1;
    table[away].played += 1;

    table[home].pointsFor += homeScore;
    table[home].pointsAgainst += awayScore;

    table[away].pointsFor += awayScore;
    table[away].pointsAgainst += homeScore;

    if (homeScore > awayScore) {
      table[home].won += 1;
      table[away].lost += 1;
      table[home].points += 3;
    } else if (awayScore > homeScore) {
      table[away].won += 1;
      table[home].lost += 1;
      table[away].points += 3;
    }
  });

  // calculate PD
  Object.values(table).forEach((team) => {
    team.pointsDiff = team.pointsFor - team.pointsAgainst;
  });

  // sort: points → PD
  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return b.pointsDiff - a.pointsDiff;
  });
}