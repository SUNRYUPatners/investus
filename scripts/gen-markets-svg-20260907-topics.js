/* KR / Safe / KR-RE topics for 2026-09-07 */
module.exports = function registerTopics(add) {

add('summary-kr', 'ROWS', 'KOSPI', {
  headline: '2026.09.07 한국장 한장 요약',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'+1.64%', title:'코스피가 9월 4일 6,687.21로 1.64% 올라 6,700선 재도전 관측권입니다', sub:'월요일 아침 브리핑은 지난 목요일 종가 기준입니다. 반도체·지주가 지수를 끌었습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'255,500', title:'삼성전자 +2.20%·하이닉스 +3.20%가 자사주·수요 기대로 동반 강세였습니다', sub:'삼성 자사주 15조 중 상당 진행(보도 약 37.2%), 하이닉스 ADR +8.14%·40조 자사주 계획이 겹쳤습니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'+1.7조', title:'9월 4일 외국인 5,034억·기관 1조 6,691억 순매수가 인용됐습니다', sub:'주간 외인·개인·기관 순매도 합 약 6.4조에도 자사주 기타법인이 하단 방패로 읽혔습니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'혼조', title:'엘지엔솔 -1.92%·현대차 보합·케이비 -3.32%로 업종 온도가 갈렸습니다', sub:'배터리 조정, 완성차 숨 고르기, 금리·금융주 민감도가 같은 날 겹쳤습니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'이번주', title:'생산자·소비자 물가, 9월 10일 옵션만기, 9월 15~16일 연준 회의가 이어집니다', sub:'할인율과 파생 포지션이 한 주에 겹치니 레버리지 크기를 먼저 정하시기 바랍니다.' },
  ],
  caption: '더 볼 것: 코스피 6687.21 +1.64% · 삼전 255500 · 하이닉스 1647000 · 외인·기관 순매수 · 물가·옵션·FOMC',
}, {
  headline: '2026.09.07 Korea Market Snapshot',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'+1.64%', title:'KOSPI closed 6,687.21 on Sep 4, up 1.64%, near a 6,700 retest', sub:'Monday briefing uses Thursday’s close. Semis and holding names led.' },
    { color:'#60a5fa', fill:'#0a1420', right:'255,500', title:'Samsung +2.20% and Hynix +3.20% rose on buybacks and demand hopes', sub:'Samsung ~15T buyback (~37.2% cited); Hynix ADR +8.14% and ~40T plan.' },
    { color:'#22d3ee', fill:'#06171c', right:'+1.7T', title:'Sep 4 foreign +503.4B and institutions +1.6691T won were cited', sub:'Weekly ~6.4T net selling still sat under a buyback other-corps floor.' },
    { color:'#f59e0b', fill:'#1a1205', right:'Mixed', title:'LGES -1.92%, Hyundai flat, KB -3.32% split sector tone', sub:'Battery pause, auto pause, and rate-sensitive banks in one session.' },
    { color:'#a78bfa', fill:'#120b1f', right:'Week', title:'PPI/CPI, Sep 10 options expiry, and FOMC Sep 15-16 follow', sub:'Discount rates and derivatives stack—set leverage size first.' },
  ],
  caption: 'Watch: KOSPI 6687.21 +1.64% · Samsung 255500 · Hynix 1647000 · flow · PPI/CPI · options · FOMC',
});

add('samsung-kr', 'L1', 'SEC', {
  badge: '삼성전자', title: '삼성전자 자사주가 수급 방패로 읽히며 지수와 함께 올라갔습니다',
  heroIcon: '📱', heroBig: '255,500',
  heroSub: '9월 4일 +2.20%입니다. 15조 원 자사주 중 상당이 진행됐고, 보도에 3일까지 약 37.2% 소화가 언급됐습니다.',
  cards: [
    { icon:'📈', big:'+2.20%', mid:'등락', sub:'9월 4일' },
    { icon:'🏦', big:'15조', mid:'자사주', sub:'진행 중' },
    { icon:'📊', big:'37.2%', mid:'소화율', sub:'보도 인용' },
  ],
  quote: '자사주는 회사가 자기 주식을 사 두는 환원입니다. 기타법인으로 잡히면 외국인 순매수와 겹쳐 수급이 좋아 보일 수 있습니다. 프로그램이 끝나면 그 방패도 얇아집니다.',
  noteSub: '2.20%는 시가총액 1위가 지수와 같은 방향으로 움직인 날입니다. 자사주는 수요가 아니라 유통 물량 완충입니다. 이번 주 물가·연준 전에 잔여 한도와 외국인 플로트를 같은 표에 두시기 바랍니다. 255,000원대 지지 여부를 다음 확인 포인트로 두시면 됩니다.',
  footer: '삼성전자 · 9월 4일',
}, {
  badge: 'Samsung', title: 'Samsung buybacks were read as a flow shield as the leader rose with the index',
  heroIcon: '📱', heroBig: '255,500',
  heroSub: 'Plus 2.20% on Sep 4. A large share of the ~15T won buyback is underway; ~37.2% through day 3 was cited.',
  cards: [
    { icon:'📈', big:'+2.20%', mid:'Move', sub:'Sep 4' },
    { icon:'🏦', big:'15T', mid:'Buyback', sub:'In progress' },
    { icon:'📊', big:'37.2%', mid:'Done', sub:'Cited' },
  ],
  quote: 'Treasury stock is the company buying its own shares. Booked as other corporations, it can make flows look stronger than foreign buying alone. When the program ends, the shield thins.',
  noteSub: 'Plus 2.20% moved with the index. Buybacks are float support, not demand. Pair remaining capacity with foreign flow before this week’s inflation prints and the FOMC. Watch the 255,000 won zone next.',
  footer: 'Samsung · Sep 4',
});

add('skhynix-kr', 'L2', 'HYNIX', {
  badge: 'SK하이닉스', title: '하이닉스가 예탁증권 강세와 자사주·메모리 기대로 지수보다 더 올랐습니다',
  heroIcon: '💾', heroBig: '+3.20%',
  heroSub: '종가 1,647,000원입니다. 미국예탁증권 +8.14% 보도, 40조 원대 자사주 계획, 오픈에이아이·메모리 수요 기대가 겹쳤습니다.',
  cards: [
    { label:'종가', big:'1,647,000', mid:'원', sub:'+3.20%' },
    { label:'ADR', big:'+8.14%', mid:'보도', sub:'해외 선행' },
    { label:'자사주', big:'40조', mid:'계획', sub:'진행' },
  ],
  detailHead: '왜 지수보다 강했나',
  detailLines: ['💾 고대역폭 메모리 성장주는 위험 선호 복귀에 베타가 큽니다','🌎 예탁증권 강세가 국내 종가에 선행했다는 보도가 있습니다','🏦 자사주 계획이 기타법인 완충으로 읽혔습니다'],
  noteSub: '3.20%는 삼성보다 큰 하루 상승입니다. 예탁증권과 국내 종가 괴리는 다음 세션 변동성입니다. 자사주는 만료가 있는 완충이고, 메모리 수요는 중기 서사입니다. 이번 주 할인율 일정에 고베타가 더 민감할 수 있으니 크기를 먼저 정하시기 바랍니다.',
  footer: '하이닉스 · 9월 4일',
}, {
  badge: 'SK Hynix', title: 'Hynix beat the index on ADR strength, buybacks, and memory hopes',
  heroIcon: '💾', heroBig: '+3.20%',
  heroSub: 'Close 1,647,000 won. ADR +8.14% was cited, a ~40T buyback plan continues, and memory-demand hopes added.',
  cards: [
    { label:'Close', big:'1,647,000', mid:'won', sub:'+3.20%' },
    { label:'ADR', big:'+8.14%', mid:'Reported', sub:'Offshore lead' },
    { label:'Buyback', big:'40T', mid:'Plan', sub:'Ongoing' },
  ],
  detailHead: 'Why it led the index',
  detailLines: ['💾 HBM growth names carry high beta when risk appetite returns','🌎 ADR strength can lead the local close','🏦 Buyback plans read as other-corps support'],
  noteSub: 'Plus 3.20% outpaced Samsung. ADR–local gaps can reverse next session. Buybacks expire; demand is medium-term. High beta is more sensitive to this week’s discount-rate calendar—set size first.',
  footer: 'Hynix · Sep 4',
});

add('kospi-flow-kr', 'L6', 'FLOW', {
  badge: '코스피', title: '주간 매도에도 자사주 방패가 받치며 6,700선 재도전 관측이 나왔습니다',
  breaking: '6,687 · 재도전 관측',
  heroBig: '6,687.21',
  heroSub: '9월 4일 +1.64% · 주간 순매도 합 약 6.4조 vs 기타법인 방패',
  grid: [
    { icon:'📉', big:'6.4조', mid:'주간 매도', sub:'외인·개인·기관' },
    { icon:'🏦', big:'자사주', mid:'기타법인', sub:'하단 방패' },
    { icon:'📈', big:'+5,034억', mid:'외인', sub:'9/4 하루' },
    { icon:'📊', big:'+1.67조', mid:'기관', sub:'9/4 하루' },
  ],
  ctx1: '하루 순매수와 주간 순매도를 같은 문장에 섞지 마시기 바랍니다.',
  ctx2: '이번 주 물가·옵션만기·연준이 6,700선 안착 여부를 가릅니다.',
  quote: '기타법인은 자사주·계열 매입을 포함하는 경우가 많습니다. 외국인이 팔아도 지수가 덜 빠질 수 있지만, 프로그램을 외국인 복귀로 오해하면 다음 급락에 당합니다.',
  noteSub: '6,687은 6,700선에 가까운 종가입니다. 재도전은 헤드라인이고 자동 돌파가 아닙니다. 수급 네 줄(외인·기관·개인·기타법인)을 분리해 적으시기 바랍니다. 옵션만기 주는 파생 헤지가 지수 변동성을 키울 수 있습니다.',
  footer: '코스피 · 수급',
}, {
  badge: 'KOSPI', title: 'Buyback shield held the floor as a 6,700 retest entered the chat',
  breaking: '6,687 · retest watch',
  heroBig: '6,687.21',
  heroSub: 'Sep 4 +1.64% · weekly ~6.4T net selling vs other-corps floor',
  grid: [
    { icon:'📉', big:'6.4T', mid:'Weekly sell', sub:'F/I/R' },
    { icon:'🏦', big:'Buyback', mid:'Other corps', sub:'Floor' },
    { icon:'📈', big:'+503B', mid:'Foreign', sub:'Sep 4' },
    { icon:'📊', big:'+1.67T', mid:'Inst', sub:'Sep 4' },
  ],
  ctx1: 'Do not merge one-day buying with weekly selling in one sentence.',
  ctx2: 'PPI/CPI, options expiry, and FOMC decide whether 6,700 sticks.',
  quote: 'Other corporations often include buybacks. The index can hold while foreigners sell—but do not mistake the program for a foreign return.',
  noteSub: '6,687 sits near 6,700. A retest headline is not an automatic breakout. Split four flow lines. Options week can lift index volatility via hedges.',
  footer: 'KOSPI · flows',
});

add('lges-kr', 'L3', 'SEC', {
  badge: 'LG에너지솔루션', title: '엘지엔솔이 배터리 업종 조정 속에 시가총액 6위권에서 쉬어 갔습니다',
  heroIcon: '🔋', heroBig: '-1.92%',
  heroSub: '9월 4일 358,500원입니다. 반도체 강세와 디커플이며, 전기차·저장장치 수주는 중기 변수입니다.',
  cards: [
    { icon:'📉', big:'358,500', mid:'원', sub:'-1.92%' },
    { icon:'📊', big:'6위권', mid:'시가총액', sub:'관찰' },
    { icon:'🔋', big:'배터리', mid:'업종', sub:'조정' },
  ],
  quote: '지수 +1.64%만 보면 배터리 조정을 놓칩니다. 시가총액 6위권 유지는 패시브·수급 체감에 영향을 줍니다. 하루 등락으로 순위를 단정하지 마시기 바랍니다.',
  noteSub: '1.92% 하락은 업종 베타와 수급이 먼저인 날입니다. 에너지저장장치는 전력·정책 사이클이라 전기차와 분리해 적으시기 바랍니다. 이번 주 할인율이 성장주를 누르면 2차전지도 같이 반응할 수 있습니다. 다음엔 수주·가동률을 확인하시면 됩니다.',
  footer: '엘지엔솔 · 9월 4일',
}, {
  badge: 'LGES', title: 'LG Energy Solution paused near sixth by market cap in a battery soft patch',
  heroIcon: '🔋', heroBig: '-1.92%',
  heroSub: '358,500 won on Sep 4. Decoupled from semis; EV and storage orders remain medium-term.',
  cards: [
    { icon:'📉', big:'358,500', mid:'won', sub:'-1.92%' },
    { icon:'📊', big:'~6th', mid:'Mkt cap', sub:'Watch' },
    { icon:'🔋', big:'Battery', mid:'Sector', sub:'Pause' },
  ],
  quote: 'Index strength can hide a battery soft patch. Sitting near sixth by market cap matters for passive feel. Do not settle rank on one session.',
  noteSub: 'Minus 1.92% is first sector beta and flow. Storage is a power-and-policy cycle—split it from EVs. If discount rates press growth this week, batteries can move with them. Next checks are orders and utilization.',
  footer: 'LGES · Sep 4',
});

add('hyundai-kr', 'L4', 'SEC', {
  badge: '현대차', badgeLine: '🚗 383,500원 · 보합',
  title: '현대차가 보합권에서 쉬며 오만 수소버스 등 모빌리티를 다음 재료로 남겼습니다',
  heroIcon: '🚗', heroBig: '보합',
  heroSub: '반도체·지주 강세일에 완성차는 숨 고르기입니다. 유가·금리·환율이 단기 변수이고, 수소·소프트웨어는 별도 트랙입니다.',
  cards: [
    { icon:'📈', big:'383,500', mid:'원', sub:'보합권' },
    { icon:'🚌', big:'오만', mid:'수소버스', sub:'모빌리티' },
    { icon:'🛢', big:'유가', mid:'금리', sub:'단기 변수' },
  ],
  quote: '보합은 큰 방향이 없었다는 뜻입니다. 모빌리티 헤드라인은 수주·인프라가 따라와야 실적입니다. 지수 강세를 완성차 추세 확정으로 바꾸지 마시기 바랍니다.',
  noteSub: '383,500원은 직전 반등 구간의 숨 고르기입니다. 고유가는 수요·물류를 누르고 금리는 할부에 영향을 줍니다. 오만 수소버스 이슈는 중기 수주 트랙으로 분리해 두시기 바랍니다. 다음엔 미국 판매와 유가 방향을 확인하시면 됩니다.',
  footer: '현대차 · 9월 4일',
}, {
  badge: 'Hyundai', badgeLine: '🚗 383,500 · flat',
  title: 'Hyundai paused flat while Oman hydrogen-bus mobility stayed on the watch list',
  heroIcon: '🚗', heroBig: 'Flat',
  heroSub: 'Autos rested while semis led. Oil, rates, and FX are near-term; hydrogen and software are separate tracks.',
  cards: [
    { icon:'📈', big:'383,500', mid:'won', sub:'Unchanged' },
    { icon:'🚌', big:'Oman', mid:'H2 bus', sub:'Mobility' },
    { icon:'🛢', big:'Oil', mid:'Rates', sub:'Near-term' },
  ],
  quote: 'Flat means no big direction. Mobility headlines need orders and infrastructure before they are earnings. Do not translate index strength into an auto trend.',
  noteSub: '383,500 is a pause after the prior bounce. Elevated oil weighs on demand and logistics; rates hit financing. Keep the Oman hydrogen-bus story on a medium-term order track. Next: US sales and oil.',
  footer: 'Hyundai · Sep 4',
});

add('kb-fin-kr', 'L5', 'RATES', {
  badge: 'KB금융', title: '케이비금융이 금리·금융주 민감도 속에 하루 -3.32% 조정을 받았습니다',
  heroIcon: '🏦', heroBig: '-3.32%',
  heroSub: '반도체 강세와 반대 방향입니다. 순이자마진 기대와 신용 비용·할인율 재가격이 동시에 움직인 날입니다.',
  before: { label:'직전 강세', big:'금융', sub:'금리 수혜 프레임' },
  after:  { label:'9/4', big:'-3.32%', sub:'되돌림' },
  cards: [
    { icon:'📉', big:'-3.32%', mid:'케이비', sub:'하루 등락' },
    { icon:'📊', big:'NIM', mid:'마진', sub:'금리 기대' },
    { icon:'📅', big:'FOMC', mid:'9/15-16', sub:'다음 스위치' },
  ],
  quote: '순이자마진은 대출 이자에서 예금 이자를 뺀 은행의 핵심 마진입니다. 금리가 「멈춘다/오른다」가 바뀌면 주가가 먼저 반응합니다. 하루 -3.32%는 분기 이익 확인이 아닙니다.',
  noteSub: '지수와 디커플이면 로테이션·청산이 겹친 날일 수 있습니다. 신용 비용은 마진 수혜의 반대편입니다. 이번 주 물가와 연준 회의가 국내 금융주 할인을 다시 정합니다. 낙폭만으로 추격 매수하지 마시기 바랍니다.',
  footer: '케이비금융 · 9월 4일',
}, {
  badge: 'KB Financial', title: 'KB took a -3.32% cut as rate sensitivity hit banks',
  heroIcon: '🏦', heroBig: '-3.32%',
  heroSub: 'Opposite semiconductor strength. NIM hopes and credit-cost/discount-rate repricing moved together.',
  before: { label:'Prior frame', big:'Banks', sub:'Rate-benefit' },
  after:  { label:'Sep 4', big:'-3.32%', sub:'Fade' },
  cards: [
    { icon:'📉', big:'-3.32%', mid:'KB', sub:'Session' },
    { icon:'📊', big:'NIM', mid:'Margin', sub:'Rate path' },
    { icon:'📅', big:'FOMC', mid:'Sep 15-16', sub:'Next switch' },
  ],
  quote: 'NIM is loan yield minus deposit cost. When hike-or-hold odds flip, bank stocks move first. Minus 3.32% is not an earnings print.',
  noteSub: 'Decoupling from the index can mean rotation and de-risking. Credit costs sit opposite NIM hopes. This week’s inflation prints and the FOMC reprice bank discounts—do not chase the drawdown alone.',
  footer: 'KB Financial · Sep 4',
});

add('summary-safe', 'ROWS', 'MACRO', {
  headline: '2026.09.07 안전자산 한장 요약',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'~79,818', title:'비트코인이 8만 달러 안팎에서 거래되며 주중 81,400 근접이 거론됐습니다', sub:'9월 6일 약 79,818달러입니다. 금과의 상관이 나스닥보다 높게 읽힙니다.' },
    { color:'#facc15', fill:'#1a1600', right:'50%+', title:'금·비트코인 90일 상관이 50%를 넘고 나스닥 상관은 약 33%입니다', sub:'위험온만으로 비트코인을 설명하기 어려운 구간입니다. 달러·금리 채널을 같이 보시면 됩니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'~50%', title:'월러 동결 기대 이후 인상 확률이 약 50% 안팎으로 재가격됐습니다', sub:'미국 장기국채와 실질금리가 같은 축입니다. 9월 15~16일 연준 회의가 확정 스위치입니다.' },
    { color:'#627eea', fill:'#0a0f24', right:'이더', title:'이더리움은 비트코인 베타가 큰 동행으로 같이 보시면 됩니다', sub:'알트 레버리지는 회의 전 청산이 먼저입니다. 현물 펀드 유입이 품질입니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'유가', title:'고유가가 인플레 변수로 남으며 동결 기대와 충돌할 수 있습니다', sub:'금·비트코인·장기국채가 같은 할인율 축에서 출렁일 수 있습니다.' },
  ],
  caption: '더 볼 것: 비트코인 약 8만 달러 · 금 상관 50%+ · 인상확률 ~50% · 이더 베타 · 유가 · FOMC 15-16',
}, {
  headline: '2026.09.07 Safe-haven Snapshot',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'~79,818', title:'Bitcoin trades near 80,000; week prints near 81,400 were cited', sub:'About 79,818 on Sep 6. Gold correlation reads higher than Nasdaq.' },
    { color:'#facc15', fill:'#1a1600', right:'50%+', title:'Gold–비트코인 90-day correlation above 50%; Nasdaq about 33%', sub:'Hard to explain bitcoin with risk-on alone—watch dollar and yields.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'~50%', title:'After Waller freeze talk, hike odds sit near 50%', sub:'TLT and real yields share the axis; FOMC Sep 15-16 is the switch.' },
    { color:'#627eea', fill:'#0a0f24', right:'Ether', title:'Ether remains high-beta companion to bitcoin', sub:'Alt leverage liquidates first into the meeting; ETF flow is quality.' },
    { color:'#f59e0b', fill:'#1a1205', right:'Oil', title:'Elevated oil stays an inflation variable that can clash with freeze hopes', sub:'Gold, bitcoin, and long bonds can swing on the same discount-rate axis.' },
  ],
  caption: 'Watch: 비트코인 약 8만 달러 · gold corr 50%+ · hike ~50% · ether beta · oil · FOMC 15-16',
});

add('btc-safe', 'L1', '비트코인', {
  badge: '비트코인', title: '비트코인이 8만 달러 안팎에서 금과의 상관이 나스닥보다 높게 읽힙니다',
  heroIcon: '₿', heroBig: '~79,818',
  heroSub: '주중 81,400달러 근접이 거론됐습니다. 금 90일 상관 50%+, 나스닥 상관 약 33%입니다.',
  cards: [
    { icon:'📈', big:'8만', mid:'심리선', sub:'안팎' },
    { icon:'🥇', big:'50%+', mid:'금 상관', sub:'90일' },
    { icon:'📊', big:'~33%', mid:'나스닥', sub:'상관' },
  ],
  quote: '금과의 상관이 높아지면 실질금리·달러 채널이 커집니다. 나스닥 상관 33%는 기술주 베타만으로 부족하다는 뜻입니다. 그래도 레버리지 청산 속도는 암호화폐입니다.',
  noteSub: '79,818달러는 8만 달러 바로 아래입니다. 동결 기대는 할인율을 낮추는 쪽으로 읽히지만 고유가가 뒤집을 수 있습니다. 현물 상장지수펀드 유입과 미결제약정을 가격과 따로 적으시기 바랍니다. 9월 15~16일 연준 회의 전 크기를 정하시기 바랍니다.',
  footer: '비트코인 · 9월 6일',
}, {
  badge: 'Bitcoin', title: 'Near 80,000, bitcoin’s gold correlation reads higher than Nasdaq',
  heroIcon: '₿', heroBig: '~79,818',
  heroSub: 'Week prints near 81,400 were cited. Gold 90-day corr 50%+; Nasdaq about 33%.',
  cards: [
    { icon:'📈', big:'80k', mid:'Round', sub:'Zone' },
    { icon:'🥇', big:'50%+', mid:'Gold corr', sub:'90d' },
    { icon:'📊', big:'~33%', mid:'Nasdaq', sub:'Corr' },
  ],
  quote: 'Higher gold correlation lifts the real-yield and dollar channel. Nasdaq near 33% weakens a pure tech-beta story. Liquidation speed is still crypto.',
  noteSub: 'About 79,818 sits just under 80,000. Freeze talk softens discount rates, but oil can flip the frame. Log ETF flows and open interest apart from the print. Set size before FOMC Sep 15-16.',
  footer: 'Bitcoin · Sep 6',
});

add('gold-safe', 'L2', 'GOLD', {
  badge: '금', title: '금이 비트코인과의 상관을 높이며 매크로 헤지 프레임으로 다시 묶입니다',
  heroIcon: '🥇', heroBig: '상관↑',
  heroSub: '90일 금·비트코인 상관 50%+가 거론됩니다. 실질금리·달러가 단기 1등 변수이고, 월러 동결 기대가 기회비용을 낮춥니다.',
  cards: [
    { label:'프레임', big:'헤지', mid:'안전자산', sub:'재묶임' },
    { label:'상관', big:'50%+', mid:'vs 비트코인', sub:'90일' },
    { label:'금리', big:'동결', mid:'기대', sub:'월러' },
  ],
  detailHead: '왜 금이 다시 묶이나',
  detailLines: ['🥇 실질금리가 내리면 이자를 안 주는 금의 기회비용이 줄어듭니다','₿ 비트코인과 상관이 높으면 달러·금리 채널이 공통입니다','🛢 고유가는 인플레 헤지와 긴축 기대를 동시에 키울 수 있습니다'],
  noteSub: '안전자산 프레임은 주식 베타와 다릅니다. 동결 기대를 확정 인하로 번역하지 마시기 바랍니다. 중앙은행 매수는 느린 수요이고, 단기 가격은 선물·펀드가 주도하는 경우가 많습니다. 연준 회의 전 분할이 기본입니다.',
  footer: '금 · 매크로 헤지',
}, {
  badge: 'Gold', title: 'Gold is rebundling with bitcoin as a macro-hedge frame',
  heroIcon: '🥇', heroBig: 'Corr↑',
  heroSub: '90-day gold–비트코인 correlation above 50% was cited. Real yields and the dollar lead; Waller freeze talk cuts opportunity cost.',
  cards: [
    { label:'Frame', big:'Hedge', mid:'Haven', sub:'Rebundle' },
    { label:'Corr', big:'50%+', mid:'vs 비트코인', sub:'90d' },
    { label:'Rates', big:'Freeze', mid:'Talk', sub:'Waller' },
  ],
  detailHead: 'Why gold rebundles',
  detailLines: ['🥇 Lower real yields cut the opportunity cost of holding gold','₿ Higher 비트코인 correlation means a shared dollar-yield channel','🛢 Elevated oil can lift inflation hedges and hike odds at once'],
  noteSub: 'A haven frame is not equity beta. Do not translate freeze talk into a cut. Official buying is slow; futures and funds often drive near-term prints. Scale in before the FOMC.',
  footer: 'Gold · macro hedge',
});

add('eth-safe', 'L3', '비트코인', {
  badge: '이더리움', title: '이더리움이 비트코인 8만 달러 안팎에 연동되며 알트 베타를 드러냈습니다',
  heroIcon: 'Ξ', heroBig: '베타',
  heroSub: '비트코인이 먼저 움직이면 이더가 따라오는 구간이 흔합니다. 스테이킹은 단기 금리와 비교하는 별도 줄입니다.',
  cards: [
    { icon:'₿', big:'8만', mid:'비트코인', sub:'기준선' },
    { icon:'📈', big:'연동', mid:'알트', sub:'베타' },
    { icon:'🏦', big:'스테이킹', mid:'vs 금리', sub:'기회비용' },
  ],
  quote: '이더리움은 스마트계약 네트워크의 기축 자산입니다. 단기에는 비트코인 베타가 크고, 중기에는 사용량·스테이킹이 붙습니다. 현물 펀드 유입이 없으면 베타 반등입니다.',
  noteSub: '금·비트코인 상관이 높아도 이더 청산 속도는 암호화폐입니다. 연준 회의 전 알트 레버리지는 비트코인보다 먼저 청산될 수 있습니다. 스테이킹 수익과 단기 국채를 나란히 적으시기 바랍니다. 다음엔 유입과 미결제약정을 보시면 됩니다.',
  footer: '이더리움 · 연동',
}, {
  badge: 'Ether', title: 'Ether shows alt beta as bitcoin holds the near-80,000 zone',
  heroIcon: 'Ξ', heroBig: 'Beta',
  heroSub: 'Bitcoin often leads and ether follows. Staking yield is a separate line versus short rates.',
  cards: [
    { icon:'₿', big:'80k', mid:'비트코인', sub:'Anchor' },
    { icon:'📈', big:'Track', mid:'Alt', sub:'Beta' },
    { icon:'🏦', big:'Staking', mid:'vs yields', sub:'Cost' },
  ],
  quote: 'Ether is the base asset of a smart-contract network. Near-term it is bitcoin beta; medium-term it is usage and staking. Without spot ETF flow, rallies are beta.',
  noteSub: 'Even with higher gold–비트코인 correlation, ether liquidates like crypto. Alt leverage can clear before bitcoin into the FOMC. Pair staking yield with short Treasuries. Next: flows and open interest.',
  footer: 'Ether · beta',
});

add('rates-tlt-safe', 'L4', 'RATES', {
  badge: '금리', badgeLine: '📉 인상확률 ~50% · 동결 기대',
  title: '월러 동결 기대 이후 인상 확률이 약 50%로 재가격됐습니다',
  heroIcon: '📉', heroBig: '~50%',
  heroSub: '미국 장기국채는 할인율 기대에 민감합니다. 9월 15~16일 연준 회의가 확정 스위치입니다.',
  cards: [
    { icon:'🗣️', big:'월러', mid:'동결', sub:'발언 맥락' },
    { icon:'📊', big:'~50%', mid:'인상확률', sub:'재가격' },
    { icon:'📜', big:'TLT', mid:'장기국채', sub:'민감' },
  ],
  quote: '동결은 기준금리를 유지한다는 뜻입니다. 인상 확률 50%는 방향이 반반이라는 의미에 가깝습니다. 하루 발언을 최종 결정으로 확장하지 마시기 바랍니다.',
  noteSub: '장기국채 가격은 금리가 내리면 오르는 경향이 있습니다. 금·비트코인과 같은 달러·금리 축에 묶여 있습니다. 고유가가 인플레를 키우면 동결 기대가 하루 만에 흔들릴 수 있습니다. 회의 전 듀레이션 레버리지를 키우지 마시기 바랍니다.',
  footer: '금리 · 장기국채',
}, {
  badge: 'Rates', badgeLine: '📉 hike odds ~50% · freeze talk',
  title: 'After Waller freeze talk, hike odds repriced near 50%',
  heroIcon: '📉', heroBig: '~50%',
  heroSub: 'Long Treasuries (TLT) are sensitive to the discount-rate path. FOMC Sep 15-16 is the switch.',
  cards: [
    { icon:'🗣️', big:'Waller', mid:'Freeze', sub:'Talk' },
    { icon:'📊', big:'~50%', mid:'Hike odds', sub:'Reprice' },
    { icon:'📜', big:'TLT', mid:'Long bond', sub:'Sensitive' },
  ],
  quote: 'A freeze means holding the policy rate. Odds near 50% mean the path is unresolved. Do not treat one speech as the final decision.',
  noteSub: 'Long-bond prices tend to rise when yields fall. They share a dollar-yield axis with gold and bitcoin. Elevated oil can shake freeze hopes in a day. Do not lever duration into the meeting.',
  footer: 'Rates · TLT',
});

add('oil-safe', 'L5', 'RATES', {
  badge: '유가', title: '고유가가 인플레 변수로 남으며 동결 기대와 충돌할 수 있습니다',
  heroIcon: '🛢', heroBig: '고유가',
  heroSub: '휘발유·항공·물류를 통해 기대 인플레를 붙듭니다. 금·비트코인·장기국채가 같은 할인율 축에서 출렁일 수 있습니다.',
  before: { label:'동결 기대', big:'완화', sub:'월러 맥락' },
  after:  { label:'유가', big:'인플레', sub:'충돌 가능' },
  cards: [
    { icon:'🛢', big:'고유가', mid:'인플레', sub:'꼬리' },
    { icon:'📉', big:'금리', mid:'경로', sub:'재가격' },
    { icon:'🥇', big:'금·비트코인', mid:'동축', sub:'할인율' },
  ],
  quote: '유가가 높게 유지되면 연준이 동결을 말해도 매파 해석이 붙을 수 있습니다. 「유가 상승 = 금 상승」으로 단순화하면 금리 상쇄를 놓칩니다.',
  noteSub: '한국은 에너지 수입국이라 유가·환율이 국내 물가 체감에 닿습니다. 재고·지정학·수요를 분리해 적으시기 바랍니다. 9월 15~16일 회의 전 유가는 확률표의 입력값입니다. 에너지 레버리지는 지정학 갭에 취약합니다.',
  footer: '유가 · 인플레 변수',
}, {
  badge: 'Oil', title: 'Elevated oil can clash with freeze hopes as an inflation variable',
  heroIcon: '🛢', heroBig: 'Elevated',
  heroSub: 'It keeps inflation expectations sticky via fuel and logistics. Gold, bitcoin, and long bonds share the discount-rate axis.',
  before: { label:'Freeze talk', big:'Ease', sub:'Waller' },
  after:  { label:'Oil', big:'Inflation', sub:'Clash risk' },
  cards: [
    { icon:'🛢', big:'Oil', mid:'Inflation', sub:'Tail' },
    { icon:'📉', big:'Rates', mid:'Path', sub:'Reprice' },
    { icon:'🥇', big:'Au/비트코인', mid:'Same axis', sub:'Discount' },
  ],
  quote: 'If oil stays high, even freeze talk can read hawkish. Do not simplify “oil up = gold up”—higher yields can offset.',
  noteSub: 'Korea imports energy, so oil and FX hit local inflation feel. Split inventories, geopolitics, and demand. Oil into FOMC is an input to the odds table. Energy leverage is gap-risk heavy.',
  footer: 'Oil · inflation variable',
});

add('summary-krre', 'ROWS', 'JEONSE', {
  headline: '2026.09.07 부동산 한장 요약',
  rows: [
    { color:'#fb923c', fill:'#1a0d02', right:'7.12억', title:'서울 평균 전세가 7억 1,178만 원으로 사상 최고를 새로 썼습니다', sub:'8월 말까지 전세지수는 연초 대비 약 +7.18%로 설명됩니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'-5.9%', title:'전세매물이 1만 9,904건으로 한 달 전보다 5.9% 줄었습니다', sub:'매물이 귀하면 보지 않고 계약하는 노룩계약 위험이 커집니다.' },
    { color:'#38bdf8', fill:'#061520', right:'전세>', title:'강남 3구에서 전세 상승률이 매매를 앞서는 구간이 뚜렷합니다', sub:'송파 전세 +8.90% 대비 매매 +5.63%가 대표 인용입니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'관망', title:'종부세·세제 개편은 관망이고 실거주 압력이 선택을 누릅니다', sub:'전세 최고가·매물 감소와 겹치면 빌려 살지 사야 할지 계산이 바뀝니다.' },
  ],
  caption: '더 볼 것: 서울 전세 7.1178억 ATH · 매물 19904 · 노룩 · 강남 전세>매매 · 세제 관망',
}, {
  headline: '2026.09.07 Korea Property Snapshot',
  rows: [
    { color:'#fb923c', fill:'#1a0d02', right:'711M', title:'Seoul average jeonse hit a record 711.78 million won', sub:'Jeonse index about +7.18% year-to-date through late August.' },
    { color:'#f59e0b', fill:'#1a1205', right:'-5.9%', title:'Jeonse listings fell to 19,904, down 5.9% month on month', sub:'Thin listings raise no-look contract risk.' },
    { color:'#38bdf8', fill:'#061520', right:'Jeonse>', title:'In Gangnam’s trio, jeonse gains outpace sale-price gains', sub:'Songpa jeonse +8.90% versus sale +5.63% is a cited gap.' },
    { color:'#a78bfa', fill:'#120b1f', right:'Watch', title:'Jongbu/tax reform stays wait-and-see under owner-occupancy pressure', sub:'Record jeonse and thin listings change the rent-versus-buy math.' },
  ],
  caption: 'Watch: Seoul jeonse ATH · listings 19904 · no-look · Gangnam jeonse>sale · tax watch',
});

add('jeonse-ath-krre', 'L1', 'JEONSE', {
  badge: '전세', title: '서울 평균 전세가 7억 1,178만 원으로 사상 최고를 새로 썼습니다',
  heroIcon: '🏠', heroBig: '7.1178억',
  heroSub: '8월 말까지 전세지수 연초 대비 약 +7.18%입니다. 평균이라 자치구·평형 체감은 다릅니다.',
  cards: [
    { icon:'📈', big:'ATH', mid:'평균 전세', sub:'서울' },
    { icon:'📊', big:'+7.18%', mid:'전세지수', sub:'YTD' },
    { icon:'💰', big:'보증금', mid:'부담↑', sub:'임차' },
  ],
  quote: '전세는 보증금을 맡기고 거주하는 임차 형태입니다. 평균 7억 1,178만 원은 묶어야 할 현금·대출 규모가 커졌다는 뜻입니다. 최고가 자체보다 계약서·보증이 실무입니다.',
  noteSub: '연초 대비 +7.18%는 누적 상승입니다. 전세가 오르면 월세 전환과 보증금 리스크가 같이 커집니다. 매매 대기 수요가 전세에 몰리면 상승이 연장될 수 있습니다. 평균 숫자를 우리 동네·평형에 대입해 보시기 바랍니다.',
  footer: '전세 · 서울 평균',
}, {
  badge: 'Jeonse', title: 'Seoul’s average jeonse hit a record 711.78 million won',
  heroIcon: '🏠', heroBig: '711.78M',
  heroSub: 'Jeonse index about +7.18% YTD through late August. Averages hide district and size gaps.',
  cards: [
    { icon:'📈', big:'ATH', mid:'Avg jeonse', sub:'Seoul' },
    { icon:'📊', big:'+7.18%', mid:'Index', sub:'YTD' },
    { icon:'💰', big:'Deposit', mid:'Burden↑', sub:'Tenant' },
  ],
  quote: 'Jeonse is a large refundable deposit lease. 711.78 million won means more cash and credit locked up. Contract quality and guarantees matter more than the headline print.',
  noteSub: 'Plus 7.18% YTD is cumulative. Higher jeonse lifts monthly-rent shifts and deposit risk. If buy-side demand parks in jeonse, gains can extend. Map the average onto your district and size.',
  footer: 'Jeonse · Seoul avg',
});

add('gangnam3-krre', 'L5', 'JEONSE', {
  badge: '강남', title: '강남 3구에서 전세 상승률이 매매를 앞서는 구간이 뚜렷합니다',
  heroIcon: '📍', heroBig: '전세>',
  heroSub: '송파 전세 +8.90% 대비 매매 +5.63%가 대표 인용입니다. 학군·직장 수요가 전세에 먼저 모일 수 있습니다.',
  before: { label:'매매', big:'+5.63%', sub:'송파 인용' },
  after:  { label:'전세', big:'+8.90%', sub:'송파 인용' },
  cards: [
    { icon:'📈', big:'+8.90%', mid:'전세', sub:'송파' },
    { icon:'🏠', big:'+5.63%', mid:'매매', sub:'송파' },
    { icon:'📍', big:'3구', mid:'강남', sub:'지표' },
  ],
  quote: '전세가 매매보다 빨리 오르면 「빌려 사는 비용」이 「사서 보유하는 가격」보다 가파른 것입니다. 매매 관망과 전세 급등이 공존할 수 있습니다.',
  noteSub: '강남 3구는 심리지표 역할이 큽니다. 전세가율(전세/매매)과 매물 건수를 같이 보시면 됩니다. 송파 숫자를 강남 전체로 성급히 확장하지 마시기 바랍니다. 다음엔 서초·강남 자치구 갭도 표로 남기시기 바랍니다.',
  footer: '강남 3구 · 전세>매매',
}, {
  badge: 'Gangnam', title: 'In Gangnam’s trio, jeonse gains are outpacing sale-price gains',
  heroIcon: '📍', heroBig: 'Jeonse>',
  heroSub: 'Songpa jeonse +8.90% versus sale +5.63% is a cited gap. School and job demand can hit jeonse first.',
  before: { label:'Sale', big:'+5.63%', sub:'Songpa cite' },
  after:  { label:'Jeonse', big:'+8.90%', sub:'Songpa cite' },
  cards: [
    { icon:'📈', big:'+8.90%', mid:'Jeonse', sub:'Songpa' },
    { icon:'🏠', big:'+5.63%', mid:'Sale', sub:'Songpa' },
    { icon:'📍', big:'Trio', mid:'Gangnam', sub:'Signal' },
  ],
  quote: 'When jeonse outruns sales, the cost of renting rises faster than owning. Sale hesitation and jeonse spikes can coexist.',
  noteSub: 'The Gangnam trio is a sentiment gauge. Track jeonse-to-sale ratios and listing counts. Do not extend Songpa to all three districts. Next, log Seocho and Gangnam gaps too.',
  footer: 'Gangnam trio · jeonse>sale',
});

add('listings-nolook-krre', 'L3', 'POLICY', {
  badge: '매물', title: '전세매물이 1만 9,904건으로 줄며 노룩계약 위험이 커집니다',
  heroIcon: '📭', heroBig: '19,904',
  heroSub: '전월 대비 5.9% 감소입니다. 매물이 귀하면 현장 확인 없이 계약하는 노룩계약 압력이 커집니다.',
  cards: [
    { icon:'📭', big:'19,904', mid:'전세매물', sub:'건' },
    { icon:'📉', big:'-5.9%', mid:'전월비', sub:'감소' },
    { icon:'⚠️', big:'노룩', mid:'계약', sub:'위험↑' },
  ],
  quote: '노룩계약은 집을 충분히 보지 않고 계약하는 관행입니다. 급하면 하자·권리관계·시세를 놓칩니다. 매물 실종은 가격만이 아니라 계약 품질 이슈입니다.',
  noteSub: '1만 9,904건은 고를 선택지가 줄었다는 뜻입니다. 집주인이 월세 전환·실거주·매매로 바꾸면 매물이 사라집니다. 등기·확정일자·보증 보험을 건너뛰지 마시기 바랍니다. 호가보다 권리관계 점검이 우선입니다.',
  footer: '전세매물 · 노룩',
}, {
  badge: 'Listings', title: 'Jeonse listings fell to 19,904, raising no-look contract risk',
  heroIcon: '📭', heroBig: '19,904',
  heroSub: 'Down 5.9% month on month. Thin supply raises pressure to sign without a proper viewing.',
  cards: [
    { icon:'📭', big:'19,904', mid:'Listings', sub:'Units' },
    { icon:'📉', big:'-5.9%', mid:'MoM', sub:'Drop' },
    { icon:'⚠️', big:'No-look', mid:'Deals', sub:'Risk↑' },
  ],
  quote: 'No-look contracts skip a full viewing. Rushing misses defects, title issues, and fair pricing. Thin listings are a contract-quality problem, not only a price story.',
  noteSub: '19,904 means fewer choices. Landlords shifting to monthly rent, owner-occupancy, or sales remove stock. Do not skip registry checks, fixed dates, and deposit insurance. Title beats asking price.',
  footer: 'Listings · no-look',
});

add('tax-policy-krre', 'L4', 'POLICY', {
  badge: '정책', badgeLine: '🏛 종부세·세제 관망 · 실거주',
  title: '종부세·세제 개편 관망과 실거주 압력이 전세·매매 선택을 누릅니다',
  heroIcon: '🏛', heroBig: '관망',
  heroSub: '최종 숫자 전 구간입니다. 전세 최고가·매물 감소와 겹치면 빌려 살지 사야 할지 계산이 바뀝니다.',
  cards: [
    { icon:'🧾', big:'종부세', mid:'관망', sub:'숫자 미확정' },
    { icon:'🔑', big:'실거주', mid:'압력', sub:'우대·요건' },
    { icon:'🏠', big:'전세', mid:'ATH', sub:'겹침' },
  ],
  quote: '관망은 아직 최종이 아니라는 뜻이지, 부담이 없다는 뜻이 아닙니다. 실거주 우대는 집주인의 전세 공급 선택에도 닿습니다.',
  noteSub: '국회·시행령 전 헤드라인을 확정으로 쓰지 마시기 바랍니다. 세제와 주담대 금리를 한 체감으로 섞지 말고 두 줄로 적으시기 바랍니다. 본인 공시가·명의·실거주로 고지서를 시뮬레이션하시기 바랍니다. 급매·급매수는 관망기에 특히 위험합니다.',
  footer: '부동산 · 세제 관망',
}, {
  badge: 'Policy', badgeLine: '🏛 tax watch · owner-occ',
  title: 'Jongbu/tax-reform watch and owner-occupancy pressure weigh on rent-versus-buy',
  heroIcon: '🏛', heroBig: 'Watch',
  heroSub: 'Numbers are not final. Overlap with record jeonse and thin listings changes the calculus.',
  cards: [
    { icon:'🧾', big:'Jongbu', mid:'Watch', sub:'Unfinal' },
    { icon:'🔑', big:'Owner-occ', mid:'Pressure', sub:'Rules' },
    { icon:'🏠', big:'Jeonse', mid:'ATH', sub:'Overlap' },
  ],
  quote: 'Wait-and-see means unsettled—not zero burden. Owner-occupancy preferences also shape whether landlords keep offering jeonse.',
  noteSub: 'Do not treat pre-Assembly headlines as law. Split tax policy from mortgage rates on two lines. Simulate your bill with assessed value, title, and occupancy. Rush buys and sales are especially risky in a watch window.',
  footer: 'RE · tax watch',
});

};
