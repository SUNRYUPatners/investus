import { NextResponse } from "next/server";
import { getLiveGurus } from "@/lib/edgar13f";

export const dynamic = "force-dynamic";

/** 검색 탭 투자 대가 — KV 라이브 13F (없으면 시드) */
export async function GET() {
  try {
    const { gurus, live, updatedAt } = await getLiveGurus();
    return NextResponse.json(
      { gurus, live, updatedAt },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
          "X-Guru-Source": live ? "kv" : "seed",
        },
      },
    );
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
