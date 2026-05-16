"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Calendar } from "lucide-react";
import { GURUS, type Guru } from "@/lib/holdings13f";
import { useLocale } from "@/contexts/LocaleContext";

// Returns the next 13F filing deadline after today.
// Deadlines: Feb 14 (Q4 prev yr), May 15 (Q1), Aug 14 (Q2), Nov 14 (Q3)
function getNextFilingInfo(): { quarter: string; dateStr: string } {
  const now = new Date();
  const y   = now.getFullYear();
  const candidates = [
    { quarter: `${y - 1} Q4`, date: new Date(y, 1, 14) },
    { quarter: `${y} Q1`,     date: new Date(y, 4, 15) },
    { quarter: `${y} Q2`,     date: new Date(y, 7, 14) },
    { quarter: `${y} Q3`,     date: new Date(y, 10, 14) },
    { quarter: `${y} Q4`,     date: new Date(y + 1, 1, 14) },
  ];
  const next = candidates.find((c) => c.date > now) ?? candidates[candidates.length - 1];
  const dateStr = next.date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" });
  return { quarter: next.quarter, dateStr };
}

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

function GuruCard({ guru }: { guru: Guru }) {
  const t = useLocale();
  const [open,    setOpen]    = useState(false);
  const [prices,  setPrices]  = useState<PriceMap>({});
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const handleOpen = () => {
    const next = !open;
    setOpen(next);

    // Fetch prices once on first expand — server handles closed-market caching
    if (next && !fetched) {
      setLoading(true);
      setFetched(true);
      const syms = guru.holdings.map((h) => h.symbol).join(",");
      fetch(`/api/guru-prices?symbols=${encodeURIComponent(syms)}`)
        .then((r) => r.json())
        .then((data: PriceMap) => setPrices(data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  };

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* ── Header ── */}
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 active:opacity-80 transition-opacity"
        onClick={handleOpen}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${guru.color}18`, border: `2px solid ${guru.color}44` }}
        >
          {guru.emoji}
        </div>

        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{guru.name}</p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>{guru.fund}</p>
        </div>

        <div className="text-right flex-shrink-0 mr-1">
          <p className="text-xs font-semibold" style={{ color: guru.color }}>{guru.aum}</p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <span className="text-[9px] px-1 py-0.5 rounded"
              style={{ background: `${BADGE[guru.disclosureType].color}18`, color: BADGE[guru.disclosureType].color }}>
              {BADGE[guru.disclosureType].label}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>{guru.quarter}</span>
          </div>
        </div>

        <ChevronDown
          className="w-4 h-4 flex-shrink-0 transition-transform"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>

      {/* ── Holdings list ── */}
      {open && (
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {/* Column header */}
          <div
            className="flex items-center px-4 py-2 text-[10px] font-semibold"
            style={{ color: "var(--muted)", background: "var(--bg)" }}
          >
            <span className="flex-1">{t.guru.colSymbol}</span>
            <span className="w-14 text-right">{t.guru.colWeight}</span>
            <span className="w-20 text-right">{t.guru.colPrice}</span>
            <span className="w-16 text-right">{t.guru.colChange}</span>
          </div>

          {guru.holdings.map((h, i) => {
            const p   = prices[h.symbol];
            const pos = p ? p.changePercent >= 0 : null;
            const clr = pos === null ? "var(--muted)" : pos ? UP : DOWN;

            return (
              <Link
                key={h.symbol}
                href={`/stock/${h.symbol}`}
                className={`flex items-center px-4 py-2.5 active:opacity-70 transition-opacity ${
                  i < guru.holdings.length - 1 ? "border-b" : ""
                }`}
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

                {/* 비중 */}
                <div className="w-14 text-right">
                  <p className="text-xs font-mono-num font-semibold" style={{ color: guru.color }}>
                    {h.portfolioPct.toFixed(1)}%
                  </p>
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
                  {loading ? (
                    <div className="h-3 w-14 rounded ml-auto animate-pulse" style={{ background: "var(--border)" }} />
                  ) : p ? (
                    <p className="text-xs font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
                      {fmt(p.price)}
                    </p>
                  ) : (
                    <p className="text-xs font-mono-num" style={{ color: "var(--muted)" }}>—</p>
                  )}
                </div>

                {/* 등락률 */}
                <div className="w-16 text-right">
                  {loading ? (
                    <div className="h-3 w-10 rounded ml-auto animate-pulse" style={{ background: "var(--border)" }} />
                  ) : p ? (
                    <p className="text-[11px] font-mono-num font-semibold" style={{ color: clr }}>
                      {pos ? "+" : ""}{p.changePercent.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="text-[11px] font-mono-num" style={{ color: "var(--muted)" }}>—</p>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Refresh row */}
          <div
            className="flex items-center justify-between px-4 py-2 border-t"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {t.guru.source} · {guru.quarter}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLoading(true);
                const syms = guru.holdings.map((h) => h.symbol).join(",");
                fetch(`/api/guru-prices?symbols=${encodeURIComponent(syms)}`)
                  .then((r) => r.json())
                  .then((data: PriceMap) => setPrices(data))
                  .catch(() => {})
                  .finally(() => setLoading(false));
              }}
              disabled={loading}
              className="text-[10px] font-semibold px-2 py-0.5 rounded disabled:opacity-40 active:opacity-70 transition-opacity"
              style={{ color: "var(--mint)", background: "rgba(0,229,160,0.08)" }}
            >
              {loading ? t.guru.loading : t.guru.refresh}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function GuruHoldings() {
  const t    = useLocale();
  const next = getNextFilingInfo();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            {t.guru.sectionTitle}
          </h2>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
            {t.guru.subtitle}
          </p>
        </div>
      </div>

      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 mb-2 border"
        style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.12)" }}
      >
        <span className="text-xs">📋</span>
        <p className="text-[10px] leading-relaxed" style={{ color: "var(--muted)" }}>
          {t.guru.notice}
        </p>
      </div>

      {/* Next 13F filing date */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3 border"
        style={{ background: "rgba(251,191,36,0.04)", borderColor: "rgba(251,191,36,0.15)" }}
      >
        <Calendar className="w-3 h-3 flex-shrink-0" style={{ color: "#fbbf24" }} />
        <p className="text-[10px]" style={{ color: "var(--muted)" }}>
          {t.guru.nextFiling(next.quarter, next.dateStr)}
        </p>
      </div>

      {/* Guru cards */}
      <div className="flex flex-col gap-3">
        {GURUS.map((guru) => (
          <GuruCard key={guru.id} guru={guru} />
        ))}
      </div>
    </div>
  );
}
