import { useEffect, useRef, useState } from "react";
import styles from "./CheckoutPage.module.css";
import { getToken, getUserTier } from "../services/auth";
import { createPaymentSession } from "../services/payments";
import { API_BASE_URL } from "../config/api";

declare global {
  interface Window {
    Paddle?: {
      Environment?: {
        set: (env: "sandbox" | "production") => void;
      };
      Initialize?: (options: {
        token: string;
        eventCallback?: (event: unknown) => void;
      }) => void;
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

type PaddleFrontendConfig = {
  clientToken: string;
  environment?: string;
};

function extractTransactionIdFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("_ptxn");
  return raw && raw.trim() ? raw.trim() : null;
}

async function waitForPaddle(maxWaitMs = 10000, intervalMs = 200) {
  const start = Date.now();

  while (Date.now() - start < maxWaitMs) {
    if (window.Paddle?.Checkout?.open && window.Paddle?.Initialize) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  return false;
}

async function getPaddleFrontendConfig(token: string): Promise<PaddleFrontendConfig> {
  const res = await fetch(`${API_BASE_URL}/api/payments/config`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    },
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(
      data?.error || data?.message || "Unable to load Paddle checkout config."
    );
  }

  if (!data?.clientToken) {
    throw new Error("Paddle client token is missing from checkout config.");
  }

  return data as PaddleFrontendConfig;
}

export default function CheckoutPage() {
  const [status, setStatus] = useState("Preparing secure checkout...");
  const [error, setError] = useState("");

  const hasStartedCheckoutRef = useRef(false);
  const hasInitializedPaddleRef = useRef(false);
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

    async function ensurePaddleInitialized(token: string) {
      if (hasInitializedPaddleRef.current) return;

      const paddleReady = await waitForPaddle();

      if (!paddleReady || !window.Paddle?.Initialize || !window.Paddle?.Checkout?.open) {
        throw new Error(
          "Paddle checkout could not be loaded. Please refresh and try again."
        );
      }

      const config = await getPaddleFrontendConfig(token);
      const environment =
        config.environment === "sandbox" ? "sandbox" : "production";

      if (window.Paddle?.Environment?.set) {
        window.Paddle.Environment.set(environment);
      }

      window.Paddle.Initialize({
        token: config.clientToken,
        eventCallback(event) {
          console.log("Paddle event:", event);
        },
      });

      hasInitializedPaddleRef.current = true;
    }

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
          window.location.replace("/home");
          return;
        }

        const paddleTxn = extractTransactionIdFromUrl();

        // =====================================================
        // CASE 1: /checkout?_ptxn=...
        // Initialize Paddle, open overlay for the existing
        // transaction, then poll until backend access activates.
        // =====================================================
        if (paddleTxn) {
          if (hasStartedCheckoutRef.current) {
            return;
          }

          hasStartedCheckoutRef.current = true;
          setStatus("Opening secure checkout...");
          setError("");

          await ensurePaddleInitialized(token);

          beginPollingForActivation();

          window.Paddle!.Checkout!.open({
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
      clearPoll();
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