import { API_BASE_URL } from "../../config/api";

export interface StandingRow {
  id: number | null;
  name: string;
  logo: string;

  played: number;
  won: number;
  drawn: number;
  lost: number;

  pointsFor: number;
  pointsAgainst: number;

  position: number;
  points: number;

  raw?: unknown;
}

export async function getStandings(
  leagueId: string | number,
  season?: number
): Promise<StandingRow[]> {
  const params = new URLSearchParams();

  params.set("league", String(leagueId));

  if (season !== undefined) {
    params.set("season", String(season));
  }

  const response = await fetch(
    `${API_BASE_URL}/api/stats/standings?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch standings (${response.status})`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((row: StandingRow) => ({
    id: row.id ?? null,
    name: row.name ?? "",
    logo: row.logo ?? "",

    played: row.played ?? 0,
    won: row.won ?? 0,
    drawn: row.drawn ?? 0,
    lost: row.lost ?? 0,

    pointsFor: row.pointsFor ?? 0,
    pointsAgainst: row.pointsAgainst ?? 0,

    position: row.position ?? 0,
    points: row.points ?? 0,

    raw: row.raw,
  }));
}
const standingsService = {
  getStandings,
};

export default standingsService;