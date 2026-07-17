/**
 * 일시불 결제 확인 — 전자책 등 단건 결제 후 서버 검증.
 * 브라우저 SDK로 결제 완료 → paymentId 받아서 이 엔드포인트로 전달 → 서버가 포트원 API에 최종 상태·금액 검증
 */
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, getAdminSupabase } from "@/lib/supabase";
import { getPortOne } from "@/lib/portone";

type Body = {
  paymentId: string;
  expectedAmountKrw: number;
  itemKind: "ebook" | "pro" | "creator";
  itemRef?: string;
};

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인 필요" }, { status: 401 });

  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { paymentId, expectedAmountKrw, itemKind, itemRef } = body;
  if (!paymentId || !expectedAmountKrw || !itemKind) {
    return NextResponse.json({ error: "필수 파라미터 누락" }, { status: 400 });
  }

  // 포트원 API로 결제 조회 및 상태 검증
  const portone = getPortOne();
  let payment;
  try {
    payment = await portone.payment.getPayment({ paymentId });
  } catch (e) {
    return NextResponse.json({ error: `조회 실패: ${(e as Error).message}` }, { status: 500 });
  }

  const status = String((payment as { status?: unknown })?.status ?? "");
  if (!payment || status !== "PAID") {
    return NextResponse.json({ error: `미완료 상태: ${status || "UNKNOWN"}` }, { status: 402 });
  }

  const paidAmount = (payment as { amount?: { total?: number } }).amount?.total ?? 0;
  if (paidAmount !== expectedAmountKrw) {
    return NextResponse.json(
      { error: `금액 불일치: 요청 ${expectedAmountKrw} vs 결제 ${paidAmount}` },
      { status: 400 }
    );
  }

  // 결제 로그 저장 (upsert — 웹훅이 먼저 도착했을 수 있음)
  const sb = getAdminSupabase();
  await sb.from("portone_payments").upsert({
    user_id:     user.id,
    user_email:  user.email,
    payment_id:  paymentId,
    item_kind:   itemKind,
    item_ref:    itemRef ?? null,
    amount_krw:  paidAmount,
    status:      "paid",
    pg_provider: (payment as { channel?: { pgProvider?: string } }).channel?.pgProvider ?? null,
    paid_at:     new Date().toISOString(),
  }, { onConflict: "payment_id" });

  return NextResponse.json({ ok: true, payment });
}
