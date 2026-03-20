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
    nation: "New Zealand",
    flag: newZealand,
    staff: [
      {
        name: "Black Ferns Performance Unit",
        role: "High Performance & Conditioning",
        era: "2018–Present",
        bio:
          "A fully integrated high-performance system supporting the Black Ferns’ dominance across World Cup cycles.",
      },
    ],
  },
  {
    nation: "England",
    flag: england,
    staff: [
      {
        name: "RFU Women’s Performance Team",
        role: "Performance & Medical",
        era: "2018–Present",
        bio:
          "Supports the Red Roses through advanced conditioning, analytics, and medical systems in a fully professional environment.",
      },
    ],
  },
  {
    nation: "France",
    flag: france,
    staff: [
      {
        name: "FFR Women’s High Performance",
        role: "Performance & Analysis",
        era: "2019–Present",
        bio:
          "Structured performance system supporting France’s competitiveness in global tournaments.",
      },
    ],
  },
  {
    nation: "Ireland",
    flag: ireland,
    staff: [
      {
        name: "IRFU Women’s Performance Unit",
        role: "S&C & Medical",
        era: "2019–Present",
        bio:
          "Supports Ireland’s rebuilding phase through structured conditioning and player welfare systems.",
      },
    ],
  },
  {
    nation: "South Africa",
    flag: southAfrica,
    staff: [
      {
        name: "SA Rugby Women’s Performance Group",
        role: "Performance & Medical",
        era: "2020–Present",
        bio:
          "Supports the Springbok Women’s programme through evolving high-performance structures.",
      },
    ],
  },
  {
    nation: "Scotland",
    flag: scotland,
    staff: [
      {
        name: "SRU Women’s Performance Team",
        role: "Conditioning & Analysis",
        era: "2019–Present",
        bio:
          "Supports Scotland’s international programme through structured development and analytics.",
      },
    ],
  },
  {
    nation: "Wales",
    flag: wales,
    staff: [
      {
        name: "WRU Women’s Performance Unit",
        role: "Performance & Medical",
        era: "2019–Present",
        bio:
          "Supports Wales’ professional women’s programme with conditioning and recovery systems.",
      },
    ],
  },
  {
    nation: "Australia",
    flag: australia,
    staff: [
      {
        name: "Wallaroos Performance Group",
        role: "High Performance",
        era: "2019–Present",
        bio:
          "Supports Australia’s women’s programme as it transitions into a fully professional structure.",
      },
    ],
  },
  {
    nation: "Italy",
    flag: italy,
    staff: [
      {
        name: "FIR Women’s Performance Unit",
        role: "Performance & Conditioning",
        era: "2019–Present",
        bio:
          "Supports Italy’s steady rise through structured high-performance systems.",
      },
    ],
  },
  {
    nation: "Japan",
    flag: japan,
    staff: [
      {
        name: "JRFU Women’s Development Staff",
        role: "Performance & Development",
        era: "2019–Present",
        bio:
          "Supports Japan’s growth within the international women’s game.",
      },
    ],
  },
  {
    nation: "Fiji",
    flag: fiji,
    staff: [
      {
        name: "Fijiana Performance Unit",
        role: "Development & Conditioning",
        era: "2019–Present",
        bio:
          "Focused on player development and integration into international competition.",
      },
    ],
  },
  {
    nation: "Argentina",
    flag: argentina,
    staff: [
      {
        name: "Argentina Women’s Programme Staff",
        role: "Development & Performance",
        era: "2020–Present",
        bio:
          "Supports an emerging programme building toward sustained international competitiveness.",
      },
    ],
  },
];

export default function SupportStaffWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <h1>Support Staff — Women’s Game</h1>
        <p className={styles.heroSub}>
          The performance, medical, and analytical structures supporting the
          modern women’s international game.
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
        <h2>Building the Modern Game</h2>
        <p>
          As the women’s game has professionalised, support staff have become
          central to performance. Conditioning, analysis, and medical systems now
          underpin the global competitiveness of international teams.
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