import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json({ ok: false, message: "필수 파라미터가 누락되었습니다." }, { status: 400 });
    }

    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ ok: false, message: "결제 설정이 완료되지 않았습니다." }, { status: 500 });
    }

    const encoded = Buffer.from(`${secretKey}:`).toString("base64");

    const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method:  "POST",
      headers: {
        Authorization:  `Basic ${encoded}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, message: data.message ?? "결제 확인에 실패했습니다." },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true, payment: data });
  } catch {
    return NextResponse.json({ ok: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
