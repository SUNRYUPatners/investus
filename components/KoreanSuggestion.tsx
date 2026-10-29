"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mapToLocale } from "@/components/LocaleSwitcher";

const DISMISS_KEY = "koSuggestDismissed";

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/**
 * Dismissible "View in Korean" suggestion. Shown to visitors who look Korean
 * (Korean browser language or Korean IP) while they are on an English page.
 * It never redirects automatically; it only offers a link and remembers a
 * dismissal in localStorage.
 */
export function KoreanSuggestion() {
  const pathname = usePathname() ?? "/";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isKoUrl = pathname === "/ko" || pathname.startsWith("/ko/");
    if (isKoUrl) return;
    if (readCookie("locale") === "ko") return; // already chose Korean
    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    const browserKo = /^ko\b/i.test(navigator.language || "");
    const ipKo = readCookie("ip_country") === "KR";
    // Client-only gate (navigator/cookies/localStorage) — must run in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (browserKo || ipKo) setShow(true);
  }, [pathname]);

  if (!show) return null;

  const koHref = mapToLocale(pathname, "ko");

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[60] max-w-[460px] w-[calc(100%-24px)]"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)" }}
      role="region"
      aria-label="Language suggestion"
    >
      <div
        className="flex items-center gap-3 rounded-xl border px-4 py-2.5 shadow-lg"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <span className="text-[13px] flex-1" style={{ color: "var(--text)" }}>
          한국어로 보시겠어요?
        </span>
        <a
          href={koHref}
          onClick={() => {
            document.cookie = `locale=ko; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
          }}
          className="text-[12px] font-bold px-3 py-1.5 rounded-lg no-underline flex-shrink-0"
          style={{ background: "var(--mint)", color: "var(--on-accent)" }}
        >
          한국어로
        </a>
        <button
          onClick={dismiss}
          className="text-[12px] px-1.5 flex-shrink-0"
          style={{ color: "var(--muted)" }}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
