"use client";

import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function FailContent() {
  const params  = useSearchParams();
  const message = params.get("message") ?? "결제에 실패했습니다.";
  const code    = params.get("code")    ?? "";

  const isCancelled = code === "PAY_PROCESS_CANCELED" || message.toLowerCase().includes("cancel");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6 pb-safe"
      style={{ background: "var(--bg)" }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "rgba(239,68,68,0.15)" }}>
        <XCircle className="w-10 h-10" style={{ color: "#ef4444" }} />
      </div>

      <div className="text-center">
        <p className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
          {isCancelled ? "결제가 취소되었습니다" : "결제 실패"}
        </p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          {isCancelled ? "결제창을 닫으셨습니다." : message}
        </p>
      </div>

      <Link href="/buy"
        className="px-8 py-3 rounded-2xl text-sm font-bold text-black"
        style={{ background: "var(--mint)" }}>
        다시 시도
      </Link>

      <Link href="/insight" className="text-xs" style={{ color: "var(--muted)" }}>
        인사이트로 돌아가기
      </Link>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }} />
    }>
      <FailContent />
    </Suspense>
  );
}
