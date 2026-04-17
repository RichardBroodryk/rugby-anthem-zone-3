export type Player = {
  id: number;
  name: string;
  position?: string;
  number?: number;
};

export type TeamLineup = {
  starting: Player[];
  bench: Player[];
};

export type MatchLineups = {
  home: TeamLineup;
  away: TeamLineup;
};

/* ================= FETCH LINEUPS ================= */

export async function fetchMatchLineups(
  matchId: number
): Promise<MatchLineups> {
  try {
    // 🔴 REPLACE WITH YOUR REAL ENDPOINT LATER
    const res = await fetch(
      `https://v1.rugby.api-sports.io/fixtures/lineups?fixture=${matchId}`,
      {
        headers: {
          "x-apisports-key": "YOUR_API_KEY",
        },
      }
    );

    const data = await res.json();

    return transformLineups(data.response);
  } catch (err) {
    console.error("Lineups fetch failed", err);

    return {
      home: { starting: [], bench: [] },
      away: { starting: [], bench: [] },
    };
  }
}

/* ================= TRANSFORM ================= */

function transformLineups(apiLineups: any[]): MatchLineups {
  if (!apiLineups || apiLineups.length < 2) {
    return {
      home: { starting: [], bench: [] },
      away: { starting: [], bench: [] },
    };
  }

  const [home, away] = apiLineups;

  return {
    home: {
      starting: mapPlayers(home.startXI),
      bench: mapPlayers(home.substitutes),
    },
    away: {
      starting: mapPlayers(away.startXI),
      bench: mapPlayers(away.substitutes),
    },
  };
}

function mapPlayers(players: any[]): Player[] {
  if (!players) return [];

  return players.map((p) => ({
    id: p.player?.id ?? Math.random(),
    name: p.player?.name ?? "Unknown",
    number: p.player?.number,
    position: p.player?.pos,
  }));
}