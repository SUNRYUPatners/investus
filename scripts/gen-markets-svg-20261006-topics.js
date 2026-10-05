const { KR, SAFE, KR_RE } = require("./data-20261006-markets");
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
  const F = "2026.10.06";

  add("summary-kr", "ROWS", "KOSPI", {
    headline: "2026.10.06 한국 마감",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "7003", title: "코스피는 0.46% 오른 7,003.74로 마감했습니다", sub: "시가 6,938에서 7,000선을 되찾았습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "276000", title: "삼성전자는 27만 6,000원 보합입니다", sub: "8일 잠정실적 눈높이는 109조 5,000억 원입니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "184.1만", title: "SK하이닉스는 0.44% 오른 184만 1,000원입니다", sub: "기타법인이 9,053억 원을 받았습니다." },
      { color: "#22d3ee", fill: "#06171c", right: "371000", title: "LG에너지솔루션은 2.91% 오른 37만 1,000원입니다", sub: "시총 상위 가운데 두드러진 오름입니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "116만", title: "SK스퀘어는 0.43% 오른 116만 원입니다", sub: "시가총액 4위 지주입니다." },
      { color: "#22d3ee", fill: "#0a1c22", right: "3813억", title: "기관은 3,813억 원을 순매수했습니다", sub: "외국인 1,367억 매도, 개인 1조 7,205억 매도입니다." },
    ],
    caption: "7,003.74 · 삼성 27만 6,000 · 하이닉스 184만 1,000 · 엔솔 37만 1,000 · 기관 3,813억",
  }, {
    headline: "2026.10.06 Korea close",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "7003", title: "KOSPI closed at 7,003.74, up 0.46%", sub: "It retook 7,000 from an open of 6,938." },
      { color: "#60a5fa", fill: "#06121f", right: "276000", title: "Samsung Electronics closed unchanged at 276,000", sub: "Street Q3 operating profit sits near 109.5 trillion won." },
      { color: "#f59e0b", fill: "#1a1205", right: "1.841M", title: "SK hynix closed at 1,841,000 won, up 0.44%", sub: "Other corporations bought 905.3 billion won." },
      { color: "#22d3ee", fill: "#06171c", right: "371000", title: "LG Energy Solution rose 2.91% to 371,000", sub: "One of the stronger large-cap prints." },
      { color: "#a78bfa", fill: "#120b1f", right: "1.16M", title: "SK Square closed at 1,160,000 won, up 0.43%", sub: "The fourth-largest name by value." },
      { color: "#22d3ee", fill: "#0a1c22", right: "381bn", title: "Institutions bought 381.3 billion won", sub: "Foreigners sold 136.7 billion. Individuals sold 1.72 trillion." },
    ],
    caption: "7,003.74 · Samsung 276,000 · Hynix 1,841,000 · LGES 371,000 · institutions 381bn",
  });

  add("summary-safe", "ROWS", "GOLD", {
    headline: "2026.10.06 안전자산",
    rows: [
      { color: "#f7931a", fill: "#1a0f00", right: "85829", title: "비트코인은 8만 5,829달러로 0.78% 내렸습니다", sub: "고점은 8만 6,989달러입니다." },
      { color: "#facc15", fill: "#1a1600", right: "4153", title: "금은 동부 오전 9시 10분에 4,153달러입니다", sub: "10년 금리는 5.31%입니다." },
      { color: "#94a3b8", fill: "#0c1017", right: "61.70", title: "은은 61.70달러로 2.17% 올랐습니다", sub: "금보다 먼저 튀는 반등입니다." },
      { color: "#38bdf8", fill: "#061520", right: "102.5", title: "달러인덱스가 102.5를 넘겼습니다", sub: "유로화는 1.116입니다." },
      { color: "#ef4444", fill: "#1a0a0a", right: "5.31%", title: "미국 10년 금리는 5.31%로 24년 만에 가장 높습니다", sub: "서비스업 물가지수는 74.0입니다." },
    ],
    caption: "비트코인 85,829 · 금 4,153 · 은 61.70 · DXY 102.5 · 10년 5.31%",
  }, {
    headline: "2026.10.06 Safe assets",
    rows: [
      { color: "#f7931a", fill: "#1a0f00", right: "85829", title: "Bitcoin closed at $85,829, down 0.78%", sub: "The high was $86,989." },
      { color: "#facc15", fill: "#1a1600", right: "4153", title: "Gold was $4,153 at 9:10 a.m. Eastern", sub: "The 10-year yield is 5.31%." },
      { color: "#94a3b8", fill: "#0c1017", right: "61.70", title: "Silver rose 2.17% to $61.70", sub: "The bounce led gold." },
      { color: "#38bdf8", fill: "#061520", right: "102.5", title: "The dollar index moved above 102.5", sub: "The euro is at 1.116." },
      { color: "#ef4444", fill: "#1a0a0a", right: "5.31%", title: "The U.S. 10-year is 5.31%, a 24-year high", sub: "ISM services prices are 74.0." },
    ],
    caption: "Bitcoin $85,829 · gold $4,153 · silver $61.70 · DXY 102.5 · 10-year 5.31%",
  });

  add("summary-krre", "ROWS", "POLICY", {
    headline: "2026.10.06 부동산",
    rows: [
      { color: "#fb923c", fill: "#1a0d02", right: "86주", title: "서울 아파트 전셋값이 86주 연속 올랐습니다", sub: "매물은 2만 497건으로 13.8% 줄었습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "79%", title: "세제개편 이후 서울 매매의 약 79%가 15억 원 이하입니다", sub: "6억 원 이하는 25%입니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "119만", title: "정부는 2030년까지 공적주택 119만 호를 공급하겠다고 했습니다", sub: "가까운 입주 가능 물량은 약 15만 호입니다." },
    ],
    caption: "전세 86주 · 매물 2만 497 · 15억 이하 79% · 공적주택 119만 호",
  }, {
    headline: "2026.10.06 Housing",
    rows: [
      { color: "#fb923c", fill: "#1a0d02", right: "86w", title: "Seoul apartment jeonse rose for an 86th week", sub: "Listings are 20,497, down 13.8%." },
      { color: "#60a5fa", fill: "#06121f", right: "79%", title: "About 79% of Seoul sales since the tax plan are under 1.5 billion won", sub: "Homes under 600 million won are 25%." },
      { color: "#a78bfa", fill: "#120b1f", right: "1.19M", title: "The government pledged 1.19 million public homes by 2030", sub: "About 150,000 can move in soon." },
    ],
    caption: "86-week jeonse · 20,497 listings · 79% under 1.5bn · 1.19M public homes",
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
    badge: "삼성", title: "삼성전자는 27만 6,000원 보합입니다",
    heroIcon: "📊", heroBig: "276,000", heroSub: "연휴 전 금요일입니다. 8일 잠정이 다음입니다.",
    cards: c3(
      { icon: "🌍", big: "1,086억", mid: "외국인", sub: "창구 순매도" },
      { icon: "🏭", big: "5,403억", mid: "기타법인", sub: "받아 준 칸" },
      { icon: "📄", big: "109.5조", mid: "영업익", sub: "3분기 눈높이" },
    ),
  }, {
    badge: "SEC", title: "Samsung closed unchanged at 276,000 won",
    heroIcon: "📊", heroBig: "276,000", heroSub: "Friday before the holiday. Prelims are on the 8th.",
    cards: c3(
      { icon: "🌍", big: "109bn", mid: "Foreign", sub: "Net sell" },
      { icon: "🏭", big: "540bn", mid: "Others", sub: "The bid" },
      { icon: "📄", big: "109.5T", mid: "OP", sub: "Street Q3" },
    ),
  });

  pair("hynix-close-kr", "L2", "HYNIX", {
    badge: "하이닉스", title: "SK하이닉스는 184만 1,000원으로 올랐습니다",
    heroIcon: "📈", heroBig: "184.1만", heroSub: "0.44% 상승. 8,000원입니다.",
    cards: [
      { label: "종가", big: "184.1만", mid: "+8,000원", sub: "0.44%" },
      { label: "외국인", big: "2,229억", mid: "순매도", sub: "가격과 부호가 갈림" },
      { label: "기타", big: "9,053억", mid: "순매수", sub: "자사주로 읽힙니다" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "미국 예탁증서는 0.06% 약세였습니다.",
      "iM증권 목표주가는 350만 원입니다.",
      "자사주는 15일 전후가 마지막 주문으로 거론됩니다.",
    ],
  }, {
    badge: "Hynix", title: "SK hynix closed at 1,841,000 won",
    heroIcon: "📈", heroBig: "1.841M", heroSub: "Up 0.44%, or 8,000 won.",
    cards: [
      { label: "Close", big: "1.841M", mid: "+8,000", sub: "0.44%" },
      { label: "Foreign", big: "223bn", mid: "Net sell", sub: "Price and flow split" },
      { label: "Others", big: "905bn", mid: "Net buy", sub: "Read as the buyback" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The ADR was down 0.06%.",
      "iM's target is 3.5 million won.",
      "Last buyback tickets are around October 15.",
    ],
  });

  pair("sksquare-close-kr", "L3", "SKSQ", {
    badge: "스퀘어", title: "SK스퀘어는 116만 원으로 마감했습니다",
    heroIcon: "🏢", heroBig: "116만", heroSub: "0.43% 상승. 시가총액 4위 지주입니다.",
    cards: c3(
      { icon: "📈", big: "+5,000", mid: "원", sub: "0.43%" },
      { icon: "📌", big: "4위", mid: "시총", sub: "지주 칸" },
      { icon: "💾", big: "닉스", mid: "지분", sub: "이 종가의 앞" },
    ),
  }, {
    badge: "Square", title: "SK Square closed at 1,160,000 won",
    heroIcon: "🏢", heroBig: "1.16M", heroSub: "Up 0.43%. Fourth by market value.",
    cards: c3(
      { icon: "📈", big: "+5,000", mid: "won", sub: "0.43%" },
      { icon: "📌", big: "4th", mid: "Cap", sub: "A holding company" },
      { icon: "💾", big: "Hynix", mid: "Stake", sub: "In front of the close" },
    ),
  });

  pair("lges-close-kr", "L4", "LGES", {
    badge: "엔솔", badgeLine: "2.91% 상승", title: "LG에너지솔루션은 37만 1,000원입니다",
    heroIcon: "🔋", heroBig: "371,000", heroSub: "1만 500원 상승. 7,000선을 되찾은 날의 배터리입니다.",
    cards: c3(
      { icon: "📈", big: "+10,500", mid: "원", sub: "2.91%" },
      { icon: "🚗", big: "현대차", mid: "-0.72%", sub: "완성차는 내렸습니다" },
      { icon: "🇪🇺", big: "유럽", mid: "수주", sub: "중기 이야기" },
    ),
  }, {
    badge: "LGES", badgeLine: "Up 2.91%", title: "LG Energy Solution closed at 371,000 won",
    heroIcon: "🔋", heroBig: "371,000", heroSub: "Up 10,500 won the day KOSPI retook 7,000.",
    cards: c3(
      { icon: "📈", big: "+10,500", mid: "won", sub: "2.91%" },
      { icon: "🚗", big: "Hyundai", mid: "-0.72%", sub: "Autos slipped" },
      { icon: "🇪🇺", big: "Europe", mid: "Orders", sub: "The medium-term story" },
    ),
  });

  pair("kospi-flow-kr", "L5", "FLOW", {
    badge: "수급", title: "기관이 3,813억 원을 샀고 외국인은 1,367억 원을 팔았습니다",
    heroIcon: "💸", heroBig: "3,813억", heroSub: "기관 순매수입니다. 개인은 1조 7,205억 원을 팔았습니다.",
    before: { label: "외국인", big: "-1,367억", sub: "금요일 하루" },
    after: { label: "기관", big: "+3,813억", sub: "금요일 하루" },
    cards: c3(
      { icon: "🧑", big: "1.72조", mid: "개인", sub: "순매도" },
      { icon: "🏭", big: "1.45조", mid: "기타법인", sub: "투톱에서 받음" },
      { icon: "📅", big: "8.32조", mid: "지난주", sub: "외국인 코스피" },
    ),
  }, {
    badge: "Flow", title: "Institutions bought 381 billion while foreigners sold 137 billion",
    heroIcon: "💸", heroBig: "381bn", heroSub: "Institutional net buy. Individuals sold 1.72 trillion.",
    before: { label: "Foreign", big: "-137bn", sub: "Friday" },
    after: { label: "Institutions", big: "+381bn", sub: "Friday" },
    cards: c3(
      { icon: "🧑", big: "1.72T", mid: "Individuals", sub: "Net sell" },
      { icon: "🏭", big: "1.45T", mid: "Others", sub: "In the two chips" },
      { icon: "📅", big: "8.32T", mid: "Last week", sub: "Foreign KOSPI" },
    ),
  });

  pair("btc-close-kr", "L1", "BTC", {
    badge: "BTC", title: "비트코인은 8만 5,829달러로 내렸습니다",
    heroIcon: "🪙", heroBig: "85,829", heroSub: "0.78% 하락. 고점은 8만 6,989달러입니다.",
    cards: c3(
      { icon: "📉", big: "-678", mid: "달러", sub: "하루" },
      { icon: "📊", big: "0.69", mid: "상관", sub: "주식 30일" },
      { icon: "📅", big: "43%", mid: "지난 분기", sub: "오른 뒤 조정" },
    ),
  }, {
    badge: "BTC", title: "Bitcoin closed at $85,829",
    heroIcon: "🪙", heroBig: "85,829", heroSub: "Down 0.78%. The high was $86,989.",
    cards: c3(
      { icon: "📉", big: "-678", mid: "USD", sub: "The day" },
      { icon: "📊", big: "0.69", mid: "Corr", sub: "Equities, 30 days" },
      { icon: "📅", big: "43%", mid: "Last quarter", sub: "Then this pause" },
    ),
  });

  pair("gold-spot-kr", "L2", "GOLD", {
    badge: "금", title: "금은 동부 오전 9시 10분에 4,153달러입니다",
    heroIcon: "🥇", heroBig: "4,153", heroSub: "10월 2일보다 65달러 낮습니다.",
    cards: [
      { label: "시각", big: "4,153", mid: "달러", sub: "09:10 ET" },
      { label: "고용", big: "2.9만", mid: "9월", sub: "약한 칸" },
      { label: "10년", big: "5.31%", mid: "금리", sub: "24년 최고" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "실업률은 4.2%입니다.",
      "10월 인상 확률은 22%에서 24%입니다.",
      "골드만삭스는 실질금리와 금을 같이 봅니다.",
    ],
  }, {
    badge: "Gold", title: "Gold was $4,153 at 9:10 a.m. Eastern",
    heroIcon: "🥇", heroBig: "4,153", heroSub: "Down $65 from October 2.",
    cards: [
      { label: "Print", big: "4,153", mid: "USD", sub: "09:10 ET" },
      { label: "Jobs", big: "29k", mid: "Sept", sub: "A soft print" },
      { label: "10-year", big: "5.31%", mid: "Yield", sub: "A 24-year high" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Unemployment held at 4.2%.",
      "October hike odds sit near 22% to 24%.",
      "Goldman looks at real yields with gold.",
    ],
  });

  pair("silver-spot-kr", "L3", "SILVER", {
    badge: "은", title: "은은 61.70달러로 2.17% 올랐습니다",
    heroIcon: "🥈", heroBig: "61.70", heroSub: "전일 60.39달러에서 올랐습니다.",
    cards: c3(
      { icon: "📈", big: "+1.31", mid: "달러", sub: "2.17%" },
      { icon: "📅", big: "+28.6%", mid: "1년", sub: "48.00달러에서" },
      { icon: "🥇", big: "금보다", mid: "먼저", sub: "튀는 반등" },
    ),
  }, {
    badge: "Silver", title: "Silver rose 2.17% to $61.70",
    heroIcon: "🥈", heroBig: "61.70", heroSub: "Up from $60.39.",
    cards: c3(
      { icon: "📈", big: "+1.31", mid: "USD", sub: "2.17%" },
      { icon: "📅", big: "+28.6%", mid: "1 year", sub: "From $48.00" },
      { icon: "🥇", big: "Ahead", mid: "of gold", sub: "The bounce led" },
    ),
  });

  pair("dxy-kr", "L4", "DXY", {
    badge: "DXY", badgeLine: "102.5 위", title: "달러인덱스가 102.5를 넘겼습니다",
    heroIcon: "💵", heroBig: "102.5", heroSub: "유로화는 1.116으로 2025년 5월 이후 가장 낮습니다.",
    cards: c3(
      { icon: "🇪🇺", big: "1.116", mid: "유로", sub: "재정 걱정" },
      { icon: "🇰🇷", big: "1,350.6", mid: "원", sub: "금요일 종가" },
      { icon: "📅", big: "의사록", mid: "수요일", sub: "다음 달력" },
    ),
  }, {
    badge: "DXY", badgeLine: "Above 102.5", title: "The dollar index moved above 102.5",
    heroIcon: "💵", heroBig: "102.5", heroSub: "The euro is 1.116, the lowest since May 2025.",
    cards: c3(
      { icon: "🇪🇺", big: "1.116", mid: "Euro", sub: "Fiscal stress" },
      { icon: "🇰🇷", big: "1,350.6", mid: "Won", sub: "Friday close" },
      { icon: "📅", big: "Minutes", mid: "Wed", sub: "The next calendar" },
    ),
  });

  pair("ust10-531-kr", "L5", "UST", {
    badge: "금리", title: "미국 10년 금리가 5.31%로 24년 만에 가장 높습니다",
    heroIcon: "📉", heroBig: "5.31%", heroSub: "2002년 4월 이후입니다. 30년은 5.66%입니다.",
    before: { label: "고용", big: "2.9만", sub: "9월 · 약한 칸" },
    after: { label: "10년", big: "5.31%", sub: "물가가 위로 밀었습니다" },
    cards: c3(
      { icon: "📊", big: "74.0", mid: "물가", sub: "서비스업 지수" },
      { icon: "📅", big: "22~24%", mid: "10월", sub: "인상 확률" },
      { icon: "📄", big: "수요일", mid: "의사록", sub: "다음 힌트" },
    ),
  }, {
    badge: "Rates", title: "The U.S. 10-year is 5.31%, a 24-year high",
    heroIcon: "📉", heroBig: "5.31%", heroSub: "Highest since April 2002. The 30-year is 5.66%.",
    before: { label: "Jobs", big: "29k", sub: "September · soft" },
    after: { label: "10-year", big: "5.31%", sub: "Prices pushed it up" },
    cards: c3(
      { icon: "📊", big: "74.0", mid: "Prices", sub: "ISM services" },
      { icon: "📅", big: "22-24%", mid: "October", sub: "Hike odds" },
      { icon: "📄", big: "Wed", mid: "Minutes", sub: "The next hint" },
    ),
  });

  pair("jeonse-86w", "L1", "JEONSE", {
    badge: "전세", title: "서울 아파트 전셋값이 86주 연속 올랐습니다",
    heroIcon: "🏠", heroBig: "86주", heroSub: "다섯 개 자치구는 올해 10%가 넘게 뛰었습니다.",
    cards: c3(
      { icon: "📦", big: "2만 497", mid: "매물", sub: "13.8% 감소" },
      { icon: "🏗️", big: "18,994", mid: "가구", sub: "하반기 입주 예정" },
      { icon: "💳", big: "6억", mid: "한도", sub: "15억 이하 주담대" },
    ),
  }, {
    badge: "Jeonse", title: "Seoul apartment jeonse rose for an 86th week",
    heroIcon: "🏠", heroBig: "86w", heroSub: "Five districts are up more than 10% this year.",
    cards: c3(
      { icon: "📦", big: "20,497", mid: "Listings", sub: "Down 13.8%" },
      { icon: "🏗️", big: "18,994", mid: "Homes", sub: "H2 move-ins" },
      { icon: "💳", big: "600m", mid: "Cap", sub: "Loans under 1.5bn" },
    ),
  });

  pair("seoul-under15", "L2", "KOSPI", {
    badge: "매매", title: "서울 아파트 매매의 약 79%가 15억 원 이하입니다",
    heroIcon: "🏘️", heroBig: "79%", heroSub: "8월 3일 세제개편 이후 계약입니다.",
    cards: [
      { label: "15억 이하", big: "79%", mid: "건수", sub: "계약 해제 제외" },
      { label: "6억 이하", big: "25%", mid: "생애최초", sub: "정책대출 칸" },
      { label: "25억 초과", big: "5.8%", mid: "고가", sub: "줄어든 비중" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "주담대 한도가 15억 이하에서 더 큽니다.",
      "강남 초고가는 급매가 늘었습니다.",
      "KB증권은 중저가 거래 비중 전망을 유지합니다.",
    ],
  }, {
    badge: "Sales", title: "About 79% of Seoul sales are 1.5 billion won or less",
    heroIcon: "🏘️", heroBig: "79%", heroSub: "Contracts after the August 3 tax plan.",
    cards: [
      { label: "≤1.5bn", big: "79%", mid: "Count", sub: "Ex-cancels" },
      { label: "≤600m", big: "25%", mid: "First-home", sub: "Policy loans" },
      { label: ">2.5bn", big: "5.8%", mid: "Prime", sub: "A smaller share" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Loan caps are larger under 1.5 billion won.",
      "Gangnam primes have more distressed listings.",
      "KB keeps a mid-price mix view.",
    ],
  });

  pair("public-housing-119", "L4", "POLICY", {
    badge: "정책", badgeLine: "119만 호", title: "2030년까지 공적주택 119만 호를 공급하겠다고 했습니다",
    heroIcon: "🏗️", heroBig: "119만", heroSub: "수도권은 92만 호, 77%입니다.",
    cards: c3(
      { icon: "📅", big: "15만", mid: "호", sub: "가까운 입주 가능" },
      { icon: "🆕", big: "6.6만", mid: "호", sub: "새로 짓는 순공급" },
      { icon: "📜", big: "+50%", mid: "인허가", sub: "전년 같은 기간" },
    ),
  }, {
    badge: "Policy", badgeLine: "1.19M", title: "1.19 million public homes by 2030",
    heroIcon: "🏗️", heroBig: "1.19M", heroSub: "920,000 of them in the capital region.",
    cards: c3(
      { icon: "📅", big: "150k", mid: "homes", sub: "Near-term move-ins" },
      { icon: "🆕", big: "66k", mid: "homes", sub: "New-build net" },
      { icon: "📜", big: "+50%", mid: "Permits", sub: "Versus last year" },
    ),
  });
};
