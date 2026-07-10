import React, { useEffect, useMemo, useRef } from "react";
import styles from "./SplashFeatureRail.module.css";

type SplashFeatureRailProps = {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "medium";
  ariaLabel?: string;
};

const SPEED_MAP = {
  fast: 0.55,
  medium: 0.36,
} as const;

export default function SplashFeatureRail({
  items,
  direction = "left",
  speed = "medium",
  ariaLabel = "Feature rail",
}: SplashFeatureRailProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const firstSetRef = useRef<HTMLDivElement | null>(null);

  const baseItems = useMemo(() => items, [items]);

  useEffect(() => {
    const el = viewportRef.current;
    const firstSet = firstSetRef.current;

    if (!el || !firstSet || baseItems.length === 0) return;

    let rafId = 0;
    const stepSize = SPEED_MAP[speed];
    const singleSetWidth = firstSet.offsetWidth;

    const step = () => {
      if (direction === "left") {
        el.scrollLeft += stepSize;

        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      } else {
        el.scrollLeft -= stepSize;

        if (el.scrollLeft <= 0) {
          el.scrollLeft += singleSetWidth;
        }
      }

      rafId = window.requestAnimationFrame(step);
    };

    if (direction === "right") {
      el.scrollLeft = singleSetWidth;
    }

    rafId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [baseItems, direction, speed]);

  return (
    <div
      className={`${styles.railShell} ${styles.featureRailShell}`}
      aria-label={ariaLabel}
      role="presentation"
    >
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track}>
          <div ref={firstSetRef} className={styles.group}>
            {baseItems.map((item, index) => (
              <div
                key={`feature-a-${item}-${index}`}
                className={styles.featurePill}
                aria-hidden="true"
              >
                {item}
              </div>
            ))}
          </div>

          <div className={styles.group}>
            {baseItems.map((item, index) => (
              <div
                key={`feature-b-${item}-${index}`}
                className={styles.featurePill}
                aria-hidden="true"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}