"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EconomicEvent, EarningsEvent } from "@/app/api/economic-calendar/route";
import { useLocaleCode } from "@/contexts/LocaleContext";

type TapeItem = {
  key: string;
  label: string;
  impact?: string;
  kind: "eco" | "earn";
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function monthRange() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const last = new Date(y, m, 0).getDate();
  return {
    from: `${y}-${pad(m)}-01`,
    to: `${y}-${pad(m)}-${pad(last)}`,
  };
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

export function EcoTickerTape() {
  const locale = useLocaleCode();
  const [items, setItems] = useState<TapeItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const { from, to } = monthRange();
    const today = todayStr();

    (async () => {
      try {
        const res = await fetch(`/api/economic-calendar?from=${from}&to=${to}`);
        if (!res.ok) return;
        const data = (await res.json()) as {
          economicEvents?: EconomicEvent[];
          earningsEvents?: EarningsEvent[];
        };

        const eco = (data.economicEvents ?? [])
          .filter((e) => {
            const ds = (e.time ?? "").split("T")[0];
            return ds >= today && (e.impact === "high" || e.impact === "medium");
          })
          .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""))
          .slice(0, 24)
          .map((e, i) => {
            const ds = (e.time ?? "").split("T")[0];
            const t = kstTime(e.time);
            return {
              key: `eco-${ds}-${e.event}-${i}`,
              kind: "eco" as const,
              impact: e.impact,
              label: `${shortDate(ds)}${t ? ` ${t}` : ""} · ${e.event}`,
            };
          });

        const earn = (data.earningsEvents ?? [])
          .filter((e) => e.date >= today)
          .sort((a, b) => a.date.localeCompare(b.date) || a.symbol.localeCompare(b.symbol))
          .slice(0, 16)
          .map((e, i) => ({
            key: `earn-${e.date}-${e.symbol}-${i}`,
            kind: "earn" as const,
            label: `${shortDate(e.date)} · ${e.symbol} ${hourLabel(e.hour, locale)}${
              locale === "ko" ? " 실적" : " earnings"
            }`,
          }));

        // Interleave: eco first, then sprinkle earnings so the tape feels like a calendar feed
        const merged = [...eco];
        for (let i = 0; i < earn.length; i++) {
          const insertAt = Math.min(merged.length, (i + 1) * 2);
          merged.splice(insertAt, 0, earn[i]);
        }

        if (!cancelled) setItems(merged);
      } catch {
        /* ignore */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (items.length === 0) return null;

  const loop = [...items, ...items];
  const duration = Math.max(50, items.length * 3.2);

  return (
    <Link
      href="/search"
      className="block overflow-hidden py-1.5 border-b no-underline"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
      aria-label={locale === "ko" ? "경제 캘린더" : "Economic calendar"}
    >
      <div className="flex items-center gap-0">
        <span
          className="flex-shrink-0 px-3 text-[10px] font-bold tracking-wide uppercase border-r"
          style={{ color: "var(--mint)", borderColor: "var(--border)" }}
        >
          {locale === "ko" ? "캘린더" : "CAL"}
        </span>
        <div className="overflow-hidden flex-1 min-w-0">
          <div
            className="ticker-track"
            style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
          >
            {loop.map((item, i) => (
              <EcoItem key={`${item.key}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
