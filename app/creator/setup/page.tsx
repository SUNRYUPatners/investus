"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Plus, Trash2,
  ShieldCheck, CheckCircle2, Upload, Eye, EyeOff,
} from "lucide-react";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";

const AVATARS = ["🦁", "🚀", "👑", "💰", "🐂", "🦅", "🎯", "💎", "🔥", "🌊", "⚡", "🧠"];
const TAG_OPTIONS = ["가치투자", "성장주", "배당주", "ETF", "테크", "AI반도체", "장기홀딩", "단기트레이딩", "적립식", "배당성장", "현금흐름", "패시브투자"];
const BROKERS = ["키움증권", "삼성증권", "미래에셋증권", "NH투자증권", "토스증권", "카카오페이증권", "신한투자증권", "기타"];

type Holding = { symbol: string; name: string; allocation: number };
type CreatorDraft = {
  nickname: string; avatar: string; bio: string; tags: string[];
  broker: string; portfolio: Holding[];
};

const EMPTY: CreatorDraft = {
  nickname: "", avatar: "🦁", bio: "", tags: [],
  broker: "", portfolio: [],
};

/* ── Inline login/signup ──────────────────────────────────── */
function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const { login, signup } = useAuth();
  const [mode, setMode]         = useState<"login" | "signup">("login");
  const [email, setEmail]       = useState("");
  const [pw, setPw]             = useState("");
  const [visible, setVisible]   = useState(false);
  const [error, setError]       = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);

  const handleLogin = async () => {
    if (!email.includes("@")) { setError("올바른 이메일 주소를 입력해주세요."); return; }
    const ok = await login(email, pw);
    if (!ok) { setError("이메일 또는 비밀번호가 올바르지 않습니다."); return; }
    onSuccess();
  };
  const handleSignup = async () => {
    if (!email.includes("@")) { setError("올바른 이메일 주소를 입력해주세요."); return; }
    if (pw.length < 6) { setError("비밀번호는 6자 이상이어야 합니다."); return; }
    const result = await signup(email, pw);
    if (!result.ok) { setError(result.msg); return; }
    if (result.msg === "confirm_email") { setConfirmEmail(true); return; }
    onSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h1 className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            크리에이터 되기
          </h1>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            로그인 후 크리에이터로 등록할 수 있어요
          </p>
        </div>

        <div className="rounded-2xl border p-5 flex flex-col gap-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            {(["login", "signup"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2 text-xs font-bold transition-all"
                style={mode === m ? { background: "var(--mint)", color: "#000" } : { color: "var(--muted)" }}>
                {m === "login" ? "로그인" : "회원가입"}
              </button>
            ))}
          </div>

          {confirmEmail ? (
            <div className="flex flex-col items-center gap-3 py-3">
              <span className="text-2xl">📬</span>
              <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
                {email}로 인증 링크를 보냈습니다.<br />링크 클릭 후 로그인해주세요.
              </p>
              <button onClick={() => { setConfirmEmail(false); setMode("login"); }}
                className="text-xs font-bold px-4 py-2 rounded-xl" style={{ background: "var(--mint)", color: "#000" }}>
                로그인으로 이동
              </button>
            </div>
          ) : (
          <input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
          />

          )}
          {!confirmEmail && (
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-10"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
            <button onClick={() => setVisible((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2">
              {visible ? <EyeOff className="w-4 h-4" style={{ color: "var(--muted)" }} /> : <Eye className="w-4 h-4" style={{ color: "var(--muted)" }} />}
            </button>
          </div>
          )}

          {error && <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>}

          {!confirmEmail && <button
            onClick={mode === "login" ? handleLogin : handleSignup}
            className="w-full py-3 rounded-xl text-sm font-bold"
            style={{ background: "var(--mint)", color: "#000" }}>
            {mode === "login" ? "로그인 후 시작하기" : "가입하고 시작하기"}
          </button>}
        </div>

        <Link href="/wall" className="block text-center mt-4 text-xs" style={{ color: "var(--muted)" }}>
          ← 종목이야기로 돌아가기
        </Link>
      </div>
    </div>
  );
}

/* ── Main setup page ──────────────────────────────────────── */
export default function CreatorSetupPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [ready, setReady]     = useState(false);
  const [step, setStep]       = useState(1);
  const [draft, setDraft]     = useState<CreatorDraft>(EMPTY);
  const [newSymbol, setNewSymbol] = useState("");
  const [newName, setNewName]     = useState("");
  const [newAlloc, setNewAlloc]   = useState("");

  // Step 4 (verification)
  const fileRef                         = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null);
  const [submitting, setSubmitting]     = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [creatorAgreed, setCreatorAgreed] = useState(false);

  useEffect(() => {
    // Check if already a creator
    try {
      const existing = JSON.parse(localStorage.getItem("investus_my_creator") ?? "null");
      if (existing) { router.replace("/creator/dashboard"); return; }
    } catch {}
    setReady(true);
  }, [router]);

  if (!ready) return null;

  // Show login gate if not authenticated
  if (!user) {
    return <LoginGate onSuccess={() => setReady(true)} />;
  }

  /* ── Helpers ── */
  const totalAlloc = draft.portfolio.reduce((s, h) => s + h.allocation, 0);

  const addHolding = () => {
    const alloc = parseFloat(newAlloc);
    if (!newSymbol || isNaN(alloc) || alloc <= 0) return;
    setDraft((d) => ({
      ...d,
      portfolio: [...d.portfolio, {
        symbol: newSymbol.toUpperCase(),
        name: newName || newSymbol.toUpperCase(),
        allocation: alloc,
      }],
    }));
    setNewSymbol(""); setNewName(""); setNewAlloc("");
  };

  const removeHolding = (i: number) =>
    setDraft((d) => ({ ...d, portfolio: d.portfolio.filter((_, idx) => idx !== i) }));

  const toggleTag = (t: string) =>
    setDraft((d) => ({
      ...d,
      tags: d.tags.includes(t)
        ? d.tags.filter((x) => x !== t)
        : d.tags.length < 5 ? [...d.tags, t] : d.tags,
    }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Save to localStorage then advance to step 3 (verification)
  const finishStep2 = () => {
    const payload = {
      ...draft,
      id: user.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    try { localStorage.setItem("investus_my_creator", JSON.stringify(payload)); } catch {}
    setStep(3);
  };

  // Submit verification to API
  const handleSubmitVerification = async () => {
    setSubmitting(true);
    await fetch("/api/admin/verifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: user.email,
        nickname: draft.nickname,
        avatar: draft.avatar,
        bio: draft.bio,
      }),
    }).catch(() => {});
    setSubmitting(false);
    setSubmitted(true);
  };

  const canNext1 = draft.nickname.trim().length >= 2 && draft.bio.trim().length >= 10 && draft.tags.length >= 1;
  const canNext2 = draft.portfolio.length >= 1 && draft.broker.trim().length >= 2;

  /* ── Done screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6" style={{ background: "var(--bg)" }}>
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
          style={{ background: "rgba(251,191,36,0.12)" }}>
          ⏳
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            인증 신청 완료!
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {draft.nickname}님의 계좌 인증 신청이 접수되었습니다.<br />
            관리자 검토 후 <span style={{ color: "#fbbf24" }}>1~2일 내 승인</span>됩니다.
          </p>
        </div>

        <div className="w-full max-w-xs rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#fbbf24" }} />
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>승인 후 가능한 것들</p>
              <ul className="text-[11px] leading-relaxed list-none flex flex-col gap-1" style={{ color: "var(--muted)" }}>
                <li>✓ 투자 분석 글 · 리포트 작성</li>
                <li>✓ 광고 수익 정산 (조회수 기반)</li>
                <li>✓ 포트폴리오 공개 및 팔로워 모집</li>
              </ul>
            </div>
          </div>
        </div>

        <Link href="/creator/dashboard"
          className="w-full max-w-xs py-3.5 rounded-2xl text-sm font-bold text-center block"
          style={{ background: "var(--mint)", color: "#000" }}>
          내 크리에이터 채널 보기 →
        </Link>
        <Link href="/wall"
          className="w-full max-w-xs py-2 text-xs text-center block"
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

        {/* ── Step 1: Profile ── */}
        {step === 1 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>기본 프로필 설정</h1>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>구독자들에게 보여질 프로필을 설정해 주세요</p>

            {/* Ad revenue notice */}
            <div className="rounded-2xl border p-4 mb-3"
              style={{ background: "rgba(0,229,160,0.06)", borderColor: "rgba(0,229,160,0.2)" }}>
              <div className="flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">💡</span>
                <div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: "var(--mint)" }}>크리에이터 수익 안내 (유튜브 방식)</p>
                  <ul className="flex flex-col gap-1">
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 콘텐츠 조회수 기반 <span style={{ color: "var(--text)", fontWeight: 600 }}>광고 수익</span>이 크리에이터에게 지급됩니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 시청자는 <span style={{ color: "var(--text)", fontWeight: 600 }}>완전 무료</span>로 모든 콘텐츠를 이용합니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 계좌 인증 후 승인이 완료되어야 수익화가 시작됩니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 투자자문 금지 고지 */}
            <div className="rounded-2xl border p-4 mb-5"
              style={{ background: "rgba(255,77,109,0.05)", borderColor: "rgba(255,77,109,0.2)" }}>
              <div className="flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: "#ef4444" }}>콘텐츠 제작 시 필수 준수 사항</p>
                  <ul className="flex flex-col gap-1">
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 특정 종목의 <span style={{ color: "var(--text)", fontWeight: 600 }}>매수·매도를 직접 권유하는 콘텐츠</span>는 금지됩니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 금융위원회 미등록 상태로 <span style={{ color: "var(--text)", fontWeight: 600 }}>투자자문·일임 서비스를 제공하면 위법</span>입니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 모든 콘텐츠는 <span style={{ color: "var(--text)", fontWeight: 600 }}>정보 제공 목적</span>으로만 작성하고, 투자 결과에 대한 책임을 지지 않음을 명시해야 합니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 위반 시 콘텐츠 삭제 및 채널 정지 조치가 취해질 수 있습니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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

            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>닉네임</p>
            <input value={draft.nickname} onChange={(e) => setDraft((d) => ({ ...d, nickname: e.target.value }))}
              placeholder="예: 장기투자_한재원" maxLength={20}
              className="w-full px-4 py-3 rounded-2xl border mb-4 text-sm outline-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>한 줄 소개</p>
            <textarea value={draft.bio} onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
              placeholder="투자 스타일, 경력, 전문 분야를 소개해 주세요" rows={3} maxLength={200}
              className="w-full px-4 py-3 rounded-2xl border mb-4 text-sm outline-none resize-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

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

            <button onClick={() => setStep(2)} disabled={!canNext1}
              className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity"
              style={{ background: "var(--mint)", opacity: canNext1 ? 1 : 0.4 }}>
              다음 — 포트폴리오 입력 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 2: Portfolio ── */}
        {step === 2 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>포트폴리오 공개</h1>
            <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>실제 보유 종목을 입력해 주세요. 나중에 수정 가능합니다.</p>

            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--muted)" }}>증권사 선택</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {BROKERS.map((b) => (
                <button key={b} onClick={() => setDraft((d) => ({ ...d, broker: b }))}
                  className="text-xs px-3 py-2 rounded-xl border transition-all"
                  style={draft.broker === b
                    ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                    : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                  {b}
                </button>
              ))}
            </div>

            {draft.portfolio.length > 0 && (
              <div className="rounded-2xl border mb-3 overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {draft.portfolio.map((h, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < draft.portfolio.length - 1 ? "border-b" : ""}`}
                    style={{ borderColor: "var(--border)" }}>
                    <span className="text-xs font-bold font-mono-num flex-1" style={{ color: "var(--text)" }}>{h.symbol}</span>
                    <span className="text-xs flex-1" style={{ color: "var(--muted)" }}>{h.name}</span>
                    <span className="text-xs font-mono-num" style={{ color: "var(--mint)" }}>{h.allocation}%</span>
                    <button onClick={() => removeHolding(i)}><Trash2 className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} /></button>
                  </div>
                ))}
                <div className="flex justify-end px-4 py-2 border-t" style={{ borderColor: "var(--border)" }}>
                  <span className="text-[10px]" style={{ color: totalAlloc > 100 ? "#ef4444" : "var(--muted)" }}>
                    합계 {totalAlloc.toFixed(1)}% {totalAlloc > 100 && "⚠️ 100% 초과"}
                  </span>
                </div>
              </div>
            )}

            <div className="rounded-2xl border p-4 mb-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--muted)" }}>종목 추가</p>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input value={newSymbol} onChange={(e) => setNewSymbol(e.target.value)} placeholder="티커 (AAPL)"
                  className="col-span-1 px-3 py-2.5 rounded-xl border text-xs outline-none uppercase"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="종목명"
                  className="col-span-1 px-3 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
                <input value={newAlloc} onChange={(e) => setNewAlloc(e.target.value)} placeholder="비중%" type="number"
                  className="col-span-1 px-3 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }} />
              </div>
              <button onClick={addHolding}
                className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.2)" }}>
                <Plus className="w-3.5 h-3.5" />종목 추가
              </button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-2xl text-sm font-bold border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>이전</button>
              <button onClick={finishStep2} disabled={!canNext2}
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity"
                style={{ background: "var(--mint)", opacity: canNext2 ? 1 : 0.4 }}>
                다음 — 계좌 인증 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Account verification (screenshot upload) ── */}
        {step === 3 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>계좌 인증</h1>
            <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>
              {draft.broker} HTS/MTS의 계좌·잔고 화면을 캡처해서 업로드해 주세요.
            </p>

            {/* Instructions */}
            <div className="rounded-2xl border p-4 mb-4" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.15)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--mint)" }}>캡처 방법</p>
              <ul className="text-[11px] flex flex-col gap-1.5" style={{ color: "var(--muted)" }}>
                <li>① {draft.broker || "증권사"} 앱 실행 → 계좌 잔고 / 보유종목 화면</li>
                <li>② 전화번호 뒷 4자리가 보이도록 마스킹 최소화</li>
                <li>③ 스크린샷 찍어서 아래에 업로드</li>
              </ul>
            </div>

            {/* Upload area */}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            {previewUrl ? (
              <div className="relative mb-4 rounded-2xl overflow-hidden border" style={{ borderColor: "var(--mint)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="캡처 미리보기" className="w-full object-contain max-h-64" />
                <button
                  onClick={() => { setPreviewUrl(null); if (fileRef.current) fileRef.current.value = ""; }}
                  className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-lg font-semibold"
                  style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
                  다시 선택
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full py-10 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 mb-4 transition-opacity active:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <Upload className="w-6 h-6" style={{ color: "var(--muted)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>캡처 이미지 업로드</span>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>탭하여 갤러리 열기</span>
              </button>
            )}

            {/* 투자자문 금지 동의 체크박스 */}
            <div className="rounded-xl p-3 mb-3" style={{ background: "rgba(255,77,109,0.05)", border: "1px solid rgba(255,77,109,0.2)" }}>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={creatorAgreed}
                  onChange={(e) => setCreatorAgreed(e.target.checked)}
                  className="mt-0.5 flex-shrink-0"
                />
                <span className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  특정 종목 매수·매도를 직접 권유하지 않고, 모든 콘텐츠는 정보 제공 목적으로만 작성하겠습니다. 금융소비자보호법상 미등록 투자자문 행위를 하지 않겠습니다.
                </span>
              </label>
            </div>

            {/* Notice */}
            <div className="rounded-xl p-3 mb-5" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
              <p className="text-[11px] leading-relaxed" style={{ color: "#fbbf24" }}>
                업로드 후 관리자가 검토합니다. 승인까지 1~2 영업일이 소요될 수 있습니다.<br />
                승인 결과는 가입 이메일({user?.email})로 안내됩니다.
              </p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-2xl text-sm font-bold border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>이전</button>
              <button
                onClick={handleSubmitVerification}
                disabled={!previewUrl || submitting || !creatorAgreed}
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity"
                style={{ background: "var(--mint)", opacity: previewUrl && !submitting && creatorAgreed ? 1 : 0.4 }}>
                <CheckCircle2 className="w-4 h-4" />
                {submitting ? "제출 중..." : "인증 신청 완료"}
              </button>
            </div>

            {/* Skip option */}
            <button onClick={() => setSubmitted(true)}
              className="w-full mt-3 py-2 text-xs text-center"
              style={{ color: "var(--muted)" }}>
              나중에 인증하기 (일단 채널만 만들기)
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
