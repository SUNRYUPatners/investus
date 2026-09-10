import { NextRequest, NextResponse } from "next/server";
import {
  addNewsletterEmail,
  isValidEmail,
  normalizeEmail,
  notifyAdminNewSubscriber,
  removeNewsletterEmail,
  verifyUnsubscribeToken,
  type NewsletterLocale,
} from "@/lib/newsletter";

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

  const { email, locale, website, consent } = body as Record<string, unknown>;
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ ok: true });
  }
  if (consent !== true) {
    return NextResponse.json({ error: "수신 동의가 필요합니다." }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(normalizeEmail(email))) {
    return NextResponse.json({ error: "이메일 형식을 확인해 주세요." }, { status: 400 });
  }

  const loc: NewsletterLocale = locale === "en" ? "en" : "ko";
  const addr = normalizeEmail(email);
  const result = await addNewsletterEmail(addr, loc);
  if (result === "added") {
    try {
      await notifyAdminNewSubscriber(addr, loc);
    } catch (e) {
      console.error("newsletter admin notify:", e);
    }
  }
  return NextResponse.json({ ok: true, exists: result === "exists" });
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") ?? "";
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const addr = normalizeEmail(email);
  if (!isValidEmail(addr) || !verifyUnsubscribeToken(addr, token)) {
    return new NextResponse("수신거부 링크가 올바르지 않습니다.", {
      status: 400,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  await removeNewsletterEmail(addr);
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><title>Investus</title><body style="font-family:sans-serif;padding:40px;background:#0a0c10;color:#e5e7eb"><p>아침 브리핑 메일 수신이 해제되었습니다.</p><p><a href="https://www.investus.kr" style="color:#00e5a0">Investus로 돌아가기</a></p></body>`,
    { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}
