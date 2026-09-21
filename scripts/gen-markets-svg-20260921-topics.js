/* KR / Safe / KR-RE topics for 2026-09-21 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.21 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,894.23", title:"코스피가 2.66% 올라 6,894.23으로 마감했습니다",
      sub:"외국인이 4,245억 원, 기관이 1조5,025억 원을 샀고 개인은 3조5,872억 원을 팔았습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"26만1,000원", title:"삼성전자가 8,500원(3.37%) 올라 26만 원선을 회복했습니다",
      sub:"외국인은 4,620억 원을 팔았고 기관은 7,075억 원을 샀습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"185만7,000원", title:"SK하이닉스가 6.42% 올라 185만7,000원에 고가 마감했습니다",
      sub:"외국인이 1조3,272억 원을 사며 유가증권 매수 1위였습니다." },
    { color:"#34d399", fill:"#052015", right:"139만9,000원", title:"삼성바이오로직스가 0.14% 오르며 반도체 밖에서 보합이었습니다",
      sub:"코스피가 2.66% 오를 때 시가총액 상위 바이오가 거의 쉬었습니다." },
    { color:"#22d3ee", fill:"#06171c", right:"−0.27%", title:"LG에너지솔루션이 0.27% 내려 36만3,500원이었습니다",
      sub:"2차전지 대형주는 관망이고 소재 일부만 올랐습니다." },
  ],
  caption: "더 볼 것: 코스피 6,894.23 · 삼성전자 26만1,000원 · 하이닉스 185만7,000원 · 바이오 +0.14% · LG엔솔 −0.27%",
}, {
  headline: "2026.09.21 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,894.23", title:"KOSPI jumped 2.66% to close at 6,894.23 on Sept 18",
      sub:"Foreigners bought ₩424.5B and institutions ₩1.50T; retail sold ₩3.59T." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩261,000", title:"Samsung Electronics rose 3.37% and reclaimed 260,000 won",
      sub:"Foreigners sold ₩462B; institutions bought ₩708B." },
    { color:"#f59e0b", fill:"#1a1205", right:"₩1,857,000", title:"SK Hynix jumped 6.42% and closed on the session high",
      sub:"Foreigners bought ₩1.33T, the cash-market top buy." },
    { color:"#34d399", fill:"#052015", right:"₩1,399,000", title:"Samsung Biologics edged 0.14%, sitting out the chip rally",
      sub:"A top-cap biopharma name barely moved while KOSPI surged." },
    { color:"#22d3ee", fill:"#06171c", right:"−0.27%", title:"LG Energy Solution slipped 0.27% to 363,500 won",
      sub:"Large battery names paused while some materials rose." },
  ],
  caption: "Watch: KOSPI 6,894.23 · Samsung 261,000 · Hynix 1,857,000 · Bio +0.14% · LGES −0.27%",
});

add("kospi-6894-surge", "L6", "KOSPI", {
  badge: "코스피", title: "코스피가 2.66% 올라 6,894.23으로 마감하며 외국인이 다시 샀습니다",
  breaking: "급등 마감 · +2.66%",
  heroBig: "6,894.23", heroSub: "9월 18일 종가 6,894.23으로 178.82포인트 올랐습니다. 외국인이 여러 거래일 매도를 끊고 다시 샀습니다.",
  grid: [
    { icon:"🌍", big:"+4,245억", mid:"외국인 순매수", sub:"매도 흐름을 끊었습니다" },
    { icon:"🏦", big:"+1.50조", mid:"기관 순매수", sub:"지수 상승의 큰 축입니다" },
    { icon:"👤", big:"−3.59조", mid:"개인 순매도", sub:"반도체를 나눠 팔았습니다" },
    { icon:"💱", big:"1,383원", mid:"원·달러", sub:"환율은 높은 구간에 머물렀습니다" },
  ],
  ctx1: "상승 종목 407개, 하락 종목 465개로 지수는 올랐지만 종목 수는 내린 쪽이 더 많았습니다.",
  ctx2: "코스닥은 4.94포인트 오른 827.12로 마감해 코스피보다 오름폭이 작았습니다.",
  quote: "전기전자가 4.46% 오르며 지수를 끌어 올렸습니다. 금융은 1.73% 내려 업종이 갈렸습니다.",
  noteHead: "왜 중요한가", noteSub: "2.66% 상승은 대형 반도체가 만든 쏠림입니다. 외국인 4,245억 원이 둘째 날에도 남는지가 지속의 확인입니다. 자사주 매입이 10월 중순께 끝날 수 있어 수급 칸이 바뀝니다.",
  footer: "코스피 · 급등",
}, {
  badge: "KOSPI", title: "KOSPI jumped 2.66% to 6,894.23 as foreigners returned to buying",
  breaking: "Surge close · +2.66%",
  heroBig: "6,894.23", heroSub: "Sept 18 close, up 178.82 points. Foreigners broke a multi-session selling streak.",
  grid: [
    { icon:"🌍", big:"+₩424.5B", mid:"Foreign buying", sub:"The outflow streak ended" },
    { icon:"🏦", big:"+₩1.50T", mid:"Institutional buying", sub:"A large leg of the rally" },
    { icon:"👤", big:"−₩3.59T", mid:"Retail selling", sub:"Shares were sold into strength" },
    { icon:"💱", big:"₩1,383", mid:"USD/KRW", sub:"The won stayed in a weak band" },
  ],
  ctx1: "Advancers 407 vs decliners 465 — the index rose on mega-cap chips.",
  ctx2: "KOSDAQ rose 4.94 points to 827.12, a smaller gain than KOSPI.",
  quote: "Electronics rose 4.46% and pulled the index. Finance fell 1.73%, splitting sectors.",
  noteHead: "Why it matters", noteSub: "A 2.66% jump was a chip-led squeeze. Whether the ₩424.5B foreign bid lasts a second day is the test. Buybacks may end by mid-October, changing the flow mix.",
  footer: "KOSPI · Surge close",
});

add("samsung-electronics-261000", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 26만1,000원으로 3.37% 오르며 26만 원선을 회복했습니다",
  heroIcon: "📱", heroBig: "26만1,000원",
  heroSub: "9월 18일 종가로 전일보다 8,500원(3.37%) 올랐습니다. 시가와 종가가 같아 고가 26만2,000원은 지키지 못했습니다.",
  cards: [
    { icon:"🌍", big:"−4,620억", mid:"외국인 순매도", sub:"여러 거래일 매도가 이어졌습니다" },
    { icon:"🏦", big:"+7,075억", mid:"기관 순매수", sub:"상승을 만든 큰 매수입니다" },
    { icon:"📈", big:"74.69%", mid:"자사주 진행", sub:"누적 10조3,078억 원입니다" },
  ],
  quote: "자사주는 예정 물량의 74.69%를 채웠고 하루 평균 약 200만 주면 남은 1,348만 주는 6~7거래일이면 끝날 수 있습니다.",
  noteHead: "왜 중요한가", noteSub: "26만 원선 회복은 투자 심리가 돌아온 숫자입니다. 외국인은 팔고 기관과 자사주가 받쳤습니다. 매입이 10월 중순께 끝나면 수급 두께가 달라집니다.",
  footer: "삼성전자 · 주가",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics rose 3.37% to 261,000 won and reclaimed 260,000",
  heroIcon: "📱", heroBig: "₩261,000",
  heroSub: "Sept 18 close, up 8,500 won (3.37%). The open and close matched; the 262,000 high did not hold.",
  cards: [
    { icon:"🌍", big:"−₩462B", mid:"Foreign selling", sub:"The multi-session sale continued" },
    { icon:"🏦", big:"+₩708B", mid:"Institutional buying", sub:"The bid that built the gain" },
    { icon:"📈", big:"74.69%", mid:"Buyback progress", sub:"₩10.31T spent so far" },
  ],
  quote: "The buyback has taken 74.69% of the planned shares. At about 2 million shares a day, the remaining 13.5 million could finish in six or seven sessions.",
  noteHead: "Why it matters", noteSub: "Reclaiming 260,000 won is a sentiment reset. Foreigners sold while institutions and the buyback held the tape. If purchases end by mid-October, the flow mix thins.",
  footer: "Samsung Electronics · Stock",
});

add("sk-hynix-1857000", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 185만7,000원으로 6.42% 오르며 외국인 매수 중심이 됐습니다",
  heroIcon: "💾", heroBig: "185만7,000원",
  heroSub: "9월 18일 종가로 전일보다 11만2,000원(6.42%) 올랐습니다. 시가 181만 원에서 출발해 종가가 당일 고가였습니다.",
  cards: [
    { label: "외국인", big: "+1조3,272억", mid: "하루 순매수", sub: "유가증권 매수 1위입니다" },
    { label: "기관", big: "+2,838억", mid: "같이 산 매수", sub: "외국인과 방향이 같았습니다" },
    { label: "자사주", big: "58.79%", mid: "누적 24.4조", sub: "남은 992만 주입니다" },
  ],
  detailHead: "수급이 말해 주는 것",
  detailLines: [
    "외국인은 삼성전자를 팔고 이 종목을 샀습니다",
    "고가 마감이라 종가가 당일 최고입니다",
    "시가총액 2위가 6%대면 지수 2.66%의 큰 축입니다",
  ],
  quote: "자사주는 예정 2,407만 주의 58.79%를 채웠고 누적 24조3,900억 원입니다. 하루 약 65만 주면 15~16거래일이면 끝날 수 있습니다.",
  noteHead: "왜 중요한가", noteSub: "한 종목 1조 원대 외국인 매수는 금요일 랠리의 중심입니다. 185만7,000원이 지지로 바뀌는지가 다음 확인입니다. 자사주가 10월 중순께 끝나면 수급 칸이 바뀝니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "HYNIX", title: "SK Hynix jumped 6.42% to 1,857,000 won as the center of foreign buying",
  heroIcon: "💾", heroBig: "₩1,857,000",
  heroSub: "Sept 18 close, up 112,000 won (6.42%). It opened at 1,810,000 and closed on the high.",
  cards: [
    { label: "Foreign", big: "+₩1.33T", mid: "One-day buying", sub:"The cash-market top buy" },
    { label: "Institutions", big: "+₩284B", mid: "Same-side bid", sub:"They bought with foreigners" },
    { label: "Buyback", big: "58.79%", mid: "₩24.4T spent", sub:"9.92 million shares left" },
  ],
  detailHead: "What the flow says",
  detailLines: [
    "Foreigners sold Samsung and bought this name",
    "A close on the high means the last print was the peak",
    "A 6% move in the No. 2 name powered the 2.66% index",
  ],
  quote: "The buyback has taken 58.79% of 24.07 million planned shares, or ₩24.39T. At about 650,000 shares a day, the rest could finish in 15–16 sessions.",
  noteHead: "Why it matters", noteSub: "A ₩1T-class foreign bid was the Friday rally’s core. Whether 1,857,000 won becomes support is the next check. If the buyback ends by mid-October, the flow mix changes.",
  footer: "SK Hynix · Stock",
});

add("samsung-bio-1399000", "L3", "BIO", {
  badge: "삼성바이오", title: "삼성바이오로직스가 139만9,000원으로 0.14% 오르며 보합에 머물렀습니다",
  heroIcon: "💊", heroBig: "139만9,000원",
  heroSub: "위탁개발생산은 바이오의약품을 대신 만들어 주는 사업입니다. 코스피가 2.66% 오를 때 이 종목은 거의 쉬었습니다.",
  cards: [
    { icon:"📊", big:"+0.14%", mid:"보합권 종가", sub:"반도체 랠리 밖의 하루입니다" },
    { icon:"🏥", big:"−2.63%", mid:"헬스케어 업종", sub:"전기전자와 방향이 갈렸습니다" },
    { icon:"🏭", big:"수주", mid:"공장 가동이 바닥", sub:"하루 수급보다 수주가 오래 갑니다" },
  ],
  quote: "시가총액 상위 바이오가 보합이면 지수 상승이 전 업종으로 퍼지지 않았다는 뜻입니다. 상승 407 대 하락 465와 같은 그림입니다.",
  noteHead: "왜 중요한가", noteSub: "돈이 반도체에 몰린 날 바이오는 소외됐습니다. 공장 가동과 신규 수주가 나오면 수급과 따로 적으면 됩니다. 반도체 랠리가 쉬는 날 상대 강도가 붙는지가 다음 확인입니다.",
  footer: "삼성바이오로직스 · 주가",
}, {
  badge: "BIOLOGICS", title: "Samsung Biologics edged 0.14% to 1,399,000 won and sat out the rally",
  heroIcon: "💊", heroBig: "₩1,399,000",
  heroSub: "Contract development and manufacturing means making biologics for other drug firms. The name barely moved while KOSPI jumped 2.66%.",
  cards: [
    { icon:"📊", big:"+0.14%", mid:"A flat close", sub:"Outside the chip-led tape" },
    { icon:"🏥", big:"−2.63%", mid:"Healthcare sector", sub:"It split from electronics" },
    { icon:"🏭", big:"Orders", mid:"Plants are the floor", sub:"Bookings matter more than one day" },
  ],
  quote: "When a top-cap biopharma name is flat, the index gain did not spread. That matches 407 advancers versus 465 decliners.",
  noteHead: "Why it matters", noteSub: "Money crowded into chips and left biologics behind. Plant utilization and new orders should be logged apart from one-day flow. Next: whether relative strength returns when chips rest.",
  footer: "Samsung Biologics · Stock",
});

add("lges-363500", "L5", "LGES", {
  badge: "LG엔솔", title: "LG에너지솔루션이 36만3,500원으로 0.27% 내리며 2차전지가 관망했습니다",
  heroIcon: "🔋", heroBig: "배터리 관망",
  heroSub: "코스피가 2.66% 오를 때 시가총액 상위 배터리 대형주는 소폭 내렸습니다. 소재 일부만 올랐습니다.",
  before: { label: "코스피", big: "+2.66%", sub: "반도체가 지수를 끌어 올렸습니다" },
  after: { label: "LG엔솔", big: "−0.27%", sub: "셀 대형주는 그 돈을 받지 못했습니다" },
  cards: [
    { icon:"📉", big:"36만3,500원", mid:"소폭 하락 종가", sub:"시가총액 상위 배터리입니다" },
    { icon:"⚙️", big:"+2.14%", mid:"에코프로비엠", sub:"소재는 셀과 온도가 달랐습니다" },
    { icon:"💱", big:"1,383원", mid:"원·달러", sub:"환율은 수출에 양날입니다" },
  ],
  quote: "에코프로비엠은 2.14% 올랐고 삼성SDI는 0.37% 올랐습니다. LFP 공급 기대가 소재에만 먼저 붙었습니다.",
  noteHead: "왜 중요한가", noteSub: "배터리 대형주가 지수와 반대로 가면 순환이 아직입니다. 세액공제 후속과 북미 공장 숫자가 나오면 수급과 따로 적으면 됩니다. 36만3,500원이 여러 날 약세면 소외가 길어집니다.",
  footer: "LG에너지솔루션 · 주가",
}, {
  badge: "LGES", title: "LG Energy Solution slipped 0.27% to 363,500 won as batteries paused",
  heroIcon: "🔋", heroBig: "Battery pause",
  heroSub: "The top-cap cell maker eased while KOSPI jumped 2.66%. Only some materials names rose.",
  before: { label: "KOSPI", big: "+2.66%", sub: "Chips pulled the index higher" },
  after: { label: "LGES", big: "−0.27%", sub: "The cell name did not get that bid" },
  cards: [
    { icon:"📉", big:"₩363,500", mid:"A modest down close", sub:"A top-cap battery name" },
    { icon:"⚙️", big:"+2.14%", mid:"EcoPro BM", sub:"Materials split from cells" },
    { icon:"💱", big:"₩1,383", mid:"USD/KRW", sub:"A weak won cuts both ways" },
  ],
  quote: "EcoPro BM rose 2.14% and Samsung SDI 0.37%. LFP supply talk warmed materials first.",
  noteHead: "Why it matters", noteSub: "When a battery large-cap fades against the index, rotation has not arrived. Log tax-credit follow-through and US plant prints apart from one-day flow. If 363,500 won stays weak, the skip lengthens.",
  footer: "LG Energy Solution · Stock",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.21 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"81,161", title:"비트코인이 8만1,161달러에서 0.21% 내리며 8만 달러를 지켰습니다",
      sub:"금요일 현물 ETF는 4억3,300만 달러 순유입이었습니다." },
    { color:"#facc15", fill:"#1a1600", right:"4,378달러", title:"금 현물이 4,370~4,380달러에서 지난주 반등 구간을 지켰습니다",
      sub:"10년 금리가 5%를 넘긴 뒤에도 밴드가 무너지지 않았습니다." },
    { color:"#818cf8", fill:"#0f1024", right:"2,632달러", title:"이더리움이 2,632달러에서 0.02% 내리며 변동이 줄었습니다",
      sub:"김치 프리미엄은 −1.55%였습니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"5%", title:"미국 10년 국채 금리가 한때 5%를 넘겼습니다",
      sub:"9월 17일 종가 근처 수치는 4.94%입니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"50–49", title:"클라리티 법 절차 투표가 막혀 올해 입법이 멀어졌습니다",
      sub:"60표가 필요해 본회의에 오르지 못했습니다." },
  ],
  caption: "더 볼 것: 비트코인 8만1,161 · 금 4,378 · 이더 2,632 · 10년물 5% · 클라리티 50대 49",
}, {
  headline: "2026.09.21 Safe-Haven Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$81,161", title:"Bitcoin eased 0.21% to $81,161 and held $80,000",
      sub:"Friday spot ETFs took in $433 million." },
    { color:"#facc15", fill:"#1a1600", right:"$4,378", title:"Spot gold held the $4,370–$4,380 bounce band",
      sub:"The band survived a 10-year print above 5%." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,632", title:"Ether barely moved at $2,632, down 0.02%",
      sub:"The kimchi premium was −1.55%." },
    { color:"#ef4444", fill:"#1a0a0a", right:"5%", title:"The US 10-year yield briefly cleared 5%",
      sub:"A nearby close on Sept 17 was 4.94%." },
    { color:"#94a3b8", fill:"#0c1017", right:"50–49", title:"CLARITY cloture failed and a 2026 law path faded",
      sub:"Sixty votes were required to reach the floor." },
  ],
  caption: "Watch: BTC $81,161 · gold $4,378 · ETH $2,632 · 10-year 5% · CLARITY 50–49",
});

add("bitcoin-81161", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 8만1,161달러에서 0.21% 내리며 8만 달러를 지켰습니다",
  heroIcon: "₿", heroBig: "81,161달러",
  heroSub: "9월 21일 오전 가격입니다. 국내 업비트는 1억1,069만 원, 김치 프리미엄은 −1.53%였습니다.",
  cards: [
    { icon:"📉", big:"−0.21%", mid:"24시간 소폭 하락", sub:"8만 달러 위에서 쉬었습니다" },
    { icon:"🏦", big:"+4.33억", mid:"금요일 ETF 유입", sub:"목요일 1.33억 달러보다 늘었습니다" },
    { icon:"🇰🇷", big:"−1.53%", mid:"김치 프리미엄", sub:"국내가 해외보다 조금 쌌습니다" },
  ],
  quote: "클라리티 법이 막힌 뒤에도 8만 달러 위를 지킨 것은 ETF 자금이 규제 헤드라인보다 두꺼웠다는 해석이 붙습니다.",
  noteHead: "왜 중요한가", noteSub: "8만 달러는 주말 이후 첫 지지선입니다. 금요일 ETF 4억3,300만 달러가 이어지는지가 선의 두께입니다. 8만2,000달러 주말 고점을 넘기는지가 다음 온도입니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BITCOIN", title: "Bitcoin held above $80,000 near $81,161, down 0.21%",
  heroIcon: "₿", heroBig: "$81,161",
  heroSub: "Monday morning print. Upbit was ₩110.69 million and the kimchi premium was −1.53%.",
  cards: [
    { icon:"📉", big:"−0.21%", mid:"A small 24-hour dip", sub:"It still sat above $80,000" },
    { icon:"🏦", big:"+$433M", mid:"Friday ETF inflow", sub:"Up from $133M on Thursday" },
    { icon:"🇰🇷", big:"−1.53%", mid:"Kimchi premium", sub:"Korea traded a bit cheap" },
  ],
  quote: "Holding $80,000 after CLARITY failed is read as ETF money outweighing the headline.",
  noteHead: "Why it matters", noteSub: "$80,000 is the first support after the weekend. Whether Friday’s $433M ETF bid continues is the thickness of that line. Next: a break of the $82,000 weekend high.",
  footer: "Bitcoin · Price",
});

add("gold-4378", "L3", "GOLD", {
  badge: "금", title: "금 현물이 4,370~4,380달러에서 지난주 반등 구간을 지켰습니다",
  heroIcon: "🥇", heroBig: "4,378달러",
  heroSub: "이자를 주지 않는 자산이라 금리가 오르면 단기 부담이 됩니다. 10년물이 5%를 넘긴 뒤에도 밴드가 남았습니다.",
  cards: [
    { icon:"📉", big:"4,370", mid:"하단 지지", sub:"지난주 반등 바닥입니다" },
    { icon:"📈", big:"4,380", mid:"상단 근처", sub:"주말 사이 큰 갭은 없었습니다" },
    { icon:"📊", big:"5%", mid:"10년 금리", sub:"할인율이 다시 올라갔습니다" },
  ],
  quote: "달러와 유가가 쉬면 금 매수가 붙고, 금리가 5% 위에 머물면 반등 폭은 줄어듭니다. 월요일은 그 중간입니다.",
  noteHead: "왜 중요한가", noteSub: "4,370달러가 여러 차례 남는지가 반등 지속의 확인입니다. 10년 금리와 달러인덱스가 같이 내려가야 폭이 커집니다. 은·원유보다 진폭이 작은 칸입니다.",
  footer: "금 · 현물",
}, {
  badge: "GOLD", title: "Spot gold held the $4,370–$4,380 band after last week’s bounce",
  heroIcon: "🥇", heroBig: "$4,378",
  heroSub: "A non-yielding asset feels higher rates quickly. The band survived a 10-year print above 5%.",
  cards: [
    { icon:"📉", big:"$4,370", mid:"Lower support", sub:"Last week’s bounce floor" },
    { icon:"📈", big:"$4,380", mid:"Near the top", sub:"No large weekend gap" },
    { icon:"📊", big:"5%", mid:"10-year yield", sub:"Discount rates rose again" },
  ],
  quote: "Gold bids appear when the dollar and oil rest. If yields stay above 5%, the bounce stays capped. Monday sits in the middle.",
  noteHead: "Why it matters", noteSub: "Repeated holds of $4,370 confirm the bounce. The rebound widens only if the 10-year and the dollar ease together. It is a calmer sleeve than silver or oil.",
  footer: "Gold · Spot",
});

add("ethereum-2632", "L2", "ETH", {
  badge: "이더리움", title: "이더리움이 2,632달러에서 0.02% 내리며 변동이 줄었습니다",
  heroIcon: "◆", heroBig: "2,632달러",
  heroSub: "비트코인보다 움직임이 작았습니다. 김치 프리미엄은 −1.55%, 점유율은 11.56%입니다.",
  cards: [
    { label: "변동", big: "−0.02%", mid: "거의 보합", sub: "비트코인 −0.21%보다 작습니다" },
    { label: "김치", big: "−1.55%", mid: "국내 할인", sub: "해외보다 조금 쌌습니다" },
    { label: "점유율", big: "11.56%", mid: "유지", sub: "비트코인 점유율은 줄었습니다" },
  ],
  detailHead: "회복 구간",
  detailLines: [
    "지난주 2,400달러대에서 2,600달러대로 올라왔습니다",
    "3월 해석에서 디지털 상품으로 거론된 자산입니다",
    "파생 거래량이 줄어 단기 관망이 보입니다",
  ],
  quote: "클라리티 법이 막혀도 위원회 해석은 남아 있습니다. 법안과 가격을 한 줄로 단정하지는 않습니다.",
  noteHead: "왜 중요한가", noteSub: "2,600달러 지지가 회복의 확인입니다. 이 선이 깨지면 2,400달러대 재탐색이 열립니다. 비트코인 8만 달러와 같은 비율로 해석하지 않습니다.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETHER", title: "Ether barely moved at $2,632, down 0.02%",
  heroIcon: "◆", heroBig: "$2,632",
  heroSub: "The move was smaller than bitcoin’s. The kimchi premium was −1.55% and dominance held 11.56%.",
  cards: [
    { label: "Move", big: "−0.02%", mid: "Nearly flat", sub:"Smaller than bitcoin’s −0.21%" },
    { label: "Kimchi", big: "−1.55%", mid: "Korea discount", sub:"A bit cheap to offshore" },
    { label: "Share", big: "11.56%", mid: "Held", sub:"Bitcoin dominance slipped" },
  ],
  detailHead: "Recovery band",
  detailLines: [
    "Price climbed from the $2,400s last week into the $2,600s",
    "March guidance listed ether as a digital commodity",
    "Thinner derivatives volumes point to caution",
  ],
  quote: "Committee guidance remains even after CLARITY failed. Do not collapse the bill and the price into one line.",
  noteHead: "Why it matters", noteSub: "A hold of $2,600 confirms the recovery. A break reopens the $2,400s. Do not scale ether one-for-one with bitcoin’s $80,000 line.",
  footer: "Ether · Price",
});

add("us-10y-5pct", "L4", "RATES", {
  badge: "금리", title: "미국 10년 국채 금리가 한때 5%를 넘기며 할인율을 다시 올렸습니다",
  badgeLine: "채권 매도 · 5% 터치",
  heroIcon: "📈", heroBig: "5%",
  heroSub: "10년 시장금리가 오르면 이자 없는 금·비트코인의 단기 매력이 줄어듭니다. 9월 17일 근처 수치는 4.94%입니다.",
  cards: [
    { icon:"📅", big:"4.94%", mid:"9월 17일 근처", sub:"5% 위아래를 오가는 주입니다" },
    { icon:"🏦", big:"3.75–4%", mid:"연준 구간", sub:"0.25%포인트 인상 후입니다" },
    { icon:"⚖️", big:"반대", mid:"장기채 가격", sub:"금리가 오르면 가격은 내립니다" },
  ],
  quote: "16일 5.01%, 15일 5.00%로 집계됐습니다. 한 번 터치와 며칠 안착은 다릅니다.",
  noteHead: "왜 중요한가", noteSub: "5% 위에 머물면 안전자산 반등 폭이 줄어듭니다. 금 4,370달러와 비트코인 8만 달러가 금리와 같이 움직이는지를 보면 됩니다. 정책금리와 시장금리를 한 칸에 섞지 않습니다.",
  footer: "금리 · 10년물",
}, {
  badge: "RATES", title: "The US 10-year yield briefly cleared 5% and lifted discount rates",
  badgeLine: "Bond selloff · 5% touch",
  heroIcon: "📈", heroBig: "5%",
  heroSub: "A higher 10-year rate trims the near-term appeal of non-yielding gold and bitcoin. A nearby Sept 17 print was 4.94%.",
  cards: [
    { icon:"📅", big:"4.94%", mid:"Near Sept 17", sub:"The week oscillated around 5%" },
    { icon:"🏦", big:"3.75–4%", mid:"Fed funds band", sub:"After a 25 basis-point hike" },
    { icon:"⚖️", big:"Inverse", mid:"Long-bond prices", sub:"Yields up means prices down" },
  ],
  quote: "Prints included 5.01% on the 16th and 5.00% on the 15th. A touch is not a multi-day stay.",
  noteHead: "Why it matters", noteSub: "A stay above 5% caps haven rebounds. Watch whether gold $4,370 and bitcoin $80,000 move with yields. Keep policy rates and market yields in separate lines.",
  footer: "Rates · 10-year",
});

add("clarity-act-fail", "L6", "MACRO", {
  badge: "규제", title: "클라리티 법 절차 투표가 50대 49로 막혀 올해 입법이 멀어졌습니다",
  breaking: "절차 투표 · 50대 49",
  heroBig: "50–49", heroSub: "클라리티 법은 디지털자산 시장 구조를 정하려는 법안입니다. 60표가 필요해 본회의에 오르지 못했습니다.",
  grid: [
    { icon:"🏛️", big:"상원", mid:"절차 문 닫힘", sub:"본회의 표결 전 단계입니다" },
    { icon:"📜", big:"60표", mid:"통과 문턱", sub:"50표로는 부족합니다" },
    { icon:"⚖️", big:"SEC·CFTC", mid:"위원회 정비", sub:"법이 없어도 해석은 남습니다" },
    { icon:"📅", big:"2026", mid:"현실 경로 약화", sub:"하원 통과분은 상원에서 멈췄습니다" },
  ],
  ctx1: "하원은 2025년 7월 294대 134로 통과시킨 바 있습니다.",
  ctx2: "3월 해석은 비트코인·이더 등을 디지털 상품으로 적었습니다.",
  quote: "비트코인이 8만 달러 위를 지킨 것은 법안 실패를 ETF 자금이 상쇄했다는 해석이 붙습니다. 법안과 가격은 다른 칸입니다.",
  noteHead: "왜 중요한가", noteSub: "입법 경로가 닫힌 것이지 시장이 사라진 것은 아닙니다. 재추진 일정과 위원회 후속 해석이 다음 확인입니다. 50대 49를 본회의 부결로 적지 않습니다.",
  footer: "규제 · 클라리티",
}, {
  badge: "POLICY", title: "Senate cloture on the CLARITY Act failed 50–49, fading a 2026 path",
  breaking: "Cloture · 50–49",
  heroBig: "50–49", heroSub: "CLARITY would have set digital-asset market structure in statute. Sixty votes were required to reach the floor.",
  grid: [
    { icon:"🏛️", big:"Senate", mid:"Door closed", sub:"Before a floor vote" },
    { icon:"📜", big:"60 votes", mid:"The threshold", sub:"Fifty was not enough" },
    { icon:"⚖️", big:"SEC·CFTC", mid:"Agency track", sub:"Guidance remains without a law" },
    { icon:"📅", big:"2026", mid:"Path weakened", sub:"The House bill stopped here" },
  ],
  ctx1: "The House passed its version 294–134 in July 2025.",
  ctx2: "March guidance listed bitcoin and ether as digital commodities.",
  quote: "Bitcoin holding $80,000 is read as ETF money offsetting the bill’s failure. The bill and the price are different lines.",
  noteHead: "Why it matters", noteSub: "A legislative path closed; the market did not vanish. Next: a restart calendar and further agency notes. Do not log 50–49 as a floor defeat.",
  footer: "Policy · CLARITY",
});

add("summary-krre", "ROWS", "JEONSE", {
  headline: "2026.09.21 한국부동산 한장 요약",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"51.1%", title:"서울 아파트 전세의 51.1%가 갱신 계약이었습니다",
      sub:"1월부터 9월 20일까지 8만480건 중 4만1,145건입니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"2만3,697", title:"서울 전세 매물이 1년 전보다 13.3% 줄었습니다",
      sub:"9월 19일 기준 숫자입니다." },
    { color:"#c084fc", fill:"#140b1f", right:"2027말", title:"실거주 유예 신청이 2027년 말까지 늘어납니다",
      sub:"10월 1일 시행, 갱신 1회면 2029년 말까지 미룰 수 있습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"61.5%", title:"중랑구 갱신 비율이 서울에서 가장 높았습니다",
      sub:"강서 57.8%, 성북 57.3%, 강동 55.8%입니다." },
    { color:"#facc15", fill:"#1a1600", right:"8.1억", title:"신규와 갱신 보증금 격차가 약 8.1억 원으로 거론됐습니다",
      sub:"새로 계약하면 훨씬 비싸다는 뜻입니다." },
  ],
  caption: "더 볼 것: 갱신 51.1% · 매물 2만3,697 · 유예 2027말 · 중랑 61.5% · 격차 8.1억",
}, {
  headline: "2026.09.21 Korea Housing Snapshot",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"51.1%", title:"Seoul apartment jeonse renewals reached 51.1%",
      sub:"41,145 of 80,480 deals from January through Sept 20." },
    { color:"#a78bfa", fill:"#120b1f", right:"23,697", title:"Seoul jeonse listings fell 13.3% from a year earlier",
      sub:"The count is as of Sept 19." },
    { color:"#c084fc", fill:"#140b1f", right:"End-2027", title:"Occupancy-deferral filings run through end-2027",
      sub:"Starts Oct 1; one renewal can push move-in to end-2029." },
    { color:"#fb7185", fill:"#1a0a10", right:"61.5%", title:"Jungnang posted the highest renewal share in Seoul",
      sub:"Gangseo 57.8%, Seongbuk 57.3%, Gangdong 55.8%." },
    { color:"#facc15", fill:"#1a1600", right:"₩810M", title:"The new-versus-renewal deposit gap was cited near ₩810M",
      sub:"A fresh contract costs much more." },
  ],
  caption: "Watch: renewals 51.1% · listings 23,697 · deferral end-2027 · Jungnang 61.5% · gap ₩810M",
});

add("seoul-jeonse-renewal-511", "L1", "JEONSE", {
  badge: "전세", title: "서울 아파트 전세의 51.1%가 갱신 계약으로 절반을 넘었습니다",
  heroIcon: "🏠", heroBig: "51.1%",
  heroSub: "올해 1월부터 9월 20일까지 서울 아파트 전세 8만480건 중 갱신이 4만1,145건입니다. 전년 41.1%보다 10%포인트 올랐습니다.",
  cards: [
    { icon:"📍", big:"61.5%", mid:"중랑구", sub:"서울에서 가장 높은 자치구입니다" },
    { icon:"📍", big:"57.8%", mid:"강서구", sub:"그다음이 성북 57.3%입니다" },
    { icon:"📅", big:"+10%p", mid:"1년 상승", sub:"신규보다 갱신이 많아졌습니다" },
  ],
  quote: "10·15 이후 전세 매물이 줄며 기존 집에 머무는 비율이 올라갔습니다. 8월 전월세 갱신 51.3%와 같은 방향입니다.",
  noteHead: "왜 중요한가", noteSub: "갱신이 절반을 넘으면 신규 매물이 부족하다는 뜻입니다. 10월 유예 이후 신규 거래가 살아나는지가 시험입니다. 합의 갱신은 5% 상한 밖 조정이 가능합니다.",
  footer: "전세 · 갱신",
}, {
  badge: "JEONSE", title: "Seoul apartment jeonse renewals reached 51.1% of this year’s deals",
  heroIcon: "🏠", heroBig: "51.1%",
  heroSub: "From January through Sept 20, 41,145 of 80,480 Seoul apartment jeonse deals were renewals, up 10 points from 41.1% a year earlier.",
  cards: [
    { icon:"📍", big:"61.5%", mid:"Jungnang", sub:"The highest share in Seoul" },
    { icon:"📍", big:"57.8%", mid:"Gangseo", sub:"Seongbuk was next at 57.3%" },
    { icon:"📅", big:"+10pp", mid:"One-year rise", sub:"Renewals overtook new leases" },
  ],
  quote: "Listings shrank after the Oct 15 rules, so more tenants stayed put. August’s 51.3% monthly share points the same way.",
  noteHead: "Why it matters", noteSub: "A renewal share above half means new listings are scarce. The test is whether new deals revive after the October deferral. Agreed renewals can move outside the 5% cap.",
  footer: "Jeonse · Renewals",
});

add("toheo-defer-2027", "L5", "TOHEO", {
  badge: "공급정책", title: "토지거래허가구역 실거주 유예가 2027년 말까지 늘고 10월 1일 시행됩니다",
  heroIcon: "📋", heroBig: "유예 연장",
  heroSub: "세 낀 집을 산 뒤 바로 들어가지 않아도 되는 기간이 1년 더 길어집니다. 갱신 1회를 더하면 2029년 말까지 미룰 수 있습니다.",
  before: { label: "기존", big: "2026말", sub: "올해 12월 31일까지 신청" },
  after: { label: "변경", big: "2027말", sub: "내년 12월 31일까지 신청" },
  cards: [
    { icon:"📅", big:"10월 1일", mid:"시행일", sub:"개정안이 이날부터 적용됩니다" },
    { icon:"🔁", big:"+2년", mid:"갱신 1회", sub:"늦어도 2029년 말 입주입니다" },
    { icon:"👤", big:"5/12", mid:"무주택 유지", sub:"그날부터 계속 무주택이어야 합니다" },
  ],
  quote: "입주 물량은 늘지 않고 전세를 놓는 기간만 길어집니다. 입주 후 2년 거주 의무는 그대로입니다.",
  noteHead: "왜 중요한가", noteSub: "유예는 시간을 사는 정책이지 공급을 늘리는 정책이 아닙니다. 10월 이후 전세 매물이 늘어야 효과가 보입니다. 2028년 이주 공백은 따로 남습니다.",
  footer: "정책 · 실거주 유예",
}, {
  badge: "POLICY", title: "Toheo occupancy deferral is extended to end-2027 and starts Oct 1",
  heroIcon: "📋", heroBig: "Deferral+",
  heroSub: "Buyers of tenanted homes get one more year before they must move in. One renewal can push that to end-2029.",
  before: { label: "Before", big: "End-2026", sub: "File by Dec 31 this year" },
  after: { label: "After", big: "End-2027", sub: "File by Dec 31 next year" },
  cards: [
    { icon:"📅", big:"Oct 1", mid:"Start date", sub:"The revision applies that day" },
    { icon:"🔁", big:"+2 years", mid:"One renewal", sub:"Move-in by end-2029 at latest" },
    { icon:"👤", big:"May 12", mid:"Homeless rule", sub:"Must stay homeless from that day" },
  ],
  quote: "The policy lengthens the lease window; it does not add completions. A two-year live-in duty after move-in remains.",
  noteHead: "Why it matters", noteSub: "Deferral buys time; it does not add supply. The effect shows only if listings rise after October. The 2028 relocation gap stays a separate line.",
  footer: "Policy · Occupancy deferral",
});

add("jeonse-listings-23697", "L4", "JEONSE", {
  badge: "전세", title: "서울 전세 매물이 2만3,697건으로 1년 전보다 13.3% 줄었습니다",
  badgeLine: "매물 감소 · 9월 19일",
  heroIcon: "🏚️", heroBig: "2만3,697건",
  heroSub: "매물이 줄면 세입자는 새 집보다 갱신을 고르기 쉽습니다. 같은 주 갱신 비율 51.1%와 맞닿는 배경입니다.",
  cards: [
    { icon:"📉", big:"−13.3%", mid:"1년 전 대비", sub:"전세 구하기가 더 어려워졌습니다" },
    { icon:"💰", big:"8.1억", mid:"신규·갱신 격차", sub:"새로 계약하면 훨씬 비쌉니다" },
    { icon:"📊", big:"7.12억", mid:"서울 평균 전세", sub:"8월 KB 기준 역대 최고 근처입니다" },
  ],
  quote: "성북·동대문 등 동북권에는 국평 전세 10억 원대가 등장했다는 보도가 있었습니다. 중하위권 가격이 올라온 장면입니다.",
  noteHead: "왜 중요한가", noteSub: "10월 이후 매물이 2만3,697건 위로 돌아와야 유예 효과가 보입니다. 13.3% 감소가 더 커지는지가 전세난의 온도입니다. 평균 전세와 갱신 비율을 옆에 나란히 적으면 됩니다.",
  footer: "전세 · 매물",
}, {
  badge: "JEONSE", title: "Seoul jeonse listings fell 13.3% year on year to 23,697",
  badgeLine: "Listing drop · Sept 19",
  heroIcon: "🏚️", heroBig: "23,697",
  heroSub: "Fewer listings push tenants to renew. That is the backdrop to this week’s 51.1% renewal share.",
  cards: [
    { icon:"📉", big:"−13.3%", mid:"Versus a year ago", sub:"Finding a new lease got harder" },
    { icon:"💰", big:"₩810M", mid:"New vs renewal gap", sub:"A fresh contract costs much more" },
    { icon:"📊", big:"₩712M", mid:"Seoul average jeonse", sub:"Near an August KB record" },
  ],
  quote: "Reports cited ₩1 billion-class jeonse on standard units in Seongbuk and Dongdaemun. Lower-tier prices have climbed.",
  noteHead: "Why it matters", noteSub: "The deferral works only if listings rise above 23,697 after October. A deeper 13.3% drop is the stress gauge. Keep the average rent and the renewal share beside this count.",
  footer: "Jeonse · Listings",
});

};
