import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function isPrivateIp(ip: string): boolean {
  const v = ip.toLowerCase();
  if (v === "::1" || v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80:")) return true;
  const mapped = v.startsWith("::ffff:") ? v.slice(7) : v;
  const m = mapped.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return /^(localhost)$/i.test(ip);
  const a = Number(m[1]), b = Number(m[2]);
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

function isBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h === "metadata.google.internal" || h.endsWith(".internal")) return true;
  if (isIP(h) && isPrivateIp(h)) return true;
  if (/^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h)) return true;
  return false;
}

async function assertPublicHttps(raw: string): Promise<boolean> {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:") return false;
    if (isBlockedHost(u.hostname)) return false;
    const { address } = await lookup(u.hostname, { all: false });
    if (isPrivateIp(address)) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") ?? "";
  if (!url || !(await assertPublicHttps(url))) {
    return new NextResponse(null, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer":    "https://finnhub.io/",
        "Accept":     "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      redirect: "manual",
      signal: AbortSignal.timeout(6000),
    });
    if (res.status >= 300 && res.status < 400) {
      return new NextResponse(null, { status: 400 });
    }

    if (!res.ok) return new NextResponse(null, { status: res.status });

    const ct = res.headers.get("content-type") ?? "";
    if (!ct.startsWith("image/")) return new NextResponse(null, { status: 415 });

    const body = await res.arrayBuffer();
    if (body.byteLength > 2_000_000) return new NextResponse(null, { status: 413 });
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
