import type { LeagueTableRow } from "../data/tables2026";

/* ==================================================
   TYPES
   ================================================== */

type LiveStanding = {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pf: number;
  pa: number;
  pts: number;
  pd: number;
};

export type ResolvedTableRow = {
  position: number;

  team: string;
  coach: string;

  played: number;
  wins: number;
  draws: number;
  losses: number;

  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;

  leaguePoints: number;
};

/* ==================================================
   TEAM ALIASES
   🔒 SINGLE SOURCE OF NAME NORMALIZATION
   ================================================== */

const TEAM_ALIASES: Record<string, string> = {
  // URC
  "cardiff rugby": "cardiff",

  // PREMIERSHIP
  "bristol": "bristol bears",
  "gloucester": "gloucester rugby",
  "newcastle red bulls": "newcastle falcons",

  // TOP 14
  "stade francais paris": "stade français paris",
  "lyon": "lyon ou",
  "bordeaux begles": "bordeaux",
  "clermont": "clermont women",

  // JAPAN
  "wild knights": "panasonic wild knights",
  "spears kubota": "kubota spears",
  "black rams": "black rams tokyo",

  // SUPER
  "force": "western force",
};

/* ==================================================
   NORMALIZER
   ================================================== */

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/rugby|club|fc|team/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* ==================================================
   RESOLVE NAME
   ================================================== */

function resolveTeamName(name: string): string {
  const normalized = normalize(name);

  return TEAM_ALIASES[normalized] || normalized;
}

/* ==================================================
   SAFE OVERLAY
   ================================================== */

export function applyTableOverlay(
  baseTable: LeagueTableRow[],
  standings?: LiveStanding[]
): ResolvedTableRow[] {
  if (!standings || standings.length === 0) {
    return baseTable.map((row) => ({
      position: row.position,

      team: row.team,
      coach: row.coach,

      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,

      pointsFor: row.pointsFor,
      pointsAgainst: row.pointsAgainst,
      pointsDiff:
        row.pointsFor - row.pointsAgainst,

      leaguePoints: row.leaguePoints,
    }));
  }

  return baseTable.map((baseRow) => {
    const resolvedBase = resolveTeamName(
      baseRow.team
    );

    const live = standings.find((s) => {
      return (
        resolveTeamName(s.team) === resolvedBase
      );
    });

    // 🔒 NO MATCH → KEEP BASELINE
    if (!live) {
      return {
        position: baseRow.position,

        team: baseRow.team,
        coach: baseRow.coach,

        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,

        pointsFor: baseRow.pointsFor,
        pointsAgainst: baseRow.pointsAgainst,
        pointsDiff:
          baseRow.pointsFor -
          baseRow.pointsAgainst,

        leaguePoints: baseRow.leaguePoints,
      };
    }

    // ✅ SAFE OVERLAY
    return {
      position: baseRow.position,

      team: baseRow.team,
      coach: baseRow.coach,

      played: live.played,
      wins: live.won,
      draws: live.drawn,
      losses: live.lost,

      pointsFor: live.pf,
      pointsAgainst: live.pa,
      pointsDiff: live.pd,

      leaguePoints: live.pts,
    };
  });
}