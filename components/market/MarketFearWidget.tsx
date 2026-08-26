"use client";

import { useEffect, useRef, useState } from "react";
import { FearGreedGauge } from "@/components/FearGreedGauge";
import type { FearGreedData } from "@/lib/api";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import type { Locale } from "@/lib/i18n";

function endpointFor(market: MarketId): string {
  const s = getMarketConfig(market).sentiment;
  if (s === "kr-fear") return "/api/kr-fear";
  if (s === "crypto-fg") return "/api/crypto-fear";
  if (s === "policy") return "/api/policy-fear";
  return "/api/fear-greed";
}

/** 미국 CNN 지수와 구분 — 한국은 코스피 기반 참고 지표 */
function copyFor(market: MarketId): {
  title?: string;
  subtitle?: string;
  note?: string;
  outerTitle?: string;
} {
  const s = getMarketConfig(market).sentiment;
  if (s === "kr-fear") {
    return {
      outerTitle: "한국 시장 심리",
      title: "한국 공포·탐욕 (코스피)",
      subtitle: "코스피 기반 · 참고용",
      note: "미국 CNN 공포탐욕지수가 아닙니다. 코스피 당일 등락을 0~100으로 환산한 한국시장 참고 지표입니다.",
    };
  }
  if (s === "crypto-fg") {
    return {
      outerTitle: "크립토 공포·탐욕",
      title: "크립토 공포·탐욕 지수",
      subtitle: "Crypto Fear & Greed",
    };
  }
  if (s === "policy") {
    return {
      outerTitle: "정책 모멘텀",
      title: "정책 모멘텀",
      subtitle: "부동산·정책",
    };
  }
  return {};
}

export function MarketFearWidget({ market, locale }: { market: MarketId; locale?: Locale }) {
  const [data, setData] = useState<FearGreedData | null>(null);
  const fetchRef = useRef<() => void>(() => {});
  const ep = endpointFor(market);
  const copy = copyFor(market);
  // 한국·안전자산 등은 한글 UI 고정
  const uiLocale: Locale = market === "us" ? (locale ?? "ko") : "ko";

  const doFetch = () => {
    fetch(ep)
      .then((r) => { if (!r.ok) throw new Error("http"); return r.json(); })
      .then((d: FearGreedData) => { if (d?.value != null) setData(d); })
      .catch(() => {});
  };
  fetchRef.current = doFetch;

  useEffect(() => {
    setData(null);
    fetchRef.current();
    const id = setInterval(() => fetchRef.current(), 30 * 60_000);
    return () => clearInterval(id);
  }, [ep]);

  if (!data) return null;
  return (
    <div>
      {copy.outerTitle && (
        <p className="text-[10px] font-semibold tracking-tight mb-1.5 px-0.5" style={{ color: "var(--muted)" }}>
          {copy.outerTitle}
        </p>
      )}
      <FearGreedGauge
        data={data}
        locale={uiLocale}
        titleOverride={copy.title}
        subtitleOverride={copy.subtitle}
        note={copy.note}
      />
    </div>
  );
}
