import { NextResponse } from "next/server";
import { fetchFinnhubBatch, fetchFinnhubRawQuote, type FinnhubRawQuote } from "@/lib/finnhub";
import {
  mockIndices, mockQuotes, mockFutures,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const revalidate = 60;

// ── In-memory cache (survives hot-reload in dev, prevents rate-limit bursts) ─
type CachePayload = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[] };
let _cache: { data: CachePayload; at: number } | null = null;
const CACHE_TTL = 55_000; // 55 s — refresh before revalidate window expires

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
// Commodity ETF proxies (live change%, mock absolute price):
//   USO→CL   UNG→NG   SLV→SI   COPX→HG
//   WEAT→ZW  CORN→ZC  SOYB→ZS
//   TLT→ZB   IEF→ZN

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

export async function GET() {
  // Return cached payload if still fresh — avoids bursting Finnhub rate limit
  if (_cache && Date.now() - _cache.at < CACHE_TTL) {
    return NextResponse.json(_cache.data);
  }

  const token = process.env.FINNHUB_API_KEY ?? "";

  const stockSymbols = mockQuotes.map((q) => q.symbol);
  // Fetch stocks + all ETF proxies in one Finnhub batch (60 calls/min limit)
  const allFinnhubSyms = [...stockSymbols, ...ETF_PROXY_SYMS];
  const cryptoFHSyms   = Object.values(CRYPTO_FH);

  const [fhMap, fxRates, cryptoResults, cgMap] = await Promise.all([
    fetchFinnhubBatch(allFinnhubSyms),
    getForexRates(),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    fetchCoinGecko(),
  ]);

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

  // ── 지수 ─────────────────────────────────────────────────────────────
  const indices: IndexQuote[] = mockIndices.map((mock) => {
    if (mock.isCurrency) {
      const val = fxRates.krw ?? mock.value;
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
    const q = fhMap.get(mock.symbol);
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
  // Build future→ETF change% lookup from Finnhub
  const futureChgMap = new Map<string, number>();
  for (const [etfSym, futureSym] of Object.entries(ETF_FUTURE_CHG)) {
    const etf = fhMap.get(etfSym);
    if (etf) futureChgMap.set(futureSym, etf.changePercent);
  }

  const futures: FutureItem[] = mockFutures.map((f) => {
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

    // 3) GC (금) → GLD × 10 (Finnhub)
    if (f.symbol === "GC") {
      const gld = fhMap.get("GLD");
      if (gld) return { ...f, price: gld.price * 10, change: gld.change * 10, changePercent: gld.changePercent, isMock: false };
    }

    // 4) 6E (EUR/USD), 6J (USD/JPY) — Frankfurter (current + daily change%)
    if (f.symbol === "6E" && fxRates.eurusd) {
      return { ...f, price: fxRates.eurusd, change: fxRates.eurusd * fxRates.eurusdChange / 100, changePercent: fxRates.eurusdChange, isMock: false };
    }
    if (f.symbol === "6J" && fxRates.usdjpy) {
      return { ...f, price: fxRates.usdjpy, change: fxRates.usdjpy * fxRates.usdjpyChange / 100, changePercent: fxRates.usdjpyChange, isMock: false };
    }

    // 5) Commodity ETF proxies — live change%, mock absolute price (Finnhub)
    const liveChg = futureChgMap.get(f.symbol);
    if (liveChg !== undefined) {
      return {
        ...f,
        changePercent: liveChg,
        change:        f.price * liveChg / 100,
        isMock:        false,
      };
    }

    // 6) 크립토 — Finnhub primary, CoinGecko fallback
    if (f.symbol === "BTC" || f.symbol === "ETH") {
      const fhSym = CRYPTO_FH[f.symbol];
      const fhQ   = fhSym ? cryptoRaw.get(fhSym) : undefined;
      if (fhQ && fhQ.c > 0) return { ...f, price: fhQ.c, change: fhQ.d, changePercent: fhQ.dp, isMock: false };
      const cg = cgMap.get(f.symbol);
      if (cg) return { ...f, price: cg.price, change: cg.change, changePercent: cg.changePercent, isMock: false };
    }

    return { ...f, isMock: true };
  });

  const payload: CachePayload = { indices, quotes, futures };
  _cache = { data: payload, at: Date.now() };
  return NextResponse.json(payload);
}
