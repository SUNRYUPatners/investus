"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "@/components/LogoMark";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMarketConfig } from "@/lib/markets/config";
import { isMarketSessionOpen, isStockMarketOpen } from "@/lib/markets/hours";
import { parseMarketPath, marketHref, type MarketTab } from "@/lib/markets/marketPath";
import { GuestStartButton } from "@/components/GuestStartButton";
import { useAuth } from "@/hooks/useAuth";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";
import { isShellHomePath, useHomeShellTab } from "@/contexts/HomeShellTabContext";
import { localePath } from "@/lib/localePath";

type ShellTab = MarketTab | "news";
const NAV_TABS: ShellTab[] = ["home", "search", "portfolio", "news", "insight", "more"];

export function Header() {
  const t = useLocale();
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const { market, tab } = parseMarketPath(pathname);
  const { view, setView, openNews, openHome } = useHomeShellTab();
  const newsActive = view === "news" && isShellHomePath(pathname);
  const cfg = getMarketConfig(market);
  const { user, loaded } = useAuth();
  const isGuest = loaded && !user;
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

  const navItems = NAV_TABS.map((tabKey) => ({
    href: localePath(marketHref(market, tabKey === "news" ? "home" : tabKey), locale),
    label:
      tabKey === "home"      ? t.nav.home
      : tabKey === "search"  ? t.nav.search
      : tabKey === "portfolio" ? t.nav.portfolio
      : tabKey === "news"    ? t.nav.news
      : tabKey === "insight" ? t.nav.insight
      : t.nav.more,
    tabKey,
  }));

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "var(--header-bg)",
          borderColor: "var(--border)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="max-w-[480px] lg:max-w-screen-2xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-4">

          {/* 로고 + 브랜드 */}
          <Link
            href={localePath(marketHref(market, "home"), locale)}
            onClick={(e) => {
              if (isShellHomePath(pathname)) e.preventDefault();
              openHome();
            }}
            className="flex items-center gap-2 no-underline flex-shrink-0"
          >
            <LogoMark size="sm" />
            <div className="leading-none">
              <div
                className="text-lg font-bold tracking-tight font-syne leading-tight"
                style={{ color: "var(--navy)" }}
              >
                Investus
              </div>
              <div
                className="hidden lg:block text-[10px] font-medium leading-tight mt-0.5"
                style={{ color: "var(--muted)" }}
              >
                {isKo ? "AI 기반 차세대 자산관리 핀테크" : "AI-Powered Global Asset Intelligence"}
              </div>
            </div>
          </Link>

          {/* 데스크탑 수평 nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map(({ href, label, tabKey }) => {
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
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all"
                  style={
                    isActive
                      ? { background: "rgba(var(--mint-rgb),0.14)", color: "var(--navy)" }
                      : { color: "var(--muted)" }
                  }
                >
                  {label}
                  {isActive && (
                    <span
                      className="ml-1.5 inline-block w-1 h-1 rounded-full align-middle"
                      style={{ background: "var(--mint)" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 우측: 로그인 + 시간 + 마켓 상태 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <LocaleSwitcher className="hidden sm:inline-block" />
            <GuestStartButton compact />
            {mounted && (
              <div className={isGuest ? "hidden sm:flex items-center gap-2" : "flex items-center gap-2"}>
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
                    {open ? (isKo ? "● 장중" : t.header.marketOpen) : (isKo ? "● CLOSED" : t.header.marketClosed)}
                  </span>
                )}
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
