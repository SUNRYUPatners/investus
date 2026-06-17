import { NextResponse } from "next/server";
import type { BuffettData } from "@/lib/api";
import { kvGetDetail, kvSetDetail } from "@/lib/kv";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 다음 NYSE 장마감(4PM ET) + 1시간 버퍼까지 남은 초 반환
// 장마감 후엔 다음날 5PM ET까지 캐시
function secsUntilNextClose(): number {
  const now = new Date();
  // ET offset: EDT=-4, EST=-5. 간단히 UTC-4 고정 (EDT 기준, 오차 ±1h 허용)
  const etMs = now.getTime() - 4 * 3600_000;
  const et = new Date(etMs);
  const closeHour = 17; // 5PM ET (마감 후 1h 버퍼)
  const next = new Date(et);
  next.setUTCHours(closeHour, 0, 0, 0);
  if (et.getUTCHours() >= closeHour) next.setUTCDate(next.getUTCDate() + 1);
  const secs = Math.floor((next.getTime() - et.getTime()) / 1000);
  return Math.max(secs, 3600); // 최소 1시간
}

// CF Worker 프록시 — Vercel IP 차단 우회 (YF_PROXY_URL 설정 필수)
const YF_PROXY = process.env.YF_PROXY_URL ?? "";
function yfProxyFetch(url: string, init: RequestInit = {}): Promise<Response> {
  if (YF_PROXY) return fetch(`${YF_PROXY}?url=${encodeURIComponent(url)}`, init);
  return fetch(url, { headers: { "User-Agent": "Mozilla/5.0", Accept: "application/json" }, ...init });
}

const KV_KEY = "buffett:v1";

// S&P 500 monthly chart as Wilshire proxy (Wilshire 5000 not available on Yahoo Finance)
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
          headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=86400" },
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

    const now       = new Date();
    const quarter   = `${now.getFullYear()} Q${Math.ceil((now.getMonth() + 1) / 3)}`;

    const data: BuffettData = {
      ratio,
      marketCap: `~$${mktCapT}T`,
      gdp:       `~$${gdpT}T`,
      prevQuarter: prevQ,
      prevYear:    prevY,
      updatedAt:   quarter,
    };

    // KV에 저장 — API 실패 시 실제 마지막 값 사용 가능
    kvSetDetail(KV_KEY, data as unknown as Record<string, unknown>);

    const ttl = secsUntilNextClose();
    return NextResponse.json(data, {
      headers: { "Cache-Control": `s-maxage=${ttl}, stale-while-revalidate=86400` },
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
