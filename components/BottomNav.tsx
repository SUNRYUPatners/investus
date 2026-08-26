"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import { parsePreviewPath, previewHref } from "@/lib/markets/previewPath";
import type { MarketId } from "@/lib/markets/types";

export function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const t        = useLocale();
  const [, startTransition] = useTransition();
  const [pending, setPending] = useState<string | null>(null);
  const lastTap = useRef<{ href: string; time: number } | null>(null);

  const { market } = parsePreviewPath(pathname);
  const inPreview = market != null;

  useEffect(() => { setPending(null); }, [pathname]);

  const navItems = inPreview
    ? ([
        { href: previewHref(market as MarketId, "home"),      emoji: "📊", label: t.nav.home,      tab: "home" as const },
        { href: previewHref(market as MarketId, "search"),    emoji: "🔍", label: t.nav.search,    tab: "search" as const },
        { href: previewHref(market as MarketId, "portfolio"), emoji: "💼", label: t.nav.portfolio, tab: "portfolio" as const },
        { href: previewHref(market as MarketId, "wall"),      emoji: "💬", label: t.nav.wall,      tab: "wall" as const },
        { href: previewHref(market as MarketId, "insight"),   emoji: "💡", label: t.nav.insight,   tab: "insight" as const },
        { href: previewHref(market as MarketId, "more"),      emoji: "···", label: t.nav.more,     tab: "more" as const },
      ])
    : ([
        { href: "/",          emoji: "📊", label: t.nav.home,      tab: "home" as const },
        { href: "/search",    emoji: "🔍", label: t.nav.search,    tab: "search" as const },
        { href: "/portfolio", emoji: "💼", label: t.nav.portfolio, tab: "portfolio" as const },
        { href: "/wall",      emoji: "💬", label: t.nav.wall,      tab: "wall" as const },
        { href: "/insight",   emoji: "💡", label: t.nav.insight,   tab: "insight" as const },
        { href: "/more",      emoji: "···", label: t.nav.more,     tab: "more" as const },
      ]);

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
        {navItems.map(({ href, emoji, label, tab }) => {
          const isActive = pending
            ? href === pending
            : inPreview
              ? (tab === "home"
                  ? pathname === href || pathname === `/preview/${market}`
                  : pathname.startsWith(href))
              : (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
                } else {
                  setPending(href);
                  startTransition(() => { router.push(href); });
                }
              }}
              className="flex-1 flex flex-col items-center justify-center gap-1 pt-1"
              style={{
                color: isActive ? "var(--mint)" : "var(--sidebar-label)",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                background: "none",
                border: "none",
                cursor: "pointer",
                WebkitAppearance: "none",
              }}
            >
              <span
                className="text-[22px] leading-none"
                style={{ filter: isActive ? "drop-shadow(0 0 6px var(--mint))" : "none" }}
              >
                {emoji}
              </span>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)", background: "var(--card)" }} />
    </nav>
  );
}
