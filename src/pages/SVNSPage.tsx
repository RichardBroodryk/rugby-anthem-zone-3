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
  const visual = getTournamentVisual("svns");

  if (!tournament) return <div>SVNS not found</div>;

 const menFinalStandings = [
  { rank: 1, team: "South Africa", points: 38 },
  { rank: 2, team: "Argentina", points: 34 },
  { rank: 3, team: "Australia", points: 30 },
  { rank: 4, team: "New Zealand", points: 28 },
  { rank: 5, team: "Spain", points: 24 },
];

const womenFinalStandings = [
  { rank: 1, team: "Australia", points: 38 },
  { rank: 2, team: "New Zealand", points: 36 },
  { rank: 3, team: "USA", points: 32 },
  { rank: 4, team: "France", points: 27 },
  { rank: 5, team: "Canada", points: 27 },
];

  return (
    <main className={styles.page}>
      {/* HERO (NOW CLEAN — IMAGE ONLY) */}
      <header
        className={styles.hero}
        style={{
          backgroundImage: `url(${
            visual.heroImageMen || visual.heroImageWomen
          })`,
        }}
      >
        <div className={styles.heroOverlay} />
      </header>

      {/* ✅ NEW TITLE BLOCK */}
      <div className={styles.titleBlock}>
        <h1 className={styles.mainTitle}>
          {tournament.name} {tournament.year}
        </h1>

        <p className={styles.heroSubtitle}>
          {tournament.heroSubtitle}
        </p>
      </div>

      <div className={styles.liveBanner}>
  🏆 Valladolid Complete — Bordeaux Grand Final Next
</div>

      {/* NAVIGATION */}
      <div className={styles.navContainer}>
        <div className={styles.navButtons}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate("/svns/matches")}
          >
            Matches
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => navigate("/svns/pools")}
          >
            Pools
          </button>
        </div>

        <button
  className={styles.secondaryButton}
  onClick={() =>
    navigate("/svns/knockouts")
  }
>
  Knockouts
</button>

        <button
          className={styles.backButton}
          onClick={() => navigate("/tournaments")}
        >
          ← Back to Tournaments
        </button>

        <p className={styles.subtitle}>
  Australia wins both Valladolid titles — Bordeaux now decides the world championship
</p>
      </div>

      {/* STANDINGS */}
      <section className={styles.section}>
        <h2>World Championship Standings After Valladolid</h2>

        <div className={styles.standingsGrid}>
          {/* MEN */}
          <div>
            <h3 className={styles.subHeader}>
  Men — Australia win Valladolid
</h3>
            <div className={styles.standingsPreview}>
              {menFinalStandings.map((row) => (
                <div key={row.rank} className={styles.previewRow}>
                  <span className={styles.rank}>{row.rank}</span>

                  <div className={styles.teamCell}>
                    <img
                      src={svnsFlags[row.team] || ""}
                      alt={row.team}
                      className={styles.flag}
                    />
                    <span>{row.team}</span>
                  </div>

                  <span className={styles.points}>
                    {row.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* WOMEN */}
          <div>
            <h3 className={styles.subHeader}>
  Women — Australia win Valladolid
</h3>
            <div className={styles.standingsPreview}>
              {womenFinalStandings.map((row) => (
                <div key={row.rank} className={styles.previewRow}>
                  <span className={styles.rank}>{row.rank}</span>

                  <div className={styles.teamCell}>
                    <img
                      src={svnsFlags[row.team] || ""}
                      alt={row.team}
                      className={styles.flag}
                    />
                    <span>{row.team}</span>
                  </div>

                  <span className={styles.points}>
                    {row.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}