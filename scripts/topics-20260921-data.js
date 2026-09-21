// 2026-09-21 SVG topic data — screenshot facts, beginner Korean, listed SPCX
// Layout mix: ROWS×1 L1×3 L2×3 L3×3 L4×3 L5×2 L6×1 (총 16)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.21 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'10만기', title:'스페이스X가 스타링크 3세대 위성 최대 10만 기를 신청했습니다',
      sub:'미국 통신위원회가 9월 18일 서류를 접수했고, 승인은 아직입니다.' },
    { color:'#4ade80', fill:'#061209', right:'v14.3.10', title:'테슬라 감독 주행 소프트웨어 새 버전이 배포되기 시작했습니다',
      sub:'주차와 드문 상황을 더 잘 다루도록 학습을 강화했다는 안내입니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'631억달러', title:'엔비디아 주식 포트의 80%가 인텔과 스페이스X 두 종목입니다',
      sub:'2분기 말 기준 총 631억 달러 가운데 인텔 47.5%, 스페이스X 33.3%입니다.' },
    { color:'#4ade80', fill:'#061209', right:'70%', title:'오스틴에서 무인 사이버캡 목격이 사흘 새 기록을 경신했습니다',
      sub:'등록 비율이 약 2주 만에 30%에서 70% 근처로 올라왔다는 집계입니다.' },
    { color:'#facc15', fill:'#1a1600', right:'5천달러', title:'테슬라가 로드스터 예약을 다시 열었습니다',
      sub:'오늘 5,000달러는 환불되고, 10일 안에 4만5,000달러를 보내야 예약이 확정됩니다.' },
    { color:'#94a3b8', fill:'#111827', right:'9,420억', title:'외국인이 최근 12개월 미국 주식을 9,420억 달러 순유입했습니다',
      sub:'민간과 공식 기관을 합친 12개월 합이 사상 최대 근처로 찍혔습니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'<30분', title:'보링컴퍼니가 오스틴~샌안토니오 초고속 터널을 준비한다고 했습니다',
      sub:'시속 200마일 넘게 달리면 지금 2시간 반 길이 30분 안으로 줄어든다는 그림입니다.' },
  ],
  caption: '더 볼 것: 스타링크 10만기 · FSD 14.3.10 · 엔비디아 포트 · 무인 사이버캡 · 로드스터 예약 · 외국인 9,420억 · 보링 터널',
}, {
  headline: '2026.09.21 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'100k', title:'SpaceX asked to fly up to 100,000 Starlink Gen3 satellites',
      sub:'The FCC accepted the filing on Sept 18. That is review, not approval.' },
    { color:'#4ade80', fill:'#061209', right:'v14.3.10', title:'Tesla started rolling out a new Supervised FSD software build',
      sub:'Release notes cite stronger learning for parking and rare scenes.' },
    { color:'#60a5fa', fill:'#0a1420', right:'$63.1B', title:'80% of Nvidia’s stock book sat in Intel and SpaceX',
      sub:'As of Q2, Intel was 47.5% and listed SpaceX 33.3% of $63.1 billion.' },
    { color:'#4ade80', fill:'#061209', right:'70%', title:'Austin set a new record for driverless Cybercab sightings',
      sub:'Registered share rose from about 30% to near 70% in two weeks.' },
    { color:'#facc15', fill:'#1a1600', right:'$5,000', title:'Tesla reopened Roadster reservations',
      sub:'$5,000 today is refundable; $45,000 by wire within 10 days locks the slot.' },
    { color:'#94a3b8', fill:'#111827', right:'$942B', title:'Foreigners poured $942 billion into US stocks over 12 months',
      sub:'The private-plus-official 12-month sum printed near a record high.' },
    { color:'#c084fc', fill:'#140b1f', right:'<30 min', title:'Boring Company sketched an Austin–San Antonio high-speed tunnel',
      sub:'Above 200 mph, a 2.5-hour drive would shrink to under 30 minutes.' },
  ],
  caption: 'Watch: Starlink 100k · FSD 14.3.10 · Nvidia book · driverless Cybercab · Roadster · $942B inflows · Boring tunnel',
});

add('tsla-fsd-v14310', 'L3', 'TSLA', {
  badge: '테슬라', title: '감독 주행 소프트웨어 14.3.10이  indows 배포되기 시작했습니다'.replace(' indows',''),
  heroIcon: '\u{1F698}', heroBig: 'FSD v14.3.10',
  heroSub: 'FSD는 테슬라가 운전자 감독 아래 차를 가게 하는 소프트웨어입니다. 차량 화면에 2026.27.10 업데이트가 내려오기 시작했습니다.',
  cards: [
    { icon:'\u{1F9E0}', big:'학습 강화', mid:'강화 학습 단계를 올렸습니다', sub:'더 많은 운전 장면을 반복 학습합니다' },
    { icon:'\u{1F17F}\u{FE0F}', big:'주차', mid:'빈자리 고르기와 출차가 빨라졌습니다', sub:'지도에 P가 없어도 자리를 찾습니다' },
    { icon:'\u{1F6A6}', big:'드물 장면', mid:'비상차·스쿨버스 반응을 다듬었습니다', sub:'안개와 밤 시야도 같이 손봤습니다' },
  ],
  quote: '업데이트 화면은 소프트웨어 2026.27.10, 감독 주행 14.3.10으로 표시됐습니다. 강화 학습은 시행착오를 반복해 모델을 다듬는 훈련입니다.',
  noteHead: '왜 중요한가', noteSub: '새 버전이 실제로 차에 내려가야 주행 품질 이야기가 숫자로 바뀝니다. 주차와 드문 장면은 로보택시 안전의 입구입니다. 다음엔 배포 나라와 사고 통계가 같은 방향으로 가는지를 보면 됩니다.',
  footer: '테슬라 · 감독 주행 14.3.10',
}, {
  badge: 'TSLA', title: 'Supervised FSD v14.3.10 started rolling out to cars',
  heroIcon: '\u{1F698}', heroBig: 'FSD v14.3.10',
  heroSub: 'FSD is Tesla software that drives under a person’s watch. Cars began showing software 2026.27.10.',
  cards: [
    { icon:'\u{1F9E0}', big:'Training', mid:'Reinforcement learning was upgraded', sub:'More driving scenes are practiced' },
    { icon:'\u{1F17F}\u{FE0F}', big:'Parking', mid:'Spot choice and exit got faster', sub:'It can park without a P on the map' },
    { icon:'\u{1F6A6}', big:'Rare scenes', mid:'Emergency and school-bus response improved', sub:'Fog and night vision were tuned too' },
  ],
  quote: 'The car screen listed software 2026.27.10 and Supervised FSD 14.3.10. Reinforcement learning is training by trial and error.',
  noteHead: 'Why it matters', noteSub: 'Quality claims become numbers only after the build lands in cars. Parking and rare scenes are the door to robotaxi safety. Next, watch rollout countries and incident stats together.',
  footer: 'Tesla · Supervised FSD 14.3.10',
});

add('tsla-fsd-fallen-tree', 'L4', 'TSLA', {
  badge: '테슬라', title: '감독 주행이 쓰러진 나뭇가지를 보고 스스로 길을 비켜 갔습니다',
  badgeLine: '실차 장면 · 무개입',
  heroIcon: '\u{1F333}', heroBig: '경로를 바꿨습니다',
  heroSub: '사람이 핸들을 잡지 않은 상태에서 도로 위 나뭇가지를 피했습니다. 감독 주행이 실제 도로에서 판단을 한 장면입니다.',
  cards: [
    { icon:'\u{1F333}', big:'나뭇가지', mid:'쓰러진 가지를 장애물로 봤습니다', sub:'도로 한가운데 놓인 물체입니다' },
    { icon:'\u{1F6E3}\u{FE0F}', big:'경로 수정', mid:'차선을 살짝 옮겨 돌아갔습니다', sub:'급정지만 한 장면이 아닙니다' },
    { icon:'\u{1F464}', big:'무개입', mid:'운전자가 중간에 개입하지 않았습니다', sub:'화면 안내 그대로의 설명입니다' },
  ],
  quote: '차는 가지를 보고 상황을 이해한 뒤, 사람이 손대지 않아도 안전하게 경로를 바꿨습니다. 소프트웨어 업데이트가 나온 같은 주에 찍힌 실차 장면입니다.',
  noteHead: '왜 중요한가', noteSub: '버전 번호만으로는 도로 실력을 알 수 없습니다. 쓰러진 가지처럼 학습 데이터에 드문 장면이 통과돼야 유료 로보택시 이야기가 설득력을 얻습니다. 다음엔 비슷한 장애물 영상이 반복되는지를 보면 됩니다.',
  footer: '테슬라 · 감독 주행 실차',
}, {
  badge: 'TSLA', title: 'Supervised FSD saw a fallen branch and steered around it',
  badgeLine: 'On-road clip · no hands',
  heroIcon: '\u{1F333}', heroBig: 'It changed path',
  heroSub: 'No one grabbed the wheel. The car treated a branch in the road as an obstacle and went around it.',
  cards: [
    { icon:'\u{1F333}', big:'Branch', mid:'A fallen limb was flagged as an obstacle', sub:'It sat in the travel lane' },
    { icon:'\u{1F6E3}\u{FE0F}', big:'Reroute', mid:'The car eased over and passed it', sub:'It was not only a hard brake' },
    { icon:'\u{1F464}', big:'No hands', mid:'The driver did not intervene', sub:'That is how the clip is described' },
  ],
  quote: 'The car understood the scene and changed path without a human touch. The clip landed in the same week as the new software build.',
  noteHead: 'Why it matters', noteSub: 'A version number is not road skill. Rare debris scenes must pass before paid robotaxi claims hold. Next, watch whether similar clips keep appearing.',
  footer: 'Tesla · Supervised FSD on-road',
});

add('tsla-roadster-reservations', 'L1', 'TSLA', {
  badge: '테슬라', title: '로드스터 예약이 다시 열렸고 오늘 5,000달러를 내면 자리가 잡힙니다',
  heroIcon: '\u{1F3CE}\u{FE0F}', heroBig: '5,000달러', heroSub: '로드스터는 테슬라가 오래 미뤄 온 스포츠카입니다. 카드로 5,000달러를 내면 환불되고, 10일 안에 4만5,000달러를 보내야 예약이 확정됩니다.',
  cards: [
    { icon:'\u{1F4B0}', big:'4만5,000달러', mid:'10일 안 송금', sub:'전신 송금이 들어와야 예약이 끝납니다' },
    { icon:'\u{1F501}', big:'환불', mid:'오늘 5,000달러', sub:'카드 결제분은 전액 돌려받을 수 있습니다' },
    { icon:'\u{1F697}', big:'1대', mid:'예약 한 장', sub:'화면에는 로드스터 예약 1건이 올라와 있습니다' },
  ],
  quote: '예약은 송금이 끝나기 전까지 확정이 아니라고 안내됐습니다. 애플페이로 오늘 분 5,000달러를 치르는 화면이 공개됐습니다.',
  noteHead: '왜 중요한가', noteSub: '예약을 다시 연다는 것은 공개 일정이 달력에 붙었다는 신호입니다. 계약금 구조가 공개되면 수요가 숫자로 잡힙니다. 다음엔 10월 1일 공개와 실제 인도 연도가 같이 나오는지를 보면 됩니다.',
  footer: '테슬라 · 로드스터 예약',
}, {
  badge: 'TSLA', title: 'Roadster reservations reopened with a $5,000 refundable hold',
  heroIcon: '\u{1F3CE}\u{FE0F}', heroBig: '$5,000', heroSub: 'The Roadster is Tesla’s long-delayed sports car. Pay $5,000 by card today, then wire $45,000 within 10 days to lock the slot.',
  cards: [
    { icon:'\u{1F4B0}', big:'$45,000', mid:'Wire in 10 days', sub:'The reservation is not final until the wire lands' },
    { icon:'\u{1F501}', big:'Refundable', mid:'Today’s $5,000', sub:'The card charge can be returned in full' },
    { icon:'\u{1F697}', big:'1 car', mid:'One reservation', sub:'The screen showed a single Roadster hold' },
  ],
  quote: 'The order is not final until the wire arrives. A checkout using Apple Pay for the $5,000 hold was shown.',
  noteHead: 'Why it matters', noteSub: 'Reopening reservations means a reveal date is on the calendar. A public deposit structure turns demand into a count. Next, watch the Oct 1 event and a real delivery year together.',
  footer: 'Tesla · Roadster reservations',
});

add('tsla-roadster-waco-oct1', 'L6', 'TSLA', {
  badge: '테슬라', title: '10월 1일 텍사스 와코 상공이 로드스터 공개를 위해 비행 제한됩니다',
  breaking: '10월 1일 · 와코',
  heroBig: '10월 1일', heroSub: '미국 항공당국이 텍사스 와코 위 하늘을 제한한다는 베팅 화면이 퍼졌습니다. 로드스터 공개에 로켓 기술이 쓰일 수 있다는 추측이 붙었습니다.',
  grid: [
    { icon:'\u{1F6E9}\u{FE0F}', big:'FAA', mid:'항공 당국 제한', sub:'와코 상공을 잠시 닫는 조치입니다' },
    { icon:'\u{1F3CE}\u{FE0F}', big:'로드스터', mid:'스포츠카 공개', sub:'예약 재개와 같은 주에 겹쳤습니다' },
    { icon:'\u{1F680}', big:'추측', mid:'로켓 기술 거론', sub:'공식 확인 전 관측입니다' },
    { icon:'\u{1F4C5}', big:'10/1', mid:'공개 목표일', sub:'날짜가 달력에 내려왔습니다' },
  ],
  ctx1: '비행 제한은 행사가 하늘에서 벌어진다는 뜻이지, 양산 일정이 아닙니다.',
  ctx2: '예약금 화면과 공개 날짜를 한 이야기로 묶되, 인도 연도는 따로 봐야 합니다.',
  quote: '예측시장은 와코 상공 제한이 로드스터 10월 1일 공개와 연결된다고 봤습니다. 스페이스X 기술이 쓰일지는 아직 회사 발표가 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '공개 장소와 하늘 제한이 잡히면 행사는 말에서 일정으로 내려옵니다. 로켓 연동은 추측이므로 공식 초청장과 영상을 기다리면 됩니다. 다음엔 실제 제한 고시와 초청 명단을 보면 됩니다.',
  footer: '테슬라 · 로드스터 와코',
}, {
  badge: 'TSLA', title: 'Airspace over Waco, Texas is set to close for an Oct 1 Roadster reveal',
  breaking: 'Oct 1 · Waco',
  heroBig: 'Oct 1', heroSub: 'A prediction-market card said the FAA will restrict airspace above Waco. Talk of rocket hardware at the reveal is still speculation.',
  grid: [
    { icon:'\u{1F6E9}\u{FE0F}', big:'FAA', mid:'Airspace limit', sub:'A short close over Waco' },
    { icon:'\u{1F3CE}\u{FE0F}', big:'Roadster', mid:'Sports-car reveal', sub:'Same week as reservations' },
    { icon:'\u{1F680}', big:'Rumor', mid:'Rocket hardware talk', sub:'Not a company filing' },
    { icon:'\u{1F4C5}', big:'Oct 1', mid:'Target date', sub:'The day is now on a calendar' },
  ],
  ctx1: 'A sky limit means a show in the air, not a production date.',
  ctx2: 'Keep the deposit screen and the reveal day together, but treat delivery year as a separate line.',
  quote: 'Markets linked the Waco restriction to an Oct 1 Roadster event. Whether SpaceX hardware appears is not yet an official note.',
  noteHead: 'Why it matters', noteSub: 'A place and a sky limit move the event off talk and onto a date. Rocket talk stays rumor until invites and video land. Next, watch the actual notice and the guest list.',
  footer: 'Tesla · Roadster Waco',
});

add('us-equity-inflows-942b', 'L1', 'MACRO', {
  badge: '매크로', title: '외국인이 최근 12개월 미국 주식을 9,420억 달러 순유입했습니다',
  heroIcon: '\u{1F30E}', heroBig: '9,420억달러', heroSub: '민간과 공식 기관을 합친 주식 순유입 12개월 합입니다. 공식 기관만 보면 약 1,396억 달러로, 민간 자금이 대부분을 만들었습니다.',
  cards: [
    { icon:'\u{1F3DB}\u{FE0F}', big:'1,396억', mid:'공식 기관만', sub:'정부·공공 자금 줄은 상대적으로 작습니다' },
    { icon:'\u{1F4C5}', big:'12개월', mid:'누적 합', sub:'한 달이 아니라 1년 창입니다' },
    { icon:'\u{1F3C6}', big:'사상 최대', mid:'근처 기록', sub:'화면은 역사상 가장 큰 유입이라고 적었습니다' },
  ],
  quote: '차트는 1980년대부터 2026년까지 이어지며, 2026년 막대가 위로 치솟았습니다. 주식으로 들어온 해외 돈이 국채보다 커진 흐름과 같은 줄입니다.',
  noteHead: '왜 중요한가', noteSub: '해외 자금이 미국 기업 지분을 고르면 증시 수급이 두꺼워집니다. 다만 12개월 합이라 다음 분기 한 달이 뒤집힐 수도 있습니다. 다음엔 재무부 월간 표가 같은 방향을 유지하는지를 보면 됩니다.',
  footer: '매크로 · 미국 주식 유입',
}, {
  badge: 'MACRO', title: 'Foreigners sent $942 billion into US stocks over the last 12 months',
  heroIcon: '\u{1F30E}', heroBig: '$942B', heroSub: 'That is the 12-month sum of private plus official equity inflows. Officials alone were about $139.6 billion, so private money did most of the work.',
  cards: [
    { icon:'\u{1F3DB}\u{FE0F}', big:'$139.6B', mid:'Official only', sub:'The public-sector line stayed smaller' },
    { icon:'\u{1F4C5}', big:'12 months', mid:'Rolling sum', sub:'It is a year window, not one month' },
    { icon:'\u{1F3C6}', big:'Record', mid:'Near a high', sub:'The card called it the most in history' },
  ],
  quote: 'The chart runs from the 1980s through 2026, and the 2026 bar spikes. It sits on the same page as foreigners preferring stocks over Treasuries.',
  noteHead: 'Why it matters', noteSub: 'Overseas buying of US shares thickens equity supply. A 12-month sum can still flip in the next quarter. Next, watch whether Treasury monthly tables keep the same sign.',
  footer: 'Macro · US equity inflows',
});

add('nvda-stock-portfolio-63b', 'L2', 'NVDA', {
  badge: '엔비디아', title: '엔비디아 주식 포트 631억 달러의 80%가 인텔과 스페이스X입니다',
  heroIcon: '\u{1F4CA}', heroBig: '631억 달러',
  heroSub: '2분기 말 기준 엔비디아가 공개한 주식 포트폴리오 총액입니다. 인텔 47.5%, 상장 스페이스X 33.3%로 두 종목이 대부분입니다.',
  cards: [
    { label: '인텔', big: '47.5%', mid: '가장 큰 한 줄', sub: '약 300억 달러 규모입니다' },
    { label: '스페이스X', big: '33.3%', mid: '상장 SPCX', sub: '6월 12일 상장한 지분입니다' },
    { label: 'CoreWeave', big: '7.1%', mid: '세 번째', sub: '그다음이 코히어런트 5.1%입니다' },
  ],
  detailHead: '포트에 담긴 이름',
  detailLines: [
    '노키아와 시놉시스가 각각 약 3%로 작은 칸을 채웁니다',
    '숫자는 2분기 말 스냅샷이라 지금 시세와는 다를 수 있습니다',
    '칩 회사가 고객·파트너 주식을 이렇게 크게 들고 있습니다',
  ],
  quote: '화면은 두 이름만으로 포트의 80%가 설명된다고 적었습니다. 스페이스X는 비상장이 아니라 6월 12일 상장한 SPCX입니다.',
  noteHead: '왜 중요한가', noteSub: '칩 회사의 대차대조표가 반도체와 우주 두 축에 묶여 있습니다. 인텔 주가와 스페이스X 주가가 엔비디아 실적 밖의 변동을 만듭니다. 다음 13F에서 비중이 유지되는지를 보면 됩니다.',
  footer: '엔비디아 · 주식 포트',
}, {
  badge: 'NVDA', title: '80% of Nvidia’s $63.1B stock book sat in Intel and SpaceX',
  heroIcon: '\u{1F4CA}', heroBig: '$63.1B',
  heroSub: 'That is Nvidia’s disclosed equity book at quarter-end. Intel was 47.5% and listed SpaceX 33.3%.',
  cards: [
    { label: 'Intel', big: '47.5%', mid: 'Largest line', sub: 'About $30 billion' },
    { label: 'SpaceX', big: '33.3%', mid: 'Listed SPCX', sub: 'Shares after the June 12 listing' },
    { label: 'CoreWeave', big: '7.1%', mid: 'Third', sub: 'Coherent was next at 5.1%' },
  ],
  detailHead: 'Names in the book',
  detailLines: [
    'Nokia and Synopsys each filled about 3%',
    'The snapshot is quarter-end, so marks can move',
    'A chip seller is now also a large holder of partner stocks',
  ],
  quote: 'The graphic said two names explain 80% of the book. SpaceX is listed SPCX, not a private stake.',
  noteHead: 'Why it matters', noteSub: 'The chipmaker’s balance sheet is tied to chips and space. Intel and SpaceX prices now move Nvidia beyond chip sales. Watch whether the next 13F keeps the weights.',
  footer: 'Nvidia · equity book',
});

add('nvda-cursor-spacex-ai', 'L4', 'NVDA', {
  badge: '엔비디아', title: '젠슨 황이 스페이스X의 인공지능 제품 커서를 쓴다고 말했습니다',
  badgeLine: '사용 증언 · 스페이스X 제품',
  heroIcon: '\u{2328}\u{FE0F}', heroBig: '커서를 씁니다',
  heroSub: '커서는 스페이스X가 만든 인공지능 코딩 도구로 소개됐습니다. 엔비디아 최고경영자가 자사도 이 제품을 쓴다고 밝혔습니다.',
  cards: [
    { icon:'\u{2328}\u{FE0F}', big:'커서', mid:'코드를 돕는 인공지능 도구입니다', sub:'스페이스X 제품으로 소개됐습니다' },
    { icon:'\u{1F4F9}', big:'영상', mid:'인터뷰에서 직접 말한 한 줄입니다', sub:'지분 공시와는 다른 사용 증언입니다' },
    { icon:'\u{1F680}', big:'고객', mid:'칩 고객이 소프트웨어 고객이기도 합니다', sub:'두 회사 관계가 칩만은 아닙니다' },
  ],
  quote: '최고경영자는 “우리는 커서, 스페이스X의 제품을 씁니다”라고 했습니다. 631억 달러 지분 이야기와 같은 화면에 겹쳤지만, 쓰는 것과 들고 있는 것은 다릅니다.',
  noteHead: '왜 중요한가', noteSub: '큰 칩 회사가 우주 회사 소프트웨어를 내부 도구로 쓰면, 스페이스X는 발사 외에 소프트웨어 매출 칸이 생깁니다. 사용 증언은 계약 금액이 아닙니다. 다음엔 기업 고객 이름이 더 나오는지를 보면 됩니다.',
  footer: '엔비디아 · 커서',
}, {
  badge: 'NVDA', title: 'Jensen Huang said Nvidia uses Cursor, a SpaceX AI product',
  badgeLine: 'Usage quote · SpaceX product',
  heroIcon: '\u{2328}\u{FE0F}', heroBig: 'We use Cursor',
  heroSub: 'Cursor was introduced as a SpaceX AI coding tool. Nvidia’s chief said his company uses it too.',
  cards: [
    { icon:'\u{2328}\u{FE0F}', big:'Cursor', mid:'An AI helper for writing code', sub:'Presented as a SpaceX product' },
    { icon:'\u{1F4F9}', big:'On camera', mid:'A spoken line, not a filing', sub:'Different from the 13F stake' },
    { icon:'\u{1F680}', big:'Customer', mid:'A chip client is also a software client', sub:'The link is more than GPUs' },
  ],
  quote: 'He said, “We use Cursor, a SpaceX product.” It sat next to the $63.1B book, but using software is not the same as owning shares.',
  noteHead: 'Why it matters', noteSub: 'If a large chip firm uses space-company software inside, SpaceX gains a software sales line besides launches. A quote is not a contract value. Next, watch for more named enterprise users.',
  footer: 'Nvidia · Cursor',
});

add('tsla-cybercab-chicago-24', 'L2', 'TSLA', {
  badge: '테슬라', title: '시카고에서 사이버캡이 하루에 24대 목격됐습니다',
  heroIcon: '\u{1F698}', heroBig: '24대',
  heroSub: '사이버캡은 운전석 없는 전용 로보택시입니다. 시카고 거리에서 하루에 최소 24대가 찍혔다는 현장 영상이 올라왔습니다.',
  cards: [
    { label: '도시', big: '시카고', mid: '새 도시 목격', sub: '오스틴 밖 대규모 목격입니다' },
    { label: '대수', big: '24대', mid: '하루 최소', sub: '더 있을 수 있다는 설명이 붙었습니다' },
    { label: '성격', big: '영상', mid: '우편함 앞 촬영', sub: '유료 호출이 열린 것은 아닙니다' },
  ],
  detailHead: '목격이 말해 주는 것',
  detailLines: [
    '목격은 차가 도로에 있다는 뜻이지 승객이 돈을 냈다는 뜻은 아닙니다',
    '같은 주 오스틴 무인 목격 기록과 도시는 다릅니다',
    '36개 도시 채용 공고와 겹치면 확장 그림이 커 보입니다',
  ],
  quote: '촬영자는 사이버캡이 많아 앞으로 무슨 일이 있을지 궁금하다고 했습니다. 시카고 허가는 이 영상에 나오지 않았습니다.',
  noteHead: '왜 중요한가', noteSub: '한 도시에서 24대가 보이면 시범이 플릿 규모로 커진 것입니다. 유료 요금표가 나와야 매출 칸이 열립니다. 다음엔 시카고 허가와 앱 호출 화면을 보면 됩니다.',
  footer: '테슬라 · 시카고 사이버캡',
}, {
  badge: 'TSLA', title: 'At least 24 Cybercabs were spotted in Chicago in one day',
  heroIcon: '\u{1F698}', heroBig: '24 cabs',
  heroSub: 'A Cybercab is a purpose-built robotaxi with no driver’s seat. Street video from Chicago showed at least 24 in a day.',
  cards: [
    { label: 'City', big: 'Chicago', mid: 'A new city sighting', sub: 'A large count outside Austin' },
    { label: 'Count', big: '24', mid: 'Daily minimum', sub: 'The clip said there could be more' },
    { label: 'Type', big: 'Video', mid: 'Shot by a mailbox', sub: 'Paid rides were not shown' },
  ],
  detailHead: 'What a sighting means',
  detailLines: [
    'A sighting means cars are on the road, not that riders paid',
    'Austin’s driverless record is a different city story',
    'Job ads for 36 cities make the expansion map look wider',
  ],
  quote: 'The filmer wondered what comes next with so many Cybercabs around. No Chicago permit appeared in the clip.',
  noteHead: 'Why it matters', noteSub: 'Twenty-four cars in one city is a fleet, not a single demo. A fare screen has to appear before a sales line opens. Next, watch a Chicago permit and an in-app hail.',
  footer: 'Tesla · Chicago Cybercab',
});

add('musk-xi-whitehouse-dinner', 'L4', 'TSLA', {
  badge: '테슬라', title: '머스크가 백악관에서 시진핑 만찬에 참석할 수 있다는 보도가 나왔습니다',
  badgeLine: '보도 · 공식 명단 전',
  heroIcon: '\u{1F3D9}\u{FE0F}', heroBig: '만찬 초청 관측',
  heroSub: '보도에 따르면 일론 머스크가 중국 정상을 위한 백악관 만찬에 초청될 수 있습니다. 공식 명단 확인 전 관측입니다.',
  cards: [
    { icon:'\u{1F3D9}\u{FE0F}', big:'백악관', mid:'국빈 만찬 자리로 거론됐습니다', sub:'아직 공식 참석 명단은 아닙니다' },
    { icon:'\u{1F4E1}', big:'의제', mid:'인공지능 규제와 반도체 수출이 거론됐습니다', sub:'핵심 공급망도 같은 테이블입니다' },
    { icon:'\u{1F698}', big:'중국 FSD', mid:'중국 감독 주행 허가에 도움이 될 수 있다는 해석입니다', sub:'만찬이 허가를 보장하지는 않습니다' },
  ],
  quote: '만찬 의제는 인공지능 규제, 반도체 수출 통제, 핵심 공급망으로 정리됐습니다. 테슬라 중국 사업과 직접 맞닿는 주제입니다.',
  noteHead: '왜 중요한가', noteSub: '최고경영자가 양국 정상 자리에 앉으면 규제 대화의 창이 열릴 수 있습니다. 참석과 허가 문서는 다른 칸입니다. 다음엔 공식 명단과 중국 감독 주행 고시를 보면 됩니다.',
  footer: '테슬라 · 백악관 만찬 관측',
}, {
  badge: 'TSLA', title: 'Reports said Musk may attend a White House dinner for Xi Jinping',
  badgeLine: 'Report · list not official',
  heroIcon: '\u{1F3D9}\u{FE0F}', heroBig: 'Dinner talk',
  heroSub: 'Elon Musk was said to be lined up for a state dinner. The guest list is not official yet.',
  cards: [
    { icon:'\u{1F3D9}\u{FE0F}', big:'White House', mid:'A state-dinner seat was floated', sub:'Not a confirmed attendee list' },
    { icon:'\u{1F4E1}', big:'Agenda', mid:'AI rules and chip exports were cited', sub:'Critical supply chains too' },
    { icon:'\u{1F698}', big:'China FSD', mid:'Some saw a path to China driving approval', sub:'A dinner does not grant a permit' },
  ],
  quote: 'The agenda was framed as AI regulation, semiconductor export controls, and critical supply chains — topics that touch Tesla in China.',
  noteHead: 'Why it matters', noteSub: 'A CEO at a leaders’ table can open a regulatory window. Attendance is not a permit. Next, watch the official list and any China FSD notice.',
  footer: 'Tesla · White House dinner talk',
});

add('tsla-robotaxi-36-cities', 'L3', 'TSLA', {
  badge: '테슬라', title: '로보택시 안전 요원 채용이 36개 도시로 퍼지고 있습니다',
  heroIcon: '\u{1F4BC}', heroBig: '36개 도시',
  heroSub: '인공지능 안전 요원은 로보택시가 막힐 때 원격으로 돕는 자리입니다. 록클린, 플러싱, 휴스턴, 올랜도 등 채용 공고가 한꺼번에 올라왔습니다.',
  cards: [
    { icon:'\u{1F3D8}\u{FE0F}', big:'동부', mid:'플러싱·피바디·뉴올리언스', sub:'뉴욕과 매사추세츠, 루이지애나입니다' },
    { icon:'\u{1F307}', big:'남부', mid:'휴스턴·올랜도', sub:'텍사스와 플로리다 거점입니다' },
    { icon:'\u{26F0}\u{FE0F}', big:'서부', mid:'록클린·오로라', sub:'캘리포니아와 콜로라도입니다' },
  ],
  quote: '공고는 공학·정보기술 정규직으로 올라갔습니다. 어느 도시가 먼저 유료로 열릴지 묻는 영상이 같이 퍼졌습니다.',
  noteHead: '왜 중요한가', noteSub: '채용은 서비스 지도의 초안입니다. 요원이 있어야 무인 차를 도시에 넣을 수 있습니다. 다음엔 어느 도시 공고가 실제 출근으로 바뀌는지를 보면 됩니다.',
  footer: '테슬라 · 로보택시 36도시',
}, {
  badge: 'TSLA', title: 'Robotaxi safety-operator jobs are spreading across 36 cities',
  heroIcon: '\u{1F4BC}', heroBig: '36 cities',
  heroSub: 'An AI safety operator remotely helps when a robotaxi gets stuck. Listings appeared for Rocklin, Flushing, Houston, Orlando and more.',
  cards: [
    { icon:'\u{1F3D8}\u{FE0F}', big:'East', mid:'Flushing, Peabody, New Orleans', sub:'New York, Massachusetts, Louisiana' },
    { icon:'\u{1F307}', big:'South', mid:'Houston and Orlando', sub:'Texas and Florida hubs' },
    { icon:'\u{26F0}\u{FE0F}', big:'West', mid:'Rocklin and Aurora', sub:'California and Colorado' },
  ],
  quote: 'The ads were full-time engineering and information-technology roles. A clip asked which city people want first.',
  noteHead: 'Why it matters', noteSub: 'Hiring is a draft of the service map. Operators have to exist before unmanned cars enter a city. Next, watch which listings turn into actual start dates.',
  footer: 'Tesla · robotaxi 36 cities',
});

add('spacex-fcc-gen3-100k', 'L1', 'SPCX', {
  badge: '스페이스X', title: '스페이스X가 스타링크 3세대 위성 최대 10만 기를 미국에 신청했습니다',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '10만 기', heroSub: '스타링크 3세대는 지금보다 용량과 지연을 한 단계 바꾸는 새 위성입니다. 통신위원회가 9월 18일 신청서를 접수했고, 허가 여부는 아직입니다.',
  cards: [
    { icon:'\u{1F4CF}', big:'325~475km', mid:'두 고도 층', sub:'아주 낮은 지구궤도 두 껍입니다' },
    { icon:'\u{1F30D}', big:'26~97도', mid:'궤도 기울기', sub:'여러 기울기로 지구를 덮습니다' },
    { icon:'\u{1F4C4}', big:'접수', mid:'9월 18일', sub:'심사 시작이지 발사가 아닙니다' },
  ],
  quote: '1세대가 서비스를 열었고 2세대가 규모를 키웠다면, 3세대는 완전히 다른 동물이라는 설명이 붙었습니다. 승인 전이라 10만 기가 바로 뜨지는 않습니다.',
  noteHead: '왜 중요한가', noteSub: '접수는 서류가 공개 심사에 들어갔다는 뜻입니다. 스타십이 자주 떠야 10만 기 그림이 현실이 됩니다. 다음엔 의견 수렴과 부분 허가 숫자가 나오는지를 보면 됩니다.',
  footer: '스페이스X · 스타링크 3세대',
}, {
  badge: 'SPCX', title: 'SpaceX asked the US to authorize up to 100,000 Starlink Gen3 satellites',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '100,000', heroSub: 'Gen3 is a new satellite class meant to jump capacity and cut delay. The FCC accepted the filing on Sept 18; approval is still ahead.',
  cards: [
    { icon:'\u{1F4CF}', big:'325–475 km', mid:'Two altitude shells', sub:'Very low Earth orbit layers' },
    { icon:'\u{1F30D}', big:'26–97°', mid:'Inclinations', sub:'Several tilts to cover Earth' },
    { icon:'\u{1F4C4}', big:'Accepted', mid:'Sept 18', sub:'Review start, not a launch' },
  ],
  quote: 'Gen1 opened service and Gen2 scaled it; Gen3 was called a different animal. Acceptance is not permission to fly 100,000 birds.',
  noteHead: 'Why it matters', noteSub: 'Acceptance means the file is in public review. Starship has to fly often for 100,000 to become real. Next, watch comments and any partial grant.',
  footer: 'SpaceX · Starlink Gen3',
});

add('us-china-tariff-talks', 'L5', 'MACRO', {
  badge: '매크로', title: '미국과 중국이 뉴욕에서 서로 관세를 300억 달러 줄이는 대화를 했다는 보도가 나왔습니다',
  heroIcon: '\u{1F91D}', heroBig: '관세 대화',
  heroSub: '보도에 따르면 뉴욕 무역 대화에서 양측이 서로 300억 달러 규모 관세를 낮추는 안을 논의했습니다. 11월 10일 기한을 연장하는 이야기도 나왔습니다.',
  before: { label: '지금', big: '고관세', sub: '서로에게 매긴 관세가 남아 있습니다' },
  after: { label: '보도', big: '300억 달러', sub: '서로 관세를 줄이는 안이 거론됐습니다' },
  cards: [
    { icon:'\u{1F4B0}', big:'300억', mid:'서로 깎는 규모로 거론됐습니다', sub:'서명된 조약은 아직 아닙니다' },
    { icon:'\u{1F4C5}', big:'11월 10일', mid:'기존 기한 연장 논의', sub:'날짜가 미뤄질 수 있습니다' },
    { icon:'\u{1F30D}', big:'뉴욕', mid:'정상 방문 전 실무 대화', sub:'만찬 보도와 같은 주에 겹쳤습니다' },
  ],
  quote: '헤드라인은 관세를 줄이고 기한을 늘리는 쪽으로 정리됐습니다. 의회 비준이나 공동 성명이 나오기 전이라 숫자만 외우면 안 됩니다.',
  noteHead: '왜 중요한가', noteSub: '관세가 줄면 반도체·자동차 원가 이야기가 누그러질 수 있습니다. 대화와 발효는 다릅니다. 다음엔 공동 발표문과 관세율 표가 나오는지를 보면 됩니다.',
  footer: '매크로 · 미중 관세 대화',
}, {
  badge: 'MACRO', title: 'Reports said the US and China talked about cutting $30 billion of tariffs each',
  heroIcon: '\u{1F91D}', heroBig: 'Tariff talks',
  heroSub: 'New York trade talks were said to cover $30 billion of reciprocal tariff cuts and a possible extension past Nov 10. Nothing is signed.',
  before: { label: 'Now', big: 'High tariffs', sub: 'Duties on each other remain' },
  after: { label: 'Talks', big: '$30B', sub: 'A mutual cut was discussed' },
  cards: [
    { icon:'\u{1F4B0}', big:'$30B', mid:'The size floated for a mutual cut', sub:'Not a signed treaty' },
    { icon:'\u{1F4C5}', big:'Nov 10', mid:'A deadline-extension talk', sub:'The date may slip' },
    { icon:'\u{1F30D}', big:'New York', mid:'Working talks before a visit', sub:'Same week as dinner rumors' },
  ],
  quote: 'Headlines framed a smaller tariff bill and a longer clock. Until a joint statement or a rate table appears, treat the figure as talk.',
  noteHead: 'Why it matters', noteSub: 'Lower tariffs can ease chip and auto cost talk. Talk is not law. Next, watch a joint note and a published duty table.',
  footer: 'Macro · US-China tariff talks',
});

add('starlink-v3-nvl72-starmind', 'L2', 'SPCX', {
  badge: '스페이스X', title: '머스크는 스타링크 위성마다 엔비디아 베라 루빈 컴퓨터가 들어간다고 했습니다',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '10테라비트',
  heroSub: '위성 하나 통신량이 양방향 약 10테라비트까지 갈 수 있고, 전력은 250킬로와트라는 설명입니다. 컴퓨터는 스페이스X가 설계한 엔비디아 베라 루빈 NVL72입니다.',
  cards: [
    { label: '전력', big: '250kW', mid: '위성 하나', sub: '한 기가 쓰는 전기 규모입니다' },
    { label: '장기', big: '100+Tb', mid: '앞선 경로', sub: '지금은 10테라비트, 앞은 100 이상입니다' },
    { label: '산술', big: '25GW', mid: '스타마인드', sub: '10만 기와 10만 랙을 곱한 그림입니다' },
  ],
  detailHead: '발언이 가리키는 것',
  detailLines: [
    '베라 루빈 NVL72는 엔비디아의 차세대 인공지능 서버 상자입니다',
    '10만 기 신청과 같은 주에 나온 성능 발언입니다',
    '산술은 목표이지 지금 궤도에 떠 있는 전력이 아닙니다',
  ],
  quote: '머스크는 위성당 연결이 양방향 10테라비트에 가깝고 100테라비트 이상 경로가 있다고 적었습니다. 각 위성에 스페이스X가 설계한 엔비디아 컴퓨터가 들어갑니다.',
  noteHead: '왜 중요한가', noteSub: '위성 인터넷이 통신망을 넘어 우주 인공지능 공장 이야기로 커집니다. 발언은 목표라 실제 발사 대수와 전력 공급이 따라야 합니다. 다음엔 14차 비행과 3세대 허가 진행을 같이 보면 됩니다.',
  footer: '스페이스X · 베라 루빈 위성',
}, {
  badge: 'SPCX', title: 'Musk said each Starlink satellite will carry an Nvidia Vera Rubin computer',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '10 Tbps',
  heroSub: 'He said connectivity per satellite would be about 10 terabits both ways, at 250 kilowatts, with a SpaceX-designed Nvidia Vera Rubin NVL72.',
  cards: [
    { label: 'Power', big: '250 kW', mid: 'Per satellite', sub: 'The electricity one bird would draw' },
    { label: 'Later', big: '100+ Tb', mid: 'A longer path', sub: '10 Tb now, more than 100 later' },
    { label: 'Math', big: '25 GW', mid: 'StarMind sketch', sub: '100,000 sats times 100,000 racks' },
  ],
  detailHead: 'What the claim points to',
  detailLines: [
    'Vera Rubin NVL72 is Nvidia’s next AI server box',
    'The claim landed the same week as the 100,000-sat filing',
    'The gigawatt math is a goal, not power already on orbit',
  ],
  quote: 'Musk wrote that connectivity per sat would be more like 10 Tb both ways, with a path to 100+ Tb, and a SpaceX-designed Nvidia computer on each sat.',
  noteHead: 'Why it matters', noteSub: 'Satellite internet is being framed as an orbital AI factory. The line is a target until launch count and power show up. Next, watch Flight 14 and the Gen3 review together.',
  footer: 'SpaceX · Vera Rubin sat',
});

add('tsla-austin-driverless-record', 'L5', 'TSLA', {
  badge: '테슬라', title: '오스틴 무인 사이버캡 목격이 기록을 경신했고 등록 비율은 70% 근처입니다',
  heroIcon: '\u{1F4C8}', heroBig: '무인 목격 기록',
  heroSub: '무인 목격은 운전석에 사람이 없는 사이버캡이 거리에서 보인 횟수입니다. 8월 말부터 9월 19일 막대가 가장 높았습니다.',
  before: { label: '2주 전', big: '30%', sub: '목격분 중 등록 비율이 낮았습니다' },
  after: { label: '어제', big: '70%', sub: '같은 집계에서 등록 비율이 올라왔습니다' },
  cards: [
    { icon:'\u{1F4CA}', big:'기록', mid:'무인 목격이 전고를 넘었습니다', sub:'9월 19일 막대가 최근 최고입니다' },
    { icon:'\u{1F698}', big:'70%', mid:'등록된 차 비중', sub:'만들기에서 도로로 넘어가는 비율입니다' },
    { icon:'\u{26A1}', big:'파이프', mid:'제작·등록·투입', sub:'세 단계가 빨라졌다는 해석입니다' },
  ],
  quote: '차트는 8월 21일부터 9월 19일까지 무인과 전체 목격을 나눠 그렸습니다. 전체 목격 정점은 9월 초 240회 근처, 19일은 무인 비중이 더 두꺼웠습니다.',
  noteHead: '왜 중요한가', noteSub: '등록 비율이 올라가면 공장 차가 바로 도로로 나가는 속도가 붙습니다. 목격은 매출이 아닙니다. 다음엔 유료 호출 건수가 막대를 따라오는지를 보면 됩니다.',
  footer: '테슬라 · 오스틴 무인 목격',
}, {
  badge: 'TSLA', title: 'Austin set a driverless Cybercab record and registrations neared 70%',
  heroIcon: '\u{1F4C8}', heroBig: 'Driverless record',
  heroSub: 'A driverless sighting is a Cybercab with no person in the front seat. Bars from late August through Sept 19 show a new high.',
  before: { label: '2 weeks ago', big: '30%', sub: 'A smaller share of sightings were registered' },
  after: { label: 'Yesterday', big: '70%', sub: 'The registered share jumped in the same tally' },
  cards: [
    { icon:'\u{1F4CA}', big:'Record', mid:'Driverless counts beat the prior peak', sub:'The Sept 19 bar is the recent high' },
    { icon:'\u{1F698}', big:'70%', mid:'Registered share', sub:'Factory cars moving onto streets' },
    { icon:'\u{26A1}', big:'Pipeline', mid:'Build, register, deploy', sub:'The three steps look faster' },
  ],
  quote: 'The chart split driverless and total sightings from Aug 21 to Sept 19. Total peaked near 240 in early September; the 19th bar was thicker in the driverless color.',
  noteHead: 'Why it matters', noteSub: 'A higher registered share means factory cars reach streets faster. Sightings are not fares. Next, watch whether paid hails follow the bars.',
  footer: 'Tesla · Austin driverless',
});

add('boring-austin-sanantonio', 'L3', 'SPCX', {
  badge: '보링', title: '보링컴퍼니가 오스틴과 샌안토니오를 시속 200마일 넘게 잇는 터널을 준비합니다',
  heroIcon: '\u{1F687}', heroBig: '30분 안',
  heroSub: '보링컴퍼니는 지하 터널을 파는 머스크 계열 회사입니다. 지금 차로 최대 2시간 반인 길을 30분 안으로 줄이겠다는 그림입니다.',
  cards: [
    { icon:'\u{1F4CF}', big:'80마일', mid:'두 도시를 잇는 거리', sub:'지도에 한 줄로 표시됐습니다' },
    { icon:'\u{1F680}', big:'200mph+', mid:'목표 속도', sub:'시속 약 320킬로미터입니다' },
    { icon:'\u{23F1}\u{FE0F}', big:'2.5시간', mid:'지금 도로 체증', sub:'그 시간을 30분 안으로 줄입니다' },
  ],
  quote: '머스크는 간단한 전 단계 하이퍼루프 터널이라고 적었습니다. 하이퍼루프는 진공에 가까운 관 안에서 캡슐이 달리는 초고속 교통 구상입니다.',
  noteHead: '왜 중요한가', noteSub: '허가와 착공이 나와야 지도 한 줄이 공사가 됩니다. 텍사스 도시 연결은 로보택시·사이버트럭 수요와도 맞닿습니다. 다음엔 노선 허가와 시공 시작 발표를 보면 됩니다.',
  footer: '보링 · 오스틴–샌안토니오',
}, {
  badge: 'BORING', title: 'Boring Company is preparing a 200-mph-plus tunnel from Austin to San Antonio',
  heroIcon: '\u{1F687}', heroBig: '<30 min',
  heroSub: 'Boring Company digs tunnels. The sketch would cut a drive that can take 2.5 hours in traffic to a steady trip under 30 minutes.',
  cards: [
    { icon:'\u{1F4CF}', big:'80 miles', mid:'City-to-city distance', sub:'Shown as one line on the map' },
    { icon:'\u{1F680}', big:'200+ mph', mid:'Target speed', sub:'About 320 kilometers an hour' },
    { icon:'\u{23F1}\u{FE0F}', big:'2.5 hours', mid:'Today’s congested drive', sub:'The aim is a consistent sub-30' },
  ],
  quote: 'Musk called it a simple precursor hyperloop tunnel. A hyperloop is a high-speed capsule in a near-vacuum tube.',
  noteHead: 'Why it matters', noteSub: 'Permits and a groundbreaking have to appear before a map line becomes a jobsite. Texas city links also touch robotaxi and Cybertruck demand. Next, watch a route permit and a start-of-work note.',
  footer: 'Boring · Austin–San Antonio',
});

};
