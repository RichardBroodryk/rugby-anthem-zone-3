import { useNavigate } from "react-router-dom";
import styles from "./AssistantCoaches.module.css";

/* FLAGS */
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import scotland from "../../assets/images/flags/scotland.jpg";
import argentina from "../../assets/images/flags/argentina.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import japan from "../../assets/images/flags/japan.jpg";
import wales from "../../assets/images/flags/wales.jpg";
import fiji from "../../assets/images/flags/fiji.jpg";

type AssistantCoach = {
  name: string;
  role: string;
  bio: string;
};

type NationGroup = {
  nation: string;
  flag: string;
  coaches: AssistantCoach[];
};

const groups: NationGroup[] = [
  {
    nation: "New Zealand",
    flag: newZealand,
    coaches: [
      {
        name: "Simon Kneebone",
        role: "Forwards Coach",
        bio:
          "Leads set-piece and forward systems within the Black Ferns’ high-performance structure.",
      },
      {
        name: "Tony Christie",
        role: "Attack Coach",
        bio:
          "Shapes attacking identity and continuity in one of the world’s leading women’s teams.",
      },
      {
        name: "Riki Flutey",
        role: "Defence Coach",
        bio:
          "Responsible for defensive organisation and backline alignment.",
      },
    ],
  },
  {
    nation: "England",
    flag: england,
    coaches: [
      {
        name: "Louis Deacon",
        role: "Forwards Coach",
        bio:
          "Oversees forward platform and set-piece execution for the Red Roses.",
      },
      {
        name: "Emily Scarratt",
        role: "Attack Coach",
        bio:
          "Leads attacking development and backline structure within England’s dominant system.",
      },
      {
        name: "Sarah Hunter",
        role: "Defence Coach",
        bio:
          "Former captain contributing leadership and defensive clarity.",
      },
    ],
  },
  {
    nation: "Ireland",
    flag: ireland,
    coaches: [
      {
        name: "Alex Codling",
        role: "Assistant Coach",
        bio:
          "Supports Ireland’s forward and contact-area development.",
      },
      {
        name: "Denis Fogarty",
        role: "Scrum Coach",
        bio:
          "Specialist in scrum and lineout throwing systems.",
      },
      {
        name: "James Scaysbrook",
        role: "Defence Coach",
        bio:
          "Focuses on defensive organisation and breakdown efficiency.",
      },
    ],
  },
  {
    nation: "France",
    flag: france,
    coaches: [
      {
        name: "High-Performance Unit",
        role: "Assistant Structure",
        bio:
          "France’s women’s programme operates within a structured national performance system with specialist coaching roles.",
      },
    ],
  },
  {
    nation: "South Africa",
    flag: southAfrica,
    coaches: [
      {
        name: "Laurian Johannes-Haupt",
        role: "Assistant Coach",
        bio:
          "Part of South Africa’s core coaching group during their modern competitive rise.",
      },
      {
        name: "Franzel September",
        role: "Assistant Coach",
        bio:
          "Supports tactical preparation and player development.",
      },
      {
        name: "Bafana Nhleko",
        role: "Skills / Support Coach",
        bio:
          "Contributes to skills development and structural alignment.",
      },
    ],
  },
  {
    nation: "Scotland",
    flag: scotland,
    coaches: [
      {
        name: "Performance Unit",
        role: "Assistant Structure",
        bio:
          "Scotland’s assistant coaching group operates within a developing high-performance framework.",
      },
    ],
  },
  {
    nation: "Australia",
    flag: australia,
    coaches: [
      {
        name: "Wallaroos Coaching Unit",
        role: "Assistant Structure",
        bio:
          "Australia’s assistant coaching structure continues to evolve alongside the professionalisation of the women’s game.",
      },
    ],
  },
  {
    nation: "Wales",
    flag: wales,
    coaches: [
      {
        name: "WRU Performance Group",
        role: "Assistant Structure",
        bio:
          "Regional and national pathway coaches contribute to Wales’ international programme.",
      },
    ],
  },
  {
    nation: "Italy",
    flag: italy,
    coaches: [
      {
        name: "FIR Coaching Group",
        role: "Assistant Structure",
        bio:
          "Supports Italy’s tactical development and international competitiveness.",
      },
    ],
  },
  {
    nation: "Fiji",
    flag: fiji,
    coaches: [
      {
        name: "Fijiana Development Unit",
        role: "Assistant Structure",
        bio:
          "Focused on player development and international pathway integration.",
      },
    ],
  },
  {
    nation: "Japan",
    flag: japan,
    coaches: [
      {
        name: "JRFU Development Staff",
        role: "Assistant Structure",
        bio:
          "Supports Japan’s structured growth within the international women’s game.",
      },
    ],
  },
  {
    nation: "Argentina",
    flag: argentina,
    coaches: [
      {
        name: "Emerging Programme Staff",
        role: "Assistant Structure",
        bio:
          "Argentina’s women’s programme continues to develop within regional and international pathways.",
      },
    ],
  },
];

export default function AssistantCoachesWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Assistant Coaches — Women’s Game</h1>
        <p className={styles.heroSub}>
          Specialist coaches supporting the rapid evolution and competitiveness
          of the women’s international game.
        </p>
      </section>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() => navigate("/heritage/coaches")}
        >
          ← Back to Coaches & Support
        </button>
      </div>

      {/* INTRO */}
      <section className={styles.intro}>
        <h2>High-Performance Support Structures</h2>
        <p>
          Assistant coaches in the women’s game operate within rapidly advancing
          high-performance environments, contributing to tactical clarity,
          player development, and international competitiveness.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.nation} className={styles.nationSection}>
          <div className={styles.nationHeader}>
            <img src={group.flag} alt="" className={styles.flag} />
            <h2>{group.nation}</h2>
          </div>

          <div className={styles.grid}>
            {group.coaches.map((coach) => (
              <article key={coach.name} className={styles.card}>
                <h3>{coach.name}</h3>
                <span className={styles.role}>{coach.role}</span>
                <p className={styles.bio}>{coach.bio}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}