"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";

export function BottomNav() {
  const pathname = usePathname();
  const router   = useRouter();
  const t        = useLocale();

  const navItems = [
    { href: "/",        emoji: "📊", label: t.nav.home    },
    { href: "/search",  emoji: "🔍", label: t.nav.search  },
    { href: "/wall",    emoji: "💬", label: t.nav.wall    },
    { href: "/insight", emoji: "💡", label: t.nav.insight },
    { href: "/more",    emoji: "···", label: t.nav.more   },
  ];

  // Prefetch all routes so JS chunks are ready before tap
  useEffect(() => {
    navItems.forEach(({ href }) => router.prefetch(href));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 14px)",
      }}
    >
      <div className="max-w-[480px] mx-auto flex items-center h-[52px]">
        {navItems.map(({ href, emoji, label }) => {
          const isActive = href === "/"
            ? pathname === "/"
            : pathname.startsWith(href);

          return (
            <button
              key={href}
              onPointerDown={(e) => {
                e.preventDefault();
                if (isActive) {
                  // Already on this tab — scroll to top
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  router.push(href);
                }
              }}
              className="flex-1 flex flex-col items-center justify-center gap-1 pt-1"
              style={{
                color: isActive ? "var(--mint)" : "var(--muted)",
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
    </nav>
  );
}
