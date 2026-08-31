// 2026-09-01 SVG topic data — consumed by gen-reports-20260901.js
module.exports = function (add) {

/* ══════════════════════════ 미국 · 15 ══════════════════════════ */

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.01 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'텍사스 로보택시 차량이 5일 만에 124대 늘어 누적 314대에 도달했습니다',
      sub:'사이버캡 7→45대, 모델Y 269대. 9월 3일 오스틴 사이버캡 전용 행사가 이틀 앞으로 다가왔습니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX',  title:'스타링크 V3 위성과 스타십 14번째 비행(F14)이 9월 15일 전후로 겹칠 수 있습니다',
      sub:'V3는 용량이 약 10배 커지고 FCC 허가가 F14 발사와 맞물립니다. 위성망과 발사 cadence가 같은 달에 확인됩니다.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'테슬라 주가가 4.4~5.51% 급등하며 시가총액 약 540억 달러가 늘었습니다',
      sub:'옵티머스 1년에 100만 대 생산 목표와 모델S·X 라인 해체가 함께 거론됐습니다. 로보택시·로봇 내러티브가 겹칩니다.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'완전자율주행(FSD) 누적 주행거리가 140억 마일을 넘었습니다',
      sub:'13억→14억 마일은 약 24일 만에 달성됐고, 통계상 인간 운전 대비 약 7배 안전하다는 데이터가 함께 제시됐습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'NVDA',  title:'삼성전자 메모리 capacity의 약 70%를 2031년까지 NVDA·MSFT·GOOGL에 공급할 수 있다는 전망이 나왔습니다',
      sub:'HBM3E 현물가는 계약가 대비 약 5배 수준으로, 고대역폭 메모리 품귀가 가격·믹스로 이어지는 구간입니다.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD',  title:'금 보유액이 미국 달러를 넘어 세계 최대 준비자산으로 거론됐습니다',
      sub:'중앙은행·기관의 달러 의존 축소와 지정학 리스크가 겹치며, 안전자산 포트폴리오 재편 논의가 커졌습니다.' },
  ],
  caption: '더 볼 것: 로보택시 314대 · V3/F14 9/15 · TSLA +5% · FSD 140억 mi · 삼성 HBM 70% · 금>USD 준비자산',
}, {
  headline: '2026.09.01 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'Texas robotaxi fleet rose 124 in five days to 314 vehicles',
      sub:'Cybercab 7→45, Model Y 269. The Sept 3 Austin Cybercab event is two days away.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX',  title:'Starlink V3 and Starship Flight 14 may overlap around Sept 15',
      sub:'V3 targets ~10x capacity with FCC clearance tied to F14. Satellite and launch cadence align in the same month.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'Tesla rallied 4.4–5.51%, adding roughly $54B in market cap',
      sub:'Optimus targets 1M units/year at Fremont while Model S/X lines are dismantled—robotaxi and robotics overlap.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'Full Self-Driving cumulative miles passed 14 billion',
      sub:'13B→14B in ~24 days; data cited ~7x safer than human driving on the same metric.' },
    { color:'#60a5fa', fill:'#0a1420', right:'NVDA',  title:'Samsung may supply ~70% of memory capacity through 2031 to NVDA, MSFT, and GOOGL',
      sub:'HBM3E spot trades near ~5x contract levels as high-bandwidth memory tightness hits price and mix.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD',  title:'Gold holdings are discussed as overtaking USD as the largest global reserve asset',
      sub:'Central-bank diversification and geopolitics are reshaping safe-asset portfolios.' },
  ],
  caption: 'Also: robotaxi 314 · V3/F14 Sept 15 · TSLA +5% · FSD 14B mi · Samsung HBM 70% · gold vs USD reserves',
});

add('starlink-wagenborg', 'L3', 'SPCX', {
  badge: 'SPCX',
  title: '로얄 와겐보르크 선박 약 160척에 스타링크 해상 서비스가 확대될 수 있습니다',
  heroIcon: '🚢', heroBig: '~160척',
  heroSub: '북해·대서양 화물선에 위성 인터넷을 붙이면 항로 밖 구간에서도 선박·화물 데이터를 실시간으로 보낼 수 있습니다.',
  cards: [
    { icon:'🛰️', big:'스타링크',   mid:'해상용 안테나',     sub:'저궤도 위성망으로 바다 위 연결' },
    { icon:'🚢', big:'~160척',    mid:'로얄 와겐보르크',   sub:'유럽·북미 항로를 오가는 선단' },
    { icon:'📡', big:'실시간',    mid:'선박·화물 데이터',  sub:'지연 없이 육상으로 전송' },
  ],
  quote: '해상 스타링크(Starlink Maritime)는 항구·연안이 아니라 원양 구간에서도 인터넷을 쓰게 해 줍니다. 약 160척 규모 선단에 확대되면 「연결」이 「운항·연료·화물 추적 데이터」로 이어집니다. 위성 인터넷은 이미 가정용을 넘어 산업용 수요로 확장 중입니다.',
  noteSub: '선박 연결은 스타링크 수익의 새 축입니다. 가정용 가입자 수만큼 B2B·해상·항공 계약이 쌓이면 ARPU(가입자당 매출) 구조가 달라집니다. 다음에는 선박당 요금·데이터 사용량·경쟁 위성 서비스와의 가격 비교를 확인하시면 됩니다. 해상 확대는 V3 위성 용량 증가와 같은 맥락입니다.',
  footer: 'SPCX · 스타링크 해상',
}, {
  badge: 'SPCX',
  title: 'Starlink maritime service may expand to about 160 Royal Wagenborg vessels',
  heroIcon: '🚢', heroBig: '~160',
  heroSub: 'Satellite internet on cargo routes lets ships send operational and cargo data from open ocean, not just near shore.',
  cards: [
    { icon:'🛰️', big:'Starlink',  mid:'Maritime dish',     sub:'Low-Earth orbit links at sea' },
    { icon:'🚢', big:'~160',      mid:'Royal Wagenborg',   sub:'Fleet on North Sea and Atlantic routes' },
    { icon:'📡', big:'Real-time', mid:'Vessel data',       sub:'Lower latency to shore systems' },
  ],
  quote: 'Starlink Maritime brings connectivity beyond ports and coastal waters. Scaling to ~160 vessels turns connectivity into operational, fuel, and cargo-tracking data. Satellite internet is moving from consumer to industrial demand.',
  noteSub: 'Maritime links are a new revenue line. As B2B, maritime, and aviation contracts stack up, ARPU mix can shift. Watch per-vessel pricing, data usage, and rival satellite pricing. Maritime expansion aligns with higher V3 satellite capacity.',
  footer: 'SPCX · Starlink maritime',
});

add('texas-robotaxi-fleet', 'L5', 'TSLA', {
  badge: 'TSLA',
  title: '텍사스 로보택시 차량이 5일 만에 124대 늘어 누적 314대에 도달했습니다',
  heroIcon: '🚕', heroBig: '+124 / 5일',
  heroSub: '사이버캡 7→45대, 모델Y 269대. 9월 3일 오스틴 사이버캡 행사 직전 fleet 확장 속도가 가시화됐습니다.',
  before: { label:'5일 전', big:'190대', sub:'누적 차량이 더 적었습니다' },
  after:  { label:'9/1 기준', big:'314대', sub:'124대가 새로 추가됐습니다' },
  cards: [
    { icon:'🚗', big:'45',       mid:'사이버캡',          sub:'7대에서 45대로 증가' },
    { icon:'🚙', big:'269',      mid:'모델Y',             sub:'기존 차량 기반 fleet' },
    { icon:'📅', big:'9/3',      mid:'오스틴 행사',       sub:'전용 무인 차량 공개' },
  ],
  quote: '로보택시 fleet(차량 대수)는 「언젠가 상용화」가 아니라 「지금 몇 대가 도로에 있는가」로 읽힙니다. 5일 만에 124대 증가는 배치 속도가 빨라지고 있다는 신호입니다. 사이버캡 비중이 7→45로 늘었다는 점은 전용 차량 비중도 함께 올라가고 있음을 보여 줍니다.',
  noteSub: '차량 수는 허가 범위·안전 기록·무인 운행 비율과 함께 봐야 합니다. 9월 3일 행사 전후로 fleet 숫자가 또 바뀔 수 있으니, 일별 추이와 운행 구역 지도를 함께 추적하시면 됩니다. 장기적으로는 마일당 비용과 차량 가동률이 fleet 규모만큼 중요합니다.',
  footer: 'TSLA · 텍사스 로보택시',
}, {
  badge: 'TSLA',
  title: 'The Texas robotaxi fleet added 124 vehicles in five days to reach 314 total',
  heroIcon: '🚕', heroBig: '+124 / 5d',
  heroSub: 'Cybercab rose 7→45 and Model Y stands at 269 as fleet growth becomes visible ahead of the Sept 3 Austin event.',
  before: { label:'Five days ago', big:'190', sub:'A smaller cumulative count' },
  after:  { label:'As of Sept 1', big:'314', sub:'124 vehicles were added' },
  cards: [
    { icon:'🚗', big:'45',       mid:'Cybercab',          sub:'Up from 7 units' },
    { icon:'🚙', big:'269',      mid:'Model Y',           sub:'Software-enabled fleet base' },
    { icon:'📅', big:'Sept 3',   mid:'Austin event',      sub:'Dedicated unmanned vehicle' },
  ],
  quote: 'Robotaxi fleet size is read as how many cars are on the road today, not someday commercialization. A 124-unit gain in five days signals faster deployment. Cybercab moving 7→45 shows dedicated vehicles gaining share.',
  noteSub: 'Vehicle counts must be read with permit scope, safety records, and unmanned mileage share. Numbers may shift again around the Sept 3 event—track daily trends and geofence maps. Long term, cost per mile and utilization matter as much as fleet size.',
  footer: 'TSLA · Texas robotaxi fleet',
});

add('starlink-v3-fcc-f14', 'L6', 'SPCX', {
  badge: 'SPCX', breaking: '9월 15일 전후 · V3 + F14',
  title: '스타링크 V3 위성 FCC 허가와 스타십 14번째 비행(F14)이 9월 15일 전후로 맞물릴 수 있습니다',
  heroBig: '10× 용량',
  heroSub: 'V3는 위성당 처리 용량이 약 10배 커지고, F14는 대형 로켓으로 V3를 궤도에 올리는 발사 후보입니다.',
  grid: [
    { icon:'🛰️', big:'V3',       mid:'차세대 위성',       sub:'용량·대역폭 대폭 확대' },
    { icon:'📋', big:'FCC',      mid:'규제 허가',         sub:'상용 배치 전 필수 단계' },
    { icon:'🚀', big:'F14',      mid:'스타십 비행',       sub:'14번째 시험·발사' },
    { icon:'📅', big:'9/15',     mid:'2026년 목표',       sub:'발사·허가 일정 겹침' },
  ],
  ctx1: 'V3는 기존 위성보다 훨씬 많은 사용자·데이터를 한 위성에서 처리합니다',
  ctx2: '대형 로켓이 안정화되면 위성 배치 비용과 속도가 동시에 개선됩니다',
  quote: '스타링크 V3는 위성당 용량이 약 10배 커져, 같은 발사 횟수로 더 많은 가입자를 수용할 수 있습니다. FCC(미국 연방통신위원회) 허가는 상용 배치 전 관문이고, F14는 V3를 실어 올릴 스타십 발사 후보입니다. 9월 15일 전후 일정이 겹치면 「허가+발사+위성 세대 교체」가 한 달에 몰립니다.',
  noteSub: '위성 인터넷 투자는 가입자 수만이 아니라 「위성 세대·발사 cadence·규제」 세 축입니다. V3 전환 속도가 느리면 대역폭 병목이 남고, 빠르면 해상·항공·B2B 확장이 수월해집니다. F14 성공 여부와 V3 상용 첫 배치 수를 다음 확인 포인트로 두시면 됩니다.',
  footer: 'SPCX · V3 · F14',
}, {
  badge: 'SPCX', breaking: 'AROUND SEPT 15 · V3 + F14',
  title: 'Starlink V3 FCC clearance and Starship Flight 14 may align around Sept 15, 2026',
  heroBig: '10× capacity',
  heroSub: 'V3 targets roughly ten times per-satellite throughput; F14 is a Starship launch candidate to deploy it.',
  grid: [
    { icon:'🛰️', big:'V3',       mid:'Next-gen sats',     sub:'Much higher bandwidth' },
    { icon:'📋', big:'FCC',      mid:'Regulatory OK',     sub:'Gate before commercial rollout' },
    { icon:'🚀', big:'F14',      mid:'Starship flight',   sub:'Fourteenth test launch' },
    { icon:'📅', big:'Sept 15',  mid:'2026 window',       sub:'Permit and launch overlap' },
  ],
  ctx1: 'V3 handles far more users and data per satellite than prior generations',
  ctx2: 'A stable heavy-lift rocket improves both launch cost and deployment speed',
  quote: 'Starlink V3 aims for about ten times the per-satellite capacity, serving more subscribers per launch. FCC clearance is the regulatory gate; Flight 14 is a Starship candidate to carry V3. If timelines overlap around Sept 15, permit, launch, and generation change land in one month.',
  noteSub: 'Satellite internet investing tracks generation, launch cadence, and regulation—not subscribers alone. Slow V3 rollout leaves bandwidth bottlenecks; fast rollout eases maritime, aviation, and B2B expansion. Watch F14 outcome and first commercial V3 batch counts next.',
  footer: 'SPCX · V3 · F14',
});

add('roman-telescope-mission', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '🔭 NASA 로마 · 43억 달러 · 팔콘 헤비',
  title: 'NASA 로마 우주 망원경 43억 달러 임무가 팔콘 헤비로 암흑물질·암흑에너지를 탐사합니다',
  heroIcon: '🔭', heroBig: '$4.3B',
  heroSub: '과학 임무 관점에서 로마 망원경은 허블급 시야와 적외선 감도로 우주 대규모 구조를 그려 냅니다. 발사 성공 recap이 아니라 임무 목표가 핵심입니다.',
  cards: [
    { icon:'🌌', big:'암흑물질', mid:'우주 질량의 약 85%', sub:'직접 보이지 않는 물질 탐색' },
    { icon:'⚡', big:'암흑에너지', mid:'가속 팽창',         sub:'우주 팽창 속도 변화 측정' },
    { icon:'🚀', big:'FH',       mid:'팔콘 헤비',         sub:'대형 과학 화물 운송' },
  ],
  quote: '로마(Roman) 망원경은 43억 달러 규모 NASA 과학 임무로, 넓은 하늘을 한 번에 찍어 암흑물질·암흑에너지·외계행성 후보를 통계적으로 찾습니다. 팔콘 헤비는 승무원 없이 무거운 과학 위성을 지구 2차 궤도(L2) 근처로 보내는 수단입니다. 임무 성공은 발사 회사의 대형 화물 신뢰성에도 기여합니다.',
  noteSub: '과학 발사는 직접 매출보다 「대형 화물 실적」과 브랜드에 기여합니다. 로마 망원경의 첫 과학 데이터 일정과 관측 모드 전환 시점이 다음 마일스톤입니다. 우주 경제 내러티브 안에서 과학·상업·국방 발사가 같은 로켓 family를 공유하는지도 장기적으로 봐야 합니다.',
  footer: 'SPCX · 로마 망원경 임무',
}, {
  badge: 'SPCX', badgeLine: '🔭 NASA Roman · $4.3B · Falcon Heavy',
  title: 'NASA\'s $4.3B Roman Space Telescope on Falcon Heavy targets dark matter and dark energy',
  heroIcon: '🔭', heroBig: '$4.3B',
  heroSub: 'As a science mission, Roman maps large-scale cosmic structure with Hubble-class field and infrared sensitivity—not a launch recap.',
  cards: [
    { icon:'🌌', big:'Dark matter', mid:'~85% of mass',    sub:'Invisible mass distribution' },
    { icon:'⚡', big:'Dark energy', mid:'Accelerating expansion', sub:'How cosmic growth speeds up' },
    { icon:'🚀', big:'FH',          mid:'Falcon Heavy',    sub:'Heavy science payload lift' },
  ],
  quote: 'Roman is a $4.3B NASA mission that surveys wide swaths of sky to statistically find dark matter, dark energy, and exoplanet candidates. Falcon Heavy delivers heavy uncrewed science payloads toward Earth\'s L2 region. Mission success also adds heavy-lift credibility for the launch provider.',
  noteSub: 'Science launches contribute heavy-payload track records and brand more than direct revenue. Watch Roman\'s first science data timeline and survey-mode transitions. Long term, note how science, commercial, and defense payloads share the same rocket family in the space economy narrative.',
  footer: 'SPCX · Roman mission',
});

add('cybercab-giga-testing', 'L3', 'TSLA', {
  badge: 'TSLA',
  title: '기가 텍사스에서 사이버캡 24대가 신호등·고속도로 구간을 야간 무인 시험 중입니다',
  heroIcon: '🏭', heroBig: '24대 · D-2',
  heroSub: '9월 1일 기준 사이버캡 전용 행사까지 이틀. 공장 단지에서 신호등·고속도로·야간 무인 운행을 동시에 검증합니다.',
  cards: [
    { icon:'🚗', big:'24대',     mid:'기가 텍사스',       sub:'전용 사이버캡 시험 fleet' },
    { icon:'🚦', big:'신호등',   mid:'도심·교차로',       sub:'정지·출발·양보 판단' },
    { icon:'🌙', big:'야간',     mid:'무인 시험',         sub:'조명·센서 성능 검증' },
  ],
  quote: '사이버캡(Cybercab)은 운전석·페달 없이 처음부터 무인용으로 만든 전용 로보택시입니다. 24대가 기가 텍사스에서 신호등·고속도로·야간 구간을 돌며, 9월 3일 오스틴 행사 직전 마지막 시험을 하는 그림입니다. 「공장 안 시험」이 「공개 도로 fleet」으로 이어지는지가 관건입니다.',
  noteSub: '시험 차량 수는 상용 fleet의 선행 지표입니다. 야간 무인은 카메라·레이더 성능과 규제 허용 범위를 동시에 시험합니다. 행사 다음 날부터는 실제 무인 영상·허가 구역·양산 일정을 확인하시면 됩니다. 단기 주가는 기대치 조정에 민감하므로 「시험」과 「상용」을 구분해 기록하시기 바랍니다.',
  footer: 'TSLA · 사이버캡 공장 시험',
}, {
  badge: 'TSLA',
  title: 'Twenty-four Cybercabs at Giga Texas are testing signals, highways, and night unsupervised runs',
  heroIcon: '🏭', heroBig: '24 · D-2',
  heroSub: 'Two days to the Sept 1 Cybercab event: factory-campus tests cover traffic lights, highway, and night unmanned operation.',
  cards: [
    { icon:'🚗', big:'24',       mid:'Giga Texas',        sub:'Dedicated Cybercab test fleet' },
    { icon:'🚦', big:'Signals',  mid:'Urban intersections', sub:'Stop, go, and yield logic' },
    { icon:'🌙', big:'Night',    mid:'Unsupervised',      sub:'Lighting and sensor checks' },
  ],
  quote: 'Cybercab is a purpose-built robotaxi without a wheel or pedals. Twenty-four units are cycling traffic lights, highway, and night routes at Giga Texas ahead of the Sept 3 Austin event—final tests before public visibility. The key is whether factory trials translate to public-road fleet growth.',
  noteSub: 'Test counts lead commercial fleet metrics. Night unmanned runs stress cameras, radar, and permit scope together. After the event, verify unmanned footage, geofence maps, and production timing. Separate tests from commercial rollout when tracking near-term stock moves.',
  footer: 'TSLA · Cybercab Giga testing',
});

add('tsla-rally-optimus', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '주가 +4.4~5.51% · 시총 +540억 달러',
  title: '테슬라 주가가 4.4~5.51% 급등하며 시가총액 약 540억 달러가 늘었습니다',
  heroBig: '+~5%',
  heroSub: '옵티머스(Optimus) 프리몬트 1년 100만 대 생산 목표와 모델S·X 라인 해체가 같은 날 거론됐습니다.',
  grid: [
    { icon:'📈', big:'+5%',      mid:'일간 상승',         sub:'로보택시·로봇 기대 반영' },
    { icon:'🤖', big:'1M/yr',    mid:'옵티머스',          sub:'프리몬트 생산 목표' },
    { icon:'🏭', big:'S/X',      mid:'라인 해체',         sub:'생산능력 재배치' },
    { icon:'💰', big:'~$54B',    mid:'시총 증가',         sub:'하루 유동성·기대 반영' },
  ],
  ctx1: '모델S·X 라인 해체는 공장 공간을 로봇·로보택시 쪽으로 옮기는 신호일 수 있습니다',
  ctx2: '주가 급등은 fleet·행사·로봇 목표가 같은 날 겹칠 때 자주 나옵니다',
  quote: '옵티머스는 사람형 로봇으로, 1년 100만 대는 선언 수준의 목표이지만 공장 라인을 옮긴다는 메시지와 맞물립니다. 모델S·X 생산 라인 해체는 프리몬트 capacity를 재배치한다는 뜻으로 읽힙니다. 540억 달러 시총 증가는 실적보다 「실행 일정」에 대한 기대가 커진 날입니다.',
  noteSub: '급등일에는 「무엇이 확인됐는가」와 「무엇이 기대만 올랐는가」를 나눠야 합니다. 옵티머스 100만 대는 로드맵이고, 로보택시 314대·9월 3일 행사는 달력에 있는 사실입니다. 행사 후 변동성 확대에 대비하려면 포지션 크기와 옵션 내재변동성을 함께 보시면 됩니다.',
  footer: 'TSLA · 급등·옵티머스',
}, {
  badge: 'TSLA', breaking: 'SHARES +4.4–5.51% · ~$54B MKT CAP',
  title: 'Tesla rallied 4.4–5.51%, adding about $54 billion in market cap',
  heroBig: '+~5%',
  heroSub: 'Optimus targets one million units per year at Fremont while Model S/X lines are dismantled the same day.',
  grid: [
    { icon:'📈', big:'+5%',      mid:'Daily gain',        sub:'Robotaxi and robotics bid' },
    { icon:'🤖', big:'1M/yr',    mid:'Optimus',           sub:'Fremont production target' },
    { icon:'🏭', big:'S/X',      mid:'Line removal',      sub:'Capacity reallocation' },
    { icon:'💰', big:'~$54B',    mid:'Cap added',         sub:'Liquidity and expectations' },
  ],
  ctx1: 'Dismantling Model S/X lines may free Fremont space for robots and robotaxi',
  ctx2: 'Sharp rallies often cluster when fleet, events, and robot targets hit the same day',
  quote: 'Optimus is Tesla\'s humanoid robot; one million units per year is an aspirational target tied to reallocating factory lines. Model S/X line removal signals Fremont capacity shifting. The ~$54B cap gain reflects expectations on execution timelines more than near-term earnings.',
  noteSub: 'On rally days, split what was confirmed from what was repriced. Optimus one-million is a roadmap; robotaxi 314 units and the Sept 3 event are dated facts. Size risk for post-event volatility and watch implied options volatility alongside headlines.',
  footer: 'TSLA · rally · Optimus',
});

add('fsd-14-billion-miles', 'L1', 'TSLA', {
  badge: 'TSLA',
  title: '완전자율주행(FSD) 누적 주행거리가 140억 마일을 넘었습니다',
  heroIcon: '🛣️', heroBig: '140억 mi',
  heroSub: '13억→14억 마일은 약 24일 만에 달성됐습니다. 같은 통계 기준 인간 운전 대비 약 7배 안전하다는 데이터가 함께 제시됐습니다.',
  cards: [
    { icon:'📊', big:'140억',    mid:'누적 마일',         sub:'FSD 사용 차량 합산' },
    { icon:'⏱️', big:'~24일',    mid:'13→14억',           sub:'최근 10억 mi 속도' },
    { icon:'🛡️', big:'~7×',      mid:'안전 비교',         sub:'동일 지표·인간 대비' },
  ],
  quote: 'FSD(완전자율주행)는 운전자 감독 하 또는 무인에 가까운 주행을 소프트웨어로 돕는 시스템입니다. 누적 140억 마일은 「데이터가 쌓였다」는 뜻이고, 24일 만에 10억 마일을 더했다는 것은 fleet·사용 빈도가 늘었다는 신호입니다. 7배 안전은 같은 정의·같은 구간에서의 비교이므로, 허가·규제 논의에 쓰이는 근거 자료입니다.',
  noteSub: '마일스톤 숫자는 로보택시 허가·보험·고객 신뢰에 쓰입니다. 다만 「마일」과 「무인 마일」은 다릅니다. 9월 3일 사이버캡 행사와 함께 무인 비중·사고율 정의를 확인하시면 됩니다. 장기 투자자는 분기별 누적 마일 곡선과 fleet 증가를 같은 차트에 두시기 바랍니다.',
  footer: 'TSLA · FSD 140억 mi',
}, {
  badge: 'TSLA',
  title: 'Full Self-Driving cumulative miles passed 14 billion',
  heroIcon: '🛣️', heroBig: '14B mi',
  heroSub: 'The jump from 13B to 14B took about 24 days. Data cited ~7x safer than human driving on the same metric.',
  cards: [
    { icon:'📊', big:'14B',      mid:'Total miles',       sub:'Across FSD-enabled fleet' },
    { icon:'⏱️', big:'~24d',     mid:'13B→14B',           sub:'Recent billion-mile pace' },
    { icon:'🛡️', big:'~7×',      mid:'Safety ratio',      sub:'Same metric vs human' },
  ],
  quote: 'FSD assists supervised or near-unmanned driving through software. Fourteen billion cumulative miles mean more training data; adding one billion in ~24 days signals more vehicles and usage. The ~7x safety claim uses one consistent definition—material for permits and insurance debate.',
  noteSub: 'Milestones support robotaxi permits, insurance, and customer trust—but total miles differ from unmanned miles. With the Sept 3 Cybercab event, check unmanned share and how accidents are defined. Long-term investors should plot cumulative miles against fleet growth each quarter.',
  footer: 'TSLA · FSD 14B miles',
});

add('spcx-southaven-power', 'L2', 'SPCX', {
  badge: 'SPCX',
  title: '사우스헤이븐 발전소 11기 임시 터빈 가동 중단과 1.2GW 클린 에어 규제 이슈가 겹쳤습니다',
  heroIcon: '⚡', heroBig: '1.2GW',
  heroSub: '발사장·공장·데이터센터 전력 수요가 늘수록 지역 발전·환경 규제가 실행 리스크가 됩니다.',
  cards: [
    { label:'규모',   big:'1.2GW',      mid:'발전 용량',         sub:'대형 가스·복합 발전 단지' },
    { label:'터빈',   big:'11기',       mid:'임시 가동 중단',    sub:'환경·허가 변수' },
    { label:'법규',   big:'Clean Air',  mid:'대기 규제',         sub:'배출·허가 재검토' },
  ],
  detailHead: '왜 전력이 우주·AI 뉴스와 연결되나',
  detailLines: [
    '⚡ 스타베이스·기가팩토리·데이터센터는 지역 전력망에 의존합니다',
    '🏭 1.2GW 단지는 「전력 병목」 해소 후보이기도 합니다',
    '📋 환경 규제 지연은 공장·발사 일정에 간접 영향을 줍니다',
  ],
  noteSub: '로켓·전기차·AI는 모두 「전기를 안정적으로 받는지」가 관건입니다. 터빈 중단·클린 에어 이슈는 특정 지역의 전력 공급과 허가 속도를 보여 줍니다. 다음에는 가동 재개 일정·대체 전력 계약·현장 자체 발전(태양광·가스) 프로젝트를 확인하시면 됩니다.',
  footer: 'SPCX · 사우스헤이븐 전력',
}, {
  badge: 'SPCX',
  title: 'Southaven plant saw 11 temporary turbines shut while 1.2GW Clean Air Act issues overlap',
  heroIcon: '⚡', heroBig: '1.2 GW',
  heroSub: 'As launch sites, factories, and data centers need power, local generation and environmental rules become execution risks.',
  cards: [
    { label:'Scale',  big:'1.2 GW',     mid:'Plant capacity',    sub:'Large gas/combined-cycle site' },
    { label:'Units',  big:'11',         mid:'Temp shutdown',     sub:'Permit and environmental variables' },
    { label:'Rule',   big:'Clean Air',  mid:'Air regulation',    sub:'Emissions and permit review' },
  ],
  detailHead: 'Why power links to space and AI',
  detailLines: [
    '⚡ Starbase, gigafactories, and data centers rely on regional grids',
    '🏭 A 1.2 GW site is also a candidate to ease power bottlenecks',
    '📋 Environmental delays can indirectly affect factory and launch schedules',
  ],
  noteSub: 'Rockets, EVs, and AI all hinge on stable electrons. Turbine shutdowns and Clean Air issues show local supply and permit speed. Watch restart timelines, backup power contracts, and on-site solar or gas projects next.',
  footer: 'SPCX · Southaven power',
});

add('nvda-vera-rubin-gw', 'L4', 'NVDA', {
  badge: 'NVDA', badgeLine: '💬 Vera Rubin · GW당 400억 달러+ 매출',
  title: '젠슨 황 CEO는 Vera Rubin 세대가 기가와트(GW)당 400억 달러 이상 매출을 낼 수 있다고 말했습니다',
  heroIcon: '🧠', heroBig: '>$40B/GW',
  heroSub: '차세대 AI 칩·시스템 세대 이름 Vera Rubin은 2026년 후반~2027년 출시 구간으로 거론됩니다. GW는 데이터센터 전력·연산 규모 단위입니다.',
  cards: [
    { icon:'🔲', big:'Vera Rubin', mid:'차세대 AI',         sub:'GPU·네트워킹·메모리 묶음' },
    { icon:'⚡', big:'1 GW',       mid:'연산·전력 단위',    sub:'대형 AI 팹 규모' },
    { icon:'💵', big:'>$40B',      mid:'매출 목표',         sub:'GW당 시스템 매출' },
  ],
  quote: '기가와트(GW)는 데이터센터 한 단지가 쓰는 전력·연산 규모를 가리키는 단위입니다. Vera Rubin은 블랙웰 다음 AI 시스템 세대로, 칩·보드·네트워킹·소프트웨어를 묶어 「GW 단위」로 판매한다는 그림입니다. GW당 400억 달러 이상은 엔비디아가 「칩 회사」를 넘어 「AI 팹 공급자」로 가격을 잡겠다는 메시지입니다.',
  noteSub: '숫자가 크면 밸류에이션 논쟁도 커집니다. GW당 매출은 실제 GW가 가동·전원 투입·고객 발주까지 이어져야 확인됩니다. 다음 분기 earnings에서 Vera Rubin 일정·GW 단위 수주·전력 지연 언급을 함께 보시면 됩니다. 메모리·네트워킹 동반 판매도 마진 구조를 바꿉니다.',
  footer: 'NVDA · Vera Rubin · GW',
}, {
  badge: 'NVDA', badgeLine: '💬 Vera Rubin · $40B+ revenue per GW',
  title: 'CEO Jensen Huang said the Vera Rubin generation can generate more than $40B in revenue per gigawatt',
  heroIcon: '🧠', heroBig: '>$40B/GW',
  heroSub: 'The next AI system generation after Blackwell is discussed for late 2026–2027; GW measures data-center power and compute scale.',
  cards: [
    { icon:'🔲', big:'Vera Rubin', mid:'Next AI stack',     sub:'GPU, networking, memory bundle' },
    { icon:'⚡', big:'1 GW',       mid:'Compute scale',   sub:'Large AI factory footprint' },
    { icon:'💵', big:'>$40B',      mid:'Revenue target',  sub:'Per GW of systems sold' },
  ],
  quote: 'A gigawatt (GW) scales power and compute for a major AI campus. Vera Rubin is the system generation after Blackwell—chips, boards, networking, and software sold as GW-scale packages. More than $40B per GW signals Nvidia pricing itself as an AI-factory supplier, not just a chip vendor.',
  noteSub: 'Large numbers invite large valuation debates. Per-GW revenue needs powered, commissioned GW with customer orders. On the next earnings calls, watch Vera Rubin timing, GW-scale bookings, and power-delay mentions. Attached memory and networking change margin mix too.',
  footer: 'NVDA · Vera Rubin · GW',
});

add('samsung-hbm-capacity', 'L1', 'NVDA', {
  badge: 'NVDA',
  title: '삼성전자가 2031년까지 메모리 capacity의 약 70%를 NVDA·MSFT·GOOGL에 공급할 수 있다는 전망이 나왔습니다',
  heroIcon: '🧊', heroBig: '~70%',
  heroSub: '고대역폭 메모리(HBM) 품귀 구간에서 대형 AI 고객 맞춤 물량이 가격·믹스를 이끕니다. HBM3E 현물가는 계약가 대비 약 5배 수준으로 거론됩니다.',
  cards: [
    { icon:'🏭', big:'70%',      mid:'2031년 capacity',   sub:'NVDA·MSFT·GOOGL 대상' },
    { icon:'📈', big:'~5×',      mid:'HBM3E 현물',        sub:'계약가 대비 프리미엄' },
    { icon:'🤝', big:'장기',     mid:'고객 묶음',         sub:'AI 설비투자와 연동' },
  ],
  quote: '고대역폭 메모리(HBM)는 AI 가속기 옆에서 데이터를 빠르게 주고받는 칩입니다. capacity의 70%를 세 대형 AI 고객에 묶는다는 전망은 「범용 메모리 가격」이 아니라 「고객 맞춤 장기 계약」 시장으로 이동한다는 뜻입니다. HBM3E 현물가가 계약가의 약 5배면 품귀가 실 가격에 반영되고 있다는 신호입니다.',
  noteSub: '국내 투자자에게는 삼성전자·SK하이닉스 실적 믹스로 바로 연결됩니다. 70%는 선언·계획과 실제 출하 사이 간극을 분기마다 확인해야 합니다. 다음에는 HBM3E 출하·ASP·고객사 capex 일정을 함께 추적하시면 됩니다. AI 칩 수요 전망과 메모리 capacity 계획을 같은 표에 두시기 바랍니다.',
  footer: 'NVDA · 삼성 HBM capacity',
}, {
  badge: 'NVDA',
  title: 'Samsung may supply about 70% of memory capacity through 2031 to NVDA, MSFT, and GOOGL',
  heroIcon: '🧊', heroBig: '~70%',
  heroSub: 'In a tight high-bandwidth memory (HBM) market, hyperscaler-specific capacity drives price and mix; HBM3E spot is cited near ~5x contract.',
  cards: [
    { icon:'🏭', big:'70%',      mid:'Capacity by 2031',  sub:'Tied to three AI hyperscalers' },
    { icon:'📈', big:'~5×',      mid:'HBM3E spot',        sub:'Premium to contract price' },
    { icon:'🤝', big:'Long-term', mid:'Customer bundle',   sub:'Linked to AI capex plans' },
  ],
  quote: 'High-bandwidth memory (HBM) sits beside AI accelerators to move data quickly. Routing ~70% of capacity to three AI customers means the market shifts from commodity DRAM pricing to long-term bespoke deals. Spot HBM3E near five times contract suggests tightness is in real prices.',
  noteSub: 'For Korea investors this maps to Samsung and SK Hynix mix. Seventy percent is a plan until shipments prove it each quarter. Track HBM3E shipments, ASP, and hyperscaler capex together. Put AI chip demand forecasts and memory capacity plans on one sheet.',
  footer: 'NVDA · Samsung HBM capacity',
});

add('cathie-wood-holdings', 'L2', 'TSLA', {
  badge: 'TSLA',
  title: '캐시 우드 운용사의 테슬라·스페이스X 관련 보유 규모가 합산 약 10억 달러로 거론됐습니다',
  heroIcon: '💼', heroBig: '~$1B',
  heroSub: '혁신 성장 ETF가 테슬라와 비상장 스페이스X 노출을 함께 들고 있으면, 로보택시·우주 테마가 한 바구니로 움직일 수 있습니다.',
  cards: [
    { label:'TSLA',   big:'상장',     mid:'테슬라',            sub:'ETF 주요 보유 종목' },
    { label:'SPCX',   big:'비상장',   mid:'스페이스X',         sub:'간접·연관 노출' },
    { label:'합산',   big:'~$1B',     mid:'보유 규모',         sub:'혁신 테마 집중도' },
  ],
  detailHead: 'ETF 보유가 의미하는 것',
  detailLines: [
    '📊 액티브 ETF 매수·매도는 개인 투자자 심리를 반영합니다',
    '🚗 테슬라와 우주 테마는 9월 3일 행사 전후 같이 움직일 수 있습니다',
    '💸 약 10억 달러 규모는 테마 conviction(확신) 지표입니다',
  ],
  noteSub: '운용사 보유는 「추천」이 아니라 실제 포지션입니다. 테슬라 급등·로보택시 fleet 뉴스가 나올 때 ETF 순매수·매도를 함께 보면, 개별 주식과 테마 바구니 중 어디에 돈이 들어오는지 구분할 수 있습니다. 9월 3일 행사 전후 ARK·테슬라 자금 흐름을 확인하시면 됩니다.',
  footer: 'TSLA · 혁신 ETF 보유',
}, {
  badge: 'TSLA',
  title: 'Cathie Wood-related holdings in Tesla and SpaceX are cited near a combined $1 billion',
  heroIcon: '💼', heroBig: '~$1B',
  heroSub: 'When innovation ETFs hold Tesla plus private SpaceX exposure, robotaxi and space themes can trade as one basket.',
  cards: [
    { label:'TSLA',   big:'Listed',   mid:'Tesla',             sub:'Major ETF holding' },
    { label:'SPCX',   big:'Private',  mid:'SpaceX',            sub:'Indirect linkage' },
    { label:'Total',  big:'~$1B',     mid:'Holdings cited',    sub:'Theme concentration' },
  ],
  detailHead: 'What ETF holdings signal',
  detailLines: [
    '📊 Active ETF buys and sells reflect retail and theme sentiment',
    '🚗 Tesla and space can move together into the Sept 3 event',
    '💸 ~$1B scale is a conviction gauge for the innovation sleeve',
  ],
  noteSub: 'Manager holdings are real positions, not slogans. When Tesla rallies on robotaxi fleet news, compare ETF flows to single-stock flows to see where money lands. Watch ARK and Tesla fund flows around the Sept 3 event.',
  footer: 'TSLA · innovation ETF holdings',
});

add('aws-saudi-humain', 'L6', 'AMZN', {
  badge: 'AMZN', breaking: '사우디 53억 달러+ · 2026년 12월 리전',
  title: 'AWS가 사우디에 53억 달러 이상 투자하고 2026년 12월 첫 리전·2028년 HUMAIN AI Zone 50MW를 목표로 합니다',
  heroBig: '$5.3B+',
  heroSub: '마벨 Trainium과 엔비디아 GPU를 함께 쓰는 AI Zone 50MW는 중동 AI 인프라 경쟁의 새 축입니다.',
  grid: [
    { icon:'🇸🇦', big:'$5.3B+',   mid:'AWS 투자',          sub:'사우디 인프라·클라우드' },
    { icon:'📅', big:'Dec 2026', mid:'첫 리전',           sub:'현지 데이터 주권·지연' },
    { icon:'🤖', big:'50MW',     mid:'HUMAIN AI Zone',    sub:'2028년 목표 전력' },
    { icon:'🔲', big:'MRVL+NVDA', mid:'칩 mix',           sub:'Trainium·GPU 병행' },
  ],
  ctx1: '중동은 AI 데이터센터를 「에너지+주권+칩」 세 축으로 유치 경쟁 중입니다',
  ctx2: 'Trainium(자체 AI 칩)과 GPU를 같이 쓰면 비용·공급 리스크를 나눕니다',
  quote: 'AWS(아마존 웹서비스) 사우디 53억 달러+ 투자는 데이터센터·네트워크·전력을 현지에 깔겠다는 뜻입니다. 2026년 12월 첫 리전은 지연·데이터 주권 요구에 대응하고, 2028년 HUMAIN AI Zone 50MW는 AI 전용 전력 블록입니다. 마벨 Trainium과 엔비디아 GPU를 함께 쓰면 「저비용 추론」과 「고성능 학습」을 분리할 수 있습니다.',
  noteSub: '클라우드 투자는 분기 매출보다 「리전 가동·전력 투입·칩 mix」로 확인됩니다. 중동 AI Zone은 엔비디아·마벨·전력 EPC 업체에 파급됩니다. 다음에는 착공·전력 계약·Trainium 채택률을 추적하시면 됩니다. 지정학 리스크와 현지 규제도 일정 변수입니다.',
  footer: 'AMZN · AWS 사우디',
}, {
  badge: 'AMZN', breaking: 'SAUDI $5.3B+ · FIRST REGION DEC 2026',
  title: 'AWS plans $5.3B+ in Saudi Arabia with a first region in Dec 2026 and a 50MW HUMAIN AI Zone by 2028',
  heroBig: '$5.3B+',
  heroSub: 'A 50MW AI Zone using Marvell Trainium and Nvidia GPUs adds a new Gulf AI infrastructure axis.',
  grid: [
    { icon:'🇸🇦', big:'$5.3B+',   mid:'AWS spend',         sub:'Saudi cloud infrastructure' },
    { icon:'📅', big:'Dec 2026', mid:'First region',      sub:'Latency and data sovereignty' },
    { icon:'🤖', big:'50MW',     mid:'HUMAIN AI Zone',    sub:'2028 power target' },
    { icon:'🔲', big:'MRVL+NVDA', mid:'Chip mix',         sub:'Trainium plus GPU' },
  ],
  ctx1: 'The Gulf is competing for AI data centers on energy, sovereignty, and chips',
  ctx2: 'Mixing Trainium and GPUs splits cost control from peak performance needs',
  quote: 'AWS’s $5.3B+ Saudi plan builds local data centers, networks, and power. A December 2026 region answers latency and sovereignty needs; the 2028 HUMAIN AI Zone is a dedicated 50MW AI block. Marvell Trainium with Nvidia GPUs can split low-cost inference from high-end training.',
  noteSub: 'Cloud deals are verified by region go-live, power-on, and chip mix—not headlines alone. Gulf AI zones ripple to Nvidia, Marvell, and power EPC names. Track ground-breaking, power contracts, and Trainium adoption. Geopolitics and local rules remain schedule risks.',
  footer: 'AMZN · AWS Saudi',
});

add('trump-data-centers', 'L4', 'MACRO', {
  badge: 'MACRO', badgeLine: '🏛️ Let Data Reign · 미국 5,375개 DC',
  title: '「Let Data Reign」 논의와 미국 5,375개 데이터센터가 세계 1위라는 집계가 겹쳤습니다',
  heroIcon: '🏢', heroBig: '5,375',
  heroSub: 'AI·클라우드 경쟁은 칩에서 데이터센터 부지·전력·허가로 이동하고 있습니다. 미국이 시설 수에서 앞서지만 전력·송전 병목은 남아 있습니다.',
  cards: [
    { icon:'🇺🇸', big:'5,375',    mid:'미국 DC',           sub:'세계 최다 시설 수' },
    { icon:'⚡', big:'전력',     mid:'병목',              sub:'GW 단위 수요 증가' },
    { icon:'📋', big:'허가',     mid:'지역 규제',         sub:'부지·환경·용수' },
  ],
  quote: '데이터센터(Data Center)는 AI·클라우드 서버를 모아 두는 건물·단지입니다. 미국 5,375개는 세계에서 가장 많은 편이며, 「Let Data Reign」은 데이터·AI 인프라를 국가 경쟁력으로 부각하는 정치적 메시지로 읽힙니다. 시설 수가 많아도 전력·변압기·송전 연결은 별도 병목입니다.',
  noteSub: '투자자는 「몇 개가 있는가」보다 「몇 GW가 전원 투입됐는가」를 봐야 합니다. 정책 발언은 허가 속도·세제·전력 우선순위에 영향을 줄 수 있습니다. 다음에는 지역별 DC 허가·전력 대기열·클라우드 capex를 함께 추적하시면 됩니다. 칩 주문과 DC 가동 시점의 gap이 2026~27년 핵심 변수입니다.',
  footer: '매크로 · 데이터센터',
}, {
  badge: 'MACRO', badgeLine: '🏛️ Let Data Reign · US 5,375 DCs',
  title: '"Let Data Reign" rhetoric overlaps with a count of 5,375 US data centers leading the world',
  heroIcon: '🏢', heroBig: '5,375',
  heroSub: 'AI and cloud competition is shifting from chips to sites, power, and permits—the US leads in facility count but grid bottlenecks remain.',
  cards: [
    { icon:'🇺🇸', big:'5,375',    mid:'US facilities',     sub:'Most data centers globally' },
    { icon:'⚡', big:'Power',    mid:'Bottleneck',        sub:'Demand rising in GW blocks' },
    { icon:'📋', big:'Permits',  mid:'Local rules',       sub:'Land, water, environment' },
  ],
  quote: 'Data centers house AI and cloud servers. The United States at 5,375 sites leads the world in facility count; "Let Data Reign" reads as political emphasis on data and AI infrastructure as national competitiveness. Many sites still face separate power, transformer, and grid-connection bottlenecks.',
  noteSub: 'Investors should track powered gigawatts, not facility counts alone. Policy rhetoric can affect permit speed, tax treatment, and power priority. Follow regional approvals, power queues, and cloud capex together. The gap between chip orders and powered data centers is a 2026–27 key variable.',
  footer: 'Macro · data centers',
});

add('super-heavy-f14-static-fire', 'L3', 'SPCX', {
  badge: 'SPCX',
  title: '슈퍼헤비 33기 엔진 정적점화 시험이 스타십 14번째 비행(F14) 준비로 거론됐습니다',
  heroIcon: '🔥', heroBig: '33 engines',
  heroSub: '정적점화(static fire)는 발사 전 로켓을 고정한 채 엔진만 점화해 추력·시스템을 검증하는 시험입니다. F14 직전 마지막 관문 중 하나입니다.',
  cards: [
    { icon:'🚀', big:'Super Heavy', mid:'1단 로켓',        sub:'33개 랩터 엔진' },
    { icon:'🔥', big:'Static fire', mid:'지상 점화',       sub:'발사대에 고정한 채 시험' },
    { icon:'📅', big:'F14',         mid:'14번째 비행',     sub:'V3·궤도 목표와 연동' },
  ],
  quote: '슈퍼헤비(Super Heavy)는 스타십의 1단 로켓으로, 33개 랩터(Raptor) 엔진을 동시에 켜는 정적점화는 추력·연료·전자 시스템을 마지막으로 점검하는 절차입니다. F14는 14번째 통합 시험·비행으로, V3 위성·9월 15일 전후 일정과 같은 발사 cadence 안에서 읽힙니다.',
  noteSub: '정적점화 성공은 발사대 준비·날씨·규제 허가만 남았다는 신호에 가깝습니다. 실패·연기는 cadence 전체를 밀 수 있습니다. 다음에는 점화 영상·발사 창·1단·2단 회수 시도 여부를 확인하시면 됩니다. 스타십 cadence는 스타링크 V3 배치 속도와 직결됩니다.',
  footer: 'SPCX · F14 정적점화',
}, {
  badge: 'SPCX',
  title: 'A 33-engine Super Heavy static fire is cited ahead of Starship Flight 14',
  heroIcon: '🔥', heroBig: '33 engines',
  heroSub: 'Static fire tests ignite engines while the rocket stays clamped—a late gate before Flight 14.',
  cards: [
    { icon:'🚀', big:'Super Heavy', mid:'First stage',       sub:'Thirty-three Raptor engines' },
    { icon:'🔥', big:'Static fire', mid:'Ground test',       sub:'Full thrust while clamped' },
    { icon:'📅', big:'F14',         mid:'Flight fourteen',   sub:'Tied to V3 cadence' },
  ],
  quote: 'Super Heavy is Starship\'s first stage; a 33-engine static fire is the final check on thrust, propellant, and avionics before launch. Flight 14 is the fourteenth integrated test, read alongside V3 satellites and the mid-September window.',
  noteSub: 'A clean static fire suggests pad readiness, weather, and permits are the remaining gates. Failure or delay can push the whole cadence. Watch ignition footage, launch windows, and booster/ship recovery plans next. Starship cadence directly feeds Starlink V3 deployment speed.',
  footer: 'SPCX · F14 static fire',
});

};
