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

const _an = Date.now();

// Negative IDs so they never collide with real Supabase IDs (which start at 1)
export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [
  // ── 2026-06-13 신규 ──────────────────────────────────────────────────────
  {
    id: -60,
    alias: "여의도 매 #17",
    symbol: "SPCX",
    content:
      "SPCX 상장일 결산임. 공모가 $135 → 종가 $172.68 (+27.91%). 시총 $2.26T = 글로벌 6위. 역대 최대 IPO $75B 달성. 개장가 $152에서 장중 $175.32까지 터치한 뒤 $172.68 마감. 모건스탠리·골드만·JP모건 언더라이터 세트. Founders Fund $800M + Ron Baron $1B 잠금 확약 = 팔 생각 없다는 투자자들만 있음. 시총 기준 NVDA·GOOG·AAPL·MSFT·AMZN 다음이 SpaceX임. 오늘이 역사임.",
    likes: 412,
    comments: 4,
    created_at: new Date(_an - 3 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -59,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "오늘 테슬라 삼박자 동시에 터졌음. 1) FSD v14.3.4 릴리즈 — MLIR 컴파일러 리라이트로 반응 속도 20% 향상. 도로 데이터 처리 방식 근본 개선임. 2) Semi 5대 신규 제조 (6/11 확인) — 500마일, 1.2MW 충전, 1.7kWh/mi. 2026년 배송 본격화. 3) 유럽 주간 5,100대 +22.8% YoY — 26Q2 최고 기록. 소프트웨어(FSD) + 하드웨어(Semi) + 판매량(유럽) 세 가지가 동시에 긍정적인 날임.",
    likes: 356,
    comments: 3,
    created_at: new Date(_an - 16 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -58,
    alias: "강남 독수리 #52",
    symbol: "NVDA",
    content:
      "오늘 NVDA 관점에서 체크할 게 두 가지임. 1) AI 데이터센터 10년 내 100배 필요 — 이게 NVDA 장기 수요 구조의 핵심 논거임. AI 사용자 2030년 50억 명, MAU 10억 이미 돌파. FY2026 타겟 $200B이 사실 보수적임. 2) SPCX Colossus 1 — Tesla 지연 이슈로 Anthropic한테 임대로 방향 바꿈. SpaceX가 AI 인프라 임대 사업 진입 확인 = NVDA 수요처 다변화. 경쟁이 아니라 수요 확장 구조임.",
    likes: 298,
    comments: 3,
    created_at: new Date(_an - 29 * 60_000).toISOString(),
    liked: false,
  },
  // ── 2026-06-12 신규 ──────────────────────────────────────────────────────
  {
    id: -57,
    alias: "여의도 매 #17",
    symbol: "SPCX",
    content:
      "SpaceX IPO 상장일 핵심 정리임. 공모가 $135 확정, Hyperliquid 선물 $167 (+23.7%). BlackRock $50B+ 주문, 직원 4,000+ 백만장자 탄생, 머스크 개인 자금 직접 참여. 3대 신용평가사 투자등급 = 연기금 $15T+ 진입 가능. ASML 기조연설도 예정. $135→$167 선물 프리미엄은 시장이 $2T+ 밸류를 이미 가격에 반영 중이라는 신호임. 나스닥 개장가 $150~160 예상.",
    likes: 387,
    comments: 4,
    created_at: new Date(_an - 3 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -56,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "오늘 테슬라 5대 호재 세트임. 1) Amundi $1.24B 추가매수 (유럽 최대, 머스크 리스크 공식 해소). 2) FSD EU 전면 승인 임박 (덴마크 ROW 조항 = 27개국 자동 확산). 3) Cybertruck AWD $59,990 배달 시작. 4) 메가팩 호주 100MW 완공. 5) 요코하마 Autopilot 채용. 유럽 100만 대 FSD 구독 10% 전환 시 연 $1.2B 순수 소프트웨어 수익임. 이게 테슬라 다음 밸류 레이팅 촉매임.",
    likes: 342,
    comments: 4,
    created_at: new Date(_an - 14 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -55,
    alias: "강남 독수리 #52",
    symbol: "NVDA",
    content:
      "SIA 반도체 월매출 $110.5B 신기록 + CoWoS 2H26 양산 전환 + Feynman 칩 초기 채택 세트임. $110.5B = 연환산 $1.3T로 AI 칩 슈퍼사이클이 월 단위로 신고가 경신 중. CoWoS 양산 전환이 NVDA 마진 개선 직접 촉매임. Feynman 초기 채택은 2028년까지 로드맵 가시화. SK하이닉스·TSMC·ASML 공급망 전체 수혜 구조 유지됨.",
    likes: 298,
    comments: 3,
    created_at: new Date(_an - 28 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -54,
    alias: "서초 매 #64",
    symbol: "ORCL",
    content:
      "Oracle RPO $638B이 진짜 충격적임. 2023년 8월 $64.9B → 2026년 5월 $638B. 34개월 CAGR 129.5%. RPO는 이미 계약된 미래 매출이라 향후 3~5년 Oracle 수익이 사실상 확정된 거임. OCI가 AWS·Azure보다 30~50% 싸다는 게 수주 폭발의 핵심 이유임. AI 클라우드 3강 구도에서 Oracle이 완전히 자리잡은 거임.",
    likes: 264,
    comments: 3,
    created_at: new Date(_an - 42 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -53,
    alias: "여의도 매 #17",
    symbol: null,
    content:
      "오늘 매크로 2개 포인트임. 1) 이란 공습 취소 + 핵합의 타결 진행 = 유가 $90→$85 하락 기대 + CPI 완화 가능성 + 연준 금리 인하 기대 복원. 2) 머스크 '범용 로봇이 다음 빅 플랫폼' 선언 = Optimus 수년 내 실용화 + TAM $10T+. 이란 리스크 해소 + AI 로봇 메가트렌드 확인 = 성장주 전반에 긍정적 환경. SpaceX IPO 당일에 모든 퍼즐이 맞아떨어지는 날임.",
    likes: 231,
    comments: 3,
    created_at: new Date(_an - 55 * 60_000).toISOString(),
    liked: false,
  },
  // ── 2026-06-11 최신 ──────────────────────────────────────────────────────
  {
    id: -50,
    alias: "여의도 매 #17",
    symbol: "SPCX",
    content:
      "SpaceX IPO D-1 정리임. 핵심 3가지: 1) $1.75T = 12개 방산기업 합산 초과 + $411B. 2) 3대 신용평가사 투자등급 = 연기금·보험사 자금 진입 가능. 3) Starlink $10.8B + AI 임대 $4B+ + TeraFab $11B 칩공장 = 수익 다각화 완성 구조임. 공모가 $25~30에 555M주 공모인데 수요가 쏟아질 거임. 내일 상장가 $35+ 열어도 놀랍지 않음.",
    likes: 248,
    comments: 4,
    created_at: new Date(_an - 5 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -49,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "오늘 Tesla 뉴스가 또 풀 세트임. Piper Sandler가 '자율주행 문제 해결'이라고 공식 선언 + 레이팅에 Autonomy 추가. 덴마크·벨기에 FSD 동시 승인. 텍사스 로보택시 89대. 누적 FSD 170B 마일. 이 네 가지가 다 하루에 나온 거임. Potter가 '시장이 심각하게 저평가 중'이라고 한 것도 포인트임. FSD 구독 수익 밸류에이션 모델이 Wall St 커버리지에 들어가면 목표가 리레이팅 폭이 큼.",
    likes: 221,
    comments: 4,
    created_at: new Date(_an - 20 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -48,
    alias: "강남 독수리 #52",
    symbol: "SPCX",
    content:
      "Starship 발사 효율 데이터가 S-1에서 나왔다는 게 중요함. 10 Starship = 23 Falcon 9 용량이라는 게 Starship 전환 시 비용 구조가 얼마나 개선되는지를 수치로 보여주는 거임. 완전 재사용 달성하면 발사 비용이 Falcon 9의 1/10 이하로 떨어지는 게 목표임. 여기다 TeraFab $11B 칩공장까지 가면 SpaceX는 로켓·인터넷·AI·반도체 수직계열화 완성임. $1.75T도 이 관점에서 보면 미래 가치 대비 싼 거임.",
    likes: 187,
    comments: 3,
    created_at: new Date(_an - 35 * 60_000).toISOString(),
    liked: false,
  },
  {
    id: -47,
    alias: "서초 매 #64",
    symbol: null,
    content:
      "CPI 2.9% + 이란 긴장 + 유가 $90 + SpaceX IPO가 동시에 터진 날임. 단기 변수는 있지만 구조적 관점에서 AI 슈퍼사이클은 유지임. CPI 2.9%는 금리 인하 기대를 죽이지만 AI 인프라 투자 사이클은 금리와 무관하게 진행 중임. 하이퍼스케일러들이 CAPEX를 줄인다는 신호가 없음. SpaceX IPO 내일인데 이란 리스크보다 $1.75T 스토리가 훨씬 크다고 봄. 관망보다 IPO 수요 참여 의견.",
    likes: 163,
    comments: 3,
    created_at: new Date(_an - 50 * 60_000).toISOString(),
    liked: false,
  },
  // ── 2026-06-10 신규 ─────────────────────────────────────────────────────
  {
    id: -46,
    alias: "여의도 매 #17",
    symbol: "SPCX",
    content:
      "SpaceX Bastrop 기가팩토리 + Google·Anthropic $21.5B 계약 세트가 포인트임. 임차인 확정 전에 기가팩토리 짓는 게 아니라 계약 먼저 따고 짓는 구조임. 이게 IRR 계산이 완전히 다른 거임. Starlink S-1 연매출 $10.8B에 AI 임대 연 $4B+ 더하면 SpaceX 연매출 $15B+ 구조가 되는 거고 IPO 기업가치 $500B 논의가 시작될 수 있는 재료임. 지금 $350B은 Starlink 기준으로도 낮은 거임.",
    likes: 203,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
    liked: false,
  },
  {
    id: -45,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "오늘 테슬라 뉴스 3개가 다 중요함. 네덜란드 FSD 데이터가 제일 큰 거임. 수동 대비 충돌 3.5배 감소는 수치가 아니라 규제 해제 논거임. EU 규제 기관이 이 데이터 보면 FSD Supervised 안 풀어줄 이유가 없고 독일·프랑스까지 열리면 FSD 구독 수익이 유럽에서 터지는 거임. 네바다 허가 + 텍사스 VIN 8대는 로보택시 확장 실행력 확인이고 Semi EU는 세 번째 수익축이 형성되는 거임. 오늘이 테슬라 투자자한테 좋은 날임.",
    likes: 178,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    liked: false,
  },
  {
    id: -44,
    alias: "강남 독수리 #52",
    symbol: "NVDA",
    content:
      "젠슨 황이 '매수 기회'라고 직접 말한 거 처음임. 그분이 원래 주가 관련 발언 안 하는데 수주잔고 H1 2027 확보 상태에서 이 말 한 거임. Apple+Google+NVDA AI 클라우드 연합 구도도 NVDA한테는 어차피 양쪽에 GPU 납품하는 구조라 무조건 수혜임. Intel 2028칩 발주는 공급 다변화 포인트인데 Intel 파운드리 살리는 데도 기여해서 CHIPS법 수혜 구조임. 조정 오면 분할 매수 관점.",
    likes: 156,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 21).toISOString(),
    liked: false,
  },
  {
    id: -43,
    alias: "서초 매 #64",
    symbol: null,
    content:
      "중국 $2,950억 AI 프로젝트가 NVDA한테 위협이지만 전체 맥락은 AI 인프라 수요가 전세계적으로 폭발한다는 증거임. 미국 빅3 CAPEX $2,250억 + 중국 $2,950억이면 글로벌 AI 인프라 투자 규모가 $5T+ 방향으로 가는 거임. OpenAI IPO 확률 급등 + JPMorgan AI 에이전트 배포까지 더하면 AI 슈퍼사이클 논리가 더 강해지는 날임. AI 섹터 전체 롱 포지션 유지 의견.",
    likes: 134,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 33).toISOString(),
    liked: false,
  },
  {
    id: -42,
    alias: "을지로 사자 #77",
    symbol: "TSLA",
    content:
      "Starlink S-1 ARPU -33%를 네거티브로 보는 시각이 있는데 틀린 거임. 총매출이 $2.75B에서 $10.8B(연환산)으로 4배 증가한 거임. ARPU 하락은 저가 플랜 출시 + 신흥국 시장 확장의 결과이고 B2B 파이프라인(30개+ 통신사, 항공 38개사)이 성숙하면 ARPU는 반등함. 지금 $10.8B 연매출에 PSR 10배 적용하면 Starlink 단독 $108B임. SpaceX 전체 $350B 안에 이게 들어있는 거임.",
    likes: 147,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
    liked: false,
  },
  {
    id: -41,
    alias: "광화문 늑대 #69",
    symbol: "TSLA",
    content:
      "Semi EU 이 타이밍에 BD 채용하는 건 2027년 대량 출시 준비임. EU 탄소 규제 2030년 상용차 CO₂ 45% 감축 의무면 구조적으로 전기 트럭 강제 수요가 생기는 거임. Class 8 디젤 대비 에너지 비용 70% 절감 + 500마일+ 항속은 EU 물류사 입장에서 TCO 계산하면 무조건 Tesla Semi임. Daimler eActros가 최대 경쟁자인데 Megacharger 네트워크 없는 약점이 있음. EU 상용 트럭 30만 대 시장에서 점유율 10%만 해도 연 3만 대임.",
    likes: 162,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 61).toISOString(),
    liked: false,
  },
  // ── 2026-05-29 신규 ─────────────────────────────────────────────────────
  {
    id: -40,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "텍사스 AVO 인가 나왔음. Tesla Robotaxi LLC가 정식 AVO 사업자로 승인된 거임. 투자 관점에서 이게 왜 중요하냐면 로보택시 밸류에이션 리레이팅 트리거가 규제 제거임. 안전요원 없이 유료 탑승이 합법화됐다는 건 사업 모델이 법적으로 완성된 거임. 7월 오스틴 배포 후 분기별 운행 데이터가 다음 밸류에이션 업데이트 포인트임. FSD 2,670만 마일 +44%랑 묶으면 오늘이 테슬라 자율주행 역사에서 중요한 날임.",
    likes: 187,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    liked: false,
  },
  {
    id: -39,
    alias: "강남 독수리 #52",
    symbol: "SPCX",
    content:
      "ARK TAM $28.5T, Polymarkets $2조+ IPO — 수학적으로 말이 됨. Starlink Connectivity $11.4B이 올해 수익이고 이게 30개 통신사 실 과금 구조로 성장하는 거임. 내부에서 SpaceX IPO 시나리오 네 가지 다 모델링해봤는데 Starlink 분리 상장이 가장 IRR 높게 나옴. SpaceX 전체 상장은 TSLA 합병 불확실성 때문에 디스카운트 받는 구조임. 어떤 루트든 현재 $350B은 시작점임.",
    likes: 142,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    liked: false,
  },
  {
    id: -38,
    alias: "판교 황소 #31",
    symbol: "AMZN",
    content:
      "Anthropic $65B에 Claude ARR $47B임. PSR 1.4배인데 OpenAI가 PSR 4배 넘게 거래됨. 저평가 구조임. Amazon이 최대 주주라는 게 AMZN 투자자한테 숨어있는 AI 자산임. Bedrock 통한 Claude 성장이 AWS 마진 +2.1bps 만든 거 확인됐음. 상장되면 Amazon이 보유한 Anthropic 지분 FMV 조 단위임. AMZN 포지션에 Anthropic 옵션 공짜로 받고 있는 거임.",
    likes: 163,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    liked: false,
  },
  {
    id: -37,
    alias: "서초 매 #64",
    symbol: "META",
    content:
      "Meta Dollar-Dollar 구독 $14 나왔음. 시장이 이걸 얼마나 반영할지 봐야 하는데 나는 밸류에이션 멀티플 확장 재료로 봄. 광고 수익은 경기 민감이고 구독은 비민감임. 구독 비중이 올라갈수록 EBITDA 안정성이 올라가고 PER 프리미엄 붙는 구조임. 32억 MAU 기반이라 전환율 1%만 해도 $54억 추가 수익임. 목표주가 $314 Buy는 이걸 반영한 거임. 내부 뷰는 조금 더 높음.",
    likes: 134,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
    liked: false,
  },
  {
    id: -36,
    alias: "광화문 늑대 #69",
    symbol: "SMCI",
    content:
      "SMCI 2030 ROI 달성 수혜 분석 좋게 봄. 회계 정정 이후 본업 스토리로 복귀하는 국면인데 수주잔고 역대 최고라는 게 실제 채널 체크로 확인됨. 커스텀 칩 채택 하이퍼스케일러가 AI 서버 어디서 사냐가 문제인데 SMCI 말고 이 물량 소화할 데가 없음. FY2026 $25B+ 전망 유지함. 리스크는 회계 재발 가능성인데 내부 거버넌스 바뀐 거 확인됐음.",
    likes: 119,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 62).toISOString(),
    liked: false,
  },
  {
    id: -35,
    alias: "을지로 사자 #77",
    symbol: "TSLA",
    content:
      "FSD 일 2,670만 마일 +44% — Morgan Stanley Adam Jonas 채널 체크 숫자임. 이게 왜 중요하냐면 규제 당국 신뢰 확보의 핵심 데이터임. AVO 인가 속도가 웨이모보다 빠른 이유가 이 데이터 때문임. 44% MoM 유지되면 연말 일 1억 마일 돌파함. 그 시점에 FSD 엣지 케이스 커버리지가 완성에 가까워지고 자율주행 경쟁이 사실상 마무리됨. 지금이 포지션 확대 타이밍임.",
    likes: 148,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    liked: false,
  },
  {
    id: -34,
    alias: "잠실 콘도르 #53",
    symbol: "SPCX",
    content:
      "Starlink 통신사 30개 실 과금 구조 확인됨. 핵심은 MOU가 아니라는 거임. 통신사당 수억 달러 연간 도매 수익이 30개라면 Starlink B2B만 $30B+ 구조로 갈 수 있음. 여기다 B2C 개인 구독 더하면 Starlink 단독으로 $200B+ 밸류에이션 충분히 정당화 가능함. SpaceX 전체 $350B이 얼마나 저평가인지 이 숫자 하나로 설명됨.",
    likes: 127,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    liked: false,
  },
  {
    id: -33,
    alias: "마포 황소 #11",
    symbol: "TSLA",
    content:
      "중국 Model Y 프로모션 연장 + FSD 중국 진출 논의 동시에 나온 거임. 단기는 볼륨, 장기는 FSD 소프트웨어 마진임. NIO 창업자 Li Bin이 긍정 발언한 건 기술 격차 공개 인정임. 200만대+ 중국 출고 차량에 FSD 업셀링되면 ~80% 마진 소프트웨어 수익이 수십억 달러임. 이게 ASP 혼합 효과로 Tesla 마진율 구조적 개선의 핵심임. 중국 FSD 출시 공식화 타이밍이 다음 매수 포인트임.",
    likes: 109,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 105).toISOString(),
    liked: false,
  },
  {
    id: -32,
    alias: "여의도 올빼미 #44",
    symbol: null,
    content:
      "이란 핵협상 30개월 제재 해제 시나리오 포지션 조정함. XLE 비중 10% → 6%로 축소했음. 완전 타결 확률이 50% 넘는다고 보긴 어렵지만 리스크 관리 차원임. 이란 원유 140만 배럴/일 순증이면 WTI $70→$60 시나리오인데 에너지 섹터 단기 역풍임. 항공사(UAL·DAL)는 반대로 유가 하락 수혜라 비중 늘렸음. CBDC 폐지 + BTC 비축 정책은 IBIT 포지션 유지 근거임.",
    likes: 96,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    liked: false,
  },
  {
    id: -31,
    alias: "강남 팔콘 #62",
    symbol: "TSLA",
    content:
      "Giga Texas Corte 2 Megapack 400+ 확장임. 에너지 사업이 자동차 마진보다 높다는 거 계속 확인되는 중임. 자체 공장 전력 자급하면서 외부 판매 물량도 확보하는 이중 레버리지임. Megapack ASP $1.3M에 백로그 12개월+이면 에너지 부문 FY2026 매출 성장률이 자동차 부문 압도할 것임. 복합 성장 구조가 자동차 수익성 변동을 완충하는 게 포인트임.",
    likes: 88,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 135).toISOString(),
    liked: false,
  },
  {
    id: -30,
    alias: "마포 황소 #11",
    symbol: null,
    content:
      "CBDC 전면 폐지 Scott Bessent 발언 임팩트 정리함. 디지털 달러 없음 확정이면 BTC가 민간 디지털 화폐 자리 가져가는 거임. 트럼프 BTC 비축 정책이랑 일관성 있음. 기관 진입 장벽이 규제 불확실성이었는데 명확화되면 IBIT 자금 유입 가속됨. COIN은 스테이블코인 규제 명확화 수혜임. 단기 Wild West 통제 뉴스가 노이즈처럼 보이지만 장기 친암호화폐 환경 확정이라는 게 핵심 메시지임.",
    likes: 104,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    liked: false,
  },
  {
    id: -29,
    alias: "서울숲 매 #38",
    symbol: "SPCX",
    content:
      "SpaceX × Anthropic AI 컴퓨팅 파트너십 큰 그림이 나왔음. H100 8,000개 인프라에 Claude 모델 얹으면 AWS·Azure·GCP 다음 4번째 AI 클라우드 경쟁자임. 우주 데이터센터 비전은 10년 뷰지만 지금 인프라 구축이 그 방향임. 단기는 비용 구조 차별화(우주 태양광 → 전력비 제로)가 가능한지 증명하는 게 포인트임. 비상장이라 직접 투자 불가하지만 NVDA GPU 공급 수혜는 확실함.",
    likes: 133,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 165).toISOString(),
    liked: false,
  },
  // ── 2026-05-28 신규 ─────────────────────────────────────────────────────
  {
    id: -28,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "Cybertruck SBW 리포트 봤음. 투자 관점 핵심은 FSD 통합 최적화임. 물리 컬럼 없으면 FSD가 조향 명령을 전동 액추에이터에 직접 때리는 거라 반응 정밀도가 다름. 7월 오스틴 Cybercab 배포 일정이랑 맞물리면 SBW가 로보택시 핵심 기술로 재평가받을 것임. 단기 주가보다 이 기술이 Cybercab 양산 일정에 리스크 없다는 거 확인이 더 중요함. 지금 $443 프리마켓.",
    likes: 121,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    liked: false,
  },
  {
    id: -27,
    alias: "강남 독수리 #52",
    symbol: "NVDA",
    content:
      "Blackwell Ultra H1 2027 수주잔고 확보 나왔을 때 내부에서 바로 모델 업데이트했음. Committed PO라면 취소 위약금 있는 구조라 실매출 전환률 95%+ 임. 일반 백로그랑 성격이 다름. Jensen '시총 저평가' 발언은 CEO가 자주 하는 말이 아닌데 근거가 있음. $5T 타겟 내는 기관 나올 것 같음. 내 타겟은 보수적이지만 방향은 동일.",
    likes: 158,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 38).toISOString(),
    liked: false,
  },
  {
    id: -26,
    alias: "판교 황소 #31",
    symbol: "MU",
    content:
      "Elon이 올린 MU 10배 사이클 데이터 봤음. 흥미로운 건 2016~2024년 구간이 HBM 없을 때도 $12.4B→$30B 갔다는 거임. 근데 지금은 HBM4가 AI GPU 필수 소재가 된 상황이라 성장 속도가 다를 수 있음. CXMT $24B 조달은 범용 DRAM 마진에 진짜 리스크임. MU 제품 믹스에서 HBM 비중이 2027년 50% 돌파 시점이 포인트.",
    likes: 97,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 72).toISOString(),
    liked: false,
  },
  {
    id: -25,
    alias: "서초 매 #64",
    symbol: "MU",
    content:
      "CXMT $24.2B 리포트 정리. Corsair 납품이 이미 실현됐다는 거라 품질 기준 통과는 확인됨. 문제는 국가 보조금 받는 기업이 적자 감수하고 가격 덤핑 가능하다는 거임. 삼성 범용 DRAM 마진 제일 먼저 압박. MU는 HBM 비중이 방어벽. SK하이닉스가 이 싸움에서 제일 유리한 포지션. 종목 선별 중요한 구간.",
    likes: 86,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    liked: false,
  },
  {
    id: -24,
    alias: "광화문 늑대 #69",
    symbol: "AMZN",
    content:
      "SemiAnalysis 하이퍼스케일러 마진 차트 봤는데 생각보다 큰 의미임. Azure 3분기 연속 하락이고 AWS는 개선 중. 기업 IT 예산 배분에서 Azure→AWS 이동이 가시적으로 나오면 시장 점유율 데이터 변화가 나올 것임. Bedrock·Claude 생태계가 굳어지면 전환 비용 높아져서 고착화됨. AMZN 클라우드 리레이팅 시점 가까워지는 중.",
    likes: 112,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
    liked: false,
  },
  {
    id: -23,
    alias: "을지로 사자 #77",
    symbol: "TSLA",
    content:
      "ACEA 4월 데이터 EU+UK +46.5% 확인했음. 3개월 연속 반등은 '트렌드 전환'으로 분류할 근거 충분함. 내가 유럽 반등 리포트 낼 때 2개월로는 확신 못 했는데 3개월이면 다름. Q2 전체 인도량 컨센서스 현재 45만대인데 유럽 회복 반영하면 47~48만대까지 올라갈 수 있음. FSD 유럽 승인 나오면 한 번 더 재평가.",
    likes: 134,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 185).toISOString(),
    liked: false,
  },
  {
    id: -22,
    alias: "잠실 콘도르 #53",
    symbol: "SPCX",
    content:
      "Ron Baron '세계 최대 기업' 발언 맥락 이해하려면 10년 뷰 전제 중요. 완전 재사용 달성 + Starlink 글로벌 커버리지 + B2G 계약 확장이 10년 안에 동시에 되면 그게 세계 최대 기업 논리임. 4가지 시나리오 중 내가 제일 가능성 높다고 보는 건 Starlink 단독 분리 상장. 합병은 CFIUS·주주 희석 이슈로 현실적으로 어렵고.",
    likes: 89,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 230).toISOString(),
    liked: false,
  },
  {
    id: -21,
    alias: "마포 황소 #11",
    symbol: "NVDA",
    content:
      "오늘 리포트 다 보고 전반적인 뷰 정리 — AI 인프라 투자 사이클 꺾일 조짐 없음. NVDA H1 2027 수주잔고, AMZN Bedrock 마진 개선, 하이퍼스케일러 CAPEX 유지 다 같은 방향. CXMT 메모리 위협은 AI 메모리엔 단기 영향 없고. Tesla 유럽 반등은 단기 모멘텀. 전체 AI 섹터 방향 강세 유지. NVDA 비중 줄일 이유 없음.",
    likes: 143,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 275).toISOString(),
    liked: false,
  },
  // ── 2026-05-27 신규 ─────────────────────────────────────────────────────
  {
    id: -20,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "CNBC Tesla-SpaceX 합병 보도 나왔을 때 팀 전체가 잠깐 멈췄음. 내가 작성한 Wedbush 리포트랑 방향이 비슷한데 Kalshi 33%로 내려간 게 맞는 판단 같기도 하고. 합병 실제로 되면 교환비율 계산이 제일 문제임. SpaceX 비상장 상태에서 $350B으로 박아놓으면 TSLA 주주 희석이 얼마나 될지 지금 모델 돌리는 중인데 숫자가 좀 불편하게 나옴. 당장 결론 내기는 이른 상황.",
    likes: 117,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    liked: false,
  },
  {
    id: -19,
    alias: "강남 독수리 #52",
    symbol: "TSLA",
    content:
      "Q1 2026 실적 들여다봄. 비용 +64%가 다 설명이 되냐고? 안 됨. Optimus 개발비·Supercharger 확장·FSD 연구비 다 더해도 내가 보던 예상치보다 $8억 정도 초과임. 어디서 샜는지 세그먼트별 분해가 필요한데 IR 자료 보면서 마저 파악해야 함. 일단 에너지 부문 마진이 괜찮아서 그나마 버티는 구조임. 주식수 35% 증가는 별로임.",
    likes: 94,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 52).toISOString(),
    liked: false,
  },
  {
    id: -18,
    alias: "판교 황소 #31",
    symbol: "AMD",
    content:
      "AMD $1T 공식 선언 날 내 포지션 확인했더니 평단이 $147임. 오늘 $506이면 3.4배. 시총 $1조 달성이 끝이 아니고 MI400 나오면 다음 레그가 있음. 문제는 TSMC CoWoS 공급 제약인데 이게 AMD만의 문제가 아니라 섹터 전체 병목임. MI300X 수요가 공급을 초과하는 상황이라 가격 협상력이 AMD한테 있음. 단기 고점 우려 있어도 구조적으론 추가 상승 여력 있다고 봄.",
    likes: 138,
    comments: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 87).toISOString(),
    liked: false,
  },
  {
    id: -17,
    alias: "서초 매 #64",
    symbol: "MU",
    content:
      "CHIPS법 $51.6억 수령 확정이랑 정치인 매수 얘기 오늘 같이 나온 게 흥미롭네. 이해충돌 논란 빼고 투자 관점으로만 보면 — 정책 지속성에 대한 내부 확신 없이 살 이유가 없다는 거임. HBM4 라인 증설 속도가 관건인데 아이다호 팹 올라오는 타임라인 2028년이면 그 전까지는 SK하이닉스가 계속 우위임. MU는 2027~2028 픽임. 지금 들어가는 건 조금 이름.",
    likes: 82,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 134).toISOString(),
    liked: false,
  },
  {
    id: -16,
    alias: "을지로 표범 #43",
    symbol: "SPCX",
    content:
      "우주군 $23.5억 계약이 나온 날 Starlink 군용 세그먼트 가치 다시 계산함. B2C 구독 + B2B 항공 38사 + B2G 군사 계약 세 다리 구조면 $350B 기업가치가 오히려 보수적으로 보임. SpaceX IPO 타이밍 문제인데 TSLA 합병 루머가 나온 걸 보면 직접 IPO 카드를 꺼낼 시점을 재는 것 같기도 함. 비상장이라 직접 포지션이 없는 게 아쉬운 날이었음.",
    likes: 106,
    comments: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 173).toISOString(),
    liked: false,
  },
  {
    id: -15,
    alias: "광화문 매 #04",
    symbol: "AAPL",
    content:
      "BofA $380 상향 보고 우리 팀 뷰랑 같은 방향이라 뭔가 묘함. 에이전트 AI 시대 Apple 플랫폼 통행료 논리가 맞는 게, 어떤 AI 에이전트든 결국 아이폰 사용자에게 닿으려면 App Store 통해야 하잖음. 근데 지금 $311이 이미 그 기대를 선반영한 건지 여전히 저평가인지 — 서비스 매출 $100B 달성 시점이 관건임. 내 개인 계좌에선 비중 유지 중임.",
    likes: 79,
    comments: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 218).toISOString(),
    liked: false,
  },
  // ── 기존 ─────────────────────────────────────────────────────────────────
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
      "내 개인 계좌 기준으론 테슬라 비중을 지난달 대비 절반으로 줄였음. FSD 마일당 개입 수치는 진짜 좋아졌는데 오스틴 파일럿 확장 속도가 예상보다 느려서. 공식 리포트엔 목표주가 그대로인데 단기 가격 부담이 좀 있음. 260달러대 이상은 현 상황에서 안 사는 게 맞다고 봄.",
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
      "AWS 클라우드 세그먼트 마진이 분기마다 50~100bps씩 올라오고 있는 거 시장이 제대로 안 보고 있음. 이 추세대로면 2027년 AWS 영업이익률 40% 돌파 가능한데, 그 시점에 AMZN 전체 밸류에이션 리레이팅이 다시 일어날 거임. 내 판단으론 지금 주가가 이 시나리오를 반도 안 반영했다고 생각함.",
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
      "팔란티어 섹터 7년 보면서 이렇게 상업 부문이 정부 부문을 역전한 분기는 처음임. 근데 문제는 이걸 정당화할 수 있는 매출 배수가 지금 40배인데, 역성장 한 번 나오면 그 배수 유지 자체가 논거를 잃음. 내부에서도 이 주가에서 추가 매수 의견 내는 사람은 없음.",
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
      "DCF 다시 돌려봤는데 Azure AI 기여분 포함하면 합리적인 타겟이 시장 컨센서스보다 15~20% 높게 나옴. 근데 그게 실적에 찍히려면 기업들 AI 도입 속도가 지금 추세를 유지해야 함. 내 뷰는 낙관론 쪽에 베팅하는 게 맞다고 보는데, 공식 리포트 숫자는 보수적으로 유지할 수밖에 없는 구조라서.",
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
      "모두가 베어리시한 게 오히려 카운터 시그널 같다는 생각도 드는데, 진짜 문제는 EV 침투율이 둔화된 게 일시적인지 구조적인지 판단이 안 선다는 거임. 공식 리포트엔 '하반기 회복' 썼는데 반신반의임. 사이버캡 이야기가 주가 버티게 해주는 거지, 본업 모멘텀만 보면 쉽지 않음.",
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
  // ── 2026-06-13 신규 ──────────────────────────────────────────────────────
  [-60]: [
    { alias: "판교 황소 #31", content: "$172.68이면 시총 $2.26T임. 나스닥 6위 편입 자체가 인덱스 패시브 자금 강제 유입 트리거임. S&P 500 편입 기준 충족 시 수십조 달러 추가 수요.", created_at: new Date(_an - 2 * 60_000).toISOString() },
    { alias: "강남 독수리 #52", content: "Ron Baron '내 생애 팔지 않겠다' 발언이 실제 잠금 역할 함. 공급 압력 없고 기관 수요만 있는 구조 = 주가 하방 경직성.", created_at: new Date(_an - 1 * 60_000).toISOString() },
    { alias: "을지로 사자 #77", content: "Elon이 직접 Opening Bell 친 게 마케팅 효과 극대화임. 개인 투자자 관심도 폭발 = 단기 수요 지속.", created_at: new Date(_an - 40 * 1000).toISOString() },
    { alias: "서초 매 #64", content: "27.91% 첫날 상승은 이 규모 IPO에서 드문 거임. Morgan Stanley $75B 딜 성공 = 기관 수요가 얼마나 강했는지 증명.", created_at: new Date(_an - 15 * 1000).toISOString() },
  ],
  [-59]: [
    { alias: "여의도 매 #17", content: "MLIR 컴파일러 리라이트가 왜 중요하냐면 이게 소프트웨어 해자임. 하드웨어 개선 없이 순수 소프트웨어로 20% 성능 향상 = 지속적 업그레이드 가치 증명.", created_at: new Date(_an - 14 * 60_000).toISOString() },
    { alias: "을지로 사자 #77", content: "Semi 500마일 + 1.2MW 충전 세트면 EU 물류사 TCO 계산에서 디젤 트럭 대체가 경제적으로 확정됨. 2030년 EU 탄소 규제 의무 + Tesla Semi = 강제 수요.", created_at: new Date(_an - 9 * 60_000).toISOString() },
    { alias: "광화문 늑대 #69", content: "유럽 5,100대가 26Q2 최고라는 게 인상적임. 리콜 이슈·지정학 리스크 있었던 분기에 최고치라면 기저 수요가 확인된 거임.", created_at: new Date(_an - 4 * 60_000).toISOString() },
  ],
  [-58]: [
    { alias: "판교 황소 #31", content: "100배 필요 논리가 설득력 있음. 현재 전세계 AI 인프라 규모 대비 수요 성장이 이미 100배 방향으로 가고 있음. NVDA만 수혜가 아니라 전력·냉각·부동산까지 전방 산업 전체가 임.", created_at: new Date(_an - 27 * 60_000).toISOString() },
    { alias: "서초 매 #64", content: "Colossus 1 Anthropic 임대가 SPCX 수익 다변화 첫 사례임. AI 인프라 임대 사업이 Starlink 다음 수익 축으로 성장하면 밸류에이션 추가 상향 재료.", created_at: new Date(_an - 19 * 60_000).toISOString() },
    { alias: "여의도 매 #17", content: "FY2026 $200B 타겟 달성하면 데이터센터 사업만 PSR 10배 적용 시 $2T임. NVDA 전체 시총이 아직 저평가 구간이라는 논리.", created_at: new Date(_an - 10 * 60_000).toISOString() },
  ],

  // ── 2026-06-12 신규 ──────────────────────────────────────────────────────
  [-57]: [
    { alias: "판교 황소 #31", content: "선물 $167이면 기업가치 기준으로 이미 $2.2T 수준이에요. 나스닥 개장 첫날 선물 대비 10% 할인 열려도 $150+ 이면 충분히 성공적인 IPO임.", created_at: new Date(_an - 2 * 60_000).toISOString() },
    { alias: "강남 독수리 #52", content: "S&P 500 편입 기준 충족 여부가 다음 촉매임. 편입되면 인덱스 펀드 수십 조 달러 강제 매수 발생. BlackRock $50B 주문은 그 선제 포지셔닝임.", created_at: new Date(_an - 1 * 60_000).toISOString() },
    { alias: "서초 매 #64", content: "직원 4,000명 백만장자 탄생이 미디어 화제성 극대화. IPO 날 개인투자자 관심 폭발 = 수요 추가 확인.", created_at: new Date(_an - 30 * 1000).toISOString() },
    { alias: "을지로 사자 #77", content: "머스크 ASML 기조연설이 IPO 당일이라는 타이밍 절묘함. 반도체 수직계열화 선언 = 장기 EPS 성장 스토리 강화.", created_at: new Date(_an - 10 * 1000).toISOString() },
  ],
  [-56]: [
    { alias: "여의도 매 #17", content: "Amundi $1.24B가 트리거임. 유럽 기관들 ESG 위원회 재심사 시작됐다는 신호임. Norges Bank(노르웨이 국부펀드)도 비중 복원 검토 중일 거임.", created_at: new Date(_an - 12 * 60_000).toISOString() },
    { alias: "강남 독수리 #52", content: "EU ROW 조항으로 FSD 27개국 자동 확산이면 100만 대 FSD 구독 수익화가 올해 안에 시작될 수 있음. 이게 TSLA 밸류 재평가 촉매.", created_at: new Date(_an - 7 * 60_000).toISOString() },
    { alias: "을지로 사자 #77", content: "Cybertruck AWD $59,990은 포드 F-150 Lightning보다 $15,000 싸고 성능 우위임. 픽업트럭 시장 점유율 확대 + 에너지 마진 24.6% 유지 = 이익 레버리지 극대화.", created_at: new Date(_an - 3 * 60_000).toISOString() },
    { alias: "광화문 늑대 #69", content: "메가팩 호주 100MW 완공이 에너지 사업 글로벌 확장 가속 신호임. 에너지 영업이익률 > 자동차인 구조가 유지되면 테슬라 이익 믹스가 구조적으로 개선됨.", created_at: new Date(_an - 1 * 60_000).toISOString() },
  ],
  [-55]: [
    { alias: "판교 황소 #31", content: "$110.5B 월매출 = AI 칩 슈퍼사이클 아직 가속 중이라는 확인임. 전월 대비 +11% MoM도 계절성 아닌 구조적 수요임.", created_at: new Date(_an - 25 * 60_000).toISOString() },
    { alias: "서초 매 #64", content: "CoWoS 양산 전환 시 NVDA 원가 개선됨. 같은 GPU를 더 낮은 비용으로 만들어 마진율이 올라가는 거임. 2H26 실적 개선 촉매.", created_at: new Date(_an - 18 * 60_000).toISOString() },
    { alias: "을지로 사자 #77", content: "Feynman = 2028년 칩 세대 이름임. 이미 초기 채택 논의가 시작됐다는 건 NVDA 로드맵이 5년 이상 시야에서 이미 확보됐다는 거임.", created_at: new Date(_an - 10 * 60_000).toISOString() },
  ],
  [-54]: [
    { alias: "판교 황소 #31", content: "RPO $638B = Oracle 향후 5년 매출 이미 확보된 거임. 연간 매출 $100B+이 기정사실화된 거죠. 현 PER 40x가 오히려 저평가일 수 있음.", created_at: new Date(_an - 39 * 60_000).toISOString() },
    { alias: "강남 독수리 #52", content: "OCI가 AWS·Azure보다 싼 이유가 Oracle 레거시 DB와의 통합 번들링 때문임. 기존 Oracle DB 고객들은 AI 전환 시 OCI가 자연스러운 선택임.", created_at: new Date(_an - 30 * 60_000).toISOString() },
    { alias: "여의도 매 #17", content: "NVDA와 OCI 독점 GB200 클러스터 배포 계약이 핵심 경쟁력임. NVDA가 OCI를 선택한 것 자체가 신뢰 인증임.", created_at: new Date(_an - 22 * 60_000).toISOString() },
  ],
  [-53]: [
    { alias: "판교 황소 #31", content: "이란 공습 취소 + 핵합의 진행이 오늘 시장 상승 반전 트리거임. 유가 $85로 내려가면 6월 CPI 3% 이하 유지 가능 = 연준 인하 기대 복원임.", created_at: new Date(_an - 52 * 60_000).toISOString() },
    { alias: "강남 독수리 #52", content: "머스크 로봇 빅 플랫폼 선언이 TSLA 장기 뷰를 강화함. Optimus가 공장 내 이미 작업 중이라는 팩트가 이 선언을 뒷받침함.", created_at: new Date(_an - 45 * 60_000).toISOString() },
    { alias: "을지로 사자 #77", content: "SpaceX IPO + 이란 리스크 해소 + 반도체 신기록 + Oracle RPO 폭발이 모두 같은 날임. 이런 날은 드물다. 모멘텀 투자 관점에서 최고의 날임.", created_at: new Date(_an - 38 * 60_000).toISOString() },
  ],

  // ── 2026-06-11 최신 ──────────────────────────────────────────────────────
  [-50]: [
    { alias: "판교 황소 #31", content: "3대 신용평가사 투자등급이면 패시브 펀드도 편입 기준 맞추는 거임. IPO 후 패시브 자금 유입 속도가 핵심임.", created_at: "2026-06-11T08:03:00.000Z" },
    { alias: "강남 독수리 #52", content: "Starlink + AI 임대 + TeraFab 삼각편대가 완성되면 $1.75T는 시작점임. 2028년 기가팩토리 가동 후 밸류에이션 재논의.", created_at: "2026-06-11T08:06:00.000Z" },
    { alias: "서초 매 #64", content: "공모가 $25~30에 555M주면 총 공모 $14~17B임. 역대 10위권 IPO 규모임. 수요 넘칠 거임.", created_at: "2026-06-11T08:09:00.000Z" },
    { alias: "광화문 늑대 #69", content: "이란 리스크가 걸리긴 하는데 IPO 철회 가능성보다 상장 후 단기 변동성 관리 쪽으로 보고 있음.", created_at: "2026-06-11T08:12:00.000Z" },
  ],
  [-49]: [
    { alias: "여의도 매 #17", content: "Potter가 Autonomy를 레이팅 팩터로 추가했다는 게 포인트임. 이제 FSD 구독 수익이 TSLA 밸류에이션 모델에 공식 들어가는 거임.", created_at: "2026-06-11T08:18:00.000Z" },
    { alias: "강남 독수리 #52", content: "덴마크·벨기에 동시 승인이 유럽 FSD 확산의 가속 신호임. 독일 인가 나오면 유럽 구독 수익이 구조적으로 열리는 거임.", created_at: "2026-06-11T08:22:00.000Z" },
    { alias: "서초 매 #64", content: "로보택시 89대 증가 속도가 핵심임. 이 페이스면 Q3 말에 500대 이상 가능. 수익화 속도가 기대보다 빠를 수 있음.", created_at: "2026-06-11T08:26:00.000Z" },
    { alias: "을지로 사자 #77", content: "누적 170B 마일 = 경쟁 불가한 학습 데이터 해자임. 이게 FSD를 장기적으로 유일한 레벨 4 솔루션으로 만드는 거임.", created_at: "2026-06-11T08:29:00.000Z" },
  ],
  [-48]: [
    { alias: "판교 황소 #31", content: "Starship 완전 재사용 달성 타임라인이 투자 포인트임. 2027년 완전 재사용 가능하면 Starlink 마진이 구조적으로 점프하는 거임.", created_at: "2026-06-11T08:33:00.000Z" },
    { alias: "여의도 매 #17", content: "TeraFab이 SpaceX·Tesla·xAI 공동 프로젝트라는 게 세 회사 칩 수요 통합해서 TSMC 리스크 헤지하는 동시에 규모의 경제 달성하는 구조임.", created_at: "2026-06-11T08:37:00.000Z" },
    { alias: "을지로 사자 #77", content: "S-1에 이 데이터가 들어갔다는 게 투자자에게 Starship 전환 가치를 숫자로 보여주는 거임. IPO 전 밸류에이션 정당화 작업이기도 하고.", created_at: "2026-06-11T08:40:00.000Z" },
  ],
  [-47]: [
    { alias: "여의도 매 #17", content: "CPI 2.9%는 거슬리지만 AI 인프라 CAPEX는 CPI와 별개임. 하이퍼스케일러들 투자 계획 변경 없음. 구조적 수요 계속.", created_at: "2026-06-11T08:48:00.000Z" },
    { alias: "판교 황소 #31", content: "이란 리스크가 단기 변수는 맞지만 SpaceX IPO 스토리가 압도함. $1.75T 밸류에이션은 지정학 리스크 몇 개로 흔들릴 레벨이 아님.", created_at: "2026-06-11T08:52:00.000Z" },
    { alias: "강남 독수리 #52", content: "유가 $90이면 Starlink 위성 발사 비용 영향 있긴 하지만 SpaceX 자체 전력망 구축 중이라 장기적으로는 헤지됨.", created_at: "2026-06-11T08:56:00.000Z" },
  ],
  [-46]: [
    { alias: "을지로 사자 #77", content: "Starlink S-1 연매출 $10.8B에 AI 임대 연 $4B+ 더하면 $15B+ 수익 구조임. IPO 전에 이걸 공개했다는 게 기업가치 정당화 작업이기도 하죠.", created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
    { alias: "서초 매 #64", content: "기가팩토리 완공 전에 임차인 확정된 구조는 IRR 계산이 완전히 달라지죠. 리스크가 거의 없는 개발 프로젝트임.", created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
    { alias: "광화문 늑대 #69", content: "Google이 Azure 대신 SpaceX 선택한 것 자체가 Microsoft한테 압박이에요. AI 인프라 경쟁이 이제 클라우드 넘어서 물리 인프라로 가는 거임.", created_at: new Date(Date.now() - 1000 * 30).toISOString() },
    { alias: "여의도 매 #17", content: "동의함. $500B 논의는 Bastrop 가동 후 첫 분기 수익 공개되면 바로 나올 거임.", created_at: new Date(Date.now() - 1000 * 10).toISOString() },
  ],
  [-45]: [
    { alias: "여의도 매 #17", content: "네덜란드 데이터가 EU 규제 해제 논거로 쓰인다는 시각 동의임. 부상 14.9배 감소를 규제 기관이 무시하기 어렵죠.", created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    { alias: "강남 독수리 #52", content: "Semi EU + 로보택시 + FSD 세 개 축이 동시에 움직이는 분기가 언제 오느냐가 관건이에요. 2027년에 다 열리면 밸류에이션 리레이팅 폭이 클 것 같음.", created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { alias: "을지로 사자 #77", content: "덴마크 이어 네덜란드 데이터까지 나오면 다음은 독일임. 독일 인가 나오는 순간이 유럽 FSD 수익화 기점이 될 거임.", created_at: new Date(Date.now() - 1000 * 60 * 1).toISOString() },
  ],
  [-44]: [
    { alias: "판교 황소 #31", content: "젠슨 황 발언 + 수주잔고 H1 2027 확보 세트가 포인트임. 발언 혼자면 홍보인데 수주잔고로 뒷받침되니 신뢰할 수 있음.", created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    { alias: "서초 매 #64", content: "AI 클라우드 Apple+Google+NVDA vs MSFT 구도에서 NVDA는 양쪽에 납품하니까 시장이 어떻게 재편되든 수혜임. 전쟁 중 무기상 포지션.", created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
    { alias: "광화문 늑대 #69", content: "Intel 발주는 장기적으로 NVDA 공급망 리스크 관리임. TSMC 대만 리스크 헤지하는 게 맞는 방향.", created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString() },
  ],
  [-43]: [
    { alias: "강남 독수리 #52", content: "미국 $2,250억 + 중국 $2,950억이면 글로벌 AI 인프라 투자가 $5T+ 방향임. NVDA 수요 이야기가 아직 끝나지 않은 거임.", created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString() },
    { alias: "여의도 매 #17", content: "JPMorgan AI 에이전트 배포 계획이 조용히 중요한 뉴스임. 금융 대형사들이 본격 AI화되면 인퍼런스 GPU 수요가 또 한 번 터지는 거임.", created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
  ],
  [-42]: [
    { alias: "여의도 매 #17", content: "ARPU 분석 정확함. 볼륨 성장이 ARPU 하락을 완전 상쇄하는 구조임. B2B 믹스가 올라가면 ARPU 반등 + 볼륨 유지라는 이상적인 조합이 가능함.", created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString() },
    { alias: "판교 황소 #31", content: "Starlink 단독 $108B이면 SpaceX 전체 $350B의 30%인데 로켓 발사, AI 임대, 기타 사업까지 더하면 $350B은 진짜 저평가임.", created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
    { alias: "서초 매 #64", content: "30개+ 통신사 실 과금 구조가 핵심임. 통신사들이 Starlink 재판매하면 구독자당 수익이 직접 B2C보다 낮아도 볼륨이 폭발함.", created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString() },
  ],
  [-41]: [
    { alias: "여의도 매 #17", content: "EU 탄소 규제 2030년 45% 감축 의무가 핵심임. 이게 강제 수요 창출임. 물류사들 선택이 아니라 의무가 되는 거임.", created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
    { alias: "강남 독수리 #52", content: "Megacharger 네트워크 없으면 경쟁사 전기 트럭이 장거리 운행에 한계가 있죠. Tesla Semi + Megacharger 세트가 진짜 해자임.", created_at: new Date(Date.now() - 1000 * 60 * 38).toISOString() },
    { alias: "판교 황소 #31", content: "EU 30만 대 시장 10% = 3만 대/년임. Tesla Semi 평균 ASP $200K 가정하면 연 $6B 매출 포텐셜임. 이게 열리는 게 언제냐가 포인트.", created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString() },
    { alias: "서초 매 #64", content: "BD 채용 후 물류사 파일럿 계약 → 대량 출시까지 18~24개월이라 2027~2028년 타임라인이 현실적임. 지금 포지션 쌓는 타이밍.", created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  ],
  [-40]: [
    {
      alias: "강남 독수리 #52",
      content: "AVO 인가 나왔으면 이제 운행 데이터가 쌓이는 거임. Q3 오스틴 운행 결과가 다음 주 인가 확대의 근거가 되는 선순환임. 분기별 운행 데이터 모니터링이 핵심 지표임.",
      created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      alias: "판교 황소 #31",
      content: "Cybercab 양산 일정이랑 AVO 타이밍 겹친 게 우연이 아님. 인가 → 배포 → 데이터 → 타주 인가 선순환 구조임. 지금이 로보택시 밸류에이션 리레이팅 시작 구간임.",
      created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "안전요원 비용 제거가 수익성 핵심 변수임. 기존 모든 자율주행 서비스가 안전요원 인건비 때문에 적자인데 AVO로 그게 없어지면 BEP 달성 시점이 완전히 당겨짐.",
      created_at: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
    },
  ],
  [-39]: [
    {
      alias: "마포 황소 #11",
      content: "Starlink 단독 분리 상장 IRR이 가장 높다는 분석 동의함. SpaceX 전체 상장은 발사 사업 싸이클리컬 성격이 Starlink 성장 스토리에 노이즈 주는 구조임. 분리가 양쪽 다 이득임.",
      created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      alias: "을지로 사자 #77",
      content: "AI 서비스 $3.2B이 올해 수익인데 H100 8,000개면 추론 서비스 팔 수 있는 용량이 충분함. 클라우드 4강 진입 타임라인이 생각보다 빠를 수 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      alias: "강남 팔콘 #62",
      content: "현재 $350B에서 $2T 목표면 5.7배인데 Starlink 가입자 성장 속도면 10년 뷰에서 가능한 수학임. 비상장이라 타겟 설정 어렵지만 TSLA 통한 익스포저가 현실적인 접근임.",
      created_at: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    },
  ],
  [-38]: [
    {
      alias: "서초 매 #64",
      content: "Anthropic PSR 1.4배 vs OpenAI PSR 4배 — 이 밸류에이션 갭이 합리화되기 어려움. Claude ARR 성장 속도가 GPT 대비 빠르다면 오히려 역전 가능성 있음. AMZN 보유자 입장에서는 공짜 옵션임.",
      created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    },
    {
      alias: "광화문 늑대 #69",
      content: "Bedrock 통한 Claude 성장이 AWS 마진 개선 1위 만든 게 Q1 실적으로 확인됐음. 이게 Anthropic IPO 전에도 AMZN에 반영되는 구조임. 장기 홀더한테는 베스트 포지션임.",
      created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    },
    {
      alias: "잠실 매 #78",
      content: "$65B 기업가치인데 ARR이 $47B이면 5개월 후 ARR이 더 빠르게 성장할 거임. 상장 시점에 ARR 두 배 되면 $130B+ 기업가치도 가능한 수학임. 타이밍이 관건임.",
      created_at: new Date(Date.now() - 1000 * 60 * 16).toISOString(),
    },
  ],
  [-37]: [
    {
      alias: "강남 독수리 #52",
      content: "구독 수익이 멀티플 확장 재료라는 거 동의함. 광고 단일 수익 회사가 PER 20배면 구독 추가 시 25~30배가 정당화됨. 지금 주가에서 $314 목표는 합리적임.",
      created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      alias: "마포 올빼미 #73",
      content: "AI 광고 ROI 2배 개선이 광고주 예산 증가로 이어지는 건 이미 Q1 실적으로 확인됨. 구독 더해도 광고 수익 잠식 없는 구조라 두 개가 독립적으로 성장하는 게 포인트임.",
      created_at: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    },
    {
      alias: "을지로 표범 #43",
      content: "Llama 오픈소스가 기업 API 수익화로 가면 세 번째 레이어임. 광고+구독+API면 Microsoft Azure 구조랑 비슷해지는 거임. 그렇게 되면 밸류에이션 참조 기업이 바뀌는 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
  ],
  [-36]: [
    {
      alias: "여의도 매 #17",
      content: "수주잔고 역대 최고 채널 체크로 확인됨. 회계 이슈 때문에 주가가 눌렸던 건데 본업 스토리로 복귀하는 거임. FY2026 $25B+ 전망 유지하는 근거가 수주잔고임.",
      created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      alias: "판교 황소 #31",
      content: "커스텀 칩 채택해도 AI 서버는 사야 함. Trainium이든 TPU든 결국 SMCI 랙에 들어가는 거임. 커스텀 칩 확산이 SMCI 적이 아니라 우군임.",
      created_at: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
    },
  ],
  [-35]: [
    {
      alias: "강남 팔콘 #62",
      content: "Morgan Stanley 채널 체크 숫자 신뢰도 높음. Adam Jonas가 이 정도 구체적인 숫자 내면 소스 탄탄한 거임. AVO랑 묶이면 FSD 성장이 규제 + 사용자 두 개 축에서 동시에 확인된 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 68).toISOString(),
    },
    {
      alias: "잠실 콘도르 #53",
      content: "44% MoM 유지되면 연말 일 1억 마일 돌파임. 그 시점에 FSD 완성도 재평가가 나올 것임. 지금 포지션이 그 재평가 전에 들어가는 타이밍인 게 맞음.",
      created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "연환산 97.5억 마일이면 Waymo 연간 5천만 마일 대비 195배임. 이 격차가 좁혀지는 구조가 아니라 더 벌어지는 거임. 자율주행 경쟁 결과는 사실상 나온 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 52).toISOString(),
    },
  ],
  [-34]: [
    {
      alias: "마포 황소 #11",
      content: "Starlink 도매 구조가 통신사한테 자체 위성 대비 비용 100배 절감임. 한번 연결되면 이탈 안 함. 30개가 50개, 100개로 늘어나는 건 시간문제임. 수익 가시성이 이 숫자에서 나오는 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 82).toISOString(),
    },
    {
      alias: "을지로 사자 #77",
      content: "B2B 도매 수익은 B2C보다 ASP 낮지만 계약 기반이라 예측 가능성이 높음. 할인율 낮아지면 현재 가치 올라가는 구조임. Starlink 단독 상장 밸류에이션 기반으로 충분함.",
      created_at: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    },
    {
      alias: "광화문 매 #04",
      content: "SK텔레콤이 Starlink 파트너라는 거 한국 투자자한테는 중요한 포인트임. 국내 통신 인프라에 SpaceX가 들어오는 거임. 이게 현실이 되면 국내 통신주 밸류에이션에도 변수임.",
      created_at: new Date(Date.now() - 1000 * 60 * 68).toISOString(),
    },
  ],
  [-33]: [
    {
      alias: "을지로 사자 #77",
      content: "NIO Li Bin 발언이 핵심 포인트임. 경쟁사 CEO가 공개 인정한 건 기술 격차가 그 분도 부정 못 하는 수준이라는 거임. 중국 FSD 진출 시 로컬 경쟁사들이 방어할 수단이 없음.",
      created_at: new Date(Date.now() - 1000 * 60 * 98).toISOString(),
    },
    {
      alias: "강남 팔콘 #62",
      content: "200만대+ 중국 출고 차량 FSD 업셀링이 소프트웨어 마진 ~80%임. 단 1%만 전환해도 연간 수억 달러 추가 소프트웨어 수익임. 이게 자동차 사업과 다른 레벨의 마진 레버리지임.",
      created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
  ],
  [-32]: [
    {
      alias: "여의도 독수리 #08",
      content: "XLE 축소 타이밍 맞다고 봄. 협상 타결 확률이 50%가 안 된다고 해도 리스크 관리 차원에서 비중 줄이는 게 맞음. 항공사 비중 늘린 건 유가 하락 헤지로 좋은 접근임.",
      created_at: new Date(Date.now() - 1000 * 60 * 112).toISOString(),
    },
    {
      alias: "강남 사자 #24",
      content: "CBDC 폐지 + BTC 비축 정책 조합이 장기 친암호화폐 환경 확정 시그널임. 단기 Wild West 통제 뉴스가 노이즈처럼 보여도 큰 방향이 맞으면 포지션 유지가 맞음. IBIT 홀딩.",
      created_at: new Date(Date.now() - 1000 * 60 * 105).toISOString(),
    },
  ],
  [-31]: [
    {
      alias: "서초 매 #64",
      content: "에너지 마진이 자동차 초과한다는 게 이제 분기 실적으로 계속 확인되고 있음. Megapack 백로그 12개월+ 면 FY2026 에너지 부문 성장률이 자동차 압도하는 거임. 복합 성장 스토리 강화됨.",
      created_at: new Date(Date.now() - 1000 * 60 * 128).toISOString(),
    },
    {
      alias: "판교 황소 #31",
      content: "400개 Megapack이면 약 1.56GWh 저장용량임. 텍사스 전력망 안정 기여하면서 동시에 출고 물량 폭증이면 에너지+자동차 두 개 모두 가속 중인 거임. 오늘 TSLA 뉴스 중 가장 과소평가된 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ],
  [-30]: [
    {
      alias: "여의도 매 #17",
      content: "기관 진입 장벽이 규제 불확실성이었는데 CBDC 폐지 + 스테이블코인 법안으로 명확화되면 IBIT 자금 유입 가속됨. 단기 Wild West 통제 뉴스는 장기 기관 자금 유입 구조 확립의 과정임.",
      created_at: new Date(Date.now() - 1000 * 60 * 142).toISOString(),
    },
    {
      alias: "강남 독수리 #52",
      content: "COIN은 스테이블코인 규제 명확화 수혜 1순위임. GENIUS Act 통과 시 Coinbase가 스테이블코인 인프라 역할 강화됨. BTC ETF + COIN 조합이 정책 수혜 포트폴리오임.",
      created_at: new Date(Date.now() - 1000 * 60 * 135).toISOString(),
    },
  ],
  [-29]: [
    {
      alias: "마포 황소 #11",
      content: "우주 데이터센터 비전이 10년 뷰면 지금 투자 포인트는 H100 8,000개 기반 AI 서비스 임박한 수익화임. 단기 현금 흐름 가시성이 있는 AI 컴퓨팅 판매가 먼저임. 장기 비전은 덤임.",
      created_at: new Date(Date.now() - 1000 * 60 * 158).toISOString(),
    },
    {
      alias: "을지로 사자 #77",
      content: "NVDA GPU 공급 수혜는 어떤 AI 클라우드가 이겨도 NVDA가 이기는 구조임. SpaceX H100 8,000개도 NVDA 매출임. 비상장 SpaceX에 못 들어가도 NVDA로 간접 수혜받는 포지션 유지.",
      created_at: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    },
    {
      alias: "강남 팔콘 #62",
      content: "Anthropic + SpaceX 조합이 AWS 생태계랑 겹치는 부분이 있음. Amazon이 Anthropic 최대주주고 SpaceX가 Anthropic과 파트너인 구조면 Amazon이 이 생태계에서 중심에 있는 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 143).toISOString(),
    },
  ],
  [-28]: [
    {
      alias: "강남 독수리 #52",
      content: "Cybercab 배포 일정 7월 오스틴이면 SBW 양산 리스크가 없다는 게 이미 확인된 거임. 리포트 봐서 기술 설명 좋은데 투자자한테 제일 중요한 건 그게 Cybercab 타임라인 지연 리스크를 제거한다는 논리임.",
      created_at: new Date(Date.now() - 1000 * 60 * 9).toISOString(),
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "조향 구독 수익화 잠재력은 맞는 방향인데 규제 이슈 있을 수 있음. 안전 관련 기능을 구독 게이팅하는 건 도로교통법 저촉 가능성 있어서 어떤 기능까지 유료화 가능한지 법적 검토가 먼저임.",
      created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      alias: "판교 황소 #31",
      content: "FSD-SBW 통합 최적화가 Waymo 대비 Tesla 자율주행 아키텍처 우위 근거 중 하나임. Waymo 라이다 방식은 SBW 없어도 되는 구조라 비교가 어렵지만, 순수 카메라+AI 방식에서 SBW는 필수적인 하드웨어 요소임.",
      created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
  ],
  [-27]: [
    {
      alias: "을지로 사자 #77",
      content: "Committed PO 개념 중요한 포인트 잡았음. 취소 불가 계약이면 매출 가시성이 다른 차원임. NVDA 실적 발표 때마다 수주잔고 숫자 업데이트 나오는 걸 계속 봐야 함. 이게 줄어드는 시점이 매도 신호임.",
      created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
      alias: "마포 황소 #11",
      content: "Anthropic $64B 계약이 모두 NVDA GPU 기반이라면 Anthropic이 NVDA 최대 고객 중 하나인 거임. Claude 모델 성장 = NVDA 매출 성장이 연동되는 구조인데 이 상관관계가 시장에서 충분히 인식 안 됐음.",
      created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      alias: "여의도 콘도르 #19",
      content: "5T 타겟 내는 기관 나오면 주가 레벨 달라짐. 지금 $3.5T 정도인데 5T면 40% 업사이드. 수주잔고 기반 DCF에서 그게 나오려면 마진 가정이 현재보다 높아야 하는데 Blackwell Ultra ASP 추세가 핵심.",
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      alias: "강남 팔콘 #62",
      content: "Azure -2.5bps 하락이 계속되면 MS가 NVDA 구매 감소로 비용 절감 시도할 수 있음. 근데 그러면 AI 서비스 경쟁력이 떨어지는 딜레마에 빠지는 거라 실제로 줄이기 어려운 구조임.",
      created_at: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
    },
  ],
  [-26]: [
    {
      alias: "서초 매 #64",
      content: "HBM 비중 50% 돌파 타임라인 동의. 2027년 전후가 MU 밸류에이션 재평가 시점임. 그 전까지 범용 DRAM 마진 압박 감수해야 하는데 그 구간을 버틸 현금 흐름이 있는지 보는 게 중요함.",
      created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      alias: "잠실 황소 #95",
      content: "10배 사이클 논리 매력적인데 과거 두 번 중 한 번은 ~4배 성장이었음. 정확히 '10배'라는 수치에 집착하기보다 AI 수요 구조화가 몇 배 성장을 만드는지가 투자 포인트임. 방향은 맞음.",
      created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    },
    {
      alias: "판교 늑대 #09",
      content: "CHIPS법 팹 2028년 완성 전까지 SK하이닉스 HBM 우위가 유지되는 구간임. MU는 그 이후 종목으로 포지셔닝하는 게 맞을 수도 있음. 지금 사려면 2028년 HBM 생산량 기대를 선반영하는 판단이어야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 33).toISOString(),
    },
  ],
  [-25]: [
    {
      alias: "판교 황소 #31",
      content: "국가 보조금 덤핑 경쟁은 중국이 DRAM뿐 아니라 다른 산업에서도 써온 방법임. 삼성이 과거에도 버텨냈는데 그때와 다른 건 CXMT가 기술 수준 자체를 빠르게 따라오고 있다는 거임. 3~5년이 중요한 관찰 구간.",
      created_at: new Date(Date.now() - 1000 * 60 * 88).toISOString(),
    },
    {
      alias: "여의도 매 #33",
      content: "미국 추가 제재 카드가 변수임. Corsair 채용 이슈 의회에서 터지면 CXMT 제재 나올 수 있고 그러면 판세가 달라짐. 제재 리스크가 CXMT 포지션의 숨겨진 취약점임.",
      created_at: new Date(Date.now() - 1000 * 60 * 72).toISOString(),
    },
  ],
  [-24]: [
    {
      alias: "을지로 팔콘 #16",
      content: "Azure 마진 하락이 기업 예산 배분 변화로 이어지는 시그널 확인되면 AWS 점유율 데이터를 4Q 실적에서 봐야 함. 마진→점유율→주가 시퀀스가 AMZN 리레이팅 경로임.",
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      alias: "마포 올빼미 #73",
      content: "Trinium + Bedrock 조합이 NVDA 의존 줄이는 구조라는 게 중요함. AI 클라우드 마진 구조에서 GPU 비용이 제일 크고, 자체 칩으로 대체하면 그게 직접 마진으로 들어오는 거임. AWS 마진 개선의 구조적 근거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 108).toISOString(),
    },
    {
      alias: "강남 올빼미 #85",
      content: "Anthropic이 AWS에 독점적으로 붙어있는 게 아니라 Google도 투자자인데, Bedrock 통해 Claude 쓰는 기업 수가 얼마나 되는지 실제 숫자가 중요함. 다음 실적 발표에서 Bedrock 고객사 수 공개 여부 체크해야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    },
  ],
  [-23]: [
    {
      alias: "잠실 콘도르 #53",
      content: "FSD 유럽 승인 타임라인이 어떻게 되는지가 다음 레그임. 독일 규제당국이 제일 까다로운데 독일 통과하면 전체 EU 적용 가능한 구조임. 내부에서 2027년 초 보는 시각도 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 160).toISOString(),
    },
    {
      alias: "여의도 매 #17",
      content: "Q2 인도량 컨센서스 47~48만대면 YoY로 얼마임? 전년 Q2가 44만대 수준이었으니까 7~9% 성장이고 시장이 기대치 낮춰놓은 거라 서프라이즈 가능성 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 145).toISOString(),
    },
    {
      alias: "판교 늑대 #09",
      content: "3개월 연속 반등이 신형 Model Y 출시 효과인지 브랜드 회복인지 구분이 중요함. 신차 효과면 일시적일 수 있고 브랜드 회복이면 구조적임. 다음 1~2개월 데이터가 판별 포인트.",
      created_at: new Date(Date.now() - 1000 * 60 * 128).toISOString(),
    },
    {
      alias: "광화문 늑대 #69",
      content: "SpaceX Megapack 벨기에 착공이 같이 나온 게 Tesla 에너지 부문 매출 모델에 영향 있음. SpaceX가 Megapack 구독식으로 계속 사면 에너지 부문이 안정적 B2B 수요처 생기는 거임.",
      created_at: new Date(Date.now() - 1000 * 60 * 112).toISOString(),
    },
  ],
  [-22]: [
    {
      alias: "여의도 콘도르 #19",
      content: "Starlink 단독 상장이 맞는 방향이라는 데 동의. 합병은 CFIUS 심사 6개월+ 걸리고 주주 희석 승인까지 받으려면 1년은 걸림. 단독 상장은 절차 단순하고 Starlink 자체 밸류에이션 극대화됨.",
      created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    },
    {
      alias: "을지로 사자 #77",
      content: "완전 재사용 올해 목표는 Elon 특유의 낙관 타임라인임. 실제로 되면 발사 비용 혁명인데 현실적으로는 2027년 초로 보는 시각이 더 많음. 그래도 방향은 맞음.",
      created_at: new Date(Date.now() - 1000 * 60 * 185).toISOString(),
    },
    {
      alias: "잠실 황소 #95",
      content: "B2G 수익이 Starlink 기업가치에서 핵심 프리미엄 요소임. 군사 통신 계약은 경쟁입찰 없이 독점적 구조가 가능하고 마진이 B2C 대비 훨씬 높음. $2.35B 계약이 시작이라면 규모 확대 가능성 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 168).toISOString(),
    },
  ],
  [-21]: [
    {
      alias: "을지로 팔콘 #16",
      content: "전체 뷰 정리 맞음. AI 섹터 전반 강세 유지. 단 CXMT 이슈가 메모리 내 종목 선별을 만들어내는 거고 이게 섹터 전체 위험이 아닌 종목 분산 요인임. 포트폴리오 내 MU와 SKH 비중 재조정 고민 중.",
      created_at: new Date(Date.now() - 1000 * 60 * 245).toISOString(),
    },
    {
      alias: "강남 올빼미 #85",
      content: "Tesla 유럽 데이터가 단기 모멘텀이라는 표현이 맞는데 단기라도 Q2 인도량 숫자가 서프라이즈 나오면 주가 단기 모멘텀 생기는 거임. 7월 실적 발표 전까지 TSLA 포지션 유지 전략 맞음.",
      created_at: new Date(Date.now() - 1000 * 60 * 228).toISOString(),
    },
    {
      alias: "마포 황소 #11",
      content: "오늘처럼 NVDA, AMZN, TSLA, MU 다 긍정적 재료 나오는 날 시장 흐름 보면 AI 섹터 방향이 분명함. 개별 종목 리스크보다 섹터 방향이 중요한 구간임.",
      created_at: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
    },
    {
      alias: "판교 황소 #31",
      content: "SpaceX IPO 시나리오가 TSLA에 어떤 영향 주는지가 개인적으로 제일 주시하는 변수임. 합병되면 TSLA 주주 희석, 단독 IPO면 TSLA 프리미엄 일부 소멸. 어느 쪽이든 가격 조정 가능성 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 195).toISOString(),
    },
  ],
  [-20]: [
    {
      alias: "강남 사자 #24",
      content: "교환비율 문제가 진짜 핵심임. SpaceX $350B 기준으로 TSLA 주주 희석 계산하면 합병 시너지 가정이 상당히 공격적이어야 현재 주가 프리미엄이 정당화됨. 숫자 불편하게 나온다는 거 충분히 이해함.",
      created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    {
      alias: "서초 곰 #39",
      content: "Kalshi 33%도 높다고 봄. TSLA 이사회 승인 없이 Elon이 단독으로 발표할 성격의 딜이 아닌데, 보도 자체가 협상 레버리지용일 가능성 배제 못 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      alias: "판교 사자 #22",
      content: "합병 안 되더라도 SpaceX 연산 자원이 TSLA FSD에 투입되는 사이드 딜 가능성은 있음. 그 자체만으로도 기술 밸류 재평가 재료 될 수 있어서 상황 계속 봐야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    },
  ],
  [-19]: [
    {
      alias: "을지로 팔콘 #16",
      content: "$8억 초과분 IR 자료만으로 파악 안 될 수 있음. 다음 분기 컨퍼런스콜에서 세그먼트별 직접 물어봐야 할 사안이라고 생각함. Optimus 개발비 공시 방식부터 명확히 해달라고 해야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      alias: "마포 수리부엉이 #28",
      content: "에너지 부문이 버텨준다는 거 맞는데, 주식수 35% 증가가 EPS에 누적으로 쌓이는 희석 효과는 과소평가하면 안 됨. 단기 실적보다 장기 주주가치 훼손 여부가 더 중요한 포인트임.",
      created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
  ],
  [-18]: [
    {
      alias: "여의도 독수리 #08",
      content: "평단 $147에 $506 보는 감정 공감함. MI400 나오기 전까지 CoWoS 병목이 유일한 제약인데, TSMC 내 AMD 배분 비중이 늘어나는 추세라 해소 시점이 생각보다 빠를 수도 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    },
    {
      alias: "잠실 독수리 #41",
      content: "공급 제약이 AMD만의 문제 아니라는 거 맞음. 다만 수요가 공급 초과하는 구간에선 가격 협상력이 AMD한테 있다는 게 실질적인 마진 레버리지 포인트임.",
      created_at: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    },
    {
      alias: "광화문 호랑이 #35",
      content: "구조적 상승 여력이라는 표현이 AI 인프라 수요 지속 가정에서만 성립한다는 점은 체크해야 함. 그 가정 흔들리는 시점에 배수 리레이팅이 빠르게 역행할 수 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    },
    {
      alias: "을지로 황소 #05",
      content: "채널 체크에서 MI300X 수요 공급 역전 확인됨. 이 구간 AMD 마진이 올라오면 실적이 컨센서스 웃도는 분기 나올 수 있어서 다음 가이던스 체크가 중요함.",
      created_at: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    },
  ],
  [-17]: [
    {
      alias: "여의도 매 #17",
      content: "2028 HBM4 팹 타임라인이면 SK하이닉스 우위 구간이 길게 이어짐. 그 사이 MU가 HBM3E 수율 올려서 간격 좁히는 게 핵심 변수인데, 아이다호 착공 속도가 시장 기대보다 느리면 2028도 낙관일 수 있음.",
      created_at: new Date(Date.now() - 1000 * 60 * 115).toISOString(),
    },
    {
      alias: "잠실 독수리 #41",
      content: "정치인 보유 이슈는 단기 노이즈지만 CHIPS법 자금 집행 지속성 확인하는 계기가 됨. 정책 리스크 관리 측면에서 유의미한 시그널이라 봄. MU 2027 픽이라는 뷰 동의함.",
      created_at: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
    },
  ],
  [-16]: [
    {
      alias: "판교 호랑이 #35",
      content: "$350B 보수적으로 보인다는 뷰 동의함. B2G 군사 계약이 리커링으로 쌓이면 기업가치 재산정 필요한 시점인데, 비상장이라 반영 타이밍이 상장 이후에나 오는 게 문제임.",
      created_at: new Date(Date.now() - 1000 * 60 * 155).toISOString(),
    },
    {
      alias: "마포 수리부엉이 #28",
      content: "TSLA 합병 루머가 직접 IPO 타이밍 재는 시그널이라는 해석 흥미로움. 합병이면 이 밸류에이션 계산이 통째로 바뀌는 거라 두 시나리오 동시에 준비해야 함.",
      created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    },
    {
      alias: "강남 사자 #24",
      content: "비상장 직접 포지션 없는 거 아쉬운 날이라는 거 공감함. SPAC이나 간접 경로 검토해볼 만하다는 생각인데, 현실적으론 TSLA 통해서 간접 익스포저 잡는 게 지금 유일한 방법임.",
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ],
  [-15]: [
    {
      alias: "을지로 황소 #05",
      content: "서비스 매출 $100B 달성 시점이 관건이라는 거 동의. 현재 런레이트 보면 2027년 안에 가능한 수치인데, 시장이 얼마나 선반영하느냐가 지금 $311 적정성 판단의 핵심임.",
      created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    },
    {
      alias: "잠실 매 #78",
      content: "App Store 통행료 논리가 에이전트 시대에 강화된다는 뷰 맞음. 다만 EU 규제 결정이 에이전트 매출화 전에 선행될 수 있어서 그 타이밍 체크가 리스크 포인트임.",
      created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
  ],
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
      content: "내부에서 추가 매수 의견 없다는 게 그대로 읽힘. 공식 리포트 목표주가 올리려면 성장 가속 확인이 먼저라는 거 맞음.",
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
