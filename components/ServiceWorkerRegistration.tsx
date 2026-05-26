"use client";

import { useEffect, useRef } from "react";

export function ServiceWorkerRegistration() {
  const buildIdRef = useRef<string | null>(null);

  useEffect(() => {
    // ── CSS 로드 실패 감지 → 1회 자동 리로드 ────────────────────────────
    const handleResourceError = (e: ErrorEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName !== "LINK") return;
      const rel = (target as HTMLLinkElement).rel;
      if (rel !== "stylesheet" && rel !== "preload") return;
      if (sessionStorage.getItem("css-reload")) return;
      sessionStorage.setItem("css-reload", "1");
      window.location.reload();
    };
    document.addEventListener("error", handleResourceError, true);

    // ── Service Worker 등록 + 업데이트 즉시 적용 ─────────────────────────
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});

      // 새 SW 활성화 → 탭 상태 관계없이 즉시 조용히 리로드
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }

    // ── /api/version 폴링 fallback ────────────────────────────────────────
    // SW 업데이트가 안 잡혀도 새 배포를 감지해 자동 리로드
    const checkVersion = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const { buildId } = await res.json() as { buildId: string };
        if (!buildId) return;
        if (buildIdRef.current === null) {
          // 첫 로드 — 현재 버전 저장
          buildIdRef.current = buildId;
        } else if (buildIdRef.current !== buildId) {
          // 새 버전 감지 → 즉시 리로드
          window.location.reload();
        }
      } catch { /* 네트워크 오류 무시 */ }
    };

    // 최초 버전 기록
    checkVersion();

    // 5분마다 폴링
    const pollId = setInterval(checkVersion, 5 * 60_000);

    // 앱 복귀 시에도 즉시 버전 확인 (SW 없는 브라우저 대비)
    const onVisibility = () => { if (!document.hidden) checkVersion(); };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", checkVersion);

    return () => {
      document.removeEventListener("error", handleResourceError, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", checkVersion);
      clearInterval(pollId);
    };
  }, []);

  return null;
}
