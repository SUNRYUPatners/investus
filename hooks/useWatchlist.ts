"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "./useAuth";
import { useMarket } from "@/contexts/MarketContext";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";

function watchlistStorageKey(market: MarketId, userId?: string): string {
  const cfg = getMarketConfig(market);
  if (market === "us") {
    return userId ? `uss_watchlist_${userId}` : "uss_watchlist";
  }
  return userId ? `${cfg.watchlistKey}_${userId}` : cfg.watchlistKey;
}

export function useWatchlist() {
  const market = useMarket();
  const { user } = useAuth();
  const key = watchlistStorageKey(market, user?.id);
  const [list, setList] = useLocalStorage<string[]>(key, []);

  // US: generic → user-specific 마이그레이션
  useEffect(() => {
    if (!user || market !== "us") return;
    const userKey = watchlistStorageKey("us", user.id);
    const stored = localStorage.getItem(userKey);
    if (!stored || JSON.parse(stored).length === 0) {
      const generic = localStorage.getItem("uss_watchlist");
      if (generic) {
        const parsed = JSON.parse(generic);
        if (parsed.length > 0) setList(parsed);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, market]);

  const add    = (sym: string) => setList((p) => p.includes(sym) ? p : [...p, sym]);
  const remove = (sym: string) => setList((p) => p.filter((s) => s !== sym));
  const toggle = (sym: string) => setList((p) => p.includes(sym) ? p.filter((s) => s !== sym) : [...p, sym]);
  const has    = (sym: string, cur: string[]) => cur.includes(sym);

  return { list, add, remove, toggle, has };
}
