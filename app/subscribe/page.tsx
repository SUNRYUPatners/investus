"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, CheckCircle, Copy, Lock, Star, FileText } from "lucide-react";
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
  const [name, setName] = useState("");
  const [step, setStep] = useState<"info" | "transfer" | "done">("info");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const copy = () => {
    navigator.clipboard.writeText(SUBSCRIPTION.bank.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startTransfer = async () => {
    if (!user) {
      setError("구독하려면 로그인이 필요합니다. 더보기 탭에서 로그인해 주세요.");
      return;
    }
    const depositor = name.trim() || user.nickname || user.email.split("@")[0];
    if (!depositor) {
      setError("입금자명을 입력해 주세요.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          name: depositor,
          email: user.email,
          userId: user.id,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "신청 실패");
      }
      setName(depositor);
      setStep("transfer");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
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

  if (step === "transfer" || step === "done") {
    return (
      <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
        <Header />
        <main className="max-w-[480px] mx-auto px-4 pt-4 pb-12">
          <button onClick={() => setStep("info")} className="inline-flex items-center gap-1 text-xs mb-5" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 돌아가기
          </button>
          <div className="flex flex-col items-center gap-3 py-4 mb-4">
            <CheckCircle className="w-10 h-10" style={{ color: "var(--mint)" }} />
            <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>아래 계좌로 입금해 주세요</p>
            <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
              입금 확인 후 Pro가 활성화됩니다 (보통 수 시간 이내)
            </p>
          </div>
          <div className="rounded-2xl border p-5 mb-4" style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.25)" }}>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between"><span className="text-xs" style={{ color: "var(--muted)" }}>은행</span><span className="text-sm font-bold" style={{ color: "var(--text)" }}>{SUBSCRIPTION.bank.bank}</span></div>
              <div className="flex justify-between"><span className="text-xs" style={{ color: "var(--muted)" }}>예금주</span><span className="text-sm font-bold" style={{ color: "var(--text)" }}>{SUBSCRIPTION.bank.holder}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "var(--muted)" }}>계좌번호</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-mono" style={{ color: "var(--text)" }}>{SUBSCRIPTION.bank.number}</span>
                  <button onClick={copy} className="px-2 py-1 rounded-lg text-[10px] font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>
                    {copied ? "복사됨" : "복사"}
                  </button>
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <span className="text-xs" style={{ color: "var(--muted)" }}>입금액</span>
                <span className="text-lg font-bold" style={{ color: "var(--mint)" }}>{formatSubPrice()}/{SUBSCRIPTION.periodLabel}</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl p-4 border mb-4" style={{ background: "rgba(255,255,255,0.02)", borderColor: "var(--border)" }}>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
              입금자명에 <strong style={{ color: "var(--mint)" }}>{name}</strong> 으로 입력해 주세요.
              확인 후 가입 이메일({user?.email})에 Pro가 연결됩니다.
            </p>
          </div>
          <a
            href={`mailto:sunryupatners@gmail.com?subject=${encodeURIComponent("Investus Pro 입금 완료")}&body=${encodeURIComponent(`입금자명: ${name}\n이메일: ${user?.email ?? ""}\n금액: ${formatSubPrice()}`)}`}
            className="flex items-center justify-center w-full py-3 rounded-2xl text-xs font-semibold border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            입금 완료 후 메일로 알려주기
          </a>
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

        <div className="rounded-2xl px-5 py-6 mb-5 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #001a12 0%, #0a0c10 100%)", border: "1px solid rgba(0,229,160,0.25)" }}>
          <p className="text-[10px] font-bold mb-2" style={{ color: "var(--mint)" }}>✦ {SUBSCRIPTION.productName}</p>
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            커피값으로 시작하는<br />투자 인사이트
          </h1>
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            추천주식 · 과거 리포트 열람을 월 {formatSubPrice()}에 이용하세요.
          </p>
          <p className="text-2xl font-bold font-syne" style={{ color: "var(--mint)" }}>
            {formatSubPrice()}<span className="text-sm font-medium" style={{ color: "var(--muted)" }}>/{SUBSCRIPTION.periodLabel}</span>
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
            <div className="mb-3">
              <p className="text-[11px] mb-1.5" style={{ color: "var(--muted)" }}>입금자명</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={user.nickname || "홍길동"}
                className="w-full rounded-xl px-3 py-3 border text-sm outline-none"
                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>
            {error && <p className="text-xs text-center mb-3" style={{ color: "#ef4444" }}>{error}</p>}
            <button
              onClick={startTransfer}
              disabled={submitting}
              className="w-full py-4 rounded-2xl text-base font-bold disabled:opacity-60"
              style={{ background: "var(--mint)", color: "#000" }}
            >
              {submitting ? "신청 중…" : `계좌이체로 구독하기 ${formatSubPrice()}`}
            </button>
          </>
        )}

        <p className="text-[10px] text-center mt-4 leading-relaxed" style={{ color: "var(--muted)" }}>
          입금 확인 후 수동으로 Pro가 활성화됩니다. 문의: sunryupatners@gmail.com
          <br />본 구독은 투자 교육·정보 열람 목적이며 수익을 보장하지 않습니다.
        </p>
      </main>
    </div>
  );
}
