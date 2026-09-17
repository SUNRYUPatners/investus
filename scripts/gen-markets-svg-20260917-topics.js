/* KR / Safe / KR-RE topics for 2026-09-17 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.17 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,717.97", title:"코스피가 5거래일 만에 반등해 6,717.97로 마감했습니다",
      sub:"전일보다 90.71포인트(1.37%) 올랐고, 기관이 1조2,117억 원을 순매수했습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"+2.01%", title:"삼성전자가 25만3,500원으로 나흘 하락을 끊었습니다",
      sub:"외국인은 4,906억 원을 팔았지만 기관이 4,121억 원을 받아냈습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"+4.08%", title:"SK하이닉스가 175만9,000원으로 올라 반등을 이끌었습니다",
      sub:"임단협 재합의안이 찬성 57.08%로 가결됐고 미국 생산 검토 소식도 나왔습니다." },
    { color:"#34d399", fill:"#052015", right:"2조7,000억", title:"삼성바이오로직스가 폴리펩타이드 공개매수에 들어갔습니다",
      sub:"10월 12일까지 진행되며 최대주주 55.65%가 응모를 확약했습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"−1.36%", title:"현대차는 36만2,000원으로 내려 반도체 강세와 갈렸습니다",
      sub:"지수 상승에도 하락 종목이 578개로 더 많았습니다." },
  ],
  caption: "더 볼 것: 코스피 6,717.97 · 삼성전자 +2.01% · 하이닉스 +4.08% · 삼성바이오 공개매수 · 현대차 −1.36%",
}, {
  headline: "2026.09.17 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,717.97", title:"KOSPI rebounded after five sessions to close at 6,717.97",
      sub:"Up 90.71 points (1.37%) as institutions bought ₩1.21T." },
    { color:"#60a5fa", fill:"#0a1420", right:"+2.01%", title:"Samsung Electronics snapped a four-day drop at 253,500 won",
      sub:"Foreigners sold ₩490.6B but institutions bought ₩412.1B." },
    { color:"#f59e0b", fill:"#1a1205", right:"+4.08%", title:"SK Hynix led the rebound, closing at 1,759,000 won",
      sub:"A labor deal passed with 57.08% support and US-plant talks surfaced." },
    { color:"#34d399", fill:"#052015", right:"₩2.7T", title:"Samsung Biologics launched a tender offer for PolyPeptide",
      sub:"It runs through Oct 12, with the 55.65% controlling stake pledged." },
    { color:"#fb7185", fill:"#1a0a10", right:"-1.36%", title:"Hyundai Motor fell to 362,000 won, diverging from chips",
      sub:"Decliners still outnumbered advancers 578 to 304." },
  ],
  caption: "Watch: KOSPI 6,717.97 · Samsung +2.01% · Hynix +4.08% · Bio tender · Hyundai -1.36%",
});

add("kospi-5day-rebound-6718", "L6", "KOSPI", {
  badge: "코스피", title: "코스피가 반도체 저가매수에 힘입어 5거래일 만에 반등해 6,717.97로 마감했습니다",
  breaking: "5거래일 만에 반등 · +1.37%",
  heroBig: "6,717.97", heroSub: "9월 16일 종가로 전 거래일보다 90.71포인트(1.37%) 올랐습니다. 외국인이 1조6,826억 원을 팔았지만 기관이 1조2,117억 원을 사들이며 지수를 받쳤습니다.",
  grid: [
    { icon:"🏦", big:"+1조2,117억", mid:"기관 순매수", sub:"유가증권시장 홀로 매수" },
    { icon:"🌍", big:"−1조6,826억", mid:"외국인 순매도", sub:"6거래일 연속 매도" },
    { icon:"👤", big:"−1조1,864억", mid:"개인 순매도", sub:"차익실현 매물" },
    { icon:"💱", big:"1,368.6원", mid:"원·달러 환율", sub:"전일보다 9.2원 상승" },
  ],
  ctx1: "상승 종목 304개, 하락 종목 578개로 지수는 올랐지만 종목별로는 차별화 장세였습니다.",
  ctx2: "코스닥도 3.57포인트 오른 815.98로 마감해 양대 지수가 함께 반등했습니다.",
  quote: "대신증권은 지난 14일 급락으로 반도체 대형주의 단기 부담이 완화됐고, 저가 매수세가 유입됐다고 설명했습니다.",
  noteHead: "왜 중요한가", noteSub: "코스피가 나흘 연속 하락을 끊은 것은 반도체 대형주가 지수를 끌어올린 결과입니다. 다만 외국인 매도가 6거래일째 이어지고 환율이 1,368.6원까지 오른 점은 반등의 폭을 제한할 수 있습니다. 다음 거래일에도 기관 매수가 이어지는지, 미국 금리 인상 이후 외국인 흐름이 바뀌는지를 확인하면 됩니다.",
  footer: "코스피 · 5거래일 반등",
}, {
  badge: "KOSPI", title: "KOSPI rebounded after five sessions to 6,717.97 as bargain hunters returned to chip giants",
  breaking: "First bounce in 5 sessions · +1.37%",
  heroBig: "6,717.97", heroSub: "Sept 16 close, up 90.71 points (1.37%). Foreigners sold ₩1.68T but institutions bought ₩1.21T to support the index.",
  grid: [
    { icon:"🏦", big:"+₩1.21T", mid:"Institutional buying", sub:"The only net buyer on KOSPI" },
    { icon:"🌍", big:"-₩1.68T", mid:"Foreign selling", sub:"A 6th straight day of sales" },
    { icon:"👤", big:"-₩1.19T", mid:"Retail selling", sub:"Profit-taking after the drop" },
    { icon:"💱", big:"₩1,368.6", mid:"USD/KRW", sub:"Up 9.2 won on the day" },
  ],
  ctx1: "Advancers 304 vs decliners 578 — the index rose but most stocks did not.",
  ctx2: "KOSDAQ also rose 3.57 points to 815.98, so both boards bounced together.",
  quote: "Daishin Securities said the Sept 14 plunge eased near-term valuation pressure on chip giants, inviting bargain buying.",
  noteHead: "Why it matters", noteSub: "KOSPI's bounce after four down days was driven by a handful of semiconductor heavyweights. Foreign selling into a sixth day and the won at 1,368.6 still cap how far the rebound can run. Next: watch whether institutions keep buying and how foreigners react after the Fed hike.",
  footer: "KOSPI · 5-session rebound",
});

add("samsung-electronics-253500", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 25만3,500원으로 나흘 하락을 끊고 2.01% 올랐습니다",
  heroIcon: "📱", heroBig: "25만3,500원",
  heroSub: "9월 16일 종가로 전일보다 5,000원(2.01%) 올랐습니다. 장중 고가는 25만4,000원, 저가는 24만7,500원이었습니다.",
  cards: [
    { icon:"🌍", big:"−4,906억", mid:"외국인 순매도", sub:"이틀 연속 매도" },
    { icon:"🏦", big:"+4,121억", mid:"기관 순매수", sub:"저가매수로 하단 지지" },
    { icon:"💼", big:"1482조", mid:"시가총액", sub:"거래대금 2조8,191억" },
  ],
  quote: "신한투자증권은 미국 반도체주 반등과 국내 반도체 관련 호재가 저가 매수로 이어졌다고 평가했습니다.",
  noteHead: "왜 중요한가", noteSub: "삼성전자는 코스피 시가총액 1위라 이 종목의 반등이 지수 전체를 끌어올립니다. 외국인은 팔았지만 기관이 받아내며 나흘 하락을 끊었습니다. 다음에 확인할 것은 외국인 매도가 멈추는지, 그리고 3분기 HBM 출하 가이던스가 어떻게 나오는지입니다.",
  footer: "삼성전자 · 주가",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics snapped a four-day drop, closing 2.01% higher at 253,500 won",
  heroIcon: "📱", heroBig: "₩253,500",
  heroSub: "Sept 16 close, up 5,000 won (2.01%). The session high was 254,000 won and the low 247,500 won.",
  cards: [
    { icon:"🌍", big:"-₩491B", mid:"Foreign selling", sub:"A second day of sales" },
    { icon:"🏦", big:"+₩412B", mid:"Institutional buying", sub:"Bargain hunters held the floor" },
    { icon:"💼", big:"₩1,482T", mid:"Market cap", sub:"Turnover ₩2.82T" },
  ],
  quote: "Shinhan Investment said a rebound in US chip stocks plus local semiconductor news brought bargain buyers back.",
  noteHead: "Why it matters", noteSub: "Samsung is KOSPI's largest stock, so its bounce lifts the whole index. Foreigners sold but institutions absorbed the flow and ended a four-day slide. Next: watch whether foreign selling stops and how Q3 HBM shipment guidance comes in.",
  footer: "Samsung Electronics · Stock",
});

add("sk-hynix-labor-intel", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 임단협 가결과 미국 생산 검토 소식에 4.08% 올라 175만9,000원으로 마감했습니다",
  heroIcon: "💾", heroBig: "175만9,000원",
  heroSub: "9월 16일 종가로 전일보다 6만9,000원(4.08%) 올랐습니다. 장중 고가는 176만 원에 바짝 다가섰습니다.",
  cards: [
    { label:"임단협", big:"57.08%", mid:"재합의안 찬성률", sub:"현금·주식 성과급 50:50" },
    { label:"미국 생산", big:"인텔 공장", mid:"오하이오 임대 검토", sub:"실현되면 첫 미국 메모리" },
    { label:"수급", big:"−4,406억", mid:"외국인 순매도", sub:"기관은 +3,676억 매수" },
  ],
  detailHead: "하루에 겹친 두 가지 소식",
  detailLines: [
    "전임직 노조 1만5,297명이 투표해 재합의안을 가결했습니다. 투표율은 95.37%입니다.",
    "초과이익분배금(PS)의 현금 비중을 40%에서 50%로 올려 3주 만에 타결됐습니다.",
    "오후에는 인텔 오하이오 공장을 빌려 미국 내 메모리 생산을 검토한다는 보도가 나왔습니다.",
  ],
  quote: "첫 잠정합의안은 25표 차로 부결됐지만, 현금 비중을 10%포인트 높인 수정안은 찬성률이 7%포인트 올랐습니다.",
  noteHead: "왜 중요한가", noteSub: "노사 갈등이 추석 전에 정리되면 생산 차질 우려가 줄어듭니다. 인텔 공장 임대는 아직 논의 단계지만, 실현되면 SK하이닉스의 첫 미국 내 메모리 생산이 됩니다. 다음에 확인할 것은 구체 계약 공개 시점과 외국인 매도가 멈추는지입니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "SK HYNIX", title: "SK Hynix jumped 4.08% to 1,759,000 won after a labor deal passed and US-plant talks surfaced",
  heroIcon: "💾", heroBig: "₩1,759,000",
  heroSub: "Sept 16 close, up 69,000 won (4.08%). The session high nearly reached 1,760,000 won.",
  cards: [
    { label:"Labor deal", big:"57.08%", mid:"Yes vote on the revised pact", sub:"Cash/stock bonus split 50:50" },
    { label:"US output", big:"Intel plant", mid:"Ohio lease under review", sub:"Would be first US memory line" },
    { label:"Flows", big:"-₩441B", mid:"Foreign selling", sub:"Institutions bought ₩368B" },
  ],
  detailHead: "Two headlines in one session",
  detailLines: [
    "15,297 production-line union members voted, a 95.37% turnout.",
    "Cash in the profit-sharing bonus rose from 40% to 50%, ending a three-week standoff.",
    "In the afternoon, reports said SK Hynix is exploring leasing Intel's Ohio plant.",
  ],
  quote: "The first tentative deal failed by 25 votes; lifting the cash share by 10 points raised the yes vote by 7 points.",
  noteHead: "Why it matters", noteSub: "Settling labor talks before the holiday week reduces production-disruption risk. Leasing Intel's plant is still only talks, but it would be SK Hynix's first memory output on US soil. Next: watch for a concrete contract and whether foreign selling stops.",
  footer: "SK Hynix · Stock",
});

add("samsung-bio-polypeptide", "L3", "BIO", {
  badge: "삼성바이오로직스", title: "삼성바이오로직스가 스위스 폴리펩타이드그룹 공개매수에 들어가 펩타이드 CDMO 인수를 가속합니다",
  heroIcon: "🧬", heroBig: "약 2조7,000억 원",
  heroSub: "펩타이드 CDMO는 단백질 조각 약을 대신 개발·생산해 주는 사업입니다. 공개매수는 10월 12일까지 진행됩니다.",
  cards: [
    { icon:"🇨🇭", big:"44.31프랑", mid:"주당 매수가격", sub:"전량 응모 시 14.6억 프랑" },
    { icon:"📝", big:"55.65%", mid:"최대주주 응모 확약", sub:"드라우프니르 홀딩 지분" },
    { icon:"📅", big:"11월 말", mid:"최종 인수 목표", sub:"이후 상장폐지 추진" },
  ],
  quote: "회사는 펩타이드 위탁개발생산 역량을 가져와 바이오 의약품 생산 범위를 넓히겠다고 밝혔습니다.",
  noteHead: "왜 중요한가", noteSub: "공개매수는 이미 7월에 맺은 인수 계약의 후속 절차입니다. 최대주주가 지분 전량 응모를 약속해 인수 성공 가능성이 높아졌습니다. 지분 90%를 넘기면 남은 소수주주 지분도 강제매수할 수 있습니다. 10월 12일 응모 결과와 11월 말 종결 여부를 확인하면 됩니다.",
  footer: "삼성바이오로직스 · 인수",
}, {
  badge: "SAMSUNG BIO", title: "Samsung Biologics launched a tender offer for Switzerland's PolyPeptide Group to speed a peptide CDMO deal",
  heroIcon: "🧬", heroBig: "About ₩2.7T",
  heroSub: "A peptide CDMO develops and makes fragment-based medicines for other drug firms. The offer runs through Oct 12.",
  cards: [
    { icon:"🇨🇭", big:"CHF 44.31", mid:"Offer price per share", sub:"CHF 1.46B if fully tendered" },
    { icon:"📝", big:"55.65%", mid:"Controller pledged in", sub:"Draupnir Holding's stake" },
    { icon:"📅", big:"Late November", mid:"Target close", sub:"Then a delisting push" },
  ],
  quote: "The company said the deal would broaden its biologics manufacturing into peptide contract development.",
  noteHead: "Why it matters", noteSub: "The tender follows a July purchase agreement. The controlling shareholder pledged its entire stake, raising the odds the deal closes. Crossing 90% ownership would let Samsung squeeze out remaining minorities. Next: the Oct 12 tender result and a late-November close.",
  footer: "Samsung Biologics · Deal",
});

add("hyundai-362000-drop", "L5", "AUTO", {
  badge: "현대차", title: "현대차가 36만2,000원으로 1.36% 내리며 반도체 강세와 다른 방향으로 움직였습니다",
  heroIcon: "🚗", heroBig: "−1.36%",
  heroSub: "9월 16일 종가로 전일보다 5,000원 내린 36만2,000원입니다. 같은 날 코스피는 1.37% 올랐습니다.",
  before: { label:"전일 종가", big:"36만7,000원", sub:"전날 소폭 반등 뒤" },
  after: { label:"16일 종가", big:"36만2,000원", sub:"5,000원(1.36%) 하락" },
  cards: [
    { icon:"📉", big:"−1.36%", mid:"현대차", sub:"시총 상위 하락 대표" },
    { icon:"🚗", big:"12만1,800원", mid:"기아 종가", sub:"애프터마켓은 약보합" },
    { icon:"🛢", big:"유가 부담", mid:"완성차 공통 압력", sub:"연준 인상도 겹침" },
  ],
  quote: "지수는 반도체 대형주가 끌어올렸지만, 현대차처럼 자동차주는 유가·금리 부담이 더 크게 반영됐습니다.",
  noteHead: "왜 중요한가", noteSub: "코스피가 올라도 하락 종목이 더 많은 차별화 장세에서는 업종별로 온도가 갈립니다. 현대차는 미국 현지 생산 기반이 있어 관세 대응력은 있다는 평가를 받습니다. 다음에 확인할 것은 유가와 금리가 진정된 뒤 완성차 주가가 지수와 다시 같은 방향으로 가는지입니다.",
  footer: "현대차 · 주가",
}, {
  badge: "HYUNDAI", title: "Hyundai Motor fell 1.36% to 362,000 won, moving opposite the chip-led KOSPI bounce",
  heroIcon: "🚗", heroBig: "-1.36%",
  heroSub: "Sept 16 close, down 5,000 won to 362,000. KOSPI rose 1.37% the same day.",
  before: { label:"Prior close", big:"₩367,000", sub:"After a modest bounce" },
  after: { label:"Sept 16 close", big:"₩362,000", sub:"Down 5,000 won (1.36%)" },
  cards: [
    { icon:"📉", big:"-1.36%", mid:"Hyundai Motor", sub:"A large-cap decliner" },
    { icon:"🚗", big:"₩121,800", mid:"Kia close", sub:"After-hours slightly weaker" },
    { icon:"🛢", big:"Oil pressure", mid:"Shared auto-sector hit", sub:"Fed hike adds to the load" },
  ],
  quote: "Chips pulled the index higher, but automakers felt oil and rate pressure more directly.",
  noteHead: "Why it matters", noteSub: "When decliners outnumber advancers, sector temperatures split even if the index rises. Hyundai still has US plants that help on tariffs. Next: watch whether auto shares rejoin the index once oil and rates calm.",
  footer: "Hyundai Motor · Stock",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.17 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$75,813", title:"연준 금리 인상 직후 비트코인이 7만5,355달러까지 밀렸다가 되돌렸습니다",
      sub:"발표 한 시간 안에 저점을 찍고 7만5,813달러 근처로 회복했습니다." },
    { color:"#facc15", fill:"#1a1600", right:"$4,324", title:"금 현물은 0.7% 반등해 온스당 4,324달러에 거래됐습니다",
      sub:"달러 약세와 유가 조정에 힘입어 전날 낙폭을 되돌렸습니다." },
    { color:"#818cf8", fill:"#15162a", right:"$2,401", title:"이더리움은 2,400달러 부근에서 4%대 약세를 이어갔습니다",
      sub:"클래리티법 부결 여파와 금리 인상이 겹쳤습니다." },
    { color:"#f97316", fill:"#1a0d02", right:"$102.43", title:"WTI 원유는 3.2% 내려 배럴당 102.43달러로 마감했습니다",
      sub:"전날 100달러 위 급등 뒤 재고 지표가 엇갈리며 숨 고르기에 들어갔습니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"$64.4", title:"은 현물은 장중 1.2% 올라 온스당 64.4달러를 찍었습니다",
      sub:"금과 함께 움직이되 하루 변동 폭은 더 컸습니다." },
  ],
  caption: "더 볼 것: BTC $75,813 · 금 $4,324 · ETH $2,401 · WTI $102.43 · 은 $64.4",
}, {
  headline: "2026.09.17 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$75,813", title:"Bitcoin dipped to $75,355 after the Fed hike, then recovered",
      sub:"It found a low within an hour and bounced near $75,813." },
    { color:"#facc15", fill:"#1a1600", right:"$4,324", title:"Spot gold rebounded 0.7% to $4,324 an ounce",
      sub:"A softer dollar and a pullback in oil helped reverse the prior drop." },
    { color:"#818cf8", fill:"#15162a", right:"$2,401", title:"Ether stayed weak around $2,400, down about 4%",
      sub:"The Clarity Act failure and the rate hike both weighed." },
    { color:"#f97316", fill:"#1a0d02", right:"$102.43", title:"WTI crude fell 3.2% to settle at $102.43 a barrel",
      sub:"After jumping above $100, mixed inventory data prompted a pause." },
    { color:"#94a3b8", fill:"#0c1017", right:"$64.4", title:"Spot silver rose 1.2% intraday to $64.4 an ounce",
      sub:"It tracked gold but with a wider daily swing." },
  ],
  caption: "Watch: BTC $75,813 · gold $4,324 · ETH $2,401 · WTI $102.43 · silver $64.4",
});

add("bitcoin-fed-stabilize", "L2", "BTC", {
  badge: "비트코인", title: "연준 금리 인상 직후 비트코인이 7만5,355달러까지 밀렸다가 7만5,813달러 근처로 되돌렸습니다",
  heroIcon: "₿", heroBig: "$75,813",
  heroSub: "시장은 이미 90% 넘게 인상을 반영하고 있어 발표 자체보다 워시 의장의 물가 발언이 더 크게 읽혔습니다.",
  cards: [
    { label:"저점", big:"$75,355", mid:"발표 후 1시간", sub:"24시간 보합권으로 회복" },
    { label:"주간", big:"약 −4%", mid:"7일 누적", sub:"클래리티법 부결과 겹침" },
    { label:"ETF", big:"−4.5억", mid:"15일 현물 순유출", sub:"블랙록·피델리티 중심" },
  ],
  detailHead: "금리가 오른 뒤에도 버틴 이유",
  detailLines: [
    "선물시장은 이번 0.25%포인트 인상을 이미 90% 넘게 가격에 넣고 있었습니다.",
    "발표 직후 한 시간 안에 저점을 찍고 되돌린 것은 불확실성 해소로 해석됩니다.",
    "다만 18명 중 16명이 연내 추가 인상을 점쳐, 위험자산 할증은 아직 남아 있습니다.",
  ],
  quote: "비트코인 매거진은 결정 발표 후 한 시간 안에 7만5,355달러까지 내려갔다가 7만5,813달러 근처로 회복했다고 전했습니다.",
  noteHead: "왜 중요한가", noteSub: "금리 인상은 이자를 주지 않는 비트코인의 매력을 단기적으로 낮춥니다. 이번엔 이미 가격에 반영돼 있어 충격이 짧았습니다. 다음에 확인할 것은 7만5,000달러 구간이 지켜지는지, 그리고 현물 ETF 순유출이 하루 만에 멈추는지입니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BTC", title: "Bitcoin fell to $75,355 right after the Fed hike, then recovered near $75,813",
  heroIcon: "₿", heroBig: "$75,813",
  heroSub: "Markets had already priced a 90%+ chance of the hike, so Chair Warsh's inflation comments mattered more than the move itself.",
  cards: [
    { label:"Low", big:"$75,355", mid:"First hour after the call", sub:"Back to flat within 24 hours" },
    { label:"Week", big:"About -4%", mid:"Seven-day change", sub:"Overlapped with the Clarity Act miss" },
    { label:"ETFs", big:"-$450M", mid:"Sept 15 spot outflows", sub:"Led by BlackRock and Fidelity" },
  ],
  detailHead: "Why it held after the hike",
  detailLines: [
    "Futures had already priced more than a 90% chance of this 25bp move.",
    "Finding a low within an hour was read as relief that the event was over.",
    "Sixteen of 18 officials still see another hike this year, so risk premia remain.",
  ],
  quote: "Bitcoin Magazine said the price dropped to $75,355 within an hour of the decision, then recovered near $75,813.",
  noteHead: "Why it matters", noteSub: "Rate hikes make a non-yielding asset like bitcoin less attractive in the short run. This time the move was already priced, so the shock was brief. Next: watch whether $75,000 holds and whether spot ETF outflows stop after one day.",
  footer: "Bitcoin · Price",
});

add("gold-rebound-4324", "L1", "GOLD", {
  badge: "금", title: "금 현물이 0.7% 반등해 온스당 4,324달러에 거래되며 전날 낙폭을 되돌렸습니다",
  heroIcon: "🥇", heroBig: "$4,324",
  heroSub: "9월 16일 오후 한국시간 기준으로 전일보다 0.7% 올랐습니다. 12월물 선물은 0.8% 오른 4,365달러였습니다.",
  cards: [
    { icon:"📉", big:"$4,288", mid:"장중 저점", sub:"오전에 0.1% 하락 후 반전" },
    { icon:"💵", big:"달러 약세", mid:"반등 배경", sub:"유가 조정도 함께 작용" },
    { icon:"🏦", big:"4,321", mid:"200일 이동평균", sub:"추세 지지선으로 거론" },
  ],
  quote: "로이터는 연준 결정을 앞두고 4,300달러 부근이던 금값이 이후 4,326달러까지 0.8% 올랐다고 보도했습니다.",
  noteHead: "왜 중요한가", noteSub: "금은 이자를 주지 않아 금리가 오르면 부담을 받습니다. 이번엔 인상이 이미 반영된 뒤라 발표 이후 오히려 되돌림이 나왔습니다. 다음에 확인할 것은 4,321달러 부근 지지가 유지되는지, 그리고 연내 추가 인상 전망이 금 수요를 다시 누르는지입니다.",
  footer: "금 · 시세",
}, {
  badge: "GOLD", title: "Spot gold rebounded 0.7% to $4,324 an ounce, reversing the prior day's slide",
  heroIcon: "🥇", heroBig: "$4,324",
  heroSub: "As of afternoon KST on Sept 16, up 0.7% from the prior day. December futures rose 0.8% to $4,365.",
  cards: [
    { icon:"📉", big:"$4,288", mid:"Intraday low", sub:"Down 0.1% in the morning, then reversed" },
    { icon:"💵", big:"Softer dollar", mid:"Rebound driver", sub:"A pullback in oil helped too" },
    { icon:"🏦", big:"$4,321", mid:"200-day average", sub:"Cited as trend support" },
  ],
  quote: "Reuters reported gold near $4,300 ahead of the Fed, then up 0.8% to $4,326 after the decision.",
  noteHead: "Why it matters", noteSub: "Gold pays no interest, so higher rates are a headwind. This hike was already priced, so the metal bounced after the announcement. Next: watch the $4,321 support area and whether another hike this year weighs on demand again.",
  footer: "Gold · Price",
});

add("ethereum-fed-drop", "L4", "ETH", {
  badge: "이더리움", badgeLine: "\"금리와 규제, 이틀째 겹침\"",
  title: "이더리움이 2,400달러 부근에서 4%대 약세를 이어가며 비트코인보다 더 크게 흔들렸습니다",
  heroIcon: "Ξ", heroBig: "$2,401",
  heroSub: "이더리움은 스마트계약(프로그램처럼 돌아가는 계약)을 쓰는 대표 디지털자산입니다. 클래리티법 부결과 연준 인상이 연달아 나왔습니다.",
  cards: [
    { icon:"📉", big:"−4.42%", mid:"16일 오전 변동", sub:"2,400.82달러" },
    { icon:"💥", big:"3.19억", mid:"이더 청산 규모", sub:"주요 자산 중 가장 큼" },
    { icon:"🏦", big:"−1.42억", mid:"이더 ETF 순유출", sub:"블랙록 ETHA 9,800만" },
  ],
  quote: "토큰포스트는 16일 정오 전 이더리움이 4.42% 내린 2,400.82달러에 거래됐다고 집계했습니다.",
  noteHead: "왜 중요한가", noteSub: "이더리움은 비트코인보다 활용처가 넓지만, 규제와 금리 소식에는 더 민감하게 움직이는 날이 많습니다. 현물 ETF에서도 1억4,230만 달러가 빠져 기관 수요가 하루 쉬어갔습니다. 다음에 확인할 것은 2,400달러 선이 지지되는지, ETF 유출이 하루짜리에 그치는지입니다.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETHER", badgeLine: "\"Rates and regulation, two days in a row\"",
  title: "Ether stayed weak around $2,400, swinging more than bitcoin after the hike and the Clarity Act miss",
  heroIcon: "Ξ", heroBig: "$2,401",
  heroSub: "Ether is the leading smart-contract (programmable) digital asset. The Clarity Act failure and the Fed hike landed back to back.",
  cards: [
    { icon:"📉", big:"-4.42%", mid:"Sept 16 morning move", sub:"$2,400.82" },
    { icon:"💥", big:"$319M", mid:"Ether liquidations", sub:"Largest among majors" },
    { icon:"🏦", big:"-$142M", mid:"Ether ETF outflows", sub:"BlackRock ETHA $98M" },
  ],
  quote: "TokenPost put ether at $2,400.82, down 4.42%, just before noon on Sept 16.",
  noteHead: "Why it matters", noteSub: "Ether has more use cases than bitcoin, but it often reacts harder to regulation and rates. Spot ETFs saw $142M leave, a one-day pause in institutional demand. Next: watch the $2,400 line and whether ETF outflows prove to be a one-day event.",
  footer: "Ethereum · Price",
});

add("oil-wti-102-fed", "L6", "OIL", {
  badge: "원유", title: "WTI 원유가 3.2% 내려 배럴당 102.43달러로 마감하며 100달러 위 급등 뒤 숨 고르기에 들어갔습니다",
  breaking: "WTI −3.2% · 재고 지표 엇갈림",
  heroBig: "$102.43", heroSub: "서부텍사스산원유(WTI)는 미국 원유 가격의 대표 지표입니다. 전날 100달러를 넘긴 뒤 하루 만에 조정됐습니다.",
  grid: [
    { icon:"📊", big:"−3.2%", mid:"16일 종가 변동", sub:"102.43달러 마감" },
    { icon:"🛢️", big:"+710만", mid:"API 주간 재고", sub:"예상은 160만 감소" },
    { icon:"📉", big:"−64만", mid:"EIA 공식 재고", sub:"두 집계가 774만 배럴 차이" },
    { icon:"🔥", big:"100달러+", mid:"이란전 물가 충격", sub:"연준 인상의 배경" },
  ],
  ctx1: "연준은 유가가 100달러를 넘긴 에너지 충격을 물가 이유로 명시했습니다.",
  ctx2: "API와 EIA 재고가 반대로 나와 하루 하락을 재고 하나로만 설명하기는 어렵습니다.",
  quote: "연합뉴스는 이란 전쟁 장기화로 국제유가가 배럴당 100달러를 넘어서며 에너지 가격이 물가 전반으로 번질 수 있다고 전했습니다.",
  noteHead: "왜 중요한가", noteSub: "유가가 100달러 위에 머물면 휘발유·운송비가 올라 물가를 다시 자극합니다. 16일 하락은 급등 뒤 숨 고르기에 가깝고, 재고 숫자도 출처마다 다릅니다. 다음에 확인할 것은 유가가 100달러 아래에서 안정되는지, 사우디 송유관 복구가 진전되는지입니다.",
  footer: "원유 · 시세",
}, {
  badge: "OIL", title: "WTI crude fell 3.2% to $102.43, pausing after jumping above $100",
  breaking: "WTI -3.2% · mixed inventories",
  heroBig: "$102.43", heroSub: "West Texas Intermediate is the benchmark US oil price. It settled back a day after clearing $100.",
  grid: [
    { icon:"📊", big:"-3.2%", mid:"Sept 16 settle", sub:"Closed at $102.43" },
    { icon:"🛢️", big:"+7.1M", mid:"API weekly stocks", sub:"vs a 1.6M draw expected" },
    { icon:"📉", big:"-0.64M", mid:"EIA official stocks", sub:"A 7.74M-barrel gap vs API" },
    { icon:"🔥", big:"$100+", mid:"War inflation shock", sub:"Cited in the Fed hike" },
  ],
  ctx1: "The Fed explicitly tied sticky inflation to an energy shock with oil above $100.",
  ctx2: "API and EIA inventories moved in opposite directions, so the one-day drop is not just a stockpile story.",
  quote: "Yonhap reported that a prolonged Iran war pushed oil above $100 a barrel, raising the risk energy prices feed into broader inflation.",
  noteHead: "Why it matters", noteSub: "Oil stuck above $100 lifts gasoline and freight, feeding inflation again. Tuesday's drop looks like a pause after a spike, and inventory prints disagree by source. Next: watch whether prices stabilize below $100 and whether Saudi pipeline repairs advance.",
  footer: "Oil · Price",
});

add("summary-krre", "ROWS", "TOHEO", {
  headline: "2026.09.17 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#180f28", right:"17.9만 가구", title:"서울 정비사업 이주 수요가 2030년까지 약 18만 가구로 추산됩니다",
      sub:"압구정·여의도·목동·성수에 노량진·대치까지 속도가 붙고 있습니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"−13%", title:"서울 아파트 전월세 매물이 1년 전보다 13% 줄었습니다",
      sub:"아실 집계 3만7,386건이며 대치동은 같은 기간 44.3% 급감했습니다." },
    { color:"#22c55e", fill:"#06210f", right:"23.4만호", title:"정부가 2030년까지 수도권 정비사업 23만4,000호 착공을 지원합니다",
      sub:"재개발 조합설립 동의율을 75%에서 70%로 낮춥니다." },
    { color:"#38bdf8", fill:"#061520", right:"+7.61%", title:"올해 서울 아파트 전세가격 누적 상승률이 7.61%로 뛰었습니다",
      sub:"작년 같은 기간 1.59%의 약 5배입니다." },
  ],
  caption: "더 볼 것: 이주 18만 가구 · 전월세 매물 −13% · 착공 23.4만호 · 전세 +7.61%",
}, {
  headline: "2026.09.17 Korea Real Estate Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#180f28", right:"179,000 units", title:"Seoul redevelopment moves through 2030 are estimated near 180,000 households",
      sub:"Apgujeong, Yeouido, Mokdong and Seongsu are speeding up, plus Noryangjin and Daechi." },
    { color:"#fb923c", fill:"#1a0d02", right:"-13%", title:"Seoul apartment jeonse and monthly listings fell 13% from a year ago",
      sub:"Asil counts 37,386 listings; Daechi-dong is down 44.3%." },
    { color:"#22c55e", fill:"#06210f", right:"234,000", title:"The government will back 234,000 metro-area reconstruction starts by 2030",
      sub:"The consent threshold for forming a redevelopment union falls from 75% to 70%." },
    { color:"#38bdf8", fill:"#061520", right:"+7.61%", title:"Seoul apartment jeonse prices are up 7.61% year to date",
      sub:"About five times last year's 1.59% over the same stretch." },
  ],
  caption: "Watch: 180k moves · listings -13% · 234k starts · jeonse +7.61%",
});

add("reconstruction-migration-180k", "L2", "POLICY", {
  badge: "정비사업 이주", title: "서울 정비사업 이주 수요가 2030년까지 약 18만 가구로 추산되며 전월세 시장의 뇌관으로 꼽힙니다",
  heroIcon: "🚚", heroBig: "17만9,310가구",
  heroSub: "정비사업은 낡은 아파트를 헐고 새로 짓는 재건축·재개발입니다. 이 기간 이삿짐이 한꺼번에 쏟아지면 주변 전세가 먼저 움직입니다.",
  cards: [
    { label:"목동", big:"2만6,629", mid:"1~14단지 이주 대상", sub:"2030년 고도제한 전 인가 목표" },
    { label:"기간", big:"2026~30", mid:"이주 집중 연도", sub:"후반 3년에 더 몰릴 전망" },
    { label:"순공급", big:"7.4% / 37.3%", mid:"재개발·재건축 효과", sub:"헐리는 집 대비 새로 생기는 집" },
  ],
  detailHead: "왜 전세가 먼저 흔들리나",
  detailLines: [
    "실거주 중심 규제로 전월세 매물이 이미 줄어든 상태에서 이주 수요가 겹칩니다.",
    "조합은 공사비 상승을 피하려고 한꺼번에 이주하는 쪽을 선호합니다.",
    "목동은 2030년 11월 고도제한 개정 전에 사업시행인가를 받으려 속도를 내고 있습니다.",
  ],
  quote: "국회 제출 자료 기준 올해부터 2030년까지 서울 정비사업 이주 물량은 총 17만9,310가구입니다.",
  noteHead: "왜 중요한가", noteSub: "재건축이 끝나면 집이 늘어나지만, 헐리는 동안에는 살 곳이 부족해집니다. 18만 가구 이주는 그 공백이 수년에 걸쳐 나온다는 뜻입니다. 다음에 확인할 것은 목동·대치처럼 이주가 임박한 동의 전세 매물과, 시가 순차 이주를 실제로 조율하는지입니다.",
  footer: "정비사업 · 이주",
}, {
  badge: "REDEV. MOVES", title: "Seoul redevelopment moves through 2030 are estimated near 180,000 households, a jeonse-market flashpoint",
  heroIcon: "🚚", heroBig: "179,310 units",
  heroSub: "Redevelopment tears down old apartments and rebuilds them. A wave of moves tightens nearby jeonse first.",
  cards: [
    { label:"Mokdong", big:"26,629", mid:"Complexes 1-14", sub:"Aiming for approval before 2030 height rules" },
    { label:"Window", big:"2026-30", mid:"Peak move years", sub:"Heavier in the last three years" },
    { label:"Net supply", big:"7.4% / 37.3%", mid:"Redevelop / rebuild yield", sub:"New homes vs homes torn down" },
  ],
  detailHead: "Why jeonse moves first",
  detailLines: [
    "Owner-occupancy rules already cut rental listings; relocation demand stacks on top.",
    "Unions prefer one-shot moves to avoid further construction-cost inflation.",
    "Mokdong is racing for implementation approval before November 2030 height limits.",
  ],
  quote: "Assembly data put Seoul redevelopment moves from this year through 2030 at 179,310 households.",
  noteHead: "Why it matters", noteSub: "Rebuilds add homes eventually, but while buildings come down there is a housing gap. 180,000 moves means that gap lasts years. Next: watch jeonse listings in Mokdong and Daechi, and whether the city actually staggers the moves.",
  footer: "Redevelopment · Moves",
});

add("jeonse-listings-13pct", "L5", "JEONSE", {
  badge: "전세", title: "서울 아파트 전월세 매물이 1년 전보다 13% 줄고, 전세가격은 올해 7.61% 올랐습니다",
  heroIcon: "🔑", heroBig: "3만7,386건",
  heroSub: "전세는 보증금을 맡기고 집을 빌리는 한국식 임대입니다. 매물이 줄면 같은 돈으로 집을 구하기가 더 어려워집니다.",
  before: { label:"1년 전", big:"더 많은 매물", sub:"실거주 규제 이전" },
  after: { label:"현재", big:"−13%", sub:"아실 집계 3만7,386건" },
  cards: [
    { icon:"📍", big:"−44.3%", mid:"대치동 매물", sub:"은마 등 재건축 단지 밀집" },
    { icon:"📈", big:"+7.61%", mid:"전세 누적 상승", sub:"작년 동기 1.59%의 약 5배" },
    { icon:"💸", big:"162만 원", mid:"7월 평균 월세", sub:"역대 가장 높은 수준" },
  ],
  quote: "양지영 전문위원은 신규 입주가 줄고 매물이 잠기면서, 조건에 맞는 전셋집을 구하기 어려워 갱신 계약이 늘고 있다고 진단했습니다.",
  noteHead: "왜 중요한가", noteSub: "매물이 줄어든 시장에 재건축 이주까지 더해지면 전셋값이 한 번 더 뛸 수 있습니다. 대치동처럼 정비사업이 몰린 동네는 이미 매물이 40% 넘게 빠졌습니다. 다음에 확인할 것은 주간 전세가격 상승 폭과, 양천구 등 이주 지원 대책이 실제로 매물을 늘리는지입니다.",
  footer: "전세 · 매물",
}, {
  badge: "JEONSE", title: "Seoul apartment rental listings fell 13% from a year ago, while jeonse prices are up 7.61% this year",
  heroIcon: "🔑", heroBig: "37,386 listings",
  heroSub: "Jeonse is Korea's lump-sum deposit rental. Fewer listings mean the same deposit buys less choice.",
  before: { label:"A year ago", big:"More listings", sub:"Before owner-occupancy rules tightened" },
  after: { label:"Now", big:"-13%", sub:"Asil count: 37,386" },
  cards: [
    { icon:"📍", big:"-44.3%", mid:"Daechi-dong listings", sub:"Home to Eunma and other rebuilds" },
    { icon:"📈", big:"+7.61%", mid:"YTD jeonse gain", sub:"About 5× last year's 1.59%" },
    { icon:"💸", big:"₩1.62M", mid:"July average monthly rent", sub:"The highest on record" },
  ],
  quote: "An analyst said fewer new completions and locked-up listings are pushing more tenants to renew instead of moving.",
  noteHead: "Why it matters", noteSub: "Add reconstruction moves to a thinner listing pool and jeonse prices can jump again. Neighborhoods like Daechi already lost more than 40% of listings. Next: weekly jeonse-price prints and whether Yangcheon-gu relocation support actually adds supply.",
  footer: "Jeonse · Listings",
});

add("supply-plan-234k", "L3", "POLICY", {
  badge: "공급대책", title: "정부가 정비사업 동의율을 낮추고 2030년까지 수도권 23만4,000호 착공을 지원합니다",
  heroIcon: "🏗️", heroBig: "23만4,000호",
  heroSub: "재개발 조합을 만들 때 필요한 동의율을 75%에서 70%로 낮춰, 사업 시작까지의 시간을 줄이겠다는 취지입니다.",
  cards: [
    { icon:"🗳️", big:"75→70%", mid:"조합설립 동의율", sub:"토지면적 50% 요건은 유지" },
    { icon:"🏦", big:"LTV 완화", mid:"이주비 대출", sub:"종전·종후 평가액 중 큰 값" },
    { icon:"📅", big:"이달 31일", mid:"금융 시행세칙", sub:"조기 착공 세제·금융 인센티브" },
  ],
  quote: "국토부와 금융위는 전월세·매매 안정을 위한 주택 신속공급 방안에서 정비사업 규제 완화를 핵심으로 내세웠습니다.",
  noteHead: "왜 중요한가", noteSub: "공급을 늘리면 장기적으로 전세·매매 가격 부담을 줄일 수 있습니다. 다만 착공이 빨라질수록 단기 이주도 앞당겨져, 대책과 전세난이 같은 시기에 겹칠 수 있습니다. 다음에 확인할 것은 동의율 인하가 실제 조합 설립을 얼마나 앞당기는지, 이주비 대출 완화가 언제부터 현장에서 쓰이는지입니다.",
  footer: "공급대책 · 정비사업",
}, {
  badge: "SUPPLY PLAN", title: "The government is lowering redevelopment consent thresholds and backing 234,000 metro starts by 2030",
  heroIcon: "🏗️", heroBig: "234,000 homes",
  heroSub: "The union-formation consent rate falls from 75% to 70%, aiming to shorten the time before work can start.",
  cards: [
    { icon:"🗳️", big:"75→70%", mid:"Union consent rate", sub:"50% land-area rule stays" },
    { icon:"🏦", big:"Easier LTV", mid:"Relocation loans", sub:"Uses the higher of old/new value" },
    { icon:"📅", big:"Sept 30", mid:"Finance-rule start", sub:"Tax and credit perks for early starts" },
  ],
  quote: "Land and finance ministries put faster redevelopment at the center of a plan to stabilize jeonse and sale markets.",
  noteHead: "Why it matters", noteSub: "More supply can ease prices over years. Faster starts also pull relocation forward, so the cure and the jeonse squeeze can overlap. Next: watch how much sooner unions actually form, and when easier relocation loans show up on the ground.",
  footer: "Supply plan · Redevelopment",
});

};
