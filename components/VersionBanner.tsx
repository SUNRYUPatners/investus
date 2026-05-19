"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, X } from "lucide-react";

const POLL_INTERVAL = 5 * 60_000; // 5분마다 체크

export function VersionBanner() {
  const [show, setShow]  = useState(false);
  const baselineId       = useRef<string | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const { buildId } = await res.json() as { buildId: string };
        if (!baselineId.current) {
          baselineId.current = buildId; // 첫 로드 — 기준값 저장
        } else if (buildId !== baselineId.current) {
          setShow(true); // 새 배포 감지 → 배너 표시
        }
      } catch { /* 네트워크 오류 무시 */ }
    };

    check();
    const id = setInterval(check, POLL_INTERVAL);
    return () => clearInterval(id);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed top-14 left-0 right-0 z-50 flex items-center justify-between px-4 py-2.5 gap-3"
      style={{ background: "var(--mint)", color: "#000" }}
    >
      <p className="text-xs font-semibold flex-1">
        새 버전이 출시됐어요 — 최신 앱으로 업데이트하세요
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl flex-shrink-0 active:opacity-70"
        style={{ background: "rgba(0,0,0,0.15)" }}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        새로고침
      </button>
      <button onClick={() => setShow(false)} className="flex-shrink-0 p-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
