import { NextResponse } from "next/server";
import { fetchFinnhubBatch, fetchFinnhubRawQuote, type FinnhubRawQuote } from "@/lib/finnhub";
import { fetchFutureV8 } from "@/lib/yahooFinance";
import { fetchStooqFuture } from "@/lib/stooq";
import {
  mockQuotes, mockFutures,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const revalidate = 60;

// ── In-memory cache — 실데이터만 저장 (mock 절대 캐시 금지) ──────────────
type CachePayload = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[]; liveAt: number };
let _cache: { data: CachePayload; at: number } | null = null;
const CACHE_TTL = 55_000; // 55 s

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

// ── Forex rates (USD/KRW, EUR/USD, USD/JPY) ──────────────────────────────
// open.er-api.com: USD/KRW current
// frankfurter.app: EUR/USD + USD/JPY with yesterday-based change%

type ForexRates = {
  krw:          number | null;
  eurusd:       number | null;
  eurusdChange: number;
  usdjpy:       number | null;
  usdjpyChange: number;
};

async function getForexRates(): Promise<ForexRates> {
  const out: ForexRates = { krw: null, eurusd: null, eurusdChange: 0, usdjpy: null, usdjpyChange: 0 };
  try {
    // Previous business day (go back up to 5 days for weekends)
    const prevDate = new Date();
    prevDate.setDate(prevDate.getDate() - 1);
    if (prevDate.getDay() === 0) prevDate.setDate(prevDate.getDate() - 2); // Sun → Fri
    if (prevDate.getDay() === 6) prevDate.setDate(prevDate.getDate() - 1); // Sat → Fri
    const prevStr = prevDate.toISOString().split("T")[0];

    const [usdRes, fxLatest, fxPrev] = await Promise.all([
      fetch("https://open.er-api.com/v6/latest/USD"),
      fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,JPY"),
      fetch(`https://api.frankfurter.app/${prevStr}?from=USD&to=EUR,JPY`),
    ]);

    const usd  = usdRes.ok  ? await usdRes.json()  : null;
    const now  = fxLatest.ok ? await fxLatest.json() : null;
    const prev = fxPrev.ok   ? await fxPrev.json()   : null;

    out.krw = usd?.rates?.KRW ?? null;

    if (now?.rates?.EUR) {
      const curEur  = now.rates.EUR  as number;
      const prevEur = (prev?.rates?.EUR as number | undefined) ?? curEur;
      // EUR/USD = USD per 1 EUR = 1 / (USD per EUR from "from=USD")
      const curEURUSD  = 1 / curEur;
      const prevEURUSD = 1 / prevEur;
      out.eurusd       = curEURUSD;
      out.eurusdChange = prevEURUSD !== 0 ? ((curEURUSD - prevEURUSD) / prevEURUSD) * 100 : 0;
    }
    if (now?.rates?.JPY) {
      const curJpy  = now.rates.JPY  as number;
      const prevJpy = (prev?.rates?.JPY as number | undefined) ?? curJpy;
      out.usdjpy       = curJpy;
      out.usdjpyChange = prevJpy !== 0 ? ((curJpy - prevJpy) / prevJpy) * 100 : 0;
    }
  } catch { /* ignore */ }
  return out;
}

type ETFQuote = { price: number; change: number; changePercent: number };

// (forex handled inside getForexRates via open.er-api.com)

// ── All ETF proxies via Finnhub (60 calls/min, each ETF = 1 call) ─────────
//
// Index ETFs  →  scale to index level:
//   SPY × 10.03 ≈ SPX   QQQ × 36.83 ≈ COMP   DIA × 100 ≈ DJI
//   IWM × 10.05 ≈ RTY   GLD × 10 ≈ GC (gold)
//
// Commodity ETF proxies (Yahoo Finance 실패 시 change% 폴백):
//   USO→CL   UNG→NG   SLV→SI   COPX→HG
//   WEAT→ZW  CORN→ZC  SOYB→ZS
//   TLT→ZB   IEF→ZN   GLD→GC(gold)

const ETF_PROXY_SYMS = [
  "SPY", "QQQ", "DIA", "IWM", "GLD",
  "USO", "UNG", "SLV", "COPX",
  "WEAT", "CORN", "SOYB",
  "TLT", "IEF",
];

// ETF → index: price = ETF × factor
const ETF_INDEX: Record<string, { sym: string; factor: number }> = {
  SPY: { sym: "SPX",  factor: 10.03 },
  QQQ: { sym: "COMP", factor: 36.83 },
  DIA: { sym: "DJI",  factor: 100   },
};

// ETF → futures: only change% is live; price derived from mock × (1 + chg%)
const ETF_FUTURE_CHG: Record<string, string> = {
  USO:  "CL",  UNG:  "NG",  SLV:  "SI",  COPX: "HG",
  WEAT: "ZW",  CORN: "ZC",  SOYB: "ZS",
  TLT:  "ZB",  IEF:  "ZN",
};

// Index futures → reuse derived index data
const FUTURES_FROM_INDEX: Record<string, string> = {
  ES: "SPX", NQ: "COMP", YM: "DJI",
};

// ── Commodity futures — Stooq primary, Yahoo Finance v8 fallback ─────────
// Yahoo Finance is rate-limited from Vercel servers → Stooq CSV is reliable
const COMMODITY_STOOQ: Record<string, string> = {
  CL: "CL.F",  NG: "NG.F",  GC: "GC.F",  SI: "SI.F",  HG: "HG.F",
  ZN: "ZN.F",  ZB: "ZB.F",  ZC: "ZC.F",  ZW: "ZW.F",  ZS: "ZS.F",
};
const COMMODITY_FUTURES_YF: Record<string, string> = {
  CL: "CL=F",   NG: "NG=F",   GC: "GC=F",   SI: "SI=F",   HG: "HG=F",
  ZN: "ZN=F",   ZB: "ZB=F",   ZC: "ZC=F",   ZW: "ZW=F",   ZS: "ZS=F",
};

// ── Crypto via Finnhub (CoinGecko fallback) ───────────────────────────────

const CRYPTO_FH: Record<string, string> = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
};

async function fetchCoinGecko(): Promise<Map<string, ETFQuote>> {
  const out = new Map<string, ETFQuote>();
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
    );
    if (!res.ok) return out;
    const d = await res.json();
    if (d.bitcoin?.usd)
      out.set("BTC", { price: d.bitcoin.usd,  change: 0, changePercent: d.bitcoin.usd_24h_change  ?? 0 });
    if (d.ethereum?.usd)
      out.set("ETH", { price: d.ethereum.usd, change: 0, changePercent: d.ethereum.usd_24h_change ?? 0 });
  } catch { /* ignore */ }
  return out;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const refresh = url.searchParams.has("refresh");
  // Return cached payload if still fresh — avoids bursting Finnhub rate limit
  if (!refresh && _cache && Date.now() - _cache.at < CACHE_TTL) {
    return NextResponse.json(_cache.data);
  }

  const token = process.env.FINNHUB_API_KEY ?? "";

  const stockSymbols = mockQuotes.map((q) => q.symbol);
  // Fetch stocks + all ETF proxies in one Finnhub batch (60 calls/min limit)
  const allFinnhubSyms = [...stockSymbols, ...ETF_PROXY_SYMS];
  const cryptoFHSyms   = Object.values(CRYPTO_FH);

  const [fhMap, fxRates, cryptoResults, cgMap, yfComEntries] = await Promise.all([
    fetchFinnhubBatch(allFinnhubSyms),
    getForexRates(),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    fetchCoinGecko(),
    // Commodity futures: Stooq (parallel, no rate limit) → YF v8 fallback
    (async () => {
      type CommodityEntry = { key: string; price: number; change: number; changePercent: number };
      // 1) Try Stooq in parallel for all symbols
      const stooqResults = await Promise.allSettled(
        Object.entries(COMMODITY_STOOQ).map(async ([key, stooqSym]) => {
          const r = await fetchStooqFuture(stooqSym);
          return r ? ({ key, ...r } as CommodityEntry) : null;
        })
      );
      const stooqMap = new Map<string, CommodityEntry>();
      for (const r of stooqResults) {
        if (r.status === "fulfilled" && r.value) stooqMap.set(r.value.key, r.value);
      }
      // 2) YF v8 fallback for symbols Stooq didn't return
      const missing = Object.entries(COMMODITY_FUTURES_YF).filter(([k]) => !stooqMap.has(k));
      if (missing.length > 0) {
        const yfResults = await Promise.allSettled(
          missing.map(async ([key, yfSym]) => {
            const r = await fetchFutureV8(yfSym);
            return r ? ({ key, ...r } as CommodityEntry) : null;
          })
        );
        for (const r of yfResults) {
          if (r.status === "fulfilled" && r.value) stooqMap.set(r.value.key, r.value);
        }
      }
      return [...stooqMap.values()];
    })(),
  ]);

  // 앱 내부 심볼 (CL, NG, …) → 실선물 시세
  const yfComMap = new Map(yfComEntries.map((r) => [r.key, r]));

  // Build indexLive map from Finnhub ETF data
  const indexLive = new Map<string, ETFQuote>();
  for (const [etfSym, { sym: idxSym, factor }] of Object.entries(ETF_INDEX)) {
    const etf = fhMap.get(etfSym);
    if (etf) {
      indexLive.set(idxSym, {
        price:         etf.price * factor,
        change:        etf.change * factor,
        changePercent: etf.changePercent,
      });
    }
  }

  // crypto symbol → raw quote (Finnhub)
  const cryptoRaw = new Map<string, FinnhubRawQuote>();
  Object.values(CRYPTO_FH).forEach((sym, i) => {
    const r = cryptoResults[i];
    if (r.status === "fulfilled" && r.value) cryptoRaw.set(sym, r.value);
  });

  // ── 지수 (라이브 데이터만 — ETF 없으면 해당 지수 제외) ───────────────
  const INDEX_META: Record<string, { symbol: string; name: string; fullName: string; isCurrency?: boolean }> = {
    SPX:    { symbol: "SPX",    name: "S&P 500", fullName: "S&P 500 Index" },
    COMP:   { symbol: "COMP",   name: "NASDAQ",  fullName: "NASDAQ Composite" },
    DJI:    { symbol: "DJI",    name: "DOW",     fullName: "Dow Jones Industrial" },
    USDKRW: { symbol: "USDKRW", name: "원달러",  fullName: "USD/KRW 환율", isCurrency: true },
  };

  const indices: IndexQuote[] = [];

  // USD/KRW — open.er-api.com 기반
  if (fxRates.krw) {
    const prev = 1372.50; // rough reference — change% approximate
    const val  = fxRates.krw;
    indices.push({
      symbol: "USDKRW", name: "원달러", fullName: "USD/KRW 환율",
      value: val, change: val - prev, changePercent: ((val - prev) / prev) * 100,
      sparkline: syntheticSparkline(val, ((val - prev) / prev) * 100),
      isCurrency: true,
    });
  }
  for (const [idxSym, live] of indexLive.entries()) {
    const meta = INDEX_META[idxSym];
    if (!meta) continue;
    indices.push({
      symbol: meta.symbol, name: meta.name, fullName: meta.fullName,
      value: live.price, change: live.change, changePercent: live.changePercent,
      sparkline: syntheticSparkline(live.price, live.changePercent),
    });
  }

  // ── 주식 (Finnhub 실데이터 있는 종목만) ───────────────────────────────
  const quotes: Quote[] = mockQuotes
    .map((mock) => {
      const q = fhMap.get(mock.symbol);
      if (!q || q.price === 0) return null; // 실데이터 없으면 제외
      return {
        symbol:        mock.symbol,
        name:          mock.name,
        price:         q.price,
        change:        q.change,
        changePercent: q.changePercent,
        sparkline:     syntheticSparkline(q.price, q.changePercent),
        volume:        mock.volume,
        marketCap:     mock.marketCap,
      } satisfies Quote;
    })
    .filter((q): q is Quote => q !== null);

  // ── 선물 ─────────────────────────────────────────────────────────────
  // Build future→ETF change% lookup from Finnhub
  const futureChgMap = new Map<string, number>();
  for (const [etfSym, futureSym] of Object.entries(ETF_FUTURE_CHG)) {
    const etf = fhMap.get(etfSym);
    if (etf) futureChgMap.set(futureSym, etf.changePercent);
  }

  const futures: FutureItem[] = mockFutures.map((f): FutureItem | null => {
    // 1) ES/NQ/YM → ETF-derived index level (accurate price + change%)
    const idxKey = FUTURES_FROM_INDEX[f.symbol];
    if (idxKey) {
      const live = indexLive.get(idxKey);
      if (live) return { ...f, price: live.price, change: live.change, changePercent: live.changePercent, isMock: false };
    }

    // 2) RTY → IWM × 10.05 (Finnhub)
    if (f.symbol === "RTY") {
      const iwm = fhMap.get("IWM");
      if (iwm) return { ...f, price: iwm.price * 10.05, change: iwm.change * 10.05, changePercent: iwm.changePercent, isMock: false };
    }

    // 3) Commodity & bond futures — Yahoo Finance v8 실선물가격 (v7 Unauthorized 우회)
    if (COMMODITY_FUTURES_YF[f.symbol]) {
      const yf = yfComMap.get(f.symbol); // keyed by internal sym (CL, NG, …)
      if (yf && yf.price > 0) {
        return { ...f, price: yf.price, change: yf.change, changePercent: yf.changePercent, isMock: false };
      }
      // Yahoo 실패 시 GC는 GLD×10 폴백
      if (f.symbol === "GC") {
        const gld = fhMap.get("GLD");
        if (gld) return { ...f, price: gld.price * 10, change: gld.change * 10, changePercent: gld.changePercent, isMock: false };
      }
      // 나머지는 ETF change%만이라도 반영
      const liveChg = futureChgMap.get(f.symbol);
      if (liveChg !== undefined) {
        return { ...f, changePercent: liveChg, change: f.price * liveChg / 100, isMock: false };
      }
    }

    // 4) 6E (EUR/USD), 6J (USD/JPY) — Frankfurter (current + daily change%)
    if (f.symbol === "6E" && fxRates.eurusd) {
      return { ...f, price: fxRates.eurusd, change: fxRates.eurusd * fxRates.eurusdChange / 100, changePercent: fxRates.eurusdChange, isMock: false };
    }
    if (f.symbol === "6J" && fxRates.usdjpy) {
      return { ...f, price: fxRates.usdjpy, change: fxRates.usdjpy * fxRates.usdjpyChange / 100, changePercent: fxRates.usdjpyChange, isMock: false };
    }

    // 6) 크립토 — Finnhub primary, CoinGecko fallback
    if (f.symbol === "BTC" || f.symbol === "ETH") {
      const fhSym = CRYPTO_FH[f.symbol];
      const fhQ   = fhSym ? cryptoRaw.get(fhSym) : undefined;
      if (fhQ && fhQ.c > 0) return { ...f, price: fhQ.c, change: fhQ.d, changePercent: fhQ.dp, isMock: false };
      const cg = cgMap.get(f.symbol);
      if (cg) return { ...f, price: cg.price, change: cg.change, changePercent: cg.changePercent, isMock: false };
    }

    return null; // 실데이터 없는 선물 항목 제외
  }).filter((f): f is FutureItem => f !== null);

  // 실데이터가 하나도 없으면 503 — 클라이언트가 이전 캐시 유지
  if (quotes.length === 0 && indices.length === 0) {
    return NextResponse.json({ error: "no live data" }, { status: 503 });
  }

  const payload: CachePayload = { indices, quotes, futures, liveAt: Date.now() };

  // quotes가 비어있으면 캐시 저장 금지 — 다음 요청이 재시도하도록
  if (quotes.length > 0) {
    _cache = { data: payload, at: Date.now() };
  }

  return NextResponse.json(payload);
}
