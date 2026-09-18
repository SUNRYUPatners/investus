/* KR / Safe / KR-RE topics for 2026-09-18 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.18 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,715.41", title:"코스피가 0.04% 내린 6,715.41로 보합 마감했습니다",
      sub:"외국인이 2조2,803억 원을 팔았고 개인이 4,136억 원, 기관이 1,588억 원을 샀습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"25만2,500원", title:"삼성전자가 1,000원(0.39%) 내린 25만2,500원에 마쳤습니다",
      sub:"장중 고가는 25만9,000원이었고 외국인이 5,626억 원을 순매도했습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"174만5,000원", title:"SK하이닉스가 1만4,000원(0.80%) 내린 174만5,000원입니다",
      sub:"외국인이 1조2,336억 원을 팔며 전기전자 매도의 중심이 됐습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"36만3,000원", title:"현대차가 0.28% 오른 36만3,000원으로 소폭 반등했습니다",
      sub:"전날 하락 뒤 하루 만에 방향을 되돌린 시가총액 상위 완성차입니다." },
    { color:"#34d399", fill:"#052015", right:"+1.41%", title:"KB금융이 금리 인상 수혜 기대에 1.41% 올라 17만8,700원입니다",
      sub:"연준 인상 다음 날 은행주가 지수와 다른 방향으로 움직였습니다." },
  ],
  caption: "더 볼 것: 코스피 6,715.41 · 삼성전자 25만2,500원 · 하이닉스 174만5,000원 · 현대차 +0.28% · KB금융 +1.41%",
}, {
  headline: "2026.09.18 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,715.41", title:"KOSPI slipped 0.04% to close at 6,715.41 on Sept 17",
      sub:"Foreigners sold ₩2.28T; retail bought ₩414B and institutions ₩159B." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩252,500", title:"Samsung Electronics fell 0.39% to 252,500 won",
      sub:"The session high was 259,000 won; foreigners sold ₩563B." },
    { color:"#f59e0b", fill:"#1a1205", right:"₩1,745,000", title:"SK Hynix dropped 0.80% to 1,745,000 won",
      sub:"Foreigners sold ₩1.23T, the center of electronics outflows." },
    { color:"#fb7185", fill:"#1a0a10", right:"₩363,000", title:"Hyundai Motor bounced 0.28% to 363,000 won",
      sub:"A modest rebound for the top-cap automaker after the prior drop." },
    { color:"#34d399", fill:"#052015", right:"+1.41%", title:"KB Financial rose 1.41% to 178,700 won on rate-hike hopes",
      sub:"Bank shares moved opposite the index the day after the Fed hike." },
  ],
  caption: "Watch: KOSPI 6,715.41 · Samsung 252,500 · Hynix 1,745,000 · Hyundai +0.28% · KB +1.41%",
});

add("kospi-6715-pause", "L6", "KOSPI", {
  badge: "코스피", title: "코스피가 보합권에서 2.56포인트 내려 6,715.41로 마감했습니다",
  breaking: "보합 마감 · −0.04%",
  heroBig: "6,715.41", heroSub: "9월 17일 종가 6,715.41로 0.04% 내렸습니다. 고가 6,795, 저가 6,697을 오갔습니다.",
  grid: [
    { icon:"🌍", big:"−2.28조", mid:"외국인 순매도", sub:"전기전자 매도가 중심" },
    { icon:"👤", big:"+4,136억", mid:"개인 순매수", sub:"저가 매수로 받쳤습니다" },
    { icon:"🏦", big:"+1,588억", mid:"기관 순매수", sub:"외국인 매도의 일부를 소화" },
    { icon:"💱", big:"1,382원", mid:"원·달러", sub:"환율은 높은 구간에 머물렀습니다" },
  ],
  ctx1: "상승 종목 453개, 하락 종목 398개로 종목 수는 오른 쪽이 조금 더 많았습니다.",
  ctx2: "코스닥은 6.20포인트 오른 822.18로 마감해 코스피와 방향이 갈렸습니다.",
  quote: "전날 반도체 반등 뒤에 나온 숨 고르기입니다. 외국인이 삼성전자와 SK하이닉스를 함께 팔며 지수를 눌렀고, 개인과 기관이 받아냈습니다.",
  noteHead: "왜 중요한가", noteSub: "0.04% 하락은 방향이 꺾였다기보다 하루 쉬어 간 숫자에 가깝습니다. 외국인 2조 원대 매도가 계속되면 반도체가 지수를 다시 눌러 내릴 수 있습니다. 다음 거래일 외국인 수급과 원·달러 1,380원대가 첫 확인입니다.",
  footer: "코스피 · 보합",
}, {
  badge: "KOSPI", title: "KOSPI slipped 2.56 points to close at 6,715.41, essentially flat",
  breaking: "Flat close · -0.04%",
  heroBig: "6,715.41", heroSub: "Sept 17 close, down 0.04%. High 6,795.53, low 6,697.85.",
  grid: [
    { icon:"🌍", big:"-₩2.28T", mid:"Foreign selling", sub:"Led by electronics" },
    { icon:"👤", big:"+₩414B", mid:"Retail buying", sub:"Bargain bids held the floor" },
    { icon:"🏦", big:"+₩159B", mid:"Institutional buying", sub:"Absorbed part of the outflow" },
    { icon:"💱", big:"₩1,382", mid:"USD/KRW", sub:"The won stayed in a weak band" },
  ],
  ctx1: "Advancers 453 vs decliners 398 — more stocks were up than down.",
  ctx2: "KOSDAQ rose 6.20 points to 822.18, splitting from KOSPI.",
  quote: "A pause after the prior semiconductor bounce. Foreigners sold Samsung and SK Hynix together; retail and institutions absorbed the flow.",
  noteHead: "Why it matters", noteSub: "A 0.04% dip is a rest, not a trend break. Another ₩2T-class foreign sale could press chips — and the index — again. Next: whether foreigners return and whether USD/KRW stays near 1,382.",
  footer: "KOSPI · Flat close",
});

add("samsung-electronics-252500", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 25만2,500원으로 0.39% 내리며 하루 반등을 반납했습니다",
  heroIcon: "📱", heroBig: "25만2,500원",
  heroSub: "9월 17일 종가로 전일보다 1,000원(0.39%) 내렸습니다. 장중 고가는 25만9,000원으로, 오전에 올랐다가 외국인 매도에 밀렸습니다.",
  cards: [
    { icon:"🌍", big:"−5,626억", mid:"외국인 순매도", sub:"전기전자 매도의 한 축" },
    { icon:"📈", big:"25만9,000원", mid:"장중 고가", sub:"고가를 지키지 못했습니다" },
    { icon:"💱", big:"1,382원", mid:"원·달러", sub:"환율이 외국인 매도를 거들었습니다" },
  ],
  quote: "전날 2% 반등 뒤에 나온 숨 고르기입니다. 외국인이 삼성전자를 5,626억 원 팔았고, 같은 날 SK하이닉스 매도와 겹쳐 반도체 수급이 무거웠습니다.",
  noteHead: "왜 중요한가", noteSub: "시가총액 1위가 보합권에서 내리면 지수 전체 온도가 같이 식습니다. 장중 25만9,000원까지 올라간 것은 매수세가 완전히 사라진 것은 아니라는 뜻입니다. 외국인 매도가 하루 만에 멈추는지가 다음 확인입니다.",
  footer: "삼성전자 · 주가",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics gave back a day’s bounce, closing 0.39% lower at 252,500 won",
  heroIcon: "📱", heroBig: "₩252,500",
  heroSub: "Sept 17 close, down 1,000 won (0.39%). The session high was 259,000 won before foreign selling pressed the tape.",
  cards: [
    { icon:"🌍", big:"-₩563B", mid:"Foreign selling", sub:"One leg of electronics outflows" },
    { icon:"📈", big:"₩259,000", mid:"Session high", sub:"The high did not hold" },
    { icon:"💱", big:"₩1,382", mid:"USD/KRW", sub:"A weak won added to selling" },
  ],
  quote: "A pause after the prior 2% bounce. Foreigners sold ₩563B of Samsung, overlapping SK Hynix sales the same day.",
  noteHead: "Why it matters", noteSub: "When KOSPI’s largest name eases, the whole index cools with it. The push to 259,000 won shows bids were not gone. Next: whether foreign selling stops after one session.",
  footer: "Samsung Electronics · Stock",
});

add("sk-hynix-1745000", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 174만5,000원으로 0.80% 내리며 외국인 매도의 중심이 됐습니다",
  heroIcon: "💾", heroBig: "174만5,000원",
  heroSub: "9월 17일 종가로 전일보다 1만4,000원(0.80%) 내렸습니다. 장중 고가는 178만5,000원이었습니다.",
  cards: [
    { label: "외국인", big: "−1조2,336억", mid: "하루 순매도", sub: "전기전자 매도의 가장 큰 덩어리" },
    { label: "장중 고가", big: "178만5,000원", mid: "오전에 찍은 고점", sub: "고가를 지키지 못했습니다" },
    { label: "전일 대비", big: "−0.80%", mid: "하루 등락", sub: "전날 4% 반등 뒤 조정" },
  ],
  detailHead: "하루에 보인 수급",
  detailLines: [
    "외국인이 하이닉스 한 종목에서 1조 원이 넘는 매도를 냈습니다",
    "삼성전자 매도와 겹쳐 반도체 수급이 하루 종일 무거웠습니다",
    "개인과 기관이 지수를 받쳤지만 이 종목 종가는 마이너스였습니다",
  ],
  quote: "전날 임단협 가결과 미국 생산 검토로 4% 올랐던 종목이, 하루 만에 외국인 매도로 숨을 고른 모습입니다. 실적 재료와 수급이 같은 주에 겹쳤습니다.",
  noteHead: "왜 중요한가", noteSub: "HBM 수요라는 장기 축은 하루 매도로 사라지지 않습니다. 다만 1조 원대 외국인 매도가 이어지면 주가 온도는 더 식을 수 있습니다. 다음 거래일 순매도와 178만 원대 회복 여부를 보면 됩니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "SK HYNIX", title: "SK Hynix fell 0.80% to 1,745,000 won as the center of foreign selling",
  heroIcon: "💾", heroBig: "₩1,745,000",
  heroSub: "Sept 17 close, down 14,000 won (0.80%). The session high was 1,785,000 won.",
  cards: [
    { label: "Foreigners", big: "-₩1.23T", mid: "One-day net sales", sub: "The largest electronics outflow" },
    { label: "Session high", big: "₩1,785,000", mid: "Morning print", sub: "The high did not hold" },
    { label: "Day change", big: "-0.80%", mid: "Vs prior close", sub: "A pause after a 4% bounce" },
  ],
  detailHead: "Flows in one session",
  detailLines: [
    "Foreigners sold more than ₩1T of this single name",
    "Samsung sales the same day made chip flows heavy all session",
    "Retail and institutions supported the index, but this close was red",
  ],
  quote: "A name that jumped 4% on a labor deal and US-plant talk paused under foreign selling the next day. Fundamentals and flows shared the week.",
  noteHead: "Why it matters", noteSub: "HBM demand does not vanish on one day’s tape. Another ₩1T-class sale could still cool the stock. Next: the following session’s flow and whether 1.785 million won is reclaimed.",
  footer: "SK Hynix · Stock",
});

add("hyundai-motor-363000", "L5", "AUTO", {
  badge: "현대차", title: "현대차가 36만3,000원으로 0.28% 오르며 전날 하락을 하루 만에 되돌렸습니다",
  heroIcon: "🚗", heroBig: "36만3,000원",
  heroSub: "9월 17일 종가는 전일보다 1,000원(0.28%) 오른 36만3,000원입니다. 코스피가 보합 약세인 날 시가총액 상위 완성차가 소폭 올랐습니다.",
  before: { label: "전날 종가", big: "36만2,000원", sub: "반도체 강세와 갈렸던 날" },
  after: { label: "17일 종가", big: "36만3,000원", sub: "0.28% 반등" },
  cards: [
    { icon:"🏭", big:"시총 상위", mid:"완성차 대장", sub:"지수와 하루 방향이 달랐습니다" },
    { icon:"🛢️", big:"유가", mid:"100달러 안팎", sub:"원유 조정이 할인율 부담을 덜었습니다" },
    { icon:"📊", big:"+0.28%", mid:"하루 등락", sub:"큰 반등은 아니고 되돌림입니다" },
  ],
  quote: "전날 반도체가 오를 때 현대차는 내렸고, 다음 날 반도체가 쉴 때 현대차는 소폭 올랐습니다. 업종 순환이 하루 단위로 나타난 모습입니다.",
  noteHead: "왜 중요한가", noteSub: "유가와 금리가 높은 구간에서는 완성차가 반도체와 다른 방향으로 움직이기 쉽습니다. 0.28%는 추세 전환이라기보다 하루 되돌림입니다. 원유가 100달러 아래에서 안정되는지가 다음 온도입니다.",
  footer: "현대차 · 주가",
}, {
  badge: "HYUNDAI", title: "Hyundai Motor bounced 0.28% to 363,000 won, reversing the prior day’s drop",
  heroIcon: "🚗", heroBig: "₩363,000",
  heroSub: "Sept 17 close was 363,000 won, up 1,000 won (0.28%). The top-cap automaker rose on a flat-to-soft KOSPI day.",
  before: { label: "Prior close", big: "₩362,000", sub: "Diverged from chip strength" },
  after: { label: "Sept 17 close", big: "₩363,000", sub: "A 0.28% bounce" },
  cards: [
    { icon:"🏭", big:"Top-cap auto", mid:"Sector leader", sub:"Moved opposite the index for a day" },
    { icon:"🛢️", big:"Oil", mid:"Around $100", sub:"A crude pause eased discount-rate stress" },
    { icon:"📊", big:"+0.28%", mid:"Day change", sub:"A retrace, not a breakout" },
  ],
  quote: "Hyundai fell when chips rallied, then ticked up when chips paused. A one-day rotation between sectors.",
  noteHead: "Why it matters", noteSub: "Autos often diverge from chips when oil and rates are high. 0.28% is a retrace, not a trend flip. Next: whether crude stays below $100.",
  footer: "Hyundai Motor · Stock",
});

add("kb-financial-178700", "L3", "BANK", {
  badge: "KB금융", title: "KB금융이 17만8,700원으로 1.41% 오르며 금리 인상 다음 날 은행주가 강했습니다",
  heroIcon: "🏦", heroBig: "+1.41%",
  heroSub: "KB금융은 국민은행을 거느린 금융지주입니다. 9월 17일 종가는 전일보다 1.41% 오른 17만8,700원이었습니다. 연준 인상 다음 한국 거래일에 은행주가 지수를 앞섰습니다.",
  cards: [
    { icon:"📈", big:"17만8,700원", mid:"종가", sub:"시가총액 상위 금융주" },
    { icon:"🌐", big:"연준 인상", mid:"전날 0.25%p", sub:"순이자마진 기대가 붙었습니다" },
    { icon:"💱", big:"환율", mid:"1,382원", sub:"원화 약세 구간에서도 은행이 강했습니다" },
  ],
  quote: "기준금리가 오르면 예금과 대출 이자의 차이, 곧 순이자마진이 넓어질 수 있습니다. 그날 코스피는 보합 약세였는데 KB금융만 1% 넘게 오른 이유입니다.",
  noteHead: "왜 중요한가", noteSub: "금리 인상은 주식 할인율을 올리지만 은행에는 마진 이야기가 붙습니다. 하루 1.41%가 추세가 되려면 국내 금리와 대출 수요가 따라와야 합니다. 다음 주 은행 업종 상대 강도가 확인입니다.",
  footer: "KB금융 · 주가",
}, {
  badge: "KB FINANCIAL", title: "KB Financial rose 1.41% to 178,700 won as banks firmed the day after the Fed hike",
  heroIcon: "🏦", heroBig: "+1.41%",
  heroSub: "KB Financial is the holding company for Kookmin Bank. It closed 1.41% higher at 178,700 won on Sept 17, outpacing a flat KOSPI.",
  cards: [
    { icon:"📈", big:"₩178,700", mid:"Close", sub:"A top-cap financial" },
    { icon:"🌐", big:"Fed hike", mid:"25bp the prior day", sub:"Net-interest-margin hopes attached" },
    { icon:"💱", big:"FX", mid:"₩1,382", sub:"Banks still firmed with a weak won" },
  ],
  quote: "Higher policy rates can widen the gap between loan and deposit rates — net interest margin. That is why KB gained more than 1% on a flat KOSPI day.",
  noteHead: "Why it matters", noteSub: "Rate hikes lift equity discount rates but can help bank margins. For 1.41% to become a trend, domestic rates and loan demand have to follow. Next: relative strength in Korean banks this week.",
  footer: "KB Financial · Stock",
});

add("summary-safe", "ROWS", "GOLD", {
  headline: "2026.09.18 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"76,440달러", title:"비트코인이 7만6,000달러 위에서 0.8% 오르며 저점을 지켰습니다",
      sub:"24시간 저점은 7만5,064달러였고, 연준 인상 충격을 하루 더 소화했습니다." },
    { color:"#facc15", fill:"#1a1600", right:"4,380달러", title:"금이 6주 저점에서 반등해 4,370~4,380달러로 올라왔습니다",
      sub:"달러와 유가 움직임이 겹치며 안전자산 수요가 다시 붙었습니다." },
    { color:"#818cf8", fill:"#15162a", right:"2,440달러", title:"이더리움이 2,440달러에서 변동이 줄며 2,400달러를 지켰습니다",
      sub:"전날보다 변동이 줄며 2,400달러 선을 지킨 하루입니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"66달러", title:"은이 온스당 63~66달러 구간에서 금보다 크게 출렁였습니다",
      sub:"금 반등에 따라붙되 하루 진폭은 더 넓었습니다." },
    { color:"#f97316", fill:"#1a0d02", right:"101달러", title:"WTI 원유가 101달러 안팎에서 1~3% 내리며 조정을 이어갔습니다",
      sub:"100달러를 넘긴 뒤 재고와 공급 해석이 갈리는 조정입니다." },
  ],
  caption: "더 볼 것: BTC 7만6,440달러 · 금 4,380달러 · 이더 2,440달러 · 은 66달러 · WTI 101달러",
}, {
  headline: "2026.09.18 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$76,440", title:"Bitcoin held above $76,000, up about 0.8%",
      sub:"It digested the Fed hike for a second session." },
    { color:"#facc15", fill:"#1a1600", right:"$4,380", title:"Gold bounced from six-week lows to $4,370-$4,380",
      sub:"A mix of dollar and oil moves brought safe-haven bids back." },
    { color:"#818cf8", fill:"#15162a", right:"$2,440", title:"Ether sat near $2,430-$2,440, swinging less than bitcoin",
      sub:"It held the $2,400 area with a quieter session than the prior day." },
    { color:"#94a3b8", fill:"#0c1017", right:"$66", title:"Silver traded $63-$66 an ounce, swinging more than gold",
      sub:"It followed the gold bounce with a wider daily range." },
    { color:"#f97316", fill:"#1a0d02", right:"$101", title:"WTI crude eased 1-3% around $101 a barrel",
      sub:"A pause after clearing $100, with mixed inventory reads." },
  ],
  caption: "Watch: BTC $76,440 · gold $4,380 · ether $2,440 · silver $66 · WTI $101",
});

add("bitcoin-76440", "L2", "BTC", {
  badge: "비트코인", title: "비트코인이 7만6,440달러 근처에서 0.8% 오르며 7만6,000달러를 지켰습니다",
  heroIcon: "₿", heroBig: "$76,440",
  heroSub: "24시간 저점은 7만5,064달러였습니다. 연준 인상 다음 날에도 7만6,000달러 위에서 거래되며 충격을 하루 더 소화했습니다.",
  cards: [
    { label: "저점", big: "$75,064", mid: "24시간 하단", sub: "이 구간을 지키고 되돌렸습니다" },
    { label: "현재가", big: "$76,440", mid: "약 +0.8%", sub:"7만6,000달러 위에서 마감권" },
    { label: "배경", big: "연준 인상", mid: "이미 반영된 결정", sub:"추가 인상 전망은 남아 있습니다" },
  ],
  detailHead: "금리가 오른 뒤에도 버틴 이유",
  detailLines: [
    "시장은 인상 자체를 이미 가격에 넣고 있어 둘째 날 충격이 작았습니다",
    "7만5,000달러 부근에서 매수가 나와 7만6,000달러 위로 되돌렸습니다",
    "이더보다 변동이 작아 메이저 안에서는 상대적으로 차분했습니다",
  ],
  quote: "비트코인은 이자를 주지 않는 자산이라 금리 인상은 단기 부담입니다. 이미 반영된 인상이라 둘째 날에는 저점을 지키고 되돌리는 흐름이 나타났습니다.",
  noteHead: "왜 중요한가", noteSub: "7만6,000달러가 여러 차례 지지되면 인상 충격이 짧게 끝났다는 신호가 됩니다. 반대로 7만5,000달러가 깨지면 다음 지지 탐색이 시작됩니다. 현물 ETF 자금 흐름을 같이 보면 됩니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BTC", title: "Bitcoin held the $76,000 area near $76,440, up about 0.8%",
  heroIcon: "₿", heroBig: "$76,440",
  heroSub: "The 24-hour low was $75,064. A second session after the Fed hike still traded above $76,000.",
  cards: [
    { label: "Low", big: "$75,064", mid: "24-hour floor", sub: "Bids showed up and reversed it" },
    { label: "Spot", big: "$76,440", mid: "About +0.8%", sub: "Holding the $76,000 band" },
    { label: "Backdrop", big: "Fed hike", mid: "Already priced", sub: "More hikes still in the outlook" },
  ],
  detailHead: "Why it held after the hike",
  detailLines: [
    "The hike itself was already in the tape, so day-two shock was smaller",
    "Buys around $75,000 lifted it back above $76,000",
    "It swung less than ether among the majors",
  ],
  quote: "Bitcoin pays no yield, so rate hikes are a near-term headwind. Because this hike was priced, day two found a low and reversed.",
  noteHead: "Why it matters", noteSub: "Repeated holds of $76,000 would argue the hike shock was brief. A break of $75,000 would start a hunt for the next floor. Watch spot ETF flows alongside the tape.",
  footer: "Bitcoin · Price",
});

add("gold-4380-bounce", "L1", "GOLD", {
  badge: "금", title: "금이 6주 저점에서 반등해 온스당 4,370~4,380달러로 올라왔습니다",
  heroIcon: "🥇", heroBig: "$4,380",
  heroSub: "금 현물이 최근 6주 저점에서 2%대 반등하며 4,370~4,380달러 부근을 회복했습니다. 달러와 유가 움직임이 겹친 하루입니다.",
  cards: [
    { icon:"📉", big:"6주 저점", mid:"직전 하단", sub:"그 자리에서 매수가 나왔습니다" },
    { icon:"💱", big:"달러", mid:"숨 고르기", sub:"달러가 쉬면 금이 숨을 고릅니다" },
    { icon:"🛢️", big:"유가", mid:"100달러 안팎 조정", sub:"물가 재료가 하루 누그러졌습니다" },
  ],
  quote: "금은 이자를 주지 않아 금리가 오르면 단기 부담을 받습니다. 이미 반영된 인상 뒤에 달러와 유가가 쉬면, 저가 매수가 붙는 날이 나옵니다. 오늘이 그 반등 구간에 가깝습니다.",
  noteHead: "왜 중요한가", noteSub: "4,370달러 부근이 지지로 남으면 6주 조정 이후 바닥 탐색이 진행 중이라는 뜻입니다. 연내 추가 인상 전망이 남아 있어 반등 폭은 제한될 수 있습니다. 달러인덱스와 금리가 같이 내려가는지가 다음 확인입니다.",
  footer: "금 · 시세",
}, {
  badge: "GOLD", title: "Gold bounced from six-week lows to about $4,370-$4,380 an ounce",
  heroIcon: "🥇", heroBig: "$4,380",
  heroSub: "Spot gold recovered about 2% from recent six-week lows into the $4,370-$4,380 area as the dollar and oil paused.",
  cards: [
    { icon:"📉", big:"6-week low", mid:"Prior floor", sub:"Bids showed up there" },
    { icon:"💱", big:"Dollar", mid:"A pause", sub:"A softer dollar lets gold breathe" },
    { icon:"🛢️", big:"Oil", mid:"~$100 pause", sub:"An inflation input cooled for a day" },
  ],
  quote: "Gold pays no yield, so higher rates are a headwind. After a priced hike, a pause in the dollar and oil can invite bargain buying. Today sits in that bounce zone.",
  noteHead: "Why it matters", noteSub: "If $4,370 holds, a floor hunt after a six-week slide is underway. More hikes still cap how far the bounce runs. Next: whether the dollar and yields ease together.",
  footer: "Gold · Price",
});

add("ethereum-2440", "L3", "ETH", {
  badge: "이더리움", title: "이더리움이 2,430~2,440달러에서 2,400달러 선을 지키며 변동이 줄었습니다",
  heroIcon: "⟠", heroBig: "$2,440",
  heroSub: "이더리움은 스마트계약을 쓰는 대표 네트워크입니다. 전날 4%대 약세 뒤에 2,430~2,440달러에서 숨 고르기를 하며 2,400달러 선을 지켰습니다.",
  cards: [
    { icon:"🛡️", big:"2,400달러", mid:"지지 구간", sub:"전날 저점권에서 하루 버텼습니다" },
    { icon:"₿", big:"BTC 대비", mid:"상대적으로 차분", sub:"메이저 중 변동이 줄었습니다" },
    { icon:"📜", big:"규제", mid:"여파 소화", sub:"금리와 규제 재료를 이틀째 반영 중" },
  ],
  quote: "이더는 비트코인보다 규제와 금리에 민감하게 흔들리는 날이 많습니다. 전날 크게 밀린 뒤 하루 변동이 줄어든 것은, 2,400달러 선에서 매수가 나왔다는 뜻입니다.",
  noteHead: "왜 중요한가", noteSub: "2,400달러가 여러 차례 지지되면 급락이 짧게 끝났다는 신호가 됩니다. ETF 자금이 다시 들어오는지가 이 선의 힘을 가늠하는 보조 지표입니다. 비트코인 7만6,000달러와 같이 보면 됩니다.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETH", title: "Ether held the $2,400 area near $2,430-$2,440 with a quieter session",
  heroIcon: "⟠", heroBig: "$2,440",
  heroSub: "Ether is the main smart-contract network. After a 4% slide, it paused at $2,430-$2,440 and kept $2,400.",
  cards: [
    { icon:"🛡️", big:"$2,400", mid:"Support zone", sub:"It held the prior low area for a day" },
    { icon:"₿", big:"Vs BTC", mid:"Quieter tape", sub:"Less swing among the majors" },
    { icon:"📜", big:"Policy", mid:"Digesting news", sub:"Rates and regulation still in the mix" },
  ],
  quote: "Ether often swings more than bitcoin on rates and regulation. A quieter day after a sharp drop means bids appeared near $2,400.",
  noteHead: "Why it matters", noteSub: "Repeated holds of $2,400 would argue the slide was brief. ETF flows returning would back that floor. Watch it with bitcoin at $76,000.",
  footer: "Ethereum · Price",
});

add("silver-66", "L4", "SILVER", {
  badge: "은", title: "은이 온스당 63~66달러에서 금보다 크게 출렁이며 반등에 따라붙었습니다",
  badgeLine: "금 반등 · 더 큰 진폭",
  heroIcon: "⚪", heroBig: "$63~66",
  heroSub: "은 현물은 산업 수요와 안전자산 수요가 겹치는 금속입니다. 금이 4,370달러대로 반등하는 동안 은은 63~66달러 구간에서 더 넓게 움직였습니다.",
  cards: [
    { icon:"🥇", big:"금 추종", mid:"같은 방향", sub:"금이 오르면 은도 따라붙는 날이 많습니다" },
    { icon:"📊", big:"더 큰 진폭", mid:"하루 변동", sub:"금보다 출렁임이 컸습니다" },
    { icon:"🏭", big:"산업 수요", mid:"전기·태양광", sub:"안전자산 외에 공장 수요도 있습니다" },
  ],
  quote: "은은 금보다 시장이 작아 같은 뉴스에도 가격 폭이 커지기 쉽습니다. 금 반등에 따라붙되, 63달러 하단과 66달러 상단을 하루 안에 오가는 모습이었습니다.",
  noteHead: "왜 중요한가", noteSub: "은의 큰 진폭은 금 반등이 투기적 자금까지 끌어들였는지를 보는 보조 지표입니다. 66달러 위가 유지되면 금속 전반의 온기가 됩니다. 금 4,370달러 지지와 같이 보면 됩니다.",
  footer: "은 · 시세",
}, {
  badge: "SILVER", title: "Silver swung $63-$66 an ounce, tracking gold’s bounce with a wider range",
  badgeLine: "Gold bounce · wider swings",
  heroIcon: "⚪", heroBig: "$63-66",
  heroSub: "Silver mixes industrial demand with safe-haven demand. While gold bounced toward $4,370, silver moved more widely between $63 and $66.",
  cards: [
    { icon:"🥇", big:"With gold", mid:"Same direction", sub:"Silver often tags along when gold rallies" },
    { icon:"📊", big:"Wider range", mid:"Day swing", sub:"It moved more than gold" },
    { icon:"🏭", big:"Industry", mid:"Power and solar", sub:"Factory demand sits beside the haven bid" },
  ],
  quote: "Silver’s market is smaller than gold’s, so the same news can move it more. It followed gold’s bounce while tagging $63 and $66 in one session.",
  noteHead: "Why it matters", noteSub: "A wide silver range is a check on whether gold’s bounce pulled in faster money. Holds above $66 would warm the metals complex. Watch it with gold at $4,370.",
  footer: "Silver · Price",
});

add("oil-wti-101", "L6", "OIL", {
  badge: "원유", title: "WTI 원유가 배럴당 101달러 안팎에서 1~3% 내리며 100달러 위 급등 뒤 조정을 이어갔습니다",
  breaking: "100달러 위 조정",
  heroBig: "$101", heroSub: "WTI가 101달러 전후에서 조정하며 100달러 위 급등 뒤 숨 고르기를 이어갔습니다.",
  grid: [
    { icon:"🛢️", big:"~$101", mid:"WTI 근방", sub:"전날 102달러대에서 내려왔습니다" },
    { icon:"📉", big:"−1~3%", mid:"하루 등락", sub:"급등 뒤 조정 폭입니다" },
    { icon:"📦", big:"재고", mid:"해석 갈림", sub:"늘었다·줄었다 집계가 엇갈립니다" },
    { icon:"🌐", big:"물가", mid:"연준 재료", sub:"100달러 유가가 금리 이야기에 남아 있습니다" },
  ],
  ctx1: "유가가 100달러 위에 머물면 휘발유와 운송비가 소비자물가로 번질 수 있습니다.",
  ctx2: "하루 하락만으로 급등이 끝났다고 보기에는 이릅니다.",
  quote: "원유는 안전자산 화면에서도 금리·금과 같은 줄에 놓입니다. 100달러를 넘긴 에너지 가격이 물가 이유로 거론된 뒤, 시장은 재고 숫자를 놓고 하루씩 방향을 저울질합니다.",
  noteHead: "왜 중요한가", noteSub: "유가가 100달러 아래에서 며칠 연속 안정되면 금리 추가 인상 부담이 줄어듭니다. 반대로 공급 차질이 다시 불거지면 101달러가 바닥이 아닐 수 있습니다. 다음 주간 재고와 중동 공급 뉴스를 보면 됩니다.",
  footer: "원유 · WTI",
}, {
  badge: "OIL", title: "WTI crude eased 1-3% around $101 a barrel, extending the pause after $100",
  breaking: "Post-$100 pause",
  heroBig: "$101", heroSub: "WTI hovered near $101, cooling after clearing $100 as inventory reads still conflict.",
  grid: [
    { icon:"🛢️", big:"~$101", mid:"WTI area", sub:"Down from the prior $102 handle" },
    { icon:"📉", big:"-1 to -3%", mid:"Day change", sub:"The size of the post-spike pause" },
    { icon:"📦", big:"Stocks", mid:"Mixed reads", sub:"Build vs draw tallies disagree" },
    { icon:"🌐", big:"Inflation", mid:"Fed input", sub:"Oil above $100 stays in the rates story" },
  ],
  ctx1: "Oil above $100 can leak into gasoline and shipping, then consumer prices.",
  ctx2: "One down day does not prove the spike is over.",
  quote: "Crude sits on the same safe-asset board as rates and gold. After oil above $100 was cited in the inflation case, the tape weighs inventories one session at a time.",
  noteHead: "Why it matters", noteSub: "Several closes below $100 would ease extra-hike pressure. Fresh supply shocks could mean $101 is not the floor. Next: weekly inventories and Middle East supply headlines.",
  footer: "Oil · WTI",
});

add("summary-krre", "ROWS", "POLICY", {
  headline: "2026.09.18 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"2027년 말", title:"토지거래허가 실거주 유예가 2027년 말까지 1년 연장됩니다",
      sub:"갱신 계약도 포함하고 10월 1일부터 시행되며, 최장 2029년까지 미룰 수 있습니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"+10.11%", title:"서울 동북권 전세가 올해 10.11% 올라 11년 만에 두 자릿수입니다",
      sub:"10·15 대책 이후 동북권 매물이 44.6% 줄어 전셋값을 밀어 올렸습니다." },
    { color:"#38bdf8", fill:"#061520", right:"2.9배", title:"2028년 서울 이주 수요가 입주 물량의 2.9배로 추산됩니다",
      sub:"이주 4만5,256가구 대비 입주 1만5,388가구로, 전세 공백이 그해 가장 큽니다." },
    { color:"#34d399", fill:"#052015", right:"7억1,178만", title:"KB 서울 평균 전세가 1년 전보다 9.2% 오른 7억1,178만 원입니다",
      sub:"실거주 유예와 전세 급등이 같은 주에 겹친 시장입니다." },
  ],
  caption: "더 볼 것: 실거주 유예 2027년 말 · 동북권 전세 +10.11% · 2028년 이주 2.9배 · 서울 평균 전세 7.1억",
}, {
  headline: "2026.09.18 Korea Real Estate Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"End-2027", title:"Occupancy rule delayed a year, through end-2027",
      sub:"Renewals are included, it starts Oct 1, and the maximum delay runs to 2029." },
    { color:"#fb923c", fill:"#1a0d02", right:"+10.11%", title:"NE Seoul jeonse +10.11% YTD, first double digits in 11 years",
      sub:"Listings there have fallen 44.6% since the Oct 15 policy." },
    { color:"#38bdf8", fill:"#061520", right:"2.9×", title:"2028 Seoul moves are 2.9 times new occupancy",
      sub:"45,256 moves vs 15,388 completions — the widest jeonse gap that year." },
    { color:"#34d399", fill:"#052015", right:"₩712M", title:"KB’s Seoul average jeonse is ₩711.78M, up 9.2% year on year",
      sub:"The occupancy delay and a jeonse spike share the same week." },
  ],
  caption: "Watch: occupancy delay to end-2027 · NE jeonse +10.11% · 2028 moves 2.9× · Seoul avg jeonse ₩712M",
});

add("occupancy-exemption-2027", "L6", "POLICY", {
  badge: "공급정책", title: "토지거래허가구역 실거주 의무 유예가 2027년 말까지 1년 연장됩니다",
  breaking: "10월 1일 시행",
  heroBig: "2027년 말", heroSub: "실거주는 산 집에 직접 사는 의무입니다. 허가구역 기한이 2027년 말로 늘고 갱신 계약도 포함됩니다.",
  grid: [
    { icon:"📅", big:"10/1", mid:"시행일", sub:"국토부 발표 기준입니다" },
    { icon:"🔁", big:"갱신 포함", mid:"재계약도 대상", sub:"신규만 해당하지 않습니다" },
    { icon:"📆", big:"최장 2029", mid:"최대 유예", sub:"연속 무주택 요건이 있습니다" },
    { icon:"🏠", big:"5/12부터", mid:"무주택 기간", sub:"2026년 5월 12일부터 계속 무주택이어야 합니다" },
  ],
  ctx1: "적용 대상은 2026년 5월 12일부터 계속 집이 없었던 수분양자입니다.",
  ctx2: "전세 매물이 빠진 시장에서 실거주 시점을 뒤로 미루는 조치입니다.",
  quote: "토지거래허가구역은 집을 살 때 허가를 받아야 하는 지역입니다. 실거주 의무를 1년 더 미루면, 그 사이 전세를 놓고 살 수 있는 기간이 길어집니다. 전세 매물이 늘어날 여지는 있지만, 입주 물량 자체가 늘지는 않습니다.",
  noteHead: "왜 중요한가", noteSub: "전세난을 당장 공급으로 풀기보다, 실거주 시점을 뒤로 밀어 매물이 잠기는 속도를 늦추는 조치입니다. 10월 1일 시행 이후 전세 매물이 실제로 늘어보는지가 효과의 시험입니다. 최장 2029년까지 미룰 수 있어 단기 입주 공백은 남습니다.",
  footer: "부동산 · 실거주 유예",
}, {
  badge: "POLICY", title: "The land-permit occupancy rule is delayed another year, through the end of 2027",
  breaking: "Starts Oct 1",
  heroBig: "End-2027", heroSub: "Occupancy means living in the home you buy. Permit-zone deadlines now run to end-2027.",
  grid: [
    { icon:"📅", big:"Oct 1", mid:"Effective date", sub:"Per the ministry notice" },
    { icon:"🔁", big:"Renewals", mid:"Existing deals too", sub:"Not only new purchases" },
    { icon:"📆", big:"Max 2029", mid:"Longest delay", sub:"A continuous unhoused test applies" },
    { icon:"🏠", big:"May 12", mid:"Unhoused since", sub:"Unhoused since May 12, 2026" },
  ],
  ctx1: "It applies to buyers continuously unhoused since May 12, 2026.",
  ctx2: "The delay comes as jeonse listings are already thinning.",
  quote: "Land-permit zones require approval to buy a home. Pushing occupancy back a year lengthens the window to rent the unit out. Listings may ease, but new completions do not rise.",
  noteHead: "Why it matters", noteSub: "This slows occupancy lock-up rather than adding supply. The test is whether jeonse listings actually rise after Oct 1. A delay through 2029 still leaves a near-term occupancy gap.",
  footer: "Housing · Occupancy delay",
});

add("northeast-jeonse-10pct", "L2", "JEONSE", {
  badge: "전세", title: "서울 동북권 전세가 연초 대비 10.11% 올라 11년 만에 두 자릿수를 기록했습니다",
  heroIcon: "🏘️", heroBig: "+10.11%",
  heroSub: "전세는 보증금을 맡기고 집을 빌려 사는 계약입니다. 서울 동북권 전세 가격이 올해 들어 10.11% 오르며 2015년 이후 처음 두 자릿수 상승을 냈습니다.",
  cards: [
    { label: "매물", big: "−44.6%", mid: "동북권 매물", sub: "10·15 대책 이후 급감했습니다" },
    { label: "서울 평균", big: "7억1,178만", mid: "KB 전세 평균", sub: "1년 전보다 9.2% 올랐습니다" },
    { label: "기간", big: "11년 만", mid: "두 자릿수", sub: "2015년 이후 첫 기록입니다" },
  ],
  detailHead: "동북권에서 겹친 일",
  detailLines: [
    "재건축·이주 수요가 동북권에 몰려 전세 수요가 먼저 늘었습니다",
    "실거주 규제로 매물이 잠기며 10·15 이후 44.6% 줄었습니다",
    "KB 서울 평균 전세 7억1,178만 원도 같은 방향의 숫자입니다",
  ],
  quote: "두 자릿수 전세 상승은 보증금을 더 마련해야 한다는 뜻입니다. 매물이 44.6% 빠진 상태에서 이사가 늘면 가격은 더 가팔라질 수 있습니다.",
  noteHead: "왜 중요한가", noteSub: "동북권은 전세난의 최전선입니다. 실거주 유예가 매물을 되돌리는지가 10월 이후 시험입니다. 주간 상승률이 10.11% 위로 더 가팔라지는지를 보면 됩니다.",
  footer: "전세 · 동북권",
}, {
  badge: "JEONSE", title: "Seoul northeast jeonse is up 10.11% year to date, the first double-digit rise in 11 years",
  heroIcon: "🏘️", heroBig: "+10.11%",
  heroSub: "Jeonse is a large-deposit rental. Northeast Seoul deposits have risen 10.11% this year, the first double-digit pace since 2015.",
  cards: [
    { label: "Listings", big: "-44.6%", mid: "Northeast stock", sub: "Down sharply since the Oct 15 policy" },
    { label: "Seoul average", big: "₩712M", mid: "KB jeonse mean", sub: "Up 9.2% year on year" },
    { label: "Span", big: "11 years", mid: "Double digits", sub: "First such print since 2015" },
  ],
  detailHead: "What stacked in the northeast",
  detailLines: [
    "Rebuild move-outs concentrated demand there first",
    "Occupancy rules locked listings, down 44.6% after Oct 15",
    "KB’s Seoul average of ₩711.78M points the same way",
  ],
  quote: "A double-digit jeonse rise means larger deposits. With listings down 44.6%, more moves can steepen prices further.",
  noteHead: "Why it matters", noteSub: "The northeast is the front line of the jeonse squeeze. Whether the occupancy delay brings listings back is the October test. Watch whether weekly gains push beyond 10.11%.",
  footer: "Jeonse · Northeast Seoul",
});

add("migration-2028-gap", "L5", "POLICY", {
  badge: "정비사업", title: "2028년 서울 이주 수요가 입주 물량의 2.9배로 추산되며 전세 공백이 가장 큰 해로 꼽힙니다",
  heroIcon: "📦", heroBig: "2.9배",
  heroSub: "정비사업은 낡은 아파트를 헐고 새로 짓는 일입니다. 2028년 이주 4만5,256가구 대비 입주 1만5,388가구로, 이삿짐이 새 집의 2.9배입니다.",
  before: { label: "2028 입주", big: "1만5,388", sub: "새로 들어오는 집" },
  after: { label: "2028 이주", big: "4만5,256", sub: "먼저 나가는 이삿짐" },
  cards: [
    { icon:"📆", big:"~18만", mid:"2030년까지 이주", sub:"서울 정비사업 누적 추산입니다" },
    { icon:"🏗️", big:"2028년", mid:"갭이 가장 큰 해", sub:"입주 가뭄과 이주가 겹칩니다" },
    { icon:"🔑", big:"전세 공백", mid:"매물 부족", sub:"실거주 유예가 그 공백을 일부 늦춥니다" },
  ],
  quote: "집이 늘어나기 전에 이삿짐이 먼저 나옵니다. 2028년은 그 시차가 2.9배로 가장 벌어지는 해로 추산됩니다. 실거주 유예는 그 해의 매물 잠김을 조금 뒤로 미루는 보완책입니다.",
  noteHead: "왜 중요한가", noteSub: "2028년 공백은 대책 하나가 입주 물량을 바로 늘리지 못한다는 뜻입니다. 순차 이주와 실거주 유예가 현장에서 매물로 이어지는지가 관건입니다. 목동·동북권처럼 이주가 임박한 동의 전세 매물을 보면 됩니다.",
  footer: "정비사업 · 2028년 갭",
}, {
  badge: "REDEV", title: "2028 Seoul move-outs are estimated at 2.9 times new occupancy, the widest jeonse gap year",
  heroIcon: "📦", heroBig: "2.9×",
  heroSub: "Redevelopment tears down old blocks to rebuild. 2028 shows 45,256 moves versus 15,388 completions — 2.9 times more households leaving than arriving.",
  before: { label: "2028 completions", big: "15,388", sub: "New homes arriving" },
  after: { label: "2028 move-outs", big: "45,256", sub: "Households leaving first" },
  cards: [
    { icon:"📆", big:"~180k", mid:"Moves through 2030", sub:"Cumulative Seoul redevelopment" },
    { icon:"🏗️", big:"2028", mid:"Widest gap year", sub:"Thin completions meet heavy moves" },
    { icon:"🔑", big:"Jeonse gap", mid:"Fewer listings", sub:"The occupancy delay only postpones lock-up" },
  ],
  quote: "Move-outs come before new keys. 2028 is estimated as the year that gap hits 2.9×. The occupancy delay is a patch, not extra completions.",
  noteHead: "Why it matters", noteSub: "The 2028 hole means one rule change cannot print new stock. Staged moves and the occupancy delay have to show up as listings. Watch jeonse stock in districts about to empty, such as Mokdong and the northeast.",
  footer: "Redevelopment · 2028 gap",
});
}