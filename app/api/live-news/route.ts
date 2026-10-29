import { NextResponse } from "next/server";
import { getLiveMuskNews } from "@/lib/liveNews";

export const revalidate = 900;
export const maxDuration = 20;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = url.searchParams.get("locale") === "ko" ? "ko" : "en";
  const headers = {
    "Cache-Control": "public, s-maxage=900, stale-while-revalidate=300",
  };
  try {
    const items = await getLiveMuskNews(locale);
    return NextResponse.json({ items }, { headers });
  } catch {
    return NextResponse.json({ items: [], error: true }, { status: 200, headers });
  }
}
