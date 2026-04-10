import type { MatchData } from "../../data/matches/types";

export type SeriesStanding = {
  team: string;
  seriesPoints: number;
};

const pointsMap: Record<number, number> = {
  1: 20,
  2: 18,
  3: 16,
  4: 14,
  5: 12,
  6: 10,
  7: 8,
  8: 6,
};

export function buildSvnsSeriesStandings(
  matches: MatchData[]
): SeriesStanding[] {
  const table: Record<string, SeriesStanding> = {};

  matches.forEach((match) => {
    if (match.round !== "final") return;
    if (!match.placement) return;

    const winner = match.home.name; // assume winner in home for now

    if (!table[winner]) {
      table[winner] = {
        team: winner,
        seriesPoints: 0,
      };
    }

    table[winner].seriesPoints +=
      pointsMap[match.placement] || 0;
  });

  return Object.values(table).sort(
    (a, b) => b.seriesPoints - a.seriesPoints
  );
}