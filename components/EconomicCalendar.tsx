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

function getWeekDays(from: string): Date[] {
  const start = new Date(from + "T00:00:00");
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

function impactColor(impact: string): string {
  const v = impact?.toLowerCase();
  if (v === "high" || v === "3") return "#ef4444";
  if (v === "medium" || v === "2") return "#f59e0b";
  return "#6b7280";
}

function impactLabel(impact: string): string {
  const v = impact?.toLowerCase();
  if (v === "high" || v === "3") return "고";
  if (v === "medium" || v === "2") return "중";
  return "저";
}

function hourLabel(hour: string, locale: string): string {
  if (hour === "bmo") return locale === "ko" ? "장전" : "BMO";
  if (hour === "amc") return locale === "ko" ? "장후" : "AMC";
  return locale === "ko" ? "장중" : "DMH";
}

function formatRevenue(v: number | null): string {
  if (v == null) return "—";
  if (Math.abs(v) >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (Math.abs(v) >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${v.toFixed(0)}`;
}

function formatEPS(v: number | null): string {
  if (v == null) return "—";
  return `$${v.toFixed(2)}`;
}

function extractTime(timeStr: string): string {
  if (!timeStr) return "";
  // "2026-07-07T14:00:00+00:00" → "23:00 KST" (UTC+9)
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

function Skeleton() {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {[80, 64, 80, 56].map((h, i) => (
        <div
          key={i}
          className="rounded-xl animate-pulse"
          style={{ height: h, background: "var(--border)" }}
        />
      ))}
    </div>
  );
}

export function EconomicCalendar() {
  const locale = useLocaleCode();
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData]     = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string>(todayStr());

  const load = useCallback(async (offset: number) => {
    setLoading(true);
    try {
      const r = await fetch(`/api/economic-calendar?week=${offset}`);
      if (!r.ok) throw new Error("failed");
      const d = await r.json() as CalendarData;
      setData(d);
      // Select today if in range, otherwise first day of week
      const today = todayStr();
      const days = getWeekDays(d.from);
      const dayStrs = days.map(toDateStr);
      if (dayStrs.includes(today)) {
        setSelectedDay(today);
      } else {
        setSelectedDay(dayStrs[0]);
      }
    } catch {
      setData(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(weekOffset); }, [weekOffset, load]);

  const days = data ? getWeekDays(data.from) : [];
  const today = todayStr();

  const DAY_NAMES_KO = ["월", "화", "수", "목", "금"];
  const DAY_NAMES_EN = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const dayNames = locale === "ko" ? DAY_NAMES_KO : DAY_NAMES_EN;

  const selectedEco = (data?.economicEvents ?? []).filter((e) => {
    const d = e.time ? e.time.split("T")[0] : "";
    return d === selectedDay;
  });

  const selectedEarnings = (data?.earningsEvents ?? []).filter((e) => e.date === selectedDay);

  const hasAnyEvent = selectedEco.length > 0 || selectedEarnings.length > 0;

  // Format week range label
  const weekLabel = data
    ? locale === "ko"
      ? `${data.from.slice(5).replace("-", "/")} ~ ${data.to.slice(5).replace("-", "/")}`
      : `${data.from} ~ ${data.to}`
    : "";

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
          <span className="text-[11px] mr-1" style={{ color: "var(--muted)" }}>{weekLabel}</span>
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="w-6 h-6 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "var(--border)" }}
            aria-label="prev week"
          >
            <ChevronLeft className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="w-6 h-6 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: "var(--border)" }}
            aria-label="next week"
          >
            <ChevronRight className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </button>
        </div>
      </div>

      {/* Day tabs */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div
          className="grid grid-cols-5 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center py-2.5 gap-0.5">
                  <div className="w-4 h-3 rounded animate-pulse" style={{ background: "var(--border)" }} />
                  <div className="w-5 h-4 rounded animate-pulse" style={{ background: "var(--border)" }} />
                </div>
              ))
            : days.map((d, i) => {
                const ds = toDateStr(d);
                const isSelected = ds === selectedDay;
                const isToday = ds === today;
                const ecoCount = (data?.economicEvents ?? []).filter((e) => (e.time ?? "").startsWith(ds)).length;
                const earnCount = (data?.earningsEvents ?? []).filter((e) => e.date === ds).length;
                const hasDot = ecoCount > 0 || earnCount > 0;

                return (
                  <button
                    key={ds}
                    onClick={() => setSelectedDay(ds)}
                    className="flex flex-col items-center py-2.5 gap-0.5 relative transition-colors"
                    style={{
                      background: isSelected ? "var(--mint)" : "transparent",
                      opacity: 1,
                    }}
                  >
                    <span
                      className="text-[10px] font-medium"
                      style={{ color: isSelected ? "#000" : "var(--muted)" }}
                    >
                      {dayNames[i]}
                    </span>
                    <span
                      className="text-sm font-bold font-mono-num"
                      style={{ color: isSelected ? "#000" : isToday ? "var(--mint)" : "var(--text)" }}
                    >
                      {d.getDate()}
                    </span>
                    {hasDot && (
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: isSelected ? "#000" : "var(--mint)" }}
                      />
                    )}
                    {!hasDot && <div className="w-1 h-1" />}
                  </button>
                );
              })}
        </div>

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <Skeleton />
          ) : !hasAnyEvent ? (
            <div className="flex flex-col items-center py-8 gap-2">
              <span className="text-2xl">📅</span>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {locale === "ko" ? "이날 주요 이벤트 없음" : "No major events"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Economic Events */}
              {selectedEco.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    {locale === "ko" ? "🏛 경제 지표" : "🏛 Economic Events"}
                  </p>
                  <div className="flex flex-col gap-2">
                    {selectedEco.map((e, i) => {
                      const time = extractTime(e.time);
                      const color = impactColor(e.impact);
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl px-3 py-2.5"
                          style={{ background: "var(--bg)" }}
                        >
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold"
                            style={{ background: color + "22", color }}
                          >
                            {impactLabel(e.impact)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold leading-tight" style={{ color: "var(--text)" }}>
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

              {/* Earnings */}
              {selectedEarnings.length > 0 && (
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "var(--muted)" }}
                  >
                    {locale === "ko" ? "📊 실적 발표" : "📊 Earnings"}
                  </p>
                  <div className="flex flex-col gap-2">
                    {selectedEarnings.map((e, i) => (
                      <Link
                        key={i}
                        href={`/stock/${e.symbol}`}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 active:scale-[0.98] transition-transform"
                        style={{ background: "var(--bg)" }}
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono-num"
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
                        <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--muted)" }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
