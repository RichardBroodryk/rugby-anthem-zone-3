import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoyaltyPage.module.css";

import LoyaltyCard from "./LoyaltyCard";
import heroImage from "../assets/images/raz/fanzone-loyalty.png";

type TierKey = "bronze" | "silver" | "gold" | "platinum";

export default function LoyaltyPage() {
  const navigate = useNavigate();

  const [tier, setTier] = useState<TierKey>("bronze");
  const [points, setPoints] = useState(0);
  const [engagement, setEngagement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {
  try {
    const matches =
      Number(localStorage.getItem("raz_matches_followed")) || 0;

    const anthems =
      Number(localStorage.getItem("raz_anthems_played")) || 0;

    const tournaments =
      Number(localStorage.getItem("raz_tournaments_followed")) || 0;

    // 🎯 POINT SYSTEM (aligned with your card)
    const calculatedPoints =
      matches * 50 +
      anthems * 10 +
      tournaments * 100;

    setPoints(calculatedPoints);

    // 🧠 DETERMINE TIER
    let calculatedTier: TierKey = "bronze";

    if (calculatedPoints >= 7000) calculatedTier = "platinum";
    else if (calculatedPoints >= 3000) calculatedTier = "gold";
    else if (calculatedPoints >= 1000) calculatedTier = "silver";

    setTier(calculatedTier);

    setEngagement({
      matchesFollowedSeason: matches,
      tournaments: tournaments ? ["Active"] : [],
      featuresUsed: anthems ? ["Anthems"] : [],
      merchPurchases: 0,
    });
  } catch (e) {
    console.warn("Loyalty local fallback error", e);
    setPoints(0);
    setTier("bronze");
    setEngagement(null);
  } finally {
    setLoading(false);
  }
}, []);

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Loyalty & Standing</h1>
          <p>
            Recognition earned through sustained connection
            <br />
            to the game over time.
          </p>
        </div>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/fanzone")}
        >
          ← Back to Fanzone
        </button>
      </div>

      {/* CURRENT STANDING */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Current Standing</h2>

        <div className={styles.cardWrap}>
          {loading ? (
            <p className={styles.notice}>Loading your standing...</p>
          ) : (
            <LoyaltyCard userTier={tier} points={points} />
          )}
        </div>
      </section>

      {/* SNAPSHOT (ONLY IF REAL DATA EXISTS) */}
      {engagement && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contribution Snapshot</h2>

          <div className={styles.snapshot}>
            <div>
              <strong>Matches Followed</strong>
              <span>{engagement.matchesFollowedSeason} this season</span>
            </div>

            <div>
              <strong>Tournaments Engaged</strong>
              <span>
                {engagement.tournaments.length
                  ? engagement.tournaments.join(", ")
                  : "—"}
              </span>
            </div>

            <div>
              <strong>Official Features Used</strong>
              <span>
                {engagement.featuresUsed.length
                  ? engagement.featuresUsed.join(", ")
                  : "—"}
              </span>
            </div>

            <div>
              <strong>Verified Purchases</strong>
              <span>{engagement.merchPurchases}</span>
            </div>
          </div>
        </section>
      )}

      {/* PLATINUM EXPERIENCE */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Platinum Experience</h2>

        <p className={styles.bodyText}>
          Platinum standing represents long-term proximity to the game.
          Experiences below are unlocked only when sustained engagement
          is demonstrated over time.
        </p>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Priority Access Windows</h3>
            <p>
              Early visibility and access to selected Pay-Per-View events,
              editorial launches, and limited releases before general
              availability.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Alternative Match Audio</h3>
            <p>
              Access to secondary commentary feeds, stadium ambience audio,
              or ad-reduced listening where rights allow.
            </p>
          </div>

          <div className={styles.card}>
            <h3>Partner Privileges</h3>
            <p>
              Priority booking windows and recognition with official partners,
              subject to territory and availability.
            </p>
          </div>
        </div>

        {tier !== "platinum" && (
          <div className={styles.lockedNote}>
            Platinum experiences unlock automatically when eligibility
            is reached.
          </div>
        )}
      </section>

      {/* LONG VIEW */}
      <section className={styles.section}>
        <p className={styles.notice}>
          Loyalty standing reflects sustained engagement across seasons.
          Progression is not accelerated through isolated actions or
          short-term activity.
        </p>
      </section>
    </main>
  );
}