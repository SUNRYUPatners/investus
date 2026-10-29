import Link from "next/link";
import type { TeslaQuoteSnapshot } from "@/lib/teslaValuationTypes";
import {
  ARK_TESLA_2031,
  JEFFERIES_PT,
  TESLA_SEGMENTS,
  TESLA_SOURCES,
} from "@/lib/teslaValuationCopy";
import { localePath } from "@/lib/localePath";

function fmtUsd(n: number | null, digits = 2): string {
  if (n == null) return "—";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(digits)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(digits)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: digits })}`;
}

function fmtPrice(n: number | null): string {
  if (n == null) return "—";
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtPe(n: number | null): string {
  if (n == null) return "—";
  return `${n.toFixed(1)}x`;
}

function fmtPct(n: number | null): string {
  if (n == null) return "—";
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export function TeslaValuationView({
  locale,
  snapshot,
  compact = false,
}: {
  locale: "en" | "ko";
  snapshot: TeslaQuoteSnapshot;
  compact?: boolean;
}) {
  const isKo = locale === "ko";
  const live = snapshot.price != null;
  const peDisplay =
    snapshot.pe != null
      ? fmtPe(snapshot.pe)
      : snapshot.price && snapshot.eps && snapshot.eps > 0
        ? fmtPe(snapshot.price / snapshot.eps)
        : "—";

  const sourceLabel =
    snapshot.quoteSource === "yahoo"
      ? "Yahoo Finance"
      : snapshot.quoteSource === "finnhub"
        ? "Finnhub"
        : null;

  return (
    <div className={compact ? "" : "max-w-2xl"}>
      {!compact && (
        <>
          <h1 className="text-xl font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            {isKo ? "테슬라 밸류에이션" : "Tesla valuation"}
          </h1>
          <p className="text-[13px] leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
            {isKo
              ? "시가총액과 배수는 사이트의 실시간 시세입니다. 시나리오·부문 수치는 인용된 출처에만 있습니다. 없는 숫자는 비워 둡니다."
              : "Market cap and multiples come from this site’s live price feed. Scenario and segment figures are only those with a cited source. Missing numbers are left blank."}
          </p>
        </>
      )}

      <div
        className="rounded-2xl border p-4 mb-4"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <p className="text-xs font-semibold" style={{ color: "var(--mint)" }}>
            TSLA
          </p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>
            {live
              ? `${sourceLabel ?? ""}${snapshot.asOfIso ? ` · ${snapshot.asOfIso.slice(0, 16).replace("T", " ")} UTC` : ""}`
              : isKo
                ? "실시간 시세를 불러오지 못했습니다"
                : "Live quote unavailable"}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat
            label={isKo ? "주가" : "Price"}
            value={fmtPrice(snapshot.price)}
            sub={fmtPct(snapshot.changePercent)}
            subUp={snapshot.changePercent != null ? snapshot.changePercent >= 0 : undefined}
          />
          <Stat label={isKo ? "시가총액" : "Market cap"} value={fmtUsd(snapshot.marketCap)} />
          <Stat label={isKo ? "PER" : "P/E"} value={peDisplay} />
          <Stat
            label={isKo ? "EPS" : "EPS"}
            value={snapshot.eps != null ? `$${snapshot.eps.toFixed(2)}` : "—"}
          />
        </div>
        {(snapshot.week52High != null || snapshot.week52Low != null) && (
          <p className="text-[11px] mt-3" style={{ color: "var(--muted)" }}>
            52w {isKo ? "저가" : "low"} {fmtPrice(snapshot.week52Low)} · {isKo ? "고가" : "high"}{" "}
            {fmtPrice(snapshot.week52High)}
          </p>
        )}
      </div>

      <h2 className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
        {isKo ? "ARK 2031 시나리오 (약세 · 기본 · 강세)" : "ARK 2031 scenarios (bear / base / bull)"}
      </h2>
      <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
        {isKo
          ? "ARK Invest, 2026년 10월 16일 기준 몬테카를로 5,000회. 목표 주가는 2031년 시나리오이며 현재 추천이 아닙니다. TSLA–SPCX 합병은 모형에 반영되지 않았다고 ARK가 밝혔습니다."
          : "ARK Invest, 16 Oct 2026, 5,000 Monte Carlo runs. Price targets are 2031 scenarios, not a current recommendation. ARK said a TSLA–SPCX merger is not in the model."}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
        {ARK_TESLA_2031.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border p-3"
            style={{
              background: "var(--card)",
              borderColor: s.id === "base" ? "var(--mint)" : "var(--border)",
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: "var(--mint)" }}>
              {isKo ? s.labelKo : s.labelEn}
            </p>
            <p className="text-lg font-bold tabular-nums" style={{ color: s.id === "bear" ? "#ef4444" : "var(--text)" }}>
              {s.price}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>
              CAGR {s.cagr}
            </p>
            <ul className="mt-2 text-[11px] leading-relaxed space-y-0.5" style={{ color: "var(--muted)" }}>
              <li>{isKo ? "매출" : "Revenue"} {s.revenue}</li>
              <li>{isKo ? "총이익률" : "Gross margin"} {s.gm}</li>
              <li>Robotaxi {s.robotaxi}</li>
              <li>Optimus {s.optimus}</li>
              <li>{isKo ? "시가총액" : "Mkt cap"} {s.mktCap}</li>
            </ul>
          </div>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
        {isKo
          ? `단기 스트리트 스냅샷: ${JEFFERIES_PT.firm} ${JEFFERIES_PT.rating} · 목표 ${JEFFERIES_PT.target} (${JEFFERIES_PT.dated}). 2031 시나리오와 기간이 다릅니다.`
          : `Near-term street snapshot: ${JEFFERIES_PT.firm} ${JEFFERIES_PT.rating} · ${JEFFERIES_PT.target} PT (${JEFFERIES_PT.dated}). Different horizon from the 2031 scenarios.`}
      </p>

      <h2 className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
        {isKo ? "부문 노트" : "Segment notes"}
      </h2>
      <div className="flex flex-col gap-2 mb-4">
        {TESLA_SEGMENTS.map((seg) => (
          <div
            key={seg.id}
            className="rounded-2xl border p-4"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <p className="text-sm font-bold mb-1" style={{ color: "var(--text)" }}>
              {isKo ? seg.titleKo : seg.titleEn}
            </p>
            <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
              {isKo ? seg.bodyKo : seg.bodyEn}
            </p>
          </div>
        ))}
      </div>

      {compact ? (
        <Link
          href={localePath("/tesla-valuation", locale)}
          className="block text-center text-xs font-semibold py-3 rounded-2xl no-underline mb-4"
          style={{ background: "var(--card)", color: "var(--mint)", border: "1px solid var(--border)" }}
        >
          {isKo ? "테슬라 밸류에이션 전체 보기" : "Full Tesla valuation"} →
        </Link>
      ) : (
        <section className="mb-4">
          <h2 className="text-sm font-bold mb-2" style={{ color: "var(--text)" }}>
            {isKo ? "출처" : "Sources"}
          </h2>
          <ul className="flex flex-col gap-1.5">
            {TESLA_SOURCES.map((src) => (
              <li key={src.url + src.labelEn}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] hover:underline"
                  style={{ color: "var(--mint)" }}
                >
                  {isKo ? src.labelKo : src.labelEn}
                  {src.dated ? ` (${src.dated})` : ""} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="text-[11px] leading-relaxed mt-3" style={{ color: "var(--muted)" }}>
            {isKo
              ? "정보 제공 목적의 편집 리서치이며 투자 자문이나 매수·매도 권유가 아닙니다. 판단 전에 원 출처로 수치를 확인하세요."
              : "Editorial research for information only — not investment advice or a solicitation to buy or sell. Verify figures against the primary sources before making decisions."}
          </p>
        </section>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  subUp,
}: {
  label: string;
  value: string;
  sub?: string;
  subUp?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px]" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className="text-sm font-bold tabular-nums" style={{ color: "var(--text)" }}>
        {value}
      </p>
      {sub && sub !== "—" && (
        <p
          className="text-[10px] tabular-nums"
          style={{ color: subUp === undefined ? "var(--muted)" : subUp ? "var(--up)" : "var(--down, #ef4444)" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
