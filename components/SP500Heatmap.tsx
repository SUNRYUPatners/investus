"use client";

import { useEffect, useRef, useState } from "react";
import { MiniChartPopup } from "./MiniChartPopup";
import { SectionInfo } from "./SectionInfo";

function useIsDesktop() {
  const [lg, setLg] = useState(false);
  useEffect(() => {
    const check = () => setLg(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return lg;
}

type StockTile = { symbol: string; name: string; price: number | null; changePercent: number | null; weight: number };
type Sector    = { key: string; name: string; stocks: StockTile[] };
type ApiResponse = { isLive: boolean; sectors: Sector[] };

type PopupState = {
  symbol: string;
  name: string;
  price?: number;
  changePercent: number;
  anchorX: number;
  anchorY: number;
};

function bg(pct: number | null) {
  if (pct == null) return "rgba(255,255,255,0.06)";
  const t = Math.min(Math.abs(pct) / 3, 1);
  const a = 0.16 + t * 0.64;
  return pct >= 0 ? `rgba(0,229,160,${a})` : `rgba(255,77,109,${a})`;
}

const TILE_TEXT = "rgba(255,255,255,0.95)";

const LAYOUT: { rowH: number; sections: { key: string; flex: number; maxStocks: number }[] }[] = [
  {
    rowH: 100,
    sections: [
      { key: "IT", flex: 10, maxStocks: 6 },
    ],
  },
  {
    rowH: 90,
    sections: [
      { key: "COMM",   flex: 4, maxStocks: 4 },
      { key: "HEALTH", flex: 5, maxStocks: 5 },
    ],
  },
  {
    rowH: 82,
    sections: [
      { key: "FIN",    flex: 5, maxStocks: 5 },
      { key: "CONS_D", flex: 5, maxStocks: 4 },
    ],
  },
  {
    rowH: 74,
    sections: [
      { key: "IND",    flex: 3, maxStocks: 4 },
      { key: "CONS_S", flex: 3, maxStocks: 4 },
      { key: "ENERGY", flex: 3, maxStocks: 3 },
    ],
  },
  {
    rowH: 64,
    sections: [
      { key: "MAT",  flex: 2, maxStocks: 3 },
      { key: "UTIL", flex: 2, maxStocks: 3 },
      { key: "REIT", flex: 2, maxStocks: 2 },
    ],
  },
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
  onTileClick: (symbol: string, name: string, changePercent: number, x: number, y: number, price?: number) => void;
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
                touchAction: "pan-x pan-y",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onTileClick(s.symbol, s.name, s.changePercent ?? 0, e.clientX, e.clientY, s.price ?? undefined);
              }}
            >
              <div className="w-full overflow-hidden">
                <p
                  className="text-[11px] font-semibold leading-none truncate"
                  style={{ color: TILE_TEXT }}
                >
                  {s.symbol}
                </p>
                <p
                  className="text-[8px] leading-tight truncate mt-0.5"
                  style={{ color: TILE_TEXT, opacity: 0.7 }}
                >
                  {s.name}
                </p>
              </div>
              <div className="w-full">
                {s.price != null && (
                  <p
                    className="text-[10px] font-mono-num tabular-nums leading-none truncate"
                    style={{ color: TILE_TEXT, opacity: 0.85 }}
                  >
                    ${s.price >= 1000
                      ? s.price.toLocaleString("en-US", { maximumFractionDigits: 0 })
                      : s.price.toFixed(2)}
                  </p>
                )}
                <p
                  className="text-[12px] font-bold font-mono-num tabular-nums leading-none mt-0.5"
                  style={{ color: TILE_TEXT }}
                >
                  {s.changePercent == null ? "—" : `${s.changePercent >= 0 ? "+" : ""}${s.changePercent.toFixed(2)}%`}
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
  const [isLive, setIsLive]   = useState(true);
  const [popup, setPopup]     = useState<PopupState | null>(null);
  const isDesktop = useIsDesktop();
  const [thumbL, setThumbL]   = useState(0);
  const [thumbW, setThumbW]   = useState(100);
  const scrollRef             = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    try {
      const cached = localStorage.getItem("sp500-cache");
      if (cached) {
        const parsed = JSON.parse(cached) as ApiResponse | Sector[];
        const sectors = Array.isArray(parsed) ? parsed : parsed.sectors;
        setSectors(sectors);
        if (!Array.isArray(parsed)) setIsLive(parsed.isLive);
      }
    } catch { /* ignore */ }

    fetch("/api/sp500-prices")
      .then((r) => r.json())
      .then((data: ApiResponse) => {
        setSectors(data.sectors);
        setIsLive(data.isLive);
        try { localStorage.setItem("sp500-cache", JSON.stringify(data)); } catch { /* ignore */ }
      })
      .catch(() => { /* keep cached or null */ });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sectorMap = Object.fromEntries(
    (sectors ?? []).map((s) => [s.key, s])
  );

  const handleTileClick = (symbol: string, name: string, changePercent: number, x: number, y: number, price?: number) => {
    setPopup({ symbol, name, price, changePercent, anchorX: x, anchorY: y });
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
        <SectionInfo title="S&P 500 히트맵">
          <p className="font-bold mb-1" style={{ color: "var(--mint)" }}>S&P 500 히트맵이란?</p>
          <p style={{ color: "var(--muted)" }}>미국 대형주 500개를 <b>한 화면</b>에서 보는 지도예요.</p>
          <div className="mt-2 space-y-1">
            <p>🟩 <b>초록색</b> = 오늘 오른 종목</p>
            <p>🟥 <b>빨간색</b> = 오늘 내린 종목</p>
            <p>📐 <b>타일 크기</b> = 시가총액. 클수록 대형주 (애플·엔비디아 등)</p>
            <p>🏢 <b>섹터 구분</b> = 기술·헬스케어·금융 등 업종별로 묶여 있어요</p>
          </div>
          <p className="mt-2 text-[10px]" style={{ color: "var(--muted)" }}>종목 클릭 → 10년 차트를 바로 확인할 수 있어요</p>
        </SectionInfo>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          섹터별 등락률
        </span>
      </div>

      {/* Treemap — horizontal scroll on small screens */}
      <div ref={scrollRef} className="overflow-x-auto no-scrollbar" style={{ touchAction: "pan-x pan-y", overflowY: "hidden" }}>
        <div style={{ minWidth: "520px", touchAction: "pan-x pan-y" }}>
          <div className="flex flex-col" style={{ gap: "1px", background: "var(--border)" }}>
            {sectors === null
              ? LAYOUT.map((row, ri) => {
                  const rH = isDesktop ? row.rowH + 40 : row.rowH;
                  return <SkeletonRow key={ri} rowH={rH} sections={row.sections} />;
                })
              : LAYOUT.map((row) => {
                  const rH = isDesktop ? row.rowH + 40 : row.rowH;
                  return (
                  <div
                    key={row.sections.map((s) => s.key).join("-")}
                    className="flex"
                    style={{ height: rH, gap: "1px" }}
                  >
                    {row.sections.map(({ key, flex, maxStocks }) => {
                      const sector = sectorMap[key];
                      if (!sector) return null;
                      return (
                        <SectorBlock
                          key={key}
                          sector={sector}
                          flex={flex}
                          rowH={rH}
                          maxStocks={maxStocks}
                          onTileClick={handleTileClick}
                        />
                      );
                    })}
                  </div>
                  );
                })}
          </div>
        </div>
      </div>

      {/* Scroll indicator — always visible */}
      <div className="px-4 py-2.5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="relative h-[3px] rounded-full" style={{ background: "var(--border)" }}>
          <div
            className="absolute top-0 h-[3px] rounded-full"
            style={{ left: `${thumbL}%`, width: `${thumbW}%`, background: "var(--muted-2)", borderRadius: 9999 }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          S&P 500 · 섹터 구성 · 시가총액 비례
        </span>
        {!isLive && sectors !== null && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>
            참고용
          </span>
        )}
      </div>

      {popup && (
        <MiniChartPopup
          symbol={popup.symbol}
          name={popup.name}
          price={popup.price}
          changePercent={popup.changePercent}
          anchorX={popup.anchorX}
          anchorY={popup.anchorY}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
