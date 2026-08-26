import { NextResponse } from "next/server";
import type { FearGreedData } from "@/lib/api";

export const dynamic = "force-dynamic";

/** 정책 불확실성 목업 게이지 — 낮을수록 불확실(공포), 높을수록 완화(탐욕) */
export async function GET() {
  const data: FearGreedData & { title?: string } = {
    value: 58,
    label: "중립",
    prevWeek: 52,
    prevMonth: 47,
    updatedAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    title: "정책 모멘텀",
  };
  return NextResponse.json(data);
}
