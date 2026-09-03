"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";
import { MarketSwitcher } from "@/components/MarketSwitcher";
import { MarketSwitcherDesktop } from "@/components/MarketSwitcherDesktop";
import { MarketOpenBanner } from "@/components/market/MarketOpenBanner";
import { getMarketConfig } from "@/lib/markets/config";
import { isMarketSessionOpen, isStockMarketOpen } from "@/lib/markets/hours";
import { isMarketHomePath, parseMarketPath } from "@/lib/markets/marketPath";

export function Header() {
  const pathname = usePathname() ?? "";
  const { market } = parseMarketPath(pathname);
  const cfg = getMarketConfig(market);
  const showSwitcher = isMarketHomePath(pathname);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: cfg.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const dateStr = now.toLocaleDateString("en-US", {
        timeZone: cfg.timezone,
        month: "numeric",
        day: "numeric",
      });
      setTime(timeStr);
      setDate(dateStr);
      setOpen(market === "us" || market === "kr" ? isStockMarketOpen(market) : isMarketSessionOpen(market));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [market, cfg.timezone]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-[480px] lg:max-w-none mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 lg:hidden">
            <LogoMark size="sm" />
            <span
              className="text-lg font-bold tracking-tight font-syne"
              style={{ color: "var(--navy)" }}
            >
              Investus
            </span>
          </div>

          <MarketSwitcherDesktop current={market} />

          <div className="flex items-center gap-2 flex-shrink-0">
            {mounted && (
              <>
                <span
                  className="text-xs font-mono-num tabular-nums font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {date} {time} {cfg.clockLabel}
                </span>
                {market !== "safe" && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={
                      open
                        ? { background: "rgba(var(--up-rgb),0.12)", color: "var(--up)" }
                        : { background: "rgba(107,114,128,0.12)", color: "var(--muted)" }
                    }
                  >
                    {open ? "● 장중" : "● CLOSED"}
                  </span>
                )}
                {open && market === "us" && (
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
      {showSwitcher && <MarketSwitcher current={market} />}
      {showSwitcher && (market === "us" || market === "kr") && (
        <div
          className="px-4 lg:px-8 pt-2 pb-2 border-b"
          style={{ background: "var(--header-bg)", borderColor: "var(--border)" }}
        >
          <div className="max-w-[480px] lg:max-w-none mx-auto">
            <MarketOpenBanner market={market} />
          </div>
        </div>
      )}
    </>
  );
}
