import type { NewsItem } from "@/lib/api";

const categoryStyle: Record<string, { bg: string; color: string }> = {
  mint:   { bg: "rgba(0,229,160,0.12)",   color: "#00e5a0" },
  red:    { bg: "rgba(255,77,109,0.12)",   color: "#ff4d6d" },
  blue:   { bg: "rgba(59,130,246,0.12)",   color: "#60a5fa" },
  purple: { bg: "rgba(168,85,247,0.12)",   color: "#c084fc" },
  yellow: { bg: "rgba(234,179,8,0.12)",    color: "#facc15" },
  orange: { bg: "rgba(249,115,22,0.12)",   color: "#fb923c" },
};

const categoryEmoji: Record<string, string> = {
  거시경제: "🏦",
  실적:     "📈",
  기술:     "💻",
  자동차:   "⚡",
  시장:     "📊",
  투자:     "💰",
  금융:     "🏛️",
  에너지:   "⛽",
};

export function NewsCard({ item }: { item: NewsItem }) {
  const style = categoryStyle[item.categoryColor] ?? categoryStyle.blue;
  const emoji = categoryEmoji[item.category] ?? "📰";

  return (
    <article
      className="rounded-2xl p-4 border cursor-pointer active:opacity-80 transition-opacity"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="flex items-start gap-3">
        {/* Emoji + 카테고리 텍스트 */}
        <div
          className="flex-shrink-0 w-10 rounded-xl flex flex-col items-center justify-center gap-0.5 py-1.5"
          style={{ background: style.bg, minHeight: 44 }}
        >
          <span className="text-base leading-none">{emoji}</span>
          <span className="text-[8px] font-semibold leading-none" style={{ color: style.color }}>
            {item.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-[13px] font-medium leading-snug line-clamp-2"
            style={{ color: "var(--text)" }}
          >
            {item.title}
          </h3>
          <p
            className="mt-1 text-[11px] leading-snug line-clamp-1"
            style={{ color: "var(--muted)" }}
          >
            {item.summary}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className="text-[10px] font-semibold"
              style={{ color: style.color }}
            >
              {item.source}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>·</span>
            <span className="text-[10px]" style={{ color: "var(--muted)" }}>
              {item.time}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
