import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";

/**
 * WELCOME PAGE v4 — LOGIN INTENT WIRED
 * Freemium login = normal
 * Premium/Super login = checkout intent preserved
 */

export default function WelcomePage() {
  const navigate = useNavigate();

  // 🔒 Tier routing
  const goFreemium = () => navigate("/what-you-get/freemium");
  const goPremium = () => navigate("/what-you-get/premium");
  const goSuper = () => navigate("/what-you-get/super");

  // 🔐 Login routing (tier-aware)
  const goLoginFree = () => navigate("/login");

  const goLoginPremium = () =>
    navigate("/login", {
      state: { redirectAfterLogin: "checkout", tier: "premium" },
    });

  const goLoginSuper = () =>
    navigate("/login", {
      state: { redirectAfterLogin: "checkout", tier: "super" },
    });

  return (
    <section className={styles.page}>
      {/* HERO */}
      <header className={styles.header}>
        <h1>Welcome to Rugby Anthem Zone</h1>
        <p className={styles.subtitle}>
          A global home for international rugby — built for fans who want more
          than scores, and less noise than modern sports apps.
        </p>
      </header>

      {/* CHOICE */}
      <section className={styles.choices}>
        <h2 className={styles.sectionTitle}>
          Choose how deeply you want to experience the game
        </h2>

        <div className={styles.cards}>
          {/* FREEMIUM */}
          <div className={styles.card}>
            <h3>Freemium</h3>
            <p className={styles.tagline}>
              Explore Rugby Anthem Zone.
            </p>
            <p className={styles.description}>
              A permanent free way to engage with the platform and follow the
              game at a casual level.
            </p>

            <button
              className={styles.secondaryButton}
              onClick={goFreemium}
            >
              Explore Free
            </button>

            <button
              className={styles.loginButton}
              onClick={goLoginFree}
            >
              Login
            </button>
          </div>

          {/* PREMIUM */}
          <div className={styles.card}>
            <h3>Premium</h3>
            <p className={styles.tagline}>
              A better matchday experience.
            </p>
            <p className={styles.description}>
              Designed for regular rugby followers who want a cleaner,
              more focused way to experience matches and tournaments.
            </p>

            <button
              className={styles.primaryButton}
              onClick={goPremium}
            >
              View Premium Access
            </button>

            <button
              className={styles.loginButton}
              onClick={goLoginPremium}
            >
              Login
            </button>
          </div>

          {/* SUPER */}
          <div className={styles.card}>
            <h3>Super Premium</h3>
            <p className={styles.tagline}>
              Total focus, depth, and heritage.
            </p>
            <p className={styles.description}>
              For dedicated supporters who want the deepest, most
              distraction-free way to engage with rugby on the platform.
            </p>

            <button
              className={styles.secondaryButton}
              onClick={goSuper}
            >
              View Super Premium Access
            </button>

            <button
              className={styles.loginButton}
              onClick={goLoginSuper}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}