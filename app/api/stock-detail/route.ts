import { NextRequest, NextResponse } from "next/server";
import { mockQuotes } from "@/lib/api";
import { toYahoo } from "@/lib/symbolMap";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function mockDetail(symbol: string) {
  const q = mockQuotes.find((m) => m.symbol === symbol);
  if (!q) return null;
  return {
    symbol,
    name:          q.name,
    exchange:      "NASDAQ",
    currency:      "USD",
    price:         q.price,
    change:        q.change,
    changePercent: q.changePercent,
    open:          q.price - q.change * 0.6,
    high:          q.price * 1.008,
    low:           q.price * 0.992,
    volume:        null,
    pe:            null,
    marketCap:     null,
    week52High:    q.price * 1.18,
    week52Low:     q.price * 0.78,
    avgVolume:     null,
    dividendYield: null,
    beta:          null,
    eps:           null,
    _mock:         true,
  };
}

async function fetchV8Meta(symbol: string) {
  const url =
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}` +
    `?interval=5m&range=1d&includePrePost=false`;
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const json   = await res.json();
  const result = json?.chart?.result?.[0];
  if (!result) return null;
  const meta = result.meta ?? {};
  const q    = result.indicators?.quote?.[0] ?? {};
  const open = (q.open as (number | null)[] ?? []).find((v) => v != null) ?? null;
  return { meta, open };
}

async function fetchV7Fundamentals(symbol: string) {
  const fields = [
    "trailingPE", "marketCap", "averageDailyVolume3Month",
    "trailingAnnualDividendYield", "beta", "epsTrailingTwelveMonths",
  ].join(",");
  const url =
    `https://query1.finance.yahoo.com/v7/finance/quote` +
    `?symbols=${encodeURIComponent(symbol)}&fields=${fields}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.quoteResponse?.result?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const rawSymbol = (req.nextUrl.searchParams.get("symbol") ?? "").toUpperCase();
  if (!rawSymbol) return NextResponse.json({ error: "no symbol" }, { status: 400 });
  const symbol = toYahoo(rawSymbol);

  try {
    const [v8, v7] = await Promise.all([
      fetchV8Meta(symbol),
      fetchV7Fundamentals(symbol),
    ]);

    if (!v8) {
      const mock = mockDetail(rawSymbol);
      if (mock) return NextResponse.json(mock);
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    const { meta, open } = v8;
    const prev = meta.chartPreviousClose ?? meta.regularMarketPrice ?? 0;

    return NextResponse.json({
      symbol:        meta.symbol           ?? symbol,
      name:          meta.longName         ?? meta.shortName ?? symbol,
      exchange:      meta.fullExchangeName ?? meta.exchangeName ?? "",
      currency:      meta.currency         ?? "USD",
      price:         meta.regularMarketPrice     ?? 0,
      change:        (meta.regularMarketPrice ?? 0) - prev,
      changePercent: prev > 0
        ? (((meta.regularMarketPrice ?? 0) - prev) / prev) * 100
        : 0,
      open,
      high:          meta.regularMarketDayHigh   ?? null,
      low:           meta.regularMarketDayLow    ?? null,
      volume:        meta.regularMarketVolume    ?? null,
      week52High:    meta.fiftyTwoWeekHigh       ?? null,
      week52Low:     meta.fiftyTwoWeekLow        ?? null,
      pe:            v7?.trailingPE              ?? null,
      marketCap:     v7?.marketCap               ?? null,
      avgVolume:     v7?.averageDailyVolume3Month ?? null,
      dividendYield: v7?.trailingAnnualDividendYield ?? null,
      beta:          v7?.beta                    ?? null,
      eps:           v7?.epsTrailingTwelveMonths ?? null,
    });
  } catch {
    const mock = mockDetail(rawSymbol);
    if (mock) return NextResponse.json(mock);
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
