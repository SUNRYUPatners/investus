import { NextRequest, NextResponse } from "next/server";
import {
  fetchFinnhubRawQuote,
  fetchFinnhubProfile,
  fetchFinnhubMetrics,
} from "@/lib/finnhub";
import { fetchQuoteV8 } from "@/lib/yahooFinance";
import { isMarketOpen } from "@/lib/marketHours";
import { kvGetDetail, kvSetDetail } from "@/lib/kv";


export const dynamic = "force-dynamic";

// Server-side cache: 장 마감 중 무기한, 장 중 60초 TTL
const _cache = new Map<string, { data: Record<string, unknown>; at: number }>();
const LIVE_TTL = 60_000;

function saveAndRespond(symbol: string, data: Record<string, unknown>) {
  const isOpen = isMarketOpen();
  const cc = isOpen
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";
  _cache.set(symbol, { data, at: Date.now() });
  kvSetDetail(symbol, data);
  return NextResponse.json(data, { headers: { "Cache-Control": cc } });
}

// ── Index sources (same priority as market-data/route.ts) ────────────────
// Primary: Yahoo Finance direct (^GSPC, ^IXIC, ^DJI)
// Fallback: Finnhub ETF proxy (SPY×10.03, QQQ×36.83, DIA×100)
const INDEX_ETF: Record<string, { etf: string; factor: number; name: string; yfSym: string }> = {
  SPX:  { etf: "SPY", factor: 10.03, name: "S&P 500 Index",       yfSym: "^GSPC" },
  COMP: { etf: "QQQ", factor: 36.83, name: "NASDAQ Composite",     yfSym: "^IXIC" },
  DJI:  { etf: "DIA", factor: 100,   name: "Dow Jones Industrial", yfSym: "^DJI"  },
};

// IWM → RTY (Russell 2000)
const RTY_ETF = { etf: "IWM", factor: 10.05, name: "Russell 2000" };

export async function GET(req: NextRequest) {
  const rawSymbol = (req.nextUrl.searchParams.get("symbol") ?? "").toUpperCase().slice(0, 12);
  if (!rawSymbol) return NextResponse.json({ error: "no symbol" }, { status: 400 });

  const cached = _cache.get(rawSymbol);
  const open   = isMarketOpen();
  const cc = open
    ? "public, s-maxage=55, stale-while-revalidate=120"
    : "public, s-maxage=3600, stale-while-revalidate=86400";

  // 장 마감 중: 인메모리 캐시 → KV → API 순서로 시도
  if (!open && cached) return NextResponse.json(cached.data, { headers: { "Cache-Control": cc } });
  if (!open) {
    const kvData = await kvGetDetail(rawSymbol);
    if (kvData) {
      _cache.set(rawSymbol, { data: kvData, at: Date.now() });
      return NextResponse.json(kvData, { headers: { "Cache-Control": cc } });
    }
  }
  // 장 중: 60초 TTL
  if (cached && Date.now() - cached.at < LIVE_TTL) return NextResponse.json(cached.data, { headers: { "Cache-Control": cc } });

  try {
    // ── 1) 주요 지수: YF direct primary → Finnhub ETF proxy fallback ────────
    // market-data와 완전히 동일한 우선순위 — 가격 일치 보장
    const idxMeta = INDEX_ETF[rawSymbol];
    if (idxMeta) {
      // Yahoo Finance v8 — 모든 가격의 통일 소스
      const yfDirect = await fetchQuoteV8(idxMeta.yfSym);
      if (yfDirect) {
        return saveAndRespond(rawSymbol, {
          symbol: rawSymbol, name: idxMeta.name,
          exchange: "Index", currency: "USD",
          price: yfDirect.price, change: yfDirect.change,
          changePercent: yfDirect.changePercent,
          open: null, high: null, low: null, volume: null,
          week52High: null, week52Low: null,
          pe: null, marketCap: null,
          avgVolume: null, dividendYield: null,
          beta: null, eps: null,
        });
      }
      // Fallback: Finnhub ETF proxy
      const etfQ = await fetchFinnhubRawQuote(idxMeta.etf);
      if (etfQ) {
        const isLive   = etfQ.c > 0;
        const etfPrice = isLive ? etfQ.c : etfQ.pc;
        const f        = idxMeta.factor;
        const price    = etfPrice * f;
        const prev     = etfQ.pc * f;
        return saveAndRespond(rawSymbol, {
          symbol:        rawSymbol,
          name:          idxMeta.name,
          exchange:      "Index",
          currency:      "USD",
          price,
          change:        price - prev,
          changePercent: prev > 0 ? ((price - prev) / prev) * 100 : 0,
          open:          isLive && etfQ.o ? etfQ.o * f : null,
          high:          isLive && etfQ.h ? etfQ.h * f : null,
          low:           isLive && etfQ.l ? etfQ.l * f : null,
          volume:        null,
          week52High:    null, week52Low:     null,
          pe:            null, marketCap:     null,
          avgVolume:     null, dividendYield: null,
          beta:          null, eps:           null,
        });
      }
    }

    // RTY (Russell 2000)
    if (rawSymbol === "RTY") {
      const etfQ = await fetchFinnhubRawQuote(RTY_ETF.etf);
      if (etfQ) {
        const isLive = etfQ.c > 0;
        const f      = RTY_ETF.factor;
        const price  = (isLive ? etfQ.c : etfQ.pc) * f;
        const prev   = etfQ.pc * f;
        return saveAndRespond(rawSymbol, {
          symbol: rawSymbol, name: RTY_ETF.name,
          exchange: "Index", currency: "USD",
          price, change: price - prev,
          changePercent: prev > 0 ? ((price - prev) / prev) * 100 : 0,
          open: null, high: null, low: null, volume: null,
          week52High: null, week52Low: null,
          pe: null, marketCap: null, avgVolume: null,
          dividendYield: null, beta: null, eps: null,
        });
      }
    }

    // ── 2) 일반 미국 주식: Yahoo Finance v8 (primary, 홈탭과 동일 소스) → Finnhub fallback ──
    const [yfQuote, profile, metrics] = await Promise.all([
      fetchQuoteV8(rawSymbol),          // Yahoo Finance v8 — market-data와 동일한 소스
      fetchFinnhubProfile(rawSymbol),   // 회사명·거래소·통화
      fetchFinnhubMetrics(rawSymbol),   // PE·52w·배당·베타
    ]);

    if (yfQuote && yfQuote.price > 0) {
      return saveAndRespond(rawSymbol, {
        symbol:        rawSymbol,
        name:          profile?.name     ?? yfQuote.shortName ?? rawSymbol,
        exchange:      profile?.exchange ?? "US",
        currency:      profile?.currency ?? "USD",
        price:         yfQuote.price,
        change:        yfQuote.change,
        changePercent: yfQuote.changePercent,
        open:          yfQuote.open  ?? null,
        high:          yfQuote.high  ?? null,
        low:           yfQuote.low   ?? null,
        volume:        yfQuote.volume > 0 ? yfQuote.volume : null,
        week52High:    metrics?.week52High    ?? null,
        week52Low:     metrics?.week52Low     ?? null,
        pe:            metrics?.pe            ?? null,
        marketCap:     metrics?.marketCap != null ? metrics.marketCap * 1_000_000 : null,
        avgVolume:     null,
        dividendYield: metrics?.dividendYield ?? null,
        beta:          metrics?.beta          ?? null,
        eps:           metrics?.eps           ?? null,
      });
    }

    // Yahoo Finance 실패 → Finnhub fallback
    const rawQ = await fetchFinnhubRawQuote(rawSymbol);
    if (rawQ && (rawQ.c > 0 || rawQ.pc > 0)) {
      const isLive = rawQ.c > 0;
      const price  = isLive ? rawQ.c : rawQ.pc;
      return saveAndRespond(rawSymbol, {
        symbol:        rawSymbol,
        name:          profile?.name     ?? rawSymbol,
        exchange:      profile?.exchange ?? "US",
        currency:      profile?.currency ?? "USD",
        price,
        change:        isLive ? rawQ.d  : 0,
        changePercent: isLive ? rawQ.dp : 0,
        open:          isLive && rawQ.o ? rawQ.o : null,
        high:          isLive && rawQ.h ? rawQ.h : null,
        low:           isLive && rawQ.l ? rawQ.l : null,
        volume:        null,
        week52High:    metrics?.week52High    ?? null,
        week52Low:     metrics?.week52Low     ?? null,
        pe:            metrics?.pe            ?? null,
        marketCap:     metrics?.marketCap != null ? metrics.marketCap * 1_000_000 : null,
        avgVolume:     null,
        dividendYield: metrics?.dividendYield ?? null,
        beta:          metrics?.beta          ?? null,
        eps:           metrics?.eps           ?? null,
      });
    }

    // ── 3) TwelveData /quote fallback ────────────────────────────────────
    // Yahoo Finance·Finnhub 모두 실패 시 (SQ·EXAS 등 특정 심볼 대응)
    try {
      const tdKey = process.env.TWELVEDATA_API_KEY;
      if (tdKey) {
        const tdRes = await fetch(
          `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(rawSymbol)}&apikey=${tdKey}`,
          { cache: "no-store" }
        );
        if (tdRes.ok) {
          const td = await tdRes.json();
          const price = parseFloat(td.close ?? "0");
          if (price > 0) {
            const change        = parseFloat(td.change ?? "0");
            const changePercent = parseFloat(td.percent_change ?? "0");
            return saveAndRespond(rawSymbol, {
              symbol:        rawSymbol,
              name:          profile?.name ?? td.name ?? rawSymbol,
              exchange:      profile?.exchange ?? td.exchange ?? "US",
              currency:      profile?.currency ?? td.currency ?? "USD",
              price,
              change,
              changePercent,
              open:          parseFloat(td.open ?? "0") || null,
              high:          parseFloat(td.fifty_two_week?.high ?? "0") || null,
              low:           parseFloat(td.fifty_two_week?.low  ?? "0") || null,
              volume:        parseInt(td.volume ?? "0") || null,
              week52High:    metrics?.week52High    ?? null,
              week52Low:     metrics?.week52Low     ?? null,
              pe:            metrics?.pe            ?? null,
              marketCap:     metrics?.marketCap != null ? metrics.marketCap * 1_000_000 : null,
              avgVolume:     null,
              dividendYield: metrics?.dividendYield ?? null,
              beta:          metrics?.beta          ?? null,
              eps:           metrics?.eps           ?? null,
            });
          }
        }
      }
    } catch { /* fall through */ }

    // ── 4) 모든 API 실패 → 스테일 캐시 서빙 ─────────────────────────────
    if (cached) return NextResponse.json(cached.data, { headers: { "Cache-Control": cc } });
    return NextResponse.json({ error: "not found" }, { status: 404 });

  } catch (e) {
    console.error("[stock-detail]", rawSymbol, e);
    if (cached) return NextResponse.json(cached.data, { headers: { "Cache-Control": cc } });
    return NextResponse.json({ error: "fetch failed" }, { status: 503 });
  }
}
