import { useNavigate } from "react-router-dom";
import styles from "./CoachesSupportHub.module.css";

import heroBg from "../../assets/images/raz/coaches-support.png";

export default function CoachesSupportHub() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Coaches & Support Staff</h1>
          <p>
            The leadership, strategy, and expertise behind international rugby
            success — across both the men’s and women’s game.
          </p>
        </div>
      </header>

      {/* BACK TO HERITAGE */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage")}
        >
          ← Back to Rugby Heritage
        </button>
      </div>

      {/* SECTION INTRO */}
      <section className={styles.sectionIntro}>
        <h2>Leadership Across the Game</h2>
        <p>
          From elite head coaches to specialist staff, modern rugby success is
          built on expertise across both the men’s and women’s international
          game.
        </p>
      </section>

      {/* HUB GRID */}
      <section className={styles.grid}>
        {/* HEAD COACHES — MEN */}
        <div
          className={`${styles.card} ${styles.head}`}
          onClick={() => navigate("/heritage/coaches/head-coaches-men")}
          role="button"
          tabIndex={0}
        >
          <h2>Head Coaches — Men’s Game</h2>
          <p>
            The principal architects of national teams, responsible for vision,
            leadership, and competitive direction in the men’s game.
          </p>
        </div>

        {/* HEAD COACHES — WOMEN */}
        <div
          className={`${styles.card} ${styles.head}`}
          onClick={() => navigate("/heritage/coaches/head-coaches-women")}
          role="button"
          tabIndex={0}
        >
          <h2>Head Coaches — Women’s Game</h2>
          <p>
            Leaders who have shaped the rise and professional evolution of the
            women’s international game.
          </p>
        </div>

        {/* ASSISTANT — MEN */}
        <div
          className={`${styles.card} ${styles.assistant}`}
          onClick={() => navigate("/heritage/coaches/assistant-coaches-men")}
          role="button"
          tabIndex={0}
        >
          <h2>Assistant Coaches — Men’s Game</h2>
          <p>
            Specialists in attack, defence, and set-piece execution driving
            performance at the highest level of the men’s game.
          </p>
        </div>

        {/* ASSISTANT — WOMEN */}
        <div
          className={`${styles.card} ${styles.assistant}`}
          onClick={() => navigate("/heritage/coaches/assistant-coaches-women")}
          role="button"
          tabIndex={0}
        >
          <h2>Assistant Coaches — Women’s Game</h2>
          <p>
            Technical specialists supporting elite performance in the women’s
            international arena.
          </p>
        </div>

        {/* SUPPORT — MEN */}
        <div
          className={`${styles.card} ${styles.support}`}
          onClick={() => navigate("/heritage/coaches/support-staff-men")}
          role="button"
          tabIndex={0}
        >
          <h2>Support Staff — Men’s Game</h2>
          <p>
            Medical teams, analysts, and performance staff underpinning success
            in the men’s international game.
          </p>
        </div>

        {/* SUPPORT — WOMEN */}
        <div
          className={`${styles.card} ${styles.support}`}
          onClick={() => navigate("/heritage/coaches/support-staff-women")}
          role="button"
          tabIndex={0}
        >
          <h2>Support Staff — Women’s Game</h2>
          <p>
            The specialists enabling preparation, recovery, and performance in
            the women’s international game.
          </p>
        </div>
      </section>
    </main>
  );
}