// 2026-09-09 SVG topic data — consumed by gen-reports-20260909.js
// Layout mix: L1×4 L2×3 L3×4 L4×2 L5×2 L6×2 ROWS×1 (individuals ≤40% one layout)
// KO cards: mid+sub = full beginner context (never 1-word dumps)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.09 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'유럽 사이버캡은 「곧」이라 했고, 댈러스 허브·텍사스 플릿·언박스트 10초가 겹쳤습니다',
      sub:'웨이모 988·테슬라 432·애브라이드 344·죽스 44대(9/8). 플로리다 완전자율주행 15와 메가팩도 같은 표입니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'AI5', title:'테일러 팹 풀가동 전 양산·인공지능5 공동설계 약 40배 서사가 나왔습니다',
      sub:'원 연산 약 8배와 구분해 적습니다. 약 370억 달러급 공장 서사·2나노 주문 축입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'스페이스X 목표가 220달러·매수 의견에 시가총액 약 +720억 달러가 붙었습니다',
      sub:'머스크 지분 약 48.4%가 같은 화면에 있습니다. 옵티머스 부품은 연말 약 1만 5천 대 분량입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'MACRO', title:'일본 이자 비용 사상 최고 약 16.59조 엔·중국 은행 순이자마진 약 1.4%입니다',
      sub:'팔란티어–엔비스·에이エス엠엘–티에스엠씨·유럽 자동차 감원·유가 30달러 서사도 겹칩니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'GOOGL', title:'구글–액센추어 제미니 엔터프라이즈 약 1,000명 유닛이 거론됐습니다',
      sub:'콜로라도 메가팩 50메가와트·200메가와시·약 5천만 달러도 같은 아침 표입니다.' },
  ],
  caption: '더 볼 것: 유럽곧·댈러스·텍사스플릿·AI5 40x·PT220·옵티머스15k·16.59조엔·NIM1.4%·제미니1000·메가팩',
}, {
  headline: '2026.09.09 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Europe Cybercab “hopefully soon”; Dallas hub; Texas AV fleet; unboxed ~10s',
      sub:'Sep 8: Waymo 988 / Tesla 432 / Avride 344 / Zoox 44. FSD v15 FL + Megapack too.' },
    { color:'#22d3ee', fill:'#06171c', right:'AI5', title:'Taylor fab full capacity before mass production; AI5 co-design ~40x narrative',
      sub:'Split from raw compute ~8x. ~$37B plant / 2nm order axis.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'SpaceX Buy PT $220; about +$72B market-cap day; Musk ~48.4%',
      sub:'Optimus parts for ~15k units by EOY2026; ~1k/wk end Sep → ~2.5k/wk YE.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'MACRO', title:'Japan interest bill ATH ~¥16.59T; China bank NIM ~1.4%',
      sub:'PLTR–NBIS; ASML–TSMC 12-inch EUV; Europe auto cuts; oil-to-$30 narrative.' },
    { color:'#60a5fa', fill:'#06121f', right:'GOOGL', title:'GOOGL–ACN Gemini Enterprise unit ~1,000 engineers cited',
      sub:'Colorado Megapack 50MW/200MWh ~$50M also on the morning board.' },
  ],
  caption: 'Watch: Europe soon · Dallas · TX fleet · AI5 40x · PT220 · Optimus 15k · ¥16.59T · NIM 1.4% · Gemini 1k · Megapack',
});

add('cybercab-europe-soon', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '🇪🇺 유럽 · 곧',
  title: '유럽 사이버캡 출시는 「곧」이라는 표현으로만 남았습니다',
  heroIcon: '🇪🇺', heroBig: '곧',
  heroSub: '사이버캡은 운전석 없는 전용 로보택시 차량입니다. 유럽 일정은 날짜 대신 「hopefully soon(곧이기를 바란다)」 수준의 표현으로 공유됐습니다.',
  cards: [
    { icon:'🗺', big:'유럽', mid:'출시 지도가 아직 비어 있음', sub:'국가·도시 일정이 공개되지 않음' },
    { icon:'💬', big:'곧', mid:'확정 날짜가 아닌 톤', sub:'캘린더보다 기대 문구에 가깝습니다' },
    { icon:'🚕', big:'전용차', mid:'소프트웨어만 얹은 차가 아님', sub:'처음부터 무인 운행용 차체' },
  ],
  quote: '유럽 사이버캡은 「언제」가 아니라 「곧」이라는 말로만 남았습니다. 허가가 나라마다 달라 미국 오스틴 숫자와 같은 칸에 넣으면 안 됩니다. 다음 확인할 것은 국가별 승인·지오펜스(운행 가능 구역) 공개입니다.',
  noteSub: '「곧」은 투자 캘린더가 아닙니다. 미국 유료 운행·요금·대기와 유럽 허가를 열을 나눠 적으시기 바랍니다. 다음 게이트는 첫 유럽 도시·요금표입니다. 장기적으로는 유럽 구독·호출 주소시장이 열리면 소프트웨어 매출 가정이 두꺼워질 수 있습니다.',
  footer: '테슬라 · 유럽 사이버캡',
}, {
  badge: 'TSLA', badgeLine: '🇪🇺 Europe · soon',
  title: 'Europe Cybercab timing framed only as “hopefully soon”',
  heroIcon: '🇪🇺', heroBig: 'Soon',
  heroSub: 'Cybercab is the wheel-free dedicated robotaxi. Europe was discussed as “hopefully soon,” not a locked calendar date.',
  cards: [
    { icon:'🗺', big:'Europe', mid:'Launch map still blank', sub:'No city/country dates yet' },
    { icon:'💬', big:'Soon', mid:'Tone, not a date', sub:'Closer to hope than a calendar' },
    { icon:'🚕', big:'Cab', mid:'Not software-on-Model-Y only', sub:'Purpose-built robotaxi body' },
  ],
  quote: 'Europe Cybercab remains a “soon” phrase, not a when. Do not merge it with Austin fare/wait prints. Next: country approvals and geofence disclosure.',
  noteSub: '“Soon” is not an investment calendar. Split US paid ops from Europe permits. Next gate: first European city and fare card. Longer term, EU addressable ride/subscription markets can thicken software assumptions.',
  footer: 'TSLA · Europe Cybercab',
});

add('dallas-robotaxi-hub', 'L2', 'TSLA', {
  badge: 'TSLA', title: '댈러스 로보택시 허브 확장에 모델Y 약 40대·검증용 사이버캡 75대 이상이 거론됐습니다',
  heroIcon: '🏭', heroBig: '75+',
  heroSub: '허브는 차량을 모으고 충전·정비·배차를 하는 거점입니다. 표시된 모델Y 약 40대와 검증용 사이버캡 75대 이상이 같은 확장 서사에 붙었습니다.',
  cards: [
    { label:'모델Y', big:'~40', mid:'표시된 대수', sub:'허브에 표시·배치된 규모' },
    { label:'사이버캡', big:'75+', mid:'검증용 차량', sub:'양산 전 테스트·검증' },
    { label:'도시', big:'댈러스', mid:'텍사스 두 번째 축', sub:'오스틴과 다른 거점' },
  ],
  detailHead: '허브가 의미하는 것',
  detailLines: ['📍 지오펜스 안 공급(차량 수)을 늘리는 실행','🚗 모델Y 표시와 사이버캡 검증은 역할이 다름','💵 다음 확인은 유료 호출·대기·요금'],
  noteSub: '허브가 커져도 호출 앱에 요금·대기가 안 찍히면 유닛 이코노믹스는 빈칸입니다. 오스틴 숫자와 합치지 마시기 바랍니다. 다음 게이트는 댈러스 유료 구간·중앙값 대기입니다. 장기적으로 도시가 늘면 네트워크 효과가 쌓일 수 있습니다.',
  footer: '테슬라 · 댈러스 허브',
}, {
  badge: 'TSLA', title: 'Dallas robotaxi hub expansion cites ~40 Model Y and 75+ validation Cybercabs',
  heroIcon: '🏭', heroBig: '75+',
  heroSub: 'A hub pools charge, service, and dispatch. Marked Model Y ~40 and 75+ validation Cybercabs sit in the same expansion story.',
  cards: [
    { label:'Model Y', big:'~40', mid:'Marked count', sub:'Shown at the hub' },
    { label:'Cybercab', big:'75+', mid:'Validation units', sub:'Pre-production tests' },
    { label:'City', big:'Dallas', mid:'Second Texas axis', sub:'Separate from Austin' },
  ],
  detailHead: 'What the hub means',
  detailLines: ['📍 Supply (fleet) inside the geofence','🚗 Model Y marks ≠ Cybercab validation','💵 Next: paid rides, waits, fares'],
  noteSub: 'Without in-app fare/wait, unit economics stay blank. Do not blend with Austin prints. Next: Dallas paid segments and median waits. Over time, more cities can compound network effects.',
  footer: 'TSLA · Dallas hub',
});

add('texas-av-fleet-sep8', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: '텍사스 플릿 · 9/8',
  title: '9월 8일 텍사스 자율주행 플릿 집계가 웨이모 988·테슬라 432로 나왔습니다',
  heroBig: '988',
  heroSub: '자율주행 플릿은 도로에 등록·운행 중인 차량 대수를 세는 표입니다. 같은 날 애브라이드 344대·죽스 44대도 함께 집계됐습니다.',
  grid: [
    { icon:'1️⃣', big:'988', mid:'웨이모', sub:'당일 최다 집계' },
    { icon:'2️⃣', big:'432', mid:'테슬라', sub:'2위권 규모' },
    { icon:'3️⃣', big:'344', mid:'애브라이드', sub:'3위권' },
    { icon:'4️⃣', big:'44', mid:'죽스', sub:'소규모 파일럿' },
  ],
  ctx1: '대수는 공급 신호입니다. 유료 마일·사고율과는 칸을 나누시기 바랍니다.',
  ctx2: '정의(등록·운행)가 같은지 확인한 뒤 점유율을 적으시기 바랍니다.',
  quote: '9월 8일 텍사스 표는 「누가 더 많은 차를 돌리는가」의 스냅샷입니다. 대수와 유료 마일·사고율은 다른 칸입니다. 테슬라 432는 웨이모 988과 같은 정의(등록·운행)인지 확인이 필요합니다.',
  noteSub: '플릿 대수는 공급이지 마진이 아닙니다. 요금·이용률·보험이 비기 전까지 점유율로 단정하지 마시기 바랍니다. 다음 확인할 것은 주간 증차와 도시별 지오펜스입니다. 장기적으로 대수가 쌓이면 데이터·원가 해자가 두꺼워질 수 있습니다.',
  footer: '테슬라 · 텍사스 플릿',
}, {
  badge: 'BREAKING', breaking: 'TEXAS FLEET · SEP 8',
  title: 'Sep 8 Texas AV fleet print: Waymo 988, Tesla 432',
  heroBig: '988',
  heroSub: 'Fleet counts track registered/operating robotaxi vehicles. Same day: Avride 344, Zoox 44.',
  grid: [
    { icon:'1️⃣', big:'988', mid:'Waymo', sub:'Top print that day' },
    { icon:'2️⃣', big:'432', mid:'Tesla', sub:'Second-tier scale' },
    { icon:'3️⃣', big:'344', mid:'Avride', sub:'Third tier' },
    { icon:'4️⃣', big:'44', mid:'Zoox', sub:'Small pilot' },
  ],
  ctx1: 'Counts are supply signals—not paid miles or safety rates.',
  ctx2: 'Confirm definitions match before writing share.',
  quote: 'The Sep 8 Texas table is a who-runs-more-cars snapshot. Counts ≠ paid miles or safety rates. Confirm Tesla 432 uses the same definition as Waymo 988.',
  noteSub: 'Fleet size is supply, not margin. Do not crown share before fare, utilization, and insurance print. Next: weekly adds and city geofences. Over time, scale can thicken data and cost moats.',
  footer: 'TSLA · Texas fleet',
});

add('samsung-taylor-ai5', 'L1', 'TSLA', {
  badge: 'TSLA', title: '삼성 테일러 팹이 양산 전 풀가동에 들어가고 테슬라 인공지능5가 2나노 주문에 올랐습니다',
  heroIcon: '🏭', heroBig: '풀가동',
  heroSub: '팹은 반도체를 만드는 공장입니다. 텍사스 테일러 공장이 대량 양산 전에 설비 가동으로 풀가동에 들어갔다는 서사와, 테슬라 인공지능5(AI5)가 2나노급 주문에 포함됐다는 설명이 겹쳤습니다.',
  cards: [
    { icon:'🇺🇸', big:'테일러', mid:'텍사스 삼성 파운드리', sub:'약 370억 달러급 공장 서사' },
    { icon:'🔬', big:'2nm', mid:'미세 공정 주문 축', sub:'인공지능5가 고객 목록에' },
    { icon:'⚡', big:'풀가동', mid:'양산 전 용량 채움', sub:'수율·출하와는 다른 단계' },
  ],
  quote: '풀가동은 「설비가 돌아가기 시작했다」는 뜻에 가깝고, 바로 완제품 출하·이익을 보장하지는 않습니다. 인공지능5 2나노 주문은 테슬라 추론 칩 로드맵과 삼성 파운드리 점유 서사를 동시에 건드립니다.',
  noteSub: '공장 내러티브와 칩 성능(40배·8배) 숫자는 칸을 나누시기 바랍니다. 다음 확인할 것은 양산 램프·수율·납기입니다. 장기적으로 미국 내 첨단 파운드리 용량은 공급망 해자로 남을 수 있습니다.',
  footer: '테슬라 · 테일러·AI5',
}, {
  badge: 'TSLA', title: 'Samsung Taylor fab full capacity before mass production; Tesla AI5 among 2nm orders',
  heroIcon: '🏭', heroBig: 'Full',
  heroSub: 'A fab makes chips. Taylor TX is framed as running full capacity before mass production, with Tesla AI5 among 2nm orders (~$37B plant narrative).',
  cards: [
    { icon:'🇺🇸', big:'Taylor', mid:'Samsung TX foundry', sub:'~$37B plant narrative' },
    { icon:'🔬', big:'2nm', mid:'Advanced-node orders', sub:'AI5 on the customer list' },
    { icon:'⚡', big:'Full', mid:'Capacity before ramp', sub:'Not the same as yield/ship' },
  ],
  quote: 'Full capacity means tools are busy—not finished goods or profits. AI5 on 2nm links Tesla inference silicon to Samsung foundry share.',
  noteSub: 'Split plant narrative from 40x/8x performance claims. Next: mass-production ramp, yield, and lead times. US advanced capacity can remain a supply-chain moat over years.',
  footer: 'TSLA · Taylor·AI5',
});

add('ai5-40x-codesign', 'L3', 'TSLA', {
  badge: 'TSLA', title: '인공지능5 공동설계가 체감 약 40배, 원 연산은 약 8배로 구분됐습니다',
  heroIcon: '✅', heroBig: '~40x',
  heroSub: '공동설계는 칩과 소프트웨어를 같이 맞춰 효율을 내는 방식입니다. 「약 40배」는 시스템 체감, 「약 8배」는 원시 연산(로 컴퓨트)으로 나눠 설명됐습니다.',
  cards: [
    { icon:'🧩', big:'~40x', mid:'공동설계 체감 배수', sub:'소프트웨어·메모리까지 포함' },
    { icon:'🔢', big:'~8x', mid:'원 연산 배수', sub:'칩 자체 계산량 비교' },
    { icon:'🤖', big:'AI5', mid:'다음 세대 추론 칩', sub:'차량·로봇 공통 축' },
  ],
  quote: '40배와 8배를 한 숫자로 합치면 과장이 됩니다. 공동설계 이득은 워크로드·메모리 대역에 따라 달라집니다. 벤치마크 조건이 공개되기 전까지는 범위로만 적으시기 바랍니다.',
  noteSub: '성능 서사는 원가·전력(와트당 성능)과 같이 봐야 합니다. 다음 게이트는 샘플 일정·차량 탑재 세대입니다. 장기적으로 칩 해자는 로보택시·옵티머스 추론 원가를 깎는 축입니다.',
  footer: '테슬라 · AI5 공동설계',
}, {
  badge: 'TSLA', title: 'AI5 co-design framed ~40x vs raw compute ~8x',
  heroIcon: '✅', heroBig: '~40x',
  heroSub: 'Co-design tunes chip and software together. ~40x is system-level feel; ~8x is raw compute—keep them split.',
  cards: [
    { icon:'🧩', big:'~40x', mid:'Co-design system gain', sub:'Includes software/memory' },
    { icon:'🔢', big:'~8x', mid:'Raw compute gain', sub:'Chip math vs prior' },
    { icon:'🤖', big:'AI5', mid:'Next inference silicon', sub:'Cars and robots share axis' },
  ],
  quote: 'Do not mash 40x and 8x into one headline. Co-design gains depend on workload and memory bandwidth. Treat as ranges until benchmarks publish.',
  noteSub: 'Pair performance claims with cost and performance-per-watt. Next: sample timing and vehicle generation. Longer term, silicon moats cut robotaxi/Optimus inference cost.',
  footer: 'TSLA · AI5 co-design',
});

add('spacex-pivotal-220', 'L1', 'SPCX', {
  badge: 'SPCX', title: '스페이스X 목표가 220달러·매수 의견에 시가총액이 하루 약 720억 달러 늘습니다',
  heroIcon: '🚀', heroBig: '$220',
  heroSub: '목표주가는 애널리스트 의견이지 확정 가격이 아닙니다. 같은 화면에서 머스크 지분 약 48.4%와 시가총액 약 +720억 달러 반응도 거론됐습니다.',
  cards: [
    { icon:'🎯', big:'$220', mid:'목표가(의견)', sub:'매수 등급과 한 세트' },
    { icon:'📈', big:'+$72B', mid:'시총 증가 규모', sub:'하루 반응으로 인용' },
    { icon:'👤', big:'48.4%', mid:'머스크 지분 대략', sub:'의결·희석과 별도 칸' },
  ],
  quote: '목표가 220달러는 가정(발사 케이던스·스타링크·가치평가 배수)에 민감합니다. 시총 +720억 달러는 그날 가격 반응이지 펀더멘털 확정이 아닙니다. 의견·시세·공시를 열을 나누시기 바랍니다.',
  noteSub: '비상장·상장 전환 이슈가 있으면 유동성 칸을 따로 두시기 바랍니다. 다음 확인할 것은 발사 성공률·스타링크 가입·희석입니다. 장기적으로 재사용 로켓·위성 인터넷 해자가 핵심입니다.',
  footer: '스페이스X · 목표가',
}, {
  badge: 'SPCX', title: 'SpaceX Buy PT $220; ~+$72B market-cap day; Musk ~48.4%',
  heroIcon: '🚀', heroBig: '$220',
  heroSub: 'A price target is an opinion, not a lock. Same screen cited Musk ownership ~48.4% and about +$72B market-cap reaction.',
  cards: [
    { icon:'🎯', big:'$220', mid:'Price target (opinion)', sub:'Paired with Buy rating' },
    { icon:'📈', big:'+$72B', mid:'Market-cap add cited', sub:'One-day reaction print' },
    { icon:'👤', big:'48.4%', mid:'Musk stake approx.', sub:'Separate from dilution' },
  ],
  quote: 'PT $220 is sensitive to cadence, Starlink, and multiples. +$72B is price action, not fundamental proof. Split opinion, tape, and filings.',
  noteSub: 'If liquidity/listing issues exist, keep a separate cell. Next: launch success, Starlink adds, dilution. Long-run moats: reusable rocketry and sat internet.',
  footer: 'SPCX · PT',
});

add('optimus-15k-parts', 'L2', 'TSLA', {
  badge: 'TSLA', title: '옵티머스 부품이 2026년 말 약 1만 5천 대 분량으로 잡히고 주당 약 1천→2.5천 대가 거론됐습니다',
  heroIcon: '🤖', heroBig: '15k',
  heroSub: '옵티머스는 테슬라 휴머노이드(사람 형태) 로봇입니다. 연말까지 약 1만 5천 대 분량 부품, 9월 말 주당 약 1,000대에서 연말 주당 약 2,500대 가이던스가 같은 서사에 붙었습니다.',
  cards: [
    { label:'부품', big:'15k', mid:'연말 대수 분량', sub:'완성 출하와 다를 수 있음' },
    { label:'9월말', big:'~1k/주', mid:'주당 런레이트', sub:'조립·출고 목표' },
    { label:'연말', big:'~2.5k/주', mid:'주당 목표', sub:'램프업 가정' },
  ],
  detailHead: '단계 구분',
  detailLines: ['📦 부품 확보 ≠ 완제품 출하','🔎 주당 런레이트는 공급망 감사가 받쳐야 함','📋 보도는 공시와 가중치를 다르게'],
  noteSub: '로봇 매출은 아직 초입입니다. 다음 확인할 것은 공장 감사·주간 실출력·불량률입니다. 장기적으로 옵티머스는 인건비 대체·공장 내 자동화 해자 논쟁의 중심입니다.',
  footer: '테슬라 · 옵티머스',
}, {
  badge: 'TSLA', title: 'Optimus parts for ~15k units EOY2026; ~1k/wk end Sep → ~2.5k/wk YE',
  heroIcon: '🤖', heroBig: '15k',
  heroSub: 'Optimus is Tesla’s humanoid robot. Parts for ~15k units by year-end and a ~1k/wk → ~2.5k/wk ramp were cited together.',
  cards: [
    { label:'Parts', big:'15k', mid:'EOY volume', sub:'May differ from ships' },
    { label:'Sep', big:'~1k/wk', mid:'Late-Sep run-rate', sub:'Weekly build target' },
    { label:'YE', big:'~2.5k/wk', mid:'Year-end goal', sub:'Ramp assumption' },
  ],
  detailHead: 'Stage splits',
  detailLines: ['📦 Parts readiness ≠ finished deliveries','🔎 Run-rate needs supply-chain audits','📋 Weight press below filings'],
  noteSub: 'Robot revenue is still early. Next: factory audits, weekly output, scrap rates. Longer term, Optimus sits at the center of labor-substitution and factory automation moats.',
  footer: 'TSLA · Optimus',
});

add('japan-interest-16tn', 'L1', 'JPY', {
  badge: 'MACRO', title: '일본 정부가 내년 이자 비용으로 사상 최고 약 16.59조 엔(약 1,080억 달러)을 잡았습니다',
  heroIcon: '🇯🇵', heroBig: '16.59조',
  heroSub: '이자 비용은 나라 빚에 붙는 이자 예산입니다. 사상 최고치로 잡히면 재정·국채 시장·엔화 수급이 한꺼번에 흔들릴 수 있습니다.',
  cards: [
    { icon:'💴', big:'16.59조엔', mid:'내년 이자 예산', sub:'사상 최고로 인용' },
    { icon:'💵', big:'~$108B', mid:'달러 환산 대략', sub:'환율에 따라 변동' },
    { icon:'📜', big:'사상最高', mid:'기록 갱신 프레임', sub:'금리·발행 증가 반영' },
  ],
  quote: '16.59조 엔은 「이자를 갚는 데만」 쓰는 예산 규모입니다. 금리가 오르거나 발행이 늘면 이 칸이 커집니다. 성장 예산과 이자 예산을 한 줄로 합치지 마시기 바랍니다.',
  noteSub: '엔화·글로벌 채권·위험자산이 같이 움직일 수 있습니다. 다음 확인할 것은 입찰 소화율·일본은행 경로입니다. 장기적으로 일본 재정·금리 정상화는 글로벌 할인율의 큰 변수입니다.',
  footer: '매크로 · 일본 이자',
}, {
  badge: 'MACRO', title: 'Japan interest bill hits record ~¥16.59T (~$108B) next year',
  heroIcon: '🇯🇵', heroBig: '¥16.59T',
  heroSub: 'An interest bill is the budget for debt service. A record print can shake fiscal math, JGBs, and yen funding together.',
  cards: [
    { icon:'💴', big:'¥16.59T', mid:'Next-year interest budget', sub:'Cited as all-time high' },
    { icon:'💵', big:'~$108B', mid:'USD approx.', sub:'Moves with FX' },
    { icon:'📜', big:'ATH', mid:'Record frame', sub:'Rates + issuance' },
  ],
  quote: '¥16.59T is debt-service only. Higher rates or more issuance enlarge this cell. Do not merge with growth spending in one line.',
  noteSub: 'Yen, global bonds, and risk assets can move together. Next: auction digests and BoJ path. Japan fiscal/rate normalization remains a multi-year discount-rate driver.',
  footer: 'Macro · Japan interest',
});

add('china-bank-nim', 'L5', 'MACRO', {
  badge: 'MACRO', title: '중국 은행 순이자마진이 사상 최저 수준인 약 1.4%로 거론됐습니다',
  heroIcon: '🏦', heroBig: '1.4%',
  heroSub: '순이자마진(NIM)은 예금·대출 이자 차이로 은행이 남기는 마진입니다. 약 1.4%는 기록적으로 낮은 구간으로 설명됐습니다.',
  before: { label:'과거 여유', big:'높음', sub:'마진 버퍼가 더 컸던 때' },
  after: { label:'지금', big:'~1.4%', sub:'사상 최저권으로 인용' },
  cards: [
    { icon:'📉', big:'~1.4%', mid:'순이자마진 수준', sub:'예대 마진의 핵심 지표' },
    { icon:'🏦', big:'은행', mid:'중국 금융 시스템', sub:'신용·유동성 온도계' },
    { icon:'🌏', big:'파급', mid:'글로벌 신용 온도', sub:'위험선호·원자재와 연결' },
  ],
  quote: 'NIM 1.4%는 은행이 대출로 남기는 공간이 얇아졌다는 뜻입니다. 경기 부양과 은행 건전성 사이 줄타기로 읽힙니다. 개별 은행 자기자본비율과 합치지 마시기 바랍니다.',
  noteSub: '중국 신용 사이클은 한국 수출·원자재에도 닿습니다. 다음 확인할 것은 지급준비율·대출 금리·부실채권 비율입니다. 장기적으로 마진 바닥권은 금융 개혁·자본 확충 속도와 함께 봐야 합니다.',
  footer: '매크로 · 중국 NIM',
}, {
  badge: 'MACRO', title: 'China bank NIM cited near a record-low ~1.4%',
  heroIcon: '🏦', heroBig: '1.4%',
  heroSub: 'Net interest margin is what banks keep between loan and deposit rates. ~1.4% is framed as historically thin.',
  before: { label:'Earlier buffer', big:'Higher', sub:'Wider lending spread era' },
  after: { label:'Now', big:'~1.4%', sub:'Record-low zone cited' },
  cards: [
    { icon:'📉', big:'~1.4%', mid:'NIM level', sub:'Core bank spread gauge' },
    { icon:'🏦', big:'Banks', mid:'China financial system', sub:'Credit/liquidity thermometer' },
    { icon:'🌏', mid:'Global', big:'Spillovers', sub:'Links risk and commodities' },
  ],
  quote: 'NIM 1.4% means thin lending spreads—a tightrope between stimulus and bank health. Do not mash with one bank’s capital ratio.',
  noteSub: 'China credit cycles touch Korea exports and commodities. Next: RRR, loan rates, NPL prints. Floor-zone NIMs need reform and capital-raise speed over years.',
  footer: 'Macro · China NIM',
});

add('pltr-nbis-sovereign', 'L3', 'PLTR', {
  badge: 'AI', title: '팔란티어와 엔비스가 국가 인공지능 인프라 선호 축으로 묶였습니다',
  heroIcon: '✅', heroBig: '국가AI',
  heroSub: '국가(소버린) 인공지능 인프라는 정부가 통제·선호하는 데이터·클라우드·소프트웨어 묶음입니다. 두 회사가 그 선호 목록에 올랐다는 서사입니다.',
  cards: [
    { icon:'🛡', big:'소버린', mid:'국가 통제형 인프라', sub:'데이터 주권·보안 축' },
    { icon:'📊', big:'PLTR', mid:'데이터 플랫폼 축', sub:'정부·기업 분석 소프트웨어' },
    { icon:'☁️', big:'NBIS', mid:'인프라·클라우드 축', sub:'연산·저장 공급 쪽' },
  ],
  quote: '「선호」는 계약 확정이 아닐 수 있습니다. 입찰·예산·보안 인증이 매출로 바뀌는 데 시차가 있습니다. 티커 두 개를 한 바구니 합치지 마시기 바랍니다.',
  noteSub: '정부 예산 사이클은 분기 실적과 시계가 다릅니다. 다음 확인할 것은 수주 공시·배치 규모입니다. 장기적으로 국가 AI 수요는 민간 클라우드와 다른 해자 논쟁입니다.',
  footer: '인공지능 · 소버린 인프라',
}, {
  badge: 'AI', title: 'PLTR and NBIS framed as preferred sovereign AI infrastructure',
  heroIcon: '✅', heroBig: 'SovAI',
  heroSub: 'Sovereign AI infra is government-preferred data, cloud, and software stacks. Both names were bundled in that preference narrative.',
  cards: [
    { icon:'🛡', big:'Sovereign', mid:'State-controlled stack', sub:'Data residency/security' },
    { icon:'📊', big:'PLTR', mid:'Data platform axis', sub:'Gov/enterprise software' },
    { icon:'☁️', big:'NBIS', mid:'Infra/cloud axis', sub:'Compute and storage side' },
  ],
  quote: '“Preferred” may not mean signed contracts. Budget, bids, and accreditations lag revenue. Do not merge two tickers into one thesis.',
  noteSub: 'Gov budget cycles ≠ quarterly prints. Next: award filings and deployment scale. Sovereign AI demand is a multi-year moat debate vs commercial cloud.',
  footer: 'AI · sovereign infra',
});

add('asml-tsmc-12inch-euv', 'L2', 'ASML', {
  badge: 'ASML', title: '에이아스엠엘과 티에스엠씨가 12인치 극자외선 포토마스크 협력을 진전시켰습니다',
  heroIcon: '🔬', heroBig: '12″',
  heroSub: '극자외선(EUV) 포토마스크는 회로 무늬를 웨이퍼에 옮기는 원판입니다. 12인치(300밀리미터) 웨이퍼용 마스크 협력이 파운드리 미세공정 병목을 다루는 뉴스로 읽힙니다.',
  cards: [
    { label:'마스크', big:'EUV', mid:'극자외선 원판', sub:'미세 회로용 소모재' },
    { label:'규격', big:'12인치', mid:'300mm 웨이퍼', sub:'첨단 양산 표준' },
    { label:'수요', big:'TSMC', mid:'파운드리 축', sub:'장비·마스크와 짝' },
  ],
  detailHead: '왜 중요한가',
  detailLines: ['🪞 마스크 품질·납기가 수율에 직접 닿음','🏭 장비사와 파운드리는 병목을 다른 각도로 봄','⏱ 수출 규제·리드타임과 같이 볼 것'],
  noteSub: '첨단 노드 램프는 마스크·레지스트·장비 삼각입니다. 다음 확인할 것은 양산 적용 시점·고객 수율입니다. 장기적으로 EUV 생태계 해자는 파운드리 경쟁력의 뼈대입니다.',
  footer: '반도체 · EUV 마스크',
}, {
  badge: 'ASML', title: 'ASML–TSMC advance 12-inch EUV photomask collaboration',
  heroIcon: '🔬', heroBig: '12″',
  heroSub: 'EUV photomasks are the patterned plates that print circuits onto wafers. 12-inch (300mm) mask work targets advanced foundry bottlenecks.',
  cards: [
    { label:'Mask', big:'EUV', mid:'Extreme-UV plate', sub:'Advanced-node consumable' },
    { label:'Size', big:'12″', mid:'300mm wafer', sub:'Leading-edge standard' },
    { label:'Demand', big:'TSMC', mid:'Foundry axis', sub:'Paired with tools' },
  ],
  detailHead: 'Why it matters',
  detailLines: ['🪞 Mask quality/lead time hit yield','🏭 Vendors and foundries share the bottleneck','⏱ Watch export rules and tool lead times'],
  noteSub: 'Advanced ramps need masks, resists, and tools. Next: production timing and customer yields. EUV ecosystem moats underpin foundry power for years.',
  footer: 'Semis · EUV masks',
});

add('oil-30-cathie', 'L4', 'OIL', {
  badge: 'MACRO', badgeLine: '🛢️ 유가 시나리오 · 추론비용',
  title: '유가 30달러 시나리오와 인공지능 추론 비용 급감 서사가 같은 화면에 올랐습니다',
  heroIcon: '🛢️', heroBig: '$30',
  heroSub: '일부 장기 시나리오에서 원유가 배럴당 30달러까지 내려갈 수 있다는 주장과, 인공지능 추론(답을 계산하는) 비용이 해마다 크게 싸진다는 설명이 나란히 공유됐습니다. 출처 이름은 적지 않습니다.',
  cards: [
    { icon:'📉', big:'$30', mid:'유가 장기 시나리오', sub:'확정 전망이 아닌 가정' },
    { icon:'🤖', big:'−99.99%', mid:'추론 비용 급감 서사', sub:'연율 감소 프레임으로 인용' },
    { icon:'⚡', big:'에너지', mid:'전력·원유가 겹치는 축', sub:'데이터센터 전력 수요와 연결' },
  ],
  quote: '30달러 유가는 공급 과잉·수요 둔화 가정이 한꺼번에 맞을 때의 시나리오에 가깝습니다. 추론 비용 급감은 칩·소프트웨어 효율 이야기이지 유가 하락을 보장하지 않습니다. 두 서사를 인과로 묶지 마시기 바랍니다.',
  noteSub: '실제 브렌트·서부텍사스산 현물과 시나리오를 칸을 나누시기 바랍니다. 다음 확인할 것은 재고·감산·전력 가격입니다. 장기적으로 에너지 단가와 AI 원가는 인플레이션·마진 논쟁의 공통 분모입니다.',
  footer: '매크로 · 유가·추론비용',
}, {
  badge: 'MACRO', badgeLine: '🛢️ Oil scenario · inference costs',
  title: 'Oil-to-$30 scenario paired with AI inference cost collapse narrative',
  heroIcon: '🛢️', heroBig: '$30',
  heroSub: 'A long-horizon case for oil near $30/bbl sat beside claims that AI inference costs fall extremely fast each year. No source names in copy.',
  cards: [
    { icon:'📉', big:'$30', mid:'Oil scenario level', sub:'Assumption, not a lock' },
    { icon:'🤖', big:'−99.99%', mid:'Inference-cost story', sub:'Cited as annual collapse frame' },
    { icon:'⚡', big:'Energy', mid:'Power meets crude', sub:'Links to data-center power' },
  ],
  quote: '$30 oil needs surplus supply and soft demand together. Inference-cost collapse is chip/software efficiency—not a guarantee of cheaper crude. Do not force causality.',
  noteSub: 'Split Brent/WTI spots from scenario slides. Next: inventories, cuts, power prices. Energy unit costs and AI costs share multi-year inflation/margin debates.',
  footer: 'Macro · oil·inference',
});

add('googl-acn-gemini', 'L3', 'GOOGL', {
  badge: 'GOOGL', title: '구글과 액센추어가 제미니 엔터프라이즈 전담 인력 약 1,000명 규모를 거론했습니다',
  heroIcon: '✅', heroBig: '1000',
  heroSub: '제미니 엔터프라이즈는 기업용 생성형 인공지능 제품군입니다. 컨설팅·구축 인력을 약 1,000명 규모로 묶는다는 협력 서사입니다.',
  cards: [
    { icon:'👥', big:'~1000', mid:'전담 엔지니어·인력', sub:'구축·도입 지원 규모' },
    { icon:'☁️', big:'제미니', mid:'기업용 인공지능 제품', sub:'클라우드와 묶인 판매' },
    { icon:'🏢', big:'액센추어', mid:'도입·통합 파트너', sub:'대기업 프로젝트 실행' },
  ],
  quote: '1,000명은 「판매·구축 근육」을 키운다는 신호입니다. 바로 매출 1,000건을 뜻하지는 않습니다. 수주·가동률·갱신율이 나오기 전까지는 인력 발표로만 적으시기 바랍니다.',
  noteSub: '클라우드 인공지능 경쟁은 모델 품질과 현장 도입 속도가 같이 갑니다. 다음 확인할 것은 대형 고객 레퍼런스와 분기 클라우드 성장률입니다. 장기적으로 파트너 생태계는 전환 비용 해자가 될 수 있습니다.',
  footer: '구글 · 제미니 엔터프라이즈',
}, {
  badge: 'GOOGL', title: 'GOOGL–ACN Gemini Enterprise unit cites ~1,000 specialists',
  heroIcon: '✅', heroBig: '1000',
  heroSub: 'Gemini Enterprise is Google’s business generative-AI suite. The story is a ~1,000-person build-and-deploy partnership muscle.',
  cards: [
    { icon:'👥', big:'~1000', mid:'Dedicated headcount', sub:'Implementation support scale' },
    { icon:'☁️', big:'Gemini', mid:'Enterprise AI product', sub:'Sold with cloud' },
    { icon:'🏢', big:'Accenture', mid:'Integration partner', sub:'Large-account delivery' },
  ],
  quote: '1,000 people signal go-to-market muscle—not 1,000 closed deals. Keep it as a staffing print until bookings, utilization, and renewals show.',
  noteSub: 'Cloud AI races on model quality and field adoption speed. Next: marquee references and cloud growth rates. Partner ecosystems can become switching-cost moats over years.',
  footer: 'GOOGL · Gemini Enterprise',
});

add('europe-auto-cuts', 'L6', 'AUTO', {
  badge: 'BREAKING', breaking: '유럽 자동차 · 감원',
  title: '유럽 자동차가 감원 파도에 들어가며 재규어랜드로버 4천·폭스바겐 5만 명 목표가 거론됐습니다',
  heroBig: '50k',
  heroSub: '전기차 전환·수요 둔화·원가 압박이 겹치며 유럽 완성차·공급망이 인력 조정을 발표하는 구간입니다. 숫자는 목표·계획 단계일 수 있어 확정 해고와 구분해 적습니다.',
  grid: [
    { icon:'🇬🇧', big:'4천', mid:'재규어랜드로버', sub:'감원 목표로 인용' },
    { icon:'🇩🇪', big:'5만', mid:'폭스바겐', sub:'대규모 조정 목표' },
    { icon:'🔋', big:'전기차', mid:'전환 압력', sub:'투자·수요 시계 충돌' },
    { icon:'🇪🇺', big:'유럽', mid:'산업 권역', sub:'정책과 겹침' },
  ],
  ctx1: '목표는 협상·자발적 퇴직·공장별로 달라질 수 있습니다.',
  ctx2: '전기차 점유·현금흐름과 같은 표에 두되 인과는 단정하지 마시기 바랍니다.',
  quote: '4천·5만은 「피」가 큰 고용 이벤트입니다. 다만 협상·자발적 퇴직·공장별로 실제 집행은 달라집니다. 테슬라·중국 전기차 점유와 같은 표에 두되 인과를 단정하지 마시기 바랍니다.',
  noteSub: '유럽 자동차 현금흐름·노조·보조금이 변수입니다. 다음 확인할 것은 공장별 확정 인원·전기차 판매입니다. 장기적으로 구조조정은 생존 기업 해자를 가르는 과정이 될 수 있습니다.',
  footer: '매크로 · 유럽 자동차',
}, {
  badge: 'BREAKING', breaking: 'EUROPE AUTO · CUTS',
  title: 'Europe auto bloodbath: JLR ~4k and VW ~50k cut targets cited',
  heroBig: '50k',
  heroSub: 'EV transition, soft demand, and cost pressure are driving European OEM/supplier headcount plans. Treat figures as targets until executed.',
  grid: [
    { icon:'🇬🇧', big:'4k', mid:'JLR', sub:'Cited cut target' },
    { icon:'🇩🇪', big:'50k', mid:'VW', sub:'Large adjustment goal' },
    { icon:'🔋', big:'EVs', mid:'Transition pressure', sub:'Capex vs demand clash' },
    { icon:'🇪🇺', big:'EU', mid:'Industrial region', sub:'Overlaps policy' },
  ],
  ctx1: 'Targets can change with bargaining and site mixes.',
  ctx2: 'Put EV share and cash flow on the board without forcing blame lines.',
  quote: '4k and 50k are high-blood employment events—but bargaining and site mixes change outcomes. Put Tesla/China EV share on the same board without forcing blame lines.',
  noteSub: 'Watch cash flow, unions, and subsidies. Next: site-level confirmed cuts and EV sales. Restructuring can decide which moats survive over a multi-year cycle.',
  footer: 'Macro · Europe auto',
});

add('colorado-megapack', 'L1', 'TSLA', {
  badge: 'TSLA', title: '콜로라도에 메가팩 50메가와트·200메가와시·약 5천만 달러 프로젝트가 잡혔습니다',
  heroIcon: '🔋', heroBig: '50MW',
  heroSub: '메가팩은 테슬라의 대형 전력 저장 장치입니다. 블랙힐스 에너지 쪽으로 50메가와트(출력)·200메가와시(저장량)·약 5천만 달러 규모가 거론됐습니다.',
  cards: [
    { icon:'⚡', big:'50MW', mid:'출력 용량', sub:'순간적으로 내보내는 전력' },
    { icon:'🔋', big:'200MWh', mid:'저장 용량', sub:'몇 시간 분량 에너지' },
    { icon:'💵', big:'$50M', mid:'프로젝트 규모', sub:'유틸리티 계약 금액대' },
  ],
  quote: '50메가와트/200메가와시는 약 4시간 저장으로 읽히는 조합입니다. 에너지 사업 매출은 자동차와 다른 칸입니다. 단가(달러/킬로와시)를 남기시면 다음 수주와 비교하기 쉽습니다.',
  noteSub: '전력망 저장은 재생에너지·피크 요금과 같이 큽니다. 다음 확인할 것은 준공·상업운전 일정입니다. 장기적으로 메가팩은 자동차 사이클과 다른 현금흐름 Diversifier입니다.',
  footer: '테슬라 · 메가팩',
}, {
  badge: 'TSLA', title: 'Colorado Megapack 50MW/200MWh ~$50M with Black Hills Energy',
  heroIcon: '🔋', heroBig: '50MW',
  heroSub: 'Megapack is Tesla’s utility-scale battery. A Black Hills Energy project cites 50MW power, 200MWh energy, and about $50M.',
  cards: [
    { icon:'⚡', big:'50MW', mid:'Power capacity', sub:'Instant output rating' },
    { icon:'🔋', big:'200MWh', mid:'Energy capacity', sub:'Hours of stored energy' },
    { icon:'💵', big:'$50M', mid:'Project size', sub:'Utility contract ballpark' },
  ],
  quote: '50MW/200MWh reads like ~4-hour storage. Energy revenue is a separate cell from cars. Keep $/kWh to compare the next award.',
  noteSub: 'Grid storage grows with renewables and peak pricing. Next: COD/commercial operation dates. Megapack can diversify cash flow vs auto cycles over years.',
  footer: 'TSLA · Megapack',
});

add('fsd-v15-florida', 'L3', 'TSLA', {
  badge: 'TSLA', title: '완전 자율주행 15가 더 큰 플릿을 열고 플로리다 탬파·올랜도·마이애미에 소수가 배치됐습니다',
  heroIcon: '✅', heroBig: 'v15',
  heroSub: '완전 자율주행(FSD) 15는 소프트웨어 버전입니다. 더 큰 플릿에 풀린다는 설명과 함께, 플로리다 주요 도시에 아직 「한 줌」 수준의 배치가 언급됐습니다.',
  cards: [
    { icon:'🧩', big:'v15', mid:'소프트웨어 버전', sub:'기능·안전 스택 갱신' },
    { icon:'🚗', big:'플릿', mid:'더 큰 차량 집단에 개방', sub:'호출·로보택시 공급과 연결' },
    { icon:'🌴', big:'FL', mid:'탬파·올랜도·마이애미', sub:'아직 소수 대수' },
  ],
  quote: '버전 업은 「기능이 늘었다」는 신호이고, 도시 소수 배치는 「아직 파일럿」 신호입니다. 두 문장을 전국 출시로 확장하지 마시기 바랍니다. 개입률·사고·요금이 매출 스위치입니다.',
  noteSub: '소프트웨어 해자는 데이터·버전 속도에 있습니다. 다음 확인할 것은 플로리다 대수 증가와 타 주 개방입니다. 장기적으로 버전 업이 보험·규제 설득 자료가 됩니다.',
  footer: '테슬라 · FSD v15',
}, {
  badge: 'TSLA', title: 'FSD v15 unlocks larger fleets; Florida Tampa/Orlando/Miami still a handful',
  heroIcon: '✅', heroBig: 'v15',
  heroSub: 'FSD v15 is a software version. It is framed as unlocking larger fleets, while Florida major cities still show only a handful of units.',
  cards: [
    { icon:'🧩', big:'v15', mid:'Software version', sub:'Feature/safety stack update' },
    { icon:'🚗', big:'Fleet', mid:'Opened to larger pools', sub:'Links robotaxi supply' },
    { icon:'🌴', big:'FL', mid:'Tampa·Orlando·Miami', sub:'Still small counts' },
  ],
  quote: 'A version bump signals more capability; a handful of city cars signals pilot scale. Do not stretch either into a national launch. Intervention rates, safety, and fares are the revenue switches.',
  noteSub: 'Software moats sit in data and release speed. Next: Florida unit growth and other-state unlocks. Over time, version history becomes insurance and regulator evidence.',
  footer: 'TSLA · FSD v15',
});

add('unboxed-10s-video', 'L5', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 언박스트가 4케이 영상에서 약 10초마다 한 대, 목표는 5초로 다시 찍혔습니다',
  heroIcon: '🎬', heroBig: '10초',
  heroSub: '언박스트는 차체를 큰 모듈로 조립해 라인 택트(한 대당 시간)를 줄이는 방식입니다. 4케이 영상 기준으로 약 10초마다 한 대가 나오고, 장기 목표는 5초라는 설명이 반복됐습니다.',
  before: { label:'영상 실측', big:'~10초', sub:'4K로 공유된 사이클' },
  after: { label:'목표', big:'~5초', sub:'더 빠른 택트' },
  cards: [
    { icon:'🎥', big:'4K', mid:'영상으로 확인된 템포', sub:'초당 프레임이 아닌 대당 시간' },
    { icon:'⏱', big:'10초', mid:'현재 공개 사이클', sub:'설계·시연 구간에 가까움' },
    { icon:'🎯', big:'5초', mid:'장기 목표 택트', sub:'수율·물류가 받쳐야 함' },
  ],
  quote: '10초마다 한 대는 이론상 시간당 수백 대 산술로 이어집니다. 영상 사이클과 주간 완성 대수는 다른 지표입니다. 스타링크 모듈이 해치에 붙는 장면은 통신·원격 지원 원가 논쟁과도 연결됩니다.',
  noteSub: '어제 10초 미만 서사와 각도가 겹치면 「영상 실측·5초 목표」로만 갱신해 두시기 바랍니다. 다음 게이트는 양산 주간 출력입니다. 장기적으로 처리량이 안정되면 로보택시 원가 논쟁이 유리해질 수 있습니다.',
  footer: '테슬라 · 언박스트 영상',
}, {
  badge: 'TSLA', title: 'Cybercab unboxed in 4K: about one vehicle every 10 seconds, goal ~5',
  heroIcon: '🎬', heroBig: '10s',
  heroSub: 'Unboxed means modular body assembly to cut takt. 4K footage is framed as ~10 seconds per vehicle with a ~5-second goal.',
  before: { label:'Video print', big:'~10s', sub:'Cycle shown in 4K' },
  after: { label:'Goal', big:'~5s', sub:'Faster takt target' },
  cards: [
    { icon:'🎥', big:'4K', mid:'Tempo confirmed on video', sub:'Seconds per car, not FPS' },
    { icon:'⏱', big:'10s', mid:'Public cycle now', sub:'Closer to demo/design' },
    { icon:'🎯', big:'5s', mid:'Long-term takt', sub:'Needs yield and logistics' },
  ],
  quote: 'One car every 10 seconds implies hundreds per hour on paper. Video cycle ≠ weekly finished units. Starlink modules on the hatch also touch comms/remote-support cost debates.',
  noteSub: 'If overlapping yesterday’s <10s story, keep this as a video-measured refresh vs the 5s goal. Next gate: weekly production output. Stable throughput can soften robotaxi cost debates over time.',
  footer: 'TSLA · unboxed video',
});

};
