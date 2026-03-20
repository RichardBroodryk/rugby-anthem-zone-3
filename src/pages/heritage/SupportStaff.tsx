import { useNavigate } from "react-router-dom";
import styles from "./SupportStaff.module.css";

/* FLAGS */
import england from "../../assets/images/flags/england.png";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import wales from "../../assets/images/flags/wales.jpg";
import scotland from "../../assets/images/flags/scotland.jpg";
import argentina from "../../assets/images/flags/argentina.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import japan from "../../assets/images/flags/japan.jpg";
import fiji from "../../assets/images/flags/fiji.jpg";

type StaffMember = {
  name: string;
  role: string;
  era: string;
  bio: string;
};

type NationGroup = {
  nation: string;
  flag: string;
  staff: StaffMember[];
};

const groups: NationGroup[] = [
  {
    nation: "South Africa",
    flag: southAfrica,
    staff: [
      {
        name: "Andy Edwards",
        role: "Head of Athletic Performance",
        era: "2020–Present",
        bio:
          "Leads South Africa’s high-performance systems, underpinning physical dominance and durability across global campaigns.",
      },
      {
        name: "Medical Team",
        role: "Performance & Medical Unit",
        era: "2018–Present",
        bio:
          "Integrated medical and conditioning team ensuring player welfare and recovery across extended international cycles.",
      },
    ],
  },
  {
    nation: "New Zealand",
    flag: newZealand,
    staff: [
      {
        name: "Matt Cross",
        role: "Head of Athletic Performance",
        era: "2016–Present",
        bio:
          "Central to maintaining the All Blacks’ conditioning standards across multiple international cycles.",
      },
    ],
  },
  {
    nation: "Ireland",
    flag: ireland,
    staff: [
      {
        name: "Performance Unit",
        role: "S&C & Analytics",
        era: "2018–Present",
        bio:
          "A highly integrated system supporting Ireland’s consistency through conditioning, data, and preparation.",
      },
    ],
  },
  {
    nation: "England",
    flag: england,
    staff: [
      {
        name: "RFU Performance Group",
        role: "High Performance Unit",
        era: "2018–Present",
        bio:
          "Supports England through structured performance systems including S&C, analytics, and medical operations.",
      },
    ],
  },
  {
    nation: "France",
    flag: france,
    staff: [
      {
        name: "FFR Analytics Team",
        role: "Performance Analysis",
        era: "2019–Present",
        bio:
          "Provides detailed tactical analysis and opposition insight within France’s modern system.",
      },
    ],
  },
  {
    nation: "Wales",
    flag: wales,
    staff: [
      {
        name: "WRU Performance Unit",
        role: "Performance & Medical",
        era: "2018–Present",
        bio:
          "Supports Wales through conditioning, analytics, and player welfare systems.",
      },
    ],
  },
  {
    nation: "Scotland",
    flag: scotland,
    staff: [
      {
        name: "SRU Performance Team",
        role: "S&C & Analysis",
        era: "2018–Present",
        bio:
          "Drives Scotland’s preparation and conditioning within an evolving high-performance structure.",
      },
    ],
  },
  {
    nation: "Australia",
    flag: australia,
    staff: [
      {
        name: "Rugby Australia Performance Group",
        role: "High Performance",
        era: "2018–Present",
        bio:
          "Supports national teams through conditioning, analytics, and medical systems.",
      },
    ],
  },
  {
    nation: "Argentina",
    flag: argentina,
    staff: [
      {
        name: "UAR Performance Unit",
        role: "Performance & Medical",
        era: "2019–Present",
        bio:
          "Provides structural support to Argentina’s international programme across analysis and conditioning.",
      },
    ],
  },
  {
    nation: "Italy",
    flag: italy,
    staff: [
      {
        name: "FIR Performance Group",
        role: "High Performance",
        era: "2018–Present",
        bio:
          "Supports Italy’s development through structured performance and analytics systems.",
      },
    ],
  },
  {
    nation: "Japan",
    flag: japan,
    staff: [
      {
        name: "JRFU High Performance Team",
        role: "Performance & Conditioning",
        era: "2019–Present",
        bio:
          "Supports Japan’s structured and disciplined approach to international rugby.",
      },
    ],
  },
  {
    nation: "Fiji",
    flag: fiji,
    staff: [
      {
        name: "Fiji Rugby Performance Unit",
        role: "Development & Conditioning",
        era: "2018–Present",
        bio:
          "Supports Fiji’s international programme with growing investment in conditioning and analytics.",
      },
    ],
  },
];

export default function SupportStaff() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Support Staff — Men’s Game</h1>
        <p className={styles.heroSub}>
          Performance, medical, and analytical leaders whose expertise underpinned
          sustained international success.
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
        <h2>The Infrastructure of Elite Performance</h2>
        <p>
          Modern international rugby is built on high-performance systems. From
          conditioning and recovery to analytics and medical oversight, support
          staff create the environment in which elite performance becomes
          sustainable.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.nation} className={styles.nationSection}>
          <div className={styles.nationHeader}>
            <img src={group.flag} alt="" className={styles.flag} />
            <h2>{group.nation}</h2>
          </div>

          <div className={styles.grid}>
            {group.staff.map((member) => (
              <article key={member.name} className={styles.card}>
                <h3>{member.name}</h3>
                <span className={styles.role}>{member.role}</span>
                <span className={styles.meta}>{member.era}</span>
                <p className={styles.bio}>{member.bio}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}