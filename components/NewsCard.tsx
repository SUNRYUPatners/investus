import type { NewsItem } from "@/lib/api";

const categoryStyle: Record<string, { bg: string; color: string }> = {
  mint:   { bg: "rgba(0,229,160,0.12)",  color: "#00e5a0" },
  red:    { bg: "rgba(255,77,109,0.12)", color: "#ff4d6d" },
  blue:   { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  purple: { bg: "rgba(168,85,247,0.12)", color: "#c084fc" },
  yellow: { bg: "rgba(234,179,8,0.12)",  color: "#facc15" },
  orange: { bg: "rgba(249,115,22,0.12)", color: "#fb923c" },
};

export function NewsCard({ item, large = false }: { item: NewsItem; large?: boolean }) {
  const style = categoryStyle[item.categoryColor] ?? categoryStyle.blue;

  const inner = (
    <div className="flex items-start gap-3">
      {/* Thumbnail or color block */}
      {item.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={item.image}
          alt=""
          className={`flex-shrink-0 rounded-xl object-cover ${large ? "w-20 h-14" : "w-10 h-10"}`}
        />
      ) : (
        <div
          className="flex-shrink-0 w-10 rounded-xl"
          style={{ background: style.bg, minHeight: large ? 52 : 44 }}
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-medium leading-snug ${large ? "text-[14px] line-clamp-3" : "text-[13px] line-clamp-2"}`}
          style={{ color: "var(--text)" }}
        >
          {item.title}
        </h3>
        {large && item.summary && (
          <p className="mt-1 text-[11px] leading-snug line-clamp-2" style={{ color: "var(--muted)" }}>
            {item.summary}
          </p>
        )}
        {/* Source · time · category — all same line, same size */}
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[10px] font-semibold" style={{ color: style.color }}>
            {item.source}
          </span>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>·</span>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>{item.time}</span>
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>·</span>
          <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: style.color }}>
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );

  const baseClass = `rounded-2xl p-4 border transition-opacity active:opacity-70 ${item.url ? "cursor-pointer hover:opacity-90" : ""}`;

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={{ background: "var(--card)", borderColor: "var(--border)", textDecoration: "none", display: "block" }}
      >
        {inner}
      </a>
    );
  }

  return (
    <article
      className={baseClass}
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {inner}
    </article>
  );
}
