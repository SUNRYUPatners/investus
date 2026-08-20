/**
 * 미국장 마감 직후 — 종가·지수·선물을 fetch해 KV에 저장.
 * 방문자가 없어도 새벽(KST) HIT가 되도록 워밍.
 *
 * 복구 우선순위:
 * 1) 이미 EOD 신선하면 스킵
 * 2) 같은 호출 안에서 최대 3회 재시도 (외부 API 일시 장애 흡수)
 * 3) vercel.json 밤새·장전 크론이 추가 복구
 * 4) ?phase=final 에서만 사람 알림 (그 전엔 자동 복구에 맡김)
 */
import { NextRequest, NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cronAuth";
import {
  isAlertPhase,
  sleep,
  validateWarmPayload,
  type WarmCheckResult,
  type WarmPayload,
} from "@/lib/marketWarmCheck";
import { isNYSEHoliday, toETDateString } from "@/lib/marketHours";
import { sendOpsAlert } from "@/lib/opsAlert";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const MAX_ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 38_000;
const RETRY_GAP_MS = 2_500;

type AttemptOk = {
  ok: true;
  check: Extract<WarmCheckResult, { ok: true }>;
  indices: number;
  futures: number;
  cache: string | null;
  attempts: number;
  skipped?: boolean;
};

type AttemptFail = {
  ok: false;
  reason: string;
  detail: string;
  httpStatus?: number;
  attempts: number;
};

async function readPayload(res: Response): Promise<WarmPayload> {
  try {
    return (await res.json()) as WarmPayload;
  } catch {
    return {};
  }
}

/** 이미 종가 캐시가 신선하면 재 fetch 없이 성공 */
async function checkExistingEod(base: string): Promise<AttemptOk | null> {
  try {
    const res = await fetch(`${base}/api/market-data`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (!res.ok) return null;
    const data = await readPayload(res);
    const check = validateWarmPayload(data);
    if (!check.ok) return null;
    return {
      ok: true,
      check,
      indices: data.indices?.length ?? 0,
      futures: data.futures?.length ?? 0,
      cache: res.headers.get("X-Market-Cache"),
      attempts: 0,
      skipped: true,
    };
  } catch {
    return null;
  }
}

async function warmOnce(base: string, attempt: number): Promise<AttemptOk | AttemptFail> {
  try {
    const res = await fetch(`${base}/api/market-data?refresh=1&warm=1`, {
      cache: "no-store",
      signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
    });
    const quoteCount = res.headers.get("X-Market-Quotes");
    const cacheHdr = res.headers.get("X-Market-Cache");
    const data = await readPayload(res);

    if (!res.ok) {
      return {
        ok: false,
        reason: "market-data-http",
        detail: typeof data.error === "string"
          ? data.error
          : `quotes=${quoteCount ?? "?"} cache=${cacheHdr ?? "?"}`,
        httpStatus: res.status,
        attempts: attempt,
      };
    }

    const check = validateWarmPayload(data);
    if (!check.ok) {
      return {
        ok: false,
        reason: check.reason,
        detail: check.detail ?? "검증 실패",
        httpStatus: res.status,
        attempts: attempt,
      };
    }

    return {
      ok: true,
      check,
      indices: data.indices?.length ?? 0,
      futures: data.futures?.length ?? 0,
      cache: cacheHdr,
      attempts: attempt,
    };
  } catch (e) {
    return {
      ok: false,
      reason: "exception",
      detail: e instanceof Error ? e.message : String(e),
      attempts: attempt,
    };
  }
}

async function warmWithRetries(base: string): Promise<AttemptOk | AttemptFail> {
  const existing = await checkExistingEod(base);
  if (existing) return existing;

  let lastFail: AttemptFail | null = null;
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const result = await warmOnce(base, i);
    if (result.ok) return result;
    lastFail = result;
    console.error(`[market-data-warm] attempt ${i}/${MAX_ATTEMPTS} failed: ${result.reason} — ${result.detail}`);
    if (i < MAX_ATTEMPTS) await sleep(RETRY_GAP_MS);
  }
  return lastFail ?? {
    ok: false,
    reason: "unknown",
    detail: "모든 재시도 실패",
    attempts: MAX_ATTEMPTS,
  };
}

async function notifyFinalFailure(opts: {
  reason: string;
  detail: string;
  httpStatus?: number;
  attempts: number;
}) {
  const etDate = toETDateString();
  await sendOpsAlert({
    dedupKey: `market-data-warm:final:${opts.reason}`,
    force: true,
    title: "🚨 Investus 장마감 종가 워밍 최종 실패",
    message: [
      `세션(ET): ${etDate}`,
      `사유: ${opts.reason}`,
      opts.detail,
      `인프로세스 재시도: ${opts.attempts}회`,
      opts.httpStatus ? `HTTP: ${opts.httpStatus}` : "",
      "장전 최종 복구까지 실패 — 수동 확인: /api/market-data?refresh=1&warm=1",
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
  const alertNow = isAlertPhase(req.url);

  const result = await warmWithRetries(base);

  if (result.ok) {
    // 종가 확보된 뒤에만 가격 알림 (실패해도 워밍 성공은 유지)
    let priceAlerts: unknown = null;
    if (!result.skipped) {
      try {
        const cronSecret = process.env.CRON_SECRET?.trim();
        const pa = await fetch(`${base}/api/cron/price-alerts`, {
          cache: "no-store",
          headers: cronSecret ? { authorization: `Bearer ${cronSecret}` } : {},
          signal: AbortSignal.timeout(20_000),
        });
        priceAlerts = await pa.json().catch(() => null);
      } catch { /* ignore */ }
    }

    return NextResponse.json({
      ok: true,
      skipped: !!result.skipped,
      quotes: result.check.quotes,
      indices: result.indices,
      futures: result.futures,
      liveAt: result.check.liveAt,
      tsla: result.check.tsla,
      cache: result.cache,
      attempts: result.attempts,
      priceAlerts,
    });
  }

  // 중간 슬롯: 알림 없이 실패만 기록 — 이후 크론이 자동 복구
  if (!alertNow) {
    console.error(
      `[market-data-warm] deferred (auto-retry later): ${result.reason} — ${result.detail}`,
    );
    return NextResponse.json(
      {
        ok: false,
        deferred: true,
        reason: result.reason,
        detail: result.detail,
        attempts: result.attempts,
        alert: false,
      },
      { status: 502 },
    );
  }

  await notifyFinalFailure({
    reason: result.reason,
    detail: result.detail,
    httpStatus: result.httpStatus,
    attempts: result.attempts,
  });

  return NextResponse.json(
    {
      ok: false,
      reason: result.reason,
      detail: result.detail,
      attempts: result.attempts,
      alert: true,
    },
    { status: 502 },
  );
}
