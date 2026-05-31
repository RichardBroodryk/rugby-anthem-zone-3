// src/pages/SVNSKnockoutsPage.tsx

import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./SVNSKnockoutsPage.module.css";

import { tournaments2026 } from "../data/tournamentMeta";

import { getTournamentVisual } from "../data/tournamentVisuals";

import { svnsFlags } from "../data/flags/svnsFlags";

/* ==================================================
   TYPES
   ================================================== */

type KnockoutMatch = {
  id: string;

  stage: string;

  home: string;

  away: string;

  homeScore?: number;

  awayScore?: number;

  winner?: string;

  status: "final" | "upcoming";
};

/* ==================================================
   TEAM ROW
   ================================================== */

function TeamRow({
  team,
  score,
  winner,
}: {
  team: string;

  score?: number;

  winner?: boolean;
}) {
  return (
    <div
      className={`${styles.teamRow} ${
        winner ? styles.winner : ""
      }`}
    >
      <div className={styles.teamLeft}>
        <img
          src={svnsFlags[team]}
          alt={team}
          className={styles.flag}
        />

        <span>{team}</span>
      </div>

      <div className={styles.score}>
        {score ?? "-"}
      </div>
    </div>
  );
}

/* ==================================================
   MATCH CARD
   ================================================== */

function MatchCard({
  match,
}: {
  match: KnockoutMatch;
}) {
  const homeWon =
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.homeScore >
      match.awayScore;

  const awayWon =
    match.homeScore !== undefined &&
    match.awayScore !== undefined &&
    match.awayScore >
      match.homeScore;

  return (
    <div className={styles.matchCard}>
      <div className={styles.matchTop}>
        <div className={styles.matchStage}>
          {match.stage}
        </div>

        <div
          className={`${styles.status} ${
            match.status === "final"
              ? styles.final
              : styles.upcoming
          }`}
        >
          {match.status === "final"
            ? "FINAL"
            : "UPCOMING"}
        </div>
      </div>

      <TeamRow
        team={match.home}
        score={match.homeScore}
        winner={homeWon}
      />

      <TeamRow
        team={match.away}
        score={match.awayScore}
        winner={awayWon}
      />
    </div>
  );
}

/* ==================================================
   SECTION
   ================================================== */

function Section({
  title,
  matches,
}: {
  title: string;

  matches: KnockoutMatch[];
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
   WOMEN DATA
   ================================================== */

const womenQuarterFinals: KnockoutMatch[] =
  [
    {
      id: "w-qf-1",

      stage: "Quarter-final 1",

      home: "USA",

      away: "Fiji",

      homeScore: 40,

      awayScore: 12,

      winner: "USA",

      status: "final",
    },

    {
      id: "w-qf-2",

      stage: "Quarter-final 2",

      home: "New Zealand",

      away: "Spain",

      homeScore: 33,

      awayScore: 7,

      winner: "New Zealand",

      status: "final",
    },

    {
      id: "w-qf-3",

      stage: "Quarter-final 3",

      home: "Australia",

      away: "France",

      homeScore: 21,

      awayScore: 5,

      winner: "Australia",

      status: "final",
    },

    {
      id: "w-qf-4",

      stage: "Quarter-final 4",

      home: "Canada",

      away: "Japan",

      homeScore: 40,

      awayScore: 5,

      winner: "Canada",

      status: "final",
    },
  ];

/* ==================================================
   WOMEN SEMIS
   ================================================== */

const womenSemiFinals: KnockoutMatch[] =
  [
    {
      id: "w-sf-1",

      stage: "Semi-final 1",

      home: "USA",

      away: "New Zealand",

      status: "upcoming",
    },

    {
      id: "w-sf-2",

      stage: "Semi-final 2",

      home: "Australia",

      away: "Canada",

      status: "upcoming",
    },
  ];

/* ==================================================
   MEN DATA
   ================================================== */

const menQuarterFinals: KnockoutMatch[] =
  [
    {
      id: "m-qf-1",

      stage: "Quarter-final 1",

      home: "South Africa",

      away: "Spain",

      homeScore: 14,

      awayScore: 12,

      winner: "South Africa",

      status: "final",
    },

    {
      id: "m-qf-2",

      stage: "Quarter-final 2",

      home: "New Zealand",

      away: "France",

      status: "upcoming",
    },

    {
      id: "m-qf-3",

      stage: "Quarter-final 3",

      home: "Australia",

      away: "Fiji",

      status: "upcoming",
    },

    {
      id: "m-qf-4",

      stage: "Quarter-final 4",

      home: "Argentina",

      away: "Great Britain",

      status: "upcoming",
    },
  ];

/* ==================================================
   MEN SEMIS
   ================================================== */

const menSemiFinals: KnockoutMatch[] =
  [
    {
      id: "m-sf-1",

      stage: "Semi-final 1",

      home: "South Africa",

      away: "Argentina",

      status: "upcoming",
    },
  ];

/* ==================================================
   PAGE
   ================================================== */

export default function SVNSKnockoutsPage() {
  const navigate = useNavigate();

  const tournament = useMemo(
    () =>
      tournaments2026.find(
        (t) =>
          t.conceptId === "svns"
      ),
    []
  );

  const visual =
    getTournamentVisual("svns");

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
            HSBC SVNS
          </div>

          <h1>
            Valladolid Knockouts
          </h1>

          <p>
            Day 2 completed —
            quarter-finals locked
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

      <Section
        title="Women — Quarter-finals"
        matches={
          womenQuarterFinals
        }
      />

      <Section
        title="Women — Semi-finals"
        matches={
          womenSemiFinals
        }
      />

      {/* MEN */}

      <Section
        title="Men — Quarter-finals"
        matches={
          menQuarterFinals
        }
      />

      <Section
        title="Men — Semi-finals"
        matches={menSemiFinals}
      />
    </main>
  );
}