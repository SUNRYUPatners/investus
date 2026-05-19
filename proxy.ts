import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // Already has locale cookie — respect it
  if (req.cookies.has("locale")) return res;

  // Vercel sets x-vercel-ip-country on every request (ISO 3166-1 alpha-2)
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  const locale  = country === "KR" ? "ko" : "en";

  res.cookies.set("locale", locale, {
    path:     "/",
    maxAge:   60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });

  return res;
}

export const config = {
  // /api/* 완전 제외 — Set-Cookie가 붙으면 Vercel CDN이 캐싱 안 함
  matcher: [
    "/((?!api(?:/|$)|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)).*)",
  ],
};
