// ==================================================
// RANKINGS ENGINE — DYNAMIC (OPTION B)
// ==================================================

export interface RankingTeam {
  team: string;
  country: string; // must match Flag system
  points: number;
  coach?: string;
}

/* ==================================================
   COACH MAP (LOCKED FROM HERITAGE SYSTEM)
   ================================================== */

export const mensCoachMap: Record<string, string> = {
  "south-africa": "Rassie Erasmus",
  "new-zealand": "Dave Rennie",
  "ireland": "Andy Farrell",
  "france": "Fabien Galthié",
  "argentina": "Felipe Contepomi",
  "england": "Steve Borthwick",
  "scotland": "Gregor Townsend",
  "italy": "Gonzalo Quesada",
  "australia": "Les Kiss",
  "fiji": "Senirusi Seruvakula",
  "wales": "Steve Tandy",
  "japan": "Eddie Jones",
  "georgia": "Pierre-Henry Broncan",
  "united-states": "Scott Lawrence",
  "portugal": "Simon Mannix",
};

export const womensCoachMap: Record<string, string> = {
  "england": "John Mitchell",
  "canada": "TBC",
  "new-zealand": "Whitney Hansen",
  "france": "François Ratier",
  "ireland": "Scott Bemand",
  "scotland": "Sione Fukofuka",
  "australia": "Tim Walsh",
  "usa": "TBC",
  "italy": "Fabio Roselli",
  "south-africa": "Swys de Bruin",
  "japan": "TBC",
  "wales": "Sean Lynn",
  "fiji": "Willie Walker",
};

/* ==================================================
   RANKING BUILDER
   ================================================== */

export function buildRankings(
  teams: RankingTeam[],
  coachMap: Record<string, string>
) {
  return [...teams]
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({
      ...team,
      rank: index + 1,
      coach: coachMap[team.country] || "TBC",
    }));
}