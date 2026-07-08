import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdBanner from "../components/homepage/AdBanner";
import styles from "./PublicLayout.module.css";

/**
 * PUBLIC LAYOUT — WAVE 3
 * --------------------------------------------------
 * Public access shell for splash, onboarding, signup,
 * login, terms, checkout, and access-pending routes.
 *
 * This replaces the old FreemiumLayout naming now that
 * the app has moved to a single paid RAZ Premium model.
 */

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSplashPage = location.pathname === "/";

  return (
    <div className={styles.app}>
      {!isSplashPage && (
        <div className={styles.adTop}>
          <AdBanner text="🏉 Rugby Anthem Zone" />
        </div>
      )}

      <main className={styles.content}>
        <Outlet />
      </main>

      {!isSplashPage && (
        <div
          className={styles.adBottom}
          onClick={() => navigate("/what-you-get")}
          style={{ cursor: "pointer" }}
        >
          <AdBanner text="⭐ Unlock Rugby Anthem Zone Access" />
        </div>
      )}
    </div>
  );
}