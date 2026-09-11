// 2026-09-11 SVG topic data — consumed by gen-reports-20260911.js
// Layout mix: ROWS×1 L1×4 L2×4 L3×4 L4×4 L5×2 L6×3 (individuals ≤40% one layout)
// Copy rule: hero/cards/quote = screenshot facts (numbers + scene), beginner Korean, positive long view
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.11 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'라우터', title:'스타링크 라우터 4가 와이파이 7·기기 510대·3,500평방피트를 찍었습니다',
      sub:'무게 약 0.9파운드, 이더넷 단자 두 개입니다. 집 안 공유기 스펙이 나온 날입니다.' },
    { color:'#4ade80', fill:'#061209', right:'캡', title:'사이버캡이 공기저항 0.2 미만, 전비 165와트시/마일로 소개됐습니다',
      sub:'눈물방울 차체와 테슬라 첫 전륜구동입니다. 양산 전기차 가운데 전기를 가장 적게 쓴다고 했습니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'팔란티어가 세계에서 가장 중요한 기업용 스택이라는 발언이 나왔습니다',
      sub:'온톨로지·파운드리·AIP와 엔비디아 칩을 한 세트로 쓰는 그림입니다. 핵심 공급망에 주권 인공지능을 붙입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'10년', title:'미국 10년물이 4.92%로 올라 2023년 10월 이후 최고권입니다',
      sub:'하루 +0.08%포인트입니다. 2023년 말 3.86%에서 다시 이 높이입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'보링', title:'보링컴퍼니가 30억 달러를 모아 기업가치 230억 달러를 찍었습니다',
      sub:'아랍에미리트가 주도했고 터널 150km 이상이 붙었습니다. 라스베이거스·내슈빌·두바이 루프입니다.' },
    { color:'#4ade80', fill:'#061209', right:'FSD', title:'슬로베니아에서 완전자율주행을 두 달 무상으로 쓸 수 있습니다',
      sub:'요금 없이 차로·감속을 체험하는 기간입니다. 유럽 소국 하나의 안내입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'스타십', title:'다음 스타십 비행이 매출을 내는 비행이 될 수 있다는 확신이 나왔습니다',
      sub:'시험이 아니라 고객 화물을 실어 돈을 받는 단계로 넘어간다는 표현입니다. 연간 반복매출 1,000억 달러 확신이 붙었습니다.' },
  ],
  caption: '더 볼 것: 라우터4 · Cd0.2 · 온톨로지 · 10년 4.92% · 보링 230억 · 슬로베니아 · 스타십 매출',
}, {
  headline: '2026.09.11 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'Router', title:'Starlink Router 4 printed Wi-Fi 7, 510 devices, and 3,500 sq ft',
      sub:'About 0.9 lb and two Ethernet ports. Indoor Wi-Fi spec day.' },
    { color:'#4ade80', fill:'#061209', right:'Cab', title:'Cybercab printed Cd under 0.2 and 165 Wh/mi',
      sub:'Teardrop body and Tesla’s first FWD. Called the most efficient production EV.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'Palantir was called the single most important enterprise stack',
      sub:'Ontology, Foundry, and AIP sit on NVIDIA chips. Sovereign AI for critical supply chains.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'10y', title:'The U.S. 10-year printed 4.92%, highest since Oct 2023',
      sub:'+0.08 percentage point. Back to a height last seen after 3.86% at end-2023.' },
    { color:'#c084fc', fill:'#140b1f', right:'Boring', title:'The Boring Company printed a $3B raise at a $23B valuation',
      sub:'UAE-led, 150+ km of tunnels. Vegas, Nashville, and Dubai Loop.' },
    { color:'#4ade80', fill:'#061209', right:'FSD', title:'Slovenia was offered two months of FSD at no charge',
      sub:'A trial of supervised lane and brake software. One small EU market.' },
    { color:'#c084fc', fill:'#140b1f', right:'Ship', title:'The next Starship flight was framed as revenue-generating',
      sub:'From test flights to paid customer cargo. $100B ARR conviction attached.' },
  ],
  caption: 'Watch: Router 4 · Cd<0.2 · ontology · 10y 4.92% · Boring $23B · Slovenia · Starship revenue',
});

add('starlink-router-4', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스타링크 라우터 4가 와이파이 7에 기기 510대·면적 3,500평방피트를 표기했습니다',
  heroIcon: '📡', heroBig: '510대',
  heroSub: '라우터 4는 접시가 받은 위성 인터넷을 집 안에 뿌리는 상자입니다. 화면에 와이파이 7, 동시 기기 510대, 커버 3,500평방피트, 무게 약 0.9파운드가 찍혔습니다.',
  cards: [
    { label:'기기', big:'510', mid:'한꺼번에 붙는 대수', sub:'가족·사무실 기기 여유' },
    { label:'면적', big:'3,500', mid:'평방피트 커버', sub:'약 325제곱미터, 이전 미니 2,000에서 확대' },
    { label:'무게', big:'0.9lb', mid:'약 400그램', sub:'크기 1.8×8×4.5인치, 이더넷 2개' },
  ],
  detailHead: '화면에 찍힌 스펙',
  detailLines: ['📍 스타링크 첫 와이파이 7 칩, 혼잡한 집에서도 속도가 더 잘 나옵니다','📶 2.4기가 안테나 4개·5기가 안테나 5개, 방수·영하 30~영상 50도','💵 일부 지역부터 곧 판매, 가격은 아직 없습니다'],
  noteSub: '위성 인터넷의 약점은 접시는 빠른데 집 안 와이파이가 예전 규격인 경우가 많았습니다. 공유기만 바꿔도 방 끝 끊김이 줄어들면 가입이 쉬워집니다. 앞으로 3~5년 단말이 가벼워질수록 유선이 없는 집에서 위성이 기본 인터넷이 될 수 있습니다.',
  footer: '스페이스X · 라우터 4',
}, {
  badge: 'SPCX', title: 'Starlink Router 4 printed Wi-Fi 7, 510 devices, and 3,500 sq ft',
  heroIcon: '📡', heroBig: '510',
  heroSub: 'Router 4 is the box that spreads dish internet through the home. The screen printed Wi-Fi 7, 510 devices, 3,500 sq ft, and about 0.9 lb.',
  cards: [
    { label:'Devices', big:'510', mid:'Simultaneous devices', sub:'Room for family and office gadgets' },
    { label:'Area', big:'3,500', mid:'Sq ft coverage', sub:'About 325 m², up from Mini ~2,000' },
    { label:'Weight', big:'0.9lb', mid:'About 400 g', sub:'1.8×8×4.5 in, two Ethernet ports' },
  ],
  detailHead: 'What the screen printed',
  detailLines: ['📍 First Starlink Wi-Fi 7 chipset, better peak speed in crowded rooms','📶 4×4 on 2.4 GHz and 5×5 on 5 GHz, water-resistant, −30 to +50°C','💵 Rolling out in some regions soon; price not yet shown'],
  noteSub: 'Satellite internet often dies at the old indoor radio. A better router can make Starlink feel like home broadband. Lighter terminals over 3–5 years can make satellite the default where fiber never arrives.',
  footer: 'SPCX · Router 4',
});

add('cybercab-cd-165', 'L1', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 공기저항이 0.2 미만, 전비 165와트시/마일로 찍혔습니다',
  heroIcon: '🍃', heroBig: '165',
  heroSub: '화면에 눈물방울 차체, 앞바퀴 간격이 뒤보다 넓은 트랙, 공기저항 0.2 미만, 전비 165와트시/마일이 같이 나왔습니다. 테슬라 첫 전륜구동이고, 양산 전기차 가운데 전기를 가장 적게 쓴다고 했습니다.',
  cards: [
    { icon:'💨', big:'<0.2', mid:'공기저항계수', sub:'공기를 가르는 저항, 눈물방울 형상' },
    { icon:'🔋', big:'165', mid:'와트시/마일', sub:'1마일(약 1.6km)에 쓰는 전기' },
    { icon:'🛞', big:'전륜', mid:'테슬라 첫 전륜구동', sub:'앞바퀴가 끌고 뒤 트랙은 더 좁음' },
  ],
  quote: '전비가 낮을수록 같은 배터리로 더 오래 손님을 태울 수 있습니다. 165와트시/마일은 택시 한 대가 하루에 쓰는 전기 요금을 낮추는 숫자입니다. 다음에 보면 좋은 것은 일반 도로에서 찍힌 전비입니다.',
  noteSub: '로보택시는 하루 종일 달리므로 전기가 원가의 큰 몫입니다. 차체를 처음부터 택시에 맞게 깎으면 충전 횟수가 줄어듭니다. 앞으로 3~5년 전비가 현장에서 유지되면 무인 택시 한 대 이익이 더 분명해질 수 있습니다.',
  footer: '테슬라 · 사이버캡 전비',
}, {
  badge: 'TSLA', title: 'Cybercab Cd printed under 0.2 with 165 Wh per mile',
  heroIcon: '🍃', heroBig: '165',
  heroSub: 'The screen paired a teardrop body, a wider front track, Cd under 0.2, and 165 Wh/mi. It is Tesla’s first FWD and was called the most efficient production EV.',
  cards: [
    { icon:'💨', big:'<0.2', mid:'Drag coefficient', sub:'Teardrop body that slips through air' },
    { icon:'🔋', big:'165', mid:'Wh per mile', sub:'Electricity to drive about 1.6 km' },
    { icon:'🛞', big:'FWD', mid:'Tesla’s first FWD', sub:'Front track wider than the rear' },
  ],
  quote: 'Lower Wh/mi means more paid miles on the same pack. 165 Wh/mi is a daily electricity bill for a taxi. Next: the same number on public roads.',
  noteSub: 'A robotaxi runs all day, so energy is a large slice of cost. A purpose-built body can cut charging stops. If the spec holds on the street over 3–5 years, unit profit gets clearer.',
  footer: 'TSLA · Cybercab energy',
});

add('tsla-fsd-awesome', 'L3', 'TSLA', {
  badge: 'TSLA', title: '완전자율주행이 훌륭하다는 발언과 97.2%·177.7마일 스트릭이 같이 나왔습니다',
  heroIcon: '🛣', heroBig: '97.2%',
  heroSub: '화면에 「테슬라 자율주행이 훌륭하다」는 짧은 글과 함께 성공 비율 97.2%, 연속 주행 177.7마일이 막대 그래프로 찍혔습니다. 스트릭은 사람이 핸들을 안 잡은 채 이어 간 거리입니다.',
  cards: [
    { icon:'✅', big:'97.2%', mid:'화면에 찍힌 성공 비율', sub:'한 구간의 기록입니다' },
    { icon:'📏', big:'177.7', mid:'마일 스트릭', sub:'약 286킬로미터를 이어서 달림' },
    { icon:'🗣', big:'훌륭', mid:'톤이 세진 평가', sub:'차가 차로와 감속을 잘한다는 말' },
  ],
  quote: '성공 비율과 마일 숫자는 「이 구간에서는 개입이 거의 없었다」는 현장 기록입니다. 완전자율주행은 운전자가 지켜보는 소프트웨어입니다. 다음에 보면 좋은 것은 같은 숫자가 여러 도시에서 반복되는지입니다.',
  noteSub: '개입이 줄수록 손님만 타고 가는 그림이 현실에 가까워집니다. 오늘은 한 화면의 기록과 자신감 있는 한 줄입니다. 앞으로 3~5년 이런 구간이 늘면 유료 소프트웨어와 로보택시 이야기가 같이 커질 수 있습니다.',
  footer: '테슬라 · 완전자율주행',
}, {
  badge: 'TSLA', title: 'A “self-driving is awesome” remark sat beside a 97.2% / 177.7-mile streak',
  heroIcon: '🛣', heroBig: '97.2%',
  heroSub: 'The screen printed “Tesla self-driving is awesome” next to a 97.2% bar and a 177.7-mile streak. A streak is miles driven without a documented hand-on-wheel.',
  cards: [
    { icon:'✅', big:'97.2%', mid:'Printed success rate', sub:'One-segment evidence' },
    { icon:'📏', big:'177.7', mid:'Mile streak', sub:'About 286 km in a row' },
    { icon:'🗣', big:'Awesome', mid:'Stronger tone', sub:'Lanes and braking felt solid' },
  ],
  quote: 'The rate and the miles say this stretch needed almost no intervention. FSD is still driver-supervised software. Next: the same print in more cities.',
  noteSub: 'Fewer interventions move unsupervised rides closer. Today is one screen and a confident line. Over 3–5 years, more stretches like this can grow paid software and robotaxi stories together.',
  footer: 'TSLA · FSD streak',
});

add('spcx-starship-revenue', 'L5', 'SPCX', {
  badge: 'SPCX', title: '다음 스타십 비행이 매출을 내는 비행이 될 수 있다는 확신이 나왔습니다',
  heroIcon: '🚀', heroBig: '$100B',
  heroSub: '화면에 「다음 스타십 비행이 매출을 낸다」는 문장과 스페이스엑스 주가 약 148.18달러(+0.43%)가 같이 있었습니다. 시험이 아니라 고객 화물을 실어 돈을 받는 단계로 넘어간다는 뜻입니다.',
  before: { label:'지금까지', big:'시험', sub:'기술 검증 비행' },
  after: { label:'다음 비행', big:'매출', sub:'고객 화물이 붙을 수 있음' },
  cards: [
    { icon:'💵', big:'$100B', mid:'연간 반복매출 확신', sub:'경영진이 말한 목표 크기' },
    { icon:'📈', big:'148.18', mid:'화면에 찍힌 주가', sub:'하루 +0.43%' },
    { icon:'📦', big:'화물', mid:'유료 페이로드', sub:'계측기가 아니라 손님 짐' },
  ],
  quote: '매출 비행은 보험·허가·손님 이름이 붙을 때 이야기가 더 튼튼해집니다. 1,000억 달러는 「발사 횟수가 늘면 이 정도까지 볼 수 있다」는 큰 그림입니다. 다음에 보면 좋은 것은 화물을 맡긴 고객입니다.',
  noteSub: '지금까지 스타십은 하늘을 배우는 단계였습니다. 돈을 받는 비행이 시작되면 발사 단가를 나누는 손님이 생깁니다. 앞으로 3~5년 발사가 잦아지면 위성·화물 가격이 내려가 더 많은 손님이 붙을 수 있습니다.',
  footer: '스페이스X · 스타십 매출',
}, {
  badge: 'SPCX', title: 'The next Starship flight was framed as revenue-generating',
  heroIcon: '🚀', heroBig: '$100B',
  heroSub: 'The screen said the next Starship flight will generate revenue, beside SpaceX near $148.18 (+0.43%). That is paid customer cargo, not another test instrument.',
  before: { label:'So far', big:'Test', sub:'Engineering flights' },
  after: { label:'Next flight', big:'Paid', sub:'Customer payload possible' },
  cards: [
    { icon:'💵', big:'$100B', mid:'ARR conviction', sub:'A management target size' },
    { icon:'📈', big:'148.18', mid:'Printed share price', sub:'+0.43% on the day' },
    { icon:'📦', big:'Cargo', mid:'Paid payload', sub:'A customer crate, not a sensor' },
  ],
  quote: 'A revenue flight gets firmer when insurance, permits, and a named customer land. $100B is the picture if cadence rises. Next: who books the cargo.',
  noteSub: 'Starship so far was school. Paid flights bring customers who share launch cost. Over 3–5 years, higher cadence can pull satellite and cargo prices down and invite more bookings.',
  footer: 'SPCX · Starship revenue',
});

add('nvda-pltr-stack', 'L6', 'NVDA', {
  badge: 'BREAKING', breaking: '엔비디아 · 팔란티어',
  title: '팔란티어가 세계에서 가장 중요한 기업용 스택이라는 발언이 나왔습니다',
  heroBig: '온톨로지',
  heroSub: '엔비디아 최고경영자가 팔란티어를 「세계에서 가장 중요한 기업용 스택」이라고 했습니다. 온톨로지는 회사 안 흩어진 표·문서를 지도처럼 잇는 정리함이고, 엔비디아 칩과 붙이면 빛에 가까운 속도로 처리한다고 했습니다.',
  grid: [
    { icon:'🗺', big:'온톨로지', mid:'회사 데이터 지도', sub:'부품 번호와 납기를 인공지능이 읽게 함' },
    { icon:'🏢', big:'파운드리', mid:'AIP와 한 세트', sub:'업무용 인공지능을 올리는 층' },
    { icon:'🏛', big:'주권 AI', mid:'데이터를 국내에', sub:'핵심 공급망을 나라 안에서 돌림' },
    { icon:'🔗', big:'공급망', mid:'수백만 부품', sub:'수천 개 협력사 재고를 실시간으로' },
  ],
  ctx1: '두 회사는 엔비디아 공개 모델과 팔란티어 파운드리·AIP·온톨로지를 묶어 운영 인공지능 스택을 만든다고 했습니다.',
  ctx2: '첫 그림은 엔비디아 자기 공장 공급망입니다. 칩과 데이터 지도를 같이 쓰면 손님이 한 번에 도입할 수 있습니다.',
  quote: '기업용 스택은 칩 위에 올라가는 업무용 두뇌입니다. 인공지능이 글을 잘해도 우리 회사 납기를 모르면 결정을 못 합니다. 온톨로지가 그 번역기입니다.',
  noteSub: '나라가 공장 데이터를 밖에 내기 싫어하면, 검증된 칩과 보안을 통과한 소프트웨어가 한 세트로 팔릴 기회가 커집니다. 앞으로 3~5년 인공지능이 공장·정부 도구가 되면 엔비디아는 가속기를, 팔란티어는 그 위 구독을 늘릴 수 있습니다.',
  footer: '엔비디아 · 팔란티어',
}, {
  badge: 'BREAKING', breaking: 'NVIDIA · PALANTIR',
  title: 'Palantir was called the single most important enterprise stack in the world',
  heroBig: 'Ontology',
  heroSub: 'NVIDIA’s CEO called Palantir the single most important enterprise stack. Ontology maps a company’s tables and documents; paired with NVIDIA chips it was said to process at the speed of light.',
  grid: [
    { icon:'🗺', big:'Ontology', mid:'Company data map', sub:'Lets AI read part numbers and due dates' },
    { icon:'🏢', big:'Foundry', mid:'With AIP', sub:'The layer that runs workplace AI' },
    { icon:'🏛', big:'Sovereign', mid:'Data stays home', sub:'Critical supply chains onshore' },
    { icon:'🔗', big:'Supply', mid:'Millions of parts', sub:'Live view across thousands of suppliers' },
  ],
  ctx1: 'The two firms said they built an operations-AI stack from NVIDIA open models plus Palantir Foundry, AIP, and Ontology.',
  ctx2: 'The first picture is NVIDIA’s own factory supply chain. Chip plus data map can be adopted together.',
  quote: 'An enterprise stack is the workplace brain on top of chips. A fluent model still cannot decide if it does not know your due dates. Ontology is that translator.',
  noteSub: 'Countries that want factory data at home will buy a vetted chip and a cleared software layer as a set. Over 3–5 years, as AI becomes a factory and government tool, NVIDIA can sell more accelerators and Palantir more subscriptions.',
  footer: 'NVDA · Palantir',
});

add('ust-10y-492', 'L1', 'RATES', {
  badge: 'MACRO', title: '미국 10년물이 4.92%로 올라 2023년 10월 이후 최고권입니다',
  heroIcon: '📈', heroBig: '4.92%',
  heroSub: '10년물 금리는 나라 빚 10년을 살 때 받는 이자입니다. 화면에 4.92%, 하루 +0.08%포인트, 2023년 10월 이후 이 높이가 다시 나왔다고 찍혔습니다. 2023년 말에는 3.86%까지 내려간 적도 있습니다.',
  cards: [
    { icon:'📅', big:'10월', mid:'2023년 이후 최고', sub:'같은 높이가 다시 나온 달' },
    { icon:'➕', big:'+0.08', mid:'하루 변화', sub:'퍼센트포인트, 화면 화살표' },
    { icon:'🏭', big:'3.86%', mid:'2023년 말 저점', sub:'그사이 한 번 크게 내려갔다가 복귀' },
  ],
  quote: '금리가 오르면 미래 이익을 오늘 값으로 바꿀 때 나누는 숫자가 커집니다. 주식과 비트코인 가격이 무거워질 수 있는 이유입니다. 다음에 보면 좋은 것은 소비자물가와 9월 16일 정책 회의입니다.',
  noteSub: '8월 생산자물가(공장 출고 가격)는 전년보다 5.4% 올라 예상 5.3%를 조금 웃돌았습니다. 물가가 천천히 안정되면 금리도 숨 고를 여지가 있습니다. 앞으로 3~5년 금리가 예측 가능해지면 성장 이야기의 할인이 다시 얇아질 수 있습니다.',
  footer: '매크로 · 10년물 4.92%',
}, {
  badge: 'MACRO', title: 'The U.S. 10-year printed 4.92%, highest since October 2023',
  heroIcon: '📈', heroBig: '4.92%',
  heroSub: 'The 10-year yield is the coupon for holding a 10-year Treasury. The screen printed 4.92%, +0.08 on the day, a height last seen in October 2023. It had fallen to 3.86% by end-2023.',
  cards: [
    { icon:'📅', big:'Oct', mid:'Highest since 2023', sub:'The last time this height printed' },
    { icon:'➕', big:'+0.08', mid:'One-day change', sub:'Percentage points on the chart' },
    { icon:'🏭', big:'3.86%', mid:'End-2023 low', sub:'A full-point drop, then a return' },
  ],
  quote: 'A higher yield is a bigger divisor when today’s price buys future profits. That can weigh on stocks and bitcoin. Next: CPI and the September 16 meeting.',
  noteSub: 'August PPI (factory-gate prices) printed 5.4% YoY versus 5.3% expected. If inflation cools, yields can catch their breath. Over 3–5 years, a more predictable rate path can thin the discount on growth stories.',
  footer: 'MACRO · 10-year 4.92%',
});

add('slovenia-fsd-free', 'L3', 'TSLA', {
  badge: 'TSLA', title: '슬로베니아에서 완전자율주행을 두 달 무상으로 쓸 수 있다는 안내가 나왔습니다',
  heroIcon: '🇸🇮', heroBig: '2개월',
  heroSub: '화면에 「슬로베니아 테슬라 사용자가 완전자율주행을 두 달 무료로 받는다」고 적혀 있습니다. 완전자율주행은 운전자가 지켜보는 동안 차가 차로와 감속을 맡는 소프트웨어입니다.',
  cards: [
    { icon:'🗺', big:'슬로베니아', mid:'대상 국가', sub:'유럽 소국 하나의 안내' },
    { icon:'⏱', big:'2개월', mid:'무상 기간', sub:'끝난 뒤 유료로 남는지가 관건' },
    { icon:'🛡', big:'감독', mid:'운전자가 책임', sub:'핸들 없는 무인 운행은 아닙니다' },
  ],
  quote: '두 달은 차를 가진 사람이 소프트웨어를 직접 느껴 보는 체험입니다. 유럽은 나라마다 규칙이 달라 슬로베니아 안내가 독일·프랑스 허가는 아닙니다. 다음에 보면 좋은 것은 무료가 끝난 뒤 구독으로 남는 비율입니다.',
  noteSub: '체험이 편하면 유료 구독이 남고, 그게 소프트웨어 매출이 됩니다. 오늘은 한 나라의 친절한 안내입니다. 앞으로 3~5년 이런 체험이 여러 나라에 퍼지면 완전자율주행이 「옵션」에서 「기본에 가까운 서비스」로 커질 수 있습니다.',
  footer: '테슬라 · 슬로베니아 무상',
}, {
  badge: 'TSLA', title: 'Slovenia was offered two months of FSD at no charge',
  heroIcon: '🇸🇮', heroBig: '2 mo',
  heroSub: 'The screen said Tesla users in Slovenia now receive two months of FSD free. FSD is driver-supervised software that handles lanes and braking.',
  cards: [
    { icon:'🗺', big:'Slovenia', mid:'Country in scope', sub:'One small EU market notice' },
    { icon:'⏱', big:'2 mo', mid:'Free window', sub:'Paid conversion is the test' },
    { icon:'🛡', big:'Supervised', mid:'Driver remains liable', sub:'Not a driverless ride' },
  ],
  quote: 'Two months is a trial so owners can feel the software. EU rules differ by country, so this is not a German or French permit. Next: how many stay after the free window.',
  noteSub: 'A pleasant trial can become a paid subscription, which is software revenue. Today is one country’s welcome. Over 3–5 years, more trials can move FSD from optional extra toward a default service.',
  footer: 'TSLA · Slovenia FSD',
});

add('xai-dc-overhaul', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🖥 엑스에이아이 · 데이터센터',
  title: '스페이스엑스가 엑스에이아이 데이터센터를 속도보다 안정성 쪽으로 다시 짜고 있습니다',
  heroIcon: '🔧', heroBig: '122일',
  heroSub: '화면에 「122일 만에 올린 콜로서스 이후 장애가 있었고, 이제는 속도보다 안정성을 우선한다」고 적혀 있습니다. 콜로서스는 대규모 인공지능 학습 컴퓨터 단지입니다.',
  cards: [
    { icon:'📅', big:'122일', mid:'콜로서스 구축', sub:'아주 빠르게 올린 과거' },
    { icon:'⚠️', big:'장애', mid:'가동이 멈춘 경험', sub:'학습 일정이 밀릴 수 있음' },
    { icon:'🛡', big:'안정', mid:'다시 짜는 우선순위', sub:'빨리보다 오래 켜 두기' },
  ],
  quote: '빨리 올린 단지가 멈추면 학습이 끊깁니다. 안정성을 높이면 같은 칩으로 더 오래 계산할 수 있습니다. 다음에 보면 좋은 것은 다시 켜졌다는 공지와 가동률입니다.',
  noteSub: '인공지능 공장은 「한 번 짓고 끝」이 아니라 전기를 안정적으로 쓰는 운영이 핵심입니다. 오늘은 보수가 먼저 나가는 구간입니다. 앞으로 3~5년 가동률이 높아지면 학습 한 번의 단가가 내려갈 수 있습니다.',
  footer: '스페이스X · 데이터센터',
}, {
  badge: 'SPCX', badgeLine: '🖥 xAI · data center',
  title: 'SpaceX is overhauling the xAI data center toward reliability over speed',
  heroIcon: '🔧', heroBig: '122d',
  heroSub: 'The screen said Colossus went up in 122 days, then saw outages, and the rebuild now puts reliability ahead of speed. Colossus is a large training cluster.',
  cards: [
    { icon:'📅', big:'122d', mid:'Colossus build', sub:'A speed-first past' },
    { icon:'⚠️', big:'Outages', mid:'Downtime already seen', sub:'Training calendars can slip' },
    { icon:'🛡', big:'Uptime', mid:'Rebuild priority', sub:'Stay on more than go fast' },
  ],
  quote: 'A fast cluster that stops wastes training days. More reliability means more hours on the same chips. Next: a restart notice and utilization.',
  noteSub: 'An AI factory is not “build once.” Steady power and uptime are the job. Today spends on repairs first. Over 3–5 years, higher utilization can pull the cost of one training run down.',
  footer: 'SPCX · xAI DC',
});

add('sh22-cryo-f15', 'L2', 'SPCX', {
  badge: 'SPCX', title: '슈퍼헤비 부스터 22호기가 극저온 시험을 통과했고 15번째 비행에 42호기가 거론됐습니다',
  heroIcon: '🧊', heroBig: 'B22',
  heroSub: '화면에 스타베이스 매시 시험장 사진과 날짜 2026년 9월 9일이 있습니다. 부스터 22호기가 극저온 시험을 통과했고, 15번째 비행에는 42호기가 거론됐습니다. 극저온 시험은 아주 차가운 연료를 넣어 탱크가 새는지 보는 지상 시험입니다.',
  cards: [
    { label:'부스터', big:'22', mid:'극저온 통과', sub:'땅에서 하는 기밀 시험' },
    { label:'십', big:'42', mid:'비행 15 후보', sub:'같은 날 추가 시험이 거론됨' },
    { label:'비행', big:'15', mid:'다음 창', sub:'날짜 2026.09.09 현장' },
  ],
  detailHead: '사진에 나온 것',
  detailLines: ['📍 흰색 부스터와 타워가 나란히 선 스타베이스 아침 하늘','🚀 극저온은 발사 허가가 아니라 탱크가 버티는지 확인','💵 다음으로 보면 좋은 것은 엔진을 땅에 묶어 켜 보는 정적 화재입니다'],
  noteSub: '재사용 로켓은 「한 번 쓰고 버리는 연료통」이 아니라 「다시 쓰는 비행기」에 가깝습니다. 지상 시험을 통과한 부스터가 늘면 발사 간격이 짧아집니다. 앞으로 3~5년 재사용이 붙으면 위성 올리는 값이 내려갈 수 있습니다.',
  footer: '스페이스X · 부스터 22',
}, {
  badge: 'SPCX', title: 'Super Heavy Booster 22 cryo-proofed, with Ship 42 cited for Flight 15',
  heroIcon: '🧊', heroBig: 'B22',
  heroSub: 'The screen showed Massey at Starbase dated 2026-09-09. Booster 22 passed cryo-proof; Ship 42 is cited for Flight 15. Cryo-proof loads super-cold propellant to check tank leaks on the ground.',
  cards: [
    { label:'Booster', big:'22', mid:'Cryo passed', sub:'A ground leak check' },
    { label:'Ship', big:'42', mid:'Flight 15 candidate', sub:'More testing the same day' },
    { label:'Flight', big:'15', mid:'Next window', sub:'Site date 2026-09-09' },
  ],
  detailHead: 'What the photos show',
  detailLines: ['📍 A white booster and tower under a Starbase morning sky','🚀 Cryo is not a launch license; it is a tank check','💵 Next: a static fire with engines held to the ground'],
  noteSub: 'A reusable rocket is closer to an airplane than a throw-away tank. More boosters that pass ground tests can shorten the gap between flights. Over 3–5 years, reuse can pull the price of lofting a satellite down.',
  footer: 'SPCX · Booster 22',
});

add('boring-3b-23b', 'L5', 'TSLA', {
  badge: 'TSLA', title: '보링컴퍼니가 30억 달러 조달에 기업가치 230억 달러를 표기했습니다',
  heroIcon: '🚇', heroBig: '$23B',
  heroSub: '화면에 터널 속 차 사진과 함께 시리즈 D 30억 달러, 기업가치 230억 달러, 아랍에미리트 주도, 터널 150km 이상이 찍혔습니다. 보링은 지하에 작은 터널을 파는 회사입니다.',
  before: { label:'조달', big:'$3B', sub:'시리즈 D 규모' },
  after: { label:'가치', big:'$23B', sub:'투자 후 기업가치' },
  cards: [
    { icon:'🗺', big:'150km+', mid:'아랍에미리트 터널', sub:'두바이 루프에 더해지는 거리' },
    { icon:'🏙', big:'3도시', mid:'라스베이거스·내슈빌·두바이', sub:'이미 있는 루프를 키우는 그림' },
    { icon:'💵', big:'UAE', mid:'주도 투자', sub:'휴먼·바이·세쿼이아 등이 같이' },
  ],
  quote: '터널이 열리면 지상 도로를 안 막고 공항에서 호텔까지 몇 정거장으로 갑니다. 150km는 「나라 안에 터널 그물을 깔겠다」는 크기입니다. 다음에 보면 좋은 것은 어느 구간이 먼저 땅을 파는지입니다.',
  noteSub: '지난 2년 보링은 한 도시 시험이 아니라 여러 도시 터널 회사로 커졌습니다. 오늘 돈은 굴착·운영·다음 도시 준비에 쓰인다고 했습니다. 앞으로 3~5년 개통 킬로미터가 늘면 통행료가 반복 매출이 될 수 있습니다.',
  footer: '보링 · 230억 달러',
}, {
  badge: 'TSLA', title: 'The Boring Company printed a $3B raise at a $23B valuation',
  heroIcon: '🚇', heroBig: '$23B',
  heroSub: 'The screen showed a car in a lit tunnel with a $3B Series D, a $23B valuation, UAE lead, and 150+ km of tunnels. Boring digs small underground roads.',
  before: { label:'Raise', big:'$3B', sub:'Series D size' },
  after: { label:'Value', big:'$23B', sub:'Post-money valuation' },
  cards: [
    { icon:'🗺', big:'150km+', mid:'UAE tunnels', sub:'Distance on top of Dubai Loop' },
    { icon:'🏙', big:'3 cities', mid:'Vegas, Nashville, Dubai', sub:'Growing loops already on the map' },
    { icon:'💵', big:'UAE', mid:'Lead money', sub:'Human, Vy, Sequoia and others joined' },
  ],
  quote: 'An open tunnel moves airport-to-hotel traffic without chewing surface streets. 150 km is a national-scale tunnel grid. Next: which stretch breaks ground first.',
  noteSub: 'In two years Boring grew from one-city demo toward a multi-city tunneled transit firm. Today’s cash is for digging, ops, and the next city. Over 3–5 years, opened kilometers can become fare revenue.',
  footer: 'Boring · $23B',
});

add('robotaxi-app-hue', 'L3', 'TSLA', {
  badge: 'TSLA', title: '로보택시 앱 호출 색이 사이버캡 차체 색과 맞춰졌습니다',
  heroIcon: '🎨', heroBig: '화살표',
  heroSub: '밤 화면에는 휴대폰에 흰 화살표가 픽업 지점을 가리키고, 그 색이 사이버캡 안팎 등과 같다고 적혀 있습니다. 여러 대가 한 블록에 있을 때 「내 차」를 바로 찾게 하려는 표식입니다.',
  cards: [
    { icon:'📱', big:'앱', mid:'호출 화면 화살표', sub:'승객이 걸어갈 방향을 보여 줌' },
    { icon:'🚕', big:'등', mid:'차체·실내 조명 색', sub:'전용 로보택시 도장과 맞춤' },
    { icon:'🔗', big:'일치', mid:'색을 하나로', sub:'밤에 여러 대가 있어도 내 차를 찾음' },
  ],
  quote: '택시는 「어느 차가 나를 기다리는지」가 빨리 보여야 대기 시간이 줄어듭니다. 색을 맞춘 것은 제품이 손님 경험까지 다듬고 있다는 신호입니다. 다음에 보면 좋은 것은 이 앱으로 유료 호출이 열리는 도시입니다.',
  noteSub: '앱 색 자체는 운행 대수가 아닙니다. 그래도 현장에서 차를 찾는 시간이 줄면 한 대당 하루 운행 횟수가 늘어날 수 있습니다. 앞으로 3~5년 호출이 쉬워질수록 로보택시가 「신기한 시연」에서 「일상 이동」으로 내려올 수 있습니다.',
  footer: '테슬라 · 앱 색',
}, {
  badge: 'TSLA', title: 'The robotaxi app pickup hue was matched to the Cybercab body color',
  heroIcon: '🎨', heroBig: 'Arrow',
  heroSub: 'A night photo showed a white arrow on the phone pointing to pickup, matched to Cybercab interior and exterior lights so riders can spot their car when many cabs share a block.',
  cards: [
    { icon:'📱', big:'App', mid:'Pickup arrow', sub:'Shows which way the rider should walk' },
    { icon:'🚕', big:'Lights', mid:'Body and cabin hue', sub:'Matched to purpose-built paint' },
    { icon:'🔗', big:'Match', mid:'One shared color', sub:'Find your cab at night in a crowd' },
  ],
  quote: 'A taxi works when you instantly know which car is yours. Matching color is product polish on the rider experience. Next: cities where this app opens paid hails.',
  noteSub: 'App color is not a fleet count. Faster pickup can still raise trips per car per day. Over 3–5 years, easier hailing can move robotaxis from demo to daily transit.',
  footer: 'TSLA · app hue',
});

add('terafab-foundation', 'L2', 'SPCX', {
  badge: 'SPCX', title: '테라팹 1단계 기초가 한 달 전보다 40~50% 더 진행된 모습입니다',
  heroIcon: '🏗', heroBig: '40–50%',
  heroSub: '드론 사진에는 넓은 흙바닥과 긴 직사각형 기초 구덩이가 보입니다. 테라팹 1단계 기초가 한 달 전보다 40~50% 더 나아갔고, 서쪽 임시 작업장과 진입 도로에도 움직임이 있다고 했습니다.',
  cards: [
    { label:'단계', big:'1', mid:'1단계 기초', sub:'건물 전체가 아니라 땅 다지기' },
    { label:'진척', big:'40–50%', mid:'한 달 대비', sub:'사진으로 비교한 추정' },
    { label:'다음', big:'골조', mid:'기초 다음 공정', sub:'장비를 넣기 전 뼈대' },
  ],
  detailHead: '사진이 보여 주는 것',
  detailLines: ['📍 스타링크 지상국 자리도 같은 부지에 보입니다','📸 한 달 전 첫 방문 때보다 땅 정리와 뒤쪽 작업이 늘었습니다','💵 다음에 보면 좋은 것은 골조와 장비 반입입니다'],
  noteSub: '테라팹은 큰 칩·패키지 공장 그림입니다. 기초가 빨라지면 장비를 넣는 날짜가 앞당겨질 수 있습니다. 앞으로 3~5년 공장이 돌면 패키지 병목이 줄어 가속기 공급이 더 안정될 수 있습니다.',
  footer: '스페이스X · 테라팹',
}, {
  badge: 'SPCX', title: 'Terafab Phase 1 foundations look 40–50% further than a month ago',
  heroIcon: '🏗', heroBig: '40–50%',
  heroSub: 'Drone photos show a wide graded pad and a long rectangular footing pit. Phase 1 foundations look 40–50% further than a month ago, with more work on the west staging area and the access road.',
  cards: [
    { label:'Phase', big:'1', mid:'Phase 1 footings', sub:'Groundwork, not the finished plant' },
    { label:'Pace', big:'40–50%', mid:'Versus last month', sub:'A photo comparison' },
    { label:'Next', big:'Frame', mid:'After foundations', sub:'Before tools move in' },
  ],
  detailHead: 'What the photos show',
  detailLines: ['📍 A Starlink ground station sits on the same site','📸 More clearing and back-side work than the first visit a month ago','💵 Next: framing and tool move-in'],
  noteSub: 'Terafab is a large chip and packaging plant. Faster footings can pull tool-install dates forward. Over 3–5 years a running plant can ease packaging bottlenecks and steady accelerator supply.',
  footer: 'SPCX · Terafab',
});

add('pony-zagreb-nvda', 'L6', 'NVDA', {
  badge: 'BREAKING', breaking: '엔비디아 · 자그레브',
  title: '포니에이아이와 베르네가 자그레브 시내 22km를 운전자 없이 달렸습니다',
  heroBig: '22km',
  heroSub: '엔비디아 공식 화면은 「자그레브를 가로지르는 새로운 종류의 탑승」이라고 했고, 포니에이아이와 베르네가 일반도로 22km를 운전자 없이 달렸습니다. 차 안에는 안전 요원이 없고 승객만 있으며, 엔비디아 드라이브가 붙었습니다.',
  grid: [
    { icon:'📍', big:'자그레브', mid:'크로아티아 수도', sub:'공항 활주로가 보이는 영상' },
    { icon:'📏', big:'22km', mid:'무인 구간', sub:'유럽 첫 사례로 설명됨' },
    { icon:'🖥', big:'DRIVE', mid:'엔비디아 드라이브', sub:'차 안 인공지능 컴퓨터' },
    { icon:'🇪🇺', big:'승객만', mid:'운전석에 사람 없음', sub:'핸들 뒤에 요원이 없다고 적힘' },
  ],
  ctx1: '포니에이아이는 중국 로보택시 회사이고 베르네는 유럽 파트너입니다. 엔비디아는 칩과 소프트웨어를 공급합니다.',
  ctx2: '시연은 「이 도시 도로에서 무인이 가능하다」는 현장입니다. 유료 호출 요금표가 나온 단계는 아닙니다.',
  quote: '22km는 한 경로를 끝까지 비운 기록입니다. 유럽에서 운전자 없는 로보택시 시험이 열렸다는 점이 뉴스입니다. 다음에 보면 좋은 것은 같은 구간을 반복하고 요금을 받는 날입니다.',
  noteSub: '엔비디아 드라이브가 유럽 도로 허가를 통과하면, 다른 도시 차에도 같은 컴퓨터가 올라갈 수 있습니다. 앞으로 3~5년 허가 도시가 늘면 드라이브 탑재 대수가 따라갈 수 있습니다.',
  footer: '엔비디아 · 자그레브 22km',
}, {
  badge: 'BREAKING', breaking: 'NVIDIA · ZAGREB',
  title: 'Pony.ai and Verne ran 22 km driverless on public roads in Zagreb',
  heroBig: '22km',
  heroSub: 'NVIDIA’s post called it a new kind of ride through Zagreb. Pony.ai and Verne ran 22 km driverless on public roads with no AV operator onboard — powered by NVIDIA DRIVE.',
  grid: [
    { icon:'📍', big:'Zagreb', mid:'Croatia’s capital', sub:'Video over an airport runway' },
    { icon:'📏', big:'22km', mid:'Driverless run', sub:'Cited as a first in Europe' },
    { icon:'🖥', big:'DRIVE', mid:'NVIDIA DRIVE', sub:'The in-car AI computer' },
    { icon:'🇪🇺', big:'Riders', mid:'No one behind the wheel', sub:'Passengers only, as printed' },
  ],
  ctx1: 'Pony.ai is a China robotaxi firm; Verne is the European partner. NVIDIA supplies the chips and software.',
  ctx2: 'A demo shows driverless is possible on these streets. A fare card has not printed yet.',
  quote: '22 km is one route emptied of a driver. The news is a driverless robotaxi trial opening in Europe. Next: repeat runs and a fare.',
  noteSub: 'If NVIDIA DRIVE clears European road permits, the same computer can ride in other city fleets. Over 3–5 years, more permitted cities can lift DRIVE units.',
  footer: 'NVDA · Zagreb 22 km',
});

add('cybercab-rider-guide', 'L3', 'TSLA', {
  badge: 'TSLA', title: '북미 사이버캡 탑승 안내서가 2026년 9월 4일 자로 나왔습니다',
  heroIcon: '📘', heroBig: '9/4',
  heroSub: '화면에 「2026년 9월 4일 테슬라가 사이버캡 라이더 가이드를 공식 공개했다」고 적혀 있습니다. 피디에프로 내려받을 수 있고, 승객이 타기 전 읽는 안내서입니다.',
  cards: [
    { icon:'📅', big:'9/4', mid:'문서 날짜', sub:'2026년 9월 4일 공식 공개' },
    { icon:'🌎', big:'북미', mid:'적용 권역', sub:'북아메리카 승객용' },
    { icon:'🚕', big:'캡', mid:'전용 로보택시', sub:'운전석 없는 차의 탑승 규칙' },
  ],
  quote: '안내서가 있다는 것은 「손님이 혼자 타도 되는 차」를 준비 중이라는 뜻입니다. 문 여는 법, 안전벨트, 비상 연락이 적힙니다. 다음에 보면 좋은 것은 이 안내가 쓰이는 호출 도시입니다.',
  noteSub: '보험·규제 담당자는 표준 안내가 있으면 대화를 시작하기 쉽습니다. 오늘은 피디에프가 나온 날입니다. 앞으로 3~5년 탑승 규칙이 같아지면 도시마다 새로 설명할 일이 줄어 확대가 빨라질 수 있습니다.',
  footer: '테슬라 · 라이더 가이드',
}, {
  badge: 'TSLA', title: 'A North America Cybercab rider guide printed dated 2026/09/04',
  heroIcon: '📘', heroBig: '9/4',
  heroSub: 'The screen said Tesla officially published the Cybercab Rider Guide on September 4, 2026. It is a downloadable PDF passengers read before they board.',
  cards: [
    { icon:'📅', big:'9/4', mid:'Document date', sub:'Official release 4 Sep 2026' },
    { icon:'🌎', big:'NA', mid:'Region in scope', sub:'North America riders' },
    { icon:'🚕', big:'Cab', mid:'Purpose-built taxi', sub:'Boarding rules for a no-driver car' },
  ],
  quote: 'A guide means the company is preparing a car a stranger can board alone. It covers doors, belts, and emergency contacts. Next: cities where this guide is used for hails.',
  noteSub: 'Insurers and regulators start talks faster when a standard guide exists. Today is a PDF day. Over 3–5 years, shared boarding rules can speed city-by-city expansion.',
  footer: 'TSLA · rider guide',
});

add('utah-7-cybercab', 'L2', 'TSLA', {
  badge: 'TSLA', title: '유타 플레전트그로브에 핸들이 있는 사이버캡 7대가 포착됐습니다',
  heroIcon: '📍', heroBig: '7대',
  heroSub: '항공 사진에는 금색 사이버캡 여러 대가 주차장에 줄 서 있고, 하얀 모델와이와 캐리어 트럭이 보입니다. 플레전트그로브 테슬라 매장 옆이며, 로보택시 앱에는 아직 안 올라왔다고 했습니다.',
  cards: [
    { label:'대수', big:'7', mid:'포착된 차량', sub:'한 주차장에서 센 숫자' },
    { label:'핸들', big:'있음', mid:'운전대가 달린 차', sub:'옮기거나 시험할 때 사람이 탐' },
    { label:'앱', big:'미등록', mid:'호출 앱에 없음', sub:'유타 카운티 우연이 아니라고 적힘' },
  ],
  detailHead: '사진이 보여 주는 것',
  detailLines: ['📍 금색 전용 차체와 하얀 기존 차가 한자리에 있습니다','🛞 핸들이 있으면 도로 이동·점검을 사람이 할 수 있습니다','📱 앱에 없으면 손님 호출은 아직 아닙니다'],
  noteSub: '전용 로보택시가 텍사스가 아닌 유타 매장 앞에 모인 것은, 차가 다른 주로 옮겨지고 있다는 현장입니다. 다음에 보면 좋은 것은 유타 허가와 앱 등록입니다. 앞으로 3~5년 주가 늘면 전용차 지도가 넓어집니다.',
  footer: '테슬라 · 유타 7대',
}, {
  badge: 'TSLA', title: 'Seven Cybercabs with steering wheels were spotted in Pleasant Grove, Utah',
  heroIcon: '📍', heroBig: '7',
  heroSub: 'Aerial photos show gold Cybercabs lined in a lot beside a white Model Y and a car hauler, next to a Tesla store in Pleasant Grove. They were not yet in the robotaxi app.',
  cards: [
    { label:'Count', big:'7', mid:'Vehicles spotted', sub:'Counted in one parking lot' },
    { label:'Wheel', big:'Yes', mid:'Steering wheel fitted', sub:'A person can ferry or inspect' },
    { label:'App', big:'Off', mid:'Not in the hail app', sub:'Printed as not a Utah County accident' },
  ],
  detailHead: 'What the photos show',
  detailLines: ['📍 Gold purpose-built bodies sit with a white existing car','🛞 Wheels let a person move and check the car on roads','📱 Off-app means riders cannot hail yet'],
  noteSub: 'Purpose-built cabs gathering outside Texas, at a Utah store, is a field sign the cars are traveling. Next: a Utah permit and an app listing. Over 3–5 years, more states can widen the purpose-built map.',
  footer: 'TSLA · Utah 7',
});

add('optimus-germany', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '🦾 옵티머스 · 홀츠게를링겐',
  title: '옵티머스 기어트레인 제조 채용이 독일 홀츠게를링겐에서 열렸습니다',
  heroIcon: '⚙️', heroBig: '독일',
  heroSub: '화면에 테슬라 로고와 채용 공고가 있고, 독일 홀츠게를링겐에서 옵티머스 기어트레인 제조 인력(로봇 제어 엔지니어)을 뽑습니다. 기어트레인은 관절을 움직이는 기어·감속기 묶음입니다.',
  cards: [
    { icon:'🇩🇪', big:'독일', mid:'홀츠게를링겐', sub:'유럽 제조 거점 채용' },
    { icon:'⚙️', big:'기어', mid:'관절 구동 부품', sub:'설계부터 양산 라인까지' },
    { icon:'👷', big:'채용', mid:'제조 인력', sub:'연구실 프로젝트가 아니라고 적힘' },
  ],
  quote: '사람이 관절 공장을 준비한다는 것은, 로봇을 「한 대 만들어 보기」에서 「여러 대를 찍어 내기」로 넘어가는 신호입니다. 미국 밖 라인은 유럽 부품을 가까이 쓰겠다는 뜻입니다. 다음에 보면 좋은 것은 주당 조립 대수입니다.',
  noteSub: '인간형 로봇은 소프트웨어만으로는 서지 않고, 값싸고 튼튼한 관절이 필요합니다. 오늘은 독일에서 그 관절을 만들 사람을 뽑는 날입니다. 앞으로 3~5년 관절 원가가 내려가면 로봇 한 대 값이 따라 내려갈 수 있습니다.',
  footer: '테슬라 · 옵티머스 독일',
}, {
  badge: 'TSLA', badgeLine: '🦾 Optimus · Holzgerlingen',
  title: 'An Optimus geartrain manufacturing hire opened in Holzgerlingen, Germany',
  heroIcon: '⚙️', heroBig: 'DE',
  heroSub: 'The screen showed the Tesla mark and a job post: a robotics controls engineer for Optimus geartrain manufacturing in Holzgerlingen. A geartrain is the gears that move a joint.',
  cards: [
    { icon:'🇩🇪', big:'Germany', mid:'Holzgerlingen', sub:'A Europe manufacturing hire' },
    { icon:'⚙️', big:'Gear', mid:'Joint drivetrain', sub:'From design through a production line' },
    { icon:'👷', big:'Hire', mid:'Factory headcount', sub:'Printed as more than an R&D project' },
  ],
  quote: 'Staffing a joint factory is the move from one prototype to many units. A line outside the U.S. keeps European parts close. Next: weekly assemblies.',
  noteSub: 'A humanoid does not stand on software alone; it needs cheap, tough joints. Today Germany is hiring the people who will make them. Over 3–5 years, cheaper joints can pull robot unit cost down.',
  footer: 'TSLA · Optimus Germany',
});

add('starlink-direct-expand', 'L6', 'SPCX', {
  badge: 'BREAKING', breaking: '스타링크 다이렉트',
  title: '소프트뱅크 스타링크 다이렉트가 9월 28일 일본 밖으로 넓혀집니다',
  heroBig: '9/28',
  heroSub: '화면에는 지구 사진과 소프트뱅크·스타링크 로고가 있고, 9월 28일 미국·캐나다·뉴질랜드에 먼저 열린 뒤 가을에 필리핀이 거론됐습니다. 다이렉트는 위성에서 휴대폰으로 바로 문자를 보내는 서비스입니다.',
  grid: [
    { icon:'📅', big:'9/28', mid:'확대 날짜', sub:'일본 밖 첫 창' },
    { icon:'🇺🇸', big:'미국', mid:'캐나다와 같이', sub:'초기 묶음의 북미' },
    { icon:'🇳🇿', big:'뉴질랜드', mid:'오세아니아', sub:'같은 날 묶음' },
    { icon:'🇵🇭', big:'필리핀', mid:'가을에 이어서', sub:'해당 요금제는 추가 요금 없음' },
  ],
  ctx1: '산·터널처럼 지상망이 약한 곳(데드존)에서도 쓸 수 있다고 했습니다. 집 공유기 라우터 4와는 다른 제품입니다.',
  ctx2: '해당 요금제 고객은 추가 요금 없이 열린다고 적혀 있습니다. 통신사마다 개통 안내는 따로 나옵니다.',
  quote: '휴대폰이 위성에 바로 붙으면, 로밍이나 산속 무음 구간을 위성이 메웁니다. 9월 28일은 그 커버가 일본 밖으로 나가는 날짜입니다. 다음에 보면 좋은 것은 실제 개통과 문자 품질입니다.',
  noteSub: '비상 문자만 되던 서비스가 여러 나라 기본 요금제에 들어가면, 하늘 통신이 「특별한 기기」에서 「폰 기능」이 됩니다. 앞으로 3~5년 다이렉트가 기본이 되면 스페이스엑스 위성망의 일상 쓰임이 커질 수 있습니다.',
  footer: '스페이스X · 다이렉트 확대',
}, {
  badge: 'BREAKING', breaking: 'STARLINK DIRECT',
  title: 'SoftBank Starlink Direct expands beyond Japan on September 28',
  heroBig: '9/28',
  heroSub: 'The screen showed Earth with SoftBank and Starlink marks. On September 28 it opens first in the U.S., Canada, and New Zealand, then the Philippines in the fall. Direct texts phones from satellites.',
  grid: [
    { icon:'📅', big:'9/28', mid:'Expansion date', sub:'First window outside Japan' },
    { icon:'🇺🇸', big:'US', mid:'With Canada', sub:'North America in the first bundle' },
    { icon:'🇳🇿', big:'NZ', mid:'Oceania', sub:'Same-day bundle' },
    { icon:'🇵🇭', big:'PH', mid:'Then this fall', sub:'No extra cost on eligible plans' },
  ],
  ctx1: 'It was described as working in outdoor dead zones. That is not home Router 4.',
  ctx2: 'Eligible-plan customers were told there is no extra charge. Each carrier will still post a live-service notice.',
  quote: 'A phone that talks to a satellite fills roaming gaps and silent mountain stretches. September 28 is the day that cover leaves Japan. Next: live service and text quality.',
  noteSub: 'If emergency texting lands inside ordinary plans in more countries, sky comms become a phone feature, not a special gadget. Over 3–5 years, Direct as a default can widen everyday use of the SpaceX constellation.',
  footer: 'SPCX · Direct expand',
});

add('nvda-insider-600m', 'L1', 'NVDA', {
  badge: 'NVDA', title: '마크 스티븐스가 지난주 엔비디아 주식을 6억 달러가 넘게 팔았습니다',
  heroIcon: '📉', heroBig: '$600M+',
  heroSub: '화면은 「2008년부터 이사를 맡은 큰 주주가 지난주 6억 달러가 넘게 팔았다」고 알렸습니다. 내부자 매도는 임원·이사가 회사 주식을 파는 공시입니다. 9월 2일 184만 8,501주(주당 222.26달러), 9월 4일 102만 2,239주(주당 230.51달러)입니다.',
  cards: [
    { icon:'📅', big:'9/2', mid:'184만 8,501주', sub:'주당 222.26달러' },
    { icon:'📅', big:'9/4', mid:'102만 2,239주', sub:'주당 230.51달러' },
    { icon:'💵', big:'223.67', mid:'표시 종가', sub:'그날 −0.91%' },
  ],
  quote: '오래 보유한 이사가 일부를 현금으로 바꾸는 공시입니다. 두 날을 합치면 6억 달러가 넘습니다. 다음에 보면 좋은 것은 추가 공시와 다음 분기 칩 수요입니다.',
  noteSub: '내부자 매도는 개인 유동성 공시이지, 오늘 온톨로지 파트너십과 같은 제품 뉴스는 아닙니다. 수요가 유지되면 이 매도는 한 주의 수급으로 남습니다. 앞으로 3~5년 가속기 수요가 이어지면 장기 이야기는 실적 쪽에 있습니다.',
  footer: '엔비디아 · 내부자 매도',
}, {
  badge: 'NVDA', title: 'Mark Stevens sold more than $600M of NVIDIA last week',
  heroIcon: '📉', heroBig: '$600M+',
  heroSub: 'The screen flagged a board member since 2008 selling more than $600M last week. An insider sale is a director selling company stock. He sold 1,848,501 shares at $222.26 on Sep 2 and 1,022,239 at $230.51 on Sep 4.',
  cards: [
    { icon:'📅', big:'9/2', mid:'1,848,501 shares', sub:'$222.26 per share' },
    { icon:'📅', big:'9/4', mid:'1,022,239 shares', sub:'$230.51 per share' },
    { icon:'💵', big:'223.67', mid:'Shown close', sub:'−0.91% that day' },
  ],
  quote: 'A long-time director turning part of a holding into cash. The two days sum to more than $600M. Next: further filings and the next quarter of chip demand.',
  noteSub: 'An insider sale is a liquidity print, not the same product news as today’s ontology partnership. If demand holds, this stays one week of flow. Over 3–5 years the long story sits with earnings if accelerator demand continues.',
  footer: 'NVDA · insider sale',
});

add('blackrock-tsla-6m', 'L1', 'TSLA', {
  badge: 'TSLA', title: '블랙록이 2분기에 테슬라 주식 600만 주를 사들였습니다',
  heroIcon: '🏦', heroBig: '600만',
  heroSub: '화면에 「블랙록이 2분기에 테슬라 주식 600만 주를 샀다」는 큰 글과 로고가 있습니다. 블랙록은 세계 큰 자산운용사입니다. 이미 지난 분기의 보유 공시입니다.',
  cards: [
    { icon:'📅', big:'2Q', mid:'공시 분기', sub:'2026년 2분기 스냅샷' },
    { icon:'📦', big:'6M', mid:'매수 주식 수', sub:'보통주 600만 주' },
    { icon:'🏦', big:'BLK', mid:'운용사 공시', sub:'큰 펀드가 담고 있다는 기록' },
  ],
  quote: '큰 펀드가 테슬라를 더 담았다는 것은, 로보택시·에너지 이야기가 기관 포트폴리오에도 자리를 넓히고 있다는 신호입니다. 다음에 보면 좋은 것은 다음 분기 보유 공시입니다.',
  noteSub: '2분기 숫자는 이미 지난 사진입니다. 그래도 「누가 오래 들고 있는지」를 보여 줍니다. 앞으로 3~5년 인덱스와 대형 운용사 비중이 커지면 테슬라 수급은 그 흐름과 같이 움직일 수 있습니다.',
  footer: '테슬라 · 블랙록 600만',
}, {
  badge: 'TSLA', title: 'BlackRock bought 6 million Tesla shares in the second quarter',
  heroIcon: '🏦', heroBig: '6M',
  heroSub: 'The screen printed “BlackRock bought 6 million Tesla shares in Q2” over the firm’s mark. BlackRock is a large asset manager. The filing is already a past-quarter snapshot.',
  cards: [
    { icon:'📅', big:'Q2', mid:'Filing quarter', sub:'A 2026 second-quarter snapshot' },
    { icon:'📦', big:'6M', mid:'Shares bought', sub:'6 million common shares' },
    { icon:'🏦', big:'BLK', mid:'Manager filing', sub:'A record that a large fund added' },
  ],
  quote: 'A large fund adding Tesla is a sign robotaxi and energy stories are taking more room in institutional books. Next: the following quarter’s holdings print.',
  noteSub: 'Q2 is already a stale photo, but it shows who is willing to hold. Over 3–5 years, larger index and mega-manager weights can make Tesla flow move with those books.',
  footer: 'TSLA · BlackRock 6M',
});

add('spcx-orbital-compute', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🛰 궤도 컴퓨팅',
  title: '스페이스엑스 재무가 내년에 첫 궤도 컴퓨팅 위성을 올리겠다고 했습니다',
  heroIcon: '💻', heroBig: '내년',
  heroSub: '화면에 「재무담당이 내년 첫 궤도 컴퓨팅 위성을 올리겠다」고 적혀 있습니다. 궤도 컴퓨팅은 땅의 데이터센터 대신 위성에서 계산을 돌리는 그림입니다.',
  cards: [
    { icon:'📅', big:'내년', mid:'첫 위성', sub:'시제·실증을 올리는 해' },
    { icon:'🛰', big:'궤도', mid:'우주에서 연산', sub:'땅의 전기·땅값 한도를 우회' },
    { icon:'💵', big:'CFO', mid:'재무 발언', sub:'일정이 입에서 달력으로 내려옴' },
  ],
  quote: '땅에서는 전기와 허가가 병목입니다. 궤도에서 계산하면 그 병목을 하늘로 우회할 수 있습니다. 다음에 보면 좋은 것은 첫 위성이 어느 로켓에 실리는지입니다.',
  noteSub: '첫 위성은 「된다」를 보여 주는 실증입니다. 냉각과 지상으로 결과를 내려보내는 통신이 숙제입니다. 앞으로 3~5년 실증이 성공하면 지상 전력 한도를 넘는 연산 수요가 우주로 일부 옮겨갈 수 있습니다.',
  footer: '스페이스X · 궤도 컴퓨팅',
}, {
  badge: 'SPCX', badgeLine: '🛰 orbital compute',
  title: 'SpaceX’s CFO said the first orbital-compute satellites go up next year',
  heroIcon: '💻', heroBig: 'Next y',
  heroSub: 'The screen said the CFO plans to launch the first orbital-compute satellites next year. Orbital compute runs jobs on satellites instead of terrestrial data centers.',
  cards: [
    { icon:'📅', big:'Next y', mid:'First satellites', sub:'The year prototypes go up' },
    { icon:'🛰', big:'Orbit', mid:'Compute in space', sub:'A path around ground power and land' },
    { icon:'💵', big:'CFO', mid:'Finance remark', sub:'A date moving from talk onto a calendar' },
  ],
  quote: 'On the ground, power and permits bottleneck. Compute in orbit can route around that. Next: which rocket carries the first satellite.',
  noteSub: 'A first satellite is a demo that it works. Cooling and the downlink remain homework. Over 3–5 years a working demo can move some demand that outgrew terrestrial power into space.',
  footer: 'SPCX · orbital compute',
});

add('congress-spcx-buy', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🏛 의회 · 스페이스X',
  title: '살라자르 의원이 스페이스엑스를 1천~1만 5천 달러 구간에 사 일곱 번째 매수자가 됐습니다',
  heroIcon: '🏛', heroBig: '7번째',
  heroSub: '화면에 「살라자르 의원이 스페이스엑스를 샀고, 6월 상장 이후 의회 매수자로는 일곱 번째」라고 적혀 있습니다. 공직자 거래 공시는 정확한 주수 대신 금액 구간(1,001~1만 5,000달러)만 밝힙니다.',
  cards: [
    { icon:'💵', big:'$1–15k', mid:'금액 구간', sub:'정확한 주수는 비공개' },
    { icon:'7️⃣', big:'7번째', mid:'6월 이후 의회', sub:'산 사람 7, 판 사람 0으로 적힘' },
    { icon:'📋', big:'PTR', mid:'거래 공시', sub:'관심 신호, 개인 규모는 작음' },
  ],
  quote: '상장 이후 의원들이 사고 있다는 것은, 스페이스엑스가 「비상장 전설」에서 「거래되는 주식」으로 자리 잡고 있다는 현장입니다. 다음에 보면 좋은 것은 추가 공시입니다.',
  noteSub: '구간 공시는 정확한 금액이 아닙니다. 그래도 6월 이후 매수 7건·매도 0건은 관심을 보여 줍니다. 앞으로 3~5년 상장 유동성이 붙으면 공직자·기관 거래가 더 자연스러워질 수 있습니다.',
  footer: '스페이스X · 의회 매수',
}, {
  badge: 'SPCX', badgeLine: '🏛 Congress · SpaceX',
  title: 'Rep. Salazar bought SpaceX in the $1k–$15k band, the seventh Congress buyer since June',
  heroIcon: '🏛', heroBig: '7th',
  heroSub: 'The screen said Rep. Salazar bought SpaceX — the seventh member of Congress since the June listing. A public-trade filing shows a dollar band ($1,001–$15,000), not an exact share count.',
  cards: [
    { icon:'💵', big:'$1–15k', mid:'Dollar band', sub:'Share count not shown' },
    { icon:'7️⃣', big:'7th', mid:'Since June listing', sub:'Printed 7 buyers, 0 sellers' },
    { icon:'📋', big:'PTR', mid:'Trade filing', sub:'An attention signal, a small personal ticket' },
  ],
  quote: 'Members buying after the listing is a field sign SpaceX is becoming a traded stock, not only a private legend. Next: further filings.',
  noteSub: 'A band is not an exact dollar amount. Seven buys and zero sells since June still show attention. Over 3–5 years, more listed float can make official and institutional trading feel ordinary.',
  footer: 'SPCX · Congress buy',
});

};
