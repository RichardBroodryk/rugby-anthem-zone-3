import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SuperPremiumSignupPage.module.css";
import { registerUser, loginUser } from "../services/auth";

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

export default function SuperPremiumSignupPage() {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // ✅ FIX

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!country) {
      setError("Please select your country to continue.");
      return;
    }

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(email, password);
      await loginUser(email, password);

      navigate("/terms", {
        state: {
          tier: "super",
          country,
          pricing: {
            label: "$3.49 / month",
            amount: "3.49",
          },
          email,
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Signup failed";

      if (message.toLowerCase().includes("password")) {
        setError("Incorrect password");
      } else if (message.toLowerCase().includes("user")) {
        setError("Email already exists or invalid");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <h1>Super Premium Access</h1>
        <p className={styles.subtitle}>
          For supporters who want the most complete Rugby Anthem Zone experience.
        </p>
      </header>

      <section className={styles.content}>
        {/* EMAIL */}
        <div className={styles.block}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.select}
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="you@example.com"
          />

          {/* PASSWORD WITH TOGGLE */}
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
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {/* COUNTRY */}
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

        {/* PRICING */}
        <div className={styles.pricingBox}>
          <p className={styles.price}>$3.49 / month</p>
          <p className={styles.billing}>Billed monthly</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Proceed to Subscription Terms"}
        </button>
      </footer>
    </section>
  );
}