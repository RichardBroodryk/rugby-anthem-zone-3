import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./TournamentPage.module.css";

import { tournaments2026 } from "../data/tournamentMeta";
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
import Flag from "../components/images/Flag";
import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

import defaultTournamentHero from "../assets/images/tournaments/default-tournament.jpg";

export default function TournamentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  /* ==================================================
     TRACK TOURNAMENT VISIT
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
     TOURNAMENT RESOLUTION
     ================================================== */

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

  const visual = tournament
    ? getTournamentVisual(tournament.conceptId)
    : null;

  const heroImage = tournament
    ? tournament.gender === "women"
      ? visual?.heroImageWomen ||
        visual?.heroImageMen ||
        visual?.logo ||
        defaultTournamentHero
      : visual?.heroImageMen ||
        visual?.heroImageWomen ||
        visual?.logo ||
        defaultTournamentHero
    : defaultTournamentHero;

  const hasStandings = !["svns"].includes(tournament?.conceptId || "");

  /* ==================================================
     LOAD TOURNAMENT MATCHES
     ================================================== */

  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!tournament) {
        if (mounted) {
          setMatches([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);

        const data = await getTournamentMatches({
          conceptId: tournament.conceptId,
          gender: tournament.gender,
          instanceId: tournament.instanceId,
          name: tournament.name,
        });

        if (mounted) {
          setMatches(data);
        }
      } catch (error) {
        console.error("Failed to load tournament matches", error);
        if (mounted) {
          setMatches([]);
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
    };
  }, [tournament]);

  if (!tournament) {
    return <div className={styles.page}>Tournament not found</div>;
  }

  /* ==================================================
     STANDINGS
     ================================================== */

  const standings: TeamStanding[] = hasStandings
    ? buildStandings(matches)
    : [];

  /* ==================================================
     GROUP MATCHES BY ROUND / STAGE
     ================================================== */

  const grouped = matches.reduce<Record<string, MatchData[]>>((acc, match) => {
    const key = match.round || match.stage || "All Matches";
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {});

  const rounds = Object.keys(grouped).sort((a: string, b: string) => {
    const roundA = Number(a.replace(/[^\d]/g, ""));
    const roundB = Number(b.replace(/[^\d]/g, ""));

    if (!Number.isNaN(roundA) && !Number.isNaN(roundB)) {
      return roundA - roundB;
    }

    return a.localeCompare(b);
  });

  /* ==================================================
     ANTHEM TEAMS
     ================================================== */

  const anthemTeams = Array.from(
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

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className={styles.heroContent}>
            <h1>
              {tournament.name} {tournament.year}
            </h1>
            {tournament.heroSubtitle && <p>{tournament.heroSubtitle}</p>}
          </div>
        </header>

        <div className={styles.backNav}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/tournaments")}
          >
            ← Back to Tournaments
          </button>
        </div>

        {/* ================= ANTHEMS ================= */}
        {anthemTeams.length > 0 && (
          <section className={styles.section}>
            <h2>Anthems</h2>
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

        {/* ================= STANDINGS ================= */}
        {hasStandings && standings.length > 0 && (
          <section className={styles.section}>
            <h2>Standings</h2>

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
                        {t.form.map((f, idx) => (
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
          </section>
        )}

        {/* ================= MATCHES ================= */}
        {loading && <div className={styles.section}>Loading matches...</div>}

        {!loading &&
          rounds.map((round) => (
            <section key={round} className={styles.section}>
              <h2>{round}</h2>

              <div className={styles.matches}>
                {grouped[round].map((match) => {
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
                })}
              </div>
            </section>
          ))}
      </main>
    </PageWrapper>
  );
}