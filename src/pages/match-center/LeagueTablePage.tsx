import { useMemo } from "react";
import { useParams } from "react-router-dom";

import styles from "./LeagueTablePage.module.css";

import { domesticLeagues } from "../../data/domesticLeagues";

import {
  tables2026,
} from "../../data/tables2026";

import { liveStandings } from "../../data/standings/liveStandings";

import {
  applyTableOverlay,
} from "../../utils/tableOverlayResolver";

/* ==================================================
   PAGE
   ================================================== */

export default function LeagueTablePage() {
  const { leagueId } = useParams<{ leagueId: string }>();

  const [id, gender] = (leagueId || "").split("-");

  const league = domesticLeagues.find(
    (l) => l.id === id
  );

  const table = useMemo(() => {
    if (!id || !gender) return [];

    const key = `${id}-${gender}`.toLowerCase();

    const baseTable =
      tables2026[key as keyof typeof tables2026];

    if (!baseTable || baseTable.length === 0) {
      console.error(
        "❌ NO TABLE FOUND:",
        key
      );

      return [];
    }

    const standings =
      (
        liveStandings as Record<
          string,
          any[]
        >
      )[key];

    return applyTableOverlay(
      baseTable,
      standings
    ).sort((a, b) => {
      if (b.leaguePoints !== a.leaguePoints) {
        return (
          b.leaguePoints - a.leaguePoints
        );
      }

      return (
        b.pointsDiff - a.pointsDiff
      );
    });
  }, [id, gender]);

  if (!league) {
    return (
      <main className={styles.page}>
        <div>League not found</div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <h1 className={styles.title}>
          {league.name} ({gender})
        </h1>

        <p className={styles.season}>
          Season: {league.season}
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Current Standings
        </h2>

        {table.length === 0 ? (
          <div>No standings available</div>
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
                <th>PF</th>
                <th>PA</th>
                <th>PD</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {table.map((row, index) => (
                <tr key={row.team}>
                  <td>{index + 1}</td>

                  <td>{row.team}</td>

                  <td>{row.coach}</td>

                  <td>{row.played}</td>

                  <td>{row.wins}</td>

                  <td>{row.draws}</td>

                  <td>{row.losses}</td>

                  <td>{row.pointsFor}</td>

                  <td>{row.pointsAgainst}</td>

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