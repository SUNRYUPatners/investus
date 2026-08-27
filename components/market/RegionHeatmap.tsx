"use client";

import { useEffect, useMemo, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { KR_RE_POLICIES, type KrRePolicy } from "@/lib/markets/krReMock";
import type { RegionCell, TxnCell } from "@/lib/markets/krReRegions";

function cellBg(pct: number): string {
  if (pct > 0.5) return "rgba(220,38,38,0.55)";
  if (pct > 0.25) return "rgba(248,113,113,0.35)";
  if (pct > -0.25) return "rgba(234,179,8,0.22)";
  if (pct > -0.5) return "rgba(96,165,250,0.28)";
  return "rgba(37,99,235,0.45)";
}

function txnBarBg(ratio: number): string {
  const a = 0.15 + Math.min(1, ratio) * 0.45;
  return `rgba(var(--mint-rgb),${a.toFixed(2)})`;
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

type Tab = "price" | "txn";

type TxnPayload = {
  regions: TxnCell[];
  national: number | null;
  periodLabel: string;
  source: string;
};

function SaleSummary({ regions }: { regions: RegionCell[] }) {
  const sido = useMemo(() => {
    const skip = new Set(["수도권", "지방", "5대광역시", "8개도"]);
    return regions.filter((r) => !skip.has(r.name) && r.name.length <= 4);
  }, [regions]);

  const national = sido.find((r) => r.name === "전국");
  const ranked = sido.filter((r) => r.name !== "전국");
  const top = ranked.slice(0, 2);
  const bottom = [...ranked].reverse().slice(0, 2);

  if (sido.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="rounded-xl border p-2.5" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <p className="text-[10px] mb-1" style={{ color: "var(--muted)" }}>전국</p>
        <p className="text-sm font-bold font-mono" style={{ color: "var(--text)" }}>
          {national ? `${national.changePercent >= 0 ? "+" : ""}${national.changePercent.toFixed(2)}%` : "—"}
        </p>
      </div>
      <div className="rounded-xl border p-2.5" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <p className="text-[10px] mb-1" style={{ color: "var(--muted)" }}>상위</p>
        {top.map((r) => (
          <p key={r.id} className="text-[11px] font-semibold truncate" style={{ color: "var(--text)" }}>
            {r.name} <span className="font-mono" style={{ color: "var(--up)" }}>+{r.changePercent.toFixed(2)}</span>
          </p>
        ))}
      </div>
      <div className="rounded-xl border p-2.5" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
        <p className="text-[10px] mb-1" style={{ color: "var(--muted)" }}>하위</p>
        {bottom.map((r) => (
          <p key={r.id} className="text-[11px] font-semibold truncate" style={{ color: "var(--text)" }}>
            {r.name}{" "}
            <span className="font-mono" style={{ color: r.changePercent >= 0 ? "var(--up)" : "var(--down)" }}>
              {r.changePercent >= 0 ? "+" : ""}{r.changePercent.toFixed(2)}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

function TxnPanel({ txn }: { txn: TxnPayload }) {
  const list = txn.regions.filter((r) => r.name !== "전국");
  const maxVol = Math.max(...list.map((r) => r.volume), 1);

  return (
    <div>
      {txn.national != null && (
        <div
          className="rounded-xl border px-3.5 py-3 mb-3 flex items-end justify-between"
          style={{ borderColor: "rgba(var(--mint-rgb),0.25)", background: "rgba(var(--mint-rgb),0.06)" }}
        >
          <div>
            <p className="text-[10px] font-semibold tracking-wide" style={{ color: "var(--muted)" }}>
              전국 아파트 매매
            </p>
            <p className="text-xl font-bold font-mono tabular-nums mt-0.5" style={{ color: "var(--text)" }}>
              {txn.national.toLocaleString("ko-KR")}
              <span className="text-xs font-semibold ml-1" style={{ color: "var(--muted)" }}>호</span>
            </p>
          </div>
          {(() => {
            const nat = txn.regions.find((r) => r.name === "전국");
            if (nat?.changePercent == null) return null;
            const pos = nat.changePercent >= 0;
            return (
              <p className="text-[12px] font-bold font-mono" style={{ color: pos ? "var(--up)" : "var(--down)" }}>
                전월 {pos ? "+" : ""}{nat.changePercent.toFixed(1)}%
              </p>
            );
          })()}
        </div>
      )}

      <div className="space-y-1.5">
        {list.map((r) => (
          <div
            key={r.id}
            className="rounded-lg px-2.5 py-2 flex items-center gap-2"
            style={{ background: txnBarBg(r.volume / maxVol) }}
          >
            <span className="w-10 text-[11px] font-bold flex-shrink-0" style={{ color: "var(--text)" }}>
              {r.name}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(4, (r.volume / maxVol) * 100)}%`,
                  background: "var(--mint)",
                }}
              />
            </div>
            <span className="w-[72px] text-right text-[11px] font-mono font-semibold tabular-nums" style={{ color: "var(--text)" }}>
              {r.volume.toLocaleString("ko-KR")}호
            </span>
            <span
              className="w-12 text-right text-[10px] font-mono tabular-nums"
              style={{
                color:
                  r.changePercent == null
                    ? "var(--muted)"
                    : r.changePercent >= 0
                      ? "var(--up)"
                      : "var(--down)",
              }}
            >
              {r.changePercent == null
                ? "—"
                : `${r.changePercent >= 0 ? "+" : ""}${r.changePercent.toFixed(0)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegionHeatmap() {
  const [tab, setTab] = useState<Tab>("txn");
  const [regions, setRegions] = useState<RegionCell[]>([]);
  const [periodLabel, setPeriodLabel] = useState("");
  const [source, setSource] = useState("");
  const [limited, setLimited] = useState(false);
  const [txn, setTxn] = useState<TxnPayload | null>(null);
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
        transactions?: TxnPayload;
      }) => {
        setRegions(d.regions ?? []);
        setPeriodLabel(d.periodLabel ?? "");
        setSource(d.source ?? "");
        setLimited(!!d.limited);
        setTxn(d.transactions ?? null);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const activePeriod = tab === "txn" ? (txn?.periodLabel ?? "") : periodLabel;
  const activeSource = tab === "txn" ? (txn?.source ?? "") : source;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
          아파트 시장 지표
        </h3>
        <div className="flex rounded-full p-0.5 gap-0.5" style={{ background: "var(--border)" }}>
          {([
            { id: "txn" as const, label: "거래호수" },
            { id: "price" as const, label: "매매등락" },
          ]).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all"
              style={
                tab === t.id
                  ? { background: "var(--card)", color: "var(--text)" }
                  : { color: "var(--muted)" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activePeriod && (
        <p className="text-[10px] mb-2" style={{ color: "var(--muted)" }}>{activePeriod}</p>
      )}

      {loading ? (
        <div className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg min-h-[56px] animate-pulse" style={{ background: "var(--muted-2)" }} />
          ))}
        </div>
      ) : error ? (
        <p className="text-[12px] py-4 text-center rounded-xl border" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
          한국부동산원 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      ) : tab === "txn" ? (
        txn && txn.regions.length > 0 ? (
          <TxnPanel txn={txn} />
        ) : (
          <p className="text-[12px] py-4 text-center rounded-xl border" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
            거래호수 데이터가 없습니다.
          </p>
        )
      ) : (
        <>
          <SaleSummary regions={regions} />
          {regions.length === 0 ? (
            <p className="text-[12px] py-4 text-center rounded-xl border" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>
              매매등락 데이터가 없습니다.
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
        </>
      )}

      {activeSource && (
        <p className="text-[10px] mt-2 leading-relaxed" style={{ color: "var(--muted)" }}>
          ※ {activeSource}
          {limited && " · 인증키 미설정 시 표본만 표시될 수 있습니다"}
        </p>
      )}
    </div>
  );
}
