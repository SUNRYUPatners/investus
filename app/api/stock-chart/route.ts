import { NextRequest, NextResponse } from "next/server";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ── Server-side in-memory cache (same pattern as market-data route) ───────
type ChartResult = {
  symbol: string;
  chartPreviousClose: number | null;
  regularMarketPrice: number | null;
  points: { ts: number; close: number; volume: number }[];
};

const _cache = new Map<string, { data: ChartResult; at: number }>();
const TTL: Record<string, number> = {
  "1D": 60_000,
  "1W": 120_000,
  "1M": 300_000,
  "3M": 300_000,
  "1Y": 600_000,
  "5Y": 600_000,
  "10Y": 3_600_000,
  "ALL": 3_600_000,
};

// ── Yahoo Finance config ──────────────────────────────────────────────────
const YAHOO_CFG: Record<string, { interval: string; range: string }> = {
  "1D":  { interval: "5m",  range: "1d"  }, // same as stock-detail (works on Vercel)
  "1W":  { interval: "1h",  range: "5d"  },
  "1M":  { interval: "1d",  range: "1mo" },
  "3M":  { interval: "1d",  range: "3mo" },
  "1Y":  { interval: "1wk", range: "1y"  },
  "5Y":  { interval: "1mo", range: "5y"  },
  "10Y": { interval: "1mo", range: "10y" },
  "ALL": { interval: "1mo", range: "max" },
};

// ── Yahoo Finance — plain fetch (no next:revalidate, same as stock-detail) ─
async function fetchYahoo(symbol: string, period: string): Promise<ChartResult | null> {
  const cfg = YAHOO_CFG[period];
  if (!cfg) return null;

  // Try query1 then query2 (stock-detail uses query1 and works on Vercel)
  for (const host of ["query1", "query2"]) {
    try {
      const url =
        `https://${host}.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
        `?interval=${cfg.interval}&range=${cfg.range}&includePrePost=false`;

      // Plain fetch — no next:{revalidate} so Next.js doesn't interfere
      const res = await fetch(url, {
        headers: { "User-Agent": UA, Accept: "application/json" },
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

// ── Slice to last trading day (1D fallback from 5D) ───────────────────────
function sliceLastTradingDay(result: ChartResult): ChartResult {
  if (result.points.length === 0) return result;
  const pts    = result.points;
  const lastTs = pts[pts.length - 1].ts;
  const lastDay = Math.floor(lastTs / 86400) * 86400;
  const dayPts  = pts.filter((p) => p.ts >= lastDay);
  return { ...result, points: dayPts.length > 0 ? dayPts : pts };
}

// ── Handler ───────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const period = req.nextUrl.searchParams.get("period") ?? "1D";

  // Check server-side cache first
  const cKey    = `${symbol}-${period}`;
  const cached  = _cache.get(cKey);
  const ttl     = TTL[period] ?? 60_000;
  if (cached && Date.now() - cached.at < ttl) {
    return NextResponse.json(cached.data);
  }

  // Fetch from Yahoo Finance (plain fetch, same approach as stock-detail route)
  const yahoo = await fetchYahoo(symbol, period);
  if (yahoo) {
    _cache.set(cKey, { data: yahoo, at: Date.now() });
    return NextResponse.json(yahoo);
  }

  // 1D only: if Yahoo 1D failed, try Yahoo 5D and slice last trading day
  if (period === "1D") {
    const yahoo5d = await fetchYahoo(symbol, "1W");
    if (yahoo5d) {
      const sliced = sliceLastTradingDay(yahoo5d);
      _cache.set(cKey, { data: sliced, at: Date.now() });
      return NextResponse.json(sliced);
    }
  }

  // Return stale cache rather than 503 (better UX when API momentarily fails)
  if (cached) {
    return NextResponse.json(cached.data);
  }

  return NextResponse.json({ error: "no data" }, { status: 503 });
}
