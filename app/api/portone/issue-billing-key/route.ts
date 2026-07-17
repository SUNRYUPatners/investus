/**
 * 브라우저에서 PortOne 카드 등록 성공 후 호출.
 * - billingKey를 DB에 저장
 * - 즉시 첫 회 결제 실행
 * - Pro/Creator 구독 활성화
 */
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, getAdminSupabase } from "@/lib/supabase";
import { chargeWithBillingKey, makePaymentId, nextBillingDate } from "@/lib/portone";
import { SUBSCRIPTION } from "@/lib/subscription";

type Body = {
  billingKey: string;
  planKind: "pro" | "creator";
  planRef?: string;      // creator subscription 시 creator id
  priceKrw?: number;      // creator price 오버라이드 (없으면 Pro 기본가)
  customerName?: string;
};

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인 필요" }, { status: 401 });

  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { billingKey, planKind, planRef, priceKrw, customerName } = body;
  if (!billingKey || !planKind) {
    return NextResponse.json({ error: "billingKey/planKind 누락" }, { status: 400 });
  }
  if (planKind === "creator" && !planRef) {
    return NextResponse.json({ error: "creator 구독은 planRef 필요" }, { status: 400 });
  }

  const amount = planKind === "pro" ? SUBSCRIPTION.priceKrw : Math.max(1, priceKrw ?? 0);
  if (planKind === "creator" && amount < 100) {
    return NextResponse.json({ error: "가격이 유효하지 않음" }, { status: 400 });
  }

  const paymentId = makePaymentId(planKind === "pro" ? "PRO" : "CRT", user.id);
  const orderName = planKind === "pro"
    ? `Investus Pro 월 구독`
    : `Investus 크리에이터 구독 (${planRef})`;

  // 1) 즉시 첫 회 결제
  try {
    await chargeWithBillingKey({
      billingKey,
      paymentId,
      orderName,
      amountKrw: amount,
      customer: { id: user.id, email: user.email, name: customerName },
    });
  } catch (e) {
    const msg = (e as Error).message ?? "결제 실패";
    return NextResponse.json({ error: `첫 결제 실패: ${msg}` }, { status: 402 });
  }

  // 2) 구독 레코드 upsert
  const sb = getAdminSupabase();
  const now = new Date();
  const next = nextBillingDate(now);

  const { data: subUp, error: subErr } = await sb
    .from("portone_subscriptions")
    .upsert({
      user_id:         user.id,
      user_email:      user.email,
      plan_kind:       planKind,
      plan_ref:        planRef ?? null,
      billing_key:     billingKey,
      status:          "active",
      price_krw:       amount,
      next_billing_at: next.toISOString(),
      last_charged_at: now.toISOString(),
      last_payment_id: paymentId,
      cancelled_at:    null,
    }, { onConflict: "user_id,plan_kind,plan_ref" })
    .select("id")
    .single();

  if (subErr) {
    return NextResponse.json({ error: `구독 저장 실패: ${subErr.message}` }, { status: 500 });
  }

  // 3) 결제 로그
  await sb.from("portone_payments").insert({
    user_id:         user.id,
    user_email:      user.email,
    payment_id:      paymentId,
    subscription_id: subUp?.id ?? null,
    item_kind:       planKind,
    item_ref:        planRef ?? null,
    amount_krw:      amount,
    status:          "paid",
    paid_at:         now.toISOString(),
  });

  // 4) Pro 사용자 메타데이터 활성화
  if (planKind === "pro") {
    try {
      await sb.auth.admin.updateUserById(user.id, {
        user_metadata: { investus_pro: true },
      });
    } catch (e) {
      console.error("investus_pro 메타 설정 실패:", e);
    }
  }

  return NextResponse.json({
    ok: true,
    paymentId,
    subscriptionId: subUp?.id,
    nextBillingAt: next.toISOString(),
  });
}
