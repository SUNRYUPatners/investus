import type { NextRequest } from "next/server";

/** OAuth 콜백·쿠키 도메인을 요청 호스트와 맞춰 www/non-www 불일치를 방지 */
export function siteUrlFromRequest(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (host) return `https://${host.split(",")[0].trim()}`;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.investus.kr";
}
