import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyFeedPage.module.css";

import { loadMyTeams } from "../utils/myTeamsStorage";
import { teamsMeta } from "../data/teamsMeta";
import { newsData, NewsItem } from "../data/newsData";

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function MyFeedPage() {
  const navigate = useNavigate();

  const [teamNames, setTeamNames] = useState<string[]>([]);

  /* ================= LOAD USER TEAMS ================= */

  useEffect(() => {
    const stored = loadMyTeams();
    const ids = [...stored.men, ...stored.women];

    const teams = teamsMeta
      .filter((t) => ids.includes(t.id))
      .map((t) => t.name);

    setTeamNames(teams);
  }, []);

  /* ================= DERIVE FEED ================= */

  const myFeed: NewsItem[] = useMemo(() => {
    const tags = teamNames.map(normalize);

    return newsData.filter((item) =>
      item.tags.some((tag) =>
        tags.includes(normalize(tag))
      )
    );
  }, [teamNames]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>My Feed</h1>
        <p>Updates shaped around the teams you follow.</p>
      </header>

      {/* ================= BACK ================= */}
      <div className={styles.backRow}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/my-teams")}
        >
          ← Back to My Teams
        </button>
      </div>

      <section className={styles.feed}>
        {teamNames.length === 0 ? (
          <div className={styles.empty}>
            <p>Select teams to personalise your feed.</p>
          </div>
        ) : myFeed.length === 0 ? (
          <div className={styles.empty}>
            <p>No stories yet for your teams.</p>
          </div>
        ) : (
          myFeed.map((item) => (
            <article key={item.id} className={styles.feedItem}>
              <div className={styles.meta}>
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}