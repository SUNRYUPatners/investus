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

const T20 = 1779231600000; // 2026-05-20 08:00 KST
export const LATEST_UPDATE = T20;    // 마지막 게시글 업데이트 기준 (NEW 배지용)
const T19 = 1779145200000; // 2026-05-19 08:00 KST
const T18 = 1779058800000; // 2026-05-18 08:00 KST
const T15 = 1778799600000; // 2026-05-15 08:00 KST
const T14 = 1778713200000; // 2026-05-14 08:00 KST

const m = (n: number) => n * 60_000;
const h = (n: number) => n * 3_600_000;
const d = (n: number) => n * 86_400_000;

export const MOCK_POSTS: Post[] = [

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

  // RKLB — Starlink 1,000만 돌파 ────────────────────────────────────────
  { id: 81, symbol: "RKLB", nickname: "익명_7723", holdingLabel: "150주 보유",
    content: "Starlink 유료 가입자 1,000만 돌파했어요. 2020년 시작해서 6년 만에 1,000만이면 엄청난 속도. 2028년 1억 목표인데 달성되면 Starlink 단독으로도 SpaceX 밸류에이션 정당화돼요. SpaceX 비상장이라 아쉽지만 위성 발사 사업 파이가 커지면 로켓랩도 수혜 분명히 있어요.",
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
    content: "솔직히 PER 40배라 추가 매수가 부담스럽긴 한데... 중국 $50B 반영되면 EPS가 완전히 다른 레벨이라 지금 가격이 오히려 싸 보이기도 해요. 분할 매수 중.",
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
    content: "Space Systems 부품 사업 매출이 생각보다 탄탄해요. 발사 사업 + 위성 부품 + 향후 Neutron = 3단 성장 스토리인데 SpaceX 비상장이라 대안으로 가장 좋아요.",
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
    { id: 3, nickname: "익명_2234", holdingLabel: "8주 보유", content: "솔직히 이 소식으로 주가 단기 하락하면 추가 매수 기회라고 봐요. 빅테크 구조조정은 항상 마진 개선 + 주가 재평가로 이어졌잖아요.", createdAt: T19 - m(1), likes: 7 },
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
