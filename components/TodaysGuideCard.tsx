import Link from "next/link";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

/** Day-rotating featured guide for home / insight */
export function TodaysGuideCard({ locale = "ko" }: { locale?: string }) {
  const isKo = locale === "ko";
  const day = Math.floor(Date.now() / 86_400_000);
  const article = LEARN_ARTICLES[day % LEARN_ARTICLES.length];

  return (
    <Link
      href={article.href}
      className="block rounded-2xl border p-4 active:opacity-80 transition-opacity"
      style={{
        background: "linear-gradient(135deg, rgba(var(--mint-rgb),0.06) 0%, var(--card) 55%)",
        borderColor: "rgba(var(--mint-rgb),0.2)",
        textDecoration: "none",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[9px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(var(--mint-rgb),0.12)", color: "rgba(var(--mint-rgb),0.95)" }}
        >
          {isKo ? "오늘의 가이드" : "Today's guide"}
        </span>
        <span className="text-[10px]" style={{ color: "var(--muted)" }}>
          {article.minutes} {isKo ? "읽기" : "read"}
        </span>
      </div>
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{article.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
            {article.title}
          </p>
          <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
            {article.desc}
          </p>
        </div>
        <span className="text-lg flex-shrink-0" style={{ color: "var(--muted)" }}>›</span>
      </div>
      <p className="text-[10px] mt-3 font-semibold" style={{ color: "var(--mint)" }}>
        {isKo ? `투자 지식 허브 · ${LEARN_ARTICLES.length}편 전체 보기 →` : `Learn hub · ${LEARN_ARTICLES.length} guides →`}
      </p>
    </Link>
  );
}
