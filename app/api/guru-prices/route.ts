import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubBatch } from "@/lib/finnhub";
import { isMarketOpen } from "@/lib/marketHours";

type PriceEntry = { price: number; change: number; changePercent: number };

// Per-symbol in-memory cache — holds last prices across market close / server restarts
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

  // Symbols not yet in cache (e.g. after server restart)
  const missing = symbols.filter((s) => !_cache.has(s));

  // Fetch from Finnhub when: market open (always refresh) OR cache has gaps
  if (open || missing.length > 0) {
    const toFetch = open ? symbols : missing;
    try {
      const liveMap = await fetchFinnhubBatch(toFetch);
      liveMap.forEach((q) => {
        _cache.set(q.symbol, { price: q.price, change: q.change, changePercent: q.changePercent });
      });
    } catch { /* keep existing cache on error */ }
  }

  const map: Record<string, PriceEntry> = {};
  for (const sym of symbols) {
    const c = _cache.get(sym);
    if (c) map[sym] = c;
  }

  const cc = open
    ? "s-maxage=60, stale-while-revalidate=30"
    : "s-maxage=3600, stale-while-revalidate=86400";

  return NextResponse.json(map, { headers: { "Cache-Control": cc } });
}
