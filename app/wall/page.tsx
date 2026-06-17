"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/contexts/LocaleContext";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Lock, ShieldCheck, Upload, User, Sparkles, Users, TrendingUp, Send, X, EyeOff, FileCheck, Heart, Pencil, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { CreatorCard } from "@/components/CreatorCard";
import { AdFitBanner, AdFitStrip } from "@/components/AdFitBanner";
import { useAuth } from "@/hooks/useAuth";
import { getSupabase } from "@/lib/supabase";
import { CREATORS } from "@/lib/creators";
import { MOCK_POSTS, MOCK_COMMENTS, LATEST_UPDATE, type Post, type Comment } from "@/lib/wallPosts";
import { MOCK_ANALYST_POSTS, MOCK_ANALYST_COMMENTS } from "@/lib/analystPosts";

// Attach the current Supabase JWT to every authenticated API call
async function authHeaders(extra: Record<string, string> = {}): Promise<HeadersInit> {
  try {
    const { data: { session } } = await getSupabase().auth.getSession();
    const headers: Record<string, string> = { "Content-Type": "application/json", ...extra };
    if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;
    return headers;
  } catch {
    return { "Content-Type": "application/json", ...extra };
  }
}

type WallT = ReturnType<typeof useLocale>["wall"];

// Same formula as server — deterministic anonymous nickname from email
function makeAnonNick(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash * 31 + email.charCodeAt(i)) & 0x7fffffff;
  }
  return `익명_${String(hash % 10000).padStart(4, "0")}`;
}

function getRelativeTime(ts: number, w: WallT): string {
  const diff = Date.now() - ts;
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return w.relativeNow;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return w.relativeMin(mins);
  const hours = Math.floor(mins / 60);
  if (hours < 24) return w.relativeHour(hours);
  const days = Math.floor(hours / 24);
  return w.relativeDay(days);
}

type ApiComment = { id: number; post_id: number; is_mine: boolean; nickname: string; content: string; likes: number; created_at: string; parent_id?: number | null };

// ── 서학개미 인기 종목 + ETF ──────────────────────────────────────────────────
const ALL_SYMBOLS = [
  "NVDA", "TSLA", "SPCX", "AAPL", "PLTR", "MSFT", "META",
  "AMZN", "GOOGL", "AMD", "AVGO", "COIN", "SMCI",
  "RKLB", "IONQ", "CEG",
  "VOO", "SPY", "QQQ", "SCHD",
];



// ── Comment Modal ─────────────────────────────────────────────────────────────
type CommentWithReplies = Comment & { parentId?: number | null; replies?: Comment[] };

function CommentModal({ post, realPostId, onClose }: { post: Post; realPostId?: number; onClose: () => void }) {
  const { user } = useAuth();
  const t = useLocale();
  const w = t.wall;
  const [allComments, setAllComments] = useState<CommentWithReplies[]>([]);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: number; nickname: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [, setTick] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const touchStartY = useRef(0);

  const topLevel = allComments.filter((c) => !c.parentId);
  const totalCount = allComments.length;

  useEffect(() => {
    if (realPostId != null) {
      fetch(`/api/wall-comments?post_id=${realPostId}`)
        .then((r) => r.json())
        .then((data: ApiComment[]) => {
          if (Array.isArray(data)) {
            setAllComments(data.map((c) => ({
              id:           c.id,
              nickname:     c.nickname,
              holdingLabel: "보유인증",
              content:      c.content,
              createdAt:    new Date(c.created_at).getTime(),
              likes:        c.likes,
              parentId:     c.parent_id ?? null,
            })));
          }
        })
        .catch(() => {});
    } else {
      setAllComments((MOCK_COMMENTS[post.id] ?? []).map((c) => ({ ...c, parentId: null })));
    }
  }, [post.id, realPostId]);

  useEffect(() => {
    const id = setInterval(() => setTick((tick) => tick + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const submitComment = async () => {
    if (!input.trim() || !user || submitting) return;

    if (realPostId != null) {
      setSubmitting(true);
      try {
        const body: Record<string, unknown> = { post_id: realPostId, content: input.trim() };
        if (replyTo) body.parent_id = replyTo.id;
        const res  = await fetch("/api/wall-comments", {
          method:  "POST",
          headers: await authHeaders(),
          body:    JSON.stringify(body),
        });
        const data = await res.json() as ApiComment & { error?: string };
        if (res.ok && !data.error) {
          setAllComments((prev) => [...prev, {
            id:           data.id,
            nickname:     data.nickname,
            holdingLabel: "보유인증",
            content:      data.content,
            createdAt:    new Date(data.created_at).getTime(),
            likes:        0,
            parentId:     data.parent_id ?? null,
          }]);
          setInput("");
          setReplyTo(null);
        }
      } catch { /* ignore */ }
      finally { setSubmitting(false); }
    } else {
      setAllComments((prev) => [...prev, {
        id:           Date.now(),
        nickname:     makeAnonNick(user.email),
        holdingLabel: w.verified,
        content:      input.trim(),
        createdAt:    Date.now(),
        likes:        0,
        parentId:     replyTo?.id ?? null,
      }]);
      setInput("");
      setReplyTo(null);
    }
  };

  const startReply = (c: CommentWithReplies) => {
    setReplyTo({ id: c.id, nickname: c.nickname });
    inputRef.current?.focus();
  };

  const toggleLike = (id: number) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const renderComment = (c: CommentWithReplies, isReply = false) => {
    const replies = allComments.filter((r) => r.parentId === c.id);
    return (
      <div key={c.id} className={isReply ? "ml-8 mt-2" : ""}>
        <div className="flex gap-2.5">
          {isReply && <div className="w-px self-stretch mr-0.5" style={{ background: "var(--border)" }} />}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${isReply ? "opacity-70" : ""}`}
            style={{ background: "var(--border)", color: "var(--muted)" }}>익</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`font-semibold ${isReply ? "text-[10px]" : "text-xs"}`} style={{ color: "var(--text)" }}>{c.nickname}</span>
              <span className="text-[9px] px-1 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.08)", color: "var(--mint)" }}>✓ {c.holdingLabel}</span>
              <span className="text-[9px] ml-auto" style={{ color: "var(--muted)" }}>{getRelativeTime(c.createdAt, w)}</span>
            </div>
            <p className={`leading-relaxed mb-1 ${isReply ? "text-[11px]" : "text-[12px]"}`} style={{ color: "var(--text)" }}>{c.content}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => toggleLike(c.id)} className="flex items-center gap-1 text-[10px]"
                style={{ color: likedComments.has(c.id) ? "var(--mint)" : "var(--muted)" }}>
                <ThumbsUp className="w-3 h-3" />
                {c.likes + (likedComments.has(c.id) ? 1 : 0)}
              </button>
              {!isReply && user && (
                <button onClick={() => startReply(c)} className="text-[10px]" style={{ color: "var(--muted)" }}>
                  답글
                </button>
              )}
            </div>
          </div>
        </div>
        {replies.map((r) => renderComment(r, true))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="w-full lg:max-w-[420px] rounded-t-3xl lg:rounded-3xl flex flex-col"
        style={{ background: "var(--card)", maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY; }}
        onTouchEnd={(e) => {
          const dy = e.changedTouches[0].clientY - touchStartY.current;
          if (dy > 60) onClose();
        }}
      >
        {/* 스와이프 핸들 */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: "var(--border)" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
              {post.symbol}
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{w.commentCount(totalCount)}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity active:opacity-60" style={{ background: "var(--bg)" }}>
            <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
          </button>
        </div>

        {/* Original post */}
        <div className="px-4 py-3 flex-shrink-0 border-b" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--border)", color: "var(--muted)" }}>익</div>
            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{post.nickname}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>✓ {post.holdingLabel}</span>
          </div>
          <p className="text-[12px] leading-relaxed line-clamp-3" style={{ color: "var(--muted)" }}>{post.content}</p>
        </div>

        {/* Comment list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {topLevel.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <span className="text-3xl">💬</span>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{w.commentEmpty}</p>
            </div>
          ) : (
            topLevel.map((c) => renderComment(c))
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 pb-safe flex-shrink-0 border-t" style={{ borderColor: "var(--border)" }}>
          {replyTo && (
            <div className="flex items-center gap-1.5 mb-1.5 px-1">
              <span className="text-[10px]" style={{ color: "var(--mint)" }}>↩ {replyTo.nickname}에게 답글</span>
              <button onClick={() => setReplyTo(null)} className="ml-auto text-[10px]" style={{ color: "var(--muted)" }}>취소</button>
            </div>
          )}
          {user ? (
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitComment()}
                placeholder={replyTo ? `${replyTo.nickname}에게 답글...` : w.commentInput}
                maxLength={200}
                className="flex-1 text-[13px] bg-transparent outline-none"
                style={{ color: "var(--text)" }}
              />
              <button
                onClick={submitComment}
                disabled={!input.trim() || submitting}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-30"
                style={{ background: "var(--mint)" }}
              >
                <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-1">
              <p className="flex-1 text-xs" style={{ color: "var(--muted)" }}>{w.loginToComment}</p>
              <Link href="/more" onClick={onClose} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "var(--mint)", color: "#000" }}>
                {w.login}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Ask AI 컴포넌트 ─────────────────────────────────────────────────────────
const DAILY_LIMIT = 5;

function getTodayKey() {
  const d = new Date();
  return `uss_ai_count_${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const FALLBACK_CHIPS = [
  "지금 매수 타이밍이야?",
  "최근 주가 하락 이유가 뭐야?",
  "목표주가 얼마로 보면 돼?",
];

function AskAI({ symbol }: { symbol: string }) {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [count, setCount]       = useState(0);
  const [chips, setChips]       = useState<string[]>(FALLBACK_CHIPS);
  const inputRef                = useRef<HTMLInputElement>(null);
  const t = useLocale();
  const w = t.wall;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(getTodayKey());
      setCount(stored ? parseInt(stored, 10) : 0);
    } catch {}
    fetch("/api/ai-popular-questions")
      .then((r) => r.json())
      .then((d: { questions?: string[] }) => {
        if (d.questions && d.questions.length >= 3) setChips(d.questions.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  const limitReached = count >= DAILY_LIMIT;
  const remaining    = DAILY_LIMIT - count;

  const ask = async (q: string) => {
    if (!q.trim() || loading || limitReached) return;
    setAnswer("");
    setLoading(true);
    try {
      const res  = await fetch("/api/ask-ai", {
        method:  "POST",
        headers: { "content-type": "application/json" },
        body:    JSON.stringify({ question: q, symbol }),
      });
      const data = await res.json() as { answer?: string };
      setAnswer(data.answer ?? w.aiDisclaimer);
      const newCount = count + 1;
      setCount(newCount);
      try { localStorage.setItem(getTodayKey(), String(newCount)); } catch {}
    } catch {
      setAnswer(w.aiDisclaimer);
    }
    setLoading(false);
  };

  const handleSend = () => {
    ask(question);
    setQuestion("");
    inputRef.current?.blur();
  };

  if (limitReached) {
    return (
      <div className="mb-4 rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.2)" }}>
        <div className="px-4 pt-4 pb-3 border-b"
          style={{ borderColor: "rgba(0,229,160,0.1)", background: "rgba(0,229,160,0.03)" }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: "var(--mint)" }} />
            <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
              {w.aiTitle(symbol)}
            </p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
              style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>Claude</span>
          </div>
        </div>
        <div className="px-4 py-6 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "rgba(0,229,160,0.08)" }}>⏰</div>
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{w.aiLimitTitle}</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>{w.aiLimitSub}</p>
          <div className="w-full rounded-2xl p-4 border mt-1"
            style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "var(--mint)" }}>{w.aiSubLabel}</p>
            <p className="text-[11px] mb-3" style={{ color: "var(--muted)" }}>{w.aiSubDesc}</p>
            <button
              onClick={() => router.push("/")}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-black"
              style={{ background: "var(--mint)" }}>
              {w.aiSubscribe}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.2)" }}>
      <div className="px-4 pt-4 pb-3 border-b"
        style={{ borderColor: "rgba(0,229,160,0.1)", background: "rgba(0,229,160,0.03)" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: "var(--mint)" }} />
          <p className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>
            {w.aiTitle(symbol)}
          </p>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
            style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>Claude</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>{w.aiSubtitle}</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>{w.aiRemaining(remaining)}</p>
        </div>
      </div>

      <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto no-scrollbar">
        {chips.map((chip) => (
          <button key={chip} onClick={() => ask(chip)} disabled={loading}
            className="flex-shrink-0 text-[11px] px-3 py-1.5 rounded-full border transition-all active:opacity-60 disabled:opacity-40"
            style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--muted)" }}>
            {chip}
          </button>
        ))}
      </div>

      <div className="mx-4 mb-3 flex items-center gap-2 rounded-xl px-3 py-2.5 border"
        style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={w.aiPlaceholder(symbol)}
          className="flex-1 text-[13px] bg-transparent outline-none"
          style={{ color: "var(--text)" }}
        />
        <button onClick={handleSend} disabled={!question.trim() || loading}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-30"
          style={{ background: "var(--mint)" }}>
          <Send className="w-3.5 h-3.5 text-black" />
        </button>
      </div>

      {(loading || answer) && (
        <div className="mx-4 mb-4 flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
            style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>✦</div>
          <div className="flex-1 min-w-0">
            <div className="rounded-xl px-3 py-2.5"
              style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.12)" }}>
              {loading ? (
                <div className="flex gap-1.5 items-center py-1">
                  {[0, 150, 300].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{ background: "var(--mint)", animationDelay: `${d}ms` }} />
                  ))}
                </div>
              ) : (
                <p className="text-[12px] leading-relaxed whitespace-pre-line" style={{ color: "var(--text)" }}>{answer}</p>
              )}
            </div>
            {answer && (
              <p className="text-[9px] mt-1 pl-1" style={{ color: "var(--muted)" }}>{w.aiDisclaimer}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

function computeDefaultSymbol(): string {
  if (MOCK_POSTS.length === 0) return "AAPL";
  return MOCK_POSTS.reduce((best, post) =>
    post.createdAt > best.createdAt ? post : best
  ).symbol;
}

type VerifyMode    = "none" | "upload" | "broker" | "broker-notice";
type MainTab       = "discussion" | "creator" | "analyst";
type AnalystStatus  = "none" | "approved" | "rejected";
type AnalystPost    = { id: number; alias: string; content: string; symbol: string | null; likes: number; comments?: number; created_at: string; liked: boolean };
type AnalystComment = { id: number; alias: string; content: string; created_at: string };
type CreatorSort = "popular" | "return" | "views" | "subscribers" | "newest";

export default function WallPage() {
  const { user, verify, loginWithOAuth } = useAuth();
  const t  = useLocale();
  const w  = t.wall;
  const [mainTab, setMainTabRaw]          = useState<MainTab>(() => {
    if (typeof window === "undefined") return "discussion";
    return (sessionStorage.getItem("wall_main_tab") as MainTab) || "discussion";
  });
  const setMainTab = (tab: MainTab) => {
    try { sessionStorage.setItem("wall_main_tab", tab); } catch { /* ignore */ }
    setMainTabRaw(tab);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };
  const [selected, setSelected]           = useState(computeDefaultSymbol);
  const [liked, setLiked]                 = useState<Set<number>>(new Set());
  const [showVerify, setShowVerify]       = useState(false);
  const [verifyMode, setVerifyMode]       = useState<VerifyMode>("none");
  const [uploadDone, setUploadDone]       = useState(false);
  const [uploading, setUploading]         = useState(false);
  const [uploadErr, setUploadErr]         = useState("");
  const [hasCreatorProfile, setHasCreatorProfile] = useState(false);
  const [apiCreators, setApiCreators] = useState<{ id: string; phone?: string; nickname: string; avatar: string; bio: string; annual_return?: number; follower_count?: number; tags?: string[] }[]>([]);
  const [creatorViews, setCreatorViews] = useState<Record<string, number>>({});
  const [expandedWallComments, setExpandedWallComments] = useState<Set<number>>(new Set());
  const [wallComments, setWallComments]       = useState<Record<number, CommentWithReplies[]>>({});
  const [wallCommentInput, setWallCommentInput] = useState<Record<number, string>>({});
  const [wallCommentSubmitting, setWallCommentSubmitting] = useState<number | null>(null);
  const [wallReplyTo, setWallReplyTo]         = useState<Record<number, { id: number; nickname: string } | null>>({});
  const [wallLikedComments, setWallLikedComments] = useState<Set<number>>(new Set());
  const [creatorSort, setCreatorSort]     = useState<CreatorSort>("popular");
  const [, setTick] = useState(0);
  const [lastSeen, setLastSeen] = useState<Record<string, number>>({});

  // ── Analyst tab state ──────────────────────────────────────────────────────
  const [analystStatus, setAnalystStatus]     = useState<AnalystStatus>("none");
  const [analystAlias,  setAnalystAlias]       = useState<string | null>(null);
  const [analystReason, setAnalystReason]      = useState<string | null>(null);
  const [analystPosts,  setAnalystPosts]        = useState<AnalystPost[]>([]);
  const [analystLoading, setAnalystLoading]    = useState(false);
  const [showAnalystApply, setShowAnalystApply] = useState(false);
  const [applyStep, setApplyStep]              = useState<"card" | "id" | "verifying">("card");
  const [cardBase64,  setCardBase64]            = useState<string>("");
  const [cardMime,    setCardMime]              = useState("image/jpeg");
  const [idBase64,    setIdBase64]              = useState<string>("");
  const [idMime,      setIdMime]                = useState("image/jpeg");
  const [applyErr,    setApplyErr]              = useState("");
  const [analystPost, setAnalystPost]           = useState("");
  const [analystSymbol, setAnalystSymbol]       = useState("");
  const [postingAnalyst, setPostingAnalyst]     = useState(false);
  const [analystPostErr, setAnalystPostErr]     = useState("");
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [expandedContent, setExpandedContent]     = useState<Set<number>>(new Set());
  const [expandedDiscussion, setExpandedDiscussion] = useState<Set<number>>(new Set());
  const [analystComments, setAnalystComments]   = useState<Record<number, AnalystComment[]>>({});
  const [commentDraft, setCommentDraft]         = useState<Record<number, string>>({});
  const [submittingComment, setSubmittingComment] = useState<number | null>(null);

  // Load lastSeen from localStorage once
  useEffect(() => {
    try {
      const s = localStorage.getItem("wall_last_seen");
      if (s) setLastSeen(JSON.parse(s));
    } catch {}
  }, []);

  // Precompute latest post time per symbol (for sort + NEW badge)
  const latestPostTime = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of MOCK_POSTS) {
      if (!map[p.symbol] || p.createdAt > map[p.symbol]) map[p.symbol] = p.createdAt;
    }
    return map;
  }, []);

  // Sort symbols: most recent post first
  const sortedSymbols = useMemo(() =>
    [...ALL_SYMBOLS].sort((a, b) => (latestPostTime[b] ?? 0) - (latestPostTime[a] ?? 0)),
  [latestPostTime]);

  // NEW badge: symbol has posts from today's update that user hasn't seen
  const isNew = (sym: string) => {
    const latest = latestPostTime[sym] ?? 0;
    return latest >= LATEST_UPDATE - 60_000 && (lastSeen[sym] ?? 0) < LATEST_UPDATE;
  };

  const handleSelectSymbol = (sym: string) => {
    setSelected(sym);
    setLastSeen((prev) => {
      const next = { ...prev, [sym]: Date.now() };
      try { localStorage.setItem("wall_last_seen", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  // ── Write modal state ────────────────────────────────────────────────────
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWrite, setShowWrite]         = useState(false);
  const [writeContent, setWriteContent]   = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [submitErr, setSubmitErr]         = useState("");
  const [showNoHolding, setShowNoHolding] = useState(false);
  const [editingPostId, setEditingPostId]   = useState<number | null>(null);
  const [editContent, setEditContent]       = useState("");
  const [editErr, setEditErr]               = useState("");
  const [savingEdit, setSavingEdit]         = useState(false);

  // ── Real posts (from Supabase) merged on top of mock posts ───────────────
  type RealPost = { id: number; symbol: string; is_mine: boolean; nickname: string; holding_label: string; content: string; likes: number; comments: number; created_at: string };
  const [realPosts, setRealPosts]         = useState<RealPost[]>([]);

  // ── Holdings from localStorage (portfolio) ───────────────────────────────
  const [holdings, setHoldingsRaw]        = useState<{ symbol: string; shares: number; avgCost: number }[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sp_portfolio");
      if (raw) setHoldingsRaw(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const c = localStorage.getItem("investus_my_creator");
      setHasCreatorProfile(!!c);
    } catch {}
    // Fetch approved creators from Supabase API
    fetch("/api/creator/list")
      .then((r) => r.json())
      .then((data: { id: string; phone?: string; nickname: string; avatar: string; bio: string; annual_return?: number; follower_count?: number; tags?: string[] }[]) => {
        if (!Array.isArray(data)) return;
        setApiCreators(data);
        // Fetch total view counts for all creators in parallel
        Promise.all(
          data.map(async (creator) => {
            const id = creator.phone ?? creator.id;
            try {
              const res = await fetch(`/api/creator/contents?id=${encodeURIComponent(id)}`);
              const contents = await res.json() as Array<{ viewCount?: number }>;
              const total = Array.isArray(contents)
                ? contents.reduce((s, c) => s + (c.viewCount ?? 0), 0)
                : 0;
              return [id, total] as [string, number];
            } catch {
              return [id, 0] as [string, number];
            }
          })
        ).then((pairs) => setCreatorViews(Object.fromEntries(pairs)));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  // Load analyst verification status
  useEffect(() => {
    if (!user) return;
    authHeaders().then((h) =>
      fetch("/api/analyst/status", { headers: h })
        .then((r) => r.json())
        .then((d) => {
          setAnalystStatus(d.status ?? "none");
          setAnalystAlias(d.alias ?? null);
          setAnalystReason(d.reason ?? null);
        })
        .catch(() => {})
    );
  }, [user]);

  // Load analyst posts when analyst tab is active — merge with mock posts
  useEffect(() => {
    if (mainTab !== "analyst") return;
    setAnalystLoading(true);
    authHeaders().then((h) =>
      fetch("/api/analyst/posts", { headers: h })
        .then((r) => r.json())
        .then((d) => {
          const real = Array.isArray(d) ? d : [];
          const merged = [...real, ...MOCK_ANALYST_POSTS];
          merged.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setAnalystPosts(merged);
        })
        .catch(() => {
          const fallback = [...MOCK_ANALYST_POSTS].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setAnalystPosts(fallback);
        })
        .finally(() => setAnalystLoading(false))
    );
  }, [mainTab]);

  // ── Analyst handlers ────────────────────────────────────────────────────────
  const toBase64 = (file: File): Promise<{ base64: string; mime: string }> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(",")[1];
        resolve({ base64, mime: file.type || "image/jpeg" });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleCardUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { base64, mime } = await toBase64(file);
    setCardBase64(base64);
    setCardMime(mime);
    setApplyStep("id");
  };

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const { base64, mime } = await toBase64(file);
    setIdBase64(base64);
    setIdMime(mime);
    // Auto-submit verification
    setApplyStep("verifying");
    setApplyErr("");
    try {
      const h = await authHeaders();
      const res = await fetch("/api/analyst/apply", {
        method: "POST",
        headers: h,
        body: JSON.stringify({ cardBase64, cardMime, idBase64: base64, idMime: mime }),
      });
      const data = await res.json();
      if (data.status === "approved") {
        setAnalystStatus("approved");
        setAnalystAlias(data.alias);
        setShowAnalystApply(false);
      } else {
        setAnalystStatus("rejected");
        setAnalystReason(data.reason ?? "인증 실패");
        setApplyErr(data.reason ?? "인증에 실패했습니다. 더 선명한 이미지로 다시 시도해주세요.");
        setApplyStep("card");
      }
    } catch {
      setApplyErr("네트워크 오류. 다시 시도해주세요.");
      setApplyStep("card");
    }
  };

  const handleAnalystLike = async (postId: number) => {
    if (!user) return;
    // Mock posts (negative IDs) — just toggle locally
    if (postId < 0) {
      setAnalystPosts((prev) => prev.map((p) =>
        p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      ));
      return;
    }
    const h = await authHeaders();
    const res = await fetch(`/api/analyst/posts/${postId}/like`, { method: "POST", headers: h });
    if (!res.ok) return;
    const { liked, likes } = await res.json();
    setAnalystPosts((prev) => prev.map((p) => p.id === postId ? { ...p, liked, likes } : p));
  };

  const handleAnalystPost = async () => {
    if (!user || !analystPost.trim()) return;
    setPostingAnalyst(true);
    setAnalystPostErr("");
    try {
      const h = await authHeaders();
      const res = await fetch("/api/analyst/posts", {
        method: "POST",
        headers: h,
        body: JSON.stringify({ content: analystPost.trim(), symbol: analystSymbol || undefined }),
      });
      const data = await res.json() as AnalystPost & { error?: string };
      if (res.ok && !data.error) {
        setAnalystPosts((prev) => [data, ...prev]);
        setAnalystPost("");
        setAnalystSymbol("");
      } else {
        setAnalystPostErr(data.error ?? "게시 실패. 다시 시도해주세요.");
      }
    } catch {
      setAnalystPostErr("네트워크 오류. 다시 시도해주세요.");
    }
    setPostingAnalyst(false);
  };

  const toggleAnalystComments = async (postId: number) => {
    if (postId < 0) {
      // mock post — no real comments, just toggle
      setExpandedComments((prev) => {
        const next = new Set(prev);
        next.has(postId) ? next.delete(postId) : next.add(postId);
        return next;
      });
      return;
    }
    const isOpen = expandedComments.has(postId);
    if (isOpen) {
      setExpandedComments((prev) => { const n = new Set(prev); n.delete(postId); return n; });
      return;
    }
    setExpandedComments((prev) => new Set(prev).add(postId));
    if (analystComments[postId]) return; // already loaded
    try {
      const res = await fetch(`/api/analyst/posts/${postId}/comments`);
      const d = await res.json();
      setAnalystComments((prev) => ({ ...prev, [postId]: Array.isArray(d) ? d : [] }));
    } catch {
      setAnalystComments((prev) => ({ ...prev, [postId]: [] }));
    }
  };

  const submitAnalystComment = async (postId: number) => {
    const content = commentDraft[postId]?.trim();
    if (!user || !content || postId < 0) return;
    setSubmittingComment(postId);
    const h = await authHeaders();
    const res = await fetch(`/api/analyst/posts/${postId}/comments`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const comment: AnalystComment = await res.json();
      setAnalystComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), comment] }));
      setCommentDraft((prev) => ({ ...prev, [postId]: "" }));
      setAnalystPosts((prev) => prev.map((p) =>
        p.id === postId ? { ...p, comments: (p.comments ?? 0) + 1 } : p
      ));
    }
    setSubmittingComment(null);
  };

  const handleDeletePost = async (realId: number) => {
    if (!user) return;
    if (!confirm("이 글을 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/wall-posts?id=${realId}`, { method: "DELETE", headers: await authHeaders() });
    if (res.ok) setRealPosts((prev) => prev.filter((r) => r.id !== realId));
  };

  const startEditPost = (realId: number, content: string) => {
    setEditingPostId(realId);
    setEditContent(content);
    setEditErr("");
  };

  const cancelEditPost = () => {
    setEditingPostId(null);
    setEditContent("");
    setEditErr("");
  };

  const handleSaveEdit = async (realId: number) => {
    if (!editContent.trim() || savingEdit) return;
    setSavingEdit(true);
    setEditErr("");
    try {
      const res = await fetch(`/api/wall-posts?id=${realId}`, {
        method: "PATCH",
        headers: await authHeaders(),
        body: JSON.stringify({ content: editContent.trim() }),
      });
      const data = await res.json() as { ok?: boolean; content?: string; error?: string };
      if (res.ok && data.ok) {
        setRealPosts((prev) => prev.map((r) =>
          r.id === realId ? { ...r, content: data.content ?? editContent.trim() } : r
        ));
        setEditingPostId(null);
        setEditContent("");
      } else {
        setEditErr(data.error ?? "수정 실패. 다시 시도해주세요.");
      }
    } catch {
      setEditErr("네트워크 오류. 다시 시도해주세요.");
    }
    setSavingEdit(false);
  };

  // ── Inline wall comment handlers ─────────────────────────────────────────
  const toggleWallComments = async (postId: number, realId: number | null) => {
    const isOpen = expandedWallComments.has(postId);
    if (isOpen) {
      setExpandedWallComments((prev) => { const n = new Set(prev); n.delete(postId); return n; });
      return;
    }
    setExpandedWallComments((prev) => new Set(prev).add(postId));
    if (wallComments[postId]) return;
    if (realId != null) {
      try {
        const res = await fetch(`/api/wall-comments?post_id=${realId}`);
        const data = await res.json() as ApiComment[];
        if (Array.isArray(data)) {
          setWallComments((prev) => ({ ...prev, [postId]: data.map((c) => ({
            id:           c.id,
            nickname:     c.nickname,
            holdingLabel: "보유인증",
            content:      c.content,
            createdAt:    new Date(c.created_at).getTime(),
            likes:        c.likes,
            parentId:     c.parent_id ?? null,
          })) }));
        }
      } catch { setWallComments((prev) => ({ ...prev, [postId]: [] })); }
    } else {
      setWallComments((prev) => ({
        ...prev, [postId]: (MOCK_COMMENTS[postId] ?? []).map((c) => ({ ...c, parentId: null })),
      }));
    }
  };

  const submitWallComment = async (postId: number, realId: number | null) => {
    const content = wallCommentInput[postId]?.trim();
    if (!user || !content || wallCommentSubmitting === postId) return;
    setWallCommentSubmitting(postId);
    try {
      if (realId != null) {
        const body: Record<string, unknown> = { post_id: realId, content };
        const replyTo = wallReplyTo[postId];
        if (replyTo) body.parent_id = replyTo.id;
        const res = await fetch("/api/wall-comments", {
          method: "POST", headers: await authHeaders(), body: JSON.stringify(body),
        });
        const data = await res.json() as ApiComment & { error?: string };
        if (res.ok && !data.error) {
          setWallComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), {
            id: data.id, nickname: data.nickname, holdingLabel: "보유인증",
            content: data.content, createdAt: new Date(data.created_at).getTime(),
            likes: 0, parentId: data.parent_id ?? null,
          }] }));
          setWallCommentInput((prev) => ({ ...prev, [postId]: "" }));
          setWallReplyTo((prev) => ({ ...prev, [postId]: null }));
          setRealPosts((prev) => prev.map((r) =>
            r.id === realId ? { ...r, comments: r.comments + 1 } : r
          ));
        }
      } else {
        setWallComments((prev) => ({ ...prev, [postId]: [...(prev[postId] ?? []), {
          id: Date.now(), nickname: makeAnonNick(user.email), holdingLabel: w.verified,
          content, createdAt: Date.now(), likes: 0,
          parentId: wallReplyTo[postId]?.id ?? null,
        }] }));
        setWallCommentInput((prev) => ({ ...prev, [postId]: "" }));
        setWallReplyTo((prev) => ({ ...prev, [postId]: null }));
      }
    } catch {}
    setWallCommentSubmitting(null);
  };

  const renderWallComment = (c: CommentWithReplies, postId: number, all: CommentWithReplies[], isReply = false): React.ReactNode => {
    const replies = all.filter((r) => r.parentId === c.id);
    return (
      <div key={c.id} className={isReply ? "ml-8 mt-2" : ""}>
        <div className="flex gap-2.5">
          {isReply && <div className="w-px self-stretch mr-0.5" style={{ background: "var(--border)" }} />}
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5 ${isReply ? "opacity-70" : ""}`}
            style={{ background: "var(--border)", color: "var(--muted)" }}>익</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className={`font-semibold ${isReply ? "text-[10px]" : "text-xs"}`} style={{ color: "var(--text)" }}>{c.nickname}</span>
              <span className="text-[9px] px-1 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.08)", color: "var(--mint)" }}>✓ {c.holdingLabel}</span>
              <span className="text-[9px] ml-auto" style={{ color: "var(--muted)" }}>{getRelativeTime(c.createdAt, w)}</span>
            </div>
            <p className={`leading-relaxed mb-1 ${isReply ? "text-[11px]" : "text-[12px]"}`} style={{ color: "var(--text)" }}>{c.content}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setWallLikedComments((prev) => { const n = new Set(prev); n.has(c.id) ? n.delete(c.id) : n.add(c.id); return n; })}
                className="flex items-center gap-1 text-[10px]"
                style={{ color: wallLikedComments.has(c.id) ? "var(--mint)" : "var(--muted)" }}>
                <ThumbsUp className="w-3 h-3" />
                {c.likes + (wallLikedComments.has(c.id) ? 1 : 0)}
              </button>
              {!isReply && user && (
                <button onClick={() => setWallReplyTo((p) => ({ ...p, [postId]: { id: c.id, nickname: c.nickname } }))}
                  className="text-[10px]" style={{ color: "var(--muted)" }}>답글</button>
              )}
            </div>
          </div>
        </div>
        {replies.map((r) => renderWallComment(r, postId, all, true))}
      </div>
    );
  };

  // Merge real Supabase posts (first) with mock posts
  const realAsPost: Post[] = realPosts.map((r) => ({
    id:           r.id + 100000,
    symbol:       r.symbol,
    nickname:     r.nickname,
    holdingLabel: /주 보유$/.test(r.holding_label ?? "") || ["관심종목","보유확인","보유인증"].includes(r.holding_label ?? "") ? r.holding_label : "보유확인",
    content:      r.content,
    createdAt:    new Date(r.created_at).getTime(),
    likes:        r.likes,
    comments:     r.comments,
  }));
  const posts = [...realAsPost, ...MOCK_POSTS.filter((p) => p.symbol === selected)]
    .sort((a, b) => b.createdAt - a.createdAt);

  const mappedCreators: import("@/lib/creators").Creator[] = apiCreators.map((d) => ({
    id: d.phone ?? d.id,   // phone = email = lookup key for /creator/[id]
    nickname: d.nickname,
    avatar: d.avatar,
    coverGradient: "linear-gradient(135deg,#0d0d0d,#1a1a2e)",
    bio: d.bio,
    tags: d.tags ?? [],
    isVerified: true,
    accountBroker: "",
    inceptionDate: "2025-01",
    annualReturn: d.annual_return ?? 0,
    totalReturn: d.annual_return ?? 0,
    followerCount: d.follower_count ?? 0,
    portfolio: [],
    contents: [],
  }));
  const sortedCreators = [...mappedCreators].sort((a, b) => {
    if (creatorSort === "return")      return b.annualReturn - a.annualReturn;
    if (creatorSort === "views")       return (creatorViews[b.id] ?? 0) - (creatorViews[a.id] ?? 0);
    if (creatorSort === "subscribers") return b.followerCount - a.followerCount;
    if (creatorSort === "newest")      return b.inceptionDate.localeCompare(a.inceptionDate);
    // popular: composite — annual return weighted + views
    return (b.annualReturn * 2 + (creatorViews[b.id] ?? 0) * 0.01) - (a.annualReturn * 2 + (creatorViews[a.id] ?? 0) * 0.01);
  });

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Fetch real posts whenever selected symbol changes
  useEffect(() => {
    fetch(`/api/wall-posts?symbol=${selected}`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setRealPosts(d); })
      .catch(() => {});
  }, [selected]);

  const handleWriteClick = () => {
    if (!user) { setShowLoginModal(true); return; }
    setWriteContent("");
    setSubmitErr("");
    setShowWrite(true);
  };

  const handleSubmitPost = async () => {
    if (!user || !writeContent.trim()) return;
    setSubmitting(true);
    setSubmitErr("");

    const holding = holdings.find((h) => h.symbol === selected);
    const holdingLabel = holding ? `${holding.shares}주 보유` : "회원";

    try {
      const res  = await fetch("/api/wall-posts", {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify({
          symbol:       selected,
          content:      writeContent.trim(),
          holdingLabel,
        }),
      });
      const data = await res.json() as { id?: number; nickname?: string; error?: string };

      if (!res.ok || data.error) {
        setSubmitErr(data.error ?? "게시 실패. 다시 시도해주세요.");
        return;
      }

      // Prepend new post to realPosts for instant UI update (use server-returned nickname)
      if (data.id) {
        setRealPosts((prev) => [{
          id:            data.id!,
          symbol:        selected,
          is_mine:       true,
          nickname:      data.nickname ?? "익명",
          holding_label: holdingLabel,
          content:       writeContent.trim(),
          likes:         0,
          comments:      0,
          created_at:    new Date().toISOString(),
        }, ...prev]);
      }
      setShowWrite(false);
      setWriteContent("");
    } catch {
      setSubmitErr("네트워크 오류. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!file.type.startsWith("image/")) { setUploadErr("이미지 파일만 업로드 가능합니다."); return; }
    if (file.size > 3 * 1024 * 1024) { setUploadErr("파일 크기는 3MB 이하여야 합니다."); return; }

    setUploading(true);
    setUploadErr("");

    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload  = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const res  = await fetch("/api/verify-screenshot", {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });
      const data = await res.json() as { approved?: boolean; message?: string; error?: string };

      if (data.approved) {
        verify();       // update local isVerified state
        setUploadDone(true);
      } else {
        setUploadErr(data.message ?? data.error ?? "다시 시도해주세요.");
      }
    } catch {
      setUploadErr("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-7xl mx-auto lg:pb-10">
        {/* Page title */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div>
            <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{w.pageTitle}</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{w.pageSubtitle}</p>
          </div>
          {mainTab === "creator" && (
            hasCreatorProfile ? (
              <Link href="/creator/dashboard"
                className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                style={{ background: "var(--mint)", color: "#000" }}>
                ✦ {w.creatorMyChannel}
              </Link>
            ) : (
              <Link href="/creator/setup"
                className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                style={{ background: "var(--mint)", color: "#000" }}>
                <Sparkles className="w-3.5 h-3.5" />{w.creatorChannelBtn}
              </Link>
            )
          )}
          {mainTab === "discussion" && (
            <div className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border"
              style={{ borderColor: "rgba(0,229,160,0.3)", color: "var(--mint)" }}>
              <Lock className="w-3 h-3" />
              {w.anonBadge}
            </div>
          )}
        </div>

        {/* Main tab switcher */}
        <div className="flex gap-1 mx-4 mb-4 p-1 rounded-2xl" style={{ background: "var(--card)" }}>
          <button onClick={() => setMainTab("discussion")}
            className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            style={mainTab === "discussion"
              ? { background: "var(--mint)", color: "#000" }
              : { color: "var(--muted)" }}>
            <MessageCircle className="w-3.5 h-3.5" />{w.tabDiscussion}
          </button>
          <button onClick={() => setMainTab("analyst")}
            className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            style={mainTab === "analyst"
              ? { background: "#7c3aed", color: "#fff" }
              : { color: "var(--muted)" }}>
            <EyeOff className="w-3.5 h-3.5" />{w.tabAnalyst}
          </button>
          <button onClick={() => setMainTab("creator")}
            className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            style={mainTab === "creator"
              ? { background: "var(--mint)", color: "#000" }
              : { color: "var(--muted)" }}>
            <Users className="w-3.5 h-3.5" />{w.tabCreator}
          </button>
        </div>

        {/* ── DISCUSSION TAB ── */}
        {mainTab === "discussion" && (
          <>
            <div className="flex items-start gap-2 rounded-xl p-3 mx-4 mb-3 border"
              style={{ background: "rgba(0,229,160,0.05)", borderColor: "rgba(0,229,160,0.15)" }}>
              <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {w.notice}
              </p>
            </div>

            {/* Stock selector — sorted by latest post, NEW badge */}
            <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
              {sortedSymbols.map((sym) => {
                const active = selected === sym;
                const hasNew = isNew(sym);
                return (
                  <button key={sym} onClick={() => handleSelectSymbol(sym)}
                    className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border transition-all"
                    style={{
                      position: "relative",
                      background: active ? "var(--mint)" : "var(--card)",
                      borderColor: active ? "var(--mint)" : "var(--border)",
                    }}>
                    {hasNew && (
                      <span style={{
                        position: "absolute", top: -4, right: -4,
                        background: "#ef4444", color: "#fff",
                        fontSize: 8, fontWeight: 800,
                        padding: "1px 4px", borderRadius: 5,
                        lineHeight: 1.5, letterSpacing: 0,
                        boxShadow: "0 1px 4px rgba(255,77,109,0.5)",
                      }}>N</span>
                    )}
                    <span className="text-xs font-bold font-mono-num leading-none"
                      style={{ color: active ? "#000" : "var(--text)" }}>
                      {sym}
                    </span>
                    <span className="text-[9px] leading-none"
                      style={{ color: active ? "rgba(0,0,0,0.6)" : "var(--muted)" }}>
                      {w.stockNames[sym] ?? sym}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="px-4 mb-2">
              <AskAI symbol={selected} />
            </div>

            <div className="px-4">
              <AdFitStrip className="mb-1" />
              <AdFitBanner />

              {/* Posts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
                {posts.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
                    <span className="text-4xl">💬</span>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>{w.emptyPosts}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{w.emptyPostsSub}</p>
                  </div>
                ) : (
                  posts.flatMap((post, idx) => {
                    // Look up the real post to check ownership and get realId for delete
                    const realId   = post.id >= 100000 ? post.id - 100000 : null;
                    const realPost = realId != null ? realPosts.find((r) => r.id === realId) : null;
                    const isOwn    = !!realPost && realPost.is_mine;
                    const isEditing = editingPostId === realId;
                    const adAfter = (idx + 1) % 4 === 0 ? (
                      <div key={`ad-disc-${idx}`} className="col-span-full my-1"><AdFitBanner /></div>
                    ) : null;
                    return [
                    <article key={post.id} className="rounded-2xl p-4 border"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: "var(--border)", color: "var(--muted)" }}>익</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{post.nickname}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                              style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
                              ✓ {post.holdingLabel}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{getRelativeTime(post.createdAt, w)}</span>
                        {isOwn && realId != null && (
                          <div className="flex items-center gap-1 ml-auto">
                            {!isEditing && (
                              <button
                                onClick={() => startEditPost(realId, post.content)}
                                className="p-1 rounded-lg transition-opacity active:opacity-50"
                                title="수정">
                                <Pencil className="w-3 h-3" style={{ color: "var(--muted)" }} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeletePost(realId)}
                              className="p-1 rounded-lg transition-opacity active:opacity-50"
                              title="삭제">
                              <X className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Content — edit mode or read mode */}
                      {isEditing && realId != null ? (
                        <div className="mb-3">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            maxLength={300}
                            rows={3}
                            autoFocus
                            className="w-full rounded-xl p-2.5 text-[13px] leading-relaxed resize-none outline-none border"
                            style={{ background: "var(--bg)", borderColor: "rgba(0,229,160,0.35)", color: "var(--text)", fontSize: "16px" }}
                          />
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] tabular-nums" style={{ color: editContent.length > 280 ? "#ef4444" : "var(--muted)" }}>
                              {editContent.length}/300
                            </span>
                            {editErr && <span className="text-[10px]" style={{ color: "#ef4444" }}>{editErr}</span>}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleSaveEdit(realId)}
                              disabled={savingEdit || editContent.trim().length < 5}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-opacity disabled:opacity-40"
                              style={{ background: "var(--mint)", color: "#000" }}>
                              <Check className="w-3 h-3" />
                              {savingEdit ? "저장 중…" : "저장"}
                            </button>
                            <button
                              onClick={cancelEditPost}
                              className="px-3 py-1.5 rounded-lg text-[11px] border transition-opacity"
                              style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => setExpandedDiscussion((prev) => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}
                          className="mb-3 cursor-pointer select-none active:opacity-70"
                        >
                          <p className={`text-[13px] leading-relaxed ${expandedDiscussion.has(post.id) ? "" : "line-clamp-3"}`} style={{ color: "var(--text)" }}>{post.content}</p>
                          {!expandedDiscussion.has(post.id) && (
                            <span className="text-[11px] mt-0.5 block" style={{ color: "var(--mint)", opacity: 0.7 }}>더보기</span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 text-xs transition-colors"
                          style={{ color: liked.has(post.id) ? "var(--mint)" : "var(--muted)" }}>
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes + (liked.has(post.id) ? 1 : 0)}
                        </button>
                        <button
                          onClick={() => toggleWallComments(post.id, realId)}
                          className="flex items-center gap-1.5 text-xs active:opacity-60 transition-opacity"
                          style={{ color: expandedWallComments.has(post.id) ? "var(--mint)" : "var(--muted)" }}>
                          <MessageCircle className="w-3.5 h-3.5" />
                          {wallComments[post.id] !== undefined ? wallComments[post.id].length : post.comments}
                        </button>
                      </div>

                      {/* Inline comments */}
                      {expandedWallComments.has(post.id) && (
                        <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                          {(wallComments[post.id] ?? []).filter((c) => !c.parentId).length === 0 ? (
                            <p className="text-xs text-center py-3" style={{ color: "var(--muted)" }}>{w.commentEmpty}</p>
                          ) : (
                            <div className="space-y-3 mb-3">
                              {(wallComments[post.id] ?? []).filter((c) => !c.parentId)
                                .map((c) => renderWallComment(c, post.id, wallComments[post.id] ?? []))}
                            </div>
                          )}
                          {wallReplyTo[post.id] && (
                            <div className="flex items-center gap-1.5 mb-1.5 px-1">
                              <span className="text-[10px]" style={{ color: "var(--mint)" }}>↩ {wallReplyTo[post.id]!.nickname}에게 답글</span>
                              <button onClick={() => setWallReplyTo((p) => ({ ...p, [post.id]: null }))} className="ml-auto text-[10px]" style={{ color: "var(--muted)" }}>취소</button>
                            </div>
                          )}
                          {user ? (
                            <div className="flex gap-2 mt-2">
                              <input
                                value={wallCommentInput[post.id] ?? ""}
                                onChange={(e) => setWallCommentInput((p) => ({ ...p, [post.id]: e.target.value }))}
                                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitWallComment(post.id, realId); }}}
                                placeholder={wallReplyTo[post.id] ? `${wallReplyTo[post.id]!.nickname}에게 답글...` : w.commentInput}
                                maxLength={200}
                                className="flex-1 text-[12px] rounded-xl px-3 py-2 border outline-none"
                                style={{ background: "var(--bg)", borderColor: "rgba(0,229,160,0.3)", color: "var(--text)", fontSize: "16px" }}
                              />
                              <button
                                onClick={() => submitWallComment(post.id, realId)}
                                disabled={wallCommentSubmitting === post.id || !wallCommentInput[post.id]?.trim()}
                                className="px-3 py-2 rounded-xl text-[11px] font-bold transition-opacity disabled:opacity-40"
                                style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>
                                {wallCommentSubmitting === post.id ? "..." : "전송"}
                              </button>
                            </div>
                          ) : (
                            <p className="text-[11px] text-center py-2" style={{ color: "var(--muted)" }}>💬 댓글은 로그인 후 작성할 수 있습니다</p>
                          )}
                        </div>
                      )}
                    </article>,
                    ...(adAfter ? [adAfter] : []),
                    ];})
                )}
              </div>

              {/* 광고 — 포스트 목록 아래 */}
              {posts.length > 0 && (
                <div className="mt-4">
                  <AdFitBanner />
                </div>
              )}
            </div>

            {/* Write FAB — always visible, triggers login modal when not logged in */}
            <div className="fixed right-4 lg:right-8" style={{ bottom: "calc(env(safe-area-inset-bottom) + 5rem)" }}>
              <button onClick={handleWriteClick}
                className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-black font-bold text-2xl"
                style={{ background: "var(--mint)", boxShadow: "0 4px 20px rgba(0,229,160,0.4)" }}>
                ✏️
              </button>
            </div>
          </>
        )}

        {/* ── CREATOR TAB ── */}
        {mainTab === "creator" && (
          <div className="px-4">
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:items-start mb-5">
              {hasCreatorProfile ? (
                <Link href="/creator/dashboard"
                  className="rounded-2xl p-4 border flex items-center gap-4 active:opacity-80 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,160,0.12) 0%, rgba(0,229,160,0.03) 100%)",
                    borderColor: "rgba(0,229,160,0.3)",
                    textDecoration: "none",
                  }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(0,229,160,0.1)" }}>✦</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold font-syne mb-0.5" style={{ color: "var(--text)" }}>{w.creatorMyChannel}</p>
                    <p className="text-[11px]" style={{ color: "var(--muted)" }}>{w.creatorMyDesc}</p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--mint)" }}>{w.creatorManage}</span>
                </Link>
              ) : (
                <div className="rounded-2xl p-4 border"
                  style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.1) 0%, rgba(0,229,160,0.03) 100%)", borderColor: "rgba(0,229,160,0.2)" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <h2 className="text-sm font-bold font-syne mb-1" style={{ color: "var(--text)" }}>{w.creatorMarket}</h2>
                      <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                        {w.creatorMarketDesc}
                      </p>
                      <Link href="/creator/setup"
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl"
                        style={{ background: "var(--mint)", color: "#000" }}>
                        <Sparkles className="w-3.5 h-3.5" />{w.creatorBecome}
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 mt-5 lg:mt-0">
                {w.creatorFeatures.map((item) => (
                  <div key={item.title} className="rounded-xl p-3 text-center border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-[10px] font-bold mb-0.5" style={{ color: "var(--text)" }}>{item.title}</div>
                    <div className="text-[9px] leading-tight" style={{ color: "var(--muted)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <AdFitBanner />

            {/* ── 시상대 포디움 ── */}
            {apiCreators.length >= 1 && (() => {
              // 포디움: 순위 순서대로 정렬된 top3 (수익률 기준)
              const top3 = [...mappedCreators]
                .sort((a, b) => b.annualReturn - a.annualReturn)
                .slice(0, 3);

              type PodiumEntry = { medal: string; medalColor: string; height: number; textSize: string; rank: number };
              const SLOTS: PodiumEntry[] = [
                { medal: "🥈", medalColor: "#C0C0C0", height: 58,  textSize: "text-base", rank: 1 },
                { medal: "🥇", medalColor: "#FFD700", height: 84,  textSize: "text-xl",   rank: 0 },
                { medal: "🥉", medalColor: "#CD7F32", height: 42,  textSize: "text-base", rank: 2 },
              ];

              return (
                <div
                  className="rounded-2xl border overflow-hidden mt-5 mb-4"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <p
                    className="text-[10px] text-center font-semibold tracking-widest uppercase pt-4 pb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    🏆 {w.creatorPodium}
                  </p>
                  <div className="flex items-end justify-center gap-2 px-5">
                    {SLOTS.map(({ medal, medalColor, height, textSize, rank }) => {
                      const creator = top3[rank];
                      if (!creator) {
                        return (
                          <div key={rank} className="flex flex-col items-center flex-1 opacity-20">
                            <span className="text-2xl mb-1">{medal}</span>
                            <div
                              className={`w-full rounded-t-xl flex items-center justify-center font-black ${textSize}`}
                              style={{ height, background: "rgba(255,255,255,0.04)", borderTop: `2px solid rgba(255,255,255,0.1)`, color: medalColor }}
                            >
                              {rank + 1}
                            </div>
                          </div>
                        );
                      }
                      const totalViews = creatorViews[creator.id] ?? 0;
                      return (
                        <div key={rank} className="flex flex-col items-center flex-1">
                          <span className={`${rank === 0 ? "text-3xl" : "text-2xl"} mb-1`}>{medal}</span>
                          <p
                            className="text-[9px] font-bold text-center leading-tight mb-0.5 px-0.5 break-words w-full"
                            style={{ color: "var(--text)" }}
                          >
                            {creator.nickname}
                          </p>
                          {/* 계좌 수익률 */}
                          <div className="flex items-center justify-center gap-0.5 mb-0.5">
                            <TrendingUp className="w-2.5 h-2.5" style={{ color: "var(--mint)" }} />
                            <span className="text-[9px] font-mono-num font-bold" style={{ color: "var(--mint)" }}>
                              +{creator.annualReturn}%
                            </span>
                          </div>
                          {/* 뷰수 */}
                          <div className="flex items-center justify-center gap-0.5 mb-1.5">
                            <span className="text-[8px]" style={{ color: "var(--muted)" }}>👁</span>
                            <span className="text-[8px] font-mono-num" style={{ color: medalColor }}>
                              {totalViews > 0 ? `${totalViews.toLocaleString()}뷰` : `${creator.followerCount.toLocaleString()}명`}
                            </span>
                          </div>
                          <div
                            className={`w-full rounded-t-xl flex items-center justify-center font-black ${textSize}`}
                            style={{
                              height,
                              background: `${medalColor}18`,
                              borderTop: `2px solid ${medalColor}66`,
                              color: medalColor,
                            }}
                          >
                            {rank + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between mb-2 mt-2">
              <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>{w.creatorTitle}</h2>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>{w.creatorCount(apiCreators.length)}</span>
            </div>

            {/* 정렬 필터 */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-0.5">
              {(["popular", "return", "views", "subscribers", "newest"] as const).map((key) => {
                const labels = w.sortLabels;
                const active = creatorSort === key;
                return (
                  <button
                    key={key}
                    onClick={() => setCreatorSort(key)}
                    className="flex-shrink-0 text-[11px] font-semibold px-3 py-1 rounded-full transition-all"
                    style={active
                      ? { background: "var(--mint)", color: "#000" }
                      : { background: "var(--card)", color: "var(--muted)", border: "1px solid var(--border)" }
                    }
                  >
                    {labels[key]}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {sortedCreators.map((creator, idx) => (
                <CreatorCard key={creator.id} creator={creator} rank={idx + 1} />
              ))}
            </div>
          </div>
        )}

        {/* ── ANALYST TAB ── */}
        {mainTab === "analyst" && (
          <div className="px-4 pb-8">
            {/* Header */}
            <div className="rounded-2xl p-4 mb-4 border"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.04) 100%)", borderColor: "rgba(124,58,237,0.3)" }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                  style={{ background: "rgba(124,58,237,0.2)" }}>🤫</div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: "#a78bfa" }}>{w.analystTitle}</p>
                  <p className="text-[11px] leading-relaxed whitespace-pre-line" style={{ color: "var(--muted)" }}>
                    {w.analystDesc}
                  </p>
                  <p className="text-[10px] mt-2 leading-relaxed" style={{ color: "rgba(167,139,250,0.55)" }}>
                    {w.analystMnpi}
                  </p>
                </div>
              </div>
            </div>

            {/* Analyst status / apply area */}
            {!user ? (
              <div className="text-center py-6 mb-4 rounded-2xl border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <EyeOff className="w-8 h-8 mx-auto mb-3" style={{ color: "#7c3aed" }} />
                <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>{w.analystLoginRequired}</p>
                <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>{w.analystLoginDesc}</p>
                <Link href="/more" className="inline-block text-xs font-bold px-5 py-2 rounded-xl"
                  style={{ background: "#7c3aed", color: "#fff" }}>
                  {w.analystLoginBtn}
                </Link>
              </div>
            ) : analystStatus === "approved" ? (
              <>
                {/* Analyst badge + post composer */}
                <div className="rounded-2xl p-4 mb-4 border"
                  style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.25)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <FileCheck className="w-4 h-4" style={{ color: "#a78bfa" }} />
                    <span className="text-xs font-bold" style={{ color: "#a78bfa" }}>{w.analystCertified}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(124,58,237,0.2)", color: "#c4b5fd" }}>
                      {analystAlias}
                    </span>
                  </div>
                  <textarea
                    value={analystPost}
                    onChange={(e) => setAnalystPost(e.target.value)}
                    placeholder={w.analystPlaceholder}
                    maxLength={1000}
                    rows={3}
                    className="w-full rounded-xl p-3 text-[13px] leading-relaxed resize-none outline-none border mb-2"
                    style={{ background: "var(--bg)", borderColor: "rgba(124,58,237,0.3)", color: "var(--text)", fontSize: "16px" }}
                  />
                  {analystPostErr && (
                    <p className="text-[11px] mb-2" style={{ color: "#f87171" }}>{analystPostErr}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <select
                      value={analystSymbol}
                      onChange={(e) => setAnalystSymbol(e.target.value)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs outline-none border"
                      style={{ background: "var(--bg)", borderColor: "rgba(124,58,237,0.3)", color: "var(--muted)" }}>
                      <option value="">종목·지수 선택 (선택사항)</option>
                      <optgroup label="🇰🇷 한국 지수">
                        <option value="KOSPI">KOSPI — 코스피</option>
                        <option value="KOSDAQ">KOSDAQ — 코스닥</option>
                      </optgroup>
                      <optgroup label="🇺🇸 미국 종목">
                        {ALL_SYMBOLS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </optgroup>
                    </select>
                    <button
                      onClick={handleAnalystPost}
                      disabled={postingAnalyst || analystPost.trim().length < 10}
                      className="px-4 py-2 rounded-xl text-xs font-bold transition-opacity disabled:opacity-40"
                      style={{ background: "#7c3aed", color: "#fff" }}>
                      {postingAnalyst ? "게시 중…" : "게시"}
                    </button>
                  </div>
                </div>
              </>
            ) : analystStatus === "rejected" ? (
              <div className="rounded-2xl p-4 mb-4 border"
                style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "#f87171" }}>인증 실패</p>
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>{analystReason ?? "이미지를 다시 확인해주세요."}</p>
                <button onClick={() => { setApplyStep("card"); setApplyErr(""); setShowAnalystApply(true); }}
                  className="text-xs font-bold px-4 py-2 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}>
                  다시 신청하기
                </button>
              </div>
            ) : (
              /* Not applied yet */
              <button onClick={() => { setApplyStep("card"); setApplyErr(""); setShowAnalystApply(true); }}
                className="w-full rounded-2xl p-4 mb-4 border flex items-center gap-3 active:opacity-80 transition-opacity text-left"
                style={{ background: "rgba(124,58,237,0.08)", borderColor: "rgba(124,58,237,0.3)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(124,58,237,0.2)" }}>
                  <FileCheck className="w-5 h-5" style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#a78bfa" }}>애널리스트 인증 신청</p>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>명함 + 신분증 AI 인증 → 완전 익명으로 속마음 공유</p>
                </div>
              </button>
            )}

            {/* 익명성 보장 안내 */}
            <div className="rounded-2xl p-4 mb-4 border"
              style={{ background: "rgba(124,58,237,0.04)", borderColor: "rgba(124,58,237,0.18)" }}>
              <div className="flex items-start gap-2.5">
                <span className="text-base flex-shrink-0 mt-0.5">🔐</span>
                <div>
                  <p className="text-[11px] font-bold mb-1.5" style={{ color: "#a78bfa" }}>
                    {w.analystPrivacyTitle}
                  </p>
                  <ul className="text-[10px] leading-relaxed space-y-1" style={{ color: "var(--muted)" }}>
                    {w.analystPrivacy.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: `• ${item.replace(/<b>/g, `<b style="color:var(--text)">`)}` }} />
                    ))}
                  </ul>
                  <p className="text-[9px] mt-2" style={{ color: "rgba(167,139,250,0.45)" }}>
                    {w.analystPrivacyNote}
                  </p>
                </div>
              </div>
            </div>

            {/* 광고 — 애널 헤더와 포스트 피드 사이 */}
            <div className="mb-4">
              <AdFitBanner />
            </div>

            {/* Posts feed */}
            {analystLoading ? (
              <div className="text-center py-12">
                <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin mx-auto"
                  style={{ borderColor: "#7c3aed", borderTopColor: "transparent" }} />
              </div>
            ) : analystPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: "var(--muted)" }}>{w.analystEmpty}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {analystPosts.map((post) => (
                  <div key={post.id} className="rounded-2xl p-4 border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}>🔐</div>
                      <span className="text-xs font-mono font-bold" style={{ color: "#a78bfa" }}>{post.alias}</span>
                      {post.symbol && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                          style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd" }}>
                          {post.symbol}
                        </span>
                      )}
                      <span className="text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
                        {getRelativeTime(new Date(post.created_at).getTime(), w)}
                      </span>
                    </div>
                    <div
                      onClick={() => setExpandedContent((prev) => {
                        const next = new Set(prev);
                        next.has(post.id) ? next.delete(post.id) : next.add(post.id);
                        return next;
                      })}
                      className="mb-2 cursor-pointer select-none active:opacity-70"
                    >
                      <p className={`text-[13px] leading-relaxed ${expandedContent.has(post.id) ? "" : "line-clamp-2"}`} style={{ color: "var(--text)" }}>{post.content}</p>
                      <span className="text-[11px] mt-0.5 block" style={{ color: "#a78bfa" }}>
                        {expandedContent.has(post.id) ? "접기" : "더보기"}
                      </span>
                    </div>

                    {/* Action row: like + comment toggle */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAnalystLike(post.id)}
                        className="flex items-center gap-1.5 text-xs transition-all"
                        style={{ color: post.liked ? "#a78bfa" : "var(--muted)" }}>
                        <Heart className={`w-3.5 h-3.5 ${post.liked ? "fill-current" : ""}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        onClick={() => toggleAnalystComments(post.id)}
                        className="flex items-center gap-1 text-xs transition-all"
                        style={{ color: expandedComments.has(post.id) ? "#a78bfa" : "var(--muted)" }}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span>
                          {post.id < 0
                            ? (post.comments ?? 0)
                            : analystComments[post.id] !== undefined
                              ? analystComments[post.id].length
                              : (post.comments ?? 0)}
                        </span>
                      </button>
                    </div>

                    {/* Expanded comments section */}
                    {expandedComments.has(post.id) && (
                      <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
                        {/* Existing comments */}
                        {post.id >= 0 && (analystComments[post.id] ?? []).map((c) => (
                          <div key={c.id} className="mb-2">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-mono font-bold" style={{ color: "#a78bfa" }}>{c.alias}</span>
                              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                                {getRelativeTime(new Date(c.created_at).getTime(), w)}
                              </span>
                            </div>
                            <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>{c.content}</p>
                          </div>
                        ))}
                        {post.id < 0 && (MOCK_ANALYST_COMMENTS[post.id] ?? []).map((c, i) => (
                          <div key={i} className="mb-2">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-mono font-bold" style={{ color: "#a78bfa" }}>{c.alias}</span>
                              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                                {getRelativeTime(new Date(c.created_at).getTime(), w)}
                              </span>
                            </div>
                            <p className="text-[12px] leading-relaxed" style={{ color: "var(--text)" }}>{c.content}</p>
                          </div>
                        ))}

                        {/* Comment input — analysts only */}
                        {analystStatus === "approved" && post.id >= 0 && (
                          <div className="flex gap-2 mt-2">
                            <input
                              value={commentDraft[post.id] ?? ""}
                              onChange={(e) => setCommentDraft((p) => ({ ...p, [post.id]: e.target.value }))}
                              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitAnalystComment(post.id); }}}
                              placeholder="애널들은... (Enter)"
                              maxLength={500}
                              className="flex-1 text-[12px] rounded-xl px-3 py-2 border outline-none"
                              style={{ background: "rgba(124,58,237,0.06)", borderColor: "rgba(124,58,237,0.25)", color: "var(--text)" }}
                            />
                            <button
                              onClick={() => submitAnalystComment(post.id)}
                              disabled={submittingComment === post.id || !commentDraft[post.id]?.trim()}
                              className="px-3 py-2 rounded-xl text-[11px] font-bold transition-opacity disabled:opacity-40"
                              style={{ background: "rgba(124,58,237,0.25)", color: "#a78bfa" }}>
                              {submittingComment === post.id ? "..." : "전송"}
                            </button>
                          </div>
                        )}
                        {analystStatus !== "approved" && post.id >= 0 && (
                          <p className="text-[11px] text-center py-1 mt-1" style={{ color: "var(--muted)" }}>
                            💬 댓글은 인증 애널리스트만 작성할 수 있습니다
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* 광고 — 애널 피드 아래 */}
            <div className="mt-4"><AdFitBanner /></div>
          </div>
        )}
      </main>

      {/* Login modal — shown when non-logged-in user taps Write FAB */}
      {showLoginModal && !user && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowLoginModal(false)}>
          <div
            className="w-full lg:max-w-[400px] lg:rounded-3xl rounded-t-3xl p-6 pb-10 lg:pb-6"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <div className="flex justify-end mb-1">
              <button onClick={() => setShowLoginModal(false)} className="p-1 rounded-full" style={{ color: "var(--muted)" }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Icon + headline */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl"
                style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.2) 0%, rgba(0,229,160,0.06) 100%)" }}>
                ✏️
              </div>
              <h2 className="text-lg font-bold mb-1.5" style={{ color: "var(--text)" }}>
                투자 의견을 나눠보세요
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                로그인하면 {selected} 종목에 대한<br />생각을 자유롭게 올릴 수 있어요.
              </p>
            </div>

            {/* Social login buttons */}
            <button
              onClick={() => loginWithOAuth("google")}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl border mb-3 text-sm font-semibold active:opacity-70 transition-opacity"
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
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-semibold active:opacity-70 transition-opacity mb-4"
              style={{ background: "#FEE500", color: "#3C1E1E" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#3C1E1E" d="M12 3C6.48 3 2 6.72 2 11.28c0 2.9 1.74 5.45 4.36 6.97l-.9 3.35 3.94-2.6c.83.15 1.68.23 2.6.23 5.52 0 10-3.72 10-8.28C22 6.72 17.52 3 12 3z"/>
              </svg>
              카카오로 계속하기
            </button>

            <p className="text-center text-[11px]" style={{ color: "var(--muted)" }}>
              이메일 로그인은{" "}
              <Link href="/more" className="underline" onClick={() => setShowLoginModal(false)} style={{ color: "var(--mint)" }}>
                마이페이지
              </Link>
              에서 할 수 있어요.
            </p>
          </div>
        </div>
      )}

      {/* Write modal */}
      {showWrite && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setShowWrite(false)}>
          <div className="w-full max-w-[420px] rounded-3xl p-5"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
                  {selected}
                </span>
                <span className="text-sm font-bold" style={{ color: "var(--text)" }}>글쓰기</span>
              </div>
              <button onClick={() => setShowWrite(false)} className="p-1">
                <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              value={writeContent}
              onChange={(e) => setWriteContent(e.target.value)}
              placeholder={`${selected} 종목에 대한 의견을 자유롭게 나눠보세요.\n(5~300자)`}
              maxLength={300}
              rows={6}
              autoFocus
              className="w-full rounded-2xl p-3.5 text-[13px] leading-relaxed resize-none outline-none border"
              style={{
                background: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
                fontSize: "16px",
              }}
            />
            <div className="flex items-center justify-between mt-1 mb-4 px-1">
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                {holdings.find((h) => h.symbol === selected)
                  ? `✓ ${holdings.find((h) => h.symbol === selected)!.shares}주 보유 인증`
                  : ""}
              </span>
              <span className="text-[10px] tabular-nums" style={{ color: writeContent.length > 280 ? "#ef4444" : "var(--muted)" }}>
                {writeContent.length}/300
              </span>
            </div>

            {submitErr && (
              <p className="text-xs mb-3 text-center" style={{ color: "#ef4444" }}>{submitErr}</p>
            )}

            <button
              onClick={handleSubmitPost}
              disabled={submitting || writeContent.trim().length < 5}
              className="w-full py-3 rounded-2xl text-sm font-bold text-black transition-opacity disabled:opacity-40"
              style={{ background: "var(--mint)" }}>
              {submitting ? "게시 중…" : "게시하기"}
            </button>
          </div>
        </div>
      )}

      {/* No-holding alert */}
      {showNoHolding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={() => setShowNoHolding(false)}>
          <div className="w-full max-w-[340px] rounded-3xl p-6 text-center"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-3">🚫</div>
            <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>종목 보유 필요</h3>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              종목을 보유하지 않아 글을 적을 수 없습니다.<br />
              포트폴리오에 {selected} 종목을 추가하면 글을 작성할 수 있어요.
            </p>
            <button
              onClick={() => setShowNoHolding(false)}
              className="w-full py-2.5 rounded-2xl text-sm font-bold text-black"
              style={{ background: "var(--mint)" }}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* Verification modal */}
      {showVerify && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowVerify(false)}>
          <div className="w-full max-w-[400px] rounded-3xl p-6 max-h-[80vh] overflow-y-auto"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
              <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{w.verifyTitle}</h2>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              {w.verifyDesc}
            </p>

            {verifyMode === "none" && (
              <div className="flex gap-3 mb-4">
                <button onClick={() => setVerifyMode("upload")}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <Upload className="w-5 h-5" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-semibold">{w.verifyCapture}</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>{w.verifyCaptureDesc}</span>
                </button>
                <button onClick={() => setVerifyMode("broker")}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <ShieldCheck className="w-5 h-5" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-semibold">{w.verifyBroker}</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>{w.verifyBrokerDesc}</span>
                </button>
              </div>
            )}

            {verifyMode === "upload" && !uploadDone && (
              <div className="mb-4">
                <label htmlFor="screenshot-upload"
                  className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer"
                  style={{
                    borderColor: uploading ? "var(--muted)" : "rgba(0,229,160,0.4)",
                    background:  uploading ? "rgba(255,255,255,0.02)" : "rgba(0,229,160,0.04)",
                    opacity: uploading ? 0.7 : 1,
                    pointerEvents: uploading ? "none" : "auto",
                  }}>
                  {uploading
                    ? <>
                        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                          style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
                        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>AI가 확인 중…</p>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>잠시만 기다려주세요</p>
                      </>
                    : <>
                        <Upload className="w-8 h-8" style={{ color: "var(--mint)" }} />
                        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{w.captureLabel}</p>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>{w.captureDesc}</p>
                      </>
                  }
                </label>
                <input id="screenshot-upload" type="file" accept="image/*" className="hidden"
                  onChange={handleFileUpload} disabled={uploading} />
                {uploadErr && (
                  <p className="text-xs mt-2 px-1 text-center" style={{ color: "#ef4444" }}>{uploadErr}</p>
                )}
                <button onClick={() => setVerifyMode("none")} className="w-full mt-2 py-2 text-xs"
                  style={{ color: "var(--muted)" }} disabled={uploading}>
                  {w.goBack}
                </button>
              </div>
            )}

            {verifyMode === "upload" && uploadDone && (
              <div className="mb-4 flex flex-col items-center gap-3 py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,229,160,0.15)" }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{w.uploadDone}</p>
                <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
                  {w.uploadDoneDesc}
                </p>
                <button onClick={() => setShowVerify(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold text-black"
                  style={{ background: "var(--mint)" }}>
                  {w.writePost}
                </button>
              </div>
            )}

            {verifyMode === "broker" && (
              <div className="flex flex-col gap-2 mb-4">
                {["Kiwoom", "Samsung", "Mirae Asset", "NH Investment"].map((broker) => (
                  <button key={broker} onClick={() => setVerifyMode("broker-notice")}
                    className="w-full py-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between px-4 active:opacity-70 transition-opacity"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                    {broker}
                    <span className="text-xs" style={{ color: "var(--mint)" }}>{w.connect}</span>
                  </button>
                ))}
                <button onClick={() => setVerifyMode("none")} className="w-full mt-1 py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            {verifyMode === "broker-notice" && (
              <div className="mb-4">
                <div className="flex flex-col items-center gap-3 py-6 mb-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "rgba(0,229,160,0.10)" }}>🔧</div>
                  <p className="text-sm font-bold text-center" style={{ color: "var(--text)" }}>{w.brokerNoticeTitle}</p>
                  <p className="text-xs text-center leading-relaxed px-4" style={{ color: "var(--muted)" }}>
                    {w.brokerNoticeDesc}
                  </p>
                </div>
                <button onClick={() => setVerifyMode("upload")}
                  className="w-full py-3 rounded-2xl text-sm font-bold text-black mb-2 active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)" }}>
                  {w.switchToCapture}
                </button>
                <button onClick={() => setVerifyMode("broker")} className="w-full py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            <p className="text-[10px] text-center" style={{ color: "var(--muted)" }}>
              {w.verifyNotice}
            </p>
          </div>
        </div>
      )}

      {/* Analyst application modal */}
      {showAnalystApply && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => applyStep !== "verifying" && setShowAnalystApply(false)}>
          <div className="w-full max-w-[380px] rounded-3xl p-6"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.2)" }}>
                <EyeOff className="w-5 h-5" style={{ color: "#a78bfa" }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>애널들은 채널 인증</p>
                <p className="text-[10px]" style={{ color: "var(--muted)" }}>이미지는 AI 인증 후 즉시 폐기 · 완전 익명 보장</p>
              </div>
              {applyStep !== "verifying" && (
                <button onClick={() => setShowAnalystApply(false)} className="ml-auto p-1">
                  <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
                </button>
              )}
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-5">
              {(["card", "id"] as const).map((step, i) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0`}
                    style={{
                      background: applyStep === step || (applyStep === "verifying" && i === 1) || (applyStep === "id" && i === 0)
                        ? "#7c3aed" : "var(--border)",
                      color: applyStep === step || (applyStep === "id" && i === 0) ? "#fff" : "var(--muted)",
                    }}>
                    {i + 1}
                  </div>
                  <span className="text-[10px]" style={{ color: applyStep === step ? "#a78bfa" : "var(--muted)" }}>
                    {step === "card" ? "명함 촬영" : "신분증 촬영"}
                  </span>
                  {i === 0 && <div className="flex-1 h-px" style={{ background: "var(--border)" }} />}
                </div>
              ))}
            </div>

            {applyStep === "verifying" ? (
              <div className="flex flex-col items-center gap-4 py-8">
                <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "#7c3aed", borderTopColor: "transparent" }} />
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>AI가 인증 중…</p>
                <p className="text-xs text-center" style={{ color: "var(--muted)" }}>이름 일치 및 문서 진위를 확인하고 있습니다</p>
              </div>
            ) : applyStep === "card" ? (
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>① 명함 사진 업로드</p>
                <p className="text-[11px] mb-4" style={{ color: "var(--muted)" }}>
                  이름과 소속이 보이는 명함 앞면을 찍어 올려주세요.<br />
                  사진은 인증 즉시 삭제되며 저장되지 않습니다.
                </p>
                <label htmlFor="card-upload"
                  className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer"
                  style={{ borderColor: "rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.04)" }}>
                  <Upload className="w-8 h-8" style={{ color: "#a78bfa" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>명함 사진 선택</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>JPG, PNG (최대 5MB)</p>
                </label>
                <input id="card-upload" type="file" accept="image/*" className="hidden" onChange={handleCardUpload} />
                {applyErr && <p className="text-xs mt-3 text-center" style={{ color: "#f87171" }}>{applyErr}</p>}
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--text)" }}>② 신분증 / 사원증 사진 업로드</p>
                <p className="text-[11px] mb-4" style={{ color: "var(--muted)" }}>
                  이름과 사진이 포함된 신분증 또는 사원증을 찍어 올려주세요.<br />
                  주민번호 뒷자리 등 민감 정보는 가려도 됩니다.
                </p>
                <label htmlFor="id-upload"
                  className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer"
                  style={{ borderColor: "rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.04)" }}>
                  <Upload className="w-8 h-8" style={{ color: "#a78bfa" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>신분증 사진 선택</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>업로드 즉시 AI 인증 시작</p>
                </label>
                <input id="id-upload" type="file" accept="image/*" className="hidden" onChange={handleIdUpload} />
                <button onClick={() => setApplyStep("card")} className="w-full mt-3 py-2 text-xs"
                  style={{ color: "var(--muted)" }}>← 명함 다시 올리기</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
