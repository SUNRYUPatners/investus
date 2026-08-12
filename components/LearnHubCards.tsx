import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LEARN_ARTICLES, type LearnArticle } from "@/lib/learnArticles";

export function LearnHubCards({ articles = LEARN_ARTICLES }: { articles?: LearnArticle[] }) {
  return (
    <div className="flex flex-col gap-3">
      {articles.map((a) => (
        <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
          <div
            className="rounded-2xl p-4 border flex items-start gap-4 active:opacity-80 transition-opacity"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {a.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${a.tagColor}18`, color: a.tagColor }}
                >
                  {a.tag}
                </span>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                  {a.minutes} 읽기
                </span>
              </div>
              <p className="text-sm font-bold leading-snug mb-1" style={{ color: "var(--text)" }}>
                {a.title}
              </p>
              <p className="text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {a.desc}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 flex-shrink-0 mt-1 opacity-30" style={{ color: "var(--muted)" }} />
          </div>
        </Link>
      ))}
    </div>
  );
}
