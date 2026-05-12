import { NextResponse } from "next/server";
import { fetchBatchQuotes } from "@/lib/yahooFinance";
import {
  fetchFinnhubBatch,
  fetchFinnhubRawQuote,
  fetchFinnhubSparkline,
} from "@/lib/finnhub";
import { toYahoo } from "@/lib/symbolMap";
import {
  mockIndices, mockQuotes, mockFutures, INDEX_MAP,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const dynamic = "force-dynamic";

// ── Finnhub symbol mapping for futures/indices/crypto ─────────────────────
// Symbols that Finnhub supports natively
const FINNHUB_SYMBOL: Record<string, string> = {
  // Index futures → underlying index
  ES:    "^GSPC",
  NQ:    "^IXIC",
  YM:    "^DJI",
  RTY:   "^RUT",
  // Crypto (Binance pairs)
  BTC:   "BINANCE:BTCUSDT",
  ETH:   "BINANCE:ETHUSDT",
  // FX futures (OANDA pairs)
  "6E":  "OANDA:EUR_USD",
  "6J":  "OANDA:USD_JPY",
};

// ── USD/KRW via ExchangeRate-API ──────────────────────────────────────────

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

// ── 주요 지수: Finnhub primary ────────────────────────────────────────────

// Finnhub index symbols (Yahoo format — Finnhub accepts ^GSPC etc.)
const INDEX_FINNHUB: Record<string, string> = {
  SPX:  "^GSPC",
  COMP: "^IXIC",
  DJI:  "^DJI",
};

async function getLiveIndices(): Promise<IndexQuote[]> {
  const token = process.env.FINNHUB_API_KEY ?? "";
  const live: IndexQuote[] = [];

  await Promise.all(
    INDEX_MAP.filter((m) => !m.isCurrency).map(async (m) => {
      try {
        const fhSym = INDEX_FINNHUB[m.symbol];
        const q = fhSym && token ? await fetchFinnhubRawQuote(fhSym) : null;

        let price = q?.c ?? 0, change = q?.d ?? 0, changePercent = q?.dp ?? 0;

        // Yahoo fallback for indices Finnhub doesn't cover
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
              const prev = meta.chartPreviousClose ?? price;
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

  // USD/KRW
  const krwEntry = INDEX_MAP.find((x) => x.isCurrency);
  if (krwEntry) {
    const krw  = await getUSDKRW();
    const mock = mockIndices.find((x) => x.symbol === "USDKRW");
    live.push({
      symbol: krwEntry.symbol, name: krwEntry.name, fullName: krwEntry.fullName,
      value:         krw ?? mock?.value ?? 1370,
      change:        krw && mock ? krw - mock.value : mock?.change ?? 0,
      changePercent: krw && mock ? ((krw - mock.value) / mock.value) * 100 : mock?.changePercent ?? 0,
      sparkline:     mock?.sparkline ?? [],
      isCurrency:    true,
    });
  }

  // Preserve mockIndices order, fill in live values
  return mockIndices.map((mock) => live.find((l) => l.symbol === mock.symbol) ?? mock);
}

// ── 주식: Finnhub + 1D sparkline ──────────────────────────────────────────

async function getLiveQuotes(): Promise<Quote[]> {
  const symbols = mockQuotes.map((q) => q.symbol);

  // Fetch prices + 1D sparklines in parallel
  const [finnhubMap, sparkResults] = await Promise.all([
    fetchFinnhubBatch(symbols),
    Promise.allSettled(symbols.map((sym) => fetchFinnhubSparkline(sym))),
  ]);

  const sparkMap = new Map<string, number[]>();
  symbols.forEach((sym, i) => {
    const r = sparkResults[i];
    if (r.status === "fulfilled" && r.value.length >= 2) sparkMap.set(sym, r.value);
  });

  if (finnhubMap.size > 0) {
    return mockQuotes.map((mock) => {
      const q = finnhubMap.get(mock.symbol);
      if (!q) return mock;
      return {
        symbol:        mock.symbol,
        name:          mock.name,
        price:         q.price,
        change:        q.change,
        changePercent: q.changePercent,
        sparkline:     sparkMap.get(mock.symbol) ?? mock.sparkline,
        volume:        mock.volume,
        marketCap:     mock.marketCap,
      } satisfies Quote;
    });
  }

  // Full fallback to Yahoo Finance
  const yahooQuotes = await fetchBatchQuotes(symbols).catch(() => []);
  if (yahooQuotes.length === 0) return mockQuotes;
  return yahooQuotes.map((q) => {
    const mock = mockQuotes.find((m) => m.symbol === q.symbol);
    return {
      symbol:        q.symbol,
      name:          q.shortName,
      price:         q.price,
      change:        q.change,
      changePercent: q.changePercent,
      sparkline:     sparkMap.get(q.symbol) ?? mock?.sparkline ?? [],
      volume:        mock?.volume ?? "—",
      marketCap:     mock?.marketCap ?? "—",
    } satisfies Quote;
  });
}

// ── 선물: Finnhub for index/crypto/FX, Yahoo fallback for commodities ─────

async function getLiveFutures(): Promise<FutureItem[]> {
  const token = process.env.FINNHUB_API_KEY ?? "";

  // Split into Finnhub-supported and Yahoo-only symbols
  const finnhubSyms  = mockFutures.filter((f) => FINNHUB_SYMBOL[f.symbol]);
  const yahooOnlyFut = mockFutures.filter((f) => !FINNHUB_SYMBOL[f.symbol]);

  const resultMap = new Map<string, { price: number; change: number; changePercent: number }>();

  // Fetch Finnhub-supported futures
  if (token && finnhubSyms.length > 0) {
    await Promise.allSettled(
      finnhubSyms.map(async (f) => {
        const fhSym = FINNHUB_SYMBOL[f.symbol]!;
        const q = await fetchFinnhubRawQuote(fhSym);
        if (q && q.c > 0) {
          resultMap.set(f.symbol, { price: q.c, change: q.d, changePercent: q.dp });
        }
      })
    );
  }

  // Fetch Yahoo-only futures (commodities, bonds)
  if (yahooOnlyFut.length > 0) {
    const yahooSyms = yahooOnlyFut.map((f) => toYahoo(f.symbol));
    const quotes = await fetchBatchQuotes(yahooSyms).catch(() => []);
    const qMap = new Map(quotes.map((q) => [q.symbol, q]));
    yahooOnlyFut.forEach((f) => {
      const q = qMap.get(toYahoo(f.symbol));
      if (q) resultMap.set(f.symbol, { price: q.price, change: q.change, changePercent: q.changePercent });
    });
  }

  return mockFutures.map((f) => {
    const live = resultMap.get(f.symbol);
    if (!live) return f;
    return { ...f, price: live.price, change: live.change, changePercent: live.changePercent };
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
