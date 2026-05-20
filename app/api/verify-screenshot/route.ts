import { NextRequest, NextResponse } from "next/server";
import { getSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

async function isBrokerageScreenshot(base64: string, mimeType: string): Promise<boolean> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return true;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mimeType, data: base64 },
            },
            {
              type: "text",
              text: "Does this image show a brokerage, securities, or investment account app screenshot (e.g. account balance, holdings, trade history, stock chart)? Answer only YES or NO.",
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) return false; // API error → reject (safe default)
  const data = await res.json() as { content?: { text: string }[] };
  const answer = (data.content?.[0]?.text ?? "").trim().toUpperCase();
  return answer.startsWith("YES");
}

// POST /api/verify-screenshot  — requires JWT
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

  // Image size guard (~3 MB base64 ≈ 2.25 MB actual)
  if (imageBase64.length > 4_000_000) {
    return NextResponse.json({ error: "파일 크기가 너무 큽니다. (최대 3 MB)" }, { status: 413 });
  }

  const safeMime = SUPPORTED_TYPES.includes(mimeType ?? "") ? mimeType! : "image/jpeg";

  let approved = false;
  try {
    approved = await isBrokerageScreenshot(imageBase64, safeMime);
  } catch {
    approved = false; // failure → reject (safe default)
  }

  if (!approved) {
    return NextResponse.json({
      approved: false,
      message: "증권사 계좌 화면이 아닌 것 같습니다. 계좌 잔고나 보유 종목 화면을 캡쳐해주세요.",
    });
  }

  // Use server-verified email from JWT — not from client body
  const { error } = await getSupabase()
    .from("creator_verifications")
    .upsert(
      {
        phone:        authUser.email,
        nickname:     authUser.email.split("@")[0],
        avatar:       "",
        bio:          "스크린샷 자동 인증",
        status:       "approved",
        submitted_at: new Date().toISOString(),
        reviewed_at:  new Date().toISOString(),
      },
      { onConflict: "phone" }
    );

  if (error) {
    return NextResponse.json({ error: "승인 처리 중 오류가 발생했습니다." }, { status: 500 });
  }

  return NextResponse.json({ approved: true });
}
