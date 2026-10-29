"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";
import { getMarketConfig } from "@/lib/markets/config";
import { isMarketSessionOpen } from "@/lib/markets/hours";
import { marketHref, parseMarketPath, type MarketTab } from "@/lib/markets/marketPath";
import { localePath } from "@/lib/localePath";
import { isShellHomePath, useHomeShellTab } from "@/contexts/HomeShellTabContext";
import { GuestStartButton } from "@/components/GuestStartButton";

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
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { market, tab } = parseMarketPath(pathname);
  const { view, setView, openNews, openHome } = useHomeShellTab();
  const newsActive = view === "news" && isShellHomePath(pathname);
  const cfg = getMarketConfig(market);
  const { time, open, mounted } = useClock(cfg.timezone, market);

  type ShellTab = MarketTab | "news";
  const tabs: ShellTab[] = ["home", "search", "portfolio", "news", "insight", "more"];
  const NAV = tabs.map((tabKey) => ({
    href: localePath(marketHref(market, tabKey === "news" ? "home" : tabKey), locale),
    emoji: tabKey === "home" ? "📊" : tabKey === "search" ? "🔍" : tabKey === "portfolio" ? "💼" : tabKey === "news" ? "📰" : tabKey === "insight" ? "💡" : "···",
    label: tabKey === "home" ? t.nav.home : tabKey === "search" ? t.nav.search : tabKey === "portfolio" ? t.nav.portfolio : tabKey === "news" ? t.nav.news : tabKey === "insight" ? t.nav.insight : t.nav.more,
    tab: tabKey,
  }));

  const homeHref = localePath(marketHref(market, "home"), locale);
  const isUsBrand = market === "us";

  return (
    <aside
      className="hidden flex-col fixed top-0 left-0 h-full w-64 border-r z-40"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <Link
          href={homeHref}
          onClick={(e) => {
            if (isShellHomePath(pathname)) e.preventDefault();
            openHome();
          }}
          className="flex items-center gap-2.5"
        >
          <LogoMark size="md" />
          <div className="min-w-0">
            <div
              className="text-base font-bold tracking-tight font-syne leading-tight"
              style={{ color: "var(--navy)" }}
            >
              Investus
            </div>
            <div className="text-[11px] font-medium leading-snug mt-0.5" style={{ color: "var(--muted)" }}>
              {isUsBrand ? (
                isKo ? (
                  <>
                    AI기반 차세대 자산관리(WM)
                    <br />
                    핀테크 플랫폼
                  </>
                ) : (
                  "AI-Powered Global Asset Intelligence"
                )
              ) : (
                `${cfg.emoji} ${isKo ? cfg.labelKo : cfg.labelEn}`
              )}
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <button
          type="button"
          onClick={() => openNews()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 transition-all text-left"
          style={
            newsActive
              ? { background: "rgba(var(--mint-rgb),0.14)", color: "var(--navy)" }
              : { color: "var(--sidebar-label)" }
          }
        >
          <span className="text-lg w-6 text-center flex-shrink-0">🚀</span>
          <span className="text-sm font-bold flex-1" style={{ color: newsActive ? "var(--navy)" : "var(--sidebar-label)" }}>
            {isKo ? "뉴스 · 테슬라/스페이스X/xAI" : "News · Tesla/SpaceX/xAI"}
          </span>
        </button>
        {NAV.map(({ href, emoji, label, tab: tabKey }) => {
          const isActive =
            tabKey === "news" ? newsActive : tabKey === tab && !newsActive;
          return (
            <button
              key={tabKey}
              onClick={() => {
                if (tabKey === "news") {
                  openNews();
                  return;
                }
                if (tabKey === "home") {
                  openHome();
                  return;
                }
                setView("home");
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
        <GuestStartButton />
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
        <p className="text-[10px] text-center font-semibold tracking-wide leading-relaxed" style={{ color: "var(--muted)" }}>
          investus x SRP
        </p>
      </div>
    </aside>
  );
}
