"use client";

import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";

export function MarketBriefingCard({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);

  const title =
    market === "safe"
      ? "아침 9시 안전자산 브리핑"
      : market === "kr-re"
        ? "부동산·정책 브리핑"
        : "장전·장후 브리핑";

  const body =
    market === "safe"
      ? "매일 아침 9시에 전일·새벽 뉴스를 정리합니다. 비트코인·이더·솔라나·금·은·구리를 다룹니다."
      : market === "kr-re"
        ? "매매·전세·정부정책 헤드라인을 짧게 모아 드립니다."
        : "장전·장후 뉴스 분석 브리핑입니다.";

  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          {cfg.emoji} {title}
        </p>
      </div>
      <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
        {body}
      </p>
    </div>
  );
}
