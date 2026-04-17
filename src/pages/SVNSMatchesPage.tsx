import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { matches2026 } from "../data/matches";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSMatchesPage.module.css";

/* ================= HELPERS ================= */

function formatDay(date: string) {
  const d = new Date(date);

  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function getDayLabel(matches: MatchData[]) {
  if (!matches.length) return "";

  const round = matches[0].round;

  if (round === "pool") return "Day 1 — Pool Stage";
  if (round === "quarter-final") return "Day 2 — Quarter Finals";
  if (round === "semi-final") return "Day 3 — Semi Finals";
  if (round === "final") return "Finals Day";

  return "Match Day";
}

function getMatchStatus(match: MatchData) {
  const now = new Date().getTime();
  const matchTime = new Date(match.date).getTime();

  const diff = matchTime - now;

  if (diff < 0 && diff > -30 * 60 * 1000) return "LIVE";
  if (diff <= -30 * 60 * 1000) return "FT";

  return "UPCOMING";
}

function groupMatchesByDay(matches: MatchData[]) {
  const grouped: Record<string, MatchData[]> = {};

  matches.forEach((match) => {
    const day = formatDay(match.date);

    if (!grouped[day]) {
      grouped[day] = [];
    }

    grouped[day].push(match);
  });

  return grouped;
}

/* ================= PAGE ================= */

export default function SVNSMatchesPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns"
  );

  const visual = getTournamentVisual("svns");

  const svnsMatches = useMemo(() => {
    return matches2026.filter((m) => m.competitionId === "svns");
  }, []);

  const womensMatches = svnsMatches.filter((m) => m.gender === "women");
  const mensMatches = svnsMatches.filter((m) => m.gender === "men");

  const womensByDay = groupMatchesByDay(womensMatches);
  const mensByDay = groupMatchesByDay(mensMatches);

  if (!tournament) {
    return <div>SVNS not found</div>;
  }

  return (
    <main>
      {/* HERO */}
      <header
        className={`${styles.hero} ${styles.heroSVNSLayout}`}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen || visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <div>
            <h1>{tournament.name} Matches</h1>
            <p>{tournament.heroSubtitle}</p>
          </div>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backNav}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/svns")}
        >
          ← Back to SVNS
        </button>
      </div>

      {/* ================= WOMEN ================= */}
      <section className={styles.section}>
        <h2>Women</h2>

        {Object.entries(womensByDay).map(([day, matches]) => (
          <div key={day} className={styles.dayBlock}>
            <h3>
              {getDayLabel(matches)}
              <span className={styles.dateSub}>{day}</span>
            </h3>

            {matches.map((match) => {
              const status = getMatchStatus(match);

              return (
                <div
                  key={match.id}
                  className={styles.matchRow}
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  <span className={styles.team}>{match.home.name}</span>

                  <span className={styles.timeBlock}>
                    <span
                      className={`${styles.status} ${
                        status === "LIVE"
                          ? styles.live
                          : status === "FT"
                          ? styles.finished
                          : styles.upcoming
                      }`}
                    >
                      {status}
                    </span>

                    <span className={styles.time}>
                      {new Date(match.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>

                  <span className={styles.team}>{match.away.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </section>

      {/* ================= MEN ================= */}
      <section className={styles.section}>
        <h2>Men</h2>

        {Object.entries(mensByDay).map(([day, matches]) => (
          <div key={day} className={styles.dayBlock}>
            <h3>
              {getDayLabel(matches)}
              <span className={styles.dateSub}>{day}</span>
            </h3>

            {matches.map((match) => {
              const status = getMatchStatus(match);

              return (
                <div
                  key={match.id}
                  className={styles.matchRow}
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  <span className={styles.team}>{match.home.name}</span>

                  <span className={styles.timeBlock}>
                    <span
                      className={`${styles.status} ${
                        status === "LIVE"
                          ? styles.live
                          : status === "FT"
                          ? styles.finished
                          : styles.upcoming
                      }`}
                    >
                      {status}
                    </span>

                    <span className={styles.time}>
                      {new Date(match.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>

                  <span className={styles.team}>{match.away.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </section>
    </main>
  );
}