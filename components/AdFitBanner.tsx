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
    // 스크립트는 layout.tsx <head>에 정적으로 설치됨
    // SPA 라우팅 후 새로 마운트된 ins 요소를 adfit이 처리하도록 트리거
    const timer = setTimeout(() => {
      try { window.adfit?.run(); } catch { /* ignore */ }
    }, 300);
    return () => clearTimeout(timer);
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
