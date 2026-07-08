import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";

/**
 * WELCOME PAGE — WAVE 1
 * Single paid access flow only.
 * No freemium / premium / super branching.
 */

export default function WelcomePage() {
  const navigate = useNavigate();

  const goAccess = () => navigate("/what-you-get");

  const goLogin = () =>
    navigate("/login", {
      state: { redirectAfterLogin: "checkout" },
    });

  const goToTerms = () =>
    navigate("/terms", {
      state: { accessFlow: "read-only" },
    });

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Welcome to Rugby Anthem Zone</h1>
        <p className={styles.subtitle}>
          A global home for international rugby — built for supporters who want
          more than scores, and less noise than modern sports apps.
        </p>
      </header>

      <section className={styles.choices}>
        <h2 className={styles.sectionTitle}>Choose your Rugby Anthem Zone access</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>RAZ Access</h3>

            <p className={styles.tagline}>
              One paid membership. Full Rugby Anthem Zone experience.
            </p>

            <p className={styles.description}>
              Access Rugby Anthem Zone through a single paid membership built
              around matchdays, tournaments, rugby media, heritage, and the
              broader international game experience.
            </p>

            <button className={styles.primaryButton} onClick={goAccess}>
              View Access
            </button>

            <button className={styles.loginButton} onClick={goLogin}>
              Login
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.termsFooter}>
        <p className={styles.termsText}>
          By continuing, you agree to our Terms & Conditions.
        </p>
        <button
          className={styles.termsLink}
          onClick={goToTerms}
          style={{ color: "red", border: "1px solid red" }}
        >
          View Terms
        </button>
      </footer>
    </section>
  );
}