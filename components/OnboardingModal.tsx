"use client";

import { useState, useEffect } from "react";

const STEPS = [
  {
    emoji: "📊",
    title: "실시간 미국 시장",
    desc: "S&P500, 나스닥, 선물지수와 공포탐욕지수를 한눈에 확인하세요. 장 시작 전 오늘의 흐름을 파악할 수 있어요.",
  },
  {
    emoji: "📋",
    title: "SUNRYU 인사이트 리포트",
    desc: "매일 오전 SUNRYU Partners CIO가 작성하는 핵심 뉴스 한장 요약과 종목 심층 분석 리포트를 받아보세요.",
  },
  {
    emoji: "💬",
    title: "종목토론 (종토방)",
    desc: "실제 보유 인증을 거친 투자자들의 종목 토론방입니다. 허수 없는 진짜 보유자들의 의견을 확인하세요.",
  },
  {
    emoji: "🔔",
    title: "리포트 알림 설정",
    desc: "알림 설정에서 '리포트 업데이트 알림'을 켜두면 새 리포트가 올라올 때 즉시 알림을 받을 수 있어요.",
  },
];

const STORAGE_KEY = "investus_onboarded";

export function OnboardingModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  const finish = () => {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    setVisible(false);
  };

  if (!visible) return null;

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)" }}
    >
      <div
        className="w-full max-w-[340px] rounded-3xl px-6 py-7 flex flex-col items-center text-center"
        style={{ background: "var(--card)" }}
      >
        {/* 스텝 인디케이터 */}
        <div className="flex gap-1.5 mb-6">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === step ? 24 : 8,
                background: i === step ? "var(--mint)" : "var(--border)",
              }}
            />
          ))}
        </div>

        <div className="text-5xl mb-4">{current.emoji}</div>
        <h2 className="text-base font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
          {current.title}
        </h2>
        <p className="text-[12px] leading-relaxed mb-7" style={{ color: "var(--muted)" }}>
          {current.desc}
        </p>

        <button
          onClick={() => isLast ? finish() : setStep((s) => s + 1)}
          className="w-full py-3 rounded-2xl text-sm font-bold text-black mb-3"
          style={{ background: "var(--mint)" }}
        >
          {isLast ? "시작하기" : "다음"}
        </button>
        <button
          onClick={finish}
          className="text-xs"
          style={{ color: "var(--muted)" }}
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
}
