"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";

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

const SECTIONS: Section[] = [
  {
    id: "home",
    emoji: "🏠",
    title: "홈 화면 — 전체 구성 이해하기",
    content: (
      <>
        <p className="pt-3">홈 화면은 <b style={{ color: "var(--text)" }}>미국 주식 시장의 현재 상태</b>를 한눈에 볼 수 있게 구성되어 있어요.</p>
        <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <div className="px-3 py-2 text-[11px] font-bold" style={{ background: "rgba(0,229,160,0.08)", color: "var(--mint)" }}>
            📌 화면 위에서 아래 순서
          </div>
          <div className="px-3 py-2 space-y-2">
            {[
              ["① 실시간 티커", "화면 상단에 주요 종목 실시간 등락률이 흘러가요"],
              ["② 내 보유종목", "직접 추가한 종목의 수익률을 한눈에 확인"],
              ["③ Investus 추천주식", "SUNRYU Partners CIO가 선별한 투자 추천 종목"],
              ["④ 인기 종목", "주요 미국 대형주 실시간 시세 (AAPL·NVDA·TSLA 등)"],
              ["⑤ 주요 지수", "S&P 500, NASDAQ, DOW, Russell 2000, 원달러 환율"],
              ["⑥ FUTURES MAP", "선물 시장 — 내일 증시를 미리 가늠하는 지표"],
              ["⑦ S&P 500 히트맵", "500개 종목을 색깔로 한눈에 보는 시장 지도"],
            ].map(([t, d]) => (
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
    title: "주요 지수 — S&P 500, NASDAQ이 뭔가요?",
    content: (
      <>
        <p className="pt-3">주식 시장 전체 흐름을 나타내는 <b style={{ color: "var(--text)" }}>대표 지표</b>예요. 한국의 코스피처럼요.</p>
        <div className="flex gap-2 mt-1">
          <MockCard label="S&P 500" value="5,308" pct="+0.44%" positive={true} />
          <MockCard label="NASDAQ" value="16,742" pct="-0.29%" positive={false} />
          <MockCard label="DOW" value="39,512" pct="+0.34%" positive={true} />
        </div>
        <div className="space-y-2 mt-2">
          {[
            ["📈 S&P 500", "미국 대형주 500개 평균. 미국 경제의 바로미터. 가장 많이 참고함"],
            ["💻 NASDAQ", "기술주 중심 지수. 애플·엔비디아·메타·구글 등 대형 기술주 포함"],
            ["🏭 DOW (다우)", "미국 전통 대기업 30개 평균. 가장 오래된 지수"],
            ["📦 Russell 2000", "미국 중소형주 2000개. 경기 방향을 먼저 반영하는 선행 지표"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg px-3 py-2 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <p className="font-bold text-[12px]" style={{ color: "var(--text)" }}>{t}</p>
              <p className="text-[11px] mt-0.5">{d}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
          <p className="text-[11px]" style={{ color: "var(--mint)" }}>💡 초보자 팁</p>
          <p className="text-[11px] mt-0.5">S&P 500이 오르면 미국 경제가 좋다는 신호, 내리면 불안하다는 신호예요. 개별 종목보다 먼저 이걸 보세요.</p>
        </div>
      </>
    ),
  },
  {
    id: "futures",
    emoji: "🗺️",
    title: "FUTURES MAP — 선물 시장이 왜 중요한가요?",
    content: (
      <>
        <p className="pt-3">선물(Futures)은 <b style={{ color: "var(--text)" }}>미래의 가격을 미리 사고파는 계약</b>이에요. 주식 시장이 열리기 전에도 거래되기 때문에 <b style={{ color: "var(--text)" }}>내일 시장 방향을 미리 볼 수 있어요.</b></p>
        <div className="flex gap-1.5 mt-2" style={{ height: 64 }}>
          <MockHeatTile label="닛케이" pct="-0.52%" positive={false} size={2} />
          <MockHeatTile label="WTI" pct="-4.4%" positive={false} size={2} />
          <MockHeatTile label="금" pct="+0.8%" positive={true} size={2} />
          <MockHeatTile label="BTC" pct="+1.2%" positive={true} size={1.5} />
        </div>
        <div className="space-y-2 mt-2">
          {[
            ["🌍 해외 지수", "닛케이·DAX·FTSE·항셍 — 글로벌 증시 분위기. 아시아가 빠지면 미국도 영향 받아요"],
            ["🛢️ WTI 원유", "오르면 인플레이션 우려 → 연준 금리 유지 가능성 ↑ → 주식엔 부담"],
            ["🥇 금(Gold)", "오르면 투자자들이 안전자산을 선호 → 불안 심리 신호"],
            ["💵 미국채 10년", "금리가 오르면 주식 밸류에이션 부담 증가. 주식과 반대로 움직이는 경향"],
            ["₿ 비트코인", "위험자산 선호도 지표. 오르면 공격적 투자 심리 우세"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2">
              <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
              <span className="text-[11px]">{d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
          <p className="text-[11px]" style={{ color: "var(--mint)" }}>💡 활용법</p>
          <p className="text-[11px] mt-0.5">아침에 일어나서 FUTURES MAP이 빨갛다면 → 오늘 미국 장 하락 가능성. 초록이면 상승 가능성. 단, 하루 중 언제든 바뀔 수 있어요.</p>
        </div>
      </>
    ),
  },
  {
    id: "heatmap",
    emoji: "🔥",
    title: "S&P 500 히트맵 — 색깔이 뭘 의미하나요?",
    content: (
      <>
        <p className="pt-3">S&P 500의 <b style={{ color: "var(--text)" }}>500개 종목을 한 화면</b>에 모아 색깔로 보여줘요.</p>
        <div className="flex gap-1.5 mt-2" style={{ height: 80 }}>
          <MockHeatTile label="AAPL" pct="+1.2%" positive={true} size={3} />
          <MockHeatTile label="NVDA" pct="+2.4%" positive={true} size={3} />
          <MockHeatTile label="MSFT" pct="-0.8%" positive={false} size={2} />
          <MockHeatTile label="TSLA" pct="-2.1%" positive={false} size={2} />
        </div>
        <div className="space-y-2 mt-2">
          {[
            ["🟩 초록색", "오늘 오른 종목. 짙을수록 더 많이 오른 것"],
            ["🟥 빨간색", "오늘 내린 종목. 짙을수록 더 많이 내린 것"],
            ["📐 타일 크기", "클수록 시가총액이 큰 기업 (애플·엔비디아·마이크로소프트 등)"],
            ["🏢 섹터 구분", "기술·헬스케어·금융·소비재 등 업종별로 묶여 있어요"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2">
              <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
              <span className="text-[11px]">{d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
          <p className="text-[11px]" style={{ color: "var(--mint)" }}>💡 활용법</p>
          <p className="text-[11px] mt-0.5">종목을 클릭하면 10년 차트가 바로 뜨고, 종목 페이지로 이동할 수 있어요. 섹터 전체가 빨간지, 특정 종목만 내리는지 확인해보세요.</p>
        </div>
      </>
    ),
  },
  {
    id: "feargreed",
    emoji: "😱",
    title: "공포 & 탐욕 지수 — 시장 심리 읽기",
    content: (
      <>
        <p className="pt-3">지금 투자자들이 <b style={{ color: "var(--text)" }}>얼마나 두려워하거나, 욕심내는지</b>를 0~100으로 표현해요.</p>
        <div className="flex gap-1 mt-2">
          {[
            { label: "극단적\n공포", range: "0~25", color: "#10b981" },
            { label: "공포", range: "26~44", color: "#7ed957" },
            { label: "중립", range: "45~55", color: "#ffd166" },
            { label: "탐욕", range: "56~74", color: "#ff8c55" },
            { label: "극단적\n탐욕", range: "75~100", color: "#ef4444" },
          ].map((z) => (
            <div key={z.label} className="flex-1 rounded-lg p-1.5 text-center" style={{ background: `${z.color}20`, border: `1px solid ${z.color}40` }}>
              <p className="text-[9px] font-bold whitespace-pre-line" style={{ color: z.color }}>{z.label}</p>
              <p className="text-[8px] mt-0.5" style={{ color: "var(--muted)" }}>{z.range}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2 mt-3">
          {[
            ["😱 극단적 공포 (0~25)", "투자자들이 패닉 상태. 역사적으로 주식을 싸게 살 수 있는 기회였어요"],
            ["😟 공포 (26~44)", "불안 심리 우세. 시장이 과도하게 하락했을 가능성"],
            ["😐 중립 (45~55)", "균형 상태. 방향성 불명확"],
            ["🤑 극단적 탐욕 (75~100)", "과열 구간. 버핏은 이 구간에서 현금 비중을 늘려요"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2">
              <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
              <span className="text-[11px]">{d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-2 italic" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <p className="text-[11px]" style={{ color: "#fbbf24" }}>"남들이 탐욕스러울 때 공포를 느끼고, 남들이 공포스러울 때 탐욕스러워라"</p>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>— 워런 버핏</p>
        </div>
      </>
    ),
  },
  {
    id: "buffett",
    emoji: "🏦",
    title: "버핏 지수 — 시장이 과열됐나요?",
    content: (
      <>
        <p className="pt-3">워런 버핏이 즐겨 쓰는 밸류에이션 지표예요. <b style={{ color: "var(--text)" }}>미국 전체 주식 시가총액 ÷ GDP</b>로 계산해요.</p>
        <div className="flex gap-2 mt-2">
          {[
            { label: "적정", range: "~100%", color: "#10b981", desc: "매수 고려" },
            { label: "고평가", range: "~150%", color: "#ffd166", desc: "신중하게" },
            { label: "극단 고평가", range: "150%+", color: "#ef4444", desc: "버핏 현금↑" },
          ].map((z) => (
            <div key={z.label} className="flex-1 rounded-lg p-2" style={{ background: `${z.color}15`, border: `1px solid ${z.color}40` }}>
              <p className="text-[10px] font-bold" style={{ color: z.color }}>{z.label}</p>
              <p className="text-[11px] font-mono-num font-bold mt-0.5" style={{ color: "var(--text)" }}>{z.range}</p>
              <p className="text-[9px] mt-0.5" style={{ color: "var(--muted)" }}>{z.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-3" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
          <p className="text-[11px]" style={{ color: "var(--mint)" }}>💡 현재 지수가 높다면?</p>
          <p className="text-[11px] mt-0.5">단기 예측 도구가 아니에요. 장기적으로 시장이 비싼지 싼지 판단하는 참고 지표예요. 버핏도 이 지수가 높을 때 현금을 쌓아두고 기다렸어요.</p>
        </div>
      </>
    ),
  },
  {
    id: "search",
    emoji: "🔍",
    title: "검색 탭 — 종목 찾기 & CIO 추천",
    content: (
      <>
        <p className="pt-3">원하는 종목을 검색하거나, <b style={{ color: "var(--text)" }}>CIO가 추천한 종목</b>을 확인할 수 있어요.</p>
        <div className="space-y-2 mt-2">
          {[
            ["🔍 종목 검색", "티커(AAPL, NVDA 등) 또는 회사명으로 검색. 검색 결과 클릭 → 상세 페이지로 이동"],
            ["⭐ Investus 추천주식", "SUNRYU Partners CIO가 선별한 핵심 투자 종목. 상단에 별 아이콘으로 표시"],
            ["🔥 인기 종목", "주요 미국 대형주 실시간 시세"],
            ["📋 13F 투자대가", "화면 오른쪽에서 워런 버핏, 론 배런 등의 포트폴리오 확인"],
          ].map(([t, d]) => (
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
    title: "13F 공시 — 투자 고수들의 포트폴리오",
    content: (
      <>
        <p className="pt-3">미국에서 자산 <b style={{ color: "var(--text)" }}>$1억 이상</b>을 운용하는 기관은 분기마다 어떤 주식을 샀는지 SEC에 공개 보고해야 해요. 이게 <b style={{ color: "var(--text)" }}>13F 공시</b>예요.</p>
        <div className="space-y-3 mt-2">
          {[
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
          ].map((g) => (
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
          <p className="text-[11px]" style={{ color: "var(--mint)" }}>⚠️ 주의사항</p>
          <p className="text-[11px] mt-0.5">분기 종료 후 45일 이내 공시 → 실제 매수 시점보다 최대 3개월 늦어요. 지금 보이는 포지션이 이미 팔렸을 수도 있어요. 참고용으로 활용하세요.</p>
        </div>
      </>
    ),
  },
  {
    id: "stock",
    emoji: "📈",
    title: "종목 상세 — 차트와 지표 보는 법",
    content: (
      <>
        <p className="pt-3">종목 클릭 시 나오는 <b style={{ color: "var(--text)" }}>상세 페이지</b>예요.</p>
        <div className="space-y-2 mt-2">
          {[
            ["📊 차트", "1일·1주·1개월·3개월·1년·5년·10년 기간별로 볼 수 있어요"],
            ["💰 현재가", "달러 기준 실시간 가격 (장 마감 후엔 종가)"],
            ["📉 등락률", "오늘 전일 대비 얼마나 올랐는지/내렸는지"],
            ["📦 시가총액", "Market Cap. 기업 전체 가치. 대형주 기준 $1T(1조달러) 이상"],
            ["📰 뉴스 & 리포트", "해당 종목의 최신 관련 뉴스 및 Investus 분석 리포트"],
          ].map(([t, d]) => (
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
    title: "자산 탭 — 포트폴리오 & AI 투자비서",
    content: (
      <>
        <p className="pt-3">내가 투자한 종목의 <b style={{ color: "var(--text)" }}>총 수익률을 자동으로 계산</b>하고, <b style={{ color: "var(--text)" }}>AI 투자비서</b>가 분석해줘요.</p>
        <div className="space-y-2 mt-2">
          {[
            ["➕ 종목 추가", "종목명 + 평균 매수가 + 수량 입력"],
            ["📊 총 수익률", "현재가 기준 전체 포트폴리오 손익 자동 계산"],
            ["📈 개별 수익률", "종목별 수익률 개별 확인 가능"],
            ["🔄 실시간 업데이트", "시장이 열려 있는 동안 자동으로 가격 업데이트"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2">
              <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
              <span className="text-[11px]">{d}</span>
            </div>
          ))}
        </div>

        {/* AI 비서 */}
        <div className="rounded-xl p-3 mt-3 border" style={{ background: "rgba(0,229,160,0.04)", borderColor: "rgba(0,229,160,0.2)" }}>
          <p className="text-[12px] font-bold mb-2" style={{ color: "var(--mint)" }}>✦ 나만의 AI 투자비서 (Claude)</p>
          <div className="space-y-1.5">
            {[
              ["내 포트 분석", "종목별 등락 이유, 수익률 요약, 비중 편향 여부 자동 분석"],
              ["자유 질문", "\"오늘 왜 떨어졌어?\", \"리밸런싱 해야 할까?\" 등 자유롭게 질문"],
              ["빠른 질문 칩", "자주 묻는 질문을 버튼 한 번으로 바로 질문"],
              ["하루 10회", "무료 사용자는 하루 10회 이용 가능"],
            ].map(([t, d]) => (
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
    title: "피드 탭 — 종목토론·애널들은·투자클럽",
    content: (
      <>
        <p className="pt-3">피드 탭에는 <b style={{ color: "var(--text)" }}>3개의 채널</b>이 있어요.</p>
        <div className="space-y-2 mt-2">
          {[
            ["💬 종목토론", "종목별 투자자 토론방. 실제 보유 인증 투자자들의 생생한 의견"],
            ["👔 애널들은", "인증된 애널리스트만 참여하는 익명 채널. 현직 애널리스트의 솔직한 속마음"],
            ["🌟 투자클럽", "계좌 인증 투자자들의 무료 콘텐츠 채널. 강의·리포트·게시글 전부 무료"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg px-3 py-2 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
              <p className="font-bold text-[12px]" style={{ color: "var(--text)" }}>{t}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>{d}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1.5 mt-3">
          {[
            ["🔴 NEW 배지", "최근 새 글이 올라온 종목. 최신 토론 바로 확인"],
            ["💼 보유확인", "실제 해당 종목을 보유한 투자자 인증 글"],
            ["👍 좋아요", "공감하는 의견에 좋아요"],
            ["✏️ 글쓰기", "로그인 후 종목토론 참여 가능. 투자클럽은 계좌 인증 후 개설"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2">
              <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
              <span className="text-[11px]">{d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
          <p className="text-[11px]" style={{ color: "var(--mint)" }}>💡 투자클럽 개설 방법</p>
          <p className="text-[11px] mt-0.5">회원가입 → 투자클럽 신청 → 계좌 인증 승인 후 콘텐츠 작성 가능. 모든 콘텐츠 무료 공개, 광고 수익 정산.</p>
        </div>
      </>
    ),
  },
  {
    id: "report",
    emoji: "📄",
    title: "리포트 — CIO 분석 보고서",
    content: (
      <>
        <p className="pt-3">SUNRYU Partners CIO <b style={{ color: "var(--text)" }}>류현우</b>가 직접 작성한 투자 분석 리포트예요.</p>
        <div className="space-y-2 mt-2">
          {[
            ["📊 종목 분석", "특정 주식의 실적·밸류에이션·리스크 분석"],
            ["🌍 시장 분석", "미국 증시 전체 흐름, 거시경제 분석"],
            ["📅 업데이트", "정기적으로 새 리포트 업로드. 알림 설정으로 새 리포트 즉시 알림 가능"],
          ].map(([t, d]) => (
            <div key={t} className="flex gap-2">
              <span className="font-bold text-[12px] flex-shrink-0" style={{ color: "var(--text)" }}>{t}</span>
              <span className="text-[11px]">{d}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl px-3 py-2 mt-2" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <p className="text-[11px]" style={{ color: "#fbbf24" }}>⚠️ 투자 유의사항</p>
          <p className="text-[11px] mt-0.5">모든 리포트는 투자 참고용이며, 투자 결정의 최종 책임은 본인에게 있어요.</p>
        </div>
      </>
    ),
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <div className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 pt-4">
        {/* Back */}
        <div className="mb-4">
          <Link href="/more" className="flex items-center gap-1 text-sm" style={{ color: "var(--muted)", textDecoration: "none" }}>
            <ChevronRight className="w-4 h-4 rotate-180" />
            더보기
          </Link>
        </div>

        {/* Header */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "var(--mint)" }}>INVESTUS</p>
          <h1 className="text-2xl font-bold mt-1" style={{ color: "var(--text)" }}>Investus 사용법</h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--muted)" }}>
            미국 주식 완전 초보도 이해할 수 있게 각 기능을 설명해드려요. 궁금한 항목을 눌러보세요.
          </p>
        </div>

        {/* ? 버튼 안내 배너 */}
        <div className="mb-5 rounded-2xl border px-4 py-3.5 flex items-start gap-3"
          style={{ background: "rgba(0,229,160,0.06)", borderColor: "rgba(0,229,160,0.2)" }}>
          <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--border)" }}>
            <HelpCircle className="w-3.5 h-3.5" style={{ color: "var(--muted)" }} />
          </div>
          <div>
            <p className="text-[13px] font-bold" style={{ color: "var(--text)" }}>
              실시간으로 궁금하다면 제목 옆{" "}
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full align-middle mx-0.5"
                style={{ background: "var(--border)" }}>
                <HelpCircle className="w-2.5 h-2.5" style={{ color: "var(--muted)" }} />
              </span>
              를 탭해보세요!
            </p>
            <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>
              홈·검색·인사이트 탭의 각 섹션 제목 옆 아이콘을 누르면 해당 기능의 설명을 바로 확인할 수 있어요. 앱을 보면서 그 자리에서 바로 탭하면 돼요.
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
          <p className="text-sm font-bold" style={{ color: "var(--text)" }}>더 궁금한 점이 있으신가요?</p>
          <p className="text-[12px] mt-1" style={{ color: "var(--muted)" }}>피드백을 보내주시면 빠르게 답변드릴게요</p>
          <Link href="/more/faq"
            className="inline-flex items-center gap-1 mt-3 px-4 py-2 rounded-xl text-sm font-semibold"
            style={{ background: "var(--mint)", color: "#000", textDecoration: "none" }}>
            FAQ 보기 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
