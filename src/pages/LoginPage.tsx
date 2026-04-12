// src/pages/LoginPage.tsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, getUserTier, getToken } from "../services/auth";
import { apiRequest } from "../services/api";
import styles from "./FreemiumSignupPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectState = location.state as
    | {
        redirectAfterLogin?: string;
        tier?: "premium" | "super";
        country?: string;
        pricing?: any;
      }
    | null;

  const checkoutIntent =
    redirectState?.redirectAfterLogin === "checkout";

  const checkoutTier = redirectState?.tier;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState(""); // 👈 for forgot password feedback
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setInfo("");

    try {
      await loginUser(email, password);

      const token = getToken();

      // 💳 CHECKOUT FLOW
      if (checkoutIntent && checkoutTier && token) {
        try {
          const data = await apiRequest(
            "/api/payments",
            "POST",
            { tier: checkoutTier },
            token
          );

          if (!data.checkoutUrl) {
            setError("Unable to start payment.");
            setLoading(false);
            return;
          }

          window.location.href = data.checkoutUrl;
          return;

        } catch {
          setError("Payment service unavailable.");
          setLoading(false);
          return;
        }
      }

      // 🧭 NORMAL LOGIN
      const tier = await getUserTier();

      if (tier === "super") window.location.href = "/home-super";
      else if (tier === "premium") window.location.href = "/home";
      else window.location.href = "/home-free";

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "";

      // 🔥 CLEAN ERROR MESSAGES
      if (message.toLowerCase().includes("password")) {
        setError("Incorrect password");
      } else if (message.toLowerCase().includes("user")) {
        setError("Email not found");
      } else {
        setError("Login failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  // 🔁 FORGOT PASSWORD (SAFE PLACEHOLDER)
  const handleForgotPassword = () => {
    if (!email) {
      setError("Enter your email first.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email to reset password.");
      return;
    }

    // 🔥 For now (no backend endpoint yet)
    setError("");
    setInfo("Password reset link will be available soon.");
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Login</h1>
        <p className={styles.subtitle}>
          Sign in to access your Rugby Anthem Zone account.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          {/* EMAIL */}
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="you@example.com"
          />

          {/* PASSWORD */}
          <label className={styles.label}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.select}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ paddingRight: "50px" }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#222",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* 🔁 FORGOT PASSWORD */}
          <p
            onClick={handleForgotPassword}
            style={{
              marginTop: "8px",
              fontSize: "12px",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Forgot password?
          </p>

          {/* ERROR */}
          {error && <p className={styles.error}>{error}</p>}

          {/* INFO */}
          {info && (
            <p style={{ color: "#4caf50", fontSize: "12px" }}>
              {info}
            </p>
          )}
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </footer>
    </section>
  );
}