type Team = {
  name: string;
  country: string;
};

type RankedTeam = Team & {
  pool: string;
  points?: number;
  pointsDiff?: number;
};

export type QuarterFinalMatch = {
  id: string;

  home: Team;
  away: Team;

  score?: {
    home: number;
    away: number;
  };
};

function safeTeam(
  team?: RankedTeam
): Team {
  return (
    team || {
      name: "TBD",
      country: "unknown",
    }
  );
}

/* ==================================================
   BUILD SVNS QUARTER FINALS
   ================================================== */

export function buildSvnsQuarterFinals(
  poolWinners: RankedTeam[],
  runnersUp: RankedTeam[],
  thirdPlace: RankedTeam[]
): QuarterFinalMatch[] {
  const sortedSeconds = [
    ...runnersUp,
  ].sort(
    (a, b) =>
      (b.points || 0) -
        (a.points || 0) ||
      (b.pointsDiff || 0) -
        (a.pointsDiff || 0)
  );

  const sortedThirds = [
    ...thirdPlace,
  ].sort(
    (a, b) =>
      (b.points || 0) -
        (a.points || 0) ||
      (b.pointsDiff || 0) -
        (a.pointsDiff || 0)
  );

  return [
    {
      id: "QF1",

      home: safeTeam(
        poolWinners[0]
      ),

      away: safeTeam(
        sortedSeconds[0]
      ),
    },

    {
      id: "QF2",

      home: safeTeam(
        poolWinners[1]
      ),

      away: safeTeam(
        sortedThirds[0]
      ),
    },

    {
      id: "QF3",

      home: safeTeam(
        poolWinners[2]
      ),

      away: safeTeam(
        sortedThirds[1]
      ),
    },

    {
      id: "QF4",

      home: safeTeam(
        sortedSeconds[1]
      ),

      away: safeTeam(
        sortedThirds[2]
      ),
    },
  ];
}