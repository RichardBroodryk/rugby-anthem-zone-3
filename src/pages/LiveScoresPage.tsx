import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveScoresPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

import LiveScoreRow from "../components/match/LiveScoreRow";

import heroBg from "../assets/images/raz/Livescores.png";

/* ================= CURRENT TIER 1 FILTERS ================= */

const CURRENT_TIER1_COMPETITIONS = new Set<string>([
  "nations-championship",
  "international-tests",
  "bledisloe-cup",
  "sa-nz-rival-tour",
  "pacific-nations",
]);

const LEGACY_COMPETITIONS = new Set<string>([
  "six-nations",
  "six-nations-women",
]);

const TIER2_COMPETITIONS = new Set<string>([
  "world-rugby-nations-cup",
]);

function isBarbariansMatch(match: MatchData) {
  return (
    match.home.country === "barbarians" ||
    match.away.country === "barbarians" ||
    match.home.name.toLowerCase() === "barbarians" ||
    match.away.name.toLowerCase() === "barbarians"
  );
}

function isCompleted(match: MatchData) {
  return match.state === "final" || !!match.score;
}

function isCurrentTier1Match(match: MatchData) {
  return CURRENT_TIER1_COMPETITIONS.has(match.competitionId);
}

function isToday(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();

  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function isWomenTournament(tournament: string) {
  return tournament.toLowerCase().includes("women");
}

function splitByGender(matches: MatchData[]) {
  return {
    men: matches.filter((m) => !isWomenTournament(m.tournament)),
    women: matches.filter((m) => isWomenTournament(m.tournament)),
  };
}

type LivePhase = "Upcoming" | "1st Half" | "2nd Half" | "HT" | "ET" | "Final";

function getPhase(match: MatchData): LivePhase {
  if (match.state === "final" || match.score) return "Final";
  return "Upcoming";
}

/* ================= PAGE ================= */

export default function LiveScoresPage() {
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

        if (mounted) {
          setMatches(data);
        }
      } catch {
        if (mounted) {
          setError("Failed to load matches");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  const { live, recentFinals, today, upcoming } = useMemo(() => {
    const cleaned = matches.filter((match) => {
      if (isBarbariansMatch(match)) return false;
      if (LEGACY_COMPETITIONS.has(match.competitionId)) return false;
      if (TIER2_COMPETITIONS.has(match.competitionId)) return false;
      return isCurrentTier1Match(match);
    });

    const liveMatches = cleaned.filter(
      (m) => m.state === "live" || m.state === "starting"
    );

    const finals = cleaned
      .filter((m) => isCompleted(m) && m.state !== "live" && m.state !== "starting")
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    const todayMatches = cleaned.filter(
      (m) =>
        !isCompleted(m) &&
        m.state !== "live" &&
        m.state !== "starting" &&
        isToday(m.date)
    );

    const upcomingMatches = cleaned
      .filter(
        (m) =>
          !isCompleted(m) &&
          m.state !== "live" &&
          m.state !== "starting" &&
          !isToday(m.date)
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    return {
      live: liveMatches,
      recentFinals: finals,
      today: todayMatches,
      upcoming: upcomingMatches,
    };
  }, [matches]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>Loading live matches...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>{error}</div>
      </main>
    );
  }

  const renderGroup = (group: MatchData[]) => {
    const { men, women } = splitByGender(group);

    return (
      <div className={styles.groupWrap}>
        {men.length > 0 && (
          <div className={styles.subBlock}>
            <div className={styles.subHeader}>MEN</div>

            {men.map((m) => (
              <LiveScoreRow
                key={m.id}
                matchId={m.id}
                home={m.home}
                away={m.away}
                score={m.score}
                phase={getPhase(m)}
                tournament={m.tournament}
                venue={m.venue}
              />
            ))}
          </div>
        )}

        {women.length > 0 && (
          <div className={styles.subBlock}>
            <div className={styles.subHeader}>WOMEN</div>

            {women.map((m) => (
              <LiveScoreRow
                key={m.id}
                matchId={m.id}
                home={m.home}
                away={m.away}
                score={m.score}
                phase={getPhase(m)}
                tournament={m.tournament}
                venue={m.venue}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const upcomingMatches = upcoming.slice(0, 20);

  return (
    <main className={styles.page}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Live Scores</h1>
          <p>
            Scores and match states from across world rugby —
            <br />
            live action, recent finals, and what’s coming next.
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
        <h2 className={styles.sectionTitleCenter}>Live Now</h2>

        {live.length === 0 ? (
          <div className={styles.empty}>No matches live right now.</div>
        ) : (
          renderGroup(live)
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitleCenter}>Recent Results</h2>

        {recentFinals.length === 0 ? (
          <div className={styles.empty}>No completed matches available.</div>
        ) : (
          renderGroup(recentFinals.slice(0, 10))
        )}
      </section>

      <section className={styles.sectionMuted}>
        <h2 className={styles.sectionTitleMutedCenter}>Today</h2>

        {today.length === 0 ? (
          <div className={styles.empty}>No matches today.</div>
        ) : (
          renderGroup(today)
        )}
      </section>

      <section className={styles.sectionMuted}>
        <h2 className={styles.sectionTitleMutedCenter}>Upcoming</h2>

        {upcomingMatches.length === 0 ? (
          <div className={styles.empty}>No upcoming fixtures available.</div>
        ) : (
          <div className={styles.subBlock}>
            <div className={styles.subHeader}>
              UPCOMING INTERNATIONAL FIXTURES
            </div>

            {upcomingMatches.map((m) => (
              <LiveScoreRow
                key={m.id}
                matchId={m.id}
                home={m.home}
                away={m.away}
                phase="Upcoming"
                tournament={m.tournament}
                venue={m.venue}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}