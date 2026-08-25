import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminSupabase } from "@/lib/supabase";
import { escapeHtml } from "@/lib/htmlEscape";

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
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { name, phone, level, amount, message } = body as Record<string, string>;

  if (!name?.trim() || !phone?.trim() || !level?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  if (name.trim().length > 50 || phone.trim().length > 100 || level.trim().length > 250) {
    return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
  }
  if ((amount?.trim().length ?? 0) > 100 || (message?.trim().length ?? 0) > 500) {
    return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
  }

  const { error } = await getAdminSupabase().from("edu_applications").insert([{
    name:    name.trim(),
    phone:   phone.trim(),
    level:   level.trim(),
    amount:  amount?.trim() ?? null,
    message: message?.trim() ?? null,
  }]);

  if (error) {
    console.error("edu_apply insert error:", error.message);
    return NextResponse.json({ error: "저장 실패. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Investus <onboarding@resend.dev>",
        to:   ["sunryupatners@gmail.com"],
        subject: `[Investus] 수강 신청 — ${name.trim().slice(0, 40)}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#07090e;color:#f3f0e8;border-radius:12px">
            <h2 style="color:#b38f38;margin-top:0">새 수강 신청이 들어왔습니다</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#9ca3af;width:80px">이름</td><td style="padding:8px 0;color:#e5e7eb;font-weight:bold">${escapeHtml(name.trim())}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">연락처</td><td style="padding:8px 0;color:#e5e7eb">${escapeHtml(phone.trim())}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">과정/경력</td><td style="padding:8px 0;color:#e5e7eb">${escapeHtml(level.trim())}</td></tr>
              ${amount?.trim() ? `<tr><td style="padding:8px 0;color:#9ca3af">투자 규모</td><td style="padding:8px 0;color:#e5e7eb">${escapeHtml(amount.trim())}</td></tr>` : ""}
              ${message?.trim() ? `<tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">문의</td><td style="padding:8px 0;color:#a78bfa">${escapeHtml(message.trim())}</td></tr>` : ""}
            </table>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("email send error:", emailErr);
    }
  }

  return NextResponse.json({ ok: true });
}
