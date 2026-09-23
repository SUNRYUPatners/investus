// 2026-09-23 SVG topic data — screenshot facts, beginner Korean
// Layout mix: ROWS×1 L1×4 L2×3 L3×3 L4×3 L5×3 L6×1 (총 18)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.23 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'2,500대', title:'화물 동맹이 전기 대형 트럭 2,500대를 주문하고 테슬라를 주 공급사로 골랐습니다',
      sub:'미국 전기 8등급 트럭을 거의 두 배로 늘리는 한 건의 주문입니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'27,226', title:'나스닥이 27,226.40까지 올라가 사상 최고를 다시 찍었습니다',
      sub:'차트 종가는 27,226.40, 고가는 27,227.74입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'46점', title:'그록 4.7이 지능 지수 46점으로 상위 네 실험실에 들어갔습니다',
      sub:'코딩 에이전트 지수도 올랐고, 테슬라 차 안 그록이 일을 하기 시작했습니다.' },
    { color:'#4ade80', fill:'#061209', right:'소진', title:'미국 모델3·모델Y 2026년 새 주문이 거의 소진됐다고 알려졌습니다',
      sub:'모델Y L 론치 시리즈는 이미 끝났고, 후륜·사륜도 거의 끝났습니다.' },
    { color:'#fb7185', fill:'#1a0a10', right:'$12.16', title:'오스틴 사이버캡 한 건이 12.16달러, 대기 10분으로 찍혔습니다',
      sub:'같은 화면에서 모델Y는 4대 대기였습니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'715에이커', title:'연방법원이 스페이스X 야생보호 토지 715에이커 교환을 막지 않았습니다',
      sub:'스페이스X는 683에이커를 넘기고 보호구역 땅을 받습니다.' },
    { color:'#94a3b8', fill:'#111827', right:'39.9%', title:'미국 가계 순자산의 39.9%가 주식에 들어가 사상 최고입니다',
      sub:'주식 비중이 이렇게 높은 적은 집계상 처음입니다.' },
  ],
  caption: '더 볼 것: 세미 2,500대 · 나스닥 27,226 · 그록 46점 · 미국 재고 소진 · 사이버캡 12.16달러 · 715에이커 · 가계 주식 39.9%',
}, {
  headline: '2026.09.23 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'2,500', title:'A shipper alliance ordered 2,500 electric Class 8 trucks with Tesla as primary OEM',
      sub:'One order nearly doubles the US electric Class 8 fleet.' },
    { color:'#60a5fa', fill:'#0a1420', right:'27,226', title:'The Nasdaq Composite printed 27,226.40, a new all-time close on the chart',
      sub:'The session high on the same screen was 27,227.74.' },
    { color:'#c084fc', fill:'#140b1f', right:'46', title:'Grok 4.7 scored 46 on the intelligence index and entered the top four labs',
      sub:'The coding-agent index rose too, and Grok started working inside Tesla cars.' },
    { color:'#4ade80', fill:'#061209', right:'Sold out', title:'US Model 3 and Model Y 2026 new orders were described as nearly sold out',
      sub:'The Model Y L Launch Series is gone; rear- and all-wheel trims are almost gone.' },
    { color:'#fb7185', fill:'#1a0a10', right:'$12.16', title:'An Austin Cybercab ride showed $12.16 and a 10-minute wait',
      sub:'The same screen listed four Model Y cars waiting.' },
    { color:'#c084fc', fill:'#140b1f', right:'715 acres', title:'A federal judge did not block SpaceX’s 715-acre wildlife-refuge land swap',
      sub:'SpaceX gives 683 acres and receives refuge land.' },
    { color:'#94a3b8', fill:'#111827', right:'39.9%', title:'US households now hold a record 39.9% of net worth in stocks',
      sub:'That share has never been this high in the series.' },
  ],
  caption: 'Watch: Semi 2,500 · Nasdaq 27,226 · Grok 46 · US sold-out · Cybercab $12.16 · 715 acres · 39.9% stocks',
});

add('tsla-zetscale-2500', 'L1', 'TSLA', {
  badge: '테슬라', title: '화물 동맹이 전기 대형 트럭 2,500대를 주문하고 테슬라를 주 공급사로 골랐습니다',
  heroIcon: '\u{1F69B}', heroBig: '2,500대',
  heroSub: '8등급은 고속도로를 다니는 가장 큰 화물 트럭입니다. 한 건의 주문이 미국 전기 8등급 트럭을 거의 두 배로 늘립니다.',
  cards: [
    { icon:'\u{1F3E2}', big:'주 공급', mid:'테슬라가 1순위로 뽑혔습니다', sub:'켄워스·볼보·RIDE는 예비 선택입니다' },
    { icon:'\u{1F4CA}', big:'1만 대', mid:'동맹의 다음 목표는 1만 대입니다', sub:'마이크로소프트와 펩시코가 창립 화주로 이름을 올렸습니다' },
    { icon:'\u{1F3ED}', big:'네바다', mid:'세미 전용 공장이 이틀 뒤 열립니다', sub:'이름표 생산은 연 5만 대입니다' },
  ],
  quote: 'ZET SCALE은 큰 화주가 수요를 모아 전기 트럭을 한꺼번에 사는 동맹입니다. 2,500대 전부가 세미인지는 아직 공개되지 않았습니다.',
  noteHead: '왜 중요한가', noteSub: '테슬라가 대형 화물에서도 주 공급사로 뽑힌 첫 큰 묶음입니다. 할당 대수는 아직 비공개입니다. 다음에 볼 것은 공장 출고와 허브 10곳 배치입니다.',
  footer: '테슬라 · 세미 2,500대',
}, {
  badge: 'TSLA', title: 'A shipper alliance ordered 2,500 electric Class 8 trucks with Tesla as primary OEM',
  heroIcon: '\u{1F69B}', heroBig: '2,500',
  heroSub: 'Class 8 is the heaviest highway freight truck. One order nearly doubles the US electric Class 8 fleet.',
  cards: [
    { icon:'\u{1F3E2}', big:'Primary', mid:'Tesla won the first slot', sub:'Kenworth, Volvo and RIDE are backups' },
    { icon:'\u{1F4CA}', big:'10,000', mid:'The alliance aims for 10,000 trucks', sub:'Microsoft and PepsiCo are founding shippers' },
    { icon:'\u{1F3ED}', big:'Nevada', mid:'The Semi factory opens in two days', sub:'Nameplate capacity is 50,000 a year' },
  ],
  quote: 'ZET SCALE pools big shippers so carriers can buy electric trucks in bulk. The split of 2,500 units by brand is not published.',
  noteHead: 'Why it matters', noteSub: 'Tesla is the primary pick on the largest US electric Class 8 order. The Tesla count is still unknown. Next, watch factory output and the 10 hubs.',
  footer: 'Tesla · Semi 2,500',
});

add('tsla-us-soldout-2026', 'L5', 'TSLA', {
  badge: '테슬라', title: '미국 모델3·모델Y 2026년 새 주문이 거의 소진됐다고 알려졌습니다',
  heroIcon: '\u{1F697}', heroBig: '소진',
  heroSub: '모델Y L은 차체를 늘린 6인승이고, 론치 시리즈는 그 차의 출시 한정 사양입니다. 롱레인지와 다른 이름입니다.',
  before: { label: '이미 소진', big: 'Y L 론치', sub:'2026년 미국 론치 시리즈는 끝났습니다' },
  after: { label: '거의 소진', big: '3·Y', sub:'후륜·사륜 일반 사양도 거의 끝났습니다' },
  cards: [
    { icon:'\u{1F3C6}', big:'Y L', mid:'론치 시리즈는 이미 끝났습니다', sub:'긴 축거 6인승의 출시 한정 사양입니다' },
    { icon:'\u{1F697}', big:'3 RWD', mid:'모델3 후륜이 거의 끝났습니다', sub:'일반 세단 사양입니다' },
    { icon:'\u{1F698}', big:'Y', mid:'모델Y 후륜·사륜도 거의 끝났습니다', sub:'5인승 일반 모델Y입니다' },
  ],
  quote: '새 주문 화면이 올해 물량을 거의 비웠다는 설명입니다. 주문이 닫힌 것은 아니고, 인도 창이 밀릴 수 있습니다.',
  noteHead: '왜 중요한가', noteSub: '재고가 비면 가까운 분기 인도는 이미 잡혀 있습니다. 모델Y L과 일반 모델Y는 대기줄이 다릅니다. 다음에 볼 것은 우편번호별 인도 창입니다.',
  footer: '테슬라 · 미국 2026 소진',
}, {
  badge: 'TSLA', title: 'US Model 3 and Model Y 2026 new orders were described as nearly sold out',
  heroIcon: '\u{1F697}', heroBig: 'Sold out',
  heroSub: 'Model Y L is the long-wheelbase six-seater. Launch Series is its first-run spec, not Long Range.',
  before: { label: 'Gone', big: 'Y L Launch', sub:'The 2026 US Launch Series is spent' },
  after: { label: 'Almost', big: '3 & Y', sub:'Rear- and all-wheel trims are nearly gone' },
  cards: [
    { icon:'\u{1F3C6}', big:'Y L', mid:'Launch Series is already gone', sub:'A first-run long-wheelbase six-seater' },
    { icon:'\u{1F697}', big:'3 RWD', mid:'Model 3 rear-wheel is almost gone', sub:'The regular sedan spec' },
    { icon:'\u{1F698}', big:'Y', mid:'Model Y RWD and AWD are almost gone', sub:'The five-seat Model Y' },
  ],
  quote: 'New-order screens were said to have used up this year’s slots. The book is not closed; delivery windows can slip.',
  noteHead: 'Why it matters', noteSub: 'Empty slots mean near-term deliveries are already booked. Model Y L and the standard Y wait in different lines. Next, watch ZIP delivery windows.',
  footer: 'Tesla · US 2026 sold out',
});

add('nasdaq-27226-ath', 'L6', 'MACRO', {
  badge: '나스닥', title: '나스닥이 27,226.40까지 올라가 사상 최고를 다시 찍었습니다',
  breaking: '사상 최고 · 27,226.40',
  heroBig: '27,226.40', heroSub: '나스닥 종합은 기술주가 많은 미국 지수입니다. 차트 종가 27,226.40은 화면의 사상 최고입니다.',
  grid: [
    { icon:'\u{1F4C9}', big:'27,227', mid:'당일 고가', sub:'고가 27,227.74입니다' },
    { icon:'\u{1F4CA}', big:'26,039', mid:'시가', sub:'시가 26,039.51입니다' },
    { icon:'\u{1F4C8}', big:'24,425', mid:'저가', sub:'저가 24,425.34입니다' },
    { icon:'\u{1F4C5}', big:'6월', mid:'직전 고점', sub:'약 네 달 만에 다시 넘었습니다' },
  ],
  ctx1: '종가 27,226.40과 고가 27,227.74가 같은 화면에 있습니다.',
  ctx2: '인공지능 주가 지수를 밀었고, 유가는 같은 날 내렸습니다.',
  quote: '지수가 높아도 개별 종목은 다를 수 있습니다. 한 날의 고점입니다.',
  noteHead: '왜 중요한가', noteSub: '기술주 지수가 사상 최고를 다시 쓰면 인공지능 기대가 가격에 남아 있다는 뜻입니다. 한 날의 고점입니다. 다음에 볼 것은 종가가 27,200 위에 남는지입니다.',
  footer: '나스닥 · 27,226',
}, {
  badge: 'NASDAQ', title: 'The Nasdaq Composite printed 27,226.40, a new all-time high on the chart',
  breaking: 'Record · 27,226.40',
  heroBig: '27,226.40', heroSub: 'The Nasdaq Composite is the tech-heavy US index. The chart close of 27,226.40 is a record on that screen.',
  grid: [
    { icon:'\u{1F4C9}', big:'27,227', mid:'Session high', sub:'High 27,227.74' },
    { icon:'\u{1F4CA}', big:'26,039', mid:'Open', sub:'Open 26,039.51' },
    { icon:'\u{1F4C8}', big:'24,425', mid:'Low', sub:'Low 24,425.34' },
    { icon:'\u{1F4C5}', big:'June', mid:'Prior peak', sub:'Broke again after about four months' },
  ],
  ctx1: 'Close 27,226.40 and high 27,227.74 sit on one screen.',
  ctx2: 'AI names helped lift the index; oil fell the same day.',
  quote: 'A high index does not lift every stock. It is one session peak.',
  noteHead: 'Why it matters', noteSub: 'A fresh tech-index high means AI hopes are still in the price. It is one session. Next, watch whether closes stay above 27,200.',
  footer: 'Nasdaq · 27,226',
});

add('tsla-norway-sep-2956', 'L2', 'TSLA', {
  badge: '테슬라', title: '노르웨이 9월 신차에서 모델Y가 2,956대로 다음 아홉 대를 합친 것보다 많았습니다',
  heroIcon: '\u{1F697}', heroBig: '2,956대',
  heroSub: '신차는 처음 번호판을 받는 차입니다. 모델Y 한 종류가 2위부터 10위까지를 합친 1,850대보다 많습니다.',
  cards: [
    { label:'1위', big:'2,956', mid:'모델Y가 9월 화면 1위입니다', sub:'다음 아홉 종류 합은 1,850대입니다' },
    { label:'2위', big:'262', mid:'2위는 262대로 찍혔습니다', sub:'1위와 열 배 넘게 벌어졌습니다' },
    { label:'시장', big:'노르웨이', mid:'전기차가 거의 전부인 나라입니다', sub:'모델Y가 그 시장의 기준 차입니다' },
  ],
  detailHead: '화면이 말해 주는 것',
  detailLines: [
    '모델Y 한 종류가 2위부터 10위까지 합보다 많습니다',
    '2위 262대와 열 배 넘게 벌어졌습니다',
    '한 달 집계 화면이지 연간 확정은 아닙니다',
  ],
  quote: '화면의 막대는 모델Y 2,956대와 2위 262대를 나란히 보여 줍니다. 한 달 집계 화면이지 연간 확정은 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '한 모델이 나라 신차 표를 혼자 채우면 브랜드 힘이 숫자로 보입니다. 유럽 다른 나라는 다를 수 있습니다. 다음에 볼 것은 월말 공식 집계입니다.',
  footer: '테슬라 · 노르웨이 모델Y',
}, {
  badge: 'TSLA', title: 'Norway’s September new-car screen showed 2,956 Model Ys, more than the next nine combined',
  heroIcon: '\u{1F697}', heroBig: '2,956',
  heroSub: 'New cars are first registrations. One Model Y line beat the next nine names’ 1,850 combined.',
  cards: [
    { label:'1st', big:'2,956', mid:'Model Y led the September screen', sub:'The next nine summed to 1,850' },
    { label:'2nd', big:'262', mid:'Second place printed 262', sub:'First place was more than ten times larger' },
    { label:'Market', big:'Norway', mid:'Almost every new car there is electric', sub:'Model Y is the default family car' },
  ],
  detailHead: 'What the screen says',
  detailLines: [
    'One Model Y line beat the next nine combined',
    'Second place at 262 was more than ten times smaller',
    'It is a monthly screen, not a locked year',
  ],
  quote: 'The bar chart shows 2,956 Model Ys beside 262 in second place. It is a monthly screen, not a locked year.',
  noteHead: 'Why it matters', noteSub: 'When one model fills a national new-car table, brand power is visible. Other EU countries can differ. Next, watch the official month-end count.',
  footer: 'Tesla · Norway Model Y',
});

add('tsla-robotaxi-2dollar', 'L1', 'TSLA', {
  badge: '테슬라', title: '로보택시 마진이 마일당 최소 2달러라는 설명이 나왔습니다',
  heroIcon: '\u{1F4B0}', heroBig: '$2/마일',
  heroSub: '로보택시는 사람 운전 없이 요금을 받는 차입니다. 원격 감독 열 대에 사람 한 명이면 원가가 마일당 0.60~1.00달러로 읽혔습니다.',
  cards: [
    { icon:'\u{1F465}', big:'10:1', mid:'차 열 대에 원격 감독 한 명입니다', sub:'충전·보험·청소·통신이 원가에 들어갑니다' },
    { icon:'\u{1F4B5}', big:'$3–5', mid:'손님 요금은 마일당 3~5달러로 봤습니다', sub:'수요와 공급에 따라 움직입니다' },
    { icon:'\u{1F4CA}', big:'30%', mid:'오스틴 가동률 30%면 남는다는 설명입니다', sub:'빈 차로 가는 거리를 빼야 합니다' },
  ],
  quote: '요금 3~5달러에서 원가 1달러 안팎을 빼면 마일당 최소 2달러 매출 이익이라는 계산입니다. 회사 공시가 아니라 분석 설명입니다.',
  noteHead: '왜 중요한가', noteSub: '로보택시가 돈을 남긴다는 주장은 원가와 가동률이 숫자로 나와야 합니다. 이 화면은 한 사람의 계산입니다. 다음에 볼 것은 앱 요금과 실제 가동률입니다.',
  footer: '테슬라 · 로보택시 마진',
}, {
  badge: 'TSLA', title: 'A note said robotaxi gross profit is at least $2 a mile',
  heroIcon: '\u{1F4B0}', heroBig: '$2/mi',
  heroSub: 'A robotaxi charges a fare with no driver in the seat. Ten cars per remote operator put cost near $0.60–$1.00 a mile.',
  cards: [
    { icon:'\u{1F465}', big:'10:1', mid:'Ten cars per remote operator', sub:'Charging, insurance, cleaning and links sit in cost' },
    { icon:'\u{1F4B5}', big:'$3–5', mid:'Fares were put at $3–$5 a mile', sub:'They move with demand and supply' },
    { icon:'\u{1F4CA}', big:'30%', mid:'Austin at 30% utilization still works', sub:'Empty miles have to be subtracted' },
  ],
  quote: 'Fare $3–$5 minus about $1 of cost is at least $2 a mile of gross profit. That is an analyst note, not a filing.',
  noteHead: 'Why it matters', noteSub: 'A robotaxi-profit claim needs cost and utilization in numbers. This screen is one person’s math. Next, watch app fares and real utilization.',
  footer: 'Tesla · robotaxi margin',
});

add('tsla-cybercab-austin-1216', 'L3', 'TSLA', {
  badge: '테슬라', title: '월요일 오후 오스틴 사이버캡 한 건이 12.16달러, 대기 10분으로 찍혔습니다',
  heroIcon: '\u{1F698}', heroBig: '$12.16',
  heroSub: '사이버캡은 운전석 없는 전용 로보택시입니다. 앱 화면은 도착 1분 50초, 대기 약 10분을 보여 줬습니다.',
  cards: [
    { icon:'\u{23F1}', big:'10분', mid:'차가 10분 안에 온다는 안내입니다', sub:'월요일 오후 오스틴 화면입니다' },
    { icon:'\u{1F4CD}', big:'주소', mid:'2201 Dee Cunnes 로드가 찍혔습니다', sub:'오스틴 시내 구간입니다' },
    { icon:'\u{1F697}', big:'Y 4대', mid:'같은 화면에 모델Y가 4대 있었습니다', sub:'사이버캡과 모델Y가 같이 뜹니다' },
  ],
  quote: '요금 12.16달러는 그 구간 한 건입니다. 전 도시 평균이 아닙니다. 팁과 대기 시간이 같이 보입니다.',
  noteHead: '왜 중요한가', noteSub: '실제 앱 요금이 나와야 로보택시 이야기가 달력에서 지갑으로 내려옵니다. 한 화면입니다. 다음에 볼 것은 같은 구간의 반복 요금입니다.',
  footer: '테슬라 · 오스틴 12.16달러',
}, {
  badge: 'TSLA', title: 'A Monday-afternoon Austin Cybercab ride showed $12.16 and a 10-minute wait',
  heroIcon: '\u{1F698}', heroBig: '$12.16',
  heroSub: 'Cybercab is the purpose-built robotaxi with no driver seat. The app showed arrival in 1:50 and about a 10-minute wait.',
  cards: [
    { icon:'\u{23F1}', big:'10 min', mid:'The car was due in ten minutes', sub:'A Monday afternoon Austin screen' },
    { icon:'\u{1F4CD}', big:'Address', mid:'2201 Dee Cunnes Rd was on the pin', sub:'An in-city Austin stretch' },
    { icon:'\u{1F697}', big:'4 Ys', mid:'Four Model Y cars sat on the same screen', sub:'Cybercab and Model Y share the app' },
  ],
  quote: 'The $12.16 fare is one trip on that route, not a city average. Tip and wait time sit on the same card.',
  noteHead: 'Why it matters', noteSub: 'A live app fare moves robotaxi talk from a calendar to a wallet. It is one screen. Next, watch repeat fares on the same route.',
  footer: 'Tesla · Austin $12.16',
});

add('spacex-grokbot-175', 'L4', 'SPCX', {
  badge: '스페이스X', title: '스페이스X가 그록 봇으로 고객 지원을 175% 늘리고 20만 명 채용을 피했다고 알려졌습니다',
  badgeLine: '지원 · 채용 대체',
  heroIcon: '\u{1F916}', heroBig: '+175%',
  heroSub: '그록 봇은 고객 질문에 답하는 인공지능입니다. 사람 채용 20만 명을 피했다는 설명은 회사 공식 실적이 아닙니다.',
  cards: [
    { icon:'\u{1F4C8}', big:'175%', mid:'고객 지원 처리가 늘었다는 숫자입니다', sub:'한 화면의 집계입니다' },
    { icon:'\u{1F465}', big:'20만', mid:'새로 뽑지 않았다는 인원입니다', sub:'피했다는 말이지 해고 공시는 아닙니다' },
    { icon:'\u{1F4BB}', big:'그록', mid:'스페이스XAI 모델을 업무에 썼습니다', sub:'위성과 발사 고객 창구로 읽힙니다' },
  ],
  quote: '지원 처리가 늘고 채용을 피했다는 두 숫자가 한 글에 붙었습니다. 비용이 실제로 얼마나 줄었는지는 실적표가 필요합니다.',
  noteHead: '왜 중요한가', noteSub: '인공지능이 고객 창구를 대신하면 인건비가 매출보다 덜 늘어날 수 있습니다. 175%와 20만 명은 한 화면입니다. 다음에 볼 것은 분기 판관비입니다.',
  footer: '스페이스X · 그록 봇',
}, {
  badge: 'SPCX', title: 'SpaceX was said to lift customer support 175% with Grok Bot and avoid 200,000 hires',
  badgeLine: 'Support · hiring',
  heroIcon: '\u{1F916}', heroBig: '+175%',
  heroSub: 'Grok Bot is AI that answers customer questions. Avoiding 200,000 hires is not an official earnings line.',
  cards: [
    { icon:'\u{1F4C8}', big:'175%', mid:'Support throughput was said to jump', sub:'One screen’s tally' },
    { icon:'\u{1F465}', big:'200k', mid:'New hires said to have been avoided', sub:'Avoided, not a layoff filing' },
    { icon:'\u{1F4BB}', big:'Grok', mid:'A SpaceXAI model was put to work', sub:'Read as satellite and launch support' },
  ],
  quote: 'A 175% lift and 200,000 avoided hires sat in one post. How much cost actually fell needs an income statement.',
  noteHead: 'Why it matters', noteSub: 'If AI staffs the help desk, headcount can grow slower than sales. 175% and 200k are one screen. Next, watch quarterly opex.',
  footer: 'SpaceX · Grok Bot',
});

add('grok-47-aa', 'L2', 'XAI', {
  badge: '스페이스XAI', title: '그록 4.7이 지능 지수 46점으로 상위 네 실험실에 들어갔습니다',
  heroIcon: '\u{1F9E0}', heroBig: '46점',
  heroSub: '지능 지수는 여러 시험을 한 점수로 합친 표입니다. 그록 4.6보다 2점 높고, 코딩 에이전트 표에서는 앞질렀습니다.',
  cards: [
    { label:'점수', big:'+2', mid:'4.6보다 2점이 올랐습니다', sub:'같은 가격표에서 점수가 움직였습니다' },
    { label:'코딩', big:'앞섬', mid:'코딩 에이전트 표에서 순위를 올렸습니다', sub:'에이전트는 일을 나눠 하는 모델입니다' },
    { label:'가격', big:'$2/$6', mid:'입력 2달러, 출력 6달러입니다', sub:'토큰을 더 써서 점수가 나온 평가입니다' },
  ],
  detailHead: '평가가 말해 주는 것',
  detailLines: [
    '지능 지수 46점은 상위 네 실험실 칸입니다',
    '코딩 에이전트 표에서 한 경쟁 모델을 앞질렀습니다',
    '토큰을 더 쓰면 한 일당 비용이 커집니다',
  ],
  quote: '46점은 상위권이지만 1위 숫자는 아닙니다. 토큰을 더 쓰면 같은 단가라도 한 일당 비용이 커집니다.',
  noteHead: '왜 중요한가', noteSub: '점수가 오르면 개발 도구와 차 안 비서가 같이 좋아질 수 있습니다. 평가 한 장입니다. 다음에 볼 것은 실제 업무에서 쓰는 시간과 비용입니다.',
  footer: '스페이스XAI · 그록 4.7',
}, {
  badge: 'SPCX AI', title: 'Grok 4.7 scored 46 on the intelligence index and entered the top four labs',
  heroIcon: '\u{1F9E0}', heroBig: '46',
  heroSub: 'The intelligence index folds many tests into one score. It is two points above Grok 4.6 and rose on the coding-agent table.',
  cards: [
    { label:'Score', big:'+2', mid:'Two points above 4.6', sub:'The price card did not change' },
    { label:'Coding', big:'Lead', mid:'It moved up the coding-agent table', sub:'An agent is a model that splits work' },
    { label:'Price', big:'$2/$6', mid:'Input $2 and output $6', sub:'The score used more tokens' },
  ],
  detailHead: 'What the eval says',
  detailLines: [
    'A 46 on the index put it in the top four labs',
    'It overtook one rival on the coding-agent table',
    'More tokens raise the cost per job',
  ],
  quote: '46 is a top-tier print, not first place. More tokens mean a higher cost per job at the same rate.',
  noteHead: 'Why it matters', noteSub: 'A higher score can lift both coding tools and the in-car assistant. It is one eval. Next, watch time and cost on real jobs.',
  footer: 'SpaceXAI · Grok 4.7',
});

add('anthropic-5gw', 'L1', 'ANTHROPIC', {
  badge: 'Anthropic', title: 'Anthropic이 연말까지 계산 용량을 5기가와트로 키운다는 설명이 나왔습니다',
  heroIcon: '\u{26A1}', heroBig: '5GW',
  heroSub: '기가와트는 발전소 한 기 규모의 전력입니다. 인공지능 계산은 전기와 칩이 같이 있어야 커집니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'연말', mid:'올해 말까지라는 목표입니다', sub:'착공과 수전은 다른 달력입니다' },
    { icon:'\u{1F4BB}', big:'용량', mid:'모델을 돌리는 컴퓨터 규모입니다', sub:'클로드를 쓰는 회사 수요가 배경입니다' },
    { icon:'\u{1F50C}', big:'전력', mid:'전력이 먼저 와야 칩이 돕니다', sub:'데이터센터 허가가 병목일 수 있습니다' },
  ],
  quote: '5기가와트는 큰 목표입니다. 계약 전력과 실제 가동은 시차가 있습니다. 한 화면의 계획입니다.',
  noteHead: '왜 중요한가', noteSub: '계산 용량이 커지면 모델 경쟁이 전력 경쟁이 됩니다. 5기가와트는 목표입니다. 다음에 볼 것은 수전 계약과 실제 가동입니다.',
  footer: 'Anthropic · 5GW',
}, {
  badge: 'ANTHROPIC', title: 'Anthropic was said to scale compute to 5 gigawatts by year-end',
  heroIcon: '\u{26A1}', heroBig: '5GW',
  heroSub: 'A gigawatt is roughly one large power plant. AI compute grows only when chips and electricity arrive together.',
  cards: [
    { icon:'\u{1F4C5}', big:'Year-end', mid:'The target is this year-end', sub:'Build and power hookup sit on different calendars' },
    { icon:'\u{1F4BB}', big:'Capacity', mid:'The size of computers that run models', sub:'Claude demand sits behind the number' },
    { icon:'\u{1F50C}', big:'Power', mid:'Electricity must arrive before chips spin', sub:'Data-center permits can bottleneck' },
  ],
  quote: 'Five gigawatts is a large goal. Contracted power and live racks have a lag. It is a plan on one screen.',
  noteHead: 'Why it matters', noteSub: 'When compute grows, model races become power races. 5GW is a target. Next, watch interconnection and live megawatts.',
  footer: 'Anthropic · 5GW',
});

add('meta-muse-paypal', 'L3', 'META', {
  badge: '메타', title: '메타 뮤즈가 페이팔·익스피디아와 손잡고 소비자 인공지능 창구를 넓힙니다',
  heroIcon: '\u{1F9BE}', heroBig: '뮤즈',
  heroSub: '뮤즈는 메타의 소비자용 인공지능 비서입니다. 결제와 여행 앱을 연결하면 말만으로 예약과 송금이 됩니다.',
  cards: [
    { icon:'\u{1F4B3}', big:'페이팔', mid:'결제 앱과 연결됩니다', sub:'화면의 페이팔은 52.89달러, +0.51%였습니다' },
    { icon:'\u{2708}', big:'익스피디아', mid:'여행 예약 앱과 연결됩니다', sub:'항공·숙소 칸이 비서 안으로 들어옵니다' },
    { icon:'\u{1F4AC}', big:'관측', mid:'챗GPT 이후 가장 쓰일 수 있다는 말이 붙었습니다', sub:'회사 공시가 아니라 분석 의견입니다' },
  ],
  quote: '비서가 결제와 여행을 만지면 광고 회사이던 메타가 거래 회사로 한 칸 더 갑니다. 제휴 발표이지 사용자 수 확정은 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '소비자가 매일 쓰는 창구가 되면 광고 외에 수수료가 붙을 수 있습니다. 제휴 한 줄입니다. 다음에 볼 것은 실제 예약·결제 건수입니다.',
  footer: '메타 · 뮤즈 제휴',
}, {
  badge: 'META', title: 'Meta Muse partnered with PayPal and Expedia to widen its consumer AI window',
  heroIcon: '\u{1F9BE}', heroBig: 'Muse',
  heroSub: 'Muse is Meta’s consumer AI assistant. Linking payments and travel lets people book and send money by voice.',
  cards: [
    { icon:'\u{1F4B3}', big:'PayPal', mid:'The payments app is connected', sub:'The screen showed PYPL at $52.89, +0.51%' },
    { icon:'\u{2708}', big:'Expedia', mid:'The travel app is connected', sub:'Flights and stays move inside the assistant' },
    { icon:'\u{1F4AC}', big:'View', mid:'A note said it could be the most-used tool since ChatGPT', sub:'That is an opinion, not a filing' },
  ],
  quote: 'When an assistant touches pay and travel, Meta steps from ads toward transactions. A partnership is not a user count.',
  noteHead: 'Why it matters', noteSub: 'A daily consumer window can add fees besides ads. It is one partnership line. Next, watch live bookings and payments.',
  footer: 'Meta · Muse partners',
});

add('spacex-715-acres', 'L4', 'SPCX', {
  badge: '스페이스X', title: '연방법원이 스페이스X 야생보호 토지 715에이커 교환을 막지 않았습니다',
  badgeLine: '판결 · 토지 교환',
  heroIcon: '\u{1F3DB}', heroBig: '715에이커',
  heroSub: '에이커는 땅 넓이 단위입니다. 판사는 교환을 당장 멈추라는 요청을 기각했고, 소송 자체는 남아 있습니다.',
  cards: [
    { icon:'\u{1F3D6}', big:'715', mid:'보호구역에서 내주는 땅입니다', sub:'남부 텍사스 리오그란데 일대입니다' },
    { icon:'\u{1F91D}', big:'683', mid:'스페이스X가 넘기는 땅입니다', sub:'다른 보호구역 옆에 붙습니다' },
    { icon:'\u{1F4C5}', big:'9/22', mid:'소유권 이전 목표일이 거론됐습니다', sub:'가처분은 막히고 본안은 남습니다' },
  ],
  quote: '발사장이 넓어지면 스타십 일정이 땅 때문에 덜 밀릴 수 있습니다. 환경 단체 소송은 계속됩니다.',
  noteHead: '왜 중요한가', noteSub: '스타베이스 땅이 늘면 발사와 시험 공간이 넓어집니다. 가처분 기각이지 본안 승소는 아닙니다. 다음에 볼 것은 소유권 이전과 공사 허가입니다.',
  footer: '스페이스X · 715에이커',
}, {
  badge: 'SPCX', title: 'A federal judge did not block SpaceX’s 715-acre wildlife-refuge land swap',
  badgeLine: 'Ruling · land swap',
  heroIcon: '\u{1F3DB}', heroBig: '715 acres',
  heroSub: 'An acre is a land unit. The judge denied an immediate halt. The lawsuit itself continues.',
  cards: [
    { icon:'\u{1F3D6}', big:'715', mid:'Acres leaving the refuge', sub:'Lower Rio Grande Valley in South Texas' },
    { icon:'\u{1F91D}', big:'683', mid:'Acres SpaceX is giving', sub:'They sit beside another refuge' },
    { icon:'\u{1F4C5}', big:'Sep 22', mid:'Title transfer was targeted around that date', sub:'The injunction failed; the case remains' },
  ],
  quote: 'A larger pad site can keep Starship dates from slipping on land. Conservation groups are still in court.',
  noteHead: 'Why it matters', noteSub: 'More Starbase land means more room to fly and test. A denied injunction is not a full win. Next, watch title transfer and build permits.',
  footer: 'SpaceX · 715 acres',
});

add('tsla-fsd-mattress', 'L3', 'TSLA', {
  badge: '테슬라', title: '감독 주행 14.3.10이 고속도로 매트리스를 피해 차로를 옮겼습니다',
  heroIcon: '\u{1F6A6}', heroBig: '회피',
  heroSub: '감독 주행은 사람이 자리를 지키며 차가 가는 소프트웨어입니다. 14.3.10은 차선을 가로막은 매트리스를 보고 옆 차로로 갔습니다.',
  cards: [
    { icon:'\u{1F4F9}', big:'영상', mid:'고속도로 실차 장면입니다', sub:'차선에 큰 매트리스가 놓여 있습니다' },
    { icon:'\u{1F698}', big:'14.3.10', mid:'차에 내려간 버전 숫자입니다', sub:'세 번째 묶음으로 거론된 버전입니다' },
    { icon:'\u{1F6A6}', big:'차로', mid:'막힌 차로를 피해 옆 칸으로 갔습니다', sub:'사람이 핸들을 돌린 장면으로 보이지 않습니다' },
  ],
  quote: '쓰러진 물건은 학습이 적은 장면입니다. 한 클립이지 사고 통계가 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '드문 장애물을 피하면 감독 주행이 고속도로에서 사람을 덜 부릅니다. 영상 한 편입니다. 다음에 볼 것은 같은 버전의 개입 횟수입니다.',
  footer: '테슬라 · 매트리스 회피',
}, {
  badge: 'TSLA', title: 'Supervised FSD 14.3.10 steered around a mattress blocking a freeway lane',
  heroIcon: '\u{1F6A6}', heroBig: 'Avoided',
  heroSub: 'Supervised FSD drives while a person stays in the seat. Version 14.3.10 saw a mattress in the lane and moved over.',
  cards: [
    { icon:'\u{1F4F9}', big:'Clip', mid:'A real freeway clip', sub:'A large mattress sat in the lane' },
    { icon:'\u{1F698}', big:'14.3.10', mid:'The version on the car', sub:'Cited as the third rollout bundle' },
    { icon:'\u{1F6A6}', big:'Lane', mid:'It left the blocked lane for the next one', sub:'The clip does not show a hand turning the wheel' },
  ],
  quote: 'Fallen objects are rare scenes. One clip is not a crash statistic.',
  noteHead: 'Why it matters', noteSub: 'Dodging rare debris means supervised FSD calls the driver less on highways. It is one video. Next, watch intervention counts on the same build.',
  footer: 'Tesla · mattress avoid',
});

add('spacex-starlink-v35', 'L2', 'SPCX', {
  badge: '스페이스X', title: '스타링크 3.5세대는 전력 약 150킬로와트, 내려받기 3~5테라비트로 그려졌습니다',
  heroIcon: '\u{1F6F0}', heroBig: 'V3.5',
  heroSub: '스타링크는 지구 낮은 궤도의 인터넷 위성입니다. 3.5세대는 3세대와 4세대 사이에 그리는 통신 위성입니다.',
  cards: [
    { label:'전력', big:'150kW', mid:'위성 전력이 약 150킬로와트입니다', sub:'3세대 약 30킬로와트에서 커집니다' },
    { label:'내려받기', big:'3–5Tb', mid:'내려받기가 초당 3~5테라비트입니다', sub:'4세대는 약 10테라비트, 250킬로와트로 그려집니다' },
    { label:'패널', big:'확대', mid:'태양전지판이 더 넓어집니다', sub:'방열판도 같이 커집니다' },
  ],
  detailHead: '사다리가 말해 주는 것',
  detailLines: [
    '3세대 약 30킬로와트는 확인된 칸입니다',
    '3.5세대 150킬로와트와 4세대 250킬로와트는 그림입니다',
    '실제 발사 호기와 펼쳐진 패널이 증빙입니다',
  ],
  quote: '전력 사다리 그림은 3세대 확인, 3.5·4세대는 개념입니다. 머스크는 위성당 양방향 약 10테라비트와 250킬로와트를 말했습니다.',
  noteHead: '왜 중요한가', noteSub: '위성이 더 많은 전기를 쓰면 인터넷 용량이 커집니다. 3.5세대는 그림입니다. 다음에 볼 것은 실제 발사 호기와 펼쳐진 패널입니다.',
  footer: '스페이스X · 스타링크 3.5',
}, {
  badge: 'SPCX', title: 'Starlink V3.5 was drawn at about 150 kilowatts and 3–5 terabits down',
  heroIcon: '\u{1F6F0}', heroBig: 'V3.5',
  heroSub: 'Starlink is low-Earth-orbit internet. V3.5 is a comms satellite drawn between V3 and V4.',
  cards: [
    { label:'Power', big:'150kW', mid:'Spacecraft power near 150 kilowatts', sub:'Up from about 30 kilowatts on V3' },
    { label:'Downlink', big:'3–5Tb', mid:'Downlink of 3–5 terabits a second', sub:'V4 is drawn near 10 terabits and 250 kilowatts' },
    { label:'Arrays', big:'Larger', mid:'Solar wings get larger', sub:'Radiators grow with them' },
  ],
  detailHead: 'What the ladder says',
  detailLines: [
    'V3 near 30 kilowatts is the verified rung',
    'V3.5 at 150 kW and V4 at 250 kW are drawings',
    'Flown revs and deployed arrays are the proof',
  ],
  quote: 'The power ladder marks V3 as verified; V3.5 and V4 are concepts. Musk has cited about 10 terabits both ways and 250 kilowatts per sat.',
  noteHead: 'Why it matters', noteSub: 'More satellite power means more internet capacity. V3.5 is a drawing. Next, watch flown revs and deployed arrays.',
  footer: 'SpaceX · Starlink V3.5',
});

add('musk-ai-2028', 'L4', 'XAI', {
  badge: '머스크', title: '머스크는 인공지능이 내년 말, 늦어도 2028년에 모든 분야를 앞선다고 했습니다',
  badgeLine: '발언 · 일정 아님',
  heroIcon: '\u{1F4AC}', heroBig: '2027–28',
  heroSub: '모든 분야를 앞선다는 말은 시험과 직업에서 사람보다 잘한다는 뜻으로 읽힙니다. 제품 출시 일정이 아닙니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'내년', mid:'내년 말이라는 빠른 칸입니다', sub:'2027년 말로 읽힙니다' },
    { icon:'\u{1F552}', big:'2028', mid:'늦어도 그해라는 칸입니다', sub:'한 해 더 여유를 둔 말입니다' },
    { icon:'\u{1F9E0}', big:'발언', mid:'목표이지 계약이 아닙니다', sub:'허가와 안전 통계는 다른 줄입니다' },
  ],
  quote: '지능이 커진다는 말과 차가 혼자 다니는 달은 다릅니다. 발언 한 줄입니다.',
  noteHead: '왜 중요한가', noteSub: '창업자가 해를 말하면 투자 눈높이가 앞당겨집니다. 달력의 확정은 아닙니다. 다음에 볼 것은 제품 버전과 규제 허가입니다.',
  footer: '머스크 · 인공지능 일정',
}, {
  badge: 'MUSK', title: 'Musk said AI will beat all fields by the end of next year, or 2028 at the latest',
  badgeLine: 'Remark · not a ship date',
  heroIcon: '\u{1F4AC}', heroBig: '2027–28',
  heroSub: 'Beating all fields reads as outperforming people on tests and jobs. It is not a product-release date.',
  cards: [
    { icon:'\u{1F4C5}', big:'Next year', mid:'The fast slot is year-end next year', sub:'That reads as end-2027' },
    { icon:'\u{1F552}', big:'2028', mid:'The slower slot is that year at latest', sub:'One extra year of slack' },
    { icon:'\u{1F9E0}', big:'Talk', mid:'A goal, not a contract', sub:'Permits and safety stats sit on another line' },
  ],
  quote: 'A claim that intelligence grows is not the month a car drives alone. It is one remark.',
  noteHead: 'Why it matters', noteSub: 'When a founder names a year, investor clocks move forward. It is not a locked calendar. Next, watch product versions and permits.',
  footer: 'Musk · AI timeline',
});

add('tsla-cybercab-nyc', 'L5', 'TSLA', {
  badge: '테슬라', title: '사이버캡이 뉴욕에서 낮 시험을 시작했고 홀랜드 터널로 맨해튼에 들어가는 모습이 찍혔습니다',
  heroIcon: '\u{1F698}', heroBig: '뉴욕',
  heroSub: '홀랜드 터널은 뉴저지와 맨해튼을 잇는 터널입니다. 낮 시험이지 유료 영업 개시는 아닙니다.',
  before: { label: '오스틴', big: '영업', sub:'텍사스에서는 호출이 이미 있습니다' },
  after: { label: '뉴욕', big: '시험', sub:'오늘 아침 낮 시험이 시작됐습니다' },
  cards: [
    { icon:'\u{1F3D7}', big:'터널', mid:'홀랜드 터널로 들어가는 차가 찍혔습니다', sub:'맨해튼 방향입니다' },
    { icon:'\u{2600}', big:'낮', mid:'아침부터 시험을 돌렸습니다', sub:'야간 시험과 다른 줄입니다' },
    { icon:'\u{1F4F8}', big:'목격', mid:'금색 사이버캡 사진이 올라왔습니다', sub:'한 대 목격이지 허가 공시가 아닙니다' },
  ],
  quote: '큰 도시 터널은 표지와 차선이 복잡한 장면입니다. 시험 차량이지 승객 요금 화면은 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '뉴욕이 열리면 로보택시 이야기가 한 도시에서 해안으로 넓어집니다. 목격 한 장입니다. 다음에 볼 것은 주 허가와 유료 호출입니다.',
  footer: '테슬라 · 뉴욕 사이버캡',
}, {
  badge: 'TSLA', title: 'Cybercab started daytime testing in New York and was seen entering the Holland Tunnel toward Manhattan',
  heroIcon: '\u{1F698}', heroBig: 'NYC',
  heroSub: 'The Holland Tunnel links New Jersey and Manhattan. Daytime testing is not a paid launch.',
  before: { label: 'Austin', big: 'Live', sub:'Rides already run in Texas' },
  after: { label: 'New York', big: 'Test', sub:'Day testing started this morning' },
  cards: [
    { icon:'\u{1F3D7}', big:'Tunnel', mid:'A car was seen entering the Holland Tunnel', sub:'Heading toward Manhattan' },
    { icon:'\u{2600}', big:'Day', mid:'Testing ran from the morning', sub:'A different line from night tests' },
    { icon:'\u{1F4F8}', big:'Spot', mid:'A gold Cybercab photo was posted', sub:'One sighting, not a permit filing' },
  ],
  quote: 'A big-city tunnel is a hard scene of signs and lanes. It is a test car, not a fare screen.',
  noteHead: 'Why it matters', noteSub: 'If New York opens, robotaxi talk moves from one city to a coast. It is one photo. Next, watch state permits and paid rides.',
  footer: 'Tesla · NYC Cybercab',
});

add('tsla-grok-incar', 'L5', 'TSLA', {
  badge: '테슬라', title: '테슬라 차 안 그록이 일정·메일·파일을 말로 다루기 시작했습니다',
  heroIcon: '\u{1F4F1}', heroBig: '차 안 그록',
  heroSub: '그록은 스페이스XAI의 대화 모델입니다. 공식 계정은 핸즈프리로 받은편지함과 일정을 정리한다고 했습니다.',
  before: { label: '대화', big: '질문', sub:'예전에는 질문에 답하는 칸이었습니다' },
  after: { label: '업무', big: '실행', sub:'메일·일정·파일을 손 없이 다룹니다' },
  cards: [
    { icon:'\u{2615}', big:'주문', mid:'스타벅스 주문을 봇이 넣었다는 영상입니다', sub:'도착하니 음료가 나와 있었다는 설명입니다' },
    { icon:'\u{1F698}', big:'14.3.10', mid:'감독 주행이 그 가게까지 갔습니다', sub:'소프트웨어와 비서가 한 이동에 겹쳤습니다' },
    { icon:'\u{1F4E7}', big:'연결', mid:'기존 파일과 채팅을 잇는다고 했습니다', sub:'공식 안내 영상입니다' },
  ],
  quote: '차가 이동 사무실이 되면 소프트웨어 구독이 차 값과 따로 커질 수 있습니다. 시연이지 모든 차의 기본은 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '비서가 일을 하면 테슬라 소프트웨어 칸이 두꺼워집니다. 공식 안내와 개인 시연이 겹친 하루입니다. 다음에 볼 것은 실제 장착 나라와 사용 횟수입니다.',
  footer: '테슬라 · 차 안 그록',
}, {
  badge: 'TSLA', title: 'Grok in Tesla cars can now manage calendar, mail and files by voice',
  heroIcon: '\u{1F4F1}', heroBig: 'In-car Grok',
  heroSub: 'Grok is SpaceXAI’s chat model. The official account said it can clean an inbox and calendar hands-free.',
  before: { label: 'Chat', big: 'Ask', sub:'It used to answer questions' },
  after: { label: 'Work', big: 'Do', sub:'It now handles mail, calendar and files' },
  cards: [
    { icon:'\u{2615}', big:'Order', mid:'A clip said the bot placed a Starbucks order', sub:'The drink was ready on arrival' },
    { icon:'\u{1F698}', big:'14.3.10', mid:'Supervised FSD drove to the shop', sub:'Software and the assistant shared one trip' },
    { icon:'\u{1F4E7}', big:'Link', mid:'It ties into existing files and chats', sub:'An official demo clip' },
  ],
  quote: 'If the car becomes a moving office, software subscriptions can grow apart from the sticker price. A demo is not every car’s default.',
  noteHead: 'Why it matters', noteSub: 'An assistant that does work thickens Tesla’s software line. Official notes and a personal demo overlapped. Next, watch countries and usage counts.',
  footer: 'Tesla · in-car Grok',
});

add('us-hh-399-stocks', 'L1', 'MACRO', {
  badge: '매크로', title: '미국 가계 순자산의 39.9%가 주식에 들어가 사상 최고입니다',
  heroIcon: '\u{1F4CA}', heroBig: '39.9%',
  heroSub: '순자산은 가진 것에서 빚을 뺀 금액입니다. 그 가운데 주식이 39.9%로, 집계상 가장 높습니다.',
  cards: [
    { icon:'\u{1F3E0}', big:'가계', mid:'집이 아니라 주식 비중이 최고입니다', sub:'집값과 주식 중 어느 칸이 큰지가 바뀝니다' },
    { icon:'\u{1F4C8}', big:'최고', mid:'기록 경신이라는 설명입니다', sub:'한 시점의 비율입니다' },
    { icon:'\u{1F4B0}', big:'민감', mid:'주가가 내리면 가계 자산이 더 흔들립니다', sub:'연준 통계 칸으로 읽힙니다' },
  ],
  quote: '가계가 주식을 이만큼 들고 있으면, 지수 고점이 소비와 심리에 바로 닿습니다. 비율이지 매수 신호는 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '주식이 가계 자산의 큰 칸이면 시장이 출렁일 때 소비가 같이 출렁입니다. 39.9%는 한 시점입니다. 다음에 볼 것은 다음 분기 비율입니다.',
  footer: '매크로 · 가계 주식 39.9%',
}, {
  badge: 'MACRO', title: 'US households now hold a record 39.9% of net worth in stocks',
  heroIcon: '\u{1F4CA}', heroBig: '39.9%',
  heroSub: 'Net worth is assets minus debts. Stocks are 39.9% of that pile, the highest in the series.',
  cards: [
    { icon:'\u{1F3E0}', big:'Households', mid:'The stock share, not housing, is the record', sub:'Which bucket is larger has shifted' },
    { icon:'\u{1F4C8}', big:'Record', mid:'Described as an all-time print', sub:'A point-in-time ratio' },
    { icon:'\u{1F4B0}', big:'Sensitive', mid:'A stock drop shakes household wealth more', sub:'Read as a Fed statistics line' },
  ],
  quote: 'When households hold this much equity, index highs touch spending and mood. A ratio is not a buy signal.',
  noteHead: 'Why it matters', noteSub: 'If stocks are a large household bucket, consumption sways with the market. 39.9% is one print. Next, watch the next quarter’s share.',
  footer: 'Macro · household stocks 39.9%',
});

};
