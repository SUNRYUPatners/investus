import type { BuffettData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";
import { getT } from "@/lib/i18n";

const GAUGE_R = 32;
const C = 2 * Math.PI * GAUGE_R;

const ZONE_COLORS  = ["#00e5a0", "#7ed957", "#ffd166", "#ff8c55", "#ff4d6d"];
const ZONE_ICONS   = ["💎", "✅", "⚠️", "🔥", "💣"];
const ZONE_RANGES  = [
  { from: 0,   to: 75  },
  { from: 75,  to: 100 },
  { from: 100, to: 125 },
  { from: 125, to: 160 },
  { from: 160, to: 999 },
];

function getZoneIdx(ratio: number) {
  const i = ZONE_RANGES.findIndex((z) => ratio >= z.from && ratio < z.to);
  return i === -1 ? ZONE_RANGES.length - 1 : i;
}

function toGaugeValue(ratio: number): number {
  if (ratio <= 75)  return (ratio / 75) * 25;
  if (ratio <= 100) return 25 + ((ratio - 75)  / 25)  * 20;
  if (ratio <= 125) return 45 + ((ratio - 100) / 25)  * 15;
  if (ratio <= 160) return 60 + ((ratio - 125) / 35)  * 20;
  return Math.min(100, 80 + ((ratio - 160) / 60) * 20);
}

function HistoryValue({ label, ratio, zones }: { label: string; ratio: number; zones: { label: string }[] }) {
  const idx   = getZoneIdx(ratio);
  const color = ZONE_COLORS[idx];
  return (
    <div className="text-center">
      <p className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</p>
      <p className="font-mono-num font-semibold text-xs mt-0.5" style={{ color }}>
        {ratio}%
        <span className="font-normal text-[10px] ml-1">{zones[idx]?.label ?? ""}</span>
      </p>
    </div>
  );
}

export function BuffettGauge({ data, locale }: { data: BuffettData; locale?: Locale }) {
  const t         = getT(locale ?? "ko");
  const idx       = getZoneIdx(data.ratio);
  const color     = ZONE_COLORS[idx];
  const icon      = ZONE_ICONS[idx];
  const zone      = { color, icon, label: t.buffett.zones[idx].label, desc: t.buffett.zones[idx].desc };
  const gaugeVal  = toGaugeValue(data.ratio);
  const dashOffset = C * (1 - gaugeVal / 100);

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
          {t.buffett.sectionTitle}
        </h2>
        <span className="text-[10px] whitespace-nowrap" style={{ color: "var(--muted)" }}>
          {data.updatedAt} · S&P500 추정
        </span>
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono-num font-semibold leading-none" style={{ fontSize: 18, color }}>
              {data.ratio}%
            </span>
            <span className="text-[8px] tracking-wide mt-0.5" style={{ color: "var(--muted)" }}>
              {t.buffett.mktGdp}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            {t.buffett.title}
          </p>
          <p className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--muted)" }}>{zone.desc}</p>
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>
            {t.buffett.mktCap} {data.marketCap} &nbsp;/&nbsp; {t.buffett.gdp} {data.gdp}
          </p>
          <div
            className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ background: `${color}1e`, color, borderColor: `${color}33` }}
          >
            {icon} {zone.label}
          </div>
        </div>
      </div>

      <div className="flex justify-between px-4 pb-4 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
        <HistoryValue label={t.buffett.prevYear}    ratio={data.prevYear}    zones={t.buffett.zones} />
        <HistoryValue label={t.buffett.current}     ratio={data.ratio}       zones={t.buffett.zones} />
        <HistoryValue label={t.buffett.prevQuarter} ratio={data.prevQuarter} zones={t.buffett.zones} />
      </div>
    </div>
  );
}
