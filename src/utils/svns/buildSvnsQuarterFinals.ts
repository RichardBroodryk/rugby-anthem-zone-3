// src/utils/svns/buildSvnsQuarterFinals.ts

import type {
  QualifiedTeam,
} from "./getSvnsQualifiedTeams";

export type QuarterFinal = {
  id: string;

  home: QualifiedTeam;

  away: QualifiedTeam;
};

/* ==================================================
   BUILD QUARTER FINALS
   ================================================== */

export function buildSvnsQuarterFinals(
  teams: QualifiedTeam[]
): QuarterFinal[] {
  const winners = teams.filter(
    (t) => t.position === 1
  );

  const runners = teams.filter(
    (t) => t.position === 2
  );

  const thirds = teams.filter(
    (t) => t.position === 3
  );

  const A1 = winners.find(
    (t) => t.pool === "A"
  );

  const B1 = winners.find(
    (t) => t.pool === "B"
  );

  const C1 = winners.find(
    (t) => t.pool === "C"
  );

  const A2 = runners.find(
    (t) => t.pool === "A"
  );

  const B2 = runners.find(
    (t) => t.pool === "B"
  );

  const C2 = runners.find(
    (t) => t.pool === "C"
  );

  const T1 = thirds[0];
  const T2 = thirds[1];

  if (
    !A1 ||
    !B1 ||
    !C1 ||
    !A2 ||
    !B2 ||
    !C2 ||
    !T1 ||
    !T2
  ) {
    return [];
  }

  return [
    {
      id: "QF1",

      home: A1,
      away: T2,
    },

    {
      id: "QF2",

      home: B1,
      away: C2,
    },

    {
      id: "QF3",

      home: C1,
      away: B2,
    },

    {
      id: "QF4",

      home: T1,
      away: A2,
    },
  ];
}