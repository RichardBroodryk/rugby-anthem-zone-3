import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LiveNowBar.module.css";

import { getMatches } from "../../data/matchesAdapter";

/* ================= FLAG IMPORTS ================= */

import argentina from "../../assets/images/flags/argentina.jpg";
import australia from "../../assets/images/flags/australia.jpg";
import england from "../../assets/images/flags/england.png";
import fiji from "../../assets/images/flags/fiji.jpg";
import france from "../../assets/images/flags/france.jpg";
import ireland from "../../assets/images/flags/ireland.jpg";
import italy from "../../assets/images/flags/italy.jpg";
import japan from "../../assets/images/flags/japan.jpg";
import newZealand from "../../assets/images/flags/new-zealand.jpg";
import scotland from "../../assets/images/flags/scotland.jpg";
import southAfrica from "../../assets/images/flags/south-africa.jpg";
import wales from "../../assets/images/flags/wales.jpg";

/* ================= FLAG MAP ================= */

const flags: Record<string, string> = {
  argentina,
  australia,
  england,
  fiji,
  france,
  ireland,
  italy,
  japan,
  "new-zealand": newZealand,
  scotland,
  "south-africa": southAfrica,
  wales,
};

/* derive match type from adapter */

type MatchData = Awaited<ReturnType<typeof getMatches>>[number];

export default function LiveNowBar() {

  const [match, setMatch] = useState<MatchData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {

    async function loadMatches() {

      const matches = await getMatches();

      if (!matches || matches.length === 0) return;

      const sorted = [...matches].sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

      const now = Date.now();

      const next = sorted.find(
        (m) => new Date(m.date).getTime() > now
      );

      setMatch(next || sorted[0]);

    }

    loadMatches();

  }, []);

  if (!match) return null;

  const homeFlag = flags[match.home.country];
  const awayFlag = flags[match.away.country];

  const scoreExists = match.score !== undefined;

  return (

    <div className={styles.bar}>

      <div className={styles.liveBadge}>
        {scoreExists ? "LIVE" : "NEXT MATCH"}
      </div>

      <div className={styles.matchInfo}>

        <div className={styles.teams}>

          <span className={styles.team}>

            {homeFlag && (
              <img
                src={homeFlag}
                alt={match.home.country}
                className={styles.flag}
              />
            )}

            {match.home.name}

          </span>

          <span className={styles.score}>

            {scoreExists
              ? `${match.score?.home} – ${match.score?.away}`
              : "vs"}

          </span>

          <span className={styles.team}>

            {awayFlag && (
              <img
                src={awayFlag}
                alt={match.away.country}
                className={styles.flag}
              />
            )}

            {match.away.name}

          </span>

        </div>

        <div className={styles.tournament}>
          {match.tournament}
        </div>

      </div>

      <div className={styles.actions}>

        <button
          className={styles.actionBtn}
          onClick={() => navigate("/ppv")}
        >
          Watch
        </button>

        <button
          className={styles.actionBtn}
          onClick={() => navigate("/audio")}
        >
          Listen
        </button>

        <button
          className={styles.actionBtn}
          onClick={() => navigate(`/match/${match.id}`)}
        >
          Match Centre
        </button>

      </div>

    </div>

  );

}