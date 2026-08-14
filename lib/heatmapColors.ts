/**
 * Heatmap tile colors — Finviz-style solid greens/reds with adaptive text.
 * Avoids washed pastel + white text (low contrast on light theme).
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

/** ±2.5% 이상이면 최대 채도 */
export function heatmapTile(pct: number | null | undefined): HeatmapTileColors {
  if (pct == null || Number.isNaN(pct)) {
    return { bg: "var(--muted-2)", fg: "var(--text)", sub: "var(--muted)" };
  }

  const t = clamp01(Math.abs(pct) / 2.5);
  // 약한 등락도 연한 파스텔로 가지 않도록 하한
  const s = 0.28 + t * 0.72;

  if (pct >= 0) {
    // emerald-200 → emerald-700  (#a7f3d0 → #047857)
    const r = lerp(167, 4, s);
    const g = lerp(243, 120, s);
    const b = lerp(208, 87, s);
    const lightText = s >= 0.48;
    return {
      bg: `rgb(${r},${g},${b})`,
      fg: lightText ? "#ffffff" : "#052e16",
      sub: lightText ? "rgba(255,255,255,0.92)" : "rgba(5,46,22,0.78)",
    };
  }

  // red-200 → red-700 (#fecaca → #b91c1c)
  const r = lerp(254, 185, s);
  const g = lerp(202, 28, s);
  const b = lerp(202, 28, s);
  const lightText = s >= 0.48;
  return {
    bg: `rgb(${r},${g},${b})`,
    fg: lightText ? "#ffffff" : "#450a0a",
    sub: lightText ? "rgba(255,255,255,0.92)" : "rgba(69,10,10,0.78)",
  };
}
