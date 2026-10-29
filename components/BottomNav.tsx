"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";
import { isShellHomePath, useHomeShellTab } from "@/contexts/HomeShellTabContext";
import { marketHref, parseMarketPath } from "@/lib/markets/marketPath";
import { localePath } from "@/lib/localePath";

type ShellTab = "home" | "search" | "portfolio" | "news" | "insight" | "more";

export function BottomNav() {
  const pathname = usePathname() ?? "";
  const t = useLocale();
  const locale = useLocaleCode();
  const { market, tab } = parseMarketPath(pathname);
  const { view, setView, openNews, openHome } = useHomeShellTab();
  const onHome = isShellHomePath(pathname);
  const newsActive = view === "news" && onHome;

  const tabs: ShellTab[] = ["home", "search", "portfolio", "news", "insight", "more"];
  const navItems = tabs.map((tabKey) => ({
    href: localePath(marketHref(market, tabKey === "news" ? "home" : tabKey), locale),
    emoji:
      tabKey === "home"
        ? "📊"
        : tabKey === "search"
          ? "🔍"
          : tabKey === "portfolio"
            ? "💼"
            : tabKey === "news"
              ? "📰"
              : tabKey === "insight"
                ? "💡"
                : "···",
    label:
      tabKey === "home"
        ? t.nav.home
        : tabKey === "search"
          ? t.nav.search
          : tabKey === "portfolio"
            ? t.nav.portfolio
            : tabKey === "news"
              ? t.nav.news
              : tabKey === "insight"
                ? t.nav.insight
                : t.nav.more,
    tab: tabKey,
  }));

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)",
        transform: "translate3d(0,0,0)",
        WebkitTransform: "translate3d(0,0,0)",
      }}
    >
      <div className="max-w-[480px] mx-auto flex items-stretch h-[60px]">
        {navItems.map(({ href, emoji, label, tab: tabKey }) => {
          const isActive =
            tabKey === "news"
              ? newsActive
              : tabKey === tab && !newsActive;

          return (
            <Link
              key={tabKey}
              href={href}
              prefetch
              onClick={(e) => {
                if (tabKey === "news") {
                  e.preventDefault();
                  openNews();
                  return;
                }
                if (tabKey === "home") {
                  e.preventDefault();
                  openHome();
                  return;
                }
                setView("home");
                if (isActive) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 px-0.5 pt-1.5 pb-1 h-full touch-manipulation select-none no-underline"
              style={{ color: isActive ? "var(--mint)" : "var(--muted)" }}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className="flex h-5 w-full items-center justify-center text-[16px] leading-none overflow-hidden"
                aria-hidden
              >
                {emoji}
              </span>
              <span className="text-[9px] font-semibold leading-tight tracking-tight whitespace-nowrap">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
