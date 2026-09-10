// 2026-09-11 SVG topic data — consumed by gen-reports-20260911.js
// Layout mix: ROWS×1 L1×4 L2×4 L3×4 L4×4 L5×2 L6×3 (individuals ≤40% one layout)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.11 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'라우터', title:'스타링크 라우터 4가 와이파이 7·기기 510대를 찍었습니다',
      sub:'무게는 약 0.9파운드입니다. 가입자 속도와 칸을 나누시기 바랍니다.' },
    { color:'#4ade80', fill:'#061209', right:'캡', title:'사이버캡 공기저항이 0.2 미만, 전비 165와트시/마일로 찍혔습니다',
      sub:'테슬라 첫 전륜구동으로 설명됐습니다. 마일당 원가 의견과 칸을 나누시기 바랍니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'팔란티어가 엔터프라이즈 스택의 핵심이라는 발언이 나왔습니다',
      sub:'주권 인공지능 스택과 칸을 나누시기 바랍니다. 내부자 매도와도 분리합니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'10년', title:'미국 10년물이 4.92%로 올라 2023년 10월 이후 최고권입니다',
      sub:'하루 +0.08%포인트입니다. 생산자물가 5.4%와 칸을 나누시기 바랍니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'보링', title:'보링컴퍼니가 30억 달러 조달에 기업가치 230억 달러를 표기했습니다',
      sub:'아랍에미리트 터널 150km 이상이 붙었습니다. 테슬라 시총과 합치지 마시기 바랍니다.' },
    { color:'#4ade80', fill:'#061209', right:'FSD', title:'슬로베니아에 완전자율주행 두 달 무상 제공이 거론됐습니다',
      sub:'97.2%·177.7마일 스트릭과 칸을 나누시기 바랍니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'스타십', title:'다음 스타십 비행이 매출을 내는 비행이 될 수 있다는 확신이 나왔습니다',
      sub:'부스터 22호기 극저온 시험과 칸을 나누시기 바랍니다.' },
  ],
  caption: '더 볼 것: 라우터4 · Cd0.2 · 10년 4.92% · 보링 230억 · 슬로베니아 · 스타십 매출',
}, {
  headline: '2026.09.11 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'Router', title:'Starlink Router 4 printed Wi-Fi 7, 510 devices, and 3,500 sq ft',
      sub:'About 0.9 lb. Split from subscriber speed.' },
    { color:'#4ade80', fill:'#061209', right:'Cab', title:'Cybercab Cd printed under 0.2 with 165 Wh/mi',
      sub:'Cited as Tesla’s first FWD. Split from CPM opinions.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'Palantir was called the single most important enterprise stack',
      sub:'Split sovereign AI stack from insider sales.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'10y', title:'The U.S. 10-year printed 4.92%, highest since Oct 2023',
      sub:'+0.08 percentage point. Split from PPI 5.4%.' },
    { color:'#c084fc', fill:'#140b1f', right:'Boring', title:'The Boring Company printed a $3B round at a $23B valuation',
      sub:'UAE tunnels of 150+ km. Do not mash with Tesla cap.' },
    { color:'#4ade80', fill:'#061209', right:'FSD', title:'Slovenia was offered two months of FSD at no charge',
      sub:'Split from the 97.2% / 177.7 mi streak.' },
    { color:'#c084fc', fill:'#140b1f', right:'Ship', title:'The next Starship flight was framed as revenue-generating',
      sub:'Split from Booster 22 cryo-proof.' },
  ],
  caption: 'Watch: Router 4 · Cd<0.2 · 10y 4.92% · Boring $23B · Slovenia · Starship revenue',
});

add('starlink-router-4', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스타링크 라우터 4가 와이파이 7에 기기 510대·면적 3,500평방피트를 표기했습니다',
  heroIcon: '📡', heroBig: 'Wi-Fi 7',
  heroSub: '라우터 4는 가정·사무실용 스타링크 단말기입니다. 와이파이 7, 동시 기기 510대, 커버 면적 3,500평방피트, 무게 약 0.9파운드가 스펙으로 찍혔습니다.',
  cards: [
    { label:'기기', big:'510', mid:'동시 접속 대수', sub:'가정·소규모 사무실 상한' },
    { label:'면적', big:'3,500', mid:'평방피트 커버', sub:'약 325제곱미터' },
    { label:'무게', big:'0.9lb', mid:'본체 무게', sub:'설치·이전 부담이 작음' },
  ],
  detailHead: '스펙이 의미하는 것',
  detailLines: ['📍 와이파이 7은 단말 규격이지 위성 속도가 아님','📶 510대는 동시 접속 상한','💵 요금제 속도와 칸을 나누시기 바랍니다'],
  noteSub: '단말 스펙은 실내 와이파이 성능입니다. 스타링크 다이렉트 확장·스펙트럼 허가와 칸을 나누시기 바랍니다. 다음 확인할 것은 출하와 실제 속도입니다. 장기적으로 설치가 쉬워지면 가입 전환 비용이 낮아질 수 있습니다.',
  footer: '스페이스X · 라우터 4',
}, {
  badge: 'SPCX', title: 'Starlink Router 4 printed Wi-Fi 7, 510 devices, and 3,500 sq ft',
  heroIcon: '📡', heroBig: 'Wi-Fi 7',
  heroSub: 'Router 4 is the home/office Starlink terminal. Specs printed Wi-Fi 7, 510 simultaneous devices, 3,500 sq ft coverage, and about 0.9 lb.',
  cards: [
    { label:'Devices', big:'510', mid:'Simultaneous devices', sub:'Home and small-office cap' },
    { label:'Area', big:'3,500', mid:'Sq ft coverage', sub:'About 325 square meters' },
    { label:'Weight', big:'0.9lb', mid:'Unit weight', sub:'Easier to move and install' },
  ],
  detailHead: 'What the spec means',
  detailLines: ['📍 Wi-Fi 7 is the indoor radio, not satellite speed','📶 510 is a concurrent-device cap','💵 Split from plan speed'],
  noteSub: 'The spec is indoor Wi-Fi, not the satellite hop. Split from Starlink Direct expansion and spectrum permits. Next: shipments and real speeds. Easier installs can lower switching costs over years.',
  footer: 'SPCX · Router 4',
});

add('cybercab-cd-165', 'L1', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 공기저항이 0.2 미만, 전비 165와트시/마일로 찍혔습니다',
  heroIcon: '🍃', heroBig: '<0.2',
  heroSub: '공기저항계수(Cd)는 차가 공기를 가르는 저항입니다. 0.2 미만이면 매우 낮은 편입니다. 전비 165와트시/마일과 함께 테슬라 첫 전륜구동으로 설명됐습니다.',
  cards: [
    { icon:'💨', big:'<0.2', mid:'공기저항계수', sub:'차체 형상 실측·설계' },
    { icon:'🔋', big:'165', mid:'와트시/마일', sub:'1마일에 쓰는 전력' },
    { icon:'🛞', big:'전륜', mid:'테슬라 첫 전륜구동', sub:'기존 후륜·사륜과 다른 축' },
  ],
  quote: '공기저항과 전비는 에너지 칸입니다. 마일당 원가 의견·유타 7대와 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 실도로 전비입니다.',
  noteSub: '스펙은 양산 원가가 아닙니다. 골드만 마일당 원가 서사와 칸을 나누시기 바랍니다. 다음 게이트는 시험 전비와 출고가입니다. 장기적으로 전비가 낮으면 로보택시 완전 원가가 내려갈 수 있습니다.',
  footer: '테슬라 · 사이버캡 전비',
}, {
  badge: 'TSLA', title: 'Cybercab Cd printed under 0.2 with 165 Wh per mile',
  heroIcon: '🍃', heroBig: '<0.2',
  heroSub: 'Cd is how much air the car pushes. Under 0.2 is very low. 165 Wh/mi was paired with Tesla’s first front-wheel-drive layout.',
  cards: [
    { icon:'💨', big:'<0.2', mid:'Drag coefficient', sub:'Body shape, measured or designed' },
    { icon:'🔋', big:'165', mid:'Wh per mile', sub:'Energy to drive one mile' },
    { icon:'🛞', big:'FWD', mid:'Tesla’s first FWD', sub:'Not the usual RWD/AWD stack' },
  ],
  quote: 'Drag and Wh/mi are an energy cell. Do not mash with CPM opinions or the Utah 7. Next: on-road Wh/mi.',
  noteSub: 'A spec is not build cost. Split from the Goldman CPM story. Next: test Wh/mi and ex-factory price. Lower energy use can pull fully loaded robotaxi cost down over years.',
  footer: 'TSLA · Cybercab energy',
});

add('tsla-fsd-awesome', 'L3', 'TSLA', {
  badge: 'TSLA', title: '완전자율주행이 훌륭하다는 발언과 97.2%·177.7마일 스트릭이 같이 나왔습니다',
  heroIcon: '🛣', heroBig: '97.2%',
  heroSub: '스트릭은 개입 없이 이어 간 구간입니다. 97.2%와 177.7마일이 한 화면에 찍혔고, 완전자율주행이 훌륭하다는 발언이 붙었습니다.',
  cards: [
    { icon:'✅', big:'97.2%', mid:'표시된 성공 비율', sub:'정의·분모가 공시되지 않음' },
    { icon:'📏', big:'177.7', mid:'마일 스트릭', sub:'한 구간 연속 주행' },
    { icon:'🗣', big:'발언', mid:'톤이 세진 평가', sub:'개입률 공시와는 다른 칸' },
  ],
  quote: '스트릭 숫자는 한 구간의 실측입니다. 슬로베니아 두 달 무상과 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 개입 정의입니다.',
  noteSub: '발언은 평가이지 규제 승인이 아닙니다. 라이더 가이드·유타 7대와 칸을 나누시기 바랍니다. 다음 게이트는 공개 개입률입니다. 장기적으로 개입이 줄면 감독 없는 운행 가정이 두꺼워질 수 있습니다.',
  footer: '테슬라 · 완전자율주행',
}, {
  badge: 'TSLA', title: 'A “self-driving is awesome” remark sat beside a 97.2% / 177.7-mile streak',
  heroIcon: '🛣', heroBig: '97.2%',
  heroSub: 'A streak is a stretch without a documented intervention. 97.2% and 177.7 miles printed together with a stronger tone on FSD.',
  cards: [
    { icon:'✅', big:'97.2%', mid:'Printed success rate', sub:'Denominator not disclosed' },
    { icon:'📏', big:'177.7', mid:'Mile streak', sub:'One continuous segment' },
    { icon:'🗣', big:'Quote', mid:'Stronger tone', sub:'Not the same as a published rate' },
  ],
  quote: 'The streak is one-segment evidence. Do not mash with Slovenia’s two free months. Next: the intervention definition.',
  noteSub: 'A remark is not a regulator approval. Split from the rider guide and the Utah 7. Next: a public intervention rate. Fewer interventions can thicken unsupervised-ops assumptions over years.',
  footer: 'TSLA · FSD streak',
});

add('spcx-starship-revenue', 'L5', 'SPCX', {
  badge: 'SPCX', title: '다음 스타십 비행이 매출을 내는 비행이 될 수 있다는 확신이 나왔습니다',
  heroIcon: '🚀', heroBig: '매출',
  heroSub: '지금까지 스타십 비행은 시험에 가까웠습니다. 다음 비행이 고객 화물을 실어 돈을 받는 비행이 될 수 있다는 표현이 나왔고, 연간 반복매출 1,000억 달러 확신이 붙었습니다.',
  before: { label:'지금까지', big:'시험', sub:'기술 검증 비행' },
  after: { label:'다음 비행', big:'매출', sub:'고객 화물이 붙을 수 있음' },
  cards: [
    { icon:'💵', big:'$100B', mid:'연간 반복매출 확신', sub:'가정이지 수주 잔고가 아님' },
    { icon:'📅', big:'다음', mid:'비행 창', sub:'부스터 22·42호기와 분리' },
    { icon:'📦', big:'화물', mid:'유료 페이로드', sub:'시험 계측과 다른 칸' },
  ],
  quote: '매출 비행은 계약·보험·허가가 같이 있어야 합니다. 1,000억 달러는 확신 칸입니다. 궤도 컴퓨팅 위성과 한 문장에 넣지 마시기 바랍니다.',
  noteSub: '시험 성공과 매출 인식은 시계가 다릅니다. 부스터 22호기 극저온 시험과 칸을 나누시기 바랍니다. 다음 확인할 것은 페이로드 고객입니다. 장기적으로 케이던스가 붙으면 발사 단가가 내려갈 수 있습니다.',
  footer: '스페이스X · 스타십 매출',
}, {
  badge: 'SPCX', title: 'The next Starship flight was framed as revenue-generating',
  heroIcon: '🚀', heroBig: 'Revenue',
  heroSub: 'Starship flights so far have been closer to tests. The next was framed as a paid, customer-payload flight, with $100B ARR conviction attached.',
  before: { label:'So far', big:'Test', sub:'Engineering flights' },
  after: { label:'Next flight', big:'Paid', sub:'Customer payload possible' },
  cards: [
    { icon:'💵', big:'$100B', mid:'ARR conviction', sub:'Assumption, not backlog' },
    { icon:'📅', big:'Next', mid:'Flight window', sub:'Split from B22 and Ship 42' },
    { icon:'📦', big:'Cargo', mid:'Paid payload', sub:'Not a test instrument' },
  ],
  quote: 'A revenue flight needs a contract, insurance, and permits. $100B is a conviction cell. Do not mash with orbital-compute sats.',
  noteSub: 'A successful test is not revenue recognition. Split from Booster 22 cryo-proof. Next: the payload customer. Cadence can pull launch cost down over years.',
  footer: 'SPCX · Starship revenue',
});

add('nvda-pltr-stack', 'L6', 'NVDA', {
  badge: 'BREAKING', breaking: '엔비디아 · 팔란티어',
  title: '팔란티어가 엔터프라이즈 스택에서 가장 중요하다는 발언이 나왔습니다',
  heroBig: '스택',
  heroSub: '엔터프라이즈 스택은 기업이 인공지능을 돌리는 소프트웨어 층입니다. 팔란티어가 그 층에서 가장 중요하다는 평가와 주권 인공지능 스택 그림이 같이 나왔습니다.',
  grid: [
    { icon:'🏢', big:'PLTR', mid:'소프트웨어 층', sub:'데이터·온톨로지 축' },
    { icon:'🖥', big:'NVDA', mid:'칩·랙 층', sub:'연산 인프라' },
    { icon:'🏛', big:'주권', mid:'국가 단위 도입', sub:'클라우드와 다른 칸' },
    { icon:'🔗', big:'결합', mid:'칩+소프트웨어', sub:'한 계약이 아님' },
  ],
  ctx1: '칩 판매와 소프트웨어 구독은 매출 인식이 다릅니다. 한 장의 파트너십이 아닙니다.',
  ctx2: '내부자 6억 달러 매도와 칸을 나누시기 바랍니다.',
  quote: '가장 중요하다는 말은 평가입니다. 수주 공시가 나오기 전에는 가중치를 낮추시기 바랍니다. 다음 확인할 것은 공동 레퍼런스입니다.',
  noteSub: '주권 인공지능은 국가가 데이터를 국내에 두는 그림입니다. 자그레브 무인 22km와 칸을 나누시기 바랍니다. 다음 게이트는 계약 규모입니다. 장기적으로 소프트웨어가 붙으면 칩 교체 비용이 커질 수 있습니다.',
  footer: '엔비디아 · 팔란티어',
}, {
  badge: 'BREAKING', breaking: 'NVIDIA · PALANTIR',
  title: 'Palantir was called the single most important enterprise stack',
  heroBig: 'Stack',
  heroSub: 'An enterprise stack is the software layer companies use to run AI. Palantir was called the most important layer, beside a sovereign-AI stack picture.',
  grid: [
    { icon:'🏢', big:'PLTR', mid:'Software layer', sub:'Data and ontology' },
    { icon:'🖥', big:'NVDA', mid:'Chips and racks', sub:'Compute infrastructure' },
    { icon:'🏛', big:'Sovereign', mid:'Nation-scale deploy', sub:'Not the same as cloud' },
    { icon:'🔗', big:'Pair', mid:'Chips + software', sub:'Not one contract' },
  ],
  ctx1: 'Chip sales and software subscriptions recognize revenue differently. Do not mash them into one partnership.',
  ctx2: 'Split from the $600M insider sale.',
  quote: '“Most important” is an evaluation. Keep weight low until a contract prints. Next: a joint reference customer.',
  noteSub: 'Sovereign AI keeps data inside a country. Split from the 22 km Zagreb driverless run. Next: contract size. Software attached to chips can raise switching costs over years.',
  footer: 'NVDA · Palantir',
});

add('ust-10y-492', 'L1', 'RATES', {
  badge: 'MACRO', title: '미국 10년물이 4.92%로 올라 2023년 10월 이후 최고권입니다',
  heroIcon: '📈', heroBig: '4.92%',
  heroSub: '10년물 금리는 국채 10년을 살 때 받는 수익률입니다. 하루 +0.08%포인트로 4.92%가 됐고, 이 높이는 2023년 10월 이후입니다.',
  cards: [
    { icon:'📅', big:'10월', mid:'2023년 이후 최고', sub:'비교 기준 달' },
    { icon:'➕', big:'+0.08', mid:'하루 변화', sub:'퍼센트포인트' },
    { icon:'🏭', big:'5.4%', mid:'8월 생산자물가', sub:'전년 대비, 예상 5.3%' },
  ],
  quote: '금리가 오르면 주식·비트코인 할인율이 같이 올라갑니다. 바이백 규모와 한 줄의 완화로 합치지 마시기 바랍니다. 다음 확인할 것은 소비자물가입니다.',
  noteSub: '4.92%는 시장 가격입니다. 생산자물가 5.4%는 다른 시계입니다. 다음 게이트는 소비자물가와 9월 16일 연방공개시장위원회입니다. 장기적으로 할인율이 높으면 성장주 배수 가정이 낮아집니다.',
  footer: '매크로 · 10년물 4.92%',
}, {
  badge: 'MACRO', title: 'The U.S. 10-year printed 4.92%, highest since October 2023',
  heroIcon: '📈', heroBig: '4.92%',
  heroSub: 'The 10-year yield is the return for holding a 10-year Treasury. It rose 0.08 percentage point to 4.92%, last seen in this zone in October 2023.',
  cards: [
    { icon:'📅', big:'Oct', mid:'Highest since 2023', sub:'Comparison month' },
    { icon:'➕', big:'+0.08', mid:'One-day change', sub:'Percentage points' },
    { icon:'🏭', big:'5.4%', mid:'August PPI YoY', sub:'Versus 5.3% expected' },
  ],
  quote: 'Higher yields lift the discount on stocks and bitcoin. Do not mash with buyback size as “easing.” Next: CPI.',
  noteSub: '4.92% is a market price. PPI 5.4% is another clock. Next: CPI and the Sep 16 FOMC. A higher discount rate can compress growth multiples over years.',
  footer: 'MACRO · 10-year 4.92%',
});

add('slovenia-fsd-free', 'L3', 'TSLA', {
  badge: 'TSLA', title: '슬로베니아에서 완전자율주행을 두 달 무상으로 쓸 수 있다는 안내가 나왔습니다',
  heroIcon: '🇸🇮', heroBig: '2개월',
  heroSub: '완전자율주행은 운전자 감독 아래 차가 차로·감속을 맡는 소프트웨어입니다. 슬로베니아에서 두 달 동안 요금 없이 쓸 수 있다는 안내가 나왔습니다.',
  cards: [
    { icon:'🗺', big:'슬로베니아', mid:'대상 국가', sub:'유럽 소국 하나' },
    { icon:'⏱', big:'2개월', mid:'무상 기간', sub:'이후 유료 전환이 관건' },
    { icon:'🛡', big:'감독', mid:'운전자 책임', sub:'무인 운행이 아님' },
  ],
  quote: '무상 기간은 체험 프로모션입니다. 97.2% 스트릭·자그레브 무인과 칸을 나누시기 바랍니다. 다음 확인할 것은 전환율입니다.',
  noteSub: '유럽은 나라마다 규제가 다릅니다. 슬로베니아 무상이 독일·프랑스 허가를 의미하지 않습니다. 다음 게이트는 유료 구독 전환입니다. 장기적으로 체험이 구독으로 남으면 소프트웨어 매출이 붙습니다.',
  footer: '테슬라 · 슬로베니아 무상',
}, {
  badge: 'TSLA', title: 'Slovenia was offered two months of FSD at no charge',
  heroIcon: '🇸🇮', heroBig: '2 mo',
  heroSub: 'FSD is driver-supervised software that handles lanes and braking. Slovenia was offered two months at no charge.',
  cards: [
    { icon:'🗺', big:'Slovenia', mid:'Country in scope', sub:'One small EU market' },
    { icon:'⏱', big:'2 mo', mid:'Free window', sub:'Paid conversion is the test' },
    { icon:'🛡', big:'Supervised', mid:'Driver remains liable', sub:'Not driverless' },
  ],
  quote: 'A free window is a trial. Split from the 97.2% streak and Zagreb driverless. Next: conversion.',
  noteSub: 'EU rules differ by country. A Slovenia trial is not a German or French permit. Next: paid-subscription conversion. Trials that stick can become software revenue over years.',
  footer: 'TSLA · Slovenia FSD',
});

add('xai-dc-overhaul', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🖥 엑스에이아이 · 데이터센터',
  title: '스페이스엑스가 엑스에이아이 데이터센터를 속도보다 안정성 쪽으로 다시 짜고 있습니다',
  heroIcon: '🔧', heroBig: '122일',
  heroSub: '콜로서스는 대규모 인공지능 학습 클러스터입니다. 122일 만에 올린 뒤 장애가 있었고, 이제는 속도보다 안정성을 우선해 설비를 다시 짜는 작업이 거론됐습니다.',
  cards: [
    { icon:'📅', big:'122일', mid:'콜로서스 구축', sub:'속도 우선의 과거' },
    { icon:'⚠️', big:'장애', mid:'가동 중단 경험', sub:'학습 일정 리스크' },
    { icon:'🛡', big:'안정', mid:'재설계 우선순위', sub:'속도보다 가동률' },
  ],
  quote: '재설계는 자본지출 일정이지 학습 성능 확정이 아닙니다. 궤도 컴퓨팅 위성과 칸을 나누시기 바랍니다. 다음 확인할 것은 가동률입니다.',
  noteSub: '장애 후 보수는 비용이 먼저 나갑니다. 테라팹 기초공사와 한 문장에 넣지 마시기 바랍니다. 다음 게이트는 재가동 공지입니다. 장기적으로 안정성이 붙으면 학습 단가가 내려갈 수 있습니다.',
  footer: '스페이스X · 데이터센터',
}, {
  badge: 'SPCX', badgeLine: '🖥 xAI · data center',
  title: 'SpaceX is overhauling the xAI data center toward reliability over speed',
  heroIcon: '🔧', heroBig: '122d',
  heroSub: 'Colossus is a large training cluster. It was stood up in 122 days, then saw outages. The rebuild now puts reliability ahead of speed.',
  cards: [
    { icon:'📅', big:'122d', mid:'Colossus build', sub:'Speed-first past' },
    { icon:'⚠️', big:'Outages', mid:'Downtime already seen', sub:'Training-calendar risk' },
    { icon:'🛡', big:'Uptime', mid:'Rebuild priority', sub:'Utilization over speed' },
  ],
  quote: 'A rebuild is a capex calendar, not a locked training result. Split from orbital-compute sats. Next: utilization.',
  noteSub: 'Repairs spend cash first. Do not mash with Terafab foundations. Next: a restart notice. Reliability can pull training cost down over years.',
  footer: 'SPCX · xAI DC',
});

add('sh22-cryo-f15', 'L2', 'SPCX', {
  badge: 'SPCX', title: '슈퍼헤비 부스터 22호기가 극저온 시험을 통과했고 15번째 비행에 42호기가 거론됐습니다',
  heroIcon: '🧊', heroBig: 'B22',
  heroSub: '극저온 시험은 초저온 연료를 넣어 탱크가 새지 않는지 보는 지상 시험입니다. 부스터 22호기가 통과했고, 15번째 비행에는 42호기가 거론됐습니다.',
  cards: [
    { label:'부스터', big:'22', mid:'극저온 통과', sub:'지상 시험이지 비행이 아님' },
    { label:'십', big:'42', mid:'비행 15 후보', sub:'매시 시험과 같은 기체 계열' },
    { label:'비행', big:'15', mid:'다음 창', sub:'매출 비행 가정과 분리' },
  ],
  detailHead: '시험과 비행을 나누면',
  detailLines: ['📍 극저온은 탱크 기밀 시험','🚀 비행 15는 아직 창','💵 매출 비행 확신과 칸을 나눔'],
  noteSub: '지상 시험 통과는 발사 허가가 아닙니다. 다음 스타십 매출 비행 발언과 칸을 나누시기 바랍니다. 다음 게이트는 정적 화재와 발사 창입니다. 장기적으로 재사용 부스터가 늘면 발사 단가가 내려갑니다.',
  footer: '스페이스X · 부스터 22',
}, {
  badge: 'SPCX', title: 'Super Heavy Booster 22 cryo-proofed, with Ship 42 cited for Flight 15',
  heroIcon: '🧊', heroBig: 'B22',
  heroSub: 'A cryo-proof loads super-cold propellant to check tank leaks on the ground. Booster 22 passed; Ship 42 is cited for Flight 15.',
  cards: [
    { label:'Booster', big:'22', mid:'Cryo passed', sub:'Ground test, not a flight' },
    { label:'Ship', big:'42', mid:'Flight 15 candidate', sub:'Same family as Massey tests' },
    { label:'Flight', big:'15', mid:'Next window', sub:'Split from revenue-flight talk' },
  ],
  detailHead: 'Split test from flight',
  detailLines: ['📍 Cryo is a tank leak check','🚀 Flight 15 is still a window','💵 Keep revenue-flight conviction separate'],
  noteSub: 'A ground pass is not a launch license. Split from revenue-flight remarks. Next: static fire and a launch window. Reusable boosters can pull launch cost down over years.',
  footer: 'SPCX · Booster 22',
});

add('boring-3b-23b', 'L5', 'TSLA', {
  badge: 'TSLA', title: '보링컴퍼니가 30억 달러 조달에 기업가치 230억 달러를 표기했습니다',
  heroIcon: '🚇', heroBig: '$23B',
  heroSub: '보링컴퍼니는 지하 터널을 파는 회사입니다. 30억 달러 시리즈 D에 기업가치 230억 달러, 아랍에미리트 터널 150km 이상이 붙었습니다.',
  before: { label:'조달', big:'$3B', sub:'시리즈 D 규모' },
  after: { label:'가치', big:'$23B', sub:'투자 후 기업가치' },
  cards: [
    { icon:'🗺', big:'150km+', mid:'아랍에미리트 터널', sub:'계획·계약 범위를 확인' },
    { icon:'🏙', big:'두바이', mid:'루프 노선', sub:'150km와 별도 칸' },
    { icon:'💵', big:'UAE', mid:'주도 투자', sub:'지역 수요가 붙음' },
  ],
  quote: '조달과 터널 킬로미터는 다른 칸입니다. 착공·개통 전에 기업가치를 확정 수요로 읽지 마시기 바랍니다. 테슬라 시총과 합치지 마시기 바랍니다.',
  noteSub: '터널은 인허가·지질이 일정을 밉니다. 사이버캡 배치와 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 착공 구간입니다. 장기적으로 개통 킬로미터가 늘면 통행 매출이 붙을 수 있습니다.',
  footer: '보링 · 230억 달러',
}, {
  badge: 'TSLA', title: 'The Boring Company printed a $3B raise at a $23B valuation',
  heroIcon: '🚇', heroBig: '$23B',
  heroSub: 'Boring digs tunnels. A $3B Series D printed a $23B valuation, with 150+ km of UAE tunnels attached.',
  before: { label:'Raise', big:'$3B', sub:'Series D size' },
  after: { label:'Value', big:'$23B', sub:'Post-money valuation' },
  cards: [
    { icon:'🗺', big:'150km+', mid:'UAE tunnels', sub:'Confirm plan versus contract' },
    { icon:'🏙', big:'Dubai', mid:'Loop route', sub:'Separate from the 150 km' },
    { icon:'💵', big:'UAE', mid:'Lead money', sub:'Regional demand attached' },
  ],
  quote: 'A raise and tunnel kilometers are different cells. Do not read valuation as opened demand before spades and openings. Do not mash with Tesla’s cap.',
  noteSub: 'Permits and geology slip tunnel calendars. Do not mash with Cybercab deployment. Next: which stretch breaks ground. Opened kilometers can become fare revenue over years.',
  footer: 'Boring · $23B',
});

add('robotaxi-app-hue', 'L3', 'TSLA', {
  badge: 'TSLA', title: '로보택시 앱 호출 색이 사이버캡 차체 색과 맞춰졌습니다',
  heroIcon: '🎨', heroBig: '색',
  heroSub: '호출 앱에서 픽업 차량을 알아보는 색이 사이버캡 도장과 같아졌다는 현장이 공유됐습니다. 소프트웨어 표식이지 운행 대수가 아닙니다.',
  cards: [
    { icon:'📱', big:'앱', mid:'호출 화면', sub:'승객이 차를 찾는 표식' },
    { icon:'🚕', big:'캡', mid:'차체 색', sub:'전용 로보택시 도장' },
    { icon:'🔗', big:'일치', mid:'색을 맞춤', sub:'브랜드·인지 축' },
  ],
  quote: '색을 맞춘 것은 제품 다듬기입니다. 유타 7대·텍사스 등록과 칸을 나누시기 바랍니다. 다음 확인할 것은 유료 호출 도시입니다.',
  noteSub: '앱 색은 공급 대수가 아닙니다. 라이더 가이드와 한 문장에 넣지 마시기 바랍니다. 다음 게이트는 호출 가능 구역입니다. 장기적으로 인지가 쉬워지면 대기 시간이 줄 수 있습니다.',
  footer: '테슬라 · 앱 색',
}, {
  badge: 'TSLA', title: 'The robotaxi app pickup hue was matched to the Cybercab body color',
  heroIcon: '🎨', heroBig: 'Hue',
  heroSub: 'The pickup color in the ride app was matched to Cybercab paint. That is a software marker, not a fleet count.',
  cards: [
    { icon:'📱', big:'App', mid:'Pickup screen', sub:'How riders spot the car' },
    { icon:'🚕', big:'Cab', mid:'Body color', sub:'Purpose-built paint' },
    { icon:'🔗', big:'Match', mid:'Hue aligned', sub:'Brand and recognition' },
  ],
  quote: 'Matching color is product polish. Split from the Utah 7 and Texas registrations. Next: paid-ride cities.',
  noteSub: 'App color is not supply. Do not mash with the rider guide. Next: geofenced pickup zones. Easier recognition can cut wait times over years.',
  footer: 'TSLA · app hue',
});

add('terafab-foundation', 'L2', 'SPCX', {
  badge: 'SPCX', title: '테라팹 1단계 기초가 한 달 전보다 40~50% 더 진행된 모습입니다',
  heroIcon: '🏗', heroBig: '+40%',
  heroSub: '테라팹은 대형 칩·패키지 공장 프로젝트입니다. 1단계 기초 공사가 한 달 전 사진보다 40~50% 더 나아갔다는 비교가 나왔습니다.',
  cards: [
    { label:'단계', big:'1', mid:'1단계 기초', sub:'건물 전체가 아님' },
    { label:'진척', big:'40–50%', mid:'한 달 대비', sub:'사진 비교 추정' },
    { label:'다음', big:'골조', mid:'기초 다음 공정', sub:'장비 반입 전 단계' },
  ],
  detailHead: '공사가 의미하는 것',
  detailLines: ['📍 기초는 착공이지 양산이 아님','📸 40~50%는 사진 비교','💵 데이터센터 재설계와 칸을 나눔'],
  noteSub: '기초 진척은 일정 힌트이지 수율 확정이 아닙니다. 엑스에이아이 데이터센터 재설계와 칸을 나누시기 바랍니다. 다음 확인할 것은 장비 반입입니다. 장기적으로 공장이 돌면 패키지 병목이 줄어들 수 있습니다.',
  footer: '스페이스X · 테라팹',
}, {
  badge: 'SPCX', title: 'Terafab Phase 1 foundations look 40–50% further than a month ago',
  heroIcon: '🏗', heroBig: '+40%',
  heroSub: 'Terafab is a large chip/packaging plant project. Phase 1 footings look 40–50% further along than photos from a month ago.',
  cards: [
    { label:'Phase', big:'1', mid:'Phase 1 footings', sub:'Not the finished plant' },
    { label:'Pace', big:'40–50%', mid:'Versus last month', sub:'Photo comparison' },
    { label:'Next', big:'Frame', mid:'After foundations', sub:'Before tool move-in' },
  ],
  detailHead: 'What the site means',
  detailLines: ['📍 Footings are groundbreaking, not yield','📸 40–50% is a photo compare','💵 Split from the data-center rebuild'],
  noteSub: 'Foundation pace is a calendar hint, not a yield lock. Split from the xAI data-center overhaul. Next: tool move-in. A running plant can ease packaging bottlenecks over years.',
  footer: 'SPCX · Terafab',
});

add('pony-zagreb-nvda', 'L6', 'NVDA', {
  badge: 'BREAKING', breaking: '엔비디아 · 자그레브',
  title: '포니에이아이와 베르네가 자그레브 시내 22km를 운전자 없이 달렸습니다',
  heroBig: '22km',
  heroSub: '포니에이아이는 중국 로보택시 회사이고 베르네는 유럽 파트너입니다. 크로아티아 자그레브 일반도로 22km를 운전자 없이 달렸고, 엔비디아 드라이브가 붙었습니다. 유럽 첫 사례로 설명됐습니다.',
  grid: [
    { icon:'📍', big:'자그레브', mid:'크로아티아 수도', sub:'일반도로 구간' },
    { icon:'📏', big:'22km', mid:'무인 구간', sub:'한 번의 시연' },
    { icon:'🖥', big:'DRIVE', mid:'엔비디아 드라이브', sub:'차량 컴퓨터 스택' },
    { icon:'🇪🇺', big:'유럽', mid:'첫 사례로 설명', sub:'허가 범위 확인 필요' },
  ],
  ctx1: '시연은 유료 호출이 아닙니다. 테슬라 사이버캡 배치와 칸을 나누시기 바랍니다.',
  ctx2: '팔란티어 엔터프라이즈 발언과 한 문장에 넣지 마시기 바랍니다.',
  quote: '22km는 한 경로의 시연입니다. 유럽 전역 허가로 읽지 마시기 바랍니다. 다음 확인할 것은 반복 운행과 요금입니다.',
  noteSub: '엔비디아 드라이브는 칩·소프트웨어 공급입니다. 차량 회사의 대수와 칸을 나누시기 바랍니다. 다음 게이트는 상용 지오펜스입니다. 장기적으로 유럽 허가가 늘면 드라이브 탑재 대수가 따라갈 수 있습니다.',
  footer: '엔비디아 · 자그레브 22km',
}, {
  badge: 'BREAKING', breaking: 'NVIDIA · ZAGREB',
  title: 'Pony.ai and Verne ran 22 km driverless on public roads in Zagreb',
  heroBig: '22km',
  heroSub: 'Pony.ai is a China robotaxi firm; Verne is the European partner. They ran 22 km driverless on Zagreb public roads with NVIDIA DRIVE — described as a first in Europe.',
  grid: [
    { icon:'📍', big:'Zagreb', mid:'Croatia’s capital', sub:'Public-road stretch' },
    { icon:'📏', big:'22km', mid:'Driverless run', sub:'One demonstration' },
    { icon:'🖥', big:'DRIVE', mid:'NVIDIA DRIVE', sub:'Vehicle compute stack' },
    { icon:'🇪🇺', big:'Europe', mid:'Cited as a first', sub:'Confirm the permit scope' },
  ],
  ctx1: 'A demo is not a paid ride. Split from Tesla Cybercab deployment.',
  ctx2: 'Do not mash with the Palantir enterprise remark.',
  quote: '22 km is one-route evidence. It is not an EU-wide permit. Next: repeat runs and fares.',
  noteSub: 'NVIDIA DRIVE is chips and software. Split from the vehicle-maker’s fleet count. Next: a commercial geofence. More EU permits can lift DRIVE units over years.',
  footer: 'NVDA · Zagreb 22 km',
});

add('cybercab-rider-guide', 'L3', 'TSLA', {
  badge: 'TSLA', title: '북미 사이버캡 탑승 안내서가 2026년 9월 4일 자로 나왔습니다',
  heroIcon: '📘', heroBig: '9/4',
  heroSub: '라이더 가이드는 승객이 차에 타기 전 읽는 안내서입니다. 북미용 사이버캡 안내서가 2026년 9월 4일 날짜로 공개됐습니다. 유료 호출 확정이 아닙니다.',
  cards: [
    { icon:'📅', big:'9/4', mid:'문서 날짜', sub:'2026년 9월 4일' },
    { icon:'🌎', big:'북미', mid:'적용 권역', sub:'유럽·아시아와 분리' },
    { icon:'🚕', big:'캡', mid:'전용 로보택시', sub:'모델Y 로보택시와 다른 차' },
  ],
  quote: '안내서는 제품 준비입니다. 앱 색·유타 7대와 칸을 나누시기 바랍니다. 다음 확인할 것은 호출이 열리는 도시입니다.',
  noteSub: '문서가 나왔다고 요금표가 있는 것은 아닙니다. 슬로베니아 무상 완전자율주행과 칸을 나누시기 바랍니다. 다음 게이트는 실제 탑승 규정입니다. 장기적으로 안내가 표준이 되면 보험·규제 대화가 쉬워질 수 있습니다.',
  footer: '테슬라 · 라이더 가이드',
}, {
  badge: 'TSLA', title: 'A North America Cybercab rider guide printed dated 2026/09/04',
  heroIcon: '📘', heroBig: '9/4',
  heroSub: 'A rider guide is what passengers read before they board. The North America Cybercab guide printed with a 2026/09/04 date. It is not a paid-ride launch.',
  cards: [
    { icon:'📅', big:'9/4', mid:'Document date', sub:'4 Sep 2026' },
    { icon:'🌎', big:'NA', mid:'Region in scope', sub:'Split from EU/Asia' },
    { icon:'🚕', big:'Cab', mid:'Purpose-built taxi', sub:'Not a Model Y robotaxi' },
  ],
  quote: 'A guide is product prep. Split from app hue and the Utah 7. Next: cities that open hailing.',
  noteSub: 'A PDF is not a fare card. Split from Slovenia’s free FSD window. Next: actual boarding rules. A standard guide can ease insurance and regulator talks over years.',
  footer: 'TSLA · rider guide',
});

add('utah-7-cybercab', 'L2', 'TSLA', {
  badge: 'TSLA', title: '유타 플레전트그로브에 핸들이 있는 사이버캡 7대가 포착됐습니다',
  heroIcon: '📍', heroBig: '7대',
  heroSub: '플레전트그로브는 유타의 도시입니다. 핸들이 달린 사이버캡 7대가 보였고, 로보택시 앱에는 아직 안 올라왔다는 설명이 붙었습니다.',
  cards: [
    { label:'대수', big:'7', mid:'포착된 차량', sub:'텍사스 등록과 다른 칸' },
    { label:'핸들', big:'있음', mid:'운전대 장착', sub:'무핸들 양산과 구분' },
    { label:'앱', big:'미등록', mid:'호출 앱 미표시', sub:'유료 공급이 아님' },
  ],
  detailHead: '현장이 의미하는 것',
  detailLines: ['📍 유타는 텍사스 플릿과 주가 다름','🛞 핸들 있는 차는 시험·이동용일 수 있음','📱 앱 미등록이면 호출 불가'],
  noteSub: '7대는 현지 목격이지 주 전체 등록이 아닙니다. 텍사스 437대 서사와 칸을 나누시기 바랍니다. 다음 확인할 것은 유타 허가입니다. 장기적으로 주가 늘면 전용차 공급 지도가 넓어집니다.',
  footer: '테슬라 · 유타 7대',
}, {
  badge: 'TSLA', title: 'Seven Cybercabs with steering wheels were spotted in Pleasant Grove, Utah',
  heroIcon: '📍', heroBig: '7',
  heroSub: 'Pleasant Grove is a Utah city. Seven Cybercabs with steering wheels were seen and were described as not yet in the robotaxi app.',
  cards: [
    { label:'Count', big:'7', mid:'Vehicles spotted', sub:'Not the Texas registry' },
    { label:'Wheel', big:'Yes', mid:'Steering wheel fitted', sub:'Not the no-wheel production look' },
    { label:'App', big:'Off', mid:'Not in the hail app', sub:'Not paid supply' },
  ],
  detailHead: 'What the sighting means',
  detailLines: ['📍 Utah is not the Texas fleet','🛞 Wheeled units may be test or ferry cars','📱 Off-app means no hail'],
  noteSub: 'Seven is a local sighting, not a statewide registry. Split from the Texas 437 story. Next: a Utah permit. More states can widen the purpose-built map over years.',
  footer: 'TSLA · Utah 7',
});

add('optimus-germany', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '🦾 옵티머스 · 홀츠게를링겐',
  title: '옵티머스 기어트레인 제조 채용이 독일 홀츠게를링겐에서 열렸습니다',
  heroIcon: '⚙️', heroBig: '기어',
  heroSub: '기어트레인은 관절을 움직이는 기어·감속기 묶음입니다. 독일 홀츠게를링겐에서 옵티머스 기어트레인 제조 인력을 뽑는 공고가 나왔습니다.',
  cards: [
    { icon:'🇩🇪', big:'독일', mid:'홀츠게를링겐', sub:'제조 거점 채용' },
    { icon:'⚙️', big:'기어', mid:'관절 구동 부품', sub:'소프트웨어와 다른 축' },
    { icon:'👷', big:'채용', mid:'제조 인력', sub:'출고 대수가 아님' },
  ],
  quote: '채용은 공장 준비입니다. 부품 5,000대 발주와 칸을 나누시기 바랍니다. 다음 확인할 것은 라인 가동입니다.',
  noteSub: '독일 공장은 유럽 공급망 힌트입니다. 경제 두 배 발언과 한 문장에 넣지 마시기 바랍니다. 다음 게이트는 주당 조립 대수입니다. 장기적으로 관절 원가가 내려가면 로봇 단가가 따라 내려갈 수 있습니다.',
  footer: '테슬라 · 옵티머스 독일',
}, {
  badge: 'TSLA', badgeLine: '🦾 Optimus · Holzgerlingen',
  title: 'An Optimus geartrain manufacturing hire opened in Holzgerlingen, Germany',
  heroIcon: '⚙️', heroBig: 'Gear',
  heroSub: 'A geartrain is the gears and reducers that move a joint. A manufacturing hire for Optimus geartrains opened in Holzgerlingen, Germany.',
  cards: [
    { icon:'🇩🇪', big:'Germany', mid:'Holzgerlingen', sub:'A manufacturing-site hire' },
    { icon:'⚙️', big:'Gear', mid:'Joint drivetrain', sub:'Not the software axis' },
    { icon:'👷', big:'Hire', mid:'Factory headcount', sub:'Not a shipment print' },
  ],
  quote: 'A hire is factory prep. Split from the 5,000-unit parts order. Next: a line running.',
  noteSub: 'A German plant is a Europe supply-chain hint. Do not mash with the double-economy remark. Next: weekly assemblies. Cheaper joints can pull robot unit cost down over years.',
  footer: 'TSLA · Optimus Germany',
});

add('starlink-direct-expand', 'L6', 'SPCX', {
  badge: 'BREAKING', breaking: '스타링크 다이렉트',
  title: '소프트뱅크 스타링크 다이렉트가 9월 28일 일본 밖으로 넓혀집니다',
  heroBig: '9/28',
  heroSub: '스타링크 다이렉트는 위성에서 휴대폰으로 바로 문자를 보내는 서비스입니다. 일본을 넘어 미국·캐나다·뉴질랜드에 먼저 열리고, 이어 필리핀이 거론됐습니다. 날짜는 9월 28일입니다.',
  grid: [
    { icon:'📅', big:'9/28', mid:'확대 날짜', sub:'일본 밖 첫 창' },
    { icon:'🇺🇸', big:'미국', mid:'다음 권역', sub:'캐나다와 같이' },
    { icon:'🇳🇿', big:'뉴질랜드', mid:'오세아니아', sub:'초기 묶음' },
    { icon:'🇵🇭', big:'필리핀', mid:'이어서', sub:'초기 3국 다음' },
  ],
  ctx1: '다이렉트는 휴대폰 문자이지 가정용 라우터 4와 다릅니다.',
  ctx2: '국가별 통신사 계약이 남습니다. 허가와 개통을 나누시기 바랍니다.',
  quote: '9월 28일은 확대 창입니다. 가입자 숫자와 바로 같지는 않습니다. 다음 확인할 것은 통신사 요금입니다.',
  noteSub: '커버 국가가 늘면 로밍 대체가 생깁니다. 라우터 4 스펙과 칸을 나누시기 바랍니다. 다음 게이트는 실제 개통 공지입니다. 장기적으로 다이렉트가 기본이 되면 위성 통신 해자가 두꺼워질 수 있습니다.',
  footer: '스페이스X · 다이렉트 확대',
}, {
  badge: 'BREAKING', breaking: 'STARLINK DIRECT',
  title: 'SoftBank Starlink Direct expands beyond Japan on September 28',
  heroBig: '9/28',
  heroSub: 'Starlink Direct sends texts from satellites to phones. It expands past Japan first to the U.S., Canada, and New Zealand, then the Philippines, on September 28.',
  grid: [
    { icon:'📅', big:'9/28', mid:'Expansion date', sub:'First window outside Japan' },
    { icon:'🇺🇸', big:'US', mid:'Next region', sub:'With Canada' },
    { icon:'🇳🇿', big:'NZ', mid:'Oceania', sub:'In the first bundle' },
    { icon:'🇵🇭', big:'PH', mid:'Then', sub:'After the first three' },
  ],
  ctx1: 'Direct is phone texting, not home Router 4.',
  ctx2: 'Carrier contracts remain. Split permit from live service.',
  quote: 'September 28 is an expansion window, not a subscriber print. Next: carrier pricing.',
  noteSub: 'More countries can substitute for roaming. Split from Router 4 specs. Next: a live-service notice. Direct as a default can thicken the satellite-comms moat over years.',
  footer: 'SPCX · Direct expand',
});

add('nvda-insider-600m', 'L1', 'NVDA', {
  badge: 'NVDA', title: '마크 스티븐스가 지난주 엔비디아 주식을 6억 달러가 넘게 팔았습니다',
  heroIcon: '📉', heroBig: '$600M+',
  heroSub: '내부자 매도는 임원·이사가 회사 주식을 파는 공시입니다. 9월 2일·4일 합이 6억 달러를 넘었고 종가는 223.67달러(−0.91%)였습니다.',
  cards: [
    { icon:'📅', big:'9/2', mid:'184만 8,501주', sub:'주당 222.26달러' },
    { icon:'📅', big:'9/4', mid:'102만 2,239주', sub:'주당 230.51달러' },
    { icon:'💵', big:'223.67', mid:'표시 종가', sub:'하루 −0.91%' },
  ],
  quote: '내부자 매도는 유동성·분산이지 실적 가속이 아닙니다. 팔란티어 스택 발언과 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 추가 공시입니다.',
  noteSub: '두 건의 공시를 합친 규모입니다. 주권 인공지능 그림과 칸을 나누시기 바랍니다. 다음 게이트는 다음 분기 실적입니다. 장기적으로 수요가 유지되면 내부자 매도는 수급 칸에만 남습니다.',
  footer: '엔비디아 · 내부자 매도',
}, {
  badge: 'NVDA', title: 'Mark Stevens sold more than $600M of NVIDIA last week',
  heroIcon: '📉', heroBig: '$600M+',
  heroSub: 'An insider sale is a director or officer selling company stock. He sold 1,848,501 shares at $222.26 on Sep 2 and 1,022,239 at $230.51 on Sep 4 — more than $600M. The print was $223.67 (−0.91%).',
  cards: [
    { icon:'📅', big:'9/2', mid:'1,848,501 shares', sub:'$222.26 per share' },
    { icon:'📅', big:'9/4', mid:'1,022,239 shares', sub:'$230.51 per share' },
    { icon:'💵', big:'223.67', mid:'Shown close', sub:'−0.91% that day' },
  ],
  quote: 'Insider sales are liquidity and diversification, not an earnings acceleration. Do not mash with the Palantir stack remark. Next: further filings.',
  noteSub: 'The figure sums two filings. Split from the sovereign-AI picture. Next: the following earnings print. If demand holds, insider sales stay a flow cell over years.',
  footer: 'NVDA · insider sale',
});

add('blackrock-tsla-6m', 'L1', 'TSLA', {
  badge: 'TSLA', title: '블랙록이 2분기에 테슬라 주식 600만 주를 사들였습니다',
  heroIcon: '🏦', heroBig: '6M',
  heroSub: '블랙록은 세계 큰 자산운용사입니다. 2분기 공시에 테슬라 보통주 600만 주 매수가 찍혔습니다. 하루 종가와 칸을 나누시기 바랍니다.',
  cards: [
    { icon:'📅', big:'2Q', mid:'공시 분기', sub:'이미 지난 분기' },
    { icon:'📦', big:'6M', mid:'매수 주식 수', sub:'보통주 기준' },
    { icon:'🏦', big:'BLK', mid:'운용사 공시', sub:'개인 매수와 다름' },
  ],
  quote: '기관 매수는 보유 공시이지 목표가 아닙니다. 유타 7대·사이버캡 스펙과 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 다음 분기 13F입니다.',
  noteSub: '2분기 숫자는 이미 지난 스냅샷입니다. 3분기 플릿 실측과 칸을 나누시기 바랍니다. 다음 게이트는 다음 공시입니다. 장기적으로 패시브 비중이 커지면 수급 변동이 지수와 같이 움직입니다.',
  footer: '테슬라 · 블랙록 600만',
}, {
  badge: 'TSLA', title: 'BlackRock bought 6 million Tesla shares in the second quarter',
  heroIcon: '🏦', heroBig: '6M',
  heroSub: 'BlackRock is a large asset manager. A Q2 filing printed a purchase of 6 million Tesla common shares. Split that from one close.',
  cards: [
    { icon:'📅', big:'Q2', mid:'Filing quarter', sub:'Already in the past' },
    { icon:'📦', big:'6M', mid:'Shares bought', sub:'Common stock' },
    { icon:'🏦', big:'BLK', mid:'Manager filing', sub:'Not a retail ticket' },
  ],
  quote: 'An institutional buy is a holdings print, not a price target. Do not mash with the Utah 7 or Cybercab specs. Next: the next 13F.',
  noteSub: 'Q2 is already a stale snapshot. Split from Q3 fleet prints. Next: the following filing. Larger passive weights can make flow move with the index over years.',
  footer: 'TSLA · BlackRock 6M',
});

add('spcx-orbital-compute', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🛰 궤도 컴퓨팅',
  title: '스페이스엑스 재무가 내년에 첫 궤도 컴퓨팅 위성을 올리겠다고 했습니다',
  heroIcon: '💻', heroBig: '내년',
  heroSub: '궤도 컴퓨팅은 지상 데이터센터 대신 위성에서 연산을 돌리는 그림입니다. 재무담당이 내년에 첫 위성을 올리겠다고 했습니다. 별자리 완성 연도와 칸을 나누시기 바랍니다.',
  cards: [
    { icon:'📅', big:'내년', mid:'첫 위성', sub:'시제·실증 단계' },
    { icon:'🛰', big:'궤도', mid:'우주에서 연산', sub:'지상 전력과 다른 축' },
    { icon:'💵', big:'CFO', mid:'재무 발언', sub:'수주 공시가 아님' },
  ],
  quote: '첫 위성은 실증입니다. 스타십 매출 비행·데이터센터 재설계와 칸을 나누시기 바랍니다. 다음 확인할 것은 발사 매니페스트입니다.',
  noteSub: '궤도 전력·냉각·다운링크가 병목입니다. V4 140m 설계와 한 문장에 넣지 마시기 바랍니다. 다음 게이트는 발사 허가입니다. 장기적으로 궤도 연산이 붙으면 지상 전력 제약을 우회할 수 있습니다.',
  footer: '스페이스X · 궤도 컴퓨팅',
}, {
  badge: 'SPCX', badgeLine: '🛰 orbital compute',
  title: 'SpaceX’s CFO said the first orbital-compute satellites go up next year',
  heroIcon: '💻', heroBig: 'Next y',
  heroSub: 'Orbital compute runs jobs on satellites instead of terrestrial data centers. The CFO said the first satellites go up next year. Split that from a finished constellation year.',
  cards: [
    { icon:'📅', big:'Next y', mid:'First satellites', sub:'Prototype / demo' },
    { icon:'🛰', big:'Orbit', mid:'Compute in space', sub:'A different axis than ground power' },
    { icon:'💵', big:'CFO', mid:'Finance remark', sub:'Not a booked contract' },
  ],
  quote: 'A first satellite is a demo. Split from Starship revenue flights and the data-center rebuild. Next: the launch manifest.',
  noteSub: 'Power, cooling, and downlink bottleneck orbital jobs. Do not mash with the V4 140 m design. Next: a launch license. Orbital compute can route around terrestrial power limits over years.',
  footer: 'SPCX · orbital compute',
});

add('congress-spcx-buy', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🏛 의회 · 스페이스X',
  title: '살라자르 의원이 스페이스엑스를 1천~1만 5천 달러 구간에 사 일곱 번째 매수자가 됐습니다',
  heroIcon: '🏛', heroBig: '7번째',
  heroSub: '공직자 거래 공시는 금액 구간만 밝힙니다. 살라자르 의원이 스페이스엑스를 1,001~1만 5,000달러 구간에 샀고, 6월 상장 이후 의회 매수자로는 일곱 번째입니다. IBM·머크 매수도 같은 공시에 있습니다.',
  cards: [
    { icon:'💵', big:'$1–15k', mid:'금액 구간', sub:'정확한 주수는 비공개' },
    { icon:'7️⃣', big:'7번째', mid:'6월 이후 의회', sub:'개인 베팅 규모는 작음' },
    { icon:'📋', big:'PTR', mid:'거래 공시', sub:'실적 가속이 아님' },
  ],
  quote: '의회 매수는 관심 신호입니다. 락업 3.19억 주·종가와 칸을 나누시기 바랍니다. 다음 확인할 것은 추가 공시입니다.',
  noteSub: '구간 공시는 정확한 금액이 아닙니다. 보링 230억 달러와 한 문장에 넣지 마시기 바랍니다. 다음 게이트는 다음 PTR입니다. 장기적으로 상장 유동성이 붙으면 공직자 거래도 늘어날 수 있습니다.',
  footer: '스페이스X · 의회 매수',
}, {
  badge: 'SPCX', badgeLine: '🏛 Congress · SpaceX',
  title: 'Rep. Salazar bought SpaceX in the $1k–$15k band, the seventh Congress buyer since June',
  heroIcon: '🏛', heroBig: '7th',
  heroSub: 'A public-trade filing shows only a dollar band. Rep. Salazar bought SpaceX in the $1,001–$15,000 band — the seventh member since the June listing. IBM and Merck sits on the same filing.',
  cards: [
    { icon:'💵', big:'$1–15k', mid:'Dollar band', sub:'Share count not shown' },
    { icon:'7️⃣', big:'7th', mid:'Since June listing', sub:'A small personal ticket' },
    { icon:'📋', big:'PTR', mid:'Trade filing', sub:'Not an earnings acceleration' },
  ],
  quote: 'A Congress buy is an attention signal. Split from the 319M unlock and the close. Next: further filings.',
  noteSub: 'A band is not an exact dollar amount. Do not mash with Boring’s $23B. Next: the next PTR. More listed float can lift official trading over years.',
  footer: 'SPCX · Congress buy',
});

};
