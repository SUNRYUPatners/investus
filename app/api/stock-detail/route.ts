import { NextRequest, NextResponse } from "next/server";
import { toYahoo } from "@/lib/symbolMap";
import {
  fetchFinnhubRawQuote,
  fetchFinnhubProfile,
  fetchFinnhubMetrics,
} from "@/lib/finnhub";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const YF_HOSTS = [
  "https://query1.finance.yahoo.com",
  "https://query2.finance.yahoo.com",
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
          next: { revalidate: 60 },
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
        next: { revalidate: 60 },
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

  try {
    // ── 1) Finnhub path: regular US stocks ──────────────────────────────
    if (!isIndexOrFuture) {
      const [rawQ, profile, metrics] = await Promise.all([
        fetchFinnhubRawQuote(rawSymbol),
        fetchFinnhubProfile(rawSymbol),
        fetchFinnhubMetrics(rawSymbol),
      ]);

      if (rawQ && rawQ.c > 0) {
        return NextResponse.json({
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
      return NextResponse.json({
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
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const { meta } = v8;
    const cur  = Number(meta.regularMarketPrice ?? 0);
    const prev = Number(meta.chartPreviousClose ?? meta.regularMarketPreviousClose ?? cur);

    return NextResponse.json({
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
    return NextResponse.json({ error: "fetch failed" }, { status: 503 });
  }
}
