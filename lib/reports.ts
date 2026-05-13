export type ReportCategory = "시장분석" | "종목분석" | "매크로" | "섹터" | "특집";
export type ReportColor    = "mint" | "blue" | "purple" | "orange" | "red";

export type Report = {
  id:            string;
  title:         string;
  summary:       string;
  body:          string;
  category:      ReportCategory;
  categoryColor: ReportColor;
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
    date:          "2026-05-13",
    isPinned:      true,
    images:        ["/reports/r5.png"],
  },
  {
    id:            "seed-002",
    title:         "CPI 서프라이즈 — 근원 물가 2.8%, 금리 인하 기대 재점화",
    summary:       "4월 소비자물가지수(CPI)가 시장 예상을 크게 하회했습니다. 근원 CPI +2.8%로 예상치 +3.8% 대비 1%p 하회, 2023년 5월 이후 최저치입니다. 에너지가 전체 상승분의 40% 이상을 차지했으며, 연준 금리 인하 기대가 빠르게 재부상하고 있습니다.",
    body:          "■ 4월 CPI 데이터\n\n• 헤드라인 CPI: 전년 대비 +2.9% (예상 +3.1%)\n• 근원 CPI (식품·에너지 제외): +2.8% (예상 +3.8%) ← 핵심 서프라이즈\n• 에너지: 전체 물가 상승분의 40% 이상 차지\n• 2023년 5월 이후 근원 물가 최저 수준\n\n■ 연준 금리 경로 재조정\n\n• 기본 시나리오: 9월·12월 각 1회 인하 → 연말 4.50%\n• 강세 시나리오: 7월 조기 인하 시작\n• CME FedWatch 9월 인하 확률 급등\n\n■ 자산별 전략\n\n1) 채권: TLT(장기국채 ETF) 매력 상승, 듀레이션 확대 고려\n2) 성장주: 금리 민감도 높은 기술주 밸류에이션 리레이팅 기대\n3) 리츠·유틸리티: 배당 섹터 단계적 비중 확대 시점\n4) 달러: 약세 전환 가능성 — 원/달러 하락 수혜 내수주 주목\n\n■ 주의사항\n\n트럼프 관세발 인플레이션 재반등 리스크 잔존. 2~3개월 추세 확인 후 대응 권장.\n\n■ 결론\n\n근원 CPI 서프라이즈는 올해 가장 긍정적인 매크로 데이터입니다. 채권 비중 확대와 성장주 밸류에이션 리레이팅 기회를 주목하세요.",
    category:      "매크로",
    categoryColor: "purple",
    date:          "2026-05-13",
    images:        ["/reports/r2.png"],
  },
  {
    id:            "seed-003",
    title:         "NVIDIA — 젠슨 황, 삼성·TSMC·마이크론 공급망 동맹 확대 선언",
    summary:       "NVIDIA CEO 젠슨 황이 삼성, TSMC, 마이크론 등 기존 공급망 파트너에 감사를 표하며 '가능한 한 빠르게 확장하겠다'고 밝혔습니다. AI 인프라 수요 폭증에 대응한 생산 능력 확충 의지를 재확인한 발언으로, 한국 반도체 기업 수혜 기대도 높아지고 있습니다.",
    body:          "■ 발언 요지\n\n\"우리는 삼성, TSMC, 마이크론을 비롯한 파트너들에게 매우 감사하다. 가능한 한 빠르게 그들과 함께 확장하고자 한다.\"\n\n■ 공급망 파트너별 분석\n\n• TSMC: Blackwell GPU 파운드리 주요 파트너 — CoWoS 패키징 역량이 핵심\n• 삼성전자: HBM 메모리 및 패키징 협력 확대 기대\n• 마이크론: HBM3E 공급 확대 — SK하이닉스와 경쟁 심화\n\n■ 한국 기업 수혜\n\n• SK하이닉스: HBM3E 독점 공급 유지, 수혜 최대\n• 삼성전자: HBM 퀄 테스트 통과 후 공급 비중 확대 기대\n\n■ NVIDIA 현황\n\n• FY2026 데이터센터 매출 가이던스: $43~45B (+90%+)\n• Blackwell B200 출하 가속화 중\n• GB200 NVL72 랙 시스템 — 대형 클라우드 사전 계약 완료\n\n■ 결론\n\n젠슨 황의 공급망 발언은 AI 인프라 투자 사이클이 2027년까지 지속됨을 시사합니다. NVIDIA 본주와 함께 삼성전자·SK하이닉스·SOXX ETF를 주목하세요.",
    category:      "종목분석",
    categoryColor: "blue",
    date:          "2026-05-13",
    images:        ["/reports/r1.png"],
  },
  {
    id:            "seed-004",
    title:         "Tesla Terrafab × TSMC — 반도체 자립화 전략과 투자 시사점",
    summary:       "테슬라가 자체 반도체 생산 시설 'Terrafab'을 공식 발표했습니다. TSMC는 애리조나 팹에 200억 달러를 추가 투자하며 테슬라·스페이스X의 공식 칩 파트너로 나섭니다. 론 바론은 CNBC에서 스페이스X 투자금이 150억 달러 이상으로 성장했다고 밝혔습니다.",
    body:          "■ Terrafab 핵심 내용\n\n테슬라가 자체 반도체 생산 시설 Terrafab을 발표. 테슬라·스페이스X가 필요한 모든 칩을 자체 공급망으로 충당하는 장기 전략입니다.\n\n■ TSMC 투자 내용\n\n• 애리조나 팹 추가 투자: $20B\n• 미래 팹 추가 배정: $2.5B\n• 테슬라·스페이스X 공식 파트너 예정\n\n■ NVIDIA 플레이북 비교\n\n일론 머스크가 NVIDIA 전략을 그대로 따르는 중:\n1) 배터리 셀 컨소시엄 → 판나소닉·CATL 참여\n2) 자체 AI 칩 (Dojo, HW5) 설계\n3) Terrafab으로 생산 내재화\n\n■ 론 바론 발언 (CNBC Squawk Box)\n\n\"스페이스X 투자금이 현재 $15B 이상으로 성장 (투자원금 $1.7B). 바론 캐피탈 역사적 수익의 1/3($60B)이 일론 머스크 관련 투자에서 창출됐다.\"\n\n■ 테슬라 투자 포인트\n\n• FSD 구독 수익화 가속\n• 로봇택시 2026년 하반기 상업 서비스 예정\n• Terrafab으로 칩 원가 절감 → 마진 개선\n• 에너지 사업부 고성장 지속\n\n■ 결론\n\nTerrafab × TSMC 협력은 테슬라가 AI·에너지·로보틱스 복합 플랫폼으로 재평가받는 전환점입니다.",
    category:      "종목분석",
    categoryColor: "blue",
    date:          "2026-05-13",
    images:        ["/reports/r8.png", "/reports/r9.png"],
  },
  {
    id:            "seed-005",
    title:         "Google × SpaceX × Anthropic — 우주·AI 삼각 동맹의 투자 시사점",
    summary:       "구글이 SpaceX 지분 7%, Anthropic 지분 15%를 보유하며 우주·AI 생태계 허브로 부상하고 있습니다. 두 기업 모두 최근 공개적 협력을 발표했으며, 이 삼각 동맹은 다음 10년 인프라 투자 사이클의 핵심 축입니다.",
    body:          "■ 삼각 동맹 구조\n\n구글 → SpaceX (지분 7%): 저궤도 위성·우주 인프라 접근권\n구글 → Anthropic (지분 15%): Claude AI 모델·기업용 AI 솔루션\nSpaceX → 구글: 스타링크 기반 클라우드 연결성\nAnthropic → 구글: GCP 위에서 모델 학습·서빙\n\n■ 시너지 포인트\n\n• 구글: 우주 인프라 + AI 모델 동시 확보 (아마존 AWS+Kuiper 대항마)\n• SpaceX: 구글 클라우드 데이터 위성 전송 수익화\n• Anthropic: 구글 TPU로 학습 비용 절감 + 엔터프라이즈 판로\n\n■ 최근 발표\n\n• Google-Anthropic: $5B 추가 투자 협약\n• SpaceX-Google: 위성 기반 클라우드 서비스 공동 개발\n• Anthropic: 기업용 Claude 구독 ARR $1B 돌파 예상\n\n■ 투자 접근법\n\nSpaceX·Anthropic은 비상장. 구글(GOOGL)을 통한 간접 투자가 현실적.\n• GOOGL: 클라우드(GCP) + AI + 우주 시너지 수혜\n• 관련 ETF: ARKK, IXN(글로벌 테크)\n\n■ 결론\n\n구글은 단순 광고·검색 회사가 아닌 우주·AI 인프라 플랫폼으로 재평가 시점입니다.",
    category:      "섹터",
    categoryColor: "orange",
    date:          "2026-05-13",
    images:        ["/reports/r3.png"],
  },
  {
    id:            "seed-006",
    title:         "Rocket Lab 주목 — SpaceX 자율기술 해자와 소형 위성 발사 수혜",
    summary:       "SpaceX Falcon 9은 AI 없이 결정론적 알고리즘만으로 400회 이상 자율 귀환에 성공한 세계 유일의 재사용 로켓입니다. 이 기술 해자로 발사 비용이 경쟁사 대비 60~70% 저렴합니다. SpaceX 비상장 제약 속 소형 위성 발사 유일 대안 Rocket Lab(RKLB)이 함께 주목받고 있습니다.",
    body:          "■ Falcon 9 자율 시스템\n\n• 결정론적(deterministic) 제어 알고리즘 — AI 머신러닝 아님\n• 자율 비행 종료 시스템(AFTS): 비정상 비행 즉시 감지·파괴\n• G-부하 센서 기반 엄격한 트리거\n• 드래그 기반 탈궤도 기동: 지상 통제 없이 자율 수행\n• 400회 이상 부스터 귀환 성공\n\n■ 재사용 경제학\n\n• Falcon 9 발사 비용: 약 $6,700만 (경쟁사 대비 60~70% 저렴)\n• 부스터 1개당 최대 20회+ 재사용\n• 스타링크 배치 비용: 타사 대비 1/10 수준\n\n■ Rocket Lab (RKLB)\n\n• Electron 로켓: 소형 위성 전용, 100kg 이하 탑재\n• Neutron 로켓 개발 중: 중형급 시장 진입 예정\n• 우주 부품 사업(Space Systems) 고성장 중\n• 최근 기관 매수세 확인\n\n■ 결론\n\nSpaceX 기술 해자는 5~10년간 복제 불가능. SpaceX 비상장 제약 속 RKLB가 우주 투자의 현실적 대안입니다.",
    category:      "섹터",
    categoryColor: "orange",
    date:          "2026-05-13",
    images:        ["/reports/r7.png", "/reports/r4.png"],
  },
  {
    id:            "seed-007",
    title:         "테슬라 FSD — 자율주행이 바꾸는 삶, 구독 수익화의 진짜 시작",
    summary:       "팔·다리 없이 태어난 John Z가 테슬라 FSD로 처음 독립적 이동이 가능해졌다는 사연이 화제입니다. 투자자 관점에서는 구독 수익화·라이선싱 모델이 테슬라의 다음 성장 동력임을 보여주는 상징적 사례입니다.",
    body:          "■ FSD 접근성 사례\n\nJohn Z: 팔·다리 없이 태어난 사용자. 테슬라 Model Y + FSD로 처음 완전한 이동의 자유를 얻음.\n\"가속 페달과 브레이크를 밟을 수 없는 나에게 FSD는 삶의 확장이다.\"\n\n■ FSD 구독 모델 현황\n\n• FSD 월정액: $99/월\n• 누적 FSD 활성 사용자: ~60만 명 (2026 Q1 추정)\n• 자율주행 누적 마일리지: 30억 마일+ 돌파\n• 사고율: 일반 운전자 대비 10배 이상 낮음\n\n■ 라이선싱 수익 모델\n\n테슬라가 FSD 기술을 타 제조사에 라이선싱 논의 중.\n• 현대차·GM 등과 협의 보도\n• 계약 1건 = 연간 수억 달러 수익 가능\n• 순수 소프트웨어 라이선싱 기업으로 재평가 시나리오\n\n■ 로봇택시 일정\n\n• Cybercab: 2026년 하반기 텍사스·캘리포니아 상업 서비스 개시 예정\n\n■ 결론\n\nFSD는 접근성·안전성·구독·라이선싱 네 가지 레이어를 가진 복합 사업입니다. 테슬라 밸류에이션에서 FSD 소프트웨어 가치 반영 시점이 다가오고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    date:          "2026-05-13",
    images:        ["/reports/r6.png"],
  },
];
