// 2026-09-04 SVG topic data — consumed by gen-reports-20260904.js
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.04 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'테슬라가 오스틴에서 사이버캡 행사를 열었고 주가는 376.37달러(+5.42%)까지 반응했습니다',
      sub:'앱 요금 4.20달러, 전비 165와트시/마일, 한국 8월 1만 400대 판매가 같은 주에 겹칩니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'엔비디아가 허깅페이스를 약 129억 달러에 인수하는 공시를 냈습니다',
      sub:'주주 119억 달러와 잔류 보상 최대 10억 달러를 합친 규모이며 마감은 2027년 상반기 목표입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'스페이스X 비상장 호가가 약 150달러로 시가총액 2조 달러 서사가 퍼졌습니다',
      sub:'연산 전력 1.4기가와트, 배스트롭 830에이커, 사우스헤이븐 60만 평방피트 데이터센터가 같은 축입니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'AI', title:'앤스로픽 성장과 오픈에이아이 지피티6 아스트라 롤아웃이 같은 주에 부각됐습니다',
      sub:'버크셔가 예전에 사 둔 구글, 에스앤피500 배당이 국채 10년물을 넘는 종목이 5% 미만인 그림도 겹칩니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'9/4', title:'오늘 밤 미국 8월 비농업 고용이 나오고 9월 15~16일 연준 회의가 이어집니다',
      sub:'서비스 구매관리자지수는 55.4, 민간고용은 3만 8천 명, 유가 90달러대가 금리 기대를 흔듭니다.' },
  ],
  caption: '더 볼 것: 사이버캡 행사·요금 4.20달러·전비 165·한국 1만400대·엔비디아 129억·스페이스X 150달러·고용 발표',
}, {
  headline: '2026.09.04 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Tesla Cybercab event in Austin; shares reacted to $376.37 (+5.42%)',
      sub:'App fare $4.20, 165 Wh/mi, Korea August 10,400 units in the same week.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'Nvidia files to acquire Hugging Face for about $12.93 billion',
      sub:'$11.9B to stockholders plus up to $1.0B retention; close targeted H1 2027.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'SpaceX unofficial prints near $150 with a $2T market-cap narrative',
      sub:'1.4 GW compute, 830 acres in Bastrop, 600k sq ft Southaven data center.' },
    { color:'#a78bfa', fill:'#120b1f', right:'AI', title:'Anthropic growth talk and OpenAI GPT-6 Astra rollout in the same week',
      sub:'Berkshire Google stake and fewer than 5% of S&P names yielding above the 10-year.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'9/4', title:'August nonfarm payrolls tonight; FOMC Sept 15-16 next',
      sub:'ISM services 55.4, ADP +38k, crude near $90 keep rate odds in play.' },
  ],
  caption: 'Watch: Cybercab event · $4.20 fare · 165 Wh/mi · Korea 10,400 · NVDA $12.93B · SPCX $150 · NFP',
});

add('cybercab-event-austin', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '9/3 · 오스틴 · 행사',
  title: '테슬라가 오스틴에서 사이버캡 행사를 열었고 주가는 376.37달러로 5.42% 올랐습니다',
  heroBig: '+5.42%',
  heroSub: '미 동부 오후 5시 45분 행사 전후로 장중 383.48달러(+7.41%)까지 반응했습니다. 사이버캡은 운전석 없는 전용 로보택시 차량입니다.',
  grid: [
    { icon:'🚕', big:'5:45 PM', mid:'오스틴', sub:'미 동부 기준' },
    { icon:'📈', big:'$376.37', mid:'종가권', sub:'+5.42%' },
    { icon:'💰', big:'$383.48', mid:'장중', sub:'+7.41%' },
    { icon:'🏭', big:'1.20조$', mid:'시총', sub:'장중 반응' },
  ],
  ctx1: '행사 영상과 상용 대수·허가 범위를 같은 표에 두지 않으면 숫자 해석이 흐려집니다',
  ctx2: '장중 고가와 종가는 다를 수 있으니 거래 세션을 분리해 기록하시기 바랍니다',
  quote: '사이버캡은 모델와이에 소프트웨어만 얹은 차가 아니라 처음부터 무인 운행용으로 만든 전용 차량입니다. 시가총액 약 1.20조 달러, 주가수익비율 356배, 52주 범위 297.38~498.83달러가 같은 화면에 있었습니다.',
  noteSub: '이벤트 데이는 말보다 영상·요금·스펙이 남는 날입니다. 골든 시범 차량과 상용 플릿을 구분하고, 앱 요금 4.20달러·전비 165와트시/마일을 행사 직후 같은 표에 두시기 바랍니다. 단기 레버리지는 확인 전 신중하시면 됩니다.',
  footer: '테슬라 · 사이버캡 행사',
}, {
  badge: 'TSLA', breaking: 'SEPT 3 · AUSTIN EVENT',
  title: 'Tesla held the Cybercab event in Austin; shares reacted to $376.37 (+5.42%)',
  heroBig: '+5.42%',
  heroSub: 'Intraday prints reached $383.48 (+7.41%) around 12:04 PM EDT. Cybercab is a purpose-built robotaxi without a driver seat.',
  grid: [
    { icon:'🚕', big:'5:45 PM', mid:'Austin', sub:'ET start' },
    { icon:'📈', big:'$376.37', mid:'Session', sub:'+5.42%' },
    { icon:'💰', big:'$383.48', mid:'Intraday', sub:'+7.41%' },
    { icon:'🏭', big:'$1.20T', mid:'Mcap', sub:'Session print' },
  ],
  ctx1: 'Split show cars from commercial fleet before reading the tape',
  ctx2: 'Session high and close can differ—log the print time with the number',
  quote: 'Cybercab is not a Model Y with extra software. Market cap near $1.20T, P/E 356, 52-week range $297.38–$498.83 sat on the same tape as the event.',
  noteSub: 'Event day is footage, fares, and specs—not slogans. Pair the $4.20 app fare and 165 Wh/mi with fleet counts. Size leverage after the numbers, not before.',
  footer: 'TSLA · Cybercab event',
});

add('robotaxi-app-fare', 'L1', 'TSLA', {
  badge: 'TSLA', title: '로보택시 앱이 사이버캡 2인승·모델와이 4인승을 고르고 요금 4.20달러를 보여 줬습니다',
  heroIcon: '📱', heroBig: '$4.20',
  heroSub: '애플페이로 결제하고 도착 예정은 약 5분, 하차 지점은 바튼 스프링스 1003번지 바베큐 가게입니다. 라이트바 색으로 차를 구분합니다.',
  cards: [
    { icon:'🚕', big:'2 vs 4', mid:'좌석', sub:'사이버캡·모델와이' },
    { icon:'💳', big:'$4.20', mid:'요금', sub:'앱 표시' },
    { icon:'🕔', big:'5분', mid:'도착', sub:'20피트 대기' },
  ],
  quote: '앱이 차종과 요금을 같이 보여 주면 로보택시는 시연이 아니라 상품으로 읽힙니다. 20피트는 약 6미터로, 하차 지점 앞에서 대기하는 거리입니다. 라이트바는 차량 위 조명으로 같은 색 차를 고르게 합니다.',
  noteSub: '유료 승차 화면이 나온 것과 도시 전체 허가는 다릅니다. 요금 4.20달러가 고정 가격인지, 거리·시간 할증인지, 어떤 지오펜스에서만 켜지는지를 앱 화면과 허가 문서로 대조하시기 바랍니다. 다음엔 일 이용 건수와 무인 비중을 보시면 됩니다.',
  footer: '테슬라 · 로보택시 앱',
}, {
  badge: 'TSLA', title: 'Robotaxi app showed Cybercab (2) vs Model Y (4) at a $4.20 fare',
  heroIcon: '📱', heroBig: '$4.20',
  heroSub: 'Apple Pay, ~5 minute ETA, drop-off at 1003 Barton Springs BBQ, 20 ft wait, lightbar color match.',
  cards: [
    { icon:'🚕', big:'2 vs 4', mid:'Seats', sub:'Cybercab · Model Y' },
    { icon:'💳', big:'$4.20', mid:'Fare', sub:'In-app quote' },
    { icon:'🕔', big:'5 min', mid:'ETA', sub:'20 ft wait' },
  ],
  quote: 'Showing vehicle type and fare together turns robotaxi from a demo into a product. Twenty feet is the curb wait. Lightbar color is how riders pick the right car.',
  noteSub: 'A paid-ride screen is not a citywide permit. Check whether $4.20 is a flat quote or a surge, and which geofence it covers. Next metrics are daily trips and unsupervised share.',
  footer: 'TSLA · robotaxi app',
});

add('cybercab-specs-whmi', 'L2', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 전비가 마일당 165와트시로 루시드·모델3보다 약 28~31% 낮다고 소개됐습니다',
  heroIcon: '🔋', heroBig: '165',
  heroSub: '배터리는 48킬로와트시, 주행거리는 약 470킬로미터, 공차중량 1,412킬로그램입니다. 전면 모터 219마력, 무선 충전, 나비문, 도색 없는 폴리우레탄 외피가 같은 스펙입니다.',
  cards: [
    { label:'전비', big:'165', mid:'와트시/마일', sub:'16.5kWh/100mi' },
    { label:'배터리', big:'48', mid:'킬로와트시', sub:'약 470km' },
    { label:'생산', big:'5초', mid:'대당', sub:'목표 사이클' },
  ],
  detailHead: '왜 전비가 중요한가',
  detailLines: ['🔋 마일당 전기가 적으면 플릿 원가가 내려갑니다','⚖️ 루시드 약 23, 모델3 약 24와 비교합니다','🏭 대당 5초는 공장 목표이며 수율과 별개입니다'],
  noteSub: '전비는 한 마일을 가는 데 쓰는 전기입니다. 165와트시/마일은 약 6.1마일/킬로와트시로, 같은 배터리로 더 멀리 가거나 배터리를 더 작게 가져갈 수 있습니다. 5초/대는 라인 속도 목표이므로 실제 출하·품질과 분리해 기록하시기 바랍니다.',
  footer: '테슬라 · 사이버캡 스펙',
}, {
  badge: 'TSLA', title: 'Cybercab efficiency cited at 165 Wh/mi, about 28–31% below Lucid and Model 3',
  heroIcon: '🔋', heroBig: '165',
  heroSub: '48 kWh pack, ~470 km range, 1,412 kg curb, 219 hp front motor, inductive charge, butterfly doors, unpainted PU skin.',
  cards: [
    { label:'Wh/mi', big:'165', mid:'Efficiency', sub:'16.5 kWh/100 mi' },
    { label:'Pack', big:'48', mid:'kWh', sub:'~470 km' },
    { label:'Line', big:'5 sec', mid:'per car', sub:'Target cycle' },
  ],
  detailHead: 'Why Wh/mi matters',
  detailLines: ['🔋 Lower watt-hours per mile cut fleet energy cost','⚖️ Lucid ~23 and Model 3 ~24 kWh/100 mi cited','🏭 5 sec/car is a line target, not yield'],
  noteSub: 'Wh/mi is energy per mile. 165 Wh/mi is about 6.1 mi/kWh, so a smaller pack can still cover the loop. Treat 5 seconds per car as a factory goal until shipments and quality confirm it.',
  footer: 'TSLA · Cybercab specs',
});

add('cybercab-unit-econ', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '💬 마일당 20센트 · 3만 달러 미만',
  title: '사이버캡 운용 원가가 마일당 약 20센트, 구매가는 3만 달러 미만이라고 소개됐습니다',
  heroIcon: '💵', heroBig: '20¢',
  heroSub: '세금 포함 시 30~40센트로 버스 약 1달러/마일보다 낮다는 비교입니다. 한 명이 차 10~20대를 관리하는 셰퍼드 모델이 같이 거론됐습니다.',
  cards: [
    { icon:'🛣', big:'20¢', mid:'마일당', sub:'운용 원가' },
    { icon:'🚌', big:'$1', mid:'버스', sub:'마일당 비교' },
    { icon:'🛒', big:'<$30k', mid:'구매가', sub:'목표 가격' },
  ],
  quote: '유닛 이코노믹스는 한 대가 돈을 버는 구조입니다. 마일당 20센트는 전기·감가·유지가 포함된 운용 원가 주장이고, 3만 달러 미만은 차량 판매가 목표입니다. 셰퍼드는 원격으로 여러 대를 감독하는 사람입니다.',
  noteSub: '원가 주장은 이용률·보험·공차 회송이 빠지면 달라집니다. 버스 1달러와 비교할 때는 보조금·정류장 인프라를 같은 분모에 두시기 바랍니다. 다음 확인할 것은 유료 마일 비중과 실제 대당 판가입니다.',
  footer: '테슬라 · 유닛 이코노믹스',
}, {
  badge: 'TSLA', badgeLine: '💬 20¢/mi · under $30k',
  title: 'Cybercab opex cited near 20 cents a mile and a buy price under $30,000',
  heroIcon: '💵', heroBig: '20¢',
  heroSub: '30–40 cents with tax versus about $1/mi for a bus. A shepherd would oversee 10–20 cars.',
  cards: [
    { icon:'🛣', big:'20¢', mid:'per mile', sub:'Opex claim' },
    { icon:'🚌', big:'$1', mid:'Bus', sub:'per-mile compare' },
    { icon:'🛒', big:'<$30k', mid:'Buy price', sub:'Sticker goal' },
  ],
  quote: 'Unit economics is whether one car earns money. Twenty cents a mile is an opex claim; under $30k is a sticker goal. A shepherd remotely watches a small fleet.',
  noteSub: 'Utilization, insurance, and deadhead miles can move the 20-cent figure. Bus comparisons need the same subsidy and stop-cost denominator. Next checks are paid-mile share and actual transaction prices.',
  footer: 'TSLA · unit economics',
});

add('tesla-austin-jobs', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라가 2028년까지 오스틴 본사·공장 일자리를 3만 명 이상으로 늘린다고 보도됐습니다',
  heroIcon: '👷', heroBig: '30,000+',
  heroSub: '2025년 말 기준 1만 6,506명이었습니다. 기가 텍사스 투자 규모는 약 63억 달러로 거론됐습니다.',
  cards: [
    { icon:'📅', big:'2028', mid:'목표', sub:'본사·제조' },
    { icon:'👥', big:'16,506', mid:'2025년 말', sub:'기존 인원' },
    { icon:'🏭', big:'$6.3B', mid:'기가텍사스', sub:'누적 투자' },
  ],
  quote: '일자리가 1만 6,506명에서 3만 명 이상으로 가면 약 두 배입니다. 본사와 제조를 한 숫자에 묶었으므로, 소프트웨어·생산·서비스 비중은 별도로 봐야 합니다. 63억 달러는 공장 누적 투자 규모입니다.',
  noteSub: '고용 목표는 주·시 인센티브와 연결되는 경우가 많습니다. 실제 채용은 사이버캡 라인 가동·옵티머스·칩 공장 일정에 묶입니다. 분기 10-K·주 고용 통계로 인원과 투자액을 대조하시기 바랍니다.',
  footer: '테슬라 · 오스틴 고용',
}, {
  badge: 'TSLA', title: 'Tesla cited 30,000+ Austin HQ and manufacturing jobs by 2028',
  heroIcon: '👷', heroBig: '30,000+',
  heroSub: 'Headcount was 16,506 at year-end 2025. Giga Texas investment was cited near $6.3 billion.',
  cards: [
    { icon:'📅', big:'2028', mid:'Target', sub:'HQ + mfg' },
    { icon:'👥', big:'16,506', mid:'YE 2025', sub:'Headcount' },
    { icon:'🏭', big:'$6.3B', mid:'Giga Texas', sub:'Capex cited' },
  ],
  quote: 'Going from 16,506 to 30,000+ is roughly a double. HQ and manufacturing are bundled, so split software versus production. $6.3B is the plant investment figure in the same story.',
  noteSub: 'Job targets often sit next to state incentives. Hiring tracks Cybercab lines, Optimus, and chip-fab calendars. Reconcile headcount and capex in 10-Ks and state labor prints.',
  footer: 'TSLA · Austin jobs',
});

add('tesla-texas-420-fleet', 'L5', 'TSLA', {
  badge: 'TSLA', title: '텍사스 로보택시 420대 가운데 무인 인가 차량은 45대로 집계됐습니다',
  heroIcon: '🚕', heroBig: '45/420',
  heroSub: '인가 45대는 운전석에 사람 없이 운행할 수 있는 차량입니다. 무인 유료 승차는 오스틴·댈러스·휴스턴과 마이애미·올랜도·탬파에서 거론됐습니다.',
  before: { label:'인가', big:'45', sub:'무인 허가' },
  after:  { label:'텍사스', big:'420', sub:'로보택시 대수' },
  cards: [
    { icon:'✅', big:'45', mid:'무인 인가', sub:'텍사스' },
    { icon:'🚗', big:'420', mid:'차량', sub:'주 전체' },
    { icon:'🗺', big:'6도시', mid:'무인 승차', sub:'텍사스·플로리다' },
  ],
  quote: '420대는 주에 등록된 로보택시 규모이고, 45대만 감독자 없이 달려도 된다는 허가입니다. 비율은 약 11%입니다. 도시 이름은 운행 가능 권역이지 하루 이용 건수가 아닙니다.',
  noteSub: '인가 대수와 도로에 있는 대수는 다를 수 있습니다. 유료 무인 승차가 어느 도시에서 실제로 열리는지, 지오펜스 면적이 얼마나인지를 주 교통 당국 문서로 확인하시기 바랍니다. 다음엔 주간 무인 마일 비중을 보시면 됩니다.',
  footer: '테슬라 · 텍사스 플릿',
}, {
  badge: 'TSLA', title: 'Of 420 Texas robotaxis, 45 were cited as driverless-authorized',
  heroIcon: '🚕', heroBig: '45/420',
  heroSub: 'Unsupervised paid trips were cited in Austin, Dallas, Houston, Miami, Orlando, and Tampa.',
  before: { label:'Auth', big:'45', sub:'Driverless' },
  after:  { label:'Texas', big:'420', sub:'Robotaxis' },
  cards: [
    { icon:'✅', big:'45', mid:'Unsupervised', sub:'Texas DMV' },
    { icon:'🚗', big:'420', mid:'Vehicles', sub:'State total' },
    { icon:'🗺', big:'6 cities', mid:'Trips', sub:'TX + FL' },
  ],
  quote: '420 is the registered robotaxi count; 45 is the unsupervised permit set—about 11%. City names are service areas, not daily trip counts.',
  noteSub: 'Permits are not the same as cars on the road. Confirm which cities actually run paid unsupervised rides and how large the geofence is. Next metric is weekly unsupervised mile share.',
  footer: 'TSLA · Texas fleet',
});

add('tesla-korea-aug-kaida', 'L1', 'TSLA', {
  badge: 'TSLA', title: '테슬라 한국 8월 판매가 1만 400대로 전년 대비 30.4% 늘었습니다',
  heroIcon: '🇰🇷', heroBig: '10,400',
  heroSub: '올해 누적 7만 6,776대로 작년 3만 4,546대 대비 122% 증가입니다. 수입차 브랜드 1위가 7개월 연속이고, 모델와이는 7~8월 전체 시장 1위로 집계됐습니다.',
  cards: [
    { icon:'📅', big:'10,400', mid:'8월', sub:'전년 +30.4%' },
    { icon:'📊', big:'76,776', mid:'연간 누적', sub:'전년 +122%' },
    { icon:'🥇', big:'7개월', mid:'수입 1위', sub:'모델와이 7·8월' },
  ],
  quote: '월 1만 대 안팎이 여섯 달째 이어졌습니다. 1월 1,966대에서 4월 1만 3,190대까지 오른 뒤 5~8월은 1만 대 초반입니다. 전체 시장 1위는 국산·수입을 합친 등록 기준입니다.',
  noteSub: '한국 판매는 미국 로보택시와 수요 축이 다릅니다. 보조금·환율·모델와이 재고가 월간 숫자를 흔들 수 있으므로, 누적 7만 6,776대와 월 1만 대 안착을 같이 보시면 됩니다. 다음 달은 9월 등록과 평균판매가격입니다.',
  footer: '테슬라 · 한국 8월',
}, {
  badge: 'TSLA', title: 'Tesla Korea August sales were 10,400 units, up 30.4% from a year earlier',
  heroIcon: '🇰🇷', heroBig: '10,400',
  heroSub: 'Year-to-date 76,776 versus 34,546 last year (+122%). Import-brand lead for seven months; Model Y was the overall market leader in July and August.',
  cards: [
    { icon:'📅', big:'10,400', mid:'August', sub:'+30.4% YoY' },
    { icon:'📊', big:'76,776', mid:'YTD', sub:'+122% YoY' },
    { icon:'🥇', big:'7 mo', mid:'Import #1', sub:'Y Jul–Aug' },
  ],
  quote: 'About 10,000 units a month held for six months. January was 1,966 and April peaked at 13,190 before settling in the low 10,000s. Overall market lead includes domestic brands.',
  noteSub: 'Korea demand is a different axis from US robotaxi. Subsidies, FX, and Model Y inventory can swing a month. Track the 76,776 YTD run-rate and September registrations plus ASP.',
  footer: 'TSLA · Korea Aug',
});

add('tesla-australia-sales', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '📈 호주 판매 +160%',
  title: '테슬라 호주 판매가 전년 대비 160% 늘었다는 집계가 나왔습니다',
  heroIcon: '🇦🇺', heroBig: '+160%',
  heroSub: '한국 월 1만 대·중국 8월 도매와 같은 주에 나온 지역 판매 숫자입니다. 절댓수는 공개 자료마다 다를 수 있어 증가율로 먼저 적습니다.',
  cards: [
    { icon:'📈', big:'+160%', mid:'전년 대비', sub:'호주 판매' },
    { icon:'🇰🇷', big:'10,400', mid:'한국 8월', sub:'같은 주' },
    { icon:'🌍', big:'지역', mid:'수요', sub:'규제 축 분리' },
  ],
  quote: '160%는 작은 베이스에서 커 보일 수 있습니다. 호주는 우측통행·충전 규격·보조금이 미국·한국과 다릅니다. 같은 브랜드라도 지역 수요는 별도 표로 두는 편이 안전합니다.',
  noteSub: '증가율만 보면 규모를 놓칩니다. 다음 달은 대당 평균가·재고 일수·현지 경쟁 전기차 점유율을 같이 보시면 됩니다. 로보택시 행사와 판매 숫자를 한 문장으로 묶지 마시기 바랍니다.',
  footer: '테슬라 · 호주 판매',
}, {
  badge: 'TSLA', badgeLine: '📈 Australia +160%',
  title: 'Tesla Australia sales were cited up 160% year over year',
  heroIcon: '🇦🇺', heroBig: '+160%',
  heroSub: 'Same week as Korea’s 10,400 August print. Absolute units vary by source, so the growth rate is the headline.',
  cards: [
    { icon:'📈', big:'+160%', mid:'YoY', sub:'Australia' },
    { icon:'🇰🇷', big:'10,400', mid:'Korea Aug', sub:'Same week' },
    { icon:'🌍', big:'Regional', mid:'Demand', sub:'Separate axis' },
  ],
  quote: 'A 160% jump can sit on a small base. Australia’s charging, incentives, and right-hand drive differ from the US and Korea. Keep regional demand on its own sheet.',
  noteSub: 'Growth rates hide scale. Next prints are ASP, days of inventory, and local EV share. Do not merge robotaxi headlines with country sales in one line.',
  footer: 'TSLA · Australia sales',
});

add('uber-wayve-london', 'L3', 'AMZN', {
  badge: 'UBER', title: '우버와 웨이브가 런던에서 넓은 자율주행 서비스를 시작했고 운전석은 사람이 앉습니다',
  heroIcon: '🇬🇧', heroBig: '런던',
  heroSub: '광역 도시에서 처음으로 열리는 자율주행 승차로 소개됐습니다. 무인 허가로 가는 중간 단계이며, 테슬라 무인 시승과 안전 운전자 유무가 다릅니다.',
  cards: [
    { icon:'🚕', big:'런던', mid:'광역', sub:'첫 확대' },
    { icon:'👤', big:'운전자', mid:'동승', sub:'아직 사람' },
    { icon:'📋', big:'허가', mid:'다음 단계', sub:'무인 승인' },
  ],
  quote: '웨이브는 카메라·인공지능으로 차를 학습시키는 영국 자율주행 회사입니다. 사람이 앉아 있으면 사고 책임과 보험이 기존 택시와 가깝습니다. 무인 허가는 별도 규제 관문입니다.',
  noteSub: '런던은 테슬라 텍사스 플릿과 도시·날씨·규제 축이 다릅니다. 넓다(broad)는 말은 지오펜스가 한 블록이 아니라는 뜻이지, 도시 전역 무인을 뜻하지 않습니다. 다음엔 안전 운전자 제거 일정과 요금을 보시면 됩니다.',
  footer: '우버 · 런던 자율주행',
}, {
  badge: 'UBER', title: 'Uber and Wayve launched a broad London AV service with a human still in the seat',
  heroIcon: '🇬🇧', heroBig: 'London',
  heroSub: 'Framed as the first wide autonomous ride offering in the city—still a step toward driverless approval.',
  cards: [
    { icon:'🚕', big:'London', mid:'Broad', sub:'First scale-up' },
    { icon:'👤', big:'Human', mid:'In seat', sub:'Safety driver' },
    { icon:'📋', big:'Permit', mid:'Next gate', sub:'Driverless' },
  ],
  quote: 'Wayve trains driving models from cameras. A human in the seat keeps insurance closer to a taxi. Driverless approval is a separate regulator gate.',
  noteSub: 'London is not Texas. Broad means the geofence is larger than a demo block—not citywide unmanned service. Watch the calendar for removing the safety driver and the fare.',
  footer: 'UBER · London AV',
});

add('uber-taxi-slow-robotaxi', 'L6', 'AMZN', {
  badge: 'UBER', breaking: '로보택시 속도 조절',
  title: '우버가 택시기사와 함께 로보택시 확산을 늦추려 한다는 보도가 나왔습니다',
  heroBig: 'SLOW',
  heroSub: '같은 주 런던 자율주행 확대·테슬라 사이버캡 행사와 결이 다른 정치·노동 축입니다. 플랫폼이 기사 공급과 무인 플릿을 동시에 관리하는 긴장입니다.',
  grid: [
    { icon:'🚕', big:'기사', mid:'택시', sub:'동맹' },
    { icon:'🐢', big:'지연', mid:'로보택시', sub:'규제·로비' },
    { icon:'🇬🇧', big:'런던', mid:'운전자 동승', sub:'같은 주' },
    { icon:'🚗', big:'사이버캡', mid:'무인', sub:'경쟁 축' },
  ],
  ctx1: '로비와 서비스 출시는 같은 회사가 반대 방향으로 움직일 수 있습니다',
  ctx2: '도시별 허가 속도가 플랫폼 매출보다 먼저 흔들릴 수 있습니다',
  quote: '기사 동맹은 일자리·면허 가치를 지키는 쪽이고, 로보택시는 마일당 원가를 낮추는 쪽입니다. 한 플랫폼이 두 이해관계를 동시에 안으면 도시마다 메시지가 갈라질 수 있습니다.',
  noteSub: '보도는 의도이지 법 통과가 아닙니다. 어떤 도시 의회·교통국이 파일럿을 늦추는지를 확인하시기 바랍니다. 테슬라 전용 플릿과 우버 네트워크는 수익 모델이 다르므로 주가를 한 줄로 묶지 마시기 바랍니다.',
  footer: '우버 · 로보택시 속도',
}, {
  badge: 'UBER', breaking: 'SLOWING ROBOTAXI',
  title: 'Uber was reported to be working with taxi drivers to slow robotaxi rollout',
  heroBig: 'SLOW',
  heroSub: 'Same week as the London AV launch and Tesla’s Cybercab event—a labor and politics axis, not a product demo.',
  grid: [
    { icon:'🚕', big:'Drivers', mid:'Taxi', sub:'Alliance' },
    { icon:'🐢', big:'Delay', mid:'Robotaxi', sub:'Lobby / rules' },
    { icon:'🇬🇧', big:'London', mid:'Human in seat', sub:'Same week' },
    { icon:'🚗', big:'Cybercab', mid:'Unmanned', sub:'Rival axis' },
  ],
  ctx1: 'Lobbying and product launches can point opposite ways inside one firm',
  ctx2: 'City permit speed can move before platform GMV does',
  quote: 'A driver alliance protects jobs and medallions; robotaxis cut per-mile cost. One platform holding both interests can split its message city by city.',
  noteSub: 'The story is intent, not a statute. Track which councils actually slow pilots. Tesla’s dedicated fleet and Uber’s network are different P&Ls—do not price them as one line.',
  footer: 'UBER · robotaxi pace',
});

add('nvda-hugging-face-8k', 'L1', 'NVDA', {
  badge: 'NVDA', title: '엔비디아가 허깅페이스를 약 129억 달러에 인수하는 8-K를 제출했습니다',
  heroIcon: '🤝', heroBig: '$12.93B',
  heroSub: '주주에게 119억 달러, 잔류 보상 최대 10억 달러입니다. 거래 마감은 2027년 상반기 목표이며 규제 승인이 남았습니다.',
  cards: [
    { icon:'📄', big:'8-K', mid:'9월 2일', sub:'공시' },
    { icon:'💵', big:'$11.9B', mid:'주주', sub:'현금·주식' },
    { icon:'🧑‍💻', big:'$1.0B', mid:'잔류', sub:'보상 한도' },
  ],
  quote: '허깅페이스는 오픈소스 인공지능 모델과 개발자 도구를 모아 두는 플랫폼입니다. 엔비디아가 칩뿐 아니라 모델 유통 창구를 사면, 개발자가 어느 클라우드에서 추론하는지가 바뀌는 싸움입니다. 129억 달러는 두 항목을 더한 대략입니다.',
  noteSub: '공시 금액과 블로그 헤드라인은 같을 수 있으나 잔류 보상은 지급 조건이 있습니다. 반독점·국가 안보 심사가 길어지면 2027년 상반기 마감이 밀릴 수 있습니다. 다음엔 개발자 이탈 여부와 클라우드 파트너 반응이 중요합니다.',
  footer: '엔비디아 · 허깅페이스',
}, {
  badge: 'NVDA', title: 'Nvidia filed an 8-K to buy Hugging Face for about $12.93 billion',
  heroIcon: '🤝', heroBig: '$12.93B',
  heroSub: '$11.9 billion to stockholders plus up to $1.0 billion retention. Close is targeted for the first half of 2027, subject to regulators.',
  cards: [
    { icon:'📄', big:'8-K', mid:'Sept 2', sub:'Filing' },
    { icon:'💵', big:'$11.9B', mid:'Stockholders', sub:'Cash/stock' },
    { icon:'🧑‍💻', big:'$1.0B', mid:'Retention', sub:'Up to' },
  ],
  quote: 'Hugging Face hosts open models and developer tools. Buying the distribution layer—not just chips—changes where inference runs. $12.93B adds the two buckets.',
  noteSub: 'Retention is conditional. Antitrust or national-security review can slip the H1 2027 close. Watch developer churn and cloud-partner reaction next.',
  footer: 'NVDA · Hugging Face',
});

add('spacex-price-2t', 'L1', 'SPCX', {
  badge: 'SPCX', title: '스페이스X 비상장 호가가 약 150달러로 7.5% 올랐고 시가총액 2조 달러가 거론됐습니다',
  heroIcon: '🚀', heroBig: '$150',
  heroSub: '비상장 호가는 거래소 종가가 아닙니다. 2조 달러는 소셜·중개 호가를 시가총액으로 환산한 서사입니다.',
  cards: [
    { icon:'💵', big:'~$150', mid:'호가', sub:'+7.5~7.6%' },
    { icon:'🏷', big:'$2T', mid:'시총 서사', sub:'비상장' },
    { icon:'⚡', big:'1.4GW', mid:'연산 전력', sub:'같은 주' },
  ],
  quote: '비상장 주식은 체결 건수가 적으면 한 호가가 전체를 대표하지 못합니다. 150달러와 2조 달러는 같은 날 묶여 나왔지만, 발행 주식 수·우선주 조건을 공시로 확인할 수 없습니다. 전력 1.4기가와트는 별도 실행 지표입니다.',
  noteSub: '호가 7.5%는 유동성이 얇은 장외 움직임일 수 있습니다. 장기 투자자는 발사 횟수·스타링크 가입·가동 기가와트를 가격보다 먼저 보시면 됩니다. 다음 라운드 공식 밸류에이션이 나올 때까지 시총 2조 달러는 서사로만 두시기 바랍니다.',
  footer: '스페이스X · 호가',
}, {
  badge: 'SPCX', title: 'SpaceX unofficial prints near $150 (+7.5%) with a $2T market-cap narrative',
  heroIcon: '🚀', heroBig: '$150',
  heroSub: 'These are not exchange closes. Two trillion dollars is a social/brokerage translation of the print.',
  cards: [
    { icon:'💵', big:'~$150', mid:'Print', sub:'+7.5–7.6%' },
    { icon:'🏷', big:'$2T', mid:'Mcap story', sub:'Private' },
    { icon:'⚡', big:'1.4 GW', mid:'Compute', sub:'Same week' },
  ],
  quote: 'Thin private prints can move without representing the whole cap table. $150 and $2T arrived together, but share count and prefs are not in a public 10-K. 1.4 GW is a separate execution metric.',
  noteSub: 'A 7.5% print can be illiquid. Prefer launch cadence, Starlink subs, and powered gigawatts over the tape. Treat $2T as narrative until a priced round confirms it.',
  footer: 'SPCX · private print',
});

add('spacex-ai-compute-gw', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스페이스X 인공지능 전력이 지금 1.4기가와트이고 연말 2기가와트 이상, 2027년은 5보다 10에 가깝다고 했습니다',
  heroIcon: '⚡', heroBig: '1.4 GW',
  heroSub: '1년 전 400메가와트에서 늘어난 숫자입니다. 증권사 목표가는 250에서 280달러, 248달러가 함께 거론됐고 장중 약 +6%였습니다.',
  cards: [
    { label:'지금', big:'1.4GW', mid:'가동', sub:'1년 전 400MW' },
    { label:'연말', big:'>2GW', mid:'목표', sub:'2026' },
    { label:'2027', big:'~10', mid:'GW 쪽', sub:'5보다 가깝다' },
  ],
  detailHead: '전력이 칩만큼 중요한 이유',
  detailLines: ['⚡ 기가와트는 데이터센터가 실제로 쓰는 전원입니다','📈 목표가는 비상장 호가와 축이 다릅니다','🔌 허가·송전이 칩 납기만큼 일정을 밉니다'],
  noteSub: '1.4기가와트는 연결됐다는 주장이지 이용률 100%가 아닙니다. 2027년 10기가와트는 계획 상단입니다. 목표주가 280달러는 리서치 의견이며 호가 150달러와 직접 비교하려면 주식 수를 맞춰야 합니다.',
  footer: '스페이스X · 연산 전력',
}, {
  badge: 'SPCX', title: 'SpaceX AI power is 1.4 GW now, above 2 GW by year-end, and closer to 10 than 5 in 2027',
  heroIcon: '⚡', heroBig: '1.4 GW',
  heroSub: 'Up from 400 MW a year ago. Sell-side targets $250→$280 and $248 were cited; the print was about +6% intraday.',
  cards: [
    { label:'Now', big:'1.4 GW', mid:'Powered', sub:'vs 400 MW' },
    { label:'YE', big:'>2 GW', mid:'Goal', sub:'2026' },
    { label:'2027', big:'~10', mid:'GW', sub:'not 5' },
  ],
  detailHead: 'Why watts gate chips',
  detailLines: ['⚡ Gigawatts are electrons at the campus, not nameplate GPUs','📈 Price targets sit on a different axis than thin prints','🔌 Permits and transmission slip timelines like lead times'],
  noteSub: '1.4 GW is a powered claim, not 100% utilization. 10 GW in 2027 is the high end of the plan. A $280 target and a $150 print need the same share count before you compare them.',
  footer: 'SPCX · AI compute',
});

add('spacex-bastrop-830', 'L3', 'SPCX', {
  badge: 'SPCX', title: '스페이스X가 스타마인드 북동쪽 에프엠969·독 브라이슨 로드에 830에이커를 더 확보했습니다',
  heroIcon: '🗺', heroBig: '+830',
  heroSub: '니켈 초합금 터빈 블레이드·베인 주조 공장으로 거론됐습니다. 에이커는 약 4,047제곱미터로, 830에이커는 대형 산업 부지입니다.',
  cards: [
    { icon:'📐', big:'830', mid:'에이커', sub:'추가 부지' },
    { icon:'🔥', big:'주조', mid:'터빈', sub:'블레이드·베인' },
    { icon:'🛣', big:'FM969', mid:'교차', sub:'독 브라이슨' },
  ],
  quote: '터빈 블레이드와 베인은 엔진·발전기의 고온 부품입니다. 니켈 초합금은 고온에서 버티는 금속입니다. 스타마인드 옆 부지면 발사·제조·소재가 한 권역으로 붙는 그림입니다.',
  noteSub: '부지 확보는 착공·환경 허가·전력 인입이 아닙니다. 주조 공장이 실제로 돌아가는 시점과 고용 규모를 카운티 문서에서 확인하시기 바랍니다. 사이버캡 오스틴 캠퍼스와는 다른 공급망 축입니다.',
  footer: '스페이스X · 배스트롭',
}, {
  badge: 'SPCX', title: 'SpaceX added 830 acres northeast of Starmind across FM 969 and Doc Bryson Lane',
  heroIcon: '🗺', heroBig: '+830',
  heroSub: 'The site was cited for a nickel-superalloy turbine blade and vane foundry.',
  cards: [
    { icon:'📐', big:'830', mid:'Acres', sub:'Add-on land' },
    { icon:'🔥', big:'Foundry', mid:'Turbine', sub:'Blades · vanes' },
    { icon:'🛣', big:'FM 969', mid:'Crossing', sub:'Doc Bryson' },
  ],
  quote: 'Blades and vanes are hot-section engine parts. Nickel superalloys survive those temperatures. Land next to Starmind ties launch, manufacturing, and materials into one corridor.',
  noteSub: 'Acreage is not a poured foundation or a power tap. Confirm start of construction and hiring in county filings. This is a different supply-chain axis from the Austin Cybercab campus.',
  footer: 'SPCX · Bastrop',
});

add('spacex-southaven-dc', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🏭 60만 평방피트 · 51에이커',
  title: '스페이스엑스에이아이 데이터센터가 사우스헤이븐 60만 평방피트·51에이커로 추진됩니다',
  heroIcon: '🏢', heroBig: '600k',
  heroSub: '툴레인 로드 토지 교환이며 멤피스·북미시시피 다섯 번째 거점입니다. 스탠턴 로드 발전소 옆이라 전원이 입지 이유입니다.',
  cards: [
    { icon:'📦', big:'600k', mid:'평방피트', sub:'데이터센터' },
    { icon:'📐', big:'51', mid:'에이커', sub:'토지 교환' },
    { icon:'⚡', big:'발전소', mid:'옆', sub:'스탠턴 로드' },
  ],
  quote: '60만 평방피트는 대형 물류센터 한 동 규모입니다. 토지 교환은 시가 땅을 바꾸고 세수·고용을 받는 구조입니다. 다섯 번째 거점은 이미 클러스터가 있다는 뜻입니다.',
  noteSub: '평면도는 가동 기가와트가 아닙니다. 인허가·송전·용수와 착공 일정을 시 의회 안건에서 확인하시기 바랍니다. 스타링크 멤피스 가입 2,000건과 같은 도시권 수요로 묶여 읽힐 수 있습니다.',
  footer: '스페이스X · 사우스헤이븐',
}, {
  badge: 'SPCX', badgeLine: '🏭 600k sq ft · 51 acres',
  title: 'A SpaceXAI data center of 600,000 sq ft on 51 acres is moving in Southaven',
  heroIcon: '🏢', heroBig: '600k',
  heroSub: 'Tulane Road land-swap, fifth Memphis/north Mississippi site, next to the Stanton Road power plant.',
  cards: [
    { icon:'📦', big:'600k', mid:'sq ft', sub:'Data hall' },
    { icon:'📐', big:'51', mid:'acres', sub:'Land swap' },
    { icon:'⚡', big:'Plant', mid:'Adjacent', sub:'Stanton Rd' },
  ],
  quote: '600,000 square feet is a large warehouse-scale hall. A land swap trades city parcels for tax base and jobs. A fifth site means the cluster already exists.',
  noteSub: 'Floor area is not powered gigawatts. Watch permits, transmission, water, and groundbreaking in city minutes. It can sit next to the ~2,000 Memphis Starlink signups as local demand.',
  footer: 'SPCX · Southaven',
});

add('starlink-memphis-signups', 'L5', 'SPCX', {
  badge: 'SPCX', title: '멤피스 스타링크 가입이 6월 말 이후 약 2,000건이고 주거 요금은 50% 할인입니다',
  heroIcon: '📡', heroBig: '2,000',
  heroSub: '신규는 단말기 선납이 없습니다. 데이터센터 입지와 같은 도시권에서 소비자 통신 수요가 같이 커지는 그림입니다.',
  before: { label:'6월 말', big:'시작', sub:'가입 집계' },
  after:  { label:'이후', big:'~2,000', sub:'가입' },
  cards: [
    { icon:'📡', big:'2,000', mid:'가입', sub:'6월 말~' },
    { icon:'🏘', big:'50%', mid:'주거 할인', sub:'요금' },
    { icon:'📦', big:'선납 없음', mid:'신규 킷', sub:'단말기' },
  ],
  quote: '스타링크는 위성 인터넷입니다. 2,000건은 도시 전체 가구 대비 작은 숫자이지만, 할인·무선납이 겹치면 가입 속도가 빨라질 수 있습니다. 기업 회선과 주거 요금을 섞어 읽지 마시기 바랍니다.',
  noteSub: '가입 건수는 매출이 아닙니다. 해지율·평균 매출·용량 포화는 별도입니다. 사우스헤이븐 데이터센터와 같은 주에 나와도, 하나는 연산 임차, 하나는 가정 인터넷입니다.',
  footer: '스페이스X · 멤피스 스타링크',
}, {
  badge: 'SPCX', title: 'Memphis Starlink signups reached about 2,000 since late June, with a 50% residential discount',
  heroIcon: '📡', heroBig: '2,000',
  heroSub: 'New customers skip the upfront kit. Consumer broadband demand is rising in the same metro as the data-center push.',
  before: { label:'Late June', big:'Start', sub:'Signup clock' },
  after:  { label:'Since', big:'~2,000', sub:'Signups' },
  cards: [
    { icon:'📡', big:'2,000', mid:'Signups', sub:'Since late June' },
    { icon:'🏘', big:'50%', mid:'Residential', sub:'Discount' },
    { icon:'📦', big:'No kit fee', mid:'New', sub:'Hardware' },
  ],
  quote: 'Starlink is satellite internet. Two thousand homes is small versus the metro, but half-off plus no kit fee can speed the ramp. Do not mix enterprise circuits with residential ARPU.',
  noteSub: 'Signups are not revenue. Churn, ARPU, and capacity sit on another sheet. Southaven compute leases and home internet can share a metro without sharing a P&L.',
  footer: 'SPCX · Memphis Starlink',
});

add('anthropic-ackman-growth', 'L4', 'AI', {
  badge: 'AI', badgeLine: '💬 성장 속도 · 예측시장 94%',
  title: '앤스로픽이 가장 빨리 크고 있으며 연말 기업가치가 오픈에이아이를 넘을 확률이 94%로 거론됐습니다',
  heroIcon: '📈', heroBig: '94%',
  heroSub: '이비티다 흑자 소문과 함께 나온 성장 서사입니다. 94%는 예측시장 계약이지 공시가 아닙니다.',
  cards: [
    { icon:'🚀', big:'성장', mid:'속도', sub:'발언' },
    { icon:'💹', big:'흑자', mid:'소문', sub:'이비티다' },
    { icon:'📊', big:'94%', mid:'예측', sub:'12월 31일' },
  ],
  quote: '예측시장은 돈으로 투표한 확률입니다. 12월 31일까지 앤스로픽 가치가 오픈에이아이보다 크다는 계약이 94%에 거래됐습니다. 이비티다는 이자·세금·감가 전 이익으로, 소문은 확인 전입니다.',
  noteSub: '확률 94%는 유동성이 얇으면 왜곡됩니다. 계약 정의(지분 가치인지 매출인지)를 확인하시기 바랍니다. 오픈에이아이 지피티6 출시와 같은 주면 상대 가치가 하루 만에 흔들릴 수 있습니다.',
  footer: '앤스로픽 · 성장 서사',
}, {
  badge: 'AI', badgeLine: '💬 fastest growth · 94% contract',
  title: 'Anthropic was called the fastest grower, with a 94% contract it outvalues OpenAI by year-end',
  heroIcon: '📈', heroBig: '94%',
  heroSub: 'The growth story arrived with rumored positive EBITDA. Ninety-four percent is a prediction-market quote, not a filing.',
  cards: [
    { icon:'🚀', big:'Growth', mid:'Pace', sub:'Comment' },
    { icon:'💹', big:'EBITDA', mid:'Rumor', sub:'Positive' },
    { icon:'📊', big:'94%', mid:'Contract', sub:'Dec 31' },
  ],
  quote: 'Prediction markets are probabilities people buy. A Dec 31 contract that Anthropic’s valuation exceeds OpenAI traded at 94%. EBITDA is earnings before interest, tax, and depreciation—the profit rumor is unconfirmed.',
  noteSub: 'A 94% quote can distort in thin books. Read the contract definition. GPT-6 news the same week can reprice relative value in a day.',
  footer: 'Anthropic · growth',
});

add('openai-gpt6-astra', 'L6', 'AI', {
  badge: 'AI', breaking: '지피티6 · 아스트라',
  title: '오픈에이아이가 지피티6 아스트라를 배포하며 사이버 가드레일을 같이 걸었습니다',
  heroBig: 'GPT-6',
  heroSub: '앤스로픽을 추월했다는 보도와 인공일반지능 수준 주장이 같은 주에 겹쳤습니다. 아스트라는 새 모델 계열 이름입니다.',
  grid: [
    { icon:'🧠', big:'GPT-6', mid:'아스트라', sub:'롤아웃' },
    { icon:'🛡', big:'가드', mid:'사이버', sub:'안전 장치' },
    { icon:'📰', big:'추월', mid:'보도', sub:'앤스로픽' },
    { icon:'🎯', big:'AGI', mid:'주장', sub:'확인 전' },
  ],
  ctx1: '모델 이름과 실제 벤치마크·매출은 다른 축입니다',
  ctx2: '가드레일은 기업 고객 보안 요구를 맞추기 위한 장치에 가깝습니다',
  quote: '인공일반지능은 사람 수준으로 여러 일을 하는 인공지능을 뜻하는 마케팅·연구 용어입니다. 가드레일은 모델이 해킹·악용 지시를 거부하게 막는 필터입니다. 추월 보도는 어떤 지표(사용자·매출·벤치)인지 밝혀야 합니다.',
  noteSub: '출시 헤드라인은 잔류율·유료 전환·컴퓨팅 원가가 나오기 전입니다. 앤스로픽 94% 계약과 같은 주에 나오면 상대 서사가 하루 만에 뒤집힐 수 있습니다. 다음엔 기업 계약과 안전 사고 여부를 보시면 됩니다.',
  footer: '오픈에이아이 · 지피티6',
}, {
  badge: 'AI', breaking: 'GPT-6 ASTRA',
  title: 'OpenAI began rolling out GPT-6 Astra with cyber guardrails',
  heroBig: 'GPT-6',
  heroSub: 'Coverage that it overtook Anthropic and an AGI-level claim landed in the same week. Astra is the new model family name.',
  grid: [
    { icon:'🧠', big:'GPT-6', mid:'Astra', sub:'Rollout' },
    { icon:'🛡', big:'Guards', mid:'Cyber', sub:'Safety' },
    { icon:'📰', big:'Overtake', mid:'Press', sub:'vs Anthropic' },
    { icon:'🎯', big:'AGI', mid:'Claim', sub:'Unverified' },
  ],
  ctx1: 'A model name is not a benchmark or a revenue line',
  ctx2: 'Guardrails are closer to enterprise security filters than to AGI',
  quote: 'AGI is a research and marketing phrase for human-level breadth. Guardrails block abuse and hacking prompts. An “overtake” story needs the metric—users, revenue, or benches.',
  noteSub: 'Launch headlines arrive before retention, paid conversion, and compute cost. The 94% Anthropic contract can reprice the same week. Next checks are enterprise deals and safety incidents.',
  footer: 'OpenAI · GPT-6',
});

add('berkshire-google-abel', 'L1', 'GOOGL', {
  badge: 'GOOGL', title: '버크셔가 약 15개월 전 구글을 180~190달러에 사기 시작했다는 설명이 나왔습니다',
  heroIcon: '🏦', heroBig: '$180-190',
  heroSub: '100억 달러 규모 오퍼링이 6.5% 할인으로 거론됐습니다. 에이블은 버크셔 경영을 잇는 인물입니다.',
  cards: [
    { icon:'📅', big:'15개월', mid:'전', sub:'매수 시작' },
    { icon:'💵', big:'$180-190', mid:'매수가', sub:'구글' },
    { icon:'📦', big:'$10B', mid:'오퍼링', sub:'6.5% 할인' },
  ],
  quote: '15개월 전 180~190달러는 지금 주가와 비교해야 의미가 있습니다. 100억 달러 오퍼링은 대량 매도를 할인해서 기관에 넘기는 방식입니다. 6.5% 할인은 수요가 받쳐 줘야 소화됩니다.',
  noteSub: '인터뷰는 매수 시점을 회고한 것이지 오늘 신규 매수 공시가 아닙니다. 오퍼링 할인과 장기 보유 논리를 한 문장으로 섞지 마시기 바랍니다. 다음엔 13F 지분 변화와 구글 클라우드·광고 실적을 보시면 됩니다.',
  footer: '버크셔 · 구글',
}, {
  badge: 'GOOGL', title: 'Berkshire started buying Google about 15 months ago near $180–$190, Abel said',
  heroIcon: '🏦', heroBig: '$180-190',
  heroSub: 'A $10 billion offering at a 6.5% discount was also cited. Abel is the executive carrying Berkshire forward.',
  cards: [
    { icon:'📅', big:'15 mo', mid:'Ago', sub:'Start of buys' },
    { icon:'💵', big:'$180-190', mid:'Entry', sub:'Google' },
    { icon:'📦', big:'$10B', mid:'Offering', sub:'6.5% discount' },
  ],
  quote: 'An $180–$190 entry only matters versus today’s tape. A $10B offering is a block sold at a discount to institutions. 6.5% needs demand to clear.',
  noteSub: 'The interview is a recap of past buys, not a fresh 13F. Do not mix offering discounts with the long-hold thesis in one line. Next checks are 13F changes and Google Cloud versus ads.',
  footer: 'BRK · GOOGL',
});

add('sp500-vs-10yr-yield', 'L2', 'RATES', {
  badge: 'RATES', title: '에스앤피500에서 배당수익률이 국채 10년물을 넘는 종목이 5% 미만입니다',
  heroIcon: '📉', heroBig: '<5%',
  heroSub: '2007년 5월 이후 가장 적은 비중입니다. 8월 31일 기준 10년물은 4.41%였고, 과거 평균은 약 18%입니다.',
  cards: [
    { label:'지금', big:'<5%', mid:'종목 비중', sub:'배당>10년' },
    { label:'평균', big:'~18%', mid:'역사', sub:'비교' },
    { label:'10년', big:'4.41%', mid:'8월 31일', sub:'국채' },
  ],
  detailHead: '왜 비중이 줄었는가',
  detailLines: ['📉 금리가 높으면 배당이 매력이 줄어듭니다','📊 성장주 비중이 커지면 배당 종목이 희귀해집니다','⚠️ 2007년은 금융위기 직전 구간입니다'],
  noteSub: '배당이 국채보다 높은 종목이 드물면, 주식은 배당보다 성장·바이백으로 설명됩니다. 4.41%는 8월 31일 스냅샷이며 9월 초 금리는 다를 수 있습니다. 고용 지표가 금리를 다시 올리면 이 비중은 더 줄어들 수 있습니다.',
  footer: '매크로 · 배당 vs 국채',
}, {
  badge: 'RATES', title: 'Fewer than 5% of S&P 500 names yield more than the 10-year Treasury',
  heroIcon: '📉', heroBig: '<5%',
  heroSub: 'The thinnest share since May 2007. The 10-year was 4.41% as of August 31; the long-run mean is about 18%.',
  cards: [
    { label:'Now', big:'<5%', mid:'Share', sub:'yield > 10yr' },
    { label:'Mean', big:'~18%', mid:'History', sub:'Compare' },
    { label:'10yr', big:'4.41%', mid:'Aug 31', sub:'Treasury' },
  ],
  detailHead: 'Why the share shrank',
  detailLines: ['📉 Higher yields make dividends less competitive','📊 A growth-heavy index has fewer coupon stocks','⚠️ May 2007 sat just before the financial crisis'],
  noteSub: 'When few stocks yield more than Treasuries, equities are a growth and buyback story. 4.41% is an August 31 snapshot. A hot payrolls print can lift yields and shrink the share further.',
  footer: 'Macro · dividend vs 10yr',
});

add('louisiana-methane-rfp', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '⚠️ 미확인 · 약 100억 달러',
  title: '루이지애나 스타베이스에 약 100억 달러 메탄 설비 제안이 36개월 일정으로 돌았으나 확인되지 않았습니다',
  heroIcon: '⚠️', heroBig: '미확인',
  heroSub: '머스크나 스페이스X가 공식 확인한 입찰이 아닙니다. 메탄은 로켓 연료로 쓰이는 천연가스 성분입니다.',
  cards: [
    { icon:'💵', big:'~$10B', mid:'규모', sub:'루머' },
    { icon:'📅', big:'36개월', mid:'일정', sub:'제안' },
    { icon:'🏭', big:'스타베이스', mid:'루이지애나', sub:'입지' },
  ],
  quote: '제안요청서는 공급사에 가격을 물어보는 문서입니다. 100억 달러·36개월은 떠도는 숫자이며 계약이 아닙니다. 공식 확인 전에는 부지 허가·환경 영향과 따로 두시기 바랍니다.',
  noteSub: '미확인 숫자는 주가·비상장 호가에 먼저 반영될 수 있습니다. 주 정부 공고나 회사 성명이 나오기 전까지 투자 근거의 앞에 두지 마시기 바랍니다. 확인되면 연료 자급과 발사 케이던스 이야기로 옮기시면 됩니다.',
  footer: '스페이스X · 메탄 루머',
}, {
  badge: 'SPCX', badgeLine: '⚠️ UNCONFIRMED · ~$10B',
  title: 'A ~$10B methane plant RFP for Starbase Louisiana on a 36-month clock circulated unverified',
  heroIcon: '⚠️', heroBig: 'Unverified',
  heroSub: 'Neither Musk nor SpaceX confirmed the bid. Methane is the natural-gas fuel used in the rockets.',
  cards: [
    { icon:'💵', big:'~$10B', mid:'Size', sub:'Rumor' },
    { icon:'📅', big:'36 mo', mid:'Clock', sub:'Proposal' },
    { icon:'🏭', big:'Starbase', mid:'Louisiana', sub:'Site' },
  ],
  quote: 'An RFP asks vendors for a price. Ten billion dollars and 36 months are circulated figures, not a signed contract. Keep permits and environmental review on a separate page until confirmed.',
  noteSub: 'Unverified numbers can print in private markets first. Do not lead an investment case with them until a state notice or company statement exists. If confirmed, it becomes a fuel-supply and cadence story.',
  footer: 'SPCX · methane rumor',
});

add('lunar-ai-100tw', 'L6', 'SPCX', {
  badge: 'SPCX', breaking: '달 · 100테라와트',
  title: '머스크가 달 인공지능 위성과 질량 가속기, 탈출 속도 초속 약 2,400미터를 말했습니다',
  heroBig: '100 TW',
  heroSub: '테라와트는 기가와트의 1,000배입니다. 질량 가속기는 전자기력으로 화물을 쏘아 올리는 레일입니다.',
  grid: [
    { icon:'🌙', big:'달', mid:'위성', sub:'인공지능' },
    { icon:'⚡', big:'100TW', mid:'규모', sub:'비전' },
    { icon:'🧲', big:'가속기', mid:'질량', sub:'레일' },
    { icon:'🚀', big:'2400', mid:'m/s', sub:'탈출 속도' },
  ],
  ctx1: '비전 발언은 분기 가동 기가와트와 시간 축이 다릅니다',
  ctx2: '달 탈출 속도는 지구(약 11.2km/s)보다 낮아 질량 가속기 아이디어가 나옵니다',
  quote: '초속 2,400미터는 달에서 중력을 벗어나기 쉬운 숫자로 자주 인용됩니다. 100테라와트는 지구 전력망 전체를 넘는 규모라 일정·허가·재료가 없습니다. 지상 1.4기가와트와 혼동하지 마시기 바랍니다.',
  noteSub: '장기 비전은 스타십 케이던스가 버텨야 의미가 있습니다. 오늘 추적할 것은 지상 전력과 발사 횟수입니다. 달 데이터센터는 연구·수사 단계로 분류하시기 바랍니다.',
  footer: '스페이스X · 달 비전',
}, {
  badge: 'SPCX', breaking: 'LUNAR AI · 100 TW',
  title: 'Musk talked lunar AI satellites, a mass driver, and escape near 2,400 meters per second',
  heroBig: '100 TW',
  heroSub: 'A terawatt is a thousand gigawatts. A mass driver is an electromagnetic rail that throws cargo off the Moon.',
  grid: [
    { icon:'🌙', big:'Moon', mid:'Sats', sub:'AI' },
    { icon:'⚡', big:'100 TW', mid:'Scale', sub:'Vision' },
    { icon:'🧲', big:'Driver', mid:'Mass', sub:'Rail' },
    { icon:'🚀', big:'2400', mid:'m/s', sub:'Escape' },
  ],
  ctx1: 'Vision talk sits on a different clock from quarterly powered GW',
  ctx2: 'Lunar escape is far below Earth’s 11.2 km/s, which is why a mass driver comes up',
  quote: '2,400 m/s is a commonly cited lunar escape figure. 100 TW is larger than Earth’s grids and has no permit or materials plan. Do not mix it with 1.4 GW on the ground.',
  noteSub: 'The vision only matters if Starship cadence holds. Track ground power and launch rate now. File lunar data centers as research rhetoric.',
  footer: 'SPCX · lunar vision',
});

add('starship-ship42-cryo', 'L3', 'SPCX', {
  badge: 'SPCX', title: '스타십 42호기가 극저온 시험을 시작했고 41호기와 비교되고 있습니다',
  heroIcon: '🧪', heroBig: 'S42',
  heroSub: '극저온 시험은 액체 산소·메탄을 넣고 탱크가 수축·압력에 견디는지 보는 단계입니다. 비행 허가 전의 하드웨어 관문입니다.',
  cards: [
    { icon:'🧪', big:'극저온', mid:'시험', sub:'42호기' },
    { icon:'🚀', big:'41호기', mid:'비교', sub:'직전 기체' },
    { icon:'📅', big:'다음', mid:'정적 발사', sub:'비행 전' },
  ],
  quote: '극저온은 영하 180도 근처에서 금속이 줄어드는 환경입니다. 균열·밸브 누설이 여기서 걸러집니다. 41호기와 비교는 설계 변경이 시험 항목을 바꿨는지를 보려는 것입니다.',
  noteSub: '시험 시작은 발사일이 아닙니다. 정적 화염(엔진을 붙잡고 쏘는 시험)과 연방항공 허가가 남아 있습니다. 전력·스타링크 이야기와 발사 케이던스를 한 표에 두시되, 날짜는 시험 로그로만 적으시기 바랍니다.',
  footer: '스페이스X · 42호기',
}, {
  badge: 'SPCX', title: 'Starship Ship 42 entered cryogenic testing versus Ship 41',
  heroIcon: '🧪', heroBig: 'S42',
  heroSub: 'Cryo testing fills tanks with liquid oxygen and methane to watch contraction and pressure. It is a hardware gate before flight.',
  cards: [
    { icon:'🧪', big:'Cryo', mid:'Test', sub:'Ship 42' },
    { icon:'🚀', big:'Ship 41', mid:'Compare', sub:'Prior article' },
    { icon:'📅', big:'Next', mid:'Static fire', sub:'Pre-flight' },
  ],
  quote: 'Cryogenic temps near −180°C shrink metal. Cracks and valve leaks show up here. The Ship 41 comparison asks whether design changes altered the test card.',
  noteSub: 'Starting cryo is not a launch date. Static fire and aviation approval remain. Keep power and Starlink on the same sheet as cadence, but log dates only from the test stand.',
  footer: 'SPCX · Ship 42',
});

};
