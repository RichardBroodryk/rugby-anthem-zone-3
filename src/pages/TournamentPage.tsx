import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import Flag from "../components/images/Flag";
import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import { matches2026 } from "../data/matches";

import type { MatchData } from "../data/matches/types";

import StandingsTable from "../components/tournament/StandingsTable";
import { buildStandings } from "../utils/standings/standingsEngine";

import styles from "./TournamentPage.module.css";

/* ==================================================
   STATE (FALLBACK ONLY — ADAPTER FIRST)
   ================================================== */

function resolveState(match: MatchData): "final" | "upcoming" {
  if ((match as any).state) return (match as any).state;

  if (match.score) return "final";

  return new Date(match.date) > new Date()
    ? "upcoming"
    : "final";
}

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.route === location.pathname
  );

  const matches = useMemo((): MatchData[] => {
    if (!tournament) return [];

    return matches2026
      .filter(
        (m: MatchData) =>
          (m as { tournamentInstanceId?: string })
            .tournamentInstanceId === tournament.instanceId
      )
      .sort(
        (a: MatchData, b: MatchData) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );
  }, [tournament]);

  if (!tournament) {
    return <div className={styles.error}>Tournament not found</div>;
  }

  const visual = getTournamentVisual(tournament.conceptId);

  const heroImage =
    tournament.gender === "women"
      ? visual.heroImageWomen
      : visual.heroImageMen;

  const teams = Array.from(
    new Map(
      matches.flatMap((m: MatchData) => [
        [m.home.name, m.home],
        [m.away.name, m.away],
      ])
    ).values()
  );

  const isMultiStage = tournament.conceptId === "svns";

  const stages = ["hong-kong", "valladolid", "bordeaux"];

  const menMatches = matches.filter((m) => m.gender === "men");
  const womenMatches = matches.filter((m) => m.gender === "women");

  const groupByStage = (list: MatchData[], stage: string) =>
    list.filter((m) => m.stage === stage);

  const pools = ["A", "B", "C"];

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={`${styles.hero} ${
          visual.heroLayout === "contained"
            ? styles.heroContained
            : ""
        }`}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroContent}>
          <h1>
            {tournament.name} {tournament.year}
          </h1>

          {tournament.heroSubtitle && (
            <p>{tournament.heroSubtitle}</p>
          )}

          <div className={styles.statusBadge}>
            {tournament.status?.toUpperCase()}
          </div>
        </div>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>
          ← Back to Tournaments
        </button>
      </div>

      {/* ================= RANKINGS ================= */}
      <section className={styles.section}>
        <div
          className={styles.rankingsStrip}
          onClick={() =>
            navigate(
              tournament.gender === "women"
                ? "/rankings/women"
                : "/rankings/men"
            )
          }
        >
          <div className={styles.rankingsText}>
            <span className={styles.rankingsTitle}>
              International Standings
            </span>
            <span className={styles.rankingsMain}>
              {tournament.gender === "women"
                ? "World Rankings — Women"
                : "World Rankings — Men"}
            </span>
          </div>
          <span className={styles.rankingsArrow}>→</span>
        </div>
      </section>

      {/* ================= ANTHEMS ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Anthems</h2>
          <p>Flags link to national anthems</p>
        </div>

        <div className={styles.flagsGrid}>
          {teams.map((team) => (
            <div
              key={team.name}
              onClick={() =>
                team.country !== "unknown" &&
                navigate(`/anthems/${team.country}`)
              }
            >
              <Flag country={team.country} size="medium" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= MATCH CENTRE ================= */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Match Centre</h2>
          <p>
            Hong Kong Sevens — 50th Anniversary Edition · Kai Tak Sports Park
          </p>
        </div>

        {/* INTRO */}
        <div className={styles.tournamentIntro}>
          <p>
            The HSBC SVNS World Championship 2026 opens in Hong Kong,
            celebrating 50 years of one of rugby’s most iconic sevens events.
            Featuring 12 teams per competition, the tournament begins with
            pool play before progressing into knockout rounds.
          </p>
        </div>

        {/* ================= NORMAL TOURNAMENTS ================= */}
        {!isMultiStage &&
          (matches.length === 0 ? (
            <div className={styles.emptyState}>
              No matches available
            </div>
          ) : (
            matches.map((match) => (
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
          ))}

        {/* ================= SVNS ================= */}
        {isMultiStage && (
          <>
            {/* ================= MEN ================= */}
            <div className={styles.stageBlock}>
              <h3 className={styles.stageTitle}>Men</h3>

              {stages.map((stage) => {
                const stageMatches = groupByStage(
                  menMatches,
                  stage
                );

                if (stageMatches.length === 0) {
                  return (
                    <div key={stage}>
                      <h4 className={styles.stageSubtitle}>
                        {stage.replace("-", " ").toUpperCase()}
                      </h4>
                      <div className={styles.emptyState}>
                        Fixtures to be announced
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={stage}>
                    <h4 className={styles.stageSubtitle}>
                      {stage.replace("-", " ").toUpperCase()}
                    </h4>

                    {pools.map((pool) => {
                      const poolMatches = stageMatches.filter(
                        (m) => m.pool === pool
                      );

                      if (poolMatches.length === 0) return null;

                      return (
                        <div key={pool}>
                          <h5 className={styles.roundTitle}>
                            Pool {pool}
                          </h5>

                          <StandingsTable
                            data={buildStandings(poolMatches)}
                          />

                          {poolMatches.map((match) => (
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
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* ================= WOMEN ================= */}
            <div className={styles.stageBlock}>
              <h3 className={styles.stageTitle}>Women</h3>

              {stages.map((stage) => {
                const stageMatches = groupByStage(
                  womenMatches,
                  stage
                );

                if (stageMatches.length === 0) {
                  return (
                    <div key={stage}>
                      <h4 className={styles.stageSubtitle}>
                        {stage.replace("-", " ").toUpperCase()}
                      </h4>
                      <div className={styles.emptyState}>
                        Fixtures to be announced
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={stage}>
                    <h4 className={styles.stageSubtitle}>
                      {stage.replace("-", " ").toUpperCase()}
                    </h4>

                    {pools.map((pool) => {
                      const poolMatches = stageMatches.filter(
                        (m) => m.pool === pool
                      );

                      if (poolMatches.length === 0) return null;

                      return (
                        <div key={pool}>
                          <h5 className={styles.roundTitle}>
                            Pool {pool}
                          </h5>

                          <StandingsTable
                            data={buildStandings(poolMatches)}
                          />

                          {poolMatches.map((match) => (
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
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}