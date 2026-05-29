import React, {
  useMemo,
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

import { liveStandings } from "../../data/standings/liveStandings";

import {
  applyTableOverlay,
} from "../../utils/tableOverlayResolver";

import { competitionState } from "../../data/competitionState";

import {
  competitionQualification,
} from "../../data/competitionQualification";

import {
  competitionActivity,
} from "../../data/competitionActivity";

/* ==================================================
   PAGE
   ================================================== */

export default function LeagueTablePage() {
  const { leagueId } = useParams<{
    leagueId: string;
  }>();

  const navigate = useNavigate();

  const [id, gender] = (
    leagueId || ""
  ).split("-");

  const league = domesticLeagues.find(
    (l) => l.id === id
  );

  const key =
    `${id}-${gender}`;

  const competition =
    competitionState[key];

  const qualification =
    competitionQualification[key];

  const activity =
    competitionActivity[key];

  const table = useMemo(() => {
    if (!id || !gender) return [];

    const normalizedKey =
      `${id}-${gender}`.toLowerCase();

    const baseTable =
      tables2026[
        normalizedKey as keyof typeof tables2026
      ];

    if (
      !baseTable ||
      baseTable.length === 0
    ) {
      console.error(
        "❌ NO TABLE FOUND:",
        normalizedKey
      );

      return [];
    }

    const standings =
      (
        liveStandings as Record<
          string,
          any[]
        >
      )[normalizedKey];

    return applyTableOverlay(
      baseTable,
      standings
    );
  }, [id, gender]);

  if (!league) {
    return (
      <main className={styles.page}>
        <div>League not found</div>
      </main>
    );
  }

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
          ← Back to Domestic Leagues
        </button>
      </div>

      {/* HEADER */}
      <section className={styles.section}>
        <h1 className={styles.title}>
          {league.name} ({gender})
        </h1>

        <p className={styles.season}>
          Season: {league.season}
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
          Current Standings
        </h2>

        {table.length === 0 ? (
          <div>
            No standings available
          </div>
        ) : (
          <table className={styles.table}>
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

                    <td>{row.team}</td>

                    <td>{row.coach}</td>

                    <td>
                      {row.played}
                    </td>

                    <td>{row.wins}</td>

                    <td>{row.draws}</td>

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
                        <td colSpan={11}>
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

      {/* RECENT RESULTS */}
      {activity?.recentResults && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Recent Results
          </h2>

          <div className={styles.matchesList}>
            {activity.recentResults.map(
              (match: any) => (
                <div
                  key={`${match.home}-${match.away}`}
                  className={styles.matchItem}
                >
                  <div
                    className={styles.matchTeams}
                  >
                    {match.home} vs{" "}
                    {match.away}
                  </div>

                  <div
                    className={styles.matchScore}
                  >
                    {match.homeScore} -{" "}
                    {match.awayScore}
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

      {/* UPCOMING FIXTURES */}
      {activity?.upcomingFixtures && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Upcoming Fixtures
          </h2>

          <div className={styles.matchesList}>
            {activity.upcomingFixtures.map(
              (match: any) => (
                <div
                  key={`${match.home}-${match.away}`}
                  className={styles.matchItem}
                >
                  <div
                    className={styles.matchTeams}
                  >
                    {match.home} vs{" "}
                    {match.away}
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

      {/* PLAYOFFS */}
      {competition?.fixtures && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {
              competition.bannerTitle
            }
          </h2>

          <div
            className={styles.playoffGrid}
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

      {/* CHAMPION CARD */}
      {competition?.state ===
        "completed" && (
        <section className={styles.section}>
          <div
            className={
              styles.championCard
            }
          >
            <div
              className={styles.trophy}
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