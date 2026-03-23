// src/pages/match-center/LeagueTablePage.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./LeagueTablePage.module.css";

import { domesticLeagues } from "../../data/domesticLeagues";
import { tables2026 } from "../../data/tables2026";

import { getMatches } from "../../data/matchesAdapter";
import { MatchData } from "../../data/matches2026";

export default function LeagueTablePage() {
  const { leagueId } = useParams<{ leagueId: string }>();
  const navigate = useNavigate();

  const league = domesticLeagues.find((l) => l.id === leagueId);

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      if (!leagueId) return;

      try {
        const data = await getMatches({ leagueId });
        setMatches(data.slice(0, 6)); // 🔥 limit to 6
      } catch {
        setMatches([]);
      }

      setLoadingMatches(false);
    }

    loadMatches();
  }, [leagueId]);

  if (!league) {
    return <div>League not found</div>;
  }

  const table = tables2026[league.id] || [];

  const isDarkLeague =
    league.id === "super" || league.id === "japan";

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section
        className={`${styles.heroCard} ${
          isDarkLeague ? styles.heroBlack : styles.heroLight
        }`}
      >
        <img
          src={league.logo}
          alt={league.name}
          className={styles.logo}
        />
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center/domestic")}
        >
          ← Back to Domestic Tables
        </button>
      </div>

      {/* TITLE */}
      <section className={styles.section}>
        <h1 className={styles.title}>{league.name}</h1>
        <p className={styles.season}>
          Season: {league.season}
        </p>
      </section>

      {/* TABLE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Current Standings
        </h2>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Pos</th>
                <th className={styles.left}>Team</th>
                <th>Coach</th>
                <th>PF</th>
                <th>PA</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {table.slice(0, 8).map((row) => (
                <tr key={row.position}>
                  <td>{row.position}</td>

                  <td className={`${styles.left} ${styles.teamCell}`}>
                    {row.team}
                  </td>

                  <td>{row.coach}</td>
                  <td>{row.pointsFor}</td>
                  <td>{row.pointsAgainst}</td>
                  <td>{row.leaguePoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 🔥 NEW — MATCHES SECTION */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Recent Matches
        </h2>

        {loadingMatches ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            Loading matches...
          </div>
        ) : matches.length === 0 ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            No matches available.
          </div>
        ) : (
          <div className={styles.matchesList}>
            {matches.map((m) => (
              <div key={m.id} className={styles.matchItem}>
                <div className={styles.matchTeams}>
                  {m.home.name} vs {m.away.name}
                </div>

                <div className={styles.matchMeta}>
                  {new Date(m.date).toLocaleDateString()}
                </div>

                {m.score && (
                  <div className={styles.matchScore}>
                    {m.score.home} - {m.score.away}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}