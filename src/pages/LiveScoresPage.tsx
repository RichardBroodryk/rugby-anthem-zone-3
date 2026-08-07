import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveScoresPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

import { getCompetition } from "../contracts/competitionRegistry"; // <-- Added import

import LiveScoreRow from "../components/match/LiveScoreRow";

import heroBg from "../assets/images/raz/livescore.jpg";

import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

/* ================= HELPERS ================= */

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

type LivePhase =
  | "Upcoming"
  | "1st Half"
  | "2nd Half"
  | "HT"
  | "ET"
  | "Final";

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

  /* ==================================================
     1. FETCH DATA
     ================================================== */
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

  /* ==================================================
     2. ALL HOOKS MUST EXECUTE BEFORE EARLY RETURNS
     ================================================== */
  const { live, recentFinals, today, upcoming } = useMemo(() => {
    // --- UPDATED FILTER LOGIC HERE ---
    const cleaned = matches.filter((match) => {
      if (isBarbariansMatch(match)) return false;

      const competition = getCompetition(match.competitionId);

      if (!competition) return false;

      return competition.category === "international";
    });

    const liveMatches = cleaned.filter(
      (m) => m.state === "live" || m.state === "starting"
    );

    const finals = cleaned
      .filter(
        (m) =>
          isCompleted(m) &&
          m.state !== "live" &&
          m.state !== "starting"
      )
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
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
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

    return {
      live: liveMatches,
      recentFinals: finals,
      today: todayMatches,
      upcoming: upcomingMatches,
    };
  }, [matches]);

  /* ==================================================
     3. HELPER FUNCTIONS (No hooks inside)
     ================================================== */
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

  /* ==================================================
     4. EARLY RETURNS (SAFE, EXECUTED AFTER ALL HOOKS)
     ================================================== */
  if (loading) {
    return (
      <PageWrapper imageUrl={razLight}>
        <main className={styles.page}>
          <div className={styles.empty}>
            Loading live matches...
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

  const upcomingMatches = upcoming.slice(0, 20);

  /* ==================================================
     5. PAGE RENDER
     ================================================== */
  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${heroBg})` }}
        >
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
          <h2 className={styles.sectionTitleCenter}>
            Live Now
          </h2>

          {live.length === 0 ? (
            <div className={styles.empty}>
              No matches live right now.
            </div>
          ) : (
            renderGroup(live)
          )}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitleCenter}>
            Recent Results
          </h2>

          {recentFinals.length === 0 ? (
            <div className={styles.empty}>
              No completed matches available.
            </div>
          ) : (
            renderGroup(recentFinals.slice(0, 10))
          )}
        </section>

        <section className={styles.sectionMuted}>
          <h2 className={styles.sectionTitleMutedCenter}>
            Today
          </h2>

          {today.length === 0 ? (
            <div className={styles.empty}>
              No matches today.
            </div>
          ) : (
            renderGroup(today)
          )}
        </section>

        <section className={styles.sectionMuted}>
          <h2 className={styles.sectionTitleMutedCenter}>
            Upcoming
          </h2>

          {upcomingMatches.length === 0 ? (
            <div className={styles.empty}>
              No upcoming fixtures available.
            </div>
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
    </PageWrapper>
  );
}