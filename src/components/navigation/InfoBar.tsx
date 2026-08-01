import { NavLink } from "react-router-dom";
import styles from "./InfoBar.module.css";

/**
 * INFO BAR — WAVE 2
 * --------------------------------------------------
 * Single paid app navigation rail.
 * Now includes Men's Rugby and Women's Rugby as colorful pills
 * in addition to Heritage and Anthems
 */

export default function InfoBar() {
  // Primary featured items - shown as colorful pills
  const primaryItems = [
    { 
      label: "Men's Rugby", 
      route: "/tournaments/men",
      className: "mens"
    },
    { 
      label: "Women's Rugby", 
      route: "/tournaments/women",
      className: "womens"
    },
    { 
      label: "Anthems", 
      route: "/anthems",
      className: "anthems"
    },
    { 
      label: "Heritage", 
      route: "/heritage",
      className: "heritage"
    },
  ];

  // Secondary items - standard links
  const secondaryItems = [
    { label: "Notifications", route: "/notifications" },
    { label: "Tournaments", route: "/tournaments" },
    { label: "Match Center", route: "/match-center" },
    { label: "Matchday Journeys", route: "/matchday-journeys" },
    { label: "The Rugby Studio", route: "/media" },
    { label: "Fanzone", route: "/fanzone" },
    { label: "News", route: "/news" },
    { label: "Defining Moments", route: "/defining-moments" },
    { label: "Inside the Game", route: "/inside-the-game" },
    { label: "Calendar", route: "/calendar" },
    { label: "Stadiums", route: "/stadiums" },
    { label: "Merch", route: "/merch" },
  ];

  return (
    <section className={styles.bar}>
      <div className={styles.grid}>
        {/* Primary items - colorful pills */}
        {primaryItems.map((item) => (
          <NavLink 
            key={item.route} 
            to={item.route} 
            className={`${styles.link} ${styles[item.className]}`}
          >
            {item.label}
          </NavLink>
        ))}

        {/* Secondary items - standard links */}
        {secondaryItems.map((item) => (
          <NavLink key={item.route} to={item.route} className={styles.link}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </section>
  );
}