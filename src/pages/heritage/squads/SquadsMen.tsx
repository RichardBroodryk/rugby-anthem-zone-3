import { useNavigate } from "react-router-dom";
import styles from "./SquadsMen.module.css";

/* FLAGS */

import nzFlag from "../../../assets/images/flags/new-zealand.jpg";
import saFlag from "../../../assets/images/flags/south-africa.jpg";
import engFlag from "../../../assets/images/flags/england.png";
import ireFlag from "../../../assets/images/flags/ireland.jpg";
import fraFlag from "../../../assets/images/flags/france.jpg";
import ausFlag from "../../../assets/images/flags/australia.jpg";
import walFlag from "../../../assets/images/flags/wales.jpg";
import scoFlag from "../../../assets/images/flags/scotland.jpg";
import itaFlag from "../../../assets/images/flags/italy.jpg";
import argFlag from "../../../assets/images/flags/argentina.jpg";
import japFlag from "../../../assets/images/flags/japan.jpg";
import fijFlag from "../../../assets/images/flags/fiji.jpg";

type Nation = {
  name: string;
  nickname: string;
  flag: string;
  route: string;
};

const nations: Nation[] = [
  { name: "New Zealand", nickname: "All Blacks", flag: nzFlag, route: "new-zealand" },
  { name: "South Africa", nickname: "Springboks", flag: saFlag, route: "south-africa" },
  { name: "England", nickname: "England", flag: engFlag, route: "england" },
  { name: "Ireland", nickname: "Ireland", flag: ireFlag, route: "ireland" },
  { name: "France", nickname: "Les Bleus", flag: fraFlag, route: "france" },
  { name: "Australia", nickname: "Wallabies", flag: ausFlag, route: "australia" },
  { name: "Wales", nickname: "Wales", flag: walFlag, route: "wales" },
  { name: "Scotland", nickname: "Scotland", flag: scoFlag, route: "scotland" },
  { name: "Italy", nickname: "Azzurri", flag: itaFlag, route: "italy" },
  { name: "Argentina", nickname: "Los Pumas", flag: argFlag, route: "argentina" },
  { name: "Japan", nickname: "Brave Blossoms", flag: japFlag, route: "japan" },
  { name: "Fiji", nickname: "Flying Fijians", flag: fijFlag, route: "fiji" },
];

export default function SquadsMen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>

      {/* HERO */}

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Men’s National Squads</h1>
          <p>
            Official international squads of the world’s leading rugby nations.
          </p>
        </div>
      </header>

      {/* BACK */}

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/squads")}
        >
          ← Back to Squads
        </button>
      </div>

      {/* INTRO */}

      <section className={styles.pageIntro}>
        <h2>Select a Nation</h2>
        <p>
          Explore the current international squad and coaching staff of each nation.
        </p>
      </section>

      {/* GRID */}

      <section className={styles.section}>
        <div className={styles.grid}>

          {nations.map((nation) => (

            <article key={nation.name} className={styles.card}>

              <div className={styles.flagWrap}>
                <img
                  src={nation.flag}
                  alt={`${nation.name} flag`}
                  className={styles.flag}
                />
              </div>

              <h3>{nation.name}</h3>

              <span className={styles.nickname}>
                {nation.nickname}
              </span>

              <button
                className={styles.action}
                onClick={() =>
                  navigate(`/heritage/squads/men/${nation.route}`)
                }
              >
                View Squad →
              </button>

            </article>

          ))}

        </div>
      </section>

      {/* CONTEXT */}

      <section className={styles.sectionMuted}>
        <h2>International Selection</h2>
        <p>
          National squads are selected by coaching teams and announced ahead of
          international competitions throughout the season.
        </p>
      </section>

      {/* INFO */}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Coverage Notes</h2>

        <div className={styles.info}>
          <p>
            Squad listings reflect official announcements made by national unions.
          </p>
          <p>
            Some nations may publish extended squads of up to 36 players during
            international windows.
          </p>
        </div>
      </section>

    </main>
  );
}