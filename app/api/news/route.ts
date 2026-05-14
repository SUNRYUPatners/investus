import { NextResponse } from "next/server";
import { getNews } from "@/lib/api";

let _cache: { data: Awaited<ReturnType<typeof getNews>>; at: number } | null = null;
const TTL = 10 * 60_000; // 10 min

export async function GET() {
  if (_cache && Date.now() - _cache.at < TTL) {
    return NextResponse.json(_cache.data);
  }
  const news = await getNews();
  _cache = { data: news, at: Date.now() };
  return NextResponse.json(news);
}
