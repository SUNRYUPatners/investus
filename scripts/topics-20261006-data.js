const { US } = require("./data-20261006-us");
const by = Object.fromEntries(US.map((r) => [r.slug, r]));

function plain(s) {
  return String(s || "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
function sec(slug, name) {
  const body = by[slug].body;
  const re = new RegExp("■ " + name + "\\n\\n([\\s\\S]*?)\\n\\n■");
  const m = body.match(re);
  return plain(m ? m[1] : by[slug].summary);
}

module.exports = function (add) {
  const F = "2026.10.06";

  add("summary", "ROWS", "MACRO", {
    headline: "2026.10.06 한장 요약",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "171.09", title: "스페이스X는 7.63% 오른 171.09달러입니다", sub: "모건스탠리 목표 주가는 300달러입니다." },
      { color: "#60a5fa", fill: "#06121f", right: "6조$", title: "엔비디아가 세계 첫 시가총액 6조 달러 회사가 됐습니다", sub: "나스닥도 사상 최고 종가입니다." },
      { color: "#4ade80", fill: "#061209", right: "1·2위", title: "네덜란드 9월 신차에서 모델Y와 모델3가 1위와 2위입니다", sub: "전체 승용 표입니다. 한 달 점유율 8.7%입니다." },
      { color: "#22c55e", fill: "#0a1a0a", right: "169대", title: "텍사스 인가 사이버캡이 45대에서 169대로 늘었습니다", sub: "로보택시 전체는 589대입니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "SI", title: "스페이스XAI가 스페이스XSI로 이름을 바꿉니다", sub: "S1은 궤도 연산 위성입니다." },
      { color: "#fb7185", fill: "#1a0a10", right: "49%", title: "세계 신차에서 가솔린 비중이 처음 50% 아래로 내려갔습니다", sub: "상반기 비중은 49%입니다." },
      { color: "#c084fc", fill: "#1a0f2a", right: "70%", title: "캘시에서 테슬라와 스페이스X 합병 확률이 70%입니다", sub: "2028년 전입니다. 확률과 딜은 다른 칸입니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "25배", title: "마이크론 예상 순이익이 두 해 만에 약 25배로 잡혀 있습니다", sub: "2027년 칸은 1,990억 달러입니다." },
    ],
    caption: "171.09달러 · 엔비디아 6조 · 네덜란드 1·2위 · 사이버캡 169 · 가솔린 49% · 캘시 70%",
  }, {
    headline: "2026.10.06 Daily Snapshot",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "171.09", title: "SpaceX closed at $171.09, up 7.63%", sub: "Morgan Stanley keeps a $300 target." },
      { color: "#60a5fa", fill: "#06121f", right: "$6T", title: "Nvidia became the first $6 trillion company", sub: "The Nasdaq also closed at a record." },
      { color: "#4ade80", fill: "#061209", right: "1-2", title: "Model Y and Model 3 took 1st and 2nd in Dutch new cars", sub: "The whole market, not just EVs. Share 8.7%." },
      { color: "#22c55e", fill: "#0a1a0a", right: "169", title: "Texas authorized Cybercabs rose from 45 to 169", sub: "589 robotaxis are authorized in Texas." },
      { color: "#a78bfa", fill: "#120b1f", right: "SI", title: "SpaceXAI is becoming SpaceXSI", sub: "S1 is the first orbital compute satellite." },
      { color: "#fb7185", fill: "#1a0a10", right: "49%", title: "Gasoline cars fell below 50% of global sales", sub: "First-half share is 49%." },
      { color: "#c084fc", fill: "#1a0f2a", right: "70%", title: "Kalshi prices a 70% chance of a Tesla-SpaceX merger", sub: "Before 2028. Odds are not a deal." },
      { color: "#f59e0b", fill: "#1a1205", right: "25x", title: "Micron net income is modeled up about 25 times in two years", sub: "The 2027 row is $199 billion." },
    ],
    caption: "$171.09 · Nvidia $6T · Dutch 1-2 · Cybercab 169 · gasoline 49% · Kalshi 70%",
  });

  function pair(file, layout, pal, ko, en) {
    ko.footer = F;
    en.footer = F;
    ko.noteHead = "왜 중요한가";
    en.noteHead = "Why it matters";
    ko.quote = ko.quote || sec(file, "무슨 일인가요");
    ko.noteSub = ko.noteSub || sec(file, "조금만 더 알려드리면");
    const enBase = plain(by[file].titleEn + " " + by[file].summaryEn);
    en.quote = en.quote || enBase;
    en.noteSub = en.noteSub || enBase;
    add(file, layout, pal, ko, en);
  }
  const c3 = (a, b, c) => [a, b, c];

  pair("spcx-ms-300", "L1", "SPCX", {
    badge: "SPCX", title: "모건스탠리가 스페이스X 목표 주가 300달러를 다시 걸었습니다",
    heroIcon: "🚀", heroBig: "$300", heroSub: "오버웨이트입니다. 성장률을 맞추면 약 40% 싸 보입니다.",
    cards: c3(
      { icon: "📈", big: "171.09", mid: "+7.63%", sub: "어제 종가" },
      { icon: "📉", big: "40%", mid: "할인", sub: "거대 인공지능 동료 대비" },
      { icon: "🛰️", big: "15호기", mid: "스타십", sub: "앞으로 몇 주" },
    ),
  }, {
    badge: "SPCX", title: "Morgan Stanley keeps SpaceX at $300",
    heroIcon: "🚀", heroBig: "$300", heroSub: "Overweight. About 40% cheap versus mega-cap AI peers.",
    cards: c3(
      { icon: "📈", big: "171.09", mid: "+7.63%", sub: "Yesterday's close" },
      { icon: "📉", big: "40%", mid: "Discount", sub: "Growth-adjusted" },
      { icon: "🛰️", big: "Flight 15", mid: "Starship", sub: "Next few weeks" },
    ),
  });

  pair("spcx-spacexsi", "L4", "SPCX", {
    badge: "SPCX", badgeLine: "이름 변경", title: "스페이스XAI가 스페이스XSI로 이름을 바꿉니다",
    heroIcon: "✨", heroBig: "SI", heroSub: "슈퍼인텔리전스입니다. S1은 첫 세대 연산 위성입니다.",
    cards: c3(
      { icon: "🛰️", big: "S1", mid: "위성", sub: "궤도에 연산을 올립니다" },
      { icon: "🌌", big: "스타마인드", mid: "별자리", sub: "S1이 모이는 이름" },
      { icon: "✅", big: "확인", mid: "머스크", sub: "그 변경을 하겠다고 답했습니다" },
    ),
  }, {
    badge: "SPCX", badgeLine: "Rename", title: "SpaceXAI is becoming SpaceXSI",
    heroIcon: "✨", heroBig: "SI", heroSub: "Super Intelligence. S1 is the first compute satellite.",
    cards: c3(
      { icon: "🛰️", big: "S1", mid: "Satellite", sub: "Puts compute in orbit" },
      { icon: "🌌", big: "Starmind", mid: "Constellation", sub: "The name for the swarm" },
      { icon: "✅", big: "Yes", mid: "Musk", sub: "He confirmed the change" },
    ),
  });

  pair("tsla-nl-sep", "L5", "TSLA", {
    badge: "TSLA", title: "네덜란드 9월 신차에서 모델Y와 모델3가 1위와 2위입니다",
    heroIcon: "🇳🇱", heroBig: "1·2위", heroSub: "전기차 표가 아니라 전체 신차 표입니다.",
    before: { label: "모델3", big: "1,087", sub: "전체 2위 · +91%" },
    after: { label: "모델Y", big: "2,078", sub: "전체 1위 · +44.7%" },
    cards: c3(
      { icon: "🚗", big: "3,165", mid: "한 달", sub: "테슬라 등록" },
      { icon: "📊", big: "8.7%", mid: "점유", sub: "전체 신차" },
      { icon: "📅", big: "7,283", mid: "연간 Y", sub: "이미 1위" },
    ),
  }, {
    badge: "TSLA", title: "Model Y and Model 3 took 1st and 2nd in Dutch new cars",
    heroIcon: "🇳🇱", heroBig: "1-2", heroSub: "The entire market, not just EVs.",
    before: { label: "Model 3", big: "1,087", sub: "2nd overall · +91%" },
    after: { label: "Model Y", big: "2,078", sub: "1st overall · +44.7%" },
    cards: c3(
      { icon: "🚗", big: "3,165", mid: "Month", sub: "Tesla registrations" },
      { icon: "📊", big: "8.7%", mid: "Share", sub: "All new cars" },
      { icon: "📅", big: "7,283", mid: "YTD Y", sub: "Already first" },
    ),
  });

  pair("tsla-cybercab-sight", "L6", "TSLA", {
    badge: "TSLA", breaking: "하루 최고", title: "오스틴 사이버캡 목격이 8만 6,870건입니다",
    heroBig: "86,870", heroSub: "어제 목격입니다. 무인 운행은 670건입니다.",
    grid: [
      { icon: "👁️", big: "86,870", mid: "목격", sub: "하루 최고" },
      { icon: "🤖", big: "670", mid: "무인", sub: "감독과 다른 칸" },
      { icon: "🏭", big: "출고", mid: "기가텍사스", sub: "루츠의 네 조건" },
      { icon: "✅", big: "수요", mid: "선택", sub: "사람들이 고릅니다" },
    ],
    ctx1: "목격 건수는 도로에 나온 차와 운행 횟수가 겹친 자리입니다",
    ctx2: "인가 대수와는 다른 칸입니다",
  }, {
    badge: "TSLA", breaking: "Daily record", title: "Austin logged 86,870 Cybercab sightings",
    heroBig: "86,870", heroSub: "Yesterday. 670 were driverless.",
    grid: [
      { icon: "👁️", big: "86,870", mid: "Sightings", sub: "A one-day record" },
      { icon: "🤖", big: "670", mid: "Driverless", sub: "A separate column" },
      { icon: "🏭", big: "Outflow", mid: "Giga Texas", sub: "One of Lutz's four" },
      { icon: "✅", big: "Demand", mid: "Choice", sub: "People pick the cab" },
    ],
    ctx1: "Sightings mix cars on the road and trips",
    ctx2: "That is not the same as authorized units",
  });

  pair("tsla-texas-fleet", "L2", "TSLA", {
    badge: "TSLA", title: "텍사스 인가 사이버캡이 45대에서 169대로 늘었습니다",
    heroIcon: "🚕", heroBig: "169", heroSub: "한 달 사이 거의 네 배입니다. 로보택시 전체는 589대입니다.",
    cards: [
      { label: "사이버캡", big: "169", mid: "인가", sub: "45대에서 증가" },
      { label: "로보택시", big: "589", mid: "텍사스", sub: "인가 전체" },
      { label: "모델Y", big: "420", mid: "대", sub: "그중 호출 차" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "무인 마일리지는 주마다 두 자릿수로 늘고 있습니다.",
      "사람을 다치게 하지 않는 것이 확장의 제약입니다.",
      "웨드부시 목표 주가는 600달러입니다.",
    ],
  }, {
    badge: "TSLA", title: "Texas authorized Cybercabs rose from 45 to 169",
    heroIcon: "🚕", heroBig: "169", heroSub: "Almost 4x in a month. 589 robotaxis are authorized.",
    cards: [
      { label: "Cybercab", big: "169", mid: "Authorized", sub: "From 45" },
      { label: "Robotaxi", big: "589", mid: "Texas", sub: "All authorized" },
      { label: "Model Y", big: "420", mid: "cars", sub: "Inside that fleet" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Unsupervised miles are growing double-digit week after week.",
      "Not injuring anyone is the real constraint.",
      "Wedbush stays at $600.",
    ],
  });

  pair("tsla-fsd-oppenheim", "L3", "TSLA", {
    badge: "TSLA", title: "오펜하임이 벤틀리를 팔고 모델Y를 샀습니다",
    heroIcon: "🏠", heroBig: "10대", heroSub: "직원에게 완전자율주행을 달겠다는 자리입니다.",
    cards: c3(
      { icon: "🚗", big: "모델Y", mid: "교체", sub: "벤틀리를 팔았습니다" },
      { icon: "🛡️", big: "8배", mid: "안전", sub: "평균 운전자 대비" },
      { icon: "👥", big: "10대", mid: "직원", sub: "같은 소프트웨어" },
    ),
  }, {
    badge: "TSLA", title: "Oppenheim sold a Bentley for a Model Y",
    heroIcon: "🏠", heroBig: "10", heroSub: "He will buy Teslas with FSD for ten employees.",
    cards: c3(
      { icon: "🚗", big: "Model Y", mid: "Swap", sub: "The Bentley is gone" },
      { icon: "🛡️", big: "8x", mid: "Safer", sub: "Than the average driver" },
      { icon: "👥", big: "10", mid: "Staff", sub: "Same software" },
    ),
  });

  pair("tsla-fsd-denmark", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "유럽 8번째", title: "덴마크가 감독 완전자율주행을 사람들 앞에 올립니다",
    heroIcon: "🇩🇰", heroBig: "헤르닝", heroSub: "이번 주말 모터쇼에서 모델3나 모델Y로 체험합니다.",
    cards: c3(
      { icon: "🇨🇿", big: "프라하", mid: "어제", sub: "큰 행사 다음" },
      { icon: "🇩🇪", big: "독일", mid: "대기", sub: "아직 창이 닫혀 있습니다" },
      { icon: "🇦🇪", big: "UAE", mid: "다음", sub: "시험 승인 자리" },
    ),
  }, {
    badge: "TSLA", badgeLine: "8th EU", title: "Denmark is putting supervised FSD in front of people",
    heroIcon: "🇩🇰", heroBig: "Herning", heroSub: "Weekend motor-show rides in a Model 3 or Y.",
    cards: c3(
      { icon: "🇨🇿", big: "Prague", mid: "Yesterday", sub: "After the big event" },
      { icon: "🇩🇪", big: "Germany", mid: "Waiting", sub: "The window is still shut" },
      { icon: "🇦🇪", big: "UAE", mid: "Next", sub: "A testing-approval seat" },
    ),
  });

  pair("tsla-robotaxi-app", "L1", "TSLA", {
    badge: "TSLA", title: "로보택시 앱이 여섯 나라 스토어에 올랐습니다",
    heroIcon: "📱", heroBig: "6국", heroSub: "영국 독일 이탈리아 스웨덴 싱가포르 호주입니다.",
    cards: c3(
      { icon: "🍎", big: "앱스토어", mid: "애플", sub: "내려받기 창" },
      { icon: "▶️", big: "플레이", mid: "구글", sub: "같은 목록" },
      { icon: "🚕", big: "오스틴", mid: "화면", sub: "5분 뒤 도착" },
    ),
  }, {
    badge: "TSLA", title: "The Robotaxi app is in six more stores",
    heroIcon: "📱", heroBig: "6", heroSub: "UK, Germany, Italy, Sweden, Singapore, Australia.",
    cards: c3(
      { icon: "🍎", big: "App Store", mid: "Apple", sub: "A download window" },
      { icon: "▶️", big: "Play", mid: "Google", sub: "The same list" },
      { icon: "🚕", big: "Austin", mid: "Screen", sub: "A ride in 5 minutes" },
    ),
  });

  pair("tsla-giga-cybercab", "L3", "TSLA", {
    badge: "TSLA", title: "기가텍사스 옥상에 사이버캡이 쌓이고 있습니다",
    heroIcon: "🏭", heroBig: "옥상", heroSub: "지난주에는 사이버트럭과 모델Y가 그 자리에 있었습니다.",
    cards: c3(
      { icon: "📦", big: "지난주", mid: "재고", sub: "3분기 막바지" },
      { icon: "🚕", big: "오늘", mid: "사이버캡", sub: "그 차들만 남았습니다" },
      { icon: "🏷️", big: "12대", mid: "로고", sub: "이미 붙은 차" },
    ),
  }, {
    badge: "TSLA", title: "Cybercabs are stacking on the Giga Texas roof",
    heroIcon: "🏭", heroBig: "Roof", heroSub: "Cybertruck and Model Y sat there last week.",
    cards: c3(
      { icon: "📦", big: "Last week", mid: "Stock", sub: "Quarter-end" },
      { icon: "🚕", big: "Today", mid: "Cybercab", sub: "Almost only those cars" },
      { icon: "🏷️", big: "12", mid: "Logos", sub: "Already marked" },
    ),
  });

  pair("tsla-germany-268", "L5", "TSLA", {
    badge: "TSLA", title: "독일 지난달 테슬라 등록이 268% 늘었습니다",
    heroIcon: "🇩🇪", heroBig: "+268%", heroSub: "새 모델Y가 그 증가의 앞에 있습니다.",
    before: { label: "지난해", big: "기준", sub: "같은 달" },
    after: { label: "지난달", big: "+268%", sub: "독일 등록" },
    cards: c3(
      { icon: "🇫🇷", big: "프랑스", mid: "9월", sub: "먼저 열린 칸" },
      { icon: "🇳🇱", big: "네덜란드", mid: "1·2위", sub: "같은 달 다른 나라" },
      { icon: "🇬🇧", big: "영국", mid: "다음", sub: "표가 닫히는 칸" },
    ),
  }, {
    badge: "TSLA", title: "Germany's Tesla registrations surged 268%",
    heroIcon: "🇩🇪", heroBig: "+268%", heroSub: "The new Model Y sits in front of that jump.",
    before: { label: "Year ago", big: "Base", sub: "Same month" },
    after: { label: "Last month", big: "+268%", sub: "German plates" },
    cards: c3(
      { icon: "🇫🇷", big: "France", mid: "Sept", sub: "Opened first" },
      { icon: "🇳🇱", big: "Netherlands", mid: "1-2", sub: "Same month" },
      { icon: "🇬🇧", big: "UK", mid: "Next", sub: "The table still open" },
    ),
  });

  pair("tsla-fsd-subs", "L2", "TSLA", {
    badge: "TSLA", title: "매달 활성 완전자율주행 구독이 약 23만 명씩 늘었습니다",
    heroIcon: "🧭", heroBig: "23만", heroSub: "2분기 이후입니다. 3분기 100만 명이 보이는 자리입니다.",
    cards: [
      { label: "매달", big: "23만", mid: "추가", sub: "활성 구독" },
      { label: "목표", big: "100만", mid: "3분기", sub: "월간 활성" },
      { label: "필요", big: "33.4만", mid: "이번 분기", sub: "그 자리에 가려면" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "하드웨어 4와 3을 이미 쓰는 고객이 많습니다.",
      "판매 때 고른 비율과 나중에 켠 구독은 다른 칸입니다.",
      "웨드부시 목표 주가는 600달러입니다.",
    ],
  }, {
    badge: "TSLA", title: "About 230,000 new monthly FSD subscribers since Q2",
    heroIcon: "🧭", heroBig: "230k", heroSub: "A path toward 1 million monthly actives in Q3.",
    cards: [
      { label: "Monthly", big: "230k", mid: "Adds", sub: "Active subs" },
      { label: "Goal", big: "1.0M", mid: "Q3", sub: "Monthly active" },
      { label: "Need", big: "334k", mid: "This quarter", sub: "To get there" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Many HW4 and HW3 owners already use it.",
      "Attach at sale and later subscriptions are different columns.",
      "Wedbush stays at $600.",
    ],
  });

  pair("tsla-credit-30b", "L6", "TSLA", {
    badge: "TSLA", breaking: "한도 확대", title: "테슬라가 신용한도를 300억 달러로 늘립니다",
    heroBig: "$30B", heroSub: "50억 달러에서 올립니다. 사이버캡과 옵티머스에 씁니다.",
    grid: [
      { icon: "🚕", big: "사이버캡", mid: "자금", sub: "한도의 쓰임" },
      { icon: "🤖", big: "옵티머스", mid: "양산", sub: "램을 줄인 라인" },
      { icon: "📦", big: "66.6만", mid: "Q3 인도", sub: "세제 없이" },
      { icon: "🔌", big: "8.5만", mid: "슈퍼차저", sub: "칸이 늘었습니다" },
    ],
    ctx1: "한도 확대와 실제 인출은 다른 단계입니다",
    ctx2: "인도 대수와 한도 금액을 한 공식으로 나누지 않습니다",
  }, {
    badge: "TSLA", breaking: "Credit line", title: "Tesla is lifting its credit line to $30 billion",
    heroBig: "$30B", heroSub: "From $5 billion. For Cybercabs and Optimus.",
    grid: [
      { icon: "🚕", big: "Cybercab", mid: "Use", sub: "What the line funds" },
      { icon: "🤖", big: "Optimus", mid: "Ramp", sub: "Less RAM, less delay" },
      { icon: "📦", big: "666k", mid: "Q3", sub: "Deliveries, no tax credit" },
      { icon: "🔌", big: "85k", mid: "Stalls", sub: "Superchargers" },
    ],
    ctx1: "A larger line is not money already drawn",
    ctx2: "Do not divide deliveries by the facility",
  });

  pair("tsla-gas-below-50", "L5", "TSLA", {
    badge: "AUTO", title: "세계 신차에서 가솔린 비중이 처음 50% 아래로 내려갔습니다",
    heroIcon: "⛽", heroBig: "49%", heroSub: "상반기입니다. 하이브리드를 뺀 가솔린입니다.",
    before: { label: "예전", big: "50%+", sub: "가솔린이 절반 위" },
    after: { label: "상반기", big: "49%", sub: "처음 절반 아래" },
    cards: c3(
      { icon: "📉", big: "2,025만", mid: "대", sub: "가솔린 · 10% 감소" },
      { icon: "🌍", big: "90국", mid: "전기차", sub: "판매가 늘었습니다" },
      { icon: "🇳🇱", big: "1·2위", mid: "테슬라", sub: "네덜란드 전체 신차" },
    ),
  }, {
    badge: "AUTO", title: "Gasoline cars fell below 50% of global sales",
    heroIcon: "⛽", heroBig: "49%", heroSub: "First half. Gas only, hybrids excluded.",
    before: { label: "Before", big: "50%+", sub: "Gasoline above half" },
    after: { label: "1H", big: "49%", sub: "Below half at last" },
    cards: c3(
      { icon: "📉", big: "20.25M", mid: "cars", sub: "Gasoline · down 10%" },
      { icon: "🌍", big: "90", mid: "countries", sub: "EV sales grew" },
      { icon: "🇳🇱", big: "1-2", mid: "Tesla", sub: "All Dutch new cars" },
    ),
  });

  pair("tsla-spcx-merge", "L4", "SPCX", {
    badge: "MACRO", badgeLine: "캘시", title: "테슬라와 스페이스X가 2028년 전에 합쳐질 확률 70%입니다",
    heroIcon: "🔗", heroBig: "70%", heroSub: "예측 시장입니다. 캐시 우드도 그 방향을 봅니다.",
    cards: c3(
      { icon: "🔴", big: "화성", mid: "목표", sub: "더 큰 그림" },
      { icon: "📡", big: "스타링크", mid: "이익", sub: "이미 큰 연결" },
      { icon: "🧠", big: "연산", mid: "최저 비용", sub: "가장 많은 칸" },
    ),
  }, {
    badge: "MACRO", badgeLine: "Kalshi", title: "A 70% chance Tesla and SpaceX merge before 2028",
    heroIcon: "🔗", heroBig: "70%", heroSub: "A prediction market. Cathie Wood sees the same path.",
    cards: c3(
      { icon: "🔴", big: "Mars", mid: "Goal", sub: "The bigger picture" },
      { icon: "📡", big: "Starlink", mid: "Profit", sub: "Already a large pipe" },
      { icon: "🧠", big: "Compute", mid: "Lowest cost", sub: "The most of it" },
    ),
  });

  pair("nvda-6t", "L6", "NVDA", {
    badge: "NVDA", breaking: "시총 이정표", title: "엔비디아가 세계 첫 시가총액 6조 달러 회사가 됐습니다",
    heroBig: "$6T", heroSub: "사상 최고가입니다. 나스닥도 최고 종가입니다.",
    grid: [
      { icon: "📈", big: "최고가", mid: "종가", sub: "같은 밤" },
      { icon: "📊", big: "27,477", mid: "나스닥", sub: "+1.05%" },
      { icon: "⭐", big: "최선호", mid: "모건스탠리", sub: "젠슨을 만난 뒤" },
      { icon: "🔌", big: "2.6GW", mid: "앤트로픽", sub: "옆 카드" },
    ],
    ctx1: "시가총액 이정표와 수주 기가와트를 한 배수로 나누지 않습니다",
    ctx2: "모건스탠리는 반도체 최선호주로 다시 둡니다",
  }, {
    badge: "NVDA", breaking: "Market cap", title: "Nvidia is the first $6 trillion company",
    heroBig: "$6T", heroSub: "An all-time high. The Nasdaq closed at a record too.",
    grid: [
      { icon: "📈", big: "ATH", mid: "Close", sub: "The same night" },
      { icon: "📊", big: "27,477", mid: "Nasdaq", sub: "+1.05%" },
      { icon: "⭐", big: "Top pick", mid: "Morgan Stanley", sub: "After Jensen" },
      { icon: "🔌", big: "2.6GW", mid: "Anthropic", sub: "The next card" },
    ],
    ctx1: "Do not divide the cap by gigawatts",
    ctx2: "Morgan Stanley named it the top semiconductor pick again",
  });

  pair("nvda-anthropic", "L1", "NVDA", {
    badge: "NVDA", title: "앤트로픽이 엔비디아 하드웨어 2.6기가와트를 계약했습니다",
    heroIcon: "⚡", heroBig: "2.6GW", heroSub: "2028년까지 배송입니다. 계약 총액은 1,800억 달러를 넘습니다.",
    cards: c3(
      { icon: "📅", big: "2028", mid: "배송", sub: "창이 닫히는 해" },
      { icon: "💵", big: "1,800억", mid: "달러", sub: "하이퍼+네오클라우드" },
      { icon: "☁️", big: "여러 집", mid: "클라우드", sub: "한 고객의 전력" },
    ),
  }, {
    badge: "NVDA", title: "Anthropic contracted 2.6 GW of Nvidia hardware",
    heroIcon: "⚡", heroBig: "2.6GW", heroSub: "Ships through 2028. Total contracts exceed $180 billion.",
    cards: c3(
      { icon: "📅", big: "2028", mid: "Ship", sub: "The window" },
      { icon: "💵", big: "$180B", mid: "Value", sub: "Hyperscalers and neoclouds" },
      { icon: "☁️", big: "Many homes", mid: "Cloud", sub: "One customer's power" },
    ),
  });

  pair("mu-ni-outlook", "L2", "MU", {
    badge: "MU", title: "마이크론 예상 순이익이 2027년 1,990억 달러로 잡혀 있습니다",
    heroIcon: "📈", heroBig: "$199B", heroSub: "2025년 85억, 2026년 850억 다음 칸입니다.",
    cards: [
      { label: "2025", big: "85억", mid: "달러", sub: "출발" },
      { label: "2026", big: "850억", mid: "달러", sub: "열 배" },
      { label: "2027", big: "1,990억", mid: "달러", sub: "약 25배" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "카드 전망입니다. 가이던스 공시와 다른 칸입니다.",
      "마이크로소프트와 아마존을 넘길 자리라는 문장입니다.",
      "모건스탠리는 메모리 업황 회복 전망을 유지합니다.",
    ],
  }, {
    badge: "MU", title: "Micron net income is modeled at $199 billion in 2027",
    heroIcon: "📈", heroBig: "$199B", heroSub: "After $8.5 billion and $85 billion.",
    cards: [
      { label: "2025", big: "$8.5B", mid: "NI", sub: "The start" },
      { label: "2026", big: "$85B", mid: "NI", sub: "Ten times" },
      { label: "2027", big: "$199B", mid: "NI", sub: "About 25x" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "A visual card, not a filed guide.",
      "The line says it could pass Microsoft and Amazon.",
      "Morgan Stanley keeps a memory-upcycle view.",
    ],
  });

  pair("foxconn-q3", "L3", "FOX", {
    badge: "FOX", title: "폭스콘 3분기 매출이 954억 달러로 예상을 넘겼습니다",
    heroIcon: "🖥️", heroBig: "$95.4B", heroSub: "전년보다 47% 늘었습니다. 예상은 890억 달러입니다.",
    cards: c3(
      { icon: "📅", big: "365억", mid: "9월", sub: "한 달 · +38%" },
      { icon: "🇹🇼", big: "1조", mid: "대만달러", sub: "월매출 첫 돌파" },
      { icon: "🔌", big: "서버", mid: "엔비디아", sub: "가장 큰 조립 칸" },
    ),
  }, {
    badge: "FOX", title: "Foxconn's third quarter was $95.4 billion",
    heroIcon: "🖥️", heroBig: "$95.4B", heroSub: "Up 47%. The street had $89 billion.",
    cards: c3(
      { icon: "📅", big: "$36.5B", mid: "Sept", sub: "One month · +38%" },
      { icon: "🇹🇼", big: "NT$1T", mid: "Month", sub: "First time ever" },
      { icon: "🔌", big: "Servers", mid: "Nvidia", sub: "A top assembler" },
    ),
  });

  pair("tsmc-terafab", "L4", "TSM", {
    badge: "TSM", badgeLine: "확인", title: "텍사스 테라팹에서 TSMC와 칩 파트너십을 논의합니다",
    heroIcon: "🏭", heroBig: "테라팹", heroSub: "자체 주문형 반도체를 찍으려는 공장입니다.",
    cards: c3(
      { icon: "✅", big: "확인", mid: "머스크", sub: "논의 중입니다" },
      { icon: "🧠", big: "ASIC", mid: "자체", sub: "지정학 위험을 피합니다" },
      { icon: "📍", big: "텍사스", mid: "공장", sub: "착공은 다음 칸" },
    ),
  }, {
    badge: "TSM", badgeLine: "Confirmed", title: "TSMC is in talks for chips at Texas Terafab",
    heroIcon: "🏭", heroBig: "Terafab", heroSub: "A plant meant to print proprietary ASICs.",
    cards: c3(
      { icon: "✅", big: "Yes", mid: "Musk", sub: "Talks are on" },
      { icon: "🧠", big: "ASIC", mid: "Own", sub: "To dodge geopolitics" },
      { icon: "📍", big: "Texas", mid: "Plant", sub: "Groundbreak is later" },
    ),
  });

  pair("spcx-20gw-xai", "L6", "SPCX", {
    badge: "SPCX", breaking: "연산 목표", title: "스페이스X와 xAI가 연산 10기가와트를 목표로 잡았습니다",
    heroBig: "10GW", heroSub: "장기는 20기가와트입니다. 지금은 약 3.6기가와트입니다.",
    grid: [
      { icon: "🏠", big: "60%", mid: "내부", sub: "xAI · 스페이스X · 테슬라" },
      { icon: "🌐", big: "40%", mid: "외부", sub: "앤트로픽 · 구글" },
      { icon: "🛰️", big: "2027", mid: "스페이스마인", sub: "궤도 데이터센터" },
      { icon: "🌙", big: "2028", mid: "달", sub: "배치 일정" },
    ],
    ctx1: "지상 전력과 궤도 일정을 한 합으로 더하지 않습니다",
    ctx2: "외부 40%가 계약으로 내려오는 이름이 다음입니다",
  }, {
    badge: "SPCX", breaking: "Compute goal", title: "SpaceX and xAI are targeting 10 GW of compute",
    heroBig: "10GW", heroSub: "20 GW long term. About 3.6 GW now.",
    grid: [
      { icon: "🏠", big: "60%", mid: "Internal", sub: "xAI · SpaceX · Tesla" },
      { icon: "🌐", big: "40%", mid: "External", sub: "Anthropic · Google" },
      { icon: "🛰️", big: "2027", mid: "Space Mine", sub: "Orbital datacenter" },
      { icon: "🌙", big: "2028", mid: "Moon", sub: "A later deployment" },
    ],
    ctx1: "Do not add terrestrial power to the orbital calendar",
    ctx2: "The next check is which names fill the external 40%",
  });

  pair("spcx-cape-pipe", "L3", "SPCX", {
    badge: "SPCX", title: "케이프커내버럴까지 32.4마일 천연가스관을 놓으려 합니다",
    heroIcon: "🛢️", heroBig: "32.4mi", heroSub: "스타십 연료입니다. 트럭 수백 대에 기대지 않으려는 자리입니다.",
    cards: c3(
      { icon: "📄", big: "신청", mid: "플로리다", sub: "공공서비스위원회" },
      { icon: "🚚", big: "트럭", mid: "축소", sub: "발사마다 수백 대" },
      { icon: "🚀", big: "스타십", mid: "빈도", sub: "관이 열리면 주기가 맞습니다" },
    ),
  }, {
    badge: "SPCX", title: "A 32.4-mile gas pipeline to Cape Canaveral",
    heroIcon: "🛢️", heroBig: "32.4mi", heroSub: "Starship fuel. Fewer LNG truckloads per launch.",
    cards: c3(
      { icon: "📄", big: "Filing", mid: "Florida", sub: "Public Service Commission" },
      { icon: "🚚", big: "Trucks", mid: "Fewer", sub: "Hundreds per launch" },
      { icon: "🚀", big: "Starship", mid: "Cadence", sub: "A pipe matches the rhythm" },
    ),
  });

  pair("spcx-unlock", "L5", "SPCX", {
    badge: "SPCX", title: "다음 락업 해제 앞에 스페이스X가 5% 올랐습니다",
    heroIcon: "🔓", heroBig: "+5%", heroSub: "이번 주는 13%입니다. 다음 해제는 물량을 약 25% 늘립니다.",
    before: { label: "첫 해제", big: "9,100만", sub: "8월 6일 전후" },
    after: { label: "다음", big: "+25%", sub: "유통 물량" },
    cards: c3(
      { icon: "📈", big: "+13%", mid: "주간", sub: "오늘 +5%" },
      { icon: "📉", big: "-33%", mid: "해제 전", sub: "한 칸의 과거" },
      { icon: "🎯", big: "$300", mid: "목표", sub: "모건스탠리" },
    ),
  }, {
    badge: "SPCX", title: "SpaceX is up 5% before another unlock",
    heroIcon: "🔓", heroBig: "+5%", heroSub: "Up 13% on the week. The next unlock adds about 25% supply.",
    before: { label: "First", big: "91M", sub: "Around August 6" },
    after: { label: "Next", big: "+25%", sub: "More float" },
    cards: c3(
      { icon: "📈", big: "+13%", mid: "Week", sub: "Today +5%" },
      { icon: "📉", big: "-33%", mid: "Pre-unlock", sub: "One past column" },
      { icon: "🎯", big: "$300", mid: "Target", sub: "Morgan Stanley" },
    ),
  });

  pair("reflection-nebius", "L2", "SPCX", {
    badge: "SPCX", title: "리플렉션이 스페이스X와 네비우스에 70억 달러 연산을 넣습니다",
    heroIcon: "🧠", heroBig: "$7B+", heroSub: "2029년까지입니다. 딥시크와 퀀에 맞설 오픈웨이트입니다.",
    cards: [
      { label: "연산", big: "70억+", mid: "달러", sub: "2029까지" },
      { label: "클라우드", big: "둘", mid: "집", sub: "스페이스X · 네비우스" },
      { label: "모델", big: "오픈", mid: "웨이트", sub: "국내 대안" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "엔비디아가 받친 랩입니다.",
      "외부 40% 칸에 들어갈 수 있는 이름입니다.",
      "모건스탠리 목표 주가는 300달러입니다.",
    ],
  }, {
    badge: "SPCX", title: "Reflection is putting $7B+ of compute on SpaceX and Nebius",
    heroIcon: "🧠", heroBig: "$7B+", heroSub: "Through 2029. An open-weight rival to DeepSeek and Qwen.",
    cards: [
      { label: "Compute", big: "$7B+", mid: "spend", sub: "Through 2029" },
      { label: "Clouds", big: "Two", mid: "homes", sub: "SpaceX · Nebius" },
      { label: "Model", big: "Open", mid: "weights", sub: "A domestic option" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "A Nvidia-backed lab.",
      "A name that can sit in the external 40%.",
      "Morgan Stanley stays at $300.",
    ],
  });

  pair("tsla-optimus-night", "L1", "TSLA", {
    badge: "TSLA", title: "프리몬트에서 옵티머스 야간 근무를 뽑고 있습니다",
    heroIcon: "🤖", heroBig: "야간", heroSub: "데이터 수집 자리와 제조 자리 열 개입니다.",
    cards: c3(
      { icon: "🌙", big: "10자리", mid: "제조", sub: "야간 라인" },
      { icon: "📊", big: "데이터", mid: "수집", sub: "부매니저" },
      { icon: "🏙️", big: "오스틴", mid: "24시간", sub: "이미 돌아갑니다" },
    ),
  }, {
    badge: "TSLA", title: "Fremont is hiring an Optimus night shift",
    heroIcon: "🤖", heroBig: "Nights", heroSub: "A data-collection seat plus about 10 manufacturing roles.",
    cards: c3(
      { icon: "🌙", big: "10 jobs", mid: "Build", sub: "The night line" },
      { icon: "📊", big: "Data", mid: "Collect", sub: "Associate manager" },
      { icon: "🏙️", big: "Austin", mid: "24h", sub: "Already running" },
    ),
  });
};
