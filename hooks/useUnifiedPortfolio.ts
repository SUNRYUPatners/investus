"use client";

import { useCallback, useEffect, useState } from "react";
import type { Holding } from "@/lib/api";
import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { usePortfolio } from "@/hooks/usePortfolio";

export type TaggedHolding = Holding & { segment: "us" | "kr" | "safe" };

function readLocalHoldings(key: string): Holding[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Holding[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalHoldings(key: string, holdings: Holding[]) {
  try {
    if (holdings.length === 0) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(holdings));
  } catch { /* ignore */ }
}

/** 로그인 사용자 — 미국·한국·안전자산 포트폴리오 통합 */
export function useUnifiedPortfolio() {
  const us = usePortfolio();
  const krKey = getMarketConfig("kr").portfolioKey;
  const safeKey = getMarketConfig("safe").portfolioKey;

  const [krHoldings, setKrState] = useState<Holding[]>([]);
  const [safeHoldings, setSafeState] = useState<Holding[]>([]);
  const [altLoaded, setAltLoaded] = useState(false);

  useEffect(() => {
    if (!us.isLoggedIn) {
      setKrState([]);
      setSafeState([]);
      setAltLoaded(true);
      return;
    }
    const kr = readLocalHoldings(krKey);
    const safe = readLocalHoldings(safeKey);
    // 레거시 목업(삼성전자·BTC 데모) 제거
    const scrubbedKr =
      kr.length <= 2 &&
      kr.some((h) => h.symbol === "005930.KS" && h.shares === 10 && h.avgCost === 70000)
        ? []
        : kr;
    const scrubbedSafe =
      safe.length <= 2 &&
      safe.some((h) => h.symbol === "BTC-USD" && Math.abs(h.shares - 0.05) < 1e-9)
        ? []
        : safe;
    if (scrubbedKr.length === 0 && kr.length > 0) writeLocalHoldings(krKey, []);
    if (scrubbedSafe.length === 0 && safe.length > 0) writeLocalHoldings(safeKey, []);
    setKrState(scrubbedKr);
    setSafeState(scrubbedSafe);
    setAltLoaded(true);
  }, [us.isLoggedIn, krKey, safeKey]);

  const setKrHoldings = useCallback(
    (val: Holding[] | ((p: Holding[]) => Holding[])) => {
      setKrState((prev) => {
        const next = typeof val === "function" ? val(prev) : val;
        writeLocalHoldings(krKey, next);
        return next;
      });
    },
    [krKey],
  );

  const setSafeHoldings = useCallback(
    (val: Holding[] | ((p: Holding[]) => Holding[])) => {
      setSafeState((prev) => {
        const next = typeof val === "function" ? val(prev) : val;
        writeLocalHoldings(safeKey, next);
        return next;
      });
    },
    [safeKey],
  );

  const setSegmentHoldings = useCallback(
    (segment: "us" | "kr" | "safe", val: Holding[] | ((p: Holding[]) => Holding[])) => {
      if (segment === "us") us.setHoldings(val);
      else if (segment === "kr") setKrHoldings(val);
      else setSafeHoldings(val);
    },
    [us, setKrHoldings, setSafeHoldings],
  );

  const allTagged: TaggedHolding[] = [
    ...us.holdings.map((h) => ({ ...h, segment: "us" as const })),
    ...krHoldings.map((h) => ({ ...h, segment: "kr" as const })),
    ...safeHoldings.map((h) => ({ ...h, segment: "safe" as const })),
  ];

  const totalCount = allTagged.length;
  const loaded = us.loaded && altLoaded;

  return {
    isLoggedIn: us.isLoggedIn,
    loaded,
    us: { holdings: us.holdings, setHoldings: us.setHoldings, cur: us.cur, setCur: us.setCur },
    kr: { holdings: krHoldings, setHoldings: setKrHoldings },
    safe: { holdings: safeHoldings, setHoldings: setSafeHoldings },
    allTagged,
    totalCount,
    setSegmentHoldings,
  };
}

export function segmentLabel(segment: "us" | "kr" | "safe", locale: "ko" | "en"): string {
  const cfg = getMarketConfig(segment as MarketId);
  return locale === "ko" ? cfg.labelKo : cfg.labelEn;
}
