/**
 * 미국장 마감 직후 — 종가·지수·선물을 스스로 fetch해 Supabase Storage(KV)에 저장.
 * 방문자가 없어도 새벽(KST) 접속 시 HIT로 즉시 응답되도록 워밍.
 *
 * Vercel Cron: 평일 20:20 / 20:35 / 21:20 UTC (+ DST 보정 21:xx)
 */
import { NextRequest, NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cronAuth";
import { isNYSEHoliday } from "@/lib/marketHours";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = assertCronAuth(req);
  if (denied) return denied;

  if (isNYSEHoliday()) {
    return NextResponse.json({ skipped: true, reason: "NYSE holiday" });
  }

  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.investus.kr";
    // refresh=1: 메모리/KV TTL 무시하고 외부 API 재조회
    // warm=1: KV 쓰기를 응답 전에 await (서버리스 freeze 유실 방지)
    const res = await fetch(`${base}/api/market-data?refresh=1&warm=1`, {
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    });

    const quoteCount = res.headers.get("X-Market-Quotes");
    const cacheHdr = res.headers.get("X-Market-Cache");

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, status: res.status, quotes: quoteCount, cache: cacheHdr },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      quotes?: unknown[];
      indices?: unknown[];
      futures?: unknown[];
      liveAt?: number;
    };

    // 종가 워밍 직후 가격 알림도 한 번 체크 (Hobby: 별도 다회 크론 제한 대비)
    let priceAlerts: unknown = null;
    try {
      const cronSecret = process.env.CRON_SECRET?.trim();
      const pa = await fetch(`${base}/api/cron/price-alerts`, {
        cache: "no-store",
        headers: cronSecret ? { authorization: `Bearer ${cronSecret}` } : {},
        signal: AbortSignal.timeout(25_000),
      });
      priceAlerts = await pa.json().catch(() => null);
    } catch { /* ignore */ }

    return NextResponse.json({
      ok: true,
      quotes: data.quotes?.length ?? Number(quoteCount ?? 0),
      indices: data.indices?.length ?? 0,
      futures: data.futures?.length ?? 0,
      liveAt: data.liveAt ?? null,
      cache: cacheHdr,
      priceAlerts,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
