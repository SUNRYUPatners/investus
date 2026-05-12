"use client";

import { useEffect, useState } from "react";
import { MiniChartPopup } from "./MiniChartPopup";

type StockTile = { symbol: string; name: string; price: number | null; changePercent: number; weight: number };
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

const TILE_TEXT   = "rgba(255,255,255,0.95)";
const TILE_SHADOW = "0 1px 3px rgba(0,0,0,0.7), 0 0 6px rgba(0,0,0,0.4)";

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
    { symbol: "AAPL",  name: "Apple",     price: null, changePercent:  1.14, weight: 7.2 },
    { symbol: "MSFT",  name: "Microsoft", price: null, changePercent:  1.02, weight: 6.8 },
    { symbol: "NVDA",  name: "NVIDIA",    price: null, changePercent:  2.18, weight: 5.8 },
    { symbol: "AVGO",  name: "Broadcom",  price: null, changePercent:  0.85, weight: 2.5 },
    { symbol: "AMD",   name: "AMD",       price: null, changePercent:  2.17, weight: 1.8 },
    { symbol: "ORCL",  name: "Oracle",    price: null, changePercent: -0.70, weight: 1.5 },
  ]},
  { key: "COMM",   name: "커뮤니케이션", stocks: [
    { symbol: "META",  name: "Meta",      price: null, changePercent:  1.72, weight: 2.8 },
    { symbol: "GOOGL", name: "Alphabet",  price: null, changePercent: -0.69, weight: 2.6 },
    { symbol: "NFLX",  name: "Netflix",   price: null, changePercent: -0.84, weight: 0.8 },
    { symbol: "DIS",   name: "Disney",    price: null, changePercent: -1.20, weight: 0.7 },
  ]},
  { key: "HEALTH", name: "헬스케어",    stocks: [
    { symbol: "LLY",   name: "Eli Lilly",    price: null, changePercent:  0.95, weight: 2.0 },
    { symbol: "UNH",   name: "UnitedHealth", price: null, changePercent:  0.42, weight: 1.8 },
    { symbol: "JNJ",   name: "J&J",          price: null, changePercent: -0.28, weight: 1.4 },
    { symbol: "ABBV",  name: "AbbVie",       price: null, changePercent:  0.63, weight: 1.2 },
  ]},
  { key: "FIN",    name: "금융",        stocks: [
    { symbol: "BRK-B", name: "Berkshire",   price: null, changePercent:  0.78, weight: 3.5 },
    { symbol: "JPM",   name: "JPMorgan",    price: null, changePercent:  1.28, weight: 2.2 },
    { symbol: "V",     name: "Visa",        price: null, changePercent:  0.55, weight: 1.9 },
    { symbol: "MA",    name: "Mastercard",  price: null, changePercent:  0.62, weight: 1.5 },
  ]},
  { key: "CONS_D", name: "임의소비재",  stocks: [
    { symbol: "AMZN",  name: "Amazon",    price: null, changePercent:  1.01, weight: 4.0 },
    { symbol: "TSLA",  name: "Tesla",     price: null, changePercent: -2.18, weight: 1.8 },
    { symbol: "HD",    name: "HomeDepot", price: null, changePercent:  0.35, weight: 1.0 },
    { symbol: "NKE",   name: "Nike",      price: null, changePercent: -0.92, weight: 0.6 },
  ]},
  { key: "IND",    name: "산업재",      stocks: [
    { symbol: "GE",    name: "GE",           price: null, changePercent:  1.45, weight: 1.0 },
    { symbol: "CAT",   name: "Caterpillar",  price: null, changePercent:  0.72, weight: 0.9 },
    { symbol: "BA",    name: "Boeing",       price: null, changePercent: -1.34, weight: 0.7 },
    { symbol: "RTX",   name: "Raytheon",     price: null, changePercent:  0.48, weight: 0.7 },
  ]},
  { key: "CONS_S", name: "필수소비재",  stocks: [
    { symbol: "WMT",   name: "Walmart",   price: null, changePercent:  0.38, weight: 1.5 },
    { symbol: "COST",  name: "Costco",    price: null, changePercent:  0.91, weight: 1.0 },
    { symbol: "PG",    name: "P&G",       price: null, changePercent:  0.18, weight: 1.0 },
    { symbol: "KO",    name: "Coca-Cola", price: null, changePercent:  0.12, weight: 0.9 },
  ]},
  { key: "ENERGY", name: "에너지",      stocks: [
    { symbol: "XOM",   name: "ExxonMobil",     price: null, changePercent: -0.52, weight: 2.0 },
    { symbol: "CVX",   name: "Chevron",        price: null, changePercent: -0.38, weight: 1.4 },
    { symbol: "COP",   name: "ConocoPhillips", price: null, changePercent: -0.75, weight: 0.7 },
  ]},
  { key: "MAT",    name: "소재",        stocks: [
    { symbol: "LIN",   name: "Linde",        price: null, changePercent:  0.35, weight: 0.8 },
    { symbol: "APD",   name: "Air Products", price: null, changePercent:  0.22, weight: 0.4 },
  ]},
  { key: "UTIL",   name: "유틸리티",    stocks: [
    { symbol: "NEE",   name: "NextEra", price: null, changePercent: -0.44, weight: 0.8 },
    { symbol: "DUK",   name: "Duke",    price: null, changePercent:  0.15, weight: 0.4 },
  ]},
  { key: "REIT",   name: "부동산",      stocks: [
    { symbol: "AMT",   name: "American Tower", price: null, changePercent: -0.88, weight: 0.6 },
    { symbol: "PLD",   name: "Prologis",       price: null, changePercent:  0.42, weight: 0.5 },
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
        {visibleStocks.map((s) => (
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
                className="text-[8px] font-semibold leading-tight truncate w-full"
                style={{ color: TILE_TEXT, textShadow: TILE_SHADOW }}
              >
                {s.symbol}
              </p>
              <div className="w-full">
                {s.price != null && (
                  <p
                    className="text-[7px] font-mono-num tabular-nums leading-none truncate"
                    style={{ color: TILE_TEXT, textShadow: TILE_SHADOW, opacity: 0.85 }}
                  >
                    ${s.price >= 1000
                      ? s.price.toLocaleString("en-US", { maximumFractionDigits: 0 })
                      : s.price.toFixed(2)}
                  </p>
                )}
                <p
                  className="text-[9px] font-bold font-mono-num tabular-nums leading-none mt-0.5"
                  style={{ color: TILE_TEXT, textShadow: TILE_SHADOW }}
                >
                  {s.changePercent >= 0 ? "+" : ""}{s.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
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
    // 이전 캐시를 즉시 표시 (mock 대신 마지막 실제값 사용)
    try {
      const cached = localStorage.getItem("sp500-cache");
      if (cached) setSectors(JSON.parse(cached));
    } catch { /* ignore */ }

    fetch("/api/sp500-prices")
      .then((r) => r.json())
      .then((data: Sector[]) => {
        setSectors(data);
        try { localStorage.setItem("sp500-cache", JSON.stringify(data)); } catch { /* ignore */ }
      })
      .catch(() => { if (!sectors) setSectors(MOCK_SECTORS); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
