import { useNavigate } from "react-router-dom";
import styles from "./SecondarySplashPage.module.css";
import SplashFlagRail from "../components/splash/SplashFlagRail";
import SplashFeatureRail from "../components/splash/SplashFeatureRail";

import argentinaFlag from "../assets/images/flags/argentina.jpg";
import australiaFlag from "../assets/images/flags/australia.jpg";
import englandFlag from "../assets/images/flags/england.png";
import fijiFlag from "../assets/images/flags/fiji.jpg";
import franceFlag from "../assets/images/flags/france.jpg";
import irelandFlag from "../assets/images/flags/ireland.jpg";
import italyFlag from "../assets/images/flags/italy.jpg";
import japanFlag from "../assets/images/flags/japan.jpg";
import newZealandFlag from "../assets/images/flags/new-zealand.jpg";
import scotlandFlag from "../assets/images/flags/scotland.jpg";
import southAfricaFlag from "../assets/images/flags/south-africa.jpg";
import walesFlag from "../assets/images/flags/wales.jpg";

import brazilFlag from "../assets/images/flags/brazil.jpg";
import canadaFlag from "../assets/images/flags/canada.jpg";
import chileFlag from "../assets/images/flags/chile.jpg";
import georgiaFlag from "../assets/images/flags/georgia.jpg";
import germanyFlag from "../assets/images/flags/germany.jpg";
import kenyaFlag from "../assets/images/flags/kenya.jpg";
import namibiaFlag from "../assets/images/flags/namibia.jpg";
import netherlandsFlag from "../assets/images/flags/netherlands.jpg";
import portugalFlag from "../assets/images/flags/portugal.jpg";
import romaniaFlag from "../assets/images/flags/romania.jpg";
import samoaFlag from "../assets/images/flags/samoa.jpg";
import spainFlag from "../assets/images/flags/spain.jpg";
import tongaFlag from "../assets/images/flags/tonga.jpg";
import usaFlag from "../assets/images/flags/united-states-of-america.jpg";
import uruguayFlag from "../assets/images/flags/uruguay.jpg";
import zimbabweFlag from "../assets/images/flags/zimbabwe.jpg";

const tierOneFlags = [
  { name: "South Africa", src: southAfricaFlag },
  { name: "New Zealand", src: newZealandFlag },
  { name: "Ireland", src: irelandFlag },
  { name: "France", src: franceFlag },
  { name: "England", src: englandFlag },
  { name: "Scotland", src: scotlandFlag },
  { name: "Argentina", src: argentinaFlag },
  { name: "Australia", src: australiaFlag },
  { name: "Fiji", src: fijiFlag },
  { name: "Italy", src: italyFlag },
  { name: "Wales", src: walesFlag },
  { name: "Japan", src: japanFlag },
];

const tierTwoFlags = [
  { name: "Brazil", src: brazilFlag },
  { name: "Canada", src: canadaFlag },
  { name: "Chile", src: chileFlag },
  { name: "Georgia", src: georgiaFlag },
  { name: "Germany", src: germanyFlag },
  { name: "Kenya", src: kenyaFlag },
  { name: "Namibia", src: namibiaFlag },
  { name: "Netherlands", src: netherlandsFlag },
  { name: "Portugal", src: portugalFlag },
  { name: "Romania", src: romaniaFlag },
  { name: "Samoa", src: samoaFlag },
  { name: "Spain", src: spainFlag },
  { name: "Tonga", src: tongaFlag },
  { name: "United States", src: usaFlag },
  { name: "Uruguay", src: uruguayFlag },
  { name: "Zimbabwe", src: zimbabweFlag },
];

const featureItems = [
  "Notifications",
  "Anthems",
  "Tournaments",
  "Match Center",
  "Matchday Journeys",
  "The Rugby Studio",
  "Fanzone",
  "News",
  "Heritage",
  "Defining Moments",
  "Inside the Game",
  "Calendar",
  "Stadiums",
  "Merch",
];

const SecondarySplashPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.secondarySplash}>
      <div className={styles.imageLayer} />
      <div className={styles.overlay} />
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <div className={styles.railLayer}>
        <div className={styles.tierOneRail}>
          <SplashFlagRail
            items={tierOneFlags}
            direction="left"
            speed="fast"
            railTone="strong"
            ariaLabel="Tier one rugby nations"
          />
        </div>

        <div className={styles.tierTwoRail}>
          <SplashFlagRail
            items={tierTwoFlags}
            direction="right"
            speed="medium"
            railTone="soft"
            ariaLabel="Tier two rugby nations"
          />
        </div>

        <div className={styles.featureRail}>
          <SplashFeatureRail
            items={featureItems}
            direction="left"
            speed="medium"
            ariaLabel="Rugby Anthem Zone features"
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.heroStack}>
          <div className={styles.kickerRow}>
            <span className={styles.kicker}>
              INTERNATIONAL RUGBY • MATCHDAY ATMOSPHERE • ANTHEMS
            </span>
          </div>

          <header className={styles.titleSection}>
            <h1 className={styles.mainTitle}>RUGBY ANTHEM ZONE</h1>
            <p className={styles.subtitle}>
              A global home for international rugby.
            </p>
          </header>

          <section className={styles.anthemMoment}>
            <span className={styles.momentLabel}>THE ANTHEM MOMENT</span>
            <p>
              Experience the atmosphere of international rugby — sing along with
              your rivals' anthems, follow the matchday build-up, and feel the
              stadium rise before kick-off.
            </p>
          </section>

          <div className={styles.continueSection}>
            <button
              className={styles.continueButton}
              onClick={() => navigate("/welcome")}
            >
              Enter Rugby Hub
            </button>
          </div>
        </div>

        <footer className={styles.legal}>
          © 2026 Rugby Anthem Zone™. All rights reserved.
        </footer>
      </div>
    </section>
  );
};

export default SecondarySplashPage;