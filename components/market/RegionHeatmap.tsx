"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { KR_RE_POLICIES, type KrRePolicy } from "@/lib/markets/krReMock";
import type { RegionCell } from "@/lib/markets/krReRegions";

function cellBg(pct: number): string {
  if (pct > 0.3) return "rgba(16,185,129,0.45)";
  if (pct > 0) return "rgba(16,185,129,0.22)";
  if (pct > -0.15) return "rgba(239,68,68,0.18)";
  return "rgba(239,68,68,0.4)";
}

function PolicyModal({ policy, onClose }: { policy: KrRePolicy; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border p-5"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-bold font-syne leading-snug" style={{ color: "var(--text)" }}>
            {policy.title}
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg" aria-label="닫기">
            <X className="w-5 h-5" style={{ color: "var(--muted)" }} />
          </button>
        </div>
        <p className="text-[13px] leading-relaxed whitespace-pre-line mb-4" style={{ color: "var(--text)" }}>
          {policy.body}
        </p>
        <p className="text-[11px] font-semibold mb-2" style={{ color: "var(--muted)" }}>
          관련 법령 · 공식 링크
        </p>
        <div className="space-y-2">
          {policy.links.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-semibold"
              style={{ borderColor: "var(--border)", color: "var(--mint)" }}
            >
              <span>{l.label}</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PolicyHighlightCards() {
  const [selected, setSelected] = useState<KrRePolicy | null>(null);

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
          정부정책 하이라이트
        </h3>
        {KR_RE_POLICIES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(p)}
            className="w-full text-left rounded-2xl border p-3.5 transition-opacity active:opacity-80"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>{p.title}</p>
            <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
              {p.summary}
            </p>
            <p className="text-[10px] font-semibold mt-2" style={{ color: "var(--mint)" }}>
              자세히 보기 →
            </p>
          </button>
        ))}
      </div>
      {selected && <PolicyModal policy={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

export function RegionHeatmap() {
  const [regions, setRegions] = useState<RegionCell[]>([]);
  const [periodLabel, setPeriodLabel] = useState("");
  const [source, setSource] = useState("");
  const [limited, setLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/kr-re-regions")
      .then((r) => r.json())
      .then((d: {
        regions?: RegionCell[];
        periodLabel?: string;
        source?: string;
        limited?: boolean;
      }) => {
        setRegions(d.regions ?? []);
        setPeriodLabel(d.periodLabel ?? "");
        setSource(d.source ?? "");
        setLimited(!!d.limited);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3 className="text-xs font-semibold tracking-widest uppercase font-syne mb-1" style={{ color: "var(--text)" }}>
        지역 아파트 매매 등락
      </h3>
      {periodLabel && (
        <p className="text-[10px] mb-2" style={{ color: "var(--muted)" }}>{periodLabel}</p>
      )}
      {loading ? (
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg min-h-[56px] animate-pulse" style={{ background: "var(--muted-2)" }} />
          ))}
        </div>
      ) : error || regions.length === 0 ? (
        <p className="text-[12px] py-4 text-center rounded-xl border" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
          한국부동산원 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-1.5">
          {regions.map((r) => (
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
      )}
      {source && (
        <p className="text-[10px] mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
          ※ {source}
          {limited && " · REB_API_KEY 설정 시 전국 세부 지역 표시"}
        </p>
      )}
    </div>
  );
}
