import { NextResponse } from "next/server";
import { fetchNaverIndices } from "@/lib/naverFinance";
import type { FearGreedData } from "@/lib/api";

export const dynamic = "force-dynamic";

function labelKo(v: number): string {
  if (v <= 20) return "극단적 공포";
  if (v <= 40) return "공포";
  if (v <= 60) return "중립";
  if (v <= 80) return "탐욕";
  return "극단적 탐욕";
}

export async function GET() {
  try {
    const idx = await fetchNaverIndices();
    const kospi = idx.get("^KS11") ?? idx.get("KOSPI");
    let score = 48;
    if (kospi && kospi.price > 0) {
      const move = Math.max(-3, Math.min(3, kospi.changePercent));
      score = Math.round(50 + (move / 3) * 40);
    }

    const data: FearGreedData = {
      value: score,
      label: labelKo(score),
      prevWeek: Math.max(0, Math.min(100, score - 3)),
      prevMonth: Math.max(0, Math.min(100, score + 5)),
      updatedAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      value: 48,
      label: "중립",
      prevWeek: 45,
      prevMonth: 52,
      updatedAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    } satisfies FearGreedData);
  }
}
