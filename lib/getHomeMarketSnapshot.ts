import { kvGetDetail } from "@/lib/kv";
import type { FutureItem, IndexQuote, Quote } from "@/lib/api";
import { isEodCacheFresh, isMarketOpen } from "@/lib/marketHours";

export type HomeMarketSnapshot = {
  indices: IndexQuote[];
  quotes: Quote[];
  futures: FutureItem[];
  liveAt: number;
};

const KV_MARKET_KEY = "market-data:v3";

/**
 * 홈 첫 페인트용 — 장 마감 후 EOD KV(또는 장중 초신선)만 반환.
 * 잘못된 장마감 전 스냅샷은 절대 넘기지 않음.
 */
export async function getHomeMarketSnapshot(): Promise<HomeMarketSnapshot | null> {
  try {
    const raw = await kvGetDetail(KV_MARKET_KEY);
    if (!raw) return null;

    const liveAt = typeof raw.liveAt === "number" ? raw.liveAt : 0;
    const quotes = Array.isArray(raw.quotes) ? (raw.quotes as Quote[]) : [];
    const indices = Array.isArray(raw.indices) ? (raw.indices as IndexQuote[]) : [];
    const futures = Array.isArray(raw.futures) ? (raw.futures as FutureItem[]) : [];

    if (quotes.length < 20 || !liveAt) return null;

    if (isMarketOpen()) {
      // 장중: 2분 이내만 SSR — 그 외는 클라이언트가 실시간 fetch
      if (Date.now() - liveAt > 120_000) return null;
    } else if (!isEodCacheFresh(liveAt)) {
      return null;
    }

    return { indices, quotes, futures, liveAt };
  } catch {
    return null;
  }
}
