/* KR / Safe / KR-RE topics for 2026-09-22 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.22 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"7,007.72", title:"코스피가 1.65% 올라 7,007.72로 마감하며 7,000선을 다시 밟았습니다",
      sub:"기관 1조4,923억 원, 기타법인 1조6,585억 원이 샀고 외국인은 1,602억 원을 팔았습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"27만4,000원", title:"삼성전자가 4.98% 올라 27만 원을 10거래일 만에 회복했습니다",
      sub:"외국인이 1조715억 원을 사며 유가증권 매수 1위였습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"186만8,000원", title:"SK하이닉스가 0.59% 오른 186만8,000원이었고 외국인은 팔았습니다",
      sub:"외국인 순매도 8,121억 원으로 유가증권 매도 1위입니다." },
    { color:"#22d3ee", fill:"#06171c", right:"−3.3%", title:"LG에너지솔루션이 3.3% 내려 35만2,000원이었습니다",
      sub:"코스피가 오를 때 시가총액 상위 배터리가 빠졌습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"−1.64%", title:"현대차가 1.64% 내린 35만9,000원으로 외국인 매도 상위에 올랐습니다",
      sub:"외국인이 513억 원을 팔았고 자동차가 반도체와 갈렸습니다." },
  ],
  caption: "더 볼 것: 코스피 7,007.72 · 삼성전자 27만4,000원 · 하이닉스 186만8,000원 · 엔솔 −3.3% · 현대차 −1.64%",
}, {
  headline: "2026.09.22 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"7,007.72", title:"KOSPI rose 1.65% to 7,007.72 and recaptured 7,000",
      sub:"Institutions bought ₩1.49T; foreigners sold ₩160B." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩274,000", title:"Samsung Electronics jumped 4.98% and reclaimed 270,000 won",
      sub:"Foreigners bought ₩1.07T, the cash-market top buy." },
    { color:"#f59e0b", fill:"#1a1205", right:"₩1,868,000", title:"SK Hynix rose 0.59% while foreigners sold ₩812B",
      sub:"The cash-market top foreign sale." },
    { color:"#22d3ee", fill:"#06171c", right:"−3.3%", title:"LG Energy Solution fell 3.3% to 352,000 won",
      sub:"A top-cap battery name faded against the chip rally." },
    { color:"#fb7185", fill:"#1a0a10", right:"−1.64%", title:"Hyundai Motor slipped 1.64% to 359,000 won",
      sub:"Foreigners sold ₩51.3B as autos split from chips." },
  ],
  caption: "Watch: KOSPI 7,007.72 · Samsung 274,000 · Hynix 1,868,000 · LGES −3.3% · Hyundai −1.64%",
});

add("kospi-7007", "L6", "KOSPI", {
  badge: "코스피", title: "코스피가 1.65% 올라 7,007.72로 마감하며 7,000선을 다시 밟았습니다",
  breaking: "7,000 회복 · +1.65%",
  heroBig: "7,007.72", heroSub: "9월 21일 종가가 7거래일 만에 7,000을 다시 넘겼습니다. 기관과 기타법인이 사고 외국인 현물은 팔았습니다.",
  grid: [
    { icon:"🏦", big:"+1.49조", mid:"기관 순매수", sub:"지수 상승의 큰 축입니다" },
    { icon:"🏢", big:"+1.66조", mid:"기타법인", sub:"자사주 칸이 두껍습니다" },
    { icon:"👤", big:"−2.98조", mid:"개인 순매도", sub:"반도체를 나눠 팔았습니다" },
    { icon:"💱", big:"1,381원", mid:"원·달러", sub:"2.3원 내리며 숨 골랐습니다" },
  ],
  ctx1: "외국인은 유가증권 현물에서 1,602억 원을 팔았고, 선물에서는 산 것으로 집계됐습니다.",
  ctx2: "삼성전자만 1조715억 원을 사 지수 수급과 종목 수급이 갈렸습니다.",
  quote: "종가 7,000 회복은 7거래일 만입니다. 반도체와 수출 기대가 지수 위에 있었고, 원·달러는 여러 거래일 만에 내렸습니다.",
  noteHead: "왜 중요한가", noteSub: "7,000선이 여러 날 남으면 눈높이가 한 단계 올라갑니다. 외국인 현물 매도가 하루짜리인지가 화요일 확인입니다. 자사주가 끝나는 시점에 기타법인 칸이 비면 지수도 흔들릴 수 있습니다.",
  footer: "코스피 · 7,000 회복",
}, {
  badge: "KOSPI", title: "KOSPI rose 1.65% to 7,007.72 and recaptured 7,000",
  breaking: "7,000 back · +1.65%",
  heroBig: "7,007.72", heroSub: "The Sept 21 close cleared 7,000 for the first time in seven sessions. Institutions and other corps bought; foreigners sold cash.",
  grid: [
    { icon:"🏦", big:"+₩1.49T", mid:"Institutional buying", sub:"A large leg of the rally" },
    { icon:"🏢", big:"+₩1.66T", mid:"Other corporations", sub:"Buybacks thicken this sleeve" },
    { icon:"👤", big:"−₩2.98T", mid:"Retail selling", sub:"Shares were sold into chips" },
    { icon:"💱", big:"₩1,381", mid:"USD/KRW", sub:"The won eased 2.3 won" },
  ],
  ctx1: "Foreigners sold ₩160B in cash equities and were reported as buyers in futures.",
  ctx2: "They still bought ₩1.07T of Samsung, splitting index flow from the name.",
  quote: "A close above 7,000 is the first in seven sessions. Chip and export hopes sat on the index, and the won eased after several weak days.",
  noteHead: "Why it matters", noteSub: "If 7,000 holds, the market’s eye level steps up. Tuesday’s test is whether the cash foreign sale lasts a second day. When buybacks end, the other-corp sleeve can thin and the index can wobble.",
  footer: "KOSPI · 7,000 recapture",
});

add("samsung-electronics-274000", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 27만4,000원으로 4.98% 오르며 27만 원을 회복했습니다",
  heroIcon: "📱", heroBig: "27만4,000원",
  heroSub: "9월 21일 종가로 전일보다 1만3,000원(4.98%) 올랐습니다. 27만 원 종가는 10거래일 만입니다.",
  cards: [
    { icon:"🌍", big:"+1조715억", mid:"외국인 순매수", sub:"유가증권 매수 1위입니다" },
    { icon:"📈", big:"+4.98%", mid:"하루 상승률", sub:"27만 원을 다시 밟았습니다" },
    { icon:"🎁", big:"4,500원", mid:"특별배당 거론", sub:"28일까지 사야 30일 기준입니다" },
  ],
  quote: "외국인은 보통주 약 395만 주를 샀고 우선주도 1,324억 원을 샀습니다. 특별배당은 주당 약 4,500원으로 거론되며, 배당락은 29일입니다.",
  noteHead: "왜 중요한가", noteSub: "외국인이 지수 현물은 팔고 이 종목만 산 하루입니다. 27만4,000원이 지지가 되면 다음 실적 시즌의 눈높이가 달라집니다. 28일 매수 마감과 29일 배당락 갭을 표에 적으면 됩니다.",
  footer: "삼성전자 · 주가",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics jumped 4.98% to 274,000 won",
  heroIcon: "📱", heroBig: "₩274,000",
  heroSub: "Sept 21 close, up 13,000 won (4.98%). A close above 270,000 won is the first in ten sessions.",
  cards: [
    { icon:"🌍", big:"+₩1.07T", mid:"Foreign buying", sub:"The cash-market top buy" },
    { icon:"📈", big:"+4.98%", mid:"One-day gain", sub:"270,000 won is back" },
    { icon:"🎁", big:"₩4,500", mid:"Special dividend talk", sub:"Buy by Sept 28 for the 30th record" },
  ],
  quote: "Foreigners bought about 3.95 million common shares and ₩132B of preferred. A special dividend near ₩4,500 is discussed; the ex-date is the 29th.",
  noteHead: "Why it matters", noteSub: "Foreigners sold the cash index and still bought this name. If 274,000 won holds, the next earnings season’s eye level changes. Log the Sept 28 buy deadline and the 29th ex-gap.",
  footer: "Samsung Electronics · Stock",
});

add("sk-hynix-1868000", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 186만8,000원으로 0.59% 오르며 외국인은 팔았습니다",
  heroIcon: "💾", heroBig: "186만8,000원",
  heroSub: "9월 21일 종가로 전일보다 1만1,000원(0.59%) 올랐습니다. 금요일 급등 뒤 숨 고른 하루입니다.",
  cards: [
    { label: "외국인", big: "−8,121억", mid: "하루 순매도", sub: "유가증권 매도 1위입니다" },
    { label: "종가", big: "+0.59%", mid: "소폭 상승", sub: "매도에도 가격은 올랐습니다" },
    { label: "삼성전자", big: "+1.07조", mid: "같은 날 매수", sub: "수급이 반대였습니다" },
  ],
  detailHead: "수급이 말해 주는 것",
  detailLines: [
    "금요일에는 외국인이 이 종목을 1조 원 넘게 샀습니다",
    "하루 만에 삼성전자를 사고 하이닉스를 판 교체입니다",
    "자사주가 가격을 받쳐 매도가 종가를 크게 못 눌렀습니다",
  ],
  quote: "외국인은 약 43만 주를 팔았습니다. 고대역폭 메모리 수요는 중기 이야기로 남아 있고, 하루 수급과 업황은 다른 줄입니다.",
  noteHead: "왜 중요한가", noteSub: "지수와 종목이 같이 올라도 외국인만 반대로 간 하루입니다. 186만8,000원 위에서 다시 사는지가 다음 확인입니다. 인공지능 가속기용 메모리는 몇 년의 수요로 남아 있습니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "HYNIX", title: "SK Hynix rose 0.59% to 1,868,000 won while foreigners sold",
  heroIcon: "💾", heroBig: "₩1,868,000",
  heroSub: "Sept 21 close, up 11,000 won (0.59%). A pause after Friday’s surge.",
  cards: [
    { label: "Foreign", big: "−₩812B", mid: "One-day selling", sub:"The cash-market top sale" },
    { label: "Close", big: "+0.59%", mid: "A small gain", sub:"Price still rose into the sale" },
    { label: "Samsung", big: "+₩1.07T", mid: "Same-day buy", sub:"The flow flipped sides" },
  ],
  detailHead: "What the flow says",
  detailLines: [
    "On Friday foreigners bought more than ₩1T of this name",
    "In one day they rotated into Samsung and out of Hynix",
    "Buybacks cushioned the tape so the sale did not crush the close",
  ],
  quote: "Foreigners sold about 430,000 shares. High-bandwidth memory demand remains a multi-year story; one-day flow and the cycle sit on different lines.",
  noteHead: "Why it matters", noteSub: "The index and the name rose while foreign cash flipped. Next: whether they buy again above 1,868,000 won. Accelerator memory demand still stretches over years.",
  footer: "SK Hynix · Stock",
});

add("lges-352000", "L5", "LGES", {
  badge: "LG엔솔", title: "LG에너지솔루션이 3.3% 내린 35만2,000원으로 반도체와 반대로 갔습니다",
  heroIcon: "🔋", heroBig: "배터리 약세",
  heroSub: "코스피가 1.65% 오를 때 시가총액 상위 배터리 대형주는 1만2,000원 내렸습니다. 전날 36만3,500원에서 내려왔습니다.",
  before: { label: "코스피", big: "+1.65%", sub: "반도체가 지수를 끌어 올렸습니다" },
  after: { label: "LG엔솔", big: "−3.3%", sub: "셀 대형주는 그 돈을 받지 못했습니다" },
  cards: [
    { icon:"📉", big:"35만2,000원", mid:"3.3% 하락 종가", sub:"시가총액 상위 배터리입니다" },
    { icon:"🚗", big:"−1.64%", mid:"현대차", sub:"자동차·배터리가 같이 쉬었습니다" },
    { icon:"💱", big:"1,381원", mid:"원·달러", sub:"환율은 조금 내렸습니다" },
  ],
  quote: "전기차 수요와 메탈 가격 부담이 겹치면 대형 셀 주는 쉬기 쉽습니다. 중기에는 북미 공장과 수주가 가격의 바닥을 만듭니다.",
  noteHead: "왜 중요한가", noteSub: "7,000 회복 날에 배터리가 빠지면 순환이 아직입니다. 35만2,000원 지지와 수주 공시가 다음 확인입니다. 하루 3.3%는 중기 바닥을 지운 숫자가 아닙니다.",
  footer: "LG에너지솔루션 · 주가",
}, {
  badge: "LGES", title: "LG Energy Solution fell 3.3% to 352,000 won against the chip rally",
  heroIcon: "🔋", heroBig: "Battery fade",
  heroSub: "The top-cap cell maker dropped 12,000 won while KOSPI rose 1.65%. It came down from 363,500 won.",
  before: { label: "KOSPI", big: "+1.65%", sub: "Chips pulled the index higher" },
  after: { label: "LGES", big: "−3.3%", sub: "The cell name did not get that bid" },
  cards: [
    { icon:"📉", big:"₩352,000", mid:"A 3.3% down close", sub:"A top-cap battery name" },
    { icon:"🚗", big:"−1.64%", mid:"Hyundai Motor", sub:"Autos and batteries paused together" },
    { icon:"💱", big:"₩1,381", mid:"USD/KRW", sub:"The won eased a little" },
  ],
  quote: "When EV demand and metal costs weigh, large cell names rest easily. Over the medium term, North American plants and bookings set the floor.",
  noteHead: "Why it matters", noteSub: "A battery fade on a 7,000 recapture day means rotation is still late. Next: 352,000 won support and order filings. A one-day 3.3% drop does not erase that floor.",
  footer: "LG Energy Solution · Stock",
});

add("hyundai-359000", "L3", "AUTO", {
  badge: "현대차", title: "현대차가 1.64% 내린 35만9,000원으로 외국인 매도 상위에 올랐습니다",
  heroIcon: "🚗", heroBig: "35만9,000원",
  heroSub: "코스피가 1.65% 오를 때 시가총액 상위 자동차가 6,000원 내렸습니다. 외국인은 513억 원을 팔았습니다.",
  cards: [
    { icon:"🌍", big:"−513억", mid:"외국인 순매도", sub:"유가증권 매도 상위입니다" },
    { icon:"📊", big:"−1.64%", mid:"하루 하락", sub:"지수와 반대 방향입니다" },
    { icon:"🔋", big:"−3.3%", mid:"LG엔솔", sub:"자동차·배터리 줄이 같이 쉬었습니다" },
  ],
  quote: "외국인은 약 14만 주를 팔았습니다. 반도체로 돈이 몰린 날 자동차 대형주가 밀린 수급입니다. 원·달러 1,381원은 하루 매도를 막지 못했습니다.",
  noteHead: "왜 중요한가", noteSub: "지수 강세와 자동차 약세가 갈리면 업종 순환이 아직입니다. 35만9,000원 지지와 외국인 매도가 이어지는지가 다음 확인입니다. 하이브리드와 미국 생산은 몇 년의 점유율 싸움으로 남아 있습니다.",
  footer: "현대차 · 주가",
}, {
  badge: "HYUNDAI", title: "Hyundai Motor slipped 1.64% to 359,000 won as foreigners sold",
  heroIcon: "🚗", heroBig: "₩359,000",
  heroSub: "The top-cap auto name dropped 6,000 won while KOSPI rose 1.65%. Foreigners sold ₩51.3B.",
  cards: [
    { icon:"🌍", big:"−₩51.3B", mid:"Foreign selling", sub:"A cash-market top sale" },
    { icon:"📊", big:"−1.64%", mid:"One-day drop", sub:"The opposite of the index" },
    { icon:"🔋", big:"−3.3%", mid:"LG Energy Solution", sub:"Autos and batteries paused together" },
  ],
  quote: "Foreigners sold about 140,000 shares. Money crowded into chips and left a large auto name. A ₩1,381 won print did not stop the sale.",
  noteHead: "Why it matters", noteSub: "When autos fade against a strong index, rotation is still late. Next: 359,000 won support and whether the foreign sale lasts. Hybrids and US plants remain a multi-year share fight.",
  footer: "Hyundai Motor · Stock",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.22 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"86,047", title:"비트코인이 8만6,047달러까지 오르며 1월 이후 고점을 경신했습니다",
      sub:"24시간 약 5.8% 상승입니다. 8만 달러는 이제 지지로 읽힙니다." },
    { color:"#facc15", fill:"#1a1600", right:"4,350달러", title:"금 현물이 온스당 약 4,350달러로 지난주 밴드에서 내려왔습니다",
      sub:"지난주 4,370~4,380달러보다 한 계단 낮습니다." },
    { color:"#818cf8", fill:"#0f1024", right:"2,667달러", title:"이더리움이 약 2,667달러로 3.37% 오르며 2,631달러를 지켰습니다",
      sub:"비트코인보다 오름폭은 작았습니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"4.49억", title:"숏 청산이 약 4억4,900만 달러로 집계됐습니다",
      sub:"빌려서 판 자리가 강제 종료되며 가격을 더 밀었습니다." },
  ],
  caption: "더 볼 것: 비트코인 8만6,047 · 금 4,350 · 이더 2,667 · 숏 청산 4.49억",
}, {
  headline: "2026.09.22 Safe-Haven Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$86,047", title:"Bitcoin reached about $86,047, a high since January",
      sub:"About +5.8% in 24 hours. The old $80,000 resistance is now talked about as support." },
    { color:"#facc15", fill:"#1a1600", right:"$4,350", title:"Spot gold sat near $4,350, a step below last week’s band",
      sub:"Last week’s $4,370–$4,380 band eased." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,667", title:"Ether rose about 3.37% to near $2,667 and held $2,631",
      sub:"A calmer climb than Bitcoin’s print." },
    { color:"#ef4444", fill:"#1a0a0a", right:"$449M", title:"Short liquidations were tallied near $449 million",
      sub:"Forced covering added fuel to the squeeze." },
  ],
  caption: "Watch: BTC $86,047 · gold $4,350 · ETH $2,667 · short liq $449M",
});

add("bitcoin-86047", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 8만6,047달러까지 오르며 1월 이후 고점을 경신했습니다",
  heroIcon: "₿", heroBig: "86,047달러",
  heroSub: "21일 저녁 비트스탬프 기준입니다. 코인게코는 약 8만5,935달러, 24시간 +5.8%로 집계했습니다.",
  cards: [
    { icon:"📈", big:"+5.8%", mid:"24시간 상승", sub:"1월 이후 가장 높은 구간입니다" },
    { icon:"🧱", big:"8만 달러", mid:"저항에서 지지로", sub:"이 선 위에서 잠을 잤습니다" },
    { icon:"💥", big:"4.49억", mid:"숏 청산", sub:"강제 종료가 연료가 됐습니다" },
  ],
  quote: "시가총액은 약 1.73조 달러, 거래대금은 약 548억 달러로 거론됐습니다. 9만 달러까지는 이 가격에서 약 4.6%입니다.",
  noteHead: "왜 중요한가", noteSub: "하룻밤 고점은 지지가 아닙니다. 8만6,000달러가 아침에도 남는지가 확인입니다. 반감기와 현물 펀드가 몇 년의 수요 바닥을 만들었고, 8만 달러 회복은 그 위 계단입니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BITCOIN", title: "Bitcoin reached about $86,047, a high since January",
  heroIcon: "₿", heroBig: "$86,047",
  heroSub: "Bitstamp print on the 21st evening. CoinGecko sat near $85,935, about +5.8% in 24 hours.",
  cards: [
    { icon:"📈", big:"+5.8%", mid:"24-hour gain", sub:"The highest band since January" },
    { icon:"🧱", big:"$80,000", mid:"Resistance to support", sub:"It slept above that line" },
    { icon:"💥", big:"$449M", mid:"Short liquidations", sub:"Forced covering added fuel" },
  ],
  quote: "Market cap was cited near $1.73T and volume near $54.8B. About 4.6% remains to $90,000.",
  noteHead: "Why it matters", noteSub: "A one-night high is not support. The check is whether $86,000 is still there in the morning. Halving and spot funds built a multi-year floor; reclaiming $80,000 is the next stair.",
  footer: "Bitcoin · Price",
});

add("gold-4350", "L3", "GOLD", {
  badge: "금", title: "금 현물이 온스당 약 4,350달러로 지난주 밴드에서 내려왔습니다",
  heroIcon: "🥇", heroBig: "4,350달러",
  heroSub: "이자를 주지 않는 자산이라 금리가 높으면 단기 부담이 됩니다. 비트코인이 더 빨리 오른 아침입니다.",
  cards: [
    { icon:"📉", big:"4,350", mid:"한 계단 하락", sub:"지난주 4,370~4,380보다 낮습니다" },
    { icon:"₿", big:"86,047", mid:"비트코인 급등", sub:"위험자산이 더 빨리 달렸습니다" },
    { icon:"💱", big:"달러", mid:"환율과 실질금리", sub:"온스 가격이 여기에 묶입니다" },
  ],
  quote: "주택보다 컴퓨터 투자가 커진 같은 주에 위험자산으로 돈이 가면 금은 쉬기도 합니다. 4,350달러가 바닥인지 경유인지가 확인입니다.",
  noteHead: "왜 중요한가", noteSub: "하루 30달러 이동이 준비 자산의 역할을 지우지는 않습니다. 달러인덱스와 10년 금리를 옆에 적으면 됩니다. 중앙은행 매수와 지정학이 남아 있으면 장기 칸은 유지됩니다.",
  footer: "금 · 현물",
}, {
  badge: "GOLD", title: "Spot gold sat near $4,350, a step below last week’s band",
  heroIcon: "🥇", heroBig: "$4,350",
  heroSub: "A non-yielding asset feels high rates quickly. Bitcoin ran faster overnight.",
  cards: [
    { icon:"📉", big:"$4,350", mid:"One step down", sub:"Below last week’s $4,370–$4,380" },
    { icon:"₿", big:"$86,047", mid:"Bitcoin surge", sub:"Risk ran faster than gold" },
    { icon:"💱", big:"USD", mid:"Dollar and real rates", sub:"The ounce is tied to both" },
  ],
  quote: "In a week when computer investment topped housing, money can leave gold for risk. The check is whether $4,350 is a floor or a waypoint.",
  noteHead: "Why it matters", noteSub: "A $30 one-day move does not erase gold’s reserve role. Log the dollar index and the 10-year beside the ounce. Central-bank buying and geopolitics still hold the long sleeve.",
  footer: "Gold · Spot",
});

add("ethereum-2667", "L2", "ETH", {
  badge: "이더리움", title: "이더리움이 약 2,667달러로 3.37% 오르며 2,631달러 지지를 지켰습니다",
  heroIcon: "◆", heroBig: "2,667달러",
  heroSub: "비트코인 8만6,000달러 급등보다 폭은 작습니다. 2,631달러가 거래가 몰린 지지로 거론됩니다.",
  cards: [
    { label: "24시간", big: "+3.37%", mid: "차분한 상승", sub: "비트코인 +5.8%보다 작습니다" },
    { label: "지지", big: "2,631달러", mid: "거래가 몰린 선", sub: "이 선이 남으면 2,700이 다음입니다" },
    { label: "어떤 집계", big: "2,748달러", mid: "더 높은 화면", sub: "아침마다 다시 보면 됩니다" },
  ],
  detailHead: "가격이 말해 주는 것",
  detailLines: [
    "현물 이더 펀드는 지난주 유입이 이어졌다는 집계가 있었습니다",
    "스마트계약은 응용 프로그램이 돌아가는 기반입니다",
    "비트코인 점유율이 높아지는 날 이더는 따라가되 늦습니다",
  ],
  quote: "2,631달러가 여러 날 남으면 2,700~2,800달러가 다음 구간입니다. 가격과 네트워크 사용량은 시차가 있습니다.",
  noteHead: "왜 중요한가", noteSub: "한 시점 2,667달러는 지지가 아닙니다. 2,631달러가 여러 날 남는지가 확인입니다. 현물 펀드가 생기며 기관 칸이 열렸고, 2,600달러대가 습관이 되면 다음 사이클의 바닥 이야기가 달라집니다.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETHER", title: "Ether rose about 3.37% to near $2,667 and held $2,631 support",
  heroIcon: "◆", heroBig: "$2,667",
  heroSub: "A calmer climb than Bitcoin’s $86,000 print. $2,631 is cited as the crowded support.",
  cards: [
    { label: "24 hours", big: "+3.37%", mid: "A quieter gain", sub:"Smaller than Bitcoin’s +5.8%" },
    { label: "Support", big: "$2,631", mid: "A crowded line", sub:"If it holds, $2,700 is next" },
    { label: "Some prints", big: "$2,748", mid: "A higher screen", sub:"Recheck each morning" },
  ],
  detailHead: "What the tape says",
  detailLines: [
    "Spot ether funds were still reported as taking in cash last week",
    "Smart contracts are the base layer apps run on",
    "When Bitcoin share rises, ether often follows late",
  ],
  quote: "If $2,631 holds for several days, $2,700–$2,800 is the next band. Price and network usage can lag each other.",
  noteHead: "Why it matters", noteSub: "A one-print $2,667 is not support. The check is whether $2,631 lasts several days. Spot funds opened an institutional sleeve; if the $2,600s become habit, the next cycle’s floor story changes.",
  footer: "Ether · Price",
});

add("btc-short-liq-449m", "L4", "BTC", {
  badge: "청산", title: "비트코인 급등 속에 숏 청산이 약 4억4,900만 달러로 집계됐습니다",
  badgeLine: "한 밤의 연료 · 새 매수 아님",
  heroIcon: "💥", heroBig: "4.49억 달러",
  heroSub: "숏은 가격이 내릴 것에 베팅해 빌려서 파는 자리입니다. 가격이 오르면 담보가 부족해 강제 종료됩니다.",
  cards: [
    { icon:"📉", big:"숏", mid:"빌려서 판 자리", sub:"내릴 것에 베팅한 포지션입니다" },
    { icon:"⚡", big:"청산", mid:"강제 종료", sub:"담보가 부족하면 자동으로 닫힙니다" },
    { icon:"₿", big:"86,047", mid:"같은 밤 고점", sub:"종료 매수가 가격을 밀었습니다" },
  ],
  quote: "청산은 새로운 매수가 아니라 기존 쇼트가 사면서 닫히는 흐름입니다. 일부 화면은 가상자산 전체 청산을 더 크게 보기도 했습니다.",
  noteHead: "왜 중요한가", noteSub: "한 번의 청산은 가격을 빠르게 올리지만 다음날 같은 연료가 없을 수 있습니다. 아침 안착이 그래서 중요합니다. 펀드 순유입이 이어지는지와 청산 규모가 줄어드는지를 표에 나란히 적으면 됩니다.",
  footer: "비트코인 · 청산",
}, {
  badge: "LIQ", title: "Short liquidations were tallied near $449 million as Bitcoin broke higher",
  badgeLine: "One-night fuel · not new buying",
  heroIcon: "💥", heroBig: "$449M",
  heroSub: "A short borrows to sell, betting price will fall. When price rises, collateral runs out and the book is forced closed.",
  cards: [
    { icon:"📉", big:"Short", mid:"A borrowed sale", sub:"A bet that price will fall" },
    { icon:"⚡", big:"Liquidation", mid:"A forced close", sub:"The book shuts when margin fails" },
    { icon:"₿", big:"$86,047", mid:"The same-night high", sub:"Covering helped push the print" },
  ],
  quote: "Liquidation is not new buying; it is old shorts buying to close. Some screens showed a larger crypto-wide total.",
  noteHead: "Why it matters", noteSub: "One squeeze can lift price fast, then the same fuel can be gone the next day. That is why the morning hold matters. Log whether fund inflows continue as liquidations shrink.",
  footer: "Bitcoin · Liquidations",
});

add("summary-krre", "ROWS", "JEONSE", {
  headline: "2026.09.22 한국부동산 한장 요약",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"+7.79%", title:"서울 아파트 전세가 올해 7.79% 올라 2015년 이후 가장 가쁩니다",
      sub:"지난해 같은 기간 1.16%의 약 4.7배입니다." },
    { color:"#f97316", fill:"#1a0d02", right:"10억", title:"동북권에도 전용 84제곱미터 전세 10억 원대가 등장했습니다",
      sub:"성북·동대문·강북·노원에서 호가와 계약이 잇따릅니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"119만 호", title:"정부가 2030년까지 공적주택 119만 호를 공급한다고 밝혔습니다",
      sub:"연평균 약 24만 호, 수도권 92만 호입니다." },
    { color:"#38bdf8", fill:"#061520", right:"17,012", title:"내년 서울 입주는 1만7,012가구로 올해보다 더 줄어듭니다",
      sub:"올해 예정 2만6,951가구도 지난해보다 27.4% 적습니다." },
  ],
  caption: "더 볼 것: 전세 +7.79% · 동북권 10억 · 공적주택 119만 호 · 2027 입주 17,012",
}, {
  headline: "2026.09.22 Housing Snapshot",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"+7.79%", title:"Seoul apartment jeonse is up 7.79% this year, the steepest since 2015",
      sub:"About 4.7 times last year’s pace through the same week." },
    { color:"#f97316", fill:"#1a0d02", right:"₩1B", title:"Northeast Seoul now sees 84-square-meter jeonse near ₩1 billion",
      sub:"Seongbuk, Dongdaemun, Gangbuk and Nowon are printing those asks." },
    { color:"#a78bfa", fill:"#120b1f", right:"1.19M", title:"The government pledged 1.19 million public homes by 2030",
      sub:"About 240,000 a year, 920,000 in the capital region." },
    { color:"#38bdf8", fill:"#061520", right:"17,012", title:"Seoul completions fall further to 17,012 homes in 2027",
      sub:"This year’s 26,951 planned units are already 27.4% below last year." },
  ],
  caption: "Watch: +7.79% YTD · northeast ₩1B · 1.19M public homes · 2027 completions 17,012",
});

add("seoul-jeonse-779", "L1", "JEONSE", {
  badge: "전세", title: "서울 아파트 전세가 올해 7.79% 올라 2015년 이후 가장 가픕니다",
  heroIcon: "🏠", heroBig: "+7.79%",
  heroSub: "전세는 보증금을 맡기고 사는 임대입니다. 9월 둘째 주까지 누적 상승률이 지난해 같은 기간 1.16%의 약 4.7배입니다.",
  cards: [
    { icon:"📅", big:"1.16%", mid:"지난해 같은 기간", sub:"올해 속도가 약 4.7배입니다" },
    { icon:"📈", big:"3.77%", mid:"지난해 연간", sub:"이미 그 숫자를 넘겼습니다" },
    { icon:"🕰️", big:"2015", mid:"10.79% 이후 최고", sub:"전세난이 심했던 해입니다" },
  ],
  quote: "올해 서울 입주 예정은 2만6,951가구로 지난해 3만7,103가구보다 27.4% 적습니다. 금리가 높아도 전세가 오르는 것은 공급이 가격을 이긴다는 뜻에 가깝습니다.",
  noteHead: "왜 중요한가", noteSub: "입주 절벽이 2027년까지 이어지면 전세는 몇 년의 상승 압력을 받습니다. 월간 상승이 7.79% 위로 더 가팔라지는지가 다음 확인입니다. 주거비는 임금과 같이 가야 도시가 버팁니다.",
  footer: "서울 전세 · 누적",
}, {
  badge: "JEONSE", title: "Seoul apartment jeonse is up 7.79% this year, the steepest since 2015",
  heroIcon: "🏠", heroBig: "+7.79%",
  heroSub: "Jeonse is a large-deposit rental. Through the second week of September the year-to-date gain is about 4.7 times last year’s 1.16%.",
  cards: [
    { icon:"📅", big:"1.16%", mid:"Same week last year", sub:"This year’s pace is about 4.7×" },
    { icon:"📈", big:"3.77%", mid:"Last year’s full year", sub:"Already above that print" },
    { icon:"🕰️", big:"2015", mid:"Highest since 10.79%", sub:"A year of tight jeonse" },
  ],
  quote: "Seoul completions this year are slated at 26,951, 27.4% below last year’s 37,103. Jeonse can rise even with high rates when supply, not the cost of money, sets the price.",
  noteHead: "Why it matters", noteSub: "If the completion cliff runs through 2027, jeonse stays under multi-year pressure. Next: whether monthly gains steepen above 7.79%. Housing costs have to move with wages for a city to hold.",
  footer: "Seoul jeonse · YTD",
});

add("northeast-jeonse-10eok", "L4", "JEONSE", {
  badge: "전세", title: "서울 동북권에도 전용 84제곱미터 전세 10억 원대가 등장했습니다",
  badgeLine: "호가와 계약이 섞여 있습니다",
  heroIcon: "🏘️", heroBig: "10억 원",
  heroSub: "전용 84제곱미터는 흔히 말하는 국민 평형입니다. 성북·동대문·강북·노원에서도 이 크기 전세가 10억 원대에 나왔습니다.",
  cards: [
    { icon:"📍", big:"동북권", mid:"중하위권으로 불리던 벨트", sub:"한강벨트보다 낮게 보던 지역입니다" },
    { icon:"📐", big:"84㎡", mid:"국민 평형", sub:"가장 많이 찾는 크기입니다" },
    { icon:"🏚️", big:"입주↓", mid:"매물이 줄어든 배경", sub:"중저가 전세가 먼저 올라갑니다" },
  ],
  quote: "호가와 실제 계약이 섞여 보도됐습니다. 모든 동이 10억 원은 아닙니다. 신규 계약이 10억이면 갱신 보증금과의 격차가 더 벌어집니다.",
  noteHead: "왜 중요한가", noteSub: "도시 전세가 바깥 고리까지 10억이면 주거 사다리가 몇 년 더 가팔라집니다. 동북권 실거래가 10억 원대를 반복하는지가 다음 확인입니다. 공공 임대와 매입 임대가 그 사다리를 받쳐야 합니다.",
  footer: "동북권 · 전세",
}, {
  badge: "JEONSE", title: "Northeast Seoul now sees 84-square-meter jeonse near ₩1 billion",
  badgeLine: "Asks and signed deals are mixed",
  heroIcon: "🏘️", heroBig: "₩1B",
  heroSub: "Eighty-four square meters is the common family size. Seongbuk, Dongdaemun, Gangbuk and Nowon now print that size near ₩1 billion.",
  cards: [
    { icon:"📍", big:"Northeast", mid:"Once a mid-to-low belt", sub:"Priced below the Han-river ring" },
    { icon:"📐", big:"84㎡", mid:"The family size", sub:"The most-sought floor plan" },
    { icon:"🏚️", big:"Fewer homes", mid:"Why listings thinned", sub:"Cheaper jeonse rises first" },
  ],
  quote: "Reports mix asking prices and signed contracts. Not every dong is ₩1 billion. A new ₩1B contract widens the gap versus a renewal deposit.",
  noteHead: "Why it matters", noteSub: "If outer-ring jeonse hits ₩1B, the housing ladder steepens for years. Next: whether northeast deals repeat that print. Public and purchased rentals have to hold the ladder.",
  footer: "Northeast · Jeonse",
});

add("public-housing-119m", "L6", "POLICY", {
  badge: "공급정책", title: "정부가 2030년까지 공적주택 119만 호를 공급한다고 밝혔습니다",
  breaking: "주거안정플랜 · 21일",
  heroBig: "119만 호", heroSub: "공적주택은 공공이 짓거나 돕는 분양·임대입니다. 연평균 약 24만 호, 수도권에 92만 호를 둡니다.",
  grid: [
    { icon:"🏙️", big:"92만", mid:"수도권", sub:"전체의 약 77%입니다" },
    { icon:"🏠", big:"24.3만", mid:"공공분양", sub:"사서 들어가는 칸입니다" },
    { icon:"🔑", big:"19만", mid:"보편형 임대", sub:"건설형 17.5만 + 매입 1.8만" },
    { icon:"📅", big:"17,012", mid:"2027 서울 입주", sub:"올해 매물을 바로 못 늘립니다" },
  ],
  ctx1: "발표와 착공은 시차가 있습니다. 내년 입주 절벽을 올해 숫자로 메우지는 못합니다.",
  ctx2: "실거주 유예는 시간을 사는 정책이고, 119만 호는 집을 늘리는 정책입니다.",
  quote: "국토부가 21일 발표한 목표 합입니다. 품질과 위치가 따라와야 수요가 이동합니다. 숫자만 큰 계획은 과거에 있었습니다.",
  noteHead: "왜 중요한가", noteSub: "2030년까지 공급이 숫자대로 나오면 전세 압력의 일부가 줄어들 수 있습니다. 다음에 볼 것은 연간 착공과 준공 실적입니다. 119만 호는 목표 합이고, 2027년 입주 1만7,012가구는 다른 줄입니다.",
  footer: "공적주택 · 2030",
}, {
  badge: "SUPPLY", title: "The government pledged 1.19 million public homes by 2030",
  breaking: "Housing plan · Sept 21",
  heroBig: "1.19M", heroSub: "Public homes are sale or rental units the state builds or backs. About 240,000 a year, 920,000 in the capital region.",
  grid: [
    { icon:"🏙️", big:"920k", mid:"Capital region", sub:"About 77% of the total" },
    { icon:"🏠", big:"243k", mid:"Public sale", sub:"The buy-to-live sleeve" },
    { icon:"🔑", big:"190k", mid:"Universal rental", sub:"175k built + 18k purchased" },
    { icon:"📅", big:"17,012", mid:"2027 Seoul completions", sub:"This year’s listings stay thin" },
  ],
  ctx1: "Announcement and groundbreaking sit years apart. This year’s print cannot fill the 2027 completion cliff.",
  ctx2: "Occupancy delays buy time. The 1.19 million homes are meant to add houses.",
  quote: "It is a target sum posted on the 21st. Demand moves only if quality and location follow. Large-number plans have existed before.",
  noteHead: "Why it matters", noteSub: "If supply lands as written through 2030, some jeonse pressure can ease. Next: yearly starts and completions. 1.19 million is a target sum; 17,012 Seoul completions in 2027 is a different line.",
  footer: "Public housing · 2030",
});

};
