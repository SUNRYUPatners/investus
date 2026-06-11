"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import {
  ChevronLeft, Plus, Pencil, ShieldCheck, Upload,
  Trash2, Eye, Heart, X, CheckCircle2,
} from "lucide-react";

type ContentType = "post" | "report" | "lecture" | "book";

type MyContent = {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  body: string;
  externalUrl: string;
  fileLabel: string;
  createdAt: string;
  likeCount: number;
  viewCount: number;
};

type MyCreator = {
  id: string;
  nickname: string;
  avatar: string;
  bio: string;
  tags: string[];
  broker: string;
  portfolio: { symbol: string; name: string; allocation: number }[];
  status: "pending" | "approved";
  createdAt: string;
  subscriptionEnabled?: boolean;
  subscriptionPrice?: number;
};

const AVATARS = ["🦁", "🚀", "👑", "💰", "🐂", "🦅", "🎯", "💎", "🔥", "🌊", "⚡", "🧠"];
const TYPE_LABEL: Record<ContentType, string> = { post: "게시글", report: "리포트", lecture: "강의", book: "전자책" };
const TYPE_EMOJI: Record<ContentType, string>  = { post: "📝", report: "📊", lecture: "🎬", book: "📚" };

const TAG_OPTIONS = ["가치투자","성장주","배당주","ETF","테크","AI반도체","장기홀딩","단기트레이딩","적립식","배당성장","현금흐름","패시브투자"];

function loadCreator(): MyCreator | null {
  try { return JSON.parse(localStorage.getItem("investus_my_creator") ?? "null"); } catch { return null; }
}
function saveCreator(c: MyCreator) {
  try { localStorage.setItem("investus_my_creator", JSON.stringify(c)); } catch {}
}
function loadContents(): MyContent[] {
  try { return JSON.parse(localStorage.getItem("investus_creator_contents") ?? "[]"); } catch { return []; }
}
function saveContents(cs: MyContent[]) {
  try { localStorage.setItem("investus_creator_contents", JSON.stringify(cs)); } catch {}
}

export default function CreatorDashboardPage() {
  const { user, loaded: authLoaded } = useAuth();
  const router = useRouter();

  const [creator, setCreator]       = useState<MyCreator | null>(null);
  const [contents, setContents]     = useState<MyContent[]>([]);
  const [tab, setTab]               = useState<ContentType | "all">("all");

  const [showWrite,    setShowWrite]    = useState(false);
  const [showVerify,   setShowVerify]   = useState(false);
  const [uploadDone,   setUploadDone]   = useState(false);
  const [showEdit,     setShowEdit]     = useState(false);
  const [cancelling,   setCancelling]   = useState(false);

  // Write form
  const [wType,        setWType]        = useState<ContentType>("post");
  const [wTitle,       setWTitle]       = useState("");
  const [wDesc,        setWDesc]        = useState("");
  const [wBody,        setWBody]        = useState("");
  const [wExternalUrl, setWExternalUrl] = useState("");
  const [wFileLabel,   setWFileLabel]   = useState("");

  // Edit form
  const [eNickname,         setENickname]         = useState("");
  const [eBio,              setEBio]              = useState("");
  const [eAvatar,           setEAvatar]           = useState("");
  const [eTags,             setETags]             = useState<string[]>([]);
  const [eSubEnabled,       setESubEnabled]       = useState(false);
  const [eSubPrice,         setESubPrice]         = useState(9900);

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) { router.replace("/more"); return; }

    const local = loadCreator();

    if (local) {
      setCreator(local);
      setContents(loadContents());
      setENickname(local.nickname);
      setEBio(local.bio);
      setEAvatar(local.avatar);
      setETags(local.tags);
      setESubEnabled(local.subscriptionEnabled ?? false);
      setESubPrice(local.subscriptionPrice ?? 9900);
    }

    // 항상 서버에서 최신 상태 동기화 (localStorage 없을 때도 복원)
    fetch(`/api/creator/list?id=${encodeURIComponent(user.email)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) {
          if (!local) router.replace("/creator/setup");
          return;
        }
        const d = data[0];
        const restored: MyCreator = {
          id:                  d.phone ?? user.email,
          nickname:            d.nickname ?? "",
          avatar:              d.avatar ?? "🦁",
          bio:                 d.bio ?? "",
          tags:                d.tags ?? [],
          broker:              d.broker ?? "",
          portfolio:           d.top_holdings ?? [],
          status:              (d.status ?? "pending") as "pending" | "approved",
          createdAt:           (d.submitted_at ?? new Date().toISOString()).slice(0, 10),
          subscriptionEnabled: d.subscription_enabled ?? false,
          subscriptionPrice:   d.subscription_price ?? 9900,
        };
        saveCreator(restored);
        setCreator(restored);
        if (!local) {
          setENickname(restored.nickname);
          setEBio(restored.bio);
          setEAvatar(restored.avatar);
          setETags(restored.tags);
          setESubEnabled(restored.subscriptionEnabled ?? false);
          setESubPrice(restored.subscriptionPrice ?? 9900);
          setContents(loadContents());
        }
      })
      .catch(() => { if (!local) router.replace("/creator/setup"); });
  }, [authLoaded, user, router]);

  // auth 로딩 중이면 빈 화면 대신 로딩 표시
  if (!authLoaded) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="w-6 h-6 rounded-full border-2 animate-spin"
        style={{ borderColor: "var(--mint)", borderTopColor: "transparent" }} />
    </div>
  );

  if (!creator || !user) return null;

  /* ── Actions ── */
  const handleCancelApplication = async () => {
    if (!confirm("신청을 취소하시겠어요? 프로필과 신청 내역이 삭제됩니다.")) return;
    setCancelling(true);
    // Supabase에서 삭제
    await fetch(`/api/creator/cancel?phone=${encodeURIComponent(user.email)}`, { method: "DELETE" }).catch(() => {});
    // localStorage 정리
    try { localStorage.removeItem("investus_my_creator"); } catch {}
    try { localStorage.removeItem("investus_creator_contents"); } catch {}
    router.replace("/creator/setup");
  };

  const handleVerify = async () => {
    // Submit to server as pending (admin must approve)
    await fetch("/api/admin/verifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: user.email,
        nickname: creator.nickname,
        avatar: creator.avatar,
        bio: creator.bio,
      }),
    }).catch(() => {});

    // Locally mark pending (not auto-approved)
    const updated = { ...creator, status: "pending" as const };
    saveCreator(updated);
    setCreator(updated);
    setShowVerify(false);
    setUploadDone(false);
  };

  const handleWrite = () => {
    if (!wTitle.trim()) return;
    const item: MyContent = {
      id: Date.now().toString(),
      type: wType,
      title: wTitle.trim(),
      description: wDesc.trim(),
      body: wBody.trim(),
      externalUrl: wExternalUrl.trim(),
      fileLabel: wFileLabel.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
      likeCount: 0,
      viewCount: 0,
    };
    const next = [item, ...contents];
    saveContents(next);
    setContents(next);
    setShowWrite(false);
    setWTitle(""); setWDesc(""); setWBody(""); setWType("post");
    setWExternalUrl(""); setWFileLabel("");
  };

  const handleDelete = (id: string) => {
    const next = contents.filter((c) => c.id !== id);
    saveContents(next);
    setContents(next);
  };

  const handleSaveEdit = () => {
    const updated: MyCreator = {
      ...creator,
      nickname: eNickname.trim() || creator.nickname,
      bio: eBio.trim() || creator.bio,
      avatar: eAvatar,
      tags: eTags,
      subscriptionEnabled: eSubEnabled,
      subscriptionPrice: eSubEnabled ? eSubPrice : undefined,
    };
    saveCreator(updated);
    setCreator(updated);
    setShowEdit(false);
  };

  const toggleETag = (t: string) => {
    setETags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 5 ? [...prev, t] : prev);
  };

  const visible = tab === "all" ? contents : contents.filter((c) => c.type === tab);
  const totalViews = contents.reduce((s, c) => s + c.viewCount, 0);
  const totalAlloc = creator.portfolio.reduce((s, h) => s + h.allocation, 0);
  const estimatedRevenue = Math.round(totalViews * 20);

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-28 lg:pb-10">

        {/* Back */}
        <div className="pt-4 pb-2">
          <Link href="/wall" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" />종목이야기
          </Link>
        </div>

        {/* ── Profile card ── */}
        <div className="rounded-2xl border mb-4 overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Cover */}
          <div className="h-20 relative" style={{ background: "linear-gradient(135deg,#0d1f18 0%,#0e0c1f 100%)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,transparent,var(--card))" }} />
            <div className="absolute -bottom-6 left-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2"
                style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                {creator.avatar}
              </div>
            </div>
          </div>

          <div className="pt-9 px-4 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>{creator.nickname}</h1>
                  {creator.status === "approved" ? (
                    <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(0,229,160,0.12)", color: "var(--mint)" }}>
                      <ShieldCheck className="w-3 h-3" />인증됨
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>
                      ⏳ 심사 중
                    </span>
                  )}
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                  {creator.broker} · {creator.subscriptionEnabled ? `₩${creator.subscriptionPrice?.toLocaleString()}/월 구독` : "광고 수익형"}
                </p>
              </div>
              <button onClick={() => setShowEdit(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center border active:opacity-70 transition-opacity"
                style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.04)" }}>
                <Pencil className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
              </button>
            </div>

            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{creator.bio}</p>

            <div className="flex gap-1.5 flex-wrap mb-4">
              {creator.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}>{t}</span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl mb-3" style={{ background: "var(--bg)" }}>
              <div className="text-center">
                <div className="text-base font-bold font-mono-num" style={{ color: "var(--mint)" }}>{contents.length}</div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>게시물</div>
              </div>
              <div className="text-center border-x" style={{ borderColor: "var(--border)" }}>
                <div className="text-base font-bold font-mono-num" style={{ color: "var(--mint)" }}>{totalViews.toLocaleString()}</div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>총 조회</div>
              </div>
              <div className="text-center">
                <div className="text-base font-bold font-mono-num" style={{ color: "#fbbf24" }}>
                  {estimatedRevenue > 0 ? `₩${estimatedRevenue.toLocaleString()}` : "₩0"}
                </div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>예상 광고수익</div>
              </div>
            </div>

            {creator.status === "pending" ? (
              <div className="w-full py-3 rounded-xl text-sm font-bold text-center"
                style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>
                ⏳ 심사 중 — 승인 대기 중
              </div>
            ) : creator.status !== "approved" ? (
              <button onClick={() => setShowVerify(true)}
                className="w-full py-3 rounded-xl text-sm font-bold text-black active:opacity-80 transition-opacity"
                style={{ background: "var(--mint)" }}>
                인증하고 콘텐츠 올리기 →
              </button>
            ) : (
              <button onClick={() => setShowWrite(true)}
                className="w-full py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
                style={{ background: "var(--mint)" }}>
                <Plus className="w-4 h-4" />새 콘텐츠 작성
              </button>
            )}
          </div>
        </div>

        {/* ── Verification notice ── */}
        {creator.status !== "approved" && (
          <div className="rounded-2xl p-4 mb-4 border"
            style={{ background: "rgba(251,191,36,0.04)", borderColor: "rgba(251,191,36,0.2)" }}>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{creator.status === "pending" ? "⏳" : "⚠️"}</span>
              <div>
                {creator.status === "pending" ? (
                  <>
                    <p className="text-xs font-semibold mb-1" style={{ color: "#fbbf24" }}>인증 심사 중</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      캡처 업로드가 접수되었습니다. 관리자 검토 후 1~2일 내 승인됩니다.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button onClick={() => setShowVerify(true)}
                        className="text-[11px] font-bold underline"
                        style={{ color: "var(--muted)" }}>
                        캡처 재업로드 →
                      </button>
                      <button onClick={handleCancelApplication} disabled={cancelling}
                        className="text-[11px] font-bold underline disabled:opacity-40"
                        style={{ color: "#ef4444" }}>
                        {cancelling ? "취소 중…" : "신청 취소"}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold mb-1" style={{ color: "#fbbf24" }}>인증 후 콘텐츠를 올릴 수 있어요</p>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      HTS/MTS 보유 화면 캡처를 업로드하면 관리자 검토 후 승인됩니다.
                    </p>
                    <button onClick={() => setShowVerify(true)}
                      className="mt-2 text-[11px] font-bold underline"
                      style={{ color: "var(--mint)" }}>
                      지금 인증하기 →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Portfolio ── */}
        {creator.portfolio.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 font-syne" style={{ color: "var(--muted)" }}>
              공개 포트폴리오
            </p>
            <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {creator.portfolio.slice(0, 6).map((h, i) => (
                <div key={h.symbol}
                  className={`flex items-center gap-3 px-4 py-3 ${i < Math.min(creator.portfolio.length, 6) - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "var(--border)" }}>
                  <span className="text-[10px] font-mono-num w-4 flex-shrink-0" style={{ color: "var(--muted)" }}>{i + 1}</span>
                  <span className="text-xs font-bold font-mono-num w-14 flex-shrink-0" style={{ color: "var(--text)" }}>{h.symbol}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px]" style={{ color: "var(--muted)" }}>{h.name}</span>
                      <span className="text-[10px] font-mono-num" style={{ color: "var(--text)" }}>{h.allocation}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg)" }}>
                      <div className="h-full rounded-full"
                        style={{ width: `${(h.allocation / Math.max(totalAlloc, 100)) * 100}%`, background: "var(--mint)", opacity: 0.7 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Contents ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
              내 콘텐츠
            </p>
            {creator.status === "approved" && (
              <button onClick={() => setShowWrite(true)}
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg active:opacity-70 transition-opacity"
                style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
                <Plus className="w-3 h-3" />작성
              </button>
            )}
          </div>

          {/* Type tabs */}
          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
            {(["all", "post", "report", "lecture", "book"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all"
                style={tab === t
                  ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                  : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                {t === "all" ? "전체" : TYPE_LABEL[t]}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="rounded-2xl border py-10 flex flex-col items-center gap-3"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <span className="text-3xl">✏️</span>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {creator.status !== "approved" ? "인증 후 콘텐츠를 올릴 수 있어요" : "아직 작성한 콘텐츠가 없어요"}
              </p>
              {creator.status === "approved" && (
                <button onClick={() => setShowWrite(true)}
                  className="text-xs font-bold px-4 py-2 rounded-xl text-black active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)" }}>
                  첫 콘텐츠 작성하기
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {visible.map((c) => (
                <div key={c.id} className="rounded-2xl border p-4" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "var(--bg)" }}>
                      {TYPE_EMOJI[c.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                          style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
                          {TYPE_LABEL[c.type]}
                        </span>
                        {c.externalUrl && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                            style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
                            링크 연결됨
                          </span>
                        )}
                        {c.fileLabel && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md truncate max-w-[100px]"
                            style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}>
                            📎 {c.fileLabel}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold leading-snug mb-1" style={{ color: "var(--text)" }}>{c.title}</p>
                      {c.description && (
                        <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>{c.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>{c.createdAt}</span>
                    <div className="ml-auto flex items-center gap-3">
                      <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
                        <Heart className="w-3 h-3" />{c.likeCount}
                      </span>
                      <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
                        <Eye className="w-3 h-3" />{c.viewCount.toLocaleString()}
                      </span>
                      <button onClick={() => handleDelete(c.id)}
                        className="flex items-center gap-0.5 text-[10px] active:opacity-70 transition-opacity"
                        style={{ color: "#ef4444" }}>
                        <Trash2 className="w-3 h-3" />삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Write modal ── */}
      {showWrite && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "var(--bg)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setShowWrite(false)}>
              <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
            </button>
            <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>새 콘텐츠 작성</h2>
            <button onClick={handleWrite} disabled={!wTitle.trim()}
              className="text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-40 active:opacity-70 transition-opacity"
              style={{ background: "var(--mint)", color: "#000" }}>
              발행
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Type picker */}
            <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--muted)" }}>콘텐츠 유형</p>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {(["post", "report", "lecture", "book"] as ContentType[]).map((t) => (
                <button key={t} onClick={() => setWType(t)}
                  className="flex flex-col items-center gap-1 py-3 rounded-xl border transition-all active:opacity-70"
                  style={wType === t
                    ? { borderColor: "var(--mint)", background: "rgba(0,229,160,0.08)" }
                    : { borderColor: "var(--border)", background: "var(--card)" }}>
                  <span className="text-xl">{TYPE_EMOJI[t]}</span>
                  <span className="text-[10px] font-semibold"
                    style={{ color: wType === t ? "var(--mint)" : "var(--muted)" }}>
                    {TYPE_LABEL[t]}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>제목</p>
            <input value={wTitle} onChange={(e) => setWTitle(e.target.value)} maxLength={60}
              placeholder="콘텐츠 제목을 입력하세요"
              className="w-full px-4 py-3 rounded-xl border mb-4 text-sm outline-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

            <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>요약 (선택)</p>
            <input value={wDesc} onChange={(e) => setWDesc(e.target.value)} maxLength={120}
              placeholder="한 줄 설명"
              className="w-full px-4 py-3 rounded-xl border mb-4 text-sm outline-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

            <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>본문</p>
            <textarea value={wBody} onChange={(e) => setWBody(e.target.value)}
              placeholder="본문 내용을 입력하세요..."
              rows={7}
              className="w-full px-4 py-3 rounded-xl border mb-4 text-sm outline-none resize-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

            {/* Lecture URL */}
            {wType === "lecture" && (
              <>
                <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>강의 링크 (YouTube / 외부 URL)</p>
                <input value={wExternalUrl} onChange={(e) => setWExternalUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-4 py-3 rounded-xl border mb-4 text-sm outline-none"
                  style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />
              </>
            )}

            {/* Ebook file */}
            {wType === "book" && (
              <>
                <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>전자책 파일 (PDF)</p>
                <label className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border mb-4 cursor-pointer active:opacity-70 transition-opacity"
                  style={{ background: "var(--card)", borderColor: wFileLabel ? "var(--mint)" : "var(--border)" }}>
                  <Upload className="w-4 h-4 flex-shrink-0" style={{ color: wFileLabel ? "var(--mint)" : "var(--muted)" }} />
                  <span className="text-sm truncate" style={{ color: wFileLabel ? "var(--text)" : "var(--muted)" }}>
                    {wFileLabel || "PDF 파일 선택"}
                  </span>
                  <input type="file" accept=".pdf,application/pdf" className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) setWFileLabel(f.name);
                    }} />
                </label>
              </>
            )}

            {/* Ad model notice */}
            <div className="flex items-center gap-2 p-3 rounded-xl border"
              style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
              <span className="text-sm">💡</span>
              <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                모든 콘텐츠는 무료로 공개됩니다. 조회수 기반 광고 수익이 정산됩니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit profile modal ── */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "var(--bg)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
            <button onClick={() => setShowEdit(false)}>
              <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
            </button>
            <h2 className="text-sm font-bold font-syne" style={{ color: "var(--text)" }}>프로필 수정</h2>
            <button onClick={handleSaveEdit}
              className="text-xs font-bold px-3 py-1.5 rounded-lg active:opacity-70 transition-opacity"
              style={{ background: "var(--mint)", color: "#000" }}>
              저장
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--muted)" }}>아바타</p>
            <div className="grid grid-cols-6 gap-2 mb-5">
              {AVATARS.map((a) => (
                <button key={a} onClick={() => setEAvatar(a)}
                  className="h-10 rounded-xl flex items-center justify-center text-xl border transition-all active:opacity-70"
                  style={eAvatar === a
                    ? { borderColor: "var(--mint)", background: "rgba(0,229,160,0.1)" }
                    : { borderColor: "var(--border)", background: "var(--card)" }}>
                  {a}
                </button>
              ))}
            </div>

            <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>닉네임</p>
            <input value={eNickname} onChange={(e) => setENickname(e.target.value)} maxLength={20}
              className="w-full px-4 py-3 rounded-xl border mb-4 text-sm outline-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

            <p className="text-[10px] font-semibold mb-1.5" style={{ color: "var(--muted)" }}>한 줄 소개</p>
            <textarea value={eBio} onChange={(e) => setEBio(e.target.value)} rows={4} maxLength={200}
              className="w-full px-4 py-3 rounded-xl border mb-4 text-sm outline-none resize-none"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} />

            <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--muted)" }}>투자 스타일 태그 (최대 5개)</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TAG_OPTIONS.map((t) => (
                <button key={t} onClick={() => toggleETag(t)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all active:opacity-70"
                  style={eTags.includes(t)
                    ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                    : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Subscription toggle */}
            {creator.status === "approved" && (
              <div className="mb-6 rounded-2xl border p-4" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-xs font-bold" style={{ color: "var(--text)" }}>유료 구독 활성화</p>
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>
                      {eSubEnabled ? "구독자만 볼 수 있는 프리미엄 콘텐츠를 설정할 수 있어요" : "광고 수익형 무료 클럽으로 운영 중"}
                    </p>
                  </div>
                  <button
                    onClick={() => setESubEnabled((v) => !v)}
                    className="w-11 h-6 rounded-full transition-colors flex-shrink-0 relative"
                    style={{ background: eSubEnabled ? "var(--mint)" : "var(--border)" }}>
                    <span className="absolute top-0.5 w-5 h-5 rounded-full transition-all"
                      style={{
                        background: "#fff",
                        left: eSubEnabled ? "calc(100% - 1.375rem)" : "2px",
                      }} />
                  </button>
                </div>

                {eSubEnabled && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <p className="text-[10px] font-semibold mb-2" style={{ color: "var(--muted)" }}>월 구독료</p>
                    <div className="flex gap-2">
                      {[5900, 9900, 14900].map((p) => (
                        <button key={p} onClick={() => setESubPrice(p)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold border transition-all active:opacity-70"
                          style={eSubPrice === p
                            ? { background: "var(--mint)", color: "#000", borderColor: "var(--mint)" }
                            : { background: "var(--card)", color: "var(--muted)", borderColor: "var(--border)" }}>
                          ₩{p.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <Link href="/creator/setup"
                className="text-xs font-semibold"
                style={{ color: "var(--muted)" }}>
                포트폴리오 전체 수정 →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Verification bottom sheet ── */}
      {showVerify && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => { setShowVerify(false); setUploadDone(false); }}>
          <div className="w-full max-w-[480px] mx-auto rounded-t-3xl p-6 pb-10"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border)" }} />

            {!uploadDone ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6" style={{ color: "var(--mint)" }} />
                  <h2 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>투자클럽 계좌 인증</h2>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  실제 보유 종목 화면 캡처를 업로드하면 즉시 투자클럽 활동이 시작됩니다.
                </p>
                <label htmlFor="creator-verify"
                  className="w-full flex flex-col items-center gap-3 py-8 rounded-2xl border border-dashed cursor-pointer mb-4 active:opacity-70 transition-opacity"
                  style={{ borderColor: "rgba(0,229,160,0.4)", background: "rgba(0,229,160,0.04)" }}>
                  <Upload className="w-8 h-8" style={{ color: "var(--mint)" }} />
                  <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>HTS/MTS 보유 화면 캡처 업로드</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>이미지를 탭해서 첨부해 주세요</p>
                </label>
                <input id="creator-verify" type="file" accept="image/*" className="hidden"
                  onChange={() => setUploadDone(true)} />
                <p className="text-[10px] text-center" style={{ color: "var(--muted)" }}>
                  증권사 직접 연동은 준비 중입니다
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,229,160,0.15)" }}>
                  <CheckCircle2 className="w-7 h-7" style={{ color: "var(--mint)" }} />
                </div>
                <h2 className="text-base font-bold" style={{ color: "var(--text)" }}>업로드 완료!</h2>
                <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
                  인증이 확인되었습니다.{"\n"}이제 콘텐츠를 작성할 수 있어요.
                </p>
                <button onClick={handleVerify}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-black active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)" }}>
                  콘텐츠 작성 시작하기 🎉
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
