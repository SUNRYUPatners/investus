"use client";

import { useEffect, useRef, useState } from "react";

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
  const pushed  = useRef(false);
  const insRef  = useRef<HTMLModElement>(null);
  const [adFilled, setAdFilled] = useState(false);

  useEffect(() => {
    if (!pubId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch { /* ignore */ }

    // AdSense sets data-ad-status="filled" when an ad loads
    const timer = setTimeout(() => {
      const status = insRef.current?.getAttribute("data-ad-status");
      setAdFilled(status === "filled");
    }, 2500);
    return () => clearTimeout(timer);
  }, [pubId]);

  if (!pubId) return null;

  const insStyle: React.CSSProperties =
    format === "rectangle"
      ? { display: "inline-block", width: "300px", height: "250px" }
      : format === "horizontal"
      ? { display: "block", width: "100%", height: "90px" }
      : { display: "block" };

  return (
    <div className="w-full my-2 rounded-xl overflow-hidden" style={{ minHeight: 72 }}>
      {/* 광고 미승인 중일 때 표시되는 광고 문의 배너 */}
      {!adFilled && (
        <a
          href="mailto:sunryupatners@gmail.com?subject=Investus%20광고%20문의"
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-opacity hover:opacity-80 active:opacity-60"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.07)",
            textDecoration: "none",
          }}
        >
          <div>
            <p className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>
              📢 광고 문의
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
              증권사·핀테크·투자 관련 광고 · sunryupatners@gmail.com
            </p>
          </div>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-lg flex-shrink-0 ml-3"
            style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
            문의하기
          </span>
        </a>
      )}
      {/* AdSense ins 태그 — 승인 후 실제 광고 표시 */}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ ...insStyle, display: adFilled ? "block" : "none" }}
        data-ad-client={pubId}
        {...(slotId ? { "data-ad-slot": slotId } : {})}
        {...(format === "auto" || !slotId
          ? { "data-ad-format": "auto", "data-full-width-responsive": "true" }
          : {})}
      />
    </div>
  );
}
