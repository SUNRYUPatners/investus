import { NextRequest, NextResponse } from "next/server";
import { assertCronAuth } from "@/lib/cronAuth";
import { SEED_REPORTS } from "@/lib/reports";
import crypto from "crypto";

// Vercel Cron: 매일 오전 9시 (UTC 0시 = KST 9시)
export const runtime = "nodejs";
export const maxDuration = 15;

function buildOAuth1Header(
  method: string,
  url: string,
  apiKey: string,
  apiSecret: string,
  accessToken: string,
  accessTokenSecret: string,
): string {
  const params: Record<string, string> = {
    oauth_consumer_key:     apiKey,
    oauth_nonce:            crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp:        Math.floor(Date.now() / 1000).toString(),
    oauth_token:            accessToken,
    oauth_version:          "1.0",
  };

  const paramString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

  const baseString = [method.toUpperCase(), encodeURIComponent(url), encodeURIComponent(paramString)].join("&");
  const signingKey = `${encodeURIComponent(apiSecret)}&${encodeURIComponent(accessTokenSecret)}`;
  const signature  = crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");

  params.oauth_signature = signature;

  return "OAuth " + Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
    .join(", ");
}

export async function GET(req: NextRequest) {
  const denied = assertCronAuth(req);
  if (denied) return denied;

  const accessToken  = process.env.X_ACCESS_TOKEN;
  const accessSecret = process.env.X_ACCESS_TOKEN_SECRET;
  const apiKey       = process.env.X_API_KEY;
  const apiSecret    = process.env.X_API_SECRET;

  // 키 미설정 시: 에러(500)가 아니라 정상 스킵(200) — 크론 실패 로그 노이즈 방지
  if (!accessToken || !accessSecret || !apiKey || !apiSecret) {
    return NextResponse.json({ ok: true, skipped: true, reason: "X API keys not configured" });
  }

  // 오늘 날짜 기준 최신 리포트 가져오기 (KST 기준).
  // 리포트 date는 "2026-07-30"(대시), updatedAt은 "2026.07.30 08:00"(점+시간)이라
  // 구분자를 통일하고 앞 10자리(날짜)만 비교해야 매칭됨.
  const kstNow = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const todayDash = kstNow.toISOString().slice(0, 10);            // 2026-07-30
  const norm = (s?: string) => (s ?? "").slice(0, 10).replace(/\./g, "-");
  const todayReports = SEED_REPORTS
    .filter((r) => norm(r.date) === todayDash || norm(r.updatedAt) === todayDash)
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

  // Twitter API v2 — OAuth 1.0a User Context (트윗 게시에 필요)
  const tweetUrl = "https://api.twitter.com/2/tweets";
  const authHeader = buildOAuth1Header("POST", tweetUrl, apiKey, apiSecret, accessToken, accessSecret);

  const res = await fetch(tweetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  authHeader,
    },
    body:   JSON.stringify({ text: tweetText }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[post-to-x]", err);
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ ok: true, tweetId: data.data?.id });
}
