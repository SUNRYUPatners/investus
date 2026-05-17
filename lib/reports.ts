export type ReportCategory = "시장분석" | "종목분석" | "매크로" | "섹터" | "특집";
export type ReportColor    = "mint" | "blue" | "purple" | "orange" | "red";

export type Report = {
  id:            string;
  title:         string;
  summary:       string;
  body:          string;
  category:      ReportCategory;
  categoryColor: ReportColor;
  subject?:      string;
  date:          string;
  updatedAt?:    string;   // "2026.05.14 07:27" KST 형식
  isPinned?:     boolean;
  images?:       string[];
};

export const CATEGORY_STYLE: Record<ReportColor, { bg: string; color: string }> = {
  mint:   { bg: "rgba(0,229,160,0.12)",  color: "#00e5a0" },
  blue:   { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  purple: { bg: "rgba(168,85,247,0.12)", color: "#c084fc" },
  orange: { bg: "rgba(249,115,22,0.12)", color: "#fb923c" },
  red:    { bg: "rgba(255,77,109,0.12)", color: "#ff4d6d" },
};

export const CATEGORY_EMOJI: Record<ReportCategory, string> = {
  "시장분석": "📊",
  "종목분석": "🔍",
  "매크로":   "🌐",
  "섹터":     "🏭",
  "특집":     "⭐",
};

export const SEED_REPORTS: Report[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // 2026-05-18 리포트
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:            "seed-033",
    title:         "SpaceX IPO 6월 12일 Nasdaq — BlackRock $5~10B 단독 매수 시도, $SPCE",
    summary:       "SpaceX가 6월 12일 Nasdaq에 $SPCE 티커로 상장 예정입니다. 총 조달 규모 $15B 중 BlackRock이 12% 전체($5~10B)를 단독 매입하려 한다는 보도가 나왔습니다. 기관들이 상어처럼 달려들고 있으며, 소매 투자자에게는 IPO 물량의 30%가 배정됩니다.",
    body:          "■ SpaceX IPO 핵심 사실\n\n• 상장일: 2026년 6월 12일 (예정)\n• 거래소: Nasdaq\n• 티커: $SPCE\n• 총 조달 규모: $15B (150억 달러)\n• 현재 기업 가치: $350B+\n\n■ BlackRock의 단독 매수 시도\n\n\"BlackRock is trying to buy 12% of the entire SpaceX IPO in one go.\"\n\"They want $5 to $10 billion out of the $15 billion raise.\"\n\n• 세계 최대 자산운용사가 IPO 물량의 12%를 단일 기관으로 매입 시도\n• 이는 역대 IPO 중 가장 공격적인 단일 기관 참여 시도 중 하나\n• BlackRock의 SpaceX 베팅 = AI·우주 인프라 장기 투자 선언\n\n■ 물량 배분 구조\n\n• 기관 투자자: IPO 물량의 70%\n• 소매 투자자: IPO 물량의 30%\n→ \"가장 기대되는 IPO에 소매 투자자도 30% 참여 가능\"\n→ 기관이 물량을 독점하지 못하는 구조 — 이례적\n\n■ 왜 SpaceX인가\n\n1) Starlink 인터넷: 전 세계 미연결 지역 커버 → GDP 대체 수준 영향\n2) 발사 서비스: 경쟁자 없음 (Falcon 9 재사용 기술 독점)\n3) Starship: 화성 식민지·달 임무 → 초장기 성장 스토리\n4) 군사·정부 계약: 미 우주군·NASA 핵심 파트너\n5) AI + 우주: Elon Musk의 xAI와 시너지\n\n■ Starlink 성장성\n\n\"Starlink Internet access enables people to learn anything and access the global market for their goods and services, improving their standard of living.\"\n\n\"The internet is the one single thing that literally lifts an entire country when they sign with Starlink gets a parallel Internet infrastructure.\"\n\n→ 단순 위성 인터넷이 아닌 국가 인프라 수준 서비스\n\n■ 투자 시사점\n\n• SpaceX IPO 당일 유동성 풀 형성 → 단기 변동성 주의\n• 장기 보유 관점: 우주·인터넷·AI 복합 플랫폼\n• 관련 수혜: TSLA(머스크 생태계), 우주 ETF(UFO), 위성 부품주\n• NASDAQ 편입 이후 수동 ETF 자금 자동 유입 예정\n\n■ 결론\n\nSpaceX IPO는 2026년 최대 이벤트입니다. BlackRock의 단독 $5~10B 매수 시도는 기관 투자자들이 이 기회를 얼마나 소중히 여기는지 보여줍니다. 6월 12일 $SPCE 상장은 투자 역사에 남을 이정표가 될 것입니다.",
    category:      "특집",
    categoryColor: "purple",
    subject:       "🚀 SpaceX IPO ($SPCE·Nasdaq)",
    date:          "2026-05-18",
    updatedAt:     "2026.05.18 08:30",
    isPinned:      true,
    images:        ["/charts/spacex-ipo.svg"],
  },

  {
    id:            "seed-034",
    title:         "테슬라 FSD V14.3.3 출시 — 자율주행 통계 공개·스마트 서머리 대폭 개선",
    summary:       "Tesla FSD V14.3.3이 공식 출시됐습니다. 자율주행 주행 통계(Self-Driving Stats) 공개, 스마트 서머리(Smart Summary) 속도 대폭 증가, 주행 편의성 개선이 핵심입니다. FSD V4.3.2에서 주차 공간 수동 신호·도로 표시 없이도 완벽 자동 주차를 시연한 동영상도 화제입니다.",
    body:          "■ FSD V14.3.3 주요 업데이트\n\n\"Tesla FSD 14.3.3 is just landed, and it comes with it.\"\n\"Actually Smart Summary's speed has also been increased.\"\n\"Software version: 2026.14.6.6\"\n\n■ 핵심 변경 사항\n\n1) Self-Driving Stats (자율주행 통계) 공개\n   • 누적 자율주행 거리, 개입 빈도, 안전 이벤트 데이터\n   • 사용자가 실시간으로 자신의 FSD 성과 확인 가능\n   • 테슬라 → 투명성 강화 전략\n\n2) Smart Summary 속도 개선\n   • AI 기반 차량 요약 기능 응답 속도 대폭 향상\n   • 음성 인터랙션 더욱 자연스럽게\n\n3) 주행 편의성 개선\n   \"It's so refined. The way it slows down so slightly (1 mph) when it can't see over a hill... it's so refined. The way each build it feels more and more like a personal robotic assistant.\"\n\n4) 완벽 자동 주차 (V14.3.2 시연)\n   \"My Model 3 parked itself as FSD V4.3.2 in the latest actually Tesla FSD V14.3.3 update.\"\n   • 도로 표시 없는 주차장\n   • 수동 신호 없이 스스로 주차 완료\n   • \"FSD correctly identified the road and used hand signals to direct it to a parking spot I didn't even think of!\"\n\n■ 자율주행 정확도 수치 (V14.3.3)\n\n\"Tesla FSD 14.3.3 is the gold standard in self-driving comfort.\"\n• 98% 정확도 달성 (최신 주행 데이터 기준)\n• 가장 긴 자율주행 연속 주행 기록 경신\n• 도시 환경·복잡 교차로 처리 능력 향상\n\n■ NHTSA 규제 동향\n\n\"NHTSA closed its Smart Investigation six weeks ago after ISS first reported that Tesla's access issues have been resolved. The regulatory path is now clear to push the feature further.\"\n\n→ NHTSA의 규제 장벽 해소 → FSD 글로벌 확장 가속 예상\n\n■ 투자 시사점\n\n• FSD 구독 수익 가속: V14.3.3 업데이트로 신규 구독 전환 촉진\n• 로봇택시 상용화 타임라인 앞당김 (2026년 하반기 텍사스·CA)\n• Optimus 로봇과 동일 AI 아키텍처 — 기술 시너지\n• 완성차 경쟁사 대비 FSD 격차 3~5년 이상 유지\n\n■ 결론\n\nFSD V14.3.3은 \"자율주행이 실제로 작동한다\"는 것을 통계로 증명하는 단계로 진입했습니다. 테슬라가 자율주행 통계를 공개 제공하는 순간, 투자자들의 FSD 수익화에 대한 확신도 함께 강화됩니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🚗 테슬라 FSD V14.3.3",
    date:          "2026-05-18",
    updatedAt:     "2026.05.18 08:25",
    isPinned:      true,
    images:        ["/charts/tesla-fsd-1433.svg"],
  },

  {
    id:            "seed-035",
    title:         "Bill Ackman, Microsoft $2.3B 베팅 — Google 전량 매도 후 집중 투자",
    summary:       "Bill Ackman의 Pershing Square가 Microsoft에 MASSIVE $2.3B(약 3.1조 원)를 투자했습니다. Ackman은 $GOOGL 전량을 매도해 그 자금으로 Microsoft를 매수했다고 밝혔습니다. Microsoft의 AI·클라우드 복합 성장에 베팅한 역대급 집중 투자입니다.",
    body:          "■ 핵심 공시\n\n\"Bill Ackman just invested a MASSIVE $2.3 BILLION in $MSFT.\"\n\"Bill Ackman sold ALL of his $GOOGL shares as a 'source of funds for $80,000 worth of Microsoft' but $GOOGL declining 7%.\"\n\n■ Ackman의 MS 투자 근거 (추정)\n\n1) Azure AI: OpenAI 파트너십 독점적 수혜 → 클라우드 점유율 확대\n2) Copilot 생태계: Office 365 → 기업용 AI 전환 가장 빠른 기업\n3) GitHub Copilot: 개발자 AI 시장 지배적 위치\n4) 밸류에이션: Google 대비 AI 전환 속도·안정성 우위\n5) 규제 리스크: Google 반독점 소송 노출 vs MS 상대적 안전\n\n■ Google 전량 매도의 의미\n\n\"Bill Ackman sold ALL of his $GOOGL shares.\"\n\n• Google 반독점 소송 (검색 시장 독점) 리스크\n• YouTube 광고 성장 둔화 우려\n• Gemini AI의 ChatGPT 대비 뒤처진 채택률\n• OpenAI 소송(개인정보 공유)에서 공동 피고 포함\n\n→ Google 매도는 단순 차익 실현이 아닌 \"AI 전쟁 1등 바꾸기\" 판단\n\n■ 거물 투자자들의 Microsoft 베팅 흐름\n\n• Bill Ackman: $2.3B 신규 매수\n• Stanley Druckenmiller: 보유 비중 유지\n• 다수 헤지펀드: Q1 13F에서 MSFT 비중 확대\n\n■ Microsoft 현황\n\n• 시총: $3.3T+ (세계 1~2위 경쟁)\n• Azure 성장률: +33% YoY (2025 Q4)\n• Copilot 기업 계정: 8,500만+ 사용자\n• FY2025 FCF: $70B+ 예상\n\n■ 결론\n\nAckman의 $2.3B Microsoft 집중 투자는 \"AI 시대의 최대 수혜자는 Microsoft\"라는 강한 확신의 표현입니다. Google 전량 매도와의 조합은 2026년 빅테크 간 AI 패권 구도의 전환을 시사합니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "💼 Ackman (MS $2.3B·구글 매도)",
    date:          "2026-05-18",
    updatedAt:     "2026.05.18 08:20",
    images:        ["/charts/ackman-msft.svg"],
  },

  {
    id:            "seed-036",
    title:         "워런 버핏 × 애플 25년 — $10,000이 $120,000으로, 버핏의 최고 베팅",
    summary:       "버핏이 1999년 3월 처음 AAPL을 공시 매수한 역사적 순간을 돌아봅니다. 버크셔 헤서웨이는 2016년 5월 16일 처음 Apple 매입을 공시했고, 이후 Apple 주가는 $9 → $300+로 33배 상승했습니다. 버핏이 Apple에 투자한 $10,000은 오늘 ~$120,000이 됐습니다.",
    body:          "■ 버핏의 Apple 투자 타임라인\n\n\"WARREN BUFFETT FIRST DISCLOSED BUYING APPLE $AAPL STOCK IN MARCH 1999.\"\n\"Berkshire Hathaway first disclosed buying Apple on May 16th, 2016.\"\n\n• 1999.03: 버핏 개인 첫 AAPL 공시 매수\n• 2016.05.16: 버크셔 헤서웨이 공식 첫 Apple 매입 공시\n• 2024: Apple = 버크셔 최대 단일 포지션 (한때 포트폴리오 50%+)\n• 2025: 버핏 일부 Apple 매도 (전략적 차익 실현)\n\n■ 수익률 계산\n\n\"Every $10,000 that Warren Buffett invested into Apple stock a year ago is ~$120,000 today.\"\n\n• 버크셔의 Apple 평균 매입 단가: 약 $35~40 (분할 조정)\n• 현재 Apple 주가: $200+ (약 5~6배)\n• 버크셔 Apple 투자 원금: $36B → 평가액 $180B+ (최고점)\n• 전체 버핏 레거시 수익의 Apple 기여분: 추정 $100B+\n\n■ \"It's not worth anything under $300\"\n\n\"Here's a chart of what has happened since Warren Buffett invested into Apple stock.\"\n\"Apple is not worth anything under $300.\" — 시장 분석가 인용\n\n• 현재 주가 ~$213에서 추가 상승 여력\n• AI 기능(Apple Intelligence) 본격화 → 기기 교체 사이클 자극\n• 서비스 매출 $100B+ 달성 임박\n\n■ 버핏이 Apple을 고른 이유 (회고)\n\n1) 소비자 생태계: 아이폰 교체율 90%+ 충성도\n2) 브랜드 프리미엄: 가격 인상 능력 (버핏의 핵심 기준)\n3) 자사주 매입: FCF의 90%+ 주주환원\n4) 단순한 비즈니스 모델: 버핏이 이해할 수 있는 제품\n5) 팀 쿡의 운영 탁월성\n\n■ 현재 상황\n\n• 버핏 Apple 일부 매도 (세금 효율화 목적) — 근본적 신뢰는 유지\n• 버크셔의 Apple 비중: 여전히 1위\n• Apple Intelligence(AI) 사이클 시작 → 차기 성장 동력\n\n■ 결론\n\n버핏의 Apple 투자는 역사상 가장 위대한 단일 주식 베팅 중 하나입니다. \"위대한 기업을 적당한 가격에 사라\"는 버핏의 원칙이 Apple로 완벽하게 구현됐습니다. AI 시대에 Apple의 새로운 성장 사이클이 시작되고 있습니다.",
    category:      "특집",
    categoryColor: "orange",
    subject:       "🍎 버핏 × 애플 (25년 투자 레거시)",
    date:          "2026-05-18",
    updatedAt:     "2026.05.18 08:15",
    images:        ["/charts/buffett-apple.svg"],
  },

  {
    id:            "seed-037",
    title:         "테슬라, 한국·대만서 칩 설계 엔지니어 대규모 채용 — Cortex AI 슈퍼컴퓨터 자립화",
    summary:       "Tesla가 한국과 대만에서 반도체 전문 Electrical Design Engineer를 대규모 채용 중입니다. GDDR, LPDDR, DRAM 메모리 설계 전문가를 찾고 있으며, 이는 Cortex AI 슈퍼컴퓨터의 칩을 Giga Texas로 출하하기 전 추가 처리하는 역할입니다. 테슬라의 반도체 내재화 전략이 구체화됩니다.",
    body:          "■ 채용 공고 핵심 내용\n\n\"BREAKING: Tesla is hiring Software Electrical Design Engineers for teams in South Korea and Taiwan, prioritizing deep knowledge of memory types like GDDR, LPDDR, DRAM, GDDR, SDRAM.\"\n\n■ 채용 지역 및 역할\n\n• 지역: 한국(South Korea), 대만(Taiwan)\n• 직군: Electrical Design Engineer\n• 전문 분야:\n  - GDDR (그래픽 DDR 메모리)\n  - LPDDR (저전력 DDR, 모바일·차량)\n  - DRAM 설계\n  - GDDR·SDRAM 아키텍처\n\n■ Cortex AI 슈퍼컴퓨터란\n\n\"Cortex, Tesla's AI supercomputer, part of, shipping the product that is then shipped to Giga Texas for further processing at the Battery Campus.\"\n\n• Cortex = 테슬라의 자체 AI 훈련 슈퍼컴퓨터\n• FSD·Optimus 훈련에 사용되는 핵심 인프라\n• 기가텍사스 Battery Campus에서 최종 통합\n• NVIDIA GPU 의존도 축소 → 자체 칩 개발 병행\n\n■ 왜 한국·대만인가\n\n1) 한국: 삼성전자·SK하이닉스 출신 메모리 전문 인재 풀\n2) 대만: TSMC 협력 엔지니어링 생태계\n3) 아시아 현지 생산·공급망과의 직접 협업 필요\n4) 시간대: 아시아 공급망 실시간 관리\n\n■ 테슬라 반도체 내재화 전략 큰 그림\n\n\"These engineers will design the complex motherboards that are the core computing architecture of Tesla's vehicles and the future AI chip. That means level of compute efficiency is critical to scale Cortex, on top of its neural nets in Optimus and Cybercab.\"\n\n로드맵:\n1단계: NVIDIA GPU 활용 (현재)\n2단계: 자체 칩 설계 + TSMC 위탁 생산\n3단계: 아시아 엔지니어링 거점 → 칩 완전 자립\n\n■ 투자 시사점\n\n• 테슬라: 반도체 내재화 성공 시 GPU 비용 대폭 절감 → 마진 개선\n• NVIDIA: 단기적 테슬라 주문 의존도 변화 가능성 (장기 리스크)\n• 삼성전자·SK하이닉스: 테슬라 HBM/LPDDR 공급 수혜 기대\n• TSMC: 테슬라 자체 칩 위탁 생산 파트너 가능성\n\n■ 결론\n\n테슬라의 한국·대만 칩 설계 엔지니어 채용은 \"전기차 기업\"에서 \"반도체 기업\"으로의 전환을 공식화합니다. Cortex AI 슈퍼컴퓨터 자립화는 FSD·Optimus의 훈련 비용을 낮추고, 장기적으로 테슬라의 AI 경쟁력을 근본적으로 강화합니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🔬 테슬라 (칩 내재화·아시아 채용)",
    date:          "2026-05-18",
    updatedAt:     "2026.05.18 08:10",
    images:        ["/charts/tesla-chip-asia.svg"],
  },

  {
    id:            "seed-038",
    title:         "Jamie Dimon \"50년 커리어 중 AI 가장 낙관\" — JP모건 AI 전환 가속",
    summary:       "JP모건 CEO Jamie Dimon이 AI에 대해 \"50년 커리어 중 들어본 것 중 가장 낙관적인 그림\"이라고 발언했습니다. Bill Ackman의 Microsoft $2.3B 투자, 다수 기관 투자자들의 AI 수혜주 포트폴리오 업데이트가 맞물리며 AI 강세론이 다시 한번 확인됩니다.",
    body:          "■ Jamie Dimon 발언\n\n\"JAMIE DIMON: MOST OPTIMISTIC PICTURE OF AI I'VE EVER HEARD IN MY 50-YEAR CAREER. IT'S GONNA BE GREAT.\"\n\n■ Dimon이 낙관하는 이유\n\n1) 생산성 혁명: AI가 지식 노동자 생산성을 10~100배 향상\n2) 의료·법률·금융 전문직 보완 → 비용 절감\n3) JP모건 자체 AI 적용: 금융 분석·리스크 관리·고객 서비스\n4) 인터넷 혁명보다 더 큰 파급력 예상\n\n■ JP모건의 AI 전환 현황\n\n• AI 특허 출원: 업계 최다 수준\n• LOXM: 주식 거래 AI 시스템 (대형 주문 최적 실행)\n• COiN (Contract Intelligence): 법률 문서 분석 AI\n• AI 관련 인력: 1,500명+ AI 전문 직군\n• 연간 AI 투자: $15B+ (IT 전체 예산의 상당 부분)\n\n■ 월가 CEO들의 AI 낙관론 흐름\n\n\"Many famous investors, including Ron Baron, Bill Ackman, Buffett and a bunch more just updated their portfolios — here's what they're all invested in.\"\n\"Q1 2024 (A List): Bill Ackman...\"\n\"Stanley Druckenmiller\"\n\n공통 포지션:\n• Microsoft (AI 클라우드)\n• Amazon (AWS AI)\n• Google/Alphabet (검색 + Gemini)\n• NVIDIA (AI 인프라)\n→ 월가 레전드들이 일제히 AI 수혜주로 집중\n\n■ 시장 시사점\n\n• Dimon 발언 + Ackman 베팅 = AI 강세론 기관 컨센서스 형성\n• 금융 섹터의 AI 전환 투자 가속 → Salesforce·ServiceNow·Microsoft 수혜\n• 소매 투자자들에게 \"AI는 테마가 아닌 현실\"이라는 신호\n\n■ S&P 500 계절성 참고\n\n\"S&P 500 has struggled from May to October during midterm election years (1962-2022).\"\n\n• 역사적으로 5~10월은 계절적 약세 구간\n• AI 모멘텀이 계절 패턴을 극복할 수 있는지 주목\n• CPI·Fed 통화정책이 변수\n\n■ 결론\n\nJamie Dimon의 \"50년 중 가장 낙관적\" 발언은 단순 립서비스가 아닙니다. JP모건이 AI에 수십억 달러를 투자하고 있다는 사실이 뒷받침합니다. 월가 최고 CEO들이 AI 수혜주로 포트폴리오를 재편하는 지금, 방향성은 명확합니다.",
    category:      "매크로",
    categoryColor: "mint",
    subject:       "🏦 Dimon (AI 낙관론·월가 포트폴리오)",
    date:          "2026-05-18",
    updatedAt:     "2026.05.18 08:05",
    images:        ["/charts/dimon-ai.svg"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2026-05-15 리포트
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:            "seed-026",
    title:         "트럼프-시진핑 베이징 회담 — \"매우 좋은 감정\", 관세 합의 임박",
    summary:       "트럼프 대통령이 베이징에서 시진핑 주석과 회담 후 \"매우 좋은 감정(very good feeling)\"이라 발언했습니다. 60명 이상의 CEO가 동행한 이번 방문은 단순 외교가 아닌 관세 145% 대폭 완화 및 중국 $1조 대미 투자 합의를 포함한 역대급 딜로 평가됩니다.",
    body:          "■ 트럼프 직접 발언\n\n\"We talked about a lot of things. We had a very good meeting. We want things to happen. One thing he agreed is that, let's get those borders — so they can make a lot of stuff. And they told reporters 'very good feelings' coming out of the summit.\"\n\n■ Xi said: 'We have GOOD FEELINGS' about trade deal talks.\n\n■ 협상 핵심 내용\n\n• 중국 $1조 대미 투자 약속\n• 관세 145% → 협상 인하 예정\n• 농산물·에너지 대미 구매 확대\n• 2026.08E 최종 합의 목표\n\n■ 종목별 직접 수혜\n\n1) TSLA: 중국 FSD 규제 완화 협의 → 중국 매출 반등\n2) NVDA: H20+ 대중 수출 허가 완화 → $50B 시장 개방\n3) AAPL: 중국 AI 기능 개방 협의, 아이폰 판매 회복\n4) AMZN·LNG: 중국 대규모 구매 합의 수혜\n\n■ 핵심 시사점\n\n\"There was a reason 60 CEOs went on this trip and that is a MAJOR trade deal.\" — Jefferies\n\n60명 CEO 동행(머스크·젠슨황·팀쿡·다이먼·저커버그·핑크)은 역대급 딜의 신호입니다. AI 반도체·전기차·금융 모두 촉매.\n\n■ 결론\n\n트럼프-시진핑 '매우 좋은 감정' 발언은 90일 유예 이후 실질 합의의 분수령입니다. 관세 완화 합의 시 TSLA·NVDA·AAPL 중국 매출 회복이 동시에 진행됩니다.",
    category:      "매크로",
    categoryColor: "blue",
    subject:       "🇺🇸🇨🇳 미중 무역 (트럼프-시진핑)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:30",
    isPinned:      true,
    images:        ["/charts/trump-china-trade.svg"],
  },

  {
    id:            "seed-021",
    title:         "NVIDIA 중국 AI칩 판매 허가 — 18개社, $50B 시장 개방",
    summary:       "트럼프 행정부가 NVIDIA에 중국 첨단 기업 18곳에 고급 AI 반도체 판매를 허가했습니다. 알래스카 귀환 중 트럼프가 직접 젠슨 황에게 전화해 합의를 전달. 현재 $12B 승인 시장이 $50B로 확대될 수 있는 역사적 전환점입니다.",
    body:          "■ 핵심 발표\n\n\"The United States Market has just CLEARED NVIDIA to sell advanced chips to 10 Chinese firms. This could be a $50 BILLION DOLLAR market. President Trump called up CEO Jensen Huang in Alaska on the way home — and a deal has seemingly been struck.\"\n\n■ 시장 영향 규모\n\n• 현재 승인 중국 시장: ~$12B\n• 신규 허가 후 잠재 시장: ~$50B\n• 승인 기업 수: 18개 첨단 기업\n• 확장 배율: +4.2배\n\n■ 정치적 맥락\n\n• 트럼프 NVDA 개인 $1M+ 매수 공시 직후 허가\n• 미중 무역협상의 첨단기술 분야 양보\n• 알래스카 귀환 중 트럼프-젠슨황 직통 전화\n• 젠슨황 에어포스원 탑승 → 협상 핵심 당사자\n\n■ NVDA 수혜 분석\n\n• 중국 AI 수요: 텐센트·알리바바·바이두 GPU 폭증 예상\n• H20 이상급 칩 수출 허가 범위 확대 기대\n• 분기 매출 증가분: 애널리스트 $5~8B 추가 추정\n• 마진: 소프트웨어·서비스 번들 포함 시 고마진 유지\n\n■ 수혜 파급 효과\n\n• AMD: 경쟁 격화지만 중국 시장 동반 확대 수혜\n• TSMC: 고급 GPU 생산 주문 증가\n• SK하이닉스·마이크론: HBM 수요 폭증\n\n■ 결론\n\n중국 AI칩 허가는 NVDA에게 기존 예상치를 크게 웃도는 매출 성장 동력입니다. 단, 의회 반발·국가안보 심사 재개 리스크는 모니터링 필요합니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🟢 NVIDIA (중국·AI칩 허가)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:35",
    isPinned:      true,
    images:        ["/charts/nvda-china.svg"],
  },

  {
    id:            "seed-023",
    title:         "트럼프 NVDA 개인 매수 공시 — 113페이지, 3,642건 거래 내역",
    summary:       "트럼프 대통령이 2026년 자산 공시를 제출했습니다. 113페이지, 3,642건 거래 내역에 NVIDIA(NVDA)·ServiceNow(NOW) 각 $1M+ 개인 매수가 포함되어 있습니다. 중국 AI칩 판매 허가 발표 직전 타이밍이 강력한 정책 수혜 시그널로 해석됩니다.",
    body:          "■ 공시 핵심 내용\n\n• 공시 분량: 113페이지\n• 총 거래 건수: 3,642건\n• $1M+ 이상 개인 매수:\n  - NVDA (Nvidia Corp): $1M+\n  - NOW (ServiceNow): $1M+\n\n■ 타이밍의 의미\n\n공시 시점과 정책 발표 순서:\n1. 트럼프 NVDA $1M+ 개인 매수 (공시 내)\n2. 미중 무역협상 AI칩 분야 논의\n3. NVDA 중국 판매 허가 발표\n→ \"행정부 정책과 연동된 선행 매수\" 해석\n\n■ 시장 반응\n\n\"매우 강세(VERY BULLISH) 시그널\" — 트레이더들 해석\n• NVDA 공시 당일 +4.8% 급등\n• ServiceNow도 동반 상승\n\n■ ServiceNow 매수 시사점\n\n• NOW는 AI 엔터프라이즈 플랫폼 선두 기업\n• 연방정부 IT 시스템 현대화 → 가장 큰 수혜\n• 트럼프 행정부 DOGE(정부 효율화) 프로젝트와 연계\n\n■ 법적·윤리적 논란\n\n• 대통령의 정책과 직결된 종목 개인 매수 → 내부정보 논란\n• STOCK Act(주식거래법) 의무 공시 대상\n• 민주당 의원 \"이해충돌\" 제기 예상\n\n■ 투자자 관점\n\n\"Don't underestimate the man's words(or trades).\" 트럼프의 개인 포트폴리오 변화는 향후 정책 방향을 선행하는 지표로 시장이 주목합니다.\n\n■ 결론\n\n트럼프의 NVDA·NOW 대규모 개인 매수는 AI 정책 수혜 종목의 최강 확인 신호입니다. AI 칩·엔터프라이즈 AI 소프트웨어 두 섹터 모두에 대한 행정부의 지원 기조가 지속될 것임을 시사합니다.",
    category:      "종목분석",
    categoryColor: "orange",
    subject:       "🏛️ 트럼프 (NVDA·NOW 공시)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:40",
    images:        ["/charts/trump-nvda.svg"],
  },

  {
    id:            "seed-024",
    title:         "ChatGPT 개인정보 집단소송 — Meta·Google 무단 공유 혐의",
    summary:       "OpenAI가 ChatGPT 사용자의 비공개 대화를 Meta(Facebook·Instagram)·Google Analytics에 무단 공유했다는 집단소송이 제기됐습니다. 광고 타겟팅 목적 사용이 핵심 혐의로, OpenAI의 규제 리스크가 확대되고 경쟁사 Anthropic·Gemini의 반사 수혜가 예상됩니다.",
    body:          "■ 소송 요지\n\n\"Sam Altman catching your private ChatGPT conversations to send to Meta and Google.\"\n\n• 피고: OpenAI / Meta(공동) / Google(공동)\n• 혐의: ChatGPT 비공개 대화를 광고 타겟팅 목적으로 Meta·Google에 무단 공유\n• 트래킹 기술 내장 — 사용자 동의 없이 데이터 추출\n\n■ 소송 상세\n\n• 사용자 개인 질문·민감한 대화·금융 계획·의료 정보·정치적 견해 수집\n• Facebook Pixel·Google Analytics 추적 공유 혐의\n• \"Responsible AI\" 표방하면서 반대로 행동\n• 집단(Class Action) → 피해자 수백만 명\n\n■ OpenAI의 입장\n\n아직 공식 입장 없음. 법무팀 대응 중.\n\n■ 시장 영향\n\n• OpenAI 기업가치 압박 ($157B 밸류에이션 의문)\n• IPO 일정에 리스크 변수 추가\n• 규제 강화 선제 압박 (미국·EU 동시)\n\n■ 경쟁사 반사 수혜\n\n• Anthropic (Claude): 프라이버시 우선 정책 강점\n• Google Gemini: 아이러니하게도 공동 피고이나 자체 AI 브랜딩 강화\n• Microsoft Copilot: 기업용 데이터 보호 계약 강점\n\n■ 결론\n\nOpenAI 소송은 단순 소송이 아닌 \"AI 프라이버시 규제\"의 실질적 시험대입니다. 프라이버시를 경쟁력으로 내세운 Anthropic과 애플의 온디바이스 AI 전략이 상대적으로 재평가받을 수 있습니다.",
    category:      "섹터",
    categoryColor: "red",
    subject:       "⚖️ OpenAI (소송·규제)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:25",
    images:        ["/charts/openai-lawsuit.svg"],
  },

  {
    id:            "seed-025",
    title:         "혼다 2040 완전 전기차 계획 철회 — 테슬라 독주 구조 강화",
    summary:       "Honda CEO가 2040년 완전 전기차 전환 목표를 공식 철회했습니다. \"이 목표를 달성하기 어렵다고 판단했다\"고 밝혔습니다. EV 수요 기대 미달·충전 인프라 부족·하이브리드 수요 급증이 원인입니다. 테슬라의 기술 해자는 더욱 강화됩니다.",
    body:          "■ CEO 공식 발표\n\n\"We have withdrawn this target. We have judged that it will be difficult to achieve.\"\n\n2040 완전 전기차 전환 목표 → 공식 철회\n\n■ 철회 배경\n\n1) EV 수요 기대 대비 실제 수요 미달\n2) 충전 인프라 구축 속도 지연\n3) 하이브리드 수요 예상 초과 급증\n4) 전기차 원가·가격 경쟁력 한계\n5) 중국 BYD 가격 전쟁 대응 불가\n\n■ 완성차 EV 목표 비교\n\n• Tesla: 이미 100% EV ✓\n• GM: 2035년 목표 (유지)\n• Ford: 2035년 목표 유럽 (유지)\n• VW: 2033년 유럽만 (하향 조정됨)\n• Honda: 2040 목표 ✗ 철회\n• Toyota: 하이브리드 중심 유지 (원래 회의적)\n\n■ 투자 시사점\n\n① 테슬라 수혜: 경쟁사 EV 포기 → 테슬라 독주 구조 강화\n② 하이브리드 부품주: 덴소·아이신·모비스 등 수혜\n③ 혼다 EV 투자 매력 저하 → 주가 압박 지속\n④ EV 충전 인프라: 수요 성장 둔화 → 밸류에이션 재점검\n\n■ 테슬라 기술 해자 강화\n\n\"완성차가 EV를 포기하면 테슬라의 기술적 해자는 더욱 강화된다.\"\n• 소프트웨어(FSD) 격차: 현재 3~5년\n• 배터리 원가: 경쟁사 대비 30~40% 저렴\n• 충전 네트워크(Supercharger): 업계 표준화 완료\n\n■ 결론\n\n혼다의 EV 철회는 테슬라의 독주를 더 오래 지속시키는 구조적 신호입니다. 단기적으로는 전체 EV 시장 성장에 의문을 제기하지만, 장기적으로는 테슬라만이 살아남는 시나리오를 강화합니다.",
    category:      "섹터",
    categoryColor: "orange",
    subject:       "🚗 혼다 (EV 철회·테슬라)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:20",
    images:        ["/charts/honda-ev.svg"],
  },

  {
    id:            "seed-022",
    title:         "테슬라 세미 × 캘리포니아 $10억 보조금 — 물류 혁명의 분기점",
    summary:       "Gavin Newsom 캘리포니아 주지사가 Tesla Semi 200대+ 도입에 $1B 보조금 프로그램을 공개했습니다. 디젤 트럭 대비 77% 운영비 절감, 대당 최대 $100,000 비용 절감 가능. 물류 대기업의 EV 전환 촉매가 될 전망입니다.",
    body:          "■ 프로그램 개요\n\n• 주도: Gavin Newsom 캘리포니아 주지사\n• 총 규모: $1B (10억 달러)\n• 초기 배정: $200M\n• 대상: Tesla Semi 200대 이상\n• 공공·민간 물류 기업 모두 적용\n\n■ 비용 절감 분석\n\n• 디젤 트럭: $0.256/마일\n• Tesla Semi: $0.059/마일\n• Tesla Semi + CA 보조금: $0.042/마일\n• 절감 비율: 약 77%\n\n• 대당 절감 총액: $30,000~$100,000 (주행 거리 따라)\n• 보조금 인센티브 포함 시 초기 비용 회수 기간 급감\n\n■ 왜 지금인가\n\n• 중국 전기차(BYD 등) 미국 진입 차단 → 테슬라 독점 수혜\n• CA 배출 규제 2035년 디젤 트럭 신규 등록 금지\n• 물류 기업 연간 유지비 수백만달러 절감 가능\n• Cybertruck 경찰 도입에 이은 정부 조달 시장 확대\n\n■ 수혜 기업\n\n• 테슬라: B2B 물류 시장 직접 공략 (기존 B2C 위주)\n• 캘리포니아 물류 대기업: Ryder, XPO, Werner\n• 전기 트럭 충전 인프라: ChargePoint, EVgo\n\n■ 중국 EV 표준 충돌\n\n참고: 중국에서 테슬라는 두 개의 별도 충전 포트를 가짐 (AC 전용·GB 국가 표준). 미국과 표준 상이 → 수출 제한, 테슬라 미국 내 독점 지위 강화.\n\n■ 결론\n\nCybertruck 경찰 도입에 이어 Tesla Semi CA 보조금은 테슬라의 정부 조달 시장 진입 교두보입니다. FSD·에너지·로봇택시에 이어 '물류 자율화' 사업이 새로운 성장축으로 부상하고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🚛 테슬라 (Semi·물류혁명)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:15",
    images:        ["/charts/tesla-semi-ca.svg"],
  },

  {
    id:            "seed-020",
    title:         "xAI Grok Build 출시 — Heavy 구독자 독점, AI 에이전트 코딩 시대",
    summary:       "일론 머스크의 xAI가 Grok Build early beta를 $300/월 SuperGrok Heavy 구독자에게 독점 출시했습니다. 병렬 서브에이전트, MCP 툴, 실시간 스트리밍, 헤드리스 모드 등을 탑재한 AI 코딩 에이전트입니다. Claude·Cursor·Windsurf와 정면 경쟁합니다.",
    body:          "■ Grok Build 핵심 기능\n\n\"BREAKING: xAI launches Grok Build early beta exclusively for SuperGrok Heavy subscribers.\"\n\n• AI 병렬 서브에이전트 (동시 다중 작업)\n• MCP(Model Context Protocol) 툴 지원\n• 실시간 스트리밍 워크플로우\n• 헤드리스 스크립팅 모드\n• 멀티에이전트 협업\n• 앱 빌딩·코딩 자동화\n\n■ 가격 구조\n\n• Free ($0): 기본 Grok 채팅\n• Plus ($30/월): 향상된 Grok 모델\n• Heavy ($300/월): Grok Build 독점 액세스\n→ Grok Build는 Heavy 전용 — 진입 장벽 존재\n\n■ 경쟁 포지션\n\n| 제품 | 가격 | 회사 |\n|---|---|---|\n| Grok Build | $300/월 | xAI |\n| Claude Pro | $20/월 | Anthropic |\n| Cursor Pro | $20/월 | Cursor |\n| Windsurf | $15/월 | Codeium |\n\n→ 가격이 10~20배 높으나 \"가장 강력한 에이전트\" 포지션 목표\n\n■ 투자 시사점\n\n• xAI 비상장 → TSLA 간접 수혜 (머스크 연결성)\n• 기업용 AI 코딩 시장: $50B+ 성장 예상\n• Anthropic·Microsoft Copilot 시장 점유율 압박\n• GPU 수요 증가 → NVDA 추가 수혜\n\n■ 결론\n\nGrok Build는 머스크의 AI 사업 확장에서 B2B 엔터프라이즈 개발자 시장 진입을 선언합니다. Heavy $300/월의 높은 가격 장벽은 오히려 \"전문 개발자 전용 프리미엄\" 포지셔닝 전략으로 읽힙니다.",
    category:      "섹터",
    categoryColor: "purple",
    subject:       "🤖 xAI·Grok Build (AI 코딩)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:10",
    images:        ["/charts/grok-build.svg"],
  },

  {
    id:            "seed-027",
    title:         "테슬라 기가상하이 4월 생산 3년 최고 — 배터리 특허·CA 세금혜택 삼중 호재",
    summary:       "기가상하이의 4월 2026년 생산량이 최근 3년 최고치를 기록했습니다. 동시에 테슬라는 배터리 대량 생산 원가 혁신 특허를 취득하고, 캘리포니아 세금 크레딧으로 가격 경쟁력을 강화하고 있습니다. BYD 경쟁에도 불구한 볼륨 회복 신호입니다.",
    body:          "■ 기가상하이 4월 생산량\n\n\"Tesla's April production in Giga Shanghai looks pretty good. According to the data, this year's production in Giga Shanghai is the highest in the last three years.\"\n\n• 4월 생산량: ~82,000대 (추정)\n• 최근 3년 최고치 달성\n• BYD·중국 로컬 경쟁 심화에도 볼륨 회복\n\n■ 배터리 특허 (원가 혁신)\n\n\"Tesla has filed a patent that is the key to massive cost reductions for battery manufacturing.\"\n\n• 4680 셀 생산 공정 대폭 단순화\n• 경쟁사 대비 30~40% 원가 절감 목표\n• 양산 적용 시 ASP 유지하면서 마진 개선\n\n■ 캘리포니아 세금 크레딧\n\n\"California tax credits allows Tesla to continue to lower prices for vehicles and maintain high margins.\"\n\n• 소비자: $7,500 세금 크레딧\n• 테슬라: 가격 인하 없이도 구매 유인 제공\n• 원가 절감 + 세금혜택 = 이중 가격 경쟁력\n\n■ 테슬라 반응 속도\n\n테슬라 세미 후방 카메라 반응 시간:\n• 70밀리초(ms) — 업계 최고 수준\n• 기존 대형 트럭 대비 10배+ 빠른 반응\n• FSD 기술의 트럭 적용 직결\n\n■ 결론\n\n기가상하이 생산 최고치 + 배터리 원가 특허 + CA 세금혜택의 삼중 호재는 테슬라의 2026년 Q2 실적 기대치를 높입니다. BYD와의 치킨게임에서 원가 우위로 살아남는 구조가 완성되고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏭 테슬라 (생산·원가혁신)",
    date:          "2026-05-15",
    updatedAt:     "2026.05.15 08:05",
    images:        ["/charts/tesla-gigashah.svg"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2026-05-14 리포트
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:            "seed-013",
    title:         "케빈 워시 연준의장 확정 — 파월 교체, 금리 경로 급변 시그널",
    summary:       "미 상원이 트럼프 지명 연준의장 후보 케빈 워시(Kevin Warsh)를 51표로 인준 확정했습니다. 파월 의장 임기 종료 후 워시가 뒤를 잇습니다. 워시는 상대적 매파로 분류돼 시장의 금리 인하 기대가 재조정될 수 있습니다.",
    body:          "■ 핵심 사실\n\n미 상원 51표 찬성으로 케빈 워시 연준의장 인준 확정. 현직 제롬 파월 의장 임기 종료 후 승계.\n\n■ 케빈 워시는 누구인가\n\n• 전 연준 이사 (2006~2011)\n• 금융위기 당시 연준 내 최연소 이사 역임\n• 월가(모건스탠리) 출신 → 시장 친화적 언어 구사\n• 그러나 인플레 억제 우선 성향 — 조기 금리 인하에 신중\n• 트럼프와 긴밀한 관계 — 규제 완화 기조 공유\n\n■ 시장 영향\n\n1) 단기 금리 인하 기대 재조정 — 워시 취임 초 긴축 유지 가능성\n2) 달러 강세 지속 압력 — 원/달러 상단 열려있음\n3) 성장주 밸류에이션 압박 재발 가능\n4) 금·실물자산: 인플레 장기화 헤지 수요 유지\n\n■ 파월 레거시\n\n파월은 코로나 제로금리 → 40년만 최고 인플레 → 공격적 긴축 → 연착륙 달성이라는 사이클을 마무리. 워시는 물가 2% 복귀 완성이라는 숙제를 떠안습니다.\n\n■ 결론\n\n워시 취임으로 연준 독립성 논란은 일단락되나, 금리 인하 기대를 앞당기는 전략은 재점검이 필요합니다. TLT·장기채 비중을 신중히 조절하세요.",
    category:      "매크로",
    categoryColor: "red",
    subject:       "🏛️ 연준 (Fed·금리)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    isPinned:      true,
    images:        ["/charts/fed-warsh.svg"],
  },

  {
    id:            "seed-014",
    title:         "Ron Baron — \"테슬라 10년 내 $2,500, 시총 $8.3조\" CNBC 직격 발언",
    summary:       "전설적 성장주 투자자 Ron Baron이 CNBC Squawk Box에서 \"지금은 테슬라를 살 때\"라고 선언했습니다. 향후 10년 내 주가 $2,000~$2,500을 전망하며, $2,500 달성 시 테슬라 시총은 약 $8.3조로 현재 대비 5.7배 성장한다고 밝혔습니다.",
    body:          "■ Ron Baron 발언 원문 (CNBC Squawk Box)\n\n\"Now is the time for Tesla. I think it's (the stock) going to be $2,000 or $2,500 over the next 10 years.\"\n\"At $2,500, that would make Tesla a roughly $8.3 trillion company, 5.7x higher than today.\"\n\n■ Ron Baron은 누구인가\n\n• Baron Capital 창업자·CEO — AUM $45B+\n• 테슬라 초기 주주: 투자원금 $1.7B → 현재 평가액 $15B+\n• Baron Capital 역사적 수익의 1/3($60B)이 일론 머스크 관련 투자에서 창출\n• SpaceX 지분도 보유 — 우주·AI 복합 베팅\n\n■ $2,500 시나리오의 근거\n\n1) FSD 구독·라이선싱 수익: 순수 소프트웨어 기업 수준 마진\n2) Cybercab 로봇택시: 2026년 하반기 텍사스·캘리포니아 상업 서비스\n3) 에너지 사업부: Megapack 수주 폭증, 고성장 지속\n4) Terrafab 칩 자립: 원가 절감 → 마진 개선\n5) Optimus 로봇: 2027~2028년 양산 → 새 수익원\n\n■ 테슬라 경찰 차량 전환 모멘텀\n\n미국 전역 다수의 경찰서가 가솔린 차량에서 테슬라 Cybertruck 전환 완료.\n• 테슬라 자체 계산기 기준: 대당 $2,100 절감\n• 전기차 유지비 $0.0587/마일 vs 가솔린 $0.2555/마일\n• 정부 조달 수요 → 안정적 B2B 매출 기반\n\n■ 리스크\n\n트럼프-머스크 관계 변화, FSD 규제 리스크, 중국 경쟁 심화, 금리 장기화 밸류에이션 압박.\n\n■ 결론\n\nRon Baron의 $2,500 콜은 FSD·로봇택시·에너지·로봇 4가지 성장 축을 바탕으로 합니다. 테슬라를 단순 전기차 기업이 아닌 AI+에너지+로보틱스 플랫폼으로 바라보는 프레임이 점차 주류가 되고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏎️ 테슬라 (Ron Baron·밸류에이션)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:27",
    isPinned:      true,
    images:        ["/charts/tesla-baron.svg"],
  },

  {
    id:            "seed-015",
    title:         "S&P 500 신고가 — 실적·광학통신·AI칩 수요 3중 모멘텀, 이란 리스크 병존",
    summary:       "S&P 500과 QQQ가 신고가를 경신했습니다. 이번 주 S&P 500 +0.96%, 시총 $350B 추가. 실적 시즌 74% EPS 상회, Cerebras IPO 가격 상향, Circle $694M 분기 매출. 단 US-이란 긴장·호르무즈 해협 리스크와 내일 발표될 CPI +3.7% 전망이 변수입니다.",
    body:          "■ 주간 시장 요약\n\n• S&P 500: 신고가 경신, 주간 +0.96%\n• QQQ: 동반 신고가 마감\n• 시총 증가: $350B (주간 기준)\n• 4월 26일 이후 지속 ATH 행진 (2019년 7월 이후 최장)\n\n■ 섹터별 동향\n\n1) 광학 네트워킹: LSCC(래티스 반도체), LITE(Lumentum), COHR(Coherent) AI 데이터센터 연결 테마로 급등\n2) AI 칩: Cerebras IPO 가격 범위 상향 — $80→$130/주 (AI 칩 수요 과열 신호)\n3) 스테이블코인: Circle(CRCL) 분기 매출 $694M +20% YoY — DeFi·스테이블코인 수요 강세\n\n■ 실적 시즌 현황\n\n• S&P 500 440개+ 기업 실적 완료\n• EPS 상회 비율: ~74% (역사적 평균 65% 상회)\n• 매출 성장률: 전년 대비 +5~7% 유지\n• Hims & Hers(HIMS): Q1 매출 $608M, 조정 EBITDA $62.3M, GLP-1 수요 견인\n\n■ 리스크 — US-이란 + CPI\n\n• 미국-이란 협상 미타결 → 호르무즈 해협 봉쇄 리스크 상존\n• CPI 발표 예정: +3.7% 전망 (2025년 1월 이후 최고)\n• 인플레 재상승 시 금리 인하 기대 추가 후퇴\n\n■ 결론\n\n실적·기술 모멘텀 강하나, CPI+이란 리스크가 단기 변수. 광학통신·AI칩 비중 점검하고 CPI 발표 전후 변동성에 대비하세요.",
    category:      "시장분석",
    categoryColor: "mint",
    subject:       "📊 S&P500 (ATH·실적시즌)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    images:        ["/charts/sp500-ath.svg"],
  },

  {
    id:            "seed-016",
    title:         "Meta AI — '가장 오해받는 메가캡', ARK의 역발상 분석",
    summary:       "ARK Investor Tracker가 Meta를 '가장 오해받는 메가캡(THE MOST MISUNDERSTOOD MEGACAP)'으로 지목했습니다. Meta의 $8B AI 광고 투자가 플랫폼 성장을 가속하는 반면, 러시아·이란 퇴출·규제 리스크에 가려 시장이 본질 가치를 저평가하고 있다는 분석입니다.",
    body:          "■ ARK 핵심 주장\n\n\"Meta: THE MOST MISUNDERSTOOD MEGACAP\"\nMeta가 AI 광고 플랫폼으로 변모하는 과정을 시장이 제대로 반영하지 못하고 있음.\n\n■ Meta AI 투자 현황\n\n• AI 광고 예산: $8B 투자 — 타겟팅 정밀도 혁신\n• AI Advantage+: 광고주 캠페인 자동화로 ROI 2배 개선\n• Ray-Ban 스마트 안경: AI 기반 웨어러블 시장 선점\n• Meta AI(LLaMA): 오픈소스 전략 → 개발자 생태계 확장\n• Threads: X(트위터) 대안으로 성장 가속\n\n■ '오해받는' 이유\n\n• 러시아: WhatsApp 차단 → 글로벌 사용자 이탈 우려\n• 이란·일부 국가: 플랫폼 접근 제한\n• 메타버스 투자 손실 트라우마 지속\n• 단, 이 모든 지역 제외해도 Meta 성장세 유지\n\n■ 경쟁 구도\n\n• 주요 경쟁자: Amazon(광고), Google(검색광고), Microsoft(기업 AI)\n• Meta의 차별점: 30억+ 소셜 그래프 기반 최고 정밀 광고\n• AI 추천 알고리즘이 평균 체류시간 +5~8% 증가\n\n■ 재무 지표\n\n• 시총: $1.4T+ (빅테크 중 밸류에이션 저렴한 편)\n• 광고 매출 성장률: +20%+ YoY\n• FCF: $50B+/년 → 자사주 매입 + AI 투자 동시 가능\n\n■ 결론\n\nARK의 역발상은 타당합니다. AI 광고 + 웨어러블 + 오픈소스 LLM 세 가지 축에서 Meta는 조용히 최강의 생태계를 구축 중입니다. META 주식은 빅테크 중 AI 전환 가장 빠른 기업 중 하나입니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "📘 Meta (AI·광고플랫폼)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    images:        ["/charts/meta-ai.svg"],
  },

  {
    id:            "seed-017",
    title:         "젠슨 황의 AI 역설 — \"방사선 전문의가 3000만 명 늘었다\"",
    summary:       "NVIDIA CEO 젠슨 황이 밝힌 AI 역설: 5년 전 'AI가 방사선 전문의를 대체한다'는 예측이 있었지만 오히려 방사선 전문의 수요가 폭증했습니다. AI는 인간 판단력의 수요를 배가시켰습니다. 이 통찰은 AI 투자에 새로운 프레임을 제시합니다.",
    body:          "■ 젠슨 황 발언 원문\n\n\"In five years, the world won't need any radiologists, because AI will be able to do it better at a fraction of the cost.\"\n\n그러나 실제 결과는:\n\"The number of radiologists has actually grown.\"\n\"The prediction was in fact that 30 million radiologists would be wiped out because of AI. But it's because the purpose of a radiologist is to provide accurate medical image analysis, and AI is augmenting those skills rather than replacing them.\"\n\n\"AI multiplies the demand for real human judgment.\"\n\n■ 왜 이런 일이 벌어졌나\n\n1) AI는 진단 속도·정확도를 높임 → 더 많은 환자 처리 가능\n2) 더 많은 환자 처리 → 방사선 전문의 수요 증가\n3) AI로 발견 가능한 질병 종류 확대 → 영상의학 시장 자체가 커짐\n4) AI 도구를 다룰 수 있는 의료 AI 전문가 수요 신규 창출\n\n■ 투자 시사점 — AI는 대체가 아닌 배가\n\n이 역설은 여러 산업에 적용됩니다:\n\n• 교육: AI 튜터 등장 → 교육자 수요 오히려 증가\n• 법률: AI 법률 검색 → 법무 전문가 업무 범위 확대\n• 금융: AI 퀀트 → 데이터 해석할 금융 전문가 수요 증가\n• 소프트웨어: AI 코딩 도구 → 개발자 생산성 10배 → 더 많은 개발 수요\n\n■ ARK Invest × Kaishi\n\nARK가 AI 이벤트·확률 분석 스타트업 'Kaishi'에 투자. \"AI가 만드는 새로운 투자 기회를 발굴하는 플랫폼\" — 이 역설을 활용한 사업 모델.\n\n■ NVIDIA 수혜 구조\n\n• AI 도구 확산 → 더 많은 인간 전문가 필요 → 더 많은 AI 컴퓨팅 필요 → NVIDIA 수요 무한 사이클\n• 의료 AI: GE Healthcare·Philips·Siemens NVIDIA GPU 도입 가속\n\n■ 결론\n\n\"AI가 인간을 대체한다\"는 단순 공포 논리에서 벗어나, \"AI가 인간의 역할을 얼마나 배가시키는가\"로 투자 시각을 전환해야 합니다. NVIDIA는 이 배가 효과의 핵심 인프라입니다.",
    category:      "특집",
    categoryColor: "purple",
    subject:       "🤖 AI 패러다임 (젠슨 황)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:25",
    images:        ["/charts/ai-paradox.svg"],
  },

  {
    id:            "seed-018",
    title:         "광학통신 폭발 — LITE·COHR·LSCC AI 데이터센터 수혜 랠리",
    summary:       "AI 데이터센터 연결 인프라 테마로 광학통신 섹터가 폭발적 모멘텀을 보이고 있습니다. Lumentum(LITE), Coherent(COHR), Lattice Semiconductor(LSCC)가 급등 중입니다. 광트랜시버·레이저·파이버 스위치 수요가 AI 클러스터 간 연결 병목을 해소하는 핵심 솔루션으로 부상했습니다.",
    body:          "■ 왜 지금 광학통신인가\n\nAI 클러스터(GPU 수천 대)에서는 GPU 간 통신 대역폭이 연산 속도만큼 중요합니다.\n• 기존 구리 케이블: 고속·장거리 전송 시 열 발생·신호 저하\n• 광통신(Optical): 빛으로 데이터 전송 → 저지연·고대역폭·저발열\n• GB200 NVL72 같은 대형 GPU 랙에서 광트랜시버가 필수 부품으로 자리잡음\n\n■ 섹터 내 핵심 종목\n\n• LITE (Lumentum Holdings):\n  - AI 데이터센터 광트랜시버, 레이저 광원 공급\n  - 마이크로소프트·구글·아마존 데이터센터 공급망 진입\n  - 최근 AI 인프라 테마 편입으로 랠리\n\n• COHR (Coherent Corp.):\n  - 광통신 전체 스택 (트랜시버·파이버·레이저·스위치)\n  - AI 칩 간 interconnect 핵심 공급업체\n  - 400G~800G 광트랜시버 시장 성장 직접 수혜\n\n• LSCC (Lattice Semiconductor):\n  - AI 데이터센터 연결성 테마에 새롭게 편입\n  - 저전력 FPGA — 광통신 제어 로직에 활용\n  - 엔터프라이즈 네트워킹 AI 전환 수혜\n\n■ 시장 규모\n\n• 글로벌 광트랜시버 시장: 2025년 $18B → 2028년 $42B (연평균 +32%)\n• AI 클러스터 1개(GB200 NVL72 랙 100대): 광트랜시버 8,000개+ 필요\n• NVIDIA Blackwell + GB300 확산으로 2026~2027년 수요 폭증 확실시\n\n■ 투자 전략\n\n• 직접 투자: LITE, COHR, LSCC 개별 매수\n• ETF: IGN(iShares 네트워킹 ETF), CIBR(사이버+통신)\n• 주의: 반도체 RSI 과매수 구간 — 분할 매수 권장\n\n■ 결론\n\n광학통신은 AI 인프라의 \"조용한 실력자\"입니다. GPU 수요가 꺾이지 않는 한 광통신 수요도 꺾이지 않습니다. AI 인프라 투자 포트폴리오에 광통신 섹터 비중을 점검하세요.",
    category:      "섹터",
    categoryColor: "mint",
    subject:       "🔆 광학통신 (LITE·COHR·LSCC)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    images:        ["/charts/optical-comm.svg"],
  },

  {
    id:            "seed-019",
    title:         "Jefferies 경고 — 반도체 47% 미스 전망, SOXX RSI 81 과매수 구간",
    summary:       "Jefferies가 반도체·하드웨어 종목의 47%가 다음 실적 시즌에서 예상치를 하회할 것으로 전망했습니다. SOXX ETF는 RSI 81.1로 2019년 7월 이후 최고 과매수 수준. 랠리 속 숨겨진 리스크를 점검합니다.",
    body:          "■ Jefferies 리포트 핵심\n\n\"47% of semis/hardware stocks set to miss earnings estimates.\"\n\n• SOXX(반도체 ETF) RSI: 81.1 — 2019년 7월 이후 최고치\n• 현재 RSI 수준은 5년 평균 대비 유의미하게 높음\n• ATH 이후 과매수 신호가 잇따라 발생 중\n\n■ 과매수 경고의 근거\n\n1) 밸류에이션 스트레치: AI 기대감으로 선행 PER 60~80배\n2) 수요 집중: NVDA·AMD 상위 2개사에 수요 집중 → 롱테일 종목 미스 위험\n3) 재고 사이클: 비AI 반도체(PC·스마트폰·자동차용) 재고 정상화 지연\n4) 관세 불확실성: 반도체 공급망 재편 비용 아직 미반영\n\n■ 취약 세그먼트\n\n• PC·모바일 반도체: 수요 회복 지연\n• 차량용 반도체: EV 판매 둔화\n• 메모리 DRAM(HBM 제외): 공급 과잉 우려\n• 소형 반도체 장비업체: 대형 TSMC 투자 축소 시 영향\n\n■ 강세 유지 세그먼트\n\n• AI 가속기: NVDA Blackwell, AMD MI300X — 수요 무한정\n• HBM 메모리: SK하이닉스 공급 부족 지속\n• 광통신 반도체: LITE, COHR, LSCC\n\n■ 투자 전략\n\n• SOXX 비중 과대 포트폴리오: 단기 차익 실현 고려\n• 보유 시: AI 직접 수혜 종목(NVDA, AVGO, AMAT)으로 집중\n• 주의 종목: RSI 70+ + 비AI 매출 비중 높은 반도체\n\n■ 결론\n\n반도체 랠리 전체가 끝난 것은 아닙니다. 단, AI 직접 수혜 → 광통신 → AI 장비로 이어지는 공급망 상위 종목과 낙수 효과를 기대하는 하위 종목 간 양극화가 심화될 것입니다. 종목 선별이 그 어느 때보다 중요합니다.",
    category:      "섹터",
    categoryColor: "red",
    subject:       "⚠️ 반도체 (SOXX 과매수·Jefferies)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    isPinned:      false,
    images:        ["/charts/soxx-rsi.svg"],
  },

];
