"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronUp } from "lucide-react";
import { NewsCard } from "./NewsCard";
import type { NewsItem } from "@/lib/api";
import { useLocaleCode } from "@/contexts/LocaleContext";

const INITIAL_COUNT = 4;

function NewsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border animate-pulse"
          style={{ background: "var(--card)", borderColor: "var(--border)", height: 80 }}
        />
      ))}
    </div>
  );
}

export function NewsSection({
  news: initialNews,
  market = "us",
}: {
  news?: NewsItem[];
  market?: string;
}) {
  const globalLocale = useLocaleCode();
  const [newsLocale, setNewsLocale] = useState<"ko" | "en">(globalLocale);
  const isKo = newsLocale === "ko";
  const [news, setNews]         = useState<NewsItem[]>(initialNews ?? []);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded]     = useState(!!initialNews?.length);

  function fetchNews(locale: "ko" | "en") {
    const baseUrl = market === "us" ? "/api/news" : `/api/news?market=${market}`;
    const url = market === "us"
      ? `/api/news?locale=${locale}`
      : `${baseUrl}&locale=${locale}`;
    setLoaded(false);
    fetch(url)
      .then((r) => r.ok ? r.json() : [])
      .then((d) => { setNews(Array.isArray(d) ? d : []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }

  useEffect(() => {
    if (initialNews?.length) return; // already have server data
    fetchNews(newsLocale);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNews, market]);

  function switchNewsLocale(newLocale: "ko" | "en") {
    setNewsLocale(newLocale);
    fetchNews(newLocale);
  }

  const visible = expanded ? news : news.slice(0, INITIAL_COUNT);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold tracking-widest uppercase font-syne" style={{ color: "var(--muted)" }}>
            {isKo ? "시장 뉴스" : "Market News"}
          </h2>
          <button
            onClick={() => switchNewsLocale(isKo ? "en" : "ko")}
            className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-opacity active:opacity-60"
            style={{ background: "rgba(var(--text-rgb),0.08)", color: "var(--muted)", border: "1px solid rgba(var(--text-rgb),0.12)" }}>
            {isKo ? "EN" : "한"}
          </button>
        </div>
        {loaded && news.length > INITIAL_COUNT && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-0.5 text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--mint)" }}
          >
            {expanded ? (
              <><ChevronUp className="w-3.5 h-3.5" /> {isKo ? "접기" : "Collapse"}</>
            ) : (
              <>{isKo ? "더보기" : "More"} <ChevronRight className="w-3.5 h-3.5" /></>
            )}
          </button>
        )}
      </div>

      {!loaded ? (
        <NewsSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {visible.map((item) => (
              <NewsCard key={item.id} item={item} large={expanded} />
            ))}
          </div>

          {!expanded && news.length > INITIAL_COUNT && (
            <button
              onClick={() => setExpanded(true)}
              className="w-full mt-3 py-2.5 rounded-2xl text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border)" }}
            >
              {isKo ? `뉴스 ${news.length - INITIAL_COUNT}개 더보기` : `Load ${news.length - INITIAL_COUNT} more`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
