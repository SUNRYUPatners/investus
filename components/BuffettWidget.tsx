"use client";

import { useEffect, useRef, useState } from "react";
import { BuffettGauge } from "./BuffettGauge";
import type { BuffettData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";

const CACHE_KEY = "buffett-cache-v3";

function kstToday(): string {
  return new Date(Date.now() + 9 * 60 * 60_000).toISOString().slice(0, 10);
}

export function BuffettWidget({ locale }: { locale?: Locale }) {
  const [data, setData] = useState<BuffettData | null>(null);
  const fetchRef = useRef<(bust?: boolean) => void>(() => {});

  const doFetch = (bust = false) => {
    const url = bust ? `/api/buffett?ts=${Date.now()}` : "/api/buffett";
    fetch(url, { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d: BuffettData) => {
        if (d?.ratio == null) return;

        // CDN이 어제 응답을 물고 있으면 캐시 우회로 1회 재요청
        const asOf = (d.updatedAt ?? "").slice(0, 10);
        if (!bust && /^\d{4}-\d{2}-\d{2}$/.test(asOf) && asOf < kstToday()) {
          doFetch(true);
          return;
        }

        setData(d);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch { /* ignore */ }
      })
      .catch(() => { /* keep cached data visible */ });
  };
  fetchRef.current = doFetch;

  useEffect(() => {
    // 캐시 즉시 표시 (오늘 날짜만 — 어제 캐시는 서버로)
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BuffettData;
        const asOf = (parsed?.updatedAt ?? "").slice(0, 10);
        if (parsed?.ratio != null && asOf === kstToday()) setData(parsed);
      }
    } catch { /* ignore */ }

    // 항상 최신 데이터 fetch
    fetchRef.current();

    // 앱/탭 복귀 시 즉시 갱신
    const onVisibility = () => { if (!document.hidden) fetchRef.current(); };
    const onFocus = () => fetchRef.current();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);

    // 1시간마다 백그라운드 갱신 (서버 CDN TTL과 맞춤)
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
