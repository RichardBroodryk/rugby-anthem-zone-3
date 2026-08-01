import { Link } from "react-router-dom";
import styles from "./HeroCard.module.css";

/**
 * HERO CARD — WAVE 2
 * --------------------------------------------------
 * Single paid access hero.
 * Now features Pay per View and Live Audio as the main CTA pills
 * Men's and Women's rugby moved to InfoBar
 */

export default function HeroCard() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Rugby Anthem Zone</h1>

        <p className={styles.tagline}>
          Live the passion. Celebrate the anthems. Own the game.
        </p>

        <div className={styles.actions}>
          <Link to="/fanzone/ppv" className={styles.payperview}>
            Pay per View
          </Link>

          <Link to="/fanzone/audio" className={styles.liveaudio}>
            Live Audio
          </Link>
        </div>
      </div>
    </section>
  );
}