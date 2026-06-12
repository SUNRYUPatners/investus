"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useLocaleCode } from "@/contexts/LocaleContext";

const WARNINGS_KO = [
  { emoji: "⚠️", title: "투자 원금 손실 위험", body: "미국주식 및 모든 금융 투자상품은 원금 손실이 발생할 수 있습니다. 투자 원금의 전부 또는 일부를 잃을 수 있으며, 특히 레버리지 상품이나 고변동성 종목의 경우 손실이 투자 원금을 초과할 수도 있습니다.", color: "#ef4444", bg: "rgba(255,77,109,0.08)" },
  { emoji: "📊", title: "정보 제공 목적 명시", body: "Investus가 제공하는 모든 정보(주가, 지수, 뉴스, 분석, 13F 포트폴리오 공시 등)는 투자 판단의 참고 자료로만 제공됩니다. 본 서비스의 어떠한 내용도 특정 종목의 매수·매도를 권유하거나 투자 수익을 보장하지 않습니다.", color: "#60a5fa", bg: "rgba(59,130,246,0.08)" },
  { emoji: "🔮", title: "과거 실적과 미래 성과", body: "제공되는 과거 수익률, 분석 데이터, 투자 대가의 포트폴리오 정보는 미래 수익을 보장하지 않습니다. 과거의 투자 성과가 미래에도 동일하게 반복되리라는 보장은 없습니다.", color: "#c084fc", bg: "rgba(168,85,247,0.08)" },
  { emoji: "🌐", title: "환율 및 해외 투자 위험", body: "미국주식 투자 시 달러-원 환율 변동에 따른 환차손이 발생할 수 있습니다. 또한 미국의 세제, 법령, 경제 상황 변화에 따른 추가적인 위험이 존재합니다.", color: "#fb923c", bg: "rgba(249,115,22,0.08)" },
  { emoji: "📰", title: "뉴스 및 외부 데이터", body: "서비스 내 뉴스, 시세, 재무 데이터는 외부 데이터 제공업체로부터 수집됩니다. 데이터의 정확성 및 최신성을 보장하지 않으며, 데이터 오류로 인해 발생한 손해에 대해 서비스는 책임을 지지 않습니다.", color: "#10b981", bg: "rgba(0,229,160,0.08)" },
  { emoji: "🏛️", title: "13F 공시 데이터 관련", body: "투자 대가의 포트폴리오 정보는 미국 SEC 13F 공시 및 의회 주식거래 공시(STOCK Act)에 기반합니다. 공시는 분기별로 이루어지므로 실제 현재 포트폴리오와 차이가 있을 수 있으며, 단순 모방 투자는 예상치 못한 손실을 초래할 수 있습니다.", color: "#facc15", bg: "rgba(234,179,8,0.08)" },
  { emoji: "👤", title: "투자 책임은 본인에게", body: "모든 투자 판단과 그에 따른 결과(이익 또는 손실)는 전적으로 투자자 본인에게 귀속됩니다. 서비스는 투자 결과에 대해 어떠한 법적·도의적 책임도 지지 않습니다.", color: "#e8eaed", bg: "rgba(255,255,255,0.05)" },
];

const WARNINGS_EN = [
  { emoji: "⚠️", title: "Risk of Investment Loss", body: "US stocks and all financial investment products carry the risk of principal loss. You may lose all or part of your investment, and in the case of leveraged products or high-volatility stocks, losses may exceed the initial investment.", color: "#ef4444", bg: "rgba(255,77,109,0.08)" },
  { emoji: "📊", title: "Information Purpose Only", body: "All information provided by Investus (prices, indices, news, analysis, 13F portfolio disclosures, etc.) is provided solely as reference material for investment decisions. Nothing in this Service constitutes a recommendation to buy or sell any security or guarantees investment returns.", color: "#60a5fa", bg: "rgba(59,130,246,0.08)" },
  { emoji: "🔮", title: "Past Performance & Future Results", body: "Past returns, analytical data, and guru portfolio information provided do not guarantee future returns. Past investment performance is not necessarily indicative of future results.", color: "#c084fc", bg: "rgba(168,85,247,0.08)" },
  { emoji: "🌐", title: "Currency & Foreign Investment Risk", body: "Investing in US stocks involves currency exchange risk from USD/KRW fluctuations. Additional risks exist from changes in US tax laws, regulations, and economic conditions.", color: "#fb923c", bg: "rgba(249,115,22,0.08)" },
  { emoji: "📰", title: "News & External Data", body: "News, prices, and financial data within the Service are sourced from third-party data providers. Accuracy and timeliness of data are not guaranteed, and the Service assumes no liability for damages resulting from data errors.", color: "#10b981", bg: "rgba(0,229,160,0.08)" },
  { emoji: "🏛️", title: "13F Disclosure Data", body: "Guru portfolio information is based on SEC 13F filings and Congressional stock trading disclosures (STOCK Act). Since filings are quarterly, actual current portfolios may differ. Simply copying portfolios may result in unexpected losses.", color: "#facc15", bg: "rgba(234,179,8,0.08)" },
  { emoji: "👤", title: "Investment Responsibility is Yours", body: "All investment decisions and their outcomes (profits or losses) are entirely the responsibility of the investor. The Service assumes no legal or moral responsibility for investment results.", color: "#e8eaed", bg: "rgba(255,255,255,0.05)" },
];

const ADVICE_KO = [
  "투자하기 전에 반드시 자신의 투자 목적, 재무 상황, 투자 성향을 점검하세요.",
  "이해하지 못하는 금융상품에는 투자하지 마세요.",
  "여유 자금 내에서 분산 투자하는 것을 권장합니다.",
  "전문 투자 상담이 필요한 경우 금융투자업 인가를 받은 금융회사에 문의하세요.",
  "금융감독원 금융소비자정보포털 파인(fine.fss.or.kr)을 통해 투자 정보를 확인하세요.",
];

const ADVICE_EN = [
  "Always assess your investment objectives, financial situation, and risk tolerance before investing.",
  "Do not invest in financial products you do not understand.",
  "We recommend diversifying within funds you can afford to lose.",
  "If you need professional investment advice, consult a licensed financial institution.",
  "Verify investment information through your local financial consumer protection authority.",
];

export default function DisclaimerPage() {
  const locale  = useLocaleCode();
  const isKo    = locale === "ko";
  const WARNINGS = isKo ? WARNINGS_KO : WARNINGS_EN;
  const ADVICE   = isKo ? ADVICE_KO   : ADVICE_EN;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 lg:pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "더보기" : "More"}
          </Link>
        </div>
        <h1 className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>
          {isKo ? "투자 유의사항" : "Investment Disclaimer"}
        </h1>
        <p className="text-[11px] mb-2" style={{ color: "var(--muted)" }}>
          {isKo
            ? "Investus는 투자 정보 제공 플랫폼으로, 투자 권유·자문 서비스가 아닙니다."
            : "Investus is an investment information platform. It is not an investment advisory service."}
        </p>

        {/* Main warning banner */}
        <div
          className="rounded-2xl p-4 mb-6 border"
          style={{ background: "rgba(255,77,109,0.06)", borderColor: "rgba(255,77,109,0.2)" }}
        >
          <p className="text-sm font-bold mb-1" style={{ color: "#ef4444" }}>⚠️ {isKo ? "중요 고지" : "Important Notice"}</p>
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--text)" }}>
            {isKo
              ? "본 앱은 미국 증권법 및 대한민국 자본시장법상 투자매매업·투자중개업·투자자문업 인가를 받지 않았습니다. 제공되는 모든 정보는 투자 참고 자료일 뿐이며, 투자 손실에 대해 일체의 법적 책임을 지지 않습니다."
              : "This app is not registered as an investment dealer, broker, or advisor under US securities law or Korean capital markets law. All information provided is for reference only. The Service assumes no legal liability for investment losses."}
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          {WARNINGS.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl p-4 border"
              style={{ background: w.bg, borderColor: `${w.color}30` }}
            >
              <p className="text-sm font-bold mb-1.5" style={{ color: w.color }}>
                {w.emoji} {w.title}
              </p>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>{w.body}</p>
            </div>
          ))}
        </div>

        {/* Practical advice */}
        <div
          className="rounded-2xl p-4 border mb-6"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-sm font-bold mb-3 font-syne" style={{ color: "var(--text)" }}>
            {isKo ? "현명한 투자를 위한 조언" : "Tips for Smart Investing"}
          </p>
          <div className="flex flex-col gap-2">
            {ADVICE.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[11px] font-bold mt-0.5 flex-shrink-0" style={{ color: "var(--mint)" }}>{i + 1}</span>
                <p className="text-[12px] leading-snug" style={{ color: "var(--muted)" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[10px]" style={{ color: "var(--muted)" }}>
          {isKo
            ? "본 유의사항은 2026년 5월 18일부터 적용됩니다.\nInvestus · 투자 책임은 본인에게 있습니다."
            : "This disclaimer applies from May 18, 2026.\nInvestus · All investment decisions are your own responsibility."}
        </p>
      </main>
    </div>
  );
}
