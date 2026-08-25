import { NextRequest, NextResponse } from "next/server";
import { notifyAdminEmail } from "@/lib/adminNotify";
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

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const category = String(body.category ?? "").slice(0, 40);
  const message = String(body.message ?? "").trim();
  const sender = String(body.sender ?? "익명").slice(0, 200);

  if (message.length < 5 || message.length > 500) {
    return NextResponse.json({ error: "내용을 5~500자로 입력해주세요." }, { status: 400 });
  }

  await notifyAdminEmail(
    `[Investus 피드백] ${category || "기타"}`,
    `<p>분류: ${escapeHtml(category)}</p><p>보낸이: ${escapeHtml(sender)}</p><p>${escapeHtml(message)}</p>`,
    `분류: ${category}\n보낸이: ${sender}\n\n${message}`,
  );

  return NextResponse.json({ ok: true });
}
