import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import styles from "./MatchPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import { flagMap } from "../data/flagMap";
import { getMatchDetails } from "../utils/matchDetailsResolver";
import { tournaments2026 } from "../data/tournamentMeta";
import {
  getMatchHighlights,
} from "../utils/highlights/highlightsService";
import type {
  MatchHighlight,
} from "../utils/highlights/highlightsService";

/* ==================================================
   MATCH RESOLUTION HELPERS
   ================================================== */

function normalizeTeamName(
  value: string | undefined
): string {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeDate(
  value: string | undefined
): string {
  if (!value) return "";

  return value.split("T")[0];
}

function sameTeams(
  first: any,
  second: any
): boolean {
  if (!first || !second) {
    return false;
  }

  return (
    normalizeTeamName(first.home?.name) ===
      normalizeTeamName(second.home?.name) &&
    normalizeTeamName(first.away?.name) ===
      normalizeTeamName(second.away?.name)
  );
}

function sameMatchDate(
  first: any,
  second: any
): boolean {
  return (
    normalizeDate(first?.date) ===
    normalizeDate(second?.date)
  );
}

function hasUsableScore(
  match: any
): boolean {
  return (
    !!match?.score &&
    Number.isFinite(match.score.home) &&
    Number.isFinite(match.score.away)
  );
}

function hasLiveState(
  match: any
): boolean {
  return (
    match?.state === "live" ||
    match?.state === "final" ||
    match?.state === "starting"
  );
}

/* ==================================================
   MATCH CANDIDATE RESOLUTION
   ================================================== */

function selectBestMatch(
  candidates: any[]
): any | undefined {
  if (!candidates.length) {
    return undefined;
  }

  /*
   * Highlightly data must win when it contains
   * authoritative live/final information.
   *
   * Priority:
   *
   * 1. Match with score
   * 2. Live / final / starting state
   * 3. Otherwise first available record
   */

  const scored =
    candidates.find(
      (candidate) =>
        hasUsableScore(candidate)
    );

  if (scored) {
    return scored;
  }

  const stateful =
    candidates.find(
      (candidate) =>
        hasLiveState(candidate)
    );

  if (stateful) {
    return stateful;
  }

  return candidates[0];
}

export default function MatchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [match, setMatch] = useState<any>(
    location.state || null
  );

  const [matchHighlights, setMatchHighlights] =
    useState<MatchHighlight[]>([]);

  const [userComments, setUserComments] =
    useState<any[]>([]);

  const [newComment, setNewComment] =
    useState("");

  /* ==================================================
     SVNS EDITORIAL MODE
     ================================================== */

  const isSvns =
    match?.competitionId === "svns";

  /* ==================================================
     LOAD MATCH

     IMPORTANT:

     The route state is only the initial record.

     MatchPage always refreshes through getMatches()
     so Highlightly can supply the latest score/state.

     Resolution order:

     1. Exact matchKey candidates
     2. Same home + away + date candidates
     3. ID fallback

     When multiple candidates exist, the scored/live
     record wins.
     ================================================== */

  useEffect(() => {
    if (!id && !location.state) {
      return;
    }

    let cancelled = false;

    async function loadMatch() {
      try {
        const allMatches =
          await getMatches();

        if (cancelled) {
          return;
        }

        const routeMatch =
          location.state || null;

        let found: any | undefined;

        /* ==================================================
           1. EXACT MATCH KEY
           ================================================== */

        if (routeMatch?.matchKey) {
          const keyMatches =
            allMatches.filter(
              (candidate) =>
                candidate.matchKey ===
                routeMatch.matchKey
            );

          found =
            selectBestMatch(
              keyMatches
            );
        }

        /* ==================================================
           2. SAME TEAMS + SAME DATE
           
           This is the critical reconciliation step.

           There may be both:
           
           LOCAL:
           Stormers vs New Zealand
           no score

           HIGHLIGHTLY:
           Stormers vs New Zealand
           21 - 38

           We collect ALL matching records and allow
           selectBestMatch() to choose the scored record.
           ================================================== */

        if (!found && routeMatch) {
          const matchingCandidates =
            allMatches.filter(
              (candidate) =>
                sameTeams(
                  candidate,
                  routeMatch
                ) &&
                sameMatchDate(
                  candidate,
                  routeMatch
                )
            );

          found =
            selectBestMatch(
              matchingCandidates
            );
        }

        /* ==================================================
           3. ID FALLBACK
           ================================================== */

        if (!found && id) {
          const idMatches =
            allMatches.filter(
              (candidate) =>
                String(candidate.id) ===
                String(id)
            );

          found =
            selectBestMatch(
              idMatches
            );
        }

        /* ==================================================
           USE CANONICAL MATCH
           ================================================== */

        if (found) {
          console.log(
            "🏉 MATCH PAGE RESOLVED:",
            {
              id: found.id,
              matchKey: found.matchKey,
              home: found.home?.name,
              away: found.away?.name,
              date: found.date,
              score: found.score,
              state: found.state,
            }
          );

          setMatch(found);

          return;
        }

        /* ==================================================
           LAST RESORT
           ================================================== */

        if (routeMatch) {
          console.warn(
            "⚠️ MATCH PAGE USING ROUTE STATE FALLBACK"
          );

          setMatch(routeMatch);
        }
      } catch (error) {
        console.warn(
          "⚠️ MATCH PAGE FAILED TO REFRESH MATCH:",
          error
        );

        /*
         * Keep the existing route state if the backend
         * is temporarily unavailable.
         */

        if (
          !cancelled &&
          location.state
        ) {
          setMatch(location.state);
        }
      }
    }

    loadMatch();

    return () => {
      cancelled = true;
    };
  }, [id, location.state]);

  /* ==================================================
     LOAD MATCH HIGHLIGHTS
     ================================================== */

  useEffect(() => {
    if (!match?.highlightlyId) {
      setMatchHighlights([]);
      return;
    }

    let cancelled = false;

    async function loadHighlights() {
      try {
        const highlights =
          await getMatchHighlights(
            match.highlightlyId
          );

        if (!cancelled) {
          console.log(
            "🎥 MATCH HIGHLIGHTS LOADED:",
            highlights
          );

          setMatchHighlights(
            highlights
          );
        }
      } catch (error) {
        console.warn(
          "⚠️ MATCH HIGHLIGHTS FAILED:",
          error
        );

        if (!cancelled) {
          setMatchHighlights([]);
        }
      }
    }

    loadHighlights();

    return () => {
      cancelled = true;
    };
  }, [match?.highlightlyId]);

  /* ==================================================
     TRACKING
     ================================================== */

  useEffect(() => {
    const key =
      "raz_last_match_view";

    if (
      sessionStorage.getItem(key)
    ) {
      return;
    }

    const current =
      Number(
        localStorage.getItem(
          "raz_matches_followed"
        )
      ) || 0;

    localStorage.setItem(
      "raz_matches_followed",
      String(current + 1)
    );

    sessionStorage.setItem(
      key,
      "true"
    );
  }, []);

  /* ==================================================
     LOADING
     ================================================== */

  const resolvedTournamentRoute =
    useMemo(() => {
      if (!match) {
        return "/tournaments";
      }

      if (match.tournamentSlug) {
        return `/tournaments/${match.tournamentSlug}`;
      }

      const tournament =
        tournaments2026.find(
          (t) =>
            t.conceptId ===
              match.competitionId ||
            t.route ===
              match.competitionId ||
            t.route?.includes(
              match.competitionId
            )
        );

      if (tournament?.route) {
        return tournament.route;
      }

      return "/tournaments";
    }, [match]);

  if (!match) {
    return (
      <div className={styles.page}>
        Loading match...
      </div>
    );
  }

  /* ==================================================
     ENSURE MATCH KEY
     ================================================== */

  if (!match.matchKey) {
    const normalize = (
      v: string
    ) =>
      v
        .toLowerCase()
        .replace(/\s+/g, "-");

    match.matchKey = `${normalize(
      match.home.name
    )}-vs-${normalize(
      match.away.name
    )}`;
  }

  const details =
    getMatchDetails(match);

  /* ==================================================
     FLAGS + META
     ================================================== */

     console.log("🏉 MATCH PAGE MATCH IDENTIFIERS", {
  razId: match.id,
  highlightlyId: match.highlightlyId,
  matchKey: match.matchKey,
  homeTeam: match.home.name,
  awayTeam: match.away.name,
  date: match.date,
  score: match.score,
  state: match.state,
});

  const homeFlag =
    flagMap[
      match.home.country
    ];

  const awayFlag =
    flagMap[
      match.away.country
    ];

  const formattedDate =
    match.date
      ? new Date(
          match.date
        ).toLocaleString(
          "en-GB",
          {
            dateStyle:
              "full",
            timeStyle:
              "short",
          }
        )
      : "Date TBC";

  const hasScore =
    hasUsableScore(match);

  /* ==================================================
     COMMENTS
     ================================================== */

  const handlePostComment =
    () => {
      if (
        newComment.trim() === ""
      ) {
        return;
      }

      const comment = {
        id: Date.now().toString(),

        tournamentId:
          match.competitionId,

        text: newComment,

        createdAt:
          new Date().toISOString(),

        author: {
          displayName: "You",
        },
      };

      setUserComments([
        ...userComments,
        comment,
      ]);

      setNewComment("");
    };

  /* ==================================================
     UI
     ================================================== */

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}

      <header className={styles.hero}>
        <div
          className={styles.heroLeft}
          style={{
            backgroundImage: `url(${homeFlag})`,
          }}
        />

        <div
          className={styles.heroRight}
          style={{
            backgroundImage: `url(${awayFlag})`,
          }}
        />

        <div
          className={styles.heroOverlay}
        />

        <div
          className={styles.heroContent}
        >
          <div
            className={styles.heroNation}
          >
            {match.home.name}
          </div>

          <div
            className={styles.heroVs}
          >
            {hasScore
              ? `${match.score.home} - ${match.score.away}`
              : "VS"}
          </div>

          <div
            className={styles.heroNation}
          >
            {match.away.name}
          </div>
        </div>
      </header>

      {/* ================= BACK BUTTON ================= */}

      <div
        className={styles.backWrap}
      >
        <button
          className={
            styles.backButton
          }
          onClick={() =>
            navigate(
              resolvedTournamentRoute
            )
          }
        >
          ← Back to Tournament
        </button>
      </div>

      {/* ================= MATCH INFO CARD ================= */}

      <section
        className={
          styles.matchInfoCard
        }
      >
        <div
          className={
            styles.matchDate
          }
        >
          📅 {formattedDate}
        </div>

        <div
          className={
            styles.matchVenue
          }
        >
          🏟 {match.venue}
        </div>
      </section>

      {/* ================= EVENTS ================= */}

      <section
        className={styles.section}
      >
        <h2>Match Events</h2>

        {details?.timeline
          ?.length ? (
          details.timeline.map(
            (
              e: any,
              i: number
            ) => (
              <div
                key={i}
                className={
                  styles.event
                }
              >
                <strong>
                  {e.minute}
                </strong>{" "}
                — {e.label}
              </div>
            )
          )
        ) : (
          <p>
            No events recorded
            yet for this match.
          </p>
        )}
      </section>

     {/* ================= MATCH HIGHLIGHTS ================= */}

{matchHighlights.length > 0 && (
  <section
    className={styles.section}
  >
    <h2>
      Match Highlights
    </h2>

    {matchHighlights.map(
      (highlight) => (
        <div
          key={highlight.id}
          className={
            styles.reportCard
          }
        >
          {highlight.embedUrl && (
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <iframe
                src={
                  highlight.embedUrl
                }
                title={
                  highlight.title
                }
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                allowFullScreen
              />
            </div>
          )}

          <div
            style={{
              marginTop: "12px",
            }}
          >
            <a
              href={
                highlight.url
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube ↗
            </a>
          </div>

          <p
            className={
              styles.reportText
            }
          >
            {highlight.title}
          </p>

          {highlight.channel && (
            <p
              className={
                styles.reportText
              }
            >
              Source:{" "}
              {highlight.channel}
            </p>
          )}
        </div>
      )
    )}
  </section>
)}

      {/* ================= SVNS REPORT ================= */}

      {isSvns && (
        <section
          className={
            styles.section
          }
        >
          <h2>
            Match Report
          </h2>

          <div
            className={
              styles.reportCard
            }
          >
            <p
              className={
                styles.reportText
              }
            >
              {
                match.home.name
              }{" "}
              and{" "}
              {
                match.away.name
              }{" "}
              battled in a
              high-intensity HSBC
              SVNS World
              Championship clash
              during the
              Valladolid leg of
              the global series.
            </p>

            {match.score && (
              <p
                className={
                  styles.reportText
                }
              >
                The match
                finished{" "}
                <strong>
                  {
                    match.home
                      .name
                  }{" "}
                  {
                    match
                      .score
                      .home
                  }
                  {" - "}
                  {
                    match
                      .score
                      .away
                  }{" "}
                  {
                    match.away
                      .name
                  }
                </strong>
                .
              </p>
            )}

            <p
              className={
                styles.reportText
              }
            >
              With Bordeaux
              still to come,
              every result now
              carries massive
              implications in
              the race for the
              2026 HSBC SVNS
              World Championship
              title.
            </p>
          </div>
        </section>
      )}

      {/* ================= LINEUPS ================= */}

      {!isSvns && (
        <section
          className={styles.section}
        >
          <h2>Lineups</h2>

          <div
            className={
              styles.lineups
            }
          >
            {/* HOME */}

            <div>
              <h3>
                {
                  match.home
                    .name
                }{" "}
                — Starting XV
              </h3>

              {details?.lineups
                ?.homeStarting
                ?.length ? (
                details.lineups.homeStarting.map(
                  (
                    p: any
                  ) => (
                    <div
                      key={
                        p.number
                      }
                      className={
                        styles.player
                      }
                    >
                      {
                        p.number
                      }
                      . {p.name}
                    </div>
                  )
                )
              ) : (
                <p>
                  No starting
                  lineup data
                  yet.
                </p>
              )}
            </div>

            {/* AWAY */}

            <div>
              <h3>
                {
                  match.away
                    .name
                }{" "}
                — Starting XV
              </h3>

              {details?.lineups
                ?.awayStarting
                ?.length ? (
                details.lineups.awayStarting.map(
                  (
                    p: any
                  ) => (
                    <div
                      key={
                        p.number
                      }
                      className={
                        styles.player
                      }
                    >
                      {
                        p.number
                      }
                      . {p.name}
                    </div>
                  )
                )
              ) : (
                <p>
                  No starting
                  lineup data
                  yet.
                </p>
              )}
            </div>
          </div>

          {/* BENCH */}

          <div
            className={
              styles.benchSection
            }
          >
            <h3>The Bench</h3>

            <div
              className={
                styles.lineups
              }
            >
              <div>
                <strong>
                  {
                    match.home
                      .name
                  }
                </strong>

                {details?.lineups
                  ?.homeBench
                  ?.length ? (
                  details.lineups.homeBench.map(
                    (
                      p: any
                    ) => (
                      <div
                        key={
                          p.number
                        }
                        className={
                          styles.player
                        }
                      >
                        {
                          p.number
                        }
                        .{" "}
                        {p.name}
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No bench
                    data.
                  </p>
                )}
              </div>

              <div>
                <strong>
                  {
                    match.away
                      .name
                  }
                </strong>

                {details?.lineups
                  ?.awayBench
                  ?.length ? (
                  details.lineups.awayBench.map(
                    (
                      p: any
                    ) => (
                      <div
                        key={
                          p.number
                        }
                        className={
                          styles.player
                        }
                      >
                        {
                          p.number
                        }
                        .{" "}
                        {p.name}
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No bench
                    data.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= PERFORMANCE ================= */}

      {!isSvns && (
        <section
          className={styles.section}
        >
          <h2>
            Player
            Performances
          </h2>

          {details?.performances
            ?.length ? (
            details.performances.map(
              (
                perf: any,
                i: number
              ) => (
                <div
                  key={i}
                  className={
                    styles.performance
                  }
                >
                  <strong>
                    {
                      perf.category
                    }
                    :
                  </strong>{" "}
                  {
                    perf.player
                  }{" "}
                  —{" "}
                  {perf.value}
                </div>
              )
            )
          ) : (
            <p>
              No performance
              stats yet.
            </p>
          )}
        </section>
      )}

      {/* ================= COMMENTS ================= */}

      <section
        className={styles.section}
      >
        <h2>Fan Comments</h2>

        <div
          className={
            styles.commentInput
          }
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) =>
              setNewComment(
                e.target.value
              )
            }
            placeholder="Add your comment..."
            onKeyDown={(e) =>
              e.key ===
                "Enter" &&
              handlePostComment()
            }
          />

          <button
            onClick={
              handlePostComment
            }
          >
            Post Comment
          </button>
        </div>

        <div
          className={
            styles.commentsPanel
          }
        >
          {userComments.length >
          0 ? (
            userComments.map(
              (c) => (
                <div
                  key={c.id}
                  className={
                    styles.comment
                  }
                >
                  <strong>
                    {
                      c.author
                        .displayName
                    }
                  </strong>

                  <p>
                    {c.text}
                  </p>

                  <small>
                    {new Date(
                      c.createdAt
                    ).toLocaleDateString()}
                  </small>
                </div>
              )
            )
          ) : (
            <p>
              Be the first to
              comment!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}