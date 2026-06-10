import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json() as { text: string; targetLang: string };
    if (!text || !targetLang) return NextResponse.json({ error: "missing params" }, { status: 400 });

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
