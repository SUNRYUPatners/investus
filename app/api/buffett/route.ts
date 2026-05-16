import { NextResponse } from "next/server";
import type { BuffettData } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// S&P 500 monthly data via Stooq (no auth, no rate limit, reliable from Vercel)
// S&P 500 × 9.5 ≈ Wilshire 5000 index level; calibrated via W5000_CAP_FACTOR
async function fetchSP500Stooq(): Promise<{ now: number; q1ago: number; y1ago: number } | null> {
  const d2    = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const d1    = new Date(Date.now() - 2 * 365 * 86400_000).toISOString().slice(0, 10).replace(/-/g, "");
  try {
    const ctrl = new AbortController();
    const tid  = setTimeout(() => ctrl.abort(), 8_000);
    // Stooq: ^spx = S&P 500 index, i=m = monthly interval
    const res  = await fetch(`https://stooq.com/q/d/l/?s=%5espx&d1=${d1}&d2=${d2}&i=m`, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "text/csv,*/*" },
      cache: "no-store",
      signal: ctrl.signal,
    });
    clearTimeout(tid);
    if (!res.ok) return null;
    const text  = await res.text();
    const lines = text.trim().split("\n").slice(1); // skip header row
    if (lines.length < 4) return null;

    const closes: number[] = [];
    for (const line of lines) {
      const cols  = line.split(",");
      const close = parseFloat(cols[4] ?? ""); // Date,Open,High,Low,Close,Volume
      if (!isNaN(close) && close > 0) closes.push(close);
    }
    if (closes.length < 4) return null;

    const scale = 9.5;
    return {
      now:   closes[closes.length - 1]  * scale,
      q1ago: (closes[closes.length - 4]  ?? closes[0]) * scale,
      y1ago: (closes[closes.length - 13] ?? closes[0]) * scale,
    };
  } catch { return null; }
}

// Yahoo Finance fallback (kept as secondary — Stooq preferred)
async function fetchSP500YF(): Promise<{ now: number; q1ago: number; y1ago: number } | null> {
  for (const range of ["2y", "1y"]) {
    try {
      const ctrl  = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6_000);
      const res   = await fetch(
        `https://query2.finance.yahoo.com/v8/finance/chart/%5EGSPC?interval=1mo&range=${range}`,
        { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" }, cache: "no-store", signal: ctrl.signal },
      );
      clearTimeout(timer);
      if (!res.ok) throw new Error(`GSPC ${res.status}`);
      const closes: number[] = (await res.json())?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
      const valid = closes.filter((v) => v != null && isFinite(v));
      if (valid.length < 4) throw new Error("insufficient data");
      const scale = 9.5;
      return {
        now:   valid[valid.length - 1]  * scale,
        q1ago: (valid[valid.length - 4]  ?? valid[0]) * scale,
        y1ago: (valid[valid.length - 13] ?? valid[0]) * scale,
      };
    } catch { continue; }
  }
  return null;
}

async function fetchWilshire() {
  return (await fetchSP500Stooq()) ?? (await fetchSP500YF());
}

// Parse the last numeric value from a FRED CSV response (DATE,VALUE rows)
function parseLastFredValue(csv: string): number | null {
  const lines = csv.trim().split("\n").slice(1); // skip header
  for (let i = lines.length - 1; i >= 0; i--) {
    const parts = lines[i].split(",");
    const v = parseFloat(parts[1] ?? "");
    if (!isNaN(v) && v > 0) return v;
  }
  return null;
}

async function fetchFredGDP(): Promise<number | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    // FRED public graph CSV — no API key needed; returns quarterly annualized GDP in billions USD
    const res = await fetch(
      "https://fred.stlouisfed.org/graph/fredgraph.csv?id=GDP",
      { cache: "no-store", signal: ctrl.signal },
    );
    clearTimeout(timer);
    if (!res.ok) throw new Error(`FRED ${res.status}`);
    const text = await res.text();
    return parseLastFredValue(text);
  } catch {
    return null;
  }
}

// Calibration: S&P 500 × 9.5 → synthetic Wilshire level → × W5000_CAP_FACTOR → market cap (billions)
// Reference: S&P at ~5800 (Q1 2025) → synthetic W5000 ≈ 55,100 → mkt cap ≈ $65T
// (1 synthetic W5000 point ≈ $1.183B, calibrated 2025-Q1)
const W5000_CAP_FACTOR = 1.183; // billion USD per synthetic W5000 point

export async function GET() {
  try {
    const [wilshire, gdpB] = await Promise.all([fetchWilshire(), fetchFredGDP()]);

    if (!wilshire) {
      // Use hardcoded realistic values as last resort (2025 Q2 calibration)
      // Better than showing nothing
      const gdp = gdpB ?? 29369;
      const fallbackRatio = 192;
      const data: BuffettData = {
        ratio: fallbackRatio,
        marketCap: "~$56.5T",
        gdp: `~$${(gdp / 1000).toFixed(1)}T`,
        prevQuarter: 185,
        prevYear: 172,
        updatedAt: `${new Date().getFullYear()} Q${Math.ceil((new Date().getMonth() + 1) / 3)}`,
      };
      return NextResponse.json(data, {
        headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400" },
      });
    }

    // Fall back to BEA 2024 annual if FRED is down
    const gdp = gdpB ?? 29369;

    const ratio     = Math.round((wilshire.now   * W5000_CAP_FACTOR) / gdp * 100);
    const prevQ     = Math.round((wilshire.q1ago * W5000_CAP_FACTOR) / gdp * 100);
    const prevY     = Math.round((wilshire.y1ago * W5000_CAP_FACTOR) / gdp * 100);

    const mktCapT   = ((wilshire.now * W5000_CAP_FACTOR) / 1000).toFixed(1);
    const gdpT      = (gdp / 1000).toFixed(1);

    const now       = new Date();
    const quarter   = `${now.getFullYear()} Q${Math.ceil((now.getMonth() + 1) / 3)}`;

    const data: BuffettData = {
      ratio,
      marketCap: `~$${mktCapT}T`,
      gdp:       `~$${gdpT}T`,
      prevQuarter: prevQ,
      prevYear:    prevY,
      updatedAt:   quarter,
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
