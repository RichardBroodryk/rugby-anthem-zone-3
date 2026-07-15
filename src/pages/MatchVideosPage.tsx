import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchVideosPage.module.css";

import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

import matchVideosHero from "../assets/images/raz/Matchhighlightsmainpage.png";

/* ================= TYPES ================= */

type VideoCategory =
  | "highlight"
  | "analysis"
  | "interview"
  | "press";

interface VideoItem {
  id: number;
  title: string;
  duration?: string;
  views?: string;
  date?: string;
  category?: string;
  url?: string;
  thumbnail?: string;
}

/* ================= CATEGORIES ================= */

const categories: { id: VideoCategory; label: string }[] = [
  { id: "highlight", label: "Match Highlights" },
  { id: "analysis", label: "Expert Analysis" },
  { id: "interview", label: "Player & Coach Interviews" },
  { id: "press", label: "Press Conferences" },
];

/* ================= API ================= */

const API_URL = "https://rugby-anthem-backend.onrender.com";

export default function MatchVideosPage() {
  const [activeCategory, setActiveCategory] =
    useState<VideoCategory>("highlight");

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /* ================= FETCH VIDEOS BY CATEGORY ================= */

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/videos?category=${activeCategory}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(`🎥 MATCH VIDEOS (${activeCategory}) RECEIVED:`, data);
        setVideos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("🔴 Failed to load videos:", err);
        setError("Failed to load videos. Please try again.");
        setVideos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeCategory]);

  /* ================= RENDER ================= */

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* HERO */}
        <header className={styles.hero}>
          <img
            src={matchVideosHero}
            alt="Match Videos"
            className={styles.heroImage}
          />

          <div className={styles.heroText}>
            <h1>Match Videos</h1>

            <p>
              Highlights, analysis, interviews and
              press conferences from across the rugby world.
            </p>
          </div>
        </header>

        {/* BACK */}
        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() => navigate("/media")}
          >
            ← Back to The Rugby Studio
          </button>
        </div>

        {/* FEATURED VIDEO - Will Jordan Try Record */}
        <section className={styles.featured}>
          <div
            className={styles.featuredThumbnail}
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=iJRY0u9jG1k",
                "_blank"
              )
            }
            style={{
              backgroundImage:
                "url(https://img.youtube.com/vi/iJRY0u9jG1k/hqdefault.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
          >
            <span className={styles.featuredDuration}>
              Record Breaker
            </span>
          </div>

          <div className={styles.featuredInfo}>
            <span className={styles.featuredLabel}>
              Featured Rugby Video
            </span>

            <h2>
              Will Jordan Try Record
            </h2>

            <p>
              One of the greatest finishers in world rugby.
              Watch Will Jordan continue rewriting the record books.
            </p>
          </div>
        </section>

        {/* CATEGORY TABS */}
        <nav className={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tab} ${
                activeCategory === cat.id
                  ? styles.active
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(cat.id)
              }
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </nav>

        {/* LOADING STATE */}
        {loading && (
          <div className={styles.empty}>Loading videos...</div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className={styles.empty}>
            ⚠️ {error}
          </div>
        )}

        {/* VIDEO GRID */}
        {!loading && !error && (
          <section className={styles.grid}>
            {videos.map((video) => (
              <div
                key={video.id}
                className={styles.card}
                onClick={() => {
                  if (video.url) {
                    window.open(video.url, "_blank");
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <div
                  className={styles.thumbnail}
                  style={{
                    backgroundImage: video.thumbnail
                      ? `url(${video.thumbnail})`
                      : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className={styles.duration}>
                    {video.duration || ""}
                  </span>
                </div>

                <div className={styles.info}>
                  {/* ✅ CATEGORY LABEL ABOVE TITLE */}
                  {video.category && (
                    <span className={styles.videoCategory}>
                      {video.category.toUpperCase()}
                    </span>
                  )}
                  <h3>{video.title}</h3>

                  <div className={styles.meta}>
                    <span>{video.views || ""}</span>
                    <span>{video.date || ""}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && videos.length === 0 && (
          <p className={styles.empty}>
            No videos found in this category yet.
          </p>
        )}

        {/* PREMIUM */}
        <section className={styles.callout}>
          <h3>RAZ Premium Video</h3>

          <p>
            Exclusive documentaries<br />
            Extended highlights<br />
            Historic matches<br />
            Ad-light viewing
          </p>
        </section>
      </main>
    </PageWrapper>
  );
}