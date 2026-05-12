import { NextResponse } from "next/server";
import { fetchFinnhubBatch, fetchFinnhubRawQuote, type FinnhubRawQuote } from "@/lib/finnhub";
import {
  mockIndices, mockQuotes, mockFutures,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const revalidate = 60;

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ── Synthetic sparkline ───────────────────────────────────────────────────

function syntheticSparkline(price: number, changePercent: number): number[] {
  const n = 9;
  const start = price / (1 + changePercent / 100);
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const noise = Math.sin(i * 2.1 + price) * 0.004 * price;
    return start + (price - start) * t + noise;
  });
}

// ── USD/KRW ───────────────────────────────────────────────────────────────

async function getUSDKRW(): Promise<number | null> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) return null;
    const d = await res.json();
    return d?.rates?.KRW ?? null;
  } catch { return null; }
}

type IndexLive = { price: number; change: number; changePercent: number };

// ── Twelve Data ETF batch (works on Vercel; free tier 8 req/min) ──────────
// SPY≈SPX/10.03  QQQ≈COMP/36.83  DIA≈DJI/100  IWM≈RTY/10.05  GLD≈GC/10
const ETF_SYMS = ["SPY", "QQQ", "DIA", "IWM", "GLD"] as const;

// ETF → spot index derivation (factor = index / etf_price, confirmed live)
const ETF_INDEX: Record<string, { sym: string; factor: number }> = {
  SPY: { sym: "SPX",  factor: 10.03 },
  QQQ: { sym: "COMP", factor: 36.83 },
  DIA: { sym: "DJI",  factor: 100   },
};

async function fetchTwelveDataETFBatch(): Promise<Map<string, IndexLive>> {
  const out = new Map<string, IndexLive>();
  const apiKey = process.env.TWELVEDATA_API_KEY;
  if (!apiKey) return out;
  try {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${ETF_SYMS.join(",")}&apikey=${apiKey}`,
    );
    if (!res.ok) return out;
    const data = await res.json() as Record<string, {
      close?: string; percent_change?: string; change?: string; status?: string;
    }>;
    for (const [sym, q] of Object.entries(data)) {
      if (q.status === "error" || !q.close) continue;
      const price = parseFloat(q.close);
      if (!isNaN(price) && price > 0) {
        out.set(sym, {
          price,
          change:        parseFloat(q.change        ?? "0"),
          changePercent: parseFloat(q.percent_change ?? "0"),
        });
      }
    }
  } catch { /* ignore */ }
  return out;
}

// ── Yahoo Finance for commodity/FX futures (fallback; blocked on Vercel) ─
const YAHOO_FUTURES: Record<string, string> = {
  CL: "CL=F", NG: "NG=F", RB: "RB=F",
  SI: "SI=F", HG: "HG=F",
  ZN: "ZN=F", ZB: "ZB=F",
  "6E": "6E=F", "6J": "6J=F",
  ZC: "ZC=F", ZW: "ZW=F", ZS: "ZS=F",
};

async function fetchYahooFutureQuote(yahooCom: string): Promise<IndexLive | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooCom)}?interval=1d&range=2d&includePrePost=false`;
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (!res.ok) return null;
    const json  = await res.json();
    const meta  = json?.chart?.result?.[0]?.meta;
    if (!meta?.regularMarketPrice) return null;
    const price = meta.regularMarketPrice as number;
    const prev  = (meta.chartPreviousClose ?? 0) as number;
    const change    = prev > 0 ? price - prev : 0;
    const changePct = prev > 0 ? (change / prev) * 100 : 0;
    return { price, change, changePercent: changePct };
  } catch { return null; }
}

// ── Crypto via Finnhub (CoinGecko fallback) ───────────────────────────────

const CRYPTO_FH: Record<string, string> = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
};

async function fetchCoinGecko(): Promise<Map<string, IndexLive>> {
  const out = new Map<string, IndexLive>();
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
      { headers: { "User-Agent": UA } }
    );
    if (!res.ok) return out;
    const d = await res.json();
    if (d.bitcoin?.usd)  out.set("BTC", { price: d.bitcoin.usd,  change: 0, changePercent: d.bitcoin.usd_24h_change  ?? 0 });
    if (d.ethereum?.usd) out.set("ETH", { price: d.ethereum.usd, change: 0, changePercent: d.ethereum.usd_24h_change ?? 0 });
  } catch { /* ignore */ }
  return out;
}

// Index futures → reuse 위에서 가져온 지수 데이터 (중복 호출 없음)
const FUTURES_FROM_INDEX: Record<string, string> = {
  ES: "SPX", NQ: "COMP", YM: "DJI",
};

export async function GET() {
  const token = process.env.FINNHUB_API_KEY ?? "";

  // ── 병렬 조회 ─────────────────────────────────────────────────────────
  const stockSymbols  = mockQuotes.map((q) => q.symbol);
  const futureSymbols = Object.keys(YAHOO_FUTURES);
  const cryptoFHSyms  = Object.values(CRYPTO_FH);

  const [
    stockMap,
    etfMap,
    futuresLiveArr,
    cryptoResults,
    cgMap,
    krwRate,
  ] = await Promise.all([
    fetchFinnhubBatch(stockSymbols),
    fetchTwelveDataETFBatch(),
    Promise.allSettled(futureSymbols.map((s) => fetchYahooFutureQuote(YAHOO_FUTURES[s]))),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    fetchCoinGecko(),
    getUSDKRW(),
  ]);

  // Build indexLive map from ETF proxies
  const indexLive = new Map<string, IndexLive>();
  for (const [etfSym, { sym: idxSym, factor }] of Object.entries(ETF_INDEX)) {
    const etf = etfMap.get(etfSym);
    if (etf) {
      indexLive.set(idxSym, {
        price:         etf.price * factor,
        change:        etf.change * factor,
        changePercent: etf.changePercent,
      });
    }
  }

  // symbol → live commodity futures data (Yahoo; works locally, mock on Vercel)
  const futureLive = new Map<string, IndexLive>();
  futureSymbols.forEach((sym, i) => {
    const r = futuresLiveArr[i];
    if (r.status === "fulfilled" && r.value) futureLive.set(sym, r.value);
  });

  // crypto symbol → raw quote (Finnhub)
  const cryptoRaw = new Map<string, FinnhubRawQuote>();
  Object.values(CRYPTO_FH).forEach((sym, i) => {
    const r = cryptoResults[i];
    if (r.status === "fulfilled" && r.value) cryptoRaw.set(sym, r.value);
  });

  // ── 지수 ─────────────────────────────────────────────────────────────
  const indices: IndexQuote[] = mockIndices.map((mock) => {
    if (mock.isCurrency) {
      const val = krwRate ?? mock.value;
      return { ...mock, value: val, change: val - mock.value, changePercent: ((val - mock.value) / mock.value) * 100 };
    }
    const live = indexLive.get(mock.symbol);
    if (!live) return mock;
    return {
      ...mock,
      value:         live.price,
      change:        live.change,
      changePercent: live.changePercent,
      sparkline:     syntheticSparkline(live.price, live.changePercent),
    };
  });

  // ── 주식 ─────────────────────────────────────────────────────────────
  const quotes: Quote[] = mockQuotes.map((mock) => {
    const q = stockMap.get(mock.symbol);
    if (!q) return mock;
    return {
      ...mock,
      price:         q.price,
      change:        q.change,
      changePercent: q.changePercent,
      sparkline:     syntheticSparkline(q.price, q.changePercent),
    };
  });

  // ── 선물 ─────────────────────────────────────────────────────────────
  const futures: FutureItem[] = mockFutures.map((f) => {
    // 1) ES/NQ/YM → 지수 데이터 재사용 (ETF 프록시에서 파생)
    const idxKey = FUTURES_FROM_INDEX[f.symbol];
    if (idxKey) {
      const live = indexLive.get(idxKey);
      if (live) return { ...f, price: live.price, change: live.change, changePercent: live.changePercent, isMock: false };
    }

    // 2) RTY → IWM × 10.05
    if (f.symbol === "RTY") {
      const iwm = etfMap.get("IWM");
      if (iwm) return { ...f, price: iwm.price * 10.05, change: iwm.change * 10.05, changePercent: iwm.changePercent, isMock: false };
    }

    // 3) GC (금) → GLD × 10
    if (f.symbol === "GC") {
      const gld = etfMap.get("GLD");
      if (gld) return { ...f, price: gld.price * 10, change: gld.change * 10, changePercent: gld.changePercent, isMock: false };
    }

    // 4) 원자재/채권/외환 → Yahoo Finance (로컬 전용, Vercel에선 mock)
    const yhLive = futureLive.get(f.symbol);
    if (yhLive) return { ...f, price: yhLive.price, change: yhLive.change, changePercent: yhLive.changePercent, isMock: false };

    // 5) 크립토 — Finnhub primary, CoinGecko fallback
    if (f.symbol === "BTC" || f.symbol === "ETH") {
      const fhSym = CRYPTO_FH[f.symbol];
      const fhQ   = fhSym ? cryptoRaw.get(fhSym) : undefined;
      if (fhQ && fhQ.c > 0) return { ...f, price: fhQ.c, change: fhQ.d, changePercent: fhQ.dp, isMock: false };
      const cg = cgMap.get(f.symbol);
      if (cg) return { ...f, price: cg.price, change: cg.change, changePercent: cg.changePercent, isMock: false };
    }

    return { ...f, isMock: true };
  });

  return NextResponse.json({ indices, quotes, futures });
}
