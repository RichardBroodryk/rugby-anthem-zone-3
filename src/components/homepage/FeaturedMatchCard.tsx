import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FeaturedMatchCard.module.css";

import type { MatchData } from "../../data/matches/types";
import { getTeamImage } from "../../utils/teamImageResolver";

interface FeaturedMatch extends MatchData {
  displayHomeImage: string;
  displayAwayImage: string;
}

interface FeaturedMatchCardProps {
  matches: MatchData[];
  loading: boolean;
}

/* ==================================================
   COUNTDOWN
   ================================================== */

function formatCountdown(match: MatchData): string {
  // If no startTime or it's explicitly "TBD", show TBC
  if (!match.startTime || match.startTime === "TBD") {
    return "Kick-off time TBC";
  }

  // Build the full date using match.date + match.startTime
  const target = new Date(`${match.date}T${match.startTime}`).getTime();
  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    return "Starting now";
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/* ==================================================
   COMPETITION LABEL
   ================================================== */

function getCompetitionLabel(match: MatchData): string {
  if (match.tournament) {
    return match.tournament;
  }
  return "Rugby Match";
}

/* ==================================================
   DATE DISPLAY
   ================================================== */

function formatDate(match: MatchData): string {
  if (!match.startTime) {
    return match.date;
  }

  // If startTime is "TBD", just show the date
  if (match.startTime === "TBD") {
    return new Date(`${match.date}T00:00:00`).toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return new Date(`${match.date}T${match.startTime}`).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ==================================================
   COMPONENT
   ================================================== */

export default function FeaturedMatchCard({ matches, loading }: FeaturedMatchCardProps) {
  const navigate = useNavigate();
  const [now, setNow] = useState(Date.now());

  /* ==================================================
     COUNTDOWN CLOCK
     ================================================== */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* ==================================================
     FEATURED MATCH SELECTION
     ================================================== */

  const featuredMatches = useMemo<FeaturedMatch[]>(() => {
    // Step 1: Build one array of all upcoming matches
    const upcoming = matches
      .filter((match) => {
        const reasons: string[] = [];

        if (match.state === "final") {
          reasons.push("final");
        }

        if (match.state === "live") {
          reasons.push("live");
        }

        if (match.state === "starting") {
          reasons.push("starting");
        }

        // Build kick-off time using match.date + match.startTime
        let kickOff: number;

        if (match.startTime && match.startTime !== "TBD") {
          kickOff = new Date(`${match.date}T${match.startTime}`).getTime();
        } else {
          // No kick-off time yet. Treat as midday so upcoming fixtures still appear.
          kickOff = new Date(`${match.date}T12:00:00`).getTime();
        }

        if (!(kickOff > now)) {
          reasons.push(`kickOff invalid (${match.startTime || "no time"})`);
        }

        return reasons.length === 0;
      })
      .sort((a, b) => {
        const aTime = a.startTime && a.startTime !== "TBD"
          ? new Date(`${a.date}T${a.startTime}`).getTime()
          : new Date(`${a.date}T12:00:00`).getTime();

        const bTime = b.startTime && b.startTime !== "TBD"
          ? new Date(`${b.date}T${b.startTime}`).getTime()
          : new Date(`${b.date}T12:00:00`).getTime();

        return aTime - bTime;
      });

    // Step 2: Split them into two groups
    const domestic = upcoming.filter(
      (match) =>
        match.competitionId === "sa-nz-rival-tour"
    );

    const international = upcoming.filter(
      (match) =>
        match.competitionId !== "sa-nz-rival-tour"
    );

    // Step 3: Take the first domestic match
    const featuredDomestic = domestic[0];

    // Step 4: Take the first international match
    const featuredInternational = international[0];

    // Step 5: Build the featured rail in the order you want
    const featured = [
      featuredDomestic,
      featuredInternational,
    ].filter(Boolean);

    // Step 6: Map the images exactly as you already do
    return featured.map((match) => ({
      ...match,
      displayHomeImage: getTeamImage(match.home.name),
      displayAwayImage: getTeamImage(match.away.name),
    }));
  }, [matches, now]);

  /* ==================================================
     CLICK
     ================================================== */

  const handleMatchClick = (matchId: number) => {
    navigate(`/match/${matchId}`);
  };

  /* ==================================================
     LOADING
     ================================================== */

  if (loading && matches.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>⚡ Upcoming Featured Matches</h2>
          <p>Don't miss the action</p>
        </div>
        <div className={styles.matchesGrid}>
          <div className={styles.matchCard}>Loading featured matches...</div>
        </div>
      </section>
    );
  }

  /* ==================================================
     EMPTY STATE
     ================================================== */

  if (featuredMatches.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>⚡ Upcoming Featured Matches</h2>
          <p>Don't miss the action</p>
        </div>
        <div className={styles.matchesGrid}>
          <div className={styles.matchCard}>No upcoming featured matches available.</div>
        </div>
      </section>
    );
  }

  /* ==================================================
     RENDER
     ================================================== */

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>⚡ Upcoming Featured Matches</h2>
        <p>Don't miss the action</p>
      </div>

      <div className={styles.matchesGrid}>
        {featuredMatches.map((match) => (
          <div
            key={match.id}
            className={styles.matchCard}
            onClick={() => handleMatchClick(match.id)}
          >
            {/* COMPETITION */}
            <div className={styles.competitionBadge}>{getCompetitionLabel(match)}</div>

            {/* TEAMS */}
            <div className={styles.teamsContainer}>
              {/* HOME */}
              <div className={styles.teamBlock}>
                <div className={styles.flagWrapper}>
                  {match.displayHomeImage ? (
                    <img src={match.displayHomeImage} alt={match.home.name} className={styles.flag} />
                  ) : (
                    <div className={styles.flag} />
                  )}
                </div>
                <span className={styles.teamName}>{match.home.name}</span>
              </div>

              {/* VS */}
              <div className={styles.vsContainer}>
                <span className={styles.vsBadge}>VS</span>
              </div>

              {/* AWAY */}
              <div className={styles.teamBlock}>
                <div className={styles.flagWrapper}>
                  {match.displayAwayImage ? (
                    <img src={match.displayAwayImage} alt={match.away.name} className={styles.flag} />
                  ) : (
                    <div className={styles.flag} />
                  )}
                </div>
                <span className={styles.teamName}>{match.away.name}</span>
              </div>
            </div>

            {/* COUNTDOWN */}
            <div className={styles.matchDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>⏱ Kick-off</span>
                <span className={styles.detailValue}>{formatCountdown(match)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>📅 Date</span>
                <span className={styles.detailValue}>{formatDate(match)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>📍 Venue</span>
                <span className={styles.detailValue}>{match.venue}</span>
              </div>
            </div>

            {/* FOOTER */}
            <div className={styles.matchFooter}>
              <span className={styles.clickHint}>Click to view match →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}