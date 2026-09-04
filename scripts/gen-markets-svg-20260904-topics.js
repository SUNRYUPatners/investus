/* KR / Safe / KR-RE topics for 2026-09-04 */
module.exports = function registerTopics(add) {

add('summary-kr', 'ROWS', 'KOSPI', {
  headline: '2026.09.04 한국장 한장 요약',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'+0.26%', title:'코스피가 6,579.48로 0.26% 올라 강보합 마감했습니다', sub:'장중 고점 6,682.97과 저점 6,439.49로 하루 변동 폭이 243.48포인트였습니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'+1.6조', title:'기타법인이 1조 5,936억 원을 순매수하며 12거래일 연속 매수입니다', sub:'개인·외국인·기관은 순매도였고, 삼성전자 자사주와 하이닉스 소각 매입이 기타법인으로 잡혔습니다.' },
    { color:'#4ade80', fill:'#061209', right:'+5.2%', title:'엘지에너지솔루션 +5.18%·케이비금융 +5.20%가 지수를 받쳤습니다', sub:'삼성전자 25만 원(-0.20%), 하이닉스 159만 6천 원(-1.05%)은 약보합·하락이었습니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'1,359원', title:'원·달러가 9.4원 내린 1,359.3원으로 약 14개월 만의 저점권입니다', sub:'코스닥은 790.21로 1.71% 내렸고, 이란 관련 소문에 오후 급락 뒤 반등했습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'9/4', title:'오늘 밤 미국 8월 고용, 9월 15~16일 연준 회의가 다음 변수입니다', sub:'전날 유가·금리 충격 다음 날 지수는 회복했지만 장중 출렁임은 남았습니다.' },
  ],
  caption: '더 볼 것: 코스피 6579.48 +0.26% · 기타법인 +1.6조 · 엘지엔솔 +5.18% · 환율 1359.3원 · 고용 발표',
}, {
  headline: '2026.09.04 Korea Market Snapshot',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'+0.26%', title:'KOSPI closed 6,579.48, up 0.26%', sub:'Intraday range 6,682.97 to 6,439.49 — a 243.48-point swing.' },
    { color:'#22d3ee', fill:'#06171c', right:'+1.6T', title:'Other corporations bought 1.5936 trillion won, a 12th straight day', sub:'Individuals, foreigners, and institutions sold; Samsung treasury and Hynix buybacks booked as other corps.' },
    { color:'#4ade80', fill:'#061209', right:'+5.2%', title:'LG Energy Solution +5.18% and KB Financial +5.20% held the index', sub:'Samsung 250,000 (-0.20%), SK Hynix 1,596,000 (-1.05%).' },
    { color:'#f59e0b', fill:'#1a1205', right:'1,359', title:'Won at 1,359.3 per dollar, down 9.4, near a 14-month low for USD/KRW', sub:'KOSDAQ 790.21 (-1.71%); an afternoon dump on Iran rumors then a rebound.' },
    { color:'#60a5fa', fill:'#0a1420', right:'9/4', title:'US August payrolls tonight; FOMC Sept 15-16 next', sub:'The index recovered after the oil-rate shock, but the intraday range stayed wide.' },
  ],
  caption: 'Watch: KOSPI 6579.48 +0.26% · other corps +1.6T · LGES +5.18% · FX 1359.3 · NFP',
});

add('samsung-kr', 'L1', 'SEC', {
  badge: '삼성전자', title: '삼성전자 자사주가 기타법인으로 잡히며 지수와 디커플됐습니다',
  heroIcon: '📱', heroBig: '250,000',
  heroSub: '기타법인 자사주 매입이 수급을 받쳤지만 종가는 약보합입니다. 장중 이란 관련 소문에 출렁인 뒤 되돌렸습니다.',
  cards: [
    { icon:'📉', big:'-0.20%', mid:'등락', sub:'25만 원' },
    { icon:'🏦', big:'자사주', mid:'기타법인', sub:'임직원 보상' },
    { icon:'📊', big:'6,579', mid:'코스피', sub:'+0.26%' },
  ],
  quote: '지수가 오르는데 시가총액 1위가 내리면 수급이 종목별로 갈린 날입니다. 자사주는 회사가 자기 주식을 사 두는 것이고, 기타법인 집계로 잡힙니다. 외국인·기관 순매도와 반대 방향입니다.',
  noteSub: '0.20%는 전날 급락 다음 날의 숨 고르기입니다. 자사주가 받쳐 줘도 외국인이 계속 팔면 종가는 약할 수 있습니다. 오늘 밤 미국 고용과 다음 주 연준 회의 전에 수급 세 줄을 같은 표에 두시기 바랍니다.',
  footer: '삼성전자 · 9월 3일',
}, {
  badge: 'Samsung', title: 'Samsung treasury buys left the market leader diverging from the index',
  heroIcon: '📱', heroBig: '250,000',
  heroSub: 'Other-corp treasury buys supported flows, but the close was slightly red after an Iran-rumor swing.',
  cards: [
    { icon:'📉', big:'-0.20%', mid:'Move', sub:'250,000 won' },
    { icon:'🏦', big:'Buyback', mid:'Other corps', sub:'Employee stock' },
    { icon:'📊', big:'6,579', mid:'KOSPI', sub:'+0.26%' },
  ],
  quote: 'When the index rises and the largest name falls, flows split by ticker. Treasury stock is the company buying its own shares, booked as other corporations—opposite foreigners and institutions.',
  noteSub: 'Minus 0.20% is a pause after the prior crash. Buybacks can still lose to foreign selling. Log three flow lines before tonight’s payrolls and next week’s FOMC.',
  footer: 'Samsung · Sept 3',
});

add('skhynix-kr', 'L2', 'HYNIX', {
  badge: 'SK하이닉스', title: '하이닉스 소각 매입이 기타법인에 잡혔지만 성장주는 추가 조정됐습니다',
  heroIcon: '💾', heroBig: '-1.05%',
  heroSub: '자사주 소각 목적 매입이 기타법인 순매수에 포함됐습니다. 성장주 베타가 장중 급락 구간에 더 크게 반응했습니다.',
  cards: [
    { label:'종가', big:'1,596,000', mid:'원', sub:'-1.05%' },
    { label:'소각', big:'자사주', mid:'매입', sub:'기타법인' },
    { label:'지수', big:'+0.26%', mid:'코스피', sub:'디커플' },
  ],
  detailHead: '왜 지수와 달랐나',
  detailLines: ['💾 고대역폭 메모리 성장주는 금리·유가에 베타가 큽니다','🏦 소각 매입은 유통 물량을 줄이는 환원입니다','📉 오후 급락 때 낙폭이 삼성전자보다 컸습니다'],
  noteSub: '소각은 사들인 주식을 없애 남은 주식의 가치를 높이는 절차입니다. 하루 -1.05%는 그 효과를 가리지 못합니다. 다음엔 외국인 순매도와 고대역폭 메모리 출하를 분리해 보시면 됩니다.',
  footer: '하이닉스 · 9월 3일',
}, {
  badge: 'SK Hynix', title: 'Hynix cancellation buybacks sat in other-corps while growth took another cut',
  heroIcon: '💾', heroBig: '-1.05%',
  heroSub: 'Treasury purchases for cancellation sat inside other-corp buying. Growth beta amplified the afternoon dump.',
  cards: [
    { label:'Close', big:'1,596,000', mid:'won', sub:'-1.05%' },
    { label:'Cancel', big:'Buyback', mid:'Treasury', sub:'Other corps' },
    { label:'Index', big:'+0.26%', mid:'KOSPI', sub:'Decouple' },
  ],
  detailHead: 'Why it lagged the index',
  detailLines: ['💾 HBM growth names carry higher oil-and-rate beta','🏦 Cancellation buybacks shrink float','📉 The afternoon dump hit harder than Samsung'],
  noteSub: 'Cancellation retires shares to lift remaining value. A one-day -1.05% does not erase that. Split foreign selling from HBM shipments on the next print.',
  footer: 'Hynix · Sept 3',
});

add('lges-kr', 'L3', 'SEC', {
  badge: 'LG에너지솔루션', title: '엘지엔솔이 공시 없이 에너지저장·태양광 맥락으로 반등했습니다',
  heroIcon: '🔋', heroBig: '+5.18%',
  heroSub: '뚜렷한 호재 공시는 없었습니다. 하나증권 목표주가 48만 원, 에너지저장·태양광 맥락이 거론됐습니다.',
  cards: [
    { icon:'📈', big:'365,500', mid:'원', sub:'+5.18%' },
    { icon:'🎯', big:'480,000', mid:'목표가', sub:'리서치' },
    { icon:'☀️', big:'저장', mid:'태양광', sub:'수요 맥락' },
  ],
  quote: '에너지저장장치는 태양광·풍력 전기를 모아 두는 대형 배터리입니다. 목표주가 48만 원은 증권사 의견이지 회사 가이던스가 아닙니다. 공시 없이 오른 날은 수급·업종 베타를 먼저 적으시면 됩니다.',
  noteSub: '5.18%는 시가총액 상위 가운데 두드러진 상승입니다. 다음 확인할 것은 수주·가동률과 전날 급락 되돌림인지입니다. 유가 90달러대가 원가에 미치는 영향은 별도 줄로 두시기 바랍니다.',
  footer: '엘지엔솔 · 9월 3일',
}, {
  badge: 'LGES', title: 'LG Energy Solution led a battery rebound on storage talk without a filing',
  heroIcon: '🔋', heroBig: '+5.18%',
  heroSub: 'No clear positive filing. A 480,000-won research target and energy-storage/solar demand were the context.',
  cards: [
    { icon:'📈', big:'365,500', mid:'won', sub:'+5.18%' },
    { icon:'🎯', big:'480,000', mid:'Target', sub:'Research' },
    { icon:'☀️', big:'Storage', mid:'Solar', sub:'Demand' },
  ],
  quote: 'Energy storage is grid-scale batteries for solar and wind. 480,000 won is a sell-side target, not guidance. A rally without a filing is first a flow and sector-beta day.',
  noteSub: 'Plus 5.18% stood out among large caps. Next checks are orders, utilization, and whether this is only a bounce from the prior crash. Oil near $90 is a separate cost line.',
  footer: 'LGES · Sept 3',
});

add('hyundai-kr', 'L4', 'SEC', {
  badge: '현대차', badgeLine: '🚗 +1.46% · 383,500원',
  title: '현대차가 원화 강세와 유가 90달러대 사이에서 되돌렸습니다',
  heroIcon: '🚗', heroBig: '+1.46%',
  heroSub: '전날 유가 충격 급락 다음 날 운송장비 업종이 지수보다 강했습니다. 미국 사이버캡 행사와는 수요·규제 축이 다릅니다.',
  cards: [
    { icon:'📈', big:'383,500', mid:'원', sub:'+1.46%' },
    { icon:'🏭', big:'운송', mid:'업종', sub:'+2.69%' },
    { icon:'🛢', big:'WTI', mid:'90달러대', sub:'원가 변수' },
  ],
  quote: '완성차는 유가·금리·환율을 동시에 받습니다. 1.46%는 전날 낙폭을 일부 되돌린 수준입니다. 로보택시 헤드라인은 국내 판매·수출과 분리해 적으시기 바랍니다.',
  noteSub: '환율 1,359원은 수출 채산성에 우호적일 수 있습니다. 다만 유가 90달러대는 소비 심리와 물류비를 누릅니다. 분기 미국 판매와 국내 대기 수요를 다음 실적에서 확인하시면 됩니다.',
  footer: '현대차 · 9월 3일',
}, {
  badge: 'Hyundai', badgeLine: '🚗 +1.46% · 383,500 won',
  title: 'Hyundai bounced between a stronger won and oil still above 90',
  heroIcon: '🚗', heroBig: '+1.46%',
  heroSub: 'Transport equipment outperformed the day after the oil-shock crash. The US Cybercab event is a separate demand and regulatory axis.',
  cards: [
    { icon:'📈', big:'383,500', mid:'won', sub:'+1.46%' },
    { icon:'🏭', big:'Transport', mid:'Sector', sub:'+2.69%' },
    { icon:'🛢', big:'WTI', mid:'$90s', sub:'Cost' },
  ],
  quote: 'Autos take oil, rates, and FX at once. Plus 1.46% only partly retraces the prior drop. Keep robotaxi headlines off the Korea sales line.',
  noteSub: 'Won at 1,359 can help export margins. Oil in the $90s still weighs on demand and logistics. Confirm US sales and domestic backlog in the next print.',
  footer: 'Hyundai · Sept 3',
});

add('kb-fin-kr', 'L5', 'FLOW', {
  badge: 'KB금융', title: '금리 인상 기대가 되살아나며 금융주가 로테이션됐습니다',
  heroIcon: '🏦', heroBig: '+5.20%',
  heroSub: '신한지주 +3.62%, 하나금융 +3.41%, 삼성생명 +3.06%로 금융주가 동반 강세였습니다. 미국 금리 인상 기대가 순이자마진 이야기로 읽혔습니다.',
  before: { label:'전일', big:'169,100', sub:'종가 참고' },
  after:  { label:'9/3', big:'177,900', sub:'+5.20%' },
  cards: [
    { icon:'📈', big:'+5.20%', mid:'케이비', sub:'177,900원' },
    { icon:'🏦', big:'+3.6%', mid:'신한', sub:'금융 업종' },
    { icon:'📊', big:'3.40%', mid:'금융업', sub:'업종 등락' },
  ],
  quote: '순이자마진은 대출 이자에서 예금 이자를 뺀 은행의 핵심 마진입니다. 금리가 더 오를 수 있다는 기대가 나오면 은행주가 먼저 반응합니다. 5.20%는 하루 급등이지 실적 확인이 아닙니다.',
  noteSub: '금리 수혜는 신용 비용이 같이 오르면 상쇄됩니다. 고용 지표가 약하면 인상 기대가 꺾여 금융주가 되돌릴 수 있습니다. 오늘 밤 비농업 고용과 연체율을 같은 화면에 두시기 바랍니다.',
  footer: '케이비금융 · 9월 3일',
}, {
  badge: 'KB Financial', title: 'Hike expectations revived and rotated money into banks led by KB Financial',
  heroIcon: '🏦', heroBig: '+5.20%',
  heroSub: 'Shinhan +3.62%, Hana +3.41%, Samsung Life +3.06%. Hike odds were read as net-interest-margin support.',
  before: { label:'Prior', big:'169,100', sub:'Close ref' },
  after:  { label:'Sept 3', big:'177,900', sub:'+5.20%' },
  cards: [
    { icon:'📈', big:'+5.20%', mid:'KB', sub:'177,900 won' },
    { icon:'🏦', big:'+3.6%', mid:'Shinhan', sub:'Banks' },
    { icon:'📊', big:'3.40%', mid:'Finance', sub:'Sector' },
  ],
  quote: 'NIM is loan yield minus deposit cost. Hike talk can reprice banks before earnings. Plus 5.20% is one session, not a print.',
  noteSub: 'Rate gains fade if credit costs rise with them. Soft payrolls can unwind hike odds and bank stocks. Pair tonight’s jobs print with delinquency data.',
  footer: 'KB Financial · Sept 3',
});

add('summary-safe', 'ROWS', 'MACRO', {
  headline: '2026.09.04 안전자산 한장 요약',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'81,254', title:'비트코인이 8만 1,254달러로 5.11% 오르며 8만 달러를 회복했습니다', sub:'거래 범위는 약 7만 6,930~8만 2,280달러였습니다. 금·은과 같은 날 반등했습니다.' },
    { color:'#facc15', fill:'#1a1600', right:'~4,470', title:'금이 온스당 약 4,470달러 부근으로 반등했습니다', sub:'전날 저점 약 4,282달러에서 되돌렸고, 달러 약세·금리 기대 완화가 겹쳤습니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'~66.8', title:'은이 온스당 약 66.8달러로 올랐습니다', sub:'산업 수요와 금 연동이 같이 움직인 날입니다. 금만 보지 마시기 바랍니다.' },
    { color:'#627eea', fill:'#0a0f24', right:'~2,400', title:'이더리움이 약 2,400달러, 고유 2,429·저 2,356달러 구간이었습니다', sub:'비트코인 베타가 큰 날입니다. 스테이킹 수익은 별도 줄입니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'$91.01', title:'서부텍사스유가 91.01달러(+0.88%), 달러지수 약 99.6입니다', sub:'서비스 구매관리자지수 55.4, 민간고용 +3.8만 명, 오늘 밤 비농업 고용이 공통 변수입니다.' },
  ],
  caption: '더 볼 것: 비트코인 81254 · 금 4470달러 · 은 66.8 · 이더 2400 · 유가 91.01 · 고용 발표',
}, {
  headline: '2026.09.04 Safe-haven Snapshot',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'81,254', title:'Bitcoin closed 81,254 dollars, up 5.11%, reclaiming 80,000', sub:'Range about 76,930–82,280. Gold and silver bounced the same session.' },
    { color:'#facc15', fill:'#1a1600', right:'~4,470', title:'Gold recovered toward about 4,470 dollars an ounce', sub:'Bounce from roughly 4,282; softer dollar and cooler hike talk helped.' },
    { color:'#94a3b8', fill:'#0f1419', right:'~66.8', title:'Silver near 66.8 dollars an ounce', sub:'Industrial demand plus gold beta. Do not track gold alone.' },
    { color:'#627eea', fill:'#0a0f24', right:'~2,400', title:'Ether about 2,400 dollars (high 2,429 / low 2,356)', sub:'High bitcoin beta; staking yield is a separate line.' },
    { color:'#f59e0b', fill:'#1a1205', right:'$91.01', title:'WTI 91.01 (+0.88%), dollar index about 99.6', sub:'ISM services 55.4, ADP +38k, nonfarm payrolls tonight.' },
  ],
  caption: 'Watch: BTC 81254 · gold ~4470 · silver ~66.8 · ETH ~2400 · WTI 91.01 · NFP',
});

add('btc-safe', 'L1', 'BTC', {
  badge: '비트코인', title: '비트코인이 8만 달러를 되찾았고 오늘 밤 고용이 지지선을 시험합니다',
  heroIcon: '₿', heroBig: '81,254',
  heroSub: '저점 약 7만 6,930달러, 고점 약 8만 2,280달러입니다. 금 반등과 같은 날 위험자산·헤지가 같이 올랐습니다.',
  cards: [
    { icon:'📈', big:'+5.11%', mid:'등락', sub:'종가권' },
    { icon:'📉', big:'76,930', mid:'저점', sub:'달러' },
    { icon:'📊', big:'82,280', mid:'고점', sub:'달러' },
  ],
  quote: '5.11%는 전날 조정 다음 날의 큰 되돌림입니다. 8만 달러는 심리적 기준선입니다. 현물 상장지수펀드 유입과 청산은 가격과 따로 적으셔야 합니다.',
  noteSub: '고용 지표가 강하면 금리가 다시 올라 비트코인이 되돌릴 수 있습니다. 한국 기사 일부는 7만 7천 달러를 인용하니, 거래소 종가를 기준으로 두시기 바랍니다. 다음엔 유입·미결제약정·달러지수를 보시면 됩니다.',
  footer: '비트코인 · 9월 3일',
}, {
  badge: 'Bitcoin', title: 'Bitcoin reclaimed 80,000 dollars; payrolls test the line tonight',
  heroIcon: '₿', heroBig: '81,254',
  heroSub: 'Low about 76,930, high about 82,280. Gold rallied the same day—risk and haven bounced together.',
  cards: [
    { icon:'📈', big:'+5.11%', mid:'Move', sub:'Close' },
    { icon:'📉', big:'76,930', mid:'Low', sub:'USD' },
    { icon:'📊', big:'82,280', mid:'High', sub:'USD' },
  ],
  quote: 'Plus 5.11% is a large bounce after the prior dip. 80,000 is a round-number line. ETF flows and liquidations belong on a separate row from the print.',
  noteSub: 'A hot jobs print can lift yields and fade bitcoin. Some Korea copy still cites 77,000—use the exchange close. Next: flows, open interest, and the dollar index.',
  footer: 'Bitcoin · Sept 3',
});

add('gold-safe', 'L2', 'GOLD', {
  badge: '금', title: '달러 약세와 인상 기대 완화로 금이 전날 저점에서 되돌아왔습니다',
  heroIcon: '🥇', heroBig: '~4,470',
  heroSub: '장중 4,511달러까지 거론됐고, 전날 저점은 약 4,282달러였습니다. 달러 약세와 인상 기대 완화가 겹쳤습니다.',
  cards: [
    { label:'현물', big:'~4,470', mid:'달러/온스', sub:'반등' },
    { label:'저점', big:'~4,282', mid:'전날', sub:'되돌림' },
    { label:'달러', big:'99.6', mid:'지수', sub:'약세' },
  ],
  detailHead: '왜 금이 올랐나',
  detailLines: ['🥇 실질금리가 내리면 이자를 안 주는 금의 기회비용이 줄어듭니다','💵 달러가 약하면 비달러 매수에 유리합니다','🛢 유가 90달러대는 인플레 헤지 수요도 남깁니다'],
  noteSub: '4,470달러는 거래 시간대마다 다릅니다. 고용·물가가 다시 매파로 읽히면 반등이 짧을 수 있습니다. 은·유가와 같은 표에 두시되, 금만의 중앙은행 매수 요인을 한 줄 남기시기 바랍니다.',
  footer: '금 · 9월 3일',
}, {
  badge: 'Gold', title: 'A softer dollar pulled gold back from the prior-session plunge low',
  heroIcon: '🥇', heroBig: '~4,470',
  heroSub: 'Intraday prints near 4,511 were cited; the prior low was about 4,282. A softer dollar and cooler hike talk helped.',
  cards: [
    { label:'Spot', big:'~4,470', mid:'USD/oz', sub:'Bounce' },
    { label:'Low', big:'~4,282', mid:'Prior', sub:'Retrace' },
    { label:'DXY', big:'99.6', mid:'Index', sub:'Softer' },
  ],
  detailHead: 'Why gold bounced',
  detailLines: ['🥇 Lower real yields cut the opportunity cost of holding gold','💵 A softer dollar helps non-US buyers','🛢 Oil in the $90s keeps an inflation-hedge bid'],
  noteSub: '4,470 depends on the timestamp. A hawkish jobs or CPI print can fade the bounce. Keep silver and oil on the same sheet, plus a line for official-sector buying.',
  footer: 'Gold · Sept 3',
});

add('silver-safe', 'L3', 'GOLD', {
  badge: '은', title: '은이 금보다 큰 폭으로 움직이며 산업·헤지가 동시에 붙었습니다',
  heroIcon: '⚪', heroBig: '~66.8',
  heroSub: '장중 67.60달러까지 거론된 뒤 숨 고르기입니다. 산업 수요와 금 연동이 동시에 작용합니다.',
  cards: [
    { icon:'📈', big:'~66.8', mid:'달러/온스', sub:'현물' },
    { icon:'🥇', big:'금', mid:'연동', sub:'헤지' },
    { icon:'🏭', big:'산업', mid:'수요', sub:'태양광·전자' },
  ],
  quote: '은은 귀금속이면서 산업 금속입니다. 금만 보고 은을 추격하면, 공장 수요가 꺾일 때 더 크게 빠질 수 있습니다. 66달러 회복은 전날 65달러대에서 올라온 숫자입니다.',
  noteSub: '금은비(금 가격을 은으로 나눈 값)가 벌어지면 은이 소외된 것입니다. 고용 전후 변동성이 금보다 클 수 있으니 레버리지를 보수적으로 두시기 바랍니다.',
  footer: '은 · 9월 3일',
}, {
  badge: 'Silver', title: 'Silver moved harder than gold as industrial and haven flows hit together',
  heroIcon: '⚪', heroBig: '~66.8',
  heroSub: 'Prints toward 67.60 were cited before a pause. Industrial demand and gold beta moved together.',
  cards: [
    { icon:'📈', big:'~66.8', mid:'USD/oz', sub:'Spot' },
    { icon:'🥇', big:'Gold', mid:'Beta', sub:'Haven' },
    { icon:'🏭', big:'Industry', mid:'Demand', sub:'Solar · electronics' },
  ],
  quote: 'Silver is both a precious and an industrial metal. Chasing it off gold alone can overshoot when factory demand fades. 66 dollars is a reclaim from the mid-65s.',
  noteSub: 'A widening gold-silver ratio means silver is lagging. Volatility around payrolls can exceed gold—size down leverage.',
  footer: 'Silver · Sept 3',
});

add('eth-safe', 'L4', 'BTC', {
  badge: '이더리움', badgeLine: 'Ξ 약 2,400달러',
  title: '이더리움이 비트코인 반등에 연동되며 2,500달러 아래에서 거래됐습니다',
  heroIcon: 'Ξ', heroBig: '~2,400',
  heroSub: '고점 약 2,429달러, 저점 약 2,356달러입니다. 스테이킹 수익은 2년물 국채와 비교하는 별도 줄입니다.',
  cards: [
    { icon:'📈', big:'~2,400', mid:'달러', sub:'거래' },
    { icon:'📈', big:'2,429', mid:'고점', sub:'달러' },
    { icon:'📉', big:'2,356', mid:'저점', sub:'달러' },
  ],
  quote: '이더리움은 스마트계약 네트워크의 기축 자산입니다. 단기에는 비트코인 베타가 크고, 중기에는 네트워크 사용량·스테이킹이 붙습니다. 2,400달러는 2,500달러 심리선 아래입니다.',
  noteSub: '비트코인 5.11%와 이더 등락을 같은 비율로 보지 마시기 바랍니다. 고용 전 알트 레버리지는 청산이 먼저 나옵니다. 다음엔 현물 이더 상장지수펀드 유입을 확인하시면 됩니다.',
  footer: '이더리움 · 9월 3일',
}, {
  badge: 'Ether', badgeLine: 'Ξ about $2,400',
  title: 'Ether tracked bitcoin while still trading below the 2,500 line',
  heroIcon: 'Ξ', heroBig: '~2,400',
  heroSub: 'High about 2,429, low about 2,356. Staking yield is a separate line versus the two-year Treasury.',
  cards: [
    { icon:'📈', big:'~2,400', mid:'USD', sub:'Trade' },
    { icon:'📈', big:'2,429', mid:'High', sub:'USD' },
    { icon:'📉', big:'2,356', mid:'Low', sub:'USD' },
  ],
  quote: 'Ether is the base asset of a smart-contract network. Near-term it is bitcoin beta; medium-term it is usage and staking. 2,400 sits below the 2,500 round number.',
  noteSub: 'Do not scale ether one-for-one with bitcoin’s 5.11%. Alt leverage liquidates first into payrolls. Next check is spot ether ETF flow.',
  footer: 'Ether · Sept 3',
});

add('wti-nfp-safe', 'L5', 'RATES', {
  badge: '유가', title: '유가가 90달러를 지키는 가운데 서비스 확장과 오늘 밤 고용이 겹칩니다',
  heroIcon: '🛢', heroBig: '91.01',
  heroSub: '브렌트 95.63달러(+1.04%), 달러지수 약 99.6입니다. 민간고용은 3만 8천 명 증가였습니다.',
  before: { label:'예상', big:'54.3', sub:'서비스 지수' },
  after:  { label:'실제', big:'55.4', sub:'8월' },
  cards: [
    { icon:'🛢', big:'91.01', mid:'서부텍사스', sub:'+0.88%' },
    { icon:'📊', big:'55.4', mid:'서비스', sub:'전월 54.1' },
    { icon:'📅', big:'고용', mid:'오늘 밤', sub:'8월 비농업' },
  ],
  quote: '구매관리자지수 55.4는 확장을 뜻합니다. 지불가격 지수가 72.6으로 높으면 인플레 압력이 서비스에 남아 있습니다. 유가가 90달러를 지키면 금리 기대가 쉽게 내려가지 않습니다.',
  noteSub: '민간고용 3만 8천 명은 정부 비농업 고용과 표본이 다릅니다. 오늘 밤 숫자가 강하면 달러·금리가 다시 오를 수 있습니다. 비트코인·금 반등이 고용 하나로 뒤집힐 수 있으니 포지션 크기를 먼저 정하시기 바랍니다.',
  footer: '유가 · 고용 대기',
}, {
  badge: 'Oil', title: 'WTI holds above 90 as services expand and payrolls land tonight',
  heroIcon: '🛢', heroBig: '91.01',
  heroSub: 'Brent 95.63 (+1.04%), dollar index about 99.6. ADP added 38,000 jobs.',
  before: { label:'Exp', big:'54.3', sub:'Services PMI' },
  after:  { label:'Print', big:'55.4', sub:'August' },
  cards: [
    { icon:'🛢', big:'91.01', mid:'WTI', sub:'+0.88%' },
    { icon:'📊', big:'55.4', mid:'Services', sub:'vs 54.1' },
    { icon:'📅', big:'NFP', mid:'Tonight', sub:'August jobs' },
  ],
  quote: '55.4 means expansion. Prices-paid at 72.6 keeps services inflation alive. Oil holding $90 makes it harder for hike odds to fade.',
  noteSub: 'ADP +38k is not the government payrolls print. A hot number can lift the dollar and yields again. Bitcoin and gold bounces can reverse on one jobs line—set size first.',
  footer: 'Oil · payrolls wait',
});

add('summary-krre', 'ROWS', 'POLICY', {
  headline: '2026.09.04 부동산 한장 요약',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'12억', title:'비거주 1주택 종합부동산세 공제가 12억 원으로 유지됩니다', sub:'9억으로 낮추는 안이 철회됐습니다. 실거주 공제는 14억 원입니다.' },
    { color:'#fb923c', fill:'#1a0d02', right:'150%', title:'세부담 상한이 150%로 남고, 부부 공동명의 비거주는 6억 원씩입니다', sub:'200%로 올리는 안이 아닙니다. 국회 심사가 남아 있습니다.' },
    { color:'#38bdf8', fill:'#061520', right:'ISA', title:'개인종합자산관리계좌 혜택이 원안대로 복구되는 방향입니다', sub:'양도세 장기보유특별공제는 2029년 보유기간 공제 폐지·거주는 연 8%입니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'+3.44조', title:'5년 세수 효과 +3.44조 원은 유지된다는 설명입니다', sub:'오늘 밤 미국 고용이 주담대 금리 심리에 겹칩니다.' },
  ],
  caption: '더 볼 것: 종부세 12억 유지 · 실거주 14억 · 상한 150% · 계좌 복구 · 양도 장특 · 세수 3.44조',
}, {
  headline: '2026.09.04 Korea Property Snapshot',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'12억', title:'Non-resident one-home comprehensive tax deduction stays at 1.2 billion won', sub:'The cut to 0.9 billion was withdrawn. Owner-occupier deduction is 1.4 billion.' },
    { color:'#fb923c', fill:'#1a0d02', right:'150%', title:'Tax-increase cap stays 150%; joint non-resident names get 0.6 billion each', sub:'Not a rise to 200%. The National Assembly still reviews the bill.' },
    { color:'#38bdf8', fill:'#061520', right:'ISA', title:'Individual savings-account benefits are restored toward the original plan', sub:'Capital-gains long-hold relief still ends holding-period credit in 2029; occupancy stays 8% a year.' },
    { color:'#f59e0b', fill:'#1a1205', right:'+3.44T', title:'Five-year revenue of +3.44 trillion won is kept', sub:'US payrolls tonight overlay mortgage-rate sentiment.' },
  ],
  caption: 'Watch: 1.2bn deduction stays · 1.4bn owner-occ · 150% cap · ISA restore · CGT · +3.44T',
});

add('jongbu-12eok-krre', 'L1', 'POLICY', {
  badge: '종부세', title: '비거주 1주택 종합부동산세 공제가 12억 원으로 유지됩니다',
  heroIcon: '🏠', heroBig: '12억',
  heroSub: '9억 원으로 낮추려던 안이 국무회의에서 조정됐습니다. 실거주 공제는 14억 원입니다.',
  cards: [
    { icon:'🏠', big:'12억', mid:'비거주', sub:'1주택 공제' },
    { icon:'🔑', big:'14억', mid:'실거주', sub:'공제' },
    { icon:'👫', big:'6억×2', mid:'공동명의', sub:'비거주' },
  ],
  quote: '종합부동산세는 고가 주택에 매기는 보유세입니다. 공제가 12억이면 과세 표준이 그만큼 줄어듭니다. 실거주 14억은 실제로 사는 집에 더 큰 공제를 줍니다.',
  noteSub: '유지라는 말은 강화안이 완화된 것이지, 세금이 없어진다는 뜻이 아닙니다. 국회에서 숫자가 다시 바뀔 수 있습니다. 공시가격·공정시장가액비율과 함께 실제 고지서를 계산하시기 바랍니다.',
  footer: '부동산 · 종부세 공제',
}, {
  badge: 'Property tax', title: 'The non-resident one-home comprehensive tax deduction stays at 1.2 billion won',
  heroIcon: '🏠', heroBig: '1.2bn',
  heroSub: 'The cut to 0.9 billion was eased in cabinet. Owner-occupier deduction is 1.4 billion.',
  cards: [
    { icon:'🏠', big:'1.2bn', mid:'Non-resident', sub:'One home' },
    { icon:'🔑', big:'1.4bn', mid:'Owner-occ', sub:'Deduction' },
    { icon:'👫', big:'0.6×2', mid:'Joint', sub:'Non-resident' },
  ],
  quote: 'Comprehensive real-estate tax is a wealth tax on expensive homes. A 1.2 billion deduction shrinks the tax base. 1.4 billion for owner-occupiers is a larger shield for homes people live in.',
  noteSub: 'Keeping 1.2 billion is a softening of a tighter draft—not a repeal. The Assembly can still change the number. Compute the bill with assessed value and the fair-market ratio.',
  footer: 'RE · comprehensive tax',
});

add('isa-restore-krre', 'L3', 'POLICY', {
  badge: '계좌', title: '개인종합자산관리계좌 혜택이 원안대로 돌아가는 방향입니다',
  heroIcon: '💼', heroBig: 'ISA',
  heroSub: '세제 개편에서 줄였던 혜택을 되돌리는 조정입니다. 부동산 직접 규제와 금융 저축 유인을 같이 보는 줄입니다.',
  cards: [
    { icon:'💼', big:'복구', mid:'혜택', sub:'원안' },
    { icon:'🏦', big:'저축', mid:'유인', sub:'금융' },
    { icon:'🏠', big:'부동산', mid:'보유세', sub:'같은 패키지' },
  ],
  quote: '개인종합자산관리계좌는 예금·펀드를 한 계좌에 모아 세제 혜택을 주는 상품입니다. 혜택이 줄면 시중 자금이 부동산으로 쏠릴 수 있다는 지적이 있었습니다. 원상복구는 그 경로를 다시 열어 주는 조정입니다.',
  noteSub: '계좌 한도와 비과세 한도가 얼마로 확정되는지를 시행령에서 확인하시기 바랍니다. 종부세 12억 유지와 같은 패키지이므로, 한쪽만 보고 자금 이동을 단정하지 마시기 바랍니다.',
  footer: '부동산 · 계좌 복구',
}, {
  badge: 'ISA', title: 'Individual savings-account tax benefits are being restored toward the original plan',
  heroIcon: '💼', heroBig: 'ISA',
  heroSub: 'A walk-back of tighter savings-account rules in the same tax package as property levies.',
  cards: [
    { icon:'💼', big:'Restore', mid:'Benefits', sub:'Original' },
    { icon:'🏦', big:'Saving', mid:'Incentive', sub:'Financial' },
    { icon:'🏠', big:'Property', mid:'Holdings tax', sub:'Same package' },
  ],
  quote: 'An ISA wraps deposits and funds with a tax wrapper. Cutting it can push cash into property. Restoring it reopens that financial channel.',
  noteSub: 'Confirm contribution and tax-free caps in the decree. It sits in the same package as keeping the 1.2 billion comprehensive-tax deduction—do not model flows from one line alone.',
  footer: 'RE · ISA restore',
});

add('yangdo-krre', 'L4', 'JEONSE', {
  badge: '양도세', badgeLine: '📅 2029 · 보유기간 공제 폐지',
  title: '양도소득세 장기보유특별공제는 원안대로 2029년 보유기간 공제를 없앱니다',
  heroIcon: '📜', heroBig: '2029',
  heroSub: '거주 공제는 연 8%로 남습니다. 세부담 상한 150%와 5년 세수 +3.44조 원이 같은 설명입니다.',
  cards: [
    { icon:'📅', big:'2029', mid:'보유공제', sub:'폐지' },
    { icon:'🏠', big:'연 8%', mid:'거주', sub:'공제 유지' },
    { icon:'📊', big:'150%', mid:'상한', sub:'세부담' },
  ],
  quote: '장기보유특별공제는 오래 가진 집을 팔 때 세금을 깎아 주는 제도입니다. 보유기간 공제가 사라지면 투자 목적 매각의 세후 수익률이 낮아집니다. 실거주 연 8%는 실제로 산 기간만 우대합니다.',
  noteSub: '2029년은 아직 멀지만, 매각 시점을 미루는 유인이 됩니다. 상한 150%는 전년 대비 보유세가 한 해에 1.5배를 넘지 못하게 막는 장치입니다. 국회 통과 전 숫자를 확정으로 쓰지 마시기 바랍니다.',
  footer: '부동산 · 양도 장특',
}, {
  badge: 'CGT', badgeLine: '📅 2029 · holding credit ends',
  title: 'Long-hold capital-gains relief still ends the holding-period credit in 2029',
  heroIcon: '📜', heroBig: '2029',
  heroSub: 'Occupancy credit stays 8% a year. The 150% tax-increase cap and +3.44 trillion won five-year revenue sit in the same brief.',
  cards: [
    { icon:'📅', big:'2029', mid:'Hold credit', sub:'Ends' },
    { icon:'🏠', big:'8%/yr', mid:'Occupy', sub:'Stays' },
    { icon:'📊', big:'150%', mid:'Cap', sub:'Tax rise' },
  ],
  quote: 'Long-hold relief cuts tax when you sell a house you kept. Ending the holding-period credit lowers after-tax returns on investor sales. The 8% occupancy credit only rewards years lived in the home.',
  noteSub: '2029 is distant but it can delay listings. A 150% cap stops the holding tax from jumping more than 1.5 times in a year. Do not treat Assembly-pending figures as law.',
  footer: 'RE · CGT long-hold',
});

};
