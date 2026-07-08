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
    // Allow both:
    // 1) read-only terms from Welcome
    // 2) checkout terms after signup/login
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
      <header className={styles.header}>
        <h1>Terms & Conditions</h1>

        <p className={styles.context}>
          Please review the terms of access to Rugby Anthem Zone.
          {country && (
            <>
              {" "}
              You are accessing from <strong>{country}</strong>.
            </>
          )}
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>Rugby Anthem Zone Access</h2>
          <ul>
            <li>Rugby Anthem Zone is provided as a paid access product.</li>
            <li>
              Access unlocks the Rugby Anthem Zone platform experience and
              associated content areas.
            </li>
            <li>
              Platform structure and feature availability may continue to evolve
              as the service develops.
            </li>
            <li>
              All payments are processed securely through our payment provider.
            </li>
          </ul>
        </div>

        <div className={styles.block}>
          <h2>Subscription Terms</h2>
          <ul>
            <li>
              Access is billed on a recurring basis according to the active
              billing setup.
            </li>
            <li>
              You may cancel according to the subscription and billing rules
              applicable at the time of purchase.
            </li>
            <li>
              Where cancellation is available, access remains active until the
              end of the paid billing period unless otherwise stated.
            </li>
            <li>
              No partial refunds are issued for unused time within a billing
              period unless required by law or provider policy.
            </li>
            <li>
              Pricing and billing presentation may vary by platform and region.
            </li>
          </ul>
        </div>

        {!isReadOnly && (
          <div className={styles.summaryBox}>
            <h2>Access Summary</h2>

            <p className={styles.price}>RAZ Premium</p>

            <p className={styles.note}>
              Secure checkout • Access unlocks after successful payment
            </p>

            <p className={styles.currencyNote}>
              {country === "South Africa"
                ? "Approximate local pricing may be shown during checkout depending on payment provider settings."
                : "Your local pricing and payment details may be presented at checkout depending on provider and region."}
            </p>
          </div>
        )}
      </section>

      <footer className={styles.footer}>
        {!isReadOnly && (
          <button
            className={styles.primaryButton}
            onClick={acceptTerms}
            disabled={loading}
          >
            {loading ? "Continuing…" : "Accept Terms & Continue"}
          </button>
        )}

        {!isReadOnly && (
          <p className={styles.notice}>
            By continuing, you confirm that you understand and accept the terms
            above.
          </p>
        )}

        <button
          className={styles.secondaryButton}
          onClick={() => navigate("/welcome")}
        >
          ← Return to Welcome
        </button>
      </footer>
    </section>
  );
}