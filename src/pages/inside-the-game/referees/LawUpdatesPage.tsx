import { useNavigate } from "react-router-dom";
import styles from "./LawUpdatesPage.module.css";

import bookHero from "../../../assets/images/referee/book-hero.jpg";
import flowChart from "../../../assets/images/referee/tmo-review-flow-chart.jpg";

export default function LawUpdatesPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${bookHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Law Updates</h1>
          <p>How rugby evolved — and why the modern game looks the way it does.</p>
        </div>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backWrap}>
        <button onClick={() => navigate("/inside-the-game/referees")}>
          ← Back to Referee Hub
        </button>
      </div>

      {/* ================= WHY LAWS CHANGE ================= */}
      <section className={styles.section}>
        <h2>Why Laws Change</h2>
        <p>
          Rugby’s laws evolve to balance three competing priorities: player safety,
          game flow, and fairness. As players become bigger, faster, and more
          powerful, the laws must adapt to maintain control of the contest.
        </p>
        <p>
          Today, changes are driven by data — including injury trends, ball-in-play
          time, and how the game is experienced by fans globally.
        </p>
      </section>

      {/* ================= HISTORY ================= */}
      <section className={styles.section}>
        <h2>How the Laws Evolved</h2>

        <div className={styles.imageWrap}>
          <img src={flowChart} alt="Evolution and structure of rugby laws" />
        </div>

        <p>
          Rugby began with informal school rules in the 1800s — physical,
          chaotic, and often dangerous. Over time, governing bodies introduced
          structure, reducing violence and standardising the game globally.
        </p>

        <ul>
          <li><strong>1845</strong> — First written rules at Rugby School</li>
          <li><strong>1877</strong> — Reduced from 20 to 15 players</li>
          <li><strong>1995</strong> — Professional era begins</li>
          <li><strong>2009</strong> — Major global law trials reshape gameplay</li>
          <li><strong>2020s</strong> — Strong focus on player welfare and speed</li>
        </ul>

        <p>
          Modern rugby is the result of continuous refinement — moving from raw
          physical contest to a controlled, high-performance sport.
        </p>
      </section>

      {/* ================= CURRENT CHANGES ================= */}
      <section className={styles.section}>
        <h2>Key Changes (2025–2026)</h2>

        <p>
          Recent law updates focus on making the game faster, safer, and more
          continuous — without removing the contest.
        </p>

        <ul>
          <li>Conversions reduced from 90 to 60 seconds</li>
          <li>Lineouts must form within 30 seconds</li>
          <li>Scrum-half protected at the base of rucks</li>
          <li>No scrum option from free kicks</li>
          <li>Not straight lineouts now “play on”</li>
          <li>Ban on dangerous crocodile roll clearouts</li>
        </ul>
      </section>

      {/* ================= BEFORE VS AFTER ================= */}
      <section className={styles.section}>
        <h2>Before vs After — What Changed</h2>

        <div className={styles.callBox}>
          <h3>Breakdown Control</h3>
          <p>
            <strong>Before:</strong> Defenders could pressure the scrum-half freely,
            slowing the game.
            <br />
            <strong>Now:</strong> Players involved in the ruck cannot interfere with
            the 9 — leading to faster ball and attacking play.
          </p>
        </div>

        <div className={styles.callBox}>
          <h3>Game Speed</h3>
          <p>
            <strong>Before:</strong> Longer stoppages at conversions and set pieces.
            <br />
            <strong>Now:</strong> Shot clocks and time limits keep momentum high.
          </p>
        </div>

        <div className={styles.callBox}>
          <h3>Set Piece Flow</h3>
          <p>
            <strong>Before:</strong> Not straight lineouts often reset into scrums.
            <br />
            <strong>Now:</strong> Play continues — reducing dead time.
          </p>
        </div>

        <div className={styles.callBox}>
          <h3>Player Safety</h3>
          <p>
            <strong>Before:</strong> Dangerous clearouts and higher tackles more common.
            <br />
            <strong>Now:</strong> Clear bans and lower tackle focus reduce injury risk.
          </p>
        </div>
      </section>

      {/* ================= REFEREE IMPACT ================= */}
      <section className={styles.section}>
        <h2>What This Means for Referees</h2>
        <p>
          Referees must adapt quickly to evolving interpretations. Law changes
          don’t just alter rules — they change how games are managed in real time.
        </p>
        <p>
          Consistency is now a major focus, ensuring that matches are officiated
          the same way across competitions and continents.
        </p>
      </section>

      {/* ================= FAN PERCEPTION ================= */}
      <section className={styles.section}>
        <h2>Why Fans Feel the Game Has Changed</h2>
        <p>
          Modern rugby feels faster and more open because it is. Reduced stoppages,
          quicker restarts, and safer breakdowns create a more continuous flow.
        </p>
        <p>
          At the same time, small law tweaks — especially at the breakdown and in
          offside interpretation — can make decisions feel different or inconsistent.
        </p>
      </section>

      {/* ================= FUTURE ================= */}
      <section className={styles.section}>
        <h2>The Direction of the Game</h2>
        <p>
          Rugby has entered a period of stability. Rather than constant rule
          changes, the focus is now on consistency, player welfare, and improving
          the experience for fans.
        </p>
        <p>
          The goal is clear: a faster, safer, more watchable game that still
          preserves rugby’s core identity — contest, respect, and structure.
        </p>
      </section>
    </main>
  );
}