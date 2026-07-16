import { NextResponse } from "next/server";
import { unstable_cache, revalidateTag } from "next/cache";

export const maxDuration = 45;

type CachedSummary = { date: string; summary: string; generatedAt: number };

/** L1: 같은 서버리스 인스턴스 안에서는 즉시 반환 */
let memCache: CachedSummary | null = null;

/** YYYY-MM-DD of the last NYSE close (ET 기준) */
function lastTradingDay(): string {
  const now  = new Date();
  const et   = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
  const pastClose = et.getHours() * 60 + et.getMinutes() >= 16 * 60;
  const holidays  = new Set([
    "2025-01-01","2025-01-20","2025-02-17","2025-04-18","2025-05-26",
    "2025-06-19","2025-07-04","2025-09-01","2025-11-27","2025-12-25",
    "2026-01-01","2026-01-19","2026-02-16","2026-04-03","2026-05-25",
    "2026-06-19","2026-07-03","2026-09-07","2026-11-26","2026-12-25",
  ]);
  for (let back = 0; back < 7; back++) {
    const d   = new Date(et);
    d.setDate(d.getDate() - back);
    const dow = d.getDay();
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (dow === 0 || dow === 6 || holidays.has(str)) continue;
    if (back > 0 || pastClose) return str;
  }
  return et.toISOString().slice(0, 10);
}

type SectorData = { key: string; name: string; avg: number };
type FutureData = { symbol: string; name: string; changePercent: number; group: string };

async function fetchSectors(): Promise<SectorData[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.investus.kr";
    const res  = await fetch(`${base}/api/sp500-prices`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const d = await res.json() as { sectors?: { key: string; name: string; stocks: { changePercent: number | null }[] }[] };
    return (d.sectors ?? []).map((s) => {
      const valid = s.stocks.filter((x) => x.changePercent != null);
      const avg   = valid.length > 0
        ? valid.reduce((a, b) => a + (b.changePercent ?? 0), 0) / valid.length
        : 0;
      return { key: s.key, name: s.name, avg: Math.round(avg * 100) / 100 };
    });
  } catch { return []; }
}

async function fetchFutures(): Promise<FutureData[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.investus.kr";
    const res  = await fetch(`${base}/api/market-data`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const d = await res.json() as { futures?: { symbol: string; name: string; changePercent: number; group: string }[] };
    return (d.futures ?? []).filter((f) => !f.symbol.startsWith("_")).slice(0, 15);
  } catch { return []; }
}

function buildPrompt(sectors: SectorData[], futures: FutureData[], date: string): string {
  const secLines = sectors
    .sort((a, b) => b.avg - a.avg)
    .map((s) => `${s.name}: ${s.avg >= 0 ? "+" : ""}${s.avg}%`)
    .join(", ");

  const ftLines = futures
    .map((f) => `${f.name}(${f.symbol}): ${f.changePercent >= 0 ? "+" : ""}${f.changePercent.toFixed(2)}%`)
    .join(", ");

  return `오늘(${date}) 미국 시장 종합 분석을 간결하게 해줘.

S&P500 섹터별 등락:
${secLines}

주요 선물 등락 (지수선물·원자재·채권·외환):
${ftLines}

위 데이터를 바탕으로 오늘 시장의 핵심 흐름을 **한국어로 2~3문장** 안에 요약해줘.
- 어떤 섹터/자산이 강했고 약했는지
- 원자재·채권·달러 움직임이 주는 시사점
- 오늘 시장의 전반적인 성격(리스크온/오프, 섹터로테이션 등)
투자 권유 없이 팩트 중심으로, 증권사 리서치 요약 톤으로 작성.`;
}

/** Claude 호출 — 캐시 미스일 때만 실행됨 */
async function generateSummary(date: string, apiKey: string): Promise<CachedSummary> {
  const [sectors, futures] = await Promise.all([fetchSectors(), fetchFutures()]);
  if (sectors.length === 0 && futures.length === 0) {
    throw new Error("no data");
  }

  const prompt = buildPrompt(sectors, futures, date);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key":         apiKey,
      "anthropic-version": "2023-06-01",
      "content-type":      "application/json",
    },
    body: JSON.stringify({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages:   [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) throw new Error("claude error");

  const data = await res.json() as { content?: { text: string }[] };
  const summary = data.content?.[0]?.text?.trim() ?? "";
  if (!summary) throw new Error("empty");

  return { date, summary, generatedAt: Date.now() };
}

/**
 * L2: Vercel Data Cache — 배포 전역으로 하루(86400s) 유지.
 * Upstash/Edge Config 없이 동작. 날짜가 키에 포함돼서 거래일마다 1회만 Claude 호출.
 */
async function getCachedSummary(date: string, apiKey: string): Promise<CachedSummary> {
  return unstable_cache(
    async () => generateSummary(date, apiKey),
    ["market-summary", date],
    { revalidate: 86_400, tags: ["market-summary"] },
  )();
}

export async function GET(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "no key" }, { status: 503 });

  const force = new URL(req.url).searchParams.get("force") === "1";
  const date  = lastTradingDay();

  // L1 메모리 히트 (강제 갱신 제외)
  if (!force && memCache?.date === date && memCache.summary) {
    return NextResponse.json({ summary: memCache.summary, date, cached: true });
  }

  try {
    if (force) {
      // 수동 강제 갱신: 캐시 무효화 후 Claude 1회 호출
      revalidateTag("market-summary", "max");
      const fresh = await generateSummary(date, apiKey);
      memCache = fresh;
      return NextResponse.json({ summary: fresh.summary, date, cached: false });
    }

    const result = await getCachedSummary(date, apiKey);
    memCache = result;
    // generatedAt이 수초 이전이면 Data Cache에서 읽은 것 (방금 생성이면 ~0ms 차이)
    const cached = Date.now() - result.generatedAt > 3_000;
    return NextResponse.json({
      summary: result.summary,
      date,
      cached,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "timeout";
    if (msg === "no data") return NextResponse.json({ error: "no data" }, { status: 503 });
    if (msg === "claude error" || msg === "empty") {
      return NextResponse.json({ error: msg }, { status: 502 });
    }
    return NextResponse.json({ error: "timeout" }, { status: 504 });
  }
}
