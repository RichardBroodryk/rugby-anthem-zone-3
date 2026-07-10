import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import { registerUser } from "../services/auth";

/**
 * SIGNUP PAGE — POLISH PASS
 * Single Rugby Anthem Zone signup page for the one-tier paid model.
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
      const message = err instanceof Error ? err.message : "Signup failed";

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
                  RAZ MEMBERSHIP • ACCOUNT SETUP • INTERNATIONAL RUGBY
                </span>

                <h1>RAZ Premium Access</h1>

                <p className={styles.subtitle}>
                  Create your Rugby Anthem Zone account to continue to terms and
                  checkout, and unlock the full international rugby experience.
                </p>
              </div>
            </div>

            <div className={styles.formCardWrap}>
              <section className={styles.formCard}>
                <div className={styles.formHeader}>
                  <span className={styles.formEyebrow}>Monthly Membership</span>
                  <h2>Create Your Account</h2>
                  <p className={styles.formIntro}>
                    Set up your Rugby Anthem Zone account, choose your country,
                    and continue into terms and checkout.
                  </p>
                </div>

                <div className={styles.unlockBlock}>
                  <h3>What You’re Unlocking</h3>
                  <ul className={styles.unlockList}>
                    <li>Match centre, fixtures, results, and stats</li>
                    <li>Anthems, tournaments, media, and matchday tools</li>
                    <li>Heritage and defining rugby moments</li>
                    <li>One Rugby Anthem Zone account across the platform</li>
                  </ul>
                </div>

                <div className={styles.formFields}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.toLowerCase());
                        setError("");
                      }}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Password</label>
                    <div className={styles.passwordWrap}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`${styles.input} ${styles.passwordInput}`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter password"
                      />

                      <button
                        type="button"
                        className={styles.passwordToggle}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.fieldGroup}>
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
                  </div>

                  {error && <p className={styles.error}>{error}</p>}
                </div>

                <div className={styles.pricingBox}>
                  <p className={styles.price}>RAZ Premium</p>
                  <p className={styles.psychology}>
                    Secure monthly paid access. Final pricing and billing details
                    are shown at checkout.
                  </p>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.primaryButton}
                    onClick={handleSignup}
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Continue to Terms"}
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