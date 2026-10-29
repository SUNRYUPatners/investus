"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { localePath } from "@/lib/localePath";
import { marketHref, parseMarketPath } from "@/lib/markets/marketPath";
import { MARKET_IDS } from "@/lib/markets/types";

export type HomeShellView = "home" | "news";

function stripKo(pathname: string) {
  if (pathname === "/ko" || pathname.startsWith("/ko/")) {
    return pathname.replace(/^\/ko/, "") || "/";
  }
  return pathname;
}

/** True only on market home URLs (`/`, `/ko`, `/kr`, `/ko/kr`, …), not `/news` or other pages. */
export function isShellHomePath(pathname: string): boolean {
  const logical = stripKo(pathname);
  if (logical === "/") return true;
  for (const id of MARKET_IDS) {
    if (id === "us") continue;
    if (logical === `/${id}`) return true;
  }
  return false;
}

type HomeShellTabContextValue = {
  view: HomeShellView;
  setView: (v: HomeShellView) => void;
  openNews: () => void;
  openHome: () => void;
};

const HomeShellTabContext = createContext<HomeShellTabContextValue | null>(null);

export function HomeShellTabProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<HomeShellView>("home");
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const locale = useLocaleCode();

  const goHomeHref = useCallback(() => {
    const { market } = parseMarketPath(pathname);
    return localePath(marketHref(market, "home"), locale);
  }, [pathname, locale]);

  const openNews = useCallback(() => {
    setView("news");
    if (!isShellHomePath(pathname)) {
      router.push(goHomeHref());
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, router, goHomeHref]);

  const openHome = useCallback(() => {
    setView("home");
    if (!isShellHomePath(pathname)) {
      router.push(goHomeHref());
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, router, goHomeHref]);

  const value = useMemo(
    () => ({ view, setView, openNews, openHome }),
    [view, openNews, openHome],
  );

  return (
    <HomeShellTabContext.Provider value={value}>
      {children}
    </HomeShellTabContext.Provider>
  );
}

export function useHomeShellTab() {
  const ctx = useContext(HomeShellTabContext);
  if (!ctx) {
    return {
      view: "home" as const,
      setView: () => {},
      openNews: () => {},
      openHome: () => {},
    };
  }
  return ctx;
}
