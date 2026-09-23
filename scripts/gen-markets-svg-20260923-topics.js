/* KR / Safe / KR-RE topics for 2026-09-23 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.23 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"7,153.99", title:"코스피가 7,153.99로 열려 장중 7,100을 내주며 추석 전날 숨을 골랐습니다",
      sub:"전일 종가는 7,017.91입니다. 시가 1.94% 상승 뒤 차익 실현이 나왔습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"28만4,000원", title:"삼성전자가 장중 28만4,000원까지 오르며 28만 원대를 다시 밟았습니다",
      sub:"전일 27만6,500원에서 +2.71%입니다. 한때 28만5,000원이었습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"190만 원", title:"SK하이닉스가 장중 190만 원까지 오르며 전날 약세를 되돌렸습니다",
      sub:"전일 약 184만 원에서 장중 +1.79%, 고가 +3.26%입니다." },
    { color:"#22d3ee", fill:"#06171c", right:"10월 1일", title:"삼성바이오로직스 노사가 10월 1일 3차 조정에 나섭니다",
      sub:"22일 2차 조정에서 회사안이 없었고, 노조는 단체행동을 준비합니다." },
    { color:"#38bdf8", fill:"#061520", right:"+1.71%", title:"LG에너지솔루션이 장중 약 1.71% 오르며 전날 약세에서 숨 골랐습니다",
      sub:"21일 −3.3% 뒤 추석 전날 순환의 한 칸입니다." },
  ],
  caption: "더 볼 것: 시가 7,153.99 · 삼성 28만4,000원 · 하이닉스 190만 원 · 바이오 10/1 · 엔솔 +1.71%",
}, {
  headline: "2026.09.23 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"7,153.99", title:"KOSPI opened at 7,153.99 then gave back 7,100 into the Chuseok eve session",
      sub:"Prior close 7,017.91. The +1.94% open faded as profit-taking arrived." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩284,000", title:"Samsung Electronics traded near 284,000 won, back in the 280,000 zone",
      sub:"Prior close 276,500. Session +2.71%, high 285,000." },
    { color:"#f59e0b", fill:"#1a1205", right:"₩1.90M", title:"SK Hynix bounced to a session high of 1.90 million won",
      sub:"Prior close near 1.84 million. Session +1.79%, high +3.26%." },
    { color:"#22d3ee", fill:"#06171c", right:"Oct 1", title:"Samsung Biologics labor talks go to a third mediation on October 1",
      sub:"No extra company offer on Sept 22. The union is preparing action." },
    { color:"#38bdf8", fill:"#061520", right:"+1.71%", title:"LG Energy Solution bounced about 1.71% after Monday’s slide",
      sub:"A session bid after the 3.3% drop on Sept 21." },
  ],
  caption: "Watch: open 7,153.99 · Samsung 284,000 · Hynix 1.90M · Bio Oct 1 · LGES +1.71%",
});

add("kospi-7153-open", "L6", "KOSPI", {
  badge: "코스피", title: "코스피가 7,153.99로 열려 장중 7,100을 내주며 추석 전날 숨을 골랐습니다",
  breaking: "추석 전날 · 시가 +1.94%",
  heroBig: "7,153.99", heroSub: "전일 종가는 7,017.91입니다. 23일 시가가 1.94% 높게 열린 뒤 장중 7,100을 내줬습니다. 마감 숫자는 따로 봐야 합니다.",
  grid: [
    { icon:"📈", big:"7,017.91", mid:"전일 종가", sub:"22일 +0.15%로 마감했습니다" },
    { icon:"🌍", big:"+1,741억", mid:"외국인 장중", sub:"기관은 약 1,490억 원을 샀습니다" },
    { icon:"👤", big:"−3,753억", mid:"개인 장중", sub:"연휴 앞 차익 실현이 거론됩니다" },
    { icon:"🗓️", big:"24~25일", mid:"추석 휴장", sub:"재개장은 28일입니다" },
  ],
  ctx1: "22일 시가 7,161.61, 고가 7,171.44에서 종가로 대부분 반납한 패턴이 오늘 오전에도 겹쳤습니다.",
  ctx2: "전기·전자가 장중 가장 센 업종이었고 건설은 약세였습니다.",
  quote: "미국 기술주 강세가 시가를 밀어 올렸습니다. 장중 수급은 마감 집계가 나오면 바뀔 수 있습니다.",
  noteHead: "왜 중요한가", noteSub: "7,000선이 여러 날 남으면 눈높이가 한 단계 올라갑니다. 시가 7,153.99는 출발 숫자입니다. 다음에 볼 것은 23일 종가와 28일 재개장 갭입니다.",
  footer: "코스피 · 추석 전날",
}, {
  badge: "KOSPI", title: "KOSPI opened at 7,153.99 then gave back 7,100 into the Chuseok eve session",
  breaking: "Chuseok eve · open +1.94%",
  heroBig: "7,153.99", heroSub: "Prior close 7,017.91. The +1.94% open faded and the tape lost 7,100. The close is still separate.",
  grid: [
    { icon:"📈", big:"7,017.91", mid:"Prior close", sub:"Sept 22 finished +0.15%" },
    { icon:"🌍", big:"+₩174B", mid:"Foreign session bid", sub:"Institutions bought about ₩149B" },
    { icon:"👤", big:"−₩375B", mid:"Retail session sale", sub:"Holiday profit-taking was cited" },
    { icon:"🗓️", big:"24–25", mid:"Chuseok halt", sub:"Cash reopens on the 28th" },
  ],
  ctx1: "Sept 22 also opened 7,161.61 and high 7,171.44 before giving most of it back.",
  ctx2: "Electrics led the session; construction lagged.",
  quote: "US tech strength lifted the open. Session flows can change when the close is tallied.",
  noteHead: "Why it matters", noteSub: "If 7,000 holds, the eye level steps up. 7,153.99 is the open, not the close. Next: the Sept 23 finish and the Sept 28 gap.",
  footer: "KOSPI · Chuseok eve",
});

add("samsung-electronics-284000", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 장중 28만4,000원까지 오르며 두 달 만에 28만 원대를 다시 밟았습니다",
  heroIcon: "📱", heroBig: "28만4,000원",
  heroSub: "전일 종가는 27만6,500원입니다. 23일 장중 +2.71%이며 한때 28만5,000원까지 올랐습니다. 종가가 남아야 두 달 만의 28만 원대입니다.",
  cards: [
    { icon:"📈", big:"+2.71%", mid:"장중 상승", sub:"전일 27만6,500원에서 올라왔습니다" },
    { icon:"🏁", big:"28만5,000원", mid:"장중 고가", sub:"3.07%까지 찍었습니다" },
    { icon:"🎁", big:"28일", mid:"특별배당 매수 마감", sub:"기준일 30일, 배당락 29일입니다" },
  ],
  quote: "종가가 28만 원 위에 남으면 7월 10일 이후 약 두 달 만입니다. 연휴 뒤 첫 거래일이 바로 배당 매수 마감입니다.",
  noteHead: "왜 중요한가", noteSub: "28만 원대가 지지가 되면 다음 실적 시즌의 눈높이가 달라집니다. 장중 28만4,000원은 출발 칸입니다. 28일 매수와 29일 배당락 갭을 표에 적으면 됩니다.",
  footer: "삼성전자 · 주가",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics traded near 284,000 won, back in the 280,000-won zone",
  heroIcon: "📱", heroBig: "₩284,000",
  heroSub: "Prior close 276,500. Session +2.71%, high 285,000. A close above 280,000 would be the first since July 10.",
  cards: [
    { icon:"📈", big:"+2.71%", mid:"Session gain", sub:"Up from 276,500 won" },
    { icon:"🏁", big:"₩285,000", mid:"Session high", sub:"As much as +3.07%" },
    { icon:"🎁", big:"Sept 28", mid:"Special-dividend buy line", sub:"Record Sept 30, ex-date 29th" },
  ],
  quote: "A close above 280,000 won would be the first in about two months. The first session after the holiday is the buy deadline.",
  noteHead: "Why it matters", noteSub: "If 280,000 won holds, the next earnings season’s eye level changes. 284,000 is a session print. Log the Sept 28 buy line and the 29th ex-gap.",
  footer: "Samsung Electronics · Stock",
});

add("sk-hynix-1900000", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 장중 190만 원까지 오르며 전날 약세를 되돌렸습니다",
  heroIcon: "💾", heroBig: "190만 원",
  heroSub: "전일 종가는 약 184만 원(−1.5%)입니다. 23일 장중 187만3,000원(+1.79%), 고가 190만 원(+3.26%)입니다.",
  cards: [
    { label: "전일", big: "184만 원", mid: "약 1.5% 하락", sub: "21일 186만8,000원에서 내려왔습니다" },
    { label: "장중", big: "+1.79%", mid: "187만3,000원", sub: "전날 약세를 되돌린 오전입니다" },
    { label: "고가", big: "190만 원", mid: "+3.26%", sub: "종가가 따라갈지는 따로 봐야 합니다" },
  ],
  detailHead: "가격이 말해 주는 것",
  detailLines: [
    "21일 외국인은 이 종목을 8,121억 원 팔았습니다",
    "하루 만에 방향이 바뀐 뒤 오늘은 가격이 위를 봤습니다",
    "삼성전자가 28만 원대를 밟는 날 묶음이 다시 맞춰집니다",
  ],
  quote: "고대역폭 메모리 수요는 중기 이야기로 남아 있습니다. 하루 수급과 업황은 다른 줄입니다.",
  noteHead: "왜 중요한가", noteSub: "장중 190만 원은 고가입니다. 23일 종가가 184만 원 위에 남는지가 확인입니다. 인공지능 가속기용 메모리는 몇 년의 수요로 남아 있습니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "HYNIX", title: "SK Hynix bounced to a session high of 1.90 million won",
  heroIcon: "💾", heroBig: "₩1.90M",
  heroSub: "Prior close near 1.84 million (−1.5%). Session 1,873,000 (+1.79%), high 1.90 million (+3.26%).",
  cards: [
    { label: "Prior", big: "₩1.84M", mid: "About −1.5%", sub:"Down from 1,868,000 on the 21st" },
    { label: "Session", big: "+1.79%", mid: "₩1,873,000", sub:"A morning reversal" },
    { label: "High", big: "₩1.90M", mid: "+3.26%", sub:"The close still has to follow" },
  ],
  detailHead: "What the tape says",
  detailLines: [
    "Foreigners sold ₩812B of this name on the 21st",
    "After that flip, price looked up again today",
    "The chip bundle realigns if Samsung holds 280,000 won",
  ],
  quote: "High-bandwidth memory demand remains a multi-year story. One-day flow and the cycle sit on different lines.",
  noteHead: "Why it matters", noteSub: "1.90 million is a session high. Next: whether the close holds above 1.84 million. Accelerator memory demand still stretches over years.",
  footer: "SK Hynix · Stock",
});

add("samsung-bio-oct1", "L3", "SEC", {
  badge: "삼성바이오", title: "삼성바이오로직스 노사가 10월 1일 3차 조정에 나서고 노조는 단체행동을 준비합니다",
  heroIcon: "🧪", heroBig: "10월 1일",
  heroSub: "사후조정은 공식 절차가 끝난 뒤에도 노동위원회가 대화를 이어 주는 자리입니다. 22일 2차에서 회사 추가안은 없었습니다.",
  cards: [
    { icon:"📋", big:"18개", mid:"핵심 쟁점", sub:"노조가 요구안을 줄여 넘겼습니다" },
    { icon:"👤", big:"책임자", mid:"3차에 참석", sub:"가능하면 대표이사가 나오기로 했습니다" },
    { icon:"🚩", big:"준비", mid:"단체행동", sub:"회사안이 없으면 일시를 예고합니다" },
  ],
  quote: "노조는 임금 6.5%와 정액 300만 원, 성과 3%를 요구한다고 알려졌습니다. 회사안은 임금 4.1%, 성과 2.1%로 거론됩니다.",
  noteHead: "왜 중요한가", noteSub: "위탁 생산 대형주는 공장 가동이 몇 년의 매출입니다. 10월 1일 회사안이 나오면 교섭이 달력이 됩니다. 장중 약세와 조정 일정은 다른 줄입니다.",
  footer: "삼성바이오로직스 · 노사",
}, {
  badge: "BIOLOGICS", title: "Samsung Biologics labor talks go to a third mediation on October 1",
  heroIcon: "🧪", heroBig: "Oct 1",
  heroSub: "Post-mediation is extra talks after the official clock. The Sept 22 second round brought no extra company offer.",
  cards: [
    { icon:"📋", big:"18", mid:"Core issues", sub:"The union narrowed its list" },
    { icon:"👤", big:"Decision-maker", mid:"Due at the third round", sub:"A CEO-level seat was requested" },
    { icon:"🚩", big:"Ready", mid:"Industrial action", sub:"A date is promised if no offer lands" },
  ],
  quote: "The union is said to want 6.5% plus ₩3 million and a 3% merit raise. The company line is cited at 4.1% and 2.1% merit.",
  noteHead: "Why it matters", noteSub: "A large CDMO lives on plant uptime. An Oct 1 offer turns talks into a calendar. Session weakness and the mediation sit on different lines.",
  footer: "Samsung Biologics · Labor",
});

add("lges-session-bounce", "L5", "LGES", {
  badge: "LG엔솔", title: "LG에너지솔루션이 장중 약 1.71% 오르며 전날 배터리 약세에서 숨 골랐습니다",
  heroIcon: "🔋", heroBig: "장중 +1.71%",
  heroSub: "21일에는 35만2,000원으로 3.3% 내렸습니다. 추석 전날 시가총액 상위 배터리가 다시 움직인 오전입니다.",
  before: { label: "21일", big: "−3.3%", sub: "코스피 7,000 회복과 반대였습니다" },
  after: { label: "23일 장중", big: "+1.71%", sub: "순환이 배터리로 조금 왔습니다" },
  cards: [
    { icon:"🔋", big:"35만2,000원", mid:"21일 종가", sub:"시가총액 상위 배터리입니다" },
    { icon:"🚗", big:"+0.69%", mid:"현대차 장중", sub:"자동차도 같이 숨 골랐습니다" },
    { icon:"🗓️", big:"연휴", mid:"24~25일 휴장", sub:"종가가 장중을 따라갈지는 따로 봅니다" },
  ],
  quote: "전기차 수요와 메탈 가격 부담은 중기에 남아 있습니다. 하루 1.71%가 그 부담을 지운 것은 아닙니다.",
  noteHead: "왜 중요한가", noteSub: "수주와 북미 공장 가동이 나와야 35만 원대가 바닥 이야기가 됩니다. 장중 1.71%는 출발 칸입니다. 현대차와 같이 움직이는지를 표에 적으면 됩니다.",
  footer: "LG에너지솔루션 · 주가",
}, {
  badge: "LGES", title: "LG Energy Solution bounced about 1.71% in the session after Monday’s slide",
  heroIcon: "🔋", heroBig: "Session +1.71%",
  heroSub: "It closed 352,000 won, down 3.3%, on Sept 21. A top-cap battery name moved again on Chuseok eve.",
  before: { label: "Sept 21", big: "−3.3%", sub: "The opposite of the 7,000 recapture" },
  after: { label: "Sept 23 session", big: "+1.71%", sub: "A little rotation reached cells" },
  cards: [
    { icon:"🔋", big:"₩352,000", mid:"Sept 21 close", sub:"A top-cap battery name" },
    { icon:"🚗", big:"+0.69%", mid:"Hyundai session", sub:"Autos paused the fade too" },
    { icon:"🗓️", big:"Holiday", mid:"Halt on the 24th–25th", sub:"The close still has to follow" },
  ],
  quote: "EV demand and metal costs still sit in the medium term. A 1.71% session bid does not erase that weight.",
  noteHead: "Why it matters", noteSub: "Bookings and North American uptime have to print before 352,000 won is a floor story. +1.71% is a session print. Log whether Hyundai moves with it.",
  footer: "LG Energy Solution · Stock",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.23 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"86,558", title:"비트코인이 약 8만6,558달러에서 8만6,000달러 위를 지키고 있습니다",
      sub:"24시간 약 1.25%, 일주일 약 13.9%입니다." },
    { color:"#facc15", fill:"#1a1600", right:"4,359달러", title:"금 현물이 온스당 약 4,359달러로 0.4% 올랐습니다",
      sub:"유가 하락이 금리 인상 부담을 덜었다는 설명이 붙었습니다." },
    { color:"#818cf8", fill:"#0f1024", right:"2,764달러", title:"이더리움이 약 2,764달러로 비트코인보다 작은 폭으로 따라갔습니다",
      sub:"이더 현물 펀드는 22일 1억6,220만 달러를 담았습니다." },
    { color:"#f97316", fill:"#1a0d02", right:"7.15억", title:"미국 비트코인 현물 펀드가 22일 7억1,470만 달러를 더 담았습니다",
      sub:"나흘 연속 순유입입니다. 21일은 약 9.99억 달러였습니다." },
  ],
  caption: "더 볼 것: 비트코인 8만6,558 · 금 4,359 · 이더 2,764 · 펀드 7.15억",
}, {
  headline: "2026.09.23 Safe-Haven Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$86,558", title:"Bitcoin held above $86,000 near $86,558 in the Asian morning",
      sub:"About +1.25% in 24 hours and +13.9% on the week." },
    { color:"#facc15", fill:"#1a1600", right:"$4,359", title:"Spot gold rose 0.4% to about $4,359.40 an ounce",
      sub:"Oil’s slide eased hike fears." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,764", title:"Ether sat near $2,764, a calmer follow-through than Bitcoin",
      sub:"Spot ether funds took in $162.2M on Sept 22." },
    { color:"#f97316", fill:"#1a0d02", right:"$715M", title:"US spot bitcoin funds took in $714.7 million on Sept 22",
      sub:"A fourth straight inflow day after about $999M on the 21st." },
  ],
  caption: "Watch: BTC $86,558 · gold $4,359 · ETH $2,764 · ETF $715M",
});

add("bitcoin-86558", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 약 8만6,558달러에서 8만6,000달러 위를 지키고 있습니다",
  heroIcon: "₿", heroBig: "86,558달러",
  heroSub: "아시아 아침 집계입니다. 24시간 약 1.25%, 일주일 약 13.9%입니다. 사상 최고 12만6,080달러와는 약 31% 거리입니다.",
  cards: [
    { icon:"🧱", big:"8만6,000", mid:"지키는 선", sub:"8만 달러는 이제 지지로 읽힙니다" },
    { icon:"📈", big:"+13.9%", mid:"일주일", sub:"7만6,000달러 아래에서 올라왔습니다" },
    { icon:"🏦", big:"7.15억", mid:"22일 펀드", sub:"나흘 연속 순유입입니다" },
  ],
  quote: "21일 펀드는 약 9.99억 달러를 담았습니다. 9만 달러까지는 이 가격에서 약 4%입니다.",
  noteHead: "왜 중요한가", noteSub: "아침 한 시점은 지지가 아닙니다. 8만6,000달러가 여러 날 남는지가 확인입니다. 반감기와 현물 펀드가 몇 년의 수요 바닥을 만들었습니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BITCOIN", title: "Bitcoin held above $86,000 near $86,558 in the Asian morning",
  heroIcon: "₿", heroBig: "$86,558",
  heroSub: "An Asian-morning print. About +1.25% in 24 hours and +13.9% on the week. Still about 31% below $126,080.",
  cards: [
    { icon:"🧱", big:"$86,000", mid:"The line it holds", sub:"$80,000 now reads as support" },
    { icon:"📈", big:"+13.9%", mid:"One week", sub:"Up from below $76,000" },
    { icon:"🏦", big:"$715M", mid:"Sept 22 funds", sub:"A fourth straight inflow day" },
  ],
  quote: "Funds took in about $999M on the 21st. About 4% remains to $90,000.",
  noteHead: "Why it matters", noteSub: "A morning print is not support. Next: whether $86,000 holds for several days. Halving and spot funds built a multi-year floor.",
  footer: "Bitcoin · Price",
});

add("gold-4359", "L3", "GOLD", {
  badge: "금", title: "금 현물이 온스당 약 4,359달러로 0.4% 오르며 유가 숨 고름을 반영했습니다",
  heroIcon: "🥇", heroBig: "4,359달러",
  heroSub: "유가가 나흘 동안 9% 넘게 내린 뒤 안정되며 금리 인상 부담이 줄었다는 설명이 붙었습니다.",
  cards: [
    { icon:"📈", big:"+0.4%", mid:"하루 상승", sub:"온스당 약 4,359.40달러입니다" },
    { icon:"🛢️", big:"유가", mid:"나흘 −9%", sub:"물가 부담이 한 칸 줄었습니다" },
    { icon:"🏦", big:"50톤", mid:"9월 펀드", sub:"금 상장지수펀드 유입입니다" },
  ],
  quote: "어제 4,350달러와 지난주 4,370~4,380달러 사이에 있습니다. 비트코인과 같이 오른 아침입니다.",
  noteHead: "왜 중요한가", noteSub: "하루 십몇 달러가 준비 자산의 역할을 지우지는 않습니다. 4,350달러가 바닥으로 남는지가 확인입니다. 달러인덱스와 같이 적으면 됩니다.",
  footer: "금 · 현물",
}, {
  badge: "GOLD", title: "Spot gold rose 0.4% to about $4,359.40 an ounce",
  heroIcon: "🥇", heroBig: "$4,359",
  heroSub: "Oil’s four-day slide of more than 9% eased hike fears once crude stabilized.",
  cards: [
    { icon:"📈", big:"+0.4%", mid:"One-day gain", sub:"About $4,359.40 an ounce" },
    { icon:"🛢️", big:"Oil", mid:"Four days −9%", sub:"Inflation pressure eased a notch" },
    { icon:"🏦", big:"50t", mid:"September funds", sub:"Bullion ETF intake" },
  ],
  quote: "It sits between yesterday’s $4,350 and last week’s $4,370–$4,380. Gold rose with Bitcoin this morning.",
  noteHead: "Why it matters", noteSub: "A teens-of-dollars day does not erase gold’s reserve role. Next: whether $4,350 holds as a floor. Log the dollar index beside the ounce.",
  footer: "Gold · Spot",
});

add("ethereum-2764", "L2", "ETH", {
  badge: "이더리움", title: "이더리움이 약 2,764달러로 비트코인보다 작은 폭으로 따라갔습니다",
  heroIcon: "◆", heroBig: "2,764달러",
  heroSub: "24시간 약 0.5%, 일주일 약 15.2%입니다. 2025년 8월 고점 4,946달러와는 약 44% 거리입니다.",
  cards: [
    { label: "24시간", big: "+0.5%", mid: "차분한 상승", sub: "비트코인 +1.25%보다 작습니다" },
    { label: "펀드", big: "1.62억", mid: "22일 이더 현물", sub: "한 상품이 8,810만 달러를 담았습니다" },
    { label: "지지", big: "2,631달러", mid: "아래 선", sub: "이 선 위에서 한 계단 올라왔습니다" },
  ],
  detailHead: "가격이 말해 주는 것",
  detailLines: [
    "21일 이더 펀드는 약 2.7억 달러를 담았습니다",
    "이틀 유입이 2,700달러대를 받칩니다",
    "스마트계약 사용량과 가격은 시차가 있습니다",
  ],
  quote: "현물 펀드가 생기며 기관 칸이 열렸습니다. 2,764달러는 한 시점입니다.",
  noteHead: "왜 중요한가", noteSub: "2,700달러대가 습관이 되면 다음 사이클의 바닥 이야기가 달라집니다. 이더 펀드가 이어지는지가 확인입니다. 비트코인과 같은 비율로 맞추지 마십시오.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETHER", title: "Ether sat near $2,764, a calmer follow-through than Bitcoin",
  heroIcon: "◆", heroBig: "$2,764",
  heroSub: "About +0.5% on the day and +15.2% on the week. Still about 44% below the August 2025 high of $4,946.",
  cards: [
    { label: "24h", big: "+0.5%", mid: "A calm bid", sub: "Smaller than Bitcoin’s +1.25%" },
    { label: "Funds", big: "$162M", mid: "Sept 22 ether spot", sub: "One product took in $88.1M" },
    { label: "Support", big: "$2,631", mid: "The line below", sub: "Price stepped up from there" },
  ],
  detailHead: "What the tape says",
  detailLines: [
    "Ether funds took in about $270M on the 21st",
    "Two days of inflows cushion the $2,700s",
    "Smart-contract usage and price still sit on a lag",
  ],
  quote: "Spot funds opened an institutional sleeve. $2,764 is one print.",
  noteHead: "Why it matters", noteSub: "If the $2,700s become habit, the next cycle’s floor story changes. Next: whether ether-fund inflows continue. Do not ratio it to Bitcoin one-for-one.",
  footer: "Ether · Price",
});

add("btc-etf-714m", "L4", "BTC", {
  badge: "펀드", title: "미국 비트코인 현물 펀드가 22일 7억1,470만 달러를 더 담아 나흘 연속 유입입니다",
  badgeLine: "나흘 연속 · 22일 집계",
  heroIcon: "🏦", heroBig: "7.15억 달러",
  heroSub: "현물 상장지수펀드는 비트코인을 그대로 담는 펀드입니다. 12개 미국 상품이 22일 순유입 7억1,470만 달러를 기록했습니다.",
  cards: [
    { icon:"1️⃣", big:"3.50억", mid:"한 대형 상품", sub:"3억5,030만 달러를 담았습니다" },
    { icon:"2️⃣", big:"2.57억", mid:"둘째 상품", sub:"2억5,740만 달러입니다" },
    { icon:"◆", big:"1.62억", mid:"이더 펀드", sub:"같은 날 1억6,220만 달러입니다" },
  ],
  quote: "21일에는 약 9.99억 달러가 들어왔습니다. 9월 15~16일 빨강 뒤 나흘 초록입니다.",
  noteHead: "왜 중요한가", noteSub: "펀드 유입은 청산과 다른 줄입니다. 펀드는 남아 있고 청산은 한 밤입니다. 다음에 볼 것은 23일 유입이 닷새로 늘어나는지입니다.",
  footer: "비트코인 · 현물 펀드",
}, {
  badge: "FUNDS", title: "US spot bitcoin funds took in $714.7 million on Sept 22, a fourth straight day",
  badgeLine: "Four days · Sept 22 tally",
  heroIcon: "🏦", heroBig: "$714.7M",
  heroSub: "A spot ETF holds bitcoin itself. Twelve US products booked $714.7 million of net inflows on Sept 22.",
  cards: [
    { icon:"1️⃣", big:"$350M", mid:"One large product", sub:"$350.3 million" },
    { icon:"2️⃣", big:"$257M", mid:"The next product", sub:"$257.4 million" },
    { icon:"◆", big:"$162M", mid:"Ether funds", sub:"$162.2 million the same day" },
  ],
  quote: "About $999 million arrived on the 21st. Four green days follow red prints on Sept 15–16.",
  noteHead: "Why it matters", noteSub: "Fund inflows sit on a different line from liquidations. Funds stay; liquidations are one night. Next: whether Sept 23 makes it five days.",
  footer: "Bitcoin · Spot funds",
});

add("summary-krre", "ROWS", "POLICY", {
  headline: "2026.09.23 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"취임", title:"신임 국토부 장관이 주거 안정과 3기 신도시 착공을 앞에 뒀습니다",
      sub:"수급 불균형과 임대차 불안, 가계부채가 맞물려 있다고 진단했습니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"109만 원", title:"전월세 안심신탁이 전세 3억 원을 맡기면 월 약 109만 원을 줍니다",
      sub:"연 4.35% 가정입니다. 22일 HUG 센터가 문을 열었습니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"착공", title:"3기 신도시와 도심 주택을 계획 숫자가 아니라 착공·입주로 챙기겠다고 했습니다",
      sub:"어제 119만 호 목표와 다른 줄의 실행 이야기입니다." },
    { color:"#94a3b8", fill:"#111827", right:"배경", title:"서울 전세 +7.79%와 공적주택 119만 호는 어제 칸으로 남깁니다",
      sub:"오늘은 누가 집행하고 어떤 제도가 전세금을 옮기는지입니다." },
  ],
  caption: "더 볼 것: 장관 취임 · 안심신탁 109만 원 · 3기 신도시 착공 · 전세 7.79%는 배경",
}, {
  headline: "2026.09.23 Korea Housing Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"New minister", title:"The new land minister put housing stability and faster new-town starts first",
      sub:"He cited supply gaps, rental stress and household debt." },
    { color:"#fb923c", fill:"#1a0d02", right:"₩1.09M", title:"HUG’s jeonse trust pays landlords about ₩1.09 million a month on ₩300 million",
      sub:"A 4.35% assumed yield. The center opened on Sept 22." },
    { color:"#a78bfa", fill:"#120b1f", right:"Starts", title:"Third-phase new towns were framed as starts and move-ins, not plan totals",
      sub:"Execution, not yesterday’s 1.19 million headline." },
    { color:"#94a3b8", fill:"#111827", right:"Backdrop", title:"Seoul jeonse +7.79% and 1.19 million public homes stay yesterday’s sleeve",
      sub:"Today is who executes and which scheme moves deposits." },
  ],
  caption: "Watch: new minister · trust ₩1.09M · new-town starts · +7.79% as backdrop",
});

add("molit-hong-jiseon", "L4", "POLICY", {
  badge: "국토부", title: "신임 국토부 장관이 주거 안정과 3기 신도시 착공을 취임 일성으로 내세웠습니다",
  badgeLine: "9월 23일 취임",
  heroIcon: "🏛️", heroBig: "주거 안정",
  heroSub: "홍지선 장관은 주택 수급 불균형과 임대차 불안, 가계부채가 맞물려 있다고 진단했습니다. 현장과 실용 중심으로 전환해야 한다고 했습니다.",
  cards: [
    { icon:"🏗️", big:"3기", mid:"신도시·도심", sub:"착공과 입주까지 챙기겠다고 했습니다" },
    { icon:"🏠", big:"임대", mid:"민간 장기·공공", sub:"전세 불안과 청년·신혼을 같이 말했습니다" },
    { icon:"🛡️", big:"보증금", mid:"전세사기", sub:"보증금과 일상을 지키겠다고 했습니다" },
  ],
  quote: "공급은 계획과 숫자에 머물면 안 된다고 했습니다. 수도권 지방정부와 통합 심의, 인허가 빠른 길을 만들겠다고 했습니다.",
  noteHead: "왜 중요한가", noteSub: "장관이 착공을 말하면 공급 계획이 달력으로 내려올 수 있습니다. 취임 발언은 목표가 아닙니다. 다음에 볼 것은 인허가 패스트트랙과 착공 일정입니다.",
  footer: "국토부 · 취임",
}, {
  badge: "MOLIT", title: "The new land minister put housing stability and faster new-town starts first",
  badgeLine: "Inaugural · Sept 23",
  heroIcon: "🏛️", heroBig: "Housing first",
  heroSub: "Hong Jiseon said supply gaps, rental stress and household debt are locked together. He called for field-first, practical policy.",
  cards: [
    { icon:"🏗️", big:"New towns", mid:"And urban sites", sub:"He pledged to follow starts through move-in" },
    { icon:"🏠", big:"Rentals", mid:"Private long-term and public", sub:"Jeonse stress and young households were named" },
    { icon:"🛡️", big:"Deposits", mid:"Jeonse fraud", sub:"He said deposits and daily life must be kept" },
  ],
  quote: "Supply must not stay a plan total. He promised a multi-layer local council and a permit fast track.",
  noteHead: "Why it matters", noteSub: "When a minister names starts, plans can become a calendar. An inaugural speech is not a target. Next: the permit fast track and start dates.",
  footer: "MOLIT · Inaugural",
});

add("hug-ansim-trust", "L1", "JEONSE", {
  badge: "전세", title: "전월세 안심신탁이 전세 3억 원을 맡기면 임대인에게 월 약 109만 원을 주는 구조로 문을 열었습니다",
  heroIcon: "🏦", heroBig: "월 109만 원",
  heroSub: "임차인 전세보증금을 HUG가 대신 관리합니다. 그 돈을 주택공급 펀드에 넣고 임대인에게 월 수익을 줍니다. 연 4.35% 가정입니다.",
  cards: [
    { icon:"💰", big:"3억 원", mid:"전세금 사례", sub:"이 금액에서 월 약 109만 원입니다" },
    { icon:"📉", big:"34만 원", mid:"보증료 절감", sub:"반환보증이 필요 없다고 설명됩니다" },
    { icon:"🏗️", big:"펀드", mid:"공급 투자", sub:"HUG 보증 사업장에 들어갑니다" },
  ],
  quote: "22일 여의도에서 센터가 출범했습니다. 서울 연립 사례로는 월세 74만 원 대신 이자 53만 원으로 월 20만 원을 아낀다고 했습니다.",
  noteHead: "왜 중요한가", noteSub: "전세금이 공급 펀드로 가면 임대차와 착공이 같은 돈줄에 묶입니다. 4.35%는 가정입니다. 다음에 볼 것은 가입 건수와 실제 월 지급입니다.",
  footer: "전세 · 안심신탁",
}, {
  badge: "JEONSE", title: "HUG’s jeonse trust opened, paying landlords about ₩1.09 million a month on ₩300 million",
  heroIcon: "🏦", heroBig: "₩1.09M / mo",
  heroSub: "HUG holds the tenant’s deposit, invests it in a housing-supply fund, and pays the landlord a monthly yield. The assumed rate is 4.35%.",
  cards: [
    { icon:"💰", big:"₩300M", mid:"Example deposit", sub:"That size pays about ₩1.09M a month" },
    { icon:"📉", big:"₩340k", mid:"Guarantee fee saved", sub:"A return guarantee is said to be unnecessary" },
    { icon:"🏗️", big:"Fund", mid:"Supply investment", sub:"It goes into HUG-guaranteed sites" },
  ],
  quote: "The center opened in Yeouido on Sept 22. A Seoul villa example cuts monthly cost from ₩740k rent to ₩530k interest.",
  noteHead: "Why it matters", noteSub: "If deposits fund starts, rentals and construction share one pipe. 4.35% is an assumption. Next: signup counts and actual monthly payouts.",
  footer: "Jeonse · Trust",
});

add("newtown-start-pace", "L5", "POLICY", {
  badge: "공급정책", title: "3기 신도시와 도심 주택을 계획 숫자가 아니라 착공·입주로 챙기겠다는 말이 나왔습니다",
  heroIcon: "🏗️", heroBig: "착공·입주",
  heroSub: "3기 신도시는 수도권에 새로 짓는 큰 택지입니다. 공급이 계획에 머물면 올해 매물은 늘지 않습니다.",
  before: { label: "어제", big: "119만 호", sub: "2030년까지 목표 합입니다" },
  after: { label: "오늘", big: "실행", sub: "착공과 인허가 속도입니다" },
  cards: [
    { icon:"📑", big:"패스트트랙", mid:"인허가", sub:"수도권 지방정부와 통합 심의를 말했습니다" },
    { icon:"🏙️", big:"도심", mid:"이미 사는 곳", sub:"신도시보다 입주가 빠를 수 있습니다" },
    { icon:"📉", big:"1만7,012", mid:"내년 서울 입주", sub:"절벽 숫자를 올해 목표로 메우지는 못합니다" },
  ],
  quote: "공공기관 2차 이전도 속도 있게 하겠다고 했습니다. 이전과 주택이 같이 가면 수요가 옮겨 갑니다.",
  noteHead: "왜 중요한가", noteSub: "착공이 숫자대로 나오면 전세 압력의 일부가 줄어들 수 있습니다. 취임 발언은 목표가 아닙니다. 119만 호 합과 3기 착공을 한 줄로 합치지 마십시오.",
  footer: "공급정책 · 3기 신도시",
}, {
  badge: "SUPPLY", title: "Third-phase new towns were framed as starts and move-ins, not plan totals",
  heroIcon: "🏗️", heroBig: "Starts",
  heroSub: "Third-phase new towns are large capital-region sites. If supply stays a plan, this year’s listings do not grow.",
  before: { label: "Yesterday", big: "1.19M", sub: "A 2030 target total" },
  after: { label: "Today", big: "Execution", sub: "Starts and permit speed" },
  cards: [
    { icon:"📑", big:"Fast track", mid:"Permits", sub:"A multi-layer local council was promised" },
    { icon:"🏙️", big:"Urban", mid:"Already lived-in sites", sub:"Move-in can be faster than new towns" },
    { icon:"📉", big:"17,012", mid:"Next year’s Seoul completions", sub:"A cliff that this year’s target cannot fill" },
  ],
  quote: "A second wave of public-agency relocation was also promised faster. If moves and homes travel together, demand shifts.",
  noteHead: "Why it matters", noteSub: "If starts print, some jeonse pressure can ease over years. An inaugural line is not a target. Do not merge the 1.19 million total with third-phase starts.",
  footer: "Supply · New towns",
});

};
