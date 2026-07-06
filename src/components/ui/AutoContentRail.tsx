import React, { useEffect, useMemo, useRef, useState } from "react";

type AutoContentRailProps = {
  children: React.ReactNode;
  autoAdvance?: boolean;
  className?: string;
};

const CARD_WIDTH = 280;
const GAP = 16;

/* Slightly faster than before */
const GLIDE_SPEED = 0.6;

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

  const baseChildren = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // Duplicate once for looping
  const loopChildren = useMemo(
    () => [...baseChildren, ...baseChildren],
    [baseChildren]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !autoAdvance || baseChildren.length === 0) return;

    let rafId: number;
    const loopWidth = baseChildren.length * (CARD_WIDTH + GAP);

    const step = () => {
      if (!isPaused && !isDraggingRef.current) {
        el.scrollLeft += GLIDE_SPEED;

        // Smooth loop reset halfway through duplicated content
        if (el.scrollLeft >= loopWidth) {
          el.scrollLeft -= loopWidth;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [autoAdvance, isPaused, baseChildren.length]);

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