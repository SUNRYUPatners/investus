import { NextResponse } from "next/server";
import { fetchFinnhubBatch, fetchFinnhubRawQuote, type FinnhubRawQuote } from "@/lib/finnhub";
import {
  mockIndices, mockQuotes, mockFutures,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

export const revalidate = 60;

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

type ETFQuote = { price: number; change: number; changePercent: number };

// ── Single Twelve Data batch: indices + all commodity proxies ─────────────
//
// Index ETFs (scale-factor → absolute index level):
//   SPY × 10.03 ≈ SPX   QQQ × 36.83 ≈ COMP   DIA × 100 ≈ DJI
//   IWM × 10.05 ≈ RTY   GLD × 10 ≈ GC (gold)
//
// Forex/FX futures (1:1 or inverted):
//   EUR/USD → 6E    USD/JPY → 6J
//
// Commodity ETF proxies (live change%, mock absolute price):
//   USO→CL   UNG→NG   SLV→SI   COPX→HG
//   WEAT→ZW  CORN→ZC  SOYB→ZS
//   TLT→ZB   IEF→ZN

const ALL_ETF_SYMS = [
  "SPY", "QQQ", "DIA", "IWM", "GLD",
  "EUR/USD", "USD/JPY",
  "USO", "UNG", "SLV", "COPX",
  "WEAT", "CORN", "SOYB",
  "TLT", "IEF",
].join(",");

async function fetchTwelveDataBatch(): Promise<Map<string, ETFQuote>> {
  const out = new Map<string, ETFQuote>();
  const apiKey = process.env.TWELVEDATA_API_KEY;
  if (!apiKey) return out;
  try {
    const res = await fetch(
      `https://api.twelvedata.com/quote?symbol=${ALL_ETF_SYMS}&apikey=${apiKey}`,
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
  const token = process.env.FINNHUB_API_KEY ?? "";

  const stockSymbols = mockQuotes.map((q) => q.symbol);
  const cryptoFHSyms = Object.values(CRYPTO_FH);

  const [stockMap, etfMap, cryptoResults, cgMap, krwRate] = await Promise.all([
    fetchFinnhubBatch(stockSymbols),
    fetchTwelveDataBatch(),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    fetchCoinGecko(),
    getUSDKRW(),
  ]);

  // Build indexLive map from ETF scale factors
  const indexLive = new Map<string, ETFQuote>();
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
  // Build future→ETF change% lookup
  const futureChgMap = new Map<string, number>();
  for (const [etfSym, futureSym] of Object.entries(ETF_FUTURE_CHG)) {
    const etf = etfMap.get(etfSym);
    if (etf) futureChgMap.set(futureSym, etf.changePercent);
  }

  const futures: FutureItem[] = mockFutures.map((f) => {
    // 1) ES/NQ/YM → ETF-derived index level (accurate price + change%)
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

    // 4) 6E (EUR/USD), 6J (USD/JPY) — direct forex rate from Twelve Data
    if (f.symbol === "6E") {
      const eur = etfMap.get("EUR/USD");
      if (eur) return { ...f, price: eur.price, change: eur.change, changePercent: eur.changePercent, isMock: false };
    }
    if (f.symbol === "6J") {
      const jpy = etfMap.get("USD/JPY");
      if (jpy) return { ...f, price: jpy.price, change: jpy.change, changePercent: jpy.changePercent, isMock: false };
    }

    // 5) Commodity ETF proxies — live change%, mock absolute price
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

  return NextResponse.json({ indices, quotes, futures });
}
