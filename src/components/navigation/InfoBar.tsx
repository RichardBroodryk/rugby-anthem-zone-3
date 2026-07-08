import { NavLink } from "react-router-dom";
import styles from "./InfoBar.module.css";

/**
 * INFO BAR — WAVE 2
 * --------------------------------------------------
 * Single paid app navigation rail.
 * No premium/super branching.
 */

export default function InfoBar() {
  const items = [
    { label: "Notifications", route: "/notifications" },
    { label: "Anthems", route: "/anthems" },
    { label: "Tournaments", route: "/tournaments" },
    { label: "Match Center", route: "/match-center" },
    { label: "Matchday Journeys", route: "/matchday-journeys" },
    { label: "The Rugby Studio", route: "/media" },
    { label: "Fanzone", route: "/fanzone" },
    { label: "News", route: "/news" },
    { label: "Heritage", route: "/heritage" },
    { label: "Defining Moments", route: "/defining-moments" },
    { label: "Inside the Game", route: "/inside-the-game" },
    { label: "Calendar", route: "/calendar" },
    { label: "Stadiums", route: "/stadiums" },
    { label: "Merch", route: "/merch" },
  ];

  return (
    <section className={styles.bar}>
      <div className={styles.grid}>
        {items.map((item) => (
          <NavLink key={item.route} to={item.route} className={styles.link}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
}