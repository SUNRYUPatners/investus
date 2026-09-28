// 2026-09-29 SVG topic data — screenshot facts, beginner Korean
// Layout mix: ROWS×1 L1×2 L2×1 L3×1 L4×1 L5×1 L6×1 (총 8)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.29 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'첫 궤도', title:'스타십 14번째 비행이 첫 궤도에 들어간 뒤 하와이 북쪽 태평양에 떨어졌습니다',
      sub:'함선 41호기입니다. 스타링크 3세대 26기를 전개했고 연락이 전부 붙었습니다.' },
    { color:'#a78bfa', fill:'#180f28', right:'26 Tbps', title:'이번 발사가 스타링크 내려받기 용량 약 26테라비트를 한 번에 올렸다는 화면이 있습니다',
      sub:'3세대 한 대는 약 1테라비트입니다. 팰컨9 2세대 미니의 약 열 배로 적혔습니다.' },
    { color:'#4ade80', fill:'#061209', right:'FSD', title:'아랍에미리트가 테슬라 감독 완전자율주행 검증을 규제 실험실에 올렸습니다',
      sub:'두바이 모빌리티 랩은 248개 시나리오입니다. 통과 숫자가 아닙니다.' },
    { color:'#22c55e', fill:'#0a1a0a', right:'+0.50%p', title:'미국 테슬라 할부 이율이 트림마다 0.50%포인트 올랐다는 표가 떴습니다',
      sub:'모델3 프리미엄은 2.49%, 모델Y 베이스·프리미엄은 1.99%입니다.' },
    { color:'#fb7185', fill:'#1a0a10', right:'10/15', title:'로드스터 행사가 심한 날씨 때문에 10월 15일로 미뤄졌습니다',
      sub:'야외 행사이고 원래는 10월 1일이었습니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'48.1', title:'미국 9월 소비심리 최종치가 48.1로 찍혔습니다',
      sub:'8월 51.7, 지난해 같은 달 55.1입니다. 현재 50.9, 기대 46.3입니다.' },
  ],
  caption: '더 볼 것: 첫 궤도 · 26기 · 아랍에미리트 검증 · 할부 +0.50%p · 로드스터 10/15 · 심리 48.1',
}, {
  headline: '2026.09.29 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'Orbit', title:'Starship Flight 14 reached a first orbit, then splashed north of Hawaii',
      sub:'Ship 41. Twenty-six Starlink V3s deployed, and contact held on all 26.' },
    { color:'#a78bfa', fill:'#180f28', right:'26 Tbps', title:'The flight was said to add about 26 terabits of Starlink downlink at once',
      sub:'Each V3 is about 1 Tbps. About ten times a Falcon 9 V2 Mini.' },
    { color:'#4ade80', fill:'#061209', right:'FSD', title:'The UAE listed Tesla FSD Supervised validation in its regulatory lab',
      sub:'Dubai Mobility Labs listed 248 scenarios. That is not a pass count.' },
    { color:'#22c55e', fill:'#0a1a0a', right:'+50 bps', title:'U.S. Tesla APR rose 0.50 percentage points on several trims',
      sub:'Model 3 Premium 2.49%. Model Y Base and Premium 1.99%.' },
    { color:'#fb7185', fill:'#1a0a10', right:'Oct 15', title:'The Roadster event moved to October 15 after severe weather',
      sub:'It is outdoors. It had been October 1.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'48.1', title:'Final September U.S. consumer sentiment printed 48.1',
      sub:'August 51.7, a year ago 55.1. Current 50.9, expectations 46.3.' },
  ],
  caption: 'Watch: first orbit · 26 sats · UAE validation · APR +50bps · Roadster Oct 15 · 48.1',
});

add('starship-f14', 'L6', 'SPCX', {
  badge: '스페이스X', title: '스타십 14번째 비행이 첫 궤도에 들어간 뒤 하와이 북쪽 태평양에 떨어졌습니다',
  breaking: '첫 궤도 · Ship 41',
  heroBig: 'Flight 14', heroSub: '스타베이스에서 동부 오전 약 8시 48분에 올랐습니다. 함선 41호기가 고도 약 275킬로미터 궤도에 남았습니다.',
  grid: [
    { icon:'🚀', big:'T+26분', mid:'궤도 진입', sub:'고도 약 275km입니다' },
    { icon:'🛰️', big:'26기', mid:'스타링크 3세대', sub:'연락이 전부 붙었습니다' },
    { icon:'🌊', big:'걸프', mid:'부스터 해상 착수', sub:'33기 중 31기가 재점화했습니다' },
    { icon:'🕐', big:'11:57', mid:'태평양 착수', sub:'동부 오전, 하와이 북쪽입니다' },
  ],
  ctx1: '함선 엔진 6기 중 1기가 꺼졌고, 재진입은 엔진 하나로 했습니다. 임무는 약 10시간에서 약 3시간 8분으로 줄었습니다.',
  ctx2: '텔레메트리는 시속 2만 6,403킬로미터, 고도 269킬로미터, T+00:52:06, S41로 찍혔습니다.',
  quote: '처음으로 한 바퀴를 돌고 계획된 해상 착수로 끝낸 비행입니다. 다음 발사가 습관이 되면 매출 칸이 두꺼워집니다.',
  noteHead: '왜 중요한가', noteSub: '시험이 궤도에 남으면 스타십이 돈을 버는 로켓에 한 칸 다가갑니다. 다음에 볼 것은 다음 발사 창과 위성 상태입니다.',
  footer: '스페이스X · 스타십 14',
}, {
  badge: 'SPCX', title: 'Starship Flight 14 reached a first orbit, then splashed north of Hawaii',
  breaking: 'First orbit · Ship 41',
  heroBig: 'Flight 14', heroSub: 'It left Starbase near 8:48 a.m. ET. Ship 41 stayed in an orbit near 275 km.',
  grid: [
    { icon:'🚀', big:'T+26m', mid:'Orbit', sub:'Altitude about 275 km' },
    { icon:'🛰️', big:'26', mid:'Starlink V3', sub:'Contact on all 26' },
    { icon:'🌊', big:'Gulf', mid:'Booster splash', sub:'31 of 33 Raptors relit' },
    { icon:'🕐', big:'11:57', mid:'Pacific splash', sub:'ET, north of Hawaii' },
  ],
  ctx1: 'One of six ship engines was out. Deorbit used one engine. The mission was cut from about 10 hours to about 3 hours 8 minutes.',
  ctx2: 'Telemetry printed 26,403 km/h, 269 km altitude, T+00:52:06, S41.',
  quote: 'It is the first loop then a planned ocean splash. The next launch would thicken the sales lane.',
  noteHead: 'Why it matters', noteSub: 'A test that stays in orbit moves Starship toward a revenue rocket. Next, watch the next window and satellite health.',
  footer: 'SpaceX · Starship 14',
});

add('starlink-v3-26', 'L1', 'SPCX', {
  badge: '스페이스X', title: '스타링크 3세대 26기가 한 비행에서 전개됐고 기당 내려받기 약 1테라비트로 적혔습니다',
  heroIcon: '📡', heroBig: '26 Tbps',
  heroSub: '화면은 이번 발사가 약 26테라비트 용량을 한 번에 올렸다고 적었습니다. 연락이 26기 모두에 붙었습니다.',
  cards: [
    { icon:'📶', big:'1 Tbps', mid:'3세대 한 대의 내려받기입니다', sub:'2세대 미니보다 훨씬 굵습니다' },
    { icon:'📈', big:'10배', mid:'팰컨9 2세대 미니 한 발과 비교입니다', sub:'회사 설명이 화면에 붙었습니다' },
    { icon:'🚀', big:'60기', mid:'앞으로 한 번에 60대를 올리는 그림입니다', sub:'그때는 팰컨9의 약 20배로 적혔습니다' },
  ],
  quote: '한 시간이 예전의 1년 반 용량을 넘는다는 설명이 같은 묶음에 있었습니다. 누적 용량 차트는 2019년부터 2024년까지 약 330테라비트로 보였습니다.',
  noteHead: '왜 중요한가', noteSub: '위성이 두꺼워지면 인터넷 매출이 로켓 원가를 받칩니다. 다음에 볼 것은 다음 3세대 발사와 실제 가입 속도입니다.',
  footer: '스페이스X · 스타링크 3세대',
}, {
  badge: 'SPCX', title: 'Twenty-six Starlink V3s deployed on one flight, listed at about 1 Tbps downlink each',
  heroIcon: '📡', heroBig: '26 Tbps',
  heroSub: 'The screen said this launch added about 26 terabits at once. Contact held on all 26.',
  cards: [
    { icon:'📶', big:'1 Tbps', mid:'Downlink per V3', sub:'Far thicker than V2 Mini' },
    { icon:'📈', big:'10×', mid:'Versus one Falcon 9 V2 Mini flight', sub:'Company copy sat on the screen' },
    { icon:'🚀', big:'60', mid:'A future stack of 60 on one flight', sub:'Then about 20× Falcon 9' },
  ],
  quote: 'One hour was said to beat the first year and a half of capacity. A cumulative chart ran near 330 Tbps from 2019 through 2024.',
  noteHead: 'Why it matters', noteSub: 'Thicker satellites let internet sales pay for the rocket. Next, watch the next V3 flight and actual subscriber pace.',
  footer: 'SpaceX · Starlink V3',
});

add('tsla-uae-fsd', 'L2', 'TSLA', {
  badge: '테슬라', title: '아랍에미리트가 테슬라 감독 완전자율주행 검증을 규제 실험실 목록에 올렸습니다',
  heroIcon: '🚗', heroBig: 'FSD',
  heroSub: '내각 화면은 Tesla Motors, FSD (Supervised) validation이라고 적었습니다. 목표는 제품 출시를 위한 적응과 검증입니다.',
  cards: [
    { label:'시나리오', big:'248', mid:'두바이 모빌리티 랩 숫자입니다', sub:'통제 도로와 일반 도로를 섞습니다' },
    { label:'단계', big:'검증', mid:'현지화 다음이 검증입니다', sub:'무인 로보택시 허가가 아닙니다' },
    { label:'2030', big:'25%', mid:'두바이 여정의 자율 목표입니다', sub:'나라 목표이지 오늘 실적 아닙니다' },
  ],
  detailHead: '화면이 말해 주는 것',
  detailLines: [
    '신경망이 수십억 마일을 학습했다는 설명이 붙었습니다',
    '테슬라는 첫 시험 그룹에 들어 있습니다',
    '248은 통과 건수가 아닙니다',
  ],
  quote: '감독 완전자율주행은 운전자가 자리에 있는 보조입니다. 오늘 화면은 그 기능을 그 나라 도로에 맞춰 보겠다는 검증입니다.',
  noteHead: '왜 중요한가', noteSub: '중동 허가가 열리면 소프트웨어 구독이 한 나라를 더 탑니다. 다음에 볼 것은 제품 출시 공고와 실제 주행 허가입니다.',
  footer: '테슬라 · 아랍에미리트 FSD',
}, {
  badge: 'TSLA', title: 'The UAE listed Tesla FSD Supervised validation in its regulatory lab',
  heroIcon: '🚗', heroBig: 'FSD',
  heroSub: 'A cabinet page named Tesla Motors and FSD (Supervised) validation. The aim is adapt-and-validate for a product release.',
  cards: [
    { label:'Scenarios', big:'248', mid:'Dubai Mobility Labs figure', sub:'Controlled plus public roads' },
    { label:'Stage', big:'Validate', mid:'After localization', sub:'Not an unsupervised robotaxi permit' },
    { label:'2030', big:'25%', mid:'Dubai autonomous-journey goal', sub:'A city target, not today’s result' },
  ],
  detailHead: 'What the screen says',
  detailLines: [
    'Copy cited neural nets trained on billions of miles',
    'Tesla is among the first trial group',
    '248 is not a pass count',
  ],
  quote: 'Supervised FSD still needs a driver in the seat. Today’s screen is a check that the feature fits local roads.',
  noteHead: 'Why it matters', noteSub: 'A Gulf permit would let software subscriptions ride another country. Next, watch a product-release notice and real driving permits.',
  footer: 'Tesla · UAE FSD',
});

add('tsla-apr-hike', 'L5', 'TSLA', {
  badge: '테슬라', title: '미국 테슬라 할부 이율이 트림마다 0.50%포인트 올랐다는 표가 떴습니다',
  heroIcon: '💳', heroBig: '+0.50%p',
  heroSub: '연이율은 빌린 돈에 붙는 한 해 이자입니다. 화면 표는 프로모가 9월 30일 전후까지라고 적었습니다.',
  before: { label: '모델3 프리미엄 이율', big: '1.99%', sub:'후륜·사륜 모두 출발점이었습니다' },
  after: { label: '올린 뒤', big: '2.49%', sub:'같은 트림이 0.50%포인트 올랐습니다' },
  cards: [
    { icon:'🚗', big:'1.99%', mid:'모델Y 베이스 후륜·사륜입니다', sub:'1.49%에서 올라왔습니다' },
    { icon:'✨', big:'1.99%', mid:'모델Y 프리미엄 후륜·사륜입니다', sub:'같은 폭으로 올랐습니다' },
    { icon:'📅', big:'9/30', mid:'프로모 만료가 거론된 날입니다', sub:'다른 트림은 그대로라는 줄이 있습니다' },
  ],
  quote: '이율이 오르면 월 할부가 조금 커집니다. 재고를 비우는 할인이 조금씩 걷히는 신호입니다.',
  noteHead: '왜 중요한가', noteSub: '할부가 비싸지면 주문 속도가 한 박자 늦을 수 있습니다. 다음에 볼 것은 10월 프로모와 3분기 인도입니다.',
  footer: '테슬라 · 미국 할부',
}, {
  badge: 'TSLA', title: 'U.S. Tesla APR rose 0.50 percentage points on several trims',
  heroIcon: '💳', heroBig: '+50 bps',
  heroSub: 'APR is the yearly interest on a loan. The table put the promo through about September 30.',
  before: { label: 'Model 3 Premium APR', big: '1.99%', sub:'RWD and AWD started here' },
  after: { label: 'After the lift', big: '2.49%', sub:'The same trims moved 50 basis points' },
  cards: [
    { icon:'🚗', big:'1.99%', mid:'Model Y Base RWD and AWD', sub:'Up from 1.49%' },
    { icon:'✨', big:'1.99%', mid:'Model Y Premium RWD and AWD', sub:'The same 50-basis-point step' },
    { icon:'📅', big:'Sep 30', mid:'The promo end date on the table', sub:'Other trims were listed as unchanged' },
  ],
  quote: 'A higher APR lifts the monthly payment a little. It is a sign the clearance discount is being walked back.',
  noteHead: 'Why it matters', noteSub: 'Dearer loans can slow orders by a beat. Next, watch the October promo and Q3 deliveries.',
  footer: 'Tesla · U.S. APR',
});

add('tsla-roadster-oct15', 'L3', 'TSLA', {
  badge: '테슬라', title: '로드스터 행사가 심한 날씨 때문에 10월 15일로 미뤄졌습니다',
  heroIcon: '🏎️', heroBig: '10/15',
  heroSub: '회사 화면은 Roadster event update라고 적었습니다. 야외 행사여서 악천후에 날짜를 옮겼습니다.',
  cards: [
    { icon:'📅', big:'10/1', mid:'원래 날짜입니다', sub:'텍사스 맥그리거·와코 일대입니다' },
    { icon:'🌧️', big:'야외', mid:'실내가 아니라 바깥입니다', sub:'심한 날씨가 이유입니다' },
    { icon:'🎟️', big:'15일', mid:'새 달력입니다', sub:'차 공개와 할부 표는 다른 줄입니다' },
  ],
  quote: '로드스터는 오래 미뤄진 스포츠카입니다. 날짜가 다시 잡히면 시제품이 무대에 오를 칸이 남습니다.',
  noteHead: '왜 중요한가', noteSub: '행사 달력이 있어야 영상과 예약 이야기가 다시 붙습니다. 다음에 볼 것은 15일 현장과 공개 스펙입니다.',
  footer: '테슬라 · 로드스터',
}, {
  badge: 'TSLA', title: 'The Roadster event moved to October 15 after severe weather',
  heroIcon: '🏎️', heroBig: 'Oct 15',
  heroSub: 'Tesla’s screen said Roadster event update. It is outdoors, so bad weather moved the date.',
  cards: [
    { icon:'📅', big:'Oct 1', mid:'The original date', sub:'McGregor / Waco, Texas' },
    { icon:'🌧️', big:'Outdoor', mid:'Not an indoor hall', sub:'Severe weather is the reason' },
    { icon:'🎟️', big:'15th', mid:'The new calendar', sub:'The car reveal is a different line from APR' },
  ],
  quote: 'The Roadster has slipped for years. A new date keeps a stage for a prototype.',
  noteHead: 'Why it matters', noteSub: 'A dated event lets video and reservations attach again. Next, watch the 15th site and published specs.',
  footer: 'Tesla · Roadster',
});

add('umich-sentiment-481', 'L4', 'MACRO', {
  badge: '금리', title: '미국 9월 소비심리 최종치가 48.1로 찍혔습니다',
  badgeLine: '미시간 · 최종',
  heroIcon: '📉', heroBig: '48.1',
  heroSub: '소비심리는 가계가 경기를 어떻게 느끼는지를 묻는 조사입니다. 화면은 8월 51.7, 지난해 9월 55.1과 나란히 적었습니다.',
  cards: [
    { icon:'🏠', big:'50.9', mid:'현재 상황 지수입니다', sub:'지금 살림살이를 묻는 칸입니다' },
    { icon:'🔭', big:'46.3', mid:'기대 지수입니다', sub:'앞으로를 묻는 칸입니다' },
    { icon:'🔥', big:'4.6%', mid:'1년 물가 기대입니다', sub:'가격·연료·무역이 이유로 붙었습니다' },
  ],
  quote: '예측 화면은 사상 두 번째로 낮다고 적었지만, 공식 설명은 넉 달 만에 가장 낮고 1월보다 15% 아래입니다. 확정 숫자는 48.1입니다.',
  noteHead: '왜 중요한가', noteSub: '가계가 움츠리면 소비 주와 금리 기대가 같이 흔들립니다. 다음에 볼 것은 10월 예비치와 물가 기대입니다.',
  footer: '매크로 · 소비심리 48.1',
}, {
  badge: 'RATES', title: 'Final September U.S. consumer sentiment printed 48.1',
  badgeLine: 'Michigan · final',
  heroIcon: '📉', heroBig: '48.1',
  heroSub: 'Sentiment asks households how they feel about the economy. The screen put August at 51.7 and last September at 55.1.',
  cards: [
    { icon:'🏠', big:'50.9', mid:'Current-conditions index', sub:'How life feels now' },
    { icon:'🔭', big:'46.3', mid:'Expectations index', sub:'How the path feels' },
    { icon:'🔥', big:'4.6%', mid:'One-year inflation expectation', sub:'Prices, fuel and trade were cited' },
  ],
  quote: 'A prediction screen said second-lowest ever. The official note is a four-month low, 15% below January. The locked number is 48.1.',
  noteHead: 'Why it matters', noteSub: 'If households pull back, consumer stocks and rate odds move together. Next, watch the October prelim and inflation expectations.',
  footer: 'Macro · sentiment 48.1',
});

add('gates-ai-nuclear', 'L1', 'AI', {
  badge: '인공지능', title: '빌 게이츠가 인공지능 세계 협력이 핵 협상보다 더 어렵다고 말했습니다',
  heroIcon: '🧠', heroBig: 'AI',
  heroSub: '화면 한 줄은 나라들이 인공지능을 같이 다루기가 핵무기 대화보다 더 어렵다는 발언입니다.',
  cards: [
    { icon:'☢️', big:'핵', mid:'비교 대상은 핵 군축 대화입니다', sub:'이미 오랜 국제 틀이 있습니다' },
    { icon:'🌐', big:'협력', mid:'국경을 넘는 규칙이 아직 얇습니다', sub:'모델과 칩이 여러 나라에 있습니다' },
    { icon:'💬', big:'발언', mid:'한 사람의 의견입니다', sub:'조약이 체결된 뉴스가 아닙니다' },
  ],
  quote: '핵은 국가가 숫자를 세는 무기고입니다. 인공지능은 회사와 연구실이 매일 모델을 내놓아서 합의 창이 더 좁아 보입니다.',
  noteHead: '왜 중요한가', noteSub: '규칙이 늦으면 큰 모델 회사의 자율이 먼저 갑니다. 다음에 볼 것은 수출 통제와 안전 평가 합의입니다.',
  footer: '인공지능 · 게이츠 발언',
}, {
  badge: 'AI', title: 'Bill Gates said global AI cooperation is harder than nuclear talks',
  heroIcon: '🧠', heroBig: 'AI',
  heroSub: 'One screen line said countries will find it harder to handle AI together than to talk about nuclear weapons.',
  cards: [
    { icon:'☢️', big:'Nuclear', mid:'The comparison is arms-control talks', sub:'Those already have a long framework' },
    { icon:'🌐', big:'Cooperation', mid:'Cross-border rules are still thin', sub:'Models and chips sit in many countries' },
    { icon:'💬', big:'Remark', mid:'One person’s view', sub:'Not a signed treaty' },
  ],
  quote: 'Nuclear stockpiles are counted by states. AI is shipped daily by labs, so the window for a deal looks narrower.',
  noteHead: 'Why it matters', noteSub: 'If rules lag, big-model firms set the pace first. Next, watch export controls and shared safety tests.',
  footer: 'AI · Gates remark',
});

};
