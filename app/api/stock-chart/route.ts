import { NextRequest, NextResponse } from "next/server";

// Finnhub candle resolution + time range per period
const PERIOD_CFG: Record<string, { resolution: string; daysBack: number }> = {
  "1D":  { resolution: "5",  daysBack: 1    },
  "1W":  { resolution: "60", daysBack: 7    },
  "1M":  { resolution: "D",  daysBack: 30   },
  "3M":  { resolution: "D",  daysBack: 90   },
  "1Y":  { resolution: "W",  daysBack: 365  },
  "5Y":  { resolution: "M",  daysBack: 1825 },
};

function mockChart(symbol: string, period: string) {
  const count = { "1D": 78, "1W": 42, "1M": 22, "3M": 65, "1Y": 52, "5Y": 60 }[period] ?? 78;
  const base  = 150;
  let p       = base;
  const now   = Math.floor(Date.now() / 1000);
  const step  = period === "1D" ? 300 : period === "1W" ? 3600 : 86400;
  const points = Array.from({ length: count }, (_, i) => {
    p = Math.max(p * (1 + (Math.random() - 0.48) * 0.01), 1);
    return { ts: now - (count - 1 - i) * step, close: Math.round(p * 100) / 100, volume: Math.round(1e7 * Math.random()) };
  });
  return {
    symbol,
    chartPreviousClose: points[0].close,
    regularMarketPrice: points[points.length - 1].close,
    points,
    _mock: true,
  };
}

async function fetchFinnhubCandles(symbol: string, period: string) {
  const token = process.env.FINNHUB_API_KEY ?? "";
  if (!token) return null;

  const cfg = PERIOD_CFG[period] ?? PERIOD_CFG["1D"];
  const to  = Math.floor(Date.now() / 1000);
  let   from: number;

  if (period === "1D") {
    // Use today's NYSE open (9:30 EST)
    const est = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    est.setHours(9, 30, 0, 0);
    from = Math.floor(est.getTime() / 1000);
    // If market hasn't opened yet, go back to yesterday's session
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

    const points: { ts: number; close: number; volume: number }[] =
      (json.t as number[]).map((ts: number, i: number) => ({
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

export async function GET(req: NextRequest) {
  const symbol = (req.nextUrl.searchParams.get("symbol") ?? "AAPL").toUpperCase();
  const period = req.nextUrl.searchParams.get("period") ?? "1D";

  const data = await fetchFinnhubCandles(symbol, period);
  if (data) return NextResponse.json(data);

  return NextResponse.json(mockChart(symbol, period));
}
