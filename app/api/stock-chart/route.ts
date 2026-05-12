import { NextRequest, NextResponse } from "next/server";
import { mockQuotes } from "@/lib/api";
import { toYahoo } from "@/lib/symbolMap";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ── Period config ─────────────────────────────────────────────────────────

type PeriodCfg = {
  tdInterval:  string;   // Twelve Data interval
  tdOutputSize: number;  // Twelve Data outputsize
  yhInterval:  string;   // Yahoo Finance interval
  yhRange:     string;   // Yahoo Finance range
};

const PERIOD_CFG: Record<string, PeriodCfg> = {
  "1D":  { tdInterval: "5min",   tdOutputSize: 78,  yhInterval: "5m",  yhRange: "1d"  },
  "1M":  { tdInterval: "1day",   tdOutputSize: 30,  yhInterval: "1d",  yhRange: "1mo" },
  "YTD": { tdInterval: "1day",   tdOutputSize: 365, yhInterval: "1d",  yhRange: "ytd" },
  "3Y":  { tdInterval: "1week",  tdOutputSize: 156, yhInterval: "1wk", yhRange: "3y"  },
  "5Y":  { tdInterval: "1week",  tdOutputSize: 260, yhInterval: "1wk", yhRange: "5y"  },
  "10Y": { tdInterval: "1month", tdOutputSize: 120, yhInterval: "1mo", yhRange: "10y" },
};

// ── Mock fallback ─────────────────────────────────────────────────────────

function mockChart(symbol: string, period: string) {
  const q    = mockQuotes.find((m) => m.symbol === symbol);
  const base = q ? q.price - q.change : 100;
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
      return Math.max(s0 + (sN - s0) * t + Math.sin(i * 2.7) * 0.008 * (s0 + (sN - s0) * t), 1);
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

// ── Twelve Data ───────────────────────────────────────────────────────────

async function fetchTwelveData(symbol: string, period: string) {
  const apiKey = process.env.TWELVEDATA_API_KEY;
  if (!apiKey) return null;

  const cfg = PERIOD_CFG[period] ?? PERIOD_CFG["1D"];
  const url =
    `https://api.twelvedata.com/time_series` +
    `?symbol=${encodeURIComponent(symbol)}` +
    `&interval=${cfg.tdInterval}` +
    `&outputsize=${cfg.tdOutputSize}` +
    `&apikey=${apiKey}`;

  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status === "error" || !json.values?.length) return null;

    // Twelve Data returns newest first — reverse to oldest-first
    const values: { datetime: string; close: string; volume?: string }[] =
      [...json.values].reverse();

    const points = values.map((v) => ({
      ts:     Math.floor(new Date(v.datetime).getTime() / 1000),
      close:  parseFloat(v.close),
      volume: v.volume ? parseInt(v.volume) : 0,
    })).filter((p) => !isNaN(p.close));

    if (points.length === 0) return null;

    return {
      symbol,
      currency:           json.meta?.currency ?? "USD",
      exchangeName:       json.meta?.exchange  ?? "",
      chartPreviousClose: points[0].close,
      regularMarketPrice: points[points.length - 1].close,
      points,
    };
  } catch { return null; }
}

// ── Yahoo Finance v8 chart ────────────────────────────────────────────────

async function fetchYahooChart(yahooSymbol: string, period: string) {
  const cfg = PERIOD_CFG[period] ?? PERIOD_CFG["1D"];
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}` +
    `?interval=${cfg.yhInterval}&range=${cfg.yhRange}&includePrePost=false`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (!res.ok) return null;

    const json   = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const timestamps: number[]       = result.timestamp ?? [];
    const q                          = result.indicators?.quote?.[0] ?? {};
    const closes: (number | null)[]  = q.close  ?? [];
    const volumes: (number | null)[] = q.volume ?? [];

    const points = timestamps
      .map((ts, i) => ({ ts, close: closes[i], volume: volumes[i] ?? 0 }))
      .filter((p): p is { ts: number; close: number; volume: number } => p.close != null);

    if (points.length === 0) return null;

    return {
      symbol:             result.meta?.symbol            ?? yahooSymbol,
      currency:           result.meta?.currency          ?? "USD",
      exchangeName:       result.meta?.exchangeName      ?? "",
      chartPreviousClose: result.meta?.chartPreviousClose ?? null,
      regularMarketPrice: result.meta?.regularMarketPrice ?? null,
      points,
    };
  } catch { return null; }
}

// ── Main handler ──────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const rawSymbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const yahooSym  = toYahoo(rawSymbol);
  const period    = req.nextUrl.searchParams.get("period") ?? "1D";

  const isIndexOrFutures = yahooSym !== rawSymbol;

  try {
    // ── Regular US stocks: Twelve Data primary, Yahoo fallback ───────────
    if (!isIndexOrFutures) {
      const td = await fetchTwelveData(rawSymbol, period);
      if (td) return NextResponse.json(td);
    }

    // ── Yahoo Finance: indices, futures, or Twelve Data fallback ─────────
    const yahoo = await fetchYahooChart(yahooSym, period);
    if (yahoo) return NextResponse.json(yahoo);

    return NextResponse.json(mockChart(rawSymbol, period));
  } catch {
    return NextResponse.json(mockChart(rawSymbol, period));
  }
}
