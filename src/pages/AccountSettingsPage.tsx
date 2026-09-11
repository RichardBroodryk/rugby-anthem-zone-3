import styles from "./AccountSettingsPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStoredEmail, getStoredTier, logoutUser } from "../services/auth";

export default function AccountSettingsPage() {
  const navigate = useNavigate();

  /* ================= USER ================= */
  const email = getStoredEmail() || "No email";
  const tier = getStoredTier();
  const hasPaidAccess = tier === "active";

  /* ================= AVATAR ================= */
  const [avatar, setAvatar] = useState<string | null>(
    localStorage.getItem("raz_avatar")
  );

  function handleAvatarUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
      localStorage.setItem("raz_avatar", result);
    };

    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    localStorage.removeItem("raz_avatar");
    setAvatar(null);
  }

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logoutUser();
    navigate("/welcome");
  };

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Account Settings</h1>
        <p>Manage your profile and Rugby Anthem Zone access</p>
      </header>

      {/* ACCOUNT OVERVIEW */}
      <section className={styles.section}>
        <h2>Account Overview</h2>

        <div className={styles.card}>
          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Access:</strong>{" "}
            {hasPaidAccess
              ? "Active Rugby Anthem Zone Access"
              : "No Active Rugby Anthem Zone Access"}
          </p>
        </div>
      </section>

      {/* RUGBY ANTHEM ZONE ACCESS */}
      <section className={styles.section}>
        <h2>Rugby Anthem Zone Access</h2>

        <div className={styles.card}>
          {hasPaidAccess ? (
            <>
              <p>
                You currently have active Rugby Anthem Zone access.
              </p>

              <p>
                Your RAZ access was purchased through a once-off payment.
                There are no automatic recurring payments or renewals.
              </p>
            </>
          ) : (
            <>
              <p>No active Rugby Anthem Zone access was found.</p>

              <button
                className={styles.button}
                onClick={() => navigate("/welcome")}
              >
                Go to Access Flow
              </button>
            </>
          )}
        </div>
      </section>

      {/* PROFILE IMAGE */}
      <section className={styles.section}>
        <h2>Profile Image</h2>

        <div className={styles.card}>
          <div className={styles.avatarWrap}>
            {avatar ? (
              <img
                src={avatar}
                alt="Profile avatar"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>👤</div>
            )}
          </div>

          <div className={styles.avatarActions}>
            <label className={styles.button}>
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                hidden
              />
            </label>

            {avatar && (
              <button
                className={styles.secondaryButton}
                onClick={removeAvatar}
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className={styles.section}>
        <h2>Security</h2>

        <div className={styles.card}>
          <p>Password management will be available soon.</p>

          <button className={styles.disabledButton} disabled>
            Coming Soon
          </button>
        </div>
      </section>

      {/* SESSION */}
      <section className={styles.section}>
        <h2>Session</h2>

        <div className={styles.card}>
          <p>Sign out of Rugby Anthem Zone on this device.</p>

          <button className={styles.dangerButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className={styles.section}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/profile")}
        >
          ← Back to Profile
        </button>
      </section>
    </main>
  );
}