import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./SVNSKnockoutsPage.module.css";

import { svnsMatches2026 } from "../data/matches/matches2026Svns";

import { tournaments2026 } from "../data/tournamentMeta";

import { getTournamentVisual } from "../data/tournamentVisuals";

import { svnsFlags } from "../data/flags/svnsFlags";

/* ==================================================
   MATCH CARD
   ================================================== */

function MatchCard({
  match,
}: {
  match: any;
}) {
  const homeWon =
    match.score?.home >
    match.score?.away;

  const awayWon =
    match.score?.away >
    match.score?.home;

  return (
    <div className={styles.matchCard}>
      <div className={styles.matchTop}>
        <div className={styles.matchStage}>
          {match.round}
        </div>

        <div
          className={`${styles.status} ${styles.final}`}
        >
          FINAL
        </div>
      </div>

      {/* HOME */}

      <div
        className={`${styles.teamRow} ${
          homeWon ? styles.winner : ""
        }`}
      >
        <div className={styles.teamLeft}>
          <img
            src={
              svnsFlags[
                match.home.name
              ]
            }
            alt={match.home.name}
            className={styles.flag}
          />

          <span>
            {match.home.name}
          </span>
        </div>

        <div className={styles.score}>
          {match.score.home}
        </div>
      </div>

      {/* AWAY */}

      <div
        className={`${styles.teamRow} ${
          awayWon ? styles.winner : ""
        }`}
      >
        <div className={styles.teamLeft}>
          <img
            src={
              svnsFlags[
                match.away.name
              ]
            }
            alt={match.away.name}
            className={styles.flag}
          />

          <span>
            {match.away.name}
          </span>
        </div>

        <div className={styles.score}>
          {match.score.away}
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   SECTION
   ================================================== */

function BracketSection({
  title,
  matches,
}: {
  title: string;

  matches: any[];
}) {
  if (!matches.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{title}</h2>
      </div>

      <div className={styles.grid}>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
          />
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   PAGE
   ================================================== */

export default function SVNSKnockoutsPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns"
  );

  const visual =
    getTournamentVisual("svns");

  /* ==================================================
     VALLADOLID MATCHES
     ================================================== */

  const valladolidMatches =
    useMemo(() => {
      return svnsMatches2026.filter(
        (m) =>
          m.stage === "valladolid"
      );
    }, []);

  /* ==================================================
     WOMEN
     ================================================== */

  const womenQuarterFinals =
    valladolidMatches.filter(
      (m) =>
        m.gender === "women" &&
        m.round === "quarter-final"
    );

  const womenSemiFinals =
    valladolidMatches.filter(
      (m) =>
        m.gender === "women" &&
        m.round === "semi-final"
    );

  const womenBronze =
    valladolidMatches.filter(
      (m) =>
        m.gender === "women" &&
        m.round === "bronze-final"
    );

  const womenFinal =
  valladolidMatches.filter(
    (m) =>
      m.gender === "women" &&
      m.round === "final" &&
      m.stage === "valladolid"
  );

  /* ==================================================
     MEN
     ================================================== */

  const menQuarterFinals =
    valladolidMatches.filter(
      (m) =>
        m.gender === "men" &&
        m.round === "quarter-final"
    );

  const menSemiFinals =
    valladolidMatches.filter(
      (m) =>
        m.gender === "men" &&
        m.round === "semi-final"
    );

  const menFifth =
    valladolidMatches.filter(
      (m) =>
        m.gender === "men" &&
        m.round ===
          "5th-place-final"
    );

 const menFinal =
  valladolidMatches.filter(
    (m) =>
      m.gender === "men" &&
      m.round === "final" &&
      m.stage === "valladolid"
  );

  if (!tournament) {
    return (
      <div>SVNS not found</div>
    );
  }

  return (
    <main className={styles.page}>
      {/* HERO */}

      <header
        className={styles.hero}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen ||
            visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            VALLADOLID COMPLETE
          </div>

          <h1>
            SVNS Knockout Finals
          </h1>

          <p>
            Australia sweeps both
            titles in Valladolid as
            the HSBC SVNS World
            Championship heads to
            Bordeaux.
          </p>
        </div>
      </header>

      {/* BACK */}

      <div className={styles.backWrap}>
        <button
          className={styles.backButton}
          onClick={() =>
            navigate("/svns")
          }
        >
          ← Back to SVNS
        </button>
      </div>

      {/* WOMEN */}

      <BracketSection
        title="Women — Quarter-finals"
        matches={
          womenQuarterFinals
        }
      />

      <BracketSection
        title="Women — Semi-finals"
        matches={womenSemiFinals}
      />

      <BracketSection
        title="Women — Bronze Final"
        matches={womenBronze}
      />

      <BracketSection
        title="Women — Final"
        matches={womenFinal}
      />

      {/* MEN */}

      <BracketSection
        title="Men — Quarter-finals"
        matches={
          menQuarterFinals
        }
      />

      <BracketSection
        title="Men — Semi-finals"
        matches={menSemiFinals}
      />

      <BracketSection
        title="Men — 5th Place Final"
        matches={menFifth}
      />

      <BracketSection
        title="Men — Final"
        matches={menFinal}
      />
    </main>
  );
}