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

import {
  getCompetition,
} from "../../contracts/competitionRegistry";

import {
  domesticLeagues,
} from "../../data/domesticLeagues";

import {
  womenDomesticLeagues,
} from "../../data/womenDomesticLeagues";

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

import {
  getStandings,
} from "../../utils/standings/standingsService";

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

  const [standings, setStandings] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState("");

  const id = leagueId || "";

  const league =
    getCompetition(id) ??
    [...domesticLeagues, ...womenDomesticLeagues].find(
      (l) => l.id === id
    );

  const leagueUi =
    [...domesticLeagues, ...womenDomesticLeagues].find(
      (l) => l.id === id
    );

  const competition =
    competitionState[id];

  const competitionInfo =
    getCompetition(id);

  const qualification =
    competitionQualification[id];

  /* ==================================================
     LOAD MATCHES + STANDINGS

     IMPORTANT:

     This effect deliberately does NOT depend on
     `matches`.

     The previous implementation depended on matches
     while also calling setMatches(), which caused the
     entire effect to run repeatedly.

     That produced repeated Highlightly standings
     requests and eventually a 429 daily-limit error.
     ================================================== */

  useEffect(() => {
    let mounted = true;
    let timeout:
      | ReturnType<typeof setTimeout>
      | undefined;

    async function load() {
      if (!id) {
        return;
      }

      try {
        if (mounted) {
          setLoading(true);
        }

        const data =
          await getMatches({
            type: "domestic",
            leagueId: id,
          });

        if (!mounted) {
          return;
        }

        setMatches(data);

        /*
        --------------------------------------------------
        LIVE STANDINGS

        This is one standings request per controlled
        refresh cycle.

        It is NOT triggered by setMatches().
        --------------------------------------------------
        */

        try {
          const liveStandings =
            await getStandings(id, 2026);

          if (mounted) {
            setStandings(liveStandings);
          }
        } catch (err) {
          console.warn(
            "LIVE STANDINGS FAILED",
            err
          );

          /*
          Do not destroy an existing standings table
          simply because a live request fails.
          */
        }

        setLastUpdated(
          new Date().toLocaleTimeString()
        );

        /*
        --------------------------------------------------
        SMART NEXT REFRESH

        Completed:
          no polling

        Live:
          30 seconds

        Upcoming within 6 hours:
          2 minutes

        Otherwise:
          5 minutes
        --------------------------------------------------
        */

        let refreshRate = 300000;

        if (
          competition?.state ===
          "completed"
        ) {
          refreshRate = 0;
        } else if (
          data.some(
            (m) =>
              m.state === "live"
          )
        ) {
          refreshRate = 30000;
        } else {
          const now =
            Date.now();

          const upcomingSoon =
            data.some((m) => {
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

        if (
          mounted &&
          refreshRate > 0
        ) {
          console.log(
            "🏉 NEXT TABLE REFRESH:",
            refreshRate
          );

          timeout =
            setTimeout(() => {
              load();
            }, refreshRate);
        }
      } catch (err) {
        console.error(
          "LIVE TABLE LOAD FAILED",
          err
        );

        /*
        --------------------------------------------------
        If the load fails, retry after 5 minutes.

        This prevents a failed API request from creating
        a rapid retry loop.
        --------------------------------------------------
        */

        if (mounted) {
          timeout =
            setTimeout(() => {
              load();
            }, 300000);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;

      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [
    id,
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
        id.toLowerCase();

      return (
        tables2026[
          normalizedKey as keyof typeof tables2026
        ] || []
      );
    }, [id]);

  /* ==================================================
     LIVE TABLE
     ================================================== */

  const table =
    useMemo(() => {
      if (standings.length > 0) {
        const liveRows =
          standings.map((team) => ({
            team: team.name,

            played:
              team.played,

            won:
              team.won,

            drawn:
              team.drawn,

            lost:
              team.lost,

            pf:
              team.pointsFor,

            pa:
              team.pointsAgainst,

            pts:
              team.points,

            pd:
              team.pointsFor -
              team.pointsAgainst,
          }));

        return applyTableOverlay(
          baseTable,
          liveRows
        );
      }

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
            team:
              team.team,

            played:
              team.played,

            won:
              team.won,

            drawn:
              team.drawn,

            lost:
              team.lost,

            pf:
              team.pointsFor,

            pa:
              team.pointsAgainst,

            pts:
              team.points,

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
      standings,
    ]);

  /* ==================================================
     NOT FOUND
     ================================================== */

  if (!league && !leagueUi) {
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
          {competitionInfo?.name ??
            leagueUi?.name}
        </h1>

        {leagueUi?.season && (
          <p className={styles.season}>
            Season: {leagueUi.season}
          </p>
        )}

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
                      {row.position}
                    </td>

                    <td>
                      {row.team}
                    </td>

                    <td>
                      {row.coach}
                    </td>

                    <td>
                      {row.played}
                    </td>

                    <td>
                      {row.wins}
                    </td>

                    <td>
                      {row.draws}
                    </td>

                    <td>
                      {row.losses}
                    </td>

                    <td>
                      {row.pointsFor}
                    </td>

                    <td>
                      {row.pointsAgainst}
                    </td>

                    <td>
                      {row.pointsDiff}
                    </td>

                    <td>
                      {row.leaguePoints}
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

          <div
            className={
              styles.matchesList
            }
          >
            {liveMatches.map(
              (match) => (
                <div
                  key={
                    match.matchKey ||
                    String(match.id)
                  }
                  className={
                    styles.matchItem
                  }
                >
                  <div
                    className={
                      styles.matchTeams
                    }
                  >
                    {match.home.name}{" "}
                    vs{" "}
                    {match.away.name}
                  </div>

                  <div
                    className={
                      styles.matchScore
                    }
                  >
                    {match.score
                      ? `${match.score.home} - ${match.score.away}`
                      : "LIVE"}
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
                match: MatchData
              ) => (
                <div
                  key={
                    match.matchKey ||
                    String(match.id)
                  }
                  className={
                    styles.matchItem
                  }
                >
                  <div
                    className={
                      styles.matchTeams
                    }
                  >
                    {match.home.name}{" "}
                    vs{" "}
                    {match.away.name}
                  </div>

                  <div
                    className={
                      styles.matchScore
                    }
                  >
                    {match.score
                      ? `${match.score.home} - ${match.score.away}`
                      : "-"}
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
                match: MatchData
              ) => (
                <div
                  key={
                    match.matchKey ||
                    String(match.id)
                  }
                  className={
                    styles.matchItem
                  }
                >
                  <div
                    className={
                      styles.matchTeams
                    }
                  >
                    {match.home.name}{" "}
                    vs{" "}
                    {match.away.name}
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
                      {match.home}
                    </span>

                    <span
                      className={
                        styles.vs
                      }
                    >
                      vs
                    </span>

                    <span>
                      {match.away}
                    </span>
                  </div>

                  <div
                    className={
                      styles.playoffMeta
                    }
                  >
                    <div>
                      {match.date}
                    </div>

                    <div>
                      {match.venue}
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