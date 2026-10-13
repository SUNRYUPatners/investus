"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { SkipForward } from "lucide-react";
import { AdFitBanner } from "@/components/AdFitBanner";

const UNIT_ID   = "DAN-EBxW5EfIJKPJge5U"; // 300×250 게이트 모달용
const CHECK_MS  = 3000; // 광고 미로드 판단 타임아웃
const SKIP_SEC  = 5;    // 광고 로드 후 스킵 가능까지 대기

// checking  → 광고 로드 여부 확인 중 (모달 invisible, 광고 로딩)
// playing   → 광고 로드 확인됨, skip 카운트다운
// skippable → Skip 버튼 표시
// done      → 완료 (언마운트)
type Phase = "checking" | "playing" | "skippable" | "done";

interface AdGateModalProps {
  title: string;
  headerText?: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function AdGateModal({
  title,
  headerText = "Free access · Watch a short ad",
  confirmText = "Unlock",
  onConfirm,
  onClose,
}: AdGateModalProps) {
  const [phase, setPhase]       = useState<Phase>("checking");
  const [skipLeft, setSkipLeft] = useState(SKIP_SEC);
  const adWrapRef               = useRef<HTMLDivElement>(null);
  const confirmed               = useRef(false);

  const doConfirm = useCallback(() => {
    if (confirmed.current) return;
    confirmed.current = true;
    setPhase("done");
    onConfirm();
  }, [onConfirm]);

  // ── Escape key (only when modal is visible) ───────────────────
  useEffect(() => {
    if (phase === "checking" || phase === "done") return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [phase, onClose]);

  // ── Ad load detection ─────────────────────────────────────────
  // AdFitBanner sets data-filled="true" on wrapper when ad fills.
  // Modal card is opacity:0 during this phase — AdFit loads anyway
  // (isElementCssVisible only blocks display:none / visibility:hidden).
  // If no fill within CHECK_MS → instant unlock (no ad shown, no wait).
  // If fill detected → show modal (opacity:1), start skip countdown.
  useEffect(() => {
    if (phase !== "checking") return;

    const wrap = adWrapRef.current;
    if (!wrap) return;

    function checkFill() {
      if (!wrap) return false;
      const slot = wrap.querySelector<HTMLElement>("[data-filled='true']");
      return !!slot && slot.offsetHeight > 0;
    }

    const mo = new MutationObserver(() => {
      if (checkFill()) { transition(); }
    });
    mo.observe(wrap, { subtree: true, attributes: true, attributeFilter: ["data-filled"] });

    const poll    = setInterval(() => { if (checkFill()) transition(); }, 300);
    const giveUp  = setTimeout(() => { transition(true); }, CHECK_MS);

    function transition(noAd = false) {
      mo.disconnect();
      clearInterval(poll);
      clearTimeout(giveUp);
      if (noAd) {
        // 광고 미로드 → 즉시 잠금해제 (모달 표시 없음)
        doConfirm();
      } else {
        // 광고 로드 → 모달 표시 + skip 카운트다운
        setPhase("playing");
      }
    }

    return () => { mo.disconnect(); clearInterval(poll); clearTimeout(giveUp); };
  }, [phase, doConfirm]);

  // ── Skip countdown ────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;
    if (skipLeft <= 0) { setPhase("skippable"); return; }
    const t = setTimeout(() => setSkipLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, skipLeft]);

  if (phase === "done") return null;

  const visible = phase === "playing" || phase === "skippable";

  return (
    <div
      className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center"
      style={{
        background:     visible ? "rgba(0,0,0,0.82)" : "transparent",
        backdropFilter: visible ? "blur(4px)" : "none",
        pointerEvents:  visible ? "auto" : "none",
        transition:     "background 0.2s",
      }}
    >
      <div
        className="w-full max-w-sm rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--card)",
          border: "1px solid rgba(255,255,255,0.08)",
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.25s, transform 0.25s",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{headerText}</p>
            <p className="text-sm font-bold mt-0.5 truncate max-w-[240px]" style={{ color: "var(--text)" }}>{title}</p>
          </div>
        </div>

        {/* Ad — single instance, always mounted. opacity:0 keeps it invisible
            during checking while allowing AdFit SDK to fill. */}
        <div
          ref={adWrapRef}
          className="mx-4 rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            minHeight:  visible ? 260 : 0,
            maxHeight:  visible ? 300 : 0,
            background: "rgba(255,255,255,0.02)",
            border:     visible ? "1px solid rgba(255,255,255,0.06)" : "none",
            overflow:   "hidden",
            transition: "min-height 0.2s, max-height 0.2s",
          }}
        >
          <AdFitBanner unit={UNIT_ID} width={300} height={250} />
        </div>

        {/* Footer — YouTube-style skip */}
        <div className="px-4 pb-4 pt-3 flex items-center justify-end min-h-[52px]">
          {visible && (
            phase === "playing" ? (
              <div
                className="px-4 py-2 rounded-full text-xs font-bold"
                style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}
              >
                Skip in {skipLeft}s
              </div>
            ) : (
              <button
                onClick={doConfirm}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95"
                style={{
                  background: "rgba(192,132,252,0.2)",
                  color:      "rgba(192,132,252,0.95)",
                  border:     "1px solid rgba(192,132,252,0.3)",
                }}
              >
                {confirmText} <SkipForward className="w-3.5 h-3.5" />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
