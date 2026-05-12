import { NextRequest, NextResponse } from "next/server";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// ── Finnhub: 1D ~ 5Y ─────────────────────────────────────────────────────
const FINNHUB_CFG: Record<string, { resolution: string; daysBack: number }> = {
  "1D": { resolution: "5",  daysBack: 1    },
  "1W": { resolution: "60", daysBack: 7    },
  "1M": { resolution: "D",  daysBack: 30   },
  "3M": { resolution: "D",  daysBack: 90   },
  "1Y": { resolution: "W",  daysBack: 365  },
  "5Y": { resolution: "M",  daysBack: 1825 },
};

// ── Yahoo Finance: 10Y / ALL ──────────────────────────────────────────────
const YAHOO_CFG: Record<string, { interval: string; range: string }> = {
  "10Y": { interval: "1mo", range: "10y" },
  "ALL": { interval: "1mo", range: "max" },
};

// ── Mock fallback ─────────────────────────────────────────────────────────
function mockChart(symbol: string, period: string) {
  const count = ({ "1D": 78, "1W": 42, "1M": 22, "3M": 65, "1Y": 52, "5Y": 60, "10Y": 120, "ALL": 240 } as Record<string, number>)[period] ?? 78;
  let p = 150;
  const now  = Math.floor(Date.now() / 1000);
  const step = period === "1D" ? 300 : period === "1W" ? 3600 : 86400;
  const points = Array.from({ length: count }, (_, i) => {
    p = Math.max(p * (1 + (Math.random() - 0.48) * 0.012), 1);
    return { ts: now - (count - 1 - i) * step, close: Math.round(p * 100) / 100, volume: Math.round(1e7 * Math.random()) };
  });
  return { symbol, chartPreviousClose: points[0].close, regularMarketPrice: points[points.length - 1].close, points, _mock: true };
}

// ── Finnhub candle ────────────────────────────────────────────────────────
async function fetchFinnhub(symbol: string, period: string) {
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
    if (from > to) from = to - 86400; // pre-open: use previous day
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

// ── Yahoo Finance v8 (10Y / ALL) ──────────────────────────────────────────
async function fetchYahoo(symbol: string, period: string) {
  const cfg = YAHOO_CFG[period];
  if (!cfg) return null;

  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=${cfg.interval}&range=${cfg.range}&includePrePost=false`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 3600 }, // cache 1h — long-term history doesn't change often
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
      symbol,
      chartPreviousClose: result.meta?.chartPreviousClose ?? points[0]?.close ?? null,
      regularMarketPrice: result.meta?.regularMarketPrice ?? points[points.length - 1]?.close ?? null,
      points,
    };
  } catch { return null; }
}

// ── Handler ───────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const period = req.nextUrl.searchParams.get("period") ?? "1D";

  // 10Y / ALL → Yahoo Finance monthly
  if (period === "10Y" || period === "ALL") {
    const yahoo = await fetchYahoo(symbol, period);
    if (yahoo) return NextResponse.json(yahoo);
    return NextResponse.json(mockChart(symbol, period));
  }

  // 1D ~ 5Y → Finnhub
  const finnhub = await fetchFinnhub(symbol, period);
  if (finnhub) return NextResponse.json(finnhub);

  // Finnhub failed → Yahoo fallback
  const yahooFallback = await fetchYahoo(symbol, period === "1Y" ? "10Y" : "10Y");
  if (yahooFallback) return NextResponse.json(yahooFallback);

  return NextResponse.json(mockChart(symbol, period));
}
