"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocaleCode } from "@/contexts/LocaleContext";

type NoticeType = "notice" | "legal";

const TYPE_CONFIG_KO: Record<NoticeType, { label: string; color: string; bg: string }> = {
  notice: { label: "공지",    color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  legal:  { label: "법적 고지", color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
};
const TYPE_CONFIG_EN: Record<NoticeType, { label: string; color: string; bg: string }> = {
  notice: { label: "Notice", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  legal:  { label: "Legal",  color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
};

const NOTICES_KO: { id: string; type: NoticeType; date: string; title: string; body: string }[] = [
  {
    id: "n010",
    type: "legal",
    date: "2026-05-22",
    title: "애널들은 채널 운영 및 익명성 한계 고지",
    body: `애널들은 채널은 인증 애널리스트의 익명 소통 공간입니다. 운영 방식과 법적 한계를 안내드립니다.

■ 익명성 보호 구조
- 게시글·댓글에는 닉네임만 기록되며, 이메일·계정정보·실명은 저장되지 않습니다.
- 제출 이미지(명함·신분증)는 AI 판독 즉시 폐기되며 서버에 보관되지 않습니다.
- 닉네임은 복호화 불가능한 단방향 암호화(HMAC-SHA256)로 생성됩니다.
- 운영자를 포함한 누구도 닉네임과 실제 신원을 연결할 수 없습니다.

■ 법적 요청 대응 한계
연결 가능한 신원 정보 자체가 존재하지 않아, 법원 명령·수사기관 협조 요청이 있어도 신원 정보 제공이 구조적으로 불가능합니다. 단, 게시 시각·IP 로그는 Vercel(서버 인프라)이 별도 보관할 수 있으며, 이는 Investus의 통제 범위 밖입니다.

■ MNPI 및 자본시장법 준수 의무
미공개 중요정보(MNPI)를 이용한 매매 또는 타인에 대한 전달 행위는 자본시장법 제174조에 따라 형사처벌 대상입니다. 익명성이 보장된다는 이유로 MNPI를 공유하는 행위는 법적 책임을 면제받지 않습니다.

■ 서비스 책임 한계
Investus는 해당 채널에 게시된 내용의 정확성·신뢰성을 보장하지 않으며, 해당 내용을 근거로 한 투자 손실에 대해 법적 책임을 지지 않습니다.`,
  },
  {
    id: "n009",
    type: "legal",
    date: "2026-05-22",
    title: "특집 리포트 출처 및 이용 한계 고지",
    body: `Investus가 제공하는 특집 리포트의 성격과 한계를 안내합니다.

■ 출처 및 작성 방식
- 특집 리포트는 SEC 공시, 기업 IR 자료, 공개 뉴스 등 공개 정보를 바탕으로 AI 보조 분석을 통해 작성됩니다.
- 비공개 내부 정보나 미공개 자료를 사용하지 않습니다.

■ 투자 권유 해당 없음
리포트 내 분석·전망·수치는 참고용 정보이며, 특정 종목의 매수·매도를 권유하지 않습니다.

■ 비상장 기업 관련 주의
SpaceX 등 비상장 기업 관련 리포트는 일반 투자자가 직접 투자할 수 없는 대상을 다룰 수 있습니다.

■ 저작권
리포트 내 차트·SVG 이미지는 Investus 자체 제작물로, 출처 표기 없이 무단 복제·재배포를 금합니다.`,
  },
  {
    id: "n007",
    type: "notice",
    date: "2026-05-16",
    title: "서비스 개선 안내 — 지속 업데이트 중",
    body: `안녕하세요, Investus팀입니다.

현재 서비스를 지속적으로 개선하고 있습니다.

■ 현재 상황
- 일부 데이터나 UI가 잠시 맞지 않을 수 있습니다.
- 이상한 부분이 있으면 화면을 당겨서 새로고침해 주세요.

■ 곧 출시 예정
- 종목 알림 기능 (상승/하락 가격 알림)
- 포트폴리오 수익률 계산기
- 크리에이터 마켓 정식 오픈

문의: sunryupatners@gmail.com`,
  },
  {
    id: "n005",
    type: "legal",
    date: "2026-05-14",
    title: "투자 정보 제공 서비스 법적 고지 (필독)",
    body: `Investus는 자본시장법에 따른 금융투자업 인가를 받지 않은 순수 정보 제공 서비스입니다.

■ 제공 서비스 성격
- 미국 주식 시장 데이터(시세, 지수, 차트 등) 열람 서비스
- SEC 공시 기반 투자 대가 포트폴리오 참고 정보
- 시장 심리 지표(공포&탐욕 지수, 버핏 지수) 안내
- 투자 관련 뉴스·리포트 정보 제공

■ 투자 권유 해당 없음
본 서비스의 어떠한 내용도 특정 금융투자상품의 매수·매도를 권유하지 않습니다.

■ 손실 가능성 및 책임 한계
미국주식을 포함한 모든 금융투자상품은 원금 손실이 발생할 수 있습니다. Investus 정보를 참고하여 발생한 투자 손실에 대해 어떠한 법적 책임도 부담하지 않습니다.

■ 저작권 및 데이터 출처
제공 데이터는 Yahoo Finance, Finnhub, CNN Business, FRED 등 외부 API를 통해 수집됩니다. 무단 크롤링·상업적 재배포를 금합니다.`,
  },
  {
    id: "n001",
    type: "notice",
    date: "2026-05-01",
    title: "Investus 서비스 오픈",
    body: `Investus가 공식 오픈했습니다!

■ 주요 기능
- 미국 주요 지수 실시간 조회 (S&P500, 나스닥, 다우존스)
- 관심종목 등록 및 실시간 시세 확인
- 공포&탐욕 지수, 버핏 지수 제공
- 선물·원자재·외환·암호화폐 히트맵
- 투자 대가 13F 포트폴리오 공시 확인
- 종목별 10년 차트 조회

■ 향후 계획
- 종목 알림 기능
- 관심종목 클라우드 동기화
- 포트폴리오 수익률 계산기

이용해 주셔서 감사합니다.
SUNRYU Partners CIO`,
  },
];

const NOTICES_EN: { id: string; type: NoticeType; date: string; title: string; body: string }[] = [
  {
    id: "n010",
    type: "legal",
    date: "2026-05-22",
    title: "Analyst Channel Operation & Anonymity Limitations",
    body: `The Analyst Channel is an anonymous communication space for verified analysts. Please read the following regarding how it operates and its legal limitations.

■ Anonymity Structure
- Only nicknames are recorded on posts and comments. Email, account info, and real names are not stored.
- Submitted images (business cards, IDs) are destroyed immediately after AI verification — not retained on servers.
- Nicknames are generated using one-way encryption (HMAC-SHA256) that cannot be reversed.
- No one, including the operator, can link a nickname to a real identity.

■ Limits on Responding to Legal Requests
Because no identifiable information exists, it is structurally impossible to provide identity information even in response to court orders or law enforcement requests. However, post timestamps and IP logs may be separately retained by Vercel (the server infrastructure), which is outside Investus's control.

■ MNPI and Market Law Compliance
Trading on or sharing Material Non-Public Information (MNPI) is a criminal offense. The existence of anonymity does not exempt anyone from legal liability for sharing MNPI.

■ Service Liability Limitation
Investus does not guarantee the accuracy or reliability of content posted in this channel and assumes no legal liability for investment losses based on such content.`,
  },
  {
    id: "n009",
    type: "legal",
    date: "2026-05-22",
    title: "Special Report — Source & Limitation Notice",
    body: `Please read the following regarding the nature and limitations of Investus special reports.

■ Sources & Methodology
- Special reports are written using publicly available information (SEC filings, company IR materials, public news) with AI-assisted analysis.
- No non-public or insider information is used.

■ Not Investment Advice
Analysis, forecasts, and figures in reports are for reference only and do not constitute a recommendation to buy or sell any security.

■ Private Companies Notice
Reports on private companies (e.g., SpaceX) may cover securities that retail investors cannot directly invest in.

■ Copyright
Charts and SVG images in reports are original Investus content. Unauthorized reproduction or redistribution without attribution is prohibited.`,
  },
  {
    id: "n007",
    type: "notice",
    date: "2026-05-16",
    title: "Service Improvement — Ongoing Updates",
    body: `Hello from the Investus team.

We are continuously improving the service.

■ Current Status
- Some data or UI elements may occasionally be out of sync.
- If anything looks off, try pull-to-refresh.

■ Coming Soon
- Price alert notifications (up/down alerts per stock)
- Portfolio return calculator
- Invest Club marketplace official launch

Contact: sunryupatners@gmail.com`,
  },
  {
    id: "n005",
    type: "legal",
    date: "2026-05-14",
    title: "Legal Notice — Investment Information Service",
    body: `Investus is a pure information service and is not registered as an investment dealer, broker, or advisor.

■ Nature of Service
- US stock market data viewing (prices, indices, charts, etc.)
- SEC 13F filing-based guru portfolio reference information
- Market sentiment indicators (Fear & Greed Index, Buffett Indicator)
- Investment-related news and reports

■ Not Investment Advice
Nothing in this service constitutes a recommendation to buy or sell any financial product.

■ Risk & Liability
All financial products including US stocks carry the risk of principal loss. Investus assumes no legal liability for investment losses resulting from reliance on its information.

■ Data Sources & Copyright
Data is sourced from external APIs including Yahoo Finance, Finnhub, CNN Business, and FRED. Unauthorized scraping or commercial redistribution is prohibited.`,
  },
  {
    id: "n001",
    type: "notice",
    date: "2026-05-01",
    title: "Investus Official Launch",
    body: `Investus has officially launched!

■ Key Features
- Real-time US index tracking (S&P500, Nasdaq, Dow Jones)
- Watchlist with live prices
- Fear & Greed Index & Buffett Indicator
- Futures, commodities, forex, and crypto heatmap
- SEC 13F guru portfolio disclosure viewer
- 10-year stock charts

■ Coming Soon
- Price alert notifications
- Watchlist cloud sync
- Portfolio return calculator

Thank you for using Investus.
SUNRYU Partners CIO`,
  },
];

function NoticeItem({
  notice,
  typeConfig,
}: {
  notice: { id: string; type: NoticeType; date: string; title: string; body: string };
  typeConfig: Record<NoticeType, { label: string; color: string; bg: string }>;
}) {
  const [open, setOpen] = useState(notice.id === "n007");
  const cfg = typeConfig[notice.type];
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
      <button
        className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left active:opacity-70 transition-opacity"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              {cfg.label}
            </span>
            <span className="text-[10px] font-mono-num" style={{ color: "var(--muted)" }}>{notice.date}</span>
          </div>
          <p className="text-sm font-medium leading-snug" style={{ color: "var(--text)" }}>{notice.title}</p>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 mt-1 transition-transform duration-200"
          style={{ color: "var(--muted)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <div
            className="rounded-xl p-3 text-xs leading-relaxed whitespace-pre-line"
            style={{ background: "var(--bg)", color: "var(--muted)" }}
          >
            {notice.body}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NoticesPage() {
  const router = useRouter();
  const locale = useLocaleCode();
  const isKo   = locale === "ko";
  const NOTICES     = isKo ? NOTICES_KO : NOTICES_EN;
  const TYPE_CONFIG = isKo ? TYPE_CONFIG_KO : TYPE_CONFIG_EN;

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
            {isKo ? "공지사항" : "Notices"}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
            {isKo ? "법적 고지 · 서비스 안내" : "Legal notices · Service announcements"}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {NOTICES.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} typeConfig={TYPE_CONFIG} />
          ))}
        </div>

        <p className="text-center text-[10px] mt-6" style={{ color: "var(--muted)" }}>
          Investus · investus.kr
        </p>
      </main>
    </div>
  );
}
