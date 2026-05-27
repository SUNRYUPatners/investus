import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

type HoldingCtx = {
  symbol:        string;
  shares:        number;
  avgCost:       number;
  currentPrice:  number;
  value:         number;    // USD
  costBasis:     number;    // USD
  pnlPct:        number;
  dayChangePct:  number;
  weightPct:     number;
};

type PortfolioCtx = {
  holdings:      HoldingCtx[];
  totalValue:    number;
  totalCost:     number;
  totalPnlPct:   number;
  usdkrw:        number;
  question:      string;
  fetchNews?:    boolean;   // 오늘 등락 이유 질문 시 전날 뉴스 조회
  history?:      { role: "user" | "assistant"; content: string }[];
};

// 전날(~오늘) 종목별 Finnhub 뉴스 헤드라인 조회
async function fetchYesterdayNews(symbols: string[], key: string): Promise<string> {
  const now  = new Date();
  const to   = now.toISOString().split("T")[0];
  // 주말·휴일 대비 2일 전부터
  const from = new Date(Date.now() - 2 * 86_400_000).toISOString().split("T")[0];

  const parts: string[] = [];
  await Promise.allSettled(
    symbols.slice(0, 6).map(async (sym) => {
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/company-news?symbol=${sym}&from=${from}&to=${to}&token=${key}`,
          { signal: AbortSignal.timeout(5000) },
        );
        if (!res.ok) return;
        const items = await res.json() as { headline: string; datetime: number }[];
        const top = items
          .sort((a, b) => b.datetime - a.datetime)
          .slice(0, 4)
          .map((n) => `  - ${n.headline}`);
        if (top.length) parts.push(`[${sym}]\n${top.join("\n")}`);
      } catch { /* 무시 */ }
    }),
  );
  return parts.join("\n\n");
}

function buildPortfolioSummary(ctx: PortfolioCtx): string {
  const { holdings, totalValue, totalCost, totalPnlPct, usdkrw } = ctx;
  const sorted = [...holdings].sort((a, b) => b.weightPct - a.weightPct);

  const rows = sorted.map((h) =>
    `• ${h.symbol}: ${h.shares}주 | 평단 $${h.avgCost.toFixed(2)} | 현재가 $${h.currentPrice.toFixed(2)} | 평가 $${h.value.toFixed(0)} (${h.weightPct.toFixed(1)}%) | 손익 ${h.pnlPct >= 0 ? "+" : ""}${h.pnlPct.toFixed(2)}% | 오늘 ${h.dayChangePct >= 0 ? "+" : ""}${h.dayChangePct.toFixed(2)}%`
  ).join("\n");

  const totalPnl = totalValue - totalCost;
  const krwTotal = totalValue * usdkrw;
  const krwStr   = krwTotal >= 1e8
    ? `${(krwTotal / 1e8).toFixed(1)}억원`
    : krwTotal >= 1e4
      ? `${Math.round(krwTotal / 1e4).toLocaleString()}만원`
      : `${Math.round(krwTotal).toLocaleString()}원`;

  const best   = [...holdings].sort((a, b) => b.pnlPct  - a.pnlPct)[0];
  const worst  = [...holdings].sort((a, b) => a.pnlPct  - b.pnlPct)[0];
  const topDay = [...holdings].sort((a, b) => Math.abs(b.dayChangePct) - Math.abs(a.dayChangePct))[0];

  // 오늘 포트폴리오 전체 가중 변동 (비중 기준)
  const todayWeightedPct = holdings.reduce(
    (s, h) => s + (h.dayChangePct * (h.weightPct / 100)), 0
  );
  const todayDir = todayWeightedPct >= 0 ? "📈 상승" : "📉 하락";

  // 오늘 오른 종목 / 내린 종목 분리
  const risers  = holdings.filter((h) => h.dayChangePct > 0).map((h) => `${h.symbol}(+${h.dayChangePct.toFixed(2)}%)`).join(", ");
  const fallers = holdings.filter((h) => h.dayChangePct < 0).map((h) => `${h.symbol}(${h.dayChangePct.toFixed(2)}%)`).join(", ");

  return `
[사용자 포트폴리오 현황]
총 평가금액: $${totalValue.toFixed(0)} (≈${krwStr})
총 투자원금: $${totalCost.toFixed(0)}
총 손익: ${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(0)} (${totalPnlPct >= 0 ? "+" : ""}${totalPnlPct.toFixed(2)}%)
환율: 1달러 = ${usdkrw.toLocaleString()}원

★ 오늘 포트폴리오 전체 변동 (비중 가중): ${todayWeightedPct >= 0 ? "+" : ""}${todayWeightedPct.toFixed(2)}% → ${todayDir}
  오늘 오른 종목: ${risers || "없음"}
  오늘 내린 종목: ${fallers || "없음"}

보유 종목 (${holdings.length}개):
${rows}

요약:
- 누적 수익 최고: ${best?.symbol ?? "-"} (${(best?.pnlPct ?? 0) >= 0 ? "+" : ""}${(best?.pnlPct ?? 0).toFixed(2)}%)
- 누적 손실 최고: ${worst?.symbol ?? "-"} (${(worst?.pnlPct ?? 0) >= 0 ? "+" : ""}${(worst?.pnlPct ?? 0).toFixed(2)}%)
- 오늘 가장 크게 움직인 종목: ${topDay?.symbol ?? "-"} (${(topDay?.dayChangePct ?? 0) >= 0 ? "+" : ""}${(topDay?.dayChangePct ?? 0).toFixed(2)}%)
`.trim();
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ answer: "AI 키가 설정되지 않았습니다." }, { status: 503 });
  }

  let body: PortfolioCtx;
  try { body = await req.json(); }
  catch { return NextResponse.json({ answer: "잘못된 요청입니다." }, { status: 400 }); }

  if (!body.question?.trim()) {
    return NextResponse.json({ answer: "질문을 입력해주세요." });
  }
  if (!body.holdings || body.holdings.length === 0) {
    return NextResponse.json({ answer: "포트폴리오에 종목을 먼저 추가해주세요." });
  }

  // 오늘 등락 이유 질문 시: 전날 종목별 뉴스 조회
  let newsSection = "";
  if (body.fetchNews) {
    const finnhubKey = process.env.FINNHUB_API_KEY ?? "";
    if (finnhubKey) {
      const symbols = body.holdings.map((h) => h.symbol);
      const news = await fetchYesterdayNews(symbols, finnhubKey);
      if (news) {
        newsSection = `\n\n[전날~오늘 실제 뉴스 헤드라인 (Finnhub)]\n${news}\n\n⚡ 핵심 규칙: 위 뉴스를 최우선으로 분석하여 각 종목의 등락 이유를 설명할 것. 뉴스에 없는 내용을 추측하거나 훈련 데이터(과거 지식)로 대체 금지. 뉴스가 없는 종목은 "관련 뉴스 없음"으로 표기.`;
      }
    }
  }

  const portfolioSummary = buildPortfolioSummary(body);
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric", month: "long", day: "numeric", weekday: "long",
  });

  const system = `당신은 한국 서학개미(미국 주식 개인 투자자)를 위한 개인 포트폴리오 AI 비서입니다.
오늘 날짜: ${today}

${portfolioSummary}${newsSection}

⚡ 감정 표현 절대 규칙 (가장 중요):
- "★ 오늘 포트폴리오 전체 변동"이 양수(+)이면 → 오늘 포트폴리오가 올랐다/상승했다/강세로 표현
- 음수(-)이면 → 오늘 포트폴리오가 내렸다/하락했다/약세로 표현
- 이 수치가 양수인데 "약세", "부진", "내렸다"고 표현하는 것 절대 금지
- 이 수치가 음수인데 "강세", "좋다", "올랐다"고 표현하는 것 절대 금지
- 전체 방향을 먼저 정확히 말한 뒤, 개별 종목 등락 분석

역할:
- 사용자의 실제 포트폴리오 데이터를 기반으로 맞춤형 분석과 인사이트 제공
- 오늘 오른 종목과 내린 종목을 구체적으로 나누어 설명
- 종목별 오늘 dayChangePct 수치를 정확히 활용해서 이유 분석
- 투자 권유·수익 보장·매매 타이밍 제시 금지

답변 규칙:
- 한국어, 간결하게 (4~7문장)
- 포트폴리오 전체 오늘 변동 방향을 첫 문장에 명확히 표현
- 실제 수치(%, $)를 구체적으로 포함
- 친근하고 솔직한 말투 (이모지 1~2개)
- 마지막 면책 문구 불필요 (UI에 표시됨)`;

  // Build conversation history
  const messages: { role: "user" | "assistant"; content: string }[] = [];
  if (body.history) {
    for (const m of body.history.slice(-4)) {
      messages.push({ role: m.role, content: m.content });
    }
  }
  messages.push({ role: "user", content: body.question.trim() });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model:      "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        system,
        messages,
      }),
    });
    const data = await res.json() as { content?: { text: string }[]; error?: { message: string } };
    if (data.error) return NextResponse.json({ answer: "AI 응답 오류가 발생했습니다." }, { status: 500 });
    const answer = data.content?.[0]?.text?.trim() ?? "응답을 받지 못했습니다.";
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json({ answer: "네트워크 오류가 발생했습니다." }, { status: 500 });
  }
}
