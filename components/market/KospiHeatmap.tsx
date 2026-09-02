"use client";

import { useEffect, useRef, useState } from "react";
import { MiniChartPopup } from "@/components/MiniChartPopup";
import { SectionInfo } from "@/components/SectionInfo";
import { heatmapTile } from "@/lib/heatmapColors";

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
type Sector = { key: string; name: string; stocks: StockTile[] };
type ApiResponse = { isLive: boolean; isPreopen?: boolean; sectors: Sector[] };

type PopupState = {
  symbol: string;
  name: string;
  price?: number;
  changePercent: number;
  anchorX: number;
  anchorY: number;
};

/** S&P500 히트맵과 동일한 행·타일 레이아웃 */
const LAYOUT: { rowH: number; sections: { key: string; flex: number; maxStocks: number }[] }[] = [
  { rowH: 100, sections: [{ key: "SEMI", flex: 10, maxStocks: 5 }] },
  {
    rowH: 90,
    sections: [
      { key: "BAT", flex: 5, maxStocks: 4 },
      { key: "AUTO", flex: 5, maxStocks: 3 },
    ],
  },
  {
    rowH: 82,
    sections: [
      { key: "BIO", flex: 4, maxStocks: 2 },
      { key: "FIN", flex: 6, maxStocks: 4 },
    ],
  },
  {
    rowH: 74,
    sections: [
      { key: "IT", flex: 6, maxStocks: 4 },
      { key: "IND", flex: 4, maxStocks: 4 },
    ],
  },
  { rowH: 64, sections: [{ key: "ENERGY", flex: 10, maxStocks: 3 }] },
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
  const totalW = visibleStocks.reduce((a, s) => a + s.weight, 0) || 1;
  const LABEL_H = 14;
  const tileH = rowH - LABEL_H;

  return (
    <div className="flex flex-col overflow-hidden" style={{ flex, minWidth: 0 }}>
      <div
        className="flex items-center px-1.5 flex-shrink-0"
        style={{ height: LABEL_H, background: "var(--muted-2)" }}
      >
        <span className="text-[9px] font-bold truncate" style={{ color: "var(--text)" }}>
          {sector.name}
        </span>
      </div>
      <div className="flex overflow-hidden" style={{ height: tileH, gap: "1px" }}>
        {visibleStocks.map((s) => {
          const c = heatmapTile(s.changePercent);
          return (
            <div
              key={s.symbol}
              className="flex flex-col items-start justify-between p-1.5 overflow-hidden select-none cursor-pointer transition-opacity active:opacity-80"
              style={{ flex: s.weight / totalW, background: c.bg, minWidth: 0, touchAction: "pan-x pan-y" }}
              onClick={(e) => {
                e.stopPropagation();
                onTileClick(s.symbol, s.name, s.changePercent ?? 0, e.clientX, e.clientY, s.price ?? undefined);
              }}
            >
              <div className="w-full overflow-hidden">
                <p className="text-[11px] font-bold leading-none truncate" style={{ color: c.fg }}>
                  {s.name}
                </p>
                <p className="text-[8px] leading-tight truncate mt-0.5 font-medium" style={{ color: c.sub }}>
                  {s.symbol}
                </p>
              </div>
              <div className="w-full">
                {s.price != null && (
                  <p className="text-[10px] font-mono-num tabular-nums leading-none truncate font-medium" style={{ color: c.sub }}>
                    {s.price.toLocaleString("ko-KR")}
                  </p>
                )}
                <p className="text-[12px] font-bold font-mono-num tabular-nums leading-none mt-0.5" style={{ color: c.fg }}>
                  {s.changePercent == null
                    ? "—"
                    : `${s.changePercent >= 0 ? "+" : ""}${s.changePercent.toFixed(2)}%`}
                </p>
              </div>
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
        <div key={i} className="animate-pulse" style={{ flex: s.flex, background: "var(--muted-2)" }} />
      ))}
    </div>
  );
}

export function KospiHeatmap() {
  const [sectors, setSectors] = useState<Sector[] | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [isPreopen, setIsPreopen] = useState(false);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const isDesktop = useIsDesktop();
  const [thumbL, setThumbL] = useState(0);
  const [thumbW, setThumbW] = useState(100);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const max = scrollWidth - clientWidth;
      if (max <= 0) {
        setThumbW(100);
        return;
      }
      const w = (clientWidth / scrollWidth) * 100;
      setThumbW(w);
      setThumbL((scrollLeft / max) * (100 - w));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("kospi-heatmap-cache-v4");
      if (cached) {
        const parsed = JSON.parse(cached) as ApiResponse;
        if (parsed?.sectors) {
          setSectors(parsed.sectors);
          setIsLive(parsed.isLive);
          setIsPreopen(!!parsed.isPreopen);
        }
      }
    } catch { /* ignore */ }

    const doFetch = () => {
      fetch("/api/kospi-heatmap")
        .then((r) => r.json())
        .then((data: ApiResponse) => {
          setSectors(data.sectors);
          setIsLive(data.isLive);
          setIsPreopen(!!data.isPreopen);
          try {
            localStorage.setItem("kospi-heatmap-cache-v4", JSON.stringify(data));
          } catch { /* ignore */ }
        })
        .catch(() => {});
    };
    doFetch();
    const id = setInterval(doFetch, 60_000);
    return () => clearInterval(id);
  }, []);

  const sectorMap = Object.fromEntries((sectors ?? []).map((s) => [s.key, s]));

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <SectionInfo title="코스피 히트맵">
          <p className="font-bold mb-1" style={{ color: "var(--mint)" }}>코스피 히트맵이란?</p>
          <p style={{ color: "var(--muted)" }}>한국 대형주를 <b>한 화면</b>에서 보는 지도예요. 미국 S&amp;P500 히트맵과 같은 형식입니다.</p>
          <div className="mt-2 space-y-1">
            <p>🟩 <b>초록색</b> = 오늘 오른 종목</p>
            <p>🟥 <b>빨간색</b> = 오늘 내린 종목</p>
            <p>📐 <b>타일 크기</b> = 시가총액 비중</p>
            <p>🏢 <b>섹터 구분</b> = 반도체·자동차·금융 등</p>
          </div>
        </SectionInfo>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          {isPreopen ? "전일 종가 등락률" : "섹터별 등락률"}
        </span>
      </div>

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
                            onTileClick={(symbol, name, changePercent, x, y, price) =>
                              setPopup({ symbol, name, price, changePercent, anchorX: x, anchorY: y })
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      <div className="px-4 py-2.5" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="relative h-[3px] rounded-full" style={{ background: "var(--border)" }}>
          <div
            className="absolute top-0 h-[3px] rounded-full"
            style={{ left: `${thumbL}%`, width: `${thumbW}%`, background: "var(--muted-2)", borderRadius: 9999 }}
          />
        </div>
      </div>

      <div className="px-4 py-2 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          코스피 · 섹터 구성 · 시가총액 비례
        </span>
        {!isLive && sectors !== null && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}>
            참고용
          </span>
        )}
      </div>

      {popup && (
        <MiniChartPopup
          symbol={popup.symbol.includes(".") ? popup.symbol : `${popup.symbol}.KS`}
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
