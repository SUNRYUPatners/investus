"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuthCtx as useAuth } from "@/contexts/AuthContext";
import { getSupabase } from "@/lib/supabase";
import type { Holding } from "@/lib/api";

type Cur = "USD" | "KRW";

type PortfolioMeta = {
  sp_portfolio?: Holding[];
  sp_currency?:  Cur;
};

const LS_PORTFOLIO = "sp_portfolio_cache";
const LS_CURRENCY  = "sp_currency_cache";

function readLocalCache(): { holdings: Holding[]; cur: Cur } | null {
  try {
    const raw = localStorage.getItem(LS_PORTFOLIO);
    if (!raw) return null;
    return { holdings: JSON.parse(raw) as Holding[], cur: (localStorage.getItem(LS_CURRENCY) as Cur | null) ?? "USD" };
  } catch { return null; }
}

function writeLocalCache(holdings: Holding[], cur: Cur) {
  try {
    localStorage.setItem(LS_PORTFOLIO, JSON.stringify(holdings));
    localStorage.setItem(LS_CURRENCY, cur);
  } catch { /* ignore */ }
}

export function usePortfolio() {
  const { user, loaded: authLoaded } = useAuth();

  // Seed state from localStorage immediately (avoids blank flash)
  const localCache = typeof window !== "undefined" ? readLocalCache() : null;
  const [holdings,    setHoldingsState] = useState<Holding[]>(() => localCache?.holdings ?? []);
  const [cur,         setCurState]      = useState<Cur>(() => localCache?.cur ?? "USD");
  const [cloudLoaded, setCloudLoaded]   = useState(false);
  // If localStorage has data we can render immediately; cloud sync happens in background
  const hasLocalCache = localCache !== null && localCache.holdings.length > 0;
  const synced = useRef(false);

  // Load holdings from Supabase user_metadata when user is known
  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      setHoldingsState([]);
      setCurState("USD");
      setCloudLoaded(true);
      synced.current = false;
      try { localStorage.removeItem(LS_PORTFOLIO); localStorage.removeItem(LS_CURRENCY); } catch { /* ignore */ }
      return;
    }
    if (synced.current) return;
    synced.current = true;
    setCloudLoaded(false);

    getSupabase().auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata as PortfolioMeta | undefined;
      const h = meta?.sp_portfolio ?? [];
      const c = meta?.sp_currency ?? "USD";
      setHoldingsState(h);
      if (meta?.sp_currency) setCurState(c);
      writeLocalCache(h, c);
      setCloudLoaded(true);
    });
  }, [authLoaded, user?.id]);

  // Debounced save to Supabase on every change
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveToCloud = useCallback((h: Holding[], c: Cur) => {
    if (!user) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      getSupabase().auth.updateUser({ data: { sp_portfolio: h, sp_currency: c } });
    }, 1200);
  }, [user]);

  const setHoldings = useCallback((val: Holding[] | ((p: Holding[]) => Holding[])) => {
    setHoldingsState((prev) => {
      const next = typeof val === "function" ? val(prev) : val;
      writeLocalCache(next, cur);
      saveToCloud(next, cur);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveToCloud, cur]);

  const setCur = useCallback((c: Cur) => {
    setCurState(c);
    writeLocalCache(holdings, c);
    saveToCloud(holdings, c);
  }, [saveToCloud, holdings]);

  return {
    holdings,
    setHoldings,
    cur,
    setCur,
    // Show immediately from localStorage cache; full cloud sync updates in background
    loaded:     hasLocalCache || (authLoaded && cloudLoaded),
    isLoggedIn: hasLocalCache || !!user,
  };
}
