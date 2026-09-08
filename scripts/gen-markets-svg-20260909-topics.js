/* KR / Safe / KR-RE topics for 2026-09-09 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.09 한국장 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"−0.58%", title:"코스피가 9월 8일 6,954.52로 0.58% 내렸고 장중 약 7,171까지 올랐다 되돌렸습니다", sub:"코스닥은 811.88(−1.25%)입니다. 수요일 아침 브리핑은 전일 종가 기준입니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"유가", title:"중동·사우디 에너지 시설 타격 서사에 브렌트 약 98달러·서부텍사스산 약 94달러가 겹쳤습니다", sub:"미국 10년물 금리가 약 4.8%까지 치솟았다는 설명도 같은 화면에 있습니다." },
    { color:"#22d3ee", fill:"#06171c", right:"수급", title:"개인이 약 3.0~3.3조 원 팔고 외국인·기관이 각각 약 6.3~6.5조·약 6.4조 원 샀습니다", sub:"지수 하락과 주체별 방향을 한 문장에 합치지 마시기 바랍니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"반도체", title:"삼성 269,500(−0.19%)·하이닉스 1,793,000(+0.56%)이고 9월 10일 지수 리밸런싱이 있습니다", sub:"적용은 11일부터, 하이닉스 비중 상한 이슈로 약 1.4~1.7조 원대 매도 추정이 나옵니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"시총", title:"엘지엔솔 −3.86%·현대차 약 −2.04%·삼바 약 −1.77%·케이비 약 −1.25%로 온도가 달랐습니다", sub:"테일러 팹·인공지능5 서사는 삼성 개별 축으로만 남기시기 바랍니다." },
  ],
  caption: "더 볼 것: 코스피 6954.52 · 코스닥 811.88 · 외인·기관 매수 · 반도체 리밸런싱 9/10 · 유가·금리",
}, {
  headline: "2026.09.09 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"−0.58%", title:"KOSPI closed 6,954.52 (−0.58%) after an intraday high near 7,171", sub:"KOSDAQ 811.88 (−1.25%). Wednesday briefing uses Tuesday’s close." },
    { color:"#ef4444", fill:"#1a0a0a", right:"Oil", title:"Middle East / Saudi energy-facility strike narrative; Brent ~$98, WTI ~$94", sub:"10y UST spiked near 4.8% on the same board." },
    { color:"#22d3ee", fill:"#06171c", right:"Flow", title:"Individuals sold ~₩3.0–3.3T; foreign ~₩6.3–6.5T buy; institutions ~₩6.4T buy", sub:"Do not mash index down with flow direction in one sentence." },
    { color:"#60a5fa", fill:"#0a1420", right:"Semi", title:"Samsung 269,500 (−0.19%), Hynix 1,793,000 (+0.56%); KRX semi rebalance Sep 10", sub:"Applies from Sep 11; ~₩1.4–1.7T estimated selling from weight caps." },
    { color:"#f59e0b", fill:"#1a1205", right:"Peers", title:"LGES −3.86%, Hyundai ~−2.04%, Bio ~−1.77%, KB ~−1.25%", sub:"Taylor/AI5 stays on the Samsung axis only." },
  ],
  caption: "Watch: KOSPI 6954.52 · KOSDAQ 811.88 · foreign/inst buys · semi rebalance 9/10 · oil/rates",
});

function kpi(slug, pal, badge, title, heroIcon, heroBig, heroSub, cards, quote, noteSub, footer, en) {
  add(slug, "L1", pal, { badge, title, heroIcon, heroBig, heroSub, cards, quote, noteSub, footer }, en);
}

kpi("kospi-flow-kr", "KOSPI", "코스피",
  "코스피가 6,954.52(−0.58%)로 마감하며 장중 7,171 근처에서 되돌렸습니다",
  "📉", "6,954",
  "장중 고점은 약 7,171이었고 종가는 6,954.52(−40.87포인트)입니다. 코스닥은 811.88(−1.25%)였습니다.",
  [
    { icon:"📊", big:"−0.58%", mid:"코스피 등락률", sub:"종가 6,954.52" },
    { icon:"⬆️", big:"~7,171", mid:"장중 고점 대략", sub:"고점 대비 되돌림" },
    { icon:"💹", big:"−1.25%", mid:"코스닥 등락률", sub:"종가 811.88" },
  ],
  "하루 −0.58%는 장중 급등 후 되돌림이 핵심입니다. 중동 유가·미국 금리 서사가 할인율을 흔든 날로 읽힙니다. 주체별 수급은 개인 매도·외국인·기관 매수였습니다.",
  "지수 하락과 외국인 매수를 한 문장에 합치면 착시가 납니다. 다음 확인할 것은 7,000선 회복 여부와 유가·10년물입니다. 장기적으로 코스피는 반도체 비중·환율·외국인 지분의 교집합입니다.",
  "코스피 · 수급",
  { badge:"KOSPI", title:"KOSPI closed 6,954.52 (−0.58%) after ~7,171 intraday", heroIcon:"📉", heroBig:"6,954",
    heroSub:"Intraday high near 7,171; close 6,954.52 (−40.87). KOSDAQ 811.88 (−1.25%).",
    cards:[{icon:"📊",big:"−0.58%",mid:"KOSPI change",sub:"Close 6,954.52"},{icon:"⬆️",big:"~7,171",mid:"Intraday high",sub:"Gave back gains"},{icon:"💹",big:"−1.25%",mid:"KOSDAQ change",sub:"Close 811.88"}],
    quote:"The story is a fade from the highs with oil/rate pressure. Individuals sold while foreign and institutions bought.",
    noteSub:"Do not mash index down with foreign buying. Next: 7,000 retest and oil/10y. Long-run KOSPI is semis, FX, and foreign ownership.",
    footer:"KOSPI · flow" });

kpi("samsung-kr", "SEC", "삼성전자",
  "삼성전자가 269,500원(−0.19%)으로 마감하며 장중 276,500원 이상을 반납했습니다",
  "📱", "269,500",
  "장중 276,500원 이상까지 올랐다가 269,500원(−0.19%)으로 마감했습니다. 테일러 팹·인공지능5 서사는 중기 축으로만 분리합니다.",
  [
    { icon:"💵", big:"269,500", mid:"종가(원)", sub:"전일 대비 −0.19%" },
    { icon:"📈", big:"276,500+", mid:"장중 고가권", sub:"고점 대비 되돌림" },
    { icon:"🇺🇸", big:"테일러", mid:"팹·인공지능5 축", sub:"중기 재료로만" },
  ],
  "하루 −0.19%는 지수(−0.58%)보다 방어적이었습니다. 장중 고가 반납은 변동성 확대를 보여 줍니다. 리밸런싱 추정 매도(약 0.2조 원대)는 수급 칸입니다.",
  "종가와 장중 고가·리밸런싱·테일러 서사를 한 줄로 합치지 마시기 바랍니다. 다음 확인은 외국인 종목별 매수와 9월 10일 리밸런싱입니다. 장기적으로 메모리·파운드리 사이클이 핵심입니다.",
  "삼성전자",
  { badge:"Samsung", title:"Samsung closed 269,500 (−0.19%) after 276,500+ intraday", heroIcon:"📱", heroBig:"269,500",
    heroSub:"Printed above 276,500 then closed 269,500 (−0.19%). Taylor/AI5 stays medium-term.",
    cards:[{icon:"💵",big:"269,500",mid:"Close (KRW)",sub:"−0.19% day"},{icon:"📈",big:"276,500+",mid:"Intraday high zone",sub:"Gave back"},{icon:"🇺🇸",big:"Taylor",mid:"Fab/AI5 axis",sub:"Medium-term only"}],
    quote:"−0.19% held up vs KOSPI −0.58%. Rebalance selling (~₩0.2T estimated) is a flow cell.",
    noteSub:"Split close, intraday, rebalance, and Taylor. Next: foreign stock flow and Sep 10 rebalance. Memory/foundry cycles dominate the long view.",
    footer:"Samsung" });

kpi("skhynix-kr", "HYNIX", "SK하이닉스",
  "하이닉스가 1,793,000원(+0.56%)으로 마감하며 장중 1,872,000원 근처를 반납했습니다",
  "💾", "1,793,000",
  "장중 약 1,872,000원까지 올랐다가 1,793,000원(+0.56%)으로 마감했습니다. 9월 10일 반도체 지수 리밸런싱에서 비중 상한 이슈가 큽니다.",
  [
    { icon:"💵", big:"1,793,000", mid:"종가(원)", sub:"전일 대비 +0.56%" },
    { icon:"📈", big:"1,872,000", mid:"장중 고가권", sub:"고점 대비 되돌림" },
    { icon:"⚖️", big:"~36.8%", mid:"리밸런싱 비중 추정", sub:"상한 대비 매도 압력" },
  ],
  "플러스 마감이지만 장중 고가 반납과 리밸런싱(약 1.2~1.24조 원 매도 추정)이 겹칩니다. 장비주 유입 서사도 같은 주의 수급 이야기입니다.",
  "종가 강세와 리밸런싱 매도 추정을 한 문장에 넣지 마시기 바랍니다. 다음 확인은 9월 10~11일 수급과 한미·주성 등 장비 상대 성과입니다. 장기적으로 고대역폭 메모리 점유가 핵심입니다.",
  "SK하이닉스",
  { badge:"Hynix", title:"Hynix closed 1,793,000 (+0.56%) after ~1,872,000 intraday", heroIcon:"💾", heroBig:"1,793,000",
    heroSub:"Intraday near 1,872,000 then +0.56% close. Sep 10 semi-index rebalance weight-cap issue is large.",
    cards:[{icon:"💵",big:"1,793,000",mid:"Close (KRW)",sub:"+0.56% day"},{icon:"📈",big:"1,872,000",mid:"Intraday high",sub:"Gave back"},{icon:"⚖️",big:"~36.8%",mid:"Est. rebalance weight",sub:"Cap-driven selling"}],
    quote:"Green close overlaps ~₩1.2–1.24T estimated rebalance selling and equipment-flow narratives.",
    noteSub:"Split close strength from rebalance selling. Next: Sep 10–11 flows and equipment relatives. HBM share dominates the long view.",
    footer:"SK Hynix" });

kpi("lges-kr", "SEC", "LG에너지솔루션",
  "엘지에너지솔루션이 348,500원(−3.86%)으로 시총 상위 가운데 큰 폭으로 빠졌습니다",
  "🔋", "−3.86%",
  "종가 348,500원(−3.86%)입니다. 유가·금리·위험회피가 배터리·자동차 체인을 같이 누른 날로 읽힙니다.",
  [
    { icon:"💵", big:"348,500", mid:"종가(원)", sub:"하루 −3.86%" },
    { icon:"🛢️", big:"유가", mid:"원가·수요 압력", sub:"브렌트 90달러대" },
    { icon:"🚗", big:"완성차", mid:"수요 체감 동행", sub:"현대차도 약세" },
  ],
  "−3.86%는 반도체보다 큰 조정입니다. 전기차 수요·메탈 원가·금리 할인을 한 줄로 합치지 마시기 바랍니다.",
  "배터리 개별 수주·가동률과 업종 베타를 칸으로 나누시기 바랍니다. 다음 확인은 완성차 판매·원재료 가격입니다. 장기적으로 에너지 저장·전기차 침투가 해자 논쟁입니다.",
  "LG에너지솔루션",
  { badge:"LGES", title:"LG Energy Solution fell 3.86% to 348,500", heroIcon:"🔋", heroBig:"−3.86%",
    heroSub:"Close 348,500 (−3.86%). Oil, rates, and risk-off pressed the battery/auto chain.",
    cards:[{icon:"💵",big:"348,500",mid:"Close (KRW)",sub:"−3.86% day"},{icon:"🛢️",big:"Oil",mid:"Cost/demand pressure",sub:"Brent $90s"},{icon:"🚗",big:"OEMs",mid:"Demand co-move",sub:"Hyundai soft too"}],
    quote:"−3.86% is a larger drawdown than semis. Split EV demand, metal costs, and rate discounting.",
    noteSub:"Separate contract/utilization from sector beta. Next: OEM sales and input prices. Storage and EV penetration frame the long moat debate.",
    footer:"LG Energy Solution" });

kpi("hyundai-kr", "KOSPI", "현대차",
  "현대차가 약 2.04% 내리며 유가·금리 압력 속에 완성차 베타를 드러냈습니다",
  "🚗", "−2.04%",
  "하루 약 −2.04%입니다. 반도체와 다른 수요·환율·유가 시계를 가진 완성차 구간입니다.",
  [
    { icon:"📉", big:"−2.04%", mid:"하루 등락", sub:"완성차 베타" },
    { icon:"🛢️", big:"유가", mid:"소비·원가 변수", sub:"브렌트·서부텍사스산" },
    { icon:"💱", big:"환율", mid:"수출 채산성", sub:"정확한 종가 미확인 시 방향만" },
  ],
  "자동차는 유가·금리가 소비와 할부 수요에 닿습니다. 모빌리티·로보택시 뉴스는 중기 칸에만 두시기 바랍니다.",
  "단기 업종 베타와 중기 모빌리티를 섞지 마시기 바랍니다. 다음 확인은 판매·인센티브·환율입니다. 장기적으로 전동화·소프트웨어 전환이 해자입니다.",
  "현대차",
  { badge:"Hyundai", title:"Hyundai fell about 2.04% under oil and rate pressure", heroIcon:"🚗", heroBig:"−2.04%",
    heroSub:"About −2.04% on the day. Auto beta runs on demand, FX, and oil—not the semi clock.",
    cards:[{icon:"📉",big:"−2.04%",mid:"Day change",sub:"OEM beta"},{icon:"🛢️",big:"Oil",mid:"Demand/cost variable",sub:"Brent/WTI"},{icon:"💱",big:"FX",mid:"Export margins",sub:"Direction if FX print missing"}],
    quote:"Oil and rates hit consumption and financing. Keep robotaxi/mobility news in the medium-term cell only.",
    noteSub:"Do not mash sector beta with mobility optionality. Next: sales, incentives, FX. Electrification and software frame the long moat.",
    footer:"Hyundai" });

kpi("kb-fin-kr", "FLOW", "KB금융",
  "케이비금융이 약 1.25% 내리며 금리·위험회피 속에 은행 베타를 보였습니다",
  "🏦", "−1.25%",
  "하루 약 −1.25%입니다. 미국 10년물 급등 서사와 국내 위험자산 조정이 겹친 금융주 구간입니다.",
  [
    { icon:"📉", big:"−1.25%", mid:"하루 등락", sub:"은행 베타" },
    { icon:"📈", big:"~4.8%", mid:"미 10년물 서사", sub:"할인율 압력" },
    { icon:"📊", big:"NIM", mid:"순이자마진 관찰", sub:"연체와 한 화면" },
  ],
  "은행은 금리 상승이 마진에 도움이 될 수 있어도, 급등·위험회피 구간에서는 주가가 먼저 빠질 수 있습니다. 연체·자본비율을 같이 보시기 바랍니다.",
  "하루 등락으로 순이자마진 추세를 단정하지 마시기 바랍니다. 다음 확인은 시장금리·연체·배당 정책입니다. 장기적으로 자본 규율과 수수료 다각화가 해자입니다.",
  "KB금융",
  { badge:"KB", title:"KB Financial fell about 1.25% with rates and risk-off", heroIcon:"🏦", heroBig:"−1.25%",
    heroSub:"About −1.25%. UST 10y spike narrative overlapped domestic risk-off for banks.",
    cards:[{icon:"📉",big:"−1.25%",mid:"Day change",sub:"Bank beta"},{icon:"📈",big:"~4.8%",mid:"UST 10y story",sub:"Discount-rate pressure"},{icon:"📊",big:"NIM",mid:"Margin watch",sub:"With delinquencies"}],
    quote:"Higher rates can help NIM later, but sharp spikes and risk-off often hit bank stocks first. Watch delinquencies and capital.",
    noteSub:"Do not read one-day moves as NIM trend. Next: market rates, NPLs, dividends. Capital discipline and fee mix frame the long moat.",
    footer:"KB Financial" });

// SAFE
add("summary-safe", "ROWS", "GOLD", {
  headline: "2026.09.09 안전자산 한장 요약",
  rows: [
    { color:"#facc15", fill:"#1a1600", right:"금", title:"금이 온스 약 4,400달러 부근을 지키며 연준 9월 16일 회의를 앞두고 있습니다", sub:"폴리마켓 인상 약 51.5%·동결 약 47.5%, 씨엠이 선물은 종종 58~66%로 더 높습니다." },
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"비트코인이 약 7만 8,300~7만 8,500달러로 8만 달러를 내준 뒤 금과의 상관 서사가 커졌습니다", sub:"안전자산처럼 보이지만 레버리지 청산 속도는 암호화폐입니다." },
    { color:"#f97316", fill:"#1a0d02", right:"원유", title:"브렌트 약 98달러 급등이 위험·안전자산 경계를 흔들었습니다", sub:"중동 타격 서사와 겹칩니다. 금·비트코인과 칸을 나누시기 바랍니다." },
    { color:"#94a3b8", fill:"#0c1017", right:"달러", title:"달러·금리 경로가 공통 분모로 다시 올라왔습니다", sub:"8월 소비자물가(9월 11일)·연방공개시장위원회(15~16일)가 같은 주 캘린더입니다." },
    { color:"#cbd5e1", fill:"#111827", right:"은", title:"은은 헤지와 산업 수요가 겹쳐 금·유가와 다른 줄로 추적합니다", sub:"금은비율과 달러를 같이 보시면 착시가 줄어듭니다." },
  ],
  caption: "더 볼 것: 금 ~4400 · BTC 78.3~78.5k · 인상확률 갈림 · 브렌트 ~98 · CPI·FOMC",
}, {
  headline: "2026.09.09 Safe-Assets Snapshot",
  rows: [
    { color:"#facc15", fill:"#1a1600", right:"Gold", title:"Gold holds near $4,400/oz into the Sep 16 Fed meeting", sub:"Polymarket ~51.5% hike / 47.5% hold; CME often higher ~58–66%." },
    { color:"#f7931a", fill:"#1a0f00", right:"BTC", title:"BTC ~$78,300–78,500 after losing $80k; BTC–gold correlation narrative high", sub:"Looks like a haven trade, but liquidation speed is crypto." },
    { color:"#f97316", fill:"#1a0d02", right:"Oil", title:"Brent near $98 shakes the risk/haven border", sub:"Overlaps Middle East strike narrative; split from gold/BTC cells." },
    { color:"#94a3b8", fill:"#0c1017", right:"USD", title:"Dollar and rate path returned as the common denominator", sub:"Aug CPI Sep 11 and FOMC Sep 15–16 sit on the same calendar." },
    { color:"#cbd5e1", fill:"#111827", right:"Silver", title:"Silver mixes haven and industrial demand—track apart from gold/oil", sub:"Gold/silver ratio and DXY reduce misreads." },
  ],
  caption: "Watch: gold ~4400 · BTC 78.3–78.5k · split hike odds · Brent ~98 · CPI/FOMC",
});

kpi("btc-safe", "BTC", "비트코인",
  "비트코인이 약 7만 8,300~7만 8,500달러에서 8만 달러를 내준 뒤 금 상관 서사가 커졌습니다",
  "₿", "78.4k",
  "8만 달러 심리를 내준 뒤 7만 8천 달러대에 머물렀습니다. 금과의 상관이 높다는 해석이 붙었지만 청산 속도는 다릅니다.",
  [
    { icon:"💵", big:"78.3~78.5k", mid:"달러 가격대", sub:"8만 달러 이탈 후" },
    { icon:"🥇", big:"상관", mid:"금과 동행 서사", sub:"헤지처럼 보이나 레버리지 다름" },
    { icon:"📅", big:"FOMC", mid:"9월 15~16일", sub:"물가 11일과 한 주" },
  ],
  "8만 달러 이탈은 심리선 이벤트입니다. 유입·청산 맵이 숏커버인지 수요인지 가릅니다. 금 가격과 한 줄로 합치지 마시기 바랍니다.",
  "상관은 후행일 수 있습니다. 다음 확인은 현물 상장지수펀드 유입과 회의 전 변동성입니다. 장기적으로 희소성·제도화 서사가 해자 논쟁입니다.",
  "비트코인",
  { badge:"BTC", title:"BTC ~$78.3–78.5k after losing $80k; gold-correlation narrative rises", heroIcon:"₿", heroBig:"78.4k",
    heroSub:"Lost the $80k psyche and sits in the high-78ks. Correlation with gold is cited, but liquidation speed differs.",
    cards:[{icon:"💵",big:"78.3–78.5k",mid:"USD zone",sub:"After $80k break"},{icon:"🥇",big:"Corr",mid:"Gold co-move story",sub:"Haven look, crypto leverage"},{icon:"📅",big:"FOMC",mid:"Sep 15–16",sub:"CPI Sep 11 same week"}],
    quote:"Losing $80k is a psyche event. ETF flows and liquidation maps separate short covers from demand.",
    noteSub:"Correlation can lag. Next: spot ETF flows and pre-meeting vol. Scarcity and institutionalization frame the long debate.",
    footer:"Bitcoin" });

kpi("gold-safe", "GOLD", "금",
  "금이 온스 약 4,400달러 부근을 지키며 9월 연방공개시장위원회를 앞두고 있습니다",
  "🥇", "4,400",
  "온스 약 4,400달러대가 밴드로 인용됩니다. 인상 확률은 예측시장과 선물시장이 갈립니다.",
  [
    { icon:"💵", big:"~$4,400", mid:"온스 달러", sub:"밴드 앵커" },
    { icon:"🎲", big:"51.5%", mid:"인상 확률(예측시장)", sub:"동결 약 47.5%" },
    { icon:"📉", big:"58~66%", mid:"선물시장 쪽 더 높음", sub:"시장 간 괴리" },
  ],
  "금은 실질금리·달러의 거울입니다. 확률 숫자만으로 방향을 단정하지 마시기 바랍니다. 비트코인 상관과 온스 밴드를 칸으로 나누시기 바랍니다.",
  "예측시장과 선물 괴리는 포지션·유동성 차이일 수 있습니다. 다음 확인은 소비자물가와 회의 성명입니다. 장기적으로 금은 통화 신뢰 헤지입니다.",
  "금",
  { badge:"Gold", title:"Gold holds near $4,400/oz into September FOMC", heroIcon:"🥇", heroBig:"$4,400",
    heroSub:"About $4,400/oz as a band. Hike odds split between prediction markets and futures.",
    cards:[{icon:"💵",big:"~$4,400",mid:"USD per ounce",sub:"Band anchor"},{icon:"🎲",big:"51.5%",mid:"Hike odds (PM)",sub:"Hold ~47.5%"},{icon:"📉",big:"58–66%",mid:"Futures often higher",sub:"Cross-market gap"}],
    quote:"Gold mirrors real rates and the dollar. Do not crown direction from one odds print. Split BTC correlation from the ounce band.",
    noteSub:"PM vs futures gaps can be positioning. Next: CPI and the statement. Gold remains a multi-year monetary-trust hedge.",
    footer:"Gold" });

kpi("oil-safe", "OIL", "원유",
  "원유가 브렌트 약 98달러·서부텍사스산 약 94달러로 치솟으며 중동 리스크가 가격에 붙었습니다",
  "🛢️", "~$98",
  "브렌트 약 98달러, 서부텍사스산 약 94달러가 거론됩니다. 에너지 시설 타격 서사가 같은 화면에 있습니다.",
  [
    { icon:"🇬🇧", big:"~$98", mid:"브렌트", sub:"국제 기준물" },
    { icon:"🇺🇸", big:"~$94", mid:"서부텍사스산", sub:"미국 기준물" },
    { icon:"⚠️", big:"중동", mid:"지정학 프리미엄", sub:"시설 타격 서사" },
  ],
  "유가 급등은 인플레이션·위험자산·항공·화학에 동시에 닿습니다. 금·비트코인 헤지와 같은 칸에 넣지 마시기 바랍니다.",
  "재고·감산·지정학을 분리해 적으시기 바랍니다. 다음 확인은 재고 통계와 외교 일정입니다. 장기적으로 에너지 전환과 지정학이 겹치는 시장입니다.",
  "원유",
  { badge:"Oil", title:"Oil surges with Brent ~$98 and WTI ~$94 on Middle East risk", heroIcon:"🛢️", heroBig:"~$98",
    heroSub:"Brent ~$98 and WTI ~$94 cited with an energy-facility strike narrative.",
    cards:[{icon:"🇬🇧",big:"~$98",mid:"Brent",sub:"Global benchmark"},{icon:"🇺🇸",big:"~$94",mid:"WTI",sub:"US benchmark"},{icon:"⚠️",big:"ME",mid:"Geopolitical premium",sub:"Facility-strike story"}],
    quote:"Oil spikes hit inflation, risk assets, airlines, and chemicals together. Do not park it in the same cell as gold/BTC hedges.",
    noteSub:"Split inventories, cuts, and geopolitics. Next: inventory prints and diplomacy calendars. Transition plus geopolitics frame the long market.",
    footer:"Crude" });

kpi("dxy-safe", "RATES", "달러",
  "달러와 금리 경로가 금·비트코인·유가의 공통 분모로 다시 올라왔습니다",
  "💵", "DXY",
  "달러인덱스와 미국 금리는 위험·안전자산을 같이 흔듭니다. 9월 11일 물가·15~16일 회의가 같은 주입니다.",
  [
    { icon:"📅", big:"9/11", mid:"소비자물가", sub:"8월 물가 발표" },
    { icon:"🏛", big:"9/15~16", mid:"연방공개시장위원회", sub:"금리 결정 회의" },
    { icon:"🎲", big:"갈림", mid:"인상 확률 시장 간 괴리", sub:"예측시장 vs 선물" },
  ],
  "원·달러만 보면 달러 강세·약세를 오독하기 쉽습니다. 달러인덱스와 금리를 먼저 두시기 바랍니다.",
  "회의 전 레버리지는 줄이는 편이 안전합니다. 다음 확인은 물가 서프라이즈와 점도 점도입니다. 장기적으로 달러는 글로벌 유동성의 앵커입니다.",
  "달러",
  { badge:"USD", title:"Dollar and rate path returned as the common denominator", heroIcon:"💵", heroBig:"DXY",
    heroSub:"DXY and US rates shake risk and haven assets together. CPI Sep 11 and FOMC Sep 15–16 share the week.",
    cards:[{icon:"📅",big:"9/11",mid:"CPI print",sub:"August inflation"},{icon:"🏛",big:"9/15–16",mid:"FOMC",sub:"Rate decision"},{icon:"🎲",big:"Split",mid:"Hike-odds gap",sub:"PM vs futures"}],
    quote:"Watching only USD/KRW misreads dollar strength. Put DXY and rates first.",
    noteSub:"Cut leverage into the meeting. Next: CPI surprise and the dots/statement. The dollar anchors global liquidity over years.",
    footer:"Dollar" });

kpi("silver-safe", "SILVER", "은",
  "은이 헤지와 산업 수요가 겹친 자리로 금·유가 옆에 다시 올랐습니다",
  "🥈", "은",
  "은은 금처럼 헤지이면서 태양광·전자 산업 수요가 붙습니다. 금은비율과 달러를 같이 보시면 됩니다.",
  [
    { icon:"🥇", big:"헤지", mid:"금과 동행 구간", sub:"위험회피 때" },
    { icon:"🏭", big:"산업", mid:"태양광·전자 수요", sub:"금과 다른 줄" },
    { icon:"💱", big:"달러", mid:"공통 압력", sub:"강달러 때 눌림" },
  ],
  "금만 보고 은을 추격하면 산업 줄을 놓칩니다. 유가 급등 주에는 인플레이션 헤지 논쟁과 겹칩니다.",
  "금은비율이 벌어지면 해석이 갈립니다. 다음 확인은 달러·실질금리·산업 지표입니다. 장기적으로 전기화 수요가 은의 구조 이야기입니다.",
  "은",
  { badge:"Silver", title:"Silver sits between haven and industrial demand beside gold and oil", heroIcon:"🥈", heroBig:"Ag",
    heroSub:"Silver hedges like gold but also takes solar/electronics demand. Pair the gold/silver ratio with the dollar.",
    cards:[{icon:"🥇",big:"Haven",mid:"Co-moves with gold",sub:"In risk-off"},{icon:"🏭",big:"Industry",mid:"Solar/electronics",sub:"Different line vs gold"},{icon:"💱",big:"USD",mid:"Common pressure",sub:"Strong dollar weighs"}],
    quote:"Chasing silver off gold alone drops the industrial line. Oil-spike weeks overlap inflation-hedge debates.",
    noteSub:"Widening gold/silver ratios split narratives. Next: USD, real rates, industrial prints. Electrification is silver’s structural story.",
    footer:"Silver" });

// KR-RE
add("summary-krre", "ROWS", "JEONSE", {
  headline: "2026.09.09 한국부동산 한장 요약",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"전세", title:"7월 서울 아파트 갱신권 없이 재계약한 전세의 약 87.6~88%가 보증금을 올렸습니다", sub:"평균 약 4,680만 원(약 9.1%) 인상, 갱신권 사용 시 평균 약 2,750만 원으로 약 1.7배 낮습니다." },
    { color:"#ef4444", fill:"#1a0a0a", right:"사례", title:"1억 원 이상 인상 360건·3억 원 이상 20건이 집계됐고 개별 단지 사례가 공유됐습니다", sub:"자극적 헤드라인보다 분포와 평균을 같이 보시기 바랍니다." },
    { color:"#a78bfa", fill:"#120b1f", right:"매물", title:"서울 전세 매물이 약 20,432건으로 전년 대비 약 12% 줄었습니다", sub:"전세가격지수는 101.9로 2022년 10월 이후 최고 수준입니다." },
    { color:"#38bdf8", fill:"#061520", right:"월세", title:"순수 전세에서 월세로 바뀌는 전환과 가을 이사 시즌 위험이 겹칩니다", sub:"대출 한도가 계약 관문입니다. 노룩 계약은 거절하시기 바랍니다." },
    { color:"#c084fc", fill:"#140b1f", right:"정책", title:"실거주·허가구역·공급 불일치 논쟁은 전세 숫자와 다른 칸에 둡니다", sub:"공급은 느리고 규제는 빠릅니다. 급매수·급계약은 하지 마시기 바랍니다." },
  ],
  caption: "더 볼 것: 갱신 없이 인상 88% · 평균 +4688만 · 매물 20432 · 지수 101.9 · 가을 이사",
}, {
  headline: "2026.09.09 Korea Real-Estate Snapshot",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"Jeonse", title:"~87.6–88% of Seoul apt Jul renewals without renewal-right raised deposits", sub:"Avg raise ~₩46.8M (~9.1%); with-right avg ~₩27.5M (~1.7× lower)." },
    { color:"#ef4444", fill:"#1a0a0a", right:"Tails", title:"360 cases raised ₩100M+ and 20 raised ₩300M+; estate examples circulated", sub:"Read distribution with averages—avoid sensational single prints." },
    { color:"#a78bfa", fill:"#120b1f", right:"Listings", title:"Seoul jeonse listings ~20,432 (−12% YoY)", sub:"Jeonse price index 101.9—highest since Oct 2022." },
    { color:"#38bdf8", fill:"#061520", right:"Wolse", title:"Pure jeonse→wolse conversions overlap autumn moving-season risk", sub:"Bank limits gate contracts; refuse no-look deals." },
    { color:"#c084fc", fill:"#140b1f", right:"Policy", title:"Owner-occupancy / permit-zone / supply-mismatch debates stay in a separate cell", sub:"Supply is slow; rules are fast—no panic buy/lease." },
  ],
  caption: "Watch: 88% raises · +₩46.8M avg · 20,432 listings · index 101.9 · autumn moves",
});

kpi("jeonse-renew-krre", "JEONSE", "전세",
  "서울 아파트 갱신권 없는 전세 재계약의 약 88%가 보증금을 올렸고 평균 약 4,680만 원이었습니다",
  "📝", "88%",
  "7월 갱신권 미사용 재계약 중 약 87.6~88%가 보증금을 올렸습니다. 평균 인상액 약 4,680만 원(약 9.1%), 갱신권 사용 시 평균 약 2,750만 원입니다.",
  [
    { icon:"📊", big:"~88%", mid:"인상 비중", sub:"갱신권 없이 재계약" },
    { icon:"💵", big:"+4,680만", mid:"평균 인상액", sub:"약 9.1%" },
    { icon:"🛡️", big:"+2,750만", mid:"갱신권 사용 시", sub:"약 1.7배 낮음" },
  ],
  "갱신권 유무가 인상폭을 가릅니다. 1억 이상 360건·3억 이상 20건은 꼬리 분포입니다. 개별 단지 사례만으로 시장 전체를 단정하지 마시기 바랍니다.",
  "평균과 꼬리를 한 문장에 합치지 마시기 바랍니다. 다음 확인은 구별 분포와 대출 한도입니다. 장기적으로 전세는 주거비·레버리지의 핵심 축입니다.",
  "전세 · 갱신",
  { badge:"Jeonse", title:"~88% of no-renewal-right Seoul renewals raised deposits; avg ~₩46.8M", heroIcon:"📝", heroBig:"88%",
    heroSub:"Jul renewals without renewal-right: ~87.6–88% raised. Avg ~₩46.8M (~9.1%) vs ~₩27.5M with right.",
    cards:[{icon:"📊",big:"~88%",mid:"Share raising",sub:"No renewal-right"},{icon:"💵",big:"+₩46.8M",mid:"Average raise",sub:"~9.1%"},{icon:"🛡️",big:"+₩27.5M",mid:"With renewal-right",sub:"~1.7× lower"}],
    quote:"Renewal-right status drives the raise. 360 cases ₩100M+ and 20 cases ₩300M+ are tail prints—not the whole market.",
    noteSub:"Do not mash averages with tails. Next: district distributions and loan caps. Jeonse remains a multi-year housing-cost and leverage axis.",
    footer:"Jeonse · renewals" });

kpi("jeonse-listings-krre", "JEONSE", "전세",
  "서울 전세 매물이 약 20,432건(−12%)으로 줄고 전세가격지수는 101.9로 올랐습니다",
  "🏠", "20,432",
  "매물 약 20,432건은 전년 대비 약 12% 감소입니다. 전세가격지수 101.9는 2022년 10월 이후 최고 수준입니다.",
  [
    { icon:"📦", big:"20,432", mid:"서울 전세 매물", sub:"전년 대비 −12%" },
    { icon:"📈", big:"101.9", mid:"전세가격지수", sub:"22년 10월 이후 최고" },
    { icon:"🍂", big:"가을", mid:"이사 시즌 겹침", sub:"수요 집중 구간" },
  ],
  "매물 감소와 지수 상승은 협상력이 임대인 쪽으로 기울 수 있다는 신호입니다. 다만 구·면적·대출 가능액이 계약을 가릅니다.",
  "도시 평균만 보지 말고 구별 표를 남기시기 바랍니다. 다음 확인은 매물 추이·지수·대출 한도입니다. 장기적으로 공급·인구·금리가 전세 사이클을 만듭니다.",
  "전세 · 매물",
  { badge:"Listings", title:"Seoul jeonse listings ~20,432 (−12% YoY); index 101.9", heroIcon:"🏠", heroBig:"20,432",
    heroSub:"Listings ~20,432 (−12% YoY). Jeonse price index 101.9—highest since Oct 2022.",
    cards:[{icon:"📦",big:"20,432",mid:"Seoul listings",sub:"−12% YoY"},{icon:"📈",big:"101.9",mid:"Price index",sub:"Highest since Oct’22"},{icon:"🍂",big:"Autumn",mid:"Moving season",sub:"Demand cluster"}],
    quote:"Fewer listings and a higher index can tilt bargaining to landlords—but district, size, and loan caps still gate deals.",
    noteSub:"Keep district tables, not city averages only. Next: listing trend, index, loan caps. Supply, demographics, and rates shape multi-year jeonse cycles.",
    footer:"Jeonse · listings" });

kpi("jeonse-wolse-krre", "JEONSE", "전세",
  "순수 전세가 월세로 바뀌는 전환과 가을 이사 수요가 겹치며 계약 리스크가 커졌습니다",
  "🔄", "월세",
  "전세 부담이 커지면 보증금 일부·전체를 월세로 돌리는 전환이 늘어날 수 있습니다. 가을 이사 시즌과 겹치면 성급 계약 위험이 큽니다.",
  [
    { icon:"📝", big:"전환", mid:"전세→월세", sub:"현금흐름 부담 이동" },
    { icon:"🏦", big:"대출", mid:"한도가 관문", sub:"조회 후 계약" },
    { icon:"⚠️", big:"가을", mid:"이사 시즌", sub:"성급 계약 주의" },
  ],
  "월세 전환은 주거비 구조 변화입니다. 등기·확정일자·한도 조회 없이 계약하지 마시기 바랍니다.",
  "전세가 상승과 월세 전환율을 같은 표에 두시기 바랍니다. 다음 확인은 전환 비중·은행 한도입니다. 장기적으로 임대차 형태 변화는 가계 현금흐름에 누적됩니다.",
  "전세 · 월세",
  { badge:"Wolse", title:"Jeonse→wolse conversions overlap autumn moving-season risk", heroIcon:"🔄", heroBig:"Wolse",
    heroSub:"Heavier jeonse burdens can shift deposits into monthly rent. Autumn moves raise rushed-contract risk.",
    cards:[{icon:"📝",big:"Shift",mid:"Jeonse→wolse",sub:"Cash-flow burden moves"},{icon:"🏦",big:"Loans",mid:"Limits gate deals",sub:"Check before signing"},{icon:"⚠️",big:"Autumn",mid:"Moving season",sub:"Avoid rushed contracts"}],
    quote:"Wolse conversion is a housing-cost structure change. Do not sign without title checks, fixed dates, and loan limits.",
    noteSub:"Put jeonse prices and conversion rates on one table. Next: conversion share and bank caps. Tenure mix shifts accumulate in household cash flow for years.",
    footer:"Jeonse · wolse" });

kpi("policy-supply-krre", "POLICY", "정책",
  "실거주·허가구역과 공급 속도 불일치가 전세 숫자와 다른 칸에서 이어집니다",
  "🏛", "정책",
  "집을 짓는 속도와 대출·허가로 막는 속도가 다르면 실수요만 힘들어질 수 있습니다. 전세 인상 통계와 정책을 한 신호로 합치지 마시기 바랍니다.",
  [
    { icon:"🏗️", big:"공급", mid:"입주·인허가", sub:"느린 시계" },
    { icon:"📋", big:"규제", mid:"실거주·구역", sub:"빠른 시계" },
    { icon:"🧮", big:"정합성", mid:"두 시계 대조", sub:"실수요 자금줄" },
  ],
  "공급 헤드라인으로 급매수하지 마시기 바랍니다. 입주 캘린더와 대출 규정을 한 표에 두시기 바랍니다.",
  "정책은 시나리오로만 적고 시행령 전 숫자를 확정으로 쓰지 마시기 바랍니다. 다음 확인은 입주 물량·규제 공고입니다. 장기적으로 공급 부족은 전세·매매 변동성을 키웁니다.",
  "정책 · 공급",
  { badge:"Policy", title:"Owner-occupancy / permit zones vs slow supply stay in a separate cell", heroIcon:"🏛", heroBig:"Policy",
    heroSub:"When building is slow and credit/permits are fast, owner-occupiers feel the squeeze. Do not merge with jeonse raise stats as one signal.",
    cards:[{icon:"🏗️",big:"Supply",mid:"Completions/permits",sub:"Slow clock"},{icon:"📋",big:"Rules",mid:"Occupancy/zones",sub:"Fast clock"},{icon:"🧮",big:"Fit",mid:"Compare clocks",sub:"Owner-occupier funding"}],
    quote:"Do not panic-buy off supply headlines. Put completion calendars and lending rules on one sheet.",
    noteSub:"Treat policy as scenarios until enforcement details print. Next: completion volumes and rule notices. Supply shortages raise multi-year jeonse/sale volatility.",
    footer:"Policy · supply" });

};
