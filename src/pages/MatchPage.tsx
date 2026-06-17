import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./MatchPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import { flagMap } from "../data/flagMap";
import { getMatchDetails } from "../utils/matchDetailsResolver";

export default function MatchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [match, setMatch] = useState<any>(
    location.state || null
  );

  const [userComments, setUserComments] =
    useState<any[]>([]);

  const [newComment, setNewComment] =
    useState("");

  const tournamentSlug =
    match?.tournamentSlug || "";

  /* ==================================================
     SVNS EDITORIAL MODE
     ================================================== */

  const isSvns =
    match?.competitionId === "svns";

  /* ==================================================
     LOAD MATCH (STATE OR URL)
     ================================================== */

  useEffect(() => {
    if (match) return;

    async function loadMatch() {
      const allMatches =
        await getMatches();

      const found =
        allMatches.find(
          (m) =>
            String(m.id) === id
        );

      if (found) {
        setMatch(found);
      }
    }

    if (id) {
      loadMatch();
    }
  }, [id, match]);

  /* ==================================================
     TRACKING
     ================================================== */

  useEffect(() => {
    const key =
      "raz_last_match_view";

    if (
      sessionStorage.getItem(key)
    )
      return;

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
    !!match.score;

  /* ==================================================
     COMMENTS
     ================================================== */

  const handlePostComment =
    () => {
      if (
        newComment.trim() === ""
      )
        return;

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
              `/tournaments/${tournamentSlug}`
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