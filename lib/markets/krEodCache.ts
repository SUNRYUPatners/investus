import type { IndexQuote, Quote } from "@/lib/api";
import type { AltMarketPayload } from "./fetchAltMarket";
import { isMarketSessionOpen } from "./hours";

const MAX_CLOSED_AGE_MS = 4 * 24 * 60 * 60_000;

/** 등락률이 실제로 담긴 EOD 페이로드인지 (PREOPEN 0% 스냅샷 제외) */
export function krPayloadHasEodChanges(payload: AltMarketPayload): boolean {
  const quotes = payload.quotes ?? [];
  const indices = payload.indices ?? [];
  if (quotes.length === 0 && indices.length === 0) return false;

  const qNonZero = quotes.filter((q) => q.changePercent !== 0).length;
  const iNonZero = indices.filter((i) => i.changePercent !== 0).length;

  if (qNonZero >= Math.min(3, Math.ceil(quotes.length * 0.25))) return true;
  if (indices.length > 0 && iNonZero >= indices.length) return true;
  return false;
}

/** fresh가 PREOPEN 0%일 때 stale의 등락률·스파크라인 유지 */
export function mergeKrEodPayload(
  fresh: AltMarketPayload,
  stale: AltMarketPayload,
): AltMarketPayload {
  const staleQuote = new Map((stale.quotes ?? []).map((q) => [q.symbol, q]));
  const staleIdx = new Map((stale.indices ?? []).map((i) => [i.symbol, i]));

  const quotes: Quote[] = (fresh.quotes ?? []).map((q) => {
    if (q.changePercent !== 0) return q;
    const prev = staleQuote.get(q.symbol);
    if (!prev || prev.changePercent === 0) return q;
    return {
      ...q,
      change: prev.change,
      changePercent: prev.changePercent,
      sparkline: prev.sparkline,
    };
  });

  const indices: IndexQuote[] = (fresh.indices ?? []).map((i) => {
    if (i.changePercent !== 0) return i;
    const prev = staleIdx.get(i.symbol);
    if (!prev || prev.changePercent === 0) return i;
    return {
      ...i,
      value: prev.value,
      change: prev.change,
      changePercent: prev.changePercent,
      sparkline: prev.sparkline,
    };
  });

  return { ...fresh, quotes, indices, liveAt: stale.liveAt ?? fresh.liveAt };
}

export function krClosedCacheFresh(liveAt: number, now = Date.now()): boolean {
  if (!liveAt || liveAt <= 0) return false;
  return now - liveAt < MAX_CLOSED_AGE_MS;
}

export function shouldServeKrClosedCache(
  cached: AltMarketPayload,
  now = Date.now(),
): boolean {
  if (!isMarketSessionOpen("kr", new Date(now))) {
    return krClosedCacheFresh(cached.liveAt ?? 0, now) && krPayloadHasEodChanges(cached);
  }
  return false;
}

export function krCacheControlHeader(open: boolean, untilOpenSec?: number): string {
  if (open) return "public, s-maxage=55, stale-while-revalidate=60";
  const ttl = untilOpenSec != null ? Math.max(60, Math.min(14400, untilOpenSec - 60)) : 14400;
  return `public, s-maxage=${ttl}, stale-while-revalidate=${ttl}`;
}
