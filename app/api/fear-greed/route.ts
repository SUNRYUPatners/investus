import { NextResponse } from "next/server";
import type { FearGreedData } from "@/lib/api";
import { kvGetDetail, kvSetDetail } from "@/lib/kv";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const KV_KEY = "fear-greed:v1";

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

    // KV에 저장 — CNN 다운 시 실제 마지막 값 사용 가능
    kvSetDetail(KV_KEY, data as unknown as Record<string, unknown>);

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400" },
    });
  } catch {
    // CNN 다운 → KV에서 마지막 실제 값 사용 (가짜 50/50/50 절대 금지)
    const kvData = await kvGetDetail(KV_KEY);
    if (kvData && (kvData as unknown as FearGreedData).value != null) {
      return NextResponse.json(kvData, {
        headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" },
      });
    }
    // KV도 없으면 503 반환 — 클라이언트는 localStorage 캐시 또는 아무것도 표시 안 함
    return NextResponse.json(
      { error: "일시적 오류" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
