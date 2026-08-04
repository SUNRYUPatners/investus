import { NextResponse, after } from "next/server";
import type { BuffettData } from "@/lib/api";
import { kvGetDetail, kvSetDetail } from "@/lib/kv";
import { isMarketOpen, secondsUntilNextOpen } from "@/lib/marketHours";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// CF Worker 프록시 — Vercel IP 차단 우회 (YF_PROXY_URL 설정 필수)
const YF_PROXY = process.env.YF_PROXY_URL ?? "";
function yfProxyFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (YF_PROXY) return fetch(`${YF_PROXY}?url=${encodeURIComponent(url)}`, init);
  return fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" }, ...init });
}

const KV_KEY = "buffett:v1";

/** Cache-Control for CDN. Open: hourly. Closed: until next open (cap 12h). */
function cacheHeader(): string {
  if (isMarketOpen()) {
    // 장중: 1시간마다 갱신 — SPX 변동이 버핏지수에 반영되도록
    return "public, s-maxage=3600, stale-while-revalidate=1800";
  }
  const untilOpen = secondsUntilNextOpen();
  const ttl = Math.max(3600, Math.min(12 * 3600, untilOpen - 60));
  return `public, s-maxage=${ttl}, stale-while-revalidate=${ttl}`;
}

/** KST calendar date YYYY-MM-DD — matches fear-greed style */
function kstDateString(d = new Date()): string {
  return new Date(d.getTime() + 9 * 60 * 60_000).toISOString().slice(0, 10);
}

// S&P 500 daily chart as Wilshire proxy (Wilshire 5000 not available on Yahoo Finance)
// S&P 500 × 9.5 ≈ Wilshire 5000 index level; calibrated via W5000_CAP_FACTOR
async function fetchWilshire(): Promise<{ now: number; q1ago: number; y1ago: number } | null> {
  for (const base of ["https://query2.finance.yahoo.com", "https://query1.finance.yahoo.com"]) {
    try {
      // 일봉 2년치: 오늘 기준 실시간 변동 반영
      const url = `${base}/v8/finance/chart/%5EGSPC?interval=1d&range=2y`;
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 6000);
      const res = await yfProxyFetch(url, {
        cache: "no-store",
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`GSPC ${res.status}`);
      const json = await res.json();
      const closes: number[] = json?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
      const valid = closes.filter((v) => v != null && isFinite(v));
      if (valid.length < 60) throw new Error("insufficient data");

      // 일봉 기준: 1분기 ≈ 63 거래일, 1년 ≈ 252 거래일
      const scale = 9.5;
      const now   = valid[valid.length - 1] * scale;
      const q1ago = (valid[valid.length - 63]  ?? valid[0]) * scale;
      const y1ago = (valid[valid.length - 252] ?? valid[0]) * scale;
      return { now, q1ago, y1ago };
    } catch { continue; }
  }
  return null;
}

// Parse the last numeric value from a FRED CSV response (DATE,VALUE rows)
function parseLastFredValue(csv: string): number | null {
  const lines = csv.trim().split("\n").slice(1); // skip header
  for (let i = lines.length - 1; i >= 0; i--) {
    const parts = lines[i].split(",");
    const v = parseFloat(parts[1] ?? "");
    if (!isNaN(v) && v > 0) return v;
  }
  return null;
}

async function fetchFredGDP(): Promise<number | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    // FRED public graph CSV — no API key needed; returns quarterly annualized GDP in billions USD
    const res = await fetch(
      "https://fred.stlouisfed.org/graph/fredgraph.csv?id=GDP",
      { cache: "no-store", signal: ctrl.signal },
    );
    clearTimeout(timer);
    if (!res.ok) throw new Error(`FRED ${res.status}`);
    const text = await res.text();
    return parseLastFredValue(text);
  } catch {
    return null;
  }
}

// Calibration: S&P 500 × 9.5 → synthetic Wilshire level → × W5000_CAP_FACTOR → market cap (billions)
// Reference: S&P at ~5800 (Q1 2025) → synthetic W5000 ≈ 55,100 → mkt cap ≈ $65T
// (1 synthetic W5000 point ≈ $1.183B, calibrated 2025-Q1)
const W5000_CAP_FACTOR = 1.183; // billion USD per synthetic W5000 point

export async function GET() {
  try {
    const [wilshire, gdpB] = await Promise.all([fetchWilshire(), fetchFredGDP()]);

    if (!wilshire) {
      // YF 실패 → KV에서 마지막 실제 값 사용 (하드코딩 fallback 금지)
      const kvData = await kvGetDetail(KV_KEY);
      if (kvData && (kvData as unknown as BuffettData).ratio != null) {
        return NextResponse.json(kvData, {
          headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" },
        });
      }
      return NextResponse.json(
        { error: "일시적 오류" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    // Fall back to BEA 2024 annual if FRED is down
    const gdp = gdpB ?? 29369;

    const ratio     = Math.round((wilshire.now   * W5000_CAP_FACTOR) / gdp * 100);
    const prevQ     = Math.round((wilshire.q1ago * W5000_CAP_FACTOR) / gdp * 100);
    const prevY     = Math.round((wilshire.y1ago * W5000_CAP_FACTOR) / gdp * 100);

    const mktCapT   = ((wilshire.now * W5000_CAP_FACTOR) / 1000).toFixed(1);
    const gdpT      = (gdp / 1000).toFixed(1);

    const data: BuffettData = {
      ratio,
      marketCap: `~$${mktCapT}T`,
      gdp:       `~$${gdpT}T`,
      prevQuarter: prevQ,
      prevYear:    prevY,
      // 공포탐욕지수와 동일하게 일자 표기 — 분기 문자열이 오래 고정돼 "안 바뀌는" 느낌을 줌
      updatedAt:   kstDateString(),
    };

    // KV 저장 — 서버리스 freeze 방지를 위해 after()로 대기
    after(() => kvSetDetail(KV_KEY, data as unknown as Record<string, unknown>));

    return NextResponse.json(data, {
      headers: { "Cache-Control": cacheHeader() },
    });
  } catch {
    // 전체 실패 → KV에서 마지막 실제 값 사용
    const kvData = await kvGetDetail(KV_KEY);
    if (kvData && (kvData as unknown as BuffettData).ratio != null) {
      return NextResponse.json(kvData, {
        headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=3600" },
      });
    }
    return NextResponse.json(
      { error: "일시적 오류" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
