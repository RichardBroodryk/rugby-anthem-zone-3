import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, getUserTier } from "../services/auth";
import styles from "./AccessPage.module.css";

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
      <header className={styles.header}>
        <h1>Log In</h1>
        <p className={styles.subtitle}>
          Sign in to access your Rugby Anthem Zone account.
        </p>
      </header>

      <section className={styles.content}>
        <div className={styles.block}>
          <h2>Account Access</h2>

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

          <p
            className={styles.secondaryAction}
            onClick={handleForgotPassword}
          >
            Forgot password?
          </p>

          {error && <p className={styles.error}>{error}</p>}
          {info && <p className={styles.info}>{info}</p>}
        </div>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.primaryButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </footer>
    </section>
  );
}