"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, XCircle, CreditCard, Loader2, Download } from "lucide-react";
import Link from "next/link";

const BOOK = {
  title:    "절대로 잃지 말고 미래에 투자하라",
  author:   "SUNRYU Partners CIO",
  desc:     "잃지 않는 투자의 원칙부터 미래 유망 섹터까지 — 실전 중심의 미국주식 투자 전략",
  price:    19900,
  file:     "/ebook/book.pdf",
};

type PayMethod = "KAKAOPAY" | "NAVERPAY" | "CARD";
type Step      = "form" | "loading" | "success" | "fail";

declare global {
  interface Window {
    PortOne?: {
      requestPayment: (params: object) => Promise<{
        code?: string;
        message?: string;
        paymentId?: string;
        txId?: string;
      }>;
    };
  }
}

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

/* ── 결제 완료 화면 ── */
function SuccessScreen({ name }: { name: string }) {
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
          {name}님, 구매해 주셔서 감사합니다.
        </p>
      </div>

      {/* Download card */}
      <div className="w-full max-w-sm rounded-2xl border p-5 text-center"
        style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.25)" }}>
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>
          {BOOK.title}
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
          아래 버튼을 눌러 PDF를 다운로드하세요.
        </p>
        <a
          href={BOOK.file}
          download="절대로 잃지 말고 미래에 투자하라.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-black"
          style={{ background: "var(--mint)", boxShadow: "0 4px 20px rgba(0,229,160,0.3)" }}
        >
          <Download className="w-4 h-4" />
          PDF 다운로드
        </a>
      </div>

      <Link href="/insight"
        className="text-xs"
        style={{ color: "var(--muted)" }}>
        인사이트로 돌아가기
      </Link>
    </div>
  );
}

/* ── 결제 실패 화면 ── */
function FailScreen({ msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6"
      style={{ background: "var(--bg)" }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "rgba(255,77,109,0.15)" }}>
        <XCircle className="w-10 h-10" style={{ color: "#ef4444" }} />
      </div>
      <div className="text-center">
        <p className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>결제 실패</p>
        <p className="text-sm" style={{ color: "var(--muted)" }}>{msg}</p>
      </div>
      <button onClick={onRetry}
        className="px-8 py-3 rounded-2xl text-sm font-bold text-black"
        style={{ background: "var(--mint)" }}>
        다시 시도
      </button>
    </div>
  );
}

export default function BuyPage() {
  const [method,      setMethod]      = useState<PayMethod>("KAKAOPAY");
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [step,        setStep]        = useState<Step>("form");
  const [errMsg,      setErrMsg]      = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const sdkReady                      = useRef(false);

  /* Load PortOne V2 SDK */
  useEffect(() => {
    if (document.querySelector('script[src*="portone.io"]')) { sdkReady.current = true; return; }
    const s   = document.createElement("script");
    s.src     = "https://cdn.portone.io/v2/browser-sdk.js";
    s.async   = true;
    s.onload  = () => { sdkReady.current = true; };
    document.head.appendChild(s);
  }, []);

  const handlePay = async () => {
    if (!name.trim()) { setErrMsg("이름을 입력해주세요."); return; }
    if (!termsAgreed) { setErrMsg("구매 조건 및 환불정책에 동의해주세요."); return; }

    const storeId   = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const kakaoKey  = process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY_KEY;
    const naverKey  = process.env.NEXT_PUBLIC_PORTONE_NAVERPAY_KEY;
    const cardKey   = process.env.NEXT_PUBLIC_PORTONE_CARD_KEY;

    if (!storeId) {
      setErrMsg("결제 설정이 완료되지 않았습니다. .env.local 파일을 확인하세요.");
      return;
    }

    const channelKey = method === "KAKAOPAY" ? kakaoKey
                     : method === "NAVERPAY"  ? naverKey
                     : cardKey;

    if (!channelKey) {
      setErrMsg(`${method} 채널키가 설정되지 않았습니다.`);
      return;
    }

    if (!sdkReady.current || !window.PortOne) {
      setErrMsg("결제 모듈 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setErrMsg("");
    setStep("loading");

    const paymentId = `ebook-${Date.now()}`;

    const params: Record<string, unknown> = {
      storeId,
      channelKey,
      paymentId,
      orderName:   BOOK.title,
      totalAmount: BOOK.price,
      currency:    "KRW",
      customer:    { fullName: name.trim(), email: email.trim() || undefined },
    };

    if (method === "KAKAOPAY") {
      params.payMethod = "EASY_PAY";
      params.easyPay   = { easyPayProvider: "KAKAOPAY" };
    } else if (method === "NAVERPAY") {
      params.payMethod = "EASY_PAY";
      params.easyPay   = { easyPayProvider: "NAVERPAY" };
    } else {
      params.payMethod = "CARD";
    }

    try {
      const res = await window.PortOne.requestPayment(params);
      if (res.code) {
        const cancelled = res.message?.toLowerCase().includes("cancel") ||
                          res.code === "FAILURE_TYPE_PG";
        if (cancelled) {
          setStep("form");
        } else {
          setErrMsg(res.message ?? "결제에 실패했습니다.");
          setStep("fail");
        }
      } else {
        setStep("success");
      }
    } catch {
      setErrMsg("결제 처리 중 오류가 발생했습니다.");
      setStep("fail");
    }
  };

  if (step === "success") return <SuccessScreen name={name} />;
  if (step === "fail")    return <FailScreen msg={errMsg} onRetry={() => { setStep("form"); setErrMsg(""); }} />;

  if (step === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "var(--bg)" }}>
        <Loader2 className="w-10 h-10 animate-spin" style={{ color: "var(--mint)" }} />
        <p className="text-sm" style={{ color: "var(--muted)" }}>결제 창을 불러오는 중…</p>
      </div>
    );
  }

  /* ── 결제 폼 ── */
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

        {/* ── 상품 카드 ── */}
        <div className="rounded-2xl p-4 border mb-5 flex gap-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="w-[72px] h-[100px] rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 shadow-lg"
            style={{
              background: "linear-gradient(160deg, #0f2d1e, #071510)",
              border: "1px solid rgba(0,229,160,0.3)",
              boxShadow: "0 8px 24px rgba(0,229,160,0.15)",
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

        {/* ── 구매자 정보 ── */}
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

        {/* ── 결제 수단 ── */}
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne"
            style={{ color: "var(--muted)" }}>
            결제 수단
          </p>
          <div className="grid grid-cols-3 gap-2">

            {/* 카카오페이 */}
            <button
              onClick={() => setMethod("KAKAOPAY")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "KAKAOPAY"
                ? { background: "#FEE500", borderColor: "#FEE500" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-2xl">💛</span>
              <span className="text-[11px] font-bold"
                style={{ color: method === "KAKAOPAY" ? "#3B1D1D" : "var(--text)" }}>
                카카오페이
              </span>
            </button>

            {/* 네이버페이 */}
            <button
              onClick={() => setMethod("NAVERPAY")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "NAVERPAY"
                ? { background: "#03C75A", borderColor: "#03C75A" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-2xl font-bold"
                style={{ color: method === "NAVERPAY" ? "#fff" : "#03C75A", fontFamily: "sans-serif" }}>
                N
              </span>
              <span className="text-[11px] font-bold"
                style={{ color: method === "NAVERPAY" ? "#fff" : "var(--text)" }}>
                네이버페이
              </span>
            </button>

            {/* 신용·체크카드 */}
            <button
              onClick={() => setMethod("CARD")}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
              style={method === "CARD"
                ? { background: "var(--mint)", borderColor: "var(--mint)" }
                : { background: "var(--card)", borderColor: "var(--border)" }}>
              <CreditCard
                className="w-6 h-6"
                style={{ color: method === "CARD" ? "#000" : "var(--text)" }}
              />
              <span className="text-[11px] font-bold"
                style={{ color: method === "CARD" ? "#000" : "var(--text)" }}>
                카드결제
              </span>
            </button>
          </div>

          <p className="text-[10px] mt-2 text-center" style={{ color: "var(--muted)" }}>
            {method === "CARD"     && "국내외 전 카드사 · 일시불 · 할부"}
            {method === "KAKAOPAY" && "카카오페이 앱 간편결제"}
            {method === "NAVERPAY" && "네이버페이 포인트 · 카드 연동"}
          </p>
        </div>

        {/* 환불 정책 + 약관 동의 */}
        <div className="rounded-xl p-4 border mb-4"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
          <p className="text-[10px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            <span className="font-bold" style={{ color: "var(--text)" }}>환불 정책</span>{"\n"}
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
