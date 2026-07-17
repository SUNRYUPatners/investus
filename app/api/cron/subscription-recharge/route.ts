/**
 * 매일 KST 03:00 실행 — next_billing_at ≤ 오늘 인 active 구독을 재청구.
 * 실패시 past_due 로 마킹, 사용자에겐 이메일/푸시 별도 처리.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { chargeWithBillingKey, makePaymentId, nextBillingDate } from "@/lib/portone";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // Vercel Cron 검증 (CRON_SECRET 있으면 확인)
  const authSecret = process.env.CRON_SECRET;
  if (authSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${authSecret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const sb = getAdminSupabase();
  const now = new Date();
  const cutoff = now.toISOString();

  const { data: dueSubs, error } = await sb
    .from("portone_subscriptions")
    .select("id, user_id, user_email, plan_kind, plan_ref, billing_key, price_krw")
    .eq("status", "active")
    .lte("next_billing_at", cutoff)
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!dueSubs || dueSubs.length === 0) {
    return NextResponse.json({ ok: true, processed: 0 });
  }

  let ok = 0, fail = 0;
  for (const sub of dueSubs) {
    const paymentId = makePaymentId(sub.plan_kind === "pro" ? "PRO" : "CRT", sub.user_id);
    const orderName = sub.plan_kind === "pro"
      ? "Investus Pro 월 구독"
      : `Investus 크리에이터 구독 (${sub.plan_ref ?? ""})`;

    try {
      await chargeWithBillingKey({
        billingKey:  sub.billing_key,
        paymentId,
        orderName,
        amountKrw:   sub.price_krw,
        customer:    { id: sub.user_id, email: sub.user_email },
      });

      await sb.from("portone_subscriptions").update({
        last_charged_at: now.toISOString(),
        last_payment_id: paymentId,
        next_billing_at: nextBillingDate(now).toISOString(),
        status:          "active",
      }).eq("id", sub.id);

      await sb.from("portone_payments").insert({
        user_id:         sub.user_id,
        user_email:      sub.user_email,
        payment_id:      paymentId,
        subscription_id: sub.id,
        item_kind:       sub.plan_kind,
        item_ref:        sub.plan_ref,
        amount_krw:      sub.price_krw,
        status:          "paid",
        paid_at:         now.toISOString(),
      });

      ok++;
    } catch (e) {
      console.error(`재과금 실패 sub=${sub.id}:`, (e as Error).message);
      await sb.from("portone_subscriptions").update({
        status: "past_due",
        last_payment_id: paymentId,
      }).eq("id", sub.id);

      await sb.from("portone_payments").insert({
        user_id:         sub.user_id,
        user_email:      sub.user_email,
        payment_id:      paymentId,
        subscription_id: sub.id,
        item_kind:       sub.plan_kind,
        item_ref:        sub.plan_ref,
        amount_krw:      sub.price_krw,
        status:          "failed",
      });

      fail++;
    }
  }

  return NextResponse.json({ ok: true, processed: dueSubs.length, ok_count: ok, fail_count: fail });
}
