import { NextResponse } from "next/server";
import { getNewsForMarket } from "@/lib/markets/news";
import { parseMarketId } from "@/lib/markets/types";

export const maxDuration = 60;

const _cache = new Map<string, { data: Awaited<ReturnType<typeof getNewsForMarket>>; at: number }>();
const TTL = 10 * 60_000;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const market = parseMarketId(url.searchParams.get("market"), "us");
  const locale = url.searchParams.get("locale") ?? "en";
  const cacheKey = `${market}_${locale}`;
  const hit = _cache.get(cacheKey);
  if (hit && Date.now() - hit.at < TTL) {
    return NextResponse.json(hit.data);
  }
  try {
    const news = await getNewsForMarket(market, locale);
    _cache.set(cacheKey, { data: news, at: Date.now() });
    return NextResponse.json(news);
  } catch {
    if (hit) return NextResponse.json(hit.data);
    return NextResponse.json([]);
  }
}
