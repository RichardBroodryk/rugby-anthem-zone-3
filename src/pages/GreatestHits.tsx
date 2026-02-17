import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GreatestHits.module.css";
import hitsHero from "../assets/images/raz/Hitsmainpage.png";

interface VideoItem {
  id: number;
  title: string;
  thumbnail?: string;
  url?: string;
  category?: string;
}

export default function GreatestHits() {
  const [rightNow, setRightNow] = useState<VideoItem[]>([]);
  const [momentum, setMomentum] = useState<VideoItem[]>([]);
  const [crowd, setCrowd] = useState<VideoItem[]>([]);
  const [still, setStill] = useState<VideoItem[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/videos")
      .then((res) => res.json())
      .then((data) => {
        let hitVideos: VideoItem[] = data.filter(
          (video: VideoItem) =>
            video.category &&
            video.category.toLowerCase() === "hit"
        );

        // Fallback: if no hits, use highlights
        if (hitVideos.length === 0) {
          hitVideos = data
            .filter(
              (video: VideoItem) =>
                video.category &&
                video.category.toLowerCase() === "highlight"
            )
            .slice(0, 16);
        }

        // Distribute across sections
        setRightNow(hitVideos.slice(0, 4));
        setMomentum(hitVideos.slice(4, 8));
        setCrowd(hitVideos.slice(8, 12));
        setStill(hitVideos.slice(12, 16));
      })
      .catch((err) => {
        console.error("Failed to load hit videos:", err);
      });
  }, []);

  const renderCard = (video: VideoItem, large = false) => (
    <div
      key={video.id}
      className={large ? styles.hitCardLarge : styles.hitCard}
      onClick={() => {
        if (video.url) {
          window.open(video.url, "_blank");
        }
      }}
      style={{ cursor: "pointer" }}
    >
      <div
        className={large ? styles.thumbnailLarge : styles.thumbnail}
        style={{
          backgroundImage: video.thumbnail
            ? `url(${video.thumbnail})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className={styles.hitInfo}>
        <strong>{video.title}</strong>
      </div>
    </div>
  );

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header className={styles.hero}>
        <img src={hitsHero} alt="" className={styles.heroImage} />

        <div className={styles.heroText}>
          <h1>Greatest Hits</h1>
          <p>
            The moments that make you stop,
            <br />
            react, and watch again.
          </p>
        </div>
      </header>

      {/* BACK BUTTON */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/media")}
        >
          ← Back to The Rugby Studio
        </button>
      </div>

      {/* RIGHT NOW */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Right Now</h2>
        <div className={styles.strip}>
          {rightNow.map((video) => renderCard(video))}
        </div>
      </section>

      {/* MOMENTUM SHIFTERS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Momentum Shifters</h2>
        <div className={styles.grid}>
          {momentum.map((video) => renderCard(video, true))}
        </div>
      </section>

      {/* FEEL IT */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Feel It</h2>
        <div className={styles.strip}>
          {crowd.map((video) => renderCard(video))}
        </div>
      </section>

      {/* STILL HITS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Still Hits</h2>
        <div className={styles.grid}>
          {still.map((video) => renderCard(video, true))}
        </div>
      </section>
    </main>
  );
}
