import type { NextRequest } from "next/server";

/** OAuth 콜백·쿠키 도메인을 요청 호스트와 맞춰 www/non-www 불일치를 방지 */
export function siteUrlFromRequest(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) return `https://${host.split(",")[0].trim()}`;
  return oauthCanonicalSiteUrl();
}

/** 네이버·OAuth redirect_uri — 항상 canonical(www)로 고정해 콜백 URL 불일치 방지 */
export function oauthCanonicalSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || "https://www.investus.kr";
}

/** Supabase createUser — 재로그인 시 흔한 「이미 가입됨」 오류 */
export function isSupabaseUserAlreadyExists(error: {
  message?: string;
  code?: string;
} | null): boolean {
  if (!error) return false;
  const msg = (error.message ?? "").toLowerCase();
  return (
    error.code === "user_already_exists" ||
    msg.includes("already been registered") ||
    msg.includes("already registered") ||
    msg.includes("duplicate")
  );
}
