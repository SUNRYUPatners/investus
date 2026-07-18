"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { StockChart } from "@/components/StockChart";
import { NewsCard } from "@/components/NewsCard";
import { ChevronLeft, ChevronDown, Search, X } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";
import type { NewsItem } from "@/lib/api";
import { SEED_REPORTS, REPORT_TICKERS, CATEGORY_STYLE, CATEGORY_EMOJI } from "@/lib/reports";
import type { Report } from "@/lib/reports";
import { isMarketOpen as checkMarketOpen } from "@/lib/marketHours";
import { AdFitBanner } from "@/components/AdFitBanner";
import { AnalystTargets } from "@/components/AnalystTargets";
import { StockCommunity } from "@/components/StockCommunity";
import { useAuth } from "@/hooks/useAuth";
import { SUBSCRIPTION, isFreeReport, formatSubPrice } from "@/lib/subscription";
import { SubscribeGate } from "@/components/SubscribeGate";

// ── Types ──────────────────────────────────────────────────────────────────

type Detail = {
  symbol: string;
  name: string;
  exchange: string;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  pe: number | null;
  marketCap: number | null;
  week52High: number | null;
  week52Low: number | null;
  avgVolume: number | null;
  dividendYield: number | null;
  beta: number | null;
  eps: number | null;
};


// ── Formatters ─────────────────────────────────────────────────────────────

function fmtUSD(v: number | null): string {
  if (v == null) return "—";
  return "$" + v.toFixed(2);
}
function fmtVolKo(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1e8)  return (v / 1e8).toFixed(1) + "억";
  if (v >= 1e4)  return Math.round(v / 1e4).toLocaleString() + "만";
  return v.toLocaleString("ko-KR");
}
function fmtVolEn(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1e9)  return (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6)  return (v / 1e6).toFixed(1) + "M";
  if (v >= 1e3)  return (v / 1e3).toFixed(1) + "K";
  return v.toLocaleString();
}
function fmtCapKo(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1e12) return (v / 1e12).toFixed(2) + "조";
  if (v >= 1e8)  return Math.round(v / 1e8) + "억";
  return "$" + v.toLocaleString();
}
function fmtCapEn(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1e12) return "$" + (v / 1e12).toFixed(2) + "T";
  if (v >= 1e9)  return "$" + (v / 1e9).toFixed(2) + "B";
  if (v >= 1e6)  return "$" + (v / 1e6).toFixed(2) + "M";
  return "$" + v.toLocaleString();
}
function fmtNum(v: number | null, dp = 2): string {
  return v == null ? "—" : v.toFixed(dp);
}
function fmtPct(v: number | null): string {
  return v == null ? "—" : (v * 100).toFixed(2) + "%";
}

const UP   = "#10b981";
const DOWN = "#ef4444";

// Use the shared lib which includes NYSE holidays + DST
const isMarketOpen = checkMarketOpen;

// ── Investus 리포트 카드 — ReportFeed 스타일 그대로 ──────────────────────────
function ReportCard({ r }: { r: Report }) {
  const [open, setOpen] = useState(false);
  const style = CATEGORY_STYLE[r.categoryColor];
  const emoji = CATEGORY_EMOJI[r.category];
  const hasImages = (r.images?.length ?? 0) > 0;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* 요약 영역 */}
      <div className="p-4">
        {/* 카테고리 + subject + 날짜 */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: style.bg, color: style.color }}
          >
            {emoji} {r.category}
          </span>
          {r.subject && (
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}
            >
              {r.subject}
            </span>
          )}
          <span
            className="text-[9px] font-mono-num tabular-nums ml-auto flex-shrink-0"
            style={{ color: "var(--muted)", opacity: 0.7 }}
          >
            {r.updatedAt ?? r.date}
          </span>
        </div>

        {/* 제목 */}
        <h3 className="text-sm font-bold leading-snug mb-2" style={{ color: "var(--text)" }}>
          {r.title}
        </h3>

        {/* 요약 — 3줄 클램프, 펼치면 전체 */}
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
          {r.summary}
        </p>

        {/* 더 보기 버튼 */}
        <button
          className="flex items-center gap-0.5 text-[11px] font-semibold mt-2.5 active:opacity-60 transition-opacity"
          style={{ color: style.color, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "접기" : "더 보기"}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </button>
      </div>

      {/* 전체 본문 — 펼쳤을 때만 */}
      {open && (
        <div
          className="border-t px-4 py-4"
          style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}
        >
          {/* 이미지 — 펼쳤을 때만 표시 */}
          {hasImages && (
            <div className="flex flex-col gap-2 mb-4">
              {r.images!.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" className="w-full rounded-xl"
                  style={{ objectFit: "contain" }} />
              ))}
            </div>
          )}

          {/* 본문 파싱 — ReportFeed와 동일 */}
          {!r.imageOnly && r.body && r.body.split("\n").map((line, i) => {
            if (line.startsWith("■"))
              return <p key={i} className="text-xs font-bold mt-4 mb-1.5 first:mt-0" style={{ color: style.color }}>{line}</p>;
            if (line.startsWith("•") || line.match(/^[0-9]+\)/))
              return <p key={i} className="text-[12px] leading-relaxed pl-3 mb-1" style={{ color: "var(--muted)" }}>{line}</p>;
            if (line.trim() === "")
              return <div key={i} className="h-1" />;
            return <p key={i} className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--text)" }}>{line}</p>;
          })}
        </div>
      )}
    </div>
  );
}

// ── Investus 리포트 섹션 ────────────────────────────────────────────────────
function getDateKey(r: Report): string {
  const s = r.updatedAt ?? r.date ?? "";
  return s.split(" ")[0].replace(/\./g, "-");
}

function StockReports({ symbol, className = "" }: { symbol: string; className?: string }) {
  const [showOlder, setShowOlder] = useState(false);
  const [query, setQuery]         = useState("");
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const isPro = user?.isPro === true;
  const gateOn = SUBSCRIPTION.enabled && !isPro;

  const allReports: Report[] = SEED_REPORTS
    .filter(
      (r) =>
        REPORT_TICKERS[r.id]?.includes(symbol) &&
        !r.subject?.includes("한장 요약"),
    )
    .sort((a, b) => getDateKey(b).localeCompare(getDateKey(a)));

  if (allReports.length === 0) return null;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? allReports.filter((r) =>
        [r.title, r.summary, r.body, r.subject, r.titleEn, r.summaryEn]
          .filter(Boolean)
          .some((s) => s!.toLowerCase().includes(q))
      )
    : allReports;

  const latestDate   = getDateKey(allReports[0]);
  const latestGroup  = filtered.filter((r) => !q && getDateKey(r) === latestDate);
  const olderReports = filtered.filter((r) => !q && getDateKey(r) !== latestDate);

  // 오늘(KST) 리포트는 항상 무료 공개 — 최신 그룹이 어제여도 오늘자가 있으면 먼저 노출
  const todayFree = gateOn
    ? filtered.filter((r) => !q && isFreeReport(r))
    : [];
  const freeLatest = gateOn
    ? (todayFree.length > 0 ? todayFree : latestGroup.filter((r) => isFreeReport(r)))
    : latestGroup;
  const lockedLatest = gateOn
    ? latestGroup.filter((r) => !isFreeReport(r) && !freeLatest.some((f) => f.id === r.id))
    : [];
  const olderForGate = gateOn
    ? olderReports.filter((r) => !isFreeReport(r) && !freeLatest.some((f) => f.id === r.id))
    : olderReports;
  const olderLocked = gateOn;

  return (
    <div className={className}>
      {/* 헤더 행 */}
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-xs font-semibold tracking-widest uppercase font-syne"
          style={{ color: "var(--muted)" }}
        >
          Investus 리포트
        </h2>
        <button
          onClick={() => {
            setSearching((v) => {
              if (!v) setTimeout(() => inputRef.current?.focus(), 50);
              else { setQuery(""); }
              return !v;
            });
          }}
          className="p-1.5 rounded-lg transition-colors active:opacity-60"
          style={{
            color: searching ? "var(--accent)" : "var(--muted)",
            background: searching ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
          }}
          aria-label="리포트 검색"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 검색창 */}
      {searching && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl mb-3 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--muted)" }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="키워드 검색 (예: FSD, 목표주가, Optimus)"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-xs"
            style={{ color: "var(--text)", caretColor: "var(--accent)" }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="shrink-0 active:opacity-60">
              <X className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
            </button>
          )}
        </div>
      )}

      {/* 검색 결과 */}
      {q ? (
        filtered.length > 0 ? (
          <>
            <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>
              &ldquo;{query}&rdquo; — {filtered.length}건
            </p>
            <div className="flex flex-col gap-3">
              {(gateOn ? filtered.filter((r) => isFreeReport(r)) : filtered).map((r) => (
                <ReportCard key={r.id} r={r} />
              ))}
            </div>
            {gateOn && filtered.some((r) => !isFreeReport(r)) && (
              <div className="mt-3">
                <SubscribeGate
                  compact
                  title={`이전 리포트 ${filtered.filter((r) => !isFreeReport(r)).length}건 잠김`}
                  description="오늘자만 무료 · 과거 리포트는 Pro 구독 후 열람"
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-center py-6" style={{ color: "var(--muted)" }}>
            검색 결과 없음
          </p>
        )
      ) : (
        /* 기본 뷰 (최신 + 이전) */
        <>
          <div className="flex flex-col gap-3">
            {freeLatest.map((r) => <ReportCard key={r.id} r={r} />)}
          </div>

          {lockedLatest.length > 0 && (
            <div className="mt-3">
              <SubscribeGate
                compact
                title={`리포트 ${lockedLatest.length}건 · Pro 전용`}
                description="오늘자가 아닌 리포트는 구독 후 열람할 수 있습니다"
              />
            </div>
          )}

          {olderForGate.length > 0 && (
            <>
              {olderLocked ? (
                <div className="mt-3">
                  <SubscribeGate
                    compact
                    title={`이전 리포트 ${olderForGate.length}건`}
                    description={`오늘자 리포트는 무료 · 과거 열람은 월 ${formatSubPrice()}`}
                  />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowOlder((v) => !v)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs py-2.5 mt-3 rounded-xl border active:opacity-60 transition-opacity"
                    style={{
                      color: "var(--muted)",
                      borderColor: "var(--border)",
                      background: "var(--card)",
                      cursor: "pointer",
                    }}
                  >
                    {showOlder ? "접기" : `이전 리포트 ${olderForGate.length}개 더 보기`}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform"
                      style={{ transform: showOlder ? "rotate(180deg)" : "none" }}
                    />
                  </button>

                  {showOlder && (
                    <div className="flex flex-col gap-3 mt-3">
                      {olderForGate.map((r) => <ReportCard key={r.id} r={r} />)}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = use(params);
  const upper      = symbol.toUpperCase();
  const router     = useRouter();
  const { list: watchlist, toggle: toggleWatchlist } = useWatchlist();
  const t          = useLocale();
  const locale     = useLocaleCode();
  const fmtVol     = locale === "en" ? fmtVolEn : fmtVolKo;
  const fmtCap     = locale === "en" ? fmtCapEn : fmtCapKo;

  const [detail, setDetail]           = useState<Detail | null>(null);
  const [news,   setNews]             = useState<NewsItem[]>([]);
  const [detailLoading, setDetailLoading] = useState(true);

  const fetchDetailRef = useRef<() => void>(() => {});

  // market-data-cache의 해당 심볼 가격 조회 (홈탭과 동일한 숫자 보장)
  const getMarketCachePrice = (): { price: number; change: number; changePercent: number } | null => {
    try {
      const raw = localStorage.getItem("market-data-cache");
      if (!raw) return null;
      const md = JSON.parse(raw) as {
        quotes?: { symbol: string; price: number; change: number; changePercent: number }[];
        indices?: { symbol: string; value: number; change: number; changePercent: number }[];
      };
      const q = md?.quotes?.find((q) => q.symbol === upper);
      if (q && q.price > 0) return { price: q.price, change: q.change, changePercent: q.changePercent };
      const idx = md?.indices?.find((i) => i.symbol === upper);
      if (idx && idx.value > 0) return { price: idx.value, change: idx.change, changePercent: idx.changePercent };
    } catch { /* ignore */ }
    return null;
  };

  const fetchDetail = () => {
    const cacheKey = `stock-detail-${upper}`;

    // 홈탭과 동일한 가격: market-data-cache에서 먼저 읽기
    const marketPrice = getMarketCachePrice();

    // Load cached detail first — prevents skeleton flash on revisit
    let hasCached = false;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        const d = JSON.parse(raw) as Detail;
        if (d?.price) {
          // market-data 캐시 가격이 있으면 덮어쓰기 (홈탭·상단바·차트 일치)
          setDetail(marketPrice ? { ...d, ...marketPrice } : d);
          setDetailLoading(false);
          hasCached = true;
        }
      }
    } catch { /* ignore */ }

    // market-data 캐시 가격만 있고 detail 캐시 없으면 미리 가격 표시
    if (!hasCached && marketPrice) {
      setDetail((prev) => prev
        ? { ...prev, ...marketPrice }
        : { symbol: upper, name: upper, exchange: "US", currency: "USD", ...marketPrice,
            open: null, high: null, low: null, volume: null, pe: null, marketCap: null,
            week52High: null, week52Low: null, avgVolume: null, dividendYield: null, beta: null, eps: null });
      setDetailLoading(false);
      hasCached = true;
    }

    if (!hasCached) setDetailLoading(true);


    const tryFetch = (delay: number) => {
      fetch(`/api/stock-detail?symbol=${encodeURIComponent(upper)}`, { cache: "no-store" })
        .then((r) => {
          // 503 = 일시적 오류 → 재시도. 그 외 non-ok = 심볼 없음
          if (r.status === 503) throw Object.assign(new Error("retry"), { retry: true });
          if (!r.ok) throw new Error("not-found");
          return r.json();
        })
        .then((d: Detail) => {
          const latestMarketPrice = getMarketCachePrice();
          const final = latestMarketPrice ? { ...d, ...latestMarketPrice } : d;
          setDetail(final);
          setDetailLoading(false);
          try { localStorage.setItem(cacheKey, JSON.stringify(d)); } catch { /* ignore */ }
        })
        .catch(() => {
          // 503이든 네트워크 오류든 모두 재시도 — 절대 에러 상태 표시 금지
          // 기존 데이터 있으면 그대로 유지하고 백그라운드 재시도
          setDetail((prev) => {
            if (!prev) {
              // 데이터 없을 때: 스켈레톤 유지하면서 재시도
              const next = Math.min(delay * 2, 10_000);
              setTimeout(() => tryFetch(next), delay);
            }
            return prev;
          });
          setDetailLoading(false);
        });
    };

    tryFetch(1500);
  };

  fetchDetailRef.current = fetchDetail;

  useEffect(() => {
    fetchDetailRef.current();

    fetch(`/api/stock-news?symbol=${encodeURIComponent(upper)}`)
      .then((r) => r.json())
      .then(setNews)
      .catch(() => {});

    // 장중 60초마다 자동 갱신 — market-data-cache 가격 먼저 반영 후 API 호출
    const timer = setInterval(() => {
      if (!isMarketOpen()) return;
      const mp = getMarketCachePrice();
      if (mp) setDetail((prev) => prev ? { ...prev, ...mp } : prev);
      fetchDetailRef.current();
    }, 60_000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upper]);

  const isUp  = (detail?.changePercent ?? 0) >= 0;
  const color = isUp ? UP : DOWN;

  // Stats grid — matches screenshot layout
  const stats: [string, string][] = detail
    ? [
        [t.stock.open,          fmtUSD(detail.open)],
        [t.stock.volume,        fmtVol(detail.volume)],
        [t.stock.week52High,    fmtUSD(detail.week52High)],
        [t.stock.dividendYield, fmtPct(detail.dividendYield)],
        [t.stock.dayHigh,       fmtUSD(detail.high)],
        [t.stock.pe,            fmtNum(detail.pe)],
        [t.stock.week52Low,     fmtUSD(detail.week52Low)],
        [t.stock.beta,          fmtNum(detail.beta)],
        [t.stock.dayLow,        fmtUSD(detail.low)],
        [t.stock.marketCap,     fmtCap(detail.marketCap)],
        [t.stock.avgVolume,     fmtVol(detail.avgVolume)],
        [t.stock.eps,           detail.eps != null ? "$" + detail.eps.toFixed(2) : "—"],
      ]
    : [];

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] mx-auto lg:max-w-none lg:px-8 lg:pb-10">

        {/* 뒤로가기 + 공유 */}
        <div className="px-4 lg:px-0 pt-4 pb-2 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> {t.stock.back}
          </button>
          <ShareButton
            title={`${upper} ${detail?.name ?? ""} 주가 | Investus`}
            text={`${upper} 실시간 주가 · 차트 · 분석 — Investus 인베스트어스`}
            url={`https://www.investus.kr/stock/${upper}`}
            size="sm"
          />
        </div>

        {/* 홈탭과 동일: flex gap-8 */}
        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* ── 왼쪽 컬럼 ── */}
          <div className="lg:flex-1 lg:min-w-0">
            {/* 종목 헤더 — 모바일 */}
            <div className="px-4 pb-4 lg:hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold font-syne" style={{ color: "var(--text)" }}>{upper}</h1>
                    <button
                      onClick={() => toggleWatchlist(upper)}
                      className="flex-shrink-0 active:scale-90 transition-transform"
                      aria-label={watchlist.includes(upper) ? t.stock.watchlistRemove : t.stock.watchlistAdd}
                    >
                      <span className="text-xl leading-none" style={{
                        color: watchlist.includes(upper) ? "#facc15" : "var(--border)",
                        filter: watchlist.includes(upper) ? "drop-shadow(0 0 5px #facc15)" : "none",
                      }}>★</span>
                    </button>
                  </div>
                  {detailLoading
                    ? <div className="h-4 w-32 rounded animate-pulse mt-1" style={{ background: "var(--card)" }} />
                    : <p className="text-sm leading-snug" style={{ color: "var(--muted)" }}>{detail?.name ?? "—"}</p>}
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                    {detail ? `${detail.exchange} · ${detail.currency}` : ""}
                  </p>
                </div>
                {detail ? (
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold font-mono-num" style={{ color: "var(--text)" }}>
                      ${detail.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-mono-num mt-0.5" style={{ color }}>
                      {isUp ? "+" : ""}{detail.change.toFixed(2)}&nbsp;
                      <span className="text-xs">({isUp ? "+" : ""}{detail.changePercent.toFixed(2)}%)</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="h-7 w-24 rounded animate-pulse" style={{ background: "var(--card)" }} />
                    <div className="h-4 w-20 rounded animate-pulse" style={{ background: "var(--card)" }} />
                  </div>
                )}
              </div>
            </div>

            {/* 종목 헤더 — 데스크탑 */}
            <div className="hidden lg:block pb-4">
              <div className="flex items-start gap-3 mb-1">
                <h1 className="text-3xl font-bold font-syne" style={{ color: "var(--text)" }}>{upper}</h1>
                <button
                  onClick={() => toggleWatchlist(upper)}
                  className="mt-1 flex-shrink-0 active:scale-90 transition-transform"
                  aria-label={watchlist.includes(upper) ? t.stock.watchlistRemove : t.stock.watchlistAdd}
                >
                  <span className="text-2xl leading-none" style={{
                    color: watchlist.includes(upper) ? "#facc15" : "var(--border)",
                    filter: watchlist.includes(upper) ? "drop-shadow(0 0 5px #facc15)" : "none",
                  }}>★</span>
                </button>
              </div>
              {detailLoading
                ? <div className="h-5 w-48 rounded animate-pulse" style={{ background: "var(--card)" }} />
                : <p className="text-base leading-snug" style={{ color: "var(--muted)" }}>{detail?.name ?? "—"}</p>}
              <p className="text-xs mt-0.5 mb-3" style={{ color: "var(--muted)" }}>
                {detail ? `${detail.exchange} · ${detail.currency}` : ""}
              </p>
              {detail ? (
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-bold font-mono-num" style={{ color: "var(--text)" }}>
                    ${detail.price.toFixed(2)}
                  </p>
                  <p className="text-lg font-mono-num" style={{ color }}>
                    {isUp ? "+" : ""}{detail.change.toFixed(2)}&nbsp;
                    <span className="text-sm">({isUp ? "+" : ""}{detail.changePercent.toFixed(2)}%)</span>
                  </p>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="h-10 w-36 rounded animate-pulse" style={{ background: "var(--card)" }} />
                  <div className="h-6 w-24 rounded animate-pulse mt-2" style={{ background: "var(--card)" }} />
                </div>
              )}
            </div>

            {/* 차트 */}
            <div
              className="mx-4 lg:mx-0 rounded-2xl border overflow-hidden mb-4"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <StockChart
                symbol={upper}
                livePrice={detail?.price}
                liveChange={detail?.change}
                liveChangePercent={detail?.changePercent}
                onPriceLoaded={(price, change, changePercent) => {
                  setDetail((prev) => {
                    if (prev && prev.price > 0) return prev;
                    return {
                      symbol: upper, name: prev?.name ?? upper,
                      exchange: prev?.exchange ?? "US", currency: prev?.currency ?? "USD",
                      price, change, changePercent,
                      open: null, high: null, low: null, volume: null,
                      pe: null, marketCap: null, week52High: null, week52Low: null,
                      avgVolume: null, dividendYield: null, beta: null, eps: null,
                    };
                  });
                  setDetailLoading(false);
                }}
              />
            </div>

            {/* 주요 지표 */}
            {stats.length > 0 && (
              <div
                className="mx-4 lg:mx-0 rounded-xl border overflow-hidden mb-4"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="grid grid-cols-4">
                  {stats.map(([label, value], i) => {
                    const cols = 4;
                    const total = stats.length;
                    const lastRowStart = total - (total % cols || cols);
                    const isLastRow = i >= lastRowStart;
                    const colIdx = i % cols;
                    return (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-1 px-2.5 py-1.5"
                        style={{
                          borderColor: "var(--border)",
                          borderBottomWidth: isLastRow ? "0px" : "1px",
                          borderRightWidth: colIdx < cols - 1 ? "1px" : "0px",
                          borderStyle: "solid",
                        }}
                      >
                        <span className="text-[9px] shrink-0" style={{ color: "var(--muted)" }}>{label}</span>
                        <span className="text-[9px] font-semibold font-mono-num text-right whitespace-nowrap" style={{ color: "var(--text)" }}>{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 광고 — 지표와 리포트 사이 */}
            <div className="mx-4 lg:mx-0 mb-4">
              <AdFitBanner />
            </div>

            {/* 리포트 — 지표 바로 아래 (모바일 + 데스크탑 공통) */}
            <StockReports symbol={upper} className="mx-4 lg:mx-0 mb-4" />

            {/* 애널리스트 의견 — 모바일 전용 (리포트 아래) */}
            <div className="lg:hidden mx-4 mb-4">
              <AnalystTargets symbol={upper} currentPrice={detail?.price ?? null} />
            </div>

            {/* 해당 종목 애널리스트 글 + 종목토론 */}
            <StockCommunity symbol={upper} className="mx-4 lg:mx-0 mb-4" />

            {/* 광고 — 리포트와 뉴스 사이 (모바일) */}
            <div className="lg:hidden mx-4 mb-4">
              <AdFitBanner />
            </div>

            {/* 광고 — 뉴스 아래 (모바일) */}
            <div className="lg:hidden mx-4 mb-4">
              <AdFitBanner />
            </div>

            {/* 뉴스 — 모바일 전용 */}
            <div className="lg:hidden mx-4 mb-4">
              <h2 className="text-xs font-semibold tracking-widest uppercase font-syne mb-3"
                style={{ color: "var(--muted)" }}>
                {t.stock.relatedNews}
              </h2>
              {news.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {news.map((n) => <NewsCard key={n.id} item={n} />)}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="rounded-2xl p-4 border flex gap-3"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                      <div className="w-10 rounded-xl animate-pulse flex-shrink-0"
                        style={{ background: "var(--border)", minHeight: 44 }} />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3.5 rounded animate-pulse" style={{ background: "var(--border)" }} />
                        <div className="h-3 w-2/3 rounded animate-pulse" style={{ background: "var(--border)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* 광고 — 페이지 맨 아래 (모바일) */}
            <div className="lg:hidden mx-4 mb-4">
              <AdFitBanner />
            </div>
          </div>

          {/* ── 오른쪽 사이드바 — 홈탭과 동일한 구조 ── */}
          <div className="hidden lg:flex lg:flex-col lg:w-[340px] lg:flex-shrink-0 lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)] lg:overflow-y-auto no-scrollbar gap-5 pb-10">
            <AdFitBanner />
            <AnalystTargets symbol={upper} currentPrice={detail?.price ?? null} />
            <div
              className="rounded-2xl border p-4"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <h2 className="text-xs font-semibold tracking-widest uppercase font-syne mb-3"
                style={{ color: "var(--muted)" }}>
                {t.stock.relatedNews}
              </h2>
              {news.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {news.map((n) => <NewsCard key={n.id} item={n} />)}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {[1, 2, 3].map((k) => (
                    <div key={k} className="rounded-xl p-3 border flex gap-2"
                      style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                      <div className="w-8 rounded-lg animate-pulse flex-shrink-0"
                        style={{ background: "var(--border)", minHeight: 36 }} />
                      <div className="flex-1 space-y-2 py-0.5">
                        <div className="h-3 rounded animate-pulse" style={{ background: "var(--border)" }} />
                        <div className="h-2.5 w-2/3 rounded animate-pulse" style={{ background: "var(--border)" }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
