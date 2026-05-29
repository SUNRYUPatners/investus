import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json() as { name?: string; email?: string };
    if (!name?.trim()) return NextResponse.json({ ok: false }, { status: 400 });

    // 슬랙/이메일 웹훅이 없으면 콘솔 로그만
    const webhook = process.env.ORDER_NOTIFY_WEBHOOK;
    if (webhook) {
      await fetch(webhook, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          text: `📚 전자책 구매 신청\n이름: ${name.trim()}\n이메일: ${email?.trim() || "미입력"}\n금액: ₩19,900\n계좌이체 대기중`,
        }),
      }).catch(() => {});
    }

    console.log(`[book-order] name=${name.trim()} email=${email ?? "-"}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
