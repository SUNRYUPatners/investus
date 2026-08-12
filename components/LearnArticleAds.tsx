"use client";

import { Children, type ReactNode } from "react";
import { AdFitBanner, AdFitStrip } from "@/components/AdFitBanner";
import { AdBanner } from "@/components/AdBanner";

/** Mid-article AdFit — natural scroll placement (no forced wait) */
export function LearnMidAd() {
  return (
    <div className="my-1 flex flex-col gap-2" aria-label="광고">
      <p className="text-[9px] text-center" style={{ color: "var(--muted)" }}>Advertisement</p>
      <AdFitBanner />
      <AdFitStrip className="!my-0" />
    </div>
  );
}

/** Bottom of article — AdFit + AdSense trial unit */
export function LearnBottomAd() {
  return (
    <div className="my-1 flex flex-col gap-3" aria-label="광고">
      <p className="text-[9px] text-center" style={{ color: "var(--muted)" }}>Advertisement</p>
      <AdFitBanner />
      <AdBanner format="horizontal" />
    </div>
  );
}

/**
 * Wraps learn article sections: inserts mid-ad after ~3rd block,
 * bottom ads before the last (disclaimer) child.
 */
export function LearnArticleWithAds({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  if (items.length === 0) return null;
  if (items.length <= 3) {
    return (
      <>
        {items}
        <LearnBottomAd />
      </>
    );
  }
  const midAt = Math.min(2, items.length - 2);
  const head = items.slice(0, midAt + 1);
  const mid = items.slice(midAt + 1, -1);
  const tail = items[items.length - 1];
  return (
    <>
      {head}
      <LearnMidAd />
      {mid}
      <LearnBottomAd />
      {tail}
    </>
  );
}
