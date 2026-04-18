import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { matches2026 } from "../data/matches";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSMatchesPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

/* ================= HELPERS ================= */

function formatDay(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

/* Proper Day Mapping for SVNS (Thursday = Day 1, Friday = Day 2, Saturday = Day 3) */
function getDayLabel(dateStr: string, round?: string) {
  const date = new Date(dateStr);
  const dayOfMonth = date.getDate();

  if (dayOfMonth === 16) return "Day 1 — Pool Stage";
  if (dayOfMonth === 17) return "Day 2 — Pool Stage";
  if (dayOfMonth === 18) {
    if (round === "quarter-final") return "Day 3 — Quarter Finals";
    if (round === "semi-final") return "Day 3 — Semi Finals";
    if (round === "final") return "Finals Day";
    return "Day 3 — Knockouts";
  }

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
    const dayKey = formatDay(match.date); // used as group key
    if (!grouped[dayKey]) grouped[dayKey] = [];
    grouped[dayKey].push(match);
  });

  return grouped;
}

/* ================= PAGE ================= */

export default function SVNSMatchesPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find((t) => t.conceptId === "svns");
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
      {/* HERO - UNCHANGED */}
      <header
        className={`${styles.hero} ${styles.heroSVNSLayout}`}
        style={{
          backgroundImage: `url(${visual.heroImageMen || visual.heroImageWomen})`,
        }}
      >
        <div className={styles.heroContent}>
          <div>
            <h1>{tournament.name} Matches</h1>
            <p>{tournament.heroSubtitle}</p>
          </div>
        </div>
      </header>

      {/* BACK - UNCHANGED */}
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
              {getDayLabel(matches[0].date, matches[0].round)}
              <span className={styles.dateSub}>{day}</span>
            </h3>

            {matches.map((match) => {
              const status = getMatchStatus(match);
              const homeClean = match.home.name.replace(/ 7s/i, "");
              const awayClean = match.away.name.replace(/ 7s/i, "");

              return (
                <div
                  key={match.id}
                  className={styles.matchRow}
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  <div className={styles.team}>
                    <img 
                      src={svnsFlags[homeClean]} 
                      alt={match.home.name} 
                      className={styles.flag} 
                    />
                    <span>{match.home.name}</span>
                  </div>

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

                  <div className={styles.team} style={{ textAlign: "right" }}>
                    <span>{match.away.name}</span>
                    <img 
                      src={svnsFlags[awayClean]} 
                      alt={match.away.name} 
                      className={styles.flag} 
                    />
                  </div>
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
              {getDayLabel(matches[0].date, matches[0].round)}
              <span className={styles.dateSub}>{day}</span>
            </h3>

            {matches.map((match) => {
              const status = getMatchStatus(match);
              const homeClean = match.home.name.replace(/ 7s/i, "");
              const awayClean = match.away.name.replace(/ 7s/i, "");

              return (
                <div
                  key={match.id}
                  className={styles.matchRow}
                  onClick={() => navigate(`/match/${match.id}`)}
                >
                  <div className={styles.team}>
                    <img 
                      src={svnsFlags[homeClean]} 
                      alt={match.home.name} 
                      className={styles.flag} 
                    />
                    <span>{match.home.name}</span>
                  </div>

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

                  <div className={styles.team} style={{ textAlign: "right" }}>
                    <span>{match.away.name}</span>
                    <img 
                      src={svnsFlags[awayClean]} 
                      alt={match.away.name} 
                      className={styles.flag} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </section>
    </main>
  );
}