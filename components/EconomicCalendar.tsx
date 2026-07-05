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

type WeekRow = {
  label: string;       // e.g. "7/7"
  days: (Date | null)[]; // Mon[0]~Fri[4], null = outside month
};

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function todayStr(): string { return toDateStr(new Date()); }

function impactColor(impact: string): string {
  const v = impact?.toLowerCase();
  if (v === "high")   return "#ef4444";
  if (v === "medium") return "#f59e0b";
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
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Seoul" });
  } catch { return ""; }
}

function getEventDate(e: EconomicEvent): string {
  return (e.time ?? "").split("T")[0];
}

type DayEvents = { highEco: EconomicEvent[]; medLowEco: EconomicEvent[]; earnings: EarningsEvent[] };

function getDayEvents(ds: string, data: CalendarData): DayEvents {
  return {
    highEco:   data.economicEvents.filter(e => getEventDate(e) === ds && e.impact?.toLowerCase() === "high"),
    medLowEco: data.economicEvents.filter(e => getEventDate(e) === ds && e.impact?.toLowerCase() !== "high"),
    earnings:  data.earningsEvents.filter(e => e.date === ds),
  };
}

function hasEvents(ds: string, data: CalendarData): boolean {
  const ev = getDayEvents(ds, data);
  return ev.highEco.length > 0 || ev.medLowEco.length > 0 || ev.earnings.length > 0;
}

// Build Mon-Fri week rows for the given month, return only weeks that have ≥1 event
function buildEventWeeks(year: number, month: number, data: CalendarData): WeekRow[] {
  const rows: WeekRow[] = [];

  // Start from the Monday of the week containing the 1st of the month
  const firstOfMonth = new Date(year, month - 1, 1);
  const dow = firstOfMonth.getDay(); // 0=Sun,1=Mon,...,6=Sat
  const cursor = new Date(firstOfMonth);
  cursor.setDate(cursor.getDate() - (dow === 0 ? 6 : dow - 1));

  while (true) {
    // Build Mon-Fri for this week
    const days: (Date | null)[] = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(cursor);
      d.setDate(cursor.getDate() + i);
      const inMonth = d.getMonth() + 1 === month && d.getFullYear() === year;
      days.push(inMonth ? d : null);
    }

    const hasAnyInMonth = days.some(d => d !== null);

    if (hasAnyInMonth) {
      // Check if this week has any events for in-month days
      const weekHasEvents = days.some(d => d && hasEvents(toDateStr(d), data));
      if (weekHasEvents) {
        const firstInMonth = days.find(d => d !== null)!;
        rows.push({ label: `${firstInMonth.getMonth() + 1}/${firstInMonth.getDate()}`, days });
      }
    }

    cursor.setDate(cursor.getDate() + 7);

    // Stop when we move past the month
    const stillInRange =
      cursor.getFullYear() < year ||
      (cursor.getFullYear() === year && cursor.getMonth() + 1 <= month);
    if (!stillInRange) break;
  }

  return rows;
}

// ── Day Cell ──────────────────────────────────────────────────────────────────
function DayCell({ date, data, selected, today, onClick }: {
  date: Date | null;
  data: CalendarData;
  selected: string;
  today: string;
  onClick: (s: string) => void;
}) {
  if (!date) return <div className="h-[52px]" />;

  const ds         = toDateStr(date);
  const isSelected = ds === selected;
  const isToday    = ds === today;
  const ev         = getDayEvents(ds, data);
  const hasHigh    = ev.highEco.length > 0;
  const hasMed     = ev.medLowEco.length > 0;
  const hasEarn    = ev.earnings.length > 0;
  const hasAny     = hasHigh || hasMed || hasEarn;

  return (
    <button
      onClick={() => onClick(ds)}
      className="flex flex-col items-center justify-start pt-2 pb-1 rounded-xl transition-colors h-[52px]"
      style={{
        background: isSelected
          ? "var(--mint)"
          : isToday
          ? "rgba(52,211,153,0.12)"
          : hasAny
          ? "var(--bg)"
          : "transparent",
        border: hasAny && !isSelected ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <span
        className="text-[13px] font-bold font-mono-num leading-none"
        style={{ color: isSelected ? "#000" : isToday ? "var(--mint)" : "var(--text)" }}
      >
        {date.getDate()}
      </span>
      <div className="flex gap-[3px] mt-1.5 items-center h-[5px]">
        {hasHigh && (
          <span className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: isSelected ? "#000" : "#ef4444" }} />
        )}
        {hasMed && (
          <span className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: isSelected ? "#000" : "#f59e0b" }} />
        )}
        {hasEarn && (
          <span className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
            style={{ background: isSelected ? "#000" : "var(--mint)" }} />
        )}
      </div>
    </button>
  );
}

// ── Detail Panel ──────────────────────────────────────────────────────────────
function DetailPanel({ dateStr, data, locale }: { dateStr: string; data: CalendarData; locale: string }) {
  const ev = getDayEvents(dateStr, data);
  const allEco = [...ev.highEco, ...ev.medLowEco];
  const { earnings } = ev;
  const hasAny = allEco.length > 0 || earnings.length > 0;

  const d = new Date(dateStr + "T00:00:00");
  const dowKo = ["일","월","화","수","목","금","토"];
  const dateLabel = locale === "ko"
    ? `${d.getMonth() + 1}월 ${d.getDate()}일 (${dowKo[d.getDay()]})`
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });

  return (
    <div
      className="mt-3 rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{dateLabel}</span>
        <div className="ml-auto flex gap-2">
          {allEco.length > 0 && (
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>지표 {allEco.length}</span>
          )}
          {earnings.length > 0 && (
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>실적 {earnings.length}</span>
          )}
        </div>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {!hasAny && (
          <div className="flex flex-col items-center py-5 gap-1.5">
            <span className="text-2xl">📅</span>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "이날 주요 이벤트 없음" : "No major events"}
            </p>
          </div>
        )}

        {allEco.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "🏛 경제 지표" : "🏛 Economic Events"}
            </p>
            <div className="flex flex-col gap-1.5">
              {allEco.map((e, i) => {
                const time  = extractTime(e.time);
                const color = impactColor(e.impact);
                return (
                  <div key={i} className="flex items-start gap-2 rounded-xl px-3 py-2"
                    style={{ background: "var(--bg)" }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0"
                      style={{ background: color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold" style={{ color: "var(--text)" }}>{e.event}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {time && (
                          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{time} KST</span>
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
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--muted)" }}>
              {locale === "ko" ? "📊 실적 발표" : "📊 Earnings"}
            </p>
            <div className="flex flex-col gap-1.5">
              {earnings.map((e, i) => (
                <Link key={i} href={`/stock/${e.symbol}`}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 active:scale-[0.98] transition-transform"
                  style={{ background: "var(--bg)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-bold font-mono-num"
                    style={{ background: "var(--border)", color: "var(--text)" }}>
                    {e.symbol.slice(0, 3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>{e.symbol}</p>
                      <span className="text-[9px] px-1 py-0.5 rounded font-medium"
                        style={{ background: "rgba(255,255,255,0.07)", color: "var(--muted)" }}>
                        {hourLabel(e.hour, locale)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px]" style={{ color: "var(--muted)" }}>Q{e.quarter} {e.year}</span>
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

// ── Main Component ────────────────────────────────────────────────────────────
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
      const d = await r.json() as CalendarData;
      setData(d);

      // Select nearest event date on or after today (fallback: last event date in month)
      const today = todayStr();
      const eventDates = new Set<string>();
      d.economicEvents.forEach(e => { const dt = (e.time ?? "").split("T")[0]; if (dt) eventDates.add(dt); });
      d.earningsEvents.forEach(e => { if (e.date) eventDates.add(e.date); });
      const sorted = [...eventDates].sort();
      const nearest = sorted.find(dt => dt >= today) ?? sorted[sorted.length - 1];
      if (nearest) setSelected(nearest);
    } catch { setData(null); }
    setLoading(false);
  }, []);

  useEffect(() => { load(year, month); }, [year, month, load]);

  const prevMonth = () => { if (month === 1) { setYear(y => y - 1); setMonth(12); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 12) { setYear(y => y + 1); setMonth(1); } else setMonth(m => m + 1); };

  const today    = todayStr();
  const weeks    = data ? buildEventWeeks(year, month, data) : [];
  const DOW_KO   = ["월", "화", "수", "목", "금"];
  const DOW_EN   = ["Mon", "Tue", "Wed", "Thu", "Fri"];
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
          <button onClick={prevMonth}
            className="w-6 h-6 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "var(--border)" }}>
            <ChevronLeft className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
          <span className="text-[11px] font-semibold px-1 text-center" style={{ color: "var(--text)", minWidth: 80 }}>
            {monthLabel}
          </span>
          <button onClick={nextMonth}
            className="w-6 h-6 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "var(--border)" }}>
            <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}>

        {/* DOW header row */}
        <div className="grid border-b px-2 pt-2 pb-1" style={{
          gridTemplateColumns: "36px repeat(5, 1fr)",
          borderColor: "var(--border)",
        }}>
          <div />
          {dowLabels.map((d, i) => (
            <div key={i} className="text-center text-[10px] font-semibold pb-1" style={{ color: "var(--muted)" }}>
              {d}
            </div>
          ))}
        </div>

        {/* Week rows (events only) */}
        <div className="p-2 flex flex-col gap-1">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid gap-1" style={{ gridTemplateColumns: "36px repeat(5, 1fr)" }}>
                <div className="h-[52px] rounded-lg animate-pulse" style={{ background: "var(--border)" }} />
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-[52px] rounded-xl animate-pulse" style={{ background: "var(--border)" }} />
                ))}
              </div>
            ))
          ) : weeks.length === 0 ? (
            <div className="flex flex-col items-center py-8 gap-2">
              <span className="text-2xl">📅</span>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {locale === "ko" ? "이 달 주요 이벤트 없음" : "No major events this month"}
              </p>
            </div>
          ) : (
            weeks.map(({ label, days }, wi) => (
              <div key={wi} className="grid gap-1" style={{ gridTemplateColumns: "36px repeat(5, 1fr)" }}>
                {/* Week label */}
                <div className="flex items-center justify-center h-[52px]">
                  <span className="text-[9px] font-semibold leading-tight text-center"
                    style={{ color: "var(--muted)" }}>
                    {label}
                  </span>
                </div>
                {/* Day cells */}
                {days.map((date, di) => (
                  <DayCell key={di} date={date} data={data!}
                    selected={selected} today={today} onClick={setSelected} />
                ))}
              </div>
            ))
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 px-4 py-2 border-t"
          style={{ borderColor: "var(--border)" }}>
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

      {/* Detail panel */}
      {data && <DetailPanel dateStr={selected} data={data} locale={locale} />}
    </div>
  );
}
