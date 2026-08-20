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

/** UTC 22:00 이후 마지막 워밍 슬롯 (vercel.json 0 22 * * *) */
export function isFinalWarmAttempt(now = new Date()): boolean {
  return now.getUTCHours() >= 22;
}
