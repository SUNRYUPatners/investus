/**
 * 포트원 웹훅 수신 — 결제 성공/실패, billingKey 발급/삭제 등 이벤트 반영.
 * 포트원 콘솔 → 웹훅에서 이 URL 등록 필요:
 *   https://www.investus.kr/api/portone/webhook
 */
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "@portone/server-sdk";
import { getAdminSupabase } from "@/lib/supabase";
import { getWebhookSecret } from "@/lib/portone";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const headers = {
    "webhook-id":        req.headers.get("webhook-id") ?? "",
    "webhook-timestamp": req.headers.get("webhook-timestamp") ?? "",
    "webhook-signature": req.headers.get("webhook-signature") ?? "",
  };

  let evt;
  try {
    evt = await Webhook.verify(getWebhookSecret(), raw, headers);
  } catch (e) {
    console.error("웹훅 검증 실패:", e);
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const sb = getAdminSupabase();
  const type = String((evt as { type: unknown }).type);
  const data = (evt as { data?: { paymentId?: string; billingKey?: string } }).data;

  // 결제 이벤트
  if (type.startsWith("Transaction.")) {
    const paymentId = data?.paymentId;
    if (!paymentId) return NextResponse.json({ ok: true });

    if (type === "Transaction.Paid") {
      await sb.from("portone_payments").upsert({
        payment_id: paymentId,
        status:     "paid",
        raw_event:  evt as unknown as Record<string, unknown>,
        paid_at:    new Date().toISOString(),
      }, { onConflict: "payment_id" });
    } else if (type === "Transaction.Failed") {
      await sb.from("portone_payments").upsert({
        payment_id: paymentId,
        status:     "failed",
        raw_event:  evt as unknown as Record<string, unknown>,
      }, { onConflict: "payment_id" });

      // 정기결제 실패 → 구독 past_due 로 마킹
      await sb.from("portone_subscriptions")
        .update({ status: "past_due" })
        .eq("last_payment_id", paymentId);
    } else if (type === "Transaction.Cancelled") {
      await sb.from("portone_payments").upsert({
        payment_id: paymentId,
        status:     "cancelled",
        raw_event:  evt as unknown as Record<string, unknown>,
      }, { onConflict: "payment_id" });
    }
  }

  // billingKey 이벤트
  if (type.startsWith("BillingKey.")) {
    const billingKey = data?.billingKey;
    if (type === "BillingKey.Deleted" && billingKey) {
      await sb.from("portone_subscriptions")
        .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
        .eq("billing_key", billingKey);
    }
  }

  return NextResponse.json({ ok: true });
}
