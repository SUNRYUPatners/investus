import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

// Upstash Redis로 IP당 하루 30회 영속 rate limit
let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

// Redis 없을 때 in-memory 폴백 (로컬 개발용)
const ipLog = new Map<string, { count: number; resetAt: number }>();
const DAILY_LIMIT = 30;

async function checkRateLimit(ip: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    const key = `ai_rl:${ip}`;
    const count = await redis.incr(key).catch(() => null);
    if (count === null) return false; // Redis 오류 시 거부 (비용 보호)
    if (count === 1) {
      // 자정까지 TTL 계산 (KST)
      const now = new Date();
      const kst = new Date(now.getTime() + 9 * 3600_000);
      const secondsUntilMidnight = (24 - kst.getHours()) * 3600 - kst.getMinutes() * 60 - kst.getSeconds();
      await redis.expire(key, secondsUntilMidnight).catch(() => {});
    }
    return count <= DAILY_LIMIT;
  }
  // in-memory fallback
  const now = Date.now();
  const rec = ipLog.get(ip);
  if (!rec || now > rec.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + 86_400_000 });
    return true;
  }
  if (rec.count >= DAILY_LIMIT) return false;
  rec.count++;
  return true;
}

const STOCK_CONTEXT: Record<string, string> = {
  NVDA:  "NVIDIA — AI GPU 시장 1위, 블랙웰·GB200 데이터센터 수요",
  TSLA:  "Tesla — FSD 자율주행, 기가상하이 생산, Cybercab 로봇택시",
  AAPL:  "Apple — iPhone, AI 기능, 서비스 매출, 애플 인텔리전스",
  MSFT:  "Microsoft — Azure 클라우드, Copilot AI, OpenAI 파트너십",
  META:  "Meta — AI 광고 플랫폼, Ray-Ban 스마트글래스, LLaMA 오픈소스",
  AMZN:  "Amazon — AWS 클라우드 1위, 물류 자동화, Alexa AI",
  GOOGL: "Alphabet/Google — AI 검색, GCP, YouTube, Gemini 모델",
  PLTR:  "Palantir — AIP 플랫폼, 정부·민간 AI 계약, DOGE 정부효율화",
  AMD:   "AMD — MI300X AI 가속기, EPYC 서버 CPU, 데이터센터 점유율",
  AVGO:  "Broadcom — AI 맞춤칩(ASIC), 네트워킹, VMware 통합",
  COIN:  "Coinbase — 미국 1위 암호화폐 거래소, CLARITY Act 수혜",
  SMCI:  "Super Micro Computer — AI 서버 랙 솔루션, NVIDIA 파트너",
  RKLB:  "Rocket Lab — Electron 소형위성 발사, Neutron 개발 중",
  IONQ:  "IonQ — 이온트랩 양자컴퓨터, 정부 계약, 클라우드 접근",
  CEG:   "Constellation Energy — 원자력 에너지, AI 데이터센터 전력 공급",
};

const ALLOWED_ORIGINS = [
  "https://investus.kr",
  "https://www.investus.kr",
  "https://investus-chi.vercel.app",
  "http://localhost:3000",
];

export async function POST(req: NextRequest) {
  // Block requests from outside our domain (default-deny)
  const origin  = req.headers.get("origin")  ?? "";
  const referer = req.headers.get("referer") ?? "";
  const isAllowed = ALLOWED_ORIGINS.some((o) => origin.startsWith(o) || referer.startsWith(o));
  if (!isAllowed) {
    return NextResponse.json({ answer: "잘못된 요청입니다." }, { status: 403 });
  }

  // Server-side IP rate limit (Redis 영속)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ answer: "일일 요청 한도를 초과했습니다. 내일 자정에 초기화됩니다." }, { status: 429 });
  }

  let body: { question?: string; symbol?: string } = {};
  try { body = await req.json(); } catch { return NextResponse.json({ answer: "잘못된 요청입니다." }, { status: 400 }); }
  const question = String(body.question ?? "").slice(0, 500);
  const symbol   = String(body.symbol   ?? "").slice(0, 10).toUpperCase();
  if (!question.trim()) return NextResponse.json({ answer: "질문을 입력해주세요." });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      answer: "AI 기능을 사용하려면 ANTHROPIC_API_KEY 환경변수를 설정해주세요.\n\nVercel 대시보드 → Settings → Environment Variables에 추가하세요.",
    });
  }

  const stockInfo = STOCK_CONTEXT[symbol] ?? `${symbol} 미국 주식`;

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric", weekday: "long",
  });

  const system = `당신은 한국 서학개미(미국 주식 개인 투자자)를 위한 투자 정보 도우미입니다.
오늘 날짜: ${today}
현재 사용자가 보고 있는 종목: ${symbol} (${stockInfo})

답변 규칙:
- 항상 한국어로 간결하게 답변 (3~5문장 이내)
- 투자 권유가 아닌 객관적 정보 제공만 허용 (자본시장법·SEC 규정 준수)
- 수익 보장·예측 발언 절대 금지
- 특정 매수·매도 타이밍 제시 금지 ("지금 사세요", "지금 파세요" 등 금지)
- 구체적 목표주가(Target Price) 직접 제시 금지 — 애널리스트 컨센서스 인용은 가능
- "○% 수익 가능", "○달러까지 오를 것" 같은 수익 예측 금지
- 시장 상황·뉴스 관련 질문엔 알고 있는 최신 정보 기반 사실 전달
- 포트폴리오 질문 시 일반적인 분산 투자 원칙 기준 설명만 제공
- 마지막에 "※ 본 답변은 투자 참고용이며 투자 권유가 아닙니다." 문구 추가 불필요 (UI에 이미 표시됨)
- 말투: 친근하고 전문적, 이모지 적절히 사용`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 450,
        system,
        messages: [{ role: "user", content: question }],
      }),
    });

    const data = await res.json() as { content?: { text: string }[]; error?: { message: string } };
    if (!res.ok || data.error) {
      return NextResponse.json({ answer: `API 오류: ${data.error?.message ?? res.status}` });
    }
    const answer = data.content?.[0]?.text ?? "응답을 가져올 수 없습니다.";

    // Log question template (symbol replaced) for popularity tracking
    const redis = getRedis();
    if (redis && question.length < 200) {
      const template = question.replace(new RegExp(symbol, "gi"), "{{sym}}").trim();
      redis.zincrby("ai_popular_questions", 1, template).catch(() => {});
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ answer: "오류가 발생했습니다. 잠시 후 다시 시도해주세요." });
  }
}
