"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Quote } from "@/lib/api";
import { heatmapTile } from "@/lib/heatmapColors";
import { MiniChartPopup } from "@/components/MiniChartPopup";
import { SectionInfo } from "@/components/SectionInfo";
import {
  SAFE_CRYPTO_TOP10,
  SAFE_HAVEN_TOP10,
  SAFE_PHYSICAL_TOP10,
  type MarketSymbol,
} from "@/lib/markets/config";
import { SAFE_HEATMAP_MIN_WIDTH, safeHeatmapWeight } from "@/lib/markets/safeHeatmapWeights";

type StockTile = { symbol: string; name: string; price: number | null; changePercent: number | null; weight: number };
type Sector = { key: string; name: string; stocks: StockTile[] };

type PopupState = {
  symbol: string;
  name: string;
  price?: number;
  changePercent: number;
  anchorX: number;
  anchorY: number;
};

const ROWS: { key: string; name: string; rowH: number }[] = [
  { key: "CRYPTO", name: "가상화폐 탑10", rowH: 100 },
  { key: "PHYS", name: "현물자산 탑10", rowH: 96 },
  { key: "HAVEN", name: "안전자산 탑10", rowH: 96 },
];

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

function displaySymbol(symbol: string): string {
  return symbol
    .replace("-USD", "")
    .replace("=F", "")
    .replace("DX-Y.NYB", "DXY");
}

function SectorRow({
  sector,
  rowH,
  onTileClick,
}: {
  sector: Sector;
  rowH: number;
  onTileClick: (symbol: string, name: string, changePercent: number, x: number, y: number, price?: number) => void;
}) {
  const stocks = [...sector.stocks].sort((a, b) => b.weight - a.weight);
  const totalW = stocks.reduce((a, s) => a + s.weight, 0) || 1;
  const LABEL_H = 14;
  const tileH = rowH - LABEL_H;

  return (
    <div className="flex flex-col flex-shrink-0" style={{ minWidth: SAFE_HEATMAP_MIN_WIDTH }}>
      <div
        className="flex items-center px-1.5 flex-shrink-0"
        style={{ height: LABEL_H, background: "var(--muted-2)" }}
      >
        <span className="text-[9px] font-bold whitespace-nowrap" style={{ color: "var(--text)" }}>
          {sector.name}
        </span>
        <span className="text-[8px] ml-2 whitespace-nowrap" style={{ color: "var(--muted)" }}>
          타일 크기 = 시총·규모 비례
        </span>
      </div>
      <div className="flex" style={{ height: tileH, gap: "1px" }}>
        {stocks.map((s) => {
          const c = heatmapTile(s.changePercent);
          const share = s.weight / totalW;
          const minTileW = Math.max(56, Math.round(share * SAFE_HEATMAP_MIN_WIDTH));
          const showFullName = share >= 0.08 || minTileW >= 88;

          return (
            <div
              key={s.symbol}
              className="flex flex-col items-start justify-between p-1.5 select-none cursor-pointer transition-opacity active:opacity-80"
              style={{
                flexGrow: s.weight,
                flexShrink: 0,
                flexBasis: minTileW,
                background: c.bg,
                minWidth: minTileW,
                touchAction: "pan-x pan-y",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onTileClick(s.symbol, s.name, s.changePercent ?? 0, e.clientX, e.clientY, s.price ?? undefined);
              }}
            >
              <div className="w-full" style={{ minWidth: 0 }}>
                <p
                  className="text-[11px] font-bold leading-none whitespace-nowrap"
                  style={{ color: c.fg }}
                >
                  {showFullName ? s.name : displaySymbol(s.symbol)}
                </p>
                <p
                  className="text-[8px] leading-tight mt-0.5 font-medium whitespace-nowrap"
                  style={{ color: c.sub }}
                >
                  {showFullName ? displaySymbol(s.symbol) : s.name}
                </p>
              </div>
              <div className="w-full">
                {s.price != null && (
                  <p
                    className="text-[10px] font-mono-num tabular-nums leading-none font-medium whitespace-nowrap"
                    style={{ color: c.sub }}
                  >
                    {s.price >= 1000
                      ? s.price.toLocaleString("en-US", { maximumFractionDigits: 0 })
                      : s.price.toFixed(2)}
                  </p>
                )}
                <p
                  className="text-[12px] font-bold font-mono-num tabular-nums leading-none mt-0.5 whitespace-nowrap"
                  style={{ color: c.fg }}
                >
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

function buildSectors(quotes: Quote[]): Sector[] {
  const bySym = new Map(quotes.map((q) => [q.symbol, q]));
  const toTiles = (list: MarketSymbol[]): StockTile[] =>
    list
      .map((s) => {
        const q = bySym.get(s.symbol);
        return {
          symbol: s.symbol,
          name: s.name,
          price: q?.price ?? null,
          changePercent: q?.changePercent ?? null,
          weight: safeHeatmapWeight(s.symbol),
        };
      })
      .filter((t) => t.price != null || t.changePercent != null);

  return [
    { key: "CRYPTO", name: "가상화폐 탑10", stocks: toTiles(SAFE_CRYPTO_TOP10) },
    { key: "PHYS", name: "현물자산 탑10", stocks: toTiles(SAFE_PHYSICAL_TOP10) },
    { key: "HAVEN", name: "안전자산 탑10", stocks: toTiles(SAFE_HAVEN_TOP10) },
  ].filter((sec) => sec.stocks.length > 0);
}

export function SafeAssetsHeatmap({ quotes }: { quotes: Quote[] }) {
  const sectors = useMemo(() => buildSectors(quotes), [quotes]);
  const isDesktop = useIsDesktop();
  const [popup, setPopup] = useState<PopupState | null>(null);
  const [thumbL, setThumbL] = useState(0);
  const [thumbW, setThumbW] = useState(100);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sectorMap = Object.fromEntries(sectors.map((s) => [s.key, s]));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const max = scrollWidth - clientWidth;
      if (max <= 0) {
        setThumbW(100);
        setThumbL(0);
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
  }, [sectors]);

  if (sectors.length === 0) return null;

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <SectionInfo title="안전자산 히트맵">
          <p className="font-bold mb-1" style={{ color: "var(--mint)" }}>안전자산 히트맵이란?</p>
          <p style={{ color: "var(--muted)" }}>
            가상화폐·현물·달러·국채를 <b>한 화면</b>에서 보는 지도예요. 미국 S&amp;P500 히트맵과 같은 형식입니다.
          </p>
          <div className="mt-2 space-y-1">
            <p>🟩 <b>초록색</b> = 오늘 오른 자산</p>
            <p>🟥 <b>빨간색</b> = 오늘 내린 자산</p>
            <p>📐 <b>타일 크기</b> = 시가총액·ETF 규모·시장 중요도 비례 (비트코인·금·BND 등이 큼)</p>
          </div>
          <p className="mt-2 text-[10px]" style={{ color: "var(--muted)" }}>
            화면이 좁으면 <b>옆으로 스와이프</b>하세요. 타일 클릭 → 차트 확인
          </p>
        </SectionInfo>
        <span className="text-[10px] flex-shrink-0 ml-2" style={{ color: "var(--muted)" }}>
          시총·규모 비례
        </span>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar"
        style={{ touchAction: "pan-x pan-y", overflowY: "hidden" }}
      >
        <div
          className="flex flex-col"
          style={{ gap: "1px", background: "var(--border)", minWidth: SAFE_HEATMAP_MIN_WIDTH, touchAction: "pan-x pan-y" }}
        >
          {ROWS.map((row) => {
            const sector = sectorMap[row.key];
            if (!sector) return null;
            const rH = isDesktop ? row.rowH + 36 : row.rowH;
            return (
              <SectorRow
                key={row.key}
                sector={sector}
                rowH={rH}
                onTileClick={(symbol, name, changePercent, x, y, price) =>
                  setPopup({ symbol, name, price, changePercent, anchorX: x, anchorY: y })
                }
              />
            );
          })}
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

      <div className="px-4 py-2 border-t flex items-center justify-between gap-2" style={{ borderColor: "var(--border)" }}>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          안전자산 · 시총·규모 비례 · 좁은 화면은 옆으로 스와이프
        </span>
        <a
          href="/learn/safe-haven-etfs"
          className="text-[9px] px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
          style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa", textDecoration: "none" }}
        >
          티커 해설
        </a>
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
