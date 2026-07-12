import { useEffect, useMemo, useState } from "react";
import styles from "./WeekendMatchesRail.module.css";

import AutoContentRail from "../ui/AutoContentRail";
import WeekendMatchRailCard from "./WeekendMatchRailCard";

import { getMatches } from "../../data/matchesAdapter";
import type { MatchData } from "../../data/matches/types";

export default function WeekendMatchesRail() {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadMatches() {
      try {
        const data = await getMatches();

        if (mounted) {
          setMatches(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadMatches();

    return () => {
      mounted = false;
    };
  }, []);

  const currentRoundMatches = useMemo(() => {
    return matches
      .filter(
        (match) =>
          match.competitionId === "nations-championship" &&
          match.round === "Round 3" &&
          match.state === "upcoming"
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [matches]);

  if (loading || currentRoundMatches.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Weekend Test Matches</h2>
          <p>18 July • Nations Championship Round 3</p>
        </div>
      </div>

      <AutoContentRail autoAdvance className={styles.rail}>
        {currentRoundMatches.map((match) => (
          <WeekendMatchRailCard
            key={match.id}
            match={match}
          />
        ))}
      </AutoContentRail>
    </section>
  );
}