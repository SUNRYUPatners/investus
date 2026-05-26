import { NextRequest, NextResponse } from "next/server";
import { fetchQuoteV8, type YFQuote } from "@/lib/yahooFinance";
import { isMarketOpen } from "@/lib/marketHours";
import { kvGetPrice, kvSetPrice, type PriceData } from "@/lib/kv";

// TwelveData 개별 /quote — YF·Finnhub 모두 실패한 심볼 최종 폴백
async function fetchTDPrice(sym: string): Promise<{ price: number; change: number; changePercent: number } | null> {
  const key = process.env.TWELVEDATA_API_KEY;
  if (!key) return null;
  try {
    const r = await fetch(`https://api.twelvedata.com/quote?symbol=${encodeURIComponent(sym)}&apikey=${key}`, { cache: "no-store" });
    if (!r.ok) return null;
    const d = await r.json();
    const price = parseFloat(d.close ?? "0");
    if (isNaN(price) || price <= 0) return null;
    return { price, change: parseFloat(d.change ?? "0"), changePercent: parseFloat(d.percent_change ?? "0") };
  } catch { return null; }
}

export const dynamic = "force-dynamic";

// ── Per-symbol server cache ───────────────────────────────────────────────────
type PriceEntry = { price: number; change: number; changePercent: number; at: number };
const _sym = new Map<string, PriceEntry>();
const LIVE_TTL = 60_000;

function getCached(sym: string, open: boolean): PriceEntry | null {
  const e = _sym.get(sym);
  if (!e) return null;
  if (!open) return e;
  return Date.now() - e.at < LIVE_TTL ? e : null;
}

// Yahoo Finance v8 를 chunk 단위로 순차 호출 — 동시 대량 요청 rate-limit 방지
// chunk 3개씩 200ms 간격: 20심볼 ≈ 4.5초
async function fetchYFChunked(symbols: string[]): Promise<YFQuote[]> {
  const out: YFQuote[] = [];
  const CHUNK = 3;
  const DELAY = 200;
  for (let i = 0; i < symbols.length; i += CHUNK) {
    const chunk = symbols.slice(i, i + CHUNK);
    const rows  = await Promise.all(chunk.map(fetchQuoteV8));
    rows.forEach((q) => { if (q && q.price > 0) out.push(q); });
    if (i + CHUNK < symbols.length) await new Promise<void>((r) => setTimeout(r, DELAY));
  }
  return out;
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("symbols") ?? "";
  const symbols = raw
    .split(",")
    .map((s) => s.trim().toUpperCase().slice(0, 12))
    .filter(Boolean)
    .slice(0, 20);

  if (symbols.length === 0) return NextResponse.json({});

  const open     = isMarketOpen();
  const ccHeader = open
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";

  // 1) 인메모리 캐시 적중
  const result: Record<string, { price: number; change: number; changePercent: number }> = {};
  const need: string[] = [];
  for (const sym of symbols) {
    const c = getCached(sym, open);
    if (c) result[sym] = { price: c.price, change: c.change, changePercent: c.changePercent };
    else need.push(sym);
  }

  // 2) KV 폴백 — 장 중/장 외 관계없이 인메모리 미스 시 항상 조회
  //    (콜드스타트, 서버재시작, 처음 요청 모두 대응)
  if (need.length > 0) {
    const kvResults = await Promise.all(need.map(async (sym) => ({ sym, d: await kvGetPrice(sym) })));
    const stillNeed: string[] = [];
    const now = Date.now();
    for (const { sym, d } of kvResults) {
      if (d && d.price > 0) {
        result[sym] = { price: d.price, change: d.change, changePercent: d.changePercent };
        _sym.set(sym, { ...d, at: open ? 0 : now });
        // 장 중이면 KV는 임시 폴백 — 반드시 YF로 재조회해서 stale 방지
        if (open) stillNeed.push(sym);
      } else {
        stillNeed.push(sym);
      }
    }
    need.splice(0, need.length, ...stillNeed);
    // 장 마감 중 + KV로 전부 해결됨 → API 호출 불필요
    if (!open && stillNeed.length === 0) return NextResponse.json(result, { headers: { "Cache-Control": ccHeader } });
  }

  if (need.length === 0) return NextResponse.json(result, { headers: { "Cache-Control": ccHeader } });

  try {
    // 3) Yahoo Finance only — 주식 가격은 단일 소스로 통일 (Finnhub 혼용 시 숫자 불일치 가능)
    const yfResults = await fetchYFChunked(need);
    const now = Date.now();
    yfResults.forEach((q) => {
      if (q.price > 0) {
        result[q.symbol] = { price: q.price, change: q.change, changePercent: q.changePercent };
        const entry: PriceData = { ...result[q.symbol], at: now };
        _sym.set(q.symbol, entry);
        kvSetPrice(q.symbol, entry);
      }
    });
  } catch { /* 부분 결과라도 반환 */ }

  // 4) TwelveData 최종 폴백 — YF·Finnhub 모두 빈 심볼만 대상
  const stillMissing = need.filter((s) => !result[s]);
  if (stillMissing.length > 0) {
    const now = Date.now();
    await Promise.all(stillMissing.map(async (sym) => {
      // TwelveData 먼저
      const td = await fetchTDPrice(sym);
      if (td && td.price > 0) {
        result[sym] = td;
        const entry: PriceData = { ...td, at: now };
        _sym.set(sym, entry);
        kvSetPrice(sym, entry);
        return;
      }
      // 개별 YF v8 — TwelveData도 없으면 (KV도 없는 첫 배포 등)
      const yf = await fetchQuoteV8(sym);
      if (yf && yf.price > 0) {
        result[sym] = { price: yf.price, change: yf.change, changePercent: yf.changePercent };
        const entry: PriceData = { price: yf.price, change: yf.change, changePercent: yf.changePercent, at: now };
        _sym.set(sym, entry);
        kvSetPrice(sym, entry);
      }
    }));
  }

  return NextResponse.json(result, { headers: { "Cache-Control": ccHeader } });
}
