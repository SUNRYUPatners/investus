"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    /** AdFit SDK: loader function that later gains .destroy after init */
    adfit?: ((() => void) & { destroy?: (unit: string) => void }) | {
      destroy?: (unit: string) => void;
      run?: () => void;
    };
  }
}

const UNIT_ID       = "DAN-9PD1c2Nep5sIushS"; // 320×100 배너
const STRIP_UNIT_ID = "DAN-lISrJpZ1cwV33LaK"; // 320×50  띠 배너
const ADFIT_SRC     = "https://t1.kakaocdn.net/kas/static/ba.min.js";

interface AdFitBannerProps {
  unit?: string;
  width?: number;
  height?: number;
  className?: string;
}

/** Kick AdFit for newly mounted <ins> (SPA-safe). */
function invokeAdfit() {
  const af = window.adfit;
  if (!af) return;
  try {
    if (typeof af === "function") af();
    else if (typeof af.run === "function") af.run();
  } catch {
    /* ignore */
  }
}

function AdBanner({
  unit,
  width,
  height,
  className = "",
}: Required<Omit<AdFitBannerProps, "className">> & { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // React remount: re-inject ba.min.js so AdFit scans this slot
    const script = document.createElement("script");
    script.src = ADFIT_SRC;
    script.async = true;
    script.setAttribute("charset", "utf-8");
    wrap.appendChild(script);

    // Also poke global loader (layout may have already loaded the SDK)
    const t0 = window.setTimeout(invokeAdfit, 50);
    const t1 = window.setTimeout(invokeAdfit, 400);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      try {
        const af = window.adfit;
        if (af && typeof af === "object" && typeof af.destroy === "function") {
          af.destroy(unit);
        } else if (typeof af === "function" && af.destroy) {
          af.destroy(unit);
        }
      } catch {
        /* ignore */
      }
      script.remove();
    };
  }, [unit]);

  return (
    <div
      ref={wrapRef}
      className={`flex justify-center overflow-hidden ${className}`}
      style={{ minHeight: height }}
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

export function AdFitBanner({
  unit = UNIT_ID,
  width = 320,
  height = 100,
  className = "",
}: AdFitBannerProps) {
  return (
    <AdBanner
      unit={unit}
      width={width}
      height={height}
      className={`my-2 ${className}`}
    />
  );
}

/** 320×50 모바일 띠 배너 */
export function AdFitStrip({ className = "" }: { className?: string }) {
  return (
    <AdBanner
      unit={STRIP_UNIT_ID}
      width={320}
      height={50}
      className={`my-1 ${className}`}
    />
  );
}

export { UNIT_ID as ADFIT_BANNER_UNIT, STRIP_UNIT_ID as ADFIT_STRIP_UNIT };
