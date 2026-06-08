import { useNavigate } from "react-router-dom";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import styles from "./SVNSPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

export default function SVNSPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find(
    (t) => t.conceptId === "svns"
  );

  const visual =
    getTournamentVisual("svns");

  if (!tournament) {
    return <div>SVNS not found</div>;
  }

  const menFinalStandings = [
    {
      rank: 1,
      team: "South Africa",
      points: 38,
    },
    {
      rank: 2,
      team: "Argentina",
      points: 34,
    },
    {
      rank: 3,
      team: "Australia",
      points: 30,
    },
    {
      rank: 4,
      team: "New Zealand",
      points: 28,
    },
    {
      rank: 5,
      team: "Spain",
      points: 24,
    },
  ];

  const womenFinalStandings = [
    {
      rank: 1,
      team: "Australia",
      points: 38,
    },
    {
      rank: 2,
      team: "New Zealand",
      points: 36,
    },
    {
      rank: 3,
      team: "USA",
      points: 32,
    },
    {
      rank: 4,
      team: "France",
      points: 28,
    },
    {
      rank: 5,
      team: "Canada",
      points: 28,
    },
  ];

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
      </header>

      {/* TITLE */}

      <div className={styles.titleBlock}>
        <h1 className={styles.mainTitle}>
          {tournament.name}{" "}
          {tournament.year}
        </h1>

        <p className={styles.heroSubtitle}>
          {tournament.heroSubtitle}
        </p>
      </div>

      {/* CHAMPIONS BANNER */}

      <div className={styles.liveBanner}>
        🏆 2025/26 HSBC SVNS Complete —
        South Africa Men & Australia Women
        crowned World Champions
      </div>

      {/* NAV */}

      <div className={styles.navContainer}>
        <div className={styles.navButtons}>
          <button
            className={
              styles.primaryButton
            }
            onClick={() =>
              navigate("/svns/matches")
            }
          >
            Matches
          </button>

          <button
            className={
              styles.secondaryButton
            }
            onClick={() =>
              navigate("/svns/pools")
            }
          >
            Pools
          </button>

          <button
            className={
              styles.secondaryButton
            }
            onClick={() =>
              navigate("/svns/knockouts")
            }
          >
            Knockouts
          </button>
        </div>

        <button
          className={styles.backButton}
          onClick={() =>
            navigate("/tournaments")
          }
        >
          ← Back to Tournaments
        </button>

        <p className={styles.subtitle}>
          The 2025/26 HSBC SVNS season has
          concluded. South Africa secured
          the Men's World Championship,
          while Australia captured both
          the Bordeaux title and the
          Women's World Championship
          crown.
        </p>
      </div>

      {/* SEASON NEWS */}

      <section className={styles.section}>
        <h2>Season Finale</h2>

        <div
          className={
            styles.standingsGrid
          }
        >
          <div
            className={
              styles.standingsPreview
            }
          >
            <h3
              className={
                styles.subHeader
              }
            >
              🏆 South Africa Crowned
              Men's World Champions
            </h3>

            <p>
              The Blitzboks secured the
              2025/26 HSBC SVNS World
              Championship after a
              remarkable season that
              included victories in Hong
              Kong and New York together
              with consistent performances
              across the series. Although
              France won the Bordeaux
              tournament, South Africa
              finished the season as
              overall World Champions.
            </p>
          </div>

          <div
            className={
              styles.standingsPreview
            }
          >
            <h3
              className={
                styles.subHeader
              }
            >
              🇦🇺 Australia Complete
              Women's Double
            </h3>

            <p>
              Australia defeated New
              Zealand 26–19 in the
              Bordeaux Final to secure
              both the tournament title
              and the 2025/26 HSBC SVNS
              Women's World Championship.
              Canada finished third after
              defeating the USA in the
              bronze medal match.
            </p>
          </div>
        </div>
      </section>

      {/* STANDINGS */}

      <section className={styles.section}>
        <h2>
          Final HSBC SVNS World
          Championship Standings
        </h2>

        <div
          className={
            styles.standingsGrid
          }
        >
          {/* MEN */}

          <div>
            <h3
              className={
                styles.subHeader
              }
            >
              🏆 Men's World Champions
            </h3>

            <div
              className={
                styles.standingsPreview
              }
            >
              {menFinalStandings.map(
                (row) => (
                  <div
                    key={row.rank}
                    className={
                      styles.previewRow
                    }
                  >
                    <span
                      className={
                        styles.rank
                      }
                    >
                      {row.rank}
                    </span>

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

                    <span
                      className={
                        styles.points
                      }
                    >
                      {row.points} pts
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* WOMEN */}

          <div>
            <h3
              className={
                styles.subHeader
              }
            >
              🏆 Women's World Champions
            </h3>

            <div
              className={
                styles.standingsPreview
              }
            >
              {womenFinalStandings.map(
                (row) => (
                  <div
                    key={row.rank}
                    className={
                      styles.previewRow
                    }
                  >
                    <span
                      className={
                        styles.rank
                      }
                    >
                      {row.rank}
                    </span>

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

                    <span
                      className={
                        styles.points
                      }
                    >
                      {row.points} pts
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}