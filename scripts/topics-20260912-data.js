// 2026-09-12 SVG topic data — screenshot facts, beginner Korean, positive long view
// Layout mix: ROWS×1 L1×4 L2×3 L3×4 L4×3 L5×2 L6×1
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.12 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'9/18', title:'스타십 14번째 비행이 9월 18일 아침 창으로 잡혔습니다',
      sub:'7시 15분~9시 14분(중부시간)입니다. 첫 매출 비행에 스타링크 3세대를 싣습니다.' },
    { color:'#4ade80', fill:'#061209', right:'v15', title:'완전자율주행 15번이 위험 예측과 충돌 회피를 더 빨리 한다고 했습니다',
      sub:'감독 모드의 다음 큰 버전입니다. 일본은 올해 안이 최우선이라고 했습니다.' },
    { color:'#4ade80', fill:'#061209', right:'15대', title:'펜실베이니아 주차장에 사이버캡 15대가 나갈 준비를 했습니다',
      sub:'홍콩은 9월 9일 아시아 첫 전시, 다음은 도쿄입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'57.9%', title:'미국 집 매도자가 매수자보다 57.9% 많아 기록을 찍었습니다',
      sub:'8월 숫자입니다. 집값이 하루 57% 떨어진 것이 아닙니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'11.1억', title:'스페이스엑스가 12월부터 한 달 11억 1천만 달러 연산 계약을 시작한다고 했습니다',
      sub:'연으로는 133억 달러입니다. 12월 속도면 연 1,000억 궤도라고 했습니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'38GW', title:'마이크로소프트가 2032년 데이터센터 38기가와트를 목표로 적었습니다',
      sub:'지금은 약 12기가와트입니다. 엔비디아 사장은 인공지능을 새 전기에 비유했습니다.' },
    { color:'#4ade80', fill:'#061209', right:'0.25', title:'사이버캡 운임이 마일당 0.25달러로 그려졌고 플릿 구매 폼이 열렸습니다',
      sub:'감독 없는 마일 이 38만에서 100만으로 늘었습니다. 예측이지 오늘 요금이 아닙니다.' },
  ],
  caption: '더 볼 것: 9/18 발사 · FSD 15 · 캡 15대 · 주택 57.9% · 월 11.1억 · 38GW',
}, {
  headline: '2026.09.12 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'9/18', title:'Starship Flight 14 is set for the Sep 18 morning window',
      sub:'7:15–9:14 a.m. CDT. First revenue flight with V3 Starlinks.' },
    { color:'#4ade80', fill:'#061209', right:'v15', title:'FSD v15 was said to predict hazards earlier and avoid collisions better',
      sub:'Next supervised upgrade. Japan said 2026 is the top priority.' },
    { color:'#4ade80', fill:'#061209', right:'15', title:'Fifteen Cybercabs were ready to leave a Pennsylvania lot',
      sub:'Hong Kong debuted Sep 9; Tokyo is next.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'57.9%', title:'U.S. home sellers outnumbered buyers by 57.9%, a record',
      sub:'August print. Not a 57% one-day price crash.' },
    { color:'#c084fc', fill:'#140b1f', right:'$1.11B', title:'SpaceX said an AI compute deal starts at $1.11B a month on Dec 1',
      sub:'$13.3B annualized. December run-rate was framed as $100B ARR.' },
    { color:'#60a5fa', fill:'#06121f', right:'38GW', title:'Microsoft printed a 2032 data-center goal above 38 GW',
      sub:'About 12 GW now. NVIDIA’s CEO called AI the new electricity.' },
    { color:'#4ade80', fill:'#061209', right:'$0.25', title:'Cybercab was drawn at $0.25 a mile and a fleet-buyer form went live',
      sub:'Unsupervised miles 380k→1M. A forecast, not today’s fare.' },
  ],
  caption: 'Watch: Sep 18 · FSD v15 · 15 cabs · housing 57.9% · $1.11B/mo · 38 GW',
});

add('japan-fsd-2026', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라 일본 사장이 올해 안에 일본에서 완전자율주행을 먼저 켜는 것이 최우선이라고 했습니다',
  heroIcon: '🇯🇵', heroBig: '2026',
  heroSub: '사이버캡은 지금 팔리는 모델Y처럼 완전자율주행을 바탕으로 하므로 일본 출시가 먼 미래가 아니라고 했습니다. 최우선은 올해 안에 일본에서 이 소프트웨어를 켜는 일입니다.',
  cards: [
    { icon:'🛣', big:'FSD', mid:'감독 모드 먼저', sub:'운전자가 지켜보는 차로·감속' },
    { icon:'🚕', big:'캡', mid:'같은 소프트웨어', sub:'모델Y와 같은 바탕이라고 함' },
    { icon:'📅', big:'2026', mid:'올해 안 목표', sub:'허가와 요금표는 아직' },
  ],
  quote: '완전자율주행은 사람이 핸들 옆에 앉아 감독하는 소프트웨어입니다. 택시 차가 와도 소프트웨어가 먼저여야 길이 열립니다. 다음에 보면 좋은 것은 일본 허가 소식입니다.',
  noteSub: '일본은 골목과 표지판이 미국과 다릅니다. 나라에 맞게 다듬는 일이 출시의 핵심입니다. 앞으로 3~5년 큰 시장에서 구독이 켜지면 소프트웨어 매출이 쌓일 수 있습니다.',
  footer: '테슬라 · 일본 완전자율주행',
}, {
  badge: 'TSLA', title: 'Tesla Japan’s CEO said launching FSD in Japan in 2026 is the top priority',
  heroIcon: '🇯🇵', heroBig: '2026',
  heroSub: 'Cybercab sits on FSD like today’s Model Y, so a Japan rollout is not a distant future. The top priority is turning the software on in 2026.',
  cards: [
    { icon:'🛣', big:'FSD', mid:'Supervised first', sub:'Driver-watched lanes and braking' },
    { icon:'🚕', big:'Cab', mid:'Same software', sub:'Same base as Model Y, he said' },
    { icon:'📅', big:'2026', mid:'This-year goal', sub:'Permit and price list still ahead' },
  ],
  quote: 'FSD is driver-supervised software. A robotaxi still needs the software door open first. Next: a Japan permit notice.',
  noteSub: 'Japan streets and signs differ from the U.S. Localization is the launch. Over 3–5 years a paid subscription in a large market can grow software revenue.',
  footer: 'TSLA · Japan FSD',
});

add('starship-vs-newglenn', 'L5', 'SPCX', {
  badge: 'SPCX', title: '스타십 3세대가 높이 124미터·추력 80.90메가뉴턴으로 뉴글렌과 비교됐습니다',
  heroIcon: '🚀', heroBig: '124m',
  heroSub: '화면에 뉴글렌과 스타십이 나란히 있습니다. 스타십은 1.27배 더 높고, 단면적당 추력은 2.44배입니다.',
  before: { label:'뉴글렌', big:'98m', sub:'추력 19.93메가뉴턴' },
  after: { label:'스타십', big:'124m', sub:'추력 80.90메가뉴턴' },
  cards: [
    { icon:'📏', big:'9m', mid:'스타십 지름', sub:'뉴글렌은 7미터' },
    { icon:'🔥', big:'33기', mid:'랩터 3', sub:'뉴글렌은 BE-4 일곱 개' },
    { icon:'⚖️', big:'1.56', mid:'무게 대비 추력', sub:'뉴글렌은 약 1.27' },
  ],
  quote: '메가뉴턴은 땅을 밀어내는 힘입니다. 80.90과 19.93은 한 장의 스펙 비교입니다. 다음에 보면 좋은 것은 9월 18일 점화입니다.',
  noteSub: '큰 로켓이 자주 재사용되면 위성 운임이 내려갑니다. 오늘은 숫자가 한 장에 정리된 날입니다. 앞으로 3~5년 발사가 잦아지면 통신과 궤도 화물이 더 싸질 수 있습니다.',
  footer: '스페이스X · 스타십 대 뉴글렌',
}, {
  badge: 'SPCX', title: 'Starship V3 printed 124 m and 80.90 MN next to New Glenn',
  heroIcon: '🚀', heroBig: '124m',
  heroSub: 'The screen stood New Glenn beside Starship. Starship is 1.27× taller and 2.44× on thrust per area.',
  before: { label:'New Glenn', big:'98m', sub:'19.93 MN liftoff' },
  after: { label:'Starship', big:'124m', sub:'80.90 MN liftoff' },
  cards: [
    { icon:'📏', big:'9m', mid:'Starship diameter', sub:'New Glenn is 7 m' },
    { icon:'🔥', big:'33', mid:'Raptor 3', sub:'New Glenn uses seven BE-4s' },
    { icon:'⚖️', big:'1.56', mid:'Thrust to weight', sub:'New Glenn about 1.27' },
  ],
  quote: 'Meganewtons are push against the ground. 80.90 vs 19.93 is a spec sheet, not a score. Next: the Sep 18 ignition.',
  noteSub: 'Reusable heavy lift can pull satellite fares down. Today is the side-by-side print. Over 3–5 years higher cadence can cheapen comms and cargo.',
  footer: 'SPCX · Starship vs New Glenn',
});

add('starship-f14-sep18', 'L6', 'SPCX', {
  badge: 'BREAKING', breaking: '스타십 비행 14',
  title: '스타십 14번째 비행이 9월 18일 아침 창으로 잡혔고 첫 매출 비행에 스타링크 3세대를 싣습니다',
  heroBig: '9/18',
  heroSub: '텍사스 스타베이스, 아침 7시 15분~9시 14분(중부시간)입니다. 예비 창은 19일 같은 시각입니다. 돈을 받는 첫 비행이며 양산 스타링크 3세대를 싣습니다.',
  grid: [
    { icon:'🗓', big:'9/18', mid:'기본 창', sub:'중부 7:15–9:14' },
    { icon:'🗓', big:'9/19', mid:'예비 창', sub:'같은 시각' },
    { icon:'📡', big:'V3', mid:'스타링크', sub:'양산 위성 화물' },
    { icon:'💵', big:'매출', mid:'첫 유료 비행', sub:'시험이 아닌 손님 짐' },
  ],
  ctx1: '세계시로는 12시 15분부터 14시 14분입니다. 목표 궤도에 따라 시각이 달라질 수 있습니다.',
  ctx2: '15번째용 부스터 22와 우주선 42는 이미 극저온 시험을 마쳤습니다.',
  quote: '매출 비행은 보험과 손님이 붙는 단계입니다. 스타링크 3세대는 큰 화물칸이 필요한 다음 위성입니다.',
  noteSub: '시험 로켓이 화물 트럭이 되면 발사 횟수가 매출이 됩니다. 오늘은 날짜가 찍힌 날입니다. 앞으로 3~5년 자주 날면 위성망이 더 빨리 채워질 수 있습니다.',
  footer: '스페이스X · 비행 14',
}, {
  badge: 'BREAKING', breaking: 'STARSHIP FLT-14',
  title: 'Flight 14 is set for Sep 18 and framed as the first revenue flight with V3 Starlinks',
  heroBig: '9/18',
  heroSub: 'Starbase, 7:15–9:14 a.m. CDT. Backup Sep 19. First paid flight carrying production V3 Starlinks.',
  grid: [
    { icon:'🗓', big:'9/18', mid:'Primary', sub:'CDT 7:15–9:14' },
    { icon:'🗓', big:'9/19', mid:'Backup', sub:'Same clock' },
    { icon:'📡', big:'V3', mid:'Starlink', sub:'Production satellites' },
    { icon:'💵', big:'Paid', mid:'First revenue', sub:'Customer cargo, not a test' },
  ],
  ctx1: 'UTC is 12:15–14:14. The exact minute can move with the target orbit.',
  ctx2: 'Flight 15 hardware — Booster 22 and Ship 42 — already finished cryo proofs.',
  quote: 'A revenue flight brings insurance and a customer. V3 Starlink needs the wide payload bay.',
  noteSub: 'When a test rocket becomes a cargo truck, cadence becomes revenue. Today printed the date. Over 3–5 years frequent flights can fill the constellation faster.',
  footer: 'SPCX · Flight 14',
});

add('cybercab-hk-tokyo', 'L3', 'TSLA', {
  badge: 'TSLA', title: '사이버캡이 9월 9일 홍콩에서 아시아 첫 공개를 했고 다음은 도쿄입니다',
  heroIcon: '🇭🇰', heroBig: '홍콩',
  heroSub: '금색 차체가 전시장 조명 아래 두 각도로 찍혔습니다. 아시아 투어의 첫 정거장이고 다음이 도쿄입니다. 보여 주는 차이지 홍콩 유료 호출이 아닙니다.',
  cards: [
    { icon:'📅', big:'9/9', mid:'홍콩 공개', sub:'아시아 첫 정거장' },
    { icon:'🗼', big:'도쿄', mid:'다음 전시', sub:'일본 소프트웨어 발언과 같은 주' },
    { icon:'🚪', big:'2인', mid:'핸들 없는 차', sub:'처음부터 로보택시용' },
  ],
  quote: '전시는 실물을 익히게 하는 일입니다. 유료 호출은 허가와 보험, 앱이 필요합니다. 다음에 보면 좋은 것은 도쿄 날짜입니다.',
  noteSub: '아시아 대도시는 택시 수요가 큽니다. 오늘은 투어의 첫 사진입니다. 앞으로 3~5년 몇 개 도시가 열리는지가 이 투어의 성적표입니다.',
  footer: '테슬라 · 사이버캡 홍콩',
}, {
  badge: 'TSLA', title: 'Cybercab debuted in Hong Kong on Sep 9; next stop is Tokyo',
  heroIcon: '🇭🇰', heroBig: 'HK',
  heroSub: 'A gold body sat under show lights in two angles. First Asia-tour stop; Tokyo is next. A display car, not a Hong Kong paid ride.',
  cards: [
    { icon:'📅', big:'9/9', mid:'Hong Kong debut', sub:'First Asia stop' },
    { icon:'🗼', big:'Tokyo', mid:'Next show', sub:'Same week as the Japan FSD remark' },
    { icon:'🚪', big:'2-seat', mid:'No steering wheel', sub:'Purpose-built robotaxi' },
  ],
  quote: 'A show teaches the shape. Paid rides need permits, insurance, and an app. Next: the Tokyo date.',
  noteSub: 'Asian megacities have large taxi demand. Today is the first tour photo. Over 3–5 years the score is how many cities open.',
  footer: 'TSLA · Cybercab HK',
});

add('fsd-v15', 'L3', 'TSLA', {
  badge: 'TSLA', title: '완전자율주행 15번이 위험 예측과 충돌 회피를 더 좋게 한다고 했습니다',
  heroIcon: '🛣', heroBig: 'v15',
  heroSub: '인공지능 책임자가 위험을 더 일찍 보고, 반응이 더 빠르며, 전체 안전과 충돌 회피가 좋아진다고 했습니다. 감독 모드의 다음 큰 버전입니다.',
  cards: [
    { icon:'👁', big:'예측', mid:'위험을 더 일찍', sub:'끼어들기 전에 속도 조절' },
    { icon:'⚡️', big:'반응', mid:'더 빠른 조작', sub:'브레이크와 조향' },
    { icon:'🛡', big:'회피', mid:'충돌을 더 잘 피함', sub:'이미 생긴 위험을 피해 감' },
  ],
  quote: '감독 모드는 사람이 개입할 수 있는 단계입니다. 15번은 그 소프트웨어 이름입니다. 다음에 보면 좋은 것은 차에 내려가는 날입니다.',
  noteSub: '버전이 올라갈수록 같은 차의 체감이 바뀝니다. 오늘은 안전 문장이 나온 날입니다. 앞으로 3~5년 개입이 줄면 유료 구독과 로보택시 설득이 쉬워질 수 있습니다.',
  footer: '테슬라 · FSD 15',
}, {
  badge: 'TSLA', title: 'FSD Supervised v15 was said to predict hazards earlier and avoid collisions better',
  heroIcon: '🛣', heroBig: 'v15',
  heroSub: 'The AI lead said earlier hazard prediction, faster reaction, better overall safety, and better collision avoidance. Next big supervised upgrade.',
  cards: [
    { icon:'👁', big:'Predict', mid:'See risk earlier', sub:'Slow before a cut-in' },
    { icon:'⚡️', big:'React', mid:'Faster controls', sub:'Brake and steer' },
    { icon:'🛡', big:'Avoid', mid:'Better collision dodge', sub:'Move around a risk already there' },
  ],
  quote: 'Supervised mode still lets a person take over. v15 is the version name. Next: the day it lands on cars.',
  noteSub: 'Each upgrade changes how the same car feels. Today printed the safety lines. Over 3–5 years fewer interventions can ease paid software and robotaxi arguments.',
  footer: 'TSLA · FSD v15',
});

add('tsla-2030s-scale', 'L2', 'TSLA', {
  badge: 'TSLA', title: '2030년대 시나리오에 구독 연 216억 달러와 로보택시 연 800억 달러가 적혔습니다',
  heroIcon: '📊', heroBig: '216억',
  heroSub: '승용 구독 1,000만 건이면 연 216억 달러, 로보택시 100만 대면 연 800억 달러라는 의견입니다. 회사 실적이 아니라 한 사람의 계산입니다.',
  cards: [
    { label:'구독', big:'1,000만', mid:'월 199달러 가정', sub:'연 216억 달러' },
    { label:'세미', big:'10만대', mid:'월 1.8만 달러', sub:'연 216억 달러' },
    { label:'택시', big:'100만', mid:'대당 연 8만 달러', sub:'연 800억 달러' },
  ],
  detailHead: '화면에 적힌 가정',
  detailLines: ['📍 로봇이 자리를 잡으면 연 2,000억~6,000억 달러가 더해질 수 있다고 했습니다','🧮 네 줄 모두 2030년대 시나리오입니다','📅 가까운 계단은 24일 공장과 15번 소프트웨어입니다'],
  noteSub: '가정이 맞으려면 허가와 공장이 먼저입니다. 오늘은 그림이 네 줄로 정리된 날입니다. 앞으로 3~5년 그중 두세 개만 현실에 가까워져도 매출 구성이 달라질 수 있습니다.',
  footer: '테슬라 · 2030년대 가정',
}, {
  badge: 'TSLA', title: 'A 2030s scenario printed $21.6B FSD subscriptions and $80B robotaxi revenue',
  heroIcon: '📊', heroBig: '$21.6B',
  heroSub: 'Ten million subs at $199/mo print $21.6B a year; one million robotaxis at $80k print $80B. An opinion, not results.',
  cards: [
    { label:'Subs', big:'10M', mid:'$199 / month assumed', sub:'$21.6B a year' },
    { label:'Semi', big:'100k', mid:'$18k / month', sub:'$21.6B a year' },
    { label:'Taxi', big:'1M', mid:'$80k per cab / year', sub:'$80B a year' },
  ],
  detailHead: 'What the screen assumed',
  detailLines: ['📍 Robots could add $200–600B a year once ramped','🧮 All four lines are 2030s scenarios','📅 Near stairs: Sep 24 factory and v15'],
  noteSub: 'Permits and factories come before the math. Today is a four-line sketch. Over 3–5 years even two of those lines getting real can change the mix.',
  footer: 'TSLA · 2030s scenario',
});

add('semi-nv-sep24', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '🚚 네바다 세미 공장',
  title: '테슬라가 네바다 세미 공장 개장 초대를 9월 24일로 보냈습니다',
  heroIcon: '🏭', heroBig: '9/24',
  heroSub: '하얀 세미가 흰 터널 조명 한가운데 서 있습니다. 전기를 쓰는 대형 화물 트럭의 전용 건물이 초대장을 받는 날입니다.',
  cards: [
    { icon:'📅', big:'9/24', mid:'개장 초대', sub:'달력에 찍힌 행사' },
    { icon:'🚚', big:'세미', mid:'전기 화물 트럭', sub:'디젤 긴 코가 없는 얼굴' },
    { icon:'🏜', big:'네바다', mid:'배터리 공장과 가까운 주', sub:'반복 생산을 위한 건물' },
  ],
  quote: '초대장은 생산 발표 전 행사입니다. 모건스탠리 월 매출 가정과는 층이 다릅니다. 다음에 보면 좋은 것은 연간 대수입니다.',
  noteSub: '화물 원가에서 연료와 인건비가 줄면 화주가 전기 트럭을 쓰기 쉬워집니다. 오늘은 건물이 초대를 보낸 날입니다. 앞으로 3~5년 대수가 늘면 트럭 칸이 테슬라 매출에 생깁니다.',
  footer: '테슬라 · 세미 공장',
}, {
  badge: 'TSLA', badgeLine: '🚚 Nevada Semi plant',
  title: 'Tesla sent Nevada Semi factory opening invitations for September 24',
  heroIcon: '🏭', heroBig: '9/24',
  heroSub: 'A white Semi sat in a white tunnel of light. The dedicated building for an electric long-haul truck is sending invites.',
  cards: [
    { icon:'📅', big:'9/24', mid:'Opening invite', sub:'A dated event' },
    { icon:'🚚', big:'Semi', mid:'Electric freight', sub:'No long diesel nose' },
    { icon:'🏜', big:'Nevada', mid:'Near the battery plant', sub:'A repeat-production building' },
  ],
  quote: 'An invite is a ceremony before volume. Split from the monthly-revenue estimate. Next: an annual unit target.',
  noteSub: 'If fuel and labor shrink, shippers try electric trucks. Today the building mailed invites. Over 3–5 years volume can add a truck line to Tesla revenue.',
  footer: 'TSLA · Semi plant',
});

add('nvda-electricity', 'L4', 'NVDA', {
  badge: 'NVDA', badgeLine: '⚡️ 인공지능 = 전기',
  title: '엔비디아 사장이 인공지능을 새로운 전기에 비유했습니다',
  heroIcon: '⚡️', heroBig: '전기',
  heroSub: '규모가 역사상 어떤 기술과도 같지 않다고 했습니다. 전기는 모든 산업의 밑바탕이었습니다. 칩 회사가 자기 제품을 그 밑바탕에 비유한 발언입니다.',
  cards: [
    { icon:'🔌', big:'전기', mid:'밑바탕 비유', sub:'공장·병원·은행이 같이 씀' },
    { icon:'🖥', big:'칩', mid:'엔비디아 자리', sub:'그 밑바탕의 연산' },
    { icon:'🏭', big:'38GW', mid:'같은 주 전력', sub:'마이크로소프트 2032 목표' },
  ],
  quote: '비유이지 이번 분기 매출이 아닙니다. 전력이 실제로 켜져야 칩을 꽂을 자리가 생깁니다. 다음에 보면 좋은 것은 클라우드 설비 투자입니다.',
  noteSub: '인공지능이 검색창을 넘어 공장 도구가 되면 칩 수요가 넓어집니다. 오늘은 비유가 다시 헤드라인에 오른 날입니다. 앞으로 3~5년 전선처럼 깔리면 엔비디아는 그 바닥의 가속기를 팔 수 있습니다.',
  footer: '엔비디아 · 새 전기',
}, {
  badge: 'NVDA', badgeLine: '⚡️ AI = electricity',
  title: 'NVIDIA’s CEO called AI the new electricity',
  heroIcon: '⚡️', heroBig: 'Power',
  heroSub: 'He said the scale is unlike any technology in history. Electricity was the base layer of industry. A chip firm put its product in that metaphor.',
  cards: [
    { icon:'🔌', big:'Grid', mid:'Base-layer metaphor', sub:'Factories, hospitals, banks' },
    { icon:'🖥', big:'Chips', mid:'NVIDIA’s seat', sub:'Compute on that base' },
    { icon:'🏭', big:'38GW', mid:'Same-week power', sub:'Microsoft’s 2032 goal' },
  ],
  quote: 'A metaphor, not this quarter’s sales. Chips need watts that actually turn on. Next: cloud capex.',
  noteSub: 'If AI becomes a factory tool, chip demand widens. Today the metaphor is back in the headline. Over 3–5 years a grid-like roll-out can keep NVIDIA selling the accelerators underneath.',
  footer: 'NVDA · new electricity',
});

add('cybercab-devon-15', 'L2', 'TSLA', {
  badge: 'TSLA', title: '펜실베이니아에서 사이버캡 14대가 목격됐고 15대가 나갈 준비를 했습니다',
  heroIcon: '🅿️', heroBig: '15대',
  heroSub: '필라델피아 근처 데본 주차장 사진입니다. 14대 목격 뒤 주말에 15대가 대기한다고 했습니다. 시험 구역에 가깝다는 설명과 아직 시험 중일 수 있다는 주의가 같이 있습니다.',
  cards: [
    { label:'목격', big:'14', mid:'필라델피아 근처', sub:'금색 차 한 대가 사진' },
    { label:'대기', big:'15', mid:'데본 주차장', sub:'주말에 한 대 더' },
    { label:'앱', big:'미확인', mid:'호출 등록', sub:'사진이지 유료 운행 아님' },
  ],
  detailHead: '화면에 나온 것',
  detailLines: ['📍 데본은 필라델피아 서쪽 교외입니다','🚕 홍콩 전시와 도시를 더하면 안 됩니다','🗺 허가와 앱 지도가 다음 확인입니다'],
  noteSub: '로보택시는 주차장에 차를 모아 지도를 익히는 식으로 도시를 늘립니다. 오늘은 동부 교외 15대입니다. 앞으로 3~5년 같은 그림이 여러 주에 쌓이면 킬로미터 매출이 보일 수 있습니다.',
  footer: '테슬라 · 데본 15대',
}, {
  badge: 'TSLA', title: 'Fourteen Cybercabs were spotted in Pennsylvania and fifteen were ready to roll',
  heroIcon: '🅿️', heroBig: '15',
  heroSub: 'A Devon lot just west of Philadelphia. Fourteen spotted, then fifteen ready over the weekend. Test-area photos, still possibly in testing.',
  cards: [
    { label:'Seen', big:'14', mid:'Near Philadelphia', sub:'One gold car in the photo' },
    { label:'Ready', big:'15', mid:'Devon lot', sub:'One more over the weekend' },
    { label:'App', big:'Unseen', mid:'Ride hail', sub:'A photo, not a paid trip' },
  ],
  detailHead: 'What the screen showed',
  detailLines: ['📍 Devon is a western suburb of Philadelphia','🚕 Do not add Hong Kong show cars','🗺 Permits and the app map are next'],
  noteSub: 'Robotaxi cities grow by staging cars in a lot and learning the map. Today is fifteen in an eastern suburb. Over 3–5 years the same picture in more states can show mile revenue.',
  footer: 'TSLA · Devon 15',
});

add('housing-seller-579', 'L1', 'RATES', {
  badge: 'MACRO', title: '미국 집 시장에서 매도자가 매수자보다 57.9% 많아 기록을 찍었습니다',
  heroIcon: '🏠', heroBig: '57.9%',
  heroSub: '8월 활발한 매수자 대비 매도자가 57.9% 많습니다. 그래프는 2013년부터 이어지며 2026년 8월에 꼭대기입니다. 집값이 하루 57% 떨어진 것이 아닙니다.',
  cards: [
    { icon:'📅', big:'8월', mid:'2026년 기록', sub:'화면 오른쪽 끝 점' },
    { icon:'📉', big:'2021', mid:'그때는 매수자 우위', sub:'선이 마이너스였던 해' },
    { icon:'🏦', big:'금리', mid:'모기지 부담', sub:'16일 회의가 다음 배경' },
  ],
  quote: '매도자가 많으면 주인이 가격을 낮춰야 거래가 됩니다. 57.9%는 수급 온도입니다. 다음에 보면 좋은 것은 재고 개월 수입니다.',
  noteSub: '높은 금리 해에는 이사를 미루고 손님이 줄어 격차가 벌어집니다. 오늘은 기록 점이 찍힌 날입니다. 앞으로 몇 년 금리가 예측 가능해지면 손님이 다시 돌아올 수 있습니다.',
  footer: '매크로 · 주택 57.9%',
}, {
  badge: 'MACRO', title: 'U.S. home sellers outnumbered buyers by 57.9% in August, a record',
  heroIcon: '🏠', heroBig: '57.9%',
  heroSub: 'August active sellers ran 57.9% ahead of active buyers. The chart from 2013 peaks in August 2026. Not a 57% one-day price crash.',
  cards: [
    { icon:'📅', big:'Aug', mid:'2026 record', sub:'Right-most dot' },
    { icon:'📉', big:'2021', mid:'Buyer surplus then', sub:'The line was negative' },
    { icon:'🏦', big:'Rates', mid:'Mortgage load', sub:'Sep 16 is the next backdrop' },
  ],
  quote: 'More sellers means list prices must give for a deal. 57.9% is supply-demand temperature. Next: months of inventory.',
  noteSub: 'High-rate years freeze movers and thin buyers. Today printed the record dot. Over a few years a clearer rate path can bring buyers back.',
  footer: 'MACRO · housing 57.9%',
});

add('starship-f15-hw', 'L2', 'SPCX', {
  badge: 'SPCX', title: '14번째 전에 15번째용 부스터 22와 우주선 42가 극저온 시험을 마쳤습니다',
  heroIcon: '🧊', heroBig: 'B22',
  heroSub: '부스터 22는 9월 9일과 10일 극저온 시험을 두 번 통과했습니다. 우주선 42는 이달 초 캠페인을 끝냈습니다. 패드에 다음 로켓이 대기하는 리듬입니다.',
  cards: [
    { label:'부스터', big:'22', mid:'9/9·9/10 극저온', sub:'땅에서 하는 기밀 시험' },
    { label:'우주선', big:'42', mid:'이달 초 캠페인', sub:'15번째 후보' },
    { label:'비행', big:'15', mid:'다음 리듬', sub:'14번째가 뜨기 전 준비' },
  ],
  detailHead: '사진에 나온 것',
  detailLines: ['📍 스타베이스 타워에 로켓이 붙은 세 장면입니다','🧊 극저온은 차가운 연료로 탱크가 새는지 봅니다','🚀 발사 성공이 아니라 지상 시험입니다'],
  noteSub: '한 대가 날기 전에 다음 대가 준비되면 공백이 짧아집니다. 오늘은 번호 22와 42가 찍힌 날입니다. 앞으로 3~5년 이 리듬이 주 단위가 되면 로켓이 물류처럼 읽힐 수 있습니다.',
  footer: '스페이스X · 비행 15 하드웨어',
}, {
  badge: 'SPCX', title: 'Before Flight 14, Flight 15 hardware already finished cryo proofs',
  heroIcon: '🧊', heroBig: 'B22',
  heroSub: 'Booster 22 passed two cryo proofs on Sep 9 and 10. Ship 42 finished its campaign earlier this month. Another vehicle waits behind the one on the pad.',
  cards: [
    { label:'Booster', big:'22', mid:'Cryo Sep 9–10', sub:'A ground leak check' },
    { label:'Ship', big:'42', mid:'Campaign done', sub:'Flight 15 candidate' },
    { label:'Flight', big:'15', mid:'Next cadence', sub:'Ready before 14 leaves' },
  ],
  detailHead: 'What the photos show',
  detailLines: ['📍 Three frames of a stacked vehicle on the Starbase tower','🧊 Cryo fills tanks with cold propellant to hunt leaks','🚀 A ground test, not a launch success'],
  noteSub: 'A spare on the pad shortens the gap. Today printed 22 and 42. Over 3–5 years a weekly rhythm can make rockets read like logistics.',
  footer: 'SPCX · Flight 15 hardware',
});

add('germany-fsd-kba', 'L3', 'TSLA', {
  badge: 'TSLA', title: '독일 교통당국이 유럽 표결 전에 완전자율주행을 쓸 수 있는 두 경로를 검토 중이라고 했습니다',
  heroIcon: '🇩🇪', heroBig: '39조',
  heroSub: '2026년 8월 8일 공문입니다. 유럽 전역 표결 또는 네덜란드 임시 승인을 39조 5항으로 먼저 받는 길을 보고 있습니다. 아직 승인된 것은 없습니다.',
  cards: [
    { icon:'🇪🇺', big:'표결', mid:'기술위원회', sub:'여러 나라가 같이 표를 던짐' },
    { icon:'🇳🇱', big:'임시', mid:'네덜란드 승인', sub:'독일이 먼저 받아들일 수 있는지' },
    { icon:'📄', big:'8/8', mid:'검토 회신', sub:'플렌스부르크 형식승인 부서' },
  ],
  quote: '형식승인은 이 소프트웨어를 차에 넣어도 된다는 도장입니다. 공문은 검토이지 허가가 아닙니다. 다음에 보면 좋은 것은 후속 공문입니다.',
  noteSub: '독일은 유럽 최대 자동차 시장입니다. 오늘은 법적 두 길이 적힌 날입니다. 앞으로 3~5년 여러 나라가 같은 소프트웨어를 인정하면 구독이 넓어질 수 있습니다.',
  footer: '테슬라 · 독일 검토',
}, {
  badge: 'TSLA', title: 'Germany’s KBA is reviewing two paths that could allow FSD before a full EU vote',
  heroIcon: '🇩🇪', heroBig: 'Art.39',
  heroSub: 'A letter dated 8 Aug 2026. EU-wide TCMV vote, or accepting Dutch provisional approval under Art. 39(5). Nothing approved yet.',
  cards: [
    { icon:'🇪🇺', big:'Vote', mid:'TCMV', sub:'Member states vote together' },
    { icon:'🇳🇱', big:'Provisional', mid:'Dutch RDW', sub:'Germany may accept first' },
    { icon:'📄', big:'8/8', mid:'Review reply', sub:'Flensburg type-approval desk' },
  ],
  quote: 'Type approval is the stamp to put the software in cars. The letter is a review, not a permit. Next: a follow-up letter.',
  noteSub: 'Germany is Europe’s largest car market. Today printed two legal paths. Over 3–5 years more member states accepting the same software can widen subscriptions.',
  footer: 'TSLA · Germany KBA',
});

add('ms-semi-12k', 'L1', 'TSLA', {
  badge: 'TSLA', title: '모건스탠리가 자율 소프트웨어를 얹은 세미가 월 1만 2천~1만 8천 달러를 벌 수 있다고 적었습니다',
  heroIcon: '🚚', heroBig: '$18k',
  heroSub: '트럭 한 대가 소프트웨어로 기사 인건비와 대기를 줄인다는 가정입니다. 증권사 의견이지 회사 가이던스가 아닙니다.',
  cards: [
    { icon:'💵', big:'$12k', mid:'월 하단', sub:'한 대 추정' },
    { icon:'💵', big:'$18k', mid:'월 상단', sub:'10만 대 가정과 같은 크기' },
    { icon:'📅', big:'9/24', mid:'공장 초대', sub:'가까운 일정' },
  ],
  quote: '고속도로에서 사람 없이 달리려면 허가와 보험이 필요합니다. 월 숫자는 대수가 쌓인 뒤의 이야기입니다. 다음에 보면 좋은 것은 출고 대수입니다.',
  noteSub: '화물 인건비가 줄면 화주가 전기 트럭을 쓰기 쉬워집니다. 오늘은 월 구간이 적힌 날입니다. 앞으로 3~5년 세미 구독이 테슬라의 새 칸이 될 수 있습니다.',
  footer: '테슬라 · 세미 월 매출 의견',
}, {
  badge: 'TSLA', title: 'Morgan Stanley wrote a Semi with autonomous software could generate $12k–$18k a month',
  heroIcon: '🚚', heroBig: '$18k',
  heroSub: 'One truck replacing driver wages and idle time with software. A sell-side estimate, not guidance.',
  cards: [
    { icon:'💵', big:'$12k', mid:'Monthly low', sub:'Per truck, estimated' },
    { icon:'💵', big:'$18k', mid:'Monthly high', sub:'Same size as the 100k-unit math' },
    { icon:'📅', big:'9/24', mid:'Plant invite', sub:'The near date' },
  ],
  quote: 'Driverless highways need permits and insurance. Monthly dollars come after volume. Next: deliveries.',
  noteSub: 'If labor shrinks, shippers try electric trucks. Today printed a monthly range. Over 3–5 years Semi subscriptions can become a new Tesla line.',
  footer: 'TSLA · Semi monthly estimate',
});

add('starlink-5g-2028', 'L4', 'SPCX', {
  badge: 'SPCX', badgeLine: '📱 우주 5G',
  title: '스타링크 다음 모바일망이 2027년 발사·2028년 상반기 서비스로 우주 5G를 켠다고 했습니다',
  heroIcon: '📡', heroBig: '2028',
  heroSub: '재무책임자가 위성을 2027년 내내 올리고 2028년 상반기에 서비스를 켤 능력이 있다고 했습니다. 그다음 버전은 완전한 5G 품질이라고 했습니다.',
  cards: [
    { icon:'🚀', big:'2027', mid:'발사 해', sub:'다음 세대 위성을 올리는 해' },
    { icon:'📶', big:'H1', mid:'2028 상반기', sub:'서비스 켜는 목표 창' },
    { icon:'📱', big:'5G', mid:'휴대폰 품질', sub:'문자 비상망보다 한 세대 위' },
  ],
  quote: '휴대폰이 위성에 직접 붙으면 기지국 없는 곳에서도 통화가 됩니다. 통신사 요금표가 상품입니다. 다음에 보면 좋은 것은 2027년 첫 발사입니다.',
  noteSub: '스타십이 자주 날아야 큰 위성을 제때 올립니다. 오늘은 2027~2028이 입에서 나온 날입니다. 앞으로 3~5년 품질이 나오면 재난·선박·항공기 시장이 같이 열릴 수 있습니다.',
  footer: '스페이스X · 스타링크 5G',
}, {
  badge: 'SPCX', badgeLine: '📱 5G from space',
  title: 'Starlink’s next mobile network was slated for 2027 launches and H1 2028 service',
  heroIcon: '📡', heroBig: '2028',
  heroSub: 'The CFO said satellites fly through 2027 and service can turn on in the first half of 2028. The next version is full 5G quality.',
  cards: [
    { icon:'🚀', big:'2027', mid:'Launch year', sub:'Next-gen satellites go up' },
    { icon:'📶', big:'H1', mid:'2028 first half', sub:'Service-on target window' },
    { icon:'📱', big:'5G', mid:'Phone quality', sub:'A generation above emergency text' },
  ],
  quote: 'Phones talking to space cover places with no tower. Carrier price lists are the product. Next: the first 2027 launch.',
  noteSub: 'Frequent Starship flights are how the big satellites arrive on time. Today printed 2027–2028. Over 3–5 years real 5G quality can open disaster, ship, and aircraft markets.',
  footer: 'SPCX · Starlink 5G',
});

add('msft-38gw', 'L1', 'MSFT', {
  badge: 'MSFT', title: '마이크로소프트가 데이터센터를 12기가와트에서 2032년 38기가와트 넘게 늘린다고 했습니다',
  heroIcon: '🏭', heroBig: '38GW',
  heroSub: '지금은 약 12기가와트이고 목표는 38기가와트 이상입니다. 기가와트는 발전소가 만드는 전력 단위입니다. 계획이지 올해 완공이 아닙니다.',
  cards: [
    { icon:'🔌', big:'12', mid:'지금 기가와트', sub:'이미 켜진 대략 용량' },
    { icon:'📈', big:'38+', mid:'2032년 목표', sub:'세 배 넘게' },
    { icon:'📅', big:'6년', mid:'남은 창', sub:'전력·땅·허가가 병목' },
  ],
  quote: '전력이 곧 몇 대의 인공지능 칩을 돌릴 수 있는지입니다. 엔비디아 전기 비유와 같은 주의 숫자입니다. 다음에 보면 좋은 것은 분기 설비 투자입니다.',
  noteSub: '클라우드 회사는 칩보다 전기를 먼저 확보합니다. 오늘은 목표 38이 공개된 날입니다. 앞으로 2032년까지 지켜지면 구독 일 처리량이 같이 커질 수 있습니다.',
  footer: '마이크로소프트 · 38기가와트',
}, {
  badge: 'MSFT', title: 'Microsoft plans to more than triple data centers to over 38 GW by 2032',
  heroIcon: '🏭', heroBig: '38GW',
  heroSub: 'About 12 GW now, more than 38 GW by 2032. Gigawatts are power-plant units. A plan, not this year’s build-out.',
  cards: [
    { icon:'🔌', big:'12', mid:'GW today', sub:'Rough live capacity' },
    { icon:'📈', big:'38+', mid:'2032 goal', sub:'More than triple' },
    { icon:'📅', big:'6 yr', mid:'Window left', sub:'Power, land, and permits' },
  ],
  quote: 'Watts are how many AI chips you can run. Same-week number as the electricity metaphor. Next: quarterly capex.',
  noteSub: 'Cloud firms lock power before chips. Today printed 38. If the path holds to 2032, subscription throughput can grow with it.',
  footer: 'MSFT · 38 GW',
});

add('ark-cybercab-025', 'L5', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 운임이 마일당 0.25달러로 그려졌고 플릿 구매 폼이 열렸습니다',
  heroIcon: '💵', heroBig: '$0.25',
  heroSub: '규모가 커지면 사람 택시의 약 10분의 1, 자가용 소유의 약 3분의 1이라는 막대그래프입니다. 감독 없는 마일은 38만에서 100만으로 늘었습니다.',
  before: { label:'사람 택시', big:'~$1+', sub:'웨이모 5세대 막대' },
  after: { label:'사이버캡', big:'$0.25', sub:'2030년 규모 가정' },
  cards: [
    { icon:'📏', big:'2.6×', mid:'엿새 만에', sub:'38만→100만 마일' },
    { icon:'📝', big:'폼', mid:'플릿 구매 관심', sub:'사업자가 손을 드는 양식' },
    { icon:'🚕', big:'2인', mid:'목적 제작 캡', sub:'오스틴 행사에서 소개' },
  ],
  quote: '0.25달러는 차가 싸고 가동률이 높을 때의 그림입니다. 오늘 앱 요금표가 아닙니다. 다음에 보면 좋은 것은 실제 계약입니다.',
  noteSub: '운임이 정말 싸지면 차를 사는 대신 호출을 더 씁니다. 오늘은 그래프와 폼이 나온 날입니다. 앞으로 3~5년 플릿 구매자가 생기면 제조와 운영을 나눌 수 있습니다.',
  footer: '테슬라 · 마일당 0.25달러',
}, {
  badge: 'TSLA', title: 'Cybercab was drawn at $0.25 a mile and a fleet-buyer form went live',
  heroIcon: '💵', heroBig: '$0.25',
  heroSub: 'At scale, about one-tenth a human ride-hail and one-third personal-car ownership. Unsupervised miles rose 380k to 1M.',
  before: { label:'Human hail', big:'~$1+', sub:'Waymo 5th-gen bar' },
  after: { label:'Cybercab', big:'$0.25', sub:'2030 at-scale assumption' },
  cards: [
    { icon:'📏', big:'2.6×', mid:'In six weeks', sub:'380k → 1M miles' },
    { icon:'📝', big:'Form', mid:'Fleet-buyer interest', sub:'Operators raise a hand' },
    { icon:'🚕', big:'2-seat', mid:'Purpose-built cab', sub:'Introduced in Austin' },
  ],
  quote: '$0.25 needs cheap cars and high utilization. Not today’s app fare. Next: a real contract.',
  noteSub: 'If fares get that cheap, people hail instead of owning. Today printed a chart and a form. Over 3–5 years fleet buyers can split make from operate.',
  footer: 'TSLA · $0.25 / mile',
});

add('spcx-ai-111b', 'L1', 'SPCX', {
  badge: 'SPCX', title: '스페이스엑스가 12월 1일부터 한 달 11억 1천만 달러 연산 계약을 시작한다고 했습니다',
  heroIcon: '🖥', heroBig: '$1.11B',
  heroSub: '재무책임자가 또 하나의 인공지능 연산 계약이 월 11억 1천만 달러, 연 133억 달러라고 했습니다. 12월 속도를 연율하면 1,000억 달러 궤도라고 했습니다.',
  cards: [
    { icon:'📅', big:'12/1', mid:'시작일', sub:'2026년 12월 1일' },
    { icon:'💵', big:'$13.3B', mid:'연 환산', sub:'한 달×12' },
    { icon:'🎯', big:'$100B', mid:'연 반복매출 궤도', sub:'12월 속도의 연율' },
  ],
  quote: '호스팅은 남의 칩을 자기 건물에 두고 전기를 나눠 주는 일입니다. 고객 이름은 화면에 없습니다. 다음에 보면 좋은 것은 12월 장부입니다.',
  noteSub: '로켓 회사가 통신과 연산을 같이 팔면 세 줄이 한 이야기가 됩니다. 오늘은 월 11억 1천만이라는 구체 숫자가 나온 날입니다. 앞으로 3~5년 목표가 지켜지면 상장 논의의 숫자 근거가 될 수 있습니다.',
  footer: '스페이스X · 월 11.1억 달러',
}, {
  badge: 'SPCX', title: 'SpaceX said an AI compute deal will generate $1.11B a month from December 1',
  heroIcon: '🖥', heroBig: '$1.11B',
  heroSub: 'The CFO said another AI compute deal prints $1.11B a month, $13.3B a year. Annualizing December puts a $100B ARR track.',
  cards: [
    { icon:'📅', big:'12/1', mid:'Start date', sub:'1 Dec 2026' },
    { icon:'💵', big:'$13.3B', mid:'Annualized', sub:'Month × 12' },
    { icon:'🎯', big:'$100B', mid:'ARR track', sub:'December run-rate' },
  ],
  quote: 'Hosting parks someone else’s chips in your building and splits the power. No customer name on this screen. Next: the December books.',
  noteSub: 'A rocket firm that also sells comms and compute becomes one three-line story. Today printed $1.11B a month. Over 3–5 years a held target can become IPO math.',
  footer: 'SPCX · $1.11B / month',
});

};
