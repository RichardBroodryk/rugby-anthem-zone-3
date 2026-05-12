import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMatches } from "../../data/matchesAdapter";
import { buildStandings } from "../../utils/standings/standingsEngine";

import type { MatchData } from "../../data/matches/types";

export default function LeagueTableDebugPage() {
  const { leagueId } = useParams<{ leagueId: string }>();

  const [matches, setMatches] = useState<MatchData[]>([]);
  const [standings, setStandings] = useState<any[]>([]);

  const [id, gender] = (leagueId || "").split("-");

  useEffect(() => {
    async function load() {
      if (!id || !gender) return;

      const data = await getMatches({
        type: "domestic",
        leagueId: id,
        gender: gender as "men" | "women",
      });

      console.log("🔥 RAW MATCHES:", data);

      const withScores = data.filter((m) => m.score);

      console.log("🔥 MATCHES WITH SCORES:", withScores);

      setMatches(data);

      if (withScores.length > 0) {
        const table = buildStandings(withScores);
        console.log("🔥 STANDINGS:", table);
        setStandings(table);
      }
    }

    load();
  }, [id, gender]);

  return (
    <div style={{ padding: 20 }}>
      <h1>DEBUG — {leagueId}</h1>

      <h2>Matches: {matches.length}</h2>

      <h3>Sample Matches</h3>
      <pre style={{ maxHeight: 300, overflow: "auto", background: "#111", color: "#0f0", padding: 10 }}>
        {JSON.stringify(matches.slice(0, 5), null, 2)}
      </pre>

      <h2>Standings (Computed)</h2>

      {standings.length === 0 ? (
        <div>No standings computed</div>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Team</th>
              <th>P</th>
              <th>W</th>
              <th>L</th>
              <th>PD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((t) => (
              <tr key={t.team}>
                <td>{t.team}</td>
                <td>{t.played}</td>
                <td>{t.won}</td>
                <td>{t.lost}</td>
                <td>{t.pointsDiff}</td>
                <td>{t.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}