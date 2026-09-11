/* KR / Safe / KR-RE topics for 2026-09-12 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.12 한국장 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"−1.76%", title:"코스피가 6,909.91로 1.76% 내리며 종가 7,000선을 내줬습니다",
      sub:"장중 저점 6,802.50까지 밀렸다 되돌렸습니다. 코스닥은 820.64(−1.95%)입니다." },
    { color:"#22d3ee", fill:"#06171c", right:"외인", title:"외국인이 약 2조 3,040억 원을 팔고 개인이 약 1조 8,658억 원을 샀습니다",
      sub:"기관은 약 1조 2,235억 원을 순매도했습니다. 원·달러는 1,345.9원입니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"삼성", title:"삼성전자는 259,500원(−3.53%)입니다",
      sub:"장중 256,500원까지 밀렸습니다. 외국인 9,167억 원 순매도입니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"하이닉스", title:"하이닉스는 1,812,000원(−2.21%)입니다",
      sub:"외국인 1조 771억 원으로 유가증권 순매도 1위입니다." },
    { color:"#22d3ee", fill:"#06171c", right:"KB", title:"KB금융이 177,900원(+2.60%)으로 선방했습니다",
      sub:"신한지주도 +2.36%입니다. 반도체와 온도가 달랐습니다." },
    { color:"#4ade80", fill:"#061209", right:"엔솔", title:"엘지에너지솔루션이 360,000원(−1.37%)이었습니다",
      sub:"유가 100달러권 원가 축입니다. 이틀 조정입니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"현대", title:"현대차는 382,500원(−1.67%)으로 할부·유가 부담을 반영했습니다",
      sub:"전날 +0.26%를 하루 만에 반납했습니다." },
  ],
  caption: "더 볼 것: 6909.91 · 외인 −2.3조 · 삼성 −3.53% · 하이닉스 −2.21% · KB +2.60%",
}, {
  headline: "2026.09.12 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"−1.76%", title:"KOSPI closed 6,909.91 (−1.76%) and gave back the 7,000 close",
      sub:"Intraday low 6,802.50 then recovered. KOSDAQ 820.64 (−1.95%)." },
    { color:"#22d3ee", fill:"#06171c", right:"Flow", title:"Foreigners sold about ₩2.30T; individuals bought about ₩1.87T",
      sub:"Institutions sold about ₩1.22T. The won printed 1,345.9." },
    { color:"#60a5fa", fill:"#0a1420", right:"SMSN", title:"Samsung closed 259,500 (−3.53%)",
      sub:"Low 256,500. Foreigners sold ₩916.7B." },
    { color:"#f59e0b", fill:"#1a1205", right:"Hynix", title:"Hynix closed 1,812,000 (−2.21%)",
      sub:"Foreigners sold ₩1.077T, the top sale." },
    { color:"#22d3ee", fill:"#06171c", right:"KB", title:"KB Financial closed 177,900 (+2.60%)",
      sub:"Shinhan +2.36%. A different temperature from semis." },
    { color:"#4ade80", fill:"#061209", right:"LGES", title:"LG Energy Solution closed 360,000 (−1.37%)",
      sub:"Oil-at-$100 cost axis. A second down day." },
    { color:"#fb7185", fill:"#1a0a10", right:"HYUD", title:"Hyundai closed 382,500 (−1.67%) on oil and loan rates",
      sub:"Gave back Thursday’s +0.26% in one session." },
  ],
  caption: "Watch: 6909.91 · foreign −₩2.3T · Samsung −3.53% · Hynix −2.21% · KB +2.60%",
});

add("kospi-flow-kr", "L6", "KOSPI", {
  badge: "BREAKING", breaking: "코스피 7,000 반납",
  title: "코스피가 6,909.91(−1.76%)로 장중 6,802까지 밀리며 종가 7,000선을 내줬습니다",
  heroBig: "6,910",
  heroSub: "전일 대비 124.01포인트 내린 6,909.91입니다. 시가이자 저점에 가까운 숫자는 6,802.50입니다. 사흘 만에 종가 7,000선을 내줬습니다.",
  grid: [
    { icon:"📊", big:"−1.76%", mid:"코스피", sub:"종가 6,909.91" },
    { icon:"📉", big:"6,802", mid:"장중 저점", sub:"갭 하락 출발" },
    { icon:"🌍", big:"−2.3조", mid:"외국인", sub:"기관 −1.2조" },
    { icon:"👤", big:"+1.87조", mid:"개인", sub:"하단을 받친 매수" },
  ],
  ctx1: "코스닥은 820.64(−1.95%)입니다. 원·달러는 1,345.9원으로 6.7원 올랐습니다.",
  ctx2: "미국 인상 확률 85~90%와 유가 주간 100달러 위가 같은 날씨입니다.",
  quote: "개인이 6,800대에서 받아 6,900대로 되돌렸습니다. 7,000선은 심리선입니다.",
  noteSub: "금리와 유가가 높은 날은 성장주가 먼저 빠집니다. 오늘은 그 날씨입니다. 앞으로 몇 년 수출과 인공지능 수요는 남아 있어, 물가 경로가 분명해지면 손님이 다시 앉을 수 있습니다.",
  footer: "코스피 · 6,909.91",
}, {
  badge: "BREAKING", breaking: "KOSPI lost 7,000",
  title: "KOSPI closed 6,909.91 (−1.76%) after 6,802 and gave back the 7,000 close",
  heroBig: "6,910",
  heroSub: "Down 124.01 points to 6,909.91. The open/low sat near 6,802.50. First close under 7,000 in three sessions.",
  grid: [
    { icon:"📊", big:"−1.76%", mid:"KOSPI", sub:"Close 6,909.91" },
    { icon:"📉", big:"6,802", mid:"Intraday low", sub:"Gap-down open" },
    { icon:"🌍", big:"−₩2.3T", mid:"Foreign", sub:"Inst −₩1.2T" },
    { icon:"👤", big:"+₩1.87T", mid:"Individuals", sub:"Bought the dip" },
  ],
  ctx1: "KOSDAQ 820.64 (−1.95%). The won printed 1,345.9, up 6.7.",
  ctx2: "Hike odds 85–90% and a weekly oil close above $100 were the weather.",
  quote: "Individuals caught 6,800 and repaired toward 6,900. 7,000 is a round psychological line.",
  noteSub: "Growth names fall first on hot rates and oil. That was today. Export and AI demand still sit on a multi-year path, so a clearer inflation path can bring buyers back.",
  footer: "KOSPI · 6,909.91",
});

add("samsung-kr", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 259,500원(−3.53%)으로 마감하며 외국인이 9,167억 원을 순매도했습니다",
  heroIcon: "💠", heroBig: "−3.53%",
  heroSub: "종가 259,500원, 장중 저점 256,500원입니다. 외국인이 9,167억 원(355만 주)을 팔았습니다. 하이닉스와 같은 메모리 날씨입니다.",
  cards: [
    { icon:"💵", big:"259,500", mid:"종가(원)", sub:"전일 269,000원에서" },
    { icon:"📉", big:"256,500", mid:"장중 저점", sub:"막판 소폭 회복" },
    { icon:"🌍", big:"9,167억", mid:"외국인 순매도", sub:"약 355만 주" },
  ],
  quote: "금리 인상 확률이 뛰면 성장 기대가 큰 종목이 먼저 빠집니다. 하루 −3.53%를 업황 붕괴로 읽기보다 수급으로 보시면 됩니다.",
  noteSub: "인공지능 서버 메모리는 중기 수요입니다. 오늘은 외국인 매도가 큰 금요일입니다. 앞으로 3~5년 공급 능력이 확인되면 그 손님이 다시 담을 수 있습니다.",
  footer: "삼성전자 · 259,500원",
}, {
  badge: "Samsung", title: "Samsung closed 259,500 (−3.53%) as foreigners sold ₩916.7B",
  heroIcon: "💠", heroBig: "−3.53%",
  heroSub: "Close 259,500, low 256,500. Foreigners sold ₩916.7B (3.55M shares). Same memory weather as Hynix.",
  cards: [
    { icon:"💵", big:"259,500", mid:"Close (KRW)", sub:"From 269,000" },
    { icon:"📉", big:"256,500", mid:"Intraday low", sub:"A late bounce" },
    { icon:"🌍", big:"₩917B", mid:"Foreign sale", sub:"About 3.55M shares" },
  ],
  quote: "When hike odds jump, long-duration names fall first. Read −3.53% as flow before an upcycle break.",
  noteSub: "AI-server memory is a multi-year demand. Today was a heavy foreign-sale Friday. Over 3–5 years proven supply can bring those buyers back.",
  footer: "Samsung · 259,500",
});

add("hynix-kr", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "하이닉스가 1,812,000원(−2.21%)으로 마감하며 외국인이 1조 771억 원을 순매도했습니다",
  heroIcon: "🟠", heroBig: "−2.21%",
  heroSub: "전일 1,853,000원에서 4만 1,000원을 반납했습니다. 외국인 순매도 금액 1위입니다. 고대역폭 메모리 업황과 하루 수급의 시계가 다릅니다.",
  cards: [
    { label:"종가", big:"181.2만", mid:"원", sub:"−4만 1,000원" },
    { label:"외인", big:"1.08조", mid:"순매도", sub:"약 60.5만 주" },
    { label:"삼성", big:"−3.53%", mid:"같은 날씨", sub:"메모리 두 회사" },
  ],
  detailHead: "금요일 수급",
  detailLines: ["📍 유가증권 외국인 순매도 1위입니다","💱 원·달러 1,345.9원이 환차손 부담입니다","📅 16일 미국 회의가 다음 손님입니다"],
  noteSub: "고대역폭 메모리는 인공지능 가속기에 붙는 제품입니다. 오늘은 하루 1조 원 매도입니다. 앞으로 3~5년 서버가 늘면 이 제품 수요는 구조적으로 남을 수 있습니다.",
  footer: "SK하이닉스 · 1,812,000원",
}, {
  badge: "SK hynix", title: "Hynix closed 1,812,000 (−2.21%) as foreigners sold ₩1.077T",
  heroIcon: "🟠", heroBig: "−2.21%",
  heroSub: "Gave back ₩41,000 from 1,853,000. The top foreign sale. HBM cycle and one-day flow sit on different clocks.",
  cards: [
    { label:"Close", big:"1.812M", mid:"KRW", sub:"−₩41,000" },
    { label:"Foreign", big:"₩1.08T", mid:"Net sale", sub:"About 605k shares" },
    { label:"Samsung", big:"−3.53%", mid:"Same weather", sub:"The two memory names" },
  ],
  detailHead: "Friday flow",
  detailLines: ["📍 Top foreign sale on KOSPI","💱 KRW 1,345.9 adds FX pain","📅 The Sep 16 meeting is the next guest"],
  noteSub: "HBM sits on AI accelerators. Today was a ₩1T sale. Over 3–5 years more servers can keep that demand structural.",
  footer: "SK hynix · 1,812,000",
});

add("kb-kr", "L1", "FLOW", {
  badge: "KB금융", title: "KB금융이 177,900원(+2.60%)으로 시총 상위 가운데 두드러지게 올랐습니다",
  heroIcon: "🏦", heroBig: "+2.60%",
  heroSub: "코스피가 1.76% 내린 날 은행이 올랐습니다. 신한지주도 +2.36%입니다. 주주환원과 금리 기대가 받친 하루입니다.",
  cards: [
    { icon:"💵", big:"177,900", mid:"종가(원)", sub:"시총 상위 선방" },
    { icon:"🏦", big:"+2.36%", mid:"신한지주", sub:"금융주가 같이 움직임" },
    { icon:"💠", big:"−3.53%", mid:"삼성전자", sub:"손님이 다른 업종" },
  ],
  quote: "금리가 오를 것으로 보면 은행 이자 이익 기대가 살아납니다. 하루 +2.60%가 그 기대를 전부 증명한 것은 아닙니다.",
  noteSub: "자사주와 배당 체력이 외국인 지분이 높은 지주를 받칩니다. 오늘은 순환이 눈에 띈 날입니다. 앞으로 3~5년 자본 비율을 지키며 주주를 대접하는 회사가 더 잘 읽힐 수 있습니다.",
  footer: "KB금융 · 177,900원",
}, {
  badge: "KB", title: "KB Financial closed 177,900 (+2.60%), the standout large-cap gainer",
  heroIcon: "🏦", heroBig: "+2.60%",
  heroSub: "Banks rose on a −1.76% KOSPI day. Shinhan printed +2.36%. Buybacks and rate hopes held the tape.",
  cards: [
    { icon:"💵", big:"177,900", mid:"Close (KRW)", sub:"Large-cap standout" },
    { icon:"🏦", big:"+2.36%", mid:"Shinhan", sub:"Financials moved together" },
    { icon:"💠", big:"−3.53%", mid:"Samsung", sub:"A different guest list" },
  ],
  quote: "Higher hike odds can lift bank net-interest hopes. One +2.60% day does not prove the whole path.",
  noteSub: "Buybacks and dividends support a high-foreign-ownership holding company. Today the rotation was visible. Over 3–5 years firms that keep capital and pay owners can keep that reading.",
  footer: "KB · 177,900",
});

add("lges-kr", "L3", "SEC", {
  badge: "LG에너지솔루션", title: "엘지에너지솔루션이 360,000원(−1.37%)으로 유가 100달러권과 같이 내려갔습니다",
  heroIcon: "🔋", heroBig: "36만",
  heroSub: "전일 365,000원에 이은 이틀 조정입니다. 브렌트 주간 100달러 위가 원가와 전기차 할부에 붙습니다. 수주 공시는 없는 하루입니다.",
  cards: [
    { icon:"💵", big:"360,000", mid:"종가(원)", sub:"−1.37%" },
    { icon:"🛢️", big:"$100+", mid:"유가 주간", sub:"원가·할부 배경" },
    { icon:"📄", big:"수주", mid:"공시 없음", sub:"하루 베타에 가깝음" },
  ],
  quote: "삼성·하이닉스보다 낙폭은 작았지만 지수를 밀어 주지는 못했습니다. 현대차 −1.67%와 같은 축입니다.",
  noteSub: "전기차와 에너지저장 수요는 수년짜리입니다. 오늘은 유가 주의 조정입니다. 앞으로 3~5년 수주가 여러 지역으로 나뉘면 마진이 다시 켜질 수 있습니다.",
  footer: "LG에너지솔루션 · 360,000원",
}, {
  badge: "LGES", title: "LG Energy Solution closed 360,000 (−1.37%) with oil still above $100",
  heroIcon: "🔋", heroBig: "360k",
  heroSub: "A second down day from 365,000. A weekly Brent close above $100 sits on costs and EV loans. No order filing today.",
  cards: [
    { icon:"💵", big:"360,000", mid:"Close (KRW)", sub:"−1.37%" },
    { icon:"🛢️", big:"$100+", mid:"Oil week", sub:"Cost and loan backdrop" },
    { icon:"📄", big:"Orders", mid:"No filing", sub:"Closer to one-day beta" },
  ],
  quote: "The drop was smaller than the semis, but it did not lift the index. Same axis as Hyundai −1.67%.",
  noteSub: "EV and storage demand is multi-year. Today is an oil-week fade. Over 3–5 years orders split across regions can turn margins back on.",
  footer: "LGES · 360,000",
});

add("hyundai-kr", "L5", "AUTO", {
  badge: "현대차", title: "현대차가 382,500원(−1.67%)으로 유가·할부 금리 부담을 반영했습니다",
  heroIcon: "🚗", heroBig: "−1.67%",
  heroSub: "전일 389,000원(+0.26%)을 하루 만에 반납했습니다. 코스피 −1.76%와 낙폭이 비슷합니다.",
  before: { label:"목요일", big:"+0.26%", sub:"선방했던 종가" },
  after: { label:"금요일", big:"−1.67%", sub:"382,500원" },
  cards: [
    { icon:"💵", big:"382,500", mid:"종가(원)", sub:"−6,500원" },
    { icon:"🛢️", big:"$100+", mid:"유가", sub:"연료·원가" },
    { icon:"🏦", big:"85–90%", mid:"인상 확률", sub:"할부 이자 배경" },
  ],
  quote: "판매 공시가 없는 날의 매크로 조정입니다. KB금융 +2.60%와 손님이 달랐습니다.",
  noteSub: "완성차는 판매와 인센티브가 실적입니다. 오늘은 유가·금리 날씨입니다. 앞으로 3~5년 전동화와 해외 공장이 성장의 축으로 남아 있습니다.",
  footer: "현대차 · 382,500원",
}, {
  badge: "Hyundai", title: "Hyundai closed 382,500 (−1.67%) as oil and loan rates weighed",
  heroIcon: "🚗", heroBig: "−1.67%",
  heroSub: "Gave back Thursday’s 389,000 (+0.26%) in one session. Close to the KOSPI −1.76% drop.",
  before: { label:"Thu", big:"+0.26%", sub:"The relative win" },
  after: { label:"Fri", big:"−1.67%", sub:"382,500" },
  cards: [
    { icon:"💵", big:"382,500", mid:"Close (KRW)", sub:"−₩6,500" },
    { icon:"🛢️", big:"$100+", mid:"Oil", sub:"Fuel and cost" },
    { icon:"🏦", big:"85–90%", mid:"Hike odds", sub:"Auto-loan backdrop" },
  ],
  quote: "A macro fade with no sales print. A different guest list from KB +2.60%.",
  noteSub: "OEMs live on shipments and incentives. Today was oil-and-rate weather. Over 3–5 years electrification and overseas plants stay the growth axes.",
  footer: "Hyundai · 382,500",
});

add("summary-safe", "ROWS", "GOLD", {
  headline: "2026.09.12 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"비트코인이 7만 6천~7만 9,900달러를 오간 뒤 7만 9천 달러권으로 회복했습니다",
      sub:"8만 달러는 아직 심리선입니다. 물가가 예상과 같아 한숨 돌린 반등입니다." },
    { color:"#facc15", fill:"#1a1600", right:"금", title:"금 온스가 약 4,318~4,377달러에서 흔들렸습니다",
      sub:"한 화면은 4,318달러(−1.83%)입니다. 은보다 낙폭이 작았습니다." },
    { color:"#818cf8", fill:"#0f1024", right:"ETH", title:"이더리움이 아침 2,500달러권에서 오후 2,610달러권으로 회복했습니다",
      sub:"장중 2,433~2,648달러입니다. 비트코인보다 하루 반등이 컸습니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"은", title:"은이 온스 63.60달러로 하루 5.48% 내렸습니다",
      sub:"금보다 출렁임이 큽니다. 태양광·전자 원료이기도 합니다." },
    { color:"#f97316", fill:"#1a0d02", right:"유가", title:"서부텍사스산 101달러권, 브렌트 106달러권으로 주간 100달러 위입니다",
      sub:"경유가 갤런 6달러를 처음 넘었습니다. 물가 입력입니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"CPI", title:"8월 소비자물가가 전년 3.4%, 근원 월 0.3%였습니다",
      sub:"16일 인상 확률은 85~90%권입니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"할인", title:"금리가 오를 것으로 보면 무이자 자산의 기회비용이 커집니다",
      sub:"자산마다 속도가 다릅니다. 16일 회의가 다음 게이트입니다." },
  ],
  caption: "더 볼 것: BTC 7.9만 · 금 4320 · 은 63.60 · WTI 101 · 브렌트 106 · 인상 85–90%",
}, {
  headline: "2026.09.12 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"Bitcoin ran $76,000 to nearly $79,900 then recovered toward $79,000",
      sub:"$80,000 is still a round line. CPI-in-line offered a relief bounce." },
    { color:"#facc15", fill:"#1a1600", right:"Gold", title:"Gold held near $4,318–$4,377 an ounce",
      sub:"One tape printed $4,318 (−1.83%). A smaller fade than silver." },
    { color:"#818cf8", fill:"#0f1024", right:"ETH", title:"Ether reclaimed about $2,610 after a $2,500 morning",
      sub:"Session $2,433–$2,648. A larger daily bounce than bitcoin." },
    { color:"#94a3b8", fill:"#0c1017", right:"Silver", title:"Silver fell 5.48% to about $63.60 an ounce",
      sub:"A wider swing than gold. Also a solar and electronics metal." },
    { color:"#f97316", fill:"#1a0d02", right:"Oil", title:"WTI near $101 and Brent near $106, week still above $100",
      sub:"U.S. diesel printed over $6/gal. An inflation input." },
    { color:"#ef4444", fill:"#1a0a0a", right:"CPI", title:"August CPI printed 3.4% YoY and core 0.3% on the month",
      sub:"Sep 16 hike odds sit near 85–90%." },
    { color:"#94a3b8", fill:"#0c1017", right:"Disc.", title:"Higher hike odds raise the opportunity cost of no-yield assets",
      sub:"Each asset has its own clock. The meeting is the next gate." },
  ],
  caption: "Watch: BTC 79k · gold 4320 · silver 63.60 · WTI 101 · Brent 106 · hike 85–90%",
});

add("btc-safe", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 금요일 7만 6천~7만 9,900달러를 오간 뒤 7만 9천 달러권으로 회복했습니다",
  heroIcon: "₿", heroBig: "79k",
  heroSub: "장중 저점은 약 7만 6천 달러, 고점은 거의 7만 9,900달러입니다. 오후에는 7만 9천 달러권입니다. 8만 달러는 아직 심리선입니다.",
  cards: [
    { icon:"📉", big:"76k", mid:"장중 저점", sub:"목요일 충격 뒤" },
    { icon:"📈", big:"79.9k", mid:"장중 고점", sub:"거의 8만 달러" },
    { icon:"🏦", big:"3.4%", mid:"소비자물가", sub:"예상과 같은 전년 비" },
  ],
  quote: "물가가 더 나쁘지 않자 위험 자산이 한숨 돌렸습니다. 근원 월 0.3%는 여전히 높습니다. 다음에 보면 좋은 것은 8만 달러 안착입니다.",
  noteSub: "금리 인상 확률이 뛰면 이자를 주지 않는 자산이 흔들립니다. 오늘은 그 위의 반등입니다. 앞으로 3~5년 희소 공급과 기관 창구는 긴 그림으로 남아 있습니다.",
  footer: "비트코인 · 7만 9천권",
}, {
  badge: "Bitcoin", title: "Bitcoin traded $76,000 to nearly $79,900 and recovered toward $79,000",
  heroIcon: "₿", heroBig: "79k",
  heroSub: "The session low sat near $76,000 and the high near $79,900. Afternoon prints were near $79,000. $80,000 is still psychology.",
  cards: [
    { icon:"📉", big:"76k", mid:"Session low", sub:"After Thursday’s shock" },
    { icon:"📈", big:"79.9k", mid:"Session high", sub:"Almost $80,000" },
    { icon:"🏦", big:"3.4%", mid:"CPI YoY", sub:"In line with estimates" },
  ],
  quote: "A not-worse CPI let risk assets breathe. Core +0.3% on the month is still firm. Next: an $80,000 hold.",
  noteSub: "Higher hike odds shake assets that pay no coupon. Today was the bounce on that tape. Over 3–5 years scarce supply and institutional rails stay the long picture.",
  footer: "BTC · 79k zone",
});

add("gold-safe", "L2", "GOLD", {
  badge: "금", title: "금 온스가 약 4,318~4,377달러에서 금리 인상 확률과 같이 흔들렸습니다",
  heroIcon: "🥇", heroBig: "4,320",
  heroSub: "한 상품 표는 4,318달러(−1.83%)입니다. 다른 아침 글은 4,377달러를 적었습니다. 둘 다 4,300달러대입니다.",
  cards: [
    { label:"온스", big:"4318", mid:"한 화면", sub:"하루 −1.83%" },
    { label:"다른 집계", big:"4377", mid:"아침 글", sub:"같은 4,300달러대" },
    { label:"은", big:"−5.48%", mid:"더 큰 출렁임", sub:"금보다 낙폭이 큼" },
  ],
  detailHead: "같은 주 배경",
  detailLines: ["📍 16일 인상 확률 85~90%권입니다","🏦 이자를 주지 않는 금의 기회비용이 커집니다","🛢️ 유가 상승과 금리 기대가 동시에 있었습니다"],
  noteSub: "실질금리가 오르면 금이 부담을 받는 경우가 많습니다. 오늘은 집계가 갈린 4,300달러대입니다. 앞으로 3~5년 물가가 2%로 완전히 내려오기 전 보험 수요는 남아 있을 수 있습니다.",
  footer: "금 · 온스 4,320권",
}, {
  badge: "Gold", title: "Gold held near $4,318–$4,377 an ounce as hike odds jumped",
  heroIcon: "🥇", heroBig: "4,320",
  heroSub: "One tape printed $4,318 (−1.83%). Another morning note printed $4,377. Both sit in the $4,300s.",
  cards: [
    { label:"Ounce", big:"4318", mid:"One tape", sub:"−1.83% on the day" },
    { label:"Other", big:"4377", mid:"Morning note", sub:"Same $4,300s" },
    { label:"Silver", big:"−5.48%", mid:"Wider swing", sub:"A larger fade than gold" },
  ],
  detailHead: "Same-week backdrop",
  detailLines: ["📍 Sep 16 hike odds near 85–90%","🏦 No-yield gold feels a higher opportunity cost","🛢️ Oil up and hike odds up at the same time"],
  noteSub: "Rising real yields often weigh on gold. Today is a split $4,300s print. Over 3–5 years insurance demand can stay until inflation is fully back at 2%.",
  footer: "Gold · $4,320 zone",
});

add("eth-safe", "L3", "ETH", {
  badge: "이더리움", title: "이더리움이 금요일 아침 2,500달러권에서 오후 2,610달러권으로 회복했습니다",
  heroIcon: "⟠", heroBig: "2,610",
  heroSub: "아침 한 집계는 2,500.52달러입니다. 장중 저점 약 2,433달러, 고점 약 2,648달러입니다. 스마트계약 네트워크의 토큰입니다.",
  cards: [
    { icon:"🌅", big:"2,500", mid:"아침 집계", sub:"2,500.52달러" },
    { icon:"🌇", big:"2,613", mid:"오후 회복", sub:"2,600선 재진입" },
    { icon:"📏", big:"216$", mid:"장중 폭", sub:"2,433~2,648" },
  ],
  quote: "비트코인보다 하루 반등이 컸습니다. 물가 안도 날에 알트가 더 크게 움직이는 패턴입니다.",
  noteSub: "이더는 비트코인의 「디지털 금」과 달리 그 위의 컴퓨터에 가깝습니다. 오늘은 2,600선 회복입니다. 앞으로 3~5년 네트워크 사용량이 가격의 바닥이 될 수 있습니다.",
  footer: "이더리움 · 2,610달러권",
}, {
  badge: "Ether", title: "Ethereum reclaimed about $2,610 after a $2,500 Friday morning",
  heroIcon: "⟠", heroBig: "2,610",
  heroSub: "One morning print was $2,500.52. The session ran about $2,433 to $2,648. The token of a smart-contract network.",
  cards: [
    { icon:"🌅", big:"2,500", mid:"Morning print", sub:"$2,500.52" },
    { icon:"🌇", big:"2,613", mid:"Afternoon reclaim", sub:"Back through $2,600" },
    { icon:"📏", big:"$216", mid:"Session range", sub:"$2,433–$2,648" },
  ],
  quote: "The daily bounce was larger than bitcoin’s. Alts often swing more on a CPI-relief day.",
  noteSub: "Ether is closer to a computer on top of digital gold. Today reclaimed $2,600. Over 3–5 years network usage can become the price floor.",
  footer: "ETH · $2,610 zone",
});

add("silver-safe", "L1", "SILVER", {
  badge: "은", title: "은이 온스 63.60달러로 하루 5.48% 내리며 금보다 크게 흔들렸습니다",
  heroIcon: "🥈", heroBig: "−5.48%",
  heroSub: "전 거래 67.29달러에서 63.60달러입니다. 은 시장은 금보다 작아 퍼센트가 커집니다. 귀금속이면서 태양광·전자 원료입니다.",
  cards: [
    { icon:"💵", big:"63.60", mid:"온스 달러", sub:"하루 −3.69달러" },
    { icon:"🥇", big:"−1.8%", mid:"금의 낙폭", sub:"은보다 작음" },
    { icon:"☀️", big:"산업", mid:"태양광·전자", sub:"중기 수요 줄" },
  ],
  quote: "금리 인상 확률과 성장 우려가 겹치면 은이 산업 금속처럼 빠지기도 합니다. 하루 −5.48%를 수요 소멸로 읽기는 이릅니다.",
  noteSub: "에너지 전환이 이어지면 은의 산업 수요는 남아 있습니다. 오늘은 금리 날의 급락입니다. 앞으로 3~5년 희소 금속과 산업 원료를 한 몸에 가진 자산으로 남을 수 있습니다.",
  footer: "은 · 63.60달러",
}, {
  badge: "Silver", title: "Silver fell 5.48% to about $63.60 an ounce, a sharper drop than gold",
  heroIcon: "🥈", heroBig: "−5.48%",
  heroSub: "From $67.29 to $63.60. A smaller market than gold, so percents run larger. A precious metal and a solar/electronics input.",
  cards: [
    { icon:"💵", big:"63.60", mid:"USD / oz", sub:"−$3.69 on the day" },
    { icon:"🥇", big:"−1.8%", mid:"Gold fade", sub:"Smaller than silver" },
    { icon:"☀️", big:"Industry", mid:"Solar and electronics", sub:"A medium-term demand line" },
  ],
  quote: "Hike odds plus growth fears can make silver trade like an industrial. −5.48% is not demand vanishing.",
  noteSub: "If the energy transition continues, industrial silver demand stays. Today is a rate-day slide. Over 3–5 years it can remain both a scarce metal and an industrial input.",
  footer: "Silver · $63.60",
});

add("oil-safe", "L6", "OIL", {
  badge: "BREAKING", breaking: "주간 100달러 위",
  title: "서부텍사스산이 101달러권, 브렌트가 106달러권으로 주간 100달러 위를 지켰습니다",
  heroBig: "$101",
  heroSub: "금요일 아침 서부텍사스산 약 101.12달러, 브렌트 약 105.98달러입니다. 하루로는 내렸지만 주간으로는 10% 넘게 올랐습니다.",
  grid: [
    { icon:"🇺🇸", big:"101", mid:"WTI", sub:"하루 −1.33%" },
    { icon:"🌍", big:"106", mid:"브렌트", sub:"하루 −1.53%" },
    { icon:"🚚", big:"$6", mid:"경유 갤런", sub:"미국 첫 돌파" },
    { icon:"📈", big:"+10%", mid:"주간", sub:"5월 이후 첫 100달러 주" },
  ],
  ctx1: "8월 휘발유가 월 3.9% 올라 소비자물가의 큰 부분을 설명했습니다.",
  ctx2: "중국이 12일부터 국내 휘발유·경유 소매가를 올린다는 소식도 있었습니다.",
  quote: "원유는 안전자산이 아니라 물가와 운송 원가입니다. 금·비트코인과 같은 헤지가 아닙니다.",
  noteSub: "지정학이 잠잠해지고 재고가 쌓이면 100달러는 내려올 수 있습니다. 오늘은 주간 100달러 위입니다. 앞으로 몇 년 트럭과 항공은 당분간 원유를 씁니다.",
  footer: "원유 · 주간 100달러 위",
}, {
  badge: "BREAKING", breaking: "Week above $100",
  title: "WTI held near $101 and Brent near $106, on track for a weekly close above $100",
  heroBig: "$101",
  heroSub: "Friday morning WTI about $101.12 and Brent about $105.98. Down on the day, up more than 10% on the week.",
  grid: [
    { icon:"🇺🇸", big:"101", mid:"WTI", sub:"−1.33% Friday" },
    { icon:"🌍", big:"106", mid:"Brent", sub:"−1.53% Friday" },
    { icon:"🚚", big:"$6", mid:"Diesel / gal", sub:"First U.S. print over $6" },
    { icon:"📈", big:"+10%", mid:"Week", sub:"First $100 week since May" },
  ],
  ctx1: "August gasoline +3.9% m/m explained a large slice of CPI.",
  ctx2: "China was set to raise retail petrol and diesel from Sep 12.",
  quote: "Oil is an inflation and freight input, not a gold or bitcoin hedge.",
  noteSub: "Quiet geopolitics and rising inventories can pull $100 back down. Today is a weekly close above $100. Trucks and jets still burn crude for years.",
  footer: "Oil · week above $100",
});

add("summary-krre", "ROWS", "POLICY", {
  headline: "2026.09.12 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"+0.20%", title:"서울 아파트 매매가 0.20% 올라 오름폭이 줄었습니다",
      sub:"전세는 0.19%입니다. 도시 평균 뒤에 구별 키가 있습니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"성북", title:"성북구 매매가 0.42% 올라 상승 축이 북쪽으로 옮아 갔습니다",
      sub:"올해 누적이 서울 25개 구 가운데 가장 높다는 설명이 있습니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"강남", title:"강남 −0.35%·서초 −0.30%·송파 −0.02%로 강남3구가 모두 내렸습니다",
      sub:"강남은 5주 연속, 송파는 21주 만에 하락입니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"전세", title:"노원 전세가 0.38% 오르고 서초 전세는 0.21% 내렸습니다",
      sub:"입주 있는 구와 역세권 대단지 구가 다른 키입니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"14억", title:"실거주 1주택 종부세 공제 14억 원, 비거주는 12억 원 유지입니다",
      sub:"9억 원 안은 철회됐습니다. 국회 심사가 남았습니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"70%", title:"세율 인상과 공정시장가액비율 70%는 정부안에 남아 있습니다",
      sub:"기본공제만 덜 빡빡해진 그림입니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"한도", title:"전세대출 한도 조회가 가을 이사의 실무 관문입니다",
      sub:"평균만 보고 계약하기보다 구별 실거래를 보시면 됩니다." },
  ],
  caption: "더 볼 것: 서울 +0.20% · 성북 +0.42% · 강남 −0.35% · 공제 14억 · 비거주 12억",
}, {
  headline: "2026.09.12 Korea Housing Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"+0.20%", title:"Seoul apartment sales rose 0.20%, a slower gain",
      sub:"Jeonse +0.19%. District keys sit behind the city average." },
    { color:"#fb923c", fill:"#1a0d02", right:"Sb", title:"Seongbuk sales rose 0.42% as the lift moved north",
      sub:"The year’s cumulative gain is described as Seoul’s highest." },
    { color:"#a78bfa", fill:"#120b1f", right:"Gn", title:"Gangnam −0.35%, Seocho −0.30%, Songpa −0.02% — all down",
      sub:"Fifth down week in Gangnam; Songpa’s first drop in 21 weeks." },
    { color:"#fb923c", fill:"#1a0d02", right:"Jn", title:"Nowon jeonse rose 0.38% while Seocho jeonse fell 0.21%",
      sub:"Move-in districts and big transit complexes run different keys." },
    { color:"#a78bfa", fill:"#120b1f", right:"₩14B", title:"Resident single-home CGT deduction ₩14B; non-resident stays ₩12B",
      sub:"The ₩9B cut was withdrawn. The Assembly still reviews." },
    { color:"#fb923c", fill:"#1a0d02", right:"70%", title:"Rate hikes and a 70% fair-market ratio remain in the draft",
      sub:"Only the basic deduction got less tight." },
    { color:"#a78bfa", fill:"#120b1f", right:"Loan", title:"A jeonse-loan limit check is the autumn moving gate",
      sub:"Read district prints before you sign on the city average." },
  ],
  caption: "Watch: Seoul +0.20% · Seongbuk +0.42% · Gangnam −0.35% · ₩14B · ₩12B",
});

add("seoul-split-krre", "L5", "POLICY", {
  badge: "서울", title: "서울 매매가 0.20% 오르는 동안 성북은 0.42% 올랐고 강남3구는 모두 내렸습니다",
  heroIcon: "🏙", heroBig: "0.20%",
  heroSub: "전주 0.22%에서 오름폭이 줄었습니다. 도시 평균 뒤에 북쪽 상승과 강남 조정이 있습니다.",
  before: { label:"강남3구", big:"하락", sub:"−0.35·−0.30·−0.02" },
  after: { label:"성북", big:"+0.42%", sub:"상승 축이 북쪽" },
  cards: [
    { icon:"📊", big:"0.20%", mid:"서울 매매", sub:"전주 0.22%" },
    { icon:"⬆️", big:"0.42%", mid:"성북", sub:"6주 연속 0.4%대" },
    { icon:"🏠", big:"0.19%", mid:"서울 전세", sub:"같은 가림막" },
  ],
  quote: "실수요가 살 수 있는 가격대로 손이 옮아 간 주입니다. 평균만 보면 이 이동이 안 보입니다.",
  noteSub: "서울 거주 수요는 수년 단위로 남아 있습니다. 오늘은 구별 키가 갈린 주입니다. 앞으로 몇 년 공급과 학군, 직주 근접이 가격을 만듭니다.",
  footer: "서울 · 0.20%",
}, {
  badge: "Seoul", title: "Seoul sales rose 0.20% while Seongbuk gained 0.42% and the Gangnam 3 fell",
  heroIcon: "🏙", heroBig: "0.20%",
  heroSub: "The gain slowed from 0.22%. Behind the city average: a northern lift and a Gangnam fade.",
  before: { label:"Gangnam 3", big:"Down", sub:"−0.35 / −0.30 / −0.02" },
  after: { label:"Seongbuk", big:"+0.42%", sub:"Lift moved north" },
  cards: [
    { icon:"📊", big:"0.20%", mid:"Seoul sales", sub:"Was 0.22%" },
    { icon:"⬆️", big:"0.42%", mid:"Seongbuk", sub:"Sixth 0.4% week" },
    { icon:"🏠", big:"0.19%", mid:"Seoul jeonse", sub:"The same veil" },
  ],
  quote: "Hands moved to prices owner-occupiers can pay. The average hides that shift.",
  noteSub: "Seoul living demand lasts years. Today the district keys split. Supply, school zones, and job access still set prices over a few years.",
  footer: "Seoul · 0.20%",
});

add("gangnam3-down-krre", "L2", "POLICY", {
  badge: "강남", title: "강남구 매매가 0.35% 내리며 5주 연속 약세이고 송파는 21주 만에 하락했습니다",
  heroIcon: "🏛", heroBig: "−0.35%",
  heroSub: "서초는 0.30% 내려 낙폭이 커졌고, 송파는 0.02% 내렸습니다. 압구정·대치에서 호가를 낮춘 거래가 나왔습니다. 서울 전체가 내린 것은 아닙니다.",
  cards: [
    { label:"강남", big:"−0.35%", mid:"5주 연속", sub:"압구정·대치 대단지" },
    { label:"서초", big:"−0.30%", mid:"낙폭 확대", sub:"전세도 −0.21%" },
    { label:"송파", big:"−0.02%", mid:"21주 만", sub:"하락 전환" },
  ],
  detailHead: "고가 주택 배경",
  detailLines: ["📍 종부세·양도세 개편 이야기가 호가를 누릅니다","🏦 대출 한도 안에서 강남 고가로 바로 들어가기 어렵습니다","📄 서울 평균 +0.20%와 동시에 성립합니다"],
  noteSub: "강남은 학군과 재건축이라는 긴 자산입니다. 오늘은 세 구가 같이 쉰 주입니다. 앞으로 몇 년 사업이 진행되면 공급과 이주 수요가 다시 켜질 수 있습니다.",
  footer: "강남 · −0.35%",
}, {
  badge: "Gangnam", title: "Gangnam sales fell 0.35% for a fifth week; Songpa turned down after 21 weeks",
  heroIcon: "🏛", heroBig: "−0.35%",
  heroSub: "Seocho fell 0.30% with a wider drop; Songpa printed −0.02%. Cut-list trades in Apgujeong and Daechi. Not a Seoul-wide decline.",
  cards: [
    { label:"Gangnam", big:"−0.35%", mid:"5th week", sub:"Apgujeong / Daechi" },
    { label:"Seocho", big:"−0.30%", mid:"Wider fade", sub:"Jeonse also −0.21%" },
    { label:"Songpa", big:"−0.02%", mid:"21 weeks", sub:"First down print" },
  ],
  detailHead: "High-end backdrop",
  detailLines: ["📍 Tax-reform talk is pressing list prices","🏦 Loan caps make a jump into Gangnam hard","📄 It can sit beside Seoul’s +0.20% average"],
  noteSub: "Gangnam is schools and rebuilds over years. Today three districts paused together. Over a few years live projects can turn supply and relocation demand back on.",
  footer: "Gangnam · −0.35%",
});

add("nowon-jeonse-krre", "L3", "JEONSE", {
  badge: "전세", title: "노원 전세가 0.38% 오르고 서초 전세는 0.21% 내리며 구별 키가 갈렸습니다",
  heroIcon: "🔑", heroBig: "+0.38%",
  heroSub: "서울 전세 평균은 0.19%입니다. 노원·중랑·서대문이 강했고 서초는 4주 연속 약세입니다. 전세는 보증금을 맡기고 사는 계약입니다.",
  cards: [
    { icon:"⬆️", big:"0.38%", mid:"노원 전세", sub:"역세권·대단지 수요" },
    { icon:"⬇️", big:"0.21%", mid:"서초 전세", sub:"입주·재건축 영향" },
    { icon:"🏦", big:"한도", mid:"대출 조회", sub:"계약 전 실무 관문" },
  ],
  quote: "도시 평균만 보면 구별 온도가 가려집니다. 한도 안에서 가능한 구로 수요가 모일 수 있습니다.",
  noteSub: "가을 이사 철에는 키가 더 벌어지기도 합니다. 오늘은 노원과 서초가 갈린 주입니다. 앞으로 몇 년 입주 물량과 대출 규제가 전세를 만듭니다.",
  footer: "전세 · 노원 +0.38%",
}, {
  badge: "Jeonse", title: "Nowon jeonse rose 0.38% while Seocho jeonse fell 0.21%",
  heroIcon: "🔑", heroBig: "+0.38%",
  heroSub: "Seoul jeonse averaged +0.19%. Nowon, Jungnang, and Seodaemun were firm; Seocho is in a fourth weak week. Jeonse is a large refundable deposit.",
  cards: [
    { icon:"⬆️", big:"0.38%", mid:"Nowon jeonse", sub:"Transit and large complexes" },
    { icon:"⬇️", big:"0.21%", mid:"Seocho jeonse", sub:"Move-ins and rebuilds" },
    { icon:"🏦", big:"Cap", mid:"Loan check", sub:"The gate before you sign" },
  ],
  quote: "The city average hides district temperature. Demand can pool where the loan cap still works.",
  noteSub: "Autumn moving season can widen the split. Today Nowon and Seocho ran opposite. Over a few years completions and loan rules make jeonse.",
  footer: "Jeonse · Nowon +0.38%",
});

add("tax-krre", "L4", "POLICY", {
  badge: "정책", badgeLine: "🏛 종부세 정부안",
  title: "실거주 1주택 종부세 공제 14억 원, 비거주는 12억 원 유지를 확정했습니다",
  heroIcon: "📄", heroBig: "14억",
  heroSub: "9월 1일 국무회의 확정안입니다. 8월의 비거주 9억 원 안과 상한 200% 안은 철회됐습니다. 세율과 70% 비율은 남아 있습니다.",
  cards: [
    { icon:"🏠", big:"14억", mid:"실거주 1주택", sub:"기본공제 우대" },
    { icon:"🔑", big:"12억", mid:"비거주 1주택", sub:"현행 유지" },
    { icon:"⚖", big:"국회", mid:"정기국회 심사", sub:"정부안이지 시행 아님" },
  ],
  quote: "기본공제는 이 금액까지 세금을 매기지 않는 칸입니다. 공시가격 기준이라 시가로는 더 큰 집입니다.",
  noteSub: "세금은 「실제로 사는 집」을 우대하는 쪽으로 갑니다. 오늘은 정부 확정안입니다. 앞으로 몇 년 국회 통과 내용이 보유 비용과 전세 공급을 같이 움직입니다.",
  footer: "정책 · 공제 14억",
}, {
  badge: "Policy", badgeLine: "🏛 CGT draft",
  title: "The government locked in a ₩14B resident deduction and kept ₩12B for non-residents",
  heroIcon: "📄", heroBig: "₩14B",
  heroSub: "Cabinet locked the draft on Sep 1. The August ₩9B non-resident cut and 200% cap were withdrawn. Rate hikes and the 70% ratio remain.",
  cards: [
    { icon:"🏠", big:"₩14B", mid:"Resident 1 home", sub:"A larger basic deduction" },
    { icon:"🔑", big:"₩12B", mid:"Non-resident 1 home", sub:"Keeps the current line" },
    { icon:"⚖", big:"Assembly", mid:"Regular session", sub:"A draft, not law yet" },
  ],
  quote: "The basic deduction is the amount that is not taxed. It is assessed value, so market price is higher.",
  noteSub: "Tax is moving toward homes people actually live in. Today is the government draft. Over a few years the Assembly text will move holding costs and jeonse supply together.",
  footer: "Policy · ₩14B deduction",
});

};
