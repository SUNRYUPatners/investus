"use client";

import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";

const PROFILE_URL = "https://x.com/hnryu_cio";
const SYNDICATION_URL =
  "https://syndication.twitter.com/srv/timeline-profile/screen-name/hnryu_cio?dnt=true&theme=dark&chrome=nofooter%20noborders%20transparent";

const MOCK_TWEETS = [
  {
    id: 1,
    text: "미국 장기채 금리 상승이 다시 심상치 않습니다. 10년물 4.6% 돌파 시 주식 밸류에이션 재조정 불가피. 특히 성장주 주의 요망.",
    time: "2h",
    likes: 142,
    retweets: 38,
  },
  {
    id: 2,
    text: "NVIDIA 블랙웰 수요가 공급을 크게 초과하고 있다는 공급망 신호가 계속 나오고 있음. 데이터센터 사이클, 아직 초입입니다.",
    time: "5h",
    likes: 287,
    retweets: 71,
  },
  {
    id: 3,
    text: "워렌 버핏의 현금 비중 확대는 단순한 방어가 아닌 '기회 비용 관리'입니다. 좋은 가격의 좋은 기업을 기다리는 것 자체가 투자.",
    time: "1d",
    likes: 391,
    retweets: 104,
  },
  {
    id: 4,
    text: "Apple 서비스 매출이 하드웨어를 추월하는 날이 머지않았습니다. 구독 기반 수익 모델로의 전환 — 마진 구조가 완전히 달라집니다.",
    time: "1d",
    likes: 203,
    retweets: 55,
  },
  {
    id: 5,
    text: "S&P500 PER 22배. 역사적 평균 대비 프리미엄이 붙어 있지만 AI 생산성 혁명이 이를 정당화할 수 있는지가 핵심 질문입니다.",
    time: "2d",
    likes: 176,
    retweets: 42,
  },
];

function MockFeed() {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg,#1d9bf0,#0d6efd)" }}
          >
            𝕏
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>
            @hnryu_cio
          </span>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(29,155,240,0.15)", color: "#1d9bf0" }}
          >
            큐레이션
          </span>
        </div>
        <a
          href={PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px]"
          style={{ color: "var(--mint)" }}
        >
          X에서 보기 <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Tweet list */}
      <div className="flex flex-col divide-y" style={{ borderColor: "var(--border)" }}>
        {MOCK_TWEETS.map((tweet) => (
          <a
            key={tweet.id}
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3.5 active:opacity-70 transition-opacity"
            style={{ background: "var(--card)" }}
          >
            <p className="text-[13px] leading-relaxed mb-2" style={{ color: "var(--text)" }}>
              {tweet.text}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                {tweet.time}
              </span>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                ♡ {tweet.likes}
              </span>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                ↻ {tweet.retweets}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3.5 text-xs font-semibold border-t active:opacity-70 transition-opacity"
        style={{ background: "var(--card)", borderColor: "var(--border)", color: "#1d9bf0" }}
      >
        X에서 전체 피드 보기 <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function XTimeline() {
  const [mode, setMode] = useState<"embed" | "fallback">("embed");

  if (mode === "fallback") return <MockFeed />;

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      {/* Direct syndication iframe — works for public accounts without widget.js */}
      <iframe
        src={SYNDICATION_URL}
        className="w-full"
        style={{ height: 560, border: "none", background: "transparent", colorScheme: "dark" }}
        title="X 피드 @hnryu_cio"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        onError={() => setMode("fallback")}
      />
      {/* Fallback link shown below the iframe */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-t"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>
          피드가 보이지 않으면 X 로그인 후 새로고침
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode("fallback")}
            className="flex items-center gap-1 text-[10px]"
            style={{ color: "var(--muted)" }}
          >
            <RefreshCw className="w-3 h-3" /> 큐레이션
          </button>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px]"
            style={{ color: "var(--mint)" }}
          >
            X 열기 <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
