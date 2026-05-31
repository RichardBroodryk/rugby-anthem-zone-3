type Team = {
  name: string;
  country: string;
};

export type KnockoutMatch = {
  id: string;

  home: Team;
  away: Team;

  score?: {
    home: number;
    away: number;
  };
};

function fallback(
  label: string
): Team {
  return {
    name: label,
    country: "unknown",
  };
}

function getWinner(
  match?: KnockoutMatch,
  label = "TBD"
): Team {
  if (!match?.score) {
    return fallback(label);
  }

  return match.score.home >
    match.score.away
    ? match.home
    : match.away;
}

function getLoser(
  match?: KnockoutMatch,
  label = "TBD"
): Team {
  if (!match?.score) {
    return fallback(label);
  }

  return match.score.home <
    match.score.away
    ? match.home
    : match.away;
}

/* ==================================================
   SEMI FINALS
   ================================================== */

export function buildSvnsSemiFinals(
  quarterFinals: KnockoutMatch[]
): KnockoutMatch[] {
  return [
    {
      id: "SF1",

      home: getWinner(
        quarterFinals[0],
        "Winner QF1"
      ),

      away: getWinner(
        quarterFinals[1],
        "Winner QF2"
      ),
    },

    {
      id: "SF2",

      home: getWinner(
        quarterFinals[2],
        "Winner QF3"
      ),

      away: getWinner(
        quarterFinals[3],
        "Winner QF4"
      ),
    },
  ];
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
      semiFinals[0],
      "Loser SF1"
    ),

    away: getLoser(
      semiFinals[1],
      "Loser SF2"
    ),
  };
}

/* ==================================================
   GRAND FINAL
   ================================================== */

export function buildSvnsFinal(
  semiFinals: KnockoutMatch[]
): KnockoutMatch {
  return {
    id: "FINAL",

    home: getWinner(
      semiFinals[0],
      "Winner SF1"
    ),

    away: getWinner(
      semiFinals[1],
      "Winner SF2"
    ),
  };
}

/* ==================================================
   FIFTH PLACE FINAL
   ================================================== */

export function buildSvnsFifthPlaceFinal(): KnockoutMatch {
  return {
    id: "FIFTH",

    home: {
      name: "TBD",
      country: "unknown",
    },

    away: {
      name: "TBD",
      country: "unknown",
    },
  };
}

/* ==================================================
   SEVENTH PLACE FINAL
   ================================================== */

export function buildSvnsSeventhPlaceFinal(): KnockoutMatch {
  return {
    id: "SEVENTH",

    home: {
      name: "TBD",
      country: "unknown",
    },

    away: {
      name: "TBD",
      country: "unknown",
    },
  };
}