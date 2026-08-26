"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { parseMarketPath } from "@/lib/markets/marketPath";
import type { MarketId } from "@/lib/markets/types";

const MarketContext = createContext<MarketId>("us");

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const market = useMemo(() => parseMarketPath(pathname).market, [pathname]);

  return <MarketContext.Provider value={market}>{children}</MarketContext.Provider>;
}

export function useMarket(): MarketId {
  return useContext(MarketContext);
}

export function useIsPreviewMarket(): boolean {
  const pathname = usePathname() ?? "";
  return parseMarketPath(pathname).isPreview;
}
