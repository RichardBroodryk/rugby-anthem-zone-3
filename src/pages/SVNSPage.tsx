import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";

import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

import { fetchSvnsMatches } from "../services/svnsService";
import { matches2026 } from "../data/matches";

/* ==================================================
   🧠 POOL GROUPING
   ================================================== */

function getPools(matches: MatchData[]) {
  const womenPools: Record<string, MatchData[]> = { A: [], B: [], C: [] };
  const menPools: Record<string, MatchData[]> = { A: [], B: [], C: [] };

  const svnsPoolMatches = matches.filter(m => 
    m.competitionId === "svns" && m.round === "pool"
  );

  svnsPoolMatches.forEach(match => {
    const genderKey = match.gender === "women" ? "women" : "men";
    const poolKey = match.pool && ["A", "B", "C"].includes(match.pool) ? match.pool : "A";

    const target = genderKey === "women" ? womenPools : menPools;
    if (!target[poolKey]) target[poolKey] = [];
    target[poolKey].push(match);
  });

  return { women: womenPools, men: menPools };
}

/* ==================================================
   🧠 POOL TABLE (Simple points view)
   ================================================== */

type PoolRow = {
  team: string;
  country: string;
  points: number;
};

function buildPoolTable(matches: MatchData[]): PoolRow[] {
  const table: Record<string, PoolRow> = {};

  matches.forEach((match) => {
    [match.home, match.away].forEach((team) => {
      if (!table[team.name]) {
        table[team.name] = { team: team.name, country: team.country, points: 0 };
      }
    });

    if (!match.score) return;

    const home = table[match.home.name];
    const away = table[match.away.name];

    if (home && away) {
      if ((match.score.home || 0) > (match.score.away || 0)) home.points += 3;
      else if ((match.score.away || 0) > (match.score.home || 0)) away.points += 3;
    }
  });

  return Object.values(table).sort((a, b) => b.points - a.points);
}

/* ==================================================
   🚀 MAIN SVNS PAGE
   ================================================== */

export default function SVNSPage() {
  const navigate = useNavigate();

  const tournament = tournaments2026.find((t) => t.conceptId === "svns");
  const visual = getTournamentVisual("svns");

  const [svnsMatches, setSvnsMatches] = useState<MatchData[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSvnsMatches();
        console.log("SVNS LIVE DATA LOADED:", data.length);
        setSvnsMatches(data);
      } catch (err) {
        console.error("SVNS LOAD FAILED:", err);
      }
    };
    load();
  }, []);

  if (!tournament) return <div>SVNS tournament not found</div>;

  if (!svnsMatches.length) {
    return (
      <main className={styles.page}>
        <header className={`${styles.hero} ${styles.heroSVNSLayout}`} style={{ backgroundImage: `url(${visual.heroImageMen || visual.heroImageWomen})` }}>
          <div className={styles.heroContent}>
            <h1>{tournament.name} {tournament.year}</h1>
            <p>Loading championship data...</p>
          </div>
        </header>
      </main>
    );
  }

  const { women, men } = getPools(matches2026);

  return (
    <main className={styles.page}>
      {/* HERO - UNCHANGED */}
      <header className={`${styles.hero} ${styles.heroSVNSLayout}`} style={{ backgroundImage: `url(${visual.heroImageMen || visual.heroImageWomen})` }}>
        <div className={styles.heroContent}>
          <h1>{tournament.name} {tournament.year}</h1>
          <p>{tournament.heroSubtitle}</p>
        </div>
      </header>

      {/* NAV - UNCHANGED */}
      <div className={styles.navButtons}>
        <button className={styles.primaryButton} onClick={() => navigate("/svns/matches")}>Matches</button>
        <button className={styles.secondaryButton} onClick={() => navigate("/svns/pools")}>Pools</button>
      </div>

      {/* BACK - UNCHANGED */}
      <div className={styles.backNav}>
        <button className={styles.backButton} onClick={() => navigate("/tournaments")}>← All Tournaments</button>
      </div>

      {/* POOLS SECTION */}
      <section className={styles.section}>
        <h2>Pools</h2>

        {/* WOMEN */}
        <h3>Women</h3>
        <div className={styles.poolsGrid}>
          {["A", "B", "C"].map((poolKey) => {
            const matches = women[poolKey] || [];
            const table = buildPoolTable(matches);
            return (
              <div key={`w-${poolKey}`} className={styles.poolCard}>
                <h4>Pool {poolKey}</h4>
                {table.map((row, i) => {
                  const cleanName = row.team.replace(/ 7s/i, "");
                  return (
                    <div key={row.team} className={styles.poolRow}>
                      <span>{i + 1}</span>
                      <div className={styles.team}>
                        <img src={svnsFlags[cleanName]} alt={cleanName} className={styles.flag} />
                        <span>{cleanName}</span>
                      </div>
                      <span>{row.points}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* MEN */}
        <h3>Men</h3>
        <div className={styles.poolsGrid}>
          {["A", "B", "C"].map((poolKey) => {
            const matches = men[poolKey] || [];
            const table = buildPoolTable(matches);
            return (
              <div key={`m-${poolKey}`} className={styles.poolCard}>
                <h4>Pool {poolKey}</h4>
                {table.map((row, i) => {
                  const cleanName = row.team.replace(/ 7s/i, "");
                  return (
                    <div key={row.team} className={styles.poolRow}>
                      <span>{i + 1}</span>
                      <div className={styles.team}>
                        <img src={svnsFlags[cleanName]} alt={cleanName} className={styles.flag} />
                        <span>{cleanName}</span>
                      </div>
                      <span>{row.points}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}