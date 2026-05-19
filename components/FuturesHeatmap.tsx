"use client";

import { useState, useRef, useEffect } from "react";
import type { FutureItem } from "@/lib/api";
import { MiniChartPopup } from "./MiniChartPopup";
import { useLocaleCode } from "@/contexts/LocaleContext";

// ── Color helpers ───────────────────────────────────────────────────────────
function bg(pct: number) {
  const t = Math.min(Math.abs(pct) / 3, 1); // saturate at ±3 %
  const a = 0.18 + t * 0.64;
  return pct >= 0 ? `rgba(0,229,160,${a})` : `rgba(255,77,109,${a})`;
}
const TILE_TEXT = "rgba(255,255,255,0.95)";

// ── Treemap layout config ───────────────────────────────────────────────────
const ROWS: {
  rowH: number;
  groupKey: string;
  cells: { sym: string; flex: number }[];
}[] = [
  {
    rowH: 90,
    groupKey: "indices",
    cells: [
      { sym: "ES",  flex: 4   },
      { sym: "NQ",  flex: 3.5 },
      { sym: "YM",  flex: 2.5 },
      { sym: "RTY", flex: 2   },
    ],
  },
  {
    rowH: 70,
    groupKey: "energy",
    cells: [
      { sym: "CL",  flex: 3   },
      { sym: "NG",  flex: 2   },
      { sym: "GC",  flex: 3   },
      { sym: "SI",  flex: 2   },
      { sym: "HG",  flex: 1.5 },
    ],
  },
  {
    rowH: 58,
    groupKey: "bonds",
    cells: [
      { sym: "ZN",  flex: 2.5 },
      { sym: "ZB",  flex: 2   },
      { sym: "6E",  flex: 2   },
      { sym: "6J",  flex: 1.5 },
      { sym: "ZC",  flex: 2   },
      { sym: "ZW",  flex: 1.5 },
      { sym: "ZS",  flex: 1.5 },
    ],
  },
  {
    rowH: 65,
    groupKey: "crypto",
    cells: [
      { sym: "BTC", flex: 4   },
      { sym: "ETH", flex: 2.5 },
    ],
  },
];

const GROUP_KO: Record<string, string> = {
  indices: "지수",
  energy:  "에너지 · 금속",
  bonds:   "채권 · 외환 · 농산물",
  crypto:  "암호화폐",
};
const GROUP_EN: Record<string, string> = {
  indices: "Indices",
  energy:  "Energy · Metals",
  bonds:   "Bonds · FX · Agri",
  crypto:  "Crypto",
};

const SHORT_KO: Record<string, string> = {
  ES:  "S&P 500",
  NQ:  "나스닥 100",
  YM:  "다우존스",
  RTY: "러셀 2000",
  CL:  "WTI 원유",
  NG:  "천연가스",
  GC:  "금",
  SI:  "은",
  HG:  "구리",
  ZN:  "미국채 10년",
  ZB:  "미국채 30년",
  "6E": "유로/달러",
  "6J": "달러/엔",
  ZC:  "옥수수",
  ZW:  "밀",
  ZS:  "대두",
  BTC: "비트코인",
  ETH: "이더리움",
};
const SHORT_EN: Record<string, string> = {
  ES:  "S&P 500",
  NQ:  "Nasdaq 100",
  YM:  "Dow Jones",
  RTY: "Russell 2000",
  CL:  "WTI Crude",
  NG:  "Nat. Gas",
  GC:  "Gold",
  SI:  "Silver",
  HG:  "Copper",
  ZN:  "10Y T-Note",
  ZB:  "30Y T-Bond",
  "6E": "EUR/USD",
  "6J": "USD/JPY",
  ZC:  "Corn",
  ZW:  "Wheat",
  ZS:  "Soybeans",
  BTC: "Bitcoin",
  ETH: "Ethereum",
};

type PopupState = {
  symbol: string;
  name: string;
  changePercent: number;
  anchorX: number;
  anchorY: number;
};

function isMarketOpen() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const m = now.getHours() * 60 + now.getMinutes();
  return m >= 9 * 60 + 30 && m < 16 * 60;
}

type Props = { items: FutureItem[] };

export function FuturesHeatmap({ items }: Props) {
  const [popup, setPopup]     = useState<PopupState | null>(null);
  const [open, setOpen]       = useState(isMarketOpen);
  const [thumbL, setThumbL]   = useState(0);
  const [thumbW, setThumbW]   = useState(100);
  const scrollRef             = useRef<HTMLDivElement>(null);
  const locale                = useLocaleCode();
  const SHORT                 = locale === "ko" ? SHORT_KO : SHORT_EN;
  const GROUP                 = locale === "ko" ? GROUP_KO : GROUP_EN;
  const bySymbol = Object.fromEntries(items.map((i) => [i.symbol, i]));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const max = scrollWidth - clientWidth;
      if (max <= 0) { setThumbW(100); return; }
      const w = (clientWidth / scrollWidth) * 100;
      setThumbW(w);
      setThumbL((scrollLeft / max) * (100 - w));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
          Futures Map
        </h2>
        <span className="text-[10px] whitespace-nowrap" style={{ color: "var(--muted)" }}>
          {open
            ? (locale === "ko" ? "선물 · 실시간" : "Futures · Live")
            : (locale === "ko" ? "선물 · 전장 종가" : "Futures · Prev Close")}
        </span>
      </div>

      {/* Treemap — horizontal scroll on small screens */}
      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar"
        style={{ touchAction: "pan-x pan-y", overflowY: "hidden" }}
      >
        <div style={{ minWidth: "680px", touchAction: "pan-x pan-y" }}>
          <div className="flex flex-col" style={{ gap: "1px", background: "var(--border)" }}>
            {ROWS.map((row) => (
              <div key={row.groupKey} style={{ display: "flex", flexDirection: "column" }}>
                {/* Sector label strip */}
                <div
                  style={{
                    height: 18,
                    background: "rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 8,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="text-[9px] font-semibold tracking-wider uppercase font-syne"
                    style={{ color: "var(--muted)" }}
                  >
                    {GROUP[row.groupKey]}
                  </span>
                </div>

                {/* Tiles */}
                <div className="flex" style={{ height: row.rowH, gap: "1px" }}>
                  {row.cells.map(({ sym, flex }) => {
                    const item = bySymbol[sym];
                    if (!item) return null;
                    const pos = item.changePercent >= 0;
                    const displayName = SHORT[sym] ?? item.name;

                    return (
                      <div
                        key={sym}
                        className="flex flex-col items-start justify-between p-1.5 overflow-hidden cursor-pointer select-none transition-opacity active:opacity-80"
                        style={{ flex, background: bg(item.changePercent), minWidth: 0, touchAction: "pan-x pan-y" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPopup({
                            symbol: sym,
                            name: displayName,
                            changePercent: item.changePercent,
                            anchorX: e.clientX,
                            anchorY: e.clientY,
                          });
                        }}
                      >
                        {/* Name */}
                        <p
                          className="text-[11px] font-semibold leading-tight w-full"
                          style={{ color: TILE_TEXT, wordBreak: "break-word" }}
                        >
                          {displayName}
                        </p>

                        {/* Bottom: change + price */}
                        <div className="w-full">
                          <p
                            className="text-[14px] font-bold font-mono-num tabular-nums leading-none"
                            style={{ color: TILE_TEXT }}
                          >
                            {pos ? "+" : ""}{item.changePercent.toFixed(2)}%
                          </p>
                          <p
                            className="text-[10px] font-mono-num tabular-nums leading-none mt-0.5 truncate"
                            style={{ color: TILE_TEXT, opacity: 0.85 }}
                          >
                            {item.price < 10
                              ? item.price.toFixed(3)
                              : item.price < 100
                              ? item.price.toFixed(2)
                              : item.price.toLocaleString("en-US", { maximumFractionDigits: 1 })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator bar — always visible */}
      <div className="px-4 py-2.5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="relative h-[3px] rounded-full" style={{ background: "var(--border)" }}>
          <div
            className="absolute top-0 h-[3px] rounded-full"
            style={{ left: `${thumbL}%`, width: `${thumbW}%`, background: "var(--muted-2)", borderRadius: 9999 }}
          />
        </div>
      </div>

      {popup && (
        <MiniChartPopup
          symbol={popup.symbol}
          name={popup.name}
          changePercent={popup.changePercent}
          anchorX={popup.anchorX}
          anchorY={popup.anchorY}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
