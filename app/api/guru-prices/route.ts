import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubBatch } from "@/lib/finnhub";
import { isMarketOpen } from "@/lib/marketHours";

type PriceEntry = { price: number; change: number; changePercent: number };

// Per-symbol in-memory cache — holds last live prices through market close
const _cache = new Map<string, PriceEntry>();

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 20);

  if (symbols.length === 0) return NextResponse.json({});

  const open = isMarketOpen();

  // Market closed: serve cached prices, no Finnhub call
  if (!open) {
    const map: Record<string, PriceEntry> = {};
    for (const sym of symbols) {
      const c = _cache.get(sym);
      if (c) map[sym] = c;
    }
    return NextResponse.json(map, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    });
  }

  // Market open: fetch live data and refresh cache
  try {
    const liveMap = await fetchFinnhubBatch(symbols);
    const map: Record<string, PriceEntry> = {};
    liveMap.forEach((q) => {
      const entry: PriceEntry = { price: q.price, change: q.change, changePercent: q.changePercent };
      map[q.symbol] = entry;
      _cache.set(q.symbol, entry);
    });
    // Fill gaps from cache (Finnhub occasionally misses a symbol)
    for (const sym of symbols) {
      if (!map[sym]) {
        const c = _cache.get(sym);
        if (c) map[sym] = c;
      }
    }
    return NextResponse.json(map, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" },
    });
  } catch {
    // On error return whatever is cached
    const map: Record<string, PriceEntry> = {};
    for (const sym of symbols) {
      const c = _cache.get(sym);
      if (c) map[sym] = c;
    }
    return NextResponse.json(map);
  }
}
