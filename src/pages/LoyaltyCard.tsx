import styles from "./LoyaltyCard.module.css";

type TierKey = "bronze" | "silver" | "gold" | "platinum";

interface LoyaltyCardProps {
  userTier: TierKey;
  points: number;
}

/* ================= TIER SYSTEM ================= */

const TIERS: Record<
  TierKey,
  {
    label: string;
    min: number;
    max: number | null;
    next: TierKey | null;
  }
> = {
  bronze: { label: "Bronze", min: 0, max: 999, next: "silver" },
  silver: { label: "Silver", min: 1000, max: 2999, next: "gold" },
  gold: { label: "Gold", min: 3000, max: 6999, next: "platinum" },
  platinum: { label: "Platinum", min: 7000, max: null, next: null },
};

/* ================= REWARDS ================= */

const REWARDS: Record<TierKey, string[]> = {
  bronze: ["Access to standard content"],
  silver: ["Early access windows", "Enhanced match features"],
  gold: ["Exclusive content", "Priority booking access"],
  platinum: [
    "Full premium access",
    "Alternative match audio",
    "Partner privileges",
  ],
};

export default function LoyaltyCard({ userTier, points }: LoyaltyCardProps) {
  const tier = TIERS[userTier];

  const currentMin = tier.min;
  const nextTierKey = tier.next;
  const nextTier = nextTierKey ? TIERS[nextTierKey] : null;
  const nextMin = nextTier ? nextTier.min : null;

  /* ================= PROGRESS ================= */

  let progress = 100;
  let progressText = "Max tier achieved";
  let pointsRemaining = 0;

  if (nextMin !== null) {
    const range = nextMin - currentMin;
    const current = Math.max(points - currentMin, 0);

    progress = Math.min((current / range) * 100, 100);

    pointsRemaining = Math.max(nextMin - points, 0);

    progressText = `${points.toLocaleString()} / ${nextMin.toLocaleString()} → ${nextTier?.label}`;
  }

  /* ================= RENDER ================= */

  return (
    <section className={styles.card} data-tier={userTier}>
      {/* HEADER */}
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Fanzone Standing</span>
          <h3>{tier.label} Supporter</h3>
        </div>

        <div className={styles.points}>
          {points.toLocaleString()} pts
        </div>
      </header>

      {/* PROGRESS */}
      {nextMin !== null && (
        <div className={styles.progress}>
          <div className={styles.bar}>
            <div
              className={styles.fill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className={styles.next}>{progressText}</span>

          <span className={styles.remaining}>
            {pointsRemaining.toLocaleString()} pts to {nextTier?.label}
          </span>
        </div>
      )}

      {/* HOW TO PROGRESS */}
      {nextMin !== null && (
        <div className={styles.rules}>
          <span>+50 Match</span>
          <span>+10 Video</span>
          <span>+500 Ticket</span>
          <span>+5 Interaction</span>
        </div>
      )}

      {/* REWARDS */}
      <div className={styles.rewards}>
        <strong>Unlocked Benefits</strong>

        <ul>
          {REWARDS[userTier].map((reward, i) => (
            <li key={i}>{reward}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}