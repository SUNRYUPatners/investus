import { fmtMarketCap, fmtVolume } from "@/lib/yahooFinance";
import { fetchFinnhubRawQuote } from "@/lib/finnhub";
import { fetchNaverIndices, fetchNaverStockQuotes } from "@/lib/naverFinance";
import { fetchYahooChartLive } from "@/lib/yahooChartLive";
import type { FutureItem, IndexQuote, Quote } from "@/lib/api";
import { getMarketConfig, KR_TOP10, KR_HEATMAP, SAFE_ASSETS, type MarketSymbol } from "./config";
import type { MarketId } from "./types";
import type { RegionCell } from "./krReRegions";

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
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,binancecoin&vs_currencies=usd&include_24hr_change=true",
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
  } catch { /* ignore */ }
  return out;
}

const FH_CRYPTO: Record<string, string> = {
  "BTC-USD": "BINANCE:BTCUSDT",
  "ETH-USD": "BINANCE:ETHUSDT",
  "SOL-USD": "BINANCE:SOLUSDT",
  "XRP-USD": "BINANCE:XRPUSDT",
  "BNB-USD": "BINANCE:BNBUSDT",
};

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

async function liveSafeQuotes(): Promise<Quote[]> {
  const commoditySyms = SAFE_ASSETS.filter((s) =>
    ["GC=F", "SI=F", "HG=F", "PL=F", "CL=F"].includes(s.symbol),
  );
  const cryptoSyms = SAFE_ASSETS.filter((s) =>
    ["BTC-USD", "ETH-USD", "SOL-USD", "XRP-USD", "BNB-USD"].includes(s.symbol),
  );

  const ETF_PROXY: Record<string, { fh: string; scale: number }> = {
    "GC=F": { fh: "GLD", scale: 10 },
    "SI=F": { fh: "SLV", scale: 1 },
    "HG=F": { fh: "COPX", scale: 1 },
    "PL=F": { fh: "PPLT", scale: 1 },
    "CL=F": { fh: "USO", scale: 1 },
  };

  const [cgMap, commodityPairs] = await Promise.all([
    fetchCoinGeckoMap(),
    Promise.all(
      commoditySyms.map(async (s) => {
        // 1) Yahoo chart
        let y = await fetchYahooChartLive(s.symbol);
        if (y && y.price > 0) return [s, y] as const;
        // 2) Finnhub ETF 실호가 프록시 (미국 랜딩과 같은 방식)
        const proxy = ETF_PROXY[s.symbol];
        if (proxy) {
          try {
            const fh = await fetchFinnhubRawQuote(proxy.fh);
            if (fh && fh.c > 0) {
              return [
                s,
                {
                  price: fh.c * proxy.scale,
                  change: fh.d * proxy.scale,
                  changePercent: fh.dp,
                },
              ] as const;
            }
          } catch { /* ignore */ }
        }
        // 3) CoinGecko 금 토큰 (실시장가)
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
                return [s, { price, change: (price * pct) / 100, changePercent: pct }] as const;
              }
            }
          } catch { /* ignore */ }
        }
        return [s, null] as const;
      }),
    ),
  ]);

  const out: Quote[] = [];

  for (const s of cryptoSyms) {
    let live: LivePx | null = null;
    if (cgMap.has(s.symbol)) live = cgMap.get(s.symbol)!;
    if (!live && FH_CRYPTO[s.symbol]) {
      try {
        const fh = await fetchFinnhubRawQuote(FH_CRYPTO[s.symbol]);
        if (fh && fh.c > 0) live = { price: fh.c, change: fh.d, changePercent: fh.dp };
      } catch { /* ignore */ }
    }
    if (!live) {
      const y = await fetchYahooChartLive(s.symbol);
      if (y && y.price > 0) live = y;
    }
    if (live && live.price > 0) out.push(toQuote(s, live));
  }

  for (const [s, y] of commodityPairs) {
    if (y && y.price > 0) out.push(toQuote(s, y));
  }

  return out;
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
    return { indices, quotes, futures: [], liveAt: Date.now(), heatmapQuotes };
  }

  // safe
  const quotes = await liveSafeQuotes();
  if (quotes.length === 0) throw new Error("safe: no live quotes");

  const cfg = getMarketConfig("safe");
  const indices: IndexQuote[] = [];
  for (const s of cfg.indices) {
    const q = quotes.find((x) => x.symbol === s.symbol);
    if (q) {
      indices.push({
        symbol: s.symbol,
        name: s.name,
        fullName: s.name,
        value: q.price,
        change: q.change,
        changePercent: q.changePercent,
        sparkline: q.sparkline,
      });
    }
  }

  const futures: FutureItem[] = quotes.map((q) => ({
    symbol: q.symbol,
    name: q.name,
    price: q.price,
    change: q.change,
    changePercent: q.changePercent,
    group:
      q.symbol.includes("USD") || q.symbol.startsWith("BTC") || q.symbol.startsWith("ETH") || q.symbol.startsWith("SOL")
        ? "암호화폐"
        : "현물",
  }));

  return { indices, quotes, futures, liveAt: Date.now() };
}
