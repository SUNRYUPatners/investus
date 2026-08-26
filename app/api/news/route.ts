import { NextResponse } from "next/server";
import { getNewsForMarket } from "@/lib/markets/news";
import { parseMarketId } from "@/lib/markets/types";

export const maxDuration = 60;

const _cache = new Map<string, { data: Awaited<ReturnType<typeof getNewsForMarket>>; at: number }>();
const TTL = 10 * 60_000;

export async function GET(req: Request) {
  const market = parseMarketId(new URL(req.url).searchParams.get("market"), "us");
  const hit = _cache.get(market);
  if (hit && Date.now() - hit.at < TTL) {
    return NextResponse.json(hit.data);
  }
  try {
    const news = await getNewsForMarket(market);
    _cache.set(market, { data: news, at: Date.now() });
    return NextResponse.json(news);
  } catch {
    if (hit) return NextResponse.json(hit.data);
    return NextResponse.json([]);
  }
}
