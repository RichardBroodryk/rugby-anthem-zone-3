import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SplashPage.module.css";

import razSplash from "../assets/images/raz/splashscreen2.png";

const SPLASH_DURATION = 4000;

export default function SplashPage() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadeOut(true);
    }, SPLASH_DURATION - 850);

    const navTimer = window.setTimeout(() => {
      navigate("/splash-intro");
    }, SPLASH_DURATION);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <section className={`${styles.splash} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.stage}>
        <img
          src={razSplash}
          alt="Rugby Anthem Zone"
          className={styles.image}
        />
      </div>
    </section>
  );
}