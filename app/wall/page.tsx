"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Lock, ShieldCheck, Upload, User, Sparkles, Users, TrendingUp, Send, X, ChevronDown } from "lucide-react";
import { Header } from "@/components/Header";
import { CreatorCard } from "@/components/CreatorCard";
import { AdBanner } from "@/components/AdBanner";
import { useAuth } from "@/hooks/useAuth";
import { CREATORS } from "@/lib/creators";
import { MOCK_POSTS, MOCK_COMMENTS, type Post, type Comment } from "@/lib/wallPosts";

// ── 서학개미 인기 종목 ────────────────────────────────────────────────────────
const STOCKS = [
  "NVDA", "TSLA", "AAPL", "PLTR", "MSFT", "META",
  "AMZN", "GOOGL", "AMD", "AVGO", "COIN", "SMCI",
  "RKLB", "IONQ", "CEG",
];

const STOCK_KR: Record<string, string> = {
  NVDA: "엔비디아", TSLA: "테슬라", AAPL: "애플", PLTR: "팔란티어",
  MSFT: "마이크로소프트", META: "메타", AMZN: "아마존", GOOGL: "구글",
  AMD: "AMD", AVGO: "브로드컴", COIN: "코인베이스", SMCI: "슈퍼마이크로",
  RKLB: "로켓랩", IONQ: "아이온큐", CEG: "컨스텔레이션",
};


// ── Comment Modal ─────────────────────────────────────────────────────────────
function CommentModal({ post, onClose }: { post: Post; onClose: () => void }) {
  const { user } = useAuth();
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalComments(MOCK_COMMENTS[post.id] ?? []);
  }, [post.id]);

  const submitComment = () => {
    if (!input.trim() || !user) return;
    const newComment: Comment = {
      id: Date.now(),
      nickname: user.nickname,
      holdingLabel: "보유 인증",
      content: input.trim(),
      time: "방금 전",
      likes: 0,
    };
    setLocalComments((prev) => [newComment, ...prev]);
    setInput("");
  };

  const toggleLike = (id: number) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-3xl flex flex-col"
        style={{ background: "var(--card)", maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
              {post.symbol}
            </span>
            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>댓글 {localComments.length}</span>
          </div>
          <button onClick={onClose} className="p-1">
            <X className="w-4 h-4" style={{ color: "var(--muted)" }} />
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
          {localComments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <span className="text-3xl">💬</span>
              <p className="text-sm" style={{ color: "var(--muted)" }}>첫 댓글을 남겨보세요</p>
            </div>
          ) : (
            localComments.map((c) => (
              <div key={c.id} className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ background: "var(--border)", color: "var(--muted)" }}>익</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{c.nickname}</span>
                    <span className="text-[9px] px-1 py-0.5 rounded-full" style={{ background: "rgba(0,229,160,0.08)", color: "var(--mint)" }}>✓ {c.holdingLabel}</span>
                    <span className="text-[9px] ml-auto" style={{ color: "var(--muted)" }}>{c.time}</span>
                  </div>
                  <p className="text-[12px] leading-relaxed mb-1.5" style={{ color: "var(--text)" }}>{c.content}</p>
                  <button
                    onClick={() => toggleLike(c.id)}
                    className="flex items-center gap-1 text-[10px]"
                    style={{ color: likedComments.has(c.id) ? "var(--mint)" : "var(--muted)" }}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {c.likes + (likedComments.has(c.id) ? 1 : 0)}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 pb-safe flex-shrink-0 border-t" style={{ borderColor: "var(--border)" }}>
          {user ? (
            <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitComment()}
                placeholder="댓글을 입력하세요..."
                maxLength={200}
                className="flex-1 text-[13px] bg-transparent outline-none"
                style={{ color: "var(--text)" }}
              />
              <button
                onClick={submitComment}
                disabled={!input.trim()}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-30"
                style={{ background: "var(--mint)" }}
              >
                <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-1">
              <p className="flex-1 text-xs" style={{ color: "var(--muted)" }}>댓글을 작성하려면 로그인이 필요합니다</p>
              <Link href="/more" onClick={onClose} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: "var(--mint)", color: "#000" }}>
                로그인
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

function AskAI({ symbol }: { symbol: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [count, setCount]       = useState(0);
  const inputRef                = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(getTodayKey());
      setCount(stored ? parseInt(stored, 10) : 0);
    } catch {}
  }, []);

  const limitReached = count >= DAILY_LIMIT;
  const remaining    = DAILY_LIMIT - count;

  const CHIPS = [
    `${symbol} 지금 매수해도 될까?`,
    "오늘 하락장 이유 뭐야?",
    `${symbol} 목표주가는?`,
    "내 포트폴리오 비중 조언해줘",
  ];

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
      setAnswer(data.answer ?? "응답을 가져올 수 없습니다.");
      const newCount = count + 1;
      setCount(newCount);
      try { localStorage.setItem(getTodayKey(), String(newCount)); } catch {}
    } catch {
      setAnswer("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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
              Investus AI에게 {symbol} 질문하기
            </p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
              style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>Claude</span>
          </div>
        </div>
        <div className="px-4 py-6 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "rgba(0,229,160,0.08)" }}>⏰</div>
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>오늘 질문 횟수를 다 사용했습니다</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>하루 5회 무료 · 내일 자정에 초기화됩니다</p>
          <div className="w-full rounded-2xl p-4 border mt-1"
            style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
            <p className="text-xs font-bold mb-1" style={{ color: "var(--mint)" }}>✦ 무제한으로 사용하려면 구독하세요</p>
            <p className="text-[11px] mb-3" style={{ color: "var(--muted)" }}>월 ₩4,900으로 AI 질문 무제한 + 프리미엄 기능</p>
            <button className="w-full py-2.5 rounded-xl text-sm font-bold text-black" style={{ background: "var(--mint)" }}>
              구독하기 ₩4,900/월
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
            Investus AI에게 {symbol} 질문하기
          </p>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
            style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)" }}>Claude</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>종목 분석 · 시장 뉴스 · 포트폴리오 조언</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>오늘 {remaining}회 남음</p>
        </div>
      </div>

      <div className="flex gap-2 px-4 pt-3 pb-2 overflow-x-auto no-scrollbar">
        {CHIPS.map((chip) => (
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
          placeholder={`예) ${symbol} 실적 어떻게 돼?`}
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
              <p className="text-[9px] mt-1 pl-1" style={{ color: "var(--muted)" }}>AI 답변은 참고용이며 투자 권유가 아닙니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

type VerifyMode  = "none" | "upload" | "broker" | "broker-notice";
type MainTab     = "discussion" | "creator";
type CreatorSort = "popular" | "return" | "subscribers" | "newest";

export default function WallPage() {
  const { user } = useAuth();
  const [mainTab, setMainTab]             = useState<MainTab>("discussion");
  const [selected, setSelected]           = useState("NVDA");
  const [liked, setLiked]                 = useState<Set<number>>(new Set());
  const [showVerify, setShowVerify]       = useState(false);
  const [verifyMode, setVerifyMode]       = useState<VerifyMode>("none");
  const [uploadDone, setUploadDone]       = useState(false);
  const [hasCreatorProfile, setHasCreatorProfile] = useState(false);
  const [commentPost, setCommentPost]     = useState<Post | null>(null);
  const [creatorSort, setCreatorSort]     = useState<CreatorSort>("popular");

  useEffect(() => {
    try {
      const c = localStorage.getItem("investus_my_creator");
      setHasCreatorProfile(!!c);
    } catch {}
  }, []);

  const posts = MOCK_POSTS.filter((p) => p.symbol === selected);

  const sortedCreators = [...CREATORS].sort((a, b) => {
    if (creatorSort === "return")      return b.annualReturn - a.annualReturn;
    if (creatorSort === "subscribers") return b.subscriberCount - a.subscriberCount;
    if (creatorSort === "newest")      return b.inceptionDate.localeCompare(a.inceptionDate);
    // popular: sort by total engagement (subscriberCount weight + content views)
    const scoreA = a.subscriberCount * 10 + a.contents.reduce((s, c) => s + c.viewCount, 0) / 100;
    const scoreB = b.subscriberCount * 10 + b.contents.reduce((s, c) => s + c.viewCount, 0) / 100;
    return scoreB - scoreA;
  });

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleWriteClick = () => {
    if (!user) return;
    setVerifyMode("none");
    setUploadDone(false);
    setShowVerify(true);
  };

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-7xl mx-auto pb-24 lg:pb-10">
        {/* Page title */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div>
            <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>종토방 💬</h1>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>종목 토론 · AI 분석 · 크리에이터 강의</p>
          </div>
          {mainTab === "creator" && (
            hasCreatorProfile ? (
              <Link href="/creator/dashboard"
                className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                style={{ background: "var(--mint)", color: "#000" }}>
                ✦ 내 채널 관리
              </Link>
            ) : (
              <Link href="/creator/setup"
                className="text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                style={{ background: "var(--mint)", color: "#000" }}>
                <Sparkles className="w-3.5 h-3.5" />크리에이터 되기
              </Link>
            )
          )}
          {mainTab === "discussion" && (
            <div className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border"
              style={{ borderColor: "rgba(0,229,160,0.3)", color: "var(--mint)" }}>
              <Lock className="w-3 h-3" />
              익명 · 보유 인증
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
            <MessageCircle className="w-3.5 h-3.5" />종목 토론
          </button>
          <button onClick={() => setMainTab("creator")}
            className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            style={mainTab === "creator"
              ? { background: "var(--mint)", color: "#000" }
              : { color: "var(--muted)" }}>
            <Users className="w-3.5 h-3.5" />크리에이터
          </button>
        </div>

        {/* ── DISCUSSION TAB ── */}
        {mainTab === "discussion" && (
          <>
            <div className="flex items-start gap-2 rounded-xl p-3 mx-4 mb-3 border"
              style={{ background: "rgba(0,229,160,0.05)", borderColor: "rgba(0,229,160,0.15)" }}>
              <ShieldCheck className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                실제 보유 종목만 토론 참여 가능합니다. 캡쳐 업로드 또는 증권사 연동으로 보유 수량을 인증하면 댓글을 작성할 수 있어요.
              </p>
            </div>

            {/* Stock selector */}
            <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
              {STOCKS.map((sym) => (
                <button key={sym} onClick={() => setSelected(sym)}
                  className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl border transition-all"
                  style={selected === sym
                    ? { background: "var(--mint)", borderColor: "var(--mint)" }
                    : { background: "var(--card)", borderColor: "var(--border)" }}>
                  <span className="text-xs font-bold font-mono-num leading-none"
                    style={{ color: selected === sym ? "#000" : "var(--text)" }}>
                    {sym}
                  </span>
                  <span className="text-[9px] leading-none"
                    style={{ color: selected === sym ? "rgba(0,0,0,0.6)" : "var(--muted)" }}>
                    {STOCK_KR[sym]}
                  </span>
                </button>
              ))}
            </div>

            <div className="px-4 mb-2">
              <AskAI symbol={selected} />
            </div>

            <div className="px-4">
              <AdBanner format="auto" />

              {/* Posts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
                {posts.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
                    <span className="text-4xl">💬</span>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>아직 게시글이 없습니다</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>첫 번째 의견을 남겨보세요</p>
                  </div>
                ) : (
                  posts.map((post) => (
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
                        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{post.time}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed mb-3" style={{ color: "var(--text)" }}>{post.content}</p>
                      <div className="flex items-center gap-4">
                        <button onClick={() => toggleLike(post.id)}
                          className="flex items-center gap-1.5 text-xs transition-colors"
                          style={{ color: liked.has(post.id) ? "var(--mint)" : "var(--muted)" }}>
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes + (liked.has(post.id) ? 1 : 0)}
                        </button>
                        <button
                          onClick={() => setCommentPost(post)}
                          className="flex items-center gap-1.5 text-xs active:opacity-60 transition-opacity"
                          style={{ color: "var(--muted)" }}>
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments}
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            {/* Write / Login prompt */}
            {user ? (
              <div className="fixed bottom-20 right-4">
                <button onClick={handleWriteClick}
                  className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-black font-bold text-2xl"
                  style={{ background: "var(--mint)", boxShadow: "0 4px 20px rgba(0,229,160,0.4)" }}>
                  ✏️
                </button>
              </div>
            ) : (
              <div className="fixed bottom-20 lg:bottom-6 left-0 right-0 px-4 max-w-[480px] lg:max-w-7xl mx-auto">
                <div className="rounded-2xl p-4 border flex items-center gap-3"
                  style={{ background: "var(--card)", borderColor: "rgba(0,229,160,0.2)" }}>
                  <User className="w-5 h-5 flex-shrink-0" style={{ color: "var(--mint)" }} />
                  <p className="flex-1 text-xs" style={{ color: "var(--muted)" }}>글을 작성하려면 로그인이 필요합니다</p>
                  <Link href="/more" className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                    style={{ background: "var(--mint)", color: "#000" }}>
                    로그인
                  </Link>
                </div>
              </div>
            )}
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
                    <p className="text-sm font-bold font-syne mb-0.5" style={{ color: "var(--text)" }}>내 크리에이터 채널</p>
                    <p className="text-[11px]" style={{ color: "var(--muted)" }}>콘텐츠 작성 · 프로필 수정 · 인증 관리</p>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: "var(--mint)" }}>관리 →</span>
                </Link>
              ) : (
                <div className="rounded-2xl p-4 border"
                  style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.1) 0%, rgba(0,229,160,0.03) 100%)", borderColor: "rgba(0,229,160,0.2)" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <h2 className="text-sm font-bold font-syne mb-1" style={{ color: "var(--text)" }}>크리에이터 마켓</h2>
                      <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
                        실제 계좌 수익률을 공개하고 포트폴리오·강의·전자책으로 구독료를 받으세요.
                      </p>
                      <Link href="/creator/setup"
                        className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl"
                        style={{ background: "var(--mint)", color: "#000" }}>
                        <Sparkles className="w-3.5 h-3.5" />나도 크리에이터 되기
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 mt-5 lg:mt-0">
                {[
                  { icon: "📊", title: "계좌 연동", desc: "증권사 연동으로 실제 수익률 인증" },
                  { icon: "💡", title: "콘텐츠 판매", desc: "강의·전자책·리포트 업로드" },
                  { icon: "💰", title: "수익 정산", desc: "구독 수익 매월 정산" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl p-3 text-center border"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="text-[10px] font-bold mb-0.5" style={{ color: "var(--text)" }}>{item.title}</div>
                    <div className="text-[9px] leading-tight" style={{ color: "var(--muted)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <AdBanner format="auto" />

            {/* ── 시상대 포디움 ── */}
            <div
              className="rounded-2xl border overflow-hidden mt-5 mb-4"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <p
                className="text-[10px] text-center font-semibold tracking-widest uppercase pt-4 pb-3"
                style={{ color: "var(--muted)" }}
              >
                이달의 크리에이터 시상대
              </p>
              <div className="flex items-end justify-center gap-2 px-5">
                {/* 2위 — 은 */}
                <div className="flex flex-col items-center flex-1">
                  <span className="text-2xl mb-1">🥈</span>
                  <p
                    className="text-[9px] font-bold text-center leading-tight mb-0.5 px-0.5 break-words w-full"
                    style={{ color: "var(--text)" }}
                  >
                    {CREATORS[1].nickname}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-1.5">
                    <TrendingUp className="w-2.5 h-2.5" style={{ color: "var(--mint)" }} />
                    <span className="text-[8px] font-mono-num font-bold" style={{ color: "var(--mint)" }}>+{CREATORS[1].annualReturn}%</span>
                    <span className="text-[7px]" style={{ color: "var(--muted)" }}>/</span>
                    <Users className="w-2.5 h-2.5" style={{ color: "#C0C0C0" }} />
                    <span className="text-[8px] font-mono-num" style={{ color: "#C0C0C0" }}>{CREATORS[1].subscriberCount.toLocaleString()}명</span>
                  </div>
                  <div
                    className="w-full rounded-t-xl flex items-center justify-center font-black text-base"
                    style={{
                      height: 58,
                      background: "rgba(192,192,192,0.10)",
                      borderTop: "2px solid rgba(192,192,192,0.4)",
                      color: "#C0C0C0",
                    }}
                  >
                    2
                  </div>
                </div>

                {/* 1위 — 금 */}
                <div className="flex flex-col items-center flex-1">
                  <span className="text-3xl mb-1">🥇</span>
                  <p
                    className="text-[10px] font-bold text-center leading-tight mb-0.5 px-0.5 break-words w-full"
                    style={{ color: "var(--text)" }}
                  >
                    {CREATORS[0].nickname}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-1.5">
                    <TrendingUp className="w-2.5 h-2.5" style={{ color: "var(--mint)" }} />
                    <span className="text-[8px] font-mono-num font-bold" style={{ color: "var(--mint)" }}>+{CREATORS[0].annualReturn}%</span>
                    <span className="text-[7px]" style={{ color: "var(--muted)" }}>/</span>
                    <Users className="w-2.5 h-2.5" style={{ color: "#FFD700" }} />
                    <span className="text-[8px] font-mono-num" style={{ color: "#FFD700" }}>{CREATORS[0].subscriberCount.toLocaleString()}명</span>
                  </div>
                  <div
                    className="w-full rounded-t-xl flex items-center justify-center font-black text-xl"
                    style={{
                      height: 84,
                      background: "rgba(255,215,0,0.10)",
                      borderTop: "2px solid rgba(255,215,0,0.5)",
                      color: "#FFD700",
                    }}
                  >
                    1
                  </div>
                </div>

                {/* 3위 — 동 */}
                <div className="flex flex-col items-center flex-1">
                  <span className="text-xl mb-1">🥉</span>
                  <p
                    className="text-[9px] font-bold text-center leading-tight mb-0.5 px-0.5 break-words w-full"
                    style={{ color: "var(--text)" }}
                  >
                    {CREATORS[2].nickname}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-1.5">
                    <TrendingUp className="w-2.5 h-2.5" style={{ color: "var(--mint)" }} />
                    <span className="text-[8px] font-mono-num font-bold" style={{ color: "var(--mint)" }}>+{CREATORS[2].annualReturn}%</span>
                    <span className="text-[7px]" style={{ color: "var(--muted)" }}>/</span>
                    <Users className="w-2.5 h-2.5" style={{ color: "#CD7F32" }} />
                    <span className="text-[8px] font-mono-num" style={{ color: "#CD7F32" }}>{CREATORS[2].subscriberCount.toLocaleString()}명</span>
                  </div>
                  <div
                    className="w-full rounded-t-xl flex items-center justify-center font-black text-base"
                    style={{
                      height: 42,
                      background: "rgba(205,127,50,0.10)",
                      borderTop: "2px solid rgba(205,127,50,0.4)",
                      color: "#CD7F32",
                    }}
                  >
                    3
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2 mt-2">
              <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>인기 크리에이터</h2>
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>{CREATORS.length}명 활동 중</span>
            </div>

            {/* 정렬 필터 */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto no-scrollbar pb-0.5">
              {(["popular", "return", "subscribers", "newest"] as const).map((key) => {
                const labels = { popular: "인기순", return: "수익률순", subscribers: "구독자순", newest: "최신등록순" };
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
      </main>

      {/* Comment Modal */}
      {commentPost && (
        <CommentModal post={commentPost} onClose={() => setCommentPost(null)} />
      )}

      {/* Verification modal */}
      {showVerify && user && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowVerify(false)}>
          <div className="w-full max-w-[480px] mx-auto rounded-t-3xl p-6 pb-10"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border)" }} />
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
              <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>보유 종목 인증</h2>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              종토방에 글을 작성하려면 해당 종목의 실제 보유를 인증해야 합니다.
            </p>

            {verifyMode === "none" && (
              <div className="flex gap-3 mb-4">
                <button onClick={() => setVerifyMode("upload")}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <Upload className="w-5 h-5" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-semibold">캡쳐 업로드</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>HTS/MTS 보유 화면</span>
                </button>
                <button onClick={() => setVerifyMode("broker")}
                  className="flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                  <ShieldCheck className="w-5 h-5" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-semibold">증권사 연동</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>자동 보유 확인</span>
                </button>
              </div>
            )}

            {verifyMode === "upload" && !uploadDone && (
              <div className="mb-4">
                <label htmlFor="screenshot-upload"
                  className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer"
                  style={{ borderColor: "rgba(0,229,160,0.4)", background: "rgba(0,229,160,0.04)" }}>
                  <Upload className="w-8 h-8" style={{ color: "var(--mint)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>캡쳐 이미지 업로드</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>HTS/MTS 보유 화면 캡쳐를 첨부해주세요</p>
                </label>
                <input id="screenshot-upload" type="file" accept="image/*" className="hidden" onChange={() => setUploadDone(true)} />
                <button onClick={() => setVerifyMode("none")} className="w-full mt-2 py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            {verifyMode === "upload" && uploadDone && (
              <div className="mb-4 flex flex-col items-center gap-3 py-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,229,160,0.15)" }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--text)" }}>업로드 완료!</p>
                <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
                  검토 후 글쓰기가 활성화됩니다. (데모: 즉시 활성화)
                </p>
                <button onClick={() => setShowVerify(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold text-black"
                  style={{ background: "var(--mint)" }}>
                  글 작성하기
                </button>
              </div>
            )}

            {verifyMode === "broker" && (
              <div className="flex flex-col gap-2 mb-4">
                {["키움증권", "삼성증권", "미래에셋증권", "NH투자증권"].map((broker) => (
                  <button key={broker} onClick={() => setVerifyMode("broker-notice")}
                    className="w-full py-3.5 rounded-2xl border text-sm font-semibold flex items-center justify-between px-4 active:opacity-70 transition-opacity"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}>
                    {broker}
                    <span className="text-xs" style={{ color: "var(--mint)" }}>연동하기 →</span>
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
                  <p className="text-sm font-bold text-center" style={{ color: "var(--text)" }}>증권사 직접 연동 준비 중</p>
                  <p className="text-xs text-center leading-relaxed px-4" style={{ color: "var(--muted)" }}>
                    현재 증권사 API 연동 기능을 준비하고 있습니다.{"\n"}
                    지금은 HTS/MTS 보유 화면 캡쳐 업로드로{"\n"}
                    대신 인증해 주세요.
                  </p>
                </div>
                <button onClick={() => setVerifyMode("upload")}
                  className="w-full py-3 rounded-2xl text-sm font-bold text-black mb-2 active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)" }}>
                  캡쳐 업로드로 인증하기
                </button>
                <button onClick={() => setVerifyMode("broker")} className="w-full py-2 text-xs" style={{ color: "var(--muted)" }}>
                  돌아가기
                </button>
              </div>
            )}

            <p className="text-[10px] text-center" style={{ color: "var(--muted)" }}>
              인증 정보는 보유 수량 확인 목적으로만 사용되며 저장되지 않습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
