"use client";

import { KR_RE_POLICIES, KR_RE_REGIONS } from "@/lib/markets/krReMock";

function cellBg(pct: number): string {
  if (pct > 0.3) return "rgba(16,185,129,0.45)";
  if (pct > 0) return "rgba(16,185,129,0.22)";
  if (pct > -0.15) return "rgba(239,68,68,0.18)";
  return "rgba(239,68,68,0.4)";
}

export function RegionHeatmap() {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest uppercase font-syne mb-2" style={{ color: "var(--text)" }}>
        지역 매매·전세 등락 (목업)
      </h3>
      <div className="grid grid-cols-4 gap-1.5">
        {KR_RE_REGIONS.map((r) => (
          <div
            key={r.id}
            className="rounded-lg p-2 min-h-[56px] flex flex-col justify-between"
            style={{ background: cellBg(r.changePercent) }}
          >
            <span className="text-[10px] font-bold truncate" style={{ color: "var(--text)" }}>{r.name}</span>
            <span className="text-[10px] font-mono" style={{ color: "var(--text)" }}>
              {r.changePercent >= 0 ? "+" : ""}{r.changePercent.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] mt-2" style={{ color: "var(--muted)" }}>
        ※ 미리보기 목업 · 실거래가 API 연동 전
      </p>
    </div>
  );
}

export function PolicyHighlightCards() {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
        정부정책 하이라이트
      </h3>
      {KR_RE_POLICIES.map((p) => (
        <div
          key={p.title}
          className="rounded-2xl border p-3"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{p.title}</p>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{p.body}</p>
        </div>
      ))}
    </div>
  );
}
