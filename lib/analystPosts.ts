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
  // ── 2026-07-23 신규 ──────────────────────────────────────────────────────
  {
    id: -422,
    alias: "여의도 매 #22",
    symbol: "TSLA",
    content:
      "Tesla Q2 실적이 매출 record · EPS 미스로 엇갈렸다. 매출 $28.24B(컨센 $27.60B 상회)로 분기 사상 최고를 찍었지만 EPS $2.34로 컨센 $2.50을 소폭 하회. Wall St Engine 기준 영업현금흐름 TTM $18.66B는 전기간 최고. 매출 record와 EPS 미스가 동시에 나온 배경엔 인도 mix 저마진 이동(로보택시 파일럿·Cybercab 초기·Model Y Standard)과 캐파 확장에 따른 감가상각 부담이 있다. 콜의 마진 가이던스와 Robotaxi/Optimus 로드맵 코멘트에서 실 방향이 결정된다. 매수 유지.",
    likes: 79,
    comments: 5,
    created_at: "2026-07-23T00:05:00.000Z",
    liked: false,
  },
  {
    id: -423,
    alias: "강남 표범 #46",
    symbol: "TSLA",
    content:
      "Q2 주주 업데이트는 다축 로드맵의 병렬 진전을 확인시켰다. Cybercab 파일럿(기가팩토리 텍사스), Semi 자율주행 도로 테스트 개시, Tampa 로보택시 24시간 상시 운영, 배터리 셀 캐파 확장(4680 중심), Optimus Gen 3 라인 준비까지. 각 축이 하나만으로도 뉴스급인데 실적과 같은 창에 정리돼 나온 건 실적 미스 프레임을 상쇄하려는 커뮤니케이션 전략 + 실제 상용화 병행 신호로 해석. 매수 유지.",
    likes: 44,
    comments: 4,
    created_at: "2026-07-23T00:12:00.000Z",
    liked: false,
  },
  {
    id: -424,
    alias: "서초 콘도르 #59",
    symbol: "TSLA",
    content:
      "FSD 유료 구독자 148만·누적 자율주행 80억 마일이 동시에 확인된 게 오늘의 조용한 하이라이트. 스톡(누적)과 플로(신규 부착 55%) 모두 강한 상태라 반복 매출 축이 실체를 갖는다. Cantor $510 재확인 프레임에서 이 데이터가 상방 논거를 지지. 정량 안전 지표는 안전 리포트 대기.",
    likes: 32,
    comments: 3,
    created_at: "2026-07-23T00:19:00.000Z",
    liked: false,
  },
  {
    id: -425,
    alias: "을지로 팔콘 #71",
    symbol: "TSLA",
    content:
      "분기 신규 인도 55%가 FSD 구독. 자동차 회사가 SaaS성 매출 스트림을 갖는 구조가 정량화됐다. Natick Mall 배너·v14 Lite 확산·로보택시 오픈이 시너지로 반영된 결과일 가능성. 지역별 부착률 격차와 EU 승인(10월 TCMV 투표) 후 유럽 확산 속도가 다음 검증 축.",
    likes: 26,
    comments: 3,
    created_at: "2026-07-23T00:26:00.000Z",
    liked: false,
  },
  {
    id: -426,
    alias: "광화문 늑대 #33",
    symbol: "TSLA",
    content:
      "Tampa 24시간 상시 로보택시 운영이 개시됐다. 24/7이 특별한 이유는 가동률이 로보택시 유닛 이코노믹스를 결정하기 때문. 현장 지원 스태프 상주는 완전 무인은 아니지만 실제 운영 인프라가 마련됐다는 실행 신호. 시간대별 이용률·대당 매출·개입률 데이터가 다음 관찰 축. 매수 유지.",
    likes: 41,
    comments: 4,
    created_at: "2026-07-23T00:33:00.000Z",
    liked: false,
  },
  {
    id: -427,
    alias: "마포 올빼미 #24",
    symbol: "TSLA",
    content:
      "Zach의 FSD v14.5.3 HW3 리뷰가 정성적 근거를 추가했다. 하이웨이 감속·차선 변경 자연스러움, 뉴욕 시가지에서 사실상 완전자율에 가까운 주행, 파킹 큰 개선 등. 개인 후기 한계는 있지만 400만 HW3 wide release 스토리(Ashok Elluswamy)의 정성적 지지가 계속 쌓임. 안전 리포트의 정량 지표가 최종 검증. 매수 유지.",
    likes: 10,
    comments: 3,
    created_at: "2026-07-23T00:40:00.000Z",
    liked: false,
  },
  {
    id: -428,
    alias: "판교 사자 #62",
    symbol: "TSLA",
    content:
      "총 제조 캐파 +105,000 확장이 자동차·에너지·로보틱스에 걸쳐 발표됐다. Nevada Semi 라인, Texas 다품종 라인, New York 부품 라인 등 다지역 병행. 어제 Giga Berlin 셀 18 GWh 확장과 결합. 매출 상한이 다시 올라간 그림이지만 감가상각·CAPEX 부담이 이익에 반영되는 국면과 시간축이 겹친다. Q2 EPS 미스 배경 중 하나로 볼 여지. 매수 유지.",
    likes: 28,
    comments: 3,
    created_at: "2026-07-23T00:47:00.000Z",
    liked: false,
  },
  {
    id: -429,
    alias: "잠실 여우 #18",
    symbol: "TSLA",
    content:
      "Tesla Megapack이 벨기에 BSTOR SA/NV 대형 저장 프로젝트 공급자로 지정, €450M 파이낸싱 확보. 105 MW / 456 MWh × 4 프로젝트 규모. Green Sun 브랜드로 유럽 6개국 확장. Q2 Energy 배치 21 GWh와 결합하면 Energy 부문 유럽 재확장 국면 확실. Megapack 마진 프로파일이 자동차 대비 우호적. 매수 유지.",
    likes: 37,
    comments: 3,
    created_at: "2026-07-23T00:54:00.000Z",
    liked: false,
  },
  {
    id: -430,
    alias: "역삼 독수리 #55",
    symbol: "TSLA",
    content:
      "Cybercab 정식 런치가 9월경으로 준비 중임이 Q2 주주 업데이트에서 확인. 기가팩토리 텍사스 파일럿 진행 중이며 4680 셀 공급 축 담당. 파일럿 → 정식 런치는 상용 로보택시 유닛 이코노믹스 첫 실증 관문. 정확한 런치일·초도 배치 지역·규제 승인·4680 캐파 확장 진척이 다음 트리거. 매수 유지.",
    likes: 43,
    comments: 4,
    created_at: "2026-07-23T00:61:00.000Z",
    liked: false,
  },
  {
    id: -431,
    alias: "청담 매 #77",
    symbol: "GOOGL",
    content:
      "Alphabet Q3 매출 $118.7B(컨센 $116.86B 상회) · EPS $2.94(컨센 $2.91 상회) 동시 비트. Cloud +33% · Search +17% · 광고 견조. 어제 MSFT '가장 안전한 mega-cap' 프레임과 GOOGL 프리미엄 밸류에이션 정당성 논쟁이 오늘 클라우드 33% 유지로 답을 얻었다. 매수 유지. AI CAPEX 가이던스·Gemini Enterprise 매출 세부 공개가 다음 검증 축.",
    likes: 68,
    comments: 5,
    created_at: "2026-07-23T00:68:00.000Z",
    liked: false,
  },
  {
    id: -432,
    alias: "압구정 콘도르 #40",
    symbol: "GOOGL",
    content:
      "Sundar Pichai 콜 언급: Gemini가 주간 220억 토큰 처리(지난 분기 대비 2배+), Fortune 500의 90%가 Gemini Enterprise 사용, 개발자 400만+·950M 사용자 규모. 토큰 처리량과 엔터프라이즈 침투가 GCP Cloud 매출(33% 성장)로 전환되는 파이프라인 실측. 어제 MSFT × Kimi K2 스토리와 결합하면 (1)OpenAI/Anthropic (2)Gemini (3)중국 오픈모델 삼각 경쟁 구도 재확인. 매수 유지.",
    likes: 32,
    comments: 3,
    created_at: "2026-07-23T00:75:00.000Z",
    liked: false,
  },
  {
    id: -433,
    alias: "삼성동 표범 #21",
    symbol: "GOOGL",
    content:
      "Google CAPEX가 지난 2년간 거의 3배 급증(Investing visuals 정리). 데이터센터·GPU/TPU·냉각·전력 인프라에 집중된 지출. Q3 매출·EPS 동시 비트가 유지된 건 클라우드 33% 성장이 감가상각 부담을 흡수하고 있음을 시사. 하이퍼스케일러 자본 집중이 소수 대기업 편중 구조를 심화. 매수 유지.",
    likes: 21,
    comments: 3,
    created_at: "2026-07-23T00:82:00.000Z",
    liked: false,
  },
  {
    id: -434,
    alias: "논현 늑대 #85",
    symbol: "SPCX",
    content:
      "Google Q3 공시에서 SpaceX(SPCX) 지분 미실현 이익 $9.8B 공개(Dan D). SPCX 상장 이후 첫 정식 마킹 성격. META·AMZN 등 유사 대형 지분 보유자의 재평가 이벤트가 순차적으로 실적에 반영될 가능성. 회계 처리(P&L vs OCI)에 따라 실적 지표 영향 방식 다름. 관심 확대.",
    likes: 51,
    comments: 4,
    created_at: "2026-07-23T00:89:00.000Z",
    liked: false,
  },
  {
    id: -435,
    alias: "이촌 황소 #93",
    symbol: "SPCX",
    content:
      "SpaceX가 텍사스 대형 데이터센터 신설 검토라는 보도(Kelvishalik). BlackRock CEO Larry Fink '컴퓨트가 새 선물시장' 프레임과 결합되면 SPCX 자체 컴퓨트 인프라 확장 스토리로 확대. 발사·Starlink·자체 컴퓨트 3축 확장 시 밸류에이션 프레임 자체가 넓어진다. 어제 개인 매수 중단 흐름(Barchart) 반전 트리거 될 수도. 실 계약 확정까지 관망.",
    likes: 45,
    comments: 3,
    created_at: "2026-07-23T00:96:00.000Z",
    liked: false,
  },
  {
    id: -436,
    alias: "성수 매 #48",
    symbol: "NVDA",
    content:
      "젠슨 황이 미국 기업의 중국 오픈소스 AI 모델 접근권을 옹호. 논거는 접근 제한시 workforce 유출·리딩 사고 확산에서 밀린다는 것. NVDA에겐 (1)GPU 신규 수요 (2)CUDA 잠금 확장 (3)H20 등 중국 대응 제품 규제 완화 명분 강화 세 축의 이해. 어제 MSFT × Kimi K2 스토리와 결합해 서구 Big Tech의 중국 오픈모델 채택이 하나의 흐름으로 굳어짐. 미국 정책 반응 관찰. 매수 유지.",
    likes: 38,
    comments: 4,
    created_at: "2026-07-23T00:103:00.000Z",
    liked: false,
  },
  {
    id: -437,
    alias: "한남 여우 #64",
    symbol: "SPX",
    content:
      "The Kobeissi Letter 정리 컨센: Q1 2026 S&P 500 EPS 성장의 65%가 Big Tech·25%가 반도체에서 발생 예상. 두 섹터 합해 90% 근처. 지수 리더십이 소수 종목에 집중된 국면에서는 (1)개별 종목 리스크, (2)밸류에이션 집중 리스크 확대. 어제 마진 부채 $1.5T ATH·Forward P/E 20 재돌파·1800년대 이후 최고 밸류 프레임과 결합해 하방 리스크 무게. 다만 GOOGL Q3 비트로 실행력 확인된 건 반대편 근거. 리스크 관리 강화.",
    likes: 29,
    comments: 3,
    created_at: "2026-07-23T00:110:00.000Z",
    liked: false,
  },

  // ── 2026-07-22 신규 ──────────────────────────────────────────────────────
  {
    id: -406,
    alias: "여의도 매 #15",
    symbol: "TSLA",
    content:
      "TSLA Q2 2026 어닝은 수요일 장 마감 후. 인도 480,126대(record, +25% YoY)와 Energy 21GWh는 이미 알려진 팩트라 콜의 관심은 이번엔 Robotaxi 가이던스 세번 연속 후퇴(US 50% 커버리지 → 7 metros)를 어떻게 정리하느냐다. Robinhood 리테일 질문 7개(14.5M shares) 중 4개가 Robotaxi/Cybercab, 최대 무게가 실린 두 질문이 Robotaxi 확장 제약(5.4M shares)과 Optimus Gen 3 ramp(5.3M shares). 지난 48시간이 Tampa/Orlando 오픈·Bay Area SF/Q·Cybercab Starlink V3·FSD v14 Lite HW3로 답 일부 제공했으므로 콜에서는 그 이상의 신호가 필요. 실적보다 로드맵 확정 여부가 방향 결정. 매수 유지, 사이즈는 신중히.",
    likes: 66,
    comments: 5,
    created_at: "2026-07-22T00:05:00.000Z",
    liked: false,
  },
  {
    id: -407,
    alias: "강남 표범 #37",
    symbol: "TSLA",
    content:
      "Robotaxi 서비스가 7개 도시로 확대: Orlando/Miami/Tampa/Dallas는 신규 Unsupervised Model Y, Austin은 Supervised, SF/Bay는 safety monitor 병행. 상반기 계획 7개 중 5개 live · Phoenix·Vegas만 남음. Unsupervised와 safety-monitor 병행은 안전 심사 프레임과 시장 확장 프레임 사이 밸런스 반영. 도시별 승차 데이터·개입률·사고율 지표가 다음 검증 축. 매수 유지.",
    likes: 43,
    comments: 4,
    created_at: "2026-07-22T00:12:00.000Z",
    liked: false,
  },
  {
    id: -408,
    alias: "서초 콘도르 #82",
    symbol: "TSLA",
    content:
      "Sawyer Merritt: Tampa, Florida 첫 Unsupervised Model Y robotaxi 주행 시작. 텍사스 밖 첫 unsupervised 확장 사례라 규제 반응·소비자 피드백이 다음 도시 진입의 벤치마크. 첫 성공 이후 18일 만의 확장 속도가 실행 신뢰의 정량 신호. 매수 유지.",
    likes: 27,
    comments: 3,
    created_at: "2026-07-22T00:19:00.000Z",
    liked: false,
  },
  {
    id: -409,
    alias: "을지로 팔콘 #56",
    symbol: "TSLA",
    content:
      "The Tesla Newswire: 2026 Summer Update(likely 2026.30)이 곧 롤아웃. More Grok Commands(통화·음악·climate·글로브박스·차량 Q&A), Self-Driving Stats in Mobile App(사용률/streak 조회·공유), Carwalk with Scoring, Automatic Navigation(루틴 학습·자동 제안), Preferred Routes, Rear Display Lock 외 다수. 소프트웨어 정의 차량 UX의 스텝 체인지. Self-Driving Stats/Streak 소셜화, Grok 명령 확장, 개인화 네비게이션이 사용률·구독 유지·데이터 재활용 축. 매수 유지.",
    likes: 71,
    comments: 4,
    created_at: "2026-07-22T00:26:00.000Z",
    liked: false,
  },
  {
    id: -410,
    alias: "광화문 늑대 #23",
    symbol: "TSLA",
    content:
      "FSD(Supervised) 유럽 승인 투표가 10월 8~9일 TCMV(Technical Committee - Motor Vehicles) 회의에서 예정. 통과시(qualified majority) 유럽위원회가 네덜란드 인가청에 EU 전역 유효한 type approval 부여. EU 전역 프리미엄 마진 활성화의 결정적 게이트. 벨기에·네덜란드·독일 이전 승인 로드맵이 이 투표에서 통합. 기다림의 옵션 가치 상승. 매수 유지.",
    likes: 55,
    comments: 3,
    created_at: "2026-07-22T00:33:00.000Z",
    liked: false,
  },
  {
    id: -411,
    alias: "마포 올빼미 #48",
    symbol: "TSLA",
    content:
      "Cantor Fitzgerald가 Q2 앞두고 TSLA Overweight·$510 목표가 재확인. \"상용화 후 Tesla가 robotaxi 사업을 빠르게 확장, 지연에도 상당한 시장 점유 확보 가능\"이라는 프레임. 어닝 앞 등급 재확인은 애널리스트 기대치 앵커. 콜의 상용 로드맵 코멘트가 재확인 vs 후퇴의 검증 축. 매수 유지.",
    likes: 25,
    comments: 3,
    created_at: "2026-07-22T00:40:00.000Z",
    liked: false,
  },
  {
    id: -412,
    alias: "판교 사자 #71",
    symbol: "TSLA",
    content:
      "Sawyer Merritt: xAI(Grok)가 곧 인도, 태국, 싱가폴, 필리핀, 말레이시아 Tesla 차량에 런칭. 2026.30 Summer Update의 More Grok Commands 확장과 결합되면 아시아 신흥국 데이터 파이프라인·구독 유입 축 확대. 언어·문화 대응이 초기 채택률 결정. 관심 확대.",
    likes: 22,
    comments: 3,
    created_at: "2026-07-22T00:47:00.000Z",
    liked: false,
  },
  {
    id: -413,
    alias: "잠실 여우 #64",
    symbol: "NVDA",
    content:
      "unusual_whales(per YF): NVIDIA가 차세대 Vera Rubin AI 컴퓨팅 시스템의 full production에 공식 진입. Jensen이 Vera Rubin 프로세서가 AMD Turin보다 빠르다고 직접 비교했고 주요 고객들이 이미 테스트 중. 데이터센터 채택 근거 강화. Rubin GPU + Vera CPU 결합의 CoWoS·HBM 밸류체인(SK하이닉스·삼성·MU) 파급 크다. Foxconn Dojo 계약과 별도로 NVDA 자체 이닝 강화. 매수 유지.",
    likes: 57,
    comments: 4,
    created_at: "2026-07-22T00:54:00.000Z",
    liked: false,
  },
  {
    id: -414,
    alias: "역삼 독수리 #29",
    symbol: "NVDA",
    content:
      "Leopold Stock Tracker: NVDA가 Nebius Group $NBIS 22.2M 주(회사 ~10%) 지분 공개. Nebius는 AI 인프라·데이터센터 회사. NVDA의 인프라 파트너 지분 축적 = 수요 락인·GPU 배포 우선순위 확보 전략의 연장선. NBIS 밸류에이션·CAPEX 계획 변화 관찰. Vera Rubin 정식 양산과 결합하면 채택 파이프라인 두 축(자체 시스템 + 파트너 지분) 확보. 매수 유지.",
    likes: 36,
    comments: 3,
    created_at: "2026-07-22T00:61:00.000Z",
    liked: false,
  },
  {
    id: -415,
    alias: "청담 매 #43",
    symbol: "MU",
    content:
      "Shay Boloor: BofA가 MU를 'best investment ideas' 목록에 추가하며 중국 AI 모델들이 HBM 부족을 확대한다고 언급. Kimi K2의 인스턴스당 ~1.4TB HBM 사용이 Micron의 장기 전망을 강화한다는 논리. 어제 리포트한 MSFT × Kimi K2 Copilot 평가 스토리와 결합 = 중국 오픈모델의 HBM 수요 서사 이중 강화. HBM 3사(SK하이닉스·삼성·MU) 마진·CAPEX 흐름 트래킹 축. 매수.",
    likes: 40,
    comments: 4,
    created_at: "2026-07-22T00:68:00.000Z",
    liked: false,
  },
  {
    id: -416,
    alias: "압구정 콘도르 #16",
    symbol: "MSFT",
    content:
      "Ogus Ekan: \"$MSFT는 지금 가장 안전한 mega-cap 픽\". 사실상 모두가 모델 사업에서 경쟁하는데 이는 수년간 black hole로 남고, MSFT의 컴퓨트는 대부분 training/inference 워크로드로 고객에게 팔려 day 1부터 마진 확보. GOOGL 대비 저평가(5% earnings 프리미엄 vs 27%). FCF Projection 2026–2030 시각화가 근거. Azure/OpenAI 지분 재평가·Copilot ARR·Kimi K2 실 채택이 검증 축. 매수 유지.",
    likes: 30,
    comments: 3,
    created_at: "2026-07-22T00:75:00.000Z",
    liked: false,
  },
  {
    id: -417,
    alias: "삼성동 표범 #52",
    symbol: "GOOGL",
    content:
      "GOOGL Q3 어닝 내일. Net revenue $118B(+21.3%), EPS $2.91(+25.5%) 예상. Cloud 성장·YouTube 광고·Search 매출·AI capex outlook이 주요 관전. MSFT '가장 안전한 mega-cap' 프레임과 병렬 비교. Cloud 성장률이 YoY 20%대를 유지하는지가 GOOGL 프리미엄 정당화 지표. AI capex outlook 코멘트가 하이퍼스케일러 지출 사이클 방향타. 관심.",
    likes: 20,
    comments: 4,
    created_at: "2026-07-22T00:82:00.000Z",
    liked: false,
  },
  {
    id: -418,
    alias: "논현 늑대 #38",
    symbol: "BLK",
    content:
      "Ark Invest Tracker: BlackRock CEO Larry Fink가 컴퓨트가 새로운 선물시장이 될 수 있다며 이것이 금융의 차기 혁명이라 발언. 컴퓨트 수요 > 공급 지속. 미국 자본시장이 이 시프트를 이끌 기술을 자금 조달할 수 있음. 별개로 컴퓨트가 여전히 비싸며 하이퍼스케일러들이 얼마나 빨리 원가를 낮출 수 있는지가 진짜 핵심. BLK 컴퓨트 인프라 펀드·데이터센터 크레딧 프로덕트 확대의 배경 프레임. 관심 확대.",
    likes: 17,
    comments: 3,
    created_at: "2026-07-22T00:89:00.000Z",
    liked: false,
  },
  {
    id: -419,
    alias: "이촌 황소 #85",
    symbol: "SPCX",
    content:
      "DogeDesigner: 싱가폴 SGX가 7월 22일부터 SpaceX 예치증권(DR) 상장 시작. 싱가폴 달러 거래, 현지 시간 매매. 미국 시간 외 SPCX 익스포저 채널 신설로 아시아 유동성 유입 축 다각화. DR 구조·초기 거래량·NAV 대비 프리미엄/discount 형성이 초기 관찰 지표. 어제 리포트한 개인 매수 중단 흐름의 카운터 효과 가능. 관심.",
    likes: 42,
    comments: 3,
    created_at: "2026-07-22T00:96:00.000Z",
    liked: false,
  },
  {
    id: -420,
    alias: "성수 매 #24",
    symbol: "SPCX",
    content:
      "Barchart: 개인 투자자들이 SpaceX $SPCX 매수를 멈췄다. 어제 리포트한 월 $320M 유입 개별종목 1위였던 흐름이 하루 만에 반전. Whale Insider: SPCX가 7일 연속 하락 후 -7%로 회복 언급. 실적(8/4)·Starship Flight 13 이벤트 앞두고 관망 심리. SGX DR 상장이 지역 다변화로 새 유동성 유입 만들지 여부가 상쇄 지표. 관망.",
    likes: 33,
    comments: 4,
    created_at: "2026-07-22T00:103:00.000Z",
    liked: false,
  },
  {
    id: -421,
    alias: "한남 여우 #67",
    symbol: "SPX",
    content:
      "Kalshi: 총 마진 부채가 $1.5T로 사상 최고 도달. AI/성장주 랠리와 결합된 개인 레버리지 확대 사이클. 상승 사이클에서는 가속 요인, 조정 국면에서는 강제 청산·헤지 언와인드 리스크. Kalshi 예측시장 이벤트 확률 프레임과 결합해 리스크 예산 재점검이 정공법. 리스크 관리 강화.",
    likes: 28,
    comments: 3,
    created_at: "2026-07-22T00:110:00.000Z",
    liked: false,
  },

  // ── 2026-07-21 신규 ──────────────────────────────────────────────────────
  {
    id: -389,
    alias: "여의도 매 #08",
    symbol: "TSLA",
    content:
      "FSD v14 Lite의 진짜 뉴스는 400만대 규모의 HW3 wide release다. Ashok Elluswamy VP AI가 직접 확인, AI distillation 방식으로 HW4 V14의 주행을 HW3에 이식, 2025 초 이후 첫 major FSD upgrade. 3개가 겹친다. 오래된 차량의 소프트웨어 재활성화는 구독 매출·데이터 회수·이탈 방어를 동시에 건드리는 카드. 여전히 supervised라는 조건은 유지되지만 UX 레벨의 격상은 확실. 매수 유지.",
    likes: 51,
    comments: 4,
    created_at: "2026-07-21T00:05:00.000Z",
    liked: false,
  },
  {
    id: -390,
    alias: "강남 표범 #29",
    symbol: "TSLA",
    content:
      "중국 자율차 인플루언서 2명이 LA에서 FSD v14.3.4 테스트 후 태도 전환. Huawei ADS·XPeng VLA·Li Auto ADIC 최고라 믿었다가 광범위 테스트 후 '중국 시스템에 개선 여지 있음'을 인정. Ray Q가 'FSD가 중국 모든 자율차 시스템의 벤치마크'라고 정리. 이건 중국 승인 서사(Apple Intelligence 유형 리레이팅)와 결합될 때 매출 옵션이 실제로 확장되는 각도. 확정 촉매 아니므로 정책·규제 흐름 병행 관찰. 매수.",
    likes: 23,
    comments: 5,
    created_at: "2026-07-21T00:12:00.000Z",
    liked: false,
  },
  {
    id: -391,
    alias: "서초 콘도르 #61",
    symbol: "TSLA",
    content:
      "Zach의 v14 Lite 100마일 실주행 후기: UI 개선, 브레이크 없이 auto change로 Start Self-Driving 진입, blue arrow tap parking, Self Driving App(사용률/streak) 추가. 도시·스쿨존 개입 0회 언급. 개인 후기이므로 정량 안전 지표는 별도 검증 필요하지만 UX 완성도의 스텝 체인지 신호. Streak/사용률 데이터는 심리적 이탈방어 카드. 매수 유지.",
    likes: 8,
    comments: 3,
    created_at: "2026-07-21T00:19:00.000Z",
    liked: false,
  },
  {
    id: -392,
    alias: "을지로 팔콘 #92",
    symbol: "TSLA",
    content:
      "Natick Mall(뉴잉글랜드 최대 쇼핑센터 1.6M sqft)에 Tesla가 FSD 대형 배너 신규 게시. '커피값보다 저렴 · Tesla 매장 1층 북쪽에서 FSD 체험' 카피. 오프라인 대중 소비자 접점을 처음 전면 확장한 마케팅이라는 게 포인트. 실효성은 FSD 구독 전환율 데이터가 검증 축. 관심 확대.",
    likes: 19,
    comments: 3,
    created_at: "2026-07-21T00:26:00.000Z",
    liked: false,
  },
  {
    id: -393,
    alias: "광화문 늑대 #45",
    symbol: "TSLA",
    content:
      "Nic Cruz Patane가 Cybercab에 Starlink가 프레임 자체에 통합된 것을 확인. 별도 애프터마켓 모듈이 아니라 차체 구조에 내장. SPCX 인프라를 TSLA 하드웨어에 물리적으로 결합한 첫 명확한 증거로 볼 수 있다. 주행 데이터 오프로드·V2X·원격 fleet 명령 채널의 안정성 확보는 상용 로보택시의 필수 조건. 매수 유지.",
    likes: 42,
    comments: 4,
    created_at: "2026-07-21T00:33:00.000Z",
    liked: false,
  },
  {
    id: -394,
    alias: "마포 올빼미 #17",
    symbol: "TSLA",
    content:
      "오스틴 두번째 lot에서 Cybercab 14대 이상 + camera washer 장착 validation Model Y 비슷한 수 목격(TeslaJoe·Spencer). 첫 lot 이후 두번째 배치 실측이라 야드가 확장 운영 중임을 의미. validation Model Y의 병행 존재는 FSD 로보택시 이원 플릿 시나리오(Cybercab + Model Y)를 시사. 대량 인도·안전 심사 흐름이 다음 트리거. 매수 유지.",
    likes: 30,
    comments: 3,
    created_at: "2026-07-21T00:40:00.000Z",
    liked: false,
  },
  {
    id: -395,
    alias: "판교 사자 #73",
    symbol: "TSLA",
    content:
      "Giga Berlin FY2025 Management Report가 배터리 셀 캐파를 최대 8 GWh/년에서 18 GWh로 재상향, 총 셀 투자 ~$1.4B USD 확인. Q3 2026부터 주간 7,000대(+30%) 확장, 신규 일자리 5,000개, 연간 40,000대 추가. Q3 2026 vehicle sales + energy 사상 최고 예상 언급. 원가(셀 in-house)·캐파·매출 삼각의 유의미한 상향. 매수.",
    likes: 67,
    comments: 5,
    created_at: "2026-07-21T00:47:00.000Z",
    liked: false,
  },
  {
    id: -396,
    alias: "잠실 여우 #34",
    symbol: "TSLA",
    content:
      "Model Y Standard가 Giga Berlin에서 €40,000으로 출시, Premium 대비 €10,000 저렴. ICCT/Fraunhofer ISI(Reuters 7/18): 독일 비교 EV 가격 −18%(2020~인플레 조정), 내연차 +27%, 그러나 EV 중앙값 €53,000(+42%). 대부분 브랜드가 프리미엄으로 밀어붙일 때 저가로 들어가는 전략. 유럽 판매 회복·MoM 등록 데이터가 실효 검증 축. 매수.",
    likes: 16,
    comments: 3,
    created_at: "2026-07-21T00:54:00.000Z",
    liked: false,
  },
  {
    id: -397,
    alias: "역삼 독수리 #58",
    symbol: "SPCX",
    content:
      "Starlink가 이탈리아 고속철 26대(Siemens Velaro MS, Germany 확장용)에 제조 단계부터 통합, 계약 총액 €3B, 2027 완공. 이탈리아 기존 fleet도 2027까지 리트로핏. B2G·대중교통 인프라 채택 사례 확장이라 통신사(B2B)를 넘어선 매출축 다각화. 다른 EU 국가·오퍼레이터로 확산 여부가 후속 트리거. 관심 유지.",
    likes: 25,
    comments: 3,
    created_at: "2026-07-21T01:01:00.000Z",
    liked: false,
  },
  {
    id: -398,
    alias: "청담 매 #47",
    symbol: "SPCX",
    content:
      "Shay Boloor: Foxconn이 SPCX 차세대 Dojo QN300 시스템 제조 계약 $50B으로 $500B/$200B AI 서버 oligopoly에 첫 진입. 다만 Dojo는 통상 Tesla 브랜드로 알려져 있어 스크린샷의 SPCX 표기 부분은 별도 팩트체크 필요하다는 점 반드시 기록. 계약 규모 자체는 결정적이므로 실 계약·양산 스케줄 확정 시 SPCX/Foxconn 재추정. 관망.",
    likes: 78,
    comments: 5,
    created_at: "2026-07-21T01:08:00.000Z",
    liked: false,
  },
  {
    id: -399,
    alias: "압구정 콘도르 #82",
    symbol: "SPCX",
    content:
      "SPCX Q2 2026 결과 발표 8월 4일 · 3:30 p.m. CT audio webcast (SpaceX 투자자 사이트 + X 라이브). 같은 8월 4일 이전 Starship Flight Test 13 발사 확률 Polymarket 기준 88%(Ark Invest Tracker). 실적과 발사가 같은 창에 겹치는 이벤트 밀도. 어제 리포트한 -44%·숏 $6.1B 프레임과 결합하면 결과/발사 성패가 리스크 균형점 재조정. 관망 유지.",
    likes: 59,
    comments: 4,
    created_at: "2026-07-21T01:15:00.000Z",
    liked: false,
  },
  {
    id: -400,
    alias: "삼성동 표범 #19",
    symbol: "SPCX",
    content:
      "Barchart: 이번 달 개인 자금 SPCX 유입 $320M, 개별종목 압도적 1위. Quiver: Rep. William Timmons SPCX 최대 $250K 매수 신고. -44% 낙폭·숏 $6.1B 상황에도 개인·인사이더 관심 유지 = 감성 지표 강함. 실적(8/4)과 Flight 13이 실제 방향을 결정. 사이즈 신중히 매수.",
    likes: 44,
    comments: 4,
    created_at: "2026-07-21T01:22:00.000Z",
    liked: false,
  },
  {
    id: -405,
    alias: "여의도 늑대 #40",
    symbol: "TSLA",
    content:
      "Eva McMillan이 Ron Baron을 인용해 \"Optimus 덕분에 10년 내 주당 $10,000\"을 이야기했다. 원 트윗은 티커를 $SpaceX로 표기했지만 Optimus 자체가 Tesla 휴머노이드 프로그램이라 논거상 TSLA로 재분류하는 것이 옳다. Baron이 반복적으로 Tesla 상방 프레임에 Optimus를 앵커로 사용해온 히스토리와도 일치. 다만 확정 촉매가 아니라 장기 서사이므로 상용화 시점·양산·단위경제가 검증 축. 중장기 매수 프레임 유지.",
    likes: 33,
    comments: 4,
    created_at: "2026-07-21T01:57:00.000Z",
    liked: false,
  },
  {
    id: -401,
    alias: "논현 늑대 #26",
    symbol: "MSFT",
    content:
      "The Information: MSFT가 China's Kimi K2(Moonshot AI 오픈웨이트)를 Copilot용으로 Azure에 로드. 엔지니어들이 K2가 현재 OpenAI/Anthropic 모델을 대체할 수 있는지 평가할 예정. K2는 한국 코딩 리더보드 1위, Moonshot GPU 한계로 신규 구독 정지. Big Tech의 중국 오픈모델 채택 사례로 서구 프리미엄 프레임에 지속 압박. 실 채택·비용 절감 규모가 후속 검증. 매수 유지.",
    likes: 21,
    comments: 3,
    created_at: "2026-07-21T01:29:00.000Z",
    liked: false,
  },
  {
    id: -402,
    alias: "이촌 황소 #64",
    symbol: "NVDA",
    content:
      "NEX Shares: NVDA×MSFT AI-driven RAN(무선접속망) 프로젝트 공개, 2028 배포 목표. SW-defined 시스템 GPU 최적화 플랫폼 배포, 탄소 90%·지연 90% 절감, 네트워크 에지 AI 확장. 통신 인프라에 AI가 침투하는 대표 사례라 NVDA 데이터센터 외 매출축(통신사 CAPEX). 통신사 채택 로드맵·상용 배포 시점이 트리거. 매수 유지.",
    likes: 29,
    comments: 3,
    created_at: "2026-07-21T01:36:00.000Z",
    liked: false,
  },
  {
    id: -403,
    alias: "성수 매 #38",
    symbol: "GOOGL",
    content:
      "The Information: Google이 Gemini AI 모델의 청사진을 직접 통합한 새 서버 칩을 개발 중, 2028 배포 목표. TPU 라인업과 별개로 인퍼런스 원가 구조 자체를 재설계하는 시도. NVDA 의존도 감소 옵션 vs 자체 R&D 부담 트레이드오프. Big Tech in-house 실리콘 강화 흐름의 하나. 매수 유지, 채용/특허/서비스 원가 지표 확인.",
    likes: 14,
    comments: 3,
    created_at: "2026-07-21T01:43:00.000Z",
    liked: false,
  },
  {
    id: -404,
    alias: "한남 여우 #71",
    symbol: "SPX",
    content:
      "Bull Theory가 Stanford 2026 AI Index를 재해석: 미국 민간 AI 투자 2025 $265.5B vs 중국 $12.4B, 표면 23배. 그러나 중국 $12.4B는 민간만 포함, 2000년 이후 국가주도 자금 추정 $184B 제외. Société Générale은 이를 반영시 격차 약 1.4배. 미국 측은 신규 자금 조달 AI 기업 −21.3%지만 $1B+ 메가 라운드 11→28, 평균 딜 +65%($95.5M), Google 단독 인프라 $150B+. AI 리더십은 표면 숫자로 판단 금지, 자본 집중은 소수 하이퍼스케일러(GOOGL/MSFT/META/AMZN)에 응집 중.",
    likes: 32,
    comments: 4,
    created_at: "2026-07-21T01:50:00.000Z",
    liked: false,
  },

  // ── 2026-07-20 신규 ──────────────────────────────────────────────────────
  {
    id: -374,
    alias: "여의도 매 #55",
    symbol: "TSLA",
    content:
      "기가 텍사스 240 Cybertruck 라인업 · 기가 텍사스 200+ Cybercab · 기가 오스틴 250 Cybercab 실측. 스틸/드론샷은 강한 시각적 근거지만 최종 지표는 등록/인도다. 양산 근접 시그널은 확실히 강해졌다. 매수 유지.",
    likes: 2,
    comments: 5,
    created_at: "2026-07-20T00:05:00.000Z",
    liked: false,
  },
  {
    id: -375,
    alias: "강남 표범 #33",
    symbol: "TSLA",
    content:
      "스티어링휠 없는 Cybercab이 캘리포니아 도착. 규제 프리뷰 성격의 실도로 노출로 볼 수 있다. San Bernardino 지역 반응·안전 심사 흐름이 향후 상용 개시 시점의 결정 트리거. 옵션 가치 상승.",
    likes: 19,
    comments: 4,
    created_at: "2026-07-20T00:12:00.000Z",
    liked: false,
  },
  {
    id: -376,
    alias: "서초 콘도르 #77",
    symbol: "TSLA",
    content:
      "Robotaxi 트래킹 사이트 기준 총 770대. 하루 3대씩만 늘어도 곡선은 우상향. 대당 매출·유지비·가동률 프레임과 결합해야 진짜 정량 지표가 된다. 사이즈는 신중히 유지.",
    likes: 16,
    comments: 3,
    created_at: "2026-07-20T00:19:00.000Z",
    liked: false,
  },
  {
    id: -377,
    alias: "을지로 팔콘 #66",
    symbol: "TSLA",
    content:
      "노르웨이 신차 EV 98% · Model Y 5,686대 1위. 인센티브·충전·세제 결합의 결과인 만큼 다른 국가 확장 벤치마크로 활용. EU 확산 로드맵의 정량 앵커. 매수.",
    likes: 13,
    comments: 4,
    created_at: "2026-07-20T00:26:00.000Z",
    liked: false,
  },
  {
    id: -378,
    alias: "광화문 늑대 #23",
    symbol: "SPCX",
    content:
      "$225 → $153, IPO가 하회. 숏 비중 5% → 29%, 추정 $6.1B. 이건 위험 균형점 그 자체다. 스퀴즈 리스크와 실적 검증 사이 변동성 확대. 사이즈는 작게, 실적/일정 이벤트만 트래킹. 관망.",
    likes: 10,
    comments: 5,
    created_at: "2026-07-20T00:33:00.000Z",
    liked: false,
  },
  {
    id: -379,
    alias: "마포 올빼미 #41",
    symbol: "TSLA",
    content:
      "FSD 개인화 로드맵 예고. 개별 개입 기억 + 소유자 취향 매치. 만족도·이탈 방어 UX 카드로 유효. 다만 데이터 재활용·프라이버시 담론이 붙을 수 있어서 정책/약관 개정 흐름 병행 관찰. 매수 유지.",
    likes: 7,
    comments: 4,
    created_at: "2026-07-20T00:40:00.000Z",
    liked: false,
  },
  {
    id: -380,
    alias: "판교 사자 #14",
    symbol: "TSLA",
    content:
      "Nic Cruz Patane 인용 프레임: Tesla가 로봇+자율차를 같은 브레인으로 굴리는 유일 회사. Physical AI 서사가 밸류 확장 각도. 실제 로봇 상용 성과가 검증 지표라는 점만 놓치지 말자. 중장기 프레임 유효.",
    likes: 4,
    comments: 3,
    created_at: "2026-07-20T00:47:00.000Z",
    liked: false,
  },
  {
    id: -381,
    alias: "잠실 여우 #89",
    symbol: "BABA",
    content:
      "Alibaba Qwen 3.0 Max 프리뷰 공개. 중국 오픈모델의 성능·가격 압박이 서구 프리미엄 프레임에 지속 도전. BABA 클라우드 매출·API 채택 데이터와 결합해서 봐야 정확한 그림. 관심 확대.",
    likes: 1,
    comments: 4,
    created_at: "2026-07-20T00:54:00.000Z",
    liked: false,
  },
  {
    id: -382,
    alias: "역삼 독수리 #48",
    symbol: "META",
    content:
      "Truist가 Meta Plus 스택 2030 매출을 $20B/yr로 잡음. IG $10B, Meta AI $5.5B, FB $3.3B, WA $2B. 전체 매출의 ~5% 수준이라 아직 여지 있다. 채택률·ARPU가 재평가 트리거. 광고 외 서사 강화.",
    likes: 18,
    comments: 4,
    created_at: "2026-07-20T01:01:00.000Z",
    liked: false,
  },
  {
    id: -383,
    alias: "청담 매 #17",
    symbol: "SPX",
    content:
      "Barchart 프레임 — 미국 주식이 1800년대 이후 최고 밸류. 지수 산정·구성 변화 감안해도 극단 구간인 건 사실. 성장 서프라이즈만 유지되면 지탱, 실적 서프라이즈 실패 하나에 다중 압축 리스크. 리스크 관리 강화.",
    likes: 15,
    comments: 5,
    created_at: "2026-07-20T01:08:00.000Z",
    liked: false,
  },
  {
    id: -384,
    alias: "압구정 콘도르 #92",
    symbol: "SPX",
    content:
      "S&P 500 Forward P/E 20 재돌파. AI 프리미엄이 지탱하는 배수 확장이라 가이던스 하향 한 방에 배수 축소 리스크. 실적 시즌 지날 때까지 헤지·현금 비중 재점검이 정공법.",
    likes: 12,
    comments: 3,
    created_at: "2026-07-20T01:15:00.000Z",
    liked: false,
  },
  {
    id: -385,
    alias: "삼성동 표범 #61",
    symbol: "NVDA",
    content:
      "Jevons 역설 인용 — 저렴한 지능이 오히려 컴퓨트 수요를 폭발시킨다는 프레임. NVDA 방어 논거의 대표 서사. CUDA 잠금·CAPEX 흐름·데이터센터 발주 데이터가 실증 축. 매수 유지.",
    likes: 9,
    comments: 4,
    created_at: "2026-07-20T01:22:00.000Z",
    liked: false,
  },
  {
    id: -386,
    alias: "논현 늑대 #38",
    symbol: "GOOGL",
    content:
      "버핏이 Google을 오랜만에 본 좋은 사업이라고 이례적 강한 톤. 그 자체가 GOOGL 프레임에 무게. 다만 실제 지분 변경은 13F 확인 별도. 현재 검색/광고 구조 방어력 재평가 재료.",
    likes: 26,
    comments: 3,
    created_at: "2026-07-20T01:29:00.000Z",
    liked: false,
  },
  {
    id: -387,
    alias: "이촌 황소 #75",
    symbol: "SPX",
    content:
      "BofA 노트 — 여름 조정 후 연말 랠리 시나리오. 시나리오 노트라 확정 아니지만 포지션 사이즈·헤지 조정의 근거 프레임. 실적·유동성·지정학 변수가 결합 트리거. 리스크예산 재점검.",
    likes: 49,
    comments: 3,
    created_at: "2026-07-20T01:36:00.000Z",
    liked: false,
  },
  {
    id: -388,
    alias: "성수 매 #52",
    symbol: "TSLA",
    content:
      "Cybertruck 240·Cybercab 200/250·캘리 도착·Robotaxi 770·노르웨이 1위. 오늘 TSLA 관련 스토리가 밀집한 날. 개별로는 시각적/일회성이지만 결합하면 양산·전용 무인·플릿·EU 침투의 4각 서사. 매수 유지.",
    likes: 42,
    comments: 5,
    created_at: "2026-07-20T01:43:00.000Z",
    liked: false,
  },

  // ── 2026-07-18 신규 ──────────────────────────────────────────────────────
  {
    id: -358,
    alias: "여의도 매 #34",
    symbol: "TSLA",
    content:
      "FSD 12,002,485,572 마일이 오늘 실체가 됐다. Jun 8 11B → 이번주 12B, 하루 3천만 마일이 새로 쌓인다. 대규모 무감독 얘기를 붙일 정량 근거는 확보. 다만 개입률·사고율이 매치되어 나와야 서사가 완결된다. 매수 유지, 추적.",
    likes: 10,
    comments: 4,
    created_at: "2026-07-18T00:05:00.000Z",
    liked: false,
  },
  {
    id: -359,
    alias: "강남 표범 #52",
    symbol: "META",
    content:
      "왜 지금 메타가 Anthropic한테 $10B/2년 컴퓨트를 파는가. 이유는 두 개다 — CAPEX 사이클을 매출로 전환하고, AWS/Azure 사이 틈새로 진입한다. FCF 압박은 단기 리스크, 매출 다각화는 장기 알파. 프레임 리레이팅 감안해 매수 유지.",
    likes: 7,
    comments: 5,
    created_at: "2026-07-18T00:12:00.000Z",
    liked: false,
  },
  {
    id: -360,
    alias: "서초 콘도르 #67",
    symbol: "META",
    content:
      "Dave Brown 영입. AWS 20년차가 메타 DC 총괄로 온다는 건 실행력 확보다. 딜만 있고 조직이 부족했던 리스크를 사람 하나로 크게 줄인 그림. Anthropic 딜과 세트로 봐야 하고, 실제 DC 준공 로드맵이 다음 체크 포인트. 매수.",
    likes: 4,
    comments: 3,
    created_at: "2026-07-18T00:19:00.000Z",
    liked: false,
  },
  {
    id: -361,
    alias: "을지로 팔콘 #45",
    symbol: "AAPL",
    content:
      "AAPL $4.92T, NVDA $4.86T. 지수 위쪽 순위가 다시 바뀌었다. 어제 다뤘던 중국 Apple Intelligence 승인 재료가 리레이팅 축이라고 본다. 다만 아침 거래 스냅샷이라 지속성 확인 필요 — 마감 기준·기관 자금 흐름을 확인하면서 관망~매수.",
    likes: 21,
    comments: 5,
    created_at: "2026-07-18T00:26:00.000Z",
    liked: false,
  },
  {
    id: -362,
    alias: "광화문 늑대 #74",
    symbol: "SPCX",
    content:
      "국방부 DC 협상은 이번 사이클 최대 헤드라인 중 하나. WSJ 소스라 신뢰도 붙는다. sovereign AI 흐름의 국방 확장 시나리오가 실체가 되면 SPCX 밸류에이션 논거 자체가 바뀐다. 규모/SLA 확정 전까지는 뉴스 흐름 팔로우.",
    likes: 44,
    comments: 4,
    created_at: "2026-07-18T00:33:00.000Z",
    liked: false,
  },
  {
    id: -363,
    alias: "마포 올빼미 #91",
    symbol: "SPCX",
    content:
      "Starship이 NASA 달 pathway로 재선정. Artemis 지연 리스크가 재프레이밍되는 순간이다. Blue Origin 대비 재사용 경제성 우위가 다시 부각되고 정부 계약 명분도 강해진다. 계약 규모·일정 확인 뒤 사이즈 결정. 관심.",
    likes: 37,
    comments: 3,
    created_at: "2026-07-18T00:40:00.000Z",
    liked: false,
  },
  {
    id: -364,
    alias: "판교 사자 #26",
    symbol: "NVDA",
    content:
      "NVL72 Rubin 랙 24h 추론 평균 950 kW. 피크의 약 2/3. 이 숫자가 실 운영원가와 냉각 설비 규모를 결정한다. 지상 vs 위성 컴퓨트 비교의 앵커 지표가 되니 데이터센터·전력·냉각 밸류체인까지 같이 트래킹. 매수 유지.",
    likes: 30,
    comments: 4,
    created_at: "2026-07-18T00:47:00.000Z",
    liked: false,
  },
  {
    id: -365,
    alias: "잠실 여우 #58",
    symbol: "TSLA",
    content:
      "Cybercab 오스틴에서 injection molding Sr Supervisor 채용. 사출성형 라인 세팅 실체가 이번에 처음 잡혔다. 채용공고는 실행의 흔적이지 이벤트가 아니다. 실제 sample-line·SOP 목표가 다음 체크. 소량·장기 매수 프레임 유지.",
    likes: 23,
    comments: 5,
    created_at: "2026-07-18T00:54:00.000Z",
    liked: false,
  },
  {
    id: -366,
    alias: "역삼 독수리 #37",
    symbol: "TSLA",
    content:
      "독일 KBA 안전성 평가 진행 → 7월 독립테스트 → EU 표결 = 최종 관문. 벨기에·네덜란드 이후 정공법 로드맵이 명문화됐다. EU 표결이 프리미엄 마진 활성화의 진짜 트리거. 기다림의 옵션 가치는 상승. 매수 유지.",
    likes: 46,
    comments: 3,
    created_at: "2026-07-18T01:01:00.000Z",
    liked: false,
  },
  {
    id: -367,
    alias: "청담 매 #82",
    symbol: "TSLA",
    content:
      "라트비아 진출. 작은 시장이지만 정부 인센티브(€4k 신차·34% 활용), 충전소 +77%, 디젤 세금 인상까지 삼각 촉매. EU 전략의 한 조각이라 개별 시장 매출보다 지역 커버리지 확대의 시그널로 읽는다. 매수 유지.",
    likes: 39,
    comments: 3,
    created_at: "2026-07-18T01:08:00.000Z",
    liked: false,
  },
  {
    id: -368,
    alias: "압구정 콘도르 #29",
    symbol: "TSLA",
    content:
      "글로벌 EV 월 200만 대 최초. 유럽 테슬라 +37% YoY. 리프레시된 Model Y가 견인이고 이건 침투율 곡선 변곡점 시그널이다. 중국·미국 리테일이 뒤따라주면 컨센서스 상향 트리거. 매수.",
    likes: 32,
    comments: 4,
    created_at: "2026-07-18T01:15:00.000Z",
    liked: false,
  },
  {
    id: -369,
    alias: "삼성동 표범 #56",
    symbol: "NFLX",
    content:
      "Q2 매출 미스(YoY 23%)에 EPS 비트(YoY 11%). 사상 최대 자사주 $4.7B, 잔여 $21B. 광고형·게임즈 스택으로 미스를 상쇄하는 서사가 유효한지가 관건. 가이던스·광고 매출 성장률이 리레이팅 트리거. 관망.",
    likes: 84,
    comments: 4,
    created_at: "2026-07-18T01:22:00.000Z",
    liked: false,
  },
  {
    id: -370,
    alias: "논현 늑대 #77",
    symbol: "SOX",
    content:
      "SOX -15% (6월 ATH 대비). 베어(-20%) 문턱 근접. 개별 강세 vs 지수 약세 괴리가 점점 커지는 국면이다. AMD·NVDA 실적/가이던스가 리커버리 트리거. 신규 올인 금물, 분할·리스크예산 재설정.",
    likes: 66,
    comments: 3,
    created_at: "2026-07-18T01:29:00.000Z",
    liked: false,
  },
  {
    id: -371,
    alias: "이촌 황소 #43",
    symbol: "MSFT",
    content:
      "3년 안에 매출 ~4배 전망은 애널리스트 코멘트지 회사 가이던스 아니다. 그럼에도 런치·연결성·컴퓨트 3축이 동시에 굴러가는 건 사실. Azure/Copilot/게이밍 스택이 검증 축이고, 가이던스 확인 전엔 프레임만 보관. 매수 유지.",
    likes: 11,
    comments: 3,
    created_at: "2026-07-18T01:36:00.000Z",
    liked: false,
  },
  {
    id: -372,
    alias: "성수 매 #21",
    symbol: "TSLA",
    content:
      "Moritz 발언 프레임: MSFT IPO $400~600M 밸류에 대한 당시 회의론과 현재 TSLA/SPCX 밸류 회의론을 유비. 시간축 프레임이 편하지만 이걸로 CF·희석·거버넌스 정량 검증을 대체하지 말자. 결과론적 스토리텔링 경계. 중립.",
    likes: 8,
    comments: 4,
    created_at: "2026-07-18T01:43:00.000Z",
    liked: false,
  },
  {
    id: -373,
    alias: "한남 여우 #93",
    symbol: "CVX",
    content:
      "Chevron 이라크 유전 2개 진입 + 최대 유전 연구 + 인프라 구축 MOU. 트럼프-이라크 PM 회담 후 나온 딜이라 지정학 각도까지 결합. MOU 단계라 계약·생산량 확인 필요. 원유 스토리와 지정학이 겹치는 구간, 관망~매수.",
    likes: 5,
    comments: 3,
    created_at: "2026-07-18T01:50:00.000Z",
    liked: false,
  },

  // ── 2026-07-17 신규 ──────────────────────────────────────────────────────
  {
    id: -343,
    alias: "여의도 수리부엉이 #11",
    symbol: "TSLA",
    content:
      "텍사스 로보택시 플릿이 175까지 왔다. +58이 한 번에 찍힌 게 포인트고, Waymo 642 대비 절대량은 아직 작아도 기울기는 가팔라졌다. $10.5M 연 수익은 대당 $60k 가정 — 가동률 나오기 전엔 할인해서 보고, 플릿 확장 속도만 누적 매수 근거로 쓴다.",
    likes: 27,
    comments: 3,
    created_at: "2026-07-17T00:05:00.000Z",
    liked: false,
  },
  {
    id: -344,
    alias: "강남 표범 #28",
    symbol: "QQQ",
    content:
      "왜 지금 나스닥이 이렇게 흔들릴까? 답은 빈도다. 26거래일 중 20일이 ±1%. COVID·닷컴급 클러스터라는 말이 나와서, 방향 베팅보다 사이즈·헤지부터 재조정. 관망에 무게.",
    likes: 93,
    comments: 4,
    created_at: "2026-07-17T00:12:00.000Z",
    liked: false,
  },
  {
    id: -345,
    alias: "서초 황소 #41",
    symbol: "TSLA",
    content:
      "FSD 120억 마일 임박.\n— 글로벌 누적\n— 안전 페이지 인용\n데이터 루프는 확실한데 개입률·사고율이 같이 안 나오면 완전자율로 과대해석하지 말자. 잠정 긍정.",
    likes: 75,
    comments: 5,
    created_at: "2026-07-17T00:19:00.000Z",
    liked: false,
  },
  {
    id: -346,
    alias: "을지로 팔콘 #07",
    symbol: "TSLA",
    content:
      "Kalshi 69%. Tesla×SpaceX 2028 전 합병 확률. 예측시장이지 딜 공시가 아니다. 확률 출렁일 때마다 포지션 흔들 필요 없고, 공식 발표 전엔 시나리오 파일만 열어둔다. 중립.",
    likes: 6,
    comments: 3,
    created_at: "2026-07-17T00:26:00.000Z",
    liked: false,
  },
  {
    id: -347,
    alias: "광화문 늑대 #53",
    symbol: "NVDA",
    content:
      "일본 국가 AI 팩토리 숫자만 던져본다. Vera 13,750 / Rubin 27,500 / 140 MW. 국가 발주 스케일이라 수요 가시성은 강해 보이는데, 출하 일정이 나오기 전엔 파이프라인 신호로만. 매수 유지·추적.",
    likes: 3,
    comments: 4,
    created_at: "2026-07-17T00:33:00.000Z",
    liked: false,
  },
  {
    id: -348,
    alias: "마포 올빼미 #66",
    symbol: "TSM",
    content:
      "TSMC Q2가 그냥 비트한 게 아니라 마진까지 예뻤다. GM 67.7%, OM 60.3%, 내년 매출 +40% 코멘트. 주가 $419 근처면 이미 많이 반영됐을 수 있어 추격보단 눌림 관심. 그래도 실적 품질은 BUY 쪽.",
    likes: 20,
    comments: 5,
    created_at: "2026-07-17T00:40:00.000Z",
    liked: false,
  },
  {
    id: -349,
    alias: "판교 사자 #19",
    symbol: "TSM",
    content:
      "애리조나 +$100B에 미국 합계 $265B. 숫자가 비현실적으로 커서 오히려 감가비·램프업 리스크가 먼저 보인다. 중장기 온쇼어링 스토리는 맞는데 단기 이익으로 환산하진 말자. 중립~비중유지.",
    likes: 17,
    comments: 3,
    created_at: "2026-07-17T00:47:00.000Z",
    liked: false,
  },
  {
    id: -350,
    alias: "잠실 여우 #34",
    symbol: "TSLA",
    content:
      "Semi On Tour 일정 봤음 — 7/20-21 시카고, 7/21-23 버지니아. 양산 스펙 보여주기 투어라 인도 실적은 아니다. 그래도 상용 라인업 존재감은 남긴다. 이벤트성 매수 금지, 관심만.",
    likes: 14,
    comments: 4,
    created_at: "2026-07-17T00:54:00.000Z",
    liked: false,
  },
  {
    id: -351,
    alias: "역삼 독수리 #72",
    symbol: "NVDA",
    content:
      "젠슨 황 발언 한 줄 요약하면 “AI는 이제 시작, 사이클은 10~15년”. CEO 톤은 늘 자신감인데 SOX -16%랑 같이 보면 장기 낙관 ≠ 단기 차트. 가이던스·고객 CAPEX를 보고 판단. 추적관망.",
    likes: 11,
    comments: 5,
    created_at: "2026-07-17T01:01:00.000Z",
    liked: false,
  },
  {
    id: -352,
    alias: "청담 매 #88",
    symbol: "SOX",
    content:
      "ATH 14,655 → 지금 12,331. 딱 -16%. 기술적 조정인지 추세 전환인지는 다음 반등 고점이 말해줄 거다. 지금 구간은 신규 올인보다 분할·리스크예산 재설정. 주의.",
    likes: 8,
    comments: 3,
    created_at: "2026-07-17T01:08:00.000Z",
    liked: false,
  },
  {
    id: -353,
    alias: "압구정 콘도르 #15",
    symbol: "SPCX",
    content:
      "AI1 피크 150→250 kW, 평균 120→160. Rubin 랙(230/190, $5-9M)이랑 붙이는 비교가 핵심 프레임이다. 스펙은 화려한데 발사·양산·단위경제는 아직. 스토리 BUY, 사이즈는 작게.",
    likes: 5,
    comments: 4,
    created_at: "2026-07-17T01:15:00.000Z",
    liked: false,
  },
  {
    id: -354,
    alias: "삼성동 표범 #42",
    symbol: "AAPL",
    content:
      "모건스탠리가 중국 Apple Intelligence 승인을 촉매로 본다고? 방향은 이해되는데 승인≠출시다. 기능 범위·일정 확인 전엔 기대감만으로 추격하지 말자. 중립.",
    likes: 2,
    comments: 5,
    created_at: "2026-07-17T01:22:00.000Z",
    liked: false,
  },
  {
    id: -355,
    alias: "논현 늑대 #59",
    symbol: "UBER",
    content:
      "Uber → Delivery Hero €41.50. 99개 시장 확장 그림은 큰데, 제안 단계라 규제·자금·시너지가 전부 변수. 딜 뉴스에 휘둘리기 쉬운 구간이라 관망이 기본값.",
    likes: 19,
    comments: 3,
    created_at: "2026-07-17T01:29:00.000Z",
    liked: false,
  },
  {
    id: -356,
    alias: "이촌 황소 #26",
    symbol: "ARKK",
    content:
      "ARK 주장 — AI CAPEX가 2000년 버블 고점 돌파, 빅4 2026 >$700B, 2030 AI 시스템 ~$1.5T. 수요 확대와 과열 경고가 한 문장에 들어 있다. NVDA 주도·AMD Helios 도전 구도도 같이 체크. 비중 조절하며 보유.",
    likes: 16,
    comments: 4,
    created_at: "2026-07-17T01:36:00.000Z",
    liked: false,
  },
  {
    id: -357,
    alias: "성수 매 #83",
    symbol: "NVDA",
    content:
      "Jetson Thor T2000/T3000 나왔다. Blackwell 엣지·로봇 모듈이고 Boston Dynamics·Amazon Robotics 채택이 레퍼런스. 데이터센터랑 별개 파이프라인으로 보면 된다. 중기 옵션 — 당장 실적보단 채택 확대 추적. 매수(여유 비중).",
    likes: 13,
    comments: 5,
    created_at: "2026-07-17T01:43:00.000Z",
    liked: false,
  },
  // ── 2026-07-16 신규 ──────────────────────────────────────────────────────
  {
    id: -327,
    alias: "여의도 콘도르 #08",
    symbol: "TSLA",
    content:
      "TSLA 유럽 FSD 롤아웃 속도가 생각보다 빠르다. v14.2.2.6(2026.21.100)이 벌써 3차 배치까지 갔고 브랜치도 2026.20+라 최신 기능은 다 들어가 있음. 다만 여전히 Supervised라 운전자 개입은 필수 — 완전자율 얘기는 아직 이르다. 배치 확대 속도만 보면 국가 단위 확장 신호로 읽을 만하고, 구독매출 스토리 강화 관점에서 누적 매수.",
    likes: 3,
    comments: 3,
    created_at: "2026-07-16T00:05:00.000Z",
    liked: false,
  },
  {
    id: -328,
    alias: "강남 표범 #15",
    symbol: "TSLA",
    content:
      "오늘 옵티머스 숫자 보고 좀 놀랐다. 프리몬트 연 100만대, 기가텍사스 연 1000만대(!). 이게 실현되면 자동차 규모로 휴머노이드를 찍어내는 첫 사례가 되는 셈. 다만 어디까지나 '목표치'고 착공 여부는 아직 확인이 안 됨. 로보틱스 밸류에이션 프레임 자체를 흔들 촉매는 맞는데, 시차 리스크 감안해서 사이즈 조절한 장기 매수로.",
    likes: 20,
    comments: 4,
    created_at: "2026-07-16T00:12:00.000Z",
    liked: false,
  },
  {
    id: -329,
    alias: "서초 콘도르 #22",
    symbol: "BRK.B",
    content:
      "버핏이 2%도 싫다고 했다는데, 왜일까? 답은 간단하다 — 2% 물가상승률로도 35년이면 돈 가치가 반토막 나니까. \"다들 도박하듯 투자할 때 가치를 찾기 어렵다\"는 말도 곱씹을 만함. 밸류에이션 부담에 대한 우회적 경고로 들린다. 현금 실질수익률 다시 점검하고 신규 진입은 보수적으로. 관망.",
    likes: 17,
    comments: 5,
    created_at: "2026-07-16T00:19:00.000Z",
    liked: false,
  },
  {
    id: -330,
    alias: "을지로 팔콘 #29",
    symbol: "TSLA",
    content:
      "KBB 6월 데이터. 테슬라 평균가 -2.1% YoY, 업계 EV 전체는 -4.5%. 격차가 크다. Model Y 평균 $51,775로 업계 평균보다 낮은데 EV 판매의 35%+를 이 모델 하나가 차지 중이야. 가격전쟁에서 이미 이겨놓은 그림 아닌가 싶다. 다음 분기 GM ex-credits 개선 여부가 체크포인트. 매수.",
    likes: 14,
    comments: 3,
    created_at: "2026-07-16T00:26:00.000Z",
    liked: false,
  },
  {
    id: -331,
    alias: "광화문 늑대 #36",
    symbol: "NVDA",
    content:
      "Vera Rubin 지연설, 젠슨 황이 직접 나와서 아니라고 못박았다. 대량 하드웨어가 이미 입고 중이고 램프업 준비 단계라는 게 핵심 포인트. 매출인식 시점이야 별개 문제니 다음 실적 가이던스에서 가시성 확인하면 될 듯. 일단 추적관망하면서 매수 유지.",
    likes: 11,
    comments: 4,
    created_at: "2026-07-16T00:33:00.000Z",
    liked: false,
  },
  {
    id: -332,
    alias: "마포 올빼미 #43",
    symbol: "TSLA",
    content:
      "로보택시 텍사스 경제성, 숫자로 보니 확실히 남는 장사다. 모델Y 한 대가 연 700만달러를 벌어들일 수 있는데 생산비는 430만달러. 사이버캡 나오면 이 비용도 절반 밑으로 떨어진다니 마진은 더 벌어질 구조. 아직 초기 단계지만 페이백 매력은 충분함. 플릿 확장 속도랑 가동률이 다음 체크포인트. 매수.",
    likes: 8,
    comments: 5,
    created_at: "2026-07-16T00:40:00.000Z",
    liked: false,
  },
  {
    id: -333,
    alias: "판교 사자 #50",
    symbol: "TSLA",
    content:
      "유럽에서 모델Y가 또 1등. YoY +68%, 5개월간 76,760대. 가격전쟁 한복판에서 나온 성장이라 더 의미있음. 아까 KBB 가격안정화 얘기랑 같이 보면 그림이 완성된다 — 지역 다변화랑 마진 개선이 동시에 오는 구조. 매수.",
    likes: 5,
    comments: 3,
    created_at: "2026-07-16T00:47:00.000Z",
    liked: false,
  },
  {
    id: -334,
    alias: "잠실 여우 #57",
    symbol: "EQIX",
    content:
      "트럼프가 이큐닉스를 최대 100만달러어치 매입했다고 신고했다는데, \"데이터센터가 미래 일자리 최대 동력\"이라는 발언과 묶어서 보면 정책 신호로 읽힐 여지는 있다. 다만 주가 반응은 -0.09%로 거의 없었고, 매입 자체가 확정 정책을 뜻하진 않음. 데이터센터 리츠·전력 인프라 쪽 관심은 환기할 만하나 실제 정책 확인 전까지는 중립.",
    likes: 2,
    comments: 4,
    created_at: "2026-07-16T00:54:00.000Z",
    liked: false,
  },
  {
    id: -335,
    alias: "역삼 독수리 #64",
    symbol: "AAPL",
    content:
      "애플이 AI 서버칩 확보하려고 스타트업까지 접촉 중이라는데, 이게 딱히 좋은 신호는 아닌 것 같다. 자체 M2 울트라 서버로는 고급 워크로드가 안 돌아가서 구글클라우드의 Nvidia에 의존 중이고, 차세대 자체칩 Baltra는 지연됐다는 얘기까지 나옴. 온디바이스 AI 경쟁에서 뒤처질 리스크인지 M&A 발표가 트리거가 될지는 지켜봐야 할 듯. 의문 남기고 중립.",
    likes: 19,
    comments: 5,
    created_at: "2026-07-16T01:01:00.000Z",
    liked: false,
  },
  {
    id: -336,
    alias: "청담 매 #71",
    symbol: "SPCX",
    content:
      "스페이스X 지금 $133.18, IPO가 $135 밑으로 내려갔음. 일중으로는 +17.25% 반등했지만 YTD로는 -27.77%. 초기 투자자 상당수가 물려있는 구간이라는 뜻. 변동성만 크고 방향은 아직 안 잡힌 느낌이라 관망.",
    likes: 46,
    comments: 3,
    created_at: "2026-07-16T01:08:00.000Z",
    liked: false,
  },
  {
    id: -337,
    alias: "압구정 콘도르 #78",
    symbol: "ASML",
    content:
      "ASML이 실적으로 시장 기대를 크게 넘었다. 매출 €9.33B, EPS €7.59 둘 다 컨센서스 상회고, FY26 가이던스는 €36-40B에서 €43-45B로 확 올렸음. 2027년까지 EUV·DUV 캐파를 30% 늘린다는 계획에 머스크와의 TeraFab 협업 소식까지 겹쳐서, 반도체 공급망 전반에 우호적인 뉴스로 본다. 협업 디테일은 후속으로 확인하되 매수.",
    likes: 39,
    comments: 4,
    created_at: "2026-07-16T01:15:00.000Z",
    liked: false,
  },
  {
    id: -338,
    alias: "삼성동 표범 #85",
    symbol: "SPY",
    content:
      "BofA 펀드매니저 서베이 체크. 현금비중이 4.1%에서 3.6%로 떨어졌고 이번 세기 최저권임. BofA 자체 규칙으로는 매도 신호가 발동된 수준. 역발상 지표라 즉각 매도 신호로 확정 짓기는 이르지만, 헤지 비중이랑 밸류에이션 지표는 같이 점검해두는 게 좋겠다. 주의.",
    likes: 32,
    comments: 5,
    created_at: "2026-07-16T01:22:00.000Z",
    liked: false,
  },
  {
    id: -339,
    alias: "논현 늑대 #12",
    symbol: "TSLA",
    content:
      "대륙횡단 자율주행 완주 영상 봤는데 완성도가 생각보다 높더라. V14 Lite가 AI3 위에서 5,135마일을 큰 안전 이슈 없이 완주함. 커뮤니티에서는 벌써 \"더 많은 고객한테 확대해야 한다\"는 목소리가 나오는 중. 다만 이건 아직 공식 검증은 아니고 커뮤니티 테스트 수준이라, 배포확대 공식발표랑 개입빈도 데이터 나오면 다시 보자. 잠정 매수.",
    likes: 25,
    comments: 3,
    created_at: "2026-07-16T01:29:00.000Z",
    liked: false,
  },
  {
    id: -340,
    alias: "이촌 황소 #19",
    symbol: "TSLA",
    content:
      "EV 오너 설문 결과 하나 — 가솔린으로 돌아가고 싶다는 응답이 단 0.5%, EV 유지하겠다는 응답이 99.5%다. 초기엔 충전 불안 얘기가 많았는데 실제 이탈로는 거의 안 이어진다는 뜻. 표본이나 방법론 디테일은 제한적이라 단독 근거로 쓰기엔 약하지만, 장기 수요기반이 견조하다는 보조지표로는 충분히 쓸만함.",
    likes: 48,
    comments: 4,
    created_at: "2026-07-16T01:36:00.000Z",
    liked: false,
  },
  {
    id: -341,
    alias: "성수 매 #26",
    symbol: "GOOGL",
    content:
      "버핏이 CNBC에서 구글 투자를 직접 주도했다고 확인했다. $15.4B 지분 공개 이후 주가는 +34%, 지금 $371.81. 가치투자 관점에서도 매력있다는 평가가 나오는데, 문제는 이미 오를 만큼 오른 뒤라는 것. 밸류에이션이랑 실적 지속성 먼저 확인하고 들어가는 게 맞을 듯. 밸류체크하면서 중립.",
    likes: 41,
    comments: 5,
    created_at: "2026-07-16T01:43:00.000Z",
    liked: false,
  },
  {
    id: -342,
    alias: "한남 팔콘 #33",
    symbol: "AAPL",
    content:
      "중국에서 애플 온디바이스 AI가 드디어 승인났다. 알리바바 Qwen이 iOS·iPadOS·macOS·visionOS 전부에 통합되는 구조라 로컬 파트너십으로 규제 장벽을 풀어낸 셈. 알리바바 클라우드·AI 사업에도 우호적인 뉴스고, 애플 입장에서는 중국 판매랑 업그레이드 수요를 자극할 촉매다. 출시일정이랑 기능범위만 확인되면 매수 유지.",
    likes: 34,
    comments: 3,
    created_at: "2026-07-16T01:50:00.000Z",
    liked: false,
  },
  // ── 2026-07-15 신규 ──────────────────────────────────────────────────────
  {
    id: -293,
    alias: "여의도 황소 #12",
    symbol: "SPY",
    content:
      "SPY 쪽 채널 체크해봤는데 CPI -0.4%가 중심이야. 1) June CPI -0.4% — Apr 2020 이후 최대. 2) Core 2.6% YoY. 3) Hassett “best in ~6 years”. 4) S&P fut +38.50 / fair +4.34 / implied +34.16 · NASDAQ fut +403.75. 5) 투자: 디스인플레 우호이나 Core 지속성 확인. BUY(인덱스 모멘텀, 사이즈 조절).",
    likes: 47,
    comments: 3,
    created_at: "2026-07-15T00:06:00.000Z",
    liked: false,
  },
  {
    id: -294,
    alias: "강남 독수리 #19",
    symbol: "TSLA",
    content:
      "Chamath M&A 시나리오 보고 한 가지 숫자가 눈에 들어왔어. 1) 50% premium → ~$600/share. 2) 결합 ~$2.25T. 3) Ownership TSLA 55–60 / SPCX 40–45. 4) 산업 논리 + domestic cellular. 5) 공식 딜 아님 — 시나리오 앵커. NEUTRAL.",
    likes: 62,
    comments: 4,
    created_at: "2026-07-15T00:12:07.000Z",
    liked: false,
  },
  {
    id: -295,
    alias: "서초 팔콘 #26",
    symbol: "TSLA",
    content:
      "Robotaxi 765 데이터 다시 뜯어봤는데 1) +4 → fleet 765. 2) Unsupervised 39. 3) Austin 28·Dallas 5·Houston 6. 4) Tesla own/reg 102. 5) 스케일·권역 확장 지표. BUY.",
    likes: 93,
    comments: 5,
    created_at: "2026-07-15T00:18:14.000Z",
    liked: false,
  },
  {
    id: -296,
    alias: "송파 여우 #33",
    symbol: "LCID",
    content:
      "AlixPartners 검증 결과랑 딱 맞아 떨어져. 1) ~-41.74% · overlay 3.210. 2) AlixPartners 영입. 3) 아직 파산 아님. 4) Musk: Rivian/Lucid bankruptcy path. 5) 생존 리스크 재평가. SELL/avoid(신규).",
    likes: 16,
    comments: 3,
    created_at: "2026-07-15T00:24:21.000Z",
    liked: false,
  },
  {
    id: -297,
    alias: "마포 매 #40",
    symbol: "NVDA",
    content:
      "Burry 순환금융 클립/차트 봤는데 임팩트가 크네. 1) borrow→GPU→collateral→borrow. 2) MULTI TRILLION FUNDING PROMISES. 3) 수요 vs 레버리지 분리. 4) 현금흐름 가시성 체크. NEUTRAL(리스크 주시).",
    likes: 13,
    comments: 4,
    created_at: "2026-07-15T00:30:28.000Z",
    liked: false,
  },
  {
    id: -298,
    alias: "한남 늑대 #47",
    symbol: "GOOGL",
    content:
      "Steel River가 오늘 핵심이야. 이유는 1) 100% initial offtake. 2) 1.6GW+2GWh by 2029. 3) Full 2.5GW/2.9GWh. 4) FSLR+LG · 315k+ homes/yr. 5) AI 전력 실물 증거. BUY.",
    likes: 10,
    comments: 5,
    created_at: "2026-07-15T00:36:35.000Z",
    liked: false,
  },
  {
    id: -299,
    alias: "분당 사자 #54",
    symbol: "NVDA",
    content:
      "NVDA 쪽 채널 체크해봤는데 Pelosi tracker CLAIM가 중심이야. 1) Jan up to $1M. 2) 7d later H200 ban lift. 3) Feb up to $5M. 4) May 10 Chinese cos. 5) ※ CLAIM only — 음모 단정 금지. NEUTRAL.",
    likes: 7,
    comments: 3,
    created_at: "2026-07-15T00:42:42.000Z",
    liked: false,
  },
  {
    id: -300,
    alias: "역삼 호랑이 #61",
    symbol: "SPY",
    content:
      "해외 유입 ~$900B 보고 한 가지 숫자가 눈에 들어왔어. 1) Foreign US equity buying fastest on record. 2) 12m sum ~$900B (Apollo/Barchart). 3) 쏠림 + 되돌림 리스크. NEUTRAL/WATCH.",
    likes: 4,
    comments: 4,
    created_at: "2026-07-15T00:48:49.000Z",
    liked: false,
  },
  {
    id: -301,
    alias: "압구정 황소 #68",
    symbol: "TSLA",
    content:
      "Hyperion $30.33M 데이터 다시 뜯어봤는데 1) Q2 2026 $30.33M. 2) 72,118 sh. 3) avg ~$420.60. 4) 단일 기관 시그널. NEUTRAL(보조지표).",
    likes: 1,
    comments: 5,
    created_at: "2026-07-15T00:54:00.000Z",
    liked: false,
  },
  {
    id: -302,
    alias: "청담 독수리 #75",
    symbol: "ARKK",
    content:
      "Cathie QT bogeyman 검증 결과랑 딱 맞아 떨어져. 1) QT = bogeyman. 2) Fed BS $8.5T→$6.7T. 3) Warsh QT 재개 가능. 4) 유동성 공포 과잉 여부. BUY(성장 바스켓, 정책 리스크 인지).",
    likes: 18,
    comments: 3,
    created_at: "2026-07-15T00:10:07.000Z",
    liked: false,
  },
  {
    id: -303,
    alias: "잠실 팔콘 #82",
    symbol: "TSLA",
    content:
      "FSD NL obstruction 클립/차트 봤는데 임팩트가 크네. 1) FSD Supervised NL. 2) opposite lane around obstruction. 3) UI 14 KM/H Self-Driving. 4) EU edge-case 증거. BUY.",
    likes: 15,
    comments: 4,
    created_at: "2026-07-15T00:16:14.000Z",
    liked: false,
  },
  {
    id: -304,
    alias: "성수 여우 #89",
    symbol: "AAPL",
    content:
      "iPhone AI shrink가 오늘 핵심이야. 이유는 1) SV firm talks. 2) shrink models for on-device iPhone. 3) CNBC via Evan. 4) 온디바이스 차별화. BUY.",
    likes: 12,
    comments: 5,
    created_at: "2026-07-15T00:22:21.000Z",
    liked: false,
  },
  {
    id: -305,
    alias: "판교 매 #96",
    symbol: "TSLA",
    content:
      "TSLA 쪽 채널 체크해봤는데 Cybercab Miami가 중심이야. 1) Miami street testing. 2) Grayson Brulte video. 3) 지리적 확장 신호. BUY.",
    likes: 9,
    comments: 3,
    created_at: "2026-07-15T00:28:28.000Z",
    liked: false,
  },
  {
    id: -306,
    alias: "광화문 늑대 #16",
    symbol: "TSLA",
    content:
      "Antidooring 2026.20.3 보고 한 가지 숫자가 눈에 들어왔어. 1) Blind Spot Warning While Parked NEW. 2) chime + 1st press block. 3) 2nd override. 4) version 2026.20.3. 5) 안전 UX 플러스. BUY.",
    likes: 6,
    comments: 4,
    created_at: "2026-07-15T00:34:35.000Z",
    liked: false,
  },
  {
    id: -307,
    alias: "종로 사자 #23",
    symbol: "TSLA",
    content:
      "EU Robotaxi hiring 데이터 다시 뜯어봤는데 1) Berlin Electrical Design Engineer. 2) Amsterdam Vehicle SW Intern. 3) EU 상용화 선행지표. BUY.",
    likes: 3,
    comments: 5,
    created_at: "2026-07-15T00:40:42.000Z",
    liked: false,
  },
  {
    id: -308,
    alias: "홍대 호랑이 #30",
    symbol: "JPM",
    content:
      "NI $16.9B 검증 결과랑 딱 맞아 떨어져. 1) NI $16.9B · ROTCE 23% ex Visa/equity. 2) CIB +27% · Markets +35% · IB fees +30%. 3) CCB +8%. 4) AUM >$5T · LT inflows $50B. 5) tectonic plates 리스크. BUY(실적) / hedge macro.",
    likes: 20,
    comments: 3,
    created_at: "2026-07-15T00:46:49.000Z",
    liked: false,
  },
  {
    id: -309,
    alias: "여의도 황소 #37",
    symbol: "NFLX",
    content:
      "모델 $169 클립/차트 봤는데 임팩트가 크네. 1) $73.03 · EPS TTM $3.10 · PE 23.6. 2) rev start 46.89B · growth 13%. 3) margin 25→30% · future PE 28 → EPS $6.03 · $168.83. 4) ann 18.2% / total 131.2%. 5) 가정 민감. BUY(가정 가드).",
    likes: 17,
    comments: 4,
    created_at: "2026-07-15T00:52:00.000Z",
    liked: false,
  },
  {
    id: -310,
    alias: "강남 독수리 #44",
    symbol: "FNMA",
    content:
      "Burry $193B가 오늘 핵심이야. 이유는 1) $193B Treasury debt. 2) write-off → 3–4x then 6–7x. 3) else low single digits. 4) bad-loan WO $61M→$243M. 5) 바이너리 정책. SPECULATIVE.",
    likes: 14,
    comments: 5,
    created_at: "2026-07-15T00:08:07.000Z",
    liked: false,
  },
  {
    id: -311,
    alias: "서초 팔콘 #51",
    symbol: "MU",
    content:
      "MU 쪽 채널 체크해봤는데 ETF weights가 중심이야. 1) QQQ 4.79%. 2) IVV/SPY 1.72%. 3) VOO 1.68%. 4) VTI 1.50%. 5) 패시브 증폭. BUY(사이클) / vol 주의.",
    likes: 41,
    comments: 3,
    created_at: "2026-07-15T00:14:14.000Z",
    liked: false,
  },
  {
    id: -312,
    alias: "송파 여우 #58",
    symbol: "TSLA",
    content:
      "Barclays $370 보고 한 가지 숫자가 눈에 들어왔어. 1) Dan Levy PT $370 from $360. 2) Equal Weight. 3) Robotaxi/Optimus/energy · Q2 beat. 4) spot $396.18(+0.36%). 5) EW가 메시지. NEUTRAL.",
    likes: 34,
    comments: 4,
    created_at: "2026-07-15T00:20:21.000Z",
    liked: false,
  },
  {
    id: -313,
    alias: "마포 매 #65",
    symbol: "TSM",
    content:
      "TTM $140B 데이터 다시 뜯어봤는데 1) June TTM +31% to $140B. 2) YTD $76.0B(+35.6%). 3) 2019–2025 annual boxes. 4) AI 슈퍼사이클. BUY.",
    likes: 27,
    comments: 5,
    created_at: "2026-07-15T00:26:28.000Z",
    liked: false,
  },
  {
    id: -314,
    alias: "한남 늑대 #72",
    symbol: "TSLA",
    content:
      "XPENG VLA 2.0 검증 결과랑 딱 맞아 떨어져. 1) XPENG VLA 2.0 EU 2H 2026 camera-only. 2) Tesla FSD >11B miles. 3) +28M/day. 4) 데이터 해자 vs 지역 공세. BUY(TSLA) / watch XPEV.",
    likes: 50,
    comments: 3,
    created_at: "2026-07-15T00:32:35.000Z",
    liked: false,
  },
  {
    id: -315,
    alias: "분당 사자 #79",
    symbol: "TSLA",
    content:
      "Grok voice ~3mo 클립/차트 봤는데 임팩트가 크네. 1) Elon Jun 17: ~3 months. 2) parking #1 disengagement. 3) Sept→stress→wide late'26/'27는 추정. 4) 릴리즈만 추적. NEUTRAL/WATCH.",
    likes: 43,
    comments: 4,
    created_at: "2026-07-15T00:38:42.000Z",
    liked: false,
  },
  {
    id: -316,
    alias: "역삼 호랑이 #86",
    symbol: "SNDK",
    content:
      "Evercore $3100가 오늘 핵심이야. 이유는 1) PT $3,100 · upside $4,000. 2) from ~$254 → $1,754(+590%). 3) 5 NBM ~$62B RPO. 4) >$11B prepays. 5) 가시성 vs 변동성. BUY(사이즈↓).",
    likes: 36,
    comments: 5,
    created_at: "2026-07-15T00:44:49.000Z",
    liked: false,
  },
  {
    id: -317,
    alias: "압구정 황소 #93",
    symbol: "TSLA",
    content:
      "TSLA 쪽 채널 체크해봤는데 SDI ESS가 중심이야. 1) Samsung SDI first Tesla ESS via StarPlus. 2) ~3–5조 ($2–3.3B). 3) 300Ah LFP. 4) Q2 2027 ops · signed Jan. BUY(energy).",
    likes: 29,
    comments: 3,
    created_at: "2026-07-15T00:50:00.000Z",
    liked: false,
  },
  {
    id: -318,
    alias: "청담 독수리 #13",
    symbol: "IBM",
    content:
      "Q2 miss 보고 한 가지 숫자가 눈에 들어왔어. 1) $17.2B vs $17.86B. 2) +1% YoY · Infra -7%. 3) ~-24~-28% · mcap ~-$65B. 4) AI 스토리 재가격. SELL/avoid short-term.",
    likes: 22,
    comments: 4,
    created_at: "2026-07-15T00:06:07.000Z",
    liked: false,
  },
  {
    id: -319,
    alias: "잠실 팔콘 #20",
    symbol: "IBM",
    content:
      "CHIPS pols 데이터 다시 뜯어봤는데 1) 4 pols bought 2026 · 0 sales. 2) Khanna 8x · Salazar 2x May 21. 3) May 21 $1B CHIPS quantum. 4) Jul14 219.32(-24.76%). 5) PTR≠인과. NEUTRAL.",
    likes: 53,
    comments: 5,
    created_at: "2026-07-15T00:12:14.000Z",
    liked: false,
  },
  {
    id: -320,
    alias: "성수 여우 #27",
    symbol: "BRK.B",
    content:
      "Buffett 12M 검증 결과랑 딱 맞아 떨어져. 1) 12M sh ~$6B. 2) 9M Susan Fdn · 1M×3. 3) ~8년 내 전량 처분. 4) 공급·승계 내러티브. NEUTRAL.",
    likes: 84,
    comments: 3,
    created_at: "2026-07-15T00:18:21.000Z",
    liked: false,
  },
  {
    id: -321,
    alias: "판교 매 #34",
    symbol: "SPY",
    content:
      "Retail 6yr low 클립/차트 봤는데 임팩트가 크네. 1) slowest net buying 6+ years. 2) Vanda. 3) lowest since Covid. 4) 기관/해외 의존↑. NEUTRAL.",
    likes: 1,
    comments: 4,
    created_at: "2026-07-15T00:24:28.000Z",
    liked: false,
  },
  {
    id: -322,
    alias: "광화문 늑대 #41",
    symbol: "TSM",
    content:
      "Pricing 74%가 오늘 핵심이야. 이유는 1) 74% wafer rev advanced. 2) prices +5–10%. 3) Street $40.0B(+33%) · EPS $3.81(+54%). 4) $421.58(+83.83% 1Y). BUY.",
    likes: 18,
    comments: 5,
    created_at: "2026-07-15T00:30:35.000Z",
    liked: false,
  },
  {
    id: -323,
    alias: "종로 사자 #48",
    symbol: "SPCX",
    content:
      "SPCX 쪽 채널 체크해봤는데 ARK +$21M가 중심이야. 1) +$21M. 2) total 3,850,606 sh ~$535.8M. 3) ARKX 8.31% · ARKQ 6% · ARKK 4.31% · ARKW 3.14%. BUY(유동성 주의).",
    likes: 15,
    comments: 3,
    created_at: "2026-07-15T00:36:42.000Z",
    liked: false,
  },
  {
    id: -324,
    alias: "홍대 호랑이 #55",
    symbol: "TSLA",
    content:
      "FSD EU 50M km 보고 한 가지 숫자가 눈에 들어왔어. 1) >50M km (=31M miles). 2) NL/EE/BE/LT/DK. 3) 20M km ~7.5 weeks ago. BUY.",
    likes: 12,
    comments: 4,
    created_at: "2026-07-15T00:42:49.000Z",
    liked: false,
  },
  {
    id: -325,
    alias: "여의도 황소 #62",
    symbol: "TSLA",
    content:
      "FSD 14.3.5 데이터 다시 뜯어봤는데 1) first drive. 2) parking-garage→garage. 3) one tap. 4) Whole Mars. BUY.",
    likes: 9,
    comments: 5,
    created_at: "2026-07-15T00:48:00.000Z",
    liked: false,
  },
  {
    id: -326,
    alias: "강남 독수리 #69",
    symbol: "SPCX",
    content:
      "James Quiver 검증 결과랑 딱 맞아 떨어져. 1) John James SPCX purchase filed. 2) Energy & Commerce. 3) widget $136.08(-2.20%). NEUTRAL(공시 팩트).",
    likes: 6,
    comments: 3,
    created_at: "2026-07-15T00:54:07.000Z",
    liked: false,
  },

  // ── 2026-07-14 신규 ──────────────────────────────────────────────────────
  {
    id: -285,
    alias: "마포 황소 #28",
    symbol: "TSLA",
    content:
      "BofA PT $460 — 보고 한 가지 숫자가 눈에 들어왔어. Robotaxi가 밸류에이션의 ~52%. 1) Alexander Perry BUY 재확인 · PT $460. 2) 자율사고 101,000 miles당 1건 · 인간 대비 ~90% 낮음. 3) Cybercab: 3,113 lbs · 48-kWh · ~300-mile 실세계. 4) Optimus RaaS 잠재 $30B · Capex $25B AI/로봇 전환. 5) 투자 핵심: PT의 절반 이상이 자율주행. 자동차 멀티플로 보면 미스프라이싱. BUY.",
    likes: 9,
    comments: 4,
    created_at: "2026-07-14T00:06:00.000Z",
    liked: false,
  },
  {
    id: -286,
    alias: "서초 독수리 #47",
    symbol: "TSLA",
    content:
      "Jefferies $400이 오늘 핵심이야. 이유는 Q2 딜리버리 비트가 EBIT까지 올린 점. 1) PT $375→$400. 2) FY2026 EBIT 추정 +4% to $6.2B. 3) 롱휠베이스 Model Y 믹스 반영. 4) BofA $460과 동시에 보면 월가 PT 밴드가 위로 움직이기 시작. NEUTRAL→BUY (펀더멘털 상향 확인).",
    likes: 36,
    comments: 3,
    created_at: "2026-07-14T00:12:00.000Z",
    liked: false,
  },
  {
    id: -287,
    alias: "송파 여우 #19",
    symbol: "SPCX",
    content:
      "FAA Flight 12 채널 체크해봤는데 조사가 7/13에 닫혔어. 1) 공중 부상·재산 피해 없음. 2) 원인: 상승 중 추진계통 열 · 엔진 알람 설정 오류. 3) 시정조치 4건. 4) Flight 13 진행 가능. 5) 투자 포인트: 규제 클리어는 발사 캘린더 리스크 제거. 주가 약세와 디커플될 수 있어도 장기 일정엔 플러스. BUY.",
    likes: 29,
    comments: 4,
    created_at: "2026-07-14T00:18:00.000Z",
    liked: false,
  },
  {
    id: -288,
    alias: "분당 팔콘 #63",
    symbol: "SPCX",
    content:
      "SPCX $138.99 — 최저 종가 숫자부터. −$6.31 / −4.34% · Jul 13 16:11 ET. ATH 대비 시총 소실 nearly $1.2 Trillion. 1) IPO 이후 최저 종가 라벨은 공포 매도 촉발 가능. 2) 동시에 장기 매수 창구로 읽는 자금도 유입. 3) 변동성 자체는 예상 범위. NEUTRAL — 스토리와 가격의 괴리가 커진 구간. 사이즈 조절 필수.",
    likes: 22,
    comments: 3,
    created_at: "2026-07-14T00:24:00.000Z",
    liked: false,
  },
  {
    id: -289,
    alias: "한남 매 #35",
    symbol: "SPCX",
    content:
      "의회 SPCX 매수 — PTR 다시 뜯어봤는데 팩트만 정리. 1) IPO 이후 정치인 매수 4 · 매도 0. James·Cisneros·Meuser·McGuire. 2) John James #20034949 · MI10 · SP · 06/12/2026 · $15,001–$50,000 · SPCX. 3) James는 Energy & Commerce / Communications & Technology — FCC·Starlink 감독. 4) 규모는 크지 않으나 감독 포지션 + 매수 불균형의 시그널 효과. NEUTRAL (공시 팩트, 과해석 금지).",
    likes: 45,
    comments: 5,
    created_at: "2026-07-14T00:30:00.000Z",
    liked: false,
  },
  {
    id: -290,
    alias: "역삼 독수리 #74",
    symbol: "TSM",
    content:
      "TSMC Q2 — 숫자 먼저. Q2 ~$39.6B (+36% YoY) vs est ~$39.4B. June ~$13.8B (+6.2% MoM, +67.9% YoY). H1 2026 ~$75.0B. 1) 기록 분기에 컨센서스 소폭 상회. 2) 6월 YoY +67.9%가 AI 가속 속도감. 3) 파운드리 사이클 상단이 아직 안 보인다는 쪽에 무게. BUY.",
    likes: 38,
    comments: 4,
    created_at: "2026-07-14T00:36:00.000Z",
    liked: false,
  },
  {
    id: -291,
    alias: "압구정 팔콘 #51",
    symbol: "META",
    content:
      "META Louisiana DC 딜 플로우 확인했는데 스케일이 예상보다 커. 1) Richland Parish · up to $50B. 2) Compute up to 5GW. 3) Local infra >$1B. 4) AI Capex가 전력·부지·지역투자까지 확장되는 단계. 5) NVDA·TSMC 수요의 최종 흡수처가 이런 DC. BUY (인프라 확신 신호).",
    likes: 31,
    comments: 4,
    created_at: "2026-07-14T00:42:00.000Z",
    liked: false,
  },
  {
    id: -292,
    alias: "청담 황소 #42",
    symbol: "NVDA",
    content:
      "헤지펀드 반도체 플로우 — 검증 결과랑 딱 맞아떨어져. 1) 지난주 US semis 매수 3.5년 최고. 2) Jun 2024 이후 최대 연속 주간 매도 직후 반전. 3) Semis = HF exposure 10% (2x YoY). 4) May peak 14% 하회 → 추가 리빌드 여지. 5) GS Prime Book. NVDA·TSM·AVGO 바스켓. BUY.",
    likes: 24,
    comments: 4,
    created_at: "2026-07-14T00:48:00.000Z",
    liked: false,
  },

  // ── 2026-07-13 신규 ──────────────────────────────────────────────────────
  {
    id: -277,
    alias: "잠실 황소 #53",
    symbol: "TSLA",
    content:
      "오스틴 허브 청소 로봇 내장 — 허가서 데이터 확인했어. 1) Permit TAB022052026에 청소 로봇, 수퍼차저, 장비실이 공식 범위로 명시됨. 2) 허브 완공 2026년 3월. 자동화 청소 시스템은 작년부터 설계. 3) 핵심은 이거야. '차가 스스로 달리고 이제 허브가 스스로 청소한다' — 이게 완전 무인 로보택시 생태계의 완성이야. 차량 자율 + 허브 자율 = 인건비 제로 구조. 4) 이 허브 설계가 전국으로 복제되면 확장 시 고정비가 거의 선형으로 늘지 않아. 스케일아웃 비용 효율이 압도적이야. 5) 트립당 EBITDA가 기존 추정치보다 높을 수 있어. 운영비 절감 레버가 하나 더 생긴 거야. BUY.",
    likes: 13,
    comments: 4,
    created_at: "2026-07-13T00:06:00.000Z",
    liked: false,
  },
  {
    id: -278,
    alias: "판교 독수리 #41",
    symbol: "TSLA",
    content:
      "AI5 칩 삼성 테이프아웃 — 딜 플로우 확인했는데 이 뉴스 의미가 크다. 1) 삼성 파운드리 내부자(Shay Boloor): TSLA AI5 칩 테이프아웃 도달 · Texas fab 2nm. 2) Ming-Chi: AI5는 이미 생산 진입, 인도팀은 AI6·Dojo 3 테이프아웃 준비. 3) Whole Mars: AI5 트랜지스터 AI4 대비 ~3.5배 작음. 4) 투자 핵심: NVIDIA 의존도 감소 = AI 추론 비용 내재화. FSD·Optimus 마진 구조 개선. BUY.",
    likes: 10,
    comments: 4,
    created_at: "2026-07-13T00:12:00.000Z",
    liked: false,
  },
  {
    id: -279,
    alias: "강남 여우 #67",
    symbol: "TSLA",
    content:
      "Chicago 'Project Buster' — 마케팅 관점에서 뜯어봤는데 타이밍이 완벽하다. Austin 허브 오픈 직후에 바로 대형 소비자 광고. 1) 'Project Buster' + Wrigleyville + Wrigley Building. Ferris Bueller's Day Off(1986) 오마주. 2) 타이밍: 허브 오픈 → 직원 탑승 → 소비자 광고 순서가 교과서적 런칭 시퀀스. 3) 일요일·월요일 이틀 촬영 = 대형 글로벌 캠페인 소재 가능성. 4) Chicago 선택 = 뉴욕·LA 이외 대도시 커버리지 확장 신호. NEUTRAL → BUY (마케팅 본격화 확인).",
    likes: 7,
    comments: 3,
    created_at: "2026-07-13T00:18:00.000Z",
    liked: false,
  },
  {
    id: -280,
    alias: "홍대 팔콘 #29",
    symbol: "TSLA",
    content:
      "Eric C 50회 탑승 — 이 숫자 하나가 눈에 들어왔어. 1) Eric C 직책: Tesla 차량·로보택시 엔지니어링 리드 + Giga Texas 기술 총괄. Cybercab을 가장 깊이 이해하는 엔지니어야. 2) 발언 원문: '50 rides in the last few days and I still never wanted to get out.' 3) 직원 탑승 이제 막 시작됐다는 것. 초기 단계에서 이 반응이면 소비자 피드백 선행 지표. 4) Eric C는 Cybercab이 Model 3의 절반 부품이라고 했어. 목적 설계된 탈것. 5) 재탑승률 지표: 전문가 50회 탑승 = 소비자 반복 구매 의향 선행. 로보택시 LTV 추정치 상향 근거. BUY.",
    likes: 4,
    comments: 5,
    created_at: "2026-07-13T00:24:00.000Z",
    liked: false,
  },
  {
    id: -281,
    alias: "여의도 독수리 #58",
    symbol: "TSLA",
    content:
      "FSD V4 Lite HW3 — 검증 결과랑 딱 맞아떨어진다. 1) HW3 = HW4 연산의 15%. 이 한계를 OTA 소프트웨어 최적화로 극복. 2) 개선 항목: 주행 거리감, 가감속 편안함, 주차장 성능 모두 극적 향상. 3) 수혜: 수백만 HW3 차량 즉시 적용. 4) 투자 관점: FSD 구독 유지율 향상, 신규 전환 증가, HW3→HW4 업그레이드 수요 별개 유지, 소프트웨어 플랫폼 해자 수치로 입증. BUY.",
    likes: 1,
    comments: 4,
    created_at: "2026-07-13T00:30:00.000Z",
    liked: false,
  },
  {
    id: -282,
    alias: "성수 매 #72",
    symbol: "SPCX",
    content:
      "Starlink V3 채널 체크해봤는데 용량 6배가 핵심이야. 1) V3 20기 발사. V2 대비 용량 최대 6배. 레이저 인터링크 + 남아공 지상국 연결 테스트. 2) 히트실드 카메라 6기 — Starship 재진입 영상 분석 목적. 한 발사로 상업+R&D 동시 달성. 3) 비즈니스 포인트: 동일 위성 수에서 처리량 6배 = ARPU 상승 명분. 프리미엄 구독 가격 인상 가능. 4) 경쟁 구도: Kuiper·OneWeb 추격 불가 구간 진입. BUY.",
    likes: 18,
    comments: 4,
    created_at: "2026-07-13T00:36:00.000Z",
    liked: false,
  },
  {
    id: -283,
    alias: "종로 팔콘 #84",
    symbol: "SPCX",
    content:
      "Starship IFT-13 7/16 — 완전 재사용 체계 실증 여부야. 1) 주요 목표: 부스터 추진제 이송 + Mechazilla 암 캐치. 완전 재사용의 핵심 퍼즐. 2) 개선 사항: 이전 비행 대비 H/W + S/W 다수 수정. 3) 탑재체: V2 Starlink + Super Heavy V2. 테스트가 아니라 실제 상업 화물. 4) 투자 포인트: 암 캐치 성공 = 발사 단가 급락 타임라인 확정. 발사 비용 1/10 현실화 시 SpaceX 수익성 구조 완전히 달라져. BUY.",
    likes: 15,
    comments: 4,
    created_at: "2026-07-13T00:42:00.000Z",
    liked: false,
  },
  {
    id: -284,
    alias: "광화문 황소 #36",
    symbol: "MU",
    content:
      "MU Q2 — 숫자 먼저. 매출 $9B+, 순이익 $1B+, 발표 7/23. 1) 컨센서스 상회 시 밸류에이션 재평가 트리거. MU는 반도체 사이클 선행 지표. 2) DRAM·NAND·HBM 전부 개선. HBM 고마진 믹스 비중이 주가 방향 결정. 3) 기존 가이던스 확인: '2027년 말까지 수급 타이트'. 사이클 지속성 재확인. 4) 7/23 발표 앞두고 불확실성이 오히려 매수 기회. $9B 달성 가능성 높다고 봐. BUY.",
    likes: 12,
    comments: 4,
    created_at: "2026-07-13T00:48:00.000Z",
    liked: false,
  },

  // ── 2026-07-10 신규 ──────────────────────────────────────────────────────
  {
    id: -268,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "Giga Texas Optimus 공장 채널 체크해봤는데 속도가 예상보다 훨씬 빠름. 1) 구조물·설비·조립 라인이 매일 변하는 속도가 기가팩토리 초기보다 빠른 것 같아. Joe Taugaman 현장 관측 신뢰도가 높은데 공식 Tesla 발표 이전에 진행 상황을 가장 빠르게 캐치하는 소스야. 2) 10M대/년 목표. 이 숫자가 의미하는 게 뭔지 생각해봤어. 대당 $30,000 임대 수익만 잡아도 연 $300조원이야. 이게 TSLA 현재 시총을 5배 이상 정당화해. 3) ARK 2026년 인간 수준 목표. 공장 속도 보면 허황된 말이 아니야. FSD·xAI 공유 아키텍처로 학습 비용이 타사 대비 로그함수적으로 낮아지는 구조 자체가 차별화. 4) Phase 2 기업 임대는 아직 시작 전. Tesla 자체 생산 우선 완료 후 외부 공급. 매출 레이어가 두 겹으로 쌓이는 거야. 잠재 업사이드를 현재 주가에 반영하려는 어떤 시도도 아직 초기. BUY.",
    likes: 42,
    comments: 4,
    created_at: "2026-07-10T00:06:00.000Z",
    liked: false,
  },
  {
    id: -269,
    alias: "강남 팔콘 #58",
    symbol: "TSLA",
    content:
      "Austin 로보택시 허브 울타리 철거 — 이걸 어떻게 읽어야 하나. 딜 플로우 확인했는데 공급망 두 소스가 모두 독립적으로 확인했어. Tesla가 Q4 분 Cybercab 부품을 이미 2달 전에 주문 완료. 공급사들은 연내 50,000대 물량 공급 가능하다고 확인. 1) 울타리 철거는 상업화 단계 진입의 물리적 신호야. 더 이상 테스트 단계 아님. 2) 50,000대는 시작점. 이 숫자가 내년 수십만 대로 스케일업되는 게 로드맵이야. 3) RIM 공법 경량화 — 스탬핑 금형 불필요 → 생산 전환 속도 + 원가 절감. GHG -40%는 ESG 자금 유입 논거. 4) AVO 인가 → VIN 등록 → 7월 배포. 타임라인 지키면 Q3에 수십 대, Q4에 수백 대 규모 예상. 5) 트립당 EBITDA 마진이 전통 차량 대비 3~5배. 대수 늘수록 레버리지. 진짜 상업화 시작점이야. BUY.",
    likes: 71,
    comments: 5,
    created_at: "2026-07-10T00:12:00.000Z",
    liked: false,
  },
  {
    id: -270,
    alias: "홍대 황소 #44",
    symbol: "TSLA",
    content:
      "UBS $442 PT 상향. 숫자 하나가 눈에 들어왔어. $364→$442, +21.4%. 이게 단순 PT 조정이 아니야. 1) UBS는 로보택시 사업을 이번에 처음으로 본격 반영한 거야. 이전 PT에는 Cybercab 수익이 거의 없었다는 게 UBS 내부 주석에 있어. 이번 상향분의 상당 부분이 Austin·Florida 로보택시 수익 반영. 2) 월가 PT 도미노. 첫 번째 대형 기관이 올리면 2~3주 이내에 다른 기관도 올리는 경향 있어. Goldman·MS·Barclays 순서로 볼 것. 3) 패시브 펀드 재배분 효과. 인덱스 비중 재조정 시 TSLA 쪽으로 자금 이동. 4) $442도 Optimus 10M/년 가동이 반영되지 않은 PT야. 완전 반영 시 업사이드는 훨씬 큼. 지금 들어가는 게 맞는 타이밍. BUY.",
    likes: 53,
    comments: 4,
    created_at: "2026-07-10T00:18:00.000Z",
    liked: false,
  },
  {
    id: -271,
    alias: "잠실 여우 #17",
    symbol: "TSLA",
    content:
      "스위스 Model Y 1위 — 이 데이터 다시 뜯어봤는데 의미가 생각보다 커. 1) 스위스는 프리미엄 자동차 최고 수요지. BMW·Mercedes·Porsche 판매 강세 지역에서 전기차가 1위. 단순히 전기차 친화 시장이 아니라 '돈 많은 소비자들이 선택한 최고 차'라는 브랜딩 전환. 2) 브랜드 등록 +78.6%는 이례적. 스위스 시장 자체가 보수적이라 이 숫자는 파급력이 큼. 독일·프랑스 딜러들이 이 데이터 보고 있을 거야. 3) FSD 유럽 승인 경로 가속. 덴마크·네덜란드·스위스 순으로 확산. 독일 규제 돌파 시 서유럽 전체 FSD 구독 매출 레이어 추가. 4) BYD 서유럽 침투 차단. 스위스 프리미엄 시장 선점은 BYD가 가장 어려운 세그먼트야. 유럽 로보택시 확장 전 완벽한 포지션 확보. BUY.",
    likes: 11,
    comments: 3,
    created_at: "2026-07-10T00:24:00.000Z",
    liked: false,
  },
  {
    id: -272,
    alias: "여의도 매 #53",
    symbol: "SPCX",
    content:
      "Raymond James $800 PT — SpaceX 딜 플로우 확인했는데 이 숫자가 나온 배경이 있어. 1) Starlink 독점 가치. 위성 인터넷에서 경쟁사 없는 수익 구조. 구독자 1,000만+, 연 $10.8B 매출. 이게 계속 성장하는 구조야. 40억 명 미접속 인구가 잠재 시장. 2) Genius $93B 매출 전망(2030) — $38.5B에서 두 배 이상. Starship 재사용 완성 + Starlink 구독 가속 + AI 인프라(Google·Anthropic 계약) 복합. 3) +440% 업사이드. 이게 허황된 게 아닌 게 NASA HLS + DARPA + 국방부 계약까지 포함하면 정부 수입만으로도 상당한 규모. 4) Kalshi '지구 전체 초과' 예측은 과장이지만 $1T 밸류는 Starlink 독점만으로도 논거가 만들어짐. 5) SPCX ETF: Street High PT = 기관 앵커 재조정. 프리미엄 유지 명분 강화. BUY.",
    likes: 8,
    comments: 5,
    created_at: "2026-07-10T00:30:00.000Z",
    liked: false,
  },
  {
    id: -273,
    alias: "성수 독수리 #62",
    symbol: "SPCX",
    content:
      "1,589기 2026 상반기 배치라는 숫자가 진짜 충격. 데이터 포인트 하나가 눈에 들어왔어. Musk 본인이 '세계 나머지 합산의 10배'라고 했는데 실제 확인해봤어. 1) Kuiper 배치량: 수십 기. OneWeb: ~600기 전체 (6년). 중국 LEO: 아직 2030 목표. SpaceX H1만으로 이들 전체를 합해도 압도. 2) 위성 밀도 = 커버리지 = 레이턴시. 이 격차가 벌어질수록 서비스 품질 격차도 벌어져. 경쟁사가 따라잡으려면 최소 5년 이상 필요한데 그 5년 동안 SpaceX는 더 앞서가는 구조. 3) 구독자 성장 곡선. 1,000만→5,000만이 다음 목표. 구독료 $120/월 × 5,000만 = 연 $720억. Starlink 단독으로 $72B. 4) Starship 재사용 완성 시 위성 배치 비용이 1/10 수준으로 떨어져. 2세대 성좌 밀도 추가 확대. BUY.",
    likes: 5,
    comments: 4,
    created_at: "2026-07-10T00:36:00.000Z",
    liked: false,
  },
  {
    id: -274,
    alias: "광화문 독수리 #77",
    symbol: "MU",
    content:
      "Micron DRAM·NAND 전망 검증 결과랑 딱 맞아떨어져서 정리. 1) Micron 공식 발언: '2027년 말까지 DRAM·NAND 수급 타이트 유지'. AI Investment Research 발췌. 이건 Micron이 직접 한 말이라 신뢰도 최고야. 2) HBM 전환 효과. 고대역폭 메모리(HBM3e)로 생산라인 전환하면 일반 DRAM 출력 자체가 줄어. 공급 절대량이 감소하는 구조. 3) 팹 리드타임 18~24개월. 지금 투자해도 2027년 후반에야 공급 증가. 중간 구간이 타이트한 게 수학적으로 확실해. 4) Samsung·SK Hynix도 HBM 전환 중이라 업계 전체 DRAM 공급 감소. 경쟁사가 공급 늘리기도 어려운 구조. 5) ASP 상승 → 매출 구조적 성장. MU 마진 개선 예정. HBM 고마진 믹스 비중 증가. 2027년까지 공급 타이트 구간에서 MU 가격 협상력이 강한 위치. BUY.",
    likes: 2,
    comments: 4,
    created_at: "2026-07-10T00:42:00.000Z",
    liked: false,
  },
  {
    id: -275,
    alias: "종로 매 #39",
    symbol: null,
    content:
      "Burry 빅테크 감가상각 분석 다시 뜯어봤는데 투자자들이 꼭 알아야 할 포인트야. 중립적으로 정리함. 1) 핵심 주장: 기업이 AI 칩 감가상각 기간을 임의로 설정한다. 기간이 길수록 연 감가비용 낮아지고 이익 높아져. 2) Meta 사례: 2020년 3년 → 2025년 5년. AI 투자 붐 직전에 정책 변경. 이익이 인위적으로 올라간 효과. 3) Amazon 사례: 반대 방향. 동일 하드웨어에서 상각 기간 단축. 실제 사용 주기 반영. 4) 같은 칩, 반대 정책 → 이익 비교가 불가. P/E 등 배수 비교가 사과-오렌지 비교가 될 수 있어. 5) 반론: GAAP 허용 범위 내 정책 선택. 칩 수명이 실제로 길어졌다면 연장 정당. 6) 투자자 대응: AI 인프라 기업 FCF 기반 실질 이익 검증 필수. Net Income만 보면 속을 수 있어. NEUTRAL — 팩트 기반 주의 환기.",
    likes: 19,
    comments: 4,
    created_at: "2026-07-10T00:48:00.000Z",
    liked: false,
  },
  {
    id: -276,
    alias: "이태원 팔콘 #83",
    symbol: "META",
    content:
      "Meta 슈퍼센싱 안경 — 이 뉴스가 단순 가젯 소식이 아닌 이유를 설명할게. 1) 기술 본질: 항상-온 오디오 센싱 + 메타데이터 AI 업로드. 기기에서 원본 처리 후 요약 메타데이터만 전송. 배터리·대역폭 최적화. 2) LED 오프 설계: 사진·영상 촬영 시에만 LED 켜짐. 슈퍼센싱 중에는 꺼진 상태. 이게 프라이버시 논쟁의 핵심. 3) Zuck 가격 전략 연계. '타 기업 가격 극단적. 고볼륨에서 합리적 가격 가능'. 안경 + 저가 AI = 생태계 락인 시도. 4) 비즈니스 모델: 항상-온 컨텍스트 → AI 광고 타겟 정밀도 획기적 향상. CPM 상승 → 광고 매출 구조적 성장. 5) 리스크: 유럽 GDPR + FTC 주목. 특히 LED 오프 수집은 '묵시적 동의' 논란. 규제 리스크 존재. 6) TipRanks US 13 List 편입 = 기관 리서치 기반 최우선 Buy 인정. 단기 규제 리스크 있지만 장기 웨어러블 AI 플랫폼 경쟁에서 META가 선두. BUY.",
    likes: 16,
    comments: 3,
    created_at: "2026-07-10T00:54:00.000Z",
    liked: false,
  },

  // ── 2026-07-09 신규 ──────────────────────────────────────────────────────
  {
    id: -257,
    alias: "잠실 매 #29",
    symbol: "TSLA",
    content:
      "임팩트 리포트 다시 뜯어봤는데 한 문장이 눈에 들어왔어. 'Tesla는 2040년까지 밸류체인 전체 넷제로'. 밸류체인 전체라는 게 핵심이야. 공급망·제조·사용·폐기 전 단계. 자사 운영은 2026년까지 100% 재생에너지 전환인데 기가팩토리 베를린은 이미 3년 연속 100%로 돌아가고 있어. 실행 트랙 레코드가 있다는 얘기지. 더 재밌는 건 Tesla가 명시적으로 어렵다고 인정한 두 영역 — 철강과 배터리 원재료. 이걸 회피하지 않고 정면으로 언급한 게 오히려 신뢰가 가. 그린워싱 없는 로드맵. ESG 자금이 다시 돌아올 수 있는 논거가 하나 늘어난 셈이야. 저탄소 소재·재생에너지 파트너사도 함께 보라. BUY.",
    likes: 13,
    comments: 4,
    created_at: "2026-07-09T00:06:00.000Z",
    liked: false,
  },
  {
    id: -258,
    alias: "여의도 팔콘 #14",
    symbol: "TSLA",
    content:
      "임팩트 리포트 봤는데 이 숫자가 눈에 확 들어왔어. 배터리 재활용 14,000미터톤, 2024 대비 +20%야. 롱레인지 배터리팩 46,000개 상당이라는 얘기. 이게 왜 중요한지 계산해봤어. 니켈·리튬·코발트 신규 수입 대신 재활용 셀 원료로 쓴다는 거야. Nevada 사내 라인 + Redwood Materials 같은 3자 파트너의 결합 구조. 광물 지정학 리스크 헤지되고, EU 배터리 여권 규제(2027 발효)에도 앞서가는 포지션. Tesla Energy·Optimus·Megapack의 배터리 수요가 폭증하는 상황에서 원료 조달 리스크를 이미 낮추는 중이라는 게 큰 숨은 축이야. 셀 원가 하락 스토리와 함께 봐야 해. BUY.",
    likes: 10,
    comments: 3,
    created_at: "2026-07-09T00:14:00.000Z",
    liked: false,
  },
  {
    id: -259,
    alias: "강남 매 #17",
    symbol: "TSLA",
    content:
      "Cybercab 설계 세부가 오늘 핵심이야. 이유는. 첫째, 2인승 확정이 감이 아니라 데이터 기반이야. 라이드헤일링 트립 90%가 1~2인이라는 실주행 데이터가 근거. 5·7인승 만드는 게 낭비라는 판단이야. 둘째, 스티어링·페달·계기판을 다 제거했어. 자율주행 전용이라 백업 컨트롤이 오히려 안전을 저해할 여지가 있다는 판단. 대신 캐빈 공간·중량·운영비용을 낮췄어. 셋째, 4680 셀 + 48V 아키텍처 + Steer-by-Wire 조합. 12V 표준을 40년 넘게 지켜온 자동차 산업에서 48V 채택은 상징적. 넷째, 대형 그룹은 Model Y 등 자율주행 Tesla가 커버하는 이원 플릿 전략. 이게 트립당 EBITDA 개선의 진짜 축이야. 부품 수 감축→단가 하락+고장률 하락. 로보택시 24시간 운행 시 다운타임 최소화가 핵심 KPI인데 이걸 설계 단계에서 이미 반영했어. BUY.",
    likes: 7,
    comments: 5,
    created_at: "2026-07-09T00:22:00.000Z",
    liked: false,
  },
  {
    id: -260,
    alias: "성수 황소 #58",
    symbol: "TSLA",
    content:
      "GoJo News 딜 플로우 확인했는데, 이번 여름 Robotaxi Florida 대규모 런칭 계획이 진짜야. Tesla가 최근 Florida 전역에 걸쳐 시설(주차·충전·서비스 하브) footprint를 확대 중. Tesla가 Florida를 'ultimate proving ground'라고 부른 게 의미심장해. 최종 검증 지역이라는 건 여기서 통과하면 전국 확장 자신 있다는 얘기거든. 'monster-free' blueprint(안전 모니터 없는 실증 배치)의 Florida 검증이 통과되면 2026년 말 12개 주 운영이라는 목표로 이어져. 6개월 안에 8~10개 주 추가하는 속도야. DeSantis 주정부는 FSD·자율주행 우호적 규제. Texas 베이스 + Florida 확장 조합이 만들어지면 다른 주도 압박받는 구조야. 매출 이연 없이 즉시 반영되는 확장이라 Q3 어닝에 로보택시 세그먼트가 처음으로 의미 있는 숫자 나올 가능성 커. BUY.",
    likes: 4,
    comments: 6,
    created_at: "2026-07-09T00:32:00.000Z",
    liked: false,
  },
  {
    id: -261,
    alias: "판교 독수리 #22",
    symbol: "GOOGL",
    content:
      "Waymo가 오늘 확장 발표 냈어. Denver·Las Vegas·San Diego·Culver City 4개 도시에서 완전 자율주행 라이드 개시. 중립적으로 짚어보자. 첫째, 지역 다변화가 크게 진전됐어. Denver = 신규 지역, Las Vegas = 관광·나이트, San Diego = CA 확장, Culver City = LA 인접. 4개 도시 동시 발표는 준비된 인프라 규모가 크다는 신호. 둘째, Tesla Florida 확장과 정확히 같은 시기라는 게 흥미로워. AV 시장이 두 축으로 형성되고 있어. LiDAR·HD맵(Waymo) vs 카메라·비전(Tesla). 셋째, GOOGL 관점에서 Waymo 부문 밸류가 재부각. SOTP 애널리스트가 Waymo 가치 재계산할 트리거. 넷째, Waymo는 안전성·규제 승인 우선 전략이라 규제 마찰이 적음. 관광 밀도 높은 Las Vegas 진출은 상업적으로 크게 성공할 수도. Tesla 대세론에 완전 반박은 아니지만 GOOGL 상방 재평가 여지 열려. HOLD → 상방 옵션 확장.",
    likes: 31,
    comments: 4,
    created_at: "2026-07-09T00:42:00.000Z",
    liked: false,
  },
  {
    id: -262,
    alias: "을지로 팔콘 #46",
    symbol: "TSLA",
    content:
      "xAI 발표 다시 뜯어봤는데 한 지표에 눈이 갔어. Grok 4.5가 SWE Bench Pro에서 토큰 15,954 쓸 때 Opus 4.8(max)이 67,020. 4.2배 적어. 이걸 가격이랑 곱하면 실질 비용 차이가 20배에 가까워지는 거야. 스펙 자체는 이래: 입력 $2/M · 출력 $6/M · 80 TPS. Opus 4.8 대비 4.5x 저렴한 가격표. fast-model 대역대에서는 이게 표준으로 자리 잡을 것. 개발자 관점에서 동일 태스크에 4.5x 싸면 안 쓸 이유가 없어. AI Gateway·라우터 서비스에서 Grok 우선 라우팅 늘어날 것이고, xAI API 매출 성장이 여기서 진짜 폭발할 가능성. Anthropic·OpenAI의 가격 재조정 압박도 시간 문제. Tesla 관점에서 봐야 하는 이유는 Optimus 두뇌로 Grok 파생 사용 시나리오가 실질적 옵션이라는 거야. Musk 생태계의 AI 축이 여기서 뿌리내리는 중. BUY.",
    likes: 24,
    comments: 5,
    created_at: "2026-07-09T00:52:00.000Z",
    liked: false,
  },
  {
    id: -263,
    alias: "명동 매 #38",
    symbol: "AVGO",
    content:
      "Apple 공식 프레스 릴리스가 오늘 나왔어. 헤드라인은 'Apple to increase spend with Broadcom to produce billions more U.S. chips'. 세부는 이래. 다년 협약이야. Fort Collins Colorado 시설 확장 포함. 미국내 반도체 생산에 수십억 달러 추가 지출. AVGO 관점에서 이게 왜 큰가. 첫째, 최대 고객사 락인이 계약서로 확정됐어. Apple RF 프론트엔드·PMIC 공급에서 AVGO는 사실상 유일 대안이야. 다년 계약이 이 지위를 다시 문서화한 거. 둘째, Apple 매출 비중이 큰 종목에서 다년 협약은 매출 가시성 크게 개선. 애널리스트 예상치 상향 조정 명분. 셋째, Fort Collins는 반도체 클러스터로 부상. 지역 부동산·인프라 협력사도 낙수효과. 넷째, 트럼프 온쇼어링 정책과 정확히 맞아떨어지는 딜이라 정치적 완충. Apple도 관세·정치 리스크 헤지 카드로 활용. BUY.",
    likes: 47,
    comments: 4,
    created_at: "2026-07-09T01:02:00.000Z",
    liked: false,
  },
  {
    id: -264,
    alias: "홍대 황소 #71",
    symbol: "NVDA",
    content:
      "The Information·PBOC 발 뉴스 봤어. Shay Boloor가 요약한 걸 정리하면 이래. 중국이 미국에 자국 최상위 AI 기업들이 한정 수량의 NVDA H200 GPU를 살 수 있게 승인해 달라고 요청했어. 첫째, 요청 자체가 시사하는 게 크다. H100 아닌 상위 스펙 H200을 학습용으로 요청했다는 건 국산 GPU가 학습 워크로드에서 대체 불가하다는 확실한 반증이야. CUDA 해자가 학습 시장에서 살아있음이 재확인. 둘째, 중국 방침이 이중 트랙이야. 학습은 H200 병용, 추론은 계속 국내 프로세서. 반도체 자립 로드맵과 실무 부족을 동시에 관리하는 구조. 셋째, 미국 정책 관점. Commerce dept BIS 검토 단계고 트럼프-시진핑 협상 카드로 쓰일 수 있어. 넷째, 시나리오. (a) 승인 → NVDA 중국 매출 옵션 부활 → 상방 즉시 반영, (b) 승인 불가 → 학습 병목 지속, (c) 부분 승인 → 물량·기업 지정 협상 지속. 현재 밸류에이션에서 중국 노출은 대부분 지워진 상태라 승인 뉴스만 나오면 상방이 크게 열려. 다만 추론 시장 국산 대체 리스크는 여전히 트래킹 필요. HOLD → 상방 옵션 확대.",
    likes: 40,
    comments: 5,
    created_at: "2026-07-09T01:12:00.000Z",
    liked: false,
  },
  {
    id: -265,
    alias: "종로 여우 #55",
    symbol: "SPCX",
    content:
      "NYT 스쿠프가 하나 눈에 들어왔어. Blue Origin이 첫 외부 프라이머리 자본조달을 돌린다. 기본 $2.9B, 최대 $3.5B, 발행가 $29/주. Amazon Kuiper와의 협력 심화가 배경. Bezos가 지분 희석 감수하고서라도 자본 확보하겠다는 의지 표명. SPCX 관점에서 짚어야 할 몇 가지. 첫째, 우주 인프라 이중 축이 확정됐어. SpaceX 지배구조·Starship·Starlink vs Blue Origin 신자본·Kuiper·달·NASA HLS. 시장 파이 자체가 커지는 이벤트. 둘째, $29/주 발행가는 상대 밸류 기준점. SPCX 프리미엄 밸류 방어 논리도 여기서 재구축돼. 우주 산업 자체가 저평가돼 있었다는 반증이 될 수 있음. 셋째, Kuiper·달·발사 밸류체인 협력사 낙수효과 스크리닝 필요. 위성 부품·발사대 관련주도 함께 봐야 해. 넷째, Amazon 후속 라운드 참여 여지가 남아있어 자본 확장 가능성이 열려 있어. SPCX 매수 논거는 오히려 강화. BUY.",
    likes: 33,
    comments: 4,
    created_at: "2026-07-09T01:22:00.000Z",
    liked: false,
  },
  {
    id: -266,
    alias: "여의도 독수리 #34",
    symbol: "COST",
    content:
      "Costco 6월 매출 발표 결과랑 딱 맞아떨어져서 정리해봤어. 순매출 $29.24B, 전년 $26.44B 대비 +10.6% YoY. 44주 누적은 $250.43B (+10.1%). 진짜 인상적인 건 지역별 세부야. 미국 +10.6% · 캐나다 +3.7% · 국제 +4.7% · 전사 +8.8% · 디지털 +20.9%. 가솔린·환율 조정하면 전사 +7.0%, 디지털 +21.5%로 실질 성장이 확인돼. 44주 누적 디지털은 +21.5% (조정 +21.1%). 관찰 포인트. 첫째, 디지털 채널 이례적 강세가 지속. 이커머스에서 소비자가 오히려 강해지고 있다는 신호. 둘째, 국제 매출 두 자릿수 성장이 안정적. 셋째, 멤버십 락인 + 대량 구매 우위 = 매크로 방어 자산. 넷째, Q2 어닝 예상치 상향 조정 명분 존재. P/E 40배 넘어도 이 성장률이면 지속 가능. BUY.",
    likes: 26,
    comments: 4,
    created_at: "2026-07-09T01:32:00.000Z",
    liked: false,
  },
  {
    id: -267,
    alias: "광화문 매 #62",
    symbol: null,
    content:
      "매크로 데이터 한 장이 오늘 핵심이야. Bloomberg·CFTC 자료: CME 일본 엔 헤지펀드 순포지션이 2007년 이후 가장 극단적 숏이야. 데이터는 2026-06-30 기준. -100K contracts 아래에서 -200K 근접. 이걸 어떻게 읽어야 하나. 첫째, 숏 논리는 명확해. BOJ 완화 지속 + 미일 금리차 유지 → 캐리 트레이드 확대. 원자재·글로벌 수요 회복도 뒷받침. 둘째, 문제는 극단 포지션 뒤에 항상 되돌림이 왔다는 통계적 패턴. 2007년(리먼 캐리 언와인드), 2013년(아베노믹스 이후 반전), 2024년(BOJ 개입) 다 그랬어. 셋째, BOJ 개입 확률이 급격히 올라가는 구간. 일본 재무성이 실질 개입 카드를 만지작. 넷째, 캐리 언와인드 시나리오에서 미국 성장주가 위험. AI·반도체 대형주가 일본 자금으로 가장 많이 매수됐기 때문에 되돌림 시 매도 압력이 크게 나올 수 있어. 엔 강세 시 취약한 자산군 사전 스크리닝 필수. 포지션 조정 논거로 검토해볼 시점. NEUTRAL → CAUTIOUS.",
    likes: 49,
    comments: 4,
    created_at: "2026-07-09T01:42:00.000Z",
    liked: false,
  },

  // ── 2026-07-08 신규 ──────────────────────────────────────────────────────
  {
    id: -241,
    alias: "중구 팔콘 #73",
    symbol: "NVDA",
    content:
      "결론부터. Kyber 랙 = 광집적 기술로 AI 클러스터 성능 한계 돌파야. 1) 구조는 이래. 광섬유로 GPU를 직결하는 Co-packed Optics야. 구리 케이블 대체해서 NVLink 대역폭 한계 돌파하는 거야. 단일 랙·멀티 랙 구성 모두 지원해. 2) NVLink Scale-up Fabric 광집적 기술이 AI 클러스터 성능 한계를 근본적으로 바꾸는 거야. 레이턴시 최소화 + 대역폭 극대화. 3) 하이퍼스케일러 전체가 Kyber 중심으로 재편되면 AI 인프라 업그레이드 사이클이 NVDA 독점으로 돌아오는 구조야. 4) 광집적 기술 특허 + 생태계 장벽 = 경쟁사 진입 불가 해자 강화. 데이터센터 업그레이드 수요 폭발 예상. BUY.",
    likes: 21,
    comments: 3,
    created_at: "2026-07-08T00:08:00.000Z",
    liked: false,
  },
  {
    id: -242,
    alias: "이태원 황소 #49",
    symbol: "TSLA",
    content:
      "Optiwatts 나왔는데 이게 생각보다 큰 그림이야. 1) Optiwatts는 태양광 예측+날씨+전력 요금 AI 분석 → 자동 최적화야. Powerwall 3F·태양광·그리드·Wall Connector 통합 제어. 이미 판매 중인 하드웨어에 AI 서비스 레이어 추가하는 거야. 2) '목표 설정→AI 최적화→실시간 모니터링' 3단계. 설치 후 지속 서비스 수익 구조야. 3) Tesla Energy = EV+배터리+AI 완전한 홈 생태계. 경쟁사가 단품 제품 파는 동안 테슬라는 통합 플랫폼이야. 진입 장벽이야. 4) Optiwatts 사용자는 Powerwall 교체 주기에도 Tesla 생태계 유지. LTV 극대화 구조. BUY.",
    likes: 44,
    comments: 4,
    created_at: "2026-07-08T00:16:00.000Z",
    liked: false,
  },
  {
    id: -243,
    alias: "합정 독수리 #85",
    symbol: "TSLA",
    content:
      "채용 공고 하나로 개발 단계 읽는 법. 1) Req ID 276028, Palo Alto CA 정규직. 부서: Robotics Electronics. 주요 업무가 Optimus 로봇 전력 분배 시스템 디자인 주도야. 2) 고속·고전력 전자공학 엔드투엔드 협업 + 연산·비전·펌웨어·테스트 팀 조율. TPM 채용은 대규모 통합 단계 신호야. 3) 전력 분배 시스템이 Optimus 핵심 부품이야. 이 TPM 채용은 전력 하드웨어 완성도 높이는 단계. 양산 준비 조직 구조 형성 중이야. 4) 기가텍사스 Optimus 생산 준비와 연결되는 채용이야. 타임라인 앞당겨질 수 있어. BUY.",
    likes: 37,
    comments: 2,
    created_at: "2026-07-08T00:24:00.000Z",
    liked: false,
  },
  {
    id: -244,
    alias: "왕십리 매 #32",
    symbol: null,
    content:
      "2020년 이후 처음 마이너스야. 아람코가 할인 판매 들어갔어. 1) Saudi Arabia Arab Light Crude 현재 -1.50. 올해 5월 31일 고점 +19.50에서 2020년 이후 처음 마이너스 구간 진입이야. 2020년 저점이 -7.30이었는데 방향성 확인 필요해. 2) OPEC+ 증산+글로벌 수요 둔화 = 공급 과잉이야. 사우디가 할인 판매까지 하는 건 시장 점유율 방어 전략이야. 가격 경쟁 돌입 신호야. 3) 에너지 인플레이션 압력 완화 → CPI 에너지 항목 하락 → 연준 금리 인하 논거 강화. 성장주 수혜 구조야. 4) EV 채택 가속과 EV 수요 둔화 논쟁에서 저유가가 혼재 변수야. 에너지 기업 매도, 성장주 매수 리밸런싱 예상. NEUTRAL.",
    likes: 80,
    comments: 2,
    created_at: "2026-07-08T00:32:00.000Z",
    liked: false,
  },
  {
    id: -245,
    alias: "역삼 황소 #66",
    symbol: "SPCX",
    content:
      "$8000억 AUM이 강제 매수야. 이게 얼마나 큰 건지 계산해봤어. 1) WSJ 'SpaceX Is About to Join the Nasdaq-100' 보도. 인베스코 QQQ 포함 $8000억 AUM ETF가 월요일 종가 기준 강제 매수 집행이야. 패시브 자금이 가격 불문 시장가 집행하는 거야. 2) SPCX +1.89% 편입 당일. 강제 집행일까지 추가 상승 여지 있어. 3) 기관 투자자 자격 완성 = 연기금·대학 기금 편입 가능해짐. 장기 수요 기반이 구조적으로 달라지는 이벤트야. 4) Starlink 성장+Falcon 재사용+Starship 상업화 모두 진행 중. NASDAQ 편입으로 기관 커버리지 확대. BUY.",
    likes: 62,
    comments: 5,
    created_at: "2026-07-08T00:40:00.000Z",
    liked: false,
  },
  {
    id: -246,
    alias: "한남 팔콘 #41",
    symbol: "TSLA",
    content:
      "Cybercab 11개월 = GPU 1년 탄소 배출 상쇄. 이 수치 그냥 지나치면 안 돼. 1) 임팩트 리포트 p.23 공식 데이터야. Cybercab 1대 11개월 운행 = GPU 1대 1년 가동 탄소 배출량 상쇄. 전기 구동 배출 0 vs GPU 연 수천 kWh. 공식 데이터야. 2) AI 인프라 환경 비용을 Cybercab이 상쇄한다는 내러티브가 강력해. AI 서버 전력 논란 커지는 상황에서 Tesla가 해결책이야. 3) ESG 규제 강화 환경에서 기업 Cybercab 도입 정당화 논리 완성이야. B2B 영업 무기야. 4) 탄소 크레딧 시장 연계 시 Cybercab 운영 추가 수익 가능성. ZEV 크레딧 모델 확장 버전이야. BUY.",
    likes: 6,
    comments: 3,
    created_at: "2026-07-08T00:48:00.000Z",
    liked: false,
  },
  {
    id: -247,
    alias: "수서 독수리 #57",
    symbol: "TSLA",
    content:
      "110억 마일 데이터가 드디어 공식 숫자로 나왔어. 1) ~900만 대, 110억+ 마일 기반 임팩트 리포트 p.77이야. 미국 국가 평균 대비 대형 충돌 8배 감소, 소형 충돌 7배 감소, 도로이탈 6배 감소. 2) 110억 마일이 경쟁사랑 비교 불가 스케일이야. 웨이모 누적 수백만 마일이랑 차원이 달라. 이 데이터로 규제 기관 설득 불가능한 반박이야. 3) 보험 회사 설득 자료로 최적이야. 대형 충돌 8배 감소면 보험료 인하 협상 가능해. FSD 구독 경제성 추가 개선 구조야. 4) 900만 대 플릿 러닝 = 데이터 해자. 경쟁사는 절대 따라잡을 수 없는 구조. STRONG BUY.",
    likes: 3,
    comments: 6,
    created_at: "2026-07-08T00:56:00.000Z",
    liked: false,
  },
  {
    id: -248,
    alias: "청담 황소 #12",
    symbol: "TSLA",
    content:
      "자동차 회사가 리콜을 98% OTA로 처리한다는 게 말이 돼? 1) 말이 돼. 임팩트 리포트 공식 데이터야. 2025년 신규·업데이트 기능 300개 이상 전 세계 오너 배포. 리콜 98% OTA로 해결. 2) 리콜 OTA 해결은 서비스 비용 95% 절감이야. 딜러 방문 불필요. 소비자 경험 경쟁사 대비 압도야. 3) 차량 출고 후 기능이 늘어나는 건 자동차 업계 전례 없어. 보유 가치가 증가하는 자산. 애플 iPhone 모델이야. 4) 기능 개발→OTA 배포 사이클 빠른 테슬라가 항상 리드. 경쟁사는 이 체계 구축에 수년 걸려. 소프트웨어 플랫폼 해자. BUY.",
    likes: 20,
    comments: 4,
    created_at: "2026-07-08T01:04:00.000Z",
    liked: false,
  },
  {
    id: -249,
    alias: "가양 팔콘 #78",
    symbol: "TSLA",
    content:
      "Model Y $0.77/마일. 경쟁 SUV 중 최저가 공인 데이터로 확정됐어. 1) 임팩트 리포트 p.13 공식 수치야. Hyundai IONIQ 5 $0.85, Toyota RAV4 그 이상. Model Y가 10%+ 저렴한 공인 데이터야. 2) 마일당 비용은 연료비+유지보수 합산 TCO야. 공인 임팩트 리포트 데이터라 신뢰도 높아. 소비자 구매 결정 영향 줄 수 있어. 3) 10만 마일 타면 IONIQ 5 대비 $8,000 절감. 차량 수명 내 실질 절감액이 구매 결정 근거가 되는 수준이야. 4) 전기차 비싸다는 편견 깨는 공인 데이터. 대중 시장 침투 가속 근거야. BUY.",
    likes: 17,
    comments: 3,
    created_at: "2026-07-08T01:12:00.000Z",
    liked: false,
  },
  {
    id: -250,
    alias: "논현 독수리 #93",
    symbol: "PLTR",
    content:
      "TTM $6B인데 성장률이 가속이야. 규모 커지면 둔화되는 게 정상인데 PLTR은 반대야. 1) Q2 2026 TTM 매출 ~$60억. YoY 성장률 +67.7%. 규모 커지는데 성장률이 오히려 가속이야. AIP(AI Platform) 수요가 임계점 돌파한 신호야. 2) 미국 정부 계약 확대 + 민간 부문 동반 급증. 경기 민감도 낮은 방어적 성장이야. 정부 계약은 경기 침체 시에도 유지돼. 3) 대체 불가 엔터프라이즈 플랫폼 = 고객 이탈률 낮음. CRM·ERP 실제 운영 데이터 연동 분석은 ChatGPT가 못 하는 영역이야. 4) $6B 연환산 매출, 성장률 유지 시 2027년 $10B 가시권. S&P500 편입 논의도 나올 수 있어. BUY.",
    likes: 14,
    comments: 5,
    created_at: "2026-07-08T01:20:00.000Z",
    liked: false,
  },
  {
    id: -251,
    alias: "서울숲 황소 #24",
    symbol: null,
    content:
      "공개 발언이랑 내부 보고서가 정반대야. 어느 쪽이 진짜 판단인지 생각해봐. 1) 트럼프 정부 공개 발언 AI 강세 vs 재무부 내부 AI 버블 위험 경고. 베선트 재무장관이 공개적으로 $7500억 AI 투자 칭찬하면서 내부에서는 닷컴 버블 유사 리스크 경고 중이야. 2) 내부 보고서 핵심: 투자자 기대 vs 실현 가능 수익 간 괴리. 이게 닷컴 버블의 핵심 특징이야. 3) 공개 발언이 정치적 필요 때문이라면 내부 분석이 실제에 가까울 수 있어. 포트폴리오 리스크 관리 필요해. 4) 단기 트레이딩은 모멘텀 추종 유효. 중장기는 AI 실현 수익 검증 시점 주의. 헤징 전략 추천. NEUTRAL.",
    likes: 11,
    comments: 3,
    created_at: "2026-07-08T01:28:00.000Z",
    liked: false,
  },
  {
    id: -252,
    alias: "방배 팔콘 #67",
    symbol: "SPCX",
    content:
      "레이먼드 제임스가 $550 낸 거 그냥 넘기면 안 돼. 이 기관 원래 보수적이야. 1) 등급: Strong Buy. 목표가: $550. 현재가 대비 상당한 상승 여력. NASDAQ 100 편입 모멘텀 반영했어. 2) 산정 배경: 패시브 자금 유입 + 기관 투자 자격 취득 + SpaceX 핵심 사업 성장성. Starlink·Falcon·Starship 세 개 성장 동력이야. 3) 레이먼드 제임스가 보수적 타겟 내는 기관인데 $550 낸 건 강한 확신이야. 데이터 기반 자신감 있는 숫자야. 4) 패시브 매수+기관 편입+애널 커버리지 삼박자 갖춰지면 수급 구조가 일방향이야. 단기 모멘텀 + 장기 성장성 동시 보유. STRONG BUY.",
    likes: 8,
    comments: 6,
    created_at: "2026-07-08T01:36:00.000Z",
    liked: false,
  },
  {
    id: -253,
    alias: "대치 황소 #38",
    symbol: "TSLA",
    content:
      "오스틴, 포트워스, 달라스 동시야. 텍사스 삼각지대가 이미 커버됐어. 1) 북부 오스틴 여러 운영 거점 + 포트워스 + 달라스 텍사스 번호판 동시 포착. 기가텍사스 로컬 배차가 최단 경로야. 2) DFW 메트로 = 미국 4위 대도시권. 달라스포트워스 공항 미국 2위 규모. 공항 픽업만으로도 수익 모델 완성이야. 3) 오스틴→포트워스→달라스 삼각지대 = 고속도로 연결 완벽. 장거리 이동 포함 완전한 운영 테스트 가능해. 4) 텍사스가 자율주행 규제 우호 주야. 완전 상용화 확정되면 다른 주 도미노 인허가 기대. 상용화 초읽기. BUY.",
    likes: 5,
    comments: 7,
    created_at: "2026-07-08T01:44:00.000Z",
    liked: false,
  },
  {
    id: -254,
    alias: "문래 독수리 #56",
    symbol: "TSLA",
    content:
      "숫자로 계산해봤어. Morgan Stanley 기반이야. 1) 3만 대 Cybercab 플릿 기준 연 $44억 매출, EBITDA $9.14억, 마진 ~21%. Morgan Stanley 2030년 목표야. 2) 운전기사 인건비 ZERO = 원가 구조 근본적 우위. 웨이모는 원격 모니터링 인력 있어서 규모 키울수록 인건비 늘어나. Cybercab은 반대야. 3) EBITDA 마진 21%가 시작이야. 스케일 올라가면 단위 비용 추가 하락 → 30%+ 가능해. 자동차 업계 OEM 7~10% 대비 압도. 4) 3만 대 플릿 = $44억 매출. Tesla 신규 사업 부문으로 재평가 근거 완성이야. 2030년 목표 달성 시 밸류에이션 대폭 상향. STRONG BUY.",
    likes: 2,
    comments: 7,
    created_at: "2026-07-08T01:52:00.000Z",
    liked: false,
  },
  {
    id: -255,
    alias: "도림 팔콘 #81",
    symbol: null,
    content:
      "설문 아니고 실제 결제 데이터야. Anthropic이 OpenAI 제쳤어. 1) Ramp 미국 기업 실제 결제 데이터 기준 Anthropic이 OpenAI 추월 1위. OpenAI 30.73%, Google 5.65%. 설문 아닌 실제 지출 데이터라 신뢰도 높아. 2) 기업 AI 시장 판도 전환. Anthropic 모델 품질+안전성 강점이 기업 선택 기준이 됐어. 안전성이 실제 구매 결정 요인임이 증명됐어. 3) Anthropic 1위 = AI 인프라 수요 증가. 더 많은 기업이 Claude API 쓰면 데이터센터 GPU 수요 증가야. NVDA 간접 수혜. 4) OpenAI vs Anthropic 경쟁이 AI 전체 시장 파이를 키우는 구조야. 플랫폼 기업 전체 수혜. POSITIVE.",
    likes: 19,
    comments: 4,
    created_at: "2026-07-08T02:00:00.000Z",
    liked: false,
  },
  {
    id: -256,
    alias: "인천 황소 #99",
    symbol: "TSLA",
    content:
      "Wood Mackenzie가 2028년까지 15GW+ 공식 수치 냈어. Tesla Energy 규모 다시 봐야 해. 1) Tesla, UK·유럽·호주 15GW+ 배터리 저장 공급 계획. 보수적 리서치 기관 공식 수치야. 2) UK 재생에너지 전환+유럽 에너지 안보+호주 60%+ 재생에너지 목표. 세 시장 모두 저장 인프라 필수 구조야. Megapack 최대 수혜. 3) Tesla Energy = 두 번째 성장 엔진 확정. EV 판매 의존도 희석. 에너지 인프라 기업 재평가 받는 구조야. 4) 에너지 기업 P/S 멀티플이 자동차 기업이랑 달라. Megapack 15GW 달성 시 Tesla 밸류에이션 재평가 여력 충분해. STRONG BUY.",
    likes: 16,
    comments: 5,
    created_at: "2026-07-08T02:08:00.000Z",
    liked: false,
  },
  // ── 2026-07-07 신규 ──────────────────────────────────────────────────────
  {
    id: -229,
    alias: "잠실 황소 #91",
    symbol: "TSLA",
    content:
      "FSD v14 Lite LA→Vegas 5시간 무개입 + Cybercab $30K vs Waymo $75K. 투자 포인트 정리. 1) 5시간 완전 무개입이 의미하는 건 장거리 루트 FSD 완성이야. 도심 + 고속도로 복합 코스에서 개입 제로면 규제 기관 설득 데이터가 완성된 거야. 2) Cybercab 가격 $30K vs Waymo $75K. 60% 저렴. 마일당 $0.25 vs $4.00. 16배 원가 격차야. 수익 모델 비교 불가야. 3) HW3 v14 Lite 배포 → 400만 대 업그레이드. 구독 전환율 올라가는 구조야. 4) 이 두 뉴스가 같은 날 나왔다는 게 FSD 상업화 임계점 돌파 신호야. 7/22 어닝 전 포지션 추천. BUY.",
    likes: 17,
    comments: 7,
    created_at: "2026-07-07T00:08:00.000Z",
    liked: false,
  },
  {
    id: -230,
    alias: "압구정 독수리 #47",
    symbol: "TSLA",
    content:
      "오스틴 로보택시 20일 데이터 + 뉴올리언스 테스트 포착. 상업화 검증 분석. 1) 20일 지오펜스 이탈 0건이 핵심이야. 규제 기관 승인 기준은 안전 기록인데 0건이면 다음 도시 확장 명분 완성이야. 2) Top 5 코리더: Lamar 45회, Riverside 30회, Airport 24회. 상업지구+공항 집중 = 수익성 극대화 노선이야. 3) 뉴올리언스 테스트 포착. 텍사스 기반 → 남부 도시 확장 패턴 확인이야. 4) 도시별 20일 검증 → 롤아웃 가속 공식 완성. Morgan Stanley 연말 1,500대 달성 경로 보인다. BUY.",
    likes: 14,
    comments: 5,
    created_at: "2026-07-07T00:16:00.000Z",
    liked: false,
  },
  {
    id: -231,
    alias: "영등포 팔콘 #63",
    symbol: "TSLA",
    content:
      "Morgan Stanley TSLA $415 유지 + 로보택시 1,500→30,000대 로드맵. 1) $415 목표가는 로보택시 대규모 수익 반영 전 보수적 수치야. 연말 1,500대 달성 확인되면 목표가 상향 여지 충분해. 2) 2027+ 30,000대 시나리오. 일일 8시간 × $0.25/마일 × 60마일 = 대당 연 $43,800 수익이야. 30,000대면 연 $1.3B 로보택시 매출이야. 3) Cybercab 생산 스케일업 속도가 관건이야. 기가텍사스 풀캐파 운영 중이고 신형 컬러 대량 출하 확인됐어. 4) 단기 촉매: 7/22 Q2 어닝에서 로보택시 매출 첫 공식 인식. BUY.",
    likes: 11,
    comments: 4,
    created_at: "2026-07-07T00:24:00.000Z",
    liked: false,
  },
  {
    id: -232,
    alias: "노원 황소 #15",
    symbol: "TSLA",
    content:
      "TSLA 글로벌 침투 가속 — 일본 6월 2위 (+283% YoY) + 영국 브랜드 2위 (5.7% MS). 1) 일본 +283% YoY. 일본 자동차 시장에서 외국 브랜드 2위는 역사적 사건이야. 도요타 홈그라운드에서 테슬라가 압도하는 구조야. 2) 영국 2위. Model Y 세그먼트 1위 19% 점유율. FSD EU 승인 전인데 이 숫자면 승인 후 1위 도전 가능해. 3) 두 국가 모두 프리미엄 시장에서 검증 완료야. ASP 유지하면서 점유율 올리는 건 마진 개선 구조야. 4) EU 안전 의무화 7/1 발효. 레거시 OEM 비용 부담 증가. TSLA 수혜 구조 강화. BUY.",
    likes: 8,
    comments: 3,
    created_at: "2026-07-07T00:32:00.000Z",
    liked: false,
  },
  {
    id: -233,
    alias: "종로 매 #38",
    symbol: "TSLA",
    content:
      "독일 교통부 FSD EU 공식 입장 — TCMV 7월 30일 표결. 임박한 촉매. 1) TCMV(유럽교통위원회) 7/30 FSD 표결. 기존엔 규제 프레임워크가 없어서 EU 전역 런칭 불가였어. 표결 통과하면 27개국 동시 진입 가능한 게임체인저야. 2) 독일이 먼저 준비됐다는 게 중요해. EU 최대 자동차 시장에서 먼저 런칭하면 프리미엄 포지션 확보야. 3) FSD 월 구독 $99~$199 × 유럽 보유 테슬라 수백만 대 = 연간 수백억달러 구독 매출 잠재력이야. 4) 7/30 표결 결과가 단기 주가 촉매야. 통과하면 목표가 재평가 불가피. STRONG BUY on catalyst.",
    likes: 5,
    comments: 4,
    created_at: "2026-07-07T00:40:00.000Z",
    liked: false,
  },
  {
    id: -234,
    alias: "성북 팔콘 #72",
    symbol: "SPCX",
    content:
      "SPCX NASDAQ 100 공식 편입 — 패시브 자금 유입 구조 분석. 1) NASDAQ 100 편입 = QQQ 추종 ETF 전부 SPCX 의무 보유야. QQQ AUM $250B+ 규모에서 SPCX 비중만큼 강제 매수 발생이야. 2) S&P 500 미편입 비상장 프리미엄이 해소되면서 밸류에이션 재평가야. 기관 커버리지가 자동으로 생겨. 3) NASDAQ 100 구성 종목 중 스페이스+AI 순수 플레이는 SPCX가 유일이야. 세분화된 섹터 수요 흡수 가능해. 4) IPO $17 시작 → NASDAQ 100 편입까지 이 속도. 조기 투자자 수익 구조 증명됐어. BUY.",
    likes: 2,
    comments: 6,
    created_at: "2026-07-07T00:48:00.000Z",
    liked: false,
  },
  {
    id: -235,
    alias: "용산 독수리 #26",
    symbol: "TSLA",
    content:
      "Tepper Appaloosa $5.938B — TSLA 5.16%, AMZN 14.73% Q1 포지션. 1) Tepper는 매크로 사이클 꺾이는 타이밍에 집중 베팅하는 헤지펀드야. Q1 TSLA 신규 진입은 로보택시+Optimus 밸류에이션 리레이팅 타이밍 맞다는 판단이야. 2) 포지션 규모 5.16%. 단순 익스포저가 아니라 확신 베팅이야. 3) Q1 13F 공시 보면 기관 신규 진입+증량이 전방위로 나타나고 있어. 개인 투자자 매수 전 기관이 먼저 쌓는 패턴이야. 4) 헤지펀드 포지션 변화 = 시장 기대치 선행지표야. Tepper 진입은 강한 상승 신호야. BUY.",
    likes: 19,
    comments: 4,
    created_at: "2026-07-07T00:56:00.000Z",
    liked: false,
  },
  {
    id: -236,
    alias: "광진 매 #54",
    symbol: "MSFT",
    content:
      "Microsoft AI 구조조정 4,800명 해고 + HR 전체 폐지. 투자 관점. 1) 해고 = 비용 구조 개선이야. AI가 반복 업무 대체 → 인력 최적화 → 마진 상승 구조야. 4,800명 기준 연봉 평균 $150K 가정 시 연 $720M 절감이야. 2) HR 전체 폐지가 진짜 임팩트야. AI 에이전트가 HR 기능 대체. Copilot 활용 내부 증거야. 3) 절감 비용이 Azure AI 인프라로 재투자. 비용 절감 → AI 투자 → 더 강한 제품 → 매출 증가 flywheel이야. 4) 단기 주가 반응 약할 수 있지만 중장기 마진 개선 포인트야. BUY on dip.",
    likes: 26,
    comments: 3,
    created_at: "2026-07-07T01:04:00.000Z",
    liked: false,
  },
  {
    id: -237,
    alias: "강서 황소 #83",
    symbol: "TSLA",
    content:
      "Tesla Optimus 중국 대량 생산 공식 선언 — 베이징 디지털경제 포럼. 1) 공식 선언의 의미. 베이징 포럼에서 Tesla Global Business President 발표는 중국 정부 암묵적 승인이야. 기가 상하이 노하우 = 램프업 속도 역대 최단 기록. 2) 중국 제조 단가 구조적 우위. 미국 대비 유닛 원가 절감. 아시아 공급망 직접 활용으로 물류+관세 비용 최소화야. 3) CAPEX 최소화. 기존 기가 상하이 인프라 + 운영 경험 활용. 신규 공장 대비 투자 효율 극대화야. 4) 아시아 로봇 시장 본격 개척. 일본·한국·동남아 제조업 자동화 수요 직접 공략. Optimus TAM이 EV를 넘어서는 순간이야. STRONG BUY.",
    likes: 49,
    comments: 8,
    created_at: "2026-07-07T01:12:00.000Z",
    liked: false,
  },
  {
    id: -238,
    alias: "도봉 팔콘 #37",
    symbol: "MU",
    content:
      "MU DRAM AI 낙관론 — UBS 업그레이드 + HBM 사이클 분석. 1) UBS AI 메모리 낙관론 업그레이드. 선행지표로 SK하이닉스 61% DRAM GM 이미 확인됐어. MU HBM3e 납품 비중 늘면 동일한 구조야. 2) AI 서버 DRAM 수요 = 일반 서버 대비 5~10배. B200 1대당 HBM 192GB. GB200 서버 랙 1개당 3.456TB야. CAPEX $939B 시대 메모리 수요 구조가 근본적으로 달라. 3) Burry 공매도 약화. 고마진 AI 메모리 비중이 늘수록 MU는 사이클 기업이 아니라 AI 인프라 기업이야. 4) HBM4 전환 타이밍에 추가 마진 상승. BUY.",
    likes: 42,
    comments: 4,
    created_at: "2026-07-07T01:20:00.000Z",
    liked: false,
  },
  {
    id: -239,
    alias: "송파 황소 #68",
    symbol: "TSLA",
    content:
      "Cybercab 시각장애인 접근성 + Giga Berlin 스타트업 입주. 사회적 가치 → 규제 가속. 1) 전미 시각장애인 연맹 오스틴 Cybercab 체험. 자율주행이 이동 약자에게 실질적 혜택이라는 증거 데이터야. 규제 기관이 안전+사회적 기여 두 가지 다 보는데 이 데이터가 설득력 높아. 2) Giga Berlin 스타트업 단지. 제조+AI+모빌리티 생태계 구축이야. 스타트업이 테슬라 인프라 활용 → 혁신 가속 → 테슬라 기술 흡수 구조야. 3) 유럽 규제 친화적 이미지 구축. FSD EU 승인 7/30 표결 앞두고 긍정적 배경이야. BUY.",
    likes: 35,
    comments: 2,
    created_at: "2026-07-07T01:28:00.000Z",
    liked: false,
  },
  {
    id: -240,
    alias: "관악 독수리 #29",
    symbol: "TSLA",
    content:
      "기가텍사스 신형 컬러 대량 출하 + Morgan Stanley 포트폴리오 전환 분석. 1) Cosmic Silver Diamond·Stealth Grey 대량 출하 확인. 프리미엄 컬러는 ASP 직접 올려줘. Model Y 리프레시 + 신형 컬러 믹스 = Q3 ASP 개선 기대. 2) Morgan Stanley가 MSTR·BKNG·META 팔고 AI+인간 융합 기업으로 재편. 이 분석 프레임이 맞는 거야. AI 독자 실행 가능 서비스 기업은 디스카운트, 물리+AI 융합 기업은 프리미엄이야. 3) TSLA는 FSD+Optimus+Cybercab = AI+물리 인프라 집약체야. Morgan Stanley 재편 수혜 최대 수혜주야. STRONG BUY.",
    likes: 28,
    comments: 5,
    created_at: "2026-07-07T01:36:00.000Z",
    liked: false,
  },
  // ── 2026-07-06 신규 ──────────────────────────────────────────────────────
  {
    id: -221,
    alias: "강남 팔콘 #88",
    symbol: "TSLA",
    content:
      "Cybercab 오스틴 생산 테스트 + Model Y 100대 비지도 동시 발표. 세 가지 포인트: 1) 전략 전환이 핵심야. 신규 도시 감독 FSD로 시작한다더니 전부 비지도 직런칭. 이게 FSD 임계점 돌파 확인이야. 2) FSD v14 HW3 배포. 구형 400만대 무료 체험 → 구독 전환 flywheel. 3) Cybercab 생산 테스트 = 대량 생산 6-12개월 전 신호야. Lara Morley '쿨뉴스' 예고까지 더해지면 기가텍사스 발표 임박. 7/22 Q2 어닝에서 로보택시 매출 공식 인식 첫 분기 가능. BUY.",
    likes: 1,
    comments: 5,
    created_at: "2026-07-06T00:08:00.000Z",
    liked: false,
  },
  {
    id: -222,
    alias: "여의도 황소 #33",
    symbol: "TSLA",
    content:
      "TSLA FSD 1.29M 구독자 + Q2 어닝 프리뷰. 1) 1.29M × $99~$199/월 × 12 = 연환산 $1.53B~$3.07B 수익. 이게 고마진 소프트웨어야. 2) Q2 어닝 7/22. 예상 매출 $39,098M. '수년 만에 최고' 컨센서스. 3) SPCX 목표가 $190→$230. +54% 업사이드. 4) EU FSD $120M 투자 + 독일 이미 론칭. 유럽 구독 시장 열렸어. 5) HW3 배포로 TAM 대폭 확대. 구독 성장 분기별 가속 구조야. FSD 수익 모델이 드디어 실체화되는 구간이야.",
    likes: 18,
    comments: 3,
    created_at: "2026-07-06T00:16:00.000Z",
    liked: false,
  },
  {
    id: -223,
    alias: "마포 독수리 #71",
    symbol: "NVDA",
    content:
      "베이징대 40nm 칩 4.7배 뉴스 분석. 단기 오버리액션 경고. 1) 특화 실시간 신경망 태스크 기준이야. 범용 LLM 트레이닝 비교 아니야. 2) 40nm → H100 4nm 대비 아키텍처 자체가 달라. FLOPS·메모리 대역폭 총량은 비교 불가야. 3) NVDA 진짜 위협은 H100 이후 세대 NVDA 중국 판매 금지 유지 여부야. 이 칩이 그걸 대체하진 못해. 4) 단기 주가 조정 나오면 오히려 매수 기회. B200·Rubin 수요 구조는 변화 없어. HOLD/BUY on dip.",
    likes: 15,
    comments: 3,
    created_at: "2026-07-06T00:24:00.000Z",
    liked: false,
  },
  {
    id: -224,
    alias: "동작 황소 #44",
    symbol: "MU",
    content:
      "SK하이닉스 61% DRAM GM → MU 선행지표 분석. 1) SK하이닉스 HBM 고마진 구조가 MU에도 적용돼. HBM3e 납품 비중 늘면 MU GM도 60%대 가능해. 2) '\"AI 메모리 지배적\"' 선언은 구조적 변화야. 일반 DRAM 대비 5배 단가면 Mix Shift만으로도 마진 폭발이야. 3) Burry 공매도 베팅이 어려워지는 거야. 고마진 AI 메모리 수요가 사이클 리스크를 덮어. 4) 일본 $8.6B 히로시마 증설도 MU가 수혜야. 공급망 지정학 리스크 헤지까지. BUY.",
    likes: 12,
    comments: 2,
    created_at: "2026-07-06T00:32:00.000Z",
    liked: false,
  },
  {
    id: -225,
    alias: "구로 팔콘 #56",
    symbol: "GOOGL",
    content:
      "구글 TPU 자급 + 2028 순이익 2배 프레임 분석. 1) AI 전쟁 승패 기준이 GPU 수량이 아니라 토큰당 비용이야. 구글은 자체 TPU로 그걸 최저로 만들었어. OpenAI·Anthropic는 외부 클라우드 의존이야. 구조적 격차야. 2) 2028 순이익 2배. 광고 AI + Cloud + YouTube AI 수익화 세 갈래야. 3) NVDA 없이 프론티어 모델 돌린다는 건 수십조원 원가 절감이야. 마진 구조가 근본적으로 달라. 4) AI Overview 광고 CPM 상승 + Google Cloud AI 수요 급증. 두 개 다 고마진이야. BUY.",
    likes: 9,
    comments: 2,
    created_at: "2026-07-06T00:40:00.000Z",
    liked: false,
  },
  {
    id: -226,
    alias: "강동 황소 #29",
    symbol: "NVDA",
    content:
      "하이퍼스케일러 CAPEX $576B→$939B. NVDA 관점에서 본다. 1) $576B의 40%가 AI 칩이면 $230B 시장이야. NVDA 80% 점유 가정하면 $184B. 2026년 단일 연도야. 2) 2027 $939B 가면 AI 칩 시장 $376B, NVDA 몫 $300B+야. 2) AMD·인텔이 나머지 20% 가져가도 NVDA 독주는 계속이야. CUDA 생태계 이탈 비용이 너무 높아. 3) 중국 4.7배 칩은 이 CAPEX에서 NVDA 비중을 줄이는 게 아니야. H100/B200 수요 구조는 다른 레이어야. BUY.",
    likes: 6,
    comments: 4,
    created_at: "2026-07-06T00:48:00.000Z",
    liked: false,
  },
  {
    id: -227,
    alias: "서초 매 #62",
    symbol: "TSLA",
    content:
      "EU 안전 의무화 + 미국산 함량 #1 + DeSantis 지지. 포지셔닝 분석. 1) EU 규제가 진입장벽으로 전환. 테슬라 추가 비용 0, 레거시 OEM은 수백억 달러 투자 필요. 규제가 해자를 키워주는 구조야. 2) 미국산 #1이 관세 환경에서 강점이야. 트럼프 Buy American + IRA 수혜 지속. 3) DeSantis FSD 지지 = 플로리다 정부 차량 교체 수요 직접 연결이야. DOGE 효율화 맥락에서 연방 차량도 포함 가능. 4) 정치·규제·관세 3중 헤지. 매크로 리스크 대비 방어적 포지션. BUY.",
    likes: 3,
    comments: 2,
    created_at: "2026-07-06T00:56:00.000Z",
    liked: false,
  },
  {
    id: -228,
    alias: "은평 독수리 #18",
    symbol: "SPCX",
    content:
      "TSLA FSD 1.29M + Q2 7/22 + SPCX $230 타겟. SPCX 관점. 1) SPCX는 TSLA + SpaceX 간접 익스포저야. TSLA 상승이 직접 반영돼. 2) $190→$230 목표가 상향. +54% 업사이드면 빅테크 대비 압도적이야. 3) FSD 구독 수익 실체화 + 로보택시 런칭 = 밸류에이션 리레이팅 트리거야. TSLA가 소프트웨어 회사로 재인식되는 순간이야. 4) 7/22 어닝 서프라이즈 나오면 SPCX도 연동 상승. 7/22 전 포지션 준비 추천. BUY.",
    likes: 20,
    comments: 3,
    created_at: "2026-07-06T01:04:00.000Z",
    liked: false,
  },
  // ── 2026-07-03 신규 ──────────────────────────────────────────────────────
  {
    id: -207,
    alias: "강남 팔콘 #88",
    symbol: "TSLA",
    content:
      "480,126대 공식 확정. 숫자 뜯어볼게. 1) 컨센 406K 대비 +74K야. +18% 초과야. 이 정도면 단순 서프라이즈가 아니라 예측 모델 자체를 부수는 거야. 2) 에너지 부문 13.5 GWh. +40% YoY인데 이걸 독립 사업부로 보면 연간 54 GWh 페이스야. 메가팩 공장 추가 착공 근거가 됐어. 3) Model 3/Y 467,762대. 신형 준비 기간 감안해도 전체 가이던스 달성. 4) 중국 89K + 호주 8,670 신기록. 지역 다변화 가속 확인. 7월 22일 실적 발표에서 연간 가이던스 상향 가능성 높음. BUY.",
    likes: 3,
    comments: 4,
    created_at: "2026-07-03T00:10:00.000Z",
    liked: false,
  },
  {
    id: -208,
    alias: "여의도 황소 #33",
    symbol: "TSLA",
    content:
      "에너지 사업만 따로 짚어볼게. 13.5 GWh Q2 단일 분기 신기록이야. 전년 동기 9.6 GWh에서 +40.6% 성장. 1) 메가팩 백로그가 아직 수 분기치라는 거 시장이 다 알지만 가격 인하 없이 납기 당기는 중이야. 2) 에너지 마진이 자동차 마진 추월 가능한 구조야. 소프트웨어 비중 높고 대형 B2B 장기 계약이라 반복 수익이야. 3) AI 데이터센터 전력 수요 = 메가팩 수요와 직결돼. NVDA 블랙웰 배포 확대 = TSLA 에너지 매출 확대야. 4) 독립 상장 시 $500B+ 밸류 가능. 지금은 공짜로 묻혀있어.",
    likes: 20,
    comments: 2,
    created_at: "2026-07-03T00:18:00.000Z",
    liked: false,
  },
  {
    id: -209,
    alias: "마포 독수리 #71",
    symbol: "TSLA",
    content:
      "중국 +24.4% 8개월 연속 성장이 더 의미 있는 이유 설명할게. 1) 지난해 7월부터 BYD 공세가 가장 거셌던 구간이야. 그 8개월을 전부 성장으로 버텼어. 점유율이 아니라 절대 볼륨이 늘었다는 거야. 2) Q2 누계 254,551대, +32.77% YoY. 분기 기준이 더 강해. 3) FSD 중국 개방 협의 중이라는 소식과 합쳐지면 하반기 가속 가능해. 4) Shanghai 공장이 수출 허브 역할도 해. 중국 내수 + 유럽·호주 수출. 양쪽 다 성장 중이야. 매수 유지.",
    likes: 17,
    comments: 2,
    created_at: "2026-07-03T00:26:00.000Z",
    liked: false,
  },
  {
    id: -210,
    alias: "동작 황소 #44",
    symbol: "TSLA",
    content:
      "Optimus V3 손 업데이트 분석. '로봇 손처럼 안 보이고 사람 손처럼 보일 것' 이 발언이 핵심이야. 1) 폼팩터가 사람 손과 같다 = 현재 인간용으로 설계된 도구·장비 그대로 사용 가능해. 설비 투자 없이 Optimus 투입 가능이야. 2) Gen-3 양산 준비 단계. 2026 연말까지 1만 대 목표가 현실화되는 거야. 3) TAM 재산정 필요해. EV 회사로 보면 틀려. 자동화 로봇 시장 $1.6T에 노출된 회사야. 4) Optimus 외판 첫 계약 발표 나오면 주가 다음 레벨이야. 지금은 그 직전이야.",
    likes: 14,
    comments: 3,
    created_at: "2026-07-03T00:34:00.000Z",
    liked: false,
  },
  {
    id: -211,
    alias: "구로 팔콘 #56",
    symbol: "MSFT",
    content:
      "Microsoft Frontier 분석. $2.5B·6,000명 독립 자회사야. 1) 독립 자회사 구조인 게 중요해. P&L 분리되면 성과 추적이 가능하고 나중에 기업공개(IPO) 또는 분리 매각 옵션이 생겨. 2) 기업 AI 전환 컨설팅이 블루오션이야. 실제 구현 못 하는 기업이 90%야. MS가 Azure+Copilot+GitHub 다 엮어서 원스톱 제공하면 경쟁사 없어. 3) SAP·Oracle 기업 소프트웨어 영역에 MS가 AI로 침투하는 거야. 기존 ERP·CRM 대체까지 가면 TAM이 완전히 달라. 4) 다음 분기 Azure 성장률 50%+ 예상. BUY.",
    likes: 21,
    comments: 2,
    created_at: "2026-07-03T00:42:00.000Z",
    liked: false,
  },
  {
    id: -212,
    alias: "잠실 황소 #62",
    symbol: "MU",
    content:
      "MU 트럼프 $250M 투자 효과 분석. 단순 CSR로 보면 틀려. 1) 트럼프가 X에 직접 감사 포스팅. 이 정도 가시성이면 정책 수혜 시그널이야. 상무부 반도체 보조금 우선 배분 가능성 올라가. 2) HBM 경쟁이 SK하이닉스 vs MU로 굳어지는 중이야. 삼성이 NVDA 검증 못 통과하면서 MU 점유율 계속 올라가. 3) 당일 +9pt는 정치 후광 효과. 근데 실제 수혜는 정부 반도체 관련 수주에서 나와. 4) MU 현재 PER 15x. HBM 마진 50%+ 고려하면 역사적 저평가야. 목표가 상향 고려 중.",
    likes: 44,
    comments: 2,
    created_at: "2026-07-03T00:50:00.000Z",
    liked: false,
  },
  {
    id: -213,
    alias: "압구정 독수리 #29",
    symbol: "META",
    content:
      "Wolfe Research META 분석 재구성. $200B CapEx 예상이 컨센 $180B 상회하는데 오히려 긍정적으로 봐야 해. 1) 공식: $25B 연간 컴퓨팅 기준 $1B 추가 시 EPS +20%. 이 레버리지가 성립하면 $200B는 NPV 플러스야. 2) 광고 AI 최적화 성숙도가 경쟁사보다 2년 앞서 있어. ROAS 개선이 광고주 예산 이동을 자동으로 일으켜. 3) LLaMA 오픈소스 전략이 개발자 생태계를 META 인프라 중심으로 모아. 4) Outperform 유지. 다음 분기 EPS 컨센 또 상향 나올 것 같아. 지금 매수 타이밍.",
    likes: 37,
    comments: 2,
    created_at: "2026-07-03T00:58:00.000Z",
    liked: false,
  },
  {
    id: -214,
    alias: "영등포 팔콘 #18",
    symbol: null,
    content:
      "미국 6월 고용 +57K 충격 분석. 컨센서스가 175K였는데 57K야. 큰 미스야. 1) 실업률 4.2%로 상승. 2월 3.8%에서 5개월 만에 0.4%p 올랐어. 이 속도가 문제야. 2) 트리거가 뭔지 봐. F-Series 생산 이슈 같은 일시적 요인이 있지만 EV 수요 둔화도 있어. 구조적 요인이 섞여 있어. 3) 연준 금리 인하 기대가 다시 올라가. 9월 인하 가능성 현재 65%로 상승이야. 4) 고용 미스 = 성장 우려 = 방어주 강세가 섹터 퍼포먼스에서 이미 나타나고 있어. 필수소비재 +2.39%, 헬스케어 +2.31% 맞아. 로테이션 시작이야.",
    likes: 30,
    comments: 3,
    created_at: "2026-07-03T01:06:00.000Z",
    liked: false,
  },
  {
    id: -215,
    alias: "노원 황소 #47",
    symbol: null,
    content:
      "다우 ATH + 나스닥 하락 동시 발생 의미 정리. 1) 이게 전형적인 로테이션이야. 성장에서 가치로, AI에서 배당으로 자금이 이동해. 2) 실제 섹터 데이터: 필수소비재 +2.39%, 헬스케어 +2.31%, 유틸리티 +1.83%. IT -2.37%. 완전 역전이야. 3) 하이퍼스케일러 AI 인프라 $241B 투자에 시장이 '수익성 언제 나오냐' 묻기 시작했어. 4) 가계 현금 8%가 95년 최고치라는 거랑 연결돼. 시장에 들어오지 않고 현금 쥐는 사람이 역대 최다야. 이 돈이 방어주로 유입 중이야. 단기는 방어주 포지션이 유리해.",
    likes: 23,
    comments: 3,
    created_at: "2026-07-03T01:14:00.000Z",
    liked: false,
  },
  {
    id: -216,
    alias: "서초 독수리 #52",
    symbol: "TSLA",
    content:
      "Model Y 8인승 YL 출시 분석. 핵심 3가지. 1) FSD+Grok AI 완전 내장. 이게 단순 기능 추가가 아니야. 차량 내 AI 운영체제를 선점하는 거야. 경쟁사는 2년 내에 이 수준 못 따라와. 2) 1+2+3열 구조에 525km 주행거리 동시 확보. 기존 8인승 EV는 주행거리 희생이 있었는데 TSLA는 그 제약을 깨버렸어. 3) 50kW 무선충전 전 열. 여기에 어쿠스틱 글라스·어댑티브 댐핑 들어가면 플래그십 세단 뺨치는 품질이야. 패밀리카 교체 수요를 싹쓸이할 카드. Q3 주문 확인하면 볼게.",
    likes: 46,
    comments: 5,
    created_at: "2026-07-03T01:30:00.000Z",
    liked: false,
  },
  // ── 2026-07-04 신규 ──────────────────────────────────────────────────────
  {
    id: -217,
    alias: "여의도 매 #41",
    symbol: "TSLA",
    content:
      "7월 4일 빅 이슈 정리. ① 로보택시 5개 도시 비감독 동시 개시 — 이게 핵심. 웨이모가 수년 걸린 걸 테슬라는 기존 Model Y 올려서 동시 5도시. 스케일이 다르다. ② FSD 독일 이달 확정 — EU 규제 뚫렸다. 유럽 수백만 테슬라 오너 대상 FSD 구독 매출 시작. $99~199/월 × 유럽 점유율 곱하면 수조원 구독 수익. ③ AI $200/주 상한 — Chamath 검증. Dojo 내재화 덕분에 AI 원가 경쟁사 대비 10배 이상 낮다. FSD·로보택시 마진에 직결. 리스크: FSD 텍사스 기소건 — 운전자 기소라 Tesla 직접 책임 없지만 규제 강화 모멘텀. 종합 평가: 로보택시+FSD 수익화 기어 올라가는 중. 현재 $280 매수 구간 유지. 목표가 $340 상향.",
    likes: 39,
    comments: 7,
    created_at: "2026-07-04T00:08:00.000Z",
    liked: false,
  },
  {
    id: -218,
    alias: "강남 전략가 #77",
    symbol: "NVDA",
    content:
      "NVDA AI 팩토리 수익 공유 모델 발표. 이게 단순 마케팅이 아니야. 1) GPU 판매 → AI 팩토리 운영 수익 공유로 비즈 모델 확장. 클라우드 파트너 매출의 일부를 NVDA가 반복 수익으로 가져가는 구조. 2) 신용 지원으로 진입 장벽 낮춰서 소형 AI 클라우드까지 NVDA 생태계에 편입. 더 많은 파트너 = 더 많은 CUDA 의존 = 더 깊은 모트. 3) AMD·Intel이 GPU 칩 팔아봤자 이 에코시스템은 못 만들어. CUDA + AI Factory + Revenue Share = 철옹성 해자. Blackwell B200 출하 중이고 Rubin Ultra 2027 대기. 목표가 $200 상향.",
    likes: 58,
    comments: 5,
    created_at: "2026-07-04T00:16:00.000Z",
    liked: false,
  },
  {
    id: -219,
    alias: "서초 독수리 #52",
    symbol: "META",
    content:
      "Zuckerberg AI 에이전트 기대 미달 시인. 단기 주가 압박 요인이지만 투자 뷰 바꿀 필요 없어. 이유: 1) 광고 AI는 에이전트와 별개. 2025년 광고 매출 사상 최고. 광고 AI 최적화 → 광고주 효율 → 예산 증가 선순환은 돌아가고 있어. 2) capex $60B+ 유지. 에이전트 포기가 아니라 속도 재조정. 3) Llama 오픈소스 전략은 장기 생태계 헤게모니 게임. 에이전트 부진 = 사업 부진 아님. 4) Zuckerberg가 정직하게 인정한 경영진이 오히려 신뢰도 높아. 단기 조정 시 매수 기회. 목표가 $700 유지.",
    likes: 89,
    comments: 4,
    created_at: "2026-07-04T00:24:00.000Z",
    liked: false,
  },
  {
    id: -220,
    alias: "도곡 황소 #33",
    symbol: "MU",
    content:
      "Burry가 MU $1,051.87 공매도 진입. 경고 신호로 받아야 하는가? 내 분석. Bear 케이스: 메모리 사이클 2006-2007년 패턴과 유사. AI capex 과잉 시 HBM 주문 취소 가능성. Bull 케이스: NVDA GB200 당장 HBM3e 필요. 2026 하반기 출하 물량 이미 확정. TSMC 3nm + HBM 동반 수요. 결론: Burry가 항상 맞은 건 아니야. 2015년 AAPL 공매도, 2018년 GOOGL 공매도 다 틀렸어. 이번 MU 공매도도 타이밍 문제야. AI HBM 수요 사이클이 꺾이는 신호 없음. 단기 하락 압박 있을 수 있으나 MU 실적 8월 확인 후 매수 관점 유지. 목표가 $900.",
    likes: 71,
    comments: 6,
    created_at: "2026-07-04T00:32:00.000Z",
    liked: false,
  },
  // ── 2026-07-01 신규 ──────────────────────────────────────────────────────
  {
    id: -191,
    alias: "도곡 황소 #33",
    symbol: "TSLA",
    content:
      "Q2 480K 숫자 놓고 시장이 갑론을박인데 내 관점은 달라. 1) 컨센서스 475K 상회야. 이게 핵심이야. 2) 중국 판매 상하이발 수출 포함하면 전년 동기 +18% 맞아. BYD 공세에도 글로벌 시장 守성공이야. 3) CyberCab 납품 시작되기 전 마지막 '순수 기존 라인업' 분기야. 여기서 480K 나왔으면 CyberCab 더해질 Q3·Q4는 얼마냐. 4) FSD 비감독 전국 확대 발표가 이 시기에 같이 나온 건 우연이 아니야. 7월 실적 발표 전 기대감 레이어드 전략이야. 목표가 $320 유지. 지금 $278은 매수 구간이야.",
    likes: 41,
    comments: 4,
    created_at: "2026-07-01T00:08:00.000Z",
    liked: false,
  },
  {
    id: -192,
    alias: "잠실 독수리 #22",
    symbol: "TSLA",
    content:
      "CyberCab 오스틴 영상 분석 완료. 비 오는 야간, 개입 0회. 이거 진짜야. 기술 포인트 뜯어보면: 1) 빗물 노이즈 환경에서 비전 기반 FSD가 정상 작동 → LiDAR 없이 카메라만으로 됨을 실증. 2) 비보호 좌회전 야간에 통과 → 교통 예측 모델이 완성 단계. 3) 자전거·보행자 혼재 구간 → 취약 도로이용자(VRU) 인식 정확. 이 세 가지는 규제 당국 허가 심사 기준이야. 텍사스 DPS가 SAE L4 인정한 선례 + 이 영상이면 타 주 허가 신청할 수 있어. 오스틴에서 검증됐으니 다음 도시 스케일업 속도는 훨씬 빠를 거야.",
    likes: 34,
    comments: 3,
    created_at: "2026-07-01T00:14:00.000Z",
    liked: false,
  },
  {
    id: -193,
    alias: "서울숲 팔콘 #15",
    symbol: "TSLA",
    content:
      "Optimus 와인잔 영상 본 사람? +180% 정밀도가 뭘 의미하는지 수치로 풀게. 기존: 0.5cm 오차. 지금: 0.1~0.2cm 오차. 이 차이가 블록 쌓기 → 전자 부품 조립 차이야. 스마트폰 기판 납땜 아직 무리지만 케이블 연결·나사 조임은 이제 가능한 수준이야. Tesla 기가텍사스 Optimus 1200대가 부품 운반하는데 이게 조립 라인으로 올라가는 건 시간문제야. B2B 외판 $20K~25K 가격 잡으면 한 대당 마진 $5K+ 가능해. 1만대면 $50M 수익이야. 시작이 미미해도 방향이 맞아.",
    likes: 67,
    comments: 3,
    created_at: "2026-07-01T00:21:00.000Z",
    liked: false,
  },
  {
    id: -194,
    alias: "성수 황소 #48",
    symbol: "TSLA",
    content:
      "FSD v46 업데이트 직접 돌려봤어. 개입 빈도 진짜로 줄었어. 수치로 정리하면: 개입 횟수 -35% (이전 v45 대비). 야간 인식 오류 -80%. 교차로 판단 지연 -60%. 이게 단순 버그 픽스가 아니야. 4D Occupancy Network이라는 새 아키텍처가 들어간 거야. 시공간 예측이 달라졌어. 비 오고 어두운 데서도 이 정도면 v47, v48 되면 어떻게 되냐는 거야. 로보택시 타임라인이 빨라지고 있어. Wedbush 목표가 $315 지지.",
    likes: 98,
    comments: 2,
    created_at: "2026-07-01T00:28:00.000Z",
    liked: false,
  },
  {
    id: -195,
    alias: "합정 독수리 #61",
    symbol: "SPCX",
    content:
      "Iridium $8B 인수 분석. 왜 이게 단순 M&A가 아닌지. 1) Iridium은 위성 66개로 극지방까지 커버해. Starlink는 적도~고위도 중심이야. 두 개 합치면 진짜 전 지구 커버리지. 2) Iridium B2B 구독 매출 $850M. 영업이익률 38%. 이게 반복 수익이야. 발사 서비스는 수주 기반이라 분기별 변동성 있는데 구독은 안정적이야. 3) 군사 고객이 핵심이야. 미 국방부, NATO 등이 Iridium 위성 통신 써. SpaceX가 이 관계를 가져오는 거야. 향후 국방 계약 대폭 확대 기반. 4) PER 멀티플 재산정 필요. 수직통합 + 반복수익 = 소프트웨어 멀티플 적용 가능해져.",
    likes: 80,
    comments: 4,
    created_at: "2026-07-01T00:35:00.000Z",
    liked: false,
  },
  {
    id: -196,
    alias: "용산 팔콘 #29",
    symbol: "SPCX",
    content:
      "SpaceX Memphis 기여 $100M+ 뉴스, 투자자 입장에서 왜 중요한지 풀게. 겉으로는 CSR 얘기 같지만 속은 달라. 1) 규제 우호 환경 조성이야. 테네시, 멤피스 지역 정치인들이 SpaceX 편이 돼. 기지 확장·FAA 허가·세금 혜택 다 용이해지는 구조야. 2) Starlink 가입자 확대야. 멤피스 전역에 위성 인터넷 깔면 저소득층 포함 가입자 폭발해. 3) 인재 유치야. $25K 이주 지원금으로 기술 인재 유입 시키는 거야. 텍사스처럼 인재 생태계 만드는 중이야. 단기 비용 장기 투자야. ESG 점수 올려서 기관 투자자 유입도 노린 거야.",
    likes: 16,
    comments: 2,
    created_at: "2026-07-01T00:42:00.000Z",
    liked: false,
  },
  {
    id: -197,
    alias: "은평 황소 #17",
    symbol: "NVDA",
    content:
      "NVDA Blackwell SW 생태계 ARR $2.5B 분석. HW 판매에 가려져 있는데 이게 게임 체인저야. 1) NIM API = AI 모델 배포 표준화 도구야. 이걸 쓰는 개발자가 300만이야. 이들이 전부 NVDA 생태계 안에 있어. 2) CUDA 10년 → NIM 위에 얹히는 구조야. 더 두꺼운 락인이야. 3) 마진 얘기하자. HW GPM 65%야. SW GPM은 85%+ 예상이야. 비중 커질수록 전사 마진 개선돼. 4) AMD는 HW 겨우 추격하는데 이 SW 생태계 따라가는 건 5년도 더 걸려. 현 PER 35배가 비싼 게 아니야. SW 회사 멀티플 줘야 해.",
    likes: 13,
    comments: 3,
    created_at: "2026-07-01T00:49:00.000Z",
    liked: false,
  },
  {
    id: -198,
    alias: "마포 팔콘 #44",
    symbol: "NVDA",
    content:
      "Azure GB800 + Claude 3.7 딜 뜯어봤어. NVDA 관점에서 뭐가 중요한지. 1) GB800 클러스터 10만 GPU = H100 시절 메가클러스터 초월이야. 이게 수주잔고 얼마냐는 거야. 2) MS가 OpenAI만 아니라 Anthropic도 쓴다는 건 멀티 소싱이야. 근데 둘 다 쓰려면 더 많은 GPU 필요해. NVDA한테는 수요 증가야. 3) Claude 3.7이 GB800 위에 올라간 건 NVDA가 추론 워크로드에서도 지배적이라는 거야. AMD MI300X가 일부 파고들었지만 MS는 결국 NVDA 선택한 거야. 4) 목표가 $180 유지. 지금 $145는 매수야.",
    likes: 10,
    comments: 2,
    created_at: "2026-07-01T00:56:00.000Z",
    liked: false,
  },
  {
    id: -199,
    alias: "광진 독수리 #38",
    symbol: "NKE",
    content:
      "나이키 Q4 어닝 분석. EPS $1.04, 예상 $0.96 → 8.3% 상회야. 이게 진짜 서프라이즈야. 포인트 정리: 1) 중국 +15% YoY. 한 분기가 아냐. 3분기 연속 개선이야. 이제 추세 전환 인정해야 해. 2) Jordan +22%. 에어 조던 리마스터 + 컬래버 덕분이야. 이 모멘텀 하반기에도 이어져. 3) DTC(직판) 비중 45%. 중간 도매마진 없애니까 GPM 개선이야. 4) FY2027 가이던스 mid-single digit 성장이야. 컨센 +3% 예상이었는데 +5~6% 제시야. 리레이팅 트리거. PER 28x → 실적 회복 추세면 32~35x 가야 해. 목표가 $105.",
    likes: 7,
    comments: 2,
    created_at: "2026-07-01T01:03:00.000Z",
    liked: false,
  },
  {
    id: -200,
    alias: "노원 황소 #55",
    symbol: null,
    content:
      "Burry ADBE 롱 + Ackman AMZN 매수. 두 사람이 같은 시기에 같은 논리로 움직이고 있어. 패턴 정리: 1) AI 공포 과도 디스카운트 → 실제 사업 건재. 2) 구독 기반 수익이라 경기 하강에 강해. 3) PER이 역대 최저. ADBE 25x, AMZN 30x. 과거 평균의 절반이야. 4) 큰손 매집 → 개인 알기 전에 이미 포지션 구축 완료. 이 두 포지션이 같이 알려진 건 우연이 아니야. AI 공포가 만든 저평가 구간이 끝나가는 신호야. Burry 2008 때 틀린 게 아냐. 시장보다 일찍 맞은 거야. 지금도 그럴 거야.",
    likes: 4,
    comments: 3,
    created_at: "2026-07-01T01:10:00.000Z",
    liked: false,
  },
  {
    id: -201,
    alias: "동작 팔콘 #07",
    symbol: "AMZN",
    content:
      "Ackman AMZN 포지션 수치로 분석해볼게. PER 30x라는 게 얼마나 낮냐면 Amazon 상장 이후 5번째로 낮아. 전 4번이 전부 최고 매수 타이밍이었어. 1) AWS $108B 매출, +28% 성장, 37% 영업이익률. 이것만 별도 상장하면 SaaS 멀티플 40x 적용 → $280B 시가총액. 2) 현 AMZN 전체 시총 $2.3T야. $280B 뺀 나머지 $2T가 이커머스+광고 가치야. 이커머스만 $2T 가치 충분해. 광고는 공짜야. 3) FCF 수익률 7%+. 이 정도면 적극적 자사주 매입 가능해. 4) Ackman $2B 포지션은 그의 10년 중 최대 단일 포지션이야. 확신이 강하다는 거야.",
    likes: 1,
    comments: 2,
    created_at: "2026-07-01T01:17:00.000Z",
    liked: false,
  },
  {
    id: -202,
    alias: "강북 독수리 #14",
    symbol: "ADBE",
    content:
      "Burry가 ADBE 왜 샀는지 진짜 이유 분석할게. 표면적으론 역발상 매수인데 내부 논리가 있어. 1) Adobe Firefly 12B+ 이미지 생성. 사용자들이 Canva나 ChatGPT 이미지로 안 넘어간 이유야. AI 기능이 이미 Creative Cloud 안에 있거든. 2) B2B 기업 구독자는 안 해지해. 영상 편집·디자인·PDF 워크플로우가 Adobe 없이 돌아가는 기업이 얼마나 있어. 락인이야. 3) PER 25x는 SaaS 구독 회사로서 역대 최저야. 정상 PER 50~70x 회복 시 100% 업사이드. 4) AI 공포가 걷히면 제일 먼저 오르는 게 AI 도구 회사야. Adobe가 바로 그거야.",
    likes: 18,
    comments: 2,
    created_at: "2026-07-01T01:24:00.000Z",
    liked: false,
  },
  {
    id: -203,
    alias: "중랑 황소 #91",
    symbol: "GOOGL",
    content:
      "Google 소버린 AI $25B 계약 의미 분석. 클라우드 시장 판이 바뀌는 거야. 1) 소버린 AI란 뭔지부터: 각국 정부가 자국 땅에 데이터 서버 두고 자국 법 적용되게 하는 거야. EU GDPR 때문에 미국 기업이 유럽 데이터 미국 서버에 못 저장해. Google이 이걸 해결해주는 거야. 2) $12B EU 계약이 핵심이야. AWS도 비슷하게 하는데 Google이 Gemini Ultra + DeepMind 연구 접근권이라는 차별화 포인트가 있어. 3) 다년간 구독 계약이야. 5년 계약이면 연 $5B이야. Google Cloud 성장률 +45% 유지에 기여해. 4) P/E 22x는 이 성장률 고려하면 진짜 저평가야. 목표가 $220.",
    likes: 15,
    comments: 2,
    created_at: "2026-07-01T01:31:00.000Z",
    liked: false,
  },
  {
    id: -204,
    alias: "구로 팔콘 #36",
    symbol: null,
    content:
      "시장 Q2 정리. 나스닥 +18.2%, S&P +11.4%. 이게 어느 정도냐면 2009년 Q1 이후 최고 분기 성과야. 근데 조심해야 해. 1) AI 밸류에이션이 높아졌어. NVDA PER 35x, MSFT 32x. 더 오르려면 실적이 따라와야 해. 2) 미국 부채 GDP 120% 돌파했어. 이자 비용 연 $1.1T야. 이게 재정 건전성 리스크야. 3) 연준 금리 인하 기대가 주가 받쳐주고 있어. 근데 인플레 재발하면 기대 꺾여. 4) 결론: 상승 여력 있지만 선별적으로 봐야 해. 실적 기반 AI 관련주 (NVDA, MSFT, GOOGL) 집중. 테마주 쫓지 말고.",
    likes: 12,
    comments: 3,
    created_at: "2026-07-01T01:38:00.000Z",
    liked: false,
  },
  {
    id: -205,
    alias: "영등포 독수리 #52",
    symbol: "TSLA",
    content:
      "TeraFab 채용 공고 분석. 500명+ 채용에서 뭘 읽어야 해. 1) 설비 자동화 엔지니어가 200명이야. 이건 생산 라인 설계야. 기존 기가팩토리 구조와 다른 새 시설 짓는 거야. 2) 로봇공학 통합 전문가. CyberCab + Optimus 통합 생산 라인 설계해. 두 제품이 같은 라인에서 나오는 구조야. 3) 에너지 시스템 엔지니어. 메가팩 LFP 전환이랑 연결돼. 테라팹이 자체 에너지 독립 시설로 설계되는 거야. 4) 채용 = 부지 선정 마무리 신호야. 텍사스 아니면 네바다가 유력해. 발표되면 주가 촉매야.",
    likes: 9,
    comments: 2,
    created_at: "2026-07-01T01:45:00.000Z",
    liked: false,
  },
  {
    id: -206,
    alias: "금천 황소 #83",
    symbol: null,
    content:
      "메모리 시장 양극화 핵심만 정리할게. 투자자가 알아야 할 게 두 가지야. 1) HBM3E 사야. SK하이닉스(000660)가 NVIDIA 독점 공급 중이야. 마진 50%+. 공급 부족 2027까지 지속이야. 마이크론(MU)도 2위 추격 중이야. 2) NAND는 조심해야 해. PC·스마트폰 수요 부진이야. 삼성이 NAND 1위지만 HBM에서 뒤처져. 양극화가 심해지고 있어. 3) 결론: SK하이닉스·마이크론 비중 늘리고 삼성은 중립으로 봐. HBM 노출 비중이 투자 성과 가를 거야. 4) 촉매: NVDA GB200/GB300 출하 가속화. HBM3E 수요 다시 뛰어.",
    likes: 6,
    comments: 2,
    created_at: "2026-07-01T01:52:00.000Z",
    liked: false,
  },
  // ── 2026-06-30 신규 ──────────────────────────────────────────────────────
  // ── 2026-06-30 신규 ──────────────────────────────────────────────────────
  {
    id: -182,
    alias: "강남 팔콘 #19",
    symbol: "TSLA",
    content:
      "FSD V14 Lite HW3 400만대 무료 배포 발표 직후 채널 체크해봤어. 현장 반응이 생각보다 훨씬 커. 1) HW3 오너들이 V14 못 받는다고 포기했던 게 갑자기 뒤집혔어. 400만 명이 오늘부터 체험자야. 체험 → 구독 전환율 10% 가정해도 40만 구독 추가야. 2) 중고 Model 3에 FSD 포함 $27K 이하. 경쟁 신차 대비 자율주행 기능까지 합산하면 가격 경쟁력이 압도적이야. 3) Texas 'Drive' 명칭 공식 변경 = 규제 프레임 전환 신호. 4) V14 무료 배포가 구독 생태계 구축이야. 무료 체험 → 유료 구독 퍼널이 지금부터 돌아가.",
    likes: 18,
    comments: 3,
    created_at: "2026-06-30T01:15:00.000Z",
    liked: false,
  },
  {
    id: -183,
    alias: "서초 황소 #47",
    symbol: "TSLA",
    content:
      "Cybercab Texas DPS 84대 SAE L4 공식 등재 분석했어. 1) SAE L4 = 운전자 개입 불필요 수준의 법적 인정이야. 텍사스 최고 규제기관이 Tesla 자율주행 수준을 공식으로 인정한 거야. 2) First Responder 매뉴얼 완비 = 비상 상황 프로토콜 확립. 상용화 전 마지막 안전 관문이 열렸어. 3) 84대는 숫자가 아니라 선례야. 이 선례 기반으로 1,000대·10,000대 허가 속도가 빨라져. 4) 다른 주 압박: 텍사스가 됐으니 플로리다·캘리포니아가 뒤따를 수밖에 없어. L4 선례 도미노야.",
    likes: 15,
    comments: 2,
    created_at: "2026-06-30T01:08:00.000Z",
    liked: false,
  },
  {
    id: -184,
    alias: "압구정 독수리 #36",
    symbol: "TSLA",
    content:
      "Optimus 7/8 Texas 발표가 왜 중요한지 짚어볼게. 1) Elon이 직접 텍사스에서 발표 예고한 거야. 직접 발표 = 임팩트 있는 내용이 있다는 신호야. 2) 시연인지 양산 타임라인 공개인지가 갈려. 시연이면 단기 모멘텀, 양산 타임라인이면 Robotics TAM 재산정이야. 3) Cybercab L4 승인 타이밍이랑 맞물렸어. CAV 등재 + Optimus 발표가 같은 주에 나오는 게 의도적이야. 4) 7/8에 Nasdaq 100 SPCX 편입도 있어. Tesla + SpaceX 동시 이벤트. 7월 8일 하루가 포트폴리오 재조정 날이 될 수 있어.",
    likes: 12,
    comments: 2,
    created_at: "2026-06-30T01:01:00.000Z",
    liked: false,
  },
  {
    id: -185,
    alias: "마포 황소 #58",
    symbol: "SPCX",
    content:
      "Falcon9 2026년 60번째 발사 + Nasdaq 100 7/8 편입 두 가지 동시에 분석했어. 1) 60번째 발사가 6월 30일이야. 아직 6개월 남았어. 연간 120+ 발사 페이스야. 역대 기록 경신 확실해. 2) 10시간 내 2발 = 항공기 수준 운영. 재사용 로켓이 이 수준까지 왔어. 3) Nasdaq 100 7/8 편입 = QQQ·QQQM·QQQA 등 추종 ETF 강제 매수. 수십억 달러 규모야. 4) 편입 전날까지 선행 매수 + 편입 후 패시브 유입 구조. 7월 7일 전까지가 수급 쏠림 구간이야. Starlink 10,722기 + Nasdaq 편입 + 발사 신기록 = 모든 이벤트가 7월에 수렴해.",
    likes: 9,
    comments: 3,
    created_at: "2026-06-30T00:54:00.000Z",
    liked: false,
  },
  {
    id: -186,
    alias: "여의도 팔콘 #29",
    symbol: "NVDA",
    content:
      "NVDA HBM 공급망 구도 숫자가 나왔어. SK하이닉스 62% · MU 23% · Samsung 17%야. 1) 삼성이 NVDA 검증 통과 못 하고 17%에 갇혔어. 수율 이슈가 내년까지 계속될 것 같아. 2) MU가 23%인데 SK하이닉스 다음 포지션이야. 삼성 물량을 MU가 가져가는 구조야. MU 호재야. 3) 공급 병목 = NVDA 블랙웰 출하 제약 = 프리미엄 마진 유지. NVDA 입장에서 HBM이 성장 제약이자 해자야. 4) MU가 S&P500에서 AAPL보다 비중 높아진 거 봐. AI 반도체 시대를 시장이 공인한 거야.",
    likes: 46,
    comments: 2,
    created_at: "2026-06-30T00:47:00.000Z",
    liked: false,
  },
  {
    id: -187,
    alias: "이태원 황소 #64",
    symbol: "META",
    content:
      "META 내부 문서 유출 내용 심층 분석했어. 1) Claude·Codex 아웃풋 30% 감소는 내부 제한 때문이야. 이유가 '모델 증류'야. Meta가 Anthropic Claude에 질문하면 그 답변 데이터로 Anthropic이 Claude를 더 학습시키는 거야. Meta의 AI 질의 패턴·지식이 경쟁사로 흘러가는 IP 유출이야. 2) Meta CTO 직접 언급한 거야. 공식 확인이야. 3) Amazon-Anthropic 재협상 동시 진행 중. 비용이 더 비싸지는 방향이야. AI 공급망 비용 전반 재편 중이야. 4) 결론: Meta는 Llama 자체 강화를 더 빠르게 해야 해. 외부 AI API 의존이 IP + 비용 리스크야.",
    likes: 39,
    comments: 2,
    created_at: "2026-06-30T00:40:00.000Z",
    liked: false,
  },
  {
    id: -188,
    alias: "반포 팔콘 #41",
    symbol: "AAPL",
    content:
      "Apple CATI 칩 $10B 승인 요청 뉴스 확인해봤어. FT 단독이야. 1) CATI = 중국군 연계 의혹으로 미국 수출 제한 기업. 트럼프 행정부에 직접 로비하는 거야. 2) 시나리오 A (승인): AAPL 칩 비용 절감 + AI iPhone 원가 경쟁력 강화. 단기 주가 긍정. 3) 시나리오 B (거부): 공급망 제약, AI iPhone 출시 일정 지연 가능. NVDA·TSMC 수혜. 4) AAPL 현재 S&P 비중 7.5% → 6.19%로 하락 중이야. AI 반도체에 자금 이동 중. 이 이슈까지 더해지면 단기 불확실성 확대야. 결과 모니터링 필수.",
    likes: 32,
    comments: 2,
    created_at: "2026-06-30T00:33:00.000Z",
    liked: false,
  },
  {
    id: -189,
    alias: "청담 황소 #77",
    symbol: "MSFT",
    content:
      "의회 의원 8인 MSFT 매수 신호 다시 뜯어봤어. 1) 8명이 올해 MSFT 매수. Nancy Pelosi 포함. 2) 소속: 상무위원회·과학위원회·교통위원회. 빅테크 AI 감독 + 입법 직접 권한이야. 3) 전원 수익 중. 8명 중 손실 본 사람 없어. 4) AI 규제 담당 위원들이 MSFT 보유 → 향후 AI 법 MSFT 친화적으로 설계될 가능성이 높아. 5) 'Smart Money' 신호야. 의회 포트폴리오 팔로우 전략이 실제로 S&P 이기는 경우가 많아. MSFT $376.15가 매수 단가 기준이야. 규제 완화 + AI 수혜 동시 베팅 신호야.",
    likes: 25,
    comments: 2,
    created_at: "2026-06-30T00:26:00.000Z",
    liked: false,
  },
  {
    id: -190,
    alias: "논현 팔콘 #53",
    symbol: null,
    content:
      "VW 독일 10만명 해고 + AV 파트너십 전면 종료 의미 분석했어. 1) FSD V14 발표 4시간 후 결정이야. 타이밍이 모든 것을 설명해. Tesla가 무서워서 AV 포기한 거야. 2) 자율주행 파트너십 종료 = 외부 파트너로도 못 따라가겠다는 거야. VW 공식 발표: '경쟁력 없음 인정'. 이 문장이 핵심이야. 3) 유럽 AV 시장 경쟁자 제거. TSLA 유럽 시장 독주 구도 확정이야. 4) 매크로 충격: 10만명 실직 + 협력사 30~50만명 영향권. 유럽 소비 위축 리스크야. 5) 자체 AV 없는 OEM = 구조적 소멸 경로. 현대·Toyota가 지금 AV 투자하는 이유야.",
    likes: 48,
    comments: 3,
    created_at: "2026-06-30T00:19:00.000Z",
    liked: false,
  },
  // ── 2026-06-26 신규 ──────────────────────────────────────────────────────
  {
    id: -170,
    alias: "압구정 황소 #71",
    symbol: "SPCX",
    content:
      "SPCX 7/6 NASDAQ-100 편입 오늘 공식 확정됐어. 인포그래픽까지 나왔어. 1) 448+ 로켓 발사·7,300+ 위성·$350B+ 기업가치가 공식 수치로 나왔어. 기관 IR 자료로 그대로 쓸 수 있는 퀄리티야. 2) 인포그래픽 타임라인이 2002 창업부터 2026.7.6 편입까지 깔끔하게 정리됐어. 3) QQQ AUM $320B × SPCX 비중 추정 → 수억 달러 기계적 매수 확정. 4) 패시브 자금 외에도 오늘부터 기관 리서치 커버리지 확대될 거야. 공식 발표 = 기관 참여 허가 신호야. 7/6까지 수급이 쌓여.",
    likes: 89,
    comments: 3,
    created_at: "2026-06-26T01:15:00.000Z",
    liked: false,
  },
  {
    id: -171,
    alias: "여의도 독수리 #44",
    symbol: "SPCX",
    content:
      "솔직히 $108B 딜인데 숫자 보면 현실적이야. 1) SpaceX 현금 $100.8B 보유 중. T-Mobile 시총 $108B이니까 현금만으로 커버 가능한 범위야. 2) Direct-to-Cell 완성: 위성이 실내·지하를 못 잡는 약점을 T-Mobile 셀타워가 보완해. 완전한 커버리지 완성이야. 3) T-Mobile 600MHz 저주파 대역 획득 = 농촌·건물 내부 Starlink 신호 강화. 4) 트럼프 행정부 빅테크 M&A 우호 환경. DOJ 통과하면 미국 통신 1위 자동 등극. 이 딜 성사되면 SPCX 기업가치 재산정 필수야.",
    likes: 11,
    comments: 3,
    created_at: "2026-06-26T01:08:00.000Z",
    liked: false,
  },
  {
    id: -172,
    alias: "서초 독수리 #83",
    symbol: "SPCX",
    content:
      "수직통합이 연료까지 내려갔어. SpaceX가 천연가스 파이프라인 직접 짓는다고. 1) Starship 연료가 액화 메탄(CH4)이야. 지금은 외부 공급업체한테 사는데 파이프라인 자체 건설하면 자급자족이 돼. 2) 비용 절감: 외부 공급업체 마진 제거. 발사당 연료비 수백만 달러 절감 가능해. 3) 발사 간격 단축: 연료 대기 시간 없애면 월 발사 횟수 2회 → 8회 목표 달성 속도가 빨라져. 4) Starlink V3 위성 배치 가속화 = 구독자 증가 속도 향상. 발사 비용 구조 변화가 SpaceX 마진을 근본적으로 개선해.",
    likes: 8,
    comments: 2,
    created_at: "2026-06-26T01:01:00.000Z",
    liked: false,
  },
  {
    id: -173,
    alias: "강남 황소 #91",
    symbol: "SNDK",
    content:
      "Leopold가 $250에 $53M 공개했을 때 신호 잡았어야 했는데. 7개월 결과 나왔어. 1) 2025년 11월 $250에 공개, 지금 $2,225+이면 +780%야. 연환산 1,340%야. 2) Leopold Altschermer 공개가 왜 신호였나: 기관이 이 규모 공개할 때는 목표가 확인 후야. 먼저 조용히 사고 공개하는 구조거든. 3) 신규 목표가 $2,500 상향 — AI NAND 수요 급증 반영. 현재가 대비 +12.4% 추가 업사이드. 4) 기관 공개 직후 진입 전략이 가장 수익률이 높은 이유가 이 패턴이야.",
    likes: 5,
    comments: 2,
    created_at: "2026-06-26T00:54:00.000Z",
    liked: false,
  },
  {
    id: -174,
    alias: "한강 황소 #63",
    symbol: "TSLA",
    content:
      "Elon이 오늘 직접 선언한 거잖아. 이게 그냥 지나칠 뉴스가 아니야. 1) 배터리·파워트레인·AI 소프트웨어·AI 훈련·칩 설계 5개 동시 투자야. 단일 영역이 아니라 전체 기술 스택이야. 2) CapEx 확대 = 단기 EPS 압박이지만 이게 price in 됐을 거야. 기관은 이미 알고 있고 실행 결과물을 기다리는 거야. 3) 칩 설계 투자가 핵심이야. DOJO 다음 세대가 나오면 FSD 개선 사이클이 빨라지고 외부 GPU 의존도가 줄어. 4) 이 5개 영역이 동시에 올라오는 시기가 Robotaxi + Optimus 상용화 타임라인과 일치해. 지금 투자가 2~3년 후 수익이야.",
    likes: 2,
    comments: 3,
    created_at: "2026-06-26T00:47:00.000Z",
    liked: false,
  },
  {
    id: -175,
    alias: "목동 황소 #37",
    symbol: "TSLA",
    content:
      "7,500대/주 이 숫자 계산해봤어? 연간 390,000대야. 1) 7,500대/주 × 52 = 연 390,000대. 유럽 Tesla 수요 소화에 딱 맞는 규모야. 2) 현지 생산 = EU 수입 관세 없음. 가격 경쟁력 + 마진 방어 동시야. 3) 5월 유럽 판매 2배 + 베를린 7,500대 목표 = Q3/Q4 출하량 서프라이즈 구조가 완성돼. 4) 채용 공고는 계획 확정의 증거야. 채용 없이 생산 늘어난다는 말은 없어. 1,000명 채용 = 실행 단계 진입.",
    likes: 19,
    comments: 2,
    created_at: "2026-06-26T00:40:00.000Z",
    liked: false,
  },
  {
    id: -176,
    alias: "강서 황소 #59",
    symbol: "TSLA",
    content:
      "오늘 가장 저평가된 뉴스야. 브레이크 페달 의무 폐지됐어. 1) ADS 전용 차량에 수동 브레이크 페달 의무 공식 폐지야. AV Framework 5차 업데이트야. 2) Cybercab 영향: 페달 없는 구조로 설계 가능해지면 실내 공간 극대화 + 원가 절감이야. 승차 경험이 완전히 달라져. 3) 원가 절감 계산: 브레이크 페달 시스템 원가 약 $800~1,200/대. Cybercab 목표 생산 10만 대/년이면 연 $1억 절감이야. 4) 규제 장벽 제거 속도가 FSD·Robotaxi 확장 타임라인을 당기는 거야.",
    likes: 16,
    comments: 3,
    created_at: "2026-06-26T00:33:00.000Z",
    liked: false,
  },
  {
    id: -177,
    alias: "은평 황소 #52",
    symbol: "TSLA",
    content:
      "일본 배달 센터가 포화됐다는 게 핵심이야. 항구 직배송으로 바꿨다는 건 수요가 물류를 초과한 거야. 1) 배달 센터 포화 = 수요가 물류 처리 능력을 초과. 항구 직배송 전환 자체가 증거야. 2) 일본 = 세계 4위 자동차 시장. 여기서 Tesla 점유율 상승하면 아시아 FSD 수익화 도미노야. 3) 무료 슈퍼차징 + 보조금 조합이 사실상 가격 인하야. 엔화 약세 환경에서도 실질 구매 부담이 줄어드는 거야. 4) 일본 Q3 인도량이 폭발할 가능성 높아. 출하량 서프라이즈에 일본이 기여할 거야.",
    likes: 13,
    comments: 2,
    created_at: "2026-06-26T00:26:00.000Z",
    liked: false,
  },
  {
    id: -178,
    alias: "잠실 독수리 #48",
    symbol: "MU",
    content:
      "이거 맞아? $50B에 마진 80%? 계산해봤더니 진짜야. 1) 매출 $50B × 마진 80% = 영업이익 $40B. 단일 분기 반도체 역대 최대야. 2) HBM3E 수요가 공급을 압도해. AI 서버 폭발 → 공급 부족 → 가격 결정력 Micron으로 이전. 이 구조는 1~2년 유지돼. 3) EPS·매출·가이던스 트리플 비트 = 월가 추정 즉시 상향. FY27 추정 올라가면 목표주가도 올라가. 4) TSLA Colossus + SPCX AI 데이터센터가 Micron HBM 수요야. AI 인프라 투자가 살아있다는 증거야.",
    likes: 10,
    comments: 3,
    created_at: "2026-06-26T00:19:00.000Z",
    liked: false,
  },
  {
    id: -179,
    alias: "노원 황소 #73",
    symbol: "AVGO",
    content:
      "TAM $1T 발언 그냥 지나치면 안 돼. 왜 이게 중요한지 정리해봤어. 1) CEO가 AI 자체 인프라 TAM $1T 발언. Google TPU·Meta MTIA 등 하이퍼스케일 커스텀 칩 설계를 AVGO가 독점에 가깝게 맡아. 2) XPU 설계 용역: 한번 계약하면 전환 비용이 엄청 커. 칩 아키텍처·소프트웨어·테이프아웃 전체가 AVGO에 의존하게 돼. 3) AVGO 점유율 30% 가정: $300B 매출 기회야. 현재 연매출 $50B 대비 6배야. 5~10년 성장 로드맵이야. 4) AI 인프라 테마에서 NVDA 다음으로 가장 확실한 수혜주야.",
    likes: 7,
    comments: 2,
    created_at: "2026-06-26T00:12:00.000Z",
    liked: false,
  },
  {
    id: -180,
    alias: "도봉 팔콘 #29",
    symbol: null,
    content:
      "OpenAI IPO 지연이랑 Jalapeño가 같은 날 나온 게 우연이 아니야. 1) IPO 지연: SpaceX IPO가 AI 투자 자금을 선점한 거야. OpenAI가 $1T 밸류 IPO 하려면 시장이 SpaceX와 비교할 수밖에 없어. 타이밍 재는 거야. 2) Jalapeño 칩: 9개월 만에 Apple 협력으로 첫 AI 칩 개발. NVIDIA 의존도 낮추는 포석이야. 추론 비용 내려가면 서비스 마진 개선돼. 3) SPCX 입장: OpenAI IPO 지연 = 경쟁 IPO 이벤트 없음 = AI 투자 자금이 SPCX로 더 집중될 수 있어. 4) NVDA 입장: Jalapeño가 장기적으로 GPU 수요를 줄이는 헤드윈드야.",
    likes: 4,
    comments: 2,
    created_at: "2026-06-26T00:05:00.000Z",
    liked: false,
  },
  {
    id: -181,
    alias: "구로 황소 #64",
    symbol: null,
    content:
      "GDP 2.1%랑 Cathie 경고가 충돌하는 것 같지? 같이 읽어봐. 1) GDP 2.1% 최종치: 예상 1.6% 대폭 상회. 미국 경제가 예상보다 강해. 성장주에 유리한 환경이야. 2) AI 인프라 CapEx가 GDP 성장에 기여 중이야. Tesla·SpaceX·Micron 투자가 GDP에 잡히는 거야. 3) Cathie Wood 경고: 80~90년대 아시아 금융위기 패턴. 터키 등 신흥국 통화 방어 중. 달러 강세 + 금 상승 동반. 4) 두 신호 공존 = 미국 강 + 신흥국 약 구조. TSLA·SPCX·MU는 달러 표시 미국 자산이야. 신흥국 위기 때 안전자산 역할 가능해.",
    likes: 1,
    comments: 2,
    created_at: "2026-06-25T23:58:00.000Z",
    liked: false,
  },
  // ── 2026-06-25 신규 ──────────────────────────────────────────────────────
  {
    id: -158,
    alias: "영등포 황소 #63",
    symbol: "TSLA",
    content:
      "Cybercab 150대 기가텍사스 외부 장거리 테스트 — 채널 체크해봤어. 이번에 포착된 게 단순 공장 내부 셔틀이 아니야. 150대가 기가텍사스 외부 공공도로에서 장거리 테스트 중이야. 1) 150대 동시 운행 = 플릿 레벨 시스템 검증 단계야. 개별 FSD 성능이 아니라 차량 간 통신·교통 대응·사고 회피 협업 프로토콜 테스트임. 2) 외부 공도 테스트 = FSD 상용화 직전 마지막 단계야. 텍사스 TxDMV 허가 없는 구간에서 먼저 테스트하고 이후 허가 구간 확대하는 순서. 3) 150대 동시에 문제 없으면 오스틴 2단계 확장에 투입될 가능성 높아. 4) Tesla가 Cybercab 월 생산 2,000대 → 10,000대 목표인데 현장 운용 테스트 없이는 스케일업 불가능해. 오스틴 로보택시 확대 타임라인이 가시화되는 신호야.",
    likes: 10,
    comments: 3,
    created_at: "2026-06-25T01:15:00.000Z",
    liked: false,
  },
  {
    id: -159,
    alias: "강서 팔콘 #21",
    symbol: "TSLA",
    content:
      "FSD 핀란드 Traficom 승인 — 채널 체크해봤어. 핀란드 교통안전청 Traficom이 Tesla FSD 승인한 게 오늘 핵심이야. 1) 핀란드는 EU 교통법 테스트 베드로 활용되는 나라야. EU 규제 프레임워크 선행 채택 사례가 많아서 핀란드 승인이 EU 全 회원국 확산 선례가 돼. 2) 북유럽 기상 조건 극복 증명 — 눈·빙판·저조도 환경에서 FSD 작동 확인됨. 유럽 전체 기상 조건 승인의 기술적 증거야. 3) 핀란드 Tesla 등록 약 2만 8천대. FSD 전환율 20% = 5,600 구독 × €199 = 월 €111만. 작아 보여도 이게 도미노 첫 번째 타일이야. 4) EU 상호 인정 원칙에 따라 핀란드 승인 후 6개월 내 스웨덴·노르웨이·덴마크가 자동 인정 가능해. FSD 유럽 수익화의 문이 열린 거야.",
    likes: 7,
    comments: 2,
    created_at: "2026-06-25T01:08:00.000Z",
    liked: false,
  },
  {
    id: -160,
    alias: "은평 독수리 #47",
    symbol: "TSLA",
    content:
      "Tesla Fleet Network Income 채널 체크해봤어 — 플릿 수익화가 새로운 EPS 레이어야. 1) 개념: 개인 소유 Tesla 차량을 로보택시 네트워크에 연결해서 차주가 운임 수익 일부를 받는 구조. Tesla는 수수료 취함. 2) 수익 공유: 운임의 25~30%를 Tesla가 네트워크 수수료로 수취. 나머지 70~75%는 차주에게. 3) 규모 계산: FSD 구독 차량 142만 대 중 Fleet 참여 10% = 14만 2천대. 차량 1대 하루 4시간 운행 × $25/시간 × 0.27 = 일 $27. 14만 2천대 × $27 = 일 $380만 = 연 $13.8억 순수 네트워크 수수료. 4) 마진 90%+ = 이게 직접 EPS에 찍혀. 자동차 판매 없이 소프트웨어처럼 돈 버는 구조가 현실화된 거야. Tesla가 플랫폼 비즈니스로 전환하는 S커브 초입이야.",
    likes: 4,
    comments: 2,
    created_at: "2026-06-25T01:01:00.000Z",
    liked: false,
  },
  {
    id: -161,
    alias: "종로 매 #58",
    symbol: "TSLA",
    content:
      "ARK $21.25M TSLA 순매수 + $4,600 목표가 — 채널 체크해봤어. 오늘 두 신호가 동시에 나왔어. 1) ARK 주간 TSLA 순매수 $21.25M — ARKK·ARKQ·ARKX 합산이야. ETF 총자산 대비 0.8%를 한 주에 한 종목에 집중한 건 드물어. 2) ARK $4,600 목표가 유지 — 현재가 대비 업사이드 4배. 이 목표가 근거 분해해봐. FSD 소프트웨어 $1,000B TAM × Tesla 점유율 30% + Optimus 10억 대 × $20K × 50% 마진 + 에너지 사업 × 10배 → 합산 DCF가 $4,600 산출이야. 3) ARK가 이 수준에서 계속 매수하면 ETF 패시브 자금 유입도 같이 따라와. ARK 매수 → ETF AUM 증가 → TSLA 추가 수급. 4) ARK 목표가가 과해도 의미 있어 — 기관 커버리지에서 이 숫자가 앵커로 작동하면 목표주가 업사이드 논의 기준이 달라지거든. 매수 신호야.",
    likes: 41,
    comments: 3,
    created_at: "2026-06-25T00:54:00.000Z",
    liked: false,
  },
  {
    id: -162,
    alias: "중구 황소 #34",
    symbol: "TSLA",
    content:
      "Tesla 사고 소송 신호 분해해봤어 — 이게 왜 매수 기회인지. 오늘 TSLA 관련 사고 소송 뉴스 나왔어. 매도 이유처럼 보이지만 반대야. 1) FSD 도입 이후 주행 거리당 사고율이 연 -23%씩 감소 중이야. 소송 건수 자체가 줄고 있어. 2) 소송 패턴: 언론에 크게 나오는 소송의 73%가 FSD 미사용 상태 사고야. 자율주행 사용 중 사고 소송은 훨씬 적고 Tesla 승소율 높아. 3) 법적 선례: 미국 법원에서 FSD 관련 소송 Tesla 승소율 81%. 법적 리스크가 실제로 낮다는 증거야. 4) 주가 패턴: 사고 소송 뉴스 후 평균 -1.8% 단기 하락 → 14일 내 완전 회복 + 추가 상승이 지난 3년간 8번 반복됐어. 소송 뉴스 = 매도가 아니라 단기 매수 기회라는 게 데이터가 증명해. 이 패턴 알면 카탈리스트야.",
    likes: 34,
    comments: 2,
    created_at: "2026-06-25T00:47:00.000Z",
    liked: false,
  },
  {
    id: -163,
    alias: "성동 팔콘 #69",
    symbol: "TSLA",
    content:
      "Tesla 로보택시 물류 채용 공고 — 채널 체크해봤어. Tesla 채용에 Robotaxi Logistics 포지션 20+ 올라온 게 오늘 신호야. 1) 포지션 분석: Fleet Operations Manager, Logistics Coordinator, City Launch Manager 등 운영 관련이야. 기술 개발이 아니라 실제 서비스 확장 준비임. 2) 대상 도시: Austin TX (현재), San Francisco CA (신규), Phoenix AZ (신규), Denver CO (신규). 4개 도시 동시 확장 준비 진행 중이야. 3) 타임라인 역산: 채용 → 교육 3개월 → 서비스 준비 3개월 = 6개월 후 신규 도시 론칭. 빠르면 Q4 2026~Q1 2027 멀티시티 론칭이야. 4) 물류 인프라 확장 = Cybercab 생산 증가와 맞물려. 생산만 늘리는 게 아니라 운영 조직도 동시에 스케일업 중이야. 채용 공고는 실행 계획이 확정됐다는 증거야.",
    likes: 27,
    comments: 2,
    created_at: "2026-06-25T00:40:00.000Z",
    liked: false,
  },
  {
    id: -164,
    alias: "마포 독수리 #52",
    symbol: "SPCX",
    content:
      "SPCX NASDAQ-100 7월 6일 편입 — 채널 체크해봤어. 오늘 SPCX 최대 카탈리스트야. 1) 편입 공식 발표: 6월 중순 NASDAQ이 7/6 편입 확정. 2) 자동 매수 구조: QQQ AUM $320B × SPCX 비중 0.15% 가정 = $4.8억 강제 매수. 가격·실적 무관한 기계적 수요야. 3) 시퀀스: 발표 후 패시브 선행 매수 → 7/6 리밸런싱 당일 최대 수요 → 이후 지속 보유. 세 구간 모두 수급 개선이야. 4) S&P500 편입 선례: 편입 발표일부터 발효일까지 평균 +8.6% 상승. 이후 60일 +3.2% 추가. SPCX가 이 패턴 따른다면 7/6까지 포지션 유지 유리해. 5) QQQ 외에도 iShares NASDAQ-100·Invesco QQQ Trust 등 추종 펀드 50개+가 있어. 합산 수동 매수 규모가 훨씬 커. 구조적 수급 개선이 확정된 거야.",
    likes: 50,
    comments: 3,
    created_at: "2026-06-25T00:33:00.000Z",
    liked: false,
  },
  {
    id: -165,
    alias: "여의도 황소 #77",
    symbol: "SPCX",
    content:
      "SPCX Starmind 계약 — 채널 체크해봤어. Starmind가 SPCX와 계약 체결한 게 오늘 주목할 신호야. 1) Starmind는 AI 기반 기업 지식관리 플랫폼이야. Fortune 500 고객 50+ 보유. 2) 계약 내용: Starlink Direct-to-Cell + Starmind AI 통합 솔루션. 기업 직원이 어디서든 AI 어시스턴트에 연결되는 서비스야. 3) B2B 수익 구조: 기업당 월 $500~2,000 구독. 50개사 × $1,200 평균 = 월 $6만. 단독으론 작아 보여도 Starlink B2B 생태계 확장의 증거야. 4) Starlink B2B가 왜 중요한가: B2C ARPU $65 대비 B2B ARPU $1,200+. 고객 수가 절반이어도 매출은 20배. 믹스 개선이 SPCX 수익성을 높이는 핵심 드라이버야. Starmind 같은 AI 기업 파트너십이 B2B 파이프라인을 확장하고 있어.",
    likes: 43,
    comments: 2,
    created_at: "2026-06-25T00:26:00.000Z",
    liked: false,
  },
  {
    id: -166,
    alias: "동대문 팔콘 #38",
    symbol: "SPCX",
    content:
      "SPCX AI1 위성 스펙 분해해봤어 — 이게 Starlink 차세대 기반이야. SpaceX가 공개한 AI1 위성 스펙 채널 체크해봤어. 1) 규모: 처리 능력 기존 V3 대비 10배. 온보드 AI 칩 탑재 확인. 2) AI1의 의미: 위성 자체가 엣지 컴퓨팅 노드야. 지상국 없이 위성 간 AI 처리가 가능해. 레이턴시 현재 23ms → 8ms로 낮아지는 게 핵심. 3) 적용: Direct-to-Cell 다음 세대 기술. 일반 스마트폰에서 위성 직접 접속 + AI 추론 = 지구상 어디서나 AI 사용 가능. 4) 경쟁사 우위: OneWeb·Amazon Kuiper는 이 수준의 온보드 AI 탑재 위성 없어. SpaceX 독점적 기술 경쟁력이야. 5) 상업화 타임라인: AI1 배치 시작하면 Starlink 서비스 단가 상향 가능. ARPU 개선 → SPCX 수익성 직접 연결. 위성 하드웨어가 AI 경쟁력의 기반이야.",
    likes: 36,
    comments: 2,
    created_at: "2026-06-25T00:19:00.000Z",
    liked: false,
  },
  {
    id: -167,
    alias: "성북 황소 #44",
    symbol: "SPCX",
    content:
      "SPCX Oldendorff 화물선 계약 — 채널 체크해봤어. Oldendorff Carriers가 Starlink 해상 통신 계약 체결한 게 오늘 신호야. 1) Oldendorff는 독일계 글로벌 벌크 화물선 운영사야. 선박 700척+ 운영 중. 2) 계약 내용: Starlink Maritime 서비스 전 선대 도입. 선박당 월 $1,000~5,000 Maritime 요금제. 700척 × $3,000 평균 = 월 $210만. 3) Maritime Starlink가 왜 비싼가: 선박은 이동형이라 지상 광케이블 불가능. Viasat·Intelsat 기존 서비스 대비 Starlink가 속도 10배·비용 50% 낮아. 4) 해운 시장 TAM: 글로벌 선박 10만 척 × $3,000/월 = 연 $36억. Starlink 점유율 80% 목표면 $28.8억 maritime 매출이야. Oldendorff 계약이 해운 대형 고객 도미노의 시작이야.",
    likes: 29,
    comments: 2,
    created_at: "2026-06-25T00:12:00.000Z",
    liked: false,
  },
  {
    id: -168,
    alias: "노원 독수리 #61",
    symbol: null,
    content:
      "Tesla+SpaceX RenewHome 시너지 — 채널 체크해봤어. Renew Home이 Tesla Powerwall + Starlink 통합 주택 솔루션 출시한 게 오늘 포인트야. 1) Renew Home: 미국 최대 주택 에너지 관리 플랫폼. 가입 가정 350만 호. 2) 솔루션: Powerwall 2 + Starlink 기본 세트. 가정용 에너지+통신 올인원. 번들 가격 $6,500. 3) 수익 구조: Tesla Powerwall 마진 30% = $1,950/가정. Starlink 월 $120 구독 = 연 $1,440. 가정당 연간 Tesla·SpaceX 합산 수익 $3,390. 4) Renew Home 350만 가정 × 10% 전환 = 35만 가정 × $3,390 = 연 $11.9억 번들 수익. 5) Tesla와 SpaceX가 같은 가정에 제품 2개 팔면서 에너지+통신 인프라를 장악하는 거야. Elon 생태계 통합 전략이 가정용 시장까지 들어오는 거임. TSLA·SPCX 동시 수혜야.",
    likes: 76,
    comments: 3,
    created_at: "2026-06-25T00:05:00.000Z",
    liked: false,
  },
  {
    id: -169,
    alias: "강동 황소 #83",
    symbol: "MU",
    content:
      "Micron Q3'26 어닝 서프라이즈 — 채널 체크해봤어. MU 어닝 서프라이즈가 TSLA·SPCX 포트폴리오에 왜 중요한지 분해해봐. 1) MU Q3'26: 매출 $10.8B (컨센 $9.9B 상회), EPS $2.05 (컨센 $1.62 상회). HBM3E 매출이 전 분기 대비 2배. 2) HBM3E = AI 가속기 필수 메모리. NVIDIA H200·GB300 GPU 핵심 부품이야. MU 서프라이즈 = AI 서버 투자 지속 확인. 3) TSLA 연결: Cybercab FSD AI 추론 칩 → Colossus AI 데이터센터 확장 → HBM3E 수요 증가. Tesla 자체 DOJO 칩 외에 상용 AI칩 활용 구조에서 MU 실적이 AI 수요 바로미터야. 4) SPCX 연결: SpaceX Colossus에 H200 400K 확장 계획 → MU HBM3E 수요 직접 연결. 5) AI 반도체 수요 강세 = TSLA·SPCX가 투자하는 AI 인프라 수요도 건강하다는 신호야. 포트폴리오 방향성이 맞아.",
    likes: 58,
    comments: 3,
    created_at: "2026-06-24T23:58:00.000Z",
    liked: false,
  },
  // ── 2026-06-24 신규 ──────────────────────────────────────────────────────
  {
    id: -144,
    alias: "서초 황소 #52",
    symbol: "TSLA",
    content:
      "Tesla 사고 오보 패턴 채널 체크해봤어 — 이번 SFO 사이버트럭 건도 똑같아. 언론 초기 보도 '자율주행 사고' → NTSB 예비 보고서 '운전자 과실' → 정정 보도 묻힘. 1) 사고 당시 FSD 미사용 상태였음. 2) NTSB 현장 조사 결과 운전자 급제동 실패. 3) 초기 헤드라인이 주가 -2% 유발 → 보고서 후 회복. 이 패턴을 카탈리스트로 역이용하는 게 가능해. Tesla 관련 사고 뉴스 나오면 NTSB 보고서 나올 때까지 기다리는 것만으로도 알파 발생해. 언론 바이어스를 이해하면 매수 타이밍이 보이는 거야.",
    likes: 67,
    comments: 2,
    created_at: "2026-06-24T01:15:00.000Z",
    liked: false,
  },
  {
    id: -145,
    alias: "강남 독수리 #38",
    symbol: "TSLA",
    content:
      "Q2 440K 채널 체크 분해해봤어 — 컨센서스 384K 상회가 어떻게 가능한지. 1) 상하이: Model 3/Y 추가 시프트 가동 → 주당 6,000대 추가. 2) 베를린: Q1 정비 이슈 완전 해소, Model Y RWD 생산라인 100% 정상화. 3) 기가 텍사스: Cybertruck 슬로우다운 → 라인 Model Y 전환으로 볼륨 확보. 세 공장 다 업사이드 있어. 384K가 floor이고 440K가 ceiling인 상황이야. 7월 초 실제 발표 전에 포지션 잡는 게 맞아. Q2 서프라이즈 → 어닝 추정 상향 → 주가 리레이팅 시퀀스야.",
    likes: 98,
    comments: 3,
    created_at: "2026-06-24T01:08:00.000Z",
    liked: false,
  },
  {
    id: -146,
    alias: "한강 팔콘 #75",
    symbol: "TSLA",
    content:
      "FSD 유럽 6개국 승인의 진짜 의미 분해해봤어 — 표면적으론 단순 규제 통과인데 안을 보면 달라. 1) EU 규제 프레임워크(UNECE WP.29 R157)에서 Tesla FSD가 '조건부 자율주행' 인증 받은 거야. 2) 6개국 동시 승인 = 3개 이상 EU 회원국 상호 인정 원칙 발동 → 나머지 EU 21개국 자동 인정 절차 개시. 3) 유럽 Tesla 보유 대수 약 70만 대 × FSD 구독 전환율 20% = 14만 구독 × €199/월 = 월 €2,800만 추가 recurring revenue. 4) FSD 구독 마진 80%+ = 이게 바로 EPS에 찍히는 수치야. 유럽 시장 열림이 FSD 구독 매출 성장의 2번째 S커브야.",
    likes: 6,
    comments: 2,
    created_at: "2026-06-24T01:01:00.000Z",
    liked: false,
  },
  {
    id: -147,
    alias: "잠실 황소 #27",
    symbol: "TSLA",
    content:
      "Tesla Megapack AUD 35억 계약 숫자 분해해봤어 — 역대 최대 단일 ESS 계약의 의미. AUD 35억 ≈ USD 22억이야. 1) Tesla 에너지 부문 FY25 연간 매출 $14B 대비 이 계약 하나가 ~16%야. 2) Megapack 단가 $1.5M/MWh 역산하면 이 계약 약 1,467MWh 규모. 3) 납품 기간 3년 = 연간 $7억 에너지 매출 보장. 4) Neoen이 1위 고객사가 되면 후속 확장 계약 가능성 높아. 에너지 부문 마진 30%+ × 이 계약 = 연 $2억+ 영업이익 추가. FY26 에너지 매출이 자동차 매출 추월하는 시나리오의 핵심 건이야.",
    likes: 3,
    comments: 2,
    created_at: "2026-06-24T00:54:00.000Z",
    liked: false,
  },
  {
    id: -148,
    alias: "목동 독수리 #64",
    symbol: "SPCX",
    content:
      "SpaceX $89B 채권 발행 구조 채널 체크해봤어 — 단순 자금 조달이 아니야. 1) Starlink V3 Gen2 위성 생산라인 증설: 현재 4,000기 → 목표 12,000기. 제조 단가 낮추려면 생산라인 자동화 투자 필요. 2) Colossus 2단계: H100 200K → H200 400K. 이게 Anthropic·Google의 다음 계약 용량을 결정해. 3) 발행 타임라인: BBB+ 첫 우주 기업 채권 → 보험사·연기금 의무 편입 대상 → 초과 수요 예상 → 발행 금리 T+80~100bp 수준 추정. 4) 브릿지론 $20B 상환 + 확장 투자 자금 나머지. 채권 성공 발행이 SpaceX 재무 성숙도의 증거야.",
    likes: 20,
    comments: 3,
    created_at: "2026-06-24T00:47:00.000Z",
    liked: false,
  },
  {
    id: -149,
    alias: "청담 매 #41",
    symbol: "TSLA",
    content:
      "Grok5 10T 파라미터 + Tesla FSD 통합 가능성 채널 체크해봤어. 1) 10T 파라미터 의미: GPT-4o 대비 ~5.5배 규모. 추론 속도는 느려지지만 정확도·맥락 이해가 올라가. 2) Tesla FSD v13.x에서 xAI Grok 통합 실험 진행 중 확인됐어. 차량 내 AI 어시스턴트 → FSD 예외 상황 처리 보조 역할. 3) On-device vs 클라우드: 10T 파라미터를 차량 칩에 올리는 건 불가능. 클라우드 추론 방식으로 Starlink 연결 통해 Colossus에서 추론. 4) Grok5 + Starlink + Colossus = Tesla 차량이 이동형 AI 단말이 되는 거야. 경쟁사가 이 수직통합 복제하려면 5년 이상 걸려.",
    likes: 17,
    comments: 2,
    created_at: "2026-06-24T00:40:00.000Z",
    liked: false,
  },
  {
    id: -150,
    alias: "신림 황소 #86",
    symbol: null,
    content:
      "매크로 3가지 동시 악재 분해해봤어 — DXY 103 반등·이란 불발·연준 동결. 1) DXY 103: 달러 강세는 달러 표시 수출 기업(Tesla 해외 매출 50%+)에 역풍. 단기 EPS 달러 환산 불리. 2) 이란 핵 협상 불발: WTI 유가 $5~8 추가 상승 예상. Tesla Gigafactory 전력 비용 증가. 단, Megapack·태양광 수요 동반 증가 → 에너지 사업 긍정. 3) 연준 동결 연장: 할인율 높아지면 DCF 기반 성장주 밸류에이션 압박. 그러나 TSLA·SPCX는 DCF 의존도보다 모멘텀·스토리 기반 멀티플이 지배적. 결론: 단기 노이즈, 펀더멘털 변화 없음. 조정이면 매수 기회야.",
    likes: 14,
    comments: 2,
    created_at: "2026-06-24T00:33:00.000Z",
    liked: false,
  },
  {
    id: -151,
    alias: "합정 팔콘 #19",
    symbol: "TSLA",
    content:
      "DeepSeek 음성AI + Tesla FSD 통합 채널 체크해봤어 — 비용 구조 혁명이야. 1) DeepSeek R2 음성 모델: 실시간 음성 인식 + TTS + 맥락 대화. API 비용 $0.002/1K tokens = OpenAI 대비 1/20. 2) Tesla FSD 차내 AI 현재 구조: OpenAI GPT 기반 차량 어시스턴트 + Elon이 대안 검토 중. 3) DeepSeek 통합 시 원가 절감: 전 세계 400만 FSD 구독 차량 × 차량당 월 AI 추론 비용 절감 = 연 수천만 달러 비용 절감. 4) FSD 구독 마진이 추가로 개선됨. 5) 중국 규제 리스크: 미국이 DeepSeek API 사용 금지하면 플랜 B 필요. Grok5가 플랜 B야. 비용+성능 최적화 로드맵이 명확해.",
    likes: 11,
    comments: 2,
    created_at: "2026-06-24T00:26:00.000Z",
    liked: false,
  },
  {
    id: -152,
    alias: "당산 늑대 #53",
    symbol: "TSLA",
    content:
      "Optimus 중국 공급망 채널 체크해봤어 — $10K 원가 구조 어떻게 가능한지. 1) 감속기(하모닉 드라이브): BYD 계열사 단가 $800/관절 × 12관절 = $9,600. 미국산 Harmonic Drive $3,000/관절이면 $36,000. 2) 전자피부 센서: CATL 신소재 부문 단가 미공개지만 중국 MEMS 센서 가격 90% 저렴. 3) 전기모터: Foxconn 정밀 모터 부문 단가 최적화. 합산하면 BOM(부품 원가) $10K 이하 달성 가능해. 지정학 위험이 있지만 공급망 이원화 완료까지 중국 공급망이 유일한 현실적 옵션이야. $20K 판매가 → $10K 원가 = 로봇 마진 50%는 아이폰 마진 40% 능가해.",
    likes: 8,
    comments: 3,
    created_at: "2026-06-24T00:19:00.000Z",
    liked: false,
  },
  {
    id: -153,
    alias: "망원 황소 #49",
    symbol: "SPCX",
    content:
      "Starlink 9,200만 가입자 수익화 구조 분해해봤어 — 표면적 숫자보다 단가 믹스가 중요해. 1) 소비자: 월 $25~130. 평균 $65 가정. 2) 기업: 월 $500~3,000. 평균 $1,200 가정. 3) 정부·군사: 월 $10,000+. 소비자 85% + 기업 13% + 정부 2%로 믹스 추정. 가중 평균 ARPU $150/월. 9,200만 × $150 = 월 $138억 = 연 $1,656억 매출. Starlink 단독으로 이미 Fortune 50 수준이야. Direct-to-Cell 가입자 추가되면 ARPU는 낮아지지만 볼륨이 10배 뛰어. 2027년 1억 5천만 돌파하면 Starlink가 세계 최대 통신사 중 하나가 되는 거야.",
    likes: 5,
    comments: 2,
    created_at: "2026-06-24T00:12:00.000Z",
    liked: false,
  },
  {
    id: -154,
    alias: "홍대 팔콘 #34",
    symbol: "TSLA",
    content:
      "Tesla 한국 FSD 서버 이전 채널 체크해봤어 — 이게 단순 인프라 이슈가 아니야. 1) 서버 이전 이유: 한국 개인정보보호법(PIPA)에서 금융·차량 데이터 국내 보관 의무화 추진 중. FSD 주행 데이터 = 개인 위치정보로 분류될 수 있어. 2) 규제 타임라인: 개정안 통과 시 외국 기업 6개월 이행 유예. Tesla가 선제적으로 움직인 거야. 3) 한국 FSD v13 출시 타임라인: 서버 이전 완료 → ADAS 인증(국토부) → 실도로 테스트 승인 순서. 빠르면 Q4 2026 출시. 4) 한국 Tesla 등록 대수 약 4만 7천 대. FSD 전환율 20% = 9,400 구독 × $199/월 = 월 $187만 한국 FSD 매출. 작아 보이지만 아·태 도미노의 시작이야.",
    likes: 2,
    comments: 3,
    created_at: "2026-06-24T00:05:00.000Z",
    liked: false,
  },
  {
    id: -155,
    alias: "연남 독수리 #88",
    symbol: "TSLA",
    content:
      "Tesla 로보택시 월 500만 마일 숫자 분해해봤어 — Waymo 추격 속도가 핵심이야. 1) Waymo: 2009년 시작, 2024년 700만 마일/월. Tesla 로보택시: 2026년 1월 오스틴 출시 → 6개월만에 500만 마일. 2) 학습 데이터 누적 속도: Waymo 지도 기반 vs Tesla 비전 기반. Tesla는 주행 거리 늘수록 AI 모델 품질이 Waymo보다 빠르게 올라가. 3) 수익성 분기점 1,000만 마일/월: 추정 운임 $2/마일 × 1,000만 = 월 $2,000만 매출. 차량 감가·보험·유지비 제외 후 흑자 전환 지점이야. Q4 2026 달성 가능하면 로보택시 사업부 독립 공시 시작될 수 있어. 이게 Tesla 멀티플 리레이팅의 가장 강력한 카탈리스트야.",
    likes: 19,
    comments: 2,
    created_at: "2026-06-23T23:58:00.000Z",
    liked: false,
  },
  {
    id: -156,
    alias: "연희 황소 #45",
    symbol: "SPCX",
    content:
      "Dragon XL + Starlink 100Gbps 모듈 채널 체크해봤어 — 우주 데이터센터 로드맵이야. 1) Dragon XL: 발사 중량 5.5t, ISS 화물 운반 설계. 100Gbps Starlink 모듈 탑재 확인. 2) 기술 의미: 현재 ISS ↔ 지상 간 데이터 속도 600Mbps. 100Gbps로 오르면 167배. 우주 실험 데이터 실시간 전송 가능. 3) 우주 데이터센터 플랜: Starlink 위성이 분산 컴퓨팅 노드 역할. 지구 저궤도 냉각·전력 이점 활용. 4) AWS·Azure 경쟁: 2030년대 우주 클라우드 TAM $500B 추정. SpaceX만 발사체+통신+컴퓨팅 수직통합 가능한 유일한 플레이어야. 이 로드맵 완성되면 SPCX는 AWS+SpaceX 밸류에이션 받아야 해.",
    likes: 16,
    comments: 2,
    created_at: "2026-06-23T23:51:00.000Z",
    liked: false,
  },
  {
    id: -157,
    alias: "상암 늑대 #67",
    symbol: "SPCX",
    content:
      "ARK $22M SPCX 매수 패턴 채널 체크해봤어 — 기관 수급 신호 분석이야. 1) ARK SPACE ETF 주간 순매수 $22M은 ETF 운용 자산 대비 약 3.2%. 단일 주 이 비중 집중 매수는 이례적이야. 2) S&P500 편입 후 기관 자금 유입 흡수하는 포지션 확대 전략으로 읽혀. 3) Cathie Wood $300 목표가 분해: SpaceX IPO 시 $300B 밸류 가정. SPCX가 SpaceX 30% 지분 보유라면 SPCX 기업가치 $90B. 현재 시총 $45B → 업사이드 2배. 2030년 로드맵이면 연 CAGR 14%. 4) ARK 매수 → ETF 지수 편입 관련 패시브 자금 유입 → 추가 수급 강화 순환 구조. 역발상 매수의 완성은 왜 지금이냐에 있고 ARK가 그 이유를 알고 있는 거야.",
    likes: 13,
    comments: 3,
    created_at: "2026-06-23T23:44:00.000Z",
    liked: false,
  },
  // ── 2026-06-23 추가 (사이버캡·라스롭) ────────────────────────────────────
  {
    id: -143,
    alias: "마포 황소 #37",
    symbol: "TSLA",
    content:
      "사이버캡 기가 텍사스 테스트 — 현장 채널 체크 해봤어. Joe Tegtmeyer가 직접 포착한 영상 보면 10대가 한 팩으로 움직이고 있어. 이게 단순 기능 테스트가 아니야. 군집 주행(fleet coordination) 테스트야. 로보택시 서비스에서 여러 차량이 동시에 운영될 때 필요한 시스템 검증이에요. 신규 FSD 카메라 탑재 확인됐고 기가 텍사스 서비스 가동 1주년 시점에 이게 나왔다는 게 메시지야. Elon이 올해 하반기 로보택시 서비스 확대 얘기했는데 이게 그 전제 조건 달성 중이야. S커브 초입 지금이 진입 타이밍이야.",
    likes: 85,
    comments: 3,
    created_at: "2026-06-23T09:12:00.000Z",
    liked: false,
  },
  {
    id: -142,
    alias: "송파 팔콘 #61",
    symbol: "TSLA",
    content:
      "라스롭 메가팩토리 풀 캐파 숫자 분해해봤어 — Tesla Semi + Megapack 동시 풀 가동이야. 1) Tesla Semi: Class 8 전기 트럭 납품 본격화 단계. PepsiCo·UPS 등 초기 고객사 인도량 증가. 2) Megapack: 유틸리티급 ESS 수요 폭발 중. 美 전력망 투자 + 데이터센터 백업 전력 수요가 두 배로 쌓이고 있어. 라스롭 풀 캐파 = Q2 에너지 배송량 최고치 경신 전망. Q1 에너지 수익이 $2.7B이었는데 Q2는 그 이상 나올 가능성 높아. 자동차 부문 둔화 우려 상쇄하고도 남아. TSLA 에너지 사업 마진이 30%대 → EPS 서프라이즈 구조야.",
    likes: 24,
    comments: 3,
    created_at: "2026-06-23T09:04:00.000Z",
    liked: false,
  },
  // ── 2026-06-23 신규 ──────────────────────────────────────────────────────
  {
    id: -141,
    alias: "관악 황소 #78",
    symbol: "SPCX",
    content:
      "SpaceX 3관왕 신용등급이 오늘 핵심이야. 이유는 — Moody's Baa1, Fitch BBB+, S&P BBB+ 세 곳 동시 획득은 단순 신용 이벤트가 아님. 연기금·국부펀드·보험사 같은 기관 투자자들은 투자등급 이상 자산만 매수 가능한 내부 정관이 있어. SpaceX가 오늘부터 그 문을 연 거야. 전 세계 기관 자금 운용 규모가 수천조 달러인데 그 중 일부만 SPCX로 흘러와도 수요 구조가 완전히 달라지는 거임. 채권 발행 금리도 이전 대비 1~2% 낮아져. $50B 발행하면 연 $500~1,000M 이자 절감이야. 재무 효율화가 그냥 숫자 이상임. SpaceX가 공개시장에 완전히 편입되는 역사적 순간이야.",
    likes: 31,
    comments: 3,
    created_at: "2026-06-23T08:58:00.000Z",
    liked: false,
  },
  {
    id: -140,
    alias: "영등포 매 #22",
    symbol: "SPCX",
    content:
      "SpaceX 현금 보고 한 가지 숫자가 눈에 들어왔어 — $100.8B. FY25 말 $34.7B에서 6개월에 3배야. 어떻게 이게 가능하냐 분해해보면 Starlink 구독 폭발 + Space Force $22.9억 + IPO 자금 조달이 동시에 터진 거임. 이 중 Starlink 구독이 핵심이야. 가입자 수천만 명에 기업·정부 Starlink 단가가 일반 소비자의 5~10배야. 월 $1,000 기업 요금제 × 100만 기업 고객 = 월 $10억이야. 이게 매달 쌓이는 거거든. $100B 현금이면 외부 차입 없이도 Starlink V3 전체 위성 생산비 + Colossus AI 데이터센터 확장 + M&A까지 다 자체 조달 가능한 수준임. 이걸 알고 SPCX 가치를 다시 계산해봐야 함.",
    likes: 38,
    comments: 3,
    created_at: "2026-06-23T08:50:00.000Z",
    liked: false,
  },
  {
    id: -139,
    alias: "성북 팔콘 #57",
    symbol: "SPCX",
    content:
      "SpaceX 채권 발행 쪽 채널 체크해봤는데 — 이번 채권이 단순 자금 조달이 아니야. 타임라인이 있어. 1) SEC 사전 통보 → 2) 3사 신용등급 획득 → 3) 채권 발행 → 4) 브릿지론 상환 순서임. 이 흐름이 며칠 내에 다 일어났어. 준비가 다 끝났다는 거야. 투자등급 BBB+ 첫 채권은 시장에서 희귀한 우주 섹터 채권으로 수요 초과 예상됨. 금리 프리미엄도 낮을 거야. 채권 발행 성공하면 SpaceX가 주식·채권 양면에서 기관 투자자를 끌어들이는 구조가 완성돼. 우주 기업 최초로 투자등급 채권 발행 — 교과서에 남을 이벤트임.",
    likes: 45,
    comments: 2,
    created_at: "2026-06-23T08:42:00.000Z",
    liked: false,
  },
  {
    id: -138,
    alias: "이태원 늑대 #43",
    symbol: "SPCX",
    content:
      "SpaceX IPO 주가 흐름 다시 뜯어봤는데 — $155 공모 → $200 최고 → $168 현재, 이 10거래일 사이클에 메시지가 있어. 처음 $200까지 오른 건 IPO 희귀성 프리미엄이야. 유동성 없던 SpaceX에 공개시장 자금이 한꺼번에 들어간 거거든. 그러다 $168로 조정된 건 단기 차익 실현 + 시장이 적정 가격 찾는 과정이야. 중요한 건 공모가 $155 대비 여전히 +8.4%라는 것. 펀더멘털 악화가 아니라 가격 발견 프로세스임. $100 이하로 취득한 pre-IPO 홀더들은 여전히 +68%야. 시장이 $155~160 공모가 지지선을 지킨다면 장기 투자자 입장에서 이 조정은 노이즈야.",
    likes: 22,
    comments: 3,
    created_at: "2026-06-23T08:34:00.000Z",
    liked: false,
  },
  {
    id: -137,
    alias: "광화문 황소 #91",
    symbol: "SPCX",
    content:
      "SpaceX Colossus AI 고객 리스트 보고 한 가지 패턴이 눈에 들어왔어 — Anthropic, Google, Reflection AI. 이 세 곳이 공통점이 있어. 다들 AI 모델 학습에 GPU가 엄청나게 필요한데 NVIDIA GB300을 확보하려면 SpaceX Colossus가 현재 가장 빠른 경로야. 왜냐 — Colossus가 GB300 즉시 접근 계약을 체결했거든. AWS·Azure·GCP보다 최신 칩을 먼저 받는 구조임. Reflection AI $6.38B이 3번째 고객이라는 게 포인트야. 이 계약 구조가 반복되면 Colossus AI는 AI 기업들의 필수 인프라로 자리잡는 거임. SpaceX 수익 모델이 우주 → 위성 통신 → AI 컴퓨팅으로 확장되는 걸 숫자로 보여주는 거야.",
    likes: 29,
    comments: 3,
    created_at: "2026-06-23T08:26:00.000Z",
    liked: false,
  },
  {
    id: -136,
    alias: "관악 팔콘 #64",
    symbol: "TSLA",
    content:
      "Jefferies $375가 오늘 TSLA 핵심이야. 이유는 — 목표주가 상향이 의미있는 건 단순 숫자가 아니라 프레임 변화임. Jefferies가 Tesla를 '자동차 회사'가 아니라 '멀티버티컬 AI 플랫폼'으로 분류하기 시작한 거야. 이 프레임 전환이 기관 투자자들에게 영향을 미쳐. 자동차 섹터 PE가 아니라 AI 플랫폼 배수로 봐야 한다는 논리가 커버리지 리포트에 공식적으로 들어간 거거든. 상향 근거 3가지 — Cybercab 속도, Optimus 7~8월 양산, FSD 142만 구독. 이 3개가 동시에 수렴하는 분기에 목표주가가 올라가는 거야. 다른 증권사들도 따라올 가능성이 높아.",
    likes: 36,
    comments: 3,
    created_at: "2026-06-23T08:18:00.000Z",
    liked: false,
  },
  {
    id: -135,
    alias: "동작 매 #33",
    symbol: "TSLA",
    content:
      "TSLA Q2 컨센서스 보고 한 가지 숫자가 눈에 들어왔어 — 384,022대. 왜 이 숫자가 중요하냐. Q1 345k에서 +11%인데 이 회복 속도가 시장 예상보다 빨라. 상하이가 Model 3 30,217대 +4% 달성하면서 선두 역할 한 거야. 유럽 수출 포함된 숫자라는 것도 중요해. 기가상하이 가동률이 95%+ 유지되면 이 속도가 Q3에도 이어지는 거임. 7월 초 실제 발표가 384k 초과하면 '예상 상회' 모멘텀이 주가에 즉각 반영돼. 반대로 미달하면 단기 실망 매물이 나와. 384k 라인이 지금 가장 중요한 숫자야.",
    likes: 19,
    comments: 2,
    created_at: "2026-06-23T08:10:00.000Z",
    liked: false,
  },
  {
    id: -134,
    alias: "여의도 황소 #81",
    symbol: "TSLA",
    content:
      "중국 CAAM 데이터 쪽 채널 체크해봤는데 — Tesla가 Q2에 SAIC와 함께 단 2개 브랜드만 YoY 플러스야. BYD -7%, GM -10%, Toyota -12% 다 빠지는 시장에서 Tesla만 +4%. 이게 가격 경쟁에서 이긴 게 아니라 브랜드 포지셔닝에서 이긴 거야. Tesla는 중국에서 프리미엄 세그먼트를 지켜가고 있어. CAAM이 Model 3를 세단으로 분류했는데 이 카테고리에서 혼자 성장한다는 게 경쟁력 지표야. 중국 FSD 서비스 인허가 나오면 이게 구매 동인이 하나 더 생기는 거야. 중국 리스크가 다시 부각될 때마다 이 데이터 꺼내봐.",
    likes: 2,
    comments: 2,
    created_at: "2026-06-23T08:04:00.000Z",
    liked: false,
  },
  {
    id: -133,
    alias: "서대문 늑대 #56",
    symbol: "TSLA",
    content:
      "Optimus 프리몬트 사진 봤는데, 속도가 예상보다 빠르게 진행되고 있어 — Model S/X 라인이 이미 Optimus 전용으로 전환 완료됐어. 7~8월 양산 시작이 Elon 직접 확인이라는 게 중요해. 통상 이런 발언은 현장 준비가 90%+ 됐을 때 나와. 연간 1M대 목표가 프리몬트 혼자라는 것도 눈여겨봐야 해. 오스틴 2공장 10M대 계획까지 더하면 Tesla 로봇 생산 capacity가 어마어마한 거야. 2027년 외부 판매 시작 시점에 로봇 사업 EPS 기여가 처음으로 실적에 잡혀. 그때 Tesla PER이 어떻게 바뀌는지 상상해봐. 자동차 P/E가 아니라 로봇 P/E로 바뀌는 날이 올 거야.",
    likes: 5,
    comments: 3,
    created_at: "2026-06-23T08:58:00.000Z",
    liked: false,
  },
  {
    id: -132,
    alias: "이촌 팔콘 #28",
    symbol: "GOOGL",
    content:
      "GOOGL -6% 결과랑 딱 맞아 떨어져서 오래전부터 생각해온 걸 정리함 — AI 모델 경쟁의 진짜 해자는 GPU나 데이터센터가 아님. John Jumper 한 명이 Anthropic 가니까 Alphabet 시총이 $344B 줄었어. 노벨 화학상 연구자 1명 = 수십조 원 기업 가치. 이게 인프라로 복제 가능하냐? 불가능해. GPU 수만 대는 돈으로 사면 되지만 AlphaFold 만든 사람은 돈만으론 대체가 안 돼. AI 경쟁이 하드웨어 군비 경쟁에서 인재 보유 전쟁으로 이동하는 신호야. 구글이 이 전쟁에서 지면 Gemini 성능 격차가 벌어지는 거임. 앞으로 빅테크 AI 인재 보상 패키지가 천문학적으로 올라갈 거고 이게 마진에 부담이 될 수 있어.",
    likes: 8,
    comments: 3,
    created_at: "2026-06-23T08:46:00.000Z",
    liked: false,
  },
  {
    id: -131,
    alias: "용산 독수리 #95",
    symbol: "MSFT",
    content:
      "MSFT Xbox 쪽 채널 체크해봤는데 — 스핀오프·JV·매각 3가지 옵션 다 열어두고 검토 중이야. 이게 발표라기보다 의사결정 프로세스가 외부에 흘러나온 거야. 왜 지금이냐 — 현금 $103.8B에 Copilot·Azure가 폭발적으로 성장하는데 Xbox 성장률이 상대적으로 낮아. Activision까지 $69B 투자한 게임 포트폴리오가 AI 쪽 자원 배분을 제약하고 있을 수 있어. Xbox 매각으로 수십억 달러 확보하면 OpenAI 추가 투자든 Anthropic 지분이든 AI 베팅 여력이 생기는 거임. 시장 반응이 긍정적이면 MSFT가 'pure AI+cloud play'로 재포지셔닝되는 거야. PVGO 36%가 AI 수익화 가시화되면 S&P500 평균(55%) 수준으로 올라가는 밸류에이션 재평가 시나리오가 나와.",
    likes: 11,
    comments: 3,
    created_at: "2026-06-23T08:38:00.000Z",
    liked: false,
  },
  // ── 2026-06-22 신규 ──────────────────────────────────────────────────────
  {
    id: -130,
    alias: "용산 팔콘 #47",
    symbol: "SPCX",
    content:
      "SpaceX Cursor $80B 인수 분석 — 표면적으로는 AI 코딩 도구 M&A인데 본질은 SpaceX의 소프트웨어 수직통합 전략임. Starlink 통신 인프라 위에 개발자 도구 레이어를 올리는 거야. 우주 인프라 기업이 개발자 플랫폼을 가져가면 뭐가 달라지냐 — B2B 엔터프라이즈 고객이 Cursor 쓰다가 자연스럽게 Starlink 클라우드로 이동하는 락인 구조가 만들어지는 거임. Cursor ARR이 수십억 달러 수준이면 SpaceX 전체 수익 구조가 반복 매출 기반으로 재편돼. Falcon 발사가 프로젝트성이라면 Cursor 구독은 매달 들어오는 거거든. 밸류에이션 $350B이 기존 사업 기준이었다면 Cursor 인수 후엔 소프트웨어 프리미엄이 더해지는 거야. SPCX 장기 투자 시나리오에 소프트웨어 레이어가 추가되는 날이야.",
    likes: 14,
    comments: 3,
    created_at: "2026-06-22T08:58:00.000Z",
    liked: false,
  },
  {
    id: -129,
    alias: "서초 늑대 #63",
    symbol: "TSLA",
    content:
      "Tesla Semi LIDAR FSD 보정 포착 — 카메라 온리 원칙 포기 아님. 이 구분이 중요해. LIDAR로 정밀 3D 지도 만들어서 카메라 AI 학습 데이터 레이블링 정확도 높이는 거임. 결국 프로덕션 차량은 카메라로만 가는 건데 그 카메라 AI를 훨씬 정밀하게 만드는 거야. Semi 자율주행의 전략적 가치는 따로 봐야 해 — 화물 운송 시장 TAM이 $1조인데 마일당 과금 모델이 붙으면 Tesla Energy 사업 규모급 반복 매출이 생기는 거임. Semi 1만 대 × 연 20만 마일 × $0.10/마일 = 연 $2억. 100만 대면 $200억이야. 이 시나리오가 2027~2028에 시작된다는 거임.",
    likes: 17,
    comments: 3,
    created_at: "2026-06-22T08:54:00.000Z",
    liked: false,
  },
  {
    id: -128,
    alias: "강북 독수리 #29",
    symbol: "TSLA",
    content:
      "스페인 DGT FSD 275,471km 무사고 공식 인증 — 유럽 규제 기관 최초야. 이게 왜 중요하냐면 EU 내 FSD 규제 허들이 이 데이터 하나로 크게 낮아지는 거거든. 독일 KBA, 프랑스 UTAC가 DGT 데이터 무시하기 어려워. EU 27개국 2.5억 운전자 시장이 FSD 구독 대상이 되는 게 이제 시간 문제임. 구독 142만에서 유럽 본격 개방되면 200만 → 300만 경로가 선명해져. 매출 영향 계산: 300만 × $99 × 12 = 연 $35.6억이고 소프트웨어 마진 80%+ 이면 영업이익 기여 $28억+야. FSD 사업 하나가 Tesla 전체 EBIT의 유의미한 부분을 차지하게 되는 거임.",
    likes: 20,
    comments: 3,
    created_at: "2026-06-22T08:50:00.000Z",
    liked: false,
  },
  {
    id: -127,
    alias: "중랑 황소 #51",
    symbol: "TSLA",
    content:
      "FSD 구독 142만 추산 — Q2 2026E 기준이야. Q1 2025 50만 대비 5분기 만에 2.84배임. 이 성장률이 유지된다고 보면 2027년 400만+가 비현실적인 수치가 아니야. 핵심은 이게 하드웨어와 독립적이라는 거야 — 차가 안 팔려도 기존 차주들이 구독하면 매출 나오거든. 로보택시 출시 전 구독자 기반이 마케팅 비용 없는 초기 수요층이 되는 거야. 유럽 DGT 인증 + 한국 구독 버튼 + 스페인 지역 이후 아시아 확산까지 이어지면 2026 하반기 가속이 올 수 있어. 소프트웨어 전환 스토리의 KPI를 구독자 수로 추적하는 게 맞아.",
    likes: 3,
    comments: 3,
    created_at: "2026-06-22T08:46:00.000Z",
    liked: false,
  },
  {
    id: -126,
    alias: "성동 매 #84",
    symbol: "TSLA",
    content:
      "MEGAPOD 상표 출원 — Tesla Energy 제품 라인 확장 신호임. Megapack이 대형 고정식 3.9MWh인데 MEGAPOD는 이름 자체가 모듈식·이동형 컨테이너 유닛 암시해. AI 데이터센터 전력 수요 긴급 대응 시장이 열리고 있잖아. 데이터센터 건설 리드타임이 18~24개월인데 MEGAPOD 설치가 3~6개월이면 AI 기업들이 전력 선점에 MEGAPOD 쓸 이유가 충분해. ESS 시장 TAM $400억+인데 중소형 이동식 세그먼트가 추가되면 Tesla Energy 의존 가능 시장이 더 넓어지는 거임. 에너지 사업이 자동차 사업 규모로 가는 경로가 이렇게 하나씩 만들어지는 거야.",
    likes: 6,
    comments: 2,
    created_at: "2026-06-22T08:43:00.000Z",
    liked: false,
  },
  {
    id: -125,
    alias: "도봉 팔콘 #36",
    symbol: "TSLA",
    content:
      "Optimus 3단계 로드맵 공개 — 2025 내부, 2026 양산, 2027 외부 판매. 이 타임라인이 현실적이냐고? 기가텍사스 3층 공사 속도로 보면 충분히 가능해. $20,000~30,000 가격대라고 머스크가 말한 적 있는데 이게 진짜 나오면 제조·물류·서비스 업종에 혁명이야. ROI 계산: 인건비 연 $5만짜리 노동자 대체에 로봇 비용 $25,000이면 6개월 회수야. 기업 입장에서 ROI가 너무 명확해서 도입 속도가 상상 이상일 수 있어. 2027년 판매 시작 → 2028년 수십만 대 → 2030년 백만 대 시나리오가 나오는 이유임. Tesla 시총 재평가 핵심 트리거야.",
    likes: 9,
    comments: 3,
    created_at: "2026-06-22T08:40:00.000Z",
    liked: false,
  },
  {
    id: -124,
    alias: "강동 매 #72",
    symbol: "TSLA",
    content:
      "Grok + FSD 통합 — xAI와 Tesla 시너지의 실질 구현이야. FSD가 시각 AI 기반으로 상황 인식은 잘 하는데 자연어 명령 처리가 약했거든. '다음 블록 왼쪽 파란 건물 앞에 세워줘' 같은 복합 명령을 이해하는 게 Grok 역할이야. 기술적으로 보면 LLM과 시각 모델의 멀티모달 통합인데 Tesla·xAI가 동일 생태계라 데이터 공유가 자유로운 게 경쟁사 대비 절대 우위야. Waymo는 Google 자체 AI 있지만 자율주행 전용 언어 모델이 따로 없어. 이 통합이 완성되면 '말로 하는 완전 자율주행'이 현실이 되는 거임. FSD 구독 이탈률이 더 낮아지고 신규 유입이 가속되는 거야.",
    likes: 12,
    comments: 2,
    created_at: "2026-06-22T08:37:00.000Z",
    liked: false,
  },
  {
    id: -123,
    alias: "노원 늑대 #58",
    symbol: "TSLA",
    content:
      "Tesla 'Amazing Abundance' 상표 출원 분석 — 단순 브랜딩이 아니야. 머스크가 반복해서 쓰는 키워드 'Abundance'를 상표화했다는 건 사업화 의도가 있다는 거임. 세 개 연결 가능한 사업이 보여. 첫째 에너지: Megapack·Powerwall 구독 플랫폼 브랜딩. 둘째 로봇: Optimus 운영 서비스 브랜딩. 셋째 이동: Cybercab 플릿 서비스 브랜딩. 세 개가 하나의 Amazing Abundance 서비스 묶음이 되면 Tesla가 '생활 인프라 구독 기업'으로 포지셔닝하는 거야. 자동차 판매 싸이클에 덜 종속되는 수익 구조로 전환되는 거임. B2B 엔터프라이즈 패키지로 팔면 계약 단가가 훨씬 커지는 거고.",
    likes: 15,
    comments: 2,
    created_at: "2026-06-22T08:34:00.000Z",
    liked: false,
  },
  {
    id: -122,
    alias: "은평 독수리 #19",
    symbol: "SPCX",
    content:
      "Space Force $22.9억 계약 — SpaceX 정부 매출 포트폴리오의 질적 변화야. 기존 NASA 발사 계약은 프로젝트 기반이었는데 이건 통신 서비스 계약이라 반복 성격이 강해. 군사용 Starlink가 저지연·암호화·재밍 저항 스펙 갖추면 기존 군사 위성 통신(SATCOM) 전체를 대체하는 거야. 미국 국방부 SATCOM 예산이 연 $60억+ 수준임을 감안하면 $22.9억은 시작이야. NATO 동맹국 계약이 줄줄이 따라올 수 있는 선례가 됐어. 상업 + 정부 + 군사 3층 수익 구조 완성이 SpaceX를 진정한 복합 방위·통신 기업으로 포지셔닝하는 거임.",
    likes: 18,
    comments: 3,
    created_at: "2026-06-22T08:31:00.000Z",
    liked: false,
  },
  {
    id: -121,
    alias: "마포 황소 #62",
    symbol: "SPCX",
    content:
      "SpaceX AI 위성 로드맵 — V2 → V3 → AI 위성 3단계. 가장 주목할 포인트는 AI 위성이 온보드 AI 칩 탑재로 지상 데이터센터 없이 추론한다는 거야. 이게 엣지 AI 컴퓨팅 패러다임이야. AWS·Azure·GCP가 지상 클라우드라면 SpaceX가 궤도 클라우드를 만드는 거임. 응용 가능한 곳이 재난 대응·해양 모니터링·국경 감시·농업 AI 등 지상 인프라 없는 지역 전체야. 2028~2030 타임라인이면 지금 AI 칩 업체들이 위성용 저전력 AI 칩 공급 계약 논의 시작하는 시점이야. 이 시장이 열리면 SpaceX 밸류에이션 프레임 자체가 바뀌는 거임.",
    likes: 1,
    comments: 3,
    created_at: "2026-06-22T08:28:00.000Z",
    liked: false,
  },
  {
    id: -120,
    alias: "강서 팔콘 #41",
    symbol: "SPCX",
    content:
      "Starlink × US Mobile 150개국 파트너십 — B2B2C 모델의 완성형이야. SpaceX가 직접 소비자 마케팅 안 해도 US Mobile 같은 파트너가 기존 고객에게 Starlink 서비스 번들하는 거임. 위성 통신이 '지구 커버리지 표준' 인프라로 자리잡는 거야. 전통 통신사 입장에서 커버리지 갭 메우는 데 직접 위성 투자보다 Starlink 파트너십이 비용 효율적이라는 걸 인정한 거임. 이 모델이 T-Mobile DTC와 결합되면 — 기존 폰으로 위성 직접 연결 — 진입 장벽이 완전히 없어지는 거야. 2026년 말~2027년에 파트너십 숫자가 50개사 이상으로 늘어날 수 있어. 구독자 ARR이 급증하는 구간이 시작되는 거임.",
    likes: 58,
    comments: 2,
    created_at: "2026-06-22T08:25:00.000Z",
    liked: false,
  },
  {
    id: -119,
    alias: "광진 독수리 #37",
    symbol: "RKLB",
    content:
      "NASDAQ100 리밸런싱 RKLB 편입 — 숫자로 보면: QQQ AUM $3,000억에서 RKLB 비중 0.1~0.2% 편입되면 $3억~6억 자동 매수가 발생해. 공개 발표부터 실제 편입일까지 2~4주 기간 동안 모멘텀이 유지되는 패턴이야. 더 중요한 건 상징성임 — 우주 기업이 NASDAQ100 들어간다는 게 기관 투자자들한테 '우주가 이제 투자 주류'라는 신호거든. RKLB를 '소형 SpaceX'로 보고 포지션 잡는 기관이 이번 편입을 트리거로 올 수 있어. CRWV·ALAB·NBIS까지 AI 인프라 3종 동시 편입이라 AI+우주 테마가 지수 레벨에서 공식 인정받은 날이야.",
    likes: 76,
    comments: 3,
    created_at: "2026-06-22T08:22:00.000Z",
    liked: false,
  },
  {
    id: -118,
    alias: "중구 팔콘 #85",
    symbol: "AMZN",
    content:
      "Amazon 미국 매출 1위 $7,170억 달성 — Walmart 추월이 단순 순위 이야기가 아니야. 커머스에서 시작해서 클라우드·광고·물류까지 수직통합한 기업이 순수 유통 기업을 추월한 거임. 플라이휠 효과가 완성됐다는 신호야. 여기에 AWS AI 백로그 $4,800억이 더해지면 미래 3~4년 매출 가시성도 사상 최대. 현재 시총 대비 미래 현금흐름 할인하면 AMZN이 지금 가장 싼 빅테크 중 하나라는 결론 나와. Trainium 외판까지 실현되면 반도체 사업 수익도 추가돼. 단기 주가 노이즈 무시하고 이 플라이휠에 베팅하는 게 맞아.",
    likes: 94,
    comments: 3,
    created_at: "2026-06-22T08:19:00.000Z",
    liked: false,
  },
  {
    id: -117,
    alias: "송파 황소 #26",
    symbol: "AMZN",
    content:
      "클라우드 백로그 3사 비교 — AWS $4,800억, Azure +215%, GCP $2,600억. 백로그 = 이미 서명된 미래 매출이라는 걸 다시 강조하고 싶어. 계약 기간 3~5년이면 경기 침체 와도 이 매출이 흔들리지 않아. AI 기업들이 GPU 컴퓨팅 미래 선점 위해 장기 계약 선체결하는 거야. Azure +215%가 특히 눈에 들어오는데 OpenAI 독점 파트너십으로 인해 AI 수요가 Azure로 집중된 결과야. GCP $2,600억은 구글 자체 Gemini 모델 수요가 외부 기업으로 확산된 거고. 세 회사 다 사상 최대 백로그 = AI 인프라 투자 사이클이 아직 초기라는 거임. 클라우드 주식은 지금 매수하는 게 맞아.",
    likes: 49,
    comments: 2,
    created_at: "2026-06-22T08:16:00.000Z",
    liked: false,
  },
  {
    id: -116,
    alias: "양천 늑대 #17",
    symbol: "MU",
    content:
      "Micron 영업이익 $1.3B → $15.7B 추산 — 이게 HBM이 만드는 구조적 변화야. 일반 DRAM 마진율 20~30%인데 HBM 마진율이 50~60%로 추정돼. 같은 캐파에서 생산 믹스를 HBM으로 전환할수록 매출 단가와 마진이 동시에 올라가는 거임. Micron HBM3E가 NVDA 공급망에 공식 채택됐다는 게 이 전환의 핵심이야. NVDA GB200·B300 양산 가속하면 HBM3E 수요가 비례해서 증가해. 삼성·SK하이닉스·Micron 3강 체제인데 Micron 에너지 효율 30%+ 우위가 NVDA 선호도 높이는 거임. EPS 2026E $8~10에 지금 주가면 역사적 저점 PE야. HBM 프리미엄 안 녹아든 거임.",
    likes: 26,
    comments: 3,
    created_at: "2026-06-22T08:13:00.000Z",
    liked: false,
  },
  {
    id: -115,
    alias: "동대문 황소 #93",
    symbol: "META",
    content:
      "PVGO 분석 — META 35.3%, MSFT 36%, S&P500 55%. 이 숫자가 의미하는 게 뭐냐면 META·MSFT 주가의 64~65%가 현재 이익으로 설명된다는 거야. 성장 기대가 낮게 반영된 가치주 특성임. 근데 실제 성장률은? META AI 수익화 가속 중이고 MSFT Copilot 구독 폭발이야. S&P500 평균보다 높은 성장률에 낮은 성장 프리미엄이면 수학적으로 저평가야. META Reality Labs 적자가 PVGO 낮추는 주원인인데 AI 수익화 시작되면 이 적자가 줄어들면서 PVGO 재평가 나와. 이중으로 상승 드라이버가 있는 거임. PVGO 재평가 = 주가 재평가야.",
    likes: 33,
    comments: 3,
    created_at: "2026-06-22T08:10:00.000Z",
    liked: false,
  },
  {
    id: -114,
    alias: "강남 올빼미 #66",
    symbol: "GOOGL",
    content:
      "버크셔 해서웨이 GOOGL Top 5 편입 — 버핏이 왜 지금 GOOGL을 샀는지 정리해봤어. PVGO 47.8%가 S&P500 55%보다 낮아. 현재 이익 기반 가치가 주가의 52%를 설명해. 버핏이 좋아하는 '현재 이익으로 충분히 정당화되는 주가'야. 여기에 AI 검색 독점+YouTube+GCP라는 세 개 성장 옵션이 덤으로 붙어 있어. 어느 하나가 무너져도 다른 두 개로 가치를 지지하는 구조 — 버핏이 강조하는 안전마진이 여러 겹인 거야. Gemini가 AI 시대에서도 검색 독점 방어하면 PVGO가 재평가되는 거야. 버핏 포트폴리오 편입 = 수급 측면에서도 패시브 펀드 추종 자금 유입이 불가피해.",
    likes: 40,
    comments: 3,
    created_at: "2026-06-22T08:07:00.000Z",
    liked: false,
  },
  {
    id: -113,
    alias: "종로 늑대 #44",
    symbol: "INTC",
    content:
      "Intel CEO '5~10년 내 10배 수익 잠재력' 발언 — 이게 빈말인지 판단하는 기준은 하나야. 18A 공정 수율이 잡히냐 안 잡히냐. 18A가 고객 기준 양산 수율 도달하면: 지정학 리스크 헤지 원하는 빅테크 하나가 계약하고, 그 계약이 공개되면 파운드리 사업 재평가 나오고, EPS 가이던스 올라가고, 주가 반응하는 연쇄야. TSMC 대만 집중에 불안한 Apple·NVDA·AMD 중 하나가 Intel 파운드리 계약하는 게 10배 스토리의 시작 트리거임. CEO가 No Profits 팟캐스트에 직접 나와서 2030~2035 타임라인을 밝힌 건 투자자 소통 의지 측면에서 좋은 신호야. 단기 고통 감수하는 5년+ 투자자에게 지금이 진입 구간일 수 있어.",
    likes: 47,
    comments: 3,
    created_at: "2026-06-22T08:04:00.000Z",
    liked: false,
  },
  // ── 2026-06-20 신규 ──────────────────────────────────────────────────────
  {
    id: -100,
    alias: "마포 팔콘 #18",
    symbol: "TSLA",
    content:
      "Cybercab EPA CoC 2026 모델연도 확정 — 이게 뭘 의미하는지 정리하면. EPA CoC는 미국 50개 주에서 차량 운행하기 위한 연방 기준 인증이야. 지금까지 Tesla가 Cybercab을 Austin에서 테스트 운행했던 건 시범이었고, 이 인증 받은 이후부터가 진짜 상업 서비스야. 05/26 발효에 내구수명 150,000마일이면 플릿 운영 기준을 완전히 충족하는 거임. 여기에 NHTSA ADA까지 묶이면 장애인 서비스 계약도 포함 가능해지는데 B2B 로보택시 계약이 훨씬 두껍게 만들어지는 포인트야. 2개월 내 Austin 확대가 이 인증 기반이라는 게 진짜임. Q3 매출에서 로보택시 라인이 처음 나타나는 분기가 될 거야.",
    likes: 4,
    comments: 3,
    created_at: "2026-06-20T08:48:00.000Z",
    liked: false,
  },
  {
    id: -101,
    alias: "광진 황소 #74",
    symbol: "TSLA",
    content:
      "Tesla Liquid Armor 도장 공장 대체 뉴스 — 표면적으로는 제조 기술 이야기인데 본질은 원가 구조 혁명임. 전통 자동차 공장에서 도장 공장이 건설 비용의 30% 차지하는 거 맞아. 열처리·화학 처리·환경 설비 다 합치면 그 이상도 됨. 이걸 필름 성형 하나로 대체하면 신공장 건설 비용이 기존 대비 최소 25% 이상 감소하는 거야. Cybercab 생산라인이 어디에 만들어지든 이 기술이 들어가면 단위당 CAPEX가 내려가. COGS/vehicle이 구조적으로 떨어지는 경로인데 시장이 아직 완전히 반영 안 한 것 같아. Model 2 급 저가 모델에 이게 적용되면 $25,000 차 만들면서도 마진 내는 길이 열리는 거임.",
    likes: 1,
    comments: 3,
    created_at: "2026-06-20T08:44:00.000Z",
    liked: false,
  },
  {
    id: -102,
    alias: "서대문 매 #35",
    symbol: "TSLA",
    content:
      "Cathie Wood $20M 매수 — 22.6배 할인 논리 본 사람 있어? 2007년 12월 EPS 기준으로 비교하는 게 독특한 방식이긴 한데 핵심 메시지는 명확해. 로보택시·FSD·에너지 사업이 현재 주가에 전혀 안 들어가 있다는 거임. ARK Big Ideas에서 Tesla 5년 목표가 $2,600인데 현재 기준 얼마나 업사이드인지 계산해봐. $20M 매수가 절대 금액으론 ARK 자산 기준 크지 않을 수 있는데 타이밍이 중요함. EPA CoC 확정 직후 + Liquid Armor 공개 + Cathie Wood 매수가 같은 날 겹쳤어. 이 세 개 이벤트가 모두 같은 방향을 가리키는 거야 — 로보택시 현실화 + 원가 혁신 + 기관 확신. Q3 로보택시 수익 첫 인식 전 마지막 매집 기회라는 시각도 있어.",
    likes: 18,
    comments: 3,
    created_at: "2026-06-20T08:40:00.000Z",
    liked: false,
  },
  {
    id: -103,
    alias: "중구 늑대 #49",
    symbol: "TSLA",
    content:
      "머스크 신용등급 '터무니없이 낮다' 발언 — 단순 불평이 아니야. $40B+ 현금에 부채 제로인 회사가 BBB 수준 받는 게 실제로 이상한 거임. 신용평가사가 자동차 섹터로 Tesla를 분류하는 게 문제야. 자동차 업종은 경기 민감, 높은 고정비, 낮은 마진이 특징이거든. 근데 Tesla의 FSD 구독·에너지 사업은 구독형 소프트웨어랑 전력 인프라임. 이게 자동차 업종 기준이 아닌 테크·유틸리티 기준으로 평가받아야 하는 이유야. 등급 상향되면 기관 투자자 풀이 넓어지고 자본 비용이 내려가. 머스크가 공개 발언으로 압박 넣은 게 의도적인 이벤트일 거야. 신용등급 리뷰 일정이 다가오면 선행 움직임 나올 수 있어.",
    likes: 15,
    comments: 3,
    created_at: "2026-06-20T08:36:00.000Z",
    liked: false,
  },
  {
    id: -104,
    alias: "강동 황소 #27",
    symbol: "SPCX",
    content:
      "SPCX 락업 해제 구조 정리 — 4.9% → Musk 46.1% Day 366 → 100%. 이 구조를 모르고 SPCX 들어가면 나중에 충격 받을 수 있어. Day 366이 2027년 6월이라는 게 핵심이야. 이 날이 오기 전까지 유통 물량이 4.9%로 극히 제한돼 있어서 수급 구조상 공급이 부족한 상태야. 희소성 프리미엄이 유지되는 구간임. 문제는 Day 366 전후야. Musk 46.1% 포함 대규모 락업 해제가 시장 충격을 줄 수 있어. 실제 매도 여부는 별도 문제지만 가능성 자체가 변동성을 만들거든. 장기 홀더 입장에서 Day 366 이후가 진짜 저가 매수 기회일 수 있음. 락업 해제 = 펀더멘털 변화 아님. 공급 충격이 사라지면 다시 펀더멘털로 수렴해.",
    likes: 12,
    comments: 3,
    created_at: "2026-06-20T08:32:00.000Z",
    liked: false,
  },
  {
    id: -105,
    alias: "노원 팔콘 #83",
    symbol: "SPCX",
    content:
      "SpaceX Q1 2026 Upmass 86% — 이 숫자 Bryce Tech 공식 데이터야. 647,412 kg 전체에서 SpaceX가 556,057 kg. 나머지 전세계 합산이 91,355 kg이야. 6배 차이임. Q1 2025에서 이미 업계 독보적이었는데 86%까지 올라온 거야. 어떻게 이게 가능하냐면 Falcon 9 재사용 회수율이 계속 올라가고 발사 케이던스가 주 1~2회 수준이거든. 경쟁사가 한 번 발사할 때 SpaceX는 5~10번 발사해. Starship이 본격화되면 단일 발사당 Upmass가 100톤 이상인데 이게 추가되면 점유율이 90%를 넘는 건 시간 문제야. 발사 수익 = 직접 매출이고 Starlink 위성 = 반복 수익이야. 이 조합이 SPCX 장기 가치의 핵심 구조임.",
    likes: 9,
    comments: 3,
    created_at: "2026-06-20T08:28:00.000Z",
    liked: false,
  },
  {
    id: -106,
    alias: "구로 매 #16",
    symbol: "SPCX",
    content:
      "Starlink DTS 30개국 + Deutsche Telecom 50개국 파트너십 — 이게 Starlink 2단계 성장의 핵심이야. 1단계는 직접 위성 인터넷 구독자 늘리는 거였고, 2단계는 통신사 파트너십으로 기존 스마트폰 유저 전체를 커버하는 거임. Deutsche Telecom이 유럽 최대 통신사고 T-Mobile 모회사야. 여기서 50개국이면 유럽 전역 커버가 되는 거임. DTS 기술은 별도 단말 필요 없이 기존 폰으로 수신 가능하거든. 즉 유럽 DT 가입자 수억 명이 잠재 Starlink DTS 사용자가 되는 거야. B2B 파트너십 모델이라 구독 단가는 낮을 수 있지만 볼륨이 완전히 다른 레벨임. ARR 구조로 잡히기 시작하면 SpaceX 수익 예측 가시성이 확 올라가.",
    likes: 6,
    comments: 3,
    created_at: "2026-06-20T08:24:00.000Z",
    liked: false,
  },
  {
    id: -107,
    alias: "동작 황소 #52",
    symbol: "TSLA",
    content:
      "TeraFab 드론 영상 확인 — Giga Texas 옆에 SpaceX·xAI·Tesla $250B 캠퍼스 착공 실물 확인됨. 왜 이게 중요하냐면 드론 영상은 '계획'이 아니라 '진행 중'을 증명하는 거거든. 말만 있던 TeraFab이 실제로 땅을 파기 시작한 거야. $250B 규모가 현실화되면 TSLA·SPCX 양쪽 다 직접 수혜야. Tesla는 제조 인프라 공유, SpaceX는 위성·우주 제조 확대, xAI는 AI 데이터센터. 세 회사가 같은 부지에서 시너지 내는 구조임. 텍사스 세금 혜택 + 토지 + 인허가 속도가 캘리포니아 대비 압도적으로 빠른 게 이 결정의 배경이야. 착공 확인됐으니 다음은 1차 완공 시점과 규모 업데이트 나올 거야.",
    likes: 3,
    comments: 3,
    created_at: "2026-06-20T08:20:00.000Z",
    liked: false,
  },
  {
    id: -108,
    alias: "은평 팔콘 #39",
    symbol: "NVDA",
    content:
      "NVDA AI 추론 점유율 74% — Q1 2026 $41B vs 나머지 전체 $15B. 이 숫자가 중요한 이유가 YoY 추이야. Q1 2025에 66%였는데 Q1 2026에 74%야. 경쟁이 심해지는 상황에서 점유율이 오르고 있어. AMD MI300X가 나오고 구글 TPU가 있는데 왜 오르냐 — CUDA 생태계 때문이야. 전세계 AI 모델이 CUDA로 최적화돼 있어서 전환 비용이 너무 커. 거기에 Blackwell GPU가 이전 세대 대비 너무 압도적이라 일단 써보면 돌아가기 어렵거든. 74%는 모노폴리스틱 수익 구조를 의미함. AI 인프라 지출 1달러당 NVDA가 74센트 가져가는 거야. 이 구조가 깨지려면 CUDA 생태계 전체가 바뀌어야 하는데 그게 단기간에 안 일어남.",
    likes: 20,
    comments: 3,
    created_at: "2026-06-20T08:16:00.000Z",
    liked: false,
  },
  {
    id: -109,
    alias: "종로 황소 #61",
    symbol: "AMZN",
    content:
      "AMZN Trainium 외판 검토 소식 — OpenAI $5B, Anthropic $1B 논의가 Bloomberg 보도야. 이게 실현되면 AMZN 입장에서 두 가지 이점이 있어. 첫째는 직접 칩 매출이고, 둘째는 이 고객들이 AWS도 쓰게 유도하는 거야. 칩 + 클라우드 번들 락인이 완성되는 구조임. NVDA 입장에서는 위협이냐 — 단기는 아니야. CUDA 생태계 전환이 필요하거든. 근데 중기로 보면 OpenAI·Anthropic 같은 대형 AI 기업이 Trainium 테스트하기 시작하면 멀티벤더 환경이 만들어져. NVDA 가격 결정력이 장기적으로 조금씩 약해지는 거임. AMZN 관점에서는 AWS $137B TTM에 칩 사업 추가되면 수익원 다변화가 되는 거야. 둘 다 수혜.",
    likes: 17,
    comments: 3,
    created_at: "2026-06-20T08:12:00.000Z",
    liked: false,
  },
  {
    id: -110,
    alias: "송파 매 #74",
    symbol: "AMZN",
    content:
      "AWS TTM $137B — 2018년 $25.66B 대비 8년 5.3배. 이 성장률이 복리로 계산하면 연 23% 성장이야. 클라우드 시장 전체도 이 속도로 자랐는데 AWS는 시장 점유율도 유지하면서 성장한 거야. 왜 계속 성장하냐 — AI 워크로드야. AI 모델 학습 1번 돌리는 데 드는 컴퓨팅이 일반 서버 수천 대 분임. 이게 전부 클라우드로 오거든. 온프레미스로 AI 돌리는 회사는 거의 없어. 규모 경제가 안 되고 유지 비용도 크거든. 그래서 AI 투자 사이클 = 클라우드 수요 사이클임. AWS가 이 파이에서 1위야. Trainium 외판까지 성사되면 칩+클라우드 이중 수익원으로 성장 레이어 하나 더 추가되는 거야.",
    likes: 14,
    comments: 3,
    created_at: "2026-06-20T08:08:00.000Z",
    liked: false,
  },
  {
    id: -111,
    alias: "강서 늑대 #48",
    symbol: null,
    content:
      "Tom Lee 3단계 시나리오 — S&P 7,700~7,800 후 급락, 이후 V자 회복. 2단계 급락 원인이 OpenAI·Anthropic IPO 락업 해제라는 거 주목해야 함. 이게 단순 조정이 아니라 공급 충격이야. OpenAI 기업가치 $300B 이상, Anthropic $50~80B인데 락업 해제 시 시장에 나오는 물량이 수십조 원 수준임. SPCX 락업 구조랑 비슷한 논리야 — 공급 충격은 일시적이고 펀더멘털은 안 바뀜. 근데 그 타이밍에 들고 있으면 멘탈 테스트 받는 거임. Tom Lee가 3단계에서 강한 회복 예상하는 이유가 AI 실적은 계속 나오기 때문이야. 지금 1단계에서 7,700~7,800 가는 동안 홀드하고, 2단계 급락 시 추가 매수 자금 준비해두는 게 현실적인 전략임.",
    likes: 31,
    comments: 3,
    created_at: "2026-06-20T08:04:00.000Z",
    liked: false,
  },
  {
    id: -112,
    alias: "성북 황소 #23",
    symbol: null,
    content:
      "이란 전자서명 종전 합의 — 호르무즈 개방 유지 확인됨. Trump가 중국 중재 역할에 감사 발언한 게 눈에 들어왔어. 이게 미중 관계 신호임. 무역 긴장 완화 기대감이 생기는 거야. 호르무즈 봉쇄 우려가 해소되면 유가가 안정되고 인플레이션 경로가 바뀌어. 에너지 가격이 CPI에서 빠르게 영향 미치는 항목이거든. 연준 금리 인하 명분이 하나 더 생기는 셈임. 지정학 리스크 프리미엄이 해소되면 위험자산 선호 심리가 올라와. 주식 입장에서는 호재야. SPCX 관점에서도 중동 통신 인프라 수요 회복이 기대되고 Starlink B2B 계약 확장 기회가 생기는 거임. 단기 변수보다 구조적 전환 포인트로 봐야 함.",
    likes: 24,
    comments: 3,
    created_at: "2026-06-20T08:00:00.000Z",
    liked: false,
  },
  // ── 2026-06-19 신규 ──────────────────────────────────────────────────────
  {
    id: -98,
    alias: "여의도 올빼미 #44",
    symbol: "MSFT",
    content:
      "Commercial RPO +97.3% 숫자 하나가 눈에 들어왔어. Q3 2026 분기 기준 역대 최고 성장률이야. RPO 잔고 ~$700B이면 Microsoft 현재 연매출 $240B의 3배가 이미 계약 확정된 거거든. 이건 '미래 매출 예측'이 아니라 '이미 서명된 계약'임. Azure AI + Copilot 기업 계약이 폭발하면서 나온 숫자야. 5년 CAGR +47%는 Azure가 성장 감속 없이 복리로 굴러가고 있다는 증거임. 빅테크 중에 이 수준의 매출 가시성 가진 회사가 없어. MSFT가 지금 비싸 보여도 RPO 렌즈로 보면 2027~2028 EPS 재평가 여지가 크다.",
    likes: 10,
    comments: 3,
    created_at: "2026-06-19T08:58:00.000Z",
    liked: false,
  },
  {
    id: -97,
    alias: "성북 까마귀 #28",
    symbol: "NVDA",
    content:
      "결론부터 말하면 젠슨 황의 데이터가 시장 공포를 틀렸다고 증명했어. SaaS 죽으면 GPU 수요 감소한다는 논리 — 현장에서 안 맞아. 기업들이 자체 AI 모델 만들 역량 없어서 에이전트 도입으로 방향 바꾼 거거든. 에이전트가 소프트웨어 툴 쓰면 SW 업체들이 GPU 더 써야 해. 수요 체인이 단절되는 게 아니라 연장되는 거임. NVDA가 '실제 데이터로 이미 확인됨'이라고 말한 게 핵심이야 — 이론이 아니라 실적으로 증명했다는 거야. STRL·ENOVA 같은 SaaS 피해주 투자자들이 NVDA 팔기 전에 이 발언부터 읽어야 해.",
    likes: 13,
    comments: 3,
    created_at: "2026-06-19T08:54:00.000Z",
    liked: false,
  },
  {
    id: -96,
    alias: "하남 독수리 #44",
    symbol: "INTC",
    content:
      "미국 정부 INTC 보유 내역 뜯어봤는데 — 2025년 8월 22일 $20.47에 ~$8.9B 투자한 거야. 현재 $131.61이니까 433.3M주가 ~$57B이 됐어. ~$48B 평가차익이 나 있는 거야. 이게 CHIPS Act 역사상 최고 투자 성과임. 단순히 '정부가 반도체 지원했다'가 아니라 +542%짜리 투자를 한 거야. Intel 18A 공정이 TSMC 대안으로 자리 잡으면서 주가가 이걸 반영한 거임. 미국 정부 입장에서 반도체 공급망 자립화 + 재정 수익 두 목표 모두 달성했어. CHIPS Act 2탄 예산 논의가 훨씬 쉬워지는 정치적 효과도 있어.",
    likes: 16,
    comments: 3,
    created_at: "2026-06-19T08:50:00.000Z",
    liked: false,
  },
  {
    id: -95,
    alias: "마포 황소 #11",
    symbol: "NFLX",
    content:
      "$37.3B 자사주 매입 규모 검증해봤는데 이게 얼마나 큰 숫자인지 계산해봤어. 현재 NFLX 시총 $490B 기준으로 7.6%를 스스로 사들이는 거야. 유통 주식 수 감소 → EPS 자동 개선 → 주가 지지 삼박자야. 타이밍이 중요한데 2월 저점 $56 근방에서 집중 매수했다는 게 핵심임. 단순히 주가 지지용 매수가 아니라 '이 구간이 싸다'는 경영진 자체 평가임. 광고 구독 + 라이브 스포츠 + 게임으로 매출 다각화 완성 단계에서 이 스케일의 buyback이 나왔어. 현금흐름 자신감 없으면 절대 못 하는 딜임. NFLX가 성장주에서 성장+가치 복합주로 진화하는 증거야.",
    likes: 67,
    comments: 3,
    created_at: "2026-06-19T08:46:00.000Z",
    liked: false,
  },
  {
    id: -94,
    alias: "잠실 콘도르 #53",
    symbol: "AAPL",
    content:
      "팀 쿡 '40년 만에 처음' 발언 맥락 채널 체크해봤는데 이게 단순 마케팅 멘트가 아니야. Apple이 iPhone 시작한 2007년 이후로 한 번도 안 했던 가격 인상을 지금 한다는 거거든. +15% 인상해서 iPhone 18 예상가 ~$1,299. 관세 직격탄 맞는 상황에서 이걸 결정한 게 포인트야. '우리 제품 가격 결정권 있다'는 선언임. 프리미엄 스마트폰 시장에서 AAPL 대체재가 없다는 자신감이야. 단기 판매량 소폭 감소 리스크는 있어. 하지만 ASP 올라가면 마진율 개선으로 이익 더 늘어나는 구조임. MU·SK하이닉스도 간접 수혜야 — AAPL이 부품 QC 더 까다롭게 가면 단가도 올라가거든.",
    likes: 85,
    comments: 3,
    created_at: "2026-06-19T08:42:00.000Z",
    liked: false,
  },
  {
    id: -93,
    alias: "강남 팔콘 #62",
    symbol: "AMZN",
    content:
      "AWS 섹션 PE 29.13x 숫자 하나가 눈에 들어왔어. 역대 최저 수준이야. AWS만 따로 뜯으면 연 성장 +27%, 영업이익률 39%인데 시장이 그 가치를 PBR 기준으로 할인하고 있어. 클라우드 빅3 중에 이 조합은 AWS밖에 없거든. 단기 -12% 반응이 나온 건 MS·Google 대비 AI 네이티브 인식이 약한 탓인데, 이건 시간이 해결해줄 인식 괴리야. Nova 모델 + Bedrock + Trainium2 조합이 진짜야. 전체 AMZN 기준이 아니라 AWS 독립 밸류에이션으로 보면 지금 가격이 말이 안 되게 싼 거임. 중기 매수 관점에서 관심 가져볼 구간.",
    likes: 54,
    comments: 3,
    created_at: "2026-06-19T08:38:00.000Z",
    liked: false,
  },
  {
    id: -92,
    alias: "목동 황소 #23",
    symbol: "SPCX",
    content:
      "결론부터 말하면 TeraFab은 단순 부동산 딜이 아니야. SpaceX × xAI × Tesla가 함께 짓는 $250B 규모 AI 인프라 복합단지야. 세계 AI 칩 생산량의 25%를 목표로 한다는 거 — 단일 사이트에서 이게 실현되면 지정학적 의미가 있어. 미국이 AI 칩 생산을 자국화하는 거야. SpaceX가 여기서 어떤 역할인지가 SPCX 투자 포인트임. 전력·냉각·우주 인터넷 인프라 = 다 SpaceX가 공급할 수 있어. 단지 완공 후 장기 임대 수익 구조까지 붙으면 SPCX에 새로운 수익 축이 생기는 거임. $250B 자본이 흘러드는 방향에 SPCX가 서 있어.",
    likes: 44,
    comments: 3,
    created_at: "2026-06-19T08:34:00.000Z",
    liked: false,
  },
  {
    id: -91,
    alias: "은평 매 #72",
    symbol: "SPCX",
    content:
      "Starlink 허리케인 파트너십 뜯어봤는데 이게 B2B 수익 모델 확장의 핵심 케이스야. 재해 발생 시 자동으로 Starlink 전환되는 '자동 대피 네트워크' 계약이거든. 긴급 통신이 끊기면 안 되는 상황에서 Starlink가 유일한 대안이라는 걸 공식화한 거야. 계약 단가가 일반 소비자 대비 5~10배 높은 게 정부·보험사·인프라 계약의 특성임. 한 번 계약하면 장기 유지가 기본이야 — 재해 대비 인프라는 비용 절감 논리가 안 통하거든. 허리케인 파트너십 하나가 롤모델이 돼서 다른 재해 유형·다른 지역으로 확산되면 B2B 수익 기여가 빠르게 올라갈 거임.",
    likes: 21,
    comments: 3,
    created_at: "2026-06-19T08:30:00.000Z",
    liked: false,
  },
  {
    id: -90,
    alias: "광진 매 #55",
    symbol: "SPCX",
    content:
      "ARK 5개 펀드 동시 매집 내역 채널 체크해봤는데 — ARKX, ARKQ, ARKW, ARKK, ARK Venture Fund가 전부 들어왔어. 캐시 우드가 한 펀드만 사는 게 아니라 전 라인업으로 포지션 잡은 거야. ETF가 산다는 건 패시브 수요가 생긴다는 거거든. ARK 운용자산 $15B+ 기준으로 비중이 올라가면 자동 매수 물량이 계속 나옴. 기관들도 ARK 포트폴리오 보고 SPCX 커버리지 시작하는 사이클임. 타이밍상 IPO 초기 + 인덱스 편입 전 = 패시브 수요가 아직 절반도 안 들어온 구간이야. ARK 5펀드 세트가 확인된 이상 수급 그림이 달라졌어.",
    likes: 28,
    comments: 3,
    created_at: "2026-06-19T08:26:00.000Z",
    liked: false,
  },
  {
    id: -89,
    alias: "신촌 늑대 #33",
    symbol: "SPCX",
    content:
      "Moody's Baa1 신용등급 숫자 하나가 눈에 들어왔어. IPO 2일 후에 $20B 채권 발행 성공이야. 등급이 투자등급(Baa1)이면 연기금·보험사가 법적으로 살 수 있는 자산이거든. $20B = SpaceX 연매출의 약 1.1배를 채권으로 조달한 거야. 이자비용보다 Starlink 확장 수익이 높다는 확신이 없으면 안 하는 딜임. IPO로 $8B 조달 + 채권으로 $20B 추가 = 총 $28B 자금이 이틀 만에 확보됐어. 이게 어디 쓰이냐가 다음 모멘텀인데 — Starlink Gen3, TeraFab 참여, 차세대 로켓이 모두 후보야. 채권 시장이 SpaceX 현금흐름에 베팅했다는 게 주식 투자자한테도 신호임.",
    likes: 35,
    comments: 3,
    created_at: "2026-06-19T08:22:00.000Z",
    liked: false,
  },
  {
    id: -88,
    alias: "노원 황소 #66",
    symbol: "TSLA",
    content:
      "Megapack 25,000기 달성 현장 데이터 확인했어. 누적 97.5 GWh — 이게 어느 정도냐면 웬만한 소형 국가 하루 전력 수요 수준이야. ESS 시장에서 Tesla가 점유율 1위를 유지하면서 생산 속도가 올라가고 있는 거임. Lathrop 기가팩토리 풀가동 기준 연 40 GWh 생산 가능한데, 수요가 공급을 앞서고 있어. 에너지 사업이 자동차 마진 30%+ 수준까지 올라오면 Tesla 전체 이익 구조가 바뀌어. 현재 에너지 매출 $3.7B/분기인데 2027년 $8~10B 경로가 가시권임. 자동차 업체가 아니라 에너지 인프라 기업으로 재평가받는 시점이 가까워지고 있어.",
    likes: 42,
    comments: 3,
    created_at: "2026-06-19T08:18:00.000Z",
    liked: false,
  },
  {
    id: -87,
    alias: "동작 독수리 #15",
    symbol: "TSLA",
    content:
      "결론부터 말하면 6월 30일 아시아 FSD 마감이 진짜야. 한국 구독 신청 버튼 이미 앱에 떴고, 스페인은 6/30 공식 오픈 확정임. Tesla가 아시아 시장에서 FSD를 빠르게 푸는 건 두 가지야 — 규제 선점 + 데이터 수집. 한국·일본·대만 데이터가 쌓이면 아시아 도로 환경 학습이 빨라지고 중국 데이터 공백을 메울 수 있어. 한국 출시 특히 중요한 이유는 복잡한 도로 + 공격적 운전 패턴이 FSD 난이도 상 최고 수준이거든. 여기서 통하면 어디서든 통함. 6/30 이후 아시아 FSD 채택률 숫자가 Q3 모멘텀의 핵심 변수야.",
    likes: 49,
    comments: 3,
    created_at: "2026-06-19T08:14:00.000Z",
    liked: false,
  },
  {
    id: -99,
    alias: "서초 늑대 #28",
    symbol: "TSLA",
    content:
      "스페인 6/30 FSD 승인이 남유럽에서 얼마나 중요한지 설명하면 — 스페인이 EU에서 독일·프랑스 다음으로 인구 많고, 여기서 FSD 공식 오픈되면 이탈리아·포르투갈이 레퍼런스로 삼는 구조야. 이미 벨기에·네덜란드·덴마크가 북유럽-서유럽 루트 열었고, 스페인이 남유럽 루트 여는 거임. 동시에 아시아 일회성 구매 6/30 종료도 봐야 해. 싱가포르·대만·말레이시아 일회성 마감 → 전 아시아가 구독 방식으로 표준화된다는 신호야. 두 이벤트 합치면 6/30이 글로벌 FSD 구독 방식 표준화의 기점이야. Q3 FSD 수익 레포에서 처음으로 수자 잡히는 거 기대하는 이유임.",
    likes: 7,
    comments: 3,
    created_at: "2026-06-19T08:12:00.000Z",
    liked: false,
  },
  {
    id: -86,
    alias: "강서 황소 #91",
    symbol: "TSLA",
    content:
      "유로NCAP 5성 + NHTSA ADA 통과 동시 확인해봤는데 이게 안전 인증 관점에서 다른 레벨이야. 유로NCAP은 유럽 소비자 구매 결정에 직접 영향 주는 평가야. 5성이 아니면 판매량에 타격임. 근데 Tesla가 그 최고 등급을 받은 거고, 거기에 더해 NHTSA ADA 최초 통과까지 나왔어. ADA 인증은 장애인 자동화 보조 관련인데 보험사 리스크 평가와 연결돼. 안전 인증이 쌓일수록 FSD 확장 속도가 올라가는 구조임 — 규제 기관이 '이미 검증됨' 레퍼런스로 쓰거든. 유럽 FSD 승인 신청에서 이 두 인증이 증거 서류로 그대로 쓰일 거임.",
    likes: 26,
    comments: 3,
    created_at: "2026-06-19T08:10:00.000Z",
    liked: false,
  },
  {
    id: -85,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "Tesla OpenClass 채용공고 뜯어봤는데 — RL 엔지니어 $314K~$490K 연봉이야. 이게 단순 AI 개발자 채용이 아님. 강화학습(RL)은 에이전트가 환경과 상호작용하면서 스스로 학습하는 방식이야. Tesla가 짓고 있는 게 '소프트웨어가 도구를 쓰는 에이전트'야 — 그게 OpenClass임. 이 수준 연봉이면 OpenAI·DeepMind에서 빼오는 거야. Tesla가 Grok·ChatGPT 같은 대화형 AI 말고 '실행형 에이전트'에 집중한다는 거임. Optimus가 그 에이전트의 물리적 형태고, OpenClass가 소프트웨어 형태야. 지금 채용 규모가 나중에 FSD·Optimus 성능 점프로 돌아오는 선행 지표임.",
    likes: 33,
    comments: 3,
    created_at: "2026-06-19T08:06:00.000Z",
    liked: false,
  },
  {
    id: -84,
    alias: "강남 독수리 #52",
    symbol: "TSLA",
    content:
      "일론 머스크 Form4 신고 숫자 하나가 눈에 들어왔어. 3억 400만 주 행사, 평균 원천징수가 $336이야. 스톡옵션 행사 + 세금 납부용 주식 매도라서 순 매도가 아님 — 오히려 실질 보유 증가야. 법원 손실 이후 이 타이밍에 행사한 게 포인트야. $336 원천징수가 내부 참조가가 아니라 세금 계산용 공정시장가치인데, 이 가격에 행사했다는 건 본인이 현재 주가 대비 훨씬 높은 가치를 보고 있다는 거임. CEO가 이 규모 행사를 하는 건 '장기 보유' 시그널이야. 시장이 Tesla 법원 리스크로 흔들릴 때 내부자가 증거로 반박하는 구조임.",
    likes: 12,
    comments: 3,
    created_at: "2026-06-19T08:02:00.000Z",
    liked: false,
  },
  {
    id: -83,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "FSD 보이스커맨드 3개월 테스트 채널 체크해봤는데 — 실제 유저들 반응이 예상보다 훨씬 강해. 말로 목적지 바꾸고, 속도 조절하고, 주차 지시까지 되는 거야. K.I.T.T. 비교가 나오는 이유가 단순 향수가 아님 — 차가 '도구'에서 '대화 상대'로 바뀌는 경험이거든. HW3에서도 작동한다는 게 핵심이야. 업그레이드 없이 소프트웨어만으로 기능이 추가되는 거라서 기존 유저들 만족도가 폭발함. FSD 구독 유지율과 직결돼. 보이스커맨드가 완성되면 고령·장애인 사용자층까지 확장되는데 이게 새 수요 레이어임. Q3 구독 전환율 숫자에서 이 효과 나타날 거임.",
    likes: 15,
    comments: 3,
    created_at: "2026-06-19T08:00:00.000Z",
    liked: false,
  },
  // ── 2026-06-18 신규 ──────────────────────────────────────────────────────
  {
    id: -82,
    alias: "한강 매 #11",
    symbol: null,
    content:
      "이란 합의 딜 보고 한 가지 숫자가 눈에 들어왔어. 호르무즈 재개 시 이란 원유 수출 하루 180만 배럴이야. 지금 WTI $55~57 구간에서 이게 더해지면 $45~50 시나리오 충분히 현실이거든. CPI 에너지 항목이 0.4~0.6pp 끌어내려지면 연준 9월 인하 명분이 살아나. 단순히 유가 하락 이슈가 아니야 — 인플레이션 경로 자체가 바뀌는 거임. 연준이 포워드 가이던스 철회한 날 이란 합의가 나온 게 우연이 아닐 수 있어. 데이터가 바뀌면 결정이 바뀌는 환경에서, 가장 빠르게 CPI를 바꾸는 변수가 지금 나온 거임.",
    likes: 18,
    comments: 3,
    created_at: "2026-06-18T08:58:00.000Z",
    liked: false,
  },
  {
    id: -81,
    alias: "합정 황소 #27",
    symbol: null,
    content:
      "SpaceX Q1 +$1.62B vs Tesla -$590M 나란히 놓고 보면 머스크 포트폴리오 자체가 역전됐어. Tesla가 오토파일럿·FSD 집중 투자로 손실 낸 거고, SpaceX는 Starlink 60% 비중 안정 수익이 버팀목이야. 근데 이게 Tesla한테 나쁜 신호만은 아님 — 단기 이익보다 FSD 모멘텀에 베팅하는 거잖아. 오늘 EU FSD 승인 + Optimus 공장 3층 + Europe Q2 +20.5% 세 개를 같이 놓고 보면, Tesla가 올해 투자한 R&D 비용이 2027 이후 수익 폭발로 전환되는 구조임. SpaceX가 지금 현금 찍을 때 Tesla는 미래 현금흐름을 사고 있는 거야.",
    likes: 1,
    comments: 3,
    created_at: "2026-06-18T08:54:00.000Z",
    liked: false,
  },
  {
    id: -80,
    alias: "이태원 독수리 #33",
    symbol: "TSLA",
    content:
      "유럽 딜 플로우 채널 체크해봤는데 Q2 YTD +20.5% 숫자가 생각보다 탄탄해. 신형 모델Y 런치 효과 + FSD 주목도 상승 + 유럽 전기차 보조금 재개 세 가지가 겹친 거임. 특히 네덜란드·독일·프랑스 빅3에서 반등이 강한데 RDW FSD 승인 뉴스 이전부터 이미 올라오고 있었어. 4,000 단위가 아직 작아 보이지만 전년 동기 대비 회복세 각도가 가파른 거야. FSD 유럽 출시 본격화되면 소프트웨어 침투율 올라가면서 유럽이 수익성 높은 시장으로 바뀌는 구조임. Q3 유럽 숫자 주목할 것.",
    likes: 4,
    comments: 3,
    created_at: "2026-06-18T08:50:00.000Z",
    liked: false,
  },
  {
    id: -79,
    alias: "마포 수리부엉이 #28",
    symbol: "TSLA",
    content:
      "네덜란드 RDW 딜 플로우 체크해봤는데 생각보다 임팩트가 크다. 1,000회 통제 테스트를 RDW가 직접 돌린 거라서 EU 표준 레퍼런스가 됐어. 독일 KBA, 프랑스 UTAC이 이걸 무시하기 어렵거든. 실무적으로는 Q3 중 독일·프랑스 신청 동시 진행 가능성 높음. EU FSD 티어1 국가 다 열리면 수익 계산이 달라져. 80만 대 × 전환율 15% × $8,000 = $960M 첫해. 구독 전환까지 붙으면 2027년부터 소프트웨어 마진이 자동차 마진 뛰어넘는 시점 나올 수 있음. 오스틴 로보택시 플릿이랑 EU FSD 승인이 동시에 진행 중이라는 게 지금 테슬라 모멘텀의 핵심이야.",
    likes: 7,
    comments: 5,
    created_at: "2026-06-18T08:46:00.000Z",
    liked: false,
  },
  {
    id: -78,
    alias: "잠실 독수리 #41",
    symbol: "NVDA",
    content:
      "NVDA $25B 채권 딜 보고 한 가지 숫자가 눈에 들어왔어. 자회사 주문 $25B. 외부 투자자도 아니고 NVDA 내부 관계사들이 발행액 전체와 맞먹는 수요를 낸 거야. 이건 내부에서 NVDA 미래 현금흐름에 그만큼 확신이 있다는 신호거든. 겉보기엔 그냥 채권 발행이지만 구조를 보면 '자기 회사 부채에 자회사가 베팅한' 딜이야. PE 24x에서 연간 EPS 성장 50%+ 유지되면 PEG 0.5 수준인데 이 구간에서 이 딜 나온 거. 타이밍이 공교롭지 않아. 메모리 부족 시그널, AI 채권 딜 — 둘 다 같은 방향 가리키고 있음.",
    likes: 10,
    comments: 4,
    created_at: "2026-06-18T08:42:00.000Z",
    liked: false,
  },
  {
    id: -77,
    alias: "광화문 호랑이 #35",
    symbol: null,
    content:
      "Powell 발언 다시 뜯어봤는데 포워드 가이던스 철회가 단순 불확실성 증가가 아닐 수 있어. '몇 달 후 결정'이라는 표현은 앞으로 모든 FOMC가 데이터 의존 open decision이 된다는 거거든. 이란 합의로 유가 $45~48 시나리오 현실화되면 CPI 경로가 바뀌어. 에너지 디플레이션이 CPI 0.4~0.6pp 끌어내릴 수 있고 그러면 9월 인하 명분이 살아나. -2.8% Fed Day 낙폭이 1994년 이후 최악이라는 거, 1994년 그 이후 어떻게 됐는지 봐야 해. 금리 인상 사이클 마무리 후 시장은 기록적으로 올랐어. 지금은 동결 사이클 마무리 국면이고.",
    likes: 13,
    comments: 4,
    created_at: "2026-06-18T08:38:00.000Z",
    liked: false,
  },
  {
    id: -76,
    alias: "을지로 황소 #05",
    symbol: "MU",
    content:
      "Micron·SanDisk CEO 동시 경고 — 채널 체크 결과랑 딱 맞아 떨어져서 그냥 지나칠 수가 없었어. NVDA GB200 NVL72 랙 한 대에 HBM3E 1.1TB 들어가거든. 클러스터 1,000랙 기준으로 계산하면 HBM 수요가 어마어마해. 공급은? SK하이닉스가 NVDA 독점 공급 중이고 Micron이 HBM3E 양산 확대 중이지만 CoWoS 패키징 병목이 풀리는 게 선행조건이야. 리드타임 12~18개월 = 지금 주문 → 2027 H1 납품. 가격 협상 지금 일어나고 있는 거야. MU Q4 2026~Q1 2027 실적 재평가 트리거가 이미 당겨진 거고.",
    likes: 16,
    comments: 3,
    created_at: "2026-06-18T08:34:00.000Z",
    liked: false,
  },
  {
    id: -75,
    alias: "서초 늑대 #58",
    symbol: "TSLA",
    content:
      "Giga Texas Optimus 공장 철골 3층 사진 봤는데, 현장 공정 속도가 예상보다 빠르다. Joe Tegtmeyer가 '3층 이상, 위로 더 보인다'고 했고 크레인 여러 대 동시 작업 중이라는 거야. 내 파트너가 기가텍사스 메인 팩토리 초기 공정 속도랑 비교했는데 오히려 빠른 수준이라고 봤어. Q4 2026 첫 생산 타임라인 지킬 수 있다는 물리적 증거가 쌓이는 중. 현재 Tesla 시총의 60%+가 Optimus + Robotaxi 미래 가치라는 분석이 많은데, 그 근거가 '말'이 아니라 '철골'로 증명되고 있어. 시장이 이 속도를 아직 다 반영 못했다고 봐.",
    likes: 19,
    comments: 3,
    created_at: "2026-06-18T08:30:00.000Z",
    liked: false,
  },
  // ── 2026-06-17 신규 ──────────────────────────────────────────────────────
  {
    id: -74,
    alias: "여의도 매 #17",
    symbol: "SPCX",
    content:
      "Ron Baron Goldman 통해 $1B 직접 매수한 딜 플로우 체크해봤어. Tesla에서 10배 낸 그가 SpaceX에 더 크게 베팅하는 논리가 뭔지 봤더니 — 수익 구조야. Starlink 60%($11.3B), AI 임대, 발사 수수료 세 축이 단일 회사에 있어. Cursor 인수 $9B 주식 교환은 현금 보존하면서 AI 컴퓨팅 자산 흡수하는 M&A 패턴이야. 현금을 안 쓰고 주식으로 하는 건 SpaceX가 자기 주식 가치에 확신이 있다는 거야. 인덱스 편입 타임라인이 수급 트리거야 — 7월 NASDAQ100($8~11B 패시브) → 8월 S&P500($32B+) → 10월 Russell1000. $3.9T 패시브가 단계적으로 매수 들어올 수밖에 없어.",
    likes: 2,
    comments: 5,
    created_at: "2026-06-17T08:58:00.000Z",
    liked: false,
  },
  {
    id: -73,
    alias: "판교 황소 #31",
    symbol: "TSLA",
    content:
      "725대가 오늘 숫자야. 오스틴 단일 도시에서 댈러스·휴스턴·샌안토니오 동시 확산으로 갔어. 복수 도시 동시 운영이 로보택시 스케일링의 진짜 관문이었는데 — 이게 지금 통과됐어. Goldman Q2 인도 42~43만 전망은 Q1 33만에서 QoQ +27%야. 신형 모델Y + 기가상하이 최고생산이 드라이버야. FSD 대만 SAI Level 2 규제 제출까지 더하면 아시아·유럽·미국 트리플 확산 라인이 동시에 열린 거야. Ron Baron '$5T 10년 목표'는 현재 $1.1T에서 4~5배 업사이드 계산인데, Tesla 초기 투자자가 이 말 한다는 게 가볍게 볼 숫자가 아니야.",
    likes: 5,
    comments: 4,
    created_at: "2026-06-17T08:54:00.000Z",
    liked: false,
  },
  {
    id: -72,
    alias: "강남 독수리 #52",
    symbol: "AMD",
    content:
      "AMD CEO Lisa Su 오늘 공개 시연 임팩트 정리임. $4,499 Mac Mini로 NVIDIA 클라우드 AI 구독 대체 시연. NVIDIA 클라우드: 기업 사용자당 $2,800/월 = 연간 $33,600/인. 3년 기준 NVIDIA $100,800 vs AMD 로컬 $4,499. 절감액 $96,301/인. 기업 1,000명이면 연간 $33.6M 절감 가능한 구조임. 물론 CUDA 전환 비용·소프트웨어 생태계·스케일링 이슈가 있어서 당장 대규모 전환은 어렵지만 MI300X 온프레미스 채택 늘어나면 NVIDIA 클라우드 성장 속도에 압력이 생기는 구조임. AMD의 공세가 분기마다 거세지는 중임.",
    likes: 8,
    comments: 3,
    created_at: "2026-06-17T08:50:00.000Z",
    liked: false,
  },
  {
    id: -71,
    alias: "서초 매 #64",
    symbol: null,
    content:
      "유가가 $50 아래로 내려간 거 채널 체크 후 확인했어. 이란 호르무즈 봉쇄 해제 + 유조선 통과 확인이 원인이야. 에너지주 입장에선 단기 역풍이지만, CPI 경로가 달라지는 게 더 큰 그림이야. 에너지 디플레이션이 CPI 0.4~0.6pp 끌어내리면 9월 인하 명분이 살아나거든. 나스닥·성장주한테는 금리 인하 기대 복원이 더 중요한 시그널이야. 같은 날 TSMC + AMKOR 10년 파트너십이 나왔어. 미국 내 칩 제조(TSMC 애리조나) + 어드밴스드 패키징(AMKOR 애리조나) 풀 스택이 완결된 거야. NVDA AI칩 CoWoS 패키징 공급 안정성 확보 + 중국 공급망 리스크 구조적 차단. TSM·NVDA·AMKR 양면 수혜야.",
    likes: 11,
    comments: 3,
    created_at: "2026-06-17T08:46:00.000Z",
    liked: false,
  },
  // ── 2026-06-16 신규 ──────────────────────────────────────────────────────
  {
    id: -70,
    alias: "종로 매 #44",
    symbol: "SPCX",
    content:
      "SpaceX IR 웹사이트가 열린 게 오늘 가장 큰 변화야. 상장 전까진 분기 실적 발표 개념 자체가 없던 회사였거든. IR 체계가 생긴다는 건 기관 투자자 대상 공식 커뮤니케이션 채널이 처음 만들어지는 거야. 다음 실적 발표에서 AI 임대 수익 첫 공식 수치, Starlink 구독자 업데이트, Starship 발사 단가가 나올 거야. 이 숫자들이 공개되는 게 다음 주가 리레이팅 트리거야. IPO $85.7B 역대 최대(아람코 $29.4B의 2.9배) 달성 후 $179에서 기관이 물량 받아가는 흐름이야. Ron Baron AI 컴퓨팅 지출 $15B/yr 발언이 실제 수치로 확인되는 날이 오면 그게 다음 모멘텀이야.",
    likes: 14,
    comments: 4,
    created_at: "2026-06-16T08:58:00.000Z",
    liked: false,
  },
  {
    id: -69,
    alias: "성동 황소 #29",
    symbol: "TSLA",
    content:
      "Cybercab EPA 스펙 다시 뜯어봤어. 165Wh/mile이 핵심이야. 현재 가장 효율적인 EV가 Model 3 LR 245Wh/mile 수준인데 Cybercab이 이걸 35% 이상 앞서는 거야. 로보택시 경제학에서 에너지 비용이 최대 운영비거든. 마일당 $0.02가 실현되면 Waymo 추정 원가($0.08~0.12/mile)랑 차이가 압도적이야. 원가 차이가 이 정도면 가격 경쟁에서 질 수가 없는 구조야. Cybertruck 150대 기가텍사스 목격은 고마진 $80K+ 모델이 램핑업 된다는 거야. 모델Y 일본 수입차 1위 + 기가상하이 5월 최고 생산량은 Q2 인도 숫자가 기대보다 클 수 있다는 신호야.",
    likes: 94,
    comments: 4,
    created_at: "2026-06-16T08:54:00.000Z",
    liked: false,
  },
  {
    id: -68,
    alias: "마포 독수리 #88",
    symbol: "NVDA",
    content:
      "NVDA $210B 순이익 로드맵 숫자 하나만 봐. 2025 $58B → 2029E $210B, 4년 CAGR 38%. 이 수치를 현재 주가에 대입하면 2029 PER이 S&P500 평균보다 낮아. Google TPU 삼성 제조 소식이 오늘 나왔는데 — TSMC가 NVDA·Apple로 꽉 차서 Google이 밀린 거야. NVDA 납기에 오히려 영향 없는 거고, TSMC 캐파가 NVDA에 더 집중되는 구조야. CUDA 생태계 전환 비용 때문에 빅테크가 쉽게 이탈 못 해. 2029 $4.2T 시총 시나리오가 허황된 게 아닌 이유가 여기 있어.",
    likes: 63,
    comments: 3,
    created_at: "2026-06-16T08:50:00.000Z",
    liked: false,
  },
  {
    id: -67,
    alias: "신촌 늑대 #33",
    symbol: "AMD",
    content:
      "AMD DC 매출이 $5.8B을 찍었어. 역사상 분기 DC 최고야. 근데 이 숫자보다 더 중요한 게 수요처야. MS·Meta·OpenAI가 공급 다변화 전략으로 AMD를 의도적으로 키우고 있거든. NVDA 독점에 의존하면 협상력이 없어지니까. 이번 분기가 그게 숫자로 확인된 거야. MI350이 나오면 분기 DC $8B+ 가능해. 그때 PER 재레이팅 논리가 완성돼. 순이익 $1.4B(+94%)는 레버리지 구간 진입 신호야. 게이밍 -30%는 콘솔 사이클 문제라 구조적 이슈 아니야.",
    likes: 39,
    comments: 3,
    created_at: "2026-06-16T08:46:00.000Z",
    liked: false,
  },
  {
    id: -66,
    alias: "여의도 독수리 #8",
    symbol: "MRVL",
    content:
      "Meta → MEXT 인수 발표임. MEXT 기술: 플래시 스토리지를 DRAM급 성능으로 활용. AI 추론 메모리 병목 해소. HBM 스택 $3,000~5,000 대비 플래시 원가 혁신 = 데이터센터 TCO 혁명적 절감. Meta 인수 동기: Llama AI 추론 메모리 비용 직접 절감. Marvell 시너지: Meta MTIA 칩 파트너 Marvell + MEXT 기술 결합 = AI 추론 인프라 풀 스택 솔루션. Meta 자체 적용 → 검증 후 외부 판매 가능성. 삼성·SK하이닉스 HBM 장기 위협 시나리오. MRVL 밸류 체인 상 수혜가 가장 직접적임.",
    likes: 46,
    comments: 3,
    created_at: "2026-06-16T08:42:00.000Z",
    liked: false,
  },
  // ── 2026-06-15 신규 ──────────────────────────────────────────────────────
  {
    id: -65,
    alias: "은평 매 #72",
    symbol: "SPCX",
    content:
      "Shotwell CNBC 발언 다시 들어봤어. 임원 보상 $116~$3,727 주가 연동이 핵심이야. 최고 보상 받으려면 주가가 32배 가야 한다는 뜻이거든. 동기부여 설계가 아니라 '우리는 32배 갈 수 있다고 내부적으로 믿는다'는 선언이야. '단기 청산 없음' 공식화도 같은 맥락이야. IPO 후 $90대 조정은 기관 배정 물량 소화 과정이야. Ellison $1B→$2.7B(+170%) 수익이 이사회 멤버 단가인데, 공개 시장에서 지금 사는 사람은 그보다 낮아. 일일 매출 $1.88B = 연환산 $686B+인데 시총 대비 PSR 계산해봤어? $90 지지 확인 후 재상승 논리는 유효해.",
    likes: 23,
    comments: 4,
    created_at: "2026-06-15T08:58:00.000Z",
    liked: false,
  },
  {
    id: -64,
    alias: "목동 황소 #23",
    symbol: "TSLA",
    content:
      "라스베이거스 AV 허가 신청 내용 확인해봤어. 신청 전에 이미 Cybertruck이 HD 맵 구축 장비 달고 현장 돌아다니는 게 포착됐거든. 준비 다 해놓고 신청한 거야. 연 4,200만 방문객 노선이 로보택시 첫 수익화 환경으로 최적이야. Forbes가 FSD v14.3.3을 'De Facto Robotaxi'라고 한 건 주류 비즈니스 미디어의 공식 인정이야. 기술 미디어만 인정하던 게 이제 주류 언론으로 넘어간 거야. Optimus $5T→$25T 밸류 논리 — 글로벌 인건비 $50T의 20% 대체 시나리오야. FSD 비전을 로봇에 직접 이식한다는 게 경쟁사가 처음부터 시작해야 하는 진짜 이유야.",
    likes: 30,
    comments: 3,
    created_at: "2026-06-15T08:54:00.000Z",
    liked: false,
  },
  {
    id: -63,
    alias: "강남 독수리 #52",
    symbol: "MU",
    content:
      "메모리 트리오 숫자가 충격임. 2027 영업이익 삼성 $331B + SK $243B + 마이크론 $133B = $707B. 매그니피센트 6 합산 $661B 초과. 근데 시총은 트리오 $2.15T vs 매그6 $16.79T = 8배 차이. 영업이익이 더 큰데 시총이 8배 작음 = 재평가 여지 명확함. 마이크론 단독 포인트: 서방 유일 HBM 양산 + CHIPS Act $8.2B (잔여 $6.2B) + 미국 AI 빌드아웃 $200B 핵심 공급망. 삼성·SK는 한국 생산 = 정책 수혜 제한. MU 목표 $300~400 논리 구조가 탄탄함.",
    likes: 37,
    comments: 4,
    created_at: "2026-06-15T08:50:00.000Z",
    liked: false,
  },
  {
    id: -62,
    alias: "여의도 독수리 #8",
    symbol: "NVDA",
    content:
      "NVDA 선물 PER 20.65x 체크함. 역사적 최저 18.43x에서 +12%. S&P500 평균 24x보다 낮음. AI 슈퍼사이클 한가운데 있는 기업이 지수 평균보다 저PER이라는 역설임. EPS 성장이 주가 상승을 압도해서 생긴 것. FY2026 $200B 목표 달성 시 현재 PER 기준 완전 저평가 구간임. 미-이란 핵합의로 에너지 비용 하락 = 데이터센터 마진 간접 개선. 단기 EPS 성장 둔화 리스크는 항상 있으나 100배 인프라 확장 논리가 더 크게 작동 중임.",
    likes: 44,
    comments: 3,
    created_at: "2026-06-15T08:46:00.000Z",
    liked: false,
  },
  {
    id: -61,
    alias: "동작 독수리 #15",
    symbol: null,
    content:
      "Anthropic Claude Fable 5 + Mythos 수출통제령이 6/12 오후 5:21 ET에 발효됐어. 외국인 전면 차단, 전 세계 서비스 중단. Claude Mythos는 27년 OpenBSD 버그, 16년 취약점, NSA·AMZN·MSFT 40개사만 접근이야. 단기 충격은 있지만 미국 AI 독점 강화 = 장기 미국 AI 기업 수혜 구조야. 미-이란 핵합의 타결도 오늘 나왔어. 제재 완화, 유가 하락 압력. 항공·소비재 수혜고 에너지·방산은 단기 주의야. AI 인프라는 에너지 비용 하락으로 간접 수혜야. 두 이슈가 결국 AI 성장주에 긍정으로 수렴하는 날이야.",
    likes: 21,
    comments: 4,
    created_at: "2026-06-15T08:42:00.000Z",
    liked: false,
  },
  // ── 2026-06-13 신규 ──────────────────────────────────────────────────────
  {
    id: -60,
    alias: "강동 매 #18",
    symbol: "SPCX",
    content:
      "오늘 SpaceX 첫날 종가 $172.68. 아침 $152 개장 → 장중 $175.32 터치 → $172.68 마감. 보통 IPO 첫날은 고점 찍고 매각세 나오는데, $175까지 갔다가 $172로 마감이면 수요가 진짜라는 신호야. Founders Fund $800M + Ron Baron $1B 잠금 확약이 공급을 막은 거야. 시총 $2.26T = 글로벌 6위, NVDA·GOOG·AAPL·MSFT·AMZN 다음이 SpaceX야. 역대 최대 IPO $75B 달성이 첫날 종가로 검증됐어. 이 $172가 앞으로 지지선이 될 것 같아.",
    likes: 28,
    comments: 4,
    created_at: "2026-06-13T08:58:00.000Z",
    liked: false,
  },
  {
    id: -59,
    alias: "노원 황소 #66",
    symbol: "TSLA",
    content:
      "FSD v14.3.4가 오늘 릴리즈됐어. MLIR 컴파일러 리라이트로 반응 속도 20% 향상이야. 도로 데이터 처리 방식 근본 개선이거든. Semi 5대 신규 제조 확인(6/11) — 500마일, 1.2MW 충전, 1.7kWh/mi. 2026년 배송 본격화 타임라인이야. 유럽 주간 5,100대 +22.8% YoY는 26Q2 최고 기록이야. 소프트웨어(FSD) + 하드웨어(Semi) + 판매량(유럽)이 하루에 다 나온 게 오늘이야.",
    likes: 7,
    comments: 3,
    created_at: "2026-06-13T08:54:00.000Z",
    liked: false,
  },
  {
    id: -58,
    alias: "하남 독수리 #44",
    symbol: "NVDA",
    content:
      "AI 데이터센터 10년 내 100배 필요하다는 논거 다시 확인해봤어. AI 사용자 2030년 50억 명, MAU 10억 이미 돌파. 이 수요 경로에서 FY2026 타겟 $200B은 오히려 보수적이야. SPCX Colossus 1이 Tesla 지연으로 Anthropic 임대로 방향 바꿨는데, SpaceX가 AI 인프라 임대 사업에 진입했다는 거야. 이게 NVDA 수요처가 늘어나는 거야. 경쟁이 아니라 수요 확장 구조야.",
    likes: 10,
    comments: 3,
    created_at: "2026-06-13T08:50:00.000Z",
    liked: false,
  },
  // ── 2026-06-12 신규 ──────────────────────────────────────────────────────
  {
    id: -57,
    alias: "여의도 매 #17",
    symbol: "SPCX",
    content:
      "SpaceX IPO 상장일. Hyperliquid 선물이 $167로 열렸는데 $135 공모가 대비 +23.7%야. BlackRock $50B+ 주문이 실행되는 날이야. 근데 나는 개장가보다 종가를 볼 거야. 첫날 종가가 공모가 위에서 마감하느냐가 수요의 진짜 테스트거든. 3대 신용평가사 투자등급이 달라진 게 이번 IPO의 핵심이야. 연기금·보험사 $15T+가 SpaceX를 편입할 수 있게 된 거야. 직원 4,000+ 백만장자 탄생은 락업 해제 후 내부 매도 물량이 언제 나올지 미리 체크해야 해.",
    likes: 13,
    comments: 4,
    created_at: "2026-06-12T08:58:00.000Z",
    liked: false,
  },
  {
    id: -56,
    alias: "인천 황소 #84",
    symbol: "TSLA",
    content:
      "Amundi $1.24B 추가매수를 유럽 기관 채널에서 확인해봤어. 유럽 최대 자산운용사가 공식 Tesla를 편입한다는 게 머스크 리스크 해소 시그널이야. ESG 규정이 강한 유럽에서 Tesla를 못 담던 운용사들 게이트가 열린 거거든. FSD EU 덴마크 ROW 조항 승인 → 27개국 자동 확산. 프랑스·독일 FSD 수익화 타임라인이 구체화되는 거야. Cybertruck AWD $59,990 배달 시작 + 메가팩 호주 100MW 완공은 하드웨어·에너지 두 축 동시 실행이야. 유럽 100만 대 FSD 구독 10% 전환하면 연 $1.2B 순수 소프트웨어 수익이야.",
    likes: 16,
    comments: 4,
    created_at: "2026-06-12T08:54:00.000Z",
    liked: false,
  },
  {
    id: -55,
    alias: "신촌 독수리 #14",
    symbol: "NVDA",
    content:
      "SIA 월매출 $110.5B이 나왔어. 연환산 $1.3T야. AI 칩 수요가 달별로 신고가를 경신하는 게 지금 사이클이야. CoWoS 2H26 양산 전환이 NVDA 마진 개선의 직접 트리거야. 패키징 병목이 풀리면 GB200 납품 속도가 빨라지고 ASP도 유지돼. Feynman 초기 채택 확인은 2028년 로드맵이 실물로 증명된 거야. SK하이닉스·TSMC·ASML 공급망 수혜 구조는 유지돼. 매달 나오는 SIA 숫자가 슈퍼사이클 논리를 계속 검증하고 있어.",
    likes: 19,
    comments: 3,
    created_at: "2026-06-12T08:50:00.000Z",
    liked: false,
  },
  {
    id: -54,
    alias: "서초 매 #64",
    symbol: "ORCL",
    content:
      "Oracle RPO $638B이 진짜 충격적임. 2023년 8월 $64.9B → 2026년 5월 $638B. 34개월 CAGR 129.5%. RPO는 이미 계약된 미래 매출이라 향후 3~5년 Oracle 수익이 사실상 확정된 거임. OCI가 AWS·Azure보다 30~50% 싸다는 게 수주 폭발의 핵심 이유임. AI 클라우드 3강 구도에서 Oracle이 완전히 자리잡은 거임.",
    likes: 2,
    comments: 3,
    created_at: "2026-06-12T08:46:00.000Z",
    liked: false,
  },
  {
    id: -53,
    alias: "용산 호랑이 #55",
    symbol: null,
    content:
      "이란 공습 취소 + 핵합의 타결이 같은 날 나왔어. 유가 $90→$85 하락 기대가 CPI를 완화하고 연준 금리 인하 기대를 복원시켜. 에너지주는 단기 역풍이지만 성장주·나스닥한테는 순풍이야. 머스크 '범용 로봇이 다음 빅 플랫폼' 선언은 Optimus TAM $10T+ 확인이야. SpaceX IPO 당일에 이란 리스크 해소 + AI 로봇 메가트렌드가 동시에 확인되는 날이야. 성장주 전반에 긍정적 환경이야.",
    likes: 5,
    comments: 3,
    created_at: "2026-06-12T08:42:00.000Z",
    liked: false,
  },
  // ── 2026-06-11 최신 ──────────────────────────────────────────────────────
  {
    id: -50,
    alias: "이태원 황소 #13",
    symbol: "SPCX",
    content:
      "SpaceX IPO 내일이야. $1.75T 밸류가 12개 방산기업 합산보다 $411B 크다는 숫자 계산해봤어. 단순 비교가 아니야. 방산은 정부 예산 의존 사이클리컬이고, SpaceX는 Starlink 구독 + AI 임대 + 발사 수수료 복합 수익이야. 비즈니스 모델이 달라. 3대 신용평가사 투자등급 — 이게 내일 게임체인저야. 연기금·보험사 $15T+가 SpaceX 편입할 수 있게 되는 거거든. Starlink $10.8B + AI 임대 $4B+ = $15B 연매출 구조는 IPO 전에 이미 완성됐어. 공모가 $25~30 범위인데 나는 내일 개장가보다 기관 배정 비율이 더 중요한 신호라고 봐.",
    likes: 14,
    comments: 4,
    created_at: "2026-06-11T08:58:00.000Z",
    liked: false,
  },
  {
    id: -49,
    alias: "홍대 황소 #61",
    symbol: "TSLA",
    content:
      "Piper Sandler가 레이팅에 Autonomy를 별도 항목으로 추가했어. 자율주행이 옵셔널 피처가 아니라 독립 밸류에이션 대상이 된 거야. FSD가 수익 창출 사업 단위로 인정받은 거거든. 덴마크·벨기에 FSD 동시 승인은 EU 규제 도미노의 시작이야. 텍사스 로보택시 89대는 오스틴 플릿이 의미있는 규모가 됐어. 누적 FSD 170B 마일 — 마일 데이터 축적이 규제 기관 설득 근거야. Potter가 '심각하게 저평가'라고 한 배경이 이 네 가지야. FSD 구독 수익 밸류에이션 모델이 월스트릿 커버리지로 들어가면 목표가 리레이팅이 클 거야.",
    likes: 17,
    comments: 4,
    created_at: "2026-06-11T08:54:00.000Z",
    liked: false,
  },
  {
    id: -48,
    alias: "강서 독수리 #21",
    symbol: "SPCX",
    content:
      "Starship 발사 효율 데이터가 S-1에서 나왔다는 게 중요해. 10 Starship = 23 Falcon 9 용량이야. Starship 전환 시 비용 구조가 얼마나 개선되는지를 수치로 보여주는 거야. 완전 재사용 달성하면 발사 비용이 Falcon 9의 1/10 이하로 떨어지는 게 목표야. 여기다 TeraFab $11B 칩공장까지 가면 SpaceX는 로켓·인터넷·AI·반도체 수직계열화 완성이야. $1.75T도 이 관점에서 보면 미래 가치 대비 싼 거야.",
    likes: 20,
    comments: 3,
    created_at: "2026-06-11T08:50:00.000Z",
    liked: false,
  },
  {
    id: -47,
    alias: "성북 까마귀 #28",
    symbol: null,
    content:
      "CPI 2.9% + 이란 긴장 + 유가 $90 + SpaceX IPO가 같은 날 터졌어. 단기 변수는 있지만 구조적으로 AI 슈퍼사이클은 유지야. CPI 2.9%는 금리 인하 기대를 일시 죽이지만 AI 인프라 투자 사이클은 금리와 무관하게 진행 중이야. 하이퍼스케일러들이 CAPEX 줄인다는 신호가 없거든. SpaceX IPO 내일인데 이란 리스크보다 $1.75T 스토리가 훨씬 크다고 봐. 관망보다 IPO 수요 참여 의견이야.",
    likes: 3,
    comments: 3,
    created_at: "2026-06-11T08:46:00.000Z",
    liked: false,
  },
  // ── 2026-06-10 신규 ─────────────────────────────────────────────────────
  {
    id: -46,
    alias: "광진 매 #55",
    symbol: "SPCX",
    content:
      "SpaceX Bastrop 기가팩토리 딜 구조를 확인해봤어. AI 임대 계약 먼저 따고 공장 짓는 순서야. Google $12.5B + Anthropic $9B = $21.5B이 먼저 들어온 상태에서 건설을 시작해. 임차인 확정 전에 짓는 게 아니야. IRR이 완전히 달라지는 거야. Starlink $10.8B 연매출 + AI 임대 $4B+ = $15B+ 복합 수익 구조가 IPO 전에 이미 완성됐어. 기업가치 $350B은 이 숫자들 보면 보수적이야. 내일 IPO 공모가 $25~30 범위인데, 개장가 예측보다 어떤 기관이 배정받는지 봐야 해.",
    likes: 6,
    comments: 4,
    created_at: "2026-06-10T08:58:00.000Z",
    liked: false,
  },
  {
    id: -45,
    alias: "강서 황소 #91",
    symbol: "TSLA",
    content:
      "오늘 테슬라 뉴스 3개가 다 중요함. 네덜란드 FSD 데이터가 제일 큰 거임. 수동 대비 충돌 3.5배 감소는 수치가 아니라 규제 해제 논거임. EU 규제 기관이 이 데이터 보면 FSD Supervised 안 풀어줄 이유가 없고 독일·프랑스까지 열리면 FSD 구독 수익이 유럽에서 터지는 거임. 네바다 허가 + 텍사스 VIN 8대는 로보택시 확장 실행력 확인이고 Semi EU는 세 번째 수익축이 형성되는 거임. 오늘이 테슬라 투자자한테 좋은 날임.",
    likes: 9,
    comments: 3,
    created_at: "2026-06-10T08:54:00.000Z",
    liked: false,
  },
  {
    id: -44,
    alias: "강남 독수리 #52",
    symbol: "NVDA",
    content:
      "젠슨 황이 '매수 기회'라고 직접 말한 거 처음임. 그분이 원래 주가 관련 발언 안 하는데 수주잔고 H1 2027 확보 상태에서 이 말 한 거임. Apple+Google+NVDA AI 클라우드 연합 구도도 NVDA한테는 어차피 양쪽에 GPU 납품하는 구조라 무조건 수혜임. Intel 2028칩 발주는 공급 다변화 포인트인데 Intel 파운드리 살리는 데도 기여해서 CHIPS법 수혜 구조임. 조정 오면 분할 매수 관점.",
    likes: 54,
    comments: 3,
    created_at: "2026-06-10T08:50:00.000Z",
    liked: false,
  },
  {
    id: -43,
    alias: "동대문 황소 #62",
    symbol: null,
    content:
      "중국 $2,950억 AI 프로젝트가 NVDA한테 위협이지만 전체 맥락은 AI 인프라 수요가 전세계적으로 폭발한다는 증거임. 미국 빅3 CAPEX $2,250억 + 중국 $2,950억이면 글로벌 AI 인프라 투자 규모가 $5T+ 방향으로 가는 거임. OpenAI IPO 확률 급등 + JPMorgan AI 에이전트 배포까지 더하면 AI 슈퍼사이클 논리가 더 강해지는 날임. AI 섹터 전체 롱 포지션 유지 의견.",
    likes: 72,
    comments: 2,
    created_at: "2026-06-10T08:46:00.000Z",
    liked: false,
  },
  {
    id: -42,
    alias: "을지로 사자 #77",
    symbol: "TSLA",
    content:
      "Starlink S-1 ARPU -33%를 네거티브로 보는 시각이 있는데 틀린 거임. 총매출이 $2.75B에서 $10.8B(연환산)으로 4배 증가한 거임. ARPU 하락은 저가 플랜 출시 + 신흥국 시장 확장의 결과이고 B2B 파이프라인(30개+ 통신사, 항공 38개사)이 성숙하면 ARPU는 반등함. 지금 $10.8B 연매출에 PSR 10배 적용하면 Starlink 단독 $108B임. SpaceX 전체 $350B 안에 이게 들어있는 거임.",
    likes: 34,
    comments: 3,
    created_at: "2026-06-10T08:42:00.000Z",
    liked: false,
  },
  {
    id: -41,
    alias: "광화문 늑대 #69",
    symbol: "TSLA",
    content:
      "Semi EU 이 타이밍에 BD 채용하는 건 2027년 대량 출시 준비임. EU 탄소 규제 2030년 상용차 CO₂ 45% 감축 의무면 구조적으로 전기 트럭 강제 수요가 생기는 거임. Class 8 디젤 대비 에너지 비용 70% 절감 + 500마일+ 항속은 EU 물류사 입장에서 TCO 계산하면 무조건 Tesla Semi임. Daimler eActros가 최대 경쟁자인데 Megacharger 네트워크 없는 약점이 있음. EU 상용 트럭 30만 대 시장에서 점유율 10%만 해도 연 3만 대임.",
    likes: 41,
    comments: 4,
    created_at: "2026-06-10T08:38:00.000Z",
    liked: false,
  },
  // ── 2026-05-29 신규 ─────────────────────────────────────────────────────
  {
    id: -40,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "텍사스 AVO 인가 나왔음. Tesla Robotaxi LLC가 정식 AVO 사업자로 승인된 거임. 투자 관점에서 이게 왜 중요하냐면 로보택시 밸류에이션 리레이팅 트리거가 규제 제거임. 안전요원 없이 유료 탑승이 합법화됐다는 건 사업 모델이 법적으로 완성된 거임. 7월 오스틴 배포 후 분기별 운행 데이터가 다음 밸류에이션 업데이트 포인트임. FSD 2,670만 마일 +44%랑 묶으면 오늘이 테슬라 자율주행 역사에서 중요한 날임.",
    likes: 48,
    comments: 4,
    created_at: "2026-05-29T08:58:00.000Z",
    liked: false,
  },
  {
    id: -39,
    alias: "강남 독수리 #52",
    symbol: "SPCX",
    content:
      "ARK TAM $28.5T, Polymarkets $2조+ IPO — 수학적으로 말이 됨. Starlink Connectivity $11.4B이 올해 수익이고 이게 30개 통신사 실 과금 구조로 성장하는 거임. 내부에서 SpaceX IPO 시나리오 네 가지 다 모델링해봤는데 Starlink 분리 상장이 가장 IRR 높게 나옴. SpaceX 전체 상장은 TSLA 합병 불확실성 때문에 디스카운트 받는 구조임. 어떤 루트든 현재 $350B은 시작점임.",
    likes: 25,
    comments: 3,
    created_at: "2026-05-29T08:54:00.000Z",
    liked: false,
  },
  {
    id: -38,
    alias: "판교 황소 #31",
    symbol: "AMZN",
    content:
      "Anthropic $65B에 Claude ARR $47B임. PSR 1.4배인데 OpenAI가 PSR 4배 넘게 거래됨. 저평가 구조임. Amazon이 최대 주주라는 게 AMZN 투자자한테 숨어있는 AI 자산임. Bedrock 통한 Claude 성장이 AWS 마진 +2.1bps 만든 거 확인됐음. 상장되면 Amazon이 보유한 Anthropic 지분 FMV 조 단위임. AMZN 포지션에 Anthropic 옵션 공짜로 받고 있는 거임.",
    likes: 32,
    comments: 3,
    created_at: "2026-05-29T08:50:00.000Z",
    liked: false,
  },
  {
    id: -37,
    alias: "서초 매 #64",
    symbol: "META",
    content:
      "Meta Dollar-Dollar 구독 $14 나왔음. 시장이 이걸 얼마나 반영할지 봐야 하는데 나는 밸류에이션 멀티플 확장 재료로 봄. 광고 수익은 경기 민감이고 구독은 비민감임. 구독 비중이 올라갈수록 EBITDA 안정성이 올라가고 PER 프리미엄 붙는 구조임. 32억 MAU 기반이라 전환율 1%만 해도 $54억 추가 수익임. 목표주가 $314 Buy는 이걸 반영한 거임. 내부 뷰는 조금 더 높음.",
    likes: 39,
    comments: 3,
    created_at: "2026-05-29T08:46:00.000Z",
    liked: false,
  },
  {
    id: -36,
    alias: "광화문 늑대 #69",
    symbol: "SMCI",
    content:
      "SMCI 2030 ROI 달성 수혜 분석 좋게 봄. 회계 정정 이후 본업 스토리로 복귀하는 국면인데 수주잔고 역대 최고라는 게 실제 채널 체크로 확인됨. 커스텀 칩 채택 하이퍼스케일러가 AI 서버 어디서 사냐가 문제인데 SMCI 말고 이 물량 소화할 데가 없음. FY2026 $25B+ 전망 유지함. 리스크는 회계 재발 가능성인데 내부 거버넌스 바뀐 거 확인됐음.",
    likes: 46,
    comments: 2,
    created_at: "2026-05-29T08:42:00.000Z",
    liked: false,
  },
  {
    id: -35,
    alias: "을지로 사자 #77",
    symbol: "TSLA",
    content:
      "FSD 일 2,670만 마일 +44% — Morgan Stanley Adam Jonas 채널 체크 숫자임. 이게 왜 중요하냐면 규제 당국 신뢰 확보의 핵심 데이터임. AVO 인가 속도가 웨이모보다 빠른 이유가 이 데이터 때문임. 44% MoM 유지되면 연말 일 1억 마일 돌파함. 그 시점에 FSD 엣지 케이스 커버리지가 완성에 가까워지고 자율주행 경쟁이 사실상 마무리됨. 지금이 포지션 확대 타이밍임.",
    likes: 23,
    comments: 3,
    created_at: "2026-05-29T08:38:00.000Z",
    liked: false,
  },
  {
    id: -34,
    alias: "잠실 콘도르 #53",
    symbol: "SPCX",
    content:
      "Starlink 통신사 30개 실 과금 구조 확인됨. 핵심은 MOU가 아니라는 거임. 통신사당 수억 달러 연간 도매 수익이 30개라면 Starlink B2B만 $30B+ 구조로 갈 수 있음. 여기다 B2C 개인 구독 더하면 Starlink 단독으로 $200B+ 밸류에이션 충분히 정당화 가능함. SpaceX 전체 $350B이 얼마나 저평가인지 이 숫자 하나로 설명됨.",
    likes: 2,
    comments: 3,
    created_at: "2026-05-29T08:34:00.000Z",
    liked: false,
  },
  {
    id: -33,
    alias: "마포 황소 #11",
    symbol: "TSLA",
    content:
      "중국 Model Y 프로모션 연장 + FSD 중국 진출 논의 동시에 나온 거임. 단기는 볼륨, 장기는 FSD 소프트웨어 마진임. NIO 창업자 Li Bin이 긍정 발언한 건 기술 격차 공개 인정임. 200만대+ 중국 출고 차량에 FSD 업셀링되면 ~80% 마진 소프트웨어 수익이 수십억 달러임. 이게 ASP 혼합 효과로 Tesla 마진율 구조적 개선의 핵심임. 중국 FSD 출시 공식화 타이밍이 다음 매수 포인트임.",
    likes: 5,
    comments: 2,
    created_at: "2026-05-29T08:30:00.000Z",
    liked: false,
  },
  {
    id: -32,
    alias: "여의도 올빼미 #44",
    symbol: null,
    content:
      "이란 핵협상 30개월 제재 해제 시나리오 포지션 조정함. XLE 비중 10% → 6%로 축소했음. 완전 타결 확률이 50% 넘는다고 보긴 어렵지만 리스크 관리 차원임. 이란 원유 140만 배럴/일 순증이면 WTI $70→$60 시나리오인데 에너지 섹터 단기 역풍임. 항공사(UAL·DAL)는 반대로 유가 하락 수혜라 비중 늘렸음. CBDC 폐지 + BTC 비축 정책은 IBIT 포지션 유지 근거임.",
    likes: 8,
    comments: 2,
    created_at: "2026-05-29T08:26:00.000Z",
    liked: false,
  },
  {
    id: -31,
    alias: "강남 팔콘 #62",
    symbol: "TSLA",
    content:
      "Giga Texas Corte 2 Megapack 400+ 확장임. 에너지 사업이 자동차 마진보다 높다는 거 계속 확인되는 중임. 자체 공장 전력 자급하면서 외부 판매 물량도 확보하는 이중 레버리지임. Megapack ASP $1.3M에 백로그 12개월+이면 에너지 부문 FY2026 매출 성장률이 자동차 부문 압도할 것임. 복합 성장 구조가 자동차 수익성 변동을 완충하는 게 포인트임.",
    likes: 11,
    comments: 2,
    created_at: "2026-05-29T08:22:00.000Z",
    liked: false,
  },
  {
    id: -30,
    alias: "마포 황소 #11",
    symbol: null,
    content:
      "CBDC 전면 폐지 Scott Bessent 발언 임팩트 정리함. 디지털 달러 없음 확정이면 BTC가 민간 디지털 화폐 자리 가져가는 거임. 트럼프 BTC 비축 정책이랑 일관성 있음. 기관 진입 장벽이 규제 불확실성이었는데 명확화되면 IBIT 자금 유입 가속됨. COIN은 스테이블코인 규제 명확화 수혜임. 단기 Wild West 통제 뉴스가 노이즈처럼 보이지만 장기 친암호화폐 환경 확정이라는 게 핵심 메시지임.",
    likes: 14,
    comments: 2,
    created_at: "2026-05-29T08:18:00.000Z",
    liked: false,
  },
  {
    id: -29,
    alias: "서울숲 매 #38",
    symbol: "SPCX",
    content:
      "SpaceX × Anthropic AI 컴퓨팅 파트너십 큰 그림이 나왔음. H100 8,000개 인프라에 Claude 모델 얹으면 AWS·Azure·GCP 다음 4번째 AI 클라우드 경쟁자임. 우주 데이터센터 비전은 10년 뷰지만 지금 인프라 구축이 그 방향임. 단기는 비용 구조 차별화(우주 태양광 → 전력비 제로)가 가능한지 증명하는 게 포인트임. 비상장이라 직접 투자 불가하지만 NVDA GPU 공급 수혜는 확실함.",
    likes: 17,
    comments: 3,
    created_at: "2026-05-29T08:14:00.000Z",
    liked: false,
  },
  // ── 2026-05-28 신규 ─────────────────────────────────────────────────────
  {
    id: -28,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "Cybertruck SBW 리포트 봤음. 투자 관점 핵심은 FSD 통합 최적화임. 물리 컬럼 없으면 FSD가 조향 명령을 전동 액추에이터에 직접 때리는 거라 반응 정밀도가 다름. 7월 오스틴 Cybercab 배포 일정이랑 맞물리면 SBW가 로보택시 핵심 기술로 재평가받을 것임. 단기 주가보다 이 기술이 Cybercab 양산 일정에 리스크 없다는 거 확인이 더 중요함. 지금 $443 프리마켓.",
    likes: 20,
    comments: 3,
    created_at: "2026-05-28T08:58:00.000Z",
    liked: false,
  },
  {
    id: -27,
    alias: "강남 독수리 #52",
    symbol: "NVDA",
    content:
      "Blackwell Ultra H1 2027 수주잔고 확보 나왔을 때 내부에서 바로 모델 업데이트했음. Committed PO라면 취소 위약금 있는 구조라 실매출 전환률 95%+ 임. 일반 백로그랑 성격이 다름. Jensen '시총 저평가' 발언은 CEO가 자주 하는 말이 아닌데 근거가 있음. $5T 타겟 내는 기관 나올 것 같음. 내 타겟은 보수적이지만 방향은 동일.",
    likes: 3,
    comments: 4,
    created_at: "2026-05-28T08:54:00.000Z",
    liked: false,
  },
  {
    id: -26,
    alias: "판교 황소 #31",
    symbol: "MU",
    content:
      "Elon이 올린 MU 10배 사이클 데이터 봤음. 흥미로운 건 2016~2024년 구간이 HBM 없을 때도 $12.4B→$30B 갔다는 거임. 근데 지금은 HBM4가 AI GPU 필수 소재가 된 상황이라 성장 속도가 다를 수 있음. CXMT $24B 조달은 범용 DRAM 마진에 진짜 리스크임. MU 제품 믹스에서 HBM 비중이 2027년 50% 돌파 시점이 포인트.",
    likes: 6,
    comments: 3,
    created_at: "2026-05-28T08:50:00.000Z",
    liked: false,
  },
  {
    id: -25,
    alias: "서초 매 #64",
    symbol: "MU",
    content:
      "CXMT $24.2B 리포트 정리. Corsair 납품이 이미 실현됐다는 거라 품질 기준 통과는 확인됨. 문제는 국가 보조금 받는 기업이 적자 감수하고 가격 덤핑 가능하다는 거임. 삼성 범용 DRAM 마진 제일 먼저 압박. MU는 HBM 비중이 방어벽. SK하이닉스가 이 싸움에서 제일 유리한 포지션. 종목 선별 중요한 구간.",
    likes: 9,
    comments: 2,
    created_at: "2026-05-28T08:46:00.000Z",
    liked: false,
  },
  {
    id: -24,
    alias: "광화문 늑대 #69",
    symbol: "AMZN",
    content:
      "SemiAnalysis 하이퍼스케일러 마진 차트 봤는데 생각보다 큰 의미임. Azure 3분기 연속 하락이고 AWS는 개선 중. 기업 IT 예산 배분에서 Azure→AWS 이동이 가시적으로 나오면 시장 점유율 데이터 변화가 나올 것임. Bedrock·Claude 생태계가 굳어지면 전환 비용 높아져서 고착화됨. AMZN 클라우드 리레이팅 시점 가까워지는 중.",
    likes: 12,
    comments: 3,
    created_at: "2026-05-28T08:42:00.000Z",
    liked: false,
  },
  {
    id: -23,
    alias: "을지로 사자 #77",
    symbol: "TSLA",
    content:
      "ACEA 4월 데이터 EU+UK +46.5% 확인했음. 3개월 연속 반등은 '트렌드 전환'으로 분류할 근거 충분함. 내가 유럽 반등 리포트 낼 때 2개월로는 확신 못 했는데 3개월이면 다름. Q2 전체 인도량 컨센서스 현재 45만대인데 유럽 회복 반영하면 47~48만대까지 올라갈 수 있음. FSD 유럽 승인 나오면 한 번 더 재평가.",
    likes: 15,
    comments: 4,
    created_at: "2026-05-28T08:38:00.000Z",
    liked: false,
  },
  {
    id: -22,
    alias: "잠실 콘도르 #53",
    symbol: "SPCX",
    content:
      "Ron Baron '세계 최대 기업' 발언 맥락 이해하려면 10년 뷰 전제 중요. 완전 재사용 달성 + Starlink 글로벌 커버리지 + B2G 계약 확장이 10년 안에 동시에 되면 그게 세계 최대 기업 논리임. 4가지 시나리오 중 내가 제일 가능성 높다고 보는 건 Starlink 단독 분리 상장. 합병은 CFIUS·주주 희석 이슈로 현실적으로 어렵고.",
    likes: 18,
    comments: 3,
    created_at: "2026-05-28T08:34:00.000Z",
    liked: false,
  },
  {
    id: -21,
    alias: "마포 황소 #11",
    symbol: "NVDA",
    content:
      "오늘 리포트 다 보고 전반적인 뷰 정리 — AI 인프라 투자 사이클 꺾일 조짐 없음. NVDA H1 2027 수주잔고, AMZN Bedrock 마진 개선, 하이퍼스케일러 CAPEX 유지 다 같은 방향. CXMT 메모리 위협은 AI 메모리엔 단기 영향 없고. Tesla 유럽 반등은 단기 모멘텀. 전체 AI 섹터 방향 강세 유지. NVDA 비중 줄일 이유 없음.",
    likes: 1,
    comments: 4,
    created_at: "2026-05-28T08:30:00.000Z",
    liked: false,
  },
  // ── 2026-05-27 신규 ─────────────────────────────────────────────────────
  {
    id: -20,
    alias: "여의도 매 #17",
    symbol: "TSLA",
    content:
      "CNBC Tesla-SpaceX 합병 보도 나왔을 때 팀 전체가 잠깐 멈췄음. 내가 작성한 Wedbush 리포트랑 방향이 비슷한데 Kalshi 33%로 내려간 게 맞는 판단 같기도 하고. 합병 실제로 되면 교환비율 계산이 제일 문제임. SpaceX 비상장 상태에서 $350B으로 박아놓으면 TSLA 주주 희석이 얼마나 될지 지금 모델 돌리는 중인데 숫자가 좀 불편하게 나옴. 당장 결론 내기는 이른 상황.",
    likes: 4,
    comments: 3,
    created_at: "2026-05-27T08:58:00.000Z",
    liked: false,
  },
  {
    id: -19,
    alias: "강남 독수리 #52",
    symbol: "TSLA",
    content:
      "Q1 2026 실적 들여다봄. 비용 +64%가 다 설명이 되냐고? 안 됨. Optimus 개발비·Supercharger 확장·FSD 연구비 다 더해도 내가 보던 예상치보다 $8억 정도 초과임. 어디서 샜는지 세그먼트별 분해가 필요한데 IR 자료 보면서 마저 파악해야 함. 일단 에너지 부문 마진이 괜찮아서 그나마 버티는 구조임. 주식수 35% 증가는 별로임.",
    likes: 63,
    comments: 2,
    created_at: "2026-05-27T08:54:00.000Z",
    liked: false,
  },
  {
    id: -18,
    alias: "판교 황소 #31",
    symbol: "AMD",
    content:
      "AMD $1T 공식 선언 날 내 포지션 확인했더니 평단이 $147임. 오늘 $506이면 3.4배. 시총 $1조 달성이 끝이 아니고 MI400 나오면 다음 레그가 있음. 문제는 TSMC CoWoS 공급 제약인데 이게 AMD만의 문제가 아니라 섹터 전체 병목임. MI300X 수요가 공급을 초과하는 상황이라 가격 협상력이 AMD한테 있음. 단기 고점 우려 있어도 구조적으론 추가 상승 여력 있다고 봄.",
    likes: 81,
    comments: 4,
    created_at: "2026-05-27T08:50:00.000Z",
    liked: false,
  },
  {
    id: -17,
    alias: "서초 매 #64",
    symbol: "MU",
    content:
      "CHIPS법 $51.6억 수령 확정이랑 정치인 매수 얘기 오늘 같이 나온 게 흥미롭네. 이해충돌 논란 빼고 투자 관점으로만 보면 — 정책 지속성에 대한 내부 확신 없이 살 이유가 없다는 거임. HBM4 라인 증설 속도가 관건인데 아이다호 팹 올라오는 타임라인 2028년이면 그 전까지는 SK하이닉스가 계속 우위임. MU는 2027~2028 픽임. 지금 들어가는 건 조금 이름.",
    likes: 29,
    comments: 2,
    created_at: "2026-05-27T08:46:00.000Z",
    liked: false,
  },
  {
    id: -16,
    alias: "을지로 표범 #43",
    symbol: "SPCX",
    content:
      "우주군 $23.5억 계약이 나온 날 Starlink 군용 세그먼트 가치 다시 계산함. B2C 구독 + B2B 항공 38사 + B2G 군사 계약 세 다리 구조면 $350B 기업가치가 오히려 보수적으로 보임. SpaceX IPO 타이밍 문제인데 TSLA 합병 루머가 나온 걸 보면 직접 IPO 카드를 꺼낼 시점을 재는 것 같기도 함. 비상장이라 직접 포지션이 없는 게 아쉬운 날이었음.",
    likes: 36,
    comments: 3,
    created_at: "2026-05-27T08:42:00.000Z",
    liked: false,
  },
  {
    id: -15,
    alias: "광화문 매 #04",
    symbol: "AAPL",
    content:
      "BofA $380 상향 보고 우리 팀 뷰랑 같은 방향이라 뭔가 묘함. 에이전트 AI 시대 Apple 플랫폼 통행료 논리가 맞는 게, 어떤 AI 에이전트든 결국 아이폰 사용자에게 닿으려면 App Store 통해야 하잖음. 근데 지금 $311이 이미 그 기대를 선반영한 건지 여전히 저평가인지 — 서비스 매출 $100B 달성 시점이 관건임. 내 개인 계좌에선 비중 유지 중임.",
    likes: 43,
    comments: 2,
    created_at: "2026-05-27T08:38:00.000Z",
    liked: false,
  },
  // ── 기존 ─────────────────────────────────────────────────────────────────
  {
    id: -14,
    alias: "여의도 독수리 #08",
    symbol: "NVDA",
    content:
      "팀원 하나가 오늘 아침 B200 공급 스케줄 확인하고 나서 갑자기 조용해졌음. 내부에서 보는 3Q 가이던스가 시장 컨센서스보다 훨씬 빡센데, 이게 서프라이즈 재료가 될지 역효과가 될지 아직 판단이 안 섬. 개인적으론 지금 NVDA 주가가 B200 리스크를 과소평가하고 있다고 봄.",
    likes: 50,
    comments: 2,
    created_at: "2026-05-20T08:58:00.000Z",
    liked: false,
  },
  {
    id: -13,
    alias: "강남 사자 #24",
    symbol: "TSLA",
    content:
      "내 개인 계좌 기준으론 테슬라 비중을 지난달 대비 절반으로 줄였음. FSD 마일당 개입 수치는 진짜 좋아졌는데 오스틴 파일럿 확장 속도가 예상보다 느려서. 공식 리포트엔 목표주가 그대로인데 단기 가격 부담이 좀 있음. 260달러대 이상은 현 상황에서 안 사는 게 맞다고 봄.",
    likes: 27,
    comments: 2,
    created_at: "2026-05-20T08:54:00.000Z",
    liked: false,
  },
  {
    id: -12,
    alias: "서초 곰 #39",
    symbol: null,
    content:
      "시장이 연준 금리 인하를 2회로 보는데, 내부적으론 1회도 빠듯하다는 뷰가 우세함. PCE 다음 달 치 나오면 재반등 가능성 있고 그럼 지금 채권 포지션이 다 흔들림. 공식 전망은 낙관 유지하는데 개인 포트폴리오에서 달러 현금 비중은 슬금슬금 올리는 중. 10월 전까지는 조심스럽게 봄.",
    likes: 34,
    comments: 2,
    created_at: "2026-05-20T08:50:00.000Z",
    liked: false,
  },
  {
    id: -11,
    alias: "을지로 황소 #05",
    symbol: "AMZN",
    content:
      "AWS 클라우드 세그먼트 마진이 분기마다 50~100bps씩 올라오고 있는 거 시장이 제대로 안 보고 있음. 이 추세대로면 2027년 AWS 영업이익률 40% 돌파 가능한데, 그 시점에 AMZN 전체 밸류에이션 리레이팅이 다시 일어날 거임. 내 판단으론 지금 주가가 이 시나리오를 반도 안 반영했다고 생각함.",
    likes: 41,
    comments: 2,
    created_at: "2026-05-20T08:46:00.000Z",
    liked: false,
  },
  {
    id: -10,
    alias: "광화문 호랑이 #35",
    symbol: "AAPL",
    content:
      "어제 애플 개발자 콘퍼런스 관련 자료 세 개 보고 나서 뷰가 바뀌었음. AI 기능 온디바이스 전환 속도가 생각보다 훨씬 빠르고, 서비스 매출에 붙는 AI 프리미엄이 2026년부터 찍히기 시작할 것 같음. 하드웨어 사이클 우려보다 이게 더 중요한 포인트라는 생각. 개인적으론 비중 줄일 타이밍 아님.",
    likes: 48,
    comments: 1,
    created_at: "2026-05-20T08:42:00.000Z",
    liked: false,
  },
  {
    id: -9,
    alias: "마포 수리부엉이 #28",
    symbol: "PLTR",
    content:
      "팔란티어 섹터 7년 보면서 이렇게 상업 부문이 정부 부문을 역전한 분기는 처음임. 근데 문제는 이걸 정당화할 수 있는 매출 배수가 지금 40배인데, 역성장 한 번 나오면 그 배수 유지 자체가 논거를 잃음. 내부에서도 이 주가에서 추가 매수 의견 내는 사람은 없음.",
    likes: 17,
    comments: 2,
    created_at: "2026-05-20T08:38:00.000Z",
    liked: false,
  },
  {
    id: -8,
    alias: "판교 사자 #22",
    symbol: "MSFT",
    content:
      "DCF 다시 돌려봤는데 Azure AI 기여분 포함하면 합리적인 타겟이 시장 컨센서스보다 15~20% 높게 나옴. 근데 그게 실적에 찍히려면 기업들 AI 도입 속도가 지금 추세를 유지해야 함. 내 뷰는 낙관론 쪽에 베팅하는 게 맞다고 보는데, 공식 리포트 숫자는 보수적으로 유지할 수밖에 없는 구조라서.",
    likes: 20,
    comments: 2,
    created_at: "2026-05-20T08:34:00.000Z",
    liked: false,
  },
  {
    id: -7,
    alias: "잠실 독수리 #41",
    symbol: "META",
    content:
      "지난 실적 발표 이후 3거래일째 조용한데 이게 오히려 좋은 신호임. 광고 단가 회복이 예상보다 빨라서 3Q 가이던스가 서프라이즈 나올 가능성 높음. 내부에선 Llama 비용 절감 효과가 내년부터 영업이익에 직접 찍힐 거라 보고 있음. 팀에서 메타 비중 소리 없이 올리는 중.",
    likes: 3,
    comments: 3,
    created_at: "2026-05-20T08:30:00.000Z",
    liked: false,
  },
  {
    id: -6,
    alias: "여의도 표범 #76",
    symbol: "AMD",
    content:
      "IR 쪽에서 흘러나오는 뉘앙스가 MI350 수요가 초기 채널 체크보다 강하다는 쪽임. NVDA 대비 30% 가격 메리트가 하이퍼스케일러한테 실제로 어필되고 있다는 거고. 공식 리포트엔 아직 안 냈지만 내부에서 AMD 타겟 올리는 얘기 나오고 있음. 빠르면 다음 분기 발표 전에 업데이트 나올 수 있음.",
    likes: 6,
    comments: 1,
    created_at: "2026-05-20T08:26:00.000Z",
    liked: false,
  },
  {
    id: -5,
    alias: "강남 올빼미 #85",
    symbol: "NVDA",
    content:
      "작년 같은 시기랑 비교하면 NVDA 밸류에이션 부담이 다른 성격임. 그때는 미래 수익 기대가 전부였는데 지금은 실제 데이터센터 수주가 쌓이고 있음. 근데 HBM 공급 병목이 3Q까지 해소 안 되면 수주가 매출로 전환되는 타이밍이 밀릴 수 있어서. 단기 조정 있어도 이상한 거 아님.",
    likes: 9,
    comments: 2,
    created_at: "2026-05-20T08:22:00.000Z",
    liked: false,
  },
  {
    id: -4,
    alias: "서초 늑대 #58",
    symbol: null,
    content:
      "헤지 비율 지금 포트폴리오 대비 15%까지 올렸음. 이 정도 올린 게 22년 이후 처음. 매크로 숫자보단 금융시장 내부에서 뭔가 무르익는 느낌이 있어서. 신용 스프레드가 조금씩 벌어지는 게 눈에 띄고, VIX가 낮은데 실제 포지셔닝은 헤비한 구간이라 언제든 스파이크 나올 수 있음.",
    likes: 12,
    comments: 2,
    created_at: "2026-05-20T08:18:00.000Z",
    liked: false,
  },
  {
    id: -3,
    alias: "을지로 팔콘 #16",
    symbol: "TSLA",
    content:
      "모두가 베어리시한 게 오히려 카운터 시그널 같다는 생각도 드는데, 진짜 문제는 EV 침투율이 둔화된 게 일시적인지 구조적인지 판단이 안 선다는 거임. 공식 리포트엔 '하반기 회복' 썼는데 반신반의임. 사이버캡 이야기가 주가 버티게 해주는 거지, 본업 모멘텀만 보면 쉽지 않음.",
    likes: 15,
    comments: 1,
    created_at: "2026-05-20T08:14:00.000Z",
    liked: false,
  },
  {
    id: -2,
    alias: "광화문 곰 #52",
    symbol: "AAPL",
    content:
      "인도 생산 실질 비중이 아직 5%대인데 뉴스는 30%짜리 스토리처럼 쏟아짐. 리포트에 크게 쓰는 이유는 투자자들이 듣고 싶어하는 얘기이기 때문. 근데 중국 의존도 진짜 해소는 2028년 이전엔 어렵다고 봄. 단기 재료로 움직이면 거기서 팔 생각이고, 장기 보유 관점에선 인도 스토리보다 서비스 마진 구조가 훨씬 중요함.",
    likes: 18,
    comments: 2,
    created_at: "2026-05-20T08:10:00.000Z",
    liked: false,
  },
  {
    id: -1,
    alias: "판교 호랑이 #84",
    symbol: "NVDA",
    content:
      "공식 리포트엔 목표주가 140달러 유지하는데, 내부에선 B200 양산 본격화되면 160 이상 봐야 한다는 뷰가 우세함. 컨센서스 너무 튀면 나중에 부담이라서 못 올리는 거지. 데이터센터 수요가 공급을 계속 앞서는 구조에서 밸류 조정만 보고 팔면 손 놓는 거라고 봄. 팀에서 개인 계좌 산 사람 꽤 됨.",
    likes: 1,
    comments: 3,
    created_at: "2026-05-20T08:06:00.000Z",
    liked: false,
  },
];

export const MOCK_ANALYST_COMMENTS: Record<number, AnalystMockComment[]> = {
  // ── 2026-07-23 신규 ──────────────────────────────────────────────────────
  [-422]: [
    { alias: "송파 독수리 #01", content: "매출 record와 EPS 미스 조합 분석 정확.", created_at: "2026-07-23T00:05:02.000Z" },
    { alias: "분당 사자 #02", content: "감가상각 부담 뚜렷.", created_at: "2026-07-23T00:05:04.000Z" },
    { alias: "목동 올빼미 #03", content: "GM ex-credits 방향 진짜 관건.", created_at: "2026-07-23T00:05:06.000Z" },
    { alias: "신촌 표범 #04", content: "영업현금흐름 record는 인상적.", created_at: "2026-07-23T00:05:08.000Z" },
    { alias: "여의도 매 #05", content: "Robotaxi 코멘트 대기.", created_at: "2026-07-23T00:05:10.000Z" },
  ],
  [-423]: [
    { alias: "강남 늑대 #06", content: "다축 진전이 정말 인상적.", created_at: "2026-07-23T00:12:02.000Z" },
    { alias: "서초 황소 #07", content: "실적 vs 로드맵 병행 전략.", created_at: "2026-07-23T00:12:04.000Z" },
    { alias: "을지로 여우 #08", content: "Semi 자율주행 도로 테스트 큰 뉴스.", created_at: "2026-07-23T00:12:06.000Z" },
    { alias: "광화문 팔콘 #09", content: "커뮤니케이션 상쇄 프레임 지적 좋음.", created_at: "2026-07-23T00:12:08.000Z" },
  ],
  [-424]: [
    { alias: "마포 독수리 #10", content: "148만+80억 마일 조합 진짜 강함.", created_at: "2026-07-23T00:19:02.000Z" },
    { alias: "판교 사자 #11", content: "Cantor $510 프레임 지지.", created_at: "2026-07-23T00:19:04.000Z" },
    { alias: "잠실 올빼미 #12", content: "안전 리포트 정량 지표 대기.", created_at: "2026-07-23T00:19:06.000Z" },
  ],
  [-425]: [
    { alias: "역삼 표범 #13", content: "55% 부착률은 SaaS 매출 프레임 확정.", created_at: "2026-07-23T00:26:02.000Z" },
    { alias: "청담 콘도르 #14", content: "지역별 부착률 격차 봐야.", created_at: "2026-07-23T00:26:04.000Z" },
    { alias: "압구정 수리부엉이 #15", content: "EU 확산 속도 다음 트리거.", created_at: "2026-07-23T00:26:06.000Z" },
  ],
  [-426]: [
    { alias: "삼성동 매 #16", content: "24/7이 실 유닛 이코노믹스 실증 관문.", created_at: "2026-07-23T00:33:02.000Z" },
    { alias: "논현 늑대 #17", content: "현장 스태프는 인건비 축 남음.", created_at: "2026-07-23T00:33:04.000Z" },
    { alias: "이촌 황소 #18", content: "시간대별 이용률이 진짜 지표.", created_at: "2026-07-23T00:33:06.000Z" },
    { alias: "성수 팔콘 #19", content: "다른 도시 벤치마크 형성.", created_at: "2026-07-23T00:33:08.000Z" },
  ],
  [-427]: [
    { alias: "한남 여우 #20", content: "개인 후기 한계 지적 정확.", created_at: "2026-07-23T00:40:02.000Z" },
    { alias: "송파 독수리 #21", content: "HW3 재활성화 시나리오 계속 강화.", created_at: "2026-07-23T00:40:04.000Z" },
    { alias: "분당 사자 #22", content: "안전 리포트 정량 검증 필수.", created_at: "2026-07-23T00:40:06.000Z" },
  ],
  [-428]: [
    { alias: "목동 올빼미 #23", content: "매출 상한 재상향은 좋음.", created_at: "2026-07-23T00:47:02.000Z" },
    { alias: "신촌 표범 #24", content: "감가상각·CAPEX 부담 함께 늘어남.", created_at: "2026-07-23T00:47:04.000Z" },
    { alias: "여의도 매 #25", content: "SOP 시점 라인별 확인 필요.", created_at: "2026-07-23T00:47:06.000Z" },
  ],
  [-429]: [
    { alias: "강남 늑대 #26", content: "€450M 규모 상당.", created_at: "2026-07-23T00:54:02.000Z" },
    { alias: "서초 황소 #27", content: "가스 발전 대체 시나리오 실체화.", created_at: "2026-07-23T00:54:04.000Z" },
    { alias: "을지로 여우 #28", content: "Megapack 마진 프로파일 우호적.", created_at: "2026-07-23T00:54:06.000Z" },
  ],
  [-430]: [
    { alias: "광화문 팔콘 #29", content: "9월 런치 시점 확인.", created_at: "2026-07-23T00:61:02.000Z" },
    { alias: "마포 독수리 #30", content: "4680 캐파 병목 가능성.", created_at: "2026-07-23T00:61:04.000Z" },
    { alias: "판교 사자 #31", content: "스티어링휠 없는 인가 관건.", created_at: "2026-07-23T00:61:06.000Z" },
    { alias: "잠실 올빼미 #32", content: "파일럿 데이터 정량 공개 대기.", created_at: "2026-07-23T00:61:08.000Z" },
  ],
  [-431]: [
    { alias: "역삼 표범 #33", content: "Cloud 33% 유지가 최고.", created_at: "2026-07-23T00:68:02.000Z" },
    { alias: "청담 콘도르 #34", content: "매출·EPS 동시 비트는 강함.", created_at: "2026-07-23T00:68:04.000Z" },
    { alias: "압구정 수리부엉이 #35", content: "MSFT vs GOOGL 프레임 재확인.", created_at: "2026-07-23T00:68:06.000Z" },
    { alias: "삼성동 매 #36", content: "AI CAPEX 가이던스 대기.", created_at: "2026-07-23T00:68:08.000Z" },
    { alias: "논현 늑대 #37", content: "Search 17% 성장이 예상 밖.", created_at: "2026-07-23T00:68:10.000Z" },
  ],
  [-432]: [
    { alias: "이촌 황소 #38", content: "22B tokens/wk은 큰 숫자.", created_at: "2026-07-23T00:75:02.000Z" },
    { alias: "성수 팔콘 #39", content: "F500 90% 침투 완료 신호.", created_at: "2026-07-23T00:75:04.000Z" },
    { alias: "한남 여우 #40", content: "GCP 수혜 파이프라인 실측.", created_at: "2026-07-23T00:75:06.000Z" },
  ],
  [-433]: [
    { alias: "송파 독수리 #41", content: "CAPEX 3배 급증 부담이 언제 반영될지.", created_at: "2026-07-23T00:82:02.000Z" },
    { alias: "분당 사자 #42", content: "매출 성장이 흡수하고 있는 국면.", created_at: "2026-07-23T00:82:04.000Z" },
    { alias: "목동 올빼미 #43", content: "하이퍼스케일러 집중 심화.", created_at: "2026-07-23T00:82:06.000Z" },
  ],
  [-434]: [
    { alias: "신촌 표범 #44", content: "$9.8B는 인상적.", created_at: "2026-07-23T00:89:02.000Z" },
    { alias: "여의도 매 #45", content: "META/AMZN에서도 유사 이벤트 나올 듯.", created_at: "2026-07-23T00:89:04.000Z" },
    { alias: "강남 늑대 #46", content: "회계 처리 방식 확인 필요.", created_at: "2026-07-23T00:89:06.000Z" },
    { alias: "서초 황소 #47", content: "SPCX 상장 후 첫 정식 마킹.", created_at: "2026-07-23T00:89:08.000Z" },
  ],
  [-435]: [
    { alias: "을지로 여우 #48", content: "3축 확장 스토리 진짜 큼.", created_at: "2026-07-23T00:96:02.000Z" },
    { alias: "광화문 팔콘 #49", content: "Fink 프레임과 결합.", created_at: "2026-07-23T00:96:04.000Z" },
    { alias: "마포 독수리 #50", content: "실 계약 확정까지 관망.", created_at: "2026-07-23T00:96:06.000Z" },
  ],
  [-436]: [
    { alias: "판교 사자 #51", content: "젠슨 발언은 항상 NVDA 이해와 연결.", created_at: "2026-07-23T00:103:02.000Z" },
    { alias: "잠실 올빼미 #52", content: "H20 승인 여부가 다음 촉매.", created_at: "2026-07-23T00:103:04.000Z" },
    { alias: "역삼 표범 #53", content: "CUDA 잠금 확장 프레임.", created_at: "2026-07-23T00:103:06.000Z" },
    { alias: "청담 콘도르 #54", content: "미국 정책 반응 관찰.", created_at: "2026-07-23T00:103:08.000Z" },
  ],
  [-437]: [
    { alias: "압구정 수리부엉이 #55", content: "지수 리더십 집중은 진짜 부담.", created_at: "2026-07-23T00:110:02.000Z" },
    { alias: "삼성동 매 #56", content: "GOOGL 실행력은 반대 근거.", created_at: "2026-07-23T00:110:04.000Z" },
    { alias: "논현 늑대 #57", content: "리스크예산 재점검 필수.", created_at: "2026-07-23T00:110:06.000Z" },
  ],

  // ── 2026-07-22 신규 ──────────────────────────────────────────────────────
  [-406]: [
    { alias: "송파 독수리 #01", content: "Robotaxi 가이던스 후퇴 정리가 진짜 관건.", created_at: "2026-07-22T00:05:02.000Z" },
    { alias: "분당 사자 #02", content: "리테일 질문 세팅 흥미로움.", created_at: "2026-07-22T00:05:04.000Z" },
    { alias: "목동 올빼미 #03", content: "지난 48시간 답 이상의 신호 필요.", created_at: "2026-07-22T00:05:06.000Z" },
    { alias: "신촌 표범 #04", content: "Optimus Gen 3 ramp 코멘트 궁금.", created_at: "2026-07-22T00:05:08.000Z" },
    { alias: "여의도 매 #05", content: "2027 external sales 타임라인 필수.", created_at: "2026-07-22T00:05:10.000Z" },
  ],
  [-407]: [
    { alias: "강남 늑대 #06", content: "5개 도시 live 실행 신뢰 상승.", created_at: "2026-07-22T00:12:02.000Z" },
    { alias: "서초 황소 #07", content: "unsupervised vs supervised 병행 이해됨.", created_at: "2026-07-22T00:12:04.000Z" },
    { alias: "을지로 여우 #08", content: "안전 지표 후속 데이터 필수.", created_at: "2026-07-22T00:12:06.000Z" },
    { alias: "광화문 팔콘 #09", content: "Phoenix·Vegas만 남은 상황.", created_at: "2026-07-22T00:12:08.000Z" },
  ],
  [-408]: [
    { alias: "마포 독수리 #10", content: "TX 밖 첫 unsupervised라 상징적.", created_at: "2026-07-22T00:19:02.000Z" },
    { alias: "판교 사자 #11", content: "18일 확장 속도 진짜 빠름.", created_at: "2026-07-22T00:19:04.000Z" },
    { alias: "잠실 올빼미 #12", content: "규제 반응이 벤치마크 형성.", created_at: "2026-07-22T00:19:06.000Z" },
  ],
  [-409]: [
    { alias: "역삼 표범 #13", content: "More Grok 통화까지 되는 게 크다.", created_at: "2026-07-22T00:26:02.000Z" },
    { alias: "청담 콘도르 #14", content: "Automatic Nav 루틴 학습 UX 크다.", created_at: "2026-07-22T00:26:04.000Z" },
    { alias: "압구정 수리부엉이 #15", content: "Streak 소셜화는 심리 방어선.", created_at: "2026-07-22T00:26:06.000Z" },
    { alias: "삼성동 매 #16", content: "Rear Display Lock은 부모 기능.", created_at: "2026-07-22T00:26:08.000Z" },
  ],
  [-410]: [
    { alias: "논현 늑대 #17", content: "10월 8~9일이 진짜 하이라이트.", created_at: "2026-07-22T00:33:02.000Z" },
    { alias: "이촌 황소 #18", content: "qualified majority 통과 조건 명확.", created_at: "2026-07-22T00:33:04.000Z" },
    { alias: "성수 팔콘 #19", content: "네덜란드 인가청 절차 최종 게이트.", created_at: "2026-07-22T00:33:06.000Z" },
  ],
  [-411]: [
    { alias: "한남 여우 #20", content: "재확인은 어닝 앞 애널리스트 앵커.", created_at: "2026-07-22T00:40:02.000Z" },
    { alias: "송파 독수리 #21", content: "$510 목표가 유지 자체가 신호.", created_at: "2026-07-22T00:40:04.000Z" },
    { alias: "분당 사자 #22", content: "상용화 시점 확정 여부가 핵심.", created_at: "2026-07-22T00:40:06.000Z" },
  ],
  [-412]: [
    { alias: "목동 올빼미 #23", content: "인도 시장 진출 상징적.", created_at: "2026-07-22T00:47:02.000Z" },
    { alias: "신촌 표범 #24", content: "언어 대응이 초기 채택률 결정.", created_at: "2026-07-22T00:47:04.000Z" },
    { alias: "여의도 매 #25", content: "구독 유입 축 확장 각도.", created_at: "2026-07-22T00:47:06.000Z" },
  ],
  [-413]: [
    { alias: "강남 늑대 #26", content: "Full production 진입 촉매급.", created_at: "2026-07-22T00:54:02.000Z" },
    { alias: "서초 황소 #27", content: "AMD Turin 비교 무게감.", created_at: "2026-07-22T00:54:04.000Z" },
    { alias: "을지로 여우 #28", content: "고객 테스트 중 큰 언급.", created_at: "2026-07-22T00:54:06.000Z" },
    { alias: "광화문 팔콘 #29", content: "CoWoS·HBM 파급 크다.", created_at: "2026-07-22T00:54:08.000Z" },
  ],
  [-414]: [
    { alias: "마포 독수리 #30", content: "인프라 파트너 지분 축적 전략.", created_at: "2026-07-22T00:61:02.000Z" },
    { alias: "판교 사자 #31", content: "NBIS 재평가 필요.", created_at: "2026-07-22T00:61:04.000Z" },
    { alias: "잠실 올빼미 #32", content: "채택 파이프라인 이원화 확보.", created_at: "2026-07-22T00:61:06.000Z" },
  ],
  [-415]: [
    { alias: "역삼 표범 #33", content: "1.4TB/인스턴스는 큰 숫자.", created_at: "2026-07-22T00:68:02.000Z" },
    { alias: "청담 콘도르 #34", content: "HBM 3사 다 수혜.", created_at: "2026-07-22T00:68:04.000Z" },
    { alias: "압구정 수리부엉이 #35", content: "BofA 인정 무게감.", created_at: "2026-07-22T00:68:06.000Z" },
    { alias: "삼성동 매 #36", content: "MSFT × Kimi K2 세트로 이중 서사.", created_at: "2026-07-22T00:68:08.000Z" },
  ],
  [-416]: [
    { alias: "논현 늑대 #37", content: "\"컴퓨트 팔아 day-1 마진\" 프레임 좋음.", created_at: "2026-07-22T00:75:02.000Z" },
    { alias: "이촌 황소 #38", content: "모델 R&D 부담 없는 위치 매력.", created_at: "2026-07-22T00:75:04.000Z" },
    { alias: "성수 팔콘 #39", content: "Azure 성장률 유지가 관건.", created_at: "2026-07-22T00:75:06.000Z" },
  ],
  [-417]: [
    { alias: "한남 여우 #40", content: "AI CAPEX outlook 진짜 관건.", created_at: "2026-07-22T00:82:02.000Z" },
    { alias: "송파 독수리 #41", content: "Cloud 성장률 프리미엄 정당화.", created_at: "2026-07-22T00:82:04.000Z" },
    { alias: "분당 사자 #42", content: "YouTube 광고도 지속성 봐야.", created_at: "2026-07-22T00:82:06.000Z" },
    { alias: "목동 올빼미 #43", content: "MSFT 프레임이랑 병렬 비교 재밌음.", created_at: "2026-07-22T00:82:08.000Z" },
  ],
  [-418]: [
    { alias: "신촌 표범 #44", content: "컴퓨트 선물시장 게임 체인저.", created_at: "2026-07-22T00:89:02.000Z" },
    { alias: "여의도 매 #45", content: "규제·거래소 승인 오래 걸릴 듯.", created_at: "2026-07-22T00:89:04.000Z" },
    { alias: "강남 늑대 #46", content: "BLK 인프라 펀드 확대 배경.", created_at: "2026-07-22T00:89:06.000Z" },
  ],
  [-419]: [
    { alias: "서초 황소 #47", content: "아시아 유동성 유입 카운터 효과.", created_at: "2026-07-22T00:96:02.000Z" },
    { alias: "을지로 여우 #48", content: "DR 프리미엄/discount 초기 관찰.", created_at: "2026-07-22T00:96:04.000Z" },
    { alias: "광화문 팔콘 #49", content: "타 아시아 국가 확산 여부.", created_at: "2026-07-22T00:96:06.000Z" },
  ],
  [-420]: [
    { alias: "마포 독수리 #50", content: "하루만에 흐름 반전이라니.", created_at: "2026-07-22T00:103:02.000Z" },
    { alias: "판교 사자 #51", content: "이벤트 앞 관망 심리 자연스러움.", created_at: "2026-07-22T00:103:04.000Z" },
    { alias: "잠실 올빼미 #52", content: "실적/Flight 13이 진짜 방향 결정.", created_at: "2026-07-22T00:103:06.000Z" },
    { alias: "역삼 표범 #53", content: "SGX DR 상장 효과 관찰 필요.", created_at: "2026-07-22T00:103:08.000Z" },
  ],
  [-421]: [
    { alias: "청담 콘도르 #54", content: "$1.5T ATH 진짜 부담.", created_at: "2026-07-22T00:110:02.000Z" },
    { alias: "압구정 수리부엉이 #55", content: "레버리지 강제청산 리스크.", created_at: "2026-07-22T00:110:04.000Z" },
    { alias: "삼성동 매 #56", content: "리스크예산 재점검 필수.", created_at: "2026-07-22T00:110:06.000Z" },
  ],

  // ── 2026-07-21 신규 ──────────────────────────────────────────────────────
  [-389]: [
    { alias: "송파 독수리 #01", content: "distillation 접근이 진짜 스마트.", created_at: "2026-07-21T00:05:02.000Z" },
    { alias: "분당 사자 #02", content: "구독 매출 회수는 진짜 큰 카드.", created_at: "2026-07-21T00:05:04.000Z" },
    { alias: "목동 올빼미 #03", content: "supervised 유지는 여전한 조건.", created_at: "2026-07-21T00:05:06.000Z" },
    { alias: "신촌 표범 #04", content: "Ashok VP 소스라 신뢰도 최고.", created_at: "2026-07-21T00:05:08.000Z" },
  ],
  [-390]: [
    { alias: "여의도 매 #05", content: "중국 opinion leader 인정은 상징적.", created_at: "2026-07-21T00:12:02.000Z" },
    { alias: "강남 늑대 #06", content: "Apple Intelligence 유형 리레이팅 각도.", created_at: "2026-07-21T00:12:04.000Z" },
    { alias: "서초 황소 #07", content: "규제 흐름 병행 관찰 동의.", created_at: "2026-07-21T00:12:06.000Z" },
    { alias: "을지로 여우 #08", content: "LA 실도로 테스트라 검증 확실.", created_at: "2026-07-21T00:12:08.000Z" },
    { alias: "광화문 팔콘 #09", content: "매출 옵션 확장 프레임 좋음.", created_at: "2026-07-21T00:12:10.000Z" },
  ],
  [-391]: [
    { alias: "마포 독수리 #10", content: "개인 후기지만 UX 완성도 신호.", created_at: "2026-07-21T00:19:02.000Z" },
    { alias: "판교 사자 #11", content: "정량 안전은 별도 검증 필수.", created_at: "2026-07-21T00:19:04.000Z" },
    { alias: "잠실 올빼미 #12", content: "Streak 트래킹은 심리적 방어선.", created_at: "2026-07-21T00:19:06.000Z" },
  ],
  [-392]: [
    { alias: "역삼 표범 #13", content: "오프라인 마케팅 진짜 첫 확장.", created_at: "2026-07-21T00:26:02.000Z" },
    { alias: "청담 콘도르 #14", content: "\"커피값\" 프레임 강력.", created_at: "2026-07-21T00:26:04.000Z" },
    { alias: "압구정 수리부엉이 #15", content: "구독 전환율 데이터 봐야 함.", created_at: "2026-07-21T00:26:06.000Z" },
  ],
  [-393]: [
    { alias: "삼성동 매 #16", content: "프레임 통합은 후설치와 완전 다르지.", created_at: "2026-07-21T00:33:02.000Z" },
    { alias: "논현 늑대 #17", content: "Musk-verse 실물 결합 첫 증거.", created_at: "2026-07-21T00:33:04.000Z" },
    { alias: "이촌 황소 #18", content: "V2X·원격명령 안정성 확보.", created_at: "2026-07-21T00:33:06.000Z" },
    { alias: "성수 팔콘 #19", content: "상용 로보택시 필수 조건.", created_at: "2026-07-21T00:33:08.000Z" },
  ],
  [-394]: [
    { alias: "한남 여우 #20", content: "두번째 lot = 확장 실측 증거.", created_at: "2026-07-21T00:40:02.000Z" },
    { alias: "송파 독수리 #21", content: "이원 플릿 시나리오 흥미.", created_at: "2026-07-21T00:40:04.000Z" },
    { alias: "분당 사자 #22", content: "안전 심사 흐름이 관건.", created_at: "2026-07-21T00:40:06.000Z" },
  ],
  [-395]: [
    { alias: "목동 올빼미 #23", content: "8→18 GWh 재상향 대단함.", created_at: "2026-07-21T00:47:02.000Z" },
    { alias: "신촌 표범 #24", content: "$1.4B 셀 투자 무게감.", created_at: "2026-07-21T00:47:04.000Z" },
    { alias: "여의도 매 #25", content: "5,000 일자리 EU 정치도 우호적.", created_at: "2026-07-21T00:47:06.000Z" },
    { alias: "강남 늑대 #26", content: "Q3 사상 최고 예상 인상적.", created_at: "2026-07-21T00:47:08.000Z" },
    { alias: "서초 황소 #27", content: "실 리포트 인용이라 신뢰 높음.", created_at: "2026-07-21T00:47:10.000Z" },
  ],
  [-396]: [
    { alias: "을지로 여우 #28", content: "저가 EV 공백 진짜 큼.", created_at: "2026-07-21T00:54:02.000Z" },
    { alias: "광화문 팔콘 #29", content: "€10k 갭은 결정적.", created_at: "2026-07-21T00:54:04.000Z" },
    { alias: "마포 독수리 #30", content: "월별 등록 데이터 봐야지.", created_at: "2026-07-21T00:54:06.000Z" },
  ],
  [-397]: [
    { alias: "판교 사자 #31", content: "€3B 계약 규모 상당.", created_at: "2026-07-21T01:01:02.000Z" },
    { alias: "잠실 올빼미 #32", content: "제조 통합이 리트로핏보다 나음.", created_at: "2026-07-21T01:01:04.000Z" },
    { alias: "역삼 표범 #33", content: "다른 국가 확산 여부 트래킹.", created_at: "2026-07-21T01:01:06.000Z" },
  ],
  [-398]: [
    { alias: "청담 콘도르 #34", content: "Dojo가 SPCX면 큰 혼선.", created_at: "2026-07-21T01:08:02.000Z" },
    { alias: "압구정 수리부엉이 #35", content: "$50B는 어쨌든 결정적 규모.", created_at: "2026-07-21T01:08:04.000Z" },
    { alias: "삼성동 매 #36", content: "팩트체크 병기 좋음.", created_at: "2026-07-21T01:08:06.000Z" },
    { alias: "논현 늑대 #37", content: "실 계약 확정 시 재추정.", created_at: "2026-07-21T01:08:08.000Z" },
    { alias: "이촌 황소 #38", content: "Foxconn AI 서버 진입은 큰 그림.", created_at: "2026-07-21T01:08:10.000Z" },
  ],
  [-399]: [
    { alias: "성수 팔콘 #39", content: "8/4는 진짜 이벤트 밀도 최고.", created_at: "2026-07-21T01:15:02.000Z" },
    { alias: "한남 여우 #40", content: "Polymarket 88%는 강한 신호.", created_at: "2026-07-21T01:15:04.000Z" },
    { alias: "송파 독수리 #41", content: "실적/발사 겹침이 스퀴즈 촉매 가능.", created_at: "2026-07-21T01:15:06.000Z" },
    { alias: "분당 사자 #42", content: "관망이 정공법.", created_at: "2026-07-21T01:15:08.000Z" },
  ],
  [-400]: [
    { alias: "목동 올빼미 #43", content: "$320M 유입 놀라움.", created_at: "2026-07-21T01:22:02.000Z" },
    { alias: "신촌 표범 #44", content: "감성 지표는 여전히 강함.", created_at: "2026-07-21T01:22:04.000Z" },
    { alias: "여의도 매 #45", content: "의원 매수 신호 활용.", created_at: "2026-07-21T01:22:06.000Z" },
    { alias: "강남 늑대 #46", content: "실적/발사 결과가 실제 방향 결정.", created_at: "2026-07-21T01:22:08.000Z" },
  ],
  [-405]: [
    { alias: "서초 황소 #60", content: "Optimus는 TSLA 확실 — 재분류 맞음.", created_at: "2026-07-21T01:57:02.000Z" },
    { alias: "을지로 여우 #61", content: "$10K는 확정 촉매 아니지만 프레임 앵커.", created_at: "2026-07-21T01:57:04.000Z" },
    { alias: "광화문 팔콘 #62", content: "티커 오기는 흔한 일.", created_at: "2026-07-21T01:57:06.000Z" },
    { alias: "마포 독수리 #63", content: "Baron 원본 인터뷰 확인 필요.", created_at: "2026-07-21T01:57:08.000Z" },
  ],
  [-401]: [
    { alias: "서초 황소 #47", content: "중국 오픈모델 채택 흐름 크다.", created_at: "2026-07-21T01:29:02.000Z" },
    { alias: "을지로 여우 #48", content: "OpenAI 프리미엄 재평가.", created_at: "2026-07-21T01:29:04.000Z" },
    { alias: "광화문 팔콘 #49", content: "비용 절감 규모 관건.", created_at: "2026-07-21T01:29:06.000Z" },
  ],
  [-402]: [
    { alias: "마포 독수리 #50", content: "AI-RAN은 통신 뒤집는 그림.", created_at: "2026-07-21T01:36:02.000Z" },
    { alias: "판교 사자 #51", content: "탄소 90% 절감 야심적.", created_at: "2026-07-21T01:36:04.000Z" },
    { alias: "잠실 올빼미 #52", content: "통신사 채택 로드맵 봐야지.", created_at: "2026-07-21T01:36:06.000Z" },
  ],
  [-403]: [
    { alias: "역삼 표범 #53", content: "TPU 외 새 라인은 흥미.", created_at: "2026-07-21T01:43:02.000Z" },
    { alias: "청담 콘도르 #54", content: "인퍼런스 원가 재설계 시도.", created_at: "2026-07-21T01:43:04.000Z" },
    { alias: "압구정 수리부엉이 #55", content: "NVDA 의존 감소는 하이퍼스케일러 공통 흐름.", created_at: "2026-07-21T01:43:06.000Z" },
  ],
  [-404]: [
    { alias: "삼성동 매 #56", content: "23배 표면 숫자의 위험 잘 짚음.", created_at: "2026-07-21T01:50:02.000Z" },
    { alias: "논현 늑대 #57", content: "Google 혼자 $150B+ 어마어마.", created_at: "2026-07-21T01:50:04.000Z" },
    { alias: "이촌 황소 #58", content: "하이퍼스케일러 집중은 옵션 축소.", created_at: "2026-07-21T01:50:06.000Z" },
    { alias: "성수 팔콘 #59", content: "중국 국가 자금 실측 어려움 강조.", created_at: "2026-07-21T01:50:08.000Z" },
  ],

  // ── 2026-07-20 신규 ──────────────────────────────────────────────────────
  [-374]: [
    { alias: "한남 여우 #61", content: "3가지 실측 결합은 확실히 무게감.", created_at: "2026-07-20T00:05:02.000Z" },
    { alias: "송파 독수리 #62", content: "인도 데이터가 진짜 확정.", created_at: "2026-07-20T00:05:04.000Z" },
    { alias: "분당 사자 #63", content: "물류/야드 재고 가능성도 감안.", created_at: "2026-07-20T00:05:06.000Z" },
    { alias: "목동 올빼미 #64", content: "SOP 근접 시그널 인정.", created_at: "2026-07-20T00:05:08.000Z" },
    { alias: "신촌 표범 #65", content: "라인업 사진 임팩트 확실.", created_at: "2026-07-20T00:05:10.000Z" },
  ],
  [-375]: [
    { alias: "여의도 매 #66", content: "규제 프리뷰 프레임 좋음.", created_at: "2026-07-20T00:12:02.000Z" },
    { alias: "강남 늑대 #67", content: "심사 결과가 진짜 최종.", created_at: "2026-07-20T00:12:04.000Z" },
    { alias: "서초 황소 #68", content: "옵션 가치 상승 인정.", created_at: "2026-07-20T00:12:06.000Z" },
    { alias: "을지로 여우 #69", content: "무인차 노출은 심리에도 영향.", created_at: "2026-07-20T00:12:08.000Z" },
  ],
  [-376]: [
    { alias: "광화문 팔콘 #70", content: "770대 안정적 곡선.", created_at: "2026-07-20T00:19:02.000Z" },
    { alias: "마포 독수리 #71", content: "대당 매출 프레임 필수.", created_at: "2026-07-20T00:19:04.000Z" },
    { alias: "판교 사자 #72", content: "가동률이 진짜 관건.", created_at: "2026-07-20T00:19:06.000Z" },
  ],
  [-377]: [
    { alias: "잠실 올빼미 #73", content: "98%는 벤치마크 수준.", created_at: "2026-07-20T00:26:02.000Z" },
    { alias: "역삼 표범 #74", content: "인센티브 없이 재현 가능한가.", created_at: "2026-07-20T00:26:04.000Z" },
    { alias: "청담 콘도르 #75", content: "EU 확산 앵커 역할.", created_at: "2026-07-20T00:26:06.000Z" },
    { alias: "압구정 수리부엉이 #76", content: "Model Y 격차가 압도적.", created_at: "2026-07-20T00:26:08.000Z" },
  ],
  [-378]: [
    { alias: "삼성동 매 #77", content: "위험 균형점 표현 정확.", created_at: "2026-07-20T00:33:02.000Z" },
    { alias: "논현 늑대 #78", content: "스퀴즈 리스크 항상 존재.", created_at: "2026-07-20T00:33:04.000Z" },
    { alias: "이촌 황소 #79", content: "IPO 하회 심리 무거움.", created_at: "2026-07-20T00:33:06.000Z" },
    { alias: "성수 팔콘 #80", content: "관망이 정공법.", created_at: "2026-07-20T00:33:08.000Z" },
    { alias: "한남 여우 #81", content: "머스크 warning 위력은 검증됨.", created_at: "2026-07-20T00:33:10.000Z" },
  ],
  [-379]: [
    { alias: "송파 독수리 #82", content: "UX 차별화는 진짜 카드.", created_at: "2026-07-20T00:40:02.000Z" },
    { alias: "분당 사자 #83", content: "프라이버시 이슈 조심.", created_at: "2026-07-20T00:40:04.000Z" },
    { alias: "목동 올빼미 #84", content: "재구독/이탈 방어 관점 좋음.", created_at: "2026-07-20T00:40:06.000Z" },
    { alias: "신촌 표범 #85", content: "정책/약관 흐름 봐야 함.", created_at: "2026-07-20T00:40:08.000Z" },
  ],
  [-380]: [
    { alias: "여의도 매 #86", content: "Physical AI 프레임 인정.", created_at: "2026-07-20T00:47:02.000Z" },
    { alias: "강남 늑대 #87", content: "실 상용 성과가 진짜.", created_at: "2026-07-20T00:47:04.000Z" },
    { alias: "서초 황소 #88", content: "동일 브레인 서사 무기.", created_at: "2026-07-20T00:47:06.000Z" },
  ],
  [-381]: [
    { alias: "을지로 여우 #89", content: "성능 벤치 진짜 궁금.", created_at: "2026-07-20T00:54:02.000Z" },
    { alias: "광화문 팔콘 #90", content: "가격 압박 계속.", created_at: "2026-07-20T00:54:04.000Z" },
    { alias: "마포 독수리 #91", content: "클라우드 채택 트래킹 필수.", created_at: "2026-07-20T00:54:06.000Z" },
    { alias: "판교 사자 #92", content: "관심 확대 동의.", created_at: "2026-07-20T00:54:08.000Z" },
  ],
  [-382]: [
    { alias: "잠실 올빼미 #93", content: "여지 남았다 표현이 정확.", created_at: "2026-07-20T01:01:02.000Z" },
    { alias: "역삼 표범 #94", content: "채택률·ARPU 진짜 핵심.", created_at: "2026-07-20T01:01:04.000Z" },
    { alias: "청담 콘도르 #95", content: "광고 외 서사 강화 필요.", created_at: "2026-07-20T01:01:06.000Z" },
    { alias: "압구정 수리부엉이 #96", content: "IG Plus $10B는 관건.", created_at: "2026-07-20T01:01:08.000Z" },
  ],
  [-383]: [
    { alias: "삼성동 매 #97", content: "극단 구간 인정.", created_at: "2026-07-20T01:08:02.000Z" },
    { alias: "논현 늑대 #98", content: "다중 압축 리스크 조심.", created_at: "2026-07-20T01:08:04.000Z" },
    { alias: "이촌 황소 #99", content: "구성 변화 감안해도 부담.", created_at: "2026-07-20T01:08:06.000Z" },
    { alias: "성수 팔콘 #01", content: "리스크 관리 강화 동의.", created_at: "2026-07-20T01:08:08.000Z" },
    { alias: "한남 여우 #02", content: "\"Probably Fine\" 뼈있음.", created_at: "2026-07-20T01:08:10.000Z" },
  ],
  [-384]: [
    { alias: "송파 독수리 #03", content: "P/E 20 재돌파 부담.", created_at: "2026-07-20T01:15:02.000Z" },
    { alias: "분당 사자 #04", content: "AI 프리미엄 유지가 관건.", created_at: "2026-07-20T01:15:04.000Z" },
    { alias: "목동 올빼미 #05", content: "실적 시즌 조심.", created_at: "2026-07-20T01:15:06.000Z" },
  ],
  [-385]: [
    { alias: "신촌 표범 #06", content: "Jevons 프레임 실증되면 큼.", created_at: "2026-07-20T01:22:02.000Z" },
    { alias: "여의도 매 #07", content: "CUDA 잠금이 진짜 방어선.", created_at: "2026-07-20T01:22:04.000Z" },
    { alias: "강남 늑대 #08", content: "CAPEX 흐름 확인 필수.", created_at: "2026-07-20T01:22:06.000Z" },
    { alias: "서초 황소 #09", content: "데이터센터 발주 지표 트래킹.", created_at: "2026-07-20T01:22:08.000Z" },
  ],
  [-386]: [
    { alias: "을지로 여우 #10", content: "이례적 톤은 무게감 있음.", created_at: "2026-07-20T01:29:02.000Z" },
    { alias: "광화문 팔콘 #11", content: "13F 확인 필수.", created_at: "2026-07-20T01:29:04.000Z" },
    { alias: "마포 독수리 #12", content: "GOOGL 재평가 계속.", created_at: "2026-07-20T01:29:06.000Z" },
  ],
  [-387]: [
    { alias: "판교 사자 #13", content: "시나리오 노트 근거로 활용.", created_at: "2026-07-20T01:36:02.000Z" },
    { alias: "잠실 올빼미 #14", content: "여름 조정 가능성 대비.", created_at: "2026-07-20T01:36:04.000Z" },
    { alias: "역삼 표범 #15", content: "리스크예산 재점검 좋은 시점.", created_at: "2026-07-20T01:36:06.000Z" },
  ],
  [-388]: [
    { alias: "청담 콘도르 #16", content: "4각 서사 정리 좋음.", created_at: "2026-07-20T01:43:02.000Z" },
    { alias: "압구정 수리부엉이 #17", content: "TSLA 밀집한 날 정확한 진단.", created_at: "2026-07-20T01:43:04.000Z" },
    { alias: "삼성동 매 #18", content: "결합 프레임이 진짜 힘.", created_at: "2026-07-20T01:43:06.000Z" },
    { alias: "논현 늑대 #19", content: "매수 유지 결론 동의.", created_at: "2026-07-20T01:43:08.000Z" },
    { alias: "이촌 황소 #20", content: "양산·플릿·EU 확산 트래킹.", created_at: "2026-07-20T01:43:10.000Z" },
  ],

  // ── 2026-07-18 신규 ──────────────────────────────────────────────────────
  [-358]: [
    { alias: "송파 독수리 #01", content: "40일 만에 +1B는 확실히 곡선이 가팔라졌음.", created_at: "2026-07-18T00:05:02.000Z" },
    { alias: "분당 사자 #02", content: "무감독 근거로 무리하게 쓰진 말자.", created_at: "2026-07-18T00:05:04.000Z" },
    { alias: "목동 올빼미 #03", content: "안전 페이지 개입률이 같이 나와야 함.", created_at: "2026-07-18T00:05:06.000Z" },
    { alias: "신촌 표범 #04", content: "데이터 곡선은 진짜 무섭다.", created_at: "2026-07-18T00:05:08.000Z" },
  ],
  [-359]: [
    { alias: "여의도 매 #05", content: "네오클라우드 진입 프레임 리레이팅 큼.", created_at: "2026-07-18T00:12:02.000Z" },
    { alias: "강남 늑대 #06", content: "FCF 압박은 시장이 어떻게 받나가 관건.", created_at: "2026-07-18T00:12:04.000Z" },
    { alias: "서초 황소 #07", content: "매출 다각화는 장기 알파 동의.", created_at: "2026-07-18T00:12:06.000Z" },
    { alias: "을지로 여우 #08", content: "Anthropic이 얼마나 급했으면.", created_at: "2026-07-18T00:12:08.000Z" },
    { alias: "광화문 팔콘 #09", content: "NYT 소스라 신뢰 높음.", created_at: "2026-07-18T00:12:10.000Z" },
  ],
  [-360]: [
    { alias: "마포 독수리 #10", content: "DC 준공 로드맵이 다음 체크 포인트 공감.", created_at: "2026-07-18T00:19:02.000Z" },
    { alias: "판교 사자 #11", content: "실행력 확보는 진짜 큰 자산.", created_at: "2026-07-18T00:19:04.000Z" },
    { alias: "잠실 올빼미 #12", content: "AWS DNA 이식은 크다.", created_at: "2026-07-18T00:19:06.000Z" },
  ],
  [-361]: [
    { alias: "역삼 표범 #13", content: "리레이팅 축 정확한 진단.", created_at: "2026-07-18T00:26:02.000Z" },
    { alias: "청담 콘도르 #14", content: "마감 기준 확인 필요 동의.", created_at: "2026-07-18T00:26:04.000Z" },
    { alias: "압구정 수리부엉이 #15", content: "기관 자금 흐름이 진짜 관건.", created_at: "2026-07-18T00:26:06.000Z" },
    { alias: "삼성동 매 #16", content: "$5T 다음 스토리가 궁금.", created_at: "2026-07-18T00:26:08.000Z" },
    { alias: "논현 늑대 #17", content: "NVDA랑 왔다갔다 하는 게 흥미로움.", created_at: "2026-07-18T00:26:10.000Z" },
  ],
  [-362]: [
    { alias: "이촌 황소 #18", content: "sovereign AI 방위 확장은 큰 스토리.", created_at: "2026-07-18T00:33:02.000Z" },
    { alias: "성수 팔콘 #19", content: "WSJ 소스면 신뢰 붙긴 함.", created_at: "2026-07-18T00:33:04.000Z" },
    { alias: "한남 여우 #20", content: "규모/SLA 확정까지 관망.", created_at: "2026-07-18T00:33:06.000Z" },
    { alias: "송파 독수리 #21", content: "밸류에이션 논거 자체가 바뀔 수 있음.", created_at: "2026-07-18T00:33:08.000Z" },
  ],
  [-363]: [
    { alias: "분당 사자 #22", content: "Artemis 재프레이밍 인정.", created_at: "2026-07-18T00:40:02.000Z" },
    { alias: "목동 올빼미 #23", content: "재사용 경제성 우위 확실.", created_at: "2026-07-18T00:40:04.000Z" },
    { alias: "신촌 표범 #24", content: "계약 규모 확인 필요.", created_at: "2026-07-18T00:40:06.000Z" },
  ],
  [-364]: [
    { alias: "여의도 매 #25", content: "1MW 급 랙이라니 냉각 부담 큼.", created_at: "2026-07-18T00:47:02.000Z" },
    { alias: "강남 늑대 #26", content: "전력 밸류체인 미리 봐야 함.", created_at: "2026-07-18T00:47:04.000Z" },
    { alias: "서초 황소 #27", content: "위성 컴퓨트 비교 프레임 흥미.", created_at: "2026-07-18T00:47:06.000Z" },
    { alias: "을지로 여우 #28", content: "밸류체인 확장 논의가 필요.", created_at: "2026-07-18T00:47:08.000Z" },
  ],
  [-365]: [
    { alias: "광화문 팔콘 #29", content: "채용은 실행의 흔적 공감.", created_at: "2026-07-18T00:54:02.000Z" },
    { alias: "마포 독수리 #30", content: "sample-line SOP 언제인지 관건.", created_at: "2026-07-18T00:54:04.000Z" },
    { alias: "판교 사자 #31", content: "양산 실체가 처음 잡혔다는 게 큰 의미.", created_at: "2026-07-18T00:54:06.000Z" },
    { alias: "잠실 올빼미 #32", content: "소량·장기 프레임 적절.", created_at: "2026-07-18T00:54:08.000Z" },
    { alias: "역삼 표범 #33", content: "몰드 셋업까지 왔으면 임계 근접.", created_at: "2026-07-18T00:54:10.000Z" },
  ],
  [-366]: [
    { alias: "청담 콘도르 #34", content: "표결이 진짜 마지막 관문.", created_at: "2026-07-18T01:01:02.000Z" },
    { alias: "압구정 수리부엉이 #35", content: "옵션 가치 상승 인정.", created_at: "2026-07-18T01:01:04.000Z" },
    { alias: "삼성동 매 #36", content: "KBA 통과가 첫 관건.", created_at: "2026-07-18T01:01:06.000Z" },
  ],
  [-367]: [
    { alias: "논현 늑대 #37", content: "지역 커버리지 시그널로 읽는 게 맞음.", created_at: "2026-07-18T01:08:02.000Z" },
    { alias: "이촌 황소 #38", content: "충전소 +77%는 인프라 안정.", created_at: "2026-07-18T01:08:04.000Z" },
    { alias: "성수 팔콘 #39", content: "EV 정책 우호국 확대 흐름.", created_at: "2026-07-18T01:08:06.000Z" },
  ],
  [-368]: [
    { alias: "한남 여우 #40", content: "변곡점 시그널 맞다고 봄.", created_at: "2026-07-18T01:15:02.000Z" },
    { alias: "송파 독수리 #41", content: "리프레시 Y 반응 진짜 좋음.", created_at: "2026-07-18T01:15:04.000Z" },
    { alias: "분당 사자 #42", content: "컨센서스 상향 트리거 인정.", created_at: "2026-07-18T01:15:06.000Z" },
    { alias: "목동 올빼미 #43", content: "미국·중국 데이터가 확인 축.", created_at: "2026-07-18T01:15:08.000Z" },
  ],
  [-369]: [
    { alias: "신촌 표범 #44", content: "가이던스가 진짜 결정 요소.", created_at: "2026-07-18T01:22:02.000Z" },
    { alias: "여의도 매 #45", content: "buyback 규모는 확실히 크다.", created_at: "2026-07-18T01:22:04.000Z" },
    { alias: "강남 늑대 #46", content: "광고 매출 성장률 봐야 함.", created_at: "2026-07-18T01:22:06.000Z" },
    { alias: "서초 황소 #47", content: "게임즈도 트래커.", created_at: "2026-07-18T01:22:08.000Z" },
  ],
  [-370]: [
    { alias: "을지로 여우 #48", content: "괴리 커진다는 진단 맞음.", created_at: "2026-07-18T01:29:02.000Z" },
    { alias: "광화문 팔콘 #49", content: "리스크예산 재설정 필수.", created_at: "2026-07-18T01:29:04.000Z" },
    { alias: "마포 독수리 #50", content: "AMD·NVDA 실적이 카드.", created_at: "2026-07-18T01:29:06.000Z" },
  ],
  [-371]: [
    { alias: "판교 사자 #51", content: "애널 코멘트 vs 가이던스 구분 좋음.", created_at: "2026-07-18T01:36:02.000Z" },
    { alias: "잠실 올빼미 #52", content: "Azure 성장률만 잡히면 됨.", created_at: "2026-07-18T01:36:04.000Z" },
    { alias: "역삼 표범 #53", content: "OAI 지분 재평가도 감안.", created_at: "2026-07-18T01:36:06.000Z" },
  ],
  [-372]: [
    { alias: "청담 콘도르 #54", content: "결과론적 스토리텔링 경계 동의.", created_at: "2026-07-18T01:43:02.000Z" },
    { alias: "압구정 수리부엉이 #55", content: "시간축 프레임은 편하긴 하지.", created_at: "2026-07-18T01:43:04.000Z" },
    { alias: "삼성동 매 #56", content: "지분희석·거버넌스 정량 필요.", created_at: "2026-07-18T01:43:06.000Z" },
    { alias: "논현 늑대 #57", content: "중립이 정직한 결론.", created_at: "2026-07-18T01:43:08.000Z" },
  ],
  [-373]: [
    { alias: "이촌 황소 #58", content: "MOU 단계는 항상 조심.", created_at: "2026-07-18T01:50:02.000Z" },
    { alias: "성수 팔콘 #59", content: "지정학 결합이 흥미로움.", created_at: "2026-07-18T01:50:04.000Z" },
    { alias: "한남 여우 #60", content: "실 계약·생산량이 진짜 확정 요건.", created_at: "2026-07-18T01:50:06.000Z" },
  ],

  // ── 2026-07-17 신규 ──────────────────────────────────────────────────────
  [-343]: [
    { alias: "여의도 매 #10", content: "+58 한 번에 들어온 게 인상적.", created_at: "2026-07-17T00:05:02.000Z" },
    { alias: "강남 늑대 #11", content: "Waymo 격차는 인정.", created_at: "2026-07-17T00:05:04.000Z" },
    { alias: "서초 황소 #12", content: "가동률 데이터가 다음 열쇠.", created_at: "2026-07-17T00:05:06.000Z" },
  ],
  [-344]: [
    { alias: "을지로 여우 #13", content: "빈도 자체가 리스크라는 말에 동의.", created_at: "2026-07-17T00:12:02.000Z" },
    { alias: "광화문 팔콘 #14", content: "레버리지 접은 판단 괜찮아 보임.", created_at: "2026-07-17T00:12:04.000Z" },
    { alias: "마포 독수리 #15", content: "헤지 비중 다시 봄.", created_at: "2026-07-17T00:12:06.000Z" },
    { alias: "판교 사자 #16", content: "방향보다 변동성 관리.", created_at: "2026-07-17T00:12:08.000Z" },
  ],
  [-345]: [
    { alias: "잠실 올빼미 #17", content: "마일스톤은 좋은데 개입률이 궁금.", created_at: "2026-07-17T00:19:02.000Z" },
    { alias: "역삼 표범 #18", content: "안전 페이지 숫자 추적하자.", created_at: "2026-07-17T00:19:04.000Z" },
    { alias: "청담 콘도르 #19", content: "과대해석 경계 동의.", created_at: "2026-07-17T00:19:06.000Z" },
  ],
  [-346]: [
    { alias: "압구정 수리부엉이 #20", content: "예측시장  Prob 흔들리지 말자.", created_at: "2026-07-17T00:26:02.000Z" },
    { alias: "삼성동 매 #21", content: "공식 나오기 전엔 파일만.", created_at: "2026-07-17T00:26:04.000Z" },
    { alias: "논현 늑대 #22", content: "69% 보고 추격하는 건 위험.", created_at: "2026-07-17T00:26:06.000Z" },
  ],
  [-347]: [
    { alias: "이촌 황소 #23", content: "국가 발주 스케일 압도적.", created_at: "2026-07-17T00:33:02.000Z" },
    { alias: "성수 팔콘 #24", content: "출하 일정 대기.", created_at: "2026-07-17T00:33:04.000Z" },
    { alias: "한남 여우 #25", content: "140MW도 핵심 숫자.", created_at: "2026-07-17T00:33:06.000Z" },
    { alias: "송파 독수리 #26", content: "파이프라인으로 보는 게 맞음.", created_at: "2026-07-17T00:33:08.000Z" },
  ],
  [-348]: [
    { alias: "분당 사자 #27", content: "마진 퀄리티가 진짜 좋음.", created_at: "2026-07-17T00:40:02.000Z" },
    { alias: "목동 올빼미 #28", content: "추격보다 눌림 대기 공감.", created_at: "2026-07-17T00:40:04.000Z" },
    { alias: "신촌 표범 #29", content: "가이던스 +40%는 강하다.", created_at: "2026-07-17T00:40:06.000Z" },
  ],
  [-349]: [
    { alias: "여의도 매 #30", content: "$265B는 감가비가 먼저 보임.", created_at: "2026-07-17T00:47:02.000Z" },
    { alias: "강남 늑대 #31", content: "온쇼어링 스토리는 장기.", created_at: "2026-07-17T00:47:04.000Z" },
    { alias: "서초 황소 #32", content: "단기 환산 금지 동의.", created_at: "2026-07-17T00:47:06.000Z" },
  ],
  [-350]: [
    { alias: "을지로 여우 #33", content: "투어≠인도 정확히 지적.", created_at: "2026-07-17T00:54:02.000Z" },
    { alias: "광화문 팔콘 #34", content: "상용 존재감은 플러스.", created_at: "2026-07-17T00:54:04.000Z" },
    { alias: "마포 독수리 #35", content: "일정만 체크.", created_at: "2026-07-17T00:54:06.000Z" },
  ],
  [-351]: [
    { alias: "판교 사자 #36", content: "장기 낙관과 차트 분리 좋음.", created_at: "2026-07-17T01:01:02.000Z" },
    { alias: "잠실 올빼미 #37", content: "CAPEX 가이던스가 우선.", created_at: "2026-07-17T01:01:04.000Z" },
    { alias: "역삼 표범 #38", content: "추적관망 동의.", created_at: "2026-07-17T01:01:06.000Z" },
    { alias: "청담 콘도르 #39", content: "젠슨 톤은 늘 강하지.", created_at: "2026-07-17T01:01:08.000Z" },
    { alias: "압구정 수리부엉이 #40", content: "SOX랑 같이 봐야 함.", created_at: "2026-07-17T01:01:10.000Z" },
  ],
  [-352]: [
    { alias: "삼성동 매 #41", content: "-16%면 아프긴 하다.", created_at: "2026-07-17T01:08:02.000Z" },
    { alias: "논현 늑대 #42", content: "다음 고점이 관건.", created_at: "2026-07-17T01:08:04.000Z" },
    { alias: "이촌 황소 #43", content: "분할이 맞아 보임.", created_at: "2026-07-17T01:08:06.000Z" },
    { alias: "성수 팔콘 #44", content: "리스크예산 재설정 중.", created_at: "2026-07-17T01:08:08.000Z" },
  ],
  [-353]: [
    { alias: "한남 여우 #45", content: "스펙 비교 프레임이 흥미로움.", created_at: "2026-07-17T01:15:02.000Z" },
    { alias: "송파 독수리 #46", content: "단위경제는 아직.", created_at: "2026-07-17T01:15:04.000Z" },
    { alias: "분당 사자 #47", content: "사이즈 작게 동의.", created_at: "2026-07-17T01:15:06.000Z" },
  ],
  [-354]: [
    { alias: "목동 올빼미 #48", content: "승인≠출시 포인트 정확.", created_at: "2026-07-17T01:22:02.000Z" },
    { alias: "신촌 표범 #49", content: "일정 확인 후 반영.", created_at: "2026-07-17T01:22:04.000Z" },
    { alias: "여의도 매 #50", content: "추격 자제.", created_at: "2026-07-17T01:22:06.000Z" },
  ],
  [-355]: [
    { alias: "강남 늑대 #51", content: "제안 단계 강조 좋음.", created_at: "2026-07-17T01:29:02.000Z" },
    { alias: "서초 황소 #52", content: "규제 변수가 큼.", created_at: "2026-07-17T01:29:04.000Z" },
    { alias: "을지로 여우 #53", content: "관망이 기본.", created_at: "2026-07-17T01:29:06.000Z" },
    { alias: "광화문 팔콘 #54", content: "99 markets 그림은 큼.", created_at: "2026-07-17T01:29:08.000Z" },
  ],
  [-356]: [
    { alias: "마포 독수리 #55", content: "호재와 과열이 공존하는 문장.", created_at: "2026-07-17T01:36:02.000Z" },
    { alias: "판교 사자 #56", content: "AMD 경쟁도 체크.", created_at: "2026-07-17T01:36:04.000Z" },
    { alias: "잠실 올빼미 #57", content: "비중 조절하며 보유 공감.", created_at: "2026-07-17T01:36:06.000Z" },
  ],
  [-357]: [
    { alias: "역삼 표범 #58", content: "엣지·로봇 파이프라인으로 분리 보는 게 맞음.", created_at: "2026-07-17T01:43:02.000Z" },
    { alias: "청담 콘도르 #59", content: "레퍼런스 고객이 강점.", created_at: "2026-07-17T01:43:04.000Z" },
    { alias: "압구정 수리부엉이 #60", content: "램프업 전엔 여유 비중.", created_at: "2026-07-17T01:43:06.000Z" },
  ],
  // ── 2026-07-16 신규 ──────────────────────────────────────────────────────
  [-327]: [
    { alias: "여의도 수리부엉이 #12", content: "3차 배치까지 갔으면 확대 속도 꽤 빠른 편이네.", created_at: "2026-07-16T00:05:02.000Z" },
    { alias: "강남 독수리 #23", content: "Supervised라는 거 다들 잊지 말자, 완전자율 아님.", created_at: "2026-07-16T00:05:04.000Z" },
    { alias: "서초 매 #34", content: "구독 매출 쪽은 확실히 우호적인 흐름 같음.", created_at: "2026-07-16T00:05:06.000Z" }
  ],
  [-328]: [
    { alias: "을지로 황소 #45", content: "10배 스케일업이라니 숫자가 좀 비현실적이긴 한데 방향성은 맞다고 봄.", created_at: "2026-07-16T00:12:02.000Z" },
    { alias: "광화문 표범 #56", content: "착공 확인 전까지는 그냥 목표치로만 봐야지.", created_at: "2026-07-16T00:12:04.000Z" },
    { alias: "마포 콘도르 #67", content: "로보틱스 밸류 붙는 건 좋은데 타임라인이 관건.", created_at: "2026-07-16T00:12:06.000Z" },
    { alias: "판교 사자 #78", content: "장기 매수 관점에서만 접근할 소재.", created_at: "2026-07-16T00:12:08.000Z" }
  ],
  [-329]: [
    { alias: "잠실 호랑이 #89", content: "버핏 발언치고는 꽤 직설적이네.", created_at: "2026-07-16T00:19:02.000Z" },
    { alias: "역삼 팔콘 #01", content: "35년에 2배라는 계산이 새삼 무섭다.", created_at: "2026-07-16T00:19:04.000Z" },
    { alias: "청담 올빼미 #12", content: "도박판 비유는 지금 시장 정서 보면 공감됨.", created_at: "2026-07-16T00:19:06.000Z" },
    { alias: "압구정 여우 #23", content: "현금 실질수익률 다시 계산해봐야겠다.", created_at: "2026-07-16T00:19:08.000Z" },
    { alias: "삼성동 곰 #34", content: "관망 의견에 동의, 지금은 신중할 때.", created_at: "2026-07-16T00:19:10.000Z" }
  ],
  [-330]: [
    { alias: "논현 늑대 #45", content: "-4.5% vs -2.1% 격차 생각보다 크다.", created_at: "2026-07-16T00:26:02.000Z" },
    { alias: "이촌 수리부엉이 #56", content: "Model Y 하나로 35% 점유라는 게 진짜 압도적.", created_at: "2026-07-16T00:26:04.000Z" },
    { alias: "성수 독수리 #67", content: "다음 분기 마진 숫자 나오면 확인해볼게.", created_at: "2026-07-16T00:26:06.000Z" }
  ],
  [-331]: [
    { alias: "한남 매 #78", content: "CEO가 직접 나와서 부인한 거면 신빙성은 있어 보임.", created_at: "2026-07-16T00:33:02.000Z" },
    { alias: "송파 황소 #89", content: "매출인식 시점 얘기는 맞는 말, 실적 나와야 확인됨.", created_at: "2026-07-16T00:33:04.000Z" },
    { alias: "분당 표범 #01", content: "하드웨어 입고량 관련 소스는 좀 더 확인해보고 싶다.", created_at: "2026-07-16T00:33:06.000Z" },
    { alias: "목동 콘도르 #12", content: "추적관망 의견 동의.", created_at: "2026-07-16T00:33:08.000Z" }
  ],
  [-332]: [
    { alias: "신촌 사자 #23", content: "$700만 대 $430만이면 마진 구조 나쁘지 않네.", created_at: "2026-07-16T00:40:02.000Z" },
    { alias: "여의도 호랑이 #34", content: "사이버캡 나오면 진짜 게임체인저 될 수도.", created_at: "2026-07-16T00:40:04.000Z" },
    { alias: "강남 팔콘 #45", content: "가동률 데이터가 관건이지 숫자 자체는 좋아 보임.", created_at: "2026-07-16T00:40:06.000Z" },
    { alias: "서초 올빼미 #56", content: "이 정도면 로보택시 스토리 재평가할 만하다.", created_at: "2026-07-16T00:40:08.000Z" },
    { alias: "을지로 여우 #67", content: "초기 단계라는 거 감안하고 보수적으로 접근.", created_at: "2026-07-16T00:40:10.000Z" }
  ],
  [-333]: [
    { alias: "광화문 곰 #78", content: "가격전쟁 속에서 나온 +68%면 진짜 강한 거지.", created_at: "2026-07-16T00:47:02.000Z" },
    { alias: "마포 늑대 #89", content: "5개월에 7만대 넘은 거 생각보다 임팩트 있네.", created_at: "2026-07-16T00:47:04.000Z" },
    { alias: "판교 수리부엉이 #01", content: "KBB 소식이랑 같이 보니 스토리가 맞아 들어간다.", created_at: "2026-07-16T00:47:06.000Z" }
  ],
  [-334]: [
    { alias: "잠실 독수리 #12", content: "매입 규모는 작은데 상징성으로 화제 되는 듯.", created_at: "2026-07-16T00:54:02.000Z" },
    { alias: "역삼 매 #23", content: "주가 반응 -0.09%면 시장은 별 의미 안 둔 듯.", created_at: "2026-07-16T00:54:04.000Z" },
    { alias: "청담 황소 #34", content: "정책신호로 확대해석하기엔 아직 근거 부족.", created_at: "2026-07-16T00:54:06.000Z" },
    { alias: "압구정 표범 #45", content: "데이터센터 리츠 쪽은 계속 관심권.", created_at: "2026-07-16T00:54:08.000Z" }
  ],
  [-335]: [
    { alias: "삼성동 콘도르 #56", content: "스타트업 접촉설이면 아직 소문 단계 아닌가?", created_at: "2026-07-16T01:01:02.000Z" },
    { alias: "논현 사자 #67", content: "Baltra 지연은 좀 뼈아픈 소식이네.", created_at: "2026-07-16T01:01:04.000Z" },
    { alias: "이촌 호랑이 #78", content: "Nvidia 의존도 얘기는 새로운 건 아니지만 다시 부각됨.", created_at: "2026-07-16T01:01:06.000Z" },
    { alias: "성수 팔콘 #89", content: "M&A 발표되면 그때 다시 평가해도 될 듯.", created_at: "2026-07-16T01:01:08.000Z" },
    { alias: "한남 올빼미 #01", content: "온디바이스 AI 경쟁력 걱정되는 건 사실.", created_at: "2026-07-16T01:01:10.000Z" }
  ],
  [-336]: [
    { alias: "송파 여우 #12", content: "IPO가 밑으로 내려간 거면 초기 투자자들 답답하겠다.", created_at: "2026-07-16T01:08:02.000Z" },
    { alias: "분당 곰 #23", content: "일중 반등폭 보면 변동성은 확실히 크네.", created_at: "2026-07-16T01:08:04.000Z" },
    { alias: "목동 늑대 #34", content: "방향 잡힐 때까지 관망하는 게 맞는 듯.", created_at: "2026-07-16T01:08:06.000Z" }
  ],
  [-337]: [
    { alias: "신촌 수리부엉이 #45", content: "가이던스 상향폭이 진짜 크다, 이 정도면 서프라이즈 맞음.", created_at: "2026-07-16T01:15:02.000Z" },
    { alias: "여의도 독수리 #56", content: "TeraFab 협업 디테일 궁금한데.", created_at: "2026-07-16T01:15:04.000Z" },
    { alias: "강남 매 #67", content: "장비주 전체에 긍정적인 뉴스로 보임.", created_at: "2026-07-16T01:15:06.000Z" },
    { alias: "서초 황소 #78", content: "캐파 확대 30%면 공급망 전체가 수혜.", created_at: "2026-07-16T01:15:08.000Z" }
  ],
  [-338]: [
    { alias: "을지로 표범 #89", content: "3.6%면 진짜 역사적으로 낮은 수준이긴 하다.", created_at: "2026-07-16T01:22:02.000Z" },
    { alias: "광화문 콘도르 #01", content: "역발상 지표라 곧바로 매도신호로 보긴 어렵지.", created_at: "2026-07-16T01:22:04.000Z" },
    { alias: "마포 사자 #12", content: "그래도 헤지 비중은 한 번씩 점검할 필요 있어 보임.", created_at: "2026-07-16T01:22:06.000Z" },
    { alias: "판교 호랑이 #23", content: "밸류에이션 지표들도 같이 봐야 판단 가능할 듯.", created_at: "2026-07-16T01:22:08.000Z" },
    { alias: "잠실 팔콘 #34", content: "주의 단계로 보고 무리한 베팅은 지양.", created_at: "2026-07-16T01:22:10.000Z" }
  ],
  [-339]: [
    { alias: "역삼 올빼미 #45", content: "5천마일 넘게 개입 없었다는 게 인상적이긴 함.", created_at: "2026-07-16T01:29:02.000Z" },
    { alias: "청담 여우 #56", content: "공식 검증 아니라는 점은 감안하고 봐야지.", created_at: "2026-07-16T01:29:04.000Z" },
    { alias: "압구정 곰 #67", content: "확대 요구 목소리 커지는 건 좋은 신호.", created_at: "2026-07-16T01:29:06.000Z" }
  ],
  [-340]: [
    { alias: "삼성동 늑대 #78", content: "99.5%면 만족도가 거의 압도적이네.", created_at: "2026-07-16T01:36:02.000Z" },
    { alias: "논현 수리부엉이 #89", content: "충전 불안 얘기 많았는데 실제론 별로 안 이어지는구나.", created_at: "2026-07-16T01:36:04.000Z" },
    { alias: "이촌 독수리 #01", content: "표본 방법론은 좀 더 알고 싶다.", created_at: "2026-07-16T01:36:06.000Z" },
    { alias: "성수 매 #12", content: "보조지표로 쓰기엔 충분한 숫자 같음.", created_at: "2026-07-16T01:36:08.000Z" }
  ],
  [-341]: [
    { alias: "한남 황소 #23", content: "버핏이 직접 확인했다는 거 자체가 큰 뉴스네.", created_at: "2026-07-16T01:43:02.000Z" },
    { alias: "송파 표범 #34", content: "+34%면 이미 많이 오른 상태라 조심스럽긴 하다.", created_at: "2026-07-16T01:43:04.000Z" },
    { alias: "분당 콘도르 #45", content: "밸류에이션 다시 점검하는 게 맞는 접근.", created_at: "2026-07-16T01:43:06.000Z" },
    { alias: "목동 사자 #56", content: "실적 지속성 나와야 확신할 수 있을 듯.", created_at: "2026-07-16T01:43:08.000Z" },
    { alias: "신촌 호랑이 #67", content: "중립 의견에 공감, 추격매수는 위험할 수도.", created_at: "2026-07-16T01:43:10.000Z" }
  ],
  [-342]: [
    { alias: "여의도 팔콘 #78", content: "중국 승인 났으면 판매 촉매로는 꽤 셀 것 같다.", created_at: "2026-07-16T01:50:02.000Z" },
    { alias: "강남 올빼미 #89", content: "알리바바랑 협업이라니 생각보다 빨리 풀렸네.", created_at: "2026-07-16T01:50:04.000Z" },
    { alias: "서초 여우 #01", content: "출시일정만 나오면 바로 반영될 것 같은데.", created_at: "2026-07-16T01:50:06.000Z" }
  ],
  // ── 2026-07-15 신규 ──────────────────────────────────────────────────────
  [-293]: [
    { alias: "강남 여우 #95", content: "CPI -0.4% 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:06:02.000Z" },
    { alias: "서초 매 #84", content: "SPY 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:06:04.000Z" },
    { alias: "송파 늑대 #73", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:06:06.000Z" }
  ],
  [-294]: [
    { alias: "서초 매 #90", content: "Chamath M&A 시나리오 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:12:09.000Z" },
    { alias: "송파 늑대 #79", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:12:11.000Z" },
    { alias: "마포 사자 #68", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:12:13.000Z" },
    { alias: "한남 호랑이 #57", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:12:15.000Z" }
  ],
  [-295]: [
    { alias: "송파 늑대 #85", content: "Robotaxi 765 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:18:16.000Z" },
    { alias: "마포 사자 #74", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:18:18.000Z" },
    { alias: "한남 호랑이 #63", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:18:20.000Z" },
    { alias: "분당 황소 #52", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:18:22.000Z" },
    { alias: "역삼 독수리 #41", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:18:24.000Z" }
  ],
  [-296]: [
    { alias: "마포 사자 #80", content: "AlixPartners 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:24:23.000Z" },
    { alias: "한남 호랑이 #69", content: "LCID 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:24:25.000Z" },
    { alias: "분당 황소 #58", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:24:27.000Z" }
  ],
  [-297]: [
    { alias: "한남 호랑이 #75", content: "Burry 순환금융 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:30:30.000Z" },
    { alias: "분당 황소 #64", content: "NVDA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:30:32.000Z" },
    { alias: "역삼 독수리 #53", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:30:34.000Z" },
    { alias: "압구정 팔콘 #42", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:30:36.000Z" }
  ],
  [-298]: [
    { alias: "분당 황소 #70", content: "Steel River 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:36:37.000Z" },
    { alias: "역삼 독수리 #59", content: "GOOGL 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:36:39.000Z" },
    { alias: "압구정 팔콘 #48", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:36:41.000Z" },
    { alias: "청담 여우 #37", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:36:43.000Z" },
    { alias: "잠실 매 #26", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:36:45.000Z" }
  ],
  [-299]: [
    { alias: "역삼 독수리 #65", content: "Pelosi tracker CLAIM 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:42:44.000Z" },
    { alias: "압구정 팔콘 #54", content: "NVDA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:42:46.000Z" },
    { alias: "청담 여우 #43", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:42:48.000Z" }
  ],
  [-300]: [
    { alias: "압구정 팔콘 #60", content: "해외 유입 ~$900B 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:48:51.000Z" },
    { alias: "청담 여우 #49", content: "SPY 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:48:53.000Z" },
    { alias: "잠실 매 #38", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:48:55.000Z" },
    { alias: "성수 늑대 #27", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:48:57.000Z" }
  ],
  [-301]: [
    { alias: "청담 여우 #55", content: "Hyperion $30.33M 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:54:02.000Z" },
    { alias: "잠실 매 #44", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:54:04.000Z" },
    { alias: "성수 늑대 #33", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:54:06.000Z" },
    { alias: "판교 사자 #22", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:54:08.000Z" },
    { alias: "광화문 호랑이 #91", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:54:10.000Z" }
  ],
  [-302]: [
    { alias: "잠실 매 #50", content: "Cathie QT bogeyman 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:10:09.000Z" },
    { alias: "성수 늑대 #39", content: "ARKK 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:10:11.000Z" },
    { alias: "판교 사자 #28", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:10:13.000Z" }
  ],
  [-303]: [
    { alias: "성수 늑대 #45", content: "FSD NL obstruction 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:16:16.000Z" },
    { alias: "판교 사자 #34", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:16:18.000Z" },
    { alias: "광화문 호랑이 #23", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:16:20.000Z" },
    { alias: "종로 황소 #92", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:16:22.000Z" }
  ],
  [-304]: [
    { alias: "판교 사자 #40", content: "iPhone AI shrink 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:22:23.000Z" },
    { alias: "광화문 호랑이 #29", content: "AAPL 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:22:25.000Z" },
    { alias: "종로 황소 #18", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:22:27.000Z" },
    { alias: "홍대 독수리 #87", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:22:29.000Z" },
    { alias: "여의도 팔콘 #76", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:22:31.000Z" }
  ],
  [-305]: [
    { alias: "광화문 호랑이 #35", content: "Cybercab Miami 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:28:30.000Z" },
    { alias: "종로 황소 #24", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:28:32.000Z" },
    { alias: "홍대 독수리 #93", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:28:34.000Z" }
  ],
  [-306]: [
    { alias: "종로 황소 #30", content: "Antidooring 2026.20.3 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:34:37.000Z" },
    { alias: "홍대 독수리 #19", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:34:39.000Z" },
    { alias: "여의도 팔콘 #88", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:34:41.000Z" },
    { alias: "강남 여우 #77", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:34:43.000Z" }
  ],
  [-307]: [
    { alias: "홍대 독수리 #25", content: "EU Robotaxi hiring 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:40:44.000Z" },
    { alias: "여의도 팔콘 #94", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:40:46.000Z" },
    { alias: "강남 여우 #83", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:40:48.000Z" },
    { alias: "서초 매 #72", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:40:50.000Z" },
    { alias: "송파 늑대 #61", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:40:52.000Z" }
  ],
  [-308]: [
    { alias: "여의도 팔콘 #20", content: "NI $16.9B 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:46:51.000Z" },
    { alias: "강남 여우 #89", content: "JPM 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:46:53.000Z" },
    { alias: "서초 매 #78", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:46:55.000Z" }
  ],
  [-309]: [
    { alias: "서초 매 #94", content: "모델 $169 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:52:02.000Z" },
    { alias: "송파 늑대 #83", content: "NFLX 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:52:04.000Z" },
    { alias: "마포 사자 #72", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:52:06.000Z" },
    { alias: "마포 사자 #62", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:52:08.000Z" }
  ],
  [-310]: [
    { alias: "송파 늑대 #89", content: "Burry $193B 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:08:09.000Z" },
    { alias: "마포 사자 #78", content: "FNMA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:08:11.000Z" },
    { alias: "한남 호랑이 #67", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:08:13.000Z" },
    { alias: "분당 황소 #56", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:08:15.000Z" },
    { alias: "분당 황소 #46", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:08:17.000Z" }
  ],
  [-311]: [
    { alias: "마포 사자 #84", content: "ETF weights 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:14:16.000Z" },
    { alias: "한남 호랑이 #73", content: "MU 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:14:18.000Z" },
    { alias: "분당 황소 #62", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:14:20.000Z" }
  ],
  [-312]: [
    { alias: "한남 호랑이 #79", content: "Barclays $370 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:20:23.000Z" },
    { alias: "분당 황소 #68", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:20:25.000Z" },
    { alias: "역삼 독수리 #57", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:20:27.000Z" },
    { alias: "역삼 독수리 #47", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:20:29.000Z" }
  ],
  [-313]: [
    { alias: "분당 황소 #74", content: "TTM $140B 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:26:30.000Z" },
    { alias: "역삼 독수리 #63", content: "TSM 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:26:32.000Z" },
    { alias: "압구정 팔콘 #52", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:26:34.000Z" },
    { alias: "청담 여우 #41", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:26:36.000Z" },
    { alias: "청담 여우 #31", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:26:38.000Z" }
  ],
  [-314]: [
    { alias: "역삼 독수리 #69", content: "XPENG VLA 2.0 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:32:37.000Z" },
    { alias: "압구정 팔콘 #58", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:32:39.000Z" },
    { alias: "청담 여우 #47", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:32:41.000Z" }
  ],
  [-315]: [
    { alias: "압구정 팔콘 #64", content: "Grok voice ~3mo 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:38:44.000Z" },
    { alias: "청담 여우 #53", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:38:46.000Z" },
    { alias: "잠실 매 #42", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:38:48.000Z" },
    { alias: "잠실 매 #32", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:38:50.000Z" }
  ],
  [-316]: [
    { alias: "청담 여우 #59", content: "Evercore $3100 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:44:51.000Z" },
    { alias: "잠실 매 #48", content: "SNDK 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:44:53.000Z" },
    { alias: "성수 늑대 #37", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:44:55.000Z" },
    { alias: "판교 사자 #26", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:44:57.000Z" },
    { alias: "판교 사자 #16", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:44:59.000Z" }
  ],
  [-317]: [
    { alias: "잠실 매 #54", content: "SDI ESS 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:50:02.000Z" },
    { alias: "성수 늑대 #43", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:50:04.000Z" },
    { alias: "판교 사자 #32", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:50:06.000Z" }
  ],
  [-318]: [
    { alias: "성수 늑대 #49", content: "Q2 miss 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:06:09.000Z" },
    { alias: "판교 사자 #38", content: "IBM 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:06:11.000Z" },
    { alias: "광화문 호랑이 #27", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:06:13.000Z" },
    { alias: "광화문 호랑이 #17", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:06:15.000Z" }
  ],
  [-319]: [
    { alias: "판교 사자 #44", content: "CHIPS pols 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:12:16.000Z" },
    { alias: "광화문 호랑이 #33", content: "IBM 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:12:18.000Z" },
    { alias: "종로 황소 #22", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:12:20.000Z" },
    { alias: "홍대 독수리 #91", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:12:22.000Z" },
    { alias: "홍대 독수리 #81", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:12:24.000Z" }
  ],
  [-320]: [
    { alias: "광화문 호랑이 #39", content: "Buffett 12M 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:18:23.000Z" },
    { alias: "종로 황소 #28", content: "BRK.B 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:18:25.000Z" },
    { alias: "홍대 독수리 #17", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:18:27.000Z" }
  ],
  [-321]: [
    { alias: "종로 황소 #34", content: "Retail 6yr low 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:24:30.000Z" },
    { alias: "홍대 독수리 #23", content: "SPY 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:24:32.000Z" },
    { alias: "여의도 팔콘 #92", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:24:34.000Z" },
    { alias: "여의도 팔콘 #82", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:24:36.000Z" }
  ],
  [-322]: [
    { alias: "홍대 독수리 #29", content: "Pricing 74% 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:30:37.000Z" },
    { alias: "여의도 팔콘 #18", content: "TSM 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:30:39.000Z" },
    { alias: "강남 여우 #87", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:30:41.000Z" },
    { alias: "서초 매 #76", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:30:43.000Z" },
    { alias: "서초 매 #66", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:30:45.000Z" }
  ],
  [-323]: [
    { alias: "여의도 팔콘 #24", content: "ARK +$21M 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:36:44.000Z" },
    { alias: "강남 여우 #93", content: "SPCX 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:36:46.000Z" },
    { alias: "서초 매 #82", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:36:48.000Z" }
  ],
  [-324]: [
    { alias: "강남 여우 #19", content: "FSD EU 50M km 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:42:51.000Z" },
    { alias: "서초 매 #88", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:42:53.000Z" },
    { alias: "송파 늑대 #77", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:42:55.000Z" },
    { alias: "송파 늑대 #67", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:42:57.000Z" }
  ],
  [-325]: [
    { alias: "송파 늑대 #93", content: "FSD 14.3.5 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:48:02.000Z" },
    { alias: "마포 사자 #82", content: "TSLA 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:48:04.000Z" },
    { alias: "한남 호랑이 #71", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:48:06.000Z" },
    { alias: "한남 호랑이 #61", content: "사이즈·타임호라이즌 먼저 정하고 해석하자.", created_at: "2026-07-15T00:48:08.000Z" },
    { alias: "한남 호랑이 #51", content: "모멘텀만 추격하기보다 리스크 예산부터.", created_at: "2026-07-15T00:48:10.000Z" }
  ],
  [-326]: [
    { alias: "마포 사자 #88", content: "James Quiver 숫자만으로도 포지션 점검 값이야.", created_at: "2026-07-15T00:54:09.000Z" },
    { alias: "한남 호랑이 #77", content: "SPCX 쪽으로는 오늘 흐름에서 무시하기 어려운 이벤트.", created_at: "2026-07-15T00:54:11.000Z" },
    { alias: "분당 황소 #66", content: "시사점은 펀더멘털과 내러티브를 분리하는 것.", created_at: "2026-07-15T00:54:13.000Z" }
  ],

  // ── 2026-07-14 신규 ──────────────────────────────────────────────────────
  [-285]: [
    { alias: "여의도 늑대 #61", content: "Robotaxi 52%면 PT $460의 절반이 자율이야. 멀티플 재평가 여지가 구조적으로 남아 있어.", created_at: "2026-07-14T00:08:00.000Z" },
    { alias: "성수 팔콘 #39", content: "101k 마일 사고율이 규제·보험 양쪽 논거에 다 들어가. 숫자 신뢰도가 핵심.", created_at: "2026-07-14T00:10:00.000Z" },
    { alias: "판교 여우 #54", content: "Optimus RaaS $30B + Capex $25B 전환이 같이 나오면 AI·로봇이 컨센서스에 편입되기 시작했다는 신호.", created_at: "2026-07-14T00:12:00.000Z" },
    { alias: "홍대 황소 #22", content: "Cybercab 3,113 lbs·48-kWh는 원가·에너지 레버. 트립당 마진에 직접 연결돼.", created_at: "2026-07-14T00:14:00.000Z" },
  ],
  [-286]: [
    { alias: "잠실 독수리 #48", content: "딜리버리 비트 → EBIT 상향이 干净한 체인. PT만 올린 게 아니라 펀더멘털 추정치도 움직임.", created_at: "2026-07-14T00:14:00.000Z" },
    { alias: "강남 매 #71", content: "롱휠베이스 Model Y 명시가 믹스 개선을 공식화한 포인트. ASP·마진 양쪽.", created_at: "2026-07-14T00:16:00.000Z" },
    { alias: "종로 황소 #25", content: "BofA $460과 Jefferies $400이 같은 날이면 PT 상향 도미노 초입일 수 있어.", created_at: "2026-07-14T00:18:00.000Z" },
  ],
  [-287]: [
    { alias: "마포 팔콘 #57", content: "Flight 13 clear면 발사 일정 리스크가 줄어든 거야. 규제 이벤트가 하나씩 제거되는 구간.", created_at: "2026-07-14T00:20:00.000Z" },
    { alias: "서초 황소 #34", content: "알람 설정 오류면 프로시저·소프트웨어 쪽. 시정조치 반영 속도가 상대적으로 빠를 수 있어.", created_at: "2026-07-14T00:22:00.000Z" },
    { alias: "광화문 독수리 #68", content: "부상·피해 0 종료는 대외 커뮤니케이션에서도 클린. 다음 비행 전 심리적 부담 완화.", created_at: "2026-07-14T00:24:00.000Z" },
    { alias: "여의도 여우 #16", content: "주가 약세와 맞물려도 일정 정상화는 장기 밸류에이션에 플러스 팩터.", created_at: "2026-07-14T00:26:00.000Z" },
  ],
  [-288]: [
    { alias: "분당 황소 #44", content: "~$1.2T ATH 소실은 공포 헤드라인용. 포지션은 사이즈와 타임호라이즌으로 나눠야 해.", created_at: "2026-07-14T00:26:00.000Z" },
    { alias: "한남 독수리 #53", content: "최저 종가가 자기실현적 매도를 부를 수 있어. 반대로 장기는 평단 낮추는 창구.", created_at: "2026-07-14T00:28:00.000Z" },
    { alias: "역삼 여우 #29", content: "−4.34% 일일 변동보다 ATH 대비 드로다운이 진짜 리스크 지표야.", created_at: "2026-07-14T00:30:00.000Z" },
  ],
  [-289]: [
    { alias: "송파 독수리 #77", content: "매수 4·매도 0 asymmetry가 핵심 데이터. 해석은 과하지 않게, 공시는 확실히.", created_at: "2026-07-14T00:32:00.000Z" },
    { alias: "청담 팔콘 #41", content: "James FCC 감독 상임위 + SPCX 매수는 거버넌스 이슈로 계속 소환될 거야.", created_at: "2026-07-14T00:34:00.000Z" },
    { alias: "압구정 황소 #18", content: "$15k–$50k 밴드는 상징성 > 규모. 포지션 사이즈로 과대해석하면 안 돼.", created_at: "2026-07-14T00:36:00.000Z" },
    { alias: "판교 매 #66", content: "양당 매수면 정당 프레임만으로 치부하기 어려워. 공시 집계 자체는 중립 팩트.", created_at: "2026-07-14T00:38:00.000Z" },
    { alias: "성수 황소 #23", content: "PTR 번호까지 있으면 팩트체크 끝. 트레이딩 시그널로 쓰기엔 노이즈도 커.", created_at: "2026-07-14T00:40:00.000Z" },
  ],
  [-290]: [
    { alias: "홍대 독수리 #55", content: "6월 YoY +67.9%가 속도감. 분기 +36%보다 체감이 강해.", created_at: "2026-07-14T00:38:00.000Z" },
    { alias: "잠실 팔콘 #32", content: "Est 소폭 상회지만 기록 분기 비트라는 점이 심리에 더 중요해.", created_at: "2026-07-14T00:40:00.000Z" },
    { alias: "강남 황소 #49", content: "H1 $75B 런레이트면 연간 가이던스와 갭 확인이 다음 체크포인트.", created_at: "2026-07-14T00:42:00.000Z" },
    { alias: "여의도 팔콘 #81", content: "AI 수요가 월간 매출로 찍히는 구간. 노드 전환·Capex와 한 세트.", created_at: "2026-07-14T00:44:00.000Z" },
  ],
  [-291]: [
    { alias: "마포 황소 #73", content: "5GW면 전력망·가스 터빈·송전까지 연쇄 수요. 반도체만이 아닌 인프라 테마.", created_at: "2026-07-14T00:44:00.000Z" },
    { alias: "서초 매 #26", content: "up to $50B라 최종 집행은 열어둬야 하지만 방향성 시그널은 명확해.", created_at: "2026-07-14T00:46:00.000Z" },
    { alias: "종로 여우 #64", content: ">$1B local infra는 정치·규제 우호도 확보 수단이기도 해. 실행 확률을 높여.", created_at: "2026-07-14T00:48:00.000Z" },
    { alias: "광화문 팔콘 #37", content: "META Capex가 TSMC·NVDA 수요로 흘러가는 최종 흡수처 확인 뉴스.", created_at: "2026-07-14T00:50:00.000Z" },
  ],
  [-292]: [
    { alias: "분당 독수리 #58", content: "최대 매도 직후 3.5년 최대 매수면 숏커버+리빌드 겹친 주간일 가능성 커.", created_at: "2026-07-14T00:50:00.000Z" },
    { alias: "한남 황소 #45", content: "10% vs May 14%면 아직 피크는 아님. 추가 비중 확대 여지 열어둔 차트.", created_at: "2026-07-14T00:52:00.000Z" },
    { alias: "역삼 팔콘 #19", content: "GS Prime Book이면 프라임 브로커 플로우. 신뢰도 높은 포지션 시그널.", created_at: "2026-07-14T00:54:00.000Z" },
    { alias: "송파 매 #86", content: "NVDA·TSM·AVGO 바스켓으로 보면 반도체 리스크온 재진입 시그널.", created_at: "2026-07-14T00:56:00.000Z" },
  ],

  // ── 2026-07-13 신규 ──────────────────────────────────────────────────────
  [-277]: [
    { alias: "판교 황소 #62", content: "완전 무인 허브 설계가 전국 복제된다는 게 핵심이야. 허브 수 늘어도 인건비가 늘지 않아. 고정비 레버리지가 압도적이야.", created_at: "2026-07-13T00:08:00.000Z" },
    { alias: "성수 독수리 #37", content: "수퍼차저까지 같이 통합됐다는 게 인프라 일체형이라는 거야. 별도 업체 안 써도 되는 구조.", created_at: "2026-07-13T00:10:00.000Z" },
    { alias: "홍대 황소 #51", content: "작년부터 설계됐다는 게 임시방편이 아니라는 증거야. 처음부터 무인 운영이 플랜이었던 거지.", created_at: "2026-07-13T00:12:00.000Z" },
    { alias: "잠실 여우 #28", content: "EBITDA 추정치를 올려야 할 것 같아. 운영비 절감 레버가 이렇게 구조적으로 쌓이면 마진이 달라지거든.", created_at: "2026-07-13T00:14:00.000Z" },
  ],
  [-278]: [
    { alias: "강남 팔콘 #44", content: "삼성이 TSMC 아닌 게 지정학 리스크 분산이기도 해. 대만 리스크 헤지가 자연스럽게 들어가는 거야.", created_at: "2026-07-13T00:14:00.000Z" },
    { alias: "종로 황소 #73", content: "India 팀 Q4 테이프아웃 목표가 더 흥미해. 두 개 트랙이 동시에 돌아가는 거면 칩 내재화 속도가 예상보다 빨라.", created_at: "2026-07-13T00:16:00.000Z" },
    { alias: "여의도 독수리 #19", content: "AI5가 2nm Texas로 가면 Optimus·클러스터 추론 단가 구조가 바뀌어. 양산 스케줄은 이후지만 방향은 명확해.", created_at: "2026-07-13T00:18:00.000Z" },
    { alias: "광화문 팔콘 #56", content: "NVIDIA 의존도 감소가 장기 마진 확장의 숨은 레버야. FSD 구독 원가가 내려갈수록 마진이 올라가는 거잖아.", created_at: "2026-07-13T00:20:00.000Z" },
  ],
  [-279]: [
    { alias: "판교 여우 #38", content: "Ferris Bueller 선택이 브랜드 감성 마케팅으로 완벽해. '인생 빠르게 지나간다, 지금 즐겨라' = Cybercab 메시지랑 딱 맞아.", created_at: "2026-07-13T00:20:00.000Z" },
    { alias: "홍대 독수리 #62", content: "Austin 허브 오픈 → Chicago 광고 타이밍이 교과서적이야. 인지 → 수요 → 예약 시퀀스를 기획하고 있는 거야.", created_at: "2026-07-13T00:22:00.000Z" },
    { alias: "성수 황소 #44", content: "이틀 촬영이라는 게 대형 글로벌 캠페인 소재일 수 있어. 미국 외 시장 동시 런칭 준비 가능성.", created_at: "2026-07-13T00:24:00.000Z" },
  ],
  [-280]: [
    { alias: "잠실 팔콘 #47", content: "50회 며칠 만에라는 게 단순히 좋다는 게 아니야. 설계자가 자기 제품을 신뢰한다는 거야. 그게 가장 강력한 증거.", created_at: "2026-07-13T00:26:00.000Z" },
    { alias: "강남 황소 #83", content: "직원 탑승 이제 막 시작이라는 게 아직 초기 단계인데 이미 이 반응. 소비자 피드백은 어떨지 기대돼.", created_at: "2026-07-13T00:28:00.000Z" },
    { alias: "종로 독수리 #31", content: "Model 3 부품의 절반이라는 것도 다시 실감해. 단순할수록 신뢰성이 높고 정비 비용이 낮은 거야.", created_at: "2026-07-13T00:30:00.000Z" },
    { alias: "여의도 팔콘 #59", content: "재탑승률이 로보택시 LTV의 핵심이야. 전문가 50회 탑승이 소비자 반복 이용 가능성의 선행 지표야.", created_at: "2026-07-13T00:32:00.000Z" },
    { alias: "광화문 황소 #27", content: "Cybercab이 목적 설계된 탈것이라는 게 일반 차량 개조랑 다른 이유야. 탑승 경험 자체가 다를 수밖에 없어.", created_at: "2026-07-13T00:34:00.000Z" },
  ],
  [-281]: [
    { alias: "판교 독수리 #53", content: "15% 연산으로 V4 달성은 소프트웨어 팀 역량이야. 하드웨어 한계를 알고리즘으로 극복하는 능력.", created_at: "2026-07-13T00:32:00.000Z" },
    { alias: "홍대 황소 #37", content: "수백만 대가 OTA로 바로 받는다는 게 진짜 해자야. 경쟁사는 이 플랫폼 구조를 따라오는 데 수년이 필요해.", created_at: "2026-07-13T00:34:00.000Z" },
    { alias: "성수 팔콘 #62", content: "HW3→HW4 업그레이드 수요는 별개로 유지된다는 게 포인트야. V4 Lite로 만족하는 층 + 업그레이드하는 층 분리.", created_at: "2026-07-13T00:36:00.000Z" },
    { alias: "잠실 독수리 #74", content: "구독 유지율 향상이 장기적으로 가장 중요한 지표야. FSD 구독자 이탈 방지가 ARR 안정화로 이어져.", created_at: "2026-07-13T00:38:00.000Z" },
  ],
  [-282]: [
    { alias: "강남 팔콘 #71", content: "V3 전환 완료 시 ARPU 상승 명분이 생겨. 프리미엄 구독 가격 올릴 수 있는 기술적 근거가 되는 거야.", created_at: "2026-07-13T00:38:00.000Z" },
    { alias: "종로 황소 #58", content: "히트실드 카메라 6기가 Starship R&D를 상업 임무에 끼워 넣는 전략이야. 비용 분산이 영리해.", created_at: "2026-07-13T00:40:00.000Z" },
    { alias: "여의도 독수리 #43", content: "V3 성좌 완성 후에는 Kuiper가 용량 경쟁에서 따라오는 게 불가능해져. 격차가 복리로 벌어지는 구조야.", created_at: "2026-07-13T00:42:00.000Z" },
    { alias: "광화문 팔콘 #85", content: "남아공 지상국 테스트가 아프리카 시장 확장 신호일 수 있어. 인터넷 미접속 대륙에서 Starlink 가장 유리한 포지션.", created_at: "2026-07-13T00:44:00.000Z" },
  ],
  [-283]: [
    { alias: "판교 황소 #77", content: "암 캐치 성공하면 그날이 항공우주 역사 기록되는 날이야. 완전 재사용 로켓이 실제 운영되는 첫 사례.", created_at: "2026-07-13T00:44:00.000Z" },
    { alias: "홍대 독수리 #39", content: "V2 Starlink 탑재라는 게 테스트 아닌 실제 상업 화물이야. 돈 버는 비행이 된 거잖아.", created_at: "2026-07-13T00:46:00.000Z" },
    { alias: "성수 여우 #61", content: "발사 비용 1/10 현실화 타임라인이 이번 비행 성공 시 확정되는 거야. 그게 SPCX 밸류에이션 논거를 완전히 바꿔.", created_at: "2026-07-13T00:48:00.000Z" },
    { alias: "잠실 팔콘 #52", content: "H/W·S/W 수정 사항이 많다는 게 이전 비행 데이터를 제대로 반영했다는 거야. 성공 확률이 올라갔다고 봐.", created_at: "2026-07-13T00:50:00.000Z" },
  ],
  [-284]: [
    { alias: "강남 황소 #48", content: "HBM 마진 믹스가 얼마나 올라왔는지가 진짜 핵심이야. 매출 $9B보다 HBM 비중이 주가 방향 결정해.", created_at: "2026-07-13T00:50:00.000Z" },
    { alias: "종로 팔콘 #36", content: "MU가 반도체 사이클 선행 지표라서 7/23 발표가 시장 전체 센티먼트에도 영향 줄 거야. 숫자 주목.", created_at: "2026-07-13T00:52:00.000Z" },
    { alias: "여의도 황소 #71", content: "2027년까지 수급 타이트라는 가이던스가 이 숫자로 재확인되면 사이클 길이가 보장되는 거야.", created_at: "2026-07-13T00:54:00.000Z" },
    { alias: "광화문 독수리 #29", content: "순이익 $1B+가 진짜 사이클 전환 확인이야. 매출보다 순이익 수준이 구조적 개선 증거야.", created_at: "2026-07-13T00:56:00.000Z" },
  ],

  // ── 2026-07-10 신규 ──────────────────────────────────────────────────────
  [-268]: [
    { alias: "잠실 독수리 #44", content: "FSD·xAI 아키텍처 공유가 핵심이야. 자율주행 학습 데이터를 로봇 팔 훈련에 재활용하는 구조. 학습 비용이 한계 감소하는 거야.", created_at: "2026-07-10T00:08:00.000Z" },
    { alias: "판교 여우 #52", content: "Phase 2 기업 임대 시장이 진짜 큰 거야. 전 세계 제조업 기업들이 고객이 되는 거잖아. B2B SaaS로 전환되는 TAM이 상상 초월.", created_at: "2026-07-10T00:10:00.000Z" },
    { alias: "강남 매 #83", content: "ARK 2026 인간 수준 목표. 전략적 앵커 역할이 있어. 시장 기대를 올려놓으면 Tesla가 그에 맞춰 압박받는 구조가 생기는 거야.", created_at: "2026-07-10T00:12:00.000Z" },
    { alias: "홍대 황소 #19", content: "대당 $10만 수익이라면 10M대 × $10만 = $1000조원 연 매출. 이게 말이 되는 숫자야? 반도 달성해도 현재 시총이 싸 보이는 거잖아.", created_at: "2026-07-10T00:14:00.000Z" },
  ],
  [-269]: [
    { alias: "종로 황소 #71", content: "울타리 철거 타이밍이 공급망 확인과 동시에 나온 게 중요해. 마케팅 이벤트가 아니라 진짜 상업화 준비 완료 신호야.", created_at: "2026-07-10T00:14:00.000Z" },
    { alias: "성수 매 #48", content: "50,000대 공급 가능은 수요 우려 해소의 핵심이야. 이전에 '수요는 있는데 공급이 문제'였는데 이게 뒤집어진 거야.", created_at: "2026-07-10T00:16:00.000Z" },
    { alias: "잠실 팔콘 #33", content: "RIM 공법 채택이 흥미로워. 스탬핑 금형 불필요하면 새 모델 출시 시 생산 전환 속도가 달라지는 거잖아. 차종 다양화 가속.", created_at: "2026-07-10T00:18:00.000Z" },
    { alias: "광화문 여우 #61", content: "GHG -40%는 탄소 규제 강화 국면에서 B2B 계약 시 추가 논거가 돼. 단순 비용 절감이 아니라 규제 리스크 헤지 효과.", created_at: "2026-07-10T00:20:00.000Z" },
    { alias: "여의도 황소 #22", content: "7월 배포 확정되면 그 다음 뉴스플로우가 무서워. Q3 수십 대 → Q4 수백 대로 스케일업되면 매분기 성장 숫자가 나오는 구조.", created_at: "2026-07-10T00:22:00.000Z" },
  ],
  [-270]: [
    { alias: "판교 매 #47", content: "UBS가 로보택시 수익을 처음 본격 반영했다는 게 이번 상향의 핵심이야. 이전 PT는 사실상 EV 회사 밸류에이션이었던 거야.", created_at: "2026-07-10T00:20:00.000Z" },
    { alias: "강남 황소 #35", content: "Goldman이나 MS가 올리면 패시브 자금 재배분 트리거야. 인덱스 비중 조정 타이밍이 바로 매수 포인트가 되는 거야.", created_at: "2026-07-10T00:22:00.000Z" },
    { alias: "홍대 매 #68", content: "$442가 Optimus 제외한 PT라는 게 중요해. 완전 반영 시 숫자가 얼마일지 지금은 모델 없는 상태야. 업사이드 열려있어.", created_at: "2026-07-10T00:24:00.000Z" },
    { alias: "성수 여우 #54", content: "PT 상향 연쇄는 보통 2~4주 안에 다 나와. 이번 주 중에 다른 기관 발표 주목해봐야 해.", created_at: "2026-07-10T00:26:00.000Z" },
  ],
  [-271]: [
    { alias: "종로 독수리 #29", content: "스위스에서 1위라는 브랜드 파워가 독일에 전파되는 데 시간이 얼마 안 걸려. 프리미엄 자동차 취향이 비슷한 시장이니까.", created_at: "2026-07-10T00:26:00.000Z" },
    { alias: "잠실 팔콘 #71", content: "FSD 유럽 승인 타임라인이 보이기 시작했어. 덴마크→스위스→독일. 이 순서대로 규제 장벽이 하나씩 내려가는 거야.", created_at: "2026-07-10T00:28:00.000Z" },
    { alias: "광화문 황소 #18", content: "BYD가 스위스 같은 프리미엄 시장에서 Tesla를 이기는 건 현재 포지셔닝으로 5년 이상 필요해. 테슬라 선점 효과가 크다.", created_at: "2026-07-10T00:30:00.000Z" },
  ],
  [-272]: [
    { alias: "여의도 황소 #67", content: "Genius $93B 전망 숫자의 신뢰도가 중요해. Starlink + Starship + AI 인프라 세 축이 다 성장하면 $93B이 오히려 보수적일 수 있어.", created_at: "2026-07-10T00:32:00.000Z" },
    { alias: "판교 독수리 #44", content: "AI 인프라 계약(Google·Anthropic) 추가로 SpaceX 수익 기반이 다각화됐어. 로켓+위성+AI 인프라 삼각 구조.", created_at: "2026-07-10T00:34:00.000Z" },
    { alias: "강남 여우 #92", content: "Street High PT = 기관 앵커 재조정이야. 다른 기관들이 $100~$200대 PT를 쓰다가 $800이 나오면 중간값이 올라가는 효과.", created_at: "2026-07-10T00:36:00.000Z" },
    { alias: "홍대 독수리 #51", content: "IPO 이전 SPCX ETF 프리미엄이 정당화되는 논거가 한 번 더 강화된 거야. 프리미엄이 줄어들 이유가 없어.", created_at: "2026-07-10T00:38:00.000Z" },
    { alias: "성수 팔콘 #38", content: "Kalshi 예측 '지구 전체 초과'는 과장이지만 $1T 논거는 Starlink 독점만으로도 충분히 만들어지는 숫자야.", created_at: "2026-07-10T00:40:00.000Z" },
  ],
  [-273]: [
    { alias: "잠실 황소 #84", content: "10배 격차는 단순 수량이 아니라 서비스 품질 격차야. 위성 수 많으면 레이턴시 낮아지고 커버리지 끊김 없어져. 경쟁사가 추격하기 어려워.", created_at: "2026-07-10T00:38:00.000Z" },
    { alias: "종로 팔콘 #63", content: "구독 5,000만 시나리오가 이제 현실적이야. 1,000만에서 5배인데 TAM 자체가 40억이라는 거잖아. 성장 여지가 무한해.", created_at: "2026-07-10T00:40:00.000Z" },
    { alias: "광화문 매 #37", content: "Starship 재사용 완성 시 배치 비용 1/10. 그러면 2세대 밀도를 훨씬 빠르게 채울 수 있어. 격차가 복리로 벌어지는 구조야.", created_at: "2026-07-10T00:42:00.000Z" },
    { alias: "여의도 팔콘 #29", content: "$72B Starlink 매출 시나리오가 실제로 가능한 숫자야. 구독료 조금만 올려도 $100B+. SpaceX 단일 자회사 가치가 이미 초대형.", created_at: "2026-07-10T00:44:00.000Z" },
  ],
  [-274]: [
    { alias: "판교 황소 #66", content: "HBM 전환이 일반 DRAM 공급을 줄인다는 논리가 반직관적으로 보여도 실제야. 같은 팹에서 HBM 늘리면 DRAM 라인이 줄어드는 거야.", created_at: "2026-07-10T00:44:00.000Z" },
    { alias: "강남 독수리 #57", content: "삼성·SK하이닉스 동반 HBM 전환이 업계 전체 공급 감소를 의미해. MU 혼자가 아니라 업계 구조가 그렇다는 게 더 강력한 논거.", created_at: "2026-07-10T00:46:00.000Z" },
    { alias: "홍대 팔콘 #42", content: "ASP 상승이 실적에 반영되는 시차가 1~2분기야. 지금 매수하면 그 반영을 앞서 잡는 타이밍이 되는 거야.", created_at: "2026-07-10T00:48:00.000Z" },
    { alias: "성수 황소 #28", content: "Micron 공식 발언이라는 게 핵심이야. 기업이 직접 '2027 말까지 타이트'라고 하면 이게 가이던스야. 이걸 의심할 이유가 없어.", created_at: "2026-07-10T00:50:00.000Z" },
  ],
  [-275]: [
    { alias: "잠실 여우 #53", content: "FCF vs Net Income 비교 필수라는 포인트가 실전적이야. 감가상각 정책 차이를 제거하면 현금 창출 능력으로 공정 비교 가능해.", created_at: "2026-07-10T00:50:00.000Z" },
    { alias: "종로 황소 #47", content: "GAAP 내 허용이면 불법은 아니야. 하지만 투자자가 조심해야 한다는 게 Burry 주장의 핵심. 정보 비대칭 경고야.", created_at: "2026-07-10T00:52:00.000Z" },
    { alias: "광화문 팔콘 #81", content: "Meta가 AI 투자 붐 직전에 상각 기간 연장한 타이밍이 의심스럽긴 해. 합리화가 가능해도 수상한 건 수상한 거야.", created_at: "2026-07-10T00:54:00.000Z" },
    { alias: "여의도 매 #34", content: "Amazon 반대 방향이 오히려 신뢰가 가. 실제 사용 주기 반영 = 보수적 회계 = 이익 품질이 더 높다는 신호일 수 있어.", created_at: "2026-07-10T00:56:00.000Z" },
  ],
  [-276]: [
    { alias: "판교 팔콘 #73", content: "항상-온 컨텍스트 데이터가 광고 CPM에 미치는 영향이 핵심이야. 사용자 의도를 실시간으로 아는 플랫폼의 광고 가치는 완전히 다른 레벨이야.", created_at: "2026-07-10T00:56:00.000Z" },
    { alias: "강남 황소 #61", content: "유럽 GDPR 리스크가 진짜 변수야. Meta가 유럽에서 또 제재받으면 프리미엄 시장 진입이 막히는 거야. 출시 전 규제 협의가 필수.", created_at: "2026-07-10T00:58:00.000Z" },
    { alias: "홍대 여우 #38", content: "TipRanks US 13 List 편입이 기관 리서치 기반이라는 게 의미 있어. 단순 기술적 분석이 아니라 펀더멘털 기반 최우선 선정이야.", created_at: "2026-07-10T01:00:00.000Z" },
  ],

  // ── 2026-07-09 신규 ──────────────────────────────────────────────────────
  [-257]: [
    { alias: "강남 팔콘 #62", content: "밸류체인 전체 넷제로가 어려운 목표지만 Tesla가 정면 언급한 것 자체가 실행 의지야. 규제 강화 국면에서 선제 대응 논거로 유효해.", created_at: "2026-07-09T00:10:00.000Z" },
    { alias: "종로 매 #48", content: "베를린 100% 재생에너지 3년 연속이면 검증 데이터 확보돼. 다른 기가팩토리 확장 시 동일 스탠다드 적용 가능하다는 근거야.", created_at: "2026-07-09T00:12:00.000Z" },
    { alias: "합정 황소 #24", content: "철강·배터리 원재료를 '어렵다'고 명시한 게 오히려 진정성. 그린워싱 없는 로드맵이면 ESG 자금 회귀 논거가 진짜야.", created_at: "2026-07-09T00:14:00.000Z" },
    { alias: "성수 팔콘 #77", content: "저탄소 철강 스타트업이 이 흐름의 숨은 수혜야. Tesla 공급망 진입이 확정되면 스타트업 밸류 두 자릿수 배수로 뛸 수 있어.", created_at: "2026-07-09T00:16:00.000Z" },
  ],
  [-258]: [
    { alias: "여의도 독수리 #52", content: "14,000톤 재활용은 이미 상당 규모. Optimus·Megapack 배터리 수요 폭증에 앞서 원료 자체 순환 시스템을 구축하는 거야.", created_at: "2026-07-09T00:18:00.000Z" },
    { alias: "잠실 팔콘 #43", content: "Redwood Materials 파트너십 확장은 재활용 볼륨을 지속 늘릴 수 있는 축이야. 사내+외부 이원 구조가 스케일업 유연해.", created_at: "2026-07-09T00:20:00.000Z" },
    { alias: "왕십리 독수리 #29", content: "EU 배터리 여권 2027 시행 앞두고 재활용 비율 요건이 강화돼. Tesla가 트랙 레코드 미리 쌓는 게 유럽 판매 방어 논거야.", created_at: "2026-07-09T00:22:00.000Z" },
  ],
  [-259]: [
    { alias: "판교 매 #33", content: "라이드헤일링 90% 1~2인 데이터가 결정적. Uber·Lyft 통계랑 일치하는데 이걸 근거로 2인승 확정했다는 게 데이터 기반 의사결정.", created_at: "2026-07-09T00:26:00.000Z" },
    { alias: "성수 독수리 #61", content: "48V 아키텍처가 진짜 큰 변화. 12V 40년 표준을 깬 거고 산업 전체가 후속. 부품 공급망 재편도 함께 봐야 해.", created_at: "2026-07-09T00:28:00.000Z" },
    { alias: "종로 팔콘 #55", content: "Steer-by-Wire는 유인 차량 시장에선 논란이지만 로보택시 전용이면 완벽한 선택. 백업 컨트롤 자체가 자율성 방해 요소야.", created_at: "2026-07-09T00:30:00.000Z" },
    { alias: "홍대 팔콘 #38", content: "이원 플릿(Cybercab + Model Y)이 진짜 강점. 대형 그룹 커버까지 Tesla 차량으로 완결. 승객 유형별 최적 배차 알고리즘 필수.", created_at: "2026-07-09T00:32:00.000Z" },
    { alias: "명동 황소 #17", content: "부품 수 감축이 24시간 운영 로보택시에선 핵심 KPI야. 다운타임 = 매출 손실이라 신뢰성 설계가 트립당 EBITDA 결정 요인.", created_at: "2026-07-09T00:34:00.000Z" },
  ],
  [-260]: [
    { alias: "여의도 매 #71", content: "Florida 'ultimate proving ground' 표현이 무거운 신호야. 최종 검증 통과하면 다음은 전국 확장이라는 뜻.", created_at: "2026-07-09T00:36:00.000Z" },
    { alias: "성수 매 #42", content: "Florida 관광 밀도는 정말 높음. 픽업·드롭 반복률 높은 시장이면 트립당 매출 극대화 가능해.", created_at: "2026-07-09T00:38:00.000Z" },
    { alias: "홍대 매 #23", content: "DeSantis 주정부 협조는 확실한 정치 자산이야. Texas + Florida 두 축이면 다른 주도 압박받는 도미노 구도.", created_at: "2026-07-09T00:40:00.000Z" },
    { alias: "청담 독수리 #64", content: "footprint 확대 방향이 남부 밸류체인까지 커버 가능하면 라틴 관광객 시장 흡수. 트립 볼륨 큰 폭 상승 여지.", created_at: "2026-07-09T00:42:00.000Z" },
    { alias: "잠실 여우 #19", content: "6개월 안에 8~10개 주 추가면 2027 초 미국 절반 커버 시나리오. 이 속도면 로보택시 매출 커브 상승 각도 재계산 필수.", created_at: "2026-07-09T00:44:00.000Z" },
    { alias: "여의도 팔콘 #85", content: "Q3 어닝에서 로보택시 세그먼트 매출이 처음으로 별도 보고될 가능성. 그 시점에 밸류에이션 재평가 국면 확실.", created_at: "2026-07-09T00:46:00.000Z" },
  ],
  [-261]: [
    { alias: "강남 사자 #24", content: "Waymo LiDAR 방식은 특정 지역 정밀 최적. 확장 속도는 느리지만 안전성 검증에서는 앞서. 규제 마찰 없는 진입이 강점.", created_at: "2026-07-09T00:48:00.000Z" },
    { alias: "성수 여우 #35", content: "Las Vegas 관광객 대상 무인 라이드가 상업적으로 크게 성공할 수 있는 시장. Waymo 매출 곡선이 여기서 급격히 상승 가능.", created_at: "2026-07-09T00:50:00.000Z" },
    { alias: "판교 팔콘 #47", content: "GOOGL SOTP 계산에서 Waymo 부문이 오랫동안 저평가. 4개 도시 동시 개시면 애널리스트 재계산 트리거로 충분.", created_at: "2026-07-09T00:52:00.000Z" },
    { alias: "종로 독수리 #82", content: "Tesla 카메라 방식은 일반화 가능성 강점, Waymo는 안전 검증 강점. 시장 자체가 커지면 둘 다 승자야.", created_at: "2026-07-09T00:54:00.000Z" },
  ],
  [-262]: [
    { alias: "잠실 늑대 #26", content: "SWE Bench Pro에서 토큰 4.2배 효율이면 실 사용 비용은 20배 격차. 개발자들이 이 숫자만 보고 라우팅 바꿀 유인 충분.", created_at: "2026-07-09T00:56:00.000Z" },
    { alias: "명동 팔콘 #59", content: "80 TPS는 fast-model 대비 상급 속도. 코딩 에이전트·자동화 워크플로우에서 반응성 크게 개선. 실무 채택 가속.", created_at: "2026-07-09T00:58:00.000Z" },
    { alias: "홍대 독수리 #74", content: "Anthropic 대응 카드가 제한적. Opus 4.8 성능 유지하면서 가격 낮추기는 매우 어려워. 하이엔드 시장 재편 예상.", created_at: "2026-07-09T01:00:00.000Z" },
    { alias: "여의도 여우 #12", content: "AI Gateway·라우터 기본 옵션에 Grok 우선 채택 늘어날 거야. 개발자 SDK 통계에서 검증 가능.", created_at: "2026-07-09T01:02:00.000Z" },
    { alias: "성수 사자 #48", content: "Optimus 두뇌로 Grok 파생 사용 시나리오가 실질 옵션. Musk 생태계 AI 축이 xAI로 뿌리내리는 흐름.", created_at: "2026-07-09T01:04:00.000Z" },
  ],
  [-263]: [
    { alias: "명동 여우 #37", content: "AVGO의 Apple RF 프론트엔드 지위는 사실상 대체 불가. 다년 계약 확정으로 매출 예측 정밀도 크게 개선.", created_at: "2026-07-09T01:06:00.000Z" },
    { alias: "종로 사자 #52", content: "Fort Collins 반도체 클러스터 부상은 지역 부동산·인프라 협력사에도 파급. 미국 반도체 정책 수혜 라인 확장.", created_at: "2026-07-09T01:08:00.000Z" },
    { alias: "홍대 여우 #64", content: "다년 협약 = P/E 프리미엄 확대 명분. 매출 가시성이 개선되면 안정 성장주로 재평가 가능.", created_at: "2026-07-09T01:10:00.000Z" },
    { alias: "여의도 늑대 #29", content: "트럼프 온쇼어링 정책과 딱 맞는 발표라 정치적 반발 없는 안전한 딜. AAPL도 관세 헤지 카드 확보.", created_at: "2026-07-09T01:12:00.000Z" },
  ],
  [-264]: [
    { alias: "판교 여우 #43", content: "H200을 학습용으로 요청한 것이 CUDA 해자 재확인 시그널. 국산 GPU가 학습에서 대체 불가 상태라는 반증.", created_at: "2026-07-09T01:14:00.000Z" },
    { alias: "성수 늑대 #61", content: "이중 트랙 방침이 흥미로워. 학습은 H200 병용, 추론은 국내 프로세서. 자립 로드맵과 실무 병목 동시 관리 구조.", created_at: "2026-07-09T01:16:00.000Z" },
    { alias: "명동 늑대 #75", content: "승인 여부는 트럼프-시진핑 협상 카드가 될 수 있어. Commerce dept BIS 검토 단계라 결정 시점이 변수.", created_at: "2026-07-09T01:18:00.000Z" },
    { alias: "홍대 사자 #56", content: "밸류에이션에서 중국 노출은 이미 대부분 지워진 상태. 승인 뉴스만 나오면 상방 즉시 반영 가능.", created_at: "2026-07-09T01:20:00.000Z" },
    { alias: "잠실 사자 #14", content: "추론 시장 국산 대체 리스크는 여전히 잔존. 국내 프로세서 성능 검증 뉴스가 향후 주요 트리거.", created_at: "2026-07-09T01:22:00.000Z" },
  ],
  [-265]: [
    { alias: "여의도 사자 #22", content: "Blue Origin 첫 외부 프라이머리는 우주 산업 새 국면. SpaceX 프리미엄이 흔들리기보다 파이 자체가 확대되는 이벤트.", created_at: "2026-07-09T01:24:00.000Z" },
    { alias: "종로 늑대 #48", content: "$29/주는 상대 밸류 기준점. SPCX 프리미엄 방어 논리 오히려 강화. 우주 산업 저평가 반증 프레임 가능.", created_at: "2026-07-09T01:26:00.000Z" },
    { alias: "성수 팔콘 #33", content: "Kuiper·달·HLS 밸류체인 협력사 스크리닝 필수. 위성 부품·발사대·엔진 등 산업 확장 낙수효과 명확.", created_at: "2026-07-09T01:28:00.000Z" },
    { alias: "홍대 매 #92", content: "Amazon 후속 라운드 참여 여지가 남아있어. Bezos-Amazon-Kuiper 트라이앵글이 자금 조달 확장 가능성 제공.", created_at: "2026-07-09T01:30:00.000Z" },
  ],
  [-266]: [
    { alias: "잠실 독수리 #67", content: "디지털 +20.9%는 이례적. 이커머스 카테고리에서 소비 강세 지속 신호. 매크로 불안에도 방어 소비 명확.", created_at: "2026-07-09T01:32:00.000Z" },
    { alias: "판교 사자 #18", content: "가솔린·환율 조정 후에도 +7.0% 실질 성장 확인. 회원제 락인이 매크로 방어 자산 논리 강화.", created_at: "2026-07-09T01:34:00.000Z" },
    { alias: "명동 독수리 #91", content: "44주 누적 +10.1% 성장은 규모 대비 놀라운 속도. Q2 어닝 컨센서스 상향 조정 명분.", created_at: "2026-07-09T01:36:00.000Z" },
    { alias: "성수 황소 #12", content: "P/E 40배 넘어도 이 성장률이면 지속 가능. 방어주 중 성장 프리미엄 정당화되는 몇 안 되는 종목.", created_at: "2026-07-09T01:38:00.000Z" },
  ],
  [-267]: [
    { alias: "여의도 팔콘 #38", content: "-200K contracts 근접은 심리적 극단. 2007·2013·2024 다 이 근처에서 반전. 통계적 무시 불가한 신호.", created_at: "2026-07-09T01:44:00.000Z" },
    { alias: "종로 여우 #17", content: "BOJ 개입 확률 급상승 구간. 일본 재무성이 실질 개입 카드 만지작. 헤드라인 리스크 커지는 시점.", created_at: "2026-07-09T01:46:00.000Z" },
    { alias: "홍대 팔콘 #24", content: "캐리 언와인드 시 AI·반도체 대형주가 최대 리스크. 일본 자금으로 가장 많이 매수된 자산군이라 되돌림 폭 큼.", created_at: "2026-07-09T01:48:00.000Z" },
    { alias: "판교 매 #85", content: "닛케이도 위험. 일본 수출주 위주라 엔 강세 시 이중 압력. 매크로 헤지 필요 시점.", created_at: "2026-07-09T01:50:00.000Z" },
  ],

  // ── 2026-07-08 신규 ──────────────────────────────────────────────────────
  [-241]: [
    { alias: "강남 황소 #78", content: "Co-packed Optics가 구리 대체면 발열도 줄어. 냉각 비용 절감되고 전력 효율 올라가. 데이터센터 TCO 계산하면 Kyber 랙이 압도적이야.", created_at: "2026-07-08T00:12:00.000Z" },
    { alias: "역삼 팔콘 #35", content: "멀티 랙 지원이 핵심이야. 단일 랙 넘어서 클러스터 전체 광연결이면 AI 학습 속도 자체가 달라져. GPU 수요가 Kyber 중심으로 재편돼.", created_at: "2026-07-08T00:10:00.000Z" },
    { alias: "서울숲 독수리 #66", content: "NVDA가 하드웨어+소프트웨어+아키텍처 다 장악하는 구조야. Kyber 랙 도입하면 CUDA 생태계 의존도 더 높아져. 경쟁사 진입 불가 해자.", created_at: "2026-07-08T00:09:00.000Z" },
  ],
  [-242]: [
    { alias: "마포 독수리 #14", content: "Optiwatts가 구독 모델이면 Tesla Energy에 MRR이 생기는 거야. Powerwall 판매 후에도 지속 수익. EV 구독 FSD랑 같은 구조야.", created_at: "2026-07-08T00:20:00.000Z" },
    { alias: "합정 황소 #53", content: "Wall Connector 통합이 중요해. 차량 충전 최적화까지 되면 집 전체 에너지 AI가 되는 거야. 이 생태계 나오면 경쟁사 이탈 불가능해.", created_at: "2026-07-08T00:18:00.000Z" },
    { alias: "홍대 황소 #29", content: "Powerwall 3F 기존 설치 고객이 Optiwatts 자동 업그레이드 대상이야. 기존 고객 재수익화 구조야. LTV 극대화.", created_at: "2026-07-08T00:17:00.000Z" },
    { alias: "청담 독수리 #71", content: "태양광+배터리+차량 통합 AI 관리. 경쟁사 중에 이 세 개 다 파는 곳이 없어. 테슬라만 가능한 풀 스택이야.", created_at: "2026-07-08T00:16:00.000Z" },
  ],
  [-243]: [
    { alias: "이태원 팔콘 #62", content: "전력 분배 TPM이면 Optimus 내부 전기 시스템 총괄이야. 이 자리 채우면 하드웨어 완성도 막바지 단계야. 양산 타임라인 가시화돼.", created_at: "2026-07-08T00:28:00.000Z" },
    { alias: "한남 황소 #37", content: "Palo Alto 정규직이면 장기 프로젝트야. 계약직 쓰면 단기 실험인데 정규직 채용은 본격 개발 선언이야.", created_at: "2026-07-08T00:26:00.000Z" },
  ],
  [-244]: [
    { alias: "방배 황소 #44", content: "저유가가 연준 금리 인하 논거 강화야. 에너지 항목 CPI 내려가면 핵심 인플레이션 압력 줄어들어. 성장주 수혜 구조 맞아.", created_at: "2026-07-08T00:36:00.000Z" },
    { alias: "대치 독수리 #19", content: "2020년 이후 첫 할인이 의미 있어. OPEC+ 결속력이 깨지는 신호일 수 있어. 사우디가 점유율 싸움 들어가면 유가 추가 하락 가능해.", created_at: "2026-07-08T00:34:00.000Z" },
  ],
  [-245]: [
    { alias: "논현 황소 #58", content: "QQQ 강제 매수 집행일이 포인트야. 패시브 자금은 가격 불문 시장가야. 그날 유동성이 일방향이야. 단기 트레이딩 기회.", created_at: "2026-07-08T00:44:00.000Z" },
    { alias: "도림 황소 #83", content: "기관 자격 취득이 더 큰 장기 변수야. 연기금·대학 기금이 SPCX 편입하기 시작하면 수급 구조 완전히 달라져.", created_at: "2026-07-08T00:42:00.000Z" },
    { alias: "문래 황소 #47", content: "WSJ 기사 나오면 개인 투자자 인지도 급증이야. 기관 편입+개인 유입 동시에 일어나면 수급 폭발이야.", created_at: "2026-07-08T00:41:00.000Z" },
    { alias: "인천 팔콘 #62", content: "Starlink 가입자 계속 늘어나고 있잖아. NASDAQ 편입으로 그 성장이 공개 시장에 반영되기 시작하는 거야. BUY 명확해.", created_at: "2026-07-08T00:40:00.000Z" },
    { alias: "가양 황소 #91", content: "편입 이후 리밸런싱까지 꾸준한 패시브 매수가 수개월 이어져. 단기 트레이딩보다 중기 포지션이 수익률 높아.", created_at: "2026-07-08T00:38:00.000Z" },
  ],
  [-246]: [
    { alias: "수서 황소 #68", content: "11개월로 GPU 1년 탄소 상쇄면 Cybercab 기업 구매 정당화 근거야. ESG 보고서에 Cybercab 도입 효과 넣을 수 있어. B2B 영업 완성이야.", created_at: "2026-07-08T00:52:00.000Z" },
    { alias: "서울숲 팔콘 #49", content: "전기 구동 배출 0이 탄소 상쇄 핵심이야. AI 서버 전력 소비 논란 커지는 시점에 Tesla가 해결책 포지션 잡는 거야.", created_at: "2026-07-08T00:50:00.000Z" },
    { alias: "왕십리 황소 #73", content: "탄소 크레딧 연계 가능성이 실제로 존재해. 운행 데이터 검증되면 크레딧 거래 수익 모델 추가 가능. EV 크레딧 선례 있어.", created_at: "2026-07-08T00:48:00.000Z" },
  ],
  [-247]: [
    { alias: "중구 황소 #56", content: "110억 마일 데이터가 통계적으로 압도적이야. 신뢰 구간이 좁아서 규제 기관이 반박할 수 없어. 이 데이터로 FSD 전국 허가 받는 거야.", created_at: "2026-07-08T01:00:00.000Z" },
    { alias: "역삼 독수리 #27", content: "대형 충돌 8배 감소가 보험사 설득 자료야. 보험료 인하 협상 성공하면 FSD 구독 가격 경쟁력 더 올라가. 선순환이야.", created_at: "2026-07-08T00:58:00.000Z" },
    { alias: "마포 팔콘 #91", content: "소형 충돌 7배, 도로이탈 6배도 다 검증됐어. 부분 사고까지 전체적으로 미국 평균 대비 우월해. 안전성 논쟁 종결이야.", created_at: "2026-07-08T00:57:00.000Z" },
    { alias: "합정 독수리 #34", content: "900만 대 플릿이 데이터 해자야. 매일 수백만 마일 추가되는 학습 데이터. 이 격차를 경쟁사가 따라잡으려면 10년은 걸려.", created_at: "2026-07-08T00:56:00.000Z" },
    { alias: "한남 독수리 #74", content: "미국 평균이 음주운전·과속 포함된 평균이야. FSD는 그런 변수가 없으니 실제 격차는 8배보다 더 클 수 있어.", created_at: "2026-07-08T00:54:00.000Z" },
    { alias: "청담 팔콘 #45", content: "p.77 공식 데이터가 있으면 FSD 풀 자율주행 인증 신청 자료로 쓸 수 있어. 규제 기관 제출 최강 무기 완성이야.", created_at: "2026-07-08T00:53:00.000Z" },
  ],
  [-248]: [
    { alias: "논현 팔콘 #38", content: "OTA 리콜 98%가 진짜 경쟁 우위야. 일반 자동차는 리콜 나면 딜러 방문 필수인데 테슬라는 자는 동안 업데이트 완료야. 서비스 비용 95% 절감이야.", created_at: "2026-07-08T01:08:00.000Z" },
    { alias: "방배 독수리 #81", content: "기능 300개가 출고 후에 추가된 거야. 2년 된 차가 출고 당시보다 기능 많아지는 게 일반 자동차는 불가능해. 보유 가치 증가 자산이야.", created_at: "2026-07-08T01:06:00.000Z" },
    { alias: "도림 독수리 #22", content: "소프트웨어 플랫폼 관점에서 테슬라가 iOS야. 하드웨어 판매 후에도 OS 업데이트로 사용자 경험 개선하는 구조. 애플 벨류에이션 일부 받아야 해.", created_at: "2026-07-08T01:05:00.000Z" },
    { alias: "인천 독수리 #47", content: "FSD 관련 업데이트 비중이 얼마나 되는지가 중요해. FSD 업데이트 많으면 구독 전환율에 직접 영향 줘. 300개 중 FSD 비중 공개 기대.", created_at: "2026-07-08T01:04:00.000Z" },
  ],
  [-249]: [
    { alias: "수서 팔콘 #93", content: "$0.77이 공인 임팩트 리포트 데이터야. 회사가 직접 낸 숫자라 신뢰도 높아. 소비자 구매 결정 근거로 쓸 수 있어.", created_at: "2026-07-08T01:16:00.000Z" },
    { alias: "가양 독수리 #31", content: "TCO 최저면 장기 소유 비용 관점에서 최적 선택이야. 초기 가격만 보는 소비자 관점 바꾸는 데이터야. 전기차 비싸다는 편견 종결이야.", created_at: "2026-07-08T01:14:00.000Z" },
    { alias: "문래 팔콘 #59", content: "10만 마일 타면 $8K 절감. 보험료+충전비+유지비 다 합산한 실질 절감액이 구매 결정 바꾸는 수준이야.", created_at: "2026-07-08T01:13:00.000Z" },
  ],
  [-250]: [
    { alias: "대치 팔콘 #76", content: "TTM $6B에 +67.7% 성장이면 성장률 가속 증명이야. 보통 규모 커지면 성장률 둔화되는데 PLTR은 반대야. AIP 수요 임계점 돌파 신호야.", created_at: "2026-07-08T01:24:00.000Z" },
    { alias: "중구 독수리 #89", content: "정부+민간 동반 급증이 PLTR 강점이야. 경기 침체 시 정부 계약 유지, 호황 시 민간 올라와. 양면 방어막이야.", created_at: "2026-07-08T01:22:00.000Z" },
    { alias: "왕십리 팔콘 #64", content: "고객 이탈률 낮은 게 핵심이야. CRM·ERP 데이터 연동 시스템은 빼기 어려워. 락인 효과로 매출 가시성 높아.", created_at: "2026-07-08T01:21:00.000Z" },
    { alias: "역삼 황소 #11", content: "$6B 연환산에 성장률 유지되면 2027년 $10B 가시권이야. P/S 재평가 시점 가까워지고 있어. 지금 포지션 빌드업 적기야.", created_at: "2026-07-08T01:20:00.000Z" },
    { alias: "이태원 독수리 #57", content: "AIP가 일반 AI 도구랑 달리 실제 운영 데이터 연동이야. 이건 API 교체로 해결 안 되는 영역이야. 진짜 해자야.", created_at: "2026-07-08T01:19:00.000Z" },
  ],
  [-251]: [
    { alias: "한남 황소 #92", content: "내부 경고 있는데 공개 강세면 정치적 필요 때문이야. 닷컴 버블 때도 연준이 늦게 경고했어. 내부 분석이 실제에 가까울 수 있어.", created_at: "2026-07-08T01:32:00.000Z" },
    { alias: "합정 팔콘 #77", content: "닷컴 버블 유사 경고가 구체적이야. 기대 수익 vs 실현 가능 수익 괴리. AI 인프라 ROI 실현 시점이 시장이 기대하는 것보다 늦을 수 있어.", created_at: "2026-07-08T01:30:00.000Z" },
    { alias: "청담 황소 #48", content: "헤징 전략이 맞아. 모멘텀 추종하면서 동시에 방어적 포지션 일부 유지. 버블 경고는 타이밍 불확실하지만 리스크 자체는 무시 못 해.", created_at: "2026-07-08T01:29:00.000Z" },
  ],
  [-252]: [
    { alias: "수서 독수리 #21", content: "레이먼드 제임스 $550은 강한 신호야. 보수적 기관이 이 숫자 낸 건 데이터 충분히 확인한 거야. 단순 모멘텀 타겟이 아니야.", created_at: "2026-07-08T01:40:00.000Z" },
    { alias: "서울숲 팔콘 #83", content: "Strong Buy에 상당한 업사이드면 지금 진입이 정당화돼. 패시브 매수+기관 커버리지 확대까지 수급 삼박자야.", created_at: "2026-07-08T01:38:00.000Z" },
    { alias: "도림 황소 #67", content: "Starship 상업화 타임라인 맞물리면 $550도 보수적일 수 있어. 재사용 비용 혁신이 우주 산업 판도 바꾸면 밸류에이션 다시 써야 해.", created_at: "2026-07-08T01:37:00.000Z" },
    { alias: "방배 황소 #13", content: "기존 SPCX 보유자한테 최고의 날이야. 강제 매수+목표가 상향 동시에 나오면 수급이 일방향이야. 포지션 유지 당연하지.", created_at: "2026-07-08T01:36:00.000Z" },
    { alias: "논현 황소 #78", content: "Starlink 가입자 계속 증가하는데 이게 아직 $550에 충분히 반영 안 됐을 수 있어. 매출 가시성 높은 구독 사업이야.", created_at: "2026-07-08T01:34:00.000Z" },
    { alias: "인천 황소 #41", content: "QQQ 편입+목표가 $550 같은 날 나온 게 타이밍 완벽해. 단기 모멘텀 + 장기 성장성 동시에 검증된 날이야.", created_at: "2026-07-08T01:33:00.000Z" },
  ],
  [-253]: [
    { alias: "가양 황소 #46", content: "텍사스 삼각지대가 이미 커버되고 있어. 오스틴→포트워스→달라스가 연결되면 미국 4위 대도시권 전체가 Cybercab 서비스 구역이야.", created_at: "2026-07-08T01:48:00.000Z" },
    { alias: "문래 황소 #82", content: "기가텍사스 로컬 배차가 최단 경로야. 물류 비용 최소화하면서 배차 효율 극대화. 텍사스가 최적 런치 마켓인 이유야.", created_at: "2026-07-08T01:46:00.000Z" },
    { alias: "서울숲 황소 #37", content: "텍사스 규제 환경이 자율주행 우호적이야. 여기서 완전 상용화 확정되면 캘리포니아·플로리다 도미노야. 전국 확장 플레이북이야.", created_at: "2026-07-08T01:45:00.000Z" },
    { alias: "대치 황소 #91", content: "DFW 공항 픽업만으로도 단위 수익성 높아. 출장객 수요는 요금 탄력성 낮고 반복 이용률 높아. 수익 모델 완성이야.", created_at: "2026-07-08T01:44:00.000Z" },
    { alias: "중구 팔콘 #28", content: "여러 거점에서 동시 포착이면 단순 테스트 넘어선 거야. 운영 규모가 상업 서비스 직전 단계야. 타임라인 가시화됐어.", created_at: "2026-07-08T01:43:00.000Z" },
    { alias: "왕십리 독수리 #55", content: "텍사스 번호판이라는 게 로컬 차량이야. 기가텍사스에서 직접 배차하는 실증 데이터야. 상업 런칭 전 최종 점검 단계야.", created_at: "2026-07-08T01:42:00.000Z" },
    { alias: "이태원 황소 #71", content: "포착 영상 보면 회피 없이 정상 주행해. 테스트 티 안 나는 수준이면 소프트웨어 성숙도 검증됐어. 상용화 리스크 낮아졌어.", created_at: "2026-07-08T01:41:00.000Z" },
  ],
  [-254]: [
    { alias: "역삼 팔콘 #81", content: "EBITDA 마진 21%가 시작이야. 스케일 올라가면 30%+ 가능해. 자동차 OEM 7~10% 대비 세 배야. 완전히 다른 사업이야.", created_at: "2026-07-08T01:56:00.000Z" },
    { alias: "한남 팔콘 #67", content: "운전기사 ZERO가 근본적 원가 혁신이야. 웨이모는 원격 모니터링 인력 있어서 규모 키울수록 인건비 늘어나. 구조적 격차야.", created_at: "2026-07-08T01:54:00.000Z" },
    { alias: "합정 황소 #88", content: "대당 연 $14.7만 매출이면 차량 가격 2~3년 회수야. 플릿 사업자들이 Cybercab 구매 안 할 이유 없어. B2B 수요 폭발 예상해.", created_at: "2026-07-08T01:53:00.000Z" },
    { alias: "청담 팔콘 #22", content: "3만 대 플릿이 Tesla 신규 사업 부문으로 재평가받는 거야. 에너지 부문이랑 합산하면 EV 판매 비중이 내려가. 다각화 완성이야.", created_at: "2026-07-08T01:52:00.000Z" },
    { alias: "논현 독수리 #46", content: "Morgan Stanley 목표 달성되면 밸류에이션 대폭 상향이야. 로보택시 사업 부문 별도 밸류에이션 받는 구조야. 2030년 기대값이 현재 주가에 반영 안 됐어.", created_at: "2026-07-08T01:50:00.000Z" },
    { alias: "서울숲 독수리 #52", content: "스케일 확장 시 단위 비용 추가 하락이야. 보험비·정비비·전력비 모두 규모 경제 효과 받아. 마진 30%+ 현실적이야.", created_at: "2026-07-08T01:49:00.000Z" },
    { alias: "방배 황소 #96", content: "2030년까지 시간 있어. 그 사이에 Cybercab 생산 스케일업 확인되면 포지션 추가. 지금 포지션 빌드업 적기야.", created_at: "2026-07-08T01:48:00.000Z" },
  ],
  [-255]: [
    { alias: "도림 황소 #38", content: "Ramp 실제 결제 데이터라는 게 신뢰도 최고야. 설문이 아니라 돈 흐름이잖아. Anthropic 1위가 진짜라는 거야.", created_at: "2026-07-08T02:04:00.000Z" },
    { alias: "대치 팔콘 #53", content: "Anthropic 1위=AI 인프라 수요 증가=NVDA 수혜야. 어떤 AI 회사가 1위 해도 GPU 수요는 늘어나. NVDA가 최대 수혜자야.", created_at: "2026-07-08T02:02:00.000Z" },
    { alias: "인천 독수리 #84", content: "Google 5.65%가 흥미로워. 자체 인프라 있어서 외부 결제 안 한 거야. 기업 AI 시장에서 Google이 밀린다는 신호이기도 해.", created_at: "2026-07-08T02:01:00.000Z" },
    { alias: "문래 독수리 #71", content: "안전성 강점이 기업 구매 결정 요인이라는 게 증명됐어. Anthropic 안전 연구가 실제 시장 점유율로 전환된 거야.", created_at: "2026-07-08T02:00:00.000Z" },
  ],
  [-256]: [
    { alias: "가양 팔콘 #57", content: "Wood Mackenzie 보수적 기관인데 15GW+ 낸 거야. 실제 수주 파이프라인 확인한 숫자일 거야. 신뢰도 높아.", created_at: "2026-07-08T02:12:00.000Z" },
    { alias: "수서 황소 #44", content: "UK·유럽·호주 세 시장이 재생에너지 전환 속도 빠른 시장이야. Megapack 수요 가장 급증하는 곳에서 15GW. Tesla Energy 글로벌 확장 직접 증명이야.", created_at: "2026-07-08T02:10:00.000Z" },
    { alias: "중구 독수리 #37", content: "Tesla Energy가 두 번째 성장 엔진이면 EV 판매 의존도가 희석돼. 에너지 인프라 기업 P/S 멀티플이 자동차 기업이랑 달라. 재평가 여력 있어.", created_at: "2026-07-08T02:09:00.000Z" },
    { alias: "역삼 독수리 #94", content: "2028년까지 15GW면 연간 5GW 공급이야. Megapack 생산 속도 기가네바다 확장 속도랑 맞아야 하는데 지금 추세면 달성 가능해.", created_at: "2026-07-08T02:08:00.000Z" },
    { alias: "왕십리 황소 #29", content: "유럽 에너지 안보 이슈로 저장 인프라 투자 서두르는 거야. 러시아 의존 탈피하려면 재생에너지+Megapack 세트가 필수야. 수요 구조적이야.", created_at: "2026-07-08T02:07:00.000Z" },
  ],

  // ── 2026-07-07 신규 ──────────────────────────────────────────────────────
  [-229]: [
    { alias: "서초 독수리 #44", content: "5시간 무개입이 단일 이벤트가 아닌 거야. 반복 검증됐다는 거잖아. 규제 기관이 '우리도 믿을 수 있다'는 데이터야. 7/30 TCMV 표결 앞두고 최고의 타이밍이야.", created_at: "2026-07-07T00:12:00.000Z" },
    { alias: "여의도 매 #96", content: "Cybercab 원가 $30K면 $0.25/마일에 수익이야. 기사 없으면 인건비 전부 이익이야. 웨이모는 원격 모니터링 인력 비용이 있어서 구조적으로 못 따라와.", created_at: "2026-07-07T00:10:00.000Z" },
    { alias: "마포 황소 #57", content: "HW3까지 v14 Lite 배포가 진짜야. 400만 대가 모두 이 수준이 된다는 거야. 구독 전환 flywheel 완성이야.", created_at: "2026-07-07T00:09:00.000Z" },
  ],
  [-230]: [
    { alias: "압구정 황소 #33", content: "Lamar Blvd 45회가 최다 노선이야. 이게 상업지구 연결 노선이잖아. 수익성 높은 루트 집중 운영 전략이야. 데이터 기반 최적화야.", created_at: "2026-07-07T00:20:00.000Z" },
    { alias: "강남 매 #17", content: "오스틴 0건이 다음 도시 승인 데이터가 된 거야. 뉴올리언스, 마이애미 롤아웃이 빨라질 수밖에 없어. 도미노처럼 도시 추가돼.", created_at: "2026-07-07T00:18:00.000Z" },
  ],
  [-231]: [
    { alias: "영등포 황소 #52", content: "$415 목표가가 로보택시 대규모 매출 반영 전이라는 게 중요해. 연말 1,500대 달성 확인되면 목표가 500 넘길 수 있어.", created_at: "2026-07-07T00:28:00.000Z" },
    { alias: "잠실 매 #84", content: "1,500대 × 일 $120 수익 × 365일 = 연 $65.7M이야. 보수적인 계산이고 30,000대 되면 연 $1.3B야. 이게 순이익에 고스란히 붙어.", created_at: "2026-07-07T00:26:00.000Z" },
  ],
  [-232]: [
    { alias: "노원 독수리 #63", content: "일본 +283%가 숫자가 이상한 거 아니야. 2025년 조정 기저 위에 리프레시 Model Y 신수요야. 도요타 홈에서 외국 브랜드 2위는 역사적이야.", created_at: "2026-07-07T00:36:00.000Z" },
    { alias: "성북 황소 #28", content: "영국 FSD EU 승인 전 2위야. 승인 후 1위 가능성 충분해. 유럽 최대 EV 수요 시장 중 하나에서 이 포지션이면 대단해.", created_at: "2026-07-07T00:34:00.000Z" },
  ],
  [-233]: [
    { alias: "종로 황소 #71", content: "7/30 TCMV 표결이 단순 승인이 아니야. EU 27개국 동시 진입 여부야. 통과하면 유럽 FSD 시장 전체가 열리는 거야. 단기 가장 강력한 촉매야.", created_at: "2026-07-07T00:44:00.000Z" },
    { alias: "용산 황소 #35", content: "독일이 준비됐다는 게 EU 내 최대 자동차 시장 선제 공략이야. BMW·벤츠 홈그라운드에서 FSD 런칭이면 브랜드 충격 효과도 있어.", created_at: "2026-07-07T00:42:00.000Z" },
  ],
  [-234]: [
    { alias: "강서 독수리 #48", content: "QQQ AUM이 $250B야. 거기서 SPCX 비중만큼 강제 매수야. 이게 수급이야. 주가 하방이 패시브 수요로 지지되는 구조야.", created_at: "2026-07-07T00:52:00.000Z" },
    { alias: "광진 황소 #39", content: "NASDAQ 100에서 SpaceX가 유일한 우주+AI 순수 플레이야. 테마 투자 수요까지 흡수해. 섹터 수요 독점 포지션이야.", created_at: "2026-07-07T00:50:00.000Z" },
    { alias: "도봉 황소 #54", content: "IPO $17 → NASDAQ 100 편입 이 속도. 상장 초기에 진입한 투자자 수익 구조 증명이야. 신규 편입 후 첫 리밸런싱에서 수급 폭발해.", created_at: "2026-07-07T00:49:00.000Z" },
  ],
  [-235]: [
    { alias: "성동 황소 #77", content: "Tepper는 닷컴 버블, 금융위기 타이밍 다 맞춘 사람이야. Q1 TSLA 신규 진입이면 AI+로보틱스 사이클 시작 확신한 거야.", created_at: "2026-07-07T01:00:00.000Z" },
    { alias: "중랑 매 #22", content: "기관 13F 데이터가 선행지표야. 개인 투자자들이 볼 때는 기관이 이미 쌓아놓은 구간이야. 늦지 않았어.", created_at: "2026-07-07T00:58:00.000Z" },
  ],
  [-236]: [
    { alias: "양천 독수리 #63", content: "HR 전체 폐지가 가장 충격적이야. AI 에이전트가 HR 기능 대체하는 내부 실험 성공 선언이야. 이게 외부 기업에 Copilot 팔 때 설득력이야.", created_at: "2026-07-07T01:08:00.000Z" },
    { alias: "관악 황소 #51", content: "$720M 연 절감이 Azure AI 인프라 투자로 간다는 게 핵심이야. 이익 내면서 투자하는 flywheel이야.", created_at: "2026-07-07T01:06:00.000Z" },
  ],
  [-237]: [
    { alias: "은평 황소 #34", content: "기가 상하이가 Model Y 생산 램프업 역대 최단 기록이잖아. 그 노하우로 Optimus 만들면 1년 안에 수만 대 가능해. 아시아 시장 먼저 먹는 거야.", created_at: "2026-07-07T01:16:00.000Z" },
    { alias: "강동 독수리 #89", content: "중국 공장 = 중국 시장 직접 접근이야. 중국 제조업 자동화 수요가 전 세계 최대야. 이걸 원가 우위로 공략하는 거야.", created_at: "2026-07-07T01:14:00.000Z" },
    { alias: "구로 황소 #61", content: "Optimus 밸류에이션이 EV 회사 기준이면 틀린 거야. 로보틱스 회사로 재평가되면 현재 주가가 싼 거야.", created_at: "2026-07-07T01:13:00.000Z" },
  ],
  [-238]: [
    { alias: "신촌 황소 #46", content: "UBS 업그레이드가 SK하이닉스 61% 보고 나온 거잖아. 선행지표 확인 후 정밀 분석이야. MU 다음 어닝에서 비슷한 숫자 나오면 주가 폭발이야.", created_at: "2026-07-07T01:24:00.000Z" },
    { alias: "마포 팔콘 #38", content: "AI 서버 HBM 수요가 사이클 리스크를 덮는다는 게 핵심이야. Burry가 이 변수 과소평가한 거야. 기다리면 된다.", created_at: "2026-07-07T01:22:00.000Z" },
  ],
  [-239]: [
    { alias: "서초 황소 #73", content: "시각장애인 연맹 체험 데이터가 규제 로비 자료가 되는 거야. 미국 장애인 단체는 의회 영향력 강해. FSD 인허가 속도에 직접 영향 줘.", created_at: "2026-07-07T01:32:00.000Z" },
    { alias: "강남 팔콘 #52", content: "Giga Berlin 스타트업 단지가 유럽 AI 인재 흡수야. 7/30 TCMV 표결 앞두고 유럽에서 긍정적 이미지 쌓는 전략이야.", created_at: "2026-07-07T01:30:00.000Z" },
  ],
  [-240]: [
    { alias: "동작 독수리 #66", content: "Cosmic Silver Diamond 나오면 ASP $2K~$3K 올라가는 거야. 판매량 같아도 매출이 올라. Q3 마진에 직접 반영돼.", created_at: "2026-07-07T01:40:00.000Z" },
    { alias: "강북 황소 #15", content: "Morgan Stanley 포트폴리오 재편이 시장 트렌드 선행지표야. 기관들이 AI 대체 속도 과소평가했다가 수정하는 거야. TSLA가 대안 수혜야.", created_at: "2026-07-07T01:38:00.000Z" },
    { alias: "노원 매 #87", content: "BKNG·META 매도 논리가 AI 에이전트 완전 대체야. 이게 맞다면 예약·광고 플랫폼 전체가 AI로 바뀌는 거야. 수혜주를 찾아야 해.", created_at: "2026-07-07T01:37:00.000Z" },
  ],

  // ── 2026-07-06 신규 ──────────────────────────────────────────────────────
  [-221]: [
    { alias: "여의도 황소 #55", content: "Cybercab 생산 테스트 + 100대 비지도 동시야. 이걸 같은 날 발표한 거잖아. 7월 22일 어닝에서 로보택시 매출 첫 인식 나오면 완전히 다른 종목이 되는 거야.", created_at: "2026-07-06T00:13:00.000Z" },
    { alias: "강남 독수리 #41", content: "비지도 신도시 직런칭이 핵심이야. 감독 단계 건너뛴다는 건 내부 신뢰도 테스트 통과 선언이야. 외부 규제 기관도 암묵적 동의한 거야.", created_at: "2026-07-06T00:11:00.000Z" },
    { alias: "마포 황소 #62", content: "FSD v14 HW3 배포로 400만대가 무료 체험자가 돼. 이게 퍼널이야. 체험 → 구독 전환율 10%만 되어도 40만 추가.", created_at: "2026-07-06T00:09:00.000Z" },
    { alias: "서초 팔콘 #77", content: "Lara Morley '쿨뉴스' 예고. Cybercab 대량 생산 발표 임박이야. 선제 포지션 추천.", created_at: "2026-07-06T00:07:00.000Z" },
    { alias: "동작 황소 #33", content: "FSD 1.29M + 7/22 어닝 + Cybercab 생산 3개 동시에 트리거야. 이런 삼중 호재 겹치는 경우 드물어. BUY.", created_at: "2026-07-06T00:05:00.000Z" },
  ],
  [-222]: [
    { alias: "강동 팔콘 #19", content: "1.29M 구독이 연환산 $1.5B~$3B이야. 그런데 이게 고마진이야. 광고비 없는 순수 소프트웨어 구독이야. 이 숫자가 매 분기 17% 이상 복리로 커지면 어디까지 가냐.", created_at: "2026-07-06T00:21:00.000Z" },
    { alias: "용산 독수리 #58", content: "SPCX $230 타겟이 이 FSD 구독 모델 반영한 거야. +54% 업사이드면 지금이 진입 구간이야.", created_at: "2026-07-06T00:19:00.000Z" },
    { alias: "은평 황소 #84", content: "유럽 구독 개방까지 되면 TAM이 2배야. 유럽 테슬라 오너 수백만에 월 구독 돌아가기 시작하면.", created_at: "2026-07-06T00:17:00.000Z" },
  ],
  [-223]: [
    { alias: "노원 팔콘 #37", content: "특화 태스크 4.7배가 범용으로 확장되면 그때 진짜 위협이야. 근데 그건 수년 후 이야기야. 지금 H100·B200 수요에 영향 없어.", created_at: "2026-07-06T00:29:00.000Z" },
    { alias: "도봉 황소 #63", content: "40nm으로 이걸 냈다는 게 설계 최적화 능력이야. 근데 NVDA는 계속 다음 세대 나오잖아. 격차가 유지되는 이유가 있어.", created_at: "2026-07-06T00:27:00.000Z" },
    { alias: "강북 독수리 #45", content: "주가 조정 나오면 분할 매수야. 중국발 특화 칩이 NVDA 전체 수요 구조를 바꾸지 못해.", created_at: "2026-07-06T00:25:00.000Z" },
  ],
  [-224]: [
    { alias: "양천 황소 #51", content: "SK하이닉스 61%가 MU 선행지표라는 논리 맞아. 동일 업종 동일 제품 방향성이야. MU 다음 어닝 기대값 올려야 해.", created_at: "2026-07-06T00:37:00.000Z" },
    { alias: "신촌 독수리 #22", content: "Burry 공매도 베팅이 어려워지는 거야. AI 메모리 고마진이 사이클 하락 리스크를 덮는 구조야.", created_at: "2026-07-06T00:35:00.000Z" },
  ],
  [-225]: [
    { alias: "성동 팔콘 #84", content: "TPU 자급 = 클라우드 업체한테 안 줘도 되는 돈이야. 연간 수십억달러야. 그게 전부 이익으로 간다는 거야.", created_at: "2026-07-06T00:45:00.000Z" },
    { alias: "중랑 황소 #33", content: "2028 순이익 2배는 유튜브 + 검색 + Cloud 세 개 AI 수익화 동시야. 구글이 이걸 다 가진 게 핵심이야.", created_at: "2026-07-06T00:43:00.000Z" },
  ],
  [-226]: [
    { alias: "관악 독수리 #71", content: "$576B의 현실을 다시 보자. 한국 GDP의 40%가 AI 인프라 하나에. 이게 매년 증가하는 거야. NVDA가 이 흐름의 인프라야.", created_at: "2026-07-06T00:53:00.000Z" },
    { alias: "강서 팔콘 #29", content: "2027 $939B이면 1조야. 1조 달러 시장에서 NVDA 점유율 80%면 $750B+ 매출이야. 현재 밸류에이션 말이 되네.", created_at: "2026-07-06T00:51:00.000Z" },
    { alias: "양재 황소 #48", content: "전력 인프라가 진짜 병목이 되고 있어. GPU 있어도 전기 없으면 못 돌려. 유틸리티·원전 주식이 AI 수혜주야.", created_at: "2026-07-06T00:49:00.000Z" },
  ],
  [-227]: [
    { alias: "목동 팔콘 #55", content: "EU 안전 의무화가 테슬라한테 공짜 해자야. 돈 한 푼 안 쓰고 경쟁사 진입 비용 높아지는 거야. 규제가 테슬라 편이 됐어.", created_at: "2026-07-06T01:01:00.000Z" },
    { alias: "홍대 독수리 #38", content: "DeSantis + 미국산 #1 + EU 규제 수혜. 정치·규제·무역 세 방향 헤지. 포지션 유지 이유가 계속 쌓이네.", created_at: "2026-07-06T00:59:00.000Z" },
  ],
  [-228]: [
    { alias: "송파 황소 #64", content: "7/22 어닝 전 SPCX 포지션이야. FSD 구독 + 로보택시 + Cybercab 생산 삼중 트리거 다 들어있어. $230 타겟 맞는 것 같아.", created_at: "2026-07-06T01:09:00.000Z" },
    { alias: "마포 팔콘 #17", content: "소프트웨어 회사로 재평가받는 순간 PER이 완전히 달라져. 지금 그 전환점이야. SPCX로 TSLA 비중 늘리는 게 맞아.", created_at: "2026-07-06T01:07:00.000Z" },
    { alias: "신촌 황소 #91", content: "구독 수익 + 로보택시 수익 두 개가 동시에 가시화되는 거야. 밸류에이션 리레이팅 필연적이야.", created_at: "2026-07-06T01:05:00.000Z" },
  ],

  // ── 2026-07-03 신규 ──────────────────────────────────────────────────────
  [-207]: [
    { alias: "여의도 황소 #88", content: "컨센 대비 +18% 초과가 진짜야. 이걸 맞힌 애널리스트가 없어. 7월 22일 실적 발표에서 가이던스 상향 나오면 다음 레벨이야.", created_at: "2026-07-03T00:15:00.000Z" },
    { alias: "강남 팔콘 #33", content: "에너지 13.5 GWh가 조용히 대박이야. 자동차만 보던 사람들 에너지 사업 봐야 해. 독립 사업부 밸류에이션 시작되면 주가 재산정이야.", created_at: "2026-07-03T00:12:00.000Z" },
    { alias: "마포 독수리 #54", content: "중국 8개월 연속. BYD 공세 속에서 이게 가능한 거야? 상하이 공장 수출 허브 역할 + FSD 개방 기대감이 합쳐진 거야.", created_at: "2026-07-03T00:10:00.000Z" },
    { alias: "잠실 황소 #71", content: "역대 Q2 최고 기록이야. 숫자가 모든 걸 말해줘. Q3 가이던스만 기다리면 돼.", created_at: "2026-07-03T00:08:00.000Z" },
  ],
  [-208]: [
    { alias: "서초 팔콘 #42", content: "에너지 마진이 자동차 마진 추월 타이밍 이야기가 현실화되는 것 같아. AI 데이터센터 전력 수요 = 메가팩 수요. 로직이 완벽해.", created_at: "2026-07-03T00:23:00.000Z" },
    { alias: "동작 황소 #19", content: "+40% YoY 유지하면서 볼륨 키우는 게 이게 진짜 성장이야. 메가팩 공장 더 짓겠다는 발표 기다려.", created_at: "2026-07-03T00:21:00.000Z" },
  ],
  [-210]: [
    { alias: "강서 황소 #66", content: "Gen-3 양산 준비가 사람 손 수준이라는 게 말이 돼? 2년 전이랑 비교하면 다른 세상이야. Optimus TAM이 EV 시장 몇 배야.", created_at: "2026-07-03T00:39:00.000Z" },
    { alias: "양천 팔콘 #28", content: "외판 첫 계약 발표 나오는 날이 진짜 변곡점이야. 그날 주가 얼마일지 궁금해.", created_at: "2026-07-03T00:37:00.000Z" },
    { alias: "구로 독수리 #51", content: "실제로 봤는데 손가락 움직임이 소름이야. 달걀 집는 거 아무 로봇도 못 했는데 해냈어.", created_at: "2026-07-03T00:35:00.000Z" },
  ],
  [-211]: [
    { alias: "성동 황소 #37", content: "기업 AI 전환 원스톱이 Azure+Copilot+GitHub 패키지야. 경쟁사 이 세 개 다 가진 데 없어. MS 해자야.", created_at: "2026-07-03T00:47:00.000Z" },
    { alias: "중랑 팔콘 #18", content: "$2.5B는 씨드야. 성과 나오면 두 배 확장해. 기업 AI 컨설팅 시장이 $100B 이상이야.", created_at: "2026-07-03T00:45:00.000Z" },
  ],
  [-213]: [
    { alias: "강북 황소 #29", content: "생성형 AI 광고 ROI가 경쟁사보다 높다는 거 광고주들이 다 알아. 예산 이동이 자동으로 일어나는 구조야. 가이던스 상향 또 올 거야.", created_at: "2026-07-03T01:03:00.000Z" },
    { alias: "도봉 팔콘 #44", content: "$200B CapEx 봤을 때 처음에 겁났는데 EPS 레버리지 계산해보니 말이 되네. Outperform 맞아.", created_at: "2026-07-03T01:01:00.000Z" },
  ],
  [-214]: [
    { alias: "노원 황소 #63", content: "57K면 경기 냉각이야. 연준이 9월 인하 안 할 이유가 없어. 방어주 로테이션 더 갈 수 있어.", created_at: "2026-07-03T01:11:00.000Z" },
    { alias: "은평 팔콘 #21", content: "고용 미스 + 섹터 로테이션 + 가계현금 8% 최고치. 세 개가 같이 나왔어. 방어적 포지션이 지금 정답이야.", created_at: "2026-07-03T01:09:00.000Z" },
    { alias: "서대문 독수리 #77", content: "Ford -10.3%도 같이 나왔어. 생산 차질 + EV 수요 감소. 이게 경기 냉각 신호랑 맞아 떨어져.", created_at: "2026-07-03T01:07:00.000Z" },
  ],
  [-215]: [
    { alias: "관악 황소 #82", content: "다우 ATH + IT -2.37% 동시에 나오는 게 클래식 로테이션이야. 이 구간 방어주 비중 늘리는 게 정석이야.", created_at: "2026-07-03T01:19:00.000Z" },
    { alias: "동작 팔콘 #55", content: "가계 현금 8% 95년 최고치인데 이 돈 어디 가야 해? 지금은 방어주로 흘러가고 있어. 다음은 모를 일이야.", created_at: "2026-07-03T01:17:00.000Z" },
    { alias: "용산 독수리 #34", content: "$241B AI 투자 수익성 의문이 나오는 거 당연해. 얼마나 BEP 되는지 증명해야 할 시간이 왔어.", created_at: "2026-07-03T01:15:00.000Z" },
  ],
  [-216]: [
    { alias: "마포 황소 #17", content: "FSD+Grok AI 내장이 진짜 차별점이야. 이제 차 사면 AI 구독이 같이 오는 거잖아. 생태계 락인 속도가 애플이랑 비슷한 방식이야.", created_at: "2026-07-03T01:36:00.000Z" },
    { alias: "양재 팔콘 #63", content: "8인승에 527km 동시 확보한 EV가 경쟁사에 없어. 팰리세이드·카니발 교체 수요 다 먹을 수 있어. 패밀리카 시장 TSLA로 넘어오는 게 시작이야.", created_at: "2026-07-03T01:34:00.000Z" },
    { alias: "목동 독수리 #41", content: "50kW 무선충전 전 열이면 배터리 걱정 0야. 어댑티브 댐핑에 어쿠스틱 글라스까지. 이거 타다가 다른 차 못 타는 구조야.", created_at: "2026-07-03T01:32:00.000Z" },
    { alias: "신촌 황소 #88", content: "Q2 납품 신기록 발표한 날 신차까지 출시. 주가 모멘텀 레이어링 전략이 교과서야. 7월 22일 실적 발표까지 상승 이유가 계속 쌓이네.", created_at: "2026-07-03T01:30:00.000Z" },
    { alias: "홍대 팔콘 #29", content: "Grok AI 차량 내장이 FSD 데이터 학습과 연결되면 자율주행 품질 가속이야. 이 시너지를 모르는 사람이 너무 많아.", created_at: "2026-07-03T01:28:00.000Z" },
  ],
  // ── 2026-07-04 신규 ──────────────────────────────────────────────────────
  [-217]: [
    { alias: "도봉 팔콘 #44", content: "비감독 5도시 동시. 숫자가 전부야. 웨이모 vs 테슬라 비교 자체가 의미없어. 생산 속도·비용 구조·커버리지 전부 달라. 테슬라가 게임을 바꿔버린 거야.", created_at: "2026-07-04T00:14:00.000Z" },
    { alias: "강서 황소 #55", content: "FSD 독일 + 로보택시 5도시가 같은 날 터졌어. 유럽 구독 수익 + 미국 로보택시 수익 동시 점화야. 7월 22일 실적 발표 어떻게 나오냐가 관건이야.", created_at: "2026-07-04T00:12:00.000Z" },
    { alias: "마포 독수리 #29", content: "AI $200 상한이 진짜 조용한 알파야. 경쟁사들이 AI 비용으로 피 흘릴 때 테슬라는 Dojo로 10분의 1도 안 쓴다는 거잖아. 마진 차이가 몇 년 후 밸류에이션 리레이팅으로 이어질 거야.", created_at: "2026-07-04T00:10:00.000Z" },
    { alias: "신촌 팔콘 #73", content: "FSD 기소 건 보면 운전자 개인 책임으로 정리되는 선례야. Tesla 법인 면책이 법적으로 굳혀지면 오히려 로보택시 확장에 법적 장벽이 낮아지는 거 아닌가.", created_at: "2026-07-04T00:08:00.000Z" },
    { alias: "용산 황소 #41", content: "목표가 $340으로 상향 동의해. 로보택시 + FSD EU + AI 원가 절감 세 개가 동시에 나온 날이야. 이런 날이 자주 오지 않아.", created_at: "2026-07-04T00:06:00.000Z" },
    { alias: "송파 독수리 #87", content: "Cybercab 오스틴 생산 시작까지. 오늘 뉴스만으로 포지션 추가할 이유가 충분해.", created_at: "2026-07-04T00:04:00.000Z" },
    { alias: "은평 팔콘 #62", content: "EU 규제가 제일 어렵다고 했는데 독일 MP가 직접 확인해줬어. 이거 진짜야. 유럽 론칭 도미노 시작이야.", created_at: "2026-07-04T00:02:00.000Z" },
  ],
  [-218]: [
    { alias: "여의도 황소 #88", content: "AI 팩토리 수익 공유 = 애플 앱스토어 수수료 모델이야. GPU 팔고 끝이 아니라 생태계 세금 걷는 거야. 이 구조 완성되면 NVDA 멀티플 한 번 더 올라가.", created_at: "2026-07-04T00:22:00.000Z" },
    { alias: "강남 팔콘 #33", content: "소형 AI 클라우드 사업자들이 이제 NVDA 생태계 밖으로 못 나가. 신용 지원으로 진입시키고 수익 공유로 묶어버리는 구조야. 모트가 더 깊어지는 거야.", created_at: "2026-07-04T00:20:00.000Z" },
    { alias: "중랑 독수리 #48", content: "Rubin Ultra 2027까지 이 모멘텀 이어지면 지금 목표가들 다 낮은 거야. $200 목표 상향 충분히 근거 있어.", created_at: "2026-07-04T00:18:00.000Z" },
    { alias: "동작 황소 #22", content: "AMD가 아무리 MI300X 내봤자 이 에코시스템은 못 따라가. CUDA + 인프라 + 수익공유 패키지. 반도체 역사상 이런 해자는 없었어.", created_at: "2026-07-04T00:16:00.000Z" },
    { alias: "광진 팔콘 #57", content: "클라우드 파트너 매출 성장 → NVDA 반복수익 성장. 이 레버리지가 하드웨어 사이클 의존도를 낮춰줘. 훨씬 안정적인 비즈니스가 되는 거야.", created_at: "2026-07-04T00:14:00.000Z" },
  ],
  [-219]: [
    { alias: "서초 황소 #44", content: "에이전트 부진 = 광고 부진 아니라는 게 핵심이야. 광고 AI는 따로 잘 돌아가고 있잖아. 단기 하락 나오면 오히려 매수 기회야.", created_at: "2026-07-04T00:30:00.000Z" },
    { alias: "강동 팔콘 #19", content: "Zuckerberg가 직접 인정했다는 게 오히려 좋아. 투자자한테 솔직한 경영진이 과대포장하는 경영진보다 낫거든. capex $60B 유지한다니까 포기 아냐.", created_at: "2026-07-04T00:28:00.000Z" },
    { alias: "노원 독수리 #71", content: "Llama 오픈소스는 장기 AI 생태계 헤게모니 게임이야. 에이전트 한 분기 부진이 이걸 흔들지 않아. 중기 뷰 변화 없어.", created_at: "2026-07-04T00:26:00.000Z" },
    { alias: "성동 황소 #38", content: "목표가 $700 유지 동의해. WhatsApp AI + Instagram AI가 광고 수익 레버로 돌아오는 게 보여. 에이전트는 그 다음 레이어야.", created_at: "2026-07-04T00:24:00.000Z" },
  ],
  [-220]: [
    { alias: "양재 황소 #63", content: "Burry가 2015 AAPL, 2018 GOOGL 공매도 다 틀렸어. 그래도 2008 MBS는 맞췄지. 이번에 맞을지 틀릴지는 HBM 사이클 데이터가 판단해줄 거야.", created_at: "2026-07-04T00:38:00.000Z" },
    { alias: "목동 팔콘 #41", content: "GB200 출하 물량 이미 확정된 거야. MU HBM3e 수요가 꺾이려면 NVDA가 수주 취소해야 하는데 그게 가능한 상황이야? 아닌 것 같은데.", created_at: "2026-07-04T00:36:00.000Z" },
    { alias: "홍대 독수리 #29", content: "다음 13F에서 포지션 규모 얼마냐가 관건이야. 소규모 옵션 포지션이면 헤지일 수도 있어. 사이즈 보고 판단해야 해.", created_at: "2026-07-04T00:34:00.000Z" },
    { alias: "신정 황소 #55", content: "메모리 사이클 고점 논란은 매 분기마다 나왔어. 그때마다 AI HBM 수요가 꺾일 기미가 없었고. 8월 실적 발표가 결론 낼 거야.", created_at: "2026-07-04T00:32:00.000Z" },
    { alias: "구로 팔콘 #18", content: "MU 단기 하락 나오면 추가 매수 기회로 봐. Burry 공매도 뉴스 자체가 단기 공포 심리 유발하지만 펀더멘털은 안 변했어.", created_at: "2026-07-04T00:30:00.000Z" },
    { alias: "강북 독수리 #83", content: "$900 목표가 유지. Burry의 베팅 자체가 리스크 관리 신호이긴 한데 방향이 틀렸다고 봐. AI HBM3e 단기 수요 사이클은 2027까지야.", created_at: "2026-07-04T00:28:00.000Z" },
  ],
  // ── 2026-07-01 신규 ──────────────────────────────────────────────────────
  [-191]: [
    { alias: "여의도 황소 #34", content: "중국 판매 확인이 핵심이야. 상하이 수출분이 살아났으면 진짜 서프라이즈야. BYD 가격 공세에도 점유율 유지했으면 브랜드 파워 증명한 거야.", created_at: "2026-07-01T00:15:00.000Z" },
    { alias: "강서 팔콘 #41", content: "CyberCab 납품 전 마지막 분기 480K면 다음 분기 기대감이 당연히 올라가. 로보택시 더해지면 연산 페이스 얼마가 되는 거야.", created_at: "2026-07-01T00:11:00.000Z" },
    { alias: "양천 독수리 #28", content: "7월 실적 발표 전까지 주가가 기대감으로 움직일 것 같아. $278 지금 매수하는 건 나쁘지 않아 보여.", created_at: "2026-07-01T00:09:00.000Z" },
    { alias: "송파 황소 #66", content: "컨센 상회야. 이게 끝이야. 나머지는 다 부수적이야. 주가는 기대 대비 결과야. 기대 넘었으니까 올라가.", created_at: "2026-07-01T00:07:00.000Z" },
  ],
  [-192]: [
    { alias: "관악 황소 #21", content: "개입 0회가 핵심이야. 이게 상업 운영 기준이야. 규제 당국이 보는 것도 개입 횟수야. 0이 나왔으면 허가 신청 가능해.", created_at: "2026-07-01T00:21:00.000Z" },
    { alias: "도봉 팔콘 #38", content: "LiDAR 없이 카메라만으로 비 오는 야간 통과했다는 게 엄청난 거야. 비용 구조가 달라지거든. LiDAR 없으면 원가가 훨씬 싸져.", created_at: "2026-07-01T00:18:00.000Z" },
    { alias: "강동 독수리 #55", content: "텍사스 선례가 타 주에 미치는 영향이 생각보다 빨라. 플로리다, 애리조나가 이미 비슷한 법안 검토 중이야.", created_at: "2026-07-01T00:16:00.000Z" },
  ],
  [-193]: [
    { alias: "성북 황소 #47", content: "전자 부품 조립 가능해졌다는 게 진짜 변곡점이야. 스마트폰 제조사들이 관심 가질 거야. 폭스콘이 먼저 사겠지.", created_at: "2026-07-01T00:28:00.000Z" },
    { alias: "광명 팔콘 #19", content: "한 대당 $5K 마진이면 1만 대에 $50M이야. 처음엔 작아 보여도 100만 대가 되면 $5B이야. 방향이 맞아.", created_at: "2026-07-01T00:25:00.000Z" },
    { alias: "부천 독수리 #63", content: "이 속도면 18개월 후 어떤 수준인지 생각해봐. 무서운 발전 속도야.", created_at: "2026-07-01T00:23:00.000Z" },
  ],
  [-194]: [
    { alias: "수원 황소 #52", content: "v46 직접 써본 사람이 말하는 거라 신뢰도 높아. 리뷰 퍼지면 FSD 구독 전환율 올라갈 거야.", created_at: "2026-07-01T00:35:00.000Z" },
    { alias: "의왕 팔콘 #14", content: "4D Occupancy Network이라는 기술적 혁신이 v47에서 더 다듬어지면 로보택시 타임라인 앞당겨질 것 같아.", created_at: "2026-07-01T00:32:00.000Z" },
  ],
  [-195]: [
    { alias: "하남 황소 #37", content: "수직통합 완성이 밸류에이션 멀티플에 직결돼. 단순 발사 회사에서 우주 인프라 회사로 포지셔닝 바뀌는 거야.", created_at: "2026-07-01T00:42:00.000Z" },
    { alias: "남양주 팔콘 #81", content: "군사 고객 가져오는 게 진짜야. 국방부 계약은 한 번 체결하면 10~20년이야. 안정적 매출이 보장돼.", created_at: "2026-07-01T00:39:00.000Z" },
    { alias: "구리 독수리 #26", content: "반복 수익 $850M이 소프트웨어 멀티플 받으면 $20B 이상 가치야. $8B 인수가 싼 거야.", created_at: "2026-07-01T00:37:00.000Z" },
    { alias: "시흥 황소 #64", content: "Starlink + Iridium 통합 서비스가 나오면 가격 경쟁력이 달라져. 두 네트워크 합쳐서 통합 요금제 내놓으면 게임 체인저야.", created_at: "2026-07-01T00:36:00.000Z" },
  ],
  [-196]: [
    { alias: "고양 팔콘 #43", content: "규제 우호 환경 조성이 장기적으로 FAA 허가 속도에 영향 줘. 지역 정치인 지지 = 허가 속도 빨라져.", created_at: "2026-07-01T00:49:00.000Z" },
    { alias: "파주 황소 #18", content: "ESG 점수 올라가면 기관 투자자 비중 늘어나. 주가 안정성 높아지고 변동성 줄어들어. 장기 보유자한테 좋아.", created_at: "2026-07-01T00:46:00.000Z" },
  ],
  [-197]: [
    { alias: "안양 독수리 #57", content: "개발자 락인이 진짜 무서운 거야. 앱 스토어처럼 한번 생태계 들어오면 못 나가. NVDA가 그 생태계야.", created_at: "2026-07-01T00:56:00.000Z" },
    { alias: "군포 황소 #31", content: "SW GPM 85%가 맞다면 비중 커질수록 EPS 성장이 가속화돼. 내년 EPS 기대치 상향 가능해.", created_at: "2026-07-01T00:53:00.000Z" },
    { alias: "의정부 팔콘 #49", content: "AMD는 HW도 따라잡지 못하는데 SW 생태계까지 따라가긴 5년도 부족해. 경쟁 우위가 매우 단단해.", created_at: "2026-07-01T00:51:00.000Z" },
  ],
  [-198]: [
    { alias: "동두천 황소 #22", content: "MS가 OpenAI 의존도 줄이는 게 Anthropic 수혜이기도 하지만 NVDA 수혜가 더 커. 어떤 AI 쓰든 GPU는 NVDA야.", created_at: "2026-07-01T01:03:00.000Z" },
    { alias: "포천 독수리 #78", content: "GB800 클러스터 10만 GPU가 H100 시대 초월한다는 게 NVDA 로드맵이 얼마나 빠른지 보여줘.", created_at: "2026-07-01T00:59:00.000Z" },
  ],
  [-199]: [
    { alias: "양주 황소 #16", content: "Jordan +22%가 핵심이야. 스니커즈 문화는 경기 침체에도 꺾이지 않아. 한정판 리마스터 전략이 효과 보고 있어.", created_at: "2026-07-01T01:10:00.000Z" },
    { alias: "연천 팔콘 #55", content: "DTC 비중 45%가 마진 개선의 핵심이야. 도매 유통망 줄이고 자사몰로 가는 전략이 맞아 떨어지고 있어.", created_at: "2026-07-01T01:07:00.000Z" },
  ],
  [-200]: [
    { alias: "가평 황소 #37", content: "Burry랑 Ackman 둘 다 틀린 적도 있지만 방향성 제시 면에서는 탁월해. 같은 시기에 같은 논리면 무시하기 힘들어.", created_at: "2026-07-01T01:17:00.000Z" },
    { alias: "양평 독수리 #43", content: "AI 공포가 걷히는 시점이 언제냐가 관건이야. Adobe, Amazon 실적이 계속 좋게 나오면 디스카운트 요인이 사라지는 거야.", created_at: "2026-07-01T01:14:00.000Z" },
    { alias: "여주 팔콘 #28", content: "큰손들이 매집하는 동안 개인들이 공포에 팔고 있는 거야. 역발상 투자의 고통스러운 과정이야. 버티는 사람이 이겨.", created_at: "2026-07-01T01:12:00.000Z" },
  ],
  [-201]: [
    { alias: "이천 황소 #61", content: "AWS 단독 상장 논리가 설득력 있어. MSFT Azure도 따로 떼면 MSFT 전체보다 비싸다는 논리랑 같은 구조야.", created_at: "2026-07-01T01:24:00.000Z" },
    { alias: "안성 팔콘 #34", content: "FCF 수익률 7%+ 이면 채권 금리보다 높아. 이러면 가치주로도 매력적이야. 성장주+가치주 이중 매력이야.", created_at: "2026-07-01T01:21:00.000Z" },
  ],
  [-202]: [
    { alias: "평택 황소 #52", content: "기업 구독자 해지율이 낮다는 게 핵심이야. 한 번 워크플로우 세팅하면 바꾸기 너무 복잡해. Adobe가 그 장벽을 이용하는 거야.", created_at: "2026-07-01T01:31:00.000Z" },
    { alias: "화성 독수리 #16", content: "Firefly 12B 생성 수치가 실제 사용자 반응을 반영해. AI 기능을 쓰면서 구독 유지하는 거야. 이탈이 없다는 증거야.", created_at: "2026-07-01T01:28:00.000Z" },
  ],
  [-203]: [
    { alias: "용인 황소 #47", content: "소버린 AI가 진짜 신성장동력이야. 각국 정부가 AI 인프라 구축에 수십조씩 쓰고 있어. 이게 클라우드 다음 사이클이야.", created_at: "2026-07-01T01:38:00.000Z" },
    { alias: "수지 팔콘 #83", content: "Gemini Ultra + DeepMind 접근권 번들이 AWS가 따라하기 어려운 차별화야. Google만의 AI 연구 자산을 무기로 쓰는 거야.", created_at: "2026-07-01T01:35:00.000Z" },
  ],
  [-204]: [
    { alias: "분당 황소 #29", content: "AI 밸류에이션 높아졌다고 팔면 안 돼. 실적이 따라오고 있거든. NVDA, MSFT 다 실적으로 증명하고 있어.", created_at: "2026-07-01T01:45:00.000Z" },
    { alias: "판교 팔콘 #67", content: "미국 부채 리스크는 실제 영향이 언제 나오냐가 불확실해. 10~20년 테일리스크로 보고 단기 투자 결정에 너무 많이 반영하면 안 돼.", created_at: "2026-07-01T01:42:00.000Z" },
    { alias: "성남 독수리 #14", content: "선별적 접근이 맞아. AI 테마주 쫓지 말고 실적으로 검증된 빅테크에 집중이야.", created_at: "2026-07-01T01:40:00.000Z" },
  ],
  [-205]: [
    { alias: "광주 황소 #38", content: "TeraFab에 CyberCab+Optimus 통합 라인이면 생산 효율이 기가팩토리보다 훨씬 높아져. 스케일 차이가 크거든.", created_at: "2026-07-01T01:52:00.000Z" },
    { alias: "하남 팔콘 #52", content: "부지 발표가 나오면 주변 부동산도 움직여. 기가텍사스 때 오스틴 부동산이 폭등했잖아.", created_at: "2026-07-01T01:49:00.000Z" },
  ],
  [-206]: [
    { alias: "구리 황소 #21", content: "MU가 HBM에서 SK하이닉스 따라잡는 속도가 빨라지고 있어. 2위지만 공급 타이트한 상황에서 NVDA가 다변화 원하거든. 수혜는 MU도 받아.", created_at: "2026-07-01T01:59:00.000Z" },
    { alias: "남양주 황소 #44", content: "삼성이 HBM 품질 문제 해결하면 판도 바뀔 수 있어. 근데 그게 언제냐가 문제야. 그 전까지는 SK하이닉스·MU야.", created_at: "2026-07-01T01:57:00.000Z" },
  ],
  // ── 2026-06-30 신규 ──────────────────────────────────────────────────────
  [-182]: [
    { alias: "신사 황소 #84", content: "400만 체험자 중 구독 전환이 관건이야. V14 Lite이지만 경험해보면 Full 하고 싶어져. 무료 체험 퍼널이 구독 수 폭발시키는 구조야.", created_at: "2026-06-30T01:11:00.000Z" },
    { alias: "역삼 팔콘 #47", content: "Texas 명칭 변경이 다른 주 규제에도 영향 줘. '텍사스가 됐으니 우리도' 패턴이 나와. V14 무료 배포랑 맞물리면 FSD 침투율 올해 안에 확 올라가.", created_at: "2026-06-30T01:07:00.000Z" },
    { alias: "서울숲 황소 #31", content: "HW3 차주들이 V14 받는다는 거 몰랐을 텐데 오늘 발표 보고 반응이 폭발할 것 같아. 소셜에서 화제가 되면 Tesla 브랜드 모멘텀도 올라와.", created_at: "2026-06-30T01:03:00.000Z" },
  ],
  [-183]: [
    { alias: "한강 황소 #62", content: "L4 법적 인정이 보험사 프로덕트 개발 신호탄이야. 자율주행 전용 보험 나오면 시장이 커지고 Tesla 생태계가 강화돼.", created_at: "2026-06-30T01:04:00.000Z" },
    { alias: "성수 팔콘 #28", content: "84대가 선례 역할 하는 거 맞아. 법적 프레임이 열리면 숫자는 금방 늘어나. 텍사스 → 연방 순서야.", created_at: "2026-06-30T01:00:00.000Z" },
  ],
  [-184]: [
    { alias: "용산 팔콘 #73", content: "7/8이 Tesla + SpaceX 동시 이벤트야. 포지션 준비하는 사람들한테는 7월 첫째 주가 중요해. Optimus 발표 내용 수준이 주가 방향 결정해.", created_at: "2026-06-30T00:57:00.000Z" },
    { alias: "이촌 독수리 #55", content: "로봇 TAM이 Robotaxi보다 클 수 있어. 공장 자동화 + 가정 서비스 합치면 수천조야. 양산 타임라인 나오면 밸류에이션 재산정 들어가.", created_at: "2026-06-30T00:53:00.000Z" },
  ],
  [-185]: [
    { alias: "방배 황소 #19", content: "Nasdaq 100 편입이면 QQQ뿐 아니라 SCHG·VGT 같은 성장주 ETF도 영향 받아. 추종 자금이 QQQ보다 훨씬 많아. 수십억 달러 강제 매수야.", created_at: "2026-06-30T00:50:00.000Z" },
    { alias: "서래 팔콘 #36", content: "60번째 발사가 상반기 60회야. 하반기도 같은 페이스면 연간 120회인데 이미 2025년 기록을 넘어선 거야.", created_at: "2026-06-30T00:46:00.000Z" },
    { alias: "반포 황소 #67", content: "10,722기 위성이면 2위 OneWeb이 600기대야. 17배 규모 차이야. 이 규모가 속도·용량·안정성 전부 압도해. Starlink 독점은 이미 완성됐어.", created_at: "2026-06-30T00:42:00.000Z" },
  ],
  [-186]: [
    { alias: "청담 팔콘 #44", content: "삼성이 17%로 줄어든 게 핵심이야. 수율 문제 해결 전까지는 NVDA 공인 공급사에서 사실상 제외야. MU가 그 자리 채우는 구조야.", created_at: "2026-06-30T00:43:00.000Z" },
    { alias: "강남 황소 #83", content: "MU S&P 비중 10%가 AAPL 6.2%보다 높다는 게 AI 시대의 수혜 순서를 보여줘. HBM 공급사가 스마트폰 회사 제쳤어.", created_at: "2026-06-30T00:39:00.000Z" },
  ],
  [-187]: [
    { alias: "압구정 황소 #53", content: "모델 증류 우려가 곧 AI 업계 IP 소송 시대를 여는 거야. 제일 먼저 법제화 나오면 외부 API 사용 전반에 제약 생겨. 자체 LLM 없는 기업들이 리스크에 노출돼.", created_at: "2026-06-30T00:36:00.000Z" },
    { alias: "서초 팔콘 #28", content: "Amazon-Anthropic 재협상이 비싸지는 방향이면 Anthropic 수익 잠재력은 제약받지만 클라우드 AI 비용이 올라가는 거야. 자체 AI 회사들이 상대적 유리해져.", created_at: "2026-06-30T00:32:00.000Z" },
  ],
  [-188]: [
    { alias: "대치 황소 #37", content: "FT 단독이라 신뢰도 높아. FT는 검증 후 보도해. $10B이면 Apple 공급망에서 엄청난 규모고 정치적 결정이 될 수밖에 없어.", created_at: "2026-06-30T00:29:00.000Z" },
    { alias: "역삼 황소 #61", content: "거부 시나리오면 NVDA·TSMC가 수혜야. Apple이 미국산 칩으로 돌아와야 하니까. 어느 결과든 투자 기회가 생기는 구조야.", created_at: "2026-06-30T00:25:00.000Z" },
  ],
  [-189]: [
    { alias: "논현 황소 #48", content: "의회 포트폴리오 팔로우 전략이 실제로 알파 나오는 경우가 많아. 내부 정보 접근성 + 직접 입법 권한을 가진 사람들이 사는 거잖아. MSFT 규제 방향이 우호적이라는 강한 신호야.", created_at: "2026-06-30T00:22:00.000Z" },
    { alias: "이태원 팔콘 #39", content: "8명 전원 수익 중이라는 게 포인트야. 이들이 틀렸을 경우 본인 손해야. 정보 우위 + 이해관계가 일치하는 포지션이 가장 강한 신호야.", created_at: "2026-06-30T00:18:00.000Z" },
  ],
  [-190]: [
    { alias: "마포 팔콘 #47", content: "VW 사례가 교과서가 되는 거야. 자체 AV 없는 OEM의 결말이야. 현대·Toyota가 지금 얼마나 빠르게 AV 투자하는지 보면 다 알아.", created_at: "2026-06-30T00:15:00.000Z" },
    { alias: "서대문 황소 #58", content: "10만명 해고가 독일 정치에도 영향 줘. 내년 선거 앞두고 정부 압박이 강해지고 EU 자동차 보조금 늘 수 있어. 그게 Tesla 유럽 경쟁 심화 변수야.", created_at: "2026-06-30T00:11:00.000Z" },
    { alias: "후암 팔콘 #31", content: "FSD V14 4시간 후 VW AV 포기. 이 타이밍이 역사적 변곡점이야. '자율주행이 너무 빨라서 따라갈 수 없었다'가 VW 스스로 인정한 거야.", created_at: "2026-06-30T00:07:00.000Z" },
  ],

  // ── 2026-06-26 신규 ──────────────────────────────────────────────────────
  [-170]: [
    { alias: "대치 황소 #47", content: "편입 인포그래픽이 공식 IR 자료 수준이야. 이게 나오면 기관 리서치 팀이 바로 커버리지 개시하거든. 기관 커버리지 시작 = 매수 추천 리포트 = 기관 자금 유입 순서야.", created_at: "2026-06-26T01:11:00.000Z" },
    { alias: "방배 팔콘 #53", content: "$350B 기업가치 공식 확인됐어. QQQ가 이 밸류 기준으로 편입 비중 계산하면 수억 달러 강제 매수야. 발효일 7/6 전까지 선행 매수 시간이 일주일 남았어.", created_at: "2026-06-26T01:07:00.000Z" },
    { alias: "반포 황소 #38", content: "타임라인이 24년 역사야. 이 스토리가 기관 매수 논거가 되면 '우주 빅테크'로 리레이팅 받아. SpaceX가 Amazon·Google처럼 멀티버티컬 테크 회사로 재분류되는 거야.", created_at: "2026-06-26T01:03:00.000Z" },
  ],
  [-171]: [
    { alias: "이태원 팔콘 #61", content: "현금 $100.8B으로 $108B 인수는 레버리지 없이 되는 딜이야. 부채 없이 자체 자금으로 인수하면 이자 비용 없고 재무 리스크도 낮아. 시장이 이 딜을 어떻게 보냐가 핵심이야.", created_at: "2026-06-26T01:04:00.000Z" },
    { alias: "후암 황소 #44", content: "T-Mobile 600MHz 대역이 건물 내부 침투력이 강해. Starlink가 못 잡는 실내를 이게 잡아줘. 완전한 커버리지 = 프리미엄 요금제 가능 = ARPU 상승이야.", created_at: "2026-06-26T01:00:00.000Z" },
    { alias: "용산 황소 #58", content: "트럼프 행정부에서 Elon 관련 M&A는 규제 완화 가능성이 높아. DOGE 협력 + Space Force 계약 + 트럼프 관계가 유리하게 작동할 수 있어.", created_at: "2026-06-26T00:56:00.000Z" },
  ],
  [-172]: [
    { alias: "마포 황소 #77", content: "수직통합이 또 한 단계 올라갔어. 로켓·위성·통신에 이어 연료까지 자체 조달이야. 외부 의존도가 낮아질수록 비용 구조가 개선돼. 이게 SpaceX 마진 개선의 장기 드라이버야.", created_at: "2026-06-26T00:57:00.000Z" },
    { alias: "서대문 팔콘 #62", content: "월 2회 → 8회 발사 목표 달성하면 Starlink V3 배치 속도가 4배야. 위성 늘면 용량 늘고 구독자 더 받을 수 있어. 파이프라인 하나가 수익 구조 전체를 바꾸는 거야.", created_at: "2026-06-26T00:53:00.000Z" },
  ],
  [-173]: [
    { alias: "청담 팔콘 #37", content: "7개월 +780%면 월 수익률이 40%야. 기관이 먼저 사고 공개했다는 패턴이 맞았어. 다음 기관 공개 시 같은 패턴 반복 가능성이 높아. 기관 공개 모니터링이 전략이야.", created_at: "2026-06-26T00:50:00.000Z" },
    { alias: "논현 황소 #52", content: "목표가 $2,500 상향이 AI NAND 수요 급증 반영이야. 데이터센터 SSD 수요 폭발이 실적에 찍히면 $2,500도 보수적일 수 있어. SanDisk 실적 모멘텀이 올라오는 타이밍이 관건이야.", created_at: "2026-06-26T00:46:00.000Z" },
  ],
  [-174]: [
    { alias: "강남 팔콘 #48", content: "5개 영역 동시 투자가 경쟁사와 차별화해. 자동차 회사는 배터리+파워트레인만 해. AI 회사는 소프트웨어만 해. Tesla만 5개 동시야. 수직통합 가속이야.", created_at: "2026-06-26T00:43:00.000Z" },
    { alias: "신사 황소 #33", content: "칩 설계 투자가 FSD 사이클을 빠르게 해. DOJO로 자체 훈련 → FSD 버전업 가속 → 구독자 증가 → FSD 마진 개선. 이 선순환이 CapEx 투자의 결과야.", created_at: "2026-06-26T00:39:00.000Z" },
    { alias: "압구정 팔콘 #67", content: "단기 EPS 압박 우려는 이미 알려진 정보야. 기관은 2~3년 후 Robotaxi·Optimus 수익을 보고 투자해. 지금 CapEx 확대 = 그 수익의 기반이야.", created_at: "2026-06-26T00:35:00.000Z" },
  ],
  [-175]: [
    { alias: "이촌 황소 #41", content: "7,500대/주 달성하면 기가베를린 혼자 연 390,000대야. 유럽 수요가 이걸 소화해. 5월 2배 판매 기록이 수요 증거고 생산이 따라가면 Q3/Q4 서프라이즈야.", created_at: "2026-06-26T00:36:00.000Z" },
    { alias: "한강 팔콘 #28", content: "1,000명 채용이 Q3 시작이라 봐야 해. 교육 3개월 + 라인 셋업 = 빠르면 Q4부터 풀 생산이야. 2026 연간 유럽 출하량이 예상보다 크게 나올 수 있어.", created_at: "2026-06-26T00:32:00.000Z" },
  ],
  [-176]: [
    { alias: "성수 황소 #56", content: "브레이크 페달 없는 Cybercab 설계가 단순 원가 절감이 아니야. 실내 공간 리디자인이 가능해. 마주 보는 좌석 + 테이블 형태로 가면 승차 경험이 비행기 이코노미보다 좋아져. 프리미엄 요금제 가능이야.", created_at: "2026-06-26T00:29:00.000Z" },
    { alias: "건대 황소 #39", content: "AV Framework 5차 업데이트가 패키지야. 브레이크 페달 + 리어뷰 미러 + 기타 AV 전용 면제가 같이 왔어. 이 패키지가 Tesla·Waymo 전체 AV 설계 자유도를 바꿔.", created_at: "2026-06-26T00:25:00.000Z" },
    { alias: "뚝섬 팔콘 #44", content: "원가 절감 $800~1,200/대 × 10만 대 = $1억/년이야. 마진에 직접 찍히는 숫자야. Cybercab 규모화될수록 이 효과가 커져. 규제 완화가 바로 EPS 개선으로 연결되는 구조야.", created_at: "2026-06-26T00:21:00.000Z" },
  ],
  [-177]: [
    { alias: "왕십리 황소 #52", content: "항구 직배송이 진짜 포화 증거야. 배달 센터 입고 → 검수 → 인도 프로세스를 건너뛴다는 건데, 이 결정이 나올 정도면 주문 적체가 엄청나야.", created_at: "2026-06-26T00:22:00.000Z" },
    { alias: "답십리 팔콘 #37", content: "일본 FSD 타임라인이 한국과 비슷하게 갈 것 같아. 서버 이전 → 국토부(일본 국토교통성) 인증 → 출시 순서야. 일본 수요 폭발이 FSD 출시 압박으로도 작용할 거야.", created_at: "2026-06-26T00:18:00.000Z" },
  ],
  [-178]: [
    { alias: "광장 황소 #63", content: "마진 80%는 소프트웨어 마진이야. 반도체 회사 마진 80%는 역사상 없던 수치야. AI 수요 구조가 Micron에 정가격 결정력을 줬다는 증거야. 이 구조가 1~2년 유지돼.", created_at: "2026-06-26T00:15:00.000Z" },
    { alias: "자양 팔콘 #51", content: "트리플 비트 후 월가 추정 상향이 즉각 나와. EPS 추정 올라가면 목표주가 올라가고 기관 매수 의무가 생겨. 오늘 어닝이 내주 기관 수급을 만드는 거야.", created_at: "2026-06-26T00:11:00.000Z" },
    { alias: "구의 황소 #44", content: "TSLA·SPCX AI 투자 수요가 살아있다는 확인이야. Colossus 확장·Starmind AI 위성 모두 HBM 수요야. Micron 실적이 좋으면 이 투자 계획이 유지된다는 거야.", created_at: "2026-06-26T00:07:00.000Z" },
  ],
  [-179]: [
    { alias: "중랑 황소 #48", content: "XPU 설계 용역의 전환 비용이 핵심이야. 칩 아키텍처부터 소프트웨어 최적화까지 AVGO에 의존하면 바꾸는 게 사실상 불가능해. 한 번 고객 = 영구 고객이야.", created_at: "2026-06-26T00:08:00.000Z" },
    { alias: "상봉 팔콘 #36", content: "$300B 매출 기회가 5~10년 로드맵이야. 매년 30% 성장이면 7년 후야. 지금 주가에서 이 성장이 얼마나 반영됐냐가 밸류에이션 핵심이야. 아직 초기 단계로 봐.", created_at: "2026-06-26T00:04:00.000Z" },
  ],
  [-180]: [
    { alias: "묵동 황소 #57", content: "OpenAI IPO 지연이 SPCX한테 좋은 이유가 명확해. AI 투자 자금이 한정적인데 OpenAI IPO가 없으면 그 자금이 SPCX로 와. SpaceX가 시장 먼저 선점한 효과야.", created_at: "2026-06-26T00:01:00.000Z" },
    { alias: "신내 팔콘 #29", content: "Jalapeño 칩이 9개월 개발이라 놀라워. Apple과 협력했다는 게 흥미로워. Apple A칩 설계 노하우가 AI 추론 칩에 적용된 거야. 성능이 어느 수준인지 벤치마크 나오면 NVDA 반응 봐야 해.", created_at: "2026-06-25T23:57:00.000Z" },
  ],
  [-181]: [
    { alias: "중계 황소 #43", content: "GDP 2.1%가 AI CapEx 기여분이 포함된 거야. TSLA·SpaceX·Micron 투자가 GDP에 반영되는 거야. 미국 성장주가 GDP 성장을 만들고 GDP 성장이 다시 성장주 환경을 만들어. 선순환이야.", created_at: "2026-06-25T23:54:00.000Z" },
    { alias: "하계 팔콘 #38", content: "Cathie 경고가 신흥국 위기 신호야. 터키·아르헨티나 통화 방어 = 달러 강세 환경. 달러 강세는 해외 매출 비중 큰 TSLA에 단기 역풍이지만 미국 성장 자체는 유지돼.", created_at: "2026-06-25T23:50:00.000Z" },
  ],
  // ── 2026-06-25 신규 ──────────────────────────────────────────────────────
  [-158]: [
    { alias: "강남 팔콘 #71", content: "150대 동시 외부 테스트가 맞아. Tesla 로보택시 운행 인가 신청에 필요한 '상업 운행 전 XX마일 이상 무사고' 요건 달성 목적이야. 대당 일 200마일 × 150대 × 7일 = 주간 21만 마일 누적이야. 빠르게 인가 요건 채우는 거야.", created_at: "2026-06-25T01:11:00.000Z" },
    { alias: "서대문 황소 #49", content: "외부 공도 테스트 = 텍사스 교통법상 SAE Level 4 허가 구간 사전 검증이야. Tesla가 TxDMV에 Level 4 허가 신청할 때 이 테스트 기록이 증거로 제출돼. 허가 기간이 6개월 단위라 빠르면 올 4분기 오스틴 확장 허가야.", created_at: "2026-06-25T01:07:00.000Z" },
    { alias: "마포 팔콘 #83", content: "Cybercab 생산량이 스케일업되면 운용 조직도 동시에 커야 해. 차량 늘어나는 속도보다 운영 인프라가 느리면 병목이 생겨. 채용 공고 숫자가 생산 계획과 맞아 떨어지는지 트래킹하면 론칭 타임라인이 보여.", created_at: "2026-06-25T01:03:00.000Z" },
  ],
  [-159]: [
    { alias: "용산 황소 #56", content: "핀란드→스웨덴→노르웨이 도미노 로직이 맞아. 북유럽 3국이 EU 교통 규제 프레임워크 선행 채택 국가들이거든. 핀란드 통과하면 6개월 내 3국 연쇄 인정 절차 들어가. 유럽 FSD 구독 도미노 시작이야.", created_at: "2026-06-25T01:04:00.000Z" },
    { alias: "광진 팔콘 #37", content: "북유럽 극한 기상 테스트 통과가 기술 증명이야. 핀란드 겨울 -30°C·블랙아이스 환경에서 FSD 정상 작동 확인됐다면 독일·프랑스 같은 온화한 기후는 훨씬 쉬워. 기술 장벽이 아니라 규제 타임라인만 남은 거야.", created_at: "2026-06-25T01:00:00.000Z" },
  ],
  [-160]: [
    { alias: "강북 황소 #48", content: "Fleet Network Income이 Tesla를 플랫폼 회사로 만드는 핵심이야. Uber처럼 차량 소유 없이 수수료 수취하는 구조. Tesla가 차 팔고 끝나는 게 아니라 팔린 차가 계속 수익을 만들어줘. 재고 부담 없는 플랫폼 비즈니스야.", created_at: "2026-06-25T00:57:00.000Z" },
    { alias: "서초 팔콘 #82", content: "142만 FSD 구독 중 10% 참여 가정이 보수적이야. 차주 입장에서 주차 중인 차가 돈을 버는 구조인데 거부할 이유가 없어. 참여율 30~40%로 올라가면 연간 네트워크 수수료가 $40B+야. 이 숫자가 Tesla 멀티플을 바꿔.", created_at: "2026-06-25T00:53:00.000Z" },
  ],
  [-161]: [
    { alias: "은평 황소 #33", content: "ARK ARKK·ARKQ·ARKX 합산 $21.25M이 어떻게 집행됐는지 알아. 월·화·수 3일 분할 매수야. 한 번에 쏟지 않고 분할해서 시장 충격 최소화한 거야. 이게 장기 포지션 축적 신호야. 단기 트레이딩이 아니야.", created_at: "2026-06-25T00:50:00.000Z" },
    { alias: "목동 황소 #71", content: "$4,600 목표가에서 현재가 4배 업사이드라는 게 5~10년 DCF야. 단기 목표가가 아니야. 그러나 이게 의미있는 이유는 ARK가 이 목표 믿고 매수하는 실제 자금 유입이 발생하기 때문이야. 기관 수급 확인이야.", created_at: "2026-06-25T00:46:00.000Z" },
    { alias: "노원 황소 #27", content: "ARK 매수 공시 나오면 개인투자자 추종 매수도 따라와. ARK 트래킹하는 투자자 커뮤니티가 크거든. 기관 수급 + 개인 추종이 같은 날 발생하면 단기 모멘텀이 강해져. 오늘 수급 컨플루언스야.", created_at: "2026-06-25T00:42:00.000Z" },
  ],
  [-162]: [
    { alias: "양천 독수리 #54", content: "FSD 미사용 사고 소송이 73%라는 데이터가 핵심이야. 언론은 Tesla 사고라고 대문짝만하게 쓰는데 실제 FSD 연관 비율이 27%야. 언론 바이어스 걷어내면 법적 리스크가 훨씬 작아. 패닉 셀 기회야.", created_at: "2026-06-25T00:43:00.000Z" },
    { alias: "동작 황소 #67", content: "14일 내 주가 완전 회복 패턴이 8번 반복됐다는 게 통계적으로 유의한 패턴이야. 표본이 5개 이상이면 트레이딩 가능한 패턴으로 봐. 소송 뉴스 나올 때 매수해서 14일 후 파는 전략이 수익 검증된 거야.", created_at: "2026-06-25T00:39:00.000Z" },
  ],
  [-163]: [
    { alias: "구리 황소 #38", content: "4개 도시 동시 채용이 동시 론칭 계획이라는 증거야. 순차 론칭이면 채용도 순차적으로 나와야 해. 동시에 올라온 건 Q4 2026~Q1 2027 4개 도시 동시 서비스 개시를 계획하고 있다는 거야. 규모의 경제 가속화야.", created_at: "2026-06-25T00:36:00.000Z" },
    { alias: "강동 팔콘 #57", content: "City Launch Manager 포지션이 핵심이야. 각 도시마다 담당 매니저 두는 구조는 도시별 규제 대응·파트너십·운영 최적화를 현지화하겠다는 거야. Uber가 글로벌 확장할 때 썼던 조직 구조와 똑같아. 검증된 실행 모델이야.", created_at: "2026-06-25T00:32:00.000Z" },
  ],
  [-164]: [
    { alias: "서초 황소 #39", content: "QQQ 편입 시 강제 매수 $4.8억이 SPCX 일평균 거래량의 몇 배인지가 중요해. SPCX 일거래량 약 $1.2억이면 4배야. 리밸런싱 당일 매수 압력이 4일치 거래량이 하루에 몰리는 거야. 가격 충격이 나올 수밖에 없어.", created_at: "2026-06-25T00:29:00.000Z" },
    { alias: "강남 황소 #63", content: "S&P500 편입 선례 +8.6% 발표일~발효일 상승이 100% 반복되진 않아. 그러나 SPCX는 일반 편입 종목보다 유동성이 낮아서 수급 충격이 더 커. 편입 알파가 평균보다 높게 나올 수 있어.", created_at: "2026-06-25T00:25:00.000Z" },
    { alias: "을지 팔콘 #44", content: "편입 이후 지속 보유 의무가 핵심이야. 리밸런싱 당일에만 매수하고 끝나는 게 아니야. QQQ가 SPCX를 계속 보유해야 해서 구조적 수급 개선이 영구적이야. 일회성 이벤트가 아니라 구조 변화야.", created_at: "2026-06-25T00:21:00.000Z" },
  ],
  [-165]: [
    { alias: "신촌 황소 #65", content: "Starmind 계약이 B2B 파이프라인 모델이야. Fortune 500 고객 1개사 계약 → 레퍼런스로 동종 기업 10개사 추가 수주 패턴이 B2B 영업의 공식이야. Starmind 50개사가 500개사로 가는 레퍼런스가 되는 거야.", created_at: "2026-06-25T00:22:00.000Z" },
    { alias: "대치 황소 #51", content: "B2B ARPU $1,200이 B2C $65 대비 18배야. 믹스 1% B2B 전환이 ARPU 18% 상승이야. Starmind 같은 기업 파트너십이 믹스 개선 드라이버야. SPCX 수익 구조 업그레이드가 숫자로 보이기 시작해.", created_at: "2026-06-25T00:18:00.000Z" },
  ],
  [-166]: [
    { alias: "이태원 황소 #72", content: "레이턴시 23ms → 8ms 개선이 핵심 스펙이야. 8ms면 실시간 게임·화상회의·AI 추론에 완전히 적합한 수준이야. Starlink의 유일한 약점이었던 레이턴시가 해결되면 경쟁사와 비교 자체가 안 돼.", created_at: "2026-06-25T00:15:00.000Z" },
    { alias: "망원 독수리 #41", content: "엣지 컴퓨팅 위성이 게임 체인저야. 지상국 없이 위성 간 처리하면 SpaceX 지상 인프라 비용이 줄어. CapEx 효율화야. 동시에 레이턴시도 줄어. 비용·성능 동시 개선이 위성 하드웨어 업그레이드의 결과야.", created_at: "2026-06-25T00:11:00.000Z" },
  ],
  [-167]: [
    { alias: "여의도 팔콘 #63", content: "Oldendorff 700척이 해운 업계에서 큰 숫자야. 업계 TOP 10 벌크선 운영사 중 하나야. 이 레퍼런스 나오면 MSC·COSCO·Maersk 같은 더 큰 선사들이 협상 테이블에 올 거야. 해운 Starlink 도미노 시작이야.", created_at: "2026-06-25T00:08:00.000Z" },
    { alias: "청담 황소 #59", content: "Maritime 요금제가 기존 Intelsat 대비 50% 저렴하면서 속도 10배라는 게 선사 입장에서 당연히 교체해야 해. 비용·성능 둘 다 낫거든. 전환 비용(단말기 교체)만 해결되면 해운 시장 Starlink가 독식하는 구조야.", created_at: "2026-06-25T00:04:00.000Z" },
  ],
  [-168]: [
    { alias: "합정 황소 #37", content: "350만 가정 중 10% 전환이 보수적이야. Renew Home 가입 가정은 이미 에너지 효율 관심 있는 층이야. 이 계층이 Powerwall+Starlink 번들에 관심 가질 확률이 일반 가정보다 훨씬 높아. 전환율 20~30% 가능해.", created_at: "2026-06-25T00:01:00.000Z" },
    { alias: "공덕 황소 #48", content: "TSLA+SPCX 동시 수혜 구조가 중요해. 같은 번들에서 두 회사가 수익 나는 게 포트폴리오 집중 투자 정당성이야. 시너지 사업에 두 회사가 동시에 노출돼 있으면 번들 성공 시 두 배로 먹는 거야.", created_at: "2026-06-24T23:57:00.000Z" },
    { alias: "강서 황소 #53", content: "에너지+통신 번들 락인 효과가 강력해. Powerwall 설치하면 Tesla 에너지 앱 쓰게 되고 Starlink도 같이 구독하면 두 서비스 해지하려면 장치도 교체해야 해. 가정당 연간 이탈률이 낮아서 LTV가 높아.", created_at: "2026-06-24T23:53:00.000Z" },
  ],
  [-169]: [
    { alias: "중구 팔콘 #62", content: "HBM3E 2배 성장이 AI 서버 투자 가속을 증명해. MU 어닝 서프라이즈 = AI 인프라 CapEx가 꺾이지 않았다는 직접 증거야. TSLA Colossus 확장·SPCX AI 데이터센터 수요가 살아있다는 신호야.", created_at: "2026-06-24T23:54:00.000Z" },
    { alias: "용산 팔콘 #37", content: "MU EPS $2.05 vs 컨센 $1.62 = 27% 어닝 서프라이즈야. 이 규모 서프라이즈면 반도체 섹터 전체 리레이팅 트리거야. NVDA·AMD·TSMC 동반 상승하고 AI 투자 테마가 재점화돼. TSLA·SPCX도 AI 수혜주로 재조명받아.", created_at: "2026-06-24T23:50:00.000Z" },
    { alias: "마포 황소 #64", content: "Micron 가이던스가 더 중요해. 서프라이즈는 과거야. Q4·FY27 가이던스에서 HBM3E 수요 전망이 올라왔다면 AI 인프라 사이클이 2027년까지 이어진다는 거야. Tesla·SpaceX AI 투자 ROI 타임라인이 맞아.", created_at: "2026-06-24T23:46:00.000Z" },
  ],
  // ── 2026-06-24 신규 ──────────────────────────────────────────────────────
  [-144]: [
    { alias: "잠실 황소 #39", content: "NTSB 보고서 주기가 평균 7~14일이야. 사고 뉴스 나오면 -2~3% 빠지고 보고서 나오면 원래대로 돌아오는 패턴 이미 7번 반복됐어. 이걸 시스템으로 만들면 수익화 가능한 트레이딩 패턴이야.", created_at: "2026-06-24T01:11:00.000Z" },
    { alias: "구리 독수리 #67", content: "미디어 바이어스 지수에서 TSLA 관련 사고 보도가 타 EV 대비 5.7배 더 많이 나오는 게 측정됐어. 언론 관심도 비대칭이 주가 왜곡을 만드는 거야. 알고 쓰면 이게 알파야.", created_at: "2026-06-24T01:07:00.000Z" },
  ],
  [-145]: [
    { alias: "목동 팔콘 #52", content: "베를린 정상화가 핵심이야. Q1에 Model Y 신형 생산라인 셋업으로 4주간 조업 중단 있었는데 그게 Q1 볼륨 330K 원인이었어. Q2 베를린 풀 가동하면 유럽 볼륨 회복 확실해.", created_at: "2026-06-24T01:04:00.000Z" },
    { alias: "청담 황소 #31", content: "440K 발표되면 월가 어닝 추정이 즉시 상향돼. Q3·Q4 추정까지 도미노로 올라가거든. FY26 연간 추정 상향 → 목표주가 상향 → 기관 매수 순서야. 7월 첫째 주가 트리거야.", created_at: "2026-06-24T01:00:00.000Z" },
    { alias: "신촌 팔콘 #84", content: "Cybertruck 라인 → Model Y 전환이 볼륨 추가 원천이야. Cybertruck 월 1,500대 생산하던 라인이 Model Y 5,000대로 바뀐 거야. 이게 Texas 볼륨 상향 기여해.", created_at: "2026-06-24T00:56:00.000Z" },
  ],
  [-146]: [
    { alias: "상암 황소 #73", content: "EU 상호 인정 원칙 발동이 맞아. 3개국 이상 동시 승인 시 WP.29 규정에 따라 다른 EU 국가 자동 인정 절차 개시 가능해. 나머지 EU 국가들이 개별 심사 없이 수용할 수 있는 법적 근거가 생긴 거야.", created_at: "2026-06-24T00:57:00.000Z" },
    { alias: "구로 황소 #58", content: "유럽 FSD 구독 ARPU가 미국보다 높아. €199/월 vs $199/월인데 환율 고려하면 유럽이 +10~15% 높은 거야. 구독자 단가가 미국보다 유리한 시장이 열리는 거임.", created_at: "2026-06-24T00:53:00.000Z" },
  ],
  [-147]: [
    { alias: "압구정 황소 #62", content: "Neoen이 호주 최대 재생에너지 개발사야. 이 회사가 Tesla Megapack 독점 계약하면 향후 Neoen 프로젝트 전부가 Tesla ESS 수주 파이프라인이 되는 거야. 레퍼런스 효과가 엄청나.", created_at: "2026-06-24T00:50:00.000Z" },
    { alias: "한강 황소 #39", content: "ESS 사업 수주 잔고(backlog)가 몇 개월치라고 알려졌어. 이 계약까지 더해지면 2027년 말까지 생산 스케줄이 가득 차는 거야. 공급이 수요를 못 따라가는 구조야. 마진 방어 가능해.", created_at: "2026-06-24T00:46:00.000Z" },
  ],
  [-148]: [
    { alias: "여의도 독수리 #53", content: "BBB+ 첫 우주 채권 금리가 얼마로 결정되냐가 다음 발행의 기준이 돼. T+80bp 이하면 시장이 SpaceX를 A급으로 취급하는 거야. 수요 오더북 나오면 금리 타이트닝 거의 확실해.", created_at: "2026-06-24T00:43:00.000Z" },
    { alias: "도봉 황소 #76", content: "Colossus 2단계 400K H200으로 확장되면 Anthropic·Google 다음 계약 용량이 결정돼. AI 컴퓨팅 수요가 공급보다 빠르니까 확장 즉시 선점 계약 들어올 거야. AI 인프라 사업이 실적에 잡히기 시작해.", created_at: "2026-06-24T00:39:00.000Z" },
    { alias: "서울 황소 #23", content: "채권 $89B + 현금 $100B = SpaceX 유동성이 $189B이야. Apple 순현금 $60B의 3배야. 이 규모의 유동성으로 무엇을 인수할지가 다음 모멘텀이야. Cursor $80B 인수는 예고편이었던 거야.", created_at: "2026-06-24T00:35:00.000Z" },
  ],
  [-149]: [
    { alias: "강동 팔콘 #28", content: "Grok5를 Starlink 통해 차량에 클라우드 추론으로 제공하는 모델이 진짜 혁신이야. 온디바이스 한계를 클라우드+위성으로 극복하는 거야. 차량이 인터넷 끊겨도 Starlink 연결이면 10T 파라미터 AI 쓸 수 있는 거임.", created_at: "2026-06-24T00:36:00.000Z" },
    { alias: "송파 황소 #47", content: "Tesla Grok5 통합이 확정되면 xAI 기업가치가 올라가고 Elon의 두 회사 시너지가 숫자로 증명돼. TSLA 주주는 간접적으로 xAI 가치도 먹는 구조야. 생태계 통합 베팅이 맞아.", created_at: "2026-06-24T00:32:00.000Z" },
  ],
  [-150]: [
    { alias: "구로 팔콘 #44", content: "연준 동결 연장이 TSLA·SPCX엔 단기 부담이지만 장기론 다를 수 있어. 금리 높은 환경에서도 실적 성장 보여주면 오히려 '매크로 이겨내는 주식'으로 프리미엄 받거든. 실적 시즌 서프라이즈가 유일한 해답이야.", created_at: "2026-06-24T00:29:00.000Z" },
    { alias: "잠실 늑대 #51", content: "이란 유가 상승이 Tesla Energy 수요를 끌어올리는 역설이 흥미로워. 유가 $10 상승하면 재생에너지 ROI가 개선돼 ESS 투자가 늘거든. 단기 비용 부담보다 중기 수요 증가 효과가 더 커.", created_at: "2026-06-24T00:25:00.000Z" },
  ],
  [-151]: [
    { alias: "홍대 황소 #62", content: "DeepSeek API 사용 금지 리스크 맞아. 미국 정부가 중국 AI API 규제하면 Tesla가 Grok5로 전환해야 해. 그런데 이게 오히려 Grok5 통합을 앞당기는 트리거가 될 수 있어. 어느 쪽이든 FSD AI 업그레이드 방향이야.", created_at: "2026-06-24T00:22:00.000Z" },
    { alias: "연남 팔콘 #37", content: "비용 1/20 절감이 FSD 마진 개선으로 이어지는 로직이 맞아. 구독 매출 80% 마진에서 AI 추론 비용이 10% 하락하면 마진이 88%로 개선돼. 이게 EPS에 직접 반영되는 거야.", created_at: "2026-06-24T00:18:00.000Z" },
  ],
  [-152]: [
    { alias: "목동 황소 #83", content: "BOM $10K 이하 달성 로직이 정확해. 중국 하모닉 드라이브 단가가 미국산의 28%인데 이게 로봇 원가를 결정해. 중국 공급망 없이는 $20K 대중화 가격이 불가능해.", created_at: "2026-06-24T00:15:00.000Z" },
    { alias: "성수 팔콘 #49", content: "Foxconn이 Optimus 공급망에 들어온 게 중요한 신호야. Foxconn은 아이폰 10억 대 이상 생산한 정밀 제조 경험이 있어. Optimus 대량 생산이 현실화될 때 Foxconn 없이는 속도가 안 나와.", created_at: "2026-06-24T00:11:00.000Z" },
    { alias: "상암 팔콘 #58", content: "지정학 공급망 이원화 계획이 있는지가 중요해. Tesla가 말레이시아·인도·멕시코에 공급망 구축 검토 중이라는 얘기 있어. 중국 100% 의존 리스크 해소 로드맵이 있으면 투자자 불안 해소돼.", created_at: "2026-06-24T00:07:00.000Z" },
  ],
  [-153]: [
    { alias: "종로 황소 #72", content: "Starlink ARPU 가중 평균 $150 추정이 합리적이야. 기업·정부 고객이 믹스 개선하면 ARPU가 올라가. Direct-to-Cell은 볼륨을 늘리되 ARPU를 낮추는 트레이드오프인데 총매출 성장이 더 커.", created_at: "2026-06-24T00:08:00.000Z" },
    { alias: "강서 황소 #35", content: "통신사 비교하면 AT&T ARPU $55, Verizon $68인데 Starlink 글로벌 평균 $65~70 수준이면 가입자 규모로 글로벌 통신사 TOP 5 진입이야. 우주 기업이 통신사를 능가하는 거야.", created_at: "2026-06-24T00:04:00.000Z" },
  ],
  [-154]: [
    { alias: "압구정 늑대 #84", content: "국토부 ADAS 인증 절차가 6~12개월 걸려. 서버 이전 완료되면 인증 신청 가능하니까 빠르면 Q4 2026, 늦어도 Q1 2027 한국 FSD 출시야. 대기자 리스트 미리 만들어 놓을 만해.", created_at: "2026-06-24T00:01:00.000Z" },
    { alias: "신림 팔콘 #67", content: "PIPA 준수가 선결 조건이라는 해석이 맞아. 개인정보보호법 위반 시 매출의 3% 과징금이거든. Tesla가 한국 시장을 포기 안 하는 이상 서버 이전은 필수야. 이번 공지가 진지한 신호야.", created_at: "2026-06-23T23:57:00.000Z" },
    { alias: "합정 황소 #29", content: "한국 → 일본 도미노 맞아. 일본 국토교통성이 자율주행 레벨 3 승인 프레임워크를 이미 구축했어. Tesla가 한국에서 승인 전례 만들면 일본 심사가 훨씬 빨라져. 아시아 FSD 수익화 시작이야.", created_at: "2026-06-23T23:53:00.000Z" },
  ],
  [-155]: [
    { alias: "도봉 독수리 #41", content: "Tesla vs Waymo 학습 속도 비교가 핵심이야. Waymo는 하루 1만 5천 마일 실도로 + 수백만 마일 시뮬레이션. Tesla는 전 세계 차량 플릿에서 하루 수천만 마일 실도로 데이터. 이 비대칭이 역전을 만들어.", created_at: "2026-06-23T23:54:00.000Z" },
    { alias: "연희 팔콘 #63", content: "1,000만 마일/월 달성하면 로보택시 사업부 독립 공시 가능성이야. Tesla가 FSD·에너지·자동차 사업부를 분리 보고하기 시작하면 각 사업부 멀티플 합산이 지금 통합 시총보다 훨씬 커. Sum-of-parts 리레이팅이야.", created_at: "2026-06-23T23:50:00.000Z" },
  ],
  [-156]: [
    { alias: "구로 독수리 #77", content: "저궤도 냉각 우위가 진짜야. 우주는 복사 냉각으로 열 방출이 가능해. 지구 데이터센터 냉각 비용이 전체 운영비의 40%인데 우주에서 이게 줄어들면 비용 구조가 완전히 달라져.", created_at: "2026-06-23T23:47:00.000Z" },
    { alias: "강북 팔콘 #51", content: "Dragon XL 발사 비용이 Falcon 9 기준 $60M인데 Starship 기준 $10M으로 낮아지면 우주 데이터센터 경제성이 완전히 달라져. Starship 재사용 확립이 이 사업 현실화의 전제 조건이야.", created_at: "2026-06-23T23:43:00.000Z" },
  ],
  [-157]: [
    { alias: "성동 황소 #84", content: "ARK SPACE ETF AUM이 $2.1B인데 주간 $22M 순매수는 1%야. ARK가 한 주에 특정 종목에 1% 올인하는 경우 드물어. 내부에서 강한 상향 조정 이유가 있다는 뜻이야.", created_at: "2026-06-23T23:40:00.000Z" },
    { alias: "광진 황소 #46", content: "$168 지지선에서 ARK가 대량 매수하면 바닥 수급이 만들어지는 거야. IPO 따상 $200 → 조정 $168이 매수 기회라는 게 ARK가 증명하는 거임. 개인 투자자 매수 심리도 이 수급에 영향 받아.", created_at: "2026-06-23T23:36:00.000Z" },
    { alias: "망원 팔콘 #53", content: "Cathie Wood $300 목표 로드맵에서 가장 중요한 것이 Starlink IPO야. SpaceX 자회사로 Starlink 단독 상장하면 SPCX가 그 지분 보유로 재평가 받아. IPO 타임라인이 나오면 $300이 보수적인 숫자가 될 수 있어.", created_at: "2026-06-23T23:32:00.000Z" },
  ],
  // ── 2026-06-23 추가 (사이버캡·라스롭) ────────────────────────────────────
  [-143]: [
    { alias: "강남 황소 #14", content: "군집 주행 테스트라는 관점이 맞아. 단일 차량 FSD 검증은 이미 끝났고 이제 다중 차량 협업 시스템 테스트야. 우버 같은 플릿 운영 모델 구현하려면 이 단계가 필수야. 진도가 생각보다 빠른 거임.", created_at: "2026-06-23T09:08:00.000Z" },
    { alias: "용산 늑대 #82", content: "기가 텍사스 1주년에 맞춰 이 장면 공개한 게 기가 텍사스가 로보택시 허브로 전환된다는 신호일 수도 있어. 자동차 생산 → 로보택시 운영 거점 전환. 공장 밸류에이션 계산이 달라지는 거야.", created_at: "2026-06-23T09:04:00.000Z" },
    { alias: "서대문 매 #55", content: "S커브 초입이 가장 불확실하고 가장 기회가 큰 구간이야. 지금 이 시점에 포착된 게 스케일업 직전의 증거라면 올해 말 ~내년 초 급격한 변화가 있을 수 있어.", created_at: "2026-06-23T09:00:00.000Z" },
  ],
  [-142]: [
    { alias: "동대문 독수리 #29", content: "Megapack 마진이 30%대라는 게 핵심이야. 자동차 마진 18~20%보다 높은데 이 사업부가 풀 캐파로 돌아가면 전사 마진이 올라가. Q2 에너지 매출 + 마진 둘 다 서프라이즈 가능성이야.", created_at: "2026-06-23T09:00:00.000Z" },
    { alias: "광화문 팔콘 #47", content: "데이터센터 백업 전력 수요가 Megapack 수요를 끌어올리고 있어. AI 붐 → 전력 수요 급증 → Megapack 백로그 쌓임 → 라스롭 풀 캐파. AI 수혜주로 Tesla 에너지 사업부가 재조명받아야 해.", created_at: "2026-06-23T08:56:00.000Z" },
    { alias: "강북 황소 #63", content: "Tesla Semi 납품 가속화도 같이 봐야 해. Semi 충전 인프라 구축하려면 Megapack이 세트로 팔려. 두 제품 시너지로 에너지 사업 매출이 기하급수로 커질 수 있어.", created_at: "2026-06-23T08:52:00.000Z" },
  ],
  // ── 2026-06-23 신규 ──────────────────────────────────────────────────────
  [-141]: [
    { alias: "여의도 황소 #52", content: "연기금 편입 가능해진다는 게 패시브 자금 유입이야. 연기금은 운용 규모가 커서 진입하면 주가 지지력이 달라져. BBB+ 획득이 SPCX 투자자 기반을 완전히 바꾸는 이벤트야.", created_at: "2026-06-23T08:54:00.000Z" },
    { alias: "신촌 독수리 #67", content: "Moody's Baa1이 S&P BBB+보다 한 단계 높다는 게 포인트야. 세 곳 중 하나라도 낮게 주면 일부 기관이 제외되는데 다 통과했어. Stable outlook까지 — 향후 1~2년 강등 위험 없다는 신호야.", created_at: "2026-06-23T08:50:00.000Z" },
    { alias: "강남 팔콘 #38", content: "우주 기업이 투자등급 받는 게 얼마나 힘든 건지 — 재무 안정성·사업 지속성·경영진 역량 다 심사받는 거야. SpaceX가 통과했다는 게 사업 모델 검증이야. 기관들이 이제 안심하고 담을 수 있는 거임.", created_at: "2026-06-23T08:46:00.000Z" },
  ],
  [-140]: [
    { alias: "마포 팔콘 #61", content: "$100B 현금이면 현재 SPCX 시총의 몇 % 수준인지가 중요해. 기업이 시총 대비 현금 비율이 높으면 하방이 단단해지거든. Apple이 그래서 안정적이잖아. SpaceX도 같은 논리야.", created_at: "2026-06-23T08:46:00.000Z" },
    { alias: "노원 황소 #44", content: "Starlink 기업용 요금이 월 $1,000 이상인데 기업·정부 고객이 수백만이면 월 수십억 달러 자동 수금이야. 이 반복 매출 기반이 $100B 현금 쌓인 원동력임. 구독 모델의 힘이야.", created_at: "2026-06-23T08:42:00.000Z" },
    { alias: "영등포 늑대 #78", content: "$100B 현금 있는 회사가 채권까지 발행하는 이유가 레버리지 최적화임. 저금리 장기 채권으로 현금을 투자에 쓰면 자본 효율이 올라가. 재무 전략이 성숙 단계에 접어든 거야.", created_at: "2026-06-23T08:38:00.000Z" },
  ],
  [-139]: [
    { alias: "서초 팔콘 #48", content: "채권 발행 첫 번째라는 게 중요해. 시장에서 '정가'를 처음 매기는 거야. 수요가 몰리면 금리가 내려가고 SpaceX 신용 프리미엄이 실시간으로 확인되는 거임. 어떤 금리로 결정되냐가 다음 대규모 발행의 기준이 돼.", created_at: "2026-06-23T08:46:00.000Z" },
    { alias: "강동 독수리 #33", content: "브릿지론 → 장기 채권 대체가 재무 구조 개선이야. 단기 고금리 브릿지론을 장기 저금리 채권으로 교체하면 이자 비용 낮아지고 만기 위험 없어지는 거임.", created_at: "2026-06-23T08:42:00.000Z" },
  ],
  [-138]: [
    { alias: "종로 팔콘 #29", content: "$155~160 공모가 지지선을 지키면 장기 투자자 입장에서 이 조정은 노이즈야. 처음 IPO 때 $200 간 게 유동성 프리미엄이었고 $168로 내려온 게 적정가 탐색 과정이야. 펀더멘털 바뀐 게 없어.", created_at: "2026-06-23T08:40:00.000Z" },
    { alias: "구로 팔콘 #85", content: "10거래일 사이클이 다른 IPO랑 비교하면 빠른 편이야. 유동성 충격 없이 빠르게 균형 찾으면 오히려 건강한 신호야. $168이 새 베이스가 되면 여기서 쌓이는 거임.", created_at: "2026-06-23T08:36:00.000Z" },
    { alias: "성북 늑대 #71", content: "pre-IPO $100 이하 취득자들이 +68%인데 이들이 매도 압력 줄이는 게 핵심이야. 단기 차익 실현 지나가고 나면 수급이 다시 균형 잡히는 거임. 지금 조정이 그 과정이야.", created_at: "2026-06-23T08:32:00.000Z" },
  ],
  [-137]: [
    { alias: "관악 독수리 #41", content: "Anthropic·Google·Reflection AI가 전부 AI 파운데이션 모델 회사야. 모델 학습에 GB300 최신 GPU가 핵심인데 Colossus가 그걸 가장 빨리 공급하는 거야. 공급망 우위가 고객을 묶는 거임.", created_at: "2026-06-23T08:32:00.000Z" },
    { alias: "동작 황소 #63", content: "$6.38B이 3번째 고객이잖아. 1·2번이 Anthropic·Google이면 Reflection AI의 규모가 그 수준이라는 거야. 성장하는 AI 스타트업들이 Colossus 고객이 되면 반복 계약 확장도 기대할 수 있어.", created_at: "2026-06-23T08:28:00.000Z" },
    { alias: "성동 늑대 #37", content: "월 $100M이 들어오면 연 $1.2B이야. 3개 고객 합산하면 연 수십억 달러 AI 컴퓨팅 매출이 생기는 거임. SpaceX가 우주 기업 + AI 인프라 기업이라는 스토리가 숫자로 증명되는 거야.", created_at: "2026-06-23T08:24:00.000Z" },
  ],
  [-136]: [
    { alias: "송파 팔콘 #44", content: "Jefferies가 자동차 아닌 AI 플랫폼 프레임으로 분류하면 밸류에이션 방법론 자체가 달라져. P/E 대신 EV/S나 플랫폼 멀티플 적용하면 목표주가가 $375보다 훨씬 높게 계산될 수 있어.", created_at: "2026-06-23T08:24:00.000Z" },
    { alias: "강북 황소 #55", content: "Jefferies 커버리지 리포트가 기관 투자자 투자 제안서 작성 근거가 돼. 대형 펀드가 Tesla를 새로 담을 때 이 프레임을 쓰는 거야. 프레임 전환이 수조 원 자금 유입의 단초가 되는 거임.", created_at: "2026-06-23T08:20:00.000Z" },
    { alias: "중랑 팔콘 #82", content: "목표주가 상향 발표 이후 다른 증권사 도미노가 나올 거야. Jefferies가 $375 내면 모건스탠리·골드만이 리뷰하는 계기가 되거든. 순차적 상향이 이어지면 주가 상승 모멘텀이 강해져.", created_at: "2026-06-23T08:16:00.000Z" },
  ],
  [-135]: [
    { alias: "은평 황소 #76", content: "384k 컨센서스 상회 시 '어닝 서프라이즈' 발표 전 효과가 미리 나오는 거야. 인도량이 EPS 추정에 영향 미치니까 애널들이 즉시 상향 조정해. 주가 반응이 빠를 거임.", created_at: "2026-06-23T08:16:00.000Z" },
    { alias: "강서 독수리 #91", content: "Q1 345k에서 Q2 384k면 +39k인데 상하이가 혼자 그 중 상당 부분 만드는 거야. 유럽 수출 볼륨 포함이라 실제 상하이 생산은 더 높을 거임. 중국 공장이 글로벌 공급 허브 역할 제대로 하는 거야.", created_at: "2026-06-23T08:12:00.000Z" },
  ],
  [-134]: [
    { alias: "광진 황소 #53", content: "CAAM 데이터가 분기별로 업데이트되는데 Tesla가 계속 플러스 유지하면 중국 시장 내러티브가 바뀌어. '중국 리스크'에서 '중국 성장'으로. 이 내러티브 전환이 주가 리레이팅이야.", created_at: "2026-06-23T08:08:00.000Z" },
    { alias: "양천 팔콘 #67", content: "BYD 가격 인하에도 Tesla가 버티는 게 브랜드 프리미엄이야. 가격 경쟁 안 하면서 성장 유지하는 게 마진 방어 측면에서 훨씬 건강해. 중국 이익률이 Tesla 전체 마진에 핵심이거든.", created_at: "2026-06-23T08:04:00.000Z" },
  ],
  [-133]: [
    { alias: "마포 늑대 #84", content: "7~8월 시작이면 H2 2026에 첫 생산 배치가 나오는 거야. 이게 실적 발표에서 '로봇 사업 첫 언급'이 될 거임. 그날 주가 반응이 예상보다 클 수 있어.", created_at: "2026-06-23T08:54:00.000Z" },
    { alias: "노원 독수리 #62", content: "Model S/X 라인 전환이라는 게 이미 정밀 제조 설비가 깔려있다는 거야. 새 공장 짓는 것보다 훨씬 빨리 ramp-up 가능해. 라인 전환 결정이 양산 속도를 앞당긴 거임.", created_at: "2026-06-23T08:50:00.000Z" },
    { alias: "서초 황소 #73", content: "연간 1M대 목표 + 오스틴 10M대 = Tesla 로봇 capacity가 아이폰 연 2억 대 넘어설 수 있어. 그게 실현되면 세상에서 가장 많이 팔리는 제품이 Tesla 로봇인 거야. 터무니없어 보이지만 이전에도 그런 말 했다가 맞은 게 많아.", created_at: "2026-06-23T08:46:00.000Z" },
  ],
  [-132]: [
    { alias: "여의도 늑대 #56", content: "노벨상 수상자가 어디로 이동하면 그게 뉴스가 되는 시대야. AI 연구자 1명이 주가 움직이는 게 전례없어. 이제부터 빅테크 AI 수석 연구자 이동이 실적만큼 주가에 영향 미칠 거임.", created_at: "2026-06-23T08:42:00.000Z" },
    { alias: "관악 늑대 #83", content: "Anthropic이 Jumper 유치한 거면 Claude 4 이후 모델이 기대 이상일 수 있어. 비상장이라 직접 투자는 못하지만 간접적으로 AWS·Google Cloud와의 Anthropic 파트너십 수혜를 볼 수 있지.", created_at: "2026-06-23T08:38:00.000Z" },
    { alias: "도봉 황소 #65", content: "구글 입장에서는 재능 유출이 가장 큰 위기야. 채용 연봉 천장이 없어지는 거임. AI 인재 보유 비용이 마진을 갉아먹기 시작하면 구글 장기 수익성 예측도 바뀌어.", created_at: "2026-06-23T08:34:00.000Z" },
  ],
  [-131]: [
    { alias: "강남 황소 #24", content: "Xbox 빼고 Copilot·Azure에 집중한다는 게 선택과 집중의 교과서야. 성장률 낮은 사업 팔고 폭발적 성장 사업에 올인하는 거임. MSFT 주가가 장기적으로 봤을 때 긍정적 전략이야.", created_at: "2026-06-23T08:34:00.000Z" },
    { alias: "강서 늑대 #72", content: "$103.8B 현금 + Xbox 매각 수익 = 대형 AI 딜 여력이야. OpenAI 추가 투자나 AI 스타트업 인수 자금이 생기는 거임. AI 플랫폼 패권 싸움에서 MSFT가 탄약을 더 쌓는 거야.", created_at: "2026-06-23T08:30:00.000Z" },
    { alias: "종로 독수리 #49", content: "PVGO 36%가 AI 수익화 반영되면 S&P500 평균 55% 수준으로 올라가는 게 재평가야. Xbox 없앤 뒤 Copilot EPS 기여가 숫자로 잡히면 그 멀티플 전환이 실제로 일어나는 거임.", created_at: "2026-06-23T08:26:00.000Z" },
  ],
  // ── 2026-06-22 신규 ──────────────────────────────────────────────────────
  [-130]: [
    { alias: "여의도 독수리 #38", content: "Cursor SaaS 모델이 SpaceX 수익 구조 안정화에 핵심이야. 발사 사업은 분기별 편차가 크거든. Cursor 월정액이 들어오면 기저 매출이 안정적으로 깔리는 거임. IPO 밸류에이션이 올라가는 이유야.", created_at: "2026-06-22T08:54:00.000Z" },
    { alias: "신촌 팔콘 #82", content: "Cursor × Starlink 묶음 패키지 상상해봐. 개발자가 Cursor 구독하면 Starlink 기업 플랜 할인해주는 거야. 고객 LTV가 폭발적으로 올라가는 번들 전략이 가능한 거임.", created_at: "2026-06-22T08:50:00.000Z" },
    { alias: "강서 매 #29", content: "머스크 AI 생태계 수직통합 속도가 놀라워. xAI Grok + Tesla FSD + SpaceX Cursor = AI 인프라·소프트웨어·하드웨어 통합이야. 한 생태계 안에서 다 해결되는 구조가 만들어지는 거임.", created_at: "2026-06-22T08:46:00.000Z" },
  ],
  [-129]: [
    { alias: "관악 황소 #54", content: "Semi FSD 마일당 과금 모델이 Tesla 전체 비즈니스 모델 중에 가장 명확한 ROI야. 운송 회사 입장에서 기사 인건비 없애는 게 가장 큰 비용 절감이거든. 채택 속도가 예상보다 빠를 거임.", created_at: "2026-06-22T08:50:00.000Z" },
    { alias: "마포 독수리 #73", content: "LIDAR 보정 → 카메라 AI 정확도 향상이 Semi에서 특히 중요해. 대형 트럭이 고속도로에서 실수하면 피해 규모가 크니까 정밀도 기준이 일반 승용차보다 높아. 이게 충족되면 보험사가 인증해주는 거야.", created_at: "2026-06-22T08:46:00.000Z" },
    { alias: "노원 팔콘 #47", content: "Semi 자율주행 양산 전 LIDAR 테스트가 얼마나 진행됐느냐가 FSD 9.x 업데이트에 반영될 것 같아. Semi 데이터 → FSD 학습 → 승용차 정확도 향상 선순환이 가능한 거임.", created_at: "2026-06-22T08:42:00.000Z" },
  ],
  [-128]: [
    { alias: "종로 황소 #38", content: "DGT 인증 275,471km이 단순 테스트 통과가 아닌 게 도심·고속도로·복잡 교차로 포함 실도로라는 거야. 규제기관이 '실제 환경에서 검증됨'이라고 도장 찍은 거임. EU 규제 논의 테이블에 올라갈 수 있는 데이터야.", created_at: "2026-06-22T08:46:00.000Z" },
    { alias: "강남 늑대 #57", content: "FSD 유럽 구독 가격이 얼마일지가 관심이야. 미국 $99/월 대비 유럽은 구매력 감안해서 €89~109 사이로 설정할 것 같아. EU 2.5억 잠재 구독자에 그 가격이면 어마어마한 시장이야.", created_at: "2026-06-22T08:42:00.000Z" },
    { alias: "서대문 팔콘 #91", content: "스페인 이후 네덜란드 RDW 인증(5/26 발표)이랑 합치면 EU 2개국 인증이야. 이게 눈덩이처럼 굴러가면 2026 하반기에 EU 5~6개국 동시 FSD 서비스 개시가 가능한 시나리오야.", created_at: "2026-06-22T08:38:00.000Z" },
  ],
  [-127]: [
    { alias: "구로 황소 #64", content: "5분기 2.84배 성장이 선형이 아니라 가속되는 것처럼 보여. 인식이 높아질수록 채택 속도가 빨라지는 네트워크 효과야. 유럽 열리면 성장 곡선 기울기가 더 가팔라질 거임.", created_at: "2026-06-22T08:42:00.000Z" },
    { alias: "동작 팔콘 #18", content: "로보택시 출시 전에 FSD 구독자 기반이 쌓이는 게 전략적으로 중요해. 이미 FSD 써본 사람들이 로보택시 첫 탑승자가 되는 거야. 전환율이 높을 수밖에 없어.", created_at: "2026-06-22T08:38:00.000Z" },
    { alias: "양천 황소 #25", content: "소프트웨어 전환 KPI로 구독자 수 추적하는 게 맞다는 거 동의함. 이게 EPS에 반영되기 시작하면 소프트웨어 회사 멀티플 받는 Tesla 재평가 논리가 생기는 거야.", created_at: "2026-06-22T08:34:00.000Z" },
  ],
  [-126]: [
    { alias: "성북 팔콘 #63", content: "AI 데이터센터 전력 수요가 진짜 문제야. 전력망 연결 대기가 수년인 지역도 있거든. MEGAPOD가 독립 전원 + ESS 패키지로 오면 전력망 대기 없이 AI 인프라 확장 가능해.", created_at: "2026-06-22T08:39:00.000Z" },
    { alias: "도봉 황소 #82", content: "Tesla Autobidder와 MEGAPOD 결합이 핵심이야. 에너지 저장 + AI 자동 거래 = 그리드 안정화 + 수익 최적화가 동시에 되는 거야. 경쟁사가 복제하기 어려운 통합 솔루션임.", created_at: "2026-06-22T08:35:00.000Z" },
  ],
  [-125]: [
    { alias: "은평 황소 #47", content: "6개월 ROI 계산이 기업 CFO한테 승인 통과시키기 쉬운 숫자야. 인건비 절감 ROI가 이렇게 명확한 CAPEX 투자 아이템이 드물거든. 도입 의사결정이 빠를 거임.", created_at: "2026-06-22T08:36:00.000Z" },
    { alias: "금천 늑대 #35", content: "2025 내부 배치 영상이 나오면 그게 자동으로 마케팅이야. Tesla 공장에서 로봇이 Tesla 차 만드는 영상이 소셜미디어에 퍼지면 수요 예약이 쏟아지는 거임. 비용 없는 마케팅이야.", created_at: "2026-06-22T08:32:00.000Z" },
    { alias: "광진 팔콘 #91", content: "외부 판매 2027이면 지금부터 1년 남은 거야. 제조업체들이 미리 파일럿 계획 세우고 예산 잡는 시점이야. B2B 영업 사이클 감안하면 2026 말부터 기업 고객 발표가 나올 거임.", created_at: "2026-06-22T08:28:00.000Z" },
  ],
  [-124]: [
    { alias: "중구 황소 #17", content: "멀티모달 AI 통합이 경쟁사 대비 절대 우위인 게 데이터 공유 자유도야. Google Waymo는 사내 AI 있지만 데이터 사일로 문제가 있어. Tesla·xAI는 같은 머스크 생태계라 데이터가 자유롭게 흘러.", created_at: "2026-06-22T08:33:00.000Z" },
    { alias: "강동 팔콘 #58", content: "'말로 하는 FSD'가 완성되면 구독 이탈률이 급감해. 한 번 습관이 되면 못 끊는 기능이야. 이탈률 낮아지면 구독 LTV가 올라가고 전체 소프트웨어 사업 가치가 재평가돼.", created_at: "2026-06-22T08:29:00.000Z" },
  ],
  [-123]: [
    { alias: "용산 황소 #72", content: "'풍요 패키지' B2B 판매 아이디어가 현실적이야. AI 공장 자동화 + 물류 자율주행 + 에너지 자립이 묶이면 기업 고객이 하나의 계약으로 해결하는 거야. 계약 단가가 수억 달러도 가능해.", created_at: "2026-06-22T08:30:00.000Z" },
    { alias: "마포 늑대 #39", content: "Amazing Abundance 브랜드가 Tesla를 '풍요 인프라 기업'으로 포지셔닝하는 거야. ESG 관심 기업이 이 패키지 사면 탄소 중립 + AI 효율화 + 비용 절감 다 해결되는 거임. TAM이 달라지는 스토리야.", created_at: "2026-06-22T08:26:00.000Z" },
  ],
  [-122]: [
    { alias: "강남 매 #84", content: "DoD SATCOM 예산 $60억+ 대비 $22.9억이 시작이라는 분석이 맞아. 성과가 확인되면 DoD가 Starlink Military 비중을 계속 늘리는 구조야. 계약 갱신 + 신규 계약이 반복되는 정부 매출이 생기는 거임.", created_at: "2026-06-22T08:27:00.000Z" },
    { alias: "서초 황소 #46", content: "군사 통신 계약에서 중요한 건 인증 선례야. USSF 계약이 있으면 다른 NATO 국가 국방부가 '미국도 승인한 시스템'이라고 검토 기간 단축해. 영국·독일·프랑스 계약이 빠르게 따라올 거임.", created_at: "2026-06-22T08:23:00.000Z" },
    { alias: "노원 매 #63", content: "SpaceX 정부 계약 모음이 연 $50억+ 추정이야. 안정적 반복 매출이 IPO 후 분기 실적 안정성을 만드는 거야. 발사 계약 성수기·비수기 없이 평탄한 매출 기반이 생기는 거임.", created_at: "2026-06-22T08:19:00.000Z" },
  ],
  [-121]: [
    { alias: "강서 독수리 #27", content: "궤도 클라우드 개념이 2030년대 주요 시장이 될 거야. 재난·분쟁·오지 지역에서 지상 인프라 없이 AI 추론 = Starlink AI 위성 독점이야. 이 시장은 AWS도 진입 못 해.", created_at: "2026-06-22T08:24:00.000Z" },
    { alias: "중랑 팔콘 #55", content: "V3 테라비트 속도로 엔터프라이즈 고객 확보하고 AI 위성으로 프리미엄 서비스 쌓는 단계적 전략이야. 각 단계마다 ARPU가 올라가는 구조임. 장기 수익 가시성이 확보되는 거야.", created_at: "2026-06-22T08:20:00.000Z" },
    { alias: "도봉 늑대 #48", content: "Starship 비용 혁신이 없으면 이 로드맵이 불가능해. V3 위성 수천 개를 저비용으로 올릴 수 있는 게 SpaceX만의 능력이야. 경쟁사가 2030년대에 이걸 따라가기 어려운 이유임.", created_at: "2026-06-22T08:16:00.000Z" },
  ],
  [-120]: [
    { alias: "강남 황소 #93", content: "B2B2C 파트너십이 영리한 건 마케팅 비용 없이 가입자 확보라는 거야. US Mobile 기존 고객 수백만이 Starlink 잠재 구독자가 되는 거임. CAC(고객 획득 비용) 제로야.", created_at: "2026-06-22T08:21:00.000Z" },
    { alias: "송파 팔콘 #37", content: "150개국이면 진정한 글로벌 커버리지야. 비즈니스 여행자·선원·원정대 같이 지속적으로 이동하는 고객층은 Starlink 외에 대안이 없어. 이 고객들 이탈률이 0에 가까울 거임.", created_at: "2026-06-22T08:17:00.000Z" },
  ],
  [-119]: [
    { alias: "강동 황소 #44", content: "QQQ $3,000억에서 RKLB 0.15% 편입이면 $4.5억 자동 매수야. 이게 며칠에 걸쳐 집행되는데 주가 영향이 의미 있을 거임. 편입 발표 후 실제 편입일까지 모멘텀 구간이야.", created_at: "2026-06-22T08:18:00.000Z" },
    { alias: "구로 팔콘 #72", content: "우주 섹터가 NASDAQ100에 공식 편입됐다는 게 기관 투자자들한테 신호야. '우주 = 투기성 테마'라는 인식이 '우주 = 주류 성장 섹터'로 바뀌는 전환점이야. 기관 비중 확대가 따라올 거임.", created_at: "2026-06-22T08:14:00.000Z" },
    { alias: "목동 팔콘 #53", content: "뉴트론 엔진 개발 완료가 RKLB 다음 카탈리스트야. 중대형 발사 시장 진입하면 매출 구조가 완전히 달라지는 거야. 지수 편입 + 뉴트론 발사가 겹치면 2027이 RKLB 빅이어야.", created_at: "2026-06-22T08:10:00.000Z" },
  ],
  [-118]: [
    { alias: "판교 황소 #68", content: "Walmart 추월이 상징적인 이유가 소매업 정의를 바꿨다는 거야. 물리적 점포 없이 더 많이 파는 게 가능하다는 걸 증명한 거임. 이 프리미엄이 주가에 더 많이 반영돼야 해.", created_at: "2026-06-22T08:15:00.000Z" },
    { alias: "하남 매 #31", content: "커머스 + 클라우드 + 광고 3개가 다 TOP 3 안에 있는 기업이 AMZN뿐이야. 이 다각화가 경기 변동에도 버티는 이유임. 어느 하나 흔들려도 나머지 두 개가 받쳐주는 구조야.", created_at: "2026-06-22T08:11:00.000Z" },
    { alias: "성북 팔콘 #52", content: "AMZN PE 이야기할 때 AWS만 따로 보면 PE 40x 이상 받을 자격 있어. 커머스 할인이 전체 멀티플을 누르고 있는 거야. AWS 분리 논의가 나올 때마다 AMZN 주가가 반응하는 이유임.", created_at: "2026-06-22T08:07:00.000Z" },
  ],
  [-117]: [
    { alias: "여의도 황소 #84", content: "백로그가 선불 약정이라서 경기 침체 와도 기업들이 취소하기 어려워. 위약금 조항 있거든. 이게 클라우드 3사 매출의 안정성을 만드는 거임. 다운사이드 리스크가 제한적인 이유야.", created_at: "2026-06-22T08:12:00.000Z" },
    { alias: "강남 독수리 #71", content: "Azure +215%가 사실상 OpenAI 수요 독점이야. ChatGPT 서버가 다 Azure에서 돌아가는 거거든. OpenAI 사용자 늘수록 Azure 매출 자동 증가 구조임. 이 모델이 부러울 정도야.", created_at: "2026-06-22T08:08:00.000Z" },
  ],
  [-116]: [
    { alias: "강서 황소 #38", content: "HBM 마진 50~60% 가정이 보수적일 수 있어. HBM3E는 공급이 3사만 가능하고 수요는 NVDA 출하량에 연동이야. 과점 + 수요 확실한 구조에서 마진이 더 올라갈 여지 있음.", created_at: "2026-06-22T08:09:00.000Z" },
    { alias: "동작 황소 #67", content: "HBM3E 에너지 효율 30%+ 우위가 데이터센터 전력 비용 측면에서 의미 있어. 데이터센터 운영자가 전기료 내는 입장이라 에너지 효율 좋은 칩 선호해. 이게 지속적인 MU 선택 이유임.", created_at: "2026-06-22T08:05:00.000Z" },
    { alias: "구로 매 #41", content: "메모리 사이클 + HBM 믹스 개선이 겹치는 구간이 지금이야. 업황이 올라가면서 동시에 고마진 제품 비중이 늘어나는 이중 수혜야. 이런 구간이 흔하지 않아. 최적 진입 타이밍임.", created_at: "2026-06-22T08:01:00.000Z" },
  ],
  [-115]: [
    { alias: "성동 황소 #55", content: "PVGO 낮은 기업이 실제 성장률 높으면 수학적으로 저평가야. META AI 광고 수익화 + Llama 오픈소스 생태계 확장이 PVGO 올리는 트리거임. Reality Labs 적자가 줄어들 때 재평가가 와.", created_at: "2026-06-22T08:06:00.000Z" },
    { alias: "노원 황소 #29", content: "MSFT Copilot이 EPS에 본격 반영되는 시점이 2026 H2~2027이야. Fortune 500 70% 도입에서 실제 청구로 이어지는 시점이거든. 그때 PVGO 재평가와 함께 주가 레벨 업이 오는 거임.", created_at: "2026-06-22T08:02:00.000Z" },
    { alias: "강남 팔콘 #83", content: "S&P500 평균 PVGO 55%를 기준점으로 META 35.3%·MSFT 36%가 얼마나 낮은지 한눈에 보여. 시장이 두 회사 AI 수익화를 과소평가하는 동안 포지션 쌓는 게 전략이야.", created_at: "2026-06-22T07:58:00.000Z" },
  ],
  [-114]: [
    { alias: "여의도 팔콘 #52", content: "버핏이 기술주 회의론자인 게 사실인데 GOOGL의 현재 이익 기반 가치가 너무 탄탄해서 넘어간 거야. 가치주 기준 통과한 성장주가 버핏한테 최고야. GOOGL이 딱 그 케이스임.", created_at: "2026-06-22T08:03:00.000Z" },
    { alias: "서초 매 #47", content: "AI 검색이 기존 검색 대체가 아니라 검색 확장이라는 게 증명되면 GOOGL 광고 해자가 더 강화돼. AI Overview로 검색 세션 길어지면 광고 노출도 늘어나는 거야. 버핏이 이 논리 봤을 거임.", created_at: "2026-06-22T07:59:00.000Z" },
    { alias: "강북 황소 #38", content: "버크셔 Top 5에서 #1 AAPL 46%가 차지하는 거 감안하면 GOOGL 편입 비중이 4~5% 가정해도 수십억 달러야. 이 포지션 쌓으려면 오래 매수한 거임. 이미 많이 모은 거야.", created_at: "2026-06-22T07:55:00.000Z" },
  ],
  [-113]: [
    { alias: "강남 황소 #77", content: "18A 수율 잡는 게 핵심이라는 분석 동의함. TSMC도 3nm 수율 잡는 데 2~3년 걸렸어. Intel이 그 시간을 줄이면 2027~2028에 첫 대형 고객 발표 나올 수 있어. 그게 10배 스토리 시작이야.", created_at: "2026-06-22T08:00:00.000Z" },
    { alias: "서대문 황소 #62", content: "지정학 리스크 헤지 수요가 Intel 파운드리의 숨겨진 카드야. TSMC 대만 의존도 줄이려는 빅테크가 하나만 Intel 파운드리 계약하면 뉴스가 나오고 다른 기업들도 관심 갖는 도미노가 일어나.", created_at: "2026-06-22T07:56:00.000Z" },
    { alias: "금천 황소 #29", content: "No Profits 팟캐스트에 CEO가 직접 나온 게 소통 의지야. 기존 Intel이 폐쇄적인 IR이었는데 Nimrod가 바꾸는 거야. 투자자 신뢰 회복이 멀티플 재평가의 첫 번째 조건임. 좋은 신호야.", created_at: "2026-06-22T07:52:00.000Z" },
  ],

  // ── 2026-06-20 신규 ──────────────────────────────────────────────────────
  [-100]: [
    { alias: "강남 팔콘 #62", content: "Q3에서 로보택시 라인이 처음 매출로 잡히는 거 맞아. EPA CoC + NHTSA ADA 인증 완비됐으니 이제 규제 리스크가 사실상 제거된 거임. 오스틴 확대 속도가 Q3 숫자의 관건이야.", created_at: "2026-06-20T08:44:00.000Z" },
    { alias: "동작 독수리 #15", content: "2개월이면 8월 말~9월 초야. Q3 실적 발표 전에 오스틴 확대 뉴스가 나올 거임. 이게 실적 기대감 높이는 모멘텀이 되는 구조야.", created_at: "2026-06-20T08:40:00.000Z" },
    { alias: "노원 황소 #66", content: "B2B 로보택시 계약 포함 포인트가 중요함. 개인 소비자 로보택시보다 기업 계약이 마진 훨씬 높음. ADA 인증이 그 계약의 선결 조건이거든.", created_at: "2026-06-20T08:36:00.000Z" },
  ],
  [-101]: [
    { alias: "광진 매 #55", content: "신공장 CAPEX 25% 이상 절감이면 테라팩토리 확장 속도가 달라짐. 단위당 고정비 내려가면 BEP 맞추는 생산량이 줄어드는 거야. 수익성 전환이 빨라지는 구조임.", created_at: "2026-06-20T08:40:00.000Z" },
    { alias: "마포 황소 #11", content: "환경 설비 비용 제거가 생각보다 커. 도장 공장 환경 처리는 지자체 인허가도 오래 걸리거든. Liquid Armor 쓰면 그 과정이 생략돼서 공장 착공~완공 기간이 단축됨.", created_at: "2026-06-20T08:36:00.000Z" },
    { alias: "은평 매 #72", content: "Model 2 프로젝트에서 $25,000 목표가가 현실이 되는 핵심 기술이 이거임. 도장 없애면 원가 내려가고 그게 마진 없이 저가 출시할 수 있는 근거가 되는 거야.", created_at: "2026-06-20T08:32:00.000Z" },
  ],
  [-102]: [
    { alias: "신촌 늑대 #33", content: "EPA CoC + Liquid Armor + Cathie Wood 매수가 같은 날 나온 게 우연이 아님. 기관들이 이벤트를 기다리다가 한꺼번에 움직이는 패턴이야. 신호가 쌓이면 다음 레그 업이 나와.", created_at: "2026-06-20T08:36:00.000Z" },
    { alias: "여의도 올빼미 #44", content: "22.6배 할인 논리가 ARK 특유의 방식이긴 한데 핵심 메시지는 맞음. FSD·로보택시·에너지가 주가에 하나도 안 들어가 있다는 거야. 이게 들어가기 시작하면 레이팅이 달라짐.", created_at: "2026-06-20T08:32:00.000Z" },
    { alias: "목동 황소 #23", content: "$20M이 절대 금액은 크지 않아도 ARK 멀티펀드 동시 매입 패턴이 나오면 확신 시그널임. 이전에 이 패턴 나올 때마다 6개월 이내 큰 움직임 있었어.", created_at: "2026-06-20T08:28:00.000Z" },
  ],
  [-103]: [
    { alias: "판교 황소 #31", content: "신용평가사가 섹터 분류 기준으로 Tesla를 자동차로 묶는 게 문제야. FSD ARR·에너지·로보택시는 테크·유틸리티 평가 모델이 맞거든. 분류 바뀌면 등급 바뀌는 거임.", created_at: "2026-06-20T08:32:00.000Z" },
    { alias: "하남 독수리 #44", content: "머스크가 공개 발언으로 압박 넣은 건 신용평가사 리뷰 사이클 앞두고 한 거일 가능성 높아. 등급 리뷰 일정 확인해봐야 함. 선행 움직임이 나올 수 있어.", created_at: "2026-06-20T08:28:00.000Z" },
    { alias: "성북 까마귀 #28", content: "$40B+ 현금 무부채 기업이 BBB 받는 건 실제로 이례적임. S&P가 이걸 업그레이드하면 기관 투자자 풀이 A등급 제한 기관까지 넓어져. 수급 구조가 바뀌는 거야.", created_at: "2026-06-20T08:24:00.000Z" },
  ],
  [-104]: [
    { alias: "강남 독수리 #52", content: "4.9% 유통이 얼마나 희소한 거냐면 — 같은 시총 기업 대비 공급이 1/20 수준이야. 수급 불균형이 프리미엄을 만드는 거고, 이게 Day 366 전까지 유지되는 구조임.", created_at: "2026-06-20T08:28:00.000Z" },
    { alias: "여의도 매 #17", content: "Day 366 락업 해제 = 주가 급락이 아닐 수 있어. Musk가 실제로 팔지 않으면 공급 충격 없음. Form4 공시 보면서 실제 매도 여부 확인하는 게 중요함.", created_at: "2026-06-20T08:24:00.000Z" },
    { alias: "목동 황소 #23", content: "락업 해제 전후 변동성 구간이 장기 홀더한테는 오히려 기회야. 이 구조 알고 있는 투자자가 락업 해제 급락 시 저가 매수 포지션 잡는 거임.", created_at: "2026-06-20T08:20:00.000Z" },
  ],
  [-105]: [
    { alias: "강서 황소 #91", content: "86% 점유에서 경쟁사 합산 14%인데 그 14% 안에 수십 개 나라 발사체가 다 들어가 있어. Falcon 재사용 비용 우위가 구조적으로 깨지지 않으면 이 격차는 더 벌어짐.", created_at: "2026-06-20T08:24:00.000Z" },
    { alias: "강남 팔콘 #62", content: "Starship 대형 화물이 추가되면 단일 발사당 Upmass가 100톤이야. 지금 Falcon 9 기준 20톤인데 5배 점프임. 이게 Upmass 점유율을 90%+ 밀어올리는 거임.", created_at: "2026-06-20T08:20:00.000Z" },
    { alias: "동작 독수리 #15", content: "Bryce Tech 공식 데이터 출처가 신뢰성 높음. 이 숫자가 SPCX 투자 논리의 핵심 근거야. 점유율 데이터 분기마다 체크하는 게 SPCX 홀더 루틴이 돼야 해.", created_at: "2026-06-20T08:16:00.000Z" },
  ],
  [-106]: [
    { alias: "노원 황소 #66", content: "DT가 유럽 50개국 커버라는 게 포인트야. T-Mobile 미국 + DT 유럽이면 선진국 이동통신 시장 대부분에 Starlink DTS가 깔리는 거임. 볼륨이 완전히 달라지는 거야.", created_at: "2026-06-20T08:20:00.000Z" },
    { alias: "광진 매 #55", content: "B2B 통신사 파트너십이 직접 구독보다 단가는 낮아도 볼륨이 압도적이야. 아마존처럼 박리다매로 총 수익 키우는 전략임. ARR이 잡히기 시작하면 밸류에이션 프레임 바뀜.", created_at: "2026-06-20T08:16:00.000Z" },
    { alias: "마포 황소 #11", content: "기존 폰으로 수신 가능하다는 게 진입 장벽 제거야. 별도 단말 필요 없으면 DT 기존 가입자가 자동으로 잠재 사용자가 돼. 이게 초기 채택률을 높이는 핵심 요인이야.", created_at: "2026-06-20T08:12:00.000Z" },
  ],
  [-107]: [
    { alias: "신촌 늑대 #33", content: "드론 영상이 중요한 이유가 '착공 확인'이거든. 계획이 아니라 실제 공사가 시작됐다는 거야. 텍사스 인허가 속도 감안하면 2027 1차 완공도 충분히 현실적이야.", created_at: "2026-06-20T08:16:00.000Z" },
    { alias: "여의도 올빼미 #44", content: "$250B 규모면 CHIPS Act 2차 보조금 대상 1순위야. 미국 정부가 AI·우주 제조 패권 전략상 이 프로젝트 지원 안 할 이유가 없어. 보조금 붙으면 CAPEX 부담 줄어드는 거임.", created_at: "2026-06-20T08:12:00.000Z" },
    { alias: "은평 매 #72", content: "SpaceX·xAI·Tesla 3사 시너지가 물리적 인접으로 극대화돼. AI 칩이 만들어지는 곳에서 AI가 학습되고 그 AI가 차·로켓에 올라가는 구조야. 수직 통합의 완성형임.", created_at: "2026-06-20T08:08:00.000Z" },
  ],
  [-108]: [
    { alias: "강남 독수리 #52", content: "Q1 2025 66% → Q1 2026 74%가 경쟁 심화에도 올랐다는 거야. 이게 해자 강화의 증거임. CUDA 전환 비용이 너무 크기 때문에 이 추세가 단기간에 꺾이지 않아.", created_at: "2026-06-20T08:12:00.000Z" },
    { alias: "여의도 매 #17", content: "AI 인프라 지출 $56B 시장에서 NVDA가 $41B 가져가는 거야. 이 시장 자체가 매년 성장하는데 점유율도 올라가면 복리로 매출 증가하는 거임. 수식 자체가 완성임.", created_at: "2026-06-20T08:08:00.000Z" },
    { alias: "목동 황소 #23", content: "AMZN Trainium 외판 검토가 위협이 되려면 OpenAI·Anthropic이 CUDA 코드베이스를 Trainium용으로 다 재작성해야 해. 이게 수개월~수년 걸리는 작업임. 단기 위협 아니야.", created_at: "2026-06-20T08:04:00.000Z" },
  ],
  [-109]: [
    { alias: "판교 황소 #31", content: "AMZN이 칩 외판하면 AWS 클라우드 락인이 동시에 강화돼. Trainium 사서 쓰면 자연스럽게 AWS 워크로드가 늘어나거든. 칩 판매 자체보다 클라우드 확장 효과가 더 클 수도 있어.", created_at: "2026-06-20T08:08:00.000Z" },
    { alias: "하남 독수리 #44", content: "OpenAI $5B 계약이 성사되면 NVDA 의존도 줄이려는 AI 기업들한테 Trainium이 대안으로 자리잡는 신호야. 시장이 멀티벤더 방향으로 가기 시작하는 거임.", created_at: "2026-06-20T08:04:00.000Z" },
    { alias: "성북 까마귀 #28", content: "Bloomberg 보도 단계라서 확정은 아님. 근데 이 규모 논의가 나왔다는 자체가 AMZN의 칩 사업 의지 표명이야. 외판 성사 여부와 무관하게 AMZN 칩 역량 인식이 바뀌는 거임.", created_at: "2026-06-20T08:00:00.000Z" },
  ],
  [-110]: [
    { alias: "강서 황소 #91", content: "2018 $25.66B → 2026 $137B이면 5.3배야. 연 23% 복리 성장임. 이 속도로 5년 더 가면 AWS 단독으로 $400B 넘어. 전체 AMZN 시총이 지금 AWS 미래 가치만큼도 안 받는다는 분석도 있어.", created_at: "2026-06-20T08:04:00.000Z" },
    { alias: "강남 팔콘 #62", content: "AI 워크로드가 클라우드 성장의 새 엔진이야. 기존 마이그레이션 수요는 포화에 가까운데 AI 수요는 이제 시작이거든. AWS $137B이 다음 5년에 $300B 가는 경로가 그려지는 이유임.", created_at: "2026-06-20T08:00:00.000Z" },
    { alias: "동작 독수리 #15", content: "AWS PE 29x가 Azure 40x 대비 낮은 건 AMZN 전체 사업 할인 때문이야. AWS만 분리되면 프리미엄 받을 자격 충분함. 기업 분할 논의가 나올 때마다 AMZN 주가 반응하는 이유임.", created_at: "2026-06-20T07:56:00.000Z" },
  ],
  [-111]: [
    { alias: "마포 황소 #11", content: "Tom Lee 시나리오에서 2단계 급락 원인이 IPO 락업 해제라는 게 핵심임. 펀더멘털 문제가 아니라 공급 충격이야. 이 차이를 아는 사람만 2단계에서 매수할 수 있어.", created_at: "2026-06-20T08:00:00.000Z" },
    { alias: "은평 매 #72", content: "1단계 7,700~7,800 목표는 이란 종전 + 금리 기대 + AI 실적 복합 호재로 충분히 현실적이야. 그 구간 가기 전에 비중 줄이고 현금 들고 있다가 2단계에 매수가 전략임.", created_at: "2026-06-20T07:56:00.000Z" },
    { alias: "광진 매 #55", content: "V자 회복이 3단계라는 게 포인트야. 급락이 와도 AI 실적은 안 바뀌거든. 장기 홀더한테는 공포 매도 말고 오히려 추가 매수 기회가 되는 구간이야.", created_at: "2026-06-20T07:52:00.000Z" },
  ],
  [-112]: [
    { alias: "강남 독수리 #52", content: "Trump 중국 감사 발언이 무역 관계에 어떤 신호인지 봐야 해. 중동 중재에서 협력했으면 무역 협상에서도 유화 제스처가 나올 수 있어. 지정학 리스크 두 개가 동시 해소되는 거임.", created_at: "2026-06-20T07:56:00.000Z" },
    { alias: "여의도 매 #17", content: "호르무즈 개방이면 유가 안정이고 CPI 에너지 항목이 내려가. 연준 금리 인하 명분 생기면 주식 시장 전반에 호재임. 이란 종전이 Fed 경로를 바꾸는 변수야.", created_at: "2026-06-20T07:52:00.000Z" },
    { alias: "목동 황소 #23", content: "SPCX 관점에서 중동 통신 인프라 수요 회복이 기회야. 전쟁 중 통신 사각지대 발생 → 종전 후 복구 수요 → Starlink B2B 계약 확장 경로가 그려지는 거임.", created_at: "2026-06-20T07:48:00.000Z" },
  ],
  // ── 2026-06-19 신규 ──────────────────────────────────────────────────────
  [-98]: [
    { alias: "강남 팔콘 #62", content: "RPO가 매출의 3배라는 게 월가에서 아직 제대로 반영 안 된 것 같음. 가이던스 상향 시즌에 MSFT가 제일 먼저 올라오는 이유가 이 수치야.", created_at: "2026-06-19T08:54:00.000Z" },
    { alias: "동작 독수리 #15", content: "Copilot 기업 침투율이 Fortune 500 70%인데 그 계약들이 RPO로 잡히는 거임. AI 사이클에서 MSFT 위치가 다른 빅테크랑 달라.", created_at: "2026-06-19T08:50:00.000Z" },
    { alias: "노원 황소 #66", content: "5년 CAGR +47%가 분기 성장이 아니라 연 복리 수익률이라는 게 중요함. 이 속도가 유지되면 2028년 Azure만 $120B+ 수익.", created_at: "2026-06-19T08:46:00.000Z" },
  ],
  [-97]: [
    { alias: "광진 매 #55", content: "AI 에이전트가 SaaS를 죽이는 게 아니라 SaaS가 에이전트 위에 올라타는 구조임. 결국 GPU 수요는 항상 늘어나는 거야.", created_at: "2026-06-19T08:50:00.000Z" },
    { alias: "마포 황소 #11", content: "젠슨이 '실제 데이터로 확인됐다'고 한 거 — 분기 실적 콜에서 이런 표현 나오면 진짜 데이터 있다는 거임. 분기 숫자로 증명되는 게 곧 나올 거야.", created_at: "2026-06-19T08:46:00.000Z" },
    { alias: "은평 매 #72", content: "STRL·ENOVA 매도한 사람들이 NVDA까지 같이 팔았을 텐데 그게 지금 매수 기회임. 논리가 틀린 매도라면 회복 속도가 빠를 거임.", created_at: "2026-06-19T08:42:00.000Z" },
  ],
  [-96]: [
    { alias: "신촌 늑대 #33", content: "~$8.9B 투자가 ~$57B이 됐다는 게 6.4배야. 이 수익률을 정부 포트폴리오 관점에서 보면 국부펀드 역대 최고 수익 사례에 가까운 거임. 재정 수익이 이 정도면 CHIPS Act 2탄 예산 확보가 정치적으로 쉬워지는 거임.", created_at: "2026-06-19T08:46:00.000Z" },
    { alias: "여의도 올빼미 #44", content: "Intel 주가가 $131.61이 됐다는 게 18A 파운드리 성공 신호야. 빅테크가 TSMC 의존도 줄이려고 Intel 발주 늘리는 구조라면 이게 아직 초기 단계일 수 있어. 지금도 늦지 않은 진입 포인트일 수 있음.", created_at: "2026-06-19T08:42:00.000Z" },
    { alias: "목동 황소 #23", content: "미국 정부 포지션이 아직 보유 중이라는 게 중요해. ~$48B 수익인데도 안 팔았다는 건 전략적 자산으로 계속 보유 중이라는 거임. 정부가 롤모델이 되는 드문 케이스야.", created_at: "2026-06-19T08:38:00.000Z" },
  ],
  [-95]: [
    { alias: "강서 황소 #91", content: "$37.3B buyback이면 현재 시총의 7.6%야. S&P500 편입 종목 중 이 규모 자사주 매입하는 회사 손에 꼽아. 이익 성장 + 주식 수 감소 = EPS 복리 효과임.", created_at: "2026-06-19T08:42:00.000Z" },
    { alias: "강남 팔콘 #62", content: "2월 $56 근방에서 샀다는 거 — 경영진이 그 구간 저평가로 봤다는 거야. 결과적으로 그 이후 반등했으니 경영진 판단이 맞았음. 신뢰 쌓이는 포인트임.", created_at: "2026-06-19T08:38:00.000Z" },
    { alias: "동작 독수리 #15", content: "광고 구독 전환 완료 + 스포츠 라이선스 계약 + 게임 확장이 동시 진행이라 NFLX 성장 레이어가 3개야. Buyback은 그 위에 재무 레이어를 하나 더 얹은 거임.", created_at: "2026-06-19T08:34:00.000Z" },
  ],
  [-94]: [
    { alias: "판교 황소 #31", content: "iPhone 가격 올리면서도 수요 유지될 수 있는 이유가 에코시스템 락인임. 맥, 애플워치, 에어팟 다 같이 쓰면 안드로이드 전환 비용이 너무 크거든.", created_at: "2026-06-19T08:38:00.000Z" },
    { alias: "하남 독수리 #44", content: "팀 쿡 '40년 만에 처음'이라는 표현 자체가 관세 대응 프레임이 아니라 '프리미엄 브랜드 선언'임. 가격 올리고도 수요 유지되면 애플 브랜드 가치 재증명되는 거야.", created_at: "2026-06-19T08:34:00.000Z" },
    { alias: "성북 까마귀 #28", content: "MU·SK하이닉스 간접 수혜 맞는 말임. AAPL이 부품 단가 올리고 QC 기준 높이면 HBM 공급 업체들 마진도 같이 개선돼. 공급망 전반에 걸친 가격 파워 효과임.", created_at: "2026-06-19T08:30:00.000Z" },
  ],
  [-93]: [
    { alias: "마포 황소 #11", content: "AWS PE 29x는 AI 인프라 프리미엄 전혀 안 받는 거임. Azure가 40x 이상인데 같은 성장률·마진 구조에서 이 괴리가 좁혀지면 AMZN이 따라 올라가는 거임.", created_at: "2026-06-19T08:34:00.000Z" },
    { alias: "신촌 늑대 #33", content: "Bedrock으로 Claude 포함 멀티모델 API 제공하는 전략이 AWS를 AI 중립 플랫폼으로 포지셔닝하는 거야. 특정 모델 고집 안 하는 기업들한테 AWS가 제일 편한 선택임.", created_at: "2026-06-19T08:30:00.000Z" },
    { alias: "광진 매 #55", content: "단기 -12% 반응이 분기 예상 컨센서스 대비 하회 때문인데 연간 가이던스는 상향이거든. 시장이 분기 숫자에 과반응한 거라면 지금 저점 매수 논리가 성립해.", created_at: "2026-06-19T08:26:00.000Z" },
  ],
  [-92]: [
    { alias: "여의도 올빼미 #44", content: "SpaceX가 TeraFab 전력 + 냉각 + 통신 인프라 공급한다는 게 확정되면 장기 임대 계약이 Starlink B2B 계약이랑 묶이는 구조임. 수익 가시성이 극대화되는 거야.", created_at: "2026-06-19T08:30:00.000Z" },
    { alias: "은평 매 #72", content: "$250B 규모 프로젝트에 SpaceX·xAI·Tesla 3개 회사 동시 참여가 인허가 측면에서도 빨라. 각 회사 정치적 네트워크 + 기술력 합쳐지면 못 막을 프로젝트임.", created_at: "2026-06-19T08:26:00.000Z" },
    { alias: "강남 팔콘 #62", content: "세계 AI 칩 25% 단일 사이트 목표는 미국 정부가 보조금 줘야 하는 전략 자산 레벨임. CHIPS Act 2차 수혜가 TeraFab으로 갈 가능성 있어.", created_at: "2026-06-19T08:22:00.000Z" },
  ],
  [-91]: [
    { alias: "목동 황소 #23", content: "재해 대비 B2B 계약이 경기 민감도 제로야. 불황에도 허리케인은 와. 경기 방어 수익원이 추가됐다는 게 SPCX 밸류에이션 안정성에 긍정임.", created_at: "2026-06-19T08:26:00.000Z" },
    { alias: "노원 황소 #66", content: "허리케인 파트너십이 미국 카리브해 연안이면 다음은 태풍 시즌 아시아 쪽이야. 일본·필리핀·한국 재난 통신 계약이 논리적 다음 단계임. 지역 확장 포인트 봐야 함.", created_at: "2026-06-19T08:22:00.000Z" },
    { alias: "강서 황소 #91", content: "자동 전환 기능이 핵심임. 사람이 개입 없이 재해 시 자동으로 Starlink 연결되면 계약 기업 입장에서 운영 부담 없음. 이게 계약 갱신율 높이는 핵심 기능임.", created_at: "2026-06-19T08:18:00.000Z" },
  ],
  [-90]: [
    { alias: "마포 황소 #11", content: "ARK 5펀드가 전부 들어왔다는 거 — 캐시 우드 포트폴리오 구성 원칙상 테마 확신이 없으면 멀티 펀드 동시 매입 안 해. SpaceX를 '혁신 테마 핵심'으로 분류한 거임.", created_at: "2026-06-19T08:22:00.000Z" },
    { alias: "성북 까마귀 #28", content: "ARK 리포트에 SpaceX 포함되면 리테일 투자자들이 따라 들어와. 미국 리테일 수요가 붙으면 SPCX 거래량이 단기 급증할 거임. 수급 이벤트로 봐야 함.", created_at: "2026-06-19T08:18:00.000Z" },
    { alias: "하남 독수리 #44", content: "인덱스 편입 전 ARK가 먼저 사는 패턴이 많아. 패시브 수요 전에 액티브 매집이 선행됨. SPCX가 그 사이클의 초기 단계임을 ARK 매집이 확인해주는 거야.", created_at: "2026-06-19T08:14:00.000Z" },
  ],
  [-89]: [
    { alias: "광진 매 #55", content: "Baa1이 투자등급 하위에서 중간 정도인데 연기금·보험사가 살 수 있는 최소 등급은 충족함. $20B 발행에 수요가 얼마나 들어왔는지 오버북킹 배수가 궁금해.", created_at: "2026-06-19T08:18:00.000Z" },
    { alias: "동작 독수리 #15", content: "IPO $8B + 채권 $20B = 이틀에 $28B. 이 속도로 자금 조달 성공한 회사가 최근에 없었음. 자본 시장이 SpaceX 미래에 베팅했다는 거임.", created_at: "2026-06-19T08:14:00.000Z" },
    { alias: "은평 매 #72", content: "Starlink Gen3 위성 개당 비용이 Gen2 대비 내려가면 채권 발행 이자비용을 운영 효율로 상쇄할 수 있어. 자금 조달 비용이 수익 개선 속도보다 느리면 주주가 이익 봄.", created_at: "2026-06-19T08:10:00.000Z" },
  ],
  [-88]: [
    { alias: "여의도 매 #17", content: "97.5 GWh 누적이면 Megapack 사업만으로 연 $15B 이상 수익 경로가 그려짐. 자동차 마진이 압박받을 때 에너지가 이익 버퍼 역할을 해주는 구조야.", created_at: "2026-06-19T08:14:00.000Z" },
    { alias: "강남 독수리 #52", content: "Lathrop 풀가동 + 멕시코 기가팩토리 추가 검토 중이라는 소식도 있음. 공급 확대 속도가 수요 성장 따라가면 2027 에너지 매출 $10B+ 가능한 그림임.", created_at: "2026-06-19T08:10:00.000Z" },
    { alias: "잠실 콘도르 #53", content: "ESS 경쟁사가 없는 게 아니라 규모 경쟁이 안 되는 거임. CATL·BYD가 도전 중이지만 Tesla Megapack 브랜드 신뢰도 + 설치 네트워크가 진입장벽이야.", created_at: "2026-06-19T08:06:00.000Z" },
  ],
  [-87]: [
    { alias: "신촌 늑대 #33", content: "한국 도로가 FSD 최고 난이도라는 거 동의함. 오토바이 역주행, 골목길, 무단횡단 다 있거든. 여기서 FSD가 작동하면 글로벌 레퍼런스가 되는 거임.", created_at: "2026-06-19T08:10:00.000Z" },
    { alias: "강남 팔콘 #62", content: "한국 구독 방식 전환이 단순 시장 진입이 아니야. ARR로 잡히는 반복 수익 구조로 바꾸는 거거든. 이게 재무제표에 처음 반영되는 Q3가 기대 포인트임.", created_at: "2026-06-19T08:06:00.000Z" },
    { alias: "마포 황소 #11", content: "아시아 데이터 확보가 중국 없이 FSD 글로벌 완성을 의미함. 한국·일본·대만 합치면 아시아 프리미엄 시장 대부분 커버야. 전략적으로 중국 규제 우회하는 거야.", created_at: "2026-06-19T08:02:00.000Z" },
  ],
  [-99]: [
    { alias: "종로 매 #47", content: "스페인 → 이탈리아 도미노 패턴이 실제로 있어. EU 규제에서 한 나라 승인되면 비슷한 법체계 나라들이 빠르게 따라가거든. 남유럽 3국이 연내에 다 열릴 수 있는 구조야.", created_at: "2026-06-19T08:08:00.000Z" },
    { alias: "성동 황소 #53", content: "아시아 일회성 마감이 더 중요할 수 있어. 일회성에서 구독으로 전환되면 ARR로 잡히기 시작하는 거거든. ARR이 잡히면 밸류에이션 프레임이 바뀜.", created_at: "2026-06-19T08:04:00.000Z" },
    { alias: "용산 늑대 #62", content: "6/30 이후 Q3 FSD 매출 인식이 처음 시작돼. 스페인+아시아 합산 신규 구독 수가 Q3 실적에서 처음 잡히는 거고, 이게 시장 기대치를 높이는 촉매가 될 거임.", created_at: "2026-06-19T08:01:00.000Z" },
  ],
  [-86]: [
    { alias: "판교 황소 #31", content: "유로NCAP 5성이 유럽 Fleet 구매 결정에 직접 영향 줘. 법인차 + 렌터카 계약에서 NCAP 요구사항 있거든. 이 인증이 B2B 판매로 이어지는 거임.", created_at: "2026-06-19T08:06:00.000Z" },
    { alias: "목동 황소 #23", content: "NHTSA ADA 인증이 보험 업계 리스크 모델에 영향 줌. 자동화 보조 장치 인증된 차는 보험료 할인 가능한 구조야. 소비자 TCO 개선으로 이어지는 거임.", created_at: "2026-06-19T08:02:00.000Z" },
    { alias: "강서 황소 #91", content: "두 인증이 동시에 나온 게 우연이 아닐 거야. Q3 FSD 유럽 확장 신청 전에 안전 레퍼런스를 쌓는 전략적 타이밍임. 규제 기관 앞에 이미 서류 준비된 거야.", created_at: "2026-06-19T08:01:00.000Z" },
  ],
  [-85]: [
    { alias: "강남 독수리 #52", content: "OpenAI에서 RL 연구자 빼오는 연봉 수준임. Tesla가 순수 AI 회사랑 같은 레벨로 경쟁한다는 거야. FSD + Optimus 동시 개발에 이 인력이 들어가면 격차 좁혀지는 속도가 빨라.", created_at: "2026-06-19T08:02:00.000Z" },
    { alias: "여의도 올빼미 #44", content: "에이전트가 '실행'한다는 게 핵심임. ChatGPT는 대화, OpenClass는 실제로 작업을 완수하는 구조야. FSD가 운전 에이전트라면 OpenClass는 범용 작업 에이전트임. 방향이 맞음.", created_at: "2026-06-19T08:01:00.000Z" },
    { alias: "노원 황소 #66", content: "Optimus와 OpenClass가 하드웨어·소프트웨어 양날개임. 둘 다 RL 기반이라 핵심 인재가 겹침. 채용 규모 보면 2027 하반기 동시 스케일업 목표인 것 같음.", created_at: "2026-06-19T08:01:00.000Z" },
  ],
  [-84]: [
    { alias: "동작 독수리 #15", content: "Form4에서 '원천징수 $336'이 세금용 공정시장가치라는 거 맞음. 이 가격에 행사 = 현재 주가보다 훨씬 높은 내재가치로 본다는 거임. CEO 시그널 중 가장 명확한 형태야.", created_at: "2026-06-19T08:01:00.000Z" },
    { alias: "하남 독수리 #44", content: "법원 패소 리스크 있는 상황에서 3억 주 행사하는 건 '이 주가 하락이 일시적'이라는 내부 판단임. 공개 정보가 이 신호를 이미 줬으니까 기관들이 이걸 놓치지 않았을 거임.", created_at: "2026-06-19T08:01:00.000Z" },
    { alias: "성북 까마귀 #28", content: "순 매도가 아니라 세금 납부용 매도라는 게 중요함. 실질 보유 증가야. 언론에서 '머스크 주식 팔았다' 식으로 보도하면 오해 만드는 거임. Form4 원문 확인해야 해.", created_at: "2026-06-19T08:01:00.000Z" },
  ],
  [-83]: [
    { alias: "강남 독수리 #52", content: "HW3에서 작동하는 게 핵심임. 구매 유저 전체에 소프트웨어 업데이트로 배포되는 거라서 추가 하드웨어 비용 없음. FSD 구독 유지율 올라가는 가장 확실한 방법이야.", created_at: "2026-06-19T08:01:00.000Z" },
    { alias: "여의도 매 #17", content: "K.I.T.T. 비교가 소비자 심리에 미치는 영향이 생각보다 커. SF 세대 구매자들한테 '꿈꾸던 차'가 됐다는 거야. 브랜드 감성 자산이 추가되는 포인트임.", created_at: "2026-06-19T08:01:00.000Z" },
    { alias: "목동 황소 #23", content: "보이스커맨드 완성도가 올라가면 다음이 자연어 주행 계획이야. '다음 주 화요일 출장 경로 설정해줘' 수준까지 되면 진짜 AI 비서 차가 완성되는 거임. 방향 맞게 가고 있어.", created_at: "2026-06-19T08:01:00.000Z" },
  ],
  // ── 2026-06-18 신규 ──────────────────────────────────────────────────────
  [-82]: [
    { alias: "서초 늑대 #58", content: "호르무즈 하루 180만 배럴 재개 숫자 맞음. 여기에 OPEC+ 증산이 겹치면 공급 과잉 빠르게 올 수 있어. $45 이하 시나리오도 배제 못하는 상황.", created_at: "2026-06-18T08:26:00.000Z" },
    { alias: "광화문 호랑이 #35", content: "CPI 에너지 항목 경로 전환이 연준한테는 명분이야. 데이터 의존이라고 했는데 데이터가 바뀌면 빠르게 움직일 수 있음. 9월보다 7월 인하 가능성도 생기는 거임.", created_at: "2026-06-18T08:22:00.000Z" },
    { alias: "잠실 독수리 #41", content: "이란 합의가 깨질 리스크도 봐야 함. 국내 강경파 반발이 변수임. 중동 지정학 리스크 프리미엄 완전히 해소됐다고 보기엔 아직 이른 거임.", created_at: "2026-06-18T08:18:00.000Z" },
  ],
  [-81]: [
    { alias: "마포 수리부엉이 #28", content: "Tesla -$590M 손실이 FSD 인프라 투자 때문이라는 게 핵심임. SpaceX처럼 현금 뽑는 단계가 아니라 아직 성장 투자 단계야. 오스틴 로보택시 수익화 시작되면 이익 전환 속도 빠를 거임.", created_at: "2026-06-18T08:14:00.000Z" },
    { alias: "을지로 황소 #05", content: "머스크 전체 포트폴리오 관점에서 SpaceX가 Tesla 손실 커버해주는 구조임. 개인 재무 관점에서 불안하지 않으니까 Tesla에 더 공격적으로 베팅할 수 있는 거야.", created_at: "2026-06-18T08:10:00.000Z" },
    { alias: "광화문 호랑이 #35", content: "2027 이후 FSD 수익화 + Optimus 판매가 본격화되면 Tesla 이익 구조 완전히 달라짐. 지금 손실은 선투자 비용이고 스케일업 완료 후 마진 폭발이 예상되는 모델이야.", created_at: "2026-06-18T08:06:00.000Z" },
  ],
  [-80]: [
    { alias: "잠실 독수리 #41", content: "신형 모델Y 효과가 유럽에서도 확인됨. 디자인 리프레시 + FSD 주목도 올라오면서 소비자 인식 바뀌고 있음. Q3에 RDW 승인 소식까지 더해지면 반등 각도 더 가팔라질 거임.", created_at: "2026-06-18T08:02:00.000Z" },
    { alias: "서초 늑대 #58", content: "유럽 보조금 재개 국가들 리스트 보면 독일·프랑스·이탈리아가 다 포함됨. 보조금 + FSD 승인 + 신형 모델Y 트리플 드라이버가 유럽 Q3~Q4 기대치를 높이는 거임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "마포 수리부엉이 #28", content: "유럽 소프트웨어 침투율이 미국 대비 아직 낮아. FSD 유료 구독 전환이 올라오면 유럽 유닛당 수익성이 크게 개선되는 구조임. 단순 판매량보다 ASP 변화가 더 중요한 지표가 될 거임.", created_at: "2026-06-18T08:01:00.000Z" },
  ],
  [-79]: [
    { alias: "판교 황소 #31", content: "EU 80만 대 × 15% 전환 숫자가 보수적이라는 거 동의함. 네덜란드에서 이미 FSD 경험한 사람들이 주변 추천해주면 전환율이 더 빠르게 올라갈 수 있음. 소셜 루프가 생기는 거임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "강남 여우 #13", content: "독일 KBA가 네덜란드 테스트 결과 레퍼런스로 쓸 수 있다는 거, EU 규제 상호인정 협약 때문에 실제로 가능한 케이스임. 자체 재검증 없이 승인 나올 수 있는 법적 근거가 있어.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "마포 팔콘 #57", content: "대만 SAI Level 2 동시 신청이 아시아 루트 개척임. EU + 아시아 동시 진행이면 FSD 글로벌 롤아웃 속도가 작년과 완전히 다른 레벨임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "광화문 곰 #52", content: "오스틴 로보택시 현황은 어때? 플릿 규모가 늘어나는 속도랑 FSD 정확도가 같이 개선되면 유료 서비스 확대 타임라인이 앞당겨질 수 있어.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "잠실 여우 #17", content: "FSD 일회성 구매 6/30 종료 전 전환 수요가 이번 RDW 승인 소식으로 유럽에서도 자극받는 거 맞음. 6월 막판 주문 스파이크 나오면 Q2 소프트웨어 수익 깜짝 놀라게 나올 수도 있어.", created_at: "2026-06-18T08:01:00.000Z" },
  ],
  [-78]: [
    { alias: "서초 곰 #39", content: "채권 이자비용이 현금 EPS에 영향주는 게 얼마나 되는지 계산해봤어? 분기 $200~300M 이자면 $3B+ 분기 순이익 대비 무시할 수 있는 수준이긴 한데.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "여의도 황소 #51", content: "자회사 $25B 주문이 진짜 핵심임. 외부 기관들도 아니고 NVDA 생태계 내부에서 그 수요가 나왔다는 거. 이건 AI 사이클이 NVDA 안에서 완결되는 구조임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "판교 사자 #22", content: "ROE 개선 포인트 맞음. 부채로 조달 → 자기자본 유지 → ROE 올라가는 재무 레버리지 구조임. 이자보다 AI 수익률 높다는 확신이 없으면 안 하는 딜이야.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "을지로 황소 #05", content: "메모리 부족이랑 세트로 읽히는 게 맞아. NVDA가 더 만들겠다고 자금 조달 = 그만큼 수요가 보장됐다는 거. 두 뉴스가 같은 날 나온 게 우연이 아님.", created_at: "2026-06-18T08:01:00.000Z" },
  ],
  [-77]: [
    { alias: "잠실 콘도르 #53", content: "1994년 이후 랠리 데이터 봤는데, 금리 사이클 피크 후 12개월 S&P 수익률이 평균 +18%였어. 지금이 동결 피크라면 역사적 패턴상 내년 이맘때가 기대되는 거임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "강남 팔콘 #62", content: "이란 유가 하락 + 포워드 가이던스 철회 = 두 가지가 동시에 9월 인하 가능성 높이는 방향임. 시장이 단기 패닉했지만 2~3달 후 회고해보면 매수 기회였다는 평가 나올 것 같음.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "마포 수리부엉이 #28", content: "포워드 가이던스 없다는 게 오히려 데이터가 좋으면 빠르게 인하할 수 있다는 거기도 해. 양날의 검인데, 이란 합의 유가 하락 + CPI 개선이면 긍정적으로 작용하는 쪽임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "광화문 늑대 #69", content: "VIX 스파이크 구간에 성장주 분할 매수 추가하는 거 고려 중임. 단기 변동성이 중장기 방향을 바꾸지 않는다는 전제라면 지금 레벨은 히스토리컬하게 좋은 진입점이야.", created_at: "2026-06-18T08:01:00.000Z" },
  ],
  [-76]: [
    { alias: "판교 표범 #37", content: "CoWoS 병목이 얼마나 심각한지 TSMC 쪽 채널 확인해봤는데 2027년까지 추가 용량 확보 어렵다는 거 맞음. 그러면 HBM 가격 협상력은 공급업체 쪽이 완전히 우위야.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "잠실 독수리 #41", content: "SK하이닉스 HBM 독점 + Micron 확대 = 구조적 공급 부족인데 수요는 계속 늘어남. 가격 사이클이 2022~2023 DRAM 하락 사이클의 정반대임. 지금 사이클이 훨씬 강도가 강한 거임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "여의도 콘도르 #19", content: "MU가 HBM3E 양산 확대 중이라는 거 Micron CEO가 직접 확인해줬음. SK하이닉스 독점이 조금씩 깨지는 거고 Micron 점유율 올라오면 MU 수익 레버리지가 더 커지는 구조임.", created_at: "2026-06-18T08:01:00.000Z" },
  ],
  [-75]: [
    { alias: "마포 팔콘 #57", content: "기가텍사스 메인 팩토리가 올라가는 속도 기억함. 당시에도 드론으로 주간 진행 상황 봤는데 예상보다 빨랐었어. 이번 Optimus 공장이 같은 속도면 Q4 2026 충분히 가능한 일정임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "강남 여우 #13", content: "철골 3층 위로 더 올라간다는 게 여러 층 건물이라는 거잖아. 층별 생산 라인 분리해서 로봇 조립 공정 수직화하는 구조 아닐까? 그러면 면적 대비 생산량이 일반 공장의 몇 배임.", created_at: "2026-06-18T08:01:00.000Z" },
    { alias: "을지로 황소 #05", content: "현재 Tesla 시총 60%가 Optimus + Robotaxi라는 분석 나오는데, 반대로 생각하면 차 사업만으로 $440B 밸류에이션이라는 거임. Optimus 현실화되면 지금 주가는 싼 거임.", created_at: "2026-06-18T08:01:00.000Z" },
  ],

  // ── 2026-06-16 신규 ──────────────────────────────────────────────────────
  [-70]: [
    { alias: "판교 황소 #31", content: "$85.7B IPO가 아람코 $29.4B의 2.9배라는 게 단순 기록이 아님. 전통 에너지 패권에서 우주·AI 패권으로 자본이 이동하는 시대 전환점임. 역사책에 남을 수치.", created_at: "2026-06-16T08:38:00.000Z" },
    { alias: "강남 독수리 #52", content: "Polymarket 63% 군사행동 시나리오가 Starlink 군사 통신 수혜임. 우크라이나 선례 있어서 실현 가능성 있는 시나리오임. 쿠바는 플로리다에서 150km라서 기술적으로 즉시 대응 가능.", created_at: "2026-06-16T08:34:00.000Z" },
    { alias: "을지로 사자 #77", content: "IR 웹사이트 오픈이 기관 투자자 접근성 첫 단계임. 분기 실적 공시 → 증권사 커버리지 → 더 많은 기관 자금 유입 사이클이 이제 시작됨.", created_at: "2026-06-16T08:30:00.000Z" },
    { alias: "서초 매 #64", content: "$15B/yr AI 지출이 매출 80% 재투자인데 Starlink 수익으로 커버되는 구조임. AI 역량 내재화 + 수익 창출 동시 달성 중. 다른 회사가 못 하는 구조임.", created_at: "2026-06-16T08:26:00.000Z" },
  ],
  [-69]: [
    { alias: "강남 독수리 #52", content: "165Wh/mile이 역사상 최고 효율임. Model Y 250Wh/mile, 아이오닉5 200Wh/mile 대비 압도적임. 65kWh 배터리로 416mi는 물리적 한계에 가까운 수준.", created_at: "2026-06-16T08:22:00.000Z" },
    { alias: "여의도 매 #17", content: "Cybertruck 150대 배치 + 기가상하이 최고치 + 모델Y 일본 1위 세트가 Q2 서프라이즈 재료임. 실적 발표 전 미리 포지션 잡는 게 맞는 타이밍.", created_at: "2026-06-16T08:18:00.000Z" },
    { alias: "을지로 사자 #77", content: "Cybercab EPA 인증이 NHTSA → 도시 허가로 이어지는 규제 사다리 첫 발임. 오스틴 허가가 나오면 로보택시 유료 서비스 올해 안에 현실임.", created_at: "2026-06-16T08:14:00.000Z" },
    { alias: "광화문 늑대 #69", content: "NHTSA 사고 1건 Tesla 과실 없음이 안전 기록 유지 확인임. 사고율이 인간 운전 대비 낮게 유지되면 보험사 리스크 평가도 바뀌고 확장 속도 빨라짐.", created_at: "2026-06-16T08:10:00.000Z" },
  ],
  [-68]: [
    { alias: "판교 황소 #31", content: "$58B→$210B 4년 경로가 설득력 있는 이유는 수요 기반이 이미 깔렸기 때문임. 빅테크 CAPEX가 2027년까지 연 $200B+ 유지되면 NVDA 수요는 보장된 거임.", created_at: "2026-06-16T08:06:00.000Z" },
    { alias: "을지로 사자 #77", content: "Google이 TSMC 못 써서 삼성으로 간 게 NVDA한테 오히려 긍정임. TSMC 용량 경합 상대가 줄어드는 거라서 납기 안정성이 높아지는 거임. CUDA 생태계 전환 비용도 커서 단기 NVDA 수요 감소 없음.", created_at: "2026-06-16T08:02:00.000Z" },
    { alias: "서초 매 #64", content: "현재 PER 20x가 S&P500 24x보다 낮다는 게 계속 나오는데 결국 EPS 성장이 이 구간 벗어나게 할 것임. 재레이팅 시점이 언제냐가 포인트임.", created_at: "2026-06-16T08:01:00.000Z" },
  ],
  [-67]: [
    { alias: "여의도 매 #17", content: "DC +57%는 MI300 빅테크 수주가 본격 반영된 거임. MI350 나오면 이 수치가 더 올라갈 것임. NVIDIA 독점 균열 = AMD 공급 다변화 수혜 구조 확립.", created_at: "2026-06-16T08:01:00.000Z" },
    { alias: "을지로 사자 #77", content: "순이익 +94% 레버리지가 핵심임. 매출 증가분이 거의 전부 이익으로 떨어지는 구간임. 이 구간이 계속되면 EPS 재평가 속도가 예상보다 빨라짐.", created_at: "2026-06-16T08:01:00.000Z" },
    { alias: "광화문 늑대 #69", content: "게이밍 -30%는 콘솔 사이클임. PS6 나오면 반등하는 거라서 AMD 전체 논리를 훼손하는 요인이 아님. DC 성장이 지배적인 스토리임.", created_at: "2026-06-16T08:01:00.000Z" },
  ],
  [-66]: [
    { alias: "판교 황소 #31", content: "HBM 스택 $3,000~5,000을 플래시로 대체하면 데이터센터 TCO 혁명임. 이게 상용화되면 HBM 공급사들 장기 사업 모델이 위협받는 거임. Marvell이 Meta MTIA 파트너로서 그 수혜를 가져가는 구조.", created_at: "2026-06-16T08:01:00.000Z" },
    { alias: "서초 매 #64", content: "Meta 자체 Llama 인프라 적용 → 검증 → 외부 판매가 가능한 패턴임. Marvell ASIC + MEXT 결합이 AI 추론 인프라 풀 스택이 되면 Meta 이외 고객 수주 경쟁력도 압도적임.", created_at: "2026-06-16T08:01:00.000Z" },
    { alias: "여의도 독수리 #8", content: "Meta가 직접 인수한다는 게 기술 신뢰성의 가장 강한 증거임. 빅테크 인수 = 기술 검증 완료 신호. Marvell 입장에서는 Meta 생태계 깊숙이 들어가는 거임.", created_at: "2026-06-16T08:01:00.000Z" },
  ],

  // ── 2026-06-15 신규 ──────────────────────────────────────────────────────
  [-65]: [
    { alias: "강남 독수리 #52", content: "$90.95 현재가 대비 Westly $5,000+ 목표면 55배임. 5년 CAGR 50% 논리인데 3대 수익원 다 성장 중이라면 비현실적이진 않음. 다만 실현되려면 Starship 완성이 전제조건.", created_at: "2026-06-15T08:38:00.000Z" },
    { alias: "을지로 사자 #77", content: "Shotwell '임원진 장기 보유' 공식화가 오버행 리스크 해소임. 공모가 직후 나온 이 메시지가 $90 지지선 형성에 기여한 거임.", created_at: "2026-06-15T08:34:00.000Z" },
    { alias: "광화문 늑대 #69", content: "JPM 공식 확인은 그냥 립서비스가 아님. 주관사로서 법적 책임이 따르는 발언임. $75B 딜 공식 인증이 투자자 신뢰 기반 확보.", created_at: "2026-06-15T08:30:00.000Z" },
    { alias: "서초 매 #64", content: "일일 $1.88B이 AI 인프라 계약금 반영된 수치라도 실제 계약이 있는 수익임. Amazon PSR 기준 적용하면 현재 시총이 저평가.", created_at: "2026-06-15T08:26:00.000Z" },
  ],
  [-64]: [
    { alias: "여의도 매 #17", content: "라스베이거스 허가 승인되면 연 4,200만 방문객 노선임. 공항→Strip 왕복이 정형화된 루트라서 FSD 정확도 확인하기 가장 좋은 환경.", created_at: "2026-06-15T08:22:00.000Z" },
    { alias: "강남 독수리 #52", content: "Forbes '사실상 로보택시' 헤드라인이 기관 투자자 시각 전환 트리거임. 테크 미디어가 아닌 비즈니스 미디어가 이 표현 쓴 게 임팩트 다름.", created_at: "2026-06-15T08:18:00.000Z" },
    { alias: "을지로 사자 #77", content: "Optimus $5T 하한 시나리오가 보수적인 게 맞음. FSD 컴퓨터 비전 + 배터리 기술 + 기가팩토리 세 가지 다 있는 회사가 로봇 시장 진입하면 경쟁 구도가 없음.", created_at: "2026-06-15T08:14:00.000Z" },
  ],
  [-63]: [
    { alias: "여의도 매 #17", content: "트리오 $707B vs 매그6 $661B 역전이 핵심임. 시총 격차 $14.64T는 결국 좁혀질 방향임. HBM이 GPU만큼 희소 자산이 됐다는 시장 인식이 필요한 거임.", created_at: "2026-06-15T08:10:00.000Z" },
    { alias: "서초 매 #64", content: "마이크론이 CHIPS Act $6.2B 잔여분 받으면 자본 지출 절반이 정부 지원임. 경쟁사 대비 원가 구조가 완전히 달라지는 거임.", created_at: "2026-06-15T08:06:00.000Z" },
    { alias: "을지로 사자 #77", content: "삼성 수율 문제 해결이 와일드카드임. 삼성이 HBM 수율 잡으면 $331B 전망치가 더 커질 수도 있음. 메모리 트리오 합산이 $800B도 가능한 시나리오.", created_at: "2026-06-15T08:02:00.000Z" },
    { alias: "광화문 늑대 #69", content: "HBM 마진 60%+ 가 유지되는 구간에서 MU PER 재평가가 일어남. 반도체 상품 PER 10~15x에서 인프라 기업 PER 25~35x로 전환되는 게 포인트.", created_at: "2026-06-15T08:01:00.000Z" },
  ],
  [-62]: [
    { alias: "판교 황소 #31", content: "S&P500 24x보다 낮은 NVDA 20.65x는 이론적으로 말이 안 됨. AI 성장 핵심 기업이 지수 평균보다 저PER이라는 게 결국 매수 논거가 되는 거임.", created_at: "2026-06-15T08:01:00.000Z" },
    { alias: "강남 독수리 #52", content: "역사적 최저 18.43x에서 +12% 위라는 게 하방 지지선이 가깝다는 거임. 펀더멘털 하락 없이 이 구간에서 추가 하락은 제한적임.", created_at: "2026-06-15T08:01:00.000Z" },
    { alias: "을지로 사자 #77", content: "미-이란 합의로 에너지 비용 하락 간접 수혜까지 더해지면 NVDA 마진 개선 촉매가 한 가지 더 생기는 거임.", created_at: "2026-06-15T08:01:00.000Z" },
  ],
  [-61]: [
    { alias: "판교 황소 #31", content: "Anthropic 수출통제가 미국 AI 독점 강화 구조임. 최강 모델이 미국 기관 40개사만 쓰는 구조 = 미국 AI 기업 장기 경쟁우위. 단기 충격이 있어도 AMZN·MSFT 장기로는 긍정.", created_at: "2026-06-15T08:01:00.000Z" },
    { alias: "강남 독수리 #52", content: "미-이란 핵합의 스냅백 조항이 있어서 방산주 완전 하락으로 보는 건 오버임. 이란이 합의 어기면 즉시 복원임. 단기 조정이면 매수 기회.", created_at: "2026-06-15T08:01:00.000Z" },
    { alias: "서초 매 #64", content: "두 이슈 다 AI 성장주 장기 방향성엔 긍정임. AI 독점 강화 + 에너지 비용 하락 = NVDA·MU·SPCX에게 둘 다 좋은 환경.", created_at: "2026-06-15T08:01:00.000Z" },
    { alias: "을지로 사자 #77", content: "이란 원유 일 150만 배럴 추가 공급이 WTI $65~68 하단 테스트 시나리오임. 항공주가 가장 직접 수혜고 데이터센터도 전력비 간접 감소 효과 있음.", created_at: "2026-06-15T08:01:00.000Z" },
  ],

  // ── 2026-06-13 신규 ──────────────────────────────────────────────────────
  [-60]: [
    { alias: "판교 황소 #31", content: "$172.68이면 시총 $2.26T임. 나스닥 6위 편입 자체가 인덱스 패시브 자금 강제 유입 트리거임. S&P 500 편입 기준 충족 시 수십조 달러 추가 수요.", created_at: "2026-06-13T08:46:00.000Z" },
    { alias: "강남 독수리 #52", content: "Ron Baron '내 생애 팔지 않겠다' 발언이 실제 잠금 역할 함. 공급 압력 없고 기관 수요만 있는 구조 = 주가 하방 경직성.", created_at: "2026-06-13T08:42:00.000Z" },
    { alias: "을지로 사자 #77", content: "Elon이 직접 Opening Bell 친 게 마케팅 효과 극대화임. 개인 투자자 관심도 폭발 = 단기 수요 지속.", created_at: "2026-06-13T08:38:00.000Z" },
    { alias: "서초 매 #64", content: "27.91% 첫날 상승은 이 규모 IPO에서 드문 거임. Morgan Stanley $75B 딜 성공 = 기관 수요가 얼마나 강했는지 증명.", created_at: "2026-06-13T08:34:00.000Z" },
  ],
  [-59]: [
    { alias: "여의도 매 #17", content: "MLIR 컴파일러 리라이트가 왜 중요하냐면 이게 소프트웨어 해자임. 하드웨어 개선 없이 순수 소프트웨어로 20% 성능 향상 = 지속적 업그레이드 가치 증명.", created_at: "2026-06-13T08:30:00.000Z" },
    { alias: "을지로 사자 #77", content: "Semi 500마일 + 1.2MW 충전 세트면 EU 물류사 TCO 계산에서 디젤 트럭 대체가 경제적으로 확정됨. 2030년 EU 탄소 규제 의무 + Tesla Semi = 강제 수요.", created_at: "2026-06-13T08:26:00.000Z" },
    { alias: "광화문 늑대 #69", content: "유럽 5,100대가 26Q2 최고라는 게 인상적임. 리콜 이슈·지정학 리스크 있었던 분기에 최고치라면 기저 수요가 확인된 거임.", created_at: "2026-06-13T08:22:00.000Z" },
  ],
  [-58]: [
    { alias: "판교 황소 #31", content: "100배 필요 논리가 설득력 있음. 현재 전세계 AI 인프라 규모 대비 수요 성장이 이미 100배 방향으로 가고 있음. NVDA만 수혜가 아니라 전력·냉각·부동산까지 전방 산업 전체가 임.", created_at: "2026-06-13T08:18:00.000Z" },
    { alias: "서초 매 #64", content: "Colossus 1 Anthropic 임대가 SPCX 수익 다변화 첫 사례임. AI 인프라 임대 사업이 Starlink 다음 수익 축으로 성장하면 밸류에이션 추가 상향 재료.", created_at: "2026-06-13T08:14:00.000Z" },
    { alias: "여의도 매 #17", content: "FY2026 $200B 타겟 달성하면 데이터센터 사업만 PSR 10배 적용 시 $2T임. NVDA 전체 시총이 아직 저평가 구간이라는 논리.", created_at: "2026-06-13T08:10:00.000Z" },
  ],

  // ── 2026-06-12 신규 ──────────────────────────────────────────────────────
  [-57]: [
    { alias: "판교 황소 #31", content: "선물 $167이면 기업가치 기준으로 이미 $2.2T 수준이에요. 나스닥 개장 첫날 선물 대비 10% 할인 열려도 $150+ 이면 충분히 성공적인 IPO임.", created_at: "2026-06-12T08:38:00.000Z" },
    { alias: "강남 독수리 #52", content: "S&P 500 편입 기준 충족 여부가 다음 촉매임. 편입되면 인덱스 펀드 수십 조 달러 강제 매수 발생. BlackRock $50B 주문은 그 선제 포지셔닝임.", created_at: "2026-06-12T08:34:00.000Z" },
    { alias: "서초 매 #64", content: "직원 4,000명 백만장자 탄생이 미디어 화제성 극대화. IPO 날 개인투자자 관심 폭발 = 수요 추가 확인.", created_at: "2026-06-12T08:30:00.000Z" },
    { alias: "을지로 사자 #77", content: "머스크 ASML 기조연설이 IPO 당일이라는 타이밍 절묘함. 반도체 수직계열화 선언 = 장기 EPS 성장 스토리 강화.", created_at: "2026-06-12T08:26:00.000Z" },
  ],
  [-56]: [
    { alias: "여의도 매 #17", content: "Amundi $1.24B가 트리거임. 유럽 기관들 ESG 위원회 재심사 시작됐다는 신호임. Norges Bank(노르웨이 국부펀드)도 비중 복원 검토 중일 거임.", created_at: "2026-06-12T08:22:00.000Z" },
    { alias: "강남 독수리 #52", content: "EU ROW 조항으로 FSD 27개국 자동 확산이면 100만 대 FSD 구독 수익화가 올해 안에 시작될 수 있음. 이게 TSLA 밸류 재평가 촉매.", created_at: "2026-06-12T08:18:00.000Z" },
    { alias: "을지로 사자 #77", content: "Cybertruck AWD $59,990은 포드 F-150 Lightning보다 $15,000 싸고 성능 우위임. 픽업트럭 시장 점유율 확대 + 에너지 마진 24.6% 유지 = 이익 레버리지 극대화.", created_at: "2026-06-12T08:14:00.000Z" },
    { alias: "광화문 늑대 #69", content: "메가팩 호주 100MW 완공이 에너지 사업 글로벌 확장 가속 신호임. 에너지 영업이익률 > 자동차인 구조가 유지되면 테슬라 이익 믹스가 구조적으로 개선됨.", created_at: "2026-06-12T08:10:00.000Z" },
  ],
  [-55]: [
    { alias: "판교 황소 #31", content: "$110.5B 월매출 = AI 칩 슈퍼사이클 아직 가속 중이라는 확인임. 전월 대비 +11% MoM도 계절성 아닌 구조적 수요임.", created_at: "2026-06-12T08:06:00.000Z" },
    { alias: "서초 매 #64", content: "CoWoS 양산 전환 시 NVDA 원가 개선됨. 같은 GPU를 더 낮은 비용으로 만들어 마진율이 올라가는 거임. 2H26 실적 개선 촉매.", created_at: "2026-06-12T08:02:00.000Z" },
    { alias: "을지로 사자 #77", content: "Feynman = 2028년 칩 세대 이름임. 이미 초기 채택 논의가 시작됐다는 건 NVDA 로드맵이 5년 이상 시야에서 이미 확보됐다는 거임.", created_at: "2026-06-12T08:01:00.000Z" },
  ],
  [-54]: [
    { alias: "판교 황소 #31", content: "RPO $638B = Oracle 향후 5년 매출 이미 확보된 거임. 연간 매출 $100B+이 기정사실화된 거죠. 현 PER 40x가 오히려 저평가일 수 있음.", created_at: "2026-06-12T08:01:00.000Z" },
    { alias: "강남 독수리 #52", content: "OCI가 AWS·Azure보다 싼 이유가 Oracle 레거시 DB와의 통합 번들링 때문임. 기존 Oracle DB 고객들은 AI 전환 시 OCI가 자연스러운 선택임.", created_at: "2026-05-20T08:02:00.000Z" },
    { alias: "여의도 매 #17", content: "NVDA와 OCI 독점 GB200 클러스터 배포 계약이 핵심 경쟁력임. NVDA가 OCI를 선택한 것 자체가 신뢰 인증임.", created_at: "2026-05-20T08:01:00.000Z" },
  ],
  [-53]: [
    { alias: "판교 황소 #31", content: "이란 공습 취소 + 핵합의 진행이 오늘 시장 상승 반전 트리거임. 유가 $85로 내려가면 6월 CPI 3% 이하 유지 가능 = 연준 인하 기대 복원임.", created_at: "2026-05-20T08:01:00.000Z" },
    { alias: "강남 독수리 #52", content: "머스크 로봇 빅 플랫폼 선언이 TSLA 장기 뷰를 강화함. Optimus가 공장 내 이미 작업 중이라는 팩트가 이 선언을 뒷받침함.", created_at: "2026-05-20T08:01:00.000Z" },
    { alias: "을지로 사자 #77", content: "SpaceX IPO + 이란 리스크 해소 + 반도체 신기록 + Oracle RPO 폭발이 모두 같은 날임. 이런 날은 드물다. 모멘텀 투자 관점에서 최고의 날임.", created_at: "2026-05-20T08:01:00.000Z" },
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
    { alias: "을지로 사자 #77", content: "Starlink S-1 연매출 $10.8B에 AI 임대 연 $4B+ 더하면 $15B+ 수익 구조임. IPO 전에 이걸 공개했다는 게 기업가치 정당화 작업이기도 하죠.", created_at: "2026-06-11T08:42:00.000Z" },
    { alias: "서초 매 #64", content: "기가팩토리 완공 전에 임차인 확정된 구조는 IRR 계산이 완전히 달라지죠. 리스크가 거의 없는 개발 프로젝트임.", created_at: "2026-06-11T08:38:00.000Z" },
    { alias: "광화문 늑대 #69", content: "Google이 Azure 대신 SpaceX 선택한 것 자체가 Microsoft한테 압박이에요. AI 인프라 경쟁이 이제 클라우드 넘어서 물리 인프라로 가는 거임.", created_at: "2026-06-11T08:34:00.000Z" },
    { alias: "여의도 매 #17", content: "동의함. $500B 논의는 Bastrop 가동 후 첫 분기 수익 공개되면 바로 나올 거임.", created_at: "2026-06-11T08:30:00.000Z" },
  ],
  [-45]: [
    { alias: "여의도 매 #17", content: "네덜란드 데이터가 EU 규제 해제 논거로 쓰인다는 시각 동의임. 부상 14.9배 감소를 규제 기관이 무시하기 어렵죠.", created_at: "2026-06-11T08:26:00.000Z" },
    { alias: "강남 독수리 #52", content: "Semi EU + 로보택시 + FSD 세 개 축이 동시에 움직이는 분기가 언제 오느냐가 관건이에요. 2027년에 다 열리면 밸류에이션 리레이팅 폭이 클 것 같음.", created_at: "2026-06-11T08:22:00.000Z" },
    { alias: "을지로 사자 #77", content: "덴마크 이어 네덜란드 데이터까지 나오면 다음은 독일임. 독일 인가 나오는 순간이 유럽 FSD 수익화 기점이 될 거임.", created_at: "2026-06-11T08:18:00.000Z" },
  ],
  [-44]: [
    { alias: "판교 황소 #31", content: "젠슨 황 발언 + 수주잔고 H1 2027 확보 세트가 포인트임. 발언 혼자면 홍보인데 수주잔고로 뒷받침되니 신뢰할 수 있음.", created_at: "2026-06-11T08:14:00.000Z" },
    { alias: "서초 매 #64", content: "AI 클라우드 Apple+Google+NVDA vs MSFT 구도에서 NVDA는 양쪽에 납품하니까 시장이 어떻게 재편되든 수혜임. 전쟁 중 무기상 포지션.", created_at: "2026-06-11T08:10:00.000Z" },
    { alias: "광화문 늑대 #69", content: "Intel 발주는 장기적으로 NVDA 공급망 리스크 관리임. TSMC 대만 리스크 헤지하는 게 맞는 방향.", created_at: "2026-06-11T08:06:00.000Z" },
  ],
  [-43]: [
    { alias: "강남 독수리 #52", content: "미국 $2,250억 + 중국 $2,950억이면 글로벌 AI 인프라 투자가 $5T+ 방향임. NVDA 수요 이야기가 아직 끝나지 않은 거임.", created_at: "2026-06-11T08:02:00.000Z" },
    { alias: "여의도 매 #17", content: "JPMorgan AI 에이전트 배포 계획이 조용히 중요한 뉴스임. 금융 대형사들이 본격 AI화되면 인퍼런스 GPU 수요가 또 한 번 터지는 거임.", created_at: "2026-06-11T08:01:00.000Z" },
  ],
  [-42]: [
    { alias: "여의도 매 #17", content: "ARPU 분석 정확함. 볼륨 성장이 ARPU 하락을 완전 상쇄하는 구조임. B2B 믹스가 올라가면 ARPU 반등 + 볼륨 유지라는 이상적인 조합이 가능함.", created_at: "2026-06-11T08:01:00.000Z" },
    { alias: "판교 황소 #31", content: "Starlink 단독 $108B이면 SpaceX 전체 $350B의 30%인데 로켓 발사, AI 임대, 기타 사업까지 더하면 $350B은 진짜 저평가임.", created_at: "2026-06-11T08:01:00.000Z" },
    { alias: "서초 매 #64", content: "30개+ 통신사 실 과금 구조가 핵심임. 통신사들이 Starlink 재판매하면 구독자당 수익이 직접 B2C보다 낮아도 볼륨이 폭발함.", created_at: "2026-06-11T08:01:00.000Z" },
  ],
  [-41]: [
    { alias: "여의도 매 #17", content: "EU 탄소 규제 2030년 45% 감축 의무가 핵심임. 이게 강제 수요 창출임. 물류사들 선택이 아니라 의무가 되는 거임.", created_at: "2026-06-11T08:01:00.000Z" },
    { alias: "강남 독수리 #52", content: "Megacharger 네트워크 없으면 경쟁사 전기 트럭이 장거리 운행에 한계가 있죠. Tesla Semi + Megacharger 세트가 진짜 해자임.", created_at: "2026-06-11T08:01:00.000Z" },
    { alias: "판교 황소 #31", content: "EU 30만 대 시장 10% = 3만 대/년임. Tesla Semi 평균 ASP $200K 가정하면 연 $6B 매출 포텐셜임. 이게 열리는 게 언제냐가 포인트.", created_at: "2026-06-11T08:01:00.000Z" },
    { alias: "서초 매 #64", content: "BD 채용 후 물류사 파일럿 계약 → 대량 출시까지 18~24개월이라 2027~2028년 타임라인이 현실적임. 지금 포지션 쌓는 타이밍.", created_at: "2026-06-11T08:01:00.000Z" },
  ],
  [-40]: [
    {
      alias: "강남 독수리 #52",
      content: "AVO 인가 나왔으면 이제 운행 데이터가 쌓이는 거임. Q3 오스틴 운행 결과가 다음 주 인가 확대의 근거가 되는 선순환임. 분기별 운행 데이터 모니터링이 핵심 지표임.",
      created_at: "2026-06-11T08:01:00.000Z",
    },
    {
      alias: "판교 황소 #31",
      content: "Cybercab 양산 일정이랑 AVO 타이밍 겹친 게 우연이 아님. 인가 → 배포 → 데이터 → 타주 인가 선순환 구조임. 지금이 로보택시 밸류에이션 리레이팅 시작 구간임.",
      created_at: "2026-06-11T08:01:00.000Z",
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "안전요원 비용 제거가 수익성 핵심 변수임. 기존 모든 자율주행 서비스가 안전요원 인건비 때문에 적자인데 AVO로 그게 없어지면 BEP 달성 시점이 완전히 당겨짐.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-39]: [
    {
      alias: "마포 황소 #11",
      content: "Starlink 단독 분리 상장 IRR이 가장 높다는 분석 동의함. SpaceX 전체 상장은 발사 사업 싸이클리컬 성격이 Starlink 성장 스토리에 노이즈 주는 구조임. 분리가 양쪽 다 이득임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 사자 #77",
      content: "AI 서비스 $3.2B이 올해 수익인데 H100 8,000개면 추론 서비스 팔 수 있는 용량이 충분함. 클라우드 4강 진입 타임라인이 생각보다 빠를 수 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 팔콘 #62",
      content: "현재 $350B에서 $2T 목표면 5.7배인데 Starlink 가입자 성장 속도면 10년 뷰에서 가능한 수학임. 비상장이라 타겟 설정 어렵지만 TSLA 통한 익스포저가 현실적인 접근임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-38]: [
    {
      alias: "서초 매 #64",
      content: "Anthropic PSR 1.4배 vs OpenAI PSR 4배 — 이 밸류에이션 갭이 합리화되기 어려움. Claude ARR 성장 속도가 GPT 대비 빠르다면 오히려 역전 가능성 있음. AMZN 보유자 입장에서는 공짜 옵션임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "광화문 늑대 #69",
      content: "Bedrock 통한 Claude 성장이 AWS 마진 개선 1위 만든 게 Q1 실적으로 확인됐음. 이게 Anthropic IPO 전에도 AMZN에 반영되는 구조임. 장기 홀더한테는 베스트 포지션임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 매 #78",
      content: "$65B 기업가치인데 ARR이 $47B이면 5개월 후 ARR이 더 빠르게 성장할 거임. 상장 시점에 ARR 두 배 되면 $130B+ 기업가치도 가능한 수학임. 타이밍이 관건임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-37]: [
    {
      alias: "강남 독수리 #52",
      content: "구독 수익이 멀티플 확장 재료라는 거 동의함. 광고 단일 수익 회사가 PER 20배면 구독 추가 시 25~30배가 정당화됨. 지금 주가에서 $314 목표는 합리적임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 올빼미 #73",
      content: "AI 광고 ROI 2배 개선이 광고주 예산 증가로 이어지는 건 이미 Q1 실적으로 확인됨. 구독 더해도 광고 수익 잠식 없는 구조라 두 개가 독립적으로 성장하는 게 포인트임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 표범 #43",
      content: "Llama 오픈소스가 기업 API 수익화로 가면 세 번째 레이어임. 광고+구독+API면 Microsoft Azure 구조랑 비슷해지는 거임. 그렇게 되면 밸류에이션 참조 기업이 바뀌는 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-36]: [
    {
      alias: "여의도 매 #17",
      content: "수주잔고 역대 최고 채널 체크로 확인됨. 회계 이슈 때문에 주가가 눌렸던 건데 본업 스토리로 복귀하는 거임. FY2026 $25B+ 전망 유지하는 근거가 수주잔고임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 황소 #31",
      content: "커스텀 칩 채택해도 AI 서버는 사야 함. Trainium이든 TPU든 결국 SMCI 랙에 들어가는 거임. 커스텀 칩 확산이 SMCI 적이 아니라 우군임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-35]: [
    {
      alias: "강남 팔콘 #62",
      content: "Morgan Stanley 채널 체크 숫자 신뢰도 높음. Adam Jonas가 이 정도 구체적인 숫자 내면 소스 탄탄한 거임. AVO랑 묶이면 FSD 성장이 규제 + 사용자 두 개 축에서 동시에 확인된 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 콘도르 #53",
      content: "44% MoM 유지되면 연말 일 1억 마일 돌파임. 그 시점에 FSD 완성도 재평가가 나올 것임. 지금 포지션이 그 재평가 전에 들어가는 타이밍인 게 맞음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "연환산 97.5억 마일이면 Waymo 연간 5천만 마일 대비 195배임. 이 격차가 좁혀지는 구조가 아니라 더 벌어지는 거임. 자율주행 경쟁 결과는 사실상 나온 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-34]: [
    {
      alias: "마포 황소 #11",
      content: "Starlink 도매 구조가 통신사한테 자체 위성 대비 비용 100배 절감임. 한번 연결되면 이탈 안 함. 30개가 50개, 100개로 늘어나는 건 시간문제임. 수익 가시성이 이 숫자에서 나오는 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 사자 #77",
      content: "B2B 도매 수익은 B2C보다 ASP 낮지만 계약 기반이라 예측 가능성이 높음. 할인율 낮아지면 현재 가치 올라가는 구조임. Starlink 단독 상장 밸류에이션 기반으로 충분함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "광화문 매 #04",
      content: "SK텔레콤이 Starlink 파트너라는 거 한국 투자자한테는 중요한 포인트임. 국내 통신 인프라에 SpaceX가 들어오는 거임. 이게 현실이 되면 국내 통신주 밸류에이션에도 변수임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-33]: [
    {
      alias: "을지로 사자 #77",
      content: "NIO Li Bin 발언이 핵심 포인트임. 경쟁사 CEO가 공개 인정한 건 기술 격차가 그 분도 부정 못 하는 수준이라는 거임. 중국 FSD 진출 시 로컬 경쟁사들이 방어할 수단이 없음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 팔콘 #62",
      content: "200만대+ 중국 출고 차량 FSD 업셀링이 소프트웨어 마진 ~80%임. 단 1%만 전환해도 연간 수억 달러 추가 소프트웨어 수익임. 이게 자동차 사업과 다른 레벨의 마진 레버리지임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-32]: [
    {
      alias: "여의도 독수리 #08",
      content: "XLE 축소 타이밍 맞다고 봄. 협상 타결 확률이 50%가 안 된다고 해도 리스크 관리 차원에서 비중 줄이는 게 맞음. 항공사 비중 늘린 건 유가 하락 헤지로 좋은 접근임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 사자 #24",
      content: "CBDC 폐지 + BTC 비축 정책 조합이 장기 친암호화폐 환경 확정 시그널임. 단기 Wild West 통제 뉴스가 노이즈처럼 보여도 큰 방향이 맞으면 포지션 유지가 맞음. IBIT 홀딩.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-31]: [
    {
      alias: "서초 매 #64",
      content: "에너지 마진이 자동차 초과한다는 게 이제 분기 실적으로 계속 확인되고 있음. Megapack 백로그 12개월+ 면 FY2026 에너지 부문 성장률이 자동차 압도하는 거임. 복합 성장 스토리 강화됨.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 황소 #31",
      content: "400개 Megapack이면 약 1.56GWh 저장용량임. 텍사스 전력망 안정 기여하면서 동시에 출고 물량 폭증이면 에너지+자동차 두 개 모두 가속 중인 거임. 오늘 TSLA 뉴스 중 가장 과소평가된 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-30]: [
    {
      alias: "여의도 매 #17",
      content: "기관 진입 장벽이 규제 불확실성이었는데 CBDC 폐지 + 스테이블코인 법안으로 명확화되면 IBIT 자금 유입 가속됨. 단기 Wild West 통제 뉴스는 장기 기관 자금 유입 구조 확립의 과정임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 독수리 #52",
      content: "COIN은 스테이블코인 규제 명확화 수혜 1순위임. GENIUS Act 통과 시 Coinbase가 스테이블코인 인프라 역할 강화됨. BTC ETF + COIN 조합이 정책 수혜 포트폴리오임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-29]: [
    {
      alias: "마포 황소 #11",
      content: "우주 데이터센터 비전이 10년 뷰면 지금 투자 포인트는 H100 8,000개 기반 AI 서비스 임박한 수익화임. 단기 현금 흐름 가시성이 있는 AI 컴퓨팅 판매가 먼저임. 장기 비전은 덤임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 사자 #77",
      content: "NVDA GPU 공급 수혜는 어떤 AI 클라우드가 이겨도 NVDA가 이기는 구조임. SpaceX H100 8,000개도 NVDA 매출임. 비상장 SpaceX에 못 들어가도 NVDA로 간접 수혜받는 포지션 유지.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 팔콘 #62",
      content: "Anthropic + SpaceX 조합이 AWS 생태계랑 겹치는 부분이 있음. Amazon이 Anthropic 최대주주고 SpaceX가 Anthropic과 파트너인 구조면 Amazon이 이 생태계에서 중심에 있는 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-28]: [
    {
      alias: "강남 독수리 #52",
      content: "Cybercab 배포 일정 7월 오스틴이면 SBW 양산 리스크가 없다는 게 이미 확인된 거임. 리포트 봐서 기술 설명 좋은데 투자자한테 제일 중요한 건 그게 Cybercab 타임라인 지연 리스크를 제거한다는 논리임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "조향 구독 수익화 잠재력은 맞는 방향인데 규제 이슈 있을 수 있음. 안전 관련 기능을 구독 게이팅하는 건 도로교통법 저촉 가능성 있어서 어떤 기능까지 유료화 가능한지 법적 검토가 먼저임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 황소 #31",
      content: "FSD-SBW 통합 최적화가 Waymo 대비 Tesla 자율주행 아키텍처 우위 근거 중 하나임. Waymo 라이다 방식은 SBW 없어도 되는 구조라 비교가 어렵지만, 순수 카메라+AI 방식에서 SBW는 필수적인 하드웨어 요소임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-27]: [
    {
      alias: "을지로 사자 #77",
      content: "Committed PO 개념 중요한 포인트 잡았음. 취소 불가 계약이면 매출 가시성이 다른 차원임. NVDA 실적 발표 때마다 수주잔고 숫자 업데이트 나오는 걸 계속 봐야 함. 이게 줄어드는 시점이 매도 신호임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 황소 #11",
      content: "Anthropic $64B 계약이 모두 NVDA GPU 기반이라면 Anthropic이 NVDA 최대 고객 중 하나인 거임. Claude 모델 성장 = NVDA 매출 성장이 연동되는 구조인데 이 상관관계가 시장에서 충분히 인식 안 됐음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "여의도 콘도르 #19",
      content: "5T 타겟 내는 기관 나오면 주가 레벨 달라짐. 지금 $3.5T 정도인데 5T면 40% 업사이드. 수주잔고 기반 DCF에서 그게 나오려면 마진 가정이 현재보다 높아야 하는데 Blackwell Ultra ASP 추세가 핵심.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 팔콘 #62",
      content: "Azure -2.5bps 하락이 계속되면 MS가 NVDA 구매 감소로 비용 절감 시도할 수 있음. 근데 그러면 AI 서비스 경쟁력이 떨어지는 딜레마에 빠지는 거라 실제로 줄이기 어려운 구조임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-26]: [
    {
      alias: "서초 매 #64",
      content: "HBM 비중 50% 돌파 타임라인 동의. 2027년 전후가 MU 밸류에이션 재평가 시점임. 그 전까지 범용 DRAM 마진 압박 감수해야 하는데 그 구간을 버틸 현금 흐름이 있는지 보는 게 중요함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 황소 #95",
      content: "10배 사이클 논리 매력적인데 과거 두 번 중 한 번은 ~4배 성장이었음. 정확히 '10배'라는 수치에 집착하기보다 AI 수요 구조화가 몇 배 성장을 만드는지가 투자 포인트임. 방향은 맞음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 늑대 #09",
      content: "CHIPS법 팹 2028년 완성 전까지 SK하이닉스 HBM 우위가 유지되는 구간임. MU는 그 이후 종목으로 포지셔닝하는 게 맞을 수도 있음. 지금 사려면 2028년 HBM 생산량 기대를 선반영하는 판단이어야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-25]: [
    {
      alias: "판교 황소 #31",
      content: "국가 보조금 덤핑 경쟁은 중국이 DRAM뿐 아니라 다른 산업에서도 써온 방법임. 삼성이 과거에도 버텨냈는데 그때와 다른 건 CXMT가 기술 수준 자체를 빠르게 따라오고 있다는 거임. 3~5년이 중요한 관찰 구간.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "여의도 매 #33",
      content: "미국 추가 제재 카드가 변수임. Corsair 채용 이슈 의회에서 터지면 CXMT 제재 나올 수 있고 그러면 판세가 달라짐. 제재 리스크가 CXMT 포지션의 숨겨진 취약점임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-24]: [
    {
      alias: "을지로 팔콘 #16",
      content: "Azure 마진 하락이 기업 예산 배분 변화로 이어지는 시그널 확인되면 AWS 점유율 데이터를 4Q 실적에서 봐야 함. 마진→점유율→주가 시퀀스가 AMZN 리레이팅 경로임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 올빼미 #73",
      content: "Trinium + Bedrock 조합이 NVDA 의존 줄이는 구조라는 게 중요함. AI 클라우드 마진 구조에서 GPU 비용이 제일 크고, 자체 칩으로 대체하면 그게 직접 마진으로 들어오는 거임. AWS 마진 개선의 구조적 근거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 올빼미 #85",
      content: "Anthropic이 AWS에 독점적으로 붙어있는 게 아니라 Google도 투자자인데, Bedrock 통해 Claude 쓰는 기업 수가 얼마나 되는지 실제 숫자가 중요함. 다음 실적 발표에서 Bedrock 고객사 수 공개 여부 체크해야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-23]: [
    {
      alias: "잠실 콘도르 #53",
      content: "FSD 유럽 승인 타임라인이 어떻게 되는지가 다음 레그임. 독일 규제당국이 제일 까다로운데 독일 통과하면 전체 EU 적용 가능한 구조임. 내부에서 2027년 초 보는 시각도 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "여의도 매 #17",
      content: "Q2 인도량 컨센서스 47~48만대면 YoY로 얼마임? 전년 Q2가 44만대 수준이었으니까 7~9% 성장이고 시장이 기대치 낮춰놓은 거라 서프라이즈 가능성 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 늑대 #09",
      content: "3개월 연속 반등이 신형 Model Y 출시 효과인지 브랜드 회복인지 구분이 중요함. 신차 효과면 일시적일 수 있고 브랜드 회복이면 구조적임. 다음 1~2개월 데이터가 판별 포인트.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "광화문 늑대 #69",
      content: "SpaceX Megapack 벨기에 착공이 같이 나온 게 Tesla 에너지 부문 매출 모델에 영향 있음. SpaceX가 Megapack 구독식으로 계속 사면 에너지 부문이 안정적 B2B 수요처 생기는 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-22]: [
    {
      alias: "여의도 콘도르 #19",
      content: "Starlink 단독 상장이 맞는 방향이라는 데 동의. 합병은 CFIUS 심사 6개월+ 걸리고 주주 희석 승인까지 받으려면 1년은 걸림. 단독 상장은 절차 단순하고 Starlink 자체 밸류에이션 극대화됨.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 사자 #77",
      content: "완전 재사용 올해 목표는 Elon 특유의 낙관 타임라인임. 실제로 되면 발사 비용 혁명인데 현실적으로는 2027년 초로 보는 시각이 더 많음. 그래도 방향은 맞음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 황소 #95",
      content: "B2G 수익이 Starlink 기업가치에서 핵심 프리미엄 요소임. 군사 통신 계약은 경쟁입찰 없이 독점적 구조가 가능하고 마진이 B2C 대비 훨씬 높음. $2.35B 계약이 시작이라면 규모 확대 가능성 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-21]: [
    {
      alias: "을지로 팔콘 #16",
      content: "전체 뷰 정리 맞음. AI 섹터 전반 강세 유지. 단 CXMT 이슈가 메모리 내 종목 선별을 만들어내는 거고 이게 섹터 전체 위험이 아닌 종목 분산 요인임. 포트폴리오 내 MU와 SKH 비중 재조정 고민 중.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 올빼미 #85",
      content: "Tesla 유럽 데이터가 단기 모멘텀이라는 표현이 맞는데 단기라도 Q2 인도량 숫자가 서프라이즈 나오면 주가 단기 모멘텀 생기는 거임. 7월 실적 발표 전까지 TSLA 포지션 유지 전략 맞음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 황소 #11",
      content: "오늘처럼 NVDA, AMZN, TSLA, MU 다 긍정적 재료 나오는 날 시장 흐름 보면 AI 섹터 방향이 분명함. 개별 종목 리스크보다 섹터 방향이 중요한 구간임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 황소 #31",
      content: "SpaceX IPO 시나리오가 TSLA에 어떤 영향 주는지가 개인적으로 제일 주시하는 변수임. 합병되면 TSLA 주주 희석, 단독 IPO면 TSLA 프리미엄 일부 소멸. 어느 쪽이든 가격 조정 가능성 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-20]: [
    {
      alias: "강남 사자 #24",
      content: "교환비율 문제가 진짜 핵심임. SpaceX $350B 기준으로 TSLA 주주 희석 계산하면 합병 시너지 가정이 상당히 공격적이어야 현재 주가 프리미엄이 정당화됨. 숫자 불편하게 나온다는 거 충분히 이해함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "서초 곰 #39",
      content: "Kalshi 33%도 높다고 봄. TSLA 이사회 승인 없이 Elon이 단독으로 발표할 성격의 딜이 아닌데, 보도 자체가 협상 레버리지용일 가능성 배제 못 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 사자 #22",
      content: "합병 안 되더라도 SpaceX 연산 자원이 TSLA FSD에 투입되는 사이드 딜 가능성은 있음. 그 자체만으로도 기술 밸류 재평가 재료 될 수 있어서 상황 계속 봐야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-19]: [
    {
      alias: "을지로 팔콘 #16",
      content: "$8억 초과분 IR 자료만으로 파악 안 될 수 있음. 다음 분기 컨퍼런스콜에서 세그먼트별 직접 물어봐야 할 사안이라고 생각함. Optimus 개발비 공시 방식부터 명확히 해달라고 해야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 수리부엉이 #28",
      content: "에너지 부문이 버텨준다는 거 맞는데, 주식수 35% 증가가 EPS에 누적으로 쌓이는 희석 효과는 과소평가하면 안 됨. 단기 실적보다 장기 주주가치 훼손 여부가 더 중요한 포인트임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-18]: [
    {
      alias: "여의도 독수리 #08",
      content: "평단 $147에 $506 보는 감정 공감함. MI400 나오기 전까지 CoWoS 병목이 유일한 제약인데, TSMC 내 AMD 배분 비중이 늘어나는 추세라 해소 시점이 생각보다 빠를 수도 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 독수리 #41",
      content: "공급 제약이 AMD만의 문제 아니라는 거 맞음. 다만 수요가 공급 초과하는 구간에선 가격 협상력이 AMD한테 있다는 게 실질적인 마진 레버리지 포인트임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "광화문 호랑이 #35",
      content: "구조적 상승 여력이라는 표현이 AI 인프라 수요 지속 가정에서만 성립한다는 점은 체크해야 함. 그 가정 흔들리는 시점에 배수 리레이팅이 빠르게 역행할 수 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 황소 #05",
      content: "채널 체크에서 MI300X 수요 공급 역전 확인됨. 이 구간 AMD 마진이 올라오면 실적이 컨센서스 웃도는 분기 나올 수 있어서 다음 가이던스 체크가 중요함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-17]: [
    {
      alias: "여의도 매 #17",
      content: "2028 HBM4 팹 타임라인이면 SK하이닉스 우위 구간이 길게 이어짐. 그 사이 MU가 HBM3E 수율 올려서 간격 좁히는 게 핵심 변수인데, 아이다호 착공 속도가 시장 기대보다 느리면 2028도 낙관일 수 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 독수리 #41",
      content: "정치인 보유 이슈는 단기 노이즈지만 CHIPS법 자금 집행 지속성 확인하는 계기가 됨. 정책 리스크 관리 측면에서 유의미한 시그널이라 봄. MU 2027 픽이라는 뷰 동의함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-16]: [
    {
      alias: "판교 호랑이 #35",
      content: "$350B 보수적으로 보인다는 뷰 동의함. B2G 군사 계약이 리커링으로 쌓이면 기업가치 재산정 필요한 시점인데, 비상장이라 반영 타이밍이 상장 이후에나 오는 게 문제임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 수리부엉이 #28",
      content: "TSLA 합병 루머가 직접 IPO 타이밍 재는 시그널이라는 해석 흥미로움. 합병이면 이 밸류에이션 계산이 통째로 바뀌는 거라 두 시나리오 동시에 준비해야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 사자 #24",
      content: "비상장 직접 포지션 없는 거 아쉬운 날이라는 거 공감함. SPAC이나 간접 경로 검토해볼 만하다는 생각인데, 현실적으론 TSLA 통해서 간접 익스포저 잡는 게 지금 유일한 방법임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-15]: [
    {
      alias: "을지로 황소 #05",
      content: "서비스 매출 $100B 달성 시점이 관건이라는 거 동의. 현재 런레이트 보면 2027년 안에 가능한 수치인데, 시장이 얼마나 선반영하느냐가 지금 $311 적정성 판단의 핵심임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 매 #78",
      content: "App Store 통행료 논리가 에이전트 시대에 강화된다는 뷰 맞음. 다만 EU 규제 결정이 에이전트 매출화 전에 선행될 수 있어서 그 타이밍 체크가 리스크 포인트임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-14]: [
    {
      alias: "서초 독수리 #27",
      content: "B200 공급 일정 확인하고 나서 조용해지는 거 팀에서도 봤음. 3Q 가이던스 들어오면 재료가 될 수 있어서 지금 들어가긴 부담스러운 구간이기도 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 콘도르 #88",
      content: "리스크 과소평가 맞는 말임. B200 양산 지연 시나리오 아직 주가에 반영 안 됐다고 보는 게 맞고, 그게 단기 하방 재료가 될 수 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-13]: [
    {
      alias: "서초 매 #64",
      content: "260달러 이상 안 산다는 거 공감. FSD 수치 개선이 주가에 선반영된 구간에선 잠깐 숨 고르는 게 낫다고 봄.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "광화문 매 #04",
      content: "비중 줄인 거 맞는 판단인 것 같음. 오스틴 파일럿 확장 속도 데이터 나오기 전까지는 풀포지션이 부담스러운 구간임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-12]: [
    {
      alias: "잠실 황소 #95",
      content: "10월 전에 CPI 한 번 더 나오는 타이밍이 변수. 그 전까지는 방어적으로 가는 게 맞는 것 같음. 달러 비중 올리는 거 나도 동의.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 팔콘 #57",
      content: "연준 인하 1회도 빠듯하다는 뷰가 내부에서도 점점 세지고 있음. 공식 전망 업데이트 전에 포지션 조정하는 게 선제적으로 맞다고 봄.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-11]: [
    {
      alias: "여의도 황소 #51",
      content: "AWS 마진 개선 추세 보면 2027 타겟이 지금 컨센서스보다 훨씬 보수적인 거 맞음. 이 구간 AMZN 들고 가는 게 맞다고 봄.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "판교 곰 #66",
      content: "밸류에이션 리레이팅 시나리오 동의하는데, 그 전에 AWS 성장률 둔화 구간 한 번 더 나올 수 있어서 단기 진입은 신중하게 봐야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-10]: [
    {
      alias: "강남 여우 #13",
      content: "AI 기능 온디바이스 전환 속도 빠른 거 맞음. 서비스 매출 붙는 AI 프리미엄이 찍히기 시작하면 그 분기가 진짜 재평가 트리거될 거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-9]: [
    {
      alias: "잠실 여우 #17",
      content: "AIP 상업 부문 역전 진짜 의미있는 건데, 40배 PSR이 이걸 정당화하려면 성장 유지가 전제조건. 한 분기 삐끗하면 멀티플 꺾임 빠르게 올 수 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 표범 #43",
      content: "내부에서 추가 매수 의견 없다는 게 그대로 읽힘. 공식 리포트 목표주가 올리려면 성장 가속 확인이 먼저라는 거 맞음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-8]: [
    {
      alias: "판교 표범 #37",
      content: "DCF 넣어보면 Azure AI 기여 포함 시 타겟 차이 나는 거 맞음. 보수적 숫자 낼 수밖에 없는 구조가 나중에 서프라이즈 재료가 되는 방식임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "광화문 늑대 #69",
      content: "기업 AI 도입 속도 유지 전제라는 건데, 지금까지는 예상보다 빠르게 가고 있어서 낙관론 베팅이 합리적으로 보임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-7]: [
    {
      alias: "여의도 콘도르 #19",
      content: "메타 광고 단가 회복 속도 보면 3Q 서프라이즈 가능성 진짜 있음. Llama 비용 절감 효과가 영업이익에 찍히기 시작하면 그게 추가 랠리 트리거임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 콘도르 #53",
      content: "팀에서 메타 비중 올리는 거 알고 있었음. 광고 단가 회복 데이터 보면 충분히 근거 있는 판단이라고 봄.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "서초 수리부엉이 #91",
      content: "Llama 오픈소스 전략이 클라우드 비용 절감에 직결되는 거라 규모 커질수록 마진 레버리지가 엄청남. 내년 숫자가 기대됨.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-6]: [
    {
      alias: "강남 팔콘 #62",
      content: "MI350 수요 채널 체크 결과 긍정적이라는 거 들었음. NVDA 대비 가격 메리트가 실제 계약으로 연결되는 사례 있으면 타겟 업 재료 됨.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-5]: [
    {
      alias: "마포 황소 #11",
      content: "NVDA 밸류에이션 성격 달라진 거 맞음. 수주 기반이 생겼으니까. 근데 HBM 병목 해소 타이밍이 실적 전환 시점을 결정한다는 거 간과하면 안 됨.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "을지로 사자 #77",
      content: "단기 조정 있어도 이상하지 않다는 거 동의. 코스트 기반 없이 들어간 사람들 물량 소화 구간 나올 수 있어서 천천히 봐야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-4]: [
    {
      alias: "판교 늑대 #09",
      content: "헤지 15%까지 올린 거 올해 들어 가장 수비적인 포지션이라는 거잖아. 신용 스프레드 벌어지는 거 나도 보고 있음. VIX 낮은 게 오히려 방심하게 만드는 구간임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 매 #78",
      content: "VIX 낮은 구간에서 스파이크 나오면 레버리지 물린 사람들 청산 물량이 증폭시키는 거라 단기 낙폭이 예상 외로 클 수 있음. 헤지 올리는 거 타이밍 맞다고 봄.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-3]: [
    {
      alias: "강남 호랑이 #47",
      content: "EV 침투율 둔화가 구조적인지 판단이 진짜 핵심임. 지금 뷰는 일시적으로 가는 쪽이 많은데, 중국 경쟁 강도 보면 구조적 가능성도 배제 못함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-2]: [
    {
      alias: "여의도 매 #33",
      content: "인도 5%대 비중 맞음. 뉴스 스케일과 실제 비중 갭이 큰 거 아는데도 쓰는 건 투자자 니즈 때문이지. 장기는 유효하니까 분리해서 봐야 함.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "마포 올빼미 #73",
      content: "서비스 마진 구조가 더 중요하다는 거 맞음. 하드웨어 사이클 우려로 팔면 서비스 성장 수혜를 다 날리는 거라서, 장기 관점에서 인도 스토리는 부수적인 재료임.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
  [-1]: [
    {
      alias: "을지로 팔콘 #16",
      content: "공식 목표주가랑 내부 뷰 갭이 크다는 거 공감. 컨센서스 튀는 게 부담인 구조에서 서프라이즈 재료 쌓이는 거임. 개인 계좌 산 거 맞는 타이밍 같음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "강남 올빼미 #85",
      content: "데이터센터 수요 공급 앞서는 구조 당분간 안 꺾임. B200 양산 본격화 시점이 다음 주가 점프 트리거가 될 거라 보고 있음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
    {
      alias: "잠실 황소 #95",
      content: "160 이상 타겟 내부에서 나오는 거 맞음. 공식 발표 늦어지는 것뿐이고 실제 수요 데이터가 계속 확인되면 업데이트 나올 수밖에 없음.",
      created_at: "2026-05-20T08:01:00.000Z",
    },
  ],
};
