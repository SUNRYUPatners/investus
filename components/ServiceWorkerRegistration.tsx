"use client";

import { useEffect, useState } from "react";

export function ServiceWorkerRegistration() {
  const [showBanner, setShowBanner] = useState(false);
  // If an update arrived while the app was backgrounded, reload on next focus
  const [pendingReload, setPendingReload] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Register the SW
    navigator.serviceWorker.register("/sw.js").catch(() => {});

    // ── Handle incoming message from the SW after it activates ──────────────
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type !== "SW_UPDATED") return;

      if (document.visibilityState === "hidden") {
        // App is in background — mark for silent reload on next focus
        setPendingReload(true);
      } else {
        // App is in foreground — show banner
        setShowBanner(true);
      }
    };
    navigator.serviceWorker.addEventListener("message", onMessage);

    // ── Auto-reload if update arrived while backgrounded ────────────────────
    const onVisibility = () => {
      if (document.visibilityState === "visible" && pendingReload) {
        window.location.reload();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ── Also listen to controllerchange for same-session SW swap ───────────
    const onController = () => {
      if (document.visibilityState === "hidden") {
        setPendingReload(true);
      } else {
        setShowBanner(true);
      }
    };
    navigator.serviceWorker.addEventListener("controllerchange", onController);

    return () => {
      navigator.serviceWorker.removeEventListener("message", onMessage);
      navigator.serviceWorker.removeEventListener("controllerchange", onController);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  // pendingReload is intentionally captured once per effect lifetime
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-register the visibilitychange handler whenever pendingReload changes
  useEffect(() => {
    if (!pendingReload) return;
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [pendingReload]);

  if (!showBanner) return null;

  return (
    <div
      className="fixed inset-x-0 z-[999] flex items-center gap-3 px-4 py-3"
      style={{
        bottom: "calc(env(safe-area-inset-bottom) + 4rem)",
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold leading-tight" style={{ color: "var(--text)" }}>
          새 버전이 업데이트됐습니다 🆕
        </p>
        <p className="text-[10px] mt-0.5 leading-tight" style={{ color: "var(--muted)" }}>
          최신 버전을 적용하려면 아래 버튼을 눌러주세요
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-black"
        style={{ background: "var(--mint)" }}
      >
        지금 적용
      </button>
      <button
        onClick={() => setShowBanner(false)}
        className="flex-shrink-0 text-[11px] px-2 py-1"
        style={{ color: "var(--muted)" }}
      >
        나중에
      </button>
    </div>
  );
}
