// 2026-10-01 SVG. 인용·해설은 본문 첫 섹션을 그대로 넣어 칸을 채운다.
const { US } = require("./data-20261001-us");
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
  const F = "2026.10.01";

  add("summary", "ROWS", "MACRO", {
    headline: "2026.10.01 한장 요약",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "300GW", title: "스타십이 해마다 연산 300기가와트 이상을 올리겠다고 합니다", sub: "달과 화성 표면까지 약 100만 톤이라는 비교가 있습니다." },
      { color: "#c084fc", fill: "#1a0f2a", right: "12조$", title: "씨티증권은 스페이스X 가치를 12조 달러로 봅니다", sub: "주당 900달러. 14번째 비행을 이정표로 봅니다." },
      { color: "#60a5fa", fill: "#06121f", right: "542억$", title: "마이크론 매출은 542억 달러, 이익은 33.42달러입니다", sub: "다음 분기 가이던스 매출은 620억 달러입니다." },
      { color: "#4ade80", fill: "#061209", right: "4796대", title: "노르웨이 9월 모델Y는 4,796대로 다음 아홉 차를 넘습니다", sub: "그다음 아홉 차종 합은 3,455대입니다." },
      { color: "#86efac", fill: "#0a1a0a", right: "371대", title: "어제 오스틴 사이버캡은 371대, 무인은 248대입니다", sub: "9월 말에는 합계 400대를 넘긴 날이 있습니다." },
      { color: "#ef4444", fill: "#1a0a0a", right: "5.302%", title: "미국 10년 국채 금리는 5.302%로 52주 최고입니다", sub: "오후 1시 15분 트레이드웹, 하루 0.047 상승." },
      { color: "#4ade80", fill: "#061209", right: "1000대", title: "프리몬트 옵티머스 연말 목표는 주 1,000대입니다", sub: "지금은 주 수백 대 전언이고, 목표는 연말입니다." },
      { color: "#facc15", fill: "#1a1600", right: "69%", title: "2027년 5월 전 합병 확률은 예측시장에서 69%입니다", sub: "서명된 계약이 아니라 칼시 가격입니다." },
    ],
    caption: "300기가와트 · 12조 달러 · 마이크론 542억 · 모델Y 4,796대 · 사이버캡 371대 · 금리 5.302% · 옵티머스 · 69%",
  }, {
    headline: "2026.10.01 Daily Snapshot",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "300GW", title: "Starship is described as launching 300 GW of compute a year", sub: "About a million tons to the Moon or Mars surface." },
      { color: "#c084fc", fill: "#1a0f2a", right: "$12T", title: "Citi puts SpaceX at $12 trillion, or $900 a share", sub: "Flight 14 is called a milestone." },
      { color: "#60a5fa", fill: "#06121f", right: "$54.2B", title: "Micron revenue was $54.2 billion and EPS was $33.42", sub: "Next-quarter revenue guide is $62 billion." },
      { color: "#4ade80", fill: "#061209", right: "4,796", title: "Norway's September Model Y was 4,796 units", sub: "The next nine nameplates totaled 3,455." },
      { color: "#86efac", fill: "#0a1a0a", right: "371", title: "Austin logged 371 Cybercab sightings, 248 driverless", sub: "Late September had days above 400." },
      { color: "#ef4444", fill: "#1a0a0a", right: "5.302%", title: "The U.S. 10-year yield hit 5.302%, a 52-week high", sub: "Tradeweb at 1:15 p.m. ET, up 0.047." },
      { color: "#4ade80", fill: "#061209", right: "1,000", title: "Fremont Optimus has a year-end goal of 1,000 a week", sub: "Current talk is hundreds a week." },
      { color: "#facc15", fill: "#1a1600", right: "69%", title: "A prediction market prices a merger before May 2027 at 69%", sub: "A market price, not a signed deal." },
    ],
    caption: "300 GW · $12T · Micron $54.2B · Model Y 4,796 · Cybercab 371 · 5.302% · Optimus · 69%",
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

  pair("starship-telescope", "L4", "SPCX", {
    badge: "SPCX", badgeLine: "더 무거운 망원경", title: "스타십이 더 큰 우주 망원경을 더 빨리 올리겠다고 합니다",
    heroIcon: "🔭", heroBig: "궤도+달", heroSub: "접지 않고, 더 무겁고 단순한 관측소를 올립니다.",
    cards: c3(
      { icon: "🛰️", big: "첫 궤도", mid: "월요일", sub: "스타십이 궤도에 올랐습니다" },
      { icon: "⚖️", big: "무게", mid: "위험 이전", sub: "접는 장치 대신 무게로" },
      { icon: "🌙", big: "달", mid: "거대 구경", sub: "궤도에도 더 큰 망원경" },
    ),
  }, {
    badge: "SPCX", badgeLine: "Heavier telescopes", title: "Starship is framed as a way to launch heavier telescopes",
    heroIcon: "🔭", heroBig: "Orbit+Moon", heroSub: "Heavier, simpler observatories, without folding.",
    cards: c3(
      { icon: "🛰️", big: "Orbit", mid: "Monday", sub: "Starship reached orbit" },
      { icon: "⚖️", big: "Mass", mid: "Less folding", sub: "Trade risk for mass" },
      { icon: "🌙", big: "Moon", mid: "Giant aperture", sub: "Larger telescopes in orbit" },
    ),
  });

  pair("starship-300gw", "L1", "SPCX", {
    badge: "SPCX", title: "스타십이 해마다 연산 300기가와트 이상을 올리겠다고 합니다",
    heroIcon: "🚀", heroBig: "300GW", heroSub: "해마다 올리는 목표입니다. 올해 이미 켜진 용량이 아닙니다.",
    cards: c3(
      { icon: "📅", big: "주 1~2회", mid: "내년 리듬", sub: "기대하는 발사 간격" },
      { icon: "🌙", big: "100만톤", mid: "달·화성", sub: "표면까지 필요한 화물" },
      { icon: "⚡", big: "40%", mid: "200GW 비교", sub: "미국 에너지 소비 증가분" },
    ),
  }, {
    badge: "SPCX", title: "Starship is described as launching at least 300 GW a year",
    heroIcon: "🚀", heroBig: "300 GW", heroSub: "A yearly goal, not capacity already switched on.",
    cards: c3(
      { icon: "📅", big: "1–2/wk", mid: "Next year", sub: "Hoped-for cadence" },
      { icon: "🌙", big: "1Mt", mid: "Moon, Mars", sub: "Tons to the surface" },
      { icon: "⚡", big: "40%", mid: "200 GW", sub: "Versus U.S. energy use" },
    ),
  });

  pair("citi-spcx-12t", "L3", "SPCX", {
    badge: "SPCX", title: "씨티증권은 스페이스X를 주당 900달러, 12조 달러로 봅니다",
    heroIcon: "💰", heroBig: "12조$", heroSub: "주당 900달러. 오늘 거래소 주가는 아닙니다.",
    cards: c3(
      { icon: "1️⃣", big: "900$", mid: "주당", sub: "존 고딘의 단가" },
      { icon: "🚀", big: "14회", mid: "이정표", sub: "비행을 단계로 봄" },
      { icon: "🏁", big: "발사", mid: "기초 경쟁력", sub: "따라오기 어렵다는 말" },
    ),
  }, {
    badge: "SPCX", title: "Citi puts SpaceX at $900 a share and $12 trillion",
    heroIcon: "💰", heroBig: "$12T", heroSub: "$900 a share. Not a listed price today.",
    cards: c3(
      { icon: "1️⃣", big: "$900", mid: "Per share", sub: "John Godyn" },
      { icon: "🚀", big: "Flight 14", mid: "Milestone", sub: "Tied to the valuation" },
      { icon: "🏁", big: "Launch", mid: "The moat", sub: "Unrivaled cadence" },
    ),
  });

  pair("micron-beat", "L2", "NVDA", {
    badge: "MU", title: "마이크론 매출 542억 달러, 주당순이익 33.42달러",
    heroIcon: "💾", heroBig: "542억$", heroSub: "예상 515억 달러와 31.82달러를 넘었습니다.",
    cards: [
      { label: "매출", big: "542억$", mid: "예상 515억$", sub: "예상을 넘겼습니다" },
      { label: "이익", big: "33.42$", mid: "예상 31.82$", sub: "반올림 33.4와 같습니다" },
      { label: "다음 분기", big: "620억$", mid: "이익 38.15$", sub: "가이던스입니다" },
    ],
    detailHead: "같이 볼 숫자",
    detailLines: [
      "매출총이익률은 87%로 예상 86%를 넘었습니다.",
      "로젠블랫 목표 주가는 1,500달러입니다.",
      "웨드부시 목표 주가는 1,400달러입니다.",
    ],
  }, {
    badge: "MU", title: "Micron revenue $54.2 billion, EPS $33.42",
    heroIcon: "💾", heroBig: "$54.2B", heroSub: "Ahead of $51.5 billion and $31.82.",
    cards: [
      { label: "Revenue", big: "$54.2B", mid: "est. $51.5B", sub: "Beat" },
      { label: "EPS", big: "$33.42", mid: "est. $31.82", sub: "33.4 is the rounding" },
      { label: "Next qtr", big: "$62B", mid: "EPS $38.15", sub: "Guidance" },
    ],
    detailHead: "Also on the card",
    detailLines: [
      "Gross margin was 87% versus 86% expected.",
      "Rosenblatt target stays $1,500.",
      "Wedbush target stays $1,400.",
    ],
  });

  pair("model3-camry", "L5", "TSLA", {
    badge: "TSLA", title: "로스앤젤레스 모델3는 3만 6,990달러입니다",
    heroIcon: "🚗", heroBig: "7,390$", heroSub: "캠리 2만 9,600달러와의 처음 가격 차이입니다.",
    before: { label: "캠리", big: "29,600$", sub: "연 연료비 1,824달러" },
    after: { label: "모델3", big: "36,990$", sub: "집 충전 연 875달러" },
    cards: c3(
      { icon: "⛽", big: "6.41$", mid: "갤런", sub: "LA 보통 휘발유" },
      { icon: "🔧", big: "1,035$", mid: "10년 유지", sub: "테슬라가 가장 낮음" },
      { icon: "📆", big: "2,140$", mid: "6년 후 차이", sub: "연료와 유지를 뺀 뒤" },
    ),
  }, {
    badge: "TSLA", title: "A Los Angeles Model 3 starts at $36,990",
    heroIcon: "🚗", heroBig: "$7,390", heroSub: "Gap versus a Camry at $29,600.",
    before: { label: "Camry", big: "$29,600", sub: "Gas about $1,824 a year" },
    after: { label: "Model 3", big: "$36,990", sub: "Home charging about $875" },
    cards: c3(
      { icon: "⛽", big: "$6.41", mid: "a gallon", sub: "LA regular" },
      { icon: "🔧", big: "$1,035", mid: "10-year", sub: "Lowest on the CR list" },
      { icon: "📆", big: "$2,140", mid: "After 6 years", sub: "Gap once running costs count" },
    ),
  });

  pair("norway-4796", "L6", "TSLA", {
    badge: "TSLA", breaking: "9월 판매", title: "노르웨이 9월 모델Y가 4,796대입니다",
    heroBig: "4,796대", heroSub: "그다음 아홉 차종 합은 3,455대입니다.",
    grid: [
      { icon: "1️⃣", big: "4,796", mid: "모델Y", sub: "9월" },
      { icon: "2️⃣", big: "518", mid: "GLC EQ", sub: "메르세데스" },
      { icon: "3️⃣", big: "512", mid: "ID.버즈", sub: "폭스바겐" },
      { icon: "4️⃣", big: "453", mid: "EX30", sub: "볼보" },
    ],
    ctx1: "아토3 377 · iX3 328 · bZ4X 322",
    ctx2: "EV5 320 · 어반 크루저 317 · ID.4 308",
  }, {
    badge: "TSLA", breaking: "September", title: "Norway's September Model Y was 4,796",
    heroBig: "4,796", heroSub: "The next nine combined were 3,455.",
    grid: [
      { icon: "1️⃣", big: "4,796", mid: "Model Y", sub: "September" },
      { icon: "2️⃣", big: "518", mid: "GLC EQ", sub: "Mercedes" },
      { icon: "3️⃣", big: "512", mid: "ID.Buzz", sub: "Volkswagen" },
      { icon: "4️⃣", big: "453", mid: "EX30", sub: "Volvo" },
    ],
    ctx1: "Atto 3 377 · iX3 328 · bZ4X 322",
    ctx2: "EV5 320 · Urban Cruiser 317 · ID.4 308",
  });

  pair("modely-ciasi", "L3", "TSLA", {
    badge: "TSLA", title: "중국 보험 평가에서 모델Y가 우+를 받았습니다",
    heroIcon: "🛡️", heroBig: "우+", heroSub: "그 프로그램의 최고 등급입니다.",
    cards: c3(
      { icon: "🪑", big: "G+", mid: "탑승자", sub: "보호 등급" },
      { icon: "🚶", big: "G+", mid: "보행자", sub: "보호 등급" },
      { icon: "🤖", big: "G", mid: "보조·신에너지", sub: "두 항목 모두 G" },
    ),
  }, {
    badge: "TSLA", title: "China's insurance index gave the Model Y You+",
    heroIcon: "🛡️", heroBig: "You+", heroSub: "The top mark in that program.",
    cards: c3(
      { icon: "🪑", big: "G+", mid: "Occupant", sub: "Protection" },
      { icon: "🚶", big: "G+", mid: "Pedestrian", sub: "Protection" },
      { icon: "🤖", big: "G", mid: "Assist, NEV", sub: "Both graded G" },
    ),
  });

  pair("operator-asia", "L2", "TSLA", {
    badge: "TSLA", title: "성남과 타이베이에 차량 오퍼레이터를 뽑습니다",
    heroIcon: "🇰🇷", heroBig: "2곳", heroSub: "정규직. 운전석에서 안전 시험과 거리 기록.",
    cards: [
      { label: "성남 분당", big: "284950", mid: "엔지니어링", sub: "부산도 언급" },
      { label: "타이베이", big: "284948", mid: "차량 소프트웨어", sub: "정규직" },
      { label: "하는 일", big: "안전시험", mid: "거리 기록", sub: "낮과 밤, 국내 이동" },
    ],
    detailHead: "공고에 적힌 일",
    detailLines: [
      "능동 안전과 수동 안전을 시험합니다.",
      "시제품 오디오와 카메라를 확인합니다.",
      "채용 공고가 운행 허가 자체는 아닙니다.",
    ],
  }, {
    badge: "TSLA", title: "Tesla is hiring vehicle operators in Seongnam and Taipei",
    heroIcon: "🇰🇷", heroBig: "2 cities", heroSub: "Full time. Safety tests and logged miles.",
    cards: [
      { label: "Bundang", big: "284950", mid: "Engineering", sub: "Busan also mentioned" },
      { label: "Taipei", big: "284948", mid: "Vehicle software", sub: "Full time" },
      { label: "The job", big: "Safety", mid: "Log miles", sub: "Day or night travel" },
    ],
    detailHead: "What the posting says",
    detailLines: [
      "Test active and passive safety.",
      "Check prototype audio and cameras.",
      "A job post is not an operating permit.",
    ],
  });

  pair("cybercab-371", "L1", "TSLA", {
    badge: "TSLA", title: "어제 오스틴 사이버캡 목격은 371대입니다",
    heroIcon: "🚕", heroBig: "371대", heroSub: "그중 248대는 운전석이 비어 있었습니다.",
    cards: c3(
      { icon: "👀", big: "371", mid: "전체 목격", sub: "어제 오스틴" },
      { icon: "🚫", big: "248", mid: "무인", sub: "운전석이 빈 차" },
      { icon: "📆", big: "9/1–29", mid: "집계 기간", sub: "말일 400대 넘은 날" },
    ),
  }, {
    badge: "TSLA", title: "Austin logged 371 Cybercab sightings yesterday",
    heroIcon: "🚕", heroBig: "371", heroSub: "248 of them had an empty driver seat.",
    cards: c3(
      { icon: "👀", big: "371", mid: "Sightings", sub: "Austin, yesterday" },
      { icon: "🚫", big: "248", mid: "Driverless", sub: "Empty driver seat" },
      { icon: "📆", big: "Sep 1–29", mid: "The count", sub: "Late days above 400" },
    ),
  });

  pair("fcc-starlink", "L4", "SPCX", {
    badge: "FCC", badgeLine: "1,000MHz 추가", title: "위성 광대역용 주파수를 1,000메가헤르츠 넘게 엽니다",
    heroIcon: "📡", heroBig: "+25%", heroSub: "의장 브렌던 카의 하향 용량 설명입니다.",
    cards: c3(
      { icon: "📶", big: "12.7", mid: "기가헤르츠", sub: "연 대역" },
      { icon: "📶", big: "42", mid: "기가헤르츠", sub: "같이 연 대역" },
      { icon: "📋", big: "1450", mid: "메가헤르츠", sub: "Ku·Ka 추가 예고" },
    ),
  }, {
    badge: "FCC", badgeLine: "1,000+ MHz", title: "More than 1,000 megahertz opened for satellite broadband",
    heroIcon: "📡", heroBig: "+25%", heroSub: "Chairman Carr on downlink capacity.",
    cards: c3(
      { icon: "📶", big: "12.7", mid: "GHz", sub: "One band opened" },
      { icon: "📶", big: "42", mid: "GHz", sub: "The other band" },
      { icon: "📋", big: "1,450", mid: "MHz more", sub: "Ku and Ka proposal" },
    ),
  });

  pair("merge-odds", "L6", "TSLA", {
    badge: "TSLA", breaking: "예측 시장", title: "2027년 5월 전 합병 확률은 69%입니다",
    heroBig: "69%", heroSub: "칼시 가격입니다. 서명된 계약이 아닙니다.",
    grid: [
      { icon: "5️⃣", big: "69%", mid: "5월 1일 전", sub: "2027" },
      { icon: "4️⃣", big: "50%", mid: "4월 1일 전", sub: "2027" },
      { icon: "3️⃣", big: "35%", mid: "3월 1일 전", sub: "2027" },
      { icon: "💵", big: "143만$", mid: "거래대금", sub: "칼시" },
    ],
    ctx1: "조너스: 협력 확대. 임박 여부는 질문",
    ctx2: "우드: 올해 발표 가능. 의견입니다",
  }, {
    badge: "TSLA", breaking: "Prediction market", title: "A merger before May 2027 is priced at 69%",
    heroBig: "69%", heroSub: "A Kalshi price, not a signed contract.",
    grid: [
      { icon: "5️⃣", big: "69%", mid: "Before May 1", sub: "2027" },
      { icon: "4️⃣", big: "50%", mid: "Before Apr 1", sub: "2027" },
      { icon: "3️⃣", big: "35%", mid: "Before Mar 1", sub: "2027" },
      { icon: "💵", big: "$1.43M", mid: "Volume", sub: "Kalshi" },
    ],
    ctx1: "Jonas: more cooperation, timing still a question",
    ctx2: "Wood: could be announced this year, an opinion",
  });

  pair("optimus-week", "L1", "TSLA", {
    badge: "TSLA", title: "옵티머스 연말 목표는 주 1,000대입니다",
    heroIcon: "🤖", heroBig: "1,000대", heroSub: "연말 목표입니다. 지금은 주 수백 대라는 전언입니다.",
    cards: c3(
      { icon: "🏭", big: "수백 대", mid: "지금", sub: "옛 S·X 라인 전언" },
      { icon: "🎯", big: "1,000+", mid: "연말 목표", sub: "매주" },
      { icon: "🔁", big: "시험", mid: "대부분 귀환", sub: "데이터 수집" },
    ),
  }, {
    badge: "TSLA", title: "The Optimus year-end goal is 1,000 a week",
    heroIcon: "🤖", heroBig: "1,000", heroSub: "A year-end goal. Today is hundreds a week, reportedly.",
    cards: c3(
      { icon: "🏭", big: "100s", mid: "Now", sub: "Old S/X line, reported" },
      { icon: "🎯", big: "1,000+", mid: "Year-end", sub: "Every week" },
      { icon: "🔁", big: "Testing", mid: "Most return", sub: "Data, not deliveries" },
    ),
  });

  pair("starlink-v3-60m", "L5", "SPCX", {
    badge: "SPCX", title: "스타링크 V3 날개 폭은 약 60미터입니다",
    heroIcon: "🛰️", heroBig: "60m", heroSub: "197피트. 하향 1테라비트, 상향 160기가비트.",
    before: { label: "팰컨9 한 번", big: "1배", sub: "오늘 용량 기준" },
    after: { label: "스타십 한 번", big: "약 20배", sub: "더해지는 용량" },
    cards: c3(
      { icon: "📏", big: "60m", mid: "날개", sub: "787에 가까운 폭" },
      { icon: "⬇️", big: "1Tbps", mid: "하향", sub: "위성 한 기" },
      { icon: "⬆️", big: "160G", mid: "상향", sub: "위성 한 기" },
    ),
  }, {
    badge: "SPCX", title: "Starlink V3 is about 60 meters across",
    heroIcon: "🛰️", heroBig: "60 m", heroSub: "197 feet. 1 Tbps down, 160 Gbps up.",
    before: { label: "One Falcon 9", big: "1x", sub: "Today's capacity" },
    after: { label: "One Starship", big: "~20x", sub: "Capacity added" },
    cards: c3(
      { icon: "📏", big: "60 m", mid: "Wings", sub: "Near a 787 span" },
      { icon: "⬇️", big: "1 Tbps", mid: "Downlink", sub: "Per satellite" },
      { icon: "⬆️", big: "160 G", mid: "Uplink", sub: "Per satellite" },
    ),
  });

  pair("tsmc-texas", "L2", "NVDA", {
    badge: "TSM", title: "TSMC가 텍사스를 미국 두 번째 거점으로 본다는 보도",
    heroIcon: "🏭", heroBig: "미결정", heroSub: "로이터는 최종 결정 전이라고 했습니다.",
    cards: [
      { label: "후보", big: "댈러스", mid: "텍사스", sub: "거론된 도시" },
      { label: "상한", big: "팹 6", mid: "대만 언론", sub: "확정 개수 아님" },
      { label: "애리조나", big: "2650억$", mid: "기존 약속", sub: "팹 12, 패키징, 연구" },
    ],
    detailHead: "이미 있는 약속",
    detailLines: [
      "소식통 둘, 최종 결정은 아직입니다.",
      "고객은 엔비디아, AMD, 인텔, 애플입니다.",
      "텍사스 금액을 애리조나에 더하지 않습니다.",
    ],
  }, {
    badge: "TSM", title: "TSMC is reported to be looking at Texas",
    heroIcon: "🏭", heroBig: "No decision", heroSub: "Reuters says there is no final decision.",
    cards: [
      { label: "City", big: "Dallas", mid: "Texas", sub: "A site under discussion" },
      { label: "Ceiling", big: "6 fabs", mid: "Taiwan press", sub: "Not a final count" },
      { label: "Arizona", big: "$265B", mid: "Already pledged", sub: "12 fabs, packaging, R&D" },
    ],
    detailHead: "Already pledged",
    detailLines: [
      "Two sources. No final decision.",
      "Customers: Nvidia, AMD, Intel, Apple.",
      "Do not add Texas on top of Arizona.",
    ],
  });

  pair("us10y-5302", "L1", "RATES", {
    badge: "RATES", title: "미국 10년 국채 금리가 5.302%입니다",
    heroIcon: "📉", heroBig: "5.302%", heroSub: "52주 최고. 오후 1시 15분 트레이드웹.",
    cards: c3(
      { icon: "⬆️", big: "+0.047", mid: "하루", sub: "상승 폭" },
      { icon: "🗣️", big: "5.30%", mid: "엘에리언", sub: "같은 날의 표현" },
      { icon: "📆", big: "금요일", mid: "고용", sub: "오전 8시 30분" },
    ),
  }, {
    badge: "RATES", title: "The U.S. 10-year yield is 5.302%",
    heroIcon: "📉", heroBig: "5.302%", heroSub: "A 52-week high. Tradeweb, 1:15 p.m. ET.",
    cards: c3(
      { icon: "⬆️", big: "+0.047", mid: "On the day", sub: "The move" },
      { icon: "🗣️", big: "5.30%", mid: "El-Erian", sub: "His wording" },
      { icon: "📆", big: "Friday", mid: "Jobs", sub: "8:30 a.m. ET" },
    ),
  });

  pair("grok-48-soon", "L3", "AI", {
    badge: "xAI", title: "그록 4.8 이름이 공식 빌드 저장소에 보입니다",
    heroIcon: "🧠", heroBig: "4.8", heroSub: "출시 공지는 아닙니다. 일주일에서 이주 여유.",
    cards: c3(
      { icon: "📦", big: "4.8", mid: "저장소", sub: "이름이 보이기 시작" },
      { icon: "🔀", big: "4.5", mid: "같이 참조", sub: "경로 시험" },
      { icon: "⏳", big: "1–2주", mid: "여유", sub: "임박 확정 아님" },
    ),
  }, {
    badge: "xAI", title: "The name Grok 4.8 is in the official build repo",
    heroIcon: "🧠", heroBig: "4.8", heroSub: "Not a release note. A week or two of slack.",
    cards: c3(
      { icon: "📦", big: "4.8", mid: "Repo", sub: "The name is showing up" },
      { icon: "🔀", big: "4.5", mid: "Also referenced", sub: "Routing tests" },
      { icon: "⏳", big: "1–2 wks", mid: "Slack", sub: "Not a ship date" },
    ),
  });

  pair("ark-dip", "L4", "TSLA", {
    badge: "ARK", badgeLine: "하락 매수", title: "아크가 테슬라 4만 8,352주를 샀습니다",
    heroIcon: "📥", heroBig: "1730만$", heroSub: "4만 8,352주. 새 목표 주가는 아닙니다.",
    cards: c3(
      { icon: "🔢", big: "48,352", mid: "주식 수", sub: "그날 매수" },
      { icon: "💵", big: "17.3M", mid: "달러", sub: "대략의 금액" },
      { icon: "🎯", big: "아님", mid: "목표 주가", sub: "체결일 뿐" },
    ),
  }, {
    badge: "ARK", badgeLine: "Bought the dip", title: "ARK bought 48,352 Tesla shares",
    heroIcon: "📥", heroBig: "$17.3M", heroSub: "48,352 shares. Not a new price target.",
    cards: c3(
      { icon: "🔢", big: "48,352", mid: "Shares", sub: "That purchase" },
      { icon: "💵", big: "$17.3M", mid: "Dollars", sub: "About" },
      { icon: "🎯", big: "Not a PT", mid: "Just the buy", sub: "No new target" },
    ),
  });

  pair("coreweave-rubin", "L2", "CRWV", {
    badge: "CRWV", title: "코어위브가 베라 루빈 NVL72를 연다고 밝혔습니다",
    heroIcon: "🖥️", heroBig: "NVL72", heroSub: "코그니션이 첫 고객으로 실제 업무를 돌립니다.",
    cards: [
      { label: "제품", big: "NVL72", mid: "베라 루빈", sub: "랙 규모" },
      { label: "첫 고객", big: "코그니션", mid: "생산 작업", sub: "점유율은 아님" },
      { label: "없는 것", big: "출하대수", mid: "오늘 발표", sub: "용량으로 환산 안 함" },
    ],
    detailHead: "오늘 확인된 것",
    detailLines: [
      "이용 가능하다고 알린 회사는 코어위브입니다.",
      "첫 고객은 코그니션입니다.",
      "출하 대수는 이 발표에 없습니다.",
    ],
  }, {
    badge: "CRWV", title: "CoreWeave said Vera Rubin NVL72 is available",
    heroIcon: "🖥️", heroBig: "NVL72", heroSub: "Cognition is the first production customer.",
    cards: [
      { label: "Product", big: "NVL72", mid: "Vera Rubin", sub: "Rack scale" },
      { label: "First", big: "Cognition", mid: "Production", sub: "Not a share number" },
      { label: "Not here", big: "No units", mid: "This note", sub: "Do not infer capacity" },
    ],
    detailHead: "What is confirmed",
    detailLines: [
      "CoreWeave said the systems are available.",
      "Cognition is the first customer.",
      "Shipment counts are not in the note.",
    ],
  });

  pair("power-2030", "L5", "MACRO", {
    badge: "POWER", title: "데이터센터 전력이 2030년 전 두 배가 될지를 묻습니다",
    heroIcon: "⚡", heroBig: "10%", heroSub: "무디스가 말한 2030년 미국 전기 비중입니다.",
    before: { label: "시장 질문", big: "2배", sub: "2030년 전" },
    after: { label: "무디스", big: "10%", sub: "2030년 전기 비중" },
    cards: c3(
      { icon: "❓", big: "2배", mid: "칼시", sub: "예 아니오 질문" },
      { icon: "🏦", big: "10%", mid: "무디스", sub: "시나리오" },
      { icon: "📆", big: "2030", mid: "기한", sub: "올해 청구서 아님" },
    ),
  }, {
    badge: "POWER", title: "Will data-center power double before 2030?",
    heroIcon: "⚡", heroBig: "10%", heroSub: "Moody's share of U.S. electricity in 2030.",
    before: { label: "Market", big: "2x", sub: "Before 2030" },
    after: { label: "Moody's", big: "10%", sub: "Of U.S. electricity" },
    cards: c3(
      { icon: "❓", big: "2x", mid: "Kalshi", sub: "A yes or no" },
      { icon: "🏦", big: "10%", mid: "Moody's", sub: "A scenario" },
      { icon: "📆", big: "2030", mid: "The date", sub: "Not this year's bill" },
    ),
  });

  pair("robinhood-247", "L6", "MACRO", {
    badge: "MKT", breaking: "소셜 주장", title: "주말 포함 24시간 거래는 아직 확인 문서가 없습니다",
    heroBig: "미확인", heroSub: "소셜 주장입니다. 위원회 명령은 이 아침에 없습니다.",
    grid: [
      { icon: "🗓️", big: "24시간", mid: "주장", sub: "주식·ETF" },
      { icon: "📆", big: "주말", mid: "포함", sub: "소셜 문장" },
      { icon: "📄", big: "없음", mid: "SEC 문서", sub: "이 아침" },
      { icon: "⏸️", big: "달력", mid: "그대로", sub: "문서 전" },
    ],
    ctx1: "한 앱의 문구와 국가 규칙은 효력이 다릅니다",
    ctx2: "시행일은 위원회 문서가 나와야 합니다",
  }, {
    badge: "MKT", breaking: "Social claim", title: "24/7 stock trading, including weekends, is not confirmed",
    heroBig: "Unconfirmed", heroSub: "A social claim. No SEC order in this report.",
    grid: [
      { icon: "🗓️", big: "24/7", mid: "Claimed", sub: "Stocks and ETFs" },
      { icon: "📆", big: "Weekends", mid: "Included", sub: "In the post" },
      { icon: "📄", big: "No filing", mid: "SEC", sub: "This morning" },
      { icon: "⏸️", big: "Same calendar", mid: "Until then", sub: "No effective date" },
    ],
    ctx1: "An app line and a national rule are not the same",
    ctx2: "The calendar changes when a commission document does",
  });

  pair("musk-ai-care", "L3", "TSLA", {
    badge: "TSLA", title: "머스크는 인공지능이 일과 진료 판단을 돕는다고 합니다",
    heroIcon: "🩺", heroBig: "일화", heroSub: "임상 시험 결과가 아닙니다.",
    cards: c3(
      { icon: "📋", big: "생활", mid: "일 정리", sub: "도움이 된다는 말" },
      { icon: "🩻", big: "영상", mid: "엑스레이·MRI", sub: "의사가 틀린 자리" },
      { icon: "🚫", big: "시험 아님", mid: "한 사람", sub: "성공률로 만들지 않음" },
    ),
  }, {
    badge: "TSLA", title: "Musk says AI helps with life, work, and some scans",
    heroIcon: "🩺", heroBig: "Anecdote", heroSub: "Not a clinical trial.",
    cards: c3(
      { icon: "📋", big: "Life", mid: "And work", sub: "Organizing help" },
      { icon: "🩻", big: "Scans", mid: "X-ray, MRI", sub: "Where a doctor was wrong" },
      { icon: "🚫", big: "Not a trial", mid: "One person", sub: "Not a success rate" },
    ),
  });

  pair("fsd-turo", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "한 사람의 예약", title: "30% 싼 렌트 대신 자율주행 차를 골랐습니다",
    heroIcon: "🚙", heroBig: "30%", heroSub: "그 예약의 가격 차입니다. 시장 점유율은 아닙니다.",
    cards: c3(
      { icon: "🏨", big: "허츠", mid: "더 싼 쪽", sub: "30% 비교" },
      { icon: "🚗", big: "투로", mid: "고른 쪽", sub: "자율주행이 되는 차" },
      { icon: "📣", big: "인용", mid: "공식 계정", sub: "한 건의 후기" },
    ),
  }, {
    badge: "TSLA", badgeLine: "One booking", title: "A renter paid up 30% to get supervised self-driving",
    heroIcon: "🚙", heroBig: "30%", heroSub: "That reservation's gap, not a market share.",
    cards: c3(
      { icon: "🏨", big: "Hertz", mid: "The cheaper one", sub: "30% less" },
      { icon: "🚗", big: "Turo", mid: "The pick", sub: "A self-driving car" },
      { icon: "📣", big: "Quoted", mid: "Tesla account", sub: "One review" },
    ),
  });

  pair("gemini-4", "L2", "GOOGL", {
    badge: "GOOGL", title: "제미나이 4 아르곤이라는 출시 줄이 떴습니다",
    heroIcon: "✨", heroBig: "아르곤", heroSub: "기능과 가격은 이 아침에 확인하지 못했습니다.",
    cards: [
      { label: "이름", big: "4 아르곤", mid: "제미나이", sub: "출시 줄" },
      { label: "나온 곳", big: "예측시장", mid: "화면의 줄", sub: "블로그 확인 전" },
      { label: "비움", big: "요금", mid: "지역", sub: "다음 공지" },
    ],
    detailHead: "오늘 적지 않는 것",
    detailLines: [
      "기능 목록은 확인하지 못했습니다.",
      "가격표는 다음 공지까지 비웁니다.",
      "가입자 수를 이 줄로 만들지 않습니다.",
    ],
  }, {
    badge: "GOOGL", title: "A line says Gemini 4 Argon has launched",
    heroIcon: "✨", heroBig: "Argon", heroSub: "Features and price were not confirmed this morning.",
    cards: [
      { label: "Name", big: "4 Argon", mid: "Gemini", sub: "The flash line" },
      { label: "Where", big: "Market UI", mid: "A headline", sub: "Not a blog post yet" },
      { label: "Blank", big: "Price", mid: "Regions", sub: "Next notice" },
    ],
    detailHead: "Left blank today",
    detailLines: [
      "The feature list is not confirmed.",
      "The price stays blank until a notice.",
      "Do not invent a subscriber count.",
    ],
  });
};
