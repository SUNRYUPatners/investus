import { NextRequest, NextResponse } from "next/server";
import { isMarketOpen } from "@/lib/marketHours";

// ── Server-side in-memory cache ───────────────────────────────────────────
// 장 마감 중: 무기한 캐시 / 장 중: TTL 기반 갱신
type ChartResult = {
  symbol: string;
  chartPreviousClose: number | null;
  regularMarketPrice: number | null;
  points: { ts: number; close: number; volume: number }[];
};
const _cache = new Map<string, { data: ChartResult; at: number }>();
const LIVE_TTL: Record<string, number> = {
  "1D": 60_000, "YTD": 300_000,
  "1Y": 600_000, "5Y": 600_000, "10Y": 3_600_000, "ALL": 3_600_000,
};

// ── TwelveData (primary — no IP block, 800 free calls/day) ───────────────
// Sign up free at https://twelvedata.com/ and set TWELVEDATA_API_KEY in Vercel
const TWELVE_CFG: Record<string, { interval: string; outputsize: number }> = {
  "1D":  { interval: "5min",   outputsize: 80  },
  "1Y":  { interval: "1week",  outputsize: 53  },
  "5Y":  { interval: "1month", outputsize: 60  },
  "10Y": { interval: "1month", outputsize: 120 },
  "ALL": { interval: "1month", outputsize: 500 },
};

function parseNYTime(datetimeStr: string): number {
  // TwelveData datetime is in exchange timezone (New York for US stocks)
  const isIntraday = datetimeStr.includes(" ");
  const str = isIntraday ? datetimeStr : datetimeStr + " 16:00:00";
  const asUTC = new Date(str.replace(" ", "T") + "Z"); // parse as if UTC first
  const month = asUTC.getUTCMonth() + 1;
  const offset = (month >= 3 && month <= 11) ? 4 : 5; // EDT=4h, EST=5h
  return Math.floor(asUTC.getTime() / 1000) + offset * 3600; // shift to real UTC
}

async function fetchTwelveData(symbol: string, period: string): Promise<ChartResult | null> {
  const apiKey = process.env.TWELVEDATA_API_KEY;
  if (!apiKey) return null;

  // YTD: use start_date instead of outputsize
  let url: string;
  if (period === "YTD") {
    const year = new Date().getFullYear();
    url =
      `https://api.twelvedata.com/time_series` +
      `?symbol=${encodeURIComponent(symbol)}` +
      `&interval=1day` +
      `&start_date=${year}-01-01` +
      `&apikey=${apiKey}`;
  } else {
    const cfg = TWELVE_CFG[period];
    if (!cfg) return null;
    url =
      `https://api.twelvedata.com/time_series` +
      `?symbol=${encodeURIComponent(symbol)}` +
      `&interval=${cfg.interval}` +
      `&outputsize=${cfg.outputsize}` +
      `&apikey=${apiKey}`;
  }

  try {
    const res = await fetch(url); // plain fetch, no caching — use our own cache
    if (!res.ok) return null;
    const json = await res.json();
    if (json.status !== "ok" || !Array.isArray(json.values) || json.values.length === 0) return null;

    // TwelveData returns newest-first → reverse to oldest-first
    const values = [...json.values].reverse();
    const points = values
      .map((v: { datetime: string; close: string; volume?: string }) => ({
        ts:     parseNYTime(v.datetime),
        close:  parseFloat(v.close),
        volume: parseInt(v.volume ?? "0") || 0,
      }))
      .filter((p) => !isNaN(p.close) && p.ts > 0);

    if (points.length === 0) return null;

    return {
      symbol,
      chartPreviousClose: points[0].close,
      regularMarketPrice: points[points.length - 1].close,
      points,
    };
  } catch { return null; }
}

// ── Finnhub quote → minimal 1D chart (fallback when TwelveData unavailable) ─
// Uses the working /quote endpoint (free plan) to build a real-price 3-point chart
async function fetchFinnhubMinimalChart(symbol: string): Promise<ChartResult | null> {
  const token = process.env.FINNHUB_API_KEY ?? "";
  if (!token) return null;

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${token}`,
    );
    if (!res.ok) return null;
    const q = await res.json();
    if (!q.c || q.c <= 0) return null;

    // Build real 3-point 1D chart from real Finnhub data
    const now = Math.floor(Date.now() / 1000);
    const est = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    est.setHours(9, 30, 0, 0);
    const openTs = Math.floor(est.getTime() / 1000);

    return {
      symbol,
      chartPreviousClose: q.pc ?? null,
      regularMarketPrice: q.c,
      points: [
        { ts: openTs - 86400, close: q.pc || q.c, volume: 0 }, // prev close
        { ts: openTs,         close: q.o  || q.c, volume: 0 }, // today open
        { ts: now,            close: q.c,          volume: 0 }, // current price
      ],
    };
  } catch { return null; }
}

// ── Handler ───────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const period = req.nextUrl.searchParams.get("period") ?? "1D";

  const cKey   = `${symbol}-${period}`;
  const cached = _cache.get(cKey);
  const open   = isMarketOpen();
  const ttl    = LIVE_TTL[period] ?? 60_000;

  // 장 마감 중: 1D 차트는 전날 종가로 충분 → 캐시 무기한
  // 장 중 + 장기 차트(YTD 이상): TTL 기반 갱신
  if (cached && (!open && period === "1D" || Date.now() - cached.at < ttl)) {
    return NextResponse.json(cached.data);
  }

  // 1. TwelveData (primary — reliable, not blocked)
  const twelve = await fetchTwelveData(symbol, period);
  if (twelve) {
    _cache.set(cKey, { data: twelve, at: Date.now() });
    return NextResponse.json(twelve);
  }

  // 2. Finnhub minimal chart (only for 1D, uses free /quote endpoint)
  if (period === "1D") {
    const minimal = await fetchFinnhubMinimalChart(symbol);
    if (minimal) {
      _cache.set(cKey, { data: minimal, at: Date.now() });
      return NextResponse.json(minimal);
    }
  }

  // 3. Return stale cache rather than 503
  if (cached) return NextResponse.json(cached.data);

  return NextResponse.json({ error: "no data" }, { status: 503 });
}
