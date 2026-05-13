"use client";

import { useEffect, useRef, useState } from "react";

const PERIODS = ["1D", "1W", "1M", "3M", "1Y", "5Y", "10Y", "ALL"] as const;
type Period = (typeof PERIODS)[number];

type Point = { ts: number; close: number; volume: number };
type ChartData = {
  chartPreviousClose: number | null;
  regularMarketPrice: number | null;
  points: Point[];
};

// Chart layout constants
const PAD   = { top: 10, right: 56, bottom: 22, left: 2 };
const CH    = 210; // price chart height
const VH    = 48;  // volume height
const GAP   = 4;   // gap between chart and volume
const SVG_H = PAD.top + CH + GAP + VH + PAD.bottom;

const UP   = "#00e5a0";
const DOWN = "#ff4d6d";

function xFmt(ts: number, period: Period): string {
  const d = new Date(ts * 1000);
  if (period === "1D")
    return d.toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: false,
      timeZone: "America/New_York",
    });
  if (period === "1W")
    return `${d.getMonth() + 1}/${d.getDate()}`;
  if (period === "1M" || period === "3M")
    return `${d.getMonth() + 1}/${d.getDate()}`;
  if (period === "1Y")
    return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()];
  // 5Y / 10Y / ALL → year
  return String(d.getFullYear());
}

function fullFmt(ts: number, period: Period): string {
  const d = new Date(ts * 1000);
  if (period === "1D")
    return d.toLocaleString("ko-KR", {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
      timeZone: "America/New_York",
    }) + " EST";
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

function fmtVol(v: number): string {
  if (v >= 1e8) return (v / 1e8).toFixed(1) + "억";
  if (v >= 1e4) return Math.round(v / 1e4).toLocaleString() + "만";
  return v.toLocaleString("ko-KR");
}

export function StockChart({ symbol }: { symbol: string }) {
  const [period, setPeriod]   = useState<Period>("1D");
  const [data, setData]       = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [hover, setHover]     = useState<number | null>(null);
  const svgRef                = useRef<SVGSVGElement>(null);
  const [W, setW]             = useState(480);

  // Observe container width
  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const obs = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    obs.observe(el);
    setW(el.clientWidth);
    return () => obs.disconnect();
  }, []);

  // Fetch chart data on period change
  useEffect(() => {
    setLoading(true);
    setError(false);
    setHover(null);
    fetch(`/api/stock-chart?symbol=${encodeURIComponent(symbol)}&period=${period}`)
      .then((r) => { if (!r.ok) throw new Error("no data"); return r.json(); })
      .then((d) => { setData(d.points?.length ? d : null); setLoading(false); if (!d.points?.length) setError(true); })
      .catch(() => { setLoading(false); setError(true); });
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

  // 7% padding around price range
  const pad  = (maxP - minP) * 0.07 || maxP * 0.05 || 1;
  const pLo  = minP - pad;
  const pHi  = maxP + pad;

  function xAt(i: number) {
    return PAD.left + (N > 1 ? i / (N - 1) : 0.5) * plotW;
  }
  function yP(p: number) {
    return PAD.top + CH - ((p - pLo) / (pHi - pLo)) * CH;
  }

  // Build SVG paths
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

  // Color based on direction
  const base    = period === "1D" ? (data?.chartPreviousClose ?? prices[0]) : prices[0];
  const last    = prices[N - 1] ?? 0;
  const isUp    = last >= (base ?? last);
  const color   = isUp ? UP : DOWN;

  // Active point (hover or last)
  const activeIdx   = hover ?? N - 1;
  const activePrice = prices[activeIdx] ?? 0;
  const activeVol   = vols[activeIdx]   ?? 0;
  const activeTs    = pts[activeIdx]?.ts ?? 0;
  const chgFromBase = base ? activePrice - base : 0;
  const pctFromBase = base ? (chgFromBase / base) * 100 : 0;

  // Y-axis ticks (4 levels)
  const yTicks = [0, 0.333, 0.667, 1].map((t) => ({
    y:     PAD.top + CH * (1 - t),
    label: (pLo + t * (pHi - pLo)).toFixed(2),
  }));

  // X-axis ticks (5 evenly spaced, deduplicated for ALL)
  const xTicks = N > 0
    ? [0, 0.25, 0.5, 0.75, 1]
        .map((t) => {
          const idx = Math.round(t * (N - 1));
          return {
            x: xAt(idx),
            label: xFmt(pts[idx].ts, period),
          };
        })
        .filter((t, i, arr) => i === 0 || t.label !== arr[i - 1].label)
  : [];

  // Previous close line (for 1D only)
  const prevY = period === "1D" && data?.chartPreviousClose
    ? yP(data.chartPreviousClose)
    : null;

  // Pointer handler
  function handlePointer(e: React.PointerEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = e.clientX - rect.left - PAD.left;
    const idx  = Math.round((rawX / (rect.width - PAD.left - PAD.right)) * (N - 1));
    setHover(Math.max(0, Math.min(N - 1, idx)));
  }

  const clipId   = `cp-${symbol}`;
  const gradId   = `ag-${symbol}`;

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

      {/* Price readout — updates on hover */}
      <div className="px-4 pb-2" style={{ minHeight: 52 }}>
        {N > 0 && (
          <>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold font-mono-num" style={{ color: "var(--text)" }}>
                ${activePrice.toFixed(2)}
              </span>
              <span className="text-sm font-mono-num" style={{ color }}>
                {chgFromBase >= 0 ? "+" : ""}
                {chgFromBase.toFixed(2)}&nbsp;
                ({pctFromBase >= 0 ? "+" : ""}
                {pctFromBase.toFixed(2)}%)
              </span>
            </div>
            {hover != null && activeTs > 0 && (
              <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                {fullFmt(activeTs, period)} · 거래량 {fmtVol(activeVol)}
              </p>
            )}
          </>
        )}
      </div>

      {/* SVG Chart */}
      <div style={{ position: "relative", height: SVG_H }}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-7 h-7 rounded-full border-2 animate-spin"
              style={{ borderColor: `${color}22`, borderTopColor: color }}
            />
          </div>
        )}
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-xs" style={{ color: "var(--muted)" }}>차트 데이터를 불러오지 못했습니다</p>
            <button
              className="text-[11px] px-3 py-1.5 rounded-lg font-semibold"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)" }}
              onClick={() => { setError(false); setLoading(true); fetch(`/api/stock-chart?symbol=${encodeURIComponent(symbol)}&period=${period}`).then(r=>r.json()).then(d=>{setData(d);setLoading(false);}).catch(()=>{setLoading(false);setError(true);}); }}
            >
              다시 시도
            </button>
          </div>
        )}

        <svg
          ref={svgRef}
          width="100%"
          height={SVG_H}
          style={{ display: "block", cursor: "crosshair", opacity: loading ? 0.3 : 1 }}
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

          {/* Horizontal grid lines */}
          {yTicks.map((t, i) => (
            <line key={i}
              x1={PAD.left} y1={t.y} x2={PAD.left + plotW} y2={t.y}
              stroke="var(--border)" strokeWidth="0.5"
            />
          ))}

          {/* Previous close dashed line (1D) */}
          {prevY != null && (
            <line
              x1={PAD.left} y1={prevY} x2={PAD.left + plotW} y2={prevY}
              stroke="var(--muted)" strokeWidth="0.7" strokeDasharray="3,3" opacity="0.6"
            />
          )}

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill={`url(#${gradId})`} clipPath={`url(#${clipId})`} />
          )}

          {/* Price line */}
          {linePath && (
            <path d={linePath} fill="none" stroke={color} strokeWidth="1.6"
              clipPath={`url(#${clipId})`} />
          )}

          {/* Volume bars */}
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

          {/* Y-axis labels */}
          {yTicks.map((t, i) => (
            <text key={i}
              x={PAD.left + plotW + 5} y={t.y}
              dominantBaseline="middle"
              fontSize="9.5" fill="var(--muted)" textAnchor="start"
            >
              {t.label}
            </text>
          ))}

          {/* X-axis labels */}
          {xTicks.map((t, i) => (
            <text key={i}
              x={t.x} y={SVG_H - 3}
              fontSize="9" fill="var(--muted)" textAnchor="middle"
            >
              {t.label}
            </text>
          ))}

          {/* Hover: crosshair + dot */}
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

          {/* Always show dot at last point when not hovering */}
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
