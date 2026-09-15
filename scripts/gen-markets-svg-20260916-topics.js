/* KR / Safe / KR-RE topics for 2026-09-16 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.16 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,627", title:"코스피가 4거래일 연속 내려 6,627.26에 마감했습니다",
      sub:"외국인이 5거래일째 순매도(1조5,735억 원)를 이어갔습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"−0.20%", title:"삼성전자가 장중 반등 시도 뒤 24만8,500원으로 약보합 마감했습니다",
      sub:"장중 25만2,000원까지 올랐다가 다시 밀렸습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"−0.41%", title:"SK하이닉스도 172만9,000원까지 올랐다가 169만 원으로 마쳤습니다",
      sub:"외국인 순매도 1위(1조27억 원)에 올랐습니다." },
    { color:"#22c55e", fill:"#06210f", right:"+0.27%", title:"현대차는 36만8,500원으로 반등했지만 기아는 1.53% 내렸습니다",
      sub:"두 계열사 주가가 서로 다른 방향으로 갈렸습니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"−3.19%", title:"KB금융이 시장 전체 하락에 눌려 3.19% 내렸습니다",
      sub:"3분기 역대 최대 순익 전망에도 방어하지 못했습니다." },
  ],
  caption: "더 볼 것: 코스피 6,627 · 삼성전자 −0.20% · 하이닉스 −0.41% · 현대차 +0.27%·기아 −1.53% · KB금융 −3.19%",
}, {
  headline: "2026.09.16 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,627", title:"KOSPI fell for a 4th straight session to close at 6,627.26",
      sub:"Foreigners extended net-selling to a 5th day (₩1.57T)." },
    { color:"#60a5fa", fill:"#0a1420", right:"-0.20%", title:"Samsung Electronics tried to rebound, then closed flat-to-down at 248,500 won",
      sub:"It touched 252,000 won intraday before fading." },
    { color:"#f59e0b", fill:"#1a1205", right:"-0.41%", title:"SK Hynix also climbed to 1,729,000 won before closing at 1,690,000",
      sub:"It topped foreigners' most-sold list at ₩1.0T." },
    { color:"#22c55e", fill:"#06210f", right:"+0.27%", title:"Hyundai rebounded 0.27% while Kia fell 1.53%",
      sub:"The two affiliates' shares diverged for the day." },
    { color:"#ef4444", fill:"#1a0a0a", right:"-3.19%", title:"KB Financial dropped 3.19% despite record Q3 profit forecasts",
      sub:"Broad market pressure outweighed the good earnings news." },
  ],
  caption: "Watch: KOSPI 6,627 · Samsung -0.20% · Hynix -0.41% · Hyundai +0.27%/Kia -1.53% · KB Financial -3.19%",
});

add("kospi-4day-decline-foreign-sell", "L2", "KOSPI", {
  badge: "코스피", title: "코스피가 미국 국채금리·국제유가 부담으로 4거래일 연속 내리며 6,627.26에 마감했습니다",
  heroIcon: "📉", heroBig: "6,627.26",
  heroSub: "9월 15일 종가로 전 거래일보다 57.11포인트(0.85%) 내렸습니다. 4거래일간 누적 하락률은 약 6%입니다.",
  cards: [
    { label:"외국인", big:"−1조5,735억", mid:"5거래일 연속 순매도", sub:"코스피200 선물도 순매도" },
    { label:"기관", big:"−9,038억", mid:"동반 매도", sub:"비차익 매물 위주" },
    { label:"개인", big:"+8,319억", mid:"홀로 매수", sub:"하락 방어에는 역부족" },
  ],
  detailHead: "코스피가 다시 밀린 이유",
  detailLines: [
    "미국 10년물 국채금리가 2007년 이후 최고 수준까지 오르며 부담을 줬습니다.",
    "사우디·리비아 공급 차질 우려로 국제유가가 4개월 만에 최고치로 뛰었습니다.",
    "장중 6,715.46까지 반등했지만 오후 들어 매물에 밀려 6,582.20까지 내렸습니다.",
  ],
  noteSub: "개인과 기타법인이 각각 8,319억 원, 1조6,430억 원을 순매수하며 하단을 받쳤지만 외국인·기관의 동반 매도를 다 막지는 못했습니다. 대신증권은 코스피 6,600선이 올해 평균 PBR 기준 의미 있는 지지 구간이라고 짚었습니다. 다음 거래일에도 외국인 매도가 이어지는지 확인하면 됩니다.",
  footer: "코스피 · 4거래일 하락",
}, {
  badge: "KOSPI", title: "KOSPI fell for a 4th straight session to 6,627.26 as US Treasury yields and oil prices weighed on sentiment",
  heroIcon: "📉", heroBig: "6,627.26",
  heroSub: "Sept 15 close, down 57.11 points (0.85%). The index has fallen about 6% cumulatively over four sessions.",
  cards: [
    { label:"Foreigners", big:"-₩1.57T", mid:"5th day of selling", sub:"Also sold KOSPI 200 futures" },
    { label:"Institutions", big:"-₩904B", mid:"Also sold", sub:"Mostly non-arbitrage flows" },
    { label:"Retail", big:"+₩832B", mid:"Lone buyer", sub:"Not enough to offset the drop" },
  ],
  detailHead: "Why KOSPI slid again",
  detailLines: [
    "The US 10-year Treasury yield climbed to its highest since 2007, adding pressure.",
    "Oil jumped to a four-month high on Saudi and Libyan supply concerns.",
    "KOSPI touched 6,715.46 intraday before selling pushed it down to 6,582.20.",
  ],
  noteSub: "Retail and other corporate investors bought ₩832B and ₩1.64T respectively, cushioning the fall but not fully offsetting foreign and institutional selling. Daishin Securities called the 6,600 level a meaningful support zone on this year's average PBR. Next: watch whether foreign selling continues into the next session.",
  footer: "KOSPI · 4-day decline",
});

add("samsung-hynix-rebound-fail", "L5", "SEC", {
  badge: "삼성전자·하이닉스", title: "삼성전자와 SK하이닉스가 장중 반등에 성공했다가 오후 들어 다시 밀리며 약보합으로 마감했습니다",
  heroIcon: "🔁", heroBig: "24만8,500원 / 169만 원",
  heroSub: "9월 15일 종가로 삼성전자 −0.20%, SK하이닉스 −0.41%입니다. 장중에는 각각 1.41%, 2.73%까지 올랐습니다.",
  before: { label:"장중 최고", big:"+1.41% / +2.73%", sub:"저가매수세로 반등" },
  after: { label:"장 마감", big:"−0.20% / −0.41%", sub:"오후 들어 상승분 반납" },
  cards: [
    { icon:"💸", big:"1조27억", mid:"하이닉스 외국인 순매도", sub:"코스피 전체 1위" },
    { icon:"🏢", big:"+1조6,057억", mid:"기타법인 순매수", sub:"양사 자사주 매수 영향" },
    { icon:"🇺🇸", big:"필라델피아 −5.86%", mid:"전일 미국 반도체지수", sub:"국내는 상대적으로 선방" },
  ],
  quote: "신한투자증권은 전일 악재를 이미 선반영했다는 인식에 저가 매수세가 유입되며 하단이 지지됐다고 설명했습니다.",
  noteSub: "두 회사 모두 자사주 매수를 이어가며 기타법인 순매수로 집계돼 수급을 일부 방어했습니다. HBM 점유율 등 근본 경쟁력은 그대로 유지되고 있어, 하루짜리 등락은 매크로 변수에 따른 것으로 볼 수 있습니다. 다음 거래일에 외국인 매도가 이어지는지, 미국 반도체주 흐름을 함께 확인하면 됩니다.",
  footer: "삼성전자·SK하이닉스 · 주가",
}, {
  badge: "SMSN/HYNIX", title: "Samsung and SK Hynix rallied intraday on bargain hunting, then faded to close slightly lower",
  heroIcon: "🔁", heroBig: "₩248,500 / ₩1,690,000",
  heroSub: "Sept 15 close: Samsung -0.20%, SK Hynix -0.41%. Both had risen 1.41% and 2.73% intraday.",
  before: { label:"Intraday high", big:"+1.41% / +2.73%", sub:"Bargain-hunting rally" },
  after: { label:"At the close", big:"-0.20% / -0.41%", sub:"Gains faded in the afternoon" },
  cards: [
    { icon:"💸", big:"₩1.0T", mid:"Hynix foreign selling", sub:"Largest across KOSPI" },
    { icon:"🏢", big:"+₩1.6T", mid:"Corporate buying", sub:"Tied to buyback programs" },
    { icon:"🇺🇸", big:"Phili SOX -5.86%", mid:"Prior-day US chip index", sub:"Local shares held up better" },
  ],
  quote: "Shinhan Investment said bargain hunters stepped in on the view that prior bad news was already priced in.",
  noteSub: "Both firms kept buying back their own shares, showing up as corporate net-buying that partly cushioned flows. Core strengths like HBM share remain intact, so daily swings mostly reflect macro variables. Next: watch whether foreign selling continues and track US chip-stock moves.",
  footer: "Samsung/SK Hynix · Stock",
});

add("hyundai-kia-diverge", "L4", "AUTO", {
  badge: "현대차·기아", badgeLine: "\"한 그룹인데 갈린 하루\"",
  title: "현대차는 0.27% 반등했지만 기아는 1.53% 내리며 두 계열사 주가가 서로 다른 방향으로 갈렸습니다",
  heroIcon: "🚗", heroBig: "+0.27% / −1.53%",
  heroSub: "9월 15일 종가로 현대차는 36만8,500원, 기아는 12만2,300원입니다.",
  cards: [
    { icon:"📈", big:"36만8,500원", mid:"현대차", sub:"전일 −3.92% 급락 뒤 반등" },
    { icon:"📉", big:"12만2,300원", mid:"기아", sub:"장중 12만1,700원까지 밀림" },
    { icon:"🛢", big:"유가·금리", mid:"공통 부담", sub:"완성차 업종 전체에 영향" },
  ],
  quote: "전날 두 회사 모두 미국 관세·수요 우려로 급락한 뒤라, 이날은 개별 수급 차이가 더 크게 반영됐다는 평가입니다.",
  noteSub: "현대차·기아는 조지아 등 미국 현지 생산 기반을 갖추고 있어 관세 리스크 대응력을 갖췄다는 평가를 받습니다. 다만 유가 급등으로 인한 소비 심리 위축 우려는 완성차 업종 전체에 부담입니다. 다음 거래일에 두 종목의 방향이 다시 같아지는지 확인하면 됩니다.",
  footer: "현대차·기아 · 주가",
}, {
  badge: "HYUNDAI/KIA", badgeLine: "\"One group, diverging days\"",
  title: "Hyundai rebounded 0.27% while Kia fell 1.53%, sending the two affiliates' shares in opposite directions",
  heroIcon: "🚗", heroBig: "+0.27% / -1.53%",
  heroSub: "Sept 15 close: Hyundai at 368,500 won, Kia at 122,300 won.",
  cards: [
    { icon:"📈", big:"₩368,500", mid:"Hyundai", sub:"Rebounded after -3.92% the day before" },
    { icon:"📉", big:"₩122,300", mid:"Kia", sub:"Touched ₩121,700 intraday" },
    { icon:"🛢", big:"Oil & rates", mid:"Shared pressure", sub:"Weighing on the whole sector" },
  ],
  quote: "Both stocks had plunged the prior day on US tariff and demand worries, so today's move reflected stock-specific flows.",
  noteSub: "Hyundai and Kia have US production bases like Georgia that help offset tariff risk. But surging oil prices still pressure the auto sector broadly through weaker consumer sentiment. Next: watch whether the two stocks move back in the same direction.",
  footer: "Hyundai/Kia · Stock",
});

add("kb-financial-drop-3pct", "L1", "BANK", {
  badge: "KB금융", title: "KB금융이 3분기 역대 최대 순익 전망에도 시장 전체 급락에 눌려 3.19% 내렸습니다",
  heroIcon: "🏦", heroBig: "−3.19%",
  heroSub: "9월 15일 종가 기준 하락률입니다. 하나증권은 3분기 순이익을 2조600억 원(전년 대비 22%↑)으로 전망했습니다.",
  cards: [
    { icon:"🎯", big:"23만5,000원", mid:"목표주가", sub:"기존보다 6.8%↑ 유지" },
    { icon:"⭐", big:"최선호주", mid:"은행업종 내", sub:"의견 그대로 유지" },
    { icon:"📉", big:"시장 동반↓", mid:"코스피 −0.85%", sub:"금융주 전반 약세" },
  ],
  quote: "대출 성장과 일회성 비용 소멸이 역대 최대 순익 전망의 핵심 배경으로 다시 꼽혔습니다.",
  noteSub: "KB금융은 은행·증권·보험을 아우르는 종합 금융지주로, 좋은 개별 실적 전망도 이날은 시장 전체 하락 압력을 이기지 못했습니다. 10월 말 실제 3분기 실적이 전망치(2조600억 원)에 부합하는지 확인하면 됩니다.",
  footer: "KB금융 · 주가",
}, {
  badge: "KB FIN", title: "KB Financial fell 3.19% despite record Q3 profit forecasts, dragged down by a broad market selloff",
  heroIcon: "🏦", heroBig: "-3.19%",
  heroSub: "Sept 15 close. Hana Securities forecasts Q3 net profit at ₩2.06T, up 22% YoY.",
  cards: [
    { icon:"🎯", big:"₩235,000", mid:"Target price", sub:"Kept at +6.8% above prior" },
    { icon:"⭐", big:"Top pick", mid:"Among bank stocks", sub:"Rating unchanged" },
    { icon:"📉", big:"Market-wide drop", mid:"KOSPI -0.85%", sub:"Financials broadly weak" },
  ],
  quote: "Loan growth and the absence of one-off costs were again cited as the key drivers of the record profit forecast.",
  noteSub: "KB Financial spans banking, brokerage, and insurance, but even a good earnings outlook couldn't offset the market's broad decline. Next: check whether late-October Q3 results match the ₩2.06T forecast.",
  footer: "KB Financial · Stock",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.16 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$75,852", title:"클래리티법 부결 소식에 비트코인이 4% 넘게 급락했습니다",
      sub:"미 상원 절차표결이 찬성 49~50표로 60표에 못 미쳤습니다." },
    { color:"#38bdf8", fill:"#0a1a20", right:"−14.6%", title:"엑스알피(XRP)가 하루 만에 14.6% 급락해 1.27달러를 기록했습니다",
      sub:"주요 디지털자산 가운데 가장 큰 낙폭입니다." },
    { color:"#818cf8", fill:"#15162a", right:"$2,405", title:"이더리움도 5.22% 내려 2,405달러로 동반 하락했습니다",
      sub:"디지털자산 전체 시가총액이 3.69% 줄었습니다." },
    { color:"#facc15", fill:"#1a1600", right:"$4,293", title:"금값은 유가발 인플레 우려로 4,293달러까지 밀렸습니다",
      sub:"연준 금리인상 확률이 93~95%까지 반영됐습니다." },
    { color:"#f97316", fill:"#1a0d02", right:"$108.75", title:"국제유가는 사우디·리비아 공급차질로 4개월 만에 최고치입니다",
      sub:"브렌트유가 배럴당 108.75달러까지 올랐습니다." },
  ],
  caption: "더 볼 것: BTC $75,852 · XRP −14.6% · ETH $2,405 · 금 $4,293 · 유가 $108.75",
}, {
  headline: "2026.09.16 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$75,852", title:"Bitcoin fell more than 4% after the Senate blocked the Clarity Act",
      sub:"The procedural vote got only 49-50 yes votes, short of 60." },
    { color:"#38bdf8", fill:"#0a1a20", right:"-14.6%", title:"XRP plunged 14.6% in a day to $1.27",
      sub:"The steepest drop among major digital assets." },
    { color:"#818cf8", fill:"#15162a", right:"$2,405", title:"Ether also fell 5.22% to $2,405, tracking the broad decline",
      sub:"Total crypto market cap shrank 3.69%." },
    { color:"#facc15", fill:"#1a1600", right:"$4,293", title:"Gold slid to $4,293 on oil-driven inflation worries",
      sub:"Fed rate-hike odds climbed to 93-95%." },
    { color:"#f97316", fill:"#1a0d02", right:"$108.75", title:"Oil hit a four-month high on Saudi and Libyan supply disruptions",
      sub:"Brent crude climbed to $108.75 a barrel." },
  ],
  caption: "Watch: BTC $75,852 · XRP -14.6% · ETH $2,405 · gold $4,293 · oil $108.75",
});

add("clarity-act-vote-fail", "L6", "ETH", {
  badge: "BREAKING", breaking: "클래리티법 상원 부결",
  title: "미국 디지털자산 시장구조법인 클래리티법이 미 상원 절차표결에서 60표를 채우지 못해 부결됐습니다",
  heroBig: "찬성 49~50표",
  heroSub: "토론종결(클로처) 표결로, 본회의 심의에 필요한 60표에 10표 이상 못 미쳤습니다.",
  grid: [
    { icon:"🏛", big:"49~50 대 50", mid:"찬반 표결 결과", sub:"공화당 이탈표도 발생" },
    { icon:"📉", big:"BTC −4%", mid:"직후 급락", sub:"7만6,000달러 하회" },
    { icon:"💥", big:"6.7억 달러", mid:"24시간 청산 규모", sub:"코인파생 시장 전체" },
    { icon:"🔄", big:"영구폐기 아님", mid:"재표결 가능", sub:"양원 조정 절차 남음" },
  ],
  ctx1: "클래리티법은 SEC와 CFTC 간 가상자산 감독 권한을 명확히 나누는 것이 핵심 내용입니다.",
  ctx2: "신시아 러미스 상원의원은 이번 결과를 두고 사실상 이번 회기 처리가 끝났다고 말했습니다.",
  quote: "업계는 수년간 수억 달러를 투입해 이 법안 통과를 추진해왔지만 상원 첫 문턱조차 넘지 못했습니다.",
  noteSub: "이번 표결은 법안 자체에 대한 최종 부결이 아니라 본회의 심의 진입을 위한 절차 표결이 무산된 것입니다. 11월 중간선거 이후 회기가 끝나기 전에 재표결 여지가 남아 있지만 가능성은 낮게 평가됩니다. 다음 재표결 시도 여부와 SEC의 독자 규제 추진 상황을 확인하면 됩니다.",
  footer: "클래리티법 · 상원표결",
}, {
  badge: "BREAKING", breaking: "CLARITY ACT BLOCKED",
  title: "The US Senate failed to advance the Clarity Act, a crypto market-structure bill, falling short of the 60 votes needed",
  heroBig: "49-50 in favor",
  heroSub: "A cloture vote to begin floor debate fell more than 10 votes short of the 60-vote threshold.",
  grid: [
    { icon:"🏛", big:"49-50 vs 50", mid:"Vote tally", sub:"Some Republicans defected too" },
    { icon:"📉", big:"BTC -4%", mid:"Immediate drop", sub:"Fell below $76,000" },
    { icon:"💥", big:"$677M", mid:"24h liquidations", sub:"Across crypto derivatives" },
    { icon:"🔄", big:"Not dead yet", mid:"Revote possible", sub:"Reconciliation still pending" },
  ],
  ctx1: "The Clarity Act aims to clearly split crypto oversight between the SEC and CFTC.",
  ctx2: "Senator Cynthia Lummis said the outcome effectively ends this session's chances.",
  quote: "The industry spent years and hundreds of millions of dollars pushing for this bill, only to stall at the Senate's first hurdle.",
  noteSub: "This vote wasn't a final rejection of the bill itself, just a failed procedural step to begin floor debate. A revote remains possible before this Congress ends after the November midterms, though odds are seen as low. Next: watch for another vote attempt and how the SEC proceeds with its own rulemaking.",
  footer: "Clarity Act · Senate vote",
});

add("bitcoin-drop-clarity-fail", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 클래리티법 부결 여파로 4% 넘게 급락하며 7만6,000달러 밑으로 밀렸습니다",
  heroIcon: "₿", heroBig: "$75,852",
  heroSub: "9월 16일 오전(한국시간) 기준으로 24시간 전보다 4.37% 내렸습니다. 장중에는 3.28% 하락해 7만5,995달러까지 밀렸습니다.",
  cards: [
    { icon:"📊", big:"−4.37%", mid:"24시간 변동", sub:"부결 직후 급락" },
    { icon:"💰", big:"+2.73억", mid:"현물 ETF 순유입", sub:"저가매수 일부 유지" },
    { icon:"🏛", big:"연준 인상확률 93~95%", mid:"이번 주 FOMC", sub:"금리 부담도 겹침" },
  ],
  quote: "규제 명확성에 대한 기대가 이번 반등의 배경이었던 만큼, 부결 소식은 실망 매물로 곧장 이어졌습니다.",
  noteSub: "비트코인 현물 ETF에는 오히려 2억7,275만 달러가 순유입돼 일부 저가 매수 수요가 유지된 점도 함께 봐야 합니다. 7만4,000~7만5,000달러 구간이 지켜지는지가 다음 관찰 포인트입니다. 이번 주 FOMC 결과와 클래리티법 재표결 여부를 같이 확인하면 됩니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BTC", title: "Bitcoin fell more than 4% after the Clarity Act's Senate failure, dropping below $76,000",
  heroIcon: "₿", heroBig: "$75,852",
  heroSub: "As of Sept 16 morning KST, down 4.37% in 24 hours. It touched $75,995 intraday, down 3.28%.",
  cards: [
    { icon:"📊", big:"-4.37%", mid:"24h change", sub:"Dropped right after the vote" },
    { icon:"💰", big:"+$272.75M", mid:"Spot ETF inflow", sub:"Some bargain-buying held" },
    { icon:"🏛", big:"93-95% hike odds", mid:"This week's FOMC", sub:"Adding to rate pressure" },
  ],
  quote: "Hopes for regulatory clarity had fueled the recent rally, so the Senate failure triggered swift disappointment selling.",
  noteSub: "Spot Bitcoin ETFs still saw a $272.75M net inflow, showing some bargain-buying demand persisted. Next: watch whether the $74,000-75,000 range holds, and follow this week's FOMC result plus any Clarity Act revote.",
  footer: "Bitcoin · Price",
});

add("xrp-crash-15pct", "L5", "XRP", {
  badge: "엑스알피", title: "엑스알피(XRP)가 클래리티법 부결 충격으로 14.58% 급락하며 주요 디지털자산 중 가장 큰 낙폭을 기록했습니다",
  heroIcon: "✕", heroBig: "$1.27",
  heroSub: "9월 16일 오전(한국시간) 기준 24시간 하락률입니다. 표결 전에는 규제 명확성 기대로 2달러 돌파 기대감도 있었습니다.",
  before: { label:"표결 전 기대", big:"$2 돌파 기대", sub:"규제 명확성 랠리 기대" },
  after: { label:"표결 부결 후", big:"$1.27", sub:"14.58% 급락" },
  cards: [
    { icon:"💥", big:"3,115만 달러", mid:"롱 포지션 청산", sub:"24시간 기준" },
    { icon:"📉", big:"업계 최대 낙폭", mid:"주요 디지털자산 중", sub:"ZEC·도지 등도 동반 하락" },
    { icon:"⏳", big:"재표결 가능", mid:"영구폐기 아님", sub:"양원 조정 절차 남음" },
  ],
  quote: "엑스알피는 클래리티법 통과로 규제 명확성 수혜가 가장 크게 기대됐던 자산이라 실망 매물이 집중됐습니다.",
  noteSub: "이번 급락은 법안의 영구 폐기가 아니라 절차 표결 실패에 따른 것으로, 재표결이나 수정안 처리 여지는 남아 있습니다. 단기 레버리지 청산이 변동성을 키운 만큼 미결제약정 변화를 함께 살펴보면 됩니다. 다음 재표결 일정과 XRP 관련 후속 소송·규제 뉴스를 확인하면 됩니다.",
  footer: "엑스알피 · 시세",
}, {
  badge: "XRP", title: "XRP plunged 14.58% after the Clarity Act's failure, the steepest drop among major digital assets",
  heroIcon: "✕", heroBig: "$1.27",
  heroSub: "24h change as of Sept 16 morning KST. Ahead of the vote, some had hoped for a rally past $2 on regulatory clarity.",
  before: { label:"Pre-vote hope", big:"Rally toward $2", sub:"Bet on regulatory clarity" },
  after: { label:"After the failed vote", big:"$1.27", sub:"Down 14.58%" },
  cards: [
    { icon:"💥", big:"$31.15M", mid:"Long liquidations", sub:"Over 24 hours" },
    { icon:"📉", big:"Biggest drop", mid:"Among major assets", sub:"ZEC, Dogecoin also fell" },
    { icon:"⏳", big:"Revote possible", mid:"Not permanently dead", sub:"Reconciliation still pending" },
  ],
  quote: "XRP was seen as the asset with the most to gain from Clarity Act clarity, so disappointment selling concentrated there.",
  noteSub: "The crash stemmed from a failed procedural vote, not the bill's permanent death, so a revote or amended bill remains possible. Short-term leverage liquidations amplified the volatility, so watch open-interest changes too. Next: track the revote schedule and any follow-on XRP litigation or regulatory news.",
  footer: "XRP · Price",
});

add("oil-gold-diverge", "L2", "OIL", {
  badge: "원유·금", title: "사우디·리비아 공급 차질로 국제유가는 4개월 만에 최고치로 뛰었지만 금값은 오히려 내렸습니다",
  heroIcon: "🛢", heroBig: "$108.75 / $4,293",
  heroSub: "브렌트유는 9월 15일(현지시간) 108.75달러, 금 현물은 4,293달러로 마감했습니다.",
  cards: [
    { label:"브렌트유", big:"$108.75", mid:"+2.9%", sub:"5월 19일 이후 최고" },
    { label:"WTI", big:"$105.83", mid:"+4.38%", sub:"대체수요 기대 반영" },
    { label:"금 현물", big:"$4,293", mid:"−0.1%", sub:"인상 확률 부담" },
  ],
  detailHead: "왜 유가는 뛰고 금은 내렸나",
  detailLines: [
    "사우디 동서송유관 복구가 늦어지는 가운데 리비아 유전 가동도 멈췄습니다.",
    "유가 급등이 인플레이션 우려를 키워 연준 금리인상 전망을 강화했습니다.",
    "금리가 오르면 이자 없는 금의 상대적 매력이 떨어져 두 자산이 반대로 움직였습니다.",
  ],
  noteSub: "미 10년물 국채금리가 2007년 이후 최고 수준까지 오른 점도 금값을 눌렀습니다. ING는 매파적 연준 리스크가 이미 상당 부분 가격에 반영됐다고 평가했습니다. 사우디 송유관 복구 시점과 이번 주 FOMC 결과를 함께 확인하면 됩니다.",
  footer: "원유·금 · 국제시세",
}, {
  badge: "OIL/GOLD", title: "Oil hit a four-month high on Saudi and Libyan supply disruptions, while gold fell in the opposite direction",
  heroIcon: "🛢", heroBig: "$108.75 / $4,293",
  heroSub: "Brent settled at $108.75 and spot gold at $4,293 on Sept 15 (local time).",
  cards: [
    { label:"Brent", big:"$108.75", mid:"+2.9%", sub:"Highest since May 19" },
    { label:"WTI", big:"$105.83", mid:"+4.38%", sub:"On substitution-demand hopes" },
    { label:"Spot gold", big:"$4,293", mid:"-0.1%", sub:"Pressured by hike odds" },
  ],
  detailHead: "Why oil rose while gold fell",
  detailLines: [
    "Saudi's pipeline repair is delayed while Libyan oilfield output also stopped.",
    "Surging oil lifted inflation worries, reinforcing Fed rate-hike expectations.",
    "Higher rates reduce the relative appeal of non-yielding gold, pulling the two assets apart.",
  ],
  noteSub: "The US 10-year Treasury yield's climb to its highest since 2007 also weighed on gold. ING said much of the hawkish Fed risk is already priced in. Next: watch the Saudi pipeline repair timeline and this week's FOMC decision.",
  footer: "Oil/Gold · Prices",
});

add("summary-krre", "ROWS", "TOHEO", {
  headline: "2026.09.16 한국부동산 한장 요약",
  rows: [
    { color:"#a78bfa", fill:"#180f28", right:"291곳 해제", title:"잠실·삼성·대치·청담 아파트 291곳이 토지거래허가구역에서 풀렸습니다",
      sub:"재건축 추진 14곳만 투기 우려로 지정이 유지됩니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"2조1,690억", title:"서울 재건축 46곳에 재초환 부담금 2조1,690억 원이 예고됐습니다",
      sub:"조합원 1인당 최대 6억8,000만 원에 달합니다." },
    { color:"#38bdf8", fill:"#061520", right:"−66.1%", title:"서울 아파트 토지거래허가 신청이 4월 정점 대비 66.1% 줄었습니다",
      sub:"8월 신규 신청은 3,012건으로 4개월 연속 감소했습니다." },
    { color:"#22c55e", fill:"#06210f", right:"1년 연장", title:"여당이 토허구역 실거주 유예를 내년까지 1년 더 연장하자고 제안했습니다",
      sub:"세입자 있는 주택 매수자의 퇴로를 열어주는 방안입니다." },
  ],
  caption: "더 볼 것: 토허 291곳 해제 · 재초환 2조1,690억 · 신청 −66.1% · 실거주유예 1년연장",
}, {
  headline: "2026.09.16 Korea Real Estate Snapshot",
  rows: [
    { color:"#a78bfa", fill:"#180f28", right:"291 freed", title:"291 apartment complexes in Jamsil, Samsung-dong, Daechi and Cheongdam were freed from permit zones",
      sub:"Only 14 reconstruction-bound complexes keep the designation." },
    { color:"#ef4444", fill:"#1a0a0a", right:"₩2.17T", title:"46 Seoul reconstruction sites face a combined ₩2.17T excess-profit levy",
      sub:"Up to ₩680M per member at the largest site." },
    { color:"#38bdf8", fill:"#061520", right:"-66.1%", title:"Seoul land-permit applications fell 66.1% from April's peak",
      sub:"August's 3,012 new filings marked a 4th straight monthly drop." },
    { color:"#22c55e", fill:"#06210f", right:"+1 year", title:"The ruling party proposed extending the occupancy-exemption grace period by a year",
      sub:"Aimed at buyers of units with existing tenants." },
  ],
  caption: "Watch: 291 zones freed · levy ₩2.17T · applications -66.1% · exemption extended 1yr",
});

add("toheo-zone-partial-release", "L6", "POLICY", {
  badge: "BREAKING", breaking: "토허구역 291곳 해제",
  title: "정부가 잠실·삼성·대치·청담 아파트 291곳의 토지거래허가구역 지정을 해제했습니다",
  heroBig: "291곳 해제",
  heroSub: "국제교류복합지구 인근 4개동 아파트 305곳 가운데 재건축 14곳만 지정을 유지합니다.",
  grid: [
    { icon:"✅", big:"291곳", mid:"즉시 해제", sub:"실거주 의무 없이 매수 가능" },
    { icon:"🏗", big:"14곳 유지", mid:"안전진단 통과 재건축", sub:"투기 우려로 지정 유지" },
    { icon:"🔓", big:"6곳 추가해제", mid:"신속통합기획", sub:"조합설립인가 받은 곳" },
    { icon:"📅", big:"2027년까지", mid:"순차 해제 계획", sub:"조합설립인가 기준" },
  ],
  ctx1: "관리처분계획인가 이후 등 투기 가능성이 낮아진 단지부터 순차적으로 해제한다는 방침입니다.",
  ctx2: "압구정·여의도·목동·성수 등 주요 재건축·재개발구역은 이번에도 지정이 유지됩니다.",
  quote: "정비업계는 조합설립인가 이후 사업이 안정적 단계에 접어든 곳부터 우선 해제하는 방식이라고 설명했습니다.",
  noteSub: "토지거래허가구역에서 풀리면 실거주 의무 없이 매수할 수 있어 갭투자 등 수요가 다시 유입될 가능성이 있습니다. 다만 재건축 추진이 구체화된 14곳은 투기 과열 우려로 여전히 규제가 유지됩니다. 해제 이후 실제 거래량과 가격 변화가 나타나는지 확인하면 됩니다.",
  footer: "토허구역 · 해제",
}, {
  badge: "BREAKING", breaking: "291 ZONES FREED",
  title: "The government lifted land-permit zone status for 291 apartment complexes in Jamsil, Samsung-dong, Daechi and Cheongdam",
  heroBig: "291 zones",
  heroSub: "Of 305 complexes near the international exchange complex, only 14 reconstruction-bound ones keep the designation.",
  grid: [
    { icon:"✅", big:"291 zones", mid:"Freed immediately", sub:"No occupancy requirement to buy" },
    { icon:"🏗", big:"14 kept", mid:"Safety-cleared reconstructions", sub:"Kept over speculation concerns" },
    { icon:"🔓", big:"6 more freed", mid:"Fast-track redevelopment", sub:"Sites with formed associations" },
    { icon:"📅", big:"Through 2027", mid:"Phased release plan", sub:"Based on association approval" },
  ],
  ctx1: "The plan is to phase out designations once sites pass the point where speculation risk is low.",
  ctx2: "Major zones like Apgujeong, Yeouido, Mokdong, and Seongsu still keep their designation this time.",
  quote: "Industry watchers said sites move to release once their redevelopment associations reach a stable stage.",
  noteSub: "Freed zones let buyers purchase without an occupancy requirement, which could draw back gap-investment demand. But the 14 reconstruction-bound sites keep tighter rules over speculation fears. Next: watch whether trading volume and prices actually shift in the freed zones.",
  footer: "Permit Zones · Release",
});

add("reconstruction-levy-46-complexes", "L3", "RATES", {
  badge: "재초환", title: "서울 재건축 46곳에 재건축초과이익환수 부담금 2조1,690억 원이 예고돼 조합원 반발이 커지고 있습니다",
  heroIcon: "💸", heroBig: "2조1,690억 원",
  heroSub: "재초환 부과가 예상되는 서울 46개 단지의 예상 부담금 합계입니다.",
  cards: [
    { icon:"🏠", big:"3억2,000만", mid:"래미안 트리니원", sub:"조합원 1인당 예상액" },
    { icon:"🏙", big:"6억8,000만", mid:"용산 한강맨션", sub:"최고 수준 예상액" },
    { icon:"⚖️", big:"행정소송 예고", mid:"조합원 반발", sub:"실거래가지수 적용 이의" },
  ],
  quote: "정비업계는 부담금 산정에 한국부동산원 실거래가격지수를 적용한 것에 대해 이의를 제기하고 있습니다.",
  noteSub: "재초환 부담금은 재건축으로 얻는 초과 이익 일부를 국가가 환수하는 제도로, 조합원의 실제 수익성에 직접 영향을 줍니다. 부담금이 현실화되면 일부 단지의 정비사업 추진 속도가 늦어지거나 공급이 위축될 수 있다는 우려가 나옵니다. 행정소송 결과와 최종 부담금 확정 시점을 확인하면 됩니다.",
  footer: "재초환 · 부담금",
}, {
  badge: "RECON. LEVY", title: "46 Seoul reconstruction sites face a combined ₩2.17T excess-profit levy, sparking member pushback",
  heroIcon: "💸", heroBig: "₩2.17T",
  heroSub: "The combined estimated levy across 46 Seoul complexes expected to face the charge.",
  cards: [
    { icon:"🏠", big:"₩320M", mid:"Raemian Trinione", sub:"Estimated per-member charge" },
    { icon:"🏙", big:"₩680M", mid:"Yongsan Hangang Mansion", sub:"The highest estimate" },
    { icon:"⚖️", big:"Lawsuits looming", mid:"Member pushback", sub:"Disputing the price index used" },
  ],
  quote: "Industry groups are disputing the government's use of a national price index to calculate the levy.",
  noteSub: "The reconstruction levy claws back part of the profit gained from redevelopment, directly affecting members' returns. If the charges are finalized, some projects could slow or supply could tighten. Next: watch the lawsuit outcomes and when the final levy amounts are confirmed.",
  footer: "Recon. Levy · Policy",
});

add("toheo-occupancy-exemption-extend", "L1", "POLICY", {
  badge: "실거주유예", title: "여당이 토지거래허가구역 내 실거주 의무 유예를 내년까지 1년 더 연장하자고 제안했습니다",
  heroIcon: "🏘", heroBig: "1년 연장 제안",
  heroSub: "현재 유예 신청 기한은 올해 말까지로, 민주당은 내년까지 연장하고 계약갱신도 허용하자고 밝혔습니다.",
  cards: [
    { icon:"⏳", big:"올해 말 마감", mid:"현재 신청기한", sub:"연장 없으면 내년 거래 경색" },
    { icon:"🔑", big:"세입자 보유주택", mid:"매수자 대상", sub:"무주택자 한정 유예" },
    { icon:"📜", big:"계약갱신 허용", mid:"추가 제안 내용", sub:"세입자 주거안정 목적" },
  ],
  quote: "권칠승 정책위의장은 세제개편안 통과 여부를 지켜본 뒤 집을 팔려는 사람들의 퇴로가 막혀선 안 된다고 말했습니다.",
  noteSub: "세입자가 있는 주택은 매수자가 임대차 종료 전까지 입주할 수 없어, 유예 없이는 거래 자체가 어려워집니다. 이번 제안이 실제 법제화로 이어지면 내년 초 주택 거래 시장에 직접적인 영향을 줄 수 있습니다. 정부의 최종 수용 여부와 국회 처리 일정을 확인하면 됩니다.",
  footer: "실거주유예 · 정책",
}, {
  badge: "OCCUPANCY GRACE", title: "The ruling party proposed extending the occupancy-exemption grace period for permit-zone buyers by another year",
  heroIcon: "🏘", heroBig: "+1 year proposed",
  heroSub: "The current exemption application deadline is this year-end; the party wants it extended, plus lease-renewal allowed.",
  cards: [
    { icon:"⏳", big:"Ends this year", mid:"Current deadline", sub:"Without extension, deals could freeze" },
    { icon:"🔑", big:"Tenant-occupied homes", mid:"For eligible buyers", sub:"Exemption limited to non-owners" },
    { icon:"📜", big:"Renewal allowed", mid:"Additional proposal", sub:"Aimed at tenant stability" },
  ],
  quote: "A ruling-party official said sellers shouldn't be trapped once the tax reform bill's fate becomes clear.",
  noteSub: "Buyers of tenant-occupied homes can't move in until the lease ends, so without an exemption, deals become nearly impossible. If this proposal becomes law, it could directly affect early-2027 housing transactions. Next: watch whether the government adopts it and how quickly the Assembly acts.",
  footer: "Occupancy Grace · Policy",
});

};
