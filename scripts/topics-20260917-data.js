// 2026-09-17 SVG topic data — screenshot/news facts, beginner Korean, positive long view
// Layout mix: ROWS×1 L1×4 L2×5 L3×3 L4×4 L5×3 L6×3 (총 23)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.17 한장 요약',
  rows: [
    { color:'#ef4444', fill:'#1a0a0a', right:'3.75~4%', title:'연준이 기준금리를 0.25%p 올렸습니다. 2023년 이후 첫 인상입니다',
      sub:'12명 전원 찬성, 새 의장 케빈 워시 취임 첫 회의에서 나온 결정입니다.' },
    { color:'#4ade80', fill:'#061209', right:'430~840대', title:'테슬라 오스틴 로보택시 기지에 하루 840대분 전력이 들어옵니다',
      sub:'9월 2일 접수된 허가 서류로 사이버캡 확장을 준비하는 것으로 보입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'+518억불', title:'스타십 발사 예고에 스페이스X 시총이 500억 달러 넘게 뛰었습니다',
      sub:'9월 22일 14차 시험비행 발표 이후 주가가 하루 5% 넘게 올랐습니다.' },
    { color:'#4ade80', fill:'#061209', right:'20만대', title:'테슬라가 노르웨이에서 등록 차량 20만대를 돌파했습니다',
      sub:'모델Y 한 종류가 노르웨이 테슬라의 절반을 넘습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'37.3%', title:'모건스탠리가 엔비디아 HBM 수요 점유율을 37.3%로 추산했습니다',
      sub:'구글 36%, AMD 12.1%로 세 회사가 수요의 85%를 가져갑니다.' },
    { color:'#f59e0b', fill:'#201408', right:'美생산 검토', title:'SK하이닉스가 인텔 공장 빌려 미국 메모리 생산을 검토합니다',
      sub:'실현되면 SK하이닉스의 첫 미국 내 메모리 칩 생산이 됩니다.' },
    { color:'#94a3b8', fill:'#111827', right:'8개월', title:'미국 최대 모기지 대출사 UWM이 8개월 연속 하락했습니다',
      sub:'역대 최장 하락 기록이며 지난달엔 사상 최대 하루 낙폭을 냈습니다.' },
  ],
  caption: '더 볼 것: 연준 0.25%p 인상 · 오스틴 로보택시 전력망 · 스타십 시총 급등 · 노르웨이 20만대 · 엔비디아 HBM 37% · SK하이닉스 미국생산 · UWM 8개월 하락',
}, {
  headline: '2026.09.17 Daily Snapshot',
  rows: [
    { color:'#ef4444', fill:'#1a0a0a', right:'3.75-4%', title:'The Fed raised rates 25bp, its first hike since 2023',
      sub:'A unanimous 12-0 vote at new Chair Kevin Warsh\u2019s first meeting.' },
    { color:'#4ade80', fill:'#061209', right:'430-840/day', title:'Tesla is wiring power for 840 daily charges at its Austin hub',
      sub:'A Sept 2 permit filing suggests Cybercab fleet expansion is coming.' },
    { color:'#c084fc', fill:'#140b1f', right:'+$51.8B', title:'SpaceX\u2019s market cap jumped $50B on Starship flight news',
      sub:'Shares rose more than 5% in a day after the Sept 22 flight 14 announcement.' },
    { color:'#4ade80', fill:'#061209', right:'200,000', title:'Tesla crossed 200,000 registered vehicles in Norway',
      sub:'The Model Y alone now makes up more than half of all Teslas there.' },
    { color:'#60a5fa', fill:'#0a1420', right:'37.3%', title:'Morgan Stanley sees Nvidia taking 37.3% of HBM demand',
      sub:'Google gets 36% and AMD 12.1% \u2014 together about 85% of the market.' },
    { color:'#f59e0b', fill:'#201408', right:'US talks', title:'SK Hynix explores US output by leasing Intel\u2019s Ohio plant',
      sub:'It would be SK Hynix\u2019s first-ever memory chip production on US soil.' },
    { color:'#94a3b8', fill:'#111827', right:'8 months', title:'Top US lender UWM posted its 8th straight red month',
      sub:'Its longest losing streak on record, following its biggest one-day drop ever.' },
  ],
  caption: 'Watch: Fed +25bp · Austin robotaxi power · SpaceX cap jump · Norway 200K · Nvidia HBM 37% · SK Hynix US output · UWM losing streak',
});

// 1) L6 — Fed rate hike 25bp
add('fed-rate-hike-25bp', 'L6', 'RATES', {
  badge: '연준 · 금리', title: '연준이 기준금리를 0.25%포인트 올렸습니다. 2023년 이후 첫 금리 인상입니다',
  breaking: 'FOMC 12대0 전원 찬성 · 인상',
  heroBig: '3.75~4.00%', heroSub: '새 의장 케빈 워시가 이끈 첫 회의에서 12명 위원 전원이 인상에 찬성했습니다. 이런 만장일치는 연준이 물가를 잡겠다는 의지가 강하다는 신호로 읽힙니다.',
  grid: [
    { icon:'\u{1F4C8}', big:'3.7%', mid:'올해 물가(PCE)', sub:'내년엔 2.3%로 낮아질 전망' },
    { icon:'\u{1F4BC}', big:'4.1%', mid:'실업률 전망', sub:'큰 변화 없이 유지' },
    { icon:'\u{1F3AF}', big:'4.1%', mid:'연말 예상 금리', sub:'18명 중 16명이 추가 인상 예상' },
    { icon:'\u{1F4B5}', big:'99.9', mid:'달러인덱스', sub:'발표 후 0.3% 올랐습니다' },
  ],
  ctx1: '관세·중동전쟁 에너지충격·AI투자붐이 겹쳐 물가가 안 잡히자 연준이 금리를 올렸습니다.',
  ctx2: '증시는 비교적 차분했습니다. S&P500은 0.3~0.4%, 나스닥은 0.7~0.9% 올랐고 다우는 소폭 흔들렸습니다.',
  quote: '워시 의장은 "물가가 목표로 가는 속도가 충분하다는 확신이 아직 없었다"며 만장일치 인상이 물가안정 의지를 보여준다고 말했습니다.',
  noteHead: '왜 중요한가', noteSub: '금리 인상은 대출·모기지 이자를 더 비싸게 만들어 소비와 투자를 눌러 물가를 낮추는 도구입니다. 시장은 이미 91% 확률로 이번 인상을 예상했던 만큼 충격은 크지 않았지만, 18명 중 16명이 연내 추가 인상을 예상한 점이 다음 관전 포인트입니다.',
  footer: '연준 · 금리 인상',
}, {
  badge: 'FED · RATES', title: 'The Fed raised its benchmark interest rate by a quarter point, its first hike since 2023',
  breaking: 'FOMC unanimous 12-0 hike',
  heroBig: '3.75-4.00%', heroSub: 'All 12 voting members backed the hike at new Chair Kevin Warsh\u2019s first meeting, a signal of the Fed\u2019s resolve to bring inflation down faster.',
  grid: [
    { icon:'\u{1F4C8}', big:'3.7%', mid:'This year\u2019s PCE', sub:'Seen easing to 2.3% next year' },
    { icon:'\u{1F4BC}', big:'4.1%', mid:'Unemployment outlook', sub:'Little changed from before' },
    { icon:'\u{1F3AF}', big:'4.1%', mid:'Year-end rate view', sub:'16 of 18 officials see more hikes' },
    { icon:'\u{1F4B5}', big:'99.9', mid:'Dollar index', sub:'Up 0.3% after the decision' },
  ],
  ctx1: 'Tariffs, an Israel-Iran war energy shock, and AI capex kept inflation sticky.',
  ctx2: 'Markets stayed calm: S&P 500 +0.3-0.4%, Nasdaq +0.7-0.9%, Dow slightly lower.',
  quote: 'Chair Warsh said the Fed wasn\u2019t yet confident inflation was moving to target "clearly and at sufficient speed," calling the unanimous vote a sign of resolve.',
  noteHead: 'Why it matters', noteSub: 'Higher rates raise borrowing costs to cool spending and inflation. Markets had priced a 91% chance of this hike, so the reaction was muted \u2014 but 16 of 18 officials now expect at least one more hike this year, the next thing to watch.',
  footer: 'Fed · Rate Hike',
});

// 2) L2 — Cybercab US nationwide expansion
add('cybercab-us-nationwide-expansion', 'L2', 'TSLA', {
  badge: '테슬라', title: '테슬라 사이버캡이 필라델피아부터 로스앤젤레스까지 미국 곳곳에서 목격되고 있습니다',
  heroIcon: '\u{1F695}', heroBig: '전역 확산',
  heroSub: '사이버캡은 운전대·페달이 없는 테슬라의 전용 로보택시입니다. 이번 주에도 필라델피아 인근·로스앤젤레스·노스리지·메릴랜드에서 새로운 목격이 이어졌습니다.',
  cards: [
    { label:'필라델피아 근교', big:'1시간권', mid:'펜실베이니아 목격', sub:'로보택시레이더 24시간 집계' },
    { label:'로스앤젤레스', big:'논스톱', mid:'끊임없는 순환 운행', sub:'실도로 데이터 축적 중' },
    { label:'그린벨트(MD)', big:'충전 중', mid:'심야 슈퍼차저 목격', sub:'동부까지 서비스망 확장 신호' },
  ],
  detailHead: '최근 24시간 목격 지역',
  detailLines: ['필라델피아 북쪽 1시간 거리, 로스앤젤레스 근교 노스리지 주택가', '캘리포니아 로스앤젤레스 전역에서 반복 순환 운행 목격', '메릴랜드 그린벨트 슈퍼차저에서 심야 충전 장면 포착'],
  quote: '로보택시레이더 계정은 "지난 24시간 동안 필라델피아 북쪽 1시간 거리와 로스앤젤레스 근교 노스리지에서 사이버캡이 목격됐다"고 전했습니다.',
  noteSub: '테슬라는 서비스 시작 전 보통 검증 차량으로 도로 데이터를 먼저 모읍니다. 목격 지역이 매주 늘어나는 것은 다음 서비스 확장 도시를 준비하고 있다는 신호로 해석됩니다.',
  footer: '테슬라 · 사이버캡 확산',
}, {
  badge: 'TSLA', title: 'Tesla\u2019s Cybercab is turning up everywhere from Philadelphia to Los Angeles',
  heroIcon: '\u{1F695}', heroBig: 'Nationwide Spread',
  heroSub: 'Cybercab is Tesla\u2019s dedicated robotaxi with no steering wheel or pedals. New sightings this week span Philadelphia\u2019s suburbs, LA, Northridge, and Maryland.',
  cards: [
    { label:'Near Philadelphia', big:'1hr away', mid:'PA sightings', sub:'Tracked by Robotaxi Radar' },
    { label:'Los Angeles', big:'Nonstop', mid:'Continuous loops', sub:'Gathering real-world data' },
    { label:'Greenbelt, MD', big:'Charging', mid:'Late-night Supercharger', sub:'Hints at East Coast reach' },
  ],
  detailHead: 'Sightings in the past 24 hours',
  detailLines: ['1 hour north of Philadelphia, PA and a suburban neighborhood in Northridge, LA', 'Repeated loop driving spotted across Los Angeles', 'Late-night charging caught at a Greenbelt, MD Supercharger'],
  quote: 'Robotaxi Radar reported: "Cybercab sightings in the past 24 hours: 1 hour north of Philadelphia, PA and a suburban neighborhood in Northridge, LA."',
  noteSub: 'Tesla typically gathers road data with test vehicles before launching service. More cities showing up each week hints at where expansion may come next.',
  footer: 'Tesla · Cybercab Spread',
});

// 3) L1 — Cybercab Australia/New Zealand
add('cybercab-australia-newzealand', 'L1', 'TSLA', {
  badge: '테슬라', title: '테슬라 사이버캡이 호주와 뉴질랜드에서도 처음 전시됐습니다',
  heroIcon: '\u{1F1E6}\u{1F1FA}', heroBig: '호주·뉴질랜드 상륙',
  heroSub: '사이버캡이 처음으로 호주·뉴질랜드 전시장에 등장했습니다. 짙은 금빛 차체에 로보택시 전용 디자인이 그대로 노출됐습니다.',
  cards: [
    { icon:'\u{1F3EC}', big:'현지 최초 전시', mid:'테슬라 오스트레일리아', sub:'실차 공개 형태로 진행' },
    { icon:'\u{1F30F}', big:'글로벌 확대', mid:'북미 중심에서 확장', sub:'해외 시장 사전 노출 단계' },
    { icon:'\u{1F4F1}', big:'영상 공개', mid:'0:20 클립 게시', sub:'조회 3.6만 · 재게시 63회' },
  ],
  quote: '테슬라 오스트레일리아 계정은 "사이버캡, 이제 호주와 뉴질랜드에서도 전시 중"이라며 짧은 영상을 공개했습니다.',
  noteHead: '왜 중요한가', noteSub: '지금까지 사이버캡은 미국 도로 시험이 중심이었습니다. 호주·뉴질랜드 전시는 실제 판매·서비스 전 사전 노출 단계로, 해외 시장 확대 시점을 가늠할 첫 신호로 볼 수 있습니다.',
  footer: '테슬라 · 해외 전시',
}, {
  badge: 'TSLA', title: 'Tesla\u2019s Cybercab made its first public appearance in Australia and New Zealand',
  heroIcon: '\u{1F1E6}\u{1F1FA}', heroBig: 'Down Under Debut',
  heroSub: 'Cybercab showed up at showrooms in Australia and New Zealand for the first time, its dark gold, pedal-free robotaxi design fully on display.',
  cards: [
    { icon:'\u{1F3EC}', big:'First local display', mid:'Tesla Australia', sub:'Shown as a physical unit' },
    { icon:'\u{1F30F}', big:'Global reach', mid:'Beyond North America', sub:'Early overseas exposure' },
    { icon:'\u{1F4F1}', big:'Video posted', mid:'0:20 clip shared', sub:'36K views, 63 reposts' },
  ],
  quote: 'Tesla Australia posted: "Cybercab now on display in Australia and New Zealand," sharing a short clip of the vehicle.',
  noteHead: 'Why it matters', noteSub: 'Cybercab testing has mostly centered on US roads so far. This showroom appearance is an early overseas exposure step before any actual sales or service launch abroad.',
  footer: 'Tesla · Overseas Display',
});

// 4) L4 — SpaceX Space Force deal + Shotwell "should never have existed"
add('spacex-space-force-shotwell', 'L4', 'SPCX', {
  badge: '스페이스X', title: '미 우주군이 22억 달러 규모 군사 위성망 설계를 스페이스X 자율에 맡겼습니다',
  badgeLine: '"스페이스X는 원래 존재하지 않았어야 했다" — 그윈 숏웰',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '설계 자율권 확보',
  heroSub: '스페이스X가 군사 데이터 통신망의 위성 설계·개수를 스스로 정할 수 있는 자율권을 얻었습니다. 이 계약은 지난 5월 22억 달러 규모로 체결됐습니다.',
  cards: [
    { icon:'\u{1F4B0}', big:'22억불', mid:'5월 체결 계약', sub:'미 우주군 군사데이터망' },
    { icon:'\u{1F91D}', big:'설계 자율', mid:'위성 수·사양 자체결정', sub:'기존엔 규격이 정해져 있었음' },
    { icon:'\u{1F4C8}', big:'143.49달러', mid:'스페이스X 장외가', sub:'한달간 2.49% 상승' },
  ],
  quote: '숏웰은 한 인터뷰에서 "스페이스X는 존재하지 않았어야 했다"며, 기존 발사업체들이 안일했기 때문에 새 진입자에게 기회가 열렸다고 말했습니다.',
  noteSub: '9·11 이후 미군은 더 빠른 발사 대응력을 원했지만 기존 업체들은 충분히 빠르지 못했습니다. 스페이스X가 그 틈을 파고들며 지금의 군사 계약 신뢰를 쌓았다는 설명입니다.',
  footer: '스페이스X · 우주군',
}, {
  badge: 'SPCX', title: 'The US Space Force gave SpaceX freedom to design its own $2.2B military satellite network',
  badgeLine: '"SpaceX should never have existed" — Gwynne Shotwell',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: 'Design Autonomy Won',
  heroSub: 'SpaceX can now choose its own satellite design and count for a military data network, under a $2.2B deal awarded back in May.',
  cards: [
    { icon:'\u{1F4B0}', big:'$2.2B', mid:'Deal signed in May', sub:'Space Force data network' },
    { icon:'\u{1F91D}', big:'Design freedom', mid:'Own satellite specs/count', sub:'Previously fixed by spec' },
    { icon:'\u{1F4C8}', big:'$143.49', mid:'SpaceX secondary price', sub:'Up 2.49% over the month' },
  ],
  quote: 'Shotwell said in an interview SpaceX "only had a real opening because existing launch providers left major gaps," calling their service inadequate.',
  noteSub: 'After 9/11, the military wanted much faster launch response than incumbents could offer. SpaceX filled that gap and built the trust behind today\u2019s military contracts.',
  footer: 'SpaceX · Space Force',
});

// 5) L6 — Tesla Norway 200k
add('tesla-norway-200k', 'L6', 'TSLA', {
  badge: '테슬라 · 노르웨이', title: '테슬라가 노르웨이에서 등록 차량 20만대를 돌파했습니다',
  breaking: '노르웨이 등록 20만대 돌파',
  heroBig: '200,000+', heroSub: '노르웨이 전체 전기차 5대 중 1대가 테슬라입니다. 2013년 모델S가 처음 들어온 지 13년 만의 기록입니다.',
  grid: [
    { icon:'\u{1F1F3}\u{1F1F4}', big:'1/5', mid:'전기차 중 비중', sub:'노르웨이 EV 5대 중 1대' },
    { icon:'\u{1F4C6}', big:'9년', mid:'첫 10만대까지', sub:'2013년 모델S부터' },
    { icon:'\u{26A1}', big:'4년 미만', mid:'다음 10만대까지', sub:'속도가 두 배 이상 빨라짐' },
    { icon:'\u{1F697}', big:'과반', mid:'모델Y 비중', sub:'노르웨이 테슬라의 절반 이상' },
  ],
  ctx1: '첫 10만대까진 9년 걸렸지만 다음 10만대는 4년도 안 걸렸습니다.',
  ctx2: '모델Y 한 종류만으로 노르웨이 테슬라 등록차량의 절반을 넘겼다는 점도 눈에 띕니다.',
  quote: '한 테슬라 팬 계정은 "모델S가 처음 온 2013년부터 오늘까지, 노르웨이는 이제 사실상 테슬라의 나라가 됐다"고 평가했습니다.',
  noteHead: '왜 중요한가', noteSub: '노르웨이는 전기차 보급률이 세계에서 가장 높은 나라 중 하나입니다. 이 시장에서 테슬라의 점유율이 계속 오르고 있다는 것은, 보조금이 줄어드는 다른 유럽 시장에서도 테슬라의 브랜드 힘이 통할 수 있다는 참고 사례가 됩니다.',
  footer: '테슬라 · 노르웨이 20만대',
}, {
  badge: 'TSLA · NORWAY', title: 'Tesla just crossed 200,000 registered vehicles in Norway',
  breaking: 'Norway registrations top 200K',
  heroBig: '200,000+', heroSub: 'That\u2019s roughly one in five EVs in the country. It took 13 years since the first Model S arrived in 2013.',
  grid: [
    { icon:'\u{1F1F3}\u{1F1F4}', big:'1 in 5', mid:'Share of all EVs', sub:'Among Norway\u2019s EV fleet' },
    { icon:'\u{1F4C6}', big:'9 years', mid:'To first 100K', sub:'Since the 2013 Model S' },
    { icon:'\u{26A1}', big:'Under 4yr', mid:'To next 100K', sub:'More than double the pace' },
    { icon:'\u{1F697}', big:'Majority', mid:'Model Y share', sub:'Over half of Teslas there' },
  ],
  ctx1: 'The first 100,000 cars took 9 years, but the next 100,000 took under 4.',
  ctx2: 'Model Y alone now accounts for more than half of all Teslas on Norwegian roads.',
  quote: 'A Tesla fan account wrote: "From the first Model S arriving in 2013...to 200,000 Teslas today, Norway has basically become Tesla country."',
  noteHead: 'Why it matters', noteSub: 'Norway has one of the highest EV adoption rates in the world. Tesla\u2019s continued share gains there is a useful signal for whether its brand strength can hold up as subsidies fade elsewhere in Europe.',
  footer: 'Tesla · Norway 200K',
});

// 6) L2 — Tesla Houston solar factory
add('tesla-solar-factory-houston', 'L2', 'TSLA', {
  badge: '테슬라', title: '테슬라가 텍사스 휴스턴 인근에 101억 달러 규모 태양광 공장을 짓기로 한 걸음 더 다가섰습니다',
  heroIcon: '\u{2600}\u{FE0F}', heroBig: '프로젝트 크리스털 선',
  heroSub: '라마 교육구 이사회가 테슬라의 세제 혜택 신청을 만장일치로 승인했습니다. 웨이퍼부터 셀·잉곳까지 만드는 수직 통합형 태양광 공장입니다.',
  cards: [
    { label:'투자 규모', big:'101억불', mid:'총 자본 투자액', sub:'약 3,000에이커 부지' },
    { label:'일자리', big:'9,712개', mid:'정규직 창출', sub:'직접·간접 고용 포함' },
    { label:'세수 효과', big:'6.4억불', mid:'주·지방세 기여', sub:'텍사스 GDP 약 107억불 증가' },
  ],
  detailHead: '공장에 포함될 공정',
  detailLines: ['웨이퍼 제조·잉곳 제조·코팅·금속화·인쇄 라인', '셀 테스트·품질관리, 자동화·자재 취급 설비', '올해 착공해 2028년 완공, 2029년 1분기 상업 가동 목표'],
  quote: '라마 교육구 이사는 "이 정도 규모 사업은 우리 지역에 순이익이 될 것이다. 학생들이 혜택을 받는 걸 기대한다"고 승인 이유를 밝혔습니다.',
  noteSub: '태양광 셀의 웨이퍼부터 완제품까지 한 공장에서 만드는 수직 통합 방식은 부품 조달 리스크를 줄이고 원가를 낮추는 효과가 있습니다. 실제 착공 시점과 고용 이행 여부가 다음 확인 포인트입니다.',
  footer: '테슬라 · 태양광 공장',
}, {
  badge: 'TSLA', title: 'Tesla moved a step closer to building a $10.1B solar factory near Houston, Texas',
  heroIcon: '\u{2600}\u{FE0F}', heroBig: 'Project Crystal Sun',
  heroSub: 'The Lamar school board unanimously approved Tesla\u2019s tax incentive request for a vertically integrated solar factory covering wafers through cells.',
  cards: [
    { label:'Investment', big:'$10.1B', mid:'Total capital investment', sub:'About 3,000 acres of land' },
    { label:'Jobs', big:'9,712', mid:'Permanent full-time jobs', sub:'Direct and indirect hiring' },
    { label:'Tax impact', big:'$6.4B', mid:'State & local tax revenue', sub:'~$107B added to Texas GDP' },
  ],
  detailHead: 'What the plant will include',
  detailLines: ['Wafer manufacturing, ingot manufacturing, coating, metallization and printing lines', 'Cell testing/QC plus automation and material handling equipment', 'Construction starts this year, finishing in 2028, commercial ops targeted for Q1 2029'],
  quote: 'A Lamar board member said: "I believe a project of this size will be a net positive impact for our county, including the 10,000 jobs...I look forward to our students benefitting."',
  noteSub: 'Building wafers through finished cells under one roof cuts supply-chain risk and lowers cost. Watch for the actual groundbreaking date and whether the hiring targets are met.',
  footer: 'Tesla · Solar Factory',
});

// 7) L3 — Raptor engine evolution
add('raptor-engine-evolution', 'L3', 'SPCX', {
  badge: '스페이스X', title: '스타십 랩터 엔진이 1세대에서 3세대로 오면서 오히려 부품이 크게 줄었습니다',
  heroIcon: '\u{1F525}', heroBig: '랩터 1→2→3',
  heroSub: '랩터는 스타십을 밀어올리는 스페이스X의 로켓 엔진입니다. 겉보기엔 복잡했던 초기형이 오히려 불필요한 부품을 걷어내며 더 단순한 완성형으로 진화했습니다.',
  cards: [
    { icon:'\u{1F529}', big:'부품 대폭 감소', mid:'배관 단순화', sub:'꼬여있던 배선을 정리' },
    { icon:'\u{1F4AA}', big:'추력 상승', mid:'챔버 압력 강화', sub:'같은 크기에서 힘은 더 커짐' },
    { icon:'\u{1F52C}', big:'완전 유동 순환', mid:'풀플로 스테이지드 컴버스천', sub:'가장 효율적인 연소 방식' },
  ],
  quote: '한 스페이스X 팬 계정은 "랩터1은 복잡해 보였지만 그래야만 했던 것이고, 랩터2는 필요없는 걸 다 걷어내 단순해 보인다"고 설명했습니다.',
  noteSub: '로켓 엔진은 부품이 적을수록 고장날 곳이 줄고 만들기도 쉬워집니다. 랩터3에서는 이런 단순화 철학이 더 극단적으로 적용됐다고 알려져, 스타십의 양산 속도를 좌우할 핵심 변수로 꼽힙니다.',
  footer: '스페이스X · 랩터 엔진',
}, {
  badge: 'SPCX', title: 'SpaceX\u2019s Raptor engine actually got simpler as it evolved from version 1 to 3',
  heroIcon: '\u{1F525}', heroBig: 'Raptor 1\u21922\u21923',
  heroSub: 'Raptor is the engine that powers Starship. The early version looked complex because it had to be \u2014 later versions stripped out everything unnecessary.',
  cards: [
    { icon:'\u{1F529}', big:'Fewer parts', mid:'Cleaner plumbing', sub:'Untangled prior wiring' },
    { icon:'\u{1F4AA}', big:'Higher thrust', mid:'Higher chamber pressure', sub:'More power, same footprint' },
    { icon:'\u{1F52C}', big:'Full-flow cycle', mid:'Staged combustion', sub:'The most efficient burn method' },
  ],
  quote: 'A SpaceX fan account explained: "Raptor 1 looked complex because it had to be...Raptor 2 looked simple because SpaceX deleted everything that wasn\u2019t necessary."',
  noteSub: 'Fewer parts mean fewer failure points and easier manufacturing for a rocket engine. Raptor 3 reportedly pushes this simplification even further, a key variable for how fast Starship can be mass-produced.',
  footer: 'SpaceX · Raptor Engine',
});

// 8) L4 — Optimus will use Starlink
add('optimus-starlink-integration', 'L4', 'TSLA', {
  badge: '테슬라 · 옵티머스', title: '테슬라의 인간형 로봇 옵티머스가 스타링크를 핵심 통신망으로 쓸 것이라는 관측이 나왔습니다',
  badgeLine: '"스타링크는 옵티머스에 선택이 아니라 필수다" — 그윈 숏웰 인용',
  heroIcon: '\u{1F916}', heroBig: '옵티머스는 스타링크를 씁니다',
  heroSub: '스타링크는 스페이스X의 위성 인터넷망입니다. 스페이스X 사장 숏웰의 9월 15일 발언에 따르면 옵티머스 두뇌의 일부가 이미 스타마인드(스타링크 기반 통신 체계)에 들어 있다는 것입니다.',
  cards: [
    { icon:'\u{1F9E0}', big:'스타마인드', mid:'로봇 두뇌 일부', sub:'통신이 부가기능 아닌 핵심' },
    { icon:'\u{1F4E1}', big:'두 가지 방식', mid:'축소형 위성 단말 또는', sub:'5G→스타링크 중계' },
    { icon:'\u{1F517}', big:'둘 다 가능', mid:'혼합 구성도 검토', sub:'아직 확정 방식은 비공개' },
  ],
  quote: '숏웰은 "이건 단순한 연결성 이상이다. 옵티머스가 결심하면 네트워크는 더는 로봇이 연결하는 대상이 아니라 로봇의 일부가 된다"고 말했습니다.',
  noteSub: '지금까지 스타링크는 주로 인터넷이 닿기 힘든 지역의 통신 수단으로 알려졌습니다. 로봇의 두뇌 통신망으로 쓰인다면 스타링크의 활용 범위가 가정·공장용 로봇까지 넓어질 수 있어, 스페이스X와 테슬라 두 회사의 접점이 한층 커지는 대목입니다.',
  footer: '테슬라 · 옵티머스 · 스타링크',
}, {
  badge: 'TSLA · OPTIMUS', title: 'Tesla\u2019s humanoid robot Optimus is reportedly set to rely on Starlink as its core network',
  badgeLine: '"Starlink is not optional...for Optimus" — attributed to Gwynne Shotwell',
  heroIcon: '\u{1F916}', heroBig: 'Optimus Will Use Starlink',
  heroSub: 'Starlink is SpaceX\u2019s satellite internet network. Per a Sept 15 remark, part of Optimus\u2019s brain already runs on "Starmind," a Starlink-based comms layer.',
  cards: [
    { icon:'\u{1F9E0}', big:'Starmind', mid:'Part of the robot\u2019s brain', sub:'Comms as core, not an add-on' },
    { icon:'\u{1F4E1}', big:'Two options', mid:'A scaled-down satellite terminal', sub:'or 5G-to-Starlink relay' },
    { icon:'\u{1F517}', big:'Or both', mid:'Hybrid setup possible', sub:'Exact method not yet confirmed' },
  ],
  quote: 'The remark read: "This is bigger than connectivity...It becomes part of Optimus," once the robot fully adopts the network.',
  noteSub: 'Starlink has mostly been known as connectivity for hard-to-reach areas. Using it as a robot\u2019s brain network would widen its use into home and factory robots \u2014 deepening the overlap between SpaceX and Tesla.',
  footer: 'Tesla · Optimus · Starlink',
});

// 9) L4 — Model Y collision survival
add('model-y-collision-survival', 'L4', 'TSLA', {
  badge: '테슬라 · 안전', title: '시속 135km 정면충돌에서 살아남은 모델Y 운전자가 다음 차도 모델Y를 골랐습니다',
  badgeLine: '상대 차량은 시속 약 84마일(135km)로 불법 좌회전 중이었습니다',
  heroIcon: '\u{1F695}', heroBig: '84mph 정면충돌 생존',
  heroSub: '모델Y는 테슬라의 준중형 SUV입니다. 불법 좌회전 차량과 정면으로 부딪히는 큰 충돌이었지만, 탑승자는 골절과 찰과상 정도로 빠져나왔습니다.',
  cards: [
    { icon:'\u{1F6A8}', big:'시속 84마일', mid:'상대 차량 속도', sub:'불법 좌회전 시도 중 충돌' },
    { icon:'\u{2695}\u{FE0F}', big:'경상 수준', mid:'골절과 찰과상', sub:'생명에는 지장 없음' },
    { icon:'\u{1F697}', big:'같은 차종 재구매', mid:'교체 차량도 모델Y', sub:'탑승자 본인의 선택' },
  ],
  quote: '보도에 따르면 여성 운전자는 "차체가 부서지는 와중에도 크게 다치지 않았다"며 모델Y의 충돌 구조를 신뢰해 다음 차도 같은 모델을 골랐다고 전해졌습니다.',
  noteSub: '자동차의 충돌 안전성은 실제 사고 사례로 검증됩니다. 이번 사례처럼 고속 정면충돌에서 큰 부상 없이 빠져나온 경험이 쌓이면, 안전성을 중요하게 보는 소비자층에게 신뢰를 더해주는 요인이 됩니다.',
  footer: '테슬라 · 모델Y 안전성',
}, {
  badge: 'TSLA · SAFETY', title: 'A Model Y driver who survived an 84mph head-on crash picked another Model Y as her next car',
  badgeLine: 'The other vehicle was attempting an illegal left turn at roughly 84mph',
  heroIcon: '\u{1F695}', heroBig: 'Survived an 84mph Crash',
  heroSub: 'Model Y is Tesla\u2019s compact SUV. Despite a severe head-on collision with a car attempting an illegal turn, the driver escaped with only fractures and scrapes.',
  cards: [
    { icon:'\u{1F6A8}', big:'84mph', mid:'Other vehicle\u2019s speed', sub:'During an illegal left turn' },
    { icon:'\u{2695}\u{FE0F}', big:'Minor injuries', mid:'Fractures and scrapes', sub:'No life-threatening harm' },
    { icon:'\u{1F697}', big:'Bought another', mid:'Replacement car: Model Y', sub:'Her own choice afterward' },
  ],
  quote: 'Reports say the woman "escaped the wreckage with nothing worse than a few fractures and tears," crediting the Model Y\u2019s structure for helping save her life.',
  noteSub: 'Crash safety gets validated through real-world incidents like this one. Stories of surviving high-speed head-on impacts without serious injury build trust with safety-focused buyers.',
  footer: 'Tesla · Model Y Safety',
});

// 10) L5 — TSLA $357 price analysis + Tom Lee Q4 rally
add('tsla-357-price-tom-lee-rally', 'L5', 'TSLA', {
  badge: '테슬라 · 주가', title: '테슬라가 357달러에서 거래되는 가운데, 4분기 "생애 최대 랠리"가 시작될 수 있다는 전망이 나왔습니다',
  heroIcon: '\u{1F4CA}', heroBig: '357.12달러',
  heroSub: '전일 대비 0.15% 오른 수준입니다. 애널리스트들은 350달러 아래로 밀리면 매도가 커질 수 있다고 경고하는 한편, 4분기 실적과 인도량이 사상 최고를 낼 수 있다는 기대도 함께 나옵니다.',
  before: { label:'하락 위험 구간', big:'$330~350', sub:'이 구간 이탈 시 매도 확대 우려' },
  after: { label:'긍정 시나리오', big:'50만대+', sub:'3·4분기 사상 최대 인도량 기대' },
  cards: [
    { icon:'\u{1F4C9}', big:'$350 붕괴', mid:'추가 매도 트리거', sub:'애널리스트 경고 구간' },
    { icon:'\u{1F6E2}\u{FE0F}', big:'유가 상승', mid:'실적 개선 배경', sub:'에너지 관련 수익 기여' },
    { icon:'\u{1F680}', big:'"생애 최대 랠리"', mid:'톰 리, 4분기 전망($SPY)', sub:'시장 전반에 대한 낙관' },
  ],
  quote: '한 애널리스트는 "350달러 초반으로 밀리는 건 보고 싶지 않다. 그 밑으로 가면 330달러까지 매도가 커질 수 있지만, 그때가 오히려 매수 기회일 것"이라고 말했습니다.',
  noteSub: '펀더멘털 논쟁과 별개로 펀드매니저 톰 리는 4분기가 "우리 생애 최대 랠리의 시작"이라며 극단적으로 낙관적인 전망을 내놨습니다. 실제 3분기 인도량 발표와 4분기 초반 지수 흐름이 두 시나리오 중 어느 쪽이 맞는지 보여줄 것입니다.',
  footer: '테슬라 · 주가 시나리오',
}, {
  badge: 'TSLA · PRICE', title: 'With Tesla trading at $357, one strategist says Q4 could be the start of "the biggest rally of our lifetime"',
  heroIcon: '\u{1F4CA}', heroBig: '$357.12',
  heroSub: 'Up 0.15% on the day. Analysts warn a break below $350 could trigger more selling, even as Q4 deliveries and earnings are expected to hit record highs.',
  before: { label:'Downside risk zone', big:'$330-350', sub:'A break lower could spark selling' },
  after: { label:'Bull case', big:'500K+', sub:'Record Q3/Q4 delivery quarter expected' },
  cards: [
    { icon:'\u{1F4C9}', big:'Break of $350', mid:'Sell-off trigger', sub:'Zone flagged by analysts' },
    { icon:'\u{1F6E2}\u{FE0F}', big:'Rising oil prices', mid:'Earnings tailwind', sub:'Boosts energy-related revenue' },
    { icon:'\u{1F680}', big:'"Biggest rally"', mid:'Tom Lee\u2019s Q4 call ($SPY)', sub:'Broadly bullish on markets' },
  ],
  quote: 'One analyst said: "We do not want to see TSLA reach low $350 range as that would likely trigger a bigger sell off...it would be an excellent time to buy if that does happen."',
  noteSub: 'Separately, strategist Tom Lee called Q4 "the start of one of the biggest rallies of our lifetime" for $SPY. The Q3 delivery report and early Q4 price action will show which scenario plays out.',
  footer: 'Tesla · Price Scenarios',
});

// 11) L2 — FSD Spain testing + Ron Baron quote
add('fsd-spain-ron-baron', 'L2', 'TSLA', {
  badge: '테슬라 · FSD', title: '테슬라 FSD가 스페인 전역에서 2년간 46만km를 달리며 검증됐고, 유명 투자자도 극찬했습니다',
  heroIcon: '\u{1F1EA}\u{1F1F8}', heroBig: '2년 · 46만km',
  heroSub: 'FSD(완전자율주행 소프트웨어, 운전자 감독 필요)는 스페인 전역 도로에서 2년간 46만km(약 28.6만마일)를 달리며 데이터를 쌓았습니다.',
  cards: [
    { label:'테스트 기간', big:'2년', mid:'스페인 전역 시험', sub:'감독 하 자율주행(Supervised)' },
    { label:'주행 거리', big:'46만km', mid:'약 28.6만마일', sub:'다양한 도로·기후 포함' },
    { label:'투자자 반응', big:'"믿기지 않는다"', mid:'론 배런(CNBC)', sub:'모두가 원할 것이라 평가' },
  ],
  detailHead: '스페인 시험 요약',
  detailLines: ['2년째 진행 중인 감독형 FSD 시험, 손짓 신호까지 인식', '고속도로·시내 도로를 포함한 실제 교통 상황에서 촬영', '유명 투자자 론 배런은 CNBC에서 "모두가 원할 기술"이라 평가'],
  quote: '론 배런은 CNBC 스쿼크박스에서 "이 차는 믿기지 않는다. 모두가 원하게 될 것"이라며 테슬라 FSD를 극찬했습니다.',
  noteSub: '자율주행 소프트웨어는 다양한 도로·날씨에서 누적한 주행거리가 늘수록 안전성 검증이 쌓입니다. 스페인처럼 새로운 지역에서 장기간 데이터를 모으는 것은 유럽 내 정식 서비스 승인으로 가는 사전 단계로 볼 수 있습니다.',
  footer: '테슬라 · FSD 스페인',
}, {
  badge: 'TSLA · FSD', title: 'Tesla FSD has logged 460,000km across Spain over two years, and a top investor is raving about it',
  heroIcon: '\u{1F1EA}\u{1F1F8}', heroBig: '2 Years · 460,000km',
  heroSub: 'FSD (Full Self-Driving, Supervised) has been tested across Spain\u2019s roads for two years, covering 460,000km (about 286,000 miles).',
  cards: [
    { label:'Test duration', big:'2 years', mid:'Testing across Spain', sub:'FSD Supervised mode' },
    { label:'Distance driven', big:'460,000km', mid:'About 286,000 miles', sub:'Across varied roads/weather' },
    { label:'Investor reaction', big:'"Unbelievable"', mid:'Ron Baron (CNBC)', sub:'Says everyone will want it' },
  ],
  detailHead: 'Spain testing highlights',
  detailLines: ['Two years of ongoing Supervised FSD testing, even reading hand gestures', 'Footage spans highways and city streets in real traffic', 'Investor Ron Baron told CNBC it\u2019s "a technology everyone is going to want"'],
  quote: 'Ron Baron told CNBC\u2019s Squawk Box: "This car is unbelievable. Everyone is going to want it," praising Tesla\u2019s FSD.',
  noteSub: 'Self-driving software gets safer as more real-world miles accumulate across diverse roads and weather. Long-term data collection in a new market like Spain is often a precursor to formal approval in Europe.',
  footer: 'Tesla · FSD in Spain',
});

// 12) L2 — Starlink collision avoidance + Qatar Airways
    add('starlink-collision-avoidance-qatar', 'L2', 'SPCX', {
      badge: '스페이스X · 스타링크', title: '스타링크 위성이 6개월간 20만7,152회 충돌을 피했고, 카타르항공 이용객은 2,500만명을 넘었습니다',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '20.7만회 · 2,500만명',
  heroSub: '스타링크는 스페이스X의 위성 인터넷망입니다. 안전 운영과 상업적 확산을 동시에 보여주는 두 지표가 함께 공개됐습니다.',
  cards: [
    { label:'충돌회피', big:'20.7만회', mid:'6개월간 자동 기동', sub:'10만분의 3 확률에서도 회피' },
    { label:'항공 연결', big:'2,500만명+', mid:'카타르항공 이용객', sub:'스타링크 와이파이 이용' },
    { label:'운항 편수', big:'9.6만편+', mid:'스타링크 탑재 항공편', sub:'하루 최대 340편 지원' },
  ],
  detailHead: '한 달간 성장 속도',
  detailLines: ['8월 20일 2,300만명·8.6만편 → 9월 16일 2,500만명·9.6만편', '27일 만에 이용객 200만명·운항 1만편 이상 증가', '스타링크 지원 항공기 150대 이상, 광폭기 중심 확대'],
  quote: '스페이스X는 "위성이 근접 접근을 감지해 위험도를 계산하고 필요하면 궤도를 조정한다. 1,000만분의 3이라는 매우 신중한 기준에서도 회피에 나선다"고 설명했습니다.',
  noteSub: '충돌회피 횟수가 늘어난 것은 위성 수가 늘며 우주 공간이 붐빈다는 뜻이기도 합니다. 동시에 항공사 채택이 늘어난다는 것은 스타링크가 통신 인프라로서 상업적 수익을 만들어내고 있다는 신호입니다.',
  footer: '스페이스X · 스타링크',
}, {
      badge: 'SPCX · STARLINK', title: 'Starlink made 207,152 collision-avoidance moves in six months, as Qatar Airways passed 25M connected fliers',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '207K · 25M',
  heroSub: 'Starlink is SpaceX\u2019s satellite internet network. Two numbers released together show both its safety operations and commercial growth.',
  cards: [
    { label:'Avoidance', big:'207,152', mid:'Auto maneuvers, 6mo', sub:'Acts even at 3-in-10M risk' },
    { label:'Air connectivity', big:'25M+', mid:'Qatar Airways passengers', sub:'Connected via Starlink WiFi' },
    { label:'Flights', big:'96,000+', mid:'Starlink-enabled flights', sub:'Up to 340 flights/day' },
  ],
  detailHead: 'Growth over one month',
  detailLines: ['Aug 20: 23M passengers, 86K flights \u2192 Sept 16: 25M passengers, 96K flights', 'Roughly +2M passengers and +10K flights in just 27 days', '150+ widebody aircraft equipped, expanding fleet-wide'],
  quote: 'SpaceX explained the system "detects potential close approaches, calculates the level of risk, and adjusts orbital paths...at a highly cautious threshold of just 3 in 10 million."',
  noteSub: 'More avoidance maneuvers partly reflect a more crowded orbital environment as satellite counts grow. At the same time, rising airline adoption shows Starlink turning into real commercial revenue as infrastructure.',
  footer: 'SpaceX · Starlink',
});

// 13) L5 — Starship flight14 market reaction
add('starship-flight14-market-reaction', 'L5', 'SPCX', {
  badge: '스페이스X · 스타십', title: '스타십 14차 시험비행(9/22) 발표에 스페이스X 장외 시가총액이 500억 달러 넘게 뛰었습니다',
  heroIcon: '\u{1F680}', heroBig: '시총 +500억불',
  heroSub: '스타십은 스페이스X의 재사용 초대형 로켓입니다. 9월 22일로 예정된 14차 비행은 처음으로 완전한 지구 궤도에 들어가 스타링크 V3 위성을 배치하는 시도입니다.',
  before: { label:'팰컨9 방식', big:'10회 발사', sub:'위성 277기, 발사 10번 필요' },
  after: { label:'스타십 1회', big:'위성 26기', sub:'같은 통신 용량을 한 번에' },
  cards: [
    { icon:'\u{1F4C8}', big:'+5.15%', mid:'스페이스X 주가 급등', sub:'150.88달러로 마감' },
    { icon:'\u{1F3DB}\u{FE0F}', big:'의원 7명', mid:'상장 후 스페이스X 매입', sub:'미 연방의회 기준' },
    { icon:'\u{1F4B0}', big:'"불가능하지 않다"', mid:'머스크, 매출 전망 발언', sub:'발사당 10억달러 매출 시나리오' },
  ],
  quote: '머스크는 "스타십 발사 1회가 10억 달러의 매출을 낼 수 있다. 연 1만 회 비행이 목표"라는 관측에 "불가능하지 않다"고 답했습니다.',
  noteSub: '스타십 1회 발사로 실어나를 수 있는 위성 통신 용량이 팰컨9 로켓 10번어치와 같다는 계산이 나왔습니다. 이 효율이 실제 비용 절감으로 이어지는지가 다음 확인 포인트이며, 9월 22일 실제 비행 성공 여부가 첫 시험대입니다.',
  footer: '스페이스X · 스타십 14차',
}, {
  badge: 'SPCX · STARSHIP', title: 'SpaceX\u2019s secondary market cap jumped over $50B on news of Starship\u2019s 14th test flight (Sept 22)',
  heroIcon: '\u{1F680}', heroBig: '+$50B+ Market Cap',
  heroSub: 'Starship is SpaceX\u2019s reusable super-heavy rocket. The Sept 22 flight 14 will attempt its first full orbital mission, deploying Starlink V3 satellites.',
  before: { label:'Via Falcon 9', big:'10 launches', sub:'277 satellites, 10 separate flights' },
  after: { label:'One Starship flight', big:'26 satellites', sub:'Same network capacity at once' },
  cards: [
    { icon:'\u{1F4C8}', big:'+5.15%', mid:'SpaceX share jump', sub:'Closed at $150.88' },
    { icon:'\u{1F3DB}\u{FE0F}', big:'7 lawmakers', mid:'Bought SpaceX since IPO', sub:'Members of US Congress' },
    { icon:'\u{1F4B0}', big:'"Not impossible"', mid:'Musk on revenue potential', sub:'$1B-per-launch scenario' },
  ],
  quote: 'Asked whether each Starship launch could generate "$1 billion in revenue" at 10,000 flights/year, Musk replied simply: "It\u2019s not impossible."',
  noteSub: 'One Starship launch can carry as much satellite capacity as 10 separate Falcon 9 launches. Whether that translates into real cost savings is next to watch, starting with whether the Sept 22 flight succeeds.',
  footer: 'SpaceX · Starship Flight 14',
});

// 14) L6 — Morgan Stanley NVDA HBM 37.3%
add('morgan-stanley-nvda-hbm-37pct', 'L6', 'NVDA', {
  badge: '엔비디아 · HBM', title: '모건스탠리가 엔비디아의 고대역폭메모리(HBM) 수요 점유율을 37.3%로 추산했습니다',
  breaking: '모건스탠리 HBM 수요 전망',
  heroBig: '37.3%', heroSub: 'HBM(고대역폭메모리)은 AI 반도체에 붙는 고성능 메모리입니다. 엔비디아 한 회사가 전체 수요의 3분의 1 이상을 가져간다는 분석입니다.',
  grid: [
    { icon:'\u{1F7E6}', big:'37.3%', mid:'엔비디아', sub:'HBM 수요 점유율 1위' },
    { icon:'\u{1F534}', big:'36%', mid:'구글', sub:'자체 AI 칩용 수요' },
    { icon:'\u{1F7E0}', big:'12.1%', mid:'AMD', sub:'경쟁 AI 가속기용' },
    { icon:'\u{26AA}', big:'15%', mid:'그 외 전체', sub:'나머지 업체 합산' },
  ],
  ctx1: '엔비디아·구글·AMD 세 회사가 전체 HBM 수요의 약 85%를 차지한다는 계산이 나옵니다.',
  ctx2: 'HBM을 만드는 SK하이닉스·마이크론·삼성전자 입장에서는 이 세 회사가 가장 중요한 고객이 되는 셈입니다.',
  quote: '모건스탠리 애널리스트 베스 킨디그는 "엔비디아 37.3%, 구글 36%, AMD 12.1%로 15%만 다른 업체들에 남는다"고 분석했습니다.',
  noteHead: '왜 중요한가', noteSub: 'HBM은 생산 능력이 제한적인 고부가 메모리라, 큰 고객사의 수요 비중이 곧 메모리 회사들의 매출 방향을 좌우합니다. 엔비디아의 점유율이 유지되는지, 구글·AMD의 자체 칩 수요가 얼마나 커지는지가 다음 관전 포인트입니다.',
  footer: '엔비디아 · HBM 수요',
}, {
  badge: 'NVDA · HBM', title: 'Morgan Stanley estimates Nvidia will consume 37.3% of total high-bandwidth memory demand',
  breaking: 'Morgan Stanley HBM demand call',
  heroBig: '37.3%', heroSub: 'HBM (high-bandwidth memory) is the premium memory chip that powers AI accelerators. One company alone takes more than a third of total demand.',
  grid: [
    { icon:'\u{1F7E6}', big:'37.3%', mid:'Nvidia', sub:'Top HBM demand share' },
    { icon:'\u{1F534}', big:'36%', mid:'Google', sub:'Demand for its own AI chips' },
    { icon:'\u{1F7E0}', big:'12.1%', mid:'AMD', sub:'For rival AI accelerators' },
    { icon:'\u{26AA}', big:'15%', mid:'Everyone else', sub:'Combined remaining players' },
  ],
  ctx1: 'Nvidia, Google, and AMD together account for roughly 85% of total HBM demand.',
      ctx2: 'For makers like SK Hynix, Micron, and Samsung, these three are the key customers.',
  quote: 'Analyst Beth Kindig relayed: "Morgan Stanley estimates Nvidia will consume 37.3% of total HBM demand, Google at 36%, and AMD at 12.1%, leaving only around 15% for other players."',
  noteHead: 'Why it matters', noteSub: 'HBM is a supply-constrained, high-value memory type, so big-customer demand shapes memory makers\u2019 revenue directly. Watch whether Nvidia holds its share and how fast Google/AMD grow their own chip demand.',
  footer: 'Nvidia · HBM Demand',
});

// 15) L3 — SpaceX Colossus pollution study
add('spacex-colossus-pollution-study', 'L3', 'SPCX', {
  badge: '스페이스X', title: '스페이스X 콜로서스1 데이터센터 주변에서 오염이 크게 늘지 않았다는 연구 결과가 나왔습니다',
  heroIcon: '\u{1F30D}', heroBig: '오염 증가 없음',
  heroSub: '콜로서스1은 스페이스X의 인공지능 컴퓨팅 시설입니다. 멤피스대 연구진이 가동 전후 12개월씩을 비교한 결과, 대기질에 뚜렷한 악화가 없었습니다.',
  cards: [
    { icon:'\u{1F32B}\u{FE0F}', big:'대기질 유지', mid:'뚜렷한 악화 없음', sub:'가동 전후 12개월 비교' },
    { icon:'\u{1F321}\u{FE0F}', big:'지표면 온도', mid:'뚜렷한 상승 없음', sub:'위성 데이터로 계측' },
    { icon:'\u{1F9EA}', big:'오염물질 감소', mid:'오존·이산화황·일산화탄소', sub:'모든 조사지점서 하락' },
  ],
  quote: '연구진은 "PM2.5·이산화질소·포름알데히드는 통계적으로 변화가 없었고, 조사한 모든 지점에서 오염물질 수준은 대체로 낮아졌다"고 밝혔습니다.',
  noteSub: '대형 데이터센터는 전력 소비가 많아 주변 환경 영향 논란이 따라다니는 시설입니다. 위성 데이터로 확인한 이번 결과는 스페이스X의 시설 확장 논의에서 환경 규제 리스크를 낮추는 근거로 쓰일 수 있습니다.',
  footer: '스페이스X · 콜로서스1',
}, {
  badge: 'SPCX', title: 'A study found no major pollution increase around SpaceX\u2019s Colossus 1 data center',
  heroIcon: '\u{1F30D}', heroBig: 'No Pollution Spike',
  heroSub: 'Colossus 1 is SpaceX\u2019s AI computing facility. University of Memphis researchers compared 12 months before and after operations began, finding no clear deterioration.',
  cards: [
    { icon:'\u{1F32B}\u{FE0F}', big:'Air quality held', mid:'No clear deterioration', sub:'12mo before vs after' },
    { icon:'\u{1F321}\u{FE0F}', big:'Surface temp', mid:'No significant rise', sub:'Measured via satellite data' },
    { icon:'\u{1F9EA}', big:'Pollutants fell', mid:'Ozone, SO2, CO', sub:'Declined at all sites' },
  ],
  quote: 'The team reported: "PM2.5, NO2, and formaldehyde remained statistically unchanged...post-operation pollutant levels generally decreased across all locations."',
  noteSub: 'Large data centers draw scrutiny over local environmental impact due to their power use. This satellite-verified result gives SpaceX a data point to lean on as it discusses further expansion.',
  footer: 'SpaceX · Colossus 1',
});

// 16) L1 — Taylor foundry AI5 chip production
add('taylor-foundry-ai5-chip-production', 'L1', 'TSLA', {
  badge: '테슬라 · AI5', title: '텍사스 테일러 파운드리에서 테슬라 AI5 칩 시제품 생산이 시작된 것으로 확인됐습니다',
  heroIcon: '\u{1F3ED}', heroBig: '시제품 생산 개시',
  heroSub: '테일러 파운드리는 삼성전자가 텍사스에 짓고 있는 반도체 공장으로, 테슬라의 차세대 자율주행 칩 AI5를 위탁 생산합니다. 이 공정이 이제 시제품 단계에 들어갔습니다.',
  cards: [
    { icon:'\u{1F5A5}\u{FE0F}', big:'AI5 칩', mid:'테슬라 차세대 자율주행칩', sub:'삼성 파운드리 위탁생산' },
    { icon:'\u{1F4C5}', big:'연말~내년초', mid:'양산 목표 시점', sub:'시제품 이후 순차 확대' },
    { icon:'\u{1F91D}', big:'삼성·테슬라', mid:'공급망 협력 심화', sub:'텍사스 현지 생산 체계' },
  ],
  quote: '한 소식통은 "테일러 파운드리에서 AI5 칩 시제품 생산이 확인됐다. 이 일정대로면 양산은 연말이나 내년 초에 시작될 수 있다"고 전했습니다.',
  noteHead: '왜 중요한가', noteSub: 'AI5는 테슬라의 다음 세대 자율주행 컴퓨터 두뇌로 꼽힙니다. 시제품 생산이 시작됐다는 것은 설계가 실제 웨이퍼 단계로 넘어갔다는 뜻이며, 이후 수율 안정화 속도가 양산 시점을 가를 다음 변수입니다.',
  footer: '테슬라 · AI5 · 테일러파운드리',
}, {
  badge: 'TSLA · AI5', title: 'Prototype production of Tesla\u2019s AI5 chip has reportedly begun at the Taylor foundry in Texas',
  heroIcon: '\u{1F3ED}', heroBig: 'Prototype Run Begins',
  heroSub: 'The Taylor foundry is Samsung\u2019s chip plant under construction in Texas, which will contract-manufacture Tesla\u2019s next-gen self-driving chip, AI5.',
  cards: [
    { icon:'\u{1F5A5}\u{FE0F}', big:'AI5 chip', mid:'Tesla\u2019s next self-driving chip', sub:'Contract-built by Samsung' },
    { icon:'\u{1F4C5}', big:'Late \u201926-early \u201927', mid:'Mass production target', sub:'Ramp follows the prototype' },
    { icon:'\u{1F91D}', big:'Samsung + Tesla', mid:'Deeper supply-chain tie', sub:'Local production in Texas' },
  ],
  quote: 'A source said: "Prototype production has begun at the Taylor foundry...following this timeline, mass production of the products can begin by year-end or early next year."',
  noteHead: 'Why it matters', noteSub: 'AI5 is considered Tesla\u2019s next-generation self-driving compute brain. Starting prototypes means the design has moved to actual wafers \u2014 next comes yield stabilization, which will determine the real ramp timing.',
  footer: 'Tesla · AI5 · Taylor Foundry',
});

// 17) L2 — Tesla Austin robotaxi power infra
add('tesla-austin-robotaxi-power-infra', 'L2', 'TSLA', {
  badge: '테슬라 · 로보택시', title: '테슬라가 오스틴 로보택시 기지에 하루 최대 840대를 충전할 전력 설비를 짓고 있습니다',
  heroIcon: '\u{26A1}', heroBig: '하루 430~840대',
  heroSub: '9월 2일 접수된 허가 서류에 따르면, 오스틴 벤 화이트 대로의 로보택시 시설에 4000A·2500kVA급 전기차 충전 설비가 신청됐습니다.',
  cards: [
    { label:'전력 규모', big:'4000A', mid:'2500kVA 충전소', sub:'9월 2일 허가 신청 접수' },
    { label:'하루 충전량', big:'3만~4.2만kWh', mid:'50~70% 평균 가동률 기준', sub:'모델Y 1대당 50~70kWh 소요' },
    { label:'환산 대수', big:'430~840대', mid:'하루 충전 가능 차량', sub:'사이버캡은 배터리 작아 더 많음' },
  ],
  detailHead: '허가 서류 핵심 내용',
  detailLines: ['프로젝트명: 5900 E 벤 화이트 블러바드 서비스로드 빌딩A', '작업 유형: 4000A 서비스·2500kVA 전기차 충전소 설치', '현재 상태: 추가 정보 요청 중(더 알아보기 필요)'],
  quote: '한 계정은 "왜 로보택시 정비 시설에 4000A 서비스를 설치하려는 걸까?"라는 질문에, "모델Y 한 대당 하루 50~70kWh가 필요하다"는 계산을 근거로 답했습니다.',
  noteSub: '충전 전력 규모는 그 기지에서 하루에 몇 대의 차량을 굴릴 수 있는지를 보여주는 간접 지표입니다. 사이버캡은 배터리가 더 작아 같은 전력으로 더 많은 차량을 충전할 수 있어, 실제 가동 대수는 이 추정치보다 늘어날 수 있습니다.',
  footer: '테슬라 · 오스틴 로보택시',
}, {
  badge: 'TSLA · ROBOTAXI', title: 'Tesla is building power at its Austin robotaxi hub to charge up to 840 Model Ys per day',
  heroIcon: '\u{26A1}', heroBig: '430-840 cars/day',
  heroSub: 'A permit filed Sept 2 shows a 4000A, 2500kVA EV charging station requested for the robotaxi facility on Austin\u2019s E Ben White Blvd.',
  cards: [
    { label:'Power scale', big:'4000A', mid:'2500kVA charging station', sub:'Permit filed Sept 2' },
    { label:'Daily energy', big:'30K-42K kWh', mid:'At 50-70% avg utilization', sub:'Each Model Y needs 50-70kWh' },
    { label:'Vehicle equivalent', big:'430-840', mid:'Cars chargeable per day', sub:'Cybercab\u2019s smaller pack fits more' },
  ],
  detailHead: 'Key permit details',
  detailLines: ['Project: 5900 E Ben White Blvd Service Road Bldg A', 'Work type: 4000A service, 2500kVA EV charging station install', 'Status: more information required (under review)'],
  quote: 'Asked "why would anyone install a 4000A service at a robotaxi maintenance facility?" one account replied that each Model Y needs roughly 50-70kWh per day.',
  noteSub: 'Charging capacity is an indirect signal of how many vehicles a hub can run per day. Cybercab\u2019s smaller battery pack means more vehicles could be charged on the same power, so the real fleet size could exceed this estimate.',
  footer: 'Tesla · Austin Robotaxi',
});

// 18) L4 — SK Hynix - Intel memory talks
add('sk-hynix-intel-memory-talks', 'L4', 'HYNIX', {
  badge: 'SK하이닉스 · 인텔', title: 'SK하이닉스가 인텔과 손잡고 미국에서 처음으로 메모리 칩을 만드는 방안을 논의 중입니다',
  badgeLine: '"미국 내 첫 메모리 생산" — 오하이오 공장 활용안',
  heroIcon: '\u{1F1FA}\u{1F1F8}', heroBig: '美 메모리 생산 검토',
  heroSub: 'SK하이닉스가 인텔의 오하이오 반도체 공장 일부를 빌려 미국 내 메모리 칩 생산을 검토하고 있다는 외신 보도가 나왔습니다. 실현되면 SK하이닉스의 첫 미국 내 메모리 생산입니다.',
  cards: [
    { icon:'\u{1F3ED}', big:'오하이오 공장', mid:'인텔 시설 일부 임대안', sub:'주요 클라우드사 합작 가능성도' },
    { icon:'\u{1F4C8}', big:'+4.08%', mid:'SK하이닉스 주가(9/16)', sub:'175만9,000원 마감' },
    { icon:'\u{1F91D}', big:'임단협 가결', mid:'노사 재합의안 찬성 57%', sub:'성과급 현금·주식 5대5' },
  ],
  quote: '외신은 "SK하이닉스가 인텔 오하이오 시설 일부를 임대하는 방식으로 미국 내 메모리 칩 생산을 검토 중"이라고 전했습니다.',
  noteSub: '지금까지 SK하이닉스의 메모리 생산은 한국·중국 등 아시아에 집중돼 있었습니다. 미국 생산이 실현되면 관세·공급망 리스크를 낮추는 동시에, 미국 정부의 반도체 보조금 수혜 대상이 될 가능성도 열립니다.',
  footer: 'SK하이닉스 · 미국 생산',
}, {
  badge: 'SK HYNIX · INTEL', title: 'SK Hynix is discussing making memory chips in the US for the first time, in talks with Intel',
  badgeLine: '"First-ever US memory production" — via Intel\u2019s Ohio plant',
  heroIcon: '\u{1F1FA}\u{1F1F8}', heroBig: 'Exploring US Output',
  heroSub: 'Reports say SK Hynix is exploring leasing part of Intel\u2019s Ohio chip plant to produce memory chips in the US \u2014 which would be a first for the company.',
  cards: [
    { icon:'\u{1F3ED}', big:'Ohio plant', mid:'Leasing part of Intel\u2019s site', sub:'A cloud-firm JV is also floated' },
    { icon:'\u{1F4C8}', big:'+4.08%', mid:'SK Hynix shares (Sept 16)', sub:'Closed at KRW 1,759,000' },
    { icon:'\u{1F91D}', big:'Labor deal passed', mid:'57% approval on re-vote', sub:'Bonus split 50/50 cash/stock' },
  ],
  quote: 'Reports said: "JUST IN: SK Hynix is in talks with Intel to make memory chips in the US for the first time."',
  noteSub: 'SK Hynix\u2019s memory output has so far been concentrated in Asia. US production would lower tariff and supply-chain risk while potentially qualifying for US chip subsidies.',
  footer: 'SK Hynix · US Production',
});

// 19) L1 — Hanmi Semiconductor Terafab deal
add('hanmi-semiconductor-terafab-deal', 'L1', 'HYNIX', {
  badge: '한미반도체', title: '한미반도체가 테라팹 AI 칩 생산라인에 첨단 패키징 장비를 공급하는 계약을 확보했습니다',
  heroIcon: '\u{1F1F0}\u{1F1F7}', heroBig: '테라팹 공급 계약',
  heroSub: '테라팹은 일론 머스크가 구상 중인 초대형 반도체·데이터센터 프로젝트입니다. 한미반도체는 이 라인에 첨단 패키징 장비를 공급하는 최초의 한국 후공정 업체가 됐습니다.',
  cards: [
    { icon:'\u{1F947}', big:'국내 최초', mid:'테라팹 후공정 장비 공급', sub:'한국 업체 중 처음' },
    { icon:'\u{1F517}', big:'HPSP 뒤이어', mid:'6월 전공정 장비 수주', sub:'한미반도체가 후공정 이어받음' },
    { icon:'\u{1F4E6}', big:'첨단 패키징', mid:'AI 칩용 적층 공정', sub:'테라팹 AI 칩 생산라인용' },
  ],
  quote: '보도에 따르면 "한미반도체가 테라팹의 AI 칩 생산라인에 첨단 패키징 장비를 공급하는 계약을 확보했다"며, 앞서 6월 HPSP가 전공정 장비를 수주한 데 이은 것이라고 전했습니다.',
  noteHead: '왜 중요한가', noteSub: '패키징(후공정)은 반도체 칩을 여러 층으로 쌓아 성능을 높이는 공정으로, 최근 AI 칩 성능 경쟁의 핵심 변수로 꼽힙니다. 한국 장비사가 테라팹처럼 초대형 프로젝트의 공급망에 들어간 것은 국내 반도체 장비 업계의 위상을 보여주는 사례입니다.',
  footer: '한미반도체 · 테라팹',
}, {
  badge: 'HANMI SEMI', title: 'Hanmi Semiconductor secured a deal to supply advanced packaging gear for the Terafab AI chip line',
  heroIcon: '\u{1F1F0}\u{1F1F7}', heroBig: 'Terafab Supply Deal',
  heroSub: 'Terafab is Elon Musk\u2019s envisioned giant chip and data-center project. Hanmi becomes the first Korean back-end equipment maker to join its supply chain.',
  cards: [
    { icon:'\u{1F947}', big:'First for Korea', mid:'Terafab back-end equipment', sub:'First Korean supplier' },
    { icon:'\u{1F517}', big:'After HPSP', mid:'Front-end order in June', sub:'Hanmi follows for back-end' },
    { icon:'\u{1F4E6}', big:'Advanced packaging', mid:'Chip-stacking process', sub:'For the Terafab AI chip line' },
  ],
  quote: 'Reports said: "Hanmi Semiconductor has secured a deal to provide advanced packaging equipment for Terafab\u2019s AI chip production line...the first Korean back-end equipment maker," following HPSP\u2019s front-end order in June.',
  noteHead: 'Why it matters', noteSub: 'Packaging stacks chips into layers to boost performance, now a key battleground in AI chip competition. A Korean equipment maker entering a project as massive as Terafab signals the standing of Korea\u2019s chip-equipment industry.',
  footer: 'Hanmi Semiconductor · Terafab',
});

// 20) L1 — Novo Nordisk-Anthropic AI partnership
add('novo-nordisk-anthropic-ai-partnership', 'L1', 'ANTHROPIC', {
  badge: '노보노디스크 · 앤트로픽', title: '비만치료제 회사 노보노디스크가 AI 기업 앤트로픽과 신약개발 제휴를 발표했습니다',
  heroIcon: '\u{1F52C}', heroBig: 'AI 신약개발 제휴',
  heroSub: '노보노디스크는 비만·당뇨 치료제로 유명한 제약회사입니다. 인공지능 기업 앤트로픽과 손잡고 신약 개발 속도를 높이겠다고 밝혔습니다.',
  cards: [
    { icon:'\u{1F91D}', big:'새 제휴 발표', mid:'노보노디스크 + 앤트로픽', sub:'9월 16일 공개' },
    { icon:'\u{1F9EA}', big:'AI 신약탐색', mid:'연구진 업무에 AI 접목', sub:'신약 후보물질 발굴 가속' },
    { icon:'\u{1F3E5}', big:'"더 빠르게"', mid:'환자에게 신약 전달', sub:'회사측 발표 문구' },
  ],
  quote: '노보노디스크는 "우리는 앤트로픽과 새로운 제휴를 발표하게 되어 기쁘다. 인공지능을 활용해 연구진이 필요한 환자들에게 더 빠르게 신약을 전달할 수 있게 될 것"이라고 밝혔습니다.',
  noteHead: '왜 중요한가', noteSub: '신약 개발은 후보물질 탐색부터 임상까지 보통 10년 이상 걸리는 오래고 비용이 큰 과정입니다. 인공지능이 이 과정의 일부를 앞당길 수 있다면, 제약회사의 연구개발 비용 구조와 신약 출시 속도 모두에 영향을 줄 수 있습니다.',
  footer: '노보노디스크 · 앤트로픽',
}, {
  badge: 'NOVO · ANTHROPIC', title: 'Obesity drugmaker Novo Nordisk announced an AI drug-discovery partnership with Anthropic',
  heroIcon: '\u{1F52C}', heroBig: 'AI Drug Discovery Deal',
  heroSub: 'Novo Nordisk is the pharma company known for its obesity and diabetes treatments. It\u2019s teaming up with AI firm Anthropic to speed up drug development.',
  cards: [
    { icon:'\u{1F91D}', big:'New partnership', mid:'Novo Nordisk + Anthropic', sub:'Announced Sept 16' },
    { icon:'\u{1F9EA}', big:'AI discovery', mid:'AI embedded in research work', sub:'Speeds up candidate discovery' },
    { icon:'\u{1F3E5}', big:'Faster medicines', mid:'To patients who need them', sub:'Company\u2019s stated goal' },
  ],
  quote: 'Novo Nordisk posted: "We are therefore excited to announce a new partnership with Anthropic, so our scientists, by the use of AI, can bring new medicines to the people who need them, faster."',
  noteHead: 'Why it matters', noteSub: 'Drug development from candidate discovery to clinical trials typically takes a decade or more and huge cost. If AI can shorten parts of that pipeline, it could reshape both R&D cost structures and how fast new drugs reach patients.',
  footer: 'Novo Nordisk · Anthropic',
});

// 21) L3 — Tesla Accordion Supercharger
add('tesla-accordion-supercharger', 'L3', 'TSLA', {
  badge: '테슬라 · 슈퍼차저', title: '테슬라가 공장에서 미리 접어 만든 "아코디언 슈퍼차저"로 설치 속도를 확 높였습니다',
  heroIcon: '\u{1FA97}', heroBig: '아코디언 슈퍼차저',
  heroSub: '슈퍼차저는 테슬라의 급속충전 인프라입니다. 이번엔 충전소 전체를 공장에서 아코디언처럼 접어 미리 만든 뒤 현장에서 펼치는 방식을 처음 도입했습니다.',
  cards: [
    { icon:'\u{1F69A}', big:'16기', mid:'트럭 1대당 운송량', sub:'한 번에 충전소 절반 이상' },
    { icon:'\u{1F4B0}', big:'20% 절감', mid:'설치 비용 감소', sub:'현장 공사 기간 대폭 축소' },
    { icon:'\u26A1', big:'즉시 가동', mid:'설치 즉시 운영 개시', sub:'별도 배선 공사 최소화' },
  ],
  quote: '테슬라 충전 부문은 "인도 경계석 뒤에 설치할 수 없는 곳도 이제 공장에서 미리 조립한 슈퍼차저로 해결할 수 있다"고 설명했습니다.',
  noteSub: '충전소 설치는 보통 부지 공사·배선 작업에 몇 주가 걸립니다. 공장에서 미리 조립해 나르는 방식이 자리 잡으면 신규 충전소 확대 속도가 빨라져, 전기차 보급의 걸림돌로 꼽히던 충전 인프라 부족 문제를 더 빨리 풀 수 있습니다.',
  footer: '테슬라 · 슈퍼차저 혁신',
}, {
  badge: 'TSLA · SUPERCHARGER', title: 'Tesla is now shipping pre-assembled "Accordion Superchargers" straight from the factory',
  heroIcon: '\u{1FA97}', heroBig: 'Accordion Supercharger',
  heroSub: 'Supercharger is Tesla\u2019s fast-charging network. This new approach pre-assembles an entire charging station like an accordion at the factory, then unfolds it on-site.',
  cards: [
    { icon:'\u{1F69A}', big:'16 stalls', mid:'Per truck shipment', sub:'More than half a station at once' },
    { icon:'\u{1F4B0}', big:'20% cheaper', mid:'Lower install cost', sub:'Much shorter on-site work' },
    { icon:'\u26A1', big:'Instant operation', mid:'Ready right after install', sub:'Minimal extra wiring needed' },
  ],
  quote: 'Tesla Charging said: "If we can\u2019t install Superchargers behind a curb, we now have a pre-assembled solution for Superchargers between parking spaces."',
  noteSub: 'Installing a charging station usually takes weeks of site work and wiring. Pre-fabricating at the factory speeds up new station rollout, tackling one of the biggest bottlenecks in EV adoption \u2014 charging infrastructure.',
  footer: 'Tesla · Supercharger Innovation',
});

// 22) L6 — UWM mortgage 8-month losing streak
add('uwm-mortgage-8month-losing-streak', 'L6', 'RATES', {
  badge: '주택금융 · UWM', title: '미국 최대 모기지 대출사 UWM 주가가 8개월 연속 하락하며 역대 최장 하락 기록을 세웠습니다',
  breaking: '사상 최장 8개월 연속 하락',
  heroBig: '8개월 연속↓', heroSub: 'UWM 홀딩스는 미국에서 가장 큰 모기지(주택담보대출) 대출 회사입니다. 지난달엔 상장 이후 하루 최대 낙폭까지 기록했습니다.',
  grid: [
    { icon:'\u{1F4C9}', big:'8개월', mid:'연속 하락 월수', sub:'역대 최장 기록' },
    { icon:'\u{1F4C5}', big:'지난달', mid:'상장 후 최대 하루 낙폭', sub:'단일 거래일 기준' },
    { icon:'\u{1F3E6}', big:'대형 대출사', mid:'미국 내 최대 규모', sub:'모기지 시장 대표 지표' },
    { icon:'\u{1F4B5}', big:'5%대', mid:'모기지 금리 부담', sub:'연준 인상과 맞물림' },
  ],
  ctx1: '주가 하락은 집을 사려는 대출 수요가 줄고 있다는 신호로 해석됩니다.',
  ctx2: '이번 주 연준의 금리 인상까지 겹치며 모기지 금리 부담이 더 커질 수 있다는 우려가 나옵니다.',
  quote: '한 시장 매체는 "UWM 홀딩스가 8개월 연속 하락하며 역대 최장 하락 기록을 세웠다. 지난달엔 상장 이후 최대 하루 낙폭까지 겪었다"고 전했습니다.',
  noteHead: '왜 중요한가', noteSub: '모기지 대출사의 실적·주가는 주택 거래량과 직결됩니다. 8개월 연속 하락은 대출 수요·주택 거래 둔화가 꽤 길게 이어지고 있다는 뜻으로, 이번 주 금리 인상이 이 흐름을 더 악화시킬지가 다음 관전 포인트입니다.',
  footer: 'UWM · 모기지 시장',
}, {
  badge: 'MORTGAGE · UWM', title: 'The largest US mortgage lender, UWM Holdings, just logged its 8th straight red month, a record losing streak',
  breaking: 'Record 8-month losing streak',
  heroBig: '8 red months', heroSub: 'UWM Holdings is the largest US mortgage lender. Last month it also posted its biggest single-day drop since going public.',
  grid: [
    { icon:'\u{1F4C9}', big:'8 months', mid:'Consecutive declines', sub:'Longest streak on record' },
    { icon:'\u{1F4C5}', big:'Last month', mid:'Biggest one-day drop', sub:'Since its public listing' },
    { icon:'\u{1F3E6}', big:'Top lender', mid:'Biggest in the US', sub:'A bellwether for mortgages' },
    { icon:'\u{1F4B5}', big:'~5% rates', mid:'Mortgage rate pressure', sub:'Compounded by the Fed hike' },
  ],
  ctx1: 'A prolonged stock decline often signals weakening demand for home loans.',
  ctx2: 'This week\u2019s Fed rate hike adds to worries that mortgage rate pressure could deepen further.',
  quote: 'One market outlet reported: "United Wholesale Mortgage is going for its 8th straight red month, its longest losing streak in history, after suffering its largest single-day drop in history last month."',
  noteHead: 'Why it matters', noteSub: 'A mortgage lender\u2019s results track home sales volume closely. Eight straight down months suggests softer loan demand and housing turnover for a while now \u2014 watch whether this week\u2019s rate hike deepens that trend.',
  footer: 'UWM · Mortgage Market',
});

// 23) L3 — FSD 85% / 462 of 540 mi / 35-day streak
add('tesla-fsd-85pct-streak', 'L3', 'TSLA', {
  badge: '테슬라 · FSD', title: '테슬라 자율주행 통계에 540마일 중 462마일이 자율주행으로 찍히며 35일 연속 기록이 나왔습니다',
  heroIcon: '\u{1F698}', heroBig: '85%',
  heroSub: 'FSD(완전자율주행)는 테슬라의 운전자 보조 소프트웨어입니다. 한 이용자가 540마일 중 462마일을 시스템이 운전했다고 올렸고, 머스크가 이를 다시 알렸습니다.',
  cards: [
    { icon:'\u2705', big:'462마일', mid:'자율주행 구간', sub:'전체 540마일 중' },
    { icon:'\u{1F4C5}', big:'35일', mid:'연속 사용 기록', sub:'하루도 빠지지 않은 기간' },
    { icon:'\u{1F4AC}', big:'한 달 전', mid:'직접 운전을 거의 멈춤', sub:'이용자 본인 설명' },
  ],
  quote: '이용자는 "한 달 전부터 사실상 직접 운전을 멈췄다. 테슬라 FSD가 마법처럼 작동한다"고 적었고, 머스크는 "테슬라 자율주행이 놀랍다"고 다시 알렸습니다.',
  noteHead: '왜 중요한가', noteSub: '이 숫자는 회사 공식 통계가 아니라 한 이용자의 앱 화면입니다. 그래도 85%·35일 연속은 소프트웨어가 일상 주행의 대부분을 맡고 있다는 장면입니다. 다음에 확인할 것은 이런 비율이 여러 이용자에게서 반복되는지, 그리고 규제 승인 범위가 넓어지는지입니다.',
  footer: '테슬라 · FSD 사용 기록',
}, {
  badge: 'TESLA · FSD', title: 'A Tesla driving log showed 462 of 540 miles on Autopilot, with a 35-day streak',
  heroIcon: '\u{1F698}', heroBig: '85%',
  heroSub: 'FSD is Tesla\'s driver-assist software. One owner posted that the system drove 462 of 540 miles, and Elon Musk amplified the post.',
  cards: [
    { icon:'\u2705', big:'462 miles', mid:'Self-driving portion', sub:'Out of 540 miles total' },
    { icon:'\u{1F4C5}', big:'35 days', mid:'Consecutive streak', sub:'No missed days in the log' },
    { icon:'\u{1F4AC}', big:'A month ago', mid:'Mostly stopped driving', sub:'The owner\'s own words' },
  ],
  quote: 'The owner wrote: "I essentially stopped driving a month ago. Tesla FSD works like magic." Musk replied that Tesla self-driving is amazing.',
  noteHead: 'Why it matters', noteSub: 'These figures are one owner\'s in-car stats, not a company-wide official tally. Still, 85% and a 35-day streak show the software handling most daily miles. Next: watch whether similar ratios show up across more owners, and whether the approved operating area expands.',
  footer: 'Tesla · FSD usage log',
});

// 24) L4 — TSLA/SPCX merger hint (rumor / unofficial)
add('tsla-spcx-merger-hint', 'L4', 'SPCX', {
  badge: '테슬라·스페이스X', badgeLine: '"아직 공식 발표는 아닙니다"',
  title: '머스크가 테슬라와 스페이스X의 협력을 거론하며 다음 행동 가능성을 열어 두었습니다',
  heroIcon: '\u{1F680}', heroBig: '협력 발언',
  heroSub: '한 방송에서 머스크는 "이 모든 협력을 보면, 어떤 행동을 할지 누가 상상할 수 있겠느냐"고 말했습니다. 시장 일부는 합병 힌트로 읽었지만 회사 공식 발표는 아닙니다.',
  cards: [
    { icon:'\u{1F4E2}', big:'발언', mid:'협력 다음에 올 행동', sub:'공식 일정은 없음' },
    { icon:'\u{1F4CA}', big:'옵티머스', mid:'스타링크가 두뇌의 일부', sub:'이미 통신 연동 논의' },
    { icon:'\u26A0\uFE0F', big:'미확인', mid:'합병은 해석', sub:'공시·주총 전 단계' },
  ],
  quote: '머스크는 "이 모든 협력을 보면, 어떤 행동을 할지 누가 상상할 수 있겠느냐"고 했습니다. 스타링크를 옵티머스에 심는 이야기와 같은 줄에 놓인 발언입니다.',
  noteHead: '왜 중요한가', noteSub: '테슬라와 스페이스X가 한 회사가 되면 로보택시·로봇·위성 통신을 한 우산에서 팔 수 있다는 기대를 시장이 먼저 그립니다. 지금은 발언 해석일 뿐이라 공시나 주주총회 안건이 나와야 사실이 됩니다. 다음에 확인할 것은 후속 발언과 규제 서류입니다.',
  footer: '테슬라·스페이스X · 발언',
}, {
  badge: 'TSLA · SPCX', badgeLine: '"Not an official announcement"',
  title: 'Musk left the door open to a next step after pointing to Tesla-SpaceX collaboration',
  heroIcon: '\u{1F680}', heroBig: 'A hint',
  heroSub: 'On a broadcast Musk said, "with all this collaboration, who can imagine what action one might take." Some read a merger. There is no company filing.',
  cards: [
    { icon:'\u{1F4E2}', big:'A remark', mid:'Action after collaboration', sub:'No official timetable' },
    { icon:'\u{1F4CA}', big:'Optimus', mid:'Starlink as part of the brain', sub:'Comms integration already discussed' },
    { icon:'\u26A0\uFE0F', big:'Unconfirmed', mid:'Merger is an interpretation', sub:'Before any filing or vote' },
  ],
  quote: 'Musk said: "with all this collaboration, who can imagine what action one might take." It sat alongside talk of putting Starlink inside Optimus.',
  noteHead: 'Why it matters', noteSub: 'If Tesla and SpaceX were one company, robotaxis, robots and satellite comms could sit under one roof. For now it is an interpretation of a remark, not a filing. Next: watch follow-up comments and any regulatory paperwork.',
  footer: 'Tesla/SpaceX · Remarks',
});

};
