/**
 * 브라우저에서 PortOne 빌링키 발급 성공 후 호출.
 * - billingKey를 DB에 저장
 * - 즉시 첫 회 결제 실행
 * - Pro/Creator 구독 활성화
 * - Pro는 planPeriod(month|year) 지원
 */
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, getAdminSupabase } from "@/lib/supabase";
import { chargeWithBillingKey, makePaymentId, nextBillingDate } from "@/lib/portone";
import { planPriceKrw, type SubPeriod } from "@/lib/subscription";

type Body = {
  billingKey: string;
  planKind: "pro" | "creator";
  planPeriod?: SubPeriod; // pro only — month | year
  planRef?: string;       // creator subscription 시 creator id
  priceKrw?: number;      // creator price 오버라이드
  customerName?: string;
  payMethod?: string;
};

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인 필요" }, { status: 401 });

  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { billingKey, planKind, planRef, priceKrw, customerName, payMethod } = body;
  const planPeriod: SubPeriod = body.planPeriod === "year" ? "year" : "month";

  if (!billingKey || !planKind) {
    return NextResponse.json({ error: "billingKey/planKind 누락" }, { status: 400 });
  }
  if (planKind === "creator" && !planRef) {
    return NextResponse.json({ error: "creator 구독은 planRef 필요" }, { status: 400 });
  }

  const amount = planKind === "pro"
    ? planPriceKrw(planPeriod)
    : Math.max(1, priceKrw ?? 0);
  if (planKind === "creator" && amount < 100) {
    return NextResponse.json({ error: "가격이 유효하지 않음" }, { status: 400 });
  }

  const monthsAhead = planKind === "pro" && planPeriod === "year" ? 12 : 1;
  // pro 는 plan_ref 에 period 저장 (월/연 구분 + unique 제약 호환)
  const storedPlanRef = planKind === "pro" ? planPeriod : (planRef ?? null);

  const paymentId = makePaymentId(planKind === "pro" ? "PRO" : "CRT", user.id);
  const orderName = planKind === "pro"
    ? `Investus Pro ${planPeriod === "year" ? "연간" : "월간"} 구독`
    : `Investus 크리에이터 구독 (${planRef})`;

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

  const sb = getAdminSupabase();
  const now = new Date();
  const next = nextBillingDate(now, monthsAhead);

  const { data: subUp, error: subErr } = await sb
    .from("portone_subscriptions")
    .upsert({
      user_id:         user.id,
      user_email:      user.email,
      plan_kind:       planKind,
      plan_ref:        storedPlanRef,
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

  await sb.from("portone_payments").insert({
    user_id:         user.id,
    user_email:      user.email,
    payment_id:      paymentId,
    subscription_id: subUp?.id ?? null,
    item_kind:       planKind,
    item_ref:        storedPlanRef,
    amount_krw:      amount,
    status:          "paid",
    pg_provider:     payMethod ?? null,
    paid_at:         now.toISOString(),
  });

  if (planKind === "pro") {
    try {
      await sb.auth.admin.updateUserById(user.id, {
        user_metadata: {
          investus_pro: true,
          investus_pro_period: planPeriod,
        },
      });
    } catch (e) {
      console.error("investus_pro 메타 설정 실패:", e);
    }
  }

  return NextResponse.json({
    ok: true,
    paymentId,
    subscriptionId: subUp?.id,
    planPeriod,
    nextBillingAt: next.toISOString(),
  });
}
