"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { isMarketSessionOpen } from "@/lib/markets/hours";

export function PreviewHeader({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: cfg.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
      setDate(
        now.toLocaleDateString("en-US", {
          timeZone: cfg.timezone,
          month: "numeric",
          day: "numeric",
        }),
      );
      setOpen(isMarketSessionOpen(market, now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [market, cfg.timezone]);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}
    >
      <div className="max-w-[480px] lg:max-w-none mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoMark size="sm" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight font-syne leading-tight" style={{ color: "var(--navy)" }}>
              Investus
            </span>
            <span className="text-[10px] font-medium leading-tight" style={{ color: "var(--muted)" }}>
              {cfg.emoji} {cfg.tagline} · 미리보기
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <span className="text-xs font-mono-num tabular-nums font-medium" style={{ color: "var(--text)" }}>
                {date} {time} {cfg.clockLabel}
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={
                  open
                    ? { background: "rgba(var(--up-rgb),0.12)", color: "var(--up)" }
                    : { background: "rgba(107,114,128,0.12)", color: "var(--muted)" }
                }
              >
                {open ? "● OPEN" : "● CLOSED"}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
