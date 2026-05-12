import type { Quote } from "@/lib/api";

type Props = { quotes: Quote[] };

function TickerItem({ q }: { q: Quote }) {
  const pos = q.changePercent >= 0;
  return (
    <span className="inline-flex items-center gap-2 px-5 border-r" style={{ borderColor: "var(--border)" }}>
      <span className="text-xs font-bold font-mono-num" style={{ color: "var(--text)" }}>
        {q.symbol}
      </span>
      <span className="text-xs font-mono-num tabular-nums" style={{ color: "var(--text)" }}>
        ${q.price.toFixed(2)}
      </span>
      <span
        className="text-xs font-mono-num tabular-nums"
        style={{ color: pos ? "var(--mint)" : "var(--down)" }}
      >
        {pos ? "▲" : "▼"} {Math.abs(q.changePercent).toFixed(2)}%
      </span>
    </span>
  );
}

export function TickerTape({ quotes }: Props) {
  const items = [...quotes, ...quotes]; // duplicate for seamless loop

  return (
    <div
      className="overflow-hidden py-2 border-b"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="ticker-track">
        {items.map((q, i) => (
          <TickerItem key={`${q.symbol}-${i}`} q={q} />
        ))}
      </div>
    </div>
  );
}
