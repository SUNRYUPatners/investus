import { NextResponse } from "next/server";

export const revalidate = 86400; // 24h cache
export const maxDuration = 20;

const CHANNELS = [
  { key: "sbs",    url: "https://www.youtube.com/@SBSBiz2021" },
  { key: "yonhap", url: "https://www.youtube.com/@연합뉴스경제TV" },
  { key: "hk",     url: "https://www.youtube.com/@hkglobalmarket" },
  { key: "money",  url: "https://www.youtube.com/@moneymoneycomics" },
  { key: "wepoll", url: "https://www.youtube.com/@wepoll_original" },
];

function extractAvatar(html: string): string | null {
  // og:image meta tag (most reliable)
  let m = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
  if (m) return m[1];

  // Fallback: yt3.googleusercontent.com URL embedded in page JSON
  m = html.match(/"(https:\/\/yt3\.googleusercontent\.com\/[^"\\]+)"/);
  if (m) return m[1].replace(/\\u0026/g, "&");

  return null;
}

async function fetchAvatar(channelUrl: string): Promise<string | null> {
  try {
    const res = await fetch(channelUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept-Language": "ko-KR,ko;q=0.9",
      },
      next:   { revalidate: 86400 },
      signal: AbortSignal.timeout(6_000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return extractAvatar(html);
  } catch {
    return null;
  }
}

export async function GET() {
  const entries = await Promise.all(
    CHANNELS.map(async ({ key, url }) => [key, await fetchAvatar(url)])
  );
  return NextResponse.json(Object.fromEntries(entries));
}
