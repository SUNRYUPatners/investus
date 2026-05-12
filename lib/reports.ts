export type ReportCategory = "시장분석" | "종목분석" | "매크로" | "섹터" | "특집";
export type ReportColor    = "mint" | "blue" | "purple" | "orange" | "red";

export type Report = {
  id:            string;
  title:         string;
  summary:       string;   // 2–3줄 미리보기
  body:          string;   // 전체 본문 (줄바꿈 \n 지원)
  category:      ReportCategory;
  categoryColor: ReportColor;
  date:          string;   // "2026-05-13"
  isPinned?:     boolean;
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
    title:         "S&P 500 기술적 분석 — 7,400 저항선 돌파 여부가 관건",
    summary:       "S&P 500이 7,400 포인트 저항선에 근접했습니다. 모멘텀 지표는 과매수 구간에 진입했으나 거래량은 여전히 건조한 상태입니다. 단기적으로 눌림목 이후 재상승 시나리오를 주목할 필요가 있습니다.",
    body:          "■ 기술적 현황\n\nS&P 500은 최근 7,380 수준에서 횡보 중입니다. 200일 이동평균선(6,910)과의 이격은 약 6.8%로 역사적 평균을 소폭 상회합니다.\n\n■ 핵심 저항선\n\n• 7,400 — 단기 저항 (2025년 10월 고점)\n• 7,550 — 피보나치 161.8% 확장 레벨\n• 7,200 — 1차 지지선\n\n■ 전략적 시사점\n\n1) 7,400 돌파 성공 시: 모멘텀 매매 유효, 기술주 중심 비중 확대 고려\n2) 돌파 실패 시: 7,200 지지선까지 단기 조정 가능, 현금 비중 일부 확보 권장\n3) 실적 시즌(7월)이 변수 — 빅테크 가이던스 주목\n\n■ 결론\n\n중기 상승 추세는 유효하나, 단기 과열을 감안한 분할 매수 전략이 적합합니다.",
    category:      "시장분석",
    categoryColor: "mint",
    date:          "2026-05-13",
    isPinned:      true,
  },
  {
    id:            "seed-002",
    title:         "NVIDIA — AI 인프라 사이클, 피크아웃인가 지속인가",
    summary:       "NVIDIA의 데이터센터 매출이 3분기 연속 100% 이상 성장했습니다. 그러나 최근 Blackwell 공급망 병목과 경쟁사(AMD, 인텔 Gaudi)의 추격이 본격화되고 있습니다. 밸류에이션 부담 속 AI 투자 지속 여부가 핵심입니다.",
    body:          "■ 투자 포인트 요약\n\nNVIDIA(NVDA)는 AI 인프라 투자 사이클의 최대 수혜주입니다. 2024 회계연도 데이터센터 매출은 전년 대비 217% 성장했으며, 2025년에도 3자리수 성장이 전망됩니다.\n\n■ 강점\n\n• CUDA 생태계: 10년 이상 구축된 소프트웨어 해자\n• Blackwell GPU: H100 대비 4배 이상 성능\n• NIM(Microservice) 확장으로 엔터프라이즈 AI 선점\n\n■ 리스크\n\n• 중국 수출 규제 지속 (매출 20~25% 영향)\n• 고객 설비투자 사이클 정점 가능성\n• PER 30~35배 — 성장 둔화 시 밸류에이션 부담\n\n■ 목표 주가\n\n강세 시나리오: $1,400 (FY2027 EPS $42 × 34배)\n기본 시나리오: $1,150 (FY2027 EPS $38 × 30배)\n약세 시나리오: $870 (성장률 50% 둔화 가정)\n\n■ 결론\n\n단기 조정 시 분할 매수, 포트폴리오 5~8% 내 비중 유지를 권장합니다.",
    category:      "종목분석",
    categoryColor: "blue",
    date:          "2026-05-10",
  },
  {
    id:            "seed-003",
    title:         "연준 금리 경로 재점검 — 2026년 하반기 인하 가능성 높아져",
    summary:       "4월 CPI가 예상을 하회하며 연준의 금리 인하 기대가 재부상하고 있습니다. CME FedWatch 기준 9월 인하 확률이 68%로 상승했습니다. 다만 고용 시장 강세와 관세 인플레이션 우려가 변수입니다.",
    body:          "■ 매크로 현황\n\n2026년 4월 CPI는 전년 대비 2.9% 상승, 시장 예상치(3.1%)를 하회했습니다. 근원 CPI도 3.2%로 2022년 이후 최저 수준을 기록하며 인플레이션 둔화 추세가 확인되고 있습니다.\n\n■ 연준 금리 경로 시나리오\n\n• 기본 시나리오 (60%): 9월 1회, 12월 1회 → 연말 기준금리 4.50%\n• 강세 시나리오 (25%): 7월 첫 인하, 연 3회 → 연말 4.25%\n• 약세 시나리오 (15%): 연내 동결 → 2027년으로 이연\n\n■ 자산배분 시사점\n\n1) 채권: IEF(7-10년 국채 ETF) 매력도 상승, 듀레이션 확대 고려\n2) 주식: 금리 민감 섹터(유틸리티, 리츠) 단계적 비중 확대\n3) 달러: 금리 인하 전망으로 달러 약세 가능성, 원화 강세 수혜 수출주 주의\n\n■ 결론\n\n인플레이션 둔화 추세는 긍정적이나 관세발 물가 압력이 불확실성 요인입니다. 채권 비중 10~15% 유지를 권장합니다.",
    category:      "매크로",
    categoryColor: "purple",
    date:          "2026-05-08",
  },
];
