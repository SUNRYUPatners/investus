export type AnalystMockPost = {
  id: number;
  alias: string;
  content: string;
  symbol: string | null;
  likes: number;
  comments: number;
  created_at: string;
  liked: boolean;
};

export type AnalystMockComment = {
  alias: string;
  content: string;
  created_at: string;
};

// Negative IDs so they never collide with real Supabase IDs (which start at 1)
export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [
  {
    id: -14,
    alias: "광화문 매 #91",
    symbol: "AMZN",
    content:
      "Anthropic $45B ARR 수치 보고 팀에서 한 번 술렁였음. 공식 리포트엔 'Anthropic 성장이 AWS AI 수익에 긍정적'이라고만 썼는데, 솔직히 이 성장 속도면 내부 모델 전면 수정해야 할 수준. AWS AI 매출 추정치가 너무 보수적이었던 거 맞는 것 같아. AMZN 비중 슬금슬금 늘리는 중.",
    likes: 82,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    liked: false,
  },
  {
    id: -13,
    alias: "여의도 콘도르 #27",
    symbol: "TSLA",
    content:
      "Cybercab 165Wh/mile 수치 공식 확인됐는데, 내부에서 이게 로보택시 유닛 이코노믹스 게임체인저라는 거 인정하는 분위기. 리포트 목표주가 올리는 거 눈치 보여서 못 하고 있지만 개인적으로는 지금 주가가 Cybercab 수익화를 0%로 보는 가격이라 생각함. 분할 매수 중.",
    likes: 71,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 72).toISOString(),
    liked: false,
  },
  {
    id: -12,
    alias: "강남 수리부엉이 #63",
    symbol: "NVDA",
    content:
      "Rubin Ultra 576GB HBM 확정 수치 보고 2027 타겟 모델 다시 짰음. 솔직히 HBM 용량 폭발이 NVDA 단가에 미치는 영향을 시장이 제대로 안 보고 있는 것 같아. GPU 한 장 가격이 올라가도 수요는 줄 기미 없고. 우리 팀 내부 2027 NVDA 타겟 공식 발표보다 꽤 높음.",
    likes: 93,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    liked: false,
  },
  {
    id: -1,
    alias: "여의도 독수리 #42",
    symbol: "NVDA",
    content:
      "NVDA 솔직히 현재 밸류 부담스럽다. H200 수요는 실제인데 TSMC 패키징 병목이 3Q까지 발목잡을 거임. 공식 리포트엔 못 쓰는 얘기지만 단기 조정 구간 봐야 할 수 있음. 130달러 초반 들어가는 게 맞다고 생각함.",
    likes: 61,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    liked: false,
  },
  {
    id: -2,
    alias: "강남 황소 #17",
    symbol: "TSLA",
    content:
      "FSD 벨기에 승인이 뉴스에선 호재처럼 나왔는데, EU 전역 확산까지 규제 허들 아직 몇 개 더 있음. 리포트 낼 때 쿠션 넣어서 쓰는 거지 내부적으론 상용화 1년 이상 보는 뷰가 많아. SpaceX 합병은 진짜로는 반반 보고 있고.",
    likes: 44,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    liked: false,
  },
  {
    id: -3,
    alias: "서초 곰 #61",
    symbol: null,
    content:
      "하반기 금리 인하 베팅이 시장에 과도하게 반영된 느낌. 이란 합의 불발이나 CPI 재반등 시 단기 충격 올 수 있음. 공식 전망엔 낙관론 유지하되 개인 포트폴리오에선 현금 비중 높이는 중. 9~10월 변동성 재료 있을 것 같음.",
    likes: 78,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    liked: false,
  },
  {
    id: -4,
    alias: "을지로 여우 #83",
    symbol: "AAPL",
    content:
      "애플 인도 생산 확대 발표 계속 나오는데 실질 비중이 아직 5%대임. 미중 갈등 헤지 스토리로 팔기 좋아서 리포트엔 크게 쓰지만 중국 의존도 해소는 5년 이상 걸림. 근데 인도 성장 스토리 자체는 진짜라 장기엔 유효함.",
    likes: 35,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    liked: false,
  },
  {
    id: -5,
    alias: "광화문 올빼미 #29",
    symbol: "PLTR",
    content:
      "팔란티어 정부 계약 디테일 보면 AIP 실제 확장 속도가 IR에서 말하는 것보다 느림. 상업 부문이 받쳐주고 있어서 주가는 버티는데, 40배 PSR은 모멘텀 둔화 감안하면 부담. 공식 목표주가 올릴 수 없는 이유가 있음.",
    likes: 29,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    liked: false,
  },
  {
    id: -6,
    alias: "여의도 표범 #55",
    symbol: "KOSPI",
    content:
      "코스피 외국인 수급이 관건인데 달러 강세 구간엔 결국 빠질 수밖에 없음. 2,700선 지지 보는 시각 많은데 내부적으론 반신반의. 반도체가 버텨주는 게 유일한 안전판인데 삼전 실적 모멘텀 둔화되면 그것도 흔들릴 수 있음. 공식 리포트엔 낙관론 유지하는 중.",
    likes: 52,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    liked: false,
  },
  {
    id: -7,
    alias: "마포 늑대 #38",
    symbol: "KOSDAQ",
    content:
      "코스닥 바이오 섹터 거품 아직 많음. 임상 실패 확률 제대로 안 알리고 목표주가 뻥튀기하는 관행이 여전히 있어. 개인들이 제일 많이 당하는 구간. 모멘텀 장세엔 단기 수익 나지만 파이프라인 없는 곳은 언제든 터질 수 있음. 조심해.",
    likes: 67,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    liked: false,
  },
  {
    id: -8,
    alias: "서초 사자 #71",
    symbol: "NVDA",
    content:
      "NVDA 진짜 솔직히 말하면 우리 팀 내부에서 목표주가 계속 올리고 싶은데 보수적으로 잡는 거임. 컨센서스 너무 튀면 괜히 나중에 부담이라서. 근데 실제로는 데이터센터 수요 상상 이상이고, B200 양산 가면 숫자가 또 한 번 점프함. 내가 개인 계좌 산 이유 있어.",
    likes: 89,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString(),
    liked: false,
  },
  {
    id: -9,
    alias: "강남 호랑이 #44",
    symbol: "TSLA",
    content:
      "테슬라 로보택시 얘기를 리포트엔 '검토 중' 수준으로 쓰는데, 사실 오스틴 파일럿 지표 내부에서 보면 생각보다 훨씬 빠름. FSD 마일당 개입 수가 1년 전 대비 10분의 1 수준. 이게 진짜 상용화 임박 신호인지는 아직 모르겠지만, 시장이 알면 주가 반응 클 거라 조심스럽게 보고 있음.",
    likes: 74,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    liked: false,
  },
  {
    id: -10,
    alias: "을지로 독수리 #19",
    symbol: null,
    content:
      "솔직히 요즘 AI 인프라 투자 ROI 논란 많은데, 현장에서 보면 기업들이 AI 쓰고 나서 진짜 비용 절감 되는 곳들 있음. 법무팀, 재무분석 쪽에서 특히. 근데 이게 아직 매출로 안 잡혀서 숫자로 보여주기 어려운 거지. 2027년쯤 되면 P&L에 찍히기 시작할 것 같음. 그때가 진짜 2차 랠리.",
    likes: 61,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    liked: false,
  },
  {
    id: -11,
    alias: "광화문 곰 #33",
    symbol: "AAPL",
    content:
      "애플 인도 팩토리 얘기 많은데 그거 말고, 애플 금융 서비스 — 애플카드, 애플페이 수수료 스트림이 조용히 엄청나게 커지고 있음. 지금 하드웨어 마진 스트레스 받는 구간에서 이게 버퍼 역할 톡톡히 함. 리포트엔 Services 한 줄로 뭉뚱그리는데, 이 안에 숨어있는 금융 수익 진짜 클 거야.",
    likes: 55,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    liked: false,
  },
];

export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {
  [-14]: [
    {
      alias: "서초 독수리 #14",
      content: "맞아. AWS 내부 가이던스도 Anthropic 기여분 따로 떼서 보면 진짜 숫자 크더라. 리포트에 못 넣는 게 아쉬울 정도.",
      created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      alias: "마포 매 #07",
      content: "AMZN 4Q 실적 때 AWS AI 분리 공시 나오면 그때 진짜 재평가 시작될 것 같음. 미리 들어가는 게 맞는 타이밍.",
      created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
  ],
  [-13]: [
    {
      alias: "을지로 콘도르 #52",
      content: "Cybercab 마일당 원가가 Waymo 대비 얼마나 낮은지가 핵심인데, 165Wh 수치면 충분히 경쟁력 있음. 분할매수 나도 동의.",
      created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      alias: "강남 팔콘 #31",
      content: "로보택시 수익화 0% 반영 맞는 말이긴 한데, 시장 특성상 이 스토리가 한번 불붙으면 오버슈팅 심할 거라 조심스럽긴 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    },
  ],
  [-12]: [
    {
      alias: "여의도 올빼미 #88",
      content: "HBM4 전환 속도도 변수임. SK하이닉스 캐파 얼마나 빠르게 따라가느냐가 NVDA 단가 유지의 키.",
      created_at: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
    },
    {
      alias: "광화문 수리부엉이 #22",
      content: "2027 타겟 공개 수치랑 내부 수치 갭이 얼마나 되는지 궁금하긴 함. 공식 발표 나올 때 서프라이즈 폭이 관건이겠지.",
      created_at: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    },
    {
      alias: "서초 독수리 #14",
      content: "Rubin Ultra 576GB는 진짜 게임체인저. LLM 학습에 필요한 VRAM이 모델 사이즈 커질수록 폭발적으로 늘어나니까 수요 안 꺾임.",
      created_at: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
  ],
  [-1]: [
    {
      alias: "을지로 매 #61",
      content: "TSMC CoWoS 병목 맞아. 3Q 양산 물량 확보 못하면 단기 실적 서프라이즈 기대하기 어려움. 130달러 초반 기다리는 전략 공감.",
      created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      alias: "마포 황소 #49",
      content: "단기 조정은 있을 수 있는데 매크로 악화 없으면 저점 매수 기회라고 봄. 130 초반이면 나도 들어갈 것 같음.",
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
  ],
  [-2]: [
    {
      alias: "여의도 팔콘 #18",
      content: "EU 규제 허들 생각보다 높음. 독일 TÜV 인증에만 몇 달 걸릴 수 있어서 2025년 내 상용화는 낙관론이고, 내부적으로도 2026 봄 이후로 보는 뷰 많음.",
      created_at: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
  ],
  [-3]: [
    {
      alias: "광화문 곰 #33",
      content: "9~10월 CPI 재반등 시나리오 진짜 무시 못함. 현금 비중 올리는 거 나도 같은 생각. 단기 변동성 장세 대비 필요.",
      created_at: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    },
    {
      alias: "강남 여우 #74",
      content: "연준 인하 기대가 선반영된 구간에서 섣불리 롱 잡기 부담스럽긴 함. 리스크 관리 먼저라는 거 동의.",
      created_at: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    },
  ],
  [-4]: [
    {
      alias: "을지로 사자 #03",
      content: "인도 실질 비중 5%대 맞는 얘기. 뉴스는 크게 나오는데 실제 생산라인 전환은 느림. 장기 스토리로는 유효하지만 단기 재료는 아님.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2 - 1000 * 60 * 30).toISOString(),
    },
  ],
  [-5]: [
    {
      alias: "서초 늑대 #66",
      content: "AIP 정부 계약 확장 속도가 IR 말만큼 안 나오는 거 나도 느낌. 상업 부문이 받쳐주는 동안엔 괜찮지만 그것도 한계 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
    {
      alias: "마포 올빼미 #41",
      content: "40배 PSR에서 모멘텀 둔화면 멀티플 리레이팅 리스크가 큼. 단기 트레이딩은 몰라도 장기 보유는 진입 타이밍 신중하게 봐야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3 - 1000 * 60 * 20).toISOString(),
    },
  ],
  [-6]: [
    {
      alias: "강남 표범 #57",
      content: "삼성전자 실적 모멘텀 꺾이면 외국인 이탈 가속화될 수 있음. 2700선 지지 진짜 반신반의하는 거 공감. 방어적으로 가는 게 맞는 것 같음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    },
  ],
  [-7]: [
    {
      alias: "을지로 늑대 #28",
      content: "바이오 섹터 임상 실패율 공시 제대로 안 되는 거 진짜 문제임. 개인 투자자 보호 측면에서 공시 강화 필요한데 당분간은 기대하기 어렵고.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    },
    {
      alias: "광화문 팔콘 #92",
      content: "코스닥 모멘텀 장세에서 단기 수익 노리는 개인들 많은데, 파이프라인 없는 곳 올라탔다가 임상 실패 공시 뜨면 그날로 끝. 조심해야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8 - 1000 * 60 * 30).toISOString(),
    },
  ],
  [-8]: [
    {
      alias: "여의도 수리부엉이 #15",
      content: "컨센서스 보수적으로 잡는 거 이해는 되는데, 실제 수요 반영 안 된 타겟이 나중에 업사이드 서프라이즈 재료가 되는 거잖아. 개인 계좌 산 거 맞는 판단인 것 같음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
      alias: "강남 독수리 #36",
      content: "B200 양산 타이밍이 생각보다 앞당겨질 수 있다는 얘기 들었음. 그게 되면 진짜 숫자 점프하겠지.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
    },
    {
      alias: "마포 사자 #80",
      content: "데이터센터 수요 상상 이상이라는 거 현장에서도 확인됨. 하이퍼스케일러들 CAPEX 계획 보면 NVDA 공급이 오히려 병목일 수준.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 10 - 1000 * 60 * 45).toISOString(),
    },
  ],
  [-9]: [
    {
      alias: "서초 호랑이 #59",
      content: "FSD 개입 빈도 10분의 1 수준이면 진짜 임박 신호 맞을 수 있음. 규제 승인만 따라와주면 주가 반응 클 거라는 거 동의.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    },
    {
      alias: "을지로 콘도르 #52",
      content: "오스틴 파일럿 데이터 시장에 알려지면 단기 급등 가능성 있음. 근데 규제 리스크가 변수라 풀포지션은 부담.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 14 - 1000 * 60 * 20).toISOString(),
    },
  ],
  [-10]: [
    {
      alias: "광화문 독수리 #47",
      content: "법무팀 AI 활용 ROI 진짜임. 계약서 검토 시간 80% 줄었다는 사례 직접 봤음. 2027 P&L 반영 시작되면 주가 재평가 트리거될 거라는 거 동의.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
    },
  ],
  [-11]: [
    {
      alias: "강남 곰 #23",
      content: "애플카드 연체율 관리가 변수이긴 한데 전체 금융 서비스 마진 구조 보면 하드웨어 대비 월등함. Services 세분화 공시 안 하는 게 의도적인 것 같음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
    },
    {
      alias: "여의도 매 #76",
      content: "애플페이 수수료 스트림 조용히 커지는 거 맞음. 특히 아시아 시장에서 침투율 빠르게 올라오고 있어서 장기엔 진짜 큰 수익원 될 것 같음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 22 - 1000 * 60 * 30).toISOString(),
    },
  ],
};
