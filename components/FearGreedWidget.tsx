"use client";

import { useEffect, useRef, useState } from "react";
import { FearGreedGauge } from "./FearGreedGauge";
import type { FearGreedData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";

const CACHE_KEY = "fear-greed-cache-v2";

export function FearGreedWidget({ locale }: { locale?: Locale }) {
  const [data, setData] = useState<FearGreedData | null>(null);
  const fetchRef = useRef<() => void>(() => {});

  const doFetch = () => {
    fetch("/api/fear-greed")
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d: FearGreedData) => {
        if (d?.value != null) {
          setData(d);
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch { /* ignore */ }
        }
      })
      .catch(() => { /* keep cached data visible */ });
  };
  fetchRef.current = doFetch;

  useEffect(() => {
    // 캐시 즉시 표시
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FearGreedData;
        if (parsed?.value != null) setData(parsed);
      }
    } catch { /* ignore */ }

    // 항상 최신 데이터 fetch (장 마감 중에도)
    fetchRef.current();

    // 앱/탭 복귀 시 즉시 갱신
    const onVisibility = () => { if (!document.hidden) fetchRef.current(); };
    const onFocus = () => fetchRef.current();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);

    // 30분마다 백그라운드 갱신 (fear-greed는 자주 안 바뀜)
    const id = setInterval(() => fetchRef.current(), 30 * 60_000);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      clearInterval(id);
    };
  }, []);

  if (!data) return null;
  return <FearGreedGauge data={data} locale={locale} />;
}
