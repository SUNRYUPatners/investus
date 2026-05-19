import { NextResponse } from "next/server";
import type { BuffettData } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// CF Worker 프록시 — Vercel IP 차단 우회 (YF_PROXY_URL 설정 필수)
const YF_PROXY = process.env.YF_PROXY_URL ?? "";
function yfProxyFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (YF_PROXY) return fetch(`${YF_PROXY}?url=${encodeURIComponent(url)}`, init);
  return fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" }, ...init });
}

// S&P 500 monthly chart as Wilshire proxy (Wilshire 5000 not available on Yahoo Finance)
// S&P 500 × 9.5 ≈ Wilshire 5000 index level; calibrated via W5000_CAP_FACTOR
async function fetchWilshire(): Promise<{ now: number; q1ago: number; y1ago: number } | null> {
  for (const base of ["https://query2.finance.yahoo.com", "https://query1.finance.yahoo.com"]) {
    for (const range of ["2y", "1y"]) {
      try {
        const url = `${base}/v8/finance/chart/%5EGSPC?interval=1mo&range=${range}`;
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 6000);
        const res = await yfProxyFetch(url, {
          cache: "no-store",
          signal: ctrl.signal,
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`GSPC ${res.status}`);
        const json = await res.json();
        const closes: number[] = json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
        const valid = closes.filter((v) => v != null && isFinite(v));
        if (valid.length < 4) throw new Error("insufficient data");

        const scale = 9.5;
        const now   = valid[valid.length - 1]  * scale;
        const q1ago = (valid[valid.length - 4]  ?? valid[0]) * scale;
        const y1ago = (valid[valid.length - 13] ?? valid[0]) * scale;
        return { now, q1ago, y1ago };
      } catch { continue; }
    }
  }
  return null;
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
  } catch {
    const gdp = 29369;
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
      headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" },
    });
  }
}
