import { NextRequest, NextResponse } from "next/server";

// URL-based locale: English is the site default. Korean lives under the `/ko`
// prefix (rewritten to the same routes in next.config.ts), and the dedicated
// English news section lives under `/news`. We forward:
//   - x-url-locale : "ko" for /ko/*, "en" for /news/* (so <html lang> + content
//                    + canonical match the URL; crawlers have no locale cookie
//                    and resolve locale purely from the URL).
//   - x-pathname   : the logical path WITHOUT the /ko prefix, so metadata can
//                    build self-canonical + hreflang en/ko/x-default for any page.
function resolveLocale(pathname: string): "en" | "ko" | null {
  if (pathname === "/ko" || pathname.startsWith("/ko/")) return "ko";
  if (pathname === "/news" || pathname.startsWith("/news/")) return "en";
  return null;
}

function logicalPath(pathname: string): string {
  if (pathname === "/ko" || pathname.startsWith("/ko/")) {
    return pathname.replace(/^\/ko/, "") || "/";
  }
  return pathname;
}

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const loc = resolveLocale(pathname);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", logicalPath(pathname));
  if (loc) requestHeaders.set("x-url-locale", loc);

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  // Block search-engine indexing on Vercel preview URLs and non-canonical domains
  const host = req.headers.get("host") ?? "";
  if (!host.includes("investus.kr")) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Expose the IP country as a readable cookie so the client "View in Korean"
  // suggestion can be shown to likely-Korean visitors (dismissible, no redirect).
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  if (country && req.cookies.get("ip_country")?.value !== country) {
    res.cookies.set("ip_country", country, { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" });
  }

  // Already has locale cookie — respect the user's explicit choice.
  if (req.cookies.has("locale")) return res;

  // English is the default. We do not force a locale by IP; Korean users can
  // switch in-app (and visit /ko/* URLs).
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
