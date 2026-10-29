/** Chrome copy for the /news section and the home News tab sub-menu.
 *  Kept free of `reports.ts` / article bodies so client components can import it. */

export type NewsSectionTab = "news" | "analysis" | "earnings" | "spacex" | "tesla";

export const NEWS_STRINGS = {
  en: {
    brand: "INVESTUS",
    tagline: "Tesla · SpaceX · xAI — investor research on the Musk ecosystem",
    home: "Home",
    news: "News",
    analysis: "Analysis",
    earnings: "Earnings & data",
    spacex: "SpaceX valuation",
    tesla: "Tesla valuation",
    guides: "Guides",
    about: "About & editorial",
    latest: "Latest research",
    allArticles: "All articles",
    readMore: "Read full analysis",
    sources: "Sources & further reading",
    published: "Published",
    disclaimerTitle: "Disclaimer",
    disclaimer:
      "This article is editorial research for informational purposes only. It is not investment advice, a recommendation, or a solicitation to buy or sell any security, and does not guarantee any return. Markets carry risk of loss. Verify figures against the primary sources before making decisions.",
    koVersion: "한국어로 보기",
    byline: "By the Investus editorial desk",
    relatedTicker: "More on",
    backToNews: "Back to all news",
    noEnglish:
      "A full English translation of this report is in progress. The analysis below reflects the original Korean research.",
    liveEmpty: "No live headlines right now. Try again shortly.",
    liveError: "Live headlines are temporarily unavailable.",
    retry: "Retry",
    openOriginal: "Original article",
    guidesIntro: "Investus investing guides — tap a series or read the full hub.",
    allGuides: "All guides",
    earningsIntro: "Earnings coverage and data trackers across the Musk ecosystem.",
    spacexIntro: "SpaceX valuation, Starlink, Starship and AI-compute coverage.",
    teslaIntro: "Tesla market cap and multiples from live prices, plus sourced segment notes and ARK bear/base/bull scenarios.",
    analysisIntro: "Investus research on Tesla, SpaceX, xAI and the Musk ecosystem.",
  },
  ko: {
    brand: "INVESTUS",
    tagline: "테슬라 · 스페이스X · xAI — 머스크 생태계 투자 리서치",
    home: "홈",
    news: "뉴스",
    analysis: "분석",
    earnings: "실적·데이터",
    spacex: "스페이스X 밸류에이션",
    tesla: "테슬라 밸류에이션",
    guides: "투자 가이드",
    about: "소개·편집 방침",
    latest: "최신 리서치",
    allArticles: "전체 글",
    readMore: "분석 전문 보기",
    sources: "출처 및 참고자료",
    published: "발행",
    disclaimerTitle: "투자 유의사항",
    disclaimer:
      "본 글은 정보 제공 목적의 편집 리서치입니다. 투자 자문이나 매수·매도 권유가 아니며 수익을 보장하지 않습니다. 투자에는 원금 손실 위험이 있습니다. 판단 전 반드시 원 출처로 수치를 확인하시기 바랍니다.",
    koVersion: "View in English",
    byline: "인베스트어스 편집팀",
    relatedTicker: "관련 종목",
    backToNews: "전체 뉴스로",
    noEnglish: "",
    liveEmpty: "지금은 헤드라인이 없습니다. 잠시 후 다시 시도해 주세요.",
    liveError: "실시간 헤드라인을 불러오지 못했습니다.",
    retry: "다시 시도",
    openOriginal: "원문 보기",
    guidesIntro: "인베스트어스 투자 가이드 — 시리즈를 고르거나 전체 허브로 이동하세요.",
    allGuides: "전체 가이드",
    earningsIntro: "머스크 생태계 실적 커버리지와 데이터 트래커.",
    spacexIntro: "스페이스X 밸류에이션, 스타링크, 스타십, AI 컴퓨트 커버리지.",
    teslaIntro: "실시간 시세 기준 테슬라 시가총액·배수, 인용된 부문 노트와 ARK 약세·기본·강세 시나리오.",
    analysisIntro: "테슬라·스페이스X·xAI 등 머스크 생태계 인베스트어스 리서치.",
  },
} as const;

export function newsSectionTabs(locale: "en" | "ko"): { id: NewsSectionTab; label: string }[] {
  const s = NEWS_STRINGS[locale];
  return [
    { id: "news", label: s.news },
    { id: "analysis", label: s.analysis },
    { id: "earnings", label: s.earnings },
    { id: "spacex", label: s.spacex },
    { id: "tesla", label: s.tesla },
  ];
}
