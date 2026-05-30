import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getMatches,
} from "../../data/matchesAdapter";

import {
  buildStandings,
} from "../../utils/standings/standingsEngine";

import type {
  MatchData,
} from "../../data/matches/types";

export default function LeagueTableDebugPage() {
  const { leagueId } =
    useParams<{
      leagueId: string;
    }>();

  const [matches, setMatches] =
    useState<MatchData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState<string>("");

  const [id, gender] = (
    leagueId || ""
  ).split("-");

  /* ==================================================
     LOAD
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

        console.log(
          "🔥 DEBUG MATCHES:",
          data
        );

        setMatches(data);

        setLastUpdated(
          new Date().toLocaleTimeString()
        );
      } catch (err) {
        console.error(
          "DEBUG LOAD FAILED",
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
       AUTO REFRESH
       ========================================== */

    const interval =
      setInterval(() => {
        load();
      }, 60000);

    return () => {
      mounted = false;

      clearInterval(interval);
    };
  }, [id, gender]);

  /* ==================================================
     FILTERS
     ================================================== */

  const finalMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.state === "final"
      );
    }, [matches]);

  const liveMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.state === "live"
      );
    }, [matches]);

  const upcomingMatches =
    useMemo(() => {
      return matches.filter(
        (m) =>
          m.state === "upcoming"
      );
    }, [matches]);

  /* ==================================================
     STANDINGS
     ================================================== */

  const standings =
    useMemo(() => {
      return buildStandings(
        finalMatches
      );
    }, [finalMatches]);

  /* ==================================================
     RENDER
     ================================================== */

  return (
    <div
      style={{
        padding: 24,

        background: "#0b1020",

        color: "white",

        minHeight: "100vh",

        fontFamily:
          "system-ui",
      }}
    >
      <h1>
        🏉 LIVE LEAGUE DEBUG
      </h1>

      <h2>
        {leagueId}
      </h2>

      <div
        style={{
          marginBottom: 20,
        }}
      >
        <strong>
          Last Updated:
        </strong>{" "}
        {lastUpdated}
      </div>

      {loading && (
        <div>
          Loading live data...
        </div>
      )}

      {/* ==========================================
         HEALTH
         ========================================== */}

      <section
        style={{
          marginBottom: 40,
        }}
      >
        <h2>
          SYSTEM HEALTH
        </h2>

        <div>
          Total Matches:{" "}
          {matches.length}
        </div>

        <div>
          Final Matches:{" "}
          {
            finalMatches.length
          }
        </div>

        <div>
          Live Matches:{" "}
          {
            liveMatches.length
          }
        </div>

        <div>
          Upcoming Matches:{" "}
          {
            upcomingMatches.length
          }
        </div>

        <div>
          Computed Teams:{" "}
          {
            standings.length
          }
        </div>
      </section>

      {/* ==========================================
         LIVE MATCHES
         ========================================== */}

      <section
        style={{
          marginBottom: 40,
        }}
      >
        <h2>
          🔴 LIVE MATCHES
        </h2>

        {liveMatches.length ===
        0 ? (
          <div>
            No live matches
          </div>
        ) : (
          <div>
            {liveMatches.map(
              (match) => (
                <div
                  key={
                    match.matchKey
                  }
                  style={{
                    padding: 12,

                    marginBottom: 12,

                    background:
                      "#1f2937",

                    borderRadius: 10,
                  }}
                >
                  <div>
                    {
                      match.home
                        .name
                    }{" "}
                    vs{" "}
                    {
                      match.away
                        .name
                    }
                  </div>

                  <div>
                    {match.score
                      ? `${match.score.home} - ${match.score.away}`
                      : "No Score"}
                  </div>

                  <div>
                    {
                      match.date
                    }
                  </div>

                  <div>
                    State:{" "}
                    {
                      match.state
                    }
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>

      {/* ==========================================
         STANDINGS
         ========================================== */}

      <section
        style={{
          marginBottom: 40,
        }}
      >
        <h2>
          📊 COMPUTED STANDINGS
        </h2>

        {standings.length ===
        0 ? (
          <div>
            No standings
            computed
          </div>
        ) : (
          <table
            style={{
              width: "100%",

              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>PD</th>
                <th>Pts</th>
              </tr>
            </thead>

            <tbody>
              {standings.map(
                (
                  team,
                  index
                ) => (
                  <tr
                    key={
                      team.team
                    }
                  >
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {
                        team.team
                      }
                    </td>

                    <td>
                      {
                        team.played
                      }
                    </td>

                    <td>
                      {
                        team.won
                      }
                    </td>

                    <td>
                      {
                        team.lost
                      }
                    </td>

                    <td>
                      {
                        team.pointsDiff
                      }
                    </td>

                    <td>
                      {
                        team.points
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* ==========================================
         RAW MATCH SAMPLE
         ========================================== */}

      <section>
        <h2>
          🧪 RAW MATCH SAMPLE
        </h2>

        <pre
          style={{
            background:
              "#111827",

            padding: 20,

            overflow:
              "auto",

            borderRadius: 12,

            maxHeight: 500,
          }}
        >
          {JSON.stringify(
            matches.slice(
              0,
              5
            ),
            null,
            2
          )}
        </pre>
      </section>
    </div>
  );
}