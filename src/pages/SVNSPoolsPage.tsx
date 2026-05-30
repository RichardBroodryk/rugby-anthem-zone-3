import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { svnsMatches2026 } from "../data/matches/matches2026Svns";
import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPoolsPage.module.css";

import { svnsFlags } from "../data/flags/svnsFlags";

import {
  buildSvnsStandings,
} from "../utils/svns/buildSvnsStandings";

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
   PAGE
   ================================================== */

export default function SVNSPoolsPage() {
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

  const womenMatches = getPools(
    valladolidMatches,
    "women"
  );

  const menMatches = getPools(
    valladolidMatches,
    "men"
  );

  const womensPools = {
    A: womenMatches.filter(
      (m) => m.pool === "A"
    ),

    B: womenMatches.filter(
      (m) => m.pool === "B"
    ),

    C: womenMatches.filter(
      (m) => m.pool === "C"
    ),
  };

  const mensPools = {
    A: menMatches.filter(
      (m) => m.pool === "A"
    ),

    B: menMatches.filter(
      (m) => m.pool === "B"
    ),

    C: menMatches.filter(
      (m) => m.pool === "C"
    ),
  };

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
            visual.heroImageMen ||
            visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.heroContent}>
          <div>
            <h1>
              Valladolid Pool Standings
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
          onClick={() =>
            navigate("/svns")
          }
        >
          ← Back to SVNS
        </button>
      </div>

      {/* WOMEN */}

      <section className={styles.section}>
        <h2>Women</h2>

        <div className={styles.poolsGrid}>
          {(
            ["A", "B", "C"] as const
          ).map((poolKey) => {
            const table =
              buildSvnsStandings(
                womensPools[poolKey]
              );

            return (
              <div
                key={poolKey}
                className={
                  styles.poolCard
                }
              >
                <h3>
                  Pool {poolKey}
                </h3>

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
                      className={
                        styles.tableRow
                      }
                    >
                      <span>
                        {i + 1}
                      </span>

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",

                          gap: "8px",
                        }}
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
                        {row.pf}
                      </span>

                      <span>
                        {row.pa}
                      </span>

                      <span>
                        {row.pd}
                      </span>

                      <span>
                        {row.points}
                      </span>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MEN */}

      <section className={styles.section}>
        <h2>Men</h2>

        <div className={styles.poolsGrid}>
          {(
            ["A", "B", "C"] as const
          ).map((poolKey) => {
            const table =
              buildSvnsStandings(
                mensPools[poolKey]
              );

            return (
              <div
                key={poolKey}
                className={
                  styles.poolCard
                }
              >
                <h3>
                  Pool {poolKey}
                </h3>

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
                      className={
                        styles.tableRow
                      }
                    >
                      <span>
                        {i + 1}
                      </span>

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",

                          gap: "8px",
                        }}
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
                        {row.pf}
                      </span>

                      <span>
                        {row.pa}
                      </span>

                      <span>
                        {row.pd}
                      </span>

                      <span>
                        {row.points}
                      </span>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}