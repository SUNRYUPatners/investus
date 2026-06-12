"use client";

import Link from "next/link";
import { ShieldCheck, Users, TrendingUp } from "lucide-react";
import type { Creator } from "@/lib/creators";

const RANK_MEDAL = ["🥇", "🥈", "🥉"];
const RANK_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];

export function CreatorCard({ creator, rank }: { creator: Creator; rank?: number }) {
  const { id, nickname, avatar, coverGradient, bio, tags, followerCount, annualReturn, portfolio, isVerified, accountBroker } = creator;
  const topHoldings = portfolio.slice(0, 3);
  const medal = rank != null && rank <= 3 ? RANK_MEDAL[rank - 1] : null;
  const medalColor = rank != null && rank <= 3 ? RANK_COLORS[rank - 1] : null;

  return (
    <Link href={`/creator/${encodeURIComponent(id)}`} className="block">
      <div className="rounded-2xl border overflow-hidden transition-all active:scale-[0.98]"
        style={{ background: "var(--card)", borderColor: medal ? `${medalColor}44` : "var(--border)" }}>
        {/* Cover gradient bar */}
        <div className="h-1.5" style={{ background: medal ? medalColor! : "var(--mint)", opacity: medal ? 0.8 : 0.6 }} />

        <div className="p-4">
          {/* Top row */}
          <div className="flex items-start gap-3 mb-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: coverGradient || "var(--bg)" }}>
                {avatar}
              </div>
              {medal && (
                <span className="absolute -top-1.5 -right-1.5 text-base leading-none">{medal}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                {rank != null && rank <= 3 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: `${medalColor}22`, color: medalColor! }}>
                    {rank}위
                  </span>
                )}
                <span className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>{nickname}</span>
                {isVerified && (
                  <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
                    <ShieldCheck className="w-3 h-3" />계좌인증
                  </span>
                )}
              </div>
              <p className="text-[11px] mt-0.5 line-clamp-2 leading-relaxed" style={{ color: "var(--muted)" }}>{bio}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                {t}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" style={{ color: "#ef4444" }} />
              <span className="text-xs font-bold font-mono-num" style={{ color: "#ef4444" }}>
                +{annualReturn}%
              </span>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>연수익률</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" style={{ color: "var(--muted)" }} />
              <span className="text-xs font-mono-num" style={{ color: "var(--text)" }}>
                {followerCount.toLocaleString()}명
              </span>
            </div>
          </div>

          {/* Top holdings pills */}
          <div className="flex gap-1.5 mb-4 flex-wrap">
            {topHoldings.map((h) => (
              <span key={h.symbol} className="text-[10px] font-mono-num font-bold px-2 py-1 rounded-lg"
                style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }}>
                {h.symbol}
                <span className="ml-1" style={{ color: h.avgReturn >= 0 ? "#ef4444" : "#10b981" }}>
                  {h.avgReturn >= 0 ? "+" : ""}{h.avgReturn}%
                </span>
              </span>
            ))}
          </div>

          {/* Bottom: CTA */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold" style={{ color: "var(--mint)" }}>무료 · 광고 지원형</span>
            <span className="text-xs font-bold px-4 py-2 rounded-xl"
              style={{ background: "var(--mint)", color: "#000" }}>
              프로필 보기
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
