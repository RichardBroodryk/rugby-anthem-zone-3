// src/utils/svns/buildSvnsProgression.ts

export type KnockoutTeam = {
  team: string;
  country: string;

  pool: string;

  position: number;

  points: number;

  pd: number;

  pf: number;
};

export type KnockoutMatch = {
  id: string;

  home: KnockoutTeam;
  away: KnockoutTeam;

  score?: {
    home: number;
    away: number;
  };
};

/* ==================================================
   WINNER
   ================================================== */

function getWinner(
  match: KnockoutMatch
): KnockoutTeam {
  if (!match.score) {
    return match.home;
  }

  return match.score.home >
    match.score.away
    ? match.home
    : match.away;
}

/* ==================================================
   LOSER
   ================================================== */

function getLoser(
  match: KnockoutMatch
): KnockoutTeam {
  if (!match.score) {
    return match.away;
  }

  return match.score.home >
    match.score.away
    ? match.away
    : match.home;
}

/* ==================================================
   SEMI FINALS
   ================================================== */

export function buildSvnsSemiFinals(
  quarterFinals: KnockoutMatch[]
): KnockoutMatch[] {
  if (
    quarterFinals.length !== 4
  ) {
    return [];
  }

  return [
    {
      id: "SF1",

      home: getWinner(
        quarterFinals[0]
      ),

      away: getWinner(
        quarterFinals[1]
      ),
    },

    {
      id: "SF2",

      home: getWinner(
        quarterFinals[2]
      ),

      away: getWinner(
        quarterFinals[3]
      ),
    },
  ];
}

/* ==================================================
   FINAL
   ================================================== */

export function buildSvnsFinal(
  semiFinals: KnockoutMatch[]
): KnockoutMatch {
  return {
    id: "FINAL",

    home: getWinner(
      semiFinals[0]
    ),

    away: getWinner(
      semiFinals[1]
    ),
  };
}

/* ==================================================
   BRONZE FINAL
   ================================================== */

export function buildSvnsBronzeFinal(
  semiFinals: KnockoutMatch[]
): KnockoutMatch {
  return {
    id: "BRONZE",

    home: getLoser(
      semiFinals[0]
    ),

    away: getLoser(
      semiFinals[1]
    ),
  };
}

/* ==================================================
   RANK QF LOSERS
   ================================================== */

function rankQuarterFinalLosers(
  quarterFinals: KnockoutMatch[]
): KnockoutTeam[] {
  return quarterFinals
    .map((match) =>
      getLoser(match)
    )
    .sort((a, b) => {
      /* ================= POOL POINTS ================= */

      if (
        b.points !== a.points
      ) {
        return (
          b.points -
          a.points
        );
      }

      /* ================= PD ================= */

      if (b.pd !== a.pd) {
        return b.pd - a.pd;
      }

      /* ================= PF ================= */

      return b.pf - a.pf;
    });
}

/* ==================================================
   FIFTH PLACE FINAL
   ================================================== */

export function buildSvnsFifthPlaceFinal(
  quarterFinals: KnockoutMatch[]
): KnockoutMatch {
  const rankedLosers =
    rankQuarterFinalLosers(
      quarterFinals
    );

  return {
    id: "5TH",

    home: rankedLosers[0],

    away: rankedLosers[1],
  };
}

/* ==================================================
   SEVENTH PLACE FINAL
   ================================================== */

export function buildSvnsSeventhPlaceFinal(
  quarterFinals: KnockoutMatch[]
): KnockoutMatch {
  const rankedLosers =
    rankQuarterFinalLosers(
      quarterFinals
    );

  return {
    id: "7TH",

    home: rankedLosers[2],

    away: rankedLosers[3],
  };
}