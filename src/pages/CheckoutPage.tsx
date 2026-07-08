import { useEffect, useState } from "react";
import styles from "./CheckoutPage.module.css";
import { getToken, getUserTier } from "../services/auth";
import { createPaymentSession } from "../services/payments";

export default function CheckoutPage() {
  const [status, setStatus] = useState("Preparing secure checkout...");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function beginCheckout() {
      try {
        const token = getToken();

        if (!token) {
          setStatus("Login required");
          setError("You need to log in before checkout can begin.");
          return;
        }

        const freshTier = await getUserTier();

        if (cancelled) return;

        if (freshTier === "active") {
          setStatus("Access already active");
          window.location.href = "/home";
          return;
        }

        setStatus("Opening secure checkout...");

        const data = await createPaymentSession();

        if (cancelled) return;

        if (!data.checkoutUrl) {
          throw new Error("Unable to start checkout.");
        }

        window.location.href = data.checkoutUrl;
      } catch (err) {
        console.error(err);

        if (cancelled) return;

        const message =
          err instanceof Error ? err.message : "Unable to start checkout.";

        setStatus("Checkout unavailable");
        setError(message);
      }
    }

    beginCheckout();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{status}</h1>

        {!error ? (
          <>
            <p className={styles.text}>
              Please wait while we open the secure Rugby Anthem Zone checkout.
            </p>
            <p className={styles.subtle}>
              You will be redirected automatically.
            </p>
          </>
        ) : (
          <>
            <p className={styles.error}>{error}</p>
            <a href="/welcome" className={styles.link}>
              Return to Welcome
            </a>
          </>
        )}
      </div>
    </section>
  );
}