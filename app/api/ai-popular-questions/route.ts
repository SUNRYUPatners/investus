import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
export const revalidate = 300; // 5분 캐시

// 데이터가 충분히 쌓이기 전까지 사용할 기본 질문 목록
const FALLBACK_QUESTIONS = [
  "지금 매수 타이밍이야?",
  "최근 주가 하락 이유가 뭐야?",
  "목표주가 얼마로 보면 돼?",
];

let _redis: Redis | null = null;
function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

export async function GET() {
  try {
    const redis = getRedis();
    if (!redis) return NextResponse.json({ questions: FALLBACK_QUESTIONS });

    // 상위 6개 가져와서 길이 필터 후 3개 선택
    const raw = await redis.zrange("ai_popular_questions", 0, 5, { rev: true });
    const questions = (raw as string[])
      .filter((q) => q.length >= 5 && q.length <= 60)
      .slice(0, 3);

    return NextResponse.json({
      questions: questions.length >= 3 ? questions : FALLBACK_QUESTIONS,
    });
  } catch {
    return NextResponse.json({ questions: FALLBACK_QUESTIONS });
  }
}
