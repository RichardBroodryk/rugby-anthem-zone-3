import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AccessPage.module.css";
import { registerUser } from "../services/auth";

/**
 * SIGNUP PAGE — WAVE 3
 * --------------------------------------------------
 * Single Rugby Anthem Zone signup page for the
 * one-tier paid model.
 */

const COUNTRIES = [
  "South Africa",
  "Argentina",
  "Australia",
  "New Zealand",
  "United Kingdom",
  "Ireland",
  "France",
  "Japan",
  "United States",
  "Fiji",
  "Samoa",
  "Georgia",
  "Scotland",
  "Wales",
  "Spain",
  "Portugal",
  "Namibia",
  "Zimbabwe",
  "Other",
];

export default function SignupPage() {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSignup = async () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(email, password);

      navigate("/terms", {
        state: {
          country,
          accessFlow: "checkout",
          email,
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Signup failed";

      if (message.toLowerCase().includes("exists")) {
        setError(
          "This email is already registered. Please log in to continue."
        );
      } else {
        setError(message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>RAZ Premium Access</h1>
        <p className={styles.subtitle}>
          Create your Rugby Anthem Zone account to continue to terms and checkout.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>What You’re Unlocking</h2>
          <ul>
            <li>Match centre, fixtures, results, and stats</li>
            <li>Anthems, tournaments, media, and matchday tools</li>
            <li>Heritage and defining rugby moments</li>
            <li>One Rugby Anthem Zone account across the platform</li>
          </ul>
        </div>

        <div className={styles.block}>
          <h2>Account Details</h2>

          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
              setError("");
            }}
            placeholder="you@example.com"
          />

          <label className={styles.label}>Password</label>
          <div className={styles.passwordWrap}>
            <input
              type={showPassword ? "text" : "password"}
              className={`${styles.select} ${styles.passwordInput}`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
            />

            <span
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className={styles.block}>
          <label className={styles.label}>Select your country</label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setError("");
            }}
            className={styles.select}
          >
            <option value="">— Select country —</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c === "Other" ? "Other (Global)" : c}
              </option>
            ))}
          </select>

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.pricingBox}>
          <p className={styles.price}>RAZ Premium</p>
          <p className={styles.psychology}>
            Secure paid access. Final pricing and billing details are shown at checkout.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Continue to Terms"}
        </button>
      </footer>
    </section>
  );
}