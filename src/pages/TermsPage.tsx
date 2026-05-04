import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TermsPage.module.css";
import { getToken } from "../services/auth";

type TermsState = {
  tier?: "freemium" | "premium" | "super";
  country?: string;
};

export default function TermsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as TermsState | null;
  const tier = state?.tier;
  const country = state?.country;

  const [loading, setLoading] = useState(false);

  // 🔒 KEEP THIS — protects checkout flow
  useEffect(() => {
    if (!tier) {
      navigate("/welcome", { replace: true });
    }
  }, [tier, navigate]);

  // 🧠 READ-ONLY MODE (from Welcome)
  const isReadOnly = tier === "freemium" && !state?.country;

  const acceptTerms = async () => {
    if (tier === "freemium") {
      navigate("/home-free", { replace: true });
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://rugby-anthem-backend.fly.dev/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tier }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      if (!data.checkoutUrl) {
        throw new Error("Missing checkout URL");
      }

      // 🔥 DO NOT TOUCH
      window.location.href = data.checkoutUrl;

    } catch (err: any) {
      alert("Checkout failed: " + (err.message || "Unknown error"));
      setLoading(false);
    }
  };

  const isPremium = tier === "premium";
  const isSuper = tier === "super";

  return (
    <section className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Terms & Conditions</h1>

        <p className={styles.context}>
          Please review the terms of access to Rugby Anthem Zone.
          {country && <> You are accessing from <strong>{country}</strong>.</>}
        </p>
      </header>

      {/* CONTENT */}
      <section className={styles.content}>

        {/* 🟢 FREEMIUM TERMS */}
        <div className={styles.block}>
          <h2>Freemium Access</h2>
          <ul>
            <li>Freemium access is provided at no cost and remains permanently available.</li>
            <li>Content and features are limited compared to subscription tiers.</li>
            <li>The experience may include advertising or promotional placements.</li>
            <li>Access is provided on an “as available” basis and may change over time.</li>
            <li>No payment details are required for Freemium access.</li>
          </ul>
        </div>

        {/* 🔵 SUBSCRIPTION TERMS */}
        <div className={styles.block}>
          <h2>Premium & Super Premium Access</h2>
          <ul>
            <li>Subscriptions are billed monthly based on the selected tier.</li>
            <li>Users may cancel at any time; access remains until the end of the billing cycle.</li>
            <li>No partial refunds are issued for unused time within a billing period.</li>
            <li>Subscription access may include additional features, content, and reduced advertising.</li>
            <li>All payments are securely processed via our payment provider.</li>
          </ul>
        </div>

        {/* ⭐ SHOW ONLY DURING CHECKOUT FLOW */}
        {!isReadOnly && (isPremium || isSuper) && (
          <div className={styles.summaryBox}>
  <h2>Subscription Summary</h2>

  <p className={styles.price}>
    {isPremium ? "$2.49 / month" : "$3.49 / month"}
  </p>

  <p className={styles.note}>
    Billed monthly • Cancel anytime
  </p>

  {/* 🌍 CURRENCY NOTE — NEW */}
  <p className={styles.currencyNote}>
  {country === "South Africa"
    ? "Approximate price in South African Rand will be shown at checkout."
    : "Prices shown in USD. Your local currency will be applied securely at checkout."}
</p>
</div>
        )}

      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>

        {/* 🔥 ONLY SHOW IN CHECKOUT FLOW */}
        {!isReadOnly && (
          <button
            className={styles.primaryButton}
            onClick={acceptTerms}
            disabled={loading}
          >
            {loading ? "Starting secure checkout…" : "Accept Terms & Continue"}
          </button>
        )}

        {!isReadOnly && (
          <p className={styles.notice}>
            By continuing, you confirm that you understand and accept the terms above.
          </p>
        )}

        {/* ✅ ALWAYS AVAILABLE */}
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