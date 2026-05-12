import type { FearGreedData } from "@/lib/api";

const GAUGE_R = 32;
const C = 2 * Math.PI * GAUGE_R; // ≈ 201.06

// 공포 = 초록, 탐욕 = 빨강
const ZONES = [
  { from: 0,  to: 25,  color: "#00e5a0", label: "극단적 공포", icon: "😱", desc: "극단적 공포 구간. 투자자들의 매도 심리가 극도로 강합니다." },
  { from: 25, to: 45,  color: "#7ed957", label: "공포",        icon: "😨", desc: "공포 구간. 투자 심리가 위축되어 있습니다." },
  { from: 45, to: 55,  color: "#ffd166", label: "중립",        icon: "😐", desc: "중립 구간. 투자 심리가 균형을 이루고 있습니다." },
  { from: 55, to: 75,  color: "#ff8c55", label: "탐욕",        icon: "⚡", desc: "탐욕 구간. 투자자들의 매수 심리가 강합니다." },
  { from: 75, to: 100, color: "#ff4d6d", label: "극단적 탐욕", icon: "🔥", desc: "극단적 탐욕 구간. 시장 과열 양상이 나타납니다." },
];

function getZone(v: number) {
  return ZONES.find((z) => v >= z.from && v <= z.to) ?? ZONES[2];
}

function PrevValue({ label, value }: { label: string; value: number }) {
  const z = getZone(value);
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

export function FearGreedGauge({ data }: { data: FearGreedData }) {
  const zone = getZone(data.value);
  const dashOffset = C * (1 - data.value / 100);

  return (
    <div
      className="rounded-2xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Section title row */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
          시장 심리
        </h2>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>공포&amp;탐욕 지수</span>
      </div>

      {/* Main card body */}
      <div className="flex items-center gap-5 px-4 py-4">
        {/* Circular gauge */}
        <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            style={{ transform: "rotate(-90deg)" }}
          >
            {/* Track */}
            <circle
              cx="40" cy="40" r={GAUGE_R}
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="40" cy="40" r={GAUGE_R}
              fill="none"
              stroke={zone.color}
              strokeWidth="8"
              strokeDasharray={C}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>
          {/* Center label */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ gap: 0 }}
          >
            <span
              className="font-mono-num font-semibold leading-none"
              style={{ fontSize: 22, color: zone.color }}
            >
              {data.value}
            </span>
            <span className="text-[8px] tracking-wide" style={{ color: "var(--muted)" }}>
              / 100
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            공포 &amp; 탐욕 지수
          </p>
          <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {zone.desc}
          </p>
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono-num border"
            style={{
              background: `${zone.color}1e`,
              color: zone.color,
              borderColor: `${zone.color}33`,
            }}
          >
            {zone.icon} {zone.label}
          </div>
        </div>
      </div>

      {/* Previous values */}
      <div
        className="flex justify-between px-4 pb-4 pt-3 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <PrevValue label="1주 전" value={data.prevWeek} />
        <PrevValue label="현재" value={data.value} />
        <PrevValue label="1달 전" value={data.prevMonth} />
      </div>
    </div>
  );
}
