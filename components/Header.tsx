"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

function getEstStatus() {
  const now = new Date();
  const estHour = parseInt(
    now.toLocaleString("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false })
  );
  const estMin = parseInt(
    now.toLocaleString("en-US", { timeZone: "America/New_York", minute: "numeric" })
  );
  const totalMin = estHour * 60 + estMin;
  const isWeekday = [1, 2, 3, 4, 5].includes(now.getDay());
  return isWeekday && totalMin >= 570 && totalMin < 960; // 9:30~16:00
}

export function Header() {
  const t = useLocale();
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(t);
      setOpen(getEstStatus());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="max-w-[480px] lg:max-w-none mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
        {/* 로고 — 모바일만 표시 */}
        <div className="flex items-center gap-2 lg:hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--mint)" }}
          >
            <TrendingUp className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          <span
            className="text-lg font-bold tracking-tight font-syne"
            style={{ color: "var(--text)" }}
          >
            Investus
          </span>
        </div>

        {/* 데스크톱: 사이트 타이틀 */}
        <span className="hidden lg:block text-sm font-semibold font-syne" style={{ color: "var(--muted)" }}>
          {t.header.tagline}
        </span>

        {/* EST 시계 + 마켓 상태 */}
        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <span
                className="text-xs font-mono-num tabular-nums"
                style={{ color: "var(--muted)" }}
              >
                {time} EST
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={
                  open
                    ? { background: "rgba(0,229,160,0.12)", color: "var(--mint)" }
                    : { background: "rgba(107,114,128,0.12)", color: "var(--muted)" }
                }
              >
                {open ? "● OPEN" : "● CLOSED"}
              </span>
              {open && (
                <span
                  className="text-[9px] font-mono-num"
                  style={{ color: "var(--muted)", opacity: 0.6 }}
                >
                  ↻ 60s
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
