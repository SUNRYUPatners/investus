/**
 * 미국장 마감 직후 — 종가·지수·선물을 스스로 fetch해 Supabase Storage(KV)에 저장.
 * 방문자가 없어도 새벽(KST) 접속 시 HIT로 즉시 응답되도록 워밍.
 *
 * Vercel Cron: 평일 20:20 / 20:35 / 21:20 UTC (+ DST 보정 21:xx)
 * 실패 시 CRON_ALERT_WEBHOOK(또는 ORDER_NOTIFY_WEBHOOK)으로 운영 알림.
 */
import { NextRequest, NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cronAuth";
import { isFinalWarmAttempt, validateWarmPayload, type WarmPayload } from "@/lib/marketWarmCheck";
import { isNYSEHoliday, toETDateString } from "@/lib/marketHours";
import { sendOpsAlert } from "@/lib/opsAlert";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

async function notifyWarmFailure(opts: {
  reason: string;
  detail: string;
  httpStatus?: number;
  force?: boolean;
}) {
  const etDate = toETDateString();
  const final = isFinalWarmAttempt();
  await sendOpsAlert({
    dedupKey: `market-data-warm:${opts.reason}${final ? ":final" : ""}`,
    force: opts.force || final,
    title: final
      ? "🚨 Investus 장마감 종가 워밍 최종 실패"
      : "⚠️ Investus 장마감 종가 워밍 실패",
    message: [
      `세션(ET): ${etDate}`,
      `사유: ${opts.reason}`,
      opts.detail,
      opts.httpStatus ? `HTTP: ${opts.httpStatus}` : "",
      final ? "마지막 크론 슬롯 — 수동 확인 필요 (bash scripts/deploy.sh 또는 /api/market-data?refresh=1&warm=1)" : "이후 크론이 자동 재시도합니다.",
      "https://www.investus.kr/api/market-data",
    ].filter(Boolean).join("\n"),
  });
}

export async function GET(req: NextRequest) {
  const denied = assertCronAuth(req);
  if (denied) return denied;

  if (isNYSEHoliday()) {
    return NextResponse.json({ skipped: true, reason: "NYSE holiday" });
  }

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.investus.kr";

  try {
    const res = await fetch(`${base}/api/market-data?refresh=1&warm=1`, {
      cache: "no-store",
      signal: AbortSignal.timeout(55_000),
    });

    const quoteCount = res.headers.get("X-Market-Quotes");
    const cacheHdr = res.headers.get("X-Market-Cache");

    let data: WarmPayload = {};
    try {
      data = (await res.json()) as WarmPayload;
    } catch {
      data = {};
    }

    if (!res.ok) {
      const detail = typeof data.error === "string" ? data.error : `quotes header=${quoteCount ?? "?"} cache=${cacheHdr ?? "?"}`;
      await notifyWarmFailure({
        reason: "market-data-http",
        detail,
        httpStatus: res.status,
      });
      return NextResponse.json(
        { ok: false, status: res.status, quotes: quoteCount, cache: cacheHdr },
        { status: 502 },
      );
    }

    const check = validateWarmPayload(data);
    if (!check.ok) {
      await notifyWarmFailure({
        reason: check.reason,
        detail: check.detail ?? "검증 실패",
        httpStatus: res.status,
      });
      return NextResponse.json(
        { ok: false, validation: check, quotes: data.quotes?.length ?? 0, liveAt: data.liveAt ?? null },
        { status: 502 },
      );
    }

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
      quotes: check.quotes,
      indices: data.indices?.length ?? 0,
      futures: data.futures?.length ?? 0,
      liveAt: check.liveAt,
      tsla: check.tsla,
      cache: cacheHdr,
      priceAlerts,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await notifyWarmFailure({
      reason: "exception",
      detail: msg,
    });
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
