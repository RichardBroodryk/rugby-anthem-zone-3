import { useParams, useNavigate } from "react-router-dom";
import styles from "./StadiumMatchdayPage.module.css";

import { stadiums } from "../data/stadiums";

/* ================= HERO IMAGES (MUST BE AT TOP) ================= */

import aviva from "../assets/images/stadiums/aviva.jpg";
import capetown from "../assets/images/stadiums/capetown-stadium.jpg";
import eden from "../assets/images/stadiums/eden-park.jpg";
import ellis from "../assets/images/stadiums/ellis-park.jpg";
import fnb from "../assets/images/stadiums/fnb-stadium.jpg";
import murrayfield from "../assets/images/stadiums/murrayfield.jpg";
import paris from "../assets/images/stadiums/paris-stade-de-france.jpg";
import principality from "../assets/images/stadiums/principality-stadium.jpg";
import olimpico from "../assets/images/stadiums/stadio-olimpico.jpg";
import twickenham from "../assets/images/stadiums/twickenham.jpg";

/* ================= CARD IMAGES ================= */

import ticketsImg from "../assets/images/raz/tickets-page.png";
import flightsImg from "../assets/images/raz/flights-page.png";
import hotelsImg from "../assets/images/raz/hotels-page.png";
import transportImg from "../assets/images/raz/transport-page.png";

/* ================= HERO MAP ================= */

const HERO_MAP: Record<string, string> = {
  aviva,
  capetown,
  "eden-park": eden,
  "ellis-park": ellis,
  "fnb-stadium": fnb,
  murrayfield,
  "stade-de-france": paris,
  principality,
  "stadio-olimpico": olimpico,
  twickenham,
};

export default function StadiumMatchdayPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return <div className={styles.error}>Invalid stadium reference</div>;
  }

  const stadium = stadiums.find((s) => s.slug === slug);

  if (!stadium) {
    return (
      <div className={styles.error}>
        Stadium not found.
        <button onClick={() => navigate("/stadiums")}>
          View all stadiums
        </button>
      </div>
    );
  }

  const hero = HERO_MAP[stadium.slug] || capetown;

  const go = (path: string) =>
    navigate(`${path}?stadium=${stadium.slug}`);

  return (
    <main className={styles.page}>
      {/* ================= HERO ================= */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Game here we come.</h1>
          <p>
            Plan your matchday at <strong>{stadium.name}</strong> —
            <br />
            tickets, travel, and arrival.
          </p>
        </div>
      </header>

      {/* ================= GRID ================= */}
      <section className={styles.grid}>
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${ticketsImg})` }}
          onClick={() => go("/tickets")}
        >
          <div className={styles.overlay} />
          <div className={styles.cardContent}>
            <h3>Secure Tickets</h3>
            <p>Official match access for this venue.</p>
            <span className={styles.cta}>Go to Tickets →</span>
          </div>
        </div>

        <div
          className={styles.card}
          style={{ backgroundImage: `url(${flightsImg})` }}
          onClick={() => go("/flights")}
        >
          <div className={styles.overlay} />
          <div className={styles.cardContent}>
            <h3>Plan Travel</h3>
            <p>Flights and long-distance travel.</p>
            <span className={styles.cta}>View Flights →</span>
          </div>
        </div>

        <div
          className={styles.card}
          style={{ backgroundImage: `url(${hotelsImg})` }}
          onClick={() => go("/hotels")}
        >
          <div className={styles.overlay} />
          <div className={styles.cardContent}>
            <h3>Book Accommodation</h3>
            <p>Stay near the stadium or city access.</p>
            <span className={styles.cta}>Browse Hotels →</span>
          </div>
        </div>

        <div
          className={styles.card}
          style={{ backgroundImage: `url(${transportImg})` }}
          onClick={() => go("/transport")}
        >
          <div className={styles.overlay} />
          <div className={styles.cardContent}>
            <h3>Local Transport</h3>
            <p>Arrival, parking, and matchday movement.</p>
            <span className={styles.cta}>Local Transport →</span>
          </div>
        </div>
      </section>
    </main>
  );
}