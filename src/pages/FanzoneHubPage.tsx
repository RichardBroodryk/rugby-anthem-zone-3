import { useNavigate } from "react-router-dom";

import styles from "./FanzoneHubPage.module.css";

import PageWrapper from "../components/layout/PageWrapper";
import AutoContentRail from "../components/ui/AutoContentRail";

import razLight from "../assets/images/raz/razlight2.png";

import heroImage from "../assets/images/raz/fanzone-hub.png";

import loyaltyImg from "../assets/images/raz/fanzone-loyalty.png";
import audioImg from "../assets/images/raz/pay-per-audio.jpg";
import ppvImg from "../assets/images/raz/fanzone-ppv.png";
import myTeamsImg from "../assets/images/raz/my-rugby-hero.png";

export default function FanzoneHubPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* ================= HERO ================= */}

        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <div className={styles.heroTitleBlock}>
              <h1>Fanzone</h1>
            </div>

            <p className={styles.heroSubtitle}>
              Loyalty, exclusive experiences, live match audio and premium
              access designed for supporters who want to stay closer to the
              international game.
            </p>
          </div>
        </header>

        {/* ================= INTRO ================= */}

        <section className={styles.intro}>
          <p>
            Fanzone brings together premium supporter experiences in one place.
            From loyalty rewards and live match audio to exclusive content and
            personalised rugby journeys, every feature is designed to deepen
            your connection with the sport while keeping the experience clean,
            simple and rugby-first.
          </p>
        </section>

        {/* ================= FANZONE RAIL ================= */}

        <section className={styles.railSection}>
          <AutoContentRail autoAdvance>
            {/* Loyalty */}

            <div
              className={styles.featureCard}
              style={{ backgroundImage: `url(${loyaltyImg})` }}
              onClick={() => navigate("/fanzone/loyalty")}
            >
              <div className={styles.featureOverlay} />
              <h2>Loyalty Card Program</h2>
            </div>

            {/* Live Match Audio */}

            <div
              className={styles.audioCard}
              onClick={() => navigate("/fanzone/audio")}
            >
              <img
                src={audioImg}
                alt="Live Match Audio"
                className={styles.audioImage}
              />

              <div className={styles.audioText}>
                <h2>Live Match Audio</h2>
              </div>
            </div>

            {/* Pay Per View */}

            <div
              className={styles.featureCard}
              style={{ backgroundImage: `url(${ppvImg})` }}
              onClick={() => navigate("/fanzone/ppv")}
            >
              <div className={styles.featureOverlay} />
              <h2>Pay Per View</h2>
            </div>

            {/* My Teams */}

            <div
              className={styles.featureCard}
              style={{ backgroundImage: `url(${myTeamsImg})` }}
              onClick={() => navigate("/my-teams")}
            >
              <div className={styles.featureOverlay} />
              <h2>My Teams</h2>
            </div>
          </AutoContentRail>
        </section>
      </main>
    </PageWrapper>
  );
}