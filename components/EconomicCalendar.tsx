"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";
import type { EconomicEvent, EarningsEvent } from "@/app/api/economic-calendar/route";

type CalendarData = {
  from: string;
  to: string;
  economicEvents: EconomicEvent[];
  earningsEvents: EarningsEvent[];
};

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayStr(): string {
  return toDateStr(new Date());
}

function impactColor(impact: string): string {
  const v = impact?.toLowerCase();
  if (v === "high" || v === "3") return "#ef4444";
  if (v === "medium" || v === "2") return "#f59e0b";
  return "#6b7280";
}

function hourLabel(hour: string, locale: string): string {
  if (hour === "bmo") return locale === "ko" ? "장전" : "BMO";
  if (hour === "amc") return locale === "ko" ? "장후" : "AMC";
  return locale === "ko" ? "장중" : "DMH";
}

function formatEPS(v: number | null): string {
  if (v == null) return "—";
  return `$${v.toFixed(2)}`;
}

function extractTime(timeStr: string): string {
  if (!timeStr) return "";
  try {
    const d = new Date(timeStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Seoul",
    });
  } catch {
    return "";
  }
}

function getEventDateStr(e: EconomicEvent): string {
  if (!e.time) return "";
  return e.time.split("T")[0];
}

// Build a full month grid (array of weeks, each week is 7 days, null = outside month)
function buildMonthGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay  = new Date(year, month, 0);
  const startDow = firstDay.getDay(); // 0=Sun
  const totalDays = lastDay.getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(new Date(year, month - 1, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

type DayEvents = {
  highEco: EconomicEvent[];
  medEco: EconomicEvent[];
  earnings: EarningsEvent[];
};

function getDayEvents(dateStr: string, data: CalendarData): DayEvents {
  const highEco = data.economicEvents.filter(
    (e) => getEventDateStr(e) === dateStr && (e.impact?.toLowerCase() === "high" || e.impact === "3"),
  );
  const medEco = data.economicEvents.filter(
    (e) => getEventDateStr(e) === dateStr && (e.impact?.toLowerCase() === "medium" || e.impact === "2"),
  );
  const earnings = data.earningsEvents.filter((e) => e.date === dateStr);
  return { highEco, medEco, earnings };
}

function DayCell({
  date,
  data,
  selected,
  today,
  onClick,
}: {
  date: Date | null;
  data: CalendarData | null;
  selected: string;
  today: string;
  onClick: (s: string) => void;
}) {
  if (!date) return <div />;

  const ds = toDateStr(date);
  const isSelected = ds === selected;
  const isToday    = ds === today;
  const events     = data ? getDayEvents(ds, data) : { highEco: [], medEco: [], earnings: [] };
  const hasHigh    = events.highEco.length > 0;
  const hasMed     = events.medEco.length > 0;
  const hasEarn    = events.earnings.length > 0;

  return (
    <button
      onClick={() => onClick(ds)}
      className="relative flex flex-col items-center pt-1.5 pb-1 rounded-xl transition-colors"
      style={{
        background: isSelected
          ? "var(--mint)"
          : isToday
          ? "rgba(52,211,153,0.12)"
          : "transparent",
        minHeight: 44,
      }}
    >
      <span
        className="text-[13px] font-bold font-mono-num leading-none"
        style={{
          color: isSelected ? "#000" : isToday ? "var(--mint)" : "var(--text)",
        }}
      >
        {date.getDate()}
      </span>
      {/* dots row */}
      <div className="flex gap-[3px] mt-1 h-[5px] items-center">
        {hasHigh && (
          <span
            className="inline-block rounded-full"
            style={{
              width: 5, height: 5,
              background: isSelected ? "#000" : "#ef4444",
            }}
          />
        )}
        {hasMed && !hasHigh && (
          <span
            className="inline-block rounded-full"
            style={{
              width: 5, height: 5,
              background: isSelected ? "#000" : "#f59e0b",
            }}
          />
        )}
        {hasEarn && (
          <span
            className="inline-block rounded-full"
            style={{
              width: 5, height: 5,
              background: isSelected ? "#000" : "var(--mint)",
            }}
          />
        )}
      </div>
    </button>
  );
}

function DetailPanel({ dateStr, data, locale }: { dateStr: string; data: CalendarData; locale: string }) {
  const events = getDayEvents(dateStr, data);
  const allEco = [...events.highEco, ...events.medEco];
  const { earnings } = events;

  const date = new Date(dateStr + "T00:00:00");
  const dateLabel = locale === "ko"
    ? `${date.getMonth() + 1}월 ${date.getDate()}일 (${["일","월","화","수","목","금","토"][date.getDay()]})`
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });

  const hasAny = allEco.length > 0 || earnings.length > 0;

  return (
    <div
      className="mt-3 rounded-2xl border overflow-hidden"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{dateLabel}</span>
        <span className="text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
          {allEco.length > 0 && `지표 ${allEco.length}`}
          {allEco.length > 0 && earnings.length > 0 && " · "}
          {earnings.length > 0 && `실적 ${earnings.length}`}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {!hasAny && (
          <div className="flex flex-col items-center py-6 gap-1.5">
            <span className="text-2xl">📅</span>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "이날 주요 이벤트 없음" : "No major events"}
            </p>
          </div>
        )}

        {allEco.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "🏛 경제 지표" : "🏛 Economic Events"}
            </p>
            <div className="flex flex-col gap-1.5">
              {allEco.map((e, i) => {
                const time = extractTime(e.time);
                const color = impactColor(e.impact);
                return (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-xl px-3 py-2"
                    style={{ background: "var(--card)" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: color }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>
                        {e.event}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {time && (
                          <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                            {time} KST
                          </span>
                        )}
                        {e.estimate != null && e.estimate !== "" && (
                          <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                            {locale === "ko" ? "예상" : "Est"}: {e.estimate}{e.unit}
                          </span>
                        )}
                        {e.prev != null && e.prev !== "" && (
                          <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                            {locale === "ko" ? "이전" : "Prev"}: {e.prev}{e.unit}
                          </span>
                        )}
                        {e.actual != null && e.actual !== "" && (
                          <span className="text-[10px] font-bold" style={{ color: "var(--mint)" }}>
                            {locale === "ko" ? "실제" : "Act"}: {e.actual}{e.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {earnings.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "📊 실적 발표" : "📊 Earnings"}
            </p>
            <div className="flex flex-col gap-1.5">
              {earnings.map((e, i) => (
                <Link
                  key={i}
                  href={`/stock/${e.symbol}`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 active:scale-[0.98] transition-transform"
                  style={{ background: "var(--card)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold font-mono-num"
                    style={{ background: "var(--border)", color: "var(--text)" }}
                  >
                    {e.symbol.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
                        {e.symbol}
                      </p>
                      <span
                        className="text-[9px] px-1 py-0.5 rounded font-medium"
                        style={{ background: "rgba(255,255,255,0.07)", color: "var(--muted)" }}
                      >
                        {hourLabel(e.hour, locale)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                        Q{e.quarter} {e.year}
                      </span>
                      {e.epsEstimate != null && (
                        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                          EPS {locale === "ko" ? "예상" : "est"}: {formatEPS(e.epsEstimate)}
                        </span>
                      )}
                      {e.epsActual != null && (
                        <span className="text-[10px] font-bold" style={{ color: "var(--mint)" }}>
                          {formatEPS(e.epsActual)}
                        </span>
                      )}
                    </div>
                  </div>
                  <TrendingUp className="w-3 h-3 flex-shrink-0" style={{ color: "var(--muted)" }} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function EconomicCalendar() {
  const locale = useLocaleCode();
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [data,  setData]  = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>(todayStr());

  const load = useCallback(async (y: number, m: number) => {
    setLoading(true);
    const pad = (n: number) => String(n).padStart(2, "0");
    const lastDay = new Date(y, m, 0).getDate();
    const from = `${y}-${pad(m)}-01`;
    const to   = `${y}-${pad(m)}-${lastDay}`;
    try {
      const r = await fetch(`/api/economic-calendar?from=${from}&to=${to}`);
      if (!r.ok) throw new Error("failed");
      setData(await r.json() as CalendarData);
    } catch {
      setData(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(year, month); }, [year, month, load]);

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  };

  const weeks = buildMonthGrid(year, month);
  const today = todayStr();
  const DOW_KO = ["일", "월", "화", "수", "목", "금", "토"];
  const DOW_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dowLabels = locale === "ko" ? DOW_KO : DOW_EN;

  const monthLabel = locale === "ko"
    ? `${year}년 ${month}월`
    : new Date(year, month - 1, 1).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5" style={{ color: "var(--mint)" }} />
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--text)" }}>
            {locale === "ko" ? "경제 캘린더" : "Economic Calendar"}
          </h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="w-6 h-6 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "var(--border)" }}
            aria-label="prev month"
          >
            <ChevronLeft className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
          <span className="text-[11px] font-semibold px-1" style={{ color: "var(--text)", minWidth: 80, textAlign: "center" }}>
            {monthLabel}
          </span>
          <button
            onClick={nextMonth}
            className="w-6 h-6 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "var(--border)" }}
            aria-label="next month"
          >
            <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* DOW header */}
        <div className="grid grid-cols-7 border-b" style={{ borderColor: "var(--border)" }}>
          {dowLabels.map((label, i) => (
            <div
              key={i}
              className="text-center py-2 text-[10px] font-semibold"
              style={{ color: i === 0 ? "#ef4444" : i === 6 ? "#60a5fa" : "var(--muted)" }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="p-2 flex flex-col gap-1">
          {loading
            ? Array.from({ length: 5 }).map((_, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 7 }).map((_, di) => (
                    <div
                      key={di}
                      className="rounded-xl animate-pulse"
                      style={{ height: 44, background: "var(--border)" }}
                    />
                  ))}
                </div>
              ))
            : weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1">
                  {week.map((date, di) => (
                    <DayCell
                      key={di}
                      date={date}
                      data={data}
                      selected={selected}
                      today={today}
                      onClick={setSelected}
                    />
                  ))}
                </div>
              ))}
        </div>

        {/* Legend */}
        <div
          className="flex items-center gap-3 px-4 py-2 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "고영향 지표" : "High impact"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f59e0b" }} />
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "중영향 지표" : "Med impact"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: "var(--mint)" }} />
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "실적 발표" : "Earnings"}
            </span>
          </div>
        </div>
      </div>

      {/* Detail panel for selected day */}
      {data && (
        <DetailPanel dateStr={selected} data={data} locale={locale} />
      )}
    </div>
  );
}
