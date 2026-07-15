import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GreatestHits.module.css";

import hitsHero from "../assets/images/raz/Hitsmainpage.png";

/* ================= TYPES ================= */

interface VideoItem {
  id: number;
  title: string;
  thumbnail?: string;
  url?: string;
  category?: string;
}

/* ================= API ================= */

// ✅ USE YOUR RENDER BACKEND URL
const API_URL = "https://rugby-anthem-backend.onrender.com";

export default function GreatestHits() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /* ================= FETCH ================= */

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/videos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("🎥 GREATEST HITS RECEIVED:", data);

        let hitVideos: VideoItem[] = [];

        if (Array.isArray(data) && data.length > 0) {
          // Try to filter by "hit" category first
          hitVideos = data.filter(
            (v: VideoItem) =>
              v.category &&
              v.category.toLowerCase().includes("hit")
          );

          // Fallback to "highlight" category
          if (hitVideos.length === 0) {
            hitVideos = data
              .filter(
                (v: VideoItem) =>
                  v.category &&
                  v.category.toLowerCase().includes("highlight")
              )
              .slice(0, 16);
          }

          // If still empty, take first 16 videos
          if (hitVideos.length === 0) {
            hitVideos = data.slice(0, 16);
          }

          setVideos(hitVideos.slice(0, 16));
        } else {
          setVideos([]);
          setError("No videos available right now.");
        }
      })
      .catch((err) => {
        console.error("🔴 Failed to load hit videos:", err);
        setError("Failed to load videos. Please try again.");
        setVideos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ================= SMART DISTRIBUTION ================= */

  const rightNow = videos.slice(0, 4);
  const momentum = videos.slice(4, 8);
  const feelIt = videos.slice(8, 12);
  const still = videos.slice(12, 16);

  /* ================= CARD ================= */

  const renderCard = (video: VideoItem, large = false) => (
    <div
      key={video.id}
      className={large ? styles.cardLarge : styles.card}
      onClick={() => video.url && window.open(video.url, "_blank")}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && video.url) {
          window.open(video.url, "_blank");
        }
      }}
    >
      <div
        className={large ? styles.thumbLarge : styles.thumb}
        style={{
          backgroundImage: video.thumbnail
            ? `url(${video.thumbnail})`
            : undefined,
        }}
      >
        <div className={styles.overlay} />
        <span className={styles.play}>▶</span>
      </div>

      <div className={styles.info}>
        <h3>{video.title}</h3>
      </div>
    </div>
  );

  /* ================= RENDER ================= */

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img
          src={hitsHero}
          alt="Rugby greatest hits"
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>Greatest Hits</h1>
          <p>
            The moments that make you stop,
            <br />
            react, and watch again.
          </p>
        </div>
      </header>

      {/* CONTENT COLUMN */}
      <div className={styles.contentColumn}>
        
        {/* BACK BUTTON */}
        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() => navigate("/media")}
          >
            ← Back to The Rugby Studio
          </button>
        </div>

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

        {/* 🔥 RIGHT NOW */}
        {!loading && rightNow.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Right Now</h2>
            <div className={styles.rail}>
              {rightNow.map((v) => renderCard(v))}
            </div>
          </section>
        )}

        {/* 💥 MOMENTUM */}
        {!loading && momentum.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Momentum Shifters</h2>
            <div className={styles.grid}>
              {momentum.map((v) => renderCard(v, true))}
            </div>
          </section>
        )}

        {/* 🔊 FEEL IT */}
        {!loading && feelIt.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Feel It</h2>
            <div className={styles.rail}>
              {feelIt.map((v) => renderCard(v))}
            </div>
          </section>
        )}

        {/* 🧱 STILL HITS */}
        {!loading && still.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Still Hits</h2>
            <div className={styles.gridCompact}>
              {still.map((v) => renderCard(v))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && videos.length === 0 && (
          <p className={styles.empty}>
            No hits available yet — check back soon.
          </p>
        )}
      </div>
    </main>
  );
}