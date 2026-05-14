import { NextResponse } from "next/server";
import type { FearGreedData } from "@/lib/api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await fetch(
      "https://production.dataviz.cnn.io/index/fearandgreed/graphdata",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Referer: "https://edition.cnn.com/markets/fear-and-greed",
          Accept: "application/json, */*",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error(`CNN ${res.status}`);

    const json = await res.json();
    const fg = json?.fear_and_greed;
    if (!fg || fg.score == null) throw new Error("no data");

    // CNN returns either a number or an object {score, rating}
    const getScore = (v: unknown): number => {
      if (typeof v === "number") return Math.round(v);
      if (v && typeof v === "object" && "score" in v) return Math.round(Number((v as Record<string, unknown>).score));
      return 0;
    };

    const data: FearGreedData = {
      value:     getScore(fg.score),
      label:     String(fg.rating ?? ""),
      prevWeek:  getScore(fg.previous_1_week  ?? fg.previous_close ?? fg.score),
      prevMonth: getScore(fg.previous_1_month ?? fg.score),
      updatedAt: fg.timestamp
        ? new Date(fg.timestamp).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
