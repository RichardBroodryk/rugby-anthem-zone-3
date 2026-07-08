import { Link } from "react-router-dom";
import styles from "./HeroCard.module.css";

/**
 * HERO CARD — WAVE 2
 * --------------------------------------------------
 * Single paid access hero.
 * No premium/super branching.
 * Heritage is now part of the live paid app.
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
          <Link to="/tournaments/men" className={styles.mens}>
            Men’s Rugby
          </Link>

          <Link to="/tournaments/women" className={styles.womens}>
            Women’s Rugby
          </Link>

          <Link to="/anthems" className={styles.anthems}>
            Anthems
          </Link>

          <Link to="/heritage" className={styles.heritage}>
            Heritage
          </Link>
        </div>
      </div>
    </section>
  );
}