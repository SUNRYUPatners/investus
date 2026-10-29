import { NextRequest, NextResponse } from "next/server";

// URL-based locale: English is the site default. Korean lives under the `/ko`
// prefix, and the dedicated English news section lives under `/news`. We forward
// an `x-url-locale` request header so server components (and the root <html lang>)
// can reflect the URL's language without a restructure of every route.
function urlLocale(pathname: string): "en" | "ko" | null {
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return "ko";
  if (pathname === "/news" || pathname.startsWith("/news/")) return "en";
  return null;
}

export function proxy(req: NextRequest) {
  const loc = urlLocale(req.nextUrl.pathname);

  const requestHeaders = new Headers(req.headers);
  if (loc) requestHeaders.set("x-url-locale", loc);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  // Block search-engine indexing on Vercel preview URLs and non-canonical domains
  const host = req.headers.get("host") ?? "";
  if (!host.includes("investus.kr")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Already has locale cookie — respect the user's explicit choice.
  if (req.cookies.has("locale")) return res;

  // English is the default. We do not force a locale by IP; Korean users can
  // switch in-app (and visit /ko/* URLs). IP geo is kept only as a hint for an
  // optional, dismissible "view in Korean" suggestion in the UI.
  res.cookies.set("locale", "en", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
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
