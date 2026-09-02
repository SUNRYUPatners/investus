// 2026-09-03 SVG topic data — consumed by gen-reports-20260903.js
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.03 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'9월 3일 오스틴 사이버캡 행사가 오후 5시 45분(미 동부)에 열립니다',
      sub:'플릿 대량 투입·V15 무인 시승·역사적 날이라는 기대가 최대인 이벤트 데이입니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'86,166', title:'테슬라 중국 8월 도매 86,166대, 전년 대비 +3.57% 증가했습니다',
      sub:'소매 27,249대·수출 58,917대로 내수와 수출 믹스가 함께 거론됩니다.' },
    { color:'#ff9900', fill:'#1a0e00', right:'UBER', title:'우버가 코로나 이후 최대 10% 감원·로보택시 경쟁에 100억 달러 이상 투자합니다',
      sub:'사이버캡 행사와 같은 날 비용 구조 재편과 자율주행 capex가 겹칩니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'엔비디아가 물리 AI가 디지털 AI보다 10배 크고 로봇 10년 1,000억 달러 시장을 강조했습니다',
      sub:'제조업 미국 복귀·국가별 AI 인프라 필요성도 같은 메시지입니다.' },
    { color:'#4285f4', fill:'#06121f', right:'GOOGL', title:'구글 TPU 매출 전망이 2027년 840억·2028년 1,080억 달러로 상향됐습니다',
      sub:'이전 620억·790억 달러 추정 대비 AI 가속기 수요가 커진 그림입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'스타십 F14가 V3 스타링크 20~60기 위성 투입·HLS 해치 목업을 앞두고 있습니다',
      sub:'스페이스X AI 전력 15GW 부족·1.2GW 발전소·구글·앤스로픽 임대도 같은 축입니다.' },
  ],
  caption: '더 볼 것: Cybercab 9/3 5:45PM ET · China 86,166 +3.57% · Uber 10% layoffs · NVDA physical AI · Google TPU $84B/$108B · F14 V3 · 10yr 4.80% · Pension 112% · TSLA battery 285B mi',
}, {
  headline: '2026.09.03 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Cybercab event day Sept 3, 5:45 PM ET Austin — fleet flood, V15 unsupervised rides',
      sub:'Historic-day narrative at peak expectations for dedicated robotaxi unveil.' },
    { color:'#60a5fa', fill:'#0a1420', right:'86,166', title:'Tesla China August wholesale 86,166 units (+3.57% YoY)',
      sub:'Retail 27,249 · export 58,917 — domestic vs export mix matters.' },
    { color:'#ff9900', fill:'#1a0e00', right:'UBER', title:'Uber ~10% layoffs, $10B+ to compete with robotaxis vs Cybercab',
      sub:'Cost reset overlaps Sept 3 autonomy headline day.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'NVDA: physical AI 10× digital AI; $100B robotics decade; manufacturing back to America',
      sub:'Every country needs AI infra — Jensen message on embodied AI.' },
    { color:'#4285f4', fill:'#06121f', right:'GOOGL', title:'Google TPU MS est. $84B 2027 / $108B 2028 (prior $62B/$79B)',
      sub:'Custom accelerator demand revised higher.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'Starship F14 deploys 20-60 V3 Starlinks; HLS hatch mockup; 15GW AI power gap',
      sub:'Google/Anthropic leasing SpaceX compute · 1.2GW power plant cited.' },
  ],
  caption: 'Also: Giga Texas Sept 2 · FSD France · 10yr 4.80% · Pension 112% · Cathie Apple AI · TSLA battery blog · ARK Cybercab 30-60× vs Uber',
});

add('cybercab-event-day', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '9/3 · 5:45 PM ET · AUSTIN',
  title: '9월 3일 오스틴 사이버캡 행사가 오후 5시 45분(미 동부)에 열립니다',
  heroBig: 'EVENT DAY',
  heroSub: '플릿 대량 투입·FSD V15 무인 시승·역사적 날이라는 기대가 겹칩니다. 사이버캡은 운전석 없는 전용 로보택시 차량입니다.',
  grid: [
    { icon:'🚕', big:'5:45 PM', mid:'오스틴', sub:'미 동부 기준' },
    { icon:'🚗', big:'V15', mid:'무인 시승', sub:'감독 없이 운행' },
    { icon:'📡', big:'Fleet', mid:'대량 투입', sub:'등록·지오펜스' },
    { icon:'📅', big:'9/3', mid:'행사일', sub:'기대 최대 구간' },
  ],
  ctx1: '이벤트 데이는 발표와 상용 fleet 숫자가 엇갈리면 변동성이 커질 수 있습니다',
  ctx2: '행사 후 무인 영상·허가 범위·유료 승차 일정을 분리해 기록하시기 바랍니다',
  quote: '사이버캡(Cybercab)은 처음부터 무인 운행용으로 만든 전용 차량입니다. V15는 최신 FSD 소프트웨어 세대로, 무인 시승은 운전석에 사람이 없이 도로를 달리는 시험입니다.',
  noteSub: '오늘은 「말」이 아니라 「영상·숫자·일정」이 나오는 날입니다. 골든 시범 차량과 상용 fleet을 구분하고, 지오펜스 면적·등록 대수·무인 마일 비중을 행사 직후 확인하시기 바랍니다. 단기 레버리지는 결과 확인 전 신중하시면 됩니다.',
  footer: 'TSLA · Cybercab event',
}, {
  badge: 'TSLA', breaking: 'SEPT 3 · 5:45 PM ET',
  title: 'Cybercab event day in Austin at 5:45 PM ET — fleet flood, V15 unsupervised rides',
  heroBig: 'EVENT DAY',
  heroSub: 'Peak-expectations day for dedicated robotaxi unveil with fleet scale and unsupervised V15 demos.',
  grid: [
    { icon:'🚕', big:'5:45 PM', mid:'Austin', sub:'ET start' },
    { icon:'🚗', big:'V15', mid:'Unsupervised', sub:'No safety driver' },
    { icon:'📡', big:'Fleet', mid:'Scale-up', sub:'Regs · geofence' },
    { icon:'📅', big:'Sept 3', mid:'Event', sub:'Max hype window' },
  ],
  ctx1: 'Event day volatility rises if demos beat but commercial numbers lag',
  ctx2: 'Log unmanned footage, permits, and paid-ride timelines separately after the show',
  quote: 'Cybercab is a purpose-built robotaxi without a driver seat. V15 unsupervised rides mean no human in the loop for the demo loop.',
  noteSub: 'Today is about footage, fleet counts, and calendars—not slogans. Split golden show cars from commercial fleet. Track geofence area, registrations, and unmanned mile share right after the event.',
  footer: 'TSLA · Cybercab event',
});

add('tesla-china-wholesale', 'L1', 'TSLA', {
  badge: 'TSLA', title: '테슬라 중국 8월 도매가 86,166대로 전년 대비 3.57% 증가했습니다',
  heroIcon: '🇨🇳', heroBig: '86,166',
  heroSub: '소매 27,249대·수출 58,917대로 내수와 수출이 함께 집계됐습니다. 도매는 공장 출하 기준, 소매는 실제 등록에 가깝습니다.',
  cards: [
    { icon:'🏭', big:'86,166', mid:'도매 8월', sub:'전년 +3.57%' },
    { icon:'🛒', big:'27,249', mid:'소매', sub:'내수 등록' },
    { icon:'🚢', big:'58,917', mid:'수출', sub:'해외 출하' },
  ],
  quote: '도매(wholesale)는 공장에서 출하된 대수, 소매(retail)는 고객 등록에 가깝습니다. 수출 비중이 크면 중국 내수 회복과 별개로 읽혀야 합니다.',
  noteSub: '중국 숫자는 미국 사이버캡과 규제·수요 축이 다릅니다. 8월 +3.57%는 완만한 회복 신호일 수 있으나, BYD 등 현지 경쟁·가격 인하와 함께 ASP·마진을 분기 실적에서 확인하시기 바랍니다. 수출 58,917대는 유럽·아시아 수요와 연결됩니다.',
  footer: 'TSLA · China Aug',
}, {
  badge: 'TSLA', title: 'Tesla China August wholesale 86,166 units (+3.57% YoY)',
  heroIcon: '🇨🇳', heroBig: '86,166',
  heroSub: 'Retail 27,249 · export 58,917 — wholesale is factory shipment, retail closer to registrations.',
  cards: [
    { icon:'🏭', big:'86,166', mid:'Wholesale', sub:'+3.57% YoY' },
    { icon:'🛒', big:'27,249', mid:'Retail', sub:'Domestic regs' },
    { icon:'🚢', big:'58,917', mid:'Export', sub:'Overseas shipments' },
  ],
  quote: 'Wholesale counts factory exits; retail tracks customer registrations. Heavy export share means China domestic demand is a separate read.',
  noteSub: 'China is a different regulatory and demand axis from Austin Cybercab. +3.57% YoY is a modest recovery signal—pair with local EV competition and ASP in quarterly prints. Export 58,917 ties to Europe/Asia demand.',
  footer: 'TSLA · China Aug',
});

add('uber-layoffs-robotaxi', 'L4', 'AMZN', {
  badge: 'UBER', badgeLine: '⚡ 10% 감원 · $10B+ 로보택시',
  title: '우버가 코로나 이후 최대 10% 감원·로보택시 경쟁에 100억 달러 이상 투자합니다',
  heroIcon: '🚕', heroBig: '10%',
  heroSub: '사이버캡 행사와 같은 날 비용 구조 재편과 자율주행 capex가 겹칩니다. 감원은 마진 방어, 투자는 미래 fleet 경쟁입니다.',
  cards: [
    { icon:'✂️', big:'10%', mid:'감원', sub:'코로나 이후 최대' },
    { icon:'💰', big:'$10B+', mid:'로보택시', sub:'경쟁 투자' },
    { icon:'🚗', big:'9/3', mid:'Cybercab', sub:'같은 날 이벤트' },
  ],
  quote: '플랫폼은 단기 이익(감원)과 장기 fleet(로보택시 capex)을 동시에 밀고 있습니다. 사이버캡이 성공 서사로 읽히면 우버 주가는 「경쟁 비용」 프레임으로 재평가될 수 있습니다.',
  noteSub: '감원만 보면 비용 절감, capex만 보면 성장 투자입니다. 분기 현금흐름·영업이익률과 자율주행 파트너십(차량·맵·보험)을 같은 표에 두시기 바랍니다. 9/3 테슬라 행사 결과가 「플랫폼 vs OEM fleet」 논쟁에 fuel을 줄 수 있습니다.',
  footer: 'UBER · layoffs · robotaxi',
}, {
  badge: 'UBER', badgeLine: '⚡ 10% cuts · $10B+ robotaxi',
  title: 'Uber ~10% layoffs (largest since COVID) and $10B+ to compete with robotaxis vs Cybercab',
  heroIcon: '🚕', heroBig: '10%',
  heroSub: 'Cost reset overlaps Sept 3 Cybercab event day—near-term margins vs long-term fleet capex.',
  cards: [
    { icon:'✂️', big:'10%', mid:'Layoffs', sub:'Largest since COVID' },
    { icon:'💰', big:'$10B+', mid:'Robotaxi', sub:'Competitive spend' },
    { icon:'🚗', big:'Sept 3', mid:'Cybercab', sub:'Same-day event' },
  ],
  quote: 'Uber is pushing margin defense (cuts) and fleet offense (robotaxi capex) together. A strong Cybercab narrative may reprice Uber through a "competition cost" lens.',
  noteSub: 'Cuts alone read as opex savings; capex alone reads as growth bet. Track quarterly FCF, margins, and autonomy partnerships (vehicles, maps, insurance) on one sheet. Sept 3 Tesla headlines may fuel the platform vs OEM fleet debate.',
  footer: 'UBER · layoffs · robotaxi',
});

add('nvda-physical-ai', 'L4', 'NVDA', {
  badge: 'NVDA', badgeLine: '💬 물리 AI · 제조업 미국',
  title: '엔비디아가 물리 AI 시장이 디지털 AI보다 10배 크다고 강조했습니다',
  heroIcon: '🤖', heroBig: '10×',
  heroSub: '로봇 10년 1,000억 달러, 제조업 미국 복귀, 모든 국가 AI 인프라 필요 메시지가 겹쳤습니다.',
  cards: [
    { icon:'🏭', big:'10×', mid:'물리 vs 디지털', sub:'시장 규모 비교' },
    { icon:'💵', big:'$100B', mid:'10년 로봇', sub:'누적 시장' },
    { icon:'🇺🇸', big:'Mfg', mid:'미국 복귀', sub:'공장·로봇' },
  ],
  quote: '물리 AI(physical AI)는 공장·로봇·자율주행처럼 「몸」이 있는 AI입니다. 디지털 AI는 클라우드·모델 학습 중심이고, 물리 AI는 센서·액추에이터·실시간 제어가 핵심입니다.',
  noteSub: '10배·1,000억 달러는 TAM(전체 시장) 추정이며 매출 가이던스가 아닙니다. 로봇·자율주행·공장 자동화 수주가 분기 실적으로 연결되는지, Vera Rubin 등 차세대 GPU 일정과 함께 추적하시기 바랍니다. 사이버캡 행사는 물리 AI 내러티브의 소비자-facing 예시입니다.',
  footer: 'NVDA · physical AI',
}, {
  badge: 'NVDA', badgeLine: '💬 Physical AI · US manufacturing',
  title: 'NVDA cites physical AI market ~10× digital AI; $100B robotics decade',
  heroIcon: '🤖', heroBig: '10×',
  heroSub: 'Manufacturing back to America and every country needing AI infra in the same message arc.',
  cards: [
    { icon:'🏭', big:'10×', mid:'Physical vs digital', sub:'TAM comparison' },
    { icon:'💵', big:'$100B', mid:'10-yr robots', sub:'Cumulative market' },
    { icon:'🇺🇸', big:'Mfg', mid:'US reshore', sub:'Factory automation' },
  ],
  quote: 'Physical AI covers embodied systems—factories, robots, autonomy—where sensors and real-time control matter. Digital AI centers on cloud training and inference.',
  noteSub: '10× and $100B are TAM sketches, not revenue guides. Track whether robotics and autonomy orders flow into quarterly prints alongside next-gen GPU timelines. Cybercab is a consumer-facing example of the physical AI narrative today.',
  footer: 'NVDA · physical AI',
});

add('google-tpu-ms', 'L2', 'GOOGL', {
  badge: 'GOOGL', title: '구글 TPU 매출 전망이 2027년 840억·2028년 1,080억 달러로 상향됐습니다',
  heroIcon: '🔲', heroBig: '$84B',
  heroSub: '이전 추정 620억·790억 달러 대비 AI 가속기(TPU) 수요 전망이 커졌습니다. TPU는 구글이 설계한 AI 전용 칩입니다.',
  cards: [
    { label:'2027', big:'$84B', mid:'TPU 매출', sub:'기존 $62B 상향' },
    { label:'2028', big:'$108B', mid:'TPU 매출', sub:'기존 $79B 상향' },
    { label:'AI', big:'가속기', mid:'자체 칩', sub:'NVDA 경쟁 축' },
  ],
  detailHead: '왜 TPU 전망 상향인가',
  detailLines: ['🔲 TPU는 구글 데이터센터·클라우드 AI 학습·추론용','📈 상향은 AI capex 사이클 연장 신호','⚖️ NVDA GPU와 고객 자체 칩(TPU) 믹스 변수'],
  noteSub: '840억·1,080억 달러는 증권사 추정치이며 구글 공식 가이던스가 아닙니다. 클라우드 AI 매출·TPU 가동률·외부 고객(클라우드) 채택이 확인돼야 합니다. NVDA와는 「경쟁」이면서 동시에 대량 GPU 고객이기도 해 이중 노출을 기억하시기 바랍니다.',
  footer: 'GOOGL · TPU MS',
}, {
  badge: 'GOOGL', title: 'Google TPU revenue est. raised to $84B 2027 / $108B 2028 (prior $62B/$79B)',
  heroIcon: '🔲', heroBig: '$84B',
  heroSub: 'Morgan Stanley-style TPU revenue band revised higher—custom accelerator demand in AI capex cycle.',
  cards: [
    { label:'2027', big:'$84B', mid:'TPU revenue', sub:'vs $62B prior' },
    { label:'2028', big:'$108B', mid:'TPU revenue', sub:'vs $79B prior' },
    { label:'AI', big:'Accel', mid:'In-house', sub:'vs NVDA GPUs' },
  ],
  detailHead: 'Why the TPU revision',
  detailLines: ['🔲 TPUs power Google DC training/inference','📈 Raise signals longer AI capex cycle','⚖️ Custom silicon vs merchant GPU mix'],
  noteSub: '$84B/$108B are sell-side estimates—not official Google guidance. Validate via Cloud AI revenue, TPU utilization, and external customer adoption. Google is both NVDA competitor and mega GPU buyer—track the dual exposure.',
  footer: 'GOOGL · TPU MS',
});

add('starship-f14-v3-deploy', 'L3', 'SPCX', {
  badge: 'SPCX', title: '스타십 F14가 V3 스타링크 20~60기 위성을 실운용 투입합니다',
  heroIcon: '🚀', heroBig: 'F14',
  heroSub: 'HLS(달 착륙선) 해치 목업·메카질라 위 스타십 사진도 같은 발사 cadence 맥락입니다. V3는 위성당 용량이 약 10배 큽니다.',
  cards: [
    { icon:'🛰️', big:'20-60', mid:'V3 위성', sub:'실운용 배치' },
    { icon:'🚀', big:'F14', mid:'14번째 비행', sub:'발사 cadence' },
    { icon:'🌙', big:'HLS', mid:'해치 목업', sub:'맥그레거' },
  ],
  quote: 'V3 스타링크는 이전 세대 대비 위성당 처리 용량이 크게 늘어 같은 발사 횟수로 더 많은 가입자·연산을 실을 수 있습니다. 실운용(operational) 투입은 시험과 달리 서비스 품질에 직결됩니다.',
  noteSub: '20~60기는 배치 규모 추정이며 실제 궤도 투입 수는 발사 후 확인해야 합니다. F14 성공은 재사용 로켓 신뢰도와 스타링크·궤도 연산 내러티브를 동시에 살립니다. 9/3 사이버캡·9/15 FOMC와 겹쳐 변동성에 유의하시기 바랍니다.',
  footer: 'SPCX · F14 V3',
}, {
  badge: 'SPCX', title: 'Starship F14 to deploy 20-60 operational V3 Starlinks; HLS hatch mockup',
  heroIcon: '🚀', heroBig: 'F14',
  heroSub: 'Mechazilla Starship photo and McGregor HLS hatch mockup in the same launch cadence arc.',
  cards: [
    { icon:'🛰️', big:'20-60', mid:'V3 sats', sub:'Operational deploy' },
    { icon:'🚀', big:'F14', mid:'Flight 14', sub:'Launch cadence' },
    { icon:'🌙', big:'HLS', mid:'Hatch mockup', sub:'McGregor' },
  ],
  quote: 'V3 Starlinks carry ~10× per-sat capacity vs prior gen—operational deployment affects service quality, not just test milestones.',
  noteSub: '20-60 is a batch band until post-launch counts confirm. F14 success lifts reusable rocket credibility and Starlink/orbital compute narratives together. Overlaps Sept 3 Cybercab and mid-September FOMC volatility.',
  footer: 'SPCX · F14 V3',
});

add('spacex-ai-power-compute', 'L6', 'SPCX', {
  badge: 'SPCX', breaking: '15GW 부족 · 1.2GW 발전',
  title: '스페이스X AI 전력 2027년 15GW 부족·구글·앤스로픽 연산 임대가 거론됐습니다',
  heroBig: '15 GW',
  heroSub: '1.2GW 발전소·지상·우주 연산 임대가 AI 전력 병목 해결책 풀에 포함됩니다.',
  grid: [
    { icon:'⚡', big:'15 GW', mid:'2027 부족', sub:'전력 gap' },
    { icon:'🏭', big:'1.2 GW', mid:'발전소', sub:'지상 전원' },
    { icon:'🤝', big:'Lease', mid:'구글·앤스로픽', sub:'연산 임대' },
    { icon:'🛰️', big:'Orbit', mid:'우주 DC', sub:'궤도 연산' },
  ],
  ctx1: 'GW 숫자는 계획이며 실제 전원 투입·가동률로 검증해야 합니다',
  ctx2: '전력 병목은 칩 주문만큼 AI capex 일정을 미룰 수 있습니다',
  quote: 'AI 데이터센터는 기가와트(GW) 단위 전력이 필요합니다. 15GW 부족은 「칩은 있는데 콘센트가 없다」는 비유로, 허가·송전·발전소 착공이 관문입니다.',
  noteSub: '구글·앤스로픽 임대는 수요 확인 신호이지만 계약 규모·가동 시점을 공시로 대조하시기 바랍니다. 1.2GW 발전소는 지상 해결책, 궤도 연산은 장기 대안 서사입니다. NVDA GPU 출하와 powered GW gap을 같은 분기 표에 두시면 됩니다.',
  footer: 'SPCX · AI power',
}, {
  badge: 'SPCX', breaking: '15 GW gap · 1.2 GW plant',
  title: 'SpaceX cited 15 GW AI power shortfall by 2027; Google/Anthropic leasing compute',
  heroBig: '15 GW',
  heroSub: '1.2 GW power plant and orbital compute lease narratives in the same power bottleneck arc.',
  grid: [
    { icon:'⚡', big:'15 GW', mid:'2027 gap', sub:'Power shortfall' },
    { icon:'🏭', big:'1.2 GW', mid:'Plant', sub:'Ground power' },
    { icon:'🤝', big:'Lease', mid:'Google · Anthropic', sub:'Compute rent' },
    { icon:'🛰️', big:'Orbit', mid:'Space DC', sub:'Long arc' },
  ],
  ctx1: 'GW figures are plans until electrons flow at stated utilization',
  ctx2: 'Power gates AI capex timelines as much as GPU lead times',
  quote: 'AI campuses need gigawatts— a 15 GW gap means chips without sockets until permits, transmission, and plants catch up.',
  noteSub: 'Google/Anthropic leases signal demand but verify size and powered-on dates in filings. The 1.2 GW plant is ground solution; orbital compute is long-term alt. Track NVDA shipments vs powered GW gap each quarter.',
  footer: 'SPCX · AI power',
});

add('giga-texas-sept2-update', 'L2', 'TSLA', {
  badge: 'TSLA', title: '기가 텍사스에서 사이버캡 시험·생산·칩 fab 기초·코텍스2·옵티머스 북캠퍼스가 동시에 진행 중입니다',
  heroIcon: '🏭', heroBig: 'GIGA TX',
  heroSub: '9월 2일 전후 사이버캡 테스트/생산, 반도체 fab 기초 공사, 코텍스 2.0 메가팩, 옵티머스 N캠퍼스 철골이 한 캠퍼스에 겹칩니다.',
  cards: [
    { label:'Cybercab', big:'Test', mid:'시험·생산', sub:'로보택시' },
    { label:'Fab', big:'Foundation', mid:'칩 fab', sub:'기초 공사' },
    { label:'Optimus', big:'Steel', mid:'N캠퍼스', sub:'휴머노이드' },
  ],
  detailHead: '왜 한 캠퍼스인가',
  detailLines: ['🚕 차량·로bo·칩·에너지가 수직 통합','⚡ 메가팩은 전력·피크 셰이빙','🤖 옵티머스는 물리 AI 실행 예시'],
  noteSub: '사진·공사 진행은 「실행」 신호이지만 가동·수율·허가는 별도입니다. 9/3 행사는 사이버캡 축, fab·옵티머스는 분기·연 단위 마일스톤으로 추적하시기 바랍니다. 텍사스 전력·허가 뉴스와 함께 보시면 AI·EV capex 그림이 연결됩니다.',
  footer: 'TSLA · Giga Texas',
}, {
  badge: 'TSLA', title: 'Giga Texas Sept 2: Cybercab test/prod, chip fab foundation, Cortex 2 Megapacks, Optimus steel',
  heroIcon: '🏭', heroBig: 'GIGA TX',
  heroSub: 'Cybercab, semi fab foundation, Cortex 2 Megapacks, Optimus N Campus steel progressing together.',
  cards: [
    { label:'Cybercab', big:'Test', mid:'Test/prod', sub:'Robotaxi' },
    { label:'Fab', big:'Foundation', mid:'Chip fab', sub:'Groundwork' },
    { label:'Optimus', big:'Steel', mid:'N Campus', sub:'Humanoid' },
  ],
  detailHead: 'One campus thesis',
  detailLines: ['🚕 Vehicles, robotaxi, chips, energy integrated','⚡ Megapacks for peak power','🤖 Optimus as physical AI example'],
  noteSub: 'Construction photos signal execution—not yield or permits. Sept 3 event is Cybercab axis; fab and Optimus are quarterly milestones. Pair with Texas power/permit headlines for the full AI+EV capex map.',
  footer: 'TSLA · Giga Texas',
});

add('tesla-fsd-france-eu', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라 FSD 프랑스 화상회의·2대 도로 시험·EU 승인이 수주 내 임박했습니다',
  heroIcon: '🇫🇷', heroBig: 'FSD EU',
  heroSub: '유럽 규제 승인은 미국 사이버캡과 별개 축입니다. 2대 도로 시험은 소규모이지만 상용화 관문입니다.',
  cards: [
    { icon:'🇪🇺', big:'EU', mid:'승인 임박', sub:'수주 내' },
    { icon:'🚗', big:'2대', mid:'도로 시험', sub:'프랑스' },
    { icon:'💻', big:'Virtual', mid:'화상회의', sub:'규제 대화' },
  ],
  quote: 'FSD(완전자율주행) 유럽 승인은 국가별 규칙·데이터·보험이 관문입니다. 2대 시험은 fleet 규모는 작지만 「도로에 올렸다」는 실행 신호입니다.',
  noteSub: '미국 9/3 사이버캡과 EU FSD는 같은 브랜드지만 규제·차량·수익 모델이 다릅니다. 승인 문구(무인 허용 범위·지오펜스)를 공식 문서로 확인하시기 바랍니다. 프랑스·독일· nordics 순서로 확장되는지 분기마다 기록하시면 됩니다.',
  footer: 'TSLA · FSD France',
}, {
  badge: 'TSLA', title: 'Tesla FSD France virtual meeting; 2 cars on-road testing; EU approval in coming weeks',
  heroIcon: '🇫🇷', heroBig: 'FSD EU',
  heroSub: 'European regulatory track separate from US Cybercab—two-car road test is small but meaningful.',
  cards: [
    { icon:'🇪🇺', big:'EU', mid:'Approval soon', sub:'Weeks cited' },
    { icon:'🚗', big:'2', mid:'Road test', sub:'France' },
    { icon:'💻', big:'Virtual', mid:'Meeting', sub:'Reg dialogue' },
  ],
  quote: 'EU FSD approval gates on national rules, data, and insurance—two test cars are an execution signal, not fleet scale.',
  noteSub: 'Sept 3 Cybercab and EU FSD share a brand but differ on rules, vehicles, and revenue. Read official permit language for unmanned scope. Log France→Germany→Nordics expansion order each quarter.',
  footer: 'TSLA · FSD France',
});

add('treasury-yields-credit', 'L5', 'RATES', {
  badge: 'RATES', title: '미국 10년물 국채 4.80%·30년물 약 5.30%로 신용·지속 리스크 우려가 부각됐습니다',
  heroIcon: '📈', heroBig: '4.80%',
  heroSub: '장기금리 상승은 주식 밸류에이션·부동산·고레버리지 섹터에 압력을 줄 수 있습니다. 신용 스프레드도 함께 확인하시기 바랍니다.',
  before: { label:'이전', big:'~4.6%', sub:'10년물 참고' },
  after:  { label:'9/3', big:'4.80%', sub:'10년물' },
  cards: [
    { icon:'📊', big:'4.80%', mid:'10년', sub:'국채 수익률' },
    { icon:'📉', big:'~5.30%', mid:'30년', sub:'장기 금리' },
    { icon:'⚠️', big:'Credit', mid:'리스크', sub:'스프레드' },
  ],
  quote: '10년물 4.80%는 할인율(미래 이익 현재가치)을 낮춰 성장주·장기 자산에 압력을 줄 수 있습니다. 30년 5.30%대는 재정·물가 기대가 장기 금리에 반영된 신호로 읽힐 수 있습니다.',
  noteSub: '금리만으로 매매하지 말고 「왜 올랐는가」(물가·재정·공급)를 메모하시기 바랍니다. 9/3 사이버캡 같은 이벤트 주에도 금리가 동시에 움직이면 섹터별로 영향이 갈립니다. FOMC 9/15~16 전 포지션 크기 조절을 검토하시면 됩니다.',
  footer: '매크로 · Treasury',
}, {
  badge: 'RATES', title: 'US 10yr Treasury 4.80%; 30yr ~5.30% — credit risk anxiety cited',
  heroIcon: '📈', heroBig: '4.80%',
  heroSub: 'Higher long rates pressure equity multiples, housing, and leveraged sectors—watch credit spreads.',
  before: { label:'Prior', big:'~4.6%', sub:'10yr reference' },
  after:  { label:'Sept 3', big:'4.80%', sub:'10yr yield' },
  cards: [
    { icon:'📊', big:'4.80%', mid:'10yr', sub:'Treasury' },
    { icon:'📉', big:'~5.30%', mid:'30yr', sub:'Long end' },
    { icon:'⚠️', big:'Credit', mid:'Risk', sub:'Spreads' },
  ],
  quote: '4.80% on the 10yr raises discount rates on growth assets; ~5.30% 30yr may embed fiscal/inflation expectations.',
  noteSub: 'Note why yields rose (inflation, supply, fiscal)—not the level alone. On event weeks like Cybercab, rates and stocks may diverge by sector. Consider sizing into Sept 15-16 FOMC.',
  footer: 'Macro · Treasury',
});

add('pension-funding-112', 'L1', 'MACRO', {
  badge: 'MACRO', title: '미국 연금 기금 충당률이 112%로 2001년 이후 최고 수준(98백분위)입니다',
  heroIcon: '🏦', heroBig: '112%',
  heroSub: '충당률(funding ratio)은 연금 자산가치를 부채(지급 의무)로 나눈 비율입니다. 100% 이상이면 통계상 「완전 충당」에 가깝습니다.',
  cards: [
    { icon:'📊', big:'112%', mid:'충당률', sub:'2001년 이후 최고' },
    { icon:'📈', big:'98th', mid:'백분위', sub:'역사적 상위' },
    { icon:'⚖️', big:'Risk', mid:'자산 배분', sub:'주식·채권' },
  ],
  quote: '연금이 주식에 많이 올라가 있으면 시장 조정 시 충당률이 빠르게 내려갈 수 있습니다. 112%는 「지금」 스냅샷이며 금리·주가 변동에 민감합니다.',
  noteSub: '높은 충당률은 단기적으로 리밸런싱(주식 매도·채권 매수) 압력을 만들 수 있습니다. 10년물 4.80%와 함께 보면 할인율·부채 가치 변동도 연결됩니다. 장기 투자자는 연금 flow가 「매수 지지」인지 「조정 시 매도」인지 구분하시기 바랍니다.',
  footer: '매크로 · Pension',
}, {
  badge: 'MACRO', title: 'US pension funding at 112% — highest since 2001 (98th percentile)',
  heroIcon: '🏦', heroBig: '112%',
  heroSub: 'Funding ratio = assets over liabilities; above 100% reads as fully funded on paper.',
  cards: [
    { icon:'📊', big:'112%', mid:'Funded', sub:'Since 2001 high' },
    { icon:'📈', big:'98th', mid:'Percentile', sub:'Historical top' },
    { icon:'⚖️', big:'Alloc', mid:'Stocks/bonds', sub:'Flow risk' },
  ],
  quote: 'Heavy equity weights mean funding ratios fall fast in drawdowns—112% is a snapshot sensitive to rates and stocks.',
  noteSub: 'High funding can trigger de-risking (sell equities, buy bonds). Pair with 4.80% 10yr for discount-rate moves. Long-term holders should split pension flows between support vs forced selling in corrections.',
  footer: 'Macro · Pension',
});

add('cathie-wood-apple-ai', 'L4', 'AAPL', {
  badge: 'AAPL', badgeLine: '⚡ AI disruption · ATH',
  title: '캐시 우드가 애플에 AI 디스ruption 리스크가 고점이라고 경고했습니다',
  heroIcon: '🍎', heroBig: 'AI risk',
  heroSub: '애플 주가가 사상 최고가 부근일 때 AI 기능·경쟁·규제 변수를 다시 짚은 메시지입니다.',
  cards: [
    { icon:'🤖', big:'AI', mid:'디스ruption', sub:'서비스·기기' },
    { icon:'📱', big:'AAPL', mid:'고점', sub:'밸류에이션' },
    { icon:'⚖️', big:'Reg', mid:'규제', sub:'앱스토어·AI' },
  ],
  quote: 'AI 디스ruption은 「애플이 AI를 못한다」가 아니라 「AI가 기존 마진·생태계를 바꿀 수 있다」는 뜻으로 읽힐 수 있습니다. Siri·클라우드 AI 일정이 관건입니다.',
  noteSub: '성장주 전문 포트폴리오 관점의 경고이므로 단기 매매 신호로 단정하지 마시기 바랍니다. 분기 서비스 매출·AI 기능 출시·중국 수요를 공식 실적으로 대조하시면 됩니다. 9/3 테슬라·NVDA 이벤트와 겹치면 「AI 승자」 내러티브가 섹터 로테이션을 키울 수 있습니다.',
  footer: 'AAPL · AI risk',
}, {
  badge: 'AAPL', badgeLine: '⚡ AI disruption · highs',
  title: 'Cathie Wood flags Apple AI disruption risk near highs',
  heroIcon: '🍎', heroBig: 'AI risk',
  heroSub: 'Warning on AI competition/regulation as Apple trades near record levels.',
  cards: [
    { icon:'🤖', big:'AI', mid:'Disruption', sub:'Services · devices' },
    { icon:'📱', big:'AAPL', mid:'Highs', sub:'Valuation' },
    { icon:'⚖️', big:'Reg', mid:'Policy', sub:'App Store · AI' },
  ],
  quote: 'AI disruption here may mean margin/ecosystem shift—not simply "Apple can\'t do AI." Siri and cloud AI timelines matter.',
  noteSub: 'Growth-manager framing—not a standalone trade signal. Cross-check Services revenue and AI ship dates in official prints. Sept 3 TSLA/NVDA headlines may rotate "AI winner" narratives across sectors.',
  footer: 'AAPL · AI risk',
});

add('tesla-battery-safety-blog', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라가 9월 3일 배터리 안전 블로그를 발表했습니다',
  heroIcon: '🔋', heroBig: '285B mi',
  heroSub: '2850억 마일(약 285B miles) 주행 중 자발적 화재 0건, PPR·4680 셀·8년 보증 70% 용량 유지를 강조했습니다.',
  cards: [
    { icon:'🛣️', big:'285B', mid:'누적 마일', sub:'자발적 화재 0' },
    { icon:'🔬', big:'4680', mid:'셀', sub:'구조·PPR' },
    { icon:'📜', big:'8yr', mid:'보증', sub:'70% 용량' },
  ],
  quote: 'PPR(펄스·패턴·리스ponse)은 배터리 열 폭주를 막기 위한 소프트웨어·하드웨어 안전 계층입니다. 4680은 테슬라 대형 원통형 셀 포맷입니다.',
  noteSub: '누적 마일·화재 0건은 브랜드·규제·보험 협상에 유리한 데이터입니다. 다만 「0건」은 정의(자발적 vs 사고 연관)를 공식 문서로 확인하시기 바랍니다. 로bo택시 fleet 확대 시 안전 통계가 상용화 허가 argument로 이어지는지 추적하시면 됩니다.',
  footer: 'TSLA · Battery safety',
}, {
  badge: 'TSLA', title: 'Tesla Sept 3 battery safety blog: 285B miles no spontaneous fire, 4680, 8yr 70% warranty',
  heroIcon: '🔋', heroBig: '285B mi',
  heroSub: 'Zero spontaneous fires cited over 285B miles; PPR, 4680 cell, 8-year 70% retention warranty.',
  cards: [
    { icon:'🛣️', big:'285B', mid:'Miles', sub:'0 spontaneous fire' },
    { icon:'🔬', big:'4680', mid:'Cell', sub:'PPR layers' },
    { icon:'📜', big:'8yr', mid:'Warranty', sub:'70% capacity' },
  ],
  quote: 'PPR layers help prevent thermal runaway; 4680 is Tesla\'s large-format cylindrical cell.',
  noteSub: 'Mileage and zero-fire stats support brand, regulation, and insurance talks—verify definitions in official docs. As robotaxi fleets scale, watch whether safety stats feed permit arguments.',
  footer: 'TSLA · Battery safety',
});

add('ark-cybercab-uber-elasticity', 'L5', 'TSLA', {
  badge: 'ARK', title: 'ARK가 사이버캡 TAM이 우버 대비 30~60배·우버 수요 탄력성 논쟁을 짚었습니다',
  heroIcon: '📊', heroBig: '30-60×',
  heroSub: '전용 로bo fleet의 시장 규모 추정과 플랫폼(우버) 가격 탄력성 가정이 충돌하는 프레임입니다.',
  before: { label:'Uber', big:'Platform', sub:'탄력적 수요' },
  after:  { label:'Cybercab', big:'30-60×', sub:'TAM 추정' },
  cards: [
    { icon:'🚕', big:'30-60×', mid:'TAM vs Uber', sub:'ARK 프레임' },
    { icon:'💰', big:'$/mi', mid:'마진', sub:'유닛 이코노믹스' },
    { icon:'📅', big:'9/3', mid:'행사', sub:'가정 검증일' },
  ],
  quote: 'TAM(전체 시장) 30~60배는 「로bo가 택시보다 훨씬 큰 시장」 가정입니다. 탄력성(elasticity)은 가격이 내려가면 수요가 얼마나 늘어나는지를 뜻합니다.',
  noteSub: '모델 숫자는 오늘 행사 결과로 부분 검증됩니다. 무인 마일·요금·지오펜스가 TAM 가정과 맞는지 분기마다 기록하시기 바랍니다. 우버는 「경쟁 비용」 프레임, 테슬라는 「fleet owner」 프레임으로 같은 날 두 갈래 서사가 갈립니다.',
  footer: 'ARK · Cybercab TAM',
}, {
  badge: 'ARK', title: 'ARK Brett Winton: Cybercab market 30-60× vs Uber; elasticity debate',
  heroIcon: '📊', heroBig: '30-60×',
  heroSub: 'Dedicated robotaxi TAM vs platform demand elasticity—competing frames on Sept 3.',
  before: { label:'Uber', big:'Platform', sub:'Elastic demand' },
  after:  { label:'Cybercab', big:'30-60×', sub:'TAM estimate' },
  cards: [
    { icon:'🚕', big:'30-60×', mid:'TAM vs Uber', sub:'ARK frame' },
    { icon:'💰', big:'$/mi', mid:'Margin', sub:'Unit economics' },
    { icon:'📅', big:'Sept 3', mid:'Event', sub:'Test assumptions' },
  ],
  quote: '30-60× TAM assumes robotaxi is far larger than ride-hail; elasticity is how much demand rises when price falls.',
  noteSub: 'Model outputs get partial reality checks today. Log unmanned miles, pricing, and geofence vs TAM assumptions each quarter. Uber reads as competition cost; Tesla as fleet owner—two narratives splitting on event day.',
  footer: 'ARK · Cybercab TAM',
});

};
