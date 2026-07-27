/**
 * 미국장 마감 직후 — 종가·지수·선물을 스스로 fetch해 Upstash KV에 저장.
 * 방문자가 없어도 새벽(KST) 접속 시 KV HIT로 즉시 응답되도록 워밍.
 *
 * Vercel Cron: 평일 20:20 / 20:35 / 21:20 UTC (+ DST 보정 21:xx)
 */
import { NextRequest, NextResponse } from "next/server";
import { isNYSEHoliday } from "@/lib/marketHours";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const authSecret = process.env.CRON_SECRET;
  if (authSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${authSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

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

    return NextResponse.json({
      ok: true,
      quotes: data.quotes?.length ?? Number(quoteCount ?? 0),
      indices: data.indices?.length ?? 0,
      futures: data.futures?.length ?? 0,
      liveAt: data.liveAt ?? null,
      cache: cacheHdr,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
