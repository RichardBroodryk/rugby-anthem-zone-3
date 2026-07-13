import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PPVPage.module.css";

import { recordLoyaltyAction } from "../utils/loyaltyHooks";
import heroImage from "../assets/images/raz/fanzone-ppv.png";

import LiveNowBar from "../components/live/LiveNowBar";
import PageWrapper from "../components/layout/PageWrapper";
import razLight from "../assets/images/raz/razlight2.png";

import { broadcasters } from "../data/broadcasters";

/* ================= TV LOGOS ================= */

import canal from "../assets/images/broadcaster-tv/canal.jpg";
import dazn from "../assets/images/broadcaster-tv/dazn.jpg";
import espn from "../assets/images/broadcaster-tv/espn.jpg";
import flo from "../assets/images/broadcaster-tv/flo.jpg";
import peacock from "../assets/images/broadcaster-tv/peacocktv.jpg";
import premier from "../assets/images/broadcaster-tv/premier.jpg";
import rugbypass from "../assets/images/broadcaster-tv/rugbypass.jpg";
import skyFiji from "../assets/images/broadcaster-tv/sky-fiji.jpg";
import skyNow from "../assets/images/broadcaster-tv/skynow.jpg";
import skyItalia from "../assets/images/broadcaster-tv/skysport-italia.jpg";
import skySport from "../assets/images/broadcaster-tv/skysport.jpg";
import stan from "../assets/images/broadcaster-tv/stan.jpg";
import supersport from "../assets/images/broadcaster-tv/supersport.jpg";
import tnt from "../assets/images/broadcaster-tv/tnt.jpg";
import virgin from "../assets/images/broadcaster-tv/virgin.jpg";
import wowow from "../assets/images/broadcaster-tv/wowow.jpg";

const tvLogos: Record<string, string> = {
  canalplus: canal,
  dazn,
  espn,
  florugby: flo,
  peacock,
  premiersports: premier,
  rugbypass,
  skypacific: skyFiji,
  skysportnow: skyNow,
  skyitalia: skyItalia,
  skysportnz: skySport,
  stansport: stan,
  supersport,
  tntsports: tnt,
  virgin_media: virgin,
  wowow,
};

export default function PPVPage() {
  const navigate = useNavigate();

  const tvBroadcasters = broadcasters.filter((b) => b.type === "tv");

  const grouped = tvBroadcasters.reduce((acc: any, b: any) => {
    if (!acc[b.country]) acc[b.country] = [];
    acc[b.country].push(b);
    return acc;
  }, {});

  useEffect(() => {
    recordLoyaltyAction("ppv_view");
  }, []);

  return (
    <PageWrapper imageUrl={razLight}>
      <main className={styles.page}>
        {/* HERO */}
        <header
          className={styles.hero}
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className={styles.heroContent}>
            <h1>Pay-Per-View Access</h1>

            <p>
              Premium international match coverage through authorised broadcast
              partners across global territories.
            </p>
          </div>
        </header>

        {/* BACK */}

        <div className={styles.backWrap}>
          <button
            className={styles.back}
            onClick={() => navigate("/fanzone")}
          >
            ← Back to Fanzone
          </button>
        </div>

        {/* LIVE MATCH BAR */}

        <LiveNowBar />

        {/* EDITORIAL */}

        <section className={styles.section}>
          <p className={styles.bodyText}>
            Certain international fixtures, touring series and special
            competitions are occasionally made available through Pay-Per-View
            access. Rugby Anthem Zone does not host streams directly. Instead,
            supporters are connected to the authorised broadcast partners
            responsible for coverage in their region.
          </p>
        </section>

        {/* BROADCASTERS */}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Official Broadcast Partners
          </h2>

          {Object.entries(grouped).map(([country, list]: any) => (
            <div key={country} className={styles.countryBlock}>
              <h3 className={styles.countryTitle}>{country}</h3>

              <div className={styles.grid}>
                {list.map((b: any) => (
                  <a
                    key={b.id}
                    className={styles.row}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      recordLoyaltyAction("ppv_provider_click")
                    }
                  >
                    <img src={tvLogos[b.id]} alt={b.name} />

                    <div>
                      <strong>{b.name}</strong>
                      <span>{b.country}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </PageWrapper>
  );
}