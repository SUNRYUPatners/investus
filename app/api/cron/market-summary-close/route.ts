import { NextResponse } from "next/server";
import { isNYSEHoliday } from "@/lib/marketHours";

export const maxDuration = 60;

export async function GET() {
  // Skip on NYSE holidays
  if (isNYSEHoliday()) {
    return NextResponse.json({ skipped: true, reason: "NYSE holiday" });
  }

  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://investus.kr";
    const res  = await fetch(`${base}/api/market-summary?force=1`, {
      signal: AbortSignal.timeout(50_000),
    });
    if (!res.ok) return NextResponse.json({ ok: false, status: res.status }, { status: 502 });
    const data = await res.json() as { date?: string; cached?: boolean };
    return NextResponse.json({ ok: true, ...data });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
