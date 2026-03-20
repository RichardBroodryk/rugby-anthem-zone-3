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
    nation: "South Africa",
    flag: southAfrica,
    coaches: [
      {
        name: "Mzwandile Stick",
        role: "Attack & Backs Coach",
        bio: "Central to South Africa’s attacking structure and continuity across multiple World Cup cycles.",
      },
      {
        name: "Deon Davids",
        role: "Forwards Coach",
        bio: "Responsible for forward systems, maul dominance, and pack cohesion.",
      },
      {
        name: "Daan Human",
        role: "Scrum Coach",
        bio: "One of the leading scrum specialists in the modern international game.",
      },
      {
        name: "Jerry Flannery",
        role: "Defence Coach",
        bio: "Driving defensive organisation and breakdown efficiency.",
      },
    ],
  },
  {
    nation: "Ireland",
    flag: ireland,
    coaches: [
      {
        name: "Simon Easterby",
        role: "Defence Coach",
        bio: "Architect of Ireland’s structured and aggressive defensive systems.",
      },
      {
        name: "Andrew Goodman",
        role: "Attack Coach",
        bio: "Leads Ireland’s attacking framework and backline development.",
      },
      {
        name: "Paul O'Connell",
        role: "Forwards Coach",
        bio: "Former captain bringing leadership and set-piece expertise.",
      },
      {
        name: "John Fogarty",
        role: "Scrum Coach",
        bio: "Specialist in scrum stability and technical precision.",
      },
    ],
  },
  {
    nation: "France",
    flag: france,
    coaches: [
      {
        name: "Shaun Edwards",
        role: "Defence Coach",
        bio: "Widely regarded as the leading defensive coach in world rugby.",
      },
      {
        name: "William Servat",
        role: "Forwards Coach",
        bio: "Oversees France’s powerful forward unit and set-piece.",
      },
      {
        name: "Laurent Sempéré",
        role: "Set-Piece Coach",
        bio: "Supports scrum and lineout structure within the French system.",
      },
    ],
  },
  {
    nation: "England",
    flag: england,
    coaches: [
      {
        name: "Richard Wigglesworth",
        role: "Attack Coach",
        bio: "Driving England’s attacking clarity and tactical structure.",
      },
      {
        name: "Joe El-Abd",
        role: "Defence Coach",
        bio: "Responsible for England’s defensive organisation.",
      },
      {
        name: "Andrew Strawbridge",
        role: "Forwards Coach",
        bio: "Focuses on set-piece and forward platform.",
      },
    ],
  },
  {
    nation: "Scotland",
    flag: scotland,
    coaches: [
      {
        name: "Lee Radford",
        role: "Defence Coach",
        bio: "Leads Scotland’s defensive systems and organisation.",
      },
    ],
  },
  {
    nation: "New Zealand",
    flag: newZealand,
    coaches: [
      {
        name: "Jason Ryan",
        role: "Forwards Coach",
        bio: "Key figure in forward development and physical dominance.",
      },
      {
        name: "Attack & Defence Unit",
        role: "Staff Transition Phase",
        bio: "Coaching structure evolving under the 2026 appointment cycle.",
      },
    ],
  },
  {
    nation: "Australia",
    flag: australia,
    coaches: [
      {
        name: "Laurie Fisher",
        role: "Forwards Coach",
        bio: "Highly experienced forwards specialist in international rugby.",
      },
      {
        name: "Mike Cron",
        role: "Scrum Coach",
        bio: "Renowned scrum expert with global coaching experience.",
      },
    ],
  },
  {
    nation: "Argentina",
    flag: argentina,
    coaches: [
      {
        name: "Andrés Bordoy",
        role: "Scrum Coach",
        bio: "Leads Argentina’s scrum and forward technical systems.",
      },
    ],
  },
  {
    nation: "Italy",
    flag: italy,
    coaches: [
      {
        name: "Germán Fernández",
        role: "Assistant Coach",
        bio: "Supports Italy’s tactical development and team structure.",
      },
    ],
  },
  {
    nation: "Wales",
    flag: wales,
    coaches: [
      {
        name: "Danny Wilson",
        role: "Forwards Coach",
        bio: "Responsible for pack development and set-piece structure.",
      },
      {
        name: "Matt Sherratt",
        role: "Attack Coach",
        bio: "Leads attacking systems and backline organisation.",
      },
    ],
  },
  {
    nation: "Fiji",
    flag: fiji,
    coaches: [
      {
        name: "Ifereimi Rawaqa",
        role: "Forwards Coach",
        bio: "Focuses on physicality and contact area performance.",
      },
    ],
  },
  {
    nation: "Japan",
    flag: japan,
    coaches: [
      {
        name: "Attack & Development Unit",
        role: "Assistant Structure",
        bio: "Japan’s coaching system emphasises development and tactical cohesion.",
      },
    ],
  },
];

export default function AssistantCoaches() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Assistant Coaches — Men’s Game</h1>
        <p className={styles.heroSub}>
          Specialist coaches responsible for defence, attack, set-piece, and
          tactical execution at international level.
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
        <h2>The Engine Room of Modern Teams</h2>
        <p>
          Assistant coaches translate vision into performance. They design
          systems, prepare units, and shape match-day execution — often working
          beyond the spotlight, yet fundamental to sustained international
          success.
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