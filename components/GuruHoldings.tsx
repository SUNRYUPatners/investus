"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, RefreshCw } from "lucide-react";
import { GURUS, type Guru } from "@/lib/holdings13f";

const BADGE: Record<string, { label: string; color: string }> = {
  "13F":       { label: "SEC 13F",   color: "#60a5fa" },
  "STOCK_ACT": { label: "STOCK Act", color: "#f472b6" },
};

const UP   = "#ff4d6d";
const DOWN = "#00e5a0";

type PriceMap = Record<string, { price: number; change: number; changePercent: number }>;

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function GuruCard({
  guru,
  prices,
  loading,
}: {
  guru: Guru;
  prices: PriceMap;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header — always visible */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-80 transition-opacity"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: `${guru.color}18`,
            border: `2px solid ${guru.color}44`,
          }}
        >
          {guru.emoji}
        </div>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
            {guru.name}
          </p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            {guru.fund}
          </p>
        </div>

        <div className="text-right flex-shrink-0 mr-1">
          <p className="text-xs font-semibold" style={{ color: guru.color }}>
            {guru.aum}
          </p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[9px] px-1 py-0.5 rounded"
              style={{ background: `${BADGE[guru.disclosureType].color}18`, color: BADGE[guru.disclosureType].color }}>
              {BADGE[guru.disclosureType].label}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {guru.quarter}
            </span>
          </div>
        </div>

        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform"
          style={{
            color: "var(--muted)",
            transform: open ? "rotate(180deg)" : "none",
          }}
        />
      </button>

      {/* Holdings list */}
      {open && (
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {/* Column header */}
          <div
            className="flex items-center px-4 py-2 text-[10px] font-semibold"
            style={{ color: "var(--muted)", background: "var(--bg)" }}
          >
            <span className="flex-1">종목</span>
            <span className="w-16 text-right">비중</span>
            <span className="w-20 text-right">현재가</span>
            <span className="w-16 text-right">등락률</span>
          </div>

          {guru.holdings.map((h, i) => {
            const p   = prices[h.symbol];
            const pos = p ? p.changePercent >= 0 : null;
            const clr = pos === null ? "var(--muted)" : pos ? UP : DOWN;

            return (
              <Link
                key={h.symbol}
                href={`/stock/${h.symbol}`}
                className={`flex items-center px-4 py-2.5 active:opacity-70 transition-opacity ${i < guru.holdings.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "var(--border)", textDecoration: "none" }}
              >
                {/* Symbol + name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: `${guru.color}18`, color: guru.color }}
                    >
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
                      {h.symbol}
                    </span>
                  </div>
                  <p className="text-[10px] truncate mt-0.5 pl-7" style={{ color: "var(--muted)" }}>
                    {h.name}
                  </p>
                </div>

                {/* 포트폴리오 비중 */}
                <div className="w-16 text-right">
                  <p className="text-xs font-mono-num font-semibold" style={{ color: guru.color }}>
                    {h.portfolioPct.toFixed(1)}%
                  </p>
                  {/* mini bar */}
                  <div className="h-0.5 rounded-full mt-0.5 ml-auto"
                    style={{
                      width: `${Math.min(100, (h.portfolioPct / guru.holdings[0].portfolioPct) * 100)}%`,
                      background: guru.color,
                      opacity: 0.5,
                    }}
                  />
                </div>

                {/* 현재가 */}
                <div className="w-20 text-right">
                  {loading || !p ? (
                    <div className="h-3 w-14 rounded ml-auto animate-pulse"
                      style={{ background: "var(--border)" }} />
                  ) : (
                    <p className="text-xs font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                      {fmt(p.price)}
                    </p>
                  )}
                </div>

                {/* 등락률 */}
                <div className="w-16 text-right">
                  {loading || !p ? (
                    <div className="h-3 w-10 rounded ml-auto animate-pulse"
                      style={{ background: "var(--border)" }} />
                  ) : (
                    <p className="text-[11px] font-mono-num font-semibold" style={{ color: clr }}>
                      {pos ? "+" : ""}{p.changePercent.toFixed(2)}%
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function GuruHoldings() {
  const [prices,  setPrices]  = useState<PriceMap>({});
  const [loading, setLoading] = useState(true);
  const [lastAt,  setLastAt]  = useState("");

  const fetchPrices = () => {
    setLoading(true);
    fetch("/api/guru-prices")
      .then((r) => r.json())
      .then((data) => {
        setPrices(data);
        setLastAt(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPrices(); }, []);

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2
            className="text-xs font-semibold tracking-widest uppercase font-syne"
            style={{ color: "var(--muted)" }}
          >
            투자 대가 13F
          </h2>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            보유 종목 · 가격 실시간
          </p>
        </div>
        <button
          onClick={fetchPrices}
          disabled={loading}
          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg border disabled:opacity-40 transition-opacity"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          {lastAt || "업데이트"}
        </button>
      </div>

      {/* Note */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3 border"
        style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.12)" }}
      >
        <span className="text-xs">📋</span>
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
          SEC 13F·STOCK Act 공시 기준 · 분기별 업데이트 · 현재가 실시간
        </p>
      </div>

      {/* Guru cards */}
      <div className="flex flex-col gap-3">
        {GURUS.map((guru) => (
          <GuruCard
            key={guru.id}
            guru={guru}
            prices={prices}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}
