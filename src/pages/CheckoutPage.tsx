import { useEffect, useRef, useState } from "react";
import styles from "./CheckoutPage.module.css";
import { getToken, getUserTier } from "../services/auth";
import { createPaymentSession } from "../services/payments";

declare global {
  interface Window {
    Paddle?: {
      Checkout?: {
        open: (options: {
          transactionId?: string;
          settings?: Record<string, unknown>;
        }) => void;
        close?: () => void;
      };
    };
  }
}

function extractTransactionIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("_ptxn");
  return raw && raw.trim() ? raw.trim() : null;
}

async function waitForPaddle(maxWaitMs = 10000, intervalMs = 200) {
  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {
    if (window.Paddle?.Checkout?.open) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  return false;
}

export default function CheckoutPage() {
  const [status, setStatus] = useState("Preparing secure checkout...");
  const [error, setError] = useState("");

  const hasStartedCheckoutRef = useRef(false);
  const pollTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const clearPoll = () => {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };

    const beginPollingForActivation = () => {
      clearPoll();

      pollTimerRef.current = window.setInterval(async () => {
        try {
          const tier = await getUserTier();

          if (cancelled) return;

          if (tier === "active") {
            clearPoll();
            setStatus("Access confirmed");
            window.location.replace("/home");
          }
        } catch (err) {
          console.error("Subscription polling failed:", err);
        }
      }, 3000);
    };

    async function beginCheckout() {
      try {
        const token = getToken();

        if (!token) {
          setStatus("Login required");
          setError("You need to log in before checkout can begin.");
          return;
        }

        // Always check current access first.
        const freshTier = await getUserTier();

        if (cancelled) return;

        if (freshTier === "active") {
          setStatus("Access already active");
          window.location.replace("/home");
          return;
        }

        const paddleTxn = extractTransactionIdFromUrl();

        // =====================================================
        // CASE 1: We are already on /checkout?_ptxn=...
        // This is the merchant checkout URL returned by Paddle.
        // We must open the Paddle checkout UI for this transaction,
        // NOT create another payment session.
        // =====================================================
        if (paddleTxn) {
          if (hasStartedCheckoutRef.current) {
            return;
          }

          hasStartedCheckoutRef.current = true;
          setStatus("Opening secure checkout...");
          setError("");

          const paddleReady = await waitForPaddle();

          if (!paddleReady || !window.Paddle?.Checkout?.open) {
            throw new Error(
              "Paddle checkout could not be loaded. Please refresh and try again."
            );
          }

          // Start polling before / while the checkout is open so we can
          // pick up the webhook-driven activation as soon as it lands.
          beginPollingForActivation();

          window.Paddle.Checkout.open({
            transactionId: paddleTxn,
            settings: {
              displayMode: "overlay",
              theme: "light",
            },
          });

          setStatus("Processing payment...");
          return;
        }

        // =====================================================
        // CASE 2: Fresh visit to /checkout
        // Create a new transaction once, then redirect to the
        // merchant checkout URL returned by Paddle.
        // =====================================================
        if (hasStartedCheckoutRef.current) {
          return;
        }

        hasStartedCheckoutRef.current = true;
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

      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
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