import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      paid?: boolean;
      paymentId?: string;
    };
    const { name, email, paid, paymentId } = body;
    if (!name?.trim()) return NextResponse.json({ ok: false }, { status: 400 });

    const webhook = process.env.ORDER_NOTIFY_WEBHOOK;
    if (webhook) {
      const statusLine = paid
        ? `✅ 카드결제 완료 (paymentId: ${paymentId ?? "-"})`
        : "계좌이체 대기중(레거시)";
      await fetch(webhook, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          text: `📚 전자책 구매\n이름: ${name.trim()}\n이메일: ${email?.trim() || "미입력"}\n금액: ₩19,900\n${statusLine}`,
        }),
      }).catch(() => {});
    }

    console.log(`[book-order] name=${name.trim()} email=${email ?? "-"} paid=${!!paid} paymentId=${paymentId ?? "-"}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
