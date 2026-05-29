"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "investus_install_dismissed";
// 3번 방문 후 표시
const VISIT_KEY   = "investus_visit_count";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallBanner() {
  const [show,    setShow]    = useState(false);
  const [prompt,  setPrompt]  = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS,   setIsIOS]   = useState(false);
  const [iosShow, setIosShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;

      // 방문 카운터
      const visits = parseInt(localStorage.getItem(VISIT_KEY) ?? "0", 10) + 1;
      localStorage.setItem(VISIT_KEY, String(visits));
      if (visits < 2) return; // 2번 방문부터 표시

      // iOS 감지
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window as unknown as Record<string, unknown>).MSStream;
      // 이미 설치된 PWA라면 스킵
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      if (isStandalone) return;

      if (ios) {
        setIsIOS(true);
        setIosShow(true);
        return;
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
        const visits = parseInt(localStorage.getItem(VISIT_KEY) ?? "0", 10);
        if (visits >= 3) setShow(true);
      } catch { setShow(true); }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    setIosShow(false);
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
  };

  const install = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") dismiss();
    setPrompt(null);
    setShow(false);
  };

  // Android / Chrome 설치 배너
  if (show && !isIOS) {
    return (
      <div
        className="fixed bottom-20 lg:bottom-6 left-4 right-4 z-40 rounded-2xl p-4 flex items-center gap-3 shadow-xl"
        style={{ background: "var(--card)", border: "1px solid rgba(0,229,160,0.3)" }}
      >
        <span className="text-2xl flex-shrink-0">📲</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold mb-0.5" style={{ color: "var(--text)" }}>홈화면에 추가하기</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>앱처럼 빠르게 실행하고 오프라인에서도 확인</p>
        </div>
        <button
          onClick={install}
          className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl"
          style={{ background: "var(--mint)", color: "#000" }}
        >
          설치
        </button>
        <button onClick={dismiss} className="flex-shrink-0 p-1">
          <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
        </button>
      </div>
    );
  }

  // iOS Safari 안내 배너
  if (iosShow && isIOS) {
    return (
      <div
        className="fixed bottom-20 left-4 right-4 z-40 rounded-2xl p-4 shadow-xl"
        style={{ background: "var(--card)", border: "1px solid rgba(0,229,160,0.3)" }}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">📲</span>
            <p className="text-xs font-bold" style={{ color: "var(--text)" }}>홈화면에 추가하기 (iOS)</p>
          </div>
          <button onClick={dismiss} className="p-1">
            <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
          </button>
        </div>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
          Safari 하단 <span style={{ color: "var(--text)", fontWeight: 600 }}>공유 버튼</span> → <span style={{ color: "var(--text)", fontWeight: 600 }}>홈 화면에 추가</span>를 탭하면 앱처럼 사용할 수 있어요.
        </p>
      </div>
    );
  }

  return null;
}
