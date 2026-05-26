"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ChevronRight, FileText } from "lucide-react";

const KEY = "investus-report-banner-dismissed";
const REPORT_DATE = "2026-05-22";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function ReportUpdateBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (todayStr() !== REPORT_DATE) return;
    try {
      const dismissed = localStorage.getItem(KEY);
      if (dismissed !== REPORT_DATE) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(KEY, REPORT_DATE); } catch { /* ignore */ }
  };

  if (!visible) return null;

  return (
    /* Full-viewport fixed overlay — centered on screen, no sidebar offset */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop — click to dismiss */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={dismiss}
      />

      {/* Modal card */}
      <div
        className="relative z-10 w-full mx-4 rounded-2xl border overflow-hidden"
        style={{
          maxWidth: "420px",
          background: "linear-gradient(135deg, #0d1324 0%, #07091a 100%)",
          borderColor: "rgba(96,165,250,0.45)",
          boxShadow: "0 0 50px rgba(96,165,250,0.18), 0 24px 64px rgba(0,0,0,0.7)",
        }}
      >
        {/* Accent top bar */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #60a5fa, #00e5a0)" }} />

        <div className="px-5 pt-5 pb-5">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(96,165,250,0.15)" }}
            >
              <FileText className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
                📋 오늘의 리포트가 발행됐습니다
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                SpaceX IPO · NVDA $270B FCF · Tesla 유럽 +30%<br />
                이란 핵합의 등 <b style={{ color: "#60a5fa" }}>7개 핵심 리포트</b>를 확인하세요.
              </p>
            </div>
            <button
              onClick={dismiss}
              className="flex-shrink-0 opacity-40 hover:opacity-80 transition-opacity"
              aria-label="닫기"
            >
              <X className="w-4 h-4" style={{ color: "var(--text)" }} />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/insight"
              onClick={dismiss}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[13px] font-semibold"
              style={{ background: "#60a5fa", color: "#000", textDecoration: "none" }}
            >
              바로 확인하기 <ChevronRight className="w-4 h-4" />
            </Link>
            <button
              onClick={dismiss}
              className="px-4 py-2.5 rounded-xl border text-[12px] transition-opacity hover:opacity-70"
              style={{ color: "var(--muted)", borderColor: "var(--border)" }}
            >
              오늘 그만보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
