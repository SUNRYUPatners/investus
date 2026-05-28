"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocaleCode } from "@/contexts/LocaleContext";

const FAQS_KO = [
  {
    category: "서비스 기본",
    items: [
      { q: "Investus는 어떤 서비스인가요?", a: "Investus는 미국 주식 시장의 실시간 정보를 제공하는 투자 정보 플랫폼입니다. S&P500, 나스닥, 다우존스 지수와 개별 종목 시세, 공포&탐욕 지수, 버핏 지수, 선물·원자재 데이터 등을 한곳에서 확인할 수 있습니다. 투자 권유가 아닌 데이터 열람 목적의 서비스입니다." },
      { q: "무료로 이용할 수 있나요?", a: "네, 모든 기능이 완전 무료입니다. AI 질문, 리포트, 투자클럽 콘텐츠(강의·전자책·게시글)까지 전부 광고 기반으로 무료 제공됩니다." },
      { q: "회원가입 없이도 이용할 수 있나요?", a: "네, 주가 조회·지수 확인·관심종목·차트 등 대부분의 기능은 비로그인으로 이용 가능합니다. 종목토론 글쓰기, 피드백 발송, 투자클럽 개설 등 일부 기능은 로그인이 필요합니다." },
      { q: "미국 주식만 제공하나요?", a: "현재 미국 증시(NYSE·NASDAQ·AMEX 상장 종목) 중심으로 서비스하고 있습니다. 미국 지수 선물, 원자재(금·원유 등), 채권, 외환, 비트코인·이더리움 등 가상자산 데이터도 함께 제공합니다. 국내 주식(코스피·코스닥)은 현재 지원하지 않습니다." },
    ],
  },
  {
    category: "데이터 & 시세",
    items: [
      { q: "시세 데이터는 실시간인가요?", a: "주가·지수 데이터는 미국 거래소 규정에 따라 최대 15~20분 지연될 수 있습니다. 일부 데이터는 Yahoo Finance, Finnhub 등 외부 API를 통해 제공되며, 거래 시간(뉴욕시간 오전 9시 30분~오후 4시) 중 약 60초 주기로 갱신됩니다." },
      { q: "장 마감 후에도 데이터가 표시되나요?", a: "네. 장 마감 시점의 마지막 실제 데이터를 저장하여 개장 전까지 표시합니다. 빈 화면이나 임의의 가짜 데이터(Mock)는 절대 표시하지 않습니다." },
      { q: "데이터 출처는 어디인가요?", a: "Yahoo Finance, Finnhub, CNN Business(공포&탐욕 지수), FRED(연방준비은행 경제 데이터), TwelveData 등 공신력 있는 금융 데이터 제공사의 API를 활용합니다. SEC 공시 기반 투자 대가 13F 포트폴리오 데이터도 포함됩니다." },
      { q: "표시된 가격이 실제 체결 가격과 다를 수 있나요?", a: "네. 데이터 지연, API 오류, 네트워크 문제 등으로 실제 거래 가격과 차이가 발생할 수 있습니다. Investus의 시세 정보는 참고용으로만 활용해 주시고, 실제 매매 시에는 반드시 증권사 HTS·MTS 공식 시세를 확인하십시오." },
      { q: "다른 앱·증권사와 시세가 미세하게 다른 이유는 무엇인가요?", a: "완전히 정상적인 현상입니다. 크게 세 가지 이유가 있습니다.\n\n① 조회 시점 차이 — Investus는 서버에서 가져온 시세를 약 60초 단위로 갱신합니다. 내가 보는 순간과 다른 앱이 데이터를 가져온 순간이 다르면, 그 사이 주가가 움직여 수십 센트 차이가 생길 수 있습니다.\n\n② 데이터 전달 경로(latency) 차이 — Yahoo Finance, Bloomberg, 거래소 직접 피드 등 서비스마다 데이터를 받아오는 경로가 다르고, 각 경로마다 수십 ms~수초의 지연 차이가 있습니다.\n\n③ 호가·체결가 기준 차이 — 어떤 서비스는 최근 체결가(Last), 어떤 곳은 매수 호가(Bid) 또는 매도 호가(Ask)를 기준으로 표시합니다. 장중에는 이 세 가지가 1~10센트 이상 벌어질 수 있습니다.\n\n실제 매매 시에는 반드시 본인 증권사 앱의 공식 시세를 기준으로 주문하세요." },
    ],
  },
  {
    category: "투자 & 법적 사항",
    items: [
      { q: "Investus는 투자 권유를 하나요?", a: "아니오. Investus는 투자 정보 열람 서비스이며, 특정 종목의 매수·매도를 권유하거나 수익을 보장하지 않습니다. 제공되는 모든 정보(뉴스, 분석, 포트폴리오 공시 등)는 투자 판단의 참고 자료일 뿐입니다." },
      { q: "Investus는 금융투자업 인가를 받은 증권사인가요?", a: "아니오. Investus는 금융위원회에 등록된 금융투자업자(증권사·투자자문사 등)가 아닙니다. 금융 정보 제공 서비스로, 자본시장법상 투자 자문·일임 행위를 하지 않습니다." },
      { q: "투자로 손실이 발생하면 Investus에 책임을 물을 수 있나요?", a: "아닙니다. Investus가 제공하는 정보를 바탕으로 한 투자 결과(이익 또는 손실)에 대해 Investus는 어떠한 법적 책임도 지지 않습니다. 모든 투자 결정과 그에 따른 책임은 전적으로 투자자 본인에게 있습니다." },
      { q: "CIO 추천 종목을 따라 투자해도 되나요?", a: "추천 종목은 Investus CIO의 개인적 의견과 분석을 바탕으로 한 참고 정보입니다. 투자 권유가 아니며, 실제 포트폴리오 구성이나 매매 시점 결정은 본인의 판단과 책임 하에 이루어져야 합니다. 과거 수익률이 미래 수익을 보장하지 않습니다." },
    ],
  },
  {
    category: "기능 & 이용",
    items: [
      { q: "관심종목은 어떻게 저장되나요?", a: "관심종목은 로그인 계정에 연동되어 저장됩니다. 로그인 상태에서는 다른 기기에서 접속해도 동일한 관심종목 목록이 유지됩니다. 비로그인 이용 시에는 현재 기기에만 저장됩니다." },
      { q: "앱으로 다운로드해서 사용할 수 있나요?", a: "Investus는 PWA(Progressive Web App)로 제공됩니다. 앱스토어 설치 없이 Safari(iOS) 또는 Chrome(Android) 브라우저에서 '홈 화면에 추가'하면 앱처럼 전체화면으로 사용할 수 있습니다. 더보기 탭에서 '앱으로 설치' 버튼을 이용하세요." },
      { q: "개인정보는 어떻게 처리되나요?", a: "Investus는 이용자의 투자 성향, 포트폴리오, 개인 자산 정보를 수집하지 않습니다. 회원가입 시 최소한의 정보(이메일, 닉네임)만 수집하며, 광고·마케팅 목적으로 제3자에게 제공하지 않습니다. 자세한 내용은 개인정보처리방침을 참고해 주세요." },
      { q: "버그나 오류를 발견했을 때 어떻게 신고하나요?", a: "더보기 탭 → '피드백 보내기'를 통해 오류 신고, 기능 제안, 문의를 보내주세요. 로그인 후 이용 가능하며, sunryupatners@gmail.com으로 이메일을 보내셔도 됩니다." },
    ],
  },
];

const FAQS_EN = [
  {
    category: "Service Basics",
    items: [
      { q: "What is Investus?", a: "Investus is an investment information platform providing real-time US stock market data. You can track S&P500, Nasdaq, and Dow Jones indices, individual stock prices, the Fear & Greed Index, Buffett Indicator, futures, and commodities — all in one place. It is a data viewing service, not investment advice." },
      { q: "Is it free to use?", a: "Yes, all features are completely free. AI questions, reports, and Invest Club content (courses, e-books, posts) are all ad-supported and available at no charge." },
      { q: "Can I use it without registering?", a: "Yes. Most features — stock lookup, index tracking, watchlist, charts — are available without logging in. Some features (posting in stock discussions, sending feedback, creating an Invest Club) require an account." },
      { q: "Is it US stocks only?", a: "Currently the service focuses on US-listed stocks (NYSE, NASDAQ, AMEX). We also provide US index futures, commodities (gold, crude oil, etc.), bonds, forex, and crypto (Bitcoin, Ethereum) data. Korean domestic stocks (KOSPI, KOSDAQ) are not currently supported." },
    ],
  },
  {
    category: "Data & Prices",
    items: [
      { q: "Is price data real-time?", a: "Stock and index data may be delayed up to 15–20 minutes per US exchange regulations. Data from Yahoo Finance, Finnhub, and other APIs is refreshed approximately every 60 seconds during market hours (9:30 AM – 4:00 PM ET)." },
      { q: "Is data shown after market close?", a: "Yes. The last actual data from market close is saved and displayed until the next open. We never show blank screens or placeholder data." },
      { q: "Where does the data come from?", a: "We use reputable financial data providers: Yahoo Finance, Finnhub, CNN Business (Fear & Greed Index), FRED (Federal Reserve economic data), and TwelveData. SEC-based 13F guru portfolio disclosures are also included." },
      { q: "Can displayed prices differ from actual trade prices?", a: "Yes. Data delay, API errors, or network issues can cause differences from actual traded prices. Use Investus prices for reference only — always verify with your broker's official price before trading." },
      { q: "Why are prices slightly different from other apps or brokers?", a: "This is completely normal. Three main reasons:\n\n① Refresh timing — Investus refreshes prices about every 60 seconds from the server. Prices can move by several cents between your view and another app's last fetch.\n\n② Data pipeline latency — Yahoo Finance, Bloomberg, and direct exchange feeds all have different delivery latencies, from tens of milliseconds to several seconds.\n\n③ Bid/Ask vs Last price — Some services show the last trade price, others show the bid or ask. During market hours these can diverge by 1–10+ cents.\n\nAlways use your broker's official price for actual trade orders." },
    ],
  },
  {
    category: "Investment & Legal",
    items: [
      { q: "Does Investus recommend investments?", a: "No. Investus is an information viewing service. It does not recommend buying or selling any specific securities and does not guarantee returns. All information provided (news, analysis, portfolio disclosures, etc.) is for reference only." },
      { q: "Is Investus a licensed broker or investment advisor?", a: "No. Investus is not a registered broker, dealer, or investment advisor. It is an information service and does not provide investment advice or discretionary management." },
      { q: "Can I hold Investus responsible for investment losses?", a: "No. Investus assumes no legal liability for investment outcomes (profits or losses) resulting from use of its information. All investment decisions and their consequences are entirely the responsibility of the investor." },
      { q: "Can I follow CIO-recommended stocks?", a: "CIO picks are personal opinions and analysis for reference purposes — not investment advice. Portfolio construction and trade timing decisions must be made at your own judgment and risk. Past returns do not guarantee future performance." },
    ],
  },
  {
    category: "Features & Usage",
    items: [
      { q: "How is my watchlist saved?", a: "Your watchlist is tied to your account. When logged in, the same watchlist syncs across all your devices. When not logged in, it is stored on the current device only." },
      { q: "Can I install it as an app?", a: "Investus is a PWA (Progressive Web App). Without visiting an app store, you can add it to your home screen from Safari (iOS) or Chrome (Android) for a fullscreen app-like experience. Use the install button in the More tab." },
      { q: "How is my personal information handled?", a: "Investus does not collect your investment preferences, portfolio details, or personal financial data. Only minimal information (email, nickname) is collected at signup and is never shared with third parties for advertising or marketing. See the Privacy Policy for full details." },
      { q: "How do I report a bug or error?", a: "Use More → Send Feedback to report bugs, suggest features, or ask questions. This requires login. You can also email sunryupatners@gmail.com directly." },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
      <button
        className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left active:opacity-70 transition-opacity"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 font-mono-num" style={{ color: "var(--mint)" }}>Q</span>
          <p className="text-sm font-medium leading-snug" style={{ color: "var(--text)" }}>{q}</p>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div className="flex items-start gap-2.5 pl-0">
            <span className="text-[10px] font-bold mt-0.5 flex-shrink-0 font-mono-num" style={{ color: "#60a5fa" }}>A</span>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--muted)" }}>{a}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const router = useRouter();
  const locale = useLocaleCode();
  const isKo   = locale === "ko";
  const FAQS   = isKo ? FAQS_KO : FAQS_EN;

  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 lg:pb-10">
        <div className="pt-4 pb-2">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs mb-4"
            style={{ color: "var(--muted)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" /> {isKo ? "뒤로" : "Back"}
          </button>
          <h1 className="text-base font-bold font-syne" style={{ color: "var(--text)" }}>
            {isKo ? "자주 묻는 질문" : "FAQ"}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Frequently Asked Questions</p>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {FAQS.map((section) => (
            <div key={section.category}>
              <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 font-syne" style={{ color: "var(--muted)" }}>
                {section.category}
              </p>
              <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                {section.items.map((item) => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl p-4 border text-center" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold mb-1" style={{ color: "var(--text)" }}>
            {isKo ? "추가 문의" : "More Questions?"}
          </p>
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            {isKo ? "더보기 → 피드백 보내기 또는 " : "More → Send Feedback or "}
            <span style={{ color: "var(--mint)" }}>sunryupatners@gmail.com</span>
          </p>
        </div>
      </main>
    </div>
  );
}
