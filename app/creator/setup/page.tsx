"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Trash2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

const AVATARS = ["🦁", "🚀", "👑", "💰", "🐂", "🦅", "🎯", "💎", "🔥", "🌊", "⚡", "🧠"];
const TAG_OPTIONS = ["가치투자", "성장주", "배당주", "ETF", "테크", "AI반도체", "장기홀딩", "단기트레이딩", "적립식", "배당성장", "현금흐름", "패시브투자"];
const PRICE_OPTIONS = [0, 9900, 15000, 19000, 29000, 39000, 49000, 59000];

type Holding = { symbol: string; name: string; allocation: number };

type CreatorDraft = {
  nickname: string;
  avatar: string;
  bio: string;
  tags: string[];
  subscriptionPrice: number;
  broker: string;
  portfolio: Holding[];
};

const EMPTY: CreatorDraft = {
  nickname: "",
  avatar: "🦁",
  bio: "",
  tags: [],
  subscriptionPrice: 29000,
  broker: "",
  portfolio: [],
};

export default function CreatorSetupPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<CreatorDraft>(EMPTY);
  const [newSymbol, setNewSymbol] = useState("");
  const [newName, setNewName] = useState("");
  const [newAlloc, setNewAlloc] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!user) router.replace("/more");
  }, [user, router]);

  if (!user) return null;

  const totalAlloc = draft.portfolio.reduce((s, h) => s + h.allocation, 0);

  const addHolding = () => {
    const alloc = parseFloat(newAlloc);
    if (!newSymbol || isNaN(alloc) || alloc <= 0) return;
    setDraft((d) => ({ ...d, portfolio: [...d.portfolio, { symbol: newSymbol.toUpperCase(), name: newName || newSymbol.toUpperCase(), allocation: alloc }] }));
    setNewSymbol(""); setNewName(""); setNewAlloc("");
  };

  const removeHolding = (i: number) => {
    setDraft((d) => ({ ...d, portfolio: d.portfolio.filter((_, idx) => idx !== i) }));
  };

  const toggleTag = (t: string) => {
    setDraft((d) => ({
      ...d,
      tags: d.tags.includes(t) ? d.tags.filter((x) => x !== t) : d.tags.length < 5 ? [...d.tags, t] : d.tags,
    }));
  };

  const finish = () => {
    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("investus_my_creator") ?? "null");
      const payload = { ...draft, id: user.phone, createdAt: new Date().toISOString() };
      localStorage.setItem("investus_my_creator", JSON.stringify(payload));
    } catch {}
    setDone(true);
  };

  const canNext1 = draft.nickname.trim().length >= 2 && draft.bio.trim().length >= 10 && draft.tags.length >= 1;
  const canNext2 = draft.portfolio.length >= 1 && draft.broker.trim().length >= 2;

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6" style={{ background: "var(--bg)" }}>
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl" style={{ background: "rgba(0,229,160,0.15)" }}>
          {draft.avatar}
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>크리에이터 등록 완료! 🎉</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {draft.nickname}님의 크리에이터 프로필이 등록되었습니다.<br />
            구독자들이 포트폴리오와 콘텐츠를 구독할 수 있어요.
          </p>
        </div>

        <div className="w-full max-w-xs rounded-2xl border p-4 text-sm"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex justify-between mb-2">
            <span style={{ color: "var(--muted)" }}>구독료</span>
            <span className="font-mono-num font-bold" style={{ color: "var(--text)" }}>
              {draft.subscriptionPrice === 0 ? "무료" : `₩${draft.subscriptionPrice.toLocaleString()}/월`}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span style={{ color: "var(--muted)" }}>수수료 (10%)</span>
            <span className="font-mono-num" style={{ color: "var(--muted)" }}>
              {draft.subscriptionPrice === 0 ? "—" : `₩${Math.round(draft.subscriptionPrice * 0.1).toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between border-t pt-2" style={{ borderColor: "var(--border)" }}>
            <span className="font-bold" style={{ color: "var(--text)" }}>정산 수익</span>
            <span className="font-mono-num font-bold" style={{ color: "var(--mint)" }}>
              {draft.subscriptionPrice === 0 ? "무료" : `₩${Math.round(draft.subscriptionPrice * 0.9).toLocaleString()}/구독`}
            </span>
          </div>
        </div>

        <Link href="/creator/dashboard"
          className="w-full max-w-xs py-3.5 rounded-2xl text-sm font-bold text-black text-center block"
          style={{ background: "var(--mint)" }}>
          내 크리에이터 채널 관리하기 →
        </Link>
        <Link href="/wall"
          className="w-full max-w-xs py-2 text-xs text-center block mt-2"
          style={{ color: "var(--muted)" }}>
          종목이야기로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto pb-24 lg:pb-10">
        {/* Back */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/wall" className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />종목이야기 / 크리에이터 되기
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-4 py-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full transition-all"
              style={{ background: s <= step ? "var(--mint)" : "var(--border)" }} />
          ))}
        </div>

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>기본 프로필 설정</h1>
            <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>구독자들에게 보여질 프로필을 설정해 주세요</p>

            {/* Avatar picker */}
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>아바타 선택</p>
            <div className="grid grid-cols-6 gap-2 mb-5">
              {AVATARS.map((a) => (
                <button key={a} onClick={() => setDraft((d) => ({ ...d, avatar: a }))}
                  className="h-10 rounded-xl flex items-center justify-center text-xl transition-all border"
                  style={draft.avatar === a
                    ? { borderColor: "var(--mint)", background: "rgba(0,229,160,0.1)" }
                    : { borderColor: "var(--border)", background: "var(--card)" }}>
                  {a}
                </button>
              ))}
            </div>

            {/* Nickname */}
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>닉네임</p>
            <input
              value={draft.nickname}
              onChange={(e) => setDraft((d) => ({ ...d, nickname: e.target.value }))}
              placeholder="예: 장기투자_한재원"
              maxLength={20}
              className="w-full px-4 py-3 rounded-2xl border mb-4 text-sm outline-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
            />

            {/* Bio */}
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>한 줄 소개</p>
            <textarea
              value={draft.bio}
              onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              placeholder="투자 스타일, 경력, 전문 분야를 소개해 주세요"
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 rounded-2xl border mb-4 text-sm outline-none resize-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
            />

            {/* Tags */}
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>투자 스타일 태그 (최대 5개)</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TAG_OPTIONS.map((t) => (
                <button key={t} onClick={() => toggleTag(t)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all"
                  style={draft.tags.includes(t)
                    ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                    : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canNext1}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity"
              style={{ background: "var(--mint)", opacity: canNext1 ? 1 : 0.4 }}>
              다음 — 포트폴리오 입력 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Portfolio */}
        {step === 2 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>포트폴리오 공개</h1>
            <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>실제 보유 종목을 입력해 주세요. 나중에 수정 가능합니다.</p>

            {/* Broker */}
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>증권사 (인증용)</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {["키움증권", "삼성증권", "미래에셋증권", "NH투자증권"].map((b) => (
                <button key={b} onClick={() => setDraft((d) => ({ ...d, broker: b }))}
                  className="text-xs px-3 py-2 rounded-xl border transition-all"
                  style={draft.broker === b
                    ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                    : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                  {b}
                </button>
              ))}
            </div>

            {/* Holding list */}
            {draft.portfolio.length > 0 && (
              <div className="rounded-2xl border mb-3 overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {draft.portfolio.map((h, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < draft.portfolio.length - 1 ? "border-b" : ""}`}
                    style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs font-bold font-mono-num flex-1" style={{ color: "var(--text)" }}>{h.symbol}</span>
                    <span className="text-xs flex-1" style={{ color: "var(--muted)" }}>{h.name}</span>
                    <span className="text-xs font-mono-num" style={{ color: "var(--mint)" }}>{h.allocation}%</span>
                    <button onClick={() => removeHolding(i)} className="ml-1">
                      <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
                    </button>
                  </div>
                ))}
                <div className="flex items-center justify-end px-4 py-2 border-t" style={{ borderColor: "var(--border)" }}>
                  <span className="text-[10px]" style={{ color: totalAlloc > 100 ? "#ff4d6d" : "var(--muted)" }}>
                    합계 {totalAlloc.toFixed(1)}% {totalAlloc > 100 && "⚠️ 100% 초과"}
                  </span>
                </div>
              </div>
            )}

            {/* Add holding form */}
            <div className="rounded-2xl border p-4 mb-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--muted)" }}>종목 추가</p>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input value={newSymbol} onChange={(e) => setNewSymbol(e.target.value)} placeholder="티커 (AAPL)" className="col-span-1 px-3 py-2.5 rounded-xl border text-xs outline-none uppercase" style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="종목명" className="col-span-1 px-3 py-2.5 rounded-xl border text-xs outline-none" style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                <input value={newAlloc} onChange={(e) => setNewAlloc(e.target.value)} placeholder="비중%" type="number" min="0" max="100" className="col-span-1 px-3 py-2.5 rounded-xl border text-xs outline-none" style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <button onClick={addHolding} className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.2)" }}>
                <Plus className="w-3.5 h-3.5" />종목 추가
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-2xl text-sm font-bold border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                이전
              </button>
              <button onClick={() => setStep(3)} disabled={!canNext2}
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity"
                style={{ background: "var(--mint)", opacity: canNext2 ? 1 : 0.4 }}>
                다음 — 구독 설정 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Subscription */}
        {step === 3 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>구독 요금 설정</h1>
            <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>구독자가 월 납부하는 금액을 설정합니다. 수수료 10% 제외 후 정산됩니다.</p>

            <div className="grid grid-cols-2 gap-2 mb-5">
              {PRICE_OPTIONS.map((p) => (
                <button key={p} onClick={() => setDraft((d) => ({ ...d, subscriptionPrice: p }))}
                  className="py-4 rounded-2xl border text-center transition-all"
                  style={draft.subscriptionPrice === p
                    ? { borderColor: "var(--mint)", background: "rgba(0,229,160,0.06)" }
                    : { borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>
                    {p === 0 ? "무료" : `₩${p.toLocaleString()}`}
                  </div>
                  {p > 0 && (
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                      정산 ₩{Math.round(p * 0.9).toLocaleString()}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Revenue summary */}
            <div className="rounded-2xl p-4 mb-6 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="text-xs font-bold mb-3" style={{ color: "var(--muted)" }}>예상 수익 시뮬레이션</h3>
              {[100, 500, 1000].map((n) => (
                <div key={n} className="flex justify-between text-xs mb-2">
                  <span style={{ color: "var(--muted)" }}>구독자 {n.toLocaleString()}명</span>
                  <span className="font-mono-num font-bold" style={{ color: "var(--mint)" }}>
                    {draft.subscriptionPrice === 0
                      ? "무료"
                      : `₩${Math.round(draft.subscriptionPrice * 0.9 * n).toLocaleString()}/월`}
                  </span>
                </div>
              ))}
            </div>

            {/* Verification info */}
            <div className="rounded-2xl p-4 mb-6 border" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.15)" }}>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>계좌 인증 안내</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    수익률 공개를 위해 {draft.broker || "선택한 증권사"} 계좌 연동이 필요합니다.
                    등록 후 담당자가 24시간 내 연락드립니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-2xl text-sm font-bold border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                이전
              </button>
              <button onClick={finish}
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2"
                style={{ background: "var(--mint)" }}>
                <CheckCircle2 className="w-4 h-4" />등록 완료
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
