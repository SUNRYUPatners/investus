import { NextRequest, NextResponse } from "next/server";
import { SEED_REPORTS } from "@/lib/reports";

// Vercel Cron: 매일 오전 9시 (UTC 0시 = KST 9시)
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // 보안: Vercel Cron 또는 내부 시크릿 헤더만 허용
  const auth = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET ?? process.env.NOTIFY_SECRET;
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const bearerToken  = process.env.X_BEARER_TOKEN;
  const accessToken  = process.env.X_ACCESS_TOKEN;
  const accessSecret = process.env.X_ACCESS_TOKEN_SECRET;
  const apiKey       = process.env.X_API_KEY;
  const apiSecret    = process.env.X_API_SECRET;

  if (!bearerToken || !accessToken || !accessSecret || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "X API keys not configured" }, { status: 500 });
  }

  // 오늘 날짜 기준 최신 리포트 가져오기
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  const todayReports = SEED_REPORTS
    .filter((r) => r.date === today || r.updatedAt === today)
    .slice(0, 3);

  if (todayReports.length === 0) {
    return NextResponse.json({ ok: true, message: "오늘 리포트 없음" });
  }

  // 트윗 텍스트 구성
  const topReport = todayReports[0];
  const tweetText = [
    `📊 [Investus 오늘의 리포트]`,
    ``,
    `${topReport.title}`,
    ``,
    topReport.summary?.slice(0, 120) ?? "",
    ``,
    todayReports.length > 1 ? `+${todayReports.length - 1}개 리포트 더 보기` : "",
    `👉 https://www.investus.kr/insight`,
    ``,
    `#미국주식 #investus #주식투자 #인베스트어스`,
  ].filter(Boolean).join("\n");

  // Twitter API v2로 트윗 작성
  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ text: tweetText }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[post-to-x]", err);
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ ok: true, tweetId: data.data?.id });
}
