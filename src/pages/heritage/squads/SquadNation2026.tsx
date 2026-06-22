import { useParams, useNavigate } from "react-router-dom";
import styles from "./SquadNation2026.module.css";
import { squads2026 } from "../../../data/heritage/squads2026";

/* FLAGS */

import argentinaFlag from "../../../assets/images/flags/argentina.jpg";
import australiaFlag from "../../../assets/images/flags/australia.jpg";
import englandFlag from "../../../assets/images/flags/england.png";
import franceFlag from "../../../assets/images/flags/france.jpg";
import irelandFlag from "../../../assets/images/flags/ireland.jpg";
import italyFlag from "../../../assets/images/flags/italy.jpg";
import japanFlag from "../../../assets/images/flags/japan.jpg";
import newZealandFlag from "../../../assets/images/flags/new-zealand.jpg";
import scotlandFlag from "../../../assets/images/flags/scotland.jpg";
import southAfricaFlag from "../../../assets/images/flags/south-africa.jpg";
import walesFlag from "../../../assets/images/flags/wales.jpg";
import fijiFlag from "../../../assets/images/flags/fiji.jpg";

/* FEATHER LOGOS */

import argentinaLogo from "../../../assets/images/logos/feathered/argentina.png";
import australiaLogo from "../../../assets/images/logos/feathered/australia.png";
import englandLogo from "../../../assets/images/logos/feathered/england.png";
import franceLogo from "../../../assets/images/logos/feathered/france.png";
import irelandLogo from "../../../assets/images/logos/feathered/ireland.png";
import italyLogo from "../../../assets/images/logos/feathered/italy.png";
import japanLogo from "../../../assets/images/logos/feathered/japan.png";
import newZealandLogo from "../../../assets/images/logos/feathered/new-zealand.png";
import scotlandLogo from "../../../assets/images/logos/feathered/scotland.png";
import southAfricaLogo from "../../../assets/images/logos/feathered/south-africa.png";
import walesLogo from "../../../assets/images/logos/feathered/wales.png";
import fijiLogo from "../../../assets/images/logos/feathered/fiji.png";

/* MEN COACH IMAGES */

import erasmus from "../../../assets/images/coaches/men/modern/rassie-erasmus.jpg";
import rennie from "../../../assets/images/coaches/men/modern/dave-rennie.jpg";
import farrell from "../../../assets/images/coaches/men/modern/andy-farrell.jpg";
import galthie from "../../../assets/images/coaches/men/modern/fabien-galthié.jpg";
import contepomi from "../../../assets/images/coaches/men/modern/felipe-contepomi.jpg";
import borthwick from "../../../assets/images/coaches/men/modern/steve-borthwick.jpg";
import townsend from "../../../assets/images/coaches/men/modern/gregor-townsend.jpg";
import schmidt from "../../../assets/images/coaches/men/modern/joe-schmidt.jpg";
import quesada from "../../../assets/images/coaches/men/modern/gonzalo-quesada.jpg";
import tandy from "../../../assets/images/coaches/men/modern/steve-tandy.jpg";
import joseph from "../../../assets/images/coaches/men/modern/jamie-joseph.jpg";

/* WOMEN COACH IMAGES */

import bunting from "../../../assets/images/coaches/women/allan-bunting.jpg";
import roselli from "../../../assets/images/coaches/women/fabio-roselli.jpg";
import ratier from "../../../assets/images/coaches/women/francois-ratier.jpg";
import yapp from "../../../assets/images/coaches/women/jo-yapp.jpg";
import mitchell from "../../../assets/images/coaches/women/john-mitchell.jpg";
import bemand from "../../../assets/images/coaches/women/scott-bemand.jpg";
import lynn from "../../../assets/images/coaches/women/sean-lynn.jpg";
import fukofuka from "../../../assets/images/coaches/women/sione-fukofuka.jpg";
import debruin from "../../../assets/images/coaches/women/swys-debruin.jpg";

type Coach = {
  name: string;
  era: string;
  image?: string;
  bio: string;
};

type NationData = {
  name: string;
  nicknameMen: string;
  nicknameWomen: string;
  flag: string;
  logo: string;
  menCoach: Coach;
  womenCoach: Coach;
};

const nations: Record<string, NationData> = {

  "south-africa": {
    name: "South Africa",
    nicknameMen: "Springboks",
    nicknameWomen: "Springbok Women",
    flag: southAfricaFlag,
    logo: southAfricaLogo,
    menCoach: {
      name: "Rassie Erasmus",
      era: "2018–Present",
      image: erasmus,
      bio: "Architect of South Africa's modern rugby era."
    },
    womenCoach: {
      name: "Swys de Bruin",
      era: "2024–Present",
      image: debruin,
      bio: "Led the Springbok Women during their historic 2025 Rugby World Cup campaign."
    }
  },

  "new-zealand": {
    name: "New Zealand",
    nicknameMen: "All Blacks",
    nicknameWomen: "Black Ferns",
    flag: newZealandFlag,
    logo: newZealandLogo,
    menCoach: {
      name: "Dave Rennie",
      era: "2026–Present",
      image: rennie,
      bio: "Leading the All Blacks into the next international cycle."
    },
    womenCoach: {
      name: "Allan Bunting",
      era: "2022–Present",
      image: bunting,
      bio: "Guided the Black Ferns to world dominance."
    }
  },

  "england": {
    name: "England",
    nicknameMen: "Red Rose",
    nicknameWomen: "Red Roses",
    flag: englandFlag,
    logo: englandLogo,
    menCoach: {
      name: "Steve Borthwick",
      era: "2022–Present",
      image: borthwick,
      bio: "Rebuilding England's tactical structure and depth."
    },
    womenCoach: {
      name: "John Mitchell",
      era: "2023–Present",
      image: mitchell,
      bio: "Head coach of the dominant Red Roses era."
    }
  },

  "france": {
    name: "France",
    nicknameMen: "Les Bleus",
    nicknameWomen: "Les Bleues",
    flag: franceFlag,
    logo: franceLogo,
    menCoach: {
      name: "Fabien Galthié",
      era: "2020–Present",
      image: galthie,
      bio: "Architect of France's modern resurgence."
    },
    womenCoach: {
      name: "François Ratier",
      era: "2019–Present",
      image: ratier,
      bio: "Long-time architect of the French women's national programme."
    }
  },

  "ireland": {
    name: "Ireland",
    nicknameMen: "Ireland",
    nicknameWomen: "Ireland Women",
    flag: irelandFlag,
    logo: irelandLogo,
    menCoach: {
      name: "Andy Farrell",
      era: "2019–Present",
      image: farrell,
      bio: "Led Ireland to consistent Six Nations success."
    },
    womenCoach: {
      name: "Scott Bemand",
      era: "2023–Present",
      image: bemand,
      bio: "Guiding Ireland Women through a rebuilding phase."
    }
  },

  "scotland": {
    name: "Scotland",
    nicknameMen: "Scotland",
    nicknameWomen: "Scotland Women",
    flag: scotlandFlag,
    logo: scotlandLogo,
    menCoach: {
      name: "Gregor Townsend",
      era: "2017–Present",
      image: townsend,
      bio: "Oversaw Scotland's rise as a competitive international side."
    },
    womenCoach: {
      name: "Sione Fukofuka",
      era: "2024–Present",
      image: fukofuka,
      bio: "Leading Scotland Women into a new competitive cycle."
    }
  },

  "australia": {
    name: "Australia",
    nicknameMen: "Wallabies",
    nicknameWomen: "Wallaroos",
    flag: australiaFlag,
    logo: australiaLogo,
    menCoach: {
      name: "Joe Schmidt",
      era: "2024–Present",
      image: schmidt,
      bio: "Rebuilding the Wallabies ahead of the next World Cup cycle."
    },
    womenCoach: {
      name: "Jo Yapp",
      era: "2024–Present",
      image: yapp,
      bio: "Former England captain guiding the Wallaroos."
    }
  },

  "italy": {
    name: "Italy",
    nicknameMen: "Azzurri",
    nicknameWomen: "Azzurre",
    flag: italyFlag,
    logo: italyLogo,
    menCoach: {
      name: "Gonzalo Quesada",
      era: "2024–Present",
      image: quesada,
      bio: "Shaping Italy's next competitive phase."
    },
    womenCoach: {
      name: "Fabio Roselli",
      era: "2017–Present",
      image: roselli,
      bio: "Key figure in Italy's women's rugby development."
    }
  },

  "wales": {
    name: "Wales",
    nicknameMen: "Wales",
    nicknameWomen: "Wales Women",
    flag: walesFlag,
    logo: walesLogo,
    menCoach: {
      name: "Steve Tandy",
      era: "2025–Present",
      image: tandy,
      bio: "Leading Wales into a new competitive cycle."
    },
    womenCoach: {
      name: "Sean Lynn",
      era: "2024–Present",
      image: lynn,
      bio: "Leading Wales Women through a new professional era."
    }
  },

  "argentina": {
    name: "Argentina",
    nicknameMen: "Los Pumas",
    nicknameWomen: "Las Yaguaretés",
    flag: argentinaFlag,
    logo: argentinaLogo,
    menCoach: {
      name: "Felipe Contepomi",
      era: "2024–Present",
      image: contepomi,
      bio: "Former international captain now leading Los Pumas."
    },
    womenCoach: {
      name: "Argentina Women Programme",
      era: "Developing",
      bio: "Argentina's women's programme continues to grow."
    }
  },

  "japan": {
    name: "Japan",
    nicknameMen: "Brave Blossoms",
    nicknameWomen: "Sakura Fifteen",
    flag: japanFlag,
    logo: japanLogo,
    menCoach: {
      name: "Jamie Joseph",
      era: "2016–Present",
      image: joseph,
      bio: "Guided Japan to historic Rugby World Cup success."
    },
    womenCoach: {
      name: "Japan Women Programme",
      era: "Developing",
      bio: "Japan's women's programme continues to expand."
    }
  },

  "fiji": {
    name: "Fiji",
    nicknameMen: "Flying Fijians",
    nicknameWomen: "Fijiana",
    flag: fijiFlag,
    logo: fijiLogo,
    menCoach: {
      name: "Mick Byrne",
      era: "2023–Present",
      bio: "Former All Blacks skills coach leading Fiji's programme."
    },
    womenCoach: {
      name: "Fijiana Programme",
      era: "Developing",
      bio: "Fijiana continues to grow internationally."
    }
  }

};

export default function SquadNation2026() {

  const { nation } = useParams();
  const navigate = useNavigate();

  const gender = window.location.pathname.includes("/women") ? "women" : "men";

const data = nation ? nations[nation] : undefined;

if (!data) return <div>Nation not found</div>;

const squadKey = nation
  ? gender === "women"
    ? `${nation}-women`
    : nation
  : "";

const squad = squadKey ? squads2026[squadKey] : undefined;

const coach =
  gender === "women"
    ? data.womenCoach
    : data.menCoach;

const nickname =
  gender === "women"
    ? data.nicknameWomen
    : data.nicknameMen;
    
  return (
    <main className={styles.page}>

      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${data.flag})` }}
      >
        <div className={styles.heroOverlay}></div>

        <img src={data.logo} alt={data.name} className={styles.logo}/>

        <div className={styles.heroText}>
          <h1>{data.name}</h1>
          <span className={styles.nickname}>{nickname}</span>
        </div>
      </section>

      <div className={styles.backWrap}>
        <button
          className={styles.back}
          onClick={() =>
            navigate(`/heritage/squads/${gender}`)
          }
        >
          ← Back to {gender === "women" ? "Women's" : "Men's"} Squads
        </button>
      </div>

      <section className={styles.section}>
        <h2>Head Coach</h2>

        <div className={styles.coachCard}>

          {coach.image ? (
            <img
              src={coach.image}
              alt={coach.name}
              className={styles.coachImage}
            />
          ) : (
            <div className={styles.coachPlaceholder}>
              {coach.name.split(" ")[0]}
            </div>
          )}

          <div>
            <h3>{coach.name}</h3>

            <span className={styles.meta}>
              {data.name} · {coach.era}
            </span>

            <p>{coach.bio}</p>

          </div>

        </div>

      </section>

     {squad && squad.squadSize !== undefined && squad.squadSize > 0 ? (
  <>
    <section className={styles.sectionAlt}>

      <h2>2026 Squad Overview</h2>

      <div className={styles.overviewGrid}>

        <div className={styles.infoCard}>
          <h3>Captain</h3>
          <p>{squad.captain || "TBC"}</p>
        </div>

        <div className={styles.infoCard}>
          <h3>Squad Size</h3>
          <p>{squad.squadSize} Players</p>
        </div>

      </div>

    </section>

    <section className={styles.section}>

      <h2>Uncapped Players</h2>

      <div className={styles.playerGrid}>
        {squad.uncappedPlayers?.map((player: string) => (
          <div key={player} className={styles.playerChip}>
            {player}
          </div>
        ))}
      </div>

    </section>

    <section className={styles.section}>

      <h2>Key Returnees</h2>

      <div className={styles.playerGrid}>
        {squad.keyReturnees?.map((player: string) => (
          <div key={player} className={styles.playerChip}>
            {player}
          </div>
        ))}
      </div>

    </section>

    <section className={styles.section}>

  <h2>Players To Watch</h2>

  <div className={styles.playerGrid}>
    {squad.playersToWatch?.map((player: string) => (
      <div key={player} className={styles.playerChip}>
        {player}
      </div>
    ))}
  </div>

</section>

    <section className={styles.section}>

      <h2>Forwards</h2>

      <div className={styles.playerGrid}>
        {squad.forwards?.map((player: string) => (
          <div key={player} className={styles.playerChip}>
            {player}
          </div>
        ))}
      </div>

    </section>

    <section className={styles.section}>

      <h2>Backs</h2>

      <div className={styles.playerGrid}>
        {squad.backs?.map((player: string) => (
          <div key={player} className={styles.playerChip}>
            {player}
          </div>
        ))}
      </div>

    </section>

    <section className={styles.sectionAlt}>

      <h2>Selection Notes</h2>

      <div className={styles.notesList}>
        {squad.selectionNotes?.map((note: string) => (
          <p key={note}>{note}</p>
        ))}
      </div>

    </section>
  </>
) : (
  <section className={styles.sectionAlt}>
    <h2>Playing Squad · 2026</h2>

    <p>
      Official squad announcement pending.
    </p>
  </section>
)}

    </main>
  );
}