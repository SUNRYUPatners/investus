"use client";

import type { FearGreedData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/i18n";
import { SectionInfo } from "./SectionInfo";

const GAUGE_R = 32;
const C = 2 * Math.PI * GAUGE_R;

const ZONE_COLORS = ["#10b981", "#7ed957", "#ffd166", "#ff8c55", "#ef4444"];
const ZONE_ICONS  = ["😱", "😨", "😐", "⚡", "🔥"];
const ZONE_RANGES = [{ from: 0, to: 25 }, { from: 25, to: 45 }, { from: 45, to: 55 }, { from: 55, to: 75 }, { from: 75, to: 100 }];

function getZoneIdx(v: number) {
  const idx = ZONE_RANGES.findIndex((z) => v >= z.from && v <= z.to);
  if (idx >= 0) return idx;
  return v < 25 ? 0 : 4; // below range = extreme fear, above range = extreme greed
}

function PrevValue({ label, value, zones }: { label: string; value: number; zones: { label: string }[] }) {
  const idx = Math.max(0, getZoneIdx(value));
  const z   = { color: ZONE_COLORS[idx], label: zones[idx]?.label ?? "" };
  return (
    <div className="text-center">
      <p className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</p>
      <p className="font-mono-num font-semibold text-xs mt-0.5" style={{ color: z.color }}>
        {value}
        <span className="font-normal text-[10px] ml-1">{z.label}</span>
      </p>
    </div>
  );
}

export function FearGreedGauge({ data, locale }: { data: FearGreedData; locale?: Locale }) {
  const t    = getT(locale ?? "ko");
  const idx  = Math.max(0, getZoneIdx(data.value));
  const color = ZONE_COLORS[idx];
  const icon  = ZONE_ICONS[idx];
  const zone  = { color, icon, label: t.fearGreed.zones[idx].label, desc: t.fearGreed.zones[idx].desc };
  const dashOffset = C * (1 - data.value / 100);

  return (
    <div
      className="rounded-2xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <SectionInfo title={t.fearGreed.sectionTitle} side="right">
          <p className="font-bold mb-1" style={{ color: "#ffd166" }}>공포 & 탐욕 지수란?</p>
          <p style={{ color: "var(--muted)" }}>지금 투자자들이 <b>얼마나 두려워하거나 욕심내는지</b>를 0~100으로 표현해요.</p>
          <div className="mt-2 space-y-1">
            <p>😱 <b>0~25 극단적 공포</b> — 공황 상태. 역사적으로 <b>매수 기회</b></p>
            <p>😟 <b>26~44 공포</b> — 불안 심리 우세</p>
            <p>😐 <b>45~55 중립</b> — 균형 상태</p>
            <p>😊 <b>56~74 탐욕</b> — 낙관 심리 우세</p>
            <p>🤑 <b>75~100 극단적 탐욕</b> — 과열. 버핏이 현금 비중 늘리는 구간</p>
          </div>
          <p className="mt-2 text-[10px]" style={{ color: "var(--muted)" }}>"남들이 탐욕스러울 때 공포를 느끼고, 남들이 공포스러울 때 탐욕스러워라" — 워런 버핏</p>
        </SectionInfo>
        <span className="text-[10px] whitespace-nowrap" style={{ color: "var(--muted)" }}>{t.fearGreed.subtitle}</span>
      </div>

      <div className="flex items-center gap-5 px-4 py-4">
        <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="40" cy="40" r={GAUGE_R} fill="none" stroke="var(--border)" strokeWidth="8" />
            <circle
              cx="40" cy="40" r={GAUGE_R} fill="none"
              stroke={color} strokeWidth="8"
              strokeDasharray={C} strokeDashoffset={dashOffset} strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ gap: 0 }}>
            <span className="font-mono-num font-semibold leading-none" style={{ fontSize: 22, color }}>
              {data.value}
            </span>
            <span className="text-[8px] tracking-wide" style={{ color: "var(--muted)" }}>/ 100</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            {t.fearGreed.title}
          </p>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>{zone.desc}</p>
          <div
            className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-num border"
            style={{ background: `${color}1e`, color, borderColor: `${color}33` }}
          >
            {icon} {zone.label}
          </div>
        </div>
      </div>

      <div className="flex justify-between px-4 pb-4 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
        <PrevValue label={t.fearGreed.prevWeek}  value={data.prevWeek}  zones={t.fearGreed.zones} />
        <PrevValue label={t.fearGreed.current}   value={data.value}     zones={t.fearGreed.zones} />
        <PrevValue label={t.fearGreed.prevMonth} value={data.prevMonth} zones={t.fearGreed.zones} />
      </div>
    </div>
  );
}
