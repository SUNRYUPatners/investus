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
    alias: "여의도 독수리 #08",
    symbol: "NVDA",
    content:
      "팀원 하나가 오늘 아침 B200 공급 스케줄 확인하고 나서 갑자기 조용해졌음. 내부에서 보는 3Q 가이던스가 시장 컨센서스보다 훨씬 빡센데, 이게 서프라이즈 재료가 될지 역효과가 될지 아직 판단이 안 섬. 개인적으론 지금 NVDA 주가가 B200 리스크를 과소평가하고 있다고 봄.",
    likes: 89,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    liked: false,
  },
  {
    id: -13,
    alias: "강남 사자 #24",
    symbol: "TSLA",
    content:
      "내 개인 계좌 기준으론 테슬라 비중을 지난달 대비 절반으로 줄였음. FSD 마일당 개입 수치는 진짜 좋아졌는데 오스틴 파일럿 확장 속도가 예상보다 느려서. 공식 리포트엔 목표주가 그대로인데 솔직히 말하면 단기 가격 부담이 좀 있음. 260달러대 이상은 현 상황에서 안 사는 게 맞다고 봄.",
    likes: 74,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    liked: false,
  },
  {
    id: -12,
    alias: "서초 곰 #39",
    symbol: null,
    content:
      "시장이 연준 금리 인하를 2회로 보는데, 내부적으론 1회도 빠듯하다는 뷰가 우세함. PCE 다음 달 치 나오면 재반등 가능성 있고 그럼 지금 채권 포지션이 다 흔들림. 공식 전망은 낙관 유지하는데 개인 포트폴리오에서 달러 현금 비중은 슬금슬금 올리는 중. 10월 전까지는 조심스럽게 봄.",
    likes: 62,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    liked: false,
  },
  {
    id: -11,
    alias: "을지로 황소 #05",
    symbol: "AMZN",
    content:
      "AWS 클라우드 세그먼트 마진이 분기마다 50~100bps씩 올라오고 있는 거 시장이 제대로 안 보고 있음. 이 추세대로면 2027년 AWS 영업이익률 40% 돌파 가능한데, 그 시점에 AMZN 전체 밸류에이션 리레이팅이 다시 일어날 거임. 솔직히 지금 주가가 이 시나리오를 반도 안 반영했다고 생각함.",
    likes: 81,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    liked: false,
  },
  {
    id: -10,
    alias: "광화문 호랑이 #35",
    symbol: "AAPL",
    content:
      "어제 애플 개발자 콘퍼런스 관련 자료 세 개 보고 나서 뷰가 바뀌었음. AI 기능 온디바이스 전환 속도가 생각보다 훨씬 빠르고, 서비스 매출에 붙는 AI 프리미엄이 2026년부터 찍히기 시작할 것 같음. 하드웨어 사이클 우려보다 이게 더 중요한 포인트라는 생각. 개인적으론 비중 줄일 타이밍 아님.",
    likes: 55,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    liked: false,
  },
  {
    id: -9,
    alias: "마포 수리부엉이 #28",
    symbol: "PLTR",
    content:
      "팔란티어 섹터 7년 보면서 이렇게 상업 부문이 정부 부문을 역전한 분기는 처음임. 근데 문제는 이걸 정당화할 수 있는 매출 배수가 지금 40배인데, 역성장 한 번 나오면 그 배수 유지 자체가 논거를 잃음. 내부에서도 이 주가에서 추가 매수 의견 내는 사람은 솔직히 없음.",
    likes: 43,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    liked: false,
  },
  {
    id: -8,
    alias: "판교 사자 #22",
    symbol: "MSFT",
    content:
      "DCF 다시 돌려봤는데 Azure AI 기여분 포함하면 합리적인 타겟이 시장 컨센서스보다 15~20% 높게 나옴. 근데 그게 실적에 찍히려면 기업들 AI 도입 속도가 지금 추세를 유지해야 함. 솔직히 낙관론 쪽에 베팅하는 게 맞다고 보는데, 공식 리포트 숫자는 보수적으로 유지할 수밖에 없는 구조라서.",
    likes: 67,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    liked: false,
  },
  {
    id: -7,
    alias: "잠실 독수리 #41",
    symbol: "META",
    content:
      "지난 실적 발표 이후 3거래일째 조용한데 이게 오히려 좋은 신호임. 광고 단가 회복이 예상보다 빨라서 3Q 가이던스가 서프라이즈 나올 가능성 높음. 내부에선 Llama 비용 절감 효과가 내년부터 영업이익에 직접 찍힐 거라 보고 있음. 팀에서 메타 비중 소리 없이 올리는 중.",
    likes: 93,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    liked: false,
  },
  {
    id: -6,
    alias: "여의도 표범 #76",
    symbol: "AMD",
    content:
      "IR 쪽에서 흘러나오는 뉘앙스가 MI350 수요가 초기 채널 체크보다 강하다는 쪽임. NVDA 대비 30% 가격 메리트가 하이퍼스케일러한테 실제로 어필되고 있다는 거고. 공식 리포트엔 아직 안 냈지만 내부에서 AMD 타겟 올리는 얘기 나오고 있음. 빠르면 다음 분기 발표 전에 업데이트 나올 수 있음.",
    likes: 58,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString(),
    liked: false,
  },
  {
    id: -5,
    alias: "강남 올빼미 #85",
    symbol: "NVDA",
    content:
      "작년 같은 시기랑 비교하면 NVDA 밸류에이션 부담이 다른 성격임. 그때는 미래 수익 기대가 전부였는데 지금은 실제 데이터센터 수주가 쌓이고 있음. 근데 HBM 공급 병목이 3Q까지 해소 안 되면 수주가 매출로 전환되는 타이밍이 밀릴 수 있어서. 단기 조정 있어도 이상한 거 아님.",
    likes: 76,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
    liked: false,
  },
  {
    id: -4,
    alias: "서초 늑대 #58",
    symbol: null,
    content:
      "헤지 비율 지금 포트폴리오 대비 15%까지 올렸음. 이 정도 올린 게 22년 이후 처음. 매크로 숫자보단 금융시장 내부에서 뭔가 무르익는 느낌이 있어서. 신용 스프레드가 조금씩 벌어지는 게 눈에 띄고, VIX가 낮은데 실제 포지셔닝은 헤비한 구간이라 언제든 스파이크 나올 수 있음.",
    likes: 49,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString(),
    liked: false,
  },
  {
    id: -3,
    alias: "을지로 팔콘 #16",
    symbol: "TSLA",
    content:
      "모두가 베어리시한 게 오히려 카운터 시그널 같다는 생각도 드는데, 진짜 문제는 EV 침투율이 둔화된 게 일시적인지 구조적인지 판단이 안 선다는 거임. 공식 리포트엔 '하반기 회복' 썼는데 솔직히 반신반의임. 사이버캡 이야기가 주가 버티게 해주는 거지, 본업 모멘텀만 보면 쉽지 않음.",
    likes: 37,
    comments: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    liked: false,
  },
  {
    id: -2,
    alias: "광화문 곰 #52",
    symbol: "AAPL",
    content:
      "인도 생산 실질 비중이 아직 5%대인데 뉴스는 30%짜리 스토리처럼 쏟아짐. 리포트에 크게 쓰는 이유는 투자자들이 듣고 싶어하는 얘기이기 때문. 근데 중국 의존도 진짜 해소는 2028년 이전엔 어렵다고 봄. 단기 재료로 움직이면 거기서 팔 생각이고, 장기 보유 관점에선 인도 스토리보다 서비스 마진 구조가 훨씬 중요함.",
    likes: 61,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    liked: false,
  },
  {
    id: -1,
    alias: "판교 호랑이 #84",
    symbol: "NVDA",
    content:
      "공식 리포트엔 목표주가 140달러 유지하는데, 내부에선 B200 양산 본격화되면 160 이상 봐야 한다는 뷰가 우세함. 컨센서스 너무 튀면 나중에 부담이라서 못 올리는 거지. 데이터센터 수요가 공급을 계속 앞서는 구조에서 밸류 조정만 보고 팔면 손 놓는 거라고 봄. 팀에서 개인 계좌 산 사람 꽤 됨.",
    likes: 97,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    liked: false,
  },
];

export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {
  [-14]: [
    {
      alias: "서초 독수리 #27",
      content: "B200 공급 일정 확인하고 나서 조용해지는 거 팀에서도 봤음. 3Q 가이던스 들어오면 재료가 될 수 있어서 지금 들어가긴 부담스러운 구간이기도 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      alias: "을지로 콘도르 #88",
      content: "리스크 과소평가 맞는 말임. B200 양산 지연 시나리오 아직 주가에 반영 안 됐다고 보는 게 맞고, 그게 단기 하방 재료가 될 수 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
  ],
  [-13]: [
    {
      alias: "서초 매 #64",
      content: "260달러 이상 안 산다는 거 공감. FSD 수치 개선이 주가에 선반영된 구간에선 잠깐 숨 고르는 게 낫다고 봄.",
      created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      alias: "광화문 매 #04",
      content: "비중 줄인 거 맞는 판단인 것 같음. 오스틴 파일럿 확장 속도 데이터 나오기 전까지는 풀포지션이 부담스러운 구간임.",
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
  ],
  [-12]: [
    {
      alias: "잠실 황소 #95",
      content: "10월 전에 CPI 한 번 더 나오는 타이밍이 변수. 그 전까지는 방어적으로 가는 게 맞는 것 같음. 달러 비중 올리는 거 나도 동의.",
      created_at: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
    },
    {
      alias: "마포 팔콘 #57",
      content: "연준 인하 1회도 빠듯하다는 뷰가 내부에서도 점점 세지고 있음. 공식 전망 업데이트 전에 포지션 조정하는 게 선제적으로 맞다고 봄.",
      created_at: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    },
  ],
  [-11]: [
    {
      alias: "여의도 황소 #51",
      content: "AWS 마진 개선 추세 보면 2027 타겟이 지금 컨센서스보다 훨씬 보수적인 거 맞음. 이 구간 AMZN 들고 가는 게 맞다고 봄.",
      created_at: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    },
    {
      alias: "판교 곰 #66",
      content: "밸류에이션 리레이팅 시나리오 동의하는데, 그 전에 AWS 성장률 둔화 구간 한 번 더 나올 수 있어서 단기 진입은 신중하게 봐야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    },
  ],
  [-10]: [
    {
      alias: "강남 여우 #13",
      content: "AI 기능 온디바이스 전환 속도 빠른 거 맞음. 서비스 매출 붙는 AI 프리미엄이 찍히기 시작하면 그 분기가 진짜 재평가 트리거될 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2 - 1000 * 60 * 20).toISOString(),
    },
  ],
  [-9]: [
    {
      alias: "잠실 여우 #17",
      content: "AIP 상업 부문 역전 진짜 의미있는 건데, 40배 PSR이 이걸 정당화하려면 성장 유지가 전제조건. 한 분기 삐끗하면 멀티플 꺾임 빠르게 올 수 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 4 - 1000 * 60 * 20).toISOString(),
    },
    {
      alias: "을지로 표범 #43",
      content: "내부에서 추가 매수 의견 없다는 거 솔직히 읽힘. 공식 리포트 목표주가 올리려면 성장 가속 확인이 먼저라는 거 맞음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3 - 1000 * 60 * 40).toISOString(),
    },
  ],
  [-8]: [
    {
      alias: "판교 표범 #37",
      content: "DCF 넣어보면 Azure AI 기여 포함 시 타겟 차이 나는 거 맞음. 보수적 숫자 낼 수밖에 없는 구조가 나중에 서프라이즈 재료가 되는 방식임.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6 - 1000 * 60 * 30).toISOString(),
    },
    {
      alias: "광화문 늑대 #69",
      content: "기업 AI 도입 속도 유지 전제라는 건데, 지금까지는 예상보다 빠르게 가고 있어서 낙관론 베팅이 합리적으로 보임.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
  ],
  [-7]: [
    {
      alias: "여의도 콘도르 #19",
      content: "메타 광고 단가 회복 속도 보면 3Q 서프라이즈 가능성 진짜 있음. Llama 비용 절감 효과가 영업이익에 찍히기 시작하면 그게 추가 랠리 트리거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    },
    {
      alias: "잠실 콘도르 #53",
      content: "팀에서 메타 비중 올리는 거 알고 있었음. 광고 단가 회복 데이터 보면 충분히 근거 있는 판단이라고 봄.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8 - 1000 * 60 * 30).toISOString(),
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "Llama 오픈소스 전략이 클라우드 비용 절감에 직결되는 거라 규모 커질수록 마진 레버리지가 엄청남. 내년 숫자가 기대됨.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 7 - 1000 * 60 * 15).toISOString(),
    },
  ],
  [-6]: [
    {
      alias: "강남 팔콘 #62",
      content: "MI350 수요 채널 체크 결과 긍정적이라는 거 들었음. NVDA 대비 가격 메리트가 실제 계약으로 연결되는 사례 있으면 타겟 업 재료 됨.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
  ],
  [-5]: [
    {
      alias: "마포 황소 #11",
      content: "NVDA 밸류에이션 성격 달라진 거 맞음. 수주 기반이 생겼으니까. 근데 HBM 병목 해소 타이밍이 실적 전환 시점을 결정한다는 거 간과하면 안 됨.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    },
    {
      alias: "을지로 사자 #77",
      content: "단기 조정 있어도 이상하지 않다는 거 동의. 코스트 기반 없이 들어간 사람들 물량 소화 구간 나올 수 있어서 천천히 봐야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 14 - 1000 * 60 * 20).toISOString(),
    },
  ],
  [-4]: [
    {
      alias: "판교 늑대 #09",
      content: "헤지 15%까지 올린 거 올해 들어 가장 수비적인 포지션이라는 거잖아. 신용 스프레드 벌어지는 거 나도 보고 있음. VIX 낮은 게 오히려 방심하게 만드는 구간임.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    },
    {
      alias: "잠실 매 #78",
      content: "VIX 낮은 구간에서 스파이크 나오면 레버리지 물린 사람들 청산 물량이 증폭시키는 거라 단기 낙폭이 예상 외로 클 수 있음. 헤지 올리는 거 타이밍 맞다고 봄.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString(),
    },
  ],
  [-3]: [
    {
      alias: "강남 호랑이 #47",
      content: "EV 침투율 둔화가 구조적인지 판단이 진짜 핵심임. 지금 뷰는 일시적으로 가는 쪽이 많은데, 중국 경쟁 강도 보면 구조적 가능성도 배제 못함.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString(),
    },
  ],
  [-2]: [
    {
      alias: "여의도 매 #33",
      content: "인도 5%대 비중 맞음. 뉴스 스케일과 실제 비중 갭이 큰 거 아는데도 쓰는 건 투자자 니즈 때문이지. 장기는 유효하니까 분리해서 봐야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      alias: "마포 올빼미 #73",
      content: "서비스 마진 구조가 더 중요하다는 거 맞음. 하드웨어 사이클 우려로 팔면 서비스 성장 수혜를 다 날리는 거라서, 장기 관점에서 인도 스토리는 부수적인 재료임.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 23 - 1000 * 60 * 30).toISOString(),
    },
  ],
  [-1]: [
    {
      alias: "을지로 팔콘 #16",
      content: "공식 목표주가랑 내부 뷰 갭이 크다는 거 공감. 컨센서스 튀는 게 부담인 구조에서 서프라이즈 재료 쌓이는 거임. 개인 계좌 산 거 맞는 타이밍 같음.",
      created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
      alias: "강남 올빼미 #85",
      content: "데이터센터 수요 공급 앞서는 구조 당분간 안 꺾임. B200 양산 본격화 시점이 다음 주가 점프 트리거가 될 거라 보고 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      alias: "잠실 황소 #95",
      content: "160 이상 타겟 내부에서 나오는 거 맞음. 공식 발표 늦어지는 것뿐이고 실제 수요 데이터가 계속 확인되면 업데이트 나올 수밖에 없음.",
      created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
  ],
};
