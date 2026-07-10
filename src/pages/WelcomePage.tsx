import { useNavigate } from "react-router-dom";
import styles from "./WelcomePage.module.css";

/**
 * WELCOME PAGE — POLISH PASS
 * One paid access flow only.
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
      <div className={styles.backgroundGlowTop} />
      <div className={styles.backgroundGlowBottom} />

      <div className={styles.content}>
        <section className={styles.heroFrame}>
          <div className={styles.heroInner}>
            <div className={styles.heroImagePanel}>
              <div className={styles.heroImage} />
              <div className={styles.heroImageOverlay} />

              <div className={styles.heroText}>
                <span className={styles.kicker}>
                  INTERNATIONAL RUGBY • MATCHDAY ATMOSPHERE • ANTHEMS
                </span>

                <h1>Welcome to Rugby Anthem Zone</h1>

                <p className={styles.subtitle}>
                  A global home for international rugby — built for supporters
                  who want more than scores, and less noise than modern sports
                  apps.
                </p>
              </div>
            </div>

            <div className={styles.cardWrap}>
              <section className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEyebrow}>Monthly Membership</span>
                  <h2>RAZ Access</h2>
                  <p className={styles.tagline}>
                    One monthly paid membership. Full Rugby Anthem Zone
                    experience.
                  </p>
                </div>

                <p className={styles.description}>
                  Access Rugby Anthem Zone through a monthly paid membership
                  built around matchdays, tournaments, rugby media, heritage,
                  and the broader international game experience.
                </p>

                <div className={styles.actions}>
                  <button className={styles.primaryButton} onClick={goAccess}>
                    View Access
                  </button>

                  <button className={styles.loginButton} onClick={goLogin}>
                    Login
                  </button>
                </div>
              </section>
            </div>

            <footer className={styles.termsFooter}>
              <p className={styles.termsText}>
                By continuing, you agree to our Terms &amp; Conditions.
              </p>

              <button className={styles.termsLink} onClick={goToTerms}>
                View Terms
              </button>
            </footer>
          </div>
        </section>
      </div>
    </section>
  );
}