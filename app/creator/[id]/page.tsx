"use client";

import { use, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Users, TrendingUp, ChevronLeft, Heart, Eye, Lock, PlayCircle, BookOpen, FileText, MessageSquare, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { getCreator, contentTypeLabel, type Creator, type CreatorContent, type ContentType } from "@/lib/creators";
import { useAuth } from "@/hooks/useAuth";

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

function isSubscribed(creatorId: string): boolean {
  try {
    const subs: { creatorId: string; expiresAt: number }[] =
      JSON.parse(localStorage.getItem("investus_subscriptions") ?? "[]");
    return subs.some((s) => s.creatorId === creatorId && s.expiresAt > Date.now());
  } catch { return false; }
}

function saveSubscription(creatorId: string) {
  try {
    const subs: { creatorId: string; expiresAt: number }[] =
      JSON.parse(localStorage.getItem("investus_subscriptions") ?? "[]");
    const filtered = subs.filter((s) => s.creatorId !== creatorId);
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    filtered.push({ creatorId, expiresAt });
    localStorage.setItem("investus_subscriptions", JSON.stringify(filtered));
  } catch {}
}

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const creator: Creator | undefined = getCreator(id);
  const [subscribed, setSubscribed] = useState(false);
  const [contentTab, setContentTab] = useState<ContentType | "all">("all");
  const [showPayModal, setShowPayModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payDone, setPayDone] = useState(false);
  const [payMethod, setPayMethod] = useState<"kakao" | "naver" | "card">("kakao");

  useEffect(() => {
    if (creator) setSubscribed(isSubscribed(creator.id));
  }, [creator]);

  const handleSubscribe = useCallback(() => {
    if (!user) { router.push("/more"); return; }
    if (subscribed) return;
    setPayDone(false);
    setShowPayModal(true);
  }, [user, subscribed, router]);

  const handlePay = useCallback(async () => {
    if (paying) return;
    setPaying(true);

    // Demo mode: simulate payment
    await new Promise((r) => setTimeout(r, 1500));
    saveSubscription(creator!.id);
    setSubscribed(true);
    setPayDone(true);
    setPaying(false);
  }, [paying, creator]);

  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <span className="text-4xl">🔍</span>
        <p className="text-sm" style={{ color: "var(--muted)" }}>크리에이터를 찾을 수 없습니다</p>
        <Link href="/wall" className="text-xs px-4 py-2 rounded-xl" style={{ background: "var(--mint)", color: "#000" }}>
          돌아가기
        </Link>
      </div>
    );
  }

  const years = Math.floor((Date.now() - new Date(creator.inceptionDate).getTime()) / (365.25 * 24 * 3600 * 1000));
  const filteredContents = contentTab === "all"
    ? creator.contents
    : creator.contents.filter((c) => c.type === contentTab);

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-3xl mx-auto pb-24 lg:pb-10">
        {/* Back button */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/wall" className="flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-4 h-4" />
            종목이야기 / 크리에이터
          </Link>
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
                  {creator.subscriberCount.toLocaleString()}
                </div>
                <div className="text-[10px]" style={{ color: "var(--muted)" }}>구독자</div>
              </div>
            </div>

            {/* Subscribe button */}
            {subscribed ? (
              <div className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 border"
                style={{ borderColor: "var(--mint)", color: "var(--mint)" }}>
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-bold">구독 중</span>
              </div>
            ) : (
              <button
                onClick={handleSubscribe}
                className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
                style={{ background: "var(--mint)" }}>
                <Users className="w-4 h-4" />
                구독하기 · {creator.subscriptionPrice === 0 ? "무료" : `₩${creator.subscriptionPrice.toLocaleString()}/월`}
              </button>
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
            {creator.portfolio.map((h, i) => (
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
              <ContentCard key={content.id} content={content} subscribed={subscribed} onLock={handleSubscribe} />
            ))}
          </div>
        </div>
      </main>

      {/* Payment modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.7)" }}
          onClick={() => !paying && setShowPayModal(false)}>
          <div className="w-full max-w-[480px] mx-auto rounded-t-3xl p-6 pb-10"
            style={{ background: "var(--card)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "var(--border)" }} />

            {payDone ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{ background: "rgba(0,229,160,0.15)" }}>
                  ✅
                </div>
                <h2 className="text-lg font-bold font-syne" style={{ color: "var(--text)" }}>구독 완료!</h2>
                <p className="text-sm text-center" style={{ color: "var(--muted)" }}>
                  {creator.nickname}의 모든 프리미엄 콘텐츠를<br />이용할 수 있습니다.
                </p>
                <button onClick={() => setShowPayModal(false)}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-black"
                  style={{ background: "var(--mint)" }}>
                  콘텐츠 보기
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-base font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
                  {creator.nickname} 구독
                </h2>
                <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                  월 ₩{creator.subscriptionPrice.toLocaleString()} · 30일 자동 갱신
                </p>

                {/* Payment methods */}
                <p className="text-xs mb-2 font-semibold" style={{ color: "var(--muted)" }}>결제 수단</p>
                <div className="flex flex-col gap-2 mb-5">
                  {(["kakao", "naver", "card"] as const).map((m) => {
                    const labels = { kakao: "카카오페이", naver: "네이버페이", card: "신용/체크카드" };
                    const emojis = { kakao: "💛", naver: "💚", card: "💳" };
                    return (
                      <button key={m}
                        onClick={() => setPayMethod(m)}
                        className="w-full py-3.5 px-4 rounded-2xl border flex items-center gap-3 transition-all"
                        style={payMethod === m
                          ? { borderColor: "var(--mint)", background: "rgba(0,229,160,0.06)", color: "var(--text)" }
                          : { borderColor: "var(--border)", background: "var(--bg)", color: "var(--text)" }}>
                        <span className="text-lg">{emojis[m]}</span>
                        <span className="text-sm font-semibold">{labels[m]}</span>
                        {payMethod === m && <CheckCircle2 className="w-4 h-4 ml-auto" style={{ color: "var(--mint)" }} />}
                      </button>
                    );
                  })}
                </div>

                <button onClick={handlePay} disabled={paying}
                  className="w-full py-3.5 rounded-2xl text-sm font-bold text-black flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
                  style={{ background: "var(--mint)", opacity: paying ? 0.7 : 1 }}>
                  {paying ? (
                    <><span className="animate-spin">⏳</span> 결제 처리 중...</>
                  ) : (
                    `₩${creator.subscriptionPrice.toLocaleString()} 결제하기`
                  )}
                </button>
                <p className="text-[10px] text-center mt-2" style={{ color: "var(--muted)" }}>
                  언제든 해지 가능
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ContentCard({ content, subscribed, onLock }: {
  content: CreatorContent;
  subscribed: boolean;
  onLock: () => void;
}) {
  const isLocked = content.isPremium && !subscribed;

  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "var(--bg)" }}>
            {content.thumbnail}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className="text-[10px] px-1.5 py-0.5 rounded-md flex items-center gap-0.5"
                style={{ background: "rgba(0,229,160,0.1)", color: "var(--mint)" }}>
                {CONTENT_ICON[content.type]}
                <span className="ml-0.5">{contentTypeLabel(content.type)}</span>
              </span>
              {content.isPremium && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-md"
                  style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
                  구독 전용
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug mb-1" style={{ color: isLocked ? "var(--muted)" : "var(--text)" }}>
              {content.title}
            </p>
            <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
              {content.description}
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{fmtDate(content.createdAt)}</span>
          {content.duration && <span className="text-[10px]" style={{ color: "var(--muted)" }}>⏱ {content.duration}</span>}
          {content.pages && <span className="text-[10px]" style={{ color: "var(--muted)" }}>📄 {content.pages}p</span>}
          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
              <Heart className="w-3 h-3" />{content.likeCount}
            </span>
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
              <Eye className="w-3 h-3" />{content.viewCount.toLocaleString()}
            </span>
          </div>
        </div>

        {isLocked && (
          <button onClick={onLock}
            className="w-full mt-3 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border"
            style={{ borderColor: "#fbbf24", color: "#fbbf24", background: "rgba(251,191,36,0.06)" }}>
            <Lock className="w-3.5 h-3.5" />
            구독하고 전체 보기
          </button>
        )}
      </div>
    </div>
  );
}
