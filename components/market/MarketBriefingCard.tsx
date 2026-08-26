"use client";

import { getMarketConfig } from "@/lib/markets/config";
import type { MarketId } from "@/lib/markets/types";
import { isMarketSessionOpen } from "@/lib/markets/hours";
import { useEffect, useState } from "react";

export function MarketBriefingCard({ market }: { market: MarketId }) {
  const cfg = getMarketConfig(market);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isMarketSessionOpen(market));
  }, [market]);

  const title =
    market === "kr"
      ? open
        ? "장중 브리핑 (한국 · 시총 탑10)"
        : "장전·장후 브리핑 (한국 · 시총 탑10)"
      : market === "safe"
        ? "아침 9시 안전자산 브리핑"
        : market === "kr-re"
          ? "부동산·정책 브리핑"
          : open
            ? "장중 브리핑 (미국)"
            : "장전·장후 브리핑 (미국)";

  const body =
    market === "kr"
      ? "한국장(KST 09:00–15:30) 기준입니다. 시총 탑10(삼성전자·SK하이닉스·LG에너지솔루션·삼성바이오로직스·현대차·기아·셀트리온·KB금융·신한지주·NAVER) 중심으로 장전·장중·장후를 정리합니다."
      : market === "safe"
        ? "매일 아침 9시에 전일·새벽 뉴스를 정리합니다. 비트코인·이더·솔라나·금·은·구리를 다룹니다."
        : market === "kr-re"
          ? "매매·전세·정부정책 헤드라인을 짧게 모아 드립니다."
          : "미국장 기준 장전(리포트)·장후(장중 뉴스) 브리핑입니다.";

  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          {cfg.emoji} {title}
        </p>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={
            open
              ? { background: "rgba(var(--up-rgb),0.12)", color: "var(--up)" }
              : { background: "rgba(107,114,128,0.12)", color: "var(--muted)" }
          }
        >
          {open ? "장중" : "장마감"}
        </span>
      </div>
      <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
        {body}
      </p>
    </div>
  );
}
