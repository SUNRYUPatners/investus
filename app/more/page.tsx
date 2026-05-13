"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronRight, LogOut, User, Phone, Lock, Eye, EyeOff, Pencil, X, Send, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ProfileEditModal } from "@/components/ProfileEditModal";
import { AdBanner } from "@/components/AdBanner";
import { useForm, ValidationError } from "@formspree/react";

type MenuItem_t = { label: string; sub: string; emoji: string; href?: string; onClick?: () => void };

const MENU_SECTIONS: { title: string; items: MenuItem_t[] }[] = [
  {
    title: "앱 정보",
    items: [
      { label: "Investus 소개",  sub: "미국주식 투자 정보 플랫폼", emoji: "📊", href: "/more/about" },
      { label: "버전 정보",        sub: "v1.0.0",                    emoji: "🔖" },
    ],
  },
  {
    title: "서비스",
    items: [
      { label: "공지사항",       sub: "업데이트 및 서비스 안내", emoji: "📢" },
      { label: "피드백 보내기",   sub: "서비스 개선에 도움주세요", emoji: "💌" }, // onClick injected below
      { label: "자주 묻는 질문", sub: "FAQ",                    emoji: "❓" },
    ],
  },
  {
    title: "법적 고지",
    items: [
      { label: "이용약관",          sub: "",                                           emoji: "📄", href: "/more/terms" },
      { label: "개인정보처리방침",  sub: "",                                           emoji: "🔒", href: "/more/privacy" },
      { label: "투자 유의사항",     sub: "이 앱은 투자 참고용이며 투자 권고가 아닙니다", emoji: "⚠️", href: "/more/disclaimer" },
    ],
  },
];

function MenuItem({ label, sub, emoji, href, onClick }: MenuItem_t) {
  const inner = (
    <>
      <span className="text-xl w-8 text-center flex-shrink-0">{emoji}</span>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</p>
        {sub && <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--muted)" }}>{sub}</p>}
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-30" style={{ color: "var(--muted)" }} />
    </>
  );
  if (href) {
    return (
      <Link href={href} className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 transition-opacity" style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 transition-opacity">
      {inner}
    </button>
  );
}

// ── Feedback Modal ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "bug",     label: "버그 신고", emoji: "🐛" },
  { key: "feature", label: "기능 제안", emoji: "💡" },
  { key: "praise",  label: "칭찬",      emoji: "🌟" },
  { key: "etc",     label: "기타",      emoji: "💬" },
];

function FeedbackModal({ onClose, user }: { onClose: () => void; user: { phone: string; nickname: string } | null }) {
  const [state, handleSubmit] = useForm("xgodqoey");
  const [category, setCategory] = useState("feature");
  const [message,  setMessage]  = useState("");

  const categoryLabel = CATEGORIES.find((c) => c.key === category)?.label ?? category;
  const canSend = message.trim().length >= 5 && !state.submitting;

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={() => !state.submitting && onClose()}>
      <div
        className="w-full max-w-[480px] mx-auto rounded-t-3xl pb-10"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="w-10 h-1 rounded-full mx-auto mt-3 mb-5" style={{ background: "var(--border)" }} />

        {/* Header */}
        <div className="flex items-center justify-between px-5 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>피드백 보내기</h2>
          </div>
          <button onClick={onClose} disabled={state.submitting}>
            <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        <div className="px-5">
          {/* Login guard */}
          {!user ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <span className="text-3xl">🔒</span>
              <p className="text-sm font-semibold text-center" style={{ color: "var(--text)" }}>로그인이 필요합니다</p>
              <p className="text-xs text-center" style={{ color: "var(--muted)" }}>피드백은 로그인 후 보낼 수 있어요</p>
              <button onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-black"
                style={{ background: "var(--mint)" }}>
                확인
              </button>
            </div>
          ) : state.succeeded ? (
            /* Success */
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,229,160,0.15)" }}>
                <CheckCircle2 className="w-7 h-7" style={{ color: "var(--mint)" }} />
              </div>
              <p className="text-base font-bold" style={{ color: "var(--text)" }}>전송 완료! 🎉</p>
              <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
                소중한 피드백 감사합니다.{"\n"}서비스 개선에 적극 반영하겠습니다.
              </p>
              <button onClick={onClose}
                className="w-full py-3 rounded-xl text-sm font-bold text-black"
                style={{ background: "var(--mint)" }}>
                닫기
              </button>
            </div>
          ) : (
            /* Form */
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({
                  category: categoryLabel,
                  message: message.trim(),
                  user: `${user.nickname} (${user.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1-****-$2")})`,
                  _subject: `[Investus 피드백] ${categoryLabel}`,
                });
              }}
            >
              {/* Hidden fields passed via handleSubmit, but Formspree also reads input names */}
              <input type="hidden" name="_subject" value={`[Investus 피드백] ${categoryLabel}`} />

              {/* Category */}
              <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--muted)" }}>유형</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {CATEGORIES.map((c) => (
                  <button type="button" key={c.key} onClick={() => setCategory(c.key)}
                    className="flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all active:opacity-70"
                    style={category === c.key
                      ? { borderColor: "var(--mint)", background: "rgba(0,229,160,0.08)" }
                      : { borderColor: "var(--border)", background: "var(--bg)" }}>
                    <span className="text-lg">{c.emoji}</span>
                    <span className="text-[9px] font-semibold"
                      style={{ color: category === c.key ? "var(--mint)" : "var(--muted)" }}>
                      {c.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Message */}
              <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>내용</p>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="불편한 점, 원하는 기능, 칭찬 등 무엇이든 편하게 적어주세요"
                rows={5}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none mb-1"
                style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              />
              <ValidationError field="message" prefix="내용" errors={state.errors}
                className="text-xs mb-2" style={{ color: "#ff4d6d" }} />
              <div className="flex justify-between mb-4">
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>최소 5자 이상</span>
                <span className="text-[10px] font-mono-num" style={{ color: "var(--muted)" }}>
                  {message.length} / 500
                </span>
              </div>

              {/* Generic form error */}
              <ValidationError errors={state.errors}
                className="text-xs mb-3 text-center block" style={{ color: "#ff4d6d" }} />

              <button
                type="submit"
                disabled={!canSend}
                className="w-full py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity active:opacity-80 disabled:opacity-40"
                style={{ background: "var(--mint)" }}
              >
                {state.submitting
                  ? <><span className="animate-spin inline-block">⏳</span> 전송 중...</>
                  : <><Send className="w-4 h-4" />피드백 보내기</>
                }
              </button>

              <p className="text-[10px] text-center mt-3" style={{ color: "var(--muted)" }}>
                닉네임이 함께 전달됩니다 · sunryupatners@gmail.com 수신
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

type AuthMode = "idle" | "login" | "signup";

function AuthSection() {
  const { user, login, signup, logout } = useAuth();
  const [mode,       setMode]       = useState<AuthMode>("idle");
  const [phone,      setPhone]      = useState("");
  const [pw,         setPw]         = useState("");
  const [pwVisible,  setPwVisible]  = useState(false);
  const [error,      setError]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [editOpen,   setEditOpen]   = useState(false);

  const reset = () => { setPhone(""); setPw(""); setError(""); setLoading(false); };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const ok = await login(phone, pw);
    setLoading(false);
    if (!ok) { setError("전화번호 또는 비밀번호가 올바르지 않습니다."); return; }
    setMode("idle");
    reset();
  };

  const handleSignup = async () => {
    if (phone.replace(/\D/g, "").length < 10) { setError("올바른 전화번호를 입력해주세요."); return; }
    if (pw.length < 4) { setError("비밀번호는 4자 이상이어야 합니다."); return; }
    setLoading(true);
    setError("");
    const result = await signup(phone, pw);
    setLoading(false);
    if (!result.ok) { setError(result.msg); return; }
    setMode("idle");
    reset();
  };

  /* ── Logged-in profile ── */
  if (user) {
    const isPhoto = (user.avatar ?? "").startsWith("data:");
    return (
      <>
        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {isPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt="avatar"
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                style={{ border: "2px solid rgba(0,229,160,0.4)" }}
              />
            ) : (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: user.avatar
                    ? "rgba(0,229,160,0.12)"
                    : "linear-gradient(135deg,#00e5a0,#0d6efd)",
                  border: "2px solid rgba(0,229,160,0.3)",
                  fontSize: user.avatar ? "1.75rem" : undefined,
                }}
              >
                {user.avatar
                  ? <span>{user.avatar}</span>
                  : <User className="w-7 h-7 text-white" />}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
                {user.nickname}
              </p>
              {/* Phone masked — only visible to logged-in user */}
              <p className="text-xs font-mono-num mt-0.5 flex items-center gap-1" style={{ color: "var(--muted)" }}>
                🔒 {user.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1-****-$2")}
              </p>
            </div>

            {/* Edit button */}
            <button
              onClick={() => setEditOpen(true)}
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border active:opacity-70 transition-opacity"
              style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.04)" }}
            >
              <Pencil className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
            </button>
          </div>

          <button
            onClick={logout}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold active:opacity-70 transition-opacity"
            style={{ borderColor: "rgba(255,77,109,0.3)", color: "#ff4d6d" }}
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>

        {editOpen && <ProfileEditModal onClose={() => setEditOpen(false)} />}
      </>
    );
  }

  /* ── Auth form ── */
  if (mode !== "idle") {
    return (
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <h2 className="text-sm font-bold font-syne mb-4" style={{ color: "var(--text)" }}>
          {mode === "login" ? "로그인" : "회원가입"}
        </h2>

        {/* Phone */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 border mb-3"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
          <input
            type="tel"
            placeholder="전화번호 (숫자만)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text)" }}
          />
        </div>

        {/* Password */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 border mb-4"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          <Lock className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
          <input
            type={pwVisible ? "text" : "password"}
            placeholder="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--text)" }}
            onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
          />
          <button onClick={() => setPwVisible((v) => !v)}>
            {pwVisible
              ? <EyeOff className="w-4 h-4" style={{ color: "var(--muted)" }} />
              : <Eye    className="w-4 h-4" style={{ color: "var(--muted)" }} />}
          </button>
        </div>

        {error && (
          <p className="text-xs mb-3" style={{ color: "#ff4d6d" }}>{error}</p>
        )}

        <button
          onClick={mode === "login" ? handleLogin : handleSignup}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-bold text-black mb-3 active:opacity-80 transition-opacity disabled:opacity-50"
          style={{ background: "var(--mint)" }}
        >
          {mode === "login" ? "로그인" : "가입하기"}
        </button>

        <button
          onClick={() => { setMode("idle"); reset(); }}
          className="w-full py-2 text-xs"
          style={{ color: "var(--muted)" }}
        >
          취소
        </button>
      </div>
    );
  }

  /* ── Default: show login/signup buttons ── */
  return (
    <div
      className="rounded-2xl p-5 mb-6 border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "var(--border)" }}
        >
          <User className="w-6 h-6" style={{ color: "var(--muted)" }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>로그인이 필요합니다</p>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>담벼락 글쓰기에 계정이 필요해요</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setMode("login")}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold border active:opacity-70 transition-opacity"
          style={{ borderColor: "var(--mint)", color: "var(--mint)" }}
        >
          로그인
        </button>
        <button
          onClick={() => setMode("signup")}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black active:opacity-70 transition-opacity"
          style={{ background: "var(--mint)" }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default function MorePage() {
  const { user } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);

  // Inject onClick for "피드백 보내기"
  const sections = MENU_SECTIONS.map((section) => ({
    ...section,
    items: section.items.map((item) =>
      item.label === "피드백 보내기"
        ? { ...item, onClick: () => setShowFeedback(true) }
        : item
    ),
  }));

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:px-8 pb-24 lg:pb-10">
        {/* Title */}
        <div className="pt-5 pb-5">
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>더보기 ···</h1>
        </div>

        {/* Auth section */}
        <AuthSection />

        {/* 광고 */}
        <AdBanner format="auto" />

        {/* App identity card */}
        <div className="rounded-2xl p-5 mb-6 border text-center"
          style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.15)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="Investus"
            className="w-14 h-14 rounded-2xl object-cover mx-auto mb-3"
            style={{ boxShadow: "0 4px 16px rgba(212,175,55,0.35)" }}
          />
          <p className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>인베스트어스 · 미국주식 투자 정보</p>
          <p className="text-[10px] mt-1 font-mono-num" style={{ color: "var(--muted)" }}>investus.kr</p>
        </div>

        {/* Menu sections */}
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2 font-syne"
                style={{ color: "var(--muted)" }}>
                {section.title}
              </p>
              <div className="rounded-2xl border overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {section.items.map((item, idx) => (
                  <div key={item.label}
                    className={idx < section.items.length - 1 ? "border-b" : ""}
                    style={{ borderColor: "var(--border)" }}>
                    <MenuItem {...item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[10px] mt-8" style={{ color: "var(--muted)" }}>
          본 앱은 투자 참고용으로만 제공됩니다.{"\n"}투자 판단 및 책임은 본인에게 있습니다.
        </p>
      </main>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} user={user} />
      )}
    </div>
  );
}
