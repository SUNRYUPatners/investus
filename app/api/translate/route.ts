import { NextRequest, NextResponse } from "next/server";

const ipLog = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipLog.get(ip);
  if (!rec || now > rec.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (rec.count >= 20) return false;
  rec.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!checkRateLimit(ip)) return NextResponse.json({ error: "too many requests" }, { status: 429 });

  try {
    const { text, targetLang } = await req.json() as { text: string; targetLang: string };
    if (!text || !targetLang) return NextResponse.json({ error: "missing params" }, { status: 400 });
    if (text.length > 2000 || targetLang.length > 8) {
      return NextResponse.json({ error: "too long" }, { status: 400 });
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) return NextResponse.json({ error: "translate failed" }, { status: 502 });

    const data = await res.json() as Array<Array<Array<string>>>;
    const translated = data[0]?.map((item) => item[0]).join("") ?? text;
    return NextResponse.json({ translated });
  } catch {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
