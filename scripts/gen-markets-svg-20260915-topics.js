/* KR / Safe / KR-RE topics for 2026-09-15 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.15 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,684", title:"코스피가 유가·금리 충격에 3.26% 급락했습니다",
      sub:"외국인 3조2,875억 원·기관 1조1,715억 원어치를 순매도했습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"−4.05%", title:"삼성전자가 4.05% 내린 24만9,000원으로 마감했습니다",
      sub:"외국인 순매도 2위(8,482억 원)에 올랐습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"−6.35%", title:"SK하이닉스가 외국인 순매도 1위로 6.35% 급락했습니다",
      sub:"외국인이 2조652억 원어치를 순매도했습니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"108달러", title:"사우디 송유관 중단으로 국제유가가 108달러까지 치솟았습니다",
      sub:"미 10년물 금리도 장중 4.99%까지 올랐습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"−2.88%", title:"현대차가 트럼프의 중국차 발언 겹쳐 2.88% 내렸습니다",
      sub:"6월 고점 대비로는 50.47% 급락한 상태입니다." },
    { color:"#34d399", fill:"#08251c", right:"2조600억", title:"KB금융은 3분기 역대 최대 순익 전망에도 소폭 하락했습니다",
      sub:"하나증권이 목표주가를 23만5,000원으로 높였습니다." },
  ],
  caption: "더 볼 것: 코스피 6,684 · 삼성전자 −4.05% · 하이닉스 −6.35% · 유가 108달러 · 현대차 −2.88% · KB금융 2조600억",
}, {
  headline: "2026.09.15 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,684", title:"KOSPI fell 3.26% to 6,684.37 on an oil-and-rate shock",
      sub:"Foreigners sold ₩3.29T; institutions sold ₩1.17T." },
    { color:"#60a5fa", fill:"#0a1420", right:"-4.05%", title:"Samsung Electronics dropped 4.05% to 249,000 won",
      sub:"Foreigners' second-most-sold stock, at ₩848.2B." },
    { color:"#f59e0b", fill:"#1a1205", right:"-6.35%", title:"SK Hynix plunged 6.35%, the most foreign-sold stock",
      sub:"Foreigners net-sold ₩2.07 trillion of shares." },
    { color:"#ef4444", fill:"#1a0a0a", right:"$108", title:"Oil surged to $108 after a Saudi pipeline shutdown",
      sub:"The 10-year Treasury yield touched 4.99% intraday." },
    { color:"#fb7185", fill:"#1a0a10", right:"-2.88%", title:"Hyundai fell 2.88% on Trump's China-EV comments",
      sub:"It's now down 50.47% from its June peak." },
    { color:"#34d399", fill:"#08251c", right:"₩2.06T", title:"KB Financial dipped despite record Q3 profit forecasts",
      sub:"Hana Securities raised its target to ₩235,000." },
  ],
  caption: "Watch: KOSPI 6,684 · Samsung -4.05% · Hynix -6.35% · oil $108 · Hyundai -2.88% · KB Financial ₩2.06T",
});

add("samsung-drop-foreign-selling", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자가 중동 리스크와 AI 속도조절론이 겹치며 4.05% 내린 24만9,000원으로 마감했습니다",
  heroIcon: "📉", heroBig: "24만9,000원",
  heroSub: "9월 14일 종가로 전 거래일보다 4.05% 내렸습니다. 외국인이 8,482억 원, 기관이 4,451억 원을 순매도했습니다.",
  cards: [
    { icon:"📊", big:"−4.05%", mid:"9/14 종가", sub:"장중 −1.93%까지 회복 후 재하락" },
    { icon:"🌍", big:"유가·금리", mid:"매크로 부담", sub:"중동 리스크·국채 4.99%" },
    { icon:"🤖", big:"속도조절론", mid:"AI 투자 우려", sub:"아모데이발 반도체 수요 우려" },
  ],
  quote: "KB증권 등은 이번 하락이 개별 악재가 아니라 시장 전반의 매크로 부담이 겹친 결과라고 짚었습니다.",
  noteSub: "삼성전자는 파운드리와 메모리를 함께 하는 종합 반도체 회사로, HBM 점유율도 꾸준히 오르고 있습니다. 하루짜리 급락은 매크로 변수에 의한 것으로 회사의 근본 경쟁력과는 별개인 경우가 많습니다. 9월 16일 FOMC 결과와 사우디 송유관 복구 상황을 확인하면 됩니다.",
  footer: "삼성전자 · 주가",
}, {
  badge: "SMSN", title: "Samsung Electronics fell 4.05% to 249,000 won as Middle East risk and AI-pacing worries weighed on chips",
  heroIcon: "📉", heroBig: "₩249,000",
  heroSub: "Sept 14 close, down 4.05%. Foreigners net-sold ₩848.2B; institutions sold ₩445.1B.",
  cards: [
    { icon:"📊", big:"-4.05%", mid:"Sept 14 close", sub:"Recovered to -1.93% intraday, then fell" },
    { icon:"🌍", big:"Oil & rates", mid:"Macro pressure", sub:"Mideast risk, 10-yr at 4.99%" },
    { icon:"🤖", big:"AI pacing", mid:"Capex worries", sub:"Sparked by Amodei's comments" },
  ],
  quote: "Analysts noted this drop reflects broad macro pressure, not a Samsung-specific setback.",
  noteSub: "Samsung runs both foundry and memory chips, and its HBM share keeps climbing. One-day drops like this often reflect macro variables, not the firm's underlying competitiveness. Next: watch the Sept 16 FOMC outcome and the Saudi pipeline repair timeline.",
  footer: "Samsung · Stock",
});

add("sk-hynix-drop-worst-foreign-selling", "L5", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 외국인 순매도 1위에 오르며 6.35% 급락한 169만7,000원으로 마감했습니다",
  heroIcon: "📉", heroBig: "169만7,000원",
  heroSub: "9월 14일 종가로 6.35% 내렸습니다. 외국인 2조652억 원 순매도로 코스피 전체 1위 규모입니다.",
  before: { label:"코스피 전체", big:"−3.26%", sub:"같은 날 지수 하락률" },
  after: { label:"SK하이닉스", big:"−6.35%", sub:"지수보다 두 배 가까이 하락" },
  cards: [
    { icon:"💸", big:"2조652억", mid:"외국인 순매도", sub:"코스피 전체 1위" },
    { icon:"🇺🇸", big:"ADR +0.94%", mid:"미국 상장분", sub:"국내와 반응 엇갈림" },
    { icon:"🥇", big:"HBM 50%", mid:"여전한 1위", sub:"실적 훼손 아닌 수급 이슈" },
  ],
  quote: "최근 크게 오른 만큼 되돌림도 큰 고베타 종목의 전형적 특징을 보였다는 평가가 나옵니다.",
  noteSub: "SK하이닉스는 HBM 시장 점유율 50%로 1위를 지키고 있어, 인공지능 서버 수요가 이어지는 한 장기 경쟁력은 유지됩니다. 외국인 매도세가 다음 거래일에도 이어지는지, FOMC 결과와 HBM4 출하 계획을 함께 확인하면 됩니다.",
  footer: "SK하이닉스 · 주가",
}, {
  badge: "HYNIX", title: "SK Hynix plunged 6.35% to 1,697,000 won, topping foreign investors' most-sold list",
  heroIcon: "📉", heroBig: "₩1,697,000",
  heroSub: "Sept 14 close, down 6.35%. Foreigners net-sold ₩2.07T, the largest single-stock outflow of the day.",
  before: { label:"KOSPI overall", big:"-3.26%", sub:"Same-day index decline" },
  after: { label:"SK Hynix", big:"-6.35%", sub:"Nearly double the index drop" },
  cards: [
    { icon:"💸", big:"₩2.07T", mid:"Foreign net-selling", sub:"Largest across KOSPI" },
    { icon:"🇺🇸", big:"ADR +0.94%", mid:"US-listed shares", sub:"Diverged from local trading" },
    { icon:"🥇", big:"HBM 50%", mid:"Still No.1", sub:"A flow issue, not earnings" },
  ],
  quote: "Analysts called it a classic high-beta pullback after a sharp prior rally.",
  noteSub: "SK Hynix still leads the HBM market with a 50% share, so its long-term competitiveness holds as long as AI server demand continues. Next: watch whether foreign selling persists and check the FOMC outcome plus HBM4 shipment plans.",
  footer: "SK Hynix · Stock",
});

add("kospi-macro-oil-rate-shock", "L2", "KOSPI", {
  badge: "코스피", title: "사우디 송유관 중단과 미국 금리인상 경계감이 겹치며 코스피가 6,684.37까지 밀렸습니다",
  heroIcon: "📊", heroBig: "6,684.37",
  heroSub: "9월 14일 종가로 전 거래일보다 3.26% 내렸습니다. 장중 한때 6,654.82까지 밀렸습니다.",
  cards: [
    { label:"유가", big:"108달러", mid:"브렌트유", sub:"사우디 송유관 중단" },
    { label:"미 국채", big:"4.99%", mid:"10년물 금리", sub:"장중 5% 근접" },
    { label:"FOMC", big:"87~93%", mid:"인상 확률", sub:"9월 16일 결과 발표" },
  ],
  detailHead: "코스피를 흔든 세 가지 부담",
  detailLines: [
    "이라크발 드론 공격으로 사우디 동서송유관이 지난 11일부터 멈췄습니다.",
    "미국 8월 CPI·PPI가 예상보다 높게 나와 금리인상 우려가 커졌습니다.",
    "AI 선도기업 CEO들의 '속도조절론'이 반도체 수요 우려로 이어졌습니다.",
  ],
  noteSub: "외국인이 3조2,875억 원, 기관이 1조1,715억 원을 순매도했고 개인이 2조9,722억 원을 순매수하며 방어했지만 낙폭을 다 막지는 못했습니다. 9월 16일 FOMC 결과와 사우디 송유관 복구 상황을 함께 확인하면 됩니다.",
  footer: "코스피 · 매크로 충격",
}, {
  badge: "KOSPI", title: "KOSPI slid to 6,684.37 as a Saudi pipeline shutdown and Fed rate-hike fears rattled markets",
  heroIcon: "📊", heroBig: "6,684.37",
  heroSub: "Sept 14 close, down 3.26%. It touched 6,654.82 intraday.",
  cards: [
    { label:"Oil", big:"$108", mid:"Brent crude", sub:"Saudi pipeline outage" },
    { label:"US Treasury", big:"4.99%", mid:"10-year yield", sub:"Near 5% intraday" },
    { label:"FOMC", big:"87-93%", mid:"Hike odds", sub:"Result due Sept 16" },
  ],
  detailHead: "Three pressures rattling KOSPI",
  detailLines: [
    "A drone strike from Iraq halted Saudi's East-West pipeline on Sept 11.",
    "Hotter US August CPI and PPI data raised rate-hike expectations.",
    "AI CEOs' 'pacing' comments stoked fears of slower chip demand.",
  ],
  noteSub: "Foreigners sold ₩3.29T and institutions ₩1.17T, while retail buyers absorbed ₩2.97T without fully offsetting the drop. Next: watch the Sept 16 FOMC result and the Saudi pipeline repair progress.",
  footer: "KOSPI · Macro shock",
});

add("hyundai-oil-shock-china-ev", "L6", "AUTO", {
  badge: "BREAKING", breaking: "현대차 반토막 경고",
  title: "현대차가 유가 급등과 트럼프의 중국차 미국생산 허용 시사 발언이 겹치며 2.88% 내렸습니다",
  heroBig: "37만1,500원",
  heroSub: "9월 14일 종가로 6월 고점 대비 50.47% 급락한 수준입니다.",
  grid: [
    { icon:"📉", big:"−2.88%", mid:"9/14 종가", sub:"6월 고점 대비 −50.47%" },
    { icon:"🇺🇸", big:"중국차 시사", mid:"미국생산 허용", sub:"24일 미중 정상회담 앞" },
    { icon:"🛢", big:"유가 급등", mid:"수요 위축 우려", sub:"108달러 근접" },
    { icon:"🏭", big:"기아 −1.9%", mid:"부품사도 동반", sub:"모비스·오토에버 하락" },
  ],
  ctx1: "트럼프 대통령은 중국이 미국서 공장 열고 차를 만들면 그래도 된다고 말했습니다.",
  ctx2: "중국차는 현재 127% 관세로 미국 판매가 사실상 막혀 있는 상태입니다.",
  quote: "다올투자증권은 미국·유럽 생산 조정이 이어져 사업계획 달성이 쉽지 않다고 짚었습니다.",
  noteSub: "현대차·기아는 조지아 공장 등 현지 생산 기반을 이미 갖추고 있어 관세 리스크 대응력이 있습니다. 아직 구체적 정책은 아닌 인터뷰 발언 수준입니다. 24일 미중 정상회담과 다음 실적에서 미국 판매량을 확인하면 됩니다.",
  footer: "현대차 · 주가",
}, {
  badge: "BREAKING", breaking: "HYUNDAI DOWN 50%",
  title: "Hyundai fell 2.88% as surging oil prices met Trump's comments on China-EV production in the US",
  heroBig: "₩371,500",
  heroSub: "Sept 14 close, now down 50.47% from its June peak.",
  grid: [
    { icon:"📉", big:"-2.88%", mid:"Sept 14 close", sub:"-50.47% from June peak" },
    { icon:"🇺🇸", big:"China EVs?", mid:"US production hint", sub:"Ahead of Sept 24 summit" },
    { icon:"🛢", big:"Oil spike", mid:"Demand worries", sub:"Nearing $108/barrel" },
    { icon:"🏭", big:"Kia -1.9%", mid:"Suppliers followed", sub:"Mobis, AutoEver also fell" },
  ],
  ctx1: "Trump said China could build factories and make cars in the US.",
  ctx2: "A 127% tariff currently blocks most Chinese cars from US sales.",
  quote: "Daol Securities said ongoing US/Europe output cuts make this year's plan hard to hit.",
  noteSub: "Hyundai and Kia already have US plants like Georgia, giving them tariff-risk resilience. Trump's comment isn't yet formal policy. Next: watch the Sept 24 US-China summit and US sales in the next earnings report.",
  footer: "Hyundai · Stock",
});

add("kb-financial-record-profit-target-up", "L3", "BANK", {
  badge: "KB금융", title: "KB금융이 3분기 역대 최대 순익 전망에도 시장 전체 하락에 눌려 소폭 내렸습니다",
  heroIcon: "🏦", heroBig: "2조600억 원",
  heroSub: "하나증권이 전망한 3분기 지배주주 순이익으로, 전년 대비 22% 늘어난 역대 최대 규모입니다.",
  cards: [
    { icon:"🎯", big:"23만5,000원", mid:"목표주가 상향", sub:"기존 22만 원에서 6.8%↑" },
    { icon:"⭐", big:"최선호주", mid:"은행업종 내", sub:"의견 그대로 유지" },
    { icon:"📉", big:"−1.46%", mid:"장중 하락", sub:"코스피 전체 급락 영향" },
  ],
  quote: "대출 성장과 일회성 비용 소멸이 역대 최대 순익 전망의 핵심 배경으로 꼽혔습니다.",
  noteSub: "KB금융은 은행·증권·보험을 아우르는 종합 금융지주로, 좋은 개별 소식도 이날은 시장 전체 하락 압력을 이기지 못했습니다. 10월 말 실제 3분기 실적이 전망치(2조600억 원)에 부합하는지 확인하면 됩니다.",
  footer: "KB금융 · 실적전망",
}, {
  badge: "KB FIN", title: "Hana Securities raised KB Financial's target price on record Q3 profit hopes, even as the market fell",
  heroIcon: "🏦", heroBig: "₩2.06 trillion",
  heroSub: "Hana's Q3 net profit estimate for KB Financial, up 22% YoY and a record high.",
  cards: [
    { icon:"🎯", big:"₩235,000", mid:"Target raised", sub:"Up 6.8% from ₩220,000" },
    { icon:"⭐", big:"Top pick", mid:"Among bank stocks", sub:"Rating kept unchanged" },
    { icon:"📉", big:"-1.46%", mid:"Intraday move", sub:"Dragged by broad selloff" },
  ],
  quote: "Loan growth and the absence of one-off costs drove the record profit forecast.",
  noteSub: "KB Financial spans banking, brokerage, and insurance, but even good news couldn't offset the market's broad decline that day. Next: check whether late-October Q3 results match the ₩2.06T forecast.",
  footer: "KB Financial · Earnings",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.15 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$79K", title:"비트코인이 주말 급락 후 7만9,000달러대로 반등했습니다",
      sub:"7만6,464달러 저점에서 전일 대비 2.72% 올랐습니다." },
    { color:"#facc15", fill:"#1a1600", right:"$4,278", title:"금값이 한 달여 만에 최저치인 4,278~4,298달러로 내렸습니다",
      sub:"금리인상 기대와 유가 급등이 겹쳐 부담을 줬습니다." },
    { color:"#818cf8", fill:"#15162a", right:"$2,513", title:"이더리움이 클래리티법 표결을 앞두고 2,513달러에 머물렀습니다",
      sub:"ETF에는 자금이 꾸준히 유입되는 중입니다." },
    { color:"#f97316", fill:"#1a0d02", right:"$108", title:"국제유가가 사우디 송유관 중단으로 108달러까지 올랐습니다",
      sub:"올해 들어서만 누적 77% 폭등한 상태입니다." },
    { color:"#94a3b8", fill:"#111827", right:"92.7%", title:"미국 FOMC의 0.25%포인트 인상 확률이 92.7%로 높아졌습니다",
      sub:"일주일 전 59.4%에서 크게 뛰어올랐습니다." },
  ],
  caption: "더 볼 것: BTC $79K · 금 $4,278 · ETH $2,513 · 유가 $108 · FOMC 인상확률 92.7%",
}, {
  headline: "2026.09.15 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$79K", title:"Bitcoin rebounded to the $79K range after a weekend slump",
      sub:"Up 2.72% from a low of $76,464." },
    { color:"#facc15", fill:"#1a1600", right:"$4,278", title:"Gold fell to a one-month low near $4,278-4,298/oz",
      sub:"Rate-hike bets and surging oil pressured the metal." },
    { color:"#818cf8", fill:"#15162a", right:"$2,513", title:"Ether held near $2,513 ahead of the Clarity Act vote",
      sub:"Steady inflows continued into Ether ETFs." },
    { color:"#f97316", fill:"#1a0d02", right:"$108", title:"Oil climbed to $108 after the Saudi pipeline shutdown",
      sub:"Crude is up 77% year-to-date." },
    { color:"#94a3b8", fill:"#111827", right:"92.7%", title:"Fed hike odds for a 25bp move jumped to 92.7%",
      sub:"Up sharply from 59.4% just a week earlier." },
  ],
  caption: "Watch: BTC $79K · gold $4,278 · ETH $2,513 · oil $108 · Fed hike odds 92.7%",
});

add("bitcoin-rebound-79k-fed-hike-bets", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 주말 급락 후 7만9,000달러대로 반등했지만 금리인상 경계감이 상승을 제한합니다",
  heroIcon: "₿", heroBig: "7만9,399달러",
  heroSub: "9월 15일 미국 장중 기준으로 전일 대비 2.72% 올랐습니다. 주말 저점은 7만6,464달러였습니다.",
  cards: [
    { icon:"📊", big:"+2.72%", mid:"전일 대비", sub:"탐욕·공포지수 70" },
    { icon:"🏛", big:"92.7%", mid:"FOMC 인상 확률", sub:"일주일 전 59.4%" },
    { icon:"💸", big:"−4.63억", mid:"ETF 순유출", sub:"최근 며칠 누적" },
  ],
  quote: "미국 워싱턴발 정치 신호와 규제 완화 기대가 이번 반등에 영향을 준 것으로 풀이됩니다.",
  noteSub: "금리가 오르면 이자 없는 자산인 비트코인의 매력이 상대적으로 떨어지는 경향이 있습니다. 반면 이더리움 ETF에는 최근 자금이 꾸준히 유입돼 대조를 이뤘습니다. 9월 16일 FOMC 결과와 클래리티법 표결을 함께 확인하면 됩니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BTC", title: "Bitcoin rebounded to $79,399 after a weekend low, though Fed rate-hike odds are capping the gains",
  heroIcon: "₿", heroBig: "$79,399",
  heroSub: "Up 2.72% intraday on Sept 15. The weekend low was $76,464.",
  cards: [
    { icon:"📊", big:"+2.72%", mid:"Daily change", sub:"Greed/Fear index at 70" },
    { icon:"🏛", big:"92.7%", mid:"FOMC hike odds", sub:"Up from 59.4% a week ago" },
    { icon:"💸", big:"-$463M", mid:"ETF outflows", sub:"Over the past few days" },
  ],
  quote: "Political signals from Washington and regulatory optimism helped drive the rebound.",
  noteSub: "Higher rates tend to reduce the appeal of a no-yield asset like Bitcoin. Ether ETFs, by contrast, saw steady inflows over the same span. Next: watch the Sept 16 FOMC result and the Clarity Act vote.",
  footer: "Bitcoin · Price",
});

add("gold-1month-low-rate-hike-oil", "L5", "GOLD", {
  badge: "금", title: "금값이 미국 금리인상 기대와 유가 급등이 겹치며 한 달여 만에 최저치로 내려앉았습니다",
  heroIcon: "🥇", heroBig: "$4,278~4,298",
  heroSub: "9월 15일 온스당 시세로, 8월 7일 이후 최저 수준입니다. 전일 대비 1.14~1.8% 내렸습니다.",
  before: { label:"직전 구간", big:"$4,350+", sub:"8월 초 수준" },
  after: { label:"현재", big:"$4,278~4,298", sub:"한 달여 만의 최저" },
  cards: [
    { icon:"📈", big:"92.7%", mid:"FOMC 인상 확률", sub:"기회비용 확대" },
    { icon:"🛢", big:"$108", mid:"유가 급등", sub:"인플레 우려 가중" },
    { icon:"🏦", big:"+62%", mid:"중앙은행 순매수", sub:"2분기 전년 대비" },
  ],
  quote: "유가 급등이 인플레 기대를 높여 각국 중앙은행의 긴축 필요성을 키운다는 분석입니다.",
  noteSub: "미 10년물 금리가 4.97~4.99%까지 오르며 금 보유의 기회비용을 높였습니다. 다만 세계금협회는 중앙은행의 금 순매수가 2분기에 62% 늘었다고 밝혀 장기 수요 기반은 여전히 견고합니다. 9월 16일 FOMC 결과를 확인하면 됩니다.",
  footer: "금 · 시세",
}, {
  badge: "GOLD", title: "Gold fell to a one-month low as Fed rate-hike bets and surging oil prices weighed on the metal",
  heroIcon: "🥇", heroBig: "$4,278-4,298",
  heroSub: "Sept 15 spot price, the lowest since Aug 7. Down 1.14-1.8% from the prior day.",
  before: { label:"Prior range", big:"$4,350+", sub:"Early-August level" },
  after: { label:"Now", big:"$4,278-4,298", sub:"A one-month low" },
  cards: [
    { icon:"📈", big:"92.7%", mid:"FOMC hike odds", sub:"Raises opportunity cost" },
    { icon:"🛢", big:"$108", mid:"Oil spike", sub:"Adding inflation worry" },
    { icon:"🏦", big:"+62%", mid:"Central-bank buying", sub:"Q2 YoY increase" },
  ],
  quote: "Surging oil is lifting inflation expectations, adding pressure for central banks to tighten.",
  noteSub: "The 10-year Treasury yield near 4.97-4.99% raises the cost of holding non-yielding gold. Still, the World Gold Council says central-bank buying rose 62% YoY in Q2, keeping long-term demand solid. Next: watch the Sept 16 FOMC decision.",
  footer: "Gold · Price",
});

add("ethereum-clarity-act-vote-fed", "L4", "ETH", {
  badge: "이더리움", badgeLine: "\"클래리티법 표결과 FOMC를 동시에 기다립니다\"",
  title: "이더리움이 미국 상원의 클래리티법 표결과 FOMC를 앞두고 2,513달러 부근에서 관망세를 보입니다",
  heroIcon: "Ξ", heroBig: "$2,513",
  heroSub: "9월 15일 시세로 24시간 거래 범위는 2,462~2,526달러였습니다. 저항선은 2,542~2,550달러입니다.",
  cards: [
    { icon:"🏛", big:"상원 표결", mid:"클래리티법", sub:"9/15 절차적 표결" },
    { icon:"🏦", big:"FOMC", mid:"9/16 결과", sub:"인상확률 79.5~90%" },
    { icon:"💰", big:"+2.16억", mid:"ETF 순유입", sub:"BTC와 대조적 흐름" },
  ],
  quote: "규제 명확성이 확보되면 기관 자금이 더 안심하고 이더리움 서비스에 투자할 수 있습니다.",
  noteSub: "이더리움은 디파이·NFT·웹3 서비스의 기반 플랫폼 역할을 합니다. 비트코인 ETF에서는 자금이 빠져나간 반면 이더리움 ETF에는 꾸준히 들어와 대조를 이뤘습니다. 두 이벤트 결과에 따라 2,000달러대와 3,000달러대 시나리오가 함께 제시됩니다.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETH", badgeLine: "\"Awaiting both the Clarity Act vote and the Fed\"",
  title: "Ethereum held near $2,513 ahead of a Senate vote on the Clarity Act and this week's Fed decision",
  heroIcon: "Ξ", heroBig: "$2,513",
  heroSub: "Sept 15 price; the 24h range was $2,462-2,526. Resistance sits at $2,542-2,550.",
  cards: [
    { icon:"🏛", big:"Senate vote", mid:"Clarity Act", sub:"Procedural vote Sept 15" },
    { icon:"🏦", big:"FOMC", mid:"Result Sept 16", sub:"Hike odds 79.5-90%" },
    { icon:"💰", big:"+$216M", mid:"ETF inflows", sub:"Contrasts with BTC" },
  ],
  quote: "Clearer regulation could make institutions more comfortable funding Ethereum-based services.",
  noteSub: "Ethereum underpins DeFi, NFT, and Web3 services. Bitcoin ETFs saw outflows while Ether ETFs kept drawing inflows. Analysts floated both a $2,000 downside and $3,000 upside scenario depending on how these two events land.",
  footer: "Ether · Price",
});

add("oil-108-saudi-pipeline-hormuz", "L2", "OIL", {
  badge: "원유", title: "사우디 송유관 중단과 호르무즈 회담 연기로 국제유가가 배럴당 108달러까지 치솟았습니다",
  heroIcon: "🛢", heroBig: "$108/배럴",
  heroSub: "브렌트유 기준 시세입니다. 사우디 동서송유관이 지난 11일부터 가동을 멈췄습니다.",
  cards: [
    { label:"브렌트유", big:"$108", mid:"+3.1~3.5%", sub:"올해 누적 +77%" },
    { label:"WTI", big:"$102~103", mid:"+2.8%", sub:"국내 파급 효과" },
    { label:"복구 기간", big:"3~6주", mid:"업계 전망", sub:"완전 정상화까지" },
  ],
  detailHead: "유가가 왜 이렇게 뛰었나",
  detailLines: [
    "이라크발 드론 공격으로 사우디 동서송유관이 손상돼 전면 중단됐습니다.",
    "이란·걸프국 간 호르무즈 해협 관련 고위급 회담도 연기됐습니다.",
    "사우디 8월 생산량이 하루 620만 배럴로 30여 년 만의 최저치입니다.",
  ],
  noteSub: "얀부항 비축유는 5~7일치에 불과해 세계 공급의 최대 4%가 고갈될 수 있다는 경고가 나왔습니다. 이번 유가 급등은 미 국채금리 상승과 FOMC 인상 확률 확대로 이어졌습니다. 송유관 복구 진행 상황과 호르무즈 협상 재개 여부를 확인하면 됩니다.",
  footer: "원유 · 국제유가",
}, {
  badge: "OIL", title: "Oil surged to $108 a barrel after a Saudi pipeline shutdown and postponed Hormuz talks",
  heroIcon: "🛢", heroBig: "$108/bbl",
  heroSub: "Brent crude price. Saudi's East-West pipeline has been down since Sept 11.",
  cards: [
    { label:"Brent", big:"$108", mid:"+3.1-3.5%", sub:"Up 77% YTD" },
    { label:"WTI", big:"$102-103", mid:"+2.8%", sub:"Feeding into local markets" },
    { label:"Repair time", big:"3-6 weeks", mid:"Industry estimate", sub:"Until full restart" },
  ],
  detailHead: "Why oil spiked this much",
  detailLines: [
    "A drone strike from Iraq damaged and halted Saudi's East-West pipeline.",
    "High-level Iran-Gulf talks on the Strait of Hormuz were postponed.",
    "Saudi's August output fell to 6.2M bpd, a three-decade low.",
  ],
  noteSub: "Yanbu port's reserves cover only 5-7 days, raising warnings that up to 4% of global supply could be at risk. The spike has already pushed up Treasury yields and Fed hike odds. Next: watch the pipeline repair progress and whether Hormuz talks resume.",
  footer: "Oil · Prices",
});

add("summary-krre", "ROWS", "JEONSE", {
  headline: "2026.09.15 한국부동산 한장 요약",
  rows: [
    { color:"#ef4444", fill:"#1a0a0a", right:"86주", title:"서울 아파트값이 86주 연속 올라 역대 최장 기록을 세웠습니다",
      sub:"86주간 누적 상승률 17.164%로 이전 기록의 2배입니다." },
    { color:"#a78bfa", fill:"#180f28", right:"14억/12억", title:"1주택 종부세 공제가 실거주 14억·비거주 12억으로 확정됐습니다",
      sub:"비거주 9억 축소안은 철회되고 세부담상한도 150% 유지됩니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"1.96억", title:"서울 아파트 월세 보증금이 6개월 연속 올라 1억9,557만 원입니다",
      sub:"25개 자치구 중 18곳에서 연초보다 보증금이 올랐습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"7.61%", title:"서울 전세가격이 올해만 7.61% 올라 작년의 4.8배 속도입니다",
      sub:"내년 보편형 임대주택 3만6,000가구 공급이 예고됐습니다." },
  ],
  caption: "더 볼 것: 서울 매매 86주 상승 · 종부세 14억/12억 · 월세보증금 1.96억 · 전세 7.61%",
}, {
  headline: "2026.09.15 Korea Real Estate Snapshot",
  rows: [
    { color:"#ef4444", fill:"#1a0a0a", right:"86 wks", title:"Seoul apartments posted a record 86th straight weekly gain",
      sub:"Cumulative gains of 17.164%, double the prior record streak." },
    { color:"#a78bfa", fill:"#180f28", right:"₩1.4B/1.2B", title:"Jongbuse deduction is now ₩1.4B for occupants, ₩1.2B else",
      sub:"A plan to cut the latter to ₩900M was withdrawn." },
    { color:"#fb923c", fill:"#1a0d02", right:"₩196M", title:"Seoul's rent deposit rose for a 6th month to ₩195.57M",
      sub:"18 of 25 districts saw deposits rise from January." },
    { color:"#60a5fa", fill:"#0a1420", right:"7.61%", title:"Seoul jeonse prices are up 7.61% this year, 4.8x last year",
      sub:"36,000 new public rental units are planned for next year." },
  ],
  caption: "Watch: Seoul sales 86-wk streak · jongbuse ₩1.4B/1.2B · rent deposit ₩196M · jeonse +7.61%",
});

add("seoul-apartment-86weeks-record", "L6", "RATES", {
  badge: "BREAKING", breaking: "서울 아파트 86주 연속 상승",
  title: "서울 아파트값이 86주 연속 올라 문재인 정부 시절 기록을 넘어 역대 최장 상승을 기록했습니다",
  heroBig: "86주",
  heroSub: "9월 첫째 주까지 연속 상승 주수입니다. 누적 상승률은 17.164%입니다.",
  grid: [
    { icon:"📈", big:"17.164%", mid:"86주 누적", sub:"이전 기록의 2배" },
    { icon:"🏙", big:"+0.46%", mid:"강북구 최고", sub:"미아·번동 중심" },
    { icon:"📉", big:"−0.35%", mid:"강남구 5주하락", sub:"서초구도 하락세" },
    { icon:"🏗", big:"입주 증가", mid:"서초 영향", sub:"잠원·반포 신규 입주" },
  ],
  ctx1: "강남3구를 뺀 서울 22개 자치구는 모두 이번 주 아파트값이 올랐습니다.",
  ctx2: "부동산114 조사에서도 서울 아파트값이 이번 주 0.19% 올랐습니다.",
  quote: "무주택 1인가구·신혼부부의 실수요 유입이 강북·외곽 강세의 배경으로 꼽힙니다.",
  noteSub: "서울 주택은 인구·일자리·교통이 집중돼 장기 수요가 꾸준한 자산으로 꼽힙니다. 다만 상승 강도가 역대 최고 수준인 만큼 정부 대응이나 금리 변화에 따른 조정 가능성도 커졌습니다. 다음 주 87주 연속 상승 여부와 강남3구 하락 확산을 확인하면 됩니다.",
  footer: "서울매매 · 86주 기록",
}, {
  badge: "BREAKING", breaking: "SEOUL'S 86-WEEK STREAK",
  title: "Seoul apartment prices rose for a record 86th straight week, beating the prior Moon-era streak",
  heroBig: "86 weeks",
  heroSub: "The streak through the first week of September. Cumulative gains reached 17.164%.",
  grid: [
    { icon:"📈", big:"17.164%", mid:"86-wk total", sub:"Double the old record" },
    { icon:"🏙", big:"+0.46%", mid:"Gangbuk's top gain", sub:"Led by Mia, Beon-dong" },
    { icon:"📉", big:"-0.35%", mid:"Gangnam's 5th drop", sub:"Seocho also falling" },
    { icon:"🏗", big:"More units", mid:"Seocho move-ins", sub:"New Jamwon, Banpo units" },
  ],
  ctx1: "All 22 Seoul districts outside Gangnam 3 rose in price this week.",
  ctx2: "A private survey (R114) also showed Seoul prices up 0.19% this week.",
  quote: "Steady demand from single renters and newlyweds is driving the northern-district strength.",
  noteSub: "Seoul housing draws steady long-term demand given its concentration of jobs and transit. But a record-strong streak also raises the odds of a policy or rate-driven correction ahead. Next: watch for an 87th weekly gain and whether Gangnam's decline spreads.",
  footer: "Seoul Sales · 86-week streak",
});

add("jongbuse-deduction-14-12", "L3", "POLICY", {
  badge: "종부세", title: "정부가 세제개편안을 확정해 1주택 종부세 기본공제를 실거주 14억, 비거주 12억으로 정리했습니다",
  heroIcon: "📋", heroBig: "14억 / 12억",
  heroSub: "1세대 1주택자 종부세 기본공제금액입니다. 실거주는 12억에서 14억으로 늘었습니다.",
  cards: [
    { icon:"↩️", big:"철회", mid:"비거주 9억안", sub:"종전 12억 유지" },
    { icon:"🔒", big:"150% 유지", mid:"세부담 상한", sub:"200%안 접음" },
    { icon:"👫", big:"부부공동", mid:"실거주 18억", sub:"비거주 12억 공제" },
  ],
  quote: "함영진 전문가는 이번 수정만으로 전셋값이 안정된다고 보기는 제한적이라고 짚었습니다.",
  noteSub: "정부는 실거주자를 우대하고 비거주 1주택 보유를 상대적으로 불리하게 만드는 방향을 이어가고 있습니다. 다만 종부세율 인상 등 다른 세부담 요인은 그대로 유지돼 체감 효과는 제한적일 수 있습니다. 정기국회 심사에서 세부 기준이 다시 조정될 가능성을 확인하면 됩니다.",
  footer: "종부세 · 세제개편",
}, {
  badge: "POLICY", title: "The government finalized the jongbuse deduction at ₩1.4B for occupants and ₩1.2B for non-occupants",
  heroIcon: "📋", heroBig: "₩1.4B / ₩1.2B",
  heroSub: "The basic property-tax deduction for single-home owners. Occupants' deduction rose from ₩1.2B.",
  cards: [
    { icon:"↩️", big:"Withdrawn", mid:"₩900M plan", sub:"Kept at ₩1.2B instead" },
    { icon:"🔒", big:"Cap at 150%", mid:"Tax-burden limit", sub:"200% plan dropped" },
    { icon:"👫", big:"Joint owners", mid:"₩1.8B if living in", sub:"₩1.2B if not" },
  ],
  quote: "One analyst said this revision alone is unlikely to stabilize jeonse prices.",
  noteSub: "The government keeps favoring occupants over non-occupant single-home owners. But other tax factors, like a higher jongbuse rate, remain unchanged, limiting the felt impact. Next: watch how the bill is adjusted during National Assembly review.",
  footer: "Jongbuse · Tax reform",
});

add("monthly-rent-deposit-6months-up", "L4", "JEONSE", {
  badge: "월세", badgeLine: "\"보증금까지 오르는 이중 부담\"",
  title: "서울 아파트 월세 보증금이 6개월 연속 오르며 전세의 월세화가 계속 이어지고 있습니다",
  heroIcon: "💰", heroBig: "1억9,557만 원",
  heroSub: "7월 서울 아파트 평균 월세 보증금으로, 1월(1억9,485만 원)부터 6개월 연속 올랐습니다.",
  cards: [
    { icon:"📈", big:"18개구", mid:"보증금 상승", sub:"강동구 +273만 원 최대" },
    { icon:"🏘", big:"토허구역", mid:"실거주 의무", sub:"전세 물량 감소 배경" },
    { icon:"🔄", big:"반전세 확대", mid:"전세→월세 전환", sub:"보증금도 함께 상승" },
  ],
  quote: "마포 한 단지는 전세 8억1,000만 원에서 보증금 7억7,000만·월세 20만 원으로 전환됐습니다.",
  noteSub: "토지거래허가구역 지정으로 매수 후 실거주 의무가 생겨 전세 물량이 줄어든 것이 핵심 배경입니다. 임대인들이 세금 부담을 이유로 반전세를 선호하는 흐름도 겹쳤습니다. 8·9월에도 상승세가 이어지는지, 보편형 임대주택 공급 효과가 나타나는지 확인하면 됩니다.",
  footer: "월세 · 보증금 상승",
}, {
  badge: "RENT", badgeLine: "\"A double burden as deposits rise too\"",
  title: "Seoul's average monthly-rent deposit has risen for six straight months as jeonse-to-rent shifts continue",
  heroIcon: "💰", heroBig: "₩195.57M",
  heroSub: "July's average Seoul deposit, up from ₩194.85M in January for a sixth straight monthly rise.",
  cards: [
    { icon:"📈", big:"18 districts", mid:"Deposits rose", sub:"Gangdong up ₩2.73M most" },
    { icon:"🏘", big:"Permit zones", mid:"Occupancy required", sub:"Behind the jeonse shortage" },
    { icon:"🔄", big:"More semi-jeonse", mid:"Jeonse to rent", sub:"Deposits rising too" },
  ],
  quote: "One Mapo unit converted from an ₩810M jeonse to a ₩770M deposit plus ₩200K monthly rent.",
  noteSub: "Land-permit zones now require buyers to live in units they purchase, shrinking jeonse supply. Landlords are also favoring semi-jeonse deals to ease their tax burden. Next: watch whether the trend continues and whether new public rental supply eases the pressure.",
  footer: "Rent · Rising deposits",
});

add("universal-rental-housing-36k-supply", "L1", "POLICY", {
  badge: "임대주택", title: "국토교통부가 내년 주택 공급에 30조 원을 투입하며 보편형 임대주택 3만6,000가구를 새로 공급합니다",
  heroIcon: "🏘", heroBig: "3만6,000가구",
  heroSub: "내년 새로 공급되는 보편형 임대주택 물량입니다. 6조2,000억 원이 투입됩니다.",
  cards: [
    { icon:"🏗", big:"2만6,000", mid:"건설형", sub:"역세권 중형평수 중심" },
    { icon:"👦", big:"약 2만 가구", mid:"청년 우선배정", sub:"전체의 절반 이상" },
    { icon:"💰", big:"30조 원", mid:"내년 주택예산", sub:"올해보다 8.8조 증가" },
  ],
  quote: "국토부는 기존 임대주택보다 선호도 높은 입지·평형으로 수요층을 넓히려 한다고 설명했습니다.",
  noteSub: "이번 공급 확대는 기존 공공분양을 줄이는 것이 아니라 새롭게 추가하는 방식입니다. 착공부터 입주까지 통상 몇 년이 걸려 당장의 전세난 완화 효과보다는 중장기 공급 기반 확충으로 봐야 합니다. 예산의 국회 심의 통과와 착공 시점을 확인하면 됩니다.",
  footer: "임대주택 · 공급계획",
}, {
  badge: "HOUSING", title: "Korea's land ministry will spend ₩30T on next year's housing supply, adding 36,000 new public rental units",
  heroIcon: "🏘", heroBig: "36,000 units",
  heroSub: "New 'universal' public rental units planned for next year, backed by ₩6.2 trillion.",
  cards: [
    { icon:"🏗", big:"26,000", mid:"Newly built", sub:"Near transit, mid-size units" },
    { icon:"👦", big:"~20,000 units", mid:"Reserved for youth", sub:"Over half the total" },
    { icon:"💰", big:"₩30T", mid:"Next year's budget", sub:"Up ₩8.8T from this year" },
  ],
  quote: "The ministry said it aims to widen appeal with better locations than past public housing.",
  noteSub: "This expands supply rather than replacing existing public-sale housing. Construction-to-move-in typically takes years, so this is a mid-term supply fix rather than an immediate fix for the jeonse shortage. Next: watch budget approval and construction start dates.",
  footer: "Rental Housing · Supply plan",
});

};
