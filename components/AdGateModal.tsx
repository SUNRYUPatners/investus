"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { AdFitBanner } from "@/components/AdFitBanner";

const UNIT_ID = "DAN-EBxW5EfIJKPJge5U"; // 300×250 게이트 모달용
const WAIT_SEC = 5;

interface AdGateModalProps {
  title: string;
  headerText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function AdGateModal({ title, headerText = "전자책 무료 열람", confirmText = "전자책 열기", onConfirm, onClose }: AdGateModalProps) {
  const [remaining, setRemaining] = useState(WAIT_SEC);
  const [ready, setReady] = useState(false);
  const confirmed = useRef(false);

  useEffect(() => {
    if (remaining <= 0) { setReady(true); return; }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  function handleConfirm() {
    if (!ready || confirmed.current) return;
    confirmed.current = true;
    onConfirm();
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
              {headerText}
            </p>
            <p className="text-sm font-bold mt-0.5 truncate max-w-[220px]" style={{ color: "var(--text)" }}>
              {title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        {/* 광고 영역 */}
        <div
          className="mx-4 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 py-4"
          style={{ minHeight: 160, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>광고 시청 후 무료 열람</p>
          <AdFitBanner unit={UNIT_ID} width={300} height={250} />
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-3 flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={!ready}
            className="flex-1 py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 disabled:cursor-not-allowed"
            style={{
              background: ready ? "rgba(192,132,252,0.2)" : "rgba(255,255,255,0.05)",
              color:      ready ? "rgba(192,132,252,0.95)" : "var(--muted)",
              border:     ready ? "1px solid rgba(192,132,252,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {ready ? confirmText : `${remaining}초 후 열기`}
          </button>
        </div>
      </div>
    </div>
  );
}
