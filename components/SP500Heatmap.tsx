"use client";

import { useEffect, useState } from "react";
import { MiniChartPopup } from "./MiniChartPopup";

type StockTile = { symbol: string; name: string; changePercent: number; weight: number };
type Sector    = { key: string; name: string; stocks: StockTile[] };

type PopupState = {
  symbol: string;
  name: string;
  changePercent: number;
  anchorX: number;
  anchorY: number;
};

function bg(pct: number) {
  const t = Math.min(Math.abs(pct) / 3, 1);
  const a = 0.16 + t * 0.64;
  return pct >= 0 ? `rgba(0,229,160,${a})` : `rgba(255,77,109,${a})`;
}

function textColor(pct: number) {
  const t = Math.min(Math.abs(pct) / 3, 1);
  return t > 0.45 ? "#fff" : pct >= 0 ? "#00e5a0" : "#ff4d6d";
}

const LAYOUT: { rowH: number; sections: { key: string; flex: number; maxStocks: number }[] }[] = [
  {
    rowH: 102,
    sections: [
      { key: "IT",     flex: 6.0, maxStocks: 5 },
      { key: "COMM",   flex: 2.5, maxStocks: 3 },
      { key: "HEALTH", flex: 2.5, maxStocks: 3 },
    ],
  },
  {
    rowH: 82,
    sections: [
      { key: "FIN",    flex: 3.5, maxStocks: 4 },
      { key: "CONS_D", flex: 3.0, maxStocks: 3 },
      { key: "IND",    flex: 2.0, maxStocks: 3 },
      { key: "CONS_S", flex: 1.5, maxStocks: 2 },
    ],
  },
  {
    rowH: 64,
    sections: [
      { key: "ENERGY", flex: 2.0, maxStocks: 3 },
      { key: "MAT",    flex: 1.0, maxStocks: 2 },
      { key: "UTIL",   flex: 1.0, maxStocks: 2 },
      { key: "REIT",   flex: 1.0, maxStocks: 2 },
    ],
  },
];

const MOCK_SECTORS: Sector[] = [
  { key: "IT",     name: "정보기술",    stocks: [
    { symbol: "AAPL",  name: "Apple",     changePercent:  1.14, weight: 7.2 },
    { symbol: "MSFT",  name: "Microsoft", changePercent:  1.02, weight: 6.8 },
    { symbol: "NVDA",  name: "NVIDIA",    changePercent:  2.18, weight: 5.8 },
    { symbol: "AVGO",  name: "Broadcom",  changePercent:  0.85, weight: 2.5 },
    { symbol: "AMD",   name: "AMD",       changePercent:  2.17, weight: 1.8 },
    { symbol: "ORCL",  name: "Oracle",    changePercent: -0.70, weight: 1.5 },
  ]},
  { key: "COMM",   name: "커뮤니케이션", stocks: [
    { symbol: "META",  name: "Meta",      changePercent:  1.72, weight: 2.8 },
    { symbol: "GOOGL", name: "Alphabet",  changePercent: -0.69, weight: 2.6 },
    { symbol: "NFLX",  name: "Netflix",   changePercent: -0.84, weight: 0.8 },
    { symbol: "DIS",   name: "Disney",    changePercent: -1.20, weight: 0.7 },
  ]},
  { key: "HEALTH", name: "헬스케어",    stocks: [
    { symbol: "LLY",   name: "Eli Lilly",    changePercent:  0.95, weight: 2.0 },
    { symbol: "UNH",   name: "UnitedHealth", changePercent:  0.42, weight: 1.8 },
    { symbol: "JNJ",   name: "J&J",          changePercent: -0.28, weight: 1.4 },
    { symbol: "ABBV",  name: "AbbVie",       changePercent:  0.63, weight: 1.2 },
  ]},
  { key: "FIN",    name: "금융",        stocks: [
    { symbol: "BRK-B", name: "Berkshire",   changePercent:  0.78, weight: 3.5 },
    { symbol: "JPM",   name: "JPMorgan",    changePercent:  1.28, weight: 2.2 },
    { symbol: "V",     name: "Visa",        changePercent:  0.55, weight: 1.9 },
    { symbol: "MA",    name: "Mastercard",  changePercent:  0.62, weight: 1.5 },
  ]},
  { key: "CONS_D", name: "임의소비재",  stocks: [
    { symbol: "AMZN",  name: "Amazon",    changePercent:  1.01, weight: 4.0 },
    { symbol: "TSLA",  name: "Tesla",     changePercent: -2.18, weight: 1.8 },
    { symbol: "HD",    name: "HomeDepot", changePercent:  0.35, weight: 1.0 },
    { symbol: "NKE",   name: "Nike",      changePercent: -0.92, weight: 0.6 },
  ]},
  { key: "IND",    name: "산업재",      stocks: [
    { symbol: "GE",    name: "GE",           changePercent:  1.45, weight: 1.0 },
    { symbol: "CAT",   name: "Caterpillar",  changePercent:  0.72, weight: 0.9 },
    { symbol: "BA",    name: "Boeing",       changePercent: -1.34, weight: 0.7 },
    { symbol: "RTX",   name: "Raytheon",     changePercent:  0.48, weight: 0.7 },
  ]},
  { key: "CONS_S", name: "필수소비재",  stocks: [
    { symbol: "WMT",   name: "Walmart",   changePercent:  0.38, weight: 1.5 },
    { symbol: "COST",  name: "Costco",    changePercent:  0.91, weight: 1.0 },
    { symbol: "PG",    name: "P&G",       changePercent:  0.18, weight: 1.0 },
    { symbol: "KO",    name: "Coca-Cola", changePercent:  0.12, weight: 0.9 },
  ]},
  { key: "ENERGY", name: "에너지",      stocks: [
    { symbol: "XOM",   name: "ExxonMobil",     changePercent: -0.52, weight: 2.0 },
    { symbol: "CVX",   name: "Chevron",        changePercent: -0.38, weight: 1.4 },
    { symbol: "COP",   name: "ConocoPhillips", changePercent: -0.75, weight: 0.7 },
  ]},
  { key: "MAT",    name: "소재",        stocks: [
    { symbol: "LIN",   name: "Linde",        changePercent:  0.35, weight: 0.8 },
    { symbol: "APD",   name: "Air Products", changePercent:  0.22, weight: 0.4 },
  ]},
  { key: "UTIL",   name: "유틸리티",    stocks: [
    { symbol: "NEE",   name: "NextEra", changePercent: -0.44, weight: 0.8 },
    { symbol: "DUK",   name: "Duke",    changePercent:  0.15, weight: 0.4 },
  ]},
  { key: "REIT",   name: "부동산",      stocks: [
    { symbol: "AMT",   name: "American Tower", changePercent: -0.88, weight: 0.6 },
    { symbol: "PLD",   name: "Prologis",       changePercent:  0.42, weight: 0.5 },
  ]},
];

function SectorBlock({
  sector,
  flex,
  rowH,
  maxStocks,
  onTileClick,
}: {
  sector: Sector;
  flex: number;
  rowH: number;
  maxStocks: number;
  onTileClick: (symbol: string, name: string, changePercent: number, x: number, y: number) => void;
}) {
  const visibleStocks = sector.stocks.slice(0, maxStocks);
  const totalW = visibleStocks.reduce((a, s) => a + s.weight, 0);
  const LABEL_H = 14;
  const tileH = rowH - LABEL_H;

  return (
    <div className="flex flex-col overflow-hidden" style={{ flex, minWidth: 0 }}>
      {/* Sector name strip */}
      <div
        className="flex items-center px-1.5 flex-shrink-0"
        style={{ height: LABEL_H, background: "rgba(255,255,255,0.03)" }}
      >
        <span className="text-[8px] font-semibold truncate" style={{ color: "var(--muted)" }}>
          {sector.name}
        </span>
      </div>

      {/* Individual stock tiles */}
      <div className="flex overflow-hidden" style={{ height: tileH, gap: "1px" }}>
        {visibleStocks.map((s) => {
          const tc = textColor(s.changePercent);
          return (
            <div
              key={s.symbol}
              className="flex flex-col items-start justify-between p-1.5 overflow-hidden select-none cursor-pointer transition-opacity active:opacity-80"
              style={{
                flex: s.weight / totalW,
                background: bg(s.changePercent),
                minWidth: 0,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onTileClick(s.symbol, s.name, s.changePercent, e.clientX, e.clientY);
              }}
            >
              <p
                className="text-[10px] font-semibold leading-tight truncate w-full"
                style={{ color: tc }}
              >
                {s.symbol}
              </p>
              <p
                className="text-[12px] font-bold font-mono-num tabular-nums leading-none"
                style={{ color: tc }}
              >
                {s.changePercent >= 0 ? "+" : ""}{s.changePercent.toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkeletonRow({ rowH, sections }: { rowH: number; sections: { flex: number }[] }) {
  return (
    <div className="flex" style={{ height: rowH, gap: "1px" }}>
      {sections.map((s, i) => (
        <div
          key={i}
          className="animate-pulse"
          style={{ flex: s.flex, background: "rgba(255,255,255,0.04)" }}
        />
      ))}
    </div>
  );
}

export function SP500Heatmap() {
  const [sectors, setSectors] = useState<Sector[] | null>(null);
  const [popup, setPopup]     = useState<PopupState | null>(null);

  useEffect(() => {
    fetch("/api/sp500-prices")
      .then((r) => r.json())
      .then((data: Sector[]) => setSectors(data))
      .catch(() => setSectors(MOCK_SECTORS));
  }, []);

  const sectorMap = Object.fromEntries(
    (sectors ?? MOCK_SECTORS).map((s) => [s.key, s])
  );

  const handleTileClick = (symbol: string, name: string, changePercent: number, x: number, y: number) => {
    setPopup({ symbol, name, changePercent, anchorX: x, anchorY: y });
  };

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
          S&P 500
        </h2>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          섹터별 등락률
        </span>
      </div>

      {/* Treemap — horizontal scroll on small screens */}
      <div className="overflow-x-auto" style={{ touchAction: "pan-x" }}>
        <div style={{ minWidth: "520px" }}>
          <div className="flex flex-col" style={{ gap: "1px", background: "var(--border)" }}>
            {sectors === null
              ? LAYOUT.map((row, ri) => (
                  <SkeletonRow key={ri} rowH={row.rowH} sections={row.sections} />
                ))
              : LAYOUT.map((row) => (
                  <div
                    key={row.sections.map((s) => s.key).join("-")}
                    className="flex"
                    style={{ height: row.rowH, gap: "1px" }}
                  >
                    {row.sections.map(({ key, flex, maxStocks }) => {
                      const sector = sectorMap[key];
                      if (!sector) return null;
                      return (
                        <SectorBlock
                          key={key}
                          sector={sector}
                          flex={flex}
                          rowH={row.rowH}
                          maxStocks={maxStocks}
                          onTileClick={handleTileClick}
                        />
                      );
                    })}
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          S&P 500 · 섹터 구성 · 시가총액 비례
        </span>
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
