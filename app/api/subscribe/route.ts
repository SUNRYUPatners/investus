import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getUserFromRequest } from "@/lib/supabase";
import { SUBSCRIPTION, formatSubPrice } from "@/lib/subscription";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { name, email, userId } = body as Record<string, string>;
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }
  if (authUser.email.toLowerCase() !== email.trim().toLowerCase()) {
    return NextResponse.json({ error: "이메일 불일치" }, { status: 403 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Investus <onboarding@resend.dev>",
        to: ["sunryupatners@gmail.com"],
        subject: `[Investus Pro] 구독 신청 — ${name.trim()} · ${formatSubPrice()}`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#0a0c10;color:#e5e7eb;border-radius:12px">
            <h2 style="color:#00e5a0;margin-top:0">💎 Investus Pro 구독 신청</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#9ca3af;width:90px">입금자명</td><td style="padding:8px 0;font-weight:bold">${name.trim()}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">이메일</td><td style="padding:8px 0">${email.trim()}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">User ID</td><td style="padding:8px 0;font-size:12px">${userId ?? authUser.id}</td></tr>
              <tr><td style="padding:8px 0;color:#9ca3af">금액</td><td style="padding:8px 0;color:#00e5a0;font-weight:bold">${formatSubPrice()}/${SUBSCRIPTION.periodLabel}</td></tr>
            </table>
            <p style="font-size:12px;color:#6b7280;margin-top:16px">
              입금 확인 후 Supabase Auth → 해당 유저 user_metadata에<br/>
              <code style="color:#00e5a0">investus_pro: true</code> 를 설정하거나<br/>
              <code>POST /api/admin/grant-pro</code> 로 활성화하세요.
            </p>
          </div>
        `,
      });
    } catch (e) {
      console.error("subscribe email error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
