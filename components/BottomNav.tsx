"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { marketHref, parseMarketPath, type MarketTab } from "@/lib/markets/marketPath";

export function BottomNav() {
  const pathname = usePathname() ?? "";
  const t = useLocale();
  const { market, tab } = parseMarketPath(pathname);

  const tabs: MarketTab[] = ["home", "search", "portfolio", "wall", "insight", "more"];
  const navItems = tabs.map((tabKey) => ({
    href: marketHref(market, tabKey),
    emoji:
      tabKey === "home"
        ? "📊"
        : tabKey === "search"
          ? "🔍"
          : tabKey === "portfolio"
            ? "💼"
            : tabKey === "wall"
              ? "💬"
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
            : tabKey === "wall"
              ? t.nav.wall
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
          const isActive = tabKey === tab;

          return (
            <Link
              key={href}
              href={href}
              prefetch
              onClick={(e) => {
                // 같은 탭 재탭 → 맨 위로 (라우팅 막지 않음: 다른 탭은 Link 기본 동작)
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
