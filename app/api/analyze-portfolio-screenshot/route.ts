import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export type PortfolioAnalysis =
  | {
      approved: true;
      currency: "KRW" | "USD";
      totalValue: string;
      totalReturnPct: number | null;
      scale: string;
      holdings: Array<{
        ticker: string | null;
        name: string;
        value: string;
        returnPct: number | null;
        allocation: number | null;
      }>;
    }
  | { approved: false; reason: string };

export async function POST(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  let body: { imageBase64?: string; mimeType?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { imageBase64, mimeType } = body;
  if (!imageBase64) {
    return NextResponse.json({ error: "이미지가 필요합니다." }, { status: 400 });
  }
  if (imageBase64.length > 6_000_000) {
    return NextResponse.json(
      { error: "파일 크기가 너무 큽니다. (최대 4.5 MB)" },
      { status: 413 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI 기능 미설정" }, { status: 503 });
  }

  const safeMime = SUPPORTED_TYPES.includes(mimeType ?? "") ? mimeType! : "image/jpeg";

  const prompt = `이 이미지는 증권사/투자 앱 화면입니다. 아래 정보를 분석해주세요.

판단 기준:
- 유효한 화면: 보유종목 목록, 계좌 잔고, 수익률이 표시된 MTS/HTS 화면
- 무효: 뉴스, SNS, 일반 사진, 캡처가 아닌 화면

추출 항목:
1. 유효 여부 (true/false)
2. 통화: "KRW" 또는 "USD"
3. 총 평가금액 (예: "1.2억원", "8,500만원", "$12,500")
4. 전체 수익률 % (표시된 경우, 없으면 null)
5. 투자 규모 레이블:
   - KRW: "1,000만원 미만" / "1,000만~5,000만" / "5,000만~1억" / "1억~5억" / "5억 이상"
   - USD: "$10K 미만" / "$10K~$50K" / "$50K~$200K" / "$200K 이상"
6. 보유 종목 목록 (각각):
   - ticker: 미국주식 티커(예:AAPL), 한국주식은 null
   - name: 종목명
   - value: 평가금액 문자열
   - returnPct: 수익률 % (없으면 null)
   - allocation: 비중 % (없으면 계산 가능 시 계산, 아니면 null)

순수 JSON으로만 응답 (마크다운, 설명 없이):

유효한 경우:
{"approved":true,"currency":"KRW","totalValue":"1.2억원","totalReturnPct":23.5,"scale":"1억~5억","holdings":[{"ticker":"NVDA","name":"엔비디아","value":"4,200만원","returnPct":52.3,"allocation":35.0},{"ticker":null,"name":"삼성전자","value":"2,100만원","returnPct":-3.2,"allocation":17.5}]}

유효하지 않은 경우:
{"approved":false,"reason":"증권사 계좌 화면이 아닙니다. 보유 종목이나 잔고가 표시된 화면을 업로드해주세요."}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      signal: AbortSignal.timeout(25_000),
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: safeMime, data: imageBase64 },
              },
              { type: "text", text: prompt },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "AI 처리 중 오류가 발생했습니다." },
        { status: 502 }
      );
    }

    const data = (await res.json()) as { content?: { text: string }[] };
    const raw = (data.content?.[0]?.text ?? "").trim();

    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({
        approved: false,
        reason: "분석 결과를 읽을 수 없습니다. 다시 시도해주세요.",
      } satisfies PortfolioAnalysis);
    }

    const result = JSON.parse(match[0]) as PortfolioAnalysis;
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "분석 중 오류가 발생했습니다." }, { status: 500 });
  }
}
