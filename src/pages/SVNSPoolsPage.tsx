import { useNavigate } from "react-router-dom";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import { bordeauxPoolStandings } from "../data/svns/bordeaux/bordeauxPools";

import styles from "./SVNSPoolsPage.module.css";

import { svnsFlags } from "../data/flags/svnsFlags";

/* ==================================================
   TABLE
   ================================================== */

function PoolTable({
  title,
  table,
}: {
  title: string;

  table: {
    team: string;
    played: number;
    won: number;
    lost: number;
    points: number;
  }[];
}) {
  return (
    <div className={styles.poolCard}>
      <div className={styles.poolHeader}>
        <h3>{title}</h3>

        <div
          className={
            styles.liveBadge
          }
        >
          FINAL
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
                  ] || ""
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

  const womenPools =
    bordeauxPoolStandings.women;

  const menPools =
    bordeauxPoolStandings.men;

  if (!tournament) {
    return (
      <div>
        SVNS not found
      </div>
    );
  }

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
            HSBC SVNS FINALS
          </div>

          <h1>
            Bordeaux Pool
            Standings
          </h1>

          <p>
            Final pool standings
            from the HSBC SVNS
            World Championship
            Finals in Bordeaux,
            France.
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
            FINAL STANDINGS
          </div>
        </div>

        <div
          className={
            styles.poolsGrid
          }
        >
          <PoolTable
            title="Pool A"
            table={
              womenPools.A
            }
          />

          <PoolTable
            title="Pool B"
            table={
              womenPools.B
            }
          />

          <PoolTable
            title="Pool C"
            table={
              womenPools.C
            }
          />
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
            FINAL STANDINGS
          </div>
        </div>

        <div
          className={
            styles.poolsGrid
          }
        >
          <PoolTable
            title="Pool A"
            table={
              menPools.A
            }
          />

          <PoolTable
            title="Pool B"
            table={
              menPools.B
            }
          />

          <PoolTable
            title="Pool C"
            table={
              menPools.C
            }
          />
        </div>
      </section>
    </main>
  );
}