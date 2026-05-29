"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ShieldCheck, TrendingUp, ChevronLeft, Heart, Eye, PlayCircle, BookOpen, FileText, MessageSquare, Lock, X, CheckCircle2, Copy, CreditCard } from "lucide-react";
import { Header } from "@/components/Header";
import { getCreator, contentTypeLabel, type Creator, type CreatorContent, type ContentType } from "@/lib/creators";

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
  const { id } = use(params);
  const creator: Creator | undefined = getCreator(id);
  const [contentTab, setContentTab] = useState<ContentType | "all">("all");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return loadSubscribed(id);
  });
  const [showSubModal, setShowSubModal] = useState(false);

  if (!creator) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <span className="text-4xl">🔍</span>
        <p className="text-sm" style={{ color: "var(--muted)" }}>투자클럽을 찾을 수 없습니다</p>
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
            종목이야기 / 투자클럽
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

function ContentCard({ content, locked, onUnlock }: { content: CreatorContent; locked: boolean; onUnlock: () => void }) {
  return (
    <div className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: locked ? "rgba(99,102,241,0.2)" : "var(--border)" }}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 relative"
            style={{ background: "var(--bg)" }}>
            {locked ? <Lock className="w-5 h-5" style={{ color: "var(--muted)" }} /> : content.thumbnail}
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
                  style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                  {locked ? "🔒 구독 전용" : "✓ 구독"}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold leading-snug mb-1"
              style={{ color: locked ? "var(--muted)" : "var(--text)" }}>
              {content.title}
            </p>
            {locked ? (
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
          {!locked && content.duration && <span className="text-[10px]" style={{ color: "var(--muted)" }}>⏱ {content.duration}</span>}
          {!locked && content.pages && <span className="text-[10px]" style={{ color: "var(--muted)" }}>📄 {content.pages}p</span>}
          <div className="ml-auto flex items-center gap-3">
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
              <Heart className="w-3 h-3" />{content.likeCount}
            </span>
            <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--muted)" }}>
              <Eye className="w-3 h-3" />{content.viewCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
