import { useMemo } from "react";
import styles from "./CurrentInternationalRail.module.css";

import AutoContentRail from "../ui/AutoContentRail";
import WeekendMatchRailCard from "./WeekendMatchRailCard";

import type { MatchData } from "../../data/matches/types";

interface CurrentInternationalRailProps {
  matches: MatchData[];
  loading: boolean;
}

const SECONDARY_RAIL_COMPETITIONS = new Set<string>([
  "world-rugby-nations-cup",
  "pacific-nations",
  "womens-internationals",
  "wxv1",
]);

export default function CurrentInternationalRail({ matches, loading }: CurrentInternationalRailProps) {
  const currentMatches = useMemo(() => {
    return matches
      .filter((match) => {
        if (!SECONDARY_RAIL_COMPETITIONS.has(match.competitionId)) {
          return false;
        }

        return match.state === "upcoming";
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [matches]);

  if (loading || currentMatches.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Tier 2 & Women's International Rugby</h2>
          <p>Upcoming World Rugby Nations Cup and Women's internationals</p>
        </div>
      </div>

      <AutoContentRail autoAdvance className={styles.rail}>
        {currentMatches.map((match) => (
          <WeekendMatchRailCard key={match.id} match={match} />
        ))}
      </AutoContentRail>
    </section>
  );
}