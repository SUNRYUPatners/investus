export type ContentType = "lecture" | "book" | "report" | "post"

export type CreatorHolding = {
  symbol: string
  name: string
  allocation: number  // percent of portfolio
  avgReturn: number   // % gain on position
}

export type CreatorContent = {
  id: string
  type: ContentType
  title: string
  description: string
  thumbnail: string   // emoji
  createdAt: string
  duration?: string   // for lectures
  pages?: number      // for books
  likeCount: number
  viewCount: number
}

export type Creator = {
  id: string
  nickname: string
  avatar: string
  coverGradient: string
  bio: string
  tags: string[]
  followerCount: number
  annualReturn: number
  totalReturn: number
  inceptionDate: string
  isVerified: boolean
  accountBroker: string
  portfolio: CreatorHolding[]
  contents: CreatorContent[]
}

export const CREATORS: Creator[] = [
  {
    id: "jw_value",
    nickname: "한재원_가치투자",
    avatar: "🦁",
    coverGradient: "linear-gradient(135deg, rgba(251,146,60,0.15) 0%, transparent 60%)",
    bio: "10년+ 미국주식. 워렌 버핏 철학을 한국 투자자 시각으로 풀어드립니다. 분기마다 포트폴리오 전체 공개.",
    tags: ["가치투자", "장기홀딩", "배당성장"],
    followerCount: 1847,
    annualReturn: 34.2,
    totalReturn: 287.5,
    inceptionDate: "2019-03",
    isVerified: true,
    accountBroker: "키움증권",
    portfolio: [
      { symbol: "AAPL",  name: "애플",          allocation: 28.4, avgReturn: 156.3 },
      { symbol: "MSFT",  name: "마이크로소프트", allocation: 22.1, avgReturn: 203.7 },
      { symbol: "BRK.B", name: "버크셔해서웨이", allocation: 15.8, avgReturn:  89.4 },
      { symbol: "JNJ",   name: "존슨앤존슨",    allocation: 12.3, avgReturn:  22.1 },
      { symbol: "KO",    name: "코카콜라",       allocation: 11.2, avgReturn:  45.8 },
      { symbol: "기타",  name: "기타",           allocation: 10.2, avgReturn:  31.0 },
    ],
    contents: [
      { id: "jw1", type: "lecture", title: "워렌 버핏처럼 기업 분석하는 법", description: "재무제표 읽는 법부터 내재가치 계산까지. 실제 분석 사례 포함 7시간 강의", thumbnail: "📊", createdAt: "2025-04-12", duration: "7시간 20분", likeCount: 284, viewCount: 3210 },
      { id: "jw2", type: "book",    title: "한국인을 위한 미국 가치투자",       description: "국내 최초 미국주식 가치투자 전략서. 실제 포트폴리오 공개.",              thumbnail: "📚", createdAt: "2025-02-28", pages: 312,          likeCount: 512, viewCount: 8741 },
      { id: "jw3", type: "report",  title: "2025 Q1 포트폴리오 리뷰",           description: "매 분기 공개하는 포지션 변화와 투자 근거 상세 리포트",                  thumbnail: "📋", createdAt: "2025-04-02",                      likeCount: 147, viewCount: 1892 },
      { id: "jw4", type: "post",    title: "버핏이 애플을 파는 진짜 이유",       description: "세금 전략인가, 포지션 조정인가? 심층 분석",                            thumbnail: "💡", createdAt: "2025-05-01",                      likeCount:  89, viewCount: 4523 },
    ],
  },
  {
    id: "tech_growth",
    nickname: "AI주식_박성민",
    avatar: "🚀",
    coverGradient: "linear-gradient(135deg, rgba(96,165,250,0.15) 0%, transparent 60%)",
    bio: "반도체·AI·클라우드 전문. 테크 업종 10년 커리어 출신. 실적 시즌마다 라이브 분석 진행합니다.",
    tags: ["테크", "AI반도체", "성장주"],
    followerCount: 2341,
    annualReturn: 67.8,
    totalReturn: 412.1,
    inceptionDate: "2020-08",
    isVerified: true,
    accountBroker: "미래에셋증권",
    portfolio: [
      { symbol: "NVDA", name: "엔비디아",    allocation: 35.2, avgReturn: 841.3 },
      { symbol: "TSMC", name: "TSMC",        allocation: 20.1, avgReturn: 187.4 },
      { symbol: "META", name: "메타",        allocation: 18.7, avgReturn: 334.2 },
      { symbol: "AMD",  name: "AMD",         allocation: 14.3, avgReturn:  92.7 },
      { symbol: "SMCI", name: "슈퍼마이크로", allocation:  7.5, avgReturn: 128.9 },
      { symbol: "기타", name: "기타",        allocation:  4.2, avgReturn:  45.0 },
    ],
    contents: [
      { id: "pm1", type: "lecture", title: "엔비디아 주가 5배의 비밀 — AI 슈퍼사이클 분석", description: "2020년 매수부터 현재까지. 언제 팔아야 하는가?",               thumbnail: "🎯", createdAt: "2025-05-03", duration: "4시간 15분", likeCount: 391, viewCount:  6201 },
      { id: "pm2", type: "report",  title: "반도체 업종 2025 하반기 전망",                    description: "HBM3E, CoWoS, 온디바이스AI 수혜주 완전 분석",              thumbnail: "💾", createdAt: "2025-04-20",                      likeCount: 218, viewCount:  3847 },
      { id: "pm3", type: "post",    title: "NVDA 실적 발표 라이브 분석 요약",                 description: "Q1 2025 실적 발표 당일 라이브 해설 전문",                   thumbnail: "📡", createdAt: "2025-05-05",                      likeCount: 445, viewCount:  9821 },
    ],
  },
  {
    id: "etf_passive",
    nickname: "ETF킹_이민지",
    avatar: "👑",
    coverGradient: "linear-gradient(135deg, rgba(167,139,250,0.15) 0%, transparent 60%)",
    bio: "복잡한 주식 분석 대신 ETF로 시장 평균 이상을 달성하는 법. 적립식 투자 5년 실적 공개.",
    tags: ["ETF", "패시브투자", "적립식"],
    followerCount: 4521,
    annualReturn: 22.4,
    totalReturn: 134.7,
    inceptionDate: "2020-01",
    isVerified: true,
    accountBroker: "삼성증권",
    portfolio: [
      { symbol: "SPY",  name: "S&P500 ETF",   allocation: 40.0, avgReturn:  98.3 },
      { symbol: "QQQ",  name: "나스닥100 ETF", allocation: 30.0, avgReturn: 152.4 },
      { symbol: "VTI",  name: "전체시장 ETF",  allocation: 15.0, avgReturn:  87.2 },
      { symbol: "SCHD", name: "배당성장 ETF",  allocation: 10.0, avgReturn:  62.1 },
      { symbol: "기타", name: "기타 ETF",      allocation:  5.0, avgReturn:  41.0 },
    ],
    contents: [
      { id: "mj1", type: "lecture", title: "ETF만으로 연 20% 달성하는 포트폴리오 구성법", description: "5년 실전 데이터 기반. 리밸런싱 타이밍과 비중 조절 전략",       thumbnail: "📈", createdAt: "2025-03-15", duration: "2시간 40분", likeCount: 612, viewCount: 12480 },
      { id: "mj2", type: "report",  title: "SPY vs QQQ vs VTI 완전 비교",                description: "10년 백테스트와 MDD 분석. 내 투자성향에 맞는 ETF는?",          thumbnail: "⚖️", createdAt: "2025-04-05",                      likeCount: 381, viewCount:  8921 },
      { id: "mj3", type: "post",    title: "환율 1400원 넘으면 ETF 사야 할까?",            description: "환율이 미국 ETF 수익률에 미치는 실제 영향 분석",               thumbnail: "💱", createdAt: "2025-05-08",                      likeCount: 234, viewCount:  5632 },
    ],
  },
  {
    id: "dividend_kim",
    nickname: "배당귀족_김철수",
    avatar: "💰",
    coverGradient: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, transparent 60%)",
    bio: "배당 성장주로 매월 달러 현금흐름 만들기. 실제 월 배당 수령액 공개. 직장인 투자자 커뮤니티.",
    tags: ["배당주", "현금흐름", "DRIP"],
    followerCount: 3102,
    annualReturn: 18.7,
    totalReturn: 89.3,
    inceptionDate: "2021-06",
    isVerified: true,
    accountBroker: "NH투자증권",
    portfolio: [
      { symbol: "SCHD", name: "배당성장 ETF", allocation: 25.0, avgReturn: 48.2 },
      { symbol: "VYM",  name: "고배당 ETF",   allocation: 20.0, avgReturn: 41.7 },
      { symbol: "ABBV", name: "애브비",       allocation: 15.0, avgReturn: 67.4 },
      { symbol: "O",    name: "리얼티인컴",   allocation: 12.0, avgReturn: 12.8 },
      { symbol: "JNJ",  name: "존슨앤존슨",   allocation: 10.0, avgReturn: 18.3 },
      { symbol: "기타", name: "기타 배당주",  allocation: 18.0, avgReturn: 29.0 },
    ],
    contents: [
      { id: "ks1", type: "lecture", title: "직장인이 월 100만원 배당받는 로드맵",  description: "종잣돈 1000만원부터 시작해서 배당 파이프라인 구축하는 7단계",        thumbnail: "🏦", createdAt: "2025-04-01", duration: "3시간 10분", likeCount: 478, viewCount:  9823 },
      { id: "ks2", type: "report",  title: "2025년 5월 배당 수령 현황 공개",       description: "이번달 실제 달러 배당금 공개 + 종목별 배당 일정",                   thumbnail: "💵", createdAt: "2025-05-10",                      likeCount: 312, viewCount:  4821 },
      { id: "ks3", type: "post",    title: "SCHD vs VYM vs HDV 2025년 비교",       description: "배당률, 성장률, 안정성 세 가지 관점 완전 비교",                    thumbnail: "📊", createdAt: "2025-05-06",                      likeCount: 198, viewCount:  6341 },
    ],
  },
]

export function getCreator(id: string): Creator | undefined {
  return CREATORS.find((c) => c.id === id)
}

export function contentTypeLabel(t: ContentType): string {
  return { lecture: "강의", book: "전자책", report: "리포트", post: "게시글" }[t]
}
