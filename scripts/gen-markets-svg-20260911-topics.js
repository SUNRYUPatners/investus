/* KR / Safe / KR-RE topics for 2026-09-11 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.11 한국장 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"−0.25%", title:"코스피가 7,033.92로 0.25% 내리며 종가 7,000선을 지켰습니다",
      sub:"장중 저점 6,898.45까지 밀렸다 되돌렸습니다. 코스닥은 836.92(+0.79%)입니다." },
    { color:"#22d3ee", fill:"#06171c", right:"외인", title:"외국인이 2조 4,820억 원을 팔고 기타법인이 1조 6,670억 원을 샀습니다",
      sub:"개인 3,801억·기관 4,334억 매수입니다. 네 마녀의 날과 다른 화면의 숫자입니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"삼성", title:"삼성전자는 269,000원(−0.19%)입니다",
      sub:"장중 263,500원까지 밀렸다 되돌렸습니다. 외국인 매도와 칸을 나눕니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"하이닉스", title:"하이닉스는 1,853,000원(−0.16%)입니다",
      sub:"장중 1,890,000~1,811,000원입니다. 자사주 방파제와 종가를 나누시기 바랍니다." },
    { color:"#4ade80", fill:"#061209", right:"엔솔", title:"엘지에너지솔루션이 365,000원(−1.62%)이었습니다",
      sub:"유가 100달러권 원가 축입니다. 반도체 약보합과 온도가 다릅니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"삼바", title:"삼성바이오로직스가 1,423,000원(−2.00%)이었습니다",
      sub:"제약 업종 약세와 같은 줄기입니다. 반도체 베타와 따로 보시면 됩니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"현대", title:"현대차는 389,000원(+0.26%)으로 온도가 달랐습니다",
      sub:"유가·할부 수요 축입니다. 지수 방어와 한 문장에 넣지 마시기 바랍니다." },
  ],
  caption: "더 볼 것: 7033.92 · 외인 −2.48조 · 삼성 −0.19% · 하이닉스 −0.16% · 엔솔 −1.62% · 삼바 −2.00%",
}, {
  headline: "2026.09.11 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"−0.25%", title:"KOSPI closed 7,033.92 (−0.25%) and held the 7,000 close",
      sub:"Intraday low 6,898.45 then recovered. KOSDAQ 836.92 (+0.79%)." },
    { color:"#22d3ee", fill:"#06171c", right:"Flow", title:"Foreigners sold ₩2.482T; other corps bought ₩1.667T",
      sub:"Individuals ₩380.1B and institutions ₩433.4B bought. Split from quadruple witching." },
    { color:"#60a5fa", fill:"#0a1420", right:"SMSN", title:"Samsung closed 269,000 (−0.19%)",
      sub:"Printed 263,500 then recovered. Foreign selling is a separate cell." },
    { color:"#f59e0b", fill:"#1a1205", right:"Hynix", title:"Hynix closed 1,853,000 (−0.16%)",
      sub:"Intraday 1,890,000 to 1,811,000. Split buybacks from the close." },
    { color:"#4ade80", fill:"#061209", right:"LGES", title:"LG Energy Solution closed 365,000 (−1.62%)",
      sub:"Oil-at-$100 cost axis. Different temperature from semis." },
    { color:"#a78bfa", fill:"#120b1f", right:"Bio", title:"Samsung Biologics closed 1,423,000 (−2.00%)",
      sub:"Same stem as pharma softness. Do not mash with semi beta." },
    { color:"#fb7185", fill:"#1a0a10", right:"HYUD", title:"Hyundai printed 389,000 (+0.26%) on a different temperature",
      sub:"Oil and financing demand. Do not mash with the index hold." },
  ],
  caption: "Watch: 7033.92 · foreign −₩2.48T · Samsung −0.19% · Hynix −0.16% · LGES −1.62% · Bio −2.00%",
});

add("kospi-flow-kr", "L6", "KOSPI", {
  badge: "BREAKING", breaking: "코스피 7,000 사수",
  title: "코스피가 7,033.92(−0.25%)로 장중 6,898까지 밀렸다 종가 7,000선을 지켰습니다",
  heroBig: "7,033",
  heroSub: "전일 대비 0.25% 내린 7,033.92입니다. 시가 7,038.85, 장중 저점 6,898.45입니다.",
  grid: [
    { icon:"📊", big:"−0.25%", mid:"코스피", sub:"종가 7,033.92" },
    { icon:"⬇️", big:"6,898", mid:"장중 저점", sub:"낙폭 대부분 회복" },
    { icon:"💹", big:"+0.79%", mid:"코스닥", sub:"836.92" },
    { icon:"🏦", big:"6일", mid:"기관 연속 매수", sub:"하루 +4,334억" },
  ],
  ctx1: "외국인 2.48조 매도, 개인·기관 매수, 기타법인 1.67조 매수입니다.",
  ctx2: "선물·옵션 동시 만기(네 마녀의 날)와 반도체 지수 리밸런싱이 겹쳤습니다.",
  quote: "7,000선 사수는 종가 기준입니다. 장중 6,898 저점과 외국인 매도를 한 문장의 추세로 따로 보시면 됩니다. 다음 확인할 것은 외국인 연속 매도 여부입니다.",
  noteSub: "기타법인 순매수는 자사주 매입이 포함된 칸입니다. 유가 100달러·미국 10년 4.9%권과 다른 화면의 숫자입니다. 장기적으로 코스피는 반도체 비중과 외국인 지분의 교집합입니다.",
  footer: "코스피 · 7,000 사수",
}, {
  badge: "BREAKING", breaking: "KOSPI HOLDS 7,000",
  title: "KOSPI closed 7,033.92 (−0.25%) after an intraday low of 6,898, holding the 7,000 close",
  heroBig: "7,033",
  heroSub: "Down 17.72 points (−0.25%) to 7,033.92. Open 7,038.85, low 6,898.45. KOSDAQ 836.92 (+0.79%).",
  grid: [
    { icon:"📊", big:"−0.25%", mid:"KOSPI", sub:"Close 7,033.92" },
    { icon:"⬇️", big:"6,898", mid:"Intraday low", sub:"Most of the drop recovered" },
    { icon:"💹", big:"+0.79%", mid:"KOSDAQ", sub:"836.92" },
    { icon:"🏦", big:"6d", mid:"Inst. buy streak", sub:"+₩433.4B day" },
  ],
  ctx1: "Foreigners sold ₩2.482T; individuals ₩380.1B and institutions ₩433.4B bought; other corps ₩1.667T.",
  ctx2: "Quadruple witching and KRX semiconductor rebalancing overlapped.",
  quote: "Holding 7,000 is a close. Do not mash the 6,898 low with foreign selling as one trend. Next: whether foreign selling continues.",
  noteSub: "Other-corp buying includes treasury-stock purchases. Split from oil at $100 and the U.S. 10-year near 4.9%. Long-run KOSPI is semi weight and foreign ownership.",
  footer: "KOSPI · 7,000 hold",
});

add("samsung-kr", "L2", "SEC", {
  badge: "삼성전자", title: "삼성전자가 269,000원(−0.19%)으로 마감하며 장중 263,500원을 되돌렸습니다",
  heroIcon: "📱", heroBig: "269,000",
  heroSub: "전일 대비 0.19% 내린 269,000원입니다. 장중 263,500원까지 밀렸다 낙폭을 대부분 만회했습니다. 기관이 1조 119억 원을 샀고 외국인은 1조 4,062억 원을 팔았습니다.",
  cards: [
    { label:"종가", big:"269,000", mid:"−0.19%", sub:"약보합 마감" },
    { label:"저점", big:"263,500", mid:"장중 저가", sub:"낙폭 만회" },
    { label:"외인", big:"−1.41조", mid:"외국인 순매도", sub:"기관 +1.01조" },
  ],
  detailHead: "종가와 수급을 나누면",
  detailLines: ["📍 약보합은 종가 칸입니다","🏦 자사주·기타법인은 별도 줄","💵 하이닉스 −0.16%와 온도 비교"],
  noteSub: "외국인 매도와 종가 방어를 한 문장에 넣지 마시기 바랍니다. 테일러 서사는 중기 칸입니다. 다음 확인할 것은 외국인 연속 매도입니다. 장기적으로 메모리 사이클과 파운드리 수율이 해자입니다.",
  footer: "삼성전자 · 269,000",
}, {
  badge: "Samsung", title: "Samsung closed 269,000 (−0.19%) after an intraday low of 263,500",
  heroIcon: "📱", heroBig: "269,000",
  heroSub: "Down 0.19% to 269,000. It printed 263,500 then recovered most of the drop. Institutions bought ₩1.0119T; foreigners sold ₩1.4062T.",
  cards: [
    { label:"Close", big:"269,000", mid:"−0.19%", sub:"Slightly weaker close" },
    { label:"Low", big:"263,500", mid:"Intraday low", sub:"Drop recovered" },
    { label:"Foreign", big:"−₩1.41T", mid:"Foreign net sell", sub:"Inst +₩1.01T" },
  ],
  detailHead: "Split close from flow",
  detailLines: ["📍 The slight loss is a close cell","🏦 Buybacks/other corps are another line","💵 Compare with Hynix −0.16%"],
  noteSub: "Do not mash foreign selling with the close defense. The Taylor narrative stays medium-term. Next: whether foreign selling continues. Memory cycles and foundry yield are the long moat.",
  footer: "Samsung · 269,000",
});

add("hynix-kr", "L1", "HYNIX", {
  badge: "SK하이닉스", title: "하이닉스가 1,853,000원(−0.16%)으로 마감하며 장중 1,811,000원을 되돌렸습니다",
  heroIcon: "💾", heroBig: "1,853,000",
  heroSub: "전일 대비 0.16% 내린 1,853,000원입니다. 장중 고점 1,890,000원, 저점 1,811,000원입니다. 기관이 5,615억 원을 샀고 외국인은 1조 7,797억 원을 팔았습니다.",
  cards: [
    { icon:"📊", big:"−0.16%", mid:"종가 등락", sub:"약보합" },
    { icon:"⬇️", big:"1,811,000", mid:"장중 저점", sub:"−2.42%까지" },
    { icon:"🏦", big:"−1.78조", mid:"외국인 순매도", sub:"기관 +5,615억" },
  ],
  quote: "장중 고점과 저점 폭이 큽니다. 외국인 매도를 종가 약보합의 원인으로 단정하지 마시기 바랍니다. 자사주 방파제와 다른 화면의 숫자입니다.",
  noteSub: "리밸런싱 매물이 겹쳤다는 설명이 있습니다. 삼성 −0.19%와 온도를 비교하시기 바랍니다. 다음 확인할 것은 외국인 연속 여부입니다. 장기적으로 고대역폭 메모리 점유가 해자입니다.",
  footer: "하이닉스 · 1,853,000",
}, {
  badge: "SK hynix", title: "Hynix closed 1,853,000 (−0.16%) after an intraday low of 1,811,000",
  heroIcon: "💾", heroBig: "1,853,000",
  heroSub: "Down 0.16% to 1,853,000. Intraday high 1,890,000, low 1,811,000. Institutions bought ₩561.5B; foreigners sold ₩1.7797T.",
  cards: [
    { icon:"📊", big:"−0.16%", mid:"Close change", sub:"Slightly weaker" },
    { icon:"⬇️", big:"1,811,000", mid:"Intraday low", sub:"As much as −2.42%" },
    { icon:"🏦", big:"−₩1.78T", mid:"Foreign net sell", sub:"Inst +₩561.5B" },
  ],
  quote: "The high-to-low range was wide. Do not crown foreign selling as the cause of a slightly weaker close. Split buybacks onto another cell.",
  noteSub: "Rebalancing supply was cited. Compare temperature with Samsung −0.19%. Next: whether foreign selling continues. HBM share is the long moat.",
  footer: "Hynix · 1,853,000",
});

add("lges-kr", "L3", "AUTO", {
  badge: "LG에너지솔루션", title: "엘지에너지솔루션이 365,000원(−1.62%)으로 반도체보다 더 내렸습니다",
  heroIcon: "🔋", heroBig: "−1.62%",
  heroSub: "종가 365,000원은 전일 371,000원 대비 1.62% 내린 자리입니다. 브렌트 101달러권 원가와 할부·수요 축이 겹칩니다. 수주 공시와 종가를 나누시기 바랍니다.",
  cards: [
    { icon:"💵", big:"365,000", mid:"종가", sub:"전일 371,000 대비" },
    { icon:"🛢️", big:"101", mid:"브렌트 달러", sub:"원가·수요 양쪽" },
    { icon:"📉", big:"−1.62%", mid:"시총 상위 낙폭", sub:"삼성·하이닉스보다 큼" },
  ],
  quote: "배터리 종가는 유가·금리와 같은 화면에 있어도 칸이 다릅니다. 중국 규제 기대를 하루 등락의 원인으로 쓰지 마시기 바랍니다. 다음 확인할 것은 수주입니다.",
  noteSub: "전일 +6.46% 다음날 되돌림일 수 있습니다. 반도체 약보합과 한 문장에 넣지 마시기 바랍니다. 다음 게이트는 전기차 출하입니다. 장기적으로 에너지저장·전고체 로드맵이 해자입니다.",
  footer: "엘지에너지솔루션 · −1.62%",
}, {
  badge: "LGES", title: "LG Energy Solution closed 365,000 (−1.62%), weaker than the semis",
  heroIcon: "🔋", heroBig: "−1.62%",
  heroSub: "Close 365,000 is 1.62% below yesterday’s 371,000. Brent near $101 hits cost and demand. Split orders from the close.",
  cards: [
    { icon:"💵", big:"365,000", mid:"Close", sub:"Versus 371,000 prior" },
    { icon:"🛢️", big:"101", mid:"Brent dollars", sub:"Cost and demand both" },
    { icon:"📉", big:"−1.62%", mid:"Large-cap drop", sub:"Larger than Samsung/Hynix" },
  ],
  quote: "Battery closes share a screen with oil and rates but not a cell. Do not credit China-rule hopes as the day’s cause. Next: orders.",
  noteSub: "This can be a fade after +6.46% the prior day. Do not mash with slight semi losses. Next: EV shipments. Storage and solid-state maps are the long moat.",
  footer: "LGES · −1.62%",
});

add("samsung-bio-kr", "L4", "SEC", {
  badge: "삼성바이오", badgeLine: "💊 바이오 · 시총 상위",
  title: "삼성바이오로직스가 1,423,000원(−2.00%)으로 시총 상위 낙폭이 컸습니다",
  heroIcon: "💊", heroBig: "−2.00%",
  heroSub: "종가 1,423,000원은 전일 대비 2.00% 내린 자리입니다. 제약 업종이 약했고, 반도체 약보합과 온도가 달랐습니다. 수주 공시가 없는 하루의 베타입니다.",
  cards: [
    { icon:"💵", big:"1,423,000", mid:"종가", sub:"−2.00%" },
    { icon:"📉", big:"제약", mid:"업종 약세", sub:"의료·정밀과 갈림" },
    { icon:"📋", big:"수주", mid:"공시 공백", sub:"하루 베타로만 태그" },
  ],
  quote: "바이오 낙폭을 반도체 외국인 매도의 연장으로 아직 그 단계는 아닙니다. 위탁생산 수주와 종가를 나누시기 바랍니다. 다음 확인할 것은 공장 가동률입니다.",
  noteSub: "시총 상위라도 업종 베타가 다릅니다. 현대차 +0.26%와 비교하시면 됩니다. 다음 게이트는 수주 공시입니다. 장기적으로 바이오 해자는 캐파와 규제 허가입니다.",
  footer: "삼성바이오로직스 · −2.00%",
}, {
  badge: "Bio", badgeLine: "💊 Biologics · large-cap",
  title: "Samsung Biologics closed 1,423,000 (−2.00%), a larger large-cap drop",
  heroIcon: "💊", heroBig: "−2.00%",
  heroSub: "Close 1,423,000 is down 2.00%. Pharma was soft, a different temperature from slight semi losses. A beta day without an order print.",
  cards: [
    { icon:"💵", big:"1,423,000", mid:"Close", sub:"−2.00%" },
    { icon:"📉", big:"Pharma", mid:"Sector softness", sub:"Split from med-tech gains" },
    { icon:"📋", big:"Orders", mid:"No print today", sub:"Tag as one-day beta" },
  ],
  quote: "Do not read the biologics drop as an extension of foreign semi selling. Split CDMO orders from the close. Next: plant utilization.",
  noteSub: "Large-cap still has a different sector beta. Compare with Hyundai +0.26%. Next: an order print. Capacity and permits are the long moat.",
  footer: "Biologics · −2.00%",
});

add("hyundai-kr", "L5", "AUTO", {
  badge: "현대차", title: "현대차가 389,000원(+0.26%)으로 지수·배터리와 온도가 달랐습니다",
  heroIcon: "🚗", heroBig: "+0.26%",
  heroSub: "종가 389,000원은 전일 388,000원 대비 0.26% 오른 자리입니다. 코스피는 0.25% 내렸고 엔솔은 1.62% 내렸습니다.",
  before: { label:"코스피", big:"−0.25%", sub:"지수 종가" },
  after: { label:"현대차", big:"+0.26%", sub:"완성차 베타" },
  cards: [
    { icon:"💵", big:"389,000", mid:"종가", sub:"+1,000원" },
    { icon:"🛢️", big:"유가", mid:"수요·원가", sub:"브렌트 101달러권" },
    { icon:"🏦", big:"금리", mid:"할부 수요", sub:"미국 10년 4.92%권" },
  ],
  quote: "유가와 금리는 완성차 할부·연료비 칸입니다. 로보택시 뉴스는 중기 칸에만 두시기 바랍니다. 반도체 약보합을 현대차 강세로 아직 그 단계는 아닙니다.",
  noteSub: "상대 성과가 포인트입니다. 판매·인센티브 전엔 다음 숫자를 기다리시면 됩니다. 다음 확인할 것은 출하입니다. 전동화·소프트웨어가 장기 해자입니다.",
  footer: "현대차 · +0.26%",
}, {
  badge: "Hyundai", title: "Hyundai closed 389,000 (+0.26%), a different temperature from the index and batteries",
  heroIcon: "🚗", heroBig: "+0.26%",
  heroSub: "Close 389,000 is +0.26% versus 388,000. KOSPI was −0.25% and LGES −1.62%.",
  before: { label:"Index", big:"−0.25%", sub:"KOSPI close" },
  after: { label:"Hyundai", big:"+0.26%", sub:"OEM beta" },
  cards: [
    { icon:"💵", big:"389,000", mid:"Close (KRW)", sub:"+₩1,000" },
    { icon:"🛢️", big:"Oil", mid:"Demand/cost", sub:"Brent near $101" },
    { icon:"🏦", big:"Rates", mid:"Financing demand", sub:"US 10-year ~4.92%" },
  ],
  quote: "Oil and rates hit OEMs through financing and fuel. Keep robotaxi news in the medium-term cell only. Do not read slight semi losses as Hyundai strength.",
  noteSub: "Relative performance is the point. Do not chase before sales and incentives. Next: shipments. Electrification and software frame the long moat.",
  footer: "Hyundai · +0.26%",
});

add("summary-safe", "ROWS", "GOLD", {
  headline: "2026.09.11 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"비트코인이 7만 7천~7만 8천 달러권에서 약세를 이어 갔습니다",
      sub:"8만 달러 회복은 실패입니다. 생산자물가 5.4%와 다른 화면의 숫자입니다." },
    { color:"#facc15", fill:"#1a1600", right:"금", title:"금은 온스 약 4,365달러권에서 실질금리에 눌렸습니다",
      sub:"4,400달러 아래입니다. 비트코인 청산 속도와 칸을 나눕니다." },
    { color:"#818cf8", fill:"#0f1024", right:"ETH", title:"이더리움은 약 2,460달러권으로 비트코인 베타를 따랐습니다",
      sub:"알트 레버리지부터 가격과 빌린 돈을 구분해 보시면 됩니다." },
    { color:"#f97316", fill:"#1a0d02", right:"유가", title:"브렌트가 101.21달러로 7월 이후 첫 종가 100달러입니다",
      sub:"지정학 프리미엄입니다. 금 헤지와 같은 칸에 넣지 마시기 바랍니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"10년", title:"미국 10년물이 4.92%로 2023년 10월 이후 최고권입니다",
      sub:"하루 +0.08%포인트입니다. 생산자물가 5.4%와 칸을 나눕니다." },
    { color:"#f97316", fill:"#1a0d02", right:"PPI", title:"8월 생산자물가가 전년 대비 5.4%로 예상 5.3%를 웃돌았습니다",
      sub:"소비자물가와 9월 16일 회의가 다음 게이트입니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"할인", title:"금리가 오르면 금·비트코인 같은 무이자 자산의 기회비용이 커집니다",
      sub:"자산마다 시계가 다릅니다. 한 방향 헤지로 묶지 마시기 바랍니다." },
  ],
  caption: "더 볼 것: BTC 7.7만권 · 금 4365 · ETH 2460 · 브렌트 101.21 · 10년 4.92% · PPI 5.4%",
}, {
  headline: "2026.09.11 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"Bitcoin stayed weak in the 77k–78k dollar zone",
      sub:"The $80,000 reclaim failed. Split from PPI at 5.4%." },
    { color:"#facc15", fill:"#1a1600", right:"Gold", title:"Gold sat near $4,365 an ounce under real yields",
      sub:"Below $4,400. Split from bitcoin liquidation speed." },
    { color:"#818cf8", fill:"#0f1024", right:"ETH", title:"Ether near $2,460 followed bitcoin beta",
      sub:"Cut alt leverage first." },
    { color:"#f97316", fill:"#1a0d02", right:"Oil", title:"Brent closed $101.21, first close above $100 since Jul 23",
      sub:"A geopolitics premium. Do not mash with gold hedges." },
    { color:"#ef4444", fill:"#1a0a0a", right:"10y", title:"The U.S. 10-year printed 4.92%, highest since Oct 2023",
      sub:"+0.08 percentage point. Split from PPI 5.4%." },
    { color:"#f97316", fill:"#1a0d02", right:"PPI", title:"August PPI printed 5.4% YoY versus 5.3% expected",
      sub:"CPI and the Sep 16 meeting are the next gates." },
    { color:"#94a3b8", fill:"#0c1017", right:"Disc.", title:"Higher yields raise the opportunity cost of gold and bitcoin",
      sub:"Each asset has its own clock. Do not bundle one hedge." },
  ],
  caption: "Watch: BTC 77k · gold 4365 · ETH 2460 · Brent 101.21 · 10y 4.92% · PPI 5.4%",
});

add("btc-safe", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 7만 7천 달러권에서 약세를 이어 가며 8만 달러 회복에 실패했습니다",
  heroIcon: "₿", heroBig: "77k",
  heroSub: "가격은 집계마다 7만 7천~7만 8천 달러권입니다. 8만 달러는 심리면입니다. 10년물 4.92%와 생산자물가 5.4%가 할인율을 올렸습니다.",
  cards: [
    { icon:"💵", big:"77–78k", mid:"거래 구간", sub:"집계마다 조금 다름" },
    { icon:"📈", big:"4.92%", mid:"미국 10년물", sub:"할인율 축" },
    { icon:"🏭", big:"5.4%", mid:"생산자물가", sub:"전년 대비" },
  ],
  quote: "금리가 오르면 무이자 자산의 매력이 떨어집니다. 금 온스와 청산 속도를 한 줄에 넣지 마시기 바랍니다. 다음 확인할 것은 소비자물가입니다.",
  noteSub: "8만 달러는 심리면이지 펀더멘털 스위치가 아닙니다. 현물 ETF 유출이 이어지는지가 중기 신호입니다. 장기적으로 비트코인은 유동성·할인율 자산입니다.",
  footer: "비트코인 · 7만 7천권",
}, {
  badge: "Bitcoin", title: "Bitcoin stayed weak in the 77k zone and failed to reclaim $80,000",
  heroIcon: "₿", heroBig: "77k",
  heroSub: "Prints sit in the 77k–78k zone depending on the feed. $80,000 is psychology. The 10-year at 4.92% and PPI at 5.4% lifted the discount.",
  cards: [
    { icon:"💵", big:"77–78k", mid:"Trade zone", sub:"Feeds differ slightly" },
    { icon:"📈", big:"4.92%", mid:"U.S. 10-year", sub:"Discount-rate axis" },
    { icon:"🏭", big:"5.4%", mid:"PPI YoY", sub:"Hotter than 5.3%" },
  ],
  quote: "Higher yields hurt assets that pay no coupon. Do not mash gold ounces with liquidation speed. Next: CPI.",
  noteSub: "$80,000 is psychology, not a fundamental switch. Whether spot ETF outflows persist is the medium-term signal. Bitcoin is a liquidity and discount-rate asset over years.",
  footer: "BTC · 77k zone",
});

add("gold-safe", "L2", "GOLD", {
  badge: "금", title: "금이 온스 약 4,365달러권에서 4,400달러 아래에 머물렀습니다",
  heroIcon: "🥇", heroBig: "4,365",
  heroSub: "현물 금은 온스당 약 4,365달러권으로 거론됐습니다. 10년물 4.92%가 실질금리 부담입니다. 8월 금 ETF 유입 180억 달러와 하루 가격을 나누시기 바랍니다.",
  cards: [
    { label:"온스", big:"4,365", mid:"현물 달러", sub:"4,400 아래" },
    { label:"금리", big:"4.92%", mid:"미국 10년", sub:"실질금리 축" },
    { label:"ETF", big:"$18B", mid:"8월 유입", sub:"하루 가격과 시계가 다름" },
  ],
  detailHead: "헤지와 하루 가격을 나누면",
  detailLines: ["📍 온스는 현물 칸입니다","📈 금리가 기회비용을 키움","🛢️ 유가 101달러와 같은 헤지 아님"],
  noteSub: "금은 비트코인보다 느린 헤지입니다. 브렌트 100달러 돌파와 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 소비자물가입니다. 장기적으로 실질금리가 해자입니다.",
  footer: "금 · 온스 4,365",
}, {
  badge: "Gold", title: "Gold sat near $4,365 an ounce, still below $4,400",
  heroIcon: "🥇", heroBig: "4,365",
  heroSub: "Spot gold was cited near $4,365 an ounce. The 10-year at 4.92% is the real-yield load. Split August gold-ETF inflows of $18B from the one-day print.",
  cards: [
    { label:"Ounce", big:"4,365", mid:"Spot dollars", sub:"Below 4,400" },
    { label:"Yield", big:"4.92%", mid:"U.S. 10-year", sub:"Real-yield axis" },
    { label:"ETF", big:"$18B", mid:"August inflow", sub:"A different clock than today" },
  ],
  detailHead: "Split hedge from the print",
  detailLines: ["📍 The ounce is a spot cell","📈 Yields raise opportunity cost","🛢️ Brent $101 is not the same hedge"],
  noteSub: "Gold is a slower hedge than bitcoin. Do not mash with Brent’s break of $100. Next: CPI. Real yields are the long moat.",
  footer: "Gold · $4,365",
});

add("eth-safe", "L3", "ETH", {
  badge: "이더리움", title: "이더리움이 약 2,460달러권에서 비트코인 베타를 따라갔습니다",
  heroIcon: "💠", heroBig: "2,460",
  heroSub: "이더리움은 스마트계약 네트워크의 토큰입니다. 약 2,460달러권으로 비트코인보다 조금 더 약할 수 있습니다. 알트 레버리지부터 가격과 빌린 돈을 구분해 보시면 됩니다.",
  cards: [
    { icon:"💵", big:"~2,460", mid:"달러 구간", sub:"집계마다 조금 다름" },
    { icon:"₿", big:"BTC", mid:"베타", sub:"할인율이 같이 움직임" },
    { icon:"📉", big:"레버", mid:"알트 포지션", sub:"먼저 줄일 칸" },
  ],
  quote: "이더리움은 비트코인 할인의 증폭일 수 있습니다. 금 헤지와 한 칸에 넣지 마시기 바랍니다. 다음 확인할 것은 소비자물가입니다.",
  noteSub: "네트워크 수수료·스테이킹은 중기 칸입니다. 오늘 가격은 할인율 베타입니다. 장기적으로 스마트계약 수요가 해자입니다.",
  footer: "이더리움 · 2,460권",
}, {
  badge: "Ether", title: "Ether near $2,460 followed bitcoin beta",
  heroIcon: "💠", heroBig: "2,460",
  heroSub: "Ether is the token of a smart-contract network. Near $2,460 it can print a bit weaker than bitcoin. Cut alt leverage first.",
  cards: [
    { icon:"💵", big:"~2,460", mid:"Dollar zone", sub:"Feeds differ slightly" },
    { icon:"₿", big:"BTC", mid:"Beta", sub:"Discount rates move together" },
    { icon:"📉", big:"Lev", mid:"Alt positions", sub:"The first cell to cut" },
  ],
  quote: "Ether can amplify bitcoin’s discount. Do not mash with a gold hedge. Next: CPI.",
  noteSub: "Fees and staking stay medium-term. Today’s print is discount-rate beta. Smart-contract demand is the long moat.",
  footer: "ETH · 2,460 zone",
});

add("oil-safe", "L6", "OIL", {
  badge: "BREAKING", breaking: "브렌트 101.21",
  title: "브렌트가 101.21달러로 7월 23일 이후 처음 종가 100달러를 넘었습니다",
  heroBig: "101.21",
  heroSub: "브렌트 101.21달러는 7월 23일 이후 첫 종가 100달러입니다.",
  grid: [
    { icon:"🛢️", big:"101.21", mid:"브렌트 종가", sub:"+3.36%" },
    { icon:"📅", big:"7/23", mid:"직전 100달러", sub:"종가 기준" },
    { icon:"🇺🇸", big:"WTI", mid:"96달러권", sub:"미국 기준유" },
    { icon:"🌍", big:"중동", mid:"지정학 프리미엄", sub:"재고와 칸을 나눔" },
  ],
  ctx1: "유가 상승은 생산자물가 5.4%와 같은 화면에 있어도 원인이 확정은 아닙니다.",
  ctx2: "금·비트코인 헤지와 같은 칸에 두지 마시기 바랍니다.",
  quote: "101.21달러는 종가입니다. 재고와 외교 일정을 분리하시기 바랍니다. 다음 확인할 것은 주간 재고입니다.",
  noteSub: "유가는 인플레 입력이지 안전자산이 아닙니다. 10년 4.92%와 한 문장의 헤지로 따로 보시면 됩니다. 장기적으로 공급 차질이 지속되면 에너지 비중이 커집니다.",
  footer: "원유 · 브렌트 101.21",
}, {
  badge: "BREAKING", breaking: "BRENT 101.21",
  title: "Brent closed $101.21, the first close above $100 since July 23",
  heroBig: "101.21",
  heroSub: "Brent is the international crude marker. It rose $3.29 (+3.36%) to $101.21. A close above $100 is the first since July 23.",
  grid: [
    { icon:"🛢️", big:"101.21", mid:"Brent close", sub:"+3.36%" },
    { icon:"📅", big:"7/23", mid:"Last $100 close", sub:"Close basis" },
    { icon:"🇺🇸", big:"WTI", mid:"High-96s", sub:"U.S. marker" },
    { icon:"🌍", big:"ME", mid:"Geopolitics premium", sub:"Split from inventories" },
  ],
  ctx1: "Oil can share a screen with PPI 5.4% without being a proven cause.",
  ctx2: "Do not park it in the same cell as gold or bitcoin hedges.",
  quote: "$101.21 is a close. Split inventories from diplomacy. Next: weekly stocks.",
  noteSub: "Oil is an inflation input, not a safe asset. Do not mash with the 10-year at 4.92% as one hedge. Lasting supply shocks can lift energy weights over years.",
  footer: "Oil · Brent 101.21",
});

add("rates-safe", "L1", "RATES", {
  badge: "금리", title: "미국 10년물이 4.92%로 오르고 생산자물가는 5.4%로 예상을 웃돌았습니다",
  heroIcon: "📈", heroBig: "4.92%",
  heroSub: "10년물 금리는 하루 +0.08%포인트로 4.92%입니다. 2023년 10월 이후 최고권입니다. 8월 생산자물가는 전년 대비 5.4%로 예상 5.3%를 웃돌았습니다.",
  cards: [
    { icon:"📈", big:"4.92%", mid:"10년물", sub:"하루 +0.08%p" },
    { icon:"🏭", big:"5.4%", mid:"생산자물가", sub:"예상 5.3%" },
    { icon:"📅", big:"9/16", mid:"정책 회의", sub:"소비자물가가 앞섬" },
  ],
  quote: "바이백 규모와 금리 상승을 한 줄의 완화로 따로 보시면 됩니다. 금·비트코인 할인율과 다른 화면의 숫자입니다. 다음 확인할 것은 소비자물가입니다.",
  noteSub: "4.92%는 시장 가격입니다. 5.4%는 물가 통계입니다. 장기적으로 할인율이 높으면 성장 자산 배수가 낮아집니다.",
  footer: "금리 · 10년 4.92%",
}, {
  badge: "Rates", title: "The U.S. 10-year printed 4.92% as PPI came in at 5.4% versus 5.3%",
  heroIcon: "📈", heroBig: "4.92%",
  heroSub: "The 10-year rose 0.08 percentage point to 4.92%, highest since October 2023. August PPI was 5.4% YoY versus 5.3% expected.",
  cards: [
    { icon:"📈", big:"4.92%", mid:"10-year", sub:"+0.08 pp on the day" },
    { icon:"🏭", big:"5.4%", mid:"PPI YoY", sub:"Vs 5.3% expected" },
    { icon:"📅", big:"9/16", mid:"Policy meeting", sub:"CPI prints first" },
  ],
  quote: "Do not mash buyback size with the yield rise as “easing.” Split gold and bitcoin discounts. Next: CPI.",
  noteSub: "4.92% is a market price. 5.4% is a price statistic. A higher discount rate can compress growth multiples over years.",
  footer: "Rates · 10-year 4.92%",
});

add("summary-krre", "ROWS", "POLICY", {
  headline: "2026.09.11 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"서울", title:"9월 1주 서울 아파트 매매가 0.20%, 전세가 0.19% 올랐습니다",
      sub:"오름폭은 한 주 전보다 줄었습니다. 강남과 강북 온도가 갈렸습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"강남3", title:"강남·서초·송파 매매가 모두 내렸습니다",
      sub:"강남 −0.35%·서초 −0.30%·송파 −0.02%입니다. 서울 평균과 칸을 나눕니다." },
    { color:"#38bdf8", fill:"#061520", right:"강북", title:"강북 14개구 매매는 0.33% 올랐습니다",
      sub:"강북구 0.46%·도봉 0.43%입니다. 강남 약세와 키를 맞추시기 바랍니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"전세", title:"노원 전세가 0.38% 오르고 서초 전세는 0.21% 내렸습니다",
      sub:"강남 전세 −0.03%입니다. 도시 평균만 보고 계약하지 마시기 바랍니다." },
    { color:"#22d3ee", fill:"#06171c", right:"공급", title:"브라운스톤 목동은 전체 85세대, 일반분양은 29세대입니다",
      sub:"계약은 9월 11~12일입니다. 서울 공급 가뭄과 한 단지를 따로 보시면 됩니다." },
    { color:"#4ade80", fill:"#061209", right:"입주", title:"서초 전세 약세는 잠원·반포 입주 영향으로 설명됐습니다",
      sub:"4주 연속 하락입니다. 매매 약세와 다른 화면의 숫자입니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"계약", title:"구별 실거래와 전세대출 한도가 계약 관문입니다",
      sub:"노룩 계약은 거절하시기 바랍니다." },
  ],
  caption: "더 볼 것: 서울 매매 +0.20% · 강남 −0.35% · 노원 전세 +0.38% · 목동 85세대 · 일반 29",
}, {
  headline: "2026.09.11 Korea RE Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"Seoul", title:"Seoul flats rose 0.20% in sales and 0.19% in jeonse in week 1 of September",
      sub:"Gains slowed versus the prior week. Gangnam and Gangbuk split." },
    { color:"#fb7185", fill:"#1a0a10", right:"GN3", title:"Gangnam, Seocho, and Songpa sale prices all fell",
      sub:"Gangnam −0.35%, Seocho −0.30%, Songpa −0.02%. Split from the city average." },
    { color:"#38bdf8", fill:"#061520", right:"North", title:"The 14 northern districts rose 0.33% in sales",
      sub:"Gangbuk-gu 0.46%, Dobong 0.43%. Match keys with Gangnam softness." },
    { color:"#fb923c", fill:"#1a0d02", right:"Jeonse", title:"Nowon jeonse rose 0.38% while Seocho jeonse fell 0.21%",
      sub:"Gangnam jeonse −0.03%. Do not sign on a city average alone." },
    { color:"#22d3ee", fill:"#06171c", right:"Supply", title:"Brownstone Mokdong is 85 homes, 29 of them general sale",
      sub:"Contracts Sep 11–12. Do not mash one complex with a city drought." },
    { color:"#4ade80", fill:"#061209", right:"Move-in", title:"Seocho jeonse softness was tied to Jamwon/Banpo move-ins",
      sub:"A fourth down week. Split from sale softness." },
    { color:"#94a3b8", fill:"#0c1017", right:"Contract", title:"Gu-level prints and jeonse-loan caps are the contract gate",
      sub:"Refuse no-look contracts." },
  ],
  caption: "Watch: Seoul sales +0.20% · Gangnam −0.35% · Nowon jeonse +0.38% · Mokdong 85 · general 29",
});

add("seoul-split-krre", "L5", "POLICY", {
  badge: "서울", title: "서울 매매 0.20% 상승 안에 강북 0.33%와 강남3구 동반 하락이 갈렸습니다",
  heroIcon: "⚖️", heroBig: "키맞춤",
  heroSub: "9월 1주(9월 7일) 서울 매매는 0.20% 올랐지만 오름폭은 줄었습니다. 강북 14개구는 0.33% 올랐고 강남3구는 모두 내렸습니다.",
  before: { label:"강북 14", big:"+0.33%", sub:"매매 주간" },
  after: { label:"강남3구", big:"하락", sub:"세 구 모두" },
  cards: [
    { icon:"📊", big:"+0.20%", mid:"서울 매매", sub:"전주 0.22%에서 둔화" },
    { icon:"🏙", big:"+0.19%", mid:"서울 전세", sub:"전주 0.21%에서 둔화" },
    { icon:"🧭", big:"온도", mid:"강남 약·강북 강", sub:"평균만 보면 오독" },
  ],
  quote: "도시 평균은 구별 키를 가립니다. 강남 약세를 서울 하락으로 아직 그 단계는 아닙니다. 다음 확인할 것은 구별 실거래입니다.",
  noteSub: "세제 불확실성이 강남 고가에 더 붙었다는 설명이 있습니다. 전세 노원·서초와 다른 화면의 숫자입니다. 장기적으로 학군·직주 수요가 가격보다 느린 축입니다.",
  footer: "서울 · 강남·강북 키맞춤",
}, {
  badge: "Seoul", title: "Inside Seoul’s +0.20% sale print, the north rose 0.33% while the Gangnam 3 all fell",
  heroIcon: "⚖️", heroBig: "Split",
  heroSub: "In week 1 of September (as of Sep 7) Seoul sales rose 0.20% but the gain slowed. The 14 northern districts rose 0.33%; the Gangnam 3 all fell.",
  before: { label:"North 14", big:"+0.33%", sub:"Weekly sales" },
  after: { label:"Gangnam 3", big:"Down", sub:"All three gus" },
  cards: [
    { icon:"📊", big:"+0.20%", mid:"Seoul sales", sub:"Slower than last week’s 0.22%" },
    { icon:"🏙", big:"+0.19%", mid:"Seoul jeonse", sub:"Slower than last week’s 0.21%" },
    { icon:"🧭", big:"Temp", mid:"South soft, north firm", sub:"Averages mislead" },
  ],
  quote: "A city average hides gu keys. Do not read Gangnam softness as a Seoul drop. Next: gu-level prints.",
  noteSub: "Tax uncertainty was cited more on expensive Gangnam stock. Split Nowon/Seocho jeonse. School and commute demand is a slower axis than price over years.",
  footer: "Seoul · north/south split",
});

add("gangnam3-down-krre", "L1", "POLICY", {
  badge: "강남", title: "강남구 −0.35%, 서초 −0.30%, 송파 −0.02%로 강남3구 매매가 모두 내렸습니다",
  heroIcon: "📉", heroBig: "3구",
  heroSub: "강남구는 압구정·대치 대단지 중심으로 5주 연속 하락입니다. 서초는 낙폭이 커졌고, 송파는 21주 만에 하락 전환입니다.",
  cards: [
    { icon:"📍", big:"−0.35%", mid:"강남구 매매", sub:"5주 연속" },
    { icon:"📍", big:"−0.30%", mid:"서초구 매매", sub:"낙폭 확대" },
    { icon:"📍", big:"−0.02%", mid:"송파구 매매", sub:"21주 만에 하락" },
  ],
  quote: "세 구가 같이 내렸다고 서울 전체가 내린 것은 아닙니다. 강북 +0.33%와 키를 맞추시기 바랍니다. 다음 확인할 것은 호가 조정 매물입니다.",
  noteSub: "고가·비거주 세제 불확실성이 거론됐습니다. 전세 서초 −0.21%와 매매를 한 원인으로 묶지 마시기 바랍니다. 장기적으로 재건축 일정이 가격보다 느린 축입니다.",
  footer: "강남3구 · 동반 하락",
}, {
  badge: "Gangnam", title: "Gangnam −0.35%, Seocho −0.30%, Songpa −0.02%: all three sale prints fell",
  heroIcon: "📉", heroBig: "3 gus",
  heroSub: "Gangnam-gu is on a fifth down week around Apgujeong/Daechi large complexes. Seocho’s drop widened; Songpa turned down for the first time in 21 weeks.",
  cards: [
    { icon:"📍", big:"−0.35%", mid:"Gangnam-gu sales", sub:"Fifth week down" },
    { icon:"📍", big:"−0.30%", mid:"Seocho sales", sub:"Drop widened" },
    { icon:"📍", big:"−0.02%", mid:"Songpa sales", sub:"First down week in 21" },
  ],
  quote: "Three gus down is not a Seoul-wide drop. Match keys with the north at +0.33%. Next: asking-price cuts that actually trade.",
  noteSub: "Tax uncertainty on expensive and non-resident stock was cited. Do not mash Seocho jeonse −0.21% as the same cause. Rebuild calendars are slower than price over years.",
  footer: "Gangnam 3 · all down",
});

add("nowon-jeonse-krre", "L2", "JEONSE", {
  badge: "전세", title: "노원 전세가 0.38% 오르고 서초 전세는 0.21% 내렸습니다",
  heroIcon: "🔑", heroBig: "0.38%",
  heroSub: "서울 전세는 0.19% 올랐지만 구별 키가 갈렸습니다. 노원은 중계·상계 대단지, 서초는 잠원·반포 입주 영향입니다. 강남 전세는 0.03% 내렸습니다.",
  cards: [
    { label:"노원", big:"+0.38%", mid:"전세 주간", sub:"중계·상계 대단지" },
    { label:"서초", big:"−0.21%", mid:"전세 주간", sub:"잠원·반포 입주" },
    { label:"강남", big:"−0.03%", mid:"전세 주간", sub:"대치·압구정" },
  ],
  detailHead: "전세를 구별로 나누면",
  detailLines: ["📍 도시 평균 0.19%는 가림막입니다","🏗 서초는 입주 물량 칸","💵 대출 한도 없이 계약하지 말 것"],
  noteSub: "전세 오름과 매매 약세를 한 신호로 묶지 마시기 바랍니다. 가을 이사에 한도 조회가 관문입니다. 장기적으로 입주 캘린더가 전세 키를 결정합니다.",
  footer: "전세 · 노원 vs 서초",
}, {
  badge: "Jeonse", title: "Nowon jeonse rose 0.38% while Seocho jeonse fell 0.21%",
  heroIcon: "🔑", heroBig: "0.38%",
  heroSub: "Seoul jeonse rose 0.19% but gus split. Nowon was Junggye/Sanggye large complexes; Seocho was Jamwon/Banpo move-ins. Gangnam jeonse fell 0.03%.",
  cards: [
    { label:"Nowon", big:"+0.38%", mid:"Weekly jeonse", sub:"Junggye/Sanggye" },
    { label:"Seocho", big:"−0.21%", mid:"Weekly jeonse", sub:"Jamwon/Banpo move-in" },
    { label:"Gangnam", big:"−0.03%", mid:"Weekly jeonse", sub:"Daechi/Apgujeong" },
  ],
  detailHead: "Split jeonse by gu",
  detailLines: ["📍 The 0.19% city average hides keys","🏗 Seocho is a move-in cell","💵 Do not sign without a loan cap"],
  noteSub: "Do not mash rising jeonse with softer sales as one signal. Loan-cap checks are the autumn-move gate. Move-in calendars set jeonse keys over years.",
  footer: "Jeonse · Nowon vs Seocho",
});

add("seoul-supply-krre", "L6", "POLICY", {
  badge: "BREAKING", breaking: "목동 85세대",
  title: "브라운스톤 목동이 전체 85세대 중 일반분양 29세대로 계약을 받습니다",
  heroBig: "85",
  heroSub: "양천구 목동 신축 후분양입니다. 전체 85세대 중 일반 29세대이며 계약은 9월 11~12일입니다.",
  grid: [
    { icon:"🏠", big:"85", mid:"전체 세대", sub:"단지 규모" },
    { icon:"🎫", big:"29", mid:"일반분양", sub:"실제 접근 물량" },
    { icon:"📅", big:"11–12", mid:"9월 계약", sub:"당첨 9월 8일" },
    { icon:"🔑", big:"2027.1", mid:"입주 예정", sub:"후분양" },
  ],
  ctx1: "서울 한 달 공급이 이 단지에 가깝다는 설명이 있습니다. 29와 85를 나누시기 바랍니다.",
  ctx2: "임의공급이라 청약통장 가점이 없습니다. 추첨입니다.",
  quote: "85세대는 단지 규모이고 29세대가 일반 창입니다. 강남3구 매매 하락과 한 신호로 묶지 마시기 바랍니다. 다음 확인할 것은 계약률입니다.",
  noteSub: "후분양은 공정을 보고 들어갑니다. 전세 노원 상승과 다른 화면의 숫자입니다. 장기적으로 서울 입주 가뭄이 전세 키를 밀어 올릴 수 있습니다.",
  footer: "공급 · 목동 85세대",
}, {
  badge: "BREAKING", breaking: "MOKDONG 85",
  title: "Brownstone Mokdong takes contracts on 29 general-sale homes out of 85",
  heroBig: "85",
  heroSub: "A Yangcheon Mokdong after-sale new build. Of 85 homes, 29 are general sale, 36 association, 18 rental, 2 reserved. Contracts Sep 11–12; move-in January 2027.",
  grid: [
    { icon:"🏠", big:"85", mid:"Total homes", sub:"Complex size" },
    { icon:"🎫", big:"29", mid:"General sale", sub:"The accessible slice" },
    { icon:"📅", big:"11–12", mid:"Sep contracts", sub:"Winners Sep 8" },
    { icon:"🔑", big:"2027.1", mid:"Move-in", sub:"After-sale" },
  ],
  ctx1: "Seoul’s monthly supply was described as close to this one complex. Split 29 general from 85 total.",
  ctx2: "It is a lottery, not a subscription-account points sale.",
  quote: "85 is complex size; 29 is the general window. Do not mash with Gangnam-3 sale drops. Next: the contract rate.",
  noteSub: "After-sale means you can see the build. Split from Nowon jeonse gains. A Seoul move-in drought can lift jeonse keys over years.",
  footer: "Supply · Mokdong 85",
});

};
