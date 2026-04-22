import styles from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import myRugbyHero from "../assets/images/raz/my-rugby-hero.png";
import loyaltyHero from "../assets/images/raz/fanzone-loyalty.png";

export default function ProfilePage() {
  const navigate = useNavigate();

  /* ================= USER ================= */

  const tier =
    sessionStorage.getItem("raz_active_tier") || "premium";

  const userEmail =
    localStorage.getItem("raz_user_email") || "No email";

  /* ================= STATS ================= */

  const [matchesFollowed, setMatchesFollowed] = useState(0);
  const [anthemsPlayed, setAnthemsPlayed] = useState(0);
  const [tournamentsFollowed, setTournamentsFollowed] =
    useState(0);

  useEffect(() => {
    setMatchesFollowed(
      Number(localStorage.getItem("raz_matches_followed")) || 0
    );

    setAnthemsPlayed(
      Number(localStorage.getItem("raz_anthems_played")) || 0
    );

    setTournamentsFollowed(
      Number(localStorage.getItem("raz_tournaments_followed")) || 0
    );
  }, []);

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

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* ================= HEADER ================= */}
      <section className={styles.header}>
        <div className={styles.avatarSection}>
          {avatar ? (
            <img
              src={avatar}
              alt="Profile avatar"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>👤</div>
          )}

          <label className={styles.uploadButton}>
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
          </label>
        </div>

        <div className={styles.userInfo}>
          <h1 className={styles.name}>Your Profile</h1>

          <p className={styles.email}>{userEmail}</p>

          <span
            className={`${styles.memberBadge} ${
              tier === "super"
                ? styles.superBadge
                : tier === "premium"
                ? styles.premiumBadge
                : styles.freemiumBadge
            }`}
          >
            {tier === "super"
              ? "SUPER MEMBER"
              : tier === "premium"
              ? "PREMIUM MEMBER"
              : "FREEMIUM"}
          </span>
        </div>

        <div className={styles.headerActions}>
          <button onClick={() => navigate("/my-teams/manage")}>
            Manage Teams
          </button>

          <button onClick={() => navigate("/notifications")}>
            Notifications
          </button>
        </div>
      </section>

      {/* ================= MY RUGBY ================= */}
      <section className={styles.section}>
        <h2>My Rugby</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <img
              src={myRugbyHero}
              alt="My Rugby"
              className={styles.cardHero}
            />

            <h3>Favourite Teams</h3>

            <p>View and manage the teams you follow.</p>

            <button onClick={() => navigate("/my-teams")}>
              View My Teams
            </button>
          </div>
        </div>
      </section>

      {/* ================= FAN STATS ================= */}
      <section className={styles.section}>
        <h2>Fan Stats</h2>

        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <span className={styles.statValue}>
              {matchesFollowed}
            </span>
            <span className={styles.statLabel}>
              Matches Followed
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statValue}>
              {anthemsPlayed}
            </span>
            <span className={styles.statLabel}>
              Anthems Played
            </span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statValue}>
              {tournamentsFollowed}
            </span>
            <span className={styles.statLabel}>
              Tournaments Followed
            </span>
          </div>
        </div>

        {matchesFollowed === 0 &&
          anthemsPlayed === 0 &&
          tournamentsFollowed === 0 && (
            <p className={styles.emptyState}>
              Start exploring to build your fan stats.
            </p>
          )}
      </section>

      {/* ================= LOYALTY ================= */}
      <section className={styles.section}>
        <h2>Loyalty</h2>

        <div className={styles.card}>
          <img
            src={loyaltyHero}
            alt="Loyalty"
            className={styles.cardHero}
          />

          <p>Track your fan journey and loyalty progress.</p>

          <button onClick={() => navigate("/fanzone/loyalty")}>
            View Loyalty
          </button>
        </div>
      </section>

      {/* ================= ACCOUNT SETTINGS ================= */}
      <section className={styles.section}>
        <h2>Account Settings</h2>

        <div className={styles.grid}>
          {/* 🔒 MEMBERSHIP LOCKED */}
          <div className={styles.card}>
            <h3>Membership</h3>

            <p className={styles.disabledText}>
              Subscription upgrades and changes will be available soon.
            </p>

            <button
              className={styles.disabledButton}
              disabled
            >
              Coming Soon
            </button>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className={styles.card}>
            <h3>Account</h3>

            <p>Update your account information.</p>

            <button
              onClick={() => navigate("/account/settings")}
            >
              Account Settings
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}