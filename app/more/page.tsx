"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronRight, LogOut, User, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AdBanner } from "@/components/AdBanner";

const MENU_SECTIONS = [
  {
    title: "앱 정보",
    items: [
      { label: "Investus 소개",  sub: "미국주식 투자 정보 플랫폼", emoji: "📊" },
      { label: "버전 정보",        sub: "v1.0.0",                    emoji: "🔖" },
    ],
  },
  {
    title: "서비스",
    items: [
      { label: "공지사항",       sub: "업데이트 및 서비스 안내", emoji: "📢" },
      { label: "피드백 보내기",   sub: "서비스 개선에 도움주세요", emoji: "💌" },
      { label: "자주 묻는 질문", sub: "FAQ",                    emoji: "❓" },
    ],
  },
  {
    title: "법적 고지",
    items: [
      { label: "이용약관",          sub: "", emoji: "📄" },
      { label: "개인정보처리방침",  sub: "", emoji: "🔒" },
      { label: "투자 유의사항",     sub: "이 앱은 투자 참고용이며 투자 권고가 아닙니다", emoji: "⚠️" },
    ],
  },
];

function MenuItem({ label, sub, emoji }: { label: string; sub: string; emoji: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-70 transition-opacity">
      <span className="text-xl w-8 text-center flex-shrink-0">{emoji}</span>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</p>
        {sub && <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--muted)" }}>{sub}</p>}
      </div>
      <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-30" style={{ color: "var(--muted)" }} />
    </button>
  );
}

type AuthMode = "idle" | "login" | "signup";

function AuthSection() {
  const { user, login, signup, logout } = useAuth();
  const [mode, setMode]           = useState<AuthMode>("idle");
  const [phone, setPhone]         = useState("");
  const [pw, setPw]               = useState("");
  const [pwVisible, setPwVisible] = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const reset = () => { setPhone(""); setPw(""); setError(""); setLoading(false); };

  const handleLogin = () => {
    setLoading(true);
    setError("");
    const ok = login(phone, pw);
    setLoading(false);
    if (!ok) { setError("전화번호 또는 비밀번호가 올바르지 않습니다."); return; }
    setMode("idle");
    reset();
  };

  const handleSignup = () => {
    if (phone.replace(/\D/g, "").length < 10) { setError("올바른 전화번호를 입력해주세요."); return; }
    if (pw.length < 4) { setError("비밀번호는 4자 이상이어야 합니다."); return; }
    setLoading(true);
    setError("");
    const result = signup(phone, pw);
    setLoading(false);
    if (!result.ok) { setError(result.msg); return; }
    setMode("idle");
    reset();
  };

  /* ── Logged-in profile ── */
  if (user) {
    return (
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "linear-gradient(135deg,#00e5a0,#0d6efd)" }}
          >
            <User className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{user.nickname}</p>
            <p className="text-xs font-mono-num mt-0.5" style={{ color: "var(--muted)" }}>{user.phone}</p>
          </div>
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
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl"
            style={{ background: "var(--mint)" }}>
            📈
          </div>
          <p className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>인베스트어스 · 미국주식 투자 정보</p>
          <p className="text-[10px] mt-1 font-mono-num" style={{ color: "var(--muted)" }}>investus.kr</p>
        </div>

        {/* Menu sections */}
        <div className="flex flex-col gap-4">
          {MENU_SECTIONS.map((section) => (
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
    </div>
  );
}
