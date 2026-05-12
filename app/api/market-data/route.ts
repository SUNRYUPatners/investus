import { NextResponse } from "next/server";
import { fetchBatchQuotes, fetchIndex, fetchSparkline, fmtVolume, fmtMarketCap } from "@/lib/yahooFinance";
import { fetchFinnhubBatch } from "@/lib/finnhub";
import { toYahoo } from "@/lib/symbolMap";
import {
  mockIndices, mockQuotes, mockFutures, INDEX_MAP,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const dynamic = "force-dynamic";

// ── 지수: Yahoo Finance v8 (동적 라우트에서 동작) ─────────────────────────
async function getLiveIndices(): Promise<IndexQuote[]> {
  const results = await Promise.allSettled(
    INDEX_MAP.map(async (m) => {
      const [q, spark] = await Promise.all([
        fetchIndex(m.yahoo),
        fetchSparkline(m.yahoo).catch(() => [] as number[]),
      ]);
      if (!q) return null;
      const idx: IndexQuote = {
        symbol: m.symbol, name: m.name, fullName: m.fullName,
        value: q.price, change: q.change, changePercent: q.changePercent, sparkline: spark,
      };
      if (m.isCurrency) idx.isCurrency = true;
      return idx;
    })
  );
  const live = results
    .filter((r): r is PromiseFulfilledResult<IndexQuote | null> => r.status === "fulfilled")
    .map((r) => r.value).filter((v): v is IndexQuote => v !== null);
  return live.length > 0 ? live : mockIndices;
}

// ── 주식: Finnhub 우선, 실패 시 Yahoo Finance v8 폴백 ─────────────────────
async function getLiveQuotes(): Promise<Quote[]> {
  const symbols = mockQuotes.map((q) => q.symbol);

  // Finnhub 시도
  const finnhubMap = await fetchFinnhubBatch(symbols);

  // 스파크라인 (Yahoo v8 최선)
  const sparkMap = new Map<string, number[]>();
  await Promise.allSettled(
    symbols.map(async (sym) => {
      const s = await fetchSparkline(sym).catch(() => [] as number[]);
      if (s.length > 0) sparkMap.set(sym, s);
    })
  );

  // Finnhub 결과가 있으면 사용, 없으면 Yahoo v8 폴백
  if (finnhubMap.size > 0) {
    // Finnhub에 없는 심볼은 Yahoo로 보충
    const missing = symbols.filter((s) => !finnhubMap.has(s));
    if (missing.length > 0) {
      const yahooBatch = await fetchBatchQuotes(missing).catch(() => []);
      yahooBatch.forEach((q) => {
        if (!finnhubMap.has(q.symbol)) {
          finnhubMap.set(q.symbol, { symbol: q.symbol, price: q.price, change: q.change, changePercent: q.changePercent });
        }
      });
    }

    return mockQuotes.map((mock) => {
      const q = finnhubMap.get(mock.symbol);
      if (!q) return mock;
      return {
        symbol: mock.symbol, name: mock.name,
        price: q.price, change: q.change, changePercent: q.changePercent,
        sparkline: sparkMap.get(mock.symbol) ?? mock.sparkline,
        volume: mock.volume, marketCap: mock.marketCap,
      } satisfies Quote;
    });
  }

  // Finnhub 전체 실패 → Yahoo v8 폴백
  const yahooQuotes = await fetchBatchQuotes(symbols).catch(() => []);
  if (yahooQuotes.length === 0) return mockQuotes;

  return yahooQuotes.map((q) => {
    const mock = mockQuotes.find((m) => m.symbol === q.symbol);
    return {
      symbol: q.symbol, name: q.shortName,
      price: q.price, change: q.change, changePercent: q.changePercent,
      sparkline: sparkMap.get(q.symbol) ?? mock?.sparkline ?? [],
      volume: fmtVolume(q.volume), marketCap: fmtMarketCap(q.marketCap),
    } satisfies Quote;
  });
}

// ── 선물: Yahoo Finance v8 (크럼 불필요) ──────────────────────────────────
async function getLiveFutures(): Promise<FutureItem[]> {
  const yahooSymbols = mockFutures.map((f) => toYahoo(f.symbol));
  const quotes = await fetchBatchQuotes(yahooSymbols).catch(() => []);
  if (quotes.length === 0) return mockFutures;

  const quoteMap = new Map(quotes.map((q) => [q.symbol, q]));
  return mockFutures.map((f) => {
    const q = quoteMap.get(toYahoo(f.symbol));
    if (!q) return f;
    return { symbol: f.symbol, name: f.name, price: q.price, change: q.change, changePercent: q.changePercent, group: f.group };
  });
}

export async function GET() {
  const [ir, qr, fr] = await Promise.allSettled([
    getLiveIndices(),
    getLiveQuotes(),
    getLiveFutures(),
  ]);
  return NextResponse.json({
    indices: ir.status === "fulfilled" ? ir.value : mockIndices,
    quotes:  qr.status === "fulfilled" ? qr.value : mockQuotes,
    futures: fr.status === "fulfilled" ? fr.value : mockFutures,
  });
}
