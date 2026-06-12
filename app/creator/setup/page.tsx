"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight,
  ShieldCheck, CheckCircle2, Upload, Eye, EyeOff,
  XCircle, RefreshCcw, TrendingUp, TrendingDown,
} from "lucide-react";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { getSupabase } from "@/lib/supabase";
import type { PortfolioAnalysis } from "@/app/api/analyze-portfolio-screenshot/route";

const AVATARS = ["🦁", "🚀", "👑", "💰", "🐂", "🦅", "🎯", "💎", "🔥", "🌊", "⚡", "🧠"];
const TAG_OPTIONS = [
  "가치투자", "성장주", "배당주", "ETF", "테크", "AI반도체",
  "장기홀딩", "단기트레이딩", "적립식", "배당성장", "현금흐름", "패시브투자",
];

type Draft = { nickname: string; avatar: string; bio: string; tags: string[] };
const EMPTY: Draft = { nickname: "", avatar: "🦁", bio: "", tags: [] };

/* ─── Inline login ──────────────────────────────────────────── */
function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const { login, signup } = useAuth();
  const [mode, setMode]   = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [pw, setPw]       = useState("");
  const [vis, setVis]     = useState(false);
  const [err, setErr]     = useState("");
  const [confirmEmail, setConfirmEmail] = useState(false);

  const handleLogin = async () => {
    if (!email.includes("@")) { setErr("올바른 이메일 주소를 입력해주세요."); return; }
    const ok = await login(email, pw);
    if (!ok) { setErr("이메일 또는 비밀번호가 올바르지 않습니다."); return; }
    onSuccess();
  };
  const handleSignup = async () => {
    if (!email.includes("@")) { setErr("올바른 이메일 주소를 입력해주세요."); return; }
    if (pw.length < 6) { setErr("비밀번호는 6자 이상이어야 합니다."); return; }
    const result = await signup(email, pw);
    if (!result.ok) { setErr(result.msg); return; }
    if (result.msg === "confirm_email") { setConfirmEmail(true); return; }
    onSuccess();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🚀</div>
          <h1 className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>투자클럽 만들기</h1>
          <p className="text-xs" style={{ color: "var(--muted)" }}>로그인 후 투자클럽을 만들 수 있어요</p>
        </div>

        <div className="rounded-2xl border p-5 flex flex-col gap-3" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            {(["login", "signup"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setErr(""); }}
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
            <>
              <input type="email" placeholder="이메일 주소" value={email}
                onChange={(e) => { setEmail(e.target.value); setErr(""); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }} />
              <div className="relative">
                <input type={vis ? "text" : "password"} placeholder="비밀번호" value={pw}
                  onChange={(e) => { setPw(e.target.value); setErr(""); }}
                  onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none pr-10"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }} />
                <button onClick={() => setVis((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2">
                  {vis ? <EyeOff className="w-4 h-4" style={{ color: "var(--muted)" }} /> : <Eye className="w-4 h-4" style={{ color: "var(--muted)" }} />}
                </button>
              </div>
              {err && <p className="text-xs" style={{ color: "#ef4444" }}>{err}</p>}
              <button onClick={mode === "login" ? handleLogin : handleSignup}
                className="w-full py-3 rounded-xl text-sm font-bold"
                style={{ background: "var(--mint)", color: "#000" }}>
                {mode === "login" ? "로그인 후 시작하기" : "가입하고 시작하기"}
              </button>
            </>
          )}
        </div>

        <Link href="/wall" className="block text-center mt-4 text-xs" style={{ color: "var(--muted)" }}>
          ← 종목이야기로 돌아가기
        </Link>
      </div>
    </div>
  );
}

/* ─── Portfolio analysis result display ───────────────────── */
function AnalysisCard({ result }: { result: Extract<PortfolioAnalysis, { approved: true }> }) {
  const isPos = (v: number | null) => v != null && v >= 0;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(0,229,160,0.3)", background: "rgba(0,229,160,0.04)" }}>
      {/* Summary */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--mint)" }} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold" style={{ color: "var(--mint)" }}>AI 계좌 분석 완료</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>스크린샷에서 자동 추출된 정보입니다</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full font-semibold"
          style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
          {result.currency}
        </span>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-3 divide-x" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
        <div className="px-3 py-3 text-center">
          <p className="text-[9px] mb-1" style={{ color: "var(--muted)" }}>총 평가금액</p>
          <p className="text-xs font-bold leading-snug" style={{ color: "var(--text)" }}>{result.totalValue}</p>
        </div>
        <div className="px-3 py-3 text-center border-l" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
          <p className="text-[9px] mb-1" style={{ color: "var(--muted)" }}>전체 수익률</p>
          {result.totalReturnPct != null ? (
            <p className="text-xs font-bold" style={{ color: isPos(result.totalReturnPct) ? "#00e5a0" : "#ef4444" }}>
              {result.totalReturnPct >= 0 ? "+" : ""}{result.totalReturnPct.toFixed(1)}%
            </p>
          ) : (
            <p className="text-xs" style={{ color: "var(--muted)" }}>—</p>
          )}
        </div>
        <div className="px-3 py-3 text-center border-l" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
          <p className="text-[9px] mb-1" style={{ color: "var(--muted)" }}>투자 규모</p>
          <p className="text-[11px] font-bold leading-snug" style={{ color: "var(--text)" }}>{result.scale}</p>
        </div>
      </div>

      {/* Holdings table */}
      {result.holdings.length > 0 && (
        <div className="border-t" style={{ borderColor: "rgba(0,229,160,0.15)" }}>
          <p className="text-[10px] font-semibold px-4 pt-3 pb-1" style={{ color: "var(--muted)" }}>
            보유 종목 ({result.holdings.length}개)
          </p>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {result.holdings.slice(0, 8).map((h, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>
                    {h.ticker ? (
                      <span className="font-mono">{h.ticker}</span>
                    ) : h.name}
                  </p>
                  {h.ticker && <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>{h.name}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>{h.value}</p>
                </div>
                <div className="text-right shrink-0 w-14">
                  {h.returnPct != null ? (
                    <div className="flex items-center justify-end gap-0.5">
                      {h.returnPct >= 0
                        ? <TrendingUp className="w-2.5 h-2.5" style={{ color: "#00e5a0" }} />
                        : <TrendingDown className="w-2.5 h-2.5" style={{ color: "#ef4444" }} />}
                      <p className="text-[11px] font-semibold"
                        style={{ color: h.returnPct >= 0 ? "#00e5a0" : "#ef4444" }}>
                        {h.returnPct >= 0 ? "+" : ""}{h.returnPct.toFixed(1)}%
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px]" style={{ color: "var(--muted)" }}>—</p>
                  )}
                </div>
                {h.allocation != null && (
                  <div className="text-right shrink-0 w-10">
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                      {h.allocation.toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>
            ))}
            {result.holdings.length > 8 && (
              <div className="px-4 py-2">
                <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                  +{result.holdings.length - 8}개 종목 더
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main setup page ──────────────────────────────────────── */
export default function CreatorSetupPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [ready, setReady] = useState(false);
  const [step, setStep]   = useState(1);
  const [draft, setDraft] = useState<Draft>(EMPTY);

  // Step 2 — screenshot analysis
  const fileRef    = useRef<HTMLInputElement>(null);
  const [previewUrl,   setPreviewUrl]   = useState<string | null>(null);
  const [analyzing,    setAnalyzing]    = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PortfolioAnalysis | null>(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [creatorAgreed, setCreatorAgreed] = useState(false);

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("investus_my_creator") ?? "null");
      if (existing) { router.replace("/creator/dashboard"); return; }
    } catch {}
    setReady(true);
  }, [router]);

  if (!ready) return null;
  if (!user) return <LoginGate onSuccess={() => setReady(true)} />;

  /* ── Toggle tag ── */
  const toggleTag = (t: string) =>
    setDraft((d) => ({
      ...d,
      tags: d.tags.includes(t)
        ? d.tags.filter((x) => x !== t)
        : d.tags.length < 5 ? [...d.tags, t] : d.tags,
    }));

  /* ── File → auto-analyze ── */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setPreviewUrl(dataUrl);
      setAnalysisResult(null);
      setAnalyzing(true);

      const parts    = dataUrl.split(",");
      const base64   = parts[1] ?? "";
      const mime     = parts[0].match(/:(.*?);/)?.[1] ?? "image/jpeg";

      try {
        // Get session token for authenticated request
        const { data: { session } } = await getSupabase().auth.getSession();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;

        const res  = await fetch("/api/analyze-portfolio-screenshot", {
          method: "POST",
          headers,
          body: JSON.stringify({ imageBase64: base64, mimeType: mime }),
        });
        const data = await res.json() as PortfolioAnalysis | { error: string };

        if ("error" in data) {
          setAnalysisResult({ approved: false, reason: (data as { error: string }).error });
        } else {
          setAnalysisResult(data);
        }
      } catch {
        setAnalysisResult({ approved: false, reason: "네트워크 오류. 다시 시도해주세요." });
      }
      setAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  const resetFile = () => {
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  /* ── Submit (AI-verified → auto-approve) ── */
  const handleSubmit = async () => {
    if (!analysisResult?.approved) return;
    setSubmitting(true);

    const approved = analysisResult as Extract<PortfolioAnalysis, { approved: true }>;
    const topHoldings = approved.holdings.slice(0, 10).map((h) => ({
      symbol:     h.ticker ?? h.name.slice(0, 6),
      name:       h.name,
      allocation: h.allocation ?? 0,
      returnPct:  h.returnPct ?? null,
      value:      h.value,
    }));

    await fetch("/api/admin/verifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone:           user.email,
        nickname:        draft.nickname,
        avatar:          draft.avatar,
        bio:             draft.bio,
        tags:            draft.tags,
        annual_return:   approved.totalReturnPct,
        portfolio_scale: approved.scale,
        top_holdings:    topHoldings,
        ai_approved:     true,
      }),
    }).catch(() => {});

    // Persist locally for immediate dashboard access
    try {
      localStorage.setItem("investus_my_creator", JSON.stringify({
        id:              user.email,
        nickname:        draft.nickname,
        avatar:          draft.avatar,
        bio:             draft.bio,
        tags:            draft.tags,
        broker:          "스크린샷 인증",
        portfolio:       topHoldings,
        status:          "approved",
        annual_return:   approved.totalReturnPct,
        portfolio_scale: approved.scale,
        createdAt:       new Date().toISOString(),
      }));
    } catch {}

    setSubmitting(false);
    setSubmitted(true);
  };

  const canNext1 = draft.nickname.trim().length >= 2 && draft.bio.trim().length >= 10 && draft.tags.length >= 1;
  const approvedResult = analysisResult?.approved
    ? (analysisResult as Extract<PortfolioAnalysis, { approved: true }>)
    : null;

  /* ── Done ── */
  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6" style={{ background: "var(--bg)" }}>
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl"
          style={{ background: "rgba(0,229,160,0.12)" }}>
          ✅
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold font-syne mb-2" style={{ color: "var(--text)" }}>
            투자클럽 개설 완료!
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            {draft.nickname}님의 계좌가 AI로 인증되었습니다.<br />
            <span style={{ color: "var(--mint)" }}>바로 활동</span>을 시작하실 수 있어요.
          </p>
        </div>

        <div className="w-full max-w-xs rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
            <div>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>이제 가능한 것들</p>
              <ul className="text-[11px] leading-relaxed flex flex-col gap-1" style={{ color: "var(--muted)" }}>
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
          내 투자클럽 보기 →
        </Link>
        <Link href="/wall" className="w-full max-w-xs py-2 text-xs text-center block" style={{ color: "var(--muted)" }}>
          종목이야기로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto lg:pb-10">
        {/* Back */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/wall" className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />종목이야기 / 투자클럽
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-4 py-4">
          {[1, 2].map((s) => (
            <div key={s} className="flex-1 h-1 rounded-full transition-all"
              style={{ background: s <= step ? "var(--mint)" : "var(--border)" }} />
          ))}
        </div>

        {/* ── Step 1: Profile ── */}
        {step === 1 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>기본 프로필 설정</h1>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>구독자들에게 보여질 프로필을 설정해 주세요</p>

            {/* Revenue notice */}
            <div className="rounded-2xl border p-4 mb-3"
              style={{ background: "rgba(0,229,160,0.06)", borderColor: "rgba(0,229,160,0.2)" }}>
              <div className="flex items-start gap-2.5">
                <span className="text-base flex-shrink-0">💡</span>
                <div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: "var(--mint)" }}>투자클럽 수익 안내 (유튜브 방식)</p>
                  <ul className="flex flex-col gap-1">
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 콘텐츠 조회수 기반 <span style={{ color: "var(--text)", fontWeight: 600 }}>광고 수익</span>이 클럽 운영자에게 지급됩니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 시청자는 <span style={{ color: "var(--text)", fontWeight: 600 }}>완전 무료</span>로 모든 콘텐츠를 이용합니다.
                    </li>
                    <li className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
                      · 계좌 스크린샷으로 <span style={{ color: "var(--text)", fontWeight: 600 }}>AI 자동 인증</span> 후 즉시 활동 가능합니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Compliance notice */}
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
                      · 모든 콘텐츠는 <span style={{ color: "var(--text)", fontWeight: 600 }}>정보 제공 목적</span>으로만 작성해야 합니다.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Avatar */}
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
              다음 — 계좌 인증 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Step 2: AI Screenshot Verification ── */}
        {step === 2 && (
          <div className="px-4">
            <h1 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>계좌 인증</h1>
            <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
              증권사 앱에서 보유 종목·잔고 화면을 스크린샷하여 업로드하세요.<br />
              AI가 자동으로 분석하여 즉시 인증합니다.
            </p>

            {/* How-to */}
            <div className="rounded-2xl border p-4 mb-4"
              style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.15)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--mint)" }}>캡처 방법</p>
              <ul className="text-[11px] flex flex-col gap-1.5" style={{ color: "var(--muted)" }}>
                <li>① 증권사 앱 실행 → <strong style={{ color: "var(--text)" }}>보유종목 / 잔고 화면</strong> 이동</li>
                <li>② 종목명, 평가금액, 수익률이 보이도록 화면 구성</li>
                <li>③ 스크린샷을 찍어서 아래에 업로드</li>
              </ul>
            </div>

            {/* Upload / Preview */}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            {!previewUrl ? (
              <button onClick={() => fileRef.current?.click()}
                className="w-full py-10 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 mb-4 transition-opacity active:opacity-70"
                style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                <Upload className="w-7 h-7" style={{ color: "var(--muted)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--muted)" }}>계좌 스크린샷 업로드</span>
                <span className="text-[11px]" style={{ color: "var(--muted)" }}>탭하여 갤러리 열기 · JPEG / PNG</span>
              </button>
            ) : (
              <div className="relative mb-4 rounded-2xl overflow-hidden border"
                style={{ borderColor: analyzing ? "var(--border)" : analysisResult?.approved ? "rgba(0,229,160,0.4)" : "rgba(239,68,68,0.4)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="스크린샷 미리보기" className="w-full object-contain max-h-60" />
                <button onClick={resetFile}
                  className="absolute top-2 right-2 text-[10px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1"
                  style={{ background: "rgba(0,0,0,0.65)", color: "#fff" }}>
                  <RefreshCcw className="w-3 h-3" /> 다시 선택
                </button>
              </div>
            )}

            {/* Analyzing spinner */}
            {analyzing && (
              <div className="rounded-2xl border p-5 mb-4 flex flex-col items-center gap-3"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="w-7 h-7 rounded-full border-2 animate-spin"
                  style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>AI 분석 중...</p>
                  <p className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>
                    보유 종목·수익률·투자 규모를 추출하고 있습니다
                  </p>
                </div>
              </div>
            )}

            {/* Rejected result */}
            {!analyzing && analysisResult && !analysisResult.approved && (
              <div className="rounded-2xl border p-4 mb-4 flex items-start gap-3"
                style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)" }}>
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#ef4444" }} />
                <div className="flex-1">
                  <p className="text-xs font-bold mb-1" style={{ color: "#ef4444" }}>인증 불가</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {(analysisResult as { approved: false; reason: string }).reason}
                  </p>
                  <button onClick={resetFile}
                    className="mt-2 text-[11px] font-semibold flex items-center gap-1"
                    style={{ color: "#ef4444" }}>
                    <RefreshCcw className="w-3 h-3" /> 다시 업로드
                  </button>
                </div>
              </div>
            )}

            {/* Approved result */}
            {!analyzing && approvedResult && (
              <div className="mb-4">
                <AnalysisCard result={approvedResult} />
              </div>
            )}

            {/* Agreement */}
            {approvedResult && (
              <div className="rounded-xl p-3 mb-4"
                style={{ background: "rgba(255,77,109,0.05)", border: "1px solid rgba(255,77,109,0.2)" }}>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" checked={creatorAgreed}
                    onChange={(e) => setCreatorAgreed(e.target.checked)}
                    className="mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    특정 종목 매수·매도를 직접 권유하지 않고, 모든 콘텐츠는 정보 제공 목적으로만 작성하겠습니다.
                    금융소비자보호법상 미등록 투자자문 행위를 하지 않겠습니다.
                  </span>
                </label>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-2">
              <button onClick={() => setStep(1)}
                className="flex-1 py-3.5 rounded-2xl text-sm font-bold border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                이전
              </button>
              <button
                onClick={handleSubmit}
                disabled={!approvedResult || submitting || !creatorAgreed}
                className="flex-[2] py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity"
                style={{
                  background: "var(--mint)",
                  opacity: approvedResult && !submitting && creatorAgreed ? 1 : 0.4,
                }}>
                <CheckCircle2 className="w-4 h-4" />
                {submitting ? "처리 중..." : "확인 및 완료"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
