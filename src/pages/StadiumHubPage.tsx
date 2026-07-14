import { useNavigate } from "react-router-dom";
import styles from "./StadiumHubPage.module.css";
import { stadiums } from "../data/stadiums";
import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

/* HERO */
import fallbackHero from "../assets/images/stadiums/capetown-stadium.jpg";

/* IMAGES */
import twickenham from "../assets/images/stadiums/twickenham.jpg";
import murrayfield from "../assets/images/stadiums/murrayfield.jpg";
import aviva from "../assets/images/stadiums/aviva.jpg";
import principality from "../assets/images/stadiums/principality-stadium.jpg";
import stadeDeFrance from "../assets/images/stadiums/paris-stade-de-france.jpg";
import olimpico from "../assets/images/stadiums/stadio-olimpico.jpg";
import edenPark from "../assets/images/stadiums/eden-park.jpg";
import ellisPark from "../assets/images/stadiums/ellis-park.jpg";
import fnbStadium from "../assets/images/stadiums/fnb-stadium.jpg";
import capetown from "../assets/images/stadiums/capetown-stadium.jpg";

/* 🔥 NEW */
import dexcomOutside from "../assets/images/stadiums/dexcom/dexcom-outside.jpg";
import stadeDesAlpesOutside from "../assets/images/stadiums/stade-des-alpes/stade-des-alpes-outside.jpg";

/* 🔥 NEW ZEALAND STADIUMS */
import wellington from "../assets/images/stadiums/wellington/wellington-hnrystadium-aerial.jpg";
import christchurch from "../assets/images/stadiums/christchurch.jpg";

const stadiumImages: Record<string, string> = {
  "twickenham": twickenham,
  "allianz-stadium": twickenham, // 🔥 ALIAS FIX

  "murrayfield": murrayfield,
  "aviva-stadium": aviva,
  "principality-stadium": principality,
  "stade-de-france": stadeDeFrance,
  "stadio-olimpico": olimpico,

  "stade-des-alpes": stadeDesAlpesOutside, // 🔥 NEW
  "dexcom": dexcomOutside, // 🔥 NEW

  "eden-park": edenPark,
  "ellis-park": ellisPark,
  "fnb-stadium": fnbStadium,
  "capetown": capetown,

  /* 🔥 NEW ZEALAND STADIUMS */
  "hnry-stadium": wellington,
  "one-nz-stadium": christchurch,
};

export default function StadiumHubPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${fallbackHero})` }}
        >
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1>Rugby Stadiums</h1>
          </div>
        </header>

        <section className={styles.grid}>
          {stadiums.map((stadium) => {
            const image =
              stadiumImages[stadium.slug] ||
              stadiumImages[stadium.aliasOf || ""];

            return (
              <div
                key={stadium.slug}
                className={styles.card}
                style={{
                  backgroundImage: image ? `url(${image})` : undefined,
                }}
                onClick={() => navigate(`/stadium/${stadium.slug}`)}
              >
                <div className={styles.overlay} />
                <div className={styles.cardContent}>
                  <h3>{stadium.name}</h3>
                  <p>
                    {stadium.city ? `${stadium.city}, ` : ""}
                    {stadium.country}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </PageWrapper>
  );
}