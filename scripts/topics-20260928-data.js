// 2026-09-28 SVG topic data — screenshot facts, beginner Korean
// Layout mix: ROWS×1 L1×4 L2×3 L3×3 L4×3 L5×3 L6×1 (총 18)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.28 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'98%', title:'노르웨이 새 차의 98%가 전기차라는 화면이 올랐고 모델Y가 그 나라의 기준 차로 남았습니다',
      sub:'월간 공식은 8월 배터리 전기 98.7%입니다. 모델Y +300%는 화면 주장입니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'RTX 5500', title:'중국이 알리바바·바이트댄스에 엔비디아 RTX 프로 5500을 풀 수 있다는 소식이 나왔습니다',
      sub:'바이트댄스가 약 100만 장을 검토한다는 설명이 붙었습니다. 연말 출하입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'21:15', title:'스타십 14번째 비행이 오늘 밤 동부 8시 15분, 한국 밤 9시 15분에 창을 엽니다',
      sub:'항공당국 면허는 26일 개정본입니다. 스타링크 3세대 26기가 첫 유료 화물입니다.' },
    { color:'#ff9900', fill:'#1a0e00', right:'$30B', title:'제프 베이조스가 블루 오리진에 2000년부터 약 300억 달러를 넣었다는 집계가 나왔습니다',
      sub:'스페이스X는 같은 화면에서 650회 이상 착륙과 100억 달러 비상장 가치로 대비됐습니다.' },
    { color:'#fb7185', fill:'#1a0a10', right:'보상', title:'그록 봇 창작자 보상이 격주로 열리고 2주에 500달러 예시가 찍혔습니다',
      sub:'엑스 게시가 두 배 이상이어야 하고, 엑스 머니로 받습니다.' },
    { color:'#94a3b8', fill:'#111827', right:'$30.66T', title:'세계 시총 상위 10곳이 30.66조 달러로 커졌고 스페이스X가 7위에 있습니다',
      sub:'엔비디아 5.434조, 애플 4.977조, 스페이스X 1.958조 달러입니다.' },
    { color:'#4ade80', fill:'#061209', right:'471k', title:'테슬라 3분기 인도가 47만 1천 대를 넘을지가 예측 시장에 올라 있습니다',
      sub:'2분기는 공식 48만 126대입니다. 마감은 10월 2일 동부 자정입니다.' },
  ],
  caption: '더 볼 것: 노르웨이 98% · 중국 RTX 5500 · 스타십 21:15 · 블루 300억 · 그록 보상 · 시총 30.66조 · 인도 47.1만',
}, {
  headline: '2026.09.28 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'98%', title:'A screen said 98% of new cars in Norway are electric, with Model Y still the default',
      sub:'Official August BEVs were 98.7%. The +300% Model Y claim is social, not the monthly file.' },
    { color:'#60a5fa', fill:'#0a1420', right:'RTX 5500', title:'China may let Alibaba and ByteDance buy NVIDIA RTX Pro 5500 cards',
      sub:'ByteDance was said to look at about 1 million units. Shipments were put in late December.' },
    { color:'#c084fc', fill:'#140b1f', right:'21:15', title:'Starship Flight 14 opens tonight at 8:15 a.m. EDT, 9:15 p.m. in Korea',
      sub:'The aviation license was revised on the 26th. Twenty-six Starlink V3s are the first paid cargo.' },
    { color:'#ff9900', fill:'#1a0e00', right:'$30B', title:'Jeff Bezos was tallied as putting about $30 billion into Blue Origin since 2000',
      sub:'The same screen put SpaceX at 650-plus landings and a $10 billion private mark.' },
    { color:'#fb7185', fill:'#1a0a10', right:'Pay', title:'Grok Bot creator rewards opened every two weeks, with a $500 example',
      sub:'Posts on X must at least double, and payouts run through X Money.' },
    { color:'#94a3b8', fill:'#111827', right:'$30.66T', title:'The world’s top 10 market caps rose to $30.66 trillion, with SpaceX in seventh',
      sub:'NVIDIA $5.434T, Apple $4.977T, SpaceX $1.958T.' },
    { color:'#4ade80', fill:'#061209', right:'471k', title:'A prediction market asked if Tesla Q3 deliveries would clear 471,000',
      sub:'Official Q2 was 480,126. The market closes at midnight EDT on October 2.' },
  ],
  caption: 'Watch: Norway 98% · China RTX 5500 · Starship 21:15 · Blue $30B · Grok pay · $30.66T · 471k',
});

add('norway-ev-98', 'L1', 'TSLA', {
  badge: '테슬라', title: '노르웨이 새 차의 98%가 전기차라는 화면이 올랐고 모델Y가 그 나라의 기준 차로 남았습니다',
  heroIcon: '\u{1F697}', heroBig: '98%',
  heroSub: '화면은 올해 새 차의 98%가 전기차이고 모델Y가 300% 앞선다고 적었습니다. 월간 공식은 8월 배터리 전기 98.7%입니다.',
  cards: [
    { icon:'\u{1F4CA}', big:'98.7%', mid:'8월 공식은 배터리 전기 98.7%입니다', sub:'새 승용 1만 3,451대 중 거의 전부가 배터리 전기입니다' },
    { icon:'\u{1F3C6}', big:'연간 1위', mid:'테슬라는 올해 누적 브랜드 1위입니다', sub:'8월 한 달은 627대, 점유 4.7%로 7위입니다' },
    { icon:'\u{1F698}', big:'Y 19위', mid:'8월 모델Y는 19위, 전년보다 89.7% 줄었습니다', sub:'화면의 +300%는 월간 공식과 다릅니다' },
  ],
  quote: '전기차 나라라는 큰 그림은 공식과 맞습니다. 모델Y가 올해 300% 앞선다는 한 줄은 화면 주장입니다.',
  noteHead: '왜 중요한가', noteSub: '한 나라가 거의 전부 전기차면 모델Y가 기본 가족차가 됩니다. 8월은 숨 고른 달입니다. 다음에 볼 것은 9월 월말 공식입니다.',
  footer: '테슬라 · 노르웨이 98%',
}, {
  badge: 'TSLA', title: 'A screen said 98% of new cars in Norway are electric, with Model Y still the default',
  heroIcon: '\u{1F697}', heroBig: '98%',
  heroSub: 'The post said 98% of new cars this year are electric and Model Y leads by 300%. Official August BEVs were 98.7%.',
  cards: [
    { icon:'\u{1F4CA}', big:'98.7%', mid:'August official BEVs were 98.7%', sub:'Almost all of 13,451 new cars were battery-electric' },
    { icon:'\u{1F3C6}', big:'YTD #1', mid:'Tesla is still the year-to-date brand leader', sub:'August was 627 cars and 4.7%, seventh for the month' },
    { icon:'\u{1F698}', big:'Y #19', mid:'August Model Y ranked 19th, down 89.7%', sub:'The +300% line is not the monthly file' },
  ],
  quote: 'The EV-country picture matches the official file. The 300% Model Y lead is a social claim.',
  noteHead: 'Why it matters', noteSub: 'When a country is almost all electric, Model Y is the default family car. August was a pause. Next, watch the official September file.',
  footer: 'Tesla · Norway 98%',
});

add('nvda-china-rtx5500', 'L2', 'NVDA', {
  badge: '엔비디아', title: '중국이 알리바바·바이트댄스에 엔비디아 RTX 프로 5500을 풀 수 있다는 소식이 나왔습니다',
  heroIcon: '\u{1F5A5}', heroBig: 'RTX 5500',
  heroSub: 'RTX 프로 5500은 블랙웰 세대 업무용 그래픽 카드입니다. 데이터센터 최상위 연결망 칩은 아닙니다.',
  cards: [
    { label:'수요', big:'100만', mid:'바이트댄스가 약 100만 장을 검토한다는 설명입니다', sub:'확인된 발주는 아닙니다' },
    { label:'출하', big:'12월', mid:'늦은 12월 출하로 적혔습니다', sub:'중국 분기는 약 50만 장으로 거론됩니다' },
    { label:'가격', big:'13,000달러', mid:'장당 약 8만~9만 위안입니다', sub:'달러로 약 1만 3천 달러입니다' },
  ],
  detailHead: '화면이 말해 주는 것',
  detailLines: [
    '알리바바와 바이트댄스에 제한 판매가 거론됩니다',
    '84기가바이트 메모리, 쿠다 코어 2만 1,760개입니다',
    '최상위 데이터센터 연결망은 빠집니다',
  ],
  quote: '중국 창구가 다시 열리면 매출 칸이 생기지만, 최상위 가속기와는 다른 제품입니다.',
  noteHead: '왜 중요한가', noteSub: '막혔던 중국 창구가 일부라도 열리면 엔비디아 매출이 다시 붙습니다. 허가와 출하가 나와야 숫자가 됩니다. 다음에 볼 것은 12월 선적입니다.',
  footer: '엔비디아 · 중국 RTX 5500',
}, {
  badge: 'NVDA', title: 'China may let Alibaba and ByteDance buy NVIDIA RTX Pro 5500 cards',
  heroIcon: '\u{1F5A5}', heroBig: 'RTX 5500',
  heroSub: 'The RTX Pro 5500 is a Blackwell workstation card. It is not a top data-center interconnect chip.',
  cards: [
    { label:'Demand', big:'1M', mid:'ByteDance was said to look at about 1 million', sub:'Not a confirmed order' },
    { label:'Ship', big:'Dec', mid:'Shipments were put in late December', sub:'China run-rate was cited near 500k a quarter' },
    { label:'Price', big:'$13k', mid:'About 80,000–90,000 yuan a card', sub:'Near $13,000' },
  ],
  detailHead: 'What the screen says',
  detailLines: [
    'Limited sales to Alibaba and ByteDance were discussed',
    '84GB memory and 21,760 CUDA cores',
    'Top data-center interconnect is not included',
  ],
  quote: 'A reopened China window adds a sales lane, but this is not the top accelerator.',
  noteHead: 'Why it matters', noteSub: 'Even a partial China window puts NVIDIA sales back on the page. Permits and shipments make the number real. Next, watch December loads.',
  footer: 'NVIDIA · China RTX 5500',
});

add('burry-ai-dotcom', 'L4', 'MACRO', {
  badge: '매크로', title: '마이클 버리가 인공지능 설비 지출을 닷컴 거품과 겹쳐 보여 줬습니다',
  badgeLine: '설비 · 거품 비교',
  heroIcon: '\u{1F4C9}', heroBig: '닷컴',
  heroSub: '설비 지출은 공장과 칩에 쓰는 큰돈입니다. 화면은 지금 인공지능 투자가 2000년 전후 통신·인터넷 투자와 닮았다고 그렸습니다.',
  cards: [
    { icon:'\u{1F4B0}', big:'설비', mid:'칩과 데이터센터에 돈이 몰립니다', sub:'매출이 따라오는지는 다음입니다' },
    { icon:'\u{1F4CA}', big:'2000', mid:'닷컴 때는 통신망에 돈이 몰렸습니다', sub:'수요가 늦게 온 구간이 있었습니다' },
    { icon:'\u{1F441}', big:'의견', mid:'한 투자자의 비교입니다', sub:'공식 전망이 아닙니다' },
  ],
  quote: '돈이 먼저 가고 쓰임이 늦게 오면 주가가 쉬기도 합니다. 반대로 쓰임이 따라오면 설비는 몇 년의 엔진이 됩니다.',
  noteHead: '왜 중요한가', noteSub: '설비 숫자가 커질수록 다음 실적이 그 돈을 받쳐 줘야 합니다. 비교 한 장입니다. 다음에 볼 것은 데이터센터 가동과 소프트웨어 매출입니다.',
  footer: '매크로 · 인공지능 설비',
}, {
  badge: 'MACRO', title: 'Michael Burry overlaid AI capex on the dot-com spend wave',
  badgeLine: 'Capex · bubble',
  heroIcon: '\u{1F4C9}', heroBig: 'Dot-com',
  heroSub: 'Capex is big money for plants and chips. The screen drew today’s AI spend next to the late-1990s telecom wave.',
  cards: [
    { icon:'\u{1F4B0}', big:'Capex', mid:'Money is piling into chips and halls', sub:'Revenue still has to follow' },
    { icon:'\u{1F4CA}', big:'2000', mid:'Dot-com money piled into networks', sub:'Demand arrived late in places' },
    { icon:'\u{1F441}', big:'View', mid:'One investor’s overlay', sub:'Not an official forecast' },
  ],
  quote: 'If spend leads and use lags, prices can rest. If use catches up, the plants become a multi-year engine.',
  noteHead: 'Why it matters', noteSub: 'As capex swells, the next earnings have to carry it. This is one overlay. Next, watch hall utilization and software sales.',
  footer: 'Macro · AI capex',
});

add('nasdaq-23x-pe', 'L5', 'MACRO', {
  badge: '나스닥', title: '나스닥 100 향후 이익 배수가 23배로, 전체 시장 19배보다 높게 찍혔습니다',
  heroIcon: '\u{1F4C8}', heroBig: '23배',
  heroSub: '향후 이익 배수는 앞으로 1년 이익으로 주가를 나눈 값입니다. 화면은 나스닥 100이 23배, 에스앤피 500이 19배입니다.',
  before: { label: '전체 시장', big: '19배', sub:'에스앤피 500 향후 이익 배수입니다' },
  after: { label: '기술 100', big: '23배', sub:'나스닥 100이 더 비싸게 찍혔습니다' },
  cards: [
    { icon:'\u{1F4CA}', big:'15배', mid:'동일가중과 중형주는 15배입니다', sub:'큰 기술주가 평균을 끌어올립니다' },
    { icon:'\u{1F4C9}', big:'23배', mid:'러셀 2000도 23배로 찍혔습니다', sub:'작은 회사도 비싸 보이는 구간입니다' },
    { icon:'\u{1F4C5}', big:'NTM', mid:'앞으로 12개월 이익 기준입니다', sub:'지난 이익이 아닙니다' },
  ],
  quote: '같은 23배라도 이익이 빨리 늘면 부담이 줄고, 늘지 않으면 부담이 커집니다.',
  noteHead: '왜 중요한가', noteSub: '기술주가 시장보다 비싸면 실적이 따라와야 가격이 버팁니다. 한 장의 비교입니다. 다음에 볼 것은 다음 분기 이익입니다.',
  footer: '나스닥 · 23배',
}, {
  badge: 'NASDAQ', title: 'The Nasdaq 100 printed 23 times next-twelve-month earnings, above the 19 times S&P 500',
  heroIcon: '\u{1F4C8}', heroBig: '23x',
  heroSub: 'NTM P/E divides price by the next year of earnings. The screen put the Nasdaq 100 at 23x and the S&P 500 at 19x.',
  before: { label: 'Broad', big: '19x', sub:'S&P 500 next-twelve-month multiple' },
  after: { label: 'Tech 100', big: '23x', sub:'The Nasdaq 100 screened richer' },
  cards: [
    { icon:'\u{1F4CA}', big:'15x', mid:'Equal-weight and midcaps printed 15x', sub:'Mega tech lifts the average' },
    { icon:'\u{1F4C9}', big:'23x', mid:'The Russell 2000 also printed 23x', sub:'Smaller names look rich too' },
    { icon:'\u{1F4C5}', big:'NTM', mid:'It uses the next twelve months', sub:'Not last year’s earnings' },
  ],
  quote: 'The same 23x eases if earnings grow fast, and bites if they do not.',
  noteHead: 'Why it matters', noteSub: 'If tech is richer than the market, earnings have to follow. This is one exhibit. Next, watch the next quarter of profits.',
  footer: 'Nasdaq · 23x',
});

add('apollo-agentic-run', 'L3', 'MACRO', {
  badge: '매크로', title: '아폴로가 인공지능 에이전트가 예금을 한꺼번에 옮기는 은행 인출을 경고했습니다',
  heroIcon: '\u{1F3E6}', heroBig: '에이전트',
  heroSub: '에이전트는 사람 대신 일을 실행하는 인공지능입니다. 화면은 그런 프로그램이 예금을 초 단위로 옮길 수 있다고 적었습니다.',
  cards: [
    { icon:'\u{23F1}', big:'초 단위', mid:'이체가 사람 손보다 빨라집니다', sub:'창구 줄이 사라집니다' },
    { icon:'\u{1F4B3}', big:'예금', mid:'싼 예금이 한꺼번에 빠져나갈 수 있습니다', sub:'은행 자금 칸이 흔들립니다' },
    { icon:'\u{1F6E1}', big:'완충', mid:'현금과 담보가 더 필요해집니다', sub:'규제 논의가 붙습니다' },
  ],
  quote: '사람이 줄을 서는 인출이 아니라, 프로그램이 동시에 옮기는 인출입니다. 아직 일어난 사고가 아니라 경고입니다.',
  noteHead: '왜 중요한가', noteSub: '예금이 초 단위로 움직이면 은행은 더 두꺼운 현금을 쌓아야 합니다. 경고 한 장입니다. 다음에 볼 것은 규제 초안과 실제 이체 속도입니다.',
  footer: '매크로 · 에이전트 인출',
}, {
  badge: 'MACRO', title: 'Apollo warned that AI agents could trigger a bank run by moving deposits at once',
  heroIcon: '\u{1F3E6}', heroBig: 'Agent',
  heroSub: 'An agent is AI that executes work for a person. The screen said such programs could move deposits in seconds.',
  cards: [
    { icon:'\u{23F1}', big:'Seconds', mid:'Transfers outrun a human teller', sub:'The queue disappears' },
    { icon:'\u{1F4B3}', big:'Deposits', mid:'Cheap deposits could leave together', sub:'Bank funding can wobble' },
    { icon:'\u{1F6E1}', big:'Buffer', mid:'More cash and collateral would be needed', sub:'Rule talks follow' },
  ],
  quote: 'This is not a teller line. It is programs moving money together. It is a warning, not an accident that already happened.',
  noteHead: 'Why it matters', noteSub: 'If deposits move in seconds, banks need thicker cash. This is one warning. Next, watch draft rules and real transfer speed.',
  footer: 'Macro · agent run',
});

add('spacex-10b-efficiency', 'L2', 'SPCX', {
  badge: '스페이스X', title: '스페이스X가 650회 이상 착륙과 스타링크 1천만으로 자본 효율을 보여 줬다는 화면이 올랐습니다',
  heroIcon: '\u{1F680}', heroBig: '$10B',
  heroSub: '화면은 비상장 가치를 약 100억 달러로 적었습니다. 같은 장에 650회 이상 착륙과 스타링크 가입 1천만 이상이 붙었습니다.',
  cards: [
    { label:'착륙', big:'650+', mid:'재사용 부스터가 650회 넘게 내려왔습니다', sub:'한 로켓을 여러 번 씁니다' },
    { label:'스타링크', big:'1,000만', mid:'가입이 1천만 명을 넘었다는 설명입니다', sub:'달 왕복선은 국제우주정거장 60회 이상입니다' },
    { label:'방향', big:'95%', mid:'재사용 스타십에 힘이 쏠린다는 설명입니다', sub:'스페이스XAI를 품었다는 줄도 붙었습니다' },
  ],
  detailHead: '화면이 말해 주는 것',
  detailLines: [
    '100억 달러는 비상장 가치 설명입니다',
    '착륙 횟수가 재사용의 뼈대입니다',
    '블루 오리진 300억 달러 투입과 대비됩니다',
  ],
  quote: '넣은 돈보다 비행과 가입이 많으면 자본이 일을 한 것입니다. 100억 달러는 화면 숫자입니다.',
  noteHead: '왜 중요한가', noteSub: '재사용이 쌓이면 발사 원가가 내려가고 스타링크 현금이 붙습니다. 화면 한 장입니다. 다음에 볼 것은 오늘 밤 14번째 비행입니다.',
  footer: '스페이스X · 100억 달러',
}, {
  badge: 'SPCX', title: 'A screen said SpaceX showed capital efficiency with 650-plus landings and 10 million Starlink users',
  heroIcon: '\u{1F680}', heroBig: '$10B',
  heroSub: 'The post put a private mark near $10 billion. The same card listed 650-plus landings and 10 million-plus Starlink users.',
  cards: [
    { label:'Land', big:'650+', mid:'Reusable boosters landed more than 650 times', sub:'One rocket flies again' },
    { label:'Starlink', big:'10M', mid:'Subscribers were said to top 10 million', sub:'Dragon passed 60 ISS missions' },
    { label:'Focus', big:'95%', mid:'Effort was said to sit on reusable Starship', sub:'A line also said SpaceX acquired xAI' },
  ],
  detailHead: 'What the screen says',
  detailLines: [
    '$10 billion is a private-mark description',
    'Landing count is the reuse backbone',
    'It sits beside Blue Origin’s $30 billion in',
  ],
  quote: 'If flights and users outrun cash in, capital did work. The $10 billion is a screen number.',
  noteHead: 'Why it matters', noteSub: 'Reuse lowers launch cost and Starlink cash can follow. This is one screen. Next, watch Flight 14 tonight.',
  footer: 'SpaceX · $10B',
});

add('bezos-blue-30b', 'L1', 'AMZN', {
  badge: '아마존', title: '제프 베이조스가 블루 오리진에 2000년부터 약 300억 달러를 넣었다는 집계가 나왔습니다',
  heroIcon: '\u{1F30E}', heroBig: '$30B',
  heroSub: '블루 오리진은 베이조스가 만든 로켓 회사입니다. 화면은 2000년부터 약 300억 달러를 넣었다고 적었습니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'2000', mid:'투자가 이천년대부터 이어졌습니다', sub:'한 해의 돈이 아닙니다' },
    { icon:'\u{1F680}', big:'뉴글렌', mid:'큰 로켓이 이제 비행을 쌓는 단계입니다', sub:'스페이스X 재사용과는 속도가 다릅니다' },
    { icon:'\u{1F4B0}', big:'대비', mid:'스페이스X 100억 달러 화면과 나란히 올랐습니다', sub:'넣은 돈과 비행 횟수가 비교입니다' },
  ],
  quote: '300억 달러는 창립자가 사재로 버틴 규모입니다. 비행 횟수가 그 돈을 따라가는지가 다음입니다.',
  noteHead: '왜 중요한가', noteSub: '아마존 창립자의 현금이 우주 칸을 오래 받칩니다. 집계 한 장입니다. 다음에 볼 것은 뉴글렌 비행과 수주입니다.',
  footer: '아마존 · 블루 300억',
}, {
  badge: 'AMZN', title: 'Jeff Bezos was tallied as putting about $30 billion into Blue Origin since 2000',
  heroIcon: '\u{1F30E}', heroBig: '$30B',
  heroSub: 'Blue Origin is the rocket firm Bezos founded. The screen said about $30 billion has gone in since 2000.',
  cards: [
    { icon:'\u{1F4C5}', big:'2000', mid:'The cash has run for a quarter century', sub:'Not one-year money' },
    { icon:'\u{1F680}', big:'New Glenn', mid:'The large rocket is still stacking flights', sub:'Reuse speed differs from SpaceX' },
    { icon:'\u{1F4B0}', big:'Compare', mid:'It sat beside a SpaceX $10 billion screen', sub:'Cash in versus flight count is the contrast' },
  ],
  quote: 'Thirty billion is founder cash over decades. Flight count still has to catch the spend.',
  noteHead: 'Why it matters', noteSub: 'Amazon’s founder cash keeps a space lane open. This is one tally. Next, watch New Glenn flights and contracts.',
  footer: 'Amazon · Blue $30B',
});

add('grok-reliability', 'L3', 'XAI', {
  badge: '스페이스XAI', title: '그록 4.7이 에이전트 업무에서 더 믿을 수 있다는 설명이 올랐습니다',
  heroIcon: '\u{1F9E0}', heroBig: '신뢰',
  heroSub: '에이전트는 일을 나눠 끝까지 하는 모델입니다. 화면은 점수표가 아니라 중간에 멈추지 않는 쪽을 강조했습니다.',
  cards: [
    { icon:'\u{2705}', big:'완수', mid:'시킨 일을 끝까지 간다는 설명입니다', sub:'중간에 멈추면 업무가 깨집니다' },
    { icon:'\u{1F4BB}', big:'도구', mid:'여러 도구를 이어서 씁니다', sub:'검색·코드·일정을 한 줄로 잇습니다' },
    { icon:'\u{1F4C8}', big:'4.7', mid:'4.7 세대의 업무 칸입니다', sub:'어제 46점 표와는 다른 장면입니다' },
  ],
  quote: '점수가 같아도 중간에 멈추면 현업에서는 못 씁니다. 오늘은 멈추지 않는 쪽이 뉴스입니다.',
  noteHead: '왜 중요한가', noteSub: '믿을 수 있는 에이전트면 차 안과 고객 지원에 바로 붙습니다. 설명 한 장입니다. 다음에 볼 것은 실제 완수율입니다.',
  footer: '스페이스XAI · 그록 신뢰',
}, {
  badge: 'SPCX AI', title: 'Grok 4.7 was described as more reliable on agent work',
  heroIcon: '\u{1F9E0}', heroBig: 'Reliable',
  heroSub: 'An agent splits work and finishes it. The screen stressed not stalling, not a scoreboard.',
  cards: [
    { icon:'\u{2705}', big:'Finish', mid:'It was said to complete assigned work', sub:'A stall breaks the job' },
    { icon:'\u{1F4BB}', big:'Tools', mid:'It chains several tools', sub:'Search, code and calendar in one line' },
    { icon:'\u{1F4C8}', big:'4.7', mid:'This is the 4.7 work lane', sub:'A different scene from yesterday’s 46' },
  ],
  quote: 'The same score is useless in production if the model stalls. Today the news is not stalling.',
  noteHead: 'Why it matters', noteSub: 'A reliable agent can sit in cars and support desks. This is one note. Next, watch real completion rates.',
  footer: 'SpaceXAI · Grok reliability',
});

add('grok-bot-rewards', 'L1', 'XAI', {
  badge: '스페이스XAI', title: '그록 봇 창작자 보상이 격주로 열리고 2주에 500달러 예시가 찍혔습니다',
  heroIcon: '\u{1F4B0}', heroBig: '$500',
  heroSub: '그록 봇은 엑스에서 돌아가는 인공지능 봇입니다. 화면은 2주마다 보상을 주고, 한 예시가 500달러라고 찍었습니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'격주', mid:'지급 주기가 2주입니다', sub:'매달 한 번이 아닙니다' },
    { icon:'\u{2716}', big:'2배', mid:'엑스 게시가 두 배 이상이어야 합니다', sub:'봇만 돌리고 글이 없으면 빠집니다' },
    { icon:'\u{1F4B3}', big:'엑스머니', mid:'엑스 머니로 받습니다', sub:'원본 콘텐츠 보상 줄과 같이 보입니다' },
  ],
  quote: '봇을 만들어 쓰는 사람에게 현금이 붙으면 그록 생태계가 커집니다. 500달러는 한 예시입니다.',
  noteHead: '왜 중요한가', noteSub: '창작자에게 돈이 가면 봇과 게시가 같이 늘어납니다. 화면 한 장입니다. 다음에 볼 것은 다음 지급일과 참여 수입니다.',
  footer: '스페이스XAI · 그록 보상',
}, {
  badge: 'SPCX AI', title: 'Grok Bot creator rewards opened every two weeks, with a $500 example',
  heroIcon: '\u{1F4B0}', heroBig: '$500',
  heroSub: 'Grok Bot is an AI bot that runs on X. The screen said payouts land every two weeks, with one example at $500.',
  cards: [
    { icon:'\u{1F4C5}', big:'Biweekly', mid:'The pay cycle is two weeks', sub:'Not once a month' },
    { icon:'\u{2716}', big:'2×', mid:'X posts must at least double', sub:'A bot with no posts drops out' },
    { icon:'\u{1F4B3}', big:'X Money', mid:'Payouts run through X Money', sub:'It sits with original-content rewards' },
  ],
  quote: 'Cash for bot makers can grow the Grok ecosystem. Five hundred dollars is one example.',
  noteHead: 'Why it matters', noteSub: 'If creators get paid, bots and posts rise together. This is one screen. Next, watch the next payday and participant count.',
  footer: 'SpaceXAI · Grok rewards',
});

add('aapl-vision-pro', 'L4', 'AAPL', {
  badge: '애플', title: '비전 프로가 생명 유지 장치 위에 있고 다음 기기는 2028년 말에야 거론됐습니다',
  badgeLine: '헤드셋 · 일정',
  heroIcon: '\u{1F453}', heroBig: '2028',
  heroSub: '비전 프로는 눈에 화면을 씌우는 헤드셋입니다. 화면은 후속이 빠르면 2028년 말, 늦으면 2029년 초라고 적었습니다.',
  cards: [
    { icon:'\u{1F6D1}', big:'유지', mid:'지금 제품은 명맥을 잇는 단계로 읽혔습니다', sub:'판매가 폭발하는 그림은 아닙니다' },
    { icon:'\u{1F453}', big:'안경', mid:'화면 없는 안경이 먼저 온다는 설명입니다', sub:'헤드셋보다 가벼운 제품입니다' },
    { icon:'\u{1F4C5}', big:'29년', mid:'늦으면 2029년 초입니다', sub:'올해·내년 후속은 아닙니다' },
  ],
  quote: '후속이 2년 뒤면 올해 헤드셋 매출은 작게 남습니다. 안경이 먼저면 그 칸이 새로운 입구입니다.',
  noteHead: '왜 중요한가', noteSub: '공간 컴퓨터가 늦어져도 안경이 먼저 오면 입구는 남습니다. 일정 한 장입니다. 다음에 볼 것은 안경 공개일입니다.',
  footer: '애플 · 비전 프로',
}, {
  badge: 'AAPL', title: 'Vision Pro was described as on life support, with a sequel only in late 2028 if at all',
  badgeLine: 'Headset · timing',
  heroIcon: '\u{1F453}', heroBig: '2028',
  heroSub: 'Vision Pro is a headset that puts screens on the eyes. The screen put a sequel in late 2028 or early 2029.',
  cards: [
    { icon:'\u{1F6D1}', big:'Hold', mid:'The current unit was read as on life support', sub:'Not a breakout sales picture' },
    { icon:'\u{1F453}', big:'Glasses', mid:'Displayless glasses were said to come first', sub:'A lighter product than the headset' },
    { icon:'\u{1F4C5}', big:'2029', mid:'The late case is early 2029', sub:'Not a this-year or next-year sequel' },
  ],
  quote: 'A sequel two years out keeps this year’s headset sales small. Glasses first would be a new door.',
  noteHead: 'Why it matters', noteSub: 'Even if the spatial computer slips, glasses can keep a door open. This is one timetable. Next, watch a glasses reveal date.',
  footer: 'Apple · Vision Pro',
});

add('newsom-memecoin', 'L3', 'MACRO', {
  badge: '매크로', title: '캘리포니아 주지사가 공인 얼굴을 쓴 밈 코인을 막는 법에 서명했습니다',
  heroIcon: '\u{1F3DB}', heroBig: 'AB 2409',
  heroSub: '밈 코인은 장난·유행으로 만든 작은 디지털 토큰입니다. 법은 공인의 얼굴·이름을 무단으로 붙인 코인을 막습니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'2027', mid:'시행은 2027년 1월 1일입니다', sub:'올해 바로 처벌은 아닙니다' },
    { icon:'\u{2696}', big:'민사', mid:'형사 처벌이 아니라 민사입니다', sub:'주 의회는 상원 40-0, 하원 78-0입니다' },
    { icon:'\u{1F4F1}', big:'플랫폼', mid:'거래소가 캘리포니아 주민에게 안 보이게 막습니다', sub:'공인 초상 코인이 대상입니다' },
  ],
  quote: '유명인 얼굴로 만든 장난 코인을 주 법으로 막는 첫 큰 칸입니다. 투자 상품 전부가 금지된 것은 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '주 법이 플랫폼을 움직이면 장난 코인 창구가 좁아집니다. 서명 한 건입니다. 다음에 볼 것은 2027년 시행 세칙입니다.',
  footer: '매크로 · 밈 코인 법',
}, {
  badge: 'MACRO', title: 'California’s governor signed a law barring meme coins that use an official’s likeness',
  heroIcon: '\u{1F3DB}', heroBig: 'AB 2409',
  heroSub: 'A meme coin is a small digital token made as a joke or fad. The law blocks coins that lift an official’s face or name.',
  cards: [
    { icon:'\u{1F4C5}', big:'2027', mid:'It takes effect on January 1, 2027', sub:'Not a this-year penalty' },
    { icon:'\u{2696}', big:'Civil', mid:'It is civil, not criminal', sub:'Senate 40-0 and Assembly 78-0' },
    { icon:'\u{1F4F1}', big:'Platforms', mid:'Venues must hide them from California residents', sub:'Official-likeness coins are the target' },
  ],
  quote: 'It is a first large state bar on joke coins that steal a public face. It does not ban every token.',
  noteHead: 'Why it matters', noteSub: 'When a state law moves platforms, the joke-coin window narrows. This is one signing. Next, watch 2027 rules.',
  footer: 'Macro · meme-coin law',
});

add('starship-f14-faa', 'L6', 'SPCX', {
  badge: '스페이스X', title: '스타십 14번째 비행이 오늘 밤 동부 8시 15분에 창을 열고 스타링크 3세대 26기를 싣습니다',
  breaking: '오늘 밤 · 21:15 KST',
  heroBig: 'Flight 14', heroSub: '항공당국 면허는 26일 개정본입니다. 발사 창은 동부 오전 8시 15분부터 9시 30분, 한국 밤 9시 15분입니다.',
  grid: [
    { icon:'\u{1F680}', big:'B21', mid:'부스터 21호기', sub:'함선은 41호기입니다' },
    { icon:'\u{1F6F0}', big:'26기', mid:'스타링크 3세대', sub:'기당 약 1테라비트입니다' },
    { icon:'\u{1F3E2}', big:'OLP-2', mid:'두 번째 발사대', sub:'궤도 진입이 목표입니다' },
    { icon:'\u{1F4C4}', big:'Rev 9', mid:'면허 개정', sub:'원래 일자는 2023년 4월 14일입니다' },
  ],
  ctx1: '13번째 비행의 3세대는 궤도에 안 남았습니다. 오늘은 첫 궤도·첫 유료 스타링크입니다.',
  ctx2: '26기를 합치면 약 26테라비트, 팰컨9 2세대 미니의 약 열 배입니다.',
  quote: '면허와 발사 창이 같은 주말에 맞춰졌습니다. 성공하면 스타십이 돈 버는 로켓이 됩니다.',
  noteHead: '왜 중요한가', noteSub: '유료 화물을 올리면 스타십이 시험이 아니라 매출 칸이 됩니다. 오늘 밤 창입니다. 다음에 볼 것은 궤도 진입과 위성 전개입니다.',
  footer: '스페이스X · 스타십 14',
}, {
  badge: 'SPCX', title: 'Starship Flight 14 opens tonight at 8:15 a.m. EDT with 26 Starlink V3 satellites',
  breaking: 'Tonight · 21:15 KST',
  heroBig: 'Flight 14', heroSub: 'The aviation license was revised on the 26th. The window is 8:15–9:30 a.m. EDT, 9:15 p.m. in Korea.',
  grid: [
    { icon:'\u{1F680}', big:'B21', mid:'Booster 21', sub:'The ship is 41' },
    { icon:'\u{1F6F0}', big:'26', mid:'Starlink V3', sub:'About 1 terabit each' },
    { icon:'\u{1F3E2}', big:'OLP-2', mid:'Second pad', sub:'Orbit is the goal' },
    { icon:'\u{1F4C4}', big:'Rev 9', mid:'License revision', sub:'Original date 14 April 2023' },
  ],
  ctx1: 'Flight 13’s V3s did not stay in orbit. Tonight is first orbit and first paid Starlink.',
  ctx2: 'Twenty-six birds sum to about 26 terabits, roughly ten times a Falcon 9 V2 mini.',
  quote: 'The license and the window lined up this weekend. Success would make Starship a revenue rocket.',
  noteHead: 'Why it matters', noteSub: 'Paid cargo turns Starship from a test into a sales lane. The window is tonight. Next, watch orbit and deploy.',
  footer: 'SpaceX · Starship 14',
});

add('musk-moon-mars', 'L4', 'SPCX', {
  badge: '스페이스X', title: '머스크가 달과 화성 생산을 해마다 두 배 넘게 늘리겠다고 말했습니다',
  badgeLine: '달 · 화성',
  heroIcon: '\u{1F30C}', heroBig: '2배+',
  heroSub: '생산은 로켓과 함선을 만드는 속도입니다. 화면은 달·화성 칸의 생산을 해마다 두 배 넘게 키우겠다는 발언입니다.',
  cards: [
    { icon:'\u{1F315}', big:'달', mid:'달 기지가 생산 목표에 들어갑니다', sub:'발언이지 올해 착륙 확정은 아닙니다' },
    { icon:'\u{1F9D1}', big:'화성', mid:'화성 칸도 같은 배수입니다', sub:'스타십이 그 운반 수단입니다' },
    { icon:'\u{1F4C8}', big:'문명', mid:'한 물리학자는 카르다쇼프 단계를 날짜로 적었습니다', sub:'문명 에너지 등급의 의견입니다' },
  ],
  quote: '해마다 두 배면 몇 년 안에 발사 횟수가 크게 달라집니다. 오늘 밤 14번째 비행이 그 사다리의 첫 칸입니다.',
  noteHead: '왜 중요한가', noteSub: '생산이 두 배가 되면 발사 원가와 일정이 같이 움직입니다. 발언 한 줄입니다. 다음에 볼 것은 공장 출고와 비행 간격입니다.',
  footer: '스페이스X · 달·화성',
}, {
  badge: 'SPCX', title: 'Musk said Moon and Mars production would more than double each year',
  badgeLine: 'Moon · Mars',
  heroIcon: '\u{1F30C}', heroBig: '2×+',
  heroSub: 'Production is how fast rockets and ships are built. The screen is a remark to more than double that rate each year.',
  cards: [
    { icon:'\u{1F315}', big:'Moon', mid:'A lunar base sits in the production goal', sub:'A remark, not a this-year landing lock' },
    { icon:'\u{1F9D1}', big:'Mars', mid:'The Mars lane uses the same multiple', sub:'Starship is the carrier' },
    { icon:'\u{1F4C8}', big:'Scale', mid:'A physicist dated Kardashev steps', sub:'An opinion on civilization energy' },
  ],
  quote: 'Doubling each year would change flight count in a few years. Tonight’s Flight 14 is the first rung.',
  noteHead: 'Why it matters', noteSub: 'If production doubles, cost and cadence move together. This is one remark. Next, watch factory output and flight gaps.',
  footer: 'SpaceX · Moon and Mars',
});

add('top10-3066t', 'L2', 'MACRO', {
  badge: '시총', title: '세계 시총 상위 10곳이 30.66조 달러로 커졌고 스페이스X가 7위에 있습니다',
  heroIcon: '\u{1F4B0}', heroBig: '$30.66T',
  heroSub: '시가총액은 주가에 주식 수를 곱한 회사 값입니다. 화면은 상위 10곳이 30.20조에서 30.66조 달러로 늘었습니다.',
  cards: [
    { label:'1위', big:'$5.43T', mid:'엔비디아 5.434조, 주가 225.07달러입니다', sub:'애플은 4.977조, 341.07달러입니다' },
    { label:'7위', big:'$1.96T', mid:'스페이스X 1.958조, 148.68달러입니다', sub:'메타 1.914조보다 한 칸 위입니다' },
    { label:'10위', big:'$1.66T', mid:'아람코 1.661조, 6.87달러입니다', sub:'브로드컴은 1.684조입니다' },
  ],
  detailHead: '화면이 말해 주는 것',
  detailLines: [
    '구글 4.171조, 마이크로소프트 3.832조입니다',
    '아마존 2.693조, TSMC 2.337조입니다',
    '스페이스X가 상장 티커로 7위에 있습니다',
  ],
  quote: '기술 일곱 곳과 스페이스X, 아람코가 한 표에 있습니다. 하루 시총이지 실적 확정은 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '스페이스X가 시총 10위 안에 있으면 우주가 기술 묶음의 한 칸이 됩니다. 화면 한 장입니다. 다음에 볼 것은 종가와 다음 실적입니다.',
  footer: '시총 · 30.66조',
}, {
  badge: 'CAPS', title: 'The world’s top 10 market caps rose to $30.66 trillion, with SpaceX in seventh',
  heroIcon: '\u{1F4B0}', heroBig: '$30.66T',
  heroSub: 'Market cap is price times shares. The screen lifted the top 10 from $30.20T to $30.66T.',
  cards: [
    { label:'1st', big:'$5.43T', mid:'NVIDIA $5.434T at $225.07', sub:'Apple $4.977T at $341.07' },
    { label:'7th', big:'$1.96T', mid:'SpaceX $1.958T at $148.68', sub:'One slot above Meta $1.914T' },
    { label:'10th', big:'$1.66T', mid:'Aramco $1.661T at $6.87', sub:'Broadcom is $1.684T' },
  ],
  detailHead: 'What the screen says',
  detailLines: [
    'Google $4.171T and Microsoft $3.832T',
    'Amazon $2.693T and TSMC $2.337T',
    'Listed SpaceX sits seventh',
  ],
  quote: 'Seven tech names, SpaceX and Aramco share one table. It is a one-day cap, not locked earnings.',
  noteHead: 'Why it matters', noteSub: 'If SpaceX sits in the top 10, space is a tech-bucket slot. This is one screen. Next, watch the close and the next print.',
  footer: 'Caps · $30.66T',
});

add('cybercab-nv-fl', 'L1', 'TSLA', {
  badge: '테슬라', title: '사이버캡 상업 운행이 네바다와 플로리다에서 열리고 캘리포니아는 내년 중반입니다',
  heroIcon: '\u{1F698}', heroBig: 'NV·FL',
  heroSub: '사이버캡은 운전석 없는 전용 로보택시입니다. 화면은 네바다·플로리다에서 상업 운행이 열리고, 캘리포니아는 내년 중반이라고 적었습니다.',
  cards: [
    { icon:'\u{1F3D6}', big:'네바다', mid:'상업 호출이 열렸다는 설명입니다', sub:'유료로 손님을 태웁니다' },
    { icon:'\u{1F334}', big:'플로리다', mid:'같은 상업 칸입니다', sub:'주마다 허가 속도가 다릅니다' },
    { icon:'\u{1F3D9}', big:'캘리포니아', mid:'내년 중반으로 적혔습니다', sub:'가장 큰 시장은 아직 달력입니다' },
  ],
  quote: '두 주에서 돈을 받으면 로보택시가 시험이 아니라 매출입니다. 캘리포니아는 아직 다음 해입니다.',
  noteHead: '왜 중요한가', noteSub: '상업 주가 늘면 요금과 가동이 실적으로 붙습니다. 화면 한 장입니다. 다음에 볼 것은 호출 건수와 캘리포니아 허가입니다.',
  footer: '테슬라 · 사이버캡 주',
}, {
  badge: 'TSLA', title: 'Cybercab commercial service was said to open in Nevada and Florida, with California mid next year',
  heroIcon: '\u{1F698}', heroBig: 'NV·FL',
  heroSub: 'Cybercab is the purpose-built robotaxi. The screen said commercial rides opened in Nevada and Florida, with California mid next year.',
  cards: [
    { icon:'\u{1F3D6}', big:'Nevada', mid:'Paid hails were said to be live', sub:'Riders pay a fare' },
    { icon:'\u{1F334}', big:'Florida', mid:'The same commercial lane', sub:'Permit speed differs by state' },
    { icon:'\u{1F3D9}', big:'California', mid:'Timed to mid next year', sub:'The largest market is still a date' },
  ],
  quote: 'Paid rides in two states turn robotaxi from a test into sales. California is still next year.',
  noteHead: 'Why it matters', noteSub: 'More commercial states put fares and utilization into results. This is one screen. Next, watch ride counts and a California permit.',
  footer: 'Tesla · Cybercab states',
});

add('starship-hourly', 'L5', 'SPCX', {
  badge: '스페이스X', title: '스타십이 2~3년 안에 한 시간마다 뜨는 그림이 다시 나왔습니다',
  heroIcon: '\u{23F0}', heroBig: '매시간',
  heroSub: '한 시간마다 뜨면 하루 수십 회입니다. 화면은 그 간격이 2~3년 안에 가능하다고 적었습니다.',
  before: { label: '지금', big: '시험', sub:'며칠·몇 주에 한 번 띄웁니다' },
  after: { label: '목표', big: '매시간', sub:'2~3년 뒤 한 시간 간격입니다' },
  cards: [
    { icon:'\u{1F3ED}', big:'생산', mid:'함선을 공장에서 쉬지 않고 만들어야 합니다', sub:'달·화성 두 배 발언과 맞닿습니다' },
    { icon:'\u{1F6E2}', big:'발사대', mid:'패드를 식히고 다시 세우는 시간이 줄어야 합니다', sub:'두 번째 발사대가 그 칸입니다' },
    { icon:'\u{1F4CA}', big:'14번째', mid:'오늘 밤 비행이 그 사다리의 한 칸입니다', sub:'유료 화물이 간격을 당깁니다' },
  ],
  quote: '매시간은 목표입니다. 오늘 밤 한 번이 성공해야 다음 간격 이야기가 열립니다.',
  noteHead: '왜 중요한가', noteSub: '발사 간격이 짧아지면 스타링크와 달 화물이 싸집니다. 목표 한 줄입니다. 다음에 볼 것은 연속 비행 간격입니다.',
  footer: '스페이스X · 매시간',
}, {
  badge: 'SPCX', title: 'A slide again put Starship on hourly flights inside two to three years',
  heroIcon: '\u{23F0}', heroBig: 'Hourly',
  heroSub: 'Hourly flights mean dozens a day. The screen said that cadence could arrive in two to three years.',
  before: { label: 'Now', big: 'Test', sub:'Flights sit days or weeks apart' },
  after: { label: 'Goal', big: 'Hourly', sub:'A one-hour gap in two to three years' },
  cards: [
    { icon:'\u{1F3ED}', big:'Build', mid:'Ships have to leave the factory without pause', sub:'It meets the Moon-Mars doubling remark' },
    { icon:'\u{1F6E2}', big:'Pad', mid:'Cool-down and restack time has to shrink', sub:'The second pad is that lane' },
    { icon:'\u{1F4CA}', big:'F14', mid:'Tonight’s flight is one rung', sub:'Paid cargo pulls the gap tighter' },
  ],
  quote: 'Hourly is a goal. Tonight has to work before the next-gap story opens.',
  noteHead: 'Why it matters', noteSub: 'A shorter gap makes Starlink and lunar cargo cheaper. This is one goal. Next, watch back-to-back flight gaps.',
  footer: 'SpaceX · hourly',
});

add('tsla-q3-471k', 'L5', 'TSLA', {
  badge: '테슬라', title: '테슬라 3분기 인도가 47만 1천 대를 넘을지가 예측 시장에 올라 있습니다',
  heroIcon: '\u{1F697}', heroBig: '471k',
  heroSub: '인도는 손님에게 차가 나가는 대수입니다. 화면은 3분기가 47만 1천 대를 넘길지를 물었고, 2분기는 공식 48만 126대입니다.',
  before: { label: '2분기 공식', big: '480,126', sub:'생산 45만 1,758대, 인도 48만 126대입니다' },
  after: { label: '3분기 예측', big: '471k+', sub:'예측 시장 한 줄입니다' },
  cards: [
    { icon:'\u{1F4C5}', big:'10/2', mid:'마감은 10월 2일 동부 자정입니다', sub:'회사 공시가 나온 뒤 정산됩니다' },
    { icon:'\u{1F4CA}', big:'3·Y', mid:'2분기 모델3·Y는 46만 7,762대입니다', sub:'다른 모델은 1만 2,364대입니다' },
    { icon:'\u{1F3B2}', big:'예측', mid:'내기가 모인 확률이지 가이던스가 아닙니다', sub:'화면 숫자 48만 125와 공식은 1대 차이입니다' },
  ],
  quote: '2분기보다 낮은 선을 넘기는지가 질문입니다. 예측이지 회사 발표가 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '인도 대수가 나오면 분기 매출의 뼈대가 보입니다. 예측 한 줄입니다. 다음에 볼 것은 10월 초 공식 인도입니다.',
  footer: '테슬라 · 3분기 471k',
}, {
  badge: 'TSLA', title: 'A prediction market asked if Tesla Q3 deliveries would clear 471,000',
  heroIcon: '\u{1F697}', heroBig: '471k',
  heroSub: 'Deliveries are cars that reach customers. The screen asked if Q3 clears 471,000 after official Q2 of 480,126.',
  before: { label: 'Q2 official', big: '480,126', sub:'Produced 451,758 and delivered 480,126' },
  after: { label: 'Q3 market', big: '471k+', sub:'One prediction-market line' },
  cards: [
    { icon:'\u{1F4C5}', big:'Oct 2', mid:'It closes at midnight EDT on October 2', sub:'It settles after the company print' },
    { icon:'\u{1F4CA}', big:'3/Y', mid:'Q2 Model 3/Y was 467,762', sub:'Other models were 12,364' },
    { icon:'\u{1F3B2}', big:'Odds', mid:'Pooled bets, not guidance', sub:'The screen 480,125 is one unit off official' },
  ],
  quote: 'The question is whether Q3 clears a line below Q2. It is a market, not a company print.',
  noteHead: 'Why it matters', noteSub: 'A delivery print is the spine of quarterly sales. This is one market. Next, watch the early-October official count.',
  footer: 'Tesla · Q3 471k',
});

};
