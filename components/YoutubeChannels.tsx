"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import type { YTVideo } from "@/app/api/yt-videos/route";

type Channel = {
  key:     string;
  name:    string;
  initial: string;
  color:   string;
  pageUrl: string;  // link for "채널 바로가기"
};

const CHANNELS: Channel[] = [
  { key: "sbs",    name: "SBS Biz",        initial: "SBS",  color: "#3b82f6", pageUrl: "https://www.youtube.com/@SBSBiz2021/streams"         },
  { key: "yonhap", name: "연합경제TV",      initial: "연합", color: "#ef4444", pageUrl: "https://www.youtube.com/@연합뉴스경제TV/streams"      },
  { key: "hk",     name: "한경글로벌마켓",  initial: "한경", color: "#f59e0b", pageUrl: "https://www.youtube.com/@hkglobalmarket"             },
  { key: "money",  name: "머니코믹스",      initial: "머니", color: "#00e5a0", pageUrl: "https://www.youtube.com/@moneymoneycomics/streams"   },
];

/* ── avatar ─────────────────────────────────────────────────── */
function ChannelAvatar({ src, initial, color }: { src: string | null; initial: string; color: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${color}cc, ${color}66)`, border: `2px solid ${color}44` }}
      >
        {initial}
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" onError={() => setFailed(true)} />;
}

/* ── single video card ───────────────────────────────────────── */
function VideoCard({ video }: { video: YTVideo }) {
  const [imgErr, setImgErr] = useState(false);
  const href = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 w-44 block active:opacity-75 transition-opacity"
    >
      {/* Thumbnail */}
      <div className="relative w-44 h-[99px] rounded-xl overflow-hidden mb-2"
        style={{ background: "var(--border)" }}>
        {!imgErr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt=""
            className="w-full h-full object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">▶️</div>
        )}

        {/* LIVE / duration badge */}
        <div className="absolute bottom-1.5 right-1.5">
          {video.isLive ? (
            <span className="flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block mr-0.5" />
              LIVE
            </span>
          ) : video.duration ? (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded leading-none"
              style={{ background: "rgba(0,0,0,0.75)", color: "#fff" }}>
              {video.duration}
            </span>
          ) : null}
        </div>
      </div>

      {/* Title */}
      <p className="text-[11px] font-medium leading-snug line-clamp-2 mb-0.5"
        style={{ color: "var(--text)" }}>
        {video.title}
      </p>

      {/* Meta */}
      <p className="text-[10px]" style={{ color: "var(--muted)" }}>
        {[video.viewCount, video.publishedAt].filter(Boolean).join(" · ")}
      </p>
    </a>
  );
}

/* ── skeleton (loading placeholder) ─────────────────────────── */
function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-44">
      <div className="w-44 h-[99px] rounded-xl animate-pulse mb-2" style={{ background: "var(--border)" }} />
      <div className="h-3 rounded animate-pulse mb-1.5" style={{ background: "var(--border)" }} />
      <div className="h-3 rounded animate-pulse w-2/3" style={{ background: "var(--border)" }} />
    </div>
  );
}

/* ── main export ─────────────────────────────────────────────── */
export function YoutubeChannels() {
  const [avatars, setAvatars] = useState<Record<string, string | null>>({});
  const [videos,  setVideos]  = useState<Record<string, YTVideo[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/yt-avatars").then((r) => r.json()).catch(() => ({})),
      fetch("/api/yt-videos").then((r)  => r.json()).catch(() => ({})),
    ]).then(([av, vd]) => {
      setAvatars(av);
      setVideos(vd);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {CHANNELS.map((ch) => {
        const chVideos: YTVideo[] = videos[ch.key] ?? [];

        return (
          <div key={ch.key}>
            {/* Channel header row */}
            <div className="flex items-center gap-2 mb-3">
              <ChannelAvatar src={avatars[ch.key] ?? null} initial={ch.initial} color={ch.color} />
              <p className="flex-1 text-sm font-semibold" style={{ color: "var(--text)" }}>{ch.name}</p>
              <a
                href={ch.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                채널 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Horizontal video strip */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {loading ? (
                <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
              ) : chVideos.length > 0 ? (
                chVideos.map((v) => <VideoCard key={v.id} video={v} />)
              ) : (
                /* Fallback if scraping returned nothing */
                <a
                  href={ch.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-8 rounded-2xl border flex flex-col items-center justify-center gap-2 text-xs"
                  style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--card)" }}
                >
                  <ExternalLink className="w-4 h-4" />
                  {ch.name} 채널 바로가기
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
