"use client";

import { useCallback, useEffect, useState } from "react";
import type { Holding } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { usePortfolio } from "@/hooks/usePortfolio";

/** 과거 시드된 목업 포트폴리오 — 무조건 제거 */
const DEMO_SYMBOLS_KR = new Set(["005930.KS", "000660.KS"]);
const DEMO_SYMBOLS_SAFE = new Set(["BTC-USD", "GC=F"]);

function isLegacyDemo(market: MarketId, h: Holding[]): boolean {
  if (h.length === 0) return false;
  if (market === "kr") {
    return (
      h.length <= 2 &&
      h.every((x) => DEMO_SYMBOLS_KR.has(x.symbol)) &&
      h.some((x) => x.symbol === "005930.KS" && x.shares === 10 && x.avgCost === 70000)
    );
  }
  if (market === "safe") {
    return (
      h.length <= 2 &&
      h.every((x) => DEMO_SYMBOLS_SAFE.has(x.symbol)) &&
      h.some((x) => x.symbol === "BTC-USD" && Math.abs(x.shares - 0.05) < 1e-9)
    );
  }
  return false;
}

/** 시장별 포트폴리오 — US는 Supabase 연동, KR/Safe는 localStorage (목업 없음) */
export function useMarketPortfolio(market: MarketId) {
  const us = usePortfolio();
  const cfg = getMarketConfig(market);
  const [holdings, setHoldingsState] = useState<Holding[]>([]);
  const [loaded, setLoaded] = useState(market === "us");

  useEffect(() => {
    if (market === "us") return;
    try {
      const raw = localStorage.getItem(cfg.portfolioKey);
      if (!raw) {
        setHoldingsState([]);
        setLoaded(true);
        return;
      }
      const parsed = JSON.parse(raw) as Holding[];
      if (!Array.isArray(parsed)) {
        setHoldingsState([]);
        setLoaded(true);
        return;
      }
      if (isLegacyDemo(market, parsed)) {
        localStorage.removeItem(cfg.portfolioKey);
        setHoldingsState([]);
      } else {
        setHoldingsState(parsed);
      }
    } catch {
      setHoldingsState([]);
    }
    setLoaded(true);
  }, [market, cfg.portfolioKey]);

  const setHoldings = useCallback(
    (val: Holding[] | ((p: Holding[]) => Holding[])) => {
      setHoldingsState((prev) => {
        const next = typeof val === "function" ? val(prev) : val;
        try {
          if (next.length === 0) localStorage.removeItem(cfg.portfolioKey);
          else localStorage.setItem(cfg.portfolioKey, JSON.stringify(next));
        } catch { /* ignore */ }
        return next;
      });
    },
    [cfg.portfolioKey],
  );

  if (market === "us") {
    return {
      holdings: us.holdings,
      setHoldings: us.setHoldings,
      cur: us.cur,
      setCur: us.setCur,
      loaded: us.loaded,
      isLoggedIn: us.isLoggedIn,
    };
  }

  return {
    holdings,
    setHoldings,
    cur: "KRW" as const,
    setCur: () => {},
    loaded,
    /** KR/Safe: 보유 등록은 시장별 포트폴리오 탭에서 */
    isLoggedIn: true,
  };
}
