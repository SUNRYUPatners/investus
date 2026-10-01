const { KR, SAFE, KR_RE } = require("./data-20261002-markets");
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
  const F = "2026.10.02";

  add("summary-kr", "ROWS", "KOSPI", {
    headline: "2026.10.02 한국 마감",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "6971", title: "코스피는 1.95% 오른 6,971.35로 마감했습니다", sub: "장중 6,760선까지 밀렸다가 오후에 되돌렸습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "276000", title: "삼성전자는 2.79% 오른 27만 6,000원입니다", sub: "우선주는 20만 4,500원으로 4.76% 올랐습니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "183.3만", title: "SK하이닉스는 3.21% 오른 183만 3,000원입니다", sub: "장중 174만 9,000원까지 밀렸다가 올랐습니다." },
      { color: "#22d3ee", fill: "#06171c", right: "4171억", title: "기관은 4,171억 원을 순매수했습니다", sub: "외국인 3,366억 매도, 개인 1조 7,115억 매도입니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "142.9만", title: "삼성바이오로직스는 2.73% 오른 142만 9,000원입니다", sub: "유상증자 신주 발행가액 안내가 나온 날입니다." },
      { color: "#fb7185", fill: "#1a0a10", right: "349000", title: "현대차는 1.16% 오른 34만 9,000원입니다", sub: "원·달러는 5.6원 오른 1,358.4원입니다." },
    ],
    caption: "6,971.35 · 삼성 27만 6,000 · 하이닉스 183만 3,000 · 기관 4,171억 · 코스닥 894.29",
  }, {
    headline: "2026.10.02 Korea close",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "6971", title: "KOSPI closed at 6,971.35, up 1.95%", sub: "It dipped toward 6,760 before the afternoon rebound." },
      { color: "#60a5fa", fill: "#06121f", right: "276000", title: "Samsung Electronics closed at 276,000 won, up 2.79%", sub: "Preferred shares rose 4.76% to 204,500." },
      { color: "#f59e0b", fill: "#1a1205", right: "1.833M", title: "SK hynix closed at 1,833,000 won, up 3.21%", sub: "The session low was 1,749,000." },
      { color: "#22d3ee", fill: "#06171c", right: "417bn", title: "Institutions bought 417.1 billion won", sub: "Foreigners sold 336.6 billion. Individuals sold 1.71 trillion." },
      { color: "#a78bfa", fill: "#120b1f", right: "1.429M", title: "Samsung Biologics closed at 1,429,000 won, up 2.73%", sub: "The rights-issue price was disclosed." },
      { color: "#fb7185", fill: "#1a0a10", right: "349000", title: "Hyundai Motor closed at 349,000 won, up 1.16%", sub: "The won closed at 1,358.4 per dollar." },
    ],
    caption: "6,971.35 · Samsung 276,000 · Hynix 1,833,000 · institutions 417bn · Kosdaq 894.29",
  });

  add("summary-safe", "ROWS", "GOLD", {
    headline: "2026.10.02 안전자산",
    rows: [
      { color: "#facc15", fill: "#1a1600", right: "4157", title: "COMEX 금은 4,157.41달러로 0.60% 내렸습니다", sub: "유럽 세션 4,182달러와 시각이 다릅니다." },
      { color: "#f7931a", fill: "#1a0f00", right: "84779", title: "비트코인은 8만 4,778.89달러로 1.46% 올랐습니다", sub: "고점은 8만 5,247.51달러입니다." },
      { color: "#818cf8", fill: "#0f1024", right: "2688", title: "이더리움은 동부 오전 9시 30분에 2,688.17달러입니다", sub: "같은 시각 비트코인은 8만 3,448달러입니다." },
      { color: "#38bdf8", fill: "#061520", right: "101.60", title: "달러인덱스는 오후 3시 22분에 101.60입니다", sub: "원·달러는 1,358.4원입니다." },
      { color: "#f97316", fill: "#1a0d02", right: "91.80", title: "WTI는 유럽 세션 기준 91.80달러입니다", sub: "COMEX 표의 90.42달러와 시각이 다릅니다." },
    ],
    caption: "금 4,157.41 · 비트코인 84,778 · 이더 2,688 · DXY 101.60 · WTI 91.80",
  }, {
    headline: "2026.10.02 Safe assets",
    rows: [
      { color: "#facc15", fill: "#1a1600", right: "4157", title: "COMEX gold was $4,157.41, down 0.60%", sub: "Do not blend it with the $4,182 European bounce." },
      { color: "#f7931a", fill: "#1a0f00", right: "84779", title: "Bitcoin closed at $84,778.89, up 1.46%", sub: "The high was $85,247.51." },
      { color: "#818cf8", fill: "#0f1024", right: "2688", title: "Ethereum was $2,688.17 at 9:30 a.m. Eastern", sub: "Bitcoin was $83,448 at that same snapshot." },
      { color: "#38bdf8", fill: "#061520", right: "101.60", title: "The dollar index was 101.60 at 3:22 p.m.", sub: "The won closed at 1,358.4." },
      { color: "#f97316", fill: "#1a0d02", right: "91.80", title: "WTI was $91.80 in the European session", sub: "A COMEX row still showed $90.42." },
    ],
    caption: "Gold $4,157.41 · bitcoin $84,778 · ether $2,688 · DXY 101.60 · WTI $91.80",
  });

  add("summary-krre", "ROWS", "POLICY", {
    headline: "2026.10.02 청약",
    rows: [
      { color: "#60a5fa", fill: "#06121f", right: "426", title: "광명 에듀하임 2순위 접수는 오늘입니다", sub: "426세대. 일반 190, 특별 236. 발표는 10월 12일." },
      { color: "#34d399", fill: "#052015", right: "17시", title: "계양 A6 일반공급 창이 오늘 오후 5시에 닫힙니다", sub: "공급 규모 663세대. 발표는 10월 21일." },
      { color: "#fb923c", fill: "#1a0d02", right: "3년", title: "광명 에듀하임은 당첨일부터 전매가 3년입니다", sub: "투기과열지구 민영입니다. 상한제는 적용되지 않습니다." },
    ],
    caption: "광명 426 · 2순위 오늘 · 계양 17시 마감 · 전매 3년 · 발표 10월 12일·21일",
  }, {
    headline: "2026.10.02 Subscriptions",
    rows: [
      { color: "#60a5fa", fill: "#06121f", right: "426", title: "Gwangmyeong Eduheim takes second-round applications today", sub: "426 homes. General 190, special 236. Winners October 12." },
      { color: "#34d399", fill: "#052015", right: "5 p.m.", title: "Gyeyang A6's general window closes at 5 p.m.", sub: "663-home supply. Winners October 21." },
      { color: "#fb923c", fill: "#1a0d02", right: "3 yrs", title: "Eduheim has a three-year resale ban from the winner day", sub: "A hot-zone private sale. Price caps do not apply." },
    ],
    caption: "Gwangmyeong 426 · second round today · Gyeyang 5 p.m. · 3-year resale ban",
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

  pair("samsung-close-kr", "L1", "KOSPI", {
    badge: "삼성", title: "삼성전자는 27만 6,000원으로 마감했습니다",
    heroIcon: "📈", heroBig: "276,000", heroSub: "2.79% 상승. 우선주는 4.76% 올랐습니다.",
    cards: c3(
      { icon: "💰", big: "+7,500", mid: "원", sub: "보통주 하루" },
      { icon: "📄", big: "204,500", mid: "우선주", sub: "4.76% 상승" },
      { icon: "🌍", big: "2,027억", mid: "외국인", sub: "창구 순매도" },
    ),
  }, {
    badge: "SEC", title: "Samsung closed at 276,000 won",
    heroIcon: "📈", heroBig: "276,000", heroSub: "Up 2.79%. Preferred shares rose 4.76%.",
    cards: c3(
      { icon: "💰", big: "+7,500", mid: "won", sub: "Common stock" },
      { icon: "📄", big: "204,500", mid: "Preferred", sub: "Up 4.76%" },
      { icon: "🌍", big: "203bn", mid: "Foreign", sub: "Net sell of the name" },
    ),
  });

  pair("hynix-close-kr", "L2", "HYNIX", {
    badge: "하이닉스", title: "SK하이닉스는 183만 3,000원으로 올랐습니다",
    heroIcon: "📈", heroBig: "183.3만", heroSub: "3.21% 상승. 장중 174만 9,000원까지 밀렸습니다.",
    cards: [
      { label: "종가", big: "183.3만", mid: "+5만 7,000원", sub: "3.21%" },
      { label: "저점", big: "174.9만", mid: "장중", sub: "V자로 되돌림" },
      { label: "외국인", big: "2,145억", mid: "순매도", sub: "가격과 부호가 갈림" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "종가는 올랐고 외국인 창구는 매도입니다.",
      "iM증권 목표주가는 350만 원입니다.",
      "자사주는 15일 전후가 마지막 주문으로 거론됩니다.",
    ],
  }, {
    badge: "Hynix", title: "SK hynix closed at 1,833,000 won",
    heroIcon: "📈", heroBig: "1.833M", heroSub: "Up 3.21% after a low of 1,749,000.",
    cards: [
      { label: "Close", big: "1.833M", mid: "+57,000", sub: "3.21%" },
      { label: "Low", big: "1.749M", mid: "Intraday", sub: "Then a V rebound" },
      { label: "Foreign", big: "215bn", mid: "Net sell", sub: "Price and flow split" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The close rose. The foreign desk sold.",
      "iM's target is 3.5 million won.",
      "The buyback's last tickets are around October 15.",
    ],
  });

  pair("bio-close-kr", "L3", "AI", {
    badge: "삼바", title: "삼성바이오로직스는 142만 9,000원입니다",
    heroIcon: "🧬", heroBig: "142.9만", heroSub: "2.73% 상승. 신주 발행가액 안내가 나온 날입니다.",
    cards: c3(
      { icon: "📄", big: "공시", mid: "발행가액", sub: "유증 안내" },
      { icon: "📈", big: "+3.8만", mid: "원", sub: "2.73%" },
      { icon: "🏭", big: "2027", mid: "5공장", sub: "하우스 전망의 자리" },
    ),
  }, {
    badge: "Bio", title: "Samsung Biologics closed at 1,429,000 won",
    heroIcon: "🧬", heroBig: "1.429M", heroSub: "Up 2.73% on the rights-issue price notice.",
    cards: c3(
      { icon: "📄", big: "Filing", mid: "Issue price", sub: "Rights issue" },
      { icon: "📈", big: "+38,000", mid: "won", sub: "2.73%" },
      { icon: "🏭", big: "2027", mid: "Plant 5", sub: "The house timeline" },
    ),
  });

  pair("hyundai-close-kr", "L4", "AUTO", {
    badge: "현대차", badgeLine: "1.16% 상승", title: "현대차는 34만 9,000원으로 마감했습니다",
    heroIcon: "🚗", heroBig: "349,000", heroSub: "4,000원 상승. 환율은 1,358.4원입니다.",
    cards: c3(
      { icon: "📈", big: "+4,000", mid: "원", sub: "1.16%" },
      { icon: "💱", big: "1358.4", mid: "원/달러", sub: "5.6원 상승" },
      { icon: "🎯", big: "50만", mid: "삼성증권", sub: "매수 유지" },
    ),
  }, {
    badge: "Hyundai", badgeLine: "Up 1.16%", title: "Hyundai Motor closed at 349,000 won",
    heroIcon: "🚗", heroBig: "349,000", heroSub: "Up 4,000 won. The won closed at 1,358.4.",
    cards: c3(
      { icon: "📈", big: "+4,000", mid: "won", sub: "1.16%" },
      { icon: "💱", big: "1358.4", mid: "USD/KRW", sub: "Dollar up 5.6 won" },
      { icon: "🎯", big: "500k", mid: "Samsung Sec", sub: "Buy kept" },
    ),
  });

  pair("kospi-flow-kr", "L5", "FLOW", {
    badge: "수급", title: "기관이 4,171억 원을 샀고 외국인은 3,366억 원을 팔았습니다",
    heroIcon: "💸", heroBig: "4,171억", heroSub: "기관 순매수입니다. 개인은 1조 7,115억 원을 팔았습니다.",
    before: { label: "외국인", big: "-3,366억", sub: "5거래일째, 강도는 축소" },
    after: { label: "기관", big: "+4,171억", sub: "어제 하루" },
    cards: c3(
      { icon: "🧑", big: "1.71조", mid: "개인", sub: "순매도" },
      { icon: "🏭", big: "1.62조", mid: "기타법인", sub: "전기·전자 순매수" },
      { icon: "📅", big: "5일", mid: "외국인", sub: "연속 매도, 강도 축소" },
    ),
  }, {
    badge: "Flow", title: "Institutions bought 417 billion while foreigners sold 337 billion",
    heroIcon: "💸", heroBig: "417bn", heroSub: "Institutional net buy. Individuals sold 1.71 trillion.",
    before: { label: "Foreign", big: "-337bn", sub: "Fifth session, lighter clip" },
    after: { label: "Institutions", big: "+417bn", sub: "Yesterday" },
    cards: c3(
      { icon: "🧑", big: "1.71T", mid: "Individuals", sub: "Net sell" },
      { icon: "🏭", big: "1.62T", mid: "Others", sub: "Electronics net buy" },
      { icon: "📅", big: "5 days", mid: "Foreign", sub: "Still selling, lighter" },
    ),
  });

  pair("gold-comex-kr", "L1", "GOLD", {
    badge: "금", title: "COMEX 금은 4,157.41달러입니다",
    heroIcon: "🥇", heroBig: "4,157", heroSub: "0.60% 하락. 전일 종가 4,182.31달러입니다.",
    cards: c3(
      { icon: "📉", big: "-24.9", mid: "달러", sub: "어제 COMEX" },
      { icon: "🌅", big: "4,182", mid: "유럽", sub: "다른 시각 반등" },
      { icon: "📊", big: "3.4%", mid: "PCE", sub: "전년, 예상 3.7%" },
    ),
  }, {
    badge: "Gold", title: "COMEX gold was $4,157.41",
    heroIcon: "🥇", heroBig: "$4,157", heroSub: "Down 0.60% from $4,182.31.",
    cards: c3(
      { icon: "📉", big: "-$24.9", mid: "day", sub: "COMEX close" },
      { icon: "🌅", big: "$4,182", mid: "Europe", sub: "A different time" },
      { icon: "📊", big: "3.4%", mid: "PCE", sub: "vs 3.7% expected" },
    ),
  });

  pair("btc-close-kr", "L2", "BTC", {
    badge: "BTC", title: "비트코인은 8만 4,778달러로 올랐습니다",
    heroIcon: "₿", heroBig: "84,779", heroSub: "1.46% 상승. 고점은 8만 5,247달러입니다.",
    cards: [
      { label: "종가", big: "84,779", mid: "+1.46%", sub: "전일 83,561" },
      { label: "고점", big: "85,247", mid: "달러", sub: "종가로 부르지 않음" },
      { label: "ETF", big: "1.48억$", mid: "유출", sub: "가격과 부호가 갈림" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "시가는 8만 3,556.70달러입니다.",
      "저점은 8만 3,139.33달러입니다.",
      "펀드 유출과 가격 상승을 한 신호로 부르지 않습니다.",
    ],
  }, {
    badge: "BTC", title: "Bitcoin closed at $84,779",
    heroIcon: "₿", heroBig: "84,779", heroSub: "Up 1.46%. The high was $85,247.",
    cards: [
      { label: "Close", big: "84,779", mid: "+1.46%", sub: "Prior 83,561" },
      { label: "High", big: "85,247", mid: "dollars", sub: "Not the close" },
      { label: "ETFs", big: "$148m", mid: "outflow", sub: "Price and flow split" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The open was $83,556.70.",
      "The low was $83,139.33.",
      "Do not read the outflow as the close.",
    ],
  });

  pair("eth-am-kr", "L3", "ETH", {
    badge: "ETH", title: "이더리움은 2,688.17달러입니다",
    heroIcon: "💎", heroBig: "2,688", heroSub: "동부 오전 9시 30분입니다. 종가가 아닙니다.",
    cards: c3(
      { icon: "🕐", big: "09:30", mid: "동부", sub: "아침 스냅샷" },
      { icon: "₿", big: "83,448", mid: "같은 시각 비트", sub: "종가 84,779과 다름" },
      { icon: "📋", big: "종가없음", mid: "이 표", sub: "고점도 비어 있습니다" },
    ),
  }, {
    badge: "ETH", title: "Ethereum was $2,688.17",
    heroIcon: "💎", heroBig: "$2,688", heroSub: "9:30 a.m. Eastern. Not a close.",
    cards: c3(
      { icon: "🕐", big: "09:30", mid: "ET", sub: "Morning snapshot" },
      { icon: "₿", big: "83,448", mid: "BTC then", sub: "Close was 84,779" },
      { icon: "📋", big: "No close", mid: "This table", sub: "High also blank" },
    ),
  });

  pair("dxy-kr", "L4", "MACRO", {
    badge: "달러", badgeLine: "101.60", title: "달러인덱스는 오후 3시 22분에 101.60입니다",
    heroIcon: "💵", heroBig: "101.60", heroSub: "전날 101.45보다 올랐습니다. 원·달러는 1,358.4원입니다.",
    cards: c3(
      { icon: "📊", big: "101.45", mid: "전날", sub: "인덱스" },
      { icon: "🇰🇷", big: "1358.4", mid: "원/달러", sub: "+5.6원" },
      { icon: "📋", big: "내일", mid: "고용", sub: "다음 달력" },
    ),
  }, {
    badge: "DXY", badgeLine: "101.60", title: "The dollar index was 101.60 at 3:22 p.m.",
    heroIcon: "💵", heroBig: "101.60", heroSub: "Up from 101.45. The won closed at 1,358.4.",
    cards: c3(
      { icon: "📊", big: "101.45", mid: "Prior", sub: "Index" },
      { icon: "🇰🇷", big: "1358.4", mid: "USD/KRW", sub: "+5.6 won" },
      { icon: "📋", big: "Tomorrow", mid: "Jobs", sub: "Next calendar" },
    ),
  });

  pair("wti-9180-kr", "L5", "OIL", {
    badge: "원유", title: "WTI는 91.80달러입니다",
    heroIcon: "🛢️", heroBig: "91.80", heroSub: "유럽 세션 1.5% 상승입니다. COMEX 90.42와 시각이 다릅니다.",
    before: { label: "COMEX", big: "90.42", sub: "같은 날 다른 표" },
    after: { label: "유럽", big: "91.80", sub: "+1.5%" },
    cards: c3(
      { icon: "🌍", big: "100$", mid: "브렌트", sub: "다시 넘보는 자리" },
      { icon: "🚢", big: "해협", mid: "프리미엄", sub: "수출이 돌아와도 남음" },
      { icon: "📋", big: "고용", mid: "내일", sub: "유가 다음 달력" },
    ),
  }, {
    badge: "Oil", title: "WTI was $91.80",
    heroIcon: "🛢️", heroBig: "91.80", heroSub: "European session, up 1.5%. COMEX still showed $90.42.",
    before: { label: "COMEX", big: "90.42", sub: "Same day, other row" },
    after: { label: "Europe", big: "91.80", sub: "+1.5%" },
    cards: c3(
      { icon: "🌍", big: "$100", mid: "Brent", sub: "Threatening again" },
      { icon: "🚢", big: "Strait", mid: "Premium", sub: "Still there as flows return" },
      { icon: "📋", big: "Jobs", mid: "Tomorrow", sub: "Next oil calendar" },
    ),
  });

  pair("gwangmyeong-2nd", "L3", "POLICY", {
    badge: "광명", title: "에듀하임 2순위 접수는 오늘입니다",
    heroIcon: "🏙️", heroBig: "426", heroSub: "일반 190, 특별 236. 발표는 10월 12일입니다.",
    cards: c3(
      { icon: "📝", big: "2순위", mid: "오늘", sub: "청약금 없음" },
      { icon: "💰", big: "8.79억", mid: "59형 최고", sub: "84형은 11.98억" },
      { icon: "📅", big: "10/12", mid: "발표", sub: "계약 24~26일" },
    ),
  }, {
    badge: "Gwangmyeong", title: "Eduheim's second round is today",
    heroIcon: "🏙️", heroBig: "426", heroSub: "General 190, special 236. Winners October 12.",
    cards: c3(
      { icon: "📝", big: "2nd", mid: "Today", sub: "No cash deposit" },
      { icon: "💰", big: "879m", mid: "59 max", sub: "84 max 1.198bn" },
      { icon: "📅", big: "Oct 12", mid: "Winners", sub: "Contracts 24-26" },
    ),
  });

  pair("gyeyang-deadline", "L4", "POLICY", {
    badge: "계양", badgeLine: "오늘 17시 마감", title: "계양 A6 일반공급 창이 오늘 오후 5시에 닫힙니다",
    heroIcon: "🏢", heroBig: "663", heroSub: "공급 규모입니다. 발표는 10월 21일입니다.",
    cards: c3(
      { icon: "🕔", big: "17시", mid: "오늘", sub: "일반 창 마감" },
      { icon: "📅", big: "10/21", mid: "발표", sub: "계약 12/15~18" },
      { icon: "🏠", big: "5.3억", mid: "59형", sub: "평균 분양가" },
    ),
  }, {
    badge: "Gyeyang", badgeLine: "Closes 5 p.m.", title: "Gyeyang A6's general window closes at 5 p.m.",
    heroIcon: "🏢", heroBig: "663", heroSub: "Project supply. Winners October 21.",
    cards: c3(
      { icon: "🕔", big: "5 p.m.", mid: "Today", sub: "General window" },
      { icon: "📅", big: "Oct 21", mid: "Winners", sub: "Contracts Dec 15-18" },
      { icon: "🏠", big: "530m", mid: "59 m²", sub: "Average price" },
    ),
  });

  pair("resale-3y", "L6", "JEONSE", {
    badge: "정책", breaking: "전매 3년", title: "광명 에듀하임은 당첨일부터 전매가 3년입니다",
    heroBig: "3년", heroSub: "투기과열지구 민영입니다. 상한제는 적용되지 않습니다.",
    grid: [
      { icon: "🔒", big: "3년", mid: "전매", sub: "당첨일부터" },
      { icon: "📍", big: "투기과열", mid: "청약과열", sub: "광명" },
      { icon: "📄", big: "등기", mid: "완료 시", sub: "3년 찬 것으로 봄" },
      { icon: "🚫", big: "10년", mid: "재당첨", sub: "제한 세대 제외" },
    ],
    ctx1: "계양도 전매 3년이되 실거주 의무는 없습니다",
    ctx2: "전매 연한과 경쟁률을 한 점수로 만들지 않습니다",
  }, {
    badge: "Policy", breaking: "3-year ban", title: "Eduheim has a three-year resale ban from the winner day",
    heroBig: "3 yrs", heroSub: "A hot-zone private sale. Price caps do not apply.",
    grid: [
      { icon: "🔒", big: "3 yrs", mid: "Resale", sub: "From winner day" },
      { icon: "📍", big: "Hot zone", mid: "Overheated", sub: "Gwangmyeong" },
      { icon: "📄", big: "Title", mid: "If registered", sub: "Counts as three years" },
      { icon: "🚫", big: "10 yrs", mid: "Re-win ban", sub: "Those households out" },
    ],
    ctx1: "Gyeyang also has a 3-year ban and no live-in duty",
    ctx2: "Do not score the ban as the competition rate",
  });
};
