import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MatchVideosPage.module.css";

import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

import matchVideosHero from "../assets/images/raz/Matchhighlightsmainpage.png";

type VideoCategory =
  | "highlights"
  | "analysis"
  | "interviews"
  | "behind-scenes";

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

const categories: { id: VideoCategory; label: string }[] = [
  { id: "highlights", label: "Match Highlights" },
  { id: "analysis", label: "Expert Analysis" },
  { id: "interviews", label: "Player Interviews" },
  { id: "behind-scenes", label: "Behind the Scenes" },
];

export default function MatchVideosPage() {
  const [activeCategory, setActiveCategory] =
    useState<VideoCategory>("highlights");

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        console.error("Failed to load videos:", err);
      });
  }, []);

  const filteredVideos = videos.filter((video) => {
    const backendCategory = video.category?.toLowerCase();

    if (!backendCategory && activeCategory === "highlights") {
      return true;
    }

    if (
      backendCategory === "highlight" &&
      activeCategory === "highlights"
    ) {
      return true;
    }

    return backendCategory === activeCategory;
  });

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* HERO */}
        <header className={styles.hero}>
          <img
            src={matchVideosHero}
            alt=""
            className={styles.heroImage}
          />

          <div className={styles.heroText}>
            <h1>Match Videos</h1>

            <p>
              Highlights, analysis, interviews and
              behind-the-scenes coverage from across
              the rugby world.
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

        {/* FEATURED */}
        <section className={styles.featured}>
          <div
            className={styles.featuredThumbnail}
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=FykXCpCuhNM",
                "_blank"
              )
            }
            style={{
              backgroundImage:
                "url(https://img.youtube.com/vi/FykXCpCuhNM/hqdefault.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
          >
            <span className={styles.featuredDuration}>
              Final
            </span>
          </div>

          <div className={styles.featuredInfo}>
            <span className={styles.featuredLabel}>
              Featured Match
            </span>

            <h2>
              Rugby World Cup 2023 Final —
              Highlights
            </h2>

            <p>
              Relive the epic clash between South
              Africa and New Zealand in the 2023
              Rugby World Cup Final.
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

        {/* VIDEO GRID */}
        <section className={styles.grid}>
          {filteredVideos.map((video) => (
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
                <h3>{video.title}</h3>

                <div className={styles.meta}>
                  <span>{video.views || ""}</span>
                  <span>{video.date || ""}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* PREMIUM */}
        <section className={styles.callout}>
          <h3>Premium Video Access</h3>

          <p>
            Extended highlights, ad-light viewing,
            and exclusive rugby documentaries are
            available with Premium membership.
          </p>
        </section>
      </main>
    </PageWrapper>
  );
}