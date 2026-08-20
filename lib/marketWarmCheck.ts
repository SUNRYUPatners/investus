import { isEodCacheFresh } from "@/lib/marketHours";

export type WarmPayload = {
  quotes?: { symbol: string; price: number; changePercent?: number }[];
  indices?: unknown[];
  futures?: unknown[];
  liveAt?: number;
  error?: string;
};

export type WarmCheckResult =
  | { ok: true; quotes: number; liveAt: number; tsla?: { price: number; changePercent: number } }
  | { ok: false; reason: string; detail?: string };

const MIN_QUOTES = 80;

/** 장마감 워밍 결과가 EOD 종가로 쓸 수 있는지 검증 */
export function validateWarmPayload(data: WarmPayload): WarmCheckResult {
  if (data.error) {
    return { ok: false, reason: "api-error", detail: data.error };
  }

  const liveAt = data.liveAt ?? 0;
  if (!liveAt) {
    return { ok: false, reason: "missing-liveAt", detail: "liveAt 없음" };
  }
  if (!isEodCacheFresh(liveAt)) {
    return {
      ok: false,
      reason: "stale-eod",
      detail: `liveAt=${new Date(liveAt).toISOString()} (16:00 ET 이전 스냅샷)`,
    };
  }

  const quotes = data.quotes ?? [];
  if (quotes.length < MIN_QUOTES) {
    return {
      ok: false,
      reason: "insufficient-quotes",
      detail: `${quotes.length}종목 (최소 ${MIN_QUOTES})`,
    };
  }

  const tsla = quotes.find((q) => q.symbol === "TSLA");
  if (!tsla || tsla.price <= 0) {
    return { ok: false, reason: "missing-tsla", detail: "TSLA 시세 없음" };
  }

  return {
    ok: true,
    quotes: quotes.length,
    liveAt,
    tsla: { price: tsla.price, changePercent: tsla.changePercent ?? 0 },
  };
}

/**
 * 사람 알림을 보낼 최종 슬롯인지.
 * - ?phase=final 크론(장전 복구)만 알림
 * - 그 외 실패는 로그만 + 이후 자동 재시도
 */
export function isAlertPhase(reqUrl: string, now = new Date()): boolean {
  try {
    const phase = new URL(reqUrl).searchParams.get("phase");
    if (phase === "final") return true;
  } catch { /* ignore */ }
  // 하위 호환: 명시 phase 없이 UTC 10시 이후(장전 복구 창)면 최종로 간주
  return now.getUTCHours() >= 10 && now.getUTCHours() < 13;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
