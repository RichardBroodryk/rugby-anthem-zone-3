import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import styles from "./ResultsPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

import MatchRow from "../components/match/MatchRow";

import heroBg from "../assets/images/raz/Results.png";

import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

/* ================= FILTERS ================= */

const CURRENT_TIER1_COMPETITIONS = new Set<string>([
  "nations-championship",
  "international-tests",
  "bledisloe-cup",
  "sa-nz-rival-tour",
  "pacific-nations",
]);

const TIER2_COMPETITIONS = new Set<string>([
  "world-rugby-nations-cup",
]);

const LEGACY_COMPETITIONS = new Set<string>([
  "six-nations",
  "six-nations-women",
]);

/* ================= UTIL ================= */

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isCompleted(match: MatchData) {
  return match.state === "final" || !!match.score;
}

function isBarbariansMatch(match: MatchData) {
  return (
    match.home.country === "barbarians" ||
    match.away.country === "barbarians" ||
    match.home.name.toLowerCase() === "barbarians" ||
    match.away.name.toLowerCase() === "barbarians"
  );
}

function groupByTournament(matches: MatchData[]) {
  const map = new Map<string, MatchData[]>();

  matches.forEach((match) => {
    if (!map.has(match.tournament)) {
      map.set(match.tournament, []);
    }
    map.get(match.tournament)!.push(match);
  });

  return Array.from(map.entries()).sort((a, b) => {
    const firstDateA = a[1][0]?.date || "";
    const firstDateB = b[1][0]?.date || "";
    return (
      new Date(firstDateB).getTime() -
      new Date(firstDateA).getTime()
    );
  });
}

/* ================= PAGE ================= */

export default function ResultsPage() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMatches();

        if (mounted) setMatches(data);
      } catch {
        if (mounted) setError("Failed to load results");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const {
    tier1Groups,
    tier2Groups,
    legacyGroups,
  } = useMemo(() => {
    const completed = matches.filter(isCompleted);

    const tier1 = completed
      .filter((m) =>
        CURRENT_TIER1_COMPETITIONS.has(m.competitionId)
      )
      .filter((m) => !isBarbariansMatch(m));

    const tier2 = completed.filter((m) =>
      TIER2_COMPETITIONS.has(m.competitionId)
    );

    const legacy = completed.filter((m) =>
      LEGACY_COMPETITIONS.has(m.competitionId)
    );

    return {
      tier1Groups: groupByTournament(tier1),
      tier2Groups: groupByTournament(tier2),
      legacyGroups: groupByTournament(legacy),
    };
  }, [matches]);

  if (loading) {
    return (
      <PageWrapper imageUrl={razLight}>
        <main className={styles.page}>
          <div className={styles.empty}>
            Loading results...
          </div>
        </main>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper imageUrl={razLight}>
        <main className={styles.page}>
          <div className={styles.empty}>{error}</div>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className={styles.heroContent}>
            <h1>Results</h1>

            <p>
              Completed international fixtures
              <br />
              confirmed by tournament and match date.
            </p>
          </div>
        </header>

        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() => navigate("/match-center")}
          >
            ← Back to Match Center
          </button>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Current International Results
          </h2>

          {tier1Groups.length === 0 ? (
            <div className={styles.empty}>
              No current Tier 1 results available.
            </div>
          ) : (
            tier1Groups.map(
              ([tournament, tournamentMatches]) => (
                <div
                  key={tournament}
                  className={styles.groupBlock}
                >
                  <h3 className={styles.sectionTitle}>
                    {tournament}
                  </h3>

                  {tournamentMatches.map((match) => (
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
                  ))}
                </div>
              )
            )
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Tier 2 / Emerging Nations Results
          </h2>

          {tier2Groups.length === 0 ? (
            <div className={styles.empty}>
              No Tier 2 results available yet.
            </div>
          ) : (
            tier2Groups.map(
              ([tournament, tournamentMatches]) => (
                <div
                  key={tournament}
                  className={styles.groupBlock}
                >
                  <h3 className={styles.sectionTitle}>
                    {tournament}
                  </h3>

                  {tournamentMatches.map((match) => (
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
                  ))}
                </div>
              )
            )
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Legacy Championship Results
          </h2>

          {legacyGroups.length === 0 ? (
            <div className={styles.empty}>
              No legacy results available.
            </div>
          ) : (
            legacyGroups.map(
              ([tournament, tournamentMatches]) => (
                <div
                  key={tournament}
                  className={styles.groupBlock}
                >
                  <h3 className={styles.sectionTitle}>
                    {tournament}
                  </h3>

                  {tournamentMatches.map((match) => (
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
                  ))}
                </div>
              )
            )
          )}
        </section>
      </main>
    </PageWrapper>
  );
}