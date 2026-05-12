import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./LeagueTablePage.module.css";

import { domesticLeagues } from "../../data/domesticLeagues";
import { tables2026 } from "../../data/tables2026";
import { liveStandings } from "../../data/standings/liveStandings";


/* ================================================== */

type TableRow = {
  team: string;
  coach: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  pointsDiff: number;
  leaguePoints: number;
};

/* ================================================== */

export default function LeagueTablePage() {
  const { leagueId } = useParams<{ leagueId: string }>();

  const [id, gender] = (leagueId || "").split("-");
  const league = domesticLeagues.find((l) => l.id === id);

  const [table, setTable] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !gender) return;

    const key = `${id}-${gender}`.toLowerCase();
    const isWomen = gender === "women";

    /* ==================================================
       🔥 1. LIVE STANDINGS (PRIMARY - MEN ONLY)
       ================================================== */

    const standings = (liveStandings as Record<string, any[]>)[key];

    if (
      !isWomen &&
      standings &&
      standings.length > 0 &&
      standings.some((t) => t.played > 0) // 🔥 CRITICAL FIX
    ) {
      const mapped: TableRow[] = standings
        .map((t: any) => ({
          team: t.team,
          coach: findCoach(t.team, key),
          played: t.played,
          wins: t.won,
          draws: t.drawn,
          losses: t.lost,
          pointsDiff: t.pd,
          leaguePoints: t.pts,
        }))
        // 🔥 CRITICAL FIX — SORT BY POINTS
        .sort((a, b) => b.leaguePoints - a.leaguePoints);

      setTable(mapped);
      setLoading(false);
      return;
    }

    /* ==================================================
       🔁 2. FALLBACK (STATIC TABLE)
       ================================================== */

    const base = tables2026[key as keyof typeof tables2026];

    if (!base) {
      console.error("❌ NO TABLE FOUND:", key);
      setTable([]);
      setLoading(false);
      return;
    }

    const fallback: TableRow[] = base
      .map((row) => ({
        team: row.team,
        coach: row.coach,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        pointsDiff: row.pointsFor - row.pointsAgainst,
        leaguePoints: row.leaguePoints,
      }))
      // 🔥 KEEP STATIC TABLE ORDER CORRECT
      .sort((a, b) => b.leaguePoints - a.leaguePoints);

    setTable(fallback);
    setLoading(false);
  }, [id, gender]);

  if (!league) return <div>League not found</div>;

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>
          {league.name} ({gender})
        </h1>

        <p className={styles.season}>
          Season: {league.season} • Live Table
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Current Standings
        </h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Coach</th>
                <th>P</th>
                <th>W</th>
                <th>D</th>
                <th>L</th>
                <th>PD</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {table.map((row, i) => (
                <tr key={row.team}>
                  <td>{i + 1}</td>
                  <td>{row.team}</td>
                  <td>{row.coach}</td>
                  <td>{row.played}</td>
                  <td>{row.wins}</td>
                  <td>{row.draws}</td>
                  <td>{row.losses}</td>
                  <td>{row.pointsDiff}</td>
                  <td>{row.leaguePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

/* ==================================================
   🔥 COACH RESOLVER (FIXED)
   ================================================== */

function findCoach(team: string, key: string) {
  const base = tables2026[key as keyof typeof tables2026] || [];

  const normalizeFull = (name: string) =>
    name
      .toLowerCase()
      .replace(/vodacom|dhl|toyota|kubota|panasonic|suntory/g, "")
      .replace(/rugby|club|team|stade|rc|ou|paris|tokyo/g, "")
      .replace(/\s+/g, "")
      .trim();

  const target = normalizeFull(team);

  const found = base.find(
    (t) => normalizeFull(t.team) === target
  );

  return found?.coach || "—";
}