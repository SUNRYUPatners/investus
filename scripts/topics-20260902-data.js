// 2026-09-02 SVG topic data — consumed by gen-reports-20260902.js
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.02 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'기가 텍사스 북캠퍼스 반도체 연면적이 약 697만 평방피트로 공개됐습니다',
      sub:'오스틴 팹 489,600·코텍스 2.0 46,400 SF, 완공 목표 2029년 12월 31일입니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'DELL', title:'델이 주당순이익 7.04달러·매출 469억 달러로 예상을 크게 상회했습니다',
      sub:'예상 주당순이익 4.92달러·매출 445억 달러 대비 AI 서버 수요가 반영된 결과로 읽힙니다.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'오스틴 사이버캡 45대, 지오펜스 약 264제곱마일, 9월 3일 행사 D-1입니다',
      sub:'골든 캡과 함께 지오펜스가 약 9% 확대됐으며 전용 무인 차량 행사가 하루 앞입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'궤도 연산 10GW·2030년 매출 1조 달러 서사와 F14 9월 15일 전후 일정이 겹칩니다',
      sub:'V3 위성 10배·FCC 42.0~42.5GHz STA와 데이터센터 팀 변동도 같은 우주·AI 흐름입니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'AI', title:'앤스로픽 350억 달러 람다 계약·구글 396MW 지열·웨이모 14개 도시 유료 승차가 부각됐습니다',
      sub:'텍사스 헛8·엔비디아 GPU, 유타 페르보 지열, 덴버·샌디에이고·탬파 유료 승차가 AI 인프라·자율주행 축입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'44', title:'공포·탐욕 지수 44, 1주 전 56(탐욕)에서 하락했습니다',
      sub:'애플의 OpenAI 증거 파기 주장과 함께 9월 3일·15일 일정 앞 심리 둔화 변수입니다.' },
  ],
  caption: '더 볼 것: 기가텍사스 6.97M SF · DELL EPS $7.04 · Cybercab 45 D-1 · F14 9/15 · Anthropic $35B · Waymo 14 cities · F&G 44',
}, {
  headline: '2026.09.02 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Giga Texas North Campus semiconductor cited at ~6.97M sq ft',
      sub:'Austin Fab 489,600 SF, Cortex 2.0 46,400 SF; completion target Dec 31, 2029.' },
    { color:'#60a5fa', fill:'#0a1420', right:'DELL', title:'Dell beat with EPS $7.04 vs $4.92 and revenue $46.9B vs $44.5B',
      sub:'AI server demand may be flowing into prints ahead of Sept 3 Cybercab.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Austin Cybercab fleet at 45, geofence ~264 sq mi; event D-1 Sept 3',
      sub:'Golden cabs cited with ~9% geofence expansion ahead of the dedicated event.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'Orbital compute 10 GW / ~$1T revenue narrative overlaps F14 ~Sept 15',
      sub:'V3 10x, FCC STA 42.0-42.5 GHz, and datacenter team shakeup in the same arc.' },
    { color:'#a78bfa', fill:'#120b1f', right:'AI', title:'Anthropic $35B Lambda, Google 396MW Fervo geothermal, Waymo 14 cities',
      sub:'Hut 8 Texas GPUs, Utah geothermal, Denver/SD/Tampa paid rides anchor AI infra.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'44', title:'Fear & Greed fell to 44 from 56 (greed) a week ago',
      sub:'Apple alleging OpenAI destroyed evidence adds legal overhang into Sept 3/15.' },
  ],
  caption: 'Also: Giga Texas 6.97M SF · DELL EPS $7.04 · Cybercab 45 D-1 · F14 Sept 15 · Anthropic $35B · Waymo 14 · F&G 44',
});

add('tesla-giga-texas-semiconductor', 'L2', 'TSLA', {
  badge: 'TSLA', title: '기가 텍사스 북캠퍼스 반도체 단지 연면적이 약 697만 평방피트로 공개됐습니다',
  heroIcon: '🏭', heroBig: '6.97M SF',
  heroSub: '오스틴 팹 489,600평방피트, 코텍스 2.0 46,400평방피트, 완공 목표 2029년 12월 31일입니다. 반도체 팹은 차량·칩·소프트웨어 수직 통합의 물리적 규모를 보여 줍니다.',
  cards: [
    { label:'북캠퍼스', big:'6,974,854', mid:'SF 연면적', sub:'텍사스 캠퍼스 전체 규모' },
    { label:'오스틴 팹', big:'489,600', mid:'SF', sub:'웨이퍼 가공 핵심 면적' },
    { label:'완공', big:'2029', mid:'12월 31일', sub:'달력 목표일' },
  ],
  detailHead: '왜 면적이 뉴스인가',
  detailLines: ['🏭 팹 연면적은 클린룸·설비·유틸리티를 포함합니다','⚡ 전력·용수·허가가 가동 일정을 좌우합니다','🚗 9/3 사이버캡과 같은 주에 실행 메시지가 겹칩니다'],
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'TSLA · 기가텍사스 반도체',
}, {
  badge: 'TSLA', title: 'Giga Texas North Campus semiconductor footprint cited at ~6.97 million sq ft',
  heroIcon: '🏭', heroBig: '6.97M SF',
  heroSub: 'Austin Fab 489,600 SF, Cortex 2.0 46,400 SF, completion target Dec 31, 2029.',
  cards: [
    { label:'North', big:'6,974,854', mid:'Total SF', sub:'Campus scale' },
    { label:'Fab', big:'489,600', mid:'SF', sub:'Wafer processing footprint' },
    { label:'Target', big:'2029', mid:'Dec 31', sub:'Calendar goal' },
  ],
  detailHead: 'Why footprint matters',
  detailLines: ['🏭 Fab SF includes cleanroom and tools','⚡ Power and permits gate ramp','🚗 Overlaps Sept 3 Cybercab week'],
  noteSub: 'Footprint is not production—track permits, tool orders, and yield ramp each quarter. Sept 3 Cybercab and Sept 15 F14 add volatility.',
  footer: 'TSLA · Giga Texas semi',
});

add('dell-earnings', 'L1', 'NVDA', {
  badge: 'DELL', title: '델이 주당순이익 7.04달러로 예상 4.92달러를 크게 상회했습니다',
  heroIcon: '💻', heroBig: 'EPS $7.04',
  heroSub: '매출 469억 달러로 예상 445억 달러를 넘겼습니다. AI 서버·스토리지 믹스가 실적 상회의 배경으로 거론됩니다.',
  cards: [
    { icon:'📈', big:'$7.04', mid:'주당순이익', sub:'예상 $4.92 대비 상회' },
    { icon:'💰', big:'$46.9B', mid:'매출', sub:'예상 $44.5B 대비' },
    { icon:'🖥️', big:'AI', mid:'서버·스토리지', sub:'인프라 수요 반영' },
  ],
  quote: '주당순이익(EPS)은 순이익을 발행 주식 수로 나눈 값입니다. 매출 469억 달러 상회는 수량·가격·제품 믹스가 함께 작용했을 수 있습니다. 세그먼트별 영업이익으로 AI 기여도를 확인하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'DELL · 실적 상회',
}, {
  badge: 'DELL', title: 'Dell reported EPS of $7.04 vs $4.92 consensus; revenue $46.9B vs $44.5B',
  heroIcon: '💻', heroBig: 'EPS $7.04',
  heroSub: 'Revenue beat may reflect AI server and storage mix—check segment margins on the call.',
  cards: [
    { icon:'📈', big:'$7.04', mid:'EPS', sub:'vs $4.92 est.' },
    { icon:'💰', big:'$46.9B', mid:'Revenue', sub:'vs $44.5B est.' },
    { icon:'🖥️', big:'AI', mid:'Servers', sub:'Infrastructure demand' },
  ],
  quote: 'EPS divides net income by shares outstanding. The revenue beat needs segment operating income to show how much AI servers contributed.',
  noteSub: 'Treat the print as one quarter—track backlog, ASP, and AI server shipments next. Cybercab and FOMC add macro noise this week.',
  footer: 'DELL · earnings beat',
});

add('panw-earnings', 'L1', 'NVDA', {
  badge: 'PANW', title: '팔로알토네트웍스가 주당순이익 1.02달러·매출 34.1억 달러로 예상을 상회했습니다',
  heroIcon: '🛡️', heroBig: 'EPS $1.02',
  heroSub: '예상 주당순이익 0.98달러, 매출 33.5억 달러를 각각 상회했습니다. 사이버보안 지출은 AI 확대와 함께 필수 항목으로 분류되는 경우가 많습니다.',
  cards: [
    { icon:'📊', big:'$1.02', mid:'EPS', sub:'vs $0.98 est.' },
    { icon:'💵', big:'$3.41B', mid:'매출', sub:'vs $3.35B est.' },
    { icon:'🔒', big:'보안', mid:'플랫폼', sub:'갱신·신규 계약' },
  ],
  quote: '소폭 상회이지만 가이던스·연간 반복 매출(ARR)이 방향을 가늠하는 지표입니다. 기업 IT 예산이 AI로 쏠릴 때 보안 비중이 유지되는지 확인하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'PANW · 실적',
}, {
  badge: 'PANW', title: 'Palo Alto Networks beat EPS $1.02 vs $0.98 and revenue $3.41B vs $3.35B',
  heroIcon: '🛡️', heroBig: 'EPS $1.02',
  heroSub: 'Modest beats still matter—watch ARR and next-quarter guide as AI capex competes for IT budgets.',
  cards: [
    { icon:'📊', big:'$1.02', mid:'EPS', sub:'vs $0.98' },
    { icon:'💵', big:'$3.41B', mid:'Revenue', sub:'vs $3.35B' },
    { icon:'🔒', big:'Security', mid:'Platform', sub:'Renewals and logos' },
  ],
  quote: 'Small beats are validated by ARR and guidance. Check whether security spend holds as AI projects absorb IT dollars.',
  noteSub: 'Compare with Fortinet and CrowdStrike to see sector vs share shifts. Macro sentiment (Fear & Greed 44) may cap multiples near term.',
  footer: 'PANW · earnings',
});

add('tsla-fsd-v14-china-internal', 'L3', 'TSLA', {
  badge: 'TSLA', title: '중국 상하이 기가에서 FSD V14 직원 대상 내부 시험 미확인 보도가 나왔습니다',
  heroIcon: '🇨🇳', heroBig: 'FSD V14',
  heroSub: '직원 거의 전원 대상 내부 시험이라는 전언입니다. 공식 승인·공시가 아닌 미확인 보도이며, 미국 사이버캡과 지역·규제 축이 다릅니다.',
  cards: [
    { icon:'🏭', big:'상하이', mid:'기가팩토리', sub:'Giga Shanghai' },
    { icon:'👥', big:'직원', mid:'내부 시험', sub:'미확인 보도' },
    { icon:'📋', big:'V14', mid:'소프트웨어', sub:'미국과 별개' },
  ],
  quote: '중국 FSD 상용 승인은 미국 fleet 숫자와 별개입니다. 루머 단계에서는 공식 확인·규제 문서를 우선하시기 바랍니다.',
  noteSub: '미확인 보도입니다. 9/3 오스틴 사이버캡·중국 V14 시험은 같은 날짜라도 스토리를 분리해 추적하시기 바랍니다.',
  footer: 'TSLA · 중국 FSD V14',
}, {
  badge: 'TSLA', title: 'Unconfirmed: FSD V14 internal employee testing at Giga Shanghai',
  heroIcon: '🇨🇳', heroBig: 'FSD V14',
  heroSub: 'Alleged near-company-wide internal test—not official approval; separate from US Cybercab.',
  cards: [
    { icon:'🏭', big:'Shanghai', mid:'Giga', sub:'China hub' },
    { icon:'👥', big:'Staff', mid:'Internal', sub:'Unconfirmed' },
    { icon:'📋', big:'V14', mid:'Software', sub:'vs US fleet' },
  ],
  quote: 'China FSD approval is a separate regulatory track from Austin Cybercab counts.',
  noteSub: 'Treat as rumor until official confirmation. Track US and China autonomy on separate lines.',
  footer: 'TSLA · China FSD V14',
});

add('cybercab-45-golden', 'L5', 'TSLA', {
  badge: 'TSLA', title: '오스틴 사이버캡 45대, 지오펜스 약 264제곱마일, 9월 3일 행사 D-1입니다',
  heroIcon: '🚕', heroBig: '45대 · D-1',
  heroSub: '골든 캡과 함께 지오펜스가 약 9% 확대됐습니다. 사이버캡은 운전석 없는 전용 로보택시 차량입니다.',
  before: { label:'이전', big:'~242 sq mi', sub:'더 좁은 운행 구역' },
  after:  { label:'9/2', big:'~264 sq mi', sub:'약 9% 확대' },
  cards: [
    { icon:'🚗', big:'45', mid:'사이버캡', sub:'오스틴 등록' },
    { icon:'✨', big:'골든', mid:'시범 차량', sub:'브랜드·시연용' },
    { icon:'📅', big:'9/3', mid:'행사', sub:'전용 차량 공개' },
  ],
  quote: '등록 대수와 지오펜스 면적은 「상용화 속도」를 가늠하는 공개 지표입니다. D-1 구간은 기대가 최대일 때이므로 행사 후 무인 영상·허가 범위를 확인하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'TSLA · 사이버캡 45',
}, {
  badge: 'TSLA', title: 'Austin Cybercab at 45 units, geofence ~264 sq mi; Cybercab event D-1',
  heroIcon: '🚕', heroBig: '45 · D-1',
  heroSub: 'Golden cabs cited with ~9% geofence expansion ahead of the Sept 3 dedicated event.',
  before: { label:'Prior', big:'~242 sq mi', sub:'Smaller geofence' },
  after:  { label:'Sept 2', big:'~264 sq mi', sub:'~+9% area' },
  cards: [
    { icon:'🚗', big:'45', mid:'Cybercab', sub:'Austin count' },
    { icon:'✨', big:'Golden', mid:'Demo units', sub:'Brand/show cars' },
    { icon:'📅', big:'Sept 3', mid:'Event', sub:'Dedicated unveil' },
  ],
  quote: 'Fleet count and geofence area are public execution gauges. D-1 is peak expectations—verify unmanned footage and permits after the event.',
  noteSub: 'Separate golden demo cars from paid fleet. Track daily registration and unmanned mileage share through September.',
  footer: 'TSLA · Cybercab 45',
});

add('spacex-1t-orbital-compute', 'L6', 'SPCX', {
  badge: 'SPCX', breaking: '2030 · 10GW 궤도 연산',
  title: '스페이스X가 2030년 궤도 연산으로 1조 달러 매출 목표가 거론됐습니다',
  heroBig: '10 GW',
  heroSub: '궤도 연산 10기가와트, 매출 3,000억~5,000억 달러 전망이 합쳐져 1조 달러 서사로 읽힐 수 있습니다.',
  grid: [
    { icon:'🛰️', big:'10 GW', mid:'궤도 연산', sub:'우주 DC 규모' },
    { icon:'💵', big:'$300-500B', mid:'매출 구간', sub:'2030 전망' },
    { icon:'🚀', big:'F14', mid:'9/15', sub:'발사 cadence' },
    { icon:'📡', big:'V3', mid:'10×', sub:'위성 용량' },
  ],
  ctx1: '지상 데이터센터 전력 병목과 맞물린 우주 연산 내러티브입니다',
  ctx2: 'GW·매출 숫자는 계획이며 궤도 투입·전원 투입 후에야 확인됩니다',
  quote: '궤도 연산(orbital compute)은 위성에 연산 장비를 올려 우주에서 AI 처리를 하는 구상입니다. 10GW는 대형 데이터센터 단지 여러 개 규모입니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'SPCX · 궤도 연산',
}, {
  badge: 'SPCX', breaking: '2030 · 10 GW ORBITAL',
  title: 'SpaceX ~$1T revenue narrative cites 10 GW orbital compute by 2030',
  heroBig: '10 GW',
  heroSub: '$300-500B revenue band plus other lines can read as a ~$1T total target.',
  grid: [
    { icon:'🛰️', big:'10 GW', mid:'Orbital', sub:'Space DC scale' },
    { icon:'💵', big:'$300-500B', mid:'Revenue', sub:'2030 band' },
    { icon:'🚀', big:'F14', mid:'Sept 15', sub:'Launch cadence' },
    { icon:'📡', big:'V3', mid:'10×', sub:'Sat capacity' },
  ],
  ctx1: 'Tied to ground DC power bottlenecks',
  ctx2: 'Plans until powered GW is on orbit',
  quote: 'Orbital compute puts AI hardware in space—10 GW is several hyperscale campuses worth of power.',
  noteSub: 'Split launch cadence from compute revenue. Datacenter team changes are an execution watch item this week.',
  footer: 'SPCX · orbital compute',
});

add('spacex-datacenter-shakeup', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '⚡ 데이터센터 팀 · 실행 리스크',
  title: '스페이스X 데이터센터 팀 인사 변동이 궤도 연산 실행 리스크를 부각했습니다',
  heroIcon: '👥', heroBig: '팀 변동',
  heroSub: '조직·인사 변동은 프로젝트 우선순위와 일정에 영향을 줄 수 있습니다. 궤도 연산 로드맵과 지상 파일럿을 함께 봐야 합니다.',
  cards: [
    { icon:'🏢', big:'DC팀', mid:'인사 변동', sub:'실행 불확실성' },
    { icon:'🛰️', big:'궤도', mid:'연산', sub:'10GW 서사' },
    { icon:'📅', big:'F14', mid:'9/15', sub:'발사 일정' },
  ],
  quote: '비상장 기업은 분기 공시가 없어 채용·파트너·발사 일정이 간접 지표가 됩니다. 인사 변동 자체가 실패를 뜻하지는 않지만 일정 리스크를 키울 수 있습니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'SPCX · DC 팀',
}, {
  badge: 'SPCX', badgeLine: '⚡ Datacenter team · execution',
  title: 'SpaceX datacenter team shakeup highlights orbital compute execution risk',
  heroIcon: '👥', heroBig: 'Shakeup',
  heroSub: 'Leadership moves can shift priorities for orbital compute and ground pilots.',
  cards: [
    { icon:'🏢', big:'DC team', mid:'Changes', sub:'Execution risk' },
    { icon:'🛰️', big:'Orbital', mid:'Compute', sub:'10 GW narrative' },
    { icon:'📅', big:'F14', mid:'Sept 15', sub:'Launch window' },
  ],
  quote: 'With no quarterly filings, hires, partners, and launch dates are the dashboard. Shakeup is not failure but can delay timelines.',
  noteSub: 'Track stabilization signals alongside F14 and V3 FCC STA. Separate launch success from compute service revenue.',
  footer: 'SPCX · DC team',
});

add('tesla-europe-sales', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '프랑스 +279% · 덴마크 +104%',
  title: '테슬라 프랑스 8월 판매가 전년 대비 279%·덴마크 104% 증가했습니다',
  heroBig: '+279%',
  heroSub: '유럽 국가별 등록 대수 급증은 보조금·가격·기저 효과가 섞일 수 있습니다. 분기 추이로 검증하시기 바랍니다.',
  grid: [
    { icon:'🇫🇷', big:'+279%', mid:'프랑스 8월', sub:'YoY 등록' },
    { icon:'🇩🇰', big:'+104%', mid:'덴마크 8월', sub:'YoY 등록' },
    { icon:'🚗', big:'EV', mid:'경쟁', sub:'유럽 현지 브랜드' },
    { icon:'📅', big:'9/3', mid:'사이버캡', sub:'글로벌 이벤트' },
  ],
  ctx1: '국가별 스파이크는 전체 유럽 추세와 다를 수 있습니다',
  ctx2: '9/3 행사와 겹치며 글로벌 수요 내러티브를 보강할 수 있습니다',
  quote: '전년 대비 %가 크면 기저가 낮았거나 일회성 요인이 있을 수 있습니다. 독일·노르웨이 등 다른 시장과 함께 보시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'TSLA · 유럽 판매',
}, {
  badge: 'TSLA', breaking: 'FRANCE +279% · DENMARK +104%',
  title: 'Tesla France August sales +279% YoY; Denmark +104% YoY',
  heroBig: '+279%',
  heroSub: 'National spikes may mix subsidies, pricing, and base effects—confirm on quarterly trends.',
  grid: [
    { icon:'🇫🇷', big:'+279%', mid:'France Aug', sub:'YoY regs' },
    { icon:'🇩🇰', big:'+104%', mid:'Denmark Aug', sub:'YoY regs' },
    { icon:'🚗', big:'EV', mid:'Competition', sub:'Local OEMs' },
    { icon:'📅', big:'Sept 3', mid:'Cybercab', sub:'Global event' },
  ],
  ctx1: 'Country spikes ≠ all of Europe',
  ctx2: 'Cybercab week may amplify global demand narrative',
  quote: 'Large YoY % can reflect a low base or one-offs. Read France/Denmark with Germany and Norway.',
  noteSub: 'Track monthly registrations and ASP by country. Berlin factory mix remains a medium-term variable.',
  footer: 'TSLA · Europe sales',
});

add('starship-f14-v3-fcc', 'L3', 'SPCX', {
  badge: 'SPCX', title: '스타십 F14가 9월 15일 2026년 전후 첫 궤도 비행 후보입니다',
  heroIcon: '🚀', heroBig: 'F14 · 9/15',
  heroSub: 'V3 위성 10배 용량, FCC STA 42.0~42.5GHz 대역이 상용 배치 관문입니다.',
  cards: [
    { icon:'🚀', big:'F14', mid:'첫 궤도', sub:'9/15 전후' },
    { icon:'🛰️', big:'V3', mid:'10×', sub:'위성 용량' },
    { icon:'📋', big:'FCC', mid:'42 GHz', sub:'STA 허가' },
  ],
  quote: '궤도 비행은 대기권을 넘어 한 바퀴 도는 시험으로, 이전 최대고도 시험과 단계가 다릅니다. 허가·발사·궤도 투입을 분리해 기록하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'SPCX · F14 · V3',
}, {
  badge: 'SPCX', title: 'Starship Flight 14 may be first orbital around Sept 15, 2026; V3 10x; FCC STA 42.0-42.5 GHz',
  heroIcon: '🚀', heroBig: 'F14 · Sept 15',
  heroSub: 'V3 ~10x capacity with FCC STA 42.0-42.5 GHz as the regulatory gate.',
  cards: [
    { icon:'🚀', big:'F14', mid:'First orbital', sub:'~Sept 15' },
    { icon:'🛰️', big:'V3', mid:'10×', sub:'Sat throughput' },
    { icon:'📋', big:'FCC', mid:'42 GHz', sub:'STA clearance' },
  ],
  quote: 'Orbital flight is a different gate than high-altitude tests—log permit, launch, and deployment separately.',
  noteSub: 'F14 overlaps Cybercab (Sept 3) and FOMC (Sept 15-16)—expect cross-asset volatility. Watch static fire and launch window next.',
  footer: 'SPCX · F14 · V3',
});

add('anthropic-lambda-hut8', 'L4', 'AI', {
  badge: 'AI', badgeLine: '💬 Anthropic · $35B Lambda · Hut 8 Texas',
  title: '앤스로픽이 람다와 350억 달러 계약·텍사스 헛8·엔비디아 GPU를 맞췄습니다',
  heroIcon: '🧠', heroBig: '$35B',
  heroSub: 'AI 모델 학습·추론은 GPU 수만 장과 GW 전력이 필요합니다. 계약은 착공·전원 투입 전까지는 계획입니다.',
  cards: [
    { icon:'🤝', big:'$35B', mid:'Lambda', sub:'장기 계약' },
    { icon:'🏭', big:'Hut 8', mid:'Texas DC', sub:'전력·부지' },
    { icon:'🔲', big:'NVDA', mid:'GPU', sub:'가속기 공급' },
  ],
  quote: '350억 달러 규모는 AI 인프라 capex가 모델 회사에서 인프라 파트너로 전가되는 구조를 보여 줍니다. powered GW와 GPU 가동률로 검증하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'AI · Anthropic Lambda',
}, {
  badge: 'AI', badgeLine: '💬 Anthropic · $35B Lambda · Hut 8',
  title: 'Anthropic $35B Lambda deal ties Hut 8 Texas datacenter and NVIDIA GPUs',
  heroIcon: '🧠', heroBig: '$35B',
  heroSub: 'Training and inference need massive GPU fleets and GW power—contracts are plans until powered on.',
  cards: [
    { icon:'🤝', big:'$35B', mid:'Lambda', sub:'Long-term deal' },
    { icon:'🏭', big:'Hut 8', mid:'Texas site', sub:'Power and land' },
    { icon:'🔲', big:'NVDA', mid:'GPUs', sub:'Accelerator supply' },
  ],
  quote: 'The $35B scale shows AI capex shifting to infra partners—verify powered GW and GPU utilization each quarter.',
  noteSub: 'Texas power and permits are gating items alongside GPU lead times. Compare with CoreWeave and other neoclouds on price and availability.',
  footer: 'AI · Anthropic Lambda',
});

add('google-fervo-geothermal', 'L2', 'GOOGL', {
  badge: 'GOOGL', title: '구글이 유타 페르보 지열 396메가와트 프로젝트에 참여합니다',
  heroIcon: '♨️', heroBig: '396 MW',
  heroSub: '지열은 24시간 전력을 공급할 수 있어 AI 데이터센터 baseload(기저전력) 후보입니다.',
  cards: [
    { label:'규모', big:'396 MW', mid:'지열', sub:'유타 페르보' },
    { label:'24h', big:'기저', mid:'안정 전력', sub:'태양광 보완' },
    { label:'DC', big:'AI', mid:'전력 병목', sub:'GW 단위 수요' },
  ],
  detailHead: '왜 지열인가',
  detailLines: ['♨️ EGS(향상형 지열)로 24시간 전력','⚡ AI DC는 연속 가동 전력이 필요','📋 허가·시추·송전이 일정 변수'],
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'GOOGL · Fervo 지열',
}, {
  badge: 'GOOGL', title: 'Google joins Fervo 396MW geothermal project in Utah',
  heroIcon: '♨️', heroBig: '396 MW',
  heroSub: 'Geothermal can provide 24/7 baseload power for AI data centers.',
  cards: [
    { label:'Scale', big:'396 MW', mid:'Geothermal', sub:'Fervo Utah' },
    { label:'24h', big:'Baseload', mid:'Stable power', sub:'Complements solar' },
    { label:'DC', big:'AI', mid:'Bottleneck', sub:'GW demand' },
  ],
  detailHead: 'Why geothermal',
  detailLines: ['♨️ Enhanced geothermal for 24/7 power','⚡ AI campuses need continuous electrons','📋 Permits and transmission gate timelines'],
  noteSub: '396 MW is an announcement until electrons flow—track drilling, interconnection, and PPA structure. Pairs with Google DC GW plans.',
  footer: 'GOOGL · Fervo geothermal',
});

add('waymo-14-cities', 'L6', 'GOOGL', {
  badge: 'GOOGL', breaking: '14개 도시 · 유료 승차',
  title: '웨이모가 14개 도시에서 유료 승차를 확대합니다',
  heroBig: '14 cities',
  heroSub: '덴버·샌디에이고·탬파 유료 승차가 거론됩니다. 9월 3일 테슬라 사이버캡와 경쟁 프레임이 강해집니다.',
  grid: [
    { icon:'🏙️', big:'14', mid:'도시', sub:'서비스 중' },
    { icon:'💳', big:'유료', mid:'승차', sub:'상용 전환' },
    { icon:'🚕', big:'DEN', mid:'Denver', sub:'신규 시장' },
    { icon:'📅', big:'9/3', mid:'Cybercab', sub:'TSLA 이벤트' },
  ],
  ctx1: '유료 승차는 마일당 손익 검증 단계입니다',
  ctx2: '도시마다 허가·지도·날씨가 달라 확장 속도도 다릅니다',
  quote: '로보택시는 「몇 대」와 「유료 마일」이 함께 올라가야 상용화로 읽힙니다. fleet 표의 차량 수·면적을 주간 추적하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'Waymo · 14 cities',
}, {
  badge: 'GOOGL', breaking: '14 CITIES · PAID RIDES',
  title: 'Waymo expands paid rides across 14 cities including Denver, San Diego, Tampa',
  heroBig: '14 cities',
  heroSub: 'Paid rides mark the shift from demo to commercial miles—Cybercab on Sept 3 tightens the TSLA vs Waymo frame.',
  grid: [
    { icon:'🏙️', big:'14', mid:'Cities', sub:'In service' },
    { icon:'💳', big:'Paid', mid:'Rides', sub:'Commercial step' },
    { icon:'🚕', big:'DEN', mid:'Denver', sub:'New market' },
    { icon:'📅', big:'Sept 3', mid:'Cybercab', sub:'TSLA event' },
  ],
  ctx1: 'Paid rides test unit economics per mile',
  ctx2: 'Permits and maps differ by city',
  quote: 'Robotaxi scale needs both vehicle count and paid unmanned miles—track the fleet table weekly.',
  noteSub: 'Compare Waymo paid miles with Tesla Austin geofence and registration counts through September.',
  footer: 'Waymo · 14 cities',
});

add('youtube-amazon-tagging', 'L3', 'AMZN', {
  badge: 'AMZN', title: '유튜브가 아마존 제품 태깅으로 쇼핑·광고 수익을 넓힙니다',
  heroIcon: '📺', heroBig: '태깅',
  heroSub: '영상에 아마존 제품을 태그해 구매로 연결합니다. 크리에이터 수익·플랫폼 커머스 경쟁 변수입니다.',
  cards: [
    { icon:'🛒', big:'태그', mid:'제품 링크', sub:'시청→구매' },
    { icon:'📈', big:'ARPU', mid:'수익 다변화', sub:'광고 외 축' },
    { icon:'⚖️', big:'규제', mid:'플랫폼', sub:'반독점 변수' },
  ],
  quote: '쇼핑 태깅은 틱톡·인스타 커머스와 경쟁합니다. 전환율·수수료율·크리에이터 참여도가 매출로 이어지는지 확인하시기 바랍니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'YouTube · Amazon 태깅',
}, {
  badge: 'AMZN', title: 'YouTube Amazon product tagging expands shopping and ad revenue',
  heroIcon: '📺', heroBig: 'Tagging',
  heroSub: 'Tags link videos to Amazon products—creator fees and commerce mix are the watch items.',
  cards: [
    { icon:'🛒', big:'Tags', mid:'Product links', sub:'View to buy' },
    { icon:'📈', big:'ARPU', mid:'Diversification', sub:'Beyond ads' },
    { icon:'⚖️', big:'Rules', mid:'Platform', sub:'Antitrust lens' },
  ],
  quote: 'Shopping tags compete with TikTok and Instagram commerce—track conversion, take rates, and creator adoption.',
  noteSub: 'Small near-term revenue but strategic for platform lock-in. Watch policy changes in EU/US alongside ad growth rates.',
  footer: 'YouTube · Amazon tagging',
});

add('fear-greed-44', 'L5', 'MACRO', {
  badge: 'MACRO', title: '공포·탐욕 지수가 44로 1주 전 56(탐욕)에서 하락했습니다',
  heroIcon: '📉', heroBig: '44',
  heroSub: '0에 가까울수록 공포, 100에 가까울수록 탐욕입니다. 단독 매매 신호보다 맥락 참고용입니다.',
  before: { label:'1주 전', big:'56', sub:'탐욕 구간' },
  after:  { label:'9/2', big:'44', sub:'중립 아래' },
  cards: [
    { icon:'📊', big:'44', mid:'지수', sub:'심리 둔화' },
    { icon:'📅', big:'9/3', mid:'사이버캡', sub:'변동성 이벤트' },
    { icon:'📈', big:'VIX', mid:'함께 확인', sub:'변동성 지표' },
  ],
  quote: '56→44는 탐욕에서 중립 아래로의 이동입니다. FOMC·고용 앞 관망 심리와 맞물릴 수 있습니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: '매크로 · Fear & Greed',
}, {
  badge: 'MACRO', title: 'Fear & Greed Index fell to 44 from 56 (greed) a week ago',
  heroIcon: '📉', heroBig: '44',
  heroSub: 'Sentiment cooled below neutral—use with VIX and credit spreads, not alone.',
  before: { label:'1 week ago', big:'56', sub:'Greed zone' },
  after:  { label:'Sept 2', big:'44', sub:'Below neutral' },
  cards: [
    { icon:'📊', big:'44', mid:'Index', sub:'Cooling mood' },
    { icon:'📅', big:'Sept 3', mid:'Cybercab', sub:'Vol catalyst' },
    { icon:'📈', big:'VIX', mid:'Cross-check', sub:'Vol gauge' },
  ],
  quote: 'A move from 56 to 44 is greed to below-neutral—not a crash signal but lighter risk appetite.',
  noteSub: 'Prices can lead sentiment. Pair with Sept 4 jobs and Sept 15-16 FOMC for macro direction.',
  footer: 'Macro · Fear & Greed',
});

add('apple-openai-evidence', 'L4', 'AAPL', {
  badge: 'AAPL', badgeLine: '⚖️ 소송 · AI 파트너십',
  title: '애플이 OpenAI가 소송 증거를 파기했다고 주장했습니다',
  heroIcon: '⚖️', heroBig: '증거 파기',
  heroSub: '법원 판단 전까지는 절차 리스크로 보시기 바랍니다. AI 기능 통합 일정에 지연이 생기면 서비스 매출 기대가 바뀔 수 있습니다.',
  cards: [
    { icon:'🍎', big:'Apple', mid:'주장', sub:'증거 파기' },
    { icon:'🤖', big:'OpenAI', mid:'소송', sub:'법적 리스크' },
    { icon:'📱', big:'Siri', mid:'AI 일정', sub:'제품 변수' },
  ],
  quote: '증거 파기 주장은 판결 전 절차 이슈입니다. 애플·OpenAI·MSFT·구글 간 AI 파트너십 경쟁에 법적 마찰이 겹칩니다.',
  noteSub: '이 소식은 단기 주가뿐 아니라 실행 일정과 분기 실적로 검증해야 합니다. 전문 용어는 공식 발표·가이던스·규제 문서로 정의를 확인하시기 바랍니다. 9월 3일 사이버캡·9월 15일 F14·FOMC 전후 변동성에 대비하시면 됩니다.',
  footer: 'AAPL · OpenAI 소송',
}, {
  badge: 'AAPL', badgeLine: '⚖️ Litigation · AI partnership',
  title: 'Apple alleges OpenAI destroyed evidence in litigation',
  heroIcon: '⚖️', heroBig: 'Evidence',
  heroSub: 'Treat as procedural risk until courts rule—AI feature timelines could slip if legal friction grows.',
  cards: [
    { icon:'🍎', big:'Apple', mid:'Claim', sub:'Destroyed evidence' },
    { icon:'🤖', big:'OpenAI', mid:'Case', sub:'Legal overhang' },
    { icon:'📱', big:'Siri', mid:'AI roadmap', sub:'Product risk' },
  ],
  quote: 'Evidence claims are pre-judgment procedure—AI partnerships among Apple, OpenAI, Microsoft, and Google face regulatory scrutiny too.',
  noteSub: 'Separate litigation headlines from product ship dates. Watch court filings alongside Sept platform events.',
  footer: 'AAPL · OpenAI legal',
});

};
