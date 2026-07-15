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

    fetch(
      `${API_URL}/api/videos?category=hit,moment,try,tackle`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        console.log("🏉 Greatest Hits:", data);

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setVideos([]);
          setError("No videos available right now.");
        }
      })
      .catch((err) => {
        console.error(err);

        setVideos([]);
        setError("Failed to load videos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ================= FILTER BY CATEGORY (Case-Insensitive) ================= */

  const greatestHits = videos.filter(
    (v) => v.category?.toLowerCase() === "hit"
  );

  const unforgettable = videos.filter(
    (v) => v.category?.toLowerCase() === "moment"
  );

  const greatestTries = videos.filter(
    (v) => v.category?.toLowerCase() === "try"
  );

  const biggestTackles = videos.filter(
    (v) => v.category?.toLowerCase() === "tackle"
  );

  /* ================= CARD ================= */

  const renderCard = (
    video: VideoItem,
    large = false
  ) => (
    <div
      key={video.id}
      className={
        large ? styles.cardLarge : styles.card
      }
      onClick={() => {
        if (video.url) {
          window.open(video.url, "_blank");
        }
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && video.url) {
          window.open(video.url, "_blank");
        }
      }}
    >
      <div
        className={
          large ? styles.thumbLarge : styles.thumb
        }
        style={{
          backgroundImage: video.thumbnail
            ? `url(${video.thumbnail})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.overlay} />

        <span className={styles.play}>
          ▶
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
          alt="Greatest Hits"
          className={styles.heroImage}
        />

        <div className={styles.heroText}>
          <h1>Greatest Hits</h1>

          <p>
            The biggest hits, unforgettable moments,
            greatest tries and bone-crunching tackles
            from the world of rugby.
          </p>
        </div>
      </header>

      <div className={styles.contentColumn}>
        {/* BACK */}

        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() =>
              navigate("/media")
            }
          >
            ← Back to The Rugby Studio
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <div className={styles.empty}>
            Loading videos...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className={styles.empty}>
            ⚠️ {error}
          </div>
        )}

        {/* GREATEST HITS */}

        {!loading &&
          !error &&
          greatestHits.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Greatest Hits
              </h2>

              <div className={styles.rail}>
                {greatestHits.map((video) =>
                  renderCard(video)
                )}
              </div>
            </section>
          )}

        {/* UNFORGETTABLE MOMENTS */}

        {!loading &&
          !error &&
          unforgettable.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Unforgettable Moments
              </h2>

              <div className={styles.grid}>
                {unforgettable.map((video) =>
                  renderCard(video, true)
                )}
              </div>
            </section>
          )}

        {/* GREATEST TRIES */}

        {!loading &&
          !error &&
          greatestTries.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Greatest Tries
              </h2>

              <div className={styles.rail}>
                {greatestTries.map((video) =>
                  renderCard(video)
                )}
              </div>
            </section>
          )}

        {/* BIGGEST TACKLES */}

        {!loading &&
          !error &&
          biggestTackles.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Biggest Tackles
              </h2>

              <div
                className={
                  styles.gridCompact
                }
              >
                {biggestTackles.map((video) =>
                  renderCard(video)
                )}
              </div>
            </section>
          )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          videos.length === 0 && (
            <div className={styles.empty}>
              No videos available.
            </div>
          )}
      </div>
    </main>
  );
}