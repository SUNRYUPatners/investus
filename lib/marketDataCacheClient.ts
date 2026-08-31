import { isMarketOpen, isEodCacheFresh } from "@/lib/marketHours";

export type CachedMarketQuote = {
  symbol: string;
  price: number;
  changePercent: number;
};

type MarketDataCachePayload = {
  quotes?: CachedMarketQuote[];
  liveAt?: number;
  _ts?: number;
};

/** LiveMarket이 쓰는 market-data-cache — 신선할 때만 */
export function readMarketDataQuotes(): Map<string, CachedMarketQuote> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("market-data-cache");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MarketDataCachePayload;
    const liveAt = parsed.liveAt ?? parsed._ts ?? 0;
    if (!liveAt || !parsed.quotes?.length) return null;

    const ok = isMarketOpen()
      ? Date.now() - liveAt < 10 * 60 * 1000
      : isEodCacheFresh(liveAt);
    if (!ok) return null;

    const map = new Map<string, CachedMarketQuote>();
    for (const q of parsed.quotes) {
      if (q.symbol && q.price > 0) map.set(q.symbol, q);
    }
    return map.size > 0 ? map : null;
  } catch {
    return null;
  }
}

export function isMarketDataCacheFresh(): boolean {
  return readMarketDataQuotes() !== null;
}
