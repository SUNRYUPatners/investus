"use client";

import { useEffect, useRef, useState } from "react";

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

/** Shared unit refcount — destroy() only when last visible slot unmounts */
const unitRetain = new Map<string, number>();

function retainUnit(unit: string) {
  unitRetain.set(unit, (unitRetain.get(unit) ?? 0) + 1);
}

function releaseUnit(unit: string) {
  const next = (unitRetain.get(unit) ?? 1) - 1;
  if (next <= 0) {
    unitRetain.delete(unit);
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
  } else {
    unitRetain.set(unit, next);
  }
}

interface AdFitBannerProps {
  unit?: string;
  width?: number;
  height?: number;
  className?: string;
}

function isElementCssVisible(el: HTMLElement | null): boolean {
  let cur: HTMLElement | null = el;
  while (cur) {
    const s = getComputedStyle(cur);
    if (s.display === "none" || s.visibility === "hidden") return false;
    cur = cur.parentElement;
  }
  return true;
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
  // Only mount <ins> when this slot is actually CSS-visible.
  // Insight (and others) keep BOTH mobile+desktop trees in the DOM via Tailwind
  // lg:hidden / hidden lg:flex — hidden duplicates steal AdFit fill & destroy races.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const sync = () => setVisible(isElementCssVisible(wrap));
    sync();

    const mq = window.matchMedia("(min-width: 1024px)");
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    retainUnit(unit);

    const script = document.createElement("script");
    script.src = ADFIT_SRC;
    script.async = true;
    script.setAttribute("charset", "utf-8");
    wrap.appendChild(script);

    const t0 = window.setTimeout(invokeAdfit, 50);
    const t1 = window.setTimeout(invokeAdfit, 400);
    const t2 = window.setTimeout(invokeAdfit, 1200);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      script.remove();
      releaseUnit(unit);
    };
  }, [visible, unit]);

  return (
    <div
      ref={wrapRef}
      className={`ad-slot flex justify-center overflow-hidden ${className}`}
      style={{ minHeight: visible ? height : 0 }}
    >
      {visible ? (
        <ins
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit={unit}
          data-ad-width={String(width)}
          data-ad-height={String(height)}
        />
      ) : null}
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
