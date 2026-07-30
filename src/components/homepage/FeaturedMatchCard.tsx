import styles from "./FeaturedMatchCard.module.css";
import { useNavigate } from "react-router-dom";

// Flag imports - using the correct paths from your file list
import nzFlag from "../../assets/images/flags/new-zealand.jpg";
import saFlag from "../../assets/images/flags/south-africa.jpg";
import argentinaFlag from "../../assets/images/flags/argentina.jpg";

// URC Team Logos - using the correct paths from your file list
import stormersLogo from "../../assets/images/rivalry/stormers.jpg";

interface FeaturedMatch {
  id: number;
  homeTeam: string;
  homeFlag: string;
  homeLogo?: string;
  awayTeam: string;
  awayFlag: string;
  awayLogo?: string;
  date: string;
  venue: string;
  competition: string;
  matchId: number;
}

export default function FeaturedMatchCard() {
  const navigate = useNavigate();

  const matches: FeaturedMatch[] = [
    {
      id: 2998,
      homeTeam: "Argentina",
      homeFlag: argentinaFlag,
      awayTeam: "South Africa",
      awayFlag: saFlag,
      date: "Sat 8 Aug 2026",
      venue: "Estadio José Amalfitani, Buenos Aires",
      competition: "International Test Match",
      matchId: 2998,
    },
    {
      id: 7001,
      homeTeam: "Stormers",
      homeFlag: stormersLogo,
      homeLogo: stormersLogo,
      awayTeam: "New Zealand",
      awayFlag: nzFlag,
      date: "Fri 7 Aug 2026",
      venue: "Cape Town Stadium, Cape Town",
      competition: "The Rivalry Tour - Midweek Match",
      matchId: 7001,
    },
  ];

  const handleMatchClick = (matchId: number) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <section className={styles.featuredMatchSection}>
      <div className={styles.header}>
        <h2>⚡ Upcoming Featured Matches</h2>
        <span className={styles.subtitle}>Don't miss the action</span>
      </div>

      <div className={styles.matchesGrid}>
        {matches.map((match) => (
          <div
            key={match.id}
            className={styles.matchCard}
            onClick={() => handleMatchClick(match.id)}
          >
            <div className={styles.competitionBadge}>{match.competition}</div>

            <div className={styles.teamsContainer}>
              {/* Home Team */}
              <div className={styles.teamBlock}>
                <div className={styles.flagWrapper}>
                  <img
                    src={match.homeFlag}
                    alt={match.homeTeam}
                    className={styles.flag}
                  />
                </div>
                <span className={styles.teamName}>{match.homeTeam}</span>
              </div>

              <div className={styles.vsContainer}>
                <span className={styles.vsBadge}>VS</span>
              </div>

              {/* Away Team */}
              <div className={styles.teamBlock}>
                <div className={styles.flagWrapper}>
                  <img
                    src={match.awayFlag}
                    alt={match.awayTeam}
                    className={styles.flag}
                  />
                </div>
                <span className={styles.teamName}>{match.awayTeam}</span>
              </div>
            </div>

            <div className={styles.matchDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>📅 Date</span>
                <span className={styles.detailValue}>{match.date}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>📍 Venue</span>
                <span className={styles.detailValue}>{match.venue}</span>
              </div>
            </div>

            <div className={styles.matchFooter}>
              <span className={styles.clickHint}>Click to view match →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}