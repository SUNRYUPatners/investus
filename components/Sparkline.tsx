// US market convention: up = red, down = green
const UP   = "#10b981";
const DOWN = "#ef4444";

const W = 72;
const H = 36;

type Props = {
  data: number[];
  positive: boolean;
  width?: number;
  height?: number;
  className?: string;
};

export function Sparkline({ data, positive, width = W, height = H, className }: Props) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 2) - 1;
    return [x, y] as [number, number];
  });

  const polyline = pts.map((p) => p.join(",")).join(" ");
  const fillPath =
    pts.map((p, i) => (i === 0 ? `M ${p[0]},${p[1]}` : `L ${p[0]},${p[1]}`)).join(" ") +
    ` L ${width},${height} L 0,${height} Z`;

  const color = positive ? UP : DOWN;
  const gradId = `sg-${positive ? "u" : "d"}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradId})`} />
      <polyline
        points={polyline}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
