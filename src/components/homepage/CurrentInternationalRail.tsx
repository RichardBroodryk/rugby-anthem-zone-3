import { useEffect, useMemo, useState } from "react";
import styles from "./CurrentInternationalRail.module.css";

import AutoContentRail from "../ui/AutoContentRail";
import WeekendMatchRailCard from "./WeekendMatchRailCard";

import { getMatches } from "../../data/matchesAdapter";
import type { MatchData } from "../../data/matches/types";

const SECONDARY_RAIL_COMPETITIONS = new Set<string>([
  "world-rugby-nations-cup",
  "pacific-nations",
  "womens-internationals",
  "wxv1",
]);

export default function CurrentInternationalRail() {
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

  const currentMatches = useMemo(() => {
    return matches
      .filter((match) => {
        if (!SECONDARY_RAIL_COMPETITIONS.has(match.competitionId)) {
          return false;
        }

        return match.state === "upcoming";
      })
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }, [matches]);

  if (loading || currentMatches.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Tier 2 & Women's International Rugby</h2>
          <p>
            Upcoming World Rugby Nations Cup and Women's internationals
          </p>
        </div>
      </div>

      <AutoContentRail autoAdvance className={styles.rail}>
        {currentMatches.map((match) => (
          <WeekendMatchRailCard
            key={match.id}
            match={match}
          />
        ))}
      </AutoContentRail>
    </section>
  );
}