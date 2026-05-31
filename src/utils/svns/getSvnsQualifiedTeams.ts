// src/utils/svns/getSvnsQualifiedTeams.ts

import type { MatchData } from "../../data/matches/types";

import {
  buildSvnsStandings,
} from "./buildSvnsStandings";

/* ==================================================
   TYPES
   ================================================== */

export type QualifiedTeam = {
  team: string;

  country: string;

  pool: string;

  position: number;

  points: number;

  pd: number;

  pf: number;
};

export type QualificationResult = {
  poolWinners: QualifiedTeam[];

  runnersUp: QualifiedTeam[];

  bestThirds: QualifiedTeam[];

  quarterFinalists: QualifiedTeam[];
};

/* ==================================================
   GET SVNS QUALIFIED TEAMS
   ================================================== */

export function getSvnsQualifiedTeams(
  matches: MatchData[],
  gender: "men" | "women"
): QualificationResult {
  const poolKeys = [
    "A",
    "B",
    "C",
  ];

  const poolWinners: QualifiedTeam[] =
    [];

  const runnersUp: QualifiedTeam[] =
    [];

  const thirdPlaceTeams: QualifiedTeam[] =
    [];

  /* ==================================================
     BUILD EACH POOL TABLE
     ================================================== */

  poolKeys.forEach((pool) => {
    const poolMatches =
      matches.filter(
        (m) =>
          m.gender === gender &&
          m.round === "pool" &&
          m.pool === pool
      );

    const standings =
      buildSvnsStandings(
        poolMatches
      );

    standings.forEach(
      (row, index) => {
        const sourceMatch =
          poolMatches.find(
            (m) =>
              m.home.name ===
                row.team ||
              m.away.name ===
                row.team
          );

        const country =
          sourceMatch?.home.name ===
          row.team
            ? sourceMatch.home.country
            : sourceMatch?.away
                .country ||
              "unknown";

        const team: QualifiedTeam =
          {
            team: row.team,

            country,

            pool,

            position:
              index + 1,

            points:
              row.points,

            pd:
              row.pointsDiff,

            pf:
              row.pointsFor,
          };

        /* ======================================
           POOL WINNER
           ====================================== */

        if (index === 0) {
          poolWinners.push(
            team
          );
        }

        /* ======================================
           RUNNER UP
           ====================================== */

        else if (index === 1) {
          runnersUp.push(
            team
          );
        }

        /* ======================================
           THIRD PLACE
           ====================================== */

        else if (index === 2) {
          thirdPlaceTeams.push(
            team
          );
        }
      }
    );
  });

  /* ==================================================
     BEST THIRD PLACE TEAMS
     ================================================== */

  const bestThirds =
    thirdPlaceTeams
      .sort((a, b) => {
        if (
          b.points !==
          a.points
        ) {
          return (
            b.points -
            a.points
          );
        }

        if (
          b.pd !== a.pd
        ) {
          return (
            b.pd - a.pd
          );
        }

        return (
          b.pf - a.pf
        );
      })
      .slice(0, 2);

  /* ==================================================
     FINALISTS
     ================================================== */

  const quarterFinalists = [
    ...poolWinners,
    ...runnersUp,
    ...bestThirds,
  ];

  return {
    poolWinners,

    runnersUp,

    bestThirds,

    quarterFinalists,
  };
}