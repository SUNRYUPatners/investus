/** Sourced Tesla valuation notes. Every figure has a citation. Do not add unsourced numbers. */

export type TeslaScenario = {
  id: "bear" | "base" | "bull";
  labelEn: string;
  labelKo: string;
  price: string;
  cagr: string;
  revenue: string;
  gm: string;
  robotaxi: string;
  optimus: string;
  mktCap: string;
};

export type TeslaSegmentNote = {
  id: "auto" | "energy" | "fsd" | "optimus";
  titleEn: string;
  titleKo: string;
  bodyEn: string;
  bodyKo: string;
};

export type TeslaSource = {
  labelEn: string;
  labelKo: string;
  url: string;
  dated?: string;
};

/** ARK Invest Tesla 2031 Monte Carlo (as of 16 Oct 2026), as logged in Investus research. */
export const ARK_TESLA_2031: TeslaScenario[] = [
  {
    id: "bear",
    labelEn: "Bear",
    labelKo: "약세",
    price: "$3,300",
    cagr: "53%",
    revenue: "$1.2T",
    gm: "64%",
    robotaxi: "4.8M",
    optimus: "0.8M",
    mktCap: "$13.4T",
  },
  {
    id: "base",
    labelEn: "Base",
    labelKo: "기본",
    price: "$4,400",
    cagr: "62%",
    revenue: "$1.45T",
    gm: "68%",
    robotaxi: "8.1M",
    optimus: "1.0M",
    mktCap: "$17.5T",
  },
  {
    id: "bull",
    labelEn: "Bull",
    labelKo: "강세",
    price: "$5,000",
    cagr: "66%",
    revenue: "$1.62T",
    gm: "72%",
    robotaxi: "10M",
    optimus: "1.2M",
    mktCap: "$20.4T",
  },
];

export const TESLA_SEGMENTS: TeslaSegmentNote[] = [
  {
    id: "auto",
    titleEn: "Automotive",
    titleKo: "자동차",
    bodyEn:
      "Q3 2026 deliveries 486,532 (Street 461,974) and production 464,391 (+4% YoY). Company revenue for the quarter was $28.05B. Musk told the Q3 call that vehicle demand exceeds production by a “significant margin,” driven by FSD interest, with a 2030 production goal of 5 million vehicles. Cumulative deliveries passed 10 million.",
    bodyKo:
      "Q3 2026 인도 486,532대(컨센서스 461,974대), 생산 464,391대(+4% YoY). 분기 매출 $28.05B. 머스크는 Q3 콜에서 차량 수요가 생산을 ‘상당한 격차’로 초과한다고 했고, 2030년 연 500만 대 생산을 목표로 제시했습니다. 누적 인도는 1,000만 대를 넘었습니다.",
  },
  {
    id: "energy",
    titleEn: "Energy",
    titleKo: "에너지",
    bodyEn:
      "Q3 2026 energy storage deployments were 13.7 GWh (Street 15.9 GWh). Chair Robyn Denholm’s 2026 shareholder letter said Megapack 3 shipments had started. Subsequent coverage logged a $840M Apollo Power Megapack contract (~1 GW through 2029) and a $265M Taiwan order (260 Megapack 2XL units). Tesla Energy does not publish a separate ticker.",
    bodyKo:
      "Q3 2026 에너지 저장 배치 13.7 GWh(컨센서스 15.9 GWh). 로빈 덴홈 이사회 의장 2026 주주서한은 Megapack 3 출하 시작을 확인했습니다. 이후 리서치에 Apollo Power Megapack 약 1 GW·$8.4억(2029년까지)과 대만 $2.65억(Megapack 2XL 260기) 수주가 기록돼 있습니다. 에너지 부문은 별도 티커가 없습니다.",
  },
  {
    id: "fsd",
    titleEn: "FSD / robotaxi",
    titleKo: "FSD · 로보택시",
    bodyEn:
      "Q3 2026: FSD active subscriptions 1.74M (+67% YoY) in one call recap, and “surpassed 1.7M” in the earnings note; cumulative FSD miles ~15 billion. Unsupervised robotaxi miles reached 2 million (8× QoQ, zero accidents cited). Denholm: FSD in 190+ countries; Cybercab production started at Giga Texas.",
    bodyKo:
      "Q3 2026: FSD 활성 구독 1.74M(+67% YoY, 콜 정리) / 어닝 노트는 1.7M 돌파. 누적 FSD 마일 약 150억. 무감독 로보택시 마일 200만(전분기 대비 8배, 사고 0건으로 인용). 덴홈: FSD 190개국 이상, 기가 텍사스에서 Cybercab 양산 시작.",
  },
  {
    id: "optimus",
    titleEn: "Optimus",
    titleKo: "옵티머스",
    bodyEn:
      "An Oct 19 SEC-related note in Investus research confirmed first Optimus V3 production lines at Fremont. A later factory note said the Model S/X line at Fremont was converted in 46 days and shipped the first production-quality robots. ARK’s 2031 model (below) treats Optimus unit volume as a scenario input, not a current run-rate.",
    bodyKo:
      "인베스트어스 리서치의 10월 19일 SEC 관련 노트는 프리몬트에서 옵티머스 V3 첫 생산 라인을 확인했습니다. 이후 공장 노트는 프리몬트 Model S/X 라인을 46일 만에 전환하고 첫 양산 품질 로봇을 출고했다고 적었습니다. 아래 ARK 2031 모형은 옵티머스 대수를 시나리오 입력으로 쓰며, 현재 런레이트가 아닙니다.",
  },
];

export const TESLA_SOURCES: TeslaSource[] = [
  {
    labelEn: "Tesla investor relations (filings, earnings, shareholder letter)",
    labelKo: "테슬라 IR (공시·실적·주주서한)",
    url: "https://ir.tesla.com/",
  },
  {
    labelEn: "Tesla SEC EDGAR filings",
    labelKo: "테슬라 SEC EDGAR 공시",
    url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=TSLA",
  },
  {
    labelEn: "ARK Invest Tesla 2031 valuation (5,000 Monte Carlo runs, as of 16 Oct 2026) — as recorded in Investus research",
    labelKo: "ARK Invest 테슬라 2031 밸류에이션(몬테카를로 5,000회, 2026-10-16) — 인베스트어스 리서치 기록",
    url: "https://www.investus.kr/news",
    dated: "2026-10-16",
  },
  {
    labelEn: "Tesla Q3 2026 update — adj. EPS $0.48 vs $0.45, revenue $28.05B, net income $787M, CapEx guide $25B→$20B (Tesla earnings, logged 2026-10-21)",
    labelKo: "Tesla Q3 2026 — 조정 EPS $0.48 vs $0.45, 매출 $28.05B, 순이익 $787M, CapEx 가이던스 $25B→$20B (테슬라 실적, 2026-10-21 기록)",
    url: "https://ir.tesla.com/",
    dated: "2026-10-21",
  },
  {
    labelEn: "Jefferies TSLA $420 HOLD — recorded in the 13 Oct 2026 Investus daily snapshot; not a 2031 scenario",
    labelKo: "Jefferies TSLA $420 HOLD — 2026-10-13 인베스트어스 일일 스냅샷 기록. 2031 시나리오가 아님",
    url: "https://www.investus.kr/news",
    dated: "2026-10-13",
  },
];

export const JEFFERIES_PT = {
  firm: "Jefferies",
  target: "$420",
  rating: "HOLD",
  dated: "2026-10-13",
} as const;
