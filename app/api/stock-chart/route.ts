import { NextRequest, NextResponse } from "next/server";
import { mockQuotes } from "@/lib/api";
import { toYahoo } from "@/lib/symbolMap";
import { fetchFinnhubCandles } from "@/lib/finnhub";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ── Period config ─────────────────────────────────────────────────────────

type PeriodCfg = {
  interval: string;  // Yahoo Finance interval
  range:    string;  // Yahoo Finance range
  fhRes:    string;  // Finnhub resolution
  daysBack: number;  // seconds back from now
};

const PERIOD_CFG: Record<string, PeriodCfg> = {
  "1D":  { interval: "5m",  range: "1d",  fhRes: "5",  daysBack: 1   * 86400 },
  "1M":  { interval: "1d",  range: "1mo", fhRes: "D",  daysBack: 30  * 86400 },
  "YTD": { interval: "1d",  range: "ytd", fhRes: "D",  daysBack: 365 * 86400 },
  "3Y":  { interval: "1wk", range: "3y",  fhRes: "W",  daysBack: 3   * 365 * 86400 },
  "5Y":  { interval: "1wk", range: "5y",  fhRes: "W",  daysBack: 5   * 365 * 86400 },
  "10Y": { interval: "1mo", range: "10y", fhRes: "M",  daysBack: 10  * 365 * 86400 },
};

// ── Mock fallback ─────────────────────────────────────────────────────────

function mockChart(symbol: string, period: string) {
  const q     = mockQuotes.find((m) => m.symbol === symbol);
  const base  = q ? q.price - q.change : 100;
  const spark = q?.sparkline ?? [];

  const counts: Record<string, number> = {
    "1D": 78, "1M": 22, "YTD": (new Date().getMonth() + 1) * 21,
    "3Y": 156, "5Y": 260, "10Y": 120,
  };
  const count = counts[period] ?? 78;

  let prices: number[];
  if (spark.length >= 2) {
    const s0 = spark[0], sN = spark[spark.length - 1];
    prices = Array.from({ length: count }, (_, i) => {
      const t = i / (count - 1);
      const trend = s0 + (sN - s0) * t;
      return Math.max(trend + Math.sin(i * 2.7) * 0.008 * trend, 1);
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
  const points  = prices.map((close, i) => ({
    ts:     now - (count - 1 - i) * stepSec,
    close:  Math.round(close * 100) / 100,
    volume: Math.round(50_000_000 * (0.5 + Math.random())),
  }));

  return {
    symbol, currency: "USD", exchangeName: "NMS",
    chartPreviousClose: prices[0] ?? base,
    regularMarketPrice: prices[prices.length - 1] ?? base,
    points, _mock: true,
  };
}

// ── Yahoo Finance v8 chart ────────────────────────────────────────────────

async function fetchYahooChart(yahooSymbol: string, period: string) {
  const cfg = PERIOD_CFG[period] ?? PERIOD_CFG["1D"];
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}` +
    `?interval=${cfg.interval}&range=${cfg.range}&includePrePost=false`;

  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
  });
  if (!res.ok) return null;

  const json   = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) return null;

  const timestamps: number[]        = result.timestamp ?? [];
  const q                           = result.indicators?.quote?.[0] ?? {};
  const closes: (number | null)[]   = q.close  ?? [];
  const volumes: (number | null)[]  = q.volume ?? [];

  const points = timestamps
    .map((ts, i) => ({ ts, close: closes[i], volume: volumes[i] ?? 0 }))
    .filter((p): p is { ts: number; close: number; volume: number } => p.close != null);

  if (points.length === 0) return null;

  return {
    symbol:             result.meta?.symbol ?? yahooSymbol,
    currency:           result.meta?.currency ?? "USD",
    exchangeName:       result.meta?.exchangeName ?? "",
    chartPreviousClose: result.meta?.chartPreviousClose ?? null,
    regularMarketPrice: result.meta?.regularMarketPrice ?? null,
    points,
  };
}

// ── Main handler ──────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const rawSymbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const yahooSym  = toYahoo(rawSymbol);
  const period    = req.nextUrl.searchParams.get("period") ?? "1D";
  const cfg       = PERIOD_CFG[period] ?? PERIOD_CFG["1D"];

  // Futures/indices: go straight to Yahoo Finance
  const isIndexOrFutures = yahooSym !== rawSymbol;

  try {
    // ── Finnhub candles: regular US stocks ───────────────────────────────
    if (!isIndexOrFutures) {
      const now  = Math.floor(Date.now() / 1000);
      const from = now - cfg.daysBack;
      const candles = await fetchFinnhubCandles(rawSymbol, cfg.fhRes, from, now);
      if (candles && candles.length > 0) {
        return NextResponse.json({
          symbol:             rawSymbol,
          currency:           "USD",
          exchangeName:       "NMS",
          chartPreviousClose: candles[0].close,
          regularMarketPrice: candles[candles.length - 1].close,
          points: candles,
        });
      }
    }

    // ── Yahoo Finance: indices, futures, or Finnhub fallback ─────────────
    const yahoo = await fetchYahooChart(yahooSym, period);
    if (yahoo) return NextResponse.json(yahoo);

    return NextResponse.json(mockChart(rawSymbol, period));
  } catch {
    return NextResponse.json(mockChart(rawSymbol, period));
  }
}
