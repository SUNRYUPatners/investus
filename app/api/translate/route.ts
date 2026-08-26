import { NextRequest, NextResponse } from "next/server";
import { translateText } from "@/lib/translate";

const ipLog = new Map<string, { count: number; resetAt: number }>();
/** Client-side translate toggle — allow enough for a page of news, still block abuse. */
const LIMIT_PER_MIN = 120;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipLog.get(ip);
  if (!rec || now > rec.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (rec.count >= LIMIT_PER_MIN) return false;
  rec.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) return NextResponse.json({ error: "too many requests" }, { status: 429 });

  try {
    const { text, targetLang } = (await req.json()) as { text: string; targetLang: string };
    if (!text || !targetLang) return NextResponse.json({ error: "missing params" }, { status: 400 });
    if (text.length > 2000 || targetLang.length > 8) {
      return NextResponse.json({ error: "too long" }, { status: 400 });
    }

    const translated = await translateText(text, targetLang, "auto");
    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
