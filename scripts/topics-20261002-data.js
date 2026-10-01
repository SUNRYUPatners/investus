const { US } = require("./data-20261002-us");
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
  const F = "2026.10.02";

  add("summary", "ROWS", "MACRO", {
    headline: "2026.10.02 한장 요약",
    rows: [
      { color: "#4ade80", fill: "#061209", right: "2.4TWh", title: "테슬라 충전망이 3분기에 2.4테라와트시를 흘렸습니다", sub: "세션 6,900만 번, 칸 2,700개, 휘발유 11억 리터입니다." },
      { color: "#c084fc", fill: "#140b1f", right: "11153", title: "스타링크가 지구 궤도에 약 1만 1,153기 있습니다", sub: "사상 최대 별자리이고 V3가 다음 단계입니다." },
      { color: "#ef4444", fill: "#1a0a0a", right: "76.2%", title: "10월 28일 연준 동결 확률은 76.2%입니다", sub: "인상은 23.8%입니다. 내일 고용이 있습니다." },
      { color: "#facc15", fill: "#1a1600", right: "3.13%", title: "일본 10년 금리는 3.1299%로 30년 최고입니다", sub: "하루 0.0332%포인트 올랐습니다." },
      { color: "#4ade80", fill: "#0a1a0a", right: "+61.9%", title: "프랑스 9월 테슬라 등록이 61.9% 늘었습니다", sub: "스웨덴은 38.4%, 대만 수입차는 테슬라가 1위입니다." },
      { color: "#c084fc", fill: "#1a0f2a", right: "81%", title: "스페이스X 주식의 81%는 아직 잠겨 있습니다", sub: "10월 9일과 24일에 5%가 더 풀립니다." },
      { color: "#4285f4", fill: "#06121f", right: "TPU4", title: "구글이 TPU 4개를 팰컨 9에 실어 올렸습니다", sub: "프로젝트 선캐처 첫 위성입니다." },
      { color: "#ff9900", fill: "#1a0e00", right: "690MW", title: "아마존이 원전 전력 690메가와트를 20년 계약했습니다", sub: "90메가와트는 캘버트클리프스 업그레이드입니다." },
    ],
    caption: "2.4테라와트시 · 스타링크 1만 1,153기 · 동결 76.2% · 일본 3.1299% · 프랑스 61.9% · 잠금 81%",
  }, {
    headline: "2026.10.02 Daily Snapshot",
    rows: [
      { color: "#4ade80", fill: "#061209", right: "2.4TWh", title: "Tesla charging delivered 2.4 TWh in the third quarter", sub: "69 million sessions, 2,700 new stalls, 1.1 billion liters saved." },
      { color: "#c084fc", fill: "#140b1f", right: "11153", title: "About 11,153 Starlink satellites are now in orbit", sub: "The largest constellation. V3 is the next step." },
      { color: "#ef4444", fill: "#1a0a0a", right: "76.2%", title: "Odds of a Fed hold on October 28 are 76.2%", sub: "A hike is 23.8%. Payrolls are tomorrow." },
      { color: "#facc15", fill: "#1a1600", right: "3.13%", title: "Japan's 10-year yield is 3.1299%, a 30-year high", sub: "Up 0.0332 percentage points." },
      { color: "#4ade80", fill: "#0a1a0a", right: "+61.9%", title: "France's September Tesla registrations rose 61.9%", sub: "Sweden rose 38.4%. Tesla led Taiwan imports." },
      { color: "#c084fc", fill: "#1a0f2a", right: "81%", title: "81% of SpaceX stock is still locked", sub: "Another 5% unlocks on October 9 and 24." },
      { color: "#4285f4", fill: "#06121f", right: "4 TPUs", title: "Google sent four TPUs up on a Falcon 9", sub: "The first Project Suncatcher satellite." },
      { color: "#ff9900", fill: "#1a0e00", right: "690MW", title: "Amazon bought 690 MW of nuclear power for 20 years", sub: "90 MW is new Calvert Cliffs capacity." },
    ],
    caption: "2.4 TWh · 11,153 Starlinks · Fed hold 76.2% · Japan 3.1299% · France +61.9% · 81% locked",
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

  pair("tsla-charging-q3", "L1", "TSLA", {
    badge: "TSLA", title: "테슬라 충전망이 3분기에 2.4테라와트시를 흘렸습니다",
    heroIcon: "⚡", heroBig: "2.4TWh", heroSub: "세션 6,900만 번. 칸 2,700개가 새로 열렸습니다.",
    cards: c3(
      { icon: "🔌", big: "2,700칸", mid: "+15%", sub: "슈퍼차저가 새로 열렸습니다" },
      { icon: "⛽", big: "11억L", mid: "휘발유", sub: "탄소 44억 킬로그램을 덜었습니다" },
      { icon: "🚕", big: "7.0GWh", mid: "로보택시", sub: "자율주행 해제 100%입니다" },
    ),
  }, {
    badge: "TSLA", title: "Tesla charging delivered 2.4 TWh in Q3",
    heroIcon: "⚡", heroBig: "2.4TWh", heroSub: "69 million sessions. 2,700 new Supercharger stalls.",
    cards: c3(
      { icon: "🔌", big: "2,700", mid: "+15%", sub: "New Supercharger stalls" },
      { icon: "⛽", big: "1.1B L", mid: "Gasoline", sub: "4.4 billion kg of CO2 avoided" },
      { icon: "🚕", big: "7.0GWh", mid: "Robotaxi", sub: "100% autonomy unlocked" },
    ),
  });

  pair("nke-earnings", "L2", "NKE", {
    badge: "NKE", title: "나이키 주당순이익은 0.48달러입니다",
    heroIcon: "👟", heroBig: "$0.48", heroSub: "예상 0.44달러를 넘겼고 매출은 112억 달러입니다.",
    cards: [
      { label: "매출", big: "112억$", mid: "예상 113억", sub: "전년보다 4% 줄었습니다" },
      { label: "북미", big: "+2%", mid: "성장 전환", sub: "중국은 26% 줄었습니다" },
      { label: "가이드", big: "1.15~1.35", mid: "연간 EPS", sub: "페이스 25억 달러 절감" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "총이익률은 42.8%로 0.60%포인트 올랐습니다.",
      "골드만삭스 목표 주가는 38달러입니다.",
      "팩트셋 평균 목표는 47.32달러입니다.",
    ],
  }, {
    badge: "NKE", title: "Nike earned $0.48 a share",
    heroIcon: "👟", heroBig: "$0.48", heroSub: "Beat $0.44. Revenue was $11.2 billion.",
    cards: [
      { label: "Sales", big: "$11.2B", mid: "vs $11.3B", sub: "Down 4% year on year" },
      { label: "NA", big: "+2%", mid: "Back to growth", sub: "Greater China fell 26%" },
      { label: "Guide", big: "$1.15-1.35", mid: "FY EPS", sub: "Pace saves $2.5B" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Gross margin expanded 60 bp to 42.8%.",
      "Goldman Sachs is at $38.",
      "The FactSet average target is $47.32.",
    ],
  });

  pair("tsla-europe-sep", "L5", "TSLA", {
    badge: "TSLA", title: "유럽 9월 테슬라 등록이 프랑스에서 61.9% 늘었습니다",
    heroIcon: "🚗", heroBig: "+61.9%", heroSub: "프랑스 9월 등록입니다. 스웨덴은 38.4% 늘었습니다.",
    before: { label: "2025.09", big: "기준연", sub: "지난해 같은 달" },
    after: { label: "2026.09", big: "+61.9%", sub: "프랑스 등록" },
    cards: c3(
      { icon: "🇫🇷", big: "+61.9%", mid: "프랑스", sub: "가장 큰 증가입니다" },
      { icon: "🇸🇪", big: "+38.4%", mid: "스웨덴", sub: "이번 달 38% 급증" },
      { icon: "🇳🇴", big: "+2.2%", mid: "노르웨이", sub: "베이스가 두꺼운 시장" },
    ),
  }, {
    badge: "TSLA", title: "Tesla registrations rose 61.9% in France in September",
    heroIcon: "🚗", heroBig: "+61.9%", heroSub: "France in September. Sweden rose 38.4%.",
    before: { label: "2025.09", big: "Base", sub: "Same month last year" },
    after: { label: "2026.09", big: "+61.9%", sub: "France" },
    cards: c3(
      { icon: "🇫🇷", big: "+61.9%", mid: "France", sub: "The largest gain" },
      { icon: "🇸🇪", big: "+38.4%", mid: "Sweden", sub: "A 38% surge this month" },
      { icon: "🇳🇴", big: "+2.2%", mid: "Norway", sub: "A thick installed base" },
    ),
  });

  pair("tsla-italy-sep", "L3", "TSLA", {
    badge: "TSLA", title: "이탈리아가 2026년 9월 테슬라 판매 최고를 찍었습니다",
    heroIcon: "🇮🇹", heroBig: "9월최고", heroSub: "역대 9월 가운데 가장 많은 판매입니다.",
    cards: c3(
      { icon: "📅", big: "2026.09", mid: "이탈리아", sub: "역대 9월 최고입니다" },
      { icon: "🇫🇷", big: "+61.9%", mid: "같은 달", sub: "프랑스 등록입니다" },
      { icon: "🚗", big: "모델Y", mid: "새 차체", sub: "남유럽 번호판에도" },
    ),
  }, {
    badge: "TSLA", title: "Italy posted its best September for Tesla sales",
    heroIcon: "🇮🇹", heroBig: "Best Sep", heroSub: "The strongest September on record.",
    cards: c3(
      { icon: "📅", big: "2026.09", mid: "Italy", sub: "Best September ever" },
      { icon: "🇫🇷", big: "+61.9%", mid: "Same month", sub: "France registrations" },
      { icon: "🚗", big: "Model Y", mid: "New body", sub: "Now on southern plates" },
    ),
  });

  pair("tsla-taiwan-sep", "L6", "TSLA", {
    badge: "TSLA", breaking: "수입 1위", title: "대만 9월 수입차 1위가 테슬라입니다",
    heroBig: "1위", heroSub: "교통부 수입 전체 시장 순위입니다.",
    grid: [
      { icon: "🥇", big: "테슬라", mid: "1위", sub: "수입 전체" },
      { icon: "2️⃣", big: "토요타", mid: "2위", sub: "수입" },
      { icon: "3️⃣", big: "벤츠", mid: "3위", sub: "수입" },
      { icon: "4️⃣", big: "렉서스", mid: "4위", sub: "BMW가 5위" },
    ],
    ctx1: "시승 예약 창이 tesla.com 대만 드라이브로 열려 있습니다",
    ctx2: "수입차 표입니다. 전체 승용 1위와 섞지 않습니다",
  }, {
    badge: "TSLA", breaking: "Import No.1", title: "Tesla was Taiwan's top imported brand in September",
    heroBig: "No.1", heroSub: "Ministry of Transportation import ranking.",
    grid: [
      { icon: "🥇", big: "Tesla", mid: "1st", sub: "All imports" },
      { icon: "2️⃣", big: "Toyota", mid: "2nd", sub: "Import" },
      { icon: "3️⃣", big: "Mercedes", mid: "3rd", sub: "Import" },
      { icon: "4️⃣", big: "Lexus", mid: "4th", sub: "BMW fifth" },
    ],
    ctx1: "The Taiwan test-drive page is open",
    ctx2: "An import table, not the whole passenger market",
  });

  pair("starlink-gen-size", "L2", "SPCX", {
    badge: "SPCX", title: "스타링크는 세대마다 크기가 두 배 가까이 커집니다",
    heroIcon: "🛰️", heroBig: "75m", heroSub: "첫 궤도 인공지능 위성의 날개 폭입니다. V3는 60미터입니다.",
    cards: [
      { label: "V1.5", big: "11m", mid: "초기 세대", sub: "전개 폭 약 11미터" },
      { label: "V3", big: "60m", mid: "지금", sub: "월요일에 전개됐습니다" },
      { label: "전력", big: "250kW", mid: "스타마인드", sub: "정거장보다 약 20% 많습니다" },
    ],
    detailHead: "세대 비교",
    detailLines: [
      "V2 미니는 약 30미터입니다.",
      "75미터는 다음 세대 그림입니다.",
      "25만 와트는 단독 위성의 태양광입니다.",
    ],
  }, {
    badge: "SPCX", title: "Each Starlink generation roughly doubles in size",
    heroIcon: "🛰️", heroBig: "75m", heroSub: "Wingspan of the first orbital AI satellite. V3 is 60 meters.",
    cards: [
      { label: "V1.5", big: "11m", mid: "Early", sub: "About 11 meters deployed" },
      { label: "V3", big: "60m", mid: "Now", sub: "Deployed on Monday" },
      { label: "Power", big: "250kW", mid: "StarMind", sub: "About 20% more than the ISS" },
    ],
    detailHead: "Generations",
    detailLines: [
      "V2 Mini is about 30 meters.",
      "75 meters is the next drawing.",
      "250 kW is one satellite's solar power.",
    ],
  });

  pair("starlink-11153", "L1", "SPCX", {
    badge: "SPCX", title: "스타링크가 지구 궤도에 약 1만 1,153기 있습니다",
    heroIcon: "🌍", heroBig: "11,153", heroSub: "점 하나가 위성 한 대입니다. 사상 최대 별자리입니다.",
    cards: c3(
      { icon: "🛰️", big: "11,153기", mid: "지금", sub: "그림 가운데 숫자입니다" },
      { icon: "📡", big: "V3", mid: "다음 단계", sub: "기당 대역이 커집니다" },
      { icon: "🚀", big: "주 단위", mid: "발사 리듬", sub: "대수가 더해지는 칸입니다" },
    ),
  }, {
    badge: "SPCX", title: "About 11,153 Starlink satellites orbit Earth",
    heroIcon: "🌍", heroBig: "11,153", heroSub: "Each dot is one satellite. The largest constellation ever.",
    cards: c3(
      { icon: "🛰️", big: "11,153", mid: "Now", sub: "The number on the graphic" },
      { icon: "📡", big: "V3", mid: "Next step", sub: "More bandwidth per bird" },
      { icon: "🚀", big: "Weekly", mid: "Cadence", sub: "How fast the count grows" },
    ),
  });

  pair("amzn-nuclear-690", "L4", "AMZN", {
    badge: "AMZN", badgeLine: "20년 계약", title: "아마존이 원전 전력 690메가와트를 사기로 했습니다",
    heroIcon: "⚛️", heroBig: "690MW", heroSub: "컨스텔레이션에너지와 20년 계약입니다. 90메가와트는 신규입니다.",
    cards: c3(
      { icon: "📅", big: "20년", mid: "구매계약", sub: "서버 한 세대보다 깁니다" },
      { icon: "➕", big: "90MW", mid: "신규", sub: "캘버트클리프스 업그레이드" },
      { icon: "🎯", big: "375$", mid: "골드만", sub: "컨빅션 리스트 목표입니다" },
    ),
  }, {
    badge: "AMZN", badgeLine: "20-year PPA", title: "Amazon agreed to buy 690 MW of nuclear power",
    heroIcon: "⚛️", heroBig: "690MW", heroSub: "A 20-year deal with Constellation. 90 MW is new.",
    cards: c3(
      { icon: "📅", big: "20 yrs", mid: "PPA", sub: "Longer than one server cycle" },
      { icon: "➕", big: "90MW", mid: "New", sub: "Calvert Cliffs upgrade" },
      { icon: "🎯", big: "$375", mid: "Goldman", sub: "Conviction-list target" },
    ),
  });

  pair("googl-suncatcher", "L3", "GOOGL", {
    badge: "GOOGL", title: "구글이 TPU 4개를 팰컨 9에 실어 올렸습니다",
    heroIcon: "🚀", heroBig: "TPU 4", heroSub: "프로젝트 선캐처 첫 위성입니다. 킬로그램당 200달러가 가설입니다.",
    cards: c3(
      { icon: "🛰️", big: "선캐처", mid: "첫 위성", sub: "트랜스포터 18에 실렸습니다" },
      { icon: "💵", big: "200$/kg", mid: "가설", sub: "2030년대 중반 목표입니다" },
      { icon: "🔗", big: "2027", mid: "두 대", sub: "레이저 연결을 시험합니다" },
    ),
  }, {
    badge: "GOOGL", title: "Google sent four TPUs to orbit on Falcon 9",
    heroIcon: "🚀", heroBig: "4 TPUs", heroSub: "First Suncatcher satellite. $200/kg is the thesis.",
    cards: c3(
      { icon: "🛰️", big: "Suncatcher", mid: "First sat", sub: "Rode Transporter-18" },
      { icon: "💵", big: "$200/kg", mid: "Thesis", sub: "A mid-2030s target" },
      { icon: "🔗", big: "2027", mid: "Two sats", sub: "Laser-link test" },
    ),
  });

  pair("fed-pause-odds", "L5", "RATES", {
    badge: "FED", title: "10월 28일 연준 동결 확률은 76.2%입니다",
    heroIcon: "⏸️", heroBig: "76.2%", heroSub: "동결 칸입니다. 인상은 23.8%입니다.",
    before: { label: "나흘 전", big: "70%", sub: "인상 확률" },
    after: { label: "오늘", big: "23.8%", sub: "인상 확률" },
    cards: c3(
      { icon: "⏸️", big: "76.2%", mid: "동결", sub: "3.75~4.00%를 유지" },
      { icon: "📈", big: "23.8%", mid: "인상", sub: "4.00~4.25% 칸" },
      { icon: "📋", big: "내일", mid: "고용", sub: "비농업 보고서입니다" },
    ),
  }, {
    badge: "FED", title: "Odds of a hold on October 28 are 76.2%",
    heroIcon: "⏸️", heroBig: "76.2%", heroSub: "Hold bucket. A hike is 23.8%.",
    before: { label: "4 days ago", big: "70%", sub: "Hike odds" },
    after: { label: "Today", big: "23.8%", sub: "Hike odds" },
    cards: c3(
      { icon: "⏸️", big: "76.2%", mid: "Hold", sub: "Keep 3.75-4.00%" },
      { icon: "📈", big: "23.8%", mid: "Hike", sub: "4.00-4.25% bucket" },
      { icon: "📋", big: "Tomorrow", mid: "Jobs", sub: "Nonfarm payrolls" },
    ),
  });

  pair("tsla-fsd-turkey", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "보도", title: "터키 감독 완전자율주행 허가가 금요일에 나올 수 있습니다",
    heroIcon: "🇹🇷", heroBig: "금요일", heroSub: "승인 절차가 중요한 단계에 왔다는 보도입니다.",
    cards: c3(
      { icon: "📄", big: "보도", mid: "절차", sub: "공식 확인은 발표 뒤입니다" },
      { icon: "👤", big: "감독", mid: "사람이 탑승", sub: "무인 허가와 다른 칸입니다" },
      { icon: "📅", big: "금요", mid: "결정", sub: "구독 창이 열릴 수 있습니다" },
    ),
  }, {
    badge: "TSLA", badgeLine: "Report", title: "Turkey may clear supervised FSD on Friday",
    heroIcon: "🇹🇷", heroBig: "Friday", heroSub: "Reports say the process has reached a critical stage.",
    cards: c3(
      { icon: "📄", big: "Report", mid: "Process", sub: "Official text follows the notice" },
      { icon: "👤", big: "Supervised", mid: "A person sits", sub: "Not a driverless permit" },
      { icon: "📅", big: "Friday", mid: "Decision", sub: "The subscribe window may open" },
    ),
  });

  pair("musk-dow", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "보도", title: "머스크가 국방과 인공지능·로봇을 같이 그리겠다는 보도가 있습니다",
    heroIcon: "🛡️", heroBig: "보도", heroSub: "인공지능, 로봇, 첨단 무기가 그 문장에 있습니다.",
    cards: c3(
      { icon: "🤖", big: "로봇", mid: "옵티머스", sub: "민수 양산과 따로 봅니다" },
      { icon: "🚀", big: "발사", mid: "스페이스X", sub: "국방 수요와 맞닿는 자리" },
      { icon: "📄", big: "공문", mid: "다음", sub: "임명·계약이 나오면 올립니다" },
    ),
  }, {
    badge: "TSLA", badgeLine: "Report", title: "A report says Musk will reshape warfare with AI and robots",
    heroIcon: "🛡️", heroBig: "Report", heroSub: "The item names AI, robotics and advanced weapons.",
    cards: c3(
      { icon: "🤖", big: "Robots", mid: "Optimus", sub: "Keep civilian volume separate" },
      { icon: "🚀", big: "Launch", mid: "SpaceX", sub: "Where defense demand meets" },
      { icon: "📄", big: "Paper", mid: "Next", sub: "An appointment or contract" },
    ),
  });

  pair("spacex-triple-launch", "L6", "SPCX", {
    badge: "SPCX", breaking: "하루 세 발", title: "스페이스X가 하루에 로켓 세 발을 올리려 합니다",
    heroBig: "3발", heroSub: "크루 13, 트랜스포터 18, NROL-97입니다.",
    grid: [
      { icon: "👨‍🚀", big: "크루13", mid: "팰컨9", sub: "우주인 4명" },
      { icon: "🛰️", big: "T-18", mid: "팰컨9", sub: "선캐처 탑재" },
      { icon: "🛡️", big: "NROL-97", mid: "헤비", sub: "정찰 임무" },
      { icon: "🌍", big: "180국", mid: "역사", sub: "세 발 미달" },
    ],
    ctx1: "크루 13은 미국·캐나다·러시아 4명을 정거장으로 보냈습니다",
    ctx2: "세 칸이 닫혀야 하루 세 발의 기록이 완성됩니다",
  }, {
    badge: "SPCX", breaking: "Three in a day", title: "SpaceX is aiming for three launches in one day",
    heroBig: "3", heroSub: "Crew-13, Transporter-18, NROL-97.",
    grid: [
      { icon: "👨‍🚀", big: "Crew-13", mid: "Falcon 9", sub: "Four astronauts" },
      { icon: "🛰️", big: "T-18", mid: "Falcon 9", sub: "Suncatcher aboard" },
      { icon: "🛡️", big: "NROL-97", mid: "Heavy", sub: "Recon payload" },
      { icon: "🌍", big: "180", mid: "Nations", sub: "Never launched three" },
    ],
    ctx1: "Crew-13 sent four astronauts to the ISS",
    ctx2: "All three pads have to close for the record",
  });

  pair("optimus-ram", "L2", "TSLA", {
    badge: "TSLA", title: "인공지능 5번 칩 메모리는 72기가바이트입니다",
    heroIcon: "🧠", heroBig: "72GB", heroSub: "LP5입니다. 6번 칩은 144기가바이트입니다.",
    cards: [
      { label: "AI5", big: "72GB", mid: "절반", sub: "LP5로 줄였습니다" },
      { label: "AI6", big: "144GB", mid: "3분의 1", sub: "LP6입니다" },
      { label: "세계", big: "450억GB", mid: "연간 디램", sub: "로봇 200GB는 추정입니다" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "물량과 원가를 맞추려는 선택입니다.",
      "대역폭이 용량보다 큰 병목입니다.",
      "72기가바이트와 200기가바이트는 다른 줄입니다.",
    ],
  }, {
    badge: "TSLA", title: "AI5 chip memory is now 72 GB",
    heroIcon: "🧠", heroBig: "72GB", heroSub: "LP5. AI6 is 144 GB of LP6.",
    cards: [
      { label: "AI5", big: "72GB", mid: "Half", sub: "Cut to LP5" },
      { label: "AI6", big: "144GB", mid: "One-third", sub: "LP6" },
      { label: "World", big: "45B GB", mid: "DRAM / year", sub: "200 GB per robot is an estimate" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The cut is for Optimus volume and cost.",
      "Bandwidth is the tighter limit.",
      "72 GB and 200 GB are different rows.",
    ],
  });

  pair("tsla-semi-dispatcher", "L3", "TSLA", {
    badge: "TSLA", title: "테슬라가 스파크스에서 세미 배차원을 뽑습니다",
    heroIcon: "🚚", heroBig: "스파크스", heroSub: "공장에서 허브, 목적지까지 물류망을 짓는 자리입니다.",
    cards: c3(
      { icon: "📍", big: "스파크스", mid: "네바다", sub: "기가팩토리 옆입니다" },
      { icon: "🧾", big: "2819778", mid: "직무번호", sub: "정규직입니다" },
      { icon: "📦", big: "3PL", mid: "물류", sub: "출하 이슈를 풉니다" },
    ),
  }, {
    badge: "TSLA", title: "Tesla is hiring a Semi dispatcher in Sparks",
    heroIcon: "🚚", heroBig: "Sparks", heroSub: "The role builds the network from factory to destination.",
    cards: c3(
      { icon: "📍", big: "Sparks", mid: "Nevada", sub: "Beside the Gigafactory" },
      { icon: "🧾", big: "2819778", mid: "Req", sub: "Full-time" },
      { icon: "📦", big: "3PL", mid: "Logistics", sub: "Resolve shipment issues" },
    ),
  });

  pair("tsla-fsd-attach", "L5", "TSLA", {
    badge: "TSLA", title: "미국 2분기 새 테슬라의 55%가 판매 때 완전자율주행을 골랐습니다",
    heroIcon: "🛒", heroBig: "55%", heroSub: "판매 시점 첨부율입니다. 3분기는 60%에서 65%입니다.",
    before: { label: "2분기", big: "55%", sub: "판매 시점 첨부" },
    after: { label: "3분기", big: "60~65%", sub: "전망" },
    cards: c3(
      { icon: "🛒", big: "55%", mid: "2분기", sub: "이미 닫힌 숫자입니다" },
      { icon: "📈", big: "60~65%", mid: "3분기", sub: "집계 전 전망입니다" },
      { icon: "💳", big: "구독", mid: "나중 켠 대수", sub: "판매 첨부와 더하지 않습니다" },
    ),
  }, {
    badge: "TSLA", title: "55% of new U.S. Teslas chose FSD at sale in Q2",
    heroIcon: "🛒", heroBig: "55%", heroSub: "Attach at the point of sale. Q3 is 60-65%.",
    before: { label: "Q2", big: "55%", sub: "Attach at sale" },
    after: { label: "Q3", big: "60-65%", sub: "Outlook" },
    cards: c3(
      { icon: "🛒", big: "55%", mid: "Q2", sub: "A closed print" },
      { icon: "📈", big: "60-65%", mid: "Q3", sub: "Still an outlook" },
      { icon: "💳", big: "Later", mid: "Subscriptions", sub: "Do not add to attach" },
    ),
  });

  pair("tsla-myl-tl2", "L1", "TSLA", {
    badge: "TSLA", title: "중국 모델Y 롱 항속이 776킬로미터입니다",
    heroIcon: "🚗", heroBig: "776km", heroSub: "앞 모터를 TL2로 바꿔 25킬로미터가 늘었습니다.",
    cards: c3(
      { icon: "⚙️", big: "176kW", mid: "236마력", sub: "238뉴턴미터입니다" },
      { icon: "🔋", big: "+25km", mid: "효율", sub: "배터리 용량과 다른 줄입니다" },
      { icon: "💰", big: "33.9만¥", mid: "롱", sub: "대기 3~6주입니다" },
    ),
  }, {
    badge: "TSLA", title: "China Model Y L range is 776 km CLTC",
    heroIcon: "🚗", heroBig: "776km", heroSub: "A new TL2 front motor adds about 25 km.",
    cards: c3(
      { icon: "⚙️", big: "176kW", mid: "236 hp", sub: "238 N·m" },
      { icon: "🔋", big: "+25km", mid: "Efficiency", sub: "Not a bigger pack" },
      { icon: "💰", big: "¥339k", mid: "Long", sub: "3-6 week wait" },
    ),
  });

  pair("trump-ai-stake", "L4", "AI", {
    badge: "MACRO", badgeLine: "보도", title: "미국 정부가 오픈AI와 앤트로픽 지분을 가질 수 있다는 보도가 있습니다",
    heroIcon: "🏛️", heroBig: "지분", heroSub: "지분율과 금액은 공식 문장이 나온 뒤에 올립니다.",
    cards: c3(
      { icon: "🤖", big: "오픈AI", mid: "보도", sub: "주요 지분이라는 전언입니다" },
      { icon: "🧠", big: "앤트로픽", mid: "보도", sub: "같은 문장의 다른 이름입니다" },
      { icon: "📜", big: "법안", mid: "다음", sub: "번호가 나오면 칸이 열립니다" },
    ),
  }, {
    badge: "MACRO", badgeLine: "Report", title: "A report says Washington may take AI-lab stakes",
    heroIcon: "🏛️", heroBig: "Stake", heroSub: "Share counts wait for an official text.",
    cards: c3(
      { icon: "🤖", big: "OpenAI", mid: "Report", sub: "A major-stake line" },
      { icon: "🧠", big: "Anthropic", mid: "Report", sub: "Named in the same item" },
      { icon: "📜", big: "Bill", mid: "Next", sub: "A number opens the row" },
    ),
  });

  pair("jgb-10y-312", "L1", "JPY", {
    badge: "JGB", title: "일본 10년 금리가 3.1299%로 30년 최고입니다",
    heroIcon: "📈", heroBig: "3.1299%", heroSub: "오전 2시 26분 스냅샷입니다. 하루 0.0332%포인트 올랐습니다.",
    cards: c3(
      { icon: "📅", big: "30년", mid: "최고", sub: "1990년대 후반 이후입니다" },
      { icon: "💴", big: "엔화", mid: "동조", sub: "원·달러 1,358.4원과 같이 봅니다" },
      { icon: "🇺🇸", big: "-5bp", mid: "미국 10년", sub: "하루, 다른 나라 표입니다" },
    ),
  }, {
    badge: "JGB", title: "Japan's 10-year yield is 3.1299%, a 30-year high",
    heroIcon: "📈", heroBig: "3.1299%", heroSub: "2:26 a.m. JST. Up 0.0332 percentage points.",
    cards: c3(
      { icon: "📅", big: "30 yrs", mid: "High", sub: "Since the late 1990s" },
      { icon: "💴", big: "Yen", mid: "Link", sub: "Won closed at 1,358.4" },
      { icon: "🇺🇸", big: "-5bp", mid: "U.S. 10-year", sub: "A different country row" },
    ),
  });

  pair("tsla-q3-500k", "L3", "TSLA", {
    badge: "TSLA", title: "칼시는 3분기 인도 50만 대 확률을 20%로 봅니다",
    heroIcon: "🎲", heroBig: "20%", heroSub: "예측시장 가격입니다. 아주 강세라는 평가가 붙어 있습니다.",
    cards: c3(
      { icon: "🚗", big: "50만대", mid: "선", sub: "한 분기 인도 내기입니다" },
      { icon: "📊", big: "20%", mid: "칼시", sub: "회사 가이던스가 아닙니다" },
      { icon: "📄", big: "공시", mid: "다음", sub: "대수가 나오면 확정입니다" },
    ),
  }, {
    badge: "TSLA", title: "Kalshi prices a 20% chance of 500,000 Q3 deliveries",
    heroIcon: "🎲", heroBig: "20%", heroSub: "A prediction-market price, called extremely bullish.",
    cards: c3(
      { icon: "🚗", big: "500k", mid: "Line", sub: "A quarterly delivery bet" },
      { icon: "📊", big: "20%", mid: "Kalshi", sub: "Not company guidance" },
      { icon: "📄", big: "Print", mid: "Next", sub: "The filing settles it" },
    ),
  });

  pair("tsla-v2l-2027", "L3", "TSLA", {
    badge: "TSLA", title: "2027년형 모델3와 모델Y가 차량 전기를 밖으로 보냅니다",
    heroIcon: "🔌", heroBig: "V2L", heroSub: "중국·호주·뉴질랜드에서 먼저 열립니다.",
    cards: c3(
      { icon: "🏕️", big: "캠핑", mid: "공구", sub: "아웃렛 어댑터를 켭니다" },
      { icon: "🌏", big: "3국", mid: "먼저", sub: "다른 나라는 뒤에 엽니다" },
      { icon: "🚫", big: "개조불가", mid: "기존 차", sub: "2027년형에만 붙습니다" },
    ),
  }, {
    badge: "TSLA", title: "2027 Model 3 and Model Y gain vehicle-to-load",
    heroIcon: "🔌", heroBig: "V2L", heroSub: "China, Australia and New Zealand first.",
    cards: c3(
      { icon: "🏕️", big: "Camping", mid: "Tools", sub: "Tesla outlet adapter" },
      { icon: "🌏", big: "3 markets", mid: "First", sub: "Other countries later" },
      { icon: "🚫", big: "No retrofit", mid: "Existing", sub: "2027 model year only" },
    ),
  });

  pair("musk-gdp-50", "L4", "MACRO", {
    badge: "MACRO", badgeLine: "비전", title: "머스크는 내년 성장이 전년보다 50% 이상 높아진다고 했습니다",
    heroIcon: "📊", heroBig: "+50%", heroSub: "성장률의 가속도입니다. 경제 규모가 절반 커지는 그림과 칸이 다릅니다.",
    cards: c3(
      { icon: "🤖", big: "로봇", mid: "배경", sub: "옵티머스가 따라붙습니다" },
      { icon: "🛰️", big: "궤도", mid: "연산", sub: "공식 속보치와 다른 칸입니다" },
      { icon: "📋", big: "속보치", mid: "다음", sub: "공식 숫자가 나오면 올립니다" },
    ),
  }, {
    badge: "MACRO", badgeLine: "Vision", title: "Musk says next year's GDP growth will be over 50% higher",
    heroIcon: "📊", heroBig: "+50%", heroSub: "An acceleration in the growth rate, not the economy's size.",
    cards: c3(
      { icon: "🤖", big: "Robots", mid: "Backdrop", sub: "Optimus sits nearby" },
      { icon: "🛰️", big: "Orbit", mid: "Compute", sub: "A different row from GDP" },
      { icon: "📋", big: "Print", mid: "Next", sub: "The official flash" },
    ),
  });

  pair("moodys-110b-45gw", "L2", "MACRO", {
    badge: "MACRO", title: "무디스는 데이터센터에 1,100억 달러, 45기가와트가 필요하다고 합니다",
    heroIcon: "🏭", heroBig: "45GW", heroSub: "2030년까지 나라 전체 전력 투자 그림입니다.",
    cards: [
      { label: "투자", big: "1,100억$", mid: "2030", sub: "송전·발전입니다" },
      { label: "용량", big: "45GW", mid: "추가", sub: "아마존 690MW는 한 줄입니다" },
      { label: "궤도", big: "선캐처", mid: "시험", sub: "지상 45GW와 일정이 다릅니다" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "1,100억 달러는 무디스의 나라 전체 숫자입니다.",
      "골드만은 유틸리티 설비투자 전망을 밀어 올립니다.",
      "690메가와트와 45기가와트를 더하지 않습니다.",
    ],
  }, {
    badge: "MACRO", title: "Moody's says data centers need $110B and 45 GW by 2030",
    heroIcon: "🏭", heroBig: "45GW", heroSub: "A national power-capex picture through 2030.",
    cards: [
      { label: "Capex", big: "$110B", mid: "2030", sub: "Generation and wires" },
      { label: "Power", big: "45GW", mid: "Add", sub: "Amazon's 690 MW is one line" },
      { label: "Orbit", big: "Suncatcher", mid: "Test", sub: "A different calendar" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "$110 billion is Moody's national figure.",
      "Goldman sees utility capex rising.",
      "Do not add 690 MW to 45 GW.",
    ],
  });

  pair("spcx-lockup-81", "L6", "SPCX", {
    badge: "SPCX", breaking: "잠금", title: "스페이스X 주식의 81%는 아직 잠겨 있습니다",
    heroBig: "81%", heroSub: "지금 팔 수 있는 물량은 19%입니다.",
    grid: [
      { icon: "🟢", big: "19%", mid: "지금", sub: "유통 물량" },
      { icon: "📅", big: "+5%", mid: "10/9·24", sub: "6.57억 주" },
      { icon: "📈", big: "+15%", mid: "11~12/8", sub: "실적 뒤 해제" },
      { icon: "🔒", big: "61%", mid: "2027.06", sub: "머스크 64억 주" },
    ],
    ctx1: "10월 9일에 3억 2,800만 주가 거래 가능해집니다",
    ctx2: "풀린 뒤에도 75% 이상은 공개 시장 밖에 있습니다",
  }, {
    badge: "SPCX", breaking: "Lockup", title: "81% of SpaceX stock is still locked",
    heroBig: "81%", heroSub: "19% can be sold now.",
    grid: [
      { icon: "🟢", big: "19%", mid: "Now", sub: "Float so far" },
      { icon: "📅", big: "+5%", mid: "Oct 9/24", sub: "657 million shares" },
      { icon: "📈", big: "+15%", mid: "Nov-Dec 8", sub: "After earnings" },
      { icon: "🔒", big: "61%", mid: "Jun 2027", sub: "Musk 6.4B shares" },
    ],
    ctx1: "328 million shares become tradable on October 9",
    ctx2: "More than 75% stays off the open market",
  });
};
