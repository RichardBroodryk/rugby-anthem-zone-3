import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { allSvnsMatches } from "../data/svns/allSvnsMatches";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPoolsPage.module.css";

import { svnsFlags } from "../data/flags/svnsFlags";

import {
  buildSvnsStandings,
} from "../utils/svns/buildSvnsStandings";

/* ==================================================
   TYPES
   ================================================== */

type PoolKey =
  | "A"
  | "B"
  | "C";

/* ==================================================
   GET POOL MATCHES
   ================================================== */

function getPools(
  matches: MatchData[],
  gender: "men" | "women"
) {
  return matches.filter(
    (m) =>
      m.gender === gender &&
      m.round === "pool" &&
      m.pool
  );
}

/* ==================================================
   TABLE
   ================================================== */

function PoolTable({
  title,
  matches,
}: {
  title: string;
  matches: MatchData[];
}) {
  const standings =
  buildSvnsStandings(matches);

const table =
  standings.length > 0
    ? standings
    : Array.from(
        new Set([
          ...matches.map(
            (m) => m.home.name
          ),
          ...matches.map(
            (m) => m.away.name
          ),
        ])
      ).map((team) => ({
        team,

        played: 0,

        won: 0,

        lost: 0,

        drawn: 0,

        pointsFor: 0,

        pointsAgainst: 0,

        pointsDiff: 0,

        points: 0,

        form: [],
      }));

  return (
    <div className={styles.poolCard}>
      <div className={styles.poolHeader}>
        <h3>{title}</h3>

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
          styles.tableHeader
        }
      >
        <span>#</span>
        <span>Team</span>
        <span>P</span>
        <span>W</span>
        <span>L</span>
        <span>PF</span>
        <span>PA</span>
        <span>PD</span>
        <span>Pts</span>
      </div>

      {table.map(
        (row, i) => (
          <div
            key={row.team}
            className={`${styles.tableRow} ${
              i < 2
                ? styles.qualifiedRow
                : ""
            }`}
          >
            <span>{i + 1}</span>

            <div
              className={
                styles.teamCell
              }
            >
              <img
                src={
                  svnsFlags[
                    row.team
                  ]
                }
                alt={row.team}
                className={
                  styles.flag
                }
              />

              <span>
                {row.team}
              </span>
            </div>

            <span>
              {row.played}
            </span>

            <span>
              {row.won}
            </span>

            <span>
              {row.lost}
            </span>

            <span>
              {row.pointsFor}
            </span>

            <span>
              {row.pointsAgainst}
            </span>

            <span>
              {row.pointsDiff}
            </span>

            <span
              className={
                styles.points
              }
            >
              {row.points}
            </span>
          </div>
        )
      )}
    </div>
  );
}

/* ==================================================
   PAGE
   ================================================== */

export default function SVNSPoolsPage() {
  const navigate =
    useNavigate();

  const tournament =
    tournaments2026.find(
      (t) =>
        t.conceptId ===
        "svns"
    );

  const visual =
    getTournamentVisual(
      "svns"
    );

  /* ==================================================
     BORDEAUX ACTIVE TOURNAMENT
     ================================================== */

  const bordeauxMatches =
    useMemo(() => {
      return allSvnsMatches.filter(
        (m) =>
          m.stage ===
          "bordeaux"
      );
    }, []);

  /* ==================================================
     WOMEN
     ================================================== */

  const womenMatches =
    getPools(
      bordeauxMatches,
      "women"
    );

  const womenPools = {
    A: womenMatches.filter(
      (m) =>
        m.pool === "A"
    ),

    B: womenMatches.filter(
      (m) =>
        m.pool === "B"
    ),

    C: womenMatches.filter(
      (m) =>
        m.pool === "C"
    ),
  };

  /* ==================================================
     MEN
     ================================================== */

  const menMatches =
    getPools(
      bordeauxMatches,
      "men"
    );

  const menPools = {
    A: menMatches.filter(
      (m) =>
        m.pool === "A"
    ),

    B: menMatches.filter(
      (m) =>
        m.pool === "B"
    ),

    C: menMatches.filter(
      (m) =>
        m.pool === "C"
    ),
  };

  /* ==================================================
     NOT FOUND
     ================================================== */

  if (!tournament) {
    return (
      <div>
        SVNS not found
      </div>
    );
  }

  /* ==================================================
     PAGE
     ================================================== */

  return (
    <main
      className={styles.page}
    >
      {/* HERO */}

      <header
        className={
          styles.hero
        }
        style={{
          backgroundImage: `url(${
            visual.heroImageMen ||
            visual.heroImageWomen
          })`,
        }}
      >
        <div
          className={
            styles.heroOverlay
          }
        />

        <div
          className={
            styles.heroContent
          }
        >
          <div
            className={
              styles.heroBadge
            }
          >
            HSBC SVNS
          </div>

          <h1>
            Bordeaux Pool
            Standings
          </h1>

          <p>
            Live pool standings
            from the HSBC SVNS
            World Championship
            Final in France
          </p>
        </div>
      </header>

      {/* BACK */}

      <div
        className={
          styles.backNav
        }
      >
        <button
          className={
            styles.backButton
          }
          onClick={() =>
            navigate("/svns")
          }
        >
          ← Back to SVNS
        </button>
      </div>

      {/* WOMEN */}

      <section
        className={
          styles.section
        }
      >
        <div
          className={
            styles.sectionHeader
          }
        >
          <h2>
            Women's Pools
          </h2>

          <div
            className={
              styles.sectionTag
            }
          >
            LIVE
          </div>
        </div>

        <div
          className={
            styles.poolsGrid
          }
        >
          {(
            [
              "A",
              "B",
              "C",
            ] as PoolKey[]
          ).map((poolKey) => (
            <PoolTable
              key={poolKey}
              title={`Pool ${poolKey}`}
              matches={
                womenPools[
                  poolKey
                ]
              }
            />
          ))}
        </div>
      </section>

      {/* MEN */}

      <section
        className={
          styles.section
        }
      >
        <div
          className={
            styles.sectionHeader
          }
        >
          <h2>
            Men's Pools
          </h2>

          <div
            className={
              styles.sectionTag
            }
          >
            LIVE
          </div>
        </div>

        <div
          className={
            styles.poolsGrid
          }
        >
          {(
            [
              "A",
              "B",
              "C",
            ] as PoolKey[]
          ).map((poolKey) => (
            <PoolTable
              key={poolKey}
              title={`Pool ${poolKey}`}
              matches={
                menPools[
                  poolKey
                ]
              }
            />
          ))}
        </div>
      </section>
    </main>
  );
}