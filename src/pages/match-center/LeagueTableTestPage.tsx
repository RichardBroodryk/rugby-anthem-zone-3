import styles from "./LeagueTablePage.module.css";
import { tables2026 } from "../../data/tables2026";

export default function LeagueTableTestPage() {
  const key = "urc-men";
  const table = tables2026[key];

  console.log("TEST TABLE KEY:", key);
  console.log("TEST TABLE DATA:", table);

  if (!table) {
    return <div style={{ color: "red" }}>NO TABLE FOUND</div>;
  }

  return (
    <main className={styles.page}>
      <h1 style={{ color: "red" }}>TEST PAGE — URC MEN</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>Coach</th>
            <th>PD</th>
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>
          {table.map((row) => (
            <tr key={row.team}>
              <td>{row.position}</td>
              <td>{row.team}</td>
              <td>{row.coach}</td>
              <td>{row.pointsFor - row.pointsAgainst}</td>
              <td>{row.leaguePoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}