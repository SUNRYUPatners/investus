"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  slot?: string;   // 특정 슬롯 ID (없으면 env var 사용)
  format?: "auto" | "rectangle" | "horizontal";
}

export function AdBanner({ slot, format = "auto" }: AdBannerProps) {
  const pubId  = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const slotId = slot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  const pushed = useRef(false);

  useEffect(() => {
    if (!pubId || !slotId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {}
  }, [pubId, slotId]);

  /* ── 개발 환경 / 미설정 시 플레이스홀더 ── */
  if (!pubId || !slotId) {
    const h = format === "rectangle" ? 250 : 72;
    return (
      <div
        className="w-full rounded-xl flex flex-col items-center justify-center gap-1 my-1"
        style={{
          height:       h,
          background:   "rgba(255,255,255,0.025)",
          border:       "1px dashed var(--border)",
        }}
      >
        <span className="text-lg opacity-30">📢</span>
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>
          광고 영역 · AdSense 설정 후 표시
        </p>
      </div>
    );
  }

  /* ── 실제 AdSense 광고 ── */
  const insStyle: React.CSSProperties =
    format === "rectangle"
      ? { display: "inline-block", width: "300px", height: "250px" }
      : format === "horizontal"
      ? { display: "block", width: "100%", height: "90px" }
      : { display: "block" };

  return (
    <div className="w-full my-1 overflow-hidden rounded-xl">
      <ins
        className="adsbygoogle"
        style={insStyle}
        data-ad-client={pubId}
        data-ad-slot={slotId}
        {...(format === "auto"
          ? { "data-ad-format": "auto", "data-full-width-responsive": "true" }
          : {})}
      />
    </div>
  );
}
