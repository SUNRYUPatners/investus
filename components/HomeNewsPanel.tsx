"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";
import {
  NEWS_STRINGS,
  newsSectionTabs,
  type NewsSectionTab,
} from "@/components/news/newsStrings";
import { HomeNewsFeed } from "@/components/HomeNewsFeed";
import { AboutContent } from "@/components/news/AboutContent";
import { LearnHubCards } from "@/components/LearnHubCards";
import { LEARN_ARTICLES, LEARN_SERIES } from "@/lib/learnArticles";
import type { HomeArticleCard } from "@/lib/homeArticleCard";
import type { LiveNewsItem } from "@/lib/liveNewsTypes";
import { localePath } from "@/lib/localePath";

function relTime(iso: string, locale: "en" | "ko"): string {
  const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (locale === "ko") {
    if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}분 전`;
    if (s < 86400) return `${Math.floor(s / 3600)}시간 전`;
    return `${Math.floor(s / 86400)}일 전`;
  }
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function HomeNewsPanel({
  analysis,
  earnings,
  spacex,
}: {
  analysis: HomeArticleCard[];
  earnings: HomeArticleCard[];
  spacex: HomeArticleCard[];
}) {
  const locale = useLocaleCode();
  const s = NEWS_STRINGS[locale];
  const tabs = newsSectionTabs(locale);
  const [tab, setTab] = useState<NewsSectionTab>("news");
  const [headlines, setHeadlines] = useState<LiveNewsItem[] | null>(null);
  const [liveError, setLiveError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liveTick, setLiveTick] = useState(0);

  useEffect(() => {
    if (tab !== "news") return;
    let cancelled = false;
    fetch(`/api/live-news?locale=${locale}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: { items?: LiveNewsItem[]; error?: boolean }) => {
        if (cancelled) return;
        const items = Array.isArray(data.items) ? data.items : [];
        setHeadlines(items);
        setLiveError(!!data.error && items.length === 0);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setHeadlines([]);
        setLiveError(true);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tab, locale, liveTick]);

  const loadLive = useCallback(() => {
    setLoading(true);
    setLiveError(false);
    setHeadlines(null);
    setLiveTick((n) => n + 1);
  }, []);

  return (
    <section className="pt-3 pb-6">
      <nav
        className="px-4 lg:px-0 mb-4 flex flex-wrap gap-x-4 gap-y-1.5"
        aria-label={s.news}
      >
        {tabs.map((n) => {
          const active = n.id === tab;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setTab(n.id)}
              aria-current={active ? "page" : undefined}
              className="text-[12px] font-semibold pb-0.5"
              style={{
                color: active ? "var(--mint)" : "var(--text)",
                borderBottom: active ? "1.5px solid var(--mint)" : "1.5px solid transparent",
              }}
            >
              {n.label}
            </button>
          );
        })}
      </nav>

      {tab === "news" && (
        <LiveHeadlineList
          items={headlines}
          loading={loading}
          error={liveError}
          onRetry={loadLive}
          locale={locale}
        />
      )}
      {tab === "analysis" && (
        <OwnerFeed
          articles={analysis}
          intro={s.analysisIntro}
          emptyHref={localePath("/news/analysis", locale)}
          emptyCta={s.allArticles}
        />
      )}
      {tab === "earnings" && (
        <OwnerFeed
          articles={earnings}
          intro={s.earningsIntro}
          emptyHref={localePath("/news/earnings", locale)}
          emptyCta={s.allArticles}
        />
      )}
      {tab === "spacex" && (
        <OwnerFeed
          articles={spacex}
          intro={s.spacexIntro}
          emptyHref={localePath("/news/spacex", locale)}
          emptyCta={s.allArticles}
        />
      )}
      {tab === "guides" && <GuidesInline locale={locale} />}
      {tab === "about" && (
        <div className="px-4 lg:px-0">
          <AboutContent locale={locale} />
        </div>
      )}
    </section>
  );
}

function LiveHeadlineList({
  items,
  loading,
  error,
  onRetry,
  locale,
}: {
  items: LiveNewsItem[] | null;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  locale: "en" | "ko";
}) {
  const s = NEWS_STRINGS[locale];
  if (loading || items === null) {
    return (
      <div className="px-4 lg:px-0 flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border animate-pulse"
            style={{ background: "var(--card)", borderColor: "var(--border)", height: 88 }}
          />
        ))}
      </div>
    );
  }
  if (error || items.length === 0) {
    return (
      <div className="px-4 lg:px-0 py-8 text-center">
        <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
          {error ? s.liveError : s.liveEmpty}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl"
          style={{ background: "var(--card)", color: "var(--mint)", border: "1px solid var(--border)" }}
        >
          {s.retry}
        </button>
      </div>
    );
  }
  return (
    <div className="px-4 lg:px-0 flex flex-col gap-3">
      {items.map((it) => (
        <a
          key={it.id + it.url}
          href={it.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block rounded-2xl border p-4 no-underline hover:opacity-90 transition-opacity"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold" style={{ color: "var(--mint)" }}>
              {it.source}
            </span>
            <time className="text-[10px] ml-auto tabular-nums" style={{ color: "var(--muted)" }} dateTime={it.publishedAt}>
              {relTime(it.publishedAt, locale)}
            </time>
          </div>
          <p className="text-sm font-bold leading-snug" style={{ color: "var(--text)" }}>
            {it.title}
          </p>
          <p className="text-[10px] mt-1.5" style={{ color: "var(--muted)" }}>
            {s.openOriginal} ↗
          </p>
        </a>
      ))}
    </div>
  );
}

function OwnerFeed({
  articles,
  intro,
  emptyHref,
  emptyCta,
}: {
  articles: HomeArticleCard[];
  intro: string;
  emptyHref: string;
  emptyCta: string;
}) {
  if (articles.length === 0) {
    return (
      <div className="px-4 lg:px-0 py-6">
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
          {intro}
        </p>
        <Link href={emptyHref} className="text-sm font-semibold no-underline" style={{ color: "var(--mint)" }}>
          {emptyCta} →
        </Link>
      </div>
    );
  }
  return <HomeNewsFeed articles={articles} intro={intro} />;
}

function GuidesInline({ locale }: { locale: "en" | "ko" }) {
  const s = NEWS_STRINGS[locale];
  const isKo = locale === "ko";
  return (
    <div className="px-4 lg:px-0">
      <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
        {s.guidesIntro}
      </p>
      <div className="flex flex-col gap-2 mb-5">
        {LEARN_SERIES.map((series) => (
          <Link
            key={series.id}
            href={localePath("/learn", locale)}
            className="rounded-xl border px-4 py-3 no-underline"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
              {isKo ? series.title : series.titleEn}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
              {isKo ? series.blurb : series.blurbEn}
            </p>
          </Link>
        ))}
      </div>
      <LearnHubCards articles={LEARN_ARTICLES.slice(0, 8)} />
      <Link
        href={localePath("/learn", locale)}
        className="mt-4 block text-center text-xs font-semibold py-3 rounded-2xl no-underline"
        style={{ background: "var(--card)", color: "var(--mint)", border: "1px solid var(--border)" }}
      >
        {s.allGuides} →
      </Link>
    </div>
  );
}
