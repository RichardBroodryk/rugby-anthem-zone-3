import React, { useEffect, useMemo, useRef, useState } from "react";

type AutoContentRailProps = {
  children: React.ReactNode;
  autoAdvance?: boolean;
  className?: string;
};

const CARD_WIDTH = 280;
const GAP = 16;
const GLIDE_SPEED = 0.35;

export default function AutoContentRail({
  children,
  autoAdvance = true,
  className = "",
}: AutoContentRailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  // 🔥 Duplicate children to guarantee overflow
  const loopChildren = useMemo(() => {
    const array = React.Children.toArray(children);
    return [...array, ...array];
  }, [children]);

  // ✅ Continuous glide (robust loop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !autoAdvance) return;

    let rafId: number;

    const step = () => {
      if (!isPaused && !isDraggingRef.current) {
        el.scrollLeft += GLIDE_SPEED;

        // 🔥 HARD LOOP RESET (more reliable than half-width math)
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [autoAdvance, isPaused]);

  // ✅ Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    isDraggingRef.current = true;
    setIsPaused(true);

    startXRef.current = e.pageX;
    startScrollRef.current = el.scrollLeft;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const el = containerRef.current;
    if (!el || !isDraggingRef.current) return;

    const dx = e.pageX - startXRef.current;
    el.scrollLeft = startScrollRef.current - dx;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsPaused(false);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          gap: `${GAP}px`,
          overflowX: "auto",
          overflowY: "hidden",
          padding: "8px 0 16px",
          scrollSnapType: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onTouchCancel={() => setIsPaused(false)}
      >
        {loopChildren.map((child, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto",
              width: `${CARD_WIDTH}px`,
              scrollSnapAlign: "start",
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}