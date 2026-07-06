import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import styles from "./FixturesPage.module.css";

import { getMatches } from "../data/matchesAdapter";
import type { MatchData } from "../data/matches/types";

import FixtureRow from "../components/fixtures/FixtureRow";
import FixturesSectionHero from "../components/fixtures/FixturesSectionHero";

import heroBg from "../assets/images/raz/Fixtures.jpg";
import mensHero from "../assets/images/raz/mens-tournaments.png";
import womensHero from "../assets/images/raz/womens-tournaments.png";

/* ================= UTIL ================= */

function isWomenMatch(match: MatchData) {
  return (
    match.gender === "women" ||
    match.competitionId.includes("women") ||
    match.tournament.toLowerCase().includes("women") ||
    match.home.name.includes(" W") ||
    match.away.name.includes(" W")
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isUpcoming(match: MatchData) {
  return !match.score && match.state !== "final";
}

function buildTournamentRoute(match: MatchData) {
  return (
    match.tournamentInstanceId
      ? `/tournaments/${match.tournamentInstanceId}`
      : `/tournament/${match.tournament.toLowerCase().replace(/\s+/g, "-")}`
  );
}

/* ================= PAGE ================= */

export default function FixturesPage() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadFixtures() {
      try {
        const data = await getMatches({
          type: "international",
          includeAll: true,
        });

        if (mounted) {
          setMatches(data);
        }
      } catch (err) {
        console.error("Failed to load fixtures", err);
        if (mounted) {
          setMatches([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadFixtures();

    return () => {
      mounted = false;
    };
  }, []);

  const { mensFixtures, womensFixtures } = useMemo(() => {
    const upcoming = matches
      .filter(isUpcoming)
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

    return {
      mensFixtures: upcoming.filter((m) => !isWomenMatch(m)),
      womensFixtures: upcoming.filter(isWomenMatch),
    };
  }, [matches]);

  if (loading) {
    return <div className={styles.empty}>Loading fixtures...</div>;
  }

  return (
    <main className={styles.page}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Fixtures</h1>
          <p>
            Upcoming international rugby fixtures —
            <br />
            plan ahead across major tournaments and tours.
          </p>
        </div>
      </header>

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/match-center")}
        >
          ← Back to Match Center
        </button>
      </div>

      <section className={styles.section}>
        <FixturesSectionHero
          title="Men’s International Fixtures"
          backgroundImage={mensHero}
        />

        {mensFixtures.length === 0 ? (
          <div className={styles.empty}>No upcoming men’s fixtures.</div>
        ) : (
          <div className={styles.group}>
            {mensFixtures.map((m) => (
              <FixtureRow
                key={m.id}
                date={formatDate(m.date)}
                home={m.home}
                away={m.away}
                venue={m.venue}
                tournament={m.tournament}
                tournamentRoute={buildTournamentRoute(m)}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <FixturesSectionHero
          title="Women’s International Fixtures"
          backgroundImage={womensHero}
          position="top"
        />

        {womensFixtures.length === 0 ? (
          <div className={styles.empty}>No upcoming women’s fixtures.</div>
        ) : (
          <div className={styles.group}>
            {womensFixtures.map((m) => (
              <FixtureRow
                key={m.id}
                date={formatDate(m.date)}
                home={m.home}
                away={m.away}
                venue={m.venue}
                tournament={m.tournament}
                tournamentRoute={buildTournamentRoute(m)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}