import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./SVNSKnockoutsPage.module.css";

import { svnsMatches2026 } from "../data/matches/matches2026Svns";

import { tournaments2026 } from "../data/tournamentMeta";

import { getTournamentVisual } from "../data/tournamentVisuals";

import { svnsFlags } from "../data/flags/svnsFlags";

import {
  getSvnsQualifiedTeams,
} from "../utils/svns/getSvnsQualifiedTeams";

import {
  buildSvnsQuarterFinals,
} from "../utils/svns/buildSvnsQuarterFinals";

import {
  buildSvnsSemiFinals,

  buildSvnsFinal,

  buildSvnsBronzeFinal,

  buildSvnsFifthPlaceFinal,

  buildSvnsSeventhPlaceFinal,
} from "../utils/svns/buildSvnsProgression";

/* ==================================================
   TEAM
   ================================================== */

function Team({
  name,
  qualified = false,
}: {
  name: string;

  qualified?: boolean;
}) {
  return (
    <div className={styles.team}>
      <img
        src={svnsFlags[name]}
        alt={name}
        className={styles.flag}
      />

      <span>{name}</span>

      {qualified && (
        <span
          className={
            styles.qualifiedBadge
          }
        >
          QF
        </span>
      )}
    </div>
  );
}

/* ==================================================
   MATCH CARD
   ================================================== */

function MatchCard({
  title,
  home,
  away,
}: {
  title: string;

  home: string;
  away: string;
}) {
  return (
    <div className={styles.matchCard}>
      <div className={styles.matchTitle}>
        {title}
      </div>

      <Team
        name={home}
        qualified
      />

      <div className={styles.vs}>
        VS
      </div>

      <Team
        name={away}
        qualified
      />
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

  matches: {
    id: string;

    home: {
      team: string;
    };

    away: {
      team: string;
    };
  }[];
}) {
  if (!matches.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div
        className={
          styles.sectionHeader
        }
      >
        <h2>{title}</h2>

        <div
          className={
            styles.projected
          }
        >
          PROJECTED
        </div>
      </div>

      <div className={styles.matchesGrid}>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            title={match.id}
            home={match.home.team}
            away={match.away.team}
          />
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   QUALIFIED PANEL
   ================================================== */

function QualifiedPanel({
  title,
  teams,
}: {
  title: string;

  teams: {
    team: string;
  }[];
}) {
  return (
    <section className={styles.section}>
      <div
        className={
          styles.sectionHeader
        }
      >
        <h2>{title}</h2>

        <div
          className={
            styles.liveBadge
          }
        >
          LIVE
        </div>
      </div>

      <div
        className={
          styles.qualifiedGrid
        }
      >
        {teams.map((team) => (
          <div
            key={team.team}
            className={
              styles.qualifiedCard
            }
          >
            <img
              src={
                svnsFlags[
                  team.team
                ]
              }
              alt={team.team}
              className={styles.flag}
            />

            <span>{team.team}</span>

            <div
              className={
                styles.qfBadge
              }
            >
              Qualified
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==================================================
   BUILD TOURNAMENT
   ================================================== */

function buildTournament(
  matches: typeof svnsMatches2026,
  gender: "men" | "women"
) {
  const qualified =
    getSvnsQualifiedTeams(
      matches,
      gender
    );

  const quarterFinals =
    buildSvnsQuarterFinals(
      qualified.quarterFinalists
    );

  const simulatedQF =
    quarterFinals.map((qf) => ({
      ...qf,

      score: {
        home: 1,
        away: 0,
      },
    }));

  const semiFinals =
    buildSvnsSemiFinals(
      simulatedQF
    );

  const simulatedSF =
    semiFinals.map((sf) => ({
      ...sf,

      score: {
        home: 1,
        away: 0,
      },
    }));

  return {
    qualified,

    quarterFinals,

    semiFinals,

    bronze: [
      buildSvnsBronzeFinal(
        simulatedSF
      ),
    ],

    fifth: [
      buildSvnsFifthPlaceFinal(
        simulatedQF
      ),
    ],

    seventh: [
      buildSvnsSeventhPlaceFinal(
        simulatedQF
      ),
    ],

    final: [
      buildSvnsFinal(
        simulatedSF
      ),
    ],
  };
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

  const valladolidMatches =
    useMemo(() => {
      return svnsMatches2026.filter(
        (m) =>
          m.stage === "valladolid"
      );
    }, []);

  const women =
    buildTournament(
      valladolidMatches,
      "women"
    );

  const men = buildTournament(
    valladolidMatches,
    "men"
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
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>
            Valladolid Knockouts
          </h1>

          <p>
            Live qualification race
            to the SVNS finals
          </p>
        </div>
      </header>

      {/* BACK */}

      <div className={styles.backNav}>
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

      <QualifiedPanel
        title="Women — Qualified Positions"
        teams={
          women.qualified
            .quarterFinalists
        }
      />

      <BracketSection
        title="Women — Quarter-finals"
        matches={women.quarterFinals}
      />

      <BracketSection
        title="Women — Semi-finals"
        matches={women.semiFinals}
      />

      <BracketSection
        title="Women — 7th Place"
        matches={women.seventh}
      />

      <BracketSection
        title="Women — 5th Place"
        matches={women.fifth}
      />

      <BracketSection
        title="Women — Bronze Final"
        matches={women.bronze}
      />

      <BracketSection
        title="Women — Final"
        matches={women.final}
      />

      {/* MEN */}

      <QualifiedPanel
        title="Men — Qualified Positions"
        teams={
          men.qualified
            .quarterFinalists
        }
      />

      <BracketSection
        title="Men — Quarter-finals"
        matches={men.quarterFinals}
      />

      <BracketSection
        title="Men — Semi-finals"
        matches={men.semiFinals}
      />

      <BracketSection
        title="Men — 7th Place"
        matches={men.seventh}
      />

      <BracketSection
        title="Men — 5th Place"
        matches={men.fifth}
      />

      <BracketSection
        title="Men — Bronze Final"
        matches={men.bronze}
      />

      <BracketSection
        title="Men — Final"
        matches={men.final}
      />
    </main>
  );
}