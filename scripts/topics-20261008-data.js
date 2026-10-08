const { US } = require("./data-20261008-us");
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
  const F = "2026.10.08";

  add("summary", "ROWS", "MACRO", {
    headline: "2026.10.08 한장 요약",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "15000", title: "FCC가 스타링크 모바일 위성 최대 1만 5,000기를 승인했습니다", sub: "지상사 임대 없이 위성 무선 면제가 붙었습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "100x", title: "머스크가 스타링크 모바일 V2 대역폭 100배 이상이라고 했습니다", sub: "기당 처리량 20배·데이터 밀도 100배입니다." },
      { color: "#4ade80", fill: "#061209", right: "416", title: "오스틴 사이버캡 무인 목격이 하루 416건이었습니다", sub: "전체 557건, 지난주 대비 무인 68% 증가입니다." },
      { color: "#22c55e", fill: "#0a1a0a", right: "ZERO", title: "머스크가 테라팹을 직접 짓고 돌린다고 못 박았습니다", sub: "TSMC는 일부 전대만 가능하다는 취지입니다." },
      { color: "#38bdf8", fill: "#061520", right: "400억$", title: "스페이스X가 엔비디아 칩용 약 400억 달러 조달을 추진합니다", sub: "아폴로, 은행 100억·채권 300억, 2027년 종결 거론입니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "7.63%", title: "미국 30년 모기지 금리가 7.63%로 올랐습니다", sub: "2023년 11월 이후 최고입니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "10.86%", title: "ARKQ에서 테슬라 10.86%·스페이스X 9.24%입니다", sub: "두 종목만 20%를 넘습니다." },
      { color: "#fb7185", fill: "#1a0a10", right: "FSD", title: "독일 지지와 슬로바키아 FSD(Supervised) 승인이 나왔습니다", sub: "유럽 규제 모멘텀이 같은 날입니다." },
    ],
    caption: "1만 5,000기 · 100배 · 무인 416 · 테라팹 ZERO · 400억$ · 모기지 7.63%",
  }, {
    headline: "2026.10.08 Daily Snapshot",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "15000", title: "FCC approved up to 15,000 Starlink Mobile satellites", sub: "Waiver for satellite wireless without a ground MNO lease." },
      { color: "#60a5fa", fill: "#06121f", right: "100x", title: "Musk says Starlink Mobile V2 is 100x+ V1 bandwidth", sub: "20x throughput and 100x data density per sat." },
      { color: "#4ade80", fill: "#061209", right: "416", title: "Austin Cybercab logged 416 driverless sightings", sub: "557 total; driverless up 68% week over week." },
      { color: "#22c55e", fill: "#0a1a0a", right: "ZERO", title: "Musk said they will build and run the Terafab", sub: "TSMC may only sublease part of it." },
      { color: "#38bdf8", fill: "#061520", right: "$40B", title: "SpaceX is seeking about $40B for Nvidia chips", sub: "Apollo-led; close eyed for 2027." },
      { color: "#f59e0b", fill: "#1a1205", right: "7.63%", title: "The 30-year mortgage rate jumped to 7.63%", sub: "Highest since November 2023." },
      { color: "#a78bfa", fill: "#120b1f", right: "10.86%", title: "ARKQ: TSLA 10.86% and SPCX 9.24%", sub: "Two Musk names top 20% of the fund." },
      { color: "#fb7185", fill: "#1a0a10", right: "FSD", title: "Germany backed FSD and Slovakia approved Supervised", sub: "European regulatory momentum the same day." },
    ],
    caption: "15,000 sats · 100x · 416 driverless · Terafab ZERO · $40B · mortgage 7.63%",
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

  pair("spcx-fcc-15000", "L1", "SPCX", {
    badge: "SPCX", title: "FCC가 스타링크 모바일 위성 최대 1만 5,000기를 승인했습니다",
    heroIcon: "📡", heroBig: "15,000", heroSub: "다이렉트 투 폰용 차세대 위성입니다. 지상사 임대 면제가 붙었습니다.",
    cards: c3(
      { icon: "🛰️", big: "~650", mid: "궤도", sub: "전용 모바일 위성" },
      { icon: "📶", big: "150", mid: "Mbps", sub: "피크 목표" },
      { icon: "🌍", big: "326km", mid: "고도", sub: "초저궤도 부근" },
    ),
  }, {
    badge: "SPCX", title: "FCC approved up to 15,000 Starlink Mobile satellites",
    heroIcon: "📡", heroBig: "15,000", heroSub: "Next-gen direct-to-phone sats. Waiver without a ground MNO lease.",
    cards: c3(
      { icon: "🛰️", big: "~650", mid: "In orbit", sub: "Dedicated mobile sats" },
      { icon: "📶", big: "150", mid: "Mbps", sub: "Peak target" },
      { icon: "🌍", big: "326km", mid: "Altitude", sub: "Very low Earth orbit" },
    ),
  });

  pair("spcx-starlink-100x", "L5", "SPCX", {
    badge: "SPCX", title: "스타링크 모바일 V2 대역폭이 V1의 100배 이상입니다",
    heroIcon: "📶", heroBig: "100x", heroSub: "머스크 발언입니다. 일반 폰 통화·스트리밍·5G급을 겨냥합니다.",
    before: { label: "V1", big: "1x", sub: "현재 시스템" },
    after: { label: "V2", big: "100x", sub: "차세대 대역폭" },
    cards: c3(
      { icon: "⬆️", big: "20x", mid: "처리량", sub: "기당" },
      { icon: "📦", big: "100x", mid: "밀도", sub: "데이터" },
      { icon: "📱", big: "5G", mid: "목표", sub: "일반 폰" },
    ),
  }, {
    badge: "SPCX", title: "Starlink Mobile V2 enables more than 100x V1 bandwidth",
    heroIcon: "📶", heroBig: "100x", heroSub: "Musk's print. Native calls, streaming, 5G-class for phones.",
    before: { label: "V1", big: "1x", sub: "Current system" },
    after: { label: "V2", big: "100x", sub: "Next-gen bandwidth" },
    cards: c3(
      { icon: "⬆️", big: "20x", mid: "Throughput", sub: "Per satellite" },
      { icon: "📦", big: "100x", mid: "Density", sub: "Data" },
      { icon: "📱", big: "5G", mid: "Target", sub: "Ordinary phones" },
    ),
  });

  pair("spcx-nvda-40b", "L2", "SPCX", {
    badge: "SPCX", title: "스페이스X가 엔비디아 칩용 약 400억 달러 조달을 추진합니다",
    heroIcon: "💰", heroBig: "$40B", heroSub: "아폴로가 이끕니다. 종결은 2027년이 거론됩니다.",
    cards: [
      { label: "은행", big: "$10B", mid: "대출", sub: "구조의 한 축" },
      { label: "채권", big: "$30B", mid: "투자등급", sub: "나머지 축" },
      { label: "칩", big: "Rubin", mid: "아키텍처", sub: "엔비디아 전용" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "조달 추진과 실제 칩 인도를 한 줄로 만들지 않습니다.",
      "베라 루빈은 아키텍처 이름입니다.",
      "다음 확인은 채권 발행 공시입니다.",
    ],
  }, {
    badge: "SPCX", title: "SpaceX is seeking about $40B to buy Nvidia chips",
    heroIcon: "💰", heroBig: "$40B", heroSub: "Apollo-led. Close eyed for 2027.",
    cards: [
      { label: "Bank", big: "$10B", mid: "Loans", sub: "One leg" },
      { label: "Bonds", big: "$30B", mid: "IG debt", sub: "Other leg" },
      { label: "Chip", big: "Rubin", mid: "Architecture", sub: "Nvidia-only build" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Fundraising intent is not chip delivery.",
      "Vera Rubin is the architecture name.",
      "Bond filings are next.",
    ],
  });

  pair("spcx-ai-compute", "L2", "SPCX", {
    badge: "SPCX", title: "AI 연산 계약이 월 약 34억 달러, 연환산 410억 달러 이상이라는 집계입니다",
    heroIcon: "🖥️", heroBig: "$41B", heroSub: "네 건을 더한 연환산입니다. 소셜 집계와 공시를 나눕니다.",
    cards: [
      { label: "앤트로픽", big: "1.25B", mid: "/월", sub: "집계" },
      { label: "구글", big: "920M", mid: "/월", sub: "집계" },
      { label: "미공개", big: "1.11B", mid: "/월", sub: "12월 1일~" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "Reflection AI는 월 약 1억 5천만 달러입니다.",
      "합계 월 약 34억 3천만 달러입니다.",
      "공시 매출표와 섞지 않습니다.",
    ],
  }, {
    badge: "SPCX", title: "AI compute deals tallied near $3.43B/month, over $41B annualized",
    heroIcon: "🖥️", heroBig: "$41B", heroSub: "Sum of four deals. Keep social tallies off filings.",
    cards: [
      { label: "Anthropic", big: "1.25B", mid: "/mo", sub: "Tally" },
      { label: "Google", big: "920M", mid: "/mo", sub: "Tally" },
      { label: "Unnamed", big: "1.11B", mid: "/mo", sub: "From Dec 1" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Reflection AI is about $150M/month.",
      "Monthly sum is about $3.43B.",
      "Not a company revenue filing.",
    ],
  });

  pair("terafab-zero", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "테라팹", title: "머스크가 테라팹을 직접 짓고 돌린다고 못 박았습니다",
    heroIcon: "🏭", heroBig: "ZERO", heroSub: "의심의 여지를 제로로 두라고 했습니다. TSMC는 일부 전대만 가능하다는 취지입니다.",
    cards: c3(
      { icon: "🛠️", big: "직접", mid: "건설·운영", sub: "팹 주인" },
      { icon: "🏢", big: "전대", mid: "TSMC", sub: "일부만" },
      { icon: "🚀", big: "TSLA", mid: "+SPCX", sub: "용도" },
    ),
  }, {
    badge: "TSLA", badgeLine: "Terafab", title: "Musk said ZERO doubt they will build and run the Terafab",
    heroIcon: "🏭", heroBig: "ZERO", heroSub: "TSMC may sublease part, nothing more.",
    cards: c3(
      { icon: "🛠️", big: "Own", mid: "Build/run", sub: "Fab control" },
      { icon: "🏢", big: "Sublease", mid: "TSMC", sub: "Partial only" },
      { icon: "🚀", big: "TSLA", mid: "+SPCX", sub: "Use case" },
    ),
  });

  pair("intel-terafab", "L3", "TSLA", {
    badge: "INTC", title: "인텔 CEO가 테라팹 협력을 이어 간다고 확인했습니다",
    heroIcon: "✅", heroBig: "계속", heroSub: "도쿄 발언입니다. 4월부터 설계·제조·패키징 파트너입니다.",
    cards: c3(
      { icon: "🤝", big: "4월", mid: "합류", sub: "개발 파트너" },
      { icon: "🧩", big: "설계", mid: "제조", sub: "패키징" },
      { icon: "🗼", big: "도쿄", mid: "확인", sub: "지속 발언" },
    ),
  }, {
    badge: "INTC", title: "Intel CEO confirmed Terafab work with Musk continues",
    heroIcon: "✅", heroBig: "Continue", heroSub: "Tokyo comments. Partner since April on design, make, package.",
    cards: c3(
      { icon: "🤝", big: "April", mid: "Joined", sub: "Dev partner" },
      { icon: "🧩", big: "Design", mid: "Make", sub: "Package" },
      { icon: "🗼", big: "Tokyo", mid: "Confirm", sub: "Still on" },
    ),
  });

  pair("tsla-germany-fsd", "L6", "TSLA", {
    badge: "TSLA", title: "독일이 테슬라 FSD 추진을 지지합니다",
    heroIcon: "🇩🇪", heroBig: "지지", heroSub: "유럽연합 전역 투표가 다가옵니다. 최종 출시 공고와는 다른 단계입니다.",
    cards: c3(
      { icon: "🗳️", big: "EU", mid: "표결", sub: "다가옴" },
      { icon: "🚗", big: "FSD", mid: "추진", sub: "독일 지지" },
      { icon: "📅", big: "다음", mid: "공고", sub: "출시 일정" },
    ),
  }, {
    badge: "TSLA", title: "Germany backs Tesla's FSD push",
    heroIcon: "🇩🇪", heroBig: "Backs", heroSub: "EU-wide vote nears. Not the final launch notice.",
    cards: c3(
      { icon: "🗳️", big: "EU", mid: "Vote", sub: "Approaching" },
      { icon: "🚗", big: "FSD", mid: "Push", sub: "German support" },
      { icon: "📅", big: "Next", mid: "Notice", sub: "Launch calendar" },
    ),
  });

  pair("tsla-slovakia-fsd", "L3", "TSLA", {
    badge: "TSLA", title: "슬로바키아가 테슬라 FSD(Supervised)를 승인했습니다",
    heroIcon: "✅", heroBig: "승인", heroSub: "공식 최종 준비가 며칠 안입니다. Supervised는 운전자 책임 단계입니다.",
    cards: c3(
      { icon: "🇸🇰", big: "국가", mid: "승인", sub: "다음 확인국" },
      { icon: "🧑‍✈️", big: "Supervised", mid: "단계", sub: "운전자 책임" },
      { icon: "📲", big: "앱", mid: "다음", sub: "활성화 공지" },
    ),
  }, {
    badge: "TSLA", title: "Slovakia approved Tesla FSD (Supervised)",
    heroIcon: "✅", heroBig: "Approved", heroSub: "Final paperwork in days. Driver remains responsible.",
    cards: c3(
      { icon: "🇸🇰", big: "Country", mid: "OK", sub: "Next confirmed" },
      { icon: "🧑‍✈️", big: "Supervised", mid: "Stage", sub: "Driver on hook" },
      { icon: "📲", big: "App", mid: "Next", sub: "Enable notice" },
    ),
  });

  pair("tsla-cybercab-416", "L2", "TSLA", {
    badge: "TSLA", title: "오스틴 사이버캡 목격 557건, 무인 416건입니다",
    heroIcon: "🚕", heroBig: "416", heroSub: "축제 아닌 날 무인 최고입니다. 무인 비중 75%입니다.",
    cards: [
      { label: "전체", big: "557", mid: "건", sub: "어제 목격" },
      { label: "무인", big: "+68%", mid: "주간", sub: "248→416" },
      { label: "비중", big: "75%", mid: "무인", sub: "어제 비중" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "지난주 화요일 전체는 371건이었습니다.",
      "전체는 주간 50% 늘었습니다.",
      "목격과 유료 호출 매출을 섞지 않습니다.",
    ],
  }, {
    badge: "TSLA", title: "Austin Cybercab: 557 sightings, 416 driverless",
    heroIcon: "🚕", heroBig: "416", heroSub: "Highest non-festival driverless day. 75% driverless share.",
    cards: [
      { label: "Total", big: "557", mid: "hits", sub: "Yesterday" },
      { label: "Driverless", big: "+68%", mid: "WoW", sub: "248→416" },
      { label: "Share", big: "75%", mid: "Unmanned", sub: "Yesterday" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Last Tuesday total was 371.",
      "Total sightings rose 50% week over week.",
      "Sightings are not paid-ride revenue.",
    ],
  });

  pair("tsla-halloween", "L3", "TSLA", {
    badge: "TSLA", title: "테슬라가 할로윈 모드를 배포하기 시작했습니다",
    heroIcon: "🎃", heroBig: "Halloween", heroSub: "트릭 오어 트리트·라이트쇼·포토부스·앱 원격 말하기가 포함됩니다.",
    cards: c3(
      { icon: "👻", big: "유령", mid: "아바타", sub: "코스튬" },
      { icon: "💡", big: "라이트", mid: "쇼", sub: "랩·잠금음" },
      { icon: "📱", big: "원격", mid: "말하기", sub: "앱으로" },
    ),
  }, {
    badge: "TSLA", title: "Tesla Halloween Mode is rolling out",
    heroIcon: "🎃", heroBig: "Halloween", heroSub: "Trick or Treat, light show, Photobooth, remote speak.",
    cards: c3(
      { icon: "👻", big: "Ghost", mid: "Avatar", sub: "Costume" },
      { icon: "💡", big: "Light", mid: "Show", sub: "Wraps & lock" },
      { icon: "📱", big: "Remote", mid: "Speak", sub: "Via app" },
    ),
  });

  pair("tsla-arkq", "L1", "TSLA", {
    badge: "ARKQ", title: "ARKQ에서 테슬라 10.86%·스페이스X 9.24%입니다",
    heroIcon: "📊", heroBig: "20%+", heroSub: "머스크 관련 두 종목 합입니다. 테슬라는 약 377달러, 연초 대비 약 16% 하락입니다.",
    cards: c3(
      { icon: "1️⃣", big: "10.86%", mid: "TSLA", sub: "1위 비중" },
      { icon: "2️⃣", big: "9.24%", mid: "SPCX", sub: "2위 비중" },
      { icon: "💵", big: "377", mid: "달러", sub: "테슬라 부근" },
    ),
  }, {
    badge: "ARKQ", title: "ARKQ: TSLA 10.86% and SPCX 9.24%",
    heroIcon: "📊", heroBig: "20%+", heroSub: "Two Musk names. TSLA near $377, about −16% YTD.",
    cards: c3(
      { icon: "1️⃣", big: "10.86%", mid: "TSLA", sub: "Top weight" },
      { icon: "2️⃣", big: "9.24%", mid: "SPCX", sub: "No.2 weight" },
      { icon: "💵", big: "377", mid: "USD", sub: "TSLA area" },
    ),
  });

  pair("grok-multimodel", "L4", "TSLA", {
    badge: "GROK", badgeLine: "멀티엔진", title: "그록 봇이 클로드 오퍼스 5.5·미드저니·수노를 작업마다 고릅니다",
    heroIcon: "🤖", heroBig: "Best", heroSub: "작업에 맞는 엔진으로 라우팅합니다. 종합건설이 전문가를 고용하는 비유입니다.",
    cards: c3(
      { icon: "🧠", big: "Opus", mid: "5.5", sub: "클로드" },
      { icon: "🎨", big: "MJ", mid: "이미지", sub: "미드저니" },
      { icon: "🎵", big: "Suno", mid: "음악", sub: "외부 모델" },
    ),
  }, {
    badge: "GROK", badgeLine: "Multi-model", title: "Grok Bot routes to Claude Opus 5.5, Midjourney, and Suno",
    heroIcon: "🤖", heroBig: "Best", heroSub: "Best engine per job. General-contractor analogy.",
    cards: c3(
      { icon: "🧠", big: "Opus", mid: "5.5", sub: "Claude" },
      { icon: "🎨", big: "MJ", mid: "Image", sub: "Midjourney" },
      { icon: "🎵", big: "Suno", mid: "Music", sub: "Outside model" },
    ),
  });

  pair("nvda-nvlink-250b", "L1", "NVDA", {
    badge: "NVDA", title: "NVLink Fusion 기회가 2030년까지 2,500억 달러입니다",
    heroIcon: "🔗", heroBig: "$250B", heroSub: "십 년 말 기회 상단입니다. AWS와 인텔이 스케일업에 씁니다.",
    cards: c3(
      { icon: "☁️", big: "AWS", mid: "채택", sub: "스케일업" },
      { icon: "💻", big: "INTC", mid: "채택", sub: "스케일업" },
      { icon: "📅", big: "2030", mid: "말", sub: "기회 구간" },
    ),
  }, {
    badge: "NVDA", title: "NVLink Fusion opportunity sized at $250B by decade end",
    heroIcon: "🔗", heroBig: "$250B", heroSub: "Opportunity through 2030. AWS and Intel adopt scale-up.",
    cards: c3(
      { icon: "☁️", big: "AWS", mid: "Adopt", sub: "Scale-up" },
      { icon: "💻", big: "INTC", mid: "Adopt", sub: "Scale-up" },
      { icon: "📅", big: "2030", mid: "End", sub: "Opportunity window" },
    ),
  });

  pair("mortgage-763", "L5", "MACRO", {
    badge: "RATE", title: "미국 30년 모기지 금리가 7.63%입니다",
    heroIcon: "🏠", heroBig: "7.63%", heroSub: "2023년 11월 이후 최고입니다. 10월 7일 수요일 숫자입니다.",
    before: { label: "저점 부근", big: "~6%", sub: "2026년 초" },
    after: { label: "오늘", big: "7.63%", sub: "11월 후 최고" },
    cards: c3(
      { icon: "📈", big: "10Y", mid: "5.35%", sub: "국채 부근" },
      { icon: "💵", big: "DXY", mid: "102.5", sub: "달러 부근" },
      { icon: "📅", big: "FOMC", mid: "의사록", sub: "다음 일정" },
    ),
  }, {
    badge: "RATE", title: "The 30-year mortgage rate is 7.63%",
    heroIcon: "🏠", heroBig: "7.63%", heroSub: "Highest since November 2023. Wednesday, October 7 print.",
    before: { label: "Earlier low", big: "~6%", sub: "Early 2026" },
    after: { label: "Now", big: "7.63%", sub: "Post-Nov high" },
    cards: c3(
      { icon: "📈", big: "10Y", mid: "5.35%", sub: "Treasury area" },
      { icon: "💵", big: "DXY", mid: "102.5", sub: "Dollar area" },
      { icon: "📅", big: "FOMC", mid: "Minutes", sub: "Next catalyst" },
    ),
  });

  pair("rivian-vw-1b", "L2", "TSLA", {
    badge: "RIVN", title: "리비안이 폭스바겐 10억 달러 대출을 받았습니다",
    heroIcon: "🏦", heroBig: "$1B", heroSub: "10년·고정 6.03%·비소구입니다. 담보는 합작 지분 50%입니다.",
    cards: [
      { label: "금리", big: "6.03%", mid: "고정", sub: "10년" },
      { label: "담보", big: "50%", mid: "합작", sub: "지분" },
      { label: "원금", big: "$100M", mid: "/년", sub: "3년 차부터" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "잔액 만기는 2036년 10월입니다.",
      "일반 회사 운용 자금으로 씁니다.",
      "테슬라 수요와 직접 대결 숫자가 아닙니다.",
    ],
  }, {
    badge: "RIVN", title: "Rivian received a $1B loan from Volkswagen",
    heroIcon: "🏦", heroBig: "$1B", heroSub: "10-year, 6.03% fixed, non-recourse. Collateral is 50% JV stake.",
    cards: [
      { label: "Rate", big: "6.03%", mid: "Fixed", sub: "10 years" },
      { label: "Collateral", big: "50%", mid: "JV", sub: "Stake" },
      { label: "Principal", big: "$100M", mid: "/yr", sub: "From year 3" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Balance due October 2036.",
      "Cash for general corporate purposes.",
      "Not a direct Tesla demand print.",
    ],
  });
};
