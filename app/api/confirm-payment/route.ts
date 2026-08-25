import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";

export const maxDuration = 15;

const BOOK_AMOUNT = 19_900;
const ipLog = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipLog.get(ip);
  if (!rec || now > rec.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (rec.count >= 8) return false;
  rec.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, message: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  const user = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }

  try {
    const { paymentKey, orderId, amount } = await req.json();

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json({ ok: false, message: "필수 파라미터가 누락되었습니다." }, { status: 400 });
    }

    if (Number(amount) !== BOOK_AMOUNT) {
      return NextResponse.json({ ok: false, message: "결제 금액이 올바르지 않습니다." }, { status: 400 });
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
      signal: AbortSignal.timeout(10_000),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, message: data.message ?? "결제 확인에 실패했습니다." },
        { status: res.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
