import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TermsPage.module.css";
import { getToken } from "../services/auth";

type TermsState = {
  country?: string;
  accessFlow?: "checkout" | "read-only";
};

export default function TermsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as TermsState | null;
  const country = state?.country;

  const [loading, setLoading] = useState(false);

  const isReadOnly = state?.accessFlow === "read-only";

  useEffect(() => {
    if (!state) {
      navigate("/welcome", { replace: true });
    }
  }, [state, navigate]);

  const acceptTerms = async () => {
    const token = getToken();

    if (!token) {
      navigate("/login", {
        state: { redirectAfterLogin: "checkout" },
      });
      return;
    }

    try {
      setLoading(true);
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.backgroundGlowTop} />
      <div className={styles.backgroundGlowBottom} />

      <div className={styles.contentWrap}>
        <section className={styles.heroFrame}>
          <div className={styles.heroInner}>
            <div className={styles.heroImagePanel}>
              <div className={styles.heroImage} />
              <div className={styles.heroImageOverlay} />

              <div className={styles.heroText}>
                <span className={styles.kicker}>
                  RAZ TERMS • MEMBERSHIP ACCESS • INTERNATIONAL RUGBY
                </span>

                <h1>Terms &amp; Conditions</h1>

                <p className={styles.subtitle}>
                  Please review the terms of access to Rugby Anthem Zone before
                  continuing to membership checkout.
                  {country && (
                    <>
                      {" "}
                      You are accessing from <strong>{country}</strong>.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className={styles.termsCardWrap}>
              <section className={styles.termsCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardEyebrow}>
                    Membership Terms
                  </span>
                  <h2>Rugby Anthem Zone Access</h2>
                  <p className={styles.cardIntro}>
                    Rugby Anthem Zone is a paid membership product. Please
                    review the terms below before continuing.
                  </p>
                </div>

                <div className={styles.contentGrid}>
                  <section className={styles.block}>
                    <h3>Rugby Anthem Zone Access</h3>
                    <ul>
                      <li>
                        Rugby Anthem Zone is provided as a paid access product.
                      </li>
                      <li>
                        Access unlocks the Rugby Anthem Zone platform experience
                        and associated content areas.
                      </li>
                      <li>
                        Platform structure and feature availability may continue
                        to evolve as the service develops.
                      </li>
                      <li>
                        All payments are processed securely through our payment
                        provider.
                      </li>
                    </ul>
                  </section>

                  <section className={styles.block}>
                    <h3>Subscription Terms</h3>
                    <ul>
                      <li>
                        Access is billed on a recurring basis according to the
                        active billing setup.
                      </li>
                      <li>
                        You may cancel according to the subscription and billing
                        rules applicable at the time of purchase.
                      </li>
                      <li>
                        Where cancellation is available, access remains active
                        until the end of the paid billing period unless
                        otherwise stated.
                      </li>
                      <li>
                        No partial refunds are issued for unused time within a
                        billing period unless required by law or provider policy.
                      </li>
                      <li>
                        Pricing and billing presentation may vary by platform
                        and region.
                      </li>
                    </ul>
                  </section>
                </div>

                {!isReadOnly && (
                  <section className={styles.summaryBox}>
                    <div className={styles.summaryHeader}>
                      <span className={styles.summaryEyebrow}>
                        Access Summary
                      </span>
                      <h3>RAZ Premium</h3>
                    </div>

                    <p className={styles.summaryNote}>
                      Secure checkout • Access unlocks after successful payment
                    </p>

                    <p className={styles.currencyNote}>
                      {country === "South Africa"
                        ? "Approximate local pricing may be shown during checkout depending on payment provider settings."
                        : "Your local pricing and payment details may be presented at checkout depending on provider and region."}
                    </p>
                  </section>
                )}

                <div className={styles.footerActions}>
                  {!isReadOnly && (
                    <>
                      <button
                        className={styles.primaryButton}
                        onClick={acceptTerms}
                        disabled={loading}
                      >
                        {loading
                          ? "Continuing..."
                          : "Accept Terms & Continue"}
                      </button>

                      <p className={styles.notice}>
                        By continuing, you confirm that you understand and
                        accept the terms above.
                      </p>
                    </>
                  )}

                  <button
                    className={styles.secondaryButton}
                    onClick={() => navigate("/welcome")}
                  >
                    ← Return to Welcome
                  </button>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}