"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { SUBSCRIPTION, formatSubPrice } from "@/lib/subscription";

type Props = {
  title: string;
  description: string;
  className?: string;
  compact?: boolean;
};

export function SubscribeGate({ title, description, className = "", compact }: Props) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden ${className}`}
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className={`flex ${compact ? "items-center gap-3 px-4 py-3.5" : "flex-col items-center text-center gap-3 px-5 py-6"}`}>
        <div
          className={`${compact ? "w-9 h-9" : "w-12 h-12"} rounded-full flex items-center justify-center flex-shrink-0`}
          style={{ background: "rgba(0,229,160,0.12)" }}
        >
          <Lock className={compact ? "w-4 h-4" : "w-5 h-5"} style={{ color: "var(--mint)" }} />
        </div>
        <div className={compact ? "flex-1 min-w-0 text-left" : ""}>
          <p className={`font-bold ${compact ? "text-sm" : "text-base"} mb-0.5`} style={{ color: "var(--text)" }}>
            {title}
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {description}
          </p>
        </div>
        <Link
          href="/subscribe"
          className={`${compact ? "px-3 py-2 text-[11px] flex-shrink-0" : "w-full max-w-xs py-3 text-sm"} rounded-xl font-bold text-center active:opacity-80 transition-opacity`}
          style={{ background: "var(--mint)", color: "#000" }}
        >
          구독하기 {formatSubPrice()}/{SUBSCRIPTION.periodLabel}
        </Link>
      </div>
    </div>
  );
}

/** 블러 오버레이 + 구독 CTA */
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
  if (!locked) return <>{children}</>;
  return (
    <div className="relative">
      <div className="blur-[6px] opacity-50 pointer-events-none select-none" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
        <div
          className="w-full max-w-sm rounded-2xl border px-4 py-4 text-center"
          style={{
            background: "rgba(11,12,14,0.92)",
            borderColor: "rgba(0,229,160,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2"
            style={{ background: "rgba(0,229,160,0.15)" }}>
            <Lock className="w-4 h-4" style={{ color: "var(--mint)" }} />
          </div>
          <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{title}</p>
          <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "var(--muted)" }}>{description}</p>
          <Link
            href="/subscribe"
            className="inline-block w-full py-2.5 rounded-xl text-sm font-bold active:opacity-80"
            style={{ background: "var(--mint)", color: "#000" }}
          >
            구독하기 {formatSubPrice()}/{SUBSCRIPTION.periodLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
