"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

function useClock() {
  const [time, setTime]   = useState("");
  const [open, setOpen]   = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      const t = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      });
      const estH = parseInt(now.toLocaleString("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false }));
      const estM = parseInt(now.toLocaleString("en-US", { timeZone: "America/New_York", minute: "numeric" }));
      const total = estH * 60 + estM;
      const isWeekday = [1, 2, 3, 4, 5].includes(now.getDay());
      setTime(t);
      setOpen(isWeekday && total >= 570 && total < 960);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, open, mounted };
}

export function DesktopSidebar() {
  const t = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { time, open, mounted } = useClock();

  const NAV = [
    { href: "/",        emoji: "📊", label: t.nav.home    },
    { href: "/search",  emoji: "🔍", label: t.nav.search  },
    { href: "/wall",    emoji: "💬", label: t.nav.wall    },
    { href: "/insight", emoji: "💡", label: t.nav.insight },
    { href: "/more",    emoji: "···", label: t.nav.more   },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col fixed top-0 left-0 h-full w-64 border-r z-40"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--mint)" }}>
            <TrendingUp className="w-4.5 h-4.5 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-base font-bold tracking-tight font-syne leading-tight"
              style={{ color: "var(--text)" }}>
              Investus
            </div>
            <div className="text-[10px] leading-none" style={{ color: "var(--muted)" }}>
              {t.more.tagline.split(" · ")[0]}
            </div>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV.map(({ href, emoji, label }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
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
                  ? { background: "rgba(0,229,160,0.1)", color: "var(--mint)" }
                  : { color: "var(--muted)" }
              }
            >
              <span className="text-lg w-6 text-center flex-shrink-0">{emoji}</span>
              <span
                className="text-sm font-medium flex-1"
                style={{ color: isActive ? "var(--mint)" : "var(--text)" }}
              >
                {label}
              </span>
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--mint)" }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom: clock + market status */}
      <div className="px-5 py-4 border-t space-y-3" style={{ borderColor: "var(--border)" }}>
        {mounted && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-num tabular-nums" style={{ color: "var(--muted)" }}>
                {time}
              </span>
              <span className="text-[10px] font-semibold" style={{ color: "var(--muted)" }}>EST</span>
            </div>
            <div
              className="w-full py-2 rounded-xl text-center text-[11px] font-bold"
              style={
                open
                  ? { background: "rgba(0,229,160,0.1)", color: "var(--mint)" }
                  : { background: "rgba(107,114,128,0.08)", color: "var(--muted)" }
              }
            >
              {open ? t.header.marketOpen : t.header.marketClosed}
            </div>
          </>
        )}

        {/* Investus version */}
        <p className="text-[10px] text-center" style={{ color: "var(--border)" }}>
          investus.kr · v0.1
        </p>
      </div>
    </aside>
  );
}
