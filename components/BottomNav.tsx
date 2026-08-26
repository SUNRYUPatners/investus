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
        transform: "translate3d(0,0,0)",
        WebkitTransform: "translate3d(0,0,0)",
      }}
    >
      <div className="max-w-[480px] mx-auto flex items-center h-[52px]">
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
              className="flex-1 flex flex-col items-center justify-center gap-0.5 h-full touch-manipulation select-none"
              style={{ color: isActive ? "var(--mint)" : "var(--muted)" }}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="text-[17px] leading-none">{emoji}</span>
              <span className="text-[9px] font-semibold leading-none">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
