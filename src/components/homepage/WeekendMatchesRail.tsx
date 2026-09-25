import { useMemo } from "react";
import styles from "./WeekendMatchesRail.module.css";

import AutoContentRail from "../ui/AutoContentRail";
import WeekendMatchRailCard from "./WeekendMatchRailCard";

import type { MatchData } from "../../data/matches/types";

interface WeekendMatchesRailProps {
  matches: MatchData[];
  loading: boolean;
}

/* ==================================================
   MATCH IDENTITY
   ================================================== */

function normalizeTeamName(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "");
}

function buildMatchIdentity(match: MatchData): string {
  return [
    normalizeTeamName(match.home.name),
    normalizeTeamName(match.away.name),
    match.date?.split("T")[0] || "",
  ].join("|");
}

export default function WeekendMatchesRail({
  matches,
  loading,
}: WeekendMatchesRailProps) {
  /* ==================================================
     FIND CURRENT UPCOMING WEEKEND MATCHES
     ================================================== */

  const currentWeekendMatches = useMemo(() => {
    const now = new Date();

    // Match the same upcoming-match pool used by the
    // Featured Match block so we can exclude those cards
    // from the Weekend Matches rail.
    const upcomingForFeatured = matches
      .filter((match) => {
        if (
          match.state === "final" ||
          match.state === "live" ||
          match.state === "starting"
        ) {
          return false;
        }

        let kickOff: number;

        if (match.startTime && match.startTime !== "TBD") {
          kickOff = new Date(
            `${match.date}T${match.startTime}`
          ).getTime();
        } else {
          kickOff = new Date(
            `${match.date}T12:00:00`
          ).getTime();
        }

        return kickOff > now.getTime();
      })
      .sort((a, b) => {
        const aTime =
          a.startTime && a.startTime !== "TBD"
            ? new Date(`${a.date}T${a.startTime}`).getTime()
            : new Date(`${a.date}T12:00:00`).getTime();

        const bTime =
          b.startTime && b.startTime !== "TBD"
            ? new Date(`${b.date}T${b.startTime}`).getTime()
            : new Date(`${b.date}T12:00:00`).getTime();

        return aTime - bTime;
      });

    // These are the two matches already displayed in
    // the Featured Match block.
    //
    // Use team + date identity rather than only the local
    // route ID so that Highlightly/local identity differences
    // cannot cause the same fixture to appear twice.
    const featuredMatchKeys = new Set(
      upcomingForFeatured
        .slice(0, 2)
        .map((match) => buildMatchIdentity(match))
    );

    /* -----------------------------------------------
       WEEKEND / INTERNATIONAL MATCH POOL
       ----------------------------------------------- */

    const upcoming = matches
      .filter((match) => {
        // Do not show completed or currently active matches here
        if (
          match.state === "final" ||
          match.state === "live" ||
          match.state === "starting"
        ) {
          return false;
        }

        // Do not duplicate the Featured Match cards.
        if (featuredMatchKeys.has(buildMatchIdentity(match))) {
          return false;
        }

        // Only matches with valid dates
        if (!match.date) {
          return false;
        }

        // This rail is intended for international/test rugby
        // rather than domestic club fixtures
        if (match.competitionId === "unknown") {
          return false;
        }

        const competition = match.competitionId.toLowerCase();
        const tournament = (match.tournament || "").toLowerCase();

        const isInternational =
          competition.includes("nations") ||
          competition.includes("international") ||
          competition.includes("test") ||
          tournament.includes("nations") ||
          tournament.includes("international") ||
          tournament.includes("test");

        if (!isInternational) {
          return false;
        }

        const matchDate = new Date(`${match.date}T00:00:00`);

        return matchDate >= now;
      })
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

    if (upcoming.length === 0) {
      return [];
    }

    // Determine the date of the first remaining upcoming
    // international match.
    const firstDate = new Date(`${upcoming[0].date}T00:00:00`);
    const firstDay = firstDate.getDay();

    // Weekend window: Friday → Sunday
    const weekendStart = new Date(firstDate);
    const weekendEnd = new Date(firstDate);

    if (firstDay === 0) {
      // Sunday
      weekendStart.setDate(weekendStart.getDate() - 2);
    } else if (firstDay === 6) {
      // Saturday
      weekendStart.setDate(weekendStart.getDate() - 1);
    } else if (firstDay === 5) {
      // Friday
      // Already at Friday
    } else {
      // Monday–Thursday: find the upcoming Friday
      const daysUntilFriday = 5 - firstDay;
      weekendStart.setDate(
        weekendStart.getDate() + daysUntilFriday
      );
    }

    // Sunday is the end of the weekend window
    weekendEnd.setDate(weekendStart.getDate() + 2);

    weekendStart.setHours(0, 0, 0, 0);
    weekendEnd.setHours(23, 59, 59, 999);

    return upcoming.filter((match) => {
      const matchDate = new Date(`${match.date}T00:00:00`);

      return (
        matchDate >= weekendStart &&
        matchDate <= weekendEnd
      );
    });
  }, [matches]);

  /* ==================================================
     DYNAMIC HEADING
     ================================================== */

  const heading = useMemo(() => {
    if (currentWeekendMatches.length === 0) {
      return "Weekend Test Matches";
    }

    const firstMatch = currentWeekendMatches[0];
    const tournament =
      firstMatch.tournament || "International Rugby";

    const firstDate = new Date(
      `${firstMatch.date}T00:00:00`
    );

    const formattedDate = firstDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

    return `${formattedDate} • ${tournament}`;
  }, [currentWeekendMatches]);

  /* ==================================================
     EMPTY / LOADING
     ================================================== */

  if (loading || currentWeekendMatches.length === 0) {
    return null;
  }

  /* ==================================================
     RENDER
     ================================================== */

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Weekend Test Matches</h2>
        <p>{heading.replace("Weekend Test Matches", "")}</p>
      </div>

      <AutoContentRail autoAdvance className={styles.rail}>
        {currentWeekendMatches.map((match) => (
          <WeekendMatchRailCard
            key={match.id}
            match={match}
          />
        ))}
      </AutoContentRail>
    </section>
  );
}