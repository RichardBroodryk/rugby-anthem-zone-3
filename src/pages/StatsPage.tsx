import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StatsPage.module.css";

import TeamComparisonTable from "../components/stats/TeamComparisonTable";
import Flag from "../components/images/Flag";

import heroBg from "../assets/images/raz/Stats3.png";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

/* ================= TYPES ================= */

type TeamStats = {
  team: string;
  country: string;
  played: number;
  won: number;
  lost: number;
  draw: number;
  pointsFor: number;
  pointsAgainst: number;
  difference: number;
  tablePoints: number;
};

/* ================= HELPERS ================= */

function buildStats(matches: MatchData[]): TeamStats[] {
  const map = new Map<string, TeamStats>();

  matches.forEach((match) => {
    if (!match.score) return;

    const { home, away, score } = match;

    const ensure = (name: string, country: string) => {
      if (!map.has(name)) {
        map.set(name, {
          team: name,
          country,
          played: 0,
          won: 0,
          lost: 0,
          draw: 0,
          pointsFor: 0,
          pointsAgainst: 0,
          difference: 0,
          tablePoints: 0,
        });
      }
      return map.get(name)!;
    };

    const homeTeam = ensure(home.name, home.country);
    const awayTeam = ensure(away.name, away.country);

    homeTeam.played++;
    awayTeam.played++;

    homeTeam.pointsFor += score.home;
    homeTeam.pointsAgainst += score.away;

    awayTeam.pointsFor += score.away;
    awayTeam.pointsAgainst += score.home;

    if (score.home > score.away) {
      homeTeam.won++;
      awayTeam.lost++;
      homeTeam.tablePoints += 4;
    } else if (score.away > score.home) {
      awayTeam.won++;
      homeTeam.lost++;
      awayTeam.tablePoints += 4;
    } else {
      homeTeam.draw++;
      awayTeam.draw++;
      homeTeam.tablePoints += 2;
      awayTeam.tablePoints += 2;
    }
  });

  map.forEach((t) => {
    t.difference = t.pointsFor - t.pointsAgainst;
  });

  return Array.from(map.values()).sort((a, b) => {
    if (b.tablePoints !== a.tablePoints) {
      return b.tablePoints - a.tablePoints;
    }
    return b.difference - a.difference;
  });
}

/* ================= PAGE ================= */

export default function StatsPage() {
  const navigate = useNavigate();

  const [mensStats, setMensStats] = useState<TeamStats[]>([]);
  const [womensStats, setWomensStats] = useState<TeamStats[]>([]);
  const [comparisonMatch, setComparisonMatch] =
    useState<MatchData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const matches = await getMatches();

      const mens = matches.filter(
        (m) => m.competitionId === "six-nations" && m.score
      );

      const womens = matches.filter(
        (m) => m.competitionId === "six-nations-women" && m.score
      );

      setMensStats(buildStats(mens));
      setWomensStats(buildStats(womens));

      const last = matches
        .filter((m) => m.score)
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )[0];

      setComparisonMatch(last || null);

      setLoading(false);
    }

    loadStats();
  }, []);

  const renderTable = (data: TeamStats[]) => (
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
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t) => (
            <tr key={t.team}>
              <td className={`${styles.teamCell} ${styles.left}`}>
                <Flag country={t.country} size="small" />
                <span className={styles.teamName}>{t.team}</span>
              </td>

              <td>{t.played}</td>
              <td>{t.won}</td>
              <td>{t.lost}</td>
              <td>{t.pointsFor}</td>
              <td>{t.pointsAgainst}</td>
              <td>{t.difference}</td>
              <td>{t.tablePoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <main className={styles.page}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Stats</h1>
        </div>
      </header>

      <div className={styles.backWrap}>
        <button onClick={() => navigate("/match-center")}>
          ← Back
        </button>
      </div>

      <section className={styles.section}>
        <h2>Six Nations (Men)</h2>
        {loading ? <p>Loading...</p> : renderTable(mensStats)}
      </section>

      <section className={styles.section}>
        <h2>Six Nations (Women)</h2>
        {loading ? <p>Loading...</p> : renderTable(womensStats)}
      </section>

      {comparisonMatch && comparisonMatch.score && (
        <TeamComparisonTable
          home={comparisonMatch.home}
          away={comparisonMatch.away}
          stats={[
            {
              label: "Points",
              home: comparisonMatch.score.home,
              away: comparisonMatch.score.away,
            },
          ]}
        />
      )}
    </main>
  );
}