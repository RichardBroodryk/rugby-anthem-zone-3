import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, getUserTier } from "../services/auth";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectState = location.state as
    | {
        redirectAfterLogin?: string;
      }
    | null;

  const checkoutIntent = redirectState?.redirectAfterLogin === "checkout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

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

      const freshTier = await getUserTier();

      if (window.history.state && window.history.state.usr) {
        window.history.replaceState({}, document.title);
      }

      if (checkoutIntent) {
        if (freshTier === "active") {
          navigate("/home");
        } else {
          navigate("/terms", {
            state: { accessFlow: "checkout" },
          });
        }
        return;
      }

      if (freshTier === "active") {
        navigate("/home");
      } else {
        navigate("/what-you-get");
      }
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : "";
      const message = rawMessage.toLowerCase();

      if (
        message.includes("invalid credentials") ||
        message.includes("unauthorized")
      ) {
        setError("Incorrect email or password.");
      } else if (message.includes("not found")) {
        setError("Email not found.");
      } else if (message.includes("password")) {
        setError("Incorrect password.");
      } else {
        setError(rawMessage || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError("Enter your email first.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email.");
      return;
    }

    setError("");
    setInfo("Password reset link will be available soon.");
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
                  RAZ ACCOUNT • MATCHDAY ACCESS • INTERNATIONAL RUGBY
                </span>

                <h1>Log In</h1>

                <p className={styles.subtitle}>
                  Sign in to access your Rugby Anthem Zone account and continue
                  into the international rugby experience.
                </p>
              </div>
            </div>

            <div className={styles.formCardWrap}>
              <section className={styles.formCard}>
                <div className={styles.formHeader}>
                  <span className={styles.formEyebrow}>Account Access</span>
                  <h2>Welcome Back</h2>
                  <p className={styles.formIntro}>
                    Enter your email and password to continue into Rugby Anthem
                    Zone.
                  </p>
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

                  <button
                    type="button"
                    className={styles.forgotButton}
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>

                  {error && <p className={styles.error}>{error}</p>}
                  {info && <p className={styles.info}>{info}</p>}
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.primaryButton}
                    onClick={handleLogin}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
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