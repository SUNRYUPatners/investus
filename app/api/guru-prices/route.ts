import { NextRequest, NextResponse } from "next/server";
import { fetchFinnhubBatch } from "@/lib/finnhub";

// Per-guru lazy fetch: ?symbols=AAPL,MSFT,NVDA,...
export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .slice(0, 20); // max 20 per request

  if (symbols.length === 0) return NextResponse.json({});

  try {
    const liveMap = await fetchFinnhubBatch(symbols);
    const map: Record<string, { price: number; change: number; changePercent: number }> = {};
    liveMap.forEach((q) => {
      map[q.symbol] = { price: q.price, change: q.change, changePercent: q.changePercent };
    });
    return NextResponse.json(map, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=30" },
    });
  } catch {
    return NextResponse.json({});
  }
}
