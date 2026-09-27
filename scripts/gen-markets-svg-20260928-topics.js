/* KR / Safe / KR-RE topics for 2026-09-28 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.28 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"7,080.92", title:"코스피가 전일 7,080.92로 마감한 뒤 오늘 재개장하고 내일 삼성 배당락을 앞둡니다",
      sub:"23일 +0.90%입니다. 24~25일 휴장 뒤 오늘 다시 엽니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"28만5,500원", title:"삼성전자가 전일 28만 5,500원으로 마감했고 오늘이 3분기 배당 마지막 매수일입니다",
      sub:"+3.25%입니다. 기준일 30일, 배당락 29일입니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"186만2,000원", title:"SK하이닉스가 전일 186만 2,000원으로 마감하며 고가 190만 원을 남겼습니다",
      sub:"+1.20%입니다. 반도체 묶음이 지수를 받친 날입니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"−1.94%", title:"현대차가 전일 35만 3,500원으로 1.94% 내리며 반도체 강세와 갈렸습니다",
      sub:"지수가 오른 날 자동차는 쉬었습니다." },
    { color:"#22d3ee", fill:"#06171c", right:"+5.03%", title:"SK스퀘어가 전일 119만 원으로 5.03% 오르며 반도체 지주 칸이 가장 셌습니다",
      sub:"하이닉스를 품은 지주가 본업보다 더 올랐습니다." },
  ],
  caption: "더 볼 것: 7,080.92 · 삼성 배당 막차 · 하이닉스 186만 · 현대 −1.94% · 스퀘어 +5.03%",
}, {
  headline: "2026.09.28 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"7,080.92", title:"KOSPI closed at 7,080.92 and reopens today, with Samsung’s ex-date tomorrow",
      sub:"Sept 23 +0.90%. Cash resumes after the 24–25 halt." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩285,500", title:"Samsung Electronics closed at 285,500 won, last buy today for the Q3 dividend",
      sub:"+3.25%. Record the 30th, ex-date the 29th." },
    { color:"#f59e0b", fill:"#1a1205", right:"₩1.862M", title:"SK Hynix closed at 1,862,000 won after a 1.90 million high",
      sub:"+1.20%. The chip bundle lifted the index." },
    { color:"#fb7185", fill:"#1a0a10", right:"−1.94%", title:"Hyundai Motor closed at 353,500 won, splitting from the chip bid",
      sub:"Autos rested on a green index day." },
    { color:"#22d3ee", fill:"#06171c", right:"+5.03%", title:"SK Square closed at 1,190,000 won, the strongest chip-holding lane",
      sub:"The holding company outran Hynix itself." },
  ],
  caption: "Watch: 7,080.92 · Samsung last buy · Hynix 1.862M · Hyundai −1.94% · Square +5.03%",
});

add("samsung-div-928", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 전일 28만 5,500원으로 마감했고 오늘이 3분기 배당 마지막 매수일입니다",
  heroIcon: "📱", heroBig: "28만5,500원",
  heroSub: "23일 +3.25%, 고가와 종가가 같습니다. 오늘까지 사야 3분기 배당을 받습니다. 기준일 30일, 배당락 29일입니다.",
  cards: [
    { icon:"📈", big:"+3.25%", mid:"전일 상승", sub:"저가 28만 1,000원입니다" },
    { icon:"🎁", big:"28일", mid:"배당 마지막 매수", sub:"장후 시간 외는 20시까지입니다" },
    { icon:"🗓️", big:"29일", mid:"배당락", sub:"현금 약 30조 원이 거론됩니다" },
  ],
  quote: "주당은 약 4,500~4,604원으로 증권사마다 다릅니다. 이사회가 다음 달 말에 확정합니다.",
  noteHead: "왜 중요한가", noteSub: "연휴 뒤 첫날이 바로 배당 막차입니다. 28만 5,500원은 전일 종가입니다. 오늘 종가와 29일 갭을 보면 됩니다.",
  footer: "삼성전자 · 배당 막차",
}, {
  badge: "SAMSUNG", title: "Samsung Electronics closed at 285,500 won, and today is the last buy for the Q3 dividend",
  heroIcon: "📱", heroBig: "₩285,500",
  heroSub: "Sept 23 +3.25%, high equaled the close. Buy today for the Q3 dividend. Record the 30th, ex-date the 29th.",
  cards: [
    { icon:"📈", big:"+3.25%", mid:"Prior gain", sub:"Low 281,000 won" },
    { icon:"🎁", big:"28th", mid:"Last dividend buy", sub:"After-hours until 20:00" },
    { icon:"🗓️", big:"29th", mid:"Ex-date", sub:"About ₩30 trillion cash was cited" },
  ],
  quote: "Per-share estimates sit near ₩4,500–₩4,604. The board locks it late next month.",
  noteHead: "Why it matters", noteSub: "The first session after the holiday is the buy line. 285,500 is the prior close. Next: today’s close and the 29th gap.",
  footer: "Samsung · last buy",
});

add("sk-hynix-1862", "L2", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 전일 186만 2,000원으로 마감하며 고가 190만 원을 남겼습니다",
  heroIcon: "💾", heroBig: "186만2,000원",
  heroSub: "23일 +1.20%입니다. 고가 190만 원입니다. 삼성전자 28만 원대와 같이 움직인 반도체 묶음입니다.",
  cards: [
    { label: "종가", big: "186만2천", mid: "+1.20%", sub: "연휴 전 마지막 종가입니다" },
    { label: "고가", big: "190만", mid: "하루 고점", sub: "종가는 고가를 다 지키지 못했습니다" },
    { label: "묶음", big: "삼성", mid: "28만5,500원", sub: "같은 날 반도체가 지수를 받쳤습니다" },
  ],
  detailHead: "가격이 말해 주는 것",
  detailLines: [
    "고대역폭 메모리 수요는 중기 이야기입니다",
    "재개장에서 190만 원을 다시 보는지가 다음입니다",
    "삼성 배당 막차와는 다른 줄입니다",
  ],
  quote: "종가 186만 2,000원은 출발점입니다. 장중 숫자가 나오면 바꿉니다.",
  noteHead: "왜 중요한가", noteSub: "인공지능 가속기용 메모리는 몇 년의 수요입니다. 186만 원대가 습관이 되면 눈높이가 올라갑니다. 오늘 종가를 보면 됩니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "HYNIX", title: "SK Hynix closed at 1,862,000 won after a 1.90 million high",
  heroIcon: "💾", heroBig: "₩1.862M",
  heroSub: "Sept 23 +1.20%, high 1.90 million. It moved with Samsung’s 280,000-won close.",
  cards: [
    { label: "Close", big: "₩1.862M", mid: "+1.20%", sub: "Last close before the holiday" },
    { label: "High", big: "₩1.90M", mid: "Session peak", sub: "The close did not keep the high" },
    { label: "Bundle", big: "Samsung", mid: "₩285,500", sub: "Chips lifted the index that day" },
  ],
  detailHead: "What the tape says",
  detailLines: [
    "High-bandwidth memory remains a multi-year story",
    "Next is whether 1.90 million returns after the reopen",
    "A different line from Samsung’s dividend deadline",
  ],
  quote: "1,862,000 won is the starting print. Session numbers will replace it.",
  noteHead: "Why it matters", noteSub: "Accelerator memory demand stretches over years. If 1.86 million holds, the eye level steps up. Next: today’s close.",
  footer: "SK Hynix · Stock",
});

add("hyundai-353500", "L4", "AUTO", {
  badge: "현대차", title: "현대차가 전일 35만 3,500원으로 1.94% 내리며 반도체 강세와 갈렸습니다",
  badgeLine: "순환 · 약세",
  heroIcon: "🚗", heroBig: "−1.94%",
  heroSub: "23일 종가 35만 3,500원입니다. 코스피와 삼성전자가 오른 날 자동차는 내렸습니다.",
  cards: [
    { icon:"📉", big:"353,500", mid:"전일 종가", sub:"연휴 앞 하루입니다" },
    { icon:"📱", big:"반도체", mid:"방향이 달랐습니다", sub:"삼성 +3.25%, 이 종목 −1.94%입니다" },
    { icon:"🔋", big:"엔솔", mid:"+0.29%", sub:"배터리는 거의 제자리였습니다" },
  ],
  quote: "지수가 초록이어도 자동차는 쉴 수 있습니다. 하루 순환입니다.",
  noteHead: "왜 중요한가", noteSub: "수출과 전동화는 몇 년의 칸입니다. 전일 약세는 출발점입니다. 오늘 시가를 보면 됩니다.",
  footer: "현대차 · 순환",
}, {
  badge: "HYUNDAI", title: "Hyundai Motor closed at 353,500 won, down 1.94%, splitting from the chip bid",
  badgeLine: "Rotation · down",
  heroIcon: "🚗", heroBig: "−1.94%",
  heroSub: "Sept 23 close 353,500. Autos fell while KOSPI and Samsung rose.",
  cards: [
    { icon:"📉", big:"353,500", mid:"Prior close", sub:"A holiday-eve session" },
    { icon:"📱", big:"Chips", mid:"The other direction", sub:"Samsung +3.25%, this name −1.94%" },
    { icon:"🔋", big:"LGES", mid:"+0.29%", sub:"Batteries were almost flat" },
  ],
  quote: "A green index can still rest autos. One-day rotation.",
  noteHead: "Why it matters", noteSub: "Exports and electrification remain multi-year lanes. Yesterday’s drop is a start print. Next: today’s open.",
  footer: "Hyundai · rotation",
});

add("sk-square-1190", "L3", "FLOW", {
  badge: "SK스퀘어", title: "SK스퀘어가 전일 119만 원으로 5.03% 오르며 반도체 지주 칸이 가장 셌습니다",
  heroIcon: "🏢", heroBig: "+5.03%",
  heroSub: "23일 종가 119만 원입니다. SK하이닉스를 품은 지주가 본업 +1.20%보다 더 올랐습니다.",
  cards: [
    { icon:"📈", big:"119만", mid:"전일 종가", sub:"연휴 앞 센 하루입니다" },
    { icon:"💾", big:"하이닉스", mid:"+1.20%", sub:"자회사보다 지주가 가팔랐습니다" },
    { icon:"⚖️", big:"할증", mid:"하루 5%", sub:"자회사 가치에 붙는 프리미엄입니다" },
  ],
  quote: "지주는 자회사가 오르면 더 달리고, 쉬면 더 쉴 수 있습니다. 하루 레버리지처럼 읽힙니다.",
  noteHead: "왜 중요한가", noteSub: "하이닉스 가치가 몇 년 커지면 스퀘어는 그 그릇입니다. 119만 원이 남는지가 오늘 확인입니다.",
  footer: "SK스퀘어 · 지주",
}, {
  badge: "SK SQUARE", title: "SK Square closed at 1,190,000 won, up 5.03%, the strongest chip-holding lane",
  heroIcon: "🏢", heroBig: "+5.03%",
  heroSub: "Sept 23 close 1,190,000. The holding company that owns SK Hynix outran the chip name’s +1.20%.",
  cards: [
    { icon:"📈", big:"₩1.19M", mid:"Prior close", sub:"A strong holiday-eve print" },
    { icon:"💾", big:"Hynix", mid:"+1.20%", sub:"The parent outran the subsidiary" },
    { icon:"⚖️", big:"Premium", mid:"One-day 5%", sub:"A holding-company premium" },
  ],
  quote: "A holding name can run harder when the child runs, and rest harder when it rests.",
  noteHead: "Why it matters", noteSub: "If Hynix value compounds, Square is the bowl. Next: whether 1.19 million holds today.",
  footer: "SK Square · holding",
});

add("kospi-7080-reopen", "L6", "KOSPI", {
  badge: "코스피", title: "코스피가 전일 7,080.92로 마감한 뒤 오늘 재개장하고 내일 삼성 배당락을 앞둡니다",
  breaking: "재개장 · 배당 막차",
  heroBig: "7,080.92", heroSub: "23일 +0.90%입니다. 시가 고가 7,153.99, 저가 약 7,014.98입니다. 24~25일 휴장 뒤 오늘 다시 엽니다.",
  grid: [
    { icon:"📈", big:"7,153.99", mid:"23일 고가", sub:"시가와 고가가 같았습니다" },
    { icon:"🗓️", big:"28일", mid:"재개장", sub:"연휴 뒤 첫 거래일입니다" },
    { icon:"🎁", big:"28일", mid:"삼성 배당 막차", sub:"내일 29일이 배당락입니다" },
    { icon:"📉", big:"7,150", mid:"매물", sub:"갭 상승이 거론됩니다" },
  ],
  ctx1: "코스닥은 23일 844.48(+1.21%)이었습니다.",
  ctx2: "장중 시가는 아침 기준으로 아직 없습니다. 전일 종가가 출발점입니다.",
  quote: "7,000선 종가 뒤 재개장입니다. 내일 큰 종목 배당락이 지수에도 조금 무게를 줍니다.",
  noteHead: "왜 중요한가", noteSub: "7,000선이 여러 날 남으면 눈높이가 올라갑니다. 7,080.92는 전일 종가입니다. 오늘 시가와 29일 갭을 보면 됩니다.",
  footer: "코스피 · 재개장",
}, {
  badge: "KOSPI", title: "KOSPI closed at 7,080.92 and reopens today, with Samsung’s ex-date tomorrow",
  breaking: "Reopen · last buy",
  heroBig: "7,080.92", heroSub: "Sept 23 +0.90%. High 7,153.99, low about 7,014.98. Cash resumes after the 24–25 halt.",
  grid: [
    { icon:"📈", big:"7,153.99", mid:"Sept 23 high", sub:"Open equaled the high" },
    { icon:"🗓️", big:"28th", mid:"Reopen", sub:"First cash session after the holiday" },
    { icon:"🎁", big:"28th", mid:"Samsung last buy", sub:"Ex-date is the 29th" },
    { icon:"📉", big:"7,150", mid:"Supply", sub:"A gap-up is being discussed" },
  ],
  ctx1: "KOSDAQ finished Sept 23 at 844.48 (+1.21%).",
  ctx2: "No session open yet as of this morning. The prior close is the start print.",
  quote: "A 7,000 close then a reopen. Tomorrow’s large-cap ex-date adds a little index weight.",
  noteHead: "Why it matters", noteSub: "If 7,000 holds, the eye level steps up. 7,080.92 is the prior close. Next: today’s open and the 29th gap.",
  footer: "KOSPI · reopen",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.28 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$84,601", title:"비트코인이 약 8만 4,601달러로 내려와 주간 펀드 24억 달러와 같이 읽힙니다",
      sub:"23일 약 8만 6,558달러에서 내려왔습니다." },
    { color:"#facc15", fill:"#1a1600", right:"$4,285", title:"금 현물이 온스당 약 4,285달러로 한 주를 마치며 4,300달러를 내줬습니다",
      sub:"주간 종가 약 4,287.25달러, −2.08%입니다." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,713", title:"이더리움이 약 2,713달러로 주간 펀드 6억 8,900만 달러와 같이 읽힙니다",
      sub:"같은 주 이더 펀드가 담았습니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"$64", title:"은 현물이 온스당 약 64달러로 한 주를 마치며 금보다 조금 더 쉬었습니다",
      sub:"한 주 약 3~4% 내렸습니다." },
  ],
  caption: "더 볼 것: BTC 8만4,601 · 금 4,285 · 이더 2,713 · 은 64 · 비트펀드 24억",
}, {
  headline: "2026.09.28 Safe-Asset Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$84,601", title:"Bitcoin sat near $84,601 after a $2.4 billion weekly ETF bid",
      sub:"Down from about $86,558 on Sept 23." },
    { color:"#facc15", fill:"#1a1600", right:"$4,285", title:"Spot gold finished the week near $4,285 and lost $4,300",
      sub:"Weekly close about $4,287.25, −2.08%." },
    { color:"#818cf8", fill:"#0f1024", right:"$2,713", title:"Ether sat near $2,713 after a $689 million weekly ETF bid",
      sub:"Ether funds filled in the same week." },
    { color:"#94a3b8", fill:"#0c1017", right:"$64", title:"Spot silver finished the week near $64, a little softer than gold",
      sub:"The week lost about 3–4%." },
  ],
  caption: "Watch: BTC $84,601 · gold $4,285 · ETH $2,713 · silver $64 · BTC ETFs $2.4B",
});

add("btc-84600", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 약 8만 4,601달러로 내려와 주간 펀드 24억 달러와 같이 읽힙니다",
  heroIcon: "₿", heroBig: "$84,601",
  heroSub: "23일 약 8만 6,558달러에서 내려온 주말 가격입니다. 미국 현물 펀드는 9월 19~25일 주간에 약 24억 달러를 담았습니다.",
  cards: [
    { icon:"📉", big:"$86,558", mid:"23일 아침", sub:"그 가격에서 내려왔습니다" },
    { icon:"🏦", big:"$2.4B", mid:"주간 펀드", sub:"한 상품이 약 12억 달러입니다" },
    { icon:"⚠️", big:"$83k", mid:"경고선", sub:"주간 종가 8만2,800~8만3천 달러입니다" },
  ],
  quote: "가격이 내려도 펀드가 담은 주입니다. 연간 누적은 다시 약 9.34억 달러 플러스입니다.",
  noteHead: "왜 중요한가", noteSub: "현물 펀드가 몇 년 남으면 수요 바닥이 두꺼워집니다. 8만 4,601달러는 주말 한 시점입니다. 여러 날 남는지가 다음입니다.",
  footer: "비트코인 · 8만4,600",
}, {
  badge: "BTC", title: "Bitcoin sat near $84,601 after a $2.4 billion weekly ETF bid",
  heroIcon: "₿", heroBig: "$84,601",
  heroSub: "Down from about $86,558 on Sept 23. US spot funds took in about $2.4 billion in the Sept 19–25 week.",
  cards: [
    { icon:"📉", big:"$86,558", mid:"Sept 23 morning", sub:"Price came down from there" },
    { icon:"🏦", big:"$2.4B", mid:"Weekly funds", sub:"One product was about $1.2B" },
    { icon:"⚠️", big:"$83k", mid:"Watch line", sub:"Weekly-close warning 82.8–83k" },
  ],
  quote: "Price fell and funds still filled. Year-to-date flow is back about +$934 million.",
  noteHead: "Why it matters", noteSub: "Multi-year spot funds thicken the demand floor. $84,601 is one weekend print. Next: whether it holds for days.",
  footer: "Bitcoin · $84,601",
});

add("gold-4285", "L5", "GOLD", {
  badge: "금", title: "금 현물이 온스당 약 4,285달러로 한 주를 마치며 4,300달러를 내줬습니다",
  heroIcon: "🥇", heroBig: "$4,285",
  heroSub: "주간 종가 약 4,287.25달러, −2.08%입니다. 주간 저가는 약 4,244.63달러입니다.",
  before: { label: "23일 화면", big: "$4,359", sub:"연휴 전 아침에 찍힌 칸입니다" },
  after: { label: "주말", big: "$4,285", sub:"4,300달러를 내준 한 주입니다" },
  cards: [
    { icon:"📉", big:"−2.08%", mid:"주간", sub:"달러와 금리가 세진 주로 설명됩니다" },
    { icon:"📉", big:"$4,244", mid:"주간 저가", sub:"4,240~4,280달러가 바닥 구간으로 거론됩니다" },
    { icon:"🥈", big:"은", mid:"더 쉼", sub:"은은 같은 주 약 3~4% 내렸습니다" },
  ],
  quote: "지정학이 있어도 금리가 이기면 금은 한 주를 내줄 수 있습니다.",
  noteHead: "왜 중요한가", noteSub: "금은 몇 년의 준비 자산입니다. 4,285달러는 주말 한 시점입니다. 저가 위를 지키는지가 다음입니다.",
  footer: "금 · 4,285",
}, {
  badge: "GOLD", title: "Spot gold finished the week near $4,285 and lost $4,300",
  heroIcon: "🥇", heroBig: "$4,285",
  heroSub: "Weekly close about $4,287.25, −2.08%. Week low about $4,244.63.",
  before: { label: "Sept 23", big: "$4,359", sub:"The pre-holiday morning print" },
  after: { label: "Weekend", big: "$4,285", sub:"A week that lost $4,300" },
  cards: [
    { icon:"📉", big:"−2.08%", mid:"Week", sub:"A firmer dollar and yields" },
    { icon:"📉", big:"$4,244", mid:"Week low", sub:"$4,240–$4,280 is cited as a floor band" },
    { icon:"🥈", big:"Silver", mid:"Softer", sub:"Silver lost about 3–4% the same week" },
  ],
  quote: "Even with geopolitics, yields can win a week in gold.",
  noteHead: "Why it matters", noteSub: "Gold remains a multi-year reserve asset. $4,285 is one weekend print. Next: whether the week low holds.",
  footer: "Gold · $4,285",
});

add("eth-2713", "L3", "ETH", {
  badge: "이더리움", title: "이더리움이 약 2,713달러로 주간 펀드 6억 8,900만 달러와 같이 읽힙니다",
  heroIcon: "◆", heroBig: "$2,713",
  heroSub: "23일 약 2,764달러에서 조금 내려온 주말 가격입니다. 이더 현물 펀드는 같은 주간에 약 6.89억 달러를 담았습니다.",
  cards: [
    { icon:"🏦", big:"$689M", mid:"주간 펀드", sub:"비트 주간 24억 달러와 같은 주입니다" },
    { icon:"📉", big:"$2,800", mid:"저항", sub:"그 선에서 밀렸다는 설명이 있습니다" },
    { icon:"🧱", big:"$2,631", mid:"이전 지지", sub:"그 위에서 한 계단입니다" },
  ],
  quote: "가격은 숨 골랐고 펀드는 담았습니다. 두 줄은 같이 읽습니다.",
  noteHead: "왜 중요한가", noteSub: "이더는 몇 년의 응용 플랫폼입니다. 2,713달러는 한 시점입니다. 여러 날 남는지가 다음입니다.",
  footer: "이더리움 · 2,713",
}, {
  badge: "ETH", title: "Ether sat near $2,713 after a $689 million weekly ETF bid",
  heroIcon: "◆", heroBig: "$2,713",
  heroSub: "Down a little from about $2,764 on Sept 23. Spot ether funds took in about $689 million the same week.",
  cards: [
    { icon:"🏦", big:"$689M", mid:"Weekly funds", sub:"Same week as bitcoin’s $2.4B" },
    { icon:"📉", big:"$2,800", mid:"Resistance", sub:"A rejection there was cited" },
    { icon:"🧱", big:"$2,631", mid:"Prior support", sub:"One step above that floor" },
  ],
  quote: "Price rested and funds filled. Read both lines.",
  noteHead: "Why it matters", noteSub: "Ether remains a multi-year application platform. $2,713 is one print. Next: whether it holds for days.",
  footer: "Ether · $2,713",
});

add("silver-64", "L2", "SILVER", {
  badge: "은", title: "은 현물이 온스당 약 64달러로 한 주를 마치며 금보다 조금 더 쉬었습니다",
  heroIcon: "🥈", heroBig: "$64",
  heroSub: "화면마다 63.90~64.30달러입니다. 한 주 약 3~4% 내렸고 주 초 66~67달러대에서 내려왔습니다.",
  cards: [
    { label: "주간", big: "−3~4%", mid: "한 주 하락", sub: "금의 약 2%보다 더 쉬었습니다" },
    { label: "저가", big: "$63.26", mid: "주간 저가", sub: "63달러가 지지로 거론됩니다" },
    { label: "비율", big: "67", mid: "금÷은", sub: "금 4,285달러를 은 64달러로 나눕니다" },
  ],
  detailHead: "가격이 말해 주는 것",
  detailLines: [
    "산업 수요와 투자 수요가 한 금속에 겹칩니다",
    "한 주 가격은 금리와 달러가 먼저 움직입니다",
    "금이 먼저 바닥을 만들면 은이 따라가는 습관이 있습니다",
  ],
  quote: "64달러는 주말 한 시점입니다. 63달러 위 종가가 다음입니다.",
  noteHead: "왜 중요한가", noteSub: "은은 몇 년의 산업·화폐 금속입니다. 한 주 3%가 그 역할을 지우지는 않습니다. 금과 비율을 같이 보면 됩니다.",
  footer: "은 · 64",
}, {
  badge: "SILVER", title: "Spot silver finished the week near $64, a little softer than gold",
  heroIcon: "🥈", heroBig: "$64",
  heroSub: "Prints sit near $63.90–$64.30. The week lost about 3–4% from the mid-$66s and high $67s.",
  cards: [
    { label: "Week", big: "−3–4%", mid: "Weekly drop", sub: "Softer than gold’s about 2%" },
    { label: "Low", big: "$63.26", mid: "Week low", sub: "$63 is cited as support" },
    { label: "Ratio", big: "67", mid: "Gold / silver", sub: "$4,285 gold over $64 silver" },
  ],
  detailHead: "What the tape says",
  detailLines: [
    "Industrial and investment demand share one metal",
    "A week’s price still follows yields and the dollar first",
    "Silver often follows after gold makes a floor",
  ],
  quote: "$64 is one weekend print. Next is a close above $63.",
  noteHead: "Why it matters", noteSub: "Silver remains a multi-year industrial and monetary metal. A 3% week does not erase that. Read it beside gold and the ratio.",
  footer: "Silver · $64",
});

add("summary-krre", "ROWS", "POLICY", {
  headline: "2026.09.28 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"1만2천 호", title:"3기 신도시 분양전환 임대 약 1만 2,000호를 순수 공공임대로 돌리는 검토가 나왔습니다",
      sub:"사전청약·착공 단지는 빠집니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"부천대장", title:"부천 대장지구가 최단기 착공 모델로 현장을 다시 열었습니다",
      sub:"계획 숫자가 아니라 흙이 움직이는 줄입니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"2차 이전", title:"공공기관 2차 이전과 세종·새만금 균형발전이 주택 수요를 옮기는 줄로 올랐습니다",
      sub:"일자리가 가면 집 수요도 같이 움직입니다." },
  ],
  caption: "더 볼 것: 1만2천 호 전환 · 부천대장 착공 · 공공기관 2차 이전",
}, {
  headline: "2026.09.28 Housing Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#120b1f", right:"12,000", title:"About 12,000 conversion rentals may stay public rentals",
      sub:"Pre-sold or started blocks are excluded." },
    { color:"#fb923c", fill:"#1a0d02", right:"Daejang", title:"Bucheon Daejang was recast as the fastest-start model",
      sub:"Execution, not a plan total." },
    { color:"#a78bfa", fill:"#120b1f", right:"2nd move", title:"A second agency relocation plus Sejong and Saemangeum",
      sub:"Jobs that move take housing demand with them." },
  ],
  caption: "Watch: 12,000 conversions · Daejang start · second agency move",
});

add("convert-public-rental", "L4", "POLICY", {
  badge: "공급정책", title: "3기 신도시 분양전환 임대 약 1만 2,000호를 순수 공공임대로 돌리는 검토가 나왔습니다",
  badgeLine: "임대 · 전환",
  heroIcon: "🏠", heroBig: "1만2천 호",
  heroSub: "분양전환은 몇 년 뒤 분양으로 바뀌는 임대입니다. 순수 공공임대는 계속 임대로 남습니다. 사전청약·착공 단지는 빠집니다.",
  cards: [
    { icon:"📋", big:"제외", mid:"사전청약·착공", sub:"이미 진행된 단지는 대상이 아닙니다" },
    { icon:"🔑", big:"임대", mid:"계속 남김", sub:"분양 매물은 그 호수만큼 줄어듭니다" },
    { icon:"🗓️", big:"검토", mid:"고시 전", sub:"확정이 나와야 달력이 됩니다" },
  ],
  quote: "공급 숫자는 같아도 분양 대기 줄이 짧아지고 임대 재고는 남습니다.",
  noteHead: "왜 중요한가", noteSub: "전세 압력이 큰 해에 임대 재고는 완충이 됩니다. 1만 2,000호는 검토 숫자입니다. 제외 목록이 다음입니다.",
  footer: "공급정책 · 공공임대",
}, {
  badge: "SUPPLY", title: "About 12,000 conversion rentals in third-phase new towns may stay public rentals",
  badgeLine: "Rental · convert",
  heroIcon: "🏠", heroBig: "12,000",
  heroSub: "Conversion rentals later become sales. Public rentals stay rented. Pre-sold or started blocks are out.",
  cards: [
    { icon:"📋", big:"Out", mid:"Pre-sale / started", sub:"Those blocks are not in scope" },
    { icon:"🔑", big:"Rent", mid:"They stay rented", sub:"For-sale supply shrinks by that count" },
    { icon:"🗓️", big:"Review", mid:"Before a gazette", sub:"A lock turns it into a date" },
  ],
  quote: "The unit count can stay the same while the sale queue shortens and the rental stock remains.",
  noteHead: "Why it matters", noteSub: "Rental stock cushions a tight jeonse year. 12,000 is a review number. Next: the exclusion list.",
  footer: "Supply · public rental",
});

add("bucheon-daejang", "L1", "JEONSE", {
  badge: "공급정책", title: "부천 대장지구가 최단기 착공 모델로 현장을 다시 열었습니다",
  heroIcon: "🚧", heroBig: "최단기",
  heroSub: "3기 신도시 가운데 인허가와 착공을 가장 빨리 끌어올리는 시범 현장입니다. 계획 호수가 아니라 흙이 주제입니다.",
  cards: [
    { icon:"📍", big:"부천", mid:"대장지구", sub:"3기 신도시 한 곳입니다" },
    { icon:"⏩", big:"시범", mid:"착공 속도", sub:"다른 지구가 따라올 수 있습니다" },
    { icon:"🗓️", big:"현장", mid:"취임 주간", sub:"흙이 움직이는 줄입니다" },
  ],
  quote: "목표가 커도 인허가가 느리면 올해 매물은 늘지 않습니다. 대장이 먼저 움직이면 속도가 배웁니다.",
  noteHead: "왜 중요한가", noteSub: "한 지구가 빨리 착공하면 3기 전체가 달력을 배웁니다. 착공 고시일이 다음입니다.",
  footer: "부천대장 · 착공",
}, {
  badge: "SUPPLY", title: "Bucheon Daejang was recast as the fastest-start model among third-phase new towns",
  heroIcon: "🚧", heroBig: "Fastest",
  heroSub: "A pilot to pull permits and ground-breaking forward. Dirt, not a plan total.",
  cards: [
    { icon:"📍", big:"Bucheon", mid:"Daejang", sub:"One third-phase new town" },
    { icon:"⏩", big:"Pilot", mid:"Start speed", sub:"Other sites may follow" },
    { icon:"🗓️", big:"Site", mid:"Inaugural week", sub:"The line where dirt moves" },
  ],
  quote: "A large target does not add this year’s homes if permits lag. If Daejang moves first, others can learn the pace.",
  noteHead: "Why it matters", noteSub: "One fast start can teach the whole third-phase calendar. Next: a groundbreaking gazette.",
  footer: "Daejang · start",
});

add("agency-second-move", "L3", "POLICY", {
  badge: "공급정책", title: "공공기관 2차 이전과 세종·새만금 균형발전이 주택 수요를 옮기는 줄로 올랐습니다",
  heroIcon: "🏛️", heroBig: "2차 이전",
  heroSub: "수도권 공공기관을 지방으로 한 번 더 옮기는 계획입니다. 일자리가 가면 집 수요도 같이 움직입니다.",
  cards: [
    { icon:"🏢", big:"2차", mid:"남은 기관", sub:"1차 이전과 다른 다음 칸입니다" },
    { icon:"🗺️", big:"세종", mid:"행정 도시", sub:"기관이 가면 임대와 상업이 따라갑니다" },
    { icon:"🌊", big:"새만금", mid:"서해 개발", sub:"큰 지구에 일자리가 붙습니다" },
  ],
  quote: "수도권 매물이 바로 늘지는 않습니다. 수요가 지도를 바꿉니다.",
  noteHead: "왜 중요한가", noteSub: "일자리가 분산되면 주택 수요도 분산됩니다. 기관 목록과 이전 연도가 다음입니다.",
  footer: "균형발전 · 이전",
}, {
  badge: "SUPPLY", title: "A second public-agency relocation plus Sejong and Saemangeum was framed as moving housing demand",
  heroIcon: "🏛️", heroBig: "2nd move",
  heroSub: "Another wave of capital-region agencies moving out. Jobs that leave take housing demand with them.",
  cards: [
    { icon:"🏢", big:"2nd", mid:"Remaining agencies", sub:"A different lane from the first wave" },
    { icon:"🗺️", big:"Sejong", mid:"Admin city", sub:"Rentals and shops follow the jobs" },
    { icon:"🌊", big:"Saemangeum", mid:"West-coast project", sub:"A large district that needs jobs" },
  ],
  quote: "Seoul supply does not jump overnight. Demand changes the map.",
  noteHead: "Why it matters", noteSub: "If jobs disperse, housing demand disperses. Next: the agency list and move years.",
  footer: "Balance · relocation",
});

};
