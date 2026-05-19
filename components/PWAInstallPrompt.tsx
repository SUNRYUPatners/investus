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
      const onboarded    = !!localStorage.getItem("investus_onboarded");
      // 온보딩 안 끝났으면 PWA 모달 표시 안 함 (충돌 방지)
      if (!modalShown && onboarded) {
        timer = setTimeout(() => setShow(true), 2500);
      } else if (ios && !bannerGone && onboarded) {
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
      {/* ── 미니 배너 (iOS 전용, 모달 닫은 후) ── */}
      {showBanner && isIOS && !show && (
        <div
          className="fixed inset-x-0 z-40 flex justify-center px-4 lg:hidden"
          style={{ bottom: "calc(env(safe-area-inset-bottom) + 72px)" }}
        >
          <div
            className="flex items-center gap-2.5 w-full max-w-[420px] rounded-2xl px-4 py-3 cursor-pointer active:opacity-80"
            style={{ background: "rgba(0,229,160,0.10)", border: "1px solid rgba(0,229,160,0.35)", backdropFilter: "blur(12px)" }}
            onClick={() => setShow(true)}
          >
            <span className="text-xl flex-shrink-0">📲</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold" style={{ color: "var(--mint)" }}>앱으로 보기</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>탭하면 설치 방법 안내해드려요</p>
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

      {/* ── 메인 모달 ── */}
      {show && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[380px] rounded-3xl overflow-hidden"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {isIOS ? (
              /* ── iPhone 전용: 수동 설치 안내 ── */
              <div className="p-5">
                {/* 헤더 */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}
                  >
                    📲
                  </div>
                  <div>
                    <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
                      Investus 앱으로 보기
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                      아이폰은 Safari에서 직접 추가해야 해요
                    </p>
                  </div>
                </div>

                {/* 안내 박스 */}
                <div
                  className="rounded-2xl p-4 mb-4"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
                >
                  <p className="text-[11px] font-semibold mb-3 text-center" style={{ color: "var(--muted)" }}>
                    Safari 브라우저에서 아래 순서대로 따라하세요
                  </p>

                  {/* 3단계 */}
                  {([
                    {
                      step: "1",
                      icon: "⬆️",
                      title: "공유 버튼 탭",
                      desc: "화면 하단 가운데 ⬆️ 버튼",
                    },
                    {
                      step: "2",
                      icon: "＋",
                      title: "홈 화면에 추가 탭",
                      desc: "메뉴를 아래로 스크롤하면 보여요",
                    },
                    {
                      step: "3",
                      icon: "✓",
                      title: "추가 탭 → 완료!",
                      desc: "홈 화면에 Investus 앱 아이콘 생성",
                    },
                  ]).map((s) => (
                    <div key={s.step} className="flex items-start gap-3 mb-3 last:mb-0">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold mt-0.5"
                        style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}
                      >
                        {s.step}
                      </div>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        {s.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>{s.title}</p>
                        <p className="text-[11px]" style={{ color: "var(--muted)" }}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 설치 후 혜택 */}
                <div className="flex gap-3 mb-4">
                  {[["⚡", "빠른 실행"], ["📱", "전체화면"], ["🔔", "알림 지원"]].map(([ic, lb]) => (
                    <div key={lb} className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <span className="text-base">{ic}</span>
                      <p className="text-[10px] font-semibold text-center" style={{ color: "var(--muted)" }}>{lb}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={closeModal}
                  className="w-full py-3 rounded-xl text-sm font-bold text-black"
                  style={{ background: "var(--mint)" }}
                >
                  확인했어요
                </button>
              </div>
            ) : (
              /* ── Android / 기타: 자동 설치 ── */
              <div className="p-5">
                {/* 헤더 */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                    style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}
                  >
                    📲
                  </div>
                  <div>
                    <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
                      Investus 앱으로 보기
                    </p>
                    <p className="text-[12px] mt-0.5" style={{ color: "var(--muted)" }}>
                      버튼 하나로 홈 화면에 앱 설치
                    </p>
                  </div>
                </div>

                {/* 혜택 */}
                <div className="flex gap-2.5 mb-5">
                  {[["⚡", "빠른 실행"], ["📱", "전체화면"], ["🔔", "알림 지원"]].map(([ic, lb]) => (
                    <div key={lb} className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                      <span className="text-xl">{ic}</span>
                      <p className="text-[11px] font-semibold text-center" style={{ color: "var(--muted)" }}>{lb}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleInstall}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-black mb-3 transition-opacity active:opacity-80"
                  style={{ background: "var(--mint)" }}
                >
                  앱 설치하기
                </button>
                <button
                  onClick={closeModal}
                  className="w-full py-2.5 rounded-xl text-sm"
                  style={{ color: "var(--muted)" }}
                >
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
