"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, Lock, Star, FileText, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  SUBSCRIPTION,
  SUB_PAY_METHODS,
  formatSubPrice,
  planPriceKrw,
  planLabel,
  type SubPeriod,
  type SubPayMethod,
} from "@/lib/subscription";
import { getSupabase } from "@/lib/supabase";

const BENEFITS = [
  { icon: Star, title: "Investus 추천주식", desc: "CIO 선정 종목과 실시간 시세를 열람할 수 있습니다." },
  { icon: FileText, title: "이전 날짜 리포트", desc: "오늘자 리포트는 무료, 과거 리포트 전체 열람이 가능합니다." },
  { icon: Lock, title: "부담 없는 구독", desc: "월·연 선택 · 카카오·네이버·토스·카드로 결제" },
];

function PayIcon({ id }: { id: SubPayMethod }) {
  if (id === "KAKAOPAY") {
    return (
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
        style={{ background: "#FEE500", color: "#3C1E1E" }}
      >
        K
      </span>
    );
  }
  if (id === "NAVERPAY") {
    return (
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
        style={{ background: "#03C75A", color: "#fff" }}
      >
        N
      </span>
    );
  }
  if (id === "TOSSPAY") {
    return (
      <span
        className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black flex-shrink-0"
        style={{ background: "#0064FF", color: "#fff" }}
      >
        toss
      </span>
    );
  }
  return (
    <span
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: "rgba(0,229,160,0.12)" }}
    >
      <CreditCard className="w-4 h-4" style={{ color: "var(--mint)" }} />
    </span>
  );
}

export default function SubscribePage() {
  const { user, loaded } = useAuth();
  const [period, setPeriod] = useState<SubPeriod>("month");
  const [payMethod, setPayMethod] = useState<SubPayMethod>("CARD");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");

  const price = planPriceKrw(period);
  const monthlyEquiv = period === "year" ? Math.round(SUBSCRIPTION.yearlyPriceKrw / 12) : SUBSCRIPTION.priceKrw;

  const startPay = async () => {
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
    setPaying(true);
    try {
      const PortOne = (await import("@portone/browser-sdk/v2")).default;
      const billingIssueId = `BK-${period}-${Date.now()}-${user.id.slice(0, 8)}`;
      const isEasy = payMethod !== "CARD";

      const res = await PortOne.requestIssueBillingKey({
        storeId,
        channelKey,
        billingKeyMethod: isEasy ? "EASY_PAY" : "CARD",
        ...(isEasy
          ? { easyPay: { easyPayProvider: payMethod } }
          : {}),
        issueId: billingIssueId,
        issueName: `Investus Pro ${period === "year" ? "연간" : "월간"} 구독`,
        displayAmount: price,
        currency: "KRW",
        offerPeriod: { interval: period === "year" ? "1y" : "1m" },
        customer: {
          customerId: user.id,
          email: user.email,
          fullName: user.nickname || undefined,
        },
      });
      if (!res || res.code) {
        throw new Error(res?.message ?? "결제가 취소되었습니다.");
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
          planPeriod: period,
          customerName: user.nickname || undefined,
          payMethod,
        }),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "결제 실패");
      }

      await getSupabase().auth.refreshSession();
      window.location.href = "/?pro=1";
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setPaying(false);
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
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
            추천주식 · 과거 리포트 열람을 월·연 구독으로 이용하세요.
          </p>
        </div>

        <div className="flex flex-col gap-2 mb-5">
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

        {/* 플랜 선택 */}
        <p className="text-xs font-semibold tracking-widest uppercase mb-2 font-syne" style={{ color: "var(--muted)" }}>
          구독 기간
        </p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {([
            { id: "month" as const, title: "월간", price: SUBSCRIPTION.priceKrw, sub: "매월 자동결제" },
            { id: "year" as const, title: "연간", price: SUBSCRIPTION.yearlyPriceKrw, sub: `월 ${formatSubPrice(monthlyEquiv)} · 2개월 무료` },
          ]).map((p) => {
            const active = period === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className="rounded-2xl border p-3.5 text-left transition-opacity"
                style={{
                  background: active ? "rgba(0,229,160,0.08)" : "var(--card)",
                  borderColor: active ? "var(--mint)" : "var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold" style={{ color: "var(--text)" }}>{p.title}</span>
                  {p.id === "year" && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--mint)", color: "#000" }}>
                      BEST
                    </span>
                  )}
                </div>
                <p className="text-lg font-bold font-syne" style={{ color: active ? "var(--mint)" : "var(--text)" }}>
                  {formatSubPrice(p.price)}
                  <span className="text-[11px] font-medium" style={{ color: "var(--muted)" }}>/{planLabel(p.id)}</span>
                </p>
                <p className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>{p.sub}</p>
              </button>
            );
          })}
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
            {/* 결제 수단 */}
            <p className="text-xs font-semibold tracking-widest uppercase mb-2 font-syne" style={{ color: "var(--muted)" }}>
              결제 수단
            </p>
            <div className="flex flex-col gap-2 mb-5">
              {SUB_PAY_METHODS.map((m) => {
                const active = payMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPayMethod(m.id)}
                    className="flex items-center gap-3 rounded-2xl border p-3.5 text-left"
                    style={{
                      background: active ? "rgba(0,229,160,0.08)" : "var(--card)",
                      borderColor: active ? "var(--mint)" : "var(--border)",
                    }}
                  >
                    <PayIcon id={m.id} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{m.label}</p>
                      <p className="text-[11px]" style={{ color: "var(--muted)" }}>{m.hint}</p>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{ borderColor: active ? "var(--mint)" : "var(--border)" }}
                    >
                      {active && <div className="w-2 h-2 rounded-full" style={{ background: "var(--mint)" }} />}
                    </div>
                  </button>
                );
              })}
            </div>

            {error && <p className="text-xs text-center mb-3" style={{ color: "#ef4444" }}>{error}</p>}

            <button
              onClick={startPay}
              disabled={paying}
              className="w-full py-4 rounded-2xl text-base font-bold disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              {paying ? (
                <><Loader2 className="w-4 h-4 animate-spin" />결제 진행중…</>
              ) : (
                <>{formatSubPrice(price)} {period === "year" ? "연간" : "월간"} 결제하기</>
              )}
            </button>
            <p className="text-[10px] text-center mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              포트원 안전결제 · 첫 결제 후 {period === "year" ? "매년" : "매달"} 자동 청구 · 언제든지 해지 가능
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
