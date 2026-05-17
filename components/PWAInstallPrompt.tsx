"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const MODAL_KEY  = "pwa-modal-shown";
const BANNER_KEY = "pwa-banner-dismissed";

export function PWAInstallPrompt() {
  const [show,       setShow]       = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS,      setIsIOS]      = useState(false);
  const [prompt,     setPrompt]     = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    const ios = /iP(hone|ad|od)/.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
    setIsIOS(ios);

    const handler = (e: Event) => { e.preventDefault(); setPrompt(e as BeforeInstallPromptEvent); };
    window.addEventListener("beforeinstallprompt", handler);

    let timer: ReturnType<typeof setTimeout> | null = null;
    try {
      const modalShown   = !!localStorage.getItem(MODAL_KEY);
      const bannerGone   = !!localStorage.getItem(BANNER_KEY);
      if (!modalShown) {
        timer = setTimeout(() => setShow(true), 2500);
      } else if (ios && !bannerGone) {
        setShowBanner(true);
      }
    } catch { /* ignore */ }

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const closeModal = () => {
    setShow(false);
    try { localStorage.setItem(MODAL_KEY, "1"); } catch { /* ignore */ }
    if (isIOS) {
      try {
        if (!localStorage.getItem(BANNER_KEY)) setShowBanner(true);
      } catch { /* ignore */ }
    }
  };

  const closeBanner = () => {
    setShowBanner(false);
    try { localStorage.setItem(BANNER_KEY, "1"); } catch { /* ignore */ }
  };

  const handleInstall = async () => {
    if (prompt) {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") { closeModal(); setShowBanner(false); return; }
    }
    closeModal();
  };

  if (!show && !showBanner) return null;

  return (
    <>
      {/* ── Persistent iOS mini-banner (above bottom nav) ── */}
      {showBanner && isIOS && !show && (
        <div className="fixed inset-x-0 z-40 flex justify-center px-4 lg:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 72px)" }}>
          <div className="flex items-center gap-2.5 w-full max-w-[420px] rounded-2xl px-4 py-3 cursor-pointer active:opacity-80"
            style={{ background: "rgba(0,229,160,0.10)", border: "1px solid rgba(0,229,160,0.35)", backdropFilter: "blur(12px)" }}
            onClick={() => setShow(true)}>
            <span className="text-xl flex-shrink-0">📲</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold" style={{ color: "var(--mint)" }}>홈 화면에 추가하기</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>앱처럼 실행 · 탭하면 설치 방법 안내</p>
            </div>
            <button
              className="text-[18px] flex-shrink-0 px-1"
              style={{ color: "var(--muted)" }}
              onClick={(e) => { e.stopPropagation(); closeBanner(); }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ── Main modal ── */}
      {show && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[360px] rounded-3xl overflow-hidden"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {isIOS ? (
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}>
                    <span className="text-2xl">📲</span>
                  </div>
                  <div>
                    <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>홈 화면에 추가</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>앱처럼 전체화면 · 광고 없음</p>
                  </div>
                </div>

                {/* Address bar visual — highlight ··· button */}
                <div className="rounded-2xl p-3 mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                  <p className="text-[10px] text-center mb-2 font-semibold" style={{ color: "var(--muted)" }}>
                    Safari 주소창 옆 ··· 버튼을 탭하세요
                  </p>
                  {/* Fake Safari address bar */}
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl" style={{ background: "#1c1c1e" }}>
                    <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "#2c2c2e" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#636366" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      <span className="text-[10px] flex-1" style={{ color: "#8e8e93" }}>investus.kr</span>
                    </div>
                    {/* ··· highlighted */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-1.5 rounded-lg animate-pulse" style={{ background: "rgba(0,229,160,0.3)" }} />
                      <div className="relative w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#2c2c2e" }}>
                        <span className="text-[13px] font-bold tracking-tight" style={{ color: "#00e5a0" }}>···</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--mint)" }} />
                    <span className="text-[10px] font-semibold" style={{ color: "var(--mint)" }}>초록 표시 ··· 버튼 탭!</span>
                  </div>
                </div>

                {/* 4 steps */}
                <div className="flex flex-col gap-2.5 mb-4">
                  {([
                    ["1", "···", "주소창 옆 ··· 탭"],
                    ["2", "⬆️", "공유 탭"],
                    ["3", "⋯", "더보기(···) 탭"],
                    ["4", "➕", "홈 화면에 추가 탭 → 완료!"],
                  ] as [string, string, string][]).map(([step, icon, text]) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                        style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>
                        {step}
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                        style={{ background: "rgba(255,255,255,0.06)" }}>
                        {icon}
                      </div>
                      <p className="text-[13px]" style={{ color: "var(--text)" }}>{text}</p>
                    </div>
                  ))}
                </div>

                <button onClick={closeModal}
                  className="w-full py-3 rounded-xl text-sm font-bold text-black"
                  style={{ background: "var(--mint)" }}>
                  확인
                </button>
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}>
                    <span className="text-3xl">📲</span>
                  </div>
                  <div>
                    <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>홈 화면에 추가하시겠습니까?</p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>앱처럼 빠르게 실행 · 광고 없는 전체화면</p>
                  </div>
                </div>
                <button onClick={handleInstall}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-black mb-3"
                  style={{ background: "var(--mint)" }}>
                  {prompt ? "홈 화면에 추가" : "확인"}
                </button>
                <button onClick={closeModal}
                  className="w-full py-2.5 rounded-xl text-sm"
                  style={{ color: "var(--muted)" }}>
                  나중에
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
