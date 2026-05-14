"use client";

import { useEffect, useState } from "react";
import { BuffettGauge } from "./BuffettGauge";
import type { BuffettData } from "@/lib/api";
import type { Locale } from "@/lib/i18n";

const CACHE_KEY = "buffett-cache";

function isMarketOpen(): boolean {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = now.getDay();
  if (day === 0 || day === 6) return false;
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 9 * 60 + 30 && mins < 16 * 60;
}

export function BuffettWidget({ locale }: { locale?: Locale }) {
  const [data, setData] = useState<BuffettData | null>(null);

  useEffect(() => {
    let hasCached = false;
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BuffettData;
        if (parsed?.ratio != null) {
          setData(parsed);
          hasCached = true;
        }
      }
    } catch { /* ignore */ }

    // 장 마감 + 캐시 있음 → fetch 안 함
    if (!isMarketOpen() && hasCached) return;

    fetch("/api/buffett")
      .then((r) => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then((d: BuffettData) => {
        if (d?.ratio != null) {
          setData(d);
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch { /* ignore */ }
        }
      })
      .catch(() => { /* keep cached data visible */ });
  }, []);

  if (!data) return null;
  return <BuffettGauge data={data} locale={locale} />;
}
