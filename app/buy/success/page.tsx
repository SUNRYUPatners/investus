"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Download, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const BOOK_FILE = "/ebook/book.pdf";
const BOOK_NAME = "절대로 잃지 말고 미래에 투자하라";

function SuccessContent() {
  const params     = useSearchParams();
  const paymentKey = params.get("paymentKey") ?? "";
  const orderId    = params.get("orderId")    ?? "";
  const amount     = Number(params.get("amount") ?? "0");

  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setErrMsg("잘못된 접근입니다.");
      setStatus("error");
      return;
    }

    fetch("/api/confirm-payment", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ paymentKey, orderId, amount }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setStatus("ok");
        else { setErrMsg(d.message ?? "결제 확인에 실패했습니다."); setStatus("error"); }
      })
      .catch(() => { setErrMsg("서버 오류가 발생했습니다."); setStatus("error"); });
  }, [paymentKey, orderId, amount]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--bg)" }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: "var(--mint)" }} />
        <p className="text-sm" style={{ color: "var(--muted)" }}>결제를 확인하는 중…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6"
        style={{ background: "var(--bg)" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "rgba(239,68,68,0.15)" }}>
          <XCircle className="w-10 h-10" style={{ color: "#ef4444" }} />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>결제 확인 실패</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{errMsg}</p>
          <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            문의: sunryupatners@gmail.com
          </p>
        </div>
        <Link href="/buy"
          className="px-8 py-3 rounded-2xl text-sm font-bold text-black"
          style={{ background: "var(--mint)" }}>
          다시 시도
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6 pb-safe"
      style={{ background: "var(--bg)" }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "rgba(0,229,160,0.15)" }}>
        <CheckCircle className="w-10 h-10" style={{ color: "var(--mint)" }} />
      </div>

      <div className="text-center">
        <p className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
          결제 완료!
        </p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          구매해 주셔서 감사합니다.
        </p>
      </div>

      <div className="w-full max-w-sm rounded-2xl border p-5 text-center"
        style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.25)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
          {BOOK_NAME}
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
          아래 버튼을 눌러 PDF를 다운로드하세요.
        </p>
        <a
          href={BOOK_FILE}
          download={`${BOOK_NAME}.pdf`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-black"
          style={{ background: "var(--mint)", boxShadow: "0 4px 20px rgba(0,229,160,0.3)" }}>
          <Download className="w-4 h-4" />
          PDF 다운로드
        </a>
      </div>

      <Link href="/insight" className="text-xs" style={{ color: "var(--muted)" }}>
        인사이트로 돌아가기
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: "var(--mint)" }} />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
