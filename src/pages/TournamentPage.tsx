import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MatchRow from "../components/match/MatchRow";

import { tournaments2026 } from "../data/tournamentMeta";
import { getTournamentVisual } from "../data/tournamentVisuals";
import { matches2026 } from "../data/matches";

import { fetchSixNationsWomenMatches } from "../services/sixNationsWomenService";

import type { MatchData } from "../data/matches/types";

import styles from "./TournamentPage.module.css";
import { svnsFlags } from "../data/flags/svnsFlags";

function cleanTeamName(name: string): string {
  return name.replace(/ W$/, "").replace(/ Women$/, "").trim();
}

export default function TournamentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [matches, setMatches] = useState<MatchData[]>([]);

  const tournament = tournaments2026.find((t) => t.route === location.pathname);

  useEffect(() => {
    if (!tournament) return;

    if (tournament.conceptId === "six-nations-women") {
      fetchSixNationsWomenMatches().then((data) => {
        console.log("SNW DATA LOADED:", data.length);
        setMatches(data);
      });
      return;
    }

    // fallback
    const filtered = matches2026.filter((m) => m.competitionId === "six-nations-women");
    setMatches(filtered);
  }, [tournament]);

  if (!tournament) return <div className={styles.error}>Tournament not found</div>;
  if (!matches.length) {
    return (
      <main className={styles.page}>
        <header className={styles.hero}>
          <h1>{tournament.name}</h1>
        </header>
        <div className={styles.error}>No matches yet</div>
      </main>
    );
  }

  const visual = getTournamentVisual(tournament.conceptId);

  /* ================= STANDINGS ================= */
  type TableRow = {
    team: string;
    country: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    pf: number;
    pa: number;
    pd: number;
    points: number;
  };

  const standings: Record<string, TableRow> = {};

  const teams = Array.from(new Map(matches.flatMap((m) => [[m.home.name, m.home], [m.away.name, m.away]])).values());

  teams.forEach((team) => {
    const clean = cleanTeamName(team.name);
    standings[clean] = { team: clean, country: team.country, played: 0, won: 0, draw: 0, lost: 0, pf: 0, pa: 0, pd: 0, points: 0 };
  });

  matches.forEach((match) => {
    if (!match.score) return;
    const homeClean = cleanTeamName(match.home.name);
    const awayClean = cleanTeamName(match.away.name);
    const home = standings[homeClean];
    const away = standings[awayClean];
    if (!home || !away) return;

    home.played++; away.played++;
    home.pf += match.score.home || 0; home.pa += match.score.away || 0;
    away.pf += match.score.away || 0; away.pa += match.score.home || 0;

    if ((match.score.home || 0) > (match.score.away || 0)) { home.won++; home.points += 4; away.lost++; }
    else if ((match.score.away || 0) > (match.score.home || 0)) { away.won++; away.points += 4; home.lost++; }
    else { home.draw++; away.draw++; home.points += 2; away.points += 2; }
  });

  const sortedStandings = Object.values(standings).sort((a, b) => b.points - a.points || b.pd - a.pd);

  /* ================= ROUND GROUPING (using your exact dates) ================= */
  const groupedMatches: Record<string, MatchData[]> = {};
  matches.forEach((match) => {
    let roundLabel = "Other";
    if (tournament.conceptId === "six-nations-women") {
      const day = new Date(match.date).getDate();
      if (day === 11) roundLabel = "Round 1";
      else if (day === 18) roundLabel = "Round 2";
      else if (day === 25) roundLabel = "Round 3";
      else if (day === 9) roundLabel = "Round 4";
      else if (day === 17) roundLabel = "Round 5";
    }
    if (!groupedMatches[roundLabel]) groupedMatches[roundLabel] = [];
    groupedMatches[roundLabel].push(match);
  });

  return (
    <main className={styles.page}>
      <header className={styles.hero} style={{ backgroundImage: `url(${visual.heroImageWomen})` }}>
        <div className={styles.heroContent}>
          <h1>{tournament.name} {tournament.year}</h1>
          <p>{tournament.heroSubtitle}</p>
        </div>
      </header>

      <div className={styles.backNav}>
        <button onClick={() => navigate("/tournaments")}>← Back to Tournaments</button>
      </div>

      {/* STANDINGS - clean flags */}
      {sortedStandings.length > 0 && (
        <section className={styles.section}>
          <h2>Standings</h2>
          <div className={styles.tableContainer}>
            <table className={styles.standingsTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>P</th><th>W</th><th>D</th><th>L</th>
                  <th>PF</th><th>PA</th><th>PD</th><th>Pts</th>
                </tr>
              </thead>
              <tbody>
                {sortedStandings.map((row, i) => (
                  <tr key={row.team}>
                    <td>{i + 1}</td>
                    <td>
                      <img src={svnsFlags[row.country] || ""} alt={row.team} className={styles.flag} />
                      {row.team}
                    </td>
                    <td>{row.played}</td>
                    <td>{row.won}</td>
                    <td>{row.draw}</td>
                    <td>{row.lost}</td>
                    <td>{row.pf}</td>
                    <td>{row.pa}</td>
                    <td>{row.pd}</td>
                    <td><strong>{row.points}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MATCHES - proper rounds */}
      <section className={styles.section}>
        <h2>Matches</h2>
        {Object.entries(groupedMatches).map(([round, games]) => (
          <div key={round}>
            <h3>{round}</h3>
            {games.map((match) => (
              <MatchRow
                key={match.id}
                home={match.home}
                away={match.away}
                state={match.score ? "final" : "upcoming"}
                score={match.score}
                metaLeft={match.date}
                metaRight={match.venue}
                onClick={() => navigate(`/match/${match.id}`)}
              />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}