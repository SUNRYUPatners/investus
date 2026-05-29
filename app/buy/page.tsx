"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";

const BOOK = {
  title:  "절대로 잃지 말고 미래에 투자하라",
  author: "SUNRYU Partners CIO",
  desc:   "잃지 않는 투자의 원칙부터 미래 유망 섹터까지 — 실전 중심의 미국주식 투자 전략",
  price:  19900,
};

type PayMethod = "카드" | "토스페이" | "카카오페이" | "네이버페이";

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => {
      requestPayment: (method: string, params: Record<string, unknown>) => Promise<void>;
    };
  }
}

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

export default function BuyPage() {
  const [method,      setMethod]      = useState<PayMethod>("카드");
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errMsg,      setErrMsg]      = useState("");
  const [loading,     setLoading]     = useState(false);
  const sdkReady                      = useRef(false);

  useEffect(() => {
    if (document.querySelector('script[src*="tosspayments"]')) { sdkReady.current = true; return; }
    const s   = document.createElement("script");
    s.src     = "https://js.tosspayments.com/v1/payment";
    s.async   = true;
    s.onload  = () => { sdkReady.current = true; };
    document.head.appendChild(s);
  }, []);

  const handlePay = async () => {
    if (!name.trim())   { setErrMsg("이름을 입력해주세요."); return; }
    if (!termsAgreed)   { setErrMsg("구매 조건 및 환불정책에 동의해주세요."); return; }

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) {
      setErrMsg("결제 설정이 완료되지 않았습니다. 관리자에게 문의하세요.");
      return;
    }

    if (!sdkReady.current || !window.TossPayments) {
      setErrMsg("결제 모듈 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setErrMsg("");
    setLoading(true);

    try {
      const toss = window.TossPayments(clientKey);
      await toss.requestPayment(method, {
        amount:        BOOK.price,
        orderId:       `ebook-${Date.now()}`,
        orderName:     BOOK.title,
        customerName:  name.trim(),
        customerEmail: email.trim() || undefined,
        successUrl:    `${window.location.origin}/buy/success`,
        failUrl:       `${window.location.origin}/buy/fail`,
      });
    } catch (e: unknown) {
      // 사용자가 결제창 닫은 경우
      const err = e as { code?: string };
      if (err?.code !== "USER_CANCEL") {
        setErrMsg("결제 처리 중 오류가 발생했습니다.");
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--bg)" }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: "var(--mint)" }} />
        <p className="text-sm" style={{ color: "var(--muted)" }}>결제 창을 불러오는 중…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-xl mx-auto px-4 lg:px-8 pt-4 pb-12 lg:pb-10">
        <Link href="/insight"
          className="inline-flex items-center gap-1 text-xs mb-5"
          style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> 인사이트
        </Link>

        <h1 className="text-base font-bold font-syne mb-5" style={{ color: "var(--text)" }}>
          전자책 구매
        </h1>

        {/* 상품 카드 */}
        <div className="rounded-2xl p-4 border mb-5 flex gap-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="w-[72px] h-[100px] rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 shadow-lg"
            style={{
              background:    "linear-gradient(160deg, #0f2d1e, #071510)",
              border:        "1px solid rgba(0,229,160,0.3)",
              boxShadow:     "0 8px 24px rgba(0,229,160,0.15)",
            }}>
            <span className="text-2xl">📈</span>
            <p className="text-[7px] font-bold text-center px-1 leading-tight"
              style={{ color: "var(--mint)" }}>
              절대로 잃지말고<br />미래에 투자
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
              {BOOK.title}
            </p>
            <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>{BOOK.author}</p>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
              {BOOK.desc}
            </p>
            <p className="text-lg font-bold font-mono-num" style={{ color: "var(--mint)" }}>
              {fmt(BOOK.price)}
            </p>
          </div>
        </div>

        {/* 구매자 정보 */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            구매자 정보
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-10 flex-shrink-0" style={{ color: "var(--muted)" }}>이름</span>
              <input
                type="text"
                placeholder="홍길동 (필수)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-10 flex-shrink-0" style={{ color: "var(--muted)" }}>이메일</span>
              <input
                type="email"
                placeholder="receipt@example.com (선택)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>
          </div>
        </div>

        {/* 결제 수단 */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            결제 수단
          </p>
          <div className="grid grid-cols-2 gap-2">

            {/* 카드 */}
            <button onClick={() => setMethod("카드")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "카드"
                ? { background: "var(--mint)", borderColor: "var(--mint)" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <CreditCard className="w-6 h-6"
                style={{ color: method === "카드" ? "#000" : "var(--text)" }} />
              <span className="text-[11px] font-bold"
                style={{ color: method === "카드" ? "#000" : "var(--text)" }}>
                신용·체크카드
              </span>
            </button>

            {/* 토스페이 */}
            <button onClick={() => setMethod("토스페이")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "토스페이"
                ? { background: "#0064FF", borderColor: "#0064FF" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-xl font-black"
                style={{ color: method === "토스페이" ? "#fff" : "#0064FF" }}>
                toss
              </span>
              <span className="text-[11px] font-bold"
                style={{ color: method === "토스페이" ? "#fff" : "var(--text)" }}>
                토스페이
              </span>
            </button>

            {/* 카카오페이 */}
            <button onClick={() => setMethod("카카오페이")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "카카오페이"
                ? { background: "#FEE500", borderColor: "#FEE500" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-xl">💛</span>
              <span className="text-[11px] font-bold"
                style={{ color: method === "카카오페이" ? "#3B1D1D" : "var(--text)" }}>
                카카오페이
              </span>
            </button>

            {/* 네이버페이 */}
            <button onClick={() => setMethod("네이버페이")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "네이버페이"
                ? { background: "#03C75A", borderColor: "#03C75A" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-xl font-black"
                style={{ color: method === "네이버페이" ? "#fff" : "#03C75A" }}>
                N
              </span>
              <span className="text-[11px] font-bold"
                style={{ color: method === "네이버페이" ? "#fff" : "var(--text)" }}>
                네이버페이
              </span>
            </button>
          </div>
        </div>

        {/* 환불 정책 + 약관 동의 */}
        <div className="rounded-xl p-4 border mb-4"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
          <p className="text-[10px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            <span className="font-bold" style={{ color: "var(--text)" }}>환불 정책{"\n"}</span>
            전자책(디지털 콘텐츠)은 전자상거래법 제17조에 따라 다운로드 전 7일 이내 청약철회가 가능합니다.
            단, 파일을 다운로드하신 경우 콘텐츠의 특성상 환불이 제한될 수 있습니다.
            환불 문의: sunryupatners@gmail.com
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-0.5 flex-shrink-0"
            />
            <span className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
              위 구매 조건 및 환불정책을 확인하였으며, 전자책 구매에 동의합니다.
            </span>
          </label>
        </div>

        {errMsg && (
          <p className="text-xs mb-4 text-center" style={{ color: "#ef4444" }}>{errMsg}</p>
        )}

        <button
          onClick={handlePay}
          className="w-full py-4 rounded-2xl text-base font-bold text-black active:opacity-80 transition-opacity"
          style={{ background: "var(--mint)", boxShadow: "0 4px 24px rgba(0,229,160,0.3)" }}>
          {fmt(BOOK.price)} 결제하기
        </button>

        <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
          결제 완료 후 PDF 다운로드 링크가 즉시 제공됩니다.
        </p>
      </main>
    </div>
  );
}
