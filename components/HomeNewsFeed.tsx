"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useLocale, useLocaleCode } from "@/contexts/LocaleContext";
import type { HomeArticleCard } from "@/lib/homeArticleCard";
import { localePath } from "@/lib/localePath";

const PAGE_SIZE = 6;

export function HomeNewsFeed({
  articles,
  intro,
}: {
  articles: HomeArticleCard[];
  intro?: string;
}) {
  const t = useLocale();
  const locale = useLocaleCode();
  const [shown, setShown] = useState(PAGE_SIZE);
  const visible = articles.slice(0, shown);
  const remaining = Math.max(0, articles.length - shown);

  if (articles.length === 0) {
    return (
      <p className="text-sm px-4 lg:px-0 py-6 text-center" style={{ color: "var(--muted)" }}>
        {t.homeFeed.empty}
      </p>
    );
  }

  return (
    <div className="px-4 lg:px-0">
      {(intro ?? t.homeFeed.newsSubtitle) && (
      <p className="text-[10px] mb-3" style={{ color: "var(--muted)" }}>
        {intro ?? t.homeFeed.newsSubtitle}
      </p>
      )}
      <div className="flex flex-col gap-3">
        {visible.map((a) => (
          <HomeArticleRow key={a.slug} a={a} href={localePath(`/news/${a.slug}`, locale)} />
        ))}
      </div>
      {remaining > 0 ? (
        <button
          type="button"
          onClick={() => setShown((n) => n + PAGE_SIZE)}
          className="w-full flex items-center justify-center gap-2 py-3.5 mt-3 rounded-2xl border text-sm font-semibold transition-opacity active:opacity-60"
          style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)" }}
        >
          {t.homeFeed.loadMoreCount(remaining > PAGE_SIZE ? PAGE_SIZE : remaining)}
          <ChevronDown className="w-4 h-4" />
        </button>
      ) : (
        shown > PAGE_SIZE && (
          <p className="text-center text-[11px] mt-3 py-2" style={{ color: "var(--muted)" }}>
            {t.homeFeed.allCaughtUp}
          </p>
        )
      )}
    </div>
  );
}

function HomeArticleRow({ a, href }: { a: HomeArticleCard; href: string }) {
  return (
    <article
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <Link href={href} className="block p-4 hover:opacity-90 transition-opacity no-underline">
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: a.categoryBg, color: a.categoryFg }}
          >
            {a.category}
          </span>
          {a.tickerLabel && (
            <span
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--text)" }}
            >
              {a.tickerLabel}
            </span>
          )}
          <time
            className="text-[9px] font-mono-num tabular-nums ml-auto flex-shrink-0"
            style={{ color: "var(--muted)", opacity: 0.7 }}
            dateTime={a.date}
          >
            {a.displayDate || a.date}
          </time>
        </div>
        <h3 className="text-sm font-bold leading-snug mb-1.5" style={{ color: "var(--text)" }}>
          {a.title}
        </h3>
        <p
          className="text-[12px] leading-relaxed line-clamp-3"
          style={{ color: "var(--muted)" }}
        >
          {a.excerpt}
        </p>
      </Link>
    </article>
  );
}
