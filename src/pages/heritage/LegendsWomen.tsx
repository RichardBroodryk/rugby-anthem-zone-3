import { useNavigate } from "react-router-dom";
import styles from "./LegendsWomen.module.css";

import woodmanImg from "../../assets/images/legends/women/portia-woodman.png";
import alphonsiImg from "../../assets/images/legends/women/maggie-alphonso.jpg";
import yaheImg from "../../assets/images/legends/women/marie-alice-yahe.jpg";
import coughlanImg from "../../assets/images/legends/women/fiona-coughlan.jpg";
import pyrsImg from "../../assets/images/legends/women/gwenllian-pyrs.jpg";
import soonImg from "../../assets/images/legends/women/cheryl-soon.jpg";

import kennedyImg from "../../assets/images/legends/women/donna-kennedy.jpg";
import harveyImg from "../../assets/images/legends/women/harvey-magali.jpg";
import knightImg from "../../assets/images/legends/women/phaidra-knight.jpeg";
import barattinImg from "../../assets/images/legends/women/sara-barattin.jpg";
import jordaanImg from "../../assets/images/legends/women/zenay-jordaan.jpg";

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
    name: "Portia Woodman",
    era: "2013–Present",
    position: "Wing",
    bio:
      "One of the most electrifying players in the history of women’s rugby, Portia Woodman combined extraordinary pace, strength, and finishing ability to dominate international competitions and inspire a new global audience for the sport.",
    image: woodmanImg,
  },
  {
    nation: "England",
    name: "Maggie Alphonsi",
    era: "2003–2012",
    position: "Flanker",
    bio:
      "A fearless flanker and inspirational leader, Maggie Alphonsi was a driving force behind England’s rise in the modern women’s game and a key figure in their 2010 Rugby World Cup triumph.",
    image: alphonsiImg,
  },
  {
    nation: "France",
    name: "Marie-Alice Yahé",
    era: "2005–2018",
    position: "Scrum-half",
    bio:
      "A tactically astute scrum-half who orchestrated the French attack with intelligence and composure, Marie-Alice Yahé helped guide France through a transformative period in women’s international rugby.",
    image: yaheImg,
  },
  {
    nation: "Ireland",
    name: "Fiona Coghlan",
    era: "2003–2018",
    position: "Centre",
    bio:
      "An influential leader during Ireland’s rise in the global game, Fiona Coghlan captained the national side through historic victories and helped establish a culture of belief and professionalism.",
    image: coughlanImg,
  },
  {
    nation: "Wales",
    name: "Gwenllian Pyrs",
    era: "2014–Present",
    position: "Prop",
    bio:
      "A powerful presence in the Welsh front row, Gwenllian Pyrs has been central to Wales’ competitive resurgence and represents the strength and resilience of modern Welsh women’s rugby.",
    image: pyrsImg,
  },
  {
    nation: "Australia",
    name: "Cheryl Soon",
    era: "1996–2007",
    position: "Back row",
    bio:
      "A pioneer of Australian women’s rugby, Cheryl Soon captained the Wallaroos and played a key role in shaping the early international identity of the sport in Australia.",
    image: soonImg,
  },
  {
    nation: "Scotland",
    name: "Donna Kennedy",
    era: "1993–2010",
    position: "Number 8",
    bio:
      "One of the great pioneers of women’s international rugby, Donna Kennedy earned over 100 caps for Scotland and became a symbol of dedication and leadership in the sport’s formative professional era.",
    image: kennedyImg,
  },
  {
    nation: "Canada",
    name: "Magali Harvey",
    era: "2013–Present",
    position: "Wing / Fullback",
    bio:
      "A dynamic attacking talent, Magali Harvey became the first Canadian to win World Rugby Women’s Player of the Year and remains one of the most influential figures in Canadian rugby.",
    image: harveyImg,
  },
  {
    nation: "United States",
    name: "Phaidra Knight",
    era: "1997–2017",
    position: "Back Row",
    bio:
      "A global ambassador for the women’s game, Phaidra Knight captained the USA Eagles and inspired a generation of players through her athleticism, leadership, and advocacy for rugby worldwide.",
    image: knightImg,
  },
  {
    nation: "Italy",
    name: "Sara Barattin",
    era: "2005–Present",
    position: "Scrum-half",
    bio:
      "A long-time captain and leader of the Italian national side, Sara Barattin has been instrumental in raising the competitiveness and professionalism of Italy’s women’s rugby program.",
    image: barattinImg,
  },
  {
    nation: "South Africa",
    name: "Zenay Jordaan",
    era: "2010–Present",
    position: "Centre",
    bio:
      "A respected leader of the Springbok Women, Zenay Jordaan has played a crucial role in the growth of women’s rugby in South Africa and remains one of the country’s most influential players.",
    image: jordaanImg,
  },
];

export default function LegendsWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Women’s Legends</h1>
        <p className={styles.heroSub}>
          Pioneers, champions, and icons whose careers defined the rise and
          global impact of women’s international rugby.
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
        <h2>Shaping the Modern Game</h2>
        <p>
          Women’s rugby has grown from a pioneering amateur movement into one
          of the fastest-growing global sports. The players honoured here helped
          drive that transformation through leadership, performance, and
          advocacy, inspiring generations of athletes and supporters around the
          world.
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