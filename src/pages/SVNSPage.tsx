import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { matches2026 } from "../data/matches";
import type { MatchData } from "../data/matches/types";

import styles from "./SVNSPage.module.css";

/* ================= HELPERS ================= */

function getDayLabel(date: string) {
  const d = new Date(date);
  const day = d.getDate();

  if (day === 17) return "Day 1";
  if (day === 18) return "Day 2";
  if (day === 19) return "Day 3";

  return d.toDateString();
}

/* ================= TYPES ================= */

type PoolRow = {
  team: string;
  country: string;
  played: number;
  won: number;
  lost: number;
  pf: number;
  pa: number;
  pd: number;
  points: number;
};

/* ================= POOL ENGINE ================= */

function buildPoolTable(matches: MatchData[]) {
  const table: Record<string, PoolRow> = {};

  matches.forEach((match) => {
    if (!match.pool) return;

    [match.home, match.away].forEach((team) => {
      if (!table[team.name]) {
        table[team.name] = {
          team: team.name,
          country: team.country,
          played: 0,
          won: 0,
          lost: 0,
          pf: 0,
          pa: 0,
          pd: 0,
          points: 0,
        };
      }
    });

    if (!match.score) return;

    const home = table[match.home.name];
    const away = table[match.away.name];

    home.played++;
    away.played++;

    home.pf += match.score.home;
    home.pa += match.score.away;

    away.pf += match.score.away;
    away.pa += match.score.home;

    if (match.score.home > match.score.away) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (match.score.away > match.score.home) {
      away.won++;
      away.points += 3;
      home.lost++;
    }
  });

  return Object.values(table)
    .map((t) => ({ ...t, pd: t.pf - t.pa }))
    .sort((a, b) => b.points - a.points || b.pd - a.pd);
}

function getPools(matches: MatchData[], gender: "men" | "women") {
  const pools: Record<string, MatchData[]> = {};

  matches
    .filter((m) => m.gender === gender && m.round === "pool")
    .forEach((m) => {
      if (!m.pool) return;

      if (!pools[m.pool]) pools[m.pool] = [];
      pools[m.pool].push(m);
    });

  return pools;
}

/* ================= BRACKET ENGINE ================= */

function getTopTeams(pools: Record<string, MatchData[]>) {
  const tables = Object.entries(pools).map(([pool, matches]) => ({
    pool,
    table: buildPoolTable(matches),
  }));

  const first: PoolRow[] = [];
  const second: PoolRow[] = [];
  const third: PoolRow[] = [];

  tables.forEach(({ table }) => {
    if (table[0]) first.push(table[0]);
    if (table[1]) second.push(table[1]);
    if (table[2]) third.push(table[2]);
  });

  const bestThird = third
    .sort((a, b) => b.points - a.points || b.pd - a.pd)
    .slice(0, 2);

  return {
    first,
    second,
    bestThird,
  };
}

function buildQuarterFinals(
  pools: Record<string, MatchData[]>
) {
  const { first, second, bestThird } = getTopTeams(pools);

  return [
    { home: first[0], away: bestThird[0] },
    { home: first[1], away: second[2] },
    { home: first[2], away: second[1] },
    { home: bestThird[1], away: second[0] },
  ];
}

/* ================= PAGE ================= */

export default function SVNSPage() {
  const navigate = useNavigate();

  const svnsMatches = useMemo(() => {
    return matches2026.filter(
      (m: MatchData) =>
        m.competitionId === "svns" &&
        m.stage === "hong-kong"
    );
  }, []);

  const matchesByDay = useMemo(() => {
    const grouped: Record<string, MatchData[]> = {};

    svnsMatches.forEach((match) => {
      const day = getDayLabel(match.date);

      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(match);
    });

    return grouped;
  }, [svnsMatches]);

  return (
  <main className={styles.page}>
    {/* HERO */}
    <header className={styles.hero}>
      <h1>SVNS World Championship — Hong Kong</h1>
      <p>Pool Stage → Knockout → Finals</p>
    </header>

    {/* BACK */}
    <div className={styles.backNav}>
      <button onClick={() => navigate("/tournaments")}>
        ← Back to Tournaments
      </button>
    </div>

    {Object.entries(matchesByDay).map(([day, matches]) => {
      const womenPools = getPools(matches, "women");
      const menPools = getPools(matches, "men");

      const womenQF = buildQuarterFinals(womenPools);
      const menQF = buildQuarterFinals(menPools);

      return (
        <section key={day} className={styles.section}>
          <h2 className={styles.dayTitle}>{day}</h2>

          {/* ================= WOMEN ================= */}
          <div className={styles.block}>
            <h3 className={styles.genderTitle}>Women</h3>

            {/* POOLS */}
            <div className={styles.poolsGrid}>
              {Object.entries(womenPools).map(([pool, poolMatches]) => {
                const table = buildPoolTable(poolMatches);

                return (
                  <div key={pool} className={styles.poolCard}>
                    <h4>Pool {pool}</h4>

                    <table className={styles.poolTable}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Team</th>
                          <th>P</th>
                          <th>PD</th>
                          <th>PTS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {table.map((row, i) => (
                          <tr key={row.team}>
                            <td>{i + 1}</td>
                            <td className={styles.teamCell}>
                              {row.team}
                            </td>
                            <td>{row.played}</td>
                            <td>{row.pd}</td>
                            <td className={styles.points}>
                              {row.points}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>

            {/* BRACKET */}
            <div className={styles.bracketCard}>
              <h4>Quarter-finals</h4>

              <div className={styles.bracketGrid}>
                {womenQF.map((m, i) => (
                  <div key={i} className={styles.matchBox}>
                    <div>{m.home?.team || "TBD"}</div>
                    <div className={styles.vs}>vs</div>
                    <div>{m.away?.team || "TBD"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= MEN ================= */}
          <div className={styles.block}>
            <h3 className={styles.genderTitle}>Men</h3>

            <div className={styles.poolsGrid}>
              {Object.entries(menPools).map(([pool, poolMatches]) => {
                const table = buildPoolTable(poolMatches);

                return (
                  <div key={pool} className={styles.poolCard}>
                    <h4>Pool {pool}</h4>

                    <table className={styles.poolTable}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Team</th>
                          <th>P</th>
                          <th>PD</th>
                          <th>PTS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {table.map((row, i) => (
                          <tr key={row.team}>
                            <td>{i + 1}</td>
                            <td className={styles.teamCell}>
                              {row.team}
                            </td>
                            <td>{row.played}</td>
                            <td>{row.pd}</td>
                            <td className={styles.points}>
                              {row.points}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>

            <div className={styles.bracketCard}>
              <h4>Quarter-finals</h4>

              <div className={styles.bracketGrid}>
                {menQF.map((m, i) => (
                  <div key={i} className={styles.matchBox}>
                    <div>{m.home?.team || "TBD"}</div>
                    <div className={styles.vs}>vs</div>
                    <div>{m.away?.team || "TBD"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
                  </section>
        );
      })}
    </main>
  );
}