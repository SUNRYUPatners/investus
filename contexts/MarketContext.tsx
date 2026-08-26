"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { parsePreviewPath } from "@/lib/markets/previewPath";
import type { MarketId } from "@/lib/markets/types";

const MarketContext = createContext<MarketId>("us");

/** 본사이트는 항상 us. `/preview/[market]` 에서만 시장이 바뀜. */
export function MarketProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const market = useMemo(() => {
    const { market: m } = parsePreviewPath(pathname);
    return m ?? "us";
  }, [pathname]);

  return <MarketContext.Provider value={market}>{children}</MarketContext.Provider>;
}

export function useMarket(): MarketId {
  return useContext(MarketContext);
}

export function useIsPreviewMarket(): boolean {
  const pathname = usePathname() ?? "";
  return parsePreviewPath(pathname).market != null;
}
