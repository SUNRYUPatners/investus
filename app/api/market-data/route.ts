import { NextResponse } from "next/server";
import { fetchBatchQuotes, fetchSparkline, fmtVolume, fmtMarketCap } from "@/lib/yahooFinance";
import { fetchFinnhubBatch, fetchFinnhubRawQuote } from "@/lib/finnhub";
import { toYahoo } from "@/lib/symbolMap";
import {
  mockIndices, mockQuotes, mockFutures, INDEX_MAP,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const dynamic = "force-dynamic";

// ── 지수: Finnhub + ExchangeRate fallback ─────────────────────────────────

// Finnhub uses Yahoo-style symbols for US indices (^GSPC, ^IXIC, ^DJI)
const INDEX_FINNHUB: Record<string, string> = {
  SPX:    "^GSPC",
  COMP:   "^IXIC",
  DJI:    "^DJI",
};

async function getUSDKRW(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) return null;
    const d = await res.json();
    return d?.rates?.KRW ?? null;
  } catch {
    return null;
  }
}

async function getLiveIndices(): Promise<IndexQuote[]> {
  const token = process.env.FINNHUB_API_KEY ?? "";
  const live: IndexQuote[] = [];

  // US indices via Finnhub
  await Promise.all(
    INDEX_MAP.filter((m) => !m.isCurrency).map(async (m) => {
      try {
        const fhSym = INDEX_FINNHUB[m.symbol];
        const q = fhSym && token ? await fetchFinnhubRawQuote(fhSym) : null;

        // Yahoo v8 fallback
        let price = q?.c ?? 0, change = q?.d ?? 0, changePercent = q?.dp ?? 0;
        if (!q || q.c === 0) {
          try {
            const res = await fetch(
              `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(m.yahoo)}?interval=1d&range=1d`,
              { headers: { "User-Agent": "Mozilla/5.0" } }
            );
            if (res.ok) {
              const json = await res.json();
              const meta = json?.chart?.result?.[0]?.meta ?? {};
              price = meta.regularMarketPrice ?? 0;
              const prev = meta.chartPreviousClose ?? meta.regularMarketPrice ?? 0;
              change = price - prev;
              changePercent = prev > 0 ? (change / prev) * 100 : 0;
            }
          } catch { /* ignore */ }
        }

        if (price > 0) {
          live.push({
            symbol: m.symbol, name: m.name, fullName: m.fullName,
            value: price, change, changePercent, sparkline: [],
          });
        }
      } catch { /* ignore */ }
    })
  );

  // USD/KRW via ExchangeRate-API
  const m = INDEX_MAP.find((x) => x.isCurrency);
  if (m) {
    const krw = await getUSDKRW();
    const mock = mockIndices.find((x) => x.symbol === "USDKRW");
    live.push({
      symbol: m.symbol, name: m.name, fullName: m.fullName,
      value: krw ?? mock?.value ?? 1370,
      change: krw && mock ? krw - mock.value : mock?.change ?? 0,
      changePercent: krw && mock ? ((krw - mock.value) / mock.value) * 100 : mock?.changePercent ?? 0,
      sparkline: mock?.sparkline ?? [],
      isCurrency: true,
    });
  }

  // Keep mock order, fill in live data
  return mockIndices.map((mock) => {
    const lv = live.find((l) => l.symbol === mock.symbol);
    return lv ?? mock;
  });
}

// ── 주식: Finnhub 우선, Yahoo v8 폴백 ─────────────────────────────────────

async function getLiveQuotes(): Promise<Quote[]> {
  const symbols = mockQuotes.map((q) => q.symbol);

  const finnhubMap = await fetchFinnhubBatch(symbols);

  const sparkMap = new Map<string, number[]>();
  await Promise.allSettled(
    symbols.map(async (sym) => {
      const s = await fetchSparkline(sym).catch(() => [] as number[]);
      if (s.length > 0) sparkMap.set(sym, s);
    })
  );

  if (finnhubMap.size > 0) {
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

// ── 선물: Yahoo Finance v8 ────────────────────────────────────────────────

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
