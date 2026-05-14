"use client";

import { useEffect, useRef, useState } from "react";

const THRESHOLD = 72; // px to pull before triggering

export function PullToRefresh() {
  const [pullY, setPullY]       = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY  = useRef(0);
  const pulling = useRef(false);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      // Only activate when scrolled to very top
      if (window.scrollY > 4) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pulling.current || refreshing) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy <= 0) { pulling.current = false; setPullY(0); return; }
      // Rubber-band resistance
      const clamped = Math.min(dy * 0.45, THRESHOLD + 20);
      setPullY(clamped);
      if (clamped > 10) e.preventDefault();
    };

    const onTouchEnd = () => {
      if (!pulling.current) return;
      pulling.current = false;
      if (pullY >= THRESHOLD && !refreshing) {
        setRefreshing(true);
        setPullY(THRESHOLD);
        // Reload after short spinner display
        setTimeout(() => window.location.reload(), 600);
      } else {
        setPullY(0);
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove",  onTouchMove,  { passive: false });
    document.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove",  onTouchMove);
      document.removeEventListener("touchend",   onTouchEnd);
    };
  }, [pullY, refreshing]);

  const visible = pullY > 4 || refreshing;
  const progress = Math.min(pullY / THRESHOLD, 1);
  const triggered = pullY >= THRESHOLD || refreshing;

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
      style={{
        top: 0,
        height: pullY + 8,
        transition: refreshing ? "none" : "height 0.05s linear",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: 36,
          height: 36,
          background: "var(--card)",
          border: "1.5px solid var(--border)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
          transform: `translateY(${Math.min(pullY - 18, 18)}px) scale(${0.6 + progress * 0.4})`,
          opacity: Math.min(progress * 2, 1),
          transition: refreshing ? "none" : "transform 0.05s, opacity 0.1s",
        }}
      >
        {triggered ? (
          <div
            className="rounded-full border-2"
            style={{
              width: 16,
              height: 16,
              borderColor: "var(--mint)",
              borderTopColor: "transparent",
              animation: "spin 0.7s linear infinite",
            }}
          />
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: `rotate(${progress * 180}deg)`,
              transition: "transform 0.05s",
            }}
          >
            <path
              d="M8 2v10M5 9l3 3 3-3"
              stroke="var(--mint)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
