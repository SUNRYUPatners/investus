import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";

const ipLog = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipLog.get(ip);
  if (!rec || now > rec.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (rec.count >= 10) return false;
  rec.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (!checkRateLimit(ip)) return NextResponse.json({ ok: false }, { status: 429 });

    const user = await getUserFromRequest(req);
    if (!user) return NextResponse.json({ ok: false }, { status: 401 });

    const body = await req.json() as {
      name?: string;
      email?: string;
      paid?: boolean;
      paymentId?: string;
    };
    const { name, paid, paymentId } = body;
    if (!name?.trim()) return NextResponse.json({ ok: false }, { status: 400 });

    const webhook = process.env.ORDER_NOTIFY_WEBHOOK;
    if (webhook) {
      const statusLine = paid
        ? `카드결제 완료 (paymentId: ${paymentId ?? "-"})`
        : "계좌이체 대기중(레거시)";
      await fetch(webhook, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          text: `전자책 구매\n이름: ${name.trim()}\n계정: ${user.email}\n금액: ₩19,900\n${statusLine}`,
        }),
      }).catch(() => {});
    }

    console.log(`[book-order] name=${name.trim()} user=${user.id} paid=${!!paid}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
