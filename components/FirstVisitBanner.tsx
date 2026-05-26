"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight, HelpCircle } from "lucide-react";

const KEY = "investus-guide-hide-until";

function todayStr() {
  return new Date().toISOString().slice(0, 10); // "2026-05-21"
}

export function FirstVisitBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const hideUntil = localStorage.getItem(KEY);
      if (hideUntil !== todayStr()) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  const closeSession = () => setVisible(false);

  const dismissToday = () => {
    setVisible(false);
    try { localStorage.setItem(KEY, todayStr()); } catch { /* ignore */ }
  };

  if (!visible) return null;

  return (
    <div
      className="mx-4 mb-4 rounded-2xl border overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(59,130,246,0.06) 100%)", borderColor: "rgba(0,229,160,0.25)" }}
    >
      <div className="px-4 pt-3 pb-3 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">👋</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>처음 오셨나요?</p>
          <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>
            각 기능이 뭔지 모르겠다면 <b style={{ color: "var(--mint)" }}>Investus 사용법</b>를 먼저 읽어보세요.
          </p>
          <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
            실시간으로 궁금하다면 제목 옆{" "}
            <HelpCircle className="inline w-3 h-3 mx-0.5" style={{ color: "var(--muted)", opacity: 0.7 }} />
            <b style={{ color: "var(--text)" }}>를 클릭해보세요!</b>
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Link
              href="/more/guide"
              onClick={closeSession}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
              style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}
            >
              가이드 보기 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={dismissToday}
              className="text-[11px] px-2.5 py-1.5 rounded-xl border"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              오늘 그만보기
            </button>
          </div>
        </div>
        <button
          onClick={closeSession}
          className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity mt-0.5"
          aria-label="닫기"
        >
          <X className="w-4 h-4" style={{ color: "var(--text)" }} />
        </button>
      </div>
    </div>
  );
}
