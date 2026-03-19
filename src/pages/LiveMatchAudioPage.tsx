import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveMatchAudioPage.module.css";

import { recordLoyaltyAction } from "../utils/loyaltyHooks";
import heroImage from "../assets/images/raz/fanzone-audio.png";

import LiveNowBar from "../components/live/LiveNowBar";

import { broadcasters } from "../data/broadcasters";

/* radio logos */

import abcSport from "../assets/images/broadcaster-radio/abcsport-ausralia.jpg";
import bbc5Live from "../assets/images/broadcaster-radio/bbc-5live.jpg";
import fbcRadio from "../assets/images/broadcaster-radio/fijian-broadcasting.jpg";
import franceInter from "../assets/images/broadcaster-radio/france-inter.jpg";
import newstalk from "../assets/images/broadcaster-radio/newstalk-zb.jpg";
import nhk from "../assets/images/broadcaster-radio/nhk-japan.jpg";
import radio2000 from "../assets/images/broadcaster-radio/radio-2000.jpg";
import radioNacional from "../assets/images/broadcaster-radio/radio-naticional-argentina.jpg";
import raiRadio from "../assets/images/broadcaster-radio/rai-radio.jpg";
import rsg from "../assets/images/broadcaster-radio/rsg.jpg";
import rteRadio from "../assets/images/broadcaster-radio/rteradio1.jpg";

const radioLogos: Record<string, string> = {
  abc_sport: abcSport,
  bbc_radio5: bbc5Live,
  fbc_radio: fbcRadio,
  france_inter: franceInter,
  newstalkzb: newstalk,
  nhk_radio: nhk,
  radio2000,
  radio_nacional: radioNacional,
  rai_radio: raiRadio,
  rsg,
  rte_radio: rteRadio,
};

export default function LiveMatchAudioPage() {
  const navigate = useNavigate();

  const radioBroadcasters = broadcasters.filter(
    (b) => b.type === "radio"
  );

  const grouped = radioBroadcasters.reduce((acc: any, b: any) => {
    if (!acc[b.country]) acc[b.country] = [];
    acc[b.country].push(b);
    return acc;
  }, {});

  useEffect(() => {
    recordLoyaltyAction("audio_view");
  }, []);

  return (
    <main className={styles.page}>
      {/* HERO */}

      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>Live Match Audio</h1>

          <p>
            Official international rugby commentary delivered through
            national broadcasters and authorised audio partners.
          </p>
        </div>
      </section>

      {/* BACK */}

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/fanzone")}
        >
          ← Back to Fanzone
        </button>
      </div>

      {/* LIVE BAR */}

      <LiveNowBar />

      {/* EDITORIAL */}

      <section className={styles.section}>
        <p className={styles.bodyText}>
          Radio commentary remains one of rugby’s most authentic match-day
          experiences. Whether following the game while travelling,
          working or inside the stadium itself, these authorised radio
          partners provide full commentary coverage without Rugby Anthem
          Zone hosting audio streams directly.
        </p>
      </section>

      {/* BROADCASTERS */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Official Audio Broadcasters
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
                    recordLoyaltyAction("audio_listen")
                  }
                >
                  <img src={radioLogos[b.id]} alt={b.name} />

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
  );
}