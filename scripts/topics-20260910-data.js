// 2026-09-10 SVG topic data — consumed by gen-reports-20260910.js
// Layout mix: ROWS×1 L1×5 L2×4 L3×5 L4×4 L5×3 L6×4 (individuals ≤40% one layout)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.10 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'AI', title:'인공지능·로봇이 경제를 10년 안에 두 배로 키울 수 있다는 발언이 나왔습니다',
      sub:'이전 20~30% 언급보다 한 단계 센 톤입니다. 일정·수율과 칸을 나누시기 바랍니다.' },
    { color:'#22c55e', fill:'#061209', right:'플릿', title:'텍사스 자율차 집계가 437대(오늘 +5)로 찍혔습니다',
      sub:'모델Y 388대(88.8%)·사이버캡 49대(11.2%)입니다. 오스틴 1,000대 준비와 칸을 나누시기 바랍니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'NVL72 랙 매출이 2027년 7,100억 달러 이상으로 전망됐습니다',
      sub:'전년 대비 약 +214%이고, 랙 대수는 약 +50%입니다. 의견과 실적을 나누시기 바랍니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'국채', title:'재무부가 장기 바이백을 60억 달러로 세 배 키웠습니다',
      sub:'10년물 약 4.83%는 2023년 이후 최고권입니다. 규모와 금리 반응을 한 줄에 합치지 마시기 바랍니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'스페이스X 락업 약 3.19억 주가 달력 90일 구간에 들어왔습니다',
      sub:'약 7% 물량이고 다음은 180일 블록입니다. 머스크 합산 시총 약 3.48조 달러와 칸을 나누시기 바랍니다.' },
    { color:'#38bdf8', fill:'#061520', right:'S&P', title:'S&P 달력 EPS 2026년 추정치가 367(+34%)로 잡혔습니다',
      sub:'연초 약 15% 기대보다 두 배 이상입니다. 침체 없이 이익이 늘어난다는 가정입니다.' },
    { color:'#4285f4', fill:'#06121f', right:'GOOGL', title:'구글 핀란드 인공지능 인프라가 150억 달러 이상으로 거론됐습니다',
      sub:'풍력·94MW 배터리·22년 원전 계약이 붙었습니다. 텍사스 세미 25대와 칸을 나누시기 바랍니다.' },
  ],
  caption: '더 볼 것: 경제 2배 · 텍사스437 · NVL72 · 바이백60억 · 락업3.19억 · EPS367 · 핀란드150억',
}, {
  headline: '2026.09.10 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'AI', title:'AI plus robots could double the global economy in under 10 years',
      sub:'A stronger tone than the prior 20–30% remark. Split timing and yield from the quote.' },
    { color:'#22c55e', fill:'#061209', right:'Fleet', title:'Texas AV fleet printed 437 (+5 today)',
      sub:'Model Y 388 (88.8%) and Cybercab 49 (11.2%). Keep Austin’s 1,000-unit prep on a separate line.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'NVL72 rack sales seen above $710B in 2027',
      sub:'About +214% year on year; rack count about +50%. Split forecast from booked revenue.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'UST', title:'Treasury tripled long-term buybacks to $6B',
      sub:'10-year yield near 4.83%, highest since 2023. Do not mash size and the rate reaction.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'SpaceX lockup of ~319M shares entered the day-90 window',
      sub:'About 7% of float; next is the 180-day block. Split from Musk’s combined ~$3.48T.' },
    { color:'#38bdf8', fill:'#061520', right:'S&P', title:'S&P calendar EPS 2026E printed 367 (+34%)',
      sub:'More than double the ~15% expected at year-start. A no-recession earnings path.' },
    { color:'#4285f4', fill:'#06121f', right:'GOOGL', title:'Google Finland AI infrastructure cited above $15B',
      sub:'Wind, a 94 MW battery, and a 22-year nuclear deal. Keep the Texas Semi 25 on another cell.' },
  ],
  caption: 'Watch: 2× economy · TX 437 · NVL72 · $6B buyback · 319M unlock · EPS 367 · Finland $15B+',
});

add('musk-ai-robots-double', 'L4', 'AI', {
  badge: 'AI', badgeLine: '🤖 인공지능 · 로봇',
  title: '인공지능과 로봇이 세계 경제를 10년 안에 두 배로 키울 수 있다는 발언이 나왔습니다',
  heroIcon: '🤖', heroBig: '2배',
  heroSub: '이전에는 20~30% 성장 여지를 말한 톤이었습니다. 이번에는 10년 안에 경제 규모가 두 배가 될 수 있다는 표현으로 한 단계 세졌습니다.',
  cards: [
    { icon:'⏱', big:'<10년', mid:'두 배가 되는 시계', sub:'20~30년 단위가 아닌 10년 안' },
    { icon:'📈', big:'20~30%', mid:'이전 발언 범위', sub:'같은 주제가 한 단계 커진 것' },
    { icon:'🦾', big:'로봇', mid:'인공지능과 같이 묶인 축', sub:'소프트웨어만의 성장이 아님' },
  ],
  quote: '경제를 두 배로 키운다는 말은 생산성 가정이 크게 올라갔다는 뜻입니다. 공장 수율·허가·전력은 아직 빈칸입니다. 발언과 실측 출하를 한 문장에 넣지 마시기 바랍니다.',
  noteSub: '이 발언은 목표가 아니라 생산성 시나리오입니다. 옵티머스 부품 5,000대 주문과 같은 화면에 있어도 칸을 나누시기 바랍니다. 다음 확인할 것은 로봇 출고와 공장 가동률입니다. 장기적으로 노동 대체 속도가 국내총생산 가정의 핵심이 됩니다.',
  footer: '인공지능 · 경제 두 배',
}, {
  badge: 'AI', badgeLine: '🤖 AI · robots',
  title: 'AI and robots could double the global economy in under 10 years',
  heroIcon: '🤖', heroBig: '2×',
  heroSub: 'Earlier remarks pointed to 20–30% upside. This print uses a stronger “double in under 10 years” framing.',
  cards: [
    { icon:'⏱', big:'<10y', mid:'Clock for a doubling', sub:'Not a 20–30 year horizon' },
    { icon:'📈', big:'20–30%', mid:'Prior remark range', sub:'Same theme, one step larger' },
    { icon:'🦾', big:'Robots', mid:'Paired with AI', sub:'Not software-only growth' },
  ],
  quote: 'Doubling the economy means a much larger productivity assumption. Factory yield, permits, and power are still blank. Do not mash the quote with shipment prints.',
  noteSub: 'This is a productivity scenario, not a target. Keep the 5,000 Optimus parts order on another cell. Next: robot shipments and factory utilization. Labor substitution speed becomes a GDP-assumption input over years.',
  footer: 'AI · economy 2×',
});

add('florida-cybercab-i275', 'L3', 'TSLA', {
  badge: 'TSLA', title: '플로리다 I-275에서 금색 사이버캡이 세인트피터즈버그 쪽으로 옮겨지는 장면이 나왔습니다',
  heroIcon: '🚛', heroBig: 'I-275',
  heroSub: '사이버캡은 운전석 없는 전용 로보택시 차량입니다. 금색 차체들이 운송 트럭에 실려 주간고속도로 I-275를 따라 세인트피터즈버그 방향으로 이동하는 현장이 공유됐습니다.',
  cards: [
    { icon:'🚕', big:'금색', mid:'사이버캡 차체 색', sub:'양산색과 구분되는 현장 도장' },
    { icon:'🛣', big:'I-275', mid:'플로리다 주간고속도로', sub:'탬파베이 권역 이동 경로' },
    { icon:'📍', big:'세인트P', mid:'도착 방향', sub:'테스트·배치 거점으로 읽힘' },
  ],
  quote: '트럭에 실린 차는 아직 유료 호출이 아닙니다. 오스틴 1,000대 준비·텍사스 49대와 같은 칸에 넣으면 착시가 납니다. 다음 확인할 것은 플로리다 지오펜스와 운행 허가입니다.',
  noteSub: '현장 사진은 물류이지 매출이 아닙니다. 금색 도장은 마케팅·테스트 차량일 수 있어 양산 도장과 나누시기 바랍니다. 다음 게이트는 플로리다 유료 구간입니다. 장기적으로 주별 허가가 열리면 로보택시 주소시장이 넓어집니다.',
  footer: '테슬라 · 플로리다 사이버캡',
}, {
  badge: 'TSLA', title: 'Gold Cybercabs were photographed on I-275 heading toward St. Petersburg',
  heroIcon: '🚛', heroBig: 'I-275',
  heroSub: 'Cybercab is the wheel-free dedicated robotaxi. Gold units were shown on a transporter along I-275 toward St. Petersburg.',
  cards: [
    { icon:'🚕', big:'Gold', mid:'Cybercab body color', sub:'May differ from mass-paint' },
    { icon:'🛣', big:'I-275', mid:'Florida interstate', sub:'Tampa Bay corridor' },
    { icon:'📍', big:'St. Pete', mid:'Heading shown', sub:'Read as a test/deploy node' },
  ],
  quote: 'Cars on a truck are not paid rides. Do not mash with Austin’s 1,000-unit prep or Texas 49. Next: Florida geofence and operating permits.',
  noteSub: 'A logistics photo is not revenue. Gold paint may be marketing or test—split from mass paint. Next gate: Florida paid segments. State permits can widen the robotaxi addressable market over years.',
  footer: 'TSLA · Florida Cybercab',
});

add('fcc-starlink-spectrum', 'L6', 'SPCX', {
  badge: 'BREAKING', breaking: 'FCC · 스타링크 스펙트럼',
  title: '미 통신위원회가 스타링크에 12GHz와 42GHz에서 1,000MHz가 넘는 대역을 열어 줬습니다',
  heroBig: '1000+',
  heroSub: '스펙트럼은 무선으로 데이터를 실어 나르는 주파수 구간입니다. 위성 광대역용으로 12GHz와 42GHz에서 합쳐 1,000MHz가 넘는 폭이 거론됐습니다.',
  grid: [
    { icon:'📡', big:'12GHz', mid:'낮은 쪽 대역', sub:'커버·장애물 특성이 다름' },
    { icon:'📶', big:'42GHz', mid:'높은 쪽 대역', sub:'용량은 크고 도달은 짧음' },
    { icon:'➕', big:'1000+', mid:'MHz 폭', sub:'두 대역을 합친 규모' },
    { icon:'🛰', big:'위성', mid:'광대역 용도', sub:'지상망과 다른 전달 경로' },
  ],
  ctx1: '대역이 넓어지면 가입자당 속도 상한이 올라갈 수 있습니다. 단말·빔 설계가 받쳐야 합니다.',
  ctx2: '허가와 실제 용량은 다릅니다. 혼신·국가별 조율이 남습니다.',
  quote: '1,000MHz가 넘는 폭은 스타링크가 쓸 수 있는 고속도로 차선이 늘었다는 뜻입니다. 요금제 속도·대기 시간과 바로 같지는 않습니다. 다음 확인할 것은 상용 채널 배치입니다.',
  noteSub: '주파수는 인프라 허가이지 분기 매출이 아닙니다. 호커 비즈니스젯 1Gbps 서사와 칸을 나누시기 바랍니다. 다음 게이트는 단말 공급과 국가별 승인입니다. 장기적으로 위성 광대역 해자는 스펙트럼·궤도·단말 원가가 겹칠 때 두꺼워집니다.',
  footer: '스페이스X · 스타링크 스펙트럼',
}, {
  badge: 'BREAKING', breaking: 'FCC · STARLINK SPECTRUM',
  title: 'The FCC opened 1,000+ MHz for Starlink in the 12 GHz and 42 GHz bands',
  heroBig: '1000+',
  heroSub: 'Spectrum is the radio slice that carries data. More than 1,000 MHz for satellite broadband was cited across 12 GHz and 42 GHz.',
  grid: [
    { icon:'📡', big:'12GHz', mid:'Lower band', sub:'Different coverage traits' },
    { icon:'📶', big:'42GHz', mid:'Higher band', sub:'More capacity, shorter reach' },
    { icon:'➕', big:'1000+', mid:'MHz width', sub:'Combined size cited' },
    { icon:'🛰', big:'Sat', mid:'Broadband use', sub:'Not a terrestrial path' },
  ],
  ctx1: 'Wider spectrum can lift per-user speed caps if terminals and beams keep up.',
  ctx2: 'A permit is not live capacity. Interference and country coordination remain.',
  quote: '1,000+ MHz means more highway lanes for Starlink. It is not the same as plan speed or latency. Next: commercial channel deployment.',
  noteSub: 'Spectrum is an infrastructure permit, not quarterly revenue. Split from the Hawker 1 Gbps story. Next: terminals and national approvals. Spectrum, orbits, and terminal cost can thicken the broadband moat over years.',
  footer: 'SPCX · Starlink spectrum',
});

add('texas-fleet-437', 'L2', 'TSLA', {
  badge: 'TSLA', title: '텍사스 교통국 집계로 자율차 플릿이 437대, 오늘 5대가 늘었습니다',
  heroIcon: '🚗', heroBig: '437',
  heroSub: '플릿은 도로에 등록·운행 중인 차량 대수입니다. 오늘 모델Y 1대와 사이버캡 4대가 더해져 모델Y 388대(88.8%)·사이버캡 49대(11.2%)가 됐습니다.',
  cards: [
    { label:'합계', big:'437', mid:'텍사스 전체', sub:'오늘 +5대(Y 1·캡 4)' },
    { label:'모델Y', big:'388', mid:'88.8% 비중', sub:'소프트웨어 로보택시 축' },
    { label:'사이버캡', big:'49', mid:'11.2% 비중', sub:'전용차 축이 아직 소수' },
  ],
  detailHead: '대수가 의미하는 것',
  detailLines: ['📍 등록·운행 공급이지 유료 마일이 아님','🚗 모델Y와 사이버캡은 차체·원가가 다름','💵 다음 확인은 주간 증차와 호출 요금'],
  noteSub: '어제 432대 서사에서 하루 +5입니다. 웨이모 대수와 정의가 같은지 확인하시기 바랍니다. 오스틴 1,000대 준비는 계획 칸입니다. 장기적으로 전용차 비중이 올라가면 원가 곡선이 달라질 수 있습니다.',
  footer: '테슬라 · 텍사스 437',
}, {
  badge: 'TSLA', title: 'Texas DMV fleet printed 437 after +5 vehicles today',
  heroIcon: '🚗', heroBig: '437',
  heroSub: 'Fleet means registered/operating vehicles. Today added 1 Model Y and 4 Cybercabs, taking Model Y to 388 (88.8%) and Cybercab to 49 (11.2%).',
  cards: [
    { label:'Total', big:'437', mid:'Texas print', sub:'+5 today (Y 1 · cab 4)' },
    { label:'Model Y', big:'388', mid:'88.8% mix', sub:'Software robotaxi axis' },
    { label:'Cybercab', big:'49', mid:'11.2% mix', sub:'Purpose-built still small' },
  ],
  detailHead: 'What the count means',
  detailLines: ['📍 Supply, not paid miles','🚗 Model Y and Cybercab differ in body and cost','💵 Next: weekly adds and fares'],
  noteSub: 'That is +5 versus yesterday’s 432 story. Confirm the definition matches Waymo’s count. Austin’s 1,000-unit prep is a plan cell. A higher purpose-built mix can change the cost curve over years.',
  footer: 'TSLA · Texas 437',
});

add('goldman-cybercab-cpm', 'L1', 'TSLA', {
  badge: 'TSLA', title: '골드만은 사이버캡이 대당 2만~3만 달러면 마일당 비용이 웨이모보다 최대 30센트 낮을 수 있다고 봤습니다',
  heroIcon: '💵', heroBig: '30¢',
  heroSub: 'CPM은 차량을 1마일 굴리는 데 드는 완전 원가입니다. 차 값이 2만~3만 달러 구간에 들어오면 웨이모보다 마일당 최대 30센트 싸질 수 있다는 의견입니다.',
  cards: [
    { icon:'🏭', big:'$20–30k', mid:'가정 생산 원가', sub:'아직 확정 출고가가 아님' },
    { icon:'📏', big:'30¢', mid:'마일당 최대 차이', sub:'완전 적재 원가 기준 의견' },
    { icon:'🚕', big:'웨이모', mid:'비교 대상', sub:'다른 센서·차체 원가' },
  ],
  quote: '30센트는 의견 칸입니다. 배터리·보험·이용률이 비기 전에는 표에 「가정」으로 남기시기 바랍니다. 사이버캡 전비 6.1마일/kWh·무게 3,113파운드 스펙과 합치지 마시기 바랍니다.',
  noteSub: '원가 모델은 생산가가 2만 달러 구간에 안착하는지에 달립니다. 페인트샵 70% 축소·무도장 서사는 원가 가정에 영향을 줍니다. 다음 확인할 것은 실제 출고가와 보험료입니다. 장기적으로 마일당 원가가 낮으면 요금 경쟁력이 생깁니다.',
  footer: '테슬라 · 사이버캡 CPM',
}, {
  badge: 'TSLA', title: 'Goldman said Cybercab could run up to 30¢/mile cheaper than Waymo at $20k–$30k',
  heroIcon: '💵', heroBig: '30¢',
  heroSub: 'CPM is fully loaded cost per mile. If build cost lands in the $20k–$30k band, Cybercab could be up to 30 cents cheaper per mile than Waymo—an opinion, not a print.',
  cards: [
    { icon:'🏭', big:'$20–30k', mid:'Assumed build cost', sub:'Not a locked MSRP' },
    { icon:'📏', big:'30¢', mid:'Max per-mile gap', sub:'Fully loaded opinion' },
    { icon:'🚕', big:'Waymo', mid:'Comparison set', sub:'Different sensor/body cost' },
  ],
  quote: '30 cents is an opinion cell. Keep battery, insurance, and utilization blank until they print. Do not mash with 6.1 mi/kWh and 3,113 lb specs.',
  noteSub: 'The cost model hinges on a $20k-band build. Paint-shop −70% and no-paint Cybercab stories feed the assumption. Next: actual ex-factory price and insurance. Lower CPM can become fare competitiveness over years.',
  footer: 'TSLA · Cybercab CPM',
});

add('lyft-waymo-nashville', 'L4', 'TSLA', {
  badge: 'LYFT', badgeLine: '🚕 내슈빌 · 웨이모',
  title: '리프트가 구글 소유 웨이모 차로 내슈빌에서 로보택시를 열며 주가가 14.90달러(−8.25%)로 밀렸습니다',
  heroIcon: '📉', heroBig: '−8.25%',
  heroSub: '리프트는 호출 앱이고 웨이모는 구글의 로보택시 회사입니다. 내슈빌에서 리프트 앱으로 웨이모 차를 부르는 제휴가 나온 뒤 리프트 주가가 하루 −8.25%였습니다.',
  cards: [
    { icon:'📱', big:'리프트', mid:'호출 앱 역할', sub:'차를 직접 안 만드는 중개' },
    { icon:'🚘', big:'웨이모', mid:'구글 소유 차량', sub:'센서·소프트웨어를 가진 쪽' },
    { icon:'📍', big:'내슈빌', mid:'첫 공개 도시', sub:'다른 도시로 바로 확장되지 않음' },
  ],
  quote: '앱이 남의 차를 부르면 마진이 얇아질 수 있다는 해석이 붙었습니다. 테슬라 전용차 원가 서사와 한 문장으로 승자를 단정하지 마시기 바랍니다. 다음 확인할 것은 내슈빌 이용 건수와 리프트 수수료입니다.',
  noteSub: '주가 −8.25%는 하루 반응입니다. 제휴는 공급을 빨리 늘리는 길일 수도 있습니다. 테슬라 사이버캡 CPM 의견과 칸을 나누시기 바랍니다. 장기적으로 호출 네트워크와 차량 원가 중 누가 마진을 가져가는지가 쟁점입니다.',
  footer: '리프트 · 웨이모 내슈빌',
}, {
  badge: 'LYFT', badgeLine: '🚕 Nashville · Waymo',
  title: 'Lyft opened Nashville robotaxi in Google-owned Waymo cars as LYFT fell to $14.90 (−8.25%)',
  heroIcon: '📉', heroBig: '−8.25%',
  heroSub: 'Lyft is the ride app; Waymo is Google’s robotaxi unit. After a Nashville tie-up using Waymo cars, Lyft stock printed $14.90 (−8.25%).',
  cards: [
    { icon:'📱', big:'Lyft', mid:'App role', sub:'Intermediary, not the carmaker' },
    { icon:'🚘', big:'Waymo', mid:'Google-owned fleet', sub:'Owns sensors and software' },
    { icon:'📍', big:'Nashville', mid:'Launch city', sub:'Not an instant national map' },
  ],
  quote: 'Calling someone else’s cars can thin app margins. Do not crown a winner versus Tesla’s purpose-built cost story in one sentence. Next: Nashville trip counts and Lyft take-rate.',
  noteSub: '−8.25% is a one-day tape. A partnership can also scale supply faster. Split from Tesla Cybercab CPM opinions. Over years the fight is who keeps margin: the network or the vehicle cost stack.',
  footer: 'LYFT · Waymo Nashville',
});

add('nvda-nvl72-710b', 'L1', 'NVDA', {
  badge: 'NVDA', title: 'NVL72 랙 매출이 2027년 7,100억 달러 이상, 전년 대비 약 214%로 전망됐습니다',
  heroIcon: '🖥', heroBig: '$710B',
  heroSub: 'NVL72는 GB300·VR200·VR300을 묶은 엔비디아 랙입니다. 2027년 매출이 7,100억 달러를 넘고 전년 대비 약 214%라는 추정치가 나왔습니다. 랙 대수 자체는 약 +50%입니다.',
  cards: [
    { icon:'💰', big:'$710B+', mid:'2027년 매출 전망', sub:'GB300·VR200·VR300 합산' },
    { icon:'📈', big:'+214%', mid:'전년 대비 매출', sub:'가격·구성이 대수를 앞설 수 있음' },
    { icon:'📦', big:'+50%', mid:'랙 대수 증가', sub:'매출 배수와 다른 축' },
  ],
  quote: '매출 +214%와 대수 +50%가 동시에 나오면 ASP(대당 평균 판매가)와 구성이 핵심입니다. 전력·수냉·납기가 병목이면 전망이 밀릴 수 있습니다. 의견과 수주 잔고를 나누시기 바랍니다.',
  noteSub: '이 숫자는 시장조사 전망입니다. 데이터센터 설비투자 3.16조 달러(2050년까지) 서사와 칸을 나누시기 바랍니다. 다음 확인할 것은 분기 랙 출하와 전력 계약입니다. 장기적으로 랙 ASP가 유지되면 엔비디아 매출 해자가 두꺼워질 수 있습니다.',
  footer: '엔비디아 · NVL72',
}, {
  badge: 'NVDA', title: 'NVL72 rack sales seen above $710B in 2027, about +214% year on year',
  heroIcon: '🖥', heroBig: '$710B',
  heroSub: 'NVL72 bundles GB300, VR200, and VR300 racks. 2027 sales are estimated above $710B (+214% YoY) while rack count is about +50%.',
  cards: [
    { icon:'💰', big:'$710B+', mid:'2027 sales view', sub:'GB300 + VR200 + VR300' },
    { icon:'📈', big:'+214%', mid:'Sales versus prior year', sub:'Mix/price can outrun units' },
    { icon:'📦', big:'+50%', mid:'Rack-count growth', sub:'A different axis than sales' },
  ],
  quote: 'Sales +214% with units +50% puts ASP and mix at the center. Power, liquid cooling, and lead times can slip the forecast. Split opinion from backlog.',
  noteSub: 'This is a research forecast. Split from the $31.6T data-center capex-to-2050 story. Next: quarterly rack shipments and power contracts. If rack ASP holds, NVIDIA’s sales moat can thicken over years.',
  footer: 'NVDA · NVL72',
});

add('dell-trump-331', 'L5', 'AAPL', {
  badge: 'DELL', title: '2월 10일 최대 500만 달러 델 매수 이후 주가가 약 331% 올라 535.25달러로 찍혔습니다',
  heroIcon: '💼', heroBig: '+331%',
  heroSub: '공직자 거래 공시에 2월 10일 델을 최대 500만 달러까지 샀다는 기록이 있습니다. 그 이후 주가가 약 331% 올라 535.25달러로 표시됐습니다.',
  before: { label:'2월 10일 매수', big:'$5M', sub:'최대 규모로 공시된 구간' },
  after: { label:'이후 주가', big:'+331%', sub:'종가 535.25달러' },
  cards: [
    { icon:'📅', big:'2/10', mid:'매수 공시 날짜', sub:'가격 경로의 시작점' },
    { icon:'💵', big:'$535.25', mid:'표시 주가', sub:'하루 종가가 곧 추세는 아님' },
    { icon:'🖥', big:'서버', mid:'인공지능 서버 수요', sub:'델 실적의 중기 축' },
  ],
  quote: '331%는 그 매수일 이후 주가 경로입니다. 거래 공시가 실적 가속과 같지는 않습니다. 서버 수주·마진을 별도 칸에 두시기 바랍니다.',
  noteSub: '정치인 거래는 관심 신호이지 밸류에이션 근거가 아닙니다. NVL72 랙 전망과 한 문장으로 합치지 마시기 바랍니다. 다음 확인할 것은 델 서버 매출과 재고입니다. 장기적으로 기업 인공지능 서버 수요가 유지되면 델은 유통·조립 해자를 가집니다.',
  footer: '델 · 공시 이후 +331%',
}, {
  badge: 'DELL', title: 'A Feb 10 purchase of up to $5M in Dell was followed by about +331% to $535.25',
  heroIcon: '💼', heroBig: '+331%',
  heroSub: 'A public filing showed a Feb 10 Dell buy of up to $5 million. The stock later printed about +331% to $535.25.',
  before: { label:'Feb 10 buy', big:'$5M', sub:'Upper end of the filing' },
  after: { label:'Since then', big:'+331%', sub:'Print $535.25' },
  cards: [
    { icon:'📅', big:'2/10', mid:'Filing date', sub:'Start of the path' },
    { icon:'💵', big:'$535.25', mid:'Shown price', sub:'One close ≠ a trend' },
    { icon:'🖥', big:'Servers', mid:'AI server demand', sub:'Dell’s medium-term axis' },
  ],
  quote: '+331% is the path after that buy date. A filing is not an earnings acceleration. Keep server orders and margins on another cell.',
  noteSub: 'A politician’s trade is an attention signal, not a valuation case. Do not mash with the NVL72 rack forecast. Next: Dell server sales and inventory. Lasting enterprise AI server demand can leave Dell an assembly-and-channel moat.',
  footer: 'DELL · +331% since filing',
});

add('treasury-buyback-6b', 'L6', 'RATES', {
  badge: 'BREAKING', breaking: '재무부 바이백',
  title: '재무부가 장기 국채 바이백을 60억 달러로 세 배 키웠고 10년물은 약 4.83%로 찍혔습니다',
  heroBig: '$6B',
  heroSub: '바이백은 정부가 이미 발행한 국채를 다시 사들여 시장 물량을 줄이는 일입니다. 장기물 규모가 세 배로 60억 달러가 됐고, 10년물 금리는 약 4.83%로 2023년 이후 최고권입니다.',
  grid: [
    { icon:'3️⃣', big:'3×', mid:'규모 배수', sub:'이전 장기 바이백 대비' },
    { icon:'💵', big:'$6B', mid:'이번 규모', sub:'장기물 중심' },
    { icon:'📈', big:'4.83%', mid:'10년물', sub:'2023년 이후 최고권' },
    { icon:'📅', big:'규모 직후', mid:'금리 반응', sub:'발표 후 스파이크가 표시됨' },
  ],
  ctx1: '바이백은 유동성 공급에 가깝습니다. 금리가 같이 오르면 시장이 인플레·공급을 더 크게 봤다는 뜻일 수 있습니다.',
  ctx2: 'G7 평균 차입 비용이 2008년 이후 최고라는 표와 칸을 나누시기 바랍니다.',
  quote: '60억 달러는 실행 규모이고 4.83%는 시장 가격입니다. 두 숫자를 한 문장의 「완화」로 합치지 마시기 바랍니다. 다음 확인할 것은 입찰 소화와 다음 바이백 달력입니다.',
  noteSub: '채권 시장이 재무부 정책에 저항한다는 해석이 붙었습니다. 10년 5% 시나리오는 의견입니다. 비트코인·위험자산 할인율과 칸을 나누시기 바랍니다. 장기적으로 국채 수급은 할인율의 바닥이 됩니다.',
  footer: '매크로 · 국채 바이백',
}, {
  badge: 'BREAKING', breaking: 'TREASURY BUYBACK',
  title: 'Treasury tripled long-term buybacks to $6B as the 10-year printed about 4.83%',
  heroBig: '$6B',
  heroSub: 'A buyback is the government repurchase of bonds already issued. Long-term size tripled to $6B, while the 10-year printed about 4.83%, the highest since 2023.',
  grid: [
    { icon:'3️⃣', big:'3×', mid:'Size multiple', sub:'Versus prior long buybacks' },
    { icon:'💵', big:'$6B', mid:'This print', sub:'Long-term focused' },
    { icon:'📈', big:'4.83%', mid:'10-year yield', sub:'Highest since 2023' },
    { icon:'📅', big:'After size', mid:'Rate reaction', sub:'Spike shown after the print' },
  ],
  ctx1: 'Buybacks are closer to liquidity. If yields still rise, the market may be pricing inflation or supply more heavily.',
  ctx2: 'Split from the G7 borrowing-cost-since-2008 table.',
  quote: '$6B is the operational size; 4.83% is the market price. Do not mash them into one “easing” sentence. Next: auction digestion and the next buyback calendar.',
  noteSub: 'Some framed the tape as the bond market resisting Treasury policy. A 5% 10-year path is an opinion. Split from bitcoin and risk-asset discount rates. Treasury supply-demand is the floor of discount rates over years.',
  footer: 'MACRO · UST buyback',
});

add('unboxed-paint-70', 'L3', 'TSLA', {
  badge: 'TSLA', title: '기가캐스트와 언박스트가 페인트샵을 최대 70% 줄이고 사이클은 10초 미만으로 거론됐습니다',
  heroIcon: '🎨', heroBig: '−70%',
  heroSub: '페인트샵은 차체에 색을 입히는 공장 구간으로 면적과 에너지가 큽니다. 기가캐스트(큰 주조 부품)와 언박스트 조립이 페인트샵을 최대 70% 줄이고, 택트는 10초 미만, 부지 면적은 약 40% 줄어들 수 있다는 설명입니다. 사이버캡은 도장을 생략할 수 있습니다.',
  cards: [
    { icon:'🎨', big:'−70%', mid:'페인트샵 축소', sub:'면적·에너지·택트가 같이 움직임' },
    { icon:'⏱', big:'<10초', mid:'조립 사이클', sub:'영상 10초 서사와 같은 축' },
    { icon:'📐', big:'−40%', mid:'부지 발자국', sub:'공장 면적이 작아질 수 있음' },
  ],
  quote: '도장을 빼면 원가와 불량 구간이 동시에 줄어듭니다. 골드만 2만~3만 달러 가정과 연결되지만 아직 대량 출고 원가는 아닙니다. 다음 확인할 것은 주간 완성 대수입니다.',
  noteSub: '어제 4K 10초 영상과 각도가 겹치면 「페인트 70%·무도장」으로 갱신해 두시기 바랍니다. 금색 플로리다 차량은 테스트 도장일 수 있습니다. 장기적으로 페인트샵이 작아지면 공장 고정비가 로보택시 원가의 큰 변수가 됩니다.',
  footer: '테슬라 · 페인트샵 −70%',
}, {
  badge: 'TSLA', title: 'Gigacast and unboxed could cut the paint shop up to 70% with a sub-10-second cycle',
  heroIcon: '🎨', heroBig: '−70%',
  heroSub: 'A paint shop colors the body and eats floor space and energy. Gigacast plus unboxed assembly is framed as cutting paint up to 70%, takt under 10 seconds, and footprint about 40%. Cybercab can skip paint.',
  cards: [
    { icon:'🎨', big:'−70%', mid:'Paint-shop cut', sub:'Space, energy, and takt move together' },
    { icon:'⏱', big:'<10s', mid:'Assembly cycle', sub:'Same axis as the 10s video' },
    { icon:'📐', big:'−40%', mid:'Footprint', sub:'Less factory floor' },
  ],
  quote: 'Skipping paint cuts cost and defect stations together. It feeds the Goldman $20k–$30k case but is not yet a volume ex-factory cost. Next: weekly finished units.',
  noteSub: 'If this overlaps yesterday’s 4K 10-second tape, refresh as paint −70% and no-paint. Florida gold units may be test paint. A smaller paint shop can become a large robotaxi cost variable over years.',
  footer: 'TSLA · paint shop −70%',
});

add('ship-42-massey', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스타십 42호기가 두 번째 시험 라운드를 위해 매시에 머물고 있습니다',
  heroIcon: '🚀', heroBig: '42',
  heroSub: '스타십은 스페이스X의 초대형 로켓입니다. 42호기가 매시(Massey) 시험장에서 두 번째 시험 라운드를 위해 대기·체류 중이라는 현장이 공유됐습니다.',
  cards: [
    { label:'호기', big:'42', mid:'이번 기체', sub:'전 호기와 다른 시험 대상' },
    { label:'장소', big:'매시', mid:'시험장', sub:'발사대와 역할이 다름' },
    { label:'라운드', big:'2nd', mid:'두 번째 시험', sub:'첫 라운드 이후 재시험' },
  ],
  detailHead: '시험이 의미하는 것',
  detailLines: ['📍 발사 카운트다운이 아니라 지상 시험','🔥 엔진·탱크 내압이 다음 관문','📅 V4 140m 설계와 칸을 나눔'],
  noteSub: '지상 시험은 비행 성공을 보장하지 않습니다. 스타십 V4 9기 랩터·140m 서사와 칸을 나누시기 바랍니다. 다음 게이트는 정적 화재(스태틱 파이어)와 비행 허가입니다. 장기적으로 시험 케이던스가 궤도 컴퓨팅 위성 일정(2027~)을 좌우합니다.',
  footer: '스페이스X · 스타십 42',
}, {
  badge: 'SPCX', title: 'Starship 42 is at Massey’s for a second test round',
  heroIcon: '🚀', heroBig: '42',
  heroSub: 'Starship is SpaceX’s super-heavy vehicle. Ship 42 was shown staying at Massey’s for a second test round.',
  cards: [
    { label:'Ship', big:'42', mid:'This article', sub:'A different test article' },
    { label:'Site', big:'Massey', mid:'Test site', sub:'Not the same as the pad' },
    { label:'Round', big:'2nd', mid:'Second test pass', sub:'Re-test after round one' },
  ],
  detailHead: 'What the test means',
  detailLines: ['📍 Ground test, not a countdown','🔥 Engines and tank pressure next','📅 Split from V4 140 m design'],
  noteSub: 'A ground test does not guarantee flight. Split from Starship V4’s 9 Raptors and ~140 m height. Next: static fire and flight license. Test cadence will govern orbital compute-sat timing from 2027 onward.',
  footer: 'SPCX · Starship 42',
});

add('spcx-unlock-319m', 'L1', 'SPCX', {
  badge: 'SPCX', title: '스페이스X 주식 약 3.19억 주가 상장 후 90일 락업 해제 달력에 들어왔고 주가는 147.55달러(−3.86%)였습니다',
  heroIcon: '🔓', heroBig: '319M',
  heroSub: '락업은 대주주·직원이 일정 기간 주식을 못 팔게 묶어 두는 약속입니다. 약 3.19억 주(약 7%)가 달력상 90일 구간에 들어왔고, 다음 블록은 180일입니다. 같은 화면 종가는 147.55달러(−3.86%)였습니다. 날짜는 2026-09-09입니다.',
  cards: [
    { icon:'📅', big:'90일', mid:'첫 해제 창', sub:'달력 기준 구간' },
    { icon:'📦', big:'7%', mid:'물량 비중', sub:'전체 대비 약 3.19억 주' },
    { icon:'⏳', big:'180일', mid:'다음 블록', sub:'한 번에 다 풀리지 않음' },
  ],
  quote: '락업 해제는 팔 수 있게 된 것이지 전부 매도라는 뜻이 아닙니다. −3.86%는 하루 반응입니다. 머스크 합산 시총 3.48조 달러와 칸을 나누시기 바랍니다.',
  noteSub: '유통 물량이 늘면 수급 변동성이 커질 수 있습니다. 실제 매도 공시와 달력을 같이 보시기 바랍니다. 다음 게이트는 180일 블록과 내부자 거래 보고입니다. 장기적으로 락업이 끝나면 주가 발견이 더 시장 가격에 가까워집니다.',
  footer: '스페이스X · 락업 3.19억',
}, {
  badge: 'SPCX', title: 'About 319M SpaceX shares entered the day-90 lockup window as SPCX printed $147.55 (−3.86%)',
  heroIcon: '🔓', heroBig: '319M',
  heroSub: 'A lockup blocks insiders from selling for a set time. About 319M shares (~7%) entered the day-90 calendar window; the next block is 180 days. The same board showed $147.55 (−3.86%) on 2026-09-09.',
  cards: [
    { icon:'📅', big:'90d', mid:'First window', sub:'Calendar-based' },
    { icon:'📦', big:'7%', mid:'Share of float', sub:'~319M shares' },
    { icon:'⏳', big:'180d', mid:'Next block', sub:'Not one dump' },
  ],
  quote: 'Unlock means they can sell—not that they will sell all of it. −3.86% is a one-day tape. Split from Musk’s combined $3.48T.',
  noteSub: 'More float can raise supply volatility. Watch actual sale filings beside the calendar. Next: the 180-day block and insider reports. After lockups fade, price discovery sits closer to the open market.',
  footer: 'SPCX · 319M unlock',
});

add('musk-mcap-348t', 'L5', 'SPCX', {
  badge: 'SPCX', title: '머스크 관련 시가총액이 스페이스X 약 2.02조·테슬라 약 1.45조로 합쳐 약 3.48조 달러로 집계됐습니다',
  heroIcon: '🧮', heroBig: '$3.48T',
  heroSub: '시가총액은 주가에 주식 수를 곱한 회사 값입니다. 스페이스X 약 2.02조 달러와 테슬라 약 1.45조 달러를 더하면 약 3.48조 달러입니다. 두 회사는 별도 상장·현금흐름입니다.',
  before: { label:'스페이스X', big:'$2.02T', sub:'우주·통신 축' },
  after: { label:'테슬라', big:'$1.45T', sub:'자동차·로봇·에너지' },
  cards: [
    { icon:'🚀', big:'$2.02T', mid:'스페이스X', sub:'락업 3.19억 주와 다른 칸' },
    { icon:'🚗', big:'$1.45T', mid:'테슬라', sub:'로보택시·옵티머스 축' },
    { icon:'➕', big:'$3.48T', mid:'단순 합산', sub:'교차 보증이 아님' },
  ],
  quote: '합산은 관심 지표이지 한 회사 대차대조표가 아닙니다. 락업 물량·테슬라 플릿 대수를 이 숫자에 넣지 마시기 바랍니다. 다음 확인할 것은 각사 매출과 자유현금흐름입니다.',
  noteSub: '시총 합은 하루 주가에 따라 크게 흔들립니다. 스페이스X 147.55달러와 테슬라 368.81달러를 각각의 표에 두시기 바랍니다. 장기적으로 두 해자(발사·로보택시)가 겹치면 창업자 지분 가치가 커질 수 있습니다.',
  footer: '시총 · 합산 3.48조',
}, {
  badge: 'SPCX', title: 'Musk-linked market value printed about $3.48T: SpaceX ~$2.02T and Tesla ~$1.45T',
  heroIcon: '🧮', heroBig: '$3.48T',
  heroSub: 'Market cap is price times shares. SpaceX ~$2.02T plus Tesla ~$1.45T is about $3.48T. They remain separate listings and cash flows.',
  before: { label:'SpaceX', big:'$2.02T', sub:'Space and connectivity' },
  after: { label:'Tesla', big:'$1.45T', sub:'Auto, robots, energy' },
  cards: [
    { icon:'🚀', big:'$2.02T', mid:'SpaceX', sub:'Separate from the 319M unlock' },
    { icon:'🚗', big:'$1.45T', mid:'Tesla', sub:'Robotaxi and Optimus axis' },
    { icon:'➕', big:'$3.48T', mid:'Simple sum', sub:'Not a cross-guarantee' },
  ],
  quote: 'The sum is an attention metric, not one balance sheet. Do not pour lockup float or Tesla fleet counts into this number. Next: each firm’s sales and free cash flow.',
  noteSub: 'A combined cap swings with each close. Keep SPCX $147.55 and TSLA $368.81 on their own sheets. Over years, stacked launch and robotaxi moats can lift founder-equity value.',
  footer: 'SPCX · combined $3.48T',
});

add('spcx-closed-loop', 'L3', 'SPCX', {
  badge: 'SPCX', title: '엑스 하루 3.5억 게시, 엑스머니 9월 2일, 그록 비즈니스 좌석당 30달러가 같은 폐쇄 루프 그림에 모였습니다',
  heroIcon: '🔁', heroBig: '루프',
  heroSub: '폐쇄 루프는 소셜·결제·인공지능이 한 계정 안에서 도는 그림입니다. 엑스 하루 약 3.5억 게시, 엑스머니 사내 출시 9월 2일, 그록 비즈니스 좌석당 30달러, 기업용 그록 봇 9월 3일, 그록 4.7은 대략 9월 12일·파라미터 약 2,100억, 스타마인드는 2027~28년입니다.',
  cards: [
    { icon:'💬', big:'3.5억', mid:'하루 엑스 게시', sub:'데이터·광고의 원천' },
    { icon:'💳', big:'9/2', mid:'엑스머니 사내', sub:'결제가 같은 앱으로' },
    { icon:'🧠', big:'$30', mid:'그록 비즈니스 좌석', sub:'기업 구독 가격표' },
  ],
  quote: '게시·결제·모델이 한 화면에 있어도 각각 매출 인식 시점이 다릅니다. 그록 4.7 날짜는 대략입니다. 락업 3.19억 주와 한 문장에 넣지 마시기 바랍니다.',
  noteSub: '좌석당 30달러는 가격표이지 수주 잔고가 아닙니다. 스타마인드 2027~28은 연구 일정입니다. 다음 확인할 것은 유료 좌석 수와 결제 거래액입니다. 장기적으로 데이터·결제·모델이 붙으면 전환 비용이 커질 수 있습니다.',
  footer: '스페이스X · 폐쇄 루프',
}, {
  badge: 'SPCX', title: 'X’s 350M posts/day, X Money on Sep 2, and Grok Business at $30/seat sat in one closed-loop picture',
  heroIcon: '🔁', heroBig: 'Loop',
  heroSub: 'A closed loop means social, payments, and AI spin inside one account. X ~350M posts/day, X Money in-house Sep 2, Grok Business $30/seat, Grok Bot Enterprise Sep 3, Grok 4.7 ~Sep 12 at ~210B parameters, Starmind 2027–28.',
  cards: [
    { icon:'💬', big:'350M', mid:'X posts per day', sub:'Data and ads source' },
    { icon:'💳', big:'Sep 2', mid:'X Money in-house', sub:'Payments in the same app' },
    { icon:'🧠', big:'$30', mid:'Grok Business seat', sub:'Enterprise price card' },
  ],
  quote: 'Posts, payments, and models share a slide but not the same revenue recognition. Grok 4.7’s date is approximate. Do not mash with the 319M unlock.',
  noteSub: '$30/seat is a price card, not backlog. Starmind 2027–28 is a research calendar. Next: paid seats and payment volume. Data plus payments plus models can raise switching costs over years.',
  footer: 'SPCX · closed loop',
});

add('sp500-eps-367', 'L1', 'MACRO', {
  badge: 'MACRO', title: 'S&P 달력 주당순이익 2026년 추정치가 367로 잡혀 전년 275 대비 약 34% 늘었습니다',
  heroIcon: '📊', heroBig: '367',
  heroSub: 'EPS는 기업이 주식 한 주당 남기는 이익입니다. 2026년 달력 추정치 367은 2025년 275 대비 약 +34%이고, 연초 시장이 기대한 약 15%보다 두 배 이상입니다. 침체 없이 이익이 늘어난다는 가정이 붙어 있습니다.',
  cards: [
    { icon:'📅', big:'275', mid:'2025년 EPS', sub:'비교 기준 연도' },
    { icon:'🎯', big:'367', mid:'2026년 추정', sub:'달력 기준 합산' },
    { icon:'📈', big:'+34%', mid:'증가율', sub:'연초 15% 기대의 두 배 이상' },
  ],
  quote: '이익 전망이 올라가면 주가지수 정당화 논리가 커집니다. 할인율(10년 4.83%)이 같이 오르면 상쇄될 수 있습니다. 침체 없음은 가정입니다.',
  noteSub: '추정치는 애널리스트 합입니다. 실적 시즌마다 수정됩니다. 데이터센터 설비투자 서사와 칸을 나누시기 바랍니다. 장기적으로 이익이 따라오면 지수 해자는 현금흐름입니다.',
  footer: '매크로 · S&P EPS 367',
}, {
  badge: 'MACRO', title: 'S&P calendar EPS 2026E printed 367, about +34% versus 275 in 2025',
  heroIcon: '📊', heroBig: '367',
  heroSub: 'EPS is profit per share. Calendar 2026E 367 is about +34% versus 275 in 2025—more than double the ~15% expected at year-start—on a no-recession path.',
  cards: [
    { icon:'📅', big:'275', mid:'2025 EPS', sub:'Base year' },
    { icon:'🎯', big:'367', mid:'2026 estimate', sub:'Calendar aggregate' },
    { icon:'📈', big:'+34%', mid:'Growth rate', sub:'More than 2× the 15% start-year view' },
  ],
  quote: 'Higher earnings estimates thicken the case for the index. A rising discount rate (10-year ~4.83%) can offset it. No recession is an assumption.',
  noteSub: 'Estimates are analyst aggregates and revise each earnings season. Split from the data-center capex story. If earnings follow, the index moat is cash flow over years.',
  footer: 'MACRO · S&P EPS 367',
});

add('starship-v4-140m', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스타십 V4는 상부 9기 랩터에 높이 약 140m로 지금보다 16m 더 길어집니다',
  heroIcon: '📏', heroBig: '140m',
  heroSub: 'V4는 다음 세대 스타십 설계입니다. 상부단에 랩터 엔진 9기, 전체 높이 약 140m로 지금보다 약 16m 깁니다. 궤도 컴퓨팅 위성은 2027년 투입, 2028년 확대, 2029년 별자리라는 일정이 붙었습니다.',
  cards: [
    { label:'엔진', big:'9기', mid:'상부 랩터', sub:'추력·재점화 설계' },
    { label:'높이', big:'140m', mid:'전체 약 +16m', sub:'페어링·연료 체적' },
    { label:'위성', big:'2027', mid:'궤도 컴퓨팅 시작', sub:'2028 확대 · 2029 별자리' },
  ],
  detailHead: '설계와 일정을 나누면',
  detailLines: ['📍 42호기 지상 시험은 현재 기체','🛰 2027 위성은 계획 칸','⚡ 전력·발사 케이던스가 병목'],
  noteSub: '도면 높이와 비행 성공은 다릅니다. 42호기 매시 시험과 칸을 나누시기 바랍니다. 다음 게이트는 V4 시제와 발사 허가입니다. 장기적으로 궤도 컴퓨팅은 스타링크 스펙트럼·전력과 같은 해자 위에 쌓입니다.',
  footer: '스페이스X · 스타십 V4',
}, {
  badge: 'SPCX', title: 'Starship V4 puts 9 Raptors on the upper stage and stands about 140 m, 16 m taller',
  heroIcon: '📏', heroBig: '140m',
  heroSub: 'V4 is the next Starship design: 9 Raptors on the upper stage, about 140 m tall (+16 m). Orbital compute sats are slated for 2027, scale in 2028, constellation in 2029.',
  cards: [
    { label:'Engines', big:'9', mid:'Upper Raptors', sub:'Thrust and relight design' },
    { label:'Height', big:'140m', mid:'About +16 m', sub:'Fairing and propellant volume' },
    { label:'Sats', big:'2027', mid:'Orbital compute start', sub:'Scale 2028 · constellation 2029' },
  ],
  detailHead: 'Split design from calendar',
  detailLines: ['📍 Ship 42 ground tests are the current article','🛰 2027 sats are a plan cell','⚡ Power and cadence are bottlenecks'],
  noteSub: 'A drawing height is not a flight. Split from Ship 42 at Massey’s. Next: V4 prototype and flight license. Orbital compute stacks on Starlink spectrum and power moats over years.',
  footer: 'SPCX · Starship V4',
});

add('starlink-hawker-faa', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '✈ 호커 · FAA',
  title: '호커 700·800·900에 스타링크가 올라가고 에어로멕이 FAA 경로를 맡는다는 설명이 나왔습니다',
  heroIcon: '✈', heroBig: '1Gbps',
  heroSub: '비즈니스젯 호커 700·800·900 기종에 스타링크 단말이 장착되는 서사입니다. 에어로멕이 FAA(미 항공청) 인증 경로를 맡고, 속도는 내려받기 약 1Gbps·올리기 약 100Mbps·지연 약 20ms로 거론됐습니다.',
  cards: [
    { icon:'⬇', big:'1Gbps', mid:'내려받기', sub:'기내 광대역 상한' },
    { icon:'⬆', big:'100Mbps', mid:'올리기', sub:'화상·업로드용' },
    { icon:'⏱', big:'~20ms', mid:'지연 시간', sub:'위성인데도 짧은 편' },
  ],
  quote: '1Gbps는 항공기 단말 사양이지 전 세계 가입자 평균이 아닙니다. FCC 1,000MHz 스펙트럼 허가와 칸을 나누시기 바랍니다. 다음 확인할 것은 장착 대수와 인증 일정입니다.',
  noteSub: '비즈니스젯은 고단가·소수 대수 시장입니다. 일반 항공·선박으로 바로 확장되지 않습니다. 장기적으로 항공기 연결은 스타링크 기업 매출 믹스를 두껍게 할 수 있습니다.',
  footer: '스페이스X · 호커 스타링크',
}, {
  badge: 'SPCX', badgeLine: '✈ Hawker · FAA',
  title: 'Starlink on Hawker 700/800/900 with AeroMech on the FAA path was described at 1 Gbps down',
  heroIcon: '✈', heroBig: '1Gbps',
  heroSub: 'Hawker 700/800/900 business jets are framed for Starlink terminals. AeroMech runs the FAA path. Speeds cited: ~1 Gbps down, ~100 Mbps up, ~20 ms.',
  cards: [
    { icon:'⬇', big:'1Gbps', mid:'Downlink', sub:'Cabin broadband cap' },
    { icon:'⬆', big:'100Mbps', mid:'Uplink', sub:'Video and uploads' },
    { icon:'⏱', big:'~20ms', mid:'Latency', sub:'Short for satellite' },
  ],
  quote: '1 Gbps is an aircraft-terminal spec, not a global average. Split from the FCC’s 1,000+ MHz grant. Next: install counts and certification dates.',
  noteSub: 'Business jets are high-ticket, low-count. They do not instantly map to airliners or ships. Aircraft connectivity can thicken Starlink’s enterprise mix over years.',
  footer: 'SPCX · Hawker Starlink',
});

add('dc-capex-316t', 'L6', 'NVDA', {
  badge: 'BREAKING', breaking: '데이터센터 설비투자',
  title: '2050년까지 데이터센터 설비투자가 미국 15.1조·아시아태평양 8.2조 등 합쳐 약 31.6조 달러로 집계됐습니다',
  heroBig: '$31.6T',
  heroSub: '설비투자는 건물을 짓고 전력을 넣는 돈입니다. 2050년까지 미국 약 15.1조, 아시아태평양 약 8.2조, 유럽 약 5.6조, 중동 약 1.1조, 아프리카 약 2,550억 달러입니다. 내년은 약 1.0~1.2조 달러로 올해 약 8,500억 달러보다 크고, 그중 50~70%가 미국입니다.',
  grid: [
    { icon:'🇺🇸', big:'$15.1T', mid:'미국', sub:'2050년까지 최대 권역' },
    { icon:'🌏', big:'$8.2T', mid:'아시아태평양', sub:'두 번째 권역' },
    { icon:'🇪🇺', big:'$5.6T', mid:'유럽', sub:'세 번째' },
    { icon:'📅', big:'$1–1.2T', mid:'내년', sub:'올해 ~$850B 대비' },
  ],
  ctx1: '누적 31.6조는 25년 시계입니다. 내년 1조 달러와 칸을 나누시기 바랍니다.',
  ctx2: 'NVL72 2027 매출 전망과 같은 수요 줄기이지만 기간이 다릅니다.',
  quote: '돈이 건물·전력으로 가면 칩·냉각·변전 수요가 따라갑니다. 허가와 전력이 안 열리면 숫자가 밀립니다. 구글 핀란드 150억 달러와 한 줄로 합치지 마시기 바랍니다.',
  noteSub: '초장기 합산은 가정의 탑입니다. 내년 1.0~1.2조와 미국 비중 50~70%가 가까운 확인 숫자입니다. 다음 게이트는 지역별 전력 계약입니다. 장기적으로 전력망이 칩보다 큰 병목이 될 수 있습니다.',
  footer: '매크로 · 데이터센터 31.6조',
}, {
  badge: 'BREAKING', breaking: 'DATA CENTER CAPEX',
  title: 'Data-center capex through 2050 printed about $31.6T, including $15.1T in the US and $8.2T in APAC',
  heroBig: '$31.6T',
  heroSub: 'Capex is buildings and power. Through 2050: US ~$15.1T, APAC ~$8.2T, Europe ~$5.6T, Middle East ~$1.1T, Africa ~$255B. Next year ~$1.0–$1.2T versus ~$850B this year, with 50–70% in the US.',
  grid: [
    { icon:'🇺🇸', big:'$15.1T', mid:'United States', sub:'Largest region to 2050' },
    { icon:'🌏', big:'$8.2T', mid:'APAC', sub:'Second region' },
    { icon:'🇪🇺', big:'$5.6T', mid:'Europe', sub:'Third' },
    { icon:'📅', big:'$1–1.2T', mid:'Next year', sub:'Versus ~$850B this year' },
  ],
  ctx1: '$31.6T is a 25-year stack. Split from next year’s ~$1T.',
  ctx2: 'Same demand stem as NVL72 2027 sales, different horizon.',
  quote: 'Money into buildings and power pulls chips, cooling, and substations. Permits and watts can slip the print. Do not mash with Google Finland’s $15B+.',
  noteSub: 'A multi-decade sum is a tower of assumptions. Next year’s $1.0–$1.2T and the 50–70% US share are nearer checks. Next: regional power contracts. Grids can outrank chips as the bottleneck over years.',
  footer: 'MACRO · DC capex $31.6T',
});

add('g7-yields-2008', 'L5', 'RATES', {
  badge: 'RATES', title: 'G7 평균 차입 비용이 2008년 이후 최고로 올라왔고 영국이 구간 상단에 있습니다',
  heroIcon: '📉', heroBig: '2008',
  heroSub: 'G7은 미국·일본·독일·영국·프랑스·이탈리아·캐나다입니다. 이들 정부가 돈을 빌리는 평균 금리가 2008년 이후 가장 높은 구간으로 표시됐고, 영국이 그 범위의 꼭대기에 있습니다.',
  before: { label:'과거 바닥권', big:'낮음', sub:'제로금리·양적완화 시절' },
  after: { label:'지금', big:'2008후 최고', sub:'평균 차입 비용' },
  cards: [
    { icon:'🇬🇧', big:'영국', mid:'구간 상단', sub:'같은 G7 안에서도 온도차' },
    { icon:'🇺🇸', big:'미국', mid:'10년 약 4.83%', sub:'바이백 60억과 다른 칸' },
    { icon:'🌍', big:'G7', mid:'평균', sub:'한 나라 금리가 아님' },
  ],
  quote: '평균이 높아도 나라마다 재정·물가가 다릅니다. 미국 바이백과 한 문장의 완화로 합치지 마시기 바랍니다. 다음 확인할 것은 입찰 소화와 물가입니다.',
  noteSub: '높은 차입 비용은 정부 이자 부담과 위험자산 할인율을 동시에 올립니다. 일본 이자 16.59조 엔 서사와 기간이 다릅니다. 장기적으로 금리가 높게 머무르면 자산 가격의 분모가 커집니다.',
  footer: '매크로 · G7 차입 비용',
}, {
  badge: 'RATES', title: 'Average G7 borrowing costs printed the highest since 2008, with the UK at the top of the range',
  heroIcon: '📉', heroBig: '2008',
  heroSub: 'G7 is the US, Japan, Germany, UK, France, Italy, and Canada. Their average government borrowing cost is shown at the highest since 2008, and the UK sits at the top of that range.',
  before: { label:'Prior floor', big:'Low', sub:'ZIRP and QE era' },
  after: { label:'Now', big:'Post-2008 high', sub:'Average borrowing cost' },
  cards: [
    { icon:'🇬🇧', big:'UK', mid:'Top of range', sub:'Temperature differs inside G7' },
    { icon:'🇺🇸', big:'US', mid:'10-year ~4.83%', sub:'Separate from the $6B buyback' },
    { icon:'🌍', big:'G7', mid:'Average', sub:'Not one country’s yield' },
  ],
  quote: 'A higher average still hides fiscal and inflation gaps. Do not mash with the US buyback as one easing story. Next: auction digestion and inflation.',
  noteSub: 'Dear borrowing lifts government interest bills and risk-asset discount rates together. Different horizon from Japan’s ¥16.59T interest bill. If yields stay high, the denominator of asset prices stays large.',
  footer: 'MACRO · G7 borrowing',
});

add('googl-finland-15b', 'L2', 'GOOGL', {
  badge: 'GOOGL', title: '구글의 핀란드 인공지능 인프라가 150억 달러가 넘는 유럽 단일 최대 베팅으로 거론됐습니다',
  heroIcon: '🇫🇮', heroBig: '$15B+',
  heroSub: '유럽에서 한 건으로 이 정도 규모의 인공지능 인프라 투자는 처음 급으로 설명됐습니다. 풍력, 94MW 배터리, 포르툼 로비사 원전과 최장 22년 계약(출력의 최대 절반)이 붙었습니다.',
  cards: [
    { label:'규모', big:'$15B+', mid:'유럽 단일 최대', sub:'여러 나라를 합친 값이 아님' },
    { label:'배터리', big:'94MW', mid:'저장 용량', sub:'풍력 변동을 완충' },
    { label:'원전', big:'22년', mid:'로비사 계약', sub:'출력 최대 절반까지' },
  ],
  detailHead: '전력이 먼저인 이유',
  detailLines: ['⚡ 칩보다 와트가 병목인 구간','🔋 94MW는 순시 전력이 아니라 저장','📅 22년은 장기 원가 고정'],
  noteSub: '150억 달러는 다년 집행입니다. 데이터센터 31.6조 달러 초장기 합과 칸을 나누시기 바랍니다. 다음 확인할 것은 착공·인허가입니다. 장기적으로 원전+재생 조합은 유럽 인공지능 전력 해자가 될 수 있습니다.',
  footer: '구글 · 핀란드 150억+',
}, {
  badge: 'GOOGL', title: 'Google’s Finland AI infrastructure was cited as a $15B+ single largest EU bet',
  heroIcon: '🇫🇮', heroBig: '$15B+',
  heroSub: 'It is framed as Europe’s largest single AI-infrastructure wager. Wind, a 94 MW battery, and a Fortum Loviisa nuclear deal up to 22 years (up to half of output) sit on the same board.',
  cards: [
    { label:'Size', big:'$15B+', mid:'Largest single EU', sub:'Not a multi-country sum' },
    { label:'Battery', big:'94MW', mid:'Storage', sub:'Buffers wind swings' },
    { label:'Nuclear', big:'22y', mid:'Loviisa contract', sub:'Up to half of output' },
  ],
  detailHead: 'Why power comes first',
  detailLines: ['⚡ Watts, not chips, are the bottleneck here','🔋 94 MW is storage, not a chip SKU','📅 22 years locks long-run cost'],
  noteSub: '$15B+ spends across years. Split from the $31.6T data-center stack. Next: groundbreaking and permits. Nuclear plus renewables can become a European AI-power moat.',
  footer: 'GOOGL · Finland $15B+',
});

add('googl-tesla-semi-tx', 'L3', 'TSLA', {
  badge: 'TSLA', title: '구글이 네보야·그린마켓 센터와 함께 테슬라 세미 25대를 휴스턴–댈러스 전전기 화물로 돌립니다',
  heroIcon: '🚚', heroBig: '25대',
  heroSub: '세미는 테슬라의 전기 화물 트럭입니다. 구글과 물류 파트너 네보야, 그린마켓 센터가 휴스턴–댈러스 구간에서 25대를 전전기 화물로 운행한다는 설명입니다.',
  cards: [
    { icon:'🔋', big:'25', mid:'세미 대수', sub:'파일럿 규모' },
    { icon:'🛣', big:'휴스턴–댈러스', mid:'텍사스 화물 축', sub:'충전·거리가 맞는 구간' },
    { icon:'🤝', big:'구글', mid:'화물 수요 측', sub:'네보야·센터가 운행 파트너' },
  ],
  quote: '25대는 시험 규모입니다. 로보택시 플릿 437대와 칸을 나누시기 바랍니다. 다음 확인할 것은 충전 가동률과 톤-마일 원가입니다.',
  noteSub: '전전기 화물은 탄소·연료비 이야기이지 사이버캡 호출이 아닙니다. 구글 핀란드 인프라와도 축이 다릅니다. 장기적으로 세미가 늘면 테슬라 에너지·트럭 매출이 자동차와 다른 줄로 쌓입니다.',
  footer: '테슬라 · 세미 25대',
}, {
  badge: 'TSLA', title: 'Google, Nevoya, and the Center for Green Market will run 25 Tesla Semis Houston–Dallas all-electric',
  heroIcon: '🚚', heroBig: '25',
  heroSub: 'Semi is Tesla’s electric freight truck. Google plus Nevoya and the Center for Green Market are framed to run 25 units Houston–Dallas all-electric.',
  cards: [
    { icon:'🔋', big:'25', mid:'Semi count', sub:'Pilot scale' },
    { icon:'🛣', big:'HOU–DAL', mid:'Texas freight axis', sub:'Range and charging fit' },
    { icon:'🤝', big:'Google', mid:'Freight demand', sub:'Nevoya and the Center operate' },
  ],
  quote: '25 trucks are a trial. Split from the 437 robotaxi fleet. Next: charger utilization and cost per ton-mile.',
  noteSub: 'All-electric freight is carbon and fuel-cost, not Cybercab rides. It is also a different axis from Google Finland. More Semis can stack Tesla energy and truck sales on a line apart from cars.',
  footer: 'TSLA · Semi 25',
});

add('cybercab-cpm-specs', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '📐 스펙 · 전비',
  title: '사이버캡이 완전 적재 마일당 원가에서 가장 낮고 폭 69인치·화면 22인치·전비 6.1마일로 적혔습니다',
  heroIcon: '📐', heroBig: '6.1',
  heroSub: '완전 적재 원가는 차값·에너지·보험·정비를 한 마일에 나눈 값입니다. 폭 69인치, 화면 22인치, 배터리 47.6kWh, 전비 6.1마일/kWh, 무게 3,113파운드, 레그룸 43.4인치가 같은 표에 있습니다.',
  cards: [
    { icon:'📏', big:'69″', mid:'차체 폭', sub:'도시 차로에 맞춘 크기' },
    { icon:'🖥', big:'22″', mid:'실내 화면', sub:'운전석 없는 공간' },
    { icon:'⚡', big:'6.1', mid:'마일/kWh', sub:'47.6kWh·3,113lbs와 같이' },
  ],
  quote: '전비 6.1은 에너지 칸이고, 골드만 30센트는 의견 칸입니다. 무도장·페인트샵 −70%와 스펙을 한 결론으로 합치지 마시기 바랍니다. 다음 확인할 것은 실주행 전비입니다.',
  noteSub: '스펙 시트는 설계 목표에 가깝습니다. 양산 공차·보험이 비기 전입니다. 어제 6.1마일 현장과 각도가 겹치면 폭·화면·무게를 추가한 표로 갱신하시기 바랍니다. 장기적으로 낮은 전비는 로보택시 요금의 바닥을 내립니다.',
  footer: '테슬라 · 사이버캡 스펙',
}, {
  badge: 'TSLA', badgeLine: '📐 specs · efficiency',
  title: 'Cybercab was listed as lowest fully loaded cost per mile, 69″ wide, 22″ screen, 6.1 mi/kWh',
  heroIcon: '📐', heroBig: '6.1',
  heroSub: 'Fully loaded cost spreads vehicle, energy, insurance, and service over a mile. The same card shows 69″ width, 22″ screen, 47.6 kWh, 6.1 mi/kWh, 3,113 lbs, and 43.4″ legroom.',
  cards: [
    { icon:'📏', big:'69″', mid:'Width', sub:'Sized for city lanes' },
    { icon:'🖥', big:'22″', mid:'Cabin screen', sub:'No steering-wheel space' },
    { icon:'⚡', big:'6.1', mid:'mi/kWh', sub:'With 47.6 kWh and 3,113 lbs' },
  ],
  quote: '6.1 mi/kWh is an energy cell; Goldman’s 30 cents is an opinion cell. Do not mash no-paint and paint-shop −70% into one conclusion. Next: real-world efficiency.',
  noteSub: 'A spec sheet is closer to design intent. Production tolerances and insurance have not printed. If this overlaps yesterday’s 6.1 mi/kWh field note, refresh with width, screen, and weight. Lower efficiency sets a lower floor under robotaxi fares over years.',
  footer: 'TSLA · Cybercab specs',
});

add('fsd-ace-1439', 'L3', 'TSLA', {
  badge: 'TSLA', title: '자동 충돌 회피(ACE)가 소프트웨어 2026.27.6에 들어왔고 FSD 감독 버전은 v14.3.9입니다',
  heroIcon: '🛡', heroBig: 'ACE',
  heroSub: 'ACE는 충돌이 임박했을 때 차가 스스로 피하는 기능입니다. 소프트웨어 2026.27.6에 들어갔고, 운전자가 감독하는 FSD는 v14.3.9입니다. 화면에는 두 가지 회피 시나리오가 그려져 있습니다.',
  cards: [
    { icon:'📦', big:'2026.27.6', mid:'소프트웨어 번호', sub:'OTA로 배포되는 빌드' },
    { icon:'👁', big:'v14.3.9', mid:'FSD 감독', sub:'사람이 책임 칸에 남아 있음' },
    { icon:'🛡', big:'ACE', mid:'충돌 회피', sub:'FSD 주행과 다른 안전 계층' },
  ],
  quote: '회피 기능과 로보택시 유료 운행은 다릅니다. 텍사스 437대·오스틴 1,000대와 한 문장에 넣지 마시기 바랍니다. 다음 확인할 것은 개입률과 배포 대수입니다.',
  noteSub: '감독 버전은 아직 운전자가 법적으로 책임인 단계입니다. 두 시나리오 그림은 광고·설명용일 수 있습니다. 장기적으로 개입률이 떨어지면 보험·규제 가정이 가벼워질 수 있습니다.',
  footer: '테슬라 · FSD ACE',
}, {
  badge: 'TSLA', title: 'Automatic Collision Evasion landed in software 2026.27.6 with FSD Supervised at v14.3.9',
  heroIcon: '🛡', heroBig: 'ACE',
  heroSub: 'ACE is last-moment self-steering around a crash. It is in software 2026.27.6. Driver-supervised FSD is v14.3.9. Two evasion scenarios were shown.',
  cards: [
    { icon:'📦', big:'2026.27.6', mid:'Software build', sub:'OTA drop' },
    { icon:'👁', big:'v14.3.9', mid:'FSD Supervised', sub:'Human still in the liability cell' },
    { icon:'🛡', big:'ACE', mid:'Collision evasion', sub:'A safety layer apart from robotaxi fares' },
  ],
  quote: 'Evasion is not paid robotaxi service. Do not mash with Texas 437 or Austin’s 1,000. Next: intervention rates and install counts.',
  noteSub: 'Supervised still means the driver is legally on the hook. The two scenario drawings may be explanatory. Lower intervention rates can lighten insurance and regulatory assumptions over years.',
  footer: 'TSLA · FSD ACE',
});

add('austin-1000-cybercab', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: '오스틴 · 1,000대',
  title: 'NHTSA 자료에 오스틴에서 사이버캡 최대 1,000대를 배치할 준비가 적혔고 테슬라는 368.81달러(+4.17%)였습니다',
  heroBig: '1,000',
  heroSub: 'NHTSA는 미국 도로 안전 규제 기관입니다. 오스틴에서 사이버캡을 최대 1,000대까지 배치할 준비라는 문구가 나왔고, 같은 화면 테슬라 주가는 368.81달러(+4.17%)였습니다.',
  grid: [
    { icon:'🚕', big:'1,000', mid:'준비 대수', sub:'아직 도로 실측이 아님' },
    { icon:'📍', big:'오스틴', mid:'도시', sub:'텍사스 플릿 437과 다른 칸' },
    { icon:'💵', big:'$368.81', mid:'TSLA', sub:'하루 +4.17%' },
    { icon:'📋', big:'NHTSA', mid:'규제 문서', sub:'허가·안전 자료' },
  ],
  ctx1: '준비는 계획입니다. 텍사스 등록 49대 사이버캡과 합치지 마시기 바랍니다.',
  ctx2: '주가 +4.17%는 하루 반응입니다. 유료 호출 대수와 칸을 나누시기 바랍니다.',
  quote: '1,000대는 상한에 가까운 준비 숫자입니다. 지오펜스·요금·대기가 비기 전에는 매출로 읽지 마시기 바랍니다. 다음 확인할 것은 실제 배치 속도와 안전 보고입니다.',
  noteSub: '규제 문서의 「준비」는 의향에 가깝습니다. 플로리다 트럭 사진과도 도시가 다릅니다. 장기적으로 한 도시에서 네 자릿수 전용차가 돌면 데이터·원가 곡선이 가팔라질 수 있습니다.',
  footer: '테슬라 · 오스틴 1,000',
}, {
  badge: 'BREAKING', breaking: 'AUSTIN · 1,000',
  title: 'NHTSA materials said Tesla is preparing to deploy up to 1,000 Cybercabs in Austin as TSLA printed $368.81 (+4.17%)',
  heroBig: '1,000',
  heroSub: 'NHTSA is the US road-safety regulator. A note said Tesla is preparing to deploy up to 1,000 Cybercabs in Austin. The same board showed TSLA $368.81 (+4.17%).',
  grid: [
    { icon:'🚕', big:'1,000', mid:'Prep count', sub:'Not a road print yet' },
    { icon:'📍', big:'Austin', mid:'City', sub:'Separate from Texas 437' },
    { icon:'💵', big:'$368.81', mid:'TSLA', sub:'+4.17% day' },
    { icon:'📋', big:'NHTSA', mid:'Regulatory note', sub:'Permit/safety file' },
  ],
  ctx1: 'Preparing is a plan. Do not add it to Texas’s 49 registered Cybercabs.',
  ctx2: '+4.17% is a one-day tape. Split from paid-ride counts.',
  quote: '1,000 is a ceiling-like prep number. Without geofence, fare, and wait prints it is not revenue. Next: actual deploy pace and safety reports.',
  noteSub: '“Preparing” in a regulator file is closer to intent. Florida transporter photos are a different city. Four-digit purpose-built fleets in one city can steepen data and cost curves over years.',
  footer: 'TSLA · Austin 1,000',
});

add('optimus-5000-parts', 'L1', 'TSLA', {
  badge: 'TSLA', title: '옵티머스 로봇 5,000대 생산을 위해 부품 발주를 시작했다는 설명이 나왔습니다',
  heroIcon: '🦾', heroBig: '5,000',
  heroSub: '옵티머스는 테슬라의 인간형 로봇입니다. 5,000대를 만들기 위한 부품을 발주하기 시작했다는 전언입니다. 완제품 출고·고객 인도는 아직 다른 칸입니다.',
  cards: [
    { icon:'📦', big:'5,000', mid:'목표 생산 규모', sub:'부품 발주 기준' },
    { icon:'🏭', big:'발주', mid:'공급망 단계', sub:'조립·출고보다 앞선 단계' },
    { icon:'🤖', big:'옵티머스', mid:'인간형 로봇', sub:'로보택시와 다른 제품' },
  ],
  quote: '부품 발주는 의향에 가깝습니다. 어제 연말 1만 5천 대 분량 서사와 숫자가 다르면 최신 5,000으로 표를 갱신하시기 바랍니다. 인공지능·로봇이 경제를 두 배로 키운다는 발언과 칸을 나누시기 바랍니다.',
  noteSub: '5,000대는 파일럿 규모입니다. 수율·액추에이터 공급이 병목입니다. 다음 확인할 것은 주당 조립 대수입니다. 장기적으로 공장 내부 로봇이 먼저 돌면 인건비 가정이 바뀝니다.',
  footer: '테슬라 · 옵티머스 5,000',
}, {
  badge: 'TSLA', title: 'Tesla reportedly started ordering parts to produce 5,000 Optimus robots',
  heroIcon: '🦾', heroBig: '5,000',
  heroSub: 'Optimus is Tesla’s humanoid robot. The note says parts orders have started for 5,000 units. Finished goods and customer delivery remain other cells.',
  cards: [
    { icon:'📦', big:'5,000', mid:'Production aim', sub:'On a parts-order basis' },
    { icon:'🏭', big:'PO', mid:'Supply-chain step', sub:'Ahead of assembly/ship' },
    { icon:'🤖', big:'Optimus', mid:'Humanoid', sub:'A different SKU from robotaxi' },
  ],
  quote: 'A parts order is closer to intent. If this differs from yesterday’s 15k year-end parts story, refresh the sheet to 5,000. Split from the “double the economy” quote.',
  noteSub: '5,000 is pilot scale. Yield and actuator supply are bottlenecks. Next: weekly assembly. Factory-internal robots can change labor-cost assumptions first over years.',
  footer: 'TSLA · Optimus 5,000',
});

};
