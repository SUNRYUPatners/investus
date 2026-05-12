"use client";

import { use, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { StockChart } from "@/components/StockChart";
import { ChevronLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

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

type NewsItem = {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number;
  thumbnail: string | null;
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
function relTime(ts: number): string {
  const s = Math.floor(Date.now() / 1000 - ts);
  if (s < 3600)   return `${Math.floor(s / 60)}분 전`;
  if (s < 86400)  return `${Math.floor(s / 3600)}시간 전`;
  return `${Math.floor(s / 86400)}일 전`;
}

const UP   = "#ff4d6d";
const DOWN = "#00e5a0";

// ── Page ──────────────────────────────────────────────────────────────────

export default function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = use(params);
  const upper      = symbol.toUpperCase();

  const [detail, setDetail] = useState<Detail | null>(null);
  const [news,   setNews]   = useState<NewsItem[]>([]);
  const [detailLoading, setDetailLoading] = useState(true);

  useEffect(() => {
    setDetailLoading(true);
    fetch(`/api/stock-detail?symbol=${encodeURIComponent(upper)}`)
      .then((r) => r.json())
      .then((d) => { setDetail(d); setDetailLoading(false); })
      .catch(() => setDetailLoading(false));

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
                    <span className="text-[8px] shrink-0" style={{ color: "var(--muted)" }}>{label}</span>
                    <span className="text-[8px] font-semibold font-mono-num text-right" style={{ color: "var(--text)" }}>{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 관련 뉴스 ── */}
        {news.length > 0 && (
          <div
            className="mx-4 rounded-2xl border overflow-hidden mb-4"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <h2
                className="text-xs font-semibold tracking-widest uppercase font-syne"
                style={{ color: "var(--muted)" }}
              >
                관련 뉴스
              </h2>
            </div>

            <div>
              {news.filter((n) => n.link).map((n, i) => (
                <a
                  key={n.uuid}
                  href={n.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 px-4 py-3.5 transition-opacity hover:opacity-70 active:opacity-50 cursor-pointer"
                  style={{
                    borderBottom: i < news.length - 1 ? "1px solid var(--border)" : "none",
                    textDecoration: "none",
                  }}
                >
                  {/* Thumbnail */}
                  {n.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={n.thumbnail}
                      alt=""
                      className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] leading-snug line-clamp-2 font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {n.title}
                    </p>
                    <p className="text-[11px] mt-1" style={{ color: "var(--muted)" }}>
                      {n.publisher} · {relTime(n.providerPublishTime)}
                    </p>
                  </div>

                  <ExternalLink
                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                    style={{ color: "var(--muted)" }}
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Loading skeleton for news */}
        {news.length === 0 && !detailLoading && (
          <div
            className="mx-4 rounded-2xl border overflow-hidden mb-4"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xs font-semibold tracking-widest uppercase font-syne"
                style={{ color: "var(--muted)" }}>
                관련 뉴스
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((k) => (
                <div key={k} className="flex gap-3">
                  <div className="w-16 h-12 rounded-lg animate-pulse flex-shrink-0"
                    style={{ background: "var(--border)" }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded animate-pulse" style={{ background: "var(--border)" }} />
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
