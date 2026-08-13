"use client";

import Link from "next/link";
import { Lock, Sunrise } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { buildMorningBriefing } from "@/lib/morningBriefing";

export function MorningBriefingCard({ locale = "ko" }: { locale?: string }) {
  const isKo = locale === "ko";
  const { user } = useAuth();
  const isPro = user?.isPro === true;
  const briefing = buildMorningBriefing();

  if (!briefing) return null;

  if (!isPro) {
    return (
      <div
        className="rounded-2xl border p-4"
        style={{
          background: "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, var(--card) 55%)",
          borderColor: "rgba(251,191,36,0.25)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sunrise className="w-4 h-4" style={{ color: "#fbbf24" }} />
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(251,191,36,0.15)", color: "#fbbf24" }}
          >
            {isKo ? "장전 브리핑 · Pro" : "Pre-market · Pro"}
          </span>
        </div>
        <p className="text-sm font-bold mb-1 leading-snug" style={{ color: "var(--text)" }}>
          {isKo ? "매일 아침, 오늘 핵심 3줄" : "Today's 3-line market brief"}
        </p>
        <p className="text-[12px] leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--muted)" }}>
          {briefing.headline}
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-xl"
          style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}
        >
          <Lock className="w-3.5 h-3.5" />
          {isKo ? "Pro로 장전 브리핑 열기" : "Unlock with Pro"}
        </Link>
      </div>
    );
  }

  return (
    <section
      className="rounded-2xl border p-4"
      style={{
        background: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, var(--card) 50%)",
        borderColor: "rgba(251,191,36,0.3)",
      }}
      aria-label={isKo ? "장전 브리핑" : "Morning briefing"}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4" style={{ color: "#fbbf24" }} />
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(251,191,36,0.18)", color: "#fbbf24" }}
          >
            {isKo ? "장전 브리핑" : "Pre-market brief"}
          </span>
        </div>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          {briefing.dateKey}
        </span>
      </div>

      <p className="text-sm font-bold leading-snug mb-3" style={{ color: "var(--text)" }}>
        {briefing.headline}
      </p>

      {briefing.bullets.length > 0 && (
        <ul className="flex flex-col gap-1.5 mb-3">
          {briefing.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-snug" style={{ color: "var(--muted)" }}>
              <span className="font-bold flex-shrink-0" style={{ color: "#fbbf24" }}>{i + 1}.</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-1.5">
        {briefing.reportLinks.map((r) => (
          <Link
            key={r.id}
            href={`/`}
            className="block rounded-xl px-3 py-2 border transition-opacity active:opacity-80"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderColor: "var(--border)",
              textDecoration: "none",
            }}
          >
            <p className="text-[11px] font-semibold line-clamp-1" style={{ color: "var(--text)" }}>
              {r.title}
            </p>
            <p className="text-[10px] line-clamp-1 mt-0.5" style={{ color: "var(--muted)" }}>
              {r.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
