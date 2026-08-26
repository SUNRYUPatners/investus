"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { useLocale } from "@/contexts/LocaleContext";
import { getMarketConfig } from "@/lib/markets/config";
import { isMarketSessionOpen } from "@/lib/markets/hours";
import { marketHref, parseMarketPath, type MarketTab } from "@/lib/markets/marketPath";

function useClock(timezone: string, market: ReturnType<typeof parseMarketPath>["market"]) {
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(t);
      setOpen(isMarketSessionOpen(market));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone, market]);

  return { time, open, mounted };
}

export function DesktopSidebar() {
  const t = useLocale();
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { market, tab } = parseMarketPath(pathname);
  const cfg = getMarketConfig(market);
  const { time, open, mounted } = useClock(cfg.timezone, market);

  const tabs: MarketTab[] = ["home", "search", "portfolio", "wall", "insight", "more"];
  const NAV = tabs.map((tabKey) => ({
    href: marketHref(market, tabKey),
    emoji: tabKey === "home" ? "📊" : tabKey === "search" ? "🔍" : tabKey === "portfolio" ? "💼" : tabKey === "wall" ? "💬" : tabKey === "insight" ? "💡" : "···",
    label: tabKey === "home" ? t.nav.home : tabKey === "search" ? t.nav.search : tabKey === "portfolio" ? t.nav.portfolio : tabKey === "wall" ? t.nav.wall : tabKey === "insight" ? t.nav.insight : t.nav.more,
    tab: tabKey,
  }));

  const homeHref = marketHref(market, "home");
  const tagline =
    market === "us"
      ? t.more.tagline
      : `${cfg.emoji} ${cfg.labelKo}`;

  return (
    <aside
      className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 border-r z-40"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <Link href={homeHref} className="flex items-center gap-2.5">
          <LogoMark size="md" />
          <div>
            <div
              className="text-base font-bold tracking-tight font-syne leading-tight"
              style={{ color: "var(--navy)" }}
            >
              Investus
            </div>
            <div className="text-[11px] font-medium leading-snug mt-0.5" style={{ color: "var(--muted)" }}>
              {tagline}
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV.map(({ href, emoji, label, tab: tabKey }) => {
          const isActive = tabKey === tab;
          return (
            <button
              key={href}
              onClick={() => {
                if (isActive) window.scrollTo({ top: 0, behavior: "smooth" });
                else router.push(href);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all text-left"
              style={
                isActive
                  ? { background: "rgba(var(--mint-rgb),0.14)", color: "var(--navy)" }
                  : { color: "var(--sidebar-label)" }
              }
            >
              <span className="text-lg w-6 text-center flex-shrink-0">{emoji}</span>
              <span
                className="text-sm font-semibold flex-1"
                style={{ color: isActive ? "var(--navy)" : "var(--sidebar-label)" }}
              >
                {label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--mint)" }} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t space-y-3 flex-shrink-0" style={{ borderColor: "var(--border)" }}>
        {mounted && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-num tabular-nums font-medium" style={{ color: "var(--text)" }}>
                {time}
              </span>
              <span className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>
                {cfg.clockLabel}
              </span>
            </div>
            {market !== "safe" && (
              <div
                className="w-full py-2 rounded-xl text-center text-[11px] font-bold"
                style={
                  open
                    ? { background: "rgba(var(--up-rgb),0.12)", color: "var(--up)" }
                    : { background: "var(--muted-2)", color: "var(--muted)" }
                }
              >
                {open ? t.header.marketOpen : t.header.marketClosed}
              </div>
            )}
          </>
        )}
        <p className="text-[10px] text-center font-medium leading-relaxed" style={{ color: "var(--muted)" }}>
          AI 기반 WM 핀테크
        </p>
      </div>
    </aside>
  );
}
