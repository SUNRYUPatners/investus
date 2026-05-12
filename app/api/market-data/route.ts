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

// ── Index quotes — Yahoo Finance (free, no key needed) ───────────────────
// Maps our internal symbol → Yahoo Finance symbol → Stooq symbol
const INDEX_YAHOO: Record<string, string> = {
  SPX: "%5EGSPC", COMP: "%5EIXIC", DJI: "%5EDJI",
};
const INDEX_STOOQ: Record<string, string> = {
  SPX: "^spx", COMP: "^ndq", DJI: "^dji",
};

type IndexLive = { price: number; change: number; changePercent: number };

async function fetchYahooIndexQuote(yahooSym: string): Promise<IndexLive | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSym}?interval=1d&range=5d&includePrePost=false`;
    const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
    if (!res.ok) return null;
    const json   = await res.json();
    const meta   = json?.chart?.result?.[0]?.meta;
    if (!meta || !meta.regularMarketPrice) return null;
    const price   = meta.regularMarketPrice as number;
    const prev    = (meta.chartPreviousClose ?? meta.previousClose ?? 0) as number;
    const change  = prev > 0 ? price - prev : 0;
    const changePct = prev > 0 ? (change / prev) * 100 : 0;
    return { price, change, changePercent: changePct };
  } catch { return null; }
}

async function fetchStooqIndexQuote(stooqSym: string): Promise<IndexLive | null> {
  try {
    const url = `https://stooq.com/q/l/?s=${encodeURIComponent(stooqSym)}&f=sd2t2ohlcv&h&e=json`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const json = await res.json();
    const sym  = json?.symbols?.[0];
    if (!sym?.close) return null;
    const price = sym.close as number;
    const open  = sym.open  as number;
    const change    = price - open;
    const changePct = open > 0 ? (change / open) * 100 : 0;
    return { price, change, changePercent: changePct };
  } catch { return null; }
}

async function fetchIndexQuote(symbol: string): Promise<IndexLive | null> {
  const yahoo = INDEX_YAHOO[symbol];
  if (yahoo) {
    const r = await fetchYahooIndexQuote(yahoo);
    if (r) return r;
  }
  const stooq = INDEX_STOOQ[symbol];
  if (stooq) return fetchStooqIndexQuote(stooq);
  return null;
}

// ── Yahoo Finance for commodity/FX/index futures ─────────────────────────
// Yahoo Finance `=F` suffix for front-month futures contracts

const YAHOO_FUTURES: Record<string, string> = {
  RTY: "RTY=F", CL: "CL=F", NG: "NG=F", RB: "RB=F",
  GC: "GC=F",   SI: "SI=F", HG: "HG=F",
  ZN: "ZN=F",   ZB: "ZB=F",
  "6E": "6E=F", "6J": "6J=F",
  ZC: "ZC=F",   ZW: "ZW=F", ZS: "ZS=F",
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
  const stockSymbols   = mockQuotes.map((q) => q.symbol);
  const indexSymbols   = mockIndices.filter((m) => !m.isCurrency).map((m) => m.symbol);
  const futureSymbols  = Object.keys(YAHOO_FUTURES);
  const cryptoFHSyms   = Object.values(CRYPTO_FH);

  const [
    stockMap,
    indexLiveArr,
    futuresLiveArr,
    cryptoResults,
    cgMap,
    krwRate,
  ] = await Promise.all([
    fetchFinnhubBatch(stockSymbols),
    Promise.allSettled(indexSymbols.map((s) => fetchIndexQuote(s))),
    Promise.allSettled(futureSymbols.map((s) => fetchYahooFutureQuote(YAHOO_FUTURES[s]))),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    fetchCoinGecko(),
    getUSDKRW(),
  ]);

  // symbol → live index data
  const indexLive = new Map<string, IndexLive>();
  indexSymbols.forEach((sym, i) => {
    const r = indexLiveArr[i];
    if (r.status === "fulfilled" && r.value) indexLive.set(sym, r.value);
  });

  // symbol → live futures data (Yahoo)
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
    // 1) 지수 선물 → 이미 가져온 지수 데이터 재사용
    const idxKey = FUTURES_FROM_INDEX[f.symbol];
    if (idxKey) {
      const live = indexLive.get(idxKey);
      if (live) return { ...f, price: live.price, change: live.change, changePercent: live.changePercent, isMock: false };
    }

    // 2) Yahoo Finance 선물
    const yhLive = futureLive.get(f.symbol);
    if (yhLive) return { ...f, price: yhLive.price, change: yhLive.change, changePercent: yhLive.changePercent, isMock: false };

    // 3) 크립토 — Finnhub primary, CoinGecko fallback
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
