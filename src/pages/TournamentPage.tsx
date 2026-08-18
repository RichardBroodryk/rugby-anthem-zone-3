import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TournamentPage.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
import { getCompetition } from "../contracts/competitionRegistry";
import { getTournamentVisual } from "../data/tournamentVisuals";
import {
  buildStandings,
  type TeamStanding,
} from "../utils/standings/standingsEngine";
import { flagMap } from "../data/flagMap";
import type { MatchData } from "../data/matches/types";

import MatchRow from "../components/match/MatchRow";
import { getStadiumByName } from "../utils/stadiumResolver";
import { getTournamentMatches } from "../data/matchesAdapter";
import { getStandings } from "../utils/standings/standingsService";
import Flag from "../components/images/Flag";
import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

import defaultTournamentHero from "../assets/images/tournaments/default-tournament.jpg";

/* ==================================================
   INTERFACES
   ================================================== */

interface ApiStanding {
  id: number | null;
  name: string;
  logo?: string;
  country?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
  position?: number;
  form?: string[];
  raw?: unknown;
}

/* ==================================================
   HELPER FUNCTION (Extracted outside component to avoid hooks!)
   ================================================== */

const renderMatch = (
  match: MatchData,
  navigate: ReturnType<typeof useNavigate>,
  slug?: string
) => {
  const stadium = getStadiumByName(match.venue);
  const stadiumSlug =
    stadium && stadium.slug && stadium.slug !== "unknown"
      ? stadium.slug
      : undefined;

  return (
    <MatchRow
      key={match.id}
      home={match.home}
      away={match.away}
      state={match.state || "upcoming"}
      score={match.score}
      metaLeft={new Date(match.date).toLocaleDateString("en-GB")}
      metaRight={stadiumSlug}
      onClick={() =>
        navigate(`/match/${match.id}`, {
          state: {
            ...match,
            tournamentSlug: slug,
          },
        })
      }
    />
  );
};

/* ==================================================
   PAGE
   ================================================== */

export default function TournamentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [apiStandings, setApiStandings] = useState<ApiStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingStandings, setLoadingStandings] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  /* ==================================================
     1. TRACK TOURNAMENT VISIT
     ================================================== */
  useEffect(() => {
    const key = "raz_last_tournament_view";

    if (sessionStorage.getItem(key)) return;

    const current =
      Number(localStorage.getItem("raz_tournaments_followed")) || 0;

    localStorage.setItem(
      "raz_tournaments_followed",
      String(current + 1)
    );

    sessionStorage.setItem(key, "true");
  }, []);

  /* ==================================================
     2. ALL useMemo HOOKS DECLARED BEFORE ANY RETURN
     ================================================== */

  // This is safe: Even if slug is undefined, it just returns undefined.
  const tournament = useMemo(
    () =>
      tournaments2026.find(
        (t) =>
          t.instanceId === slug ||
          t.conceptId === slug ||
          t.route?.endsWith(`/${slug}`)
      ),
    [slug]
  );

  const competition = useMemo(
    () =>
      tournament
        ? getCompetition(tournament.conceptId)
        : undefined,
    [tournament]
  );

  const visual = useMemo(
    () =>
      tournament
        ? getTournamentVisual(tournament.conceptId)
        : null,
    [tournament]
  );

  const heroImage = useMemo(
    () =>
      tournament
        ? tournament.gender === "women"
          ? visual?.heroImageWomen ||
            visual?.heroImageMen ||
            visual?.logo ||
            defaultTournamentHero
          : visual?.heroImageMen ||
            visual?.heroImageWomen ||
            visual?.logo ||
            defaultTournamentHero
        : defaultTournamentHero,
    [tournament, visual]
  );

  const hasStandings = useMemo(
    () => competition?.supportsStandings === true,
    [competition]
  );

  const standings: TeamStanding[] = useMemo(() => {
    if (!hasStandings) return [];

    if (apiStandings.length > 0) {
      return apiStandings.map((team: ApiStanding) => ({
        team: team.name,
        country: team.country,
        played: team.played,
        won: team.won,
        drawn: team.drawn,
        lost: team.lost,
        pointsFor: team.pointsFor,
        pointsAgainst: team.pointsAgainst,
        pointsDiff: team.pointsFor - team.pointsAgainst,
        points: team.points,
        form: team.form || [],
      }));
    }

    return buildStandings(matches);
  }, [apiStandings, matches, hasStandings]);

  const liveMatches = useMemo(() => {
    return matches.filter((m) => m.state === "live");
  }, [matches]);

  const recentResults = useMemo(() => {
    return matches
      .filter((m) => m.state === "final")
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 8);
  }, [matches]);

  const upcomingFixtures = useMemo(() => {
    return matches
      .filter((m) => m.state === "upcoming")
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      .slice(0, 8);
  }, [matches]);

  const grouped = useMemo(() => {
    return matches.reduce<Record<string, MatchData[]>>((acc, match) => {
      const key = match.round || match.stage || "All Matches";
      if (!acc[key]) acc[key] = [];
      acc[key].push(match);
      return acc;
    }, {});
  }, [matches]);

  const rounds = useMemo(() => {
    return Object.keys(grouped).sort((a: string, b: string) => {
      const roundA = Number(a.replace(/[^\d]/g, ""));
      const roundB = Number(b.replace(/[^\d]/g, ""));

      if (!Number.isNaN(roundA) && !Number.isNaN(roundB)) {
        return roundA - roundB;
      }

      return a.localeCompare(b);
    });
  }, [grouped]);

  const anthemTeams = useMemo(() => {
    return Array.from(
      new Map(
        matches.flatMap((m) => [
          [m.home.country, m.home],
          [m.away.country, m.away],
        ])
      ).values()
    ).filter(
      (team) =>
        team.country &&
        team.country !== "unknown" &&
        flagMap[team.country]
    );
  }, [matches]);

  /* ==================================================
     3. DATA FETCHING EFFECT
     ================================================== */

  useEffect(() => {
    let mounted = true;
    let interval: NodeJS.Timeout | undefined;

    async function load() {
      if (!tournament) {
        if (mounted) {
          setMatches([]);
          setApiStandings([]);
          setLoading(false);
          setLoadingStandings(false);
        }
        return;
      }

      try {
        setLoading(true);
        setLoadingStandings(true);

        const matchesData = await getTournamentMatches({
          conceptId: tournament.conceptId,
          gender: tournament.gender,
          instanceId: tournament.instanceId,
          name: tournament.name,
        });

        const standingsData = hasStandings
          ? await getStandings(
              tournament.conceptId,
              tournament.year || 2026
            ).catch(() => [])
          : [];

        if (mounted) {
          setMatches(matchesData);
          setApiStandings(standingsData);
          setLastUpdated(new Date().toLocaleTimeString());

          let refreshRate = 300000; // 5 min default

          if (tournament.status === "completed") {
            refreshRate = 0;
          } else if (matchesData.some((m: MatchData) => m.state === "live")) {
            refreshRate = 30000; // 30 sec
          } else {
            const now = Date.now();
            const upcomingSoon = matchesData.some((m: MatchData) => {
              if (m.state !== "upcoming") return false;
              const matchTime = new Date(m.date).getTime();
              const diff = matchTime - now;
              return diff > 0 && diff < 1000 * 60 * 60 * 6;
            });

            if (upcomingSoon) {
              refreshRate = 120000; // 2 min
            }
          }

          if (refreshRate > 0) {
            console.log("🏉 TOURNAMENT POLLING RATE:", refreshRate);
            if (interval) clearInterval(interval);
            interval = setInterval(() => {
              load();
            }, refreshRate);
          }
        }
      } catch (error) {
        console.error("Failed to load tournament data", error);
        if (mounted) {
          setMatches([]);
          setApiStandings([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
          setLoadingStandings(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [tournament, hasStandings]);

  /* ==================================================
     4. EARLY RETURN (SAFELY PLACED AT THE BOTTOM OF ALL HOOKS)
     ================================================== */

  if (!tournament) {
    return (
      <PageWrapper imageUrl={razLight}>
        <main className={styles.page}>
          <div className={styles.errorCard}>
            <h2>Tournament Unavailable</h2>
            <p>Sorry, we couldn't find the tournament you're looking for.</p>
            <button
              className={styles.errorButton}
              onClick={() => navigate("/tournaments")}
            >
              Return to Tournament Hub
            </button>
          </div>
        </main>
      </PageWrapper>
    );
  }

  /* ==================================================
     5. PAGE RENDER
     ================================================== */

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* HERO */}
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className={styles.heroContent}>
            <h1>
              {competition?.name ?? tournament.name} {tournament.year}
            </h1>
            <p>
              {tournament.heroSubtitle ??
                competition?.name}
            </p>
          </div>
        </header>

        {/* BACK NAV */}
        <div className={styles.backNav}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/tournaments")}
          >
            ← Back to Tournaments
          </button>
        </div>

        {/* STATUS & LAST UPDATED */}
        <section className={styles.section}>
          <div className={styles.statusBar}>
            <div className={styles.statusLeft}>
              <span className={styles.statusLabel}>Status</span>
              <span className={tournament?.status === "completed" ? styles.statusCompleted : styles.statusActive}>
                {tournament?.status === "completed" ? "COMPLETED" : "ACTIVE"}
              </span>
              {tournament?.status !== "completed" && tournament?.currentRound && (
                <span className={styles.statusRound}>Round {tournament.currentRound}</span>
              )}
              {tournament?.status === "completed" && tournament?.champion && (
                <span className={styles.statusChampion}>🏆 {tournament.champion}</span>
              )}
            </div>
            <div className={styles.statusRight}>
              <span className={styles.lastUpdated}>Updated {lastUpdated || "Loading..."}</span>
            </div>
          </div>
        </section>

        {/* ================= STANDINGS ================= */}
        {hasStandings && (
          <section className={styles.section}>
            <h2>
              {competition?.supportsStandings
                ? "Official Standings"
                : "Standings"}
            </h2>

            {loadingStandings ? (
              <div className={styles.loadingCard}>Loading Standings...</div>
            ) : standings.length === 0 ? (
              <div className={styles.emptyCard}>
                <p>Official standings are not yet available.</p>
                <p style={{ fontSize: "0.9rem", marginTop: "8px", opacity: 0.7 }}>
                  RAZ will calculate live standings automatically once results become available.
                </p>
              </div>
            ) : (
              <table className={styles.standingsTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>PD</th>
                    <th>Pts</th>
                    <th>Form</th>
                  </tr>
                </thead>

                <tbody>
                  {standings.map((t, i) => {
                    const countryKey =
                      t.country || t.team.toLowerCase().replace(/ w$/, "");
                    const flag = flagMap[countryKey];

                    return (
                      <tr key={t.team}>
                        <td>{i + 1}</td>
                        <td className={styles.teamCell}>
                          {flag && (
                            <img
                              src={flag}
                              alt=""
                              className={styles.flag}
                            />
                          )}
                          <span>{t.team}</span>
                        </td>
                        <td>{t.played}</td>
                        <td>{t.won}</td>
                        <td>{t.drawn}</td>
                        <td>{t.lost}</td>
                        <td>{t.pointsDiff}</td>
                        <td className={styles.points}>{t.points}</td>
                        <td className={styles.form}>
                          {t.form.map((f: string, idx: number) => (
                            <span
                              key={idx}
                              className={
                                f === "W"
                                  ? styles.win
                                  : f === "L"
                                  ? styles.loss
                                  : styles.draw
                              }
                            >
                              {f}
                            </span>
                          ))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* ================= LIVE MATCHES ================= */}
        {liveMatches.length > 0 && (
          <section className={styles.section}>
            <h2>🔴 Live Matches</h2>
            <div className={styles.matches}>
              {liveMatches.map((m) => renderMatch(m, navigate, slug))}
            </div>
          </section>
        )}

        {/* ================= RECENT RESULTS ================= */}
        {recentResults.length > 0 && (
          <section className={styles.section}>
            <h2>
              {competition?.name ?? tournament.name}
              {" "}Results
            </h2>
            <div className={styles.matches}>
              {recentResults.map((m) => renderMatch(m, navigate, slug))}
            </div>
          </section>
        )}

        {/* ================= UPCOMING FIXTURES ================= */}
        {upcomingFixtures.length > 0 && (
          <section className={styles.section}>
            <h2>
              {competition?.name ?? tournament.name}
              {" "}Fixtures
            </h2>
            <div className={styles.matches}>
              {upcomingFixtures.map((m) => renderMatch(m, navigate, slug))}
            </div>
          </section>
        )}

        {/* ================= ALL MATCHES BY ROUND ================= */}
        {loading ? (
          <div className={styles.section}>
            <div className={styles.loadingCard}>Loading matches...</div>
          </div>
        ) : (
          rounds.map((round) => (
            <section key={round} className={styles.section}>
              <h2>{round}</h2>

              <div className={styles.matches}>
                {grouped[round].map((m) => renderMatch(m, navigate, slug))}
              </div>
            </section>
          ))
        )}

        {/* ================= ANTHEMS (MOVED TO BOTTOM) ================= */}
        {anthemTeams.length > 0 && (
          <section className={styles.section}>
            <h2>
              {competition?.name ?? tournament.name}
              {" "}Anthems
            </h2>
            <p className={styles.anthemSubtext}>Click a flag to view the national anthem</p>

            <div className={styles.flagsGrid}>
              {anthemTeams.map((team) => (
                <div
                  key={team.country}
                  onClick={() => navigate(`/anthems/${team.country}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Flag country={team.country} size="medium" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </PageWrapper>
  );
}