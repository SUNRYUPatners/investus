import { NextResponse } from "next/server";
import { fetchFinnhubBatch, fetchFinnhubRawQuote, type FinnhubRawQuote } from "@/lib/finnhub";
import { fetchBatchQuotes, fetchFutureV8, fetchQuoteV8, type YFQuote } from "@/lib/yahooFinance";

// YF 프록시 (YF_PROXY_URL 설정 시 CF Worker 경유)
const YF_PROXY = process.env.YF_PROXY_URL ?? "";
function yfProxyFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (YF_PROXY) return fetch(`${YF_PROXY}?url=${encodeURIComponent(url)}`, init);
  return fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" }, ...init });
}
import { fetchStooqFuture } from "@/lib/stooq";
import { isMarketOpen } from "@/lib/marketHours";
import { kvGetDetail, kvSetDetail, kvGetPrice, kvSetPrice } from "@/lib/kv";
import {
  mockQuotes, mockFutures,
  type IndexQuote, type Quote, type FutureItem,
} from "@/lib/api";

const KV_MARKET_KEY = "market-data:v3";

// Next.js ISR 비활성 — Cache-Control 헤더를 직접 관리
export const dynamic = "force-dynamic";
// 순차 chunked v8 fetch로 최대 ~15s 소요 가능 → 30s 허용
export const maxDuration = 30;

// ── In-memory cache ───────────────────────────────────────────────────────
// 장 마감 중: 캐시 무기한 서빙 (외부 API 호출 없음)
// 장 중: 55초 TTL로 갱신
type CachePayload = { indices: IndexQuote[]; quotes: Quote[]; futures: FutureItem[]; liveAt: number };
let _cache: { data: CachePayload; at: number } | null = null;
const LIVE_TTL = 55_000; // 55 s (장 중 갱신 주기)

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
  krwPrev:      number | null;
  eurusd:       number | null;
  eurusdChange: number;
  usdjpy:       number | null;
  usdjpyChange: number;
};

async function getForexRates(): Promise<ForexRates> {
  const out: ForexRates = { krw: null, krwPrev: null, eurusd: null, eurusdChange: 0, usdjpy: null, usdjpyChange: 0 };

  // YF로 KRW, EURUSD, JPY 한번에 가져옴 — 변화율 정확 (Frankfurter 0% 버그 제거)
  const [krwYF, eurYF, jpyYF, fxLatest] = await Promise.allSettled([
    fetchQuoteV8("KRW=X"),
    fetchQuoteV8("EURUSD=X"),
    fetchQuoteV8("JPY=X"),
    fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,JPY"),
  ]);

  // KRW
  if (krwYF.status === "fulfilled" && krwYF.value && krwYF.value.price > 0) {
    out.krw     = krwYF.value.price;
    out.krwPrev = krwYF.value.price - krwYF.value.change;
  } else {
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/USD");
      if (r.ok) { const d = await r.json(); out.krw = d?.rates?.KRW ?? null; }
    } catch { /* ignore */ }
  }

  // EUR/USD — YF primary (실시간 변화율 포함), Frankfurter price fallback
  if (eurYF.status === "fulfilled" && eurYF.value && eurYF.value.price > 0) {
    out.eurusd       = eurYF.value.price;
    out.eurusdChange = eurYF.value.changePercent;
  } else if (fxLatest.status === "fulfilled" && fxLatest.value.ok) {
    try {
      const now = await fxLatest.value.json();
      if (now?.rates?.EUR) out.eurusd = 1 / (now.rates.EUR as number);
    } catch { /* ignore */ }
  }

  // USD/JPY — YF primary, Frankfurter fallback
  if (jpyYF.status === "fulfilled" && jpyYF.value && jpyYF.value.price > 0) {
    out.usdjpy       = jpyYF.value.price;
    out.usdjpyChange = jpyYF.value.changePercent;
  } else if (fxLatest.status === "fulfilled" && fxLatest.value.ok) {
    try {
      const now = await (fxLatest.value.clone()).json();
      if (now?.rates?.JPY) out.usdjpy = now.rates.JPY as number;
    } catch { /* ignore */ }
  }

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
  IWM: { sym: "RTY",  factor: 10.05 },
};

// ETF → futures: only change% is live; price derived from mock × (1 + chg%)
const ETF_FUTURE_CHG: Record<string, string> = {
  USO:  "CL",  UNG:  "NG",  SLV:  "SI",  COPX: "HG",
  WEAT: "ZW",  CORN: "ZC",  SOYB: "ZS",
  TLT:  "ZB",  IEF:  "ZN",
};

// ── Futures — Stooq primary (index + commodity), Yahoo Finance v8 fallback ──
// Index futures use actual ES=F/NQ=F/YM=F — NOT spot index data
const COMMODITY_STOOQ: Record<string, string> = {
  ES: "ES.F",  NQ: "NQ.F",  YM: "YM.F",
  CL: "CL.F",  NG: "NG.F",  GC: "GC.F",  SI: "SI.F",  HG: "HG.F",
  ZN: "ZN.F",  ZB: "ZB.F",  ZC: "ZC.F",  ZW: "ZW.F",  ZS: "ZS.F",
};
const COMMODITY_FUTURES_YF: Record<string, string> = {
  ES: "ES=F",  NQ: "NQ=F",  YM: "YM=F",  RTY: "RTY=F",
  CL: "CL=F",   NG: "NG=F",   GC: "GC=F",   SI: "SI=F",   HG: "HG=F",
  ZN: "ZN=F",   ZB: "ZB=F",   ZC: "ZC=F",   ZW: "ZW=F",   ZS: "ZS=F",
  // 해외 지수 (spot index via Yahoo)
  NK: "^N225", DAX: "^GDAXI", FTSE: "^FTSE", HSI: "^HSI",
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
  const url     = new URL(req.url);
  const refresh = url.searchParams.has("refresh");
  const open    = isMarketOpen();

  const ccHeader = open
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";

  // ── cold start: 인메모리 없으면 즉시 KV에서 복원 ────────────────────────────
  const STALE_LIMIT = 30 * 60_000; // 장 중 30분 초과 데이터는 신뢰 불가 → API 강제 갱신
  if (!_cache && !refresh) {
    const kvData = await kvGetDetail(KV_MARKET_KEY);
    if (kvData) {
      const payload = kvData as unknown as CachePayload;
      const age = Date.now() - (payload.liveAt ?? 0);
      // 장 마감: fresh로 복원. 장 중: liveAt=0으로 복원해 아래서 API 갱신 유도
      // 단, 장 중 30분 초과 스테일 데이터는 즉시 갱신 필수 (가격 오차 방지)
      const staleForMarket = open && age > STALE_LIMIT;
      _cache = { data: payload, at: staleForMarket ? 0 : (open ? 0 : Date.now()) };
    }
  }

  // 장 마감: 캐시가 당일(EST) 데이터이면 바로 서빙 — 날짜가 바뀌면 강제 갱신
  if (!open && !refresh && _cache) {
    const cacheDay = new Date(_cache.data.liveAt ?? 0).toLocaleDateString("en-US", { timeZone: "America/New_York" });
    const today    = new Date().toLocaleDateString("en-US", { timeZone: "America/New_York" });
    if (cacheDay === today) {
      return NextResponse.json(_cache.data, { headers: { "Cache-Control": ccHeader } });
    }
    // 날짜가 달라졌으면 캐시 무효화 → 아래서 API 재fetch
    _cache = null;
  }
  // 장 중: liveAt(실제 데이터 신선도) 기준 55초 TTL
  if (!refresh && _cache) {
    const dataAge = Date.now() - (_cache.data.liveAt ?? 0);
    if (dataAge < LIVE_TTL) {
      return NextResponse.json(_cache.data, { headers: { "Cache-Control": ccHeader } });
    }
  }

  const token = process.env.FINNHUB_API_KEY ?? "";

  const stockSymbols = mockQuotes.map((q) => q.symbol);
  const cryptoFHSyms = Object.values(CRYPTO_FH);

  const [yfStockQuotes, fhMap, fxRates, cryptoResults, cgMap, yfComEntries, yfIndexMap] = await Promise.all([
    // YF v7 batch — Yahoo Finance 앱 종가와 일치하는 정확한 가격 소스
    fetchBatchQuotes(stockSymbols),
    // Finnhub — ETF 프록시(지수·선물용)만 사용 (주식 가격은 YF v8로 통일)
    fetchFinnhubBatch([...ETF_PROXY_SYMS]),
    getForexRates(),
    token
      ? Promise.allSettled(cryptoFHSyms.map((s) => fetchFinnhubRawQuote(s)))
      : Promise.resolve(cryptoFHSyms.map(() => ({ status: "fulfilled", value: null } as PromiseFulfilledResult<null>))),
    fetchCoinGecko(),
    // Commodity futures: Stooq batched (5/chunk, 200ms gap) → YF v8 fallback
    // Batching prevents Stooq anti-bot blocking from same Vercel IP
    // Commodity futures: Stooq + YF run simultaneously per symbol, max 5s total
    // Stooq/YF may be blocked on Vercel IPs — parallel fetch + master timeout
    (async () => {
      type CommodityEntry = { key: string; price: number; change: number; changePercent: number };
      const comMap = new Map<string, CommodityEntry>();

      const fetchWithTimeout = async (key: string, stooqSym: string): Promise<CommodityEntry | null> => {
        const yfSym = COMMODITY_FUTURES_YF[key];
        const [stooqR, yfR] = await Promise.allSettled([
          stooqSym ? fetchStooqFuture(stooqSym) : Promise.resolve(null),
          yfSym    ? fetchFutureV8(yfSym)        : Promise.resolve(null),
        ]);
        // YF via CF proxy 우선 — 차트와 동일 소스로 일관성 보장
        const r =
          (yfR.status   === "fulfilled" && yfR.value)     ? yfR.value     :
          (stooqR.status === "fulfilled" && stooqR.value) ? stooqR.value  : null;
        return r ? { key, ...r } : null;
      };

      // Iterate over union of Stooq + YF keys (RTY is YF-only)
      const allFutureKeys = [...new Set([...Object.keys(COMMODITY_STOOQ), ...Object.keys(COMMODITY_FUTURES_YF)])];

      // Master 10s timeout — parallel fetchFutureV8 (4 bases×ranges simultaneously) resolves in ~4s
      const masterTimeout = new Promise<CommodityEntry[]>((res) => setTimeout(() => res([]), 10_000));
      const allFetches    = Promise.allSettled(
        allFutureKeys.map((key) => fetchWithTimeout(key, COMMODITY_STOOQ[key] ?? ""))
      ).then((results) => {
        const out: CommodityEntry[] = [];
        for (const r of results) if (r.status === "fulfilled" && r.value) out.push(r.value);
        return out;
      });

      const entries = await Promise.race([allFetches, masterTimeout]);
      for (const e of entries) comMap.set(e.key, e);
      return [...comMap.values()];
    })(),
    // Yahoo Finance direct index fetch: ^GSPC, ^IXIC, ^DJI — backup when Finnhub ETF proxies fail
    (async (): Promise<Map<string, ETFQuote>> => {
      const out = new Map<string, ETFQuote>();
      const MAP = { SPX: "^GSPC", COMP: "^IXIC", DJI: "^DJI", RTY: "^RUT" } as const;
      await Promise.allSettled(Object.entries(MAP).map(async ([sym, yfSym]) => {
        try {
          const ctrl = new AbortController();
          const tid  = setTimeout(() => ctrl.abort(), 4_000);
          const url  = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yfSym)}?interval=1d&range=5d`;
          const res  = await yfProxyFetch(url, { cache: "no-store", signal: ctrl.signal });
          clearTimeout(tid);
          if (!res.ok) return;
          const json   = await res.json();
          const result = json?.chart?.result?.[0];
          const meta   = result?.meta;
          if (!meta?.regularMarketPrice) return;
          const price  = Number(meta.regularMarketPrice);
          const isOpen = meta.marketState === "REGULAR";
          const rawC: unknown[] = result?.indicators?.quote?.[0]?.close ?? [];
          const closes = rawC.filter((c): c is number => typeof c === "number" && c > 0);
          const prev   = isOpen ? (closes.at(-1) ?? price) : (closes.at(-2) ?? closes.at(-1) ?? price);
          out.set(sym, { price, change: price - prev, changePercent: prev > 0 ? ((price - prev) / prev) * 100 : 0 });
        } catch { /* ignore */ }
      }));
      return out;
    })(),
  ]);

  // 앱 내부 심볼 (CL, NG, …) → 실선물 시세
  const yfComMap = new Map(yfComEntries.map((r) => [r.key, r]));

  // Build indexLive map: Yahoo Finance direct (primary) → Finnhub ETF proxy (fallback)
  // YF direct is more reliable on Vercel (Finnhub rate-limits ETF proxies under load)
  const indexLive = new Map<string, ETFQuote>();
  for (const [etfSym, { sym: idxSym, factor }] of Object.entries(ETF_INDEX)) {
    // 1) Yahoo Finance direct index (^GSPC, ^IXIC, ^DJI) — primary
    const yfDirect = yfIndexMap.get(idxSym);
    if (yfDirect) {
      indexLive.set(idxSym, yfDirect);
      continue;
    }
    // 2) Finnhub ETF proxy (SPY × 10.03, QQQ × 36.83, DIA × 100) — fallback
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
    SPX:    { symbol: "SPX",    name: "S&P 500",      fullName: "S&P 500 Index" },
    COMP:   { symbol: "COMP",   name: "NASDAQ",       fullName: "NASDAQ Composite" },
    DJI:    { symbol: "DJI",    name: "DOW",          fullName: "Dow Jones Industrial" },
    RTY:    { symbol: "RTY",    name: "Russell 2000", fullName: "Russell 2000 Index" },
    USDKRW: { symbol: "USDKRW", name: "원달러",       fullName: "USD/KRW 환율", isCurrency: true },
  };

  const indices: IndexQuote[] = [];

  // USD/KRW — open.er-api.com (현재) + frankfurter.app (전일) 기반
  if (fxRates.krw) {
    const val  = fxRates.krw;
    const prev = fxRates.krwPrev ?? val; // 전일 실제값, 없으면 변화율 0
    indices.push({
      symbol: "USDKRW", name: "원달러", fullName: "USD/KRW 환율",
      value: val, change: val - prev, changePercent: prev !== 0 ? ((val - prev) / prev) * 100 : 0,
      sparkline: syntheticSparkline(val, prev !== 0 ? ((val - prev) / prev) * 100 : 0),
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

  // ── 주식: YF v7 batch → KV 순으로 ──
  const yfStockMap = new Map(yfStockQuotes.map((q) => [q.symbol, q]));

  const buildStockQuote = (
    mock: Quote,
    p: { price: number; change: number; changePercent: number },
  ): Quote => ({
    symbol:        mock.symbol,
    name:          mock.name,
    price:         p.price,
    change:        p.change,
    changePercent: p.changePercent,
    sparkline:     syntheticSparkline(p.price, p.changePercent),
    volume:        mock.volume,
    marketCap:     mock.marketCap,
  });

  const now = Date.now();
  const quotes: Quote[] = (await Promise.all(
    mockQuotes.map(async (mock): Promise<Quote | null> => {
      // 1) YF v7 batch 결과 — Yahoo Finance 앱 종가와 일치
      const yf = yfStockMap.get(mock.symbol);
      if (yf && yf.price > 0) {
        kvSetPrice(mock.symbol, { price: yf.price, change: yf.change, changePercent: yf.changePercent, at: now });
        return buildStockQuote(mock, yf);
      }
      // 2) KV persistent cache (전 거래일 종가 — YF 장애 시)
      const kv = await kvGetPrice(mock.symbol);
      if (kv && kv.price > 0) {
        return buildStockQuote(mock, kv);
      }
      return null;
    }),
  )).filter((q): q is Quote => q !== null);

  // ── 선물 ─────────────────────────────────────────────────────────────
  // Build future→ETF change% lookup from Finnhub
  const futureChgMap = new Map<string, number>();
  for (const [etfSym, futureSym] of Object.entries(ETF_FUTURE_CHG)) {
    const etf = fhMap.get(etfSym);
    if (etf) futureChgMap.set(futureSym, etf.changePercent);
  }

  const futures: FutureItem[] = mockFutures.map((f): FutureItem | null => {
    // 1) All real futures (index + commodity + bond) — YF v8 via CF proxy (Stooq primary when available)
    if (COMMODITY_FUTURES_YF[f.symbol]) {
      const yf = yfComMap.get(f.symbol);
      if (yf && yf.price > 0) {
        return { ...f, price: yf.price, change: yf.change, changePercent: yf.changePercent, isMock: false };
      }
      // Fallbacks: GC → GLD×10, RTY → IWM×10.05, others → ETF change%
      if (f.symbol === "GC") {
        const gld = fhMap.get("GLD");
        if (gld) return { ...f, price: gld.price * 10, change: gld.change * 10, changePercent: gld.changePercent, isMock: false };
      }
      if (f.symbol === "RTY") {
        const iwm = fhMap.get("IWM");
        if (iwm) return { ...f, price: iwm.price * 10.05, change: iwm.change * 10.05, changePercent: iwm.changePercent, isMock: false };
      }
      // ETF change%만 있고 실제 가격 없음 → 표시 금지 (mock 가격으로 change 계산하면 오류)
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

    return null; // 실데이터 없는 항목 제외 — mock 절대 표시 금지
  }).filter((f): f is FutureItem => f !== null);

  // 실데이터가 하나도 없으면 스테일 캐시 무조건 서빙 (오류 반환 절대 금지)
  if (quotes.length === 0 && indices.length === 0) {
    if (_cache) {
      // 스테일이라도 기존 캐시 서빙 — 15초 후 재시도 유도
      _cache = { data: _cache.data, at: Date.now() - (LIVE_TTL - 15_000) };
      return NextResponse.json(_cache.data, { headers: { "Cache-Control": ccHeader } });
    }
    // 캐시도 전혀 없는 최초 cold start + 모든 API 실패 — 503으로 재시도 유도
    return NextResponse.json({ error: "일시적 오류" }, {
      status: 503,
      headers: { "Retry-After": "3", "Cache-Control": "no-store" },
    });
  }

  const payload: CachePayload = { indices, quotes, futures, liveAt: Date.now() };

  // 데이터가 있으면 무조건 캐시 저장
  // 불완전 데이터(일부 API 실패): 15초 후 재시도 가능하도록 at을 과거로 설정
  // 데이터 완전성: 지수 2개 이상 + 선물 10개 이상이면 완전
  const isComplete = quotes.length > 0 && indices.length > 1 && futures.length >= 10;
  if (quotes.length > 0) {
    // 완전 데이터면 full TTL, 부분 데이터면 15초 후 재시도
    _cache = { data: payload, at: isComplete ? Date.now() : Date.now() - (LIVE_TTL - 15_000) };
    // KV 저장 — 항상 저장 (전날 종가 보존, 7일 TTL, 서버재시작/콜드스타트 대비)
    kvSetDetail(KV_MARKET_KEY, payload as unknown as Record<string, unknown>);
  }

  return NextResponse.json(payload, {
    headers: { "Cache-Control": ccHeader },
  });
}
