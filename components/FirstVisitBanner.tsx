"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";

const KEY = "investus-guide-seen-v1";

export function FirstVisitBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
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
            각 기능이 뭔지 모르겠다면 <b style={{ color: "var(--mint)" }}>미국주식 입문 가이드</b>를 먼저 읽어보세요.
          </p>
          <Link
            href="/more/guide"
            onClick={dismiss}
            className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
            style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}
          >
            가이드 보기 <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity mt-0.5"
          aria-label="닫기"
        >
          <X className="w-4 h-4" style={{ color: "var(--text)" }} />
        </button>
      </div>
    </div>
  );
}
