import { NextRequest, NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cronAuth";
import { isNYSEHoliday } from "@/lib/marketHours";
import { getOrCreatePostMarketBriefing } from "@/lib/postMarketBriefing";

export const dynamic = "force-dynamic";
/** 요약·브리핑은 크론을 나눠 각자 한도를 씀. 한 호출에서 직렬로 돌리면 90초에 잘림. */
export const maxDuration = 120;

const SUMMARY_TIMEOUT_MS = 35_000;
const BRIEFING_TIMEOUT_MS = 90_000;

function cronTask(req: NextRequest): "summary" | "briefing" {
  return req.nextUrl.searchParams.get("task") === "briefing" ? "briefing" : "summary";
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(label)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

export async function GET(req: NextRequest) {
  const denied = assertCronAuth(req);
  if (denied) return denied;

  if (isNYSEHoliday()) {
    return NextResponse.json({ skipped: true, reason: "NYSE holiday" });
  }

  const task = cronTask(req);

  try {
    if (task === "briefing") {
      const briefing = await withTimeout(
        getOrCreatePostMarketBriefing(),
        BRIEFING_TIMEOUT_MS,
        "briefing-timeout",
      );
      return NextResponse.json({ ok: true, task, briefingOk: Boolean(briefing) });
    }

    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.investus.kr";
    // force 없이 호출 → Data Cache 미스 시 Claude 1회 생성 후 캐시 저장.
    const res = await fetch(`${base}/api/market-summary`, {
      signal: AbortSignal.timeout(SUMMARY_TIMEOUT_MS),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, task, status: res.status }, { status: 502 });
    }
    const data = await res.json() as { date?: string; cached?: boolean };
    return NextResponse.json({ ok: true, task, ...data });
  } catch (e) {
    return NextResponse.json({ ok: false, task, error: String(e) }, { status: 500 });
  }
}
