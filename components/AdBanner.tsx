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

  /* ── 미설정 시 숨김 (AdSense 승인 전) ── */
  if (!pubId || !slotId) return null;

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
