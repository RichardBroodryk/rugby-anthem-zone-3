import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import styles from "./LeagueTablePage.module.css";

import { domesticLeagues } from "../../data/domesticLeagues";

import {
  tables2026,
} from "../../data/tables2026";

import {
  competitionState,
} from "../../data/competitionState";

import {
  competitionQualification,
} from "../../data/competitionQualification";

import {
  getMatches,
} from "../../data/matchesAdapter";

import {
  buildStandings,
} from "../../utils/standings/standingsEngine";

import {
  applyTableOverlay,
} from "../../utils/tableOverlayResolver";

import type {
  MatchData,
} from "../../data/matches/types";

/* ==================================================
   PAGE
   ================================================== */

export default function LeagueTablePage() {
  const { leagueId } =
    useParams<{
      leagueId: string;
    }>();

  const navigate =
    useNavigate();

  const [matches, setMatches] =
    useState<MatchData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState("");

  const [id, gender] = (
    leagueId || ""
  ).split("-");

  const league =
    domesticLeagues.find(
      (l) => l.id === id
    );

  const key =
    `${id}-${gender}`;

  const competition =
    competitionState[key];

  const qualification =
    competitionQualification[key];


  /* ==================================================
     LOAD LIVE MATCHES
     ================================================== */

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!id || !gender) {
        return;
      }

      try {
        setLoading(true);

        const data =
          await getMatches({
            type: "domestic",

            leagueId: id,

            gender:
              gender as
                | "men"
                | "women",
          });

        if (!mounted) {
          return;
        }

        setMatches(data);

        setLastUpdated(
          new Date().toLocaleTimeString()
        );
      } catch (err) {
        console.error(
          "LIVE TABLE LOAD FAILED",
          err
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

        /* ==========================================
       SMART POLLING
       ========================================== */

    let refreshRate =
      300000;

    /* ======================================
       COMPLETED COMPETITION
       ====================================== */

    if (
      competition?.state ===
      "completed"
    ) {
      refreshRate = 0;
    }

    /* ======================================
       LIVE MATCH DETECTED
       ====================================== */

    else if (
      matches.some(
        (m) =>
          m.state === "live"
      )
    ) {
      refreshRate = 30000;
    }

    /* ======================================
       UPCOMING TODAY
       ====================================== */

    else {
      const now = Date.now();

      const upcomingSoon =
        matches.some((m) => {
          if (
            m.state !==
            "upcoming"
          ) {
            return false;
          }

          const matchTime =
            new Date(
              m.date
            ).getTime();

          const diff =
            matchTime - now;

          return (
            diff > 0 &&
            diff <
              1000 *
                60 *
                60 *
                6
          );
        });

      if (upcomingSoon) {
        refreshRate = 120000;
      }
    }

    /* ======================================
       START POLLING
       ====================================== */

    let interval:
      | NodeJS.Timeout
      | undefined;

    if (refreshRate > 0) {
      console.log(
        "🏉 POLLING RATE:",
        refreshRate
      );

      interval =
        setInterval(() => {
          load();
        }, refreshRate);
    }

        return () => {
      mounted = false;

      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    id,
    gender,
    competition?.state,
  ]);
  

  /* ==================================================
     FINAL MATCHES
     ================================================== */

  const finalMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.state === "final"
      );
    }, [matches]);
  /* ==================================================
     RECENT RESULTS
     ================================================== */

  const recentResults =
    useMemo(() => {
      return matches
        .filter(
          (m) =>
            m.state === "final"
        )
        .sort(
          (a, b) =>
            new Date(
              b.date
            ).getTime() -
            new Date(
              a.date
            ).getTime()
        )
        .slice(0, 8);
    }, [matches]);

  /* ==================================================
     UPCOMING FIXTURES
     ================================================== */

  const upcomingFixtures =
    useMemo(() => {
      return matches
        .filter(
          (m) =>
            m.state ===
            "upcoming"
        )
        .sort(
          (a, b) =>
            new Date(
              a.date
            ).getTime() -
            new Date(
              b.date
            ).getTime()
        )
        .slice(0, 8);
    }, [matches]);

  /* ==================================================
     LIVE MATCHES
     ================================================== */

  const liveMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.state === "live"
      );
    }, [matches]);
  /* ==================================================
     COMPUTED STANDINGS
     ================================================== */

  const computedStandings =
    useMemo(() => {
      return buildStandings(
        finalMatches
      );
    }, [finalMatches]);

  /* ==================================================
     BASE TABLE
     ================================================== */

  const baseTable =
    useMemo(() => {
      const normalizedKey =
        `${id}-${gender}`.toLowerCase();

      return (
        tables2026[
          normalizedKey as keyof typeof tables2026
        ] || []
      );
    }, [
    id,
    gender,
    competition?.state,
    matches,
  ]);

  /* ==================================================
     LIVE TABLE
     ================================================== */

  const table =
    useMemo(() => {
      if (
        computedStandings.length ===
        0
      ) {
        return applyTableOverlay(
          baseTable,
          undefined
        );
      }

      const liveRows =
        computedStandings.map(
          (team) => ({
            team: team.team,

            played:
              team.played,

            won: team.won,

            drawn:
              team.drawn,

            lost: team.lost,

            pf:
              team.pointsFor,

            pa:
              team.pointsAgainst,

            pts: team.points,

            pd:
              team.pointsDiff,
          })
        );

      return applyTableOverlay(
        baseTable,
        liveRows
      );
    }, [
      baseTable,
      computedStandings,
    ]);

  /* ==================================================
     NOT FOUND
     ================================================== */

  if (!league) {
    return (
      <main className={styles.page}>
        <div>
          League not found
        </div>
      </main>
    );
  }

  /* ==================================================
     PAGE
     ================================================== */

  return (
    <main className={styles.page}>
      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() =>
            navigate(
              "/match-center/domestic"
            )
          }
        >
          ← Back to Domestic
        </button>
      </div>

      {/* HEADER */}
      <section className={styles.section}>
        <h1 className={styles.title}>
          {league.name} (
          {gender})
        </h1>

        <p className={styles.season}>
          Season:{" "}
          {league.season}
        </p>

        <p
          style={{
            opacity: 0.7,
            marginTop: 8,
          }}
        >
          Last Updated:{" "}
          {lastUpdated ||
            "Loading..."}
        </p>

        {competition && (
          <div
            className={`${styles.playoffBanner} ${
              competition.state ===
              "final"
                ? styles.finalBanner
                : competition.state ===
                  "completed"
                ? styles.completedBanner
                : ""
            }`}
          >
            <div
              className={
                styles.playoffBannerTitle
              }
            >
              {
                competition.bannerTitle
              }
            </div>

            <div
              className={
                styles.playoffBannerSub
              }
            >
              {
                competition.bannerSubtitle
              }
            </div>
          </div>
        )}
      </section>

      {/* STANDINGS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Live Standings
        </h2>

        {loading ? (
          <div>
            Loading live
            standings...
          </div>
        ) : table.length ===
          0 ? (
          <div>
            No standings
            available
          </div>
        ) : (
          <table
            className={styles.table}
          >
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
              {table.map((row) => (
                <React.Fragment
                  key={row.team}
                >
                  <tr
                    className={
                      qualification &&
                      row.position <=
                        qualification.qualified
                        ? styles.qualifiedRow
                        : ""
                    }
                  >
                    <td>
                      {
                        row.position
                      }
                    </td>

                    <td>
                      {row.team}
                    </td>

                    <td>
                      {
                        row.coach
                      }
                    </td>

                    <td>
                      {
                        row.played
                      }
                    </td>

                    <td>
                      {row.wins}
                    </td>

                    <td>
                      {
                        row.draws
                      }
                    </td>

                    <td>
                      {
                        row.losses
                      }
                    </td>

                    <td>
                      {
                        row.pointsFor
                      }
                    </td>

                    <td>
                      {
                        row.pointsAgainst
                      }
                    </td>

                    <td>
                      {
                        row.pointsDiff
                      }
                    </td>

                    <td>
                      {
                        row.leaguePoints
                      }
                    </td>
                  </tr>

                  {qualification &&
                    row.position ===
                      qualification.qualified && (
                      <tr
                        className={
                          styles.cutLine
                        }
                      >
                        <td
                          colSpan={
                            11
                          }
                        >
                          {
                            qualification.label
                          }
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </section>

            {/* LIVE MATCHES */}
      {liveMatches.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            🔴 Live Matches
          </h2>

          <div className={styles.matchesList}>
            {liveMatches.map(
              (match) => (
                <div
                  key={match.matchKey}
                  className={styles.matchItem}
                >
                  <div
                    className={styles.matchTeams}
                  >
                    {match.home.name} vs{" "}
                    {match.away.name}
                  </div>

                  <div
                    className={styles.matchScore}
                  >
                    {match.score
                      ? `${match.score.home} - ${match.score.away}`
                      : "LIVE"}
                  </div>

                  <div
                    className={styles.matchMeta}
                  >
                    {match.date}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* RECENT RESULTS */}
            {recentResults.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Recent Results
          </h2>

          <div
            className={
              styles.matchesList
            }
          >
                       {recentResults.map(
              (
                match: any
              ) => (
                <div
                  key={`${match.home}-${match.away}`}
                  className={
                    styles.matchItem
                  }
                >
                  <div
                    className={
                      styles.matchTeams
                    }
                  >
                    {match.home} vs{" "}
                    {match.away}
                  </div>

                  <div
                    className={
                      styles.matchScore
                    }
                  >
                    {
                      match.homeScore
                    }{" "}
                    -{" "}
                    {
                      match.awayScore
                    }
                  </div>

                  <div
                    className={
                      styles.matchMeta
                    }
                  >
                    {match.date}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* UPCOMING */}
            {upcomingFixtures.length >
        0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Upcoming Fixtures
          </h2>

          <div
            className={
              styles.matchesList
            }
          >
                        {upcomingFixtures.map(
              (
                match: any
              ) => (
                <div
                  key={`${match.home}-${match.away}`}
                  className={
                    styles.matchItem
                  }
                >
                  <div
                    className={
                      styles.matchTeams
                    }
                  >
                    {match.home} vs{" "}
                    {match.away}
                  </div>

                  <div
                    className={
                      styles.matchMeta
                    }
                  >
                    {match.date}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* PLAYOFFS */}
      {competition?.fixtures && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {
              competition.bannerTitle
            }
          </h2>

          <div
            className={
              styles.playoffGrid
            }
          >
            {competition.fixtures.map(
              (match) => (
                <div
                  key={`${match.home}-${match.away}`}
                  className={
                    styles.playoffCard
                  }
                >
                  <div
                    className={
                      styles.playoffTeams
                    }
                  >
                    <span>
                      {
                        match.home
                      }
                    </span>

                    <span
                      className={
                        styles.vs
                      }
                    >
                      vs
                    </span>

                    <span>
                      {
                        match.away
                      }
                    </span>
                  </div>

                  <div
                    className={
                      styles.playoffMeta
                    }
                  >
                    <div>
                      {
                        match.date
                      }
                    </div>

                    <div>
                      {
                        match.venue
                      }
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* CHAMPION */}
      {competition?.state ===
        "completed" && (
        <section className={styles.section}>
          <div
            className={
              styles.championCard
            }
          >
            <div
              className={
                styles.trophy
              }
            >
              🏆
            </div>

            <div
              className={
                styles.championTitle
              }
            >
              Champions
            </div>

            <div
              className={
                styles.championTeam
              }
            >
              {
                competition.champion
              }
            </div>

            <div
              className={
                styles.runnerUp
              }
            >
              defeated{" "}
              {
                competition.runnerUp
              }
            </div>

            {competition.finalScore && (
              <div
                className={
                  styles.finalScore
                }
              >
                Final Score:{" "}
                {
                  competition.finalScore
                }
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}