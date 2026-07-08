import { Outlet, useLocation } from "react-router-dom";
import PrimaryNav from "../components/nav/PrimaryNav";
import SponsorBar from "../components/sponsors/SponsorBar";
import {
  primarySponsors,
  secondarySponsors,
  utilitySponsors,
} from "../data/sponsors";
import styles from "./AppLayout.module.css";

/**
 * APP LAYOUT — ONE TIER APP SHELL
 * --------------------------------------------------
 * Logged-in paid app shell only.
 * No freemium / premium / super branching.
 * One active paid experience.
 */

export default function AppLayout() {
  const location = useLocation();

  const utilityRoutes = [
    "/tickets",
    "/flights",
    "/hotels",
    "/transport",
    "/merch",
    "/matchday-planner",
    "/matchday-journeys",
  ];

  const isUtilityPage = utilityRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className={styles.app}>
      <PrimaryNav />

      <div className={styles.adTop}>
        <SponsorBar sponsors={primarySponsors} />
      </div>

      <main className={styles.content}>
        <Outlet />
      </main>

      <div className={styles.adBottom}>
        {isUtilityPage ? (
          <SponsorBar sponsors={utilitySponsors} />
        ) : (
          <SponsorBar sponsors={secondarySponsors} />
        )}
      </div>
    </div>
  );
}