import type { MatchData } from "../../data/matches/types";

import { buildStandings } from "../standings/standingsEngine";

export type QualifiedTeam = {
  name: string;

  country: string;

  pool: string;

  points: number;

  pointsDiff: number;
};

export function getPoolQualifiers(
  matches: MatchData[]
) {
  const pools = [
    "A",
    "B",
    "C",
  ];

  const winners: QualifiedTeam[] =
    [];

  const runnersUp: QualifiedTeam[] =
    [];

  const thirdPlace: QualifiedTeam[] =
    [];

  pools.forEach((pool) => {
    const poolMatches =
      matches.filter(
        (m) =>
          m.pool === pool &&
          m.round === "pool"
      );

    if (!poolMatches.length) {
      return;
    }

    const standings =
      buildStandings(
        poolMatches
      );

    standings.forEach(
      (team, index) => {
        const match =
          poolMatches.find(
            (m) =>
              m.home.name ===
                team.team ||
              m.away.name ===
                team.team
          );

        const resolvedTeam =
          match?.home.name ===
          team.team
            ? match.home
            : match?.away;

        const enriched = {
          name: team.team,

          country:
            resolvedTeam?.country ||
            "unknown",

          pool,

          points:
            team.points,

          pointsDiff:
            team.pointsDiff,
        };

        if (index === 0) {
          winners.push(
            enriched
          );
        }

        if (index === 1) {
          runnersUp.push(
            enriched
          );
        }

        if (index === 2) {
          thirdPlace.push(
            enriched
          );
        }
      }
    );
  });

  return {
    winners,
    runnersUp,
    thirdPlace,
  };
}