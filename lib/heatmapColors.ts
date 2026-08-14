/**
 * Heatmap tile colors — Finviz-style.
 * 글자색은 항상 흰색으로 통일 (타일마다 흑/백 섞이면 헷갈림).
 * 배경은 흰 글자가 읽히도록 채도 하한을 둔다.
 */
export type HeatmapTileColors = {
  bg: string;
  fg: string;
  sub: string;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

const FG = "#ffffff";
const SUB = "rgba(255,255,255,0.9)";

/** ±2.5% 이상이면 최대 채도 */
export function heatmapTile(pct: number | null | undefined): HeatmapTileColors {
  if (pct == null || Number.isNaN(pct)) {
    return { bg: "#64748b", fg: FG, sub: SUB };
  }

  const t = clamp01(Math.abs(pct) / 2.5);
  // 흰 글자 대비용 — emerald-500→700 / red-500→700 구간만 사용
  const s = 0.15 + t * 0.85;

  if (pct >= 0) {
    // #22c55e → #166534
    const r = lerp(34, 22, s);
    const g = lerp(197, 101, s);
    const b = lerp(94, 52, s);
    return { bg: `rgb(${r},${g},${b})`, fg: FG, sub: SUB };
  }

  // #ef4444 → #991b1b
  const r = lerp(239, 153, s);
  const g = lerp(68, 27, s);
  const b = lerp(68, 27, s);
  return { bg: `rgb(${r},${g},${b})`, fg: FG, sub: SUB };
}
