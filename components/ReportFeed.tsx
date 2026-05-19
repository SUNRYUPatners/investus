"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronDown, Pin, X, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

// 토스페이먼츠 연결 전까지 false — true로 바꾸면 구독 게이팅 복활
const SUBSCRIPTION_ENABLED = false;

// ── 이미지 라이트박스 (스와이프 닫기 + 핀치줌) ───────────────────────────
function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragOpacity, setDragOpacity] = useState(1);
  const isTracking = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) return; // 핀치줌 중엔 스와이프 무시
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isTracking.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current || e.touches.length > 1) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    const dy = e.touches[0].clientY - touchStart.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (absDx > absDy && absDx > 12) {
      // 좌우 스와이프
      isTracking.current = true;
      setTranslate({ x: dx, y: 0 });
      setDragOpacity(Math.max(0.2, 1 - absDx / 250));
    } else if (dy > 12 && absDy > absDx) {
      // 아래로 스와이프
      isTracking.current = true;
      setTranslate({ x: 0, y: Math.max(0, dy) });
      setDragOpacity(Math.max(0.2, 1 - dy / 250));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || !isTracking.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    const THRESHOLD = 80;

    if (Math.abs(dx) > THRESHOLD || dy > THRESHOLD) {
      onClose();
    } else {
      setTranslate({ x: 0, y: 0 });
      setDragOpacity(1);
    }
    touchStart.current = null;
    isTracking.current = false;
  };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ background: `rgba(0,0,0,${0.92 * dragOpacity})` }}
      onClick={onClose}
    >
      {/* X 버튼 — safe area 아래에 고정 */}
      <button
        className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{
          top: "max(1rem, calc(env(safe-area-inset-top) + 0.5rem))",
          background: "rgba(255,255,255,0.18)",
        }}
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* 이미지 영역 — 스와이프에 따라 이동 */}
      <div
        className="w-full h-full flex items-center justify-center overflow-auto"
        style={{
          touchAction: "pinch-zoom",
          transform: `translate(${translate.x}px, ${translate.y}px)`,
          transition: isTracking.current ? "none" : "transform 0.25s ease, opacity 0.25s ease",
          opacity: dragOpacity,
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="확대 보기"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", touchAction: "pinch-zoom" }}
        />
      </div>

      <p className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/40 pointer-events-none">
        스와이프하여 닫기 · 두 손가락으로 확대
      </p>
    </div>
  );
}
import {
  SEED_REPORTS,
  CATEGORY_STYLE,
  CATEGORY_EMOJI,
  type Report,
} from "@/lib/reports";

function getDateKey(r: Report): string {
  const s = r.updatedAt ?? r.date ?? "";
  return s.split(" ")[0].replace(/\./g, "-"); // "2026.05.15 08:30" → "2026-05-15"
}

const SHOW_WINDOW = 7 * 24 * 60 * 60 * 1000;  // 1주일 후 삭제
const FREE_WINDOW = 24 * 60 * 60 * 1000;        // 24시간 이내 무료

function parseReportTime(r: Report): number {
  const s = r.updatedAt ?? r.date ?? "";
  if (!s) return 0;
  // "2026.05.18 08:35" → ISO with KST offset
  if (s.includes(" ")) {
    const iso = s.replace(/\./g, "-").replace(" ", "T") + ":00+09:00";
    return new Date(iso).getTime();
  }
  // "2026-05-18" → start of day KST
  return new Date(s + "T00:00:00+09:00").getTime();
}

function isWithinWeek(r: Report): boolean {
  const t = parseReportTime(r);
  return t > 0 && Date.now() - t <= SHOW_WINDOW;
}

function isWithin24h(r: Report): boolean {
  const t = parseReportTime(r);
  return t > 0 && Date.now() - t <= FREE_WINDOW;
}

// ── ReportCard ────────────────────────────────────────────────────────────

function ImageGrid({ images, failedImgs, onError, onOpen }: {
  images: string[];
  failedImgs: Set<number>;
  onError: (i: number) => void;
  onOpen: (src: string) => void;
}) {
  const visible = images.filter((_, i) => !failedImgs.has(i));
  if (visible.length === 0) return null;
  return (
    <div className={`grid gap-2 ${visible.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {images.map((src, i) => {
        if (failedImgs.has(i)) return null;
        return (
          <button
            key={i}
            className="relative rounded-xl overflow-hidden border w-full"
            style={{ borderColor: "var(--border)", aspectRatio: "16/9", display: "block" }}
            onClick={() => onOpen(src)}
          >
            <Image
              src={src}
              alt={`참고 자료 ${i + 1}`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 480px) 90vw, 440px"
              onError={() => onError(i)}
              unoptimized={src.startsWith("/charts/")}
            />
            <span className="absolute bottom-1.5 right-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
              style={{ background: "rgba(0,0,0,0.5)", color: "rgba(255,255,255,0.7)" }}>
              🔍 확대
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ── 잠긴 리포트 그룹 (전체 묶음 — 구독하기 버튼 1개) ──────────────────────

function LockedReportGroup({ reports }: { reports: Report[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      {/* 헤더 토글 */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:opacity-70 transition-opacity"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.07)" }}>
          <Lock className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-none mb-0.5" style={{ color: "var(--text)" }}>추가 리포트 {reports.length}건</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>구독하면 전부 열람 가능해요</p>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform duration-200"
          style={{ color: "var(--muted)", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* 제목 목록 (펼쳤을 때) */}
      {expanded && (
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {reports.map((r, i) => {
            const st = CATEGORY_STYLE[r.categoryColor];
            const em = CATEGORY_EMOJI[r.category];
            return (
              <div
                key={r.id}
                className="flex items-start gap-3 px-4 py-3"
                style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}
              >
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 whitespace-nowrap" style={{ background: st.bg, color: st.color }}>
                  {em} {r.category}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-snug" style={{ color: "var(--text)" }}>{r.title}</p>
                  <p className="text-[10px] mt-0.5 font-mono-num" style={{ color: "var(--muted)", opacity: 0.7 }}>
                    {r.updatedAt ?? r.date}
                  </p>
                </div>
                <Lock className="w-3 h-3 flex-shrink-0 mt-1" style={{ color: "var(--muted)", opacity: 0.4 }} />
              </div>
            );
          })}
        </div>
      )}

      {/* 구독하기 버튼 — 항상 하단에 1개만 */}
      <div className="px-4 pb-4 pt-3" style={{ borderTop: expanded ? "1px solid var(--border)" : undefined }}>
        <Link
          href="/more"
          className="w-full py-2.5 rounded-xl text-sm font-bold text-black text-center block active:opacity-80 transition-opacity"
          style={{ background: "var(--mint)" }}
        >
          구독하기 ₩5,900/월
        </Link>
      </div>
    </div>
  );
}

function ReportCard({ report }: { report: Report }) {
  const [open, setOpen]               = useState(false);
  const [failedImgs, setFailedImgs]   = useState<Set<number>>(new Set());
  const [lightbox, setLightbox]       = useState<string | null>(null);
  const style = CATEGORY_STYLE[report.categoryColor];
  const emoji = CATEGORY_EMOJI[report.category];

  const handleImgError = useCallback((idx: number) => {
    setFailedImgs((prev) => new Set(prev).add(idx));
  }, []);

  const hasImages = report.images && report.images.length > 0;

  // 이미지 전용 리포트: 이미지만 카드에 바로 표시 (이미지 실패 시 summary로 fallback)
  if (report.imageOnly && hasImages) {
    const allFailed = report.images!.every((_, i) => failedImgs.has(i));
    return (
      <>
        {lightbox && <ImageLightbox src={lightbox} onClose={() => setLightbox(null)} />}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="p-4 pb-3">
            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: style.bg, color: style.color }}
              >
                {emoji} {report.category}
              </span>
              {report.subject && (
                <span
                  className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}
                >
                  {report.subject}
                </span>
              )}
              {report.isPinned && (
                <Pin className="w-3 h-3 flex-shrink-0" style={{ color: style.color }} />
              )}
              <span
                className="text-[9px] font-mono-num tabular-nums ml-auto flex-shrink-0"
                style={{ color: "var(--muted)", opacity: 0.7 }}
              >
                {report.updatedAt ?? report.date}
              </span>
            </div>
            <h3
              className="text-sm font-bold leading-snug mb-3"
              style={{ color: "var(--text)" }}
            >
              {report.title}
            </h3>
            {allFailed ? (
              // 이미지 전부 실패 시 summary 텍스트로 폴백
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {report.summary}
              </p>
            ) : (
              <ImageGrid
                images={report.images!}
                failedImgs={failedImgs}
                onError={handleImgError}
                onOpen={(src) => setLightbox(src)}
              />
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    {lightbox && <ImageLightbox src={lightbox} onClose={() => setLightbox(null)} />}
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Summary row */}
      <div className="p-4">
        {/* Top: category + subject + pin + updatedAt */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: style.bg, color: style.color }}
          >
            {emoji} {report.category}
          </span>
          {report.subject && (
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}
            >
              {report.subject}
            </span>
          )}
          {report.isPinned && (
            <Pin className="w-3 h-3 flex-shrink-0" style={{ color: style.color }} />
          )}
          <span
            className="text-[9px] font-mono-num tabular-nums ml-auto flex-shrink-0"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {report.updatedAt ?? report.date}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-sm font-bold leading-snug mb-2"
          style={{ color: "var(--text)" }}
        >
          {report.title}
        </h3>

        {/* Summary */}
        <p
          className="text-[12px] leading-relaxed"
          style={{
            color: "var(--muted)",
            display: "-webkit-box",
            WebkitLineClamp: open ? undefined : 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: open ? "visible" : "hidden",
          }}
        >
          {report.summary}
        </p>

        {/* More button */}
        <button
          className="flex items-center gap-0.5 text-[11px] font-semibold mt-2.5 active:opacity-60 transition-opacity"
          style={{ color: style.color }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "접기" : "더보기"}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>
      </div>

      {/* Full body */}
      {open && (
        <div
          className="border-t px-4 py-4"
          style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}
        >
          {/* Images */}
          {hasImages && (
            <div className="mb-4">
              <ImageGrid
                images={report.images!}
                failedImgs={failedImgs}
                onError={handleImgError}
                onOpen={(src) => setLightbox(src)}
              />
            </div>
          )}

          {/* Category tag below image */}
          {hasImages && (
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: style.bg, color: style.color }}
              >
                {emoji} {report.category}
              </span>
              {report.subject && (
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                  {report.subject}
                </span>
              )}
            </div>
          )}

          {report.body.split("\n").map((line, i) => {
            if (line.startsWith("■")) {
              return (
                <p key={i} className="text-xs font-bold mt-4 mb-1.5 first:mt-0"
                  style={{ color: style.color }}>
                  {line}
                </p>
              );
            }
            if (line.startsWith("•") || line.match(/^[0-9]+\)/)) {
              return (
                <p key={i} className="text-[12px] leading-relaxed pl-3 mb-1"
                  style={{ color: "var(--muted)" }}>
                  {line}
                </p>
              );
            }
            if (line.trim() === "") return <div key={i} className="h-1" />;
            return (
              <p key={i} className="text-[12px] leading-relaxed mb-1"
                style={{ color: "var(--text)" }}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
    </>
  );
}

// ── 투자대가 명언 (날짜 기반 일별 자동 교체) ──────────────────────────────

const GURU_QUOTES = [
  { text: "주식 시장은 인내심 없는 사람의 돈을 인내심 있는 사람에게 이전하는 장치다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "훌륭한 기업을 적정 가격에 사는 것이, 적정 기업을 훌륭한 가격에 사는 것보다 훨씬 낫다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "10년을 보유할 자신이 없다면 10분도 보유하지 마라.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "공포에 탐욕스러워지고, 탐욕에 두려워하라.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "리스크는 자신이 무엇을 하는지 모를 때 발생한다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "가격은 당신이 지불하는 것이고, 가치는 당신이 얻는 것이다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "우리가 가장 좋아하는 보유 기간은 영원이다.", name: "워렌 버핏", en: "Warren Buffett" },
  { text: "좋은 아이디어는 드물다. 기회가 왔을 때 크게 베팅하라.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "천천히 부자가 되는 것에 만족하지 못하는 사람은 빠르게 가난해진다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "기다림은 투자자의 가장 강력한 도구다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "역전시킬 수 없는 실수를 조심하라. 항상 실패 가능성을 전제로 생각하라.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "단순하게 생각하라. 복잡한 것이 반드시 좋은 것은 아니다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "모든 지식을 하나의 관점에서만 보면 세상을 제대로 이해할 수 없다.", name: "찰리 멍거", en: "Charlie Munger" },
  { text: "주가 하락은 투자자에게 위협이 아닌 기회다.", name: "피터 린치", en: "Peter Lynch" },
  { text: "주식에 투자하기 전에 회사에 대해 공부하는 데 최소 5분은 투자해야 한다.", name: "피터 린치", en: "Peter Lynch" },
  { text: "훌륭한 기업을 찾아라, 그리고 오래 기다려라.", name: "피터 린치", en: "Peter Lynch" },
  { text: "자신이 이해하는 것에만 투자하라.", name: "피터 린치", en: "Peter Lynch" },
  { text: "시장을 예측하려 하지 마라. 좋은 기업을 사고 기다려라.", name: "피터 린치", en: "Peter Lynch" },
  { text: "투자의 비결은 기업의 가치를 알고 그보다 싸게 사는 것이다.", name: "피터 린치", en: "Peter Lynch" },
];

function DailyQuote() {
  const today = new Date();
  const seed  = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const q     = GURU_QUOTES[seed % GURU_QUOTES.length];

  return (
    <div
      className="rounded-xl px-4 py-3 mb-3 flex gap-3 items-start"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
    >
      <span className="text-base flex-shrink-0 mt-0.5">💬</span>
      <div className="min-w-0">
        <p className="text-[11px] leading-relaxed italic" style={{ color: "var(--text)", opacity: 0.88 }}>
          &ldquo;{q.text}&rdquo;
        </p>
        <p className="text-[10px] mt-1.5 font-semibold" style={{ color: "var(--muted)" }}>
          — {q.name} <span className="font-normal opacity-60">({q.en})</span>
        </p>
      </div>
    </div>
  );
}

// ── ReportFeed (main export) ──────────────────────────────────────────────

export function ReportFeed() {
  const { user } = useAuth();
  const isPro = user?.isPro === true;

  const recent = SEED_REPORTS.filter(isWithinWeek);

  const latestDateKey = recent.reduce((max, r) => {
    const d = getDateKey(r);
    return d > max ? d : max;
  }, "");

  // 정렬: 최신 날짜 우선 → 최신 날짜 내에서만 핀 우선 → updatedAt 내림차순
  const all = [...recent].sort((a, b) => {
    const da = getDateKey(a);
    const db = getDateKey(b);
    if (da !== db) return da > db ? -1 : 1;
    if (da === latestDateKey) {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
    }
    const ta = a.updatedAt ?? a.date ?? "";
    const tb = b.updatedAt ?? b.date ?? "";
    return tb > ta ? 1 : -1;
  });

  // 열람 가능 vs 잠긴 리포트 분리
  const freeReports   = SUBSCRIPTION_ENABLED
    ? all.filter((r) => isPro || isWithin24h(r))
    : all;
  const lockedReports = SUBSCRIPTION_ENABLED && !isPro
    ? all.filter((r) => !isWithin24h(r))
    : [];

  return (
    <>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-xs font-semibold tracking-widest uppercase font-syne"
            style={{ color: "var(--muted)" }}
          >
            Investus 리포트
          </h2>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            시장 분석 · 종목 인사이트
          </p>
        </div>
        <span className="text-[10px] whitespace-nowrap" style={{ color: "var(--muted)" }}>
          SUNRYU CIO 작성
        </span>
      </div>

      {/* Daily guru quote */}
      <DailyQuote />

      {/* Report cards */}
      {all.length > 0 && (
        <div className="flex flex-col gap-3">
          {/* 열람 가능한 리포트 */}
          {freeReports.map((r) => <ReportCard key={r.id} report={r} />)}

          {/* 잠긴 리포트 — 전체를 하나의 그룹 박스로 묶어서 구독하기 버튼 1개만 표시 */}
          {lockedReports.length > 0 && (
            <LockedReportGroup reports={lockedReports} />
          )}
        </div>
      )}
    </>
  );
}
