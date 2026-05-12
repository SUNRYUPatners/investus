"use client";

import { useEffect, useRef, useState } from "react";

type ChartPoint = { ts: number; close: number };

type Props = {
  symbol: string;
  name: string;
  changePercent: number;
  anchorX: number;
  anchorY: number;
  onClose: () => void;
};

const UP   = "#ff4d6d";
const DOWN = "#00e5a0";
const CW   = 208;
const CH   = 64;
const POPUP_W = 240;
const POPUP_H = 160;

export function MiniChartPopup({ symbol, name, changePercent, anchorX, anchorY, onClose }: Props) {
  const [points, setPoints] = useState<ChartPoint[] | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pos   = changePercent >= 0;
  const color = pos ? UP : DOWN;

  useEffect(() => {
    fetch(`/api/stock-chart?symbol=${encodeURIComponent(symbol)}&period=10Y`)
      .then((r) => r.json())
      .then((d) => setPoints(Array.isArray(d.points) ? d.points : []))
      .catch(() => setPoints([]));
  }, [symbol]);

  // Close on outside click/touch with a brief delay so the opening click doesn't self-close
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("click", handler);
      document.addEventListener("touchstart", handler);
    }, 60);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClose]);

  // Clamp to viewport
  const vw = typeof window !== "undefined" ? window.innerWidth  : 480;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  let left = anchorX + 12;
  if (left + POPUP_W > vw - 8) left = anchorX - POPUP_W - 8;
  left = Math.max(8, left);
  let top = anchorY + 12;
  if (top + POPUP_H > vh - 8) top = anchorY - POPUP_H - 8;
  top = Math.max(8, top);

  // Build sparkline SVG path
  let sparkPath = "";
  if (points && points.length > 1) {
    const prices = points.map((p) => p.close);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const range = maxP - minP || 1;
    sparkPath = prices
      .map((p, i) => {
        const x = (i / (prices.length - 1)) * CW;
        const y = CH - ((p - minP) / range) * (CH - 2) - 1;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <div
      ref={cardRef}
      className="fixed z-50 rounded-xl border shadow-2xl"
      style={{
        left,
        top,
        width: POPUP_W,
        background: "var(--card)",
        borderColor: "var(--border)",
        padding: "12px 16px",
      }}
      onMouseLeave={onClose}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div style={{ minWidth: 0, flex: 1, marginRight: 8 }}>
          <p className="text-sm font-bold font-mono-num" style={{ color: "var(--text)" }}>
            {symbol}
          </p>
          <p
            className="text-[10px] truncate"
            style={{ color: "var(--muted)" }}
          >
            {name}
          </p>
        </div>
        <span className="text-xs font-bold font-mono-num flex-shrink-0" style={{ color }}>
          {pos ? "+" : ""}{changePercent.toFixed(2)}%
        </span>
      </div>

      {/* Chart */}
      {points === null ? (
        <div
          className="animate-pulse rounded"
          style={{ width: CW, height: CH, background: "rgba(255,255,255,0.05)" }}
        />
      ) : points.length < 2 ? (
        <div
          style={{ width: CW, height: CH, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>데이터 없음</span>
        </div>
      ) : (
        <svg width={CW} height={CH} viewBox={`0 0 ${CW} ${CH}`} style={{ overflow: "visible" }}>
          <path
            d={sparkPath}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      <p className="text-[9px] mt-1.5" style={{ color: "var(--muted)" }}>
        10년 차트
      </p>
    </div>
  );
}
