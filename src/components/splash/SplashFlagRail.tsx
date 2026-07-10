import React, { useEffect, useMemo, useRef } from "react";
import styles from "./SplashFlagRail.module.css";

type FlagRailItem = {
  name: string;
  src: string;
};

type SplashFlagRailProps = {
  items: FlagRailItem[];
  direction?: "left" | "right";
  speed?: "fast" | "medium";
  railTone?: "strong" | "soft";
  ariaLabel?: string;
};

const FLAG_WIDTH = 26;
const ITEM_HORIZONTAL_PADDING = 6;
const ITEM_TOTAL_WIDTH = FLAG_WIDTH + ITEM_HORIZONTAL_PADDING * 2;

/**
 * We deliberately repeat the flags several times because the splash rails
 * are extremely wide once rotated across the page. Two sets of 12–16 flags
 * is not enough width to create visible scrolling inside those long angled rails.
 */
const LOOP_REPEAT_COUNT = 8;

const SPEED_MAP = {
  fast: 0.55,
  medium: 0.36,
} as const;

export default function SplashFlagRail({
  items,
  direction = "left",
  speed = "medium",
  railTone = "strong",
  ariaLabel = "Flag rail",
}: SplashFlagRailProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const baseItems = useMemo(() => items, [items]);

  const repeatedItems = useMemo(() => {
    const repeated: FlagRailItem[] = [];

    for (let i = 0; i < LOOP_REPEAT_COUNT; i += 1) {
      repeated.push(...baseItems);
    }

    return repeated;
  }, [baseItems]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || baseItems.length === 0) return;

    let rafId = 0;
    const stepSize = SPEED_MAP[speed];

    /**
     * We want to loop after one logical "set" of the rail has passed.
     * Because repeatedItems is built from LOOP_REPEAT_COUNT copies of baseItems,
     * one base set width is enough to create a seamless reset point.
     */
    const singleSetWidth = baseItems.length * ITEM_TOTAL_WIDTH;

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
      className={`${styles.railShell} ${
        railTone === "soft" ? styles.softRail : styles.strongRail
      }`}
      aria-label={ariaLabel}
      role="presentation"
    >
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />

      <div ref={viewportRef} className={styles.viewport}>
        <div className={styles.track}>
          {repeatedItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className={styles.flagCard}
              aria-hidden="true"
            >
              <img
                src={item.src}
                alt=""
                className={styles.flag}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}