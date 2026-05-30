// src/utils/svns/buildSvnsStandings.ts

import type { MatchData } from "../../data/matches/types";

export type SvnsStanding = {
  team: string;
  country: string;

  played: number;

  won: number;
  lost: number;
  drawn: number;

  pf: number;
  pa: number;
  pd: number;

  points: number;
};

/* ==================================================
   SVNS STANDINGS ENGINE
   ================================================== */

export function buildSvnsStandings(
  matches: MatchData[]
): SvnsStanding[] {
  const table: Record<
    string,
    SvnsStanding
  > = {};

  /* ==================================================
     ENSURE TEAM
     ================================================== */

  function ensureTeam(
    team: string,
    country: string
  ) {
    if (!table[team]) {
      table[team] = {
        team,
        country,

        played: 0,

        won: 0,
        lost: 0,
        drawn: 0,

        pf: 0,
        pa: 0,
        pd: 0,

        points: 0,
      };
    }
  }

  /* ==================================================
     FINAL MATCHES ONLY
     ================================================== */

  const completedMatches =
    matches.filter(
      (match) =>
        match.score &&
        match.state === "final"
    );

  /* ==================================================
     PROCESS MATCHES
     ================================================== */

  completedMatches.forEach((match) => {
    if (!match.score) return;

    ensureTeam(
      match.home.name,
      match.home.country
    );

    ensureTeam(
      match.away.name,
      match.away.country
    );

    const home =
      table[match.home.name];

    const away =
      table[match.away.name];

    const hs = match.score.home;
    const as = match.score.away;

    home.played += 1;
    away.played += 1;

    home.pf += hs;
    home.pa += as;

    away.pf += as;
    away.pa += hs;

    /* ================= WIN ================= */

    if (hs > as) {
      home.won += 1;
      away.lost += 1;

      home.points += 3;
      away.points += 1;
    }

    /* ================= LOSS ================= */

    else if (as > hs) {
      away.won += 1;
      home.lost += 1;

      away.points += 3;
      home.points += 1;
    }

    /* ================= DRAW ================= */

    else {
      home.drawn += 1;
      away.drawn += 1;

      home.points += 2;
      away.points += 2;
    }
  });

  /* ==================================================
     FINALIZE
     ================================================== */

  Object.values(table).forEach((team) => {
    team.pd = team.pf - team.pa;
  });

  /* ==================================================
     SORT
     ================================================== */

  return Object.values(table).sort(
    (a, b) => {
      /* ================= POINTS ================= */

      if (b.points !== a.points) {
        return b.points - a.points;
      }

      /* ================= PD ================= */

      if (b.pd !== a.pd) {
        return b.pd - a.pd;
      }

      /* ================= PF ================= */

      if (b.pf !== a.pf) {
        return b.pf - a.pf;
      }

      /* ================= TEAM ================= */

      return a.team.localeCompare(
        b.team
      );
    }
  );
}