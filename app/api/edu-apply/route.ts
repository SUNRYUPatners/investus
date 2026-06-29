import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
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

  if (name.trim().length > 50 || phone.trim().length > 20 || level.trim().length > 100) {
    return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
  }
  if ((amount?.trim().length ?? 0) > 100 || (message?.trim().length ?? 0) > 500) {
    return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
  }

  const supabase = createClient(url, key);

  const { error } = await supabase.from("edu_applications").insert([{
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

  // 이메일 알림 (RESEND_API_KEY 설정 시 활성화)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Investus <onboarding@resend.dev>",
        to:   ["sunryupatners@gmail.com"],
        subject: `[Investus] 수강 신청 — ${name.trim()}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#0a0c10;color:#e5e7eb;border-radius:12px">
            <h2 style="color:#d4af37;margin-top:0">📚 새 수강 신청이 들어왔습니다</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#9ca3af;width:80px">이름</td><td style="padding:8px 0;color:#e5e7eb;font-weight:bold">${name.trim()}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">연락처</td><td style="padding:8px 0;color:#e5e7eb">${phone.trim()}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">과정/경력</td><td style="padding:8px 0;color:#e5e7eb">${level.trim()}</td></tr>
              ${amount?.trim() ? `<tr><td style="padding:8px 0;color:#9ca3af">투자 규모</td><td style="padding:8px 0;color:#e5e7eb">${amount.trim()}</td></tr>` : ""}
              ${message?.trim() ? `<tr><td style="padding:8px 0;color:#9ca3af;vertical-align:top">문의</td><td style="padding:8px 0;color:#a78bfa">${message.trim()}</td></tr>` : ""}
            </table>
            <hr style="border:none;border-top:1px solid #1e2028;margin:20px 0"/>
            <p style="font-size:12px;color:#6b7280;margin:0">
              신청자 목록 전체 보기 →
              <a href="https://investus.kr/admin/applications" style="color:#d4af37">investus.kr/admin/applications</a>
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      // 이메일 실패는 신청 자체를 막지 않음
      console.error("email send error:", emailErr);
    }
  }

  return NextResponse.json({ ok: true });
}
