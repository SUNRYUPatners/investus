import type { Metadata } from "next";

// 주요 종목 한국어 이름 매핑
const STOCK_META: Record<string, { name: string; kr: string; desc: string }> = {
  AAPL:  { name: "Apple",          kr: "애플",       desc: "아이폰·맥북·앱스토어 — 세계 최대 시가총액 기업" },
  MSFT:  { name: "Microsoft",      kr: "마이크로소프트", desc: "Windows·Azure·Copilot AI — 클라우드·AI 선두주자" },
  NVDA:  { name: "NVIDIA",         kr: "엔비디아",    desc: "AI GPU 절대강자 — 데이터센터·자율주행 핵심 칩" },
  TSLA:  { name: "Tesla",          kr: "테슬라",      desc: "전기차·FSD 자율주행·로보택시·에너지 스토리지" },
  AMZN:  { name: "Amazon",         kr: "아마존",      desc: "전자상거래·AWS 클라우드·Prime 구독 서비스" },
  GOOGL: { name: "Alphabet",       kr: "구글",        desc: "Google 검색·YouTube·GCP·Gemini AI" },
  META:  { name: "Meta",           kr: "메타",        desc: "Facebook·Instagram·WhatsApp·Meta AI" },
  AVGO:  { name: "Broadcom",       kr: "브로드컴",    desc: "AI 반도체·네트워킹 칩·VMware 인수" },
  AMD:   { name: "AMD",            kr: "AMD",         desc: "CPU·GPU — NVIDIA 대항마, AI 칩 성장주" },
  PLTR:  { name: "Palantir",       kr: "팔란티어",    desc: "정부·기업 AI 데이터 분석 플랫폼" },
  RKLB:  { name: "Rocket Lab",     kr: "로켓랩",      desc: "소형 로켓·위성 — 차세대 우주 스타트업" },
  IONQ:  { name: "IonQ",           kr: "아이온Q",     desc: "양자컴퓨터 — 상업화 선두 주자" },
  SMCI:  { name: "Super Micro",    kr: "슈퍼마이크로", desc: "AI 서버·액침냉각 — 엔비디아 AI 인프라 수혜주" },
  COIN:  { name: "Coinbase",       kr: "코인베이스",   desc: "미국 최대 암호화폐 거래소 상장사" },
  MSTR:  { name: "MicroStrategy",  kr: "마이크로스트래티지", desc: "비트코인 최대 법인 보유자" },
  ARM:   { name: "Arm Holdings",   kr: "ARM",         desc: "모바일·AI 반도체 설계 — 스마트폰 95% 점유" },
  TSM:   { name: "TSMC",           kr: "TSMC",        desc: "세계 최대 반도체 파운드리 — 엔비디아·애플 생산" },
  ASML:  { name: "ASML",           kr: "ASML",        desc: "EUV 노광 장비 세계 독점 — 반도체 필수 장비" },
  INTC:  { name: "Intel",          kr: "인텔",         desc: "CPU · 파운드리 사업 재편 중인 반도체 기업" },
  QCOM:  { name: "Qualcomm",       kr: "퀄컴",         desc: "스마트폰 AP·5G 모뎀 시장 1위" },
  NFLX:  { name: "Netflix",        kr: "넷플릭스",     desc: "글로벌 OTT 1위 — 광고 요금제 확장 중" },
  SPY:   { name: "S&P 500 ETF",    kr: "SPY",         desc: "미국 S&P500 지수 추종 ETF" },
  QQQ:   { name: "Nasdaq 100 ETF", kr: "QQQ",         desc: "나스닥100 지수 추종 ETF" },
  TQQQ:  { name: "3× Nasdaq ETF",  kr: "TQQQ",        desc: "나스닥100 3배 레버리지 ETF" },
  SOXL:  { name: "3× Semis ETF",   kr: "SOXL",        desc: "반도체 3배 레버리지 ETF" },
};

type Props = { params: Promise<{ symbol: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const s = symbol.toUpperCase();
  const m = STOCK_META[s];

  const title = m
    ? `${s} ${m.kr} 주가 · 실시간 시세 | Investus 인베스트어스`
    : `${s} 주가 · 실시간 시세 | Investus 인베스트어스`;

  const description = m
    ? `${s} ${m.name}(${m.kr}) 실시간 주가, 차트, 재무지표, 애널리스트 분석 리포트. ${m.desc}`
    : `${s} 실시간 주가, 차트, 재무지표, 애널리스트 분석 리포트 — Investus 인베스트어스`;

  const ogImage = `/api/og?symbol=${s}`;

  return {
    title,
    description,
    keywords: m
      ? [s, m.name, m.kr, `${m.kr} 주가`, `${s} 주가`, `${m.kr} 주식`, `${s} 실시간`, "미국주식", "investus"]
      : [s, `${s} 주가`, `${s} 주식`, "미국주식", "investus"],
    alternates: { canonical: `https://www.investus.kr/stock/${s}` },
    openGraph: {
      title,
      description,
      url: `https://www.investus.kr/stock/${s}`,
      siteName: "Investus 인베스트어스",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function StockLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
