// 2026-10-06 US — 스크린샷 글 → 관련 뉴스 → 기관 뷰.
const { detailBody, summaryBody } = require("./lib-report-bodies");

function D(what, more, house) {
  return detailBody({ what, more, house });
}

function teslaHouse(why) {
  return `웨드부시는 테슬라에 아웃퍼폼 의견과 목표 주가 600달러를 유지합니다. ${why}

모건스탠리의 기본 목표 주가는 400달러이고, 강세 시나리오 목표가는 840달러입니다.`;
}

function spacexHouse(why) {
  return `모건스탠리 아담 조너스는 스페이스X에 오버웨이트와 목표 주가 300달러를 다시 걸었습니다. ${why}

씨티증권의 존 고딘은 주당 900달러, 기업가치 12조 달러를 말해 온 하우스입니다. 두 숫자를 평균 내지 않고 나란히 둡니다.`;
}

const US = [];
function push(row) {
  US.push(row);
}

push({
  id: "seed-1889",
  slug: "summary",
  pinned: true,
  category: "특집",
  color: "purple",
  subject: "한장요약",
  tickers: ["MACRO"],
  title: "2026년 10월 6일 한장 요약입니다. 스페이스X 171.09달러, 엔비디아 6조 달러, 네덜란드 테슬라 1·2위를 모았습니다",
  summary:
    "스페이스X는 7.63% 오른 171.09달러입니다. 모건스탠리 목표 주가는 300달러입니다. 엔비디아는 세계에서 처음 시가총액 6조 달러를 넘긴 회사입니다. 네덜란드 9월 신차에서 모델Y와 모델3가 전체 1·2위입니다.",
  titleEn: "2026.10.06 snapshot: SpaceX $171.09, Nvidia $6T, Tesla 1-2 in the Netherlands",
  summaryEn: "Watch: SPCX $171.09 +7.63%, MS $300, Nvidia first $6T, Dutch Model Y and Model 3, Texas Cybercab 45 to 169.",
  body: summaryBody({
    big: `10월 6일 화요일입니다. 연휴를 넘긴 서울 아침은 뉴욕에서 스페이스X와 엔비디아가 같이 오른 밤을 받습니다.

스페이스X는 7.63% 오른 171.09달러입니다. 모건스탠리는 오버웨이트와 목표 주가 300달러를 다시 걸었고, 성장률을 감안하면 거대 인공지능 동료보다 약 40% 싸다고 했습니다. 일론 머스크는 스페이스XAI를 스페이스XSI로 바꾸겠다고 답했습니다.

엔비디아는 사상 최고가로 세계에서 처음 시가총액 6조 달러를 넘긴 회사입니다. 네덜란드 9월 신차 전체에서 모델Y 2,078대, 모델3 1,087대로 테슬라가 1위와 2위를 같이 가져갔습니다. 텍사스 사이버캡 인가 대수는 한 달 사이 45대에서 169대로 늘었습니다.

세계 신차에서 가솔린 차 비중은 상반기 처음 50% 아래로 내려갔습니다. 캘시에서는 테슬라와 스페이스X가 2028년 전에 합쳐질 확률을 70%로 보고 있습니다.`,
    invest: `표에 적어 둘 것은 171.09달러, 엔비디아 6조 달러, 네덜란드 1·2위, 사이버캡 169대입니다.

모건스탠리 300달러와 씨티 900달러는 아래 스페이스X 개별 리포트에서 이어 갑니다. 웨드부시 600달러는 테슬라 칸에 둡니다.

스타십 15번째 비행과 삼성전자 3분기 잠정실적이 이번 주 달력입니다.`,
  }),
  wall: "SPCX 171.09 +7.63%. MS 목표 300. NVDA 첫 6조달러. 네덜란드 Y 2078 3 1087. 텍사스 사이버캡 45→169. 가솔린 50% 아래",
  c1: "171.09랑 300은 다른 칸이야. 종가랑 목표를 섞지 마",
  c2: "네덜란드 1·2위는 전체 신차야. 전기차 표가 아니야",
  analyst: "스페이스X는 171.09달러로 7.63% 올랐습니다. 엔비디아는 시가총액 6조 달러를 처음 넘겼습니다. 네덜란드 9월 신차 1·2위는 테슬라입니다.",
});

push({
  id: "seed-1890",
  slug: "spcx-ms-300",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "모건스탠리가 스페이스X 목표 주가 300달러를 다시 걸었습니다",
  summary:
    "아담 조너스는 오버웨이트를 유지하고 주식이 이례적으로 싸 보인다고 했습니다. 성장률을 감안하면 거대 인공지능 동료보다 약 40% 낮게 거래됩니다. 스타십 15번째 비행 앞이 그 기회의 자리입니다.",
  titleEn: "Morgan Stanley keeps SpaceX at a $300 price target",
  summaryEn: "Adam Jonas stays Overweight and calls the shares unusually cheap. About 40% below mega-cap AI peers on a growth-adjusted basis ahead of Starship Flight 15.",
  body: D(
    `모건스탠리 아담 조너스의 새 노트입니다. 오버웨이트와 목표 주가 300달러를 다시 걸었습니다.

앞으로 몇 주, 스타십 15번째 비행 앞에 이례적으로 싸 보이는 주식을 살 기회가 있다고 했습니다. 성장률을 맞추면 거대 인공지능 동료보다 약 40% 낮게 거래됩니다.

앞으로 몇 달은 전력과 칩 병목을 푸는 스페이스X의 자리가 더 잘 보일 것이라고 했습니다. 이익 성장과 배수 확대가 같이 열릴 수 있다는 문장입니다. 주가는 171.09달러, 하루 7.63% 상승입니다.`,
    `촉매로 스타십 비행, 3분기 실적, 그록 공개, 추가 네오클라우드 계약이 나란히 있습니다. 성공적인 스타십 캐치가 상장 이후 가장 큰 촉매가 될 수 있다는 문장이 붙어 있습니다.

사뮤엘은 네 달 전만 해도 연간반복매출 1,000억 달러가 낭비로 들렸다고 했습니다. 지금 그 자리와 2조 달러가 넘는 가치가 모델의 앞에 있습니다. 다음 확인할 것은 15번째 비행 창이 열리는 주입니다.`,
    spacexHouse("전력과 칩 병목을 푸는 자리가 다음 몇 달의 배수 확대 이야기로 읽힙니다."),
  ),
  nick: "조너스삼백",
  wall: "MS 조너스 SPCX OW 300. 성장조정 40% 할인. 스타십15 앞. 주가 171.09 +7.63%. 캐치가 상장후 최대 촉매",
  c1: "300은 목표야. 171.09는 종가야",
  c2: "40%는 성장 맞춘 비교야. 시총 40%가 아니야",
  analyst: "모건스탠리는 스페이스X에 오버웨이트와 목표 주가 300달러를 다시 걸었습니다. 성장률을 감안하면 거대 인공지능 동료보다 약 40% 낮습니다.",
});

push({
  id: "seed-1891",
  slug: "spcx-spacexsi",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "스페이스XAI가 스페이스XSI로 이름을 바꿉니다",
  summary:
    "일론 머스크는 슈퍼인텔리전스 회사로 완전히 다시 브랜드하겠다고 확인했습니다. 인공지능이 아니라 슈퍼인텔리전스라는 문장입니다. S1은 궤도에 그 연산을 올리는 첫 세대 위성입니다.",
  titleEn: "SpaceXAI is becoming SpaceXSI",
  summaryEn: "Elon Musk confirmed a full Super Intelligence rebrand. S1 is the first-generation compute satellite. The constellation is Starmind.",
  body: D(
    `스페이스XAI가 스페이스XSI로 이름을 바꿉니다. 일론 머스크는 그 변경을 하겠다고 답했습니다.

인공지능이 아니라 슈퍼인텔리전스라는 문장입니다. 첫 번째 프론티어 지능 회사를 그 이름으로 다시 세우겠다는 자리입니다.

S1은 슈퍼인텔리전스를 위해 설계한 스페이스X의 첫 세대 연산 위성입니다. 궤도에 강한 연산을 올리는 위성이고, 별자리 이름은 스타마인드입니다.`,
    `이름 뒤에 궤도 연산과 지상 데이터센터가 같은 회사의 다음 챕터로 읽히는 주입니다.

정치인 일곱 명이 이 주식을 들고 있다는 문장이 같은 흐름 옆에 있습니다. 다음 확인할 것은 스타마인드 전개 일정과 위성 한 대의 전력 숫자입니다.`,
    spacexHouse("이름 변경은 궤도 연산이 본업 칸으로 올라온다는 신호로 읽힙니다."),
  ),
  nick: "스페이스엑스에스아이",
  wall: "SpaceXAI→SpaceXSI. 머스크 확인. Super Intelligence. S1 첫세대 연산위성. 별자리 Starmind",
  c1: "이름 변경이야. 위성 발사 공고가 아니야",
  c2: "S1이 한 대고 스타마인드가 별자리야",
  analyst: "스페이스XAI는 스페이스XSI로 이름을 바꿉니다. S1은 슈퍼인텔리전스용 첫 세대 연산 위성입니다. 별자리 이름은 스타마인드입니다.",
});

push({
  id: "seed-1892",
  slug: "tsla-nl-sep",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "네덜란드 9월 신차에서 테슬라 모델Y와 모델3가 1위와 2위입니다",
  summary:
    "모델Y는 2,078대, 모델3는 1,087대입니다. 전기차 표가 아니라 전체 신차 표입니다. 테슬라 한 달은 3,165대, 점유율 8.7%입니다.",
  titleEn: "Tesla Model Y and Model 3 took first and second in the entire Dutch new-car market in September",
  summaryEn: "Model Y 2,078, Model 3 1,087. Tesla registered 3,165 cars and 8.7% of all new cars, not just EVs.",
  body: D(
    `네덜란드 9월 신차입니다. 전기차만의 표가 아니라 전체 승용 표입니다.

모델Y는 2,078대로 전체 1위입니다. 전년보다 44.7% 늘었습니다. 모델3는 1,087대로 전체 2위이고, 91% 늘었습니다.

테슬라 한 달은 3,165대입니다. 네덜란드 전체 신차의 8.7%입니다. 모델Y는 2026년 연간 누적 7,283대로 이미 그 나라 1위를 달리고 있습니다.`,
    `프랑스와 스웨덴이 지난주 9월 증가율을 먼저 열었습니다. 네덜란드는 순위 자체가 꼭대기에 앉은 시장입니다.

독일은 같은 달 등록이 크게 늘었다는 별도 칸이 있습니다. 다음 확인할 것은 영국 9월 표입니다. 순위와 점유율을 한 평균으로 만들지 않습니다.`,
    teslaHouse("전체 신차 1·2위는 전기차 안에서의 순위보다 수요의 폭이 넓어 보입니다."),
  ),
  nick: "네덜란드일이이",
  wall: "네덜란드 9월 전체신차. Y 2078 1위 +44.7%. 3 1087 2위 +91%. 테슬라 3165대 8.7%. Y 연간 7283 1위",
  c1: "전체 신차 표야. 전기차 리그 1위가 아니야",
  c2: "3165가 한 달이고 7283은 연간 누적이야",
  analyst: "네덜란드 9월 전체 신차에서 모델Y 2,078대가 1위, 모델3 1,087대가 2위입니다. 테슬라 한 달은 3,165대, 점유율 8.7%입니다.",
});

push({
  id: "seed-1893",
  slug: "tsla-cybercab-sight",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "오스틴에서 어제 사이버캡 목격이 8만 6,870건으로 하루 최고입니다",
  summary:
    "그중 무인 운행은 670건입니다. 제프 루츠는 안전, 현장 운영, 기가텍사스 출고, 수요 네 가지가 같이 참이어야 이 숫자가 나온다고 했습니다.",
  titleEn: "Austin logged a record 86,870 Cybercab sightings yesterday",
  summaryEn: "670 were driverless. Jeff Lutz said safety, field ops, Giga Texas outflow, and demand all have to be true together.",
  body: D(
    `사이버캡 스포터 집계입니다. 어제 오스틴 목격은 8만 6,870건으로 새 기록입니다.

그중 무인 운행은 670건입니다. 9월 초부터 10월 3일까지 막대가 오른쪽에서 가장 높습니다.

제프 루츠는 꽤 큰 이동이라고 했습니다. 안전과 성능이 숫자로 좋아지고, 현장 운영이 넓어지고, 사이버캡이 기가텍사스에서 흘러나오고, 사람들이 그 차를 고를 때 이 막대가 올라간다고 했습니다.`,
    `목격 건수는 도로에 나온 차와 운행 횟수가 겹친 자리입니다. 인가 대수와는 다른 칸입니다.

무인 칸이 전체보다 작은 것은 아직 감독 운행이 많다는 뜻입니다. 다음 확인할 것은 댈러스 출범 일정입니다. 하루 최고와 인가 대수를 한 표로 더하지 않습니다.`,
    teslaHouse("목격이 하루 최고를 경신하면 로보택시 현장 밀도가 주가 이야기의 앞에 옵니다."),
  ),
  nick: "목격팔만육천",
  wall: "오스틴 어제 사이버캡 목격 86870 신기록. 무인 670. 루츠는 안전·운영·출고·수요 넷이 같이 참이어야 한대",
  c1: "86870은 목격이야. 인가 대수가 아니야",
  c2: "670이 무인이야. 나머진 감독 운행이 섞여",
  analyst: "오스틴에서 어제 사이버캡 목격이 8만 6,870건으로 하루 최고입니다. 무인 운행은 670건입니다.",
});

push({
  id: "seed-1894",
  slug: "tsla-texas-fleet",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "텍사스 인가 사이버캡이 한 달 사이 45대에서 169대로 늘었습니다",
  summary:
    "텍사스 인가 로보택시는 589대이고 그중 모델Y는 420대입니다. 일론 머스크는 사람을 다치게 하지 않는 것이 확장의 진짜 제약이라고 했습니다.",
  titleEn: "Texas authorized Cybercabs nearly quadrupled from 45 to 169 in a month",
  summaryEn: "589 robotaxi vehicles are authorized in Texas, including 420 Model Ys. Elon said not injuring anyone is the real constraint.",
  body: D(
    `텍사스 인가 사이버캡이 한 달 사이 45대에서 169대로 거의 네 배가 됐습니다.

텍사스에 인가된 로보택시는 589대입니다. 그중 모델Y는 420대입니다. 무인 마일리지 증가율도 주마다 두 자릿수입니다.

일론 머스크는 확장을 서두르면서도 사람을 다치게 하지 않는 것이 우선이라고 했습니다. 미국 자동차 사망은 한 해 약 3만에서 4만 명입니다. 로보택시가 한 명이라도 다치면 헤드라인이 되고 규제가 전체 운영을 닫을 수 있습니다.`,
    `속도는 느리게 보이지 않습니다. 안전 막대를 높이 유지한 채 규모를 키우는 자리입니다. 반려동물조차 치지 않는 것이 이상이라는 문장이 붙어 있습니다.

다음 확인할 것은 댈러스에 사이버캡이 뜨는 주입니다. 인가 대수와 실제 호출 완료를 한 숫자로 부르지 않습니다.`,
    teslaHouse("인가 대수가 한 달 만에 네 배가 되면 로보택시가 실적 칸에 가까워집니다."),
  ),
  nick: "텍사스백육십구",
  wall: "텍사스 사이버캡 인가 45→169. 로보택시 전체 589, 모델Y 420. 무인 마일 주마다 두자릿수. 머스크는 다치지 않게가 제약",
  c1: "169는 사이버캡이야. 589는 로보택시 전체야",
  c2: "420은 그중 모델Y야. 더하면 중복이야",
  analyst: "텍사스 인가 사이버캡은 한 달 사이 45대에서 169대로 늘었습니다. 인가 로보택시는 589대이고 모델Y는 420대입니다.",
});

push({
  id: "seed-1895",
  slug: "tsla-fsd-oppenheim",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "오펜하임이 벤틀리를 팔고 모델Y를 산 뒤 직원 10대에 완전자율주행을 달겠다고 했습니다",
  summary:
    "오펜하임그룹 창업자는 부동산 50억 달러가 넘는 중개사입니다. 완전자율주행이 삶을 바꿨고 평균 운전자보다 8배 안전하다고 했습니다. 북미 판매의 재료가 되고 있다는 문장이 옆에 있습니다.",
  titleEn: "Jason Oppenheim sold a Bentley for a Model Y and will buy Teslas with FSD for 10 employees",
  summaryEn: "The Oppenheim Group founder called FSD life-changing and 8x safer. Sawyer says FSD is becoming a material driver of North American Tesla sales.",
  body: D(
    `제이슨 오펜하임은 오펜하임그룹 창업자입니다. 부동산 중개 규모는 50억 달러가 넘습니다.

벤틀리를 팔고 모델Y를 샀습니다. 완전자율주행에 반해 직원 10대에 테슬라와 완전자율주행을 사겠다고 했습니다.

가장 중요한 영상을 올렸다고 했습니다. 어젯밤 형에게 전화해 한 대를 사라고 했고, 아내와 이야기하는 동안 형이 이미 한 대를 골랐습니다. 평균 운전자보다 8배 안전하다고 했습니다.`,
    `소여 메리트는 북미에서 완전자율주행이 테슬라 판매의 재료가 되고 있다고 했습니다. 영상과 이야기가 더 이상 일화가 아니라는 문장입니다.

다른 완성차도 이 소프트웨어를 라이선스해야 한다는 글이 같은 주에 있습니다. 다음 확인할 것은 분기 구독 숫자입니다. 한 사람의 구매와 전체 판매를 한 비율로 만들지 않습니다.`,
    teslaHouse("고액 자산가가 차종을 바꾸고 직원 차로 늘리면 소프트웨어가 판매 이유의 앞에 옵니다."),
  ),
  nick: "오펜하임십대",
  wall: "오펜하임 벤틀리 팔고 모델Y. FSD 삶바꿈. 직원 10대 산대. 평균보다 8배 안전. 북미 판매 재료라는 글",
  c1: "50억은 중개 규모야. 주식 매수가 아니야",
  c2: "8배는 그 사람 문장이야. 공식 사고율이 다음이야",
  analyst: "오펜하임은 벤틀리를 팔고 모델Y를 산 뒤 직원 10대에 완전자율주행을 달겠다고 했습니다. 평균 운전자보다 8배 안전하다는 문장입니다.",
});

push({
  id: "seed-1896",
  slug: "tsla-fsd-denmark",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "덴마크가 감독 완전자율주행을 사람들 앞에 바로 올립니다",
  summary:
    "헤르닝 모터쇼에서 이번 주말 모델3나 모델Y로 체험할 수 있습니다. 프라하 행사 다음으로 유럽 나라가 공세에 나갑니다. 독일은 아직 기다리는 칸입니다.",
  titleEn: "Tesla is bringing supervised FSD to people in Denmark now",
  summaryEn: "Herning motor-show visitors can try it in a Model 3 or Model Y this weekend. After Prague, more of Europe is going on offense. Germany is still waiting.",
  body: D(
    `테슬라가 덴마크에 감독 완전자율주행을 사람들 앞에 바로 올립니다.

헤르닝 모터쇼에서 이번 주말 방문객이 모델3나 모델Y로 체험할 수 있습니다. 사전 예약이 없어도 될 만큼 관심이 크다는 문장입니다.

어제 프라하 큰 행사 뒤로 더 많은 유럽 나라가 공세에 나갑니다. 독일은 아직 기다리는 칸입니다. 이 주가 유럽에서 여덟 번째 나라로 들어간 주라는 목록도 있습니다.`,
    `아랍에미리트는 완전자율주행과 로보택시 시험을 승인할 자리에 있습니다. 앱스토어에 로보택시 앱이 더 많은 나라에 열린 주와 겹칩니다.

다음 확인할 것은 독일 일정이 숫자로 내려오는 날입니다. 체험 창과 구독 판매를 한 단계로 부르지 않습니다.`,
    teslaHouse("유럽 체험 창이 나라마다 열리면 구독 매출이 인도 숫자와 따로 쌓일 자리가 생깁니다."),
  ),
  nick: "덴마크헤르닝",
  wall: "덴마크 FSD 감독 바로 체험. 헤르닝 모터쇼 주말 3·Y. 프라하 다음 유럽 공세. 독일은 대기. 이번주 8번째 나라",
  c1: "체험 창이야. 무인 허가가 아니야",
  c2: "독일이 남았어. 유럽 표가 아직 안 닫혀",
  analyst: "덴마크는 이번 주말 헤르닝 모터쇼에서 감독 완전자율주행을 체험합니다. 프라하 다음으로 유럽이 공세에 나갑니다.",
});

push({
  id: "seed-1897",
  slug: "tsla-robotaxi-app",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
    title: "테슬라 로보택시 앱이 영국·독일·이탈리아·스웨덴·싱가포르·호주 스토어에 올랐습니다",
  summary:
    "애플 앱스토어와 구글 플레이에서 더 많은 나라가 내려받을 수 있습니다. 내려받기와 그 도시 호출은 다른 칸입니다. 확장이 가깝다는 신호로 읽힙니다.",
  titleEn: "The Tesla Robotaxi app is now downloadable in the UK, Germany, Italy, Sweden, Singapore and Australia",
  summaryEn: "Apple App Store and Google Play opened in many more countries. Download access is not the same as live rides in those cities.",
  body: D(
    `테슬라 로보택시 앱이 더 많은 나라 스토어에 올랐습니다.

애플 앱스토어와 구글 플레이입니다. 영국, 독일, 이탈리아, 스웨덴, 싱가포르, 호주가 그 목록에 있습니다.

화면에는 5분 뒤 도착, 오스틴 픽업이 보입니다. 스토어가 열린 것과 그 도시에서 호출이 되는 것은 다른 칸입니다.`,
    `앱이 먼저 깔리면 대기 줄이 생기고, 허가와 차량이 따라옵니다. 오스틴에서 사이버캡이 늘고 댈러스가 가깝다는 주와 겹칩니다.

다음 확인할 것은 내려받기 가능 나라에서 실제 호출 도시가 공고되는 날입니다. 스토어 목록과 운행 도시를 한 표로 더하지 않습니다.`,
    teslaHouse("스토어가 먼저 열리면 로보택시가 한 도시 실험에서 제품 칸으로 올라갑니다."),
  ),
  nick: "앱스토어여섯",
  wall: "로보택시 앱 영국 독일 이탈리아 스웨덴 싱가포르 호주 스토어. 내려받기≠그 도시 호출. 화면은 오스틴 5분",
  c1: "스토어 오픈이야. 그 나라 운행 허가가 아니야",
  c2: "오스틴 화면이랑 유럽 스토어를 한 도시로 보지 마",
  analyst: "테슬라 로보택시 앱이 영국·독일·이탈리아·스웨덴·싱가포르·호주 스토어에 올랐습니다. 내려받기와 실제 호출은 다른 칸입니다.",
});

push({
  id: "seed-1898",
  slug: "tsla-giga-cybercab",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "기가텍사스 주차장 옥상에 사이버캡이 쌓이고 있습니다",
  summary:
    "지난주 3분기 막바지에는 사이버트럭과 모델Y가 그 자리에 있었습니다. 오늘은 사이버캡만 남았습니다. 옥상에 두는 것인지 밖으로 실어 가는 것인지는 아직 갈립니다.",
  titleEn: "Cybercabs are accumulating on the Giga Texas parking-garage roof",
  summaryEn: "Cybertruck and Model Y sat there last week before quarter-end. Today almost only Cybercabs remain. About a dozen already wear the logo.",
  body: D(
    `조 테그트마이어가 기가텍사스 주차장 옥상을 찍었습니다. 오늘 사이버캡이 그 자리에 쌓여 있습니다.

지난주 3분기가 끝나기 직전에는 사이버트럭과 모델Y가 대부분 그 자리에 있었습니다. 오늘은 그 차들이 거의 사라지고 사이버캡만 남았습니다.

옥상에 보관하는 것인지, 일부를 밖으로 실어 가는 것인지는 아직 갈립니다. 사이버캡 로고가 붙은 차가 열두 대 남짓 보입니다.`,
    `3분기 인도를 위해 재고를 옥상에 올렸다가 비운 자리로 읽힙니다. 빈 칸에 사이버캡이 들어오는 것은 생산이 흘러나온다는 힌트입니다.

제프 루츠가 말한 기가텍사스 출고와 같은 방향입니다. 다음 확인할 것은 옥상 대수와 오스틴 도로 목격이 같이 늘어나는지입니다. 옥상 사진과 인가 대수를 한 숫자로 부르지 않습니다.`,
    teslaHouse("공장이 사이버캡을 옥상에 쌓기 시작하면 출고가 실적 이야기 앞에 옵니다."),
  ),
  nick: "옥상사이버캡",
  wall: "기가텍사스 주차장 옥상 오늘 사이버캡. 지난주엔 사이버트럭·Y. 로고 붙은 차 열두대 남짓. 보관인지 반출인지 갈림",
  c1: "옥상 사진이야. 인도 대수가 아니야",
  c2: "지난주 재고랑 오늘 사이버캡을 한 분기로 더하지 마",
  analyst: "기가텍사스 주차장 옥상에 사이버캡이 쌓이고 있습니다. 지난주 3분기 막바지에는 사이버트럭과 모델Y가 그 자리에 있었습니다.",
});

push({
  id: "seed-1899",
  slug: "tsla-germany-268",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "독일 지난달 테슬라 등록이 268% 늘었습니다",
  summary:
    "한 달 등록이 크게 뛴 자리입니다. 네덜란드 1·2위와 같은 9월 표의 다른 나라입니다. 새 모델Y가 그 증가의 앞에 있습니다.",
  titleEn: "Tesla registrations in Germany surged 268% last month",
  summaryEn: "A sharp monthly jump. It sits beside the Dutch 1-2 finish as another September print. The new Model Y is in front of that rise.",
  body: D(
    `독일 지난달 테슬라 등록이 268% 늘었습니다. 큰 증가입니다.

새 모델Y 사진이 그 문장 옆에 있습니다. 수요가 다시 살아난 달로 읽힙니다.

유럽에서 프랑스와 스웨덴, 네덜란드가 같은 9월을 먼저 열었습니다. 독일이 큰 나라 칸을 채운 자리입니다.`,
    `독일은 유럽에서 아직 감독 완전자율주행 일정이 기다리는 나라입니다. 등록이 먼저 살아나고 소프트웨어 창이 뒤에 오는 흐름입니다.

다음 확인할 것은 영국 9월 표입니다. 증가율과 대수를 한 평균으로 만들지 않습니다. 한 달 급증을 연간 점유율로 바꾸지 않습니다.`,
    teslaHouse("유럽 큰 나라 등록이 살아나면 3분기 인도 해석이 밝아집니다."),
  ),
  nick: "독일이백육십팔",
  wall: "독일 지난달 테슬라 등록 +268%. 새 모델Y. 프랑스·스웨덴·네덜란드랑 같은 9월의 다른 나라",
  c1: "268은 증가율이야. 대수가 나오면 그때 표에 올려",
  c2: "독일 FSD 창은 아직이야. 등록이랑 체험을 한 칸으로 보지 마",
  analyst: "독일 지난달 테슬라 등록이 268% 늘었습니다. 새 모델Y가 그 증가의 앞에 있습니다.",
});

push({
  id: "seed-1900",
  slug: "tsla-fsd-subs",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "2분기 이후 매달 활성 완전자율주행 구독이 약 23만 명씩 늘었습니다",
  summary:
    "3분기에 월간 활성 구독 100만 명이 놀랍지 않다는 문장입니다. 그 자리에 가려면 3분기에 약 33만 4,000명이 더 필요합니다. 하드웨어 4와 3을 이미 쓰는 고객이 많습니다.",
  titleEn: "About 230,000 new monthly active FSD subscribers have been added since Q2",
  summaryEn: "A run-rate toward 1 million monthly active FSD subs in Q3 would need about 334,000 more. Many HW4 and HW3 owners already use it.",
  body: D(
    `2분기 이후 매달 활성 완전자율주행 구독이 약 23만 명씩 늘었습니다.

3분기에 월간 활성 구독 100만 명이 놀랍지 않다는 문장입니다. 그 자리에 가려면 이번 분기에 약 33만 4,000명이 더 필요합니다.

하드웨어 4와 하드웨어 3을 이미 쓰는 고객이 많습니다. 점프가 나와도 놀라운 일은 아니라는 자리입니다.`,
    `판매 때 고른 비율과 나중에 켠 구독은 다른 칸입니다. 북미에서 영상이 퍼지고 유럽 체험 창이 열리는 주와 겹칩니다.

다음 확인할 것은 3분기 실적에서 구독 숫자를 회사가 따로 말하는지입니다. 월간 증가와 누적 100만을 한 주에 더하지 않습니다.`,
    teslaHouse("구독이 매달 쌓이면 차량 인도 외에 소프트웨어 매출이 따로 커집니다."),
  ),
  nick: "구독이십삼만",
  wall: "Q2 이후 매달 활성 FSD 구독 약 23만 추가. Q3 100만도 가능. 가려면 이번분기 약 33.4만 더. HW4·HW3 이미 많대",
  c1: "23만은 매달 증가야. 누적 전체가 아니야",
  c2: "100만은 전망이야. 공시 숫자가 다음이야",
  analyst: "2분기 이후 매달 활성 완전자율주행 구독이 약 23만 명씩 늘었습니다. 3분기 100만 명에 가려면 약 33만 4,000명이 더 필요합니다.",
});

push({
  id: "seed-1901",
  slug: "tsla-credit-30b",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "테슬라가 신용한도를 50억 달러에서 300억 달러로 늘립니다",
  summary:
    "사이버캡, 옵티머스, 인공지능 슈퍼컴퓨터, 새 공장에 쓸 자금입니다. 같은 주 목록에는 3분기 인도 66만 6,000대와 슈퍼차저 8만 5,000칸이 있습니다.",
  titleEn: "Tesla is raising its credit line from $5 billion to $30 billion",
  summaryEn: "The facility funds Cybercabs, Optimus, AI supercomputers and new factories. The same week list also has 666,000 Q3 deliveries and 85,000 Supercharger stalls.",
  body: D(
    `테슬라가 신용한도를 50억 달러에서 300억 달러로 늘립니다.

사이버캡과 옵티머스, 인공지능 슈퍼컴퓨터, 새 공장에 쓸 자금입니다. 같은 주 목록의 네 번째 줄입니다.

3분기 인도는 세제 혜택 없이 66만 6,000대라는 문장이 같은 목록에 있습니다. 슈퍼차저는 8만 5,000칸을 넘겼고, 세미는 기가네바다에서 생산을 시작했습니다.`,
    `옵티머스는 램을 줄여 지연을 피하며 양산에 들어갑니다. 모델3와 모델Y는 더 큰 화면과 더 빠른 가속, 더 긴 항속으로 올라갑니다.

다음 확인할 것은 신용한도 공시 문서입니다. 한도 확대와 실제 인출을 한 단계로 부르지 않습니다. 인도 대수와 한도 금액을 한 공식으로 나누지 않습니다.`,
    teslaHouse("큰 신용한도는 사이버캡과 옵티머스 캐펙스를 실적과 따로 밀어 올립니다."),
  ),
  nick: "신용삼백억",
  wall: "테슬라 신용한도 50억→300억. 사이버캡·옵티머스·AI슈퍼컴·새공장. 같은주 Q3 인도 66.6만, 슈퍼차저 8.5만칸, 세미 네바다",
  c1: "300억은 한도야. 이미 쓴 돈이 아니야",
  c2: "66.6만은 인도야. 한도랑 나누지 마",
  analyst: "테슬라는 신용한도를 50억 달러에서 300억 달러로 늘립니다. 사이버캡과 옵티머스, 슈퍼컴퓨터, 새 공장에 씁니다.",
});

push({
  id: "seed-1902",
  slug: "tsla-gas-below-50",
  category: "시장분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "세계 신차에서 가솔린 차 비중이 처음 50% 아래로 내려갔습니다",
  summary:
    "상반기 가솔린 차 판매는 하이브리드를 빼고 2,025만 대로 전년보다 10% 줄었습니다. 전체에서 차지하는 비중은 3%포인트 내린 49%입니다. 90개국에서 전기차 판매가 늘었습니다.",
  titleEn: "Gasoline cars fell below 50% of global vehicle sales for the first time",
  summaryEn: "First-half gas-car sales, excluding hybrids, fell 10% to 20.25 million. Their share slipped 3 points to 49%. EV sales rose in as many as 90 countries.",
  body: D(
    `세계 신차에서 가솔린 차 비중이 처음 50% 아래로 내려갔습니다.

상반기 가솔린 차 판매는 하이브리드를 빼고 2,025만 대입니다. 전년보다 10% 줄었습니다. 전체에서 차지하는 비중은 3%포인트 내린 49%입니다.

상반기에 전기차 판매가 전년보다 늘어난 나라는 90개국입니다. 연료 가격이 그 이동을 밀었다는 제목이 옆에 있습니다.`,
    `네덜란드에서 테슬라가 전체 신차 1·2위를 차지한 달과 같은 흐름입니다. 가솔린이 절반 아래로 내려가면 전기차 회사의 주소가 넓어집니다.

다음 확인할 것은 하반기에도 비중이 49% 아래에 머무는지입니다. 하이브리드를 뺀 가솔린과 전기차를 한 표로 더하지 않습니다.`,
    teslaHouse("가솔린이 절반 아래로 내려가면 모델Y 수요가 나라 표에서 더 자주 꼭대기에 옵니다."),
  ),
  nick: "가솔린사십구",
  wall: "세계 신차 가솔린 비중 첫 50% 아래. 상반기 2025만대 -10%, 비중 49%. EV 성장 나라 90. 하이브리드 뺀 숫자",
  c1: "2025만은 가솔린이야. 하이브리드를 뺀 칸이야",
  c2: "49%랑 90개국을 한 평균으로 만들지 마",
  analyst: "세계 신차에서 가솔린 차 비중이 처음 50% 아래로 내려갔습니다. 상반기 판매는 2,025만 대, 비중은 49%입니다.",
});

push({
  id: "seed-1903",
  slug: "tsla-spcx-merge",
  category: "특집",
  color: "purple",
  subject: "테슬라",
  tickers: ["TSLA", "SPCX"],
  title: "캘시에서 테슬라와 스페이스X가 2028년 전에 합쳐질 확률이 70%입니다",
  summary:
    "캐시 우드는 그 합병이 일어날 것으로 봅니다. 화성과 스타링크, 가장 싼 대규모 연산이 한 그림이라는 문장입니다. 확률과 한 사람의 전망을 한 확정으로 부르지 않습니다.",
  titleEn: "Kalshi prices a 70% chance Tesla and SpaceX merge before 2028",
  summaryEn: "Cathie Wood also thinks the combination happens. Mars, Starlink, and the most compute at the lowest cost sit in one picture. A market odds is not a deal.",
  body: D(
    `캘시에서 테슬라와 스페이스X가 2028년 전에 합쳐질 확률이 70%입니다.

캐시 우드는 그 합병이 일어날 것으로 봅니다. 일론 머스크의 더 큰 장기 그림의 일부라는 문장입니다.

최종 목표는 화성입니다. 스타링크는 이미 크고 이익이 나는 연결 사업입니다. 인공지능 리더는 가장 싼 비용으로 가장 많은 연산을 가진 회사가 된다는 자리입니다.`,
    `예측 시장 확률은 베팅이 모인 숫자입니다. 이사회 결의와는 다른 칸입니다. 두 회사 주가가 같은 주에 같이 움직인 자리와 겹칩니다.

다음 확인할 것은 공시나 주주 투표 일정이 붙는지입니다. 확률과 목표 주가를 한 공식으로 곱하지 않습니다.`,
    teslaHouse("아크인베스트는 두 회사가 한 그림으로 가는 전망을 유지합니다. 캘시 숫자는 그 전망과 나란히 둡니다."),
  ),
  nick: "캘시칠십",
  wall: "Kalshi TSLA+SPCX 2028전 합병 70%. 캐시우드도 그 방향. 화성·스타링크·싼 연산. 확률≠딜",
  c1: "70%는 예측시장이야. 계약서가 아니야",
  c2: "캐시 우드 전망이랑 캘시를 한 확정으로 부르지 마",
  analyst: "캘시에서 테슬라와 스페이스X가 2028년 전에 합쳐질 확률은 70%입니다. 캐시 우드도 그 합병이 일어날 것으로 봅니다.",
});

push({
  id: "seed-1904",
  slug: "nvda-6t",
  category: "종목분석",
  color: "blue",
  subject: "엔비디아",
  tickers: ["NVDA"],
  title: "엔비디아가 사상 최고가로 세계 첫 시가총액 6조 달러 회사가 됐습니다",
  summary:
    "바차트 속보입니다. 모건스탠리는 젠슨 황을 만난 뒤 반도체 최선호주로 다시 꼽았습니다. 나스닥도 같은 밤 사상 최고로 닫았습니다.",
  titleEn: "Nvidia jumped to an all-time high as the world's first $6 trillion company",
  summaryEn: "A Barchart breaking note. Morgan Stanley named Nvidia its top semiconductor pick again after meeting Jensen Huang. The Nasdaq also closed at a record.",
  body: D(
    `엔비디아가 사상 최고가로 뛰어 세계에서 처음 시가총액 6조 달러 회사가 됐습니다.

바차트가 올린 속보입니다. 같은 밤 나스닥은 286.45포인트, 1.05% 오른 2만 7,477.31로 사상 최고 종가입니다.

모건스탠리는 지난 2일 젠슨 황을 만난 뒤 엔비디아를 반도체 업종 최선호주로 다시 꼽았습니다. 대형 기술주가 금리를 이기고 올린 밤입니다.`,
    `앤트로픽이 2028년까지 엔비디아 하드웨어 2.6기가와트를 계약했다는 글이 같은 흐름에 있습니다. 폭스콘 3분기 매출도 서버 쪽 온기를 받칩니다.

다음 확인할 것은 수요일 9월 연방공개시장위원회 의사록입니다. 시가총액 이정표와 수주 기가와트를 한 배수로 나누지 않습니다.`,
    `모건스탠리는 엔비디아를 반도체 최선호주로 다시 둡니다. 시가총액 이정표가 그 선호의 하루 숫자입니다.

씨티그룹은 가속 칩 수요 전망을 클라우드 캐펙스와 같이 봅니다. 두 하우스 숫자를 평균 내지 않습니다.`,
  ),
  nick: "엔비육조",
  wall: "NVDA 사상최고, 세계 첫 시총 6조달러. 나스닥 27477.31 +1.05% 최고종가. MS 젠슨 만난 뒤 반도체 최선호",
  c1: "6조는 시총이야. 매출이 아니야",
  c2: "나스닥 최고랑 엔비 시총을 한 퍼센트로 나누지 마",
  analyst: "엔비디아는 사상 최고가로 세계 첫 시가총액 6조 달러 회사가 됐습니다. 나스닥도 2만 7,477.31로 사상 최고 종가입니다.",
});

push({
  id: "seed-1905",
  slug: "nvda-anthropic",
  category: "종목분석",
  color: "blue",
  subject: "엔비디아",
  tickers: ["NVDA"],
  title: "앤트로픽이 2028년까지 엔비디아 하드웨어 2.6기가와트를 계약했습니다",
  summary:
    "엔비디아가 말한 물량입니다. 하이퍼스케일러와 네오클라우드를 합친 앤트로픽 계약 총액은 1,800억 달러를 넘습니다. 배송 창은 2028년까지입니다.",
  titleEn: "Anthropic contracted 2.6 GW of Nvidia hardware to ship through 2028",
  summaryEn: "Nvidia said so. Anthropic's total contract value across hyperscalers and neoclouds exceeds $180 billion.",
  body: D(
    `베스 킨디그의 글입니다. 엔비디아가 앤트로픽이 하드웨어 2.6기가와트를 계약했다고 했습니다.

배송은 2028년까지입니다. 하이퍼스케일러와 네오클라우드를 합친 앤트로픽 계약 총액은 1,800억 달러를 넘습니다.

알파벳, AMD, 마이크로소프트, 아마존, 구글이 같은 줄에 티커로 붙어 있습니다. 한 고객의 전력이 여러 클라우드 위에 올라간 자리입니다.`,
    `스페이스X와 xAI가 10기가와트 초기 목표의 40%를 외부 고객으로 열어 둔 그림과 같은 주에 있습니다. 앤트로픽은 그 외부 칸의 이름 중 하나입니다.

다음 확인할 것은 분기 실적에서 이 계약이 매출로 잡히는 시점입니다. 전력과 계약 총액을 한 단가로 나누지 않습니다.`,
    `모건스탠리는 가속 칩 수요 전망을 클라우드 캐펙스와 같이 봅니다. 2.6기가와트는 그 전망의 한 고객 숫자입니다.

골드만삭스는 대형 언어모델 학습 수요가 여러 해 간다는 밸류에이션을 유지합니다. 두 하우스 숫자를 평균 내지 않습니다.`,
  ),
  nick: "앤트로픽이점이육",
  wall: "앤트로픽 NVDA 하드웨어 2.6GW, 2028까지 배송. 하이퍼+네오클라우드 계약 총액 1800억달러 넘김",
  c1: "2.6기는 전해야. 1800억은 계약 총액이야",
  c2: "배송 창이 2028이야. 올해 매출로 다 잡지 마",
  analyst: "앤트로픽은 2028년까지 엔비디아 하드웨어 2.6기가와트를 계약했습니다. 계약 총액은 1,800억 달러를 넘습니다.",
});

push({
  id: "seed-1906",
  slug: "mu-ni-outlook",
  category: "어닝",
  color: "orange",
  subject: "마이크론",
  tickers: ["MU"],
  title: "마이크론 예상 순이익이 2027년 1,990억 달러로 잡혀 있습니다",
  summary:
    "2025년 85억 달러, 2026년 850억 달러, 그다음 해가 1,990억 달러입니다. 두 해 만에 약 25배입니다. 마이크로소프트와 아마존을 넘길 자리라는 문장입니다.",
  titleEn: "Micron's expected net income is $8.5 billion, then $85 billion, then $199 billion in 2027",
  summaryEn: "That is nearly 25 times in two years and on a path that could pass Microsoft and Amazon. A visual card, not a filed guide.",
  body: D(
    `인베스팅 비주얼 카드입니다. 마이크론 예상 순이익입니다.

2025년 85억 달러, 2026년 850억 달러, 2027년 1,990억 달러입니다. 두 해 만에 약 25배입니다.

마이크로소프트와 아마존을 넘길 자리라는 문장이 붙어 있습니다. 매출과 잉여현금흐름, 지역 비중이 같은 카드에 있습니다.`,
    `메모리 가격과 고대역폭메모리 공급 부족이 그 기울기의 배경입니다. 한국 삼성전자와 SK하이닉스 잠정실적 주와 같은 달에 있습니다.

다음 확인할 것은 회사가 가이던스로 받아 적는지입니다. 카드 숫자와 공시 실적을 한 칸으로 부르지 않습니다.`,
    `모건스탠리는 메모리 업황 회복 전망을 고대역폭메모리 수요와 같이 봅니다. 순이익 기울기가 그 전망의 하루 그림입니다.

골드만삭스는 공급 부족이 여러 분기로 간다는 밸류에이션을 유지합니다. 두 하우스 숫자를 평균 내지 않습니다.`,
  ),
  nick: "마이크론천구백구십",
  wall: "MU 예상 NI 2025 85억, 2026 850억, 2027 1990억. 두해 약 25배. MSFT·AMZN 넘길 자리라는 카드",
  c1: "카드 전망이야. 가이던스 공시가 아니야",
  c2: "85억이랑 1990억을 한 해 숫자로 섞지 마",
  analyst: "마이크론 예상 순이익은 2025년 85억 달러, 2026년 850억 달러, 2027년 1,990억 달러입니다. 두 해 만에 약 25배입니다.",
});

push({
  id: "seed-1907",
  slug: "foxconn-q3",
  category: "어닝",
  color: "orange",
  subject: "폭스콘",
  tickers: ["MACRO"],
  title: "폭스콘 3분기 매출이 954억 달러로 예상을 넘겼습니다",
  summary:
    "전년보다 47% 늘었고 예상 890억 달러를 웃돌았습니다. 9월 한 달만 365억 달러, 38% 증가입니다. 대만달러 기준 한 달이 처음 1조 원을 넘긴 달입니다.",
  titleEn: "Foxconn's third-quarter sales were $95.4 billion, beating $89 billion",
  summaryEn: "Up 47% year on year. September alone was a record $36.5 billion, up 38%, the first month ever above NT$1 trillion.",
  body: D(
    `폭스콘 3분기 매출은 954억 달러입니다. 전년보다 47% 늘었고 예상 890억 달러를 넘겼습니다.

9월 한 달만 365억 달러로 38% 늘었습니다. 대만달러로 한 달이 처음 1조 원을 넘긴 달입니다.

엔비디아의 가장 큰 서버 제조사 중 하나가 가장 큰 분기 중 하나를 찍은 자리입니다.`,
    `인공지능 서버가 조립 매출을 끌어 올린 분기로 읽힙니다. 엔비디아 시가총액 이정표와 같은 주의 공급망 숫자입니다.

다음 확인할 것은 4분기 가이던스입니다. 분기 매출과 9월 한 달을 한 합으로 더하지 않습니다. 달러와 대만달러를 한 환율로 나누어 새 숫자를 만들지 않습니다.`,
    `골드만삭스는 대만 조립 업체의 인공지능 서버 전망을 유지합니다. 954억 달러가 그 전망의 한 분기 숫자입니다.

모건스탠리는 공급망 캐펙스 밸류에이션을 엔비디아 수요와 같이 봅니다. 두 하우스 숫자를 평균 내지 않습니다.`,
  ),
  nick: "폭스콘구백오십사",
  wall: "폭스콘 Q3 매출 954억달러 +47%, 예상 890억 상회. 9월만 365억 +38%. 대만달러 월매출 첫 1조",
  c1: "954는 분기고 365는 9월이야. 더하지 마",
  c2: "1조는 대만달러야. 954억 달러랑 단위가 달라",
  analyst: "폭스콘 3분기 매출은 954억 달러로 예상 890억 달러를 넘겼습니다. 9월 한 달은 365억 달러입니다.",
});

push({
  id: "seed-1908",
  slug: "tsmc-terafab",
  category: "종목분석",
  color: "blue",
  subject: "TSMC",
  tickers: ["TSM"],
  title: "일론 머스크가 텍사스 테라팹에서 TSMC와 칩 파트너십을 논의 중이라고 확인했습니다",
  summary:
    "폴리마켓이 올린 확인입니다. 테라팹은 자체 주문형 반도체를 만들려는 공장입니다. 지정학 위험을 피하려는 자리라는 문장이 옆에 있습니다.",
  titleEn: "Elon Musk confirmed TSMC is discussing a chip partnership at the planned Texas Terafab",
  summaryEn: "A Polymarket just-in. Terafab is meant to make proprietary ASICs and to dodge geopolitical risk.",
  body: D(
    `폴리마켓 속보입니다. 일론 머스크가 TSMC와 텍사스 테라팹 칩 파트너십을 논의 중이라고 확인했습니다.

테라팹은 자체 주문형 반도체를 만들려는 공장입니다. 지정학 위험을 피하려는 자리라는 문장이 붙어 있습니다.

스페이스X와 xAI, 테슬라가 같이 쓰는 연산의 칩을 텍사스에서 찍으려는 그림입니다.`,
    `고대역폭메모리와 기판, 광학, 변압기, 냉각이 같이 부족한 주입니다. 파운드리 파트너가 붙으면 그 병목의 한쪽이 열립니다.

다음 확인할 것은 양해각서나 투자 규모가 숫자로 내려오는 날입니다. 논의와 착공을 한 단계로 부르지 않습니다.`,
    `모건스탠리는 파운드리 증설 전망을 인공지능 캐펙스와 같이 봅니다. 테라팹 논의가 그 전망의 하루 힌트입니다.

골드만삭스는 TSMC 목표 주가를 종가와 따로 둡니다. 논의 한 줄과 목표 주가를 한 공식으로 곱하지 않습니다.`,
  ),
  nick: "테라팹티에스엠씨",
  wall: "머스크 확인. TSMC와 텍사스 테라팹 칩 파트너십 논의. 자체 ASIC. 지정학 위험 회피. 착공 아님",
  c1: "논의 확인이야. 계약서 공시가 아니야",
  c2: "테라팹이 공장이면 TSMC는 파트너 칸이야",
  analyst: "일론 머스크는 텍사스 테라팹에서 TSMC와 칩 파트너십을 논의 중이라고 확인했습니다. 자체 주문형 반도체를 찍으려는 공장입니다.",
});

push({
  id: "seed-1909",
  slug: "spcx-20gw-xai",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "스페이스X와 xAI가 연산 10기가와트, 장기 20기가와트를 목표로 잡았습니다",
  summary:
    "지금은 약 3.6기가와트입니다. 초기 10기가와트는 내부 60%, 외부 40%입니다. 2027년 말 스페이스 마인, 2028년 달 배치가 일정에 있습니다.",
  titleEn: "SpaceX and xAI are targeting 10 GW of compute and a 20 GW long-term goal",
  summaryEn: "Up from about 3.6 GW now. The first 10 GW is 60% internal and 40% external. A Space Mine is slated for late 2027 and a lunar deployment for 2028.",
  body: D(
    `피이퀴티 리서치 카드입니다. 스페이스X와 xAI의 인공지능 데이터센터, 테라팹, 공급망 전략입니다.

연산 목표는 10기가와트, 장기는 20기가와트입니다. 지금은 약 3.6기가와트입니다. 초기 10기가와트는 내부 60%, 외부 40%입니다. 내부는 xAI와 스페이스X, 테슬라입니다. 외부는 앤트로픽과 구글입니다.

지상 사이트에 더해 2027년 말 스페이스 마인 궤도 데이터센터, 2028년 달 배치가 있습니다. 멤피스와 사우스헤이븐은 그리드 3.6기가와트, 가스 4기가와트, 터빈 2기가와트, 메가팩 2기가와트를 섞습니다.`,
    `기판과 광학 모듈, 변압기, 냉각이 공급 제약입니다. 테라팹은 지정학 위험을 피하려고 자체 칩을 찍으려는 공장입니다.

다음 확인할 것은 외부 40%가 계약으로 내려오는 이름입니다. 지상 전력과 궤도 일정을 한 합으로 더하지 않습니다.`,
    spacexHouse("10기가와트 목표가 열리면 네오클라우드 매출이 발사 매출과 따로 쌓입니다."),
  ),
  nick: "연산이십기",
  wall: "SPCX·xAI 연산 10GW 목표, 장기 20GW. 현재 약 3.6. 초기 내부60 외부40. 스페이스마인 2027말, 달 2028. 멤피스 전력 믹스",
  c1: "10은 목표야. 3.6이 지금이야",
  c2: "내부 60이랑 외부 40을 한 고객으로 보지 마",
  analyst: "스페이스X와 xAI는 연산 10기가와트, 장기 20기가와트를 목표로 합니다. 지금은 약 3.6기가와트입니다. 초기 내부는 60%, 외부는 40%입니다.",
});

push({
  id: "seed-1910",
  slug: "spcx-cape-pipe",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "스페이스X가 케이프커내버럴까지 32.4마일 천연가스관을 놓으려 합니다",
  summary:
    "스타십 발사 연료를 대기 위해서입니다. 액화천연가스 트럭 수백 대에 기대지 않으려는 자리입니다. 플로리다 공공서비스위원회 서류가 그 옆에 있습니다.",
  titleEn: "SpaceX is seeking approval for a 32.4-mile natural-gas pipeline to Cape Canaveral",
  summaryEn: "A direct pipe would cut reliance on hundreds of LNG truckloads per launch and help frequent Starship flights.",
  body: D(
    `도지디자이너 속보입니다. 스페이스X가 케이프커내버럴까지 32.4마일 천연가스관을 놓으려 승인 신청을 했습니다.

스타십 발사 연료를 대는 관입니다. 발사마다 액화천연가스 트럭 수백 대에 기대지 않으려는 자리입니다.

플로리다 공공서비스위원회 서류 사진이 로켓과 같이 올라가 있습니다. 날짜는 서류 칸에 2026년 9월로 보입니다.`,
    `발사가 잦아지면 트럭 물류가 병목이 됩니다. 관이 열리면 케이프 일정이 스타십 주기에 맞춰집니다.

다음 확인할 것은 위원회 허가와 착공 달력입니다. 신청과 개통을 한 단계로 부르지 않습니다. 마일 숫자와 발사 횟수를 한 공식으로 곱하지 않습니다.`,
    spacexHouse("연료 관이 열리면 스타십 발사 빈도가 실적 이야기의 앞에 옵니다."),
  ),
  nick: "케이프삼십이",
  wall: "SPCX 케이프커내버럴 32.4마일 천연가스관 승인 신청. 스타십 연료. LNG 트럭 수백대 의존 축소. 플로리다 PSC 서류",
  c1: "신청이야. 관이 열린 날이 아니야",
  c2: "32.4마일은 길이야. 발사 횟수가 아니야",
  analyst: "스페이스X는 케이프커내버럴까지 32.4마일 천연가스관을 놓으려 승인을 신청했습니다. 스타십 발사 연료를 대기 위해서입니다.",
});

push({
  id: "seed-1911",
  slug: "spcx-unlock",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "스페이스X가 또 한 번의 락업 해제 앞에 5% 올랐습니다",
  summary:
    "이번 주 13% 오른 자리입니다. 다음 해제는 유통 물량을 약 25% 더 늘립니다. 8월 6일 첫 해제 때 9,100만 주가 시장에 나왔습니다.",
  titleEn: "SpaceX is up 5% today and 13% on the week before another unlock",
  summaryEn: "The next round adds about 25% more supply. 91 million shares hit the market on the first IPO unlock around August 6.",
  body: D(
    `알파의 글입니다. 스페이스X가 오늘 5%, 이번 주 13% 올랐습니다.

다음 락업 해제가 유통 물량을 약 25% 더 늘리기 전입니다. 첫 상장 해제 바닥이 이미 지나갔는지가 질문입니다.

8월 6일 전후에 9,100만 주가 시장에 나왔습니다. 해제 전후 수익률 칸은 마이너스 33%, 플러스 6%, 플러스 35%로 갈립니다.`,
    `모건스탠리가 싸다고 한 주와 물량이 늘어나는 주가 겹칩니다. 가격이 오르고 공급이 늘어나는 자리는 소화력을 보는 칸입니다.

다음 확인할 것은 실제 매도 물량이 호가에 붙는지입니다. 해제 주식과 당일 상승률을 한 공식으로 나누지 않습니다.`,
    spacexHouse("물량이 늘어나는 주에도 목표 주가를 유지한 자리가 오늘의 노트입니다."),
  ),
  nick: "락업이십오",
  wall: "SPCX 오늘 +5% 주간 +13%. 다음 락업이 유통 약 25% 더. 8/6 첫 해제 9100만주. 전후 -33 / +6 / +35",
  c1: "5%는 오늘이야. 25%는 물량이야",
  c2: "9100만은 첫 해제야. 다음 해제 물량이 아니야",
  analyst: "스페이스X는 다음 락업 해제 앞에 오늘 5%, 이번 주 13% 올랐습니다. 다음 해제는 유통 물량을 약 25% 더 늘립니다.",
});

push({
  id: "seed-1912",
  slug: "reflection-nebius",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "리플렉션이 2029년까지 스페이스X와 네비우스에 70억 달러가 넘는 연산을 넣습니다",
  summary:
    "엔비디아가 받친 리플렉션은 딥시크와 퀀에 맞설 오픈웨이트 모델을 준비합니다. 미국 기업이 국내 오픈웨이트 대안을 갖게 되는 자리입니다.",
  titleEn: "Nvidia-backed Reflection is lining up more than $7 billion of compute on SpaceX and Nebius through 2029",
  summaryEn: "An open-weight model to rival DeepSeek and Qwen. If it lands, U.S. enterprises get a domestic open-weight alternative.",
  body: D(
    `셰이 볼루어의 글입니다. 엔비디아가 받친 리플렉션이 딥시크와 퀀에 맞설 오픈웨이트 모델을 준비합니다.

2029년까지 스페이스X와 네비우스에 70억 달러가 넘는 연산을 넣습니다. 허가 다음 단계입니다.

이 모델이 내려오면 미국 기업이 국내 오픈웨이트 대안을 갖습니다. 오픈 랩이 장기 고객이 될 수 있다는 문장입니다.`,
    `스페이스X 외부 40% 칸에 들어갈 수 있는 이름입니다. 네비우스는 유럽 쪽 네오클라우드로 읽힙니다.

다음 확인할 것은 모델 공개일과 실제 사용량입니다. 연산 계약과 모델 성능을 한 배수로 곱하지 않습니다.`,
    spacexHouse("오픈웨이트 고객이 붙으면 네오클라우드 매출의 주소가 넓어집니다."),
  ),
  nick: "리플렉션칠십억",
  wall: "리플렉션 오픈웨이트, 딥시크·퀀 대항. 2029까지 SPCX·NBIS 연산 70억달러+. 미국 기업 국내 대안",
  c1: "70억은 연산 계약이야. 기업가치가 아니야",
  c2: "모델 준비야. 벤치마크 승리가 아니야",
  analyst: "리플렉션은 2029년까지 스페이스X와 네비우스에 70억 달러가 넘는 연산을 넣습니다. 딥시크와 퀀에 맞설 오픈웨이트 모델입니다.",
});

push({
  id: "seed-1913",
  slug: "tsla-optimus-night",
  category: "종목분석",
  color: "mint",
  subject: "테슬라",
  tickers: ["TSLA"],
  title: "테슬라가 프리몬트에서 옵티머스 야간 근무를 뽑고 있습니다",
  summary:
    "데이터 수집 부매니저와 제조 야간 자리 열 개가 올라왔습니다. 오스틴은 이미 하루 종일 돌아갑니다. 채용은 계획이고 출고 대수와는 다른 칸입니다.",
  titleEn: "Tesla is hiring an Optimus night shift at Fremont",
  summaryEn: "A data-collection associate manager plus about 10 manufacturing night-shift roles. Austin already runs around the clock. Postings are plans, not output.",
  body: D(
    `테슬라가 프리몬트에서 옵티머스 야간 근무를 뽑고 있습니다.

데이터 수집 부매니저 야간 자리와 제조 야간 자리 열 개가 같이 올라왔습니다. 오스틴은 이미 하루 종일 돌아갑니다.

채용 공고는 계획이고 출고 대수와는 다른 칸입니다. 같은 주 목록에는 옵티머스가 램을 줄여 양산에 들어간다는 줄이 있습니다.`,
    `야간이 붙으면 라인이 두 교대로 갑니다. 데이터 수집 자리가 같이 있는 것은 학습 데이터가 공장과 같이 쌓인다는 뜻입니다.

다음 확인할 것은 양산 대수 공시입니다. 채용 열 자리와 연간 로봇 대수를 한 공식으로 곱하지 않습니다.`,
    teslaHouse("공장이 야간을 열면 옵티머스가 파일럿에서 라인 칸으로 올라갑니다."),
  ),
  nick: "프리몬트야간",
  wall: "프리몬트 옵티머스 야간 채용. 데이터수집 부매니저+제조 야간 10자리. 오스틴은 이미 24시간. 공고≠출고",
  c1: "채용이야. 연간 대수가 아니야",
  c2: "오스틴 24시간이랑 프리몬트 야간을 한 공장으로 더하지 마",
  analyst: "테슬라는 프리몬트에서 옵티머스 야간 근무를 뽑고 있습니다. 데이터 수집 자리와 제조 야간 자리 열 개가 올라왔습니다.",
});

module.exports = { US };
