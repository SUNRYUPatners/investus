const { KR, SAFE, KR_RE } = require("./data-20261008-markets");
const all = [...KR, ...SAFE, ...KR_RE];
const by = Object.fromEntries(all.map((r) => [r.slug, r]));

function plain(s) {
  return String(s || "").replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").replace(/\s+/g, " ").trim();
}
function sec(slug, name) {
  const body = by[slug].body;
  const re = new RegExp("■ " + name + "\\n\\n([\\s\\S]*?)\\n\\n■");
  const m = body.match(re);
  return plain(m ? m[1] : by[slug].summary);
}

module.exports = function (add) {
  const F = "2026.10.08";

  add("summary-kr", "ROWS", "KOSPI", {
    headline: "2026.10.08 한국 마감",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "6941", title: "코스피는 0.89% 내린 6,941.39로 마감했습니다", sub: "시가 7,044에서 7,000선을 하루 만에 내줬습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "272000", title: "삼성전자는 1.45% 내린 27만 2,000원입니다", sub: "내일 잠정 눈높이는 106조 9,435억 원입니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "177.3만", title: "SK하이닉스는 3.69% 내린 177만 3,000원입니다", sub: "외국인이 1조 4,066억 원을 팔았습니다." },
      { color: "#22d3ee", fill: "#06171c", right: "390000", title: "LG에너지솔루션은 5.12% 오른 39만 원입니다", sub: "삼성증권 목표는 46만 원입니다." },
      { color: "#34d399", fill: "#052015", right: "131만", title: "삼성바이오로직스는 3.25% 내린 131만 원입니다", sub: "유상증자 발행가 확정이 같은 날입니다." },
      { color: "#22d3ee", fill: "#0a1c22", right: "1.75조", title: "외국인은 1조 7,509억 원을 순매도했습니다", sub: "코스닥은 2.98% 오른 919.92입니다." },
    ],
    caption: "6,941.39 · 삼성 27만 2,000 · 하이닉스 177만 3,000 · 엔솔 39만 · 외인 1조 7,509억",
  }, {
    headline: "2026.10.08 Korea close",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "6941", title: "KOSPI closed at 6,941.39, down 0.89%", sub: "It gave back 7,000 after opening at 7,044." },
      { color: "#60a5fa", fill: "#06121f", right: "272000", title: "Samsung Electronics fell 1.45% to 272,000", sub: "Street Q3 operating profit sits near 106.94 trillion won." },
      { color: "#f59e0b", fill: "#1a1205", right: "1.773M", title: "SK hynix fell 3.69% to 1,773,000 won", sub: "Foreigners sold 1.41 trillion won." },
      { color: "#22d3ee", fill: "#06171c", right: "390000", title: "LG Energy Solution rose 5.12% to 390,000", sub: "Samsung Securities keeps 460,000." },
      { color: "#34d399", fill: "#052015", right: "1.31M", title: "Samsung Biologics fell 3.25% to 1,310,000", sub: "The rights-issue price was fixed." },
      { color: "#22d3ee", fill: "#0a1c22", right: "1.75T", title: "Foreigners sold 1.7509 trillion won", sub: "KOSDAQ rose 2.98% to 919.92." },
    ],
    caption: "6,941.39 · Samsung 272,000 · Hynix 1,773,000 · LGES 390,000 · foreign -1.75T",
  });

  add("summary-safe", "ROWS", "GOLD", {
    headline: "2026.10.08 안전자산",
    rows: [
      { color: "#f7931a", fill: "#1a0f00", right: "86647", title: "비트코인은 자정 기준 8만 6,647달러로 1.25% 올랐습니다", sub: "뉴욕 시각은 8만 5,650달러입니다." },
      { color: "#facc15", fill: "#1a1600", right: "4181", title: "금 현물은 4,180.99달러입니다", sub: "전일 4,175.70달러에서 소폭 반등입니다." },
      { color: "#818cf8", fill: "#0f1024", right: "2723", title: "이더리움은 2,723달러로 0.76% 올랐습니다", sub: "점유율은 11.29%입니다." },
      { color: "#38bdf8", fill: "#061520", right: "101.30", title: "달러인덱스는 101.30 부근입니다", sub: "원·달러는 1,343.6원입니다." },
      { color: "#ef4444", fill: "#1a0a0a", right: "5.270%", title: "미국 10년 금리는 5.270%로 하루 내렸습니다", sub: "전날 고점은 5.34%입니다." },
    ],
    caption: "비트코인 86,647 · 금 4,181 · 이더 2,723 · DXY 101.30 · 10년 5.270%",
  }, {
    headline: "2026.10.08 Safe assets",
    rows: [
      { color: "#f7931a", fill: "#1a0f00", right: "86647", title: "Bitcoin was $86,647 at midnight, up 1.25%", sub: "The New York print sat near $85,650." },
      { color: "#facc15", fill: "#1a1600", right: "4181", title: "Spot gold is $4,180.99", sub: "A small bounce from $4,175.70." },
      { color: "#818cf8", fill: "#0f1024", right: "2723", title: "Ether rose 0.76% to $2,723", sub: "Dominance is 11.29%." },
      { color: "#38bdf8", fill: "#061520", right: "101.30", title: "The dollar index sits near 101.30", sub: "The won closed at 1,343.6." },
      { color: "#ef4444", fill: "#1a0a0a", right: "5.270%", title: "The U.S. 10-year eased to 5.270%", sub: "The prior high was 5.34%." },
    ],
    caption: "Bitcoin $86,647 · gold $4,181 · ether $2,723 · DXY 101.30 · 10-year 5.270%",
  });

  add("summary-krre", "ROWS", "POLICY", {
    headline: "2026.10.08 부동산",
    rows: [
      { color: "#fb923c", fill: "#1a0d02", right: "86주", title: "서울 아파트값이 86주 연속 올라 최장 기록을 넘겼습니다", sub: "한 주는 0.09%이고 오름폭은 다섯 주 줄었습니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "국감", title: "오늘 국토부 국감에서 공급 대책 실효성을 따집니다", sub: "9·7, 1·29, 8·13 대책이 착공으로 내려오는지입니다." },
      { color: "#60a5fa", fill: "#06121f", right: "1/3", title: "전세사기 최소보장제가 11월 13일부터 3분의 1을 채웁니다", sub: "예산은 840억 원입니다." },
    ],
    caption: "매매 86주 · 국감 공급 · 최소보장 3분의 1 · 예산 840억",
  }, {
    headline: "2026.10.08 Housing",
    rows: [
      { color: "#fb923c", fill: "#1a0d02", right: "86w", title: "Seoul apartment prices rose for a record 86th week", sub: "The week was 0.09% and gains have slowed for five weeks." },
      { color: "#a78bfa", fill: "#120b1f", right: "Hearing", title: "Today's land ministry hearing tests supply delivery", sub: "Whether 9/7, 1/29 and 8/13 become starts." },
      { color: "#60a5fa", fill: "#06121f", right: "1/3", title: "A jeonse-fraud floor covers one-third from November 13", sub: "The budget is 84 billion won." },
    ],
    caption: "86-week sales · supply hearing · one-third floor · 84bn won budget",
  });

  function pair(file, layout, pal, ko, en) {
    ko.footer = F;
    en.footer = F;
    ko.noteHead = "왜 중요한가";
    en.noteHead = "Why it matters";
    ko.quote = sec(file, "무슨 일인가요");
    ko.noteSub = sec(file, "조금만 더 알려드리면");
    const base = plain(by[file].titleEn + " " + by[file].summaryEn);
    en.quote = base;
    en.noteSub = base;
    add(file, layout, pal, ko, en);
  }
  const c3 = (a, b, c) => [a, b, c];

  pair("samsung-close-kr", "L1", "SEC", {
    badge: "삼성", title: "삼성전자는 1.45% 내린 27만 2,000원입니다",
    heroIcon: "📊", heroBig: "272,000", heroSub: "외국인은 5,667억 원을 팔았습니다. 내일 잠정이 있습니다.",
    cards: c3(
      { icon: "🌍", big: "5,667억", mid: "외국인", sub: "창구 순매도" },
      { icon: "📄", big: "106.9조", mid: "영업익", sub: "3분기 눈높이" },
      { icon: "📅", big: "8일", mid: "잠정", sub: "내일 공시" },
    ),
  }, {
    badge: "SEC", title: "Samsung closed at 272,000 won, down 1.45%",
    heroIcon: "📊", heroBig: "272,000", heroSub: "Foreigners sold 566.7 billion won. Prelims are tomorrow.",
    cards: c3(
      { icon: "🌍", big: "567bn", mid: "Foreign", sub: "Net sell" },
      { icon: "📄", big: "106.9T", mid: "OP", sub: "Street Q3" },
      { icon: "📅", big: "Oct 8", mid: "Prelim", sub: "Tomorrow" },
    ),
  });

  pair("hynix-close-kr", "L2", "HYNIX", {
    badge: "하이닉스", title: "SK하이닉스는 177만 3,000원으로 내렸습니다",
    heroIcon: "📉", heroBig: "177.3만", heroSub: "3.69% 하락. 외국인 1조 4,066억 원입니다.",
    cards: [
      { label: "종가", big: "177.3만", mid: "-68,000원", sub: "3.69%" },
      { label: "외국인", big: "1.41조", mid: "순매도", sub: "창구 1위" },
      { label: "설", big: "솔리다임", mid: "상장", sub: "미국 손자회사" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "iM증권 목표주가는 350만 원입니다.",
      "자사주는 15일 전후가 마지막 주문으로 거론됩니다.",
      "3분기 영업이익 눈높이는 약 77조 원입니다.",
    ],
  }, {
    badge: "Hynix", title: "SK hynix closed at 1,773,000 won",
    heroIcon: "📉", heroBig: "1.773M", heroSub: "Down 3.69%. Foreigners sold 1.41 trillion won.",
    cards: [
      { label: "Close", big: "1.773M", mid: "-68,000", sub: "3.69%" },
      { label: "Foreign", big: "1.41T", mid: "Net sell", sub: "Top outflow" },
      { label: "Rumor", big: "Solidigm", mid: "Listing", sub: "U.S. unit" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "iM's target is 3.5 million won.",
      "Last buyback tickets are around October 15.",
      "Street Q3 operating profit sits near 77 trillion won.",
    ],
  });

  pair("lges-close-kr", "L4", "LGES", {
    badge: "엔솔", badgeLine: "5.12% 상승", title: "LG에너지솔루션은 39만 원입니다",
    heroIcon: "🔋", heroBig: "390,000", heroSub: "1만 9,000원 상승. 반도체 투톱이 빠진 날의 배터리입니다.",
    cards: c3(
      { icon: "📈", big: "+19,000", mid: "원", sub: "5.12%" },
      { icon: "📄", big: "3,517억", mid: "영업익", sub: "삼성증권 추정" },
      { icon: "🎯", big: "46만", mid: "목표", sub: "매수 유지" },
    ),
  }, {
    badge: "LGES", badgeLine: "Up 5.12%", title: "LG Energy Solution closed at 390,000 won",
    heroIcon: "🔋", heroBig: "390,000", heroSub: "Up 19,000 won while the chip pair fell.",
    cards: c3(
      { icon: "📈", big: "+19,000", mid: "won", sub: "5.12%" },
      { icon: "📄", big: "352bn", mid: "OP", sub: "Samsung Securities" },
      { icon: "🎯", big: "460k", mid: "Target", sub: "Buy kept" },
    ),
  });

  pair("bio-close-kr", "L3", "BIO", {
    badge: "삼바", title: "삼성바이오로직스는 131만 원으로 내렸습니다",
    heroIcon: "💊", heroBig: "131만", heroSub: "3.25% 하락. 유상증자 발행가 확정이 같은 날입니다.",
    cards: c3(
      { icon: "📉", big: "-44,000", mid: "원", sub: "3.25%" },
      { icon: "📝", big: "유증", mid: "발행가", sub: "확정 공시" },
      { icon: "📦", big: "수주", mid: "공시", sub: "희석과 겹침" },
    ),
  }, {
    badge: "Bio", title: "Samsung Biologics closed at 1,310,000 won",
    heroIcon: "💊", heroBig: "1.31M", heroSub: "Down 3.25%. The rights-issue price was fixed.",
    cards: c3(
      { icon: "📉", big: "-44,000", mid: "won", sub: "3.25%" },
      { icon: "📝", big: "Issue", mid: "Price", sub: "Fixed" },
      { icon: "📦", big: "Orders", mid: "Filing", sub: "Beside dilution" },
    ),
  });

  pair("flow-kospi-kr", "L5", "FLOW", {
    badge: "수급", title: "외국인이 1조 7,509억 원을 팔고 개인은 7,406억 원을 샀습니다",
    heroIcon: "💸", heroBig: "1.75조", heroSub: "유가증권 외국인 순매도입니다. 전기·전자에서 1조 5,402억 원입니다.",
    before: { label: "외국인", big: "-1.75조", sub: "화요일 하루" },
    after: { label: "개인", big: "+7,406억", sub: "화요일 하루" },
    cards: c3(
      { icon: "💾", big: "1.54조", mid: "전기전자", sub: "외국인 매도" },
      { icon: "📈", big: "919.92", mid: "코스닥", sub: "+2.98%" },
      { icon: "💱", big: "1,343.6", mid: "원", sub: "화요일 종가" },
    ),
  }, {
    badge: "Flow", title: "Foreigners sold 1.75 trillion while individuals bought 741 billion",
    heroIcon: "💸", heroBig: "1.75T", heroSub: "KOSPI foreign outflow. 1.54 trillion in electric-electronics.",
    before: { label: "Foreign", big: "-1.75T", sub: "Tuesday" },
    after: { label: "Individuals", big: "+741bn", sub: "Tuesday" },
    cards: c3(
      { icon: "💾", big: "1.54T", mid: "Tech", sub: "Foreign sell" },
      { icon: "📈", big: "919.92", mid: "KOSDAQ", sub: "+2.98%" },
      { icon: "💱", big: "1,343.6", mid: "Won", sub: "Tuesday close" },
    ),
  });

  pair("btc-kr", "L1", "BTC", {
    badge: "BTC", title: "비트코인은 자정 기준 8만 6,647달러입니다",
    heroIcon: "🪙", heroBig: "86,647", heroSub: "1.25% 상승. 뉴욕 시각은 8만 5,650달러입니다.",
    cards: c3(
      { icon: "🗽", big: "85,650", mid: "뉴욕", sub: "거의 보합" },
      { icon: "📊", big: "59.13%", mid: "점유", sub: "도미넌스" },
      { icon: "💸", big: "-1.21억$", mid: "ETF", sub: "현물 순유출" },
    ),
  }, {
    badge: "BTC", title: "Bitcoin was $86,647 at midnight",
    heroIcon: "🪙", heroBig: "86,647", heroSub: "Up 1.25%. The New York print sat near $85,650.",
    cards: c3(
      { icon: "🗽", big: "85,650", mid: "New York", sub: "Almost flat" },
      { icon: "📊", big: "59.13%", mid: "Share", sub: "Dominance" },
      { icon: "💸", big: "-$121M", mid: "ETF", sub: "Spot outflow" },
    ),
  });

  pair("gold-kr", "L2", "GOLD", {
    badge: "금", title: "금 현물은 4,180.99달러입니다",
    heroIcon: "🥇", heroBig: "4,181", heroSub: "전일 4,175.70달러에서 소폭 올랐습니다.",
    cards: [
      { label: "현물", big: "4,180.99", mid: "달러", sub: "아침 시각" },
      { label: "선물", big: "4,156.3", mid: "달러", sub: "12월 정산" },
      { label: "10년", big: "5.270%", mid: "금리", sub: "하루 하락" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "달러인덱스는 101.30 부근입니다.",
      "전날 10년 고점은 5.34%입니다.",
      "골드만삭스는 실질금리와 금을 같이 봅니다.",
    ],
  }, {
    badge: "Gold", title: "Spot gold is $4,180.99",
    heroIcon: "🥇", heroBig: "4,181", heroSub: "A small bounce from $4,175.70.",
    cards: [
      { label: "Spot", big: "4,180.99", mid: "USD", sub: "Morning print" },
      { label: "Futures", big: "4,156.3", mid: "USD", sub: "December settle" },
      { label: "10-year", big: "5.270%", mid: "Yield", sub: "Down on the day" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The dollar index sits near 101.30.",
      "The prior 10-year high was 5.34%.",
      "Goldman looks at real yields with gold.",
    ],
  });

  pair("eth-kr", "L3", "ETH", {
    badge: "ETH", title: "이더리움은 2,723달러로 올랐습니다",
    heroIcon: "💎", heroBig: "2,723", heroSub: "0.76% 상승. 점유율은 11.29%입니다.",
    cards: c3(
      { icon: "📊", big: "11.29%", mid: "점유", sub: "조금 감소" },
      { icon: "🪙", big: "59.13%", mid: "비트", sub: "점유 확대" },
      { icon: "📉", big: "-15.6%", mid: "거래", sub: "24시간 대금" },
    ),
  }, {
    badge: "ETH", title: "Ether rose to $2,723",
    heroIcon: "💎", heroBig: "2,723", heroSub: "Up 0.76%. Dominance is 11.29%.",
    cards: c3(
      { icon: "📊", big: "11.29%", mid: "Share", sub: "Slightly lower" },
      { icon: "🪙", big: "59.13%", mid: "Bitcoin", sub: "Share higher" },
      { icon: "📉", big: "-15.6%", mid: "Volume", sub: "24-hour turnover" },
    ),
  });

  pair("dxy-kr", "L4", "DXY", {
    badge: "DXY", badgeLine: "101.30", title: "달러인덱스가 101.30 부근에서 고점을 시험합니다",
    heroIcon: "💵", heroBig: "101.30", heroSub: "세 달 고점에 가깝습니다. 원·달러는 1,343.6원입니다.",
    cards: c3(
      { icon: "🇰🇷", big: "1,343.6", mid: "원", sub: "화요일 종가" },
      { icon: "📉", big: "5.270%", mid: "10년", sub: "하루 하락" },
      { icon: "📅", big: "의사록", mid: "오늘밤", sub: "다음 달력" },
    ),
  }, {
    badge: "DXY", badgeLine: "101.30", title: "The dollar index is testing highs near 101.30",
    heroIcon: "💵", heroBig: "101.30", heroSub: "Close to a three-month peak. The won closed at 1,343.6.",
    cards: c3(
      { icon: "🇰🇷", big: "1,343.6", mid: "Won", sub: "Tuesday close" },
      { icon: "📉", big: "5.270%", mid: "10-year", sub: "Down on the day" },
      { icon: "📅", big: "Minutes", mid: "Tonight", sub: "Next calendar" },
    ),
  });

  pair("ust10-kr", "L5", "UST", {
    badge: "UST", title: "미국 10년 금리는 5.270%로 하루 내렸습니다",
    heroIcon: "📉", heroBig: "5.270%", heroSub: "4bp 하락입니다. 전날 고점은 5.34%입니다.",
    before: { label: "고점", big: "5.34%", sub: "10월 5일" },
    after: { label: "이날", big: "5.270%", sub: "10월 6일" },
    cards: c3(
      { icon: "📆", big: "5.70%", mid: "30년", sub: "그 주 고점" },
      { icon: "📊", big: "74.0", mid: "ISM", sub: "서비스 물가" },
      { icon: "📅", big: "의사록", mid: "오늘밤", sub: "다음 힌트" },
    ),
  }, {
    badge: "UST", title: "The U.S. 10-year eased to 5.270%",
    heroIcon: "📉", heroBig: "5.270%", heroSub: "Down 4 basis points. The prior high was 5.34%.",
    before: { label: "High", big: "5.34%", sub: "October 5" },
    after: { label: "Print", big: "5.270%", sub: "October 6" },
    cards: c3(
      { icon: "📆", big: "5.70%", mid: "30-year", sub: "Week high" },
      { icon: "📊", big: "74.0", mid: "ISM", sub: "Services prices" },
      { icon: "📅", big: "Minutes", mid: "Tonight", sub: "Next hint" },
    ),
  });

  pair("seoul-86w-sale", "L1", "JEONSE", {
    badge: "서울", title: "서울 아파트값이 86주 연속 올라 최장 기록을 넘겼습니다",
    heroIcon: "🏢", heroBig: "86주", heroSub: "한 주는 0.09%입니다. 오름폭은 다섯 주 연속 줄었습니다.",
    cards: c3(
      { icon: "📈", big: "0.09%", mid: "한 주", sub: "9월 넷째 주" },
      { icon: "📉", big: "5주", mid: "축소", sub: "오름폭" },
      { icon: "🏆", big: "85주", mid: "종전", sub: "최장 기록" },
    ),
  }, {
    badge: "Seoul", title: "Seoul apartment prices rose for a record 86th week",
    heroIcon: "🏢", heroBig: "86w", heroSub: "The week was 0.09%. Gains have slowed for five weeks.",
    cards: c3(
      { icon: "📈", big: "0.09%", mid: "Week", sub: "Late September" },
      { icon: "📉", big: "5w", mid: "Slower", sub: "The gain" },
      { icon: "🏆", big: "85w", mid: "Old mark", sub: "Prior record" },
    ),
  });

  pair("molit-audit", "L4", "POLICY", {
    badge: "국감", badgeLine: "오늘", title: "국토부 국감에서 공급 대책 실효성을 따집니다",
    heroIcon: "🏛️", heroBig: "국감", heroSub: "9·7, 1·29, 8·13 대책이 착공으로 내려오는지가 쟁점입니다.",
    cards: c3(
      { icon: "📋", big: "3건", mid: "대책", sub: "공급 패키지" },
      { icon: "🏗️", big: "착공", mid: "질의", sub: "계획에서 현장" },
      { icon: "🏦", big: "LH", mid: "부채", sub: "재원 칸" },
    ),
  }, {
    badge: "Hearing", badgeLine: "Today", title: "The land ministry hearing tests supply delivery",
    heroIcon: "🏛️", heroBig: "Audit", heroSub: "Whether 9/7, 1/29 and 8/13 become starts.",
    cards: c3(
      { icon: "📋", big: "3", mid: "Packages", sub: "Supply plans" },
      { icon: "🏗️", big: "Starts", mid: "Question", sub: "Plan to site" },
      { icon: "🏦", big: "LH", mid: "Debt", sub: "Funding" },
    ),
  });

  pair("jeonse-floor", "L3", "JEONSE", {
    badge: "전세", title: "전세사기 최소보장제가 11월 13일부터 3분의 1을 채웁니다",
    heroIcon: "🛡️", heroBig: "1/3", heroSub: "보증금의 최소 보장입니다. 예산은 840억 원입니다.",
    cards: c3(
      { icon: "📅", big: "11/13", mid: "시행", sub: "접수 시작" },
      { icon: "👥", big: "4.1만", mid: "피해자", sub: "누적 4만 936명" },
      { icon: "💰", big: "840억", mid: "예산", sub: "LH 지급" },
    ),
  }, {
    badge: "Jeonse", title: "A jeonse-fraud floor covers one-third from November 13",
    heroIcon: "🛡️", heroBig: "1/3", heroSub: "A minimum deposit recovery. The budget is 84 billion won.",
    cards: c3(
      { icon: "📅", big: "Nov 13", mid: "Start", sub: "Applications" },
      { icon: "👥", big: "40,936", mid: "Victims", sub: "Cumulative" },
      { icon: "💰", big: "84bn", mid: "Budget", sub: "Paid by LH" },
    ),
  });
};
