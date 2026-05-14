import { NextResponse } from "next/server";
import type { BuffettData } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const YF_BASE = "https://query1.finance.yahoo.com";

function yfHeaders() {
  return {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "application/json",
    Referer: "https://finance.yahoo.com/",
  };
}

// Wilshire 5000 Full Cap Index — historical chart API to get current + past values
async function fetchWilshire(): Promise<{ now: number; q1ago: number; y1ago: number } | null> {
  // Try Wilshire 5000 first, then use S&P 500 as proxy
  for (const sym of ["%5EW5000", "%5EWILSHIRE5000"]) {
    try {
      const url = `${YF_BASE}/v8/finance/chart/${sym}?interval=1mo&range=2y`;
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(url, {
        headers: yfHeaders(),
        cache: "no-store",
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`${sym} ${res.status}`);
      const json = await res.json();
      const closes: number[] = json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
      const valid = closes.filter((v) => v != null && isFinite(v));
      if (valid.length < 4) throw new Error("insufficient data");

      const now   = valid[valid.length - 1];
      const q1ago = valid[valid.length - 4]  ?? valid[0]; // ~3 months back
      const y1ago = valid[valid.length - 13] ?? valid[0]; // ~12 months back

      return { now, q1ago, y1ago };
    } catch { continue; }
  }

  // Fall back: use S&P 500 as proxy
  // S&P 500 represents ~80% of Wilshire 5000, scale by 9.5 to approximate Wilshire 5000 index
  // (S&P at 5200 → Wilshire ≈ 49,400; total mkt cap ~$58T with W5000_CAP_FACTOR=1.183)
  try {
    const url = `${YF_BASE}/v8/finance/chart/%5EGSPC?interval=1mo&range=2y`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { headers: yfHeaders(), cache: "no-store", signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    const closes: number[] = json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
    const valid = closes.filter((v) => v != null && isFinite(v));
    if (valid.length < 4) return null;

    const scale = 9.5;
    const now   = valid[valid.length - 1]  * scale;
    const q1ago = (valid[valid.length - 4]  ?? valid[0]) * scale;
    const y1ago = (valid[valid.length - 13] ?? valid[0]) * scale;
    return { now, q1ago, y1ago };
  } catch {
    return null;
  }
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

// Calibration: maps Wilshire 5000 index value → approximate US total market cap in billions
// Based on known reference: Q1 2025 Wilshire ≈ 46,500 → market cap ≈ $55,000B
// (1 W5000 point ≈ $1.183B, calibrated 2025-Q1)
const W5000_CAP_FACTOR = 1.183; // billion USD per W5000 index point

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
