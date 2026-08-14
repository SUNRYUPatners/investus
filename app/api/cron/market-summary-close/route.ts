import { NextRequest, NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cronAuth";
import { isNYSEHoliday } from "@/lib/marketHours";
import { getOrCreatePostMarketBriefing } from "@/lib/postMarketBriefing";

export const maxDuration = 90;

export async function GET(req: NextRequest) {
  const denied = assertCronAuth(req);
  if (denied) return denied;

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
    let briefingOk = false;
    try {
      briefingOk = Boolean(await getOrCreatePostMarketBriefing());
    } catch { /* push cron will retry */ }
    return NextResponse.json({ ok: true, briefingOk, ...data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
