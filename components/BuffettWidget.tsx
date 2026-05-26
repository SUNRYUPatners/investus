"use client";

import { useEffect, useRef, useState } from "react";
import { BuffettGauge } from "./BuffettGauge";
import type { BuffettData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";

const CACHE_KEY = "buffett-cache-v2";

export function BuffettWidget({ locale }: { locale?: Locale }) {
  const [data, setData] = useState<BuffettData | null>(null);
  const fetchRef = useRef<() => void>(() => {});

  const doFetch = () => {
    fetch("/api/buffett")
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d: BuffettData) => {
        if (d?.ratio != null) {
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
        const parsed = JSON.parse(raw) as BuffettData;
        if (parsed?.ratio != null) setData(parsed);
      }
    } catch { /* ignore */ }

    // 항상 최신 데이터 fetch
    fetchRef.current();

    // 앱/탭 복귀 시 즉시 갱신
    const onVisibility = () => { if (!document.hidden) fetchRef.current(); };
    const onFocus = () => fetchRef.current();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);

    // 1시간마다 백그라운드 갱신 (버핏 지수는 느리게 변함)
    const id = setInterval(() => fetchRef.current(), 60 * 60_000);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
      clearInterval(id);
    };
  }, []);

  if (!data) return null;
  return <BuffettGauge data={data} locale={locale} />;
}
