"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocaleCode } from "@/contexts/LocaleContext";
import { ANALYST_TARGETS, ratingGroup } from "@/lib/analystTargets";
import type { AnalystEntry } from "@/lib/analystTargets";

const BUY_COLOR  = "#00e5a0";
const HOLD_COLOR = "#f59e0b";
const SELL_COLOR = "#ef4444";

function ratingStyle(entry: AnalystEntry): { bg: string; color: string } {
  const g = ratingGroup(entry.rating);
  if (g === "buy")  return { bg: "rgba(0,229,160,0.12)",  color: BUY_COLOR };
  if (g === "sell") return { bg: "rgba(239,68,68,0.12)",  color: SELL_COLOR };
  return { bg: "rgba(245,158,11,0.12)", color: HOLD_COLOR };
}

function actionBadge(action?: string): { label: string; color: string } | null {
  if (!action || action === "Reiterate") return null;
  if (action === "Upgrade")  return { label: "▲", color: BUY_COLOR };
  if (action === "Downgrade") return { label: "▼", color: SELL_COLOR };
  if (action === "Initiate") return { label: "신규", color: "#a78bfa" };
  return null;
}

const SHOW_DEFAULT = 4;

export function AnalystTargets({
  symbol,
  currentPrice,
}: {
  symbol: string;
  currentPrice: number | null;
}) {
  const locale  = useLocaleCode();
  const isKo    = locale !== "en";
  const entries = ANALYST_TARGETS[symbol];
  const [expanded, setExpanded] = useState(false);

  if (!entries || entries.length === 0) return null;

  const buyCount  = entries.filter((e) => ratingGroup(e.rating) === "buy").length;
  const holdCount = entries.filter((e) => ratingGroup(e.rating) === "hold").length;
  const sellCount = entries.filter((e) => ratingGroup(e.rating) === "sell").length;
  const total     = entries.length;

  const avgTarget = entries.reduce((s, e) => s + e.target, 0) / total;
  const upside    = currentPrice && currentPrice > 0
    ? ((avgTarget - currentPrice) / currentPrice) * 100
    : null;
  const upsideColor = upside == null ? "var(--muted)" : upside >= 0 ? BUY_COLOR : SELL_COLOR;

  const visible  = expanded ? entries : entries.slice(0, SHOW_DEFAULT);
  const hiddenCt = entries.length - SHOW_DEFAULT;

  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* 헤더 */}
      <h2
        className="text-xs font-semibold tracking-widest uppercase font-syne mb-3"
        style={{ color: "var(--muted)" }}
      >
        {isKo ? "애널리스트 의견" : "Analyst Ratings"}
      </h2>

      {/* 컨센서스 바 */}
      <div className="flex rounded-full overflow-hidden h-2 mb-2">
        {buyCount  > 0 && <div style={{ flex: buyCount,  background: BUY_COLOR  }} />}
        {holdCount > 0 && <div style={{ flex: holdCount, background: HOLD_COLOR }} />}
        {sellCount > 0 && <div style={{ flex: sellCount, background: SELL_COLOR }} />}
      </div>

      {/* 카운트 + 평균 목표가 */}
      <div className="flex items-center text-[10px] gap-3 mb-3">
        <span style={{ color: BUY_COLOR  }}>{isKo ? "매수" : "Buy"} {buyCount}</span>
        <span style={{ color: HOLD_COLOR }}>{isKo ? "중립" : "Hold"} {holdCount}</span>
        {sellCount > 0 && (
          <span style={{ color: SELL_COLOR }}>{isKo ? "매도" : "Sell"} {sellCount}</span>
        )}
        <div className="ml-auto text-right font-mono-num font-semibold" style={{ color: upsideColor }}>
          {isKo ? "평균목표" : "Avg PT"} ${avgTarget.toFixed(0)}
          {upside != null && (
            <span className="font-normal ml-1" style={{ color: upsideColor }}>
              ({upside >= 0 ? "+" : ""}{upside.toFixed(1)}%)
            </span>
          )}
        </div>
      </div>

      {/* 애널리스트 목록 */}
      <div className="flex flex-col">
        {visible.map((e, i) => {
          const badge  = ratingStyle(e);
          const action = actionBadge(e.action);
          return (
            <div
              key={`${e.firm}-${e.date}`}
              className="flex items-center gap-2 py-2"
              style={{
                borderTop: i === 0 ? "none" : "1px solid var(--border)",
              }}
            >
              {/* 회사명 */}
              <span
                className="text-[11px] font-medium min-w-0 flex-1 truncate"
                style={{ color: "var(--text)" }}
              >
                {isKo ? e.firmKo : e.firm}
              </span>

              {/* 액션 */}
              {action && (
                <span
                  className="text-[9px] font-bold flex-shrink-0"
                  style={{ color: action.color }}
                >
                  {action.label}
                </span>
              )}

              {/* 레이팅 뱃지 */}
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap"
                style={{ background: badge.bg, color: badge.color }}
              >
                {e.rating}
              </span>

              {/* 목표가 + 날짜 */}
              <div className="text-right flex-shrink-0">
                <span
                  className="text-[11px] font-mono-num font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  ${e.target}
                </span>
                <span
                  className="text-[9px] ml-1"
                  style={{ color: "var(--muted)", opacity: 0.6 }}
                >
                  {e.date.slice(5).replace("-", "/")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 더 보기 / 접기 */}
      {entries.length > SHOW_DEFAULT && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-center gap-1 text-[11px] mt-1 pt-2 active:opacity-60 transition-opacity"
          style={{
            color: "var(--muted)",
            borderTop: "1px solid var(--border)",
            background: "none",
            cursor: "pointer",
            padding: "8px 0 0",
          }}
        >
          {expanded
            ? (isKo ? "접기" : "Show less")
            : (isKo ? `${hiddenCt}개 더 보기` : `+${hiddenCt} more`)}
          <ChevronDown
            className="w-3.5 h-3.5 transition-transform"
            style={{ transform: expanded ? "rotate(180deg)" : "none" }}
          />
        </button>
      )}
    </div>
  );
}
