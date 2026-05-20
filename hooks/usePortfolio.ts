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

export function usePortfolio() {
  const { user, loaded: authLoaded } = useAuth();
  const [holdings,    setHoldingsState] = useState<Holding[]>([]);
  const [cur,         setCurState]      = useState<Cur>("USD");
  const [cloudLoaded, setCloudLoaded]   = useState(false);
  const synced = useRef(false);

  // Load holdings from Supabase user_metadata when user is known
  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      setHoldingsState([]);
      setCurState("USD");
      setCloudLoaded(true);
      synced.current = false;
      return;
    }
    if (synced.current) return;
    synced.current = true;
    setCloudLoaded(false);

    getSupabase().auth.getUser().then(({ data }) => {
      const meta = data.user?.user_metadata as PortfolioMeta | undefined;
      setHoldingsState(meta?.sp_portfolio ?? []);
      if (meta?.sp_currency) setCurState(meta.sp_currency);
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
      saveToCloud(next, cur);
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveToCloud, cur]);

  const setCur = useCallback((c: Cur) => {
    setCurState(c);
    saveToCloud(holdings, c);
  }, [saveToCloud, holdings]);

  return {
    holdings,
    setHoldings,
    cur,
    setCur,
    loaded:     authLoaded && cloudLoaded,
    isLoggedIn: !!user,
  };
}
