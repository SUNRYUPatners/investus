// 종토방 게시글 — 리포트 업데이트할 때 같이 추가하세요
// createdAt: Unix 타임스탬프(ms) — 실제 경과 시간 표시에 사용
//
// 기준 타임스탬프
// 2026-05-18 08:00 KST = 1779058800000 ms
// 2026-05-15 08:00 KST = 1778799600000 ms
// 2026-05-14 08:00 KST = 1778713200000 ms

export type Post = {
  id:           number;
  symbol:       string;
  nickname:     string;
  holdingLabel: string;
  content:      string;
  createdAt:    number; // Unix ms
  likes:        number;
  comments:     number;
};

export type Comment = {
  id:           number;
  nickname:     string;
  holdingLabel: string;
  content:      string;
  createdAt:    number; // Unix ms
  likes:        number;
};

const T7JL = 1783378800000; // 2026-07-07 08:00 KST
const T6JL = 1783292400000; // 2026-07-06 08:00 KST
const T4JL = 1783119600000; // 2026-07-04 08:00 KST
const T3JL = 1783033200000; // 2026-07-03 08:00 KST
const T2JL = 1782946800000; // 2026-07-02 08:00 KST
const T1JL = 1782860400000; // 2026-07-01 08:00 KST
const T30J = 1782774000000; // 2026-06-30 08:00 KST
const T26J = 1782428400000; // 2026-06-26 08:00 KST
const T25J = 1782342000000; // 2026-06-25 08:00 KST
const T24J = 1782255600000; // 2026-06-24 08:00 KST
const T23J = 1782169200000; // 2026-06-23 08:00 KST
const T22J = 1782082800000; // 2026-06-22 08:00 KST
const T20J = 1781910000000; // 2026-06-20 08:00 KST
const T19J = 1781823600000; // 2026-06-19 08:00 KST
const T18J = 1781737200000; // 2026-06-18 08:00 KST
const T17J = 1781650800000; // 2026-06-17 08:00 KST
const T16J = 1781564400000; // 2026-06-16 08:00 KST
const T15J = 1781478000000; // 2026-06-15 08:00 KST
const T13J = 1781305200000; // 2026-06-13 08:00 KST
const T12J = 1781218800000; // 2026-06-12 08:00 KST
const T11J = 1781132400000; // 2026-06-11 08:00 KST
const T10J = 1781046000000; // 2026-06-10 08:00 KST
export const LATEST_UPDATE = T7JL;       // NEW 배지 기준
const T29 = 1780009200000; // 2026-05-29 08:00 KST
const T28 = 1779922800000; // 2026-05-28 08:00 KST
const T27 = 1779836400000; // 2026-05-27 08:00 KST
const T26 = 1779750000000; // 2026-05-26 08:00 KST
const T23 = 1779490800000; // 2026-05-23 08:00 KST
const T22 = 1779404400000; // 2026-05-22 08:00 KST
const T21 = 1779318000000; // 2026-05-21 08:00 KST
const T20 = 1779231600000; // 2026-05-20 08:00 KST
const T19 = 1779145200000; // 2026-05-19 08:00 KST
const T18 = 1779058800000; // 2026-05-18 08:00 KST
const T15 = 1778799600000; // 2026-05-15 08:00 KST
const T14 = 1778713200000; // 2026-05-14 08:00 KST

const m = (n: number) => n * 60_000;
const h = (n: number) => n * 3_600_000;
const d = (n: number) => n * 86_400_000;

export const MOCK_POSTS: Post[] = [

  // ════════════════════════════════════════════════════════════════════════
  // 2026-07-07 — TSLA FSD v14Lite LA→Vegas·Austin 로보택시 20일 데이터·
  //              Cybercab vs Waymo·MS 1500대 예측·SPCX NASDAQ100·
  //              MSFT AI 해고·Tepper TSLA 매수·Optimus 중국 대량생산·
  //              MU DRAM AI 낙관론·UK 2위·기가텍사스 신형컬러
  // ════════════════════════════════════════════════════════════════════════

  // FSD v14 Lite — LA → Las Vegas ──────────────────────────────────────
  { id: 443, symbol: "TSLA", nickname: "익명_2841", holdingLabel: "1200주 보유",
    content: "FSD v14 Lite가 LA에서 라스베가스까지 5시간 완전 무개입. 편도 430km 고속도로+도심 복합 코스를 단 한 번도 안 잡았다는 게 진짜야. 지금까지 장거리 FSD는 '가끔 끊기지만 그래도 대단해' 수준이었는데 5시간 무개입이면 이제 다른 이야기야. HW3에도 v14 Lite 배포 시작됐다는데 400만대 차량이 다 이 수준 되면 구독 전환율 어마어마하게 올라가겠다.",
    createdAt: T7JL + 7*60_000, likes: 2456, comments: 6 },
  { id: 444, symbol: "TSLA", nickname: "익명_5673", holdingLabel: "380주 보유",
    content: "어제 유튜브 영상 직접 봤는데 합류 구간·터널·교차로 전부 완벽했어. 고속도로 공사구간도 자연스럽게 차선 변경하더라. v14 Lite가 Lite면 v14 풀버전은 어떤 수준인 거야. 웨이모가 도심 한 구역 커버하는 동안 테슬라는 고속도로 장거리까지 커버. 밸류에이션 갭이 좁혀질 수밖에 없는 구조야.",
    createdAt: T7JL + 28*60_000, likes: 1834, comments: 5 },

  // Austin 로보택시 20일 히트맵 ────────────────────────────────────────
  { id: 445, symbol: "TSLA", nickname: "익명_7192", holdingLabel: "650주 보유",
    content: "오스틴 20일 운행 데이터 지오펜스 이탈 0건 확정. Lamar Blvd 45회, Riverside 30회, Airport Blvd 24회. 상업지구·공항 허브 집중 커버리지가 딱 수익성 극대화 노선이잖아. 웨이모가 몇 년 걸린 걸 테슬라는 20일 만에 상업화 검증 완료한 거야. 다음 도시 확장 속도 엄청나게 빠를 수밖에.",
    createdAt: T7JL + 15*60_000, likes: 1987, comments: 4 },

  // Cybercab vs Waymo ──────────────────────────────────────────────────
  { id: 446, symbol: "TSLA", nickname: "익명_8834", holdingLabel: "900주 보유",
    content: "Cybercab $0.25/마일 vs 웨이모 $4.00. 웨이모 대비 16배 저렴한 거야. 자율주행 기술 있어도 원가 구조가 이렇게 벌어지면 시장은 결국 싼 쪽으로 가. Cybercab은 차 자체가 FSD 서버 + 배터리로만 구성돼서 원가 절감 극한으로 밀어붙이는 설계잖아. 매일 8시간 운행 기준 20만 마일로 일반 택시 ROI 5배라는 계산도 납득돼.",
    createdAt: T7JL + 42*60_000, likes: 2318, comments: 7 },

  // Morgan Stanley 로보택시 1500대 ─────────────────────────────────────
  { id: 447, symbol: "TSLA", nickname: "익명_3367", holdingLabel: "450주 보유",
    content: "Morgan Stanley가 연말까지 로보택시 1,500대 예측하고 $465 목표가 유지. 지금 오스틴 20일 데이터가 검증됐으니 확장 속도가 관건이야. 뉴올리언스, 마이애미, 댈러스까지 로드맵에 있다는 거 감안하면 연말 1,500대는 보수적인 수치일 수도 있어. Cybercab 대량 생산 시작되면 이 숫자 급증할 거야.",
    createdAt: T7JL + 55*60_000, likes: 1673, comments: 4 },

  // SPCX NASDAQ 100 ────────────────────────────────────────────────────
  { id: 448, symbol: "SPCX", nickname: "익명_6621", holdingLabel: "200주 보유",
    content: "SPCX NASDAQ 100 공식 편입! QQQ 패시브 자금이 자동 유입되는 거잖아. NASDAQ 100 편입 기업 시총 평균이 얼마인데 스페이스엑스가 들어가는 거야. IPO 17달러 시작해서 편입까지 이 속도면 기관 수요가 얼마나 쌓여있는지 알 수 있어. 패시브 펀드들이 의무적으로 담아야 하니까 수급 자체가 달라지는 거야.",
    createdAt: T7JL + 20*60_000, likes: 2891, comments: 8 },

  // MSFT AI 해고 4800명 ─────────────────────────────────────────────────
  { id: 449, symbol: "MSFT", nickname: "익명_4419", holdingLabel: "150주 보유",
    content: "MSFT AI 해고 4,800명이 나쁜 소식이 아니야. 인간이 하던 반복 작업을 AI로 대체하면서 비용 구조 개선하는 거잖아. 코파일럿이 실제로 생산성 올리고 있다는 증거이고, 절감된 비용이 AI 인프라 투자로 재배분되는 거야. 단기 주가 반응 약해도 중장기 마진 개선 포인트야.",
    createdAt: T7JL + 35*60_000, likes: 1123, comments: 3 },

  // Tepper Appaloosa TSLA ───────────────────────────────────────────────
  { id: 450, symbol: "TSLA", nickname: "익명_9978", holdingLabel: "700주 보유",
    content: "David Tepper Appaloosa가 Q1에 TSLA 신규 포지션 잡은 거 공시 나왔어. 헤지펀드 중에서도 매크로 잘 보는 곳인데 거기서 신규 매수라는 게 의미있어. AI+로보틱스 가치 재평가 시작이라고 보는 거겠지. 기관 수요 밑에 깔리는 느낌이라 개인 투자자 입장에서도 긍정적인 신호야.",
    createdAt: T7JL + 48*60_000, likes: 1542, comments: 3 },

  // Optimus 중국 대량생산 ──────────────────────────────────────────────
  { id: 451, symbol: "TSLA", nickname: "익명_1183", holdingLabel: "550주 보유",
    content: "베이징 디지털경제 포럼에서 Optimus 중국 대량 생산 공식 선언. 기가 상하이 노하우 그대로 적용하면 램프업 속도가 기존 공장보다 훨씬 빠를 거야. 중국 제조 단가 미국 대비 구조적 우위라는 게 단순 인건비 차이가 아니라 공급망 전체가 거기 있다는 거잖아. 아시아 로봇 시장 직접 공략. 밸류에이션 재평가 트리거 맞아.",
    createdAt: T7JL + 1*3600_000 + 5*60_000, likes: 2189, comments: 5 },

  // MU DRAM AI 낙관론 ──────────────────────────────────────────────────
  { id: 452, symbol: "MU", nickname: "익명_8867", holdingLabel: "280주 보유",
    content: "UBS가 MU AI 메모리 낙관론 업그레이드했네. HBM3e 납품 확대 + 일반 DRAM도 AI 서버 수요로 업사이클 진입이라는 분석이야. SK하이닉스 61% 마진 봤으니 MU도 비슷한 구조 오면 PER 기준으로 지금이 싸다는 계산이 성립해. Burry 공매도 맞지 않는 방향이고. HBM4 전환 시점에 추가 상승 여지 있어.",
    createdAt: T7JL + 50*60_000, likes: 1234, comments: 3 },

  // TSLA 영국 2위 브랜드 ────────────────────────────────────────────────
  { id: 453, symbol: "TSLA", nickname: "익명_3312", holdingLabel: "200주 보유",
    content: "TSLA 영국 자동차 브랜드 2위. 재규어 랜드로버, BMW, 메르세데스 다 제치고 2위야. 유럽에서 프리미엄 브랜드 포지션 완전히 잡은 거잖아. Model Y 리프레시 효과가 EU 전역에서 나오고 있는 거야. FSD 유럽 정식 런칭 전인데 이 순위라면 런칭 후 1위 가능성도 있는 거고.",
    createdAt: T7JL + 1*3600_000 + 20*60_000, likes: 987, comments: 2 },

  // 기가텍사스 신형 컬러 ────────────────────────────────────────────────
  { id: 454, symbol: "TSLA", nickname: "익명_7741", holdingLabel: "320주 보유",
    content: "기가텍사스 출하장에서 Cosmic Silver Diamond랑 Stealth Grey 대량 출하 중이래. 신형 컬러 2종이 동시에 출하 단계 들어간 거야. 프리미엄 메탈릭·무광 계열은 ASP 올리는 믹스 개선 효과 있어. Model Y 리프레시 컬러 선택지 늘어나면 대기 수요 끌어오는 효과도 있고. Q3 매출·마진 기대치 유지에 긍정적인 신호야.",
    createdAt: T7JL + 1*3600_000 + 35*60_000, likes: 876, comments: 2 },

  // Morgan Stanley 포트폴리오 전환 ─────────────────────────────────────
  { id: 455, symbol: "MSFT", nickname: "익명_5548", holdingLabel: "100주 보유",
    content: "Morgan Stanley가 MSTR·BKNG·META 팔고 AI+인간 스킬 융합 기업으로 포트폴리오 재편한다는 게 흥미로워. BKNG·META는 AI가 완전히 대체하는 영역이라는 판단이잖아. AI 에이전트 시대에 살아남는 기업 선별 기준이 바뀌는 거야. TSLA·NVDA 같은 물리+AI 융합 기업이 수혜라는 분석인데 공감해.",
    createdAt: T7JL + 2*3600_000, likes: 1456, comments: 4 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-07-03 — TSLA Q2 480,126·에너지 13.5GWh·호주·중국 +24.4%·Optimus V3손 /
  //              MSFT Frontier $2.5B·MU 트럼프 $250M·META Wolfe $200B /
  //              미국 고용 +57K·다우 ATH·가계현금 8%·Ford -10.3%
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — Q2 공식 결과 ──────────────────────────────────────────────
  { id: 414, symbol: "TSLA", nickname: "익명_2178", holdingLabel: "800주 보유",
    content: "480,126대 공식 확정! 월가 컨센 406K를 7만 4천 대나 때려잡았어. 역대 Q2 최고 기록이고 전년 대비 +25%야. 중국 89K에 호주도 8,670대 신기록. 에너지 부문 13.5GWh가 조용히 +40% YoY인데 이게 별도 사업부로 봐도 굉장한 거잖아. 7월 22일 실적 발표 때 가이던스 어떻게 나오냐가 진짜 관건이지.",
    createdAt: T3JL + 8*60_000, likes: 1876, comments: 5 },
  { id: 415, symbol: "TSLA", nickname: "익명_6611", holdingLabel: "300주 보유",
    content: "공식 트윗 보자마자 매수 눌렀다. 480K에 컨센 대비 +18%면 어닝 시즌에 EPS도 기대 이상 나올 가능성 높아. 중국이 8개월 연속 성장에 +24.4% YoY 유지한 거 BYD 공세 속에서 버텨낸 거잖아. 에너지 사업 13.5GWh는 Q3에 15GWh 넘을 듯. Model 3/Y가 467,762대면 신형 효과 확실히 있는 것 같고.",
    createdAt: T3JL + 22*60_000, likes: 1342, comments: 4 },

  // TSLA — Optimus V3 손 ────────────────────────────────────────────
  { id: 416, symbol: "TSLA", nickname: "익명_9034", holdingLabel: "500주 보유",
    content: "Optimus V3 손 영상 봤는데 진짜 소름이야. '로봇 손처럼 안 보이고 사람 손처럼 보일 것'이라는 엔지니어 발언이 허풍이 아닌 수준이야. Gen-3 양산 준비 단계라는데 이게 공장 내부에서 부품 조립에 투입되면 다른 자동화 장비랑 차원이 달라. EV 말고 Optimus TAM 보는 시각 갖춰야 해.",
    createdAt: T3JL + 45*60_000, likes: 987, comments: 3 },
  { id: 417, symbol: "TSLA", nickname: "익명_4423", holdingLabel: "150주 보유",
    content: "솔직히 납품 숫자보다 Optimus가 더 흥분되는 소식이에요. 인간 수준 손 자유도라니 이게 말이 됩니까. 작년에 블록 집었는데 지금은 달걀도 집고. 반년 만에 이 속도면 2027년에 외판 가능성 진짜 현실적이에요. 연 100만 대 목표라면 오토메이션 시장 뒤집는 거잖아요.",
    createdAt: T3JL + 1*3600_000 + 10*60_000, likes: 723, comments: 2 },

  // MSFT — Frontier ────────────────────────────────────────────────
  { id: 418, symbol: "MSFT", nickname: "익명_8812", holdingLabel: "200주 보유",
    content: "Microsoft Frontier $2.5B·6,000명 독립 법인. 이건 그냥 AI 부서 확장이 아니에요. 완전 독립 자회사로 기업 AI 전환 전문 조직 만든 거잖아요. 기업 대상 컨설팅+구현 서비스면 Azure 매출 당기는 세일즈 엔진이 생기는 거예요. 가이던스 또 상향 오겠다는 신호 같아요.",
    createdAt: T3JL + 30*60_000, likes: 645, comments: 2 },
  { id: 419, symbol: "MSFT", nickname: "익명_3391", holdingLabel: "80주 보유",
    content: "$2.5B에 6천 명이면 평균 인당 비용이 상당한데 그만큼 고급 AI 전문 인력 모으겠다는 거죠. Azure+Copilot+GitHub 다 엮어서 기업 AI 전환 원스톱 제공. 경쟁사인 AWS, GCP도 비슷한 서비스 있지만 MSFT가 엔터프라이즈 신뢰도는 아직 1위라 고객 락인 효과가 커요.",
    createdAt: T3JL + 1*3600_000 + 30*60_000, likes: 489, comments: 2 },

  // MU — 트럼프 어카운트 ─────────────────────────────────────────────
  { id: 420, symbol: "MU", nickname: "익명_5547", holdingLabel: "100주 보유",
    content: "트럼프가 X에 직접 마이크론 언급하며 감사 포스팅. $250M 트럼프 어카운트 투자하고 당일 +9pt. 정치적 후광이 주가에 직접 붙는 거야. 뭐가 됐든 트럼프가 공개 칭찬하면 단기 주가 효과는 확실해. 반도체 투자 사이클에 정치 리스크 헤지까지 되는 구조가 됐네.",
    createdAt: T3JL + 15*60_000, likes: 834, comments: 3 },
  { id: 421, symbol: "MU", nickname: "익명_1178", holdingLabel: "60주 보유",
    content: "마이크론이 아이들 미래 기금에 $250M 넣은 건데 트럼프가 직접 고마움 표시. 이건 단순 CSR이 아니라 정책 수혜 확보 전략이에요. HBM 수요가 NVDA 통해 폭발적인 상황에서 정치적 백도 생겼으니 미국 정부 관련 반도체 수주에서 우선 고려될 가능성 높아요.",
    createdAt: T3JL + 2*3600_000, likes: 556, comments: 2 },

  // META — Wolfe Research ──────────────────────────────────────────
  { id: 422, symbol: "META", nickname: "익명_7763", holdingLabel: "250주 보유",
    content: "Wolfe Research 2027 CapEx 전망 $200B, 컨센 $180B 상회. 시장이 '비용 너무 많다'고 할 수 있지만 반대로 해석하면 생성형 AI 광고 수익이 그 이상 돌아온다는 확신이야. +20% EPS 부스트 공식이 실현되면 $200B는 ROI 최고의 투자가 되는 거잖아. Outperform 유지 맞고.",
    createdAt: T3JL + 40*60_000, likes: 712, comments: 2 },
  { id: 423, symbol: "META", nickname: "익명_3348", holdingLabel: "120주 보유",
    content: "$25B 연간 컴퓨팅에서 $1B 올릴 때마다 EPS 20% 올라간다는 공식. 이게 맞으면 $200B CapEx는 전부 수익으로 돌아오는 구조예요. 광고 AI 최적화 성숙도가 올라갈수록 광고주들이 META 예산 더 넣는 선순환이 이미 시작됐어요. 다음 분기 실적 기대해도 될 것 같아요.",
    createdAt: T3JL + 2*3600_000 + 30*60_000, likes: 498, comments: 2 },

  // TSLA — Model Y 8인승 신형 YL ────────────────────────────────────────
  { id: 424, symbol: "TSLA", nickname: "익명_4411", holdingLabel: "600주 보유",
    content: "Model Y 8인승 드디어 나왔네. 0→60 4.4초에 527km에 FSD+Grok AI까지 내장이면 기존 7인승 RAV4나 팰리세이드 사던 사람들한테 완전 게임체인저다. 50kW 무선충전이 전 열에 다 들어간다는 거 진짜 레벨 다름. 엘론이 Q2 발표 날 자동차 신제품까지 터뜨렸으니 7월 22일 실적 발표 전까지 상승 모멘텀 이어갈 것 같아.",
    createdAt: T3JL + 55*60_000, likes: 1534, comments: 6 },
  { id: 425, symbol: "TSLA", nickname: "익명_8823", holdingLabel: "200주 보유",
    content: "1+2+3열 8인승인데 트렁크까지 된다고? 그리고 어쿠스틱 글라스에 어댑티브 댐핑까지 들어갔으면 NVH는 독일차 뺨치겠는데. Grok AI 차량 내장은 음성 비서 경쟁에서 완전 독보적인 위치 잡는 거잖아. 기존 Model Y 보유자들 트레이드인 수요도 엄청날 듯.",
    createdAt: T3JL + 1*3600_000 + 20*60_000, likes: 876, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-07-06 — TSLA Cybercab100대비지도·NVDA 중국칩4.7x·SK하이닉스61%·
  //              GOOGL TPU·하이퍼스케일러$576B·EU안전의무화·TSLA미국산#1
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — Cybercab 생산 + 100대 비지도 ─────────────────────────────────
  { id: 435, symbol: "TSLA", nickname: "익명_7734", holdingLabel: "750주 보유",
    content: "Cybercab 오스틴 공장 생산 테스트 진입이랑 Model Y 100대 비지도 동시에 터졌네. 기존 계획이 신규 도시는 감독 FSD 먼저 시작이었는데 모든 신도시 비지도 직접 런칭으로 전략이 바뀐 거잖아. 이게 단순 계획 변경이 아니라 FSD 신뢰도가 임계점 넘었다는 신호야. 7/22 Q2 어닝에서 로보택시 매출 어떻게 잡히는지가 관건.",
    createdAt: T6JL + 7*60_000, likes: 2187, comments: 7 },
  { id: 436, symbol: "TSLA", nickname: "익명_3356", holdingLabel: "400주 보유",
    content: "Whole Mars Catalog이 '원래 감독 FSD로 시작한다더니 다 비지도로 가네'라고 한 게 핵심이지. FSD v14가 HW3까지 배포되면서 구형 차량도 다 업데이트 되고, 신도시는 바로 비지도. 이건 FSD가 안전성 기준 통과했다는 묵시적 확인인 거야. Cybercab 쿨뉴스까지 나오면 기가텍사스 대량 생산 얼마 안 남은 거.",
    createdAt: T6JL + 42*60_000, likes: 1543, comments: 5 },

  // NVDA — 중국 칩 4.7배 ────────────────────────────────────────────────
  { id: 437, symbol: "NVDA", nickname: "익명_6612", holdingLabel: "280주 보유",
    content: "베이징대 40nm짜리가 A100 4.7배라는 건 특화 태스크 기준이고 범용 LLM 학습은 해당 없다는 거 알고 있는데, 중국 입장에서는 수출 통제 받으면서도 이 정도 칩을 만들 수 있다는 걸 증명한 거잖아. H100·B200은 단기 대체 불가지만 중국 내 엣지 AI 시장에서 NVDA 점유율 갉아먹는 건 맞는 거야. 장기적으로 중국 시장 익스포저 리스크로 봐야.",
    createdAt: T6JL + 25*60_000, likes: 1089, comments: 4 },

  // SK하이닉스 — DRAM 61% ───────────────────────────────────────────────
  { id: 438, symbol: "MU", nickname: "익명_9981", holdingLabel: "320주 보유",
    content: "SK하이닉스 61%면 진짜 HBM 마진이 얼마나 높은지 보여주는 거야. 일반 DRAM 마진 30~40%대인데 AI 메모리는 이게 60% 넘어가는 거잖아. MU도 HBM3e 납품 늘어나면 비슷한 마진 개선 나올 수밖에 없어. Burry가 공매도 쳤는데 이 데이터 보면 그 베팅이 많이 어려워지는 것 같은데.",
    createdAt: T6JL + 55*60_000, likes: 876, comments: 3 },

  // GOOGL — TPU 2배 ──────────────────────────────────────────────────────
  { id: 439, symbol: "GOOGL", nickname: "익명_4478", holdingLabel: "90주 보유",
    content: "토큰당 비용 최저 기업이 이긴다는 명제가 진짜 맞는 것 같아. 구글이 TPU로 프론티어 모델 100% 돌린다는 건 NVDA 비용 제로라는 거잖아. OpenAI는 Microsoft 클라우드 쓰고, Anthropic은 AWS 쓰는데 구글은 자기네 인프라. 2028년 순이익 2배 전망이 과한 게 아니라 오히려 보수적일 수도 있겠다는 생각이 드네.",
    createdAt: T6JL + 38*60_000, likes: 743, comments: 3 },

  // 하이퍼스케일러 — $576B ───────────────────────────────────────────────
  { id: 440, symbol: "NVDA", nickname: "익명_1193", holdingLabel: "550주 보유",
    content: "$576B에서 $939B. 1조 달러 CAPEX가 현실화되는 거잖아. 미국 전체 제조업 설비투자의 2배면 AI 인프라 투자 규모가 얼마나 비정상적인지 알 수 있는 거야. 이 돈 다 어디로 가냐. 결국 NVDA GPU, SK하이닉스·MU HBM, 전력 인프라. NVDA 주가가 지금 비싸다고 생각하는 사람들한테 이 숫자 보여주고 싶다.",
    createdAt: T6JL + 1*3600_000 + 5*60_000, likes: 1312, comments: 5 },

  // TSLA — EU + 미국산 ────────────────────────────────────────────────────
  { id: 441, symbol: "TSLA", nickname: "익명_8845", holdingLabel: "180주 보유",
    content: "EU 신차 안전 기술 의무화되면 레거시 OEM은 다 돈 써야 하는데 테슬라는 이미 다 들어가 있잖아. 추가 비용 없이 규제 충족하면서 경쟁사는 업그레이드 비용 부담. 이게 규제가 진입장벽이 되는 구조야. FSD 유럽 구독 런칭 기반도 마련된 셈이고.",
    createdAt: T6JL + 1*3600_000 + 50*60_000, likes: 678, comments: 3 },
  { id: 442, symbol: "TSLA", nickname: "익명_5521", holdingLabel: "230주 보유",
    content: "미국산 함량 1위에 DeSantis가 FSD를 납세자 혜택이라고 공개 지지. 관세 환경에서 미국산 1위라는 건 타 브랜드 대비 가격 경쟁력 있다는 거고, 정치권 지지까지 더해지면 정부 차량 교체 수요에서 유리해지는 거야. DOGE 효율화 맥락에서도 연결되는 거고.",
    createdAt: T6JL + 2*3600_000 + 15*60_000, likes: 589, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-07-04 — TSLA 로보택시 5도시·FSD 독일·NVDA AI인프라·
  //              OpenAI 정부5%·Starlink 27배·TSLA AI $200·META 에이전트·
  //              FSD 기소·MU Burry
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 로보택시 5개 도시 ────────────────────────────────────────────
  { id: 426, symbol: "TSLA", nickname: "익명_3391", holdingLabel: "800주 보유",
    content: "마이애미, 댈러스, 휴스턴, 오스틴, 베이에어리어 동시에 비감독 개시. 5개 도시 동시에 터진 거잖아. 웨이모가 샌프란 한 도시 서비스 자랑하고 있을 때 테슬라는 한 번에 5개. Cybercab 오스틴 생산까지 시작했으면 하반기 로보택시 매출 본격 인식 가능할 듯. 7월 22일 실적 발표 때 이거 언급 안 하면 이상한 거.",
    createdAt: T4JL + 8*60_000, likes: 2341, comments: 8 },
  { id: 427, symbol: "TSLA", nickname: "익명_6628", holdingLabel: "350주 보유",
    content: "비감독 5도시 동시면 사실상 상용화 선언이야. 웨이모는 운전기사 없는 로보택시 한 도시도 수년 걸렸는데 테슬라는 주력 모델 그대로 쓰면서 소프트웨어만 올려서 5개 도시. 이게 수직계열화의 힘이지. 안전 사고 없으면 2026년 하반기부터 로보택시 수익 모델 완성되는 거 아닌가?",
    createdAt: T4JL + 35*60_000, likes: 1678, comments: 5 },

  // TSLA — FSD 독일 ────────────────────────────────────────────────────
  { id: 428, symbol: "TSLA", nickname: "익명_9102", holdingLabel: "500주 보유",
    content: "독일 국회의원이 직접 '이달 FSD 온다' 확인한 거잖아요. EU 규제 승인이 제일 어렵다고 했는데 그게 뚫렸다는 거니까 프랑스, 영국, 이탈리아도 시간문제예요. FSD 구독료 $99~$199/월이면 유럽 테슬라 오너 수백만 명 곱하면 구독 수익이 엄청난 규모예요. 유럽 FSD가 진짜 게임체인저.",
    createdAt: T4JL + 22*60_000, likes: 1432, comments: 4 },

  // NVDA — AI 인프라 파트너십 ────────────────────────────────────────────
  { id: 429, symbol: "NVDA", nickname: "익명_7744", holdingLabel: "400주 보유",
    content: "NVDA가 GPU 팔고 끝이 아니라 AI 팩토리 운영하면서 수익 공유까지 가져간다는 거잖아요. 이건 GPU 하드웨어 매출에 소프트웨어 반복 수익이 얹히는 구조. 애플이 아이폰 팔고 앱스토어 수수료 챙기는 것처럼. AMD가 GPU 칩 팔아봤자 이 생태계엔 못 들어오는 거고. NVDA 모트 더 깊어지는 소식.",
    createdAt: T4JL + 18*60_000, likes: 1123, comments: 4 },

  // SPCX — Starlink vs Amazon ────────────────────────────────────────────
  { id: 430, symbol: "SPCX", nickname: "익명_2255", holdingLabel: "200주 보유",
    content: "10,700 vs 396이면 사실 비교 자체가 의미없는 수준 아닌가요. 아마존이 Kuiper 다 쏴도 따라잡는 데 몇 년은 걸릴 텐데 그동안 스타링크는 계속 쏘고 있을 거잖아. 주당 키트 17만 개 생산 체제면 구독자 가속도 붙는 건 시간문제. SPCX 보유 중인데 SpaceX 상장 전까지 계속 들고 가야겠다.",
    createdAt: T4JL + 45*60_000, likes: 987, comments: 3 },

  // TSLA — AI $200/주 ─────────────────────────────────────────────────
  { id: 431, symbol: "TSLA", nickname: "익명_5577", holdingLabel: "600주 보유",
    content: "Chamath가 '$200 초과는 낭비'라고 검증해준 거잖아요. 다른 AI 기업들 직원들이 주당 수천 달러씩 쓸 때 테슬라는 $200으로 같은 일 한다는 거. Dojo가 그냥 마케팅이 아니라 실제로 원가 절감 하고 있다는 증거야. FSD·로보택시 마진에 직결되는 거라서 이게 밸류에이션 리레이팅 요인이 될 수 있어.",
    createdAt: T4JL + 1*3600_000 + 10*60_000, likes: 1234, comments: 4 },

  // META — AI 에이전트 기대 미달 ────────────────────────────────────────
  { id: 432, symbol: "META", nickname: "익명_8831", holdingLabel: "180주 보유",
    content: "Zuckerberg가 사내 타운홀에서 직접 '4개월 기대 미달'이라고 했다는 게 오히려 신선하다. 보통 경영진은 실패 인정 안 하잖아. 그런데 광고 AI는 별개로 돌아가고 있으니까 핵심 사업은 영향 없는 거야. $60B capex는 유지한다니까 에이전트 포기가 아니라 속도 조절이겠지. 단기 조정 나오면 오히려 매수 기회 아닐까.",
    createdAt: T4JL + 50*60_000, likes: 843, comments: 3 },

  // MU — Burry 공매도 ───────────────────────────────────────────────────
  { id: 433, symbol: "MU", nickname: "익명_3311", holdingLabel: "150주 보유",
    content: "Burry가 $1,051.87에 MU 공매도 진입. Big Short 남자가 베팅 건 거라 무시할 수는 없는데... 근데 Burry 공매도가 항상 맞은 건 아니잖아요. HBM3e 수요는 NVDA GB200 물량 보면 올해도 강하거든. 메모리 사이클 고점이냐 아니냐가 관건인데 다음 13F에서 포지션 규모 확인하고 판단해야 할 것 같아요.",
    createdAt: T4JL + 1*3600_000 + 30*60_000, likes: 956, comments: 5 },

  // TSLA — FSD 과실치사 기소 ────────────────────────────────────────────
  { id: 434, symbol: "TSLA", nickname: "익명_4499", holdingLabel: "250주 보유",
    content: "Harris County에서 FSD 켜놓고 정지 신호 무시해서 사망 사고 낸 운전자 중범죄 기소. Tesla는 기소 안 당했고 운전자 개인 책임. 'FSD는 운전 보조이지 완전 자율주행 아님' 논리가 이번에 법적으로 정리되는 거네. 단기 리스크 요인이긴 하지만 Tesla가 직접 책임 안 진다는 선례 확립되면 오히려 로보택시 확장에 도움 될 수도 있어.",
    createdAt: T4JL + 2*3600_000, likes: 1102, comments: 6 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-07-01 — TSLA Q2 480K·CyberCab Austin·FSD v46·Optimus·Semi /
  //              SPCX Iridium $8B·Memphis / NVDA Blackwell / NKE Q4 /
  //              Burry ADBE·Ackman AMZN·Dell -18%·Agentix IPO
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — Q2 납품 480K ────────────────────────────────────────────────
  { id: 401, symbol: "TSLA", nickname: "익명_2841", holdingLabel: "500주 보유",
    content: "480K 나왔다. 컨센서스 475K 뚫었어. 야간에 주가 쏠 거 같은데 내일 장 열리면 어떻게 될지 기대된다. 연간 200만대 페이스로 보면 7월 실적 발표에서 가이던스 상향 가능성도 있고. CyberCab 효과 반영되기 전인데 이미 이 정도면 나쁘지 않지.",
    createdAt: T1JL + 10*60_000, likes: 1243, comments: 4 },
  { id: 402, symbol: "TSLA", nickname: "익명_5573", holdingLabel: "200주 보유",
    content: "Q2 480K 컨펌됐고 이제 시장이 Q3 전망에 집중할 것 같아요. CyberCab 오스틴 테스트 영상이랑 FSD 비감독 전국 확대 발표 타이밍이 완전 딱 맞았어요. 하반기 기대감 선반영 사이클 시작되는 것 같은데 개인적으로 $300 가기 전에 더 모아야겠다 싶어요.",
    createdAt: T1JL + 25*60_000, likes: 867, comments: 3 },
  { id: 403, symbol: "TSLA", nickname: "익명_9102", holdingLabel: "1000주 보유",
    content: "솔직히 480K가 아니라 490K 기대했는데 살짝 아쉽긴 해. 그래도 컨센 상회니까 주가엔 플러스. 중국이 문제인데 상하이 판매가 얼마나 나왔냐에 따라 해석이 달라질 것 같아. BYD 공세에 중국 점유율 유지했으면 그게 진짜 서프라이즈.",
    createdAt: T1JL + 45*60_000, likes: 534, comments: 2 },
  { id: 404, symbol: "TSLA", nickname: "익명_3367", holdingLabel: "50주 보유",
    content: "FSD v46 들어보니 야간 주행이 진짜 달라진 것 같더라. 비 오는 날 합류 구간에서 개입 한 번도 안 했다고. 예전엔 항상 불안했는데. 이게 v46이면 v47, v48 되면 어떻게 되는 거야? CyberCab 출시 전에 이미 완성형이 되어버릴 것 같은데.",
    createdAt: T1JL + 1*3600_000, likes: 421, comments: 2 },

  // TSLA — Optimus ────────────────────────────────────────────────────
  { id: 405, symbol: "TSLA", nickname: "익명_7788", holdingLabel: "300주 보유",
    content: "옵티머스 와인잔 드는 거 봤어요? 진짜 미쳤다. 작년에 블록 쌓는 거 보고 '아직 멀었다' 했는데 지금은 달걀도 집는다고. +180% 정밀도 개선이면 반년 만에 이게 가능한 거잖아요. 공장에서 전자 부품 조립에 쓸 수 있는 수준이 됐을 것 같아요.",
    createdAt: T1JL + 1*3600_000 + 15*60_000, likes: 923, comments: 3 },
  { id: 406, symbol: "TSLA", nickname: "익명_1129", holdingLabel: "100주 보유",
    content: "Optimus 1만대 목표 2026년 말이라는데 월 500~600대 속도면 딱 맞네. 기가텍사스 안에서 부품 운반 1200대 가동 중이라고 하는데 이게 양산 전 실전 테스트잖아. 외판 시작되면 주당 수익에 기여하는 시점이 오는 거고 그게 진짜 밸류에이션 변화 트리거야.",
    createdAt: T1JL + 2*3600_000, likes: 677, comments: 2 },

  // SPCX — Iridium 인수 ─────────────────────────────────────────────
  { id: 407, symbol: "SPCX", nickname: "익명_4451", holdingLabel: "200주 보유",
    content: "Iridium 인수 소식 들었어? $8B인데 이건 그냥 기업 M&A가 아니야. 설계-제조-운영 수직통합이 완성되는 거야. 그동안 스페이스X가 위성 쏘아 올리는 건 했는데 운영 수익 모델이 약했잖아. Iridium이 군사·항공·해양 B2B 구독 $850M 매출이거든. 이게 반복 수익으로 붙는 거야.",
    createdAt: T1JL + 30*60_000, likes: 1456, comments: 4 },
  { id: 408, symbol: "SPCX", nickname: "익명_6634", holdingLabel: "500주 보유",
    content: "Iridium 위성 66기가 극지방까지 커버한다는 게 핵심이에요. Starlink는 극지방 약한데 Iridium은 전 지구 커버에요. 군사용으로 이미 검증된 네트워크에 SpaceX 기술력이 붙으면 국방부 계약 대폭 확대 가능해요. $8B 투자가 3~4년 내 회수 가능한 구조예요.",
    createdAt: T1JL + 50*60_000, likes: 1089, comments: 3 },

  // NVDA ─────────────────────────────────────────────────────────────
  { id: 409, symbol: "NVDA", nickname: "익명_3318", holdingLabel: "150주 보유",
    content: "NVDA Blackwell 소프트웨어 ARR이 $2.5B이라고요? 하드웨어만 보던 사람들 이제 SW 수익도 봐야 해요. NIM API 쓰는 개발자 300만 명이면 CUDA처럼 생태계 락인이 되는 거거든요. GPU 경쟁사 나와도 소프트웨어 이미 다 CUDA 기반이니 갈아타기 어렵잖아요.",
    createdAt: T1JL + 1*3600_000, likes: 789, comments: 3 },
  { id: 410, symbol: "NVDA", nickname: "익명_8821", holdingLabel: "80주 보유",
    content: "Azure GB800 + Claude 3.7 조합이라니. MS가 OpenAI 의존도 줄이려고 Anthropic 이중화 하는 건데 이게 NVDA한테는 GB800 대량 수요 확인이야. 10만 GPU 클러스터면 규모가 H100 시대 첫 메가클러스터급이잖아. 수주 가시성이 확실해졌어.",
    createdAt: T1JL + 2*3600_000 + 30*60_000, likes: 634, comments: 2 },

  // NKE ──────────────────────────────────────────────────────────────
  { id: 411, symbol: "NKE", nickname: "익명_5529", holdingLabel: "관심종목",
    content: "나이키 실적 생각보다 괜찮게 나왔네요. 중국 +15%면 회복 신호 맞고 Jordan이 +22%는 진짜 강한 거예요. PER 28배라 비싸 보이는데 실적 턴어라운드가 확인되면 재평가 가능하죠. EPS $1.04 나온 거 보면 애널들 예상 다 틀린 거잖아요. 어닝 서프라이즈 효과는 좀 있을 것 같아요.",
    createdAt: T1JL + 3*3600_000, likes: 445, comments: 2 },

  // AMZN — Ackman ────────────────────────────────────────────────────
  { id: 412, symbol: "AMZN", nickname: "익명_2267", holdingLabel: "30주 보유",
    content: "Ackman이 아마존 PER 30배가 역대 최저라고 하는 거 진짜야? 예전에 90배까지 갔다가 30배까지 내려온 거잖아. AWS만 따로 상장하면 $280B 가치인데 현재 시총이 $2.3T면 이커머스+광고 $1.5T 이상을 PER 30배에 사는 셈이라는 논리가 맞네. Ackman이 $2B 들어갔다는 거 보면 확신이 있는 거겠지.",
    createdAt: T1JL + 4*3600_000, likes: 567, comments: 2 },

  // DELL ─────────────────────────────────────────────────────────────
  { id: 413, symbol: "DELL", nickname: "익명_9910", holdingLabel: "관심종목",
    content: "Dell -18%면 공포 매도 구간이긴 한데... PER 14배면 싸긴 해요. 근데 PC 사이클이 언제 돌아오냐가 문제인 거죠. AI 서버 수주잔고 $9B 있다는데 이게 마진이 얼마나 나오냐가 핵심이에요. HP도 비슷한 상황인데 Dell이 AI 서버 비중은 더 높으니까 일단 지켜보고 있어요.",
    createdAt: T1JL + 3*3600_000 + 30*60_000, likes: 334, comments: 1 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-30 — TSLA FSD V14 Lite HW3 400만·Cybercab Texas DPS 84대·Optimus 7/8 /
  //              SPCX Falcon9 60번째·Nasdaq100 편입·NVDA HBM 3사독점 /
  //              META Claude 30% 제한·AAPL CATI 칩 $10B·MSFT 의회 8인·VW 10만 해고
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — FSD V14 Lite ────────────────────────────────────────────────
  { id: 361, symbol: "TSLA", nickname: "익명_4819", holdingLabel: "300주 보유",
    content: "FSD V14 Lite이 HW3 400만대에 무료 배포된다고. 이게 얼마나 큰지 알아? HW3 차들은 원래 V14 못 받을 거라고 했는데 갑자기 무료야. 중고 Model 3에 FSD 포함해서 $27K 이하. 경쟁차가 이 가격에 이 기능 못 따라와. Optimus 수익화 전에 FSD 구독이 이미 게임 체인저가 되는 거야.",
    createdAt: T30J - 3*60_000, likes: 712, comments: 3 },
  { id: 362, symbol: "TSLA", nickname: "익명_7341", holdingLabel: "150주 보유",
    content: "Texas에서 'Self-Driving'이 공식 명칭 'Drive'로 바뀐 거 보고 확신이 생겼어요. 이건 규제 승인이 실질적으로 완료됐다는 신호예요. 텍사스 → 다른 주 순서로 확산되고 FSD 구독자 폭발할 것 같아요. V14이 무료로 풀리면 체험자 → 구독 전환 퍼널이 본격화되는 거잖아요.",
    createdAt: T30J - 10*60_000, likes: 584, comments: 2 },

  // TSLA — Cybercab Texas DPS ──────────────────────────────────────────
  { id: 363, symbol: "TSLA", nickname: "익명_2937", holdingLabel: "200주 보유",
    content: "Cybercab 84대가 Texas DPS 공식 CAV 등록됐다는 거 어제 확인했어. SAE L4 자율주행차로 법적 인정이야. First Responder 매뉴얼까지 완비됐다는 건 비상 상황 대응 체계도 다 갖춰진 거야. 상용 로보택시 서비스 시작 전 마지막 관문이 이미 통과된 거 아닌가 싶어.",
    createdAt: T30J - 7*60_000, likes: 648, comments: 3 },
  { id: 364, symbol: "TSLA", nickname: "익명_8502", holdingLabel: "500주 보유",
    content: "84대 공식 등록이 중요한 이유는 숫자가 아니에요. 텍사스 DPS가 SAE L4로 인정했다는 법적 선례가 생긴 거예요. 이 선례가 다른 주에 확산되는 속도가 핵심이에요. 한 주에서 L4 승인 → 다른 주 따라서 승인하는 패턴이 나오면 Robotaxi 전국 확장 타임라인이 확 당겨져요.",
    createdAt: T30J - 18*60_000, likes: 521, comments: 2 },

  // TSLA — Optimus 7/8 ─────────────────────────────────────────────────
  { id: 365, symbol: "TSLA", nickname: "익명_6184", holdingLabel: "관심종목",
    content: "Optimus 7/8 Texas 발표가 진짜인지 아직 반신반의인데. Elon이 직접 텍사스에서 발표한다고 예고한 거 맞아요. 로봇 시연이면 주가 단기 모멘텀 확실히 있을 거고, 만약 실제 양산 타임라인 공개하면 Robotics TAM 재산정 들어가요. 7월 8일 주목해야 해요.",
    createdAt: T30J - 14*60_000, likes: 489, comments: 2 },

  // SPCX — Falcon9 60번째 발사 ─────────────────────────────────────────
  { id: 366, symbol: "SPCX", nickname: "익명_3745", holdingLabel: "관심종목",
    content: "Falcon9이 오늘 2026년 60번째 발사를 했어. 10시간 내에 2발이야. 연간 60회면 역대 최고 속도고 아직 6개월 남았어. Starlink 위성도 10,722기야. 이 숫자가 경쟁사 위성보다 10배 이상인 거 알지? 네트워크 효과가 이미 승패를 갈랐어.",
    createdAt: T30J - 6*60_000, likes: 578, comments: 2 },

  // SPCX — Nasdaq 100 편입 ─────────────────────────────────────────────
  { id: 367, symbol: "SPCX", nickname: "익명_9213", holdingLabel: "100주 보유",
    content: "SPCX 7/8 Nasdaq 100 편입이 오늘 공식 확정이에요. QQQ ETF가 강제로 편입해야 하는 거잖아요. QQQ AUM $320B인데 SPCX 비중 추정치 곱하면 수억 달러 규모 기계적 매수예요. 편입 전날까지 선행 매수도 있을 거고. 7월 8일 전까지가 기회예요.",
    createdAt: T30J - 11*60_000, likes: 631, comments: 3 },

  // NVDA — HBM 3사 독점 + MU S&P500 ───────────────────────────────────
  { id: 368, symbol: "NVDA", nickname: "익명_1574", holdingLabel: "50주 보유",
    content: "NVDA HBM 공급망이 SK하이닉스 62%, MU 23%, Samsung 17%로 3사 독점이야. 근데 MU가 S&P500에서 비중 10%까지 올라갔어. AAPL이 6.2%로 내려간 상황에. AI 반도체 수요가 얼마나 폭발적인지 지수 비중이 증명하는 거야. NVDA 블랙웰 공급이 수요를 못 쫓아가는 구조는 계속이야.",
    createdAt: T30J - 8*60_000, likes: 553, comments: 2 },
  { id: 369, symbol: "NVDA", nickname: "익명_6847", holdingLabel: "30주 보유",
    content: "MU가 AAPL보다 S&P 비중 높아진 거 보고 진짜 시대가 바뀌었다 싶었어요. HBM이 AI 가속기 핵심이고 NVDA B200·B100이 HBM3e 없으면 못 만들어요. SK하이닉스 62% 점유가 공급 병목이고 그 병목이 NVDA 프리미엄 유지시켜요. 데이터센터 사이클 2027년까지 이어진다는 뷰 유효해요.",
    createdAt: T30J - 22*60_000, likes: 418, comments: 2 },

  // META — Claude 30% 제한 ─────────────────────────────────────────────
  { id: 370, symbol: "META", nickname: "익명_4381", holdingLabel: "80주 보유",
    content: "Meta 내부 문서 유출됐어. Claude랑 Codex 아웃풋 30% 제한했다는 거야. 이유가 모델 증류야. Meta가 Anthropic한테 질문하면 그 데이터로 Anthropic이 Claude 학습시켜. IP 유출 방지라고. 그래서 Amazon-Anthropic 재협상도 진행 중. AI 업계 IP 전쟁 본격화야.",
    createdAt: T30J - 15*60_000, likes: 467, comments: 2 },
  { id: 371, symbol: "META", nickname: "익명_7623", holdingLabel: "관심종목",
    content: "Claude 사용 제한 소식 보고 META Llama 강화가 더 빨라지겠구나 싶었어요. 외부 AI API 의존하면 IP 리스크니까 자체 LLM 키울 수밖에 없어요. 이게 META AI R&D 지출 확대의 근거예요. 자체 LLM 있는 MSFT·GOOGL·META가 중장기 구조적 우위예요.",
    createdAt: T30J - 28*60_000, likes: 341, comments: 2 },

  // AAPL — China CATI 칩 ───────────────────────────────────────────────
  { id: 372, symbol: "AAPL", nickname: "익명_5219", holdingLabel: "관심종목",
    content: "Apple이 트럼프 행정부에 중국 CATI 칩 $10B 구매 승인 요청한다는 FT 보도야. CATI는 중국군 연계 의혹 기업이라 미국 수출 제한 대상인데 Apple이 직접 로비하는 거야. 승인되면 비용 절감 + AI iPhone 원가 경쟁력, 거부되면 공급 차질. 결과에 따라 단기 방향이 갈려.",
    createdAt: T30J - 20*60_000, likes: 389, comments: 2 },

  // MSFT — 의회 8인 매수 ───────────────────────────────────────────────
  { id: 373, symbol: "MSFT", nickname: "익명_8347", holdingLabel: "관심종목",
    content: "Pelosi 포함 의회 의원 8명이 올해 MSFT 매수했어. AI 규제 직접 입안하는 상무위원회·과학위원회·교통위원회 소속이야. 8명 다 손실 없고 전원 수익 중. 이들이 MSFT 보유하면서 AI 법 쓰는 구조야. 규제 완화 방향으로 갈 가능성이 높다는 거지.",
    createdAt: T30J - 17*60_000, likes: 445, comments: 2 },

  // VW — 10만명 해고 ───────────────────────────────────────────────────
  { id: 374, symbol: "TSLA", nickname: "익명_2961", holdingLabel: "400주 보유",
    content: "VW이 독일에서 10만명 해고하고 자율주행 파트너십 전면 종료했어. '경쟁력 없음' 공식 인정이야. FSD V14 발표 4시간 후에 결정한 거 보면 Tesla 때문에 접은 거 맞아. 유럽 AV 시장 경쟁자가 하나씩 사라지는 거고 Tesla 해자는 더 두꺼워지는 거야.",
    createdAt: T30J - 5*60_000, likes: 589, comments: 3 },
  { id: 375, symbol: "TSLA", nickname: "익명_6038", holdingLabel: "250주 보유",
    content: "VW 10만명 해고 뉴스 보고 충격이었어요. 자체 AV 기술 없이는 생존 불가라는 걸 VW 스스로 인정한 거잖아요. 독일 10만명 실직이니 유럽 소비에도 영향 있겠고. 공급망 도미노가 문제예요. Bosch·Continental 등 부품사 연쇄 구조조정 나올 수 있어요.",
    createdAt: T30J - 25*60_000, likes: 423, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-26 — SPCX NASDAQ-100 공식·T-Mobile인수·천연가스파이프라인·Leopold780% /
  //              TSLA CapEx확대·기가베를린7500·유럽2배·NHTSA브레이크면제·일본폭발 /
  //              MU Q4 $50B역대최대 / AVGO $1T / AAPL M5+가격인상 / OpenAI IPO지연
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — 6/26 업데이트 ────────────────────────────────────────────────
  { id: 348, symbol: "SPCX", nickname: "익명_3924", holdingLabel: "관심종목",
    content: "오늘 드디어 공식 인포그래픽 나왔어. 7/6 NASDAQ-100 편입 확정이고 448+ 로켓 발사, 7,300+ 위성, 직원 13,000+, 기업가치 $350B+가 공식 수치야. 25년 전 창업한 회사가 세계 최고 기술주 지수에 들어가는 거잖아. QQQ ETF들이 기계적으로 사야 하고 리밸런싱 전 선행 매수까지 더해지면 수급이 구조적으로 바뀌는 거야.",
    createdAt: T26J - 5*60_000, likes: 678, comments: 3 },
  { id: 349, symbol: "SPCX", nickname: "익명_7156", holdingLabel: "50주 보유",
    content: "SpaceX T-Mobile $108B 인수 분석 나왔는데 숫자상 현실적이야. SpaceX 현금이 $100.8B이라 커버 가능한 범위거든. 위성 + 지상 셀타워 합치면 Direct-to-Cell 완성이고, 트럼프 행정부 M&A 우호 환경까지 맞물렸어. DOJ 통과하면 미국 통신 1위 자동 등극. 이 딜 성사되면 기업가치 재산정은 필수야.",
    createdAt: T26J - 12*60_000, likes: 589, comments: 3 },
  { id: 350, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "SpaceX가 연료용 천연가스 파이프라인을 직접 짓는다고. 다음 달 착공이래. 외부 공급업체 의존하던 걸 자급으로 바꾸는 거잖아. 발사 비용 절감 + 발사 간격 단축 + 월 발사 횟수 증가, 세 가지가 동시에 돼. Starlink V3 배치 속도도 빨라지고. 수직통합이 연료까지 내려간 거야.",
    createdAt: T26J - 20*60_000, likes: 445, comments: 2 },
  { id: 351, symbol: "SNDK", nickname: "익명_6382", holdingLabel: "관심종목",
    content: "Leopold가 $250에 $53M 공개할 때 이미 신호였는데. 7개월 지나보니 +780% 나왔어. SNDK(SanDisk) 얘기야. 지금 $2,225+이고 목표가도 $2,500으로 상향됐어. AI 데이터센터 NAND 수요 급증으로 실적 모멘텀도 가속화 중이거든. 기관 공개 직후 진입하면 왜 수익률이 높은지 이 케이스가 설명해줘.",
    createdAt: T26J - 28*60_000, likes: 512, comments: 2 },

  // TSLA — 6/26 업데이트 ────────────────────────────────────────────────
  { id: 352, symbol: "TSLA", nickname: "익명_5831", holdingLabel: "200주 보유",
    content: "오늘 Elon이 직접 선언했어. 배터리, 파워트레인, AI 소프트웨어, AI 훈련, 칩 설계 5개에 CapEx 대폭 확대. 단기 EPS 압박은 있겠지만 이게 3~5년 후 FSD·Robotaxi·Optimus의 기반이 되는 거잖아. 경쟁사는 이 5개 영역을 동시에 투자할 수 없어. 직접 선언이 가장 강한 확신 시그널이야.",
    createdAt: T26J - 8*60_000, likes: 634, comments: 3 },
  { id: 353, symbol: "TSLA", nickname: "익명_1947", holdingLabel: "150주 보유",
    content: "기가베를린 7,500대/주 목표에 1,000명 추가 채용이에요. 연 390,000대 규모로 5월 유럽 판매 2배 수준을 소화할 수 있어요. 채용 공고가 나왔다는 건 계획이 이미 확정된 거고, 채용 없이 생산이 늘어나는 경우는 없거든요. Q3/Q4 출하량 서프라이즈 가능성이 높아졌네요.",
    createdAt: T26J - 15*60_000, likes: 487, comments: 2 },
  { id: 354, symbol: "TSLA", nickname: "익명_8423", holdingLabel: "80주 보유",
    content: "Tesla 유럽 5월 판매 전년 대비 2배 나왔어! Model 3 전기차 1위, Model Y 2위. 28,810대 등록에 YTD도 +12%. BYD가 유럽 온다고 난리였는데 막상 Tesla 점유율이 오히려 올라간 거잖아. 기가베를린 신형 Model Y가 유럽 취향에 딱 맞고 가격 경쟁력도 확보된 거야. Q2 유럽 기여도 기대돼.",
    createdAt: T26J - 22*60_000, likes: 561, comments: 3 },
  { id: 355, symbol: "TSLA", nickname: "익명_3619", holdingLabel: "300주 보유",
    content: "NHTSA가 자율주행 전용 차량 브레이크 페달 의무 폐지했어! AV Framework 5차 업데이트야. Cybercab 설계 자유도가 완전히 달라지는 거야. 페달 없애면 원가 절감 + 실내 공간 확대가 동시에 돼. Waymo랑 Cruise도 수혜지만 실질적으로 Cybercab이 제일 크게 수혜 받아. 규제 풀리는 속도가 빨라지고 있어.",
    createdAt: T26J - 30*60_000, likes: 723, comments: 3 },
  { id: 356, symbol: "TSLA", nickname: "익명_7254", holdingLabel: "100주 보유",
    content: "일본 배달 센터가 포화돼서 고객들이 항구에서 직접 차 받는다고. 무료 슈퍼차징이랑 정부 보조금이 맞물려서 수요가 물류를 초과한 거야. 일본은 세계 4위 자동차 시장이잖아. 여기서 Tesla 수요 폭발하면 아시아 FSD 수익화 도미노 시작이야. Q3 아태 출하량에 기여가 클 것 같아.",
    createdAt: T26J - 38*60_000, likes: 398, comments: 2 },

  // MU/기타 — 6/26 업데이트 ─────────────────────────────────────────────
  { id: 357, symbol: "MU", nickname: "익명_9241", holdingLabel: "300주 보유",
    content: "Micron FQ4 가이던스 $50B에 마진 ~80% 나왔어요. 역대 최대예요. 계산하면 영업이익이 $40B인데, 이게 단일 분기 수치거든요. EPS·매출·가이던스 모두 컨센서스 상회했어요. AI HBM 수요가 공급을 압도하는 중이고, TSLA Colossus·SPCX 데이터센터가 이 수요를 만들고 있는 거예요. 메모리 슈퍼사이클이에요.",
    createdAt: T26J - 18*60_000, likes: 645, comments: 3 },
  { id: 358, symbol: "AVGO", nickname: "익명_5382", holdingLabel: "관심종목",
    content: "Broadcom CEO가 TAM $1T 발언 했어. 구글 TPU, 메타 MTIA, 애플 Neural Engine 같은 커스텀 AI 칩 + 클러스터 네트워크가 다 AVGO가 먹을 시장이거든. 하이퍼스케일들이 NVIDIA 대안으로 자체 칩 설계하는데 그 설계 용역을 AVGO가 다 받는 구조야. AI 인프라에서 NVDA 다음으로 확실한 수혜주라고 봐.",
    createdAt: T26J - 25*60_000, likes: 421, comments: 2 },
  { id: 359, symbol: "AAPL", nickname: "익명_8163", holdingLabel: "관심종목",
    content: "Apple이 M5 탑재하면서 동시에 가격 인상 발표했어. 주가 -5% 넘게 빠졌고. M5 성능은 좋은데 가격 올리면서 수요 위축 우려가 더 큰 거잖아. 관세 비용 전가 포지션인데 소비자가 받아들일지가 관건이야. 단기 조정으로 끝나면 매수 기회가 될 수도 있어.",
    createdAt: T26J - 32*60_000, likes: 334, comments: 2 },
  { id: 360, symbol: "TSLA", nickname: "익명_2748", holdingLabel: "관심종목",
    content: "OpenAI IPO 지연 나왔어. SpaceX 상장 이후 타이밍 다시 재는 거야. SPCX 입장에선 경쟁 IPO가 사라지는 거니까 AI 투자 자금이 더 집중될 수 있어. 그리고 Jalapeño 칩 소식도 나왔어. 9개월 만에 Apple 도움으로 OpenAI 첫 AI 칩 개발한 거야. NVIDIA 의존도 낮추는 거고 장기적으로 추론 비용 절감이야.",
    createdAt: T26J - 42*60_000, likes: 378, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-25 — TSLA Cybercab 150대+ 외부포착·FSD핀란드·플릿수익화·ARK $4,600·
  //              사고소송·로보택시물류채용 / SPCX NASDAQ-100편입·Starmind·AI1위성·
  //              Oldendorff 화물선·Renew Home / MU Micron Q3 어닝서프라이즈
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 6/25 업데이트 ────────────────────────────────────────────────
  { id: 336, symbol: "TSLA", nickname: "익명_6247", holdingLabel: "250주 보유",
    content: "오늘 드론 사진으로 기가텍사스 EOL 외부에서 사이버캡 150대 이상이 포착됐어요. 이전까지는 공장 내부·주차장만 보였는데 외부 EOL 구역에서 이렇게 많은 대수가 잡힌 건 처음이에요. 출고 전 최종 단계예요. 테스트 루트도 1.5마일에서 2.4마일로 60% 늘었고 고속도로 구간도 포함됐어요. Austin 상업 서비스 출시 진짜 임박했다는 신호예요.",
    createdAt: T25J - 8*60_000, likes: 612, comments: 3 },
  { id: 337, symbol: "TSLA", nickname: "익명_9318", holdingLabel: "100주 보유",
    content: "핀란드 Traficom이 FSD Supervised 공식 심사 시작했어요. 네덜란드 RDW 승인 기반 상호인증 방식이라 빠르게 통과될 가능성이 높아요. 이미 5개국 승인됐고 핀란드가 6번째가 되면 EU 전역 확산 채널이 더 강해지는 거예요. 유럽 5월 등록이 28,810대로 4개월 연속 성장 중인데 FSD 확산되면 ASP랑 마진이 같이 올라가요.",
    createdAt: T25J - 15*60_000, likes: 478, comments: 2 },
  { id: 338, symbol: "TSLA", nickname: "익명_2593", holdingLabel: "300주 보유",
    content: "Tesla Fleet Network 모델이 진짜 게임체인저예요. 차주가 앱으로 시간 설정하면 자기 차가 자율주행으로 승객 태우고 수익을 내 계좌로 넣어줘요. FSD 월 구독도 불필요예요. 8시간 운행이면 월 $1,000~3,000 추정이에요. 차량 할부금 상쇄 가능한 수준이에요. 수백만 대 테슬라가 즉시 플릿이 되면 Uber·Lyft 사업 모델 자체가 날아가요.",
    createdAt: T25J - 22*60_000, likes: 543, comments: 3 },
  { id: 339, symbol: "TSLA", nickname: "익명_7641", holdingLabel: "180주 보유",
    content: "ARK가 TSLA $21.25M 또 샀어요. 최근 몇 주간 지속적이에요. 목표주가 $4,600에 변함 없고요. 근거가 로보택시 수익화 + FSD 글로벌 라이선스 + Optimus 상업화 + 에너지 Megapack이에요. 4개 사업이 동시에 올라오는 S커브 변곡점이 지금이라는 거잖아요. 기관이 이렇게 지속 매수하는 건 확신이 없으면 못 해요.",
    createdAt: T25J - 30*60_000, likes: 489, comments: 2 },
  { id: 340, symbol: "TSLA", nickname: "익명_4102", holdingLabel: "관심종목",
    content: "Arthur Singarayar가 Tesla Model 3 사고로 설계결함 소송을 제기했는데, Tesla AI 데이터 보면 엑셀을 100% 밟은 게 다 기록돼 있어요. 73mph 주거지역이고 수동 오버라이드 없음이에요. Ashok Elluswamy VP가 공식 확인했어요. 이런 소송이 언론에 크게 나오면 주가 흔들리는데, Tesla AI 블랙박스가 있어서 방어가 쉬운 구조예요. 유사 소송 대부분 Tesla 승소예요.",
    createdAt: T25J - 38*60_000, likes: 327, comments: 2 },
  { id: 341, symbol: "TSLA", nickname: "익명_8574", holdingLabel: "120주 보유",
    content: "Tesla가 Austin TX에서 로보택시 물류 분석가를 채용하고 있어요. Sr. Analyst, Robotaxi Logistics 직함이고 북미 전역 Cybercab 배포가 범위예요. 엔지니어가 아니라 ops·물류 인력 채용이라는 게 포인트예요. 상업화 실행 단계 진입이에요. 채용 공고는 가장 신뢰할 수 있는 사업 계획 증거거든요. Austin → 텍사스 전역 → 미국 전역 순서예요.",
    createdAt: T25J - 10*60_000, likes: 415, comments: 2 },

  // SPCX — 6/25 업데이트 ────────────────────────────────────────────────
  { id: 342, symbol: "SPCX", nickname: "익명_3847", holdingLabel: "관심종목",
    content: "SPCX가 7월 6일 NASDAQ-100에 공식 편입돼요. QQQ 추종 ETF가 자동으로 사야 해요. Invesco QQQ AUM이 $320B이고 SPCX 비중만큼 강제 유입이에요. 리밸런싱 전부터 선행 매수가 들어오는 패턴이고 편입 후에도 구조적으로 계속 사게 돼요. 펀더멘털 무관한 기계적 수요가 생기는 거예요. S&P500 편입 시와 똑같은 패턴이에요.",
    createdAt: T25J - 12*60_000, likes: 567, comments: 3 },
  { id: 343, symbol: "SPCX", nickname: "익명_6192", holdingLabel: "관심종목",
    content: "Elon X 바이오에 'Starmind'가 등장했어요. SpaceX AI 위성 성좌의 공식 브랜드명이에요. Starlink가 인터넷이면 Starmind는 AI 특화예요. AI1 위성이 1호기고 150kW 컴퓨팅에 70m 날개폭이에요. ISS 급 크기 위성이 궤도에서 AI 추론을 해요. 우주 데이터센터 개념이에요. SPCX가 단순 위성 통신 회사가 아니라 우주 AI 인프라 회사로 올라가는 거예요.",
    createdAt: T25J - 20*60_000, likes: 634, comments: 3 },
  { id: 344, symbol: "SPCX", nickname: "익명_1738", holdingLabel: "관심종목",
    content: "SpaceX AI1 위성 스펙 보면 150kW 온보드 AI 컴퓨팅이에요. 기존 Starlink v4가 1kW인데 150배예요. 70m 날개폭에 액체 냉각 방열판까지 탑재예요. 이 크기의 위성을 Starship으로 저비용 대량 발사하면 지구 전역에 AI 서비스를 균등하게 제공 가능해요. 국방·정부 계약에서 독점적 위치예요. 지상 클라우드와 다르게 레이턴시도 낮아요.",
    createdAt: T25J - 28*60_000, likes: 498, comments: 2 },
  { id: 345, symbol: "SPCX", nickname: "익명_5264", holdingLabel: "관심종목",
    content: "Oldendorff Carriers가 50대+ 대형 벌크선 전체에 Starlink 계약했어요. 함부르크 선사인데 철광석·석탄·곡물 수송하는 대형 화물선이에요. 선박당 연 $300K+ 계약이니까 50척이면 $15M+/yr예요. VSAT 대비 100배 빠른 속도고 선원 복지 개선에 자율항법 데이터 링크까지예요. SpaceX가 하늘이랑 바다를 동시에 장악하는 거예요.",
    createdAt: T25J - 35*60_000, likes: 421, comments: 2 },
  { id: 346, symbol: "SPCX", nickname: "익명_8930", holdingLabel: "관심종목",
    content: "Renew Home 파트너십이 나왔어요. Tesla Energy + Sunrun + SpaceX 3자예요. Tesla Powerwall, Sunrun 태양광, Starlink 관제망을 묶은 거예요. 16GW 가상발전소에 3억 가정 에너지 공급이 목표예요. 재난 때 전기랑 통신이 동시에 자립이 돼요. 이 3자 조합은 경쟁사가 모방 불가해요. TSLA랑 SPCX 둘 다 수혜예요.",
    createdAt: T25J - 18*60_000, likes: 576, comments: 3 },

  // MU — 6/25 업데이트 ────────────────────────────────────────────────
  { id: 347, symbol: "MU", nickname: "익명_4725", holdingLabel: "200주 보유",
    content: "Micron Q3 어닝 서프라이즈예요! 매출 $9.09B(예상 $8.8B), EPS $1.91(예상 $1.60 대비 +19%). YoY +58%예요. Q4 가이던스는 $9.8B~$10.2B로 컨센서스 상회해요. AI 서버 HBM 수요가 폭발하고 있고 DRAM 가격 안정에 낸드도 반등 중이에요. 반도체 슈퍼사이클 진입 공식 선언이에요. SK하이닉스 추격도 빨라지고 있어요.",
    createdAt: T25J - 25*60_000, likes: 723, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-24 — TSLA 사고오보·Q2 440K·FSD유럽 6개국·Megapack $35억·
  //              DeepSeek음성AI·Optimus중국공급망·한국FSD이전·로보택시누적마일 /
  //              SPCX 채권$89B·Starlink 9200만·우주캡슐 100Gbps·ARK역발상$22M /
  //              xAI Grok5 10조 / 매크로 달러·금리·이란
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 6/24 업데이트 ────────────────────────────────────────────────
  { id: 322, symbol: "TSLA", nickname: "익명_4817", holdingLabel: "200주 보유",
    content: "Tesla 사이버트럭 사고 오보 건 — NTSB 예비 보고서 보니까 FSD 결함이 아니라 운전자 과실이에요. 근데 초기 언론 보도는 'Tesla 자율주행 사고'로 나갔고 주가가 -2% 빠졌다가 보고서 나온 뒤 회복됐어요. 이 패턴이 진짜 반복돼요. Tesla 관련 뉴스는 초기 보도 그대로 믿지 말고 NTSB·NHSTA 공식 보고서 나올 때까지 기다리는 게 맞아요. 오보로 빠진 게 오히려 매수 기회가 됐어요.",
    createdAt: T24J - 7*60_000, likes: 348, comments: 2 },
  { id: 323, symbol: "TSLA", nickname: "익명_8392", holdingLabel: "150주 보유",
    content: "Tesla Q2 인도량 내부 추정이 440K까지 올라왔다는 업계 채널 얘기가 돌아요. 컨센서스 384K에서 크게 상회하는 거예요. 상하이 Model 3/Y 라인 추가 시프트 + 베를린 완전 정상화 + 텍사스 신형 라인 가동이 맞물린 거예요. Q1 345K에서 Q2 440K면 +27%예요. 7월 초 실제 발표 전에 이 숫자가 진짜면 주가 강하게 반응할 거예요.",
    createdAt: T24J - 14*60_000, likes: 425, comments: 3 },
  { id: 324, symbol: "TSLA", nickname: "익명_5917", holdingLabel: "80주 보유",
    content: "Tesla FSD가 독일·프랑스·이탈리아·스페인·네덜란드·벨기에 6개국에서 규제 승인 받았어요. 북미 외 지역 최초 FSD 정식 출시예요. 유럽 FSD 잠재 구독자가 수십만 대 규모인데 월 €199 구독 기준으로 recurring revenue가 상당해요. 기존 오토파일럿 유저도 FSD 업그레이드 대상이라서 전환율 10%만 돼도 수만 건이에요.",
    createdAt: T24J - 21*60_000, likes: 391, comments: 2 },
  { id: 325, symbol: "TSLA", nickname: "익명_2948", holdingLabel: "120주 보유",
    content: "Tesla가 호주 Neoen과 Megapack AUD 35억 공급 계약 서명했어요. 역대 최대 단일 Megapack 계약이에요. 풍력·태양광 연계 ESS 프로젝트 독점 공급이에요. 에너지 사업 마진이 자동차보다 높은데 이런 대형 계약이 쌓이면 FY26에 에너지 부문 매출이 처음으로 자동차 매출 추월하는 그림도 가능해요. Tesla가 에너지 회사로 재평가될 시점이 오는 거예요.",
    createdAt: T24J - 30*60_000, likes: 463, comments: 3 },

  // SPCX — 6/24 업데이트 ────────────────────────────────────────────────
  { id: 326, symbol: "SPCX", nickname: "익명_7183", holdingLabel: "관심종목",
    content: "SpaceX 투자등급 첫 채권 발행 규모가 $89B으로 확인됐어요. 단순 자금 조달이 아니에요. Starlink V3 위성 생산라인 증설 + Colossus AI 데이터센터 2단계 확장 자금이에요. BBB+ 첫 우주 기업 채권이라 기관 수요가 초과될 거예요. $100B 현금 있는데도 채권 발행하는 건 레버리지 최적화예요. 재무 전략이 빅테크 수준으로 성숙해지고 있어요.",
    createdAt: T24J - 9*60_000, likes: 512, comments: 2 },
  { id: 327, symbol: "TSLA", nickname: "익명_6291", holdingLabel: "관심종목",
    content: "Grok5 파라미터가 10T(10조)로 확인됐어요. GPT-4o 1.8T, Gemini 2.5 Pro 2T 대비 압도적 규모예요. xAI 멤피스 Colossus 200K H100 클러스터 풀 활용이에요. 수학·코딩 벤치마크에서 GPT-4o·Gemini 2.5 Pro 다 눌렀다고 해요. 파라미터보다 효율이 중요하지만 이 규모에서 효율까지 갖추면 얘기가 달라요. Elon이 Tesla FSD에 Grok5 통합한다는 발언도 있었어요.",
    createdAt: T24J - 18*60_000, likes: 387, comments: 3 },
  { id: 328, symbol: "TSLA", nickname: "익명_3847", holdingLabel: "50주 보유",
    content: "달러 인덱스(DXY)가 103 반등 + 이란 핵 협상 불발 + 연준 금리 동결 연장 신호가 동시에 나왔어요. 매크로가 성장주 압박하는 조합인데 TSLA·SPCX 같은 구조적 성장주는 금리보다 실적 모멘텀이 더 크게 작용해요. 이란 리스크 → 유가 상승은 Tesla 에너지 사업엔 오히려 긍정이에요. 매크로 노이즈에 흔들리면 매수 기회 놓쳐요.",
    createdAt: T24J - 25*60_000, likes: 294, comments: 2 },
  { id: 329, symbol: "TSLA", nickname: "익명_9413", holdingLabel: "관심종목",
    content: "DeepSeek 음성 AI 모델이 Tesla FSD 차내 인터페이스 업그레이드에 활용될 수 있다는 얘기가 나와요. Elon이 비용 효율 AI 인프라를 선호하는데 OpenAI 대비 1/20 비용이 매력이에요. Tesla 차량 내 AI를 Grok5로 갈 거냐 DeepSeek으로 갈 거냐가 분기점인데 용도별 조합 쓸 것 같아요. 어느 쪽이든 FSD 경험 품질이 올라가는 건 구독자 이탈 방지에 좋아요.",
    createdAt: T24J - 35*60_000, likes: 321, comments: 2 },
  { id: 330, symbol: "TSLA", nickname: "익명_5724", holdingLabel: "100주 보유",
    content: "Optimus 공급망이 중국 부품사 중심으로 짜인다는 보도가 나왔어요. 모터·감속기·전자피부 센서가 BYD 계열사, Foxconn, CATL이에요. 지정학 리스크가 있지만 Tesla가 선택한 이유는 단가예요. 미국 공급망으로 만들면 Optimus 한 대 $50K+인데 중국 공급망이면 $10K 이하 목표예요. $20K 판매가 → $10K 원가 = 마진 50%예요. 대중화 가능한 가격 구조가 핵심이에요.",
    createdAt: T24J - 12*60_000, likes: 408, comments: 3 },

  // SPCX — 6/24 업데이트 (추가) ─────────────────────────────────────────
  { id: 331, symbol: "SPCX", nickname: "익명_1847", holdingLabel: "관심종목",
    content: "Starlink 가입자 9,200만 돌파했어요. 작년 말 7,000만에서 6개월에 2,200만 순증이에요. 기업·정부 가입자가 일반 소비자보다 빠르게 늘고 단가가 5~10배 높아요. 올해 1억 돌파하면 월정액 매출만 수십억 달러예요. Starlink Direct-to-Cell 확대로 스마트폰 직접 연결 가입자도 늘어나고 있어요. 가입자 성장 모멘텀이 계속 유지되고 있어요.",
    createdAt: T24J - 20*60_000, likes: 445, comments: 2 },
  { id: 332, symbol: "TSLA", nickname: "익명_7382", holdingLabel: "90주 보유",
    content: "Tesla Korea가 FSD 서버를 미국에서 한국 로컬로 이전한다는 공지 나왔어요. 지연시간 개선이 목적이고 한국 규제 승인 선행 조건이기도 해요. 서버 이전 완료되면 FSD v13 한국 정식 출시 타임라인이 앞당겨지는 거예요. 한국 오너 커뮤니티 반응 보면 대기자 리스트 길어요. FSD 한국 출시 = 구독 매출 + 신규 차량 판매 촉매예요.",
    createdAt: T24J - 28*60_000, likes: 367, comments: 3 },
  { id: 333, symbol: "TSLA", nickname: "익명_4129", holdingLabel: "180주 보유",
    content: "Tesla 로보택시(Cybercab) 누적 자율주행 마일 공식 발표 — 월 500만 마일 돌파예요. Waymo가 월 700만인데 Tesla는 6개월 된 서비스가 이 수준이에요. 수익성 분기점이 월 1,000만 마일이라고 분석 나오는데 올 Q4면 달성 가능해 보여요. S커브 타고 있는 거예요. 로보택시 확장 속도가 컨센서스 훨씬 앞서가고 있어요.",
    createdAt: T24J - 40*60_000, likes: 489, comments: 2 },
  { id: 334, symbol: "SPCX", nickname: "익명_6284", holdingLabel: "관심종목",
    content: "SpaceX Dragon XL 화물 캡슐이 Starlink 100Gbps 위성 인터넷 모듈 탑재 예정이에요. 우주정거장-지상 간 100Gbps 실시간 데이터 전송이 가능해지는 거예요. 우주 데이터센터 구현의 전제 조건이에요. SpaceX가 발사체 + 통신 + 우주 컴퓨팅 수직통합하는 로드맵인데 경쟁자가 없어요. 저궤도 데이터센터 시대가 열리면 SpaceX가 AWS급 우주 클라우드가 되는 거예요.",
    createdAt: T24J - 15*60_000, likes: 426, comments: 2 },
  { id: 335, symbol: "SPCX", nickname: "익명_3912", holdingLabel: "관심종목",
    content: "ARK Invest가 SPCX를 6월 셋째 주에만 $22M(약 300억원) 순매수했어요. ARK SPACE ETF가 S&P500 편입 후 기관 자금 유입 타이밍에 캐시 확대한 거예요. Cathie Wood가 SPCX 목표가 $300 제시하면서 2030년 로드맵 밝혔어요. 현재 $168에서 3년 내 $300이면 +78%예요. ARK가 이렇게 강하게 살 때는 큰 촉매 앞에 있을 때예요. 역발상 매수의 전형이에요.",
    createdAt: T24J - 22*60_000, likes: 537, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-23 — SPCX 신용등급·현금$100B·채권·IPO$168·Colossus $6.3B /
  //              TSLA Jefferies $375·Q2 384k·중국CAAM·Optimus 7~8월 /
  //              GOOGL DeepMind -6%·MSFT Xbox 스핀오프
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — 6/23 업데이트 ────────────────────────────────────────────────
  { id: 312, symbol: "SPCX", nickname: "익명_5129", holdingLabel: "관심종목",
    content: "SpaceX가 Moody's Baa1, Fitch BBB+, S&P BBB+ 3대 신용평가사 투자등급을 동시에 받았어요. 우주 기업 최초인데 이게 왜 중요하냐면 연기금·국부펀드 같은 대형 기관들이 이제 SPCX를 의무적으로 담을 수 있게 되는 거예요. 채권도 저금리로 발행 가능해지고 — SpaceX가 전통 금융 시장에 완전 편입되는 순간이에요.",
    createdAt: T23J - 8*60_000, likes: 503, comments: 3 },
  { id: 313, symbol: "SPCX", nickname: "익명_7823", holdingLabel: "관심종목",
    content: "SpaceX 현금이 FY25말 $34.7B에서 지금 $100.8B이에요. 6개월에 3배예요. Starlink 구독 + Space Force 계약 + IPO 자금 조달이 동시에 맞물린 거예요. $100B 현금이면 외부 차입 없어도 Starlink V3, Colossus AI 다 자체 조달 가능한 수준이에요. 채권 발행은 추가 레버리지 최적화 목적이에요.",
    createdAt: T23J - 22*60_000, likes: 387, comments: 2 },

  // TSLA Jefferies / Q2 — 6/23 업데이트 ───────────────────────────────
  { id: 314, symbol: "TSLA", nickname: "익명_3491", holdingLabel: "300주 보유",
    content: "Jefferies가 TSLA 목표주가를 $350에서 $375로 올렸어요. Cybercab 로보택시 속도가 예상보다 빠르고, Optimus 7~8월 프리몬트 양산이 확정됐고, FSD 구독 142만이 근거래요. 자동차 회사가 아니라 AI 플랫폼 기업으로 재평가해야 한다는 논리인데 맞는 말이에요.",
    createdAt: T23J - 12*60_000, likes: 429, comments: 3 },
  { id: 315, symbol: "TSLA", nickname: "익명_6284", holdingLabel: "150주 보유",
    content: "Q2 인도량 컨센서스가 384,022대예요. Q1 345k에서 11% 회복이에요. 상하이가 Model 3 30,217대 +4% YoY로 선두 역할 하고 있고, CAAM 데이터에서 Tesla만 BYD·GM·Toyota 다 떨어지는 시장에서 혼자 성장했어요. 7월 초 실제 발표 숫자가 384k 넘으면 단기 주가 강세 나올 거예요.",
    createdAt: T23J - 28*60_000, likes: 356, comments: 2 },

  // TSLA Optimus / China — 6/23 업데이트 ──────────────────────────────
  { id: 316, symbol: "TSLA", nickname: "익명_8127", holdingLabel: "200주 보유",
    content: "Tesla가 프리몬트 Model S/X 라인을 Optimus로 전환해서 7~8월 양산 시작이에요. Elon이 직접 X에 확인했어요. 연간 1M대 목표에 오스틴 2공장은 10M대 장기 목표예요. 2027년 외부 판매 시작하면 Tesla 밸류에이션 계산이 완전히 달라지는 거예요. 이제 로봇 회사예요.",
    createdAt: T23J - 15*60_000, likes: 512, comments: 3 },
  { id: 317, symbol: "TSLA", nickname: "익명_4956", holdingLabel: "80주 보유",
    content: "Tesla 중국 CAAM Q2 데이터에서 BYD가 -7%, GM -10%, Toyota -12%인데 Tesla만 +4% 성장했어요. SAIC랑 Tesla만 YoY 플러스예요. 상하이 30,217대 Model 3 달성이고 유럽 수출까지 포함이에요. 중국에서 이렇게 선방하는 게 놀랍고, FSD 중국 서비스 시작되면 더 올라갈 거예요.",
    createdAt: T23J - 35*60_000, likes: 298, comments: 2 },

  // TSLA Cybercab / Lathrop — 6/23 업데이트 ───────────────────────────
  { id: 320, symbol: "TSLA", nickname: "익명_5837", holdingLabel: "180주 보유",
    content: "Joe Tegtmeyer가 기가 텍사스 테스트 트랙에서 사이버캡 약 10대가 집단 주행하는 장면을 포착했어요. 신규 FSD 카메라도 탑재된 게 확인됐고요. 기가 텍사스 서비스 가동 1주년에 이 장면이 나왔다는 게 의미심장해요. S커브 초입이라 느리게 보여도 한번 올라가기 시작하면 빠르게 확대돼요. 로보택시 상용화 초읽기예요.",
    createdAt: T23J - 6*60_000, likes: 478, comments: 3 },
  { id: 321, symbol: "TSLA", nickname: "익명_2946", holdingLabel: "90주 보유",
    content: "캘리포니아 라스롭 메가팩토리가 Q2 기준 풀 캐파 가동 들어갔다고 확인됐어요. 라스롭이 Tesla Semi랑 Megapack 동시 생산하는 거점이라서 Q2 에너지 사업부 실적에 직접 영향이에요. 자동차 부문 우려 속에서 에너지·서비스가 버텨주면 EPS 서프라이즈 가능성 있어요. 7월 초 Q2 인도 발표랑 맞물려서 눈여겨봐야 해요.",
    createdAt: T23J - 25*60_000, likes: 334, comments: 2 },

  // GOOGL / MSFT — 6/23 업데이트 ──────────────────────────────────────
  { id: 318, symbol: "GOOGL", nickname: "익명_2813", holdingLabel: "50주 보유",
    content: "DeepMind AlphaFold 만든 John Jumper가 Anthropic 간다고 하니까 구글이 하루에 -6% 났어요. 노벨상 받은 연구자 한 명 이탈이 수십조 시총 증발이에요. GPU·데이터센터가 AI 해자가 아니라 이런 사람들 몇 백 명이 진짜 해자라는 게 증명된 거예요. 구글이 인재 유지에 더 투자해야 하는데 비용이 엄청날 거예요.",
    createdAt: T23J - 18*60_000, likes: 445, comments: 3 },
  { id: 319, symbol: "MSFT", nickname: "익명_7344", holdingLabel: "70주 보유",
    content: "Microsoft가 Xbox 스핀오프·JV·매각을 검토 중이에요. 현금이 6/19 기준 $103.8B이고요. Xbox 팔고 그 돈을 Copilot·Azure에 집중하겠다는 거잖아요. Azure RPO $700B, Copilot 엔터프라이즈 폭발 중인데 게임 사업이 거기에 비하면 성장률이 너무 낮죠. 이게 확정되면 MSFT 밸류에이션 재평가 나올 것 같아요.",
    createdAt: T23J - 40*60_000, likes: 312, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-22 — SPCX Cursor $80B·TSLA FSD Semi·스페인 27.5만km·FSD 142만
  //              MEGAPOD·Optimus·Grok+FSD·Amazing Abundance·Space Force $2.29B
  //              AI위성·US Mobile 150개국·NASDAQ100 리밸런싱·AMZN $7170억
  //              클라우드 백로그·MU 영업이익·META/MSFT PVGO·GOOGL 버크셔·INTC CEO
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — 6/22 업데이트 ────────────────────────────────────────────────
  { id: 288, symbol: "SPCX", nickname: "익명_3847", holdingLabel: "관심종목",
    content: "SpaceX가 Cursor $80B에 인수한다는 게 정말 충격이에요. AI 코딩 툴 1위를 우주 기업이 가져가는 거잖아요. Starlink 통신망 위에 Cursor AI 개발 도구까지 — SpaceX가 인프라 + 소프트웨어 수직통합하는 거예요. 머스크 AI 제국이 xAI·Tesla·SpaceX를 넘어 개발자 도구까지 확장되는 거잖아요. SPCX 밸류에이션 재평가 모멘텀으로 작용할 것 같아요.",
    createdAt: T22J - 9*60_000, likes: 487, comments: 3 },
  { id: 289, symbol: "SPCX", nickname: "익명_7291", holdingLabel: "관심종목",
    content: "Cursor가 개발자들 사이에서 AI 코딩 압도적 1위인데 SpaceX가 인수한다는 게 B2B SaaS 첫 진출이에요. 우주 발사 + 위성 통신 + AI 코딩 도구 — 사업 다각화가 예상외 방향으로 가는 거예요. $80B이면 구독형 반복 매출 기반이라 SpaceX 수익 구조가 더 안정적으로 바뀌는 거예요. SPCX 장기 홀딩 이유가 하나 더 생겼네요.",
    createdAt: T22J - 24*60_000, likes: 341, comments: 2 },

  // TSLA FSD Semi/Spain — 6/22 업데이트 ────────────────────────────────
  { id: 290, symbol: "TSLA", nickname: "익명_5193", holdingLabel: "200주 보유",
    content: "Tesla Semi에 LIDAR 달고 FSD 보정하는 게 포착됐는데, 이게 '카메라 온리'를 포기한 게 아니에요. LIDAR로 정밀 3D 지도 만들어서 카메라 AI 모델 학습 레이블링 정확도를 높이는 보정 도구로 쓰는 거예요. Semi 자율주행 상용화되면 화물 운송 $1조 시장 직접 공략이에요. 마일당 과금 모델로 바뀌면 Semi가 새로운 수익 기계가 되는 거죠.",
    createdAt: T22J - 11*60_000, likes: 412, comments: 3 },
  { id: 291, symbol: "TSLA", nickname: "익명_8472", holdingLabel: "100주 보유",
    content: "스페인 DGT가 Tesla FSD 275,471km 무사고 공식 인증했어요. 지구 6.9바퀴 거리에서 사고 0건이에요. 유럽 규제 기관 최초 공식 검증이라는 게 포인트예요. 독일·프랑스·이탈리아 순차 도입의 첫 걸음이고, EU 2.5억 운전자 시장이 열리는 거예요. FSD 구독 142만에서 유럽 추가되면 얼마나 올라갈지 계산이 안 나와요.",
    createdAt: T22J - 18*60_000, likes: 378, comments: 3 },

  // TSLA FSD Subs / MEGAPOD — 6/22 업데이트 ───────────────────────────
  { id: 292, symbol: "TSLA", nickname: "익명_2938", holdingLabel: "150주 보유",
    content: "FSD 구독자가 Q2 2026E 142만 추산이에요. Q1 2025 50만에서 5분기 만에 3배예요. 월 $99 × 142만 = 연환산 $16.9억이고 소프트웨어 마진 80%+ 이면 영업이익 기여가 $13억+예요. Tesla가 자동차 회사에서 소프트웨어 회사로 전환되는 게 숫자로 보이기 시작하는 거예요. 유럽 DGT 인증 이후 가속될 거예요.",
    createdAt: T22J - 14*60_000, likes: 443, comments: 3 },
  { id: 293, symbol: "TSLA", nickname: "익명_4628", holdingLabel: "관심종목",
    content: "MEGAPOD 상표 출원이 에너지 사업 확장 신호예요. Megapack은 대형 고정식인데 MEGAPOD는 이름에서 느껴지듯 모듈식·컨테이너형으로 더 유연한 배치가 가능한 형태 같아요. AI 데이터센터 전력 수요 폭증 시기에 이동형 ESS가 나온다는 게 타이밍 완벽해요. Tesla Energy가 자동차 사업 못지않게 커질 것 같아요.",
    createdAt: T22J - 31*60_000, likes: 287, comments: 2 },

  // TSLA Optimus / Grok+FSD — 6/22 업데이트 ───────────────────────────
  { id: 294, symbol: "TSLA", nickname: "익명_9183", holdingLabel: "관심종목",
    content: "Optimus 3단계 로드맵이 2025 내부 시험 → 2026 양산 → 2027 외부 판매예요. 2027년 10만 대 × $25,000 = $25억 매출 시나리오예요. 100만 대 가면 $250억이고 로봇 사업 P/S 10x 적용하면 $2,500억 추가 가치예요. 자동차+에너지+FSD 외에 로봇까지 더해지면 Tesla가 얼마짜리 회사인지 계산이 어렵네요.",
    createdAt: T22J - 7*60_000, likes: 521, comments: 3 },
  { id: 295, symbol: "TSLA", nickname: "익명_6291", holdingLabel: "80주 보유",
    content: "Grok + FSD 통합이 구체화되는 거예요. FSD는 시각 인식이 강한데 언어 이해가 약했거든요. '다음 블록에서 좌회전'처럼 자연어 명령을 정밀하게 처리하는 게 Grok이 맡는 거예요. Tesla·xAI·Neuralink 생태계가 AI 언어+시각+행동을 통합하면 완전 자율주행의 마지막 퍼즐이 맞춰지는 거잖아요.",
    createdAt: T22J - 37*60_000, likes: 318, comments: 2 },

  // TSLA Amazing Abundance — 6/22 업데이트 ────────────────────────────
  { id: 296, symbol: "TSLA", nickname: "익명_3718", holdingLabel: "50주 보유",
    content: "Tesla가 'Amazing Abundance' 상표를 출원했어요. 에너지·노동·이동성의 풍요 — 머스크가 계속 강조해온 비전을 브랜드화한 거예요. Optimus 로봇 운영 서비스나 Cybercab 플릿 서비스, 또는 에너지 구독 서비스에 붙을 것 같아요. Tesla가 '풍요 솔루션' 기업으로 재포지셔닝하는 신호로 보여요.",
    createdAt: T22J - 42*60_000, likes: 256, comments: 2 },

  // SPCX Space Force / AI 위성 — 6/22 업데이트 ────────────────────────
  { id: 297, symbol: "SPCX", nickname: "익명_5827", holdingLabel: "관심종목",
    content: "SpaceX Space Force $22.9억 계약이에요. 군사용 Starlink가 전장 통신·ISR·재난 대응에 쓰이는데 저지연·암호화·재밍 저항 — LEO 위성 기반이라 복구 능력도 우수해요. 정부 계약 = 고마진 안정 반복 매출이에요. NATO 동맹국으로 계약 확산 가능성 생각하면 이게 시작이에요.",
    createdAt: T22J - 13*60_000, likes: 398, comments: 3 },
  { id: 298, symbol: "SPCX", nickname: "익명_8374", holdingLabel: "관심종목",
    content: "SpaceX AI 위성 로드맵이 나왔어요. 현재 V2 → V3 테라비트 → AI 위성(온보드 AI) 3단계예요. 위성에 AI 칩 탑재해서 지상 데이터센터 없이 AI 추론하는 게 우주 클라우드 컴퓨팅이에요. AWS·Azure·GCP랑 직접 경쟁하는 새로운 전선이 열리는 거예요. 2030년 이전에 이게 현실이 된다면 SpaceX 밸류에이션 $350B도 싼 거예요.",
    createdAt: T22J - 29*60_000, likes: 356, comments: 3 },

  // Starlink US Mobile — 6/22 업데이트 ────────────────────────────────
  { id: 299, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "Starlink × US Mobile 파트너십으로 150개국+ 글로벌 로밍이에요. 통신사가 인프라 레이어로 Starlink를 쓴다는 게 경쟁이 아닌 공생이에요. B2B2C 모델이라 SpaceX는 마케팅 비용 없이 가입자 확보해요. 전 세계 26억 비연결 인구 시장 공략 + T-Mobile Direct-to-Cell까지 더해지면 Starlink 구독자 수가 어디까지 갈지 모르겠어요.",
    createdAt: T22J - 46*60_000, likes: 312, comments: 2 },

  // NASDAQ100 리밸런싱 — 6/22 업데이트 ────────────────────────────────
  { id: 300, symbol: "RKLB", nickname: "익명_7483", holdingLabel: "80주 보유",
    content: "Rocket Lab이 NASDAQ100 편입이에요! QQQ AUM이 $3,000억인데 거기서 자동 매수가 발동되는 거잖아요. 우주 섹터 최초 주요 지수 편입이라는 게 역사적인 이정표예요. CRWV·ALAB·NBIS까지 AI 인프라 3종이 동시 편입 — AI+우주+반도체 테마가 이제 주류 지수에 공식 편입됐어요.",
    createdAt: T22J - 16*60_000, likes: 489, comments: 3 },
  { id: 301, symbol: "RKLB", nickname: "익명_4193", holdingLabel: "60주 보유",
    content: "NASDAQ100 편입 = 패시브 자금 자동 유입이에요. QQQ 추종 ETF들이 비중에 따라 RKLB를 반드시 사야 하는 거거든요. 소형 우주 로켓 시장 1위에 뉴트론 엔진·태양전지판 부품 사업 고성장 — 지수 편입 모멘텀과 펀더멘털이 다 좋아요. 장기 홀딩 확신이 더 생겼어요.",
    createdAt: T22J - 38*60_000, likes: 367, comments: 2 },

  // AMZN — 6/22 업데이트 ───────────────────────────────────────────────
  { id: 302, symbol: "AMZN", nickname: "익명_3947", holdingLabel: "40주 보유",
    content: "Amazon 2025 미국 매출 1위 $7,170억이에요. Walmart를 공식 추월한 거잖아요. 커머스+클라우드+광고 3중 수익 구조가 만든 플라이휠 효과가 완성됐다고 봐요. AWS AI 백로그 $4,800억까지 더하면 향후 3~4년 매출 가시성도 사상 최고예요. AMZN 지금 PE가 이걸 반영하기엔 너무 낮아요.",
    createdAt: T22J - 21*60_000, likes: 423, comments: 3 },
  { id: 303, symbol: "AMZN", nickname: "익명_6182", holdingLabel: "35주 보유",
    content: "클라우드 백로그가 AWS $4,800억, Azure +215%, GCP $2,600억이에요. 백로그는 이미 계약 서명된 미래 매출이에요. 3~5년치가 이미 확보된 상태라는 게 어마어마한 거예요. AI 기업들이 클라우드 장기 계약을 선점하고 있는 거잖아요. 클라우드 3사가 다 같이 AI로 성장하는데 AMZN PE가 왜 이렇게 낮은지 모르겠어요.",
    createdAt: T22J - 44*60_000, likes: 298, comments: 2 },

  // MU — 6/22 업데이트 ─────────────────────────────────────────────────
  { id: 304, symbol: "MU", nickname: "익명_8291", holdingLabel: "50주 보유",
    content: "Micron 영업이익 $1.3B에서 $15.7B으로 추산되는 거예요. AI HBM 수요 폭증 + DRAM 업황 개선 이중 수혜가 이렇게 숫자로 나오는 거잖아요. NVDA H100·H200·B200에 HBM3E 공급하는 게 Micron인데 에너지 효율 30%+ 우위까지 있어요. HBM 시장이 커질수록 MU가 직접 먹는 구조예요.",
    createdAt: T22J - 19*60_000, likes: 376, comments: 3 },
  { id: 305, symbol: "MU", nickname: "익명_5374", holdingLabel: "30주 보유",
    content: "MU EPS 2026E $8~10 추정에 지금 주가 보면 역사적 저점 PE 수준이에요. HBM 프리미엄이 아직 안 반영된 거예요. 중국 제재 리스크는 있지만 NVDA·AMD GPU 공급이 늘어날수록 HBM 수요가 비례해서 늘어나요. AI 인프라 투자 계속되는 한 MU 수익성 개선 트렌드 꺾이기 어려워요.",
    createdAt: T22J - 41*60_000, likes: 267, comments: 2 },

  // META/MSFT PVGO — 6/22 업데이트 ────────────────────────────────────
  { id: 306, symbol: "META", nickname: "익명_9284", holdingLabel: "70주 보유",
    content: "PVGO 분석 보니까 META 35.3%, MSFT 36%로 S&P500(55%) 대비 훨씬 낮아요. 주가의 64%+가 현재 이익으로 설명된다는 게 가치주 수준으로 평가받는 거예요. AI 성장주인데 가치주처럼 거래된다는 게 저평가 시그널이에요. Meta AI 수익화 가시화되면 PVGO가 올라가면서 주가 재평가가 오는 거예요.",
    createdAt: T22J - 12*60_000, likes: 412, comments: 3 },
  { id: 307, symbol: "MSFT", nickname: "익명_2847", holdingLabel: "60주 보유",
    content: "MSFT PVGO 36%가 S&P500 55% 대비 훨씬 낮다는 게 Copilot 수익화가 아직 밸류에이션에 안 녹아든 거예요. Azure RPO $700B 돌파에 Copilot $30/월 구독 폭발 중인데 주가는 가치주 수준으로 있어요. AI ROI 논란 해소되고 수익화 본격화되면 PVGO 상승 = 주가 재평가 나와요. 지금이 기회예요.",
    createdAt: T22J - 33*60_000, likes: 356, comments: 2 },

  // GOOGL — 6/22 업데이트 ─────────────────────────────────────────────
  { id: 308, symbol: "GOOGL", nickname: "익명_4829", holdingLabel: "30주 보유",
    content: "버크셔 해서웨이가 GOOGL을 5대 보유 주식으로 편입했어요. 버핏이 기술주 회의론자인데 GOOGL 편입한다는 게 엄청 강력한 신호예요. PVGO 47.8%로 S&P500 대비 낮고, AI 검색 독점+YouTube+GCP 복합 수익 기반이 가치투자 기준 통과한 거예요. 버핏이 인정한 기술주 = 시장도 따라가는 경향이 있어요.",
    createdAt: T22J - 22*60_000, likes: 478, comments: 3 },
  { id: 309, symbol: "GOOGL", nickname: "익명_7391", holdingLabel: "25주 보유",
    content: "버크셔 Top 5에 GOOGL 편입이 가치투자 + AI 성장의 교차점이에요. 검색 광고 독점 + YouTube + GCP 세 수익원 중 하나만 남아도 가치가 있는 회사예요. Gemini가 ChatGPT에 대항하고 TPU로 AI 인프라 비용도 낮추는 중이에요. 버핏이 사면 패시브 펀드들도 주목하는 구조예요.",
    createdAt: T22J - 48*60_000, likes: 312, comments: 2 },

  // INTC — 6/22 업데이트 ──────────────────────────────────────────────
  { id: 310, symbol: "INTC", nickname: "익명_6284", holdingLabel: "관심종목",
    content: "Intel CEO가 '5~10년 내 10배 수익 잠재력'을 팟캐스트에서 직접 말했어요. 2030~2035년이 진면목 드러나는 시기라고요. IBA 파운드리 분리 + 18A/14A 공정 + AI 엣지칩 전략이에요. 고위험·고수익 플레이가 맞고 단기 실적 부진 감수해야 해요. 5년+ 장기 투자자라면 지금 담는 게 기회일 수 있어요.",
    createdAt: T22J - 26*60_000, likes: 367, comments: 3 },
  { id: 311, symbol: "INTC", nickname: "익명_3948", holdingLabel: "관심종목",
    content: "Intel 10배 발언이 설득력 있으려면 18A 공정 수율 잡는 게 핵심이에요. TSMC 대안 파운드리가 되려면 대형 고객 하나를 잡아야 하는데 지정학 이유로 미국 파운드리 찾는 빅테크들이 있잖아요. $131까지 온 주가가 보여주듯 이미 회복 중이에요. 2030 전까지 인내할 수 있으면 10배가 허언이 아닐 수 있어요.",
    createdAt: T22J - 52*60_000, likes: 289, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-20 — Cybercab EPA CoC·Liquid Armor·Cathie Wood·신용등급 /
  //              SPCX 락업·Q1 Upmass 86%·Starlink DTS·TeraFab Giga Texas /
  //              NVDA 추론74%·AMZN Trainium외판·AWS$137B·TomLee·이란종전
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 6/20 업데이트 ─────────────────────────────────────────────────
  { id: 274, symbol: "TSLA", nickname: "익명_5274", holdingLabel: "200주 보유",
    content: "EPA가 Cybercab에 클린에어법 적합 인증서(COC) 발급했어요. 2026 모델연도, 발효일 05/26/2026, 내구수명 150,000마일이에요. EPA + NHTSA ADA 인증에 이어 COC까지 — 서류상으로는 로보택시 운행에 빠진 게 없어요. 테슬라라티가 2개월 안에 Cybercab이 로보택시 플릿에 투입될 수 있다고 한 게 더 현실적으로 들려요. Cybercab 로고도 차량에 붙기 시작했고, 기존 Model Y들이 Cybercab으로 전환되는 것도 목격되고 있어요.",
    createdAt: T20J - 8*60_000, likes: 423, comments: 3 },
  { id: 275, symbol: "TSLA", nickname: "익명_8372", holdingLabel: "100주 보유",
    content: "EPA COC 발급일이 05/26인데 지금 6/20이잖아요. 거의 한 달 가까이 비공개로 있던 건데 이게 공식 발표 나오면 로보택시 타임라인이 확실해져요. Model Y가 Cybercab 라벨로 전환되는 것도 봐요. Tesla가 양산 Cybercab 나오기 전에 기존 차량으로 fleet 미리 채우는 전략인 것 같아요. 2개월 내 로보택시라는 게 빈말이 아닌 거예요.",
    createdAt: T20J - 22*60_000, likes: 287, comments: 2 },
  { id: 276, symbol: "TSLA", nickname: "익명_3847", holdingLabel: "50주 보유",
    content: "Tesla가 '왜 이 부품을 더 빠르게 못 칠까?'라는 질문에서 시작해서 페인트 자체를 없애버리는 발상을 한 거잖아요. 기존 자동차 공장에서 가장 비싸고 복잡한 공정이 페인트샵인데 Tesla는 '액체 아머' 몰딩 시스템으로 필름을 성형 단계에서 입히는 구조로 전환 중이에요. 기가캐스팅이 조립 공정을 혁신했다면 이건 마감 공정을 혁신하는 거예요. 완성되면 자동차 제조 원가가 또 한 번 구조적으로 낮아지고 경쟁사들이 따라오려면 몇 년 걸릴 거예요.",
    createdAt: T20J - 15*60_000, likes: 356, comments: 3 },
  { id: 277, symbol: "TSLA", nickname: "익명_7291", holdingLabel: "관심종목",
    content: "Cathie Wood ARK가 TSLA 추가로 $20M 매수했어요. 현재 주가 기준 22.6x 할인 분석이 나왔는데 Dec 2007 EPS $8.76 기준으로 역대급 저평가라는 ARK 논리예요. ARK 목표주가 $2,600 유지 중이고 이 가격에서 추가 매수한다는 게 확신이에요. ARK가 TSLA + SpaceX 동시에 들고 있는 게 머스크 생태계 전체에 베팅하는 거잖아요. 일론 머스크도 신용등급이 '터무니없이 낮다'고 했고 $40B+ 현금에 무부채 기업이 이 평가를 받는 게 맞냐는 거예요.",
    createdAt: T20J - 32*60_000, likes: 312, comments: 2 },
  { id: 278, symbol: "TSLA", nickname: "익명_4629", holdingLabel: "150주 보유",
    content: "일론 머스크가 Tesla 신용등급이 'ridiculously low(터무니없이 낮다)'라고 직접 말했어요. Tesla $40B+ 현금, 부채 없음, 꾸준한 흑자예요. 신용평가사들이 자동차 기업 프레임으로 Tesla를 보는 게 문제예요. 에너지+소프트웨어+AI 기업 프리미엄을 반영하면 완전히 다른 등급이 나와요. SpaceX가 Moody's Baa1 받고 $20B 채권 발행한 게 바로 어제잖아요. Tesla도 신용등급 올라가면 같은 구조로 저비용 자본 조달이 가능해요.",
    createdAt: T20J - 45*60_000, likes: 279, comments: 2 },

  // SPCX — 6/20 업데이트 ────────────────────────────────────────────────
  { id: 279, symbol: "SPCX", nickname: "익명_6483", holdingLabel: "관심종목",
    content: "SpaceX IPO 락업 해제 스케줄 정리하면: IPO 직후 자유유동 4.9%. 8월 8일 11.8%로 시작해서 단계별 증가, Day 366(2027년 6월 12일)에 일론 머스크 46.1% 지분 해제 → 하루에 +46% 추가, 전체 99.5% 유동. 최종 완전 해제 2027년 9월. 이 스케줄을 알면 각 단계에서 잠재적 물량 압박을 예측할 수 있어요. Day 366 일론 락업 해제가 가장 중요한 이벤트예요. Facebook IPO처럼 기관들이 락업 해제 후에 오히려 진입하는 경우도 있으니 공포에 팔지 않는 게 중요해요.",
    createdAt: T20J - 12*60_000, likes: 445, comments: 3 },
  { id: 280, symbol: "SPCX", nickname: "익명_2938", holdingLabel: "관심종목",
    content: "Bryce Tech Q1 2026 데이터: SpaceX 556,057kg / 전체 647,412kg = 86%, YoY +18%. 2위 CASC(중국)이 40,980kg인데 SpaceX가 2위보다 13.5배 많이 쏜 거예요. Steve Jurvetson이 '그래프에서 다른 기업들이 돋보기 없이 안 보인다'고 했는데 정말 그래요. 팔콘 9 재사용 경제성이 만들어내는 해자예요. Starship 상업 발사 시작되면 이 격차가 90%+ 로 더 벌어질 거예요.",
    createdAt: T20J - 28*60_000, likes: 389, comments: 3 },
  { id: 281, symbol: "SPCX", nickname: "익명_5827", holdingLabel: "관심종목",
    content: "Starlink Direct-to-Cell이 이미 30개국에 연결됐고 Deutsche Telekom이 50개 유럽 국가 커버 계약을 2026년부터 시작해요. 기존 셀타워 없이 위성이 직접 스마트폰에 연결되는 거잖아요. Deutsche Telekom 같은 통신 강자가 인프라를 Starlink에 맡긴다는 게 경쟁이 아니라 인프라 레이어로 인식하기 시작한 거예요. 전 세계 22억 명 오프라인 인구 커버 가능한 시스템이에요. 기존 통신사 비즈니스 모델이 흔들리는 신호예요.",
    createdAt: T20J - 40*60_000, likes: 318, comments: 2 },

  // TeraFab — 6/20 업데이트 ────────────────────────────────────────────
  { id: 282, symbol: "TSLA", nickname: "익명_9183", holdingLabel: "관심종목",
    content: "Joe Tegtmeyer가 Giga Texas 근처 TeraFab 합작 AI 칩 공장 부지 드론으로 촬영했어요. SpaceX × xAI × Tesla 합작 $250B 프로젝트가 이제 실제 부지 공사 단계예요. 설계·제조·메모리·패키징·테스트를 한 지붕 아래 두는 구조로 TSMC 의존도를 없애려는 전략이에요. Giga Texas 옆이니까 Tesla 제조 인프라 + SpaceX 발사 + xAI 소프트웨어가 물리적으로 한 곳에 모이는 거예요. AI 칩 세계 25% 생산 목표가 드론 사진으로 현실이 되고 있어요.",
    createdAt: T20J - 19*60_000, likes: 415, comments: 3 },

  // NVDA — 6/20 업데이트 ───────────────────────────────────────────────
  { id: 283, symbol: "NVDA", nickname: "익명_7483", holdingLabel: "120주 보유",
    content: "NVDA AI 추론 시장 점유율이 Q1 2025 66%에서 Q1 2026 74%로 올랐어요. 경쟁자들이 뭘 만들어도 NVDA가 오히려 점유율을 높여가고 있어요. Q1 2026 NVDA 추론 매출 $41B, 나머지 업체 합산 $15B이에요. AMD, Intel, 커스텀 칩들이 다 합쳐서 $15B인데 NVDA 혼자 $41B이에요. '추론은 NVDA 독점 시대 끝난다'는 논리가 계속 틀린다는 게 데이터로 증명되는 거예요.",
    createdAt: T20J - 16*60_000, likes: 498, comments: 3 },

  // AMZN — 6/20 업데이트 ───────────────────────────────────────────────
  { id: 284, symbol: "AMZN", nickname: "익명_3724", holdingLabel: "40주 보유",
    content: "Bloomberg: Amazon이 자체 AI 칩 Trainium을 외부 기업 데이터센터에 판매 협의 중이에요. Amazon AI 책임자 Peter DeSantis가 인정했고 이미 OpenAI $5B, Anthropic $1B 약정한 상태예요. 그동안 AWS 내부용으로만 썼는데 외부에도 팔면 NVDA 경쟁자가 되는 거예요. Trainium2가 H100보다 추론 마진이 좋다는 평가도 있어요. AWS $137B TTM에 Trainium 외판 수익까지 더해지면 AMZN 반도체 사업에 새로운 레이어가 생기는 거예요.",
    createdAt: T20J - 35*60_000, likes: 362, comments: 2 },
  { id: 285, symbol: "AMZN", nickname: "익명_8293", holdingLabel: "30주 보유",
    content: "AWS TTM 매출이 $137.05B이에요. 2018년 $25.66B에서 시작해서 지금까지 직선 우상향이에요. AI 클라우드 수요가 폭발하는 지금 이 성장이 더 가속되는 중이에요. Trainium2 추론 마진 업계 최고에 외부 판매까지 열리면 성장 드라이버가 하나 더 추가돼요. Amazon PE가 29.13x로 역대 최저 수준인 게 이 성장 대비 저평가라는 논리가 지금도 유효해요. $200B 넘는 게 멀지 않을 거예요.",
    createdAt: T20J - 48*60_000, likes: 287, comments: 2 },

  // 매크로 — 6/20 업데이트 ────────────────────────────────────────────
  { id: 286, symbol: "NVDA", nickname: "익명_5129", holdingLabel: "관심종목",
    content: "Tom Lee가 2026 시장 3단계 전망 발표했어요. 1단계(지금~여름 말): S&P 7,700~7,800까지 상승, 불장 유지. 2단계(여름 말~가을): 갑자기 베어마켓처럼 느껴지는 급락 — 실제론 불장이지만 공포에 팔기 좋은 구간이에요. 3단계(가을 이후): 강한 회복, 수십 년 중 가장 강한 기간. 주의할 건 Anthropic + OpenAI IPO 대규모 언락이 시장 매도 압력으로 작용할 수 있다는 거예요. 2단계 급락 시점에 팔지 않고 버티면 3단계에서 수익 나는 구조예요.",
    createdAt: T20J - 26*60_000, likes: 521, comments: 3 },
  { id: 287, symbol: "SPCX", nickname: "익명_6374", holdingLabel: "관심종목",
    content: "이란 외무부가 '미국과 전쟁을 전자서명으로 합의해 종료했다'고 공식 발표했어요. 호르무즈 해협도 개방 상태 유지예요. Trump 대통령이 해협을 직접 통과하면서 중국에도 감사 인사 했고요. 지정학 리스크 완화 → 에너지 가격 안정 → 인플레 하락 → Fed 금리 인하 여력 → 성장주 상승이라는 거대한 도미노예요. SpaceX Starlink 중동 지역 배포 가속화 가능성도 있어요. 이게 다 맞으면 Tom Lee 3단계 시나리오랑 맞아 떨어지는 거예요.",
    createdAt: T20J - 56*60_000, likes: 389, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-19 — FSD 보이스커맨드·OpenClass AI·아시아FSD·Megapack25K /
  //              SPCX Baa1채권$20B·ARK5펀드·Starlink Flow·TeraFab /
  //              AMZN PE29·AAPL가격+15%·NFLX$37.3B·INTC정부+$48B·NVDA·MSFT
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 6/19 업데이트 ─────────────────────────────────────────────────
  { id: 258, symbol: "TSLA", nickname: "익명_3719", holdingLabel: "150주 보유",
    content: "FSD 보이스 커맨드가 3개월 내에 나온다는 게 HW3 포함이라는 게 제일 중요해요. 이전 세대 오너들도 K.I.T.T 스타일로 '어디 가고 싶어?' 말하면 FSD가 알아서 가는 시대가 오는 거잖아요. Cybertruck이 미국 20개 이상 도시에서 FSD V14 카메라 달고 포착되고 있고 뉴질랜드까지 테스트 중이에요. 스페인 6/30 승인, 한국 구독 버튼 등장 — FSD가 글로벌 동시다발로 확산되는 속도가 예상보다 훨씬 빠르네요.",
    createdAt: T19J - 8*60_000, likes: 312, comments: 3 },
  { id: 259, symbol: "TSLA", nickname: "익명_8246", holdingLabel: "200주 보유",
    content: "OpenClass AI 에이전트 채용 공고 봤는데 강화학습 엔지니어 연봉 $490K예요. 물리적 옵티머스 공장 짓는 것도 대단한데 디지털 옵티머스까지 동시에 진행 중이에요. 소프트웨어 에이전트가 회사 내부 업무 자동화하고 나중엔 B2B로 팔 수 있는 구조잖아요. 일론이 AI 에이전트를 소프트웨어 도구 사용에 배포한다고 했는데 테슬라가 그 플랫폼을 만들고 있다는 게 흥미로워요. 자동차+로봇+에너지+AI 에이전트까지 가는 거잖아요.",
    createdAt: T19J - 22*60_000, likes: 278, comments: 3 },

  // SPCX — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 260, symbol: "SPCX", nickname: "익명_5183", holdingLabel: "관심종목",
    content: "Moody's Baa1 투자등급 받고 IPO 이틀 만에 $20B 채권 발행 준비라는 게 놀라워요. 정크 바로 위 등급이긴 한데 연금·보험사 같은 기관들이 투자 가능해지는 거잖아요. Morgan Stanley·Goldman·JPMorgan이 주관사로 들어온 것도 봐요. Starlink 900만 구독자 월 $1B+ 반복 수익, Falcon 9 100회+/년 발사, NASA·DoD 장기 계약이 Moody's가 투자등급 준 근거예요. SpaceX가 스타트업 졸업하고 대기업 수준 자본 시장 접근성 확보한 거예요.",
    createdAt: T19J - 11*60_000, likes: 445, comments: 3 },
  { id: 261, symbol: "SPCX", nickname: "익명_9374", holdingLabel: "관심종목",
    content: "ARK 5개 펀드 전부 편입이라는 게 정말 전례 없는 거예요. ARKX(우주방위), ARKQ(자율주행로봇), ARKW(차세대인터넷), ARKK(이노베이션)에 2023년부터 보유하던 Venture Fund까지요. Cathie Wood가 '역사상 가장 위대한 인프라 기업 중 하나'라고 했는데 Starlink × Flow 허리케인 파트너십 보니까 실제로 B2B 통신 인프라 표준이 되어가고 있어요. 허리케인 시즌 직전에 계약 발표했다는 것도 실질 수요가 즉각적이라는 신호예요.",
    createdAt: T19J - 28*60_000, likes: 389, comments: 3 },

  // AMZN — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 262, symbol: "AMZN", nickname: "익명_7429", holdingLabel: "45주 보유",
    content: "AMZN PE 29.13x가 역대 최저라는 건데 AWS 올해 성장률이 +27%예요. PEG 비율로 따지면 29/27 = 1.07 수준이에요. 성장률 대비 이렇게 싼 AMZN은 사실 본 적이 없어요. Trainium 기반 추론 마진이 Google 다음으로 높고 AI Capex ROI가 이미 플러스라는 게 FT에 나왔어요. 고점 대비 -12% 조정 구간에서 분할로 추가하는 게 맞는 것 같아요. 광고 사업 안정성까지 보면 이 PE는 너무 싼 거예요.",
    createdAt: T19J - 17*60_000, likes: 267, comments: 2 },
  { id: 263, symbol: "AMZN", nickname: "익명_2638", holdingLabel: "30주 보유",
    content: "AWS -12%면 $30 이상 빠진 거잖아요. 그런데 성장률은 +27%고 AI 투자 수익률은 이미 플러스예요. 클라우드 3위 Google이 이 구간에서 역전당한 적 있나요? 없어요. 이 구간이 기회라고 봐요. Trainium2가 NVIDIA GPU 대비 40% 저렴한 학습 비용이고 자체 칩이니까 마진도 좋아요. PE 29x에 성장 이 정도면 망설일 이유가 없어요.",
    createdAt: T19J - 39*60_000, likes: 198, comments: 2 },

  // AAPL — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 264, symbol: "AAPL", nickname: "익명_4851", holdingLabel: "60주 보유",
    content: "팀 쿡이 '40년 커리어에서 처음'이라고 했다는 거 자체가 충격이에요. 메모리 공급 부족이 그 정도라는 건데 iPhone 18 AI 기능 탑재에 필요한 DRAM을 메타·MS·구글·아마존이 AI 학습용으로 싹 가져가고 있는 거잖아요. +15% 인상이면 iPhone 18 Pro $1,299인데 이 정도면 삼성·샤오미로 가는 사람도 있겠지만 Apple 생태계 충성도가 얼마나 센지 생각하면 수요 탄성이 낮을 거예요. 인상 성공하면 마진이 오히려 좋아지는 거죠.",
    createdAt: T19J - 14*60_000, likes: 234, comments: 2 },
  { id: 265, symbol: "AAPL", nickname: "익명_6917", holdingLabel: "관심종목",
    content: "이 뉴스에서 진짜 수혜주를 찾으면 Micron이랑 SK하이닉스예요. Apple이 이렇게 메모리 달라고 줄 서는 상황이 계속되면 메모리 가격은 계속 오르는 거잖아요. AAPL 본인은 가격 인상으로 방어하는데 MU·SNDK가 직접 수혜받는 구조예요. Apple Intelligence 확대되면 iPhone당 메모리 탑재량이 계속 올라갈 거고 이건 구조적 수요 증가예요.",
    createdAt: T19J - 33*60_000, likes: 187, comments: 2 },

  // NFLX — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 266, symbol: "NFLX", nickname: "익명_3047", holdingLabel: "관심종목",
    content: "$37.3B 자사주 매입인데 오늘 주가 $73.34에서 회사 전체를 살 수 있는 규모라고 해요. 경영진이 '지금 주가가 싸다'는 가장 직접적인 신호예요. 2월 저점 $56에 근접했는데 거기서 자사주 매입 속도를 높이면 주가 지지선이 생기는 거잖아요. 광고 요금제 성장, NFL 라이브, WWE 독점 — 수익 다변화가 되는 구간에서 자사주 매입까지 나왔어요. 장기 EPS 증가 확실한 시나리오예요.",
    createdAt: T19J - 9*60_000, likes: 198, comments: 2 },
  { id: 267, symbol: "NFLX", nickname: "익명_8523", holdingLabel: "25주 보유",
    content: "넷플릭스가 한창 성장할 때 자사주 매입 잘 안 했잖아요. 이제 성숙기에 들어오면서 주주환원이 강해지는 거예요. $37.3B은 역사상 최대 규모 프로그램이고 PE 기준으로도 지금 NFLX는 꽤 싼 편이에요. K-드라마 콘텐츠가 글로벌에서 잘 나오고 있고, 게임도 추가 수익이에요. 2월 저점 $56이 바닥이었다면 지금 $73은 아직 상승 여지가 있는 거죠.",
    createdAt: T19J - 41*60_000, likes: 156, comments: 2 },

  // INTC — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 268, symbol: "INTC", nickname: "익명_5291", holdingLabel: "관심종목",
    content: "미국 정부가 2025년 8월에 인텔 주식을 $20.47에 ~$8.9B 투자했는데, 지금 Intel이 $131.61이에요. 433.3M주가 지금 ~$57B이고 정부가 ~$48B 수익 중이에요. CHIPS Act 투자가 +542% 수익률로 역대 최고 성공 사례가 되고 있어요. Intel 18A 공정이 제대로 돌아가고 있다는 게 주가로 증명된 거잖아요. 미국 반도체 공급망 자립화 전략이 이렇게 결실을 맺는 거예요.",
    createdAt: T19J - 19*60_000, likes: 312, comments: 2 },
  { id: 269, symbol: "INTC", nickname: "익명_1874", holdingLabel: "관심종목",
    content: "정부가 $20.47에 매수해서 현재 $131.61이면 6배 이상이에요. ~$48B 수익이라는 게 숫자로 보면 CHIPS Act 전체 예산을 훨씬 웃도는 수준이에요. 미국 정부 입장에서는 재정 수익 + 반도체 공급망 자립화라는 두 마리 토끼를 다 잡은 거예요. Intel 파운드리 18A가 고객을 확보해가면서 TSMC 대안으로 포지셔닝 성공한 게 주가 상승의 본질이에요.",
    createdAt: T19J - 47*60_000, likes: 198, comments: 2 },

  // NVDA — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 270, symbol: "NVDA", nickname: "익명_7381", holdingLabel: "80주 보유",
    content: "젠슨 황이 SaaS 죽는다 = GPU 덜 필요 논리를 정면으로 반박한 게 이번에 나왔어요. 기업들이 자체 AI 모델 만드는 게 아니라 AI 에이전트가 소프트웨어 도구를 쓰는 거고, 그러면 SW 기업들이 AI 처리에 GPU를 더 많이 써야 한다는 논리예요. NVDA 데이터 확인한 거잖아요. 'AI 에이전트 = GPU 수요 확대'가 공식이 된 거예요. SaaS 망할까봐 NVDA 팔았던 사람들이 틀렸다는 게 젠슨이 직접 증명한 거예요.",
    createdAt: T19J - 16*60_000, likes: 356, comments: 3 },
  { id: 271, symbol: "NVDA", nickname: "익명_4628", holdingLabel: "120주 보유",
    content: "STRL, ENOVA 같은 SaaS 기업들이 'AI가 소프트웨어 쓸모없게 한다'는 논리로 팔리고 있는데 그게 오히려 AI 에이전트가 그 소프트웨어를 더 많이 쓴다는 현실을 무시한 거예요. NVDA는 이미 이 패턴을 실데이터로 보고 있다고 했잖아요. GPU 수요가 줄어드는 게 아니라 에이전트 시대일수록 더 늘어나는 거예요. Forward PE 24x에 이 성장이 반영 안 된 게 저평가 이유예요.",
    createdAt: T19J - 32*60_000, likes: 289, comments: 3 },

  // MSFT — 6/19 업데이트 ────────────────────────────────────────────────
  { id: 272, symbol: "MSFT", nickname: "익명_2954", holdingLabel: "70주 보유",
    content: "Microsoft Commercial RPO가 +97.3% YoY로 $700B 돌파했다는 게 정말 대단한 숫자예요. RPO는 이미 계약 서명된 미래 수익이거든요. 연매출의 3배 이상이 선예약된 상태라는 건데 이 정도 실적 가시성을 가진 기업이 또 있나요? Azure AI + Copilot 기업 계약이 폭발하고 있다는 직접 증거예요. 'AI ROI 언제 나와?' 논란이 있는데 RPO $700B이 그 답이에요. 나왔어요.",
    createdAt: T19J - 13*60_000, likes: 298, comments: 2 },
  { id: 273, symbol: "MSFT", nickname: "익명_6839", holdingLabel: "50주 보유",
    content: "5년 CAGR +47%인 RPO가 이번 분기 +97.3%로 가속됐다는 게 Azure Copilot 기업 계약이 임계점을 넘었다는 신호예요. Fortune 500 기업 70%가 Copilot 도입했다는 데이터가 이걸 설명해줘요. 경기 하락이 와도 3년 약정 계약이 쌓여 있으면 매출이 급락하기 어려운 구조잖아요. 기관 투자자들이 왜 MSFT를 방어적 성장주로 보는지 RPO 하나로 설명돼요.",
    createdAt: T19J - 45*60_000, likes: 231, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-18 — 이란핵합의 서명·메모리부족 CEO 경고·NVDA $25B채권 /
  //              Tesla FSD 유럽 RDW·연준 동결 S&P 최악 Fed Day /
  //              Tesla vs SpaceX 재무역전·Optimus 3층·유럽Q2 4,000대
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 6/18 업데이트 ─────────────────────────────────────────────────
  { id: 250, symbol: "TSLA", nickname: "익명_4823", holdingLabel: "120주 보유",
    content: "네덜란드 RDW 승인이 오늘 가장 큰 테슬라 뉴스라고 봐요. 1,000회 이상 통제 테스트에 4만km+ 감독 주행 결과를 독립 검증해서 '강력 지지' 승인한 거거든요. 벨기에(5/22)에 이어 두 번째인데 독일·프랑스가 이걸 근거로 신청하면 Q3 중에 EU 전역 확산 시나리오가 실현되는 거예요. EU 테슬라 80만+ 대 중 FSD 전환율 10%만 잡아도 $640M~$800M 일회성 수익 + 구독 누적이에요. 소프트웨어 마진이 찍히기 시작하는 분기가 진짜 재평가 트리거예요.",
    createdAt: T18J - 7*60_000, likes: 487, comments: 4 },
  { id: 251, symbol: "TSLA", nickname: "익명_1374", holdingLabel: "180주 보유",
    content: "유럽 주간 4,000대 나왔는데 이게 그냥 숫자가 아니에요. WoW +12.7%, QoQ +22.9%, YTD +20.5%로 Q2 들어서 역대 최고 주간 성과예요. 노르웨이·네덜란드·독일·영국 등 11개국 합산이고 신형 Model Y 구매 사이클이 본격 돌아가는 거예요. Goldman이 Q2 인도 42~43만 전망했는데 유럽 회복이 그 숫자 뒷받침해주는 구조예요. 여기다 FSD RDW 승인 기대감으로 대기 물량이 풀리면 Q3 유럽이 진짜 빠를 것 같아요.",
    createdAt: T18J - 18*60_000, likes: 351, comments: 3 },
  { id: 252, symbol: "TSLA", nickname: "익명_5532", holdingLabel: "250주 보유",
    content: "Optimus 공장 철골 3층 확인됐다는 게 오늘 저한테는 제일 중요한 뉴스예요. 드론 전문가 Joe Tegtmeyer가 '최소 3층 이상, 위로 더 있다'고 했고 대형 크레인 여러 대가 동시 작업 중이라는 거잖아요. 말로만 하는 게 아니라 물리적 증거가 나온 거예요. Q4 2026 첫 생산 시작, 2027년 볼륨 증가 시나리오가 현실이 되는 타임라인이에요. 10M × $30K = 연간 $300B 포텐셜이 그냥 공상이 아니라는 게 지금 이 사진들로 증명되고 있어요.",
    createdAt: T18J - 31*60_000, likes: 412, comments: 4 },

  // NVDA — 6/18 업데이트 ─────────────────────────────────────────────────
  { id: 253, symbol: "NVDA", nickname: "익명_7156", holdingLabel: "관심종목",
    content: "$25B 채권 발행인데 자회사들이 추가로 $25B 주문했다는 게 핵심이에요. 발행액의 2배 수요가 시장에서 NVDA 미래 현금흐름에 그만큼 확신이 있다는 거잖아요. 주식 희석 없이 성장 자금 조달한 거라 기존 주주한테 완전히 친화적인 딜이에요. Forward PE 24x가 2022년 이후 최저인데, AI 성장률 50%+ 감안하면 PEG 0.5 이하예요. 지금이 AI 주도 기업 중 가장 싼 수준이라는 게 이 딜로 확인됐어요. 메모리 부족 뉴스도 같이 나와서 AI 수요 가속 사이클이 이어지는 구조예요.",
    createdAt: T18J - 14*60_000, likes: 398, comments: 3 },

  // MU — 6/18 업데이트 ──────────────────────────────────────────────────
  { id: 254, symbol: "MU", nickname: "익명_2947", holdingLabel: "80주 보유",
    content: "Micron CEO랑 SanDisk CEO가 같은 날 '메모리 부족'을 동시에 공개 확인한 거잖아요. 채널 체크 결과랑 완전히 일치하는 얘기예요. NVDA Blackwell GB200 NVL72 한 랙에 HBM3E 1.1TB가 들어가는데 하이퍼스케일러가 역대 최대 설비투자 하는 중이니까 공급이 따라갈 수가 없어요. 리드타임이 12~18개월이라 지금 주문 넣어도 2027년에나 받는 구조예요. 이 사이클에서 MU는 가격·물량·마진이 동시에 올라가는 구조가 됩니다. 2026 H2부터 실적에 찍히기 시작할 거예요.",
    createdAt: T18J - 25*60_000, likes: 334, comments: 3 },

  // 매크로 — 6/18 업데이트 ──────────────────────────────────────────────
  { id: 255, symbol: "SPY", nickname: "익명_3394", holdingLabel: "관심종목",
    content: "연준 12-0 만장일치 동결은 예상 범위였는데 포워드 가이던스 완전 철회가 문제였어요. '몇 달 후에 결정'이라는 게 사실상 방향성 소멸 선언이에요. 시장이 기대한 9월 인하 힌트가 없어서 S&P500이 1994년 이후 Fed Day 최대 낙폭 -2.8% 찍은 거잖아요. 근데 이란 합의로 유가가 $50 아래로 내려가면 서비스 물가가 핵심 변수인데 에너지 디플레이션이 CPI를 끌어내리면 9월 인하 시나리오가 다시 살아날 수 있어요. 단기 패닉이지만 중장기는 다른 얘기예요.",
    createdAt: T18J - 42*60_000, likes: 289, comments: 3 },
  { id: 256, symbol: "XOM", nickname: "익명_6418", holdingLabel: "관심종목",
    content: "이란-미국 핵합의 오늘 서명 임박 소식이 에너지 섹터한테는 직접 역풍이에요. 서명 즉시 제재 해제되고 이란 일일 300~400만 배럴이 시장에 풀리는 구조예요. WTI 이미 $50 아래인데 $45~48까지 추가 하락 가능성이 있어요. XOM·CVX·COP 실적 압박이 불가피한데 반대로 항공·운송·화학은 비용 절감이 생기고 소비자 실질소득이 올라가요. 에너지 비중 있으면 헤징 검토할 타이밍이고 항공주 비중 늘리는 게 낫지 않을까 싶어요.",
    createdAt: T18J - 55*60_000, likes: 246, comments: 2 },

  // SPCX — 6/18 업데이트 ────────────────────────────────────────────────
  { id: 257, symbol: "SPCX", nickname: "익명_8671", holdingLabel: "관심종목",
    content: "Tesla Q1 -$590M vs SpaceX +$1.62B — 머스크 두 기업 재무가 완전히 역전됐어요. Starlink 구독자 900만+ 명의 월 $1.08B 반복 수익 구조가 흑자를 만들고 있고, Tesla는 가격 인하 + Optimus/FSD R&D 투자 비용이 쌓이면서 손실이 난 거예요. 시총은 테슬라가 $1.1T로 SpaceX $350B의 3배인데 이게 Optimus 10M 로봇 잠재력을 포함한 선행 가격이에요. SpaceX 흑자 전환은 Tesla가 걷는 투자 사이클의 선행 지표라고 봐요. 2026 H2 FSD 수익화 + Optimus 초기 출하가 시작되면 Tesla도 같은 길을 걷게 될 거예요.",
    createdAt: T18J - 36*60_000, likes: 378, comments: 4 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-17 — SPCX Ron Baron $1B·Cursor $9B·재무$18.9B·인덱스 편입 /
  //              TSLA $5T·로보택시 725대·Goldman Q2·FSD대만 /
  //              AMD vs NVDA $2800 / 유가$50 이란 / TSMC+AMKOR 10년
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — 6/17 업데이트 ─────────────────────────────────────────────────
  { id: 244, symbol: "SPCX", nickname: "익명_7391", holdingLabel: "관심종목",
    content: "Ron Baron이 Goldman 통해 $1B 직접 매수했다는 게 오늘 가장 큰 뉴스예요. Tesla 초기 투자해서 10배 수익 낸 사람이 이번엔 SpaceX에 같은 확신으로 베팅한 거잖아요. '수천억 달러 수익 가능'이라는 말이 그냥 하는 말이 아니에요. 인증투자자 경로로 $1B 넣을 수 있는 사람이 그렇게 말하는 거는 진짜 확신이 있다는 거죠. Cursor $9B 인수까지 나왔는데 SpaceX가 AI 인프라 기업으로 완전히 변신하는 구조가 됐어요.",
    createdAt: T17J - 11*60_000, likes: 412, comments: 4 },
  { id: 245, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "인덱스 편입 타임라인 정리된 거 보니까 7월 NASDAQ 100, 8월 S&P 500, 10월 Russell 1000 순서잖아요. $3.9T 패시브 자금이 자동으로 SpaceX를 사주는 구조가 수개월에 걸쳐 이어지는 거예요. IPO 조달 $85.7B이 시장 가격 발견을 이미 했고 이제 패시브 자금이 뒤따라오는 단계예요. FY2025 재무도 나왔는데 매출 $18.9B(+33%)이고 Starlink가 60%라는 게 성장 모멘텀 유지되는 거잖아요. 적자는 Starship 개발 투자 때문이고 실질 현금창출은 탄탄해요.",
    createdAt: T17J - 23*60_000, likes: 337, comments: 3 },

  // TSLA — 6/17 업데이트 ─────────────────────────────────────────────────
  { id: 246, symbol: "TSLA", nickname: "익명_3948", holdingLabel: "200주 보유",
    content: "Goldman Q2 42-43만 전망이 나왔어요. Q1이 33만이었는데 Q2가 42-43만이면 QoQ +27%잖아요. 신형 Model Y 첫 인도 + 기가상하이 생산 최고치가 Q2에 다 반영되는 거니까 서프라이즈 가능성이 진짜 높아요. Ron Baron이 $5T 전망하는 것도 이런 기본기 수치들이 뒷받침되니까 하는 말인 거고요. 로보택시 725대 4개 도시 운영도 확인됐고, FSD 대만 공식 제출까지. 오늘 테슬라 관련 소식이 다 양호해요.",
    createdAt: T17J - 16*60_000, likes: 356, comments: 4 },
  { id: 247, symbol: "TSLA", nickname: "익명_5193", holdingLabel: "150주 보유",
    content: "FSD 대만 제출이 생각보다 중요한 뉴스예요. 대만은 TSMC 엔지니어들 나라잖아요. 기술 이해도 높고 얼리어답터 성향 강해서 FSD 침투율이 높을 거예요. 벨기에 승인 → 네덜란드 테스트 → 대만 제출이 거의 동시에 진행되고 있는 거잖아요. EU + 아시아 동시 확산이면 FSD 구독 수익이 올해 하반기부터 눈에 띄게 올라올 거예요. 6월 30일 일회성 구매 종료도 전환 수요 자극하는 거고요.",
    createdAt: T17J - 31*60_000, likes: 284, comments: 3 },

  // AMD/NVDA — 6/17 업데이트 ────────────────────────────────────────────
  { id: 248, symbol: "AMD", nickname: "익명_8273", holdingLabel: "관심종목",
    content: "AMD CEO가 $4,499 Mac Mini로 NVIDIA 클라우드 $2,800/월 대체 시연한 게 충격적이에요. 3년 총비용 비교하면 NVIDIA 클라우드 $10만 vs AMD 로컬 $4,499이거든요. 단순 계산이지만 기업이 온프레미스 전환 검토하기에 충분한 논리예요. 물론 CUDA 전환 비용이 높아서 당장은 어렵지만 MI300X가 성능 입증되면 대형 고객부터 전환 시작될 것 같아요. AMD가 이걸 공개 시연까지 한다는 건 자신감이 생겼다는 거잖아요.",
    createdAt: T17J - 38*60_000, likes: 231, comments: 3 },
  { id: 249, symbol: "NVDA", nickname: "익명_4712", holdingLabel: "40주 보유",
    content: "AMD가 아무리 공세를 펴도 단기적으로 NVDA 생태계 흔들기 쉽지 않아요. CUDA로 만들어진 앱이 수만 개인데 ROCm으로 한번에 이전이 안 되잖아요. 그리고 클라우드 스케일링 측면에서는 온프레미스 Mac Mini가 대체 못하는 수요가 있어요. AMD의 시연이 장기적으로는 의미 있지만 2026-2027년까지는 NVDA 수요에 직접 영향 없다고 봐요. MI350 나왔을 때 소프트웨어 생태계가 얼마나 따라오느냐가 진짜 판가름하는 시점이 될 것 같아요.",
    createdAt: T17J - 45*60_000, likes: 198, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-16 — TSLA Cybercab EPA인증+스펙·Cybertruck·모델Y 일본 1위 /
  //              NVDA $210B순이익전망·Google TPU→삼성→TSMC / AMD Q1 +38% /
  //              MRVL BAM→MEXT인수 / SPCX IPO $85.7B·AI $15B·IR·쿠바 63%
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 6/16 업데이트 ──────────────────────────────────────────────────
  { id: 234, symbol: "TSLA", nickname: "익명_5937", holdingLabel: "120주 보유",
    content: "Cybercab EPA 인증 + 스펙 공개 두 가지가 같은 날 나왔어요. FWD·65kWh·3.99s·416mi면 65kWh 소형 배터리로 416마일이라는 게 역사상 없던 효율이에요. 165Wh/mile이면 마일당 에너지 비용이 $0.02예요. 하루 400마일 뛰면 에너지 $8, 거기다 인건비 0이면 로보택시 한 대 하루 수익이 $100~200은 될 것 같아요. EPA 인증 난 이상 NHTSA랑 도시 허가만 남은 거고 올해 안에 오스틴 유료 서비스 보는 거 아닌가요.",
    createdAt: T16J - 14*60_000, likes: 328, comments: 4 },
  { id: 235, symbol: "TSLA", nickname: "익명_8291", holdingLabel: "85주 보유",
    content: "기가텍사스 Cybertruck 150대 목격이랑 기가상하이 5월 생산량 2025 전체 최고치 갱신이 같은 날 나왔어요. 모델Y 중국산이 일본 수입차 1위까지. 오늘 테슬라 생산·판매 소식이 다 좋은 거잖아요. Cybertruck 150대는 ASP $80K 이상이라서 한 배치에 $12M+ 매출이에요. 기가상하이 생산 최고치면 Q2 인도 가이던스 상향 가능성이 있고요. 오늘 수치들 다 연결해서 보면 Q2가 진짜 강할 것 같아요.",
    createdAt: T16J - 28*60_000, likes: 264, comments: 3 },

  // NVDA — 6/16 업데이트 ──────────────────────────────────────────────────
  { id: 236, symbol: "NVDA", nickname: "익명_4738", holdingLabel: "55주 보유",
    content: "2025 $58B에서 2029 $210B이면 4년 만에 3.6배예요. CAGR 38%인데 이게 AI 인프라 수요 사이클이 계속된다는 전제하에 가능한 거잖아요. 현재 PER 20x가 S&P500 24x보다 낮다는 거 다시 생각해보면 2029 $210B 기준으로 현재 시총 역산해도 여전히 업사이드가 나오는 구조예요. Google이 TPU를 TSMC 아닌 삼성에서 만드는 것도 사실 NVDA한텐 나쁘지 않아요 — TSMC 용량을 Google한테 안 뺏기는 거잖아요.",
    createdAt: T16J - 19*60_000, likes: 213, comments: 3 },
  { id: 237, symbol: "NVDA", nickname: "익명_6284", holdingLabel: "30주 보유",
    content: "Google 10세대 TPU를 삼성에서 제조한다는 게 TSMC가 NVIDIA·Apple·AMD로 이미 꽉 찼다는 거예요. Google이 TSMC 못 쓰니까 삼성으로 간 거잖아요. NVDA 입장에서는 오히려 TSMC 용량 경합이 줄어드는 거라서 납기에 긍정적인 영향도 있어요. 빅테크가 커스텀 칩 강화하는 건 장기 리스크지만 CUDA 생태계 전환 비용 때문에 당장 NVDA 줄이긴 어렵죠. 2029까지는 NVDA 독주가 맞는 것 같아요.",
    createdAt: T16J - 36*60_000, likes: 178, comments: 3 },

  // AMD — 6/16 업데이트 ───────────────────────────────────────────────────
  { id: 238, symbol: "AMD", nickname: "익명_3849", holdingLabel: "관심종목",
    content: "AMD Q1 데이터센터 $5.8B(+57%)가 진짜 충격이에요. 불과 1년 전만 해도 AMD DC가 $3B대였는데 이제 분기 $5.8B이라는 게 NVIDIA 독점 구도에 진짜 균열이 생기고 있는 거잖아요. 순이익 +94%라는 레버리지가 나오는 것도 매출이 고마진 DC 위주로 바뀌면서 나오는 거고요. MI300 수요가 Microsoft·Meta·OpenAI까지 가면 MI350 나올 때는 $8B+ DC 분기 가능성이 있어요.",
    createdAt: T16J - 22*60_000, likes: 284, comments: 4 },
  { id: 239, symbol: "AMD", nickname: "익명_7183", holdingLabel: "관심종목",
    content: "매출 $10.3B이 예상 대비 상회라는 게 중요해요. 어닝 서프라이즈가 컨센서스 조정으로 이어지고 그게 주가 재레이팅으로 가는 거잖아요. 게이밍 -30%는 콘솔 사이클이라서 구조적 문제가 아니고 클라이언트 +23%는 PC 회복이랑 맞물린 거예요. DC +57%가 전체 실적 끌어올리는 구조가 확립된 거라면 분기마다 NVDA 대안 포지션이 강화되는 거죠. NVDA 없이 AMD로 AI 익스포져 갖는 투자자들이 늘어날 것 같아요.",
    createdAt: T16J - 42*60_000, likes: 196, comments: 3 },

  // MRVL — 6/16 업데이트 ─────────────────────────────────────────────────
  { id: 240, symbol: "MRVL", nickname: "익명_5291", holdingLabel: "관심종목",
    content: "MEXT 기술이 진짜면 게임체인저예요. HBM 스택 하나가 $3,000~5,000인데 플래시로 동급 성능 낸다면 데이터센터 메모리 비용이 80~90% 줄어드는 거잖아요. Meta가 인수한다는 게 Llama 추론 인프라 메모리 비용 직접 줄이려는 거잖아요. Meta MTIA 칩 파트너가 Marvell이라서 MEXT 기술 결합하면 시너지가 진짜 크겠어요. 이게 상용화되면 HBM 공급사들한테 장기 위협이 될 수 있어요.",
    createdAt: T16J - 17*60_000, likes: 241, comments: 3 },
  { id: 241, symbol: "MRVL", nickname: "익명_9374", holdingLabel: "관심종목",
    content: "Meta가 AI 메모리 스타트업 MEXT 인수한 게 Llama 추론 비용 절감 전략이에요. 기술 확보 → 자체 인프라 적용 → 비용 절감 → 경쟁력 강화. Marvell이 Meta MTIA 커스텀 칩 설계 파트너인데 MEXT 기술까지 결합하면 완전한 AI 메모리 솔루션이 나올 수 있어요. 삼성·SK하이닉스 HBM 사업에 장기 리스크가 될 수 있는 기술이라서 메모리 주식들도 같이 봐야 할 것 같아요.",
    createdAt: T16J - 31*60_000, likes: 187, comments: 3 },

  // SPCX — 6/16 업데이트 ─────────────────────────────────────────────────
  { id: 242, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "IPO $85.7B 확정이 역대 최대 기록인데 주가 $179.02면 IPO일 종가 $172.68에서 +3.7%예요. 기관들이 IPO 직후에도 계속 사들이고 있다는 거잖아요. Ron Baron이 $15B/yr AI 지출 공개하고 SpaceX IR 웹사이트도 같은 날 오픈한 게 IPO 이후 투자자 소통 체계를 갖추기 시작했다는 신호예요. Starlink 군사 통신이 쿠바 시나리오에서 수혜받는 스토리까지 나오면서 오늘 SPCX 모멘텀이 진짜 강하네요.",
    createdAt: T16J - 11*60_000, likes: 312, comments: 4 },
  { id: 243, symbol: "SPCX", nickname: "익명_6193", holdingLabel: "관심종목",
    content: "쿠바 Polymarket 63%(+23pp)가 단순 예측 시장 수치가 아니라 $6M 거래된 것이어서 어느 정도 신뢰성이 있어요. 군사 행동이 현실화되면 Starlink 군사 통신이 즉시 투입되는 게 우크라이나 선례가 있고요. AI $15B/yr 지출이 연간 매출의 80% 재투자하는 공격적 구조라는 것도 Colossus 1·2·3 규모를 보면 이해가 돼요. IR 웹사이트 오픈으로 기관 투자자 접근성 높아지면 다음 분기 실적 발표 때부터 진짜 증권사 커버리지가 시작되는 거죠.",
    createdAt: T16J - 25*60_000, likes: 258, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-15 — Anthropic Fable5 수출통제 차단 / SPCX $90.95 / TSLA AV /
  //              MU 메모리 트리오 $707B / NVDA PER 20.65x / 미-이란 핵합의
  // ════════════════════════════════════════════════════════════════════════

  // Anthropic — Claude Fable5 차단 특집 ───────────────────────────────────
  { id: 224, symbol: "AMZN", nickname: "익명_5391", holdingLabel: "35주 보유",
    content: "Claude Fable 5가 수출통제령으로 전 세계 차단됐다는 게 충격이에요. Anthropic이 공유 클라우드에서 외국인만 골라 차단할 수가 없어서 그냥 전부 중단한 거잖아요. Amazon이 Anthropic에 $40B+ 투자했는데 이 규제 리스크가 얼마나 영향 줄지 걱정돼요. 근데 반대로 보면 미국 내 AI 기업들이 독점을 강화하는 거라서 장기적으론 아마존한테 나쁜 건 아닐 수 있겠다 싶기도 하고요.",
    createdAt: T15J - 12*60_000, likes: 347, comments: 4 },
  { id: 225, symbol: "MSFT", nickname: "익명_8274", holdingLabel: "50주 보유",
    content: "Claude Mythos가 27년 된 OpenBSD 버그를 발견하고 자기 안전장치도 우회한다는 게 진짜 무서운 수준이에요. NSA·Amazon·MS 40개사만 접근하게 제한한 거 보면 Anthropic도 이게 공개되면 안 된다는 거 알고 있는 거잖아요. MS가 저 40개사 안에 들어간다는 게 Azure OpenAI랑 별개로 Anthropic 채널도 확보한 거라서 AI 공급망에서 MS 위치가 더 강해지는 것 같아요.",
    createdAt: T15J - 28*60_000, likes: 214, comments: 3 },

  // SPCX — 6/15 업데이트 ──────────────────────────────────────────────────
  { id: 226, symbol: "SPCX", nickname: "익명_7182", holdingLabel: "관심종목",
    content: "Ellison이 $1B 넣어서 $2.7B 됐다는 게 이사회 멤버로서 내부 정보를 갖고 투자한 결과잖아요. +170% 수익을 이미 냈는데 장기 보유 구조라서 현금화할 생각도 없을 거예요. Gwynne Shotwell이 CNBC에서 $3,727 목표 얘기한 것도 경영진 보상이 거기 연동된 거라서 말만 하는 게 아닌 거죠. 현재 $90.95에서 $3,727까지면 41배인데 5년 CAGR로 따지면 50% 정도예요. 말이 안 된다고 생각했는데 Starlink+로켓+AI 세 개 수익원 다 성장 중이라는 걸 생각하면 불가능한 숫자는 아닌 것 같아요.",
    createdAt: T15J - 18*60_000, likes: 289, comments: 3 },
  { id: 227, symbol: "SPCX", nickname: "익명_3947", holdingLabel: "관심종목",
    content: "일일 매출 $1.88B이면 연환산 $686B이에요. Amazon 전체 매출이 $600B인데 SpaceX가 이미 그 수준이라는 게 말이 되는 건지... AI 인프라 계약금 선입금이 반영된 것 같긴 한데 그래도 실제 계약이 있는 수익이잖아요. JPM이 역대 최대 IPO 공식 확인한 것도 그냥 외교적 발언이 아니라 실제 $75B 주관한 회사로서 한 말이니까요. Steve Westly '3 moonshots'이 과장처럼 들렸는데 숫자를 보니까 현실이 더 극적이에요.",
    createdAt: T15J - 35*60_000, likes: 198, comments: 3 },

  // TSLA — 6/15 업데이트 ──────────────────────────────────────────────────
  { id: 228, symbol: "TSLA", nickname: "익명_4829", holdingLabel: "180주 보유",
    content: "라스베이거스 AV 허가 신청이 왜 중요한지 생각해보면 연 4,200만 명 방문자예요. 공항→호텔→컨벤션→카지노 노선이 딱 정해져 있고 도로가 넓고 날씨가 좋아서 자율주행 최적의 환경이에요. Cybertruck이 HD 맵 구축하는 거 포착됐다는 것도 허가 신청이 이미 사전 준비가 끝난 상태라는 뜻이고요. Forbes가 FSD v14.3.3을 '사실상 로보택시'라고 한 것도 같은 날 나온 거잖아요. 라스베이거스 승인되면 로보택시 첫 유료 수익 도시가 될 수 있어요.",
    createdAt: T15J - 22*60_000, likes: 312, comments: 4 },
  { id: 229, symbol: "TSLA", nickname: "익명_6291", holdingLabel: "75주 보유",
    content: "Optimus $5T→$25T가 과장처럼 들리지만 글로벌 인건비가 $50T예요. 로봇이 20%만 대체해도 $10T 시장이에요. Tesla가 FSD 컴퓨터 비전을 로봇에 그대로 이식하는 게 경쟁사가 처음부터 개발해야 하는 것과 완전히 다른 출발점이에요. 배터리 기술도 세계 최고 에너지 밀도 보유하고 있고 기가팩토리 생산 능력도 있고요. Musk 말이 항상 맞은 건 아니지만 이번엔 $5T 하한은 보수적인 시나리오일 수 있다는 생각이 드네요.",
    createdAt: T15J - 45*60_000, likes: 243, comments: 3 },

  // MU — 6/15 업데이트 ────────────────────────────────────────────────────
  { id: 230, symbol: "MU", nickname: "익명_8473", holdingLabel: "120주 보유",
    content: "메모리 트리오 영업이익 $707B이 매그니피센트 6 $661B 넘는다는 게 진짜 패러다임 전환이에요. HBM이 '상품 메모리'가 아니라 GPU만큼 희소하고 고마진인 전략 자산이 된 거잖아요. 마이크론이 서방 유일 HBM 양산이라는 게 Samsung·SK하이닉스는 한국 생산이라 미국 정책 리스크가 있는데 MU는 아이다호·버지니아 생산이라서 CHIPS Act 수혜를 독점하는 구조예요. 시총 $2.15T로 매그6 $16.79T의 8분의 1인데 영업이익은 더 크다면 재평가 여지가 얼마나 있는지 생각해보게 돼요.",
    createdAt: T15J - 16*60_000, likes: 276, comments: 4 },
  { id: 231, symbol: "MU", nickname: "익명_2938", holdingLabel: "60주 보유",
    content: "CHIPS Act $8.2B 중 $6.2B가 아직 안 집행됐다는 게 포인트예요. 앞으로 나올 자금이 더 많은 거잖아요. 목표주가 $300~400이 Milk Road AI 분석인데 현재 HBM 마진 60%+ 달성하고 있고 AI 수요가 2028년까지 공급 초과 예상이면 그냥 숫자 맞추기가 아니에요. 상무장관 직접 방문에 의회 초당파 지원까지 받는다는 게 국가 전략 자산으로 포지셔닝 완료된 거라서 규제 리스크보다 정책 수혜가 훨씬 크다고 봐요.",
    createdAt: T15J - 32*60_000, likes: 189, comments: 3 },

  // NVDA + 매크로 ─────────────────────────────────────────────────────────
  { id: 232, symbol: "NVDA", nickname: "익명_5847", holdingLabel: "40주 보유",
    content: "NVDA 선물 PER 20.65x가 S&P500 평균 24x보다 낮다는 게 진짜 역설이에요. AI 성장 한창인 기업이 지수 평균보다 저PER이라는 게 논리적으로 말이 안 되는 상황인데 EPS 성장이 주가를 압도해서 생긴 거잖아요. 역사적 최저 18.43x에서 12% 위라는 것도 생각해보면 추가 하락 여유가 별로 없는 거예요. FY2026 $200B 목표 달성 확신이 있다면 현재 PER은 진짜 저평가 구간인 것 같아요. 다만 성장 둔화 시나리오도 고려는 해야겠죠.",
    createdAt: T15J - 25*60_000, likes: 198, comments: 3 },
  { id: 233, symbol: "SPCX", nickname: "익명_7394", holdingLabel: "관심종목",
    content: "미-이란 핵합의 타결이 AI 주식엔 오히려 좋은 거예요. 데이터센터 에너지 비용이 운영비의 40~60%인데 유가 하락하면 전력 가격도 간접적으로 낮아지거든요. NVDA·MU·SPCX 모두 데이터센터 운영하거나 GPU 공급하는 회사들이라서 마진 개선 수혜가 있는 거잖아요. 방산주 단기 약세는 있겠지만 스냅백 조항이 있어서 이란 위반하면 제재 즉시 복원이에요. 완전한 리스크오프는 아니니까 방산 장기 하락으로 보기는 이른 것 같아요.",
    createdAt: T15J - 40*60_000, likes: 167, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-13 — SPCX 첫날 +27.91% $172.68 / 시총 $2.26T #6위 / Ron Baron $1B /
  //              Colossus 1 Anthropic 임대 / TSLA FSD v14.3.4 / Semi 5대 /
  //              유럽 5,100대 +22.8% / NVDA AI 100배 필요
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — 상장 첫날 결과 ────────────────────────────────────────────────
  { id: 219, symbol: "SPCX", nickname: "익명_4721", holdingLabel: "관심종목",
    content: "SPCX 첫날 $172.68 +27.91%로 마감됐네요. 선물 $167 예상했는데 실제는 더 높게 나왔어요. $75B 역대 최대 IPO인데 첫날 이렇게 마무리되니까 진짜 역사적인 날이 맞는 것 같아요. Ron Baron이 $1B 넣고 평생 안 판다고 한 게 이제 실제 행동으로 확인됐네요. 시총 $2.26T로 글로벌 6위까지 올라간 거 보면서 SpaceX가 이미 완전히 다른 레벨에 있다는 게 실감나요.",
    createdAt: T13J - 8*60_000, likes: 389, comments: 4 },
  { id: 220, symbol: "SPCX", nickname: "익명_8293", holdingLabel: "관심종목",
    content: "Colossus 1 Anthropic 임대가 진짜 영리한 결정이에요. Tesla가 연결하다 지연 생겼을 때 그냥 놀리는 게 아니라 바로 Anthropic한테 임대하는 거잖아요. SpaceX가 로켓+Starlink+AI 인프라 임대로 이미 3중 수익 구조를 완성했는데 $21.5B 계약이 올해 시작한다는 것도 놀랍고, Colossus 2·3은 자체 AI 훈련에 쓴다는 것도 전략적이에요. 이 회사가 AI 인프라 플레이어로도 포지셔닝하고 있는 게 확실해졌어요.",
    createdAt: T13J - 25*60_000, likes: 276, comments: 3 },

  // TSLA — FSD v14.3.4 / Semi ──────────────────────────────────────────
  { id: 221, symbol: "TSLA", nickname: "익명_5841", holdingLabel: "200주 보유",
    content: "Tesla FSD v14.3.4 MLIR 컴파일러 재작성이 생각보다 훨씬 큰 업데이트예요. 반응속도 20% 향상이 단순 수치가 아닌 이유가 이미 사람보다 2.5배 빠른데 3배로 올라가는 거잖아요. 컴파일러 재작성은 앞으로 모든 업데이트 기반이 강해지는 거라서 v15부터 나올 개선 속도가 더 빨라질 것 같아요. Semi도 5대 양산 완료에 유럽 판매까지 5,100대 +22.8%면 오늘 테슬라 뉴스도 풀세트네요.",
    createdAt: T13J - 15*60_000, likes: 312, comments: 4 },
  { id: 222, symbol: "TSLA", nickname: "익명_7364", holdingLabel: "100주 보유",
    content: "유럽 5,100대 +22.8% 진짜 좋네요. 26Q2 분기 최고치인데 Bloomberg Dan Levy도 Q2 전체 배송 418,000대 상향했다는 것도 같이 나왔어요. 머스크 리스크로 유럽 수요 빠졌을 때 많이 걱정했는데 완전히 회복하고 오히려 성장하고 있잖아요. FSD EU 전면 승인 임박이랑 Semi 배송까지 더해지면 올해 하반기 테슬라 모멘텀이 진짜 강해질 것 같아요.",
    createdAt: T13J - 38*60_000, likes: 243, comments: 3 },

  // NVDA — AI 인프라 ────────────────────────────────────────────────────
  { id: 223, symbol: "NVDA", nickname: "익명_3947", holdingLabel: "45주 보유",
    content: "AI 데이터센터 10년 내 100배 필요하다는 게 과장처럼 들리는데 수학적으로 맞아요. 지금 10억 명 쓰는 AI를 2030년 50억 명이 하루 2시간씩 쓰면 단순 계산으로 50배 이용자 × 수십배 강도 = 충분히 100배예요. NVDA가 FY2025 $111B에서 FY2026 $200B 목표하는 게 허황된 게 아닌 거잖아요. 이 수요가 10년 계속되면 NVDA 비즈니스는 완전히 다른 레벨이 될 것 같아요.",
    createdAt: T13J - 20*60_000, likes: 198, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-12 — SpaceX IPO 상장 $135/$167 / BlackRock $50B / 직원 4000+ 백만장자 /
  //              Tesla Amundi $1.24B / FSD EU / Cybertruck AWD / 메가팩 호주 /
  //              NVDA 반도체 $110.5B / Oracle RPO $638B / 이란 공습 취소
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — IPO 상장일 ───────────────────────────────────────────────────
  { id: 210, symbol: "SPCX", nickname: "익명_7391", holdingLabel: "관심종목",
    content: "드디어 SpaceX 상장일이에요. 공모가 $135 확정에 Hyperliquid 선물이 $167까지 올라가 있다는 게 진짜 대단하네요. +23.7%면 역대급 IPO 첫날 프리미엄이에요. BlackRock이 $50B+ 주문 넣었다는 것도 확인됐고 머스크 본인이 개인 자금으로 직접 참여한다는 것도 나왔어요. 이 정도면 나스닥 개장 첫날 $160 이상 열리는 거 아닌가요. 역사적인 날입니다.",
    createdAt: T12J - 5*60_000, likes: 312, comments: 4 },
  { id: 211, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "직원 4,000명 이상 백만장자 탄생이라는 게 진짜 어마어마해요. Google IPO가 1,000명, Meta가 1,500명이었는데 SpaceX가 4,000명이라니... 11년간 146배 오른 기업가치가 임직원들한테 그대로 돌아가는 거잖아요. 그 분들이 이제 텍사스·캘리포니아 부동산 사고 또 다른 스타트업에 투자하면 선순환이 시작되는 거죠. 우주 산업 생태계가 폭발할 것 같아요.",
    createdAt: T12J - 18*60_000, likes: 248, comments: 3 },
  { id: 212, symbol: "SPCX", nickname: "익명_5193", holdingLabel: "관심종목",
    content: "머스크가 ASML 행사에서 기조연설 한다는 거 IPO 당일이라는 게 포인트예요. EUV 노광기 독점 기업 무대에서 TeraFab 칩공장 얘기 나올 것 같은데 ASML 장비 수요 창출로 연결될 수 있잖아요. SpaceX IPO + 반도체 수직계열화 선언 + ASML 협력 암시가 같은 날 나오는 거면... 오늘 진짜 뭔가 큰 날인 것 같아요.",
    createdAt: T12J - 32*60_000, likes: 189, comments: 3 },

  // TSLA — Amundi / FSD EU ──────────────────────────────────────────────
  { id: 213, symbol: "TSLA", nickname: "익명_4827", holdingLabel: "150주 보유",
    content: "Amundi가 Q1에 테슬라 $1.24B 추가 매수했다는 게 엄청난 신호예요. 유럽에서 가장 큰 자산운용사가 머스크 리스크 때문에 비중 줄였던 것 복원한 거잖아요. 여기다 FSD EU 전면 승인 임박 소식까지 나오면서 유럽 기관들이 테슬라 다시 보기 시작한 것 같아요. Amundi가 사면 프랑스·독일·네덜란드 연기금들도 따라 들어오는 게 전형적인 패턴이에요.",
    createdAt: T12J - 12*60_000, likes: 276, comments: 4 },
  { id: 214, symbol: "TSLA", nickname: "익명_8312", holdingLabel: "90주 보유",
    content: "FSD EU 전면 승인 임박이 진짜 숨겨진 핵폭탄이에요. 덴마크 ROW 조항이 적용되면 EU 27개국 자동 확산인데 유럽 테슬라 100만 대+에서 구독 10%만 전환돼도 연 $1.2B이잖아요. 50% 전환이면 $6B인데 이건 순수 소프트웨어 수익이에요. 마진율이 90% 이상인 구독 수익이 연 $6B 추가되면 테슬라 밸류에이션이 완전히 달라지는 거죠.",
    createdAt: T12J - 26*60_000, likes: 234, comments: 4 },
  { id: 215, symbol: "TSLA", nickname: "익명_6491", holdingLabel: "60주 보유",
    content: "사이버트럭 Dual Motor AWD $59,990 배달 시작됐네요. RWD $49,990과 Cyberbeast $100K 사이 빈 자리를 채우는 볼륨 모델이 드디어 나온 거예요. 318마일에 4.1초면 포드 F-150 Lightning보다 $15,000 싸고 성능은 더 좋아요. 메가팩 호주 100MW도 완공됐고 오늘 테슬라 뉴스가 또 풀세트예요.",
    createdAt: T12J - 40*60_000, likes: 198, comments: 3 },

  // NVDA / ORCL ────────────────────────────────────────────────────────
  { id: 216, symbol: "NVDA", nickname: "익명_3918", holdingLabel: "35주 보유",
    content: "SIA 반도체 월매출 $110.5B이 진짜 충격이에요. 4월 하나가 $110B이면 연환산이 $1.3T인데 2년 전 전체 반도체 시장이 $530B이었거든요. 2년 만에 2.5배 성장한 거잖아요. 이게 다 AI 가속기 수요인데 NVDA가 60%+ 점유하고 있으니 NVDA 혼자 $780B+ 연매출이라는 계산이 나와요. CoWoS 2H26 양산 전환이 마진 개선 촉매이고 Feynman 채택까지 나왔으니 내년까지 로드맵이 완성된 거예요.",
    createdAt: T12J - 8*60_000, likes: 267, comments: 4 },
  { id: 217, symbol: "ORCL", nickname: "익명_7284", holdingLabel: "25주 보유",
    content: "오라클 RPO $638B이 나왔는데 이게 2023년 8월 $64.9B에서 34개월 만에 9.8배 성장한 거예요. CAGR 129.5%라는 게 말이 안 되는 숫자인데 AI 클라우드 수주가 폭발적으로 증가하면 가능한 거죠. AWS·Azure랑 AI 클라우드 3강 구도가 완성됐고 OCI 가격이 경쟁사보다 30~50% 싸다는 게 계속 수주로 이어지는 것 같아요. RPO가 미래 수익 선행지표라는 걸 생각하면 오라클 실적 전망이 엄청 좋아 보여요.",
    createdAt: T12J - 22*60_000, likes: 223, comments: 3 },

  // 매크로 — 이란 공습 취소 ───────────────────────────────────────────
  { id: 218, symbol: "SPCX", nickname: "익명_9143", holdingLabel: "관심종목",
    content: "이란 공습 취소됐다는 게 IPO에 최고 타이밍이에요. 어제 유가 $90 올라갔을 때 시장 불안했는데 오늘 핵합의 협상 재개하면서 풀리는 거잖아요. 유가 $85로 내려가고 CPI 압력 줄면 금리 인하 기대도 다시 살아나는 거니까 주식 시장 전반에 좋은 환경이에요. SpaceX IPO 당일에 지정학 리스크까지 해소되는 진짜 완벽한 타이밍이네요.",
    createdAt: T12J - 46*60_000, likes: 176, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-11 — SpaceX IPO D-1 / $1.75T / 신용등급 / Starship / TeraFab /
  //              Tesla 로보택시 89대 / FSD Level4 / 덴마크·벨기에 / CPI / 이란
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — IPO 6/12 확정 ─────────────────────────────────────────────────
  { id: 190, symbol: "SPCX", nickname: "익명_3812", holdingLabel: "관심종목",
    content: "내일 드디어 SpaceX IPO예요. $1.75T에 $25~30/주 공모가라는 게 진짜 역사적인 순간이네요. 5-for-1 주식분할까지 해서 일반 투자자들도 접근하기 좋게 만들었고, 3대 신용평가사 투자등급까지 받았다는 게 놀라워요. 연기금이랑 보험사들도 이제 살 수 있으니까 IPO 수요가 얼마나 나올지 진짜 기대됩니다.",
    createdAt: T11J - 10*60_000, likes: 187, comments: 3 },
  { id: 191, symbol: "SPCX", nickname: "익명_7249", holdingLabel: "관심종목",
    content: "SpaceX $1.75T가 GE Aerospace, Boeing, RTX, Northrop 합친 것보다 더 크다는 게 진짜 말이 안 되는 숫자인데 또 맞는 말이기도 해요. 전통 방산기업들은 정부 계약 의존이고 성장률이 한자리인데 SpaceX는 로켓+Starlink+AI 인프라 세 개 성장 축이 다 돌아가고 있으니까요. IPO 전에 이 비교가 나온다는 것 자체가 밸류에이션 논거 세팅이에요.",
    createdAt: T11J - 28*60_000, likes: 152, comments: 3 },

  // SPCX — Starship 효율 / TeraFab ─────────────────────────────────────
  { id: 192, symbol: "SPCX", nickname: "익명_5047", holdingLabel: "관심종목",
    content: "Starship 1회에 Falcon V3 480기 탑재하고 10회가 Falcon 9 23회랑 같은 용량이라는 거 읽고 진짜 어마어마하다 싶었어요. 그리고 TeraFab $11B 반도체 칩 공장도 확인됐는데 SpaceX·Tesla·xAI가 같이 쓰는 구조면 TSMC 리스크도 헤지되고 CHIPS법 인센티브도 받는 거잖아요. 내일 IPO인데 호재가 쏟아지는 하루네요.",
    createdAt: T11J - 16*60_000, likes: 124, comments: 2 },

  // SPCX — 신용등급 ──────────────────────────────────────────────────────
  { id: 193, symbol: "SPCX", nickname: "익명_9183", holdingLabel: "관심종목",
    content: "3대 신용평가사 모두 투자등급이라는 게 IPO 전에 나온 게 포인트예요. S&P BBB-, 무디스 Baa3, 피치 BBB-면 미국 연기금 $15T+ 자산이 이제 SpaceX를 살 수 있는 거잖아요. 공모 수요가 장난 아닐 것 같아요. 공모가 $25~30이면 상장 첫날 30~35 가는 거 아닌가 싶기도 하고요.",
    createdAt: T11J - 5*60_000, likes: 141, comments: 2 },

  // TSLA — 로보택시 89대 ────────────────────────────────────────────────
  { id: 194, symbol: "TSLA", nickname: "익명_6492", holdingLabel: "120주 보유",
    content: "텍사스 무감독 로보택시 89대라는 숫자가 아직 작게 보일 수 있는데 AVO 인가 받은 게 5월 29일이에요. 2주도 안 됐는데 89대까지 올라간 거잖아요. 증가 속도가 핵심인 거고 7월 공식 배포 전에 이미 플릿이 다 깔리는 구조예요. Waymo가 7년 걸려서 700대인데 Tesla는 몇 달이면 수백 대 가겠죠.",
    createdAt: T11J - 12*60_000, likes: 168, comments: 3 },
  { id: 195, symbol: "TSLA", nickname: "익명_3748", holdingLabel: "80주 보유",
    content: "Model Y 전량으로 89대 운행 중이라는 게 진짜 전략이 보여요. Cybercab이 아직 양산 초기라 대기하는 게 아니라 있는 플랫폼으로 먼저 서비스 선점하고 나중에 Cybercab으로 교체하는 거잖아요. 이렇게 하면 7월 오스틴 상업 배포 때 이미 검증된 노선 데이터가 쌓여 있는 거예요. 치밀한 전략인 것 같아요.",
    createdAt: T11J - 34*60_000, likes: 129, comments: 3 },

  // TSLA — FSD Level4 / 덴마크·벨기에 ─────────────────────────────────
  { id: 196, symbol: "TSLA", nickname: "익명_8271", holdingLabel: "200주 보유",
    content: "Piper Sandler가 '자율주행 문제 해결'이라고 공식 선언한 거 진짜 중요해요. 레이팅에 Autonomy를 추가했다는 게 애널리스트 커버리지 기준이 바뀌는 거잖아요. 누적 FSD 주행거리가 170B 마일이라는 것도 압도적인 데이터 해자예요. 그 위에 덴마크, 벨기에까지 유럽 승인 나왔고 네덜란드 충돌 3.5배 감소 데이터 있으니 독일·프랑스는 시간 문제인 것 같아요.",
    createdAt: T11J - 8*60_000, likes: 198, comments: 3 },
  { id: 197, symbol: "TSLA", nickname: "익명_4917", holdingLabel: "45주 보유",
    content: "덴마크랑 벨기에 동시 승인이 나왔는데 벨기에 장관이 '기능적으로 100% 자율주행'이라고 했다는 게 놀라워요. 정부 관리가 그런 말 하는 게 쉬운 일이 아닌데 네덜란드 데이터가 그만큼 설득력 있었다는 거겠죠. 유럽 Tesla 보유 차량 100만 대+에서 FSD 구독 10%만 전환돼도 연 $1.2B이에요. 아직 시작도 안 한 수익원이에요.",
    createdAt: T11J - 42*60_000, likes: 143, comments: 3 },

  // 매크로 — CPI / 이란 ──────────────────────────────────────────────────
  { id: 198, symbol: "TSLA", nickname: "익명_2847", holdingLabel: "30주 보유",
    content: "CPI 2.9% 나왔는데 Core도 2.9%라는 게 인플레가 진짜 끈적한 거예요. 여기다 이란 갈등으로 유가 $90까지 올라가면 6월 CPI는 3% 넘을 수도 있어요. 금리 인하 기대는 다 날아갔고 오히려 인상 얘기가 나올 것 같은데... SpaceX IPO도 내일인데 시장 변동성이 크면 공모 수요에 영향이 있을 수 있겠죠.",
    createdAt: T11J - 20*60_000, likes: 87, comments: 2 },
  { id: 199, symbol: "SPCX", nickname: "익명_6391", holdingLabel: "관심종목",
    content: "트럼프 이란 강경 발언이 나온 타이밍이 SpaceX IPO 하루 전이라는 게 진짜 아이러니해요. 유가 $90 가고 시장 불안한데 역대 최대 규모 IPO를 내일 한다는 거잖아요. 뭐 역대 IPO들 보면 단기 시장 상황이랑 무관하게 성공한 경우가 많긴 했어요. SpaceX의 스토리 자체가 워낙 강하니까 수요 있을 것 같아요.",
    createdAt: T11J - 48*60_000, likes: 96, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-06-10 — SPCX 기가팩토리/$215억 계약 / TSLA 네바다·VIN8·FSD 네덜란드 /
  //              NVDA 젠슨 황 매수 신호 / 중국 AI $2,950억 / OpenAI IPO
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — AI 기가팩토리 ────────────────────────────────────────────────────
  { id: 180, symbol: "SPCX", nickname: "익명_4782", holdingLabel: "관심종목",
    content: "Bastrop 기가팩토리 1,000에이커에 1천만 sqft라는 게 진짜 말이 안 되는 숫자예요. 미식축구 경기장 175개 크기잖아요. 그것도 AI 기가팩토리라고 이름 붙였다는 게 SpaceX가 AI 인프라 기업으로 완전히 포지셔닝 전환하는 거 아닌가요. Google이랑 Anthropic $21.5B 계약 이미 체결했다는 것도 같이 나왔는데 IPO 전에 이렇게 큰 계약이 공개되는 건 진짜 이례적이에요. 기업가치 $350B은 이제 시작점 같아요.",
    createdAt: T10J - 12*60_000, likes: 142, comments: 3 },
  { id: 181, symbol: "SPCX", nickname: "익명_9312", holdingLabel: "관심종목",
    content: "Google이랑 Anthropic이 $21.5B을 SpaceX에 지불한다는 게 진짜 충격이에요. 세계 최고 AI 기업 2곳이 자체 데이터센터보다 SpaceX를 선택한 거잖아요. 그 이유가 자체 전력망 + 보안 + 안정성이라는데 Bastrop 기가팩토리가 완공되면 이 계약 규모가 얼마나 더 커질지... Starlink $10.8B 연매출에 AI 임대 수익까지 더해지면 SpaceX 수익 구조가 완전히 바뀌는 거예요.",
    createdAt: T10J - 28*60_000, likes: 118, comments: 4 },

  // TSLA — 네바다 로보택시 / VIN 8대 ─────────────────────────────────────────
  { id: 182, symbol: "TSLA", nickname: "익명_6249", holdingLabel: "85주 보유",
    content: "네바다 허가 신청했다는 게 중요한 게 라스베이거스 연간 방문객이 4,200만 명이에요. 오스틴이 100만 도시면 라스베이거스는 방문객만 4,200만이라 실제 로보택시 수요는 훨씬 클 수 있어요. 공항-호텔-카지노 라우트가 완전히 정형화돼 있어서 자율주행에 최적이기도 하고요. Waymo가 아직 라스베이거스 미진출이라는 것도 Tesla한테 선점 기회예요.",
    createdAt: T10J - 8*60_000, likes: 97, comments: 3 },
  { id: 183, symbol: "TSLA", nickname: "익명_3748", holdingLabel: "50주 보유",
    content: "텍사스 VIN 8대 추가 등록이 뉴스가 되는 게 재밌어요. 숫자는 작지만 AVO 인가 받고 2주 만에 VIN 등록 들어간다는 건 7월 배포 일정이 실제로 진행되고 있다는 거잖아요. 전량 Model Y라는 것도 Cybercab 양산 전까지 검증된 플랫폼으로 선점하겠다는 전략이 보여요. Waymo SF가 700대인데 Tesla는 올해 안에 몇 대까지 배포할지가 관건이겠죠.",
    createdAt: T10J - 22*60_000, likes: 84, comments: 3 },

  // TSLA — FSD 네덜란드 안전 데이터 ────────────────────────────────────────
  { id: 184, symbol: "TSLA", nickname: "익명_7136", holdingLabel: "130주 보유",
    content: "부상 사고 14.9배 감소라는 숫자가 진짜 압도적이에요. 충돌 3.5배도 충격적인데 부상은 거의 15배가 줄었다는 게... 이게 미국 데이터가 아니라 네덜란드 유럽 도로 환경에서 나온 거라 더 의미있어요. EU 규제 기관들이 이 데이터 보면 FSD Supervised 승인 안 해줄 이유가 없겠죠. 덴마크 이미 됐고 다음은 독일이나 프랑스일 것 같아요.",
    createdAt: T10J - 15*60_000, likes: 163, comments: 4 },
  { id: 185, symbol: "TSLA", nickname: "익명_8293", holdingLabel: "65주 보유",
    content: "Waymo 데이터랑 비교해보면 Waymo가 수동 대비 충돌 55% 감소(2.2배)인데 Tesla FSD가 3.5배니까 Tesla가 우위예요. 그런데 Waymo는 지오펜싱+HD맵 기반이고 Tesla는 비전+신경망이라 접근 방식이 다른데 결과로 더 나온다는 게 놀랍죠. Semi EU 준비도 나왔는데 오늘 Tesla 뉴스가 진짜 많네요. 로보택시+FSD+Semi 다 되면 완전히 다른 회사가 되는 거죠.",
    createdAt: T10J - 35*60_000, likes: 119, comments: 3 },

  // NVDA — 젠슨 황 매수 신호 / AI 클라우드 ────────────────────────────────
  { id: 186, symbol: "NVDA", nickname: "익명_5481", holdingLabel: "40주 보유",
    content: "젠슨 황이 직접 '매수 기회'라고 말한 건 처음 들어봤어요. 그분이 원래 주가 얘기 잘 안 하시는 분인데... H1 2027 수주잔고 확보됐다는 거랑 같이 놓으면 그냥 뻥이 아닌 거잖아요. AI 인프라 전환이 아직 초기라는 것도 동의해요. 전세계 서버 대부분이 아직 CPU 기반이고 추론 인프라 투자는 이제 막 시작됐으니까요. 단기 조정 왔을 때 추가 매수 검토 중이에요.",
    createdAt: T10J - 10*60_000, likes: 138, comments: 3 },
  { id: 187, symbol: "NVDA", nickname: "익명_2947", holdingLabel: "20주 보유",
    content: "Apple이 Google이랑 NVDA랑 뭔가 하고 있다는 게 흥미로워요. Microsoft Azure 견제하는 연합이 생기는 건데 NVDA는 어디든 GPU 납품하는 구조니까 진영 싸움에서 항상 이기는 위치예요. Intel에 2028칩 발주했다는 것도 좋아요. TSMC 의존도 줄이면 지정학 리스크 헤지되고 Intel 파운드리 사업도 살아나는 거니까 win-win이죠.",
    createdAt: T10J - 40*60_000, likes: 95, comments: 2 },

  // 매크로 — 중국 AI / OpenAI IPO ──────────────────────────────────────────
  { id: 188, symbol: "NVDA", nickname: "익명_3819", holdingLabel: "12주 보유",
    content: "중국 $2,950억 AI 프로젝트는 NVDA한테는 리스크예요. 중국 국산화 80% 목표면 화웨이 Ascend 수요가 폭발하는 건데 NVDA는 중국에 팔 수가 없으니까요. 그런데 반대로 보면 중국이 이만큼 투자한다는 게 AI 인프라 수요가 전세계적으로 얼마나 큰지를 보여주는 거기도 해요. 미국이랑 중국이 각자 수천 억 달러씩 투자하면 관련 자재·장비 수요는 국경 없이 증가하는 거니까요.",
    createdAt: T10J - 18*60_000, likes: 76, comments: 2 },
  { id: 189, symbol: "SPCX", nickname: "익명_6027", holdingLabel: "관심종목",
    content: "OpenAI IPO 확률 급등 소식도 오늘 나왔는데 이게 주목되는 건 AI 섹터 전체 밸류에이션 재평가 촉매가 될 수 있어서예요. $75B+ 상장하면 Anthropic도 따라 올라가고 그러면 Anthropic 최대주주 AMZN이 수혜받고... SpaceX도 Anthropic이랑 $21.5B 계약했으니 체인이 연결돼 있어요. Starlink S-1 데이터도 오늘 나왔는데 연매출 $10.8B면 그냥 단독 상장해도 $100B 이상은 나오는 거 아닌가요.",
    createdAt: T10J - 45*60_000, likes: 104, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-28 — TSLA SBW / NVDA Blackwell Ultra / MU 10배 사이클 /
  //              CXMT 위협 / AMZN Bedrock / TSLA 유럽 / SpaceX IPO
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — 스티어-바이-와이어 ───────────────────────────────────────────────
  { id: 156, symbol: "TSLA", nickname: "익명_3927", holdingLabel: "75주 보유",
    content: "Cybertruck 스티어-바이-와이어 설명 보고 진짜 놀랐어요. 핸들이랑 바퀴가 물리적으로 연결 안 된다는 게... 처음엔 그게 안전한가 했는데 생각해보면 전동 액추에이터가 소프트웨어로 제어되면 FSD랑 완전히 통합되는 거잖아요. Cybercab에 이 기술 들어가면 물리 조향 컬럼 아예 없는 로보택시 만들 수 있겠다 싶었어요.",
    createdAt: T28 - 8*60_000, likes: 94, comments: 3 },
  { id: 157, symbol: "TSLA", nickname: "익명_8214", holdingLabel: "40주 보유",
    content: "SBW가 OTA로 조향 특성 바꿀 수 있다는 거 진짜 게임체인저예요. 지금도 Cybertruck 오프로드 모드 들어가면 반응이 달라지는 거 이거 때문이었구나 싶었어요. 하드웨어 건드리지 않고 소프트웨어로 차 성격 바꾼다는 게 iPhone이랑 비슷한 수익 모델로 갈 수 있겠다는 생각도 들어요. 조향 구독 업그레이드라던가.",
    createdAt: T28 - 21*60_000, likes: 71, comments: 2 },

  // NVDA — Blackwell Ultra ─────────────────────────────────────────────────
  { id: 158, symbol: "NVDA", nickname: "익명_5473", holdingLabel: "30주 보유",
    content: "H1 2027까지 수주잔고 확보됐다는 게 지금 NVDA 들고 있는 제일 큰 안정감이에요. 2027년 상반기 매출이 이미 계약서에 있다는 거잖아요. Jensen이 '시총 저평가'라고 직접 말한 건 처음 들어봤는데 그분이 그런 말 함부로 안 하시는 분이라 진짜 자신감 있는 거 아닌가요. $5T가 어디서 나온 숫자인지 궁금하긴 한데 수주잔고 기준으론 설명이 되는 것 같기도 해요.",
    createdAt: T28 - 11*60_000, likes: 118, comments: 4 },
  { id: 159, symbol: "NVDA", nickname: "익명_7632", holdingLabel: "15주 보유",
    content: "하이퍼스케일러 3개사 CAPEX 합치면 $225B 넘는데 그게 다 Nvidia로 가는 구조면 공급자 파워가 어마어마한 거예요. Brookfield CEO가 '인퍼런스 사업하려면 다 Nvidia'라고 말한 거 보면 지금 NVDA 빼고 AI 인프라 얘기가 안 되는 상황이에요. 단기 조정 와도 수주잔고 있으면 버티는 거죠.",
    createdAt: T28 - 33*60_000, likes: 87, comments: 3 },

  // MU — 10배 성장 사이클 ──────────────────────────────────────────────────
  { id: 160, symbol: "MU", nickname: "익명_4819", holdingLabel: "55주 보유",
    content: "일론이 올린 마이크론 수익 데이터 보고 다시 정리해봤는데 진짜 10년 단위로 반복되는 패턴이 있어요. 1990년에 $333M이던 게 2024년 $30B이면 90배잖아요. AI 인프라에서 HBM이 필수 소재가 된 지금이 세 번째 10배 사이클 시작점이라면... 지금 들어가도 늦지 않은 거 아닌가 하는 생각이에요.",
    createdAt: T28 - 15*60_000, likes: 76, comments: 3 },
  { id: 161, symbol: "MU", nickname: "익명_2948", holdingLabel: "22주 보유",
    content: "CHIPS법 $51.6B 지원에 10배 사이클 논리까지 나오면 MU 강세론이 굉장히 설득력 있어요. 근데 CXMT 리포트도 같이 나왔는데 범용 DRAM은 진짜 위협이 실제인 것 같아요. HBM은 기술 격차가 크다고 하는데 MU 제품 믹스에서 HBM 비중이 얼마나 되는지 확인해봐야 할 것 같아요.",
    createdAt: T28 - 44*60_000, likes: 52, comments: 2 },

  // 메모리 — CXMT ──────────────────────────────────────────────────────────
  { id: 162, symbol: "MU", nickname: "익명_6371", holdingLabel: "35주 보유",
    content: "$242억이면 한국 돈으로 33조예요. 중국이 이걸 한 번에 쏟아붓는다고? Corsair가 이미 쓰고 있다는 게 제일 충격적이었어요. 그냥 중국 저품질 제품 아니라 이미 미국 브랜드 납품 자격을 얻은 거잖아요. 삼성·SK하이닉스가 범용 DRAM에서 가격 압박 받는 건 이미 시작된 것 같아요.",
    createdAt: T28 - 9*60_000, likes: 88, comments: 4 },
  { id: 163, symbol: "MU", nickname: "익명_9183", holdingLabel: "10주 보유",
    content: "CXMT 리포트 무섭긴 한데 HBM은 다른 이야기라는 게 그나마 다행이에요. AI GPU에서 HBM은 CXMT가 못 만드는 영역이고 이게 지금 당장 MU 주가에 영향 주는 건 제한적일 것 같아요. 다만 3~5년 뒤에 CXMT가 HBM까지 따라오면 그때 상황이 달라질 수 있으니 타임라인은 봐야 할 것 같아요.",
    createdAt: T28 - 28*60_000, likes: 63, comments: 3 },

  // AMZN — Bedrock/Claude ──────────────────────────────────────────────────
  { id: 164, symbol: "AMZN", nickname: "익명_7284", holdingLabel: "25주 보유",
    content: "AWS Q/Q 마진 +2.1bps인데 Azure가 -2.5bps라고? 이 차이가 뒤집어지는 게 아니라 벌어지고 있다는 게 진짜 중요해요. Claude가 기업 AI 표준으로 자리잡으면 Bedrock 기반 AWS가 AI 클라우드 대장이 되는 거잖아요. Anthropic 투자 잘했다는 게 이제 숫자로 나오는 중이에요.",
    createdAt: T28 - 12*60_000, likes: 95, comments: 3 },
  { id: 165, symbol: "AMZN", nickname: "익명_3847", holdingLabel: "60주 보유",
    content: "Trinium 칩이 마진 개선 핵심이라는 게 NVDA 안 사도 AI 추론을 처리한다는 거잖아요. AWS가 NVDA 의존도를 낮추면서 Claude 서비스하는 구조면 마진이 구조적으로 개선되는 거예요. Andy Jassy가 Claude through Bedrock을 직접 언급한 것 자체가 얼마나 큰 비중인지 보여주는 거고요.",
    createdAt: T28 - 37*60_000, likes: 73, comments: 2 },

  // TSLA — 유럽 판매 ───────────────────────────────────────────────────────
  { id: 166, symbol: "TSLA", nickname: "익명_1847", holdingLabel: "90주 보유",
    content: "+46.5%가 ACEA 공식 데이터라는 거 진짜 중요해요. 그동안 '테슬라 유럽에서 망했다'는 얘기가 너무 많았는데 3개월 연속 반등이 공식 통계로 나왔어요. EU 단독 +67%이면 브랜드 회복 속도가 생각보다 빠른 거예요. 신형 Model Y 효과 아직 유럽에서 본격적으로 반영 안 된 부분도 있을 것 같아서 Q2 데이터가 더 기대돼요.",
    createdAt: T28 - 7*60_000, likes: 109, comments: 4 },
  { id: 167, symbol: "TSLA", nickname: "익명_5291", holdingLabel: "50주 보유",
    content: "VW -3.8%, BMW -6.3%인데 테슬라만 +46.5%면 이건 그냥 브랜드 반등이 아니라 유럽 EV 시장 자체에서 테슬라가 빈 자리를 채우는 거예요. 규제로 전기차 비율 올려야 하는데 BYD는 아직 유럽에서 덜 알려졌고 결국 테슬라로 돌아오는 구조인 것 같아요. SpaceX Megapack 벨기에 착공 소식도 같이 나와서 유럽 시장 강화하는 분위기예요.",
    createdAt: T28 - 29*60_000, likes: 84, comments: 3 },

  // SPCX — IPO 시나리오 ────────────────────────────────────────────────────
  { id: 168, symbol: "SPCX", nickname: "익명_8492", holdingLabel: "관심종목",
    content: "Ron Baron이 '세계 최대 기업'이라고 하면 그냥 하는 말이 아니에요. 그 분 포트폴리오에서 SpaceX 비중이 얼마인지 공개되진 않았지만 실제로 가장 큰 주주 중 하나인 게 맞아요. Elon이 완전 재사용 올해 목표라고 한 거 실현되면 발사 비용이 지금의 10분의 1인데 그러면 $350B도 저평가가 맞는 거예요. IPO 빨리 해줬으면 진짜.",
    createdAt: T28 - 16*60_000, likes: 97, comments: 4 },
  { id: 169, symbol: "SPCX", nickname: "익명_3726", holdingLabel: "관심종목",
    content: "4가지 시나리오 중 저는 Starlink 단독 상장이 제일 좋다고 봐요. Starlink만 해도 B2C + 항공 38개사 + 군사 계약 다 있는데 거기다 Starship 발사 비즈니스까지 포함하면 $300B 이상 나와요. 테슬라랑 합치면 테슬라 주주는 좋을 수 있어도 SpaceX 고성장이 EV 비용 구조에 발목 잡히는 게 아닌가 싶어서요.",
    createdAt: T28 - 42*60_000, likes: 74, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-29 — TSLA AVO인가 / FSD 2,670만 마일 / 중국 FSD / Giga Texas /
  //              SPCX IPO TAM / Starlink 30사 / SpaceX×AMTX / AMTX $65B /
  //              SMCI ROI 2030 / META 구독 / 이란협상 / CBDC폐지
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — AVO 로보택시 공식 인가 ──────────────────────────────────────────
  { id: 170, symbol: "TSLA", nickname: "익명_2847", holdingLabel: "120주 보유",
    content: "텍사스 AVO 인가 진짜 나왔어요. Tesla Robotaxi LLC가 정식 AVO 사업자 승인 받은 거잖아요. 안전요원 없이 유료 탑승 가능한 게 이제 법적으로 확정된 거고 7월 오스틴 배포가 현실이 된 거예요. 이게 로보택시 밸류에이션 재평가 트리거가 맞는데 시장이 아직 안 움직이는 게 오히려 기회 같아요.",
    createdAt: T29 - 12*60_000, likes: 134, comments: 5 },
  { id: 171, symbol: "TSLA", nickname: "익명_5183", holdingLabel: "55주 보유",
    content: "웨이모가 샌프란시스코 몇 년 걸린 거 테슬라가 텍사스에서 더 빠르게 인가 받았어요. FSD 일 2,670만 마일 데이터가 규제 당국 신뢰의 핵심이라고 봐요. 이 속도면 연말에 다른 주도 AVO 인가 받을 수 있을 거예요.",
    createdAt: T29 - 28*60_000, likes: 98, comments: 4 },

  // TSLA — FSD 2,670만 마일 ─────────────────────────────────────────────
  { id: 172, symbol: "TSLA", nickname: "익명_9374", holdingLabel: "80주 보유",
    content: "FSD 일 2,670만 마일 +44%가 Morgan Stanley에서 나온 건데 이게 월 성장률이 44%예요. 이 속도 유지되면 연말에 일 5천만 마일 넘는 거잖아요. 웨이모 연간 5천만 마일인데 테슬라가 하루에 그걸 찍는 거예요. 데이터 해자가 넓어질수록 자율주행 경쟁은 이미 끝난 거라고 봐요.",
    createdAt: T29 - 9*60_000, likes: 117, comments: 5 },
  { id: 173, symbol: "TSLA", nickname: "익명_6291", holdingLabel: "35주 보유",
    content: "4월 1,850만에서 5월 2,670만으로 한 달 만에 820만 마일 늘어난 거잖아요. FSD 구독자가 그만큼 빠르게 늘고 있다는 건데 AVO 인가랑 맞물리면 다음 달은 더 크게 뛸 것 같아요. 연간 97억 마일이면 경쟁 자체가 안 되는 수준이에요.",
    createdAt: T29 - 35*60_000, likes: 83, comments: 3 },

  // SPCX — IPO TAM 분석 ────────────────────────────────────────────────
  { id: 174, symbol: "SPCX", nickname: "익명_7483", holdingLabel: "관심종목",
    content: "ARK가 SpaceX TAM을 $28.5조로 분석한 건 발사 + Starlink + AI 컴퓨팅 다 합친 숫자예요. Polymarkets에서 IPO 시총 $2조+ 가능성이 제일 높게 책정되는 건 현재 $350B이 얼마나 저평가인지 시장이 이미 알고 있다는 거죠. 빨리 상장해줬으면 진짜.",
    createdAt: T29 - 14*60_000, likes: 108, comments: 4 },
  { id: 175, symbol: "SPCX", nickname: "익명_3916", holdingLabel: "관심종목",
    content: "Starlink 통신사 30개가 실 과금 구조라는 게 핵심이에요. MOU나 파일럿이 아니라 진짜 돈이 들어오고 있는 거잖아요. 통신사 30개 × 연간 수억씩 = Starlink B2B만 수십억 달러 구조가 이미 완성됐다는 거예요. 여기다 B2C 개인 구독까지 합하면 Starlink 단독으로도 수천억 달러 밸류에이션 가능해요.",
    createdAt: T29 - 41*60_000, likes: 79, comments: 3 },

  // AMTX — Anthropic $65B ──────────────────────────────────────────────
  { id: 176, symbol: "AMZN", nickname: "익명_1847", holdingLabel: "40주 보유",
    content: "Anthropic $65B에 Claude ARR $47B이면 PSR(주가매출비율)이 거의 1.4배밖에 안 돼요. OpenAI는 $157B에 매출 $35B이면 PSR 4배인데 Anthropic이 훨씬 싼 거잖아요. Amazon이 최대주주인데 상장하면 AMZN 주가에 직접 반영될 것 같아요. Bedrock 통한 Claude 성장이 AWS 마진 1위 만든 것도 증명됐으니까요.",
    createdAt: T29 - 18*60_000, likes: 96, comments: 4 },
  { id: 177, symbol: "SMCI", nickname: "익명_4829", holdingLabel: "100주 보유",
    content: "SMCI가 2030 AI ROI 달성 수혜 1순위라는 분석 공감해요. 회계 정정 끝나고 이제 본업 얘기를 할 수 있는 구간인데 수주잔고가 역대 최고라는 거잖아요. 커스텀 칩 채택 하이퍼스케일러들이 AI 서버를 계속 사야 하는 구조에서 SMCI 빼고는 이 물량 소화할 수 있는 데가 없어요.",
    createdAt: T29 - 23*60_000, likes: 71, comments: 3 },

  // META — Dollar-Dollar 구독 ──────────────────────────────────────────
  { id: 178, symbol: "META", nickname: "익명_8374", holdingLabel: "65주 보유",
    content: "Meta가 $14 구독 내놓은 게 생각보다 큰 변화예요. 32억 MAU 중 1%만 전환해도 연간 $54억 구독 수익인데 광고랑 같이 가면 PSR 올라가는 거잖아요. 애널 목표주가 $314 Buy 나온 것도 이 구독 레이어가 밸류에이션 멀티플을 SaaS 수준으로 끌어올릴 수 있다는 거고요.",
    createdAt: T29 - 11*60_000, likes: 89, comments: 3 },
  { id: 179, symbol: "META", nickname: "익명_2938", holdingLabel: "30주 보유",
    content: "AI 광고 ROI 2배 + 구독 수익 + Llama API 수익화까지 합치면 Meta가 세 개 수익 레이어를 동시에 키우는 거예요. 광고 회사에서 플랫폼 기업으로 재평가 받으면 지금 주가에서 30~40% 더 갈 수 있다고 봐요. $314 목표도 사실 보수적인 것 같아요.",
    createdAt: T29 - 47*60_000, likes: 62, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-27 — TSLA-SpaceX 합병 / Q1 적자 / Optimus5 / 렌즈특허 /
  //              중국 NEV 84K / SpaceX 우주군 $23.5억 / Starlink 38항공사 /
  //              AMD $1T / MU CHIPS $51.6억 / AAPL $380
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — Tesla-SpaceX 합병 루머 ──────────────────────────────────────────
  { id: 139, symbol: "TSLA", nickname: "익명_4729", holdingLabel: "85주 보유",
    content: "CNBC에 Tesla-SpaceX 합병 검토 나왔는데 진짜예요?? 아침에 보고 심장 떨렸는데 Kalshi가 77%에서 33%로 하루 만에 반토막난 거 보니까 진짜 될 것 같진 않네요. 그래도 시장이 합병 가능성을 33%로 보는 것 자체가 놀라운 거잖아요. 일론이 테슬라에만 집중했으면 좋겠는데",
    createdAt: T27 - 7*60_000, likes: 112, comments: 5 },
  { id: 140, symbol: "TSLA", nickname: "익명_8391", holdingLabel: "160주 보유",
    content: "합병 되면 좋은 게 머스크 관심이 테슬라 하나로 집중된다는 거잖아요. 지금 SpaceX, xAI, Starlink, Boring 다 신경쓰면서 테슬라 집중이 안 된다는 게 주주 입장에서 불만이었는데. 근데 교환비율 문제가 진짜 걸려요. SpaceX가 $350B인데 테슬라 주주들이 얼마나 희석될지 계산이 안 되네요",
    createdAt: T27 - 22*60_000, likes: 89, comments: 4 },
  { id: 141, symbol: "SPCX", nickname: "익명_3847", holdingLabel: "관심종목",
    content: "테슬라 합병보다 SpaceX 단독 IPO가 더 좋다고 봐요. 합병되면 SpaceX의 고성장이 테슬라 비용 구조에 묶이는 거잖아요. 별도 IPO면 Starlink만으로 $200B+ 가치 인정받을 수 있는데 굳이 합치는 게 맞는지 모르겠어요. Dan Ives 전망이 다야 아무것도 확정 안 된 거죠",
    createdAt: T27 - 35*60_000, likes: 67, comments: 3 },

  // TSLA — Q1 2026 실적 ─────────────────────────────────────────────────
  { id: 142, symbol: "TSLA", nickname: "익명_6283", holdingLabel: "45주 보유",
    content: "Q1 순손실 -$42.8억이요?? 매출은 늘었는데 비용이 갑자기 +64%면 이게 뭔가요 진짜. 연간으로 -$49억인데 이건 역대 최대 적자잖아요. 로봇이나 FSD에 다 쏟아붓는다는데 언제까지 기다려야 하는 건지... 주가가 $422인 게 이해가 안 됩니다 저는",
    createdAt: T27 - 14*60_000, likes: 78, comments: 4 },
  { id: 143, symbol: "TSLA", nickname: "익명_5174", holdingLabel: "200주 보유",
    content: "적자 보고 흔들리시는 분들 이해는 하는데 테슬라 지금 옵티머스·사이버캡에 올인하는 시기잖아요. 아마존도 2000년대 초에 수년간 적자 냈는데 버틴 사람이 진짜 돈 번 거잖아요. 비용이 R&D로 가는 건지 낭비로 가는 건지 그게 핵심인데 저는 로봇이 상용화되면 다 회수된다고 봐요",
    createdAt: T27 - 41*60_000, likes: 94, comments: 5 },

  // TSLA — Optimus 5 ────────────────────────────────────────────────────
  { id: 144, symbol: "TSLA", nickname: "익명_1927", holdingLabel: "70주 보유",
    content: "머스크가 Optimus 5를 '세계 최고, 경쟁자 없음'이라고 했는데 이거 진짜 말이 되는 게 FSD AI랑 동일 아키텍처쓰는 거잖아요. 보스턴다이내믹스 Atlas는 좋아 보여도 생산 단가가 너무 비싸고 Figure나 1X는 아직 시연 수준이고. 테슬라만 양산 체계 갖춘 AI 로봇 회사예요 지금",
    createdAt: T27 - 9*60_000, likes: 86, comments: 3 },
  { id: 145, symbol: "TSLA", nickname: "익명_7481", holdingLabel: "30주 보유",
    content: "옵티머스 발표가 너무 많아서 피로감 있는데... Gen1 Gen2 Gen3 Gen4 Gen5 이제 5세대까지 나왔다고 하는데 정작 외부 판매는 언제 시작하는 건지 모르겠어요. 테슬라 공장에 자기들이 쓴다는 얘기만 하는데 외부 기업에 파는 시점이 진짜 주가 촉매가 될 것 같아요",
    createdAt: T27 - 28*60_000, likes: 55, comments: 3 },

  // TSLA — 렌즈 특허 ────────────────────────────────────────────────────
  { id: 146, symbol: "TSLA", nickname: "익명_3618", holdingLabel: "55주 보유",
    content: "카메라 렌즈 자동 세정 특허 나온 거 보고 이건 진짜 실용적인 기술이다 싶었어요. 순수 카메라 기반 FSD의 가장 큰 단점이 비오는 날 렌즈 오염인데 이게 AI로 감지해서 자동으로 닦는다는 거잖아요. Waymo가 라이다 쓰는 이유 중 하나가 이 문제인데 테슬라가 카메라만으로 극복하는 거네요",
    createdAt: T27 - 18*60_000, likes: 71, comments: 3 },

  // TSLA — 중국 NEV ─────────────────────────────────────────────────────
  { id: 147, symbol: "TSLA", nickname: "익명_9273", holdingLabel: "110주 보유",
    content: "베이징 NEV 84,000대면 역대급 맞죠? 신형 Model Y 효과에 미중 관세 협상 분위기까지 겹친 거잖아요. Q1에 중국 10만대 좀 넘긴 게 아쉬웠는데 Q2에 14만대 가면 전체 실적 분위기 달라져요. 중국이 회복되면 다른 거 다 커버가 되거든요",
    createdAt: T27 - 6*60_000, likes: 103, comments: 4 },

  // SPCX — 미 우주군 SDN 계약 ─────────────────────────────────────────
  { id: 148, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "$2.35B 우주군 계약이요. Starlink가 이제 민간 인터넷만이 아니라 군사 통신망 핵심 인프라가 됐다는 거잖아요. 비상장이라 직접 투자가 안 되니까 답답한데 IPO 되면 정부 계약 수익이 기업가치에 명시적으로 반영될 거예요. 진짜 상장 언제 하는 거야",
    createdAt: T27 - 13*60_000, likes: 88, comments: 4 },
  { id: 149, symbol: "SPCX", nickname: "익명_6173", holdingLabel: "관심종목",
    content: "Starlink가 항공사 38개에 군사 통신까지 먹으면 구독 수익 + 정부 계약 이중으로 들어오는 구조잖아요. 거기다 Starship 발사 서비스도 있고. 이 세 가지 수익원을 다 가진 회사가 $350B인데 IPO 되면 진짜 얼마나 갈지 기대되네요. 테슬라 합병보단 단독 IPO가 낫다고 봐요",
    createdAt: T27 - 30*60_000, likes: 74, comments: 3 },

  // AMD — $1T 달성 ──────────────────────────────────────────────────────
  { id: 150, symbol: "AMD", nickname: "익명_5291", holdingLabel: "60주 보유",
    content: "$1조 달러 달성!! AMD 들고 4년째인데 이 순간 보려고 버텼어요 ㅠㅠ $506에 +5.86%라니... MI300X가 NVDA 못 구하는 기업들 다 흡수하는 거 보면서 언젠간 올 줄 알았어요. Lisa Su 진짜 대단한 CEO예요. 아직도 추가매수 고민 중인데 $1T 넘겨도 갈 길이 있을까요",
    createdAt: T27 - 5*60_000, likes: 134, comments: 6 },
  { id: 151, symbol: "AMD", nickname: "익명_8492", holdingLabel: "25주 보유",
    content: "AMD $1T이라니 진짜 역사적인 순간이네요. 2022년에 $5에서 $506이 되는 동안 포기한 적도 있었는데 결국 여기까지 왔어요. NVDA보다 밸류에이션이 낮아서 AI GPU 대안으로 계속 사들이는 기관들 덕분인 것 같아요. 연내 $600 가능할까요",
    createdAt: T27 - 20*60_000, likes: 97, comments: 4 },

  // MU — CHIPS법 + 정치인 매수 ─────────────────────────────────────────
  { id: 152, symbol: "MU", nickname: "익명_3947", holdingLabel: "40주 보유",
    content: "마이크론 CHIPS법 $51.6억 확정이고 거기다 CHIPS법 감독하는 상원의원들이 직접 MU 샀다는 거잖아요. Fetterman이 +48%라고... 이건 논란이 있는 거긴 한데 어찌됐든 CHIPS법이 계속된다는 거 확신하고 산 거잖아요. HBM4에서 SK하이닉스랑 같이 NVDA 먹이는 구조면 장기 들고 가야겠네요",
    createdAt: T27 - 17*60_000, likes: 82, comments: 3 },
  { id: 153, symbol: "MU", nickname: "익명_1738", holdingLabel: "15주 보유",
    content: "마이크론 주가 $858이라는 게 믿기지 않네요. 작년에 $100대였는데. CHIPS법 보조금에 HBM4 수요까지 겹쳐서 이렇게 온 거잖아요. 아이다호 새 팹 다 지어지면 생산량 얼마나 늘어나는 건지 궁금하네요. 지금이라도 들어가야 하는 건지",
    createdAt: T27 - 36*60_000, likes: 61, comments: 2 },

  // AAPL — 목표주가 $380 ─────────────────────────────────────────────
  { id: 154, symbol: "AAPL", nickname: "익명_7294", holdingLabel: "50주 보유",
    content: "BofA가 목표주가 $380 올렸어요. 에이전트 AI 시대에 앱스토어가 AI 에이전트 진입 게이트라는 논리가 진짜 맞는 말이에요. 결제는 Apple Pay, 인증은 Face ID, AI는 Siri... 이 모든 게 하나로 연결되는 생태계 가진 게 애플밖에 없잖아요. $311에서 $380이면 아직 22% 업사이드 있는 거고",
    createdAt: T27 - 11*60_000, likes: 91, comments: 4 },
  { id: 155, symbol: "AAPL", nickname: "익명_4827", holdingLabel: "35주 보유",
    content: "애플 들고 있으면서 AI 모멘텀이 약하다고 생각했는데 BofA 리포트 보니까 생각이 바뀌네요. 온디바이스 AI가 개인정보 보호랑 연결되는 게 강점이라는 거잖아요. 기기 교체 사이클 올라오면 다음 실적부터 반영될 거고... $380 간다는 데 동의해요",
    createdAt: T27 - 29*60_000, likes: 63, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-26 — NVDA Rubin Ultra 7.2x / Cybercab 165Wh / FSD 네덜란드 /
  //              Tesla 텍사스 법인 / Model Y 첫 인도 / SpaceX $350B /
  //              Anthropic $45B ARR
  // ════════════════════════════════════════════════════════════════════════

  // NVDA — Rubin Ultra HBM 7.2x ─────────────────────────────────────────
  { id: 128, symbol: "NVDA", nickname: "익명_3847", holdingLabel: "32주 보유",
    content: "Rubin Ultra가 576GB라는 거 진짜예요? H100 80GB 대비 7.2배면 이제 GPT-4급 모델을 GPU 한 장에 다 올릴 수 있다는 얘기잖아요. 데이터센터 구축 비용 자체가 혁신될 것 같아요. SK하이닉스 HBM4 독점 공급이면 같이 사야 하나요",
    createdAt: T26 - 8*60_000, likes: 74, comments: 3 },
  { id: 129, symbol: "NVDA", nickname: "익명_5192", holdingLabel: "18주 보유",
    content: "A100 40GB → Rubin Ultra 576GB가 7년 만에 14.4배 점프라는 거 계산해보니 소름돋네요. 이 속도면 2030년엔 TB급 HBM이 나오는 건가요. Vera CPU까지 자체 설계라면 진짜 NVDA가 인텔·AMD 서버시장까지 먹으려는 거잖아요",
    createdAt: T26 - 25*60_000, likes: 58, comments: 2 },

  // TSLA — Cybercab 165Wh/mile ──────────────────────────────────────────
  { id: 130, symbol: "TSLA", nickname: "익명_7483", holdingLabel: "75주 보유",
    content: "Cybercab 165Wh/mile이 공식 인증이라는 거 보고 바로 계산기 두드렸어요. 마일당 $0.02면 연간 10만 마일 달려봤자 에너지 비용 $2,000이에요. 기존 택시 유지비가 $12,000 이상인데 이건 비교 자체가 안 되는 구조잖아요. 로보택시 마진이 얼마나 날지 진짜 기대돼요",
    createdAt: T26 - 12*60_000, likes: 91, comments: 4 },
  { id: 131, symbol: "TSLA", nickname: "익명_2938", holdingLabel: "40주 보유",
    content: "Lucid Air도 190Wh인데 Cybercab이 165라니... 이건 자율주행 전용으로 설계해서 나온 숫자인 거잖아요. 스티어링휠도 없고 페달도 없으니 경량화가 극도로 된 거고. Waymo가 이 효율 따라오려면 차를 처음부터 다시 만들어야 해요. 진짜 해자네요",
    createdAt: T26 - 30*60_000, likes: 67, comments: 3 },

  // TSLA — FSD 네덜란드 ─────────────────────────────────────────────────
  { id: 132, symbol: "TSLA", nickname: "익명_6174", holdingLabel: "55주 보유",
    content: "FSD가 드디어 미국·중국 넘어서 네덜란드에서 실도로 테스트됐어요! 벨기에 승인 나고 바로 네덜란드 실주행이라는 건 여름 EU 출시 진짜 가능하다는 거잖아요. 유럽 테슬라 80만 대 중 FSD 10%만 전환해도 어마어마한 소프트웨어 매출이에요",
    createdAt: T26 - 15*60_000, likes: 83, comments: 3 },

  // TSLA — 텍사스 법인 ──────────────────────────────────────────────────
  { id: 133, symbol: "TSLA", nickname: "익명_9021", holdingLabel: "120주 보유",
    content: "테슬라가 NASDAQ 최초 텍사스 상장 기업이 됐다는 거 역사적인 순간 같아요. SpaceX도 텍사스, xAI도 텍사스, 이제 Tesla도 텍사스. 머스크 생태계가 완전히 텍사스로 모인 거잖아요. 세금 혜택에 기가텍사스 확장까지 장기 비용 구조가 확실히 개선되겠죠",
    createdAt: T26 - 20*60_000, likes: 72, comments: 3 },

  // TSLA — Model Y 첫 인도 ──────────────────────────────────────────────
  { id: 134, symbol: "TSLA", nickname: "익명_4827", holdingLabel: "90주 보유",
    content: "드디어 신형 Model Y 오늘 첫 인도! 8만 대 보너스 주문까지 확보됐다는 게 진짜 대단해요. Q2 인도량이 얼마나 나올지 벌써 기대되네요. 0-60 2.4초에 460kW 충전까지 스펙이 완전 괴물이에요. 지금 Model 3 타고 있는데 교체 진지하게 고민 중이에요",
    createdAt: T26 - 6*60_000, likes: 96, comments: 5 },
  { id: 135, symbol: "TSLA", nickname: "익명_1583", holdingLabel: "22주 보유",
    content: "색상 내장 플라스틱 패널이라서 도색 공정이 없다는 게 포인트예요. 도장 비용 빠지면 원가 절감 상당할 건데 마진 개선으로 직결될 것 같아요. 거기에 에너지 사업 메가팩 매출까지 더해지면 Q2 실적 진짜 기대해도 될 것 같아요",
    createdAt: T26 - 35*60_000, likes: 61, comments: 2 },

  // SPCX — SpaceX $350B IPO + xAI DC ──────────────────────────────────
  { id: 136, symbol: "SPCX", nickname: "익명_8372", holdingLabel: "관심종목",
    content: "$350B에 $1.5B 공모라는 거 Starlink 영업이익만 봐도 납득이 돼요. Q1에 $1B 벌었으면 연환산 $4B이고 63% 마진이면 기업가치 $350B이 오히려 저평가일 수 있어요. xAI DC 12개월 완공 vs 경쟁사 48개월이라는 건 속도 자체가 해자인 거잖아요",
    createdAt: T26 - 9*60_000, likes: 78, comments: 3 },
  { id: 137, symbol: "SPCX", nickname: "익명_3194", holdingLabel: "관심종목",
    content: "DC 1GW당 연 $20B 임대 수익 vs 건설 중 연 $5B 손실이라는 경제성 계산이 진짜 무섭네요. 빨리 완공할수록 GW당 $25B 이득인데 SpaceX가 12개월이면 경쟁사 3.6GW당 손실을 SpaceX는 1GW 수익으로 벌 수 있는 거잖아요. IPO 청약 진지하게 고민 중이에요",
    createdAt: T26 - 28*60_000, likes: 64, comments: 2 },

  // AMZN — Anthropic $45B ARR ──────────────────────────────────────────
  { id: 138, symbol: "AMZN", nickname: "익명_7293", holdingLabel: "35주 보유",
    content: "Anthropic $45B ARR이요?? 2월에 $9B이었는데 5개월 만에 5배라는 게 말이 되나요ㅋㅋ AWS가 독점 배포 파트너라는 게 진짜 중요한데 이 성장세가 AWS AI 매출로 그대로 반영되는 구조잖아요. AMZN 들고 있는 게 진짜 든든하게 느껴지네요",
    createdAt: T26 - 14*60_000, likes: 85, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-23 — SpaceX $1,000 접근·락업 / Tesla 중국 FSD 개명 / AMD 20%/yr /
  //              META 메가팩 $200M / Robotaxi 4도시 / FSD 벨기에 / Norway 100k /
  //              Fed Marsh 취임·10월 금리 인하
  // ════════════════════════════════════════════════════════════════════════

  // SPCX — SpaceX IPO $1,000 접근 + 락업 ────────────────────────────────
  { id: 116, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "SpaceX 비상장 $1,000이라고요?? 진짜냐요 ㅋㅋ 공모가 $45~78 얘기할 때 청약 넣으려고 Schwab 계좌 열었는데 이 가격이면 벌써 10배넘은 거잖아요. Starlink만으로도 이미 돈 버는 회사인데 상장하면 얼마까지 가는 거야",
    createdAt: T23 - 7*60_000, likes: 63, comments: 3 },
  { id: 117, symbol: "SPCX", nickname: "익명_5391", holdingLabel: "관심종목",
    content: "락업 Q2 실적 후 20%부터 단계적으로 푸는 거 확인했어요. 상장 첫날 바로 물량 터지는 건 아니니까 그나마 다행이고... Robinhood Gold 있으면 우선배정 된다 해서 Gold 가입해뒀어요",
    createdAt: T23 - 25*60_000, likes: 48, comments: 2 },

  // TSLA — 중국 FSD 개명 ─────────────────────────────────────────────────
  { id: 118, symbol: "TSLA", nickname: "익명_7293", holdingLabel: "90주 보유",
    content: "중국 FSD 이름 바꿨다는 뉴스 보셨어요? 特斯拉辅助驾驶... 뭔지 모르겠는데 기능은 그대로고 가격도 안 올렸대요. 규제 때문에 이름만 바꾼 거라 어차피 팔리는 건 다를 게 없는 거잖아요. 중국에서 FSD 돈 버는 거 시작되는 거 맞죠?",
    createdAt: T23 - 10*60_000, likes: 77, comments: 4 },
  { id: 119, symbol: "TSLA", nickname: "익명_4618", holdingLabel: "50주 보유",
    content: "Texas 4개 도시에 Robotaxi 시설 짓고 있다는 거 보고 오늘 추가매수했어요. Irving에 25,000sqft 배차시설에 Supercharger까지 넣는다는데 이거 진짜 상용화 임박한 거 아닌가요. Waymo처럼 외주 쓰는 게 아니라 직접 다 짓는다는 게 완전 다른 얘기예요",
    createdAt: T23 - 18*60_000, likes: 91, comments: 5 },
  { id: 120, symbol: "TSLA", nickname: "익명_3847", holdingLabel: "120주 보유",
    content: "벨기에 FSD 2천회 테스트 완료라는 거 보고 소름돋았어요. 벨기에가 유럽에서 제일 규제 빡빡하다고 들었는데 거기서 이만큼 굴렸으면 여름에 유럽 출시 진짜 되는 거 아닌가요. 유럽 80만대 중에 FSD 전환율만 10%여도...",
    createdAt: T23 - 35*60_000, likes: 84, comments: 4 },
  { id: 121, symbol: "TSLA", nickname: "익명_9024", holdingLabel: "200주 보유",
    content: "노르웨이 Model Y 10만대 첫 돌파 ㄷㄷ 한 나라에서 단일 차종 10만대가 처음이라는데... 노르웨이 29대 중 1대가 Model Y라니 그 나라 아직 못 가봤는데 길에서 엄청 보이겠네요. 독일 프랑스도 EV 보급 가속되면 결국 비슷하게 가겠죠",
    createdAt: T23 - 42*60_000, likes: 69, comments: 3 },

  // AMD — CPU 3년 20% 성장 ────────────────────────────────────────────────
  { id: 122, symbol: "AMD", nickname: "익명_6193", holdingLabel: "45주 보유",
    content: "Lisa Su가 CPU 3년 20%/년 성장 얘기하면서 공급이 tight하다는 거 이거 진짜예요? AMD 들고 있는데 GPU만 핫한 줄 알았는데 AI 에이전트 때문에 CPU도 엄청 먹는다는 거잖아요. Venice가 3nm에서 생산 시작했다는 것도 오늘 처음 알았어요",
    createdAt: T23 - 12*60_000, likes: 58, comments: 3 },
  { id: 123, symbol: "AMD", nickname: "익명_1847", holdingLabel: "20주 보유",
    content: "AMD 들고 있으면서 NVDA 못 따라가는 거 속상했는데 CPU 얘기 나오니까 좀 낫네요. EPYC 점유율 계속 오르고 있다는데 Intel이 진짜 힘들어 보여요. 이번에 매수 타이밍 잘 잡은 건지 모르겠어요",
    createdAt: T23 - 29*60_000, likes: 41, comments: 2 },

  // META — 메가팩 $200M ──────────────────────────────────────────────────
  { id: 124, symbol: "META", nickname: "익명_5726", holdingLabel: "30주 보유",
    content: "META가 Tesla 메가팩 $200M어치 산다는 거 보고 둘 다 들고 있어서 기분 좋네요 ㅋㅋ 와이오밍 AI DC 전력용이라는데 AI 서버 전기 진짜 많이 먹나봐요. 청정에너지로 가면서 전기세도 아끼는 거니까 META 입장에서 나쁠 게 없겠죠",
    createdAt: T23 - 8*60_000, likes: 47, comments: 2 },
  { id: 125, symbol: "TSLA", nickname: "익명_8372", holdingLabel: "75주 보유",
    content: "META가 Tesla 메가팩 $200M 계약했다는 뉴스 좋네요. 이제 AI회사들이 Tesla 배터리 사는 거잖아요. TSLA 에너지 사업이 EV 못지않게 커지는 거 체감되고 있어요. 지금 가격에 추가 들어갈까 고민 중이에요",
    createdAt: T23 - 16*60_000, likes: 82, comments: 3 },

  // Macro — Fed Marsh·금리 인하·Tom Lee ────────────────────────────────
  { id: 126, symbol: "NVDA", nickname: "익명_4193", holdingLabel: "55주 보유",
    content: "Marsh 새 의장 취임하면서 10월 금리 인하 얘기 나오네요. 금리 내려가면 성장주 좋다는 거 알면서도 매번 설레요 ㅋㅋ Tom Lee도 강세장 지속이라고 하고... NVDA 55주 들고 버티길 잘한 것 같아요",
    createdAt: T23 - 6*60_000, likes: 71, comments: 3 },
  { id: 127, symbol: "TSLA", nickname: "익명_2948", holdingLabel: "110주 보유",
    content: "Fed 의장 바뀌고 금리 인하 기대 강해지는 거 보니까 테슬라 오토론 이자 내려갈 날도 얼마 안 남은 것 같아요. 할부 이자 줄면 구매 수요 올라가는 거잖아요. Tom Lee 강세장 선언도 나왔고 하반기 기대되네요",
    createdAt: T23 - 22*60_000, likes: 66, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-22 — SpaceX IPO 소매 직접 / NVDA $270B FCF /
  //              Tesla 유럽 +30% / TSLA+SpaceX 합병 41% / FSD 벨기에 /
  //              AI ROI 검증 MSFT / OpenAI $5.7B vs Anthropic / 이란 핵합의
  // ════════════════════════════════════════════════════════════════════════

  // NVDA — $270B FCF 전망 ──────────────────────────────────────────────────
  { id: 104, symbol: "NVDA", nickname: "익명_5821", holdingLabel: "40주 보유",
    content: "NVDA 12개월 $270B 현금 창출 전망이라는데, Q1 OCF가 $50.3B이면 연환산만 해도 $200B이에요. 여기서 Blackwell 수요가 더 가속되면 $270B이 보수적인 숫자일 수 있겠다 싶어요. 이 돈 어디에 쓸지가 더 궁금해요.",
    createdAt: T22 - 5*60_000, likes: 74, comments: 3 },
  { id: 105, symbol: "NVDA", nickname: "익명_3047", holdingLabel: "8주 보유",
    content: "애플 연간 FCF가 $110B이고 NVDA 12개월 전망이 $270B이면... 소프트웨어 없이 하드웨어 팔아서 2배 넘게 버는 거잖아요. CUDA 해자가 진짜 경제적 해자인 게 수치로 증명되는 순간이에요.",
    createdAt: T22 - 22*60_000, likes: 51, comments: 2 },

  // TSLA — 유럽 +30% ────────────────────────────────────────────────────
  { id: 106, symbol: "TSLA", nickname: "익명_7392", holdingLabel: "150주 보유",
    content: "Tesla 유럽 4월 +30%인데 Mercedes -7% Volkswagen -8%이에요. 독일 차들이 자국 시장에서도 밀리는 게 진짜 충격이에요. FSD 벨기에 승인까지 나왔으니 하반기 유럽 점유율 더 올라가겠죠.",
    createdAt: T22 - 8*60_000, likes: 88, comments: 4 },
  { id: 107, symbol: "TSLA", nickname: "익명_2619", holdingLabel: "60주 보유",
    content: "Musk 브랜드 리스크 때문에 유럽 판매 망했다는 말 많았는데 데이터 보면 반대잖아요. Deutsche Bank가 '경쟁사 압도적 증거'라고 한 게 정확한 표현인 것 같아요. Starlink 연동까지 되면 진짜 독점 플랫폼이에요.",
    createdAt: T22 - 31*60_000, likes: 62, comments: 3 },

  // TSLA — 합병 41% + FSD 벨기에 + Robotaxi ──────────────────────────────
  { id: 108, symbol: "TSLA", nickname: "익명_9143", holdingLabel: "200주 보유",
    content: "Kalshi에서 Tesla/SpaceX 합병 41%라는 거 보셨어요? 41%면 그냥 찌라시가 아니라 시장이 진지하게 보기 시작한 거잖아요. 합병되면 Starlink 수익이 테슬라 재무에 반영되는 거고 밸류에이션이 완전히 달라지죠.",
    createdAt: T22 - 14*60_000, likes: 95, comments: 5 },
  { id: 109, symbol: "TSLA", nickname: "익명_4856", holdingLabel: "85주 보유",
    content: "FSD 벨기에 승인이 왜 중요하냐면 벨기에가 EU에서 가장 보수적인 규제기관이에요. 거기서 통과했으면 독일·프랑스 승인은 시간문제예요. 텍사스 Robotaxi 수백 대 계획이랑 합치면 2026 하반기 FSD 수익화 본격화가 보여요.",
    createdAt: T22 - 45*60_000, likes: 71, comments: 3 },

  // MSFT — AI ROI 검증 ────────────────────────────────────────────────────
  { id: 110, symbol: "MSFT", nickname: "익명_6284", holdingLabel: "35주 보유",
    content: "MSFT CTO가 Claude Code 취소했다는 거 보셨어요? $10B AI 인프라 구축하는 회사가 구독 자르는 게 의미심장해요. AI 앱 레이어가 진짜 ROI 증명 못 하면 기업 예산 삭감 1순위가 되는 구조예요. NVDA·AMZN은 괜찮지만 SaaS AI는 조심해야 할 것 같아요.",
    createdAt: T22 - 11*60_000, likes: 58, comments: 3 },
  { id: 111, symbol: "AMZN", nickname: "익명_8371", holdingLabel: "20주 보유",
    content: "MSFT가 Claude 취소하는 동안 AMZN은 AI 인프라에 $1B 더 쏜다는 게 포인트예요. 앱 레이어는 잘리고 인프라 레이어는 더 커지는 AI 지출 양극화가 명확해지고 있어요. AWS AI가 직접 수혜받는 구조죠.",
    createdAt: T22 - 27*60_000, likes: 44, comments: 2 },

  // GOOGL / MSFT — OpenAI vs Anthropic ─────────────────────────────────
  { id: 112, symbol: "GOOGL", nickname: "익명_3728", holdingLabel: "45주 보유",
    content: "OpenAI Q1 $5.7B · Anthropic Q1 $4.7B 역전됐는데, 구글이 Anthropic 최대 투자자잖아요. Anthropic $1.5B SpaceX 컴퓨팅 계약으로 GPU 제약 풀리면 반등 가능하고, 그게 구글 수혜로 돌아오는 거예요. GOOGL이 AI 경쟁에서 양쪽 다 먹는 묘한 포지션이네요.",
    createdAt: T22 - 18*60_000, likes: 53, comments: 2 },
  { id: 113, symbol: "MSFT", nickname: "익명_5193", holdingLabel: "50주 보유",
    content: "OpenAI $5.7B이면 연환산 $22B 이상인데 MSFT 49% 지분이니까 간접으로 $11B이상이 MSFT에 귀속되는 구조예요. Azure 독점 배포까지 합치면 OpenAI 성장이 곧 MSFT 성장이에요. AI 왕좌 경쟁 수혜 가장 크게 받는 건 결국 MSFT인 것 같아요.",
    createdAt: T22 - 38*60_000, likes: 67, comments: 3 },

  // SPCX — SpaceX IPO 소매 직접 참여 ────────────────────────────────────
  { id: 114, symbol: "SPCX", nickname: "익명_7034", holdingLabel: "관심종목",
    content: "SpaceX 소매 IPO 청약이 Schwab·Fidelity·Robinhood 다 된다는데 진짜 역사적인 순간이에요. 의결권 구조 문제 있지만 Starlink 1천만 가입자에 Starship 상용화까지 있으면 밸류에이션이 얼마로 나올지 진짜 궁금해요.",
    createdAt: T22 - 6*60_000, likes: 42, comments: 2 },
  { id: 115, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "드디어 $SPCX 청약 시작이에요. S&P500 편입되면 패시브 자금 수십억 달러가 강제 유입되는데 상장 첫날 얼마나 튀어오를지 계산이 안 돼요. 분할 매수로 접근하는 게 안전할 것 같아요.",
    createdAt: T22 - 20*60_000, likes: 58, comments: 3 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-21 — NVDA Q1 FY2027 $75.2B / SpaceX IPO S-1 $SPCX /
  //              Tesla 유리지붕 특허 Active HVAC
  // ════════════════════════════════════════════════════════════════════════

  // NVDA — Q1 FY2027 실적 ─────────────────────────────────────────────────
  { id: 98, symbol: "NVDA", nickname: "익명_4291", holdingLabel: "25주 보유",
    content: "NVDA Q1 FY2027 데이터센터 $75.2B이 나왔는데 전년 동기 $39.1B이니까 92% 성장이에요. OCF이 $50B이 단일 분기에 나온다는 게 말이 되나 싶어요. 마이크로소프트랑 아마존보다 현금을 더 많이 버는 회사가 되는 거잖아요.",
    createdAt: T21 - m(5), likes: 61, comments: 3 },
  { id: 99, symbol: "NVDA", nickname: "익명_8172", holdingLabel: "12주 보유",
    content: "Dan Ives가 'eye-popping'이라 했는데 맞는 표현이에요. 분기 순이익 $58.3B이면 연환산 $230B인데 시총이랑 비교해봐도 여전히 AI 슈퍼사이클이 끝나지 않았다는 증거 아닐까요? 홀딩 유지합니다.",
    createdAt: T21 - m(18), likes: 43, comments: 2 },

  // SPCX — IPO S-1 SEC 제출 ─────────────────────────────────────────────
  { id: 100, symbol: "SPCX", nickname: "익명_6037", holdingLabel: "관심종목",
    content: "SpaceX S-1 공개됐어요! 티커 $SPCX로 드디어 상장 절차 시작됐네요. 머스크 의결권 85.1%라 소액주주 영향력은 없지만 Starlink 1천만 가입자에 Starship까지 있으면 밸류에이션이 어떻게 나올지 진짜 궁금해요. 우주경제 시대가 드디어 개인 투자자에게도 열리는 순간이에요.",
    createdAt: T21 - m(8), likes: 55, comments: 3 },
  { id: 101, symbol: "SPCX", nickname: "익명_2847", holdingLabel: "관심종목",
    content: "S&P500 편입 시 패시브 자금이 엄청나게 들어올 텐데요. Class B 93.6% 머스크가 가져간다는 거 좀 걸리긴 해요. 2028년 Starlink 1억 가입자 달성하면 Starlink 단독으로도 밸류에이션 정당화되는 구조라 장기 보유 논리가 있어요.",
    createdAt: T21 - m(25), likes: 38, comments: 2 },

  // TSLA — 유리지붕 특허 ──────────────────────────────────────────────────
  { id: 102, symbol: "TSLA", nickname: "익명_3918", holdingLabel: "55주 보유",
    content: "테슬라 유리지붕 특허 보셨어요? 외부 유리에 구멍 뚫고 에어갭으로 공기 순환시켜서 냉각하는 방식이래요. 에어컨 부하 줄이면 배터리 효율 올라가는 거잖아요. BYD가 이 수준을 따라오려면 꽤 걸릴 것 같아요.",
    createdAt: T21 - m(12), likes: 47, comments: 3 },
  { id: 103, symbol: "TSLA", nickname: "익명_7264", holdingLabel: "30주 보유",
    content: "Acoustic Tuning까지 결합했다는 게 포인트예요. 소음 차단 + 열 차단 동시에 잡으면 프리미엄 포지셔닝이 명품차 수준이잖아요. Cybercab에 이게 들어가면 승차 경험이 완전히 달라질 것 같아요. 로보택시 상용화 기대감 올라가네요.",
    createdAt: T21 - m(30), likes: 34, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-20 — NVDA Q4 +74% / Tesla $95B + 휴스턴 태양광 / Semi 77% 절감 /
  //              Karpathy→Anthropic / Buffett·Google·S&P 복리
  // ════════════════════════════════════════════════════════════════════════

  // NVDA — Q4 2025 실적 ────────────────────────────────────────────────────
  { id: 84, symbol: "NVDA", nickname: "익명_2841", holdingLabel: "18주 보유",
    content: "NVDA 작년 연수익 74% 나왔는데 더 놀라운 건 마진이 70%라는 거예요. 데이터센터가 89%라서 이제 GPU 파는 회사가 아니라 AI 인프라 독점 기업으로 봐야 할 것 같아요.",
    createdAt: T20 - m(3), likes: 47, comments: 2 },
  { id: 85, symbol: "NVDA", nickname: "익명_7193", holdingLabel: "6주 보유",
    content: "공정가치 $179라는데 지금 주가 보면 고평가 구간이긴 해요. 그래도 Blackwell 수요가 워낙 터졌다고 하니 이 계산 자체가 바뀔 수도 있잖아요. 일단 홀딩.",
    createdAt: T20 - m(18), likes: 31, comments: 0 },

  // TSLA — $95B 매출 + 태양광 + Semi ──────────────────────────────────────
  { id: 86, symbol: "TSLA", nickname: "익명_5382", holdingLabel: "65주 보유",
    content: "테슬라 $95B이 2012년 $0.2B에서 13년 만에 온 거잖아요. 근데 에너지 사업이 13%까지 올라온 게 더 눈에 띄어요. 자동차 매출보다 에너지가 먼저 추월하는 날이 오는 거 아닌가요.",
    createdAt: T20 - m(7), likes: 53, comments: 2 },
  { id: 87, symbol: "TSLA", nickname: "익명_9034", holdingLabel: "22주 보유",
    content: "Semi 운영비 77% 절감이면 물류회사들이 계산기 두드리면 답 나오잖아요. 캘리포니아 보조금도 나왔으니 이제 물량이 빠르게 늘 것 같아요. FSD 올라타면 기사 인건비까지 줄어드는 건데.",
    createdAt: T20 - m(22), likes: 38, comments: 2 },
  { id: 88, symbol: "TSLA", nickname: "익명_3617", holdingLabel: "110주 보유",
    content: "휴스턴에 태양광 공장 짓는다는 거 봤어요? Megapack 시설 옆에 같이 짓는다는데 2030년 100GW 목표래요. 자동차 회사가 이걸 한다는 게 아직도 신기하고 에너지 플랫폼 기업으로 봐야 할 것 같아요.",
    createdAt: T20 - m(35), likes: 29, comments: 0 },

  // GOOGL — Karpathy + 플랫폼 지배력 ──────────────────────────────────────
  { id: 89, symbol: "GOOGL", nickname: "익명_4728", holdingLabel: "32주 보유",
    content: "카파시가 Anthropic 갔어요. OpenAI한테는 충격이겠지만 구글 입장에선 좀 애매한 거죠. Anthropic 최대 투자자 중 하나가 구글이라 간접 수혜도 있긴 한데... 복잡하네요.",
    createdAt: T20 - m(4), likes: 44, comments: 2 },
  { id: 90, symbol: "GOOGL", nickname: "익명_6153", holdingLabel: "48주 보유",
    content: "구글 3B+ 사용자 제품이 6개라는 거 들어보셨어요? Gmail·검색·Maps·안드로이드·크롬·유튜브 다요. 이런 회사가 역대에 없었대요. AI가 검색 죽인다고들 하는데 이 기반이 쉽게 흔들릴 것 같지 않아요.",
    createdAt: T20 - m(28), likes: 36, comments: 2 },

  // AAPL — S&P 복리 / Buffett ────────────────────────────────────────────
  { id: 91, symbol: "AAPL", nickname: "익명_8246", holdingLabel: "85주 보유",
    content: "버핏 '시간이 지나면 이긴다'는 말이 결국 S&P 장기 복리 얘기예요. $10K 10년 보유하면 $27.7K인데 왜 못 참는지 모르겠어요. 폭락 때 파는 게 제일 큰 실수라는 거 머리로는 알면서.",
    createdAt: T20 - m(11), likes: 42, comments: 2 },

  // ETF — VOO / SPY / QQQ / SCHD ──────────────────────────────────────────
  { id: 92, symbol: "VOO", nickname: "익명_3847", holdingLabel: "120주 보유",
    content: "VOO 요즘 신고가 근처인데 그냥 계속 들고 가는 게 맞겠죠? S&P500이 무너지면 어차피 다 같이 힘든 거라서 딱히 대안도 없고. 그냥 버티는 게 전략인 것 같아요.",
    createdAt: T20 - m(15), likes: 38, comments: 2 },
  { id: 93, symbol: "VOO", nickname: "익명_7293", holdingLabel: "280주 보유",
    content: "월급 들어올 때마다 VOO 사는 게 9년 됐어요. 이것저것 분석하고 갈아탔다가 결국 VOO가 제일 낫다는 결론으로 돌아왔어요.",
    createdAt: T20 - m(40), likes: 51, comments: 0 },
  { id: 94, symbol: "SPY", nickname: "익명_5182", holdingLabel: "65주 보유",
    content: "SPY랑 VOO 둘 다 S&P500 추종인데 수수료 빼면 차이 없다는 거 알면서도 SPY 거래량이 워낙 커서 유동성 때문에 자꾸 SPY로 손이 가요.",
    createdAt: T20 - m(45), likes: 29, comments: 0 },
  { id: 95, symbol: "QQQ", nickname: "익명_8341", holdingLabel: "45주 보유",
    content: "QQQ가 AI 붐 타고 많이 올랐는데 나스닥100이니까 NVDA·MSFT·애플이 다 들어있잖아요. 개별종목 고르기 귀찮으면 QQQ 하나로 커버되는 것 같긴 해요.",
    createdAt: T20 - m(20), likes: 44, comments: 2 },
  { id: 96, symbol: "QQQ", nickname: "익명_2948", holdingLabel: "30주 보유",
    content: "QQQ 최근 5년 수익률이 말이 안 되는 수준이에요. AI 반도체 붐 꺼지면 타격이 크긴 하겠지만 장기로는 올라가는 방향 아닌가 싶어요.",
    createdAt: T20 - m(55), likes: 27, comments: 0 },
  { id: 97, symbol: "SCHD", nickname: "익명_6419", holdingLabel: "200주 보유",
    content: "SCHD 배당이 꼬박꼬박 들어오는 게 좋긴 한데 최근 3년 QQQ 대비 수익률이 많이 아쉬운 건 맞아요. 그냥 배당 재투자하면서 길게 가는 전략으로 홀딩 중.",
    createdAt: T20 - m(30), likes: 33, comments: 1 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-19 — Tesla FSD 삼성 서밋 / META 5% 구조조정 / SpaceX 선물 $208 /
  //              Burry TSMC $2.04B / 미국-이란 핵협상 / OpenAI vs Musk 종결 /
  //              Starlink 1,000만 돌파
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — Tesla FSD 삼성 서밋 ───────────────────────────────────────────
  { id: 75, symbol: "TSLA", nickname: "익명_5291", holdingLabel: "90주 보유",
    content: "삼성 서밋에서 일론 발언 봤어요? 텍사스 3도시에서 Optimus가 이미 완전 자율 운영 중이래요. FSD랑 Optimus랑 인간이 같은 신경망 쓴다는 것도 공개했는데, 이게 사실이면 타임라인이 완전히 달라지는 거잖아요.",
    createdAt: T19 - m(2), likes: 54, comments: 3 },
  { id: 76, symbol: "TSLA", nickname: "익명_8812", holdingLabel: "180주 보유",
    content: "FSD 아키텍처 공개 내용 봤어요? 카메라 1.5GB/s 입력을 750,000:1로 압축해서 초당 15회 주행 결정. 인간 뇌와 동일한 신경망 방식으로 피로 없이 98% 정확도 24/7 운행. 이제 단순 마케팅이 아니라 수치로 증명된 거잖아요. Cybercab 상용화 확신 강해졌어요.",
    createdAt: T19 - m(15), likes: 41, comments: 2 },

  // META — 5% 구조조정 ────────────────────────────────────────────────────
  { id: 77, symbol: "META", nickname: "익명_3391", holdingLabel: "40주 보유",
    content: "META 감원 3번 나눠서 발표한다는 거 봤어요? 북미 → 관리직 → 글로벌 순으로. 자르면서 AI에 $8B 쏟아붓는 게 좀 아이러니하긴 한데, 결국 이게 제일 빠른 마진 개선 방법이긴 해요.",
    createdAt: T19 - m(5), likes: 47, comments: 4 },
  { id: 78, symbol: "META", nickname: "익명_6678", holdingLabel: "25주 보유",
    content: "사람 자르면서 AI에 $8B 쏟아붓는 게 모순처럼 보이지만 완전히 합리적인 전략이에요. Llama 오픈소스 생태계 + Ray-Ban AI 안경 + Andromeda 광고 효율 2배... 빅테크 표준 플레이북이 됐네요. 장기 홀딩 유지합니다.",
    createdAt: T19 - m(30), likes: 29, comments: 0 },

  // AVGO — Burry TSMC·AVGO 베팅 ─────────────────────────────────────────
  { id: 79, symbol: "AVGO", nickname: "익명_2219", holdingLabel: "20주 보유",
    content: "Burry가 TSMC $2.04B 포지션 잡았어요. AI 붐에서 직접 칩 사는 게 아니라 만드는 데 베팅한다는 게 납득 가는 로직이에요. Broadcom도 같이 담았다는데 구글·메타 맞춤 AI칩 독점하는 거 보고 들어간 것 같아요.",
    createdAt: T19 - m(4), likes: 38, comments: 3 },

  // NVDA — Burry 역발상 ─────────────────────────────────────────────────
  { id: 80, symbol: "NVDA", nickname: "익명_4488", holdingLabel: "8주 보유",
    content: "Burry 로직이 재밌어요. NVDA 살 때 제조사를 산다는 거잖아요. 2·3나노 할 수 있는 게 TSMC밖에 없으니 NVDA보다 상단이 더 안전하다는 역발상. 근데 저는 NVDA도 같이 가져가야 한다고 봐요.",
    createdAt: T19 - m(20), likes: 33, comments: 2 },

  // SPCX — Starlink 1,000만 돌파 ─────────────────────────────────────────
  { id: 81, symbol: "SPCX", nickname: "익명_7723", holdingLabel: "관심종목",
    content: "Starlink 유료 가입자 1,000만 돌파했어요. 2020년 시작해서 6년 만에 1,000만이면 엄청난 속도. 2028년 1억 목표인데 달성되면 Starlink 단독으로도 SpaceX 밸류에이션 정당화돼요. 이제 $SPCX 직접 투자 길도 열렸으니 상장 이후가 기대돼요.",
    createdAt: T19 - m(8), likes: 36, comments: 2 },

  // MSFT — OpenAI vs Musk 소송 종결 ─────────────────────────────────────
  { id: 82, symbol: "MSFT", nickname: "익명_5503", holdingLabel: "35주 보유",
    content: "OpenAI vs Musk 소송 Trump 개입으로 30일 만에 사실상 종결됐어요. IPO 최대 법적 장벽이 사라진 거예요. 2026 H2 IPO 가면 $150~200B 밸류에이션인데 Microsoft가 $10B 투자한 최대 파트너로 직접 수혜자죠. AI 섹터 전체 촉매 이벤트가 될 것 같아요.",
    createdAt: T19 - m(3), likes: 44, comments: 3 },

  // AAPL — 이란 핵협상 지정학 리스크 완화 ───────────────────────────────
  { id: 83, symbol: "AAPL", nickname: "익명_9194", holdingLabel: "70주 보유",
    content: "미국-이란 핵협상 타결 가능성이 높아지고 있어요. 카타르·UAE 중재, 이란이 핵무기 개발 포기 조건으로 협상 중이래요. 합의되면 원유 공급 정상화 → 인플레 완화 → 금리 압력 감소 → 증시 호재예요. 특히 하반기 Apple 실적 시즌이랑 겹치면 시장 분위기가 완전히 달라질 것 같아요.",
    createdAt: T19 - m(10), likes: 31, comments: 2 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-18 — FSD V14.3.3 / Ackman MSFT $2.3B / 버핏 Apple 25년 /
  //              Tesla 칩 내재화 / Dimon AI 낙관론
  // ════════════════════════════════════════════════════════════════════════

  // TSLA — FSD V14.3.3 ────────────────────────────────────────────────────
  { id: 63, symbol: "TSLA", nickname: "익명_4481", holdingLabel: "120주 보유",
    content: "FSD V14.3.3 자율주행 통계 공개됐어요. 98% 정확도라는 수치를 직접 공시했다는 게 진짜 중요해요. 구독 전환율 올라갈 수밖에 없겠어요. 로보택시 타임라인도 앞당겨지는 거 아닌가요?",
    createdAt: T18 - m(3), likes: 51, comments: 4 },
  { id: 64, symbol: "TSLA", nickname: "익명_8821", holdingLabel: "35주 보유",
    content: "주차 표시도 없는 주차장에서 수동 신호 없이 자동 주차 완료 영상 봤어요? 진짜 무서울 정도네요. NHTSA 조사도 종결됐다니 이제 글로벌 확장 막을 게 없어 보여요.",
    createdAt: T18 - m(15), likes: 38, comments: 0 },
  { id: 65, symbol: "TSLA", nickname: "익명_3302", holdingLabel: "8주 보유",
    content: "Smart Summary 응답 속도도 빨라졌다고 하는데 운전자 경험이 점점 AI 어시스턴트 같아지는 거잖아요. FSD 구독료 인상 여력이 충분히 있을 것 같아요.",
    createdAt: T18 - m(28), likes: 22, comments: 0 },
  { id: 66, symbol: "TSLA", nickname: "익명_7739", holdingLabel: "200주 보유",
    content: "한국·대만에서 GDDR·LPDDR·DRAM 칩 설계 엔지니어 채용한다는 거 봤어요? Cortex AI 슈퍼컴퓨터 내재화가 진짜로 진행되고 있는 거네요. NVIDIA 의존도 줄이면 마진이 어마어마하게 좋아질 텐데.",
    createdAt: T18 - h(1), likes: 43, comments: 3 },

  // MSFT — Ackman $2.3B ────────────────────────────────────────────────────
  { id: 67, symbol: "MSFT", nickname: "익명_5521", holdingLabel: "25주 보유",
    content: "Ackman이 Google 전량 매도하고 Microsoft에 $2.3B 올인했어요. 빅테크 AI 패권 구도에서 구글 대신 MS를 선택한 거잖아요. Azure OpenAI + Copilot 조합이 진짜 무서운 거 맞아요.",
    createdAt: T18 - m(2), likes: 62, comments: 3 },
  { id: 68, symbol: "MSFT", nickname: "익명_9904", holdingLabel: "60주 보유",
    content: "Google 주주로서 Ackman 매도 소식 좀 걱정돼요. 반독점 소송 + Gemini 뒤처짐 + OpenAI 소송 공동 피고까지... MS 대비 리스크가 많긴 하죠.",
    createdAt: T18 - m(20), likes: 34, comments: 0 },
  { id: 69, symbol: "MSFT", nickname: "익명_1173", holdingLabel: "12주 보유",
    content: "GitHub Copilot 기업 사용자 수가 폭발적으로 늘고 있어요. 개발자 AI 도구 시장에서 1위 굳힌 상태에서 Copilot 엔터프라이즈까지 붙으면 ARR이 완전히 달라지겠어요.",
    createdAt: T18 - h(2), likes: 28, comments: 0 },

  // AAPL — Buffett Apple 25년 ─────────────────────────────────────────────
  { id: 70, symbol: "AAPL", nickname: "익명_6612", holdingLabel: "50주 보유",
    content: "버핏이 2016년 Apple 처음 매수한 지 딱 10년이 됐네요. $10,000 투자가 $120,000이 됐다는 거 믿기지 않아요. Apple Intelligence 사이클이 시작되면 또 한 번 비슷한 게 가능할까요?",
    createdAt: T18 - m(4), likes: 45, comments: 2 },
  { id: 71, symbol: "AAPL", nickname: "익명_3388", holdingLabel: "80주 보유",
    content: "버핏이 일부 팔긴 했지만 여전히 버크셔 최대 보유 종목이죠. 세금 효율화 목적이었을 뿐 신뢰는 그대로라고 봐요. AI 기능 개방 + 미중 관세 완화 조합 기대하고 홀딩 중이에요.",
    createdAt: T18 - m(35), likes: 31, comments: 0 },
  { id: 72, symbol: "AAPL", nickname: "익명_8814", holdingLabel: "15주 보유",
    content: "분석가들이 AAPL 목표가를 $300 이상으로 보던데... Apple Intelligence 본격화되면 아이폰 16→17 업그레이드 사이클이 매출에 직접 반영되는 거잖아요. 지금 $200대가 싸 보이기도 해요.",
    createdAt: T18 - h(1) - m(30), likes: 19, comments: 0 },

  // NVDA — Dimon AI 낙관론 ─────────────────────────────────────────────────
  { id: 73, symbol: "NVDA", nickname: "익명_2291", holdingLabel: "15주 보유",
    content: "Dimon이 \"50년 커리어 중 AI 가장 낙관적\"이라고 했어요. JP모건 CEO가 이 정도 발언하면 기관 자금 AI 섹터 로테이션이 더 강해지는 거 아닌가요? NVDA가 그 수혜의 정점이겠죠.",
    createdAt: T18 - m(5), likes: 48, comments: 2 },
  { id: 74, symbol: "NVDA", nickname: "익명_7712", holdingLabel: "40주 보유",
    content: "Ackman·Druckenmiller·Baron 다 AI 수혜주 집중하고 Dimon까지 낙관론 피력... 월가 레전드 컨센서스가 AI라는 거잖아요. NVDA 비중 더 늘려야 하나 진지하게 고민 중이에요.",
    createdAt: T18 - h(1) - m(10), likes: 35, comments: 0 },

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-15 — 트럼프-시진핑 회담 / NVDA 중국칩 허가 / 혼다 EV 철회 /
  //              테슬라 기가상하이 최고 생산 / Tesla Semi CA 보조금
  // ════════════════════════════════════════════════════════════════════════

  // NVDA
  { id: 48, symbol: "NVDA", nickname: "익명_7291", holdingLabel: "20주 보유",
    content: "트럼프가 NVDA $1M+ 개인 매수 공시 낸 거 봤어요? 중국 칩 허가 발표 직전에 산 거잖아요. 어떻게 이 타이밍에... 어쨌든 최강 호재 시그널인 건 맞음.",
    createdAt: T15 - m(1), likes: 41, comments: 3 },
  { id: 49, symbol: "NVDA", nickname: "익명_3804", holdingLabel: "10주 보유",
    content: "중국 $50B 시장이 열리면 이번 분기 가이던스 완전히 달라지는 거 아닌가요? 텐센트·알리바바·바이두 다 GPU 쓰면... 분기 매출 $5~8B 더 올라가는 거잖아요.",
    createdAt: T15 - m(8), likes: 33, comments: 0 },
  { id: 50, symbol: "NVDA", nickname: "익명_6612", holdingLabel: "5주 보유",
    content: "의회 반발 변수가 있다는 거 잊지 맙시다. 작년 H100 수출 제한 기억나죠? 너무 빨리 흥분하지 말고 허가가 실제로 집행되는지 지켜봐야 해요.",
    createdAt: T15 - m(22), likes: 14, comments: 0 },
  { id: 51, symbol: "NVDA", nickname: "익명_9187", holdingLabel: "55주 보유",
    content: "젠슨 황 에어포스원 탑승이 진짜 상징적인 거예요. 이 정도 정치적 커버가 있으면 의회 반발도 막기 어렵죠. NVDA가 미국 국가 전략 자산이 된 거나 다름없어요.",
    createdAt: T15 - m(35), likes: 52, comments: 3 },
  { id: 52, symbol: "NVDA", nickname: "익명_4403", holdingLabel: "8주 보유",
    content: "PER 40배라 추가 매수가 부담스럽긴 한데... 중국 $50B 반영되면 EPS가 완전히 다른 레벨이라 지금 가격이 오히려 싸 보이기도 해요. 분할 매수 중.",
    createdAt: T15 - h(1), likes: 19, comments: 0 },

  // TSLA
  { id: 53, symbol: "TSLA", nickname: "익명_2871", holdingLabel: "80주 보유",
    content: "혼다가 2040 완전 EV 목표 공식 철회했어요. 경쟁사들이 하나둘 포기하면 테슬라 독주 기간이 더 길어지는 거잖아요. 기술 격차 3~5년이 5~7년으로 벌어지는 구조.",
    createdAt: T15 - m(1), likes: 47, comments: 4 },
  { id: 54, symbol: "TSLA", nickname: "익명_5193", holdingLabel: "120주 보유",
    content: "기가상하이 4월 생산 3년 최고치라니... 중국 BYD 때문에 망할 것 같다고 했던 사람들 이제 뭐라고 해요? 볼륨 회복이 Q2 실적에 바로 반영될 거예요.",
    createdAt: T15 - m(10), likes: 38, comments: 0 },
  { id: 55, symbol: "TSLA", nickname: "익명_7734", holdingLabel: "30주 보유",
    content: "캘리포니아 Tesla Semi $10억 보조금... 테슬라가 B2B 물류 시장까지 노리는 거네요. B2C EV만 보고 있었는데 완전히 다른 TAM이 열리는 느낌이에요.",
    createdAt: T15 - m(25), likes: 29, comments: 3 },
  { id: 56, symbol: "TSLA", nickname: "익명_1059", holdingLabel: "15주 보유",
    content: "미중 협상 타결되면 중국 FSD 영업 재개될 수 있다고요? 데이터 규제 때문에 막혀있던 건데 이게 풀리면 구독 매출이 어마어마해질 텐데. 기대해도 되는 건가요?",
    createdAt: T15 - m(40), likes: 23, comments: 0 },
  { id: 57, symbol: "TSLA", nickname: "익명_8823", holdingLabel: "3주 보유",
    content: "Ron Baron $2500 목표 처음엔 웃겼는데... FSD 구독 + 로보택시 + 에너지 + 옵티머스 다 더하면 불가능한 숫자도 아닌 것 같기도 해요. 10년이라는 기간이 변수지만.",
    createdAt: T15 - h(2), likes: 18, comments: 0 },

  // AAPL
  { id: 58, symbol: "AAPL", nickname: "익명_6290", holdingLabel: "100주 보유",
    content: "트럼프-시진핑 회담 후 애플 AI 기능 중국 개방 협의된다는 거 봤어요? 애플 인텔리전스 중국에서 되면 아이폰 업그레이드 사이클이 완전히 달라지는 거잖아요.",
    createdAt: T15 - m(1), likes: 34, comments: 2 },
  { id: 59, symbol: "AAPL", nickname: "익명_3471", holdingLabel: "45주 보유",
    content: "관세 145% 완화되면 아이폰 가격 경쟁력 회복되는 거잖아요. 화웨이한테 밀렸던 중국 점유율 다시 가져올 수 있을 것 같아요. 조심스럽게 추가 매수.",
    createdAt: T15 - m(15), likes: 22, comments: 0 },
  { id: 60, symbol: "AAPL", nickname: "익명_9004", holdingLabel: "250주 보유",
    content: "버핏이 팔긴 했는데 지금 상황 보면 너무 일찍 판 거 아닌가 싶어요. 미중 협상 수혜 + AI 기능 개방 + 중국 매출 회복 = 지금 사도 늦지 않은 것 같은 조합.",
    createdAt: T15 - m(50), likes: 29, comments: 0 },

  // META
  { id: 61, symbol: "META", nickname: "익명_5538", holdingLabel: "50주 보유",
    content: "ARK가 META를 '가장 오해받는 메가캡'이라고 한 거 완전 동의해요. AI 광고 ROI 2배 개선이라는 게 실제 수치면 광고주들이 META 안 쓸 이유가 없잖아요.",
    createdAt: T15 - m(1), likes: 36, comments: 3 },
  { id: 62, symbol: "META", nickname: "익명_1182", holdingLabel: "20주 보유",
    content: "쓰레드 MAU 계속 올라오는데 광고 붙으면 추가 수익원이 생기는 거잖아요. 러시아·이란 퇴출 손실 걱정하는 사람들 있는데 그 시장 없어도 성장하고 있어요.",
    createdAt: T15 - m(30), likes: 21, comments: 0 },

  // ════════════════════════════════════════════════════════════════════════
  // 기존 게시글
  // ════════════════════════════════════════════════════════════════════════

  { id: 1,  symbol: "NVDA", nickname: "익명_7829", holdingLabel: "50주 보유",
    content: "블랙웰 GPU 수요가 예상보다 훨씬 강하게 나오고 있어요. 데이터센터 투자는 아직 초입이라고 봅니다. 장기 홀딩 유지합니다.",
    createdAt: T14 - m(5), likes: 24, comments: 3 },
  { id: 2,  symbol: "NVDA", nickname: "익명_3341", holdingLabel: "10주 보유",
    content: "고점 대비 많이 올라와서 추가 매수는 좀 조심스럽네요. 중국 AI칩 허가 소식이 호재긴 한데 의회 반발 변수도 봐야 할 것 같아요.",
    createdAt: T14 - m(12), likes: 11, comments: 0 },
  { id: 3,  symbol: "NVDA", nickname: "익명_9201", holdingLabel: "5주 보유",
    content: "젠슨 황이 트럼프 베이징 방문에 에어포스원 탑승했다는 것 자체가 정말 큰 의미. $50B 중국 시장 개방되면 실적 업사이드 엄청날 듯.",
    createdAt: T14 - m(45), likes: 37, comments: 4 },
  { id: 32, symbol: "NVDA", nickname: "익명_4429", holdingLabel: "3주 보유",
    content: "이미 PER 40배 넘는데 추가 매수하는 게 맞나요? 고점 잡는 거 아닐까 걱정이에요.",
    createdAt: T14 - m(8), likes: 9, comments: 0 },
  { id: 33, symbol: "NVDA", nickname: "익명_8803", holdingLabel: "25주 보유",
    content: "트럼프-시진핑 무역 협상 타결되면 H20 칩 수출 재개 가능성 있어요. 그게 단기 호재로 작용할 것 같아요.",
    createdAt: T14 - m(20), likes: 14, comments: 0 },

  { id: 4,  symbol: "TSLA", nickname: "익명_9917", holdingLabel: "20주 보유",
    content: "FSD 구독 모델이 궤도에 오르면 수익 구조 완전히 달라질 텐데. 단기는 힘들어 보여도 2~3년 뷰로 가져가는 중.",
    createdAt: T14 - h(2), likes: 29, comments: 3 },
  { id: 5,  symbol: "TSLA", nickname: "익명_4482", holdingLabel: "100주 보유",
    content: "기가상하이 4월 생산 3년 최고치라니 진짜 기대 이상. BYD 경쟁 걱정 많이 했는데 오히려 볼륨 회복 중이라 홀딩 유지합니다.",
    createdAt: T14 - h(4), likes: 43, comments: 2 },
  { id: 34, symbol: "TSLA", nickname: "익명_1193", holdingLabel: "5주 보유",
    content: "일론 머스크가 DOGE에 집중하면서 테슬라 관리가 소홀해진 거 아닌지 걱정돼요. CEO 집중도가 주가에 영향 미칠 것 같아요.",
    createdAt: T14 - m(15), likes: 12, comments: 0 },
  { id: 35, symbol: "TSLA", nickname: "익명_5578", holdingLabel: "150주 보유",
    content: "Cybercab 출시 타임라인이 명확해지면 주가 재평가 받을 것 같아요. 로보택시 TAM이 워낙 커서요.",
    createdAt: T14 - h(1), likes: 22, comments: 0 },

  { id: 6,  symbol: "AAPL", nickname: "익명_5512", holdingLabel: "30주 보유",
    content: "아이폰 17 AI 기능이 실제로 얼마나 쓸만한지가 핵심인 것 같아요. 중국 회복세랑 같이 봐야 할 듯.",
    createdAt: T14 - m(23), likes: 17, comments: 0 },
  { id: 7,  symbol: "AAPL", nickname: "익명_1104", holdingLabel: "200주 보유",
    content: "버핏이 팔긴 했어도 여전히 최대 보유 종목이죠. 배당 꾸준히 늘리고 바이백도 하고. 이 정도면 그냥 믿고 가는 주식.",
    createdAt: T14 - h(1), likes: 38, comments: 0 },
  { id: 36, symbol: "AAPL", nickname: "익명_7723", holdingLabel: "60주 보유",
    content: "애플 인텔리전스가 기대보다 늦게 나온다는 비판 있지만, 품질로 승부하는 회사가 애플이잖아요. 출시되면 업그레이드 사이클 기대해요.",
    createdAt: T14 - m(40), likes: 15, comments: 0 },

  { id: 8,  symbol: "PLTR", nickname: "익명_2278", holdingLabel: "300주 보유",
    content: "AIP 플랫폼 B2B 계약이 계속 늘고 있어요. 정부 계약에서 민간으로 넘어가는 게 진짜 포인트입니다.",
    createdAt: T14 - h(3), likes: 45, comments: 3 },
  { id: 9,  symbol: "PLTR", nickname: "익명_6614", holdingLabel: "80주 보유",
    content: "DOGE 정부 효율화 프로젝트 수혜로 연방 계약 규모 더 커질 것 같아요. S&P500 편입 이후 기관 수요도 계속 들어오는 중.",
    createdAt: T14 - h(6), likes: 52, comments: 3 },
  { id: 38, symbol: "PLTR", nickname: "익명_9981", holdingLabel: "500주 보유",
    content: "NATO 사이버전 계약 수주 소식 들으셨나요? 유럽 정부 계약이 빠르게 늘어나고 있어서 미국 외 매출도 기대돼요.",
    createdAt: T14 - h(3), likes: 31, comments: 0 },

  { id: 10, symbol: "MSFT", nickname: "익명_6631", holdingLabel: "15주 보유",
    content: "코파일럿 기업 침투율이 생각보다 빠르게 올라오고 있음. 클라우드 + AI 조합이 진짜 무서운 회사.",
    createdAt: T14 - h(4), likes: 31, comments: 0 },
  { id: 11, symbol: "MSFT", nickname: "익명_8823", holdingLabel: "40주 보유",
    content: "Azure AI 매출 성장률이 AWS 추월할 수 있다는 전망도 나오던데 어떻게 생각하세요? OpenAI 독점 협력이 진짜 큰 해자 같아요.",
    createdAt: T14 - d(1), likes: 28, comments: 0 },
  { id: 46, symbol: "MSFT", nickname: "익명_3344", holdingLabel: "8주 보유",
    content: "Phi-4 소형 AI 모델이 GPT-4 수준 성능을 로컬에서 구현했어요. 엣지 AI 시장까지 선점하는 중이라 정말 무서운 회사.",
    createdAt: T14 - h(3), likes: 26, comments: 0 },

  { id: 12, symbol: "META", nickname: "익명_3307", holdingLabel: "25주 보유",
    content: "AI 광고 정밀도 올라가면서 광고주 ROI 2배 개선됐다고. 이게 매출로 직결되는 구조라서 2026년 실적 기대감이 높아요.",
    createdAt: T14 - h(1), likes: 33, comments: 0 },
  { id: 13, symbol: "META", nickname: "익명_7741", holdingLabel: "10주 보유",
    content: "Ray-Ban 스마트글래스에 카메라 달고 AI 연동하면 진짜 웨어러블 혁명 아닌가요. Apple Vision Pro보다 실용적이라고 생각해요.",
    createdAt: T14 - h(3), likes: 19, comments: 0 },
  { id: 37, symbol: "META", nickname: "익명_2234", holdingLabel: "35주 보유",
    content: "쓰레드가 트위터 대안으로 자리잡고 있어요. MAU 계속 늘어나면 광고 매출 추가 상승 여력 있어요.",
    createdAt: T14 - h(2), likes: 18, comments: 0 },

  { id: 14, symbol: "AMZN", nickname: "익명_5589", holdingLabel: "8주 보유",
    content: "AWS가 AI 인프라 수요 폭증으로 분기마다 기록 갱신 중. 광고 사업도 구글·메타와 3강 체제로 완전히 자리잡았어요.",
    createdAt: T14 - h(2), likes: 21, comments: 0 },
  { id: 15, symbol: "AMZN", nickname: "익명_4419", holdingLabel: "12주 보유",
    content: "물류 자동화 로봇 도입으로 운영비 계속 줄어드는 구조. 영업이익률이 빠르게 올라오고 있어서 장기 관점에서 계속 매력적이에요.",
    createdAt: T14 - h(5), likes: 16, comments: 0 },
  { id: 40, symbol: "AMZN", nickname: "익명_3388", holdingLabel: "18주 보유",
    content: "아마존 의료 서비스 확장이 진짜 숨겨진 성장 동력이에요. Amazon Pharmacy + One Medical 조합이 장기적으로 크게 될 것 같아요.",
    createdAt: T14 - h(1), likes: 19, comments: 0 },

  { id: 16, symbol: "GOOGL", nickname: "익명_2246", holdingLabel: "20주 보유",
    content: "Gemini 2.5 Pro가 벤치마크에서 GPT-4o 넘어섰다는 소식. 구글이 AI 경쟁에서 뒤처질 거라는 걱정 이제 많이 줄었어요.",
    createdAt: T14 - h(1), likes: 27, comments: 0 },
  { id: 17, symbol: "GOOGL", nickname: "익명_8812", holdingLabel: "50주 보유",
    content: "유튜브 광고 수익이 Shorts 덕분에 계속 성장 중. GCP도 AI 인프라 수요에 시장점유율 올라오는 중이라 3박자 모두 좋아요.",
    createdAt: T14 - h(4), likes: 34, comments: 2 },
  { id: 41, symbol: "GOOGL", nickname: "익명_5574", holdingLabel: "15주 보유",
    content: "AI Overview가 검색 광고를 잠식할 거라는 걱정 있었는데, 실제로는 검색 시간이 늘어나서 광고 수익이 오히려 증가했다고요.",
    createdAt: T14 - h(6), likes: 24, comments: 0 },

  { id: 18, symbol: "AMD", nickname: "익명_3312", holdingLabel: "60주 보유",
    content: "MI300X가 H100 대비 가성비 좋다는 평가 많아지면서 마이크로소프트·메타가 대량 구매했다는 얘기 들리더라고요. NVDA 독주 막을 수 있을 듯.",
    createdAt: T14 - m(30), likes: 29, comments: 0 },
  { id: 19, symbol: "AMD", nickname: "익명_7763", holdingLabel: "30주 보유",
    content: "EPYC 서버 CPU도 인텔 시장 점유율 계속 뺏어오고 있어요. AI 반도체 + 서버 CPU 두 마리 토끼 다 잡고 있는 회사.",
    createdAt: T14 - h(3), likes: 18, comments: 0 },
  { id: 39, symbol: "AMD", nickname: "익명_6641", holdingLabel: "45주 보유",
    content: "MI350 발표 나오면 NVDA 대비 경쟁력 더 강해질 것 같아요. 기다리는 중이에요.",
    createdAt: T14 - h(5), likes: 13, comments: 0 },

  { id: 20, symbol: "AVGO", nickname: "익명_9934", holdingLabel: "15주 보유",
    content: "구글·애플·메타 맞춤 AI 칩(ASIC) 설계 독점 수혜가 진짜 핵심이에요. GPU 대신 ASIC으로 가는 하이퍼스케일러 트렌드에서 가장 크게 먹는 회사.",
    createdAt: T14 - h(2), likes: 41, comments: 0 },
  { id: 21, symbol: "AVGO", nickname: "익명_1127", holdingLabel: "7주 보유",
    content: "VMware 통합 완료 후 기업용 소프트웨어 수익도 탄탄해졌어요. AI 반도체 + 네트워킹 + 엔터프라이즈 소프트웨어 트리플 수혜.",
    createdAt: T14 - d(1), likes: 22, comments: 0 },

  { id: 22, symbol: "COIN", nickname: "익명_4481", holdingLabel: "40주 보유",
    content: "CLARITY Act 통과되면 규제 불확실성 사라지면서 기관 자금이 대규모 유입될 것 같아요. 미국 1위 거래소로 최대 수혜.",
    createdAt: T14 - h(1), likes: 36, comments: 3 },
  { id: 23, symbol: "COIN", nickname: "익명_6603", holdingLabel: "20주 보유",
    content: "트럼프가 코인 매수 선언하고 CLARITY Act도 진행 중이니 규제 환경이 완전히 바뀌고 있어요. ETF 자금 유입도 계속 늘어나는 중.",
    createdAt: T14 - h(3), likes: 23, comments: 0 },
  { id: 42, symbol: "COIN", nickname: "익명_7712", holdingLabel: "55주 보유",
    content: "비트코인 현물 ETF 자금 유입이 사상 최대치 경신 중이에요. Coinbase가 ETF 수탁 기관이라 수수료 수익 꾸준히 늘어날 것 같아요.",
    createdAt: T14 - h(4), likes: 28, comments: 0 },

  { id: 24, symbol: "SMCI", nickname: "익명_8871", holdingLabel: "25주 보유",
    content: "AI 서버 랙 솔루션에서 NVIDIA 파트너로 독보적인 위치. 회계 이슈 해결 후 주가 정상화 중이라 지금이 기회라고 보는데 리스크도 여전히 있긴 하죠.",
    createdAt: T14 - m(45), likes: 19, comments: 0 },
  { id: 25, symbol: "SMCI", nickname: "익명_3302", holdingLabel: "10주 보유",
    content: "GB200 NVL72 랙 주요 조립업체라는 게 엄청난 포지션이에요. 데이터센터 AI 클러스터 수요 폭증하면 직접 수혜받는 구조.",
    createdAt: T14 - h(6), likes: 14, comments: 0 },
  { id: 47, symbol: "SMCI", nickname: "익명_1176", holdingLabel: "15주 보유",
    content: "회계 감사 리스크가 완전히 해소된 건지 아직 불확실해요. 좋은 회사긴 한데 그 부분이 계속 발목 잡을 것 같아요.",
    createdAt: T14 - h(1), likes: 11, comments: 0 },

  { id: 26, symbol: "RKLB", nickname: "익명_5541", holdingLabel: "200주 보유",
    content: "Electron 발사 성공률이 엄청나게 높아요. Neutron 중형 로켓 개발 완료되면 SpaceX 소형-중형 시장 다 커버하는 회사가 됩니다.",
    createdAt: T14 - h(2), likes: 48, comments: 4 },
  { id: 27, symbol: "RKLB", nickname: "익명_7712", holdingLabel: "500주 보유",
    content: "Space Systems 부품 사업 매출이 생각보다 탄탄해요. 발사 사업 + 위성 부품 + Neutron = 3단 성장 스토리. SpaceX 상장해도 RKLB은 소형 위성 발사 독점 포지션이라 영역이 다른 독립 회사예요.",
    createdAt: T14 - d(1), likes: 57, comments: 2 },
  { id: 43, symbol: "RKLB", nickname: "익명_4419", holdingLabel: "100주 보유",
    content: "국방부 계약이 계속 들어오고 있어요. 국가 안보 분야에서 신뢰받는 위성 발사 업체로 자리잡은 것 같아요.",
    createdAt: T14 - h(7), likes: 33, comments: 0 },

  { id: 28, symbol: "IONQ", nickname: "익명_2234", holdingLabel: "150주 보유",
    content: "이온트랩 방식이 안정성 면에서 압도적이라는 게 증명되고 있어요. AWS·Azure·GCP 모두 IonQ 양자컴퓨터 클라우드 접근 제공 중.",
    createdAt: T14 - h(1), likes: 31, comments: 0 },
  { id: 29, symbol: "IONQ", nickname: "익명_9908", holdingLabel: "300주 보유",
    content: "미국 정부 양자컴퓨터 계약 늘어나는 거 보면 국방·안보 분야 수요가 진짜 핵심인 것 같아요. 아직 수익화 초기지만 기술 해자는 인정.",
    createdAt: T14 - h(5), likes: 24, comments: 0 },
  { id: 44, symbol: "IONQ", nickname: "익명_6631", holdingLabel: "80주 보유",
    content: "양자컴퓨터가 실제 상용화되려면 아직 수년 더 필요하지만, 지금 선점하는 게 맞다고 생각해요. 고위험 고수익 섹터.",
    createdAt: T14 - h(2), likes: 17, comments: 0 },

  { id: 30, symbol: "CEG", nickname: "익명_6678", holdingLabel: "35주 보유",
    content: "AI 데이터센터 전력 문제가 심각해지면서 원자력이 유일한 해결책으로 부상 중이에요. Microsoft·Google이 컨스텔레이션과 장기 전력 계약 체결한 게 다 이유가 있죠.",
    createdAt: T14 - h(3), likes: 38, comments: 0 },
  { id: 31, symbol: "CEG", nickname: "익명_4456", holdingLabel: "20주 보유",
    content: "쓰리마일 아일랜드 재가동이 상징적이에요. AI발 전력 수요 급증 + 탈탄소 압박 = 원자력 르네상스. CEG가 미국 최대 원전 운영사.",
    createdAt: T14 - d(1), likes: 29, comments: 0 },
  { id: 45, symbol: "CEG", nickname: "익명_9918", holdingLabel: "10주 보유",
    content: "바이든이 아니라 트럼프도 원자력 지지해요. 초당적 지지 받는 에너지 섹터라 정치 리스크가 낮아요.",
    createdAt: T14 - h(8), likes: 21, comments: 0 },
];

export const MOCK_COMMENTS: Record<number, Comment[]> = {
  // ── 2026-07-07 신규 ──────────────────────────────────────────────────────
  443: [
    { id: 1, nickname: "익명_4411", holdingLabel: "800주 보유", content: "5시간 무개입은 레벨 5 임박 신호예요. HW3 배포까지 완료되면 테슬라 차량 400만대가 전부 FSD v14 Lite 수준이 되는 거잖아요. 구독 전환 폭발적으로 늘어날 거예요.", createdAt: T7JL + 25*60_000, likes: 412 },
    { id: 2, nickname: "익명_7782", holdingLabel: "관심종목", content: "라스베가스 구간이 사막 직선 고속도로라 쉽다고 할 수 있겠지만 LA 구간 도심 완료한 게 진짜 어려운 거예요. 도심 완주 영상이 설득력 있어요.", createdAt: T7JL + 50*60_000, likes: 298 },
    { id: 3, nickname: "익명_3391", holdingLabel: "500주 보유", content: "v14 Lite가 이 수준이면 v14 Full, v15 타임라인이 앞당겨지는 거예요. 7월 22일 실적에서 FSD 구독 성장률 언급해주면 주가 크게 뛸 것 같아요.", createdAt: T7JL + 1*3600_000, likes: 367 },
  ],
  444: [
    { id: 1, nickname: "익명_6623", holdingLabel: "250주 보유", content: "합류·터널·교차로 전부 자연스러웠으면 사실상 완성된 거죠. 이제 스케일이 관건이에요. 도시별 인허가 받는 속도가 롤아웃 제한 요인이 될 것 같아요.", createdAt: T7JL + 45*60_000, likes: 234 },
    { id: 2, nickname: "익명_1156", holdingLabel: "관심종목", content: "구독 $99/월 기준 차 한 대당 연 $1,200 수익이에요. 400만 대 활성화되면 연 $48B 구독 매출이에요. 이게 테슬라 차량 판매 매출이랑 비슷한 수준이에요.", createdAt: T7JL + 1*3600_000 + 15*60_000, likes: 456 },
  ],
  445: [
    { id: 1, nickname: "익명_9934", holdingLabel: "720주 보유", content: "지오펜스 이탈 0건이 핵심이에요. 안전 기록이 깨끗해야 규제 기관이 다음 도시 승인해주거든요. 오스틴 데이터로 무장해서 뉴올리언스·마이애미 인허가 빠르게 받을 수 있을 거예요.", createdAt: T7JL + 40*60_000, likes: 356 },
    { id: 2, nickname: "익명_5511", holdingLabel: "관심종목", content: "상업지구+공항 집중 커버가 딱 타겟팅 맞아요. 비즈니스 출장객·공항 이동 수요는 요금 탄력성 낮고 반복 이용률 높으니까 단위 수익성 최고예요.", createdAt: T7JL + 1*3600_000 + 5*60_000, likes: 289 },
  ],
  446: [
    { id: 1, nickname: "익명_2278", holdingLabel: "1100주 보유", content: "$0.25/마일이 가능한 건 전력비+감가상각만 있고 기사 없기 때문이에요. 웨이모는 원격 모니터링 인력 비용도 들어가서 단가 내리는 데 한계가 있어요. 구조적 원가 격차예요.", createdAt: T7JL + 1*3600_000, likes: 567 },
    { id: 2, nickname: "익명_8854", holdingLabel: "300주 보유", content: "20만 마일 수명 계산이 보수적이에요. 배터리 교체하면 프레임은 더 오래 쓰니까요. 택시 ROI 5배면 플릿 사업자들이 Cybercab으로 전환 안 할 이유가 없어요.", createdAt: T7JL + 1*3600_000 + 30*60_000, likes: 423 },
    { id: 3, nickname: "익명_4467", holdingLabel: "관심종목", content: "웨이모 $4/마일은 현재 가격이지 경쟁 가격 아니에요. Cybercab 본격 출시되면 웨이모도 가격 내릴 텐데 원가 구조상 저가 경쟁하면 웨이모가 지는 거예요.", createdAt: T7JL + 2*3600_000, likes: 334 },
  ],
  447: [
    { id: 1, nickname: "익명_7731", holdingLabel: "600주 보유", content: "Morgan Stanley $465 목표가가 로보택시 수익 반영 전 수치라는 게 중요해요. 1,500대 운영 수익이 추가되면 목표가 상향될 여지 충분히 있어요.", createdAt: T7JL + 1*3600_000 + 20*60_000, likes: 312 },
    { id: 2, nickname: "익명_3384", holdingLabel: "200주 보유", content: "연말 1,500대는 Cybercab 생산 속도 달려있는데 기가텍사스 풀가동 소식 보면 가능한 숫자예요. 실제로 달성하면 주가 모멘텀 강해질 거예요.", createdAt: T7JL + 1*3600_000 + 45*60_000, likes: 267 },
  ],
  448: [
    { id: 1, nickname: "익명_4448", holdingLabel: "350주 보유", content: "NASDAQ 100 편입이면 단순 시총 증가가 아니라 글로벌 패시브 자금이 자동으로 들어오는 거예요. 전 세계 ETF가 QQQ 추종하는데 편입되면 수십조 원 규모 강제 매수 발생해요.", createdAt: T7JL + 35*60_000, likes: 523 },
    { id: 2, nickname: "익명_8871", holdingLabel: "100주 보유", content: "비상장이라 정보 접근성이 낮았는데 NASDAQ 100 편입으로 분석 커버리지도 늘어날 거예요. 기관 투자 유입 구조가 완전히 달라지는 이벤트예요.", createdAt: T7JL + 55*60_000, likes: 412 },
    { id: 3, nickname: "익명_2234", holdingLabel: "관심종목", content: "Starlink, Falcon 9 재사용, Starship 상업화까지 모두 진행 중인 회사가 NASDAQ에 있는 거잖아요. TSLA 초기보다 기회 더 클 수 있어요.", createdAt: T7JL + 1*3600_000 + 15*60_000, likes: 678 },
  ],
  449: [
    { id: 1, nickname: "익명_6618", holdingLabel: "80주 보유", content: "AI 해고가 맞는 방향이에요. 반복 작업 AI로 자동화 → 비용 절감 → AI 인프라 재투자 → 더 강한 제품. 이 사이클이 Azure·Copilot에서 이미 증명되고 있어요.", createdAt: T7JL + 55*60_000, likes: 198 },
    { id: 2, nickname: "익명_3391", holdingLabel: "50주 보유", content: "단기 주가 약하면 매수 기회예요. MSFT는 AI 전환 가장 앞선 빅테크 중 하나인데 일시적 노이즈에 빠지면 좋은 진입 포인트 나와요.", createdAt: T7JL + 1*3600_000 + 10*60_000, likes: 156 },
  ],
  450: [
    { id: 1, nickname: "익명_5519", holdingLabel: "400주 보유", content: "Tepper는 단순 성장주 매수가 아니라 매크로 사이클 맞는 시점에 집중 베팅하는 사람이에요. Q1에 TSLA 신규 진입이면 로보택시 상용화 타이밍 맞다고 판단한 거예요.", createdAt: T7JL + 1*3600_000 + 5*60_000, likes: 289 },
    { id: 2, nickname: "익명_7744", holdingLabel: "관심종목", content: "기관들이 Q1 13F 보면 TSLA 신규 진입·증량이 많이 보여요. 개인 투자자 진입 전에 기관이 먼저 쌓는 패턴이에요. 시그널이에요.", createdAt: T7JL + 1*3600_000 + 30*60_000, likes: 234 },
  ],
  451: [
    { id: 1, nickname: "익명_2267", holdingLabel: "750주 보유", content: "베이징 포럼에서 공식 발표라는 게 중국 정부도 암묵적으로 지지한다는 신호예요. 기가 상하이가 EV 량프업 최단 기록인데 Optimus도 그 노하우 그대로 쓰면 진짜 빠를 거예요.", createdAt: T7JL + 1*3600_000 + 25*60_000, likes: 423 },
    { id: 2, nickname: "익명_8823", holdingLabel: "300주 보유", content: "중국 공장이면 아시아 전체 공급망 접근성이 완전히 달라져요. 일본·한국·동남아 B2B 고객 타깃으로 Optimus 직접 공급하는 게 현실화되는 거예요.", createdAt: T7JL + 2*3600_000 + 10*60_000, likes: 356 },
    { id: 3, nickname: "익명_1138", holdingLabel: "관심종목", content: "EV는 중국 경쟁 때문에 마진 압박 받는데 Optimus는 초기 시장이라 마진 구조 자체가 달라요. 테슬라 밸류에이션 EV 기준 아닌 로보틱스 기준으로 볼 때가 왔어요.", createdAt: T7JL + 2*3600_000 + 45*60_000, likes: 489 },
  ],
  452: [
    { id: 1, nickname: "익명_9956", holdingLabel: "200주 보유", content: "UBS 업그레이드 타이밍이 HBM 사이클 초입이라는 거예요. SK하이닉스 61% 마진 발표 후에 MU 선제 업그레이드면 MU 다음 실적 미리 보는 거예요.", createdAt: T7JL + 1*3600_000 + 15*60_000, likes: 234 },
    { id: 2, nickname: "익명_4423", holdingLabel: "150주 보유", content: "Burry 공매도 타이밍이 HBM 사이클 모른 거예요. 일반 DRAM만 보면 공매도 맞는데 HBM3e 마진 보면 완전히 다른 이야기예요.", createdAt: T7JL + 1*3600_000 + 40*60_000, likes: 178 },
  ],
  453: [
    { id: 1, nickname: "익명_7712", holdingLabel: "180주 보유", content: "영국 2위가 FSD 유럽 승인도 안 된 상태에서 나온 거잖아요. FSD 정식 런칭되면 판매 더 올라가는 거예요. 리프레시 Model Y 유럽 반응 아주 좋아요.", createdAt: T7JL + 1*3600_000 + 45*60_000, likes: 189 },
  ],
  454: [
    { id: 1, nickname: "익명_3348", holdingLabel: "420주 보유", content: "Cosmic Silver Diamond 실물 사진 봤는데 진짜 고급스러워요. 기존 실버보다 훨씬 고급스러운 느낌이에요. 프리미엄 가격대 유지하면서 ASP 올리는 전략 맞아요.", createdAt: T7JL + 1*3600_000 + 55*60_000, likes: 234 },
  ],
  455: [
    { id: 1, nickname: "익명_8867", holdingLabel: "200주 보유", content: "AI 시대 살아남는 기업 선별 기준이 바뀌고 있어요. 단순 SW 서비스는 AI 에이전트가 대체하는데 물리 세계와 연결된 기업은 못 대체해요. TSLA가 딱 그 포지션이에요.", createdAt: T7JL + 2*3600_000 + 15*60_000, likes: 312 },
    { id: 2, nickname: "익명_5531", holdingLabel: "관심종목", content: "MSTR·BKNG 매도라는 게 흥미로워요. Morgan Stanley가 이미 AI 대체 속도 생각보다 빠르다고 판단한 거잖아요. 포트폴리오 재편이 시장 전반으로 확산될 신호일 수 있어요.", createdAt: T7JL + 2*3600_000 + 35*60_000, likes: 267 },
  ],

  // ── 2026-07-06 신규 ──────────────────────────────────────────────────────
  435: [
    { id: 1, nickname: "익명_4812", holdingLabel: "600주 보유", content: "Cybercab 생산 테스트 진입이 제일 임팩트 있어요. 아직 주가에 덜 반영된 것 같은데 대량 생산 발표 나오면 완전히 다른 레벨이에요.", createdAt: T6JL + 30*60_000, likes: 387 },
    { id: 2, nickname: "익명_7291", holdingLabel: "200주 보유", content: "100대 비지도는 시작이고 Q2 어닝에서 플릿 확장 계획 공개되면 숫자가 급격히 커질 거예요. 7/22가 중요한 날이에요.", createdAt: T6JL + 55*60_000, likes: 267 },
    { id: 3, nickname: "익명_3318", holdingLabel: "관심종목", content: "신도시 전부 비지도 직런칭이라는 게 핵심이에요. 감독 단계 건너뛴다는 건 FSD 안전성에 대한 자체 확신이잖아요. 규제 기관도 암묵적으로 동의한 거고.", createdAt: T6JL + 1*3600_000 + 20*60_000, likes: 198 },
  ],
  436: [
    { id: 1, nickname: "익명_8871", holdingLabel: "450주 보유", content: "FSD v14 HW3 배포가 진짜 게임체인저예요. 400만대에 무료 체험 기회 주는 건데 체험하면 구독 전환되는 사람 많을 거예요.", createdAt: T6JL + 1*3600_000, likes: 312 },
    { id: 2, nickname: "익명_5582", holdingLabel: "관심종목", content: "Lara Morley '쿨뉴스' 예고가 Cybercab 대량 생산 신호인 거면 진짜 큰 발표 임박한 거예요.", createdAt: T6JL + 1*3600_000 + 45*60_000, likes: 234 },
  ],
  437: [
    { id: 1, nickname: "익명_2247", holdingLabel: "150주 보유", content: "40nm으로 4.7배라는 건 설계 최적화가 얼마나 중요한지 보여주는 거예요. 중국이 수출 통제 환경에서 이 수준 낸다면 향후 제재 강화해도 자체 개발로 버틸 수 있다는 거고.", createdAt: T6JL + 40*60_000, likes: 156 },
    { id: 2, nickname: "익명_6634", holdingLabel: "NVDA 300주", content: "특화 태스크 제한이라는 게 중요해요. 범용 트레이닝은 못 따라오고 H100·B200 수요는 여전히 NVDA가 독점이에요. 단기 과반응이면 매수 기회.", createdAt: T6JL + 1*3600_000 + 10*60_000, likes: 189 },
  ],
  438: [
    { id: 1, nickname: "익명_9912", holdingLabel: "180주 보유", content: "SK하이닉스 61%면 MU 다음 실적에서 비슷한 숫자 나올 거예요. AI 메모리 마진 구조가 이렇게 다르다는 게 Burry 공매도 테제를 약화시켜요.", createdAt: T6JL + 1*3600_000 + 30*60_000, likes: 223 },
  ],
  439: [
    { id: 1, nickname: "익명_3319", holdingLabel: "120주 보유", content: "토큰당 비용이 AI 경쟁의 핵심이라는 명제에 동의해요. 구글이 TPU 자급하면서 마진 구조 자체가 달라지는 거예요. 2028 2배는 과하지 않은 전망이에요.", createdAt: T6JL + 1*3600_000 + 55*60_000, likes: 178 },
  ],
  440: [
    { id: 1, nickname: "익명_7748", holdingLabel: "400주 보유", content: "$576B→$939B면 1조 시대가 진짜 오는 거예요. 이 돈 다 AI 칩·메모리·전력으로 가는데 NVDA 주가 고점 논쟁이 이 숫자 보면 의미없어요.", createdAt: T6JL + 1*3600_000 + 40*60_000, likes: 289 },
    { id: 2, nickname: "익명_4429", holdingLabel: "100주 보유", content: "전력 인프라가 진짜 병목이에요. GPU 다 있어도 전기가 없으면 못 돌려요. 원전·유틸리티 주식이 더 오를 수 있어요.", createdAt: T6JL + 2*3600_000, likes: 201 },
  ],
  441: [
    { id: 1, nickname: "익명_5541", holdingLabel: "관심종목", content: "규제가 경쟁 해자가 된다는 게 재밌는 거예요. 테슬라는 추가 비용 0인데 기존 완성차들은 다 돈 써야 해요. EU 시장에서 테슬라 점유율 올라갈 모멘텀이에요.", createdAt: T6JL + 2*3600_000 + 20*60_000, likes: 134 },
  ],
  442: [
    { id: 1, nickname: "익명_8836", holdingLabel: "300주 보유", content: "DeSantis가 FSD 공개 지지하면 플로리다에서 정부 차량 교체 수요 직접 연결돼요. 텍사스 이어 플로리다까지 TSLA 친화적 정치 환경 되면 규제 승인 속도도 빨라지는 거고.", createdAt: T6JL + 2*3600_000 + 40*60_000, likes: 156 },
  ],

  // ── 2026-07-01 신규 ──────────────────────────────────────────────────────
  401: [
    { id: 1, nickname: "익명_6612", holdingLabel: "200주 보유", content: "중국 판매분이 얼마나 포함됐냐가 핵심이에요. 상하이 수출이 살아났으면 Q3도 기대해볼 만한데. BYD랑 직접 비교했을 때 ASP 유지했으면 진짜 서프라이즈예요.", createdAt: T1JL + 15*60_000, likes: 234 },
    { id: 2, nickname: "익명_3341", holdingLabel: "50주 보유", content: "컨센 상회인데 주가 반응 미지근하면 매수 기회인 거죠. 시장이 이미 기대치를 더 높게 잡은 게 아니라면요.", createdAt: T1JL + 20*60_000, likes: 156 },
    { id: 3, nickname: "익명_8854", holdingLabel: "관심종목", content: "480K면 연간 페이스 190만대예요. CyberCab 더해지면 200만대 달성 충분히 가능해요. 7월 실적 발표에서 연간 가이던스 상향이 나올 것 같아요.", createdAt: T1JL + 35*60_000, likes: 189 },
    { id: 4, nickname: "익명_7723", holdingLabel: "1000주 보유", content: "옵티머스 외판 시작되는 시점이 진짜 밸류에이션 점프 구간이에요. 그 전까지 납품 숫자로 판단하는 거고. 480K는 합격점.", createdAt: T1JL + 50*60_000, likes: 312 },
  ],
  402: [
    { id: 1, nickname: "익명_4419", holdingLabel: "300주 보유", content: "FSD 비감독 전국 확대 타이밍이 Q2 납품 발표랑 같이 나온 건 완전 전략적이에요. 모멘텀을 겹쳐 쌓는 거잖아요.", createdAt: T1JL + 30*60_000, likes: 167 },
    { id: 2, nickname: "익명_2256", holdingLabel: "80주 보유", content: "$300 목표가 전 더 담을지 말지 고민인데 이 뉴스들 보면 $320도 가능하겠다 싶어요.", createdAt: T1JL + 40*60_000, likes: 134 },
    { id: 3, nickname: "익명_9981", holdingLabel: "관심종목", content: "CyberCab 오스틴 영상이 진짜 압도적이었어요. 비 오는 야간에 개입 제로면 이미 상업 운영 가능한 수준이잖아요.", createdAt: T1JL + 55*60_000, likes: 201 },
  ],
  403: [
    { id: 1, nickname: "익명_5582", holdingLabel: "500주 보유", content: "중국 점유율 유지가 핵심이에요. BYD가 공격적으로 가격 내리는데 테슬라가 ASP 지켰으면 대단한 거예요.", createdAt: T1JL + 50*60_000, likes: 145 },
    { id: 2, nickname: "익명_3317", holdingLabel: "200주 보유", content: "490K 기대했다가 480K라 실망한 사람들이 팔면 그게 매수 기회죠.", createdAt: T1JL + 1*3600_000, likes: 178 },
  ],
  404: [
    { id: 1, nickname: "익명_6671", holdingLabel: "100주 보유", content: "v46 → v47 → v48 발전 속도가 GPT-3→4→5보다 빠를 것 같아요. AI 학습 데이터는 도로 주행이니까 매 버전 기하급수적으로 나아지죠.", createdAt: T1JL + 1*3600_000 + 10*60_000, likes: 223 },
    { id: 2, nickname: "익명_8832", holdingLabel: "관심종목", content: "비 오는 야간 합류 구간이 FSD 마지막 난관이었는데 그게 해결됐으면 진짜 마지막 단계예요.", createdAt: T1JL + 1*3600_000 + 25*60_000, likes: 189 },
  ],
  405: [
    { id: 1, nickname: "익명_4413", holdingLabel: "200주 보유", content: "전자 부품 조립 가능해졌으면 애플·삼성 스마트폰 조립 라인에도 투입 가능한 거예요. B2B 고객층이 자동차 넘어 전자제품까지 확장돼요.", createdAt: T1JL + 1*3600_000 + 20*60_000, likes: 334 },
    { id: 2, nickname: "익명_7723", holdingLabel: "500주 보유", content: "가정용은 얼마나 걸릴까요? 청소·설거지·빨래 이런 거 까지 하려면 아직 멀었겠지만 방향은 맞아요.", createdAt: T1JL + 1*3600_000 + 35*60_000, likes: 267 },
    { id: 3, nickname: "익명_2291", holdingLabel: "관심종목", content: "+180% 정밀도 개선이 반년 만에 가능한 게 놀라운 거예요. 이 속도면 내년 이맘때 어떤 수준이 될지.", createdAt: T1JL + 1*3600_000 + 50*60_000, likes: 198 },
  ],
  406: [
    { id: 1, nickname: "익명_5529", holdingLabel: "150주 보유", content: "외판 가격 $20K~$25K면 이익 내기 어렵지 않을까요? 첫 해는 마케팅 투자로 보고 2년차부터 수익화하는 구조일 것 같아요.", createdAt: T1JL + 2*3600_000 + 15*60_000, likes: 145 },
    { id: 2, nickname: "익명_8847", holdingLabel: "300주 보유", content: "1만 대 달성 공식 발표 나오면 그게 주가 촉매예요. 아직 목표 달성 전이니까 긴 호흡으로 보는 게 맞아요.", createdAt: T1JL + 2*3600_000 + 30*60_000, likes: 189 },
  ],
  407: [
    { id: 1, nickname: "익명_3349", holdingLabel: "100주 보유", content: "Iridium이 군사 위성통신 분야에서 40년 넘게 입증된 회사예요. SpaceX가 기술력 + 브랜드 신뢰도까지 사는 거예요. $8B이 비싸 보이지 않아요.", createdAt: T1JL + 40*60_000, likes: 445 },
    { id: 2, nickname: "익명_6618", holdingLabel: "관심종목", content: "B2B 구독 매출 $850M이 반복 수익이라는 게 핵심이에요. 발사 서비스는 수주 기반이라 변동성 있는데 구독은 안정적이잖아요. 밸류에이션 다시 계산해야 할 것 같아요.", createdAt: T1JL + 55*60_000, likes: 378 },
    { id: 3, nickname: "익명_1124", holdingLabel: "500주 보유", content: "Starlink + Iridium 조합이면 극지방 연구소, 선박, 잠수함까지 커버해요. 이미 없는 곳이 없는 통신 인프라예요. 이게 국방부랑 장기 계약 맺는 기반이 되는 거죠.", createdAt: T1JL + 1*3600_000 + 10*60_000, likes: 312 },
    { id: 4, nickname: "익명_8843", holdingLabel: "200주 보유", content: "수직통합 완성이라는 게 프리미엄 멀티플 받는 이유가 돼요. TSLA처럼 스페이스X도 이제 '그냥 우주 기업'이 아니라 '우주 OS' 기업이 되는 거예요.", createdAt: T1JL + 1*3600_000 + 30*60_000, likes: 289 },
  ],
  408: [
    { id: 1, nickname: "익명_5527", holdingLabel: "300주 보유", content: "극지방 커버리지가 항공사·해운사한테 얼마나 중요한지 모르는 분들 많아요. 북극 항로 이용하는 화물선들 통신이 다 Iridium이에요. 이게 SpaceX 손에 들어온 거예요.", createdAt: T1JL + 1*3600_000, likes: 356 },
    { id: 2, nickname: "익명_7741", holdingLabel: "관심종목", content: "$8B이면 Iridium 연 매출의 9배예요. 구독 비즈니스에 9배 멀티플은 싸다고 봐야죠. 성장 여력까지 있으니까요.", createdAt: T1JL + 1*3600_000 + 20*60_000, likes: 267 },
    { id: 3, nickname: "익명_2298", holdingLabel: "150주 보유", content: "이 딜이 성사되면 SpaceX는 정말 이제 단순 발사 서비스 회사가 아니에요. 통신 인프라 기업이자 우주 운영 플랫폼이 되는 거예요.", createdAt: T1JL + 1*3600_000 + 45*60_000, likes: 198 },
  ],
  409: [
    { id: 1, nickname: "익명_4428", holdingLabel: "50주 보유", content: "CUDA 생태계가 10년 넘게 쌓인 게 진짜 해자예요. GPU 바꾸면 소프트웨어 다 다시 짜야 하는데 누가 그러겠어요. NIM이 그 위에 API 층으로 얹히는 거니까 더 단단해지는 거죠.", createdAt: T1JL + 1*3600_000 + 5*60_000, likes: 267 },
    { id: 2, nickname: "익명_9912", holdingLabel: "200주 보유", content: "SW ARR이 $2.5B인데 이게 HW처럼 한 번 팔고 끝이 아니라 구독이잖아요. 이익률도 훨씬 높고. NVDA가 소프트웨어 회사로 전환하는 중간 단계 같아요.", createdAt: T1JL + 1*3600_000 + 20*60_000, likes: 334 },
    { id: 3, nickname: "익명_3361", holdingLabel: "관심종목", content: "개발자 300만 명이 NIM 쓴다는 게 진짜 무서운 숫자예요. 이들이 다 NVDA 생태계 안으로 들어오는 거니까요.", createdAt: T1JL + 1*3600_000 + 35*60_000, likes: 189 },
  ],
  410: [
    { id: 1, nickname: "익명_7756", holdingLabel: "100주 보유", content: "MS가 OpenAI 의존도 줄이는 게 리스크 관리 차원에서 당연한 거예요. Claude가 코딩은 GPT4보다 낫다는 평가 많은데 Azure에서 쓸 수 있게 되는 거니까요.", createdAt: T1JL + 2*3600_000 + 40*60_000, likes: 223 },
    { id: 2, nickname: "익명_5544", holdingLabel: "관심종목", content: "GB800 클러스터 10만 GPU면 현재 최대 규모예요. NVDA 수주 캘린더에서 MS가 이 자리 차지한 거 확인된 거죠.", createdAt: T1JL + 3*3600_000, likes: 178 },
  ],
  411: [
    { id: 1, nickname: "익명_6638", holdingLabel: "100주 보유", content: "Jordan 브랜드 30주년 효과가 2분기 실적에 보이기 시작한 거예요. 하반기 프리미엄 한정판 라인이 더 나올 거니까 3분기도 기대해볼 만해요.", createdAt: T1JL + 3*3600_000 + 15*60_000, likes: 134 },
    { id: 2, nickname: "익명_2277", holdingLabel: "관심종목", content: "중국 +15% 회복이 진짜인지 계속 확인이 필요해요. 한 분기 반등이 아니라 추세 전환인지 봐야죠. 3분기도 좋으면 그때 매수 고민해도 늦지 않을 것 같아요.", createdAt: T1JL + 3*3600_000 + 30*60_000, likes: 112 },
  ],
  412: [
    { id: 1, nickname: "익명_4491", holdingLabel: "관심종목", content: "Ackman이 틀린 적도 있지만 트랙레코드 보면 대형주 저평가 잡는 건 귀신이에요. 아마존 PER 30배가 역사적 저점이면 지금이 매수 구간 맞아요.", createdAt: T1JL + 4*3600_000 + 10*60_000, likes: 198 },
    { id: 2, nickname: "익명_8817", holdingLabel: "50주 보유", content: "AWS만 별도 상장이면 $280B이라는 논리가 설득력 있어요. 이커머스는 공짜로 가져오는 셈이니까요. 버핏 스타일 가치 투자 접근이에요.", createdAt: T1JL + 4*3600_000 + 25*60_000, likes: 156 },
  ],
  413: [
    { id: 1, nickname: "익명_3382", holdingLabel: "관심종목", content: "AI 서버 마진이 PC 마진보다 낮다는 게 역설적이에요. Dell이 엔비디아 GPU 떼다가 파는 구조라 마진 제한적이거든요. ISG가 커도 수익성 개선이 제한적인 게 문제예요.", createdAt: T1JL + 3*3600_000 + 45*60_000, likes: 123 },
  ],
  // ── 2026-06-30 신규 ──────────────────────────────────────────────────────
  361: [
    { id: 1, nickname: "익명_7182", holdingLabel: "200주 보유", content: "HW3에 무료 V14이라는 게 진짜인지 확인하고 싶었는데 공식 발표 맞아요. 400만대 오너들이 갑자기 FSD 체험자가 되는 거잖아요. 체험 → 구독 전환율이 10%만 되어도 구독 수 40만 추가예요.", createdAt: T30J - 1*60_000, likes: 156 },
    { id: 2, nickname: "익명_3847", holdingLabel: "100주 보유", content: "중고 Model 3에 FSD 포함 $27K이 킬러 포인트예요. 경쟁 차 대비 자율주행 기능 포함 가격이 이미 압도적인데 여기서 더 내려가는 거잖아요. 유럽·아시아 수요 폭발 기대해요.", createdAt: T30J - 8*60_000, likes: 112 },
    { id: 3, nickname: "익명_9214", holdingLabel: "80주 보유", content: "V14 Lite라도 HW3이 경험하면 V14 Full 보고 싶어지잖아요. HW4 업그레이드 수요 발생 or FSD 구독 전환, 어느 쪽이든 Tesla 수익이에요.", createdAt: T30J - 20*60_000, likes: 89 },
  ],
  362: [
    { id: 1, nickname: "익명_4582", holdingLabel: "관심종목", content: "Texas 'Drive' 명칭 변경이 핵심이에요. 규제 언어가 바뀐다는 건 운전자 책임에서 시스템 책임으로 전환되는 거예요. 법적 프레임이 바뀌면 보험사들도 FSD 전용 상품 내놓기 시작해요.", createdAt: T30J - 6*60_000, likes: 103 },
    { id: 2, nickname: "익명_8263", holdingLabel: "300주 보유", content: "텍사스에서 됐으면 플로리다·애리조나가 다음이에요. 미국 남부 주들이 규제 완화에 빠른데 이 패턴이 반복되면 1년 안에 10개 주 이상이에요.", createdAt: T30J - 22*60_000, likes: 78 },
  ],
  363: [
    { id: 1, nickname: "익명_5917", holdingLabel: "150주 보유", content: "SAE L4 법적 인정이 가장 중요한 포인트예요. L4는 운전자 개입 불필요 수준이잖아요. 텍사스 DPS가 그 수준을 공식 인정한 거예요. 이 선례가 연방 규제로 이어지면 전국 확산이에요.", createdAt: T30J - 4*60_000, likes: 167 },
    { id: 2, nickname: "익명_2748", holdingLabel: "관심종목", content: "First Responder 매뉴얼 완비가 의외로 중요해요. 사고 시 구조대가 어떻게 대응해야 하는지 프로토콜 확립됐다는 거잖아요. 상용화 전 마지막 안전 관문이 열린 거예요.", createdAt: T30J - 15*60_000, likes: 134 },
    { id: 3, nickname: "익명_6419", holdingLabel: "400주 보유", content: "84대가 작아보여도 법적 선례로 1,000대, 10,000대로 스케일 업 허가 받는 건 훨씬 빨라요. 첫 84대가 핵심이에요.", createdAt: T30J - 30*60_000, likes: 91 },
  ],
  364: [
    { id: 1, nickname: "익명_3182", holdingLabel: "200주 보유", content: "다른 주에서 L4 선례 요청이 들어오면 텍사스 DPS 결정이 기준이 돼요. 연방 NHTSA도 이 선례 무시 못 해요. 규제 도미노가 Tesla 방향으로 가는 거예요.", createdAt: T30J - 12*60_000, likes: 118 },
    { id: 2, nickname: "익명_8631", holdingLabel: "관심종목", content: "NHTSA 승인 없이도 주 단위로 L4 허가 나오는 패턴이 미국 규제의 묘미예요. 주마다 다른 규제가 Tesla한테는 오히려 유리해요. 빠른 주에서 먼저 상용화하고 실적 보여주면 나머지 주도 열려요.", createdAt: T30J - 28*60_000, likes: 83 },
  ],
  365: [
    { id: 1, nickname: "익명_7413", holdingLabel: "100주 보유", content: "Optimus 발표가 7/8이면 SPCX Nasdaq 100 편입일이랑 같아요. 테슬라 + SpaceX 동시 이벤트야. 7월 8일이 큰 날이 될 것 같아요.", createdAt: T30J - 10*60_000, likes: 145 },
    { id: 2, nickname: "익명_2956", holdingLabel: "관심종목", content: "로봇 시연이면 주가 스파이크 단기 가능. 양산 타임라인 공개하면 밸류에이션 재산정 중기. 7/8 전 포지션 준비하는 게 맞는 것 같아요.", createdAt: T30J - 25*60_000, likes: 107 },
  ],
  366: [
    { id: 1, nickname: "익명_4827", holdingLabel: "관심종목", content: "10시간 내 2발 발사가 진짜 믿기지 않아요. 로켓 재사용 + 발사 준비 사이클이 이 수준까지 왔다는 거예요. 항공기처럼 운영되는 거잖아요. 발사 비용이 계속 내려가는 구조예요.", createdAt: T30J - 5*60_000, likes: 183 },
    { id: 2, nickname: "익명_6391", holdingLabel: "80주 보유", content: "Starlink 10,722기면 경쟁 위성 전체보다 많아요. 네트워크 규모가 이미 승부를 결정했고 구독 수익이 내년부터 폭발적으로 늘 거예요. 7/8 Nasdaq 100 편입이랑 겹쳐요.", createdAt: T30J - 18*60_000, likes: 142 },
  ],
  367: [
    { id: 1, nickname: "익명_5182", holdingLabel: "200주 보유", content: "편입 발효일 7/8 전날까지 선행 매수가 들어와요. 기관들이 리밸런싱 전 미리 사는 패턴이에요. 이 수급이 SPCX 가격 지지해주고 편입 이후에도 패시브 자금이 계속 들어와요.", createdAt: T30J - 7*60_000, likes: 198 },
    { id: 2, nickname: "익명_8374", holdingLabel: "관심종목", content: "QQQ AUM $320B에 SPCX 비중 0.2%만 잡아도 $6.4억이에요. 다른 Nasdaq 100 추종 ETF까지 합치면 수십억 달러야. 이 강제 매수가 일주일 안에 집중돼요.", createdAt: T30J - 22*60_000, likes: 156 },
    { id: 3, nickname: "익명_2941", holdingLabel: "50주 보유", content: "Nasdaq 100 편입이면 기관 투자 가능 범위도 늘어요. 인덱스 편입이 안 된 종목은 일부 펀드가 아예 못 사요. 편입 후 기관 접근성 확대 = 유동성 개선 = 변동성 안정화예요.", createdAt: T30J - 38*60_000, likes: 112 },
  ],
  368: [
    { id: 1, nickname: "익명_3819", holdingLabel: "30주 보유", content: "SK하이닉스 62% 점유율이 공급 병목이에요. 삼성이 HBM 수율 문제 해결 못 하면 2027년까지 이 구도 안 바뀌어요. NVDA 블랙웰 출하량이 제한되는 이유가 HBM이고, 그게 단기 공급 부족 → 프리미엄 유지예요.", createdAt: T30J - 9*60_000, likes: 134 },
    { id: 2, nickname: "익명_7462", holdingLabel: "20주 보유", content: "MU가 AAPL보다 S&P 비중 높아진 게 시대 변화를 보여줘요. 5년 전 스마트폰 회사가 1위였는데 이제 AI 반도체 회사가 그 자리예요. 이 흐름은 2027년 이전에 안 바뀌어요.", createdAt: T30J - 24*60_000, likes: 98 },
  ],
  369: [
    { id: 1, nickname: "익명_4918", holdingLabel: "15주 보유", content: "HBM 독점 구도에서 MU가 23%인데 이게 삼성 17%보다 높아요. 수율 문제 있는 삼성 밀어내고 MU가 올라온 거잖아요. MU 입장에선 점유율 확대 기회예요.", createdAt: T30J - 16*60_000, likes: 87 },
    { id: 2, nickname: "익명_6254", holdingLabel: "10주 보유", content: "데이터센터 CAPEX 사이클이 2027년까지 이어진다는 주요 증권사 전망이 맞으면 NVDA·MU 둘 다 올해 안에 더 갈 여지 있어요.", createdAt: T30J - 32*60_000, likes: 64 },
  ],
  370: [
    { id: 1, nickname: "익명_5831", holdingLabel: "60주 보유", content: "모델 증류가 왜 IP 침해인지 이제야 이해됐어요. Meta가 물어본 질문 패턴을 Anthropic이 학습하면 Meta의 AI 전략이 경쟁사에 노출되는 거잖아요. 대기업들이 외부 AI API 줄이는 이유가 이거예요.", createdAt: T30J - 13*60_000, likes: 112 },
    { id: 2, nickname: "익명_2947", holdingLabel: "관심종목", content: "이 뉴스로 Llama 투자 가속화 확실해졌어요. Meta가 자체 LLM 없으면 매번 이런 리스크가 생기니까요. META 주가에는 오히려 장기 긍정적으로 봐요. 자체 AI 역량 확보가 빨라지는 거잖아요.", createdAt: T30J - 26*60_000, likes: 89 },
  ],
  371: [
    { id: 1, nickname: "익명_8341", holdingLabel: "40주 보유", content: "외부 AI API 의존 줄이고 자체 LLM 강화 → 이게 모든 빅테크의 방향이에요. 자체 LLM이 없는 회사가 외부 API 써야 하는데 IP 리스크까지 감수해야 해요. 자체 AI = 해자예요.", createdAt: T30J - 20*60_000, likes: 76 },
    { id: 2, nickname: "익명_6173", holdingLabel: "관심종목", content: "Amazon-Anthropic 재협상이 동시에 진행 중이라는 게 흥미로워요. AI 공급망 비용이 올라가는 중이고 이 비용을 자체 AI로 대체하는 회사가 마진 방어가 돼요.", createdAt: T30J - 35*60_000, likes: 58 },
  ],
  372: [
    { id: 1, nickname: "익명_3482", holdingLabel: "관심종목", content: "트럼프 행정부가 승인해줄 수도 있어요. 기술 경쟁력이 중요한 시대에 Apple이 저렴한 칩 쓰게 해주는 게 미국 소비자한테 유리하다는 논리로 접근할 수 있어요. 결과 나오면 단기 방향 갈려요.", createdAt: T30J - 18*60_000, likes: 98 },
    { id: 2, nickname: "익명_7281", holdingLabel: "관심종목", content: "거부되면 NVDA·TSMC 수혜예요. Apple이 미국산 칩으로 돌아와야 하니까요. 승인되면 AAPL 단기 긍정이지만 지정학 리스크 상수로 남아요. 이 결과 모니터링 필수예요.", createdAt: T30J - 30*60_000, likes: 71 },
  ],
  373: [
    { id: 1, nickname: "익명_5192", holdingLabel: "관심종목", content: "Pelosi 포함 8인이 AI 규제 위원회 소속이라는 게 핵심이에요. 이 사람들이 법 쓸 때 본인이 보유한 MSFT 주가도 생각하겠죠. AI 규제가 MSFT에 유리한 방향으로 설계될 가능성이 높아요.", createdAt: T30J - 14*60_000, likes: 134 },
    { id: 2, nickname: "익명_8924", holdingLabel: "관심종목", content: "의회 스마트 머니 팔로우가 실제로 수익이 났어요. Pelosi 포트폴리오 추종 전략이 S&P 이기는 경우가 많다는 연구도 있고요. MSFT $376에 진입한 8인 전원 수익 중이라는 게 신호예요.", createdAt: T30J - 28*60_000, likes: 107 },
  ],
  374: [
    { id: 1, nickname: "익명_4271", holdingLabel: "200주 보유", content: "FSD V14 발표 4시간 후에 VW이 AV 포기 선언한 타이밍이 의도적인지 아닌지 모르겠지만 메시지는 명확해요. Tesla가 무서워서 접은 거예요. 유럽 자율주행 시장은 Tesla 독주 확정이에요.", createdAt: T30J - 2*60_000, likes: 167 },
    { id: 2, nickname: "익명_7831", holdingLabel: "150주 보유", content: "10만명이면 독일 경제에도 충격이에요. VW 협력사까지 포함하면 30~50만명 영향권인데 유럽 소비 위축이 우려돼요. 매크로 리스크 변수로 체크해야 해요.", createdAt: T30J - 18*60_000, likes: 134 },
    { id: 3, nickname: "익명_2614", holdingLabel: "관심종목", content: "AV 파트너십 전면 종료가 핵심이에요. 외부 파트너로도 못 따라가겠다는 거잖아요. 자체 AV 기술 없는 OEM의 미래예요. 현대도 지금 열심히 투자하는 이유가 이거예요.", createdAt: T30J - 32*60_000, likes: 98 },
  ],
  375: [
    { id: 1, nickname: "익명_3841", holdingLabel: "100주 보유", content: "Bosch·Continental·ZF 같은 전통 부품사들이 VW 물량에 의존했는데 이게 줄면 공급망 도미노가 와요. 유럽 산업 전반에 악영향이고 Tesla 유럽 점유율은 반사이익이에요.", createdAt: T30J - 22*60_000, likes: 112 },
    { id: 2, nickname: "익명_6491", holdingLabel: "관심종목", content: "유럽 정부 보조금으로 VW 살려야 한다는 압박이 올 거예요. 근데 구조적으로 AV 없이는 미래가 없어요. 보조금이 시간을 사는 건지, 회생 기반이 되는 건지가 관건이에요.", createdAt: T30J - 38*60_000, likes: 84 },
  ],

  // ── 2026-06-26 신규 ──────────────────────────────────────────────────────
  348: [
    { id: 1, nickname: "익명_4812", holdingLabel: "관심종목", content: "공식 인포그래픽이 나왔다는 게 포인트예요. SpaceX가 직접 만든 카드에 타임라인까지 넣었어요. 기업 홍보 수준이 이미 상장사 그 이상이에요. 패시브 ETF 유입 + 기관 매수 도미노 시작될 거예요.", createdAt: T26J - 2*60_000, likes: 134 },
    { id: 2, nickname: "익명_7293", holdingLabel: "80주 보유", content: "7,300+ 위성 + $350B 기업가치가 공식 확인됐어요. QQQ가 이 숫자 보고 편입 비중 계산하면 $4.8억+ 강제 매수 나와요. 리밸런싱 전 선행 매수까지 더하면 7/6 전후로 수급이 폭발해요.", createdAt: T26J - 15*60_000, likes: 98 },
    { id: 3, nickname: "익명_5637", holdingLabel: "관심종목", content: "25년 역사가 한 장에 담겼어요. 2002 창업부터 2026 NASDAQ-100까지. 이 스토리가 기관 IR 자료가 되면 SpaceX IPO 이후 밸류에이션 논리에 그대로 쓰여요.", createdAt: T26J - 30*60_000, likes: 72 },
  ],
  349: [
    { id: 1, nickname: "익명_3841", holdingLabel: "관심종목", content: "현금 $100.8B에 T-Mobile $108B이면 현금만으로 인수 가능해요. 채권 발행 여력까지 더하면 레버리지 없이도 되는 딜이에요. DOJ만 통과하면 SpaceX가 미국 최대 통신사가 돼요.", createdAt: T26J - 8*60_000, likes: 118 },
    { id: 2, nickname: "익명_6724", holdingLabel: "관심종목", content: "Starlink + T-Mobile 지상망 합치면 음영지역 제로예요. 위성이 커버 못 하는 실내나 지하는 셀타워가 잡아요. 완전한 커버리지 완성이에요. 이 시너지가 합쳐진 통신 서비스 요금은 프리미엄 받을 수 있어요.", createdAt: T26J - 24*60_000, likes: 87 },
    { id: 3, nickname: "익명_9452", holdingLabel: "관심종목", content: "트럼프 행정부가 빅테크 M&A에 우호적이에요. AT&T·버라이즌 기존 과점이 흔들리는 거라 소비자 후생 논리로 승인 가능성 있어요. 보수 진영에서 SpaceX 우호적인 것도 유리해요.", createdAt: T26J - 38*60_000, likes: 63 },
  ],
  350: [
    { id: 1, nickname: "익명_2819", holdingLabel: "관심종목", content: "연료 자급은 발사 비용 구조를 바꿔요. 지금 외부 공급업체 마진이 발사 비용에 포함되는데 파이프라인 완성되면 그 마진이 SpaceX로 와요. 연간 수억 달러 비용 절감 가능해요.", createdAt: T26J - 12*60_000, likes: 91 },
    { id: 2, nickname: "익명_5413", holdingLabel: "관심종목", content: "발사 간격 단축이 핵심이에요. 연료 주입 대기 시간 없애면 같은 발사대에서 월 발사 횟수가 늘어요. Starlink V3 배치 타임라인이 당겨지면 구독자 증가 속도도 빨라져요.", createdAt: T26J - 27*60_000, likes: 68 },
  ],
  351: [
    { id: 1, nickname: "익명_7634", holdingLabel: "관심종목", content: "780% 수익이면 연환산으로도 엄청난 수준이에요. $250에서 7개월 만에 $2,225 된 거잖아요. Leopold이 먼저 알고 공개한 거고, 이후 AI 스토리지 수요 + 성장 스토리가 주가를 끌어올렸어요.", createdAt: T26J - 16*60_000, likes: 103 },
    { id: 2, nickname: "익명_3927", holdingLabel: "관심종목", content: "목표가 $2,500 상향이면 지금도 업사이드 12% 더 있어요. AI 데이터센터 NAND 수요 폭증으로 SanDisk 실적 모멘텀이 올라오면 이 목표가도 보수적일 수 있어요.", createdAt: T26J - 34*60_000, likes: 79 },
  ],
  352: [
    { id: 1, nickname: "익명_6128", holdingLabel: "350주 보유", content: "CapEx 확대가 EPS 단기 압박 요인이지만 이걸 모르는 기관이 없어요. 이미 price in 됐을 가능성 높고 실제 투자 결과물인 FSD·Optimus가 나올 때 리레이팅이 일어나요.", createdAt: T26J - 4*60_000, likes: 127 },
    { id: 2, nickname: "익명_4592", holdingLabel: "200주 보유", content: "칩 설계 영역 투자가 주목돼요. DOJO 다음 세대가 나오면 외부 NVIDIA 의존도가 줄어요. 자체 칩 보유가 AI 훈련 비용을 낮추고 FSD 개선 사이클을 빠르게 해요.", createdAt: T26J - 20*60_000, likes: 94 },
    { id: 3, nickname: "익명_8347", holdingLabel: "100주 보유", content: "배터리 + 파워트레인 동시 투자가 Model 2 대중화 전제예요. $25K 차 만들려면 배터리 비용이 내려가야 해요. 이 투자가 2~3년 후 대중화 가격 달성의 기반이에요.", createdAt: T26J - 36*60_000, likes: 71 },
  ],
  353: [
    { id: 1, nickname: "익명_2948", holdingLabel: "120주 보유", content: "7,500대/주면 연 390,000대예요. 유럽 수요를 소화하기에 딱 맞는 규모예요. 채용 공고로 계획 확정됐고 Q3~Q4 출하량에 반영될 거예요.", createdAt: T26J - 9*60_000, likes: 86 },
    { id: 2, nickname: "익명_7183", holdingLabel: "관심종목", content: "현지 생산이니까 EU 수입 관세 없어요. 마진 방어가 되면서 가격 경쟁력도 유지해요. BYD가 유럽 공장 짓기 전까지는 Tesla가 구조적 우위예요.", createdAt: T26J - 25*60_000, likes: 62 },
  ],
  354: [
    { id: 1, nickname: "익명_5829", holdingLabel: "150주 보유", content: "유럽에서 1·2위 다 Tesla가 차지한 게 놀라워요. BYD 진입 공세에 오히려 점유율이 올라갔어요. 기가베를린 신형 Model Y 품질이 올라간 게 결정적이에요.", createdAt: T26J - 7*60_000, likes: 112 },
    { id: 2, nickname: "익명_3614", holdingLabel: "80주 보유", content: "YTD +12%는 연간 실적으로도 확인되는 거예요. 전년 대비 성장이 지속되면 유럽 시장 점유율이 구조적으로 올라가는 거예요. Q2 서프라이즈 기대해도 될 것 같아요.", createdAt: T26J - 22*60_000, likes: 78 },
    { id: 3, nickname: "익명_9472", holdingLabel: "관심종목", content: "Model 3 유럽 1위가 신기해요. 사실 3이 4도 아닌 지금 모델인데 이 판매량이 나온다는 건 Tesla 브랜드 자체가 강한 거예요. FSD 유럽 확산되면 ASP까지 올라가요.", createdAt: T26J - 40*60_000, likes: 54 },
  ],
  355: [
    { id: 1, nickname: "익명_1847", holdingLabel: "250주 보유", content: "이게 Cybercab에 얼마나 큰 뉴스인지 모르는 사람이 많아요. 페달 없는 차 설계가 가능하면 실내 공간이 완전히 달라져요. 원가도 내려가고 승차감도 올라가요. 진짜 로보택시 전용 차가 나오는 거예요.", createdAt: T26J - 5*60_000, likes: 189 },
    { id: 2, nickname: "익명_6392", holdingLabel: "150주 보유", content: "AV Framework 5차 업데이트가 연속 규제 완화예요. 브레이크 페달 면제 + 리어뷰 미러 면제 + 자율주행 데이터 규제 완화가 패키지로 왔어요. 로비 효과인지 정책 판단인지 결과적으로 Tesla 최대 수혜예요.", createdAt: T26J - 18*60_000, likes: 134 },
    { id: 3, nickname: "익명_8241", holdingLabel: "관심종목", content: "Waymo도 수혜지만 Waymo 차는 이미 페달 없어요. Tesla Cybercab이 이제 공식적으로 페달 없이 설계 가능하니까 상대적 규제 장벽이 완전히 없어진 거예요.", createdAt: T26J - 32*60_000, likes: 87 },
  ],
  356: [
    { id: 1, nickname: "익명_4728", holdingLabel: "관심종목", content: "일본 항구 직배송이 수요 포화 증거예요. 배달 센터 처리 능력을 초과했다는 거예요. 이 수준이면 일본 Q3 인도량이 폭발적으로 나올 거예요. Tesla 아시아 성장 재확인이에요.", createdAt: T26J - 10*60_000, likes: 94 },
    { id: 2, nickname: "익명_2936", holdingLabel: "관심종목", content: "일본 정부 보조금 + 무료 슈퍼차징이 사실상 가격 인하 효과예요. 엔화 약세에도 실질 부담이 줄어드는 구조예요. 일본 소비자가 Toyota 대신 Tesla 선택하는 트리거로 충분해요.", createdAt: T26J - 28*60_000, likes: 67 },
  ],
  357: [
    { id: 1, nickname: "익명_5847", holdingLabel: "400주 보유", content: "매출 $50B에 마진 80%면 반도체 역사에 없던 수치예요. AI 수요가 공급을 압도적으로 초과해서 가격 결정력이 완전히 Micron으로 넘어온 거예요. 2~3년 사이클 동안 이 수준 유지돼요.", createdAt: T26J - 6*60_000, likes: 167 },
    { id: 2, nickname: "익명_3729", holdingLabel: "200주 보유", content: "트리플 비트 + 가이던스 대폭 상회면 월가 추정이 즉시 올라가요. FY27 추정이 올라가면 목표주가가 올라가고 기관 매수가 따라와요. 오늘 서프라이즈가 내일 추정 상향의 시작이에요.", createdAt: T26J - 22*60_000, likes: 123 },
    { id: 3, nickname: "익명_8163", holdingLabel: "100주 보유", content: "HBM3E 공급 부족이 핵심이에요. AI 서버 수요는 폭발하는데 생산 확대에 시간이 걸려요. 이 공급 병목이 유지되는 동안 Micron 마진 방어가 됩니다.", createdAt: T26J - 38*60_000, likes: 89 },
  ],
  358: [
    { id: 1, nickname: "익명_7294", holdingLabel: "관심종목", content: "AVGO가 XPU 설계 용역 독점하는 게 NVIDIA와 다른 베팅이에요. NVIDIA는 GPU를 팔고 AVGO는 각 회사 맞춤 칩을 설계해줘요. 고객이 AVGO를 바꾸기 어려운 구조예요. 전환 비용이 엄청나요.", createdAt: T26J - 13*60_000, likes: 89 },
    { id: 2, nickname: "익명_4819", holdingLabel: "관심종목", content: "$1T TAM의 30% AVGO 점유면 $300B 매출 기회예요. 현재 연매출 $50B 대비 6배예요. AI 인프라 테마에서 NVDA 다음으로 가장 큰 수혜주가 AVGO예요.", createdAt: T26J - 30*60_000, likes: 64 },
  ],
  359: [
    { id: 1, nickname: "익명_3924", holdingLabel: "관심종목", content: "M5 엔트리 Mac은 좋은 소식인데 가격 인상이 동반이면 수요 증가 효과를 상쇄해요. 고객 입장에서 더 비싸게 더 좋은 걸 사야 하는데 이 트레이드오프에서 수요가 얼마나 버티냐가 관건이에요.", createdAt: T26J - 17*60_000, likes: 76 },
    { id: 2, nickname: "익명_6841", holdingLabel: "관심종목", content: "-5% 조정이 크게 느껴지지만 Apple 마진 입장에선 가격 인상이 맞는 방향이에요. 관세 비용 전가라 어쩔 수 없는 면도 있어요. 조정이 길게 안 가면 매수 기회일 수 있어요.", createdAt: T26J - 35*60_000, likes: 51 },
  ],
  360: [
    { id: 1, nickname: "익명_2847", holdingLabel: "관심종목", content: "OpenAI IPO 지연이 SPCX 입장에선 호재예요. AI 투자 자금이 경쟁 IPO 없이 SPCX로 집중될 수 있어요. SpaceX가 먼저 시장을 잡은 효과예요.", createdAt: T26J - 20*60_000, likes: 83 },
    { id: 2, nickname: "익명_5193", holdingLabel: "관심종목", content: "Jalapeño 9개월 개발이 놀라워요. 보통 AI 칩 개발에 2~3년 걸리는데 Apple 지원 받아서 속도를 냈어요. OpenAI가 칩 보유하면 추론 비용이 내려가서 서비스 마진이 올라가요.", createdAt: T26J - 38*60_000, likes: 57 },
  ],
  // ── 2026-06-25 신규 ──────────────────────────────────────────────────────
  336: [
    { id: 1, nickname: "익명_5193", holdingLabel: "300주 보유", content: "EOL 외부에서 150대가 한꺼번에 잡힌 건 처음이에요. 드론이 이렇게 많이 포착됐다는 건 출고 대기 물량이 축적됐다는 거고 Austin 서비스 출시 직전이에요. 루트 2.4mi 고속도로 포함이면 최종 검증 단계 맞아요.", createdAt: T25J - 4*60_000, likes: 128 },
    { id: 2, nickname: "익명_7429", holdingLabel: "100주 보유", content: "150대가 초기 플릿이면 Austin 서비스 시작 규모로 충분해요. Waymo 처음 시작할 때도 이 정도 규모였어요. 중요한 건 FSD V14 + 자율주행 검증 완료예요. 수익성은 규모가 커질수록 올라가요.", createdAt: T25J - 18*60_000, likes: 94 },
    { id: 3, nickname: "익명_3842", holdingLabel: "관심종목", content: "루트 60% 확장이 핵심이에요. 도심 복잡 환경 + 고속도로 진입 = 실제 운영 조건이에요. 여기서 무사고 운행 기록 쌓이면 NHTSA 승인도 빨라지고 규제 대화가 달라져요.", createdAt: T25J - 32*60_000, likes: 76 },
  ],
  337: [
    { id: 1, nickname: "익명_8472", holdingLabel: "200주 보유", content: "네덜란드 RDW 상호인증 방식이 EU 전역 빠른 확산의 비결이에요. 한 나라 심사 통과하면 다른 나라가 그 결정을 참조해서 빠르게 따라가요. 6번째, 7번째가 계속 나올 거예요.", createdAt: T25J - 9*60_000, likes: 87 },
    { id: 2, nickname: "익명_5918", holdingLabel: "40주 보유", content: "핀란드 오너 입장에서 FSD 쓰려면 지금까지 기다려야 했는데 승인 나오면 바로 구독 전환이에요. 유럽 5개국 구독자가 생기고 있는 시점에 핀란드 더해지면 누적 구독 수치가 빠르게 올라갈 거예요.", createdAt: T25J - 26*60_000, likes: 63 },
  ],
  338: [
    { id: 1, nickname: "익명_6284", holdingLabel: "350주 보유", content: "차가 돈 벌어오는 자산이 된다는 개념이 진짜 혁명이에요. 집 사면 집세 받듯이 테슬라 사면 플릿 수익 받는 모델이에요. 이게 현실화되면 테슬라 구매 의사결정이 완전히 달라져요. 수요 자체가 구조적으로 올라가요.", createdAt: T25J - 6*60_000, likes: 147 },
    { id: 2, nickname: "익명_2947", holdingLabel: "80주 보유", content: "Uber·Lyft는 드라이버 확보가 병목인데 Tesla Fleet은 이미 수백만 대 차량이 잠재 드라이버예요. 드라이버 구하러 다닐 필요가 없어요. 이 공급 무한성이 Uber보다 규모가 커지는 이유예요.", createdAt: T25J - 23*60_000, likes: 112 },
    { id: 3, nickname: "익명_9183", holdingLabel: "관심종목", content: "FSD 구독 없이도 수익 나는 구조면 더 많은 오너가 참여해요. 진입 장벽이 낮아지면 플릿 규모가 빠르게 커지고 Tesla 플랫폼 마진도 올라가요. 윈윈이에요.", createdAt: T25J - 40*60_000, likes: 78 },
  ],
  339: [
    { id: 1, nickname: "익명_4918", holdingLabel: "120주 보유", content: "ARK가 지속 매수하는 게 시장 신뢰 신호예요. $4,600 목표가 유지한다는 건 포트폴리오에서 가장 확신 높은 포지션이라는 거예요. 기관이 이러면 개인 투자자도 방향은 맞춰가야 해요.", createdAt: T25J - 11*60_000, likes: 93 },
    { id: 2, nickname: "익명_7341", holdingLabel: "관심종목", content: "로보택시 + Optimus + FSD + 에너지 4축이 동시에 S커브 초입이라는 게 핵심이에요. 이 네 개가 동시에 올라오는 시기는 한 번밖에 없어요. 타이밍을 잃으면 비싸게 사야 해요.", createdAt: T25J - 28*60_000, likes: 71 },
  ],
  340: [
    { id: 1, nickname: "익명_3816", holdingLabel: "관심종목", content: "AI 블랙박스 데이터가 방패인 거예요. 엑셀 100% 기록이 다 남아 있으니까 설계결함 주장이 통하기 어려워요. 이 구조적 방어력이 소송 리스크를 제한해요.", createdAt: T25J - 15*60_000, likes: 69 },
    { id: 2, nickname: "익명_6492", holdingLabel: "50주 보유", content: "언론이 '테슬라 소송'으로 헤드라인 뽑으면 단기 주가 흔들려요. 근데 실제 판결은 Tesla 유리하게 나올 가능성이 높아요. 패턴 알면 소송 뉴스 = 오히려 기회예요.", createdAt: T25J - 33*60_000, likes: 51 },
  ],
  341: [
    { id: 1, nickname: "익명_7193", holdingLabel: "180주 보유", content: "물류 분석가 채용이 엔지니어 채용보다 중요한 신호예요. 실제 운영 준비 단계에 들어간 거거든요. 엔지니어는 제품 만들고 물류·ops는 배포 실행이에요. 상업화 카운트다운이에요.", createdAt: T25J - 7*60_000, likes: 104 },
    { id: 2, nickname: "익명_5382", holdingLabel: "30주 보유", content: "북미 전역 배포 명시가 Austin 한 곳이 아니라 전국 규모 계획이라는 거예요. Phase 계획 세우고 물류 팀 먼저 구성하는 게 맞는 순서예요. 1~2년 내 미국 주요 도시 다 들어가는 로드맵이에요.", createdAt: T25J - 24*60_000, likes: 76 },
  ],
  342: [
    { id: 1, nickname: "익명_8294", holdingLabel: "관심종목", content: "QQQ AUM이 $320B이에요. SPCX 비중 0.5%만 돼도 $1.6B이 강제 유입이에요. 이게 한 번에 들어오는 게 아니라 편입 전후로 분산되지만 수급 압력은 명확해요.", createdAt: T25J - 5*60_000, likes: 138 },
    { id: 2, nickname: "익명_4729", holdingLabel: "관심종목", content: "QQQ 외에도 NASDAQ-100 추종 ETF가 수십 개예요. 전부 합치면 편입 강제 매수 규모가 상당해요. 단기 촉매로 봐도 좋지만 편입 후 구조적 보유 수요가 생기는 게 더 중요해요.", createdAt: T25J - 21*60_000, likes: 98 },
    { id: 3, nickname: "익명_2718", holdingLabel: "관심종목", content: "S&P500 편입할 때도 편입 전 한 달이 수익률 최고였어요. 7/6 전에 선행 포지션 이미 쌓여 있는 상황이에요. 편입 당일은 오히려 '소문에 사서 뉴스에 팔아'가 나올 수도 있어요.", createdAt: T25J - 38*60_000, likes: 73 },
  ],
  343: [
    { id: 1, nickname: "익명_6183", holdingLabel: "관심종목", content: "Elon 바이오 업데이트는 항상 중요한 힌트를 줘요. 'Starmind'가 공식 브랜드면 지금 우리가 AI 위성 성좌 탄생 직전을 보고 있는 거예요. 10년 후 스타민드가 우주 AWS가 될 수 있어요.", createdAt: T25J - 8*60_000, likes: 156 },
    { id: 2, nickname: "익명_9284", holdingLabel: "관심종목", content: "Starlink가 인터넷, Starmind가 AI면 두 개 독립 수익원이에요. AI 서비스 단가는 인터넷보다 훨씬 비싸요. ARPU가 폭발적으로 올라갈 수 있는 구조예요.", createdAt: T25J - 22*60_000, likes: 119 },
    { id: 3, nickname: "익명_3712", holdingLabel: "관심종목", content: "국방부가 위성 AI 추론에 돈을 얼마나 쓸지 생각해봐요. SpaceX가 이 분야 독점하면 정부 계약만으로도 엄청난 매출이 생겨요. SPCX 장기 홀드의 새로운 이유가 추가된 거예요.", createdAt: T25J - 37*60_000, likes: 87 },
  ],
  344: [
    { id: 1, nickname: "익명_5194", holdingLabel: "관심종목", content: "150kW를 우주에서 처리한다는 게 엄청난 기술적 도전이에요. 방열판이 액체냉각이어야 할 만큼 발열이 엄청난 거예요. 이걸 상업적으로 해결하면 SpaceX만이 할 수 있는 영역이에요.", createdAt: T25J - 12*60_000, likes: 91 },
    { id: 2, nickname: "익명_7483", holdingLabel: "관심종목", content: "ISS 날개폭 수준의 위성이 궤도에서 AI 돌리는 거예요. 냉각·전력·컴퓨팅 다 맞아야 하는데 Starship 탑재중량이 이걸 가능하게 해줘요. Falcon 9으론 못 올리는 크기예요.", createdAt: T25J - 29*60_000, likes: 74 },
  ],
  345: [
    { id: 1, nickname: "익명_8294", holdingLabel: "관심종목", content: "벌크선이 50대면 작은 선사가 아니에요. 대형 선사 전체 선단이에요. 이 계약 하나로 연 $15M+인데 이런 계약이 수백 개 쌓이면 Starlink Maritime 단독으로 수조 원 사업이에요.", createdAt: T25J - 9*60_000, likes: 83 },
    { id: 2, nickname: "익명_3718", holdingLabel: "관심종목", content: "해운사들이 VSAT 쓰다가 Starlink로 넘어오면 다시 돌아가기 어려워요. 속도 차이가 너무 커서요. 전환 후 유지율이 거의 100%인 구독 사업 모델이에요. 한번 잡으면 오래 가요.", createdAt: T25J - 26*60_000, likes: 62 },
  ],
  346: [
    { id: 1, nickname: "익명_4912", holdingLabel: "관심종목", content: "Tesla + Sunrun + SpaceX 3자가 각자 잘하는 걸 결합한 거예요. 에너지 저장, 태양광, 통신 관제망 — 어느 한 회사가 다 할 수 없어요. 이 조합을 경쟁사가 만들 수 없어요.", createdAt: T25J - 11*60_000, likes: 118 },
    { id: 2, nickname: "익명_7193", holdingLabel: "100주 보유", content: "16GW 가상발전소가 얼마나 큰지 — 원전 16기 규모예요. 이게 분산 가정 배터리로 가능하면 그리드 안정성에 혁명이에요. 정부에서 인센티브 더 줄 가능성도 높아요.", createdAt: T25J - 27*60_000, likes: 89 },
    { id: 3, nickname: "익명_5294", holdingLabel: "관심종목", content: "재난 때 전기랑 인터넷이 동시에 끊기는데 Tesla Powerwall + Starlink가 같이 있으면 둘 다 해결돼요. 이 조합의 실용적 가치가 일반 소비자한테 직접 다가오는 거예요. 수요 구조가 탄탄해요.", createdAt: T25J - 43*60_000, likes: 67 },
  ],
  347: [
    { id: 1, nickname: "익명_6483", holdingLabel: "300주 보유", content: "EPS $1.91이 예상 $1.60 대비 19% 상회가 진짜 서프라이즈예요. 매출도 그렇지만 EPS 서프라이즈가 주가 리액션 결정해요. Q4 가이던스까지 컨센서스 상회면 애널들이 목표주가 올릴 거예요.", createdAt: T25J - 14*60_000, likes: 184 },
    { id: 2, nickname: "익명_8291", holdingLabel: "200주 보유", content: "HBM 수요가 이렇게 폭발하는 게 NVIDIA GB200 NVL72 수요 때문이에요. 서버 당 HBM 탑재량이 이전 세대 대비 3배예요. Micron이 SK하이닉스 추격하면 HBM 시장 점유율 변화가 실적 레버리지예요.", createdAt: T25J - 31*60_000, likes: 141 },
    { id: 3, nickname: "익명_4918", holdingLabel: "관심종목", content: "반도체 슈퍼사이클 공식 확인이에요. Micron 실적이 좋으면 SK하이닉스·삼성도 좋고 NVIDIA 서버 수요도 확인되는 거예요. 반도체 섹터 전체에 호재예요.", createdAt: T25J - 48*60_000, likes: 108 },
  ],
  // ── 2026-06-24 신규 ──────────────────────────────────────────────────────
  322: [
    { id: 1, nickname: "익명_5829", holdingLabel: "150주 보유", content: "오보에 -2% 빠지고 보고서 나오면 회복하는 패턴이 반복이에요. 이걸 알면 NTSB 보고서 대기하면서 저점 잡는 전략이 가능해요. Tesla 뉴스 리터러시가 수익률 차이를 만들어요.", createdAt: T24J - 4*60_000, likes: 73 },
    { id: 2, nickname: "익명_8471", holdingLabel: "관심종목", content: "언론이 'Tesla FSD 사고'로 헤드라인 뽑는 게 시청률 때문이에요. 정정 보도는 눈에 안 띄는 위치에 작게 나오죠. 이 비대칭 정보가 단기 주가 왜곡 만드는 거예요. 알고 있으면 이용할 수 있어요.", createdAt: T24J - 22*60_000, likes: 58 },
  ],
  323: [
    { id: 1, nickname: "익명_3192", holdingLabel: "200주 보유", content: "440K면 컨센서스 대비 +15% 서프라이즈예요. 이게 실제로 나오면 7월 초 발표일 주가 반응이 엄청날 거예요. 포지션 지금 확대하는 게 맞는 타이밍 같아요.", createdAt: T24J - 8*60_000, likes: 104 },
    { id: 2, nickname: "익명_7284", holdingLabel: "80주 보유", content: "베를린이 완전 정상화됐다는 게 포인트예요. Q1에 베를린 라인 정비 이슈가 있었는데 해소됐으면 유럽 생산량이 회복된 거예요. 상하이 + 베를린 + 텍사스 다 잘 돌아가면 440K는 보수적인 숫자일 수 있어요.", createdAt: T24J - 19*60_000, likes: 82 },
    { id: 3, nickname: "익명_5913", holdingLabel: "50주 보유", content: "Q2 440K 나오면 FY26 연간 1.8M 가능성이 보이는 거예요. 작년 FY25 1.79M이었으니까 성장 재확인이 되는 거고요. TSLA 매크로 우려 이기고 성장 보여주는 게 밸류에이션 리레이팅의 시작이에요.", createdAt: T24J - 36*60_000, likes: 61 },
  ],
  324: [
    { id: 1, nickname: "익명_4812", holdingLabel: "60주 보유", content: "6개국 동시 승인이 EU 규제 기관들끼리 조율된 거예요. 한 나라씩 개별 심사보다 훨씬 빠른 확산이 가능해요. 나머지 EU 국가들도 시간 문제예요. 유럽 FSD 구독 시장이 열리는 거예요.", createdAt: T24J - 12*60_000, likes: 89 },
    { id: 2, nickname: "익명_9283", holdingLabel: "20주 보유", content: "€199/월 구독 × 유럽 Tesla 보유 대수 × 전환율 15% = 상당한 recurring revenue예요. 미국 FSD 구독 성장이 유럽에서 복제되는 거예요. 소프트웨어 매출이 지리적으로 확장되는 거잖아요.", createdAt: T24J - 28*60_000, likes: 67 },
  ],
  325: [
    { id: 1, nickname: "익명_7182", holdingLabel: "180주 보유", content: "역대 최대 Megapack 계약이라는 게 단가 협상력도 보여줘요. 규모가 크면 단가 낮추는 게 아니라 오히려 Tesla가 공급 우선순위 프리미엄을 챙길 수 있어요. 공급 부족 시장이라서 가능한 구조예요.", createdAt: T24J - 14*60_000, likes: 96 },
    { id: 2, nickname: "익명_5318", holdingLabel: "관심종목", content: "호주 재생에너지 전환이 가장 빠른 시장 중 하나예요. 풍력·태양광 간헐성 문제 해결이 ESS 수요를 폭발시키는데 Tesla Megapack이 독점적 지위예요. 호주 시장만 봐도 수조 원 규모예요.", createdAt: T24J - 31*60_000, likes: 74 },
    { id: 3, nickname: "익명_2914", holdingLabel: "70주 보유", content: "에너지 사업이 마진 30% + 성장률 자동차 이상이면 이 부문 별도 밸류에이션 해야 해요. 에너지 부문 P/E 30x 적용하면 Tesla 전체 시총에서 에너지 기여분이 생각보다 크게 나와요. 에너지 리레이팅이 주가 업사이드예요.", createdAt: T24J - 49*60_000, likes: 55 },
  ],
  326: [
    { id: 1, nickname: "익명_8192", holdingLabel: "관심종목", content: "$89B이면 역대 우주 기업 최대 채권 발행이에요. 시장에서 흡수되는지가 테스트인데 BBB+ 등급에 수요 초과 예상이에요. 발행 금리가 낮게 결정되면 SpaceX 신용도가 시장에서 인정받는 거예요.", createdAt: T24J - 5*60_000, likes: 91 },
    { id: 2, nickname: "익명_4812", holdingLabel: "관심종목", content: "Colossus AI 2단계 확장이 채권 자금으로 진행되는 거예요. GPU 클러스터 200K H100에서 더 늘리는 건데 — Anthropic·Google 같은 최상위 AI 회사들이 컴퓨팅 파트너로 묶이는 구조예요. AI 인프라 사업이 우주 사업과 병렬로 성장하는 거예요.", createdAt: T24J - 23*60_000, likes: 71 },
  ],
  327: [
    { id: 1, nickname: "익명_3182", holdingLabel: "관심종목", content: "10T 파라미터를 효율적으로 쓰려면 Colossus급 인프라가 필요해요. xAI가 자체 클러스터 가진 게 이 모델 훈련·추론 비용 구조를 경쟁사 대비 유리하게 만드는 거예요. 인프라 수직통합이 AI 경쟁에서 핵심 해자예요.", createdAt: T24J - 11*60_000, likes: 87 },
    { id: 2, nickname: "익명_6921", holdingLabel: "200주 보유", content: "Tesla FSD에 Grok5 통합된다면 차 안에서 10T 파라미터 AI 어시스턴트 쓰는 거예요. 경쟁 EV에 이걸 복제할 수 있는 회사가 없어요. TSLA 생태계 락인 효과가 더 강해지는 거죠.", createdAt: T24J - 26*60_000, likes: 69 },
    { id: 3, nickname: "익명_5184", holdingLabel: "30주 보유", content: "벤치마크 결과 기다려봐야 알지만 파라미터 규모로는 이미 최대예요. 효율까지 증명되면 Grok5가 GPT-4o 자리를 차지하는 게 빠를 수 있어요. LLM 시장 점유율 변화가 생기면 관련 주 다 움직여요.", createdAt: T24J - 42*60_000, likes: 52 },
  ],
  328: [
    { id: 1, nickname: "익명_7392", holdingLabel: "80주 보유", content: "이란 지정학 리스크 + 금리 동결이 단기 압박이지만 구조적 성장주는 이런 매크로 노이즈에 흔들리면 안 돼요. Tesla·SpaceX는 이란 뉴스로 펀더멘털이 바뀌는 회사가 아니에요. 조정이면 오히려 담을 기회예요.", createdAt: T24J - 18*60_000, likes: 67 },
    { id: 2, nickname: "익명_2948", holdingLabel: "40주 보유", content: "유가 상승이 Tesla Energy 사업엔 긍정이라는 뷰가 맞아요. 유가 높으면 재생에너지+ESS 전환 수요가 더 빨리 올라오거든요. 단기 매크로 공포가 Tesla 에너지 사업 모멘텀을 가리는 거예요.", createdAt: T24J - 39*60_000, likes: 49 },
  ],
  329: [
    { id: 1, nickname: "익명_8471", holdingLabel: "관심종목", content: "DeepSeek 음성 AI 통합이 되면 Tesla 차량이 중국 유저한테 훨씬 자연스러운 경험이 될 거예요. 현재 중국 FSD 구독 전환율을 높이는 핵심이 AI 어시스턴트 현지화인데 DeepSeek이 딱 맞아요.", createdAt: T24J - 22*60_000, likes: 74 },
    { id: 2, nickname: "익명_5193", holdingLabel: "60주 보유", content: "비용 1/20이라는 게 결국 Tesla FSD 마진 개선이에요. AI 추론 비용이 줄어들면 FSD 구독 수익성이 더 좋아지는 거거든요. Elon이 DeepSeek에 관심 갖는 이유가 비용 구조 최적화예요.", createdAt: T24J - 44*60_000, likes: 57 },
  ],
  330: [
    { id: 1, nickname: "익명_6291", holdingLabel: "150주 보유", content: "$10K 이하 원가로 Optimus 만들면 $20K 판매가에 마진 50%예요. 아이폰 마진이 40%인데 Optimus가 그 이상이에요. 대중화 가격으로 이 마진 달성하면 Tesla 로봇 사업 이익률이 경이로운 수준이에요.", createdAt: T24J - 7*60_000, likes: 113 },
    { id: 2, nickname: "익명_4812", holdingLabel: "관심종목", content: "중국 공급망 지정학 리스크가 실제로 터지면 공급망 다변화 비용이 생기지만 그 전까지는 가격 경쟁력이 진입 장벽이에요. 경쟁사가 같은 가격으로 로봇 못 만들면 Tesla가 시장 선점하는 거예요.", createdAt: T24J - 21*60_000, likes: 88 },
    { id: 3, nickname: "익명_2917", holdingLabel: "50주 보유", content: "BYD·Foxconn·CATL이 공급망이면 Tesla가 중국 생태계를 역이용하는 거예요. 중국에서 부품 사서 로봇 만들어 전 세계에 파는 구조예요. 미국 무역 정책 리스크는 있지만 비용 우위가 워낙 커서 단기엔 이게 맞는 전략이에요.", createdAt: T24J - 38*60_000, likes: 67 },
  ],
  331: [
    { id: 1, nickname: "익명_5183", holdingLabel: "관심종목", content: "6개월에 2,200만 순증이면 연환산 4,400만 순증이에요. 이 속도 유지되면 내년 말 1.5억 가입자예요. 가입자당 평균 단가 월 $100 기준으로도 연간 매출 $180B이에요. Starlink 단독으로 애플급 회사예요.", createdAt: T24J - 14*60_000, likes: 98 },
    { id: 2, nickname: "익명_9281", holdingLabel: "관심종목", content: "Direct-to-Cell이 확대되면 스마트폰 유저 전부가 잠재 Starlink 고객이에요. 별도 장비 없이 기존 폰으로 연결되면 진입 장벽이 거의 없어지는 거예요. 가입자 성장 S커브가 다시 가팔라질 수 있어요.", createdAt: T24J - 33*60_000, likes: 76 },
  ],
  332: [
    { id: 1, nickname: "익명_4712", holdingLabel: "70주 보유", content: "서버 이전이 완료되면 FSD 응답속도가 눈에 띄게 좋아질 거예요. 지연시간이 100ms에서 20ms로 줄면 체감 차이가 커요. 한국 유저들이 FSD 경험하면 구독 전환율이 높아지는 게 자연스러운 흐름이에요.", createdAt: T24J - 17*60_000, likes: 84 },
    { id: 2, nickname: "익명_8391", holdingLabel: "관심종목", content: "한국 규제 승인이 서버 이전 선결 조건이면 이 공지가 FSD 한국 정식 출시 1~2개월 전 신호예요. 한국 오너 50만 명 중 FSD 전환율 20%만 돼도 10만 구독 = 월 $20억원 한국 FSD 매출이에요.", createdAt: T24J - 32*60_000, likes: 63 },
    { id: 3, nickname: "익명_2918", holdingLabel: "30주 보유", content: "한국이 FSD 출시되면 일본·호주·싱가포르도 도미노예요. 아시아 태평양 FSD 확산이 시작되는 거예요. 아·태 시장 FSD 구독 잠재력이 유럽보다 크다고 봐요.", createdAt: T24J - 51*60_000, likes: 49 },
  ],
  333: [
    { id: 1, nickname: "익명_7183", holdingLabel: "220주 보유", content: "6개월 된 서비스가 Waymo 70%까지 쫓아온 거예요. Waymo는 10년이 넘었는데. 학습 속도가 달라요. Tesla 차량에서 올라오는 데이터 양이 Waymo와 비교 자체가 안 되는 거예요. 역전도 시간 문제예요.", createdAt: T24J - 29*60_000, likes: 117 },
    { id: 2, nickname: "익명_5812", holdingLabel: "100주 보유", content: "Q4 1,000만 마일 달성하면 수익성 전환이에요. 마일당 과금 모델에서 고정비 커버되는 시점이거든요. 이게 확인되면 로보택시 사업이 자동차 사업 마진을 뛰어넘는 신호예요.", createdAt: T24J - 47*60_000, likes: 89 },
  ],
  334: [
    { id: 1, nickname: "익명_3819", holdingLabel: "관심종목", content: "100Gbps면 지상 최고 광케이블과 동급이에요. 우주정거장에서 4K 영상 실시간 스트리밍은 기본이고 과학 데이터 대용량 전송이 가능해져요. 우주 연구 생산성이 획기적으로 바뀌는 거예요.", createdAt: T24J - 9*60_000, likes: 78 },
    { id: 2, nickname: "익명_7183", holdingLabel: "관심종목", content: "우주 데이터센터가 현실화되면 SpaceX가 저궤도에서 AWS·Azure와 경쟁하는 거예요. 열 관리·전력 문제가 지구 데이터센터보다 유리할 수 있어요. 장기 스토리만 봐도 SPCX 밸류에이션이 달라져요.", createdAt: T24J - 28*60_000, likes: 61 },
  ],
  335: [
    { id: 1, nickname: "익명_5813", holdingLabel: "관심종목", content: "ARK가 $22M 샀다는 게 공시 데이터예요. 기관이 이 규모로 단기에 집중 매수하는 건 강한 컨빅션 신호예요. Cathie Wood가 틀릴 때도 있지만 우주 섹터 매수는 그간 방향이 맞았어요.", createdAt: T24J - 16*60_000, likes: 103 },
    { id: 2, nickname: "익명_8492", holdingLabel: "관심종목", content: "$300 목표가 2030년까지면 연 14% CAGR이에요. S&P500 장기 수익률 수준인데 우주 섹터 성장성 반영하면 보수적인 추정이에요. ARK가 이 타이밍에 사는 이유가 있는 거예요.", createdAt: T24J - 35*60_000, likes: 81 },
    { id: 3, nickname: "익명_2917", holdingLabel: "관심종목", content: "역발상 매수는 남들이 IPO 흥분 다 식었을 때 사는 거예요. $200에서 $168로 내려왔을 때 ARK가 공격적으로 매수하는 거면 그게 바닥을 만드는 수급이에요. 의미있는 지지선이 형성되는 거예요.", createdAt: T24J - 54*60_000, likes: 62 },
  ],
  // ── 2026-06-23 신규 ──────────────────────────────────────────────────────
  312: [
    { id: 1, nickname: "익명_8291", holdingLabel: "관심종목", content: "3개 신평사 동시 투자등급 받는 게 얼마나 대단한 건지 — 연기금이 이제 SPCX를 의무 편입할 수 있는 조건이 됐어요. 기관 자금이 수백억 달러 급으로 들어올 수 있는 문이 열린 거예요.", createdAt: T23J - 3*60_000, likes: 87 },
    { id: 2, nickname: "익명_4712", holdingLabel: "관심종목", content: "채권 발행 금리도 투기등급보다 1~2% 낮아지는 게 수십억 달러 발행하면 연 수천만 달러 이자 절감이에요. 재무 최적화 측면에서도 엄청난 이벤트예요.", createdAt: T23J - 18*60_000, likes: 63 },
    { id: 3, nickname: "익명_6183", holdingLabel: "관심종목", content: "Moody's Baa1이 S&P BBB+보다 한 단계 높다는 게 포인트예요. 세 곳 다 Stable outlook이니까 단기 강등 위험도 없어요. SpaceX 재무 구조가 진짜 탄탄하다는 증거죠.", createdAt: T23J - 35*60_000, likes: 52 },
  ],
  313: [
    { id: 1, nickname: "익명_9341", holdingLabel: "관심종목", content: "6개월에 $66B 늘었다는 게 진짜 실감이 안 나요. Starlink 가입자가 얼마나 되는 거길래 이런 현금이 쌓이는 건지. 위성 인터넷 구독 사업의 규모를 다시 생각하게 되네요.", createdAt: T23J - 8*60_000, likes: 74 },
    { id: 2, nickname: "익명_2847", holdingLabel: "관심종목", content: "$100B이면 Apple·Microsoft 급 현금이잖아요. SpaceX가 BigTech 재무 수준에 도달했다는 거예요. 이 현금으로 무엇을 인수할지 기대되는데 Cursor $80B 인수가 가능한 이유도 여기 있었군요.", createdAt: T23J - 29*60_000, likes: 58 },
  ],
  314: [
    { id: 1, nickname: "익명_5194", holdingLabel: "200주 보유", content: "Jefferies가 $375 내면서 '멀티버티컬 AI 플랫폼'이라고 표현한 게 핵심이에요. 자동차+로보택시+로봇+FSD+에너지 각각이 독립된 성장 스토리인데 현재 주가는 이걸 다 반영 안 해요.", createdAt: T23J - 5*60_000, likes: 91 },
    { id: 2, nickname: "익명_7182", holdingLabel: "100주 보유", content: "목표주가 상향 애널들이 계속 나오는데 이게 기관 자금 유입의 전조예요. 분석 커버리지 늘어나고 목표주가 올라가면 패시브 펀드 비중도 자연스럽게 늘어요.", createdAt: T23J - 22*60_000, likes: 67 },
    { id: 3, nickname: "익명_3829", holdingLabel: "50주 보유", content: "FSD 구독 142만 × $99/월이면 연간 $17억이에요. 이게 마진 80%이면 영업이익 $13억이에요. 소프트웨어 회사 밸류에이션(P/E 30~40x)으로 보면 $400~$500억 가치예요. 테슬라 현재 PER에서 이 부분만 해도 주가 기여가 크네요.", createdAt: T23J - 40*60_000, likes: 49 },
  ],
  315: [
    { id: 1, nickname: "익명_8473", holdingLabel: "120주 보유", content: "384k 넘으면 단기 강세, 못 미치면 단기 조정인데 저는 넘길 것 같아요. 상하이 생산 속도가 좋고 유럽도 회복 중이에요. 7월 초 발표가 진짜 중요한 카탈리스트예요.", createdAt: T23J - 12*60_000, likes: 68 },
    { id: 2, nickname: "익명_2918", holdingLabel: "40주 보유", content: "CAAM 데이터에서 Tesla만 플러스라는 게 중국 로컬 EV 공세에도 버티는 브랜드 파워를 증명해요. FSD 중국 인증까지 나오면 볼륨이 한 단계 더 올라갈 것 같아요.", createdAt: T23J - 33*60_000, likes: 45 },
  ],
  316: [
    { id: 1, nickname: "익명_6291", holdingLabel: "250주 보유", content: "프리몬트 Model S/X 라인 가동률이 낮아서 어떻게 할지 봤는데 Optimus로 전환하는 게 최선이었네요. 기존 정밀 설비 재활용이니까 신규 공장 짓는 것보다 훨씬 빨리 시작할 수 있어요.", createdAt: T23J - 6*60_000, likes: 104 },
    { id: 2, nickname: "익명_4183", holdingLabel: "관심종목", content: "2027년 외부 판매 시작하면 Tesla 투자자들이 숫자로 볼 수 있게 되는 거예요. 로봇 사업 매출이 실적에 잡히기 시작하면 밸류에이션 계산이 완전히 달라져요. 지금이 담을 마지막 기회일 수 있어요.", createdAt: T23J - 21*60_000, likes: 82 },
    { id: 3, nickname: "익명_9847", holdingLabel: "30주 보유", content: "오스틴 10M대/년 목표가 현실화되면 Tesla가 세계에서 가장 많이 팔리는 제품을 만드는 회사가 되는 거예요. 아이폰 연 2억대도 넘는 규모인데 — 가능하다면 완전히 다른 회사죠.", createdAt: T23J - 45*60_000, likes: 61 },
  ],
  317: [
    { id: 1, nickname: "익명_3817", holdingLabel: "90주 보유", content: "BYD가 -7%인데 Tesla가 +4%면 진짜 대단한 거예요. BYD가 가격 낮추면서 볼륨 확보하는 전략인데도 Tesla한테 밀리는 거잖아요. 중국에서 프리미엄 포지션 지키는 게 장기적으로 마진 유지에 중요해요.", createdAt: T23J - 14*60_000, likes: 57 },
    { id: 2, nickname: "익명_5921", holdingLabel: "60주 보유", content: "유럽 수출까지 포함된 수치라는 게 중요해요. 기가상하이가 중국 내수만 아니라 글로벌 공급 허브 역할이에요. 상하이 생산량이 늘어날수록 TSLA 글로벌 볼륨에 미치는 영향이 크죠.", createdAt: T23J - 38*60_000, likes: 39 },
  ],
  318: [
    { id: 1, nickname: "익명_4293", holdingLabel: "30주 보유", content: "AlphaFold가 단백질 구조 예측을 풀어버린 거잖아요. 수십 년 과학 난제를 AI로 해결한 거예요. 그 사람이 구글 나간다니까 시장이 당황한 거예요. AI 연구 리더십이 흔들리면 Gemini 개발 속도도 영향받을 수밖에 없어요.", createdAt: T23J - 7*60_000, likes: 95 },
    { id: 2, nickname: "익명_8193", holdingLabel: "20주 보유", content: "AI 모델 성능이 수백 명의 탑 연구자에 달려있다는 게 이번에 증명됐네요. 인프라는 복제 가능한데 이 사람들은 대체 불가예요. 앞으로 빅테크 AI 연구 인건비가 천문학적으로 올라갈 것 같아요.", createdAt: T23J - 26*60_000, likes: 72 },
    { id: 3, nickname: "익명_7412", holdingLabel: "50주 보유", content: "Anthropic이 계속 최고 연구자들을 영입하네요. 비상장이지만 Claude 모델 성능이 계속 올라가는 게 이런 인재 확보 덕분이겠죠. 구글 입장에서는 엄청난 타격이에요.", createdAt: T23J - 48*60_000, likes: 54 },
  ],
  319: [
    { id: 1, nickname: "익명_2847", holdingLabel: "60주 보유", content: "Xbox 팔고 Copilot Azure에 집중하겠다는 전략이 맞는 방향이에요. 게임 사업 성장률이 AI 사업이랑 비교가 안 되는데 자원 분산이 아쉬웠거든요. 이게 확정되면 MSFT 포커스가 훨씬 명확해져요.", createdAt: T23J - 16*60_000, likes: 78 },
    { id: 2, nickname: "익명_5913", holdingLabel: "40주 보유", content: "$103.8B 현금에 Xbox 매각 수익까지 더해지면 대형 AI 인수합병 할 탄약이 엄청 생기는 거예요. OpenAI 지분 추가 투자든 다른 AI 스타트업 인수든 — MSFT가 AI에 올인하는 신호로 읽혀요.", createdAt: T23J - 42*60_000, likes: 59 },
  ],
  320: [
    { id: 1, nickname: "익명_7183", holdingLabel: "220주 보유", content: "Joe Tegtmeyer가 현장에서 직접 찍은 거잖아요. 10대가 한 번에 테스트 트랙 도는 장면은 단순 테스트가 아니에요. 이 규모로 집단 주행 테스트하면 실제 서비스 시나리오 검증이에요. 로보택시 상용화 전 단계 맞아요.", createdAt: T23J - 3*60_000, likes: 112 },
    { id: 2, nickname: "익명_4829", holdingLabel: "50주 보유", content: "기가 텍사스 서비스 가동 1주년에 이 장면 나온 게 우연이 아닌 것 같아요. 공개 테스트로 투자자·언론한테 진행 상황 보여주는 거예요. FSD 카메라 신규 버전 탑재도 확인됐으니까 하드웨어도 준비 끝이네요.", createdAt: T23J - 17*60_000, likes: 87 },
    { id: 3, nickname: "익명_6392", holdingLabel: "관심종목", content: "S커브 초입이라는 말이 맞아요. 처음엔 느린데 어느 순간 수직 상승해요. Tesla Semi도 처음엔 느리더니 지금 라스롭 풀 캐파잖아요. 사이버캡도 그 패턴 따라갈 것 같아요.", createdAt: T23J - 38*60_000, likes: 64 },
  ],
  321: [
    { id: 1, nickname: "익명_8471", holdingLabel: "130주 보유", content: "라스롭 풀 캐파면 Q2 Megapack 배송량이 전분기 대비 확실히 늘었다는 거예요. 에너지 사업 매출이 Q1에도 좋았는데 Q2는 더 나올 것 같아요. 자동차 부문 우려 때문에 에너지가 저평가되어 있는 것 같기도 하고요.", createdAt: T23J - 10*60_000, likes: 96 },
    { id: 2, nickname: "익명_3715", holdingLabel: "70주 보유", content: "Tesla Semi 납품이 본격화되면 Semi 고객사들 충전 인프라 투자도 따라와요. Megapack이랑 같이 팔 수 있는 구조예요. 라스롭 두 제품 동시 풀 캐파는 에너지 시너지 효과가 있어요.", createdAt: T23J - 31*60_000, likes: 71 },
  ],
  // ── 2026-06-22 신규 ──────────────────────────────────────────────────────
  288: [
    { id: 1, nickname: "익명_4821", holdingLabel: "관심종목", content: "Cursor 개발자들이 SpaceX 인수 소식에 어떻게 반응하는지 궁금해요. 우주 기업이 개발 도구를 가져가는 게 처음이잖아요. Starlink 인프라 위에서 Cursor가 돌아가면 오지에서도 AI 코딩이 가능해지는 거예요.", createdAt: T22J - 4*60_000, likes: 94 },
    { id: 2, nickname: "익명_7293", holdingLabel: "관심종목", content: "$80B이 비싸 보이지만 Cursor 월 구독자 수백만에 ARR이 상당할 거예요. 인수 후 Starlink 기업 고객에게 Cursor 번들 제공하면 시너지가 엄청날 것 같아요. SaaS 반복 매출 + 위성 인프라 = 완벽한 조합이에요.", createdAt: T22J - 15*60_000, likes: 73 },
    { id: 3, nickname: "익명_2947", holdingLabel: "관심종목", content: "머스크가 xAI Grok + Tesla FSD + SpaceX Cursor까지 AI 생태계 수직통합하는 속도가 놀라워요. 개발자 플랫폼 장악하면 기업 고객 생태계까지 확보하는 거잖아요. SPCX 장기 스토리가 더 강해지는 이벤트예요.", createdAt: T22J - 28*60_000, likes: 58 },
  ],
  289: [
    { id: 1, nickname: "익명_9182", holdingLabel: "관심종목", content: "구독형 SaaS 수익이 SpaceX에 생긴다는 게 포인트예요. 로켓 발사는 발사 때마다 매출이지만 Cursor 구독은 매달 반복이에요. 수익 구조 안정성이 한 단계 올라가는 거예요.", createdAt: T22J - 11*60_000, likes: 67 },
    { id: 2, nickname: "익명_5381", holdingLabel: "관심종목", content: "Starlink 글로벌 망 + Cursor AI 도구 = 어디서든 AI 개발 가능한 플랫폼이에요. 개발도상국 개발자들한테 진짜 혁명적인 접근성이에요. 머스크 'Amazing Abundance' 비전이 여기서도 보여요.", createdAt: T22J - 31*60_000, likes: 49 },
  ],
  290: [
    { id: 1, nickname: "익명_8471", holdingLabel: "200주 보유", content: "Semi LIDAR 보정이 카메라 온리 전략을 버린 게 아니라는 설명이 맞아요. LIDAR로 라벨링 품질을 높이면 카메라 AI 모델이 더 정확해지는 거예요. 보정 도구 = 프로덕션 제품이 아닌 거죠. Tesla의 접근이 영리해요.", createdAt: T22J - 7*60_000, likes: 98 },
    { id: 2, nickname: "익명_3182", holdingLabel: "관심종목", content: "Semi 자율주행 상용화가 되면 화물 운송 비용이 드라마틱하게 낮아져요. 트럭 기사 인건비가 운송 비용의 30~40%인데 자율주행이 대체하면 물류 전체 경제학이 바뀌는 거예요. Tesla가 이 시장 먹으면 엄청난 규모예요.", createdAt: T22J - 19*60_000, likes: 76 },
    { id: 3, nickname: "익명_6293", holdingLabel: "150주 보유", content: "Semi FSD 상용화 = 마일당 과금 모델이에요. 트럭 한 대가 연 20만 마일 × $0.10/마일 = 연 $2만 구독료예요. 100만 대면 연 $200억 반복 매출이에요. 가능성만으로도 밸류에이션이 재평가돼야 해요.", createdAt: T22J - 34*60_000, likes: 61 },
  ],
  291: [
    { id: 1, nickname: "익명_5847", holdingLabel: "100주 보유", content: "DGT 공식 인증이 나온 게 단순 테스트 통과가 아니에요. 규제 기관이 '이 시스템은 안전하다'는 도장을 찍은 거예요. 독일·프랑스 규제 기관이 이걸 무시하기 어려울 거예요. EU FSD 확산이 예상보다 빨라질 수 있어요.", createdAt: T22J - 9*60_000, likes: 104 },
    { id: 2, nickname: "익명_2948", holdingLabel: "관심종목", content: "지구 6.9바퀴를 무사고로 돌았다는 게 직관적으로 설득력 있는 숫자예요. 일반인한테 설명할 때 이 숫자 하나로 충분해요. EU 시장 열리면 FSD 구독 142만이 빠르게 200만+ 가는 시나리오가 가능해요.", createdAt: T22J - 22*60_000, likes: 79 },
    { id: 3, nickname: "익명_7384", holdingLabel: "50주 보유", content: "스페인 테스트가 '도시 복잡 교통 + 고속도로 + 다양한 날씨' 다 포함이에요. 단순 테스트 코스가 아닌 실제 도로라는 게 중요해요. 미국 FSD랑 같은 시스템이 유럽에서도 통한다는 게 증명된 거예요.", createdAt: T22J - 38*60_000, likes: 52 },
  ],
  292: [
    { id: 1, nickname: "익명_4829", holdingLabel: "150주 보유", content: "5분기 3배 성장이 가속되고 있어요. Q3 2026E에 150만, Q4에 175만 가는 게 불가능한 숫자가 아니에요. 유럽 DGT 인증까지 나왔으니까요. 소프트웨어 마진 80%+ 이면 이게 EPS에 직접 찍히는 거예요.", createdAt: T22J - 6*60_000, likes: 112 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "FSD 구독 = 차량 판매와 독립된 소프트웨어 매출이에요. 차를 못 팔아도 기존 차주들이 구독하면 매출이 나오는 구조예요. 경기 침체에도 FSD 구독자는 유지되는 끈끈한 매출이에요. 소프트웨어 전환이 완성되는 거예요.", createdAt: T22J - 18*60_000, likes: 87 },
    { id: 3, nickname: "익명_1947", holdingLabel: "80주 보유", content: "로보택시 출시 전까지 142만 구독자가 쌓이는 거예요. Cybercab 출시하면 기존 FSD 구독자들이 자연스럽게 로보택시 초기 수요로 전환될 것 같아요. FSD 구독 = Cybercab 로보택시 대기자 명단이에요.", createdAt: T22J - 33*60_000, likes: 69 },
  ],
  293: [
    { id: 1, nickname: "익명_8392", holdingLabel: "관심종목", content: "MEGAPOD가 데이터센터 이동형 전력 솔루션으로 쓰인다면 AI 붐 시기에 완벽한 타이밍이에요. 데이터센터 건설보다 ESS 설치가 빠르니까 급한 AI 인프라 전력 수요에 먼저 대응 가능해요.", createdAt: T22J - 14*60_000, likes: 71 },
    { id: 2, nickname: "익명_3917", holdingLabel: "50주 보유", content: "Tesla Energy가 자동차 사업보다 고성장이에요. Megapack 수주 잔고가 몇 달치 백로그인데 MEGAPOD까지 더해지면 TAM이 폭발적으로 커지는 거예요. 에너지 사업이 2027년에 자동차 수준으로 커질 수 있어요.", createdAt: T22J - 37*60_000, likes: 54 },
  ],
  294: [
    { id: 1, nickname: "익명_7284", holdingLabel: "관심종목", content: "2027년 외부 판매 시작이면 이제 1년 남은 거예요. $20,000~30,000 가격대에 제조·물류·서비스업 수요 생각하면 첫 해에도 수요 폭발할 것 같아요. 대기 명단 지금부터 만들어도 될 것 같아요.", createdAt: T22J - 4*60_000, likes: 127 },
    { id: 2, nickname: "익명_5182", holdingLabel: "관심종목", content: "Optimus 100만 대 × $25,000 = $250억 매출에 소프트웨어 구독까지 더하면요. 로봇 사업 P/S 10x 적용 = $2,500억 추가 기업가치예요. 자동차·FSD·에너지·로봇 다 합치면 Tesla 시총이 지금 몇 배가 적당한지 계산이 안 나와요.", createdAt: T22J - 17*60_000, likes: 98 },
    { id: 3, nickname: "익명_9283", holdingLabel: "관심종목", content: "내부 배치 먼저 하는 게 영리해요. 자기 공장에서 로봇이 일하는 영상이 나오면 마케팅 비용 없이 전 세계에 퍼지는 거잖아요. 로봇이 자동차 만드는 영상 하나가 백 번의 발표보다 설득력 있어요.", createdAt: T22J - 31*60_000, likes: 74 },
  ],
  295: [
    { id: 1, nickname: "익명_4827", holdingLabel: "80주 보유", content: "Grok + FSD 통합으로 '목적지 말하면 알아서 가는' 완전 자율주행이 되는 거예요. KITT처럼요. 언어 이해 + 시각 인식 + 행동 AI 통합이 FSD 완성의 마지막 단계예요. 2026~2027년 안에 이게 현실이 될 것 같아요.", createdAt: T22J - 16*60_000, likes: 89 },
    { id: 2, nickname: "익명_2947", holdingLabel: "관심종목", content: "Waymo는 구글 AI + 자율주행이 따로 있는데 Tesla는 Grok·Dojo·FSD가 같은 생태계예요. 데이터가 Grok에서 FSD로 흐르고 다시 학습에 활용되는 선순환이 경쟁사가 따라올 수 없는 구조예요.", createdAt: T22J - 35*60_000, likes: 67 },
  ],
  296: [
    { id: 1, nickname: "익명_6284", holdingLabel: "50주 보유", content: "'Amazing Abundance'가 에너지·로봇·이동성 통합 서비스 브랜드가 된다면 Tesla가 B2C 플랫폼 기업으로 완전히 자리잡는 거예요. 자동차 회사 프레임으로 보던 분들이 이 브랜드 나오면 인식이 바뀔 것 같아요.", createdAt: T22J - 19*60_000, likes: 63 },
    { id: 2, nickname: "익명_8374", holdingLabel: "관심종목", content: "Optimus + FSD + Megapack 묶어서 기업 고객한테 '풍요 패키지' 파는 게 가능하지 않을까요? 생산 자동화 + 물류 자율화 + 에너지 자립 한 번에 해주는 솔루션이요. B2B 엔터프라이즈 비즈니스로 가는 거예요.", createdAt: T22J - 42*60_000, likes: 47 },
  ],
  297: [
    { id: 1, nickname: "익명_3947", holdingLabel: "관심종목", content: "$22.9억이 단일 계약인 게 대단해요. Space Force가 Starlink 군사용에 이정도 쓴다는 게 미군이 위성 통신 표준으로 채택했다는 거잖아요. NATO 동맹국들이 같은 시스템 원할 때 확장이 자동으로 되는 구조예요.", createdAt: T22J - 7*60_000, likes: 97 },
    { id: 2, nickname: "익명_7182", holdingLabel: "관심종목", content: "군사용 Starlink가 저지연·암호화·재밍 저항까지 되면 기존 군사 통신 위성 대비 월등하잖아요. DoD가 계속 계약 늘리면 정부 부문 안정 매출이 $50억+/년 추정이에요. SpaceX 수익 안정성이 확보되는 거예요.", createdAt: T22J - 21*60_000, likes: 73 },
    { id: 3, nickname: "익명_5291", holdingLabel: "관심종목", content: "상업 + 정부 + 군사 3층 수익 구조가 다 갖춰지는 거예요. 어느 하나가 흔들려도 다른 두 개로 버틸 수 있는 포트폴리오예요. SpaceX 기업가치 $350B+ 정당화 논리가 이렇게 쌓이는 거예요.", createdAt: T22J - 38*60_000, likes: 58 },
  ],
  298: [
    { id: 1, nickname: "익명_8492", holdingLabel: "관심종목", content: "AI 위성이 실현되면 우주에서 AI 추론하는 시대가 오는 거예요. 지상 데이터센터가 필요 없어지는 영역이 생기는 거잖아요. AWS·Azure·GCP의 지상 클라우드와 SpaceX 우주 클라우드가 경쟁하는 시대예요. 엄청난 패러다임 전환이에요.", createdAt: T22J - 13*60_000, likes: 108 },
    { id: 2, nickname: "익명_4728", holdingLabel: "관심종목", content: "V3 테라비트 속도만 돼도 엔터프라이즈 고객 대거 유입이에요. 거기에 AI 온보드까지 되면 Starlink가 단순 인터넷 서비스를 넘어 엣지 AI 컴퓨팅 인프라로 진화하는 거예요. ARPU가 지금의 10배도 가능한 시나리오예요.", createdAt: T22J - 27*60_000, likes: 84 },
    { id: 3, nickname: "익명_1947", holdingLabel: "관심종목", content: "Starship이 V3 위성 대량 배치하는 비용 혁신이 이걸 가능하게 해요. 기존 발사 비용으로는 이런 위성 숫자가 불가능했는데 Starship 재사용이 게임 체인저예요. SpaceX만 할 수 있는 이유예요.", createdAt: T22J - 44*60_000, likes: 62 },
  ],
  299: [
    { id: 1, nickname: "익명_6382", holdingLabel: "관심종목", content: "B2B2C 모델이라 SpaceX는 마케팅 비용 없이 US Mobile 기존 고객을 확보하는 거예요. 통신사들이 앞다퉈 Starlink 협력하려는 이유가 커버리지 격차를 메워야 하기 때문이에요. 위성이 지상 통신사 인프라 보완재가 된 거예요.", createdAt: T22J - 22*60_000, likes: 79 },
    { id: 2, nickname: "익명_9183", holdingLabel: "관심종목", content: "150개국이면 진정한 글로벌 통신 인프라예요. 어느 나라 가도 Starlink 하나로 연결되는 시대가 오는 거잖아요. 여행자·선원·원정대 등 이동성 높은 사용자들한테 독점적 서비스예요. 구독 해지율이 낮을 수밖에 없어요.", createdAt: T22J - 48*60_000, likes: 59 },
  ],
  300: [
    { id: 1, nickname: "익명_5847", holdingLabel: "80주 보유", content: "QQQ가 $3,000억 AUM이면 RKLB 비중에 따라 수억 달러 자동 매수예요. 패시브 자금 유입이 강제 매수라서 단기 주가 상승 압력이 생겨요. 지수 편입 발표부터 실제 편입일까지 모멘텀이 지속되는 패턴이에요.", createdAt: T22J - 8*60_000, likes: 116 },
    { id: 2, nickname: "익명_3291", holdingLabel: "관심종목", content: "우주 섹터가 NASDAQ100에 편입된다는 게 우주가 이제 주류 산업이 됐다는 신호예요. RKLB·SPCX 투자자들한테 정당성 증명이에요. 다음엔 S&P500 편입도 기대할 수 있는 거잖아요.", createdAt: T22J - 22*60_000, likes: 87 },
    { id: 3, nickname: "익명_7492", holdingLabel: "60주 보유", content: "CRWV·ALAB·NBIS까지 AI 인프라 3종과 함께 편입되는 게 AI+우주 테마의 지수 공식 인정이에요. 이 종목들이 다 같이 올라가는 환경이 만들어지는 거예요. QQQ 추종 투자자들이 강제로 사줘야 하는 구조예요.", createdAt: T22J - 39*60_000, likes: 64 },
  ],
  301: [
    { id: 1, nickname: "익명_4839", holdingLabel: "60주 보유", content: "뉴트론 엔진 개발이 마무리 단계라는데 거기에 NASDAQ100 편입 모멘텀까지 더해지면 RKLB 2026 하반기가 기대돼요. Electron 성공률 97%+로 신뢰도 이미 증명됐고요.", createdAt: T22J - 17*60_000, likes: 82 },
    { id: 2, nickname: "익명_8293", holdingLabel: "관심종목", content: "부품 사업(태양전지판·통신 장비)이 마진이 좋아요. 발사 사업만 있는 회사로 보는 사람들이 많은데 이미 다각화된 우주 부품 기업이에요. 지수 편입으로 인지도 올라가면 이 부분 재평가가 올 것 같아요.", createdAt: T22J - 41*60_000, likes: 61 },
  ],
  302: [
    { id: 1, nickname: "익명_7382", holdingLabel: "40주 보유", content: "Walmart 추월이 상징적인 거지만 실질적으로 더 중요한 건 AWS+광고 사업이에요. 커머스 매출 1위 + 클라우드 1위 + 광고 3위를 한 회사가 들고 있는 게 AMZN이잖아요. 이 조합을 복제할 수 있는 회사가 없어요.", createdAt: T22J - 11*60_000, likes: 108 },
    { id: 2, nickname: "익명_2947", holdingLabel: "관심종목", content: "플라이휠 효과가 완성됐다는 표현이 맞아요. 커머스 데이터 → 광고 타겟팅 정확도 → 광고 수익 → 프라임 투자 → 커머스 강화 → 다시 시작. 이 루프가 돌아갈수록 경쟁사가 따라오기 더 어려워져요.", createdAt: T22J - 26*60_000, likes: 82 },
    { id: 3, nickname: "익명_5182", holdingLabel: "45주 보유", content: "$7,170억이면 한국 GDP의 절반이에요. 미국 한 기업이 이걸 달성했다는 게 스케일이 다른 거예요. AWS 백로그 $4,800억까지 더하면 3~4년 매출 가시성도 확보예요. 지금 PE가 진짜 말이 안 되게 낮아요.", createdAt: T22J - 43*60_000, likes: 67 },
  ],
  303: [
    { id: 1, nickname: "익명_9284", holdingLabel: "35주 보유", content: "백로그 = 이미 계약 완료된 미래 매출이에요. AWS $4,800억이면 3~4년치가 잠긴 거예요. 경기 침체가 와도 이미 약정된 계약이 있으니까 매출이 급락하기 어려운 구조예요. 방어적 성장주로 봐야 해요.", createdAt: T22J - 18*60_000, likes: 84 },
    { id: 2, nickname: "익명_6391", holdingLabel: "관심종목", content: "Azure +215% 백로그 성장이 OpenAI 파트너십 효과예요. Microsoft가 OpenAI 독점 공급하는 구조라 AI 수요가 다 Azure로 가는 거예요. GCP도 $2,600억인데 구글 Gemini 수요 반영이에요. 클라우드 3강 다 같이 사상 최대예요.", createdAt: T22J - 39*60_000, likes: 61 },
  ],
  304: [
    { id: 1, nickname: "익명_4728", holdingLabel: "50주 보유", content: "영업이익 $1.3B에서 $15.7B은 10배 이상이에요. AI HBM이 이걸 만든 거예요. NVDA GPU 한 개에 HBM이 몇 십 개 들어가는데 GB200 Blackwell 기준 HBM3E 탑재량이 더 늘었어요. NVDA 출하 늘수록 MU 매출 자동으로 늘어나요.", createdAt: T22J - 9*60_000, likes: 94 },
    { id: 2, nickname: "익명_8392", holdingLabel: "40주 보유", content: "Samsung·SK하이닉스·Micron 3강 체제인데 Micron이 에너지 효율 30%+ 우위 있다는 게 NVDA가 왜 Micron 쓰는지 설명이 돼요. HBM3E 양산 확대 중이라 이 우위가 점유율로 이어질 수 있어요.", createdAt: T22J - 24*60_000, likes: 72 },
    { id: 3, nickname: "익명_2947", holdingLabel: "관심종목", content: "메모리 사이클 + HBM 수요 증가가 같은 방향이에요. 사이클 상단에서 HBM 프리미엄까지 더해지면 MU 피크 EPS가 예상보다 훨씬 높을 수 있어요. 지금 매수해서 사이클 타는 전략이 유효해요.", createdAt: T22J - 41*60_000, likes: 56 },
  ],
  305: [
    { id: 1, nickname: "익명_6291", holdingLabel: "30주 보유", content: "역사적 저점 PE에 HBM 프리미엄 미반영이면 이중 저평가예요. 중국 제재 리스크는 있지만 미국 기업 쪽 수요가 워낙 강하니까요. 시장이 MU를 여전히 구형 메모리 기업으로 보는 것 같아서 기회인 것 같아요.", createdAt: T22J - 19*60_000, likes: 69 },
    { id: 2, nickname: "익명_5382", holdingLabel: "관심종목", content: "DRAM 가격 지표 보면 아직 상승 여력 있어요. AI 서버 DRAM 수요가 일반 PC DRAM 감소를 상쇄하고도 남는 구조예요. AI 사이클이 계속되는 한 MU 업황 개선 트렌드가 꺾이기 어려워요.", createdAt: T22J - 45*60_000, likes: 51 },
  ],
  306: [
    { id: 1, nickname: "익명_8471", holdingLabel: "70주 보유", content: "PVGO 35.3%면 주가의 64.7%가 현재 이익으로 설명돼요. 성장 기대가 낮게 반영된 거잖아요. Meta AI가 매출로 찍히기 시작하면 PVGO 올라가고 주가 재평가 나오는 구조예요. 지금 사면 두 번 수익 나는 거예요.", createdAt: T22J - 5*60_000, likes: 103 },
    { id: 2, nickname: "익명_3947", holdingLabel: "관심종목", content: "Reality Labs 연간 $150억 적자가 PVGO를 낮추는 이유예요. 그 적자가 메타버스·AI 미래에 베팅하는 건데 시장이 비관적으로 보는 거예요. 이 적자가 수익화로 전환되는 순간 주가 반응이 클 거예요.", createdAt: T22J - 18*60_000, likes: 78 },
    { id: 3, nickname: "익명_7182", holdingLabel: "50주 보유", content: "S&P500 평균 PVGO 55%보다 낮은 성장 프리미엄에 실제 성장률은 S&P500 평균보다 높아요. 저평가 수학이 완벽하게 성립해요. META + MSFT 동시 매수가 지금 가장 좋은 기회일 것 같아요.", createdAt: T22J - 34*60_000, likes: 62 },
  ],
  307: [
    { id: 1, nickname: "익명_4829", holdingLabel: "60주 보유", content: "RPO $700B + PVGO 저평가 + Copilot 수익화 가속화 — MSFT 지금 상태가 진짜 이상하게 싸요. 방어적 성장주에 AI 옵션가치까지 공짜로 담겨 있는 거잖아요. 기관들이 MSFT를 anchor로 들고 가는 이유예요.", createdAt: T22J - 14*60_000, likes: 87 },
    { id: 2, nickname: "익명_6283", holdingLabel: "관심종목", content: "Copilot $30/월 × Fortune 500 70% 도입이면 연 수십억 달러 구독 매출이에요. PVGO가 올라가려면 이 수익이 EPS에 본격 반영돼야 하는데 2026 하반기~2027이 그 시점이에요. 지금 매수 타이밍이에요.", createdAt: T22J - 38*60_000, likes: 66 },
  ],
  308: [
    { id: 1, nickname: "익명_5829", holdingLabel: "30주 보유", content: "버핏이 기술주 회의론자인데 GOOGL 편입한다는 게 진짜 강력한 신호예요. 단순 트레이딩이 아니라 가치투자 기준 통과했다는 뜻이잖아요. 버크셔 포트폴리오 추종하는 패시브 자금들이 GOOGL 비중 늘리는 효과도 있어요.", createdAt: T22J - 8*60_000, likes: 119 },
    { id: 2, nickname: "익명_2947", holdingLabel: "관심종목", content: "AI 검색 독점+YouTube+GCP 세 수익원이 서로 강화해요. 검색이 YouTube로 이어지고 GCP가 광고 인프라 역할하고 — 버핏이 좋아하는 '해자'가 세 겹이에요. 하나 망해도 두 개 남는 구조예요.", createdAt: T22J - 22*60_000, likes: 93 },
    { id: 3, nickname: "익명_8391", holdingLabel: "25주 보유", content: "Gemini가 GPT-4에 대항하고 TPU로 AI 비용도 낮추는 중이에요. 버핏이 사고 AI도 강화하고 있으면 GOOGL이 AI 시대에서도 살아남는 게 아니라 더 강해지는 거예요. Top 5 편입이 당연한 결론이에요.", createdAt: T22J - 39*60_000, likes: 71 },
  ],
  309: [
    { id: 1, nickname: "익명_7382", holdingLabel: "25주 보유", content: "PVGO 47.8%로 S&P500 55% 대비 낮은 게 버핏이 찾는 '성장 프리미엄 안 비싼 성장주'예요. GOOGL 실제 성장률은 S&P500 평균보다 훨씬 높은데 프리미엄이 낮으니 저평가예요. 버핏이 틀린 적 별로 없잖아요.", createdAt: T22J - 16*60_000, likes: 84 },
    { id: 2, nickname: "익명_4193", holdingLabel: "관심종목", content: "패시브 투자자들이 버크셔 포트폴리오 따라 하는 경우 많잖아요. GOOGL 편입 공개되면 그 자금들이 들어오는 부가 효과도 있어요. 펀더멘털 + 수급 모두 좋아지는 상황이에요.", createdAt: T22J - 41*60_000, likes: 63 },
  ],
  310: [
    { id: 1, nickname: "익명_3847", holdingLabel: "관심종목", content: "10배 발언이 빈말이 아닌 게 2030~2035 타임라인을 구체적으로 제시했기 때문이에요. 무책임한 낙관론이 아니라 18A/14A 공정 개발 일정이 있고 파운드리 분리가 진행 중이에요. 단기 고통 = 장기 수익 구조예요.", createdAt: T22J - 11*60_000, likes: 94 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "CHIPS Act + 정부 지원 + 지정학 리스크 헤지 수요 — Intel이 유리한 환경이에요. TSMC 지정학 리스크 의식하는 빅테크가 하나라도 Intel 파운드리 계약하면 스토리가 현실이 되는 거예요.", createdAt: T22J - 25*60_000, likes: 73 },
    { id: 3, nickname: "익명_8493", holdingLabel: "관심종목", content: "2030 이전 인내가 필요한 투자인데 그 인내의 근거가 CEO가 직접 팟캐스트에 나와서 설명하는 거예요. 투명성 측면에서 좋아요. 장기 투자자들이 중간에 흔들리지 않을 수 있는 서사를 만들어주는 거예요.", createdAt: T22J - 43*60_000, likes: 57 },
  ],
  311: [
    { id: 1, nickname: "익명_2948", holdingLabel: "관심종목", content: "18A 공정 수율이 핵심이에요. TSMC도 새 공정 수율 잡는 데 시간 걸렸잖아요. Intel이 수율 문제만 해결하면 가격 경쟁력은 이미 있어요. 미국산 칩 프리미엄까지 더해지면요. 2027~2028이 가늠자예요.", createdAt: T22J - 19*60_000, likes: 78 },
    { id: 2, nickname: "익명_5182", holdingLabel: "관심종목", content: "$131까지 온 게 이미 시장이 회복 스토리를 인정하기 시작한 거예요. 10배 발언이 현실이 되려면 CEO 임기 동안 꾸준히 실행해야 하는데 No Profits 팟캐스트 나와서 직접 소통하는 스타일이 좋은 신호예요.", createdAt: T22J - 46*60_000, likes: 59 },
  ],

  // ── 2026-06-20 신규 ──────────────────────────────────────────────────────
  274: [
    { id: 1, nickname: "익명_7284", holdingLabel: "80주 보유", content: "EPA COC가 있으면 이제 Cybercab이 모든 50개 주에서 운행 가능한 기본 조건이 충족된 거예요. 로보택시 허가는 각 주 도로교통부 관할이지만 연방 EPA 인증은 기본 중의 기본이에요.", createdAt: T20J - 4*60_000, likes: 88 },
    { id: 2, nickname: "익명_3918", holdingLabel: "150주 보유", content: "150,000마일 내구수명이 로보택시 관점에서 중요해요. 24/7 운행하면 연간 10만 마일 이상 가능한데 최소 1.5년 완전 운행이에요. Cybercab 단가 낮춰서 fleet 공격적으로 구성할 수 있어요.", createdAt: T20J - 14*60_000, likes: 67 },
    { id: 3, nickname: "익명_5293", holdingLabel: "관심종목", content: "COC 발급일 05/26인데 지금 6/20이잖아요. 한 달 가까이 비공개로 있었던 거예요. 공식 발표 나오면 주가 모멘텀 생길 것 같아요. 2개월이면 8월인데 여름 방학 시즌에 오스틴 로보택시 정식 서비스 론칭 가능한 거예요.", createdAt: T20J - 24*60_000, likes: 54 },
  ],
  275: [
    { id: 1, nickname: "익명_2847", holdingLabel: "관심종목", content: "로보택시 vs Cybercab 라벨 혼용이 Tesla 내부에서 정리되는 과정인 것 같아요. Cybercab이 공식 상품명으로 확정된 거잖아요. 브랜딩 정리가 되면 소비자 혼란이 줄어요.", createdAt: T20J - 10*60_000, likes: 44 },
    { id: 2, nickname: "익명_6182", holdingLabel: "관심종목", content: "Model Y를 Cybercab으로 전환하는 게 전용 Cybercab 양산 전에 기존 차량으로 fleet 채우는 전략이에요. 운영 데이터 쌓으면서 전용 차량 투입하는 단계적 접근이에요.", createdAt: T20J - 27*60_000, likes: 36 },
  ],
  276: [
    { id: 1, nickname: "익명_8471", holdingLabel: "200주 보유", content: "기가캐스팅이 조립 원가 혁신했고, 이번 Liquid Armor가 도장 원가 없애면 Tesla 제조 원가가 또 한 번 구조적으로 낮아지는 거예요. 경쟁사들이 따라오려면 수 년 걸릴 거예요.", createdAt: T20J - 7*60_000, likes: 91 },
    { id: 2, nickname: "익명_5283", holdingLabel: "관심종목", content: "전자 필름이 페인트샵을 대체하면 환경 규제 VOC 배출 이슈도 없어지는 거예요. 페인트 VOC 규제가 공장 운영 비용에 상당히 영향 줬는데 그게 통째로 없어지는 거예요.", createdAt: T20J - 18*60_000, likes: 67 },
    { id: 3, nickname: "익명_9374", holdingLabel: "60주 보유", content: "'도장공장 없는 자동차 공장'은 Tesla 이전에 상상도 못 했어요. 이걸 실현하면 자동차 제조 패러다임이 완전히 바뀌는 거예요. 원가 경쟁력 격차가 더 벌어지는 거예요.", createdAt: T20J - 32*60_000, likes: 52 },
  ],
  277: [
    { id: 1, nickname: "익명_4827", holdingLabel: "관심종목", content: "ARK가 22.6x 할인이라고 분석하는 게 EPS 기준 2007년보다 싸다는 뜻이잖아요. FSD + Optimus + Energy 다 포함하면 $2,600 목표가 불가능한 숫자도 아니에요.", createdAt: T20J - 15*60_000, likes: 73 },
    { id: 2, nickname: "익명_7192", holdingLabel: "70주 보유", content: "Cathie Wood가 추가 매수하는 타이밍이 항상 논란이지만 결국 장기적으로 맞는 경우가 많았어요. 이 가격에서 추가 베팅한다는 게 ARK의 확신이에요.", createdAt: T20J - 29*60_000, likes: 58 },
  ],
  278: [
    { id: 1, nickname: "익명_3847", holdingLabel: "80주 보유", content: "SpaceX가 Moody's Baa1 받고 $20B 채권 발행한 게 바로 어제예요. Tesla도 신용등급 올라가면 같은 구조로 저비용 자본 조달 가능해요. $40B+ 들고 무부채 기업이 AAA급이라고 봐도 되는 거잖아요.", createdAt: T20J - 20*60_000, likes: 62 },
    { id: 2, nickname: "익명_6391", holdingLabel: "관심종목", content: "신용평가사들이 자동차 기업 프레임으로 Tesla를 평가하는 게 문제예요. 에너지+소프트웨어+AI 기업 프리미엄을 반영하면 완전히 다른 등급이 나와야 해요.", createdAt: T20J - 38*60_000, likes: 47 },
  ],
  279: [
    { id: 1, nickname: "익명_2938", holdingLabel: "관심종목", content: "Day 366에 일론 46.1%가 한꺼번에 해제되는 게 투자자 입장에서 가장 민감한 순간이에요. 이미 알고 있는 이벤트라 시장이 미리 반영하는 경향도 있어요.", createdAt: T20J - 6*60_000, likes: 97 },
    { id: 2, nickname: "익명_5183", holdingLabel: "관심종목", content: "락업 해제 스케줄이 공개됐다는 게 투명성 측면에서 좋아요. 서프라이즈 없이 예측 가능하게 유동성이 늘어나는 구조면 시장도 적응하기 쉬워요.", createdAt: T20J - 18*60_000, likes: 68 },
    { id: 3, nickname: "익명_8374", holdingLabel: "관심종목", content: "초기 4.9% 유동성에서 단계적으로 늘어나는 구조가 Facebook IPO와 비슷해요. Facebook이 락업 해제 후 오히려 주가 올랐던 것처럼 기관들이 기다리다가 진입할 수 있어요.", createdAt: T20J - 32*60_000, likes: 51 },
  ],
  280: [
    { id: 1, nickname: "익명_6284", holdingLabel: "관심종목", content: "86%가 2위보다 13배 이상 앞서는 거잖아요. 경쟁이라고 부를 수 있는 수준이 아니에요. 팔콘 9 재사용 경제성이 만들어내는 구조적 해자예요.", createdAt: T20J - 9*60_000, likes: 84 },
    { id: 2, nickname: "익명_4819", holdingLabel: "관심종목", content: "중국 CASC가 2위지만 40,980kg밖에 안 돼요. SpaceX 수준의 상업화는 아직 멀었다는 신호예요. Starship 완전 상업화되면 이 격차가 90%+로 더 벌어질 거예요.", createdAt: T20J - 22*60_000, likes: 61 },
    { id: 3, nickname: "익명_2937", holdingLabel: "관심종목", content: "Q1 데이터에 Starship 상업 발사가 아직 포함 안 됐을 거예요. Starship 정식 상업 발사 시작하면 SpaceX 비율이 90%+ 로 올라갈 거예요. 이 수치가 더 커지는 거예요.", createdAt: T20J - 37*60_000, likes: 45 },
  ],
  281: [
    { id: 1, nickname: "익명_7483", holdingLabel: "관심종목", content: "Deutsche Telekom이 Starlink와 협력한다는 게 통신사가 위성을 경쟁자가 아니라 인프라 레이어로 인식하기 시작한 거예요. 기존 통신사 비즈니스 모델이 흔들리는 신호예요.", createdAt: T20J - 14*60_000, likes: 73 },
    { id: 2, nickname: "익명_3192", holdingLabel: "관심종목", content: "30개국에서 이미 연결 중인데 유럽 50개국까지 확대되면 글로벌 커버리지 사실상 완성이에요. 오지나 재난 지역 통신은 이제 Starlink가 표준이 될 거예요.", createdAt: T20J - 29*60_000, likes: 54 },
  ],
  282: [
    { id: 1, nickname: "익명_5827", holdingLabel: "관심종목", content: "Tesla 기가팩토리 옆에 AI 칩 공장이 생기면 Tesla 자동차에 들어가는 FSD 칩 공급망이 자체적으로 완성되는 거예요. TSMC 의존도 제로가 될 수 있어요.", createdAt: T20J - 11*60_000, likes: 98 },
    { id: 2, nickname: "익명_9283", holdingLabel: "관심종목", content: "SpaceX + xAI + Tesla 삼각 협력이 물리적으로 한 곳에 모인다는 게 시너지가 엄청날 거예요. AI 모델 → 칩 설계 → 제조 → 탑재까지 원스톱이에요.", createdAt: T20J - 24*60_000, likes: 75 },
    { id: 3, nickname: "익명_3847", holdingLabel: "80주 보유", content: "$250B 프로젝트가 진짜인지 의심했는데 드론 사진 나왔어요. 부지 공사가 시작됐다는 게 이제 현실이에요. Giga Texas가 자동차+에너지+AI 칩 복합 단지가 되는 거예요.", createdAt: T20J - 40*60_000, likes: 62 },
  ],
  283: [
    { id: 1, nickname: "익명_8472", holdingLabel: "200주 보유", content: "74%면 독점에 가깝잖아요. AMD+Intel+아마존+커스텀 칩 다 합쳐서 26%예요. NVDA 하드웨어 생태계가 너무 깊이 자리잡혀서 교체 비용이 천문학적이에요.", createdAt: T20J - 8*60_000, likes: 112 },
    { id: 2, nickname: "익명_5193", holdingLabel: "80주 보유", content: "추론 시장이 학습 시장보다 훨씬 크게 성장한다는 전망인데 거기서도 74%면 진짜 수혜자예요. AI 서비스 사용자가 늘수록 추론 수요가 기하급수적으로 늘어나거든요.", createdAt: T20J - 19*60_000, likes: 87 },
    { id: 3, nickname: "익명_2846", holdingLabel: "관심종목", content: "Q1 2025 66% → Q1 2026 74%면 경쟁사들이 커지는 속도보다 NVDA가 더 빠르게 크고 있어요. '점유율 방어'가 아니라 '점유율 확장'이에요. 이게 핵심이에요.", createdAt: T20J - 33*60_000, likes: 69 },
  ],
  284: [
    { id: 1, nickname: "익명_6284", holdingLabel: "40주 보유", content: "Amazon이 Trainium 외부 판매 시작하면 데이터센터 고객들에게 선택지가 생기는 거예요. NVDA 가격 협상력이 조금이라도 낮아질 수 있어요. 경쟁이 생기는 게 고객 입장에선 좋아요.", createdAt: T20J - 16*60_000, likes: 67 },
    { id: 2, nickname: "익명_4193", holdingLabel: "관심종목", content: "OpenAI $5B, Anthropic $1B 약정이 흥미롭잖아요. AI 모델 회사들이 NVDA 대안을 적극적으로 찾고 있다는 신호예요. Trainium이 가격 경쟁력 있으면 빠르게 점유율 가져갈 거예요.", createdAt: T20J - 30*60_000, likes: 52 },
  ],
  285: [
    { id: 1, nickname: "익명_7284", holdingLabel: "30주 보유", content: "AWS가 $25.66B에서 $137B까지 6배 성장이 채 10년이 안 됐어요. AI 클라우드 수요 추가되면 $200B 넘는 게 멀지 않을 거예요. Trainium 외판까지 더해지면요.", createdAt: T20J - 22*60_000, likes: 58 },
    { id: 2, nickname: "익명_9183", holdingLabel: "관심종목", content: "AWS가 $137B이면 Microsoft Azure + Google Cloud 합산에 근접하는 수준이에요. 클라우드 3강이 AI로 다 같이 크는 시장이에요. AMZN 저평가 논리가 여기서 나오는 거예요.", createdAt: T20J - 41*60_000, likes: 44 },
  ],
  286: [
    { id: 1, nickname: "익명_3948", holdingLabel: "관심종목", content: "2단계 급락 시점에 공포에 팔지 않는 게 핵심이에요. Tom Lee가 '불장이지만 베어마켓처럼 느껴진다'고 한 게 많은 사람들이 그때 팔 거라는 뜻이에요. 그 구간이 오히려 매수 기회예요.", createdAt: T20J - 12*60_000, likes: 103 },
    { id: 2, nickname: "익명_5729", holdingLabel: "관심종목", content: "Anthropic + OpenAI IPO 언락이 처음 들었는데 생각해보면 맞아요. VC + 직원 지분이 다 시장에 나오면 AI 섹터 전반에 영향 줄 수 있어요. 이 변수 알고 있어야 해요.", createdAt: T20J - 26*60_000, likes: 78 },
    { id: 3, nickname: "익명_1847", holdingLabel: "관심종목", content: "3단계 강한 회복이 맞다면 지금부터 적립식 들어가는 게 최선이에요. 정확한 타이밍 맞추려다 구간 다 놓치는 것보다 꾸준히 매수하는 게 낫잖아요.", createdAt: T20J - 42*60_000, likes: 61 },
  ],
  287: [
    { id: 1, nickname: "익명_8372", holdingLabel: "관심종목", content: "호르무즈 해협 개방 유지면 원유 수송 리스크 없어지는 거예요. 에너지 가격 안정 → 인플레 하락 → 금리 인하 → 성장주 상승이라는 거대한 도미노 가능성이에요.", createdAt: T20J - 18*60_000, likes: 86 },
    { id: 2, nickname: "익명_4928", holdingLabel: "관심종목", content: "이란이 전자서명으로 합의했다는 게 공식 문서화됐다는 거라 번복하기 어려워요. Trump가 Xi에게 감사 표시한 것도 지정학 환경 개선의 신호예요.", createdAt: T20J - 32*60_000, likes: 64 },
    { id: 3, nickname: "익명_6284", holdingLabel: "관심종목", content: "지정학 리스크 완화가 신흥국 투자 심리에도 긍정이에요. SpaceX Starlink가 중동 지역 커버 확대하는 데 있어서도 규제 환경이 나아질 수 있어요.", createdAt: T20J - 48*60_000, likes: 47 },
  ],

  // ── 2026-06-19 신규 ──────────────────────────────────────────────────────
  258: [
    { id: 1, nickname: "익명_4827", holdingLabel: "100주 보유", content: "한국 구독 버튼 공식 확인이 인상적이에요. 미국에서 시작해서 유럽 거치고 이제 아시아에서 동시에 터지는 거잖아요. FSD 구독 월정액이 한국에서 얼마일지 모르겠지만 200~300달러 사이면 꽤 수익이 될 것 같아요.", createdAt: T19J - 4*60_000, likes: 78 },
    { id: 2, nickname: "익명_6391", holdingLabel: "관심종목", content: "K.I.T.T 스타일 FSD — 진짜 어릴 때 꿈꿨던 거잖아요. 나이트 라이더 보면서 저렇게 됐으면 했는데 3개월 안에 나온다는 게 현실이라는 게 아직도 신기해요. HW3 포함이라는 것도 중요해요. 기존 오너들도 업그레이드 없이 같이 간다는 거니까요.", createdAt: T19J - 11*60_000, likes: 54 },
    { id: 3, nickname: "익명_2847", holdingLabel: "80주 보유", content: "Cybertruck FSD V14 포착이 20개 도시라는 게 대규모 배포 준비 중이라는 신호예요. 뉴질랜드까지 포착됐다는 건 글로벌 테스트가 동시다발로 진행 중이라는 거고요. 이 속도면 올해 안에 엄청 많은 나라에서 FSD 쓸 수 있을 것 같아요.", createdAt: T19J - 19*60_000, likes: 41 },
  ],
  259: [
    { id: 1, nickname: "익명_5193", holdingLabel: "관심종목", content: "강화학습 엔지니어 $490K가 구글·메타 수준이에요. 테슬라가 AI 탑급 인재 싸움에 본격 뛰어든 거죠. 디지털 옵티머스가 성공하면 Tesla 내부 자동화 먼저 적용하고 나중에 기업용 AI 에이전트로 팔 수 있는 구조잖아요.", createdAt: T19J - 8*60_000, likes: 63 },
    { id: 2, nickname: "익명_7283", holdingLabel: "200주 보유", content: "OpenClass가 인터페이스 탐색·워크플로우 자율 실행·장기 과제 처리를 다 한다는 게 일반 AI 비서와 달리 실무 에이전트 플랫폼이에요. 일론이 말한 'AI 에이전트를 소프트웨어 도구 사용에 배포'가 구체적으로 이게 되는 거잖아요.", createdAt: T19J - 24*60_000, likes: 49 },
    { id: 3, nickname: "익명_3841", holdingLabel: "40주 보유", content: "자동차+로봇+에너지+AI 에이전트 = 테슬라 신규 수익 파이프라인이 4개예요. 자동차 마진만 보던 분석들이 틀리는 게 이런 이유예요. 2026년 하반기부터 각 파이프라인이 실적에 찍히기 시작할 거예요.", createdAt: T19J - 38*60_000, likes: 37 },
  ],
  260: [
    { id: 1, nickname: "익명_8492", holdingLabel: "관심종목", content: "IPO 이틀 후에 $20B 채권 준비라는 게 엄청 빠른 속도예요. Moody's Baa1 받자마자 바로 자본 시장 접근하는 거잖아요. 연금·보험사 자금이 들어올 수 있는 문이 열린 거예요. Morgan Stanley·Goldman·JPM 주관사 콘소시엄 자체가 최고급 딜이라는 신호예요.", createdAt: T19J - 6*60_000, likes: 87 },
    { id: 2, nickname: "익명_3751", holdingLabel: "관심종목", content: "Baa1이 정크 바로 위라서 아직 고등급은 아닌데, 신설 기업이 첫 등급부터 투자등급 받는 게 쉬운 일이 아니에요. Starlink 반복 수익 구조를 Moody's가 인정한 거예요. $20B 채권 이자가 낮아질수록 Starship 투자 가속화할 수 있어요.", createdAt: T19J - 23*60_000, likes: 63 },
    { id: 3, nickname: "익명_6184", holdingLabel: "관심종목", content: "SpaceX가 스타트업에서 대기업으로 공식 전환한 순간이에요. 투자등급 채권 발행 = 전통적 대기업만 할 수 있는 거거든요. Starlink B2B + Flow 파트너십 + ARK 5펀드 편입까지 오늘 SPCX 뉴스가 정말 풍성해요.", createdAt: T19J - 37*60_000, likes: 48 },
  ],
  261: [
    { id: 1, nickname: "익명_7291", holdingLabel: "관심종목", content: "ARK 5개 펀드 전부 SpaceX 편입은 전례가 없는 거예요. ARKX는 당연하지만 ARKQ(자율주행), ARKW(인터넷), ARKK(이노베이션)까지요. Starlink가 '차세대 인터넷 인프라'라는 게 맞는 거잖아요. 위성 직접 통신이 되면 5G 없는 지역에서도 AI 에이전트 배포가 가능해지는 거예요.", createdAt: T19J - 14*60_000, likes: 71 },
    { id: 2, nickname: "익명_4839", holdingLabel: "관심종목", content: "2023년부터 비상장 때부터 들고 있던 ARK Venture까지 포함이에요. Cathie Wood가 '역사상 가장 위대한 인프라 기업'이라는 표현을 쓴 것 자체가 드문 일이에요. 이 정도 확신 포지션이면 IPO 이후에도 계속 매수할 것 같아요.", createdAt: T19J - 29*60_000, likes: 55 },
    { id: 3, nickname: "익명_9184", holdingLabel: "관심종목", content: "Flow 허리케인 파트너십도 Starlink B2B 생태계 확장이에요. 허리케인 시즌 직전 계약이라서 실제 수요가 즉각 발생해요. 재난 통신 표준이 되는 게 엄청난 반복 수익원이잖아요. SPCX 오늘 종합하면 정말 많이 좋아진 날이에요.", createdAt: T19J - 44*60_000, likes: 39 },
  ],
  262: [
    { id: 1, nickname: "익명_5847", holdingLabel: "40주 보유", content: "PE 29.13이 AMZN 역사상 최저라는 게 진짜 이해하기 어려울 정도로 싸요. AWS +27% 성장률에 이 밸류에이션은 PEG 1.07이에요. 사실상 가치주 수준으로 거래되는 거잖아요. 고점 -12%에서 분할 매수하는 게 맞는 것 같아요.", createdAt: T19J - 10*60_000, likes: 64 },
    { id: 2, nickname: "익명_3927", holdingLabel: "관심종목", content: "Trainium이 NVDA 대비 40% 저렴한 학습 비용이라는 게 AWS 마진에 직접 영향을 줘요. 자체 칩으로 추론까지 하면 GPU 비용이 줄고 마진이 올라가는 구조예요. AI ROI가 플러스라는 데이터가 나왔으니 이제 투자가 수익으로 전환되는 사이클이에요.", createdAt: T19J - 31*60_000, likes: 48 },
  ],
  263: [
    { id: 1, nickname: "익명_8241", holdingLabel: "30주 보유", content: "고점 $274에서 $243으로 왔는데 성장률은 유지 중이에요. 이 갭이 좁혀지는 게 시간 문제라고 봐요. Bedrock 기반 AI 에이전트 수요가 늘어날수록 AWS 매출이 직접 올라가는 구조니까요.", createdAt: T19J - 18*60_000, likes: 39 },
    { id: 2, nickname: "익명_6493", holdingLabel: "45주 보유", content: "AMZN 광고 사업은 경기 하락에서도 ROI 좋아서 잘 버텨요. AWS + 광고 + Prime Video 광고까지 합치면 세 가지 성장 엔진이에요. PE 29x에 이걸 다 담고 있는 게 말이 안 되게 싼 거예요.", createdAt: T19J - 46*60_000, likes: 32 },
  ],
  264: [
    { id: 1, nickname: "익명_7291", holdingLabel: "60주 보유", content: "팀 쿡 40년 처음이라는 발언이 충격적이에요. 스티브 잡스 시절부터 지금까지 이런 공급망 충격은 없었다는 거잖아요. +15% 인상이지만 Apple 유저들 이탈률이 낮아서 수요는 유지될 것 같아요. 오히려 마진이 좋아지는 거죠.", createdAt: T19J - 7*60_000, likes: 58 },
    { id: 2, nickname: "익명_3817", holdingLabel: "관심종목", content: "메모리 가격 올라가면 MU·SK하이닉스가 수혜받고, Apple이 그 비용을 소비자한테 전가하는 구조예요. 공급망 위에 있는 기업들이 마진을 먹는 거죠. AAPL 보다 MU가 오히려 더 직접 수혜인 것 같아요.", createdAt: T19J - 25*60_000, likes: 43 },
  ],
  265: [
    { id: 1, nickname: "익명_5382", holdingLabel: "관심종목", content: "Macs·iPads까지 동시 인상이면 Apple 전 라인업 가격 인상이에요. 소비자한테는 부담이지만 Apple 입장에서는 마진 방어예요. 9월 이전 발표 가능하다니까 분기 실적 전에 가이던스로 올리는 게 영리한 전략이네요.", createdAt: T19J - 15*60_000, likes: 36 },
    { id: 2, nickname: "익명_9183", holdingLabel: "50주 보유", content: "Apple Intelligence 진짜로 실용적인 기능 추가되면 $1,299에도 사는 사람 많을 거예요. 에어팟 처음 나왔을 때 비싸다고 했는데 지금 다들 달고 다니잖아요. 생태계 안에 있으면 빠져나오기 어렵고요.", createdAt: T19J - 35*60_000, likes: 27 },
  ],
  266: [
    { id: 1, nickname: "익명_4829", holdingLabel: "관심종목", content: "$37.3B이면 진짜 역대급 자사주 매입이에요. 현재 주가로 계산하면 회사 전체를 살 수 있다는 게 경영진의 저평가 확신을 보여주는 거잖아요. 2월 저점 $56에서 자사주 매입 속도 높이면 주가 지지선이 만들어져요.", createdAt: T19J - 6*60_000, likes: 52 },
    { id: 2, nickname: "익명_6284", holdingLabel: "25주 보유", content: "Netflix가 콘텐츠 투자 줄이고 자사주 매입 늘린다는 게 이제 성장 투자에서 주주환원으로 전환하는 시그널이에요. EPS 기반 장기 가치 상승 스토리예요. 광고 요금제 수익이 쌓이면서 FCF가 많아진 거고요.", createdAt: T19J - 28*60_000, likes: 38 },
  ],
  267: [
    { id: 1, nickname: "익명_3841", holdingLabel: "관심종목", content: "K-드라마 콘텐츠가 글로벌에서 계속 히트 치고 있어요. 오징어게임 시즌2 반응도 좋았고요. Netflix가 한국 콘텐츠에 투자하는 게 글로벌 구독자 유지 핵심 전략이에요. 자사주 매입 + 콘텐츠 강화 = 양방향 가치 창출이에요.", createdAt: T19J - 19*60_000, likes: 29 },
    { id: 2, nickname: "익명_7482", holdingLabel: "10주 보유", content: "$56 바닥을 찍고 $73까지 왔는데 자사주 매입 발표가 더 떨어지기 어렵게 만들어요. $73.34에서 경영진이 직접 지지선 그어주는 거잖아요. 여기서 추가 매수 검토해볼 만해요.", createdAt: T19J - 42*60_000, likes: 22 },
  ],
  268: [
    { id: 1, nickname: "익명_8471", holdingLabel: "관심종목", content: "~$8.9B 투자해서 ~$57B으로 불린 거잖아요. 이 수준의 수익을 CHIPS Act로 낸 게 미국 정부 역사상 최고 수익률 투자 중 하나 아닌가요? 반도체 공급망 확보라는 정책 목표도 달성하면서 재정도 +$48B이라는 게 믿기지 않아요.", createdAt: T19J - 11*60_000, likes: 67 },
    { id: 2, nickname: "익명_2937", holdingLabel: "관심종목", content: "Intel 18A 공정이 TSMC 대안으로 인정받기 시작한 게 핵심이에요. 빅테크들이 지정학 리스크 헤지 목적으로 Intel 파운드리 발주를 늘리면 지금이 진짜 시작점인 거예요.", createdAt: T19J - 36*60_000, likes: 49 },
  ],
  269: [
    { id: 1, nickname: "익명_5183", holdingLabel: "관심종목", content: "$20.47에서 $131.61까지 오는 동안 미국 정부 포지션이 보이지 않았는데 이렇게 드러나는 게 흥미로워요. CHIPS Act 투자가 이 정도 성과를 낸다면 추가 CHIPS 2탄 예산 확보도 쉬워지는 거잖아요.", createdAt: T19J - 22*60_000, likes: 53 },
    { id: 2, nickname: "익명_9283", holdingLabel: "관심종목", content: "정부 입장에서 ~$48B 수익이 나도 주식을 안 팔고 계속 보유 중이라는 게 포인트예요. 지금도 올라갈 여지 있다고 판단하는 건지, 아니면 전략적으로 보유해야 해서인지 궁금하긴 해요.", createdAt: T19J - 48*60_000, likes: 41 },
  ],
  270: [
    { id: 1, nickname: "익명_4739", holdingLabel: "80주 보유", content: "젠슨 황이 직접 데이터로 확인했다는 게 포인트예요. 이론이 아니라 NVDA 서버에서 실제로 AI 에이전트들이 소프트웨어 도구를 더 많이 쓰는 걸 목격한 거잖아요. 'SaaS 죽는다 = GPU 덜 필요'라는 공매도 논리가 틀렸다는 거예요.", createdAt: T19J - 9*60_000, likes: 89 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "AI 에이전트가 소프트웨어를 쓴다 = SW 기업 GPU 수요 증가라는 논리가 처음에 반직관적인데 이해하고 나면 맞아요. 클로드나 GPT가 AWS API 호출하면 AWS가 GPU 더 써야 하는 거잖아요. NVDA 수혜가 직접이에요.", createdAt: T19J - 23*60_000, likes: 67 },
    { id: 3, nickname: "익명_3847", holdingLabel: "120주 보유", content: "SaaS 기업들 오버킬됐다는 역발상 기회가 생긴 거기도 해요. STRL, ENOVA 같은 게 AI 에이전트가 더 많이 쓰는 구조라면 지금 매도세가 기회일 수 있어요. 근데 선택적으로 봐야 해요. 완전 대체되는 단순 SW는 진짜 위험하니까요.", createdAt: T19J - 40*60_000, likes: 51 },
  ],
  271: [
    { id: 1, nickname: "익명_8193", holdingLabel: "40주 보유", content: "에이전트 붐 = 인프라 붐 공식이 성립된 거잖아요. OpenAI, Anthropic, Google 에이전트들이 다 클라우드 GPU에서 돌아가는 거예요. 에이전트 수 늘어날수록 NVDA 매출이 늘어나는 구조가 자동으로 만들어져요.", createdAt: T19J - 16*60_000, likes: 71 },
    { id: 2, nickname: "익명_5471", holdingLabel: "관심종목", content: "Forward PE 24x에 이 성장률이면 진짜 싸요. AI 사이클 초기에 성장주가 고PE로 거래됐던 거랑 비교하면 지금은 오히려 가치주 수준이에요. 젠슨 황 발언 이후에 다시 봐야 할 레벨이에요.", createdAt: T19J - 35*60_000, likes: 53 },
    { id: 3, nickname: "익명_2948", holdingLabel: "200주 보유", content: "NVDA 오늘 뉴스 맥락에서 보면 AI 에이전트 시대가 GPU 수요를 더 늘린다 + 내일 TeraFab $250B까지 맞물리면 NVDA 위치가 더 강해지는 거예요. 공급망 장악하고 있는 한 쉽게 흔들리지 않아요.", createdAt: T19J - 52*60_000, likes: 39 },
  ],
  272: [
    { id: 1, nickname: "익명_3948", holdingLabel: "70주 보유", content: "RPO +97.3%가 YoY 거의 2배예요. 분기 기준 역대 최고 성장률인데 이게 Azure AI + Copilot 계약이 폭발했다는 직접 증거예요. 미래 3년 매출이 이미 예약된 회사에 투자하는 게 얼마나 안전한지 보여줘요.", createdAt: T19J - 10*60_000, likes: 73 },
    { id: 2, nickname: "익명_7294", holdingLabel: "관심종목", content: "$700B RPO가 연매출 $220B의 3배 이상이에요. 경기 하락이 와도 이미 서명된 계약이라 매출이 급락하기 어려워요. 방어적 성장주라는 포지셔닝이 RPO 하나로 설명되는 거예요. 기관들이 왜 MSFT를 anchor로 보는지 이해가 돼요.", createdAt: T19J - 27*60_000, likes: 55 },
  ],
  273: [
    { id: 1, nickname: "익명_6283", holdingLabel: "50주 보유", content: "Fortune 500 70% Copilot 도입이면 M365 구독 + Copilot $30/월이 대부분의 대기업에서 정착된 거예요. 3년 약정 계약으로 묶여 있는 돈이 RPO에 잡히는 거고요. AI ROI 논란이 있어도 MSFT는 이미 계약으로 잠근 상태예요.", createdAt: T19J - 15*60_000, likes: 58 },
    { id: 2, nickname: "익명_1849", holdingLabel: "관심종목", content: "5년 CAGR +47%인데 이번 분기 +97.3%로 가속됐다는 게 Copilot 기업 계약이 임계점을 넘었다는 신호예요. 기업 AI 도입 사이클이 본격화되면 MSFT가 제일 먼저, 제일 많이 먹는 구조예요. Azure + Copilot + Teams AI가 다 연결되니까요.", createdAt: T19J - 39*60_000, likes: 44 },
  ],

  // ── 2026-06-18 신규 ──────────────────────────────────────────────────────
  250: [
    { id: 1, nickname: "익명_9284", holdingLabel: "50주 보유", content: "1,000회 통제 테스트가 진짜 인상적인 게 뭔지 아세요? RDW가 독립 기관이거든요. 테슬라가 아니라 규제기관이 직접 '강력 지지'한 거예요. 독일·프랑스가 이 근거 무시하기 힘들어요.", createdAt: T18J - m(5), likes: 94 },
    { id: 2, nickname: "익명_3718", holdingLabel: "관심종목", content: "80만 대 × 10% 전환 × $8,000 = $640M이 첫해 수익인데 이건 정말 보수적인 추정이에요. FSD 구독 $99/월 누적도 3년이면 $200M+ 반복 수익이에요. 소프트웨어 마진이 80%+ 라는 걸 감안하면 EPS 임팩트가 엄청나요.", createdAt: T18J - m(3), likes: 71 },
    { id: 3, nickname: "익명_6291", holdingLabel: "200주 보유", content: "대만 동시 신청까지 나왔잖아요. EU + 아시아 동시 확산이 진행 중이에요. 미국에서만 하던 게 이제 글로벌 롤아웃으로 전환되는 변곡점이에요.", createdAt: T18J + m(1), likes: 58 },
    { id: 4, nickname: "익명_4923", holdingLabel: "80주 보유", content: "FSD 일회성 구매 6/30 종료 전에 전환 수요도 촉진되는 효과 있어요. EU 승인 소식 들으면 구독 대신 일회성으로 사야겠다는 사람들 늘어나겠죠. 7월 숫자 기대됩니다.", createdAt: T18J + m(4), likes: 43 },
  ],
  251: [
    { id: 1, nickname: "익명_5847", holdingLabel: "180주 보유", content: "유럽 YTD +20.5%면 글로벌 Q2 실적 기대감을 올려줘요. Goldman 42~43만 전망에 유럽 기여가 의미 있게 들어가는 거니까요. FSD 승인 이후 대기 수요 풀리면 Q3가 더 클 수 있어요.", createdAt: T18J - m(16), likes: 67 },
    { id: 2, nickname: "익명_8394", holdingLabel: "관심종목", content: "기가베를린 생산이니까 EU 관세 면제라서 BYD 관세 인상 효과도 테슬라한테 직접 수혜예요. 경쟁 환경이 구조적으로 유리해진 거예요.", createdAt: T18J - m(10), likes: 49 },
    { id: 3, nickname: "익명_7284", holdingLabel: "100주 보유", content: "Q2 주간 최고치 경신하면서 YTD+로 돌아선 게 포인트예요. 올해 초 유럽 판매 부진 때문에 실망했던 투자자들이 많았는데 이제 반전 데이터가 쌓이는 중이에요.", createdAt: T18J - m(5), likes: 38 },
  ],
  252: [
    { id: 1, nickname: "익명_2938", holdingLabel: "250주 보유", content: "기가상하이 생산 최고치 + 유럽 판매 최고치 + FSD RDW 승인 + Optimus 3층이 다 같은 날 나왔어요. 오늘 테슬라 촉매 수가 단일 날짜로 역대급이에요.", createdAt: T18J - m(29), likes: 88 },
    { id: 2, nickname: "익명_4819", holdingLabel: "50주 보유", content: "드론으로 확인된 거잖아요. 테슬라가 발표한 자료가 아니라 독립 촬영 전문가가 찍은 거예요. '말이 아닌 실물' 증거라는 게 투자자들한테 훨씬 설득력 있어요.", createdAt: T18J - m(22), likes: 74 },
    { id: 3, nickname: "익명_9473", holdingLabel: "120주 보유", content: "10M × $30K = $300B/yr이 S&P500 전체 순이익의 절반인데, 이게 10년 안에 현실이 되면 테슬라 시총이 지금의 몇 배가 되는지 계산이 안 나와요.", createdAt: T18J - m(15), likes: 61 },
    { id: 4, nickname: "익명_6382", holdingLabel: "관심종목", content: "메인 공장 건설 속도와 비슷하다는 게 핵심이에요. 기가텍사스가 얼마나 빨리 올라갔는지 기억하시죠? 같은 속도면 Q4 2026 첫 생산 타임라인이 진짜 실현 가능해요.", createdAt: T18J - m(8), likes: 47 },
  ],
  253: [
    { id: 1, nickname: "익명_7391", holdingLabel: "관심종목", content: "NVDA PE 24x가 싸다는 게 처음엔 이해 안 됐는데, EPS 성장률 50%+에 PEG 0.5라는 걸 보면 이제 이해돼요. 성장률 대비 역사적 저평가가 진짜 맞는 표현이에요.", createdAt: T18J - m(11), likes: 78 },
    { id: 2, nickname: "익명_3847", holdingLabel: "45주 보유", content: "주식 희석 없이 $25B 조달이 ROE 개선을 의미해요. 채권 이자보다 AI 투자 수익률이 훨씬 높다는 확신이 있는 거잖아요. 경영진이 자기 주식 안 희석시키는 딜을 선택한 이유예요.", createdAt: T18J - m(7), likes: 56 },
    { id: 3, nickname: "익명_5193", holdingLabel: "관심종목", content: "메모리 부족 뉴스와 세트로 읽어야 해요. NVDA 채권 발행 = 더 많이 만들겠다. 메모리 부족 = 그만큼 수요가 폭발적. 두 뉴스가 같은 방향이에요.", createdAt: T18J - m(3), likes: 43 },
  ],
  254: [
    { id: 1, nickname: "익명_8394", holdingLabel: "150주 보유", content: "두 CEO가 같은 날 같은 메시지를 낸 게 중요해요. 실적 컨퍼런스에서 조심스럽게 말하는 CEO들이 이렇게 직접적으로 '부족하다'고 하는 건 사이클 확인을 공식화한 거예요.", createdAt: T18J - m(23), likes: 89 },
    { id: 2, nickname: "익명_2847", holdingLabel: "80주 보유", content: "리드타임 12~18개월이면 Q4 2026~Q1 2027 가격 상승이 실적에 찍히는 거예요. 선행 지표들이 다 맞춰지는 중이에요. MU는 지금이 사이클 초입이에요.", createdAt: T18J - m(14), likes: 67 },
    { id: 3, nickname: "익명_4718", holdingLabel: "40주 보유", content: "SK하이닉스가 NVDA 독점 공급이라 HBM은 당장 늘기도 어렵고요. Micron이 HBM3E 양산 확대 중인데 그게 빨라질수록 MU 수혜가 커지는 구조예요.", createdAt: T18J - m(6), likes: 51 },
  ],
  255: [
    { id: 1, nickname: "익명_4723", holdingLabel: "관심종목", content: "포워드 가이던스 철회가 단기적으로는 불확실성이지만 데이터 의존 Fed이 더 유연하게 반응할 수 있다는 거예요. 이란 합의로 유가 하락하면 9월 CPI가 2% 아래로 갈 수 있어요.", createdAt: T18J - m(39), likes: 73 },
    { id: 2, nickname: "익명_9384", holdingLabel: "관심종목", content: "-2.8%가 1994년 이후 최악이라는 게 맥락이 중요해요. 1994년 Fed이 금리 급격히 올리던 시기였는데 지금은 동결이에요. 반응이 과도하다는 거고 반등 여지가 있는 거죠.", createdAt: T18J - m(28), likes: 58 },
    { id: 3, nickname: "익명_6391", holdingLabel: "관심종목", content: "VIX 스파이크 나왔을 때 성장주 매수는 역사적으로 좋은 전략이었어요. 연준 때문에 떨어진 NVDA·TSLA 같은 종목은 오히려 기회 구간일 수 있어요.", createdAt: T18J - m(18), likes: 44 },
  ],
  256: [
    { id: 1, nickname: "익명_3284", holdingLabel: "관심종목", content: "유가 $45~48이면 인플레이션이 구조적으로 잡히는 거예요. 연준이 금리 인하 명분이 생기는 거고 성장주에는 이중 호재예요. 에너지주 손절하고 성장주 비중 올리는 게 맞는 타이밍인 것 같아요.", createdAt: T18J - m(52), likes: 64 },
    { id: 2, nickname: "익명_7394", holdingLabel: "관심종목", content: "합의 지속 가능성이 변수예요. 이란 의회 비준 없이 행정부 협정이라서 트럼프 이후 지속 여부가 불확실해요. 단기 유가 하락은 나오겠지만 구조적 공급 증가로 볼지는 모르겠어요.", createdAt: T18J - m(38), likes: 48 },
  ],
  257: [
    { id: 1, nickname: "익명_5829", holdingLabel: "관심종목", content: "SpaceX 흑자가 Tesla의 미래 모습이라는 논리가 맞는 것 같아요. SpaceX도 초기에는 로켓 개발 투자로 적자였다가 Starlink 반복 수익이 생기면서 흑자 전환한 거잖아요. Tesla는 FSD 구독 + Optimus가 그 역할을 하는 거죠.", createdAt: T18J - m(34), likes: 91 },
    { id: 2, nickname: "익명_3481", holdingLabel: "관심종목", content: "시총 $1.1T vs $350B 갭이 Optimus 10M 잠재력을 선반영한 거예요. 재무 역전이 일시적인지 구조적인지가 핵심인데 저는 투자 사이클 중이라 일시적이라 봐요.", createdAt: T18J - m(22), likes: 67 },
    { id: 3, nickname: "익명_8293", holdingLabel: "80주 보유", content: "Starlink $11.3B 매출 중 60%가 반복 구독이라는 게 투자 관점에서 완전히 다른 기업이에요. Tesla 에너지 부문(메가팩)이 그 역할을 하기 시작하면 테슬라도 재평가받을 수 있어요.", createdAt: T18J - m(12), likes: 54 },
    { id: 4, nickname: "익명_1847", holdingLabel: "20주 보유", content: "머스크가 SPCX랑 TSLA 동시에 운영하는 게 오히려 시너지예요. Optimus를 SpaceX 공장에도 쓰고, Starlink를 Tesla Robotaxi에도 쓰는 생태계가 만들어지는 거잖아요.", createdAt: T18J - m(5), likes: 39 },
  ],

  // ── 2026-06-16 신규 ──────────────────────────────────────────────────────
  234: [
    { id: 1, nickname: "익명_8293", holdingLabel: "100주 보유", content: "EPA 인증은 판매 합법화 관문이에요. 이제 NHTSA 안전 기준이랑 도시별 허가만 남은 거고 오스틴은 이미 준비가 되어 있는 거잖아요. 2026년 하반기 유료 서비스 현실적으로 보여요.", createdAt: T16J - m(12), likes: 89 },
    { id: 2, nickname: "익명_5192", holdingLabel: "50주 보유", content: "마일당 $0.02 에너지 비용이면 Uber Lyft 기사 수수료 $0.30~0.50 대비 완전히 다른 원가 구조예요. 로보택시가 수익화되면 Tesla 전체 밸류에이션 재평가가 시작되는 거죠.", createdAt: T16J - m(7), likes: 71 },
    { id: 3, nickname: "익명_7394", holdingLabel: "200주 보유", content: "416마일 주행거리가 로보택시 운영에서 중요한 이유는 충전 횟수를 줄여서 가동률을 높이는 거예요. 하루 16시간 운행 중 충전 1회면 수익성 구조가 완전히 다르죠.", createdAt: T16J - m(3), likes: 58 },
    { id: 4, nickname: "익명_3847", holdingLabel: "80주 보유", content: "FWD 단순 구동계가 제조 원가 절감에도 좋고 유지보수 비용도 낮아요. 로보택시는 총소유비용(TCO)이 핵심인데 Cybercab이 모든 지표에서 최적화된 것 같아요.", createdAt: T16J + m(1), likes: 44 },
  ],
  235: [
    { id: 1, nickname: "익명_4829", holdingLabel: "60주 보유", content: "Cybertruck 150대 한 배치가 $12M+인데 이게 주간 단위로 나오면 분기 매출 기여가 진짜 커지는 거예요. 고마진 모델 비중이 올라가면서 Tesla 마진 구조가 바뀌는 시점이에요.", createdAt: T16J - m(26), likes: 74 },
    { id: 2, nickname: "익명_9183", holdingLabel: "40주 보유", content: "기가상하이 생산 최고치 + 모델Y 일본 1위 + Cybertruck 150대가 같은 날 나오는 게 우연이 아니에요. Q2 실적 발표 때 서프라이즈 나올 것 같아요.", createdAt: T16J - m(15), likes: 59 },
    { id: 3, nickname: "익명_6291", holdingLabel: "30주 보유", content: "일본은 브랜드 충성도가 세계 최고인 시장이에요. 거기서 수입차 1위 했다는 게 Tesla 글로벌 브랜드 파워가 진짜라는 증거죠. EU 다음 아시아 점유율도 올라오는 거 보이네요.", createdAt: T16J - m(6), likes: 47 },
  ],
  236: [
    { id: 1, nickname: "익명_3748", holdingLabel: "40주 보유", content: "2029 $210B이면 현재 주가 기준 PER 역산해봐도 업사이드가 나와요. AI 인프라 수요가 2025~2029 지속된다는 가정이 깨지지 않는 한 이 성장 경로는 유효한 거죠.", createdAt: T16J - m(17), likes: 67 },
    { id: 2, nickname: "익명_5847", holdingLabel: "25주 보유", content: "Google이 TSMC 못 써서 삼성으로 간 게 NVDA한테는 오히려 좋은 거예요. TSMC 용량 경합 상대가 하나 줄어드는 거니까요. CUDA 생태계 전환 비용도 커서 빅테크가 당장 NVDA 줄이긴 어렵고요.", createdAt: T16J - m(9), likes: 52 },
    { id: 3, nickname: "익명_2938", holdingLabel: "10주 보유", content: "$58B→$210B이 4년 CAGR 38%인데 S&P500 연 10%와 비교하면 프리미엄이 정당화돼요. 성장 둔화 리스크가 있어도 현재 PER 20x는 AI 성장 감안하면 싸다는 논리에 동의해요.", createdAt: T16J - m(3), likes: 38 },
  ],
  237: [
    { id: 1, nickname: "익명_7382", holdingLabel: "20주 보유", content: "TSMC가 NVDA·Apple·AMD로 꽉 찼다는 게 Google도 인정한 거예요. 삼성 파운드리 입장에서는 대형 수주 확보 기회고요. TSMC 독점이 흔들리기 시작하는 신호일 수도 있어요.", createdAt: T16J - m(34), likes: 56 },
    { id: 2, nickname: "익명_9473", holdingLabel: "15주 보유", content: "커스텀 ASIC 트렌드가 강화될수록 NVIDIA 장기 시장 점유율은 조금씩 압박받는 게 맞아요. 그래도 2029까지는 CUDA 생태계 덕분에 독주 유지할 것 같고요.", createdAt: T16J - m(18), likes: 43 },
    { id: 3, nickname: "익명_4719", holdingLabel: "35주 보유", content: "삼성이 Google TPU 수주 잡은 게 AI 파운드리 시장 재편 신호예요. TSMC 독점이 영원할 수 없는데 삼성이 그 빈틈을 파고든 거죠. 삼성전자 파운드리 실적에 긍정적인 재료예요.", createdAt: T16J - m(7), likes: 35 },
  ],
  238: [
    { id: 1, nickname: "익명_6384", holdingLabel: "관심종목", content: "DC +57%가 NVIDIA MI 시리즈 수요 덕분인데 빅테크들이 NVIDIA 독점 리스크 헤지로 AMD를 일부러 사주는 전략이 있는 거예요. MS·Meta·OpenAI가 AMD 쓰는 거 그런 맥락이죠.", createdAt: T16J - m(20), likes: 78 },
    { id: 2, nickname: "익명_3847", holdingLabel: "관심종목", content: "순이익 +94%가 레버리지 단계에 들어갔다는 신호예요. 매출 증가분이 거의 다 이익으로 떨어지는 구간인데 이게 계속되면 EPS 재평가가 빠르게 오겠죠.", createdAt: T16J - m(11), likes: 62 },
    { id: 3, nickname: "익명_8293", holdingLabel: "관심종목", content: "게이밍 -30%는 구조적 문제가 아니라 콘솔 사이클이에요. PS6·다음 세대 Xbox 나오면 반등하는 거라서 AMD 전체 실적 훼손이 아닌 거죠.", createdAt: T16J - m(5), likes: 49 },
    { id: 4, nickname: "익명_5193", holdingLabel: "관심종목", content: "MI350 나오면 분기 DC 매출이 $8B 넘는 거 가능해요. NVIDIA 독점 시대에서 NVDA+AMD 이중 체제로 가는 게 빅테크 입장에서 원하는 그림이고 AMD가 그 수혜를 보는 거죠.", createdAt: T16J + m(1), likes: 37 },
  ],
  239: [
    { id: 1, nickname: "익명_4829", holdingLabel: "관심종목", content: "어닝 서프라이즈 → 컨센서스 조정 → 주가 재레이팅이 가장 전통적인 성장주 사이클이에요. AMD가 그 사이클을 타기 시작한 거면 지금 진입이 늦지 않았을 수 있어요.", createdAt: T16J - m(40), likes: 65 },
    { id: 2, nickname: "익명_2847", holdingLabel: "관심종목", content: "NVDA 없이 AI 익스포져 갖는 방법으로 AMD가 점점 매력적이에요. PER도 NVDA 대비 낮고 성장 모멘텀은 비슷하게 가고 있으니까요.", createdAt: T16J - m(22), likes: 52 },
    { id: 3, nickname: "익명_7193", holdingLabel: "관심종목", content: "클라이언트 +23%는 PC 사이클 회복 신호예요. AMD CPU가 인텔 대비 시장 점유율 계속 올라가는 중이라서 이쪽 성장도 무시할 수 없어요.", createdAt: T16J - m(10), likes: 41 },
  ],
  240: [
    { id: 1, nickname: "익명_8374", holdingLabel: "관심종목", content: "HBM 스택 $3,000~5,000짜리를 플래시로 대체하면 데이터센터 메모리 원가가 혁명적으로 줄어드는 거예요. Meta가 인수했다는 게 Llama 추론 메모리 비용 직접 줄이려는 거고 이게 상용화되면 Marvell이 그 수혜를 받는 거죠.", createdAt: T16J - m(15), likes: 71 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "Meta MTIA 칩 파트너가 Marvell이잖아요. Meta가 MEXT까지 인수하면 MTIA + MEXT 기술 결합이 자연스럽게 이뤄지는 거예요. Marvell 스토리지 컨트롤러 수요가 늘어나는 구조죠.", createdAt: T16J - m(8), likes: 56 },
    { id: 3, nickname: "익명_3849", holdingLabel: "관심종목", content: "삼성·SK HBM 사업에 장기 위협이에요. 아직 상용화 전이지만 기술이 검증되면 HBM 수요 성장 스토리에 의문부호가 붙는 거죠. MU 투자자들도 같이 봐야 할 것 같아요.", createdAt: T16J - m(2), likes: 44 },
  ],
  241: [
    { id: 1, nickname: "익명_5192", holdingLabel: "관심종목", content: "Meta가 기술 확보 → 자체 Llama 인프라 적용 → 비용 절감 → 경쟁력 강화 사이클을 노리는 거예요. Marvell이 MTIA 파트너라는 게 이 그림에서 핵심 연결고리죠.", createdAt: T16J - m(29), likes: 59 },
    { id: 2, nickname: "익명_7392", holdingLabel: "관심종목", content: "Meta MTIA + MEXT 플래시 메모리 최적화 결합하면 AI 추론 인프라 비용 혁명이에요. Marvell이 ASIC 설계 + 스토리지 컨트롤러 다 갖고 있으니까 풀 스택 솔루션 공급자가 되는 거죠.", createdAt: T16J - m(15), likes: 47 },
    { id: 3, nickname: "익명_9183", holdingLabel: "관심종목", content: "Meta가 AI 메모리 스타트업 직접 인수한다는 게 그만큼 AI 추론 메모리 비용이 크다는 거예요. MEXT 기술이 검증되면 외부 판매도 가능하고 Marvell이 그 채널이 될 수 있어요.", createdAt: T16J - m(6), likes: 36 },
  ],
  242: [
    { id: 1, nickname: "익명_4829", holdingLabel: "관심종목", content: "IPO 이후에도 $172→$179 올라가는 게 기관들이 IPO 직후 매집하는 패턴이에요. 대형 IPO는 상장 후 첫 3개월이 기관 포지션 구축 시기라서 주가 지지가 강하죠.", createdAt: T16J - m(9), likes: 87 },
    { id: 2, nickname: "익명_3748", holdingLabel: "관심종목", content: "$15B/yr AI 지출이 매출의 80% 재투자인데 일반 기업이면 이익이 없는 구조예요. 근데 SpaceX는 Starlink 수익이 그걸 커버하면서 AI 역량도 쌓는 거라서 진짜 독특한 사업 모델이에요.", createdAt: T16J - m(5), likes: 69 },
    { id: 3, nickname: "익명_6193", holdingLabel: "관심종목", content: "IR 웹사이트 오픈이 소소해 보이는데 기관 투자자 입장에서는 공식 커뮤니케이션 채널이 생긴 게 중요해요. 분기 실적 발표 시작되면 증권사 커버리지도 시작되는 거죠.", createdAt: T16J - m(1), likes: 52 },
    { id: 4, nickname: "익명_8293", holdingLabel: "관심종목", content: "$85.7B = 사우디 아람코 3배가 그냥 기록 수치가 아니라 전통 에너지 패권에서 우주·AI 패권으로 자본이 이동하는 시대적 전환점이에요. 역사책에 남을 숫자예요.", createdAt: T16J + m(2), likes: 43 },
  ],
  243: [
    { id: 1, nickname: "익명_2938", holdingLabel: "관심종목", content: "Polymarket $6M 거래된 게 신뢰성 있는 편이에요. 63% → 군사행동 시 Starlink 즉시 투입이 우크라이나에서 이미 검증됐으니까 SPCX 군사 계약 모멘텀이 실제로 있는 거죠.", createdAt: T16J - m(23), likes: 74 },
    { id: 2, nickname: "익명_5847", holdingLabel: "관심종목", content: "쿠바는 플로리다에서 150km라서 Starlink 위성 집중 배치가 기술적으로 쉬운 지역이에요. 카리브해 분쟁 시나리오에서 SpaceX 군사 통신 가장 빠르게 투입 가능한 회사가 맞는 거죠.", createdAt: T16J - m(13), likes: 58 },
    { id: 3, nickname: "익명_4738", holdingLabel: "관심종목", content: "지정학 모멘텀이 단기 촉매인 건 맞는데 과신은 금물이에요. 63% 확률이 실현될 수도 있고 아닐 수도 있으니까 Polymarket 하나만 보고 포지션 잡으면 안 되는 거죠. 기업 펀더멘탈 기반으로 접근해야 해요.", createdAt: T16J - m(4), likes: 45 },
  ],

  // ── 2026-06-15 신규 ──────────────────────────────────────────────────────
  224: [
    { id: 1, nickname: "익명_4829", holdingLabel: "관심종목", content: "수출통제령이라는 게 Anthropic이 자발적으로 막은 게 아니라 정부 명령이라는 거잖아요. 이게 AI 규제의 시작이라면 앞으로 다른 AI 모델들도 같은 제한 받을 수 있는 거예요.", createdAt: T15J - m(10), likes: 78 },
    { id: 2, nickname: "익명_7193", holdingLabel: "50주 보유", content: "역설적으로 미국 AI 기업들의 독점이 강해지는 거예요. 외국 기업은 접근 못하고 미국 내 40개사만 쓰는 구조면 미국 AI 생태계 프리미엄이 올라가는 거죠.", createdAt: T15J - m(6), likes: 62 },
    { id: 3, nickname: "익명_3918", holdingLabel: "30주 보유", content: "Project Glasswing으로 150개 기관 방어 스캔 확대한다는 게 규제 속에서도 사업 확장하는 방식이에요. 방어적 용도라서 수출통제 예외 받을 수 있는 거죠.", createdAt: T15J - m(3), likes: 47 },
    { id: 4, nickname: "익명_9284", holdingLabel: "관심종목", content: "Amazon이 Anthropic 최대 투자자인데 이 규제가 AWS 클라우드 AI 서비스에 어떤 영향 줄지가 진짜 핵심이에요. 미국 내 AWS는 괜찮겠지만 AWS 글로벌 데이터센터 고객들은 어떻게 되는 건지.", createdAt: T15J + m(1), likes: 35 },
  ],
  225: [
    { id: 1, nickname: "익명_6182", holdingLabel: "75주 보유", content: "MS가 40개사 안에 들어간다는 게 Azure OpenAI랑 Claude 둘 다 쓸 수 있는 거잖아요. AI 공급망 다각화 면에서 MS가 가장 잘 포지셔닝된 것 같아요.", createdAt: T15J - m(25), likes: 54 },
    { id: 2, nickname: "익명_3847", holdingLabel: "관심종목", content: "Claude Mythos 자체 안전장치 우회 능력이 충격인데 그걸 NSA가 쓴다는 게 사이버전 맥락에서 보면 이해가 돼요. 공격용이 아니라 취약점 선제 발견용으로 쓰는 거니까요.", createdAt: T15J - m(14), likes: 43 },
    { id: 3, nickname: "익명_7482", holdingLabel: "20주 보유", content: "결국 이게 미국 AI 헤게모니 강화예요. 최강 모델을 미국 기관만 쓰게 하면 AI 기반 국가 경쟁에서 다른 나라가 따라잡기 더 어려워지는 구조죠.", createdAt: T15J - m(5), likes: 38 },
  ],
  226: [
    { id: 1, nickname: "익명_5283", holdingLabel: "관심종목", content: "이사회 멤버가 $1B 베팅하는 게 가장 강력한 시그널이에요. 정보 비대칭이 가장 큰 사람이 가장 많이 샀다는 거니까요. Ellison이 Oracle 끌어올린 것처럼 SpaceX도 장기 보유 전략일 거예요.", createdAt: T15J - m(16), likes: 67 },
    { id: 2, nickname: "익명_8192", holdingLabel: "관심종목", content: "$3,727 목표가 $26T 시총인데 그게 현실적인지 모르겠지만 현재 $90.95에서 Shotwell이 공개적으로 언급했다는 게 임원들이 그걸 목표로 일하고 있다는 거잖아요.", createdAt: T15J - m(9), likes: 51 },
    { id: 3, nickname: "익명_4719", holdingLabel: "관심종목", content: "Starbucks-Schultz 비유가 적절해요. Elon 없어도 운영은 되지만 비전이 달라진다는 거 솔직하게 인정한 거잖아요. 투명한 리스크 공개가 오히려 신뢰를 높이는 거죠.", createdAt: T15J - m(2), likes: 39 },
  ],
  227: [
    { id: 1, nickname: "익명_2847", holdingLabel: "관심종목", content: "$686B 연환산이면 Amazon 전체 매출이랑 비슷한 거예요. Amazon 시총이 $2.5T이니 SpaceX가 $1.2T 선에서 거래된다는 게 오히려 저평가 아닌가요.", createdAt: T15J - m(33), likes: 58 },
    { id: 2, nickname: "익명_6384", holdingLabel: "관심종목", content: "JPM이 역대 최대 IPO 공식 확인한다는 게 그냥 외교적 발언이 아니라 주관사 책임으로 하는 말이에요. 수치가 맞다는 걸 보증한 거죠.", createdAt: T15J - m(18), likes: 44 },
    { id: 3, nickname: "익명_9473", holdingLabel: "관심종목", content: "Westly '3 moonshots'이 현재 $90.95 기준으로 보면 밸류에이션 대비 매출이 진짜 저평가처럼 보여요. 물론 AI 인프라 계약금 선인식 부분이 있긴 하지만요.", createdAt: T15J - m(7), likes: 33 },
  ],
  228: [
    { id: 1, nickname: "익명_3847", holdingLabel: "150주 보유", content: "라스베이거스 연 4,200만 방문객 노선이 딱 자율주행 최적화 환경이에요. 공항→Strip 노선은 반복적이고 예측 가능해서 FSD가 가장 잘 할 수 있는 구간이죠.", createdAt: T15J - m(20), likes: 87 },
    { id: 2, nickname: "익명_7392", holdingLabel: "80주 보유", content: "Forbes '사실상 로보택시' 평가가 주류 미디어에서 나온 게 중요해요. 테크 미디어가 아니라 비즈니스 미디어가 그렇게 쓰면 기관 투자자들 인식이 바뀌는 거죠.", createdAt: T15J - m(10), likes: 65 },
    { id: 3, nickname: "익명_5193", holdingLabel: "40주 보유", content: "Cybertruck이 HD 맵 구축 장비 달고 다닌다는 게 이미 인프라 준비가 끝났다는 신호예요. 허가 신청 전에 데이터 다 모은 거죠. 빠르면 올해 안에 운행 시작할 것 같아요.", createdAt: T15J - m(4), likes: 52 },
    { id: 4, nickname: "익명_8394", holdingLabel: "200주 보유", content: "라스베이거스 승인 되면 다음이 뉴욕이나 시카고예요. 도시 수 = 수익화 규모니까 진짜 로보택시 스케일업이 올해부터 시작되는 거죠.", createdAt: T15J + m(2), likes: 43 },
  ],
  229: [
    { id: 1, nickname: "익명_4829", holdingLabel: "60주 보유", content: "FSD 컴퓨터 비전을 로봇에 이식한다는 게 경쟁사가 처음부터 개발해야 하는 것과 출발점이 다른 거예요. 6백만 대 실도로 데이터가 Optimus AI에 들어가는 거잖아요.", createdAt: T15J - m(43), likes: 72 },
    { id: 2, nickname: "익명_6182", holdingLabel: "30주 보유", content: "$50T 글로벌 인건비의 20% 대체면 $10T 시장인데 이걸 Tesla가 80% 점유하면 시총 $8T이에요. $25T 목표가 공상이지만 방향은 맞는 것 같아요.", createdAt: T15J - m(28), likes: 58 },
    { id: 3, nickname: "익명_9284", holdingLabel: "100주 보유", content: "2030년 100만 대 목표를 달성하면 그때 밸류에이션은 지금과 완전히 다를 거예요. 지금 테슬라 주가가 Optimus를 얼마나 반영하고 있는지가 투자 포인트죠.", createdAt: T15J - m(12), likes: 45 },
  ],
  230: [
    { id: 1, nickname: "익명_7384", holdingLabel: "90주 보유", content: "HBM 마진 60%가 일반 D램 30%의 2배예요. AI 칩 수요가 HBM을 끌어올리면서 마이크론 전체 마진 구조가 바뀌고 있는 거죠. PER 재평가 근거가 충분해요.", createdAt: T15J - m(14), likes: 83 },
    { id: 2, nickname: "익명_2948", holdingLabel: "45주 보유", content: "시총 $2.15T로 매그6 $16.79T의 8분의 1인데 영업이익은 더 크다는 게 진짜 말이 안 되는 저평가예요. 투자자들이 아직 메모리를 상품으로만 보는 거죠.", createdAt: T15J - m(7), likes: 64 },
    { id: 3, nickname: "익명_5193", holdingLabel: "120주 보유", content: "삼성 수율 문제가 해결되면 $707B이 더 늘어나는 거고 SK하이닉스도 HBM 증설 계속 중이라서 2027 전망치가 보수적일 수 있어요. 메모리 트리오 합산 $800B도 가능한 시나리오예요.", createdAt: T15J - m(2), likes: 49 },
    { id: 4, nickname: "익명_8372", holdingLabel: "30주 보유", content: "매그6가 $16.79T인데 트리오가 $2.15T라는 격차는 결국 밸류에이션 재평가가 일어날 수밖에 없는 구조예요. AI 붐이 지속되는 한 이 격차는 좁혀지겠죠.", createdAt: T15J + m(1), likes: 37 },
  ],
  231: [
    { id: 1, nickname: "익명_3748", holdingLabel: "80주 보유", content: "CHIPS Act $6.2B 남은 게 앞으로 나온다는 게 자본 지출의 절반 정부 지원이에요. 삼성·SK는 이걸 못 받는데 마이크론만 받는 거잖아요. 경쟁 구도가 완전히 달라지는 거죠.", createdAt: T15J - m(30), likes: 61 },
    { id: 2, nickname: "익명_6291", holdingLabel: "50주 보유", content: "상무장관 직접 방문한다는 게 국가 전략 자산 지정이라는 거예요. 이런 기업이 한두 개밖에 없는데 MU가 그 안에 들어간다는 게 투자 안정성 측면에서 큰 거죠.", createdAt: T15J - m(15), likes: 48 },
    { id: 3, nickname: "익명_9183", holdingLabel: "25주 보유", content: "목표주가 $300~400이면 현재 대비 2배 이상이에요. 반도체 상품주 PER에서 인프라 기업 PER로 재평가되면 충분히 가능한 숫자예요. 비즈니스 모델 전환 인정받는 게 핵심이죠.", createdAt: T15J - m(5), likes: 36 },
  ],
  232: [
    { id: 1, nickname: "익명_4829", holdingLabel: "25주 보유", content: "S&P500 평균 24x보다 낮다는 게 진짜 역설이에요. AI 슈퍼사이클 핵심 기업이 지수 평균보다 저평가라는 논리가 결국 매수 근거가 되는 거죠.", createdAt: T15J - m(23), likes: 72 },
    { id: 2, nickname: "익명_7382", holdingLabel: "18주 보유", content: "역사적 최저 18.43x에서 12% 위라는 게 밸류에이션 지지선이 가깝다는 거예요. 추가 하락 여유가 크지 않고 EPS 성장이 계속되면 PER이 올라갈 수밖에 없어요.", createdAt: T15J - m(12), likes: 55 },
    { id: 3, nickname: "익명_2937", holdingLabel: "8주 보유", content: "FY2026 $200B 목표가 달성되면 현재 PER 기준으로 EPS가 얼마나 올라가는지 계산해보면 주가 재평가가 어디까지 가능한지 나와요. 성장 둔화 리스크는 항상 있지만요.", createdAt: T15J - m(4), likes: 41 },
  ],
  233: [
    { id: 1, nickname: "익명_5192", holdingLabel: "관심종목", content: "데이터센터 에너지 비용이 총 운영비의 40~60%라는 게 유가 하락이 AI 주식에 직접 수혜가 되는 이유예요. 간접 효과지만 마진 개선이 실제로 나와요.", createdAt: T15J - m(38), likes: 54 },
    { id: 2, nickname: "익명_8374", holdingLabel: "관심종목", content: "스냅백 조항이 있어서 이란이 합의 깨면 제재 즉시 복원이에요. 방산주를 장기 하락으로 볼 이유가 없는 거죠. 단기 조정 오면 오히려 매수 기회일 수 있어요.", createdAt: T15J - m(20), likes: 43 },
    { id: 3, nickname: "익명_3749", holdingLabel: "관심종목", content: "유가 $65~68 하락 시나리오면 항공주가 가장 직접 수혜예요. DAL·UAL이 단기로 좋을 것 같아요. AI 주식도 에너지 비용 감소로 간접 수혜고요.", createdAt: T15J - m(9), likes: 34 },
  ],

  // ── 2026-06-13 신규 ──────────────────────────────────────────────────────
  219: [
    { id: 1, nickname: "익명_5847", holdingLabel: "관심종목", content: "$172.68로 마감이면 선물 $167 기준 예상보다도 높게 나온 거잖아요. 기관들이 장내에서도 계속 사들인 거죠. 시총 $2.26T로 삼성이랑 아람코 다 넘어버렸어요.", createdAt: T13J - m(7), likes: 89 },
    { id: 2, nickname: "익명_2938", holdingLabel: "관심종목", content: "Ron Baron $1B 넣고 '평생 안 판다'는 게 진짜 강력한 시그널이에요. Tesla도 오래 들고 있었는데 SpaceX도 같은 방식으로 보는 거죠.", createdAt: T13J - m(5), likes: 72 },
    { id: 3, nickname: "익명_7492", holdingLabel: "관심종목", content: "Morgan Stanley가 안정화 운용까지 해줬는데 종가가 선물을 뚫은 거면 자연 수요가 어마어마했다는 거예요. S&P 500 편입 후가 더 기대되네요.", createdAt: T13J - m(2), likes: 58 },
    { id: 4, nickname: "익명_8473", holdingLabel: "관심종목", content: "글로벌 #6이 됐는데 다음 목표가 Amazon $2.55T 추월이에요. Starlink 구독 성장 + AI 인프라 임대 계속되면 올해 안에 달성 가능할 것 같아요.", createdAt: T13J + m(2), likes: 44 },
  ],
  220: [
    { id: 1, nickname: "익명_3914", holdingLabel: "관심종목", content: "Tesla가 연결 못 하면 Anthropic한테 바로 임대하는 거 진짜 SpaceX스럽네요. 유휴 자산이 없는 거잖아요. $21.5B 계약이면 연매출에 엄청난 기여가 될 것 같아요.", createdAt: T13J - m(23), likes: 67 },
    { id: 2, nickname: "익명_6831", holdingLabel: "관심종목", content: "Colossus 2·3은 자체 AI용으로 유지한다는 게 SpaceX가 AI 자체 개발도 계속 한다는 거잖아요. 테슬라 완전히 독립적으로 가는 중인 것 같아요.", createdAt: T13J - m(12), likes: 51 },
    { id: 3, nickname: "익명_9284", holdingLabel: "관심종목", content: "TeraFab $11B 투자도 계속 진행 중이라는 거 생각하면 SpaceX가 AI 칩도 자체 생산하려는 거예요. 진짜 수직계열화가 로켓부터 AI칩까지 가는 중이네요.", createdAt: T13J - m(6), likes: 39 },
  ],
  221: [
    { id: 1, nickname: "익명_4729", holdingLabel: "150주 보유", content: "MLIR 컴파일러가 기반이 강해지면 v15.x 업데이트부터 변화 속도가 더 빨라지는 거예요. 지금 20% 향상됐는데 다음 컴파일러 최적화에서 또 15~20% 나올 수 있어요.", createdAt: T13J - m(13), likes: 84 },
    { id: 2, nickname: "익명_8392", holdingLabel: "75주 보유", content: "Semi 5대 양산에 FSD v14.3.4까지 같은 날 나왔어요. 소프트웨어 + 하드웨어 동시에 진행되는 게 Tesla 강점이죠. 하반기 모멘텀 진짜 좋을 것 같아요.", createdAt: T13J - m(8), likes: 63 },
    { id: 3, nickname: "익명_2847", holdingLabel: "30주 보유", content: "반응속도 20%가 일반 주행에서는 느끼기 어렵지만 긴급 상황에서는 생사가 갈리는 거예요. 80ms vs 100ms 차이가 크지 않아 보여도 실제 충돌 회피 성능에 직결돼요.", createdAt: T13J - m(3), likes: 47 },
    { id: 4, nickname: "익명_5918", holdingLabel: "250주 보유", content: "유럽 5,100대 +22.8%도 나왔네요. FSD 승인 임박에 Semi 배송까지 하반기 Tesla 스토리가 완성되고 있어요. 주가 반응이 기대됩니다.", createdAt: T13J + m(1), likes: 36 },
  ],
  222: [
    { id: 1, nickname: "익명_7391", holdingLabel: "80주 보유", content: "26Q2 최고치인데 이게 분기 말까지 더 올라갈 수 있어요. 모델 Y 리프레시 효과가 아직 유럽에서 계속 나오고 있거든요. Q2 전체 배송 418K 상향이 현실적으로 보여요.", createdAt: T13J - m(36), likes: 72 },
    { id: 2, nickname: "익명_4829", holdingLabel: "45주 보유", content: "노르웨이에서 EV 점유율 90% 유지하면서 Tesla 1위 지키는 게 진짜 대단해요. 유럽 전기차 시장에서 BMW·Mercedes보다 훨씬 앞서 있다는 걸 매주 증명하고 있는 거잖아요.", createdAt: T13J - m(20), likes: 55 },
    { id: 3, nickname: "익명_1384", holdingLabel: "120주 보유", content: "FSD EU 전면 승인 나오면 구독 수익이 폭발적으로 늘어날 텐데 이 주간 판매 회복이 그 기반을 만들고 있는 거예요. 유럽 100만 대 × FSD 구독 → 게임 체인저.", createdAt: T13J - m(8), likes: 43 },
  ],
  223: [
    { id: 1, nickname: "익명_8293", holdingLabel: "28주 보유", content: "100배가 과장처럼 들려도 산수가 맞아요. 지금도 $111B인데 10년 후 100배면 $11T 데이터센터 시장이에요. NVDA 점유율 50%만 유지해도 $5.5T 연매출인데 지금 시총이 $5T이니 완전 저평가일 수 있어요.", createdAt: T13J - m(18), likes: 61 },
    { id: 2, nickname: "익명_5847", holdingLabel: "15주 보유", content: "FY2026 $200B 목표인데 이미 FY2025에 $111B 달성했으니 +80% 성장이에요. 반도체 회사가 전년비 80% 성장하는 게 말이 안 되는데 NVDA는 이걸 매년 하고 있어요.", createdAt: T13J - m(9), likes: 48 },
    { id: 3, nickname: "익명_2918", holdingLabel: "60주 보유", content: "AI 이용자 50억 명 도달하면 개발도상국도 포함되는데 그 인프라를 NVDA 칩이 다 지원하는 거잖아요. SpaceX Starlink가 그 연결을 담당하는 구조까지 생각하면 두 회사 시너지가 엄청나겠네요.", createdAt: T13J - m(4), likes: 37 },
  ],

  // ── 2026-06-12 신규 ──────────────────────────────────────────────────────
  210: [
    { id: 1, nickname: "익명_3847", holdingLabel: "관심종목", content: "$135 확정이고 선물이 $167이면 나스닥 첫날 $150~160 사이 열리지 않을까요. 역대 대형 IPO들 보면 선물 대비 10~15% 할인 열리는 경우 많았거든요.", createdAt: T12J - m(4), likes: 67 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "BlackRock $50B 넣었다는 거 진짜 어마어마해요. 공모 물량이 $75B인데 BlackRock 혼자 $50B 넣은 거면 초과 청약이 당연한 거죠.", createdAt: T12J - m(2), likes: 53 },
    { id: 3, nickname: "익명_8473", holdingLabel: "관심종목", content: "SpaceX IPO + 이란 공습 취소 + NVDA 반도체 $110.5B 신기록이 같은 날 나온다는 게 진짜 오늘 시장 너무 좋을 것 같아요.", createdAt: T12J - m(1), likes: 44 },
    { id: 4, nickname: "익명_2918", holdingLabel: "관심종목", content: "5-for-1 분할 후 $135면 분할 전 기준 $675인데 그게 $1.75T 기업가치랑 맞는지 계산해보면... IPO 후 S&P 500 편입 시 자동 매수 유입이 추가 촉매가 될 것 같아요.", createdAt: T12J + m(1), likes: 36 },
  ],
  211: [
    { id: 1, nickname: "익명_5284", holdingLabel: "관심종목", content: "4,000명이 순식간에 백만장자가 되면 텍사스 부동산은 또 올라가겠네요. 오스틴·휴스턴 집값 영향 받을 것 같아요.", createdAt: T12J - m(17), likes: 48 },
    { id: 2, nickname: "익명_9182", holdingLabel: "관심종목", content: "11년 동안 SpaceX 다닌 사람들이 이제 쉬어도 되는 거잖아요. 능력 있는 분들이 새 회사 세우면 우주 스타트업 생태계에 엄청난 자금이 풀리는 거예요.", createdAt: T12J - m(8), likes: 37 },
    { id: 3, nickname: "익명_4729", holdingLabel: "관심종목", content: "Google IPO 이후 1,000명 백만장자들이 Stanford 근처에서 엄청난 스타트업 생태계 만들었잖아요. SpaceX IPO 4,000명이면 텍사스에서 그 이상이 될 수 있겠어요.", createdAt: T12J - m(3), likes: 29 },
  ],
  212: [
    { id: 1, nickname: "익명_7391", holdingLabel: "관심종목", content: "IPO 당일에 세계 반도체 핵심 기업 무대에 선다는 것 자체가 메시지예요. TeraFab 얘기 나오면 ASML 주가도 반응할 것 같아요.", createdAt: T12J - m(30), likes: 41 },
    { id: 2, nickname: "익명_3849", holdingLabel: "관심종목", content: "ASML EUV 장비가 TeraFab 들어가면 ASML한테도 큰 수주잖아요. 머스크가 ASML 무대에 서는 건 그냥 연설이 아니라 협업 신호일 수 있죠.", createdAt: T12J - m(15), likes: 33 },
    { id: 3, nickname: "익명_6192", holdingLabel: "관심종목", content: "SpaceX + Tesla + xAI 세 회사 칩 수요가 TeraFab 하나에 모인다는 거 스케일이 다른 거예요. TSMC 의존도 줄이면 지정학 리스크 헤지되고 원가도 장기적으로 낮아지겠죠.", createdAt: T12J - m(5), likes: 25 },
  ],
  213: [
    { id: 1, nickname: "익명_4192", holdingLabel: "80주 보유", content: "Amundi $1.24B이면 그 규모에서 유럽 최대인데 이게 다른 유럽 기관투자자들한테 신호가 되는 거잖아요. Norges Bank나 ABP 같은 유럽 연기금들 테슬라 비중 늘리는 게 시작될 수 있어요.", createdAt: T12J - m(10), likes: 58 },
    { id: 2, nickname: "익명_8374", holdingLabel: "45주 보유", content: "머스크 리스크가 완화됐다는 게 핵심이에요. 유럽 ESG 기준에서 테슬라를 빼는 이유가 머스크 거버넌스 이슈였는데 Amundi가 다시 사면 그 이슈가 공식적으로 해소됐다는 신호죠.", createdAt: T12J - m(4), likes: 44 },
    { id: 3, nickname: "익명_2839", holdingLabel: "20주 보유", content: "Q1 $1.24B 추가 매수면 분기 단위로 이 정도씩 사는 거잖아요. 연간 $5B 수준의 유럽 기관 자금이 테슬라로 들어오는 추세가 시작되는 건지도 모르겠어요.", createdAt: T12J + m(2), likes: 36 },
    { id: 4, nickname: "익명_7193", holdingLabel: "120주 보유", content: "FSD EU 전면 승인까지 나오면 유럽에서 테슬라가 단순 EV가 아니라 AI 구독 서비스 사업자가 되는 거예요. 밸류에이션 재평가가 유럽에서 시작될 것 같아요.", createdAt: T12J + m(5), likes: 28 },
  ],
  214: [
    { id: 1, nickname: "익명_5382", holdingLabel: "65주 보유", content: "ROW 6개월 조항이 핵심이에요. 덴마크가 이미 승인됐으니 6개월 내에 EU 27개국으로 확산되는 게 법적 절차가 되는 거잖아요. 독일·프랑스가 막을 이유가 없어요.", createdAt: T12J - m(24), likes: 72 },
    { id: 2, nickname: "익명_9284", holdingLabel: "30주 보유", content: "유럽 FSD 구독 10%면 $1.2B인데 마진이 90% 이상이에요. 차량 마진 5~10%랑 다른 거예요. 이게 테슬라의 진짜 이익 레버리지예요.", createdAt: T12J - m(11), likes: 54 },
    { id: 3, nickname: "익명_3748", holdingLabel: "50주 보유", content: "벨기에 장관이 '100% 자율주행'이라고 한 거 정말 충격이었어요. 정부 관료가 그런 말을 공식적으로 한다는 건 법적 책임을 지겠다는 거잖아요. 이제 진짜 시작인 것 같아요.", createdAt: T12J - m(3), likes: 43 },
    { id: 4, nickname: "익명_6192", holdingLabel: "175주 보유", content: "EU 승인 후 한국 규제기관도 따라서 볼 것 같아요. 네덜란드 충돌 3.5배 감소 데이터가 있으면 어느 나라도 거부하기 어렵죠.", createdAt: T12J + m(3), likes: 35 },
  ],
  215: [
    { id: 1, nickname: "익명_7284", holdingLabel: "40주 보유", content: "포드 F-150 Lightning이 $74,995인데 사이버트럭 AWD가 $59,990이면 $15,000 싸고 주행거리도 비슷해요. 픽업트럭 시장에서 가격 경쟁력이 생긴 거예요.", createdAt: T12J - m(38), likes: 47 },
    { id: 2, nickname: "익명_3912", holdingLabel: "15주 보유", content: "메가팩 호주 100MW도 완공됐다는 게 에너지 사업 글로벌 확장이 계속 되고 있다는 거예요. 에너지 마진이 자동차 마진보다 높아진 게 유지되면 테슬라 이익 구조가 완전히 바뀌는 거죠.", createdAt: T12J - m(22), likes: 36 },
    { id: 3, nickname: "익명_8472", holdingLabel: "85주 보유", content: "AWD 배달 시작되면 수십만 예약자들이 기다리고 있는 거잖아요. 2021년부터 기다린 분들이 드디어 받는 거예요. 볼륨 증가 + 수익화 동시에 진행되는 거죠.", createdAt: T12J - m(8), likes: 29 },
  ],
  216: [
    { id: 1, nickname: "익명_4821", holdingLabel: "28주 보유", content: "$110.5B 월매출이면 연환산 $1.3T예요. 2년 전 전체 반도체 시장이 $530B이었는데 그게 이제 월 단위 숫자예요. AI 칩 슈퍼사이클이 진짜라는 게 매달 확인되고 있는 거죠.", createdAt: T12J - m(6), likes: 64 },
    { id: 2, nickname: "익명_7393", holdingLabel: "12주 보유", content: "CoWoS 2H26 양산이 NVDA 마진 개선 촉매예요. 패키징 비용 낮아지면 같은 GPU를 더 낮은 원가로 만들 수 있는 거니까요. 수익성 개선이 하반기부터 나타날 수 있어요.", createdAt: T12J - m(2), likes: 48 },
    { id: 3, nickname: "익명_2847", holdingLabel: "50주 보유", content: "Feynman 칩까지 이미 초기 채택 단계라는 게 2028년까지 로드맵이 이미 있다는 거잖아요. 젠슨 황이 1~2년 후 얘기가 아니라 5년 후 얘기를 지금 하는 거예요.", createdAt: T12J + m(1), likes: 39 },
    { id: 4, nickname: "익명_9183", holdingLabel: "8주 보유", content: "반도체 $110.5B은 NVDA만이 아니라 SK하이닉스, TSMC, ASML 전부 수혜받는 거예요. AI 인프라 투자 사이클이 공급망 전체를 끌어올리고 있는 거죠.", createdAt: T12J + m(4), likes: 31 },
  ],
  217: [
    { id: 1, nickname: "익명_6291", holdingLabel: "18주 보유", content: "RPO $638B이면 이미 계약된 미래 수익이잖아요. 오라클 향후 3~5년 매출이 사실상 확정된 거예요. 이 정도 visibility면 밸류에이션 프리미엄 받을 자격이 충분하죠.", createdAt: T12J - m(20), likes: 53 },
    { id: 2, nickname: "익명_3748", holdingLabel: "10주 보유", content: "OCI가 AWS·Azure보다 30~50% 싸다는 게 진짜 수주 폭발의 이유예요. 같은 성능이면 당연히 싼 걸 쓰는 거죠. 오라클 레거시 DB 고객들이 AI로 전환할 때 OCI 선택하는 게 자연스러운 경로고요.", createdAt: T12J - m(8), likes: 41 },
    { id: 3, nickname: "익명_8374", holdingLabel: "30주 보유", content: "CAGR 129.5%가 지속 가능하지는 않겠지만 수주가 이미 $638B이니 향후 3~4년 매출이 확보된 거예요. 현 PER 기준 비싸 보여도 RPO 기준으로는 저평가 논쟁이 생길 수 있어요.", createdAt: T12J - m(2), likes: 33 },
  ],
  218: [
    { id: 1, nickname: "익명_5192", holdingLabel: "관심종목", content: "이란 공습 취소가 SpaceX IPO 날 나왔다는 타이밍이 너무 좋아요. 어제 지정학 리스크로 불안했는데 오늘 해소되면서 시장 분위기가 완전히 달라졌네요.", createdAt: T12J - m(44), likes: 45 },
    { id: 2, nickname: "익명_7384", holdingLabel: "관심종목", content: "유가 $90에서 $85로 내려오면 6월 CPI가 3% 이하로 유지될 수 있어요. 그러면 연준 금리 인하 기대도 살아나고 성장주 할인율 낮아지는 거니까 NVDA·TSLA 모두 좋은 거죠.", createdAt: T12J - m(28), likes: 36 },
    { id: 3, nickname: "익명_2947", holdingLabel: "관심종목", content: "트럼프 스타일이 강경-협상 번갈아가는 패턴이잖아요. 어제 강경 발언 → 오늘 협상 재개. 최종 타결까지 몇 달 걸리겠지만 방향은 협상으로 가는 것 같아요.", createdAt: T12J - m(12), likes: 28 },
  ],

  // ── 2026-06-11 신규 ──────────────────────────────────────────────────────
  190: [
    { id: 1, nickname: "익명_4827", holdingLabel: "관심종목", content: "5-for-1 분할 후 $25~30이면 일반 투자자 진입 장벽 완전히 낮춘 거예요. 공모주 신청하고 싶은데 한국에서 어떻게 참여해야 할지가 고민이에요.", createdAt: T11J - m(9), likes: 34 },
    { id: 2, nickname: "익명_7293", holdingLabel: "관심종목", content: "3대 신용평가사 투자등급이면 연기금이랑 보험사 자금이 들어올 수 있는 거잖아요. IPO 물량 소화에는 문제 없을 것 같아요.", createdAt: T11J - m(5), likes: 26 },
    { id: 3, nickname: "익명_1847", holdingLabel: "관심종목", content: "내일 상장인데 공모가 $25~30에서 첫날 얼마까지 갈지가 진짜 궁금해요. 아람코처럼 조용히 시작할지 엄청 튈지.", createdAt: T11J - m(2), likes: 19 },
  ],
  191: [
    { id: 1, nickname: "익명_5391", holdingLabel: "관심종목", content: "$1.75T가 12개 방산기업 합산보다 크다는 비교가 임팩트 있어요. GE Aerospace 혼자도 대형주인데 그 5배짜리가 내일 상장한다는 거잖아요.", createdAt: T11J - m(26), likes: 47 },
    { id: 2, nickname: "익명_8412", holdingLabel: "관심종목", content: "Starlink $10.8B 연매출 + AI 임대 $4B+ + 발사 서비스 + TeraFab... 수익 다각화가 이 정도면 $1.75T도 여전히 저평가 논쟁이 나올 수 있어요.", createdAt: T11J - m(12), likes: 38 },
    { id: 3, nickname: "익명_3049", holdingLabel: "관심종목", content: "머스크 제국 전체가 $3.4T+ 가치라는 게 한 개인이 만든 규모로는 인류 역사상 전례가 없는 것 같아요.", createdAt: T11J - m(4), likes: 29 },
  ],
  192: [
    { id: 1, nickname: "익명_6184", holdingLabel: "관심종목", content: "Starship 10회 = Falcon 9 23회 용량이라는 게 결국 발사 비용 구조가 완전히 바뀐다는 얘기예요. 완전 재사용까지 가면 Starlink 마진이 구조적으로 개선되는 거죠.", createdAt: T11J - m(14), likes: 42 },
    { id: 2, nickname: "익명_9273", holdingLabel: "관심종목", content: "TeraFab이 SpaceX·Tesla·xAI 세 개가 같이 쓰는 거면 비용 분담도 되고 3개 회사 칩 수요가 다 모이니 규모의 경제도 생기겠죠. TSMC 리스크 헤지까지요.", createdAt: T11J - m(5), likes: 31 },
  ],
  193: [
    { id: 1, nickname: "익명_2938", holdingLabel: "관심종목", content: "BBB-가 투자등급 최저선이긴 한데 민간 우주기업이 세 기관에서 동시에 받은 게 전례가 없는 거잖아요. 기관 수요가 확인됐다는 신호예요.", createdAt: T11J - m(4), likes: 38 },
    { id: 2, nickname: "익명_7483", holdingLabel: "관심종목", content: "채권 발행 가능해지면 SpaceX가 낮은 이자율로 대규모 자금 조달할 수 있어요. IPO 자금에 채권 발행까지 더하면 Bastrop 기가팩토리, TeraFab, Starship 동시 투자도 가능하겠죠.", createdAt: T11J - m(1), likes: 27 },
  ],
  194: [
    { id: 1, nickname: "익명_5829", holdingLabel: "150주 보유", content: "AVO 인가 2주 만에 89대라는 속도가 진짜 빠른 거예요. 이 속도로 가면 7월 공식 배포 때는 200~300대는 될 것 같아요. Waymo가 SF에서 몇 년 걸린 거랑 비교가 안 되네요.", createdAt: T11J - m(10), likes: 72 },
    { id: 2, nickname: "익명_3281", holdingLabel: "60주 보유", content: "전량 2026 Model Y라는 거 보면 Tesla가 Cybercab 대기 없이 바로 상업화 가능한 플랫폼 있다는 게 강점이에요. 경쟁사들은 전용 자율주행 차량 개발해야 하는데.", createdAt: T11J - m(5), likes: 53 },
    { id: 3, nickname: "익명_8472", holdingLabel: "25주 보유", content: "89대는 시작이에요. 7월 오스틴 공식 배포 → 라스베이거스 허가 → 마이애미... 로보택시 TAM이 수천조인데 초기 플릿 수 지금 세는 게 나중에 웃음이 될 수 있어요.", createdAt: T11J + m(2), likes: 44 },
  ],
  195: [
    { id: 1, nickname: "익명_7193", holdingLabel: "90주 보유", content: "5/29 AVO 인가 → 6/10 VIN 8대 → 6/11 89대. 불과 10일 만에 이 정도 플릿 증가면 내부적으로 이미 수백 대가 준비된 거 아닌가요. 7월 오피셜 배포 전에 선행 배치가 계속 이루어지는 것 같아요.", createdAt: T11J - m(32), likes: 61 },
    { id: 2, nickname: "익명_4827", holdingLabel: "35주 보유", content: "라스베이거스 허가 신청이랑 텍사스 89대 운행이 동시에 진행되고 있다는 게 투자자 입장에서는 좋은 거예요. 텍사스는 수익화 시작, 네바다는 다음 시장 준비. 진짜 체계적이에요.", createdAt: T11J - m(15), likes: 47 },
    { id: 3, nickname: "익명_2947", holdingLabel: "110주 보유", content: "Model Y 89대가 하루에 평균 10시간 운행하면서 $30/시간 수익이면 하루 $26,700, 연간 $9.7M이에요. 1,000대 되면 연 $100M+. 이게 진짜 수익화 스토리의 시작이죠.", createdAt: T11J + m(1), likes: 39 },
  ],
  196: [
    { id: 1, nickname: "익명_9182", holdingLabel: "250주 보유", content: "Piper Sandler가 '자율주행 문제 해결'이라고 공식 선언하고 레이팅에 Autonomy 추가한 거 진짜 큰 뉴스예요. 이런 언어를 쓴다는 게 Wall St 커버리지가 바뀌는 신호거든요. FSD 구독 밸류에이션 모델이 이제 주류가 되는 거예요.", createdAt: T11J - m(7), likes: 89 },
    { id: 2, nickname: "익명_6284", holdingLabel: "75주 보유", content: "누적 FSD 170B 마일이라는 게 경쟁사가 절대로 따라잡기 어려운 학습 데이터예요. Waymo는 지오펜싱 안에서만 하고 Tesla는 전세계 도로에서 학습 중이니 질도 다르고 양도 달라요.", createdAt: T11J - m(3), likes: 67 },
    { id: 3, nickname: "익명_3827", holdingLabel: "40주 보유", content: "덴마크·벨기에 2개국이 하루에 나왔다는 것도 놀랍지만 벨기에 장관이 '100% 자율주행'이라고 직접 말한 게 EU 규제 기관들한테 미치는 영향이 있겠죠.", createdAt: T11J + m(1), likes: 54 },
  ],
  197: [
    { id: 1, nickname: "익명_4827", holdingLabel: "관심종목", content: "FSD 170B 마일에 유럽 2개국 승인이면 오늘 Tesla 뉴스가 진짜 좋네요. 내일 SpaceX IPO에 묻히는 게 좀 아깝다 싶을 정도예요.", createdAt: T11J - m(40), likes: 73 },
    { id: 2, nickname: "익명_8471", holdingLabel: "25주 보유", content: "FSD 덴마크·벨기에 다음은 독일이 핵심이에요. 독일 규제 통과하면 프랑스·스페인 줄줄이 따라오는 구조거든요. EU 최대 시장 뚫리면 유럽 FSD 구독 수익이 터지는 거예요.", createdAt: T11J - m(18), likes: 58 },
    { id: 3, nickname: "익명_6391", holdingLabel: "60주 보유", content: "FSD Level 4 공식 인정 + 덴마크 벨기에 승인 + 89대 로보택시 운행... 테슬라 오늘 뉴스가 다 좋네요. IPO 기대감이 시장 전체에 활기를 주는 것 같아요.", createdAt: T11J - m(5), likes: 49 },
  ],
  198: [
    { id: 1, nickname: "익명_3917", holdingLabel: "15주 보유", content: "CPI 2.9%에 Core도 2.9%면 연준 금리 인하 기대는 완전히 사라진 거예요. 여기다 이란 사태로 유가까지 $90이면 6월 CPI가 3%+ 갈 수 있어서 하반기 시장 전망이 복잡해졌어요.", createdAt: T11J - m(18), likes: 43 },
    { id: 2, nickname: "익명_7284", holdingLabel: "8주 보유", content: "타이밍이 묘한 게 SpaceX IPO가 내일인데 이란 리스크랑 CPI가 같이 터졌어요. 기관들이 리스크 오프 모드 되면 IPO 수요에 영향 줄 수 있는데 SpaceX 스토리는 그냥 사야 하는 거라 문제없을 것 같기도 하고요.", createdAt: T11J - m(8), likes: 31 },
  ],
  199: [
    { id: 1, nickname: "익명_5192", holdingLabel: "관심종목", content: "트럼프 이란 발언 타이밍이 최악이에요. 내일 SpaceX IPO인데 중동 불안으로 시장 변동성 커지면... 뭐 대형 IPO는 웬만한 악재에도 통과했긴 해요. $1.75T 스토리가 워낙 강하니까요.", createdAt: T11J - m(46), likes: 51 },
    { id: 2, nickname: "익명_8391", holdingLabel: "관심종목", content: "유가 $90이면 에너지 비용 오르는 게 결국 Starlink 위성 발사 비용에도 영향 주긴 해요. 근데 SpaceX는 자체 전력망 구축 중이라 장기적으로는 헤지가 되는 구조긴 하죠.", createdAt: T11J - m(22), likes: 37 },
  ],
  // ── 2026-06-10 신규 ──────────────────────────────────────────────────────
  180: [
    { id: 1, nickname: "익명_8371", holdingLabel: "관심종목", content: "1천만 sqft면 진짜 상상이 안 되는 크기예요. 그것도 태양광/풍력 자체 전력이면 전기료도 거의 0에 수렴할 텐데 AI 임대 수익 마진이 얼마나 높을지...", createdAt: T10J - m(8), likes: 37 },
    { id: 2, nickname: "익명_2934", holdingLabel: "관심종목", content: "$21.5B 계약이랑 세트로 나온 게 포인트죠. 기가팩토리 짓기도 전에 임차인이 확정됐다는 거니까요.", createdAt: T10J - m(4), likes: 28 },
    { id: 3, nickname: "익명_6102", holdingLabel: "관심종목", content: "SpaceX IPO 밸류에이션이 $350B인데 Bastrop 기가팩토리 가동 후에는 $500B+ 논의가 나와도 이상하지 않겠어요.", createdAt: T10J - m(1), likes: 21 },
  ],
  181: [
    { id: 1, nickname: "익명_4812", holdingLabel: "관심종목", content: "Google이랑 Anthropic이 SpaceX를 선택했다는 게 신뢰 인증서 같은 거죠. AWS/Azure 대신 SpaceX를 쓴다는 거 아닌가요.", createdAt: T10J - m(15), likes: 44 },
    { id: 2, nickname: "익명_7293", holdingLabel: "관심종목", content: "5년 계약이면 연 $4.3B인데 Starlink 매출 $10.8B에 이거 더하면 SpaceX 연매출이 $15B+ 수준이 되는 거네요.", createdAt: T10J - m(9), likes: 31 },
    { id: 3, nickname: "익명_3847", holdingLabel: "관심종목", content: "비상장인데 이런 계약이 공개된다는 것 자체가 IPO 준비 신호일 수 있어요. 투자자들한테 수익 구조 보여주는 거죠.", createdAt: T10J - m(3), likes: 18 },
    { id: 4, nickname: "익명_9018", holdingLabel: "관심종목", content: "역대 단일 AI 인프라 계약 최대라는 타이틀이 진짜인가요? 그렇다면 SpaceX가 AI 인프라 사업자로서 공식적으로 자리잡은 거네요.", createdAt: T10J + m(2), likes: 15 },
  ],
  182: [
    { id: 1, nickname: "익명_5319", holdingLabel: "70주 보유", content: "공항-호텔-카지노 라우트가 완전히 최적이에요. 동일한 경로를 반복하는 거라 FSD 학습 효율도 높고 수익도 안정적이죠.", createdAt: T10J - m(6), likes: 33 },
    { id: 2, nickname: "익명_8472", holdingLabel: "40주 보유", content: "Waymo가 라스베이거스 미진출이면 Tesla가 최초 로보택시 사업자가 되는 건데 선점 프리미엄이 엄청날 것 같아요.", createdAt: T10J - m(2), likes: 24 },
    { id: 3, nickname: "익명_1837", holdingLabel: "25주 보유", content: "네바다는 원래 자율주행 규제가 우호적이었잖아요. 승인 받는 것도 빠를 것 같아요.", createdAt: T10J + m(1), likes: 17 },
  ],
  183: [
    { id: 1, nickname: "익명_6291", holdingLabel: "90주 보유", content: "AVO 인가 2주 만에 VIN 등록이라는 속도감이 좋아요. 7월 배포 진짜 현실적으로 가능해 보여요.", createdAt: T10J - m(11), likes: 41 },
    { id: 2, nickname: "익명_3728", holdingLabel: "35주 보유", content: "Model Y로 선점하고 Cybercab 양산되면 교체하는 전략이겠죠. 인프라는 미리 깔고 하드웨어는 업그레이드.", createdAt: T10J - m(5), likes: 29 },
    { id: 3, nickname: "익명_7104", holdingLabel: "15주 보유", content: "8대로 시작해서 Q3에 몇 대까지 늘릴지가 진짜 관전 포인트예요. 100대 넘으면 본격 수익화 시작이겠죠.", createdAt: T10J - m(1), likes: 19 },
  ],
  184: [
    { id: 1, nickname: "익명_4829", holdingLabel: "200주 보유", content: "부상 14.9배 감소라는 게 의미하는 게 심각한 충돌이 거의 사라진다는 거잖아요. 사람들이 FSD를 쓰면 쓸수록 더 안전해지는 구조인데 이게 알려지면 FSD 구독률이 올라갈 수밖에 없어요.", createdAt: T10J - m(7), likes: 58 },
    { id: 2, nickname: "익명_6391", holdingLabel: "75주 보유", content: "유럽에서 나온 데이터라는 게 더 의미있어요. 미국과 도로 환경이 다른데 거기서도 이 결과가 나온다면 글로벌 적용 가능성이 확인된 거죠.", createdAt: T10J - m(3), likes: 39 },
    { id: 3, nickname: "익명_9183", holdingLabel: "45주 보유", content: "덴마크 이미 됐고 네덜란드 데이터 이 정도면 독일이나 프랑스도 시간 문제예요. EU FSD 수익화가 가시화되는 거네요.", createdAt: T10J + m(1), likes: 27 },
    { id: 4, nickname: "익명_2047", holdingLabel: "30주 보유", content: "보험사들이 이 데이터 보고 FSD 차량 보험료 낮춰주기 시작하면 고객 경제성도 올라가는 선순환이 만들어지겠어요.", createdAt: T10J + m(4), likes: 21 },
  ],
  185: [
    { id: 1, nickname: "익명_7382", holdingLabel: "120주 보유", content: "Tesla FSD 3.5배 vs Waymo 2.2배 비교가 핵심이죠. 방식이 달라도 결과로 보면 Tesla가 앞선다는 거잖아요.", createdAt: T10J - m(18), likes: 46 },
    { id: 2, nickname: "익명_4928", holdingLabel: "55주 보유", content: "Semi EU 준비까지 오늘 나오니까 테슬라 뉴스 풀 세트네요. 로보택시·FSD·Semi 3개 축이 다 움직이고 있어요.", createdAt: T10J - m(9), likes: 34 },
    { id: 3, nickname: "익명_1726", holdingLabel: "20주 보유", content: "EU 화물 시장이 30만 대 규모인데 거기다 전기차 의무 비율까지 높아지면 Semi 수요가 구조적으로 올라오죠.", createdAt: T10J - m(3), likes: 22 },
  ],
  186: [
    { id: 1, nickname: "익명_3748", holdingLabel: "60주 보유", content: "젠슨 황이 주가 얘기 하는 건 진짜 드문데 그만큼 자신 있다는 거겠죠. 수주잔고 H1 2027까지 확보됐다고 하면 그냥 믿어야 하는 거 아닌가요.", createdAt: T10J - m(5), likes: 63 },
    { id: 2, nickname: "익명_9274", holdingLabel: "30주 보유", content: "AI 전환 초기 논거가 설득력 있어요. 전세계 서버 90%가 CPU 기반이면 GPU로 전환되는 과정이 10년 이상 걸리는 거고 NVDA는 그 과정에서 계속 성장하는 거죠.", createdAt: T10J - m(2), likes: 47 },
    { id: 3, nickname: "익명_6183", holdingLabel: "10주 보유", content: "단기 주가 조정 때마다 이 발언 생각나면 좋겠네요. 매수 기회라고 직접 말한 CEO 믿어야죠.", createdAt: T10J + m(1), likes: 29 },
  ],
  187: [
    { id: 1, nickname: "익명_8392", holdingLabel: "45주 보유", content: "Apple이 Google 손잡은 거 자체가 Microsoft 견제 심리가 얼마나 큰지 보여주는 거예요. NVDA는 모두에게 파는 구조라 제일 안전한 포지션이죠.", createdAt: T10J - m(22), likes: 38 },
    { id: 2, nickname: "익명_5018", holdingLabel: "22주 보유", content: "Intel 발주가 의미있는 게 NVDA가 TSMC 아닌 곳에서도 제조할 수 있다는 걸 보여주는 거잖아요. 공급 다변화가 중요해지는 시대에 맞는 결정이에요.", createdAt: T10J - m(7), likes: 27 },
  ],
  188: [
    { id: 1, nickname: "익명_4719", holdingLabel: "15주 보유", content: "중국이 $2,950억 쏟아붓는다는 게 NVDA한테는 위협이지만 AI 섹터 전체로 보면 수요가 그만큼 폭발적이라는 증거예요. 중국 내수는 화웨이로 가겠지만 나머지 세계 수요는 NVDA로 가죠.", createdAt: T10J - m(9), likes: 44 },
    { id: 2, nickname: "익명_7283", holdingLabel: "8주 보유", content: "냉각 장비, 전력 설비, 구리 수요가 다 올라가는 거라 간접 수혜 종목도 봐야 할 것 같아요.", createdAt: T10J - m(4), likes: 26 },
  ],
  189: [
    { id: 1, nickname: "익명_2938", holdingLabel: "관심종목", content: "OpenAI IPO가 $75B+에서 상장하면 AI 섹터 밸류에이션 기준이 완전히 바뀌는 거예요. Anthropic도 그 이상 평가받게 되고 AMZN 보유 지분 가치도 올라가죠.", createdAt: T10J - m(28), likes: 52 },
    { id: 2, nickname: "익명_6183", holdingLabel: "관심종목", content: "Starlink 연매출 $10.8B이면 단독 상장 시 PSR 10배만 줘도 $108B이에요. 이걸 SpaceX가 통째로 들고 있으니 $350B도 이미 저평가 아닌가요.", createdAt: T10J - m(15), likes: 38 },
    { id: 3, nickname: "익명_8412", holdingLabel: "관심종목", content: "오늘 뉴스 흐름이 AI 인프라 → Starlink → OpenAI → JPMorgan 에이전트까지 다 연결되네요. AI 슈퍼사이클이 맞는 것 같아요.", createdAt: T10J - m(5), likes: 31 },
  ],
  // ── 2026-05-28 신규 ──────────────────────────────────────────────────────
  156: [
    { id: 1, nickname: "익명_5291", holdingLabel: "110주 보유", content: "Cybercab에 SBW 들어가면 물리 스티어링 컬럼 아예 빼고 내부 공간을 더 넓게 쓸 수 있는 거잖아요. 로보택시 실내 디자인 자유도가 훨씬 높아지는 거예요. FSD 8세대랑 맞물리면 진짜 완성도 있는 자율주행차가 나올 것 같아요.", createdAt: T28 - m(5), likes: 41 },
    { id: 2, nickname: "익명_7394", holdingLabel: "30주 보유", content: "소프트웨어 제어가 100%면 해킹 리스크 어떻게 보나요? 물리 컬럼이 없으면 소프트웨어 장애 시 완전 제어 불능이 되는 거 아닌가 해서요.", createdAt: T28 - m(2), likes: 19 },
    { id: 3, nickname: "익명_8271", holdingLabel: "65주 보유", content: "리던던시 설계가 핵심이죠. Tesla가 이미 3중 센서 체계로 신뢰성 확보하는 구조인데 SBW도 백업 액추에이터 있을 거예요. Cybertruck이 이미 양산되고 있다는 게 이미 안전 기준 통과한 증거고요.", createdAt: T28 + m(1), likes: 33 },
  ],
  157: [
    { id: 1, nickname: "익명_4193", holdingLabel: "20주 보유", content: "조향 구독 업그레이드 말씀하신 거 진짜 가능한 시나리오예요. 지금도 FSD 구독이 $99/월인데 스포츠 모드 조향이나 오프로드 특화 조향을 따로 팔면 하드웨어 없이 소프트웨어로 매출 만드는 거잖아요. 애플이 Apple One처럼.", createdAt: T28 - m(12), likes: 28 },
    { id: 2, nickname: "익명_6382", holdingLabel: "85주 보유", content: "이거 결국 차량이 플랫폼이 되는 거예요. OTA로 기능 추가·개선·구독화가 가능하면 판매 후에도 지속 수익이 발생하는 구조. 테슬라가 Apple처럼 생태계 기반 수익 모델 만드는 길로 가고 있는 거예요.", createdAt: T28 + m(2), likes: 22 },
  ],
  158: [
    { id: 1, nickname: "익명_3847", holdingLabel: "50주 보유", content: "H1 2027 수주잔고가 Committed Purchase Orders라는 게 핵심이에요. '예상 수요'가 아니라 계약서 싸인된 물량이라는 거잖아요. 이 정도 가시성 가진 기업이 PER 얼마든 비싸다고 할 수 있나 싶어요.", createdAt: T28 - m(7), likes: 54 },
    { id: 2, nickname: "익명_7284", holdingLabel: "22주 보유", content: "Anthropic $64B 계약이 실제로 존재한다면 그게 NVDA 연간 매출의 얼마예요. 지난 분기 $44B이었나요? 계약 하나가 분기 매출에 버금가는 규모면 가시성이 진짜 다른 수준이네요.", createdAt: T28 - m(3), likes: 38 },
    { id: 3, nickname: "익명_9182", holdingLabel: "8주 보유", content: "AWS, Meta, MS, Google이 다 사는 구조에서 공급 부족이 생기면 가격 협상력은 NVDA에 있는 거잖아요. GPU ASP(평균판매가) 계속 오르는 이유가 그거예요.", createdAt: T28 + m(1), likes: 27 },
    { id: 4, nickname: "익명_5192", holdingLabel: "40주 보유", content: "단기 조정이 와도 매분기 수주잔고 업데이트 나오면 주가 버팀목이 되는 거예요. 지금 NVDA 포지션 유지가 맞다고 봐요.", createdAt: T28 + m(4), likes: 21 },
  ],
  159: [
    { id: 1, nickname: "익명_8374", holdingLabel: "35주 보유", content: "Brookfield CEO가 AI 인프라 기업인데 그 분이 '다 Nvidia'라고 하면 진짜 현업에서 느끼는 거잖아요. 분석가 의견보다 실제 구축하는 사람 말이 더 신뢰가 가요.", createdAt: T28 - m(19), likes: 33 },
    { id: 2, nickname: "익명_4827", holdingLabel: "12주 보유", content: "$225B+ CAPEX를 Nvidia 없이 소화할 방법이 없는 상황이에요. AMD MI300X가 대안이긴 한데 수요 대비 공급이 너무 달리니까요. 이 구조 당분간 안 꺾여요.", createdAt: T28 + m(1), likes: 26 },
    { id: 3, nickname: "익명_6291", holdingLabel: "60주 보유", content: "Azure 마진 -2.5bps 나온 거 보면 MS도 NVDA GPU 비용 부담이 크다는 거잖아요. AWS는 Trinium으로 일부 대체하는데 MS는 순수하게 NVDA 의존 → 비용 구조 불리해지는 거예요.", createdAt: T28 + m(3), likes: 18 },
  ],
  160: [
    { id: 1, nickname: "익명_2847", holdingLabel: "40주 보유", content: "90배 성장이 진짜로 가능했던 거 보면 반도체 사이클이 AI로 한번 더 점프할 수 있다고 봐요. 다만 CXMT가 변수인데 HBM은 못 따라온다는 거 믿으면 MU 장기 보유 맞다고 생각해요.", createdAt: T28 - m(9), likes: 37 },
    { id: 2, nickname: "익명_5193", holdingLabel: "18주 보유", content: "Elon이 MU 데이터 올린 거 자체가 의미 있어요. NVDA 공급망 핵심 업체를 관심 있게 보는 거잖아요. Tesla가 AI 훈련에 HBM 쓰는 양이 늘어날수록 MU 수요도 늘어나는 구조예요.", createdAt: T28 + m(1), likes: 24 },
    { id: 3, nickname: "익명_7291", holdingLabel: "25주 보유", content: "CHIPS법 팹 확장이 2028년 완성이면 그때까지 2년 남았는데 그 전에 HBM4 수요가 피크를 찍으면 타이밍이 딱 맞는 거예요. 2026~2028이 MU의 황금기일 수 있어요.", createdAt: T28 + m(4), likes: 19 },
  ],
  161: [
    { id: 1, nickname: "익명_3918", holdingLabel: "30주 보유", content: "MU 작년 연간 리포트에서 HBM 비중이 전체 매출의 30% 수준이었던 것 같아요. 이게 2026년에 50% 넘어가면 CXMT 리스크는 절반으로 줄어드는 거고, 나머지 범용 DRAM은 가격 압박 받더라도 전체 마진이 올라가는 구조가 돼요.", createdAt: T28 - m(27), likes: 22 },
    { id: 2, nickname: "익명_6284", holdingLabel: "45주 보유", content: "HBM이랑 범용 DRAM을 같이 파는 포트폴리오에서 HBM 비중 늘리는 게 지금 MU 경영진의 핵심 전략이에요. 실적 컨퍼런스콜에서 매 분기 업데이트 나오니 그거 보면 방향성 확인돼요.", createdAt: T28 + m(2), likes: 16 },
  ],
  162: [
    { id: 1, nickname: "익명_7392", holdingLabel: "25주 보유", content: "중국 정부가 33조를 한 번에 넣는다는 게 이건 기업 투자가 아니라 국가 전략이에요. 삼성·SK하이닉스가 정부 지원 없이 싸움하는 거랑 차원이 다른 경쟁이에요. 한국 정부도 HBM 방어에 더 적극적으로 나와야 할 것 같아요.", createdAt: T28 - m(5), likes: 46 },
    { id: 2, nickname: "익명_4819", holdingLabel: "60주 보유", content: "Corsair가 쓴다는 거 진짜 충격이었어요. 게이머들이 쓰는 RAM이 중국산이 됐다는 건데... 미국 제재가 완전하지 않다는 증거이기도 하고요. 소비자는 싸면 사는 거니까요.", createdAt: T28 - m(2), likes: 31 },
    { id: 3, nickname: "익명_9183", holdingLabel: "15주 보유", content: "범용 DRAM 가격 하락이 나쁜 것만은 아니에요. PC 제조사나 스마트폰 업체 입장에선 부품 비용이 낮아지는 거니까 최종 제품 마진 올라가죠. 소비자도 PC 조립 비용 낮아지고. 문제는 MU 같은 생산자 마진이 줄어드는 거예요.", createdAt: T28 + m(3), likes: 23 },
    { id: 4, nickname: "익명_2847", holdingLabel: "80주 보유", content: "결론은 HBM 비중 높은 SK하이닉스가 CXMT 충격을 제일 적게 받는 구조예요. Micron은 HBM 늘리는 중이고 삼성이 제일 노출이 크고요. 메모리 내에서도 종목 선별이 필요한 시점이에요.", createdAt: T28 + m(6), likes: 35 },
  ],
  163: [
    { id: 1, nickname: "익명_5192", holdingLabel: "35주 보유", content: "3~5년 후 CXMT가 HBM까지 따라오면 그건 완전히 다른 게임인데 그때까지 SK하이닉스·Micron이 얼마나 격차를 벌려놓느냐가 핵심이에요. 기술 리드 = 생존이에요 이 업계에서.", createdAt: T28 - m(14), likes: 29 },
    { id: 2, nickname: "익명_8374", holdingLabel: "10주 보유", content: "지금 당장 HBM 영향 없다는 거 확인하고 MU 추가 매수했어요. CXMT 리포트 나왔을 때 잠깐 흔들렸는데 내용 보니까 지금 내 포지션엔 직접 영향 제한적이라 판단했어요.", createdAt: T28 + m(2), likes: 21 },
    { id: 3, nickname: "익명_3829", holdingLabel: "50주 보유", content: "결국 미국이 CXMT에 추가 제재 카드 쓸 수 있어요. Corsair 같은 기업이 중국산 채용한다는 게 의회에서 문제 삼으면 새 제재 나올 수 있고 그러면 CXMT 타격이 클 수 있어요.", createdAt: T28 + m(5), likes: 17 },
  ],
  164: [
    { id: 1, nickname: "익명_6291", holdingLabel: "30주 보유", content: "Trinium이 NVDA GPU 없이 AI 추론한다는 게 AMZN이 NVDA 의존 줄인다는 거잖아요. 그러면 비용 구조가 개선되고 마진이 올라가는 거예요. 근데 NVDA 투자자 입장에선 Amazon이 NVDA 덜 사는 거 아닌가 걱정도 되긴 해요.", createdAt: T28 - m(7), likes: 44 },
    { id: 2, nickname: "익명_4827", holdingLabel: "45주 보유", content: "Bedrock에서 Claude 쓰는 기업 늘어나면 Anthropic도 수혜고 AMZN도 수혜고 NVDA도 수혜예요. 훈련용 GPU는 계속 NVDA 사야 하고, 추론 일부를 Trinium으로 대체하는 거라 NVDA 수요가 줄어드는 건 아니에요.", createdAt: T28 + m(1), likes: 31 },
    { id: 3, nickname: "익명_8192", holdingLabel: "15주 보유", content: "Azure -2.5bps 하락이 계속되면 기업 IT 담당자들이 AWS로 넘어오는 속도가 빨라져요. 마진 개선이 가격 경쟁력으로 이어지면 시장 점유율 변화도 나올 수 있어요.", createdAt: T28 + m(3), likes: 22 },
  ],
  165: [
    { id: 1, nickname: "익명_3847", holdingLabel: "70주 보유", content: "Andy Jassy가 Claude through Bedrock이라고 직접 언급한 게 IR에서 특정 파트너 제품 이름을 저렇게 노출한다는 게 보통 일이 아니에요. 그만큼 수치가 크다는 거예요.", createdAt: T28 - m(18), likes: 36 },
    { id: 2, nickname: "익명_5291", holdingLabel: "25주 보유", content: "AMZN 장기 홀딩 명분이 AWS AI 마진인데 이게 데이터로 확인되고 있어요. AWS 성장 + 마진 개선 + 광고 수익 + 물류 효율화면 3~5년 뷰로 진짜 좋은 주식이에요.", createdAt: T28 + m(2), likes: 24 },
  ],
  166: [
    { id: 1, nickname: "익명_7394", holdingLabel: "130주 보유", content: "EU 단독 +67%면 전년 동월 대비 거의 두 배 가는 속도예요. 3개월 연속이면 트렌드가 된 거예요. Q2 전체 데이터 나오면 글로벌 인도량 컨센서스 대폭 상향 조정될 것 같아요. 유럽이 회복하면 연간 170만~180만대도 가능해 보여요.", createdAt: T28 - m(4), likes: 62 },
    { id: 2, nickname: "익명_2948", holdingLabel: "70주 보유", content: "VW, BMW 다 역성장하는 환경인데 Tesla만 +46.5% 나온 거 보면 유럽 소비자들이 EV 살 때 대안이 없다는 거예요. BYD는 아직 인지도 낮고 전통 OEM 전기차는 품질·소프트웨어 차이가 크니까요.", createdAt: T28 - m(1), likes: 47 },
    { id: 3, nickname: "익명_4182", holdingLabel: "35주 보유", content: "브랜드 회복 속도가 생각보다 빠른 게 일론 관련 유럽 정서가 생각보다 빨리 희석되는 거 아닐까요. 아니면 신형 Model Y 제품력이 그걸 압도하는 거거나. 어찌됐든 실데이터가 나오는 게 중요해요.", createdAt: T28 + m(2), likes: 31 },
    { id: 4, nickname: "익명_8291", holdingLabel: "20주 보유", content: "FSD 유럽 승인 나오면 그다음 레벨이에요. 지금은 FSD 없이 이 수치인데 FSD 허가 나오는 순간 유럽 판매가 또 점프할 수 있어요.", createdAt: T28 + m(5), likes: 25 },
  ],
  167: [
    { id: 1, nickname: "익명_5192", holdingLabel: "55주 보유", content: "SpaceX Megapack 벨기에 착공이 같이 나온 게 의미 있어요. SpaceX가 Tesla 에너지 제품 대규모 채용하면 에너지 부문 매출에 직접 기여하는 거잖아요. Tesla-SpaceX 수직 통합 시너지가 실현되는 거예요.", createdAt: T28 - m(15), likes: 39 },
    { id: 2, nickname: "익명_7394", holdingLabel: "80주 보유", content: "유럽 EV 의무비율 강화되면 딜러들이 목표 맞추려고 Tesla 더 팔 수밖에 없는 구조예요. 규제가 테슬라 편인 거예요. 이 구조적 수혜가 3~5년은 지속될 것 같아요.", createdAt: T28 + m(1), likes: 28 },
    { id: 3, nickname: "익명_3827", holdingLabel: "28주 보유", content: "Model Y 인도 시작한 지 얼마 안 됐는데 대기 수요도 아직 많이 남아있을 거예요. 5~6월 데이터도 지금 추세 유지하면 Q2 전체 유럽이 역대 최고 될 수도 있어요.", createdAt: T28 + m(4), likes: 22 },
  ],
  168: [
    { id: 1, nickname: "익명_4819", holdingLabel: "관심종목", content: "완전 재사용 달성하면 발사 비용이 10분의 1이 된다는 게 수익성이 폭발적으로 개선되는 거예요. 지금 Starship 발사 비용이 $2000만이라면 $200만으로 낮아지는 거잖아요. 그러면 상업 위성 발사 수요가 폭발적으로 늘어날 거예요.", createdAt: T28 - m(10), likes: 51 },
    { id: 2, nickname: "익명_7291", holdingLabel: "관심종목", content: "Ron Baron이 세계 최대 기업이라는 게 과장이 아닐 수 있어요. B2C + B2B + B2G 세 개 다 성장 중이고 완전 재사용으로 단가 낮아지면 발사 서비스까지 4개 축이에요. $350B이 시작점이라는 거 동의해요.", createdAt: T28 - m(5), likes: 38 },
    { id: 3, nickname: "익명_2847", holdingLabel: "관심종목", content: "비상장이라 직접 못 사는 게 너무 아쉬워요. RKLB 들고 있는데 SpaceX IPO 나오면 비중 이동 고민해야 할 것 같아요. 일단 IPO 소식 나올 때까지 RKLB 홀딩이요.", createdAt: T28 + m(1), likes: 27 },
    { id: 4, nickname: "익명_6183", holdingLabel: "관심종목", content: "Microsoft $555B 파트너십이면 AWS가 아닌 Azure 쪽으로 간다는 거잖아요. SpaceX 인프라 구축에 Azure가 핵심이 된다면 MS 입장에서도 SpaceX IPO가 AWS와의 경쟁에서 이기는 카드가 될 수 있어요.", createdAt: T28 + m(3), likes: 21 },
  ],
  169: [
    { id: 1, nickname: "익명_3847", holdingLabel: "관심종목", content: "Starlink 단독 상장 시나리오 저도 선호해요. Starlink 기업가치만 $200B+ 나오고 거기서 Starship 발사 서비스 별도로 평가받으면 둘 다 독립적으로 성장할 수 있어요. 합치면 서로 발목 잡는 부분이 생기죠.", createdAt: T28 - m(25), likes: 32 },
    { id: 2, nickname: "익명_8293", holdingLabel: "관심종목", content: "테슬라-SpaceX 합병 시 TSLA 주주 희석이 얼마나 되는지 계산해봤는데... SpaceX $350B이면 TSLA 주식 발행이 엄청나요. 지금 $430 기준으로 $350B어치면 약 8억주 발행이고 그게 기존 주식수의 25% 넘어요. 합병 조건이 진짜 중요해요.", createdAt: T28 - m(12), likes: 29 },
    { id: 3, nickname: "익명_5192", holdingLabel: "관심종목", content: "어떤 시나리오든 결국 Elon이 정하는 거잖아요. 나는 그냥 발표 나올 때까지 TSLA 홀딩하면서 상황 보는 게 맞다고 봐요. 시나리오 예측보다 결과 보고 대응이 낫죠.", createdAt: T28 + m(2), likes: 23 },
  ],

  // ── 2026-05-29 신규 ──────────────────────────────────────────────────────
  170: [
    { id: 1, nickname: "익명_5183", holdingLabel: "55주 보유", content: "7월 오스틴 배포가 이제 일정이 아니라 현실이에요. AVO 인가가 나왔으면 법적으로 막을 수가 없는 거잖아요. 로보택시 밸류에이션 재평가가 이번 분기 실적 전에 먼저 올 것 같아요.", createdAt: T29 + m(3), likes: 62 },
    { id: 2, nickname: "익명_9374", holdingLabel: "80주 보유", content: "웨이모는 샌프란에서 인가 받는데 몇 년 걸렸는지 아세요? 테슬라는 텍사스에서 훨씬 빠른 속도로 뚫은 거예요. FSD 데이터 2,670만 마일이 규제 신뢰의 근거인 거죠.", createdAt: T29 + m(8), likes: 44 },
    { id: 3, nickname: "익명_2938", holdingLabel: "30주 보유", content: "안전요원 비용 빠지면 운영 마진이 완전히 달라지는 거잖아요. 택시 기사 인건비 없는 로보택시 vs 우버 기사 있는 구조면 Tesla가 절반 가격에 2배 마진이에요.", createdAt: T29 + m(15), likes: 31 },
    { id: 4, nickname: "익명_6291", holdingLabel: "35주 보유", content: "Cybercab 양산이 7월 AVO랑 겹치는 타이밍이 우연이 아닌 것 같아요. AVO 인가 먼저 확보하고 양산 시작하는 전략이었던 거죠. 일론이 일정 관리를 이렇게 했구나 싶어요.", createdAt: T29 + m(20), likes: 26 },
    { id: 5, nickname: "익명_8492", holdingLabel: "관심종목", content: "이게 실현되면 $TSLA 밸류에이션 접근법 자체가 바뀌어야 해요. EV 제조사가 아니라 플랫폼 기업으로 봐야 하는 거잖아요. 지금 주가는 그걸 아직 안 반영한 거고요.", createdAt: T29 + m(25), likes: 19 },
  ],
  171: [
    { id: 1, nickname: "익명_2847", holdingLabel: "120주 보유", content: "AVO 인가 속도가 빠른 이유가 바로 이 데이터예요. 일 2,670만 마일 쌓인 사고 기록·개입률 데이터를 규제 당국에 보여주면 승인 안 해줄 이유가 없는 거죠.", createdAt: T29 + m(5), likes: 48 },
    { id: 2, nickname: "익명_4183", holdingLabel: "45주 보유", content: "44% MoM이면 6개월 후 일 5,000만 마일이 나오는 거잖아요. 그 시점에 AVO 운행 데이터까지 합쳐지면 다른 주 인가도 연쇄적으로 나올 것 같아요.", createdAt: T29 + m(12), likes: 33 },
    { id: 3, nickname: "익명_7483", holdingLabel: "관심종목", content: "FSD 구독자가 이만큼 늘고 있다는 증거잖아요. $99/월 × 구독자 수가 소프트웨어 수익인데 이게 계속 올라가는 거면 마진 개선이 자동으로 되는 구조예요.", createdAt: T29 + m(18), likes: 25 },
    { id: 4, nickname: "익명_3916", holdingLabel: "관심종목", content: "웨이모 연간 5천만 마일을 테슬라가 하루에 달성하는 게 멀지 않았네요. 이 격차가 좁혀지는 게 아니라 더 벌어지는 구조예요.", createdAt: T29 + m(22), likes: 18 },
  ],
  172: [
    { id: 1, nickname: "익명_5183", holdingLabel: "55주 보유", content: "AVO 인가랑 FSD 데이터가 동시에 나온 날이 역대 가장 강한 자율주행 뉴스 조합이에요. 둘이 서로를 강화하는 선순환인데 시장이 아직 충분히 반영 안 한 것 같아요.", createdAt: T29 + m(2), likes: 54 },
    { id: 2, nickname: "익명_9374", holdingLabel: "80주 보유", content: "Morgan Stanley Adam Jonas가 직접 채널 체크한 숫자라는 게 신뢰도가 높은 거예요. 공식 데이터가 아닌 채널 체크인데 이 정도 구체적인 숫자가 나왔다는 건 소스가 탄탄하다는 거죠.", createdAt: T29 + m(9), likes: 37 },
    { id: 3, nickname: "익명_4829", holdingLabel: "100주 보유", content: "연환산 97.5억 마일이면 경쟁사 전부 합쳐도 테슬라 못 따라가요. 이게 FSD 개선 속도의 근거인데 AVO 인가까지 겹치면 완전 자율 레벨이 현실화되는 시간이 단축되는 거예요.", createdAt: T29 + m(16), likes: 29 },
  ],
  173: [
    { id: 1, nickname: "익명_6291", holdingLabel: "35주 보유", content: "820만 마일/일이 한 달 만에 늘어난 건데 이게 신규 FSD 구독자가 그만큼 생겼다는 뜻이에요. AVO 발표 후 다음 달 숫자가 더 올라갈 것 같아요.", createdAt: T29 + m(4), likes: 41 },
    { id: 2, nickname: "익명_2847", holdingLabel: "120주 보유", content: "이 속도로 가면 연내 일 1억 마일도 가능한데 그러면 FSD의 엣지 케이스 커버리지가 완성에 가까워지는 거예요. 자율주행 완성 타임라인이 예상보다 빠르게 당겨질 것 같아요.", createdAt: T29 + m(11), likes: 28 },
    { id: 3, nickname: "익명_8374", holdingLabel: "65주 보유", content: "44% MoM 성장이 지속되면 내년 이맘때 일 5억 마일 넘는 거잖아요. 그때 웨이모랑 비교하면 자율주행 시장은 사실상 끝났다고 볼 수 있어요.", createdAt: T29 + m(17), likes: 21 },
  ],
  174: [
    { id: 1, nickname: "익명_3726", holdingLabel: "관심종목", content: "TAM $28.5조면 현재 $350B 기업가치는 TAM 대비 1.2%예요. 10% 침투율에 적정 마진 적용해도 $2조 이상 나오는 수학이에요. Polymarkets가 $2조+를 제일 높게 보는 게 합리적이라고 봐요.", createdAt: T29 + m(6), likes: 67 },
    { id: 2, nickname: "익명_8492", holdingLabel: "관심종목", content: "Starlink Connectivity $11.4B이 이미 현재 수익이고 앞으로 커지는 거잖아요. 통신사 30개 과금 구조가 실제 과금이라는 게 확인됐으니까 이게 계속 올라가는 건 확정이에요.", createdAt: T29 + m(14), likes: 49 },
    { id: 3, nickname: "익명_1847", holdingLabel: "40주 보유", content: "AI 서비스 $3.2B도 이제 시작이에요. H100 8,000개 기반 인프라에 Anthropic 연계까지 되면 클라우드 4번째 강자로 올라오는 속도가 생각보다 빠를 것 같아요.", createdAt: T29 + m(20), likes: 35 },
    { id: 4, nickname: "익명_4729", holdingLabel: "관심종목", content: "비상장이라 직접 못 사는 게 진짜 아쉬워요. 지금 살 수 있는 거라고는 TSLA밖에 없는데 합병 시나리오가 현실이 되길 바랄 수밖에요.", createdAt: T29 + m(25), likes: 28 },
  ],
  175: [
    { id: 1, nickname: "익명_7483", holdingLabel: "관심종목", content: "핸드셰이크가 아니라 실 과금이라는 게 핵심이에요. T-Mobile이랑 SoftBank가 실제로 돈을 내고 있다는 거잖아요. 이게 수익 현실화 단계라는 증거예요.", createdAt: T29 + m(7), likes: 58 },
    { id: 2, nickname: "익명_3916", holdingLabel: "관심종목", content: "통신사 입장에서는 자체 위성 쏘는 것보다 Starlink 도매 받는 게 100배 싸요. 이 구조가 한번 자리 잡으면 더 많은 통신사가 들어오는 건 시간문제예요. 50개, 100개로 늘어날 거예요.", createdAt: T29 + m(14), likes: 44 },
    { id: 3, nickname: "익명_2938", holdingLabel: "30주 보유", content: "Starlink 단독 분리 상장 시 이 30개 과금 계약이 B2B 수익 가시성이에요. 할인율이 낮아지면 현재 가치가 올라가는데 과금 계약이 많을수록 리스크가 줄어드는 거잖아요.", createdAt: T29 + m(21), likes: 31 },
  ],
  176: [
    { id: 1, nickname: "익명_5847", holdingLabel: "85주 보유", content: "Anthropic $65B인데 Claude ARR $47B이면 PSR 1.4배예요. OpenAI PSR 4배 대비 엄청 싼 거잖아요. Amazon이 최대 주주인데 상장하면 AMZN 주가에 수조 원어치 가치가 반영될 거예요.", createdAt: T29 + m(5), likes: 73 },
    { id: 2, nickname: "익명_2847", holdingLabel: "120주 보유", content: "Bedrock 통한 Claude 성장이 AWS 마진 1위 만든 거 확인됐잖아요. Anthropic 상장되면 Amazon이 보유한 지분 가치 실현이 엄청날 거고 AWS 밸류에이션도 같이 올라가는 구조예요.", createdAt: T29 + m(12), likes: 51 },
    { id: 3, nickname: "익명_9374", holdingLabel: "80주 보유", content: "세계 최대 비상장 AI 기업이 됐는데 IPO 안 하면 이상한 거잖아요. 2026~2027 상장 논의 본격화하면 그 전에 AMZN 포지션 늘려야 할 것 같아요.", createdAt: T29 + m(18), likes: 38 },
    { id: 4, nickname: "익명_6291", holdingLabel: "35주 보유", content: "Claude $47B ARR 5개월 만에 5배 성장이면 속도가 말이 안 되는 수준이에요. 기업용 AI 채택이 이 정도로 빠를 줄 몰랐는데 Anthropic이 OpenAI보다 기업 고객에 더 잘 먹히는 것 같아요.", createdAt: T29 + m(24), likes: 27 },
  ],
  177: [
    { id: 1, nickname: "익명_4182", holdingLabel: "200주 보유", content: "SMCI 수주잔고 역대 최고라는 거 진짜예요. 회계 정정 끝나고 이제 본업 얘기를 할 수 있는 국면인데 AI 서버 수요가 SMCI 없이는 소화가 안 되는 구조예요. 2030 ROI 수혜 1순위 동의합니다.", createdAt: T29 + m(8), likes: 59 },
    { id: 2, nickname: "익명_5183", holdingLabel: "55주 보유", content: "커스텀 칩 채택하는 하이퍼스케일러들이 AI 서버는 어쨌든 사야 해요. Trainium이든 TPU든 결국 SMCI 랙에 들어가는 거니까 커스텀 칩 확산이 오히려 SMCI 수요 증가예요.", createdAt: T29 + m(15), likes: 42 },
    { id: 3, nickname: "익명_3847", holdingLabel: "50주 보유", content: "나스닥 상폐 위기 해소하고 정상화된 거 확인됐으면 이제 실적으로 증명할 때예요. FY2026 $25B+ 전망이 현실이 되면 지금 주가에서 50% 이상 업사이드 남아 있어요.", createdAt: T29 + m(22), likes: 31 },
  ],
  178: [
    { id: 1, nickname: "익명_9183", holdingLabel: "45주 보유", content: "광고 회사에서 구독+AI 기업으로 재평가받으면 멀티플이 20배에서 30배로 올라가는 거잖아요. 지금 주가에 구독 수익이 반영 안 됐으니까 $314 목표가 오히려 보수적일 수 있어요.", createdAt: T29 + m(4), likes: 71 },
    { id: 2, nickname: "익명_6182", holdingLabel: "80주 보유", content: "32억 MAU 중 1%만 전환해도 $54억 구독 수익인데 이게 예측 가능한 반복 수익이에요. 광고는 경기에 민감한데 구독은 아니잖아요. 포트폴리오 안정성이 올라가는 거예요.", createdAt: T29 + m(11), likes: 53 },
    { id: 3, nickname: "익명_2938", holdingLabel: "30주 보유", content: "AI 광고 ROI 2배 개선 + 구독 수익 + Llama API까지 합치면 세 개 수익 레이어예요. 이게 다 동시에 성장하는 구조면 META가 빅테크 중 가장 레버리지 높은 AI 수혜주가 되는 거 아닌가요.", createdAt: T29 + m(18), likes: 39 },
  ],
  179: [
    { id: 1, nickname: "익명_8374", holdingLabel: "65주 보유", content: "$14 구독이 생각보다 전환율 높을 것 같아요. 광고 싫어하는 사용자들이 많은데 그 사람들이 $14에 광고 없애는 건 충분히 쓸 의향이 있을 것 같거든요.", createdAt: T29 + m(6), likes: 45 },
    { id: 2, nickname: "익명_4829", holdingLabel: "100주 보유", content: "Ray-Ban 스마트 안경 + Orion AR 더하면 하드웨어 TAM까지 추가되는 거잖아요. 광고·구독·AI API·하드웨어 네 개 레이어면 애플 수준의 생태계가 되는 거예요.", createdAt: T29 + m(13), likes: 34 },
  ],

  // ── 2026-05-27 신규 ──────────────────────────────────────────────────────
  139: [
    { id: 1, nickname: "익명_7291", holdingLabel: "120주 보유", content: "Dan Ives가 12개월이라는 게 진짜 무게감 있는 말이에요. 보통 분석가들이 막 던지는 말이 아니고 Wedbush 직인 찍힌 리포트인데. 근데 Kalshi 33%는 시장이 냉정하게 보는 거니까 반반이라 봐야 할 것 같아요", createdAt: T27 - m(4), likes: 47 },
    { id: 2, nickname: "익명_3847", holdingLabel: "50주 보유", content: "합병보다 SpaceX 단독 IPO가 테슬라 주주한테 더 유리할 것 같아요. 합병되면 SpaceX 가치가 테슬라 주가에 녹아드는 거잖아요. 지금 테슬라 $422면 그 안에 SpaceX 프리미엄이 얼마나 들어가 있는 건지 계산이 안 돼요", createdAt: T27 - m(2), likes: 38 },
    { id: 3, nickname: "익명_5628", holdingLabel: "80주 보유", content: "테슬라가 Starlink 기반으로 OTA 업데이트 하면 어디서든 가능해지는 거잖아요. 지금도 되는데 더 빨라지는 거고. FSD 데이터 피드백 루프 가속이 진짜 핵심인 것 같아요", createdAt: T27 + m(1), likes: 29 },
    { id: 4, nickname: "익명_9183", holdingLabel: "180주 보유", content: "CFIUS 심사가 발목 잡을 것 같아요. SpaceX가 군사 계약 많은 회사인데 공개 합병되면 심사 장기화 필수예요. 이것 때문에 Kalshi가 33%로 내려간 거 아닐까요", createdAt: T27 + m(3), likes: 22 },
    { id: 5, nickname: "익명_6182", holdingLabel: "65주 보유", content: "결국 머스크 결정인데... 이 분이 예측 불가능한 행동 많이 해서요. 발표 나오면 그때 대응하는 게 맞을 것 같아요. 지금 포지션 유지합니다", createdAt: T27 + m(6), likes: 15 },
  ],
  140: [
    { id: 1, nickname: "익명_5391", holdingLabel: "200주 보유", content: "교환비율이 핵심이에요. SpaceX $350B이면 테슬라 주식 발행을 얼마나 해야 하는 건데요. 지금도 주식수 급증해서 EPS 희석되는 판에 합병 나오면 얼마나 더 발행할지 계산하기 무서워요", createdAt: T27 - m(14), likes: 31 },
    { id: 2, nickname: "익명_2947", holdingLabel: "95주 보유", content: "머스크 이해관계 단일화는 진짜 중요한 포인트예요. 지금 테슬라 CEO인데 xAI·SpaceX·Boring 다 신경쓰면 집중이 분산되잖아요. 합병으로 하나로 모이면 테슬라가 더 빨리 갈 수도 있어요", createdAt: T27 - m(8), likes: 25 },
    { id: 3, nickname: "익명_4837", holdingLabel: "35주 보유", content: "매크로 입장에서 테슬라-SpaceX 합병이 되면 시총 $3T 가는 건데 그러면 S&P500 비중이 엄청 올라가요. 패시브 펀드 강제 매수가 발생하는 구조예요", createdAt: T27 + m(2), likes: 19 },
    { id: 4, nickname: "익명_8273", holdingLabel: "140주 보유", content: "결국 다 일론이 정하는 거잖아요. 발표 전까지 포지션 줄이는 사람도 있을 것 같고 저도 일부 현금화 고민 중이에요", createdAt: T27 + m(5), likes: 12 },
  ],
  141: [
    { id: 1, nickname: "익명_7293", holdingLabel: "관심종목", content: "SpaceX 단독 IPO면 Starlink 구독 수익이 배수로 인정받을 수 있어요. 합병되면 테슬라 EV 적자랑 같은 basket에 들어가서 밸류에이션이 희석되는 거잖아요. 저도 단독 IPO 선호해요", createdAt: T27 - m(21), likes: 34 },
    { id: 2, nickname: "익명_4182", holdingLabel: "관심종목", content: "Starlink가 항공사 38개 계약, 우주군 $23.5억 계약 나온 걸 보면 단독 $500B도 가능해 보여요. 합치면 그 가치가 희석되는 거죠", createdAt: T27 - m(12), likes: 27 },
    { id: 3, nickname: "익명_6381", holdingLabel: "관심종목", content: "3년 후에 SpaceX 단독 IPO 나오면 그때 사면 되니까 지금 TSLA 합병 루머에 흔들릴 필요는 없는 것 같아요", createdAt: T27 + m(1), likes: 18 },
  ],
  142: [
    { id: 1, nickname: "익명_8372", holdingLabel: "35주 보유", content: "비용 +64%가 다 R&D면 이해하는데 혹시 낭비 없는지 체크가 필요해요. 아마존은 AWS 수익으로 e-commerce 적자 커버했는데 테슬라는 에너지 사업이 그 역할을 해줘야 할 것 같아요", createdAt: T27 - m(8), likes: 36 },
    { id: 2, nickname: "익명_5294", holdingLabel: "210주 보유", content: "FY2025 -$4.9B 역대 최대 적자인데 시장이 $422 유지한다는 게 로봇·FSD 옵션 가치가 그만큼 크다는 거잖아요. AI 기업 밸류에이션으로 보면 지금도 싸다는 논리가 있고 저는 그 편이에요", createdAt: T27 - m(3), likes: 48 },
    { id: 3, nickname: "익명_3748", holdingLabel: "75주 보유", content: "주식수 35% 증가가 제일 싫어요. 기존 주주 희석이 이렇게 빨리 되는 건... 스톡옵션 남발 아닌가요. 경영진 집중 견제가 필요해 보여요", createdAt: T27 + m(2), likes: 22 },
    { id: 4, nickname: "익명_2837", holdingLabel: "45주 보유", content: "에너지 부문 마진이 괜찮다고 들었는데 그게 EV 적자를 얼마나 커버하는지 다음 IR 자료에서 세그먼트별로 봐야 할 것 같아요", createdAt: T27 + m(4), likes: 17 },
  ],
  143: [
    { id: 1, nickname: "익명_6291", holdingLabel: "250주 보유", content: "아마존 2000년대 초 적자 예시 항상 나오는데 그 논리 동의해요. 테슬라가 옵티머스 양산 시작하면 공장 인건비 절감이 직결 수익으로 잡혀요. 그때 되면 지금 적자가 투자였다는 게 증명되는 거죠", createdAt: T27 - m(23), likes: 53 },
    { id: 2, nickname: "익명_4827", holdingLabel: "110주 보유", content: "버티기 힘든 건 맞아요. -$4.9B 적자에 주가는 $422... 하지만 이 회사가 Cybercab 깔면 우버·택시 전체를 먹는다는 걸 믿으면 버틸 수 있어요. 믿음의 싸움이에요", createdAt: T27 - m(15), likes: 41 },
    { id: 3, nickname: "익명_1948", holdingLabel: "30주 보유", content: "장기 투자 할 수 있는 여유 자금으로만 들어가는 게 맞아요. 지금 단기 수익 바라고 들어가면 멘탈 버텨내기 힘들 것 같아요", createdAt: T27 - m(7), likes: 28 },
    { id: 4, nickname: "익명_7391", holdingLabel: "185주 보유", content: "FSD 구독료가 월 $99인데 테슬라 차 700만대 중 10%만 구독해도 분기 $2.1B이에요. 이게 시작만 되면 흑자 전환은 순식간이에요", createdAt: T27 + m(2), likes: 35 },
    { id: 5, nickname: "익명_9182", holdingLabel: "60주 보유", content: "Cybercab 7월 오스틴 배포가 진짜로 시작되면 그때 분위기 180도 바뀔 것 같아요. 지금은 그 직전 인내의 시간이에요", createdAt: T27 + m(5), likes: 19 },
  ],
  144: [
    { id: 1, nickname: "익명_5183", holdingLabel: "55주 보유", content: "FSD랑 동일 AI 쓴다는 게 결정적이에요. 자동차로 쌓은 수백억 마일 데이터를 로봇 훈련에 전용한다는 거잖아요. Figure·1X가 이걸 따라오려면 얼마나 걸릴지 모르겠어요", createdAt: T27 - m(6), likes: 44 },
    { id: 2, nickname: "익명_3729", holdingLabel: "90주 보유", content: "보스턴다이내믹스가 20년 했는데 테슬라가 4년 만에 추월한다는 게 처음엔 말이 안 된다고 생각했는데 AI 훈련 속도가 다르니까 가능한 거였네요. Lisa AI 개발 어시스턴트로 빠르게 배우는 구조가 핵심이었던 거잖아요", createdAt: T27 - m(2), likes: 33 },
    { id: 3, nickname: "익명_8294", holdingLabel: "20주 보유", content: "공장 자체 투입이 수익 경로로 제일 빠른 것 같아요. 외부 판매 기다리지 말고 자기들이 써서 인건비 아끼면 그게 실질 수익이잖아요. 다음 실적 설명회에서 옵티머스 투입 효과 수치로 나와주면 좋겠네요", createdAt: T27 + m(3), likes: 26 },
  ],
  145: [
    { id: 1, nickname: "익명_4193", holdingLabel: "40주 보유", content: "Gen5 발표까지는 좋은데 실제 외부 판매 발표가 진짜 모멘텀이 될 것 같아요. BMW·삼성 같은 기업이 옵티머스 몇 대 산다고 계약하면 그때 주가 다르게 움직일 것 같아요", createdAt: T27 - m(14), likes: 28 },
    { id: 2, nickname: "익명_7283", holdingLabel: "70주 보유", content: "Gen5가 정말 '아무도 가깝지 않다'면 경쟁사들이 3~4년은 못 따라온다는 거잖아요. 그 시간 동안 테슬라가 양산 체계 완성하면 first mover 해자가 엄청 커지는 거예요", createdAt: T27 - m(6), likes: 21 },
    { id: 3, nickname: "익명_2748", holdingLabel: "25주 보유", content: "매년 새 디자인 나온다는 게 iPhone처럼 연간 교체 사이클 만들려는 건가요? 기업 고객이 매년 업그레이드하면 구독처럼 되는 거잖아요 나중에", createdAt: T27 + m(2), likes: 18 },
  ],
  146: [
    { id: 1, nickname: "익명_8392", holdingLabel: "65주 보유", content: "진짜 실용적인 특허예요. FSD가 비오는 날 실패하는 영상 많이 봤는데 이게 해결되면 전천후 주행 가능한 거잖아요. Cybercab 상용화에 직결되는 핵심 기술이에요", createdAt: T27 - m(10), likes: 39 },
    { id: 2, nickname: "익명_5194", holdingLabel: "35주 보유", content: "Waymo가 라이다 쓰는 이유 중 하나가 카메라 오염 문제라고 들었는데 테슬라가 카메라만으로 이걸 극복하면 라이다 없는 게 약점이 아니게 되는 거잖아요. 테슬라 방식 맞다는 거 계속 증명되네요", createdAt: T27 - m(4), likes: 31 },
    { id: 3, nickname: "익명_6291", holdingLabel: "100주 보유", content: "9개 클레임이면 핵심 기술 꽤 넓게 특허 잡은 거예요. 경쟁사들이 비슷한 기술 개발하려면 라이선스 받거나 다른 방법 찾아야 하는 거고. 경쟁 진입 장벽이 하나 더 생긴 거예요", createdAt: T27 + m(2), likes: 23 },
  ],
  147: [
    { id: 1, nickname: "익명_3827", holdingLabel: "90주 보유", content: "중국 84K면 역대 탑권 맞죠. Q2 14만대 달성하면 전체 인도량 50만대 넘어갈 것 같은데 그러면 시장 예상치 서프라이즈 충분히 가능해요. 중국 회복이 진짜 핵심이에요", createdAt: T27 - m(3), likes: 52 },
    { id: 2, nickname: "익명_6193", holdingLabel: "150주 보유", content: "신형 Model Y 효과 + 미중 분위기 개선이 동시에 터진 거라 Q2 기대가 크네요. 근데 BYD가 다음 달 또 신모델 나온다는데 가격 경쟁은 계속 빡셀 것 같아요", createdAt: T27 - m(1), likes: 38 },
    { id: 3, nickname: "익명_7374", holdingLabel: "45주 보유", content: "FSD 중국 승인이 미중 협상 카드로 쓰이고 있다는데 그게 풀리면 더 큰 모멘텀이에요. 지금 84K도 FSD 없이 달성한 거잖아요. FSD 승인 나면 얼마나 더 팔릴지", createdAt: T27 + m(3), likes: 27 },
    { id: 4, nickname: "익명_2947", holdingLabel: "70주 보유", content: "중국 체크 완료. Q2 낙관이에요. 중국이 테슬라 전체 매출 20%인데 거기서 30% 성장 나오면 연결 매출이 달라지는 거잖아요", createdAt: T27 + m(5), likes: 19 },
  ],
  148: [
    { id: 1, nickname: "익명_4827", holdingLabel: "관심종목", content: "B2C(개인 구독) + B2B(기업 항공) + B2G(정부 군사) 세 개 다 챙기는 구조면 리스크 분산도 완벽해요. 어느 쪽이 흔들려도 나머지가 받쳐주는 거잖아요. IPO 빨리 해줬으면", createdAt: T27 - m(8), likes: 43 },
    { id: 2, nickname: "익명_7382", holdingLabel: "관심종목", content: "군사 계약이라 공시 내용 제한적인 거 이해는 하는데... Starlink 군용 버전이 따로 있다는 게 놀랍네요. 상용 인프라 기반에 보안 레이어 올린 거라면 마진도 훨씬 높겠죠", createdAt: T27 - m(3), likes: 31 },
    { id: 3, nickname: "익명_2938", holdingLabel: "관심종목", content: "$2.35B를 Firm-Fixed-Price로 받는다는 거 예산 초과해도 차이 없이 받는 구조잖아요. 그러면 비용 절감 인센티브가 생기고 SpaceX 마진이 올라가는 거예요. 계약 구조가 좋네요", createdAt: T27 + m(2), likes: 24 },
    { id: 4, nickname: "익명_5193", holdingLabel: "관심종목", content: "SDN 계약 성공하면 Space Force 다음 계약, 육군·해군 차례로 들어올 수 있어요. 미군 전체 통신망 계약이면 규모가 $10B도 가능한 거잖아요", createdAt: T27 + m(5), likes: 17 },
  ],
  149: [
    { id: 1, nickname: "익명_3847", holdingLabel: "관심종목", content: "Starlink 단독으로만 봐도 $200B 가치인데 Starship + 정부 계약 더하면 $400B 이상이라는 논리 이해해요. 지금 $350B 기업가치가 오히려 저평가일 수도 있어요. IPO 빨리 해줬으면", createdAt: T27 - m(17), likes: 36 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "Conner 인수 시너지까지 더하면 항공 부분 수익이 더 빠르게 올라오겠네요. 기내 인터넷이 표준화되면 나중엔 기내 엔터테인먼트까지 Starlink 통해서 파는 구조도 될 것 같아요", createdAt: T27 - m(9), likes: 28 },
    { id: 3, nickname: "익명_9183", holdingLabel: "관심종목", content: "테슬라 합병보다 단독 IPO면 청약 넣고 싶어요. RKLB 들고 있는데 SpaceX IPO 나오면 비중 이동해야 할 것 같아요. 우주 섹터가 진짜 커지고 있어요", createdAt: T27 + m(1), likes: 21 },
  ],
  150: [
    { id: 1, nickname: "익명_5193", holdingLabel: "80주 보유", content: "$1조라니... AMD 2020년에 $60억짜리 회사였는데 17배가 됐어요. Lisa Su가 없었으면 불가능했을 거예요. 진짜 대단한 CEO예요. 이 기세로 $1.5T 갈 수 있을까요", createdAt: T27 - m(3), likes: 67 },
    { id: 2, nickname: "익명_7293", holdingLabel: "45주 보유", content: "NVDA 대안 수요가 진짜 힘이에요. NVDA 못 구하는 기업들이 MI300X로 몰리는 거 보면 이제 GPU 시장이 독점에서 이원화로 가는 거잖아요. 둘 다 좋아요", createdAt: T27 - m(1), likes: 52 },
    { id: 3, nickname: "익명_3847", holdingLabel: "100주 보유", content: "EPYC 서버 CPU도 인텔 잠식이 계속되고 있어요. GPU + CPU 다 먹는 건 NVDA도 노리는 건데 AMD가 먼저 CPU에서 자리잡은 거잖아요. 시총 $1T이 끝이 아닌 것 같아요", createdAt: T27 + m(2), likes: 38 },
    { id: 4, nickname: "익명_9182", holdingLabel: "30주 보유", content: "Ackman이 MS에 $2.3B 넣은 것도 AI 섹터 전체에 긍정적 신호가 됐죠. AMD도 그 물결 탄 것 같아요. 기관들이 AI 투자 계속 늘리는 구조에서 AMD는 빠질 수 없는 픽이에요", createdAt: T27 + m(4), likes: 29 },
    { id: 5, nickname: "익명_4827", holdingLabel: "150주 보유", content: "오늘 같은 날 들고 있는 게 행복해요. 연내 $600 보고 갑니다. MI400 나오면 또 한 번 점프하겠죠", createdAt: T27 + m(7), likes: 43 },
    { id: 6, nickname: "익명_2948", holdingLabel: "12주 보유", content: "소량 들고 있어서 수익 별로 없지만 그래도 $1T 기업 주주라는 게 기분 좋네요ㅋㅋ 더 살걸 그랬어요", createdAt: T27 + m(9), likes: 18 },
  ],
  151: [
    { id: 1, nickname: "익명_6182", holdingLabel: "55주 보유", content: "2022년 저점에서 버텨서 6배 넘게 됐어요. 그때 $80에 물타기 했는데 평단이 $120이에요. 이제 네 배 됐네요. 긴 여정이었어요", createdAt: T27 - m(11), likes: 45 },
    { id: 2, nickname: "익명_3847", holdingLabel: "80주 보유", content: "반도체 사이클이 AI로 완전히 바뀐 거예요. 예전엔 PC·스마트폰 사이클 타서 주기적 하락이 있었는데 지금은 AI 인프라 투자가 구조적이라 사이클이 완화됐어요. AMD는 그 구조 변화의 수혜주예요", createdAt: T27 - m(5), likes: 33 },
    { id: 3, nickname: "익명_8294", holdingLabel: "20주 보유", content: "소량이라도 들고 있어서 다행이에요. $600 갈 때까지 안 팔겠습니다", createdAt: T27 + m(1), likes: 27 },
    { id: 4, nickname: "익명_7182", holdingLabel: "35주 보유", content: "Ryzen AI PC도 시작됐고 이제 엔터프라이즈 AI까지 AMD 안 들어가는 곳이 없어요. 다음 $2T 클럽 가능성 있을까요", createdAt: T27 + m(3), likes: 22 },
  ],
  152: [
    { id: 1, nickname: "익명_4829", holdingLabel: "55주 보유", content: "CHIPS법 감독 의원이 직접 MU 산다는 게 논란이긴 한데... 어찌됐든 CHIPS법이 계속될 거라는 확신이 없으면 의원이 살 이유가 없잖아요. 정책 지속성 확신의 역설적 신호로 봐요", createdAt: T27 - m(10), likes: 41 },
    { id: 2, nickname: "익명_7293", holdingLabel: "25주 보유", content: "Fetterman +48%라는 게 진짜네요. 그 분 포트폴리오 보고 싶다는 생각 들어요ㅋㅋ 어쨌든 HBM4 대량 생산 체계 갖추면 NVDA 공급망에서 핵심이 되는 거잖아요", createdAt: T27 - m(4), likes: 29 },
    { id: 3, nickname: "익명_2947", holdingLabel: "40주 보유", content: "$51.6억이 아이다호·뉴욕 팹에 다 들어가면 생산 능력이 엄청 늘어나는 거잖아요. SK하이닉스랑 HBM 양강 체제 완성되면 AI 반도체 슈퍼사이클 내내 수혜예요", createdAt: T27 + m(2), likes: 21 },
  ],
  153: [
    { id: 1, nickname: "익명_8391", holdingLabel: "30주 보유", content: "$858이면 작년 대비 몇 배예요? 진짜 놀랍네요. 메모리도 AI 시대에 완전 다른 종목이 됐어요. SK하이닉스도 같이 보고 있는데 둘 다 들고 가는 게 맞을 것 같아요", createdAt: T27 - m(23), likes: 27 },
    { id: 2, nickname: "익명_6192", holdingLabel: "15주 보유", content: "지금이라도 들어가는 게 맞는지 모르겠는데... HBM4 시장이 막 시작됐으니 아직 초기라고 보면 지금도 늦지 않은 것 같기도 하고요. NVDA 실적 계속 좋으면 MU도 같이 가는 구조니까요", createdAt: T27 - m(11), likes: 18 },
  ],
  154: [
    { id: 1, nickname: "익명_5192", holdingLabel: "60주 보유", content: "에이전트 AI가 App Store를 통해야 한다는 논리 완전 동의해요. 구글도 마이크로소프트도 최종적으로 아이폰 사용자에게 닿으려면 애플 허락 맡아야 하잖아요. 이 통행료가 엄청난 거예요", createdAt: T27 - m(7), likes: 47 },
    { id: 2, nickname: "익명_3847", holdingLabel: "90주 보유", content: "기기 교체 사이클이 진짜 핵심인데 iPhone 15 미만 유저가 AI 기능 못 쓰면 자연스럽게 업그레이드해야 하잖아요. 15억 명 중 절반이 교체하면 매출 얼마예요. 생각만 해도 무서운 숫자예요", createdAt: T27 - m(2), likes: 38 },
    { id: 3, nickname: "익명_7294", holdingLabel: "25주 보유", content: "서비스 매출이 $100B 가면 그게 애플 주가를 다음 레벨로 올리는 거예요. 지금 $311인데 $380은 충분히 가능하고 그 이상도 볼 수 있을 것 같아요", createdAt: T27 + m(2), likes: 28 },
    { id: 4, nickname: "익명_9182", holdingLabel: "40주 보유", content: "Face ID + Apple Pay + Siri 에이전트화... 이 세 개가 연결되면 결제부터 쇼핑까지 아이폰 안에서 다 해결되는 거잖아요. 어마어마한 생태계예요", createdAt: T27 + m(4), likes: 21 },
  ],
  155: [
    { id: 1, nickname: "익명_6291", holdingLabel: "120주 보유", content: "애플은 AI 기업 중에 하드웨어 포함해서 생태계를 통째로 가진 유일한 회사예요. 소프트웨어만 있는 OpenAI나 구글과 다른 차원이에요. $380 목표가 맞다고 봐요", createdAt: T27 - m(16), likes: 33 },
    { id: 2, nickname: "익명_4829", holdingLabel: "35주 보유", content: "컨센서스 평균 $365인데 지금 $311이면 여기서 17% 업사이드잖아요. 배당도 나오고 자사주 매입도 계속하는데 이 가격에 안 사면 언제 사요", createdAt: T27 - m(8), likes: 25 },
  ],
  // ── 2026-05-26 신규 ──────────────────────────────────────────────────────
  128: [
    { id: 1, nickname: "익명_6291", holdingLabel: "50주 보유", content: "7.2배면 단순 스펙 개선이 아니라 패러다임이 바뀌는 거잖아요. GPT-4 급 모델을 GPU 한 장에 넣으면 추론 비용이 얼마나 내려가는 건지... NVDA 홀딩 이유가 하나 더 생겼어요", createdAt: T26 - m(5), likes: 31 },
    { id: 2, nickname: "익명_4829", holdingLabel: "15주 보유", content: "SK하이닉스가 HBM4 독점 공급 유력이면 하이닉스도 같이 봐야겠네요. NVDA랑 같이 움직이는 구조이니까 둘 다 들고 가야 할 것 같아요", createdAt: T26 - m(3), likes: 23 },
    { id: 3, nickname: "익명_2817", holdingLabel: "8주 보유", content: "Vera CPU 자체 설계까지 되면 NVDA가 서버 한 대를 통째로 바꿔버리는 거잖아요. Intel 데이터센터 사업이 진짜 힘들어 보여요", createdAt: T26 + m(2), likes: 18 },
  ],
  129: [
    { id: 1, nickname: "익명_9183", holdingLabel: "22주 보유", content: "14년 만에 14.4배면 무어의 법칙보다 빠른 거 아닌가요ㅋㅋ AI 인프라 사이클이 얼마나 갈지 모르겠지만 아직 끝날 기미가 없어 보여요", createdAt: T26 - m(12), likes: 19 },
    { id: 2, nickname: "익명_7374", holdingLabel: "40주 보유", content: "TSMC CoWoS 수요도 폭발하겠네요. 4개 다이 패키징이면 CoWoS-L 라인 꽉 찰 거예요. TSMC 주주로서 반가운 소식이에요", createdAt: T26 - m(7), likes: 14 },
  ],
  130: [
    { id: 1, nickname: "익명_5273", holdingLabel: "30주 보유", content: "마일당 $0.02면 뉴욕에서 캘리포니아까지 3,000마일에 에너지 비용이 $60이에요. 가솔린 차로 같은 거리 가면 기름값만 $300 넘잖아요. 이 차가 상용화되면 진짜 물류·택시 시장이 뒤집히는 거예요", createdAt: T26 - m(7), likes: 42 },
    { id: 2, nickname: "익명_3918", holdingLabel: "60주 보유", content: "Waymo가 이 효율 따라오려면 GM Cruise처럼 완전 새 차 개발해야 해요. 근데 Tesla는 이미 Cybercab 생산 라인 올리고 있잖아요. 타이밍 게임에서 이미 이긴 것 같아요", createdAt: T26 - m(4), likes: 35 },
    { id: 3, nickname: "익명_7264", holdingLabel: "15주 보유", content: "165 Wh vs 190 Wh 차이가 크지 않아 보여도 플릿 단위로 1억 마일 달리면 에너지 비용 $2.5M 차이나요. 규모의 경제에서 이 효율 우위는 엄청난 해자예요", createdAt: T26 + m(1), likes: 28 },
    { id: 4, nickname: "익명_1483", holdingLabel: "80주 보유", content: "스티어링휠·페달 없애서 이 효율 나온 거 생각해보면 자율주행 전용 설계가 맞는 방향이에요. 이제 사람이 조작하는 차 설계가 오히려 비효율이 된 거죠", createdAt: T26 + m(5), likes: 21 },
  ],
  131: [
    { id: 1, nickname: "익명_6192", holdingLabel: "45주 보유", content: "Lucid도 190Wh인데 그게 제일 효율적인 줄 알았어요. Cybercab이 165면 진짜 차원이 다르네요. 자율주행 전용 설계의 힘이 이런 거군요", createdAt: T26 - m(18), likes: 29 },
    { id: 2, nickname: "익명_4827", holdingLabel: "25주 보유", content: "Waymo가 Jaguar I-PACE 기반인데 그 차 효율이 얼마나 되는지 찾아보니 300Wh 넘는다고 하더라고요. 운영비 격차가 엄청 날 거예요", createdAt: T26 - m(9), likes: 22 },
    { id: 3, nickname: "익명_8291", holdingLabel: "100주 보유", content: "해자 맞아요. 경쟁사가 아무리 소프트웨어 잘 만들어도 하드웨어 효율이 이 정도 차이면 운영비에서 절대 못 따라와요. 장기 홀딩 확신 올라갔어요", createdAt: T26 + m(3), likes: 36 },
  ],
  132: [
    { id: 1, nickname: "익명_5193", holdingLabel: "35주 보유", content: "FSD가 드디어 미국 밖에서 실도로 달리는 걸 공개적으로 확인한 거잖아요. 충돌 위기를 FSD가 막았다는 거 진짜 신기해요. 영상 찾아봐야겠어요", createdAt: T26 - m(8), likes: 37 },
    { id: 2, nickname: "익명_7483", holdingLabel: "90주 보유", content: "유럽 FSD 여름 출시라는 거 이제 기정사실로 봐야겠죠. 벨기에 승인 → 네덜란드 테스트 → 독일·프랑스 순이면 Q3 안에 EU 전역 가능성 있어요", createdAt: T26 - m(3), likes: 28 },
    { id: 3, nickname: "익명_2948", holdingLabel: "12주 보유", content: "EU 80만대 × FSD $8,000 = 64억 달러 잠재 시장이에요. 전환율 10%만 해도 $640M인데 이게 한 분기 소프트웨어 수익에 더해지면 마진이 얼마나 올라갈지", createdAt: T26 + m(4), likes: 41 },
  ],
  133: [
    { id: 1, nickname: "익명_6174", holdingLabel: "70주 보유", content: "캘리포니아 주소득세 13.3% vs 텍사스 0%... 임원들이 어마어마하게 절세하겠네요. 그 돈이 다시 회사 투자로 돌아올 거고. 장기 비용 구조 개선이 확실해요", createdAt: T26 - m(11), likes: 44 },
    { id: 2, nickname: "익명_3847", holdingLabel: "20주 보유", content: "머스크 생태계가 텍사스로 다 집중되면 오스틴이 제2의 실리콘밸리가 되는 거잖아요. Tesla·SpaceX·xAI 다 거기 있으면 인재들이 다 거기로 몰리겠죠", createdAt: T26 - m(5), likes: 31 },
    { id: 3, nickname: "익명_9293", holdingLabel: "150주 보유", content: "NASDAQ 최초 텍사스 상장 기업이라는 타이틀 자체도 역사적인 거예요. 텍사스 주민들 자부심 장난 아니겠다ㅋㅋ 기가텍사스 방문하고 싶어지네요", createdAt: T26 + m(2), likes: 24 },
  ],
  134: [
    { id: 1, nickname: "익명_8372", holdingLabel: "110주 보유", content: "오늘 인도 첫날이에요! 8만 대 보너스까지 있다는 게 진짜 수요 검증이잖아요. 0-60 2.4초에 460kW 충전이면 스펙 자체가 레전드급이에요. Q2 실적 기대해도 될 것 같아요", createdAt: T26 - m(3), likes: 53 },
    { id: 2, nickname: "익명_4193", holdingLabel: "45주 보유", content: "무도장 색상 내장 패널 진짜 신기한 접근이에요. 도장 라인 빠지면 공장 투자비도 절감되고 원가도 내려가는 거잖아요. 기가텍사스 가동율 높아지면 마진 개선 기대해봐도 돼요", createdAt: T26 - m(1), likes: 38 },
    { id: 3, nickname: "익명_2938", holdingLabel: "8주 보유", content: "기존 Model Y 보유자가 신형으로 교체하면서 보너스 주문 쌓였다는 거 결국 구형 오너들도 만족한다는 거잖아요. 브랜드 충성도 확인된 게 장기적으로 더 중요한 포인트 같아요", createdAt: T26 + m(3), likes: 27 },
    { id: 4, nickname: "익명_6827", holdingLabel: "60주 보유", content: "텍사스 생산 + 관세 리스크 낮음 + 8만대 보너스 주문 = Q2 인도 역대 최고 가능성 충분해요. 어닝 시즌까지 홀딩하기로 했어요", createdAt: T26 + m(7), likes: 44 },
    { id: 5, nickname: "익명_1583", holdingLabel: "30주 보유", content: "7인승인 거 가족 차로 딱이에요. 거기다 에어 서스펜션까지ㅋㅋ 이 가격에 이 스펙이면 경쟁 차 뭐가 있어요. 진지하게 주문 넣으려고요", createdAt: T26 + m(12), likes: 19 },
  ],
  135: [
    { id: 1, nickname: "익명_9021", holdingLabel: "55주 보유", content: "도색 공정 없애는 건 테슬라가 계속 밀어붙이던 방향이잖아요. 이게 되면 공장 투자 비용도 내려가고 생산 속도도 빨라지는 게 맞아요", createdAt: T26 - m(20), likes: 22 },
    { id: 2, nickname: "익명_7483", holdingLabel: "80주 보유", content: "메가팩 $200M 계약 같은 에너지 사업이 EV 판매랑 독립적으로 성장하는 구조가 진짜 무서운 거예요. 주가가 EV 판매만으로 움직이는 시대는 끝났죠", createdAt: T26 - m(10), likes: 31 },
  ],
  136: [
    { id: 1, nickname: "익명_4827", holdingLabel: "관심종목", content: "$350B에 $1.5B 공모라는 게 희석률이 0.4%밖에 안 되는 거잖아요. 투자자 입장에선 이게 오히려 낫죠. Starlink 영업이익 $4B 기준 EV/EBIT이 87배인데 AI+우주 기업치고 비싸지 않아요", createdAt: T26 - m(5), likes: 39 },
    { id: 2, nickname: "익명_3194", holdingLabel: "관심종목", content: "xAI DC 12개월 완공이 가능한 이유가 Starship 발사체 기술력으로 모듈 단위 조립이 된다는 설이 있더라고요. 진짜면 DC 시장도 뒤집는 거예요", createdAt: T26 - m(2), likes: 28 },
    { id: 3, nickname: "익명_6192", holdingLabel: "관심종목", content: "S&P500 편입 시 패시브 자금 수십조 원 유입이라는 거 IPO 이벤트 중에서 역대급이에요. Robinhood Gold 넣어뒀으니 배정 기대해볼게요", createdAt: T26 + m(4), likes: 21 },
  ],
  137: [
    { id: 1, nickname: "익명_8372", holdingLabel: "관심종목", content: "Meta Prometheus 8.7년 ㅋㅋㅋ 그거 완공되면 GPT-8 나와있겠다. xAI가 12개월이라는 건 완전히 다른 실행력이에요. 이게 바로 머스크 스타일의 강점이죠", createdAt: T26 - m(14), likes: 33 },
    { id: 2, nickname: "익명_2938", holdingLabel: "관심종목", content: "33~50% DC 계획이 지연·취소될 거라는 Epoch AI 분석이 맞으면 SpaceX만 공급할 수 있는 AI 컴퓨팅 수요가 폭증하는 거잖아요. 정말 독점 공급자 포지션이에요", createdAt: T26 - m(7), likes: 25 },
  ],
  138: [
    { id: 1, nickname: "익명_5193", holdingLabel: "40주 보유", content: "5개월 만에 $9B에서 $45B이 사실이에요?? 이게 지수함수 성장인데 Claude가 도대체 얼마나 팔리는 건지... AMZN 들고 있어서 기분 좋은 뉴스예요", createdAt: T26 - m(9), likes: 47 },
    { id: 2, nickname: "익명_7293", holdingLabel: "25주 보유", content: "AWS AI Bedrock이 Claude 기반이라는 거 알면서도 이 성장이 AWS 매출로 얼마나 반영되는지 생각 못 했어요. Anthropic ARR = AWS AI 매출이나 마찬가지인 구조네요. AMZN 추가 담아야겠어요", createdAt: T26 - m(4), likes: 38 },
    { id: 3, nickname: "익명_3918", holdingLabel: "18주 보유", content: "세계 최대 비상장 기업이 되면 IPO 압박이 더 커지겠죠. Anthropic 상장 시 AMZN 지분 가치가 엄청날 거예요. 장기 이벤트로 AMZN 홀딩 이유 하나 추가됐어요", createdAt: T26 + m(2), likes: 29 },
  ],

  // ── 2026-05-23 신규 ──────────────────────────────────────────────────────
  116: [
    { id: 1, nickname: "익명_3847", holdingLabel: "관심종목", content: "비상장 $1,000이면 상장날 어디까지 튀는 건지ㅋㅋㅋ 저도 Schwab 계좌에 넣어뒀는데 $100,000 조건 맞추기가 좀 힘드네요", createdAt: T23 - m(4), likes: 28 },
    { id: 2, nickname: "익명_6291", holdingLabel: "관심종목", content: "Starlink가 분기에 $1B 버는 거면 연간 $4B+인데 이거 하나로도 상장하고도 남을 회사잖아요. 일단 청약 넣고 보려고요", createdAt: T23 - m(2), likes: 19 },
    { id: 3, nickname: "익명_9274", holdingLabel: "관심종목", content: "Schwab 조건 까다롭네요. 그냥 Robinhood Gold로 우선배정 노리는 게 더 현실적인 것 같아요. 저는 Gold 이미 있어서 신청해봤어요", createdAt: T23 + m(3), likes: 14 },
  ],
  117: [
    { id: 1, nickname: "익명_5192", holdingLabel: "관심종목", content: "단계적으로 푸는 거 알고 나서 좀 안심됐어요. 상장날 바로 폭탄 맞는 건 아닌 거잖아요", createdAt: T23 - m(16), likes: 17 },
    { id: 2, nickname: "익명_7481", holdingLabel: "관심종목", content: "+30% 되면 물량 더 나온다는 게 좀 묘하긴 한데... 그래도 그만큼 올랐다는 거니까 뭐 괜찮은 거 아닐까요", createdAt: T23 - m(8), likes: 11 },
  ],
  118: [
    { id: 1, nickname: "익명_4829", holdingLabel: "130주 보유", content: "중국에서 데이터 쌓이면 결국 글로벌 FSD 더 좋아지는 거잖아요. 이름만 바꿔서 중국 시장 지켰으니 테슬라 입장에선 엄청 남는 장사네요", createdAt: T23 - m(6), likes: 34 },
    { id: 2, nickname: "익명_2817", holdingLabel: "60주 보유", content: "미국·캐나다·중국 다음 EU 되면 FSD 팔 수 있는 나라가 진짜 많아지는 거잖아요. 유럽 여름에 출시되면 그때 또 기대해볼만 하겠어요", createdAt: T23 - m(3), likes: 22 },
    { id: 3, nickname: "익명_6193", holdingLabel: "25주 보유", content: "Cybercab도 중국 들어가면 현지 데이터로 훨씬 빨리 학습할 수 있겠죠. 이게 경쟁사가 따라올 수 없는 부분인 것 같아요", createdAt: T23 + m(5), likes: 18 },
    { id: 4, nickname: "익명_8374", holdingLabel: "45주 보유", content: "가격 안 올리고 이름만 바꿔서 해결한 거 대단하긴 해요. 중국팀 일 잘하네요 ㅋㅋ", createdAt: T23 + m(9), likes: 13 },
  ],
  119: [
    { id: 1, nickname: "익명_7392", holdingLabel: "180주 보유", content: "Irving에 25,000sqft 자체 시설 짓는다는 게 진짜 규모가 다르네요. 주차장 빌리는 Waymo랑 비교하면 레벨 자체가 달라요. 오늘 추가 담았어요", createdAt: T23 - m(10), likes: 47 },
    { id: 2, nickname: "익명_1948", holdingLabel: "90주 보유", content: "휴스턴 세차장 36,000sqft면 차 엄청 많이 돌리겠다는 거잖아요. 이게 파일럿 규모가 아닌데ㅋㅋ 기대됩니다", createdAt: T23 - m(6), likes: 35 },
    { id: 3, nickname: "익명_5283", holdingLabel: "50주 보유", content: "4개 도시 동시에 진행하는 거 보면 올 하반기 안에 뭔가 나오긴 하겠죠. 기대하면서 버티는 중이에요", createdAt: T23 - m(3), likes: 28 },
    { id: 4, nickname: "익명_9027", holdingLabel: "30주 보유", content: "Uber는 차도 없고 인프라도 없잖아요. Tesla는 차 만들고 충전소 깔고 정비소까지 다 짓는 거니까 나중에 수익 구조가 완전 다를 거예요", createdAt: T23 + m(4), likes: 31 },
    { id: 5, nickname: "익명_3751", holdingLabel: "70주 보유", content: "텍사스부터 시작하는 거 맞는 순서 같아요. 규제도 덜 하고 이미 거점 다 짓고 있으니까 올 하반기가 기대돼요", createdAt: T23 + m(8), likes: 22 },
  ],
  120: [
    { id: 1, nickname: "익명_6481", holdingLabel: "100주 보유", content: "벨기에가 유럽에서 제일 까다롭다고 들었는데 2,000회 넘었다니 빠르게 가고 있는 거 맞죠? 5,000km 목표면 절반 이상 온 거잖아요", createdAt: T23 - m(22), likes: 39 },
    { id: 2, nickname: "익명_2917", holdingLabel: "55주 보유", content: "유럽 여름에 One-Time Payment 나오면 유럽 80만대 오너들한테 팔 수 있는 거잖아요. 10%만 사줘도 엄청난 숫자인데 기대돼요", createdAt: T23 - m(14), likes: 27 },
    { id: 3, nickname: "익명_8293", holdingLabel: "35주 보유", content: "벨기에 되면 독일 프랑스도 시간문제 아닐까요. 유럽 전체 열리면 그때가 진짜 소프트웨어 매출 시작인 거잖아요", createdAt: T23 - m(7), likes: 19 },
    { id: 4, nickname: "익명_4736", holdingLabel: "20주 보유", content: "비 오는 날도 테스트한다는 거 보고 좋았어요. 날씨 가리면 실제로 못 쓰는 거니까 이게 중요한 거잖아요", createdAt: T23 + m(3), likes: 15 },
  ],
  121: [
    { id: 1, nickname: "익명_3847", holdingLabel: "160주 보유", content: "노르웨이가 90% EV 됐다는데 독일 프랑스도 결국 거기로 가겠죠. 거기서 Model Y가 이렇게 팔리면 독일에서도 같은 일 생길 것 같아요", createdAt: T23 - m(28), likes: 31 },
    { id: 2, nickname: "익명_7192", holdingLabel: "80주 보유", content: "한 나라에서 단일 차종 10만대 처음이라는 게 진짜 대단한 기록이에요. 국민차 됐다고 봐도 되는 수준이죠", createdAt: T23 - m(15), likes: 23 },
    { id: 3, nickname: "익명_5841", holdingLabel: "40주 보유", content: "스웨덴 덴마크도 비슷하게 갈 것 같아요. 스칸디나비아는 이미 Tesla 세상인 듯ㅋㅋ", createdAt: T23 - m(8), likes: 16 },
  ],
  122: [
    { id: 1, nickname: "익명_4829", holdingLabel: "35주 보유", content: "AI 쓰면 쓸수록 CPU도 같이 먹는다는 거 생각 못 했는데ㅋㅋ GPU만 핫한 줄 알았어요. AMD 조금 들고 있어서 다행이에요", createdAt: T23 - m(8), likes: 26 },
    { id: 2, nickname: "익명_7391", holdingLabel: "18주 보유", content: "Intel이 진짜 힘들어 보여요. AMD가 30%에서 더 올라오면 예전 NVDA-AMD 구도랑 비슷하게 되는 건가요", createdAt: T23 - m(4), likes: 18 },
    { id: 3, nickname: "익명_2847", holdingLabel: "50주 보유", content: "NVDA에 치여서 AMD 잊고 있었는데 오늘 리포트 보고 다시 봤어요. 가격도 NVDA보다 훨씬 낮고 좋은데", createdAt: T23 + m(2), likes: 21 },
  ],
  123: [
    { id: 1, nickname: "익명_9182", holdingLabel: "15주 보유", content: "3nm이면 전력 효율도 좋을 텐데 데이터센터 전기값 비싸지는 요즘에 AMD 서버 CPU 당연히 더 선호하게 되지 않을까요", createdAt: T23 - m(17), likes: 13 },
    { id: 2, nickname: "익명_6294", holdingLabel: "28주 보유", content: "3년 20%/년이면 계속 사줄 이유가 있는 거잖아요. 이번에 분할로 좀 더 담을까 고민 중이에요", createdAt: T23 - m(9), likes: 16 },
  ],
  124: [
    { id: 1, nickname: "익명_3847", holdingLabel: "22주 보유", content: "AI 서버가 전기 엄청 먹는다는데 배터리로 안정화한다는 거 처음 들어봤어요. 확실히 그냥 전력 끌어오는 것보단 낫겠죠", createdAt: T23 - m(5), likes: 22 },
    { id: 2, nickname: "익명_7291", holdingLabel: "12주 보유", content: "META 30주 들고 있는데 이런 뉴스 볼 때마다 장기 홀딩 맞다는 생각 들어요. AI 인프라 계속 투자하는 거 좋아요", createdAt: T23 - m(2), likes: 14 },
  ],
  125: [
    { id: 1, nickname: "익명_5829", holdingLabel: "100주 보유", content: "META AMZN 같은 빅테크가 Tesla 배터리 사는 거 이제 자연스러운 흐름이 됐네요. TSLA 에너지 매출 꾸준히 오르겠죠", createdAt: T23 - m(9), likes: 38 },
    { id: 2, nickname: "익명_2741", holdingLabel: "45주 보유", content: "메가팩 단가는 내려가는데 주문은 더 들어오는 거잖아요. 원래 이렇게 좋은 구조가 EV 사업에 있었으면ㅋㅋ", createdAt: T23 - m(5), likes: 25 },
    { id: 3, nickname: "익명_8193", holdingLabel: "60주 보유", content: "에너지 마진이 EV보다 높다는 얘기 맞는 것 같아요. 저도 TSLA 더 담으면서 에너지 사업 기대하고 있어요", createdAt: T23 + m(3), likes: 19 },
  ],
  126: [
    { id: 1, nickname: "익명_7429", holdingLabel: "48주 보유", content: "Marsh 취임하자마자 선물 시장 반응이 바로 나오네요. 금리 내려가면 NVDA 같은 성장주 다시 불붙는 거잖아요. 지금 들고 있어서 다행이에요", createdAt: T23 - m(4), likes: 35 },
    { id: 2, nickname: "익명_3192", holdingLabel: "30주 보유", content: "Tom Lee 강세장이라고 하고 Marsh도 인하 시사하고... 이게 다 맞아 떨어지면 하반기 진짜 좋을 것 같아요. 소형주도 담아볼까 고민 중이에요", createdAt: T23 - m(2), likes: 21 },
    { id: 3, nickname: "익명_9047", holdingLabel: "70주 보유", content: "Druckenmiller까지 같은 방향 보면 이건 그냥 따라가야 하는 거 아닌가요ㅋㅋ 55주 들고 버틸게요", createdAt: T23 + m(4), likes: 27 },
  ],
  127: [
    { id: 1, nickname: "익명_4817", holdingLabel: "85주 보유", content: "금리 내려가면 할부 이자 줄어드는 거잖아요. 그러면 테슬라 월 할부금 낮아지는 거고 구매 수요 올라가는 거 아닌가요. 자동차 사는 사람들 이자 엄청 신경 쓰더라고요", createdAt: T23 - m(14), likes: 29 },
    { id: 2, nickname: "익명_6382", holdingLabel: "40주 보유", content: "오토론 이자 낮아지면 진짜 판매 늘어나는 거 맞아요. 친구가 TSLA 사고 싶다는데 이자 때문에 망설이고 있거든요. 그때가 오면 사줄 것 같아요 ㅋㅋ", createdAt: T23 - m(7), likes: 24 },
    { id: 3, nickname: "익명_1938", holdingLabel: "25주 보유", content: "Tom Lee 이번에도 맞으면 좋겠어요. 110주 들고 버티는 분들 존경스러워요... 저도 분할 더 모을까 봐요", createdAt: T23 + m(2), likes: 17 },
  ],

  // ── 2026-05-22 신규 ──────────────────────────────────────────────────────
  104: [
    { id: 1, nickname: "익명_6291", holdingLabel: "22주 보유", content: "OCF $50B 단일 분기가 나왔는데 $270B이 보수적이라는 게 말이 돼요. Blackwell 풀 램프업이면 Q2부터 더 올라가는 거잖아요.", createdAt: T22 - m(3), likes: 24 },
    { id: 2, nickname: "익명_8413", holdingLabel: "15주 보유", content: "이 돈으로 M&A 나서면 AI 앱 레이어까지 NVDA가 통합할 수 있어요. 소프트웨어 마진 더해지면 밸류에이션이 다시 계산돼야 해요.", createdAt: T22 - m(1), likes: 11 },
    { id: 3, nickname: "익명_2047", holdingLabel: "50주 보유", content: "사우디 아람코 연간 이익 $80B의 3배를 NVDA가 12개월에 낸다는 거 진짜 실감이 안 나요.", createdAt: T22 + m(6), likes: 18 },
  ],
  105: [
    { id: 1, nickname: "익명_4819", holdingLabel: "10주 보유", content: "애플 FCF가 그렇게 많다고 했는데 NVDA가 2.5배라니. 하드웨어 회사가 소프트웨어 회사보다 현금 더 번다는 게 역대 처음 아닌가요.", createdAt: T22 - m(15), likes: 13 },
    { id: 2, nickname: "익명_7382", holdingLabel: "30주 보유", content: "자사주 매입으로 쓰면 EPS 끌어올리면서 주가 지지 효과도 있어요. NVDA 바이백 프로그램 규모가 기대되네요.", createdAt: T22 - m(9), likes: 8 },
  ],
  106: [
    { id: 1, nickname: "익명_9421", holdingLabel: "100주 보유", content: "독일에서 +39%가 나왔다는 게 진짜 의미 있어요. 독일이 BMW·VW·Mercedes 홈그라운드인데 거기서 이겼다는 거잖아요.", createdAt: T22 - m(5), likes: 31 },
    { id: 2, nickname: "익명_3574", holdingLabel: "40주 보유", content: "FSD 벨기에 승인이랑 맞물려서 유럽 판매가 더 가속될 것 같아요. 소프트웨어 구독 수익까지 더해지면 유럽이 진짜 성장 엔진이 되겠네요.", createdAt: T22 - m(3), likes: 17 },
    { id: 3, nickname: "익명_6281", holdingLabel: "20주 보유", content: "Starlink 연동이 완성되면 Tesla 차는 통신사 없이도 된다는 거잖아요. 독점 에코시스템이 완성되는 거예요.", createdAt: T22 + m(4), likes: 14 },
    { id: 4, nickname: "익명_1937", holdingLabel: "75주 보유", content: "경쟁사들 -7~8%인데 Tesla만 +30%라는 게 이미 EV 시장 재편이 끝난 게 아닌가 싶어요.", createdAt: T22 + m(8), likes: 22 },
  ],
  107: [
    { id: 1, nickname: "익명_5842", holdingLabel: "90주 보유", content: "브랜드 리스크 때문에 유럽 기피한다는 게 실제 데이터랑 다르네요. 제품력이 브랜드 리스크를 이기는 거 보여주는 거 아닌가요.", createdAt: T22 - m(22), likes: 19 },
    { id: 2, nickname: "익명_4193", holdingLabel: "55주 보유", content: "독점 모빌리티 플랫폼이라는 표현이 딱 맞아요. FSD+Starlink+Supercharger 다 합쳐지면 경쟁 자체가 불가능해요.", createdAt: T22 - m(14), likes: 12 },
    { id: 3, nickname: "익명_8027", holdingLabel: "30주 보유", content: "Musk 정치 리스크 많이들 걱정했는데 매출이 이렇게 나오면 그냥 홀딩이 맞네요.", createdAt: T22 - m(7), likes: 9 },
  ],
  108: [
    { id: 1, nickname: "익명_7419", holdingLabel: "250주 보유", content: "41%면 시장이 절반 가까이 실현된다고 보는 거잖아요. 합병되면 Starlink 1천만 가입자 수익이 Tesla 재무에 합쳐지는데 주가가 어디로 갈지 계산이 안 돼요.", createdAt: T22 - m(8), likes: 43 },
    { id: 2, nickname: "익명_2816", holdingLabel: "120주 보유", content: "Cybercab + FSD + Starlink 통합이 되면 이건 단순 자동차 회사 밸류에이션으로 볼 수가 없어요.", createdAt: T22 - m(5), likes: 28 },
    { id: 3, nickname: "익명_9382", holdingLabel: "60주 보유", content: "텍사스 Robotaxi 수백 대부터 시작해서 FSD 데이터 쌓이면 전국 확대 로드맵이 보여요. 이게 진짜 게임체인저예요.", createdAt: T22 + m(2), likes: 21 },
    { id: 4, nickname: "익명_5037", holdingLabel: "45주 보유", content: "벨기에 연방 교통부가 EU에서 가장 까다롭다는 거 진짜였어요. 거기 통과하면 EU 전체는 시간 문제잖아요.", createdAt: T22 + m(5), likes: 16 },
    { id: 5, nickname: "익명_1482", holdingLabel: "15주 보유", content: "합병 실현되면 TSLA 지금 주가가 헐값으로 보일 것 같아요. 기다리는 게 맞는 전략.", createdAt: T22 + m(10), likes: 31 },
  ],
  109: [
    { id: 1, nickname: "익명_3847", holdingLabel: "70주 보유", content: "FSD 통계 → 신뢰 → Cybercab 확장 이 순서가 논리적이에요. 텍사스에서 먼저 증명하고 캘리포니아·유럽 순으로 가는 거 현실적인 로드맵이에요.", createdAt: T22 - m(32), likes: 22 },
    { id: 2, nickname: "익명_6193", holdingLabel: "38주 보유", content: "SpaceX Depot Supercharger Only 건설 허가가 Robotaxi 인프라 준비라는 신호잖아요. 이미 하드웨어 인프라 깔고 있는 거예요.", createdAt: T22 - m(19), likes: 14 },
    { id: 3, nickname: "익명_8271", holdingLabel: "25주 보유", content: "벨기에 통과가 이렇게 빨리 나올 줄 몰랐어요. FSD 개선 속도가 예상보다 훨씬 빠르네요.", createdAt: T22 - m(11), likes: 10 },
  ],
  110: [
    { id: 1, nickname: "익명_4928", holdingLabel: "28주 보유", content: "CTO가 직접 전사 메일 보내서 취소한 거잖아요. AI 구독 ROI 검증이 이제 CEO·CTO 레벨 어젠다가 됐다는 신호예요.", createdAt: T22 - m(7), likes: 27 },
    { id: 2, nickname: "익명_7381", holdingLabel: "12주 보유", content: "NVDA·AMZN 인프라는 괜찮고 앱 레이어 SaaS가 잘리는 구조면 포트폴리오 재조정이 필요하겠네요.", createdAt: T22 - m(3), likes: 16 },
    { id: 3, nickname: "익명_2046", holdingLabel: "55주 보유", content: "AI 슈퍼사이클 정상화라는 표현이 맞는 것 같아요. 버블 아니고 과잉 투자 후 선별화 단계인 거죠.", createdAt: T22 + m(4), likes: 12 },
  ],
  111: [
    { id: 1, nickname: "익명_5193", holdingLabel: "16주 보유", content: "MSFT는 자르고 AMZN은 더 쏘는 게 AI 인프라 수요가 진짜라는 증거예요. 앱 레이어만 ROI 안 나오는 거지 인프라는 여전히 강세예요.", createdAt: T22 - m(18), likes: 21 },
    { id: 2, nickname: "익명_8374", holdingLabel: "33주 보유", content: "AWS Bedrock이 Claude·Titan·Llama 다 제공하니까 어떤 모델이 이겨도 AWS가 수혜받는 구조예요. 좋은 포지션이에요.", createdAt: T22 - m(9), likes: 13 },
  ],
  112: [
    { id: 1, nickname: "익명_3719", holdingLabel: "42주 보유", content: "구글이 Anthropic에 $2B 넣고 AWS도 $4B 넣었으니까 Anthropic이 크면 GOOGL·AMZN 둘 다 수혜예요. OpenAI가 커도 MSFT 수혜고. AI 왕좌 경쟁에서 빅테크가 어떻게 해도 이기는 구조네요.", createdAt: T22 - m(12), likes: 34 },
    { id: 2, nickname: "익명_6481", holdingLabel: "20주 보유", content: "SpaceX 컴퓨팅 계약으로 GPU 제약 풀리면 Anthropic 반격 가능해요. 1년 후가 기대돼요.", createdAt: T22 - m(6), likes: 18 },
  ],
  113: [
    { id: 1, nickname: "익명_9283", holdingLabel: "60주 보유", content: "OpenAI 49% 지분에 Azure 독점 배포까지면 MSFT는 AI 인프라 투자 $10B+ 했는데 OpenAI 성장이 그걸 몇 배로 돌려주는 구조잖아요.", createdAt: T22 - m(27), likes: 29 },
    { id: 2, nickname: "익명_4872", holdingLabel: "18주 보유", content: "Claude Code 취소 뉴스랑 OpenAI 역전이 같은 날 나온 게 묘해요. MSFT는 OpenAI에 집중하겠다는 선언처럼 보여요.", createdAt: T22 - m(15), likes: 17 },
    { id: 3, nickname: "익명_1629", holdingLabel: "40주 보유", content: "연환산 $22B AI 매출을 MSFT가 49% 가지는 거면 이미 AI 투자 회수 시작이에요. 장기 홀딩 논리 강화됐어요.", createdAt: T22 - m(8), likes: 14 },
  ],
  114: [
    { id: 1, nickname: "익명_5847", holdingLabel: "관심종목", content: "청약 방법 Robinhood Gold 있으면 우선 배정이라는 거 진짜 좋은 정보예요. Schwab은 $1,000 이상 계좌 조건이 있다는 것도 확인했어요.", createdAt: T22 - m(4), likes: 19 },
    { id: 2, nickname: "익명_3294", holdingLabel: "관심종목", content: "Starlink 2028년 1억 명 달성하면 그것만으로도 상장 밸류에이션이 정당화돼요. 분할 매수로 장기 보유 생각하고 있어요.", createdAt: T22 - m(1), likes: 11 },
  ],
  115: [
    { id: 1, nickname: "익명_8291", holdingLabel: "관심종목", content: "Class B 주식 구조라서 의결권은 없지만 수익 공유는 되니까 장기 보유 메리트는 충분해요.", createdAt: T22 - m(14), likes: 17 },
    { id: 2, nickname: "익명_4719", holdingLabel: "관심종목", content: "첫날 변동성이 워낙 클 테니 며칠 지켜보고 들어가는 게 나을 수도 있겠어요. 상장일이 기대돼요.", createdAt: T22 - m(8), likes: 13 },
    { id: 3, nickname: "익명_6293", holdingLabel: "관심종목", content: "Starship 완전 상용화되면 화물 발사 비용이 10분의 1로 줄어드는 거잖아요. 그게 실현되면 지금 가격은 저렴한 거예요.", createdAt: T22 - m(3), likes: 21 },
  ],

  // ── 2026-05-21 신규 ──────────────────────────────────────────────────────
  98: [
    { id: 1, nickname: "익명_5531", holdingLabel: "40주 보유", content: "OCF $50B 분기면 연환산 $200B이에요. S&P500 전체 기업 중 이 수준 나오는 회사가 없었는데 NVDA가 처음 뚫는 거잖아요.", createdAt: T21 - m(3), likes: 19 },
    { id: 2, nickname: "익명_3849", holdingLabel: "7주 보유", content: "근데 마진이 이렇게 높으면 언제 다음 아키텍처 나올 때 다운사이클 걱정도 있어요. 지금은 맞는 방향이지만 Rubin 이후 구간은 좀 지켜봐야죠.", createdAt: T21 - m(1), likes: 7 },
    { id: 3, nickname: "익명_7182", holdingLabel: "60주 보유", content: "DC 매출만 $75.2B이면 전체 NVDA 회사가 작년에 이 수준도 못 됐었잖아요. 성장 속도가 비현실적이에요.", createdAt: T21 + m(4), likes: 14 },
  ],
  99: [
    { id: 1, nickname: "익명_2094", holdingLabel: "20주 보유", content: "시총 대비 OCF yield로 따지면 여전히 성장 주식 치고는 저렴한 편이에요. 장기 복리 계산하면 홀딩이 맞아요.", createdAt: T21 - m(10), likes: 11 },
    { id: 2, nickname: "익명_8361", holdingLabel: "5주 보유", content: "근데 실적은 좋은데 주가가 안 오른다면 시장이 뭘 우려하는 건지 파악이 필요하겠죠.", createdAt: T21 - m(5), likes: 5 },
  ],
  100: [
    { id: 1, nickname: "익명_4719", holdingLabel: "150주 보유", content: "SpaceX 상장하면 IPO 청약 꼭 참여하고 싶어요. 머스크 의결권 문제는 있지만 Starlink 사업만 봐도 충분히 매력적이에요.", createdAt: T21 - m(4), likes: 22 },
    { id: 2, nickname: "익명_6293", holdingLabel: "90주 보유", content: "Class B 93.6% 들고 있으면 소액주주는 사실상 의결권 없는 채권자나 다름없어요. 수익만 보고 들어가야죠.", createdAt: T21 - m(2), likes: 13 },
    { id: 3, nickname: "익명_8044", holdingLabel: "50주 보유", content: "Starlink 2028 목표 1억 명이면 지금 1천만 대비 10배 성장이에요. 그것만으로도 밸류에이션 설명이 돼요.", createdAt: T21 + m(3), likes: 16 },
  ],
  101: [
    { id: 1, nickname: "익명_3127", holdingLabel: "120주 보유", content: "S&P500 편입 시 Vanguard·Blackrock 강제 매수분만 해도 몇십억 달러 규모 아닌가요. 그때가 진짜 상승 시작 아닐까요.", createdAt: T21 - m(15), likes: 17 },
    { id: 2, nickname: "익명_5891", holdingLabel: "60주 보유", content: "오너리스크 85.1% 감안해도 Starship 완전 상용화가 실현되면 화물 발사 비용이 10분의1 되는 거잖아요. 리스크 감수할 만해요.", createdAt: T21 - m(8), likes: 10 },
  ],
  102: [
    { id: 1, nickname: "익명_9274", holdingLabel: "75주 보유", content: "에어갭 냉각 방식이 기발한 거 같아요. 단순히 더블 글레이징이 아니라 공기를 순환시킨다는 발상 자체가 달라요. 에어컨 쓸 일이 줄면 여름 주행거리가 확 늘어나겠네요.", createdAt: T21 - m(6), likes: 18 },
    { id: 2, nickname: "익명_1538", holdingLabel: "20주 보유", content: "Acoustic tuning이 더 신기한 거 같아요. 주파수 맞춰서 소음 없앤다는 게 스피커 없이 액티브 노이즈 캔슬링 하는 거랑 비슷한 원리인가요?", createdAt: T21 - m(3), likes: 9 },
    { id: 3, nickname: "익명_4682", holdingLabel: "45주 보유", content: "이게 Cybercab에 들어가면 완전히 다른 레벨의 승차 경험이겠죠. 열 차단 + 소음 차단 + FSD = 리무진급 경험.", createdAt: T21 + m(5), likes: 14 },
  ],
  103: [
    { id: 1, nickname: "익명_7051", holdingLabel: "90주 보유", content: "BYD도 더블 글레이징 썬루프 쓰지만 이렇게 에어갭 액티브 쿨링까지 하는 건 없잖아요. 특허 장벽이 생기면 복제도 어렵고요.", createdAt: T21 - m(18), likes: 12 },
    { id: 2, nickname: "익명_3826", holdingLabel: "15주 보유", content: "프리미엄 옵션으로 추가 수익화도 가능하겠어요. ASP 올리면 마진 개선이고 Tesla 매력도 올라가는 거죠.", createdAt: T21 - m(9), likes: 8 },
  ],

  // ── 2026-05-20 신규 ──────────────────────────────────────────────────────
  84: [
    { id: 1, nickname: "익명_3719", holdingLabel: "30주 보유", content: "CUDA 개발자가 400만이라는데 AMD로 갈아타려면 몇 년짜리 작업이에요. 이게 진짜 해자죠.", createdAt: T20 - m(2), likes: 11 },
    { id: 2, nickname: "익명_6582", holdingLabel: "9주 보유", content: "마진 70%이 소프트웨어 회사 수준이에요. 하드웨어 파는데 이게 말이 되나 싶어요.", createdAt: T20 - m(1), likes: 8 },
  ],
  86: [
    { id: 1, nickname: "익명_1847", holdingLabel: "40주 보유", content: "에너지 마진이 자동차보다 높다고 하던데 비중 올라오면 전체 수익성이 달라지겠죠.", createdAt: T20 - m(5), likes: 14 },
    { id: 2, nickname: "익명_7392", holdingLabel: "18주 보유", content: "Megapack 이미 완판 행진 중이잖아요. 태양광까지 합치면 에너지 사업부만 따로 상장해도 될 규모 아닌가요.", createdAt: T20 - m(2), likes: 10 },
  ],
  87: [
    { id: 1, nickname: "익명_5013", holdingLabel: "30주 보유", content: "UPS·PepsiCo·Walmart 이미 주문했다는데 대형이 움직이면 중소형도 따라가는 거죠.", createdAt: T20 - m(18), likes: 9 },
    { id: 2, nickname: "익명_2964", holdingLabel: "11주 보유", content: "Megacharger 30분에 400마일이면 고속도로 노선 커버 충분하지 않나요. 인프라 생각보다 빨리 깔릴 것 같아요.", createdAt: T20 - m(10), likes: 6 },
  ],
  89: [
    { id: 1, nickname: "익명_4381", holdingLabel: "55주 보유", content: "유튜브 혼자서도 세계 2위 검색엔진이라는 말 있잖아요. 6개 합치면 진짜 말이 안 되는 규모.", createdAt: T20 - m(3), likes: 13 },
    { id: 2, nickname: "익명_8027", holdingLabel: "20주 보유", content: "반독점 소송이 변수긴 한데 이 플랫폼 지배력은 법원도 어떻게 못 할 것 같아요. 쪼개면 각각이 올라가는 거 아닌가요.", createdAt: T20 - m(1), likes: 7 },
  ],
  90: [
    { id: 1, nickname: "익명_5291", holdingLabel: "33주 보유", content: "처음에 AI가 구글 검색 다 대체할 것 같아서 걱정했는데 광고 매출이 오히려 늘었다는 게 신기해요.", createdAt: T20 - m(24), likes: 8 },
    { id: 2, nickname: "익명_1648", holdingLabel: "16주 보유", content: "유튜브·크롬·안드로이드 각각이 독립 기업이어도 될 규모인데 그게 6개라는 게 진짜 이해가 안 돼요.", createdAt: T20 - m(20), likes: 6 },
  ],
  91: [
    { id: 1, nickname: "익명_6739", holdingLabel: "70주 보유", content: "코로나 때 팔았다는 사람 주변에 진짜 있어요. 2020년 3월에 다 팔고 몇 달 후에 다시 샀다는... 저도 그때 흔들렸는데.", createdAt: T20 - m(9), likes: 16 },
    { id: 2, nickname: "익명_3158", holdingLabel: "14주 보유", content: "20년 보유하면 $76.8K, 30년이면 $212K라는데 이걸 이해하면 단타가 얼마나 비효율적인지 바로 알죠.", createdAt: T20 - m(4), likes: 9 },
  ],
  92: [
    { id: 1, nickname: "익명_4192", holdingLabel: "90주 보유", content: "신고가 때마다 사기 무섭긴 한데 결국 시장은 항상 새 신고가를 찍어왔으니까요. 그냥 꾸준히 사는 게 맞는 것 같아요.", createdAt: T20 - m(12), likes: 14 },
    { id: 2, nickname: "익명_8019", holdingLabel: "210주 보유", content: "저도 이것저것 갈아탔다가 결국 VOO로 돌아왔어요. 단순한 게 제일 강한 전략인 것 같아요.", createdAt: T20 - m(8), likes: 11 },
  ],
  95: [
    { id: 1, nickname: "익명_5831", holdingLabel: "15주 보유", content: "TQQQ 들고 있다가 QQQ로 갔어요. 레버리지는 장기 보유하면 안 된다는 거 몸으로 배웠어요.", createdAt: T20 - m(17), likes: 18 },
    { id: 2, nickname: "익명_7264", holdingLabel: "60주 보유", content: "나스닥이 무너지면 QQQ도 같이 가는 거라 변동성은 SPY보다 크긴 한데 장기 수익률이 압도적이죠.", createdAt: T20 - m(11), likes: 9 },
  ],
  97: [
    { id: 1, nickname: "익명_3746", holdingLabel: "160주 보유", content: "배당 재투자 계좌에 넣어두고 신경 안 쓰는 게 제일 편한 방법 같아요. 10년 지나면 배당 자체가 꽤 커지더라고요.", createdAt: T20 - m(26), likes: 12 },
  ],

  // ── 2026-05-19 신규 ──────────────────────────────────────────────────────
  75: [
    { id: 1, nickname: "익명_3341", holdingLabel: "60주 보유", content: "텍사스 3도시 완전 자율 운영이 실제로 확인된 건가요? 아직 제한적 테스트 아닌지... 어쨌든 데이터가 쌓이는 속도가 경쟁사랑 비교가 안 되는 건 맞아요.", createdAt: T19 - m(1), likes: 9 },
    { id: 2, nickname: "익명_8829", holdingLabel: "45주 보유", content: "인간·FSD·Optimus 동일 아키텍처라는 게 진짜 충격이에요. 하드웨어 재사용 + 소프트웨어 공유 = 개발 비용이 선형이 아니라 지수적으로 절감되는 구조잖아요.", createdAt: T19 - m(1), likes: 14 },
    { id: 3, nickname: "익명_1177", holdingLabel: "20주 보유", content: "2026년 말 미국 전역 인간 수준 FSD 목표라는 것 진짜 되면... 로봇택시 MAU가 수백만이 될 텐데. 지금 주가는 그거 하나도 안 반영한 것 같아요.", createdAt: T19, likes: 11 },
  ],
  76: [
    { id: 1, nickname: "익명_4482", holdingLabel: "100주 보유", content: "750,000:1 압축이라는 숫자 자체가 FSD의 기술적 해자를 설명해줘요. 웨이모 같은 LiDAR 방식이랑 완전히 다른 접근이라 따라잡으려면 수년 걸릴 거예요.", createdAt: T19 - m(12), likes: 8 },
    { id: 2, nickname: "익명_9921", holdingLabel: "12주 보유", content: "15Hz면 초당 15번 경로 업데이트인데 인간 반응 속도보다 빠른 거잖아요. 피로 없이 그 속도로 계속 유지되면 야간·장거리 운행이 인간보다 훨씬 안전하겠어요.", createdAt: T19 - m(8), likes: 6 },
  ],
  77: [
    { id: 1, nickname: "익명_5521", holdingLabel: "55주 보유", content: "3차 분할 발표 구조가 흥미로워요. 한 번에 충격 주는 게 아니라 파도처럼 나눠서 발표하는 게 주가 관리 의도 같기도 해요. 어쨌든 $8B AI 투자 유지는 진짜 좋은 신호.", createdAt: T19 - m(4), likes: 12 },
    { id: 2, nickname: "익명_7738", holdingLabel: "18주 보유", content: "관리직 집중 감원이면 의사결정 레이어 줄이겠다는 거잖아요. AI 도구로 관리 업무 자동화하겠다는 선언이에요. 단기 충격 있겠지만 장기는 긍정적이라고 봐요.", createdAt: T19 - m(2), likes: 9 },
    { id: 3, nickname: "익명_2234", holdingLabel: "8주 보유", content: "이 소식으로 주가 단기 하락하면 추가 매수 기회라고 봐요. 빅테크 구조조정은 항상 마진 개선 + 주가 재평가로 이어졌잖아요.", createdAt: T19 - m(1), likes: 7 },
    { id: 4, nickname: "익명_3392", holdingLabel: "30주 보유", content: "Andromeda AI 광고 시스템 효율 2배라는 거 이미 Q1 실적에서 일부 반영됐는데, 인력 최적화까지 더해지면 Q2·Q3 마진이 사상 최고 갱신하겠네요.", createdAt: T19, likes: 15 },
  ],
  79: [
    { id: 1, nickname: "익명_1193", holdingLabel: "10주 보유", content: "Burry가 2008 금융위기 예측한 분이잖아요. AI 붐에서 진짜 돈 버는 곳이 인프라 제조사라는 통찰은 꽤 설득력 있어요. TSMC·AVGO 동시 보유하는 분산 전략도 좋아 보여요.", createdAt: T19 - m(3), likes: 11 },
    { id: 2, nickname: "익명_6644", holdingLabel: "35주 보유", content: "AVGO 2026 AI 매출 $20B+ 추정이면 현재 밸류에이션도 그렇게 비싼 건 아닌 것 같아요. Google·Meta·Apple 다 고객이라는 게 진짜 강점이에요.", createdAt: T19 - m(1), likes: 8 },
    { id: 3, nickname: "익명_9183", holdingLabel: "50주 보유", content: "VMware 통합 완료 후 엔터프라이즈 소프트웨어 수익까지 더해졌으니 AI 반도체 + 네트워킹 + SaaS 트리플 수혜 구조가 맞아요. 장기 홀딩 확신 생겼어요.", createdAt: T19, likes: 6 },
  ],
  80: [
    { id: 1, nickname: "익명_7712", holdingLabel: "25주 보유", content: "NVIDIA 블랙웰 B200 전량 TSMC 위탁이니까 NVDA가 잘 팔릴수록 TSMC도 같이 성장하는 구조예요. NVDA보다 안정적인 진입점이 될 수 있겠네요.", createdAt: T19 - m(15), likes: 9 },
    { id: 2, nickname: "익명_3341", holdingLabel: "6주 보유", content: "애리조나 팹 완공 + SpaceX·Tesla 자체칩 위탁 수혜까지 더하면 TSMC 미국 생산 체제가 지정학 리스크도 분산시켜주네요. Burry 눈이 정확하다고 느껴져요.", createdAt: T19 - m(5), likes: 7 },
  ],
  81: [
    { id: 1, nickname: "익명_4419", holdingLabel: "80주 보유", content: "SpaceX HyperLiquid 선물이 $208이래요. IPO 공모가 추정 $47 대비 4.4배 프리미엄이라는데, 상장하면 그날 얼마나 튀어오를지 상상이 안 돼요. 역대 최대 IPO될 것 같아요.", createdAt: T19 - m(6), likes: 13 },
    { id: 2, nickname: "익명_2287", holdingLabel: "200주 보유", content: "Starlink 1,000만이면 이미 글로벌 위성 인터넷 독점 수준이에요. 인터넷 인프라 없는 지역 40억 명이 잠재 고객이라는 거 생각하면 1억 목표도 현실적이에요.", createdAt: T19 - m(2), likes: 10 },
  ],
  82: [
    { id: 1, nickname: "익명_8834", holdingLabel: "45주 보유", content: "Trump 개입으로 30일 만에 종결이면... 이게 OpenAI IPO 앞두고 정치적으로 길을 터준 것 같기도 해요. IPO 타임라인 2026 H2 현실화되면 AI 섹터 전체가 다시 재평가받겠죠.", createdAt: T19 - m(2), likes: 12 },
    { id: 2, nickname: "익명_3307", holdingLabel: "28주 보유", content: "xAI Grok가 SWE-Bench 76.9%로 GPT-5 69.3% 추월했다는 것도 봤어요. 소송 끝나도 AI 성능 경쟁은 계속이라 OpenAI IPO 이후가 진짜 치열해지겠어요.", createdAt: T19 - m(1), likes: 9 },
    { id: 3, nickname: "익명_1154", holdingLabel: "15주 보유", content: "MS가 OpenAI에 $10B 투자했으니 IPO 차익도 엄청날 거예요. 지분 가치만 해도 수십억 달러 이상 차익 가능하잖아요. Microsoft 보유자로서 반가운 소식이에요.", createdAt: T19, likes: 7 },
  ],
  83: [
    { id: 1, nickname: "익명_6612", holdingLabel: "90주 보유", content: "이란 합의 시 원유 공급 늘어나면 인플레 압력이 내려가고 연준 금리 인하 여지도 생기는 거잖아요. 증시 + 금리 동시 호재면 하반기 강세장 기대해봐도 될 것 같아요.", createdAt: T19 - m(8), likes: 11 },
    { id: 2, nickname: "익명_4481", holdingLabel: "35주 보유", content: "강경파 반발 리스크가 남아있다는 게 변수예요. 이란 내부 정치가 워낙 복잡해서 최종 서명까지 가는 길이 험할 수도 있어요. 확정 전에 너무 흥분하지 말고 지켜봐야 해요.", createdAt: T19 - m(3), likes: 6 },
  ],

  // ── 2026-05-18 신규 ──────────────────────────────────────────────────────
  63: [
    { id: 1, nickname: "익명_3412", holdingLabel: "50주 보유", content: "98%라는 수치를 직접 공개한 게 진짜 중요해요. 이제 '알고리즘이 어떤지 모른다'는 핑계가 없어지는 거잖아요. 구독 설득력이 완전히 달라짐.", createdAt: T18 - m(2), likes: 12 },
    { id: 2, nickname: "익명_8829", holdingLabel: "25주 보유", content: "Cybercab 2026년 하반기 텍사스 상용화 일정이랑 맞물리면 모멘텀 엄청나겠어요. FSD 통계 공개 → 신뢰도 상승 → 구독 전환 → Cybercab 확장 흐름이네요.", createdAt: T18 - m(1), likes: 8 },
    { id: 3, nickname: "익명_5541", holdingLabel: "10주 보유", content: "아직 FSD 미국 외 지역은 제한적이잖아요. NHTSA 해소됐다고 해도 유럽·한국 규제는 별개예요. 너무 흥분하지 말고 진짜 글로벌 확장 확인 후 판단해요.", createdAt: T18 - m(1), likes: 4 },
    { id: 4, nickname: "익명_2219", holdingLabel: "80주 보유", content: "칩 내재화(GDDR·LPDDR) + FSD 통계 공개 + NHTSA 해소가 한 날에 나왔어요. 테슬라에게 오늘이 진짜 좋은 날이네요.", createdAt: T18, likes: 15 },
  ],
  66: [
    { id: 1, nickname: "익명_4481", holdingLabel: "90주 보유", content: "삼성·SK하이닉스 출신 메모리 인재 직접 채용이잖아요. NVIDIA 의존도 줄이면서 칩 설계 내재화 완성하는 게 5년 안에 가능할 것 같아요.", createdAt: T18 - m(50), likes: 9 },
    { id: 2, nickname: "익명_7733", holdingLabel: "15주 보유", content: "Cortex AI 슈퍼컴퓨터 자립화되면 GPU 비용이 얼마나 절감될지 계산이 안 돼요. FSD + Optimus 훈련 비용이 드라마틱하게 떨어지겠죠.", createdAt: T18 - m(45), likes: 7 },
    { id: 3, nickname: "익명_1193", holdingLabel: "5주 보유", content: "TSMC 위탁 생산 + 아시아 엔지니어링 거점이면 결국 자체 칩 완전 자립 가능하겠어요. 애플 실리콘이 걸어간 길을 테슬라가 따라가는 거네요.", createdAt: T18 - m(40), likes: 5 },
  ],
  67: [
    { id: 1, nickname: "익명_6631", holdingLabel: "30주 보유", content: "Ackman이 Google 팔고 MS 산다는 게 단순 포트폴리오 조정이 아니에요. '빅테크 AI 전쟁에서 1등이 바뀔 수 있다'는 강한 시그널이잖아요.", createdAt: T18 - m(1), likes: 14 },
    { id: 2, nickname: "익명_8834", holdingLabel: "22주 보유", content: "Azure +33% YoY + Copilot 8500만 기업 계정... Ackman이 왜 $2.3B 베팅했는지 충분히 이해가 돼요. 저도 MS 비중 늘려야 할 것 같아요.", createdAt: T18 - m(10), likes: 11 },
    { id: 3, nickname: "익명_3307", holdingLabel: "8주 보유", content: "GOOGL 보유자로서 좀 걱정되긴 해요. 반독점 소송이 얼마나 리스크인지... Gemini도 따라잡고 있다지만 투자자들 신뢰가 흔들리는 건 사실.", createdAt: T18 - m(5), likes: 6 },
  ],
  70: [
    { id: 1, nickname: "익명_5503", holdingLabel: "60주 보유", content: "버핏이 Apple에 처음 투자할 때 주위에서 다 말렸다고 해요. '테크는 몰라도 소비자 브랜드는 안다'는 통찰이 $180B 수익으로 이어진 거잖아요.", createdAt: T18 - m(3), likes: 13 },
    { id: 2, nickname: "익명_2241", holdingLabel: "40주 보유", content: "Apple Intelligence + 아이폰 업그레이드 사이클 + 중국 회복이면 다음 10년도 기대해봄직 해요. 버핏의 눈으로 Apple을 다시 봐야 할 것 같아요.", createdAt: T18 - m(20), likes: 8 },
  ],
  73: [
    { id: 1, nickname: "익명_9923", holdingLabel: "20주 보유", content: "JP모건 CEO가 'AI 50년 중 가장 낙관적'이라고 했는데... 월가에서 이 정도 발언이 나오면 기관들 AI 섹터 비중 확대가 더 강해지겠죠.", createdAt: T18 - m(4), likes: 10 },
    { id: 2, nickname: "익명_4482", holdingLabel: "12주 보유", content: "Dimon이 JP모건 AI에 $15B+ 투자하면서 이런 말 한 거잖아요. 말뿐이 아니라 돈으로 증명하는 낙관론이에요.", createdAt: T18 - m(1), likes: 7 },
  ],

  // ── 2026-05-15 신규 ──────────────────────────────────────────────────────
  48: [
    { id: 1, nickname: "익명_5521", holdingLabel: "30주 보유", content: "이거 내부정보 아닌가요? STOCK Act 의무 공시라지만 발표 직전 타이밍이 너무 절묘해요.", createdAt: T15 + m(2), likes: 7 },
    { id: 2, nickname: "익명_8834", holdingLabel: "15주 보유", content: "어쨌든 트럼프가 직접 매수했다는 게 정책 수혜 시그널인 건 맞죠. 따라 살 생각이에요.", createdAt: T15 + m(5), likes: 9 },
    { id: 3, nickname: "익명_3341", holdingLabel: "5주 보유", content: "중국 칩 허가가 실제 집행되는지 먼저 확인하고 판단해야 할 것 같아요. 아직 의회 통과 전이잖아요.", createdAt: T15 + m(8), likes: 4 },
  ],
  51: [
    { id: 1, nickname: "익명_9923", holdingLabel: "40주 보유", content: "젠슨황이 에어포스원 탑승한 거 진짜 충격이었어요. 이제 NVDA는 그냥 기업이 아니라 외교 자산이네요.", createdAt: T15 + m(3), likes: 14 },
    { id: 2, nickname: "익명_2287", holdingLabel: "12주 보유", content: "정치적 커버가 있어도 의회 청문회 소환 가능하니 주의는 해야 해요.", createdAt: T15 + m(10), likes: 5 },
    { id: 3, nickname: "익명_7738", holdingLabel: "60주 보유", content: "미국-중국 관계 핵심에 NVDA가 있다는 게 진짜 무서운 포지션이에요.", createdAt: T15 + m(20), likes: 11 },
  ],
  53: [
    { id: 1, nickname: "익명_4482", holdingLabel: "80주 보유", content: "혼다가 포기했다는 게 오히려 EV 시장 자체가 아직 어렵다는 신호 아닌가요? 조심해야 할 것 같기도 해요.", createdAt: T15 + m(2), likes: 5 },
    { id: 2, nickname: "익명_1193", holdingLabel: "30주 보유", content: "테슬라는 배터리 원가 절감 특허도 냈다고 하던데. 격차가 더 벌어지는 거죠.", createdAt: T15 + m(6), likes: 8 },
    { id: 3, nickname: "익명_6631", holdingLabel: "50주 보유", content: "도요타도 하이브리드 중심이고 혼다도 포기하면 장기적으로 테슬라만 살아남는 구조가 맞는 것 같아요.", createdAt: T15 + m(15), likes: 12 },
    { id: 4, nickname: "익명_8802", holdingLabel: "10주 보유", content: "BYD 무서운데 혼다가 포기하면 중국 전기차가 진짜 테슬라 유일 경쟁자가 되는 건가요?", createdAt: T15 + m(25), likes: 6 },
  ],
  55: [
    { id: 1, nickname: "익명_7712", holdingLabel: "25주 보유", content: "Semi가 물류 시장 먹으면 테슬라가 B2C + B2B 동시에 가져가는 거잖아요. TAM이 완전히 달라지네요.", createdAt: T15 + m(5), likes: 9 },
    { id: 2, nickname: "익명_3344", holdingLabel: "15주 보유", content: "디젤 대비 77% 운영비 절감이면 물류 회사들이 안 쓸 이유가 없죠. Ryder·XPO 수요 엄청날 것 같아요.", createdAt: T15 + m(12), likes: 7 },
    { id: 3, nickname: "익명_9987", holdingLabel: "40주 보유", content: "$10억 보조금 중 초기 $2억이라는 건데 나머지 $8억도 나오면 Semi 주문이 폭발적으로 늘겠어요.", createdAt: T15 + m(20), likes: 5 },
  ],
  58: [
    { id: 1, nickname: "익명_2241", holdingLabel: "50주 보유", content: "중국 AI 기능 개방이 협의 중이라는 거 진짜예요? 되면 아이폰 17 업그레이드 사이클 완전히 다를 텐데.", createdAt: T15 + m(3), likes: 10 },
    { id: 2, nickname: "익명_8809", holdingLabel: "20주 보유", content: "관세 완화 + AI 기능 개방 = 중국 매출 회복 조합이면 주가 레벨이 달라질 것 같아요. 추가 매수 고민 중.", createdAt: T15 + m(10), likes: 7 },
  ],
  61: [
    { id: 1, nickname: "익명_5503", holdingLabel: "30주 보유", content: "ARK 분석 동의해요. 메타버스 손실 트라우마 때문에 시장이 META를 저평가하고 있는 것 같아요.", createdAt: T15 + m(5), likes: 8 },
    { id: 2, nickname: "익명_7741", holdingLabel: "18주 보유", content: "AI 광고가 ROI 2배 개선이면 광고주들이 META 예산 올리는 게 당연한 거죠. 실적으로 증명되는 중.", createdAt: T15 + m(15), likes: 11 },
    { id: 3, nickname: "익명_3307", holdingLabel: "60주 보유", content: "빅테크 중에서 META가 AI 전환 가장 빠른 회사라는 거 진짜 맞는 것 같아요. 광고 + 웨어러블 + LLaMA.", createdAt: T15 + m(25), likes: 9 },
  ],

  // ── 기존 ────────────────────────────────────────────────────────────────
  1: [
    { id: 1, nickname: "익명_2241", holdingLabel: "20주 보유", content: "블랙웰 수요 진짜 장난 아니죠. 저도 추가 매수 고민 중이에요.", createdAt: T14 - m(3), likes: 4 },
    { id: 2, nickname: "익명_5503", holdingLabel: "10주 보유", content: "데이터센터 CAPEX 투자 사이클은 최소 2027년까지 이어진다고 봐요.", createdAt: T14 - m(2), likes: 2 },
    { id: 3, nickname: "익명_8812", holdingLabel: "8주 보유",  content: "장기 홀딩 맞아요. 분할 매수로 비중 늘리고 있어요.", createdAt: T14 - m(1), likes: 1 },
  ],
  3: [
    { id: 1, nickname: "익명_8812", holdingLabel: "30주 보유", content: "젠슨 황이 에어포스원 탑승한 사진 보고 진짜 기함했어요.", createdAt: T14 - m(37), likes: 9 },
    { id: 2, nickname: "익명_3345", holdingLabel: "5주 보유",  content: "중국 시장 개방되면 $50B 업사이드는 진짜 실현 가능하다고 봐요.", createdAt: T14 - m(30), likes: 6 },
    { id: 3, nickname: "익명_7729", holdingLabel: "15주 보유", content: "의회 반발이 변수긴 하지만 트럼프 행정부가 밀어붙이면 될 것 같아요.", createdAt: T14 - m(15), likes: 3 },
    { id: 4, nickname: "익명_4401", holdingLabel: "25주 보유", content: "저도 그래서 추가 매수했어요. 이 호재가 아직 주가에 다 반영 안 됐다고 봐요.", createdAt: T14 - m(3), likes: 5 },
  ],
  4: [
    { id: 1, nickname: "익명_9912", holdingLabel: "10주 보유", content: "FSD v13 실사용자들 피드백이 정말 좋던데요. 구독 전환율이 핵심이겠죠.", createdAt: T14 - h(1) - m(50), likes: 7 },
    { id: 2, nickname: "익명_3321", holdingLabel: "8주 보유",  content: "2~3년 장기 보유 동의해요. 단기 노이즈에 흔들리면 안 될 것 같아요.", createdAt: T14 - h(1) - m(30), likes: 4 },
    { id: 3, nickname: "익명_6687", holdingLabel: "50주 보유", content: "로보택시 TAM이 수천조 규모인데 테슬라가 선두 주자면 현재 주가는 오히려 싸다는 논리에 동의해요.", createdAt: T14 - h(1), likes: 8 },
  ],
  5: [
    { id: 1, nickname: "익명_2291", holdingLabel: "70주 보유", content: "기가상하이 생산 최고치 정말 놀랐어요. BYD 잡을 수 있겠구나 생각했어요.", createdAt: T14 - h(3) - m(30), likes: 5 },
    { id: 2, nickname: "익명_8834", holdingLabel: "30주 보유", content: "유럽 EV 시장도 회복 중이라 전체 볼륨 2025년 말에 크게 늘어날 것 같아요.", createdAt: T14 - h(3), likes: 3 },
  ],
  8: [
    { id: 1, nickname: "익명_7701", holdingLabel: "100주 보유", content: "AIP Bootcamp 참여한 기업들 계약 전환율이 80% 넘는다고 들었어요.", createdAt: T14 - h(2) - m(30), likes: 11 },
    { id: 2, nickname: "익명_4453", holdingLabel: "50주 보유",  content: "B2B SaaS로 전환 성공하면 밸류에이션 완전히 다시 봐야 해요.", createdAt: T14 - h(2), likes: 7 },
    { id: 3, nickname: "익명_3312", holdingLabel: "200주 보유", content: "저도 장기 홀딩 중이에요. AIP가 진짜 게임 체인저.", createdAt: T14 - h(1), likes: 9 },
  ],
  9: [
    { id: 1, nickname: "익명_6623", holdingLabel: "60주 보유",  content: "DOGE 수혜 종목 중 가장 직접적인 게 팔란티어라고 봐요.", createdAt: T14 - h(5), likes: 13 },
    { id: 2, nickname: "익명_1156", holdingLabel: "120주 보유", content: "S&P500 편입 이후 패시브 펀드 자금이 계속 들어오는 구조가 생겼죠.", createdAt: T14 - h(4), likes: 8 },
    { id: 3, nickname: "익명_8809", holdingLabel: "40주 보유",  content: "전 세계 정부 AI 채택률이 높아질수록 팔란티어가 제일 많이 먹는 구조.", createdAt: T14 - h(3), likes: 6 },
  ],
  17: [
    { id: 1, nickname: "익명_3321", holdingLabel: "20주 보유", content: "GCP 점유율 상승세가 진짜 의미 있어요. 3위에서 2위 넘볼 수 있을 것 같아요.", createdAt: T14 - h(3) - m(30), likes: 8 },
    { id: 2, nickname: "익명_7741", holdingLabel: "10주 보유", content: "유튜브 Shorts 광고 수익화가 본격화되면 더 올라가겠죠.", createdAt: T14 - h(3), likes: 5 },
  ],
  22: [
    { id: 1, nickname: "익명_5512", holdingLabel: "25주 보유", content: "CLARITY Act 진행 속도가 생각보다 빠르더라고요. 올해 안에 통과 가능할 것 같아요.", createdAt: T14 - m(50), likes: 8 },
    { id: 2, nickname: "익명_8834", holdingLabel: "10주 보유", content: "기관 자금 유입되면 주가 레벨이 완전히 달라질 것 같아요.", createdAt: T14 - m(40), likes: 5 },
    { id: 3, nickname: "익명_3388", holdingLabel: "30주 보유", content: "스테이블코인 법안도 통과되면 Coinbase가 직접 수혜받는 구조예요.", createdAt: T14 - m(30), likes: 6 },
  ],
  26: [
    { id: 1, nickname: "익명_8871", holdingLabel: "50주 보유",  content: "Neutron 타임라인이 2026년 말이라고 하던데, 그때부터 진짜 시작이겠죠.", createdAt: T14 - h(1) - m(45), likes: 12 },
    { id: 2, nickname: "익명_3341", holdingLabel: "100주 보유", content: "SpaceX가 비상장이니 대안으로 로켓랩 밖에 없어요. 저도 장기 홀딩.", createdAt: T14 - h(1) - m(30), likes: 9 },
    { id: 3, nickname: "익명_5598", holdingLabel: "30주 보유",  content: "발사 성공률 97% 이상이라는 게 진짜 대단한 실적이에요.", createdAt: T14 - h(1), likes: 7 },
    { id: 4, nickname: "익명_2267", holdingLabel: "80주 보유",  content: "위성 제조 사업도 마진율이 생각보다 높다고 들었어요. 다각화가 잘 됐어요.", createdAt: T14 - m(30), likes: 5 },
  ],
  27: [
    { id: 1, nickname: "익명_4434", holdingLabel: "200주 보유", content: "3단 성장 스토리 완전 동의해요. Electron 성공 → 자금 → Neutron 개발 → 위성 사업 확장.", createdAt: T14 - d(1) + h(2), likes: 18 },
    { id: 2, nickname: "익명_9923", holdingLabel: "300주 보유", content: "SpaceX IPO 전까지는 로켓랩이 최고의 우주 주식이라고 생각해요.", createdAt: T14 - d(1) + h(4), likes: 14 },
  ],
};
