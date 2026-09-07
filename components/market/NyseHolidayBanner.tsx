"use client";

import { useEffect, useState } from "react";
import { CalendarOff } from "lucide-react";
import { getNyseHolidayNotice, type NyseHolidayNotice } from "@/lib/marketHours";

function fmtMd(ymd: string): string {
  const [, m, d] = ymd.split("-");
  return `${Number(m)}/${Number(d)}`;
}

function copyFor(notice: NyseHolidayNotice, ko: boolean): { badge: string; title: string; sub: string } {
  const next = fmtMd(notice.nextSessionDate);
  const when = fmtMd(notice.date);
  if (notice.daysUntil === 0) {
    return ko
      ? {
          badge: "휴장",
          title: `오늘 미국 증시 휴장 · ${notice.nameKo}`,
          sub: `NYSE · NASDAQ 전일 휴장 · 다음 정규장 ${next}`,
        }
      : {
          badge: "Closed",
          title: `US markets closed · ${notice.nameEn}`,
          sub: `NYSE · NASDAQ holiday · Next session ${next}`,
        };
  }
  const ahead =
    notice.daysUntil === 1
      ? ko
        ? "내일"
        : "Tomorrow"
      : ko
        ? `${notice.daysUntil}일 후`
        : `In ${notice.daysUntil} days`;
  return ko
    ? {
        badge: "휴장 예정",
        title: `${ahead} 미국 증시 휴장 · ${notice.nameKo}`,
        sub: `${when} 전일 휴장 · 다음 정규장 ${next}`,
      }
    : {
        badge: "Upcoming",
        title: `${ahead}: US markets closed · ${notice.nameEn}`,
        sub: `Holiday ${when} · Next session ${next}`,
      };
}

/** 미국 시장 홈 — 휴장 당일·며칠 전 미리 안내 */
export function NyseHolidayBanner({ locale = "ko" }: { locale?: string }) {
  const [notice, setNotice] = useState<NyseHolidayNotice | null>(null);
  const ko = locale !== "en";

  useEffect(() => {
    const tick = () => setNotice(getNyseHolidayNotice());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!notice) return null;

  const copy = copyFor(notice, ko);
  const today = notice.daysUntil === 0;

  return (
    <div
      className="rounded-xl lg:rounded-2xl border px-4 py-3 lg:px-5 lg:py-3.5"
      role="status"
      aria-live="polite"
      aria-label={copy.title}
      style={{
        background: today
          ? "linear-gradient(135deg, #3b1d1d 0%, #1a1212 55%, #121018 100%)"
          : "linear-gradient(135deg, #2a2210 0%, #18160e 55%, #121018 100%)",
        borderColor: today ? "rgba(248,113,113,0.45)" : "rgba(251,191,36,0.4)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{
            background: today ? "rgba(248,113,113,0.15)" : "rgba(251,191,36,0.12)",
            border: `1px solid ${today ? "rgba(248,113,113,0.4)" : "rgba(251,191,36,0.35)"}`,
          }}
        >
          <CalendarOff
            className="w-5 h-5"
            style={{ color: today ? "#f87171" : "#fbbf24" }}
            aria-hidden
          />
        </div>
        <div className="min-w-0 flex-1">
          <span
            className="inline-block text-[8px] lg:text-[9px] font-bold px-2 py-0.5 rounded-full mb-1"
            style={{
              background: today ? "rgba(248,113,113,0.2)" : "rgba(251,191,36,0.18)",
              color: today ? "#f87171" : "#fbbf24",
            }}
          >
            {copy.badge}
          </span>
          <p className="text-[13px] lg:text-sm font-bold leading-snug" style={{ color: "#f5f6f8" }}>
            {copy.title}
          </p>
          <p className="text-[10px] lg:text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.68)" }}>
            {copy.sub}
          </p>
        </div>
      </div>
    </div>
  );
}
