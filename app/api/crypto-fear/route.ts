import { NextResponse } from "next/server";
import type { FearGreedData } from "@/lib/api";

export const dynamic = "force-dynamic";

function labelFromScore(v: number): string {
  if (v <= 20) return "극단적 공포";
  if (v <= 40) return "공포";
  if (v <= 60) return "중립";
  if (v <= 80) return "탐욕";
  return "극단적 탐욕";
}

export async function GET() {
  try {
    const res = await fetch("https://api.alternative.me/fng/?limit=2", {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`fng ${res.status}`);
    const json = await res.json();
    const cur = Number(json?.data?.[0]?.value ?? 50);
    const prev = Number(json?.data?.[1]?.value ?? cur);
    const data: FearGreedData = {
      value: cur,
      label: labelFromScore(cur),
      prevWeek: prev,
      prevMonth: prev,
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({
      value: 55,
      label: "탐욕",
      prevWeek: 50,
      prevMonth: 48,
      updatedAt: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    } satisfies FearGreedData);
  }
}
