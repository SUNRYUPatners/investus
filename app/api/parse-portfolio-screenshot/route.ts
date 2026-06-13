import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export type ParsedHolding = {
  symbol:  string;
  name?:   string;
  shares:  number;
  avgCost: number | null; // null when price is in KRW or undetected
};

export async function POST(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: { imageBase64?: string; mimeType?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { imageBase64, mimeType } = body;
  if (!imageBase64) {
    return NextResponse.json({ error: "이미지가 필요합니다." }, { status: 400 });
  }
  if (imageBase64.length > 6_000_000) {
    return NextResponse.json({ error: "파일 크기가 너무 큽니다. (최대 4.5 MB)" }, { status: 413 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI 기능 미설정" }, { status: 503 });
  }

  const safeMime = SUPPORTED_TYPES.includes(mimeType ?? "") ? mimeType! : "image/jpeg";

  const prompt = `This is a screenshot from a brokerage or investment account app.

Extract ALL stock holdings visible in this image. For each holding return:
- symbol: US stock ticker (e.g. AAPL, NVDA, TSLA, SPCX). SPCX is SpaceX which IPO'd on Nasdaq on June 12, 2026 — it is a valid US stock ticker. Skip Korean stocks (KRX).
- name: company name if visible (optional)
- shares: number of shares (can be decimal, e.g. 1.5)
- avgCost: average purchase price IN US DOLLARS (USD). If the price shown is in Korean Won (₩ or 원 or KRW), set avgCost to null. If price is in USD ($), convert to a float number.

Return ONLY a valid JSON array, no explanation:
[{"symbol":"NVDA","name":"NVIDIA","shares":10,"avgCost":875.50},...]

If no US stock holdings are visible, return an empty array: []
Do not include ETF or mutual funds if the ticker is unclear.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-4-7",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: safeMime, data: imageBase64 } },
              { type: "text", text: prompt },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "AI 처리 중 오류가 발생했습니다." }, { status: 502 });
    }

    const data = await res.json() as { content?: { text: string }[] };
    const raw  = (data.content?.[0]?.text ?? "").trim();

    // Extract JSON array from response (Claude sometimes wraps it in markdown)
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) {
      return NextResponse.json({ holdings: [] });
    }

    const parsed = JSON.parse(match[0]) as Array<{
      symbol?: string; name?: string; shares?: number | string; avgCost?: number | null;
    }>;

    const holdings: ParsedHolding[] = parsed
      .filter((h) => h.symbol && typeof h.symbol === "string" && /^[A-Z]{1,5}$/.test(h.symbol.trim()))
      .map((h) => ({
        symbol:  h.symbol!.trim().toUpperCase(),
        name:    typeof h.name === "string" ? h.name : undefined,
        shares:  Math.max(0.001, parseFloat(String(h.shares ?? 1))),
        avgCost: h.avgCost != null ? Math.max(0.01, parseFloat(String(h.avgCost))) : null,
      }))
      .slice(0, 30); // max 30 holdings per screenshot

    return NextResponse.json({ holdings });
  } catch {
    return NextResponse.json({ error: "종목 인식에 실패했습니다." }, { status: 500 });
  }
}
