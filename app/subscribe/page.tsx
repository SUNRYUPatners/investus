"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, Lock, Star, FileText, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { SUBSCRIPTION, formatSubPrice } from "@/lib/subscription";
import { getSupabase } from "@/lib/supabase";

const BENEFITS = [
  { icon: Star, title: "Investus 추천주식", desc: "CIO 선정 종목과 실시간 시세를 열람할 수 있습니다." },
  { icon: FileText, title: "이전 날짜 리포트", desc: "오늘자 리포트는 무료, 과거 리포트 전체 열람이 가능합니다." },
  { icon: Lock, title: "커피값 구독", desc: `월 ${formatSubPrice()} — 부담 없는 가격으로 Pro 기능을 이용하세요.` },
];

export default function SubscribePage() {
  const { user, loaded } = useAuth();
  const [payingCard, setPayingCard] = useState(false);
  const [error, setError] = useState("");

  const startCardPay = async () => {
    if (!user) {
      setError("로그인이 필요합니다.");
      return;
    }
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;
    if (!storeId || !channelKey) {
      setError("결제 설정이 아직 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setError("");
    setPayingCard(true);
    try {
      const PortOne = (await import("@portone/browser-sdk/v2")).default;
      const billingIssueId = `BK-${Date.now()}-${user.id.slice(0, 8)}`;
      const res = await PortOne.requestIssueBillingKey({
        storeId,
        channelKey,
        billingKeyMethod: "CARD",
        issueId: billingIssueId,
        issueName: "Investus Pro 월 구독 카드 등록",
        customer: {
          customerId: user.id,
          email: user.email,
          fullName: user.nickname || undefined,
        },
      });
      if (!res || res.code) {
        throw new Error(res?.message ?? "카드 등록이 취소되었습니다.");
      }

      const { data: { session } } = await getSupabase().auth.getSession();
      const r = await fetch("/api/portone/issue-billing-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          billingKey: res.billingKey,
          planKind: "pro",
          customerName: user.nickname || undefined,
        }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "결제 실패");
      }

      // Pro 메타데이터가 JWT에 반영되도록 세션 갱신
      await getSupabase().auth.refreshSession();
      window.location.href = "/?pro=1";
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setPayingCard(false);
    }
  };

  if (user?.isPro) {
    return (
      <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
        <Header />
        <main className="max-w-[480px] mx-auto px-4 pt-10 pb-12 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--mint)" }} />
          <p className="text-lg font-bold font-syne mb-2" style={{ color: "var(--text)" }}>이미 Pro 구독 중입니다</p>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>추천주식 · 이전 리포트를 자유롭게 이용하세요.</p>
          <Link href="/" className="text-sm font-semibold" style={{ color: "var(--mint)" }}>홈으로 →</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] mx-auto px-4 pt-4 pb-12">
        <Link href="/more" className="inline-flex items-center gap-1 text-xs mb-5" style={{ color: "var(--muted)" }}>
          <ChevronLeft className="w-3.5 h-3.5" /> 더보기
        </Link>

        <div
          className="rounded-2xl px-5 py-6 mb-5 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #001a12 0%, #0a0c10 100%)", border: "1px solid rgba(0,229,160,0.25)" }}
        >
          <p className="text-[10px] font-bold mb-2" style={{ color: "var(--mint)" }}>✦ {SUBSCRIPTION.productName}</p>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            커피값으로 시작하는<br />투자 인사이트
          </h1>
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            추천주식 · 과거 리포트 열람을 월 {formatSubPrice()}에 이용하세요.
          </p>
          <p className="text-2xl font-bold font-syne" style={{ color: "var(--mint)" }}>
            {formatSubPrice()}
            <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>/{SUBSCRIPTION.periodLabel}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3 rounded-xl border p-3.5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,229,160,0.12)" }}>
                <Icon className="w-4 h-4" style={{ color: "var(--mint)" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{title}</p>
                <p className="text-[11px] leading-relaxed mt-0.5" style={{ color: "var(--muted)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {!loaded ? null : !user ? (
          <div className="rounded-xl border p-4 mb-4 text-center" style={{ borderColor: "var(--border)" }}>
            <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>구독하려면 먼저 로그인해 주세요.</p>
            <Link href="/more" className="inline-block px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: "var(--mint)", color: "#000" }}>
              로그인하러 가기
            </Link>
          </div>
        ) : (
          <>
            {error && <p className="text-xs text-center mb-3" style={{ color: "#ef4444" }}>{error}</p>}
            <button
              onClick={startCardPay}
              disabled={payingCard}
              className="w-full py-4 rounded-2xl text-base font-bold disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              {payingCard ? (
                <><Loader2 className="w-4 h-4 animate-spin" />결제 진행중…</>
              ) : (
                <><CreditCard className="w-4 h-4" />카드로 매달 자동결제 {formatSubPrice()}</>
              )}
            </button>
            <p className="text-[10px] text-center mt-3" style={{ color: "var(--muted)" }}>
              포트원 안전결제 · 첫 결제 후 매달 자동 청구 · 언제든지 해지 가능
            </p>
          </>
        )}

        <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          문의: sunryupatners@gmail.com
          <br />본 구독은 투자 교육·정보 열람 목적이며 수익을 보장하지 않습니다.
        </p>
      </main>
    </div>
  );
}
