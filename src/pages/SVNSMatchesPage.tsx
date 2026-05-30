import { useNavigate } from "react-router-dom";

import { svnsMatches2026 } from "../data/matches/matches2026Svns";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSMatchesPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

import { useEffect, useState } from "react";
import { fetchSvnsMatches } from "../services/svnsService";

/* ==================================================
   FLAG HELPERS
   ================================================== */

const countryToDisplayName: Record<string, string> = {
  argentina: "Argentina",
  australia: "Australia",
  brazil: "Brazil",
  canada: "Canada",
  fiji: "Fiji",
  france: "France",
  germany: "Germany",
  "great-britain": "Great Britain",
  japan: "Japan",
  kenya: "Kenya",
  "new-zealand": "New Zealand",
  "south-africa": "South Africa",
  spain: "Spain",
  uruguay: "Uruguay",
  "united-states-of-america": "USA",
};

function getFlag(country: string) {
  const name = countryToDisplayName[country];
  return name ? svnsFlags[name] || "" : "";
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sortMatches(matches: MatchData[]) {
  return [...matches].sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );
}

/* ==================================================
   MATCH ROW
   ================================================== */

function MatchRow({
  match,
  navigate,
}: {
  match: MatchData;
  navigate: ReturnType<typeof useNavigate>;
}) {
  return (
    <div
      className={styles.matchRow}
      onClick={() =>
  navigate(`/match/${match.id}`, {
    state: match,
  })
}
    >
      {/* HOME */}
      <div className={styles.team}>
        {getFlag(match.home.country) ? (
          <img
            src={getFlag(match.home.country)}
            alt={match.home.name}
            className={styles.flag}
          />
        ) : (
          <div className={styles.flagPlaceholder} />
        )}

        <span>{match.home.name}</span>
      </div>

      {/* CENTER */}
      <div className={styles.center}>
        <div className={styles.label}>
          {match.pool
            ? `Pool ${match.pool}`
            : match.round}
        </div>

        <div className={styles.score}>
          {match.score
            ? `${match.score.home} - ${match.score.away}`
            : formatTime(match.date)}
        </div>
      </div>

      {/* AWAY */}
      <div className={styles.team}>
        <span>{match.away.name}</span>

        {getFlag(match.away.country) ? (
          <img
            src={getFlag(match.away.country)}
            alt={match.away.name}
            className={styles.flag}
          />
        ) : (
          <div className={styles.flagPlaceholder} />
        )}
      </div>
    </div>
  );
}

/* ==================================================
   PAGE
   ================================================== */

export default function SVNSMatchesPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns"
  );

  const visual = getTournamentVisual("svns");

 const [matches, setMatches] = useState<MatchData[]>([]);

useEffect(() => {
  async function loadMatches() {
    try {
      const apiMatches =
        await fetchSvnsMatches();

      if (apiMatches.length) {
        setMatches(apiMatches);
      } else {
        setMatches(svnsMatches2026);
      }
    } catch (err) {
      console.error(err);

      setMatches(svnsMatches2026);
    }
  }

  loadMatches();
}, []);

  /* ================= ACTIVE LEG ================= */

  const valladolid = matches.filter(
    (m) => m.stage === "valladolid"
  );

  const day1 = sortMatches(
    valladolid.filter(
      (m) =>
        new Date(m.date).getDate() === 29
    )
  );

  const day2 = sortMatches(
    valladolid.filter(
      (m) =>
        new Date(m.date).getDate() === 30
    )
  );

  const day3 = sortMatches(
    valladolid.filter(
      (m) =>
        new Date(m.date).getDate() === 31
    )
  );

  /* ================= ARCHIVE ================= */

  const hongKong = sortMatches(
    matches.filter(
      (m) => m.stage === "hong-kong"
    )
  );

  if (!tournament)
    return <div>SVNS not found</div>;

  return (
    <main>
      {/* HERO */}
      <header
        className={`${styles.hero} ${styles.heroSVNSLayout}`}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen ||
            visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <div>
            <h1>
              Valladolid — Live Tournament
            </h1>

            <p>
              HSBC SVNS World Championship
            </p>
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

      {/* SUBTITLE */}
      <div className={styles.subHeader}>
        Valladolid is LIVE — Hong Kong
        results archived below
      </div>

      {/* ==================================================
         DAY 1
         ================================================== */}

      <section className={styles.section}>
        <h2>Day 1 — Friday</h2>

        <h3 className={styles.genderHeader}>
          Women
        </h3>

        {day1
          .filter((m) => m.gender === "women")
          .map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              navigate={navigate}
            />
          ))}

        <h3 className={styles.genderHeader}>
          Men
        </h3>

        {day1
          .filter((m) => m.gender === "men")
          .map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              navigate={navigate}
            />
          ))}
      </section>

      {/* ==================================================
         DAY 2
         ================================================== */}

      <section className={styles.section}>
        <h2>Day 2 — Saturday</h2>

        <h3 className={styles.genderHeader}>
          Women
        </h3>

        {day2
          .filter((m) => m.gender === "women")
          .map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              navigate={navigate}
            />
          ))}

        <h3 className={styles.genderHeader}>
          Men
        </h3>

        {day2
          .filter((m) => m.gender === "men")
          .map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              navigate={navigate}
            />
          ))}
      </section>

      {/* ==================================================
         DAY 3
         ================================================== */}

      <section className={styles.section}>
        <h2>Day 3 — Finals</h2>

        <h3 className={styles.genderHeader}>
          Women
        </h3>

        {day3
          .filter((m) => m.gender === "women")
          .map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              navigate={navigate}
            />
          ))}

        <h3 className={styles.genderHeader}>
          Men
        </h3>

        {day3
          .filter((m) => m.gender === "men")
          .map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              navigate={navigate}
            />
          ))}
      </section>

      {/* ==================================================
         HONG KONG ARCHIVE
         ================================================== */}

      <section className={styles.section}>
        <h2>Hong Kong Archive</h2>

        {hongKong.map((match) => (
          <MatchRow
            key={match.id}
            match={match}
            navigate={navigate}
          />
        ))}
      </section>
    </main>
  );
}