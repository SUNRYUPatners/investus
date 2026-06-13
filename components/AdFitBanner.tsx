"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adfit?: { run: () => void };
  }
}

const UNIT_ID       = "DAN-9PD1c2Nep5sIushS"; // 320×100 배너
const STRIP_UNIT_ID = "DAN-lISrJpZ1cwV33LaK"; // 320×50  띠 배너

interface AdFitBannerProps {
  unit?: string;
  width?: number;
  height?: number;
  className?: string;
}

function AdBanner({ unit, width, height, className = "" }: Required<Omit<AdFitBannerProps, "className">> & { className?: string }) {
  useEffect(() => {
    let attempts = 0;
    const poll = () => {
      if (window.adfit) {
        try { window.adfit.run(); } catch { /* ignore */ }
        return;
      }
      if (++attempts < 30) setTimeout(poll, 300);
    };
    poll();
  }, []);

  return (
    <div className={`flex justify-center ${className}`}
      style={{ filter: "brightness(0.6) saturate(0.75)" }}>
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

export function AdFitBanner({ unit = UNIT_ID, width = 320, height = 100, className = "" }: AdFitBannerProps) {
  return <AdBanner unit={unit} width={width} height={height} className={`my-2 ${className}`} />;
}

/** 320×50 모바일 띠 배너 */
export function AdFitStrip({ className = "" }: { className?: string }) {
  return <AdBanner unit={STRIP_UNIT_ID} width={320} height={50} className={`my-1 ${className}`} />;
}
