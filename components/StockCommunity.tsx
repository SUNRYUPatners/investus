"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, PenLine, ChevronRight } from "lucide-react";
import { MOCK_ANALYST_POSTS } from "@/lib/analystPosts";
import { MOCK_POSTS, type Post } from "@/lib/wallPosts";
import { useAuth } from "@/hooks/useAuth";
import { usePortfolio } from "@/hooks/usePortfolio";
import { getSupabase } from "@/lib/supabase";

type RealWallPost = {
  id: number;
  symbol: string;
  is_mine: boolean;
  nickname: string;
  holding_label: string;
  content: string;
  likes: number;
  comments: number;
  created_at: string;
};

type AnalystRow = {
  id: number;
  alias: string;
  content: string;
  symbol: string | null;
  likes: number;
  comments: number;
  created_at: string;
};

async function authHeaders(): Promise<HeadersInit> {
  try {
    const { data: { session } } = await getSupabase().auth.getSession();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;
    return headers;
  } catch {
    return { "Content-Type": "application/json" };
  }
}

/** 실제 created_at 기준 경과 시간 (분/시간/일 전) */
function relativeTime(ts: number): string {
  if (!Number.isFinite(ts)) return "—";
  const diff = Date.now() - ts;
  if (diff < 0) return "방금";
  const secs = Math.floor(diff / 1000);
  if (secs < 60) return "방금";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
}

function SectionHeader({
  title,
  href,
  linkLabel,
}: {
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2
        className="text-xs font-semibold tracking-widest uppercase font-syne"
        style={{ color: "var(--muted)" }}
      >
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex items-center gap-0.5 text-[11px] no-underline"
        style={{ color: "var(--mint)" }}
      >
        {linkLabel} <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

export function StockCommunity({ symbol, className = "" }: { symbol: string; className?: string }) {
  const upper = symbol.toUpperCase();
  const { user } = useAuth();
  const { holdings } = usePortfolio();

  const [realPosts, setRealPosts] = useState<RealWallPost[]>([]);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [showComposer, setShowComposer] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/wall-posts?symbol=${upper}`)
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && Array.isArray(d)) setRealPosts(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [upper]);

  const analystPosts: AnalystRow[] = useMemo(() => {
    return MOCK_ANALYST_POSTS
      .filter((p) => p.symbol?.toUpperCase() === upper)
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        alias: p.alias,
        content: p.content,
        symbol: p.symbol,
        likes: p.likes,
        comments: p.comments,
        created_at: p.created_at,
      }));
  }, [upper]);

  const wallPosts: Post[] = useMemo(() => {
    const realAsPost: Post[] = realPosts.map((r) => ({
      id: r.id + 100000,
      symbol: r.symbol,
      nickname: r.nickname,
      holdingLabel: r.holding_label,
      content: r.content,
      createdAt: new Date(r.created_at).getTime(),
      likes: r.likes,
      comments: r.comments,
    }));
    return [...realAsPost, ...MOCK_POSTS.filter((p) => p.symbol === upper)]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 8);
  }, [upper, realPosts]);

  const submitPost = async () => {
    if (!user) return;
    const content = draft.trim();
    if (content.length < 5) {
      setSubmitErr("5자 이상 작성해주세요.");
      return;
    }
    if (content.length > 300) {
      setSubmitErr("300자 이내로 작성해주세요.");
      return;
    }
    setSubmitting(true);
    setSubmitErr("");
    const holding = holdings.find((h) => h.symbol === upper);
    const holdingLabel = holding ? `${holding.shares}주 보유` : "회원";
    try {
      const res = await fetch("/api/wall-posts", {
        method: "POST",
        headers: await authHeaders(),
        body: JSON.stringify({ symbol: upper, content, holdingLabel }),
      });
      const data = (await res.json()) as { id?: number; nickname?: string; error?: string };
      if (!res.ok || data.error) {
        setSubmitErr(data.error ?? "게시 실패. 다시 시도해주세요.");
        return;
      }
      if (data.id) {
        setRealPosts((prev) => [
          {
            id: data.id!,
            symbol: upper,
            is_mine: true,
            nickname: data.nickname ?? "익명",
            holding_label: holdingLabel,
            content,
            likes: 0,
            comments: 0,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
      setDraft("");
      setShowComposer(false);
    } catch {
      setSubmitErr("네트워크 오류. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const wallHref = `/wall?symbol=${upper}&tab=discussion`;
  const analystHref = `/wall?symbol=${upper}&tab=analyst`;

  return (
    <div className={`flex flex-col gap-5 ${className}`}>
      {/* 애널리스트 */}
      <section>
        <SectionHeader title={`${upper} 애널리스트`} href={analystHref} linkLabel="전체 보기" />
        {analystPosts.length === 0 ? (
          <p className="text-xs py-4 text-center" style={{ color: "var(--muted)" }}>
            아직 이 종목 애널 글이 없습니다.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {analystPosts.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl p-3.5 border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                    {p.alias}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-mono-num"
                    style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}
                  >
                    {upper}
                  </span>
                  <span className="text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
                    {relativeTime(new Date(p.created_at).getTime())}
                  </span>
                </div>
                <p
                  className="text-[12px] leading-relaxed whitespace-pre-wrap line-clamp-4"
                  style={{ color: "var(--text)" }}
                >
                  {p.content}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color: "var(--muted)" }}>
                  <span>♥ {p.likes.toLocaleString()}</span>
                  <span className="inline-flex items-center gap-0.5">
                    <MessageCircle className="w-3 h-3" /> {p.comments}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 종목토론 */}
      <section>
        <SectionHeader title={`${upper} 종목토론`} href={wallHref} linkLabel="전체 보기" />

        {!showComposer ? (
          <button
            type="button"
            onClick={() => {
              if (!user) {
                window.location.href = `/wall?symbol=${upper}&tab=discussion`;
                return;
              }
              setShowComposer(true);
            }}
            className="w-full flex items-center justify-center gap-1.5 text-xs py-2.5 mb-3 rounded-xl border"
            style={{
              color: "var(--mint)",
              borderColor: "rgba(0,229,160,0.35)",
              background: "rgba(0,229,160,0.06)",
            }}
          >
            <PenLine className="w-3.5 h-3.5" />
            {user ? `${upper}에 의견 쓰기` : "로그인하고 의견 쓰기"}
          </button>
        ) : (
          <div
            className="rounded-2xl border p-3 mb-3"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              maxLength={300}
              placeholder={`${upper} 종목에 대한 의견을 자유롭게 나눠보세요. (5~300자)`}
              className="w-full bg-transparent text-sm outline-none resize-none"
              style={{ color: "var(--text)" }}
            />
            {submitErr && (
              <p className="text-[11px] mb-2" style={{ color: "var(--down)" }}>
                {submitErr}
              </p>
            )}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                {draft.trim().length}/300
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowComposer(false);
                    setDraft("");
                    setSubmitErr("");
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ color: "var(--muted)" }}
                >
                  취소
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submitPost}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--mint)", color: "#000", opacity: submitting ? 0.6 : 1 }}
                >
                  {submitting ? "게시 중…" : "게시"}
                </button>
              </div>
            </div>
          </div>
        )}

        {wallPosts.length === 0 ? (
          <p className="text-xs py-4 text-center" style={{ color: "var(--muted)" }}>
            아직 토론글이 없습니다. 첫 의견을 남겨보세요.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {wallPosts.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl p-3.5 border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "var(--border)", color: "var(--muted)" }}
                  >
                    익
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                    {p.nickname}
                  </span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}
                  >
                    ✓ {p.holdingLabel}
                  </span>
                  <span className="text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
                    {relativeTime(p.createdAt)}
                  </span>
                </div>
                <p
                  className="text-[12px] leading-relaxed whitespace-pre-wrap line-clamp-4"
                  style={{ color: "var(--text)" }}
                >
                  {p.content}
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px]" style={{ color: "var(--muted)" }}>
                  <span>♥ {p.likes.toLocaleString()}</span>
                  <span className="inline-flex items-center gap-0.5">
                    <MessageCircle className="w-3 h-3" /> {p.comments}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
