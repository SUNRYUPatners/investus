import { NextResponse } from "next/server";
import { fetchFinnhubBatch } from "@/lib/finnhub";
import { ALL_GURU_SYMBOLS } from "@/lib/holdings13f";

// Cache 60s — Finnhub rate limit 방지
export const revalidate = 60;

export async function GET() {
  try {
    const liveMap = await fetchFinnhubBatch(ALL_GURU_SYMBOLS);
    const map: Record<string, { price: number; change: number; changePercent: number }> = {};
    liveMap.forEach((q) => {
      map[q.symbol] = { price: q.price, change: q.change, changePercent: q.changePercent };
    });
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({});
  }
}
