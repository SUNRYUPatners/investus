"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { marketHref, parseMarketPath, type MarketTab } from "@/lib/markets/marketPath";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useLocale();
  const [, startTransition] = useTransition();
  const [pending, setPending] = useState<string | null>(null);
  const lastTap = useRef<{ href: string; time: number } | null>(null);

  const { market, tab } = parseMarketPath(pathname ?? "");

  useEffect(() => { setPending(null); }, [pathname]);

  const tabs: MarketTab[] = ["home", "search", "portfolio", "wall", "insight", "more"];
  const navItems = tabs.map((tabKey) => ({
    href: marketHref(market, tabKey),
    emoji: tabKey === "home" ? "📊" : tabKey === "search" ? "🔍" : tabKey === "portfolio" ? "💼" : tabKey === "wall" ? "💬" : tabKey === "insight" ? "💡" : "···",
    label: tabKey === "home" ? t.nav.home : tabKey === "search" ? t.nav.search : tabKey === "portfolio" ? t.nav.portfolio : tabKey === "wall" ? t.nav.wall : tabKey === "insight" ? t.nav.insight : t.nav.more,
    tab: tabKey,
  }));

  useEffect(() => {
    navItems.forEach(({ href }) => router.prefetch(href));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        /* iOS 홈 인디케이터와 탭이 겹치지 않도록 하단 inset + 여유 */
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 12px)",
        transform: "translate3d(0,0,0)",
        WebkitTransform: "translate3d(0,0,0)",
      }}
    >
      <div className="max-w-[480px] mx-auto flex items-stretch h-[60px]">
        {navItems.map(({ href, emoji, label, tab: tabKey }) => {
          const isActive = pending
            ? href === pending
            : tabKey === tab;

          return (
            <button
              key={href}
              onPointerDown={(e) => {
                e.preventDefault();
                const now = Date.now();
                const isDoubleTap =
                  lastTap.current &&
                  lastTap.current.href === href &&
                  now - lastTap.current.time < 400;
                lastTap.current = { href, time: now };

                if (isDoubleTap || (isActive && !pending)) {
                  if (pathname !== href) {
                    setPending(href);
                    startTransition(() => { router.push(href); });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  return;
                }
                if (!isActive) {
                  setPending(href);
                  startTransition(() => { router.push(href); });
                }
              }}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 px-0.5 pt-1.5 pb-1 h-full touch-manipulation select-none"
              style={{ color: isActive ? "var(--mint)" : "var(--muted)" }}
              aria-current={isActive ? "page" : undefined}
            >
              {/* iOS 이모지 글리프 overflow → 고정 높이 박스로 라벨과 분리 */}
              <span
                className="flex h-5 w-full items-center justify-center text-[16px] leading-none overflow-hidden"
                aria-hidden
              >
                {emoji}
              </span>
              <span className="text-[9px] font-semibold leading-tight tracking-tight whitespace-nowrap">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
