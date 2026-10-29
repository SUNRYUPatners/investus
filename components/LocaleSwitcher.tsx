"use client";

import { usePathname } from "next/navigation";

function setLocaleCookie(locale: "en" | "ko") {
  document.cookie = `locale=${locale}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

/** Maps the current path to its counterpart in the other locale. */
export function mapToLocale(pathname: string, target: "en" | "ko"): string {
  const isKo = pathname === "/ko" || pathname.startsWith("/ko/");
  const logical = isKo ? pathname.replace(/^\/ko/, "") || "/" : pathname;
  if (target === "en") return logical;
  return logical === "/" ? "/ko" : `/ko${logical}`;
}

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const isKo = pathname === "/ko" || pathname.startsWith("/ko/");
  const target: "en" | "ko" = isKo ? "en" : "ko";
  const href = mapToLocale(pathname, target);
  const label = isKo ? "EN" : "한국어";

  return (
    <a
      href={href}
      onClick={() => setLocaleCookie(target)}
      className={`text-xs font-semibold px-2 py-1 rounded-lg no-underline ${className}`}
      style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
      aria-label={isKo ? "View in English" : "한국어로 보기"}
      hrefLang={target}
    >
      {label}
    </a>
  );
}
