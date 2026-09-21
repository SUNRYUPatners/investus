// 2026-09-22 SVG topic data — screenshot facts, beginner Korean, listed SPCX
// Layout mix: ROWS×1 L1×4 L2×3 L3×3 L4×3 L5×3 L6×1 (총 18)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.22 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'7일', title:'머스크는 첫 궤도 스타십이 스타링크 3세대를 실어 나른다고 했습니다',
      sub:'부스터 21호기가 발사대에 올라갔고, 일정은 허가에 달려 있습니다.' },
    { color:'#4ade80', fill:'#061209', right:'체코', title:'체코에서 감독 주행이 승인됐고 곧 배포가 시작됩니다',
      sub:'테슬라 유럽 계정이 알렸고, 유럽연합 전체 표결이 앞에 있습니다.' },
    { color:'#fb7185', fill:'#1a0a10', right:'4.7', title:'그록 4.7이 같은 가격으로 나왔고 점수는 한 단계 올랐습니다',
      sub:'입력 100만 토큰 2달러, 출력 6달러로 4.6과 같습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'1Pbps', title:'메타가 미국과 프랑스를 잇는 해저 케이블 페탈을 발표했습니다',
      sub:'초당 1페타비트, 약 7,000킬로미터, 2029년 개통이 목표입니다.' },
    { color:'#4ade80', fill:'#061209', right:'25센트', title:'사이버캡 운행비 25센트, 테슬라는 마일당 1.20달러를 가져간다는 인터뷰입니다',
      sub:'회사 공시가 아니라 투자 대담에서 나온 숫자입니다.' },
    { color:'#94a3b8', fill:'#111827', right:'49.5%', title:'S&P500 종목의 절반이 200일선을 밑돌았습니다',
      sub:'4월 초 이후 가장 얇은 시장 폭입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'2027', title:'머스크는 스타십 완전 재사용이 내년에 가깝다고 했습니다',
      sub:'설계는 가능하고, 일정은 아직 목표입니다.' },
  ],
  caption: '더 볼 것: 스타십 궤도 · 체코 감독주행 · 그록 4.7 · 페탈 해저망 · 사이버캡 원가 · 시장 폭 49.5% · 재사용 2027',
}, {
  headline: '2026.09.22 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'7 days', title:'Musk said the first orbital Starship will carry operational Starlink V3',
      sub:'Booster 21 is on the pad. The date still needs a license.' },
    { color:'#4ade80', fill:'#061209', right:'Czechia', title:'Supervised FSD is approved in Czechia and rollout starts soon',
      sub:'Tesla Europe posted it. An EU-wide vote is still ahead.' },
    { color:'#fb7185', fill:'#1a0a10', right:'4.7', title:'Grok 4.7 launched at the same price with higher scores',
      sub:'Input is $2 and output $6 per million tokens, matching 4.6.' },
    { color:'#60a5fa', fill:'#0a1420', right:'1 Pbps', title:'Meta announced Petal, a US–France undersea cable',
      sub:'One petabit per second over about 7,000 km, targeted for 2029.' },
    { color:'#4ade80', fill:'#061209', right:'25¢', title:'An interview said Cybercab costs 25 cents a mile; Tesla keeps $1.20',
      sub:'Those figures are from a talk, not a company filing.' },
    { color:'#94a3b8', fill:'#111827', right:'49.5%', title:'Half of S&P 500 stocks sat below their 200-day average',
      sub:'The thinnest breadth since early April.' },
    { color:'#c084fc', fill:'#140b1f', right:'2027', title:'Musk said full Starship reuse is extremely likely next year',
      sub:'The design can do it. The calendar is still a goal.' },
  ],
  caption: 'Watch: orbital Starship · Czech FSD · Grok 4.7 · Petal cable · Cybercab cost · 49.5% breadth · reuse 2027',
});

add('tsla-fsd-v15', 'L4', 'TSLA', {
  badge: '테슬라', title: '로보택시의 다음 열쇠가 감독 주행 15라는 관측이 나왔습니다',
  badgeLine: '관측 · 회사 발표 전',
  heroIcon: '\u{1F9E0}', heroBig: 'FSD v15',
  heroSub: '감독 주행은 사람이 지켜보며 차가 가는 소프트웨어입니다. 15번은 아직 공식 배포가 아니고, 매개변수 약 100억 개라는 추측이 붙었습니다.',
  cards: [
    { icon:'\u{1F4CA}', big:'100억', mid:'매개변수 추정치입니다', sub:'14번은 약 10억 개로 거론됐습니다' },
    { icon:'\u{1F698}', big:'시범', mid:'초기 빌드가 로보택시에 있다는 관측입니다', sub:'일반 차 배포는 확인되지 않았습니다' },
    { icon:'\u{23F0}', big:'24시간', mid:'연중무휴 서비스 열쇠로 거론됐습니다', sub:'허가와 안전 통계가 따로 필요합니다' },
  ],
  quote: '15번이 나와야 플릿을 키운다는 해석이 퍼졌습니다. 매개변수는 모델이 기억하는 숫자 손잡이입니다. 회사 버전 안내문은 아직 없습니다.',
  noteHead: '왜 중요한가', noteSub: '모델이 커지면 드문 장면을 더 잘 다룰 수 있다는 기대가 붙습니다. 관측과 공식 배포는 다릅니다. 다음엔 차에 찍힌 버전 숫자와 무인 운행 시간을 보면 됩니다.',
  footer: '테슬라 · 감독 주행 15 관측',
}, {
  badge: 'TSLA', title: 'Some watchers said FSD v15, not Cybercab rules, is the next robotaxi key',
  badgeLine: 'View · not a company note',
  heroIcon: '\u{1F9E0}', heroBig: 'FSD v15',
  heroSub: 'Supervised FSD is software that drives while a person watches. Version 15 is not a public rollout yet; talk of about 10 billion parameters is unofficial.',
  cards: [
    { icon:'\u{1F4CA}', big:'10B', mid:'A parameter guess', sub:'Version 14 was cited near 1 billion' },
    { icon:'\u{1F698}', big:'Trial', mid:'Early builds were said to sit in robotaxis', sub:'Retail cars are not confirmed' },
    { icon:'\u{23F0}', big:'24/7', mid:'Floated as a key to all-day service', sub:'Permits and safety stats still matter' },
  ],
  quote: 'The view was that v15 unlocks fleet scale. Parameters are the knobs a model learns. Tesla has not posted release notes for v15.',
  noteHead: 'Why it matters', noteSub: 'A larger model can handle rare scenes better in theory. A guess is not a rollout. Next, watch the version on the car screen and unmanned hours.',
  footer: 'Tesla · FSD v15 talk',
});

add('ms-tsla-spcx-stack', 'L5', 'TSLA', {
  badge: '테슬라', title: '테슬라와 스페이스X가 한 물리 인공지능 스택으로 모인다는 분석이 나왔습니다',
  heroIcon: '\u{1F517}', heroBig: '스택이 모입니다',
  heroSub: '물리 인공지능은 공장·차·로봇처럼 현실 세계에서 움직이는 인공지능입니다. 분석은 두 회사가 따로 상장된 채 역량이 겹친다고 봤습니다.',
  before: { label: '스페이스X', big: '연결·자본', sub: '컴퓨터와 통신, 자금이 이 칸입니다' },
  after: { label: '테슬라', big: '로봇·데이터', sub: '로봇과 에너지, 공장이 이 칸입니다' },
  cards: [
    { icon:'\u{1F4BB}', big:'겹침', mid:'칩·배터리·태양·인재가 이미 겹칩니다', sub:'공급망과 문화도 같이 거론됐습니다' },
    { icon:'\u{1F3E2}', big:'별도', mid:'두 회사는 따로 남습니다', sub:'합병은 분석 본문이 아닙니다' },
    { icon:'\u{26A0}\u{FE0F}', big:'추측', mid:'곧 합병한다는 말은 소셜 과장입니다', sub:'공식 합병 발표는 없습니다' },
  ],
  quote: '한 쪽은 컴퓨터·연결·자본을, 다른 쪽은 로봇·데이터·에너지·제조를 가져옵니다. 목표는 에너지를 현실 세계 지능으로 바꾸는 일입니다.',
  noteHead: '왜 중요한가', noteSub: '두 상장사가 한 스택으로 읽히면 실적 시즌에 교차 수요가 보입니다. 분석과 합병 루머는 다릅니다. 다음엔 공동 제품과 공급 계약이 공시되는지를 보면 됩니다.',
  footer: '테슬라 · 스페이스X 스택',
}, {
  badge: 'TSLA', title: 'An analysis said Tesla and SpaceX are converging into one physical-AI stack',
  heroIcon: '\u{1F517}', heroBig: 'One stack',
  heroSub: 'Physical AI is intelligence that moves in factories, cars and robots. The note said the firms stay separate while capabilities overlap.',
  before: { label: 'SpaceX', big: 'Link + capital', sub:'Compute, connectivity and funding' },
  after: { label: 'Tesla', big: 'Robots + data', sub:'Robotics, energy and factories' },
  cards: [
    { icon:'\u{1F4BB}', big:'Overlap', mid:'Chips, batteries, solar and talent already overlap', sub:'Vendors and culture were cited too' },
    { icon:'\u{1F3E2}', big:'Separate', mid:'The two companies remain listed apart', sub:'A merger is not the note’s claim' },
    { icon:'\u{26A0}\u{FE0F}', big:'Rumor', mid:'“Merger soon” is social stretch', sub:'There is no official merger filing' },
  ],
  quote: 'One side brings compute, connectivity and capital. The other brings robotics, data, energy and manufacturing. The shared aim is turning energy into intelligence in the physical world.',
  noteHead: 'Why it matters', noteSub: 'If two listed firms read as one stack, earnings season shows cross-demand. Analysis is not a merger rumor. Next, watch joint products and supply contracts in filings.',
  footer: 'Tesla · SpaceX stack',
});

add('tsla-fsd-czechia', 'L3', 'TSLA', {
  badge: '테슬라', title: '체코에서 감독 주행이 승인됐고 곧 배포가 시작됩니다',
  heroIcon: '\u{1F1E8}\u{1F1FF}', heroBig: '체코 승인',
  heroSub: '감독 주행은 운전자가 자리를 지키며 차가 가는 기능입니다. 테슬라 유럽 계정이 체코 승인과 곧 배포를 알렸습니다.',
  cards: [
    { icon:'\u{1F4DC}', big:'승인', mid:'교통 당국이 네덜란드 잠정 인증을 인정했습니다', sub:'수개월 검토 끝에 입장이 바뀌었습니다' },
    { icon:'\u{1F30D}', big:'유럽 7', mid:'유럽연합 안에서는 일곱 번째 나라입니다', sub:'네덜란드에서 슬로베니아까지 이어졌습니다' },
    { icon:'\u{1F5F3}\u{FE0F}', big:'10월 6일', mid:'유럽연합 전체 표결이 거론됩니다', sub:'27개국 중 15표와 인구 65%가 필요합니다' },
  ],
  quote: '소셜에는 세계 15번째 나라라는 집계가 붙었습니다. 공식 글은 체코 승인과 곧 배포입니다. 유럽 큰 나라 표는 아직입니다.',
  noteHead: '왜 중요한가', noteSub: '한 나라가 열리면 그 도로 데이터가 다음 허가의 근거가 됩니다. 유럽 전체 개방은 표결이 남아 있습니다. 다음엔 체코 차 화면의 버전과 10월 표 결과를 보면 됩니다.',
  footer: '테슬라 · 체코 감독 주행',
}, {
  badge: 'TSLA', title: 'Supervised FSD is approved in Czechia and rollout starts soon',
  heroIcon: '\u{1F1E8}\u{1F1FF}', heroBig: 'Czech OK',
  heroSub: 'Supervised FSD lets the car drive while the person stays ready. Tesla Europe posted the approval and a soon rollout.',
  cards: [
    { icon:'\u{1F4DC}', big:'Approved', mid:'Transport officials recognized the Dutch provisional type OK', sub:'Months of review reversed an earlier hold' },
    { icon:'\u{1F30D}', big:'EU 7th', mid:'Seventh European Union member on the list', sub:'After the Netherlands through Slovenia' },
    { icon:'\u{1F5F3}\u{FE0F}', big:'Oct 6', mid:'An EU-wide vote is discussed', sub:'Needs 15 of 27 states and 65% of people' },
  ],
  quote: 'Social posts counted a 15th country worldwide. The official note is Czechia approval and a soon rollout. Big EU markets still wait.',
  noteHead: 'Why it matters', noteSub: 'One more country feeds road data into the next permit. EU-wide access still needs a vote. Next, watch the version on Czech cars and the October tally.',
  footer: 'Tesla · Czech FSD',
});

add('spacex-reuse-2027', 'L1', 'SPCX', {
  badge: '스페이스X', title: '머스크는 스타십 완전 재사용이 2027년에 가깝다고 했습니다',
  heroIcon: '\u{1F680}', heroBig: '2027',
  heroSub: '완전 재사용은 부스터와 우주선이 돌아와 바로 다시 뜨는 일입니다. 머스크는 설계가 가능하고 내년이 극히 유력하다고 했습니다.',
  cards: [
    { icon:'\u{2705}', big:'설계', mid:'완전 재사용이 가능한 설계라고 했습니다', sub:'확신을 분명히 했습니다' },
    { icon:'\u{1F504}', big:'둘 다', mid:'스타십과 슈퍼헤비가 돌아와 다시 뜹니다', sub:'한 쪽만 살리는 단계가 아닙니다' },
    { icon:'\u{1F4C5}', big:'내년', mid:'극히 유력하다는 표현입니다', sub:'달력의 확정 공시는 아닙니다' },
  ],
  quote: '팰컨 9이 부스터를 다시 쓰며 발사 원가를 바꿨습니다. 스타십은 우주선까지 같은 일을 하려는 다음 단계입니다.',
  noteHead: '왜 중요한가', noteSub: '재사용이 붙어야 스타링크 3세대를 자주 올릴 수 있습니다. 발언은 목표이지 비행 성공 통계가 아닙니다. 다음엔 궤도 비행과 부스터 착지 영상을 보면 됩니다.',
  footer: '스페이스X · 재사용 2027',
}, {
  badge: 'SPCX', title: 'Musk said full Starship reuse is extremely likely in 2027',
  heroIcon: '\u{1F680}', heroBig: '2027',
  heroSub: 'Full reuse means booster and ship return and fly again quickly. He said the design can do it and next year is extremely likely.',
  cards: [
    { icon:'\u{2705}', big:'Design', mid:'He said the design is capable of full reuse', sub:'He called that certain' },
    { icon:'\u{1F504}', big:'Both', mid:'Starship and Super Heavy come home and fly again', sub:'Not a booster-only step' },
    { icon:'\u{1F4C5}', big:'Next year', mid:'The phrase was extremely likely', sub:'Not a dated filing' },
  ],
  quote: 'Falcon 9 changed launch economics by flying boosters again. Starship is the attempt to do the same for the entire stack.',
  noteHead: 'Why it matters', noteSub: 'Reuse has to land before Starlink V3 can fly often. The line is a goal, not a success table. Next, watch an orbital flight and a booster landing clip.',
  footer: 'SpaceX · reuse 2027',
});

add('meta-petal-cable', 'L2', 'GOOGL', {
  badge: '메타', title: '메타가 미국과 프랑스를 잇는 해저 케이블 페탈을 발표했습니다',
  heroIcon: '\u{1F30A}', heroBig: '1페타비트',
  heroSub: '페탈은 대양을 가로지르는 첫 페타비트급 해저망으로 소개됐습니다. 초당 1페타비트는 1,000테라비트이고, 2029년 개통이 목표입니다.',
  cards: [
    { label: '거리', big: '7,000km', mid: '약 4,300마일', sub: '미국과 프랑스 대서양 구간입니다' },
    { label: '용량', big: '2배', mid: '지금 최고 대양망의 두 배', sub: '다중 코어 광섬유를 씁니다' },
    { label: '개통', big: '2029', mid: '목표 연도', sub: 'NEC·스미토모·오렌지와 같이 짓습니다' },
  ],
  detailHead: '왜 이 케이블인가',
  detailLines: [
    '인공지능 데이터센터가 대륙을 오가며 데이터를 씁니다',
    '전력과 관 굵기를 같은 비율로 키우지 않고 용량을 올립니다',
    '개통 전까지는 계획이지 지금 트래픽이 아닙니다',
  ],
  quote: '메타는 세계 인구 75%가 동시에 음악을 틀 수 있는 용량이라고 비유했습니다. 페타비트는 초당 1,000조 비트입니다.',
  noteHead: '왜 중요한가', noteSub: '칩만 늘리면 대양을 건너는 길이 막힙니다. 해저망은 인공지능 공장의 도로입니다. 다음엔 착공과 프랑스 상륙 허가를 보면 됩니다.',
  footer: '메타 · 페탈 해저망',
}, {
  badge: 'META', title: 'Meta announced Petal, a US–France undersea cable at one petabit',
  heroIcon: '\u{1F30A}', heroBig: '1 Pbps',
  heroSub: 'Petal was introduced as the first petabit-class transoceanic cable. One petabit per second is 1,000 terabits. Service is targeted for 2029.',
  cards: [
    { label: 'Span', big: '7,000 km', mid: 'About 4,300 miles', sub: 'A US–France Atlantic hop' },
    { label: 'Capacity', big: '2×', mid: 'Twice today’s best ocean cables', sub: 'It uses multi-core fiber' },
    { label: 'Service', big: '2029', mid: 'Target year', sub: 'Built with NEC, Sumitomo and Orange' },
  ],
  detailHead: 'Why this cable',
  detailLines: [
    'AI data centers ship data across oceans',
    'Capacity rises without a matching jump in power and pipe size',
    'Until service starts it is a plan, not live traffic',
  ],
  quote: 'Meta said the capacity is like 75% of the world streaming music at once. A petabit is a thousand trillion bits a second.',
  noteHead: 'Why it matters', noteSub: 'More chips stall if the ocean hop is full. A subsea cable is a road for AI factories. Next, watch groundbreaking and the French landing permit.',
  footer: 'Meta · Petal cable',
});

add('us-dc-over-housing', 'L5', 'MACRO', {
  badge: '매크로', title: '미국 컴퓨터 설비 투자가 주택 투자를 처음 넘어섰습니다',
  heroIcon: '\u{1F3D8}\u{FE0F}', heroBig: '설비 > 주택',
  heroSub: '정보처리 설비는 컴퓨터와 데이터센터 하드웨어입니다. 2분기 물가조정 금액이 주택 투자를 앞질렀습니다.',
  before: { label: '주택', big: '7,480억', sub: '2분기 민간 주택 고정투자입니다' },
  after: { label: '설비', big: '7,520억', sub: '같은 분기 정보처리 설비입니다' },
  cards: [
    { icon:'\u{1F4C9}', big:'−18%', mid:'주택은 2021년 초 고점 대비 줄었습니다', sub:'금리 부담이 이어졌습니다' },
    { icon:'\u{1F4C8}', big:'+51%', mid:'설비는 같은 기간 늘었습니다', sub:'인공지능 장비가 끌었습니다' },
    { icon:'\u{1F4CA}', big:'1970s', mid:'이런 역전은 1970년대 이후 처음입니다', sub:'샌프란시스코 연준 인사가 짚었습니다' },
  ],
  quote: '헤드라인은 데이터센터가 주택을 앞질렀다고 읽히지만, 통계 칸은 정보처리 설비 전체입니다. 주택만의 이야기가 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '나라의 투자 엔진이 집짓기에서 컴퓨터로 옮겨 갑니다. 전력과 칩 공급이 그 엔진의 연료입니다. 다음엔 3분기 표와 하이퍼스케일러 설비투자 가이던스를 보면 됩니다.',
  footer: '매크로 · 설비와 주택',
}, {
  badge: 'MACRO', title: 'US computer-equipment investment overtook housing investment',
  heroIcon: '\u{1F3D8}\u{FE0F}', heroBig: 'Gear > homes',
  heroSub: 'Information-processing equipment is computers and data-center hardware. Real Q2 spending passed residential investment.',
  before: { label: 'Housing', big: '$748B', sub: 'Q2 real private residential investment' },
  after: { label: 'Equipment', big: '$752B', sub: 'The same quarter’s processing gear' },
  cards: [
    { icon:'\u{1F4C9}', big:'−18%', mid:'Housing is down from the early-2021 peak', sub:'Higher rates weighed on builds' },
    { icon:'\u{1F4C8}', big:'+51%', mid:'Equipment rose over the same span', sub:'AI hardware led the jump' },
    { icon:'\u{1F4CA}', big:'1970s', mid:'The last similar crossover was the mid-1970s', sub:'A San Francisco Fed note flagged it' },
  ],
  quote: 'Headlines read as data centers beating housing. The statistic is the wider information-processing-equipment line.',
  noteHead: 'Why it matters', noteSub: 'The country’s investment engine is shifting from homebuilding to computers. Power and chips are the fuel. Next, watch the Q3 table and hyperscaler capex guides.',
  footer: 'Macro · gear vs housing',
});

add('tsla-cybercab-china-interior', 'L4', 'TSLA', {
  badge: '테슬라', title: '사이버캡 안에서 다리를 쭉 펴고 앉는 영상이 중국에서 나왔습니다',
  badgeLine: '실내 영상 · 로보택시',
  heroIcon: '\u{1F6CB}\u{FE0F}', heroBig: '거실 소파',
  heroSub: '사이버캡은 운전석이 없는 전용 로보택시입니다. 새 영상은 앞좌석까지 다리를 뻗어도 공간이 남는 모습을 보여 줬습니다.',
  cards: [
    { icon:'\u{1F6CB}\u{FE0F}', big:'공간', mid:'다리를 끝까지 뻗어도 여유가 있습니다', sub:'거실 소파에 가깝다는 설명이 붙었습니다' },
    { icon:'\u{1F4F9}', big:'영상', mid:'테슬라 아시아가 올린 클립입니다', sub:'양산 가격표는 나오지 않았습니다' },
    { icon:'\u{1F464}', big:'승객', mid:'사람은 타고 차는 소프트웨어가 갑니다', sub:'핸들과 페달이 없는 자리입니다' },
  ],
  quote: '촬영 설명은 차가 원래 이래야 한다는 느낌이 난다고 했습니다. 내부 공간은 로보택시 요금 이야기의 다른 칸입니다.',
  noteHead: '왜 중요한가', noteSub: '승객이 편해야 호출이 반복됩니다. 영상은 시험 제작 공간이 실제 몸과 맞는지 보여 줍니다. 다음엔 양산 좌석과 유료 호출 화면을 보면 됩니다.',
  footer: '테슬라 · 사이버캡 실내',
}, {
  badge: 'TSLA', title: 'A China clip showed people stretching out inside a Cybercab',
  badgeLine: 'Cabin video · robotaxi',
  heroIcon: '\u{1F6CB}\u{FE0F}', heroBig: 'Lounge sofa',
  heroSub: 'A Cybercab is a robotaxi with no driver’s seat. The new video shows room left even with legs stretched all the way.',
  cards: [
    { icon:'\u{1F6CB}\u{FE0F}', big:'Space', mid:'Legs can stretch with room to spare', sub:'It was likened to a living-room sofa' },
    { icon:'\u{1F4F9}', big:'Clip', mid:'Tesla Asia posted the video', sub:'No production price appeared' },
    { icon:'\u{1F464}', big:'Rider', mid:'People ride; software drives', sub:'No wheel and no pedals' },
  ],
  quote: 'The caption said this is what a car is supposed to feel like. Cabin space is a different line from robotaxi fares.',
  noteHead: 'Why it matters', noteSub: 'Riders come back if the cabin is comfortable. The clip tests whether prototype space fits real bodies. Next, watch production seats and a paid-hail screen.',
  footer: 'Tesla · Cybercab cabin',
});

add('musk-intelligence-exponential', 'L4', 'TSLA', {
  badge: '테슬라', title: '머스크는 지능이 지수적으로 좋아지고 있다고 적었습니다',
  badgeLine: '본인 발언',
  heroIcon: '\u{1F4C8}', heroBig: '지수적 개선',
  heroSub: '지수적은 같은 비율로 계속 커진다는 뜻입니다. 머스크는 인공지능 혁명은 이제 시작이라고도 했습니다.',
  cards: [
    { icon:'\u{1F4DD}', big:'한 줄', mid:'지능이 지수적으로 좋아진다고 적었습니다', sub:'9월 21일 오전 게시입니다' },
    { icon:'\u{1F9E0}', big:'10개월', mid:'작년 연말 최전선 모델이 이미 밀렸다는 덧글입니다', sub:'플래시 모델들이 그 자리를 넘었습니다' },
    { icon:'\u{1F680}', big:'시작', mid:'혁명은 이제 시작이라는 같은 주의 글입니다', sub:'정점이 아니라는 뜻입니다' },
  ],
  quote: '작년 크리스마스에 최전선으로 불리던 모델이 열 달 만에 여러 소형 모델에 밀렸다는 비교가 붙었습니다. 속도가 뉴스입니다.',
  noteHead: '왜 중요한가', noteSub: '모델이 빨리 바뀌면 차와 로봇에 들어가는 두뇌도 같이 바뀝니다. 한 줄 발언은 실적 숫자가 아닙니다. 다음엔 차에 내려가는 모델 버전을 보면 됩니다.',
  footer: '테슬라 · 지능 발언',
}, {
  badge: 'TSLA', title: 'Musk wrote that intelligence is improving exponentially',
  badgeLine: 'His own post',
  heroIcon: '\u{1F4C8}', heroBig: 'Exponential',
  heroSub: 'Exponential means growth at a steady percentage. He also said the AI revolution is only beginning.',
  cards: [
    { icon:'\u{1F4DD}', big:'One line', mid:'He wrote that intelligence is improving exponentially', sub:'Posted the morning of Sept 21' },
    { icon:'\u{1F9E0}', big:'10 months', mid:'A reply said last Christmas’s frontier models already lost', sub:'Newer flash models passed them' },
    { icon:'\u{1F680}', big:'Start', mid:'A same-week line said the revolution is only beginning', sub:'Not a peak claim' },
  ],
  quote: 'Models called frontier last Christmas were said to trail several smaller models ten months later. The news is the pace.',
  noteHead: 'Why it matters', noteSub: 'If models move fast, the brains in cars and robots move with them. A one-line post is not an earnings print. Next, watch which model version lands in cars.',
  footer: 'Tesla · intelligence post',
});

add('tsla-fsd-collision-evasion', 'L3', 'TSLA', {
  badge: '테슬라', title: '감독 주행 14.3.10이 자동 충돌 회피 기능을 싣고 세 번째 묶음으로 내려갑니다',
  heroIcon: '\u{1F6A6}', heroBig: '충돌 회피',
  heroSub: '자동 충돌 회피는 급정지만으로 피하기 어려울 때 감독 주행을 켜 피하는 기능입니다. 소프트웨어 2026.27.10과 같이 내려갑니다.',
  cards: [
    { icon:'\u{1F698}', big:'정면', mid:'정면 충돌이 임박하고 제동만으로는 부족할 때', sub:'첫 번째 장면입니다' },
    { icon:'\u{1F464}', big:'주의', mid:'뒷좌석을 보거나 감독 주행이 꺼질 때', sub:'두 번째 장면입니다' },
    { icon:'\u{1F4BB}', big:'HW3', mid:'14.2 라이트가 구형 칩에도 14를 내립니다', sub:'4번 칩 지능을 3번에 증류했다고 적혔습니다' },
  ],
  quote: '안내문은 14.3.10과 14.2 라이트 문구를 바꾸지 않은 버그 수정 배포라고 했습니다. 하드웨어 3과 4를 한 묶음으로 맞춥니다.',
  noteHead: '왜 중요한가', noteSub: '충돌을 피하는 기능이 차에 내려가야 로보택시 안전 이야기가 구체가 됩니다. 안내와 도로 통계는 다릅니다. 다음엔 배포 대수와 개입 횟수를 보면 됩니다.',
  footer: '테슬라 · 충돌 회피',
}, {
  badge: 'TSLA', title: 'FSD v14.3.10 is rolling in a third batch with Automatic Collision Evasion',
  heroIcon: '\u{1F6A6}', heroBig: 'Evasion',
  heroSub: 'Automatic Collision Evasion turns Supervised FSD on when braking alone may not avoid a crash. It ships with software 2026.27.10.',
  cards: [
    { icon:'\u{1F698}', big:'Frontal', mid:'A frontal crash is imminent and braking may not be enough', sub:'The first listed scene' },
    { icon:'\u{1F464}', big:'Attention', mid:'The driver looks to the back seat or FSD may have dropped', sub:'The second listed scene' },
    { icon:'\u{1F4BB}', big:'HW3', mid:'v14.2 Lite brings v14 to older chips', sub:'Notes say HW4 intelligence was distilled into HW3' },
  ],
  quote: 'Release notes said the 14.3.10 and 14.2 Lite text did not change — a bug-fix drop. It unifies Hardware 3 and 4 in one bundle.',
  noteHead: 'Why it matters', noteSub: 'A crash-avoid feature in cars makes robotaxi safety concrete. Notes are not road stats. Next, watch install counts and intervention rates.',
  footer: 'Tesla · collision evasion',
});

add('tsla-cybercab-econ-120', 'L2', 'TSLA', {
  badge: '테슬라', title: '사이버캡 한 마일에 테슬라가 1.20달러를 가져간다는 인터뷰가 나왔습니다',
  heroIcon: '\u{1F4B0}', heroBig: '1.20달러',
  heroSub: '사이버캡은 운전석 없는 로보택시입니다. 투자 대담은 운행비 25센트, 차주 몫 5센트, 테슬라 몫 1.20달러라고 했습니다.',
  cards: [
    { label: '운행', big: '25센트', mid: '마일당 운영비', sub:'전기·마모·보험을 묶은 추정입니다' },
    { label: '차주', big: '5센트', mid: '비용 위 수익', sub:'마일당 약 20% 수익으로 설명됐습니다' },
    { label: '요금', big: '절반', mid: '우버보다 싼 요금', sub:'플랫폼 수수료는 테슬라가 가져갑니다' },
  ],
  detailHead: '숫자가 말해 주는 것',
  detailLines: [
    '급등 요금의 윗부분도 테슬라 칸으로 설명됐습니다',
    '대담 숫자이지 분기 실적표가 아닙니다',
    '유료 호출이 열려야 마일당 매출이 생깁니다',
  ],
  quote: '테슬라는 우버처럼 플랫폼 수수료를 가져가고, 차주는 남는 부분을 가져간다는 설명이었습니다. 공시 칸에는 아직 없습니다.',
  noteHead: '왜 중요한가', noteSub: '마일당 1.20달러가 맞으면 소프트웨어 회사가 교통 수수료를 먹습니다. 인터뷰와 요금표는 다릅니다. 다음엔 앱에 찍힌 실요금과 차주 정산 명세를 보면 됩니다.',
  footer: '테슬라 · 사이버캡 원가',
}, {
  badge: 'TSLA', title: 'An interview said Tesla keeps $1.20 a mile on Cybercab rides',
  heroIcon: '\u{1F4B0}', heroBig: '$1.20',
  heroSub: 'A Cybercab is a robotaxi with no driver’s seat. The talk put operating cost at 25 cents, the owner at 5 cents, and Tesla at $1.20 a mile.',
  cards: [
    { label: 'Run', big: '25¢', mid: 'Cost per mile', sub:'Power, wear and insurance in one estimate' },
    { label: 'Owner', big: '5¢', mid: 'Profit over cost', sub:'Described as about a 20% return per mile' },
    { label: 'Fare', big: 'Half', mid: 'About half an Uber fare', sub:'Tesla keeps the platform fee' },
  ],
  detailHead: 'What the numbers say',
  detailLines: [
    'Surge upside was also described as Tesla’s line',
    'These are talk figures, not a quarterly table',
    'Paid hails have to open before miles become sales',
  ],
  quote: 'Tesla was said to take a platform fee like Uber, with owners keeping the rest. The figures are not in a filing yet.',
  noteHead: 'Why it matters', noteSub: 'If $1.20 a mile holds, a software firm collects a transit fee. An interview is not a fare card. Next, watch the in-app price and owner settlements.',
  footer: 'Tesla · Cybercab unit cost',
});

add('tsla-models-1m-km', 'L1', 'TSLA', {
  badge: '테슬라', title: '영업용 모델S가 100만 킬로미터를 넘겼습니다',
  heroIcon: '\u{1F696}', heroBig: '100만km',
  heroSub: '캐나다 브리티시컬럼비아에서 2017년부터 영업한 흰색 모델S입니다. 수만 명의 승객을 실어 나른 택시로 소개됐습니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'2017', mid:'영업을 시작한 해', sub:'약 9년을 달렸습니다' },
    { icon:'\u{1F30E}', big:'BC', mid:'캐나다 서부', sub:'일반 도로 영업입니다' },
    { icon:'\u{1F697}', big:'모델S', mid:'개인용이 아닌 영업용', sub:'내구성 이야기가 숫자로 남습니다' },
  ],
  quote: '한 대가 100만 킬로미터를 견디면, 로보택시 한 대의 수명 가정이 문서가 아니라 도로에서 나옵니다.',
  noteHead: '왜 중요한가', noteSub: '차가 오래 달려야 로보택시 원가가 떨어집니다. 한 대의 기록은 통계 전부가 아닙니다. 다음엔 같은 거리의 배터리 교체 횟수를 보면 됩니다.',
  footer: '테슬라 · 모델S 100만km',
}, {
  badge: 'TSLA', title: 'A working Model S taxi passed 1,000,000 kilometers',
  heroIcon: '\u{1F696}', heroBig: '1M km',
  heroSub: 'A white Model S has worked in British Columbia since 2017. It was described as carrying tens of thousands of passengers.',
  cards: [
    { icon:'\u{1F4C5}', big:'2017', mid:'The year taxi work began', sub:'About nine years on the road' },
    { icon:'\u{1F30E}', big:'B.C.', mid:'Western Canada', sub:'Ordinary public-road taxi work' },
    { icon:'\u{1F697}', big:'Model S', mid:'A working car, not a private toy', sub:'Durability becomes a number' },
  ],
  quote: 'If one car lasts a million kilometers, robotaxi life assumptions come from the road, not a slide.',
  noteHead: 'Why it matters', noteSub: 'Cars have to last for robotaxi costs to fall. One odometer is not the whole fleet. Next, watch battery-swap counts at the same distance.',
  footer: 'Tesla · Model S 1M km',
});

add('grok-47', 'L2', 'XAI', {
  badge: '스페이스X', title: '그록 4.7이 같은 가격으로 나왔고 여러 점수가 올랐습니다',
  heroIcon: '\u{1F916}', heroBig: '그록 4.7',
  heroSub: '그록은 스페이스X 인공지능 회사의 대화 모델입니다. 입력 100만 토큰 2달러, 출력 6달러로 4.6과 같고 점수는 올랐습니다.',
  cards: [
    { label: '가격', big: '$2 / $6', mid: '입력·출력 100만 토큰', sub:'4.6과 같은 표입니다' },
    { label: '코딩', big: '46.3%', mid: '커서벤치 4.0', sub:'4.6의 40.4%에서 올랐습니다' },
    { label: '전기', big: '64.0%', mid: '전기공학 벤치', sub:'비교군보다 높았습니다' },
  ],
  detailHead: '표에 적힌 점수',
  detailLines: [
    '사무실 장시간 과제 1,657점으로 4.6의 1,546보다 높습니다',
    '법률 에이전트는 19.6%로 낮지만 4.6의 15.8%보다는 올랐습니다',
    '반값·두 배 속도라는 말은 표와 다릅니다. 가격은 같습니다',
  ],
  quote: '회사는 같은 가격과 속도에서 눈에 띄는 개선이라고 했습니다. 화면에는 데이터 공유를 켜 달라는 안내가 같이 떴습니다.',
  noteHead: '왜 중요한가', noteSub: '값싼 모델이 코딩과 전기 과제에서 올라오면 공장·위성 소프트웨어 원가가 낮아집니다. 표는 실무 전부가 아닙니다. 다음엔 커서와 응용프로그래밍 인터페이스 사용량을 보면 됩니다.',
  footer: '스페이스X · 그록 4.7',
}, {
  badge: 'SPCX', title: 'Grok 4.7 launched at the same price with higher scores',
  heroIcon: '\u{1F916}', heroBig: 'Grok 4.7',
  heroSub: 'Grok is the SpaceX AI lab’s chat model. Input is $2 and output $6 per million tokens, matching 4.6, while scores rose.',
  cards: [
    { label: 'Price', big: '$2 / $6', mid: 'In and out per million tokens', sub:'The same row as 4.6' },
    { label: 'Coding', big: '46.3%', mid: 'CursorBench 4.0', sub:'Up from 40.4% on 4.6' },
    { label: 'Electrical', big: '64.0%', mid: 'EE bench', sub:'Ahead of the comparison set' },
  ],
  detailHead: 'Scores on the card',
  detailLines: [
    'Long office work scored 1,657 versus 1,546 on 4.6',
    'The legal-agent score is a low 19.6%, still up from 15.8%',
    'Half-price or 2× speed claims do not match the table. Price is unchanged',
  ],
  quote: 'The lab called it a notable improvement at the same price and speed. The screen also asked users to opt in to share data.',
  noteHead: 'Why it matters', noteSub: 'A cheaper model that climbs coding and electrical tasks can cut factory and satellite software cost. A table is not all of real work. Next, watch Cursor and API usage.',
  footer: 'SpaceX · Grok 4.7',
});

add('tsla-vegas-cybercab-5000', 'L6', 'TSLA', {
  badge: '테슬라', title: '라스베이거스에서 사이버캡이 해질 녘 시험 주행을 했고 네바다는 5,000대까지 허용합니다',
  breaking: '네바다 · 5,000대',
  heroBig: '5,000대',
  heroSub: '네바다 주는 상용 로보택시를 최대 5,000대까지 허용했습니다. 테슬라 내부 목표는 첫해 2,000~2,500대로 거론됐습니다.',
  grid: [
    { icon:'\u{1F307}', big:'해질 녘', mid:'이른 아침 동쪽 도로', sub:'불 꺼진 구간 데이터를 모읍니다' },
    { icon:'\u{1F3E2}', big:'허브', mid:'거점이 지어지는 중입니다', sub:'배차 거점이 있어야 상용입니다' },
    { icon:'\u{1F4CA}', big:'2~2.5천', mid:'첫해 내부 목표', sub:'허용 한도 5,000대보다 적습니다' },
    { icon:'\u{1F4F9}', big:'시험', mid:'상용 전 데이터 수집', sub:'유료 호출은 이 영상에 없습니다' },
  ],
  ctx1: '허용 대수와 실제로 도는 대수는 다른 칸입니다.',
  ctx2: '어두운 도로 데이터는 24시간 서비스의 입구입니다.',
  quote: '촬영은 새벽 6시 45분 직후 동쪽 도로였습니다. 허브를 짓는 중이고 아직 데이터를 모은다는 설명이 붙었습니다.',
  noteHead: '왜 중요한가', noteSub: '주 정부가 5,000대를 열어 주면 허가 칸이 넓어집니다. 시험 영상은 매출이 아닙니다. 다음엔 거점 개장과 앱 호출을 보면 됩니다.',
  footer: '테슬라 · 라스베이거스 사이버캡',
}, {
  badge: 'TSLA', title: 'A Cybercab tested at dusk in Las Vegas; Nevada allows up to 5,000 robotaxis',
  breaking: 'Nevada · 5,000',
  heroBig: '5,000',
  heroSub: 'Nevada approved up to 5,000 commercial robotaxis. Tesla’s internal first-year goal was cited at 2,000 to 2,500.',
  grid: [
    { icon:'\u{1F307}', big:'Dusk', mid:'East-side road at dawn', sub:'Collecting data in low light' },
    { icon:'\u{1F3E2}', big:'Hubs', mid:'Depots are being built', sub:'A depot is required for commercial service' },
    { icon:'\u{1F4CA}', big:'2–2.5k', mid:'Year-one internal goal', sub:'Below the 5,000-cap' },
    { icon:'\u{1F4F9}', big:'Test', mid:'Data collection before paid rides', sub:'No fare screen in the clip' },
  ],
  ctx1: 'A permit cap and cars actually circulating are different lines.',
  ctx2: 'Low-light miles are the door to all-day service.',
  quote: 'The clip was just after 6:45 a.m. on the east side. Hubs are going up and the cars still appear to be gathering data.',
  noteHead: 'Why it matters', noteSub: 'A 5,000-car state cap widens the permit line. A test clip is not revenue. Next, watch a depot opening and an in-app hail.',
  footer: 'Tesla · Las Vegas Cybercab',
});

add('tsla-optimus-regulatory', 'L3', 'TSLA', {
  badge: '테슬라', title: '테슬라가 옵티머스 글로벌 배치를 위한 규제 준수 엔지니어를 뽑습니다',
  heroIcon: '\u{1F916}', heroBig: '글로벌 배치',
  heroSub: '옵티머스는 사람 모습의 로봇입니다. 프리몬트 정규직 공고는 세계 시장에 내보내기 위한 안전 인증을 맡깁니다.',
  cards: [
    { icon:'\u{1F3E2}', big:'프리몬트', mid:'캘리포니아 공장 도시', sub:'에너지 공학 소속으로 올라갔습니다' },
    { icon:'\u{1F4CB}', big:'ISO', mid:'개인·서비스 로봇과 산업 협동로봇 규격', sub:'13482와 10218이 거론됐습니다' },
    { icon:'\u{1F30D}', big:'위원회', mid:'국제 표준 자리에 앉는 것이 목표입니다', sub:'나라마다 다른 법을 맞춥니다' },
  ],
  quote: '공고 번호 276193은 설계부터 시험, 인증, 허가까지 안전 서류를 맡는다고 적었습니다. 공장 바닥과 일상 공간 둘 다를 봅니다.',
  noteHead: '왜 중요한가', noteSub: '채용은 로봇을 팔 나라 지도의 초안입니다. 공고가 출근과 인증서로 바뀌어야 수출이 됩니다. 다음엔 첫 나라 인증 발표를 보면 됩니다.',
  footer: '테슬라 · 옵티머스 규제',
}, {
  badge: 'TSLA', title: 'Tesla is hiring a regulatory-compliance engineer for global Optimus rollout',
  heroIcon: '\u{1F916}', heroBig: 'Global rollout',
  heroSub: 'Optimus is a human-shaped robot. A full-time Fremont job covers safety certificates so the robot can enter world markets.',
  cards: [
    { icon:'\u{1F3E2}', big:'Fremont', mid:'The California factory city', sub:'Posted under energy engineering' },
    { icon:'\u{1F4CB}', big:'ISO', mid:'Personal/service and industrial cobot codes', sub:'13482 and 10218 were cited' },
    { icon:'\u{1F30D}', big:'Committees', mid:'A seat on standards groups is the aim', sub:'Local laws differ by country' },
  ],
  quote: 'Requisition 276193 covers safety work from design through test, certification and permits. It looks at factory floors and everyday spaces.',
  noteHead: 'Why it matters', noteSub: 'Hiring is a draft of the export map. A listing becomes exports only after start dates and certificates. Next, watch the first country certification.',
  footer: 'Tesla · Optimus compliance',
});

add('spacex-starship-7days-v3', 'L1', 'SPCX', {
  badge: '스페이스X', title: '머스크는 7일 뒤 첫 궤도 스타십이 운영용 스타링크 3세대를 싣는다고 했습니다',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '26기',
  heroSub: '스타링크 3세대는 용량을 키운 새 위성입니다. 9월 21일 글 기준 일주일, 부스터 21호기는 이미 발사대에 있습니다.',
  cards: [
    { icon:'\u{1F680}', big:'14차', mid:'첫 궤도 시도로 계획됐습니다', sub:'이전 비행은 의도적으로 지구를 한 바퀴 돌지 않았습니다' },
    { icon:'\u{1F4E1}', big:'26기', mid:'3세대 위성', sub:'한 기당 약 1테라비트 용량입니다' },
    { icon:'\u{1F4C5}', big:'허가', mid:'날짜는 규제 승인에 달려 있습니다', sub:'9월 28일 전후가 거론됩니다' },
  ],
  quote: '275킬로미터 높이에서 약 여섯 바퀴를 돌고 칠레 서쪽 태평양에 내리는 그림입니다. 운영용이라는 한 단어가 시험과 매출을 가릅니다.',
  noteHead: '왜 중요한가', noteSub: '시험 로켓이 인터넷 매출 장비로 바뀌는 날입니다. 발사는 허가와 날씨에 미뤄질 수 있습니다. 다음엔 카운트다운과 위성 전개 영상을 보면 됩니다.',
  footer: '스페이스X · 스타십 14차',
}, {
  badge: 'SPCX', title: 'Musk said the first orbital Starship in seven days will carry operational Starlink V3',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '26 sats',
  heroSub: 'Starlink V3 is the higher-capacity satellite class. From the Sept 21 post that is about a week. Booster 21 is already on the pad.',
  cards: [
    { icon:'\u{1F680}', big:'Flight 14', mid:'Planned as the first orbital try', sub:'Earlier flights stayed deliberately suborbital' },
    { icon:'\u{1F4E1}', big:'26', mid:'V3 satellites', sub:'About 1 Tbps of capacity each' },
    { icon:'\u{1F4C5}', big:'License', mid:'The day still needs regulatory approval', sub:'Around Sept 28 has been discussed' },
  ],
  quote: 'The sketch is six orbits near 275 km and a splashdown west of Chile. The word operational is what separates a test from revenue hardware.',
  noteHead: 'Why it matters', noteSub: 'A test rocket becomes internet hardware. A launch can slip on license and weather. Next, watch the countdown and a deployment clip.',
  footer: 'SpaceX · Starship Flight 14',
});

add('sp500-breadth-49', 'L1', 'MACRO', {
  badge: '매크로', title: 'S&P500 종목의 49.5%만 200일선 위에 있습니다',
  heroIcon: '\u{1F4C9}', heroBig: '49.50%',
  heroSub: '200일선은 약 200거래일 평균 가격입니다. 그 위에 있는 종목이 절반을 밑돌면 지수와 개별 종목의 온도가 갈립니다.',
  cards: [
    { icon:'\u{1F4C8}', big:'49.50', mid:'9월 18일 종가 기준', sub:'하루 −0.79포인트입니다' },
    { icon:'\u{1F4C5}', big:'4월', mid:'이보다 얇은 폭은 4월 초였습니다', sub:'여름 고점에서 내려왔습니다' },
    { icon:'\u{1F3AF}', big:'50%', mid:'절반 선이 깨졌습니다', sub:'소수는 오르고 다수는 쉬는 그림입니다' },
  ],
  quote: '지수가 버텨도 200일선 아래 종목이 늘면, 상승이 소수 대형주에 몰린 것입니다.',
  noteHead: '왜 중요한가', noteSub: '폭이 얇으면 지수 수익률과 내 종목 수익률이 갈라집니다. 한 날의 숫자입니다. 다음엔 50% 선을 다시 넘기는지를 보면 됩니다.',
  footer: '매크로 · 시장 폭',
}, {
  badge: 'MACRO', title: 'Only 49.5% of S&P 500 stocks sit above their 200-day average',
  heroIcon: '\u{1F4C9}', heroBig: '49.50%',
  heroSub: 'The 200-day line is a roughly 200-session average price. When fewer than half of names sit above it, the index and the typical stock diverge.',
  cards: [
    { icon:'\u{1F4C8}', big:'49.50', mid:'As of the Sept 18 close', sub:'Down 0.79 point on the day' },
    { icon:'\u{1F4C5}', big:'April', mid:'The last thinner print was early April', sub:'It rolled off the summer high' },
    { icon:'\u{1F3AF}', big:'50%', mid:'The halfway line broke', sub:'A few names lift the index; most rest' },
  ],
  quote: 'If the index holds while more names sit under the 200-day, the rally is concentrated in a few large stocks.',
  noteHead: 'Why it matters', noteSub: 'Thin breadth splits index returns from a typical holding. This is one print. Next, watch whether the 50% line is reclaimed.',
  footer: 'Macro · market breadth',
});

add('tsla-model-y-l-soldout', 'L5', 'TSLA', {
  badge: '테슬라', title: '모델Y L 론치 시리즈 미국 새 주문이 2027년 1~2월 인도입니다',
  heroIcon: '\u{1F697}', heroBig: '모델Y L',
  heroSub: '모델Y L은 차체를 늘린 6인승입니다. 롱레인지(항속거리 사양)가 아닙니다. 론치 시리즈는 그 차의 출시 한정 사양입니다.',
  before: { label: '2026 한정', big: '소진', sub:'올해 미국 론치 시리즈 물량이 끝났다는 설명입니다' },
  after: { label: '새 주문', big: '1–2월', sub:'2027년 1월에서 2월 인도 예상입니다' },
  cards: [
    { icon:'\u{1F4CD}', big:'아르바다', mid:'콜로라도 주문 화면', sub:'우편번호 80001, 1~2월 예상이 찍혔습니다' },
    { icon:'\u{1F697}', big:'L', mid:'긴 축거 6인승 모델Y L', sub:'일반 5인승 모델Y와 다른 차입니다' },
    { icon:'\u{1F3C6}', big:'론치', mid:'출시 한정 사양입니다', sub:'항속거리 트림 이름이 아닙니다' },
  ],
  quote: '모델Y L은 긴 축거(Long Wheelbase) 6인승입니다. 론치 시리즈는 그 차를 미국에 처음 팔 때 붙인 한정 사양입니다. 롱레인지(항속거리 트림)와 이름이 다릅니다.',
  noteHead: '왜 중요한가', noteSub: '모델Y L은 차체를 늘린 6인승이고, 론치 시리즈는 그 차의 출시 한정 사양입니다. 롱레인지와 다른 이름입니다. 올해 미국 론치 시리즈가 소진되면 새 주문은 내년 초 인도입니다. 다음에 볼 것은 다른 지역 창과 주간 생산입니다.',
  footer: '테슬라 · 모델Y L',
}, {
  badge: 'TSLA', title: 'New US Model Y L Launch Series orders now show January–February 2027 delivery',
  heroIcon: '\u{1F697}', heroBig: 'Model Y L',
  heroSub: 'Model Y L is the long-wheelbase six-seater, not the Long Range range trim. Launch Series is the first-run limited spec of that car.',
  before: { label: '2026 slots', big: 'Gone', sub:'This year’s US Launch Series allocation is described as spent' },
  after: { label: 'New order', big: 'Jan–Feb', sub:'Estimated delivery in early 2027' },
  cards: [
    { icon:'\u{1F4CD}', big:'Arvada', mid:'A Colorado order screen', sub:'ZIP 80001 showed Jan–Feb 2027' },
    { icon:'\u{1F697}', big:'L', mid:'Long-wheelbase six-seat Y L', sub:'A different car from the five-seat Y' },
    { icon:'\u{1F3C6}', big:'Launch', mid:'A first-run limited spec', sub:'Not the Long Range range trim' },
  ],
  quote: 'Model Y L means long wheelbase, a six-seat stretch. Launch Series is the first-run pack on that car. It is not Long Range.',
  noteHead: 'Why it matters', noteSub: 'If the 2026 US Launch Series is spent, new orders wait until early 2027. One ZIP screen is not a national lock. Next, watch other ZIP windows and weekly factory output.',
  footer: 'Tesla · Model Y L',
});

};
