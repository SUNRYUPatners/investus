import { isMarketOpen, isEodCacheFresh } from "@/lib/marketHours";
import { isMarketSessionOpen } from "@/lib/markets/hours";
import { krClosedCacheFresh } from "@/lib/markets/krEodCache";
import type { MarketId } from "@/lib/markets/types";

export type CachedMarketQuote = {
  symbol: string;
  price: number;
  change?: number;
  changePercent: number;
};

type MarketDataCachePayload = {
  quotes?: CachedMarketQuote[];
  indices?: { symbol: string; value: number; change: number; changePercent: number }[];
  liveAt?: number;
  _ts?: number;
};

function cacheFresh(market: MarketId, liveAt: number): boolean {
  if (!liveAt) return false;
  if (market === "kr") {
    if (isMarketSessionOpen("kr")) return Date.now() - liveAt < 10 * 60 * 1000;
    return krClosedCacheFresh(liveAt);
  }
  if (market === "us") {
    return isMarketOpen()
      ? Date.now() - liveAt < 10 * 60 * 1000
      : isEodCacheFresh(liveAt);
  }
  return Date.now() - liveAt < 10 * 60 * 1000;
}

/** market-data localStorage — 신선할 때만 */
export function readMarketQuotesFromKey(
  cacheKey: string,
  market: MarketId,
): MarketDataCachePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MarketDataCachePayload;
    const liveAt = parsed.liveAt ?? parsed._ts ?? 0;
    if (!liveAt) return null;
    if (!cacheFresh(market, liveAt)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function readMarketDataQuotes(): Map<string, CachedMarketQuote> | null {
  return readMarketQuotesMap("market-data-cache", "us");
}

export function readMarketQuotesMap(
  cacheKey: string,
  market: MarketId,
): Map<string, CachedMarketQuote> | null {
  const parsed = readMarketQuotesFromKey(cacheKey, market);
  if (!parsed?.quotes?.length) return null;

  const map = new Map<string, CachedMarketQuote>();
  for (const q of parsed.quotes) {
    if (q.symbol && q.price > 0) map.set(q.symbol, q);
  }
  return map.size > 0 ? map : null;
}

export function readSymbolFromMarketCache(
  symbol: string,
  cacheKey: string,
  market: MarketId,
): { price: number; change: number; changePercent: number } | null {
  const parsed = readMarketQuotesFromKey(cacheKey, market);
  if (!parsed) return null;

  const q = parsed.quotes?.find((x) => x.symbol === symbol);
  if (q && q.price > 0) {
    return {
      price: q.price,
      change: q.change ?? 0,
      changePercent: q.changePercent,
    };
  }

  const idx = parsed.indices?.find((i) => i.symbol === symbol);
  if (idx && idx.value > 0) {
    return {
      price: idx.value,
      change: idx.change,
      changePercent: idx.changePercent,
    };
  }

  return null;
}

export function isMarketDataCacheFresh(): boolean {
  return readMarketDataQuotes() !== null;
}

export function hasNonZeroMarketChanges(payload: MarketDataCachePayload): boolean {
  const qOk = (payload.quotes ?? []).some((q) => q.changePercent !== 0);
  const iOk = (payload.indices ?? []).some((i) => i.changePercent !== 0);
  return qOk || iOk;
}
