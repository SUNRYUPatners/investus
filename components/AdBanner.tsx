"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const PUB_ID = "ca-pub-1075509322890486";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
}

export function AdBanner({ slot, format = "auto" }: AdBannerProps) {
  const pubId  = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? PUB_ID;
  const slotId = slot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  const pushed = useRef(false);

  useEffect(() => {
    if (!pubId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch { /* ignore */ }
  }, [pubId]);

  if (!pubId) return null;

  // 슬롯 ID 없을 때 — 자동 광고 ins 태그 (구글이 자동 배치)
  if (!slotId) {
    return (
      <div className="w-full my-1 overflow-hidden rounded-xl">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={pubId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 슬롯 ID 있을 때 — 지정 광고 단위
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
