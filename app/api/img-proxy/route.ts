import { NextRequest, NextResponse } from "next/server";

// Block private/loopback ranges to prevent SSRF
function isPrivateUrl(raw: string): boolean {
  try {
    const { protocol, hostname } = new URL(raw);
    if (protocol !== "https:") return true;
    // Block loopback, private, metadata endpoints
    if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1|fd[0-9a-f]{2}:|fc)/i.test(hostname)) return true;
    if (hostname === "metadata.google.internal") return true;
    return false;
  } catch {
    return true;
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") ?? "";
  if (!url || isPrivateUrl(url)) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer":    "https://finnhub.io/",
        "Accept":     "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) return new NextResponse(null, { status: res.status });

    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return new NextResponse(null, { status: 415 });

    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      headers: {
        "Content-Type":  ct,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    return new NextResponse(null, { status: 502 });
  }
}
