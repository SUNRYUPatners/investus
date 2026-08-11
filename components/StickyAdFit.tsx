"use client";

import { AdFitStrip } from "@/components/AdFitBanner";

/**
 * Sticky strip always visible while scrolling.
 * Mobile: above BottomNav (52px). Desktop: flush bottom, offset for sidebar.
 */
export function StickyAdFit() {
  return (
    <div
      className="fixed inset-x-0 z-40 flex justify-center pointer-events-auto lg:pl-64 bottom-[calc(52px+env(safe-area-inset-bottom,0px))] lg:bottom-[env(safe-area-inset-bottom,0px)]"
      style={{
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
