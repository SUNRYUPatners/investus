import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { anonymize } from "@/lib/analystCrypto";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI 키 없음" }, { status: 503 });

  let body: { cardBase64: string; idBase64: string; cardMime?: string; idMime?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { cardBase64, idBase64 } = body;
  if (!cardBase64 || !idBase64) {
    return NextResponse.json({ error: "명함과 신분증 이미지가 필요합니다." }, { status: 400 });
  }

  // Compute one-way hash — raw user.id is NEVER stored in the DB
  const { userHash, alias } = anonymize(user.id);
  const supabase = getAdminSupabase();

  // Block if already verified (lookup by hash, not user_id)
  const { data: existing } = await supabase
    .from("analyst_verifications")
    .select("status, alias")
    .eq("user_hash", userHash)
    .maybeSingle();

  if (existing?.status === "approved") {
    return NextResponse.json({ status: "approved", alias: existing.alias });
  }

  // Call Claude Vision
  const prompt = `다음 두 이미지를 분석해주세요.
이미지1: 명함 (business card)
이미지2: 신분증 또는 사원증 (ID card)

확인 항목:
1. 명함에 이름이 명확히 보이는가?
2. 신분증/사원증에 이름과 사진이 있는가?
3. 두 이름이 일치하는가?
4. 두 이미지 모두 실제 문서처럼 보이는가?

JSON 형식으로만 응답 (다른 텍스트 없이):
{"approved":true/false,"name":"확인된 이름 또는 null","reason":"한국어로 판정 이유 1문장"}`;

  const visionRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    signal: AbortSignal.timeout(25_000),
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: body.cardMime ?? "image/jpeg", data: cardBase64 } },
          { type: "image", source: { type: "base64", media_type: body.idMime   ?? "image/jpeg", data: idBase64  } },
          { type: "text", text: prompt },
        ],
      }],
    }),
  });

  if (!visionRes.ok) {
    return NextResponse.json({ error: "AI 분석 중 오류가 발생했습니다." }, { status: 502 });
  }
  const visionData = await visionRes.json() as { content?: { text: string }[]; error?: { message: string } };
  if (visionData.error) {
    return NextResponse.json({ error: "AI 분석 중 오류가 발생했습니다." }, { status: 500 });
  }

  let aiResult: { approved: boolean; name: string | null; reason: string };
  try {
    const text = visionData.content?.[0]?.text ?? "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    aiResult = JSON.parse(jsonMatch?.[0] ?? "{}");
  } catch {
    aiResult = { approved: false, name: null, reason: "AI 응답 파싱 실패 — 이미지를 다시 시도해주세요." };
  }

  const status      = aiResult.approved ? "approved" : "rejected";
  const approvedAlias = aiResult.approved ? alias : null;

  // Store ONLY user_hash (one-way), never raw user_id or real name
  await supabase.from("analyst_verifications").upsert({
    user_hash:  userHash,
    status,
    alias:      approvedAlias,
    ai_reason:  aiResult.reason ?? "",
    // ai_result.name is intentionally NOT stored — no PII in DB
  }, { onConflict: "user_hash" });

  return NextResponse.json({ status, alias: approvedAlias, reason: aiResult.reason });
}
