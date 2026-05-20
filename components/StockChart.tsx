"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";

const PERIODS = ["1D", "YTD", "1Y", "5Y", "10Y", "ALL"] as const;
type Period = (typeof PERIODS)[number];

type Point = { ts: number; close: number; volume: number };
type ChartData = {
  chartPreviousClose: number | null;
  regularMarketPrice: number | null;
  points: Point[];
};

// Chart layout constants
const PAD   = { top: 10, right: 56, bottom: 22, left: 2 };
const CH    = 210;
const VH    = 48;
const GAP   = 4;
const SVG_H = PAD.top + CH + GAP + VH + PAD.bottom;

const UP   = "#10b981";
const DOWN = "#ef4444";

function xFmt(ts: number, period: Period): string {
  const d = new Date(ts * 1000);
  if (period === "1D")
    return d.toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: false,
      timeZone: "America/New_York",
    });
  if (period === "YTD")
    return `${d.getMonth() + 1}/${d.getDate()}`;
  if (period === "1Y")
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()];
  return String(d.getFullYear());
}

function fullFmt(ts: number, period: Period, locale: "ko" | "en"): string {
  const d = new Date(ts * 1000);
  const lang = locale === "ko" ? "ko-KR" : "en-US";
  if (period === "1D")
    return d.toLocaleString(lang, {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
      timeZone: "America/New_York",
    }) + " EST";
  return d.toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" });
}

function fmtVol(v: number, locale: "ko" | "en"): string {
  if (locale === "ko") {
    if (v >= 1e8) return (v / 1e8).toFixed(1) + "억";
    if (v >= 1e4) return Math.round(v / 1e4).toLocaleString() + "만";
    return v.toLocaleString("ko-KR");
  }
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(1) + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(1) + "K";
  return v.toLocaleString();
}

function cacheKey(symbol: string, period: string) {
  return `chart-${symbol}-${period}`;
}

function readCache(symbol: string, period: string): ChartData | null {
  try {
    const raw = localStorage.getItem(cacheKey(symbol, period));
    if (!raw) return null;
    const d = JSON.parse(raw) as ChartData;
    return d.points?.length ? d : null;
  } catch { return null; }
}

function writeCache(symbol: string, period: string, data: ChartData) {
  try { localStorage.setItem(cacheKey(symbol, period), JSON.stringify(data)); } catch { /* ignore */ }
}

export function StockChart({
  symbol,
  livePrice,
  liveChange,
  liveChangePercent,
  onPriceLoaded,
}: {
  symbol: string;
  livePrice?: number;
  liveChange?: number;
  liveChangePercent?: number;
  onPriceLoaded?: (price: number, change: number, changePercent: number) => void;
}) {
  const t    = useLocale();
  const lc   = useLocaleCode();
  const [period, setPeriod]   = useState<Period>("1D");
  const [data, setData]       = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchFailed, setFetchFailed] = useState(false); // true only when API failed AND no cache
  const [hover, setHover]     = useState<number | null>(null);
  const svgRef                = useRef<SVGSVGElement>(null);
  const [W, setW]             = useState(480);

  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const obs = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    obs.observe(el);
    setW(el.clientWidth);
    return () => obs.disconnect();
  }, []);

  const doFetch = (sym: string, per: Period, retryDelay = 0) => {
    // Load cache immediately (shows stale data while refreshing)
    const cached = readCache(sym, per);
    if (cached) {
      setData(cached);
      setLoading(false);
      setFetchFailed(false);
    } else if (retryDelay === 0) {
      setLoading(true);
      setFetchFailed(false);
    }

    fetch(`/api/stock-chart?symbol=${encodeURIComponent(sym)}&period=${per}`)
      .then((r) => {
        if (r.status === 503) throw Object.assign(new Error("retry"), { retry: true });
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then((d: ChartData) => {
        if (!d.points?.length) throw new Error("empty");
        setData(d);
        setLoading(false);
        setFetchFailed(false);
        writeCache(sym, per, d);
        // 1D 차트에서 가격 추출 — stock-detail 실패 시 폴백으로 사용
        if (per === "1D" && onPriceLoaded) {
          const lastClose = d.points[d.points.length - 1]?.close;
          const prev      = d.chartPreviousClose;
          if (lastClose && lastClose > 0 && prev && prev > 0) {
            const change        = lastClose - prev;
            const changePercent = (change / prev) * 100;
            onPriceLoaded(lastClose, change, changePercent);
          } else if (d.regularMarketPrice && d.regularMarketPrice > 0 && prev && prev > 0) {
            const change        = d.regularMarketPrice - prev;
            const changePercent = (change / prev) * 100;
            onPriceLoaded(d.regularMarketPrice, change, changePercent);
          }
        }
      })
      .catch((err: Error & { retry?: boolean }) => {
        setLoading(false);
        if (cached) return; // 캐시 데이터 있으면 그대로 유지
        // 자동 재시도 — 절대 에러 상태 표시 금지 (503 또는 네트워크 오류 모두)
        const next = Math.min((retryDelay || 2000) * 2, 12_000);
        void err; // suppress unused warning
        setTimeout(() => doFetch(sym, per, next), retryDelay || 2000);
      });
  };

  useEffect(() => {
    setHover(null);
    setData(null);
    setFetchFailed(false);
    doFetch(symbol, period, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbol, period]);

  // Derived values
  const plotW  = W - PAD.left - PAD.right;
  const pts    = data?.points ?? [];
  const prices = pts.map((p) => p.close);
  const vols   = pts.map((p) => p.volume);
  const N      = prices.length;

  const minP = N ? Math.min(...prices) : 0;
  const maxP = N ? Math.max(...prices) : 1;
  const maxV = vols.length ? Math.max(...vols, 1) : 1;

  const pad  = (maxP - minP) * 0.07 || maxP * 0.05 || 1;
  const pLo  = minP - pad;
  const pHi  = maxP + pad;

  function xAt(i: number) {
    return PAD.left + (N > 1 ? i / (N - 1) : 0.5) * plotW;
  }
  function yP(p: number) {
    return PAD.top + CH - ((p - pLo) / (pHi - pLo)) * CH;
  }

  let linePath = "";
  let areaPath = "";
  prices.forEach((p, i) => {
    const x = xAt(i).toFixed(1);
    const y = yP(p).toFixed(1);
    if (i === 0) { linePath = `M${x},${y}`; areaPath = `M${x},${y}`; }
    else         { linePath += ` L${x},${y}`; areaPath += ` L${x},${y}`; }
  });
  if (N > 0) {
    const x0 = xAt(0).toFixed(1);
    const xN = xAt(N - 1).toFixed(1);
    const yB = (PAD.top + CH).toFixed(1);
    areaPath += ` L${xN},${yB} L${x0},${yB} Z`;
  }

  const base    = period === "1D" ? (data?.chartPreviousClose ?? prices[0]) : prices[0];

  const activeIdx   = hover ?? N - 1;
  const activePrice = prices[activeIdx] ?? 0;
  const activeVol   = vols[activeIdx]   ?? 0;
  const activeTs    = pts[activeIdx]?.ts ?? 0;
  const chgFromBase = base ? activePrice - base : 0;
  const pctFromBase = base ? (chgFromBase / base) * 100 : 0;

  // When not hovering, show live price from parent (same source as page header)
  const showLive      = hover == null && livePrice != null;
  const dispPrice     = showLive ? livePrice!                  : activePrice;
  const dispChange    = showLive ? (liveChange    ?? chgFromBase)    : chgFromBase;
  const dispChangePct = showLive ? (liveChangePercent ?? pctFromBase) : pctFromBase;

  const isUp  = dispChangePct >= 0;
  const color = isUp ? UP : DOWN;

  const yTicks = [0, 0.333, 0.667, 1].map((t) => ({
    y:     PAD.top + CH * (1 - t),
    label: (pLo + t * (pHi - pLo)).toFixed(2),
  }));

  const xTicks = N > 0
    ? [0, 0.25, 0.5, 0.75, 1]
        .map((t) => {
          const idx = Math.round(t * (N - 1));
          return { x: xAt(idx), label: xFmt(pts[idx].ts, period) };
        })
        .filter((t, i, arr) => i === 0 || t.label !== arr[i - 1].label)
    : [];

  const prevY = period === "1D" && data?.chartPreviousClose
    ? yP(data.chartPreviousClose)
    : null;

  function handlePointer(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left - PAD.left;
    const idx  = Math.round((rawX / (rect.width - PAD.left - PAD.right)) * (N - 1));
    setHover(Math.max(0, Math.min(N - 1, idx)));
  }

  const clipId = `cp-${symbol}`;
  const gradId = `ag-${symbol}`;

  return (
    <div>
      {/* Period tabs */}
      <div className="flex gap-0.5 px-3 pt-4 pb-3">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="flex-1 py-1 rounded-lg text-[10px] font-bold transition-all"
            style={
              period === p
                ? { background: color, color: "#000" }
                : { background: "rgba(255,255,255,0.05)", color: "var(--muted)" }
            }
          >
            {p}
          </button>
        ))}
      </div>

      {/* Price readout */}
      <div className="px-4 pb-2" style={{ minHeight: 52 }}>
        {N > 0 && (
          <>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold font-mono-num" style={{ color: "var(--text)" }}>
                ${dispPrice.toFixed(2)}
              </span>
              <span className="text-sm font-mono-num" style={{ color }}>
                {dispChange >= 0 ? "+" : ""}
                {dispChange.toFixed(2)}&nbsp;
                ({dispChangePct >= 0 ? "+" : ""}
                {dispChangePct.toFixed(2)}%)
              </span>
            </div>
            {hover != null && activeTs > 0 && (
              <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {fullFmt(activeTs, period, lc)} · {t.chart.volume} {fmtVol(activeVol, lc)}
              </p>
            )}
          </>
        )}
      </div>

      {/* SVG Chart */}
      <div style={{ position: "relative", height: SVG_H }}>
        {/* Loading spinner overlay — chart still visible underneath if cached */}
        {loading && N === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-7 h-7 rounded-full border-2 animate-spin"
              style={{ borderColor: `${color}22`, borderTopColor: color }}
            />
          </div>
        )}

        {/* No data at all and fetch failed */}
        {fetchFailed && N === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-xs" style={{ color: "var(--muted)" }}>{t.chart.loadFailed}</p>
            <button
              className="text-[11px] px-3 py-1.5 rounded-lg font-semibold"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}
              onClick={() => { setFetchFailed(false); setLoading(true); doFetch(symbol, period, 0); }}
            >
              {t.chart.retry}
            </button>
          </div>
        )}

        <svg
          ref={svgRef}
          width="100%"
          height={SVG_H}
          style={{ display: "block", cursor: "crosshair", opacity: loading && N > 0 ? 0.5 : 1 }}
          onPointerMove={handlePointer}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.02" />
            </linearGradient>
            <clipPath id={clipId}>
              <rect x={PAD.left} y={PAD.top - 2} width={plotW} height={CH + 4} />
            </clipPath>
          </defs>

          {yTicks.map((t, i) => (
            <line key={i}
              x1={PAD.left} y1={t.y} x2={PAD.left + plotW} y2={t.y}
              stroke="var(--border)" strokeWidth="0.5"
            />
          ))}

          {prevY != null && (
            <line
              x1={PAD.left} y1={prevY} x2={PAD.left + plotW} y2={prevY}
              stroke="var(--muted)" strokeWidth="0.7" strokeDasharray="3,3" opacity="0.6"
            />
          )}

          {areaPath && (
            <path d={areaPath} fill={`url(#${gradId})`} clipPath={`url(#${clipId})`} />
          )}

          {linePath && (
            <path d={linePath} fill="none" stroke={color} strokeWidth="1.6"
              clipPath={`url(#${clipId})`} />
          )}

          {pts.map((p, i) => {
            const bH = maxV > 0 ? (p.volume / maxV) * VH * 0.85 : 0;
            const bW = Math.max(1.5, plotW / N * 0.75);
            return (
              <rect key={i}
                x={xAt(i) - bW / 2}
                y={PAD.top + CH + GAP + VH - bH}
                width={bW} height={bH}
                fill={color} opacity="0.25"
              />
            );
          })}

          {yTicks.map((t, i) => (
            <text key={i}
              x={PAD.left + plotW + 5} y={t.y}
              dominantBaseline="middle"
              fontSize="9.5" fill="var(--muted)" textAnchor="start"
            >
              {t.label}
            </text>
          ))}

          {xTicks.map((t, i) => (
            <text key={i}
              x={t.x} y={SVG_H - 3}
              fontSize="9" fill="var(--muted)" textAnchor="middle"
            >
              {t.label}
            </text>
          ))}

          {hover != null && N > 0 && (
            <>
              <line
                x1={xAt(hover)} y1={PAD.top}
                x2={xAt(hover)} y2={PAD.top + CH + GAP + VH}
                stroke="var(--text)" strokeWidth="0.8" opacity="0.4"
                strokeDasharray="2,2"
              />
              <circle
                cx={xAt(hover)} cy={yP(prices[hover])}
                r="3.5" fill={color} stroke="var(--bg)" strokeWidth="1.5"
              />
            </>
          )}

          {hover == null && N > 0 && (
            <circle
              cx={xAt(N - 1)} cy={yP(prices[N - 1])}
              r="3" fill={color} stroke="var(--bg)" strokeWidth="1.5"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
