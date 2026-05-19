"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { StockChart } from "@/components/StockChart";
import { NewsCard } from "@/components/NewsCard";
import { ChevronLeft } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import type { NewsItem } from "@/lib/api";

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
function fmtVol(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1e8)  return (v / 1e8).toFixed(1) + "억";
  if (v >= 1e4)  return Math.round(v / 1e4).toLocaleString() + "만";
  return v.toLocaleString("ko-KR");
}
function fmtCap(v: number | null): string {
  if (v == null) return "—";
  if (v >= 1e12) return (v / 1e12).toFixed(2) + "조";
  if (v >= 1e8)  return Math.round(v / 1e8) + "억";
  if (v >= 1e9)  return (v / 1e9).toFixed(2) + "B";
  return "$" + v.toLocaleString();
}
function fmtNum(v: number | null, dp = 2): string {
  return v == null ? "—" : v.toFixed(dp);
}
function fmtPct(v: number | null): string {
  return v == null ? "—" : (v * 100).toFixed(2) + "%";
}

const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

function isMarketOpen(): boolean {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
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
        ["개장가",     fmtUSD(detail.open)],
        ["거래량",     fmtVol(detail.volume)],
        ["52주 최고",  fmtUSD(detail.week52High)],
        ["수익률",     fmtPct(detail.dividendYield)],
        ["최고가",     fmtUSD(detail.high)],
        ["PER",        fmtNum(detail.pe)],
        ["52주 최저",  fmtUSD(detail.week52Low)],
        ["베타",       fmtNum(detail.beta)],
        ["최저가",     fmtUSD(detail.low)],
        ["시가총액",   fmtCap(detail.marketCap)],
        ["평균 거래량", fmtVol(detail.avgVolume)],
        ["주당순이익", detail.eps != null ? "$" + detail.eps.toFixed(2) : "—"],
      ]
    : [];

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="max-w-[480px] lg:max-w-2xl mx-auto pb-24 lg:pb-10">
        {/* Back button + watchlist star */}
        <div className="px-4 pt-4 pb-2 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> 뒤로
          </button>
          <button
            onClick={() => toggleWatchlist(upper)}
            className="w-9 h-9 flex items-center justify-center rounded-xl active:scale-90 transition-transform"
            style={{ background: "var(--card)" }}
            aria-label={watchlist.includes(upper) ? "관심종목 제거" : "관심종목 추가"}
          >
            <span
              className="text-xl leading-none"
              style={{
                color: watchlist.includes(upper) ? "#facc15" : "var(--border)",
                filter: watchlist.includes(upper) ? "drop-shadow(0 0 5px #facc15)" : "none",
              }}
            >
              ★
            </span>
          </button>
        </div>

        {/* ── 종목 헤더 ── */}
        <div className="px-4 pb-4">
          <div className="flex items-start justify-between gap-4">
            {/* Left: symbol + name */}
            <div>
              <h1 className="text-2xl font-bold font-syne" style={{ color: "var(--text)" }}>
                {upper}
              </h1>
              {detailLoading ? (
                <div className="h-4 w-32 rounded animate-pulse mt-1"
                  style={{ background: "var(--card)" }} />
              ) : (
                <p className="text-sm leading-snug" style={{ color: "var(--muted)" }}>
                  {detail?.name ?? "—"}
                </p>
              )}
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                {detail ? `${detail.exchange} · ${detail.currency}` : ""}
              </p>
            </div>

            {/* Right: price + change */}
            {detail ? (
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold font-mono-num" style={{ color: "var(--text)" }}>
                  ${detail.price.toFixed(2)}
                </p>
                <p className="text-sm font-mono-num mt-0.5" style={{ color }}>
                  {isUp ? "+" : ""}{detail.change.toFixed(2)}&nbsp;
                  <span className="text-xs">
                    ({isUp ? "+" : ""}{detail.changePercent.toFixed(2)}%)
                  </span>
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

        {/* ── 차트 ── */}
        <div
          className="mx-4 rounded-2xl border overflow-hidden mb-4"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <StockChart
            symbol={upper}
            livePrice={detail?.price}
            liveChange={detail?.change}
            liveChangePercent={detail?.changePercent}
            onPriceLoaded={(price, change, changePercent) => {
              // stock-detail이 없을 때 차트 데이터로 가격 표시
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

        {/* ── 주요 지표 ── */}
        {stats.length > 0 && (
          <div
            className="mx-4 rounded-xl border overflow-hidden mb-3"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="grid grid-cols-4">
              {stats.map(([label, value], i) => {
                const cols         = 4;
                const total        = stats.length;
                const lastRowStart = total - (total % cols || cols);
                const isLastRow    = i >= lastRowStart;
                const colIdx       = i % cols;
                return (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-1 px-2.5 py-1.5"
                    style={{
                      borderColor:       "var(--border)",
                      borderBottomWidth: isLastRow ? "0px" : "1px",
                      borderRightWidth:  colIdx < cols - 1 ? "1px" : "0px",
                      borderStyle:       "solid",
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

        {/* ── 관련 뉴스 ── */}
        {news.length > 0 && (
          <div className="mx-4 mb-4">
            <h2
              className="text-xs font-semibold tracking-widest uppercase font-syne mb-3"
              style={{ color: "var(--muted)" }}
            >
              관련 뉴스
            </h2>
            <div className="flex flex-col gap-3">
              {news.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        )}

        {/* Loading skeleton for news */}
        {news.length === 0 && !detailLoading && (
          <div className="mx-4 mb-4">
            <h2
              className="text-xs font-semibold tracking-widest uppercase font-syne mb-3"
              style={{ color: "var(--muted)" }}
            >
              관련 뉴스
            </h2>
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
          </div>
        )}
      </main>
    </div>
  );
}
