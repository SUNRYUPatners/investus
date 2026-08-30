// 2026-08-31 SVG topic data — consumed by gen-reports-20260831.js
module.exports = function (add) {

/* ══════════════════════════ 미국 · 15 ══════════════════════════ */

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.08.31 한장 요약',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'AI',    title:'에이전트 메모리 수요가 2030년까지 24배 늘 수 있다는 전망이 나왔습니다',
      sub:'고대역폭 메모리는 2026~27년 품귀가 이어질 수 있고, 에이전트 한 번 호출에 토큰이 5~30배 늘 수 있습니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX',  title:'로마 망원경이 10.15톤짜리 팔콘 헤비로 지구 2차 궤도에 올라갔습니다',
      sub:'8월 30일 오전 7시 26분(동부) 발사로, 우주 과학 임무와 상업 발사 역량이 같은 주에 겹쳤습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'NVDA',  title:'엔비디아가 스페이스X 지분 200억 달러 규모로 매수할 가능성이 거론됐습니다',
      sub:'예측시장에서 8월 29일 기준 확률이 크게 올랐고, AI와 우주 인프라 연결 논의가 다시 부각됐습니다.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'운전석·페달 없는 사이버캡 전용 행사가 9월 3일 오스틴에서 열립니다',
      sub:'차량 가격 3만 달러, 마일당 0.20달러 목표가 함께 제시됐고, 로보택시 일정이 말에서 달력으로 내려왔습니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'SPY',   title:'S&P500 ETF 주간 변동성이 2004년 12월 이후 최저 수준에 가까워졌습니다',
      sub:'8월 28일 종가 769.35달러, -0.23%로 조용히 마감했지만, 잭슨홀 이후 금리 변수는 남아 있습니다.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'태양광·풍력 터빈 수요가 2030년까지 매진 상태로 전해졌습니다',
      sub:'연간 100기가와트급 태양광과 스페이스X·테슬라의 사내 터빈 주조 계획이 전력 병목과 맞물립니다.' },
  ],
  caption: '더 볼 것: 에이전트 메모리 24배 · 로마 망원경 FH13 · NVDA 200억 달러 SPCX · 사이버캡 9/3 · SPY 저변동 · 터빈 2030 매진',
}, {
  headline: '2026.08.31 Daily Snapshot',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'AI',    title:'Agent memory demand may rise 24x by 2030',
      sub:'HBM may stay sold out through 2026-27, and a single agent call can use 5-30x more tokens.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX',  title:'The Roman Space Telescope reached L2 on Falcon Heavy Flight 13',
      sub:'Lift-off was Aug 30 around 7:26 AM ET on a 10.15-ton payload to Earth\'s second Lagrange point.' },
    { color:'#60a5fa', fill:'#0a1420', right:'NVDA',  title:'Nvidia is discussed as taking a $20B SpaceX stake',
      sub:'Prediction-market odds jumped on Aug 29, reviving the AI-to-space infrastructure link.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'A dedicated Cybercab event is set for Sept 3 in Austin',
      sub:'Targets include a $30K vehicle and $0.20 per mile, moving robotaxi from narrative to calendar.' },
    { color:'#94a3b8', fill:'#0f1419', right:'SPY',   title:'SPY weekly volatility is near its lowest since December 2004',
      sub:'It closed at $769.35, down 0.23% on Aug 28, even as rate expectations remain live.' },
    { color:'#4ade80', fill:'#061209', right:'TSLA',  title:'Solar and wind turbine demand is said to be sold out through 2030',
      sub:'That overlaps with 100 GW/year solar plans and in-house turbine casting at SpaceX and Tesla.' },
  ],
  caption: 'Also: agent memory 24x · Roman telescope FH13 · NVDA $20B SPCX · Cybercab Sept 3 · SPY low vol · turbines sold out',
});

add('agent-memory-goldman', 'L1', 'AI', {
  badge: 'AI',
  title: '에이전트 메모리 수요가 2030년까지 약 24배 늘 수 있고 고대역폭 메모리는 2026~27년 품귀가 이어질 수 있다는 전망이 나왔습니다',
  heroIcon: '🧠', heroBig: '약 24배',
  heroSub: '인공지능 에이전트가 스스로 여러 단계를 실행하면 한 번의 작업에 쓰이는 데이터량이 크게 늘어납니다. 메모리 반도체 공급 계획이 이 차이를 반영해야 합니다.',
  cards: [
    { icon:'📈', big:'24배',      mid:'2030년까지 수요',     sub:'에이전트 확산을 가정한 장기 전망입니다' },
    { icon:'🧊', big:'2026~27',   mid:'HBM 품귀 구간',       sub:'고대역폭 메모리는 생산 늘리기가 어렵습니다' },
    { icon:'🔁', big:'5~30배',    mid:'에이전트당 토큰',     sub:'단순 질의응답보다 훨씬 많은 연산이 필요합니다' },
  ],
  quote: '에이전트는 한 번 질문에 답하는 챗봇이 아니라, 검색·계산·코딩을 연속으로 수행하는 프로그램에 가깝습니다. 그래서 같은 사용자 수라도 메모리 칩에 들어가는 데이터량이 5~30배까지 늘 수 있다는 추정이 나왔습니다. 고대역폭 메모리(HBM)는 그래픽·AI 가속기 옆에 붙어 데이터를 빠르게 주고받는 칩입니다.',
  noteSub: '이 전망이 중요한 이유는 AI 수요를 「GPU 몇 장」이 아니라 「메모리 몇 기가바이트」로 읽어야 한다는 점입니다. HBM 품귀가 2026~27년까지 이어지면 메모리 업체의 가격·Mix가 실적을 이끌 수 있습니다. 다음에는 분기 HBM 출하량과 에이전트 상용 서비스 출시 일정을 함께 보시면 됩니다.',
  footer: 'AI · 에이전트 메모리 수요',
}, {
  badge: 'AI',
  title: 'Agent memory demand may rise about 24x by 2030, with HBM sold out through 2026-27',
  heroIcon: '🧠', heroBig: '~24x',
  heroSub: 'When AI agents run many steps on their own, each task needs far more data in memory. Supply plans need to reflect that gap.',
  cards: [
    { icon:'📈', big:'24x',       mid:'Demand by 2030',      sub:'A long-range view assuming agent adoption' },
    { icon:'🧊', big:'2026-27',   mid:'HBM sold out',        sub:'High-bandwidth memory is hard to scale quickly' },
    { icon:'🔁', big:'5-30x',     mid:'Tokens per agent',    sub:'Far more compute than a single Q&A turn' },
  ],
  quote: 'An agent is closer to a program that searches, calculates, and codes in sequence than to a one-shot chatbot. That is why one user can require 5-30 times more memory traffic. HBM sits beside AI accelerators and shuttles data at very high bandwidth.',
  noteSub: 'The key read is that AI demand must be tracked in gigabytes of memory, not just GPU units. If HBM stays tight through 2026-27, memory makers can drive results through price and mix. Watch quarterly HBM shipments alongside commercial agent launch dates.',
  footer: 'AI · agent memory demand',
});

add('roman-space-telescope', 'L6', 'SPCX', {
  badge: 'SPCX', breaking: '지구 2차 궤도 진입 임박',
  title: '로마 우주 망원경이 10.15톤짜리 팔콘 헤비 13번째 비행으로 지구 2차 궤도 향해 발사됐습니다',
  heroBig: '10.15톤',
  heroSub: '8월 30일 오전 7시 26분(동부) 발사. 과학 임무용 대형 광학 기기가 상업 로켓으로 올라갔습니다.',
  grid: [
    { icon:'🚀', big:'FH13',     mid:'팔콘 헤비',       sub:'13번째 비행입니다' },
    { icon:'🛰️', big:'L2',       mid:'목표 궤도',       sub:'지구에서 약 150만 km 떨어진 안정 지점' },
    { icon:'🔭', big:'2.4m',     mid:'주 거울',         sub:'허블급 직경의 새 망원경' },
    { icon:'📅', big:'8/30',     mid:'발사 시각',       sub:'동부 기준 오전 7:26' },
  ],
  ctx1: '지구 2차 궤도(L2)는 태양·지구 중력이 맞서 관측에 유리한 위치입니다',
  ctx2: '대형 과학 위성이 재사용 로켓으로 올라가면 발사 비용 구조가 달라집니다',
  quote: '로마 망원경은 암흑물질·외계행성 탐색을 위한 NASA 과학 임무입니다. 10.15톤은 승무원 없이 올리는 화물 중 매우 무거운 편이며, 같은 주에 AI·우주 상업 뉴스가 겹치며 우주 경제 논의가 다시 커졌습니다.',
  noteSub: '과학 위성 발사는 스페이스X 수익의 한 축이 아니지만, 헤비급 신뢰성과 대형 화물 실적은 상업·정부 계약 협상에 영향을 줍니다. L2 도달과 개막 후 첫 관측 일정이 다음 확인 포인트입니다. 우주 과학과 상업 발사 역량이 같은 브랜드 아래 묶이는지도 장기적으로 봐야 합니다.',
  footer: 'SPCX · 로마 망원경 발사',
}, {
  badge: 'SPCX', breaking: 'L2 TRANSFER UNDERWAY',
  title: 'The Roman Space Telescope launched on Falcon Heavy Flight 13 toward Earth\'s L2 point',
  heroBig: '10.15 t',
  heroSub: 'Lift-off Aug 30 around 7:26 AM ET. A major science payload rode a commercial heavy-lift rocket.',
  grid: [
    { icon:'🚀', big:'FH13',     mid:'Falcon Heavy',      sub:'Flight number thirteen' },
    { icon:'🛰️', big:'L2',       mid:'Target orbit',      sub:'Roughly 1.5M km from Earth' },
    { icon:'🔭', big:'2.4 m',    mid:'Primary mirror',    sub:'Hubble-class aperture' },
    { icon:'📅', big:'Aug 30',   mid:'Launch time',       sub:'7:26 AM Eastern' },
  ],
  ctx1: 'Earth\'s L2 point balances gravity for stable deep-space observation',
  ctx2: 'Flying large science payloads on reusable rockets changes launch economics',
  quote: 'Roman is a NASA mission aimed at dark matter and exoplanet science. At 10.15 tons it is a very heavy uncrewed payload, and the same week brought fresh AI-and-space headlines.',
  noteSub: 'Science launches are not the core revenue line, but heavy-lift reliability and large-payload track records matter in commercial and government bids. Watch L2 arrival and first-light timing. Over time, science credibility and commercial cadence sit under the same brand.',
  footer: 'SPCX · Roman telescope launch',
});

add('nvda-spacex-stake', 'L1', 'NVDA', {
  badge: 'NVDA',
  title: '엔비디아가 스페이스X 지분 200억 달러 규모로 매수할 가능성이 예측시장에서 크게 올랐습니다',
  heroIcon: '💰', heroBig: '$200B',
  heroSub: '8월 29일 기준 예측시장 확률이 급등했습니다. AI 칩 공급자와 위성·발사 인프라를 잇는 시나리오가 다시 거론됐습니다.',
  cards: [
    { icon:'📊', big:'급등',      mid:'예측시장 확률',     sub:'8월 29일 전후로 크게 올랐습니다' },
    { icon:'🔗', big:'AI+우주',   mid:'연결 논의',         sub:'데이터센터와 위성 네트워크를 잇는 그림' },
    { icon:'🛰️', big:'SPCX',      mid:'비상장 지분',       sub:'공식 발표 전까지는 시장 기대에 가깝습니다' },
  ],
  quote: '200억 달러 지분 매수는 아직 공식 확인된 거래가 아닙니다. 예측시장은 「일어날 확률」을 가격으로 보여 주는 도구이며, 확률이 오른다는 것은 투자자들이 그 시나리오에 더 많은 관심을 두고 있다는 뜻입니다. AI 데이터센터와 저궤도 위성망을 연결하면 지상망이 닿지 않는 구간의 연산이 가능해집니다.',
  noteSub: '엔비디아와 스페이스X를 묶는 이야기는 「칩을 판다」를 넘어 「연산 인프라를 어디에 둘지」로 확장됩니다. 다만 비상장 지분 거래는 공시·규제·실행 리스크가 큽니다. 다음에는 공식 발표 여부와 위성 AI 페이로드 상용 일정을 확인하시면 됩니다.',
  footer: 'NVDA · SPCX 지분 논의',
}, {
  badge: 'NVDA',
  title: 'Prediction markets sharply raised odds of a $20B Nvidia stake in SpaceX',
  heroIcon: '💰', heroBig: '$20B',
  heroSub: 'Odds jumped around Aug 29. The AI chip supplier and launch infrastructure story came back into focus.',
  cards: [
    { icon:'📊', big:'Surge',     mid:'Market odds',       sub:'Rose sharply around Aug 29' },
    { icon:'🔗', big:'AI+space',  mid:'Linkage thesis',    sub:'Data centers tied to satellite networks' },
    { icon:'🛰️', big:'SPCX',      mid:'Private stake',     sub:'Still expectation until confirmed' },
  ],
  quote: 'A $20B stake is not a confirmed transaction. Prediction markets price probabilities, and higher odds mean more attention to the scenario. Linking AI data centers with low-Earth-orbit networks could extend compute where ground links are weak.',
  noteSub: 'The thesis moves from selling chips to placing compute infrastructure. Private stakes carry disclosure, regulatory, and execution risk. Watch for official confirmation and commercial satellite AI payload timelines.',
  footer: 'NVDA · SpaceX stake talk',
});

add('starbase-water-rights', 'L2', 'SPCX', {
  badge: 'SPCX',
  title: '스타베이스 인근 444에이커 규모 수자원 권리가 최대 2억 2,000만 달러에 거래될 수 있다고 전해졌습니다',
  heroIcon: '💧', heroBig: '444ac',
  heroSub: '텍사스 남부 발사장 주변에서 대규모 로켓 시험·발사를 늘리려면 물·토지 인프라가 선행돼야 합니다.',
  cards: [
    { label:'면적',   big:'444ac',      mid:'수자원 부지',     sub:'약 180만 제곱미터에 가깝습니다' },
    { label:'규모',   big:'$220M',      mid:'거래 상한',       sub:'인프라 선행 투자의 일부입니다' },
    { label:'목적',   big:'스타베이스', mid:'발사장 확장',     sub:'대형 로켓 시험에 물이 필요합니다' },
  ],
  detailHead: '왜 물 권리가 뉴스인가',
  detailLines: [
    '🚀 대형 로켓 시험은 소음·열·소화수 수요가 큽니다',
    '🏗️ 발사 빈도를 늘리려면 토지·상하수 인프라가 먼저입니다',
    '📍 스타베이스는 상업 발사 허브로 확장 중입니다',
  ],
  noteSub: '로켓 회사의 경쟁력은 「몇 번 발사했는가」와 「어디서 더 자주 쏠 수 있는가」로 나뉩니다. 수자원·토지 확보는 생산능력 확대의 전조입니다. 거래가 확정되면 발사 빈도 목표와 맞춰 보시면 됩니다. 물·환경 규제는 지역 확장의 숨은 변수이기도 합니다.',
  footer: 'SPCX · 스타베이스 수자원',
}, {
  badge: 'SPCX',
  title: 'Up to 444 acres of water rights near Starbase may trade for as much as $220M',
  heroIcon: '💧', heroBig: '444 ac',
  heroSub: 'Scaling heavy rocket testing in South Texas requires land and water infrastructure first.',
  cards: [
    { label:'Area',    big:'444 ac',     mid:'Water-rights tract', sub:'Close to 1.8 million square meters' },
    { label:'Value',   big:'$220M',      mid:'Upper deal talk',    sub:'Part of upfront infrastructure spend' },
    { label:'Site',    big:'Starbase',   mid:'Launch campus',      sub:'Heavy tests need water capacity' },
  ],
  detailHead: 'Why water rights matter',
  detailLines: [
    '🚀 Heavy rocket tests create large water and fire-suppression demand',
    '🏗️ Higher launch cadence needs land and utility capacity first',
    '📍 Starbase is expanding as a commercial launch hub',
  ],
  noteSub: 'Launch competitiveness splits between cadence achieved and room to add more. Land and water rights are leading indicators of capacity expansion. If a deal closes, compare it with stated launch cadence targets. Local water and environmental rules remain hidden constraints.',
  footer: 'SPCX · Starbase water rights',
});

add('spcx-ai-satellites', 'L3', 'SPCX', {
  badge: 'SPCX',
  title: '2027년 4분기부터 엔비디아 칩을 탑재한 AI 위성 서비스가 시작될 수 있다는 일정이 거론됐습니다',
  heroIcon: '🛰️', heroBig: '2027 Q4',
  heroSub: '위성에서 AI 추론을 돌리면 지상망이 느린 구간에서도 데이터 처리가 가능합니다. 상용 일정이 구체화되고 있습니다.',
  cards: [
    { icon:'🧠', big:'AI 칩',     mid:'엔비디아 탑재',     sub:'위성 페이로드에 GPU급 연산' },
    { icon:'📅', big:'2027 Q4',   mid:'목표 시점',         sub:'약 1년 반 뒤 상용 구간' },
    { icon:'🌐', big:'저지연',    mid:'궤도상 추론',       sub:'지상 왕복 지연을 줄입니다' },
  ],
  quote: '궤도 AI 위성은 지상 데이터센터와 다른 역할을 합니다. 재난·해상·군·농업 등 지상망이 약한 곳에서 이미지·센서 데이터를 바로 분석할 수 있습니다. 엔비디아 칩 탑재 일정이 나오면 「칩 공급」이 「우주 서비스」로 이어지는지 확인할 수 있습니다.',
  noteSub: '위성 AI는 아직 초기 단계지만, 일정이 분기 단위로 내려오면 실행 리스크가 줄어듭니다. 다음에는 첫 위성 발사 수량, 서비스 요금, 지상 대비 지연 시간 목표를 보시면 됩니다. 칩 업체와 발사·위성 운영사의 수익 분배도 장기적으로 중요합니다.',
  footer: 'SPCX · AI 위성 일정',
}, {
  badge: 'SPCX',
  title: 'AI satellite service with Nvidia chips may begin in Q4 2027',
  heroIcon: '🛰️', heroBig: '2027 Q4',
  heroSub: 'Running AI inference in orbit can process data where ground links are slow. The commercial timeline is getting specific.',
  cards: [
    { icon:'🧠', big:'AI chips',  mid:'Nvidia onboard',    sub:'GPU-class compute in the payload' },
    { icon:'📅', big:'2027 Q4',   mid:'Target window',     sub:'Roughly eighteen months out' },
    { icon:'🌐', big:'Low latency', mid:'On-orbit inference', sub:'Cuts round-trip delay to Earth' },
  ],
  quote: 'Orbital AI plays a different role from ground data centers. It can analyze sensor data where links are weak—in maritime, defense, disaster, and agriculture use cases. A Nvidia chip timeline lets investors test whether chip supply becomes a space service.',
  noteSub: 'Satellite AI is still early, but quarter-level dates reduce execution ambiguity. Watch first launch count, service pricing, and latency targets versus ground. Long term, revenue split between chip makers and launch operators matters.',
  footer: 'SPCX · AI satellite timeline',
});

add('elon-solar-turbine', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '☀️ 연간 100GW 태양광 · 사내 터빈 주조',
  title: '연간 100기가와트급 태양광과 스페이스X·테슬라의 사내 풍력 터빈 주조 계획이 함께 거론됐습니다',
  heroIcon: '⚡', heroBig: '100GW/yr',
  heroSub: 'AI·전기차·로켓 모두 전력이 병목입니다. 발전 장비를 직접 만들겠다는 그림은 수직 통합의 연장선입니다.',
  cards: [
    { icon:'☀️', big:'100GW',     mid:'연간 태양광',       sub:'대규모 발전 설비 목표입니다' },
    { icon:'🌬️', big:'터빈 주조', mid:'사내 생산',         sub:'외주 의존을 줄이려는 방향' },
    { icon:'🏭', big:'SPCX+TSLA', mid:'공동 인프라',       sub:'발사장·공장 전력 수요가 큽니다' },
  ],
  quote: '100GW는 대한민국 전체 설치 태양광보다 훨씬 큰 숫자입니다. 터빈을 사내에서 주조한다는 것은 부품 공급 지연과 가격 변동을 줄이겠다는 뜻입니다. AI 데이터센터와 전기차 공장이 늘수록 전력·변압기·냉각이 함께 병목이 됩니다.',
  noteSub: '전력 병목은 「전기를 더 산다」가 아니라 「발전·송전 장비를 확보한다」로 이어집니다. 태양광·터빈 자체 생산이 현실화되면 에너지 비용 구조가 달라질 수 있습니다. 다음에는 구체적 공장 부지·양산 시점·수주 잔고를 확인하시면 됩니다.',
  footer: 'TSLA · 태양광·터빈',
}, {
  badge: 'TSLA', badgeLine: '☀️ 100 GW/yr solar · in-house turbine casting',
  title: 'Plans surfaced for 100 GW/year solar and in-house wind-turbine casting at SpaceX and Tesla',
  heroIcon: '⚡', heroBig: '100 GW/yr',
  heroSub: 'AI, EVs, and rockets all hit the same power bottleneck. Making generation gear in-house extends vertical integration.',
  cards: [
    { icon:'☀️', big:'100 GW',    mid:'Solar per year',    sub:'A very large generation target' },
    { icon:'🌬️', big:'Casting',   mid:'In-house turbines', sub:'Less reliance on outside suppliers' },
    { icon:'🏭', big:'SPCX+TSLA', mid:'Shared infra',      sub:'Launch sites and factories need power' },
  ],
  quote: 'One hundred gigawatts is far larger than many national solar fleets. Casting turbines internally is about cutting supplier delay and price swings. As AI data centers and EV plants expand, power, transformers, and cooling bind together.',
  noteSub: 'Power bottlenecks shift from buying electrons to securing generation and grid gear. If solar and turbine production becomes real, energy cost structures can change. Watch site announcements, production timing, and order backlogs next.',
  footer: 'TSLA · solar and turbines',
});

add('elon-ai-power-bottleneck', 'L5', 'AI', {
  badge: 'AI',
  title: '약 15기가와트 규모 AI 연산 설비가 2027년까지 전력·변압기·배선·냉각 문제로 가동을 못 할 수 있다는 병목 전망이 나왔습니다',
  heroIcon: '🔌', heroBig: '~15GW',
  heroSub: '칩을 샀어도 전기를 연결하지 못하면 데이터센터는 빈 껍데기입니다. AI 경쟁은 반도체에서 전력 인프라로 옮겨 가고 있습니다.',
  before: { label:'주문·투자', big:'GPU·HBM', sub:'칩 수급이 먼저 뉴스가 됐습니다' },
  after:  { label:'실제 가동', big:'~15GW 지연', sub:'변압기·배선·냉각이 막습니다' },
  cards: [
    { icon:'⚡', big:'변압기',    mid:'납기 2~3년',        sub:'대형 설비는 주문 후 오래 걸립니다' },
    { icon:'🧊', big:'냉각',      mid:'수랭·空冷',         sub:'전력 밀도가 올라가며 필수입니다' },
    { icon:'🏗️', big:'2027',      mid:'가동 목표',         sub:'일정과 인프라가 맞지 않을 수 있습니다' },
  ],
  quote: '15GW는 대형 원자로 여러 기를 동시에 돌리는 규모에 가깝습니다. AI 데이터센터는 건물보다 「전기를 안정적으로 받는지」가 먼저입니다. 변압기·케이블·냉각수 없이는 칩을 켤 수 없습니다.',
  noteSub: 'AI 투자자는 이제 「매출 가이던스」와 함께 「전력 연결 일정」을 봐야 합니다. 전력 장비 업체·EPC·유틸리티 허가가 새로운 알파 구간입니다. 다음 분기 earnings call에서 전력 지연 언급 여부를 체크하시면 됩니다.',
  footer: 'AI · 전력 병목',
}, {
  badge: 'AI',
  title: 'About 15 GW of AI compute may not turn on by 2027 because of transformer, wiring, and cooling bottlenecks',
  heroIcon: '🔌', heroBig: '~15 GW',
  heroSub: 'Buying chips is not enough if you cannot connect power. AI competition is moving from silicon to grid infrastructure.',
  before: { label:'Orders', big:'GPU/HBM', sub:'Chip supply led the headlines first' },
  after:  { label:'Power-on', big:'~15 GW delayed', sub:'Transformers, wiring, cooling block' },
  cards: [
    { icon:'⚡', big:'Transformers', mid:'2-3 yr lead',   sub:'Large gear takes years to deliver' },
    { icon:'🧊', big:'Cooling',      mid:'Liquid/air',    sub:'Power density makes this mandatory' },
    { icon:'🏗️', big:'2027',         mid:'Target dates',  sub:'Schedules may miss infra reality' },
  ],
  quote: 'Fifteen gigawatts is close to several large nuclear units running together. A data center turns on stable power before it turns on chips. Without transformers, cabling, and cooling, GPUs stay dark.',
  noteSub: 'Investors now need power-connection timelines beside revenue guides. Grid gear makers, EPC firms, and utility approvals are the new bottleneck trade. Listen for power-delay mentions on the next earnings calls.',
  footer: 'AI · power bottleneck',
});

add('arkk-tsla-spcx-flow', 'L2', 'MACRO', {
  badge: 'MACRO',
  title: 'ARKK·테슬라·스페이스X 관련 ETF 자금 흐름이 같은 주에 크게 움직였습니다',
  heroIcon: '💸', heroBig: 'ARKK ~$600M',
  heroSub: '혁신 성장 ETF와 테슬라·우주 테마 종목으로 돈이 몰리거나 빠지는지가 위험자산 온도계가 됩니다.',
  cards: [
    { label:'ARKK', big:'~$600M',  mid:'자금 흐름',         sub:'혁신 ETF 쪽 변동이 컸습니다' },
    { label:'TSLA', big:'~$391M', mid:'관련 흐름',         sub:'로보택시·에너지 테마와 연결' },
    { label:'SPCX', big:'테마',    mid:'우주·발사',         sub:'비상장 연관 수혜 기대' },
  ],
  detailHead: '흐름을 읽는 방법',
  detailLines: [
    '📊 ETF 자금 유입은 「추종 매수」가 얼마나 있는지 보여 줍니다',
    '🚗 테슬라는 AI·로보택시·에너지 내러티브가 겹칩니다',
    '🚀 우주 테마는 상장 우회 수단(ETF·원자재)으로도 거래됩니다',
  ],
  noteSub: '개별 종목 뉴스보다 ETF 자금 흐름은 「테마 전체에 돈이 들어오는지」를 보여 줍니다. 같은 날 ARKK·테슬라·스페이스X 관련 흐름이 같이 움직이면 혁신·우주·인공지능이 한 묶음으로 거래되고 있다는 뜻입니다. 다음 주에는 사이버캡 행사 전후 테슬라 옵션·ETF 유입을 함께 보시면 됩니다.',
  footer: '매크로 · ETF 자금 흐름',
}, {
  badge: 'MACRO',
  title: 'ETF flows around ARKK, Tesla, and SpaceX themes moved sharply in the same week',
  heroIcon: '💸', heroBig: 'ARKK ~$600M',
  heroSub: 'Flows into innovation growth and Tesla/space themes act as a risk-appetite thermometer.',
  cards: [
    { label:'ARKK', big:'~$600M',  mid:'Flow move',         sub:'Innovation ETF saw large shifts' },
    { label:'TSLA', big:'~$391M', mid:'Related flow',      sub:'Linked to robotaxi and energy' },
    { label:'SPCX', big:'Theme',   mid:'Space/launch',      sub:'Pre-IPO linkage expectations' },
  ],
  detailHead: 'How to read the flows',
  detailLines: [
    '📊 ETF inflows show how much passive/theme buying exists',
    '🚗 Tesla stacks AI, robotaxi, and energy narratives',
    '🚀 Space themes also trade through ETFs and proxies',
  ],
  noteSub: 'ETF flows show whether money is entering a theme basket, not just one headline. When ARKK, Tesla, and space proxies move together, innovation and AI are trading as one sleeve. Watch TSLA options and ETF inflows around the Cybercab event next.',
  footer: 'Macro · ETF flows',
});

add('tsla-cybercab-sept3', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '9월 3일 오스틴 · 사이버캡 전용 행사',
  title: '운전석·페달 없는 사이버캡 전용 행사가 9월 3일 텍사스 오스틴에서 열립니다',
  heroBig: '$30K',
  heroSub: '차량 목표가 3만 달러, 운행비 마일당 0.20달러. 전용 로보택시가 드디어 날짜가 박혔습니다.',
  grid: [
    { icon:'📅', big:'9/3',       mid:'오스틴',            sub:'텍사스 전용 행사' },
    { icon:'🚗', big:'무조종',    mid:'운전석·페달 없음', sub:'처음부터 무인용 설계' },
    { icon:'💵', big:'$0.20/mi',  mid:'운행비 목표',       sub:'유닛 이코노믹스 핵심' },
    { icon:'🏭', big:'전용',      mid:'모델Y 개조 아님',   sub:'사이버캡 전용 차량' },
  ],
  ctx1: '기존 모델Y에 소프트웨어만 얹은 차가 아니라 처음부터 무인 운행용으로 만든 차량입니다',
  ctx2: '날짜가 정해지면 상용 일정이 「언젠가」에서 「이번 달 행사 후」로 바뀝니다',
  quote: '사이버캡(Cybercab)은 운전석과 페달이 없는 전용 로보택시입니다. 3만 달러 목표가와 마일당 0.20달러는 택시보다 저렴한 운행비를 겨냥한 숫자입니다. 9월 3일 행사에서 실차·운행 구역·규제 진행을 함께 확인할 수 있습니다.',
  noteSub: '로보택시는 2016년부터 「언젠가」라는 말만 반복됐습니다. 이번처럼 날짜·차량·가격·도로 데이터가 겹치는 구간은 단기 주가와 별개로 5년 뷰에서 실행 리스크가 줄어드는 구간입니다. 행사 다음 날부터는 실제 무인 운행 영상·허가 범위·양산 시점을 보시면 됩니다.',
  footer: 'TSLA · 사이버캡 9/3',
}, {
  badge: 'TSLA', breaking: 'SEPT 3 AUSTIN · CYBERCAB EVENT',
  title: 'A dedicated no-wheel no-pedal Cybercab event is set for Sept 3 in Austin, Texas',
  heroBig: '$30K',
  heroSub: 'Target vehicle price $30K and $0.20 per mile. A purpose-built robotaxi finally has a date.',
  grid: [
    { icon:'📅', big:'Sept 3',    mid:'Austin',            sub:'Dedicated launch event' },
    { icon:'🚗', big:'No controls', mid:'No wheel/pedals', sub:'Built for unmanned use' },
    { icon:'💵', big:'$0.20/mi',  mid:'Operating target',  sub:'Core to unit economics' },
    { icon:'🏭', big:'Dedicated', mid:'Not a Model Y patch', sub:'Cybercab-only vehicle' },
  ],
  ctx1: 'This is not a Model Y with software only—it is built for unmanned operation from the start',
  ctx2: 'A fixed date moves commercial timing from someday to after this month\'s event',
  quote: 'Cybercab is a purpose-built robotaxi without a steering wheel or pedals. The $30K price and $0.20-per-mile target aim below traditional ride-hail costs. The Sept 3 event should show the vehicle, geofence, and regulatory path together.',
  noteSub: 'Robotaxi has been a someday story since 2016. When date, vehicle, price, and road data overlap, execution risk can fall on a five-year view even if the daily stock move is noisy. After the event, watch unmanned footage, permit scope, and production timing.',
  footer: 'TSLA · Cybercab Sept 3',
});

add('spy-low-volatility', 'L1', 'MACRO', {
  badge: 'MACRO',
  title: 'S&P500 ETF(SPY)의 주간 변동성이 2004년 12월 이후 가장 낮은 수준 근처에 있습니다',
  heroIcon: '📉', heroBig: '769.35',
  heroSub: '8월 28일 종가 769.35달러, -0.23%. 조용한 마감이지만 잭슨홀 이후 금리 변수는 남아 있습니다.',
  cards: [
    { icon:'📊', big:'저변동',    mid:'주간 vol',          sub:'2004년 12월 이후 최저 근처' },
    { icon:'📅', big:'8/28',      mid:'종가 -0.23%',       sub:'잭슨홀 직후 첫 거래일' },
    { icon:'⚠️', big:'금리',      mid:'9월 57.5%',         sub:'인상 확률은 여전히 높습니다' },
  ],
  quote: '변동성이 낮다는 것은 가격이 조용히 움직였다는 뜻이지, 위험이 사라졌다는 뜻은 아닙니다. 잭슨홀 매파 발언 이후 9월 금리 인상 확률은 57.5% 수준으로 높게 남아 있어, 다음 고용·물가 발표에 변동성이 다시 커질 수 있습니다.',
  noteSub: '저변동 구간은 종종 「뉴스 없는 장」이 아니라 「기대가 한쪽으로 쏠린 장」입니다. SPY가 조용할 때는 옵션·VIX·2년물 금리를 함께 보시는 편이 좋습니다. 9월 4일 고용·9월 15~16일 FOMC 전후로 변동성이 다시 튈 수 있습니다.',
  footer: '매크로 · SPY 저변동',
}, {
  badge: 'MACRO',
  title: 'SPY weekly volatility is near its lowest level since December 2004',
  heroIcon: '📉', heroBig: '769.35',
  heroSub: 'It closed at $769.35 on Aug 28, down 0.23%. The market was quiet, but rate risk remains.',
  cards: [
    { icon:'📊', big:'Low vol',   mid:'Weekly measure',    sub:'Near lows since Dec 2004' },
    { icon:'📅', big:'Aug 28',    mid:'Close -0.23%',      sub:'First session after Jackson Hole' },
    { icon:'⚠️', big:'Rates',     mid:'57.5% Sept odds',   sub:'Hike probability still elevated' },
  ],
  quote: 'Low volatility means prices moved quietly, not that risk disappeared. After a hawkish Jackson Hole message, September hike odds near 57.5% can reopen volatility on the next jobs and inflation prints.',
  noteSub: 'Quiet SPY sessions often hide one-sided expectations rather than true calm. Watch options, VIX, and the 2-year yield alongside the index. Volatility can jump again around the Sept 4 jobs report and the Sept 15-16 FOMC meeting.',
  footer: 'Macro · SPY low volatility',
});

add('big-tech-week', 'L3', 'MACRO', {
  badge: 'MACRO',
  title: '이번 주 빅테크는 애플 최고운영책임자(CEO) 후보 논의와 테슬라 로보택시 목요일 일정이 겹칩니다',
  heroIcon: '📱', heroBig: 'Big Tech Week',
  heroSub: '인력·제품·자율주행 일정이 같은 주에 몰리면 섹터 전체 변동성이 커질 수 있습니다.',
  cards: [
    { icon:'🍎', big:'AAPL',      mid:'CEO 후보',          sub:'최고운영책임자 승계 논의' },
    { icon:'🚕', big:'TSLA',      mid:'로보택시',          sub:'목요일 관련 일정' },
    { icon:'📊', big:'Mag7',      mid:'동반 변동',         sub:'한 종목이 섹터를 끕니다' },
  ],
  quote: '애플 최고운영책임자 후보는 제품 실행과 공급망을 맡는 핵심 자리입니다. 테슬라 로보택시 일정은 자율주행 상용화 기대를 다시 점검하는 이벤트입니다. 같은 주에 두 이슈가 겹치면 기술주 ETF와 Mag7 상관관계가 높아집니다.',
  noteSub: '빅테크 주간은 「실적」이 아니라 「일정」이 주가를 움직입니다. 승계·로보택시처럼 날짜가 있는 이벤트는 발표 전후 48시간 변동성이 커지는 경우가 많습니다. 포지션 크기를 조절하려면 목요일 전후 옵션 내재변동성을 확인하시면 됩니다.',
  footer: '매크로 · 빅테크 주간',
}, {
  badge: 'MACRO',
  title: 'This week stacks Apple COO succession talk with Tesla\'s Thursday robotaxi schedule',
  heroIcon: '📱', heroBig: 'Big Tech Week',
  heroSub: 'Leadership, product, and autonomy dates in one week can lift sector volatility.',
  cards: [
    { icon:'🍎', big:'AAPL',      mid:'COO rumor',         sub:'Operations leadership succession' },
    { icon:'🚕', big:'TSLA',      mid:'Robotaxi',          sub:'Thursday-related schedule' },
    { icon:'📊', big:'Mag 7',     mid:'Joint moves',       sub:'One name can drag the group' },
  ],
  quote: 'Apple\'s COO role runs product execution and supply chain. Tesla\'s robotaxi date re-tests autonomy commercialization hopes. When both land in one week, tech ETFs and Mag 7 correlation usually rise.',
  noteSub: 'Big-tech weeks are often moved by calendars, not earnings. Dated events like succession and robotaxi often widen the 48-hour volatility window. Check implied volatility into Thursday if you are sizing risk.',
  footer: 'Macro · big tech week',
});

add('hobby-spending-ath', 'L5', 'MACRO', {
  badge: 'MACRO',
  title: '미국 취미·여가 소비가 재화 지출 가운데 5%를 넘어 사상 최고 수준에 도달했다는 데이터가 나왔습니다',
  heroIcon: '🎮', heroBig: '5% ATH',
  heroSub: '금리가 높아도 「경험·취미」 지출은 줄지 않았습니다. 소비 패턴이 「필수 vs 선택」으로만 나뉘지 않습니다.',
  before: { label:'과거 평균', big:'~4%',  sub:'취미 지출 비중이 더 낮았습니다' },
  after:  { label:'현재',     big:'5%+',  sub:'재화 지출 중 사상 최고' },
  cards: [
    { icon:'🛍️', big:'재화',      mid:'goods spending',    sub:'물건 구매 전체 중 비중' },
    { icon:'🎣', big:'취미',      mid:'hobby/leisure',     sub:'낚시·게임·Outdoor 등' },
    { icon:'📈', big:'ATH',       mid:'역대 최고',         sub:'금리 고점과 공존' },
  ],
  quote: '취미 지출 5%는 「경기가 좋아서」만 설명되지 않습니다. 팬데믹 이후 집·취미·경험 소비가 늘고, 고금리에도 특정 카테고리는 버티는 모습입니다. 리테일·게임·아웃도어 브랜드에 분산된 수혜입니다.',
  noteSub: '매크로 투자자에게는 「소비 둔화」가 모든 선택 소비를 같이 끌어내리지 않는다는 교훈입니다. 취미 지출 ATH는 경기 둔화 논쟁과 공존할 수 있습니다. 다음 소비 지표에서 durable vs hobby 카테고리를 나눠 보시면 됩니다.',
  footer: '매크로 · 취미 지출 ATH',
}, {
  badge: 'MACRO',
  title: 'US hobby spending reached an all-time high above 5% of goods outlays',
  heroIcon: '🎮', heroBig: '5% ATH',
  heroSub: 'Even with high rates, experience and hobby spending did not fade. Consumption is not just staples versus discretionaries.',
  before: { label:'Past average', big:'~4%',  sub:'Hobby share used to be lower' },
  after:  { label:'Now',         big:'5%+',  sub:'All-time high within goods' },
  cards: [
    { icon:'🛍️', big:'Goods',     mid:'Total goods spend', sub:'Share within merchandise' },
    { icon:'🎣', big:'Hobby',     mid:'Leisure/outdoor',   sub:'Fishing, gaming, outdoor' },
    { icon:'📈', big:'ATH',       mid:'Record high',       sub:'Coexists with high rates' },
  ],
  quote: 'Five percent hobby share is not explained by strong growth alone. Post-pandemic home, hobby, and experience spending persists, and some categories hold up under high rates. Benefits spread across retail, gaming, and outdoor brands.',
  noteSub: 'For macro investors, the lesson is that a consumer slowdown does not hit every discretionary line equally. Hobby ATH can coexist with slowdown debate. Split durable versus hobby categories in the next consumption prints.',
  footer: 'Macro · hobby spending ATH',
});

add('turbines-sold-out', 'L2', 'TSLA', {
  badge: 'TSLA',
  title: '풍력·에너지 터빈 수요가 2030년까지 매진 상태라는 전망이 나왔습니다',
  heroIcon: '🌬️', heroBig: '2030',
  heroSub: 'AI·전기차·데이터센터가 동시에 전력을 요구하면서 발전 장비 주문이 몰리고 있습니다.',
  cards: [
    { label:'수요',   big:'매진',      mid:'2030년까지',        sub:'신규 주문 납기가 밀립니다' },
    { label:'태양광', big:'100GW/yr',  mid:'병행 목표',         sub:'풍력과 함께 확장' },
    { label:'생산',   big:'사내 주조', mid:'TSLA·SPCX',         sub:'공급망 통제 시도' },
  ],
  detailHead: '왜 터빈이 병목인가',
  detailLines: [
    '⚡ 데이터센터는 24시간 안정 전력이 필요합니다',
    '🌬️ 풍력·태양광은 신규 발전 capacity의 핵심입니다',
    '🏭 터빈 주조 capacity는 급격히 늘리기 어렵습니다',
  ],
  noteSub: '「2030 매진」은 가격 인상·납기 지연·수직 통합 압력을 동시에 뜻합니다. 테슬라·스페이스X가 사내 생산을 밀면 장비 업체와 경쟁·협력 관계가 바뀝니다. 에너지 ETF·풍력 OEM·그리드 EPC 수주 잔고를 함께 추적하시면 됩니다.',
  footer: 'TSLA · 터빈 매진',
}, {
  badge: 'TSLA',
  title: 'Wind and energy turbine demand is said to be sold out through 2030',
  heroIcon: '🌬️', heroBig: '2030',
  heroSub: 'AI, EVs, and data centers are pulling power orders at the same time.',
  cards: [
    { label:'Demand', big:'Sold out',  mid:'Through 2030',      sub:'New orders face long lead times' },
    { label:'Solar',  big:'100 GW/yr', mid:'Parallel target',   sub:'Expanding alongside wind' },
    { label:'Make',   big:'In-house',  mid:'TSLA/SPCX',         sub:'Supply-chain control push' },
  ],
  detailHead: 'Why turbines bottleneck',
  detailLines: [
    '⚡ Data centers need stable 24/7 power',
    '🌬️ Wind and solar anchor new capacity builds',
    '🏭 Turbine casting capacity is hard to scale fast',
  ],
  noteSub: 'Sold out through 2030 implies higher prices, longer lead times, and vertical integration pressure together. If Tesla and SpaceX push in-house production, relationships with OEMs shift. Track energy ETFs, wind OEM backlogs, and grid EPC orders.',
  footer: 'TSLA · turbines sold out',
});

/* ══════════════════════════ 한국주식 · 6 ══════════════════════════ */

add('summary-kr', 'ROWS', 'KOSPI', {
  headline: '2026.08.31 한국장 한장 요약',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'KOSPI', title:'코스피 6,788.88, -1.79%로 마감했습니다',
      sub:'전날 6,900선 상승분을 하루 만에 대부분 반납했고, 이번 주 일정이 변수로 남았습니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'8.3T',  title:'외국인 순매도 8,315억 원 규모가 거론됐습니다',
      sub:'주간·일간 수급 집계 기준 차이는 있으나, 매도 우위 흐름은 같습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'반도체', title:'대만 반도체 박람회(SemiCon Taiwan)가 8월 31일 개막합니다',
      sub:'AI·先端 패키징 수요가 국내 메모리·파운드리 주가와 연결됩니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'FOMC',  title:'9월 15~16일 FOMC와 9월 4일 고용 지표가 겹칩니다',
      sub:'금리 인상 확률 57.5% 수준으로 높게 남아 있습니다.' },
    { color:'#f59e0b', fill:'#1a1205', right:'HYNIX', title:'SK하이닉스 -4.45%, 에이전트 메모리 테마와 엇갈렸습니다',
      sub:'장기 HBM 부존 전망과 단기 주가 조정이 같은 날 공존했습니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'KB',    title:'KB금융 +2.08% 등 금융주가 상대 강세였습니다',
      sub:'금리 상승 기대가 은행주에 유리하게 작용한 날입니다.' },
  ],
  caption: '더 볼 것: 코스피 6788.88 · 외국인 8.3T · SemiCon Taiwan · FOMC 9/15-16 · 고용 9/4 · 인상 57.5%',
}, {
  headline: '2026.08.31 Korea market snapshot',
  rows: [
    { color:'#38bdf8', fill:'#061520', right:'KOSPI', title:'KOSPI closed at 6,788.88, down 1.79%',
      sub:'Most of the prior day\'s 6,900 push was given back; this week\'s calendar matters.' },
    { color:'#22d3ee', fill:'#06171c', right:'8.3T',  title:'Foreign net selling around 831.5bn won was cited',
      sub:'Daily versus weekly totals differ, but the sell-side tone is consistent.' },
    { color:'#60a5fa', fill:'#0a1420', right:'SEMI',  title:'SemiCon Taiwan opens Aug 31',
      sub:'AI and advanced packaging demand links to Korean memory and foundry names.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'FOMC',  title:'Sept 15-16 FOMC overlaps the Sept 4 jobs report',
      sub:'September hike odds remain near 57.5%.' },
    { color:'#f59e0b', fill:'#1a1205', right:'HYNIX', title:'SK Hynix -4.45% despite agent-memory themes',
      sub:'Long HBM tightness and near-term price action diverged.' },
    { color:'#94a3b8', fill:'#0f1419', right:'KB',    title:'KB Financial +2.08% led a firm bank group',
      sub:'Higher-rate expectations helped financials on a down index day.' },
  ],
  caption: 'Also: KOSPI 6788.88 · foreign 831.5bn · SemiCon Taiwan · FOMC · jobs Sept 4 · 57.5% hike odds',
});

add('samsung-cxmt', 'L1', 'SEC', {
  badge: '삼성전자',
  title: '중국 메모리 업체 CXMT 실적 급증과 삼성전자 1조 5,000억 원 규모 자사주 매입이 같은 주에 부각됐습니다',
  heroIcon: '📱', heroBig: '+874%',
  heroSub: 'CXMT 상반기 실적이 크게 늘었다는 보도와 함께 삼성전자는 -3.38% 조정을 받았습니다. 공급 확대 vs 자사주 매입이 대비됩니다.',
  cards: [
    { icon:'🇨🇳', big:'CXMT',      mid:'H1 실적 급증',      sub:'중국 NAND·DRAM 공급 확대 우려' },
    { icon:'💵', big:'1.5조',     mid:'자사주 매입',       sub:'주가 부담 완화 수단입니다' },
    { icon:'📉', big:'-3.38%',    mid:'삼성전자',          sub:'외국인 매도와 겹친 날' },
  ],
  quote: 'CXMT는 중국의 메모리 반도체 기업입니다. 실적이 874% 늘었다는 보도는 「공급자가 늘었다」는 신호로 읽힐 수 있습니다. 반면 삼성전자의 1조 5,000억 원 자사주 매입은 「주가·주주환원」 메시지로, 공급 우려와 수요 방어가 같은 주에 충돌했습니다.',
  noteSub: '메모리 투자는 「누가 얼마나 늘리는가」와 「누가 얼마나 버티는가」를 동시에 봐야 합니다. CXMT 확장은 가격 경쟁 변수, 자사주 매입은 EPS·배당 변수입니다. 월간 수출·ASP·HBM mix를 함께 추적하시면 됩니다.',
  footer: '삼성전자 · CXMT·자사주',
}, {
  badge: 'SAMSUNG',
  title: 'CXMT earnings surge and Samsung\'s 1.5T won buyback landed in the same week',
  heroIcon: '📱', heroBig: '+874%',
  heroSub: 'Reports of surging CXMT first-half results coincided with Samsung down 3.38%. Supply expansion versus buyback support.',
  cards: [
    { icon:'🇨🇳', big:'CXMT',      mid:'H1 surge',          sub:'China memory supply expansion fear' },
    { icon:'💵', big:'1.5T won',  mid:'Buyback',           sub:'Shareholder return tool' },
    { icon:'📉', big:'-3.38%',    mid:'Samsung',           sub:'Down with foreign selling' },
  ],
  quote: 'CXMT is a Chinese memory maker. An 874% earnings jump can read as more supply entering the market. Samsung\'s 1.5 trillion won repurchase is a shareholder-return message—supply worry and demand defense collided in one week.',
  noteSub: 'Memory investing requires watching who expands and who holds pricing power. CXMT is a pricing variable; buybacks are an EPS and dividend variable. Track monthly exports, ASP, and HBM mix together.',
  footer: 'Samsung · CXMT and buyback',
});

add('skhynix-agent-memory', 'L2', 'HYNIX', {
  badge: 'SK하이닉스',
  title: 'SK하이닉스는 4.45% 내렸지만 에이전트 메모리·HBM 수요 전망은 여전히 강합니다',
  heroIcon: '🧊', heroBig: '-4.45%',
  heroSub: '단기 주가 조정과 장기 AI 메모리 부존 전망이 같은 종목에서 동시에 나타났습니다.',
  cards: [
    { label:'주가',   big:'-4.45%',   mid:'일간 조정',         sub:'외국인 매도 영향' },
    { label:'테마',   big:'에이전트', mid:'메모리 24배',       sub:'2030년까지 수요 전망' },
    { label:'HBM',    big:'2026~27',  mid:'품귀',              sub:'고대역폭 메모리' },
  ],
  detailHead: '단기 vs 장기 해석',
  detailLines: [
    '📉 지수·수급이 먼저 주가를 눌렀습니다',
    '🧠 에이전트는 토큰·메모리 사용량을 크게 늘립니다',
    '🏭 HBM 증설 일정이 실적로 연결되는지가 관건입니다',
  ],
  noteSub: '하이닉스는 「오늘 외국인이 팔았는가」와 「2027 HBM mix가 올라가는가」를 동시에 봐야 합니다. 에이전트 테마는 장기 수요, -4.45%는 단기 포지션 정리입니다. 분기 HBM 매출 비중과 인디애나·용인 capex 일정을 확인하시면 됩니다.',
  footer: 'SK하이닉스 · 에이전트 메모리',
}, {
  badge: 'SK HYNIX',
  title: 'SK Hynix fell 4.45% even as agent-memory and HBM demand views stay strong',
  heroIcon: '🧊', heroBig: '-4.45%',
  heroSub: 'Near-term price action and long AI memory tightness showed up in the same name.',
  cards: [
    { label:'Price',  big:'-4.45%',   mid:'Daily move',        sub:'Foreign selling pressure' },
    { label:'Theme',  big:'Agents',   mid:'24x memory',        sub:'Demand view to 2030' },
    { label:'HBM',    big:'2026-27',  mid:'Tight',             sub:'High-bandwidth memory' },
  ],
  detailHead: 'Near vs long read',
  detailLines: [
    '📉 Index and flows hit the stock first',
    '🧠 Agents raise token and memory traffic',
    '🏭 HBM ramp timing drives earnings',
  ],
  noteSub: 'Hynix requires watching both today\'s foreign flows and 2027 HBM mix. Agents are long demand; -4.45% is short-term de-risking. Check quarterly HBM revenue share and Indiana/Yongin capex schedules.',
  footer: 'SK Hynix · agent memory',
});

add('hyundai-cid', 'L3', 'SEC', {
  badge: '현대차',
  title: '현대차가 CID(Connected Infotainment Display) 기대 대비 실망스러운 반응으로 3.73% 하락했습니다',
  heroIcon: '🚗', heroBig: '-3.73%',
  heroSub: '차량 내 소프트웨어·디스플레이 경험이 프리미엄 전략의 핵심인데, 이번 업데이트는 시장 기대에 못 미쳤습니다.',
  cards: [
    { icon:'📺', big:'CID',       mid:'인포테인먼트',      sub:'차량 내 연결형 디스플레이' },
    { icon:'📉', big:'-3.73%',    mid:'주가 반응',         sub:'기대 대비 실망' },
    { icon:'🌐', big:'SW',        mid:'소프트웨어 UX',     sub:'차량 경험 경쟁력' },
  ],
  quote: 'CID는 운전자가 차량 정보·내비·앱을 보는 중앙 화면입니다. 소프트웨어 경험이 프리미엄 차량의 차별점이 되면서, 업데이트 하나도 주가에 반영됩니다. 이번 반응은 「기술 로드맵은 있지만 체감 품질이 아직」이라는 해석이 나옵니다.',
  noteSub: '완성차는 이제 「대수」와 「차량 SW」를 같이 평가받습니다. CID 실망은 단기 이벤트지만, 반복되면 프리미엄 multiple에 영향을 줍니다. 다음 분기 전동차·SW 매출 비중과 OTA 업데이트 빈도를 보시면 됩니다.',
  footer: '현대차 · CID',
}, {
  badge: 'HYUNDAI',
  title: 'Hyundai fell 3.73% as the CID infotainment update disappointed versus expectations',
  heroIcon: '🚗', heroBig: '-3.73%',
  heroSub: 'In-car software and display experience are central to premium strategy; this update missed the bar.',
  cards: [
    { icon:'📺', big:'CID',       mid:'Infotainment',      sub:'Connected in-car display' },
    { icon:'📉', big:'-3.73%',    mid:'Share reaction',    sub:'Below expectations' },
    { icon:'🌐', big:'SW',        mid:'Software UX',       sub:'In-cabin experience' },
  ],
  quote: 'CID is the central screen for vehicle info, navigation, and apps. As software experience differentiates premium cars, even one update can move the stock. The read is roadmap exists but perceived quality lags.',
  noteSub: 'Automakers are now judged on units and vehicle software together. A CID disappointment is near-term, but repeats can hit premium multiples. Watch EV/software revenue mix and OTA cadence next quarter.',
  footer: 'Hyundai · CID',
});

add('kb-financial', 'L4', 'SEC', {
  badge: 'KB금융', badgeLine: '🏦 금리 상승 기대 · +2.08%',
  title: 'KB금융이 2.08% 올라 하락장에서 금융주 강세를 이끌었습니다',
  heroIcon: '🏦', heroBig: '+2.08%',
  heroSub: '9월 금리 인상 확률 57.5% 수준으로, 예금·대출 금리차(이자마진) 기대가 커졌습니다.',
  cards: [
    { icon:'📈', big:'+2.08%',    mid:'KB금융',            sub:'지수 -1.79%와 대비' },
    { icon:'💹', big:'57.5%',     mid:'9월 인상 확률',     sub:'미국 금리 기대' },
    { icon:'🏛️', big:'은행',      mid:'금융 섹터',         sub:'금리 민감 업종' },
  ],
  quote: '금리가 오를 수 있다는 전망은 은행에 유리합니다. 예금 금리보다 대출 금리가 더 빨리·크게 오르면 이자마진이 넓어지기 때문입니다. KB금융 상승은 「성장주 실망 vs 금융주 방어」가 같은 날 나타난 사례입니다.',
  noteSub: '금융주는 「금리 오르면 오른다」가 항상 맞지는 않습니다. 연체율·대출 성장·배당 정책도 필요합니다. 다만 이번처럼 지수가 내릴 때 KB가 버티면 섹터 로테이션 신호로 볼 수 있습니다. NIM 가이던스와 배당 공시를 함께 보시면 됩니다.',
  footer: 'KB금융 · 금리 수혜',
}, {
  badge: 'KB FIN', badgeLine: '🏦 Rate-hike hopes · +2.08%',
  title: 'KB Financial rose 2.08% and led banks on a down market day',
  heroIcon: '🏦', heroBig: '+2.08%',
  heroSub: 'With September hike odds near 57.5%, net interest margin hopes improved.',
  cards: [
    { icon:'📈', big:'+2.08%',    mid:'KB Financial',      sub:'Versus index -1.79%' },
    { icon:'💹', big:'57.5%',     mid:'Sept hike odds',    sub:'US rate expectations' },
    { icon:'🏛️', big:'Banks',     mid:'Financial sector',  sub:'Rate-sensitive group' },
  ],
  quote: 'Higher-rate expectations help banks when loan yields rise faster than deposit costs, widening net interest margins. KB\'s gain shows growth disappointment and financial defense on the same day.',
  noteSub: 'Banks do not always win when rates rise—you still need credit quality and loan growth. When KB holds up on a down index day, it can signal rotation. Watch NIM guidance and dividend announcements.',
  footer: 'KB Financial · rate tailwind',
});

add('foreign-flow-kr', 'L6', 'FLOW', {
  badge: '수급', breaking: '주간 외국인 순매도 8.3조',
  title: '이번 주 외국인 순매도 규모가 약 8조 3,153억 원 수준으로 집계됐습니다',
  heroBig: '8.3조',
  heroSub: '집계 기준·기간에 따라 숫자는 달라질 수 있으나, 외국인 매도 우위 흐름은 분명합니다.',
  grid: [
    { icon:'🌐', big:'8.3T',      mid:'주간 순매도',       sub:'원화 환산' },
    { icon:'📉', big:'-1.79%',    mid:'코스피',            sub:'지수 하락' },
    { icon:'🧊', big:'반도체',    mid:'매도 집중',         sub:'대형주 중심' },
    { icon:'🏦', big:'금융',      mid:'상대 강세',         sub:'섹터 분화' },
  ],
  ctx1: '잭슨홀 이후 미국 금리·달러 기대가 외국인 포지션 조정을 촉발했습니다',
  ctx2: '환율·수급·금리 세 줄이 같이 움직이는지가 다음 주 관전 포인트입니다',
  quote: '외국인 순매도 8.3조는 「한 번에 팔았다」기보다 「이번 주 누적」에 가깝습니다. 대형 반도체주에 매도가 몰리면 지수 하락폭이 커지고, 금융주처럼 금리 수혜주는 상대적으로 버틸 수 있습니다.',
  noteSub: '수급은 방향보다 「누가 팔았는가」가 중요합니다. ETF·헤지·지수 rebalancing이 섞일 수 있어, 순매도 규모만으로 추세를 단정하지 마십시오. 외국인 순매수 전환 여부와 환율을 같은 표에 적어 두시면 됩니다.',
  footer: '수급 · 외국인 주간',
}, {
  badge: 'FLOWS', breaking: 'WEEKLY FOREIGN NET SELL 8.3T',
  title: 'Foreign net selling this week totaled about 8.3153 trillion won',
  heroBig: '8.3T',
  heroSub: 'Totals vary by window and source, but foreign selling dominance is clear.',
  grid: [
    { icon:'🌐', big:'8.3T',      mid:'Weekly net sell',   sub:'Won terms' },
    { icon:'📉', big:'-1.79%',    mid:'KOSPI',             sub:'Index drop' },
    { icon:'🧊', big:'Chips',     mid:'Sell focus',        sub:'Large-cap heavy' },
    { icon:'🏦', big:'Banks',     mid:'Relative strength', sub:'Sector split' },
  ],
  ctx1: 'Post-Jackson Hole US rate and dollar expectations triggered foreign repositioning',
  ctx2: 'Watch whether FX, flows, and rates move together next week',
  quote: 'The 8.3T figure is a weekly accumulation, not necessarily one-day panic. When selling clusters in large chips, the index falls harder while rate beneficiaries like banks can hold up.',
  noteSub: 'Flows matter for who sold, not just direction. ETF, hedge, and rebalance flows mix in—do not treat one weekly total as a trend. Track foreign net buying turns alongside the exchange rate.',
  footer: 'Flows · weekly foreign',
});

/* ══════════════════════════ 안전자산 · 5 ══════════════════════════ */

add('summary-safe', 'ROWS', 'MACRO', {
  headline: '2026.08.31 안전자산 한장 요약',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'BTC',  title:'비트코인이 약 78,128달러 부근에서 거래됐습니다',
      sub:'금리·달러 변수 속에서 7만 8,000달러 선이 다시 지지·저항으로 작동합니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'ETH',  title:'이더리움이 약 2,459달러 수준입니다',
      sub:'비트코인보다 낙폭이 작은 날도 있었으나, 같은 거시 변수에 연동됩니다.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD', title:'금 현물이 온스당 약 4,635달러 부근입니다',
      sub:'실질금리·달러와의 관계를 다시 점검할 구간입니다.' },
    { color:'#94a3b8', fill:'#0f1419', right:'57.5%', title:'9월 금리 인상 확률이 여전히 높습니다',
      sub:'안전자산도 금리 경로를 따라 재가격됩니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SILV', title:'은 가격도 금과 함께 움직이는지 확인할 주입니다',
      sub:'귀금속 묶음 전체의 방향성을 봅니다.' },
  ],
  caption: '더 볼 것: BTC ~78128 · ETH ~2459 · gold ~4635 · Sept hike 57.5% · silver',
}, {
  headline: '2026.08.31 Safe-haven snapshot',
  rows: [
    { color:'#f7931a', fill:'#1a0f00', right:'BTC',  title:'Bitcoin traded near $78,128',
      sub:'The $78,000 area is again acting as support/resistance amid rate and dollar moves.' },
    { color:'#60a5fa', fill:'#0a1420', right:'ETH',  title:'Ethereum near $2,459',
      sub:'Sometimes falls less than bitcoin, but shares the same macro driver.' },
    { color:'#facc15', fill:'#1a1600', right:'GOLD', title:'Spot gold near $4,635/oz',
      sub:'Real rates and the dollar need another check.' },
    { color:'#94a3b8', fill:'#0f1419', right:'57.5%', title:'September hike odds stay elevated',
      sub:'Safe assets reprice with the rate path.' },
    { color:'#c084fc', fill:'#140b1f', right:'SILV', title:'Silver is part of the same precious-metals read',
      sub:'Watch the whole basket, not gold alone.' },
  ],
  caption: 'Also: BTC ~78128 · ETH ~2459 · gold ~4635 · 57.5% hike odds · silver',
});

add('btc-safe', 'L1', 'BTC', {
  badge: 'BTC',
  title: '비트코인이 약 78,128달러 부근에서 거래되며 7만 8,000달러 선을 다시 테스트하고 있습니다',
  heroIcon: '₿', heroBig: '~$78,128',
  heroSub: '금리 인상 기대와 달러 방향이 단기 가격을 좌우합니다. 이자를 주지 않는 자산은 금리가 오르면 상대 매력이 떨어집니다.',
  cards: [
    { icon:'📉', big:'$78K',      mid:'지지·저항',         sub:'심리적 가격대' },
    { icon:'📊', big:'57.5%',     mid:'9월 인상',          sub:'거시 변수' },
    { icon:'💧', big:'청산',      mid:'레버리지',          sub:'변동성 확대 요인' },
  ],
  quote: '78,000달러는 최근 몇 주 여러 번 등장한 가격대입니다. 비트코인은 배당·이자가 없어 금리가 오를수록 기회비용이 커집니다. 동시에 달러가 약하면 일부 매수는 유입될 수 있어, 금리·달러를 같이 봐야 합니다.',
  noteSub: 'BTC 투자에서는 「ETF 유입」과 「금리 경로」를 같은 화면에 두는 것이 좋습니다. 9월 4일 고용·9월 FOMC 전후로 7만 8,000달러가 깨지는지, 아니면 반등하는지가 다음 분기점입니다. 청산 규모도 함께 확인하시면 됩니다.',
  footer: 'BTC · 78K 테스트',
}, {
  badge: 'BTC',
  title: 'Bitcoin near $78,128 is retesting the $78,000 area again',
  heroIcon: '₿', heroBig: '~$78,128',
  heroSub: 'Rate hike expectations and the dollar drive near-term price. Non-yielding assets lose appeal when rates rise.',
  cards: [
    { icon:'📉', big:'$78K',      mid:'Support/resist',    sub:'Psychological band' },
    { icon:'📊', big:'57.5%',     mid:'Sept hike',         sub:'Macro driver' },
    { icon:'💧', big:'Liqs',      mid:'Leverage',          sub:'Volatility amplifier' },
  ],
  quote: '$78,000 has appeared several times in recent weeks. Bitcoin pays no yield, so higher rates raise opportunity cost. A weaker dollar can still bring buyers, so rates and FX must be read together.',
  noteSub: 'Keep ETF flows and the rate path on one screen. Around the Sept 4 jobs report and September FOMC, watch whether $78K breaks or holds. Track liquidation size alongside spot.',
  footer: 'BTC · $78K test',
});

add('gold-safe', 'L2', 'GOLD', {
  badge: 'GOLD',
  title: '금 현물이 온스당 약 4,635달러 부근에서 거래됩니다',
  heroIcon: '🥇', heroBig: '~$4,635',
  heroSub: '금은 이자를 주지 않지만, 실질금리·달러·지정학 리스크에 반응합니다. 최근 고점 대비 조정 구간입니다.',
  cards: [
    { label:'가격',   big:'$4,635',   mid:'온스당',            sub:'현물 기준' },
    { label:'변수',   big:'실질금리', mid:'기회비용',          sub:'금리와 반대로 움직이는 경우 많음' },
    { label:'달러',   big:'DXY',      mid:'역상관',            sub:'달러 약세는 금에 우호적' },
  ],
  detailHead: '금 가격을 읽는 세 줄',
  detailLines: [
    '📈 명목 금리가 오르면 금 매력이 줄 수 있습니다',
    '💵 달러가 약하면 금은 올라가기 쉽습니다',
    '🌍 지정학·신용 리스크는 단기 bid를 줍니다',
  ],
  noteSub: '금은 「인플레이 헤지」와 「무이자 자산」 두 성격이 공존합니다. 이번처럼 금리 기대가 올라가는 구간에서는 조정이 나올 수 있습니다. 4,600달러·4,700달러 구간에서 지지·저항을 확인하시면 됩니다.',
  footer: 'GOLD · 4635',
}, {
  badge: 'GOLD',
  title: 'Spot gold trades near $4,635 an ounce',
  heroIcon: '🥇', heroBig: '~$4,635',
  heroSub: 'Gold pays no yield but responds to real rates, the dollar, and geopolitics. This is a pullback zone from recent highs.',
  cards: [
    { label:'Price',  big:'$4,635',   mid:'Per ounce',         sub:'Spot reference' },
    { label:'Driver', big:'Real rates', mid:'Opportunity cost', sub:'Often inverse to gold' },
    { label:'FX',     big:'DXY',      mid:'Inverse link',      sub:'Weaker dollar helps gold' },
  ],
  detailHead: 'Three lines for gold',
  detailLines: [
    '📈 Higher nominal rates can reduce gold appeal',
    '💵 A weaker dollar tends to lift gold',
    '🌍 Geopolitical and credit shocks add bids',
  ],
  noteSub: 'Gold mixes inflation-hedge and zero-yield roles. When rate expectations rise, pullbacks are normal. Watch support and resistance around $4,600 and $4,700.',
  footer: 'GOLD · 4635',
});

add('eth-safe', 'L3', 'BTC', {
  badge: 'ETH',
  title: '이더리움이 약 2,459달러로 비트코인과 같은 거시 변수에 연동해 움직입니다',
  heroIcon: '⟠', heroBig: '~$2,459',
  heroSub: '비트코인 대비 베타가 다를 수 있지만, 금리·달러 shock에는 같이 반응하는 날이 많습니다.',
  cards: [
    { icon:'⟠', big:'$2,459',    mid:'ETH 가격',          sub:'알트 중 대표' },
    { icon:'₿', big:'BTC 연동',  mid:'상관관계',          sub:'같은 거시 변수' },
    { icon:'📊', big:'57.5%',     mid:'금리 odds',         sub:'9월 FOMC' },
  ],
  quote: '이더리움은 스마트 계약 플랫폼으로, 비트코인과 다른 수요가 있지만 단기 가격은 ETF·금리·달러에 크게 좌우됩니다. 2,500달러 선은 심리적 기준으로 자주 등장합니다.',
  noteSub: 'ETH-only 포지션도 BTC 금리 민감도를 무시할 수 없습니다. 스테이킹 수익·가스비·L2 성장은 중기 변수, 금리는 단기 변수입니다. 2,400~2,500달러 박스권 이탈 방향을 FOMC 전후로 보시면 됩니다.',
  footer: 'ETH · 2459',
}, {
  badge: 'ETH',
  title: 'Ethereum near $2,459 moves with the same macro drivers as bitcoin',
  heroIcon: '⟠', heroBig: '~$2,459',
  heroSub: 'Beta differs from bitcoin, but rate and dollar shocks often hit both.',
  cards: [
    { icon:'⟠', big:'$2,459',    mid:'ETH price',         sub:'Major alt benchmark' },
    { icon:'₿', big:'BTC link',  mid:'Correlation',       sub:'Shared macro driver' },
    { icon:'📊', big:'57.5%',     mid:'Rate odds',         sub:'September FOMC' },
  ],
  quote: 'Ethereum is a smart-contract platform with its own demand, but near-term price still tracks ETF, rate, and dollar moves. The $2,500 line is a recurring psychological marker.',
  noteSub: 'ETH-only positions still carry bitcoin-style rate sensitivity. Staking yield, gas, and L2 growth are medium-term; rates are near-term. Watch the $2,400-2,500 box into FOMC.',
  footer: 'ETH · 2459',
});

add('silver-safe', 'L1', 'GOLD', {
  badge: 'GOLD',
  title: '은 가격이 금과 함께 움직이며 산업·투자 수요가 겹치는 자산으로 부각됐습니다',
  heroIcon: '🥈', heroBig: 'Silver',
  heroSub: '은은 금보다 산업 수요 비중이 커서, 경기·태양광·전자 수요와도 연결됩니다.',
  cards: [
    { icon:'🏭', big:'산업',      mid:'태양광·전자',       sub:'실물 수요' },
    { icon:'🥇', big:'금 연동',   mid:'귀금속 묶음',     sub:'투자·헤지 수요' },
    { icon:'📈', big:'변동성',    mid:'금 대비',           sub:'베타가 더 큰 편' },
  ],
  quote: '은은 「작은 금」이면서 동시에 산업 금속입니다. 금이 오를 때 따라오지만, 경기 둔화 우려가 커지면 산업 수요 때문에 금보다 약할 수도 있습니다. 금·은 비율(gold/silver ratio)도 투자자들이 봅니다.',
  noteSub: '안전자산 포트폴리오에서 은은 금의 보완재입니다. 금리·달러 shock에는 금과 같이 움직이지만, 경기 지표에는 더 민감합니다. 금/은 비율과 태양광 설치량을 함께 추적하시면 됩니다.',
  footer: 'GOLD · 은',
}, {
  badge: 'GOLD',
  title: 'Silver is in focus as a precious metal with both industrial and investment demand',
  heroIcon: '🥈', heroBig: 'Silver',
  heroSub: 'Silver has more industrial use than gold, linking it to growth, solar, and electronics.',
  cards: [
    { icon:'🏭', big:'Industry',  mid:'Solar/electronics', sub:'Physical demand' },
    { icon:'🥇', big:'Gold link', mid:'Precious basket',   sub:'Investment/hedge' },
    { icon:'📈', big:'Volatility', mid:'Vs gold',          sub:'Often higher beta' },
  ],
  quote: 'Silver is both a small gold and an industrial metal. It follows gold rallies but can lag when growth fears hit industrial demand. Investors also watch the gold/silver ratio.',
  noteSub: 'In a safe-asset sleeve, silver complements gold. It tracks rate and dollar shocks with gold but is more sensitive to growth data. Watch the gold/silver ratio and solar install trends.',
  footer: 'GOLD · silver',
});

/* ══════════════════════════ 한국부동산 · 4 ══════════════════════════ */

add('summary-krre', 'ROWS', 'POLICY', {
  headline: '2026.08.31 부동산 한장 요약',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'서울',  title:'서울 아파트 매매가격이 0.29% 올랐습니다',
      sub:'전주 0.22%보다 상승 폭이 커졌지만, 강남·서초는 3주 연속 내렸습니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'강남',  title:'강남구 -0.11%, 서초구 -0.05%로 하락이 이어졌습니다',
      sub:'세제개편 부담과 고가 주택 급매물이 겹친 구간입니다.' },
    { color:'#fb923c', fill:'#1a0d02', right:'중랑',  title:'중랑구 +0.56%로 외곽·강북 상승이 두드러졌습니다',
      sub:'강북 14개 구 평균 0.40%로 서울 평균을 웃돌았습니다.' },
    { color:'#fb923c', fill:'#1a0d02', right:'전세',  title:'서울 전세가격이 0.22% 올랐습니다',
      sub:'전주 0.19%에서 상승 폭이 확대됐습니다.' },
  ],
  caption: '더 볼 것: 서울 +0.29% · 강남 -0.11% · 중랑 +0.56% · 전세 +0.22% · 세제·공급',
}, {
  headline: '2026.08.31 Korea property snapshot',
  rows: [
    { color:'#a78bfa', fill:'#120b1f', right:'Seoul', title:'Seoul apartment prices rose 0.29%',
      sub:'Up from 0.22% last week, but Gangnam and Seocho fell for a third week.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'Gangnam', title:'Gangnam -0.11%, Seocho -0.05%',
      sub:'Tax reform pressure and high-end forced sales overlap.' },
    { color:'#fb923c', fill:'#1a0d02', right:'Jungnang', title:'Jungnang +0.56% led outer/northern Seoul',
      sub:'Northern 14 districts averaged 0.40%, above city average.' },
    { color:'#fb923c', fill:'#1a0d02', right:'Jeonse', title:'Seoul jeonse rose 0.22%',
      sub:'Up from 0.19% the prior week.' },
  ],
  caption: 'Also: Seoul +0.29% · Gangnam -0.11% · Jungnang +0.56% · jeonse +0.22%',
});

add('gangnam-decline', 'L5', 'POLICY', {
  badge: 'POLICY',
  title: '강남·서초 아파트값이 3주 연속 내렸고 세제개편 부담이 고가 주택 시장을 누르고 있습니다',
  heroIcon: '🏙️', heroBig: '3주 연속 ↓',
  heroSub: '강남구 -0.11%, 서초구 -0.05%. 고가 주택 보유·거래세 부담이 매매 심리를 위축시킵니다.',
  before: { label:'강남권 과열', big:'상승', sub:'고가 주택 중심 상승' },
  after:  { label:'세제·급매',   big:'하락', sub:'3주 연속 조정' },
  cards: [
    { icon:'📉', big:'-0.11%',    mid:'강남구',            sub:'낙폭 확대' },
    { icon:'📉', big:'-0.05%',    mid:'서초구',            sub:'3주 연속' },
    { icon:'⚖️', big:'세제',      mid:'보유·거래세',       sub:'정책 변수' },
  ],
  quote: '같은 서울 안에서도 강남·서초와 중랑·강북의 방향이 갈립니다. 세제개편은 「모든 집값」이 아니라 「고가 주택」부터 영향을 줍니다. 급매물이 늘면 단기 가격은 더 빨리 내려갈 수 있습니다.',
  noteSub: '부동산은 평균 가격 한 줄로 읽으면 안 됩니다. 강남 하락은 정책·세금 shock, 외곽 상승은 가격 부담 이동입니다. 다음 주 강남 하락 폭과 거래량을 같이 보시면 「급매 vs 실수요」를 구분할 수 있습니다.',
  footer: 'POLICY · 강남 하락',
}, {
  badge: 'POLICY',
  title: 'Gangnam and Seocho fell for a third week as tax reform weighs on high-end housing',
  heroIcon: '🏙️', heroBig: '3-week drop',
  heroSub: 'Gangnam -0.11%, Seocho -0.05%. Holding and transaction tax pressure is chilling high-end sentiment.',
  before: { label:'Gangnam heat', big:'Up', sub:'High-end led gains' },
  after:  { label:'Tax/forced',   big:'Down', sub:'Third weekly fall' },
  cards: [
    { icon:'📉', big:'-0.11%',    mid:'Gangnam',           sub:'Decline widened' },
    { icon:'📉', big:'-0.05%',    mid:'Seocho',            sub:'Third week down' },
    { icon:'⚖️', big:'Tax',       mid:'Hold/transaction',  sub:'Policy variable' },
  ],
  quote: 'Within Seoul, Gangnam/Seocho and Jungnang/northern districts diverge. Tax reform hits expensive homes first, not every price tier. More forced sales can pull prices down faster near term.',
  noteSub: 'Property cannot be read from one city average. Gangnam weakness is tax shock; outer gains are affordability migration. Watch Gangnam declines with transaction volume to split forced sales from organic demand.',
  footer: 'POLICY · Gangnam decline',
});

add('outer-seoul-surge', 'L6', 'JEONSE', {
  badge: 'JEONSE', breaking: '외곽·강북 상승',
  title: '중랑구 +0.56% 등 외곽·강북 아파트값 상승이 서울 평균을 이끌었습니다',
  heroBig: '+0.56%',
  heroSub: '강북 14개 구 평균 0.40%. 고가 부담이 낮은 지역으로 수요가 이동하는 그림입니다.',
  grid: [
    { icon:'📈', big:'+0.56%',    mid:'중랑구',            sub:'주간 최대 상승' },
    { icon:'🏘️', big:'0.40%',     mid:'강북 14구',         sub:'평균 상승' },
    { icon:'🏙️', big:'0.29%',     mid:'서울 전체',         sub:'평균 상승' },
    { icon:'📉', big:'0.03%',     mid:'동남권',            sub:'강남권 약세' },
  ],
  ctx1: '강남·서초·송파·강동(동남권)은 0.03%에 그쳐 고가권과 외곽이 갈렸습니다',
  ctx2: '전세 0.22% 상승과 겹치면 실수요가 외곽으로 이동 중일 수 있습니다',
  quote: '서울 평균 0.29%는 「모든 구가 올랐다」가 아닙니다. 중랑·성북·강북·노원 등 강북·외곽이 끌어올린 평균입니다. 강남권 약세와 함께 보면 가격대별 로테이션입니다.',
  noteSub: '외곽 상승은 「서울 전체 과열」과 「강남 디스카운트」가 동시에 있다는 뜻입니다. 전세·매매 gap, 대출 규제, 급매물 수를 구별별로 추적하시면 됩니다. 정책이 고가만 겨냥하면 이 패턴은 이어질 수 있습니다.',
  footer: 'JEONSE · 외곽 상승',
}, {
  badge: 'JEONSE', breaking: 'OUTER SEOUL SURGE',
  title: 'Outer and northern Seoul led the city average, with Jungnang up 0.56%',
  heroBig: '+0.56%',
  heroSub: 'Northern 14 districts averaged 0.40%. Demand is shifting to lower-price areas.',
  grid: [
    { icon:'📈', big:'+0.56%',    mid:'Jungnang',          sub:'Top weekly gain' },
    { icon:'🏘️', big:'0.40%',     mid:'North 14',          sub:'Average gain' },
    { icon:'🏙️', big:'0.29%',     mid:'All Seoul',         sub:'City average' },
    { icon:'📉', big:'0.03%',     mid:'Southeast',         sub:'Gangnam weak' },
  ],
  ctx1: 'Southeast districts (Gangnam, Seocho, Songpa, Gangdong) rose only 0.03%',
  ctx2: 'With jeonse up 0.22%, real demand may be moving outward',
  quote: 'Seoul\'s 0.29% average does not mean every district rose. Northern and outer districts pulled the mean while Gangnam softened—a price-tier rotation.',
  noteSub: 'Outer gains coexist with Gangnam discount, not pure city-wide heat. Track jeonse/sale gaps, loan rules, and forced-sale counts by district. If policy stays targeted at high-end homes, the pattern can persist.',
  footer: 'JEONSE · outer Seoul surge',
});

add('jeonse-rise', 'L2', 'JEONSE', {
  badge: 'JEONSE',
  title: '서울 전세가격이 0.22% 올라 전주 0.19%보다 상승 폭이 커졌습니다',
  heroIcon: '🏠', heroBig: '+0.22%',
  heroSub: '매매가격 상승 지역과 겹치는 구간에서 전세도 같이 오르는 패턴입니다. 전세 물량 부족 변수도 남아 있습니다.',
  cards: [
    { label:'서울',   big:'+0.22%',   mid:'전세',              sub:'전주 0.19%→0.22%' },
    { label:'경기',   big:'+0.19%',   mid:'수도권',            sub:'함께 상승' },
    { label:'매매',   big:'+0.29%',   mid:'서울 매매',         sub:'전세·매매 동반' },
  ],
  detailHead: '전세가 왜 오르는가',
  detailLines: [
    '🏠 전세 물건 감소는 보증금 상승 압력을 줍니다',
    '📈 매매가 오른 지역은 전세도 연동됩니다',
    '⚖️ 세제·대출 규제는 전세·매매 선택에 영향',
  ],
  noteSub: '전세 0.22%는 「임대료 폭등」이 아니라 「보증금 기대값 조정」에 가깝습니다. 전세→월세 전환, 안심신탁 등 정책과 함께 봐야 합니다. 전세가율(매매 대비 전세 비율)을 구별별로 추적하시면 됩니다.',
  footer: 'JEONSE · 0.22%',
}, {
  badge: 'JEONSE',
  title: 'Seoul jeonse prices rose 0.22%, up from 0.19% the prior week',
  heroIcon: '🏠', heroBig: '+0.22%',
  heroSub: 'Where sale prices rise, jeonse often follows. Supply shortage remains a variable.',
  cards: [
    { label:'Seoul',  big:'+0.22%',   mid:'Jeonse',            sub:'0.19% → 0.22%' },
    { label:'Gyeonggi', big:'+0.19%', mid:'Metro',             sub:'Rose together' },
    { label:'Sale',   big:'+0.29%',   mid:'Seoul sale',        sub:'Both moving up' },
  ],
  detailHead: 'Why jeonse rises',
  detailLines: [
    '🏠 Fewer jeonse listings push deposits higher',
    '📈 Rising sale prices drag jeonse in same areas',
    '⚖️ Tax and loan rules affect lease choice',
  ],
  noteSub: 'A 0.22% jeonse move is deposit expectation adjusting, not a rent spike. Read it with jeonse-to-wolse shifts and policy programs like safe-trust leases. Track jeonse-to-price ratios by district.',
  footer: 'JEONSE · 0.22%',
});

};
