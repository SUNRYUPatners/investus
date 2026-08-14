"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AdFitStrip } from "@/components/AdFitBanner";

const STORAGE_KEY = "investus-sticky-ad-dismissed";

/**
 * Sticky strip always visible while scrolling.
 * Mobile: above BottomNav (52px). Desktop: main content only (right of sidebar).
 */
export function StickyAdFit() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "1");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.stickyAd = dismissed ? "hidden" : "visible";
  }, [mounted, dismissed]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  if (!mounted || dismissed) return null;

  return (
    <div
      className="fixed z-40 left-0 right-0 lg:left-64 flex justify-center pointer-events-auto bottom-[calc(52px+env(safe-area-inset-bottom,0px))] lg:bottom-[env(safe-area-inset-bottom,0px)]"
      style={{
        background: "var(--ad-surface)",
        borderTop: "1px solid var(--ad-border)",
        paddingTop: 4,
        paddingBottom: 4,
      }}
      aria-label="광고"
    >
      <div className="relative w-full max-w-[480px] lg:max-w-none px-10 lg:px-12">
        <AdFitStrip className="!my-0" />
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full transition-opacity active:opacity-60"
          style={{
            background: "var(--muted-2)",
            border: "1px solid var(--border)",
            color: "var(--muted)",
          }}
          aria-label="광고 닫기"
          title="광고 닫기"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
