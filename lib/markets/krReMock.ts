import type { IndexQuote, Quote } from "@/lib/api";

/** KB·정부 공표 추세 가정 — 지수 카드 (실거래 API 연동 전) */

export const KR_RE_INDICES: IndexQuote[] = [
  {
    symbol: "KB-SALE",
    name: "KB매매",
    fullName: "KB국민은행 매매가격지수",
    value: 92.4,
    change: 0.18,
    changePercent: 0.19,
    sparkline: [91.8, 91.9, 92.0, 92.1, 92.15, 92.2, 92.25, 92.3, 92.4],
  },
  {
    symbol: "KB-JEONSE",
    name: "KB전세",
    fullName: "KB국민은행 전세가격지수",
    value: 98.1,
    change: 0.32,
    changePercent: 0.33,
    sparkline: [97.4, 97.5, 97.6, 97.7, 97.8, 97.9, 98.0, 98.05, 98.1],
  },
  {
    symbol: "POLICY",
    name: "정책지수",
    fullName: "정부 주택정책 모멘텀",
    value: 64,
    change: 4,
    changePercent: 6.7,
    sparkline: [55, 56, 58, 59, 60, 61, 62, 63, 64],
  },
];

export const KR_RE_QUOTES: Quote[] = [
  { symbol: "SEOUL-SALE", name: "서울 매매", price: 112.3, change: 0.4, changePercent: 0.36, sparkline: [111, 111.2, 111.4, 111.6, 111.8, 112, 112.1, 112.2, 112.3], volume: "—", marketCap: "—" },
  { symbol: "SEOUL-JEONSE", name: "서울 전세", price: 105.8, change: 0.6, changePercent: 0.57, sparkline: [104.5, 104.7, 104.9, 105.1, 105.3, 105.5, 105.6, 105.7, 105.8], volume: "—", marketCap: "—" },
  { symbol: "CAPITAL-SALE", name: "수도권 매매", price: 101.2, change: 0.2, changePercent: 0.2, sparkline: [100.6, 100.7, 100.8, 100.9, 101, 101.05, 101.1, 101.15, 101.2], volume: "—", marketCap: "—" },
];

export type KrRePolicy = {
  id: string;
  title: string;
  summary: string;
  body: string;
  links: { label: string; url: string }[];
};

export const KR_RE_POLICIES: KrRePolicy[] = [
  {
    id: "supply",
    title: "주택공급 확대 · 재건축 규제 완화",
    summary: "도심 공공주택·재건축·재개발 속도를 높이는 공급 패키지가 논의 중입니다. 용적률·안전진단·분양가 상한제가 핵심 변수입니다.",
    body: `정부는 수도권 주택 수급 불균형을 줄이기 위해 공공주택 공급, 재건축·재개발 규제 완화, 초과이익 환수 구조 조정 등을 묶은 공급 확대 패키지를 검토하고 있습니다.

■ 무엇이 바뀌나
(1) 강남·용산 등 공급 제약 구역에서의 용적률·높이 규제 완화 폭
(2) 재건축 안전진단·조합 설립 요건 완화 여부
(3) 분양가 상한제·공공분양 비중 확대가 민간 분양 심리에 미치는 영향

■ 시장에 미치는 영향
공급 발표가 구체화되면 단기적으로는 매물 출회 증가 기대, 중기적으로는 신규 분양 물량과 기존 매물 가격이 동시에 재평가되는 흐름이 나올 수 있습니다. 다만 금리·DSR 환경이 동반되면 실수요 체감은 정책 발표와 다를 수 있습니다.

■ 투자자가 볼 포인트
실제 인허가·착공 일정, 재건축 초과이익환수 부담, 분양 물량 일정표를 함께 추적하세요. 발표만으로 가격이 즉시 움직이지 않는 경우가 많습니다.`,
    links: [
      { label: "국토교통부 주택정책", url: "https://www.molit.go.kr/portal.do" },
      { label: "주택법 (국가법령정보센터)", url: "https://www.law.go.kr/법령/주택법" },
      { label: "도시 및 주거환경정비법", url: "https://www.law.go.kr/법령/도시및주거환경정비법" },
      { label: "한국부동산원 주택가격동향", url: "https://www.reb.or.kr/r-one/portal/main/mainPage.do" },
    ],
  },
  {
    id: "dsr",
    title: "전세대출 · DSR · LTV 규제",
    summary: "총부채원리금상환비율(DSR)과 전세자금대출 한도가 실수요·갭투자 실행력을 가릅니다. 한도·금리·만기를 함께 보세요.",
    body: `금융당국은 가계부채 연착륙을 위해 DSR(총부채원리금상환비율) 적용을 단계적으로 강화해 왔습니다. 전세자금대출도 LTV·DSR·대환대출 규제와 맞물려 한도·금리·만기에 영향을 받습니다.

■ DSR이란
연간 원리금 상환액이 연소득에서 차지하는 비율입니다. DSR이 낮아지면(규제 강화) 같은 소득으로 빌릴 수 있는 금액이 줄고, 전세·매매 모두 거래 실행이 어려워질 수 있습니다.

■ 전세 시장에서의 경로
(1) 전세대출 한도 축소 → 전세 보증금 상승 압력
(2) 갭투자(전세 끼고 매매) 자금조달 제약 → 매매 거래 위축
(3) 기존 대출 만기 연장·대환 조건 변화가 동시에 작용

■ 완화 신호가 나와도
거래량 회복 기대는 붙을 수 있지만, 금융위·금감원의 가계부채 관리 기조가 유지되는 한 '풀어주기'의 폭은 제한적일 수 있습니다. 은행별 한도·금리 차이를 실제 상담으로 확인하는 것이 중요합니다.`,
    links: [
      { label: "금융위원회", url: "https://www.fsc.go.kr" },
      { label: "금융감독원", url: "https://www.fss.or.kr" },
      { label: "은행연합회", url: "https://www.kfb.or.kr" },
      { label: "주택도시기금 (전세대출)", url: "https://www.hf.go.kr" },
    ],
  },
  {
    id: "tax",
    title: "보유세 · 양도세 · 다주택 규제",
    summary: "종부세·재산세·양도세 중과와 다주택자 규제는 매물 출회와 거래량의 핵심 변수입니다. 실수요와 투자 수요를 구분하세요.",
    body: `다주택자 양도세 중과·한시 중과 유예, 종합부동산세·재산세 부담, 취득세 감면 등은 '팔아야 할지, 들고 갈지'를 결정하는 핵심 변수입니다.

■ 세제 논의의 축
(1) 실수요 1주택자 vs 투자·다주택자 구분
(2) 보유세 vs 거래세(양도세) 중 어디를 조정할지
(3) 지방·수도권 차등 적용 여부

■ 시장 심리
세제 완화 기대가 커지면 매물이 늘고 거래량이 단기적으로 늘 수 있으나, 반대로 '추가 규제' 논의가 나오면 관망세가 강화됩니다. 특히 다주택자 양도세 유예 만료·연장 여부가 매도 타이밍에 큰 영향을 줍니다.

■ 참고
개별 세액은 취득 시점·보유 기간·주택 수·지역에 따라 달라집니다. 아래 법령·국세청 안내를 확인하시고, 필요하면 세무 전문가와 상담하세요.`,
    links: [
      { label: "국세청 부동산 세제", url: "https://www.nts.go.kr" },
      { label: "소득세법 (국가법령)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "종합부동산세법 (국가법령)", url: "https://www.law.go.kr/법령/종합부동산세법" },
      { label: "지방세법 (취득세)", url: "https://www.law.go.kr/법령/지방세법" },
    ],
  },
];
