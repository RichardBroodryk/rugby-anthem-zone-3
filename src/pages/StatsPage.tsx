import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StatsPage.module.css";

import { fetchEvents } from "../services/statscoreApi";

import TeamComparisonTable from "../components/stats/TeamComparisonTable";
import KeyPlayerStats from "../components/stats/KeyPlayerStats";
import Flag from "../components/images/Flag";

import heroBg from "../assets/images/raz/Stats3.png";

/* ================= TYPES ================= */

type TeamStats = {
  team: string;
  country: string;
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  difference: number;
};

/* ================= PAGE ================= */

export default function StatsPage() {
  const navigate = useNavigate();

  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const events = await fetchEvents();

        const map = new Map<string, TeamStats>();

        events.forEach((event: any) => {
          if (!event.participants || event.participants.length < 2) return;

          const home = event.participants[0];
          const away = event.participants[1];

          const homeName = home.name;
          const awayName = away.name;

          const ensure = (name: string) => {
            if (!map.has(name)) {
              map.set(name, {
                team: name,
                country: name.toLowerCase(),
                played: 0,
                won: 0,
                lost: 0,
                pointsFor: 0,
                pointsAgainst: 0,
                difference: 0,
              });
            }
            return map.get(name)!;
          };

          const homeTeam = ensure(homeName);
          const awayTeam = ensure(awayName);

          const homeScore = event.home_score ?? 0;
          const awayScore = event.away_score ?? 0;

          homeTeam.played += 1;
          awayTeam.played += 1;

          homeTeam.pointsFor += homeScore;
          homeTeam.pointsAgainst += awayScore;

          awayTeam.pointsFor += awayScore;
          awayTeam.pointsAgainst += homeScore;

          if (homeScore > awayScore) {
            homeTeam.won += 1;
            awayTeam.lost += 1;
          } else if (awayScore > homeScore) {
            awayTeam.won += 1;
            homeTeam.lost += 1;
          }
        });

        map.forEach((t) => {
          t.difference = t.pointsFor - t.pointsAgainst;
        });

        const sorted = Array.from(map.values()).sort(
          (a, b) => b.difference - a.difference
        );

        setTeamStats(sorted);
      } catch (err) {
        console.error("Stats loading failed:", err);
      }

      setLoading(false);
    }

    loadStats();
  }, []);

  if (loading) {
    return <div className={styles.page}>Loading stats...</div>;
  }

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Stats</h1>
          <p>
            International comparison, match dominance,
            <br />
            and key individual contributions.
          </p>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      {/* STANDINGS */}
      <section className={styles.section}>
        <h2 className={`${styles.sectionTitle} ${styles.centered}`}>
          International Standings
        </h2>

        <div className={styles.tableWrap}>
          <table className={styles.statsTable}>
            <thead>
              <tr>
                <th className={styles.left}>Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>PF</th>
                <th>PA</th>
                <th>+/-</th>
              </tr>
            </thead>

            <tbody>
              {teamStats.map((t) => (
                <tr key={t.team}>
                  <td className={`${styles.teamCell} ${styles.left}`}>
                    <Flag country={t.country} size="small" />
                    {t.team}
                  </td>
                  <td>{t.played}</td>
                  <td>{t.won}</td>
                  <td>{t.lost}</td>
                  <td>{t.pointsFor}</td>
                  <td>{t.pointsAgainst}</td>
                  <td>{t.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* EXISTING COMPONENTS */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Match Comparison</h2>

        <TeamComparisonTable
          home={{ name: "France", country: "france" }}
          away={{ name: "Ireland", country: "ireland" }}
          stats={[
            { label: "Tries", home: 4, away: 2 },
            { label: "Conversions", home: 3, away: 2 },
            { label: "Penalties", home: 2, away: 1 },
          ]}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key Player Stats</h2>

        <KeyPlayerStats
          categories={[
            {
              title: "Top Tries",
              items: [
                { name: "Player A", team: "France", value: 2 },
                { name: "Player B", team: "Ireland", value: 1 },
              ],
            },
          ]}
        />
      </section>
    </main>
  );
}