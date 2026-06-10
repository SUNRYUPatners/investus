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

const T10J = 1781046000000; // 2026-06-10 08:00 KST
export const LATEST_UPDATE = T10J;   // 마지막 게시글 업데이트 기준 (NEW 배지용)
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
