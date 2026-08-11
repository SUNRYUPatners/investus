"use client";

import { AdFitStrip } from "@/components/AdFitBanner";

/**
 * Mobile sticky strip above bottom nav — always visible while scrolling
 * so AdFit exposure is not limited to in-feed scroll position.
 */
export function StickyAdFit() {
  return (
    <div
      className="lg:hidden fixed inset-x-0 z-40 flex justify-center pointer-events-auto"
      style={{
        bottom: "calc(52px + env(safe-area-inset-bottom, 0px))",
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        paddingTop: 4,
        paddingBottom: 4,
      }}
      aria-label="광고"
    >
      <AdFitStrip className="!my-0" />
    </div>
  );
}
