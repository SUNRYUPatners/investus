import { NextRequest, NextResponse } from "next/server";
import { toYahoo } from "@/lib/symbolMap";

export const dynamic = "force-dynamic";
import {
  fetchFinnhubRawQuote,
  fetchFinnhubProfile,
  fetchFinnhubMetrics,
} from "@/lib/finnhub";
import { isMarketOpen } from "@/lib/marketHours";

// CDN caching via Cache-Control — Vercel serverless is stateless (no in-memory cache)
function saveAndRespond(_symbol: string, data: Record<string, unknown>) {
  const cc = isMarketOpen()
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";
  return NextResponse.json(data, { headers: { "Cache-Control": cc } });
}

const UA = "Mozilla/5.0";

const YF_HOSTS = [
  "https://query2.finance.yahoo.com",
  "https://query1.finance.yahoo.com",
];

// ── Yahoo Finance v8 chart — range=5d 기본, 1d 폴백 ──────────────────────
// range=1d 는 장 마감 중에 result=null 을 반환하므로 5d를 사용

async function fetchV8Meta(yahooSym: string) {
  for (const base of YF_HOSTS) {
    for (const range of ["5d", "1mo"]) {
      try {
        const url =
          `${base}/v8/finance/chart/${encodeURIComponent(yahooSym)}` +
          `?interval=1d&range=${range}&includePrePost=false`;
        const res = await fetch(url, {
          headers: { "User-Agent": UA, Accept: "application/json" },
          cache: "no-store",
        });
        if (!res.ok) continue;
        const json   = await res.json();
        const result = json?.chart?.result?.[0];
        if (!result?.meta) continue;
        const meta = result.meta as Record<string, unknown>;
        // regularMarketPrice must be present
        if (!meta.regularMarketPrice) continue;
        return { meta, result };
      } catch { /* try next */ }
    }
  }
  return null;
}

// ── open.er-api.com — USDKRW fallback (always available, no auth) ─────────
async function fetchErApiUSDKRW(): Promise<{ price: number; prevPrice: number } | null> {
  try {
    // Previous business day for change%
    const prev = new Date();
    prev.setDate(prev.getDate() - 1);
    if (prev.getDay() === 0) prev.setDate(prev.getDate() - 2);
    if (prev.getDay() === 6) prev.setDate(prev.getDate() - 1);
    const prevStr = prev.toISOString().split("T")[0];

    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 6_000);
    const [curRes, prevRes] = await Promise.all([
      fetch("https://open.er-api.com/v6/latest/USD",       { cache: "no-store", signal: ctrl.signal }),
      fetch(`https://open.er-api.com/v6/${prevStr}/USD`,   { cache: "no-store", signal: ctrl.signal }),
    ]);
    clearTimeout(tid);

    if (!curRes.ok) return null;
    const cur   = await curRes.json();
    const price = cur?.rates?.KRW as number | undefined;
    if (!price || price <= 0) return null;

    let prevPrice = price;
    if (prevRes.ok) {
      const pd = await prevRes.json();
      prevPrice = (pd?.rates?.KRW as number | undefined) ?? price;
    }
    return { price, prevPrice };
  } catch { return null; }
}

// ── Yahoo Finance v8 direct index fetch (matches market-data/route.ts) ───
// Uses query2 only — confirmed working from Vercel IPs; query1 may block

const INDEX_YF: Record<string, { yfSym: string; name: string; isCurrency?: boolean }> = {
  SPX:    { yfSym: "^GSPC",    name: "S&P 500 Index"       },
  COMP:   { yfSym: "^IXIC",    name: "NASDAQ Composite"     },
  DJI:    { yfSym: "^DJI",     name: "Dow Jones Industrial" },
  USDKRW: { yfSym: "USDKRW=X", name: "USD/KRW", isCurrency: true },
};

async function fetchIndexDirect(rawSym: string) {
  const idx = INDEX_YF[rawSym];
  if (!idx) return null;
  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 5_000);
    const url  = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(idx.yfSym)}?interval=1d&range=5d`;
    const res  = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      cache: "no-store",
      signal: ctrl.signal,
    });
    clearTimeout(tid);
    if (!res.ok) return null;
    const meta = (await res.json())?.chart?.result?.[0]?.meta as Record<string, unknown> | undefined;
    if (!meta?.regularMarketPrice) return null;
    return { meta, name: idx.name, isCurrency: idx.isCurrency };
  } catch {
    return null;
  }
}

// ── Yahoo Finance v7 quote — price + OHLCV ───────────────────────────────

async function fetchV7Quote(yahooSym: string) {
  const fields = [
    "regularMarketPrice", "regularMarketChange", "regularMarketChangePercent",
    "regularMarketOpen", "regularMarketDayHigh", "regularMarketDayLow",
    "regularMarketVolume", "regularMarketPreviousClose",
    "trailingPE", "marketCap", "averageDailyVolume3Month",
    "trailingAnnualDividendYield", "beta", "epsTrailingTwelveMonths",
    "fiftyTwoWeekHigh", "fiftyTwoWeekLow",
    "shortName", "longName", "fullExchangeName", "currency",
  ].join(",");

  for (const base of YF_HOSTS) {
    try {
      const url =
        `${base}/v7/finance/quote?symbols=${encodeURIComponent(yahooSym)}&fields=${fields}`;
      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "application/json" },
        
      });
      if (!res.ok) continue;
      const json = await res.json();
      const q    = json?.quoteResponse?.result?.[0];
      if (!q || !q.regularMarketPrice) continue;
      return q as Record<string, unknown>;
    } catch { /* try next */ }
  }
  return null;
}

// ── Main handler ──────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const rawSymbol = (req.nextUrl.searchParams.get("symbol") ?? "").toUpperCase();
  if (!rawSymbol) return NextResponse.json({ error: "no symbol" }, { status: 400 });


  const yahooSymbol     = toYahoo(rawSymbol);
  const isIndexOrFuture = yahooSymbol !== rawSymbol;

  // ETF proxy for major US indices (Finnhub is reliable; Yahoo often blocked from Vercel)
  const INDEX_ETF: Record<string, { etf: string; factor: number; name: string; exchange: string }> = {
    SPX:  { etf: "SPY",  factor: 10.03, name: "S&P 500 Index",       exchange: "Index" },
    COMP: { etf: "QQQ",  factor: 36.83, name: "NASDAQ Composite",     exchange: "Index" },
    DJI:  { etf: "DIA",  factor: 100,   name: "Dow Jones Industrial", exchange: "Index" },
  };

  try {
    // ── 0) Yahoo Finance v8 direct — primary for SPX/COMP/DJI ────────────
    // Same URL pattern as market-data/route.ts (confirmed working from Vercel)
    const yfDirect = await fetchIndexDirect(rawSymbol);
    if (yfDirect) {
      const { meta, name, isCurrency } = yfDirect;
      const price = Number(meta.regularMarketPrice);
      const prev  = Number(meta.chartPreviousClose ?? meta.regularMarketPreviousClose ?? price);
      return saveAndRespond(rawSymbol, {
        symbol:        rawSymbol,
        name,
        exchange:      isCurrency ? "FX" : "Index",
        currency:      isCurrency ? "KRW" : "USD",
        price,
        change:        price - prev,
        changePercent: prev > 0 ? ((price - prev) / prev) * 100 : 0,
        open:          meta.regularMarketOpen    != null ? Number(meta.regularMarketOpen)    : null,
        high:          meta.regularMarketDayHigh != null ? Number(meta.regularMarketDayHigh) : null,
        low:           meta.regularMarketDayLow  != null ? Number(meta.regularMarketDayLow)  : null,
        volume:        meta.regularMarketVolume  != null ? Number(meta.regularMarketVolume)  : null,
        week52High:    meta.fiftyTwoWeekHigh     != null ? Number(meta.fiftyTwoWeekHigh)     : null,
        week52Low:     meta.fiftyTwoWeekLow      != null ? Number(meta.fiftyTwoWeekLow)      : null,
        pe:            null, marketCap: null, avgVolume: null,
        dividendYield: null, beta: null, eps: null,
      });
    }

    // ── 0-b) USDKRW: er-api fallback when Yahoo Finance fails ───────────────
    if (rawSymbol === "USDKRW") {
      const er = await fetchErApiUSDKRW();
      if (er) {
        const chg = er.price - er.prevPrice;
        return saveAndRespond("USDKRW", {
          symbol: "USDKRW", name: "USD/KRW", exchange: "FX", currency: "KRW",
          price:         er.price,
          change:        chg,
          changePercent: er.prevPrice > 0 ? (chg / er.prevPrice) * 100 : 0,
          open: null, high: null, low: null, volume: null,
          week52High: null, week52Low: null,
          pe: null, marketCap: null, avgVolume: null,
          dividendYield: null, beta: null, eps: null,
        });
      }
    }

    // ── 1) Finnhub ETF proxy for major indices (SPX/COMP/DJI) — fallback ─
    // When market is closed Finnhub returns c=0; fall back to pc (prev close)
    const idxMeta = INDEX_ETF[rawSymbol];
    if (idxMeta) {
      const etfQ = await fetchFinnhubRawQuote(idxMeta.etf);
      const etfPrice = etfQ?.c && etfQ.c > 0 ? etfQ.c : etfQ?.pc;
      if (etfQ && etfPrice && etfPrice > 0) {
        const f        = idxMeta.factor;
        const isLive   = etfQ.c > 0;
        const price    = etfPrice * f;
        const change   = isLive ? etfQ.d  * f : 0;
        const changePct = isLive ? etfQ.dp    : 0;
        return saveAndRespond(rawSymbol, {
          symbol:        rawSymbol,
          name:          idxMeta.name,
          exchange:      idxMeta.exchange,
          currency:      "USD",
          price,
          change,
          changePercent: changePct,
          open:          isLive && etfQ.o ? etfQ.o * f : null,
          high:          isLive && etfQ.h ? etfQ.h * f : null,
          low:           isLive && etfQ.l ? etfQ.l * f : null,
          volume:        null,
          week52High:    null,
          week52Low:     null,
          pe:            null,
          marketCap:     null,
          avgVolume:     null,
          dividendYield: null,
          beta:          null,
          eps:           null,
        });
      }
    }

    // ── 2) Finnhub path: regular US stocks ──────────────────────────────
    if (!isIndexOrFuture) {
      const [rawQ, profile, metrics] = await Promise.all([
        fetchFinnhubRawQuote(rawSymbol),
        fetchFinnhubProfile(rawSymbol),
        fetchFinnhubMetrics(rawSymbol),
      ]);

      if (rawQ && rawQ.c > 0) {
        return saveAndRespond(rawSymbol, {
          symbol:        rawSymbol,
          name:          profile?.name        ?? rawSymbol,
          exchange:      profile?.exchange    ?? "US",
          currency:      profile?.currency    ?? "USD",
          price:         rawQ.c,
          change:        rawQ.d,
          changePercent: rawQ.dp,
          open:          rawQ.o  || null,
          high:          rawQ.h  || null,
          low:           rawQ.l  || null,
          volume:        null,
          week52High:    metrics?.week52High    ?? null,
          week52Low:     metrics?.week52Low     ?? null,
          pe:            metrics?.pe            ?? null,
          marketCap:     metrics?.marketCap != null ? metrics.marketCap * 1_000_000 : null,
          avgVolume:     null,
          dividendYield: metrics?.dividendYield ?? null,
          beta:          metrics?.beta          ?? null,
          eps:           metrics?.eps           ?? null,
        });
      }
    }

    // ── 2) Yahoo Finance v7 quote — primary fallback for price data ──────
    const [v7q, v8] = await Promise.all([
      fetchV7Quote(yahooSymbol),
      fetchV8Meta(yahooSymbol),
    ]);

    if (v7q) {
      const prev = Number(v7q.regularMarketPreviousClose ?? v7q.regularMarketPrice ?? 0);
      const cur  = Number(v7q.regularMarketPrice ?? 0);
      return saveAndRespond(rawSymbol, {
        symbol:        rawSymbol,
        name:          String(v7q.longName ?? v7q.shortName ?? rawSymbol),
        exchange:      String(v7q.fullExchangeName ?? v7q.exchange ?? "US"),
        currency:      String(v7q.currency ?? "USD"),
        price:         cur,
        change:        Number(v7q.regularMarketChange ?? cur - prev),
        changePercent: Number(v7q.regularMarketChangePercent ?? (prev > 0 ? ((cur - prev) / prev) * 100 : 0)),
        open:          v7q.regularMarketOpen          != null ? Number(v7q.regularMarketOpen)          : null,
        high:          v7q.regularMarketDayHigh       != null ? Number(v7q.regularMarketDayHigh)       : null,
        low:           v7q.regularMarketDayLow        != null ? Number(v7q.regularMarketDayLow)        : null,
        volume:        v7q.regularMarketVolume        != null ? Number(v7q.regularMarketVolume)        : null,
        week52High:    v7q.fiftyTwoWeekHigh           != null ? Number(v7q.fiftyTwoWeekHigh)           : null,
        week52Low:     v7q.fiftyTwoWeekLow            != null ? Number(v7q.fiftyTwoWeekLow)            : null,
        pe:            v7q.trailingPE                 != null ? Number(v7q.trailingPE)                 : null,
        marketCap:     v7q.marketCap                  != null ? Number(v7q.marketCap)                  : null,
        avgVolume:     v7q.averageDailyVolume3Month   != null ? Number(v7q.averageDailyVolume3Month)   : null,
        dividendYield: v7q.trailingAnnualDividendYield != null ? Number(v7q.trailingAnnualDividendYield) : null,
        beta:          v7q.beta                       != null ? Number(v7q.beta)                       : null,
        eps:           v7q.epsTrailingTwelveMonths    != null ? Number(v7q.epsTrailingTwelveMonths)    : null,
      });
    }

    // ── 3) Yahoo Finance v8 chart meta — last resort ─────────────────────
    if (!v8) {
      return NextResponse.json({ error: "not found" }, { status: 404, headers: { "Cache-Control": "no-store" } });
    }

    const { meta } = v8;
    const cur  = Number(meta.regularMarketPrice ?? 0);
    const prev = Number(meta.chartPreviousClose ?? meta.regularMarketPreviousClose ?? cur);

    return saveAndRespond(rawSymbol, {
      symbol:        String(meta.symbol    ?? rawSymbol),
      name:          String(meta.longName  ?? meta.shortName ?? rawSymbol),
      exchange:      String(meta.fullExchangeName ?? meta.exchangeName ?? ""),
      currency:      String(meta.currency  ?? "USD"),
      price:         cur,
      change:        cur - prev,
      changePercent: prev > 0 ? ((cur - prev) / prev) * 100 : 0,
      open:          meta.regularMarketOpen    != null ? Number(meta.regularMarketOpen)    : null,
      high:          meta.regularMarketDayHigh != null ? Number(meta.regularMarketDayHigh) : null,
      low:           meta.regularMarketDayLow  != null ? Number(meta.regularMarketDayLow)  : null,
      volume:        meta.regularMarketVolume  != null ? Number(meta.regularMarketVolume)  : null,
      week52High:    meta.fiftyTwoWeekHigh     != null ? Number(meta.fiftyTwoWeekHigh)     : null,
      week52Low:     meta.fiftyTwoWeekLow      != null ? Number(meta.fiftyTwoWeekLow)      : null,
      pe:            null,
      marketCap:     null,
      avgVolume:     null,
      dividendYield: null,
      beta:          null,
      eps:           null,
    });
  } catch (e) {
    console.error("[stock-detail]", rawSymbol, e);
    return NextResponse.json({ error: "fetch failed" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
