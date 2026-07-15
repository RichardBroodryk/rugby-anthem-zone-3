import { useEffect, useState } from "react";
import styles from "./NewsHubPage.module.css";

import newsHero from "../assets/images/raz/news-hero.png";
import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

/* ================= TYPES ================= */

type NewsItem = {
  id: number | string;
  title: string;
  excerpt: string;
  source: string;
  time: string;
  url: string;
  category: string;
  tags: string[];
  featured?: boolean;
  publishedAt?: string | null;
  image?: string | null;
};

/* ================= API ================= */

// ✅ YOUR RENDER BACKEND URL
const API_URL = "https://rugby-anthem-backend.onrender.com";

console.log("🔗 API_URL:", API_URL);

export default function NewsHubPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  /* ================= FETCH ================= */

  const fetchNews = () => {
    setLoading(true);
    setError(null);
    
    fetch(`${API_URL}/api/news`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("🔥 FRONTEND RECEIVED:", data);

        if (Array.isArray(data)) {
          setNews(data);
          setLastUpdated(new Date().toLocaleTimeString());
          
          if (data.length === 0) {
            console.log("📭 API returned empty - clearing news feed");
            setError("No news available right now.");
          } else {
            setError(null);
          }
        } else {
          console.warn("⚠️ Invalid response format - expected array");
          setNews([]);
          setError("Invalid data format received");
        }
      })
      .catch((err) => {
        console.warn("🔴 Fetch failed", err);
        setNews([]);
        setError("Failed to load news. Please try again.");
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  /* ================= MANUAL REFRESH ================= */

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  /* ================= AUTO REFRESH (10 minutes) ================= */

  useEffect(() => {
    fetchNews();
    
    // Refresh every 30 minutes (1800,000 ms)
    const interval = setInterval(fetchNews, 1800000);
    return () => clearInterval(interval);
  }, []);

  /* ================= SORT ================= */

  const sorted = [...news].sort((a, b) => {
    const timeA = new Date(a.publishedAt || 0).getTime();
    const timeB = new Date(b.publishedAt || 0).getTime();
    return timeB - timeA;
  });

  /* ================= FILTER ================= */

  const categories = [
    { id: "all", label: "All" },
    { id: "breaking", label: "Breaking" },
    { id: "transfers", label: "Transfers" },
    { id: "injuries", label: "Injuries" },
    { id: "interviews", label: "Interviews" },
    { id: "press", label: "Press" },
    { id: "rumors", label: "Rumors" },
  ];

  const filtered =
    activeCategory === "all"
      ? sorted
      : sorted.filter((n) => n.category === activeCategory);

  const featured =
    activeCategory === "all"
      ? sorted.filter((n) => n.featured).slice(0, 3)
      : [];

  /* ================= HELPERS ================= */

  const isLive = (time: string) => {
    return time.includes("h") || time === "Just now";
  };

  /* ================= RENDER ================= */

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* HERO */}
        <header className={styles.hero}>
          <img src={newsHero} alt="" className={styles.heroImage} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroText}>
            <h1>Breaking Rugby News</h1>
            <p>
              Verified reporting, confirmed updates,
              <br />
              and global rugby coverage — as it happens.
            </p>
          </div>
        </header>

        {/* INTRO */}
        <section className={styles.intro}>
          <p>
            This is the global rugby news surface. Stories here reflect
            confirmed reports, official announcements, and major
            developments across the international game.
          </p>

          {/* LAST UPDATED & REFRESH BUTTON */}
          <div className={styles.controls}>
            {lastUpdated && (
              <div className={styles.updated}>
                Last updated: {lastUpdated}
              </div>
            )}
            
            <button 
              onClick={handleRefresh} 
              className={styles.refreshBtn}
              disabled={refreshing || loading}
            >
              {refreshing || loading ? '🔄 Refreshing...' : '🔄 Refresh News'}
            </button>
          </div>
          
          {/* ERROR MESSAGE */}
          {error && (
            <div className={styles.error}>
              ⚠️ {error}
            </div>
          )}
        </section>

        {/* CATEGORIES */}
        <nav className={styles.categories}>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`${styles.categoryBtn} ${
                activeCategory === c.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>

        {/* FEATURED */}
        {featured.length > 0 && (
          <section className={styles.featured}>
            <h2>Top Stories</h2>
            <div className={styles.featuredGrid}>
              {featured.map((item) => (
                <article key={item.id} className={styles.featuredCard}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.image}
                    />
                  )}
                  <span className={styles.meta}>
                    {item.source} • {item.time}
                    {isLive(item.time) && (
                      <span className={styles.live}>LIVE</span>
                    )}
                  </span>
                  <a
                    href={item.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{item.title}</h3>
                  </a>
                  <p>{item.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* FEED */}
        <section className={styles.feed}>
          {loading && (
            <div className={styles.empty}>Loading news...</div>
          )}

          {!loading && filtered.length === 0 && !error && (
            <div className={styles.empty}>
              No news available right now.
            </div>
          )}

          {!loading && filtered.length === 0 && error && (
            <div className={styles.empty}>
              {error}
            </div>
          )}

          {!loading &&
            filtered.map((item) => (
              <article key={item.id} className={styles.card}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.image}
                  />
                )}
                <span className={styles.meta}>
                  {item.source} • {item.time}
                  {isLive(item.time) && (
                    <span className={styles.live}>LIVE</span>
                  )}
                </span>
                <a
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{item.title}</h3>
                </a>
                <p>{item.excerpt}</p>
                <div className={styles.tags}>
                  {item.tags?.map((tag, i) => (
                    <span key={i}>#{tag}</span>
                  ))}
                </div>
              </article>
            ))}
        </section>
      </main>
    </PageWrapper>
  );
}