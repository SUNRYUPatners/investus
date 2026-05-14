import type { FearGreedData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/i18n";

const GAUGE_R = 32;
const C = 2 * Math.PI * GAUGE_R;

const ZONE_COLORS = ["#00e5a0", "#7ed957", "#ffd166", "#ff8c55", "#ff4d6d"];
const ZONE_ICONS  = ["😱", "😨", "😐", "⚡", "🔥"];
const ZONE_RANGES = [{ from: 0, to: 25 }, { from: 25, to: 45 }, { from: 45, to: 55 }, { from: 55, to: 75 }, { from: 75, to: 100 }];

function getZoneIdx(v: number) {
  return ZONE_RANGES.findIndex((z) => v >= z.from && v <= z.to) ?? 2;
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
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
          {t.fearGreed.sectionTitle}
        </h2>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>{t.fearGreed.subtitle}</span>
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
