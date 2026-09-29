// 2026-09-30 SVG topics. Layout mix stays under 40%.
module.exports = function (add) {
  const F = "2026.09.30";
  const note = (ko, en) => ({ noteHead: ko ? "왜 중요한가" : "Why it matters" });

  add("summary", "ROWS", "MACRO", {
    headline: "2026.09.30 한장 요약",
    rows: [
      { color: "#4ade80", fill: "#061209", right: "8개국", title: "크로아티아가 테슬라 감독 완전자율주행을 승인하며 유럽은 여덟 나라가 됐습니다", sub: "인구를 더하면 유럽연합 65% 가운데 12.66%입니다. 세계 합산은 열여섯 나라라는 글이 따로 있습니다." },
      { color: "#c084fc", fill: "#140b1f", right: "845억$", title: "앤트로픽이 2029년까지 스페이스X 연산에 최대 845억 달러를 쓰겠다고 밝혔습니다", sub: "엔비디아 기반 용량입니다. 그림의 2031년 막대는 66.6기가와트입니다." },
      { color: "#22c55e", fill: "#0a1a0a", right: "200GW", title: "테슬라와 스페이스X가 태양광 모듈을 한 해 200기가와트 만드는 쪽을 보고 있습니다", sub: "오늘 미국 모듈 능력의 약 세 배라는 비교가 붙었습니다." },
      { color: "#4ade80", fill: "#0a1a0a", right: "150억mi", title: "감독 완전자율주행 누적 거리가 안전보고서 기준 150억 마일을 넘었습니다", sub: "도시 구간은 58억 마일대입니다. 140억 이후 29일 만에 10억 마일이 더해졌습니다." },
      { color: "#86efac", fill: "#061209", right: "$8.33", title: "오스틴 월요일 저녁 사이버캡 8.33달러가 우버엑스 10.90달러보다 쌌습니다", sub: "시간은 우버가 9분, 사이버캡이 11분입니다. 지난주 같은 시간대는 16.89달러였습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "82억$", title: "AMD가 페이페이 리의 월드랩스를 약 82억 달러 전액 주식으로 인수합니다", sub: "발표는 9월 28일이고, 규제 승인을 거쳐 올해 안 마무리를 기대합니다." },
      { color: "#facc15", fill: "#1a1600", right: "300억$", title: "테슬라 신용 한도는 3년 200억 달러와 리볼버 100억 달러로 적혔습니다", sub: "피치는 최대 300억 달러 설비를 기회 되면 확보하는 계획이라고 설명했습니다." },
      { color: "#c084fc", fill: "#1a0f2a", right: "ARR", title: "올해 12월 스페이스X 연환산 매출이 1,000억 달러를 넘을 것이라는 말이 있습니다", sub: "물음표가 아니고, 더 보태지 않아도 그 속도라는 문장입니다." },
    ],
    caption: "더 볼 것: 유럽 8개국 · 845억 달러 · 태양광 200GW · 150억 마일 · 오스틴 8.33달러 · 월드랩스 · 신용 300억 · 12월 연환산",
  }, {
    headline: "2026.09.30 Daily Snapshot",
    rows: [
      { color: "#4ade80", fill: "#061209", right: "8", title: "Croatia approved Tesla supervised self-driving, making eight European countries", sub: "Population share is 12.66% of 65%. A separate post counts 16 countries worldwide." },
      { color: "#c084fc", fill: "#140b1f", right: "$84.5B", title: "Anthropic disclosed up to $84.5 billion of SpaceX compute through 2029", sub: "NVIDIA-based capacity. The 2031 bar on the chart reads 66.6 gigawatts." },
      { color: "#22c55e", fill: "#0a1a0a", right: "200GW", title: "Tesla and SpaceX are described as targeting 200 GW of solar modules a year", sub: "About three times current U.S. module capacity." },
      { color: "#4ade80", fill: "#0a1a0a", right: "15B mi", title: "Supervised self-driving miles passed 15 billion on the safety report", sub: "City miles are in the 5.8 billion range. One billion miles arrived in 29 days." },
      { color: "#86efac", fill: "#061209", right: "$8.33", title: "An Austin Monday evening Cybercab fare of $8.33 undercut UberX at $10.90", sub: "Uber was still faster, 9 minutes versus 11. The prior Monday was $16.89." },
      { color: "#60a5fa", fill: "#06121f", right: "$8.2B", title: "AMD agreed to buy Fei-Fei Li's World Labs for about $8.2 billion in stock", sub: "Announced Sept. 28. Closing is expected this year, subject to approvals." },
      { color: "#facc15", fill: "#1a1600", right: "$30B", title: "Tesla credit is listed as a $20 billion three-year loan plus $10 billion revolvers", sub: "Fitch described plans to secure up to $30 billion of facilities." },
      { color: "#c084fc", fill: "#1a0f2a", right: "ARR", title: "SpaceX annualized revenue was said to top $100 billion this December", sub: "Framed as not a question mark, even if nothing more is added." },
    ],
    caption: "Watch: 8 countries · $84.5B · 200 GW · 15B miles · Austin $8.33 · World Labs · $30B · December ARR",
  });

  function pair(file, layout, pal, ko, en) {
    ko.footer = F;
    en.footer = F;
    ko.noteHead = ko.noteHead || "왜 중요한가";
    en.noteHead = en.noteHead || "Why it matters";
    add(file, layout, pal, ko, en);
  }

  pair("tsla-croatia-fsd", "L6", "TSLA", {
    badge: "TSLA", breaking: "유럽 8번째", title: "크로아티아가 감독 완전자율주행을 승인했습니다",
    heroBig: "8개국", heroSub: "9월 29일 합류. 유럽 전역 승인은 아직 대기입니다.",
    grid: [
      { icon: "🇳🇱", big: "4/10", mid: "네덜란드", sub: "인구 4.02%" },
      { icon: "🇧🇪", big: "6/10", mid: "벨기에", sub: "인구 2.63%" },
      { icon: "🇨🇿", big: "9/21", mid: "체코", sub: "인구 2.42%" },
      { icon: "🇭🇷", big: "9/29", mid: "크로아티아", sub: "인구 0.86%" },
    ],
    ctx1: "찬성 쪽 인구 비중은 65% 가운데 12.66%입니다.",
    ctx2: "전 세계 합산은 열여섯 나라라는 글이 따로 있습니다.",
    quote: "잠정 형식승인을 각 나라가 다시 인정하는 방식입니다. 슬로베니아, 체코, 크로아티아가 9월에 연달아 들어왔습니다. 네덜란드는 4월 10일, 벨기에는 6월 10일, 체코는 9월 21일, 크로아티아는 9월 29일입니다. 인구를 더하면 유럽연합 65% 가운데 12.66%이고, 유럽 전역 승인은 아직 대기입니다.",
    noteSub: "배포 버튼은 나라마다 따로 눌립니다. 지도가 넓어져도 무인 영업 허가와는 문서가 다릅니다. 다음에 볼 것은 크로아티아에서 실제로 켜지는 날입니다.",
  }, {
    badge: "TSLA", breaking: "8th in Europe", title: "Croatia approved supervised self-driving",
    heroBig: "8 countries", heroSub: "Joined Sept. 29. EU-wide approval is still pending.",
    grid: [
      { icon: "🇳🇱", big: "Apr 10", mid: "Netherlands", sub: "4.02% pop." },
      { icon: "🇧🇪", big: "Jun 10", mid: "Belgium", sub: "2.63% pop." },
      { icon: "🇨🇿", big: "Sep 21", mid: "Czechia", sub: "2.42% pop." },
      { icon: "🇭🇷", big: "Sep 29", mid: "Croatia", sub: "0.86% pop." },
    ],
    ctx1: "Yes-voter population share is 12.66% of 65%.",
    ctx2: "A separate post counts 16 countries worldwide.",
    quote: "Countries recognize a provisional EU type approval. Slovenia, Czechia, and Croatia joined in September.",
    noteSub: "Each country still switches rollout on its own. A wider map is not an unsupervised taxi permit. Watch the day it actually turns on in Croatia.",
  });

  pair("spcx-anthropic-845", "L1", "SPCX", {
    badge: "SPCX", title: "앤트로픽이 스페이스X 연산에 최대 845억 달러를 쓰겠다고 밝혔습니다",
    heroIcon: "💸", heroBig: "845억 달러", heroSub: "2029년까지의 상한입니다. 엔비디아 기반 용량입니다.",
    cards: [
      { icon: "📅", big: "2029", mid: "약정 기한", sub: "한 번에 선수금이 나간 발표는 아닙니다." },
      { icon: "✖️", big: "약 2배", mid: "이전 상한 대비", sub: "이전에 알려진 상한은 약 450억 달러입니다." },
      { icon: "📊", big: "66.6GW", mid: "2031년 그림", sub: "초록은 지상, 보라는 궤도 연산입니다." },
    ],
    quote: "큰 연산이 모델 경쟁의 아래층을 가른다는 문장입니다. 2024년 0.3기가와트에서 2031년 66.6까지 막대가 커집니다. 약정은 2029년까지 최대 845억 달러이고, 이전에 알려진 상한 약 450억 달러의 거의 두 배입니다. 초록은 지상, 보라는 궤도입니다.",
    noteSub: "순손실 420억 달러와 올해 인프라 의무 518억 달러는 다른 글의 재무 숫자입니다. 약정 상한과 올해 지출을 한 칸에 더하지 않습니다. 궤도 비중은 2029년 이후 두꺼워진다는 설명입니다.",
  }, {
    badge: "SPCX", title: "Anthropic disclosed up to $84.5 billion of SpaceX compute",
    heroIcon: "💸", heroBig: "$84.5B", heroSub: "A cap through 2029. NVIDIA-based capacity.",
    cards: [
      { icon: "📅", big: "2029", mid: "Through this year", sub: "Not described as one upfront cash payment." },
      { icon: "✖️", big: "~2×", mid: "Versus prior cap", sub: "Earlier disclosed cap was about $45 billion." },
      { icon: "📊", big: "66.6GW", mid: "2031 chart", sub: "Green is terrestrial, purple is orbital." },
    ],
    quote: "The bars run from 0.3 GW in 2024 to 66.6 GW in 2031. Scale of compute is the layer under the models.",
    noteSub: "A separate post lists a $42 billion net loss and $51 billion of infrastructure obligations. Do not add that spend to the $84.5 billion cap. Orbital share is described as thickening after 2029.",
  });

  pair("tsla-solar-200gw", "L5", "TSLA", {
    badge: "TSLA", title: "태양광 모듈 연 200기가와트가 미국 능력의 약 세 배로 적혔습니다",
    heroIcon: "☀️", heroBig: "연 200기가와트", heroSub: "테슬라와 스페이스X가 같이 보는 목표라는 말입니다.",
    before: { label: "오늘 미국", big: "1배", sub: "현재 모듈 능력" },
    after: { label: "목표", big: "200GW", sub: "약 세 배" },
    cards: [
      { icon: "🌍", big: "땅", mid: "데이터센터", sub: "인공지능 전력의 한 조각" },
      { icon: "🛰️", big: "궤도", mid: "같은 전력", sub: "장비와 방열을 묶는 해석" },
      { icon: "🏭", big: "새 공장", mid: "전제", sub: "오늘 명판의 합보다 큽니다" },
    ],
    quote: "그 길의 일부만 와도 전력 더미의 큰 조각을 수직으로 묶을 수 있다는 풀이입니다. 연 200기가와트는 오늘 미국 모듈 능력의 약 세 배입니다. 땅의 데이터센터와 궤도 장비를 같은 전력으로 적었습니다.",
    noteSub: "200기가와트는 올해 공장 실적이 아닙니다. 건설 차트는 이미 나간 공사비이고, 이 문장은 앞으로 만들 전기입니다. 부지가 잡혀야 명판이 됩니다.",
  }, {
    badge: "TSLA", title: "200 GW of solar modules was compared with about 3× U.S. capacity",
    heroIcon: "☀️", heroBig: "200 GW a year", heroSub: "Described as a Tesla and SpaceX target.",
    before: { label: "U.S. today", big: "1×", sub: "Current module capacity" },
    after: { label: "Target", big: "200GW", sub: "About 3×" },
    cards: [
      { icon: "🌍", big: "Earth", mid: "Data centers", sub: "A slice of AI power" },
      { icon: "🛰️", big: "Orbit", mid: "Same power", sub: "Framed with equipment and heat" },
      { icon: "🏭", big: "New plants", mid: "Required", sub: "Larger than today's nameplates" },
    ],
    quote: "Even part of the way would vertically bundle a large piece of the power stack.",
    noteSub: "200 GW is not this year's factory output. The construction chart is money already spent. This sentence is electricity still to be built.",
  });

  pair("tsla-sec-ma", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "회신 표지 · 9월 29일", title: "인수합병 사무소로 보낸 테슬라 회신 머리가 돌았습니다",
    heroIcon: "📄", heroBig: "9월 29일", heroSub: "인수합병 사무소 회신 머리입니다. 합병 발표문은 아닙니다.",
    cards: [
      { icon: "🏛", big: "SEC", mid: "기업금융국", sub: "인수합병 사무소 회신" },
      { icon: "✉️", big: "이메일", mid: "전달", sub: "브랜든 에르하트" },
      { icon: "❓", big: "질문", mid: "소셜", sub: "합병 임박은 물음표입니다" },
    ],
    quote: "적힌 머리는 테슬라 주식회사, 기업금융국, 2026년 9월 29일, 이메일, 브랜든 에르하트입니다. 소셜은 스페이스X 합병이 임박했냐고 묻지만, 그 질문은 이 머리글과 다른 문장입니다. 인수합병 사무소는 공개매수와 위임장 규칙을 보는 창구입니다.",
    noteSub: "그 사무소는 공개매수와 위임장 규칙을 보는 창구입니다. 편지 머리가 있다고 서명이 끝난 것은 아닙니다. 일정표가 나와야 질문이 문서가 됩니다.",
  }, {
    badge: "TSLA", badgeLine: "Cover letter · Sept. 29", title: "A Tesla reply header to the mergers office is circulating",
    heroIcon: "📄", heroBig: "Sept. 29", heroSub: "No body paragraphs in the capture. Not a merger release.",
    cards: [
      { icon: "🏛", big: "SEC", mid: "Corp Fin", sub: "Mergers office response" },
      { icon: "✉️", big: "Email", mid: "Delivery", sub: "Brandon Ehrhart" },
      { icon: "❓", big: "Question", mid: "Social", sub: "Imminent merger is a question" },
    ],
    quote: "The red underline is the words Office of Mergers and Acquisitions. No counterparty or vote date is on this page.",
    noteSub: "That office reviews tender and proxy rules. A header is not a signed deal. A timetable would turn the question into a filing.",
  });

  pair("tsla-fsd-15b", "L2", "TSLA", {
    badge: "TSLA", title: "감독 주행 누적 거리가 150억 마일을 넘었습니다",
    heroIcon: "🚗", heroBig: "150억 마일", heroSub: "안전보고서 8월 27일 기준. 도시 구간이 따로 있습니다.",
    cards: [
      { label: "누적", big: "15,007,023,418", mid: "전체 마일", sub: "감독 모드 장부" },
      { label: "도시", big: "58.4억", mid: "5,843,156,839", sub: "도시 마일" },
      { label: "속도", big: "29일", mid: "10억 마일", sub: "140억 이후" },
    ],
    detailHead: "같은 아침의 다른 카드",
    detailLines: [
      "다른 카드는 15,000,508,571마일을 보여 줍니다.",
      "구독 안내 작은 글은 월 99달러입니다.",
      "사람이 앉은 감독 거리와 무인 영업 거리는 다릅니다.",
    ],
    noteSub: "피치는 2분기 활성 구독 148만, 1년 전보다 56%라고 적었습니다. 거리 장부와 돈 내는 계정은 다른 표입니다. 다음 실적 주석이 둘을 맞춰 줍니다.",
  }, {
    badge: "TSLA", title: "Supervised miles passed 15 billion",
    heroIcon: "🚗", heroBig: "15 billion mi", heroSub: "Safety report as of Aug. 27. City miles are separate.",
    cards: [
      { label: "Total", big: "15,007,023,418", mid: "All miles", sub: "Supervised log" },
      { label: "City", big: "5.84B", mid: "5,843,156,839", sub: "City miles" },
      { label: "Pace", big: "29 days", mid: "1 billion mi", sub: "After 14 billion" },
    ],
    detailHead: "OTHER CARD THE SAME MORNING",
    detailLines: [
      "Another card shows 15,000,508,571 miles.",
      "Small type on the subscribe card says $99 a month.",
      "Supervised miles are not driverless commercial miles.",
    ],
    noteSub: "Fitch cited 1.48 million active subscriptions in Q2, up 56% year over year. Distance and paying accounts are different tables.",
  });

  pair("grok-48", "L3", "SPCX", {
    badge: "SPCX", title: "그록 4.8은 파라미터 2.5조로 그록 4.6보다 크다고 합니다",
    heroIcon: "🧠", heroBig: "2.5조", heroSub: "새 C++ 스택에서 학습하는 첫 그록이라는 문장입니다.",
    cards: [
      { icon: "4️⃣", big: "4.8", mid: "이번 모델", sub: "4.6보다 크다고 적혀 있습니다" },
      { icon: "🧩", big: "C++", mid: "새 스택", sub: "이 스택에서 학습하는 첫 그록입니다" },
      { icon: "🔢", big: "2.5조", mid: "파라미터", sub: "학습 때 조정하는 숫자의 개수입니다" },
    ],
    quote: "파라미터는 학습 때 조정하는 숫자의 개수입니다. 개수가 크다고 모든 시험에서 이긴다는 뜻은 아닙니다. 그록 4.8은 2.5조로 그록 4.6보다 크고, 새 C++ 스택에서 학습하는 첫 그록이라고 적혀 있습니다. 845억 달러 계약과 이 파라미터 수는 더하지 않습니다.",
    noteSub: "845억 달러 계약은 고객 용량이고, 이 글은 그 위에서 돌릴 모델 크기입니다. 둘을 한 표에 더하지 않습니다. 파라미터는 학습 때 조정하는 숫자의 개수입니다.",
  }, {
    badge: "SPCX", title: "Grok 4.8 is listed at 2.5 trillion parameters",
    heroIcon: "🧠", heroBig: "2.5T", heroSub: "Called the first Grok trained on a new C++ stack.",
    cards: [
      { icon: "4️⃣", big: "4.8", mid: "This model", sub: "Larger than 4.6" },
      { icon: "🧩", big: "C++", mid: "New stack", sub: "Training software changed" },
      { icon: "🚫", big: "No table", mid: "Benchmark", sub: "Scores are not in the capture" },
    ],
    quote: "Parameter count is how many numbers the model adjusts. Bigger is not an automatic win on every test.",
    noteSub: "The $84.5 billion agreement is customer capacity. This post is model size. Do not add them. No release date is on the post.",
  });

  pair("trump-superintelligence", "L4", "MACRO", {
    badge: "MACRO", badgeLine: "오찬 목록", title: "인공지능을 초지능으로 부르겠다는 속보가 돌았습니다",
    heroIcon: "🇺🇸", heroBig: "초지능", heroSub: "이름을 바꾸고 자체 감시와 위원회를 말합니다.",
    cards: [
      { icon: "1️⃣", big: "이름", mid: "SI", sub: "인공지능을 초지능으로" },
      { icon: "2️⃣", big: "자체 감시", mid: "좋은 사용", sub: "목록의 두 번째 줄" },
      { icon: "3️⃣", big: "위원회", mid: "사용 감독", sub: "목록의 세 번째 줄" },
    ],
    quote: "아메리카 닷 거브 출범 영상은 기술로 정부를 바꾸자는 구상에 공개 감사를 표했다고 적습니다. 오찬 목록은 이름을 초지능으로 바꾸고, 자체 감시와 감독 위원회를 말합니다. 기술 지도자를 칭찬하고 산업이 산업혁명보다 커질 수 있다고 했습니다.",
    noteSub: "소셜 목록과 관보는 다른 종이입니다. 데이터센터 건설 차트와 별칭도 다른 표입니다. 원문 링크가 나오면 그때 효력을 읽습니다.",
  }, {
    badge: "MACRO", badgeLine: "Lunch list · 19s clip", title: "Posts describe renaming AI to superintelligence",
    heroIcon: "🇺🇸", heroBig: "SI", heroSub: "The order text is not on these screens.",
    cards: [
      { icon: "1️⃣", big: "Name", mid: "SI", sub: "AI to superintelligence" },
      { icon: "2️⃣", big: "Self-check", mid: "Used for good", sub: "Second line of the list" },
      { icon: "3️⃣", big: "Committee", mid: "Oversight", sub: "Third line of the list" },
    ],
    quote: "An America.gov launch clip credits a vision of changing government through technology.",
    noteSub: "A social list is not the Federal Register. The construction chart is a different table. Read the order when a link appears.",
  });

  pair("burry-datacenter", "L5", "MACRO", {
    badge: "MACRO", title: "데이터센터 건설은 510억 달러 늘고 나머지는 1,200억 달러 줄었습니다",
    heroIcon: "📉", heroBig: "+510억 / -1,200억", heroSub: "2023년 이후 연간 건설 지출 변화입니다.",
    before: { label: "그 밖 전부", big: "-1200억", sub: "민간 건설" },
    after: { label: "데이터센터", big: "+510억", sub: "같은 기간" },
    cards: [
      { icon: "📅", big: "-7.9%", mid: "6월", sub: "데이터센터를 뺀 민간 건설" },
      { icon: "🏗", big: "지출", mid: "나간 돈", sub: "착공 허가와는 다른 통계" },
      { icon: "💬", big: "의견", mid: "오래 안 감", sub: "차트와 문장을 분리" },
    ],
    quote: "국내총생산 성장이 데이터센터 건설에 기대고, 자금은 부채와 부외 금융이라는 네 줄이 차트 위에 있습니다. 2023년 이후 데이터센터는 510억 달러 늘고 그 밖 민간 건설은 1,200억 달러 줄었습니다. 6월에는 데이터센터를 뺀 민간 건설이 1년 전보다 7.9% 줄었다고 적혀 있습니다.",
    noteSub: "파란 선은 주택·공장·상점을 한데 묶습니다. 애플을 뺀 현금흐름 문장은 회사별 결산과 대조해야 합니다. 차트 자체가 현금흐름표는 아닙니다.",
  }, {
    badge: "MACRO", title: "Data-center construction up $51B, everything else down $120B",
    heroIcon: "📉", heroBig: "+51 / -120", heroSub: "Change in yearly construction spending since 2023.",
    before: { label: "Everything else", big: "-$120B", sub: "Private construction" },
    after: { label: "Data centers", big: "+$51B", sub: "Same window" },
    cards: [
      { icon: "📅", big: "-7.9%", mid: "June", sub: "Private work ex-data centers" },
      { icon: "🏗", big: "Spend", mid: "Money out", sub: "Not a permit statistic" },
      { icon: "💬", big: "Opinion", mid: "Won't last", sub: "Separate from the chart" },
    ],
    quote: "Four lines above the chart say GDP growth is leaning on data-center buildout funded by debt and off-balance-sheet paper.",
    noteSub: "The blue line bundles housing, factories, and shops. The free-cash-flow line needs company filings. The chart is not a cash-flow statement.",
  });

  pair("tsla-manchester", "L3", "TSLA", {
    badge: "TSLA", title: "맨체스터 행사에 사이버캡을 가져온다고 알렸습니다",
    heroIcon: "🇬🇧", heroBig: "맨체스터", heroSub: "라이프 앳 테슬라. 판매일과 가격은 없습니다.",
    cards: [
      { icon: "🚪", big: "문 개방", mid: "금색 차", sub: "전시장 조명 아래 사진" },
      { icon: "🎟", big: "초대", mid: "채용 형식", sub: "영업 개시 문서가 아님" },
      { icon: "🇪🇺", big: "영국", mid: "8개국 밖", sub: "오늘 유럽 목록에 없음" },
    ],
    quote: "미래를 보러 오라는 문장입니다. 테슬라에서의 다음 삶이 맨체스터로 오고, 사이버캡도 같이 가져옵니다. 채용 행사와 그 나라 도로 허가는 다른 날입니다.",
    noteSub: "전시 차량이 도시에 온 것과 그 나라 도로에서 소프트웨어를 켜는 허가는 다릅니다. 고용 공고가 따라오는지를 다음에 봅니다. 생산 라인이 생긴 발표는 아닙니다.",
  }, {
    badge: "TSLA", title: "A Cybercab is coming to a Manchester event",
    heroIcon: "🇬🇧", heroBig: "Manchester", heroSub: "Life at Tesla. No price or on-sale date.",
    cards: [
      { icon: "🚪", big: "Doors up", mid: "Gold car", sub: "Show-floor photo" },
      { icon: "🎟", big: "Invite", mid: "Recruiting", sub: "Not a sales launch" },
      { icon: "🇪🇺", big: "UK", mid: "Not in the 8", sub: "Absent from today's Europe list" },
    ],
    quote: "The line says come see the future. Ticket price and seats are not in the capture.",
    noteSub: "A show car in a city is not a road approval. Watch whether hiring posts follow. This is not a factory announcement.",
  });

  pair("starship-f15-stand", "L2", "SPCX", {
    badge: "SPCX", title: "15번째 비행용 작업대가 궤도 발사대에 들어갔습니다",
    heroIcon: "🚀", heroBig: "하루 미만", heroSub: "14번째 비행 다음 날도 안 돼 준비 중이라는 글입니다.",
    cards: [
      { label: "영상", big: "41초", mid: "발사대 철골", sub: "크레인이 보입니다" },
      { label: "도구", big: "작업대", mid: "비계 대신", sub: "마운트 곳곳에 닿게" },
      { label: "없는 것", big: "시각 없음", mid: "이륙 창", sub: "함선 번호도 없음" },
    ],
    detailHead: "이 글이 말하는 것",
    detailLines: [
      "발판이 빨리 들어가면 다음 창까지 정비 시간이 줄어듭니다. 14번째 비행이 끝난 지 하루가 안 돼 15번째 비행용 작업대를 궤도 발사대에 넣었다고 합니다. 비계 없이 마운트 곳곳에 닿게 한다는 문장입니다.",
      "오늘의 글은 착수 복기가 아니라 다음 발을 위한 철골입니다.",
      "비계를 안 쓴다는 말은 고정 스탠드로 같은 점검을 하겠다는 뜻입니다.",
    ],
    noteSub: "궤도 발사대는 부스터가 돌아오도록 만든 탑입니다. 작업대는 그 탑의 발판입니다. 발사 면허와 철골 입고는 다른 종이입니다.",
  }, {
    badge: "SPCX", title: "A Flight 15 work stand went into the orbital mount",
    heroIcon: "🚀", heroBig: "< 1 day", heroSub: "Prep described as starting less than a day after Flight 14.",
    cards: [
      { label: "Video", big: "0:41", mid: "Pad steel", sub: "A crane is visible" },
      { label: "Tool", big: "Stand", mid: "Not scaffolding", sub: "Access around the mount" },
      { label: "Missing", big: "No time", mid: "Liftoff", sub: "No ship number either" },
    ],
    detailHead: "WHAT THE POST IS",
    detailLines: [
      "A stand in place shortens the work before the next window.",
      "This post is steel for the next flight, not a splashdown recap.",
      "Skipping scaffolding means using a fixed stand for the same checks.",
    ],
    noteSub: "The orbital mount is the tower built for a returning booster. The stand is a platform on that tower. A license and a steel delivery are different papers.",
  });

  pair("tsla-austin-fare", "L1", "TSLA", {
    badge: "TSLA", title: "오스틴 저녁 사이버캡이 8.33달러로 우버엑스보다 쌌습니다",
    heroIcon: "🚕", heroBig: "$8.33", heroSub: "월요일 러시아워. 도착 안내는 11분입니다.",
    cards: [
      { icon: "🚕", big: "$8.33", mid: "사이버캡 11분", sub: "2인. 카드 끝자리 8010" },
      { icon: "🚙", big: "$9.51", mid: "모델Y 17분", sub: "4인 좌석" },
      { icon: "⬛", big: "$10.90", mid: "우버엑스 9분", sub: "컴포트는 12.93달러·8분" },
    ],
    quote: "지난주 같은 시간대는 사이버캡 16.89달러, 우버엑스 9.94달러였습니다. 목적지는 카바, 3201 비 케이브스 로드입니다.",
    noteSub: "한 장의 견적은 그 시각의 호가입니다. 학교 구역이 꺼진 월요일이라는 메모가 있습니다. 다음 월요일 같은 주소가 습관인지 알려 줍니다.",
  }, {
    badge: "TSLA", title: "An Austin evening Cybercab was $8.33, under UberX",
    heroIcon: "🚕", heroBig: "$8.33", heroSub: "Monday rush. Arrival note says 11 minutes.",
    cards: [
      { icon: "🚕", big: "$8.33", mid: "Cybercab 11 min", sub: "2 seats. Card 8010" },
      { icon: "🚙", big: "$9.51", mid: "Model Y 17 min", sub: "4 seats" },
      { icon: "⬛", big: "$10.90", mid: "UberX 9 min", sub: "Comfort $12.93 · 8 min" },
    ],
    quote: "The prior Monday was Cybercab $16.89 and UberX $9.94. Drop-off is CAVA, 3201 Bee Caves Rd.",
    noteSub: "One quote is that minute's price. A note says the school zone was off. The same address next Monday shows whether it sticks.",
  });

  pair("starship-heatshield", "L4", "SPCX", {
    badge: "SPCX", badgeLine: "시리즈 최신 편 · 1분 35초", title: "돌아온 스타십의 방열 개선을 오늘 비행에 넣겠다고 했습니다",
    heroIcon: "🛠️", heroBig: "방열판", heroSub: "엔지니어가 귀환 기체를 처음으로 손으로 살폈습니다.",
    cards: [
      { icon: "👀", big: "첫 실물", mid: "손으로 확인", sub: "우주에서 돌아온 뒤" },
      { icon: "🔥", big: "타일", mid: "마찰열", sub: "다시 들어올 때의 방패" },
      { icon: "🔁", big: "다음 기체", mid: "개선 반영", sub: "타일 매수는 없음" },
    ],
    quote: "배운 점이 방열판 개선으로 이어져 오늘 비행에서 보게 된다고 합니다. 엔지니어가 우주에서 돌아온 스타십을 처음으로 손으로 살펴봤습니다. 방열판은 다시 들어올 때 마찰열을 막는 타일이고, 사람이 타는 비행에서는 여러 번 버텨야 합니다.",
    noteSub: "착수 숫자를 다시 세는 글이 아닙니다. 건진 뒤의 작업입니다. 사람이 타는 비행에서는 타일이 여러 번 버티는 부품이어야 합니다.",
  }, {
    badge: "SPCX", badgeLine: "Series episode · 1:35", title: "Heat-shield changes from a returned Starship go on today's flight",
    heroIcon: "🛠️", heroBig: "Heat shield", heroSub: "Engineers got a first hands-on look after space.",
    cards: [
      { icon: "👀", big: "First look", mid: "Hands on", sub: "After the vehicle returned" },
      { icon: "🔥", big: "Tiles", mid: "Reentry heat", sub: "The shield on the way down" },
      { icon: "🔁", big: "Next ship", mid: "Changes fly", sub: "No tile count" },
    ],
    quote: "What they learned becomes heat-shield improvements visible on today's flight.",
    noteSub: "This is not a recount of the splashdown. It is work after recovery. Crewed flights need tiles that survive more than once.",
  });

  pair("tsla-hmd-semi", "L2", "TSLA", {
    badge: "TSLA", title: "HMD가 테슬라 세미 50대를 약 1,500만 달러에 주문했습니다",
    heroIcon: "🚛", heroBig: "50대", heroSub: "플릿 약 700대는 거의 디젤 피터빌트입니다.",
    cards: [
      { label: "주문", big: "50대", mid: "세미", sub: "전기 트럭" },
      { label: "금액", big: "1500만$", mid: "합계", sub: "대당 평균은 나눗셈" },
      { label: "플릿", big: "700대", mid: "대부분 디젤", sub: "전량 교체가 아님" },
    ],
    detailHead: "인용",
    detailLines: [
      "세미를 기적이라고 불렀습니다. HMD가 약 1,500만 달러 규모로 50대를 주문했습니다. 회사는 대형 트럭 약 700대를 굴리고 거의 전부가 디젤 피터빌트라고 합니다.",
      "게임이 바뀌는 물건이고 100퍼센트 온다고 했습니다.",
      "출처는 모터트렌드로 적혀 있습니다.",
    ],
    noteSub: "50대는 700대의 일부입니다. 합계를 50으로 나누면 약 30만 달러인데, 충전 설비와 보조금은 계약서에 있습니다. 자율주행 세미 가정과는 앞선 주문입니다.",
  }, {
    badge: "TSLA", title: "HMD ordered 50 Tesla Semis for about $15 million",
    heroIcon: "🚛", heroBig: "50 trucks", heroSub: "A fleet of about 700 is mostly diesel Peterbilts.",
    cards: [
      { label: "Order", big: "50", mid: "Semis", sub: "Electric trucks" },
      { label: "Sum", big: "$15M", mid: "Total", sub: "Per-truck is a division" },
      { label: "Fleet", big: "700", mid: "Mostly diesel", sub: "Not a full swap" },
    ],
    detailHead: "QUOTE",
    detailLines: [
      "He called the Semi a miracle.",
      "He said the game changer is coming, 100 percent.",
      "The post lists MotorTrend as the source.",
    ],
    noteSub: "Fifty trucks are a slice of 700. Dividing $15 million by 50 is about $300,000 before chargers and incentives. This is a driven-truck order, ahead of any autonomy case.",
  });

  pair("amd-world-labs", "L1", "NVDA", {
    badge: "AMD", title: "AMD가 월드랩스를 약 82억 달러에 인수합니다",
    heroIcon: "🤝", heroBig: "82억 달러", heroSub: "전액 주식. 9월 28일 발표. 올해 안 마무리 기대.",
    cards: [
      { icon: "🧠", big: "연구팀", mid: "페이페이 리", sub: "모델과 시스템" },
      { icon: "📜", big: "전액 주식", mid: "현금 일시불 아님", sub: "신주가 늘어납니다" },
      { icon: "🗓", big: "2026년 말", mid: "클로징 기대", sub: "규제 승인 조건" },
    ],
    quote: "떠오르는 모델에 맞춰 하드웨어·소프트웨어·시스템을 만들겠다는 회사 문장입니다.",
    noteSub: "상업화 초기라 다음 분기 이익에 바로 더해진다고 밝히지 않았습니다. 로젠블랫 목표 주가 700달러, 스팁펠 635달러, 뱅크오브아메리카 720달러가 매수로 남아 있습니다.",
  }, {
    badge: "AMD", title: "AMD is buying World Labs for about $8.2 billion",
    heroIcon: "🤝", heroBig: "$8.2B", heroSub: "All stock. Announced Sept. 28. Close expected this year.",
    cards: [
      { icon: "🧠", big: "Lab", mid: "Fei-Fei Li", sub: "Models and systems" },
      { icon: "📜", big: "All stock", mid: "Not a cash close", sub: "Share count rises" },
      { icon: "🗓", big: "End 2026", mid: "Expected close", sub: "Needs approvals" },
    ],
    quote: "The company says the team helps build hardware, software, and systems around emerging models.",
    noteSub: "No near-term profit impact was disclosed. Rosenblatt's target is $700, Stifel's $635, and Bank of America's $720, all with buy-side language.",
  });

  pair("tsla-30b-debt", "L5", "TSLA", {
    badge: "TSLA", title: "신용 한도 300억 달러는 200억과 100억으로 나뉩니다",
    heroIcon: "💳", heroBig: "최대 300억 달러", heroSub: "이미 쓴 잔액이 아니라 열어 둔 한도 쪽 문장입니다.",
    before: { label: "기존 부채", big: "약 60억", sub: "중국 한도 59억 포함" },
    after: { label: "새 한도", big: "300억", sub: "텀론 200 + 리볼버 100" },
    cards: [
      { icon: "📆", big: "3년", mid: "텀론", sub: "200억 달러" },
      { icon: "🔄", big: "리볼버", mid: "100억", sub: "더 늘릴 여지" },
      { icon: "🅱", big: "BBB", mid: "피치", sub: "스페이스X보다 한 단계 낮음" },
    ],
    quote: "인공지능, 옵티머스, 사이버캡이 규모를 키우기 전에 자본을 자리에 둔다는 해석이 붙었습니다. 3년 만기 200억 달러와 리볼버 100억 달러로 최대 300억 달러입니다. 피치는 이미 쓴 부채 약 60억 달러와 이 한도를 나눠 적었습니다.",
    noteSub: "피치는 코텍스 2 건설과 학습이 지출의 큰 이유라고 적었습니다. 중국 운전자금 만기는 2026년 9월에서 2027년 3월입니다. 한도와 잔액은 다른 칸입니다.",
  }, {
    badge: "TSLA", title: "The $30 billion facility splits into $20 billion and $10 billion",
    heroIcon: "💳", heroBig: "Up to $30B", heroSub: "Described as capacity to borrow, not debt already drawn.",
    before: { label: "Debt now", big: "~$6B", sub: "Includes $5.9B China" },
    after: { label: "New facility", big: "$30B", sub: "Term 20 + revolver 10" },
    cards: [
      { icon: "📆", big: "3 years", mid: "Term loan", sub: "$20 billion" },
      { icon: "🔄", big: "Revolver", mid: "$10B", sub: "Room to expand" },
      { icon: "🅱", big: "BBB", mid: "Fitch", sub: "One notch under SpaceX" },
    ],
    quote: "The read is capital in place before AI, Optimus, and Cybercab scale.",
    noteSub: "Fitch tied much of the spending to Cortex 2. China working-capital tranches mature between Sept. 2026 and March 2027. A facility is not a drawn balance.",
  });

  pair("tsla-china-promo", "L6", "TSLA", {
    badge: "TSLA", breaking: "20일 안 두 번째", title: "중국 가격 인센티브를 다시 조정했다는 속보가 있습니다",
    heroBig: "2번째", heroSub: "10월 31일까지 모델3 5,000위안, 일부 모델Y 7,000위안입니다.",
    grid: [
      { icon: "3️⃣", big: "5천", mid: "모델3", sub: "잔금 위안" },
      { icon: "🆈", big: "7천", mid: "일부 모델Y", sub: "퍼포먼스 제외" },
      { icon: "📆", big: "10/31", mid: "주문 마감", sub: "9월 25일 안" },
      { icon: "1️⃣", big: "1만", mid: "9월 7일", sub: "재고 모델Y" },
    ],
    ctx1: "두 잔금 할인은 겹쳐 쓸 수 없습니다.",
    ctx2: "목록 가격은 그대로라는 보도입니다.",
    quote: "8월 중국 인도는 5만 47대로 1년 전보다 12% 줄었고, 모델Y는 26% 줄었습니다. 10월 31일까지 모델3 잔금 5,000위안, 일부 모델Y 7,000위안입니다. 9월 7일 재고 모델Y는 10,000위안이었고 두 할인은 겹치지 않습니다.",
    noteSub: "9월 7일 안은 9월 30일까지 인도하는 재고차였습니다. 이번 안은 할인 폭은 줄고 맞춤 주문 기간은 늘어났습니다. 목록가 인하와 잔금 할인은 다릅니다.",
  }, {
    badge: "TSLA", breaking: "Second cut in 20 days", title: "A post says China incentives were adjusted again",
    heroBig: "2nd", heroSub: "The card has no yuan figures. Amounts are from the Sept. 25 note.",
    grid: [
      { icon: "3️⃣", big: "¥5k", mid: "Model 3", sub: "Off the final payment" },
      { icon: "🆈", big: "¥7k", mid: "Some Model Y", sub: "Performance excluded" },
      { icon: "📆", big: "Oct 31", mid: "Order by", sub: "Sept. 25 offer" },
      { icon: "1️⃣", big: "¥10k", mid: "Sept. 7", sub: "Inventory Model Y" },
    ],
    ctx1: "The two tail-payment offers cannot be stacked.",
    ctx2: "List prices were reported unchanged.",
    quote: "August China deliveries were 50,047, down 12% year over year, and Model Y fell 26%.",
    noteSub: "The Sept. 7 offer was inventory delivered by Sept. 30. This round is a smaller Model Y cut on a longer custom-order window. A list-price cut and a tail discount differ.",
  });

  pair("norway-ev-98", "L2", "TSLA", {
    badge: "TSLA", title: "노르웨이 올해 신차의 98%가 전기차라고 합니다",
    heroIcon: "🇳🇴", heroBig: "98%", heroSub: "모델Y가 다음 모델을 300% 넘게 앞선다는 9월 27일 글입니다.",
    cards: [
      { label: "신차", big: "98%", mid: "전기차", sub: "올해 등록 비중" },
      { label: "1위", big: "모델Y", mid: "300%+", sub: "다음 모델 대비" },
      { label: "없는 표", big: "대수 없음", mid: "2위 이름", sub: "카드에 없음" },
    ],
    detailHead: "읽는 법",
    detailLines: [
      "도로 위 모든 차의 비중이 아니라 올해 새 차입니다.",
      "300%는 2위의 네 배라는 비교로 읽힙니다. 올해 노르웨이 신차의 98%가 전기차이고 모델Y가 다음 모델을 300% 넘게 앞섭니다. 글 날짜는 9월 27일입니다. 98%는 새 차 등록이지 도로 위 모든 차는 아닙니다.",
      "월보가 나오면 그 표가 기준이 됩니다.",
    ],
    noteSub: "중국 잔금 할인과 이 등록 비중은 다른 시장입니다. 한쪽은 가격 행사, 한쪽은 이미 전기가 기본인 나라의 순위입니다.",
  }, {
    badge: "TSLA", title: "98% of new cars in Norway this year are said to be EVs",
    heroIcon: "🇳🇴", heroBig: "98%", heroSub: "Model Y leads the next model by over 300%, dated Sept. 27.",
    cards: [
      { label: "New cars", big: "98%", mid: "EVs", sub: "This year's registrations" },
      { label: "Lead", big: "Model Y", mid: "300%+", sub: "Versus the next model" },
      { label: "No table", big: "No units", mid: "No #2 name", sub: "Not on the card" },
    ],
    detailHead: "HOW TO READ IT",
    detailLines: [
      "This is new cars this year, not every car on the road.",
      "300% ahead reads as about four times second place.",
      "The monthly registry table is the check.",
    ],
    noteSub: "China's tail discount and this registration share are different markets. One is a price offer. The other is a ranking where electric is already the default.",
  });

  pair("dc-power-755", "L6", "MACRO", {
    badge: "MACRO", breaking: "전력 수요", title: "데이터센터 전력이 2029년까지 755% 늘어난다는 한 줄입니다",
    heroBig: "755%", heroSub: "2029년까지 데이터센터 전력 수요가 급증한다는 문장입니다.",
    grid: [
      { icon: "⚡", big: "755%", mid: "수요", sub: "2029년까지" },
      { icon: "❓", big: "각주 없음", mid: "시작 해", sub: "카드가 안 밝힘" },
      { icon: "🏗", big: "+510억", mid: "건설비", sub: "이미 나간 돈" },
      { icon: "☀️", big: "200GW", mid: "모듈 목표", sub: "만드는 쪽" },
    ],
    ctx1: "건설비와 전력 배수는 단위가 다릅니다.",
    ctx2: "냉각을 넣는지에 따라 배수가 갈립니다.",
    quote: "건물이 먼저 서고 변압기가 늦으면 두 숫자의 시간표가 어긋납니다.",
    noteSub: "어떤 표는 장비만, 어떤 표는 냉각까지 넣습니다. 755%를 다른 기관 숫자 옆에 놓으려면 각주가 필요합니다. 태양광 목표는 그 전기의 공급 쪽입니다.",
  }, {
    badge: "MACRO", breaking: "Power demand", title: "One line says data-center power rises 755% by 2029",
    heroBig: "755%", heroSub: "Base year and source report are not on the card.",
    grid: [
      { icon: "⚡", big: "755%", mid: "Demand", sub: "By 2029" },
      { icon: "❓", big: "No note", mid: "Start year", sub: "Card does not say" },
      { icon: "🏗", big: "+$51B", mid: "Construction", sub: "Money already spent" },
      { icon: "☀️", big: "200GW", mid: "Module target", sub: "The supply side" },
    ],
    ctx1: "Construction dollars and a power multiple use different units.",
    ctx2: "Including cooling changes the multiple.",
    quote: "If buildings rise before transformers arrive, the two clocks slip.",
    noteSub: "Some tables count IT gear only, some include cooling. Park 755% next to another forecast only with the footnote. The solar target is the supply side of that electricity.",
  });

  pair("tsla-q3-kalshi", "L1", "TSLA", {
    badge: "TSLA", title: "3분기 인도 예측은 49만 대 안팎, 중심은 48만 7천입니다",
    heroIcon: "📈", heroBig: "48.7만", heroSub: "공식 인도는 아직입니다. 시장은 10월 3일 동부 자정에 닫힙니다.",
    cards: [
      { icon: "🎯", big: "49만", mid: "헤드라인", sub: "거의 49만 대" },
      { icon: "📊", big: "487K", mid: "그래프", sub: "예측에 1천을 더한 눈금" },
      { icon: "🕛", big: "10/3", mid: "시장 마감", sub: "분기는 9월 30일에 닫힘" },
    ],
    quote: "예측 시장 가격은 돈을 건 분포입니다. 회사 가이던스가 아닙니다. 거의 49만 대, 그래프 캡션은 48만 7천 대에 1천입니다. 시장은 10월 3일 동부 자정에 닫히고, 분기는 9월 30일에 달력이 닫힙니다.",
    noteSub: "공식 숫자는 보통 분기 다음 첫 주에 나옵니다. 중국 8월과 노르웨이 등록은 지역 조각입니다. 49만 대는 전 세계 합을 맞히는 판입니다.",
  }, {
    badge: "TSLA", title: "A delivery market centers near 487,000 for the third quarter",
    heroIcon: "📈", heroBig: "487K", heroSub: "No official print yet. The market closes Oct. 3 at midnight Eastern.",
    cards: [
      { icon: "🎯", big: "490K", mid: "Headline", sub: "Nearly 490,000" },
      { icon: "📊", big: "487K", mid: "Chart", sub: "Forecast plus 1K" },
      { icon: "🕛", big: "Oct 3", mid: "Market end", sub: "Quarter closes Sept. 30" },
    ],
    quote: "A prediction price is a distribution of bets. It is not company guidance.",
    noteSub: "The official count usually lands the week after the quarter. China in August and Norway registrations are regional slices. 490,000 is a guess at the world total.",
  });

  pair("spcx-arr-100b", "L4", "SPCX", {
    badge: "SPCX", badgeLine: "12월 연환산", title: "스페이스X 연환산 매출 1,000억 달러는 물음표가 아니라고 합니다",
    heroIcon: "🌌", heroBig: "1,000억 달러", heroSub: "기본적으로 더 보태지 않아도 그 속도라는 문장입니다.",
    cards: [
      { icon: "📆", big: "12월", mid: "올해", sub: "도달 시점" },
      { icon: "✖️", big: "12배", mid: "연환산", sub: "한 달 속도를 펼친 것" },
      { icon: "📆", big: "12월", mid: "올해", sub: "도달한다고 적힌 달" },
    ],
    quote: "1,000억 달러 연환산은 물음표가 아닙니다. 더 안 해도 그 수준이라고 했습니다. 올해 12월에 그 속도에 도달할 것으로 기대한다고 적혀 있습니다. 연환산은 한 달 속도를 열두 달로 펼친 것이고, 1월부터 12월까지 쌓인 합과는 다를 수 있습니다.",
    noteSub: "연환산은 그 해 1월부터 12월까지 쌓인 합과 다를 수 있습니다. 845억 달러 약정 상한과 12월 속도를 한 해 매출로 더하면 두 번 세게 됩니다.",
  }, {
    badge: "SPCX", badgeLine: "December run rate", title: "SpaceX annualized revenue above $100 billion was called not a question mark",
    heroIcon: "🌌", heroBig: "$100B+", heroSub: "Described as the pace even if nothing more is added.",
    cards: [
      { icon: "📆", big: "December", mid: "This year", sub: "The month named" },
      { icon: "✖️", big: "×12", mid: "Annualized", sub: "A month's pace, stretched" },
      { icon: "🚫", big: "No table", mid: "Monthly bills", sub: "Not in the capture" },
    ],
    quote: "The $100 billion December run rate is not a question mark. It is what they would reach if they basically did nothing more.",
    noteSub: "Annualized is not the same as cash collected from January through December. Adding the $84.5 billion cap to the December pace double counts.",
  });

  pair("tabarrok-tesla", "L3", "TSLA", {
    badge: "TSLA", title: "차를 살 바에는 운전사를 빼는 쪽이라며 테슬라를 샀다는 글입니다",
    heroIcon: "✍️", heroBig: "차 vs 운전사", heroSub: "9월 28일 후기. 트림과 가격은 없습니다.",
    cards: [
      { icon: "🚗", big: "구매", mid: "한 사람이 샀습니다", sub: "판매 통계가 아니라 9월 28일 후기입니다" },
      { icon: "🤖", big: "더 나아짐", mid: "주행은 더 잘해진다고", sub: "사람은 더 못해진다고 적혀 있습니다" },
      { icon: "💵", big: "비슷한 값", mid: "다른 차는 이유가 없다", sub: "비슷한 가격이면 다른 차를 살 이유가 없다고 합니다" },
    ],
    quote: "선택은 차냐, 차와 운전사냐였습니다. 감독 완전자율주행은 모두가 말하는 만큼 좋고, 앞으로 더 나아지는 반면 사람은 더 못해진다고 합니다. 비슷한 가격이면 다른 차를 살 이유가 정말 없다고 적혀 있습니다.",
    noteSub: "한 사람의 구매 후기입니다. 노르웨이 등록 순위와 오스틴 호출 요금이 수량과 가격의 표이고, 이 글은 그 표를 산 이유에 가깝습니다. 사고율 비교는 안전보고서의 마일에서 따로 봐야 합니다. 비슷한 가격이라는 문장에도 비교 차종은 적혀 있지 않습니다.",
  }, {
    badge: "TSLA", title: "A buyer wrote he chose a car without hiring a driver",
    heroIcon: "✍️", heroBig: "Car vs driver", heroSub: "A Sept. 28 note. No trim or price.",
    cards: [
      { icon: "🚗", big: "One buyer", mid: "Personal", sub: "Not a sales statistic" },
      { icon: "🤖", big: "Gets better", mid: "Software", sub: "He says he will get worse" },
      { icon: "💵", big: "Similar price", mid: "No rival named", sub: "Not a receipt" },
    ],
    quote: "The choice was a car, or a car plus a driver. At a similar price he sees no reason to buy anything else.",
    noteSub: "Norway registrations and Austin fares are the quantity and price tables. This note is closer to a reason for buying. Crash rates sit in the safety-report miles.",
  });
};
