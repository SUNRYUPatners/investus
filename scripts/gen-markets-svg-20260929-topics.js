/* KR / Safe / KR-RE topics for 2026-09-29 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.29 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,889.74", title:"코스피가 어제 6,889.74로 2.70% 내리며 7,000선을 내줬습니다",
      sub:"시가 7,057.86입니다. 외국인 3조 6,010억 원, 기관 1조 3,332억 원을 순매도했습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"27만 원", title:"삼성전자가 어제 27만 원으로 5.43% 내렸고 오늘은 배당락일입니다",
      sub:"23일 종가는 28만 5,500원이었습니다. 기준일은 내일 30일입니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"176만8천", title:"SK하이닉스가 어제 176만 8,000원으로 5.05% 내렸습니다",
      sub:"솔리다임 미국 상장 검토 소식도 같은 날에 붙었습니다." },
    { color:"#22d3ee", fill:"#06171c", right:"−7.56%", title:"SK스퀘어가 어제 지주 할증을 토해 내며 7.56% 내렸습니다",
      sub:"반도체 묶음이 지수보다 더 빠졌습니다." },
    { color:"#4ade80", fill:"#061209", right:"+3.56%", title:"LG에너지솔루션이 어제 3.56% 오르며 반도체와 갈렸습니다",
      sub:"현대차는 +0.28%, 삼성바이오로직스는 +2.49%입니다." },
  ],
  caption: "더 볼 것: 6,889.74 · 삼성 27만·배당락 · 하이닉스 176만8천 · 스퀘어 −7.56% · 엔솔 +3.56%",
}, {
  headline: "2026.09.29 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,889.74", title:"KOSPI closed at 6,889.74, down 2.70%, giving back 7,000",
      sub:"Open 7,057.86. Foreigners sold ₩3.601T, institutions ₩1.333T." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩270,000", title:"Samsung Electronics closed at 270,000 won, down 5.43%, and today is the ex-date",
      sub:"Sept 23 close was 285,500. Record date is tomorrow the 30th." },
    { color:"#f59e0b", fill:"#1a1205", right:"₩1.768M", title:"SK Hynix closed at 1,768,000 won, down 5.05%",
      sub:"A Solidigm U.S. listing review sat on the same tape." },
    { color:"#22d3ee", fill:"#06171c", right:"−7.56%", title:"SK Square gave back its holding premium, down 7.56%",
      sub:"The chip bundle fell harder than the index." },
    { color:"#4ade80", fill:"#061209", right:"+3.56%", title:"LG Energy Solution rose 3.56%, splitting from chips",
      sub:"Hyundai +0.28%, Samsung Biologics +2.49%." },
  ],
  caption: "Watch: 6,889.74 · Samsung 270k ex-date · Hynix 1.768M · Square −7.56% · LGES +3.56%",
});

add("kospi-6889", "L1", "KOSPI", {
  badge: "코스피", title: "코스피가 어제 6,889.74로 2.70% 내리며 7,000선을 내줬습니다",
  heroIcon: "📉", heroBig: "6,889.74",
  heroSub: "191.18포인트 하락입니다. 시가 7,057.86(−0.33%)에서 낙폭을 키웠습니다. 코스닥은 846.58(+0.25%)입니다.",
  cards: [
    { icon:"🌍", big:"3.60조", mid:"외국인 순매도입니다", sub:"원 단위 3조 6,010억 원입니다" },
    { icon:"🏦", big:"1.33조", mid:"기관 순매도입니다", sub:"1조 3,332억 원입니다" },
    { icon:"👤", big:"3.29조", mid:"개인 순매수입니다", sub:"3조 2,866억 원입니다" },
  ],
  quote: "미국 10년 국채가 5.21~5.23%까지 올랐고 오라클 데이터센터 지연 소식이 겹쳤습니다. 원·달러는 1,365.1원입니다.",
  noteHead: "왜 중요한가", noteSub: "7,000선은 심리적 선입니다. 오늘은 삼성 배당락과 전일 급락을 같이 소화합니다. 다음에 볼 것은 시가와 외국인 방향입니다.",
  footer: "코스피 · 6,889.74",
}, {
  badge: "KOSPI", title: "KOSPI closed at 6,889.74, down 2.70%, giving back 7,000",
  heroIcon: "📉", heroBig: "6,889.74",
  heroSub: "Down 191.18 points. It opened at 7,057.86 (−0.33%) then widened. KOSDAQ was 846.58 (+0.25%).",
  cards: [
    { icon:"🌍", big:"₩3.60T", mid:"Foreign net selling", sub:"₩3.6010 trillion" },
    { icon:"🏦", big:"₩1.33T", mid:"Institution net selling", sub:"₩1.3332 trillion" },
    { icon:"👤", big:"₩3.29T", mid:"Retail net buying", sub:"₩3.2866 trillion" },
  ],
  quote: "U.S. 10-year yields printed 5.21–5.23%, and an Oracle data-center delay sat on the tape. The won was 1,365.1 per dollar.",
  noteHead: "Why it matters", noteSub: "7,000 is a psychological line. Today digests Samsung’s ex-date and yesterday’s drop. Next, watch the open and foreign flow.",
  footer: "KOSPI · 6,889.74",
});

add("samsung-270000", "L2", "SEC", {
  badge: "삼성전자", title: "삼성전자가 어제 27만 원으로 5.43% 내렸고 오늘은 배당락일입니다",
  heroIcon: "📱", heroBig: "27만 원",
  heroSub: "23일 종가 28만 5,500원에서 내려왔습니다. 배당락은 배당을 받을 권리가 떨어지는 날입니다. 기준일은 내일 30일입니다.",
  cards: [
    { label: "등락", big: "−5.43%", mid: "어제 종가 27만 원", sub: "우선주는 −5.91%입니다" },
    { label: "달력", big: "29일", mid: "배당락", sub: "어제까지가 마지막 매수일이었습니다" },
    { label: "배경", big: "금리", mid: "미국 장기금리 급등", sub: "실적 호재가 하루를 막지 못했습니다" },
  ],
  detailHead: "종가가 말해 주는 것",
  detailLines: [
    "반도체 묶음이 지수를 끌어내렸습니다",
    "3분기 합산 영업이익 전망은 이미 가격에 많이 들어가 있다는 설명이 붙었습니다",
    "자사주 매수는 같은 날 다른 줄입니다",
  ],
  quote: "배당락 갭과 금리 충격을 한 숫자로 더하지 않습니다. 27만 원은 어제 종가입니다.",
  noteHead: "왜 중요한가", noteSub: "메모리 실적과 주주환원은 중기 칸입니다. 오늘은 배당락 시가와 외국인 매도가 먼저입니다.",
  footer: "삼성전자 · 27만 원",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics closed at 270,000 won, down 5.43%, and today is the ex-date",
  heroIcon: "📱", heroBig: "₩270,000",
  heroSub: "It fell from the Sept 23 close of 285,500. Ex-date drops the dividend right. Record date is tomorrow the 30th.",
  cards: [
    { label: "Move", big: "−5.43%", mid: "Yesterday’s close ₩270,000", sub: "Preferred −5.91%" },
    { label: "Calendar", big: "29th", mid: "Ex-date", sub: "Yesterday was the last buy" },
    { label: "Tape", big: "Yields", mid: "U.S. long rates jumped", sub: "Earnings optimism did not hold the session" },
  ],
  detailHead: "What the close says",
  detailLines: [
    "The chip bundle pulled the index down",
    "Q3 profit forecasts were described as already in the price",
    "Buybacks are a separate line the same day",
  ],
  quote: "Do not add the ex-gap and the rate shock into one number. 270,000 is yesterday’s close.",
  noteHead: "Why it matters", noteSub: "Memory profits and cash returns are the medium-term lane. Today the ex-open and foreign selling come first.",
  footer: "Samsung · ₩270,000",
});

add("hynix-1768", "L5", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 어제 176만 8,000원으로 5.05% 내렸습니다",
  heroIcon: "💾", heroBig: "176만8천",
  heroSub: "23일 종가 186만 2,000원에서 내려왔습니다. 고대역폭 메모리 수요는 중기 이야기이고, 어제는 금리와 수급이 먼저였습니다.",
  before: { label: "23일 종가", big: "186만2천", sub: "연휴 전 마지막 종가입니다" },
  after: { label: "28일 종가", big: "176만8천", sub: "하루 −5.05%입니다" },
  cards: [
    { icon: "📉", big: "−5.05%", mid: "삼성전자와 같이 빠졌습니다", sub: "반도체 묶음의 베타입니다" },
    { icon: "🇺🇸", big: "솔리다임", mid: "미국 상장 검토 소식이 붙었습니다", sub: "지분 희석 우려로 읽혔습니다" },
    { icon: "📅", big: "30일", mid: "마이크론 실적이 이번 주입니다", sub: "메모리 수요 코멘트가 다음입니다" },
  ],
  quote: "솔리다임은 미국 낸드 법인입니다. 상장 검토는 공시 확정이 아닙니다.",
  noteHead: "왜 중요한가", noteSub: "인공지능 가속기용 메모리는 몇 년의 수요입니다. 오늘은 176만 8,000원 위 시가가 확인입니다.",
  footer: "SK하이닉스 · 176만8천",
}, {
  badge: "HYNIX", title: "SK Hynix closed at 1,768,000 won, down 5.05%",
  heroIcon: "💾", heroBig: "₩1.768M",
  heroSub: "It fell from the Sept 23 close of 1,862,000. HBM demand is the medium-term story. Yesterday rates and flow came first.",
  before: { label: "Sept 23 close", big: "₩1.862M", sub: "Last close before the holiday" },
  after: { label: "Sept 28 close", big: "₩1.768M", sub: "One-day −5.05%" },
  cards: [
    { icon: "📉", big: "−5.05%", mid: "It fell with Samsung", sub: "Chip-bundle beta" },
    { icon: "🇺🇸", big: "Solidigm", mid: "A U.S. listing review hit the tape", sub: "Read as dilution risk" },
    { icon: "📅", big: "30th", mid: "Micron reports this week", sub: "Memory-demand comments are next" },
  ],
  quote: "Solidigm is the U.S. NAND unit. A listing review is not a filed deal.",
  noteHead: "Why it matters", noteSub: "Accelerator memory is multi-year demand. Today the open versus 1,768,000 is the check.",
  footer: "SK Hynix · ₩1.768M",
});

add("sk-square-756", "L3", "HYNIX", {
  badge: "SK스퀘어", title: "SK스퀘어가 어제 지주 할증을 토해 내며 7.56% 내렸습니다",
  heroIcon: "🏢", heroBig: "−7.56%",
  heroSub: "하이닉스를 품은 지주입니다. 연휴 전 +5.03%가 하루 만에 반대로 갔습니다.",
  cards: [
    { icon: "📉", big: "지주", mid: "본업보다 더 빠졌습니다", sub: "할증이 하루 만에 걷혔습니다" },
    { icon: "💾", big: "닉스", mid: "하이닉스 −5.05%와 같이 봅니다", sub: "지주 베타가 더 큽니다" },
    { icon: "💱", big: "환율", mid: "원·달러 1,365.1원", sub: "외국인 매도와 같은 날입니다" },
  ],
  quote: "지주는 자회사 가치에 할증·할인이 붙습니다. 센 날의 할증은 약한 날에 먼저 빠집니다.",
  noteHead: "왜 중요한가", noteSub: "반도체 지수는 종목과 지주가 같이 흔들립니다. 다음에 볼 것은 하이닉스 시가와 지주 괴리입니다.",
  footer: "SK스퀘어 · −7.56%",
}, {
  badge: "SK SQUARE", title: "SK Square gave back its holding premium, down 7.56%",
  heroIcon: "🏢", heroBig: "−7.56%",
  heroSub: "It holds Hynix. The pre-holiday +5.03% reversed in a day.",
  cards: [
    { icon: "📉", big: "Holdco", mid: "It fell harder than the operating company", sub: "The premium was walked back" },
    { icon: "💾", big: "Hynix", mid: "Watch it with Hynix −5.05%", sub: "Holdco beta is larger" },
    { icon: "💱", big: "FX", mid: "Won at 1,365.1 per dollar", sub: "Same day as foreign selling" },
  ],
  quote: "A holding company trades at a premium or discount to its stakes. A strong-day premium is the first to go on a weak day.",
  noteHead: "Why it matters", noteSub: "Chip indexes shake names and holdcos together. Next, watch the Hynix open and the holdco gap.",
  footer: "SK Square · −7.56%",
});

add("lges-356", "L4", "AUTO", {
  badge: "LG에너지솔루션", title: "LG에너지솔루션이 어제 3.56% 오르며 반도체와 갈렸습니다",
  badgeLine: "2차전지 · 순환",
  heroIcon: "🔋", heroBig: "+3.56%",
  heroSub: "코스피가 2.70% 내린 날 배터리는 올랐습니다. 현대차는 +0.28%, 삼성바이오로직스는 +2.49%입니다.",
  cards: [
    { icon: "🔋", big: "엔솔", mid: "시총 상위 가운데 강세입니다", sub: "반도체와 반대 방향입니다" },
    { icon: "🚗", big: "+0.28%", mid: "현대차는 보합에 가깝습니다", sub: "연휴 전 −1.94%에서 숨 고른 날입니다" },
    { icon: "💊", big: "+2.49%", mid: "삼성바이오로직스", sub: "바이오가 방어 칸이었습니다" },
  ],
  quote: "지수가 빠져도 모든 시총 상위가 같이 내리지는 않습니다. 순환이 하루 만에 갈린 날입니다.",
  noteHead: "왜 중요한가", noteSub: "배터리 수주는 중기 칸입니다. 오늘은 상대강도가 먼저입니다. 다음에 볼 것은 오늘 시가가 강세를 잇는지입니다.",
  footer: "LG에너지솔루션 · +3.56%",
}, {
  badge: "LGES", title: "LG Energy Solution rose 3.56%, splitting from chips",
  badgeLine: "Battery · rotation",
  heroIcon: "🔋", heroBig: "+3.56%",
  heroSub: "Batteries rose on a 2.70% KOSPI down day. Hyundai +0.28%, Samsung Biologics +2.49%.",
  cards: [
    { icon: "🔋", big: "LGES", mid: "A large-cap gainer on the day", sub: "Opposite the chip tape" },
    { icon: "🚗", big: "+0.28%", mid: "Hyundai was nearly flat", sub: "A pause after −1.94% before the holiday" },
    { icon: "💊", big: "+2.49%", mid: "Samsung Biologics", sub: "Biotech was a defensive lane" },
  ],
  quote: "Not every mega-cap falls when the index does. Rotation split in a single session.",
  noteHead: "Why it matters", noteSub: "Battery orders are the medium-term lane. Today relative strength comes first. Next, watch whether the open keeps the bid.",
  footer: "LGES · +3.56%",
});

add("summary-safe", "ROWS", "GOLD", {
  headline: "2026.09.29 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$83,015", title:"비트코인이 자정께 8만 3,015달러로 1.78% 내렸습니다",
      sub:"업비트는 약 1억 1,298만 원, 김치 프리미엄은 −0.02%입니다." },
    { color:"#facc15", fill:"#1a1600", right:"$4,146", title:"금 현물이 온스당 약 4,145.88달러로 3.27% 내렸습니다",
      sub:"선물은 4,176.80달러, −3.34%입니다. 미국 금리가 무이자 자산을 눌렀습니다." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,667", title:"이더리움이 약 2,667.49달러로 0.59% 내렸습니다",
      sub:"비트보다 낙폭이 작았습니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"$61.11", title:"은 현물이 온스당 약 61.11달러로 4.92% 내렸습니다",
      sub:"선물은 61.52달러, −5.1%입니다. 금보다 더 많이 빠졌습니다." },
  ],
  caption: "더 볼 것: 비트 8만 3,015 · 금 4,146 · 이더 2,667 · 은 61.11",
}, {
  headline: "2026.09.29 Safe-Asset Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$83,015", title:"Bitcoin was about $83,015 near midnight, down 1.78%",
      sub:"Upbit near ₩112.98 million. Kimchi premium −0.02%." },
    { color:"#facc15", fill:"#1a1600", right:"$4,146", title:"Spot gold fell about 3.27% to $4,145.88 an ounce",
      sub:"Futures $4,176.80, −3.34%. Higher U.S. yields pressed non-yielding metal." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,667", title:"Ether was about $2,667.49, down 0.59%",
      sub:"It fell less than bitcoin." },
    { color:"#94a3b8", fill:"#0c1017", right:"$61.11", title:"Spot silver fell about 4.92% to $61.11",
      sub:"Futures $61.52, −5.1%. It dropped more than gold." },
  ],
  caption: "Watch: BTC $83,015 · gold $4,146 · ETH $2,667 · silver $61.11",
});

add("btc-83015", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 자정께 8만 3,015달러로 1.78% 내렸습니다",
  heroIcon: "₿", heroBig: "$83,015",
  heroSub: "토큰포스트마켓 9월 29일 0시 1분 기준 83,015.02달러입니다. 원화로는 약 1억 1,257만 원입니다.",
  cards: [
    { icon: "🇰🇷", big: "1.13억", mid: "업비트 약 1억 1,298만 원", sub: "바이낸스는 약 1억 1,300만 원입니다" },
    { icon: "📉", big: "−0.02%", mid: "김치 프리미엄", sub: "국내가 해외와 거의 같습니다" },
    { icon: "📉", big: "펀딩−", mid: "무기한 선물이 마이너스로 거론됐습니다", sub: "미결제 약 65만 2천 비트입니다" },
  ],
  quote: "8만 2,800달러 부근이 주말 경고선으로 남아 있습니다. 금리가 오르면 위험자산이 같이 쉽니다.",
  noteHead: "왜 중요한가", noteSub: "현물 가격과 펀딩은 다른 줄입니다. 다음에 볼 것은 8만 2천 달러대 지지와 현물 펀드 흐름입니다.",
  footer: "비트코인 · $83,015",
}, {
  badge: "BTC", title: "Bitcoin was about $83,015 near midnight, down 1.78%",
  heroIcon: "₿", heroBig: "$83,015",
  heroSub: "$83,015.02 at 00:01 KST on Sept 29. About ₩112.57 million.",
  cards: [
    { icon: "🇰🇷", big: "₩113m", mid: "Upbit near ₩112.98 million", sub: "Binance near ₩113.00 million" },
    { icon: "📉", big: "−0.02%", mid: "Kimchi premium", sub: "Korea almost matches offshore" },
    { icon: "📉", big: "Funding−", mid: "Perps were cited as negative", sub: "Open interest near 652,000 BTC" },
  ],
  quote: "Near $82,800 remains the weekend warning line. When yields rise, risk assets rest together.",
  noteHead: "Why it matters", noteSub: "Spot and funding are different lines. Next, watch support in the $82,000s and spot-fund flow.",
  footer: "Bitcoin · $83,015",
});

add("gold-4146", "L2", "GOLD", {
  badge: "금", title: "금 현물이 온스당 약 4,145.88달러로 3.27% 내렸습니다",
  heroIcon: "🥇", heroBig: "$4,146",
  heroSub: "선물은 4,176.80달러, −3.34%입니다. 이자를 주지 않는 금속이 금리 급등에 밀린 하루입니다.",
  cards: [
    { label: "현물", big: "4,145.88", mid: "−3.27%", sub: "온스당 달러입니다" },
    { label: "선물", big: "4,176.80", mid: "−3.34%", sub: "같은 날 선물 종가입니다" },
    { label: "배경", big: "5.2%", mid: "미국 10년 금리", sub: "무이자 자산의 매력이 줄었습니다" },
  ],
  detailHead: "가격이 말해 주는 것",
  detailLines: [
    "주말 현물 약 4,285달러에서 내려왔습니다",
    "4,100달러와 4,000달러가 다음 심리적 선으로 거론됩니다",
    "달러 지수는 101 위로 거론됐습니다",
  ],
  quote: "금은 이자가 없습니다. 국채 금리가 오르면 상대적으로 덜 매력해 보입니다.",
  noteHead: "왜 중요한가", noteSub: "장기 헤지 수요는 남아 있습니다. 오늘은 4,146달러 위 반등이 확인입니다.",
  footer: "금 · $4,146",
}, {
  badge: "GOLD", title: "Spot gold fell about 3.27% to $4,145.88 an ounce",
  heroIcon: "🥇", heroBig: "$4,146",
  heroSub: "Futures $4,176.80, −3.34%. A non-yielding metal was pressed by a yield spike.",
  cards: [
    { label: "Spot", big: "4,145.88", mid: "−3.27%", sub: "Dollars per ounce" },
    { label: "Futures", big: "4,176.80", mid: "−3.34%", sub: "Same-day futures print" },
    { label: "Tape", big: "5.2%", mid: "U.S. 10-year yield", sub: "Non-yielding metal looked less attractive" },
  ],
  detailHead: "What the price says",
  detailLines: [
    "It fell from weekend spot near $4,285",
    "$4,100 and $4,000 are the next psychological lines cited",
    "The dollar index was cited above 101",
  ],
  quote: "Gold pays no interest. When Treasury yields rise, it looks relatively less attractive.",
  noteHead: "Why it matters", noteSub: "Long-horizon hedge demand remains. Today a bounce above $4,146 is the check.",
  footer: "Gold · $4,146",
});

add("eth-2667", "L3", "ETH", {
  badge: "이더리움", title: "이더리움이 약 2,667.49달러로 0.59% 내렸습니다",
  heroIcon: "⟠", heroBig: "$2,667",
  heroSub: "비트코인보다 낙폭이 작았습니다. 자정 시세입니다.",
  cards: [
    { icon: "📉", big: "−0.59%", mid: "24시간 하락", sub: "비트 −1.78%보다 얕습니다" },
    { icon: "🇰🇷", big: "361만", mid: "원화 약 361만 원", sub: "이더 김치 프리미엄은 −0.10%입니다" },
    { icon: "📊", big: "점유", mid: "이더 점유율이 조금 올랐다는 설명", sub: "비트 점유율은 줄었습니다" },
  ],
  quote: "알트 대표가 비트보다 덜 빠진 하루입니다. 2,700달러 아래가 습관이 되는지가 다음입니다.",
  noteHead: "왜 중요한가", noteSub: "스마트계약 수요는 중기 칸입니다. 오늘은 2,667달러 위 시세가 확인입니다.",
  footer: "이더리움 · $2,667",
}, {
  badge: "ETH", title: "Ether was about $2,667.49, down 0.59%",
  heroIcon: "⟠", heroBig: "$2,667",
  heroSub: "It fell less than bitcoin. Midnight print.",
  cards: [
    { icon: "📉", big: "−0.59%", mid: "24-hour change", sub: "Shallower than bitcoin −1.78%" },
    { icon: "🇰🇷", big: "₩3.61m", mid: "About ₩3.61 million", sub: "ETH kimchi premium −0.10%" },
    { icon: "📊", big: "Share", mid: "Ether dominance was said to tick up", sub: "Bitcoin dominance shrank" },
  ],
  quote: "The lead alt fell less than bitcoin. Next is whether sub-$2,700 becomes a habit.",
  noteHead: "Why it matters", noteSub: "Smart-contract demand is the medium-term lane. Today a print above $2,667 is the check.",
  footer: "Ether · $2,667",
});

add("silver-61", "L4", "SILVER", {
  badge: "은", title: "은 현물이 온스당 약 61.11달러로 4.92% 내렸습니다",
  badgeLine: "귀금속 · 금리",
  heroIcon: "⚪", heroBig: "$61.11",
  heroSub: "선물은 61.52달러, −5.1%입니다. 금보다 낙폭이 컸습니다.",
  cards: [
    { icon: "⚪", big: "61.11", mid: "현물 −4.92%", sub: "온스당 달러입니다" },
    { icon: "📉", big: "61.52", mid: "선물 −5.1%", sub: "산업 수요와 금리 민감이 겹칩니다" },
    { icon: "🥇", big: "금", mid: "금 현물 4,145.88", sub: "같은 날 귀금속이 같이 빠졌습니다" },
  ],
  quote: "은은 산업 금속이기도 해서 금리와 경기 우려에 더 민감합니다. 주말 64달러대에서 내려왔습니다.",
  noteHead: "왜 중요한가", noteSub: "태양광·전자 수요는 중기 칸입니다. 오늘은 61달러대 지지가 확인입니다.",
  footer: "은 · $61.11",
}, {
  badge: "SILVER", title: "Spot silver fell about 4.92% to $61.11",
  badgeLine: "Metals · yields",
  heroIcon: "⚪", heroBig: "$61.11",
  heroSub: "Futures $61.52, −5.1%. It dropped more than gold.",
  cards: [
    { icon: "⚪", big: "61.11", mid: "Spot −4.92%", sub: "Dollars per ounce" },
    { icon: "📉", big: "61.52", mid: "Futures −5.1%", sub: "Industrial demand plus rate sensitivity" },
    { icon: "🥇", big: "Gold", mid: "Spot gold $4,145.88", sub: "Precious metals fell together" },
  ],
  quote: "Silver is also an industrial metal, so it is more sensitive to yields and growth scares. It fell from the weekend $64s.",
  noteHead: "Why it matters", noteSub: "Solar and electronics demand is the medium-term lane. Today support in the $61s is the check.",
  footer: "Silver · $61.11",
});

add("summary-krre", "ROWS", "POLICY", {
  headline: "2026.09.29 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#180f28", right:"계양 A6", title:"인천 계양 A6블록이 내일부터 사흘 일반공급 청약을 받습니다",
      sub:"총 663가구입니다. 전용 59㎡ 약 5억 3천만 원, 84㎡ 약 7억 1천만 원입니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"60%", title:"3기 신도시 사전청약 지구 60%가 본청약을 한 달 이상 미뤘습니다",
      sub:"35곳 중 21곳입니다. 분양가가 추정가보다 오른 사례가 있습니다." },
    { color:"#38bdf8", fill:"#061520", right:"9/30", title:"집코노미 박람회가 내일 코엑스에서 열리고 안심신탁 상담이 붙습니다",
      sub:"3기 교통망·앵커기업과 도심복합 사례를 한 전시장에 모읍니다." },
  ],
  caption: "더 볼 것: 계양 A6 · 본청약 지연 60% · 집코노미 30일",
}, {
  headline: "2026.09.29 Korea Housing Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#180f28", right:"Gyeyang A6", title:"Incheon Gyeyang A6 opens a three-day general sale from tomorrow",
      sub:"663 homes. About ₩530 million for 59㎡, ₩710 million for 84㎡." },
    { color:"#fb923c", fill:"#1a0d02", right:"60%", title:"Sixty percent of 3rd-new-town pre-sale districts delayed the main sale by a month or more",
      sub:"21 of 35. Some final prices beat the estimate." },
    { color:"#38bdf8", fill:"#061520", right:"Sep 30", title:"The Jipconomy expo opens tomorrow at COEX with trust-lease counseling",
      sub:"Transit, anchor employers and urban-complex cases share one hall." },
  ],
  caption: "Watch: Gyeyang A6 · 60% delay · expo on the 30th",
});

add("gyeyang-a6", "L1", "POLICY", {
  badge: "공급정책", title: "인천 계양 A6블록이 내일부터 사흘 일반공급 청약을 받습니다",
  heroIcon: "🏗️", heroBig: "663가구",
  heroSub: "9월 30일부터 10월 2일까지입니다. 2023년 9월 사전청약을 했던 단지입니다. 입주는 2029년 6월입니다.",
  cards: [
    { icon: "💰", big: "5.3억", mid: "전용 59㎡ 평균", sub: "84㎡는 약 7억 1천만 원입니다" },
    { icon: "📜", big: "3년", mid: "전매제한", sub: "실거주 의무는 없습니다" },
    { icon: "📅", big: "12월", mid: "계약", sub: "당첨 발표는 10월입니다" },
  ],
  quote: "추석이 끝나자마자 본청약이 열립니다. 부천 대장 A-2는 10월, 왕숙 A-17은 연말로 대기합니다.",
  noteHead: "왜 중요한가", noteSub: "사전청약이 본청약으로 바뀌는 달력입니다. 다음에 볼 것은 경쟁률과 계약률입니다.",
  footer: "3기 신도시 · 계양 A6",
}, {
  badge: "SUPPLY", title: "Incheon Gyeyang A6 opens a three-day general sale from tomorrow",
  heroIcon: "🏗️", heroBig: "663",
  heroSub: "Sept 30 to Oct 2. It ran a pre-sale in September 2023. Move-in is June 2029.",
  cards: [
    { icon: "💰", big: "₩530m", mid: "Average 59㎡", sub: "84㎡ about ₩710 million" },
    { icon: "📜", big: "3 yrs", mid: "Resale limit", sub: "No occupancy duty" },
    { icon: "📅", big: "Dec", mid: "Contracts", sub: "Winners in October" },
  ],
  quote: "The main sale opens as soon as Chuseok ends. Bucheon Daejang A-2 waits in October, Wangsuk A-17 at year-end.",
  noteHead: "Why it matters", noteSub: "This is the calendar where a pre-sale becomes a main sale. Next, watch the competition ratio and contract rate.",
  footer: "3rd new town · Gyeyang A6",
});

add("pretown-delay-60", "L2", "JEONSE", {
  badge: "공급정책", title: "3기 신도시 사전청약 지구 60%가 본청약을 한 달 이상 미뤘습니다",
  heroIcon: "⏳", heroBig: "60%",
  heroSub: "국토부 국회 자료는 35곳 중 21곳입니다. 아직 본청약 시기가 안 온 6곳도 미뤄질 여지가 있습니다.",
  cards: [
    { label: "원인", big: "보상", mid: "이주·철거가 막힙니다", sub: "착공이 밀리면 본청약도 밀립니다" },
    { label: "가격", big: "+30%", mid: "왕숙2 A-3 전용 84A", sub: "확정 7억 3,245만 원, 추정 대비 1억 6,915만 원 올랐습니다" },
    { label: "포기", big: "창릉", mid: "S1 본청약 포기 150명", sub: "사전청약 당첨 362명 기준입니다" },
  ],
  detailHead: "자료가 말해 주는 것",
  detailLines: [
    "기본형건축비가 ㎡당 232만 8,000원으로 올랐습니다",
    "7월보다 4.07% 높은 단가입니다",
    "공급 속도 정책과 현장 지연이 같은 주에 겹칩니다",
  ],
  quote: "달력을 앞당기겠다는 정책과, 본청약이 늦는 현장이 한 화면에 있습니다.",
  noteHead: "왜 중요한가", noteSub: "입주가 늦으면 전세 수요가 더 오래 남습니다. 다음에 볼 것은 단지별 새 공고일입니다.",
  footer: "3기 신도시 · 지연 60%",
}, {
  badge: "SUPPLY", title: "Sixty percent of 3rd-new-town pre-sale districts delayed the main sale by a month or more",
  heroIcon: "⏳", heroBig: "60%",
  heroSub: "Ministry data to the National Assembly: 21 of 35. Six more that have not yet reached a main sale could slip too.",
  cards: [
    { label: "Cause", big: "Land", mid: "Relocation and demolition stall", sub: "A late start delays the main sale" },
    { label: "Price", big: "+30%", mid: "Wangsuk 2 A-3 84A", sub: "Final ₩732.45 million, ₩169.15 million above the estimate" },
    { label: "Walk", big: "Changneung", mid: "150 skipped S1 main sale", sub: "Of 362 pre-sale winners" },
  ],
  detailHead: "What the file says",
  detailLines: [
    "The standard construction cost rose to ₩2.328 million per ㎡",
    "That is 4.07% above July",
    "A speed policy and field delays sit in the same week",
  ],
  quote: "A policy to pull calendars forward sits beside sites whose main sales are late.",
  noteHead: "Why it matters", noteSub: "Late move-ins keep jeonse demand in place longer. Next, watch each complex’s new notice date.",
  footer: "3rd new town · 60% delay",
});

add("housing-expo-930", "L3", "POLICY", {
  badge: "공급정책", title: "집코노미 박람회가 내일 코엑스에서 열리고 안심신탁 상담이 붙습니다",
  heroIcon: "🏛️", heroBig: "9/30",
  heroSub: "국토부와 LH가 공동 전시합니다. 전세금을 보증공사에 맡기는 3자 계약 상담 창구가 있습니다.",
  cards: [
    { icon: "🚆", big: "GTX", mid: "광역 교통망을 한 화면에 보여 줍니다", sub: "B노선은 2030년 개통 목표입니다" },
    { icon: "🏠", big: "안심", mid: "임차인이 전세금을 HUG에 맡깁니다", sub: "집주인에게는 월세를 줍니다" },
    { icon: "🧱", big: "모듈러", mid: "13개 지구 2,707가구가 공사 중입니다", sub: "쌓아 보는 체험 공간이 있습니다" },
  ],
  quote: "정책 모델이 전시장에 모이면 실수요자가 조건을 비교하기 쉬워집니다. 청약 일정과 상담은 다른 줄입니다.",
  noteHead: "왜 중요한가", noteSub: "안심신탁이 창구에 앉으면 전세 사기 걱정이 제도로 옮겨 갑니다. 다음에 볼 것은 상담 건수와 실제 가입입니다.",
  footer: "부동산 · 집코노미",
}, {
  badge: "SUPPLY", title: "The Jipconomy expo opens tomorrow at COEX with trust-lease counseling",
  heroIcon: "🏛️", heroBig: "Sep 30",
  heroSub: "The ministry and LH share a hall. A booth explains a three-party lease that parks deposits at HUG.",
  cards: [
    { icon: "🚆", big: "GTX", mid: "Regional rail on one screen", sub: "Line B targets 2030" },
    { icon: "🏠", big: "Trust", mid: "Tenants park deposits at HUG", sub: "Landlords receive monthly rent" },
    { icon: "🧱", big: "Modular", mid: "2,707 homes across 13 districts", sub: "A hands-on stacking booth" },
  ],
  quote: "When policy models sit in one hall, buyers can compare terms. Sale dates and counseling are different lines.",
  noteHead: "Why it matters", noteSub: "A trust booth moves jeonse-fraud worry into an institution. Next, watch booth traffic and actual sign-ups.",
  footer: "Housing · Jipconomy",
});

};
