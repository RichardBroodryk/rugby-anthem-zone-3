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
   ================================================== */

const TEAM_ALIASES: Record<string, string> = {
  "cardiff rugby": "cardiff",

  "bristol": "bristol bears",
  "gloucester": "gloucester rugby",
  "newcastle red bulls": "newcastle falcons",

  "stade francais paris": "stade français paris",
  "lyon": "lyon ou",
  "bordeaux begles": "bordeaux",
  "clermont": "clermont women",

  "wild knights": "panasonic wild knights",
  "spears kubota": "kubota spears",
  "black rams": "black rams tokyo",

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
  // 🔒 FALLBACK TO BASE TABLE
  if (!standings || standings.length === 0) {
    return baseTable.map((row, index) => ({
      position: index + 1,

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

  /* ==========================================
     LIVE STANDINGS DRIVE TABLE
     ========================================== */

  return standings
    .map((live, index) => {
      const resolvedLive = resolveTeamName(
        live.team
      );

      const baseRow = baseTable.find(
        (b) =>
          resolveTeamName(b.team) ===
          resolvedLive
      );

      return {
        position: index + 1,

        team:
          baseRow?.team || live.team,

        coach:
          baseRow?.coach || "—",

        played: live.played,
        wins: live.won,
        draws: live.drawn,
        losses: live.lost,

        pointsFor: live.pf,
        pointsAgainst: live.pa,
        pointsDiff: live.pd,

        leaguePoints: live.pts,
      };
    })
    .sort((a, b) => {
      if (b.leaguePoints !== a.leaguePoints) {
        return (
          b.leaguePoints - a.leaguePoints
        );
      }

      return (
        b.pointsDiff - a.pointsDiff
      );
    })
    .map((row, index) => ({
      ...row,
      position: index + 1,
    }));
}