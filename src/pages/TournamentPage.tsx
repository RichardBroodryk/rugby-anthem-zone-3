import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";
import StandingsTable from "../components/tournament/StandingsTable";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

/* ✅ DATA SOURCE */
import { matches2026 } from "../data/matches";

/* ✅ TYPE */
import type { MatchData } from "../data/matches/types";

/* ✅ STANDINGS ENGINE */
import { buildStandings } from "../utils/standings/standingsEngine";

import styles from "./TournamentPage.module.css";

/* ==================================================
   STATE RESOLVER
   ================================================== */

function resolveState(match: MatchData): "final" | "upcoming" {
  if (match.score) return "final";

  return new Date(match.date) > new Date()
    ? "upcoming"
    : "final";
}

/* ==================================================
   ROUND GROUPING (SAFE — NO DATA CHANGE)
   ================================================== */

function groupByRound(matches: MatchData[]) {
  const sorted = [...matches].sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );

  const rounds: Record<string, MatchData[]> = {};

  sorted.forEach((match, index) => {
    const round = `Round ${Math.floor(index / 3) + 1}`;
    if (!rounds[round]) rounds[round] = [];
    rounds[round].push(match);
  });

  return rounds;
}

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  /* ==================================================
     MATCH RESOLUTION (UNCHANGED)
     ================================================== */

  const matches = useMemo((): MatchData[] => {
    if (!tournament) return [];

    return matches2026
      .filter(
        (m: MatchData) =>
          (m as { tournamentInstanceId?: string })
            .tournamentInstanceId ===
          tournament.instanceId
      )
      .sort(
        (a: MatchData, b: MatchData) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
  }, [tournament]);

  if (!tournament) {
    return (
      <div className={styles.error}>
        Tournament not found
      </div>
    );
  }

  const visual = getTournamentVisual(
    tournament.conceptId
  );

  /* ==================================================
     LEAGUE DETECTION (NEW)
     ================================================== */

  const isLeague =
    tournament.conceptId.includes("six-nations") ||
    tournament.conceptId.includes("pacific") ||
    tournament.conceptId.includes("wxv");

  /* ==================================================
     TEAMS (UNCHANGED)
     ================================================== */

  const teams = Array.from(
    new Map(
      matches.flatMap((m: MatchData) => [
        [m.home.name, m.home],
        [m.away.name, m.away],
      ])
    ).values()
  );

  /* ==================================================
     LEAGUE DATA (NEW)
     ================================================== */

  const standings = buildStandings(matches);
  const rounds = groupByRound(matches);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={`${styles.hero} ${
          visual.heroLayout === "contained"
            ? styles.heroContained
            : ""
        }`}
        style={{
          backgroundImage: `url(${
            tournament.gender === "women"
              ? visual.heroImageWomen
              : visual.heroImageMen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <h1>
            {tournament.name} {tournament.year}
          </h1>
          <p>{tournament.heroSubtitle}</p>

          <div className={styles.statusBadge}>
            {tournament.status?.toUpperCase()}
          </div>
        </div>
      </header>

      {/* ================= BACK NAV ================= */}
      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* ================= ANTHEMS ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Anthems</h2>
          <p>Flags link to national anthems</p>
        </div>

        <div className={styles.anthemsRow}>
          <div className={styles.flagsGrid}>
            {teams.map((team) => (
              <Flag
                key={team.name}
                country={team.country}
                size="medium"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= LEAGUE MODE ================= */}
      {isLeague && (
        <>
          {/* STANDINGS */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Standings</h2>
            </div>

            <StandingsTable data={standings} />
          </section>

          {/* FIXTURES */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Fixtures & Results</h2>
            </div>

            {Object.entries(rounds).map(
              ([round, list]) => (
                <div key={round}>
                  <h3>{round}</h3>

                  {list.map((match) => (
                    <MatchRow
                      key={match.id}
                      home={match.home}
                      away={match.away}
                      state={resolveState(match)}
                      score={match.score}
                      metaLeft={match.date}
                      metaRight={match.venue}
                      onClick={() =>
                        navigate(`/match/${match.id}`)
                      }
                    />
                  ))}
                </div>
              )
            )}
          </section>
        </>
      )}

      {/* ================= DEFAULT MATCHES ================= */}
      {!isLeague && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Matches</h2>
            <p>All fixtures and results</p>
          </div>

          {matches.length === 0 ? (
            <div className={styles.emptyState}>
              No matches available
            </div>
          ) : (
            matches.map((match: MatchData) => (
              <MatchRow
                key={match.id}
                home={match.home}
                away={match.away}
                state={resolveState(match)}
                score={match.score}
                metaLeft={match.date}
                metaRight={match.venue}
                onClick={() =>
                  navigate(`/match/${match.id}`)
                }
              />
            ))
          )}
        </section>
      )}

      {/* ================= BOTTOM ADS ================= */}
      {/* KEEP YOUR ADS COMPONENT HERE */}
    </main>
  );
}