import { NextRequest, NextResponse } from "next/server";
import { mockQuotes } from "@/lib/api";
import { toYahoo } from "@/lib/symbolMap";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const PERIOD_CFG: Record<string, { interval: string; range: string }> = {
  "1D":  { interval: "5m",  range: "1d"  },
  "1M":  { interval: "1d",  range: "1mo" },
  "YTD": { interval: "1d",  range: "ytd" },
  "3Y":  { interval: "1wk", range: "3y"  },
  "5Y":  { interval: "1wk", range: "5y"  },
  "10Y": { interval: "1mo", range: "10y" },
};

/** Generate mock chart points from a price series + random walk extension */
function mockChart(symbol: string, period: string) {
  const q     = mockQuotes.find((m) => m.symbol === symbol);
  const base  = q ? q.price - q.change : 100;
  const spark = q?.sparkline ?? [];

  // Use sparkline as-is for 1D, generate longer series for other periods
  let prices: number[];
  let count: number;

  if (period === "1D") {
    count = 78; // ~6.5 hours × 12 five-min bars
  } else if (period === "1M") {
    count = 22;
  } else if (period === "YTD") {
    count = Math.round((new Date().getMonth() + 1) * 21);
  } else if (period === "3Y") {
    count = 156;
  } else if (period === "5Y") {
    count = 260;
  } else {
    count = 120;
  }

  // Expand sparkline or generate random walk
  if (spark.length >= 2) {
    const startP = spark[0];
    const endP   = spark[spark.length - 1];
    prices = Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const trend = startP + (endP - startP) * t;
      const noise = (Math.sin(i * 2.7) * 0.008 + Math.cos(i * 1.3) * 0.005) * trend;
      return Math.max(trend + noise, 1);
    });
  } else {
    let p = base * 0.97;
    prices = Array.from({ length: count }, () => {
      p = p * (1 + (Math.random() - 0.48) * 0.008);
      return Math.max(p, 1);
    });
  }

  const now     = Math.floor(Date.now() / 1000);
  const stepSec = period === "1D" ? 300 : period === "1M" ? 86400 : 604800;
  const volBase = q ? 50_000_000 : 10_000_000;

  const points = prices.map((close, i) => ({
    ts:     now - (count - 1 - i) * stepSec,
    close:  Math.round(close * 100) / 100,
    volume: Math.round(volBase * (0.5 + Math.random())),
  }));

  return {
    symbol,
    currency:           "USD",
    exchangeName:       "NMS",
    chartPreviousClose: prices[0] ?? base,
    regularMarketPrice: prices[prices.length - 1] ?? base,
    points,
    _mock: true,
  };
}

export async function GET(req: NextRequest) {
  const rawSymbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const symbol    = toYahoo(rawSymbol);
  const period    = req.nextUrl.searchParams.get("period") ?? "1D";
  const cfg       = PERIOD_CFG[period] ?? PERIOD_CFG["1D"];

  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=${cfg.interval}&range=${cfg.range}&includePrePost=false`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) return NextResponse.json(mockChart(rawSymbol, period));

    const json    = await res.json();
    const result  = json?.chart?.result?.[0];
    if (!result)  return NextResponse.json(mockChart(rawSymbol, period));

    const timestamps: number[]        = result.timestamp ?? [];
    const q                           = result.indicators?.quote?.[0] ?? {};
    const closes: (number | null)[]   = q.close  ?? [];
    const volumes: (number | null)[]  = q.volume ?? [];

    const points = timestamps
      .map((ts, i) => ({ ts, close: closes[i], volume: volumes[i] ?? 0 }))
      .filter((p): p is { ts: number; close: number; volume: number } => p.close != null);

    if (points.length === 0) return NextResponse.json(mockChart(rawSymbol, period));

    return NextResponse.json({
      symbol:             result.meta?.symbol ?? symbol,
      currency:           result.meta?.currency ?? "USD",
      exchangeName:       result.meta?.exchangeName ?? "",
      chartPreviousClose: result.meta?.chartPreviousClose ?? null,
      regularMarketPrice: result.meta?.regularMarketPrice ?? null,
      points,
    });
  } catch {
    return NextResponse.json(mockChart(rawSymbol, period));
  }
}
