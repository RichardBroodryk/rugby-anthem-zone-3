import { useNavigate } from "react-router-dom";
import styles from "./TMOReviewsPage.module.css";

import tmoHero from "../../../assets/images/referee/tmo-hero.jpg";

// 🔥 IMAGES
import techSetup from "../../../assets/images/referee/tech-setup.jpg";
import tmoSetup from "../../../assets/images/referee/tmo-setup.jpg";
import flowChart from "../../../assets/images/referee/tmo-review-flow-chart.jpg";
import tmoEngland from "../../../assets/images/referee/tmo-england.jpg";
import tmoNeeded from "../../../assets/images/referee/tmo-needed.jpg";
import tmoWorst from "../../../assets/images/referee/tmo-worst2.jpg";

export default function TMOReviewsPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${tmoHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>TMO &amp; Reviews</h1>
          <p>Technology, thresholds, and the limits of certainty.</p>
        </div>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backWrap}>
        <button onClick={() => navigate("/inside-the-game/referees")}>
          ← Back to Referee Hub
        </button>
      </div>

      {/* ================= WHAT IT IS ================= */}
      <section className={styles.section}>
        <h2>What the TMO Is — and Isn’t</h2>

        <div className={styles.imageWrap}>
          <img src={techSetup} alt="TMO technology setup" />
        </div>

        <p>
          The Television Match Official (TMO) is part of the refereeing team,
          providing video assistance to support decisions — not replace them.
        </p>
        <p>
          The referee remains the final decision-maker. The TMO’s role is to
          identify clear and obvious errors, not to re-referee every phase.
        </p>
      </section>

      {/* ================= TEAM OF 4 ================= */}
      <section className={styles.section}>
        <h2>The Team of 4</h2>

        <div className={styles.imageWrap}>
          <img src={tmoSetup} alt="TMO control setup" />
        </div>

        <p>
          Modern rugby uses a “Team of 4” — the referee, two assistant referees,
          and the TMO working together.
        </p>
        <p>
          Communication is constant. While the referee leads, the TMO monitors
          incidents in the background and can recommend reviews when necessary.
        </p>
      </section>

      {/* ================= WHAT CAN BE REVIEWED ================= */}
      <section className={styles.section}>
        <h2>What Can Be Reviewed</h2>
        <ul>
          <li>Grounding of the ball (tries)</li>
          <li>Touch or touch-in-goal decisions</li>
          <li>Foul play incidents</li>
          <li>Infringements leading to a try</li>
          <li>Kicks at goal</li>
        </ul>
      </section>

      {/* ================= FLOW ================= */}
      <section className={styles.section}>
        <h2>How a Review Works</h2>

        <div className={styles.imageWrap}>
          <img src={flowChart} alt="TMO review flow chart" />
        </div>

        <p>
          Reviews follow a structured process — either initiated by the referee
          or recommended by the TMO.
        </p>
        <p>
          The key principle is “clear and obvious.” If evidence is not definitive,
          the on-field decision usually stands.
        </p>
      </section>

      {/* ================= WHY IT TAKES TIME ================= */}
      <section className={styles.section}>
        <h2>Why Reviews Take Time</h2>

        <div className={styles.imageWrap}>
          <img src={tmoNeeded} alt="TMO decision moment" />
        </div>

        <p>
          Officials must assess multiple angles, frame-by-frame detail, and legal
          thresholds — not just what “looks right” at first glance.
        </p>
        <p>
          The balance is between accuracy and flow. Too fast risks mistakes. Too
          slow disrupts the game.
        </p>
      </section>

      {/* ================= REFEREE SNAPSHOTS ================= */}
      <section className={styles.section}>
        <h2>Referee Decision Snapshots</h2>

        <div className={styles.callBox}>
          <h3>Try Awarded</h3>
          <p>
            Clear grounding, no infringement in final phases.
          </p>
          <span className={styles.callOutcome}>Outcome: Try stands</span>
        </div>

        <div className={styles.callBox}>
          <h3>Try Disallowed</h3>
          <p>
            Knock-on or infringement identified in build-up.
          </p>
          <span className={styles.callOutcome}>Outcome: No try</span>
        </div>

        <div className={styles.callBox}>
          <h3>Foul Play Identified</h3>
          <p>
            Dangerous contact missed live, picked up by TMO.
          </p>
          <span className={styles.callOutcome}>Outcome: Penalty / Card</span>
        </div>
      </section>

      {/* ================= REAL MATCH CONTEXT ================= */}
      <section className={styles.section}>
        <h2>When the TMO Gets Involved</h2>

        <div className={styles.imageWrap}>
          <img src={tmoEngland} alt="TMO review in England match" />
        </div>

        <p>
          TMOs typically intervene during try-scoring situations, potential foul
          play, or moments that directly affect the outcome of the match.
        </p>
      </section>

      {/* ================= CONTROVERSY ================= */}
      <section className={styles.section}>
        <h2>When It Goes Wrong</h2>

        <div className={styles.imageWrap}>
          <img src={tmoWorst} alt="Controversial TMO decision" />
        </div>

        <p>
          Even with technology, interpretation remains human. Some decisions —
          especially marginal ones — continue to divide players, fans, and
          analysts.
        </p>
        <p>
          The biggest criticism is over-analysis: decisions decided by millimetres
          rather than clear, impactful errors.
        </p>
      </section>

      {/* ================= FINAL ================= */}
      <section className={styles.section}>
        <h2>The Balance</h2>
        <p>
          The TMO has made rugby fairer, but the challenge remains balance —
          getting big decisions right without losing the rhythm of the game.
        </p>
        <p>
          Modern protocols aim to keep the referee in control, using technology
          as support rather than dominance.
        </p>
      </section>
    </main>
  );
}