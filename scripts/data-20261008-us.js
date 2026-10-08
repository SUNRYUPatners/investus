// 2026-10-08 US — 스크린샷 글 → 관련 뉴스 → 기관 뷰.
const { detailBody, summaryBody } = require("./lib-report-bodies");
const { applyPad } = require("./lib-apply-pad");

function D(what, more, house) {
  return detailBody({ what, more, house });
}

function teslaHouse(why) {
  return `웨드부시는 테슬라에 아웃퍼폼 의견과 목표 주가 600달러를 유지합니다. ${why}

모건스탠리의 기본 목표 주가는 415달러 자리이고, 강세 시나리오는 그보다 높게 둡니다. 두 집을 한 숫자로 섞지 않습니다.`;
}

function spacexHouse(why) {
  return `모건스탠리 아담 조너스는 스페이스X에 오버웨이트와 목표 주가 300달러를 다시 걸었습니다. ${why}

씨티증권의 존 고딘은 주당 900달러, 기업가치 12조 달러를 말해 온 하우스입니다. 두 목표를 평균 내지 않고 나란히 둡니다.`;
}

const US = [];
function push(row) {
  US.push(applyPad(row));
}

push({
  id: "seed-1940",
  slug: "summary",
  pinned: true,
  category: "특집",
  color: "purple",
  subject: "한장요약",
  tickers: ["MACRO"],
  title: "2026년 10월 8일 한장 요약입니다. 스타링크 모바일 1만 5,000기, 테라팹, 오스틴 무인 416건을 모았습니다",
  summary:
    "FCC가 스페이스X 스타링크 모바일용 위성 최대 1만 5,000기를 승인했습니다. 머스크는 테라팹을 직접 짓고 돌린다고 못 박았고, 오스틴 사이버캡 목격은 하루 557건·무인 416건입니다.",
  titleEn: "2026.10.08 snapshot: Starlink Mobile 15,000 sats, Terafab, 416 driverless Cybercab",
  summaryEn: "FCC green-lights 15,000 Starlink Mobile sats; Terafab ZERO doubt; Austin 416 driverless; Germany/Slovakia FSD; Grok multi-model; mortgage 7.63%.",
  body: summaryBody({
    big: `10월 8일 목요일입니다. 서울 아침은 뉴욕에서 스타링크 모바일 규제와 테라팹, 오스틴 무인 숫자가 같이 오른 밤을 받습니다.

FCC는 스페이스X가 스타링크 모바일(다이렉트 투 폰)용 차세대 위성 최대 1만 5,000기를 발사·운용하도록 승인했습니다. 지상 이동통신사와 임대 계약 없이도 위성 무선 서비스를 할 수 있는 면제도 붙었습니다. 머스크는 V2가 V1 대비 대역폭 100배 이상이라고 했습니다.

스페이스X는 엔비디아 칩 대량 구매를 위해 약 400억 달러 조달을 추진한다는 보도가 나왔고, 아폴로가 이끌고 은행 대출 약 100억·투자등급 채권 약 300억 달러 구조로 2027년 종결이 거론됩니다. 머스크는 테라팹을 직접 짓고 돌리며 TSMC는 일부만 전대할 수 있다고 못 박았습니다.

독일이 테슬라 FSD 추진을 지지하고, 슬로바키아는 FSD(Supervised)를 승인했습니다. 오스틴 사이버캡 목격은 하루 557건·무인 416건입니다. 그록 봇은 클로드 오퍼스 5.5·미드저니·수노 등 외부 모델을 작업마다 고른다고 했고, 30년 모기지 금리는 7.63%로 2023년 11월 이후 최고입니다.`,
    invest: `표에 적어 둘 것은 1만 5,000기, 대역폭 100배, 무인 416건, 모기지 7.63%입니다.

모건스탠리 300달러와 씨티 900달러는 스페이스X 개별에, 웨드부시 600달러는 테슬라 칸에 둡니다.

트럼프 대통령이 목요일 머스크에게 과학·기술 최고 훈장을 수여할 예정이고, 리비안은 폭스바겐 10년 10억 달러 대출(금리 6.03%)을 받았습니다.`,
  }),
  wall: "ㅋㅋ 스타링크 1만5천기 승인에 테라팹 ZERO, 오스틴 무인 416. 오늘 숫자만 봐도 멘탈 나감.",
  c1: "15000은 승인 상한이야. 지금 궤도에 다 있는 건 아님",
  c2: "416은 어제 무인 목격이야. 연간이 아니야",
  analyst: "FCC 1만 5,000기 승인과 V2 100배 대역폭은 규제·용량이 같은 날 열린 구간으로 읽습니다. 오스틴 무인 416건과 독일·슬로바키아 FSD를 표에 나란히 두고, 웨드부시 600달러·모건스탠리 300달러는 종목 칸에서 이어 갑니다.",
});

push({
  id: "seed-1941",
  slug: "spcx-fcc-15000",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "FCC가 스페이스X 스타링크 모바일용 위성 최대 1만 5,000기를 승인했습니다",
  summary:
    "다이렉트 투 폰용 차세대 위성입니다. 지상 이동통신사와 임대 계약 없이도 위성 무선 서비스를 할 수 있는 면제가 붙었습니다. 이미 궤도에 전용 모바일 위성은 약 650기입니다.",
  titleEn: "FCC approved up to 15,000 SpaceX Starlink Mobile satellites",
  summaryEn: "Next-gen direct-to-phone sats. Waiver lets SpaceX offer satellite wireless without a ground MNO lease. About 650 dedicated mobile sats are already in orbit.",
  body: D(
    `FCC가 스페이스X에 스타링크 모바일용 차세대 위성 최대 1만 5,000기를 발사·운용하도록 승인했습니다.

다이렉트 투 폰 연결용입니다. 사용자당 피크 속도는 최대 약 150Mbps를 겨냥하고, 초저궤도 고도는 약 326~335킬로미터입니다. T-Mobile 스펙트럼과 EchoStar에서 확보한 스펙트럼을 씁니다.

지상 이동통신사와 스펙트럼 임대 계약 없이도 위성 무선 서비스를 할 수 있는 면제가 붙었습니다. 궤도에 있는 전용 모바일 위성은 약 650기입니다.`,
    `서비스는 음영 지역 비상 연결을 넘어 우주에서 5G급 셀룰러망을 짓는 쪽으로 가고 있습니다. 다음 확인할 것은 실제 전개 속도와 상용 요금제 공고입니다.

승인 상한과 지금 궤도에 있는 기수를 한 숫자로 만들지 않습니다.`,
    spacexHouse("모바일 위성 상한이 열리면 통신 매출 가정이 다시 보이는 자리로 읽힙니다."),
  ),
  nick: "일만오천기",
  wall: "ㅋㅋ FCC가 스타링크 모바일 1만5천기 찍어줌. 임대 계약 없이도 된대. 지금 650기밖에 없다며 나도 폰으로 위성 통화 언제 됨?",
  c1: "15000은 상한이야. 650이 지금 궤도",
  c2: "150메가bps는 피크 목표야. 우리집 속도 아님",
  analyst: "1만 5,000기 승인과 지상사 임대 면제는 규제 병목이 한 칸 풀린 이벤트로 읽습니다. 궤도 약 650기와 상한을 분리해 두고, 상용 요금제와 전개 일정이 다음 확인입니다. 모건스탠리 300달러·씨티 900달러는 그 규제 해제의 장기 가정에 붙는 하우스입니다.",
});

push({
  id: "seed-1942",
  slug: "spcx-starlink-100x",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "머스크가 스타링크 모바일 V2 대역폭이 V1의 100배 이상이라고 했습니다",
  summary:
    "다이렉트 투 셀 V2 위성입니다. 기당 처리량은 20배, 데이터 밀도는 100배라고 설명했습니다. 일반 폰에서 통화·스트리밍·5G급 연결을 겨냥합니다.",
  titleEn: "Musk says Starlink Mobile V2 enables more than 100x V1 bandwidth",
  summaryEn: "Direct-to-cell V2. Each satellite delivers 20x throughput and 100x data density. Native calls, streaming, and 5G-class links for ordinary phones.",
  body: D(
    `머스크는 스타링크 모바일(다이렉트 투 셀) V2 위성이 현재 V1 시스템 대비 대역폭을 100배 이상 가능하게 한다고 했습니다.

V2는 차세대 성좌입니다. 기당 처리량은 20배, 데이터 밀도는 100배라고 설명했습니다. 일반 휴대폰에서 네이티브 통화, 고속 앱, 스트리밍, 5G 연결을 겨냥합니다.

스타링크가 본격적인 글로벌 모바일망으로 스케일업한다는 문장이 같은 흐름에 붙어 있습니다.`,
    `FCC 1만 5,000기 승인과 같은 밤의 용량 이야기입니다. 설계 배수와 실제 체감 속도는 전개 뒤에 나옵니다.

다음 확인할 것은 V2 배치 창과 통신사 파트너 상용 발표입니다.`,
    spacexHouse("100배 용량 주장은 모바일 ARPU 가정이 커지는 배경으로 읽힙니다."),
  ),
  nick: "백배대역",
  wall: "V2가 V1보다 대역폭 100배라니 ㅋㅋ 우리 집 와이파이보다 위성이 빠르면 어떻게 됨. 20배 처리량 100배 밀도라는데 나는 그냥 영상만 봄.",
  c1: "100배는 대역폭 설계야. 요금표 아님",
  c2: "전개 전에 체감 속도는 모름",
  analyst: "V1 대비 100배 대역폭과 기당 20배 처리량은 설계 배수로 읽습니다. 상용 체감과 분리해 두고, FCC 상한과 배치 창이 다음입니다. 씨티 900달러 가정은 모바일 용량이 매출로 내려올 때 다시 봅니다.",
});

push({
  id: "seed-1943",
  slug: "spcx-nvda-40b",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX", "NVDA"],
  title: "스페이스X가 엔비디아 칩 구매를 위해 약 400억 달러 조달을 추진합니다",
  summary:
    "아폴로가 이끕니다. 은행 대출 약 100억 달러와 투자등급 채권 약 300억 달러 구조입니다. 거래 종결은 2027년이 거론됩니다.",
  titleEn: "SpaceX is seeking about $40 billion to buy Nvidia chips",
  summaryEn: "Apollo-led. Roughly $10 billion in bank loans and $30 billion in investment-grade debt. Close expected in 2027.",
  body: D(
    `스페이스X가 엔비디아(NVDA) 칩을 대량 구매하기 위해 약 400억 달러 조달을 추진한다는 보도가 나왔습니다.

거래는 아폴로가 이끌고, 은행 대출 약 100억 달러와 투자등급 채권 약 300억 달러로 구성됩니다. 종결은 2027년이 거론됩니다.

머스크는 지난 8월 스페이스X가 AI·데이터센터 지출을 늘리며 엔비디아, 특히 베라 루빈 아키텍처 위에서만 짓기로 했다고 했습니다.`,
    `조달 규모와 실제 칩 인도 일정을 한 줄로 묶지 않습니다. 다음 확인할 것은 채권 발행 공시와 데이터센터 착공·전력 계약입니다.

연방준비제도 관계자들은 AI 투자 규모가 계속 기대를 웃돈다고 말한 같은 주입니다.`,
    spacexHouse("400억 달러급 GPU 조달은 AI 인프라 가정이 실물 차입으로 내려온 자리로 읽힙니다."),
  ),
  nick: "사백억칩",
  wall: "스페이스X가 엔비디아 칩에 400억 달러 빌린대 ㅋㅋ 아폴로에 은행 100억 채권 300억. 2027년 종결이라며 나는 그때까지 존버?",
  c1: "400억은 조달 추진이야. 이미 다 산 거 아님",
  c2: "베라 루빈은 아키텍처야. 오늘 주가 아님",
  analyst: "약 400억 달러 조달과 2027년 종결은 아직 추진·보도 단계로 읽습니다. 은행 100억·채권 300억 구조를 표에 두고, 실제 발행과 칩 인도 일정이 다음입니다. 모건스탠리 300달러는 AI 캡엑스 가정이 커질 때 같이 봅니다.",
});

push({
  id: "seed-1944",
  slug: "spcx-ai-compute",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "스페이스X AI 연산 계약이 월 약 34억 3천만 달러, 연환산 410억 달러 이상이라는 집계가 나왔습니다",
  summary:
    "앤트로픽 월 약 12억 5천만, 구글 약 9억 2천만, Reflection AI 약 1억 5천만, 미공개 고객 12월 1일부터 월 약 11억 1천만 달러입니다. 네 건을 더한 숫자입니다.",
  titleEn: "SpaceX AI compute deals are tallied near $3.43B/month, over $41B annualized",
  summaryEn: "Anthropic ~$1.25B/mo, Google ~$920M/mo, Reflection AI ~$150M/mo, unnamed ~$1.11B/mo from Dec 1. Sum of four deals.",
  body: D(
    `스페이스X에 AI 연산 대형 계약 네 건이 있다는 집계가 돌았습니다.

앤트로픽 월 약 12억 5천만 달러, 구글 월 약 9억 2천만 달러, Reflection AI 월 약 1억 5천만 달러, 이름이 안 공개된 고객은 12월 1일부터 월 약 11억 1천만 달러입니다.

합치면 월 약 34억 3천만 달러, 연환산 410억 달러가 넘는다는 문장입니다. 네 번째 고객이 누구인지 묻는 글이 같이 붙었습니다.`,
    `소셜에 돌은 집계와 회사 공시 매출을 같은 칸에 두지 않습니다. 다음 확인할 것은 분기 실적에서 연산·전력 매출이 따로 보이는지입니다.

400억 달러급 엔비디아 칩 조달 보도와 같은 주의 AI 인프라 이야기입니다.`,
    spacexHouse("연산 매출이 공시로 내려오면 통신·발사 외에 세 번째 축이 열리는 자리로 읽힙니다."),
  ),
  nick: "연산사십일",
  wall: "월 34억 달러면 연 410억이라며 ㅋㅋ 앤트로픽 구글 Reflection에 미공개까지. 미공개가 오픈AI면 난리 나는 거 아님?",
  c1: "집계야. 공시 매출표는 아직",
  c2: "12월 1일 시작은 미공개 고객 분",
  analyst: "월 34억 3천만·연환산 410억 달러는 소셜 집계로 읽습니다. 공시 라인과 분리해 두고, 12월 미공개 고객 개시와 분기 매출 분해가 다음입니다. 씨티 900달러 가정은 연산 ARPU가 실적으로 확인될 때 다시 봅니다.",
});

push({
  id: "seed-1945",
  slug: "terafab-zero",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA", "SPCX"],
  title: "머스크가 테라팹을 직접 짓고 돌린다고 못 박았습니다",
  summary:
    "TSMC가 일부를 전대할 수는 있어도 그 이상은 아니라고 했습니다. 테슬라와 스페이스X용 테라팹을 처음부터 생산까지 팀이 돌린다는 취지입니다.",
  titleEn: "Musk said there will be ZERO doubt SpaceX/Tesla will build and run the Terafab",
  summaryEn: "TSMC may sublease part of the Terafab, but nothing more. Musk's teams run blueprint to production for Tesla and SpaceX.",
  body: D(
    `머스크는 테라팹을 직접 짓고 돌릴 것이며 의심의 여지를 제로로 두라고 했습니다.

"Maybe TSMC subleases part of the Terafab if they want, but nothing more than that."라는 문장이 같이 나갔습니다. TSMC가 일부를 전대할 수는 있어도 공동 조종은 아니라는 취지입니다.

테슬라와 스페이스X용 테라팹을 설계부터 가동까지 머스크 팀이 돌린다는 이야기가 같은 흐름에 붙어 있습니다.`,
    `파운드리 파트너와 임차인 역할을 한 줄로 섞지 않습니다. 다음 확인할 것은 부지·인허가·장비 발주 일정입니다.

인텔 CEO가 테라팹 협력을 이어 간다고 한 발언과 같은 주의 반도체 수직통합 이야기입니다.`,
    teslaHouse("팹을 직접 돌리면 칩 원가·공급 가정이 장기적으로 다시 잡히는 자리로 읽힙니다."),
  ),
  nick: "제로의심",
  wall: "머스크가 테라팹 ZERO doubt라며 ㅋㅋ TSMC는 전대만 가능하대. 우리가 팹 주인이라는 거지? 존버 각인가",
  c1: "전대랑 공동운영은 다름",
  c2: "착공·장비 발주가 다음 뉴스지",
  analyst: "직접 건설·운영과 TSMC 전대 한도는 지배구조 문장으로 읽습니다. 인허가·장비 발주가 다음 확인이고, 웨드부시 600달러는 AI·로보택시와 함께 보는 장기 목표가입니다.",
});

push({
  id: "seed-1946",
  slug: "intel-terafab",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA", "INTC"],
  title: "인텔 CEO가 테라팹에서 머스크와 계속 일한다고 확인했습니다",
  summary:
    "도쿄에서 한 발언입니다. 인텔은 4월에 설계·제조·패키징을 돕는 개발 파트너로 합류했습니다. 협력 지속 확인입니다.",
  titleEn: "Intel CEO Lip-Bu Tan confirmed Intel will keep working with Musk on Terafab",
  summaryEn: "Comments in Tokyo. Intel joined in April to help design, manufacture, and package chips. Partnership continues.",
  body: D(
    `인텔 CEO 립부 탄이 테라팹에서 머스크와 계속 일하겠다고 확인했습니다.

도쿄에서 나온 발언입니다. 인텔은 지난 4월 칩 설계·제조·패키징을 돕는 개발 파트너로 합류했습니다.

테슬라·X·스페이스X 로고가 붙은 테라팹 개념도와 악수 사진이 같은 흐름에 돌았습니다.`,
    `머스크의 “직접 짓고 돌린다” 발언과 파트너 역할이 충돌하지 않는지 시장이 가늠하는 주입니다. 다음 확인할 것은 공정 노드·패키징 분담 공시입니다.

엔비디아 NVLink 스케일업에 인텔이 이름을 올린 같은 주의 반도체 협력 이야기입니다.`,
    teslaHouse("파운드리 파트너가 남으면 양산 일정 리스크가 한 칸 낮아지는 자리로 읽힙니다."),
  ),
  nick: "인텔악수",
  wall: "인텔 CEO가 테라팹 계속 한대 ㅋㅋ 4월부터 설계 제조 패키징 돕는 파트너라며. 머스크 ZERO랑 같이 보면 뭔 관계임?",
  c1: "파트너지 주인이라는 말은 아님",
  c2: "도쿄 발언이야. 계약서 전문은 아직",
  analyst: "인텔의 개발 파트너 지속 확인은 양산 일정에 붙는 실행 리스크 완화로 읽습니다. 머스크 직접 운영 발언과 역할을 표에서 나누고, 공정·패키징 분담이 다음입니다. 웨드부시 600달러는 그 실행이 로보택시·AI와 만날 때 봅니다.",
});

push({
  id: "seed-1947",
  slug: "tsla-germany-fsd",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "독일이 테슬라 FSD 추진을 지지하며 유럽 전역 투표가 다가옵니다",
  summary:
    "유럽연합 차원 표결이 가까운 시점입니다. 독일의 지지가 규제 모멘텀으로 읽히는 속보입니다. 승인 확정 공고와는 다른 단계입니다.",
  titleEn: "Germany backs Tesla's FSD push as the EU nears a Europe-wide vote",
  summaryEn: "EU-wide vote is approaching. German support is a regulatory momentum print, not the final approval notice.",
  body: D(
    `독일이 테슬라의 완전자율주행(FSD) 추진을 지지한다는 속보가 나왔습니다.

유럽연합 전역 투표가 다가오는 시점입니다. 독일의 지지가 규제 모멘텀으로 읽히는 문장입니다.`,
    `슬로바키아 FSD(Supervised) 승인과 같은 주의 유럽 규제 이야기입니다. 지지와 최종 제품 출시 공고를 한 줄로 만들지 않습니다.

다음 확인할 것은 유럽연합 표결 일정과 국가별 출시 공고입니다.`,
    teslaHouse("유럽 규제 문이 열리면 구독 매출 가정이 대륙으로 넓어지는 자리로 읽힙니다."),
  ),
  nick: "독일지지",
  wall: "독일이 FSD 밀어준다며 ㅋㅋ 유럽 투표 앞두고. 독일만 가도 시작은 되는 거 아님? 나는 출시 공고 기다림.",
  c1: "지지랑 최종 승인 공고는 단계가 다름",
  c2: "표결 날짜가 다음 뉴스지",
  analyst: "독일 지지와 유럽연합 표결 접근은 규제 모멘텀으로 읽습니다. 출시 공고·구독 ARPU와 분리해 두고, 웨드부시 600달러의 유럽 FSD 침투 가정에 붙는 일정입니다.",
});

push({
  id: "seed-1948",
  slug: "tsla-slovakia-fsd",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "슬로바키아가 테슬라 FSD(Supervised)를 승인했습니다",
  summary:
    "공식 승인 최종 준비가 며칠 안에 끝난다는 설명입니다. 유럽에서 확인된 다음 국가라는 문장이 붙었습니다. Supervised는 운전자가 책임지는 단계입니다.",
  titleEn: "Slovakia approved Tesla FSD (Supervised)",
  summaryEn: "Final official approval preparations expected within days. Next confirmed European country. Supervised means the driver remains responsible.",
  body: D(
    `슬로바키아가 테슬라 FSD(Supervised)를 막 승인했습니다.

공식 승인 최종 준비가 진행 중이며 며칠 안에 끝난다는 설명입니다. 유럽에서 확인된 다음 국가라는 문장이 붙었습니다.

Supervised는 운전자가 앉은 채 책임지는 단계입니다.`,
    `독일의 FSD 지지 속보와 같은 주의 유럽 이야기입니다. 국가 승인와 대륙 전체 표결을 한 칸에 두지 않습니다.

다음 확인할 것은 공식 관보·앱 활성화 공지입니다.`,
    teslaHouse("국가 단위 Supervised 승인이 쌓이면 유럽 구독 침투 가정이 구체화됩니다."),
  ),
  nick: "슬로바키아",
  wall: "슬로바키아 FSD Supervised 승인 ㅋㅋ 며칠 뒤 공식 도장이라며. 유럽 친구들 환호하는데 나는 앱에 뜨면 믿음 감.",
  c1: "Supervised는 무인 허가 아님",
  c2: "공식 공지 나오면 그때 구독 칸",
  analyst: "슬로바키아 Supervised 승인은 국가 단위 제품 허가로 읽습니다. 무인(레벨4)과 분리하고, 앱 활성화·구독 매출이 다음입니다. 모건스탠리 415달러 기본안과 웨드부시 600달러를 섞지 않습니다.",
});

push({
  id: "seed-1949",
  slug: "tsla-cybercab-416",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "오스틴 사이버캡 목격이 하루 557건, 무인이 416건이었습니다",
  summary:
    "지난주 화요일 371건·무인 248건 대비 전체 50%, 무인 68% 늘었습니다. 무인 416건은 축제일이 아닌 날 최고입니다. 무인 비중은 75%입니다.",
  titleEn: "Austin Cybercab sightings hit 557 with 416 driverless",
  summaryEn: "Up 50% vs last Tuesday's 371; driverless up 68% vs 248. 416 is the highest non-festival day. Driverless share 75%.",
  body: D(
    `오스틴에서 사이버캡(로보택시) 목격이 어제 557건이었고, 그중 무인이 416건이었습니다.

지난주 화요일 전체 371건·무인 248건과 비교하면 전체는 50%, 무인은 68% 늘었습니다. 무인 416건은 축제일이 아닌 날 기록된 최고입니다.

무인 비중은 75%입니다. 평일 이틀 연속 목격이 560건 근처라 주간 증가가 깨끗하다는 설명이 붙었습니다.`,
    `연말 사이버캡 3,000대·연 2억 4천만 달러 매출 시나리오 글이 같은 주에 돌았습니다. 목격 건수와 상용 매출을 한 줄로 만들지 않습니다.

모건스탠리는 연말 로보택시 플릿 약 1,500대, 2030년 3만 대를 본 적 있습니다. 다음 확인할 것은 공식 등록·유료 호출 공고입니다.`,
    teslaHouse("무인 목격이 주간으로 늘면 로보택시 스케일 가정이 다시 보이는 자리로 읽힙니다."),
  ),
  nick: "무인사백십육",
  wall: "오스틴 어제 557에 무인 416 ㅋㅋ 지난주보다 68% 늘었대. 축제 아닌 날 최고라며 존버 각 오는 중.",
  c1: "목격이지 유료 호출 매출 아님",
  c2: "3000대 연말은 시나리오야",
  analyst: "557·416과 주간 +50%·+68%는 현장 스케일 지표로 읽습니다. 유료 매출·공식 등록과 분리하고, 모건스탠리 연말 1,500대 가정과 대조할 다음 숫자가 등록·호출입니다. 웨드부시 600달러는 그 스케일이 실적으로 내려올 때 봅니다.",
});

push({
  id: "seed-1950",
  slug: "tsla-halloween",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "테슬라가 할로윈 모드를 배포하기 시작했습니다",
  summary:
    "차를 바퀴 달린 유령의 집으로 만드는 업데이트입니다. 트릭 오어 트리트, 라이트쇼, 포토부스, 앱으로 말하는 원격 놀이가 포함됩니다.",
  titleEn: "Tesla Halloween Mode is now rolling out",
  summaryEn: "Turns the car into a haunted house on wheels. Trick or Treat, light show, Photobooth, and remote speak through the app.",
  body: D(
    `테슬라가 할로윈 모드를 배포하기 시작했습니다. 🎃 이 소름 돋는 업데이트는 차를 바퀴 달린 유령의 집으로 만듭니다.

아바타에 유령 코스튬이 붙습니다. 트릭 오어 트리트를 켜면 방문자가 다가올 때 소름 소리와 깜빡이는 불이 나갑니다. 새 라이트쇼·랩·잠금 소리, 오싹한 포토부스, 앱으로 말해 차가 독특한 목소리로 말하는 원격 놀이가 있습니다.

부작용에는 동네에서 유명해지는 일이 포함될 수 있다는 농담이 붙었습니다.`,
    `소프트웨어 계절 이벤트로 앱 체류·브랜드 노출을 노리는 업데이트입니다. FSD·로보택시 일정과 섞지 않습니다.

다음 확인할 것은 실제 배포 지역·차량 소프트웨어 버전입니다.`,
    teslaHouse("계절 소프트웨어는 하드웨어 판매 외에 소프트웨어 참여도를 보여주는 작은 신호로 읽힙니다."),
  ),
  nick: "할로윈모드",
  wall: "할로윈 모드 나왔네 ㅋㅋ 트릭오어트리트에 원격으로 차 말하게 한다며. 이웃한테 신고당할 각인데 나는 켤 듯.",
  c1: "재미 업데이트야. FSD 허가 아님",
  c2: "배포 버전 뜨면 그때 자랑샷",
  analyst: "할로윈 모드는 계절 소프트웨어 참여 이벤트로 읽습니다. 규제·인도 숫자와 분리하고, 배포 커버리지가 다음입니다. 목표 주가 논의의 핵심 축은 아닙니다.",
});

push({
  id: "seed-1951",
  slug: "tsla-arkq",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA", "SPCX"],
  title: "ARKQ에서 테슬라 10.86%·스페이스X 9.24%로 머스크 관련 두 종목이 20%를 넘습니다",
  summary:
    "캐시 우드 로보틱스 ETF 상위입니다. 테라다인 7.34%, 엔비디아 5.96%가 이어집니다. 테슬라는 약 377.47달러로 연초 대비 약 16.07% 하락한 자리입니다.",
  titleEn: "Two Musk companies top 20% of ARKQ: TSLA 10.86%, SPCX 9.24%",
  summaryEn: "Cathie Wood robotics ETF. TER 7.34%, NVDA 5.96% follow. TSLA near $377.47, about −16.07% YTD.",
  body: D(
    `ARK 자율기술·로보틱스 ETF(ARKQ)에서 테슬라가 10.86%로 1위, 스페이스X가 9.24%로 2위입니다. 두 종목만 20%를 넘습니다.

이어 테라다인 7.34%, 엔비디아 5.96%, 크라토스 4.79%, 팔란티어 4.63%, 알파벳 4.54%, 로켓랩 4.42%, AMD 4.25%, TSMC 3.97%입니다.

테슬라는 약 377.47달러로 연초 대비 약 16.07% 내린 자리에서도 ARKQ 최대 비중입니다.`,
    `ETF 비중과 회사 펀더멘털을 한 줄로 보지 않습니다. 다음 확인할 것은 ARK의 일일 매매와 테슬라 실적(10월 21일)입니다.

로보택시·AI 피벗이 비중을 설명하는 테마로 읽히는 주입니다.`,
    teslaHouse("로보틱스 ETF 1위 비중은 AI·로보택시 서사가 기관 바구니 칸에 남아 있다는 신호로 읽힙니다."),
  ),
  nick: "아크큐이십",
  wall: "ARKQ에서 테슬라 10.86 스페이스X 9.24면 머스크만 20% 넘음 ㅋㅋ 주가는 377인데 연초대비 16% 빠졌대. 캐시는 존버인가.",
  c1: "ETF 비중지 내 계좌 비중 아님",
  c2: "377은 가격이야. 600은 목표가",
  analyst: "ARKQ 10.86%·9.24%는 펀드 집중도 지표로 읽습니다. 종가 377달러와 웨드부시 600달러를 분리하고, 10월 21일 실적과 로보택시 스케일이 다음 점검입니다.",
});

push({
  id: "seed-1952",
  slug: "grok-multimodel",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "그록 봇이 클로드 오퍼스 5.5·미드저니·수노 등 외부 모델을 작업마다 고른다고 했습니다",
  summary:
    "머스크가 발표한 업그레이드입니다. 작업에 가장 맞는 엔진으로 라우팅한다는 설명입니다. 종합건설이 전문가를 고용하는 비유가 붙었습니다.",
  titleEn: "Grok Bot will route tasks to outside models including Claude Opus 5.5, Midjourney, and Suno",
  summaryEn: "Musk announced the upgrade. Best engine per job. Framed as a general contractor hiring specialists.",
  body: D(
    `머스크가 그록 봇의 대형 업그레이드를 알렸습니다. 작업마다 가장 맞는 모델로 라우팅하며, 앤트로픽의 클로드 오퍼스 5.5, 미드저니, 수노를 포함합니다.

모든 작업에 최고의 엔진이라는 도식이 붙었습니다. 종합건설이 일마다 전문가를 고용하는 것과 같다는 비유입니다.`,
    `xAI 제품이 타사 모델을 오케스트레이션한다는 신호입니다. 테슬라 자동차 마진과 직접 섞지 않습니다.

다음 확인할 것은 실제 출시 일정과 API·요금제입니다.`,
    teslaHouse("AI 제품이 멀티엔진으로 가면 소프트웨어 생태계 가정이 넓어지는 자리로 읽힙니다."),
  ),
  nick: "그록라우팅",
  wall: "그록이 오퍼스 5.5랑 미드저니 수노까지 쓴대 ㅋㅋ 작업마다 최고 엔진이라며. 그럼 그록은 총감인가.",
  c1: "라우팅 발표야. 오늘부터 다 되는 건 모름",
  c2: "차 마진이랑 바로 연결하지 마",
  analyst: "외부 모델 라우팅은 xAI 제품 전략으로 읽습니다. 테슬라 자동차 실적과 분리하고, 상용 일정·단가가 다음입니다. 웨드부시가 말하는 AI 피벗의 주변 신호로만 둡니다.",
});

push({
  id: "seed-1953",
  slug: "nvda-nvlink-250b",
  category: "종목분석",
  color: "blue",
  subject: "엔비디아",
  tickers: ["NVDA"],
  title: "엔비디아가 NVLink Fusion 기회가 2030년까지 2,500억 달러에 이를 수 있다고 봤습니다",
  summary:
    "아마존 AWS와 인텔이 NVLink 스케일업 기술을 채택한다는 설명이 붙었습니다. 연말 십 년 말까지의 기회 규모입니다.",
  titleEn: "Nvidia sees a $250 billion NVLink Fusion opportunity by decade end",
  summaryEn: "Amazon AWS and Intel are adopting NVLink scale-up. Opportunity sized through the end of the decade.",
  body: D(
    `엔비디아(NVDA)는 NVLink Fusion 기회가 십 년 말(2030년)까지 2,500억 달러에 이를 수 있다고 추산했습니다.

아마존(AWS)과 인텔이 NVLink 스케일업 기술을 채택한다는 설명이 붙었습니다.`,
    `스페이스X의 400억 달러급 엔비디아 칩 조달 보도와 같은 주의 AI 인프라 수요 이야기입니다. 기회 규모와 당해 매출 가이던스를 한 줄로 만들지 않습니다.

다음 확인할 것은 분기 실적에서 NVLink·네트워킹 매출 분해입니다.`,
    `대형 클라우드와 칩 파트너가 NVLink를 스케일업에 쓰는 흐름은 엔비디아의 플랫폼 해자를 긍정적으로 보는 하우스 논리에 맞습니다. 기회 2,500억 달러는 회사가 제시한 상단 가정으로, 연간 가이던스와 섞지 않습니다.`,
  ),
  nick: "엔브이링크",
  wall: "NVLink Fusion이 2030까지 2500억 달러 기회라며 ㅋㅋ AWS랑 인텔도 쓴대. 엔비디아 또 락인인가.",
  c1: "기회 규모야. 올해 매출 가이던스 아님",
  c2: "2500억은 십 년 말까지",
  analyst: "NVLink Fusion 2,500억 달러는 십 년 말 기회 상단으로 읽습니다. AWS·인텔 채택은 플랫폼 수요 신호이고, 분기 네트워킹 매출 분해가 다음 확인입니다.",
});

push({
  id: "seed-1954",
  slug: "mortgage-763",
  category: "매크로",
  color: "orange",
  subject: "금리",
  tickers: ["MACRO"],
  title: "미국 30년 모기지 금리가 7.63%로 올라 2023년 11월 이후 최고입니다",
  summary:
    "모기지 뉴스 데일리 기준 2026년 10월 7일 수요일 숫자입니다. 주거 비용과 위험자산 할인율이 같이 움직이는 구간입니다.",
  titleEn: "The 30-year mortgage rate jumped to 7.63%, highest since November 2023",
  summaryEn: "Mortgage News Daily print for Wednesday, October 7, 2026. Housing costs and risk-asset discount rates move together.",
  body: D(
    `미국 30년 모기지 금리가 7.63%로 뛰었습니다. 2023년 11월 이후 최고입니다. 📈 🏠

모기지 뉴스 데일리 기준 2026년 10월 7일 수요일 숫자입니다.`,
    `미국 10년 국채 금리가 5.33~5.35%로 2002년 4월 이후 최고 부근까지 오른 같은 주입니다. 달러인덱스는 102.50 근처로 18개월 고점 부근을 다시 봤습니다.

다음 확인할 것은 FOMC 의사록과 주거 지표, 위험자산 할인율입니다.`,
    `금리가 높은 구간에서도 AI·성장주 하우스는 장기 현금흐름 할인을 다시 적습니다. 모기지 7.63%는 주택과 소비에 부담이지만, 대형 성장주 목표 주가 논의와는 칸을 나눕니다.`,
  ),
  nick: "모기지칠육",
  wall: "모기지 7.63%면 집 사는 사람  Mentally 나감 ㅋㅋ 2023년 11월 이후 최고라며. 나 월세 연장각.",
  c1: "7.63은 30년 모기지야. 기준금리 아님",
  c2: "국채 10년이랑 같이 움직이는 구간",
  analyst: "30년 모기지 7.63%는 2023년 11월 이후 최고로 읽습니다. 10년 국채 5.35% 부근·달러 강세와 같은 매크로 묶음이고, FOMC 의사록이 다음 일정입니다.",
});

push({
  id: "seed-1955",
  slug: "rivian-vw-1b",
  category: "종목분석",
  color: "blue",
  subject: "Rivian",
  tickers: ["RIVN"],
  title: "리비안이 폭스바겐으로부터 10억 달러 대출을 받았습니다",
  summary:
    "10년 만기, 고정 금리 6.03%, 비소구입니다. 담보는 폭스바겐 합작 지분 50%입니다. 원금은 3년 차부터 연 1억 달러, 잔액은 2036년 10월입니다.",
  titleEn: "Rivian received a $1 billion loan from Volkswagen",
  summaryEn: "10-year, fixed 6.03%, non-recourse. Collateral is Rivian's 50% JV stake. Principal $100M/yr from year 3; balance due October 2036.",
  body: D(
    `리비안이 폭스바겐으로부터 10억 달러 대출을 받았습니다. 10월 7일 자금이 집행됐습니다.

만기 10년, 고정 금리 6.03%, 비소구(non-recourse)입니다. 담보는 폭스바겐과의 합작법인 지분 50%입니다.

원금 상환은 3년 차부터 연 1억 달러씩이고, 남은 잔액은 2036년 10월에 갚습니다. 일반 회사 운용 자금으로 씁니다.`,
    `전기차 경쟁사 자금 조달이 테슬라 수요와 직접 대결하는 숫자는 아닙니다. 합작 지분을 담보로 둔 유동성 확충입니다.

다음 확인할 것은 합작 공장 일정과 분기 현금 소진입니다.`,
    `합작 파트너가 장기 고정금리로 유동성을 대는 구조는 리비안의 런웨이 우려를 덜어 주는 긍정 신호로 읽힙니다. 금리 6.03%와 비소구 조건을 표에 남겨 둡니다.`,
  ),
  nick: "리비안십억",
  wall: "리비안이 VW한테 10억 달러 빌림 ㅋㅋ 금리 6.03% 10년 비소구. 담보가 합작 50%라며 망하면 그거만 넘기는 거지?",
  c1: "비소구면 회사 전체 보증은 아님",
  c2: "3년차부터 연 1억 달러 원금",
  analyst: "10억 달러·6.03%·비소구·합작 50% 담보는 유동성 이벤트입니다. 테슬라 수요와 직접 대결 숫자로 보지 않고, 합작 일정·현금 소진이 다음 확인입니다.",
});

module.exports = { US };
