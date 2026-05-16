import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubBatch } from "@/lib/finnhub";
import { isMarketOpen } from "@/lib/marketHours";

// Vercel is serverless — in-memory cache resets on cold starts.
// CDN caching (s-maxage) handles persistence instead.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 20);

  if (symbols.length === 0) return NextResponse.json({});

  const open = isMarketOpen();

  // Always fetch Finnhub:
  // - Market open  → returns live price (c)
  // - Market closed → fetchOne falls back to prev-close (pc) when c=0
  const liveMap = await fetchFinnhubBatch(symbols);
  const map: Record<string, { price: number; change: number; changePercent: number }> = {};
  liveMap.forEach((q) => {
    map[q.symbol] = { price: q.price, change: q.change, changePercent: q.changePercent };
  });

  // Never cache an empty response — next request should retry Finnhub
  if (Object.keys(map).length === 0) {
    return NextResponse.json(map, { headers: { "Cache-Control": "no-store" } });
  }

  const cc = open
    ? "public, s-maxage=60, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";

  return NextResponse.json(map, { headers: { "Cache-Control": cc } });
}
