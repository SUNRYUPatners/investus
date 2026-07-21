/**
 * 일시불 결제 확인 — 전자책 등 단건 결제 후 서버 검증.
 * 로그인 사용자뿐 아니라 게스트(이메일) 결제도 허용.
 */
import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, getAdminSupabase } from "@/lib/supabase";
import { getPortOne } from "@/lib/portone";

type Body = {
  paymentId: string;
  expectedAmountKrw: number;
  itemKind: "ebook" | "pro" | "creator";
  itemRef?: string;
  customerEmail?: string;
  customerName?: string;
};

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);

  let body: Body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { paymentId, expectedAmountKrw, itemKind, itemRef, customerEmail, customerName } = body;
  if (!paymentId || !expectedAmountKrw || !itemKind) {
    return NextResponse.json({ error: "필수 파라미터 누락" }, { status: 400 });
  }

  // 구독/크리에이터는 로그인 필수. 전자책은 게스트 허용.
  if (itemKind !== "ebook" && !user) {
    return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
  }

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

  const sb = getAdminSupabase();
  await sb.from("portone_payments").upsert({
    user_id:     user?.id ?? null,
    user_email:  user?.email ?? customerEmail ?? null,
    payment_id:  paymentId,
    item_kind:   itemKind,
    item_ref:    itemRef ?? null,
    amount_krw:  paidAmount,
    status:      "paid",
    pg_provider: (payment as { channel?: { pgProvider?: string } }).channel?.pgProvider ?? null,
    paid_at:     new Date().toISOString(),
    raw_event:   customerName ? { customerName } : null,
  }, { onConflict: "payment_id" });

  return NextResponse.json({ ok: true, paymentId, amount: paidAmount });
}
