import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StatsPage.module.css";

import TeamComparisonTable from "../components/stats/TeamComparisonTable";
import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";

import heroBg from "../assets/images/raz/Stats3.png";

import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

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

/* ================= FILTERS ================= */

const CURRENT_TIER1_COMPETITIONS = new Set<string>([
  "nations-championship",
  "bledisloe-cup",
  "sa-nz-rival-tour",
  "pacific-nations",
]);

const STANDALONE_TEST_COMPETITIONS = new Set<string>([
  "international-tests",
]);

const CURRENT_TIER2_COMPETITIONS = new Set<string>([
  "world-rugby-nations-cup",
]);

const LEGACY_MENS_COMPETITIONS = new Set<string>([
  "six-nations",
]);

const LEGACY_WOMENS_COMPETITIONS = new Set<string>([
  "six-nations-women",
]);

/* ================= HELPERS ================= */

function formatDate(dateStr: string) {
  const d = new Date(dateStr);

  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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

  map.forEach((team) => {
    team.difference =
      team.pointsFor - team.pointsAgainst;
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

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (error) {
        console.error(
          "Failed to load stats matches:",
          error
        );
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const {
    currentTier1Stats,
    currentTier2Stats,
    legacyMensStats,
    legacyWomensStats,
    standaloneTestResults,
    comparisonMatch,
  } = useMemo(() => {
    const completed = matches.filter(
      (m) => !!m.score
    );

    const currentTier1 = completed.filter((m) =>
      CURRENT_TIER1_COMPETITIONS.has(
        m.competitionId
      )
    );

    const currentTier2 = completed.filter((m) =>
      CURRENT_TIER2_COMPETITIONS.has(
        m.competitionId
      )
    );

    const legacyMens = completed.filter((m) =>
      LEGACY_MENS_COMPETITIONS.has(
        m.competitionId
      )
    );

    const legacyWomens = completed.filter((m) =>
      LEGACY_WOMENS_COMPETITIONS.has(
        m.competitionId
      )
    );

    const standaloneTests = completed
      .filter((m) =>
        STANDALONE_TEST_COMPETITIONS.has(
          m.competitionId
        )
      )
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

    const latestCurrentTier1 =
      currentTier1
        .slice()
        .sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )[0] || null;

    return {
      currentTier1Stats:
        buildStats(currentTier1),
      currentTier2Stats:
        buildStats(currentTier2),
      legacyMensStats:
        buildStats(legacyMens),
      legacyWomensStats:
        buildStats(legacyWomens),
      standaloneTestResults:
        standaloneTests,
      comparisonMatch:
        latestCurrentTier1,
    };
  }, [matches]);

  const renderTable = (data: TeamStats[]) => {
    if (data.length === 0) {
      return (
        <p className={styles.empty}>
          No completed matches available yet.
        </p>
      );
    }

    return (
      <div className={styles.tableWrap}>
        <table className={styles.statsTable}>
          <thead>
            <tr>
              <th className={styles.left}>
                Team
              </th>
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
                <td
                  className={`${styles.teamCell} ${styles.left}`}
                >
                  <Flag
                    country={t.country}
                    size="small"
                  />

                  <span className={styles.teamName}>
                    {t.team}
                  </span>
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
  };

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        <header
          className={styles.hero}
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          <div className={styles.heroContent}>
            <h1>Stats</h1>
          </div>
        </header>

        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() =>
              navigate("/match-center")
            }
          >
            ← Back
          </button>
        </div>

        <section className={styles.section}>
          <h2>
            Current International Stats
          </h2>

          <p className={styles.sectionIntro}>
            Current Tier 1 international form
            across the active 2026 cycle.
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            renderTable(currentTier1Stats)
          )}
        </section>

        <section className={styles.section}>
          <h2>
            Tier 2 / Emerging Nations Stats
          </h2>

          <p className={styles.sectionIntro}>
            Current form across the 2026 World
            Rugby Nations Cup cycle.
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            renderTable(currentTier2Stats)
          )}
        </section>

        <section className={styles.section}>
          <h2>
            Standalone International Tests
          </h2>

          <p className={styles.sectionIntro}>
            Completed one-off international
            test matches outside the current
            Tier 1 standings cycle.
          </p>

          {loading ? (
            <p>Loading...</p>
          ) : standaloneTestResults.length ===
            0 ? (
            <p className={styles.empty}>
              No completed standalone tests
              available.
            </p>
          ) : (
            <div className={styles.matchesList}>
              {standaloneTestResults.map(
                (match) => (
                  <MatchRow
                    key={match.id}
                    home={match.home}
                    away={match.away}
                    metaLeft={`${match.venue} • ${formatDate(
                      match.date
                    )}`}
                    state="final"
                    score={match.score}
                  />
                )
              )}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <h2>
            Legacy Six Nations (Men)
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            renderTable(legacyMensStats)
          )}
        </section>

        <section className={styles.section}>
          <h2>
            Legacy Six Nations (Women)
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : (
            renderTable(legacyWomensStats)
          )}
        </section>

        {comparisonMatch &&
          comparisonMatch.score && (
            <TeamComparisonTable
              home={comparisonMatch.home}
              away={comparisonMatch.away}
              stats={[
                {
                  label: "Points",
                  home:
                    comparisonMatch.score.home,
                  away:
                    comparisonMatch.score.away,
                },
              ]}
            />
          )}
      </main>
    </PageWrapper>
  );
}