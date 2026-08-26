"use client";

import { useMemo } from "react";
import type { Quote } from "@/lib/api";
import { heatmapTile } from "@/lib/heatmapColors";
import { SectionInfo } from "@/components/SectionInfo";
import { SAFE_CRYPTO_TOP5, SAFE_PHYSICAL_TOP5 } from "@/lib/markets/config";

type StockTile = { symbol: string; name: string; price: number | null; changePercent: number | null; weight: number };
type Sector = { key: string; name: string; stocks: StockTile[] };

/** S&P500 / 코스피 히트맵과 동일한 섹터 타일 레이아웃 */
const LAYOUT: { rowH: number; sections: { key: string; flex: number; maxStocks: number }[] }[] = [
  { rowH: 110, sections: [{ key: "CRYPTO", flex: 10, maxStocks: 5 }] },
  { rowH: 110, sections: [{ key: "PHYS", flex: 10, maxStocks: 5 }] },
];

function SectorBlock({
  sector,
  flex,
  rowH,
  maxStocks,
}: {
  sector: Sector;
  flex: number;
  rowH: number;
  maxStocks: number;
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
              className="flex flex-col items-start justify-between p-1.5 overflow-hidden select-none"
              style={{ flex: s.weight / totalW, background: c.bg, minWidth: 0 }}
            >
              <div className="w-full overflow-hidden">
                <p className="text-[11px] font-bold leading-none truncate" style={{ color: c.fg }}>
                  {s.name}
                </p>
                <p className="text-[8px] leading-tight truncate mt-0.5 font-medium" style={{ color: c.sub }}>
                  {s.symbol.replace("-USD", "").replace("=F", "")}
                </p>
              </div>
              <div className="w-full">
                {s.price != null && (
                  <p className="text-[10px] font-mono-num tabular-nums leading-none truncate font-medium" style={{ color: c.sub }}>
                    {s.price >= 1000
                      ? s.price.toLocaleString("en-US", { maximumFractionDigits: 0 })
                      : s.price.toFixed(2)}
                  </p>
                )}
                <p className="text-[11px] font-mono-num tabular-nums font-bold leading-none mt-0.5" style={{ color: c.fg }}>
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
  const toTiles = (list: typeof SAFE_CRYPTO_TOP5, weightBase: number): StockTile[] =>
    list.map((s, i) => {
      const q = bySym.get(s.symbol);
      return {
        symbol: s.symbol,
        name: s.name,
        price: q?.price ?? null,
        changePercent: q?.changePercent ?? null,
        weight: weightBase - i,
      };
    }).filter((t) => t.price != null || t.changePercent != null);

  return [
    { key: "CRYPTO", name: "가상화폐 탑5", stocks: toTiles(SAFE_CRYPTO_TOP5, 10) },
    { key: "PHYS", name: "현물자산 탑5", stocks: toTiles(SAFE_PHYSICAL_TOP5, 10) },
  ].filter((sec) => sec.stocks.length > 0);
}

export function SafeAssetsHeatmap({ quotes }: { quotes: Quote[] }) {
  const sectors = useMemo(() => buildSectors(quotes), [quotes]);

  if (sectors.length === 0) return null;

  const sectorMap = Object.fromEntries(sectors.map((s) => [s.key, s]));

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <h3 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
          안전자산 히트맵
        </h3>
        <SectionInfo title="안전자산 히트맵">
          <p>가상화폐 탑5 · 현물 탑5를 본사이트 S&amp;P500 히트맵과 같은 타일로 보여 줍니다. 초록은 상승, 빨강은 하락입니다.</p>
        </SectionInfo>
      </div>
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
        {LAYOUT.map((row, ri) => (
          <div key={ri} className="flex" style={{ height: row.rowH, gap: "1px", marginBottom: ri < LAYOUT.length - 1 ? 1 : 0 }}>
            {row.sections.map((sec) => {
              const sector = sectorMap[sec.key];
              if (!sector) {
                return <div key={sec.key} style={{ flex: sec.flex, background: "var(--muted-2)" }} />;
              }
              return (
                <SectorBlock
                  key={sec.key}
                  sector={sector}
                  flex={sec.flex}
                  rowH={row.rowH}
                  maxStocks={sec.maxStocks}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
