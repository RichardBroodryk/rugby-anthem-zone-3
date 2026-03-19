import { useNavigate } from "react-router-dom";
import styles from "./LegendsMen.module.css";

import mccawImg from "../../assets/images/legends/men/richie-mccaw.jpg";
import joostImg from "../../assets/images/legends/men/joost-van-der-westhuizen.jpg";
import wilkinsonImg from "../../assets/images/legends/men/jonny-wilkinson.jpg";
import blancoImg from "../../assets/images/legends/men/serge-blanco.jpg";
import ealesImg from "../../assets/images/legends/men/john-eales.jpg";
import edwardsImg from "../../assets/images/legends/men/gareth-edwards.jpg";

import lomuImg from "../../assets/images/legends/men/jonah-lomu.jpg";
import odriscollImg from "../../assets/images/legends/men/brian-odriscoll.jpg";
import hastingsImg from "../../assets/images/legends/men/gavin-hastings.jpg";
import portaImg from "../../assets/images/legends/men/hugo-porta.jpg";
import parisseImg from "../../assets/images/legends/men/sergio-parisse.jpg";

type Legend = {
  nation: string;
  name: string;
  era: string;
  position: string;
  bio: string;
  image: string;
};

const legends: Legend[] = [
  {
    nation: "New Zealand",
    name: "Richie McCaw",
    era: "2001–2015",
    position: "Flanker",
    bio:
      "A relentless leader and two-time Rugby World Cup–winning captain, Richie McCaw defined the professional era for the All Blacks. His influence at the breakdown, unmatched work rate, and calm leadership under pressure made him one of the most respected figures in global rugby.",
    image: mccawImg,
  },
  {
    nation: "New Zealand",
    name: "Jonah Lomu",
    era: "1994–2002",
    position: "Wing",
    bio:
      "Jonah Lomu became rugby’s first global superstar during the 1995 Rugby World Cup. His extraordinary combination of speed, size, and power transformed the perception of what a winger could be and helped propel rugby union into the modern professional era.",
    image: lomuImg,
  },
  {
    nation: "South Africa",
    name: "Joost van der Westhuizen",
    era: "1993–2003",
    position: "Scrum-half",
    bio:
      "One of the most dynamic scrum-halves in rugby history, Joost van der Westhuizen brought physicality and attacking flair to the position. A key figure in South Africa’s 1995 Rugby World Cup triumph, he redefined the role of the modern scrum-half.",
    image: joostImg,
  },
  {
    nation: "England",
    name: "Jonny Wilkinson",
    era: "1998–2011",
    position: "Fly-half",
    bio:
      "Jonny Wilkinson symbolised discipline, precision, and mental resilience. His drop goal in the 2003 Rugby World Cup final secured England’s only world title and remains one of the most iconic moments in international rugby.",
    image: wilkinsonImg,
  },
  {
    nation: "France",
    name: "Serge Blanco",
    era: "1980–1991",
    position: "Fullback",
    bio:
      "Serge Blanco represented the artistry of French rugby. Known for his elegant running lines and attacking creativity from fullback, he became a symbol of France’s flair and helped define the nation’s rugby identity in the 1980s.",
    image: blancoImg,
  },
  {
    nation: "Australia",
    name: "John Eales",
    era: "1996–2001",
    position: "Lock",
    bio:
      "John Eales was the embodiment of leadership and respect in rugby. Captain of Australia’s 1999 Rugby World Cup–winning side, he was admired for his calm authority, versatility, and the universal respect he commanded across the sport.",
    image: ealesImg,
  },
  {
    nation: "Wales",
    name: "Gareth Edwards",
    era: "1967–1978",
    position: "Scrum-half",
    bio:
      "Widely regarded as one of the greatest players of the amateur era, Gareth Edwards revolutionised the scrum-half role with his speed, vision, and athleticism. His performances for Wales helped define one of the country’s most successful rugby generations.",
    image: edwardsImg,
  },
  {
    nation: "Ireland",
    name: "Brian O'Driscoll",
    era: "1999–2014",
    position: "Centre",
    bio:
      "Brian O'Driscoll became the defining figure of Irish rugby in the professional era. Combining tactical intelligence with attacking brilliance, he captained Ireland and the British & Irish Lions and remains one of the most celebrated centres in rugby history.",
    image: odriscollImg,
  },
  {
    nation: "Scotland",
    name: "Gavin Hastings",
    era: "1986–1995",
    position: "Fullback",
    bio:
      "Gavin Hastings captained Scotland during one of its most successful periods and was renowned for his powerful running and reliable goal kicking. His leadership helped Scotland secure the 1990 Grand Slam, one of the nation’s proudest rugby achievements.",
    image: hastingsImg,
  },
  {
    nation: "Argentina",
    name: "Hugo Porta",
    era: "1971–1990",
    position: "Fly-half",
    bio:
      "Hugo Porta is widely regarded as the greatest player in Argentine rugby history. His skill, tactical vision, and leadership elevated the status of Los Pumas internationally and helped establish Argentina as a respected rugby nation.",
    image: portaImg,
  },
  {
    nation: "Italy",
    name: "Sergio Parisse",
    era: "2002–2019",
    position: "Number 8",
    bio:
      "Sergio Parisse became the face of Italian rugby for more than a decade. An exceptional number eight with remarkable skill and leadership, he captained Italy for many years and earned global admiration for his performances against the world’s best teams.",
    image: parisseImg,
  },
];

export default function LegendsMen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Men’s Legends</h1>
        <p className={styles.heroSub}>
          Icons of the international game — players whose careers defined eras,
          inspired nations, and shaped rugby’s global identity.
        </p>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/legends")}
        >
          ← Back to Legends
        </button>
      </div>

      {/* CONTEXT */}
      <section className={styles.sectionMuted}>
        <h2>Legacy Beyond Statistics</h2>
        <p>
          Rugby history is written not only in trophies and records but in
          influence. The players recognised here changed how the game was
          played, led their nations through defining moments, and inspired new
          generations of supporters and athletes. Their legacy stretches beyond
          individual achievements and forms part of the cultural identity of
          international rugby.
        </p>
      </section>

      {/* HALL OF FAME */}
      <section className={styles.section}>
        <h2>Hall of Fame</h2>

        <div className={styles.grid}>
          {legends.map((legend) => (
            <article key={legend.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <img
                  src={legend.image}
                  alt={legend.name}
                  className={styles.portrait}
                />

                <div>
                  <h3>{legend.name}</h3>
                  <span className={styles.meta}>
                    {legend.nation} · {legend.position}
                  </span>
                  <span className={styles.era}>{legend.era}</span>
                </div>
              </div>

              <p className={styles.bio}>{legend.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}