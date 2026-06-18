import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FeaturedMatchCard.module.css";

import { getMatches } from "../../data/matchesAdapter";
import { flagMap } from "../../data/flagMap";

import type { MatchData } from "../../data/matches/types";

export default function FeaturedMatchCard() {
  const navigate = useNavigate();

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

  const featuredMatch = useMemo(() => {
    if (!matches.length) return null;

    const now = new Date();

    const upcoming = matches
      .filter(
        (m) =>
          !m.score &&
          new Date(m.date).getTime() >= now.getTime()
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

    return upcoming[0] || null;
  }, [matches]);

  if (loading || !featuredMatch) {
    return null;
  }

  const homeFlag =
    flagMap[featuredMatch.home.country];

  const awayFlag =
    flagMap[featuredMatch.away.country];

  const formattedDate = new Date(
    featuredMatch.date
  ).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section
      className={styles.card}
      onClick={() =>
        navigate(`/match/${featuredMatch.id}`)
      }
    >
      <div className={styles.badge}>
        FEATURED MATCH
      </div>

      <div className={styles.hero}>
        <div className={styles.left}>
          {homeFlag && (
            <img
              src={homeFlag}
              alt={featuredMatch.home.name}
              className={styles.heroImage}
            />
          )}
        </div>

        <div className={styles.right}>
          {awayFlag && (
            <img
              src={awayFlag}
              alt={featuredMatch.away.name}
              className={styles.heroImage}
            />
          )}
        </div>

        <div className={styles.overlay}>
          <div className={styles.vs}>
            VS
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {featuredMatch.home.name}
          {" "}
          vs
          {" "}
          {featuredMatch.away.name}
        </h2>

        <div className={styles.meta}>
          {formattedDate}
        </div>

        <div className={styles.meta}>
          {featuredMatch.venue}
        </div>

        <div className={styles.meta}>
          {featuredMatch.tournament}
        </div>

        <div className={styles.cta}>
          Tap to View Match →
        </div>
      </div>
    </section>
  );
}