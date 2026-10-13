"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLocaleCode } from "@/contexts/LocaleContext";

/** Permanently dismissed — true first-time guests only */
const SEEN_KEY = "investus-guide-seen";

function markSeen() {
  try { localStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
}

export function FirstVisitBanner() {
  const { user, loaded } = useAuth();
  const locale = useLocaleCode();
  const isKo = locale === "ko";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    // Logged-in users (email signup / OAuth) are not first-time visitors
    if (user) {
      markSeen();
      setVisible(false);
      return;
    }
    try {
      if (!localStorage.getItem(SEEN_KEY)) setVisible(true);
    } catch { /* ignore */ }
  }, [loaded, user]);

  const dismiss = () => {
    setVisible(false);
    markSeen();
  };

  if (!visible) return null;

  return (
    <div
      className="mx-4 mb-4 rounded-2xl border overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(var(--mint-rgb),0.08) 0%, rgba(59,130,246,0.06) 100%)", borderColor: "rgba(var(--mint-rgb),0.25)" }}
    >
      <div className="px-4 pt-3 pb-3 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">👋</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{isKo ? "처음 오셨나요?" : "New here?"}</p>
          <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: "var(--muted)" }}>
            {isKo
              ? (<>각 기능이 뭔지 모르겠다면 <b style={{ color: "var(--mint)" }}>Investus 사용법</b>를 먼저 읽어보세요.</>)
              : (<>Not sure where to start? Read the <b style={{ color: "var(--mint)" }}>Investus guide</b> first.</>)}
          </p>
          {isKo && (
            <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
              실시간으로 궁금하다면 제목 옆{" "}
              <HelpCircle className="inline w-3 h-3 mx-0.5" style={{ color: "var(--muted)", opacity: 0.7 }} />
              <b style={{ color: "var(--text)" }}>를 클릭해보세요!</b>
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Link
              href="/more/guide"
              onClick={dismiss}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[12px] font-semibold"
              style={{ background: "var(--mint)", color: "var(--on-accent)", textDecoration: "none" }}
            >
              {isKo ? "가이드 보기" : "View Guide"} <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={dismiss}
              className="text-[11px] px-2.5 py-1.5 rounded-xl border"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              {isKo ? "다시 안 보기" : "Don't show again"}
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity mt-0.5"
          aria-label={isKo ? "닫기" : "Close"}
        >
          <X className="w-4 h-4" style={{ color: "var(--text)" }} />
        </button>
      </div>
    </div>
  );
}
