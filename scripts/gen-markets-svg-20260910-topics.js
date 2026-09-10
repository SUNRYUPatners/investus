/* KR / Safe / KR-RE topics for 2026-09-10 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.10 한국장 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"+1.40%", title:"코스피가 7,051.64로 33거래일 만에 7,000선을 종가로 회복했습니다",
      sub:"장중 고점 7,112.48·시가 6,972.87입니다. 코스닥은 830.37(+2.28%)입니다." },
    { color:"#22d3ee", fill:"#06171c", right:"수급", title:"기관이 9,005억 원 샀고 개인은 2.4971조 원 팔았습니다",
      sub:"외국인은 1,702억 원 팔았습니다. 기관은 5거래일 연속 매수입니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"삼성", title:"삼성전자는 269,500원 보합입니다",
      sub:"장중 275,000원까지 올랐다 반납했습니다. 외국인 삼성 매도는 개별 칸입니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"하이닉스", title:"하이닉스가 1,856,000원(+3.51%)으로 지수를 끌었습니다",
      sub:"장중 1,883,000원까지 갔습니다. 퀄컴·인텔 서사는 중기 칸입니다." },
    { color:"#4ade80", fill:"#061209", right:"엔솔", title:"엘지에너지솔루션이 371,000원(+6.46%)으로 시총 상위를 이끌었습니다",
      sub:"중국산 배터리 규제 반사이익 기대가 붙었습니다. 수주와 종가를 나누시기 바랍니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"전기", title:"삼성전기가 1,404,000원(+2.48%)이었습니다",
      sub:"반도체 소재·부품 강세와 같은 줄기입니다. 하이닉스와 칸을 나누시기 바랍니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"현대", title:"현대차는 388,000원(+0.78%)으로 온도가 달랐습니다",
      sub:"유가·할부 수요 축입니다. 반도체 베타와 한 문장에 넣지 마시기 바랍니다." },
  ],
  caption: "더 볼 것: 7051.64 · 기관 9005억 · 삼성 보합 · 하이닉스 +3.51% · 엔솔 +6.46% · 전기 +2.48%",
}, {
  headline: "2026.09.10 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"+1.40%", title:"KOSPI closed 7,051.64, reclaiming 7,000 after 33 sessions",
      sub:"Intraday high 7,112.48, open 6,972.87. KOSDAQ 830.37 (+2.28%)." },
    { color:"#22d3ee", fill:"#06171c", right:"Flow", title:"Institutions bought ₩900.5B; individuals sold ₩2.4971T",
      sub:"Foreigners sold ₩170.2B. Institutions bought for a fifth day." },
    { color:"#60a5fa", fill:"#0a1420", right:"SMSN", title:"Samsung finished unchanged at 269,500",
      sub:"Printed 275,000 then gave it back. Foreign Samsung selling is a separate cell." },
    { color:"#f59e0b", fill:"#1a1205", right:"Hynix", title:"Hynix closed 1,856,000 (+3.51%) and led the index",
      sub:"Intraday 1,883,000. Qualcomm/Intel narratives stay medium-term." },
    { color:"#4ade80", fill:"#061209", right:"LGES", title:"LG Energy Solution led large-caps at 371,000 (+6.46%)",
      sub:"China-battery rule spillover hopes attached. Split orders from the close." },
    { color:"#a78bfa", fill:"#120b1f", right:"EM", title:"Samsung Electro-Mechanics closed 1,404,000 (+2.48%)",
      sub:"Same stem as semi materials. Split from Hynix." },
    { color:"#fb7185", fill:"#1a0a10", right:"HYUD", title:"Hyundai printed 388,000 (+0.78%) on a different temperature",
      sub:"Oil and financing demand. Do not mash with semi beta." },
  ],
  caption: "Watch: 7051.64 · inst ₩900.5B · Samsung flat · Hynix +3.51% · LGES +6.46% · Electro +2.48%",
});

add("kospi-flow-kr", "L6", "KOSPI", {
  badge: "BREAKING", breaking: "코스피 7,000 회복",
  title: "코스피가 7,051.64(+1.40%)로 33거래일 만에 종가 7,000선을 되찾았습니다",
  heroBig: "7,051",
  heroSub: "전일 대비 97.12포인트(1.40%) 오른 7,051.64입니다. 장중 고점 7,112.48, 시가 6,972.87입니다. 코스닥은 830.37(+2.28%, +18.49포인트)입니다.",
  grid: [
    { icon:"📊", big:"+1.40%", mid:"코스피", sub:"종가 7,051.64" },
    { icon:"⬆️", big:"7,112", mid:"장중 고점", sub:"일부 반납" },
    { icon:"💹", big:"+2.28%", mid:"코스닥", sub:"830.37" },
    { icon:"🏦", big:"5일", mid:"기관 연속 매수", sub:"하루 +9,005억" },
  ],
  ctx1: "개인 2.4971조 원 매도·외국인 1,702억 원 매도·기관 9,005억 원 매수입니다.",
  ctx2: "미국 증시 약세에도 반도체·배터리 개별 재료가 지수를 끌어 올렸다는 설명이 있습니다.",
  quote: "7,000선 회복은 종가 기준입니다. 장중 7,112에서 되돌린 폭과 주체별 수급을 한 문장에 합치지 마시기 바랍니다. 다음 확인할 것은 10일 미국 바이백·생산자물가입니다.",
  noteSub: "33거래일은 7월 23일 이후 종가 7,000 공백입니다. 기관 5일 연속 매수는 방향이지 전 업종 전환이 아닙니다. 장기적으로 코스피는 반도체 비중과 외국인 지분의 교집합입니다.",
  footer: "코스피 · 7,000 회복",
}, {
  badge: "BREAKING", breaking: "KOSPI RECLAIMS 7,000",
  title: "KOSPI closed 7,051.64 (+1.40%), taking the 7,000 close back after 33 sessions",
  heroBig: "7,051",
  heroSub: "Up 97.12 points (+1.40%) to 7,051.64. Intraday high 7,112.48, open 6,972.87. KOSDAQ 830.37 (+2.28%, +18.49).",
  grid: [
    { icon:"📊", big:"+1.40%", mid:"KOSPI", sub:"Close 7,051.64" },
    { icon:"⬆️", big:"7,112", mid:"Intraday high", sub:"Gave some back" },
    { icon:"💹", big:"+2.28%", mid:"KOSDAQ", sub:"830.37" },
    { icon:"🏦", big:"5d", mid:"Inst. buy streak", sub:"+₩900.5B day" },
  ],
  ctx1: "Individuals sold ₩2.4971T, foreigners ₩170.2B; institutions bought ₩900.5B.",
  ctx2: "Semi and battery idiosyncrasies lifted the index despite a softer US tape.",
  quote: "The 7,000 reclaim is a close. Do not mash the fade from 7,112 with the flow split. Next: Sep 10 Treasury buyback and PPI.",
  noteSub: "Thirty-three sessions is the gap since the Jul 23 close above 7,000. A five-day institution streak is direction, not a full-sector rotation. Long-run KOSPI is semi weight and foreign ownership.",
  footer: "KOSPI · 7,000 reclaim",
});

add("samsung-kr", "L2", "SEC", {
  badge: "삼성전자", title: "삼성전자가 269,500원 보합으로 마감하며 장중 275,000원을 반납했습니다",
  heroIcon: "📱", heroBig: "보합",
  heroSub: "종가는 전일과 같은 269,500원입니다. 장중 275,000원까지 올랐다가 상승분을 모두 반납했습니다. 지수는 +1.40%인데 삼성만 제자리입니다.",
  cards: [
    { label:"종가", big:"269,500", mid:"보합", sub:"전일 종가와 동일" },
    { label:"장중", big:"275,000", mid:"고가권", sub:"상승분 전량 반납" },
    { label:"지수", big:"+1.40%", mid:"코스피", sub:"삼성과 온도가 다름" },
  ],
  detailHead: "보합이 의미하는 것",
  detailLines: ["📍 지수 강세와 시총 1위가 어긋난 날","💰 외국인 삼성 매도는 종목 수급 칸","🏭 테일러·인공지능5는 중기 칸"],
  noteSub: "보합은 약세가 아니라 지수 대비 상대 약세입니다. 하이닉스 +3.51%와 한 줄로 삼성 전체를 단정하지 마시기 바랍니다. 다음 확인할 것은 외국인 종목별 표입니다. 장기적으로 메모리·파운드리 사이클이 핵심입니다.",
  footer: "삼성전자",
}, {
  badge: "Samsung", title: "Samsung closed unchanged at 269,500 after giving back 275,000",
  heroIcon: "📱", heroBig: "Flat",
  heroSub: "The close matched the prior day at 269,500. It printed 275,000 then gave the entire gain back. KOSPI was +1.40% while Samsung stood still.",
  cards: [
    { label:"Close", big:"269,500", mid:"Unchanged", sub:"Same as prior close" },
    { label:"Intraday", big:"275,000", mid:"High zone", sub:"Full giveback" },
    { label:"Index", big:"+1.40%", mid:"KOSPI", sub:"Different temperature" },
  ],
  detailHead: "What unchanged means",
  detailLines: ["📍 Index strength diverged from the top weight","💰 Foreign Samsung selling is a stock-flow cell","🏭 Taylor/AI5 stays medium-term"],
  noteSub: "Flat is relative weakness versus the index, not a crash. Do not judge all of Samsung from Hynix +3.51%. Next: the foreign stock-level table. Memory and foundry cycles dominate the long view.",
  footer: "Samsung",
});

add("skhynix-kr", "L3", "HYNIX", {
  badge: "SK하이닉스", title: "하이닉스가 1,856,000원(+3.51%, +63,000원)으로 마감하며 장중 1,883,000원까지 갔습니다",
  heroIcon: "💾", heroBig: "+3.51%",
  heroSub: "종가 1,856,000원은 6만 3,000원 오른 자리입니다. 장중 1,883,000원까지 올랐습니다. 퀄컴의 아마존 인공지능 칩 공급과 인텔 서버용 CPU 가격 인상 기대가 반도체 심리를 받쳤다는 설명이 있습니다.",
  cards: [
    { icon:"💵", big:"1,856,000", mid:"종가(원)", sub:"하루 +3.51%" },
    { icon:"📈", big:"1,883,000", mid:"장중 고가", sub:"일부 반납" },
    { icon:"🌐", big:"KRX반도체", mid:"지수 +2.88%", sub:"1만 4,217.16" },
  ],
  quote: "하이닉스 베타가 지수보다 큽니다. 종가 강세와 외국인 종목 매수를 한 문장에 넣지 마시기 바랍니다. 리밸런싱은 어제 재료였고 오늘은 종가 확인 칸입니다.",
  noteSub: "서버 CPU 가격·아마존 칩 계약은 업종 심리이지 하이닉스 수주 공시가 아닙니다. 삼성 보합과 상대 성과를 표에 두시기 바랍니다. 장기적으로 고대역폭 메모리 점유가 해자입니다.",
  footer: "SK하이닉스",
}, {
  badge: "SK Hynix", title: "Hynix closed 1,856,000 (+3.51%, +63,000) after an 1,883,000 high",
  heroIcon: "💾", heroBig: "+3.51%",
  heroSub: "The close at 1,856,000 is +₩63,000. Intraday high 1,883,000. Qualcomm’s Amazon AI-chip supply and Intel server-CPU price-hike hopes were cited as supporting semi sentiment.",
  cards: [
    { icon:"💵", big:"1,856,000", mid:"Close (KRW)", sub:"+3.51% day" },
    { icon:"📈", big:"1,883,000", mid:"Intraday high", sub:"Partial giveback" },
    { icon:"🌐", big:"KRX Semi", mid:"Index +2.88%", sub:"14,217.16" },
  ],
  quote: "Hynix beta is larger than the index. Do not mash a green close with foreign stock buying. Yesterday’s rebalance is a prior cell; today is the close check.",
  noteSub: "Server CPU prices and Amazon chip contracts are sector mood, not a Hynix order filing. Put Samsung’s unchanged print on the relative table. HBM share is the long moat.",
  footer: "SK Hynix",
});

add("lges-kr", "L1", "SEC", {
  badge: "LG에너지솔루션", title: "엘지에너지솔루션이 371,000원(+6.46%, +22,500원)으로 시총 상위를 이끌었습니다",
  heroIcon: "🔋", heroBig: "+6.46%",
  heroSub: "종가 371,000원은 2만 2,500원 오른 자리입니다. 미국이 중국산 배터리를 더 규제할 수 있다는 기대와 인공지능 데이터센터 에너지저장장치 수요가 같은 화면에 붙었습니다.",
  cards: [
    { icon:"💵", big:"371,000", mid:"종가(원)", sub:"하루 +6.46%" },
    { icon:"🇺🇸", big:"규제", mid:"중국산 배터리", sub:"반사이익 기대" },
    { icon:"⚡", big:"ESS", mid:"데이터센터 저장", sub:"중기 수요 줄기" },
  ],
  quote: "+6.46%는 하루 베타입니다. 어제 −3.86% 되돌림과 연결해 읽되, 수주·가동률 공시가 나오기 전에는 추세 전환으로 단정하지 마시기 바랍니다.",
  noteSub: "배터리 반사이익은 정책 가정입니다. 유가 100달러권은 원가 칸입니다. 다음 확인할 것은 완성차 판매와 ESS 수주입니다. 장기적으로 저장·전기차 침투가 해자 논쟁입니다.",
  footer: "LG에너지솔루션",
}, {
  badge: "LGES", title: "LG Energy Solution led large-caps at 371,000 (+6.46%, +₩22,500)",
  heroIcon: "🔋", heroBig: "+6.46%",
  heroSub: "Close 371,000 is +₩22,500. Hopes of tighter US rules on Chinese batteries and AI data-center storage demand sat on the same board.",
  cards: [
    { icon:"💵", big:"371,000", mid:"Close (KRW)", sub:"+6.46% day" },
    { icon:"🇺🇸", big:"Rules", mid:"China batteries", sub:"Spillover hope" },
    { icon:"⚡", big:"ESS", mid:"Data-center storage", sub:"Medium-term demand stem" },
  ],
  quote: "+6.46% is one-day beta. Link it to yesterday’s −3.86% fade, but do not call a trend until orders and utilization print.",
  noteSub: "Battery spillover is a policy assumption. Oil near $100 is a cost cell. Next: OEM sales and ESS orders. Storage and EV penetration frame the long moat debate.",
  footer: "LG Energy Solution",
});

add("samsung-electro-kr", "L4", "SEC", {
  badge: "삼성전기", badgeLine: "🔌 소재 · 부품",
  title: "삼성전기가 1,404,000원(+2.48%, +34,000원)으로 반도체 소재·부품 강세에 동행했습니다",
  heroIcon: "🔌", heroBig: "+2.48%",
  heroSub: "종가 1,404,000원은 3만 4,000원 오른 자리입니다. 코스닥 장비주와 같은 줄기에서 유가증권 시총 상위가 따라간 날입니다.",
  cards: [
    { icon:"💵", big:"1,404,000", mid:"종가(원)", sub:"하루 +2.48%" },
    { icon:"📈", big:"+34,000", mid:"상승 폭", sub:"하이닉스보다 작은 베타" },
    { icon:"🧪", big:"소재", mid:"반도체 부품", sub:"장비 심리와 동행" },
  ],
  quote: "소재·부품은 전공정 장비와 시계가 비슷하고 메모리 현물과는 다릅니다. 하이닉스 +3.51%를 삼성전기 실적으로 읽지 마시기 바랍니다.",
  noteSub: "기판·카메라 모듈 믹스가 중기 실적입니다. 하루 +2.48%만으로 수주 전환을 단정하지 마시기 바랍니다. 장기적으로 고다층 기판·전장 카메라가 해자 논쟁입니다.",
  footer: "삼성전기",
}, {
  badge: "SEMCO", badgeLine: "🔌 materials · parts",
  title: "Samsung Electro-Mechanics closed 1,404,000 (+2.48%, +₩34,000) with semi materials",
  heroIcon: "🔌", heroBig: "+2.48%",
  heroSub: "Close 1,404,000 is +₩34,000. A large-cap on the KOSPI followed the same stem as KOSDAQ equipment names.",
  cards: [
    { icon:"💵", big:"1,404,000", mid:"Close (KRW)", sub:"+2.48% day" },
    { icon:"📈", big:"+34,000", mid:"Point gain", sub:"Smaller beta than Hynix" },
    { icon:"🧪", big:"Parts", mid:"Semi components", sub:"Co-moves with equipment mood" },
  ],
  quote: "Materials share a clock with front-end tools, not with memory spots. Do not read Hynix +3.51% as SEMCO earnings.",
  noteSub: "Substrate and camera-module mix is the medium-term P&L. Do not call an order inflection from one +2.48% session. High-layer substrates and auto cameras frame the long moat debate.",
  footer: "Samsung Electro-Mechanics",
});

add("hyundai-kr", "L5", "AUTO", {
  badge: "현대차", title: "현대차가 388,000원(+0.78%, +3,000원)으로 반도체·배터리보다 작은 폭으로 올랐습니다",
  heroIcon: "🚗", heroBig: "+0.78%",
  heroSub: "종가 388,000원은 3,000원 오른 자리입니다. 지수는 +1.40%, 엘지엔솔은 +6.46%인데 완성차는 온도가 달랐습니다.",
  before: { label:"지수", big:"+1.40%", sub:"코스피 종가" },
  after: { label:"현대차", big:"+0.78%", sub:"완성차 베타" },
  cards: [
    { icon:"💵", big:"388,000", mid:"종가(원)", sub:"+3,000원" },
    { icon:"🛢️", big:"유가", mid:"소비·원가", sub:"브렌트 100달러권" },
    { icon:"🏦", big:"금리", mid:"할부 수요", sub:"미국 10년 4.83%" },
  ],
  quote: "유가와 금리는 할부와 연료비로 완성차에 닿습니다. 로보택시·모빌리티 뉴스는 중기 칸에만 두시기 바랍니다.",
  noteSub: "상대 성과가 핵심입니다. 반도체 강세를 현대차 추격 근거로 쓰지 마시기 바랍니다. 다음 확인할 것은 판매·인센티브입니다. 장기적으로 전동화·소프트웨어가 해자입니다.",
  footer: "현대차",
}, {
  badge: "Hyundai", title: "Hyundai closed 388,000 (+0.78%, +₩3,000), a smaller move than semis and batteries",
  heroIcon: "🚗", heroBig: "+0.78%",
  heroSub: "Close 388,000 is +₩3,000. KOSPI was +1.40% and LGES +6.46%; the OEM printed a different temperature.",
  before: { label:"Index", big:"+1.40%", sub:"KOSPI close" },
  after: { label:"Hyundai", big:"+0.78%", sub:"OEM beta" },
  cards: [
    { icon:"💵", big:"388,000", mid:"Close (KRW)", sub:"+₩3,000" },
    { icon:"🛢️", big:"Oil", mid:"Demand/cost", sub:"Brent near $100" },
    { icon:"🏦", big:"Rates", mid:"Financing demand", sub:"US 10-year ~4.83%" },
  ],
  quote: "Oil and rates hit OEMs through financing and fuel. Keep robotaxi/mobility news in the medium-term cell only.",
  noteSub: "Relative performance is the point. Do not chase Hyundai off semi strength. Next: sales and incentives. Electrification and software frame the long moat.",
  footer: "Hyundai",
});

// SAFE
add("summary-safe", "ROWS", "GOLD", {
  headline: "2026.09.10 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"비트코인이 8만 달러를 되찾지 못하고 7만 8천 달러권에 머물렀습니다",
      sub:"약 7만 8,208~7만 8,273달러, 현물 ETF 4,665만 달러 유출입니다." },
    { color:"#facc15", fill:"#1a1600", right:"금", title:"금은 온스 약 4,375~4,450달러권에서 헤지 수요를 받았습니다",
      sub:"선물 약 4,450달러(+0.27%) 설명이 있습니다. 비트코인과 칸을 나누시기 바랍니다." },
    { color:"#818cf8", fill:"#0f1024", right:"ETH", title:"이더리움은 약 2,464~2,488달러로 비트코인보다 조금 더 약했습니다",
      sub:"24시간 약 −0.59% 설명이 있습니다. 알트 레버리지부터 줄이시기 바랍니다." },
    { color:"#f97316", fill:"#1a0d02", right:"유가", title:"브렌트가 101달러를 웃돌고 서부텍사스산은 96달러 위로 거론됐습니다",
      sub:"지정학 프리미엄입니다. 금·비트코인 헤지와 같은 칸에 넣지 마시기 바랍니다." },
    { color:"#facc15", fill:"#1a1600", right:"엔", title:"달러·엔이 153엔 안팎까지 내려가 2월 이후 엔 강세 구간입니다",
      sub:"캐리 청산 우려가 위험자산 부담으로 거론됐습니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"금리", title:"재무부 바이백 60억 달러에도 10년물은 약 4.83%로 높았습니다",
      sub:"5% 시나리오는 의견입니다. 물가(생산자 10일·소비자 11일)가 다음 게이트입니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"청산", title:"암호화폐 청산 약 1억 5,187만 달러가 경계 심리로 붙었습니다",
      sub:"가격 자체보다 거시 불확실성이 중심에 있다는 설명입니다." },
  ],
  caption: "더 볼 것: BTC 78.2k · 금 4375~4450 · ETH 2464 · 브렌트 101 · 엔 153 · 바이백·물가",
}, {
  headline: "2026.09.10 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"Bitcoin failed to reclaim $80,000 and stayed in the high-78,000s",
      sub:"About $78,208–$78,273; spot ETF outflow $46.65M." },
    { color:"#facc15", fill:"#1a1600", right:"Gold", title:"Gold held a $4,375–$4,450/oz haven bid",
      sub:"Futures near $4,450.85 (+0.27%). Split from bitcoin." },
    { color:"#818cf8", fill:"#0f1024", right:"ETH", title:"Ethereum printed about $2,464–$2,488, a bit softer than bitcoin",
      sub:"About −0.59% over 24 hours. Cut alt leverage first." },
    { color:"#f97316", fill:"#1a0d02", right:"Oil", title:"Brent held above $101 and WTI was cited above $96",
      sub:"A geopolitical premium. Do not park it with gold/BTC hedges." },
    { color:"#facc15", fill:"#1a1600", right:"JPY", title:"USD/JPY near 153, the strongest yen since February",
      sub:"Carry-unwind fears were cited as a risk-asset weight." },
    { color:"#ef4444", fill:"#1a0a0a", right:"Rates", title:"The 10-year stayed near 4.83% even after a $6B Treasury buyback",
      sub:"A 5% path is opinion. PPI (10th) and CPI (11th) are next gates." },
    { color:"#94a3b8", fill:"#0c1017", right:"Liq.", title:"About $151.87M of crypto liquidations tagged caution",
      sub:"Macro uncertainty sat ahead of the price print itself." },
  ],
  caption: "Watch: BTC 78.2k · gold 4375–4450 · ETH 2464 · Brent 101 · yen 153 · buyback/CPI",
});

add("btc-safe", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 8만 달러 회복에 실패하고 약 7만 8,208달러, ETF는 4,665만 달러 유출이었습니다",
  heroIcon: "₿", heroBig: "$78.2k",
  heroSub: "24시간 약 −0.19%인 7만 8,208달러, 다른 집계는 7만 8,273달러(−0.33%)입니다. 미국 현물 ETF에서 하루 4,665만 달러가 빠져나갔고, 청산은 약 1억 5,187만 달러로 집계됐습니다.",
  cards: [
    { icon:"💵", big:"$78,208", mid:"24시간 가격", sub:"8만 달러 아래" },
    { icon:"🏦", big:"$46.65M", mid:"현물 ETF 유출", sub:"하루 순유출" },
    { icon:"📉", big:"$152M", mid:"청산 규모", sub:"약 1억 5,187만 달러" },
  ],
  quote: "8만 달러는 심리면입니다. 유가 101달러와 10년 4.83%가 위험자산 할인을 같이 흔듭니다. 금 상관과 청산 속도를 한 줄에 넣지 마시기 바랍니다.",
  noteSub: "유입 없는 반등은 숏커버 태그입니다. 거래소 시각을 고정하시기 바랍니다. 다음 확인할 것은 물가와 8만 달러 재돌파입니다. 장기적으로 비트코인은 유동성·할인율 자산입니다.",
  footer: "비트코인",
}, {
  badge: "Bitcoin", title: "Bitcoin failed to reclaim $80,000 near $78,208 as spot ETFs lost $46.65M",
  heroIcon: "₿", heroBig: "$78.2k",
  heroSub: "About $78,208 (−0.19% / 24h); another print $78,273 (−0.33%). US spot ETFs lost $46.65M in a day; liquidations about $151.87M.",
  cards: [
    { icon:"💵", big:"$78,208", mid:"24h price", sub:"Below $80,000" },
    { icon:"🏦", big:"$46.65M", mid:"Spot ETF outflow", sub:"One-day net" },
    { icon:"📉", big:"$152M", mid:"Liquidations", sub:"About $151.87M" },
  ],
  quote: "$80,000 is a psychology line. Oil at $101 and the 10-year at 4.83% shake the risk discount together. Do not mash gold correlation with liquidation speed.",
  noteSub: "A bounce without inflows is a short-cover tag. Pin the exchange timestamp. Next: inflation prints and an $80,000 retest. Bitcoin remains a liquidity and discount-rate asset over years.",
  footer: "Bitcoin",
});

add("gold-safe", "L2", "GOLD", {
  badge: "금", title: "금이 온스 약 4,375달러 현물과 선물 약 4,450달러에서 헤지 수요를 받았습니다",
  heroIcon: "🥇", heroBig: "$4,375",
  heroSub: "현물 집계 약 4,375.09달러(+0.58%), 12월 선물 약 4,450.85달러(+0.27%)입니다. 유가·금리 불확실성 속에서 금은 비트코인보다 느리게 움직였습니다.",
  cards: [
    { label:"현물", big:"$4,375", mid:"온스당", sub:"+0.58% 집계" },
    { label:"선물", big:"$4,451", mid:"12월물", sub:"+0.27%" },
    { label:"대비", big:"BTC", mid:"7.8만 달러권", sub:"속도와 칸이 다름" },
  ],
  detailHead: "금이 느린 이유",
  detailLines: ["📍 실질금리·달러의 거울","🛢️ 유가 급등은 인플레 헤지 논쟁","🏦 바이백과 온스를 한 줄에 넣지 않음"],
  noteSub: "온스 밴드는 하루 종가가 아닙니다. 예측시장 금리 확률과 금을 한 문장으로 단정하지 마시기 바랍니다. 다음 확인할 것은 소비자물가입니다. 장기적으로 금은 통화 신뢰 헤지입니다.",
  footer: "금",
}, {
  badge: "Gold", title: "Gold held a haven bid near $4,375 spot and about $4,451 in December futures",
  heroIcon: "🥇", heroBig: "$4,375",
  heroSub: "Spot about $4,375.09 (+0.58%); December futures about $4,450.85 (+0.27%). Gold moved slower than bitcoin under oil and rate uncertainty.",
  cards: [
    { label:"Spot", big:"$4,375", mid:"Per ounce", sub:"+0.58% print" },
    { label:"Futures", big:"$4,451", mid:"December", sub:"+0.27%" },
    { label:"Vs", big:"BTC", mid:"High-78k", sub:"Different speed cell" },
  ],
  detailHead: "Why gold is slower",
  detailLines: ["📍 A mirror of real rates and the dollar","🛢️ Oil spikes reopen inflation-hedge debates","🏦 Do not mash buybacks with the ounce"],
  noteSub: "The ounce band is not one close. Do not crown gold from hike-odds prints. Next: CPI. Gold remains a multi-year monetary-trust hedge.",
  footer: "Gold",
});

add("eth-safe", "L3", "ETH", {
  badge: "이더리움", title: "이더리움이 약 2,464달러(−0.59%)로 비트코인보다 조금 더 약했습니다",
  heroIcon: "Ξ", heroBig: "$2,464",
  heroSub: "24시간 약 −0.59%인 2,464달러, 다른 아침 집계는 2,487.92달러입니다. 비트코인 8만 달러 실패와 같은 거시 줄기이지만 베타가 더 큽니다.",
  cards: [
    { icon:"💵", big:"$2,464", mid:"24시간 가격", sub:"약 −0.59%" },
    { icon:"📅", big:"$2,488", mid:"다른 아침 집계", sub:"거래소·시각 차이" },
    { icon:"📉", big:"−42%", mid:"1년 전 대비", sub:"약 4,311달러 대비 설명" },
  ],
  quote: "이더는 비트 베타가 큰 날 레버리지가 먼저 청산됩니다. 2,500달러 심리선과 스테이킹 수익률을 금리와 비교하시기 바랍니다.",
  noteSub: "알트 추격은 물가 주간에 맞지 않습니다. 비트코인 ETF 유출과 이더 가격을 한 원인으로 합치지 마시기 바랍니다. 장기적으로 이더는 스마트계약 수수료와 스테이킹 자산입니다.",
  footer: "이더리움",
}, {
  badge: "Ethereum", title: "Ethereum printed about $2,464 (−0.59%), a bit softer than bitcoin",
  heroIcon: "Ξ", heroBig: "$2,464",
  heroSub: "About $2,464 (−0.59% / 24h); another morning print $2,487.92. Same macro stem as bitcoin’s $80,000 fail, larger beta.",
  cards: [
    { icon:"💵", big:"$2,464", mid:"24h price", sub:"About −0.59%" },
    { icon:"📅", big:"$2,488", mid:"Other morning print", sub:"Exchange/time gap" },
    { icon:"📉", big:"−42%", mid:"Versus 1y ago", sub:"From about $4,311" },
  ],
  quote: "Ether’s leverage is flushed first on high bitcoin-beta days. Compare the $2,500 psychology line and staking yield with rates.",
  noteSub: "Chasing alts into an inflation week is a poor fit. Do not mash bitcoin ETF outflows with the ether print as one cause. Ether remains a smart-contract fee and staking asset over years.",
  footer: "Ethereum",
});

add("oil-safe", "L4", "OIL", {
  badge: "원유", badgeLine: "🛢 브렌트 101",
  title: "브렌트가 101달러를 웃돌고 서부텍사스산은 96달러 위로 지정학 프리미엄이 붙었습니다",
  heroIcon: "🛢️", heroBig: "$101",
  heroSub: "브렌트 약 101달러, 서부텍사스산 약 96달러가 거론됐습니다. 다른 시각 집계는 서부텍사스산 약 95.55달러(+2.71%)입니다. 호르무즈 인근 선박 공격 서사가 같은 화면에 있습니다.",
  cards: [
    { icon:"🇬🇧", big:"$101+", mid:"브렌트", sub:"국제 기준물" },
    { icon:"🇺🇸", big:"$96+", mid:"서부텍사스산", sub:"미국 기준물" },
    { icon:"⚠️", big:"중동", mid:"지정학 프리미엄", sub:"선박·보험 비용" },
  ],
  quote: "유가 급등은 인플레이션과 위험자산 할인을 동시에 올립니다. 금·비트코인 헤지와 같은 칸에 넣지 마시기 바랍니다. 120달러 시나리오는 의견입니다.",
  noteSub: "재고와 외교 일정을 분리하시기 바랍니다. 아시아 정유사가 미국산 원유를 더 샀다는 설명은 물류 칸입니다. 장기적으로 에너지 전환과 지정학이 겹치는 시장입니다.",
  footer: "원유",
}, {
  badge: "Oil", badgeLine: "🛢 Brent 101",
  title: "Brent held above $101 and WTI was cited above $96 on a geopolitical premium",
  heroIcon: "🛢️", heroBig: "$101",
  heroSub: "Brent about $101, WTI above $96; another print WTI $95.55 (+2.71%). Vessel-attack narratives near Hormuz sat on the same board.",
  cards: [
    { icon:"🇬🇧", big:"$101+", mid:"Brent", sub:"Global benchmark" },
    { icon:"🇺🇸", big:"$96+", mid:"WTI", sub:"US benchmark" },
    { icon:"⚠️", big:"ME", mid:"Geopolitical premium", sub:"Ships and insurance" },
  ],
  quote: "Oil spikes lift inflation and the risk-asset discount together. Do not park them with gold/BTC hedges. A $120 path is opinion.",
  noteSub: "Split inventories from diplomacy. Asian refiners buying more US crude is a logistics cell. Transition plus geopolitics frame the long market.",
  footer: "Crude",
});

add("yen-safe", "L5", "JPY", {
  badge: "엔", title: "달러·엔이 153엔 안팎까지 내려가 2월 이후 가장 강한 엔 구간으로 거론됐습니다",
  heroIcon: "💴", heroBig: "153",
  heroSub: "환율 숫자가 작아질수록 엔 가치가 높아집니다. 153엔 안팎은 2월 이후 엔이 가장 강한 구간으로 설명됐습니다. 일본은행이 다음 회의(9월 28일권)에서 0.25%포인트 인상할 수 있다는 기대가 붙었습니다.",
  before: { label:"약한 엔", big:"높음", sub:"캐리가 편한 구간" },
  after: { label:"지금", big:"~153", sub:"2월 이후 강세권" },
  cards: [
    { icon:"🏦", big:"0.25%p", mid:"인상 기대", sub:"다음 일본은행 회의" },
    { icon:"📉", big:"캐리", mid:"청산 우려", sub:"위험자산 부담" },
    { icon:"₿", big:"BTC", mid:"위험자산 베타", sub:"엔 강세와 동행 구간" },
  ],
  quote: "엔 강세는 글로벌 자금이 엔 빚을 갚는 흐름과 겹칠 수 있습니다. 비트코인 약세의 원인으로 단정하지 마시기 바랍니다.",
  noteSub: "원·달러와 달러·엔을 한 표에 넣으면 착시가 납니다. 다음 확인할 것은 일본 입찰과 회의 성명입니다. 장기적으로 엔은 글로벌 유동성의 안전판입니다.",
  footer: "엔",
}, {
  badge: "Yen", title: "USD/JPY near 153 was cited as the strongest yen since February",
  heroIcon: "💴", heroBig: "153",
  heroSub: "A smaller USD/JPY print means a stronger yen. Around 153 is framed as the strongest yen since February. Markets attached a possible 0.25-point BOJ hike at the next meeting (around Sep 28).",
  before: { label:"Weaker yen", big:"High", sub:"Carry-friendly zone" },
  after: { label:"Now", big:"~153", sub:"Strongest since Feb" },
  cards: [
    { icon:"🏦", big:"0.25pt", mid:"Hike hopes", sub:"Next BOJ meeting" },
    { icon:"📉", big:"Carry", mid:"Unwind fears", sub:"Risk-asset weight" },
    { icon:"₿", big:"BTC", mid:"Risk beta", sub:"Can co-move with JPY strength" },
  ],
  quote: "Yen strength can overlap a global pay-down of yen-funded trades. Do not crown it as the cause of bitcoin weakness.",
  noteSub: "Mashing USD/KRW with USD/JPY creates optical illusion. Next: Japan auctions and the statement. The yen remains a global-liquidity safety valve over years.",
  footer: "Yen",
});

// KR-RE
add("summary-krre", "ROWS", "JEONSE", {
  headline: "2026.09.10 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"종부세", title:"비거주 1주택 종부세 공제 12억 원 유지가 다시 확인됐습니다",
      sub:"9억 축소안은 철회됐고, 세부담 상한 150%·공정시장가액비율 70%입니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"전세", title:"서울 아파트 전세 매물이 약 1만 9,902건으로 1년 전보다 12.8% 줄었습니다",
      sub:"종부세 유턴만으로 중저가 전세 물량이 늘어나기 어렵다는 평가입니다." },
    { color:"#f97316", fill:"#1a0d02", right:"월세", title:"월세 매물은 약 1만 6,921건으로 전년 대비 11.9% 줄었습니다",
      sub:"전세와 월세가 같이 줄면 협상력이 임차인에게 불리합니다." },
    { color:"#38bdf8", fill:"#061520", right:"실거주", title:"실거주 공제 14억 원과 비거주 12억 원은 차등입니다",
      sub:"공동명의 비거주도 합산 12억으로 맞췄습니다. 시행 숫자는 고지서로 확인하시기 바랍니다." },
    { color:"#22d3ee", fill:"#06171c", right:"청년", title:"청년 공공임대·월세 지원이 2027년 예산 축으로 강조됐습니다",
      sub:"서울 임차보증금 이자지원은 최대 2억 원·연 2.0%입니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"한계", title:"종부세 과표 12억은 시가 약 44억 원대 주택 이야기입니다",
      sub:"중저가 전월세난과 정책 대상이 다릅니다." },
    { color:"#4ade80", fill:"#061209", right:"일정", title:"정책 일관성과 가을 이사 시즌을 같은 신호로 묶지 마시기 바랍니다",
      sub:"대출 한도 조회 없는 계약은 거절하시기 바랍니다." },
  ],
  caption: "더 볼 것: 공제 12억 · 전세 19902 · 월세 16921 · 실거주 14억 · 청년 임대 · 시가 44억",
}, {
  headline: "2026.09.10 Korea RE Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"Tax", title:"The ₩1.2B comprehensive-tax deduction for non-resident one-homes was kept",
      sub:"The ₩900M cut was withdrawn; burden cap 150%; fair-market ratio 70%." },
    { color:"#fb923c", fill:"#1a0d02", right:"Jeonse", title:"Seoul apt jeonse listings printed about 19,902, down 12.8% year on year",
      sub:"A tax U-turn is not enough to refill mid-price jeonse." },
    { color:"#f97316", fill:"#1a0d02", right:"Wolse", title:"Monthly-rent listings printed about 16,921, down 11.9% year on year",
      sub:"Both jeonse and wolse tighter tilts bargaining against tenants." },
    { color:"#38bdf8", fill:"#061520", right:"Occupy", title:"Owner-occupier deduction ₩1.4B versus non-resident ₩1.2B remains split",
      sub:"Joint-name non-residents also total ₩1.2B. Confirm on the tax bill." },
    { color:"#22d3ee", fill:"#06171c", right:"Youth", title:"Youth public rental and rent aid were stressed in the 2027 budget axis",
      sub:"Seoul deposit-interest aid: up to ₩200M at 2.0% a year." },
    { color:"#ef4444", fill:"#1a0a0a", right:"Scope", title:"A ₩1.2B tax base is about homes near ₩4.4B market value",
      sub:"Different from the mid-price rental squeeze." },
    { color:"#4ade80", fill:"#061209", right:"Cal", title:"Do not mash policy consistency with the autumn moving season",
      sub:"Refuse contracts without a loan-limit check." },
  ],
  caption: "Watch: ₩1.2B deduction · 19,902 jeonse · 16,921 wolse · ₩1.4B occupy · youth rental · ₩4.4B",
});

add("jongbu-krre", "L1", "POLICY", {
  badge: "정책", title: "비거주 1주택 종부세 기본공제 12억 원과 세부담 상한 150%가 유지됐습니다",
  heroIcon: "📋", heroBig: "12억",
  heroSub: "종부세는 고가 주택에 매기는 보유세입니다. 비거주 1주택 기본공제를 9억 원으로 낮추려던 안이 철회되고 12억 원이 유지됐습니다. 세부담 상한 200% 인상안도 150%로 남았습니다. 공정시장가액비율은 60%에서 내년 70%입니다.",
  cards: [
    { icon:"🏠", big:"12억", mid:"비거주 1주택 공제", sub:"9억 축소안 철회" },
    { icon:"📈", big:"150%", mid:"세부담 상한", sub:"200%안 철회" },
    { icon:"⚖️", big:"70%", mid:"공정시장가액비율", sub:"내년, 60%에서 상향" },
  ],
  quote: "12억 유지는 감세 잔치가 아니라 축소안 철회입니다. 실거주 14억 원과 차등이 남습니다. 전세 매물 1만 9,902건과 한 신호로 묶지 마시기 바랍니다.",
  noteSub: "과표 12억 원은 시가 약 44억 원대 주택 이야기입니다. 중저가 전월세와 대상이 다릅니다. 다음 확인할 것은 고지서와 시행령입니다. 장기적으로 실거주 우대는 임대 공급과 긴장 관계입니다.",
  footer: "종부세 · 12억 유지",
}, {
  badge: "Policy", title: "The ₩1.2B comprehensive-tax deduction for non-resident one-homes and the 150% burden cap were kept",
  heroIcon: "📋", heroBig: "₩1.2B",
  heroSub: "Comprehensive real-estate tax is a levy on high-value homes. The plan to cut the non-resident one-home deduction to ₩900M was withdrawn; ₩1.2B stays. The 200% burden-cap hike also stayed at 150%. The fair-market ratio goes from 60% to 70% next year.",
  cards: [
    { icon:"🏠", big:"₩1.2B", mid:"Non-resident deduction", sub:"₩900M cut withdrawn" },
    { icon:"📈", big:"150%", mid:"Burden cap", sub:"200% hike withdrawn" },
    { icon:"⚖️", big:"70%", mid:"Fair-market ratio", sub:"Next year, from 60%" },
  ],
  quote: "Keeping ₩1.2B is a withdrawn tightening, not a tax-cut party. Owner-occupier ₩1.4B remains split. Do not mash with 19,902 jeonse listings.",
  noteSub: "A ₩1.2B tax base is about ~₩4.4B market-value homes. Different from the mid-price rental squeeze. Next: the bill and enforcement rules. Owner-occupier preference sits in tension with rental supply over years.",
  footer: "Comprehensive tax · ₩1.2B kept",
});

add("jeonse-listings-krre", "L2", "JEONSE", {
  badge: "전세", title: "서울 아파트 전세 매물이 약 1만 9,902건으로 1년 전보다 12.8% 줄었습니다",
  heroIcon: "🔑", heroBig: "19,902",
  heroSub: "1일 기준 서울 아파트 전세 매물 1만 9,902건, 1년 전 2만 2,823건 대비 12.8% 감소입니다. 종부세 공제 12억 유지가 나와도 중저가 전세 물량을 바로 채우기 어렵다는 평가입니다.",
  cards: [
    { label:"전세", big:"19,902", mid:"서울 아파트", sub:"전년 22,823건" },
    { label:"증감", big:"−12.8%", mid:"1년 전 대비", sub:"매물 감소" },
    { label:"과표", big:"44억", mid:"시가 대략", sub:"종부세 12억 대상권" },
  ],
  detailHead: "매물이 주는 신호",
  detailLines: ["📍 협상력이 임차인에게 불리해질 수 있음","🏦 대출 한도가 계약 관문","📋 종부세와 중저가 전세는 다른 칸"],
  noteSub: "어제 20,432건 서사보다 최신 1만 9,902건으로 표를 갱신하시기 바랍니다. 구별 실거래 없이 평균만 보지 마시기 바랍니다. 장기적으로 매물 감소는 전세가 하방 경직으로 이어질 수 있습니다.",
  footer: "전세 매물",
}, {
  badge: "Jeonse", title: "Seoul apt jeonse listings printed about 19,902, down 12.8% year on year",
  heroIcon: "🔑", heroBig: "19,902",
  heroSub: "As of the 1st, Seoul apartment jeonse listings were 19,902 versus 22,823 a year earlier (−12.8%). Keeping the ₩1.2B tax deduction does not refill mid-price jeonse overnight.",
  cards: [
    { label:"Jeonse", big:"19,902", mid:"Seoul apts", sub:"22,823 a year ago" },
    { label:"YoY", big:"−12.8%", mid:"Versus last year", sub:"Fewer listings" },
    { label:"Base", big:"₩4.4B", mid:"Approx. market", sub:"₩1.2B tax-base homes" },
  ],
  detailHead: "What listings signal",
  detailLines: ["📍 Bargaining can tilt against tenants","🏦 Loan limits gate the contract","📋 Tax policy ≠ mid-price jeonse"],
  noteSub: "Refresh yesterday’s 20,432 story to 19,902. Do not read a city average without district prints. Fewer listings can stiffen jeonse prices on the downside over years.",
  footer: "Jeonse listings",
});

add("wolse-listings-krre", "L3", "JEONSE", {
  badge: "월세", title: "서울 아파트 월세 매물이 약 1만 6,921건으로 1년 전보다 11.9% 줄었습니다",
  heroIcon: "🧾", heroBig: "−11.9%",
  heroSub: "같은 날 월세 매물 1만 6,921건, 1년 전 1만 9,197건 대비 11.9% 감소입니다. 전세와 월세가 같이 줄면 순수 전세에서 월세로 바꾸는 전환만으로 숨통이 트이지 않습니다.",
  cards: [
    { icon:"🧾", big:"16,921", mid:"월세 매물", sub:"서울 아파트" },
    { icon:"📉", big:"−11.9%", mid:"1년 전 대비", sub:"전년 19,197건" },
    { icon:"🔑", big:"−12.8%", mid:"전세 매물", sub:"같은 날 다른 칸" },
  ],
  quote: "전세→월세 전환은 주거비 구조 변화입니다. 가을 이사 시즌에 한도 조회 없는 계약은 거절하시기 바랍니다.",
  noteSub: "월세 감소는 전세 부족의 대체재가 약하다는 뜻일 수 있습니다. 청년 월세 지원과 칸을 나누시기 바랍니다. 장기적으로 월세 비중 확대는 가계 현금흐름 부담을 바꿉니다.",
  footer: "월세 매물",
}, {
  badge: "Wolse", title: "Seoul apt monthly-rent listings printed about 16,921, down 11.9% year on year",
  heroIcon: "🧾", heroBig: "−11.9%",
  heroSub: "Same day: 16,921 monthly-rent listings versus 19,197 a year earlier (−11.9%). If jeonse and wolse both shrink, switching from pure jeonse to wolse does not open a large escape hatch.",
  cards: [
    { icon:"🧾", big:"16,921", mid:"Wolse listings", sub:"Seoul apartments" },
    { icon:"📉", big:"−11.9%", mid:"Versus last year", sub:"19,197 a year ago" },
    { icon:"🔑", big:"−12.8%", mid:"Jeonse listings", sub:"A different cell that day" },
  ],
  quote: "Jeonse-to-wolse conversion is a housing-cost structure shift. Refuse autumn-move contracts without a loan-limit check.",
  noteSub: "Fewer wolse listings can mean the jeonse shortage lacks a substitute. Split from youth rent aid. A higher wolse mix changes household cash-flow burden over years.",
  footer: "Wolse listings",
});

add("youth-rental-krre", "L4", "POLICY", {
  badge: "청년", badgeLine: "🏘 공공임대 · 이자지원",
  title: "청년 공공임대 확대와 서울 임차보증금 이자지원 최대 2억 원·연 2.0%가 같은 화면에 있습니다",
  heroIcon: "🏘", heroBig: "2억",
  heroSub: "정부는 2027년 예산에서 청년 공공임대와 월세 지원을 키우겠다고 했습니다. 서울시 청년 임차보증금 이자지원은 만 19~39세, 연소득 5천만 원 이하, 융자 최대 2억 원(보증금의 90% 이내), 시 지원 금리 연 2.0%입니다.",
  cards: [
    { icon:"🏦", big:"2억", mid:"융자 한도", sub:"보증금의 90% 이내" },
    { icon:"📉", big:"2.0%", mid:"시 지원 금리", sub:"이자 부담 완화" },
    { icon:"📅", big:"2027", mid:"공공임대 확대", sub:"예산 축" },
  ],
  quote: "이자지원은 생애 1회·증액 불가 조건이 있습니다. 종부세 12억 유지와 청년 임대는 대상이 다릅니다. 자가 이동 사다리가 충분한지는 별도 칸입니다.",
  noteSub: "공공임대는 입주 대기·자격 심사가 있습니다. 전세 매물 감소를 이 프로그램으로 상쇄한다고 단정하지 마시기 바랍니다. 장기적으로 청년 임대 재고가 늘면 전세 급등 구간에서 완충이 될 수 있습니다.",
  footer: "청년 주거",
}, {
  badge: "Youth", badgeLine: "🏘 public rental · interest aid",
  title: "Youth public-rental expansion and Seoul deposit-interest aid up to ₩200M at 2.0% sat on one board",
  heroIcon: "🏘", heroBig: "₩200M",
  heroSub: "The 2027 budget stresses more youth public rental and monthly-rent aid. Seoul’s youth deposit-interest program: ages 19–39, income ≤₩50M, loan up to ₩200M (90% of deposit), city rate support 2.0% a year.",
  cards: [
    { icon:"🏦", big:"₩200M", mid:"Loan cap", sub:"Within 90% of deposit" },
    { icon:"📉", big:"2.0%", mid:"City rate support", sub:"Lowers interest burden" },
    { icon:"📅", big:"2027", mid:"Public-rental expansion", sub:"Budget axis" },
  ],
  quote: "Interest aid is often once-in-a-lifetime and non-increasable. Keeping the ₩1.2B tax deduction and youth rental have different audiences. Whether the ladder to ownership is enough is another cell.",
  noteSub: "Public rental has waitlists and eligibility. Do not assume it offsets fewer jeonse listings. A larger youth rental stock can buffer jeonse spikes over years.",
  footer: "Youth housing",
});

};
