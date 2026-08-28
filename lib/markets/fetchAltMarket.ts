import { fmtMarketCap, fmtVolume } from "@/lib/yahooFinance";
import { fetchFinnhubRawQuote } from "@/lib/finnhub";
import { fetchNaverIndices, fetchNaverStockQuotes } from "@/lib/naverFinance";
import { fetchYahooChartLive } from "@/lib/yahooChartLive";
import type { FutureItem, IndexQuote, Quote } from "@/lib/api";
import { getMarketConfig, KR_TOP10, KR_HEATMAP, SAFE_ASSETS, SAFE_MACRO_INDICES, type MarketSymbol } from "./config";
import type { MarketId } from "./types";
import type { RegionCell } from "./krReRegions";
import { fetchFuturesMap } from "./fetchFuturesMap";

function spark(price: number, changePercent: number): number[] {
  const n = 9;
  const start = price / (1 + changePercent / 100);
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const noise = Math.sin(i * 2.1 + price) * 0.004 * price;
    return start + (price - start) * t + noise;
  });
}

type LivePx = { price: number; change: number; changePercent: number; volume?: number; marketCap?: number | null };

function toQuote(s: MarketSymbol, p: LivePx): Quote {
  return {
    symbol: s.symbol,
    name: s.name,
    price: p.price,
    change: p.change,
    changePercent: p.changePercent,
    sparkline: spark(p.price, p.changePercent),
    volume: fmtVolume(p.volume ?? 0),
    marketCap: p.marketCap != null ? fmtMarketCap(p.marketCap) : "—",
  };
}

function toIndex(s: MarketSymbol, p: LivePx): IndexQuote {
  return {
    symbol: s.symbol,
    name: s.name,
    fullName: s.name,
    value: p.price,
    change: p.change,
    changePercent: p.changePercent,
    sparkline: spark(p.price, p.changePercent),
  };
}

async function fetchCoinGeckoMap(): Promise<Map<string, LivePx>> {
  const out = new Map<string, LivePx>();
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,binancecoin,cardano,dogecoin,tron,avalanche-2,chainlink&vs_currencies=usd&include_24hr_change=true",
      { cache: "no-store", signal: AbortSignal.timeout(6000) },
    );
    if (!res.ok) return out;
    const d = await res.json();
    const put = (id: string, sym: string) => {
      const row = d?.[id];
      if (row?.usd == null) return;
      const pct = Number(row.usd_24h_change ?? 0);
      const price = Number(row.usd);
      out.set(sym, { price, change: (price * pct) / 100, changePercent: pct });
    };
    put("bitcoin", "BTC-USD");
    put("ethereum", "ETH-USD");
    put("solana", "SOL-USD");
    put("ripple", "XRP-USD");
    put("binancecoin", "BNB-USD");
    put("cardano", "ADA-USD");
    put("dogecoin", "DOGE-USD");
    put("tron", "TRX-USD");
    put("avalanche-2", "AVAX-USD");
    put("chainlink", "LINK-USD");
  } catch { /* ignore */ }
  return out;
}

const FH_CRYPTO: Record<string, string> = {
  "BTC-USD": "BINANCE:BTCUSDT",
  "ETH-USD": "BINANCE:ETHUSDT",
  "SOL-USD": "BINANCE:SOLUSDT",
  "XRP-USD": "BINANCE:XRPUSDT",
  "BNB-USD": "BINANCE:BNBUSDT",
  "ADA-USD": "BINANCE:ADAUSDT",
  "DOGE-USD": "BINANCE:DOGEUSDT",
  "TRX-USD": "BINANCE:TRXUSDT",
  "AVAX-USD": "BINANCE:AVAXUSDT",
  "LINK-USD": "BINANCE:LINKUSDT",
};

const ETF_PROXY: Record<string, { fh: string; scale: number }> = {
  "GC=F": { fh: "GLD", scale: 10 },
  "SI=F": { fh: "SLV", scale: 1 },
  "HG=F": { fh: "COPX", scale: 1 },
  "PL=F": { fh: "PPLT", scale: 1 },
  "PA=F": { fh: "PALL", scale: 1 },
  "CL=F": { fh: "USO", scale: 1 },
  "NG=F": { fh: "UNG", scale: 1 },
  "ZC=F": { fh: "CORN", scale: 1 },
  "ZW=F": { fh: "WEAT", scale: 1 },
  "ZS=F": { fh: "SOYB", scale: 1 },
};

async function fetchSafeSymbolLive(s: MarketSymbol, cgMap: Map<string, LivePx>): Promise<LivePx | null> {
  if (cgMap.has(s.symbol)) return cgMap.get(s.symbol)!;

  const y = await fetchYahooChartLive(s.symbol);
  if (y && y.price > 0) return y;

  if (FH_CRYPTO[s.symbol]) {
    try {
      const fh = await fetchFinnhubRawQuote(FH_CRYPTO[s.symbol]);
      if (fh && fh.c > 0) return { price: fh.c, change: fh.d, changePercent: fh.dp };
    } catch { /* ignore */ }
  }

  const proxy = ETF_PROXY[s.symbol];
  if (proxy) {
    try {
      const fh = await fetchFinnhubRawQuote(proxy.fh);
      if (fh && fh.c > 0) {
        return { price: fh.c * proxy.scale, change: fh.d * proxy.scale, changePercent: fh.dp };
      }
    } catch { /* ignore */ }
  }

  // Haven / ETF tickers — Finnhub stock quote
  if (!s.symbol.includes("=F") && !s.symbol.startsWith("^") && !s.symbol.includes("-")) {
    try {
      const fh = await fetchFinnhubRawQuote(s.symbol);
      if (fh && fh.c > 0) return { price: fh.c, change: fh.d, changePercent: fh.dp };
    } catch { /* ignore */ }
  }

  if (s.symbol === "GC=F") {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd&include_24hr_change=true",
        { cache: "no-store", signal: AbortSignal.timeout(5000) },
      );
      if (res.ok) {
        const d = await res.json();
        const row = d?.["pax-gold"];
        if (row?.usd) {
          const pct = Number(row.usd_24h_change ?? 0);
          const price = Number(row.usd);
          return { price, change: (price * pct) / 100, changePercent: pct };
        }
      }
    } catch { /* ignore */ }
  }

  return null;
}

async function liveSafeQuotes(): Promise<{ quotes: Quote[]; indices: IndexQuote[] }> {
  const cgMap = await fetchCoinGeckoMap();

  const quoteResults = await Promise.all(
    SAFE_ASSETS.map(async (s) => {
      const live = await fetchSafeSymbolLive(s, cgMap);
      return live && live.price > 0 ? toQuote(s, live) : null;
    }),
  );
  const quotes = quoteResults.filter((q): q is Quote => q != null);

  const indexResults = await Promise.all(
    SAFE_MACRO_INDICES.map(async (s) => {
      const live = await fetchSafeSymbolLive(s, cgMap);
      return live && live.price > 0 ? toIndex(s, live) : null;
    }),
  );
  const indices = indexResults.filter((i): i is IndexQuote => i != null);

  return { quotes, indices };
}

async function liveKrQuotes(): Promise<{ quotes: Quote[]; indices: IndexQuote[] }> {
  const codes = KR_TOP10.map((s) => s.symbol.replace(/\.KS$/i, ""));
  const heatCodes = KR_HEATMAP.map((s) => s.symbol.replace(/\.KS$/i, ""));
  const allCodes = [...new Set([...codes, ...heatCodes])];

  const [stockMap, idxMap] = await Promise.all([
    fetchNaverStockQuotes(allCodes),
    fetchNaverIndices(),
  ]);

  const quotes: Quote[] = [];
  for (const s of KR_TOP10) {
    const code = s.symbol.replace(/\.KS$/i, "");
    const n = stockMap.get(s.symbol) ?? stockMap.get(code);
    if (n && n.price > 0) quotes.push(toQuote(s, n));
  }

  const cfg = getMarketConfig("kr");
  const indices: IndexQuote[] = [];
  for (const s of cfg.indices) {
    const n = idxMap.get(s.symbol) ?? idxMap.get(s.symbol === "^KS11" ? "KOSPI" : "KOSDAQ");
    if (n && n.price > 0) indices.push(toIndex(s, n));
  }

  return { quotes, indices };
}

export type AltMarketPayload = {
  indices: IndexQuote[];
  quotes: Quote[];
  futures: FutureItem[];
  liveAt: number;
  regions?: RegionCell[];
  /** 히트맵용 추가 종목 (KR) */
  heatmapQuotes?: Quote[];
};

export async function fetchAltMarketData(market: MarketId): Promise<AltMarketPayload> {
  if (market === "us") throw new Error("use default US market-data path");

  if (market === "kr-re") {
    return {
      indices: [],
      quotes: [],
      futures: [],
      liveAt: Date.now(),
      regions: [],
    };
  }

  if (market === "kr") {
    const { quotes, indices } = await liveKrQuotes();
    if (quotes.length === 0 && indices.length === 0) {
      throw new Error("kr: no live quotes");
    }
    // heatmap: naver로 추가 대형주
    const heatCodes = KR_HEATMAP.map((s) => s.symbol.replace(/\.KS$/i, ""));
    const heatMap = await fetchNaverStockQuotes(heatCodes);
    const heatmapQuotes: Quote[] = [];
    for (const s of KR_HEATMAP) {
      const code = s.symbol.replace(/\.KS$/i, "");
      const n = heatMap.get(s.symbol) ?? heatMap.get(code);
      if (n && n.price > 0) heatmapQuotes.push(toQuote(s, n));
    }
    const futures = await fetchFuturesMap();
    return { indices, quotes, futures, liveAt: Date.now(), heatmapQuotes };
  }

  // safe
  const [{ quotes, indices }, futures] = await Promise.all([
    liveSafeQuotes(),
    fetchFuturesMap(),
  ]);
  if (quotes.length === 0 && indices.length === 0) throw new Error("safe: no live quotes");

  return { indices, quotes, futures, liveAt: Date.now() };
}
