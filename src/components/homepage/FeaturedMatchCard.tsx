import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import styles from "./FeaturedMatchCard.module.css";

import { getMatches } from "../../data/matchesAdapter";

import type {
  MatchData,
} from "../../data/matches/types";

import nzFlag from "../../assets/images/flags/new-zealand.jpg";
import saFlag from "../../assets/images/flags/south-africa.jpg";
import argentinaFlag from "../../assets/images/flags/argentina.jpg";
import australiaFlag from "../../assets/images/flags/australia.jpg";
import japanFlag from "../../assets/images/flags/japan.jpg";

import stormersLogo from "../../assets/images/rivalry/stormers.jpg";

interface FeaturedMatch
  extends MatchData {
  displayHomeImage: string;
  displayAwayImage: string;
}

/* ==================================================
   TEAM IMAGE RESOLVER
   ================================================== */

function getTeamImage(
  teamName: string,
  country: string
): string {
  const name =
    teamName.toLowerCase();

  if (
    name.includes("stormers")
  ) {
    return stormersLogo;
  }

  if (
    name.includes("new zealand")
  ) {
    return nzFlag;
  }

  if (
    name.includes("south africa")
  ) {
    return saFlag;
  }

  if (
    name.includes("argentina")
  ) {
    return argentinaFlag;
  }

  if (
    name.includes("australia")
  ) {
    return australiaFlag;
  }

  if (
    name.includes("japan")
  ) {
    return japanFlag;
  }

  /*
   * No known local image.
   *
   * We return an empty string rather than
   * inventing an asset path.
   */

  return "";
}

/* ==================================================
   COUNTDOWN
   ================================================== */

function formatCountdown(
  startTime?: string
): string {
  if (!startTime) {
    return "Kick-off time TBC";
  }

  const target =
    new Date(startTime).getTime();

  const now =
    Date.now();

  const difference =
    target - now;

  if (difference <= 0) {
    return "Starting now";
  }

  const totalSeconds =
    Math.floor(
      difference / 1000
    );

  const days =
    Math.floor(
      totalSeconds / 86400
    );

  const hours =
    Math.floor(
      (totalSeconds % 86400) /
        3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
        60
    );

  const seconds =
    totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(
      hours
    ).padStart(2, "0")}h ${String(
      minutes
    ).padStart(2, "0")}m`;
  }

  return `${String(
    hours
  ).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

/* ==================================================
   COMPETITION LABEL
   ================================================== */

function getCompetitionLabel(
  match: MatchData
): string {
  if (
    match.tournament
  ) {
    return match.tournament;
  }

  return "Rugby Match";
}

/* ==================================================
   DATE DISPLAY
   ================================================== */

function formatDate(
  match: MatchData
): string {
  if (!match.startTime) {
    return match.date;
  }

  return new Date(
    match.startTime
  ).toLocaleString(
    "en-GB",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

/* ==================================================
   COMPONENT
   ================================================== */

export default function FeaturedMatchCard() {
  const navigate =
    useNavigate();

  const [
    matches,
    setMatches,
  ] = useState<MatchData[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    now,
    setNow,
  ] = useState(
    Date.now()
  );

  /* ==================================================
     LOAD MATCHES
     ================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        const data =
          await getMatches();

        if (
          mounted
        ) {
          setMatches(
            data
          );
        }
      } catch (error) {
        console.error(
          "FEATURED MATCHES LOAD FAILED:",
          error
        );
      } finally {
        if (
          mounted
        ) {
          setLoading(
            false
          );
        }
      }
    }

    loadMatches();

    /*
     * Refresh the match data periodically.
     *
     * This allows a finished match to disappear
     * without requiring the user to reload Home.
     */

    const refresh =
      window.setInterval(
        loadMatches,
        60 * 1000
      );

    return () => {
      mounted = false;

      window.clearInterval(
        refresh
      );
    };
  }, []);

  /* ==================================================
     COUNTDOWN CLOCK
     ================================================== */

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setNow(
            Date.now()
          );
        },
        1000
      );

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, []);

  /* ==================================================
     FEATURED MATCH SELECTION
     ================================================== */

  const featuredMatches =
    useMemo<FeaturedMatch[]>(
      () => {
        const upcoming =
          matches
            .filter(
              (
                match
              ) => {
                /*
                 * Finished matches must never
                 * remain in Featured Matches.
                 */

                if (
                  match.state ===
                  "final"
                ) {
                  return false;
                }

                /*
                 * Live matches are not treated
                 * as upcoming featured fixtures.
                 *
                 * The live area handles those.
                 */

                if (
                  match.state ===
                  "live"
                ) {
                  return false;
                }

                if (
                  match.state ===
                  "starting"
                ) {
                  return false;
                }

                /*
                 * We need a valid kick-off time
                 * for the countdown.
                 */

                if (
                  !match.startTime
                ) {
                  return false;
                }

                const kickOff =
                  new Date(
                    match.startTime
                  ).getTime();

                return (
                  kickOff >
                  now
                );
              }
            )
            .sort(
              (
                a,
                b
              ) =>
                new Date(
                  a.startTime!
                ).getTime() -
                new Date(
                  b.startTime!
                ).getTime()
            );

        return upcoming
          .slice(0, 2)
          .map(
            (
              match
            ) => ({
              ...match,

              displayHomeImage:
                getTeamImage(
                  match
                    .home
                    .name,
                  match
                    .home
                    .country
                ),

              displayAwayImage:
                getTeamImage(
                  match
                    .away
                    .name,
                  match
                    .away
                    .country
                ),
            })
          );
      },
      [
        matches,
        now,
      ]
    );

  /* ==================================================
     CLICK
     ================================================== */

  const handleMatchClick =
    (
      matchId: number
    ) => {
      navigate(
        `/match/${matchId}`
      );
    };

  /* ==================================================
     LOADING
     ================================================== */

  if (
    loading &&
    matches.length === 0
  ) {
    return (
      <section
        className={
          styles.section
        }
      >
        <div
          className={
            styles.sectionHeader
          }
        >
          <h2>
            ⚡ Upcoming Featured
            Matches
          </h2>

          <p>
            Don't miss the action
          </p>
        </div>

        <div
          className={
            styles.matchesGrid
          }
        >
          <div
            className={
              styles.matchCard
            }
          >
            Loading featured
            matches...
          </div>
        </div>
      </section>
    );
  }

  /* ==================================================
     EMPTY STATE
     ================================================== */

  if (
    featuredMatches.length === 0
  ) {
    return (
      <section
        className={
          styles.section
        }
      >
        <div
          className={
            styles.sectionHeader
          }
        >
          <h2>
            ⚡ Upcoming Featured
            Matches
          </h2>

          <p>
            Don't miss the action
          </p>
        </div>

        <div
          className={
            styles.matchesGrid
          }
        >
          <div
            className={
              styles.matchCard
            }
          >
            No upcoming featured
            matches available.
          </div>
        </div>
      </section>
    );
  }

  /* ==================================================
     RENDER
     ================================================== */

  return (
    <section
      className={
        styles.section
      }
    >
      <div
        className={
          styles.sectionHeader
        }
      >
        <h2>
          ⚡ Upcoming Featured
          Matches
        </h2>

        <p>
          Don't miss the action
        </p>
      </div>

      <div
        className={
          styles.matchesGrid
        }
      >
        {featuredMatches.map(
          (
            match
          ) => (
            <div
              key={
                match.id
              }
              className={
                styles.matchCard
              }
              onClick={() =>
                handleMatchClick(
                  match.id
                )
              }
            >
              {/* =================
                  COMPETITION
                  ================= */}

              <div
                className={
                  styles.competitionBadge
                }
              >
                {getCompetitionLabel(
                  match
                )}
              </div>

              {/* =================
                  TEAMS
                  ================= */}

              <div
                className={
                  styles.teamsContainer
                }
              >
                {/* HOME */}

                <div
                  className={
                    styles.teamBlock
                  }
                >
                  <div
                    className={
                      styles.flagWrapper
                    }
                  >
                    {match.displayHomeImage ? (
                      <img
                        src={
                          match.displayHomeImage
                        }
                        alt={
                          match
                            .home
                            .name
                        }
                        className={
                          styles.flag
                        }
                      />
                    ) : (
                      <div
                        className={
                          styles.flag
                        }
                      />
                    )}
                  </div>

                  <span
                    className={
                      styles.teamName
                    }
                  >
                    {
                      match
                        .home
                        .name
                    }
                  </span>
                </div>

                {/* VS */}

                <div
                  className={
                    styles.vsContainer
                  }
                >
                  <span
                    className={
                      styles.vsBadge
                    }
                  >
                    VS
                  </span>
                </div>

                {/* AWAY */}

                <div
                  className={
                    styles.teamBlock
                  }
                >
                  <div
                    className={
                      styles.flagWrapper
                    }
                  >
                    {match.displayAwayImage ? (
                      <img
                        src={
                          match.displayAwayImage
                        }
                        alt={
                          match
                            .away
                            .name
                        }
                        className={
                          styles.flag
                        }
                      />
                    ) : (
                      <div
                        className={
                          styles.flag
                        }
                      />
                    )}
                  </div>

                  <span
                    className={
                      styles.teamName
                    }
                  >
                    {
                      match
                        .away
                        .name
                    }
                  </span>
                </div>
              </div>

              {/* =================
                  COUNTDOWN
                  ================= */}

              <div
                className={
                  styles.matchDetails
                }
              >
                <div
                  className={
                    styles.detailItem
                  }
                >
                  <span
                    className={
                      styles.detailLabel
                    }
                  >
                    ⏱ Kick-off
                  </span>

                  <span
                    className={
                      styles.detailValue
                    }
                  >
                    {formatCountdown(
                      match.startTime
                    )}
                  </span>
                </div>

                <div
                  className={
                    styles.detailItem
                  }
                >
                  <span
                    className={
                      styles.detailLabel
                    }
                  >
                    📅 Date
                  </span>

                  <span
                    className={
                      styles.detailValue
                    }
                  >
                    {formatDate(
                      match
                    )}
                  </span>
                </div>

                <div
                  className={
                    styles.detailItem
                  }
                >
                  <span
                    className={
                      styles.detailLabel
                    }
                  >
                    📍 Venue
                  </span>

                  <span
                    className={
                      styles.detailValue
                    }
                  >
                    {
                      match.venue
                    }
                  </span>
                </div>
              </div>

              {/* =================
                  FOOTER
                  ================= */}

              <div
                className={
                  styles.matchFooter
                }
              >
                <span
                  className={
                    styles.clickHint
                  }
                >
                  Click to view
                  match →
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}