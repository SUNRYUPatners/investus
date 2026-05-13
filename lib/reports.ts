export type ReportCategory = "시장분석" | "종목분석" | "매크로" | "섹터" | "특집";
export type ReportColor    = "mint" | "blue" | "purple" | "orange" | "red";

export type Report = {
  id:            string;
  title:         string;
  summary:       string;
  body:          string;
  category:      ReportCategory;
  categoryColor: ReportColor;
  subject?:      string;   // e.g. "🏎️ 테슬라 (전기차·AI)"
  date:          string;
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
  {
    id:            "seed-001",
    title:         "트럼프 방중 — 시총 9조 달러 CEO 군단, 역대급 무역 협상 임박",
    summary:       "트럼프 대통령이 중국을 약 10년 만에 방문합니다. 일론 머스크($740B), 팀 쿡($3.2T), 젠슨 황, 마크 저커버그($863B) 등 시총 합산 9조 달러 CEO 군단이 동행합니다. 단순 외교 방문이 아닌 역대급 무역 딜의 서막으로 읽힙니다.",
    body:          "■ 핵심 요약\n\n트럼프 대통령의 중국 방문은 2018년 무역전쟁 이후 약 10년 만의 방중입니다. 동행 CEO 면면을 보면 이번 방문의 무게감이 드러납니다.\n\n■ 동행 CEO 및 시총\n\n• 일론 머스크 (테슬라·스페이스X) — $740B\n• 팀 쿡 (Apple) — $3.2T\n• 젠슨 황 (NVIDIA)\n• 제이미 다이먼 (JPMorgan) — $765B\n• 마크 저커버그 (Meta) — $863B\n• 래리 핑크 (BlackRock)\n• 스티븐 슈워츠먼 (Blackstone)\n\n■ 시장 시사점\n\n1) 무역 관세 완화 가능성 — 반도체·소비재·전기차 수혜 기대\n2) 테슬라: 중국 시장 재진입 및 FSD 규제 완화 협의 가능성\n3) NVIDIA: 대중 반도체 수출 규제 완화 여부 주목\n4) Apple: 아이폰 공급망 안정화 및 중국 내 서비스 확대 협의\n\n■ 리스크\n\n외교적 쇼에 그칠 경우 단기 기대감 실망 매도 가능. 협상 결과 발표 일정이 불명확합니다.\n\n■ 결론\n\n시총 9조 달러 CEO 군단의 방중은 관세 완화·공급망 재편 협상의 시작점입니다. 결과에 따라 기술주 전반에 단기 모멘텀이 형성될 수 있습니다.",
    category:      "매크로",
    categoryColor: "purple",
    subject:       "🇺🇸 트럼프 방중 (미중무역)",
    date:          "2026-05-13",
    isPinned:      true,
    images:        ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Donald_Trump_and_Xi_Jinping_at_G20_in_Argentina_01_dec_2018.jpg/800px-Donald_Trump_and_Xi_Jinping_at_G20_in_Argentina_01_dec_2018.jpg"],
  },
  {
    id:            "seed-002",
    title:         "4월 CPI 쇼크 — 헤드라인 +3.8% 예상 상회, 금리 인하 시계 후퇴",
    summary:       "4월 소비자물가지수(CPI)가 예상을 상회했습니다. 헤드라인 CPI +3.8%(예상 +3.6%), 근원 CPI +2.8%(예상 +2.6%) — 2023년 5월 이후 최고 헤드라인, 2025년 9월 이후 최고 근원 수치입니다. 에너지가 전체 상승분의 40% 이상을 차지했으며 연준 금리 인하 기대는 후퇴했습니다.",
    body:          "■ 4월 CPI 실제 데이터\n\n• 헤드라인 CPI: +3.8% (예상 +3.6%) → 예상 상회 ⚠️\n• 근원 CPI (식품·에너지 제외): +2.8% (예상 +2.6%) → 예상 상회 ⚠️\n• 에너지: 전체 물가 상승분의 40% 이상 차지\n• 헤드라인 기준 2023년 5월 이후 최고치\n• 근원 기준 2025년 9월 이후 최고치\n\n■ 연준(Fed) 금리 경로 재조정\n\n• 기존 시장 기대(7·9월 인하) → 후퇴\n• CME FedWatch 연내 인하 확률 급감\n• 연준 \"데이터 의존\" 기조 유지 — 추가 지표 확인 필요\n\n■ 자산별 대응 전략\n\n1) 채권: 장기물 TLT 단기 역풍, 단기물(SHY·BIL) 선호\n2) 성장주: 밸류에이션 압박 재발 — 금리 민감 성장주 단기 주의\n3) 에너지주: 물가 상승 수혜 — XLE, OXY 주목\n4) 달러: 강세 유지 가능성 — 원/달러 상단 열려있음\n\n■ 트럼프 관세 변수\n\n중국·EU 관세 재협상 진행 중이나 공급망 충격이 인플레에 추가 압력. 2~3개월 추세 확인 필요.\n\n■ 결론\n\n이번 CPI는 시장 기대보다 나쁜 데이터입니다. 금리 인하 기대보다는 인플레 지속 가능성을 열어두고, 에너지·원자재 비중을 점검하세요.",
    category:      "매크로",
    categoryColor: "purple",
    subject:       "📈 CPI (인플레·금리)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"],
  },
  {
    id:            "seed-003",
    title:         "NVIDIA — 젠슨 황, 삼성·TSMC·마이크론 공급망 동맹 확대 선언",
    summary:       "NVIDIA CEO 젠슨 황이 삼성, TSMC, 마이크론 등 기존 공급망 파트너에 감사를 표하며 '가능한 한 빠르게 확장하겠다'고 밝혔습니다. AI 인프라 수요 폭증에 대응한 생산 능력 확충 의지를 재확인한 발언으로, 한국 반도체 기업 수혜 기대도 높아지고 있습니다.",
    body:          "■ 발언 요지\n\n\"우리는 삼성, TSMC, 마이크론을 비롯한 파트너들에게 매우 감사하다. 가능한 한 빠르게 그들과 함께 확장하고자 한다.\"\n\n■ 공급망 파트너별 분석\n\n• TSMC: Blackwell GPU 파운드리 주요 파트너 — CoWoS 패키징 역량이 핵심\n• 삼성전자: HBM 메모리 및 패키징 협력 확대 기대\n• 마이크론: HBM3E 공급 확대 — SK하이닉스와 경쟁 심화\n\n■ 한국 기업 수혜\n\n• SK하이닉스: HBM3E 독점 공급 유지, 수혜 최대\n• 삼성전자: HBM 퀄 테스트 통과 후 공급 비중 확대 기대\n\n■ NVIDIA 현황\n\n• FY2026 데이터센터 매출 가이던스: $43~45B (+90%+)\n• Blackwell B200 출하 가속화 중\n• GB200 NVL72 랙 시스템 — 대형 클라우드 사전 계약 완료\n\n■ 결론\n\n젠슨 황의 공급망 발언은 AI 인프라 투자 사이클이 2027년까지 지속됨을 시사합니다. NVIDIA 본주와 함께 삼성전자·SK하이닉스·SOXX ETF를 주목하세요.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🟢 NVIDIA (AI반도체)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80"],
  },
  {
    id:            "seed-004",
    title:         "Tesla Terrafab × TSMC — 반도체 자립화 전략과 투자 시사점",
    summary:       "테슬라가 자체 반도체 생산 시설 'Terrafab'을 공식 발표했습니다. TSMC는 애리조나 팹에 200억 달러를 추가 투자하며 테슬라·스페이스X의 공식 칩 파트너로 나섭니다. 론 바론은 CNBC에서 스페이스X 투자금이 150억 달러 이상으로 성장했다고 밝혔습니다.",
    body:          "■ Terrafab 핵심 내용\n\n테슬라가 자체 반도체 생산 시설 Terrafab을 발표. 테슬라·스페이스X가 필요한 모든 칩을 자체 공급망으로 충당하는 장기 전략입니다.\n\n■ TSMC 투자 내용\n\n• 애리조나 팹 추가 투자: $20B\n• 미래 팹 추가 배정: $2.5B\n• 테슬라·스페이스X 공식 파트너 예정\n\n■ NVIDIA 플레이북 비교\n\n일론 머스크가 NVIDIA 전략을 그대로 따르는 중:\n1) 배터리 셀 컨소시엄 → 판나소닉·CATL 참여\n2) 자체 AI 칩 (Dojo, HW5) 설계\n3) Terrafab으로 생산 내재화\n\n■ 론 바론 발언 (CNBC Squawk Box)\n\n\"스페이스X 투자금이 현재 $15B 이상으로 성장 (투자원금 $1.7B). 바론 캐피탈 역사적 수익의 1/3($60B)이 일론 머스크 관련 투자에서 창출됐다.\"\n\n■ 테슬라 투자 포인트\n\n• FSD 구독 수익화 가속\n• 로봇택시 2026년 하반기 상업 서비스 예정\n• Terrafab으로 칩 원가 절감 → 마진 개선\n• 에너지 사업부 고성장 지속\n\n■ 결론\n\nTerrafab × TSMC 협력은 테슬라가 AI·에너지·로보틱스 복합 플랫폼으로 재평가받는 전환점입니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏎️ 테슬라 (AI·반도체)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"],
  },
  {
    id:            "seed-005",
    title:         "Google × SpaceX × Anthropic — 우주·AI 삼각 동맹의 투자 시사점",
    summary:       "구글이 SpaceX 지분 7%, Anthropic 지분 15%를 보유하며 우주·AI 생태계 허브로 부상하고 있습니다. 두 기업 모두 최근 공개적 협력을 발표했으며, 이 삼각 동맹은 다음 10년 인프라 투자 사이클의 핵심 축입니다.",
    body:          "■ 삼각 동맹 구조\n\n구글 → SpaceX (지분 7%): 저궤도 위성·우주 인프라 접근권\n구글 → Anthropic (지분 15%): Claude AI 모델·기업용 AI 솔루션\nSpaceX → 구글: 스타링크 기반 클라우드 연결성\nAnthropic → 구글: GCP 위에서 모델 학습·서빙\n\n■ 시너지 포인트\n\n• 구글: 우주 인프라 + AI 모델 동시 확보 (아마존 AWS+Kuiper 대항마)\n• SpaceX: 구글 클라우드 데이터 위성 전송 수익화\n• Anthropic: 구글 TPU로 학습 비용 절감 + 엔터프라이즈 판로\n\n■ 최근 발표\n\n• Google-Anthropic: $5B 추가 투자 협약\n• SpaceX-Google: 위성 기반 클라우드 서비스 공동 개발\n• Anthropic: 기업용 Claude 구독 ARR $1B 돌파 예상\n\n■ 투자 접근법\n\nSpaceX·Anthropic은 비상장. 구글(GOOGL)을 통한 간접 투자가 현실적.\n• GOOGL: 클라우드(GCP) + AI + 우주 시너지 수혜\n• 관련 ETF: ARKK, IXN(글로벌 테크)\n\n■ 결론\n\n구글은 단순 광고·검색 회사가 아닌 우주·AI 인프라 플랫폼으로 재평가 시점입니다.",
    category:      "섹터",
    categoryColor: "orange",
    subject:       "🌐 구글·SpaceX·Anthropic (우주·AI)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"],
  },
  {
    id:            "seed-006",
    title:         "Rocket Lab 주목 — SpaceX 자율기술 해자와 소형 위성 발사 수혜",
    summary:       "SpaceX Falcon 9은 AI 없이 결정론적 알고리즘만으로 400회 이상 자율 귀환에 성공한 세계 유일의 재사용 로켓입니다. 이 기술 해자로 발사 비용이 경쟁사 대비 60~70% 저렴합니다. SpaceX 비상장 제약 속 소형 위성 발사 유일 대안 Rocket Lab(RKLB)이 함께 주목받고 있습니다.",
    body:          "■ Falcon 9 자율 시스템\n\n• 결정론적(deterministic) 제어 알고리즘 — AI 머신러닝 아님\n• 자율 비행 종료 시스템(AFTS): 비정상 비행 즉시 감지·파괴\n• G-부하 센서 기반 엄격한 트리거\n• 드래그 기반 탈궤도 기동: 지상 통제 없이 자율 수행\n• 400회 이상 부스터 귀환 성공\n\n■ 재사용 경제학\n\n• Falcon 9 발사 비용: 약 $6,700만 (경쟁사 대비 60~70% 저렴)\n• 부스터 1개당 최대 20회+ 재사용\n• 스타링크 배치 비용: 타사 대비 1/10 수준\n\n■ Rocket Lab (RKLB)\n\n• Electron 로켓: 소형 위성 전용, 100kg 이하 탑재\n• Neutron 로켓 개발 중: 중형급 시장 진입 예정\n• 우주 부품 사업(Space Systems) 고성장 중\n• 최근 기관 매수세 확인\n\n■ 결론\n\nSpaceX 기술 해자는 5~10년간 복제 불가능. SpaceX 비상장 제약 속 RKLB가 우주 투자의 현실적 대안입니다.",
    category:      "섹터",
    categoryColor: "orange",
    subject:       "🚀 SpaceX·Rocket Lab (우주)",
    date:          "2026-05-13",
    images:        ["https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Falcon_9_first_stage_landing_on_OCISLY_%28cropped%29.jpg/800px-Falcon_9_first_stage_landing_on_OCISLY_%28cropped%29.jpg"],
  },
  {
    id:            "seed-007",
    title:         "테슬라 FSD — 자율주행이 바꾸는 삶, 구독 수익화의 진짜 시작",
    summary:       "팔·다리 없이 태어난 John Z가 테슬라 FSD로 처음 독립적 이동이 가능해졌다는 사연이 화제입니다. 투자자 관점에서는 구독 수익화·라이선싱 모델이 테슬라의 다음 성장 동력임을 보여주는 상징적 사례입니다.",
    body:          "■ FSD 접근성 사례\n\nJohn Z: 팔·다리 없이 태어난 사용자. 테슬라 Model Y + FSD로 처음 완전한 이동의 자유를 얻음.\n\"가속 페달과 브레이크를 밟을 수 없는 나에게 FSD는 삶의 확장이다.\"\n\n■ FSD 구독 모델 현황\n\n• FSD 월정액: $99/월\n• 누적 FSD 활성 사용자: ~60만 명 (2026 Q1 추정)\n• 자율주행 누적 마일리지: 30억 마일+ 돌파\n• 사고율: 일반 운전자 대비 10배 이상 낮음\n\n■ 라이선싱 수익 모델\n\n테슬라가 FSD 기술을 타 제조사에 라이선싱 논의 중.\n• 현대차·GM 등과 협의 보도\n• 계약 1건 = 연간 수억 달러 수익 가능\n• 순수 소프트웨어 라이선싱 기업으로 재평가 시나리오\n\n■ 로봇택시 일정\n\n• Cybercab: 2026년 하반기 텍사스·캘리포니아 상업 서비스 개시 예정\n\n■ 결론\n\nFSD는 접근성·안전성·구독·라이선싱 네 가지 레이어를 가진 복합 사업입니다. 테슬라 밸류에이션에서 FSD 소프트웨어 가치 반영 시점이 다가오고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏎️ 테슬라 (FSD·자율주행)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"],
  },
  {
    id:            "seed-008",
    title:         "애플 AirPods Pro — 카메라 탑재, Siri AI 비서 완전체 전환 시작",
    summary:       "애플이 카메라를 내장한 신형 AirPods 개발에 착수했습니다. 카메라가 Siri에 시각 정보를 제공하고 주변 환경을 인식해 맥락 기반 AI 응답을 제공하게 됩니다. 아이폰 17 슈퍼사이클 기대에 이어 온디바이스 AI 생태계 확장의 핵심 단계입니다.",
    body:          "■ 핵심 내용 (Wall Street Alphas 보도)\n\n애플이 소형 카메라를 탑재한 차세대 AirPods 개발 중. 핵심 기능:\n\n• 카메라로 Siri에 시각 정보 실시간 제공\n• 각 이어버드에 소형 카메라 1개씩 탑재\n• 애플 기존 정책 예외: AirPods 카메라는 사진·영상 촬영 불가\n• 주변 환경 인식 → Siri에 맥락 기반 정보 제공\n• \"냉장고 재료를 보고 레시피를 물어봐\" 같은 작업 가능\n• 캡처 데이터는 클라우드 전송 없이 로컬 처리\n• 단, 착용 감지 시 동작 데이터는 클라우드 전송\n\n■ 출시 미정 — 가격·일정 미발표\n\n■ 투자 시사점\n\n1) 애플 생태계 락인 강화: AirPods→iPhone→Apple Watch 연동 심화\n2) 온디바이스 AI 반도체 수요 추가 증가 → TSMC·SK하이닉스 수혜\n3) 프라이버시 마케팅 강화 — \"클라우드 미전송\" 포지셔닝으로 안드로이드 대비 차별화\n4) 웨어러블 사업부 성장 가속 — 현재 애플 전체 매출의 ~10%\n\n■ 리스크\n\n배터리 소모 증가, 소형화 기술 난이도, 규제(카메라 내장 기기 프라이버시법) 변수.\n\n■ 결론\n\nAirPods에 카메라를 탑재하는 것은 단순 업그레이드가 아닌 일상 AI 비서 플랫폼 진출입니다. 애플(AAPL) 장기 보유 논리를 강화하는 사건입니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🍎 애플 (웨어러블·AI)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80"],
  },
  {
    id:            "seed-009",
    title:         "CLARITY Act — 암호화폐 법제화, 트럼프의 코인 시장 신호",
    summary:       "트럼프가 CLARITY Act 투표 동일주에 비트코인·암호화폐 매수 발언을 했습니다. 같은 날 중국 방문 일정도 겹쳤습니다. 과거 동일 패턴에서 시장이 반응했던 전례를 고려하면, 암호화폐 법제화 통과 시 제도 자금 유입이 본격화할 가능성이 높습니다.",
    body:          "■ CLARITY Act란\n\n미국 의회 암호화폐 규제 법안. 디지털 자산을 증권 또는 상품으로 분류하는 기준을 명확히 하는 법안으로, 업계 최대 현안 중 하나.\n\n■ 트럼프 발언 (Crypto Tice 인용)\n\n\"지금 주식과 암호화폐를 매수하기 시작할 때다.\"\n→ CLARITY Act 투표 당일 발언\n→ 중국 방문 동일주에 나온 발언\n\n\"그가 이런 말을 할 때는 계획이 있다. 저번에도 그랬고 시장이 따라갔다.\"\n\"Don't underestimate the man's words.\"\n\n■ 역사적 패턴\n\n트럼프 가 시장 친화적 발언 → 정책 발표 → 시장 랠리 패턴 2023~2026년 반복.\n대표 사례: 2025년 비트코인 전략적 비축 발표 직전 암호화폐 매수 언급.\n\n■ 법안 통과 시 시장 영향\n\n1) 비트코인: 기관 투자 법적 불확실성 해소 → ETF 추가 자금 유입\n2) 이더리움: \"증권 아님\" 명확화 → DeFi 재활성화\n3) 코인베이스(COIN): 규제 명확화 최대 수혜\n4) 소형 알트코인: 증권 분류 리스크 해소 → 상장 기회 확대\n\n■ 리스크\n\n법안 내용에 따라 일부 알트코인은 증권 분류 → 상장폐지 압력 가능.\n\n■ 결론\n\n트럼프 발언 + CLARITY Act 타이밍은 우연이 아닙니다. 법안 통과 여부와 내용을 집중 모니터링하세요.",
    category:      "매크로",
    categoryColor: "orange",
    subject:       "₿ 암호화폐 (CLARITY Act)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80"],
  },
  {
    id:            "seed-010",
    title:         "Google × SpaceX — 궤도 위성 데이터센터, AI 인프라 패러다임 전환",
    summary:       "구글과 스페이스X가 우주 궤도에 데이터센터를 공동 개발한다는 소식입니다. AI 수요 급증으로 지상 데이터센터 전력과 냉각이 한계에 달한 가운데, 위성 기반 인프라는 무한 태양광·우주 방열이라는 구조적 해결책을 제공합니다.",
    body:          "■ 핵심 소식 (The Kobeissi Letter 인용)\n\n\"Breaking: Google and SpaceX are in talks to launch data centers into orbit amid surging AI demand, per WSJ.\"\n\n■ 왜 우주 데이터센터인가\n\n지상 데이터센터의 2대 제약:\n• 전력: AI 클러스터 1개 = 소도시 연간 전력 소비\n• 냉각: 발열 처리 비용이 전체 운영비 40%+\n\n우주 해결책:\n• 무한 태양광 — 궤도에서 24/7 태양광 포집 가능\n• 우주 방열 — 냉각 시스템 불필요\n• 지연(latency): 저궤도(LEO) 기준 20~40ms로 실용 가능\n\n■ 구글·SpaceX 각자의 이해관계\n\n구글:\n• GCP(구글 클라우드) 용량 확장 필요\n• 스타링크 기반 글로벌 연결성 확보\n• SpaceX 지분 7% 보유로 시너지 직접 수혜\n\nSpaceX:\n• Starlink 수익화 다각화\n• 위성 데이터센터 운영 서비스 = 새 B2B 사업\n• Falcon 9·스타십 발사 수요 자체 창출\n\n■ 투자 접근법\n\n• GOOGL: 직접 수혜, 클라우드 + 우주 + AI 삼중 모멘텀\n• RKLB: 소형 위성 발사 수요 증가 수혜\n• 지상 냉각 인프라주(VERTIV, SMCI): 장기 수요 잠식 리스크\n\n■ 결론\n\n우주 데이터센터는 10년 후 현실이지만 투자 시계는 지금부터입니다. 구글-스페이스X 동맹이 AWS·Azure 대비 차별화 인프라를 구축하는 과정을 주목하세요.",
    category:      "섹터",
    categoryColor: "mint",
    subject:       "🛸 Google·SpaceX (우주·AI인프라)",
    date:          "2026-05-13",
    images:        ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"],
  },
];
