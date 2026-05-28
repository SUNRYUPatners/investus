"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";

type Section = { id: string; emoji: string; title: string; content: React.ReactNode };

function Accordion({ section }: { section: Section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <button
        className="w-full flex items-center gap-3 px-4 py-4 active:opacity-70"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-xl flex-shrink-0">{section.emoji}</span>
        <span className="flex-1 text-left text-sm font-bold" style={{ color: "var(--text)" }}>{section.title}</span>
        <ChevronDown className="w-4 h-4 transition-transform flex-shrink-0"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && (
        <div className="px-4 pb-4 border-t text-[13px] leading-relaxed space-y-3"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          {section.content}
        </div>
      )}
    </div>
  );
}

function MockCard({ label, value, pct, positive }: { label: string; value: string; pct: string; positive: boolean }) {
  return (
    <div className="rounded-xl p-3 border flex-1 min-w-0" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
      <p className="text-[10px]" style={{ color: "var(--muted)" }}>{label}</p>
      <p className="text-sm font-bold font-mono-num mt-0.5" style={{ color: "var(--text)" }}>{value}</p>
      <p className="text-xs font-bold font-mono-num" style={{ color: positive ? "#10b981" : "#ef4444" }}>{pct}</p>
    </div>
  );
}

function MockHeatTile({ label, pct, positive, size = 1 }: { label: string; pct: string; positive: boolean; size?: number }) {
  const a = Math.min(Math.abs(parseFloat(pct)) / 3, 1) * 0.6 + 0.2;
  const bg = positive ? `rgba(0,229,160,${a})` : `rgba(255,77,109,${a})`;
  return (
    <div className="rounded-lg p-2 flex flex-col justify-between" style={{ background: bg, flex: size, minWidth: 0 }}>
      <p className="text-[10px] font-semibold text-white">{label}</p>
      <p className="text-xs font-bold text-white font-mono-num">{pct}</p>
    </div>
  );
}

function buildSections(isKo: boolean): Section[] {
  return [
    {
      id: "home",
      emoji: "🏠",
      title: isKo ? "홈 화면 — 전체 구성 이해하기" : "Home Screen — Understanding the Layout",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>홈 화면은 <b style={{ color: "var(--text)" }}>미국 주식 시장의 현재 상태</b>를 한눈에 볼 수 있게 구성되어 있어요.</>
              : <>The home screen is designed to give you a quick overview of the <b style={{ color: "var(--text)" }}>current state of the US stock market</b>.</>}
          </p>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
            <div className="px-3 py-2 text-[11px] font-bold" style={{ background: "rgba(0,229,160,0.08)", color: "var(--mint)" }}>
              {isKo ? "📌 화면 위에서 아래 순서" : "📌 Top to Bottom"}
            </div>
            <div className="px-3 py-2 space-y-2">
              {(isKo ? [
                ["① 실시간 티커", "화면 상단에 주요 종목 실시간 등락률이 흘러가요"],
                ["② 내 보유종목", "직접 추가한 종목의 수익률을 한눈에 확인 (탭 이동 시 즉시 표시)"],
                ["③ 포트폴리오 AI 분석", "장마감 후 자동으로 내 종목 등락 원인 분석. 장중에는 수동으로 3회 무료"],
                ["④ 관심종목", "즐겨찾기 종목 한눈에 모아보기"],
                ["⑤ Investus 추천주식", "SUNRYU Partners CIO가 선별한 투자 추천 종목"],
                ["⑥ 인기 종목", "주요 미국 대형주 실시간 시세 (AAPL·NVDA·TSLA 등)"],
                ["⑦ 주요 지수", "S&P 500, NASDAQ, DOW, Russell 2000, 원달러 환율"],
                ["⑧ FUTURES MAP", "선물 시장 — 내일 증시를 미리 가늠하는 지표"],
                ["⑨ S&P 500 히트맵", "500개 종목을 색깔로 한눈에 보는 시장 지도"],
              ] : [
                ["① Live Ticker", "Real-time price changes for major stocks stream across the top"],
                ["② My Holdings", "See your portfolio P&L at a glance (shows instantly when you switch tabs)"],
                ["③ Portfolio AI Analysis", "Auto-analyzes why your holdings moved after market close. During trading hours, 3 manual requests free per day"],
                ["④ Watchlist", "All your favorite stocks in one place"],
                ["⑤ Investus Picks", "Hand-picked investment recommendations by SUNRYU Partners CIO"],
                ["⑥ Popular Stocks", "Real-time prices for major US large-caps (AAPL · NVDA · TSLA, etc.)"],
                ["⑦ Major Indices", "S&P 500, NASDAQ, DOW, Russell 2000, USD/KRW"],
                ["⑧ FUTURES MAP", "Futures market — a leading indicator for tomorrow's market direction"],
                ["⑨ S&P 500 Heatmap", "A color-coded market map of all 500 stocks"],
              ]).map(([t, d]) => (
                <div key={t} className="flex gap-2">
                  <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      id: "indices",
      emoji: "📊",
      title: isKo ? "주요 지수 — S&P 500, NASDAQ이 뭔가요?" : "Major Indices — What Are S&P 500 and NASDAQ?",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>주식 시장 전체 흐름을 나타내는 <b style={{ color: "var(--text)" }}>대표 지표</b>예요. 한국의 코스피처럼요.</>
              : <>These are the <b style={{ color: "var(--text)" }}>benchmark indicators</b> that represent the overall direction of the stock market — like South Korea&apos;s KOSPI.</>}
          </p>
          <div className="flex gap-2 mt-1">
            <MockCard label="S&P 500" value="5,308" pct="+0.44%" positive={true} />
            <MockCard label="NASDAQ" value="16,742" pct="-0.29%" positive={false} />
            <MockCard label="DOW" value="39,512" pct="+0.34%" positive={true} />
          </div>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["📈 S&P 500", "미국 대형주 500개 평균. 미국 경제의 바로미터. 가장 많이 참고함"],
              ["💻 NASDAQ", "기술주 중심 지수. 애플·엔비디아·메타·구글 등 대형 기술주 포함"],
              ["🏭 DOW (다우)", "미국 전통 대기업 30개 평균. 가장 오래된 지수"],
              ["📦 Russell 2000", "미국 중소형주 2000개. 경기 방향을 먼저 반영하는 선행 지표"],
            ] : [
              ["📈 S&P 500", "Average of 500 US large-cap stocks. The barometer of the US economy. Most widely referenced index."],
              ["💻 NASDAQ", "Tech-focused index. Includes Apple, NVIDIA, Meta, Google, and other major tech companies."],
              ["🏭 DOW (Dow Jones)", "Average of 30 traditional US blue-chip companies. The oldest US stock index."],
              ["📦 Russell 2000", "2,000 US small/mid-cap stocks. A leading indicator that often moves before the broader market."],
            ]).map(([t, d]) => (
              <div key={t} className="rounded-lg px-3 py-2 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <p className="font-bold text-[12px]" style={{ color: "var(--text)" }}>{t}</p>
                <p className="text-[11px] mt-0.5">{d}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>{isKo ? "💡 초보자 팁" : "💡 Beginner Tip"}</p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "S&P 500이 오르면 미국 경제가 좋다는 신호, 내리면 불안하다는 신호예요. 개별 종목보다 먼저 이걸 보세요."
                : "When S&P 500 rises, it signals a healthy US economy. When it falls, it signals concern. Check this before looking at individual stocks."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "futures",
      emoji: "🗺️",
      title: isKo ? "FUTURES MAP — 선물 시장이 왜 중요한가요?" : "FUTURES MAP — Why Does the Futures Market Matter?",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>선물(Futures)은 <b style={{ color: "var(--text)" }}>미래의 가격을 미리 사고파는 계약</b>이에요. 주식 시장이 열리기 전에도 거래되기 때문에 <b style={{ color: "var(--text)" }}>내일 시장 방향을 미리 볼 수 있어요.</b></>
              : <>Futures are <b style={{ color: "var(--text)" }}>contracts to buy and sell at a price agreed today</b>. Because they trade before the stock market opens, you can <b style={{ color: "var(--text)" }}>preview tomorrow&apos;s market direction.</b></>}
          </p>
          <div className="flex gap-1.5 mt-2" style={{ height: 64 }}>
            <MockHeatTile label={isKo ? "닛케이" : "Nikkei"} pct="-0.52%" positive={false} size={2} />
            <MockHeatTile label="WTI" pct="-4.4%" positive={false} size={2} />
            <MockHeatTile label={isKo ? "금" : "Gold"} pct="+0.8%" positive={true} size={2} />
            <MockHeatTile label="BTC" pct="+1.2%" positive={true} size={1.5} />
          </div>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["🌍 해외 지수", "닛케이·DAX·FTSE·항셍 — 글로벌 증시 분위기. 아시아가 빠지면 미국도 영향 받아요"],
              ["🛢️ WTI 원유", "오르면 인플레이션 우려 → 연준 금리 유지 가능성 ↑ → 주식엔 부담"],
              ["🥇 금(Gold)", "오르면 투자자들이 안전자산을 선호 → 불안 심리 신호"],
              ["💵 미국채 10년", "금리가 오르면 주식 밸류에이션 부담 증가. 주식과 반대로 움직이는 경향"],
              ["₿ 비트코인", "위험자산 선호도 지표. 오르면 공격적 투자 심리 우세"],
            ] : [
              ["🌍 Global Indices", "Nikkei · DAX · FTSE · Hang Seng — global market mood. When Asian markets fall, US markets often follow."],
              ["🛢️ WTI Crude Oil", "Rising oil signals inflation concern → Fed likely to hold rates → pressure on stocks."],
              ["🥇 Gold", "Rising gold means investors are fleeing to safe-haven assets → a signal of anxiety."],
              ["💵 US 10-Year Treasury", "Rising yields increase valuation pressure on stocks. Tends to move inversely to equities."],
              ["₿ Bitcoin", "Risk appetite indicator. Rising BTC signals aggressive investment sentiment."],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>{isKo ? "💡 활용법" : "💡 How to Use"}</p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "아침에 일어나서 FUTURES MAP이 빨갛다면 → 오늘 미국 장 하락 가능성. 초록이면 상승 가능성. 단, 하루 중 언제든 바뀔 수 있어요."
                : "If FUTURES MAP is red in the morning → US market likely to fall today. Green → likely to rise. But it can flip at any time during the day."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "heatmap",
      emoji: "🔥",
      title: isKo ? "S&P 500 히트맵 — 색깔이 뭘 의미하나요?" : "S&P 500 Heatmap — What Do the Colors Mean?",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>S&P 500의 <b style={{ color: "var(--text)" }}>500개 종목을 한 화면</b>에 모아 색깔로 보여줘요.</>
              : <>Shows all <b style={{ color: "var(--text)" }}>500 S&P 500 stocks</b> on one screen, color-coded.</>}
          </p>
          <div className="flex gap-1.5 mt-2" style={{ height: 80 }}>
            <MockHeatTile label="AAPL" pct="+1.2%" positive={true} size={3} />
            <MockHeatTile label="NVDA" pct="+2.4%" positive={true} size={3} />
            <MockHeatTile label="MSFT" pct="-0.8%" positive={false} size={2} />
            <MockHeatTile label="TSLA" pct="-2.1%" positive={false} size={2} />
          </div>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["🟩 초록색", "오늘 오른 종목. 짙을수록 더 많이 오른 것"],
              ["🟥 빨간색", "오늘 내린 종목. 짙을수록 더 많이 내린 것"],
              ["📐 타일 크기", "클수록 시가총액이 큰 기업 (애플·엔비디아·마이크로소프트 등)"],
              ["🏢 섹터 구분", "기술·헬스케어·금융·소비재 등 업종별로 묶여 있어요"],
            ] : [
              ["🟩 Green", "Stocks that rose today. Darker green = larger gain."],
              ["🟥 Red", "Stocks that fell today. Darker red = larger loss."],
              ["📐 Tile Size", "Larger tiles = bigger market-cap companies (Apple, NVIDIA, Microsoft, etc.)"],
              ["🏢 Sector Groups", "Grouped by industry — Technology, Healthcare, Financials, Consumer, etc."],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>{isKo ? "💡 활용법" : "💡 How to Use"}</p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "종목을 클릭하면 10년 차트가 바로 뜨고, 종목 페이지로 이동할 수 있어요. 섹터 전체가 빨간지, 특정 종목만 내리는지 확인해보세요."
                : "Tap a stock to instantly see its 10-year chart and navigate to the stock detail page. Check whether an entire sector is red, or just individual stocks."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "feargreed",
      emoji: "😱",
      title: isKo ? "공포 & 탐욕 지수 — 시장 심리 읽기" : "Fear & Greed Index — Reading Market Sentiment",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>지금 투자자들이 <b style={{ color: "var(--text)" }}>얼마나 두려워하거나, 욕심내는지</b>를 0~100으로 표현해요.</>
              : <>Expresses on a scale of 0–100 <b style={{ color: "var(--text)" }}>how fearful or greedy investors currently are</b>.</>}
          </p>
          <div className="flex gap-1 mt-2">
            {(isKo ? [
              { label: "극단적\n공포", range: "0~25", color: "#10b981" },
              { label: "공포", range: "26~44", color: "#7ed957" },
              { label: "중립", range: "45~55", color: "#ffd166" },
              { label: "탐욕", range: "56~74", color: "#ff8c55" },
              { label: "극단적\n탐욕", range: "75~100", color: "#ef4444" },
            ] : [
              { label: "Extreme\nFear", range: "0–25", color: "#10b981" },
              { label: "Fear", range: "26–44", color: "#7ed957" },
              { label: "Neutral", range: "45–55", color: "#ffd166" },
              { label: "Greed", range: "56–74", color: "#ff8c55" },
              { label: "Extreme\nGreed", range: "75–100", color: "#ef4444" },
            ]).map((z) => (
              <div key={z.label} className="flex-1 rounded-lg p-1.5 text-center" style={{ background: `${z.color}20`, border: `1px solid ${z.color}40` }}>
                <p className="text-[9px] font-bold whitespace-pre-line" style={{ color: z.color }}>{z.label}</p>
                <p className="text-[8px] mt-0.5" style={{ color: "var(--muted)" }}>{z.range}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 mt-3">
            {(isKo ? [
              ["😱 극단적 공포 (0~25)", "투자자들이 패닉 상태. 역사적으로 주식을 싸게 살 수 있는 기회였어요"],
              ["😟 공포 (26~44)", "불안 심리 우세. 시장이 과도하게 하락했을 가능성"],
              ["😐 중립 (45~55)", "균형 상태. 방향성 불명확"],
              ["🤑 극단적 탐욕 (75~100)", "과열 구간. 버핏은 이 구간에서 현금 비중을 늘려요"],
            ] : [
              ["😱 Extreme Fear (0–25)", "Investors in panic mode. Historically a good opportunity to buy stocks cheaply."],
              ["😟 Fear (26–44)", "Anxiety dominant. Market may be oversold."],
              ["😐 Neutral (45–55)", "Balanced state. Direction unclear."],
              ["🤑 Extreme Greed (75–100)", "Overheated zone. Buffett tends to increase his cash position here."],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2 italic" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <p className="text-[11px]" style={{ color: "#fbbf24" }}>
              {isKo
                ? "\"남들이 탐욕스러울 때 공포를 느끼고, 남들이 공포스러울 때 탐욕스러워라\""
                : "\"Be fearful when others are greedy, and greedy when others are fearful.\""}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>— Warren Buffett</p>
          </div>
        </>
      ),
    },
    {
      id: "buffett",
      emoji: "🏦",
      title: isKo ? "버핏 지수 — 시장이 과열됐나요?" : "Buffett Indicator — Is the Market Overvalued?",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>워런 버핏이 즐겨 쓰는 밸류에이션 지표예요. <b style={{ color: "var(--text)" }}>미국 전체 주식 시가총액 ÷ GDP</b>로 계산해요.</>
              : <>Warren Buffett&apos;s favorite valuation metric. Calculated as <b style={{ color: "var(--text)" }}>Total US Stock Market Cap ÷ GDP</b>.</>}
          </p>
          <div className="flex gap-2 mt-2">
            {(isKo ? [
              { label: "적정", range: "~100%", color: "#10b981", desc: "매수 고려" },
              { label: "고평가", range: "~150%", color: "#ffd166", desc: "신중하게" },
              { label: "극단 고평가", range: "150%+", color: "#ef4444", desc: "버핏 현금↑" },
            ] : [
              { label: "Fair Value", range: "~100%", color: "#10b981", desc: "Consider buying" },
              { label: "Overvalued", range: "~150%", color: "#ffd166", desc: "Proceed carefully" },
              { label: "Extreme", range: "150%+", color: "#ef4444", desc: "Buffett adds cash" },
            ]).map((z) => (
              <div key={z.label} className="flex-1 rounded-lg p-2" style={{ background: `${z.color}15`, border: `1px solid ${z.color}40` }}>
                <p className="text-[10px] font-bold" style={{ color: z.color }}>{z.label}</p>
                <p className="text-[11px] font-mono-num font-bold mt-0.5" style={{ color: "var(--text)" }}>{z.range}</p>
                <p className="text-[9px] mt-0.5" style={{ color: "var(--muted)" }}>{z.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-3" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>
              {isKo ? "💡 현재 지수가 높다면?" : "💡 If the indicator is high:"}
            </p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "단기 예측 도구가 아니에요. 장기적으로 시장이 비싼지 싼지 판단하는 참고 지표예요. 버핏도 이 지수가 높을 때 현금을 쌓아두고 기다렸어요."
                : "This is not a short-term timing tool. It's a reference for judging whether the market is expensive or cheap over the long term. Even Buffett stockpiles cash and waits when this indicator is elevated."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "search",
      emoji: "🔍",
      title: isKo ? "검색 탭 — 종목 찾기 & CIO 추천" : "Search Tab — Find Stocks & CIO Picks",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>원하는 종목을 검색하거나, <b style={{ color: "var(--text)" }}>CIO가 추천한 종목</b>을 확인할 수 있어요.</>
              : <>Search for any stock or browse <b style={{ color: "var(--text)" }}>stocks recommended by the CIO</b>.</>}
          </p>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["🔍 종목 검색", "티커(AAPL, NVDA 등) 또는 회사명으로 검색. 검색 결과 클릭 → 상세 페이지로 이동"],
              ["⭐ Investus 추천주식", "SUNRYU Partners CIO가 선별한 핵심 투자 종목. 상단에 별 아이콘으로 표시"],
              ["🔥 인기 종목", "주요 미국 대형주 실시간 시세"],
              ["📋 13F 투자대가", "화면 오른쪽에서 워런 버핏, 론 배런 등의 포트폴리오 확인"],
            ] : [
              ["🔍 Stock Search", "Search by ticker (AAPL, NVDA, etc.) or company name. Tap result → go to stock detail page."],
              ["⭐ Investus Picks", "Core investment picks selected by SUNRYU Partners CIO. Marked with a star icon at the top."],
              ["🔥 Popular Stocks", "Real-time prices for major US large-cap stocks."],
              ["📋 13F Gurus", "View Warren Buffett, Ron Baron, and other guru portfolios on the right side of the screen."],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: "13f",
      emoji: "📋",
      title: isKo ? "13F 공시 — 투자 고수들의 포트폴리오" : "13F Filings — Portfolios of the World's Best Investors",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>미국에서 자산 <b style={{ color: "var(--text)" }}>$1억 이상</b>을 운용하는 기관은 분기마다 어떤 주식을 샀는지 SEC에 공개 보고해야 해요. 이게 <b style={{ color: "var(--text)" }}>13F 공시</b>예요.</>
              : <>US institutions managing over <b style={{ color: "var(--text)" }}>$100 million</b> in assets must file quarterly reports with the SEC disclosing their stock holdings. These are called <b style={{ color: "var(--text)" }}>13F filings</b>.</>}
          </p>
          <div className="space-y-3 mt-2">
            {(isKo ? [
              {
                emoji: "🏦", name: "워런 버핏", fund: "Berkshire Hathaway",
                desc: "60년간 연평균 약 20% 수익. '가치투자의 아버지'. 장기 보유, 이해할 수 있는 기업에만 투자가 철학이에요.",
                color: "#fb923c",
              },
              {
                emoji: "📈", name: "론 배런", fund: "Baron Capital",
                desc: "장기 성장주 전문. '10년 이상 보유'가 핵심 철학. 테슬라를 초기에 매수해 엄청난 수익을 올렸어요.",
                color: "#60a5fa",
              },
              {
                emoji: "🏛️", name: "낸시 펠로시", fund: "전 하원의장",
                desc: "미국 정치인 중 가장 주목받는 투자자. STOCK Act 의무 공시 대상. 빅테크 중심 포트폴리오로 유명해요.",
                color: "#f472b6",
              },
            ] : [
              {
                emoji: "🏦", name: "Warren Buffett", fund: "Berkshire Hathaway",
                desc: "~20% average annual return over 60 years. 'Father of Value Investing.' Philosophy: hold long-term, invest only in businesses you understand.",
                color: "#fb923c",
              },
              {
                emoji: "📈", name: "Ron Baron", fund: "Baron Capital",
                desc: "Long-term growth specialist. 'Hold for 10+ years' is the core philosophy. Made enormous gains by buying Tesla early.",
                color: "#60a5fa",
              },
              {
                emoji: "🏛️", name: "Nancy Pelosi", fund: "Former House Speaker",
                desc: "The most-watched political investor in the US. Subject to mandatory STOCK Act disclosures. Known for a big-tech-heavy portfolio.",
                color: "#f472b6",
              },
            ]).map((g) => (
              <div key={g.name} className="rounded-xl p-3 border" style={{ background: "var(--bg)", borderColor: "var(--border)", borderLeft: `3px solid ${g.color}` }}>
                <div className="flex items-center gap-2 mb-1">
                  <span>{g.emoji}</span>
                  <span className="font-bold text-[13px]" style={{ color: "var(--text)" }}>{g.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${g.color}20`, color: g.color }}>{g.fund}</span>
                </div>
                <p className="text-[11px]">{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>{isKo ? "⚠️ 주의사항" : "⚠️ Important Note"}</p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "분기 종료 후 45일 이내 공시 → 실제 매수 시점보다 최대 3개월 늦어요. 지금 보이는 포지션이 이미 팔렸을 수도 있어요. 참고용으로 활용하세요."
                : "Filed within 45 days of quarter end → up to 3 months behind the actual purchase date. Positions you see may already be sold. Use as reference only."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "stock",
      emoji: "📈",
      title: isKo ? "종목 상세 — 차트와 지표 보는 법" : "Stock Detail — How to Read Charts & Metrics",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>종목 클릭 시 나오는 <b style={{ color: "var(--text)" }}>상세 페이지</b>예요.</>
              : <>The <b style={{ color: "var(--text)" }}>detail page</b> that opens when you tap any stock.</>}
          </p>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["📊 차트", "1일·1주·1개월·3개월·1년·5년·10년 기간별로 볼 수 있어요"],
              ["💰 현재가", "달러 기준 실시간 가격 (장 마감 후엔 종가)"],
              ["📉 등락률", "오늘 전일 대비 얼마나 올랐는지/내렸는지"],
              ["📦 시가총액", "Market Cap. 기업 전체 가치. 대형주 기준 $1T(1조달러) 이상"],
              ["📰 뉴스 & 리포트", "해당 종목의 최신 관련 뉴스 및 Investus 분석 리포트"],
            ] : [
              ["📊 Chart", "View by period — 1D · 1W · 1M · 3M · 1Y · 5Y · 10Y"],
              ["💰 Current Price", "Real-time price in USD (closing price after market hours)"],
              ["📉 Change", "How much the stock moved vs. yesterday"],
              ["📦 Market Cap", "Total company value. Large-cap benchmark is $1 trillion+"],
              ["📰 News & Reports", "Latest news and Investus analysis reports for the stock"],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: "portfolio",
      emoji: "💼",
      title: isKo ? "자산 탭 — 포트폴리오 & AI 투자비서" : "Assets Tab — Portfolio & AI Investment Assistant",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>내가 투자한 종목의 <b style={{ color: "var(--text)" }}>총 수익률을 자동으로 계산</b>하고, <b style={{ color: "var(--text)" }}>AI 투자비서</b>가 분석해줘요.</>
              : <>Automatically calculates the <b style={{ color: "var(--text)" }}>total return on your investments</b> and your <b style={{ color: "var(--text)" }}>AI investment assistant</b> analyzes them for you.</>}
          </p>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["➕ 종목 추가", "종목명 + 평균 매수가 + 수량 입력"],
              ["📊 총 수익률", "현재가 기준 전체 포트폴리오 손익 자동 계산"],
              ["📈 개별 수익률", "종목별 수익률 개별 확인 가능"],
              ["🔄 실시간 업데이트", "시장이 열려 있는 동안 자동으로 가격 업데이트"],
            ] : [
              ["➕ Add Stock", "Enter ticker + average cost + quantity"],
              ["📊 Total Return", "Automatic P&L calculation for your whole portfolio based on current prices"],
              ["📈 Individual Return", "View return per stock"],
              ["🔄 Live Update", "Prices auto-update while the market is open"],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-3 mt-3 border" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
            <p className="text-[12px] font-bold mb-2" style={{ color: "var(--mint)" }}>
              {isKo ? "✦ 나만의 AI 투자비서 (Claude)" : "✦ Your Personal AI Investment Assistant (Claude)"}
            </p>
            <div className="space-y-1.5">
              {(isKo ? [
                ["내 포트 분석", "종목별 등락 이유, 수익률 요약, 비중 편향 여부 자동 분석"],
                ["자유 질문", "\"오늘 왜 떨어졌어?\", \"리밸런싱 해야 할까?\" 등 자유롭게 질문"],
                ["빠른 질문 칩", "자주 묻는 질문을 버튼 한 번으로 바로 질문"],
                ["하루 10회", "무료 사용자는 하루 10회 이용 가능"],
              ] : [
                ["Portfolio Analysis", "Analyzes why each holding moved, summarizes returns, checks for concentration bias"],
                ["Free Questions", "Ask anything — \"Why did it drop today?\" \"Should I rebalance?\""],
                ["Quick Chips", "Tap a button to instantly ask frequently-asked questions"],
                ["10 Times/Day", "Free users get 10 AI queries per day"],
              ]).map(([t, d]) => (
                <div key={t} className="flex gap-2">
                  <span className="font-bold text-[11px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                  <span className="text-[11px]">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-3 mt-2 border" style={{ background: "rgba(99,102,241,0.04)", borderColor: "rgba(99,102,241,0.2)" }}>
            <p className="text-[12px] font-bold mb-2" style={{ color: "#818cf8" }}>
              {isKo ? "🏠 홈탭 포트폴리오 등락 분석" : "🏠 Home Tab — Portfolio Movement Analysis"}
            </p>
            <div className="space-y-1.5">
              {(isKo ? [
                ["장마감 자동분석", "미국 장 마감(새벽 5시 KST) 후 자동으로 오늘 종목 등락 이유 분석·저장"],
                ["무료 무제한", "장마감 분석은 횟수 제한 없이 무료"],
                ["장중 재분석", "장이 열린 동안 수동으로 최신 분석 요청 — 하루 3회 무료"],
                ["주말·휴일", "마지막 거래일 분석 결과를 그대로 유지"],
              ] : [
                ["Auto Post-Close Analysis", "Auto-generates analysis of today's portfolio moves after US market close. Saved automatically."],
                ["Always Free", "Post-close analysis is free with no usage limit"],
                ["Intraday Re-analysis", "Request fresh analysis while market is open — 3 times free per day"],
                ["Weekends & Holidays", "Retains the last trading day's analysis results"],
              ]).map(([t, d]) => (
                <div key={t} className="flex gap-2">
                  <span className="font-bold text-[11px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                  <span className="text-[11px]">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      id: "wall",
      emoji: "💬",
      title: isKo ? "피드 탭 — 종목토론·애널들은·투자클럽" : "Feed Tab — Stock Talk · Analyst Channel · Invest Club",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>피드 탭에는 <b style={{ color: "var(--text)" }}>3개의 채널</b>이 있어요.</>
              : <>The feed tab has <b style={{ color: "var(--text)" }}>3 channels</b>.</>}
          </p>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["💬 종목토론", "종목별 투자자 토론방. 실제 보유 인증 투자자들의 생생한 의견"],
              ["👔 애널들은", "인증된 애널리스트만 참여하는 익명 채널. 현직 애널리스트의 솔직한 속마음"],
              ["🌟 투자클럽", "계좌 인증 투자자들의 무료 콘텐츠 채널. 강의·리포트·게시글 전부 무료"],
            ] : [
              ["💬 Stock Talk", "Stock-specific investor discussion rooms. Real opinions from verified investors."],
              ["👔 Analyst Channel", "Anonymous channel for verified analysts only. Candid insider views from active securities analysts."],
              ["🌟 Invest Club", "Free content channel for account-verified investors. All lectures, reports, and posts are free."],
            ]).map(([t, d]) => (
              <div key={t} className="rounded-lg px-3 py-2 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <p className="font-bold text-[12px]" style={{ color: "var(--text)" }}>{t}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{d}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1.5 mt-3">
            {(isKo ? [
              ["🔴 NEW 배지", "최근 새 글이 올라온 종목. 최신 토론 바로 확인"],
              ["💼 보유확인", "실제 해당 종목을 보유한 투자자 인증 글"],
              ["👍 좋아요", "공감하는 의견에 좋아요"],
              ["💬 댓글", "댓글 버튼 탭하면 바로 아래에 펼쳐짐 (팝업 아님). 거기서 바로 작성 가능"],
              ["📖 글 펼치기", "글 본문을 탭·클릭하면 전체 내용이 펼쳐짐"],
              ["✏️ 글쓰기", "로그인 후 종목토론 참여 가능. 투자클럽은 계좌 인증 후 개설"],
            ] : [
              ["🔴 NEW Badge", "Topics with recent posts. See the latest discussion instantly."],
              ["💼 Verified Holder", "Post by someone who actually owns that stock."],
              ["👍 Likes", "Like posts you agree with."],
              ["💬 Comments", "Tap the comment button and replies expand inline (not a popup). Write directly there."],
              ["📖 Expand Post", "Tap/click the post body to expand the full content."],
              ["✏️ Write", "Sign in to join Stock Talk. Invest Club requires account verification to open a channel."],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
            <p className="text-[11px]" style={{ color: "var(--mint)" }}>
              {isKo ? "💡 투자클럽 개설 방법" : "💡 How to Open an Invest Club"}
            </p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "회원가입 → 투자클럽 신청 → 계좌 인증 승인 후 콘텐츠 작성 가능. 모든 콘텐츠 무료 공개, 광고 수익 정산."
                : "Sign up → Apply for Invest Club → Write content after account verification is approved. All content is publicly free; ad revenue is shared."}
            </p>
          </div>
        </>
      ),
    },
    {
      id: "report",
      emoji: "📄",
      title: isKo ? "리포트 — CIO 분석 보고서" : "Reports — CIO Investment Analysis",
      content: (
        <>
          <p className="pt-3">
            {isKo
              ? <>SUNRYU Partners CIO <b style={{ color: "var(--text)" }}>류현우</b>가 직접 작성한 투자 분석 리포트예요.</>
              : <>Investment analysis reports written by SUNRYU Partners CIO <b style={{ color: "var(--text)" }}>Hyunwoo Ryu</b>.</>}
          </p>
          <div className="space-y-2 mt-2">
            {(isKo ? [
              ["📊 종목 분석", "특정 주식의 실적·밸류에이션·리스크 분석"],
              ["🌍 시장 분석", "미국 증시 전체 흐름, 거시경제 분석"],
              ["📅 업데이트", "정기적으로 새 리포트 업로드. 알림 설정으로 새 리포트 즉시 알림 가능"],
            ] : [
              ["📊 Stock Analysis", "Earnings, valuation, and risk analysis for specific stocks."],
              ["🌍 Market Analysis", "Macro and US equity market trend analysis."],
              ["📅 Updates", "New reports uploaded regularly. Set up notifications to receive alerts instantly."],
            ]).map(([t, d]) => (
              <div key={t} className="flex gap-2">
                <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
                <span className="text-[11px]">{d}</span>
              </div>
            ))}
          </div>
          <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <p className="text-[11px]" style={{ color: "#fbbf24" }}>{isKo ? "⚠️ 투자 유의사항" : "⚠️ Investment Disclaimer"}</p>
            <p className="text-[11px] mt-0.5">
              {isKo
                ? "모든 리포트는 투자 참고용이며, 투자 결정의 최종 책임은 본인에게 있어요."
                : "All reports are for reference only. You are solely responsible for your investment decisions."}
            </p>
          </div>
        </>
      ),
    },
  ];
}

export default function GuidePage() {
  const locale = useLocaleCode();
  const isKo   = locale === "ko";
  const SECTIONS = buildSections(isKo);

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <div className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 pt-4">
        {/* Back */}
        <div className="mb-4">
          <Link href="/more" className="flex items-center gap-1 text-sm" style={{ color: "var(--muted)", textDecoration: "none" }}>
            <ChevronRight className="w-4 h-4 rotate-180" />
            {isKo ? "더보기" : "More"}
          </Link>
        </div>

        {/* Header */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--mint)" }}>INVESTUS</p>
          <h1 className="text-2xl font-bold mt-1" style={{ color: "var(--text)" }}>
            {isKo ? "Investus 사용법" : "How to Use Investus"}
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>
            {isKo
              ? "미국 주식 완전 초보도 이해할 수 있게 각 기능을 설명해드려요. 궁금한 항목을 눌러보세요."
              : "Each feature explained so clearly even a complete beginner can understand. Tap any topic to learn more."}
          </p>
        </div>

        {/* Help button banner */}
        <div className="mb-5 rounded-2xl border px-4 py-3.5 flex items-start gap-3"
          style={{ background: "rgba(0,229,160,0.06)", borderColor: "rgba(0,229,160,0.2)" }}>
          <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--border)" }}>
            <HelpCircle className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </div>
          <div>
            <p className="text-[13px] font-bold" style={{ color: "var(--text)" }}>
              {isKo ? (
                <>
                  실시간으로 궁금하다면 제목 옆{" "}
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full align-middle mx-0.5"
                    style={{ background: "var(--border)" }}>
                    <HelpCircle className="w-2.5 h-2.5" style={{ color: "var(--muted)" }} />
                  </span>
                  를 탭해보세요!
                </>
              ) : (
                <>
                  Tap the{" "}
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full align-middle mx-0.5"
                    style={{ background: "var(--border)" }}>
                    <HelpCircle className="w-2.5 h-2.5" style={{ color: "var(--muted)" }} />
                  </span>
                  {" "}icon next to any section title for an in-context explanation!
                </>
              )}
            </p>
            <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
              {isKo
                ? "홈·검색·인사이트 탭의 각 섹션 제목 옆 아이콘을 누르면 해당 기능의 설명을 바로 확인할 수 있어요. 앱을 보면서 그 자리에서 바로 탭하면 돼요."
                : "Tap the icon next to section titles in the Home, Search, and Insight tabs to see explanations right where you are — no need to leave the screen."}
            </p>
          </div>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-2 mb-5">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1 text-[11px] font-semibold border"
              style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--muted)", textDecoration: "none" }}
            >
              {s.emoji} {s.title.split("—")[0].trim()}
            </a>
          ))}
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-3">
          {SECTIONS.map((s) => (
            <div key={s.id} id={s.id}>
              <Accordion section={s} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 rounded-2xl p-4 text-center border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>
            {isKo ? "더 궁금한 점이 있으신가요?" : "Still have questions?"}
          </p>
          <p className="text-[12px] mt-1" style={{ color: "var(--muted)" }}>
            {isKo ? "피드백을 보내주시면 빠르게 답변드릴게요" : "Send us feedback and we'll get back to you quickly"}
          </p>
          <Link href="/more/faq"
            className="inline-flex items-center gap-1 mt-3 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}>
            {isKo ? "FAQ 보기" : "View FAQ"} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
