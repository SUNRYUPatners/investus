"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EconomicEvent, EarningsEvent } from "@/app/api/economic-calendar/route";
import { useLocaleCode } from "@/contexts/LocaleContext";
import type { MarketId } from "@/lib/markets/types";
import { marketHref } from "@/lib/markets/marketPath";

type TapeItem = {
  key: string;
  label: string;
  impact?: string;
  kind: "eco" | "earn";
  /** YYYY-MM-DDTHH:mm — chronological sort only */
  sortKey: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 오늘부터 앞으로 45일 — 월말·주말에도 다음 달 일정이 티커에 보이게 */
function tickerCalendarRange() {
  const now = new Date();
  const from = todayStr();
  const end = new Date(now);
  end.setDate(end.getDate() + 45);
  const to = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`;
  return { from, to };
}

function eventDate(iso: string | undefined, fallbackDate?: string): string {
  if (fallbackDate) return fallbackDate;
  return (iso ?? "").split("T")[0] ?? "";
}

function impactColor(impact: string): string {
  const v = impact?.toLowerCase();
  if (v === "high") return "#ef4444";
  if (v === "medium") return "#f59e0b";
  return "#6b7280";
}

function shortDate(isoDate: string): string {
  const [, m, d] = isoDate.split("-");
  return `${Number(m)}/${Number(d)}`;
}

function kstTime(timeStr: string): string {
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

function hourLabel(hour: string, locale: string): string {
  if (hour === "bmo") return locale === "ko" ? "장전" : "BMO";
  if (hour === "amc") return locale === "ko" ? "장후" : "AMC";
  return locale === "ko" ? "장중" : "DMH";
}

/** Earnings hour → rough UTC time so bmo/dmh/amc sort within the day */
function earningsSortKey(date: string, hour: string): string {
  if (hour === "bmo") return `${date}T13:00:00Z`; // ~09:00 ET
  if (hour === "amc") return `${date}T21:00:00Z`; // ~16:00 ET
  return `${date}T16:00:00Z`; // midday / during market
}

function EcoItem({ item }: { item: TapeItem }) {
  return (
    <span className="inline-flex items-center gap-2 px-5 border-r" style={{ borderColor: "var(--border)" }}>
      {item.kind === "eco" && item.impact && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: impactColor(item.impact) }}
        />
      )}
      {item.kind === "earn" && (
        <span className="text-[10px] font-bold" style={{ color: "var(--mint)" }}>
          ER
        </span>
      )}
      <span className="text-xs whitespace-nowrap" style={{ color: "var(--text)" }}>
        {item.label}
      </span>
    </span>
  );
}

export function EcoTickerTape({ market = "us" }: { market?: MarketId }) {
  const locale = useLocaleCode();
  const [items, setItems] = useState<TapeItem[]>([]);
  const searchHref = marketHref(market, "search");

  useEffect(() => {
    let cancelled = false;
    const { from, to } = tickerCalendarRange();
    const today = todayStr();

    (async () => {
      try {
        const res = await fetch(`/api/economic-calendar?from=${from}&to=${to}&market=${market}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          economicEvents?: (EconomicEvent & { date?: string })[];
          earningsEvents?: EarningsEvent[];
        };

        const eco: TapeItem[] = (data.economicEvents ?? [])
          .filter((e) => {
            const ds = eventDate(e.time, e.date);
            return ds >= today && (e.impact === "high" || e.impact === "medium");
          })
          .map((e, i) => {
            const ds = eventDate(e.time, e.date);
            const t = kstTime(e.time);
            const usTag =
              market === "kr" && e.country === "US"
                ? locale === "ko"
                  ? "미국 "
                  : "US "
                : "";
            return {
              key: `eco-${ds}-${e.event}-${i}`,
              kind: "eco" as const,
              impact: e.impact,
              sortKey: e.time || `${ds}T12:00:00Z`,
              label: `${shortDate(ds)}${t ? ` ${t}` : ""} · ${usTag}${e.event}`,
            };
          });

        const earn: TapeItem[] = (data.earningsEvents ?? [])
          .filter((e) => e.date >= today)
          .map((e, i) => ({
            key: `earn-${e.date}-${e.symbol}-${i}`,
            kind: "earn" as const,
            sortKey: earningsSortKey(e.date, e.hour),
            label: `${shortDate(e.date)} · ${e.symbol} ${hourLabel(e.hour, locale)}${
              locale === "ko" ? " 실적" : " earnings"
            }`,
          }));

        // 실적·지표 구분 없이 날짜·시간 오름차순
        const merged = [...eco, ...earn]
          .sort((a, b) => a.sortKey.localeCompare(b.sortKey) || a.label.localeCompare(b.label))
          .slice(0, 40);

        if (!cancelled) setItems(merged);
      } catch {
        /* ignore */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale, market]);

  if (items.length === 0) return null;

  const loop = [...items, ...items];
  const duration = Math.max(50, items.length * 3.2);

  return (
    <Link
      href={searchHref}
      className="block overflow-hidden py-1.5 border-b lg:border-b-0 no-underline h-full"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
      aria-label={locale === "ko" ? "경제 캘린더" : "Economic calendar"}
    >
      <div
        className="ticker-track"
        style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
      >
        {loop.map((item, i) => (
          <EcoItem key={`${item.key}-${i}`} item={item} />
        ))}
      </div>
    </Link>
  );
}
