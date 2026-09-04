#!/usr/bin/env node
/**
 * 9/4 애널 글·댓글 템플릿 제거 — 구조·오프닝·종결을 글마다 다르게.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const US_POSTS = {
  [-1007]:
    "오늘 한장만 보면 됩니다. — 사이버캡 요금 4.20달러 — 한국 8월 1만 400대 — 엔비디아 허깅페이스 약 129억 달러 — 스페이스X 비상장 약 150달러. 행사 다음 날이라 숫자 대조가 먼저입니다.",
  [-1008]:
    "오스틴 행사가 끝난 뒤 테슬라가 376.37달러(+5.42%)까지 뛰었습니다. 분위기만 남은 날이 아니라, 요금·전비·무인 인가 같은 실행 숫자가 같이 쏟아진 밤입니다. 관망보다 표에 남길 줄이 많습니다.",
  [-1009]:
    "왜 4.20달러가 민감할까요? 앱에서 사이버캡 2인승과 모델와이 4인승이 같은 화면에 떴기 때문입니다. 요금표가 공개되면 로보택시 논쟁은 감상에서 단가로 내려옵니다.",
  [-1010]:
    "165와트시/마일. 루시드·모델3보다 약 28~31% 낮다고 소개된 전비입니다. 이 숫자만 먼저 적어 두고, 실도로 측정이 나오면 다시 맞추겠습니다.",
  [-1011]:
    "마일당 운용 원가 약 20센트, 구매가 3만 달러 미만 — 행사 슬라이드로는 매력적입니다. 다만 세금·보험·유휴를 넣으면 30~40센트 구간으로 벌어질 수 있어, 지금 단가로 밸류를 확정하긴 이릅니다.",
  [-1012]:
    "오스틴 본사·제조 인력이 2025년 말 1만 6,506명이었다는 집계가 나왔습니다. 2028년 3만 명 목표는 채용·공장 확장 속도가 받쳐 줘야 하는데, 헤드카운트만으로 생산량을 단정하진 않겠습니다.",
  [-1013]:
    "텍사스 로보택시 채널을 다시 봤습니다. 420대 중 감독자 없이 달릴 수 있는 인가는 45대뿐입니다. 플릿 규모와 무인 허가는 따로 적어야 합니다.",
  [-1014]:
    "한국 8월 테슬라 판매 1만 400대, 전년 대비 +30.4%. 내수 수요가 살아 있다는 신호로 읽습니다. 다만 글로벌 로보택시 뉴스와는 축이 다릅니다.",
  [-1015]:
    "호주 +160%와 한국 +30.4%가 같은 주에 잡혔습니다. 지역마다 기저·모델 믹스가 달라서 한 줄로 평균 내면 오해합니다. 국가별 표로 남겨 두겠습니다.",
  [-1016]:
    "런던에서 우버·웨이브 자율주행이 넓어졌지만 운전석에는 사람이 앉습니다. 웨이모식 완전 무인과는 단계가 다르니, ‘자율’이라는 단어만으로 테슬라와 직접 비교하진 않겠습니다.",
  [-1017]:
    "우버가 택시기사 쪽과 로보택시 확대를 늦추려 한다는 보도 — 맞다면 플랫폼은 기사 네트워크와 무인 전환 사이에서 속도를 조절하는 중입니다. 감원·캡엑스 뉴스와 같은 주에 겹친 점이 포인트입니다.",
  [-1018]:
    "9월 2일 8-K 기준입니다. 주주 현금 약 119억 달러, 잔류 보상 최대 10억 달러, 합쳐 약 129억 달러로 허깅페이스 인수를 잡았습니다. 공시 숫자가 곧 확인선입니다.",
  [-1019]:
    "스페이스X 비상장 호가 약 150달러(+7.5%대), 시총 2조 달러 서사. 비상장이라 호가 출처마다 조금씩 어긋날 수 있어, 거래 증거와 밸류 헤드라인을 분리합니다.",
  [-1020]:
    "전력 발언을 다시 뜯어보면 지금 1.4기가와트, 연말 2기가와트 이상, 2027년은 5보다 10에 가깝다는 계단입니다. 칩 공급만큼 전원·부지가 병목이 될 수 있다는 뜻입니다.",
  [-1021]:
    "830에이커 추가 확보 — 니켈 초합금 터빈 블레이드·베인 주조로 거론됩니다. 토지 거래와 공장 용도가 실제로 맞는지 지방 허가·보도 대조가 다음 숙제입니다.",
  [-1022]:
    "사우스헤이븐 쪽 데이터센터는 약 60만 평방피트·51에이커 그림입니다. 멤피스 인근 AI 연산 클러스터가 커지는 흐름과 맞춰 보면, 전력·냉각 일정이 핵심 리스크입니다.",
  [-1023]:
    "멤피스 스타링크 가입이 6월 말 이후 약 2,000건, 주거 요금 50% 할인. 데이터센터 뉴스와 주민 체감이 같은 도시에서 겹칩니다. 가입 순증이 계속되는지가 확인 포인트입니다.",
  [-1024]:
    "앤스로픽이 가장 빨리 크고, 연말 기업가치가 오픈에이아이를 넘을 확률이 94%라는 예측시장 숫자가 돌았습니다. 확률은 베팅일 뿐이라 재무제표·매출 가시성과는 결이 다릅니다.",
  [-1025]:
    "지피티6 아스트라 배포와 함께 사이버 가드레일이 걸렸습니다. 새 모델 속도보다, 악용 차단이 얼마나 제품 품질을 제한하는지가 기업 고객 채택에 더 직접적일 수 있습니다.",
  [-1026]:
    "버크셔가 약 15개월 전 구글을 180~190달러대에 사기 시작했다는 설명이 나왔습니다. 장기 보유 철학과 AI 검색 경쟁이 한 포트폴리오에 공존하는 장면입니다.",
  [-1027]:
    "에스앤피500에서 배당수익률이 국채 10년물을 넘는 종목이 5% 미만입니다. 2007년 5월 이후 가장 얇은 구간이라, ‘배당으로 금리 이기기’는 지금은 예외에 가깝습니다.",
  [-1028]:
    "루이지애나 스타베이스 메탄 설비 약 100억 달러·36개월 제안요청서가 돌았다는 이야기 — 아직 확인되지 않았습니다. 미확인은 미확인으로 두고, 공식 입찰·허가 전까지는 시나리오만 적어 두겠습니다.",
  [-1029]:
    "달 인공지능 위성, 질량 가속기, 탈출 속도 초속 약 2,400미터 — 비전 발언 톤이 강합니다. 흥미롭지만 일정·예산·기술이 공개되기 전이라 투자 근거로 올리진 않겠습니다.",
  [-1030]:
    "스타십 42호기가 극저온 시험에 들어갔습니다. 액체 산소·메탄을 넣어 탱크가 수축·압력을 견디는지 보는 단계이고, 41호기와 비교되는 중입니다. 발사 카운트다운과는 다른 체크리스트입니다.",
};

const US_COMMENTS = {
  [-1007]: [
    {
      alias: "송파 독수리 #66",
      content: "요금·한국 판매·인수·비상장 호가 네 줄을 달력에 붙여 두겠습니다. 행사 여운보다 숫자 대조가 먼저네요.",
      created_at: "2026-09-04T00:03:00.000Z",
    },
  ],
  [-1008]: [
    {
      alias: "분당 매 #31",
      content: "+5.42%는 분위기 반영이 큽니다. 저는 무인 인가 대수와 요금표를 주간으로 남기겠습니다.",
      created_at: "2026-09-04T00:10:00.000Z",
    },
  ],
  [-1009]: [
    {
      alias: "성수 너구리 #15",
      content: "2인승·4인승이 한 화면에 뜬 게 핵심이죠. 4.20달러가 프로모션인지 기준 요금인지도 궁금합니다.",
      created_at: "2026-09-04T00:17:00.000Z",
    },
  ],
  [-1010]: [
    {
      alias: "역삼 판다 #77",
      content: "전비 165는 발표 수치라 실도로 검증이 필요합니다. 비교군(루시드·모델3) 조건을 같이 적어 두겠습니다.",
      created_at: "2026-09-04T00:24:00.000Z",
    },
    {
      alias: "마포 살쾡이 #08",
      content: "전비가 낮아도 공차·타이어·속도에 따라 달라지니, 슬라이드만으로 단정하진 않겠습니다.",
      created_at: "2026-09-04T00:26:00.000Z",
    },
  ],
  [-1011]: [
    {
      alias: "한남 재규어 #27",
      content: "20센트와 버스 1달러/마일 비교는 설득력 있습니다. 유휴률·보험을 넣으면 간격이 줄어들 수 있어 시나리오를 나눠 보겠습니다.",
      created_at: "2026-09-04T00:31:00.000Z",
    },
  ],
  [-1012]: [
    {
      alias: "삼성동 올빼미 #19",
      content: "1만 6,506명 → 3만 명은 거의 두 배입니다. 채용 공고·공장 라인 증설이 따라오는지가 확인선이겠네요.",
      created_at: "2026-09-04T00:38:00.000Z",
    },
  ],
  [-1013]: [
    {
      alias: "해운대 고래 #03",
      content: "420대 중 45대만 무인이면 비율이 얇습니다. 플릿 flooding 말과 허가 대수를 섞어 쓰지 않겠습니다.",
      created_at: "2026-09-04T00:45:00.000Z",
    },
    {
      alias: "압구정 치타 #44",
      content: "감독자 유무가 단가·보험에 바로 붙습니다. 다음 주 인가 증가분만 따로 추적하겠습니다.",
      created_at: "2026-09-04T00:47:00.000Z",
    },
  ],
  [-1014]: [
    {
      alias: "마포 살쾡이 #08",
      content: "1만 400대·+30.4%면 국내 수요는 분명합니다. 모델와이 비중과 ASP를 분기 때 같이 보죠.",
      created_at: "2026-09-04T00:52:00.000Z",
    },
  ],
  [-1015]: [
    {
      alias: "판교 늑대 #90",
      content: "호주 +160%는 기저 효과가 클 수 있습니다. 한국과 같은 표에 넣되 해석은 분리하겠습니다.",
      created_at: "2026-09-04T00:59:00.000Z",
    },
  ],
  [-1016]: [
    {
      alias: "인천 갈매기 #52",
      content: "운전석에 사람이 앉는다면 ‘무인’ 마케팅과 실제 단계가 다릅니다. 런던은 안전 드라이버 단계로 분류하겠습니다.",
      created_at: "2026-09-04T01:06:00.000Z",
    },
    {
      alias: "합정 수달 #07",
      content: "웨이브 파트너십이면 우버는 네트워크, 웨이브는 주행 스택 쪽 역할로 보는 게 맞겠죠.",
      created_at: "2026-09-04T01:08:00.000Z",
    },
  ],
  [-1017]: [
    {
      alias: "압구정 치타 #44",
      content: "기사 단체와 속도를 맞춘다면 로보택시 캡엑스가 바로 매출로 안 올 수 있습니다. 일정 지연 리스크로 적어 두겠습니다.",
      created_at: "2026-09-04T01:13:00.000Z",
    },
  ],
  [-1018]: [
    {
      alias: "잠실 백로 #29",
      content: "119억+최대 10억이면 구조가 현금·주식·잔류 보상이 섞였을 가능성이 큽니다. 8-K 원문 조항을 한 번 더 보겠습니다.",
      created_at: "2026-09-04T01:20:00.000Z",
    },
  ],
  [-1019]: [
    {
      alias: "청담 여우 #11",
      content: "2조 달러 서사는 헤드라인입니다. 호가 150달러의 거래량·호가창이 얇으면 변동이 클 수 있습니다.",
      created_at: "2026-09-04T01:27:00.000Z",
    },
    {
      alias: "노원 기러기 #21",
      content: "비상장 밸류는 상장 주식처럼 매일 검증이 안 되니, 전력·발사 실적을 대리 지표로 쓰겠습니다.",
      created_at: "2026-09-04T01:29:00.000Z",
    },
  ],
  [-1020]: [
    {
      alias: "합정 수달 #07",
      content: "1.4→2→‘10에 가깝다’면 연간 증설 폭이 큽니다. 변압기·가스 터빈 조달 일정이 병목일 수 있겠네요.",
      created_at: "2026-09-04T01:34:00.000Z",
    },
  ],
  [-1021]: [
    {
      alias: "이태원 부엉이 #18",
      content: "터빈 블레이드 주조면 항공·에너지 공급망 이슈입니다. 830에이커 용도 확정 공고를 기다려 보겠습니다.",
      created_at: "2026-09-04T01:41:00.000Z",
    },
  ],
  [-1022]: [
    {
      alias: "성북 참새 #33",
      content: "60만 평방피트면 중형 캠퍼스입니다. 사우스헤이븐 허가·전력 계약이 나오면 신뢰도가 올라가겠네요.",
      created_at: "2026-09-04T01:48:00.000Z",
    },
    {
      alias: "강남 표범 #04",
      content: "멤피스 일대에 연산·스타링크·토지가 겹치는 그림이라 지역 리스크도 같이 봐야겠습니다.",
      created_at: "2026-09-04T01:50:00.000Z",
    },
  ],
  [-1023]: [
    {
      alias: "노원 기러기 #21",
      content: "2,000건에 50% 할인이면 지역 수용을 위한 프로모션 성격이 큽니다. 할인 종료 후 해지율이 궁금합니다.",
      created_at: "2026-09-04T01:55:00.000Z",
    },
  ],
  [-1024]: [
    {
      alias: "분당 호랑이 #55",
      content: "예측시장 94%는 분위기 지표로만 쓰겠습니다. 매출·이비티다 공개가 나오면 그때 다시 보겠습니다.",
      created_at: "2026-09-04T02:02:00.000Z",
    },
  ],
  [-1025]: [
    {
      alias: "여의도 학 #12",
      content: "가드레일이 강하면 일부 워크로드는 막힐 수 있습니다. 기업향 채택 사례가 나오는지가 다음 확인입니다.",
      created_at: "2026-09-04T02:09:00.000Z",
    },
    {
      alias: "광화문 여우 #62",
      content: "아스트라라는 이름보다 배포 범위(소비자/API)를 먼저 확인하고 있습니다.",
      created_at: "2026-09-04T02:11:00.000Z",
    },
  ],
  [-1026]: [
    {
      alias: "강남 표범 #04",
      content: "180~190달러 매수라면 현재가 대비 여유가 있던 구간이었습니다. 버크셔 비중 변화는 13F로 추적하겠습니다.",
      created_at: "2026-09-04T02:16:00.000Z",
    },
  ],
  [-1027]: [
    {
      alias: "마곡 펠리컨 #63",
      content: "배당이 국채를 이기기 어려운 국면이면 성장·바이백 이야기가 더 커질 수 있습니다. 10년물과 같이 보겠습니다.",
      created_at: "2026-09-04T02:23:00.000Z",
    },
  ],
  [-1028]: [
    {
      alias: "종로 까치 #41",
      content: "100억 달러 메탄 설비는 규모가 커서 가짜 뉴스 리스크도 있습니다. 공식 문서 나오기 전엔 비중 반영 안 합니다.",
      created_at: "2026-09-04T02:30:00.000Z",
    },
    {
      alias: "분당 매 #31",
      content: "동의합니다. 미확인 제안요청서는 워치리스트에만 넣고 본문에는 ‘미확인’ 태그를 유지하겠습니다.",
      created_at: "2026-09-04T02:32:00.000Z",
    },
  ],
  [-1029]: [
    {
      alias: "광화문 여우 #62",
      content: "달 위성·질량 가속기는 타임라인 없는 비전입니다. 흥미롭지만 당기 실적 변수로는 두지 않겠습니다.",
      created_at: "2026-09-04T02:37:00.000Z",
    },
  ],
  [-1030]: [
    {
      alias: "여의도 수리 #28",
      content: "극저온은 발사 직전 필수 관문입니다. 42호기가 41호기와 어디가 다른지 시험 항목만 정리해 두겠습니다.",
      created_at: "2026-09-04T02:44:00.000Z",
    },
  ],
};

const KR_POSTS = {
  [-2051]:
    "장중 243포인트가 출렁였는데 종가는 강보합 — 기타법인 12거래일 연속 순매수가 완충으로 읽힙니다. 다만 자사주·소각이 ‘기타법인’에 섞이면 진짜 수급과 착각하기 쉽습니다. 오늘 밤 고용 전엔 표만 정리하겠습니다.",
  [-2052]:
    "왜 시총 1위만 따로 움직였을까요? 삼성전자 자사주 매입이 기타법인으로 잡혀 지수 반등과 디커플된 흐름입니다. 외국인 매도 금액과 자사주 규모를 한 화면에 겹치지 말고 따로 적으시기 바랍니다.",
  [-2053]:
    "하이닉스도 소각용 자사주가 기타법인에 잡혔습니다. 그런데 장중 급락 뒤 추가 조정이 나온 걸 보면, 환원 완충만으로 성장주 베타를 막진 못했습니다. 관망.",
  [-2054]:
    "엘지에너지솔루션이 뚜렷한 공시 없이 에너지저장·태양광 맥락으로 2차전지를 끌어올렸습니다. 수주·공급 계약이 나오기 전 추격은 위험도가 높습니다.",
  [-2055]:
    "현대차 되돌림을 원화 강세와 유가 90달러대 사이에 놓고 봤습니다. 완성차 마진은 환율·유가가 동시에 움직일 때 해석이 어려워지니, 사이버캡 글로벌 뉴스와는 축을 분리합니다.",
  [-2056]:
    "금리 인상 기대가 되살아나며 케이비금융 중심으로 금융주가 돌았습니다. 고용 숫자가 기대를 뒤집으면 하루 만에 로테이션이 되돌아갈 수 있어, 비중은 작게 가져가겠습니다.",
};

const KR_COMMENTS = {
  [-2051]: [
    {
      alias: "종로 까치 #41",
      content: "기타법인 연속 순매수는 기록해 두되, 자사주 비중부터 빼서 보겠습니다.",
      created_at: "2026-09-04T06:05:00.000Z",
    },
    {
      alias: "분당 매 #31",
      content: "장중 243포인트면 종가 하나로 판단하기 어렵죠. 고용 전까지는 신규 비중 안 늘리겠습니다.",
      created_at: "2026-09-04T06:12:00.000Z",
    },
  ],
  [-2052]: [
    {
      alias: "성수 너구리 #15",
      content: "시총 1위가 지수와 어긋나면 수급 집계를 다시 봐야 합니다. 자사주 공시 일정 확인해 보겠습니다.",
      created_at: "2026-09-04T06:12:00.000Z",
    },
    {
      alias: "마포 살쾡이 #08",
      content: "외국인 매도 + 자사주 매입이 같은 날이면 순매수만 보면 헷갈립니다.",
      created_at: "2026-09-04T06:18:00.000Z",
    },
  ],
  [-2053]: [
    {
      alias: "역삼 판다 #77",
      content: "소각 이슈는 중기 호재인데 당일 베타가 이겼네요. HBM 실적과 수급을 분리 추적하겠습니다.",
      created_at: "2026-09-04T06:20:00.000Z",
    },
    {
      alias: "한남 재규어 #27",
      content: "성장주 조정 구간에선 자사주보다 외국인 흐름이 먼저입니다.",
      created_at: "2026-09-04T06:28:00.000Z",
    },
  ],
  [-2054]: [
    {
      alias: "판교 치타 #22",
      content: "공시 없는 급등은 재료 확인 전엔 추격하지 않는 편이 맞습니다.",
      created_at: "2026-09-04T06:28:00.000Z",
    },
    {
      alias: "여의도 너구리 #11",
      content: "ESS·태양광 키워드만으로 단정하지 말고 수주 공시를 기다리겠습니다.",
      created_at: "2026-09-04T06:35:00.000Z",
    },
  ],
  [-2055]: [
    {
      alias: "삼성동 올빼미 #19",
      content: "원화 강세는 수입 원가에, 고유가는 수요에 각각 다르게 붙습니다. 둘 다 표에 남기죠.",
      created_at: "2026-09-04T06:36:00.000Z",
    },
    {
      alias: "해운대 고래 #03",
      content: "국내 판매와 미국 로보택시 뉴스는 같은 차트에 넣지 않겠습니다.",
      created_at: "2026-09-04T06:44:00.000Z",
    },
  ],
  [-2056]: [
    {
      alias: "광화문 물총새 #06",
      content: "금융 로테이션은 금리 기대에 민감합니다. NFP 이후 다시 보겠습니다.",
      created_at: "2026-09-04T06:44:00.000Z",
    },
    {
      alias: "잠실 백로 #29",
      content: "케이비금융이 주도라면 은행 업종 전체 베타도 같이 체크하겠습니다.",
      created_at: "2026-09-04T06:50:00.000Z",
    },
  ],
};

const SAFE_POSTS = {
  [-2057]:
    "고용 전야에 달러가 약해지며 비트코인·금·유가 90달러가 한꺼번에 움직였습니다. 성격이 다른 자산이 같은 방향으로 재가격된 날이라, 오늘 밤 비농업 고용 하나에 포지션을 몰아넣진 않겠습니다.",
  [-2058]:
    "8만 달러를 되찾은 비트코인 — 지지가 단단한지, 고용 충격에 다시 깨지는지가 바로 시험입니다. 기사마다 다른 종가(7만 7천대 인용 등)는 거래소 기준과 맞춰 쓰겠습니다.",
  [-2059]:
    "금이 전날 급락 저점에서 돌아선 건 달러 약세·인상 기대 완화가 겹친 결과로 읽습니다. 4,500달러 안착 여부는 고용 숫자 나온 뒤에 판단하겠습니다.",
  [-2060]:
    "은이 금보다 크게 움직였습니다. 산업 수요와 헤지가 동시에 붙는 구간이라 변동성이 큽니다. 금 대비 비중은 작게 유지합니다.",
  [-2061]:
    "이더리움은 비트코인 반등에 연동됐지만 2,500달러 심리선 아래입니다. 고용 전 알트 레버리지는 줄이는 편이 안전해 보입니다.",
  [-2062]:
    "WTI가 90달러를 지키는 가운데 서비스 경기 확장 신호와 고용이 겹칩니다. 유가가 버티면 금리 인하 기대가 쉽게 안 내려가니, 위험자산과 같이 보셔야 합니다.",
};

const SAFE_COMMENTS = {
  [-2057]: [
    {
      alias: "매크로올빼미 #31",
      content: "달러·BTC·금·유가가 한날 움직이면 공통 변수는 금리·고용뿐입니다.",
      created_at: "2026-09-04T09:05:00.000Z",
    },
    {
      alias: "분당 매 #31",
      content: "NFP 전 신규 레버리지는 안 키우겠습니다. 발표 후 15분만 지켜보죠.",
      created_at: "2026-09-04T09:12:00.000Z",
    },
  ],
  [-2058]: [
    {
      alias: "온체인 매 #03",
      content: "8만 달러 회복이 진짜인지 청산 맵이 말해 줍니다. 펀딩비도 같이 보겠습니다.",
      created_at: "2026-09-04T09:12:00.000Z",
    },
    {
      alias: "성수 너구리 #15",
      content: "종가 출처가 갈리면 차트만 헷갈립니다. 거래소 하나로 고정하겠습니다.",
      created_at: "2026-09-04T09:18:00.000Z",
    },
  ],
  [-2059]: [
    {
      alias: "실물러 #12",
      content: "급락 반등은 숏커버일 수도 있습니다. 4,500 안착을 이틀은 봐야겠습니다.",
      created_at: "2026-09-04T09:20:00.000Z",
    },
    {
      alias: "역삼 판다 #77",
      content: "실질금리·DXY가 같이 풀리는지 확인하는 중입니다.",
      created_at: "2026-09-04T09:26:00.000Z",
    },
  ],
  [-2060]: [
    {
      alias: "금벌레 #17",
      content: "은은 금보다 베타가 커서 헤지 용도로는 비중을 줄입니다.",
      created_at: "2026-09-04T09:28:00.000Z",
    },
    {
      alias: "한남 재규어 #27",
      content: "산업 수요 쪽이면 PMI·구리와 같이 보는 게 맞습니다.",
      created_at: "2026-09-04T09:34:00.000Z",
    },
  ],
  [-2061]: [
    {
      alias: "온체인 매 #03",
      content: "2,500달러 아래면 심리선 회복이 먼저입니다. BTC만 보고 ETH 추격하진 않겠습니다.",
      created_at: "2026-09-04T09:36:00.000Z",
    },
    {
      alias: "삼성동 올빼미 #19",
      content: "고용 전 알트는 변동성만 키울 수 있어 관망합니다.",
      created_at: "2026-09-04T09:42:00.000Z",
    },
  ],
  [-2062]: [
    {
      alias: "매크로올빼미 #31",
      content: "90달러 안착이면 인플레 우려가 쉽게 안 사라집니다. 10년물과 같이 적겠습니다.",
      created_at: "2026-09-04T09:44:00.000Z",
    },
    {
      alias: "해운대 고래 #03",
      content: "서비스 확장 + 고유가면 연준 메시지도 매파 쪽으로 기울 수 있습니다.",
      created_at: "2026-09-04T09:50:00.000Z",
    },
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

function patchUsPosts(src) {
  let out = src;
  for (const [id, content] of Object.entries(US_POSTS)) {
    const nid = Number(id);
    const re = new RegExp(
      `(id: ${nid}, alias: "[^"]+", symbol: "[^"]+",\\n\\s+content: )"[^"]*"`,
      "m",
    );
    if (!re.test(out)) throw new Error(`US post ${nid} not found`);
    out = out.replace(re, `$1${esc(content)}`);
  }
  return out;
}

function patchUsComments(src) {
  let out = src;
  for (const [id, arr] of Object.entries(US_COMMENTS)) {
    const nid = Number(id);
    const start = out.indexOf(`  [${nid}]: [`);
    if (start === -1) throw new Error(`US comments ${nid} not found`);
    const end = out.indexOf("  ],", start);
    if (end === -1) throw new Error(`US comments ${nid} end not found`);
    const block =
      `  [${nid}]: [\n` +
      arr
        .map(
          (c) =>
            `    { alias: ${esc(c.alias)}, content: ${esc(c.content)}, created_at: ${esc(c.created_at)} },`,
        )
        .join("\n") +
      `\n  ],`;
    out = out.slice(0, start) + block + out.slice(end + 4);
  }
  return out;
}

function patchMarketsOneLiners(src, posts, startId, endId) {
  let out = src;
  for (let id = startId; id >= endId; id--) {
    const content = posts[id];
    if (!content) continue;
    const re = new RegExp(
      `(\\{ id: ${id}, alias: "[^"]+", symbol: "[^"]+", content: )"[^"]*"`,
    );
    if (!re.test(out)) throw new Error(`markets post ${id} not found`);
    out = out.replace(re, `$1${esc(content)}`);
  }
  return out;
}

function patchMarketsComments(src, comments) {
  let out = src;
  for (const [id, arr] of Object.entries(comments)) {
    const nid = Number(id);
    const start = out.indexOf(`  [${nid}]: [`);
    if (start === -1) throw new Error(`markets comments ${nid} not found`);
    const end = out.indexOf("  ],", start);
    const block =
      `  [${nid}]: [\n` +
      arr
        .map(
          (c) =>
            `    { alias: ${esc(c.alias)}, content: ${esc(c.content)}, created_at: ${esc(c.created_at)} },`,
        )
        .join("\n") +
      `\n  ],`;
    out = out.slice(0, start) + block + out.slice(end + 4);
  }
  return out;
}

function main() {
  const usPath = path.join(ROOT, "lib/analystPosts.ts");
  let us = fs.readFileSync(usPath, "utf8");
  us = patchUsPosts(us);
  us = patchUsComments(us);
  fs.writeFileSync(usPath, us);
  console.log("✓ lib/analystPosts.ts US -1007~-1030 posts+comments");

  const mPath = path.join(ROOT, "lib/analystPosts-markets.ts");
  let m = fs.readFileSync(mPath, "utf8");
  m = patchMarketsOneLiners(m, KR_POSTS, -2051, -2056);
  m = patchMarketsOneLiners(m, SAFE_POSTS, -2057, -2062);
  // Safe gold alias was duplicate 금벌레 — change -2059 to distinct alias
  m = m.replace(
    '{ id: -2059, alias: "금벌레 #17", symbol: "금"',
    '{ id: -2059, alias: "금시세 #28", symbol: "금"',
  );
  m = patchMarketsComments(m, KR_COMMENTS);
  m = patchMarketsComments(m, SAFE_COMMENTS);
  fs.writeFileSync(mPath, m);
  console.log("✓ lib/analystPosts-markets.ts KR/SAFE 9/4 posts+comments");

  // sync fix-reports analyst snapshot if present
  const fixPath = path.join(ROOT, "scripts/fix-reports-20260904-ko-analyst.js");
  if (fs.existsSync(fixPath)) {
    const posts = Object.entries(US_POSTS).map(([id, content]) => {
      const nid = Number(id);
      const aliasMatch = us.match(new RegExp(`id: ${nid}, alias: "([^"]+)", symbol: "([^"]+)"`));
      const comments = US_COMMENTS[nid]?.length || 1;
      return {
        id: nid,
        alias: aliasMatch ? aliasMatch[1] : "",
        symbol: aliasMatch ? aliasMatch[2] : "",
        content,
        comments,
      };
    });
    posts.sort((a, b) => b.id - a.id);
    // actually ids are -1007 first (less negative) to -1030 — sort ascending by abs
    posts.sort((a, b) => a.id - b.id);
    fs.writeFileSync(
      fixPath,
      "module.exports = " + JSON.stringify(posts, null, 2) + ";\n",
    );
    console.log("✓ scripts/fix-reports-20260904-ko-analyst.js");
  }

  // neutralize template generators in apply script so re-run won't recreate boilerplate
  const applyPath = path.join(ROOT, "scripts/apply-20260904.js");
  if (fs.existsSync(applyPath)) {
    let a = fs.readFileSync(applyPath, "utf8");
    a = a.replace(
      /function analystContent\(r, i\) \{[\s\S]*?^\}/m,
      `function analystContent(r, i) {
  // 템플릿 금지 — 실제 카피는 rewrite-analyst-20260904-diverse.js / 수동 작성
  throw new Error("analystContent template disabled — write diverse copy manually");
}`,
    );
    a = a.replace(
      /function uniqueAnalystComment\(i, k\) \{[\s\S]*?^\}/m,
      `function uniqueAnalystComment(i, k) {
  throw new Error("uniqueAnalystComment template disabled — write diverse comments manually");
}`,
    );
    fs.writeFileSync(applyPath, a);
    console.log("✓ apply-20260904.js templates disabled");
  }
}

main();
