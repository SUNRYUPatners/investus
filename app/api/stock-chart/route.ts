import { NextRequest, NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ── Yahoo Finance config (primary — no rate limit, no API key) ────────────
const YAHOO_CFG: Record<string, { interval: string; range: string }> = {
  "1D":  { interval: "2m",  range: "1d"  },
  "1W":  { interval: "1h",  range: "5d"  },
  "1M":  { interval: "1d",  range: "1mo" },
  "3M":  { interval: "1d",  range: "3mo" },
  "1Y":  { interval: "1wk", range: "1y"  },
  "5Y":  { interval: "1mo", range: "5y"  },
  "10Y": { interval: "1mo", range: "10y" },
  "ALL": { interval: "1mo", range: "max" },
};

// ── Finnhub config (secondary — rate limited 60/min free tier) ────────────
const FINNHUB_CFG: Record<string, { resolution: string; daysBack: number }> = {
  "1D": { resolution: "5",  daysBack: 1    },
  "1W": { resolution: "60", daysBack: 7    },
  "1M": { resolution: "D",  daysBack: 30   },
  "3M": { resolution: "D",  daysBack: 90   },
  "1Y": { resolution: "W",  daysBack: 365  },
  "5Y": { resolution: "M",  daysBack: 1825 },
};

type ChartResult = {
  symbol: string;
  chartPreviousClose: number | null;
  regularMarketPrice: number | null;
  points: { ts: number; close: number; volume: number }[];
};

// ── Yahoo Finance (tries query1 + query2 for reliability) ─────────────────
async function fetchYahoo(symbol: string, period: string): Promise<ChartResult | null> {
  const cfg = YAHOO_CFG[period];
  if (!cfg) return null;

  const revalidate = period === "10Y" || period === "ALL" ? 3600 : 60;

  for (const host of ["query1", "query2"]) {
    try {
      const url =
        `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
        `?interval=${cfg.interval}&range=${cfg.range}&includePrePost=false`;

      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "application/json" },
        next: { revalidate },
      });
      if (!res.ok) continue;

      const json   = await res.json();
      const result = json?.chart?.result?.[0];
      if (!result) continue;

      const timestamps: number[]       = result.timestamp ?? [];
      const q                          = result.indicators?.quote?.[0] ?? {};
      const closes: (number | null)[]  = q.close  ?? [];
      const volumes: (number | null)[] = q.volume ?? [];

      const points = timestamps
        .map((ts, i) => ({ ts, close: closes[i], volume: volumes[i] ?? 0 }))
        .filter((p): p is { ts: number; close: number; volume: number } => p.close != null);

      if (points.length === 0) continue;

      return {
        symbol,
        chartPreviousClose: result.meta?.chartPreviousClose ?? points[0]?.close ?? null,
        regularMarketPrice: result.meta?.regularMarketPrice ?? points[points.length - 1]?.close ?? null,
        points,
      };
    } catch { continue; }
  }
  return null;
}

// ── Finnhub (fallback only — avoids consuming rate limit budget) ──────────
async function fetchFinnhub(symbol: string, period: string): Promise<ChartResult | null> {
  const token = process.env.FINNHUB_API_KEY ?? "";
  if (!token) return null;

  const cfg = FINNHUB_CFG[period];
  if (!cfg) return null;

  const to = Math.floor(Date.now() / 1000);
  let from: number;

  if (period === "1D") {
    const est = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    est.setHours(9, 30, 0, 0);
    from = Math.floor(est.getTime() / 1000);
    if (from > to) from = to - 86400;
  } else {
    from = to - cfg.daysBack * 86400;
  }

  const url =
    `https://finnhub.io/api/v1/stock/candle` +
    `?symbol=${encodeURIComponent(symbol)}` +
    `&resolution=${cfg.resolution}` +
    `&from=${from}&to=${to}` +
    `&token=${token}`;

  try {
    const res  = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.s !== "ok" || !Array.isArray(json.t) || json.t.length === 0) return null;

    const points = (json.t as number[]).map((ts: number, i: number) => ({
      ts,
      close:  Math.round((json.c[i] as number) * 100) / 100,
      volume: (json.v?.[i] as number) ?? 0,
    }));

    return {
      symbol,
      chartPreviousClose: (json.o?.[0] as number | undefined) ?? points[0]?.close ?? null,
      regularMarketPrice: points[points.length - 1]?.close ?? null,
      points,
    };
  } catch { return null; }
}

// ── Slice to last trading day (for 1D fallback from 5D data) ─────────────
function sliceLastTradingDay(result: ChartResult): ChartResult {
  if (result.points.length === 0) return result;
  const pts      = result.points;
  const lastTs   = pts[pts.length - 1].ts;
  // Find the first point of the same calendar day (UTC) as the last point
  const lastDay  = Math.floor(lastTs / 86400) * 86400;
  const dayPts   = pts.filter((p) => p.ts >= lastDay);
  return { ...result, points: dayPts.length > 0 ? dayPts : pts };
}

// ── Handler ───────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const period = req.nextUrl.searchParams.get("period") ?? "1D";

  // 10Y / ALL → Yahoo only (long-term history)
  if (period === "10Y" || period === "ALL") {
    const yahoo = await fetchYahoo(symbol, period);
    if (yahoo) return NextResponse.json(yahoo);
    return NextResponse.json({ error: "no data" }, { status: 503 });
  }

  // 1D ~ 5Y → Yahoo primary, Finnhub secondary
  // Using Yahoo first prevents burning Finnhub's 60/min quota on charts
  const yahoo = await fetchYahoo(symbol, period);
  if (yahoo) return NextResponse.json(yahoo);

  // Yahoo failed → try Finnhub
  const finnhub = await fetchFinnhub(symbol, period);
  if (finnhub) return NextResponse.json(finnhub);

  // Both failed for 1D → try Yahoo 5D and slice last trading day
  // Handles: market closed today, weekend, pre-market, etc.
  if (period === "1D") {
    const yahoo5d = await fetchYahoo(symbol, "1W");
    if (yahoo5d) return NextResponse.json(sliceLastTradingDay(yahoo5d));
  }

  return NextResponse.json({ error: "no data" }, { status: 503 });
}
