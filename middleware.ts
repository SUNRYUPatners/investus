import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Already has locale cookie — respect it
  if (req.cookies.has("locale")) return res;

  // Vercel sets x-vercel-ip-country on every request
  const country = req.headers.get("x-vercel-ip-country") ?? "KR";
  const locale  = country === "KR" ? "ko" : "en";

  res.cookies.set("locale", locale, {
    path:     "/",
    maxAge:   60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });

  return res;
}

export const config = {
  // api/ 경로는 제외 — Set-Cookie가 붙으면 Vercel CDN이 API 응답을 캐싱하지 않음
  matcher: ["/((?!api/|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt|xml)).*)"],
};
