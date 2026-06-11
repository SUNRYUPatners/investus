"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adfit?: { run: () => void };
  }
}

const UNIT_ID = "DAN-9PD1c2Nep5sIushS"; // 320×100 배너

interface AdFitBannerProps {
  unit?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function AdFitBanner({
  unit = UNIT_ID,
  width = 320,
  height = 100,
  className = "",
}: AdFitBannerProps) {
  useEffect(() => {
    let attempts = 0;
    const poll = () => {
      if (window.adfit) {
        try { window.adfit.run(); } catch { /* ignore */ }
        return;
      }
      if (++attempts < 30) setTimeout(poll, 300); // 최대 9초 대기
    };
    poll();
  }, []);

  return (
    <div className={`flex justify-center overflow-hidden my-2 ${className}`}>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={String(width)}
        data-ad-height={String(height)}
      />
    </div>
  );
}
