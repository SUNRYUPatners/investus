"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adfit?: { run: () => void };
  }
}

const UNIT_ID = "DAN-9PD1c2Nep5sIushS"; // 320×100 배너

let scriptInjected = false;
function injectAdFitScript() {
  if (scriptInjected || typeof window === "undefined") return;
  scriptInjected = true;
  const s = document.createElement("script");
  s.src = "https://t1.kakaocdn.net/kas/static/ba.min.js";
  s.async = true;
  document.head.appendChild(s);
}

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
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    injectAdFitScript();
    // 이미 스크립트가 로드된 경우 re-scan 트리거
    const timer = setTimeout(() => {
      try { window.adfit?.run(); } catch { /* ignore */ }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={divRef}
      className={`flex justify-center overflow-hidden my-2 ${className}`}
    >
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
