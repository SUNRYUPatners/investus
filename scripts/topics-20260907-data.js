// 2026-09-07 SVG topic data — consumed by gen-reports-20260907.js
// Layout mix: L1×4 L2×4 L3×5 L4×3 L5×4 L6×3 ROWS×1 (no layout >40%)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.07 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'사이버캡 출시 다음 주 테슬라가 354.08달러로 5.92% 빠지며 되돌렸습니다',
      sub:'로보택시 앱은 여행 카테고리 1위, 전비는 킬로와트시당 6.1마일 이상 현장이 같은 주에 겹칩니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'스타십 14번째 비행은 선박·부스터 시험을 마치고 스택·날짜만 남겼습니다',
      sub:'역사·중국 연간 톤 대비와 그록 4.7·기업 스택, 스타베이스 경찰 채용도 같은 축입니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'엔비디아 지분 투자가 약 990억 달러, 웨이모는 첫 부채 30억 달러 이상이 거론됐습니다',
      sub:'마일당 요금·원가 비교와 로보택시 100만 마일 이정표가 경쟁 구도를 보여 줍니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'MACRO', title:'연준은 9월에 주요국 가운데 올리지 않을 수 있고 고용·부채 40조가 겹칩니다',
      sub:'「집을 살 수 없다」검색은 사상 최고, 비트코인은 약 8만 달러권입니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'FSD', title:'완전 자율주행 감독 14.3.9가 충돌 임박·주의 산만 때 자동 개입한다고 설명됐습니다',
      sub:'콘솔 연결·라이트바·3만 달러 에어비앤비형 서사도 상품 디테일로 남았습니다.' },
  ],
  caption: '더 볼 것: 354.08·앱1위·6.1mi/kWh·F14시험·웨이모30억·엔비디아990억·고용·주거검색·BTC 8만',
}, {
  headline: '2026.09.07 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Tesla printed $354.08 (−5.92%) in a post-Cybercab-week pullback',
      sub:'Robotaxi app #1 in travel; field efficiency above 6.1 mi/kWh the same week.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'Flight 14 hardware finished proof and static fires; stack and date next',
      sub:'Orbital-mass contrasts, Grok 4.7 enterprise stack, and Starbase police hiring.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'Nvidia stakes tallied near $99B; Waymo first debt cited above $3B',
      sub:'Per-mile stacks and 1M unsupervised miles frame the robotaxi race.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'MACRO', title:'Fed may hold alone in September as peers meet; payrolls and $40T debt',
      sub:'“Can’t Afford Home” searches at ATH; Bitcoin near $80k.' },
    { color:'#22d3ee', fill:'#06171c', right:'FSD', title:'FSD Supervised v14.3.9 auto-activates on imminent crash if AEB is not enough',
      sub:'Consoles, lightbar ID, and $30k Airbnb-on-wheels framing round the product week.' },
  ],
  caption: 'Watch: $354.08 · app #1 · 6.1 mi/kWh · F14 tests · Waymo $3B · NVDA $99B · payrolls · housing · BTC ~80k',
});

add('cybercab-efficiency-61', 'L1', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 전비가 킬로와트시당 6.1마일을 넘는다는 현장 설명이 나왔습니다',
  heroIcon: '🔋', heroBig: '6.1+',
  heroSub: '오스틴에서 약 5시간 탑승한 뒤 나온 전비입니다. 양산차 가운데 가장 효율적이라는 주장이 같이 붙었습니다.',
  cards: [
    { icon:'⏱', big:'5시간', mid:'탑승', sub:'오스틴 현장' },
    { icon:'⚡', big:'6.1+', mid:'마일/kWh', sub:'전비 체감' },
    { icon:'🏆', big:'양산', mid:'최고 효율', sub:'주장·비교' },
  ],
  quote: '전비는 한 킬로와트시로 몇 마일을 가는지 보는 지표입니다. 6.1마일이면 같은 배터리로 더 멀리 가거나 팩을 줄일 수 있어, 로보택시 전기비가 바로 원가로 이어집니다.',
  noteSub: '5시간 탑승은 짧은 시연보다 설득력이 있지만 샘플 하나입니다. 공인 연비·전 차종 평균과 섞지 마시고, 계절·속도·공조를 감안해 주간 평균 전비가 나오는지를 다음에 보시면 됩니다. 이용률·보험이 빠진 원가 모델은 과최적화입니다.',
  footer: '테슬라 · 사이버캡 전비',
}, {
  badge: 'TSLA', title: 'Cybercab efficiency was cited above 6.1 miles per kilowatt-hour',
  heroIcon: '🔋', heroBig: '6.1+',
  heroSub: 'After about five hours of Austin rides, with a most-efficient production-car claim attached.',
  cards: [
    { icon:'⏱', big:'5 hrs', mid:'Riding', sub:'Austin field' },
    { icon:'⚡', big:'6.1+', mid:'mi/kWh', sub:'Efficiency' },
    { icon:'🏆', big:'Best', mid:'production', sub:'Claim' },
  ],
  quote: 'Miles per kWh is energy stretch. Above 6.1 means more range or a smaller pack—fleet electricity becomes opex immediately.',
  noteSub: 'A five-hour sample beats a short demo but is still one day. Do not mix it with certified ratings. Watch weekly average Wh/mi next, and keep utilization and insurance out of naive unit-cost models.',
  footer: 'TSLA · Cybercab efficiency',
});

add('robotaxi-app-number-one', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '앱 · 여행 1위',
  title: '테슬라 로보택시 앱이 여행 카테고리에서 우버를 제치고 1위에 올랐습니다',
  heroBig: '#1',
  heroSub: '여행 카테고리 순위에서 우버를 앞섰다는 캡처가 공유됐습니다. 앱 순위는 유료 승차 건수와 다릅니다.',
  grid: [
    { icon:'📱', big:'#1', mid:'여행', sub:'카테고리' },
    { icon:'🚕', big:'Uber', mid:'대비', sub:'상대 순위' },
    { icon:'🛣', big:'로보택시', mid:'관심', sub:'출시 다음 주' },
    { icon:'⚠️', big:'노동', mid:'규제', sub:'속도 변수' },
  ],
  ctx1: '설치·관심 급등과 도시 전체 허가는 다른 축입니다',
  ctx2: '유료 건수·재이용률을 순위와 같은 표에 두시기 바랍니다',
  quote: '앱스토어 1위는 검색과 설치가 몰렸다는 신호입니다. 우버는 글로벌 네트워크가 이미 있고, 테슬라는 일부 지오펜스에서 시작하는 단계라 연간 총거래액과 하루 순위를 같은 저울에 올리면 안 됩니다.',
  noteSub: '출시 다음 주 순위는 마케팅 효과가 큽니다. 경쟁·노동 축이 확산을 늦출 수 있다는 해석은 의도 추정으로만 적고, 4주 평균 순위와 유료 전환을 다음에 확인하시면 됩니다. 관심과 매출을 한 문장으로 합치지 마시기 바랍니다.',
  footer: '테슬라 · 로보택시 앱',
}, {
  badge: 'TSLA', breaking: 'APP · TRAVEL #1',
  title: 'Tesla Robotaxi app ranked number one in travel, ahead of Uber',
  heroBig: '#1',
  heroSub: 'Category charts showed Robotaxi ahead of Uber. Rank is not paid-trip volume.',
  grid: [
    { icon:'📱', big:'#1', mid:'Travel', sub:'Category' },
    { icon:'🚕', big:'Uber', mid:'Compare', sub:'Relative' },
    { icon:'🛣', big:'Robotaxi', mid:'Attention', sub:'Post-launch' },
    { icon:'⚠️', big:'Labor', mid:'Policy', sub:'Pace risk' },
  ],
  ctx1: 'Install spikes are not citywide permits',
  ctx2: 'Pair ranks with paid trips and retention',
  quote: 'A travel-category #1 is demand attention. Uber already has a global network; Tesla is still geofenced—do not equate a daily chart with annual GMV.',
  noteSub: 'Post-launch ranks are noisy. Treat labor/regulatory friction as a separate axis and watch four-week average rank plus paid conversion. Attention is not revenue.',
  footer: 'TSLA · Robotaxi app',
});

add('starship-orbital-mass', 'L2', 'SPCX', {
  badge: 'SPCX', title: '역사적 궤도 질량과 중국 2026년 대비로 스타십 화물 스케일이 강조됐습니다',
  heroIcon: '🚀', heroBig: '22,196t',
  heroSub: '1957년 이후 약 7,117회 발사·궤도 투입 2만 2,196톤 이상입니다. 중국 2026년은 61회·저궤도 약 145톤입니다.',
  cards: [
    { label:'역사', big:'7,117', mid:'회 발사', sub:'1957년~' },
    { label:'중국26', big:'145t', mid:'저궤도', sub:'61회' },
    { label:'F14', big:'~60t', mid:'30기', sub:'중국연 ~41%' },
  ],
  detailHead: '스케일 산술',
  detailLines: ['📦 30회×150톤=하루 4,500톤 목표 산술','📅 닷새면 역사 누적 초과라는 상한 사고','📡 40기면 중국 2026년의 약 55%'],
  noteSub: '회당 150톤·하루 30회는 비전 산술이지 실적이 아닙니다. 중국 연간과 민간 1회 비행을 같은 분모에 두는 한계를 표시하고, 14번째 비행의 실제 위성·톤수와 발사대 케이던스를 다음에 확인하시기 바랍니다.',
  footer: '스페이스X · 궤도 질량',
}, {
  badge: 'SPCX', title: 'Starship scale contrasted with history since 1957 and China’s 2026 totals',
  heroIcon: '🚀', heroBig: '22,196t',
  heroSub: '~7,117 launches and >22,196 t to orbit historically; China 2026: 61 launches ~145 t LEO.',
  cards: [
    { label:'History', big:'7,117', mid:'launches', sub:'Since 1957' },
    { label:'CN26', big:'145t', mid:'LEO', sub:'61 flights' },
    { label:'F14', big:'~60t', mid:'30 sats', sub:'~41% of CN26' },
  ],
  detailHead: 'Scale arithmetic',
  detailLines: ['📦 30×150 t = 4,500 t/day goal math','📅 Five days > all history (ceiling thought)','📡 40 sats ~55% of China 2026'],
  noteSub: '150 t/flight and 30/day are vision math, not results. Flag the nation-vs-one-flight denominator issue and verify Flight 14 actual mass plus pad cadence next.',
  footer: 'SpaceX · orbital mass',
});

add('grok-47-enterprise', 'L2', 'AI', {
  badge: 'AI', title: '그록 4.7이 약 9월 12일 전후·2.1조 파라미터·기업 스택과 함께 거론됐습니다',
  heroIcon: '🤖', heroBig: '2.1T',
  heroSub: '파라미터 약 2.1조, 스페이스X 엔지니어링 데이터, 기업용 스택 가동이 같은 이야기입니다. 매출은 2025년 약 5억에서 2026년 20억 달러 목표입니다.',
  cards: [
    { label:'일정', big:'9/12', mid:'전후', sub:'공개 목표' },
    { label:'규모', big:'2.1조', mid:'파라미터', sub:'모델 표지' },
    { label:'매출', big:'$2B', mid:'2026', sub:'목표·추정' },
  ],
  detailHead: '무엇이 다른가',
  detailLines: ['🛰 스페이스X 엔지니어링 데이터 학습 언급','🏢 기업용 스택 가동(데모 넘어 계약 축)','💵 2025년 ~5억 → 2026년 20억 달러 목표'],
  noteSub: '파라미터 크기는 품질 보증이 아닙니다. 벤치마크·계약·전력 병목을 같이 보시고, 매출 목표는 가이던스성 수치로 감사 재무와 구분해 적으시기 바랍니다. 공개일이 밀리면 수주 캘린더도 같이 밀립니다.',
  footer: '인공지능 · 그록 4.7',
}, {
  badge: 'AI', title: 'Grok 4.7 cited around Sept 12 with 2.1T parameters and enterprise stack',
  heroIcon: '🤖', heroBig: '2.1T',
  heroSub: 'SpaceX engineering data and a live enterprise stack; revenue target ~$500M 2025 → $2B 2026.',
  cards: [
    { label:'Date', big:'9/12', mid:'window', sub:'Target' },
    { label:'Size', big:'2.1T', mid:'params', sub:'Label' },
    { label:'Rev', big:'$2B', mid:'2026', sub:'Target' },
  ],
  detailHead: 'What is new',
  detailLines: ['🛰 SpaceX engineering-data training cited','🏢 Enterprise stack live beyond chat demos','💵 ~$500M 2025 → $2B 2026 target'],
  noteSub: 'Parameter count is not quality. Pair benchmarks, contracts, and power bottlenecks; treat revenue targets as estimates until audited. Slippage moves the booking calendar.',
  footer: 'AI · Grok 4.7',
});

add('starbase-police-hire', 'L3', 'SPCX', {
  badge: 'SPCX', title: '스타베이스가 경찰을 채용하며 시작 연봉 9만 달러와 이전비 5천 달러를 내걸었습니다',
  heroIcon: '👮', heroBig: '$90k',
  heroSub: '발사·인구 증가에 맞춘 치안 인프라 채용 공고입니다. 이전 지원 5천 달러가 같이 표기됐습니다.',
  cards: [
    { icon:'💵', big:'$90,000', mid:'시작 연봉', sub:'경찰 공고' },
    { icon:'📦', big:'$5,000', mid:'이전비', sub:'정착 지원' },
    { icon:'🏗', big:'거점', mid:'도시화', sub:'지상 인프라' },
  ],
  quote: '스타베이스는 발사·생산이 몰린 텍사스 거점입니다. 치안 인력은 로켓 성능과 직접 같지는 않지만, 도로 통제·안전 구역·관광 인파 관리로 케이던스의 지상 병목을 줄입니다.',
  noteSub: '채용 공고는 충원 완료가 아닙니다. 선발·교육 시차를 두고, 인구·교통·발사 일정과 같은 표에 두시면 됩니다. 운영 성숙도 신호로 읽되 실적 대용치로 과장하지 마시기 바랍니다.',
  footer: '스페이스X · 스타베이스',
}, {
  badge: 'SPCX', title: 'Starbase is hiring police at $90,000 start plus $5,000 relocation',
  heroIcon: '👮', heroBig: '$90k',
  heroSub: 'Ground infrastructure hiring as launch cadence and headcount grow.',
  cards: [
    { icon:'💵', big:'$90,000', mid:'Start', sub:'Police post' },
    { icon:'📦', big:'$5,000', mid:'Relocation', sub:'Move support' },
    { icon:'🏗', big:'Hub', mid:'Urbanizing', sub:'Ground ops' },
  ],
  quote: 'Starbase needs traffic, safety zones, and crowd control as flights rise. Police hiring is ground capacity, not engine thrust—but it unblocks cadence.',
  noteSub: 'A job post is not filled seats. Allow hiring lag and track population, road closures, and flight dates together. Treat it as maturity signal, not earnings.',
  footer: 'SpaceX · Starbase',
});

add('fed-hold-vs-peer-hikes', 'L5', 'RATES', {
  badge: 'RATES', title: '연준이 9월에 주요국 가운데 유일하게 금리를 올리지 않을 수 있다는 대비가 나왔습니다',
  heroIcon: '🏦', heroBig: 'Fed',
  heroSub: '이번 주 유럽중앙은행, 이어 영란은행·일본은행 일정이 겹칩니다. 선진국 평균 정책금리는 약 5.8%에서 약 3.7%로 내려온 그림입니다.',
  before: { label:'2023초', big:'~5.8%', sub:'평균 고점' },
  after:  { label:'2026초', big:'~3.7%', sub:'평균 완화' },
  cards: [
    { icon:'🇪🇺', big:'ECB', mid:'이번 주', sub:'일정' },
    { icon:'🇬🇧', big:'BoE', mid:'다음', sub:'일정' },
    { icon:'🇯🇵', big:'BoJ', mid:'다음', sub:'일정' },
  ],
  quote: '연준만 동결에 가깝고 다른 곳이 인상하면 상대 금리 차로 달러와 자금 흐름이 달라질 수 있습니다. 평균 금리 하락은 긴축 정점 이후 큰 그림이지, 미국 경로와 동일하지는 않습니다.',
  noteSub: '「유일 동결」은 시나리오입니다. 회의 성명·물가·고용을 확인하고, 성장주·비트코인 반응을 금리와 같은 화면에 두되 미리 단정하지 마시기 바랍니다. 이미 가격에 반영된 기대와 결과를 분리하세요.',
  footer: '매크로 · 금리',
}, {
  badge: 'RATES', title: 'Fed may be the only major CB not hiking in September as peers meet',
  heroIcon: '🏦', heroBig: 'Fed',
  heroSub: 'ECB this week; BoE/BoJ next. Rich-country average policy rate ~5.8% early 2023 to ~3.7% early 2026.',
  before: { label:'Early 23', big:'~5.8%', sub:'Avg peak' },
  after:  { label:'Early 26', big:'~3.7%', sub:'Avg ease' },
  cards: [
    { icon:'🇪🇺', big:'ECB', mid:'This week', sub:'Calendar' },
    { icon:'🇬🇧', big:'BoE', mid:'Next', sub:'Calendar' },
    { icon:'🇯🇵', big:'BoJ', mid:'Next', sub:'Calendar' },
  ],
  quote: 'A Fed hold versus peer hikes can move relative rates, the dollar, and flows. The average-rate decline is the post-peak backdrop—not identical to the US path.',
  noteSub: '“Only hold” is a scenario. Read statements against inflation and jobs, and separate priced odds from outcomes for equities and Bitcoin.',
  footer: 'Macro · rates',
});

add('tsla-354-pullback', 'L1', 'TSLA', {
  badge: 'TSLA', title: '테슬라 주가가 354.08달러로 5.92% 빠지며 출시 주 이후 되돌림을 보였습니다',
  heroIcon: '📉', heroBig: '-5.92%',
  heroSub: '종가권 354.08달러입니다. 사이버캡·앱·전비 뉴스 다음 주의 가격 발견 구간으로 읽힙니다.',
  cards: [
    { icon:'💵', big:'$354.08', mid:'종가권', sub:'거래 숫자' },
    { icon:'📊', big:'-5.92%', mid:'하루', sub:'되돌림' },
    { icon:'🚕', big:'출시 주', mid:'이후', sub:'소화 구간' },
  ],
  quote: '현장 지표가 좋아도 주가는 할인된 미래입니다. 앱 1위·전비 6.1마일과 354.08달러를 한 문장으로 「모순」이라 단정하기보다 실행 표와 가격 표를 나누는 편이 낫습니다.',
  noteSub: '이벤트 다음 주 변동은 흔히 큽니다. 지수·금리 동행 여부, 거래량, 유료 마일 확인 일정을 같이 보시고 추격 매수·매도를 서두르지 마시기 바랍니다. 장기 테마 폐기로 읽지도, 낙폭만으로 확신을 키우지도 마세요.',
  footer: '테슬라 · 주가',
}, {
  badge: 'TSLA', title: 'Tesla printed $354.08, down 5.92%, after Cybercab week',
  heroIcon: '📉', heroBig: '-5.92%',
  heroSub: 'A post-event digestion print while app and efficiency headlines still circulated.',
  cards: [
    { icon:'💵', big:'$354.08', mid:'Print', sub:'Session' },
    { icon:'📊', big:'-5.92%', mid:'Day', sub:'Pullback' },
    { icon:'🚕', big:'Post', mid:'launch', sub:'Digestion' },
  ],
  quote: 'Strong field metrics and a red tape can coexist. Split the execution table from the price table instead of calling it a paradox.',
  noteSub: 'Post-event weeks are noisy. Check index/rate beta, volume, and paid-mile calendars before chasing. Do not retire the thesis on one day—or double conviction on the dip alone.',
  footer: 'TSLA · shares',
});

add('cybercab-airbnb-30k', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '💬 3만 달러 · 에어비앤비형',
  title: '사이버캡 구매가 3만 달러와 바퀴 달린 에어비앤비형 수동 소득 서사가 나왔습니다',
  heroIcon: '🏠', heroBig: '$30k',
  heroSub: '차를 사서 네트워크에 맡긴다는 소유·운영 분리 그림입니다. 규제·보험·이용률이 전제입니다.',
  cards: [
    { icon:'🛒', big:'$30,000', mid:'구매가', sub:'목표 앵커' },
    { icon:'🔑', big:'플릿', mid:'위탁', sub:'네트워크' },
    { icon:'📈', big:'수동', mid:'소득', sub:'이용률 전제' },
  ],
  quote: '에어비앤비 비유는 집을 빌려주듯 차를 맡긴다는 뜻입니다. 수익률 예시는 공차·보험·감가가 빠지면 달라지므로, 허가와 수수료가 열린 뒤에야 단위 경제를 검증할 수 있습니다.',
  noteSub: '3만 달러는 스티커 목표이지 실거래가 확정이 아닙니다. 개인 소유 참여 자격·보험 상품·도시 허가를 확인하고, 수동 소득 마케팅을 확정 현금흐름처럼 포트폴리오에 넣지 마시기 바랍니다.',
  footer: '테슬라 · 플릿 서사',
}, {
  badge: 'TSLA', badgeLine: '💬 $30k · Airbnb-on-wheels',
  title: '$30,000 Cybercab framed as Airbnb-on-wheels passive fleet income',
  heroIcon: '🏠', heroBig: '$30k',
  heroSub: 'Own the car, let the network operate it—subject to permits, insurance, and utilization.',
  cards: [
    { icon:'🛒', big:'$30,000', mid:'Buy', sub:'Sticker goal' },
    { icon:'🔑', big:'Fleet', mid:'Delegate', sub:'Network' },
    { icon:'📈', big:'Passive', mid:'Income', sub:'Util. first' },
  ],
  quote: 'The Airbnb analogy is asset utilization via a platform. Yields collapse if deadhead, insurance, and depreciation are ignored—validate only after fees and permits exist.',
  noteSub: '$30k is an anchor, not a closed transaction price. Check owner eligibility, insurance products, and city rules before treating passive-income decks as cash flow.',
  footer: 'TSLA · fleet framing',
});

add('cybercab-lightbar', 'L3', 'TSLA', {
  badge: 'TSLA', title: '사이버캡이 색이 바뀌는 라이트바와 실내 조명으로 내 차를 구분하게 합니다',
  heroIcon: '💡', heroBig: 'ID',
  heroSub: '기사 얼굴이 없는 무인차에서 승하차 혼선을 줄이려는 설계입니다. 앱 색과 실물이 맞춰져야 합니다.',
  cards: [
    { icon:'🌈', big:'라이트바', mid:'지붕', sub:'색 식별' },
    { icon:'✨', big:'실내', mid:'조명', sub:'재확인' },
    { icon:'📱', big:'앱', mid:'색 매칭', sub:'배차 UX' },
  ],
  quote: '라이트바는 우버의 핀·차량 번호와 같은 역할입니다. 색 불일치나 야간 가독성 문제는 탑승 시간을 늘려 회전율(시간당 승차)을 떨어뜨립니다.',
  noteSub: '작은 UX가 유닛 이코노믹스에 닿습니다. 오탑승·취소율 후기와 규제 등화 요건을 허가 문서와 대조하시고, 안전 표지등과 승객 식별 조명을 혼동하지 마시기 바랍니다.',
  footer: '테슬라 · 라이트바',
}, {
  badge: 'TSLA', title: 'Cybercab uses a colored light bar and cabin lighting for rider ID',
  heroIcon: '💡', heroBig: 'ID',
  heroSub: 'Visual matching replaces a driver waving—app color must match the car.',
  cards: [
    { icon:'🌈', big:'Lightbar', mid:'Roof', sub:'Color ID' },
    { icon:'✨', big:'Cabin', mid:'Lights', sub:'Confirm' },
    { icon:'📱', big:'App', mid:'Match', sub:'Pickup UX' },
  ],
  quote: 'Lightbars play the role of pins and plate checks. Mismatches or poor night readability add curb time and cut trips per hour.',
  noteSub: 'Tiny UX hits unit economics. Track wrong-car cancels and separate regulatory marker lights from rider-ID lighting in permit docs.',
  footer: 'TSLA · lightbar',
});

add('starship-f14-ready', 'L3', 'SPCX', {
  badge: 'SPCX', title: '스타십 14번째 비행을 위해 선박 41호기와 부스터 21호기 시험이 끝났습니다',
  heroIcon: '✅', heroBig: 'F14',
  heroSub: '선박은 내압·정적 연소, 부스터는 내압·33엔진 정적 연소를 마쳤습니다. 다음은 스택·결합·날짜입니다.',
  cards: [
    { icon:'🛰', big:'Ship 41', mid:'프루프+연소', sub:'완료' },
    { icon:'🔥', big:'B21', mid:'33엔진', sub:'정적 연소' },
    { icon:'📅', big:'Next', mid:'스택', sub:'날짜 대기' },
  ],
  quote: '내압은 탱크 구조 점검이고, 정적 연소는 고정 상태에서 엔진을 짧게 켜 보는 시험입니다. 둘을 통과해야 선박과 부스터를 쌓는 스택으로 넘어갑니다.',
  noteSub: '준비 완료와 카운트다운 시작은 다릅니다. 기상·공역·패드 일정으로 밀릴 수 있으니 롤아웃·발사 창 공지를 보시고, 시험 통과를 비행 성공으로 예단하지 마시기 바랍니다.',
  footer: '스페이스X · Flight 14',
}, {
  badge: 'SPCX', title: 'Ship 41 and Booster 21 finished proof and static fires for Flight 14',
  heroIcon: '✅', heroBig: 'F14',
  heroSub: 'Ship proof+static fire; booster proof+33-engine static fire; next stack, integrate, date.',
  cards: [
    { icon:'🛰', big:'Ship 41', mid:'Proof+SF', sub:'Done' },
    { icon:'🔥', big:'B21', mid:'33-eng', sub:'Static fire' },
    { icon:'📅', big:'Next', mid:'Stack', sub:'Date TBD' },
  ],
  quote: 'Proof tests structures; static fires light engines while held down. Both clear the path to stacking ship on booster.',
  noteSub: 'Hardware-ready is not a countdown. Weather, range, and pad slots can slip—watch rollout notices and do not equate passed tests with flight success.',
  footer: 'SpaceX · Flight 14',
});

add('tesla-unboxed-modules', 'L5', 'TSLA', {
  badge: 'TSLA', title: '언박스트 모듈 조립에서 모듈 담당이 병목이 되면 안 된다고 강조됐습니다',
  heroIcon: '🧩', heroBig: '모듈',
  heroSub: '차를 큰 덩어리로 나눠 병렬 조립하는 방식입니다. 한 팀이 막히면 라인 전체 택타임이 그 팀에 묶입니다.',
  before: { label:'병목', big:'한 팀', sub:'전체 정지' },
  after:  { label:'병렬', big:'모듈', sub:'흐름 유지' },
  cards: [
    { icon:'🏭', big:'언박스트', mid:'방식', sub:'병렬 조립' },
    { icon:'👤', big:'오너', mid:'책임', sub:'병목 금지' },
    { icon:'🚕', big:'사이버캡', mid:'단순', sub:'모듈 유리' },
  ],
  quote: '전통 한 줄 차체 흐름 대신 바닥·측벽 등을 따로 만든 뒤 합칩니다. 조직·공급·품질 게이트가 한곳에 몰리면 이론상 빠른 라인도 멈춥니다.',
  noteSub: '초당 몇 대 목표는 수율과 별개입니다. 실제 출하·재작업률·모듈 납기를 확인하고, 원가 모델에 수율 민감도를 넣어 두시기 바랍니다. 원칙 강조는 실행 언어이지 출하 확정이 아닙니다.',
  footer: '테슬라 · 언박스트',
}, {
  badge: 'TSLA', title: 'Unboxed modules: module owners must not become the bottleneck',
  heroIcon: '🧩', heroBig: 'Mods',
  heroSub: 'Parallel big sections; one blocked owner stalls the whole takt time.',
  before: { label:'Bottleneck', big:'One team', sub:'Line stops' },
  after:  { label:'Parallel', big:'Modules', sub:'Flow holds' },
  cards: [
    { icon:'🏭', big:'Unboxed', mid:'Method', sub:'Parallel' },
    { icon:'👤', big:'Owner', mid:'Duty', sub:'No choke' },
    { icon:'🚕', big:'Cybercab', mid:'Simple', sub:'Module-fit' },
  ],
  quote: 'Build floors and sides apart, then join. If org, supply, and quality gates pile onto one owner, a fast line still stops.',
  noteSub: 'Seconds-per-car targets are not yield. Track shipments, rework, and module lead times, and put yield sensitivity in cost models.',
  footer: 'TSLA · unboxed',
});

add('cybercab-ride-9251', 'L1', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 3시간 탑승 요금이 92.51달러로 우버 약 200달러와 비교됐습니다',
  heroIcon: '🧾', heroBig: '$92.51',
  heroSub: '최장 구간 약 40분, 완전자율주행 15버전은 흠 없었다는 주장, 핸들·페달·미러 없음, 픽업·하차 동선은 개선 필요라는 후기입니다.',
  cards: [
    { icon:'⏱', big:'3시간', mid:'탑승', sub:'영수증' },
    { icon:'💵', big:'$92.51', mid:'요금', sub:'vs Uber ~$200' },
    { icon:'🛣', big:'~40분', mid:'최장', sub:'한 구간' },
  ],
  quote: '한 장의 영수증은 강력하지만 지오펜스·할증에 따라 뒤집힐 수 있습니다. 주관적 「흠 없음」과 공식 안전 통계는 분리하고, 픽업·하차 동선은 회전율 이슈로 보시면 됩니다.',
  noteSub: '시간당·마일당으로 환산해 다른 탑승 표본이 나오는지를 보세요. 무핸들 하드웨어는 규제 경로가 다르고, 우버 대비 절반 가격이 반복될 때만 가격 서사가 단단해집니다.',
  footer: '테슬라 · 승차 요금',
}, {
  badge: 'TSLA', title: 'A three-hour Cybercab ride cost $92.51 versus Uber ~$200',
  heroIcon: '🧾', heroBig: '$92.51',
  heroSub: 'Longest leg ~40 min; FSD V15 claimed flawless; no wheel/pedals/mirrors; curb flow needs work.',
  cards: [
    { icon:'⏱', big:'3 hrs', mid:'Ride', sub:'Receipt' },
    { icon:'💵', big:'$92.51', mid:'Fare', sub:'vs Uber ~$200' },
    { icon:'🛣', big:'~40 min', mid:'Longest', sub:'One leg' },
  ],
  quote: 'One receipt is vivid but geofence and surge can flip it. Separate subjective “flawless” from official safety stats; treat awkward pickups as utilization drag.',
  noteSub: 'Normalize to per-mile and wait for more samples. Wheel-less hardware has a different permit path; price leadership needs repetition.',
  footer: 'TSLA · ride fare',
});

add('musk-equity-not-cash', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '💬 지분 · 유용성',
  title: '머스크가 현금 더미보다 스페이스X·테슬라 주식으로 가치가 묶여 있다고 말했습니다',
  heroIcon: '📈', heroBig: 'Equity',
  heroSub: '가치는 예상되는 유용성이 커질수록 오른다는 설명입니다. 창업자 부와 회사 전망이 같은 축입니다.',
  cards: [
    { icon:'🚀', big:'SpaceX', mid:'지분', sub:'비상장 축' },
    { icon:'🚗', big:'Tesla', mid:'지분', sub:'상장 축' },
    { icon:'💡', big:'유용성', mid:'기대', sub:'가치 프레임' },
  ],
  quote: '큰 현금 더미가 아니라 주식에 묶여 있으면, 개인 유동성 인상과 실제 담보·매도 공시를 구분해 봐야 합니다. 발언은 철학이고 가이던스는 공시입니다.',
  noteSub: '유용성 프레임은 로보택시·스타링크·인공지능 기대를 가리킵니다. 지분율·담보·희석을 문서로 확인하고, 키맨 리스크를 포트폴리오에 반영하시기 바랍니다. 발언을 매수 신호로 단정하지 마세요.',
  footer: '테슬라 · 창업자 발언',
}, {
  badge: 'TSLA', badgeLine: '💬 Equity · usefulness',
  title: 'Musk said wealth sits in SpaceX and Tesla equity, not a cash pile',
  heroIcon: '📈', heroBig: 'Equity',
  heroSub: 'Value rises with projected usefulness—founder wealth tied to company outlook.',
  cards: [
    { icon:'🚀', big:'SpaceX', mid:'Equity', sub:'Private' },
    { icon:'🚗', big:'Tesla', mid:'Equity', sub:'Public' },
    { icon:'💡', big:'Use', mid:'Outlook', sub:'Frame' },
  ],
  quote: 'Equity concentration is not a cash vault. Separate liquidity myths from pledge and sale filings; quotes are philosophy, filings are guidance.',
  noteSub: 'Usefulness points at robotaxi, Starlink, and AI expectations. Verify ownership, pledges, and dilution, and size key-man risk—do not treat the quote as a buy ticket.',
  footer: 'TSLA · founder quote',
});

add('consoles-in-tesla', 'L3', 'TSLA', {
  badge: 'TSLA', title: '플레이스테이션과 엑박스가 테슬라 차량에 연결된다는 설명이 나왔습니다',
  heroIcon: '🎮', heroBig: 'Plug',
  heroSub: '사이버캡처럼 운전석 없는 실내를 엔터테인먼트 공간으로 쓰는 그림과 맞습니다.',
  cards: [
    { icon:'🕹', big:'PS', mid:'연결', sub:'본체' },
    { icon:'🟩', big:'Xbox', mid:'연결', sub:'본체' },
    { icon:'🚕', big:'캐빈', mid:'경험', sub:'로보택시' },
  ],
  quote: '콘솔을 꽂으면 스트리밍보다 지연·화질에서 유리할 수 있습니다. 주행 중 이용 범위는 안전 설정에 따르며, 당장 자동차 마진을 바꾸지는 않습니다.',
  noteSub: '지원 차종·전력·발열과 주행 중 제한을 확인하세요. 경험 차별화 지표로 두고, 구독·제휴 매출이 언급될 때 실적 모델에 보조로만 반영하시기 바랍니다.',
  footer: '테슬라 · 차내 콘솔',
}, {
  badge: 'TSLA', title: 'PlayStation and Xbox will plug into Tesla vehicles',
  heroIcon: '🎮', heroBig: 'Plug',
  heroSub: 'Fits Cybercab’s cabin-as-entertainment idea when no driver seat occupies the front.',
  cards: [
    { icon:'🕹', big:'PS', mid:'Plug-in', sub:'Console' },
    { icon:'🟩', big:'Xbox', mid:'Plug-in', sub:'Console' },
    { icon:'🚕', big:'Cabin', mid:'UX', sub:'Robotaxi' },
  ],
  quote: 'Local consoles can beat cloud latency. Safety modes may limit use while moving, and this does not rewrite auto margins overnight.',
  noteSub: 'Check supported models, power/thermal limits, and drive-time restrictions. Keep it as UX differentiation until subscription economics appear.',
  footer: 'TSLA · consoles',
});

add('macro-payrolls-debt-40t', 'L2', 'MACRO', {
  badge: 'MACRO', title: '8월 비농업 고용 +16만 2천 명과 미국 부채 40조 달러 대비가 강조됐습니다',
  heroIcon: '📊', heroBig: '+162k',
  heroSub: '가계조사 고용 +50만 명 이상, 주당 노동시간 증가, 헤드라인 물가 3.7% 대 다른 지표 2%대, 부채 40조 대 경제 약 30조 달러입니다.',
  cards: [
    { label:'고용', big:'+162k', mid:'비농업', sub:'8월' },
    { label:'부채', big:'$40T', mid:'미국', sub:'vs ~$30T 경제' },
    { label:'물가', big:'3.7%', mid:'헤드라인', sub:'다른 축 ~2%' },
  ],
  detailHead: '같은 화면의 다른 축',
  detailLines: ['👥 가계조사 고용 +50만+ · 노동시간 증가','📈 주식 사상 최고권과 재정 부담 동시','₿ 비트코인이 금 헤지 프레임에서 벗어난다는 해석'],
  noteSub: '두 고용 조사는 어긋날 수 있어 나란히 적으세요. 물가 지표 선택이 연준 해석을 바꾸고, 부채 대비는 장기 할인율 논쟁입니다. 비트코인·주식을 고용 한 줄로 같은 방향 단정하지 마시기 바랍니다.',
  footer: '매크로 · 고용·부채',
}, {
  badge: 'MACRO', title: 'August payrolls +162k with US debt near $40T versus a ~$30T economy',
  heroIcon: '📊', heroBig: '+162k',
  heroSub: 'Household employment +500k+; workweek up; headline inflation 3.7% vs other measures nearer 2%.',
  cards: [
    { label:'Jobs', big:'+162k', mid:'NFP', sub:'August' },
    { label:'Debt', big:'$40T', mid:'US', sub:'vs ~$30T GDP' },
    { label:'CPI', big:'3.7%', mid:'Headline', sub:'Alt ~2%' },
  ],
  detailHead: 'Same screen, other axes',
  detailLines: ['👥 Household +500k+ and longer workweek','📈 Equities near ATH beside fiscal weight','₿ BTC framed as breaking from gold hedge'],
  noteSub: 'Payroll surveys can diverge—log both. Which inflation print the Fed cites matters, and debt/GDP is a long-rate debate. Do not shove BTC and stocks onto one jobs headline.',
  footer: 'Macro · jobs & debt',
});

add('hyundai-steel-spacex', 'L5', 'SPCX', {
  badge: 'SPCX', title: '현대 회장이 루이지애나 58억 달러 공장 강재가 스페이스X에 쓰이기를 바란다고 했습니다',
  heroIcon: '🔩', heroBig: '$5.8B',
  heroSub: '공급 계약 확정이 아니라 산업 협력 비전입니다. 로켓 소재는 인증이 까다롭습니다.',
  before: { label:'지금', big:'희망', sub:'발언' },
  after:  { label:'나중', big:'인증', sub:'계약 필요' },
  cards: [
    { icon:'🏭', big:'$5.8B', mid:'루이지애나', sub:'공장 투자' },
    { icon:'🚀', big:'SpaceX', mid:'희망', sub:'로켓 강재' },
    { icon:'📄', big:'미확인', mid:'계약', sub:'비전 단계' },
  ],
  quote: '「언젠가」라는 말은 규격·인증·계약 전 단계입니다. 자동차·에너지 강재와 항공우주 합금은 공정이 달라, 희망과 수주를 한 줄로 적지 마시기 바랍니다.',
  noteSub: '공장 가동 일정과 양해각서·공시만 실적 후보로 두세요. 지정학·미국 내 소재 정책은 배경이고, 현대 실적과 발사 실적을 한 거래로 묶지 마시기를 권합니다.',
  footer: '스페이스X · 소재 비전',
}, {
  badge: 'SPCX', title: 'Hyundai chairman hoped $5.8B Louisiana steel might one day serve SpaceX',
  heroIcon: '🔩', heroBig: '$5.8B',
  heroSub: 'A cooperation vision, not a confirmed supply contract—rocket alloys need certification.',
  before: { label:'Now', big:'Hope', sub:'Quote' },
  after:  { label:'Later', big:'Certify', sub:'Need deal' },
  cards: [
    { icon:'🏭', big:'$5.8B', mid:'Louisiana', sub:'Plant' },
    { icon:'🚀', big:'SpaceX', mid:'Hope', sub:'Rocket steel' },
    { icon:'📄', big:'Unconf.', mid:'Contract', sub:'Vision' },
  ],
  quote: '“One day” means pre-spec, pre-cert, pre-contract. Auto steel and flight alloys are different processes—do not book hope as orders.',
  noteSub: 'Only plant timelines and filings are earnings candidates. Keep geopolitics as backdrop and do not merge Hyundai results with launch cadence in one trade.',
  footer: 'SpaceX · materials vision',
});

add('housing-cant-afford', 'L6', 'RATES', {
  badge: 'MACRO', breaking: '검색 · 사상 최고',
  title: '「집을 살 수 없다」검색이 금융위기 고점을 넘어 사상 최고를 기록했습니다',
  heroBig: 'ATH',
  heroSub: '구글 트렌드 기준으로 글로벌 금융위기 당시보다 높습니다. 구매력 스트레스의 온도계입니다.',
  grid: [
    { icon:'🏠', big:'검색', mid:'최고', sub:'역사' },
    { icon:'📉', big:'GFC', mid:'상회', sub:'비교' },
    { icon:'💰', big:'금리', mid:'가격', sub:'소득' },
    { icon:'📊', big:'체감', mid:'불안', sub:'소비·정치' },
  ],
  ctx1: '검색은 빠르지만 미디어·언어에 휘둘릴 수 있습니다',
  ctx2: '거래량·연체·모기지 금리와 같이 보시면 왜곡이 줄어듭니다',
  quote: '주식·비트코인이 강한데 주거 검색이 최악이면 자산 효과와 실생활 체감이 어긋난 구간일 수 있습니다. 공급 부족이 있으면 가격은 버티고 「못 사겠다」만 커질 수도 있습니다.',
  noteSub: '이 지표만으로 주택 폭락을 예단하지 마세요. 모기지 금리·가격지수·임금·임대료를 한 표에 두고, 은행 연체와 정책 뉴스를 다음에 확인하시면 됩니다. 단기 매매 신호보다 스트레스 온도계로 쓰시기 바랍니다.',
  footer: '매크로 · 주거 구매력',
}, {
  badge: 'MACRO', breaking: 'SEARCH · ATH',
  title: '“Can’t Afford Home” Google searches hit an all-time high above the GFC',
  heroBig: 'ATH',
  heroSub: 'A fast stress gauge for housing affordability—rate, price, and income still decide outcomes.',
  grid: [
    { icon:'🏠', big:'Search', mid:'ATH', sub:'History' },
    { icon:'📉', big:'GFC', mid:'Above', sub:'Compare' },
    { icon:'💰', big:'Rates', mid:'Prices', sub:'Incomes' },
    { icon:'📊', big:'Stress', mid:'Feel', sub:'Politics' },
  ],
  ctx1: 'Search is fast but media-noisy',
  ctx2: 'Pair with sales, delinquencies, and mortgage rates',
  quote: 'Risk assets can rally while housing stress prints worst-ever—wealth effects and lived costs diverge. Tight supply can hold prices while “can’t afford” keeps rising.',
  noteSub: 'Do not forecast a crash from search alone. Tab mortgage rates, prices, wages, and rents; watch bank delinquency and policy next. Use it as a thermometer, not a trade trigger.',
  footer: 'Macro · housing affordability',
});

add('nvda-99b-stakes', 'L1', 'NVDA', {
  badge: 'NVDA', title: '엔비디아 지분 투자 규모가 약 990억 달러에 이르렀다는 집계가 나왔습니다',
  heroIcon: '💼', heroBig: '$99B',
  heroSub: '칩 판매를 넘어 전략적 기술 후원자 역할이 커졌다는 해석입니다. 취득원가와 시가는 다를 수 있습니다.',
  cards: [
    { icon:'💵', big:'$99B', mid:'지분', sub:'합계 집계' },
    { icon:'🔗', big:'생태계', mid:'자본', sub:'수요 묶기' },
    { icon:'📉', big:'평가', mid:'변동', sub:'손익 노이즈' },
  ],
  quote: '플랫폼 기업이 고객·스타트업에 자본으로 참여하면 표준과 수요를 같이 키울 수 있습니다. 동시에 평가 손익이 분기 실적을 흔들 수 있어 본업 매출과 열을 나눠야 합니다.',
  noteSub: '공시 주석의 정의(시가 vs 원가)를 확인하고, 피투자와 칩 주문 연결·규제 시선을 다음에 보세요. 포트폴리오 규모만으로 실적 가속이라고 단정하지 마시기 바랍니다.',
  footer: '엔비디아 · 지분 투자',
}, {
  badge: 'NVDA', title: 'Nvidia equity investments were tallied near $99 billion',
  heroIcon: '💼', heroBig: '$99B',
  heroSub: 'A strategic backer footprint beyond chip shipments—mark-to-market may differ from cost.',
  cards: [
    { icon:'💵', big:'$99B', mid:'Stakes', sub:'Tallied' },
    { icon:'🔗', big:'Ecosystem', mid:'Capital', sub:'Demand tie' },
    { icon:'📉', big:'Marks', mid:'Noise', sub:'P&L swing' },
  ],
  quote: 'Equity can lock standards and demand in an AI stack, but fair-value swings can jolt quarterly other income—split that from core chip revenue.',
  noteSub: 'Read footnote definitions (FV vs cost), then map portfolio names to chip pull-through and regulatory attention. Size alone is not acceleration.',
  footer: 'NVDA · equity stakes',
});

add('robotaxi-1m-merge75', 'L2', 'TSLA', {
  badge: 'TSLA', title: '로보택시 무인 100만 마일·앱 1위와 합병 확률 75%가 같은 주에 겹쳤습니다',
  heroIcon: '🚕', heroBig: '1M',
  heroSub: '무인 주행 100만 마일과 여행 앱 1위는 실행·관심 축입니다. 2028년 전 테슬라·스페이스X 합병 약 75%는 예측 시장 베팅입니다.',
  cards: [
    { label:'마일', big:'1M', mid:'무인', sub:'누적 이정표' },
    { label:'앱', big:'#1', mid:'여행', sub:'관심' },
    { label:'합병', big:'75%', mid:'예측', sub:'2028년 전' },
  ],
  detailHead: '축을 나누세요',
  detailLines: ['✅ 100만 마일은 안전·학습 이정표','📱 앱 1위는 설치·관심 지표','🎲 합병 75%는 공시 전 베팅'],
  noteSub: '예측 시장 확률을 이사회 결정처럼 취급하지 마세요. 무인 마일의 유료·지오펜스 정의를 확인하고, 운영 지표와 기업구조 스토리를 표의 다른 열에 두시기 바랍니다.',
  footer: '테슬라 · 마일·구조',
}, {
  badge: 'TSLA', title: '1M unsupervised miles and app #1 met a 75% merge-odds narrative',
  heroIcon: '🚕', heroBig: '1M',
  heroSub: 'Execution and attention on one side; a prediction-market Tesla–SpaceX merge chance before 2028 on the other.',
  cards: [
    { label:'Miles', big:'1M', mid:'Unsup.', sub:'Milestone' },
    { label:'App', big:'#1', mid:'Travel', sub:'Attention' },
    { label:'Merge', big:'75%', mid:'Odds', sub:'Pre-2028' },
  ],
  detailHead: 'Split the axes',
  detailLines: ['✅ 1M miles = safety/data milestone','📱 App #1 = install attention','🎲 75% = pre-filing bet'],
  noteSub: 'Prediction odds are not board votes. Confirm whether miles are paid and geofenced, and keep ops metrics off the corporate-structure column.',
  footer: 'TSLA · miles & structure',
});

add('cybercab-eps-faster', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '💬 의견 · 예측',
  title: '사이버캡이 모델3보다 빨리 이익에 기여할 것이라는 전망이 나왔습니다',
  heroIcon: '📑', heroBig: '의견',
  heroSub: '모델3 램프보다 짧은 시간에 주당이익에 의미 있는 비중이 된다는 비교 예측입니다. 확정이 아닙니다.',
  cards: [
    { icon:'🏷', big:'의견', mid:'라벨', sub:'필수' },
    { icon:'🚗', big:'모델3', mid:'비교', sub:'과거 램프' },
    { icon:'🚕', big:'사이버캡', mid:'기여', sub:'속도 가설' },
  ],
  quote: '소프트웨어·네트워크 마진이 하드웨어 램프보다 급하다는 논리입니다. 구체적 비중·분기가 없으면 방향성 의견이므로 실적 세그먼트가 나오기 전 시나리오 칸에만 두시기 바랍니다.',
  noteSub: '출시 직후 낙관이 주가에 먼저 반영되기 쉽습니다. 유료 마일·요금·원가 표와 실적 자료를 기다리고, 이 항목만으로 포지션 전부를 걸지 마시기 바랍니다. 의견과 가이던스를 섞지 마세요.',
  footer: '테슬라 · EPS 전망(의견)',
}, {
  badge: 'TSLA', badgeLine: '💬 Opinion · prediction',
  title: 'Claim: Cybercab becomes material to earnings faster than Model 3',
  heroIcon: '📑', heroBig: 'Take',
  heroSub: 'A comparative prediction—not a filing. Label it as opinion until segments print.',
  cards: [
    { icon:'🏷', big:'Opinion', mid:'Label', sub:'Required' },
    { icon:'🚗', big:'Model 3', mid:'Compare', sub:'Past ramp' },
    { icon:'🚕', big:'Cybercab', mid:'EPS', sub:'Speed bet' },
  ],
  quote: 'The logic is software/network margins ramping faster than car production hell. Without % and quarters it is directional—keep it in scenarios until earnings segments exist.',
  noteSub: 'Launch optimism prices early. Wait for paid miles and filings; do not size the whole book on this take, and do not mix opinion with guidance.',
  footer: 'TSLA · EPS claim (opinion)',
});

add('waymo-3b-debt', 'L6', 'GOOGL', {
  badge: 'WAYMO', breaking: '부채 · 첫 조달',
  title: '웨이모가 첫 부채로 30억 달러를 넘는 조달을 추진한다는 보도가 나왔습니다',
  heroBig: '>$3B',
  heroSub: '무등급이며 벤치마크 대비 500bp를 웃도는 금리가 붙을 수 있다는 설명이 있습니다. 글로벌 로보택시 확대 자본으로 읽힙니다.',
  grid: [
    { icon:'💳', big:'>$3B', mid:'부채', sub:'첫 조달' },
    { icon:'🏛', big:'신용', mid:'대형', sub:'투자자' },
    { icon:'📉', big:'500bp+', mid:'스프레드', sub:'가능성' },
    { icon:'🌍', big:'글로벌', mid:'확대', sub:'목적' },
  ],
  ctx1: '최종 금액·금리는 클로징을 봐야 합니다',
  ctx2: '테슬라 자기자본 모델과 자본 구조가 다릅니다',
  quote: '지분·모회사 지원에서 부채 시장으로 확장하는 단계입니다. 고스프레드는 실행·신용 리스크 프리미엄이고, 이자·만기 압력이 커지면 확장 속도가 조절될 수 있습니다.',
  noteSub: '경쟁사 조달은 산업 파이 확대일 수도, 점유 경쟁 가속일 수도 있습니다. 확정 조건·알파벳 지원 여부·주간 마일·도시 수를 확인하고, 스프레드 수치를 확정 사실처럼 단정하지 마시기 바랍니다.',
  footer: '웨이모 · 부채 조달',
}, {
  badge: 'WAYMO', breaking: 'DEBT · FIRST RAISE',
  title: 'Waymo’s first debt raise was reported above $3 billion',
  heroBig: '>$3B',
  heroSub: 'Unrated; could price more than 500 bps over benchmark; capital framed for global robotaxi lead.',
  grid: [
    { icon:'💳', big:'>$3B', mid:'Debt', sub:'First' },
    { icon:'🏛', big:'Credit', mid:'Large', sub:'Buyers' },
    { icon:'📉', big:'500bp+', mid:'Spread', sub:'Possible' },
    { icon:'🌍', big:'Global', mid:'Scale', sub:'Use' },
  ],
  ctx1: 'Size and coupon finalize at close',
  ctx2: 'Different capital stack than Tesla equity/fleet sales',
  quote: 'Moving from equity/parent support into credit markets. Wide spreads price execution risk; coupons and maturities can throttle expansion if losses stay wide.',
  noteSub: 'Rival funding can grow the pie or the race. Confirm final terms, parent support, and weekly miles/cities—do not treat indicative spreads as closed facts.',
  footer: 'Waymo · debt raise',
});

add('per-mile-economics', 'L5', 'TSLA', {
  badge: 'TSLA', title: '마일당 비교에서 사이버캡 운용 20센트가 가장 낮은 끝에 놓였습니다',
  heroIcon: '📏', heroBig: '$0.20',
  heroSub: '뉴욕 택시 약 3.50달러부터 장기 전망 0.25달러까지 한 스택입니다. 요금과 원가 정의가 섞일 수 있습니다.',
  before: { label:'현재권', big:'$3+', sub:'택시·웨이모' },
  after:  { label:'목표권', big:'$0.20', sub:'사이버캡 운용' },
  cards: [
    { icon:'🚕', big:'$3.50', mid:'NYC 택시', sub:'마일당' },
    { icon:'🟣', big:'$3.16', mid:'웨이모', sub:'마일당' },
    { icon:'🟢', big:'$0.20', mid:'사이버캡', sub:'운용 주장' },
  ],
  quote: '미국 호출 약 2.80달러, 개인차 0.77달러, 중국 호출 0.50달러, 장기 리서치 전망 0.25달러가 사이 값입니다. 승객 요금과 사업자 원가를 같은 칸에 두지 마시기 바랍니다.',
  noteSub: '갭을 메우는 속도가 투자 논쟁입니다. 테슬라 영수증을 마일당으로 환산하고, 보험·회송 포함 여부를 표시한 뒤 중국·미국 가격을 분리해 적으시기 바랍니다. 목표를 현재 요금처럼 인용하지 마세요.',
  footer: '테슬라 · 마일당 경제',
}, {
  badge: 'TSLA', title: 'Per-mile stack put Cybercab opex near $0.20 at the low end',
  heroIcon: '📏', heroBig: '$0.20',
  heroSub: 'From NYC taxi ~$3.50 through long-run robotaxi views near $0.25—watch fare vs opex labels.',
  before: { label:'Today', big:'$3+', sub:'Taxi/Waymo' },
  after:  { label:'Target', big:'$0.20', sub:'Cybercab opex' },
  cards: [
    { icon:'🚕', big:'$3.50', mid:'NYC taxi', sub:'per mile' },
    { icon:'🟣', big:'$3.16', mid:'Waymo', sub:'per mile' },
    { icon:'🟢', big:'$0.20', mid:'Cybercab', sub:'opex claim' },
  ],
  quote: 'US ride-hail ~$2.80, personal car $0.77, China ride-hail $0.50, long-run research view $0.25 sit in between. Do not mix passenger fares with operator opex in one cell.',
  noteSub: 'The gap-closure speed is the debate. Normalize Tesla receipts per mile, flag insurance/deadhead, and split China vs US—never quote targets as today’s street fares.',
  footer: 'TSLA · per-mile economics',
});

add('fsd-v1439-safety', 'L3', 'TSLA', {
  badge: 'TSLA', title: '완전 자율주행 감독 14.3.9가 충돌 임박 때 자동으로 개입한다고 설명됐습니다',
  heroIcon: '🛡', heroBig: '14.3.9',
  heroSub: '자동긴급제동만으로 부족할 때, 또는 심하게 산만·실수로 해제된 경우에도 시스템이 켜질 수 있습니다.',
  cards: [
    { icon:'🚨', big:'충돌', mid:'임박', sub:'자동 개입' },
    { icon:'🛑', big:'AEB', mid:'부족 시', sub:'추가 안전망' },
    { icon:'👁', big:'산만', mid:'해제', sub:'재개입' },
  ],
  quote: '감독 모드이므로 운전자 책임은 유지됩니다. 안전망이 두꺼워질수록 과신 리스크도 커져, 제품 안내와 사용자 교육이 같이 가야 합니다.',
  noteSub: '버전 번호를 로보택시 무인 허가와 동일시하지 마세요. 공식 릴리즈 노트·분기 안전 보고서·리콜 여부를 확인하고, 주관 후기와 통계를 분리해 적으시기 바랍니다.',
  footer: '테슬라 · FSD 14.3.9',
}, {
  badge: 'TSLA', title: 'FSD Supervised v14.3.9 auto-activates if a crash is imminent',
  heroIcon: '🛡', heroBig: '14.3.9',
  heroSub: 'When AEB is not enough—and also if the driver is heavily distracted or accidentally disengages.',
  cards: [
    { icon:'🚨', big:'Crash', mid:'Imminent', sub:'Auto-on' },
    { icon:'🛑', big:'AEB', mid:'Insufficient', sub:'Extra net' },
    { icon:'👁', big:'Distract', mid:'Disengage', sub:'Re-enter' },
  ],
  quote: 'Supervised means driver duty remains. Thicker safety nets can raise complacency—product copy and education must travel together.',
  noteSub: 'Do not equate a version bump with unsupervised robotaxi approval. Read release notes and quarterly safety reports; split anecdotes from statistics.',
  footer: 'TSLA · FSD 14.3.9',
});

};
