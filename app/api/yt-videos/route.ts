import { NextResponse } from "next/server";

export const revalidate = 1800; // 30분 캐시

export type YTVideo = {
  id:          string;
  title:       string;
  thumbnail:   string;
  viewCount:   string;
  publishedAt: string;
  duration:    string;
  isLive:      boolean;
};

type ChannelConfig = {
  key:   string;
  urls:  string[];
  limit: number;
};

const CHANNEL_CONFIGS: ChannelConfig[] = [
  { key: "sbs",    urls: ["https://www.youtube.com/@SBSBiz2021/streams"],                                                          limit: 4 },
  { key: "yonhap", urls: ["https://www.youtube.com/@yonhapnews_economy/streams", "https://www.youtube.com/@연합뉴스경제TV/streams"], limit: 4 },
  { key: "hk",     urls: ["https://www.youtube.com/@hkglobalmarket/streams", "https://www.youtube.com/@hkglobalmarket/videos"],     limit: 4 },
  { key: "money",  urls: ["https://www.youtube.com/@moneymoneycomics/streams"],                                                    limit: 4 },
];

/** Parse a lockupViewModel node (YouTube's newer layout) */
function parseLockup(lv: any): YTVideo | null {
  const videoId: string = lv?.contentId;
  if (!videoId) return null;

  const title: string =
    lv?.metadata?.lockupMetadataViewModel?.title?.content ?? "";

  // Thumbnail — pick the largest source
  const sources: any[] =
    lv?.contentImage?.thumbnailViewModel?.image?.sources ?? [];
  const thumbnail: string =
    sources.at(-1)?.url ??
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  // Metadata rows → ["조회수 6.8천회", "스트리밍 시간: 2시간 전"]
  const rows: any[] =
    lv?.metadata?.lockupMetadataViewModel?.metadata
      ?.contentMetadataViewModel?.metadataRows ?? [];
  const metaParts: string[] = [];
  for (const row of rows)
    for (const p of row?.metadataParts ?? [])
      if (p?.text?.content) metaParts.push(p.text.content as string);

  const viewCount  = metaParts.find((s) => s.includes("조회수")) ?? "";
  const publishedAt = metaParts.find((s) => !s.includes("조회수")) ?? "";

  // Overlays → duration badge or LIVE badge
  const overlays: any[] =
    lv?.contentImage?.thumbnailViewModel?.overlays ?? [];
  let duration = "";
  let isLive   = false;
  for (const ov of overlays) {
    const badges: any[] =
      ov?.thumbnailBottomOverlayViewModel?.badges ?? [];
    for (const b of badges) {
      const bvm = b?.thumbnailBadgeViewModel ?? {};
      if ((bvm.badgeStyle as string | undefined)?.includes("LIVE")) {
        isLive = true;
      } else if (bvm.text) {
        duration = bvm.text as string;
      }
    }
  }

  return {
    id: videoId,
    title,
    thumbnail: thumbnail.startsWith("//") ? "https:" + thumbnail : thumbnail,
    viewCount,
    publishedAt,
    duration,
    isLive,
  };
}

/** Parse old-style videoRenderer node */
function parseVideoRenderer(vr: any): YTVideo | null {
  const videoId: string = vr?.videoId;
  if (!videoId) return null;

  const titleRuns: any[] = vr.title?.runs ?? [];
  const title: string =
    titleRuns.map((r: any) => r.text as string).join("") ||
    (vr.title?.simpleText ?? "");

  const thumbs: any[] = vr.thumbnail?.thumbnails ?? [];
  const thumbnail: string =
    thumbs.at(-1)?.url ??
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const viewCount: string =
    vr.viewCountText?.simpleText ??
    (vr.viewCountText?.runs ?? []).map((r: any) => r.text).join("") ??
    "";

  const isLive: boolean = !!(
    vr.badges?.some(
      (b: any) =>
        b?.metadataBadgeRenderer?.label === "LIVE" ||
        b?.metadataBadgeRenderer?.style === "BADGE_STYLE_TYPE_LIVE_NOW"
    ) ||
    vr.thumbnailOverlays?.some(
      (o: any) =>
        o?.thumbnailOverlayTimeStatusRenderer?.style === "LIVE"
    )
  );

  return {
    id:          videoId,
    title,
    thumbnail:   thumbnail.startsWith("//") ? "https:" + thumbnail : thumbnail,
    viewCount,
    publishedAt: vr.publishedTimeText?.simpleText ?? "",
    duration:    vr.lengthText?.simpleText ?? (isLive ? "LIVE" : ""),
    isLive,
  };
}

function extractVideos(html: string): YTVideo[] {
  const marker   = "var ytInitialData = ";
  const startIdx = html.indexOf(marker);
  if (startIdx === -1) return [];

  const jsonStart = startIdx + marker.length;
  const jsonEnd   = html.indexOf(";</script>", jsonStart);
  if (jsonEnd === -1) return [];

  let data: any;
  try { data = JSON.parse(html.slice(jsonStart, jsonEnd)); }
  catch { return []; }

  const tabs: any[] =
    data?.contents?.twoColumnBrowseResultsRenderer?.tabs ?? [];

  for (const tab of tabs) {
    const tr      = tab?.tabRenderer;
    const content = tr?.content ?? {};

    // Gather item nodes
    const itemNodes: any[] = [];

    const rgContents: any[] = content?.richGridRenderer?.contents ?? [];
    if (rgContents.length) {
      itemNodes.push(...rgContents);
    } else {
      for (const s of content?.sectionListRenderer?.contents ?? []) {
        const gridItems: any[] =
          s?.itemSectionRenderer?.contents?.[0]?.gridRenderer?.items ?? [];
        itemNodes.push(...gridItems);
      }
    }

    if (!itemNodes.length) continue;

    const videos: YTVideo[] = [];
    for (const item of itemNodes) {
      const inner = item?.richItemRenderer?.content ?? item;

      // Try new lockupViewModel first, then legacy videoRenderer
      const parsed =
        (inner.lockupViewModel   ? parseLockup(inner.lockupViewModel) : null) ??
        (inner.videoRenderer     ? parseVideoRenderer(inner.videoRenderer) : null) ??
        (inner.gridVideoRenderer ? parseVideoRenderer(inner.gridVideoRenderer) : null);

      if (parsed?.id) {
        videos.push(parsed);
        if (videos.length >= 8) break;
      }
    }

    if (videos.length) return videos;
  }

  return [];
}

async function fetchTab(url: string): Promise<YTVideo[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next:   { revalidate: 1800 },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return [];
    return extractVideos(await res.text());
  } catch {
    return [];
  }
}

export async function GET() {
  const out: Record<string, YTVideo[]> = {};

  await Promise.all(
    CHANNEL_CONFIGS.map(async (ch) => {
      const seen   = new Set<string>();
      const merged: YTVideo[] = [];

      for (const url of ch.urls) {
        for (const v of await fetchTab(url)) {
          if (!seen.has(v.id)) {
            seen.add(v.id);
            merged.push(v);
          }
        }
      }

      // Live streams first, rest in chronological order (YouTube already sorts newest first)
      out[ch.key] = [
        ...merged.filter((v) => v.isLive),
        ...merged.filter((v) => !v.isLive),
      ].slice(0, ch.limit);
    })
  );

  return NextResponse.json(out);
}
