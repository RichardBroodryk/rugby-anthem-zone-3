import { useNavigate } from "react-router-dom";
import styles from "./WeekendMatchRailCard.module.css";

import { getTeamImage } from "../../utils/teamImageResolver";
import type { MatchData } from "../../data/matches/types";

type WeekendMatchRailCardProps = {
  match: MatchData;
};

export default function WeekendMatchRailCard({
  match,
}: WeekendMatchRailCardProps) {
  const navigate = useNavigate();

  const homeImage = getTeamImage(match.home.name);
  console.log(match.home.name);
console.log(match.away.name);
  const awayImage = getTeamImage(match.away.name);

  const formattedDate = new Date(match.date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/match/${match.id}`)}
    >
      <div className={styles.hero}>
        <div className={styles.left}>
          {homeImage && (
            <img
              src={homeImage}
              alt={match.home.name}
              className={styles.heroImage}
            />
          )}
        </div>

        <div className={styles.right}>
          {awayImage && (
            <img
              src={awayImage}
              alt={match.away.name}
              className={styles.heroImage}
            />
          )}
        </div>

        <div className={styles.overlay}>
          <div className={styles.vs}>VS</div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.teams}>
          <span>{match.home.name}</span>
          <span className={styles.separator}>vs</span>
          <span>{match.away.name}</span>
        </div>

        <div className={styles.meta}>{formattedDate}</div>
        <div className={styles.meta}>{match.venue}</div>
        <div className={styles.meta}>{match.tournament}</div>

        <div className={styles.cta}>View Match →</div>
      </div>
    </article>
  );
}