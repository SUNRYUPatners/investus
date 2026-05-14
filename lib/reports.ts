export type ReportCategory = "시장분석" | "종목분석" | "매크로" | "섹터" | "특집";
export type ReportColor    = "mint" | "blue" | "purple" | "orange" | "red";

export type Report = {
  id:            string;
  title:         string;
  summary:       string;
  body:          string;
  category:      ReportCategory;
  categoryColor: ReportColor;
  subject?:      string;
  date:          string;
  updatedAt?:    string;   // "2026.05.14 07:27" KST 형식
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

  // ══════════════════════════════════════════════════════════════════════════
  // 2026-05-14 리포트
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:            "seed-013",
    title:         "케빈 워시 연준의장 확정 — 파월 교체, 금리 경로 급변 시그널",
    summary:       "미 상원이 트럼프 지명 연준의장 후보 케빈 워시(Kevin Warsh)를 51표로 인준 확정했습니다. 파월 의장 임기 종료 후 워시가 뒤를 잇습니다. 워시는 상대적 매파로 분류돼 시장의 금리 인하 기대가 재조정될 수 있습니다.",
    body:          "■ 핵심 사실\n\n미 상원 51표 찬성으로 케빈 워시 연준의장 인준 확정. 현직 제롬 파월 의장 임기 종료 후 승계.\n\n■ 케빈 워시는 누구인가\n\n• 전 연준 이사 (2006~2011)\n• 금융위기 당시 연준 내 최연소 이사 역임\n• 월가(모건스탠리) 출신 → 시장 친화적 언어 구사\n• 그러나 인플레 억제 우선 성향 — 조기 금리 인하에 신중\n• 트럼프와 긴밀한 관계 — 규제 완화 기조 공유\n\n■ 시장 영향\n\n1) 단기 금리 인하 기대 재조정 — 워시 취임 초 긴축 유지 가능성\n2) 달러 강세 지속 압력 — 원/달러 상단 열려있음\n3) 성장주 밸류에이션 압박 재발 가능\n4) 금·실물자산: 인플레 장기화 헤지 수요 유지\n\n■ 파월 레거시\n\n파월은 코로나 제로금리 → 40년만 최고 인플레 → 공격적 긴축 → 연착륙 달성이라는 사이클을 마무리. 워시는 물가 2% 복귀 완성이라는 숙제를 떠안습니다.\n\n■ 결론\n\n워시 취임으로 연준 독립성 논란은 일단락되나, 금리 인하 기대를 앞당기는 전략은 재점검이 필요합니다. TLT·장기채 비중을 신중히 조절하세요.",
    category:      "매크로",
    categoryColor: "red",
    subject:       "🏛️ 연준 (Fed·금리)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    isPinned:      true,
    images:        ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"],
  },

  {
    id:            "seed-014",
    title:         "Ron Baron — \"테슬라 10년 내 $2,500, 시총 $8.3조\" CNBC 직격 발언",
    summary:       "전설적 성장주 투자자 Ron Baron이 CNBC Squawk Box에서 \"지금은 테슬라를 살 때\"라고 선언했습니다. 향후 10년 내 주가 $2,000~$2,500을 전망하며, $2,500 달성 시 테슬라 시총은 약 $8.3조로 현재 대비 5.7배 성장한다고 밝혔습니다.",
    body:          "■ Ron Baron 발언 원문 (CNBC Squawk Box)\n\n\"Now is the time for Tesla. I think it's (the stock) going to be $2,000 or $2,500 over the next 10 years.\"\n\"At $2,500, that would make Tesla a roughly $8.3 trillion company, 5.7x higher than today.\"\n\n■ Ron Baron은 누구인가\n\n• Baron Capital 창업자·CEO — AUM $45B+\n• 테슬라 초기 주주: 투자원금 $1.7B → 현재 평가액 $15B+\n• Baron Capital 역사적 수익의 1/3($60B)이 일론 머스크 관련 투자에서 창출\n• SpaceX 지분도 보유 — 우주·AI 복합 베팅\n\n■ $2,500 시나리오의 근거\n\n1) FSD 구독·라이선싱 수익: 순수 소프트웨어 기업 수준 마진\n2) Cybercab 로봇택시: 2026년 하반기 텍사스·캘리포니아 상업 서비스\n3) 에너지 사업부: Megapack 수주 폭증, 고성장 지속\n4) Terrafab 칩 자립: 원가 절감 → 마진 개선\n5) Optimus 로봇: 2027~2028년 양산 → 새 수익원\n\n■ 테슬라 경찰 차량 전환 모멘텀\n\n미국 전역 다수의 경찰서가 가솔린 차량에서 테슬라 Cybertruck 전환 완료.\n• 테슬라 자체 계산기 기준: 대당 $2,100 절감\n• 전기차 유지비 $0.0587/마일 vs 가솔린 $0.2555/마일\n• 정부 조달 수요 → 안정적 B2B 매출 기반\n\n■ 리스크\n\n트럼프-머스크 관계 변화, FSD 규제 리스크, 중국 경쟁 심화, 금리 장기화 밸류에이션 압박.\n\n■ 결론\n\nRon Baron의 $2,500 콜은 FSD·로봇택시·에너지·로봇 4가지 성장 축을 바탕으로 합니다. 테슬라를 단순 전기차 기업이 아닌 AI+에너지+로보틱스 플랫폼으로 바라보는 프레임이 점차 주류가 되고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏎️ 테슬라 (Ron Baron·밸류에이션)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:27",
    isPinned:      true,
    images:        ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"],
  },

  {
    id:            "seed-015",
    title:         "S&P 500 신고가 — 실적·광학통신·AI칩 수요 3중 모멘텀, 이란 리스크 병존",
    summary:       "S&P 500과 QQQ가 신고가를 경신했습니다. 이번 주 S&P 500 +0.96%, 시총 $350B 추가. 실적 시즌 74% EPS 상회, Cerebras IPO 가격 상향, Circle $694M 분기 매출. 단 US-이란 긴장·호르무즈 해협 리스크와 내일 발표될 CPI +3.7% 전망이 변수입니다.",
    body:          "■ 주간 시장 요약\n\n• S&P 500: 신고가 경신, 주간 +0.96%\n• QQQ: 동반 신고가 마감\n• 시총 증가: $350B (주간 기준)\n• 4월 26일 이후 지속 ATH 행진 (2019년 7월 이후 최장)\n\n■ 섹터별 동향\n\n1) 광학 네트워킹: LSCC(래티스 반도체), LITE(Lumentum), COHR(Coherent) AI 데이터센터 연결 테마로 급등\n2) AI 칩: Cerebras IPO 가격 범위 상향 — $80→$130/주 (AI 칩 수요 과열 신호)\n3) 스테이블코인: Circle(CRCL) 분기 매출 $694M +20% YoY — DeFi·스테이블코인 수요 강세\n\n■ 실적 시즌 현황\n\n• S&P 500 440개+ 기업 실적 완료\n• EPS 상회 비율: ~74% (역사적 평균 65% 상회)\n• 매출 성장률: 전년 대비 +5~7% 유지\n• Hims & Hers(HIMS): Q1 매출 $608M, 조정 EBITDA $62.3M, GLP-1 수요 견인\n\n■ 리스크 — US-이란 + CPI\n\n• 미국-이란 협상 미타결 → 호르무즈 해협 봉쇄 리스크 상존\n• CPI 발표 예정: +3.7% 전망 (2025년 1월 이후 최고)\n• 인플레 재상승 시 금리 인하 기대 추가 후퇴\n\n■ 결론\n\n실적·기술 모멘텀 강하나, CPI+이란 리스크가 단기 변수. 광학통신·AI칩 비중 점검하고 CPI 발표 전후 변동성에 대비하세요.",
    category:      "시장분석",
    categoryColor: "mint",
    subject:       "📊 S&P500 (ATH·실적시즌)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    images:        ["https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&q=80"],
  },

  {
    id:            "seed-016",
    title:         "Meta AI — '가장 오해받는 메가캡', ARK의 역발상 분석",
    summary:       "ARK Investor Tracker가 Meta를 '가장 오해받는 메가캡(THE MOST MISUNDERSTOOD MEGACAP)'으로 지목했습니다. Meta의 $8B AI 광고 투자가 플랫폼 성장을 가속하는 반면, 러시아·이란 퇴출·규제 리스크에 가려 시장이 본질 가치를 저평가하고 있다는 분석입니다.",
    body:          "■ ARK 핵심 주장\n\n\"Meta: THE MOST MISUNDERSTOOD MEGACAP\"\nMeta가 AI 광고 플랫폼으로 변모하는 과정을 시장이 제대로 반영하지 못하고 있음.\n\n■ Meta AI 투자 현황\n\n• AI 광고 예산: $8B 투자 — 타겟팅 정밀도 혁신\n• AI Advantage+: 광고주 캠페인 자동화로 ROI 2배 개선\n• Ray-Ban 스마트 안경: AI 기반 웨어러블 시장 선점\n• Meta AI(LLaMA): 오픈소스 전략 → 개발자 생태계 확장\n• Threads: X(트위터) 대안으로 성장 가속\n\n■ '오해받는' 이유\n\n• 러시아: WhatsApp 차단 → 글로벌 사용자 이탈 우려\n• 이란·일부 국가: 플랫폼 접근 제한\n• 메타버스 투자 손실 트라우마 지속\n• 단, 이 모든 지역 제외해도 Meta 성장세 유지\n\n■ 경쟁 구도\n\n• 주요 경쟁자: Amazon(광고), Google(검색광고), Microsoft(기업 AI)\n• Meta의 차별점: 30억+ 소셜 그래프 기반 최고 정밀 광고\n• AI 추천 알고리즘이 평균 체류시간 +5~8% 증가\n\n■ 재무 지표\n\n• 시총: $1.4T+ (빅테크 중 밸류에이션 저렴한 편)\n• 광고 매출 성장률: +20%+ YoY\n• FCF: $50B+/년 → 자사주 매입 + AI 투자 동시 가능\n\n■ 결론\n\nARK의 역발상은 타당합니다. AI 광고 + 웨어러블 + 오픈소스 LLM 세 가지 축에서 Meta는 조용히 최강의 생태계를 구축 중입니다. META 주식은 빅테크 중 AI 전환 가장 빠른 기업 중 하나입니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "📘 Meta (AI·광고플랫폼)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    images:        ["https://images.unsplash.com/photo-1679300082344-6f2b3a33d2d2?w=800&q=80"],
  },

  {
    id:            "seed-017",
    title:         "젠슨 황의 AI 역설 — \"방사선 전문의가 3000만 명 늘었다\"",
    summary:       "NVIDIA CEO 젠슨 황이 밝힌 AI 역설: 5년 전 'AI가 방사선 전문의를 대체한다'는 예측이 있었지만 오히려 방사선 전문의 수요가 폭증했습니다. AI는 인간 판단력의 수요를 배가시켰습니다. 이 통찰은 AI 투자에 새로운 프레임을 제시합니다.",
    body:          "■ 젠슨 황 발언 원문\n\n\"In five years, the world won't need any radiologists, because AI will be able to do it better at a fraction of the cost.\"\n\n그러나 실제 결과는:\n\"The number of radiologists has actually grown.\"\n\"The prediction was in fact that 30 million radiologists would be wiped out because of AI. But it's because the purpose of a radiologist is to provide accurate medical image analysis, and AI is augmenting those skills rather than replacing them.\"\n\n\"AI multiplies the demand for real human judgment.\"\n\n■ 왜 이런 일이 벌어졌나\n\n1) AI는 진단 속도·정확도를 높임 → 더 많은 환자 처리 가능\n2) 더 많은 환자 처리 → 방사선 전문의 수요 증가\n3) AI로 발견 가능한 질병 종류 확대 → 영상의학 시장 자체가 커짐\n4) AI 도구를 다룰 수 있는 의료 AI 전문가 수요 신규 창출\n\n■ 투자 시사점 — AI는 대체가 아닌 배가\n\n이 역설은 여러 산업에 적용됩니다:\n\n• 교육: AI 튜터 등장 → 교육자 수요 오히려 증가\n• 법률: AI 법률 검색 → 법무 전문가 업무 범위 확대\n• 금융: AI 퀀트 → 데이터 해석할 금융 전문가 수요 증가\n• 소프트웨어: AI 코딩 도구 → 개발자 생산성 10배 → 더 많은 개발 수요\n\n■ ARK Invest × Kaishi\n\nARK가 AI 이벤트·확률 분석 스타트업 'Kaishi'에 투자. \"AI가 만드는 새로운 투자 기회를 발굴하는 플랫폼\" — 이 역설을 활용한 사업 모델.\n\n■ NVIDIA 수혜 구조\n\n• AI 도구 확산 → 더 많은 인간 전문가 필요 → 더 많은 AI 컴퓨팅 필요 → NVIDIA 수요 무한 사이클\n• 의료 AI: GE Healthcare·Philips·Siemens NVIDIA GPU 도입 가속\n\n■ 결론\n\n\"AI가 인간을 대체한다\"는 단순 공포 논리에서 벗어나, \"AI가 인간의 역할을 얼마나 배가시키는가\"로 투자 시각을 전환해야 합니다. NVIDIA는 이 배가 효과의 핵심 인프라입니다.",
    category:      "특집",
    categoryColor: "purple",
    subject:       "🤖 AI 패러다임 (젠슨 황)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:25",
    images:        ["https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"],
  },

  {
    id:            "seed-018",
    title:         "광학통신 폭발 — LITE·COHR·LSCC AI 데이터센터 수혜 랠리",
    summary:       "AI 데이터센터 연결 인프라 테마로 광학통신 섹터가 폭발적 모멘텀을 보이고 있습니다. Lumentum(LITE), Coherent(COHR), Lattice Semiconductor(LSCC)가 급등 중입니다. 광트랜시버·레이저·파이버 스위치 수요가 AI 클러스터 간 연결 병목을 해소하는 핵심 솔루션으로 부상했습니다.",
    body:          "■ 왜 지금 광학통신인가\n\nAI 클러스터(GPU 수천 대)에서는 GPU 간 통신 대역폭이 연산 속도만큼 중요합니다.\n• 기존 구리 케이블: 고속·장거리 전송 시 열 발생·신호 저하\n• 광통신(Optical): 빛으로 데이터 전송 → 저지연·고대역폭·저발열\n• GB200 NVL72 같은 대형 GPU 랙에서 광트랜시버가 필수 부품으로 자리잡음\n\n■ 섹터 내 핵심 종목\n\n• LITE (Lumentum Holdings):\n  - AI 데이터센터 광트랜시버, 레이저 광원 공급\n  - 마이크로소프트·구글·아마존 데이터센터 공급망 진입\n  - 최근 AI 인프라 테마 편입으로 랠리\n\n• COHR (Coherent Corp.):\n  - 광통신 전체 스택 (트랜시버·파이버·레이저·스위치)\n  - AI 칩 간 interconnect 핵심 공급업체\n  - 400G~800G 광트랜시버 시장 성장 직접 수혜\n\n• LSCC (Lattice Semiconductor):\n  - AI 데이터센터 연결성 테마에 새롭게 편입\n  - 저전력 FPGA — 광통신 제어 로직에 활용\n  - 엔터프라이즈 네트워킹 AI 전환 수혜\n\n■ 시장 규모\n\n• 글로벌 광트랜시버 시장: 2025년 $18B → 2028년 $42B (연평균 +32%)\n• AI 클러스터 1개(GB200 NVL72 랙 100대): 광트랜시버 8,000개+ 필요\n• NVIDIA Blackwell + GB300 확산으로 2026~2027년 수요 폭증 확실시\n\n■ 투자 전략\n\n• 직접 투자: LITE, COHR, LSCC 개별 매수\n• ETF: IGN(iShares 네트워킹 ETF), CIBR(사이버+통신)\n• 주의: 반도체 RSI 과매수 구간 — 분할 매수 권장\n\n■ 결론\n\n광학통신은 AI 인프라의 \"조용한 실력자\"입니다. GPU 수요가 꺾이지 않는 한 광통신 수요도 꺾이지 않습니다. AI 인프라 투자 포트폴리오에 광통신 섹터 비중을 점검하세요.",
    category:      "섹터",
    categoryColor: "mint",
    subject:       "🔆 광학통신 (LITE·COHR·LSCC)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    images:        ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"],
  },

  {
    id:            "seed-019",
    title:         "Jefferies 경고 — 반도체 47% 미스 전망, SOXX RSI 81 과매수 구간",
    summary:       "Jefferies가 반도체·하드웨어 종목의 47%가 다음 실적 시즌에서 예상치를 하회할 것으로 전망했습니다. SOXX ETF는 RSI 81.1로 2019년 7월 이후 최고 과매수 수준. 랠리 속 숨겨진 리스크를 점검합니다.",
    body:          "■ Jefferies 리포트 핵심\n\n\"47% of semis/hardware stocks set to miss earnings estimates.\"\n\n• SOXX(반도체 ETF) RSI: 81.1 — 2019년 7월 이후 최고치\n• 현재 RSI 수준은 5년 평균 대비 유의미하게 높음\n• ATH 이후 과매수 신호가 잇따라 발생 중\n\n■ 과매수 경고의 근거\n\n1) 밸류에이션 스트레치: AI 기대감으로 선행 PER 60~80배\n2) 수요 집중: NVDA·AMD 상위 2개사에 수요 집중 → 롱테일 종목 미스 위험\n3) 재고 사이클: 비AI 반도체(PC·스마트폰·자동차용) 재고 정상화 지연\n4) 관세 불확실성: 반도체 공급망 재편 비용 아직 미반영\n\n■ 취약 세그먼트\n\n• PC·모바일 반도체: 수요 회복 지연\n• 차량용 반도체: EV 판매 둔화\n• 메모리 DRAM(HBM 제외): 공급 과잉 우려\n• 소형 반도체 장비업체: 대형 TSMC 투자 축소 시 영향\n\n■ 강세 유지 세그먼트\n\n• AI 가속기: NVDA Blackwell, AMD MI300X — 수요 무한정\n• HBM 메모리: SK하이닉스 공급 부족 지속\n• 광통신 반도체: LITE, COHR, LSCC\n\n■ 투자 전략\n\n• SOXX 비중 과대 포트폴리오: 단기 차익 실현 고려\n• 보유 시: AI 직접 수혜 종목(NVDA, AVGO, AMAT)으로 집중\n• 주의 종목: RSI 70+ + 비AI 매출 비중 높은 반도체\n\n■ 결론\n\n반도체 랠리 전체가 끝난 것은 아닙니다. 단, AI 직접 수혜 → 광통신 → AI 장비로 이어지는 공급망 상위 종목과 낙수 효과를 기대하는 하위 종목 간 양극화가 심화될 것입니다. 종목 선별이 그 어느 때보다 중요합니다.",
    category:      "섹터",
    categoryColor: "red",
    subject:       "⚠️ 반도체 (SOXX 과매수·Jefferies)",
    date:          "2026-05-14",
    updatedAt:     "2026.05.14 07:26",
    isPinned:      false,
    images:        ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80"],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2026-05-13 리포트 (기존)
  // ══════════════════════════════════════════════════════════════════════════

  {
    id:            "seed-001",
    title:         "트럼프 방중 — 머스크·젠슨황만 에어포스원 탑승, $1조 투자 딜 임박",
    summary:       "트럼프 대통령의 중국 방문에서 일론 머스크(테슬라)·젠슨 황(NVIDIA)이 에어포스원 탑승 유일한 CEO로 확인됐습니다. 현지에서 미중 간 '역대급 경제 합의' 발표 임박 신호가 나오고 있으며, 중국 측 $1조 대미 투자 등 관세 완화 패키지 협상 중이라는 보도가 나왔습니다.",
    body:          "■ 에어포스원 탑승 CEO (2명만 확인)\n\n• 일론 머스크 (테슬라·스페이스X)\n• 젠슨 황 (NVIDIA)\n→ AI 반도체·전기차가 협상 핵심 어젠다임을 시사\n\n■ 전체 CEO 방중 대표단\n\n• 팀 쿡 (Apple) — $3.2T\n• 제이미 다이먼 (JPMorgan) — $765B\n• 마크 저커버그 (Meta) — $863B\n• 래리 핑크 (BlackRock)\n• 스티븐 슈워츠먼 (Blackstone)\n• 데이비드 솔로몬 (Goldman Sachs)\n• 60명+ CEO 동행 → 단순 외교 방문 아닌 '역대급 딜' 신호\n\n■ 시장이 주목하는 합의 항목\n\n• 새로운 미중 경제 협정 체결\n• 중국의 대미 투자 $1조+ 약속\n• 관세 완화 패키지 (트럼프 145% → 협상 타결 시 인하)\n• 농산물·에너지 구매 확대\n• 지정학 리스크 완화 (대만 긴장 일부 해소)\n\n■ 종목별 시사점\n\n1) TSLA: 중국 FSD 규제 완화 협의 → 중국 매출 반등 기대\n2) NVDA: H20 이상급 대중 수출 허가 완화 가능성 주목\n3) AAPL: 중국 AI 기능 개방 협의, 아이폰 판매 회복 기대\n4) 농산물·LNG: 중국 대규모 구매 합의 시 ADM·LNG 종목 수혜\n\n■ 리스크\n\n• 협상 결과 발표 일정 미확정\n• 외교적 쇼에 그칠 경우 기대감 실망 매도\n• 의회 비준 필요한 항목은 시간 소요\n\n■ 결론\n\n\"There was a reason 60 CEOs went on this trip and that is a MAJOR trade deal.\" — Per Jefferies. 60명 CEO 방중은 역대급 딜의 증거입니다. AI 반도체·전기차·에너지 모두 촉매 역할을 할 수 있습니다.",
    category:      "매크로",
    categoryColor: "purple",
    subject:       "🇺🇸 트럼프 방중 (미중무역)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.14 07:26",
    isPinned:      true,
    images:        ["https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80"],
  },
  {
    id:            "seed-002",
    title:         "4월 CPI 쇼크 — 헤드라인 +3.8% 예상 상회, 금리 인하 시계 후퇴",
    summary:       "4월 소비자물가지수(CPI)가 예상을 상회했습니다. 헤드라인 CPI +3.8%(예상 +3.6%), 근원 CPI +2.8%(예상 +2.6%) — 2023년 5월 이후 최고 헤드라인, 2025년 9월 이후 최고 근원 수치입니다.",
    body:          "■ 4월 CPI 실제 데이터\n\n• 헤드라인 CPI: +3.8% (예상 +3.6%) → 예상 상회 ⚠️\n• 근원 CPI (식품·에너지 제외): +2.8% (예상 +2.6%) → 예상 상회 ⚠️\n• 에너지: 전체 물가 상승분의 40% 이상 차지\n\n■ 연준(Fed) 금리 경로 재조정\n\n• 기존 시장 기대(7·9월 인하) → 후퇴\n• CME FedWatch 연내 인하 확률 급감\n• 연준 \"데이터 의존\" 기조 유지\n\n■ 자산별 대응 전략\n\n1) 채권: 장기물 TLT 단기 역풍, 단기물(SHY·BIL) 선호\n2) 성장주: 밸류에이션 압박 — 금리 민감 성장주 주의\n3) 에너지주: 물가 상승 수혜 — XLE, OXY 주목\n4) 달러: 강세 유지 가능성\n\n■ 결론\n\n에너지·원자재 비중을 점검하고, 금리 인하 기대보다는 인플레 지속 가능성을 열어두세요.",
    category:      "매크로",
    categoryColor: "purple",
    subject:       "📈 CPI (인플레·금리)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"],
  },
  {
    id:            "seed-003",
    title:         "NVIDIA — 젠슨 황, 삼성·TSMC·마이크론 공급망 동맹 확대 선언",
    summary:       "NVIDIA CEO 젠슨 황이 삼성, TSMC, 마이크론 등 공급망 파트너에 감사를 표하며 '가능한 한 빠르게 확장하겠다'고 밝혔습니다. AI 인프라 수요 폭증에 대응한 생산 능력 확충 의지를 재확인했습니다.",
    body:          "■ 발언 요지\n\n\"우리는 삼성, TSMC, 마이크론을 비롯한 파트너들에게 매우 감사하다. 가능한 한 빠르게 그들과 함께 확장하고자 한다.\"\n\n■ 공급망 파트너별 분석\n\n• TSMC: Blackwell GPU CoWoS 패키징 핵심 파트너\n• 삼성전자: HBM 메모리 및 패키징 협력 확대 기대\n• 마이크론: HBM3E 공급 확대 — SK하이닉스와 경쟁\n\n■ 한국 기업 수혜\n\n• SK하이닉스: HBM3E 독점 공급 유지, 수혜 최대\n• 삼성전자: HBM 퀄 테스트 통과 후 비중 확대 기대\n\n■ 결론\n\nAI 인프라 투자 사이클 2027년까지 지속. NVIDIA + 삼성전자·SK하이닉스·SOXX ETF 주목.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🟢 NVIDIA (AI반도체)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80"],
  },
  {
    id:            "seed-004",
    title:         "Tesla Terrafab × TSMC — 반도체 자립화 전략과 투자 시사점",
    summary:       "테슬라가 자체 반도체 생산 시설 'Terrafab'을 공식 발표했습니다. TSMC는 애리조나 팹에 $20B를 추가 투자하며 테슬라·스페이스X의 공식 칩 파트너로 나섭니다.",
    body:          "■ Terrafab 핵심 내용\n\n테슬라·스페이스X 필요 칩을 자체 공급망으로 충당하는 장기 전략.\n\n■ TSMC 투자 내용\n\n• 애리조나 팹 추가 투자: $20B\n• 미래 팹 추가 배정: $2.5B\n• 테슬라·스페이스X 공식 파트너 예정\n\n■ NVIDIA 플레이북 비교\n\n머스크가 NVIDIA 전략을 그대로 따르는 중:\n1) 배터리 셀 컨소시엄 → 자체 셀 생산\n2) 자체 AI 칩 (Dojo, HW5) 설계\n3) Terrafab으로 생산 내재화\n\n■ 결론\n\nTerrafab × TSMC 협력은 테슬라가 AI·에너지·로보틱스 복합 플랫폼으로 재평가받는 전환점입니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏎️ 테슬라 (AI·반도체)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80"],
  },
  {
    id:            "seed-005",
    title:         "Google × SpaceX × Anthropic — 우주·AI 삼각 동맹의 투자 시사점",
    summary:       "구글이 SpaceX 지분 7%, Anthropic 지분 15%를 보유하며 우주·AI 생태계 허브로 부상. 이 삼각 동맹은 다음 10년 인프라 투자 사이클의 핵심 축입니다.",
    body:          "■ 삼각 동맹 구조\n\n구글 → SpaceX (지분 7%): 저궤도 위성·우주 인프라\n구글 → Anthropic (지분 15%): Claude AI·기업용 AI 솔루션\nSpaceX → 구글: 스타링크 기반 클라우드 연결성\n\n■ 시너지 포인트\n\n• 구글: 우주 인프라 + AI 모델 동시 확보\n• SpaceX: 구글 클라우드 데이터 위성 전송 수익화\n• Anthropic: 구글 TPU 학습 비용 절감 + 엔터프라이즈 판로\n\n■ 투자 접근법\n\nSpaceX·Anthropic은 비상장. GOOGL을 통한 간접 투자.\n• GOOGL: 클라우드(GCP) + AI + 우주 시너지 수혜\n\n■ 결론\n\n구글은 광고·검색을 넘어 우주·AI 인프라 플랫폼으로 재평가 시점입니다.",
    category:      "섹터",
    categoryColor: "orange",
    subject:       "🌐 구글·SpaceX·Anthropic (우주·AI)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"],
  },
  {
    id:            "seed-006",
    title:         "Rocket Lab 주목 — SpaceX 자율기술 해자와 소형 위성 발사 수혜",
    summary:       "SpaceX Falcon 9은 결정론적 알고리즘으로 400회+ 자율 귀환 성공. 발사 비용 경쟁사 대비 60~70% 저렴. SpaceX 비상장 제약 속 소형 위성 발사 대안 RKLB 주목.",
    body:          "■ Falcon 9 자율 시스템\n\n• 결정론적(deterministic) 알고리즘 — AI 머신러닝 아님\n• 400회 이상 부스터 귀환 성공\n• Falcon 9 발사 비용: ~$6,700만 (경쟁사 대비 60~70% 저렴)\n\n■ Rocket Lab (RKLB)\n\n• Electron 로켓: 소형 위성 전용, 100kg 이하 탑재\n• Neutron 로켓: 중형급 시장 진입 개발 중\n• 우주 부품 사업(Space Systems) 고성장 중\n\n■ 결론\n\nSpaceX 기술 해자는 5~10년간 복제 불가. 비상장 제약 속 RKLB가 우주 투자의 현실적 대안입니다.",
    category:      "섹터",
    categoryColor: "orange",
    subject:       "🚀 SpaceX·Rocket Lab (우주)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80"],
  },
  {
    id:            "seed-007",
    title:         "테슬라 FSD — 자율주행이 바꾸는 삶, 구독 수익화의 진짜 시작",
    summary:       "팔·다리 없이 태어난 John Z가 테슬라 FSD로 처음 독립적 이동이 가능해졌습니다. 구독 수익화·라이선싱 모델이 테슬라의 다음 성장 동력임을 보여주는 상징적 사례입니다.",
    body:          "■ FSD 접근성 사례\n\nJohn Z: 팔·다리 없이 태어난 사용자. 테슬라 Model Y + FSD로 처음 완전한 이동의 자유.\n\"가속 페달을 밟을 수 없는 나에게 FSD는 삶의 확장이다.\"\n\n■ FSD 구독 모델 현황\n\n• FSD 월정액: $99/월\n• 누적 활성 사용자: ~60만 명 (2026 Q1)\n• 자율주행 누적 마일리지: 30억 마일+ 돌파\n\n■ 라이선싱 수익 모델\n\n• 현대차·GM 등과 협의 보도\n• 계약 1건 = 연간 수억 달러 수익 가능\n\n■ 결론\n\nFSD는 구독·라이선싱 네 가지 레이어를 가진 복합 사업. 테슬라 밸류에이션에서 FSD 소프트웨어 가치 반영 시점이 다가오고 있습니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🏎️ 테슬라 (FSD·자율주행)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"],
  },
  {
    id:            "seed-008",
    title:         "애플 AirPods Pro — 카메라 탑재, Siri AI 비서 완전체 전환 시작",
    summary:       "애플이 카메라를 내장한 신형 AirPods 개발에 착수했습니다. 카메라가 Siri에 시각 정보를 제공하고 주변 환경을 인식해 맥락 기반 AI 응답을 제공하게 됩니다.",
    body:          "■ 핵심 내용\n\n• 각 이어버드에 소형 카메라 탑재\n• 카메라로 Siri에 시각 정보 실시간 제공\n• 사진·영상 촬영은 불가 — AI 맥락 인식 전용\n• 캡처 데이터는 로컬 처리 (프라이버시)\n\n■ 투자 시사점\n\n1) 애플 생태계 락인 강화\n2) 온디바이스 AI 반도체 수요 증가 → TSMC·SK하이닉스 수혜\n3) 웨어러블 사업부 성장 가속 — 애플 전체 매출의 ~10%\n\n■ 결론\n\nAirPods 카메라 탑재는 단순 업그레이드가 아닌 일상 AI 비서 플랫폼 진출. AAPL 장기 보유 논리를 강화합니다.",
    category:      "종목분석",
    categoryColor: "blue",
    subject:       "🍎 애플 (웨어러블·AI)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&q=80"],
  },
  {
    id:            "seed-009",
    title:         "CLARITY Act — 암호화폐 법제화, 트럼프의 코인 시장 신호",
    summary:       "트럼프가 CLARITY Act 투표 동일주에 비트코인·암호화폐 매수 발언을 했습니다. 과거 동일 패턴에서 시장이 반응했던 전례를 고려하면 법안 통과 시 제도 자금 유입이 본격화할 가능성이 높습니다.",
    body:          "■ CLARITY Act란\n\n디지털 자산을 증권 또는 상품으로 분류하는 기준을 명확히 하는 법안.\n\n■ 트럼프 발언\n\n\"지금 주식과 암호화폐를 매수하기 시작할 때다.\" — CLARITY Act 투표 당일\n\"Don't underestimate the man's words.\"\n\n■ 법안 통과 시 시장 영향\n\n1) 비트코인: 기관 투자 불확실성 해소 → ETF 추가 자금 유입\n2) 이더리움: \"증권 아님\" 명확화 → DeFi 재활성화\n3) 코인베이스(COIN): 규제 명확화 최대 수혜\n\n■ 결론\n\n트럼프 발언 + CLARITY Act 타이밍은 우연이 아닙니다. 법안 통과 여부를 집중 모니터링하세요.",
    category:      "매크로",
    categoryColor: "orange",
    subject:       "₿ 암호화폐 (CLARITY Act)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80"],
  },
  {
    id:            "seed-010",
    title:         "Google × SpaceX — 궤도 위성 데이터센터, AI 인프라 패러다임 전환",
    summary:       "구글과 스페이스X가 우주 궤도에 데이터센터를 공동 개발합니다. AI 수요 급증으로 지상 데이터센터 전력·냉각이 한계에 달한 가운데 위성 기반 인프라가 구조적 해결책으로 부상했습니다.",
    body:          "■ 핵심 소식\n\n\"Google and SpaceX are in talks to launch data centers into orbit amid surging AI demand.\" — WSJ\n\n■ 왜 우주 데이터센터인가\n\n• 전력: AI 클러스터 1개 = 소도시 연간 전력 소비\n• 냉각: 발열 처리 비용이 운영비 40%+\n• 우주: 무한 태양광 + 자연 방열 → 두 제약 모두 해소\n\n■ 구글·SpaceX 각자의 이해관계\n\n구글: GCP 용량 확장 + 스타링크 연결성\nSpaceX: 새 B2B 사업 + 스타십 발사 수요 창출\n\n■ 투자 접근법\n\n• GOOGL: 직접 수혜\n• RKLB: 소형 위성 발사 수요 증가\n\n■ 결론\n\n우주 데이터센터 투자 시계는 지금부터입니다.",
    category:      "섹터",
    categoryColor: "mint",
    subject:       "🛸 Google·SpaceX (우주·AI인프라)",
    date:          "2026-05-13",
    updatedAt:     "2026.05.13 22:00",
    images:        ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"],
  },
];
