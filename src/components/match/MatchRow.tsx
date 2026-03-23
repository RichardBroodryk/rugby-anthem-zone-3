import styles from "./MatchRow.module.css";

/* ================= TYPES ================= */

type TeamRef = {
  name: string;
  country: string;
};

type MatchState =
  | "live"
  | "starting"
  | "today"
  | "upcoming"
  | "final";

type Props = {
  home: TeamRef;
  away: TeamRef;
  state: MatchState;
  score?: {
    home: number;
    away: number;
  };
  metaLeft?: string;
  metaRight?: string;
  onClick?: () => void;
};

/* ================= HELPERS ================= */

function getRowClass(state: MatchState) {
  if (state === "live") return styles.live;
  if (state === "final") return styles.final;

  // treat starting + today as upcoming visually
  return styles.upcoming;
}

/* ================= COMPONENT ================= */

export default function MatchRow({
  home,
  away,
  state,
  score,
  metaLeft,
  metaRight,
  onClick,
}: Props) {
  const isLive = state === "live";
  const isFinal = state === "final";

  return (
    <div
      className={`${styles.row} ${getRowClass(state)} ${
        onClick ? styles.clickable : ""
      }`}
      onClick={onClick}
    >
      {/* ===== TEAMS ===== */}
      <div className={styles.teamsGrid}>
        <div className={styles.teamLeft}>
          <span className={styles.teamName}>{home.name}</span>
        </div>

        <div className={styles.center}>
          {isLive ? (
            <div className={styles.livePulse}>
              <span className={styles.pulseDot} />
              LIVE
            </div>
          ) : isFinal && score ? (
            <div className={styles.score}>
              {score.home} - {score.away}
            </div>
          ) : (
            <span className={styles.vs}>vs</span>
          )}
        </div>

        <div className={styles.teamRight}>
          <span className={styles.teamName}>{away.name}</span>
        </div>
      </div>

      {/* ===== META ===== */}
      {(metaLeft || metaRight) && (
        <div className={styles.meta}>
          <span>{metaLeft}</span>
          <span className={styles.tag}>{metaRight}</span>
        </div>
      )}
    </div>
  );
}