"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getSupabase } from "@/lib/supabase";

const BOOK = {
  title:  "절대로 잃지 말고 미래에 투자하라",
  author: "SUNRYU Partners CIO",
  desc:   "잃지 않는 투자의 원칙부터 미래 유망 섹터까지 — 실전 중심의 미국주식 투자 전략",
  price:  19900,
};

function fmt(n: number) {
  return "₩" + n.toLocaleString("ko-KR");
}

export default function BuyPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [payingCard, setPayingCard] = useState(false);

  const handleCardPay = async () => {
    const buyerName = name.trim() || user?.nickname || "";
    const buyerEmail = email.trim() || user?.email || "";
    if (!buyerName) { setErrMsg("이름을 입력해주세요."); return; }
    if (!buyerEmail) { setErrMsg("PDF 수신용 이메일을 입력해주세요."); return; }
    if (!termsAgreed) { setErrMsg("구매 조건 및 환불정책에 동의해주세요."); return; }

    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;
    if (!storeId || !channelKey) {
      setErrMsg("결제 설정이 아직 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setErrMsg("");
    setPayingCard(true);
    try {
      const PortOne = (await import("@portone/browser-sdk/v2")).default;
      const paymentId = `EBOOK-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const res = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName: BOOK.title,
        totalAmount: BOOK.price,
        currency: "KRW",
        payMethod: "CARD",
        customer: {
          fullName: buyerName,
          email: buyerEmail,
          customerId: user?.id,
        },
      });
      if (!res || res.code) throw new Error(res?.message ?? "결제가 취소되었습니다.");

      const { data: { session } } = await getSupabase().auth.getSession();
      const v = await fetch("/api/portone/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          paymentId,
          expectedAmountKrw: BOOK.price,
          itemKind: "ebook",
          customerEmail: buyerEmail,
          customerName: buyerName,
        }),
      });
      if (!v.ok) {
        const d = await v.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "결제 검증 실패");
      }

      try {
        await fetch("/api/book-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: buyerName,
            email: buyerEmail,
            paid: true,
            paymentId,
          }),
        });
      } catch { /* 알림 실패 무시 */ }

      window.location.href = `/buy/success?paymentId=${paymentId}&amount=${BOOK.price}`;
    } catch (e) {
      setErrMsg((e as Error).message);
    } finally {
      setPayingCard(false);
    }
  };

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-xl mx-auto px-4 lg:px-8 pt-4 pb-12 lg:pb-10">
        <Link href="/insight" className="inline-flex items-center gap-1 text-xs mb-5" style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> 인사이트
        </Link>

        <h1 className="text-base font-bold font-syne mb-5" style={{ color: "var(--text)" }}>
          전자책 구매
        </h1>

        <div className="rounded-2xl p-4 border mb-5 flex gap-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div
            className="w-[72px] h-[100px] rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1 shadow-lg"
            style={{
              background: "linear-gradient(160deg, #0f2d1e, #071510)",
              border: "1px solid rgba(0,229,160,0.3)",
              boxShadow: "0 8px 24px rgba(0,229,160,0.15)",
            }}
          >
            <span className="text-2xl">📈</span>
            <p className="text-[7px] font-bold text-center px-1 leading-tight" style={{ color: "var(--mint)" }}>
              절대로 잃지말고<br />미래에 투자
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>{BOOK.title}</p>
            <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>{BOOK.author}</p>
            <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{BOOK.desc}</p>
            <p className="text-lg font-bold font-mono-num" style={{ color: "var(--mint)" }}>{fmt(BOOK.price)}</p>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            구매자 정보
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-10 flex-shrink-0" style={{ color: "var(--muted)" }}>이름</span>
              <input
                type="text"
                placeholder={user?.nickname || "홍길동 (필수)"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-[11px] w-10 flex-shrink-0" style={{ color: "var(--muted)" }}>이메일</span>
              <input
                type="email"
                placeholder={user?.email || "PDF 받을 이메일 (필수)"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)" }}
              />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
            결제 수단
          </p>
          <div className="flex items-center gap-3 rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--mint)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(96,165,250,0.12)" }}>
              <CreditCard className="w-5 h-5" style={{ color: "#60a5fa" }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>신용·체크카드</p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>포트원 안전결제 · 즉시 처리</p>
            </div>
            <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "var(--mint)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: "var(--mint)" }} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 border mb-4" style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
          <p className="text-[10px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
            <span className="font-bold" style={{ color: "var(--text)" }}>환불 정책{"\n"}</span>
            전자책(디지털 콘텐츠)은 전자상거래법 제17조에 따라 다운로드 전 7일 이내 청약철회가 가능합니다.
            단, 파일을 다운로드하신 경우 환불이 제한될 수 있습니다.
            환불 문의: sunryupatners@gmail.com
          </p>
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} className="mt-0.5 flex-shrink-0" />
            <span className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
              위 구매 조건 및 환불정책을 확인하였으며, 전자책 구매에 동의합니다.
            </span>
          </label>
        </div>

        {errMsg && <p className="text-xs mb-4 text-center" style={{ color: "#ef4444" }}>{errMsg}</p>}

        <button
          onClick={handleCardPay}
          disabled={payingCard}
          className="w-full py-4 rounded-2xl text-base font-bold text-black active:opacity-80 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          style={{ background: "var(--mint)", boxShadow: "0 4px 24px rgba(0,229,160,0.3)" }}
        >
          {payingCard ? (
            <><Loader2 className="w-4 h-4 animate-spin" />결제 진행중…</>
          ) : (
            <><CreditCard className="w-4 h-4" />{fmt(BOOK.price)} 카드로 결제하기</>
          )}
        </button>
        <p className="text-[10px] text-center mt-3" style={{ color: "var(--muted)" }}>
          결제 즉시 PDF 안내를 이메일로 발송합니다
        </p>
      </main>
    </div>
  );
}
