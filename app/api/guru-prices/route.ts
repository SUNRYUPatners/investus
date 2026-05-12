import { NextResponse } from "next/server";
import { fetchBatchQuotes } from "@/lib/yahooFinance";
import { ALL_GURU_SYMBOLS } from "@/lib/holdings13f";

export const revalidate = 300; // 5분 캐시

export async function GET() {
  try {
    const quotes = await fetchBatchQuotes(ALL_GURU_SYMBOLS);
    const map: Record<string, { price: number; change: number; changePercent: number }> = {};
    for (const q of quotes) {
      map[q.symbol] = {
        price:         q.price,
        change:        q.change,
        changePercent: q.changePercent,
      };
    }
    return NextResponse.json(map);
  } catch {
    return NextResponse.json({});
  }
}
