import type { BuffettData } from "@/lib/api";

const GAUGE_R = 32;
const C = 2 * Math.PI * GAUGE_R; // ≈ 201.06

// 버핏지수 구간 (실제 % 기준)
const ZONES = [
  { from: 0,   to: 75,  color: "#00e5a0", label: "저평가",       icon: "💎", desc: "시장이 GDP 대비 저평가된 상태. 장기 매수 기회로 볼 수 있습니다." },
  { from: 75,  to: 100, color: "#7ed957", label: "적정 수준",     icon: "✅", desc: "시장이 GDP 대비 적정 수준에 거래 중. 균형 잡힌 투자 환경입니다." },
  { from: 100, to: 125, color: "#ffd166", label: "약간 고평가",   icon: "⚠️", desc: "시장이 GDP를 소폭 상회. 신중한 종목 선별이 필요한 시점입니다." },
  { from: 125, to: 160, color: "#ff8c55", label: "고평가",        icon: "🔥", desc: "시장 밸류에이션이 역사적 평균을 크게 상회. 리스크 관리가 중요합니다." },
  { from: 160, to: 999, color: "#ff4d6d", label: "극단적 고평가", icon: "💣", desc: "시장이 극단적으로 고평가된 구간. 버핏은 현금 비중 확대를 선호합니다." },
];

function getZone(ratio: number) {
  return ZONES.find((z) => ratio >= z.from && ratio < z.to) ?? ZONES[ZONES.length - 1];
}

/** 실제 % → 게이지 표시값(0~100) 으로 비선형 매핑
 *  저평가 구간을 넓게, 고평가 구간을 압축해 시각적으로 위험도 강조
 */
function toGaugeValue(ratio: number): number {
  if (ratio <= 75)  return (ratio / 75) * 25;
  if (ratio <= 100) return 25 + ((ratio - 75)  / 25)  * 20;
  if (ratio <= 125) return 45 + ((ratio - 100) / 25)  * 15;
  if (ratio <= 160) return 60 + ((ratio - 125) / 35)  * 20;
  return Math.min(100, 80 + ((ratio - 160) / 60) * 20);
}

function HistoryValue({ label, ratio }: { label: string; ratio: number }) {
  const z = getZone(ratio);
  return (
    <div className="text-center">
      <p className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</p>
      <p className="font-mono-num font-semibold text-xs mt-0.5" style={{ color: z.color }}>
        {ratio}%
        <span className="font-normal text-[10px] ml-1">{z.label}</span>
      </p>
    </div>
  );
}

export function BuffettGauge({ data }: { data: BuffettData }) {
  const zone       = getZone(data.ratio);
  const gaugeVal   = toGaugeValue(data.ratio);
  const dashOffset = C * (1 - gaugeVal / 100);

  return (
    <div
      className="rounded-2xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h2
          className="text-xs font-semibold tracking-widest uppercase font-syne"
          style={{ color: "var(--muted)" }}
        >
          버핏 지수
        </h2>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          시총 ÷ GDP · {data.updatedAt}
        </span>
      </div>

      {/* Main body */}
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
          {/* Center: 실제 % 표시 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-mono-num font-semibold leading-none"
              style={{ fontSize: 18, color: zone.color }}
            >
              {data.ratio}%
            </span>
            <span className="text-[8px] tracking-wide mt-0.5" style={{ color: "var(--muted)" }}>
              시총/GDP
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
            버핏 지수
          </p>
          <p className="text-[12px] leading-relaxed mb-1" style={{ color: "var(--muted)" }}>
            {zone.desc}
          </p>
          {/* 시총/GDP 수치 */}
          <p className="text-[10px]" style={{ color: "var(--muted)" }}>
            시총 {data.marketCap} &nbsp;/&nbsp; GDP {data.gdp}
          </p>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border"
            style={{
              background:   `${zone.color}1e`,
              color:        zone.color,
              borderColor:  `${zone.color}33`,
            }}
          >
            {zone.icon} {zone.label}
          </div>
        </div>
      </div>

      {/* History row */}
      <div
        className="flex justify-between px-4 pb-4 pt-3 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <HistoryValue label="전년 동기" ratio={data.prevYear}    />
        <HistoryValue label="현재"      ratio={data.ratio}       />
        <HistoryValue label="전 분기"   ratio={data.prevQuarter} />
      </div>
    </div>
  );
}
