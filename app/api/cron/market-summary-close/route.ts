import { NextResponse } from "next/server";
import { isNYSEHoliday } from "@/lib/marketHours";

export const maxDuration = 60;

export async function GET() {
  // Skip on NYSE holidays
  if (isNYSEHoliday()) {
    return NextResponse.json({ skipped: true, reason: "NYSE holiday" });
  }

  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.investus.kr";
    // force 없이 호출 → Data Cache 미스 시 Claude 1회 생성 후 캐시 저장.
    // (force=1은 캐시를 비우기만 해서 다음 사용자 요청이 또 Claude를 부르게 됨)
    const res  = await fetch(`${base}/api/market-summary`, {
      signal: AbortSignal.timeout(50_000),
    });
    if (!res.ok) return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    const data = await res.json() as { date?: string; cached?: boolean };
    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
