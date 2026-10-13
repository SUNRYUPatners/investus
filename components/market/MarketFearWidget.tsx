"use client";

import { useEffect, useRef, useState } from "react";
import { FearGreedGauge } from "@/components/FearGreedGauge";
import type { FearGreedData } from "@/lib/api";
import type { MarketId } from "@/lib/markets/types";
import { getMarketConfig } from "@/lib/markets/config";
import type { Locale } from "@/lib/i18n";
import { useLocaleCode } from "@/contexts/LocaleContext";

function endpointFor(market: MarketId): string {
  const s = getMarketConfig(market).sentiment;
  if (s === "kr-fear") return "/api/kr-fear";
  if (s === "crypto-fg") return "/api/crypto-fear";
  if (s === "policy") return "/api/policy-fear";
  return "/api/fear-greed";
}

/** 미국 CNN 지수와 구분 — 한국은 코스피 기반 참고 지표 */
function copyFor(market: MarketId, isKo: boolean): {
  title?: string;
  subtitle?: string;
  note?: string;
  outerTitle?: string;
} {
  const s = getMarketConfig(market).sentiment;
  if (s === "kr-fear") {
    return isKo
      ? {
          outerTitle: "한국 시장 심리",
          title: "한국 공포·탐욕 (코스피)",
          subtitle: "코스피 기반 · 참고용",
          note: "미국 CNN 공포탐욕지수가 아닙니다. 코스피 당일 등락을 0~100으로 환산한 한국시장 참고 지표입니다.",
        }
      : {
          outerTitle: "Korea Market Sentiment",
          title: "Korea Fear & Greed (KOSPI)",
          subtitle: "KOSPI-based · reference",
          note: "Not the US CNN Fear & Greed Index. A reference indicator derived from daily KOSPI moves scaled 0–100.",
        };
  }
  if (s === "crypto-fg") {
    return isKo
      ? {
          outerTitle: "크립토 공포·탐욕",
          title: "크립토 공포·탐욕 지수",
          subtitle: "Crypto Fear & Greed",
        }
      : {
          outerTitle: "Crypto Fear & Greed",
          title: "Crypto Fear & Greed Index",
          subtitle: "Crypto Fear & Greed",
        };
  }
  if (s === "policy") {
    return isKo
      ? {
          outerTitle: "정책 모멘텀",
          title: "정책 모멘텀",
          subtitle: "부동산·정책",
        }
      : {
          outerTitle: "Policy Momentum",
          title: "Policy Momentum",
          subtitle: "Real estate · policy",
        };
  }
  return {};
}

export function MarketFearWidget({ market, locale }: { market: MarketId; locale?: Locale }) {
  const [data, setData] = useState<FearGreedData | null>(null);
  const fetchRef = useRef<() => void>(() => {});
  const ep = endpointFor(market);
  const localeCode = useLocaleCode();
  const isKo = localeCode === "ko";
  const copy = copyFor(market, isKo);
  const uiLocale: Locale = locale ?? (isKo ? "ko" : "en");

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
