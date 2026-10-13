"use client";

import { useState, useEffect, useCallback } from "react";
import { Play } from "lucide-react";
import { AdGateModal } from "@/components/AdGateModal";
import { kstTodayKey } from "@/lib/subscription";

const AD_UNLOCK_KEY = "investus_ad_unlock";

export function isAdUnlockedToday(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(AD_UNLOCK_KEY) === kstTodayKey();
  } catch {
    return false;
  }
}

function markAdUnlocked() {
  try {
    localStorage.setItem(AD_UNLOCK_KEY, kstTodayKey());
  } catch {}
}

export function useAdGate(): { unlocked: boolean; showGate: () => void; AdGatePortal: React.ReactNode } {
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { setUnlocked(isAdUnlockedToday()); }, []);

  const showGate = useCallback(() => setOpen(true), []);

  const handleConfirm = useCallback(() => {
    markAdUnlocked();
    setUnlocked(true);
    setOpen(false);
  }, []);

  const AdGatePortal = open ? (
    <AdGateModal
      title="Investus Premium"
      headerText="Free access · Watch a short ad"
      confirmText="Unlock"
      onConfirm={handleConfirm}
      onClose={() => setOpen(false)}
    />
  ) : null;

  return { unlocked, showGate, AdGatePortal };
}

type Props = {
  title: string;
  description: string;
  className?: string;
  compact?: boolean;
};

export function SubscribeGate({ title, description, className = "", compact }: Props) {
  const { unlocked, showGate, AdGatePortal } = useAdGate();
  if (unlocked) return null;
  return (
    <>
      {AdGatePortal}
      <div
        className={`rounded-2xl border overflow-hidden ${className}`}
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className={`flex ${compact ? "items-center gap-3 px-4 py-3.5" : "flex-col items-center text-center gap-3 px-5 py-6"}`}>
          <div
            className={`${compact ? "w-9 h-9" : "w-12 h-12"} rounded-full flex items-center justify-center flex-shrink-0`}
            style={{ background: "rgba(var(--mint-rgb),0.12)" }}
          >
            <Play className={compact ? "w-4 h-4" : "w-5 h-5"} style={{ color: "var(--mint)" }} />
          </div>
          <div className={compact ? "flex-1 min-w-0 text-left" : ""}>
            <p className={`font-bold ${compact ? "text-sm" : "text-base"} mb-0.5`} style={{ color: "var(--text)" }}>
              {title}
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {description}
            </p>
          </div>
          <button
            onClick={showGate}
            className={`${compact ? "px-3 py-2 text-[11px] flex-shrink-0" : "w-full max-w-xs py-3 text-sm"} rounded-xl font-bold text-center active:opacity-80 transition-opacity`}
            style={{ background: "var(--mint)", color: "var(--on-accent)" }}
          >
            {compact ? "Free · Watch Ad" : "Watch a short ad · Free access"}
          </button>
        </div>
      </div>
    </>
  );
}

export function PreviewFade({
  children,
  label = "Watch a short ad · Free access",
  maxHeight = 168,
}: {
  children: React.ReactNode;
  label?: string;
  maxHeight?: number;
}) {
  const { unlocked, showGate, AdGatePortal } = useAdGate();
  if (unlocked) return <>{children}</>;
  return (
    <>
      {AdGatePortal}
      <div>
        <div className="relative overflow-hidden pointer-events-none select-none" style={{ maxHeight }} aria-hidden>
          {children}
          <div
            className="absolute inset-x-0 bottom-0 h-14"
            style={{ background: "linear-gradient(to bottom, transparent, var(--card))" }}
          />
        </div>
        <div className="flex justify-center px-4 pb-3 -mt-1">
          <button
            onClick={showGate}
            className="px-4 py-2 rounded-xl text-[12px] font-bold"
            style={{ background: "var(--mint)", color: "var(--on-accent)" }}
          >
            {label}
          </button>
        </div>
      </div>
    </>
  );
}

export function SubscribeBlurOverlay({
  children,
  locked,
  title,
  description,
}: {
  children: React.ReactNode;
  locked: boolean;
  title: string;
  description: string;
}) {
  const { unlocked, showGate, AdGatePortal } = useAdGate();
  if (!locked || unlocked) return <>{children}</>;
  return (
    <>
      {AdGatePortal}
      <div className="relative">
        <div className="blur-[6px] opacity-50 pointer-events-none select-none" aria-hidden>
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
          <div
            className="w-full max-w-sm rounded-2xl border px-4 py-4 text-center"
            style={{
              background: "rgba(11,12,14,0.92)",
              borderColor: "rgba(var(--mint-rgb),0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ background: "rgba(var(--mint-rgb),0.15)" }}>
              <Play className="w-4 h-4" style={{ color: "var(--mint)" }} />
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{title}</p>
            <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "var(--muted)" }}>{description}</p>
            <button
              onClick={showGate}
              className="inline-block w-full py-2.5 rounded-xl text-sm font-bold active:opacity-80"
              style={{ background: "var(--mint)", color: "var(--on-accent)" }}
            >
              Watch a short ad · Free access
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
