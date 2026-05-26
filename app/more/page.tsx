"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { ChevronRight, LogOut, User, Mail, Lock, Eye, EyeOff, Pencil, X, Send, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ProfileEditModal } from "@/components/ProfileEditModal";
import { AdBanner } from "@/components/AdBanner";
import { useForm, ValidationError } from "@formspree/react";
import { useLocale } from "@/contexts/LocaleContext";

type MenuItem_t = { label: string; sub: string; emoji: string; href?: string; onClick?: () => void };

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
const CATEGORY_EMOJIS = ["🐛", "💡", "🌟", "💬"];

function FeedbackModal({ onClose, user }: { onClose: () => void; user: { email: string; nickname: string } | null }) {
  const t = useLocale();
  const fb = t.more.feedback;
  const [state, handleSubmit] = useForm("xgodqoey");
  const [category, setCategory] = useState("feature");
  const [message,  setMessage]  = useState("");

  const CATEGORIES = [
    { key: "bug",     label: fb.bug,     emoji: CATEGORY_EMOJIS[0] },
    { key: "feature", label: fb.feature, emoji: CATEGORY_EMOJIS[1] },
    { key: "praise",  label: fb.praise,  emoji: CATEGORY_EMOJIS[2] },
    { key: "etc",     label: fb.etc,     emoji: CATEGORY_EMOJIS[3] },
  ];

  const categoryLabel = CATEGORIES.find((c) => c.key === category)?.label ?? category;
  const canSend = message.trim().length >= 5 && !state.submitting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={() => !state.submitting && onClose()}>
      <div
        className="w-full max-w-[480px] rounded-3xl max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>{fb.title}</h2>
          </div>
          <button onClick={onClose} disabled={state.submitting}>
            <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        <div className="px-5 pb-6">
          {state.succeeded ? (
            /* Success */
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,229,160,0.15)" }}>
                <CheckCircle2 className="w-7 h-7" style={{ color: "var(--mint)" }} />
              </div>
              <p className="text-base font-bold" style={{ color: "var(--text)" }}>{fb.successTitle}</p>
              <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
                {fb.successDesc}
              </p>
              <button onClick={onClose}
                className="w-full py-3 rounded-xl text-sm font-bold text-black"
                style={{ background: "var(--mint)" }}>
                {fb.close}
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
                  sender: user
                    ? `${user.nickname} (${user.email})`
                    : "익명",
                  _subject: `[Investus 피드백] ${categoryLabel}`,
                });
              }}
            >
              {/* Hidden fields passed via handleSubmit, but Formspree also reads input names */}
              <input type="hidden" name="_subject" value={`[Investus 피드백] ${categoryLabel}`} />

              {/* Category */}
              <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--muted)" }}>{fb.typeLabel}</p>
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
              <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>{fb.msgLabel}</p>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={fb.placeholder}
                rows={5}
                maxLength={500}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none mb-1"
                style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)", fontSize: "16px" }}
              />
              <ValidationError field="message" prefix="내용" errors={state.errors}
                className="text-xs mb-2" style={{ color: "#ef4444" }} />
              <div className="flex justify-between mb-4">
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>{fb.minChars}</span>
                <span className="text-[10px] font-mono-num" style={{ color: "var(--muted)" }}>
                  {message.length} / 500
                </span>
              </div>

              {/* Generic form error */}
              <ValidationError errors={state.errors}
                className="text-xs mb-3 text-center block" style={{ color: "#ef4444" }} />

              <button
                type="submit"
                disabled={!canSend}
                className="w-full py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-opacity active:opacity-80 disabled:opacity-40"
                style={{ background: "var(--mint)" }}
              >
                {state.submitting
                  ? <><span className="animate-spin inline-block">⏳</span> {fb.sending}</>
                  : <><Send className="w-4 h-4" />{fb.send}</>
                }
              </button>

              <p className="text-[10px] text-center mt-3" style={{ color: "var(--muted)" }}>
                {fb.senderNote}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Creator Channel Section ─────────────────────────────────────────────────

function CreatorSection() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ nickname: string; avatar: string; bio: string; status: string } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("investus_my_creator");
      setProfile(raw ? JSON.parse(raw) : null);
    } catch { setProfile(null); }
    setLoaded(true);
  }, []);

  if (!user || !loaded) return null;

  if (profile) {
    const isPhoto = (profile.avatar ?? "").startsWith("data:");
    const statusColor = profile.status === "approved" ? "var(--mint)" : profile.status === "pending" ? "#f59e0b" : "var(--muted)";
    const statusLabel = profile.status === "approved" ? "승인됨" : profile.status === "pending" ? "심사 중" : "미승인";

    return (
      <Link href="/creator/dashboard" style={{ textDecoration: "none" }}>
        <div
          className="rounded-2xl p-4 mb-6 border flex items-center gap-4 active:opacity-70 transition-opacity"
          style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.2)" }}
        >
          {/* Avatar */}
          {isPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatar} alt="creator" className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              style={{ border: "2px solid rgba(0,229,160,0.4)" }} />
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
              style={{ background: "rgba(0,229,160,0.12)", border: "2px solid rgba(0,229,160,0.3)" }}>
              {profile.avatar || <Sparkles className="w-5 h-5" style={{ color: "var(--mint)" }} />}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-sm font-bold font-syne truncate" style={{ color: "var(--text)" }}>{profile.nickname}</p>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                style={{ background: `${statusColor}22`, color: statusColor }}>
                {statusLabel}
              </span>
            </div>
            <p className="text-[11px] truncate" style={{ color: "var(--muted)" }}>{profile.bio || "내 채널을 관리하세요"}</p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center gap-1">
            <span className="text-[10px] font-semibold" style={{ color: "var(--mint)" }}>채널 관리</span>
            <ChevronRight className="w-4 h-4" style={{ color: "var(--mint)" }} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/creator/setup" style={{ textDecoration: "none" }}>
      <div
        className="rounded-2xl p-4 mb-6 border flex items-center gap-4 active:opacity-70 transition-opacity"
        style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.15)" }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,229,160,0.12)", border: "2px solid rgba(0,229,160,0.3)" }}>
          <Sparkles className="w-5 h-5" style={{ color: "var(--mint)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>크리에이터 되기</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>전자책, 강의, 리포트를 판매하세요</p>
        </div>
        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--mint)" }} />
      </div>
    </Link>
  );
}

// ── Install / Add to Home Screen ───────────────────────────────────────────

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function InstallSection() {
  const [prompt, setPrompt]           = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS]             = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) { setIsInstalled(true); return; }

    setIsIOS(/iP(hone|ad|od)/.test(navigator.userAgent));

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setPrompt(null);
    setShowConfirm(false);
  };

  if (isInstalled) return null;

  // Android / Desktop with native prompt — show confirm sheet then install directly
  if (!isIOS && prompt) {
    return (
      <div className="mt-6">
        <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
          앱으로 설치
        </p>
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full rounded-2xl p-4 border flex items-center gap-4 active:opacity-70 transition-opacity"
          style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.3)", textAlign: "left" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,229,160,0.12)" }}>
            <span className="text-xl">📲</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: "var(--text)" }}>홈 화면에 추가하시겠습니까?</p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>앱처럼 전체화면으로 실행 · 무료</p>
          </div>
          <span className="px-3 py-1.5 rounded-full text-[11px] font-bold text-black flex-shrink-0"
            style={{ background: "var(--mint)" }}>
            추가
          </span>
        </button>

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={() => setShowConfirm(false)}>
            <div className="w-full max-w-[380px] rounded-3xl px-5 py-7"
              style={{ background: "var(--card)" }}
              onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col items-center gap-3 mb-7">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}>
                  <span className="text-3xl">📲</span>
                </div>
                <h2 className="text-base font-bold font-syne text-center" style={{ color: "var(--text)" }}>
                  홈 화면에 추가하시겠습니까?
                </h2>
                <p className="text-[12px] text-center leading-relaxed" style={{ color: "var(--muted)" }}>
                  설치하면 앱처럼 전체화면으로 실행됩니다.<br />광고 없이 더 빠르게 사용하세요.
                </p>
              </div>
              <button
                onClick={handleInstall}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-black mb-3 active:opacity-80"
                style={{ background: "var(--mint)" }}>
                추가하기
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-2.5 rounded-xl text-sm"
                style={{ color: "var(--muted)" }}>
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // iOS — cannot trigger programmatically, must guide user
  if (isIOS) {
    return (
      <div className="mt-6">
        <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
          앱으로 설치
        </p>
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full rounded-2xl p-4 border flex items-center gap-4 active:opacity-70 transition-opacity"
          style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.3)", textAlign: "left" }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(0,229,160,0.12)" }}>
            <span className="text-xl">📲</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: "var(--text)" }}>홈 화면에 추가하시겠습니까?</p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>Safari → 공유 → 홈 화면에 추가</p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-40" style={{ color: "var(--muted)" }} />
        </button>

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.65)" }}
            onClick={() => setShowConfirm(false)}>
            <div className="w-full max-w-[360px] rounded-3xl px-5 py-6"
              style={{ background: "var(--card)" }}
              onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(0,229,160,0.12)", border: "1.5px solid rgba(0,229,160,0.25)" }}>
                  <span className="text-2xl">📲</span>
                </div>
                <div>
                  <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>홈 화면에 추가</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>앱처럼 전체화면 · 광고 없음</p>
                </div>
              </div>

              {/* Address bar visual */}
              <div className="rounded-2xl p-3 mb-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                <p className="text-[10px] text-center mb-2 font-semibold" style={{ color: "var(--muted)" }}>
                  Safari 주소창 옆 ··· 버튼을 탭하세요
                </p>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl" style={{ background: "#1c1c1e" }}>
                  <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "#2c2c2e" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#636366" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span className="text-[10px] flex-1" style={{ color: "#8e8e93" }}>investus.kr</span>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1.5 rounded-lg animate-pulse" style={{ background: "rgba(0,229,160,0.3)" }} />
                    <div className="relative w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#2c2c2e" }}>
                      <span className="text-[13px] font-bold tracking-tight" style={{ color: "#10b981" }}>···</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--mint)" }} />
                  <span className="text-[10px] font-semibold" style={{ color: "var(--mint)" }}>초록 표시 ··· 버튼 탭!</span>
                </div>
              </div>

              {/* 4 Steps */}
              <div className="flex flex-col gap-2.5 mb-4">
                {([
                  ["1", "···", "주소창 옆 ··· 탭"],
                  ["2", "⬆️", "공유 탭"],
                  ["3", "⋯",  "더보기(···) 탭"],
                  ["4", "➕", "홈 화면에 추가 탭 → 완료!"],
                ] as [string, string, string][]).map(([step, icon, text]) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                      style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>
                      {step}
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                      style={{ background: "rgba(255,255,255,0.06)" }}>
                      {icon}
                    </div>
                    <p className="text-[13px]" style={{ color: "var(--text)" }}>{text}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowConfirm(false)}
                className="w-full py-3 rounded-xl text-sm font-bold text-black"
                style={{ background: "var(--mint)" }}>
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop, no install prompt — bookmark tip with click modal
  return (
    <div className="mt-6">
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
        빠른 접속
      </p>
      <button
        onClick={() => setShowConfirm(true)}
        className="w-full rounded-2xl p-4 border flex items-start gap-4 active:opacity-70 transition-opacity text-left"
        style={{ background: "var(--card)", borderColor: "rgba(96,165,250,0.3)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(96,165,250,0.12)" }}>
          <span className="text-xl">🔖</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>즐겨찾기 저장</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>탭하면 추가 방법 안내</p>
        </div>
        <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-30 mt-1" style={{ color: "var(--muted)" }} />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setShowConfirm(false)}>
          <div className="w-full max-w-[360px] rounded-3xl px-5 py-6"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(96,165,250,0.12)", border: "1.5px solid rgba(96,165,250,0.25)" }}>
                <span className="text-2xl">🔖</span>
              </div>
              <div>
                <p className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>즐겨찾기 저장</p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>빠르게 Investus로 돌아오세요</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mb-5">
              {([
                ["🍎", "Mac / Safari", "⌘ + D"],
                ["🪟", "Windows / Chrome", "Ctrl + D"],
                ["⭐", "주소창 별표", "주소창 오른쪽 ★ 클릭"],
                ["📌", "Arc / Edge / Firefox", "동일하게 ⌘D / Ctrl+D"],
              ] as [string, string, string][]).map(([icon, label, tip]) => (
                <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>{label}</p>
                    <p className="text-[10px] font-mono" style={{ color: "var(--muted)" }}>{tip}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowConfirm(false)}
              className="w-full py-3 rounded-xl text-sm font-bold text-black"
              style={{ background: "var(--mint)" }}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type AuthMode = "idle" | "login" | "signup" | "reset";

function AuthSection() {
  const t = useLocale();
  const au = t.more.auth;
  const { user, login, signup, logout, resetPassword, loginWithOAuth } = useAuth();
  const [mode,         setMode]         = useState<AuthMode>("idle");
  const [email,        setEmail]        = useState("");
  const [pw,           setPw]           = useState("");
  const [pwVisible,    setPwVisible]    = useState(false);
  const [error,        setError]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [editOpen,     setEditOpen]     = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [resetSent,    setResetSent]    = useState(false);
  const [termsAgreed,  setTermsAgreed]  = useState(false);

  const reset = () => { setEmail(""); setPw(""); setError(""); setLoading(false); setConfirmEmail(false); setResetSent(false); setTermsAgreed(false); };

  const handleLogin = async () => {
    if (!email.includes("@")) { setError(au.errEmail); return; }
    setLoading(true);
    setError("");
    const ok = await login(email, pw);
    setLoading(false);
    if (!ok) { setError(au.errLogin); return; }
    setMode("idle");
    reset();
  };

  const handleSignup = async () => {
    if (!email.includes("@")) { setError(au.errEmail); return; }
    if (pw.length < 6) { setError(au.errPw); return; }
    if (!termsAgreed) { setError("이용약관 및 개인정보처리방침에 동의해주세요."); return; }
    setLoading(true);
    setError("");
    const result = await signup(email, pw);
    setLoading(false);
    if (!result.ok) { setError(result.msg); return; }
    if (result.msg === "confirm_email") { setConfirmEmail(true); return; }
    setMode("idle");
    reset();
  };

  const handleReset = async () => {
    if (!email.includes("@")) { setError(au.errEmail); return; }
    setLoading(true);
    setError("");
    const result = await resetPassword(email);
    setLoading(false);
    if (!result.ok) { setError(result.msg); return; }
    setResetSent(true);
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
                    : "linear-gradient(135deg,#10b981,#0d6efd)",
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
              {/* Email — only visible to logged-in user */}
              <p className="text-xs mt-0.5 flex items-center gap-1 truncate" style={{ color: "var(--muted)" }}>
                ✉️ {user.email}
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
            style={{ borderColor: "rgba(255,77,109,0.3)", color: "#ef4444" }}
          >
            <LogOut className="w-4 h-4" />
            {au.logout}
          </button>
        </div>

        {editOpen && <ProfileEditModal onClose={() => setEditOpen(false)} />}
      </>
    );
  }

  const closeForm = () => { setMode("idle"); reset(); };

  /* ── Auth bottom sheet ── */
  const authSheet = mode !== "idle" && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={closeForm}
    >
      <div
        className="w-full max-w-[380px] rounded-3xl px-5 py-6"
        style={{ background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
            {mode === "login" ? au.formLogin : mode === "signup" ? au.formSignup : "비밀번호 찾기"}
          </h2>
          <button onClick={closeForm}>
            <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        {/* Email confirm state */}
        {confirmEmail ? (
          <div className="flex flex-col items-center gap-4 py-4 mb-3">
            <span className="text-3xl">📬</span>
            <p className="text-sm font-bold text-center" style={{ color: "var(--text)" }}>이메일을 확인해주세요</p>
            <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
              {email}로 인증 링크를 보냈습니다.<br />링크를 클릭하면 자동으로 로그인됩니다.
            </p>
            <button onClick={() => { setConfirmEmail(false); setMode("login"); }}
              className="text-xs font-bold px-4 py-2 rounded-xl" style={{ background: "var(--mint)", color: "#000" }}>
              로그인으로 이동
            </button>
          </div>
        ) : resetSent ? (
          <div className="flex flex-col items-center gap-4 py-4 mb-3">
            <span className="text-3xl">✉️</span>
            <p className="text-sm font-bold text-center" style={{ color: "var(--text)" }}>재설정 메일을 보냈습니다</p>
            <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
              {email}로 비밀번호 재설정 링크를 보냈습니다.<br />메일함을 확인해주세요.
            </p>
            <button onClick={() => { setResetSent(false); setMode("login"); }}
              className="text-xs font-bold px-4 py-2 rounded-xl" style={{ background: "var(--mint)", color: "#000" }}>
              로그인으로 이동
            </button>
          </div>
        ) : (
          <>
          {/* Email */}
          <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border mb-3"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
            <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
            <input
              type="email"
              placeholder={au.emailPH}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--text)", fontSize: "16px" }}
            />
          </div>

          {/* Password (login/signup only) */}
          {mode !== "reset" && (
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border mb-3"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <Lock className="w-4 h-4 flex-shrink-0" style={{ color: "var(--muted)" }} />
              <input
                type={pwVisible ? "text" : "password"}
                placeholder={au.pwPH}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)", fontSize: "16px" }}
                onKeyDown={(e) => e.key === "Enter" && (mode === "login" ? handleLogin() : handleSignup())}
              />
              <button onClick={() => setPwVisible((v) => !v)}>
                {pwVisible
                  ? <EyeOff className="w-4 h-4" style={{ color: "var(--muted)" }} />
                  : <Eye    className="w-4 h-4" style={{ color: "var(--muted)" }} />}
              </button>
            </div>
          )}

          {/* 약관 동의 (signup only) */}
          {mode === "signup" && (
            <label className="flex items-start gap-2 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 flex-shrink-0"
              />
              <span className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                <Link href="/more/terms" onClick={closeForm} style={{ color: "var(--mint)" }}>이용약관</Link>
                {" 및 "}
                <Link href="/more/privacy" onClick={closeForm} style={{ color: "var(--mint)" }}>개인정보처리방침</Link>
                에 동의합니다. (만 14세 이상)
              </span>
            </label>
          )}

          {/* 로그인 - 비밀번호 찾기 링크 */}
          {mode === "login" && (
            <button
              onClick={() => { setMode("reset"); setError(""); }}
              className="text-[11px] mb-3 text-left w-full"
              style={{ color: "var(--muted)" }}
            >
              비밀번호를 잊으셨나요? <span style={{ color: "var(--mint)" }}>비밀번호 찾기</span>
            </button>
          )}

          {error && <p className="text-xs mb-3" style={{ color: "#ef4444" }}>{error}</p>}

          <button
            onClick={mode === "login" ? handleLogin : mode === "signup" ? handleSignup : handleReset}
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-black mb-3 active:opacity-80 transition-opacity disabled:opacity-50"
            style={{ background: "var(--mint)" }}
          >
            {loading ? "처리 중..." : mode === "login" ? au.formLogin : mode === "signup" ? au.formSignup : "재설정 메일 보내기"}
          </button>

          {/* 소셜 로그인 (login / signup 모드에서만) */}
          {(mode === "login" || mode === "signup") && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                <span className="text-[11px]" style={{ color: "var(--muted)" }}>또는</span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>
              <button
                onClick={() => loginWithOAuth("google")}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border mb-2 text-sm font-medium active:opacity-70 transition-opacity"
                style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 계속하기
              </button>
              <button
                onClick={() => loginWithOAuth("kakao")}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium active:opacity-70 transition-opacity"
                style={{ background: "#FEE500", color: "#3C1E1E" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#3C1E1E" d="M12 3C6.48 3 2 6.72 2 11.28c0 2.9 1.74 5.45 4.36 6.97l-.9 3.35 3.94-2.6c.83.15 1.68.23 2.6.23 5.52 0 10-3.72 10-8.28C22 6.72 17.52 3 12 3z"/>
                </svg>
                카카오로 계속하기
              </button>
            </div>
          )}

          {/* mode 전환 */}
          {mode === "reset" ? (
            <button onClick={() => { setMode("login"); setError(""); }} className="w-full py-2 text-xs" style={{ color: "var(--muted)" }}>
              로그인으로 돌아가기
            </button>
          ) : (
            <button onClick={closeForm} className="w-full py-2 text-xs" style={{ color: "var(--muted)" }}>
              {au.cancel}
            </button>
          )}
          </>
        )}
      </div>
    </div>
  );

  /* ── Default: show login/signup buttons ── */
  return (
    <>
      {authSheet}
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--border)" }}>
            <User className="w-6 h-6" style={{ color: "var(--muted)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{au.loginTitle}</p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{au.loginDesc}</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setMode("login")}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border active:opacity-70 transition-opacity"
            style={{ borderColor: "var(--mint)", color: "var(--mint)" }}
          >
            {au.login}
          </button>
          <button
            onClick={() => setMode("signup")}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-black active:opacity-70 transition-opacity"
            style={{ background: "var(--mint)" }}
          >
            {au.signup}
          </button>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[11px]" style={{ color: "var(--muted)" }}>소셜 로그인</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => loginWithOAuth("google")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-medium active:opacity-70 transition-opacity"
            style={{ borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            onClick={() => loginWithOAuth("kakao")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium active:opacity-70 transition-opacity"
            style={{ background: "#FEE500", color: "#3C1E1E" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#3C1E1E" d="M12 3C6.48 3 2 6.72 2 11.28c0 2.9 1.74 5.45 4.36 6.97l-.9 3.35 3.94-2.6c.83.15 1.68.23 2.6.23 5.52 0 10-3.72 10-8.28C22 6.72 17.52 3 12 3z"/>
            </svg>
            카카오
          </button>
        </div>
      </div>
    </>
  );
}

export default function MorePage() {
  const t = useLocale();
  const mo = t.more;
  const { user } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);

  const MENU_EMOJIS = [
    ["📖", "📊", "🔖"],
    ["📢", "🔔", "💌", "❓"],
    ["📄", "🔒", "⚠️"],
  ];
  const MENU_HREFS = [
    ["/more/guide", "/more/about", "/more/version"],
    ["/more/notices", "/more/notifications", undefined, "/more/faq"],
    ["/more/terms", "/more/privacy", "/more/disclaimer"],
  ];

  const sections: { title: string; items: MenuItem_t[] }[] = mo.sections.map((sec, si) => ({
    title: sec.title,
    items: sec.items.map((item, ii) => ({
      label:   item.label,
      sub:     item.sub,
      emoji:   MENU_EMOJIS[si][ii],
      href:    MENU_HREFS[si][ii],
      onClick: si === 1 && ii === 2 ? () => setShowFeedback(true) : undefined,
    })),
  }));

  // Right sidebar quick-link tiles (3×3 grid)
  const sidebarLinks = [
    { emoji: "📖", label: "사용 가이드",  href: "/more/guide" },
    { emoji: "📊", label: "소개",         href: "/more/about" },
    { emoji: "🔖", label: "업데이트",     href: "/more/version" },
    { emoji: "📢", label: "공지사항",     href: "/more/notices" },
    { emoji: "❓", label: "FAQ",          href: "/more/faq" },
    { emoji: "💌", label: "피드백",       href: undefined, action: () => setShowFeedback(true) },
    { emoji: "📄", label: "이용약관",     href: "/more/terms" },
    { emoji: "🔒", label: "개인정보",     href: "/more/privacy" },
    { emoji: "⚠️", label: "법적고지",     href: "/more/disclaimer" },
  ];

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      {/* ── Mobile: single column / Desktop: 2-column ── */}
      <div className="max-w-[480px] lg:max-w-[1100px] mx-auto px-4 lg:px-8 pb-24 lg:pb-10">

        {/* Mobile title (hidden on desktop — desktop has no separate title) */}
        <div className="pt-5 pb-5 lg:hidden">
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{mo.title}</h1>
        </div>

        <div className="lg:grid lg:gap-8 lg:items-start lg:pt-6" style={{ gridTemplateColumns: "1fr 300px" }}>

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════════ */}
          <div>
            {/* Profile — top left on desktop */}
            <AuthSection />

            {/* Mobile: creator + brand card here */}
            <div className="lg:hidden">
              <CreatorSection />
              <div className="rounded-2xl p-5 mb-6 border text-center"
                style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.15)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "var(--mint)" }}>
                  <TrendingUp className="w-7 h-7 text-black" strokeWidth={2.5} />
                </div>
                <p className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{mo.tagline}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--muted)" }}>investus.kr</p>
              </div>
            </div>

            <AdBanner format="auto" />

            {/* Menu sections — 앱정보 + 고객지원 (법적고지는 right sidebar에) */}
            <div className="flex flex-col gap-4 mb-6">
              {sections.slice(0, 2).map((section) => (
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

              {/* 법적고지 — mobile only (on desktop it's in right sidebar) */}
              <div className="lg:hidden">
                <p className="text-xs font-semibold tracking-widest uppercase mb-2 font-syne"
                  style={{ color: "var(--muted)" }}>
                  {sections[2]?.title}
                </p>
                <div className="rounded-2xl border overflow-hidden"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  {sections[2]?.items.map((item, idx) => (
                    <div key={item.label}
                      className={idx < (sections[2]?.items.length ?? 0) - 1 ? "border-b" : ""}
                      style={{ borderColor: "var(--border)" }}>
                      <MenuItem {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 모바일에서만 InstallSection 표시 — 데스크탑은 사이드바 */}
            <div className="lg:hidden">
              <InstallSection />
            </div>

            <p className="text-center text-[10px] mt-8 lg:text-left" style={{ color: "var(--muted)" }}>
              {mo.footer.split("\n").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>

          {/* ══ RIGHT SIDEBAR (desktop only) ══════════════════════════════════ */}
          <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:sticky" style={{ top: "24px" }}>

            {/* 1. Investus 브랜드 카드 — 최상단 */}
            <div className="rounded-2xl p-5 border text-center"
              style={{ background: "linear-gradient(135deg,#111318,#0d1f18)", borderColor: "rgba(0,229,160,0.2)" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "var(--mint)", boxShadow: "0 8px 24px rgba(0,229,160,0.3)" }}>
                <TrendingUp className="w-8 h-8 text-black" strokeWidth={2.5} />
              </div>
              <p className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>Investus</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>{mo.tagline}</p>
              <p className="text-[10px] mt-2 font-mono" style={{ color: "rgba(0,229,160,0.6)" }}>investus.kr</p>
            </div>

            {/* 2. 크리에이터 되기 */}
            <CreatorSection />

            {/* 3. 바로가기 링크 3×3 그리드 */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase mb-3 font-syne" style={{ color: "var(--muted)" }}>
                바로가기
              </p>
              <div className="grid grid-cols-3 gap-2">
                {sidebarLinks.map((link) => {
                  const inner = (
                    <div
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all hover:border-opacity-60"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}
                    >
                      <span className="text-lg">{link.emoji}</span>
                      <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "var(--muted)" }}>
                        {link.label}
                      </span>
                    </div>
                  );
                  if (link.href) {
                    return <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>{inner}</Link>;
                  }
                  return (
                    <button key={link.label} onClick={link.action} className="text-left">
                      {inner}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. 즐겨찾기 / 앱 설치 */}
            <div className="-mt-1">
              <InstallSection />
            </div>
          </div>

        </div>{/* end lg:grid */}
      </div>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} user={user} />
      )}
    </div>
  );
}
