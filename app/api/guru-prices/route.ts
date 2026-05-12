import { NextResponse } from "next/server";
import { fetchFinnhubBatch } from "@/lib/finnhub";
import { ALL_GURU_SYMBOLS } from "@/lib/holdings13f";

export const dynamic = "force-dynamic";

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
