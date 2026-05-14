"use client";

import { use, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { StockChart } from "@/components/StockChart";
import { NewsCard } from "@/components/NewsCard";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
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
  if (v >= 1e12) return (v / 1e12).toFixed(3) + "조";
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

// ── Page ──────────────────────────────────────────────────────────────────

export default function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = use(params);
  const upper      = symbol.toUpperCase();

  const [detail, setDetail]           = useState<Detail | null>(null);
  const [news,   setNews]             = useState<NewsItem[]>([]);
  const [detailLoading, setDetailLoading] = useState(true);
  const [detailError, setDetailError] = useState(false);

  const fetchDetail = () => {
    const cacheKey = `stock-detail-${upper}`;

    // Load cached detail first — prevents skeleton flash on revisit
    let hasCached = false;
    try {
      const raw = localStorage.getItem(cacheKey);
      if (raw) {
        const d = JSON.parse(raw) as Detail;
        if (d?.price) { setDetail(d); setDetailLoading(false); hasCached = true; }
      }
    } catch { /* ignore */ }

    if (!hasCached) setDetailLoading(true); // only show spinner if nothing cached
    setDetailError(false);
    fetch(`/api/stock-detail?symbol=${encodeURIComponent(upper)}`)
      .then((r) => { if (!r.ok) throw new Error("no data"); return r.json(); })
      .then((d: Detail) => {
        setDetail(d);
        setDetailLoading(false);
        try { localStorage.setItem(cacheKey, JSON.stringify(d)); } catch { /* ignore */ }
      })
      .catch(() => {
        setDetailLoading(false);
        // Keep cached detail visible; only show error button if nothing loaded
        setDetail((prev) => { if (!prev) setDetailError(true); return prev; });
      });
  };

  useEffect(() => {
    fetchDetail();

    fetch(`/api/stock-news?symbol=${encodeURIComponent(upper)}`)
      .then((r) => r.json())
      .then(setNews)
      .catch(() => {});
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
        {/* Back button */}
        <div className="px-4 pt-4 pb-2">
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-xs"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> 검색으로
          </Link>
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
            {detailError ? (
              <button
                onClick={fetchDetail}
                className="text-xs px-3 py-2 rounded-xl font-semibold flex-shrink-0"
                style={{ background: "rgba(255,77,109,0.12)", color: "#ff4d6d" }}
              >
                다시 시도
              </button>
            ) : detail ? (
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
          <StockChart symbol={upper} />
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
                    <span className="text-[9px] font-semibold font-mono-num text-right" style={{ color: "var(--text)" }}>{value}</span>
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
