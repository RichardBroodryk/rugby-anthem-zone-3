import styles from "./AccountSettingsPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AccountSettingsPage() {
  const navigate = useNavigate();

  /* ================= USER ================= */

  const email =
    localStorage.getItem("raz_user_email") || "No email";

  const tier =
    sessionStorage.getItem("raz_active_tier") || "freemium";

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

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Account Settings</h1>
        <p>Manage your profile and account preferences</p>
      </header>

      {/* ACCOUNT OVERVIEW */}
      <section className={styles.section}>
        <h2>Account Overview</h2>

        <div className={styles.card}>
          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Membership:</strong>{" "}
            {tier === "super"
              ? "Super Premium"
              : tier === "premium"
              ? "Premium"
              : "Freemium"}
          </p>
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
              Upload New Photo
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

          <button
            className={styles.disabledButton}
            disabled
          >
            Coming Soon
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