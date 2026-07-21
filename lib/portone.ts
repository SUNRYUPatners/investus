/**
 * PortOne V2 서버 헬퍼
 * - 정기결제(billingKey) 청구, 취소, 웹훅 검증
 * - 필요 환경변수:
 *   PORTONE_STORE_ID       — 포트원 콘솔 → 상점 ID
 *   PORTONE_CHANNEL_KEY    — 콘솔 → 결제 연동 → 채널 → 채널키
 *   PORTONE_API_SECRET     — 콘솔 → 개발자 콘솔 → API Secret
 *   PORTONE_WEBHOOK_SECRET — 콘솔 → 웹훅 → 시크릿
 */

import { PortOneClient } from "@portone/server-sdk";

let _client: ReturnType<typeof PortOneClient> | null = null;

export function getPortOne() {
  if (_client) return _client;
  const secret = process.env.PORTONE_API_SECRET;
  if (!secret) throw new Error("PORTONE_API_SECRET not set");
  _client = PortOneClient({
    secret,
    storeId: process.env.PORTONE_STORE_ID ?? process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
  });
  return _client;
}

export function getChannelKey(): string {
  const key = process.env.PORTONE_CHANNEL_KEY ?? process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;
  if (!key) throw new Error("PORTONE_CHANNEL_KEY not set");
  return key;
}

export function getWebhookSecret(): string {
  const s = process.env.PORTONE_WEBHOOK_SECRET;
  if (!s) throw new Error("PORTONE_WEBHOOK_SECRET not set");
  return s;
}

/** 사람이 읽을 수 있는 paymentId 만들기 (KST 초 단위 + userId 앞자리) */
export function makePaymentId(prefix: string, userId: string): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const ts = kst.toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  return `${prefix}-${ts}-${userId.slice(0, 8)}`;
}

/** billingKey로 즉시 결제 */
export async function chargeWithBillingKey(opts: {
  billingKey: string;
  paymentId: string;
  orderName: string;
  amountKrw: number;
  customer: { id: string; email: string; name?: string };
}) {
  const portone = getPortOne();
  return portone.payment.payWithBillingKey({
    paymentId: opts.paymentId,
    billingKey: opts.billingKey,
    orderName: opts.orderName,
    amount: { total: opts.amountKrw },
    currency: "KRW",
    customer: {
      id: opts.customer.id,
      email: opts.customer.email,
      name: opts.customer.name ? { full: opts.customer.name } : undefined,
    },
  });
}

/** 결제 취소(환불) */
export async function cancelPayment(opts: {
  paymentId: string;
  reason: string;
  amountKrw?: number; // 부분취소 원할 때만
}) {
  const portone = getPortOne();
  return portone.payment.cancelPayment({
    paymentId: opts.paymentId,
    reason: opts.reason,
    amount: opts.amountKrw,
  });
}

/** billingKey 삭제 (구독 해지) */
export async function deleteBillingKey(billingKey: string, reason: string) {
  const portone = getPortOne();
  return portone.payment.billingKey.deleteBillingKey({
    billingKey,
    reason,
  });
}

/** 다음 청구일 계산 (KST 기준, monthsAhead 개월 뒤 같은 일자) */
export function nextBillingDate(from: Date = new Date(), monthsAhead = 1): Date {
  const kst = new Date(from.getTime() + 9 * 60 * 60 * 1000);
  const y = kst.getUTCFullYear();
  const m = kst.getUTCMonth();
  const d = kst.getUTCDate();
  const next = new Date(Date.UTC(y, m + monthsAhead, Math.min(d, 28), 0, 0, 0));
  return new Date(next.getTime() - 9 * 60 * 60 * 1000);
}
