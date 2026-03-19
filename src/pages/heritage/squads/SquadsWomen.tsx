import { useNavigate } from "react-router-dom";
import styles from "./SquadsWomen.module.css";

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
  { name: "New Zealand", nickname: "Black Ferns", flag: nzFlag, route: "new-zealand" },
  { name: "South Africa", nickname: "Springbok Women", flag: saFlag, route: "south-africa" },
  { name: "England", nickname: "Red Roses", flag: engFlag, route: "england" },
  { name: "Ireland", nickname: "Ireland Women", flag: ireFlag, route: "ireland" },
  { name: "France", nickname: "Les Bleues", flag: fraFlag, route: "france" },
  { name: "Australia", nickname: "Wallaroos", flag: ausFlag, route: "australia" },
  { name: "Wales", nickname: "Wales Women", flag: walFlag, route: "wales" },
  { name: "Scotland", nickname: "Scotland Women", flag: scoFlag, route: "scotland" },
  { name: "Italy", nickname: "Azzurre", flag: itaFlag, route: "italy" },
  { name: "Argentina", nickname: "Las Yaguaretés", flag: argFlag, route: "argentina" },
  { name: "Japan", nickname: "Sakura Fifteen", flag: japFlag, route: "japan" },
  { name: "Fiji", nickname: "Fijiana", flag: fijFlag, route: "fiji" },
];

export default function SquadsWomen() {

  const navigate = useNavigate();

  return (
    <main className={styles.page}>

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Women’s National Squads</h1>
          <p>
            Official international squads representing the leading women's rugby nations.
          </p>
        </div>
      </header>

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/squads")}
        >
          ← Back to Squads
        </button>
      </div>

      <section className={styles.pageIntro}>
        <h2>Select a Nation</h2>
        <p>
          Explore the current international squad and coaching staff of each women’s national team.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>

          {nations.map((nation) => (

            <article key={nation.name} className={styles.card}>

              <div className={styles.flagWrap}>
                <img src={nation.flag} alt={nation.name} className={styles.flag}/>
              </div>

              <h3>{nation.name}</h3>

              <span className={styles.nickname}>
                {nation.nickname}
              </span>

              <button
                className={styles.action}
                onClick={() =>
                  navigate(`/heritage/squads/women/${nation.route}`)
                }
              >
                View Squad →
              </button>

            </article>

          ))}

        </div>
      </section>

      <section className={styles.sectionMuted}>
        <h2>International Selection</h2>
        <p>
          Women’s international squads are selected by national coaching teams and
          announced ahead of major competitions.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Coverage Notes</h2>

        <div className={styles.info}>
          <p>
            Squad listings reflect official announcements made by national unions.
          </p>
          <p>
            Women’s international rugby continues to expand globally with new
            competitions and tournaments.
          </p>
        </div>
      </section>

    </main>
  );
}