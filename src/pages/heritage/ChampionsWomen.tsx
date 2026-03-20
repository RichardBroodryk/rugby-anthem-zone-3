import { useNavigate } from "react-router-dom";
import styles from "./ChampionsWomen.module.css";

/* HERO IMAGE */
import worldCupWomenHero from "../../assets/images/raz/worldcup-women-hero.jpg";

/* FLAGS */
import englandFlag from "../../assets/images/flags/england.png";
import franceFlag from "../../assets/images/flags/france.jpg";
import irelandFlag from "../../assets/images/flags/ireland.jpg";
import scotlandFlag from "../../assets/images/flags/scotland.jpg";
import newZealandFlag from "../../assets/images/flags/new-zealand.jpg";
import australiaFlag from "../../assets/images/flags/australia.jpg";

/* USA — SOLID LOGO (FIX) */
import unitedStatesLogo from "../../assets/images/logos/solid/united-states-of-america.jpg";

/* MASCOT LOGOS */
import newZealandMascot from "../../assets/images/logos/solid/new-zealand.png";
import englandMascot from "../../assets/images/logos/solid/england.jpg";

type WorldCupEntry = {
  year: string;
  nation: string;
  mascot: string;
  image: string;
  venue: string;
  headCoach: string;
};

type Tally = {
  nation: string;
  titles: number;
  flag: string;
};

/* ================= WOMEN’S RUGBY WORLD CUP ================= */

const worldCups: WorldCupEntry[] = [
  {
    year: "1991",
    nation: "United States",
    mascot: "Eagles",
    image: unitedStatesLogo,
    venue: "Twickenham, London",
    headCoach: "Unknown",
  },
  {
    year: "1994",
    nation: "England",
    mascot: "Red Roses",
    image: englandMascot,
    venue: "Raeburn Place, Edinburgh",
    headCoach: "Geoff Richards",
  },
  {
    year: "1998",
    nation: "New Zealand",
    mascot: "Black Ferns",
    image: newZealandMascot,
    venue: "Stade Mayol, Toulon",
    headCoach: "Darcy Robinson",
  },
  {
    year: "2002",
    nation: "New Zealand",
    mascot: "Black Ferns",
    image: newZealandMascot,
    venue: "Estadi Olímpic, Barcelona",
    headCoach: "Darcy Robinson",
  },
  {
    year: "2006",
    nation: "New Zealand",
    mascot: "Black Ferns",
    image: newZealandMascot,
    venue: "Eden Park, Auckland",
    headCoach: "Wayne Smith",
  },
  {
    year: "2010",
    nation: "New Zealand",
    mascot: "Black Ferns",
    image: newZealandMascot,
    venue: "Twickenham Stoop, London",
    headCoach: "Wayne Smith",
  },
  {
    year: "2014",
    nation: "England",
    mascot: "Red Roses",
    image: englandMascot,
    venue: "Stade Jean-Bouin, Paris",
    headCoach: "Gary Street",
  },
  {
    year: "2017",
    nation: "England",
    mascot: "Red Roses",
    image: englandMascot,
    venue: "Kingspan Stadium, Belfast",
    headCoach: "Simon Middleton",
  },
  {
    year: "2021 (played 2022)",
    nation: "New Zealand",
    mascot: "Black Ferns",
    image: newZealandMascot,
    venue: "Eden Park, Auckland",
    headCoach: "Wayne Smith",
  },
];

/* ================= WOMEN’S SIX NATIONS ================= */

const sixNations: Tally[] = [
  { nation: "England", titles: 19, flag: englandFlag },
  { nation: "France", titles: 6, flag: franceFlag },
  { nation: "Ireland", titles: 2, flag: irelandFlag },
  { nation: "Scotland", titles: 1, flag: scotlandFlag },
];

/* ========== HSBC SVNS WORLD SERIES (WOMEN) ========= */

const sevensSeries: Tally[] = [
  { nation: "New Zealand", titles: 7, flag: newZealandFlag },
  { nation: "Australia", titles: 3, flag: australiaFlag },
  { nation: "France", titles: 1, flag: franceFlag },
];

/* ========== OLYMPIC RUGBY SEVENS (WOMEN) ========= */

const olympicSevensWomen = [
  {
    year: "2016 Rio",
    nation: "Australia",
    note: "Defeated New Zealand 24–17",
    flag: australiaFlag,
  },
  {
    year: "2020 Tokyo (2021)",
    nation: "New Zealand",
    note: "Defeated France in the final",
    flag: newZealandFlag,
  },
  {
    year: "2024 Paris",
    nation: "New Zealand",
    note: "Defeated Canada — retained Olympic title",
    flag: newZealandFlag,
  },
];

/* ================= WOMEN’S WORLD CUP SEVENS ================= */

const sevensWorldCup: Tally[] = [
  { nation: "New Zealand", titles: 4, flag: newZealandFlag },
  { nation: "Australia", titles: 1, flag: australiaFlag },
  { nation: "France", titles: 1, flag: franceFlag },
];

export default function ChampionsWomen() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      {/* HERO */}
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${worldCupWomenHero})` }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1>Women’s Championships</h1>
          <p>
            A historical record of international women’s rugby championship
            achievements at the highest level.
          </p>
        </div>
      </header>

      {/* BACK */}
      <div className={styles.backWrap}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back to Championships
        </button>
      </div>

      {/* WORLD CUP */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Women’s Rugby World Cup</h2>

        <div className={styles.worldCupList}>
          {worldCups.map((entry) => (
            <article key={entry.year} className={styles.worldCupRow}>
              <div className={styles.worldCupHeader}>
                <span className={styles.year}>{entry.year}</span>
                <div className={styles.mascotBlock}>
                  <img src={entry.image} alt={entry.mascot} />
                  <strong>
                    {entry.nation} — {entry.mascot}
                  </strong>
                </div>
              </div>

              <div className={styles.worldCupMeta}>
                <span>Final: {entry.venue}</span>
                <span>Head Coach: {entry.headCoach}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SIX NATIONS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Women’s Six Nations Championship</h2>
        <div className={styles.grid}>
          {sixNations.map((row) => (
            <div key={row.nation} className={styles.row}>
              <img src={row.flag} alt={row.nation} />
              <div>
                <strong>{row.nation}</strong>
                <span>{row.titles} titles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HSBC SVNS WORLD SERIES */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>HSBC SVNS World Series</h2>
        <p className={styles.bodyText}>
          The annual global sevens circuit showcasing the elite of the women’s
          international game across multiple world venues.
        </p>
        <div className={styles.grid}>
          {sevensSeries.map((row) => (
            <div key={row.nation} className={styles.row}>
              <img src={row.flag} alt={row.nation} />
              <div>
                <strong>
                  {row.nation}
                  {row.nation === "New Zealand" && (
                    <span className={styles.championBadge}>
                      2026 Champions
                    </span>
                  )}
                </strong>
                <span>{row.titles} titles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OLYMPIC SEVENS */}
<section className={styles.section}>
  <h2 className={styles.sectionTitle}>Olympic Rugby Sevens</h2>

  <p className={styles.bodyText}>
    Reintroduced at the 2016 Olympic Games, rugby sevens has become one of the
    sport’s most dynamic global stages. The women’s competition has seen
    sustained excellence from New Zealand, alongside landmark victories that
    have shaped the modern era.
  </p>

  <div className={styles.worldCupList}>
    {olympicSevensWomen.map((entry) => (
      <article key={entry.year} className={styles.worldCupRow}>
        <div className={styles.worldCupHeader}>
          <span className={styles.year}>{entry.year}</span>
          <div className={styles.mascotBlock}>
            <img src={entry.flag} alt={entry.nation} />
            <strong>{entry.nation}</strong>
          </div>
        </div>

        <div className={styles.worldCupMeta}>
          <span>{entry.note}</span>
        </div>
      </article>
    ))}
  </div>
</section>

      {/* SEVENS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Women’s Rugby World Cup Sevens</h2>
        <div className={styles.grid}>
          {sevensWorldCup.map((row) => (
            <div key={row.nation} className={styles.row}>
              <img src={row.flag} alt={row.nation} />
              <div>
                <strong>{row.nation}</strong>
                <span>{row.titles} titles</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About These Records</h2>
        <p className={styles.bodyText}>
          Championship titles in the women’s game reflect sustained excellence,
          professional preparation, and leadership at the highest international
          level.
        </p>
      </section>
    </main>
  );
}