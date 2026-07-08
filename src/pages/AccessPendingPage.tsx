import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AccessPendingPage.module.css";

type PendingState = {
  country?: string;
  acceptedAt?: string;
  source?: "checkout" | "activation" | "manual";
  message?: string;
};

export default function AccessPendingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as PendingState | null;

  const country = state?.country;
  const acceptedAt = state?.acceptedAt;
  const customMessage = state?.message;

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <h1>RAZ Premium Access Pending</h1>
          <p className={styles.subtitle}>
            Your Rugby Anthem Zone access is being finalised.
          </p>
        </header>

        <section className={styles.content}>
          <p>
            We’ve received your access request and your account is in the final
            stage of activation.
          </p>

          <p>
            In most cases, access should unlock automatically once payment and
            account confirmation are complete.
          </p>

          {country && (
            <p className={styles.meta}>
              <strong>Country:</strong> {country}
            </p>
          )}

          {acceptedAt && (
            <p className={styles.meta}>
              <strong>Accepted:</strong> {acceptedAt}
            </p>
          )}

          {customMessage && (
            <div className={styles.noticeBox}>
              <p>{customMessage}</p>
            </div>
          )}

          <div className={styles.noticeBox}>
            <p>
              If your access does not update straight away after checkout,
              return to the app and log in again after a short wait.
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>

          <button
            className={styles.secondaryButton}
            onClick={() => navigate("/welcome")}
          >
            Return to Welcome
          </button>
        </footer>
      </div>
    </section>
  );
}