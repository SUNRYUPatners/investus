// 종토방 게시글 — 리포트 업데이트할 때 같이 추가하세요
// 각 날짜 블록 상단에 날짜 주석 → 최신 글이 위에 오도록 유지

export type Post = {
  id: number;
  symbol: string;
  nickname: string;
  holdingLabel: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
};

export type Comment = {
  id: number;
  nickname: string;
  holdingLabel: string;
  content: string;
  time: string;
  likes: number;
};

export const MOCK_POSTS: Post[] = [

  // ════════════════════════════════════════════════════════════════════════
  // 2026-05-15 — 트럼프-시진핑 회담 / NVDA 중국칩 허가 / 혼다 EV 철회 /
  //              테슬라 기가상하이 최고 생산 / Tesla Semi CA 보조금
  // ════════════════════════════════════════════════════════════════════════

  // NVDA ──────────────────────────────────────────────────────────────────
  { id: 48, symbol: "NVDA", nickname: "익명_7291", holdingLabel: "20주 보유",
    content: "트럼프가 NVDA $1M+ 개인 매수 공시 낸 거 봤어요? 중국 칩 허가 발표 직전에 산 거잖아요. 어떻게 이 타이밍에... 어쨌든 최강 호재 시그널인 건 맞음.",
    time: "방금", likes: 41, comments: 3 },
  { id: 49, symbol: "NVDA", nickname: "익명_3804", holdingLabel: "10주 보유",
    content: "중국 $50B 시장이 열리면 이번 분기 가이던스 완전히 달라지는 거 아닌가요? 텐센트·알리바바·바이두 다 GPU 쓰면... 분기 매출 $5~8B 더 올라가는 거잖아요.",
    time: "8분 전", likes: 33, comments: 0 },
  { id: 50, symbol: "NVDA", nickname: "익명_6612", holdingLabel: "5주 보유",
    content: "의회 반발 변수가 있다는 거 잊지 맙시다. 작년 H100 수출 제한 기억나죠? 너무 빨리 흥분하지 말고 허가가 실제로 집행되는지 지켜봐야 해요.",
    time: "22분 전", likes: 14, comments: 0 },
  { id: 51, symbol: "NVDA", nickname: "익명_9187", holdingLabel: "55주 보유",
    content: "젠슨 황 에어포스원 탑승이 진짜 상징적인 거예요. 이 정도 정치적 커버가 있으면 의회 반발도 막기 어렵죠. NVDA가 미국 국가 전략 자산이 된 거나 다름없어요.",
    time: "35분 전", likes: 52, comments: 3 },
  { id: 52, symbol: "NVDA", nickname: "익명_4403", holdingLabel: "8주 보유",
    content: "솔직히 PER 40배라 추가 매수가 부담스럽긴 한데... 중국 $50B 반영되면 EPS가 완전히 다른 레벨이라 지금 가격이 오히려 싸 보이기도 해요. 분할 매수 중.",
    time: "1시간 전", likes: 19, comments: 0 },

  // TSLA ──────────────────────────────────────────────────────────────────
  { id: 53, symbol: "TSLA", nickname: "익명_2871", holdingLabel: "80주 보유",
    content: "혼다가 2040 완전 EV 목표 공식 철회했어요. 경쟁사들이 하나둘 포기하면 테슬라 독주 기간이 더 길어지는 거잖아요. 기술 격차 3~5년이 5~7년으로 벌어지는 구조.",
    time: "방금", likes: 47, comments: 4 },
  { id: 54, symbol: "TSLA", nickname: "익명_5193", holdingLabel: "120주 보유",
    content: "기가상하이 4월 생산 3년 최고치라니... 중국 BYD 때문에 망할 것 같다고 했던 사람들 이제 뭐라고 해요? 볼륨 회복이 Q2 실적에 바로 반영될 거예요.",
    time: "10분 전", likes: 38, comments: 0 },
  { id: 55, symbol: "TSLA", nickname: "익명_7734", holdingLabel: "30주 보유",
    content: "캘리포니아 Tesla Semi $10억 보조금... 테슬라가 B2B 물류 시장까지 노리는 거네요. B2C EV만 보고 있었는데 완전히 다른 TAM이 열리는 느낌이에요.",
    time: "25분 전", likes: 29, comments: 3 },
  { id: 56, symbol: "TSLA", nickname: "익명_1059", holdingLabel: "15주 보유",
    content: "미중 협상 타결되면 중국 FSD 영업 재개될 수 있다고요? 데이터 규제 때문에 막혀있던 건데 이게 풀리면 구독 매출이 어마어마해질 텐데. 기대해도 되는 건가요?",
    time: "40분 전", likes: 23, comments: 0 },
  { id: 57, symbol: "TSLA", nickname: "익명_8823", holdingLabel: "3주 보유",
    content: "Ron Baron $2500 목표 처음엔 웃겼는데... FSD 구독 + 로보택시 + 에너지 + 옵티머스 다 더하면 불가능한 숫자도 아닌 것 같기도 해요. 10년이라는 기간이 변수지만.",
    time: "2시간 전", likes: 18, comments: 0 },

  // AAPL ──────────────────────────────────────────────────────────────────
  { id: 58, symbol: "AAPL", nickname: "익명_6290", holdingLabel: "100주 보유",
    content: "트럼프-시진핑 회담 후 애플 AI 기능 중국 개방 협의된다는 거 봤어요? 애플 인텔리전스 중국에서 되면 아이폰 업그레이드 사이클이 완전히 달라지는 거잖아요.",
    time: "방금", likes: 34, comments: 2 },
  { id: 59, symbol: "AAPL", nickname: "익명_3471", holdingLabel: "45주 보유",
    content: "관세 145% 완화되면 아이폰 가격 경쟁력 회복되는 거잖아요. 화웨이한테 밀렸던 중국 점유율 다시 가져올 수 있을 것 같아요. 조심스럽게 추가 매수.",
    time: "15분 전", likes: 22, comments: 0 },
  { id: 60, symbol: "AAPL", nickname: "익명_9004", holdingLabel: "250주 보유",
    content: "버핏이 팔긴 했는데 지금 상황 보면 너무 일찍 판 거 아닌가 싶어요. 미중 협상 수혜 + AI 기능 개방 + 중국 매출 회복 = 지금 사도 늦지 않은 것 같은 조합.",
    time: "50분 전", likes: 29, comments: 0 },

  // META ──────────────────────────────────────────────────────────────────
  { id: 61, symbol: "META", nickname: "익명_5538", holdingLabel: "50주 보유",
    content: "ARK가 META를 '가장 오해받는 메가캡'이라고 한 거 완전 동의해요. AI 광고 ROI 2배 개선이라는 게 실제 수치면 광고주들이 META 안 쓸 이유가 없잖아요.",
    time: "방금", likes: 36, comments: 3 },
  { id: 62, symbol: "META", nickname: "익명_1182", holdingLabel: "20주 보유",
    content: "쓰레드 MAU 계속 올라오는데 광고 붙으면 추가 수익원이 생기는 거잖아요. 러시아·이란 퇴출 손실 걱정하는 사람들 있는데 그 시장 없어도 성장하고 있어요.",
    time: "30분 전", likes: 21, comments: 0 },

  // ════════════════════════════════════════════════════════════════════════
  // 기존 게시글 (날짜 무관 상시 표시)
  // ════════════════════════════════════════════════════════════════════════

  // NVDA
  { id: 1,  symbol: "NVDA", nickname: "익명_7829", holdingLabel: "50주 보유",
    content: "블랙웰 GPU 수요가 예상보다 훨씬 강하게 나오고 있어요. 데이터센터 투자는 아직 초입이라고 봅니다. 장기 홀딩 유지합니다.",
    time: "5분 전", likes: 24, comments: 3 },
  { id: 2,  symbol: "NVDA", nickname: "익명_3341", holdingLabel: "10주 보유",
    content: "고점 대비 많이 올라와서 추가 매수는 좀 조심스럽네요. 중국 AI칩 허가 소식이 호재긴 한데 의회 반발 변수도 봐야 할 것 같아요.",
    time: "12분 전", likes: 11, comments: 0 },
  { id: 3,  symbol: "NVDA", nickname: "익명_9201", holdingLabel: "5주 보유",
    content: "젠슨 황이 트럼프 베이징 방문에 에어포스원 탑승했다는 것 자체가 정말 큰 의미. $50B 중국 시장 개방되면 실적 업사이드 엄청날 듯.",
    time: "45분 전", likes: 37, comments: 4 },
  { id: 32, symbol: "NVDA", nickname: "익명_4429", holdingLabel: "3주 보유",
    content: "이미 PER 40배 넘는데 추가 매수하는 게 맞나요? 고점 잡는 거 아닐까 걱정이에요.",
    time: "8분 전", likes: 9, comments: 0 },
  { id: 33, symbol: "NVDA", nickname: "익명_8803", holdingLabel: "25주 보유",
    content: "트럼프-시진핑 무역 협상 타결되면 H20 칩 수출 재개 가능성 있어요. 그게 단기 호재로 작용할 것 같아요.",
    time: "20분 전", likes: 14, comments: 0 },

  // TSLA
  { id: 4,  symbol: "TSLA", nickname: "익명_9917", holdingLabel: "20주 보유",
    content: "FSD 구독 모델이 궤도에 오르면 수익 구조 완전히 달라질 텐데. 단기는 힘들어 보여도 2~3년 뷰로 가져가는 중.",
    time: "2시간 전", likes: 29, comments: 3 },
  { id: 5,  symbol: "TSLA", nickname: "익명_4482", holdingLabel: "100주 보유",
    content: "기가상하이 4월 생산 3년 최고치라니 진짜 기대 이상. BYD 경쟁 걱정 많이 했는데 오히려 볼륨 회복 중이라 홀딩 유지합니다.",
    time: "4시간 전", likes: 43, comments: 2 },
  { id: 34, symbol: "TSLA", nickname: "익명_1193", holdingLabel: "5주 보유",
    content: "일론 머스크가 DOGE에 집중하면서 테슬라 관리가 소홀해진 거 아닌지 걱정돼요. CEO 집중도가 주가에 영향 미칠 것 같아요.",
    time: "15분 전", likes: 12, comments: 0 },
  { id: 35, symbol: "TSLA", nickname: "익명_5578", holdingLabel: "150주 보유",
    content: "Cybercab 출시 타임라인이 명확해지면 주가 재평가 받을 것 같아요. 로보택시 TAM이 워낙 커서요.",
    time: "1시간 전", likes: 22, comments: 0 },

  // AAPL
  { id: 6,  symbol: "AAPL", nickname: "익명_5512", holdingLabel: "30주 보유",
    content: "아이폰 17 AI 기능이 실제로 얼마나 쓸만한지가 핵심인 것 같아요. 중국 회복세랑 같이 봐야 할 듯.",
    time: "23분 전", likes: 17, comments: 0 },
  { id: 7,  symbol: "AAPL", nickname: "익명_1104", holdingLabel: "200주 보유",
    content: "버핏이 팔긴 했어도 여전히 최대 보유 종목이죠. 배당 꾸준히 늘리고 바이백도 하고. 이 정도면 그냥 믿고 가는 주식.",
    time: "1시간 전", likes: 38, comments: 0 },
  { id: 36, symbol: "AAPL", nickname: "익명_7723", holdingLabel: "60주 보유",
    content: "애플 인텔리전스가 기대보다 늦게 나온다는 비판 있지만, 품질로 승부하는 회사가 애플이잖아요. 출시되면 업그레이드 사이클 기대해요.",
    time: "40분 전", likes: 15, comments: 0 },

  // PLTR
  { id: 8,  symbol: "PLTR", nickname: "익명_2278", holdingLabel: "300주 보유",
    content: "AIP 플랫폼 B2B 계약이 계속 늘고 있어요. 정부 계약에서 민간으로 넘어가는 게 진짜 포인트입니다.",
    time: "3시간 전", likes: 45, comments: 3 },
  { id: 9,  symbol: "PLTR", nickname: "익명_6614", holdingLabel: "80주 보유",
    content: "DOGE 정부 효율화 프로젝트 수혜로 연방 계약 규모 더 커질 것 같아요. S&P500 편입 이후 기관 수요도 계속 들어오는 중.",
    time: "6시간 전", likes: 52, comments: 3 },
  { id: 38, symbol: "PLTR", nickname: "익명_9981", holdingLabel: "500주 보유",
    content: "NATO 사이버전 계약 수주 소식 들으셨나요? 유럽 정부 계약이 빠르게 늘어나고 있어서 미국 외 매출도 기대돼요.",
    time: "3시간 전", likes: 31, comments: 0 },

  // MSFT
  { id: 10, symbol: "MSFT", nickname: "익명_6631", holdingLabel: "15주 보유",
    content: "코파일럿 기업 침투율이 생각보다 빠르게 올라오고 있음. 클라우드 + AI 조합이 진짜 무서운 회사.",
    time: "4시간 전", likes: 31, comments: 0 },
  { id: 11, symbol: "MSFT", nickname: "익명_8823", holdingLabel: "40주 보유",
    content: "Azure AI 매출 성장률이 AWS 추월할 수 있다는 전망도 나오던데 어떻게 생각하세요? OpenAI 독점 협력이 진짜 큰 해자 같아요.",
    time: "1일 전", likes: 28, comments: 0 },
  { id: 46, symbol: "MSFT", nickname: "익명_3344", holdingLabel: "8주 보유",
    content: "Phi-4 소형 AI 모델이 GPT-4 수준 성능을 로컬에서 구현했어요. 엣지 AI 시장까지 선점하는 중이라 정말 무서운 회사.",
    time: "3시간 전", likes: 26, comments: 0 },

  // META
  { id: 12, symbol: "META", nickname: "익명_3307", holdingLabel: "25주 보유",
    content: "AI 광고 정밀도 올라가면서 광고주 ROI 2배 개선됐다고. 이게 매출로 직결되는 구조라서 2026년 실적 기대감이 높아요.",
    time: "1시간 전", likes: 33, comments: 0 },
  { id: 13, symbol: "META", nickname: "익명_7741", holdingLabel: "10주 보유",
    content: "Ray-Ban 스마트글래스에 카메라 달고 AI 연동하면 진짜 웨어러블 혁명 아닌가요. Apple Vision Pro보다 실용적이라고 생각해요.",
    time: "3시간 전", likes: 19, comments: 0 },
  { id: 37, symbol: "META", nickname: "익명_2234", holdingLabel: "35주 보유",
    content: "쓰레드가 트위터 대안으로 자리잡고 있어요. MAU 계속 늘어나면 광고 매출 추가 상승 여력 있어요.",
    time: "2시간 전", likes: 18, comments: 0 },

  // AMZN
  { id: 14, symbol: "AMZN", nickname: "익명_5589", holdingLabel: "8주 보유",
    content: "AWS가 AI 인프라 수요 폭증으로 분기마다 기록 갱신 중. 광고 사업도 구글·메타와 3강 체제로 완전히 자리잡았어요.",
    time: "2시간 전", likes: 21, comments: 0 },
  { id: 15, symbol: "AMZN", nickname: "익명_4419", holdingLabel: "12주 보유",
    content: "물류 자동화 로봇 도입으로 운영비 계속 줄어드는 구조. 영업이익률이 빠르게 올라오고 있어서 장기 관점에서 계속 매력적이에요.",
    time: "5시간 전", likes: 16, comments: 0 },
  { id: 40, symbol: "AMZN", nickname: "익명_3388", holdingLabel: "18주 보유",
    content: "아마존 의료 서비스 확장이 진짜 숨겨진 성장 동력이에요. Amazon Pharmacy + One Medical 조합이 장기적으로 크게 될 것 같아요.",
    time: "1시간 전", likes: 19, comments: 0 },

  // GOOGL
  { id: 16, symbol: "GOOGL", nickname: "익명_2246", holdingLabel: "20주 보유",
    content: "Gemini 2.5 Pro가 벤치마크에서 GPT-4o 넘어섰다는 소식. 구글이 AI 경쟁에서 뒤처질 거라는 걱정 이제 많이 줄었어요.",
    time: "1시간 전", likes: 27, comments: 0 },
  { id: 17, symbol: "GOOGL", nickname: "익명_8812", holdingLabel: "50주 보유",
    content: "유튜브 광고 수익이 Shorts 덕분에 계속 성장 중. GCP도 AI 인프라 수요에 시장점유율 올라오는 중이라 3박자 모두 좋아요.",
    time: "4시간 전", likes: 34, comments: 2 },
  { id: 41, symbol: "GOOGL", nickname: "익명_5574", holdingLabel: "15주 보유",
    content: "AI Overview가 검색 광고를 잠식할 거라는 걱정 있었는데, 실제로는 검색 시간이 늘어나서 광고 수익이 오히려 증가했다고요.",
    time: "6시간 전", likes: 24, comments: 0 },

  // AMD
  { id: 18, symbol: "AMD", nickname: "익명_3312", holdingLabel: "60주 보유",
    content: "MI300X가 H100 대비 가성비 좋다는 평가 많아지면서 마이크로소프트·메타가 대량 구매했다는 얘기 들리더라고요. NVDA 독주 막을 수 있을 듯.",
    time: "30분 전", likes: 29, comments: 0 },
  { id: 19, symbol: "AMD", nickname: "익명_7763", holdingLabel: "30주 보유",
    content: "EPYC 서버 CPU도 인텔 시장 점유율 계속 뺏어오고 있어요. AI 반도체 + 서버 CPU 두 마리 토끼 다 잡고 있는 회사.",
    time: "3시간 전", likes: 18, comments: 0 },
  { id: 39, symbol: "AMD", nickname: "익명_6641", holdingLabel: "45주 보유",
    content: "MI350 발표 나오면 NVDA 대비 경쟁력 더 강해질 것 같아요. 기다리는 중이에요.",
    time: "5시간 전", likes: 13, comments: 0 },

  // AVGO
  { id: 20, symbol: "AVGO", nickname: "익명_9934", holdingLabel: "15주 보유",
    content: "구글·애플·메타 맞춤 AI 칩(ASIC) 설계 독점 수혜가 진짜 핵심이에요. GPU 대신 ASIC으로 가는 하이퍼스케일러 트렌드에서 가장 크게 먹는 회사.",
    time: "2시간 전", likes: 41, comments: 0 },
  { id: 21, symbol: "AVGO", nickname: "익명_1127", holdingLabel: "7주 보유",
    content: "VMware 통합 완료 후 기업용 소프트웨어 수익도 탄탄해졌어요. AI 반도체 + 네트워킹 + 엔터프라이즈 소프트웨어 트리플 수혜.",
    time: "1일 전", likes: 22, comments: 0 },

  // COIN
  { id: 22, symbol: "COIN", nickname: "익명_4481", holdingLabel: "40주 보유",
    content: "CLARITY Act 통과되면 규제 불확실성 사라지면서 기관 자금이 대규모 유입될 것 같아요. 미국 1위 거래소로 최대 수혜.",
    time: "1시간 전", likes: 36, comments: 3 },
  { id: 23, symbol: "COIN", nickname: "익명_6603", holdingLabel: "20주 보유",
    content: "트럼프가 코인 매수 선언하고 CLARITY Act도 진행 중이니 규제 환경이 완전히 바뀌고 있어요. ETF 자금 유입도 계속 늘어나는 중.",
    time: "3시간 전", likes: 23, comments: 0 },
  { id: 42, symbol: "COIN", nickname: "익명_7712", holdingLabel: "55주 보유",
    content: "비트코인 현물 ETF 자금 유입이 사상 최대치 경신 중이에요. Coinbase가 ETF 수탁 기관이라 수수료 수익 꾸준히 늘어날 것 같아요.",
    time: "4시간 전", likes: 28, comments: 0 },

  // SMCI
  { id: 24, symbol: "SMCI", nickname: "익명_8871", holdingLabel: "25주 보유",
    content: "AI 서버 랙 솔루션에서 NVIDIA 파트너로 독보적인 위치. 회계 이슈 해결 후 주가 정상화 중이라 지금이 기회라고 보는데 리스크도 여전히 있긴 하죠.",
    time: "45분 전", likes: 19, comments: 0 },
  { id: 25, symbol: "SMCI", nickname: "익명_3302", holdingLabel: "10주 보유",
    content: "GB200 NVL72 랙 주요 조립업체라는 게 엄청난 포지션이에요. 데이터센터 AI 클러스터 수요 폭증하면 직접 수혜받는 구조.",
    time: "6시간 전", likes: 14, comments: 0 },
  { id: 47, symbol: "SMCI", nickname: "익명_1176", holdingLabel: "15주 보유",
    content: "회계 감사 리스크가 완전히 해소된 건지 아직 불확실해요. 좋은 회사긴 한데 그 부분이 계속 발목 잡을 것 같아요.",
    time: "1시간 전", likes: 11, comments: 0 },

  // RKLB
  { id: 26, symbol: "RKLB", nickname: "익명_5541", holdingLabel: "200주 보유",
    content: "Electron 발사 성공률이 엄청나게 높아요. Neutron 중형 로켓 개발 완료되면 SpaceX 소형-중형 시장 다 커버하는 회사가 됩니다.",
    time: "2시간 전", likes: 48, comments: 4 },
  { id: 27, symbol: "RKLB", nickname: "익명_7712", holdingLabel: "500주 보유",
    content: "Space Systems 부품 사업 매출이 생각보다 탄탄해요. 발사 사업 + 위성 부품 + 향후 Neutron = 3단 성장 스토리인데 SpaceX 비상장이라 대안으로 가장 좋아요.",
    time: "1일 전", likes: 57, comments: 2 },
  { id: 43, symbol: "RKLB", nickname: "익명_4419", holdingLabel: "100주 보유",
    content: "국방부 계약이 계속 들어오고 있어요. 국가 안보 분야에서 신뢰받는 위성 발사 업체로 자리잡은 것 같아요.",
    time: "7시간 전", likes: 33, comments: 0 },

  // IONQ
  { id: 28, symbol: "IONQ", nickname: "익명_2234", holdingLabel: "150주 보유",
    content: "이온트랩 방식이 안정성 면에서 압도적이라는 게 증명되고 있어요. AWS·Azure·GCP 모두 IonQ 양자컴퓨터 클라우드 접근 제공 중.",
    time: "1시간 전", likes: 31, comments: 0 },
  { id: 29, symbol: "IONQ", nickname: "익명_9908", holdingLabel: "300주 보유",
    content: "미국 정부 양자컴퓨터 계약 늘어나는 거 보면 국방·안보 분야 수요가 진짜 핵심인 것 같아요. 아직 수익화 초기지만 기술 해자는 인정.",
    time: "5시간 전", likes: 24, comments: 0 },
  { id: 44, symbol: "IONQ", nickname: "익명_6631", holdingLabel: "80주 보유",
    content: "양자컴퓨터가 실제 상용화되려면 아직 수년 더 필요하지만, 지금 선점하는 게 맞다고 생각해요. 고위험 고수익 섹터.",
    time: "2시간 전", likes: 17, comments: 0 },

  // CEG
  { id: 30, symbol: "CEG", nickname: "익명_6678", holdingLabel: "35주 보유",
    content: "AI 데이터센터 전력 문제가 심각해지면서 원자력이 유일한 해결책으로 부상 중이에요. Microsoft·Google이 컨스텔레이션과 장기 전력 계약 체결한 게 다 이유가 있죠.",
    time: "3시간 전", likes: 38, comments: 0 },
  { id: 31, symbol: "CEG", nickname: "익명_4456", holdingLabel: "20주 보유",
    content: "쓰리마일 아일랜드 재가동이 상징적이에요. AI발 전력 수요 급증 + 탈탄소 압박 = 원자력 르네상스. CEG가 미국 최대 원전 운영사.",
    time: "1일 전", likes: 29, comments: 0 },
  { id: 45, symbol: "CEG", nickname: "익명_9918", holdingLabel: "10주 보유",
    content: "바이든이 아니라 트럼프도 원자력 지지해요. 초당적 지지 받는 에너지 섹터라 정치 리스크가 낮아요.",
    time: "8시간 전", likes: 21, comments: 0 },
];

export const MOCK_COMMENTS: Record<number, Comment[]> = {
  // ── 2026-05-15 신규 ──────────────────────────────────────────────────────
  48: [
    { id: 1, nickname: "익명_5521", holdingLabel: "30주 보유", content: "이거 내부정보 아닌가요? STOCK Act 의무 공시라지만 발표 직전 타이밍이 너무 절묘해요.", time: "2분 전", likes: 7 },
    { id: 2, nickname: "익명_8834", holdingLabel: "15주 보유", content: "어쨌든 트럼프가 직접 매수했다는 게 정책 수혜 시그널인 건 맞죠. 따라 살 생각이에요.", time: "5분 전", likes: 9 },
    { id: 3, nickname: "익명_3341", holdingLabel: "5주 보유",  content: "중국 칩 허가가 실제 집행되는지 먼저 확인하고 판단해야 할 것 같아요. 아직 의회 통과 전이잖아요.", time: "8분 전", likes: 4 },
  ],
  51: [
    { id: 1, nickname: "익명_9923", holdingLabel: "40주 보유", content: "젠슨황이 에어포스원 탑승한 거 진짜 충격이었어요. 이제 NVDA는 그냥 기업이 아니라 외교 자산이네요.", time: "3분 전",  likes: 14 },
    { id: 2, nickname: "익명_2287", holdingLabel: "12주 보유", content: "정치적 커버가 있어도 의회 청문회 소환 가능하니 주의는 해야 해요.", time: "10분 전", likes: 5 },
    { id: 3, nickname: "익명_7738", holdingLabel: "60주 보유", content: "미국-중국 관계 핵심에 NVDA가 있다는 게 진짜 무서운 포지션이에요.", time: "20분 전", likes: 11 },
  ],
  53: [
    { id: 1, nickname: "익명_4482", holdingLabel: "80주 보유", content: "혼다가 포기했다는 게 오히려 EV 시장 자체가 아직 어렵다는 신호 아닌가요? 조심해야 할 것 같기도 해요.", time: "2분 전",  likes: 5 },
    { id: 2, nickname: "익명_1193", holdingLabel: "30주 보유", content: "테슬라는 배터리 원가 절감 특허도 냈다고 하던데. 격차가 더 벌어지는 거죠.", time: "6분 전",  likes: 8 },
    { id: 3, nickname: "익명_6631", holdingLabel: "50주 보유", content: "도요타도 하이브리드 중심이고 혼다도 포기하면 장기적으로 테슬라만 살아남는 구조가 맞는 것 같아요.", time: "15분 전", likes: 12 },
    { id: 4, nickname: "익명_8802", holdingLabel: "10주 보유", content: "BYD 무서운데 혼다가 포기하면 중국 전기차가 진짜 테슬라 유일 경쟁자가 되는 건가요?", time: "25분 전", likes: 6 },
  ],
  55: [
    { id: 1, nickname: "익명_7712", holdingLabel: "25주 보유", content: "Semi가 물류 시장 먹으면 테슬라가 B2C + B2B 동시에 가져가는 거잖아요. TAM이 완전히 달라지네요.", time: "5분 전",  likes: 9 },
    { id: 2, nickname: "익명_3344", holdingLabel: "15주 보유", content: "디젤 대비 77% 운영비 절감이면 물류 회사들이 안 쓸 이유가 없죠. Ryder·XPO 수요 엄청날 것 같아요.", time: "12분 전", likes: 7 },
    { id: 3, nickname: "익명_9987", holdingLabel: "40주 보유", content: "$10억 보조금 중 초기 $2억이라는 건데 나머지 $8억도 나오면 Semi 주문이 폭발적으로 늘겠어요.", time: "20분 전", likes: 5 },
  ],
  58: [
    { id: 1, nickname: "익명_2241", holdingLabel: "50주 보유", content: "중국 AI 기능 개방이 협의 중이라는 거 진짜예요? 되면 아이폰 17 업그레이드 사이클 완전히 다를 텐데.", time: "3분 전",  likes: 10 },
    { id: 2, nickname: "익명_8809", holdingLabel: "20주 보유", content: "관세 완화 + AI 기능 개방 = 중국 매출 회복 조합이면 주가 레벨이 달라질 것 같아요. 추가 매수 고민 중.", time: "10분 전", likes: 7 },
  ],
  61: [
    { id: 1, nickname: "익명_5503", holdingLabel: "30주 보유", content: "ARK 분석 동의해요. 메타버스 손실 트라우마 때문에 시장이 META를 저평가하고 있는 것 같아요.", time: "5분 전",  likes: 8 },
    { id: 2, nickname: "익명_7741", holdingLabel: "18주 보유", content: "AI 광고가 ROI 2배 개선이면 광고주들이 META 예산 올리는 게 당연한 거죠. 실적으로 증명되는 중.", time: "15분 전", likes: 11 },
    { id: 3, nickname: "익명_3307", holdingLabel: "60주 보유", content: "빅테크 중에서 META가 AI 전환 가장 빠른 회사라는 거 진짜 맞는 것 같아요. 광고 + 웨어러블 + LLaMA.", time: "25분 전", likes: 9 },
  ],

  // ── 기존 ────────────────────────────────────────────────────────────────
  1: [
    { id: 1, nickname: "익명_2241", holdingLabel: "20주 보유", content: "블랙웰 수요 진짜 장난 아니죠. 저도 추가 매수 고민 중이에요.", time: "2분 전", likes: 4 },
    { id: 2, nickname: "익명_5503", holdingLabel: "10주 보유", content: "데이터센터 CAPEX 투자 사이클은 최소 2027년까지 이어진다고 봐요.", time: "4분 전", likes: 2 },
    { id: 3, nickname: "익명_8812", holdingLabel: "8주 보유",  content: "장기 홀딩 맞아요. 분할 매수로 비중 늘리고 있어요.", time: "5분 전", likes: 1 },
  ],
  3: [
    { id: 1, nickname: "익명_8812", holdingLabel: "30주 보유", content: "젠슨 황이 에어포스원 탑승한 사진 보고 진짜 기함했어요.", time: "8분 전",  likes: 9 },
    { id: 2, nickname: "익명_3345", holdingLabel: "5주 보유",  content: "중국 시장 개방되면 $50B 업사이드는 진짜 실현 가능하다고 봐요.", time: "15분 전", likes: 6 },
    { id: 3, nickname: "익명_7729", holdingLabel: "15주 보유", content: "의회 반발이 변수긴 하지만 트럼프 행정부가 밀어붙이면 될 것 같아요.", time: "30분 전", likes: 3 },
    { id: 4, nickname: "익명_4401", holdingLabel: "25주 보유", content: "저도 그래서 추가 매수했어요. 이 호재가 아직 주가에 다 반영 안 됐다고 봐요.", time: "42분 전", likes: 5 },
  ],
  4: [
    { id: 1, nickname: "익명_9912", holdingLabel: "10주 보유", content: "FSD v13 실사용자들 피드백이 정말 좋던데요. 구독 전환율이 핵심이겠죠.", time: "1시간 전", likes: 7 },
    { id: 2, nickname: "익명_3321", holdingLabel: "8주 보유",  content: "2~3년 장기 보유 동의해요. 단기 노이즈에 흔들리면 안 될 것 같아요.", time: "1시간 전", likes: 4 },
    { id: 3, nickname: "익명_6687", holdingLabel: "50주 보유", content: "로보택시 TAM이 수천조 규모인데 테슬라가 선두 주자면 현재 주가는 오히려 싸다는 논리에 동의해요.", time: "2시간 전", likes: 8 },
  ],
  5: [
    { id: 1, nickname: "익명_2291", holdingLabel: "70주 보유", content: "기가상하이 생산 최고치 정말 놀랐어요. BYD 잡을 수 있겠구나 생각했어요.", time: "3시간 전", likes: 5 },
    { id: 2, nickname: "익명_8834", holdingLabel: "30주 보유", content: "유럽 EV 시장도 회복 중이라 전체 볼륨 2025년 말에 크게 늘어날 것 같아요.", time: "4시간 전", likes: 3 },
  ],
  8: [
    { id: 1, nickname: "익명_7701", holdingLabel: "100주 보유", content: "AIP Bootcamp 참여한 기업들 계약 전환율이 80% 넘는다고 들었어요.", time: "1시간 전", likes: 11 },
    { id: 2, nickname: "익명_4453", holdingLabel: "50주 보유",  content: "B2B SaaS로 전환 성공하면 밸류에이션 완전히 다시 봐야 해요.", time: "2시간 전", likes: 7 },
    { id: 3, nickname: "익명_3312", holdingLabel: "200주 보유", content: "저도 장기 홀딩 중이에요. AIP가 진짜 게임 체인저.", time: "3시간 전", likes: 9 },
  ],
  9: [
    { id: 1, nickname: "익명_6623", holdingLabel: "60주 보유",  content: "DOGE 수혜 종목 중 가장 직접적인 게 팔란티어라고 봐요.", time: "4시간 전", likes: 13 },
    { id: 2, nickname: "익명_1156", holdingLabel: "120주 보유", content: "S&P500 편입 이후 패시브 펀드 자금이 계속 들어오는 구조가 생겼죠.", time: "5시간 전", likes: 8 },
    { id: 3, nickname: "익명_8809", holdingLabel: "40주 보유",  content: "전 세계 정부 AI 채택률이 높아질수록 팔란티어가 제일 많이 먹는 구조.", time: "6시간 전", likes: 6 },
  ],
  17: [
    { id: 1, nickname: "익명_3321", holdingLabel: "20주 보유", content: "GCP 점유율 상승세가 진짜 의미 있어요. 3위에서 2위 넘볼 수 있을 것 같아요.", time: "2시간 전", likes: 8 },
    { id: 2, nickname: "익명_7741", holdingLabel: "10주 보유", content: "유튜브 Shorts 광고 수익화가 본격화되면 더 올라가겠죠.", time: "3시간 전", likes: 5 },
  ],
  22: [
    { id: 1, nickname: "익명_5512", holdingLabel: "25주 보유", content: "CLARITY Act 진행 속도가 생각보다 빠르더라고요. 올해 안에 통과 가능할 것 같아요.", time: "30분 전", likes: 8 },
    { id: 2, nickname: "익명_8834", holdingLabel: "10주 보유", content: "기관 자금 유입되면 주가 레벨이 완전히 달라질 것 같아요.", time: "1시간 전", likes: 5 },
    { id: 3, nickname: "익명_3388", holdingLabel: "30주 보유", content: "스테이블코인 법안도 통과되면 Coinbase가 직접 수혜받는 구조예요.", time: "1시간 전", likes: 6 },
  ],
  26: [
    { id: 1, nickname: "익명_8871", holdingLabel: "50주 보유",  content: "Neutron 타임라인이 2026년 말이라고 하던데, 그때부터 진짜 시작이겠죠.", time: "30분 전",  likes: 12 },
    { id: 2, nickname: "익명_3341", holdingLabel: "100주 보유", content: "SpaceX가 비상장이니 대안으로 로켓랩 밖에 없어요. 저도 장기 홀딩.", time: "1시간 전",  likes: 9 },
    { id: 3, nickname: "익명_5598", holdingLabel: "30주 보유",  content: "발사 성공률 97% 이상이라는 게 진짜 대단한 실적이에요.", time: "2시간 전",  likes: 7 },
    { id: 4, nickname: "익명_2267", holdingLabel: "80주 보유",  content: "위성 제조 사업도 마진율이 생각보다 높다고 들었어요. 다각화가 잘 됐어요.", time: "2시간 전", likes: 5 },
  ],
  27: [
    { id: 1, nickname: "익명_4434", holdingLabel: "200주 보유", content: "3단 성장 스토리 완전 동의해요. Electron 성공 → 자금 → Neutron 개발 → 위성 사업 확장.", time: "10시간 전", likes: 18 },
    { id: 2, nickname: "익명_9923", holdingLabel: "300주 보유", content: "SpaceX IPO 전까지는 로켓랩이 최고의 우주 주식이라고 생각해요.", time: "20시간 전", likes: 14 },
  ],
};
