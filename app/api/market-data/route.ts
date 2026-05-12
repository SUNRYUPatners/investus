import { NextResponse } from "next/server";
import {
  fetchBatchQuotes,
  fetchIndex,
  fetchSparkline,
  fmtVolume,
  fmtMarketCap,
} from "@/lib/yahooFinance";
import { toYahoo } from "@/lib/symbolMap";
import {
  mockIndices,
  mockQuotes,
  mockFutures,
  INDEX_MAP,
  type IndexQuote,
  type Quote,
  type FutureItem,
} from "@/lib/api";

// 동적 라우트 — 캐시 없음 (매 요청마다 Yahoo Finance 호출)
export const dynamic = "force-dynamic";

async function getLiveIndices(): Promise<IndexQuote[]> {
  const results = await Promise.allSettled(
    INDEX_MAP.map(async (m) => {
      const [q, spark] = await Promise.all([
        fetchIndex(m.yahoo),
        fetchSparkline(m.yahoo).catch(() => [] as number[]),
      ]);
      if (!q) return null;
      const idx: IndexQuote = {
        symbol:        m.symbol,
        name:          m.name,
        fullName:      m.fullName,
        value:         q.price,
        change:        q.change,
        changePercent: q.changePercent,
        sparkline:     spark,
      };
      if (m.isCurrency) idx.isCurrency = true;
      return idx;
    })
  );
  const live = results
    .filter((r): r is PromiseFulfilledResult<IndexQuote | null> => r.status === "fulfilled")
    .map((r) => r.value)
    .filter((v): v is IndexQuote => v !== null);
  return live.length > 0 ? live : mockIndices;
}

async function getLiveQuotes(): Promise<Quote[]> {
  const symbols = mockQuotes.map((q) => q.symbol);
  const quotes  = await fetchBatchQuotes(symbols);
  if (quotes.length === 0) return mockQuotes;

  const sparkMap = new Map<string, number[]>();
  await Promise.allSettled(
    symbols.map(async (sym) => {
      const s = await fetchSparkline(sym).catch(() => [] as number[]);
      if (s.length > 0) sparkMap.set(sym, s);
    })
  );

  return quotes.map((q) => {
    const mock = mockQuotes.find((m) => m.symbol === q.symbol);
    return {
      symbol:        q.symbol,
      name:          q.shortName,
      price:         q.price,
      change:        q.change,
      changePercent: q.changePercent,
      sparkline:     sparkMap.get(q.symbol) ?? mock?.sparkline ?? [],
      volume:        fmtVolume(q.volume),
      marketCap:     fmtMarketCap(q.marketCap),
    } satisfies Quote;
  });
}

async function getLiveFutures(): Promise<FutureItem[]> {
  const yahooSymbols = mockFutures.map((f) => toYahoo(f.symbol));
  const quotes       = await fetchBatchQuotes(yahooSymbols);
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
