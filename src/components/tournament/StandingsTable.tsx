import styles from "./StandingsTable.module.css";

type TeamStanding = {
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
};

type Props = {
  data: TeamStanding[];
};

export default function StandingsTable({ data }: Props) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>L</th>
            <th>Pts</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.empty}>
                Standings will be updated
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={row.team}>
                <td>{i + 1}</td>
                <td>{row.team}</td>
                <td>{row.played}</td>
                <td>{row.won}</td>
                <td>{row.lost}</td>
                <td>{row.points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}