"use client";

import { use, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, TrendingUp, ChevronLeft, Heart, Eye, PlayCircle, BookOpen, FileText, MessageSquare, Lock, X, CheckCircle2, Copy, CreditCard, BookMarked } from "lucide-react";
import { AdFitBanner } from "@/components/AdFitBanner";
import { Header } from "@/components/Header";
import { contentTypeLabel, type Creator, type CreatorContent, type ContentType } from "@/lib/creators";

const ACCOUNT = { bank: "카카오뱅크", number: "3333-22-2070396", holder: "류현우" };

const CONTENT_TABS: { key: ContentType | "all"; label: string }[] = [
  { key: "all",     label: "전체" },
  { key: "lecture", label: "강의" },
  { key: "book",    label: "전자책" },
  { key: "report",  label: "리포트" },
  { key: "post",    label: "게시글" },
];

const CONTENT_ICON: Record<ContentType, React.ReactNode> = {
  lecture: <PlayCircle  className="w-4 h-4" />,
  book:    <BookOpen    className="w-4 h-4" />,
  report:  <FileText   className="w-4 h-4" />,
  post:    <MessageSquare className="w-4 h-4" />,
};

function fmtDate(d: string) {
  return d.replace("-", "년 ").replace("-", "월 ") + "일";
}


function loadSubscribed(creatorId: string): boolean {
  try { return localStorage.getItem(`investus_subscribed_${creatorId}`) === "1"; } catch { return false; }
}
function saveSubscribed(creatorId: string, val: boolean) {
  try {
    if (val) localStorage.setItem(`investus_subscribed_${creatorId}`, "1");
    else localStorage.removeItem(`investus_subscribed_${creatorId}`);
  } catch {}
}

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = use(params);
  // Next.js may or may not URL-decode dynamic segments; normalise here
  const id = (() => { try { return decodeURIComponent(rawId); } catch { return rawId; } })();
  const router = useRouter();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [apiContents, setApiContents] = useState<CreatorContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentTab, setContentTab] = useState<ContentType | "all">("all");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return loadSubscribed(id);
  });
  const [showSubModal, setShowSubModal] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // 1. Try Supabase API (approved creators)
        const res = await fetch(`/api/creator/list?id=${encodeURIComponent(id)}`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const d = data[0];
          const mapped: Creator = {
            id: d.phone ?? id,
            nickname:      d.nickname ?? id,
            avatar:        d.avatar ?? "🦁",
            coverGradient: "linear-gradient(135deg,#0d0d0d,#1a1a2e)",
            bio:           d.bio ?? "",
            tags:          d.tags ?? [],
            isVerified:    true,
            accountBroker: d.broker ?? "",
            inceptionDate: (d.submitted_at ?? "2025-01-01").slice(0, 7),
            annualReturn:  d.annual_return ?? 0,
            totalReturn:   d.annual_return ?? 0,
            followerCount: 0,
            subscriptionEnabled: d.subscription_enabled ?? false,
            subscriptionPrice: d.subscription_price ?? undefined,
            portfolio: (d.top_holdings ?? []).map((h: Record<string, unknown>) => ({
              symbol: String(h.symbol ?? ""),
              name: String(h.name ?? ""),
              allocation: Number(h.allocation ?? 0),
              avgReturn: Number(h.returnPct ?? h.avgReturn ?? 0),
            })),
            contents: [],
          };
          setCreator(mapped);
          // Fetch contents from Supabase Storage
          const cRes = await fetch(`/api/creator/contents?id=${encodeURIComponent(id)}`);
          const cData = await cRes.json();
          let merged: CreatorContent[] = Array.isArray(cData) ? cData : [];
          // Merge localStorage contents for own profile (dashboard saves locally)
          try {
            const myRaw = localStorage.getItem("investus_my_creator");
            const my = myRaw ? JSON.parse(myRaw) as { id?: string; email?: string } : null;
            if (my && (my.id === id || my.email === id ||
                my.id?.toLowerCase() === id.toLowerCase())) {
              const local = JSON.parse(localStorage.getItem("investus_creator_contents") ?? "[]") as CreatorContent[];
              if (Array.isArray(local) && local.length > 0) {
                const existing = new Set(merged.map((c) => c.id));
                merged = [...merged, ...local.filter((c) => !existing.has(c.id))];
              }
            }
          } catch { /* ignore */ }
          setApiContents(merged);
        } else {
          // 2. Fallback: check localStorage (own profile)
          try {
            const raw = localStorage.getItem("investus_my_creator");
            if (raw) {
              const p = JSON.parse(raw);
              // Match by stored id, stored email, or case-insensitive comparison
              const idLower = id.toLowerCase();
              const match = p && (
                p.id === id || p.email === id ||
                (p.id && p.id.toLowerCase() === idLower) ||
                (p.email && p.email.toLowerCase() === idLower)
              );
              if (match) {
                setCreator({ ...p, contents: [] });
                const cRaw = localStorage.getItem("investus_creator_contents");
                setApiContents(cRaw ? JSON.parse(cRaw) : []);
              }
            }
          } catch { /* ignore */ }
        }
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (!creator) {
    const hasLocalCreator = typeof window !== "undefined" && !!localStorage.getItem("investus_my_creator");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <span className="text-4xl">🔍</span>
        <p className="text-sm" style={{ color: "var(--muted)" }}>투자클럽을 찾을 수 없습니다</p>
        {hasLocalCreator && (
          <Link href="/creator/dashboard"
            className="text-xs px-4 py-2 rounded-xl font-bold"
            style={{ background: "rgba(0,229,160,0.15)", color: "var(--mint)", border: "1px solid rgba(0,229,160,0.3)" }}>
            내 투자클럽 대시보드로 →
          </Link>
        )}
        <button onClick={() => router.back()} className="text-xs px-4 py-2 rounded-xl" style={{ background: "var(--mint)", color: "#000" }}>
          돌아가기
        </button>
      </div>
    );
  }

  const allContents = [...(creator.contents ?? []), ...apiContents];
  const years = Math.floor((Date.now() - new Date(creator.inceptionDate + "-01").getTime()) / (365.25 * 24 * 3600 * 1000));
  const filteredContents = contentTab === "all"
    ? allContents
    : allContents.filter((c) => c.type === contentTab);

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-3xl mx-auto pb-28 lg:pb-10">
        {/* Back button */}
        <div className="px-4 pt-4 pb-2">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />
            투자클럽
          </button>
        </div>

        {/* Hero card */}
        <div className="mx-4 rounded-3xl border overflow-hidden mb-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Cover gradient */}
          <div className="h-24 relative" style={{ background: creator.coverGradient || "var(--bg)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, var(--card))" }} />
            <div className="absolute -bottom-6 left-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                {creator.avatar}
              </div>
            </div>
          </div>

          <div className="pt-10 px-5 pb-5">
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-bold font-syne" style={{ color: "var(--text)" }}>{creator.nickname}</h1>
                  {creator.isVerified && (
                    <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
                      <ShieldCheck className="w-3 h-3" />인증
                    </span>
                  )}
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
                  {creator.accountBroker} 계좌 인증 · {creator.inceptionDate.replace("-", "년 ")}월~ ({years}년+)
                </p>
              </div>
            </div>

            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>{creator.bio}</p>

            <div className="flex gap-1.5 mb-4 flex-wrap">
              {creator.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{t}</span>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-2xl"
              style={{ background: "var(--bg)" }}>
              <div className="text-center">
                <div className="text-lg font-bold font-mono-num" style={{ color: "#ef4444" }}>+{creator.annualReturn}%</div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>연수익률</div>
              </div>
              <div className="text-center border-x" style={{ borderColor: "var(--border)" }}>
                <div className="text-lg font-bold font-mono-num" style={{ color: "#ef4444" }}>+{creator.totalReturn}%</div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>누적수익률</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold font-mono-num" style={{ color: "var(--text)" }}>
                  {creator.followerCount.toLocaleString()}
                </div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>팔로워</div>
              </div>
            </div>

            {/* Subscribe or free notice */}
            {creator.subscriptionEnabled ? (
              isSubscribed ? (
                <div className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 border"
                  style={{ borderColor: "rgba(0,229,160,0.25)", background: "rgba(0,229,160,0.05)" }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: "var(--mint)" }} />
                  <span className="text-xs font-bold" style={{ color: "var(--mint)" }}>구독 중 — 모든 콘텐츠 이용 가능</span>
                </div>
              ) : (
                <button onClick={() => setShowSubModal(true)}
                  className="w-full py-3 rounded-2xl text-sm font-bold text-black active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)" }}>
                  구독하기 ₩{creator.subscriptionPrice?.toLocaleString()}/월 →
                </button>
              )
            ) : (
              <div className="w-full py-3 rounded-2xl flex flex-col items-center gap-0.5 border"
                style={{ borderColor: "rgba(0,229,160,0.25)", background: "rgba(0,229,160,0.05)" }}>
                <span className="text-xs font-bold" style={{ color: "var(--mint)" }}>무료 콘텐츠 · 광고로 투자클럽을 지원합니다</span>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>모든 콘텐츠를 무료로 이용하실 수 있습니다</span>
              </div>
            )}
          </div>
        </div>

        {/* Portfolio section */}
        <div className="mx-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" style={{ color: "var(--mint)" }} />
            <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>공개 포트폴리오</h2>
            {creator.isVerified && (
              <span className="text-[10px] ml-auto" style={{ color: "var(--mint)" }}>
                <ShieldCheck className="w-3 h-3 inline mr-0.5" />계좌 인증됨
              </span>
            )}
          </div>

          <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            {[...creator.portfolio].sort((a, b) => b.allocation - a.allocation).map((h, i) => (
              <div key={h.symbol}
                className={`flex items-center gap-3 px-4 py-3 ${i < creator.portfolio.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "var(--border)" }}>
                {/* Rank */}
                <span className="text-[10px] font-mono-num w-4 flex-shrink-0" style={{ color: "var(--muted)" }}>
                  {i + 1}
                </span>
                {/* Symbol */}
                <span className="text-xs font-bold font-mono-num w-14 flex-shrink-0" style={{ color: "var(--text)" }}>
                  {h.symbol}
                </span>
                {/* Allocation bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>{h.name}</span>
                    <span className="text-[10px] font-mono-num" style={{ color: "var(--text)" }}>{h.allocation}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                    <div className="h-full rounded-full" style={{ width: `${h.allocation}%`, background: "var(--mint)", opacity: 0.7 }} />
                  </div>
                </div>
                {/* Return */}
                <span className="text-xs font-bold font-mono-num w-16 text-right flex-shrink-0"
                  style={{ color: h.avgReturn >= 0 ? "#ef4444" : "#10b981" }}>
                  {h.avgReturn >= 0 ? "+" : ""}{h.avgReturn}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contents section */}
        <div className="mx-4">
          <h2 className="text-sm font-bold font-syne mb-3" style={{ color: "var(--text)" }}>콘텐츠</h2>

          {/* Content type tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {CONTENT_TABS.map((tab) => (
              <button key={tab.key} onClick={() => setContentTab(tab.key)}
                className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
                style={contentTab === tab.key
                  ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                  : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content list */}
          <div className="flex flex-col gap-3">
            {filteredContents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                locked={!!(creator.subscriptionEnabled && content.isPremium && !isSubscribed)}
                onUnlock={() => setShowSubModal(true)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Subscribe modal */}
      {showSubModal && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowSubModal(false)}>
          <div className="w-full max-w-[480px] mx-auto rounded-t-3xl p-6 pb-10"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border)" }} />
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
                  {creator.nickname} 구독
                </h2>
                <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
                  프리미엄 콘텐츠 무제한 이용
                </p>
              </div>
              <button onClick={() => setShowSubModal(false)}>
                <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
              </button>
            </div>

            <div className="rounded-2xl p-4 mb-5 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: "var(--text)" }}>월 구독</span>
                <span className="text-xl font-bold font-mono-num" style={{ color: "var(--mint)" }}>
                  ₩{creator.subscriptionPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {["프리미엄 콘텐츠 전체 이용", "신규 콘텐츠 즉시 열람", "광고 없이 이용"].map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--mint)" }} />
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 결제 수단 — 계좌이체 활성 */}
            <div className="flex items-center gap-3 rounded-2xl border p-3 mb-2"
              style={{ background: "var(--bg)", borderColor: "var(--mint)" }}>
              <span className="text-lg">🏦</span>
              <div className="flex-1">
                <p className="text-xs font-bold" style={{ color: "var(--text)" }}>계좌이체</p>
                <p className="text-[10px]" style={{ color: "var(--muted)" }}>카카오뱅크 · 수수료 없음</p>
              </div>
              <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: "var(--mint)" }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--mint)" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-4 opacity-40 pointer-events-none select-none">
              {[
                { icon: <CreditCard className="w-4 h-4" />, label: "신용·체크카드" },
                { icon: <span className="text-sm font-black text-[#0064FF]">toss</span>, label: "토스페이" },
                { icon: <span className="text-base">💛</span>, label: "카카오페이" },
                { icon: <span className="text-sm font-black text-[#03C75A]">N</span>, label: "네이버페이" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 py-2 px-3 rounded-xl border relative"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  {icon}
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</span>
                  <span className="absolute top-1 right-1 text-[7px] px-1 py-0.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>준비중</span>
                </div>
              ))}
            </div>

            {/* 계좌 정보 */}
            <div className="rounded-xl border p-3 mb-4" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              {[
                { label: "은행", value: ACCOUNT.bank },
                { label: "예금주", value: ACCOUNT.holder },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-1 border-b" style={{ borderColor: "var(--border)" }}>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</span>
                  <span className="text-[10px] font-medium" style={{ color: "var(--text)" }}>{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-1">
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>계좌번호</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold font-mono" style={{ color: "var(--text)" }}>{ACCOUNT.number}</span>
                  <button onClick={() => navigator.clipboard.writeText(ACCOUNT.number)}
                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px]"
                    style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}>
                    <Copy className="w-2.5 h-2.5" />복사
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSubscribed(true);
                saveSubscribed(id, true);
                setShowSubModal(false);
              }}
              className="w-full py-4 rounded-2xl text-sm font-bold text-black active:opacity-80 transition-opacity mb-3"
              style={{ background: "var(--mint)" }}>
              입금 완료 — 구독 시작하기 →
            </button>
            <p className="text-[10px] text-center leading-relaxed" style={{ color: "var(--muted)" }}>
              입금자명에 닉네임을 입력해주세요 · 확인 후 구독이 활성화됩니다
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function EbookReaderModal({ content, onClose }: { content: CreatorContent; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const pageCache = useRef<Map<number, string>>(new Map());
  const paragraphs = (content.body ?? "").split(/\n+/).filter(Boolean);
  const hasPdf = !!content.pdfPath;

  const goNext = useCallback(() => setPage(p => Math.min(totalPages || 1, p + 1)), [totalPages]);
  const goPrev = useCallback(() => setPage(p => Math.max(1, p - 1)), []);

  // Core fetch — returns cached blob URL or fetches fresh
  const fetchPage = useCallback(async (p: number): Promise<string> => {
    const cached = pageCache.current.get(p);
    if (cached) return cached;
    const r = await fetch(
      `/api/creator/pdf-page?path=${encodeURIComponent(content.pdfPath!)}&page=${p}`
    );
    if (!r.ok) throw new Error(`${r.status}`);
    const tp = r.headers.get("X-Total-Pages");
    if (tp) setTotalPages(parseInt(tp, 10));
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    pageCache.current.set(p, url);
    return url;
  }, [content.pdfPath]);

  // Load current page
  useEffect(() => {
    if (!hasPdf || !content.pdfPath) return;

    let cancelled = false;
    (async () => {
      const cached = pageCache.current.get(page);
      if (cached) {
        if (!cancelled) { setImgSrc(cached); setLoading(false); setError(false); }
      } else {
        if (!cancelled) { setLoading(true); setError(false); }
        try {
          const url = await fetchPage(page);
          if (!cancelled) { setImgSrc(url); setLoading(false); }
        } catch {
          if (!cancelled) { setError(true); setLoading(false); }
          return;
        }
      }
      // Pre-fetch next & previous pages silently in background
      if (!cancelled) {
        [page + 1, page + 2, page - 1].forEach((p) => {
          if (p >= 1 && (totalPages === 0 || p <= totalPages)) {
            fetchPage(p).catch(() => {});
          }
        });
      }
    })();
    return () => { cancelled = true; };
  }, [hasPdf, content.pdfPath, page, fetchPage, totalPages]);

  // Revoke all blob URLs on unmount
  useEffect(() => {
    const cache = pageCache.current;
    return () => { cache.forEach((u) => URL.revokeObjectURL(u)); cache.clear(); };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    touchRef.current = null;

    // tap (barely moved) → left half = prev, right half = next
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      if (t.clientX > window.innerWidth / 2) goNext();
      else goPrev();
      return;
    }
    // swipe up (dy < 0) → next, swipe down (dy > 0) → prev
    if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx)) {
      if (dy < 0) goNext();
      else goPrev();
    }
  };

  // desktop: click left/right half
  const onBodyClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    if (e.clientX > window.innerWidth / 2) goNext();
    else goPrev();
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
        <button onClick={onClose} className="p-1.5 rounded-lg" style={{ background: "var(--card)" }}>
          <X className="w-4 h-4" style={{ color: "var(--text)" }} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold truncate" style={{ color: "var(--text)" }}>{content.title}</p>
          {hasPdf && totalPages > 0 && (
            <p className="text-[10px]" style={{ color: "var(--muted)" }}>{page} / {totalPages}p</p>
          )}
        </div>
      </div>
      {/* Body */}
      {hasPdf ? (
        <div
          className="flex-1 relative overflow-hidden flex items-center justify-center select-none"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={onBodyClick}
        >
          {loading ? (
            <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
          ) : error ? (
            <p className="text-sm" style={{ color: "var(--muted)" }}>PDF를 불러올 수 없습니다.</p>
          ) : imgSrc ? (
            <img
              src={imgSrc}
              alt={`${content.title} ${page}p`}
              className="w-full max-w-2xl max-h-full object-contain"
              draggable={false}
            />
          ) : null}

          {/* 페이지 표시 + 버튼 (하단 고정) */}
          {totalPages > 1 && !loading && (
            <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-4 pointer-events-none">
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                disabled={page <= 1}
                className="pointer-events-auto px-3 py-1.5 rounded-xl text-xs font-bold disabled:opacity-20"
                style={{ background: "var(--card)", color: "var(--text)" }}
              >
                ← 이전
              </button>
              <span className="text-[11px] px-2.5 py-1 rounded-full pointer-events-none" style={{ background: "var(--card)", color: "var(--muted)" }}>
                {page} / {totalPages}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                disabled={page >= totalPages}
                className="pointer-events-auto px-3 py-1.5 rounded-xl text-xs font-bold disabled:opacity-20"
                style={{ background: "var(--card)", color: "var(--text)" }}
              >
                다음 →
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5 py-6 max-w-2xl w-full mx-auto">
          {paragraphs.length > 0 ? (
            paragraphs.map((p: string, i: number) => (
              <p key={i} className="text-sm leading-loose mb-4" style={{ color: "var(--text)" }}>{p}</p>
            ))
          ) : (
            <p className="text-sm text-center mt-20" style={{ color: "var(--muted)" }}>내용이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ContentCard({ content, locked, onUnlock }: { content: CreatorContent; locked: boolean; onUnlock: () => void }) {
  const [showReader, setShowReader] = useState(false);
  const [showAdGate, setShowAdGate] = useState(false);
  const isBook = content.type === "book";
  // Books are always free (ad-supported); other types respect the locked flag
  const effectiveLocked = isBook ? false : locked;

  return (
    <>
    {showReader && isBook && (
      <EbookReaderModal content={content} onClose={() => setShowReader(false)} />
    )}
    {showAdGate && (
      <div className="fixed inset-0 z-[300] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.88)" }}
        onClick={() => setShowAdGate(false)}>
        <div className="w-full max-w-[360px] mx-4 rounded-3xl overflow-hidden"
          style={{ background: "var(--card)" }}
          onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
              style={{ background: "rgba(192,132,252,0.15)" }}>
              <BookMarked className="w-5 h-5" style={{ color: "rgba(192,132,252,0.9)" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text)" }}>무료로 읽기</p>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>광고 시청 후 무료로 이용하실 수 있어요</p>
            </div>
          </div>
          {/* Ad — full-width, no padding, dark filter */}
          <div style={{ filter: "brightness(0.55) saturate(0.75)" }}>
            <AdFitBanner width={320} height={100} className="!my-0" />
          </div>
          {/* Buttons */}
          <div className="px-5 py-4 flex flex-col gap-2">
            <button
              onClick={() => { setShowAdGate(false); setShowReader(true); }}
              className="w-full py-3 rounded-2xl text-sm font-bold active:opacity-80 transition-opacity"
              style={{ background: "rgba(192,132,252,0.9)", color: "#000" }}
            >
              계속 읽기 →
            </button>
            <button
              onClick={() => setShowAdGate(false)}
              className="w-full py-2 text-xs rounded-2xl"
              style={{ color: "var(--muted)" }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    )}
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: effectiveLocked ? "rgba(99,102,241,0.2)" : "var(--border)" }}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative"
            style={{ background: "var(--bg)" }}>
            {effectiveLocked ? <Lock className="w-5 h-5" style={{ color: "var(--muted)" }} /> : content.thumbnail}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
                {CONTENT_ICON[content.type]}
                <span className="ml-0.5">{contentTypeLabel(content.type)}</span>
              </span>
              {isBook ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                  style={{ background: "rgba(192,132,252,0.12)", color: "rgba(192,132,252,0.9)" }}>
                  📖 무료
                </span>
              ) : content.isPremium && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                  {effectiveLocked ? "🔒 구독 전용" : "✓ 구독"}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug mb-1"
              style={{ color: effectiveLocked ? "var(--muted)" : "var(--text)" }}>
              {content.title}
            </p>
            {effectiveLocked ? (
              <button onClick={onUnlock}
                className="text-[11px] font-bold underline"
                style={{ color: "#818cf8" }}>
                구독하면 바로 열람 가능 →
              </button>
            ) : (
              <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                {content.description}
              </p>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{fmtDate(content.createdAt)}</span>
          {!effectiveLocked && content.duration && <span className="text-[10px]" style={{ color: "var(--muted)" }}>⏱ {content.duration}</span>}
          {!effectiveLocked && content.pages && <span className="text-[10px]" style={{ color: "var(--muted)" }}>📄 {content.pages}p</span>}
          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
              <Heart className="w-3 h-3" />{content.likeCount}
            </span>
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
              <Eye className="w-3 h-3" />{content.viewCount.toLocaleString()}
            </span>
            {isBook && (
              <button
                onClick={() => setShowAdGate(true)}
                className="text-[10px] px-2.5 py-1 rounded-lg font-bold transition-opacity hover:opacity-80 active:scale-95"
                style={{ background: "rgba(192,132,252,0.15)", color: "rgba(192,132,252,0.95)", border: "1px solid rgba(192,132,252,0.25)" }}
              >
                읽기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
