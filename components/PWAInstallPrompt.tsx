"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const SHOWN_KEY = "pwa-prompt-shown";

export function PWAInstallPrompt() {
  const [show, setShow]     = useState(false);
  const [isIOS, setIsIOS]   = useState(false);
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Already installed as PWA?
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;

    // Already shown before?
    try { if (localStorage.getItem(SHOWN_KEY)) return; } catch { /* ignore */ }

    const ios = /iP(hone|ad|od)/.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent);
    setIsIOS(ios);

    // Capture Android/Desktop install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Show after 2.5s delay
    const timer = setTimeout(() => setShow(true), 2500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    try { localStorage.setItem(SHOWN_KEY, "1"); } catch { /* ignore */ }
  };

  const handleInstall = async () => {
    if (prompt) {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") {
        dismiss();
        return;
      }
    }
    dismiss();
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={dismiss}
    >
      <div
        className="w-full max-w-[480px] rounded-t-3xl pb-10 px-5 pt-1"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-6" style={{ background: "var(--border)" }} />

        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}>
            <span className="text-3xl">📲</span>
          </div>
          <div>
            <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
              홈 화면에 추가하시겠습니까?
            </p>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>
              앱처럼 빠르게 실행 · 광고 없는 전체화면
            </p>
          </div>
        </div>

        {isIOS ? (
          <>
            <div className="flex flex-col gap-3 mb-5">
              {([
                ["⬆️", "Safari 하단 공유 버튼 탭"],
                ["➕", '"홈 화면에 추가" 선택'],
                ["✅", '"추가" 탭 → 완료'],
              ] as [string, string][]).map(([icon, text], i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,229,160,0.10)", border: "1px solid rgba(0,229,160,0.2)" }}>
                    <span className="text-base">{icon}</span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text)" }}>{text}</p>
                </div>
              ))}
            </div>
            <button onClick={dismiss}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-black"
              style={{ background: "var(--mint)" }}>
              확인
            </button>
          </>
        ) : (
          <>
            <button onClick={handleInstall}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-black mb-3"
              style={{ background: "var(--mint)" }}>
              {prompt ? "홈 화면에 추가" : "확인"}
            </button>
            <button onClick={dismiss}
              className="w-full py-2.5 rounded-xl text-sm"
              style={{ color: "var(--muted)" }}>
              나중에
            </button>
          </>
        )}
      </div>
    </div>
  );
}
