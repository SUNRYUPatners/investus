// 2026-09-18 SVG topic data — screenshot facts, beginner Korean, positive long view
// Layout mix: ROWS×1 L1×4 L2×5 L3×3 L4×6 L5×2 L6×4 (총 25)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.18 한장 요약',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'9/28', title:'스타십 14차 비행이 9월 22일에서 28일로 미뤄졌습니다',
      sub:'첫 궤도 비행이자 스타링크 V3 위성 26기를 처음 실어 나르는 일정입니다.' },
    { color:'#4ade80', fill:'#061209', right:'77+GWh', title:'테슬라 메가팩이 전 세계에 77기가와트시 넘게 깔렸습니다',
      sub:'가동률 99.3%에 라스롭·텍사스 공장이 연 90기가와트시 규모로 돌아갑니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'2nm', title:'삼성 텍사스 테일러 공장에서 테슬라 AI5 칩 시험생산이 시작됐습니다',
      sub:'2나노 공정 웨이퍼가 나와 양산 검증에 들어갔고, 칩은 2027년 공급을 목표로 합니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'154.81달러', title:'스페이스X 장외가가 한 달 고점 근처에서 시총 510억 달러를 더했습니다',
      sub:'실패한 스타트업 데이터를 인공지능 학습에 쓰려는 논의가 같이 나왔습니다.' },
    { color:'#a78bfa', fill:'#120b1f', right:'+20%', title:'Nebius가 10월 1일부터 GPU 임대료를 약 20% 올린다고 알렸습니다',
      sub:'인공지능 연산 수요가 렌탈 가격을 밀어 올리는 신호입니다.' },
    { color:'#4ade80', fill:'#061209', right:'30~40센트', title:'사이버캡 요금이 마일당 30~40센트로 거론됐습니다',
      sub:'오스틴 실차에는 운전대와 페달이 없고, 객실 조명이 음악에 맞춰 움직입니다.' },
    { color:'#94a3b8', fill:'#111827', right:'주식>국채', title:'외국인이 미국 주식을 국채보다 더 산 것은 이번 세기 세 번째입니다',
      sub:'해외 자금이 안전자산보다 미국 기업 지분을 택한 드문 흐름입니다.' },
  ],
  caption: '더 볼 것: 스타십 9/28 · 메가팩 77GWh · 삼성 테일러 AI5 · 스페이스X 시총 · Nebius +20% · 사이버캡 요금 · 외국인 주식매수',
}, {
  headline: '2026.09.18 Daily Snapshot',
  rows: [
    { color:'#c084fc', fill:'#140b1f', right:'Sep 28', title:'Starship Flight 14 slipped from Sept 22 to Monday Sept 28',
      sub:'First orbital attempt, carrying 26 Starlink V3 satellites on a revenue flight.' },
    { color:'#4ade80', fill:'#061209', right:'77+ GWh', title:'Tesla Megapack deployments passed 77 GWh worldwide',
      sub:'Uptime is 99.3%, with Lathrop and Texas factories targeting ~90 GWh a year.' },
    { color:'#60a5fa', fill:'#0a1420', right:'2nm', title:'Tesla AI5 trial production started at Samsung’s Taylor, Texas fab',
      sub:'Advanced 2nm wafers are in mass-production checks, with chips aimed at 2027.' },
    { color:'#c084fc', fill:'#140b1f', right:'$154.81', title:'SpaceX shares sat near a one-month high after a $51B cap jump',
      sub:'Talks also surfaced about buying failed-startup data for AI training.' },
    { color:'#a78bfa', fill:'#120b1f', right:'+20%', title:'Nebius said GPU rental prices rise about 20% from October 1',
      sub:'AI compute demand is showing up in the rental price, not just chip sales.' },
    { color:'#4ade80', fill:'#061209', right:'30-40¢', title:'Cybercab fares of 30-40 cents a mile were cited',
      sub:'An Austin cabin had no wheel or pedals, with cabin lights moving to the music.' },
    { color:'#94a3b8', fill:'#111827', right:'Stocks>bonds', title:'Foreigners bought more US stocks than Treasuries a 3rd time',
      sub:'Overseas money preferred American company shares over the usual safe bond bid.' },
  ],
  caption: 'Watch: Starship Sep 28 · Megapack 77 GWh · Samsung Taylor AI5 · SpaceX cap · Nebius +20% · Cybercab fares · foreign stock buying',
});

add('starship-f14-sept28', 'L6', 'SPCX', {
  badge: '스페이스X', title: '스타십 14차 비행이 9월 22일에서 28일 월요일로 일정이 바뀌었습니다',
  breaking: '첫 궤도 비행 · 일정 변경',
  heroBig: '9월 28일', heroSub: '동부시간 오전 8시 15분 발사를 목표로 합니다. 이번 비행은 스타십이 처음 궤도에 들어가고, 스타링크 V3 위성 26기를 매출 비행으로 실어 나릅니다.',
  grid: [
    { icon:'\u{1F680}', big:'F14', mid:'14번째 시험비행', sub:'이전 목표일은 9월 22일' },
    { icon:'\u{1F6F0}\u{FE0F}', big:'26기', mid:'스타링크 V3', sub:'한 번에 실리는 위성 수' },
    { icon:'\u{1F4C5}', big:'월 28일', mid:'동부 08:15', sub:'승인 절차가 남아 있습니다' },
    { icon:'\u{1F30D}', big:'첫 궤도', mid:'궤도 진입 후 재진입', sub:'이전 비행보다 난이도가 높습니다' },
  ],
  ctx1: '공식 일정은 허가 여부에 따라 더 미뤄질 수 있다고 안내됐습니다.',
  ctx2: 'V3 위성 하나는 팰컨9 로켓 여러 번 분량의 통신 용량을 실어 나릅니다.',
  quote: '스타십은 지금까지 대기권 시험이 중심이었습니다. 14차는 궤도에 들어간 뒤 한 바퀴를 돌고 다시 들어오며 위성까지 배치하는, 상업 발사의 첫 실전에 가깝습니다.',
  noteHead: '왜 중요한가', noteSub: '날짜가 닷새 밀린 것은 일정이 아니라 난이도가 올라갔다는 뜻입니다. 첫 궤도·첫 V3 배치가 성공하면 스타링크 용량이 한 단계 커지고, 실패해도 다음 비행 간격이 관전 포인트가 됩니다. 허가 문서와 실제 카운트다운을 같이 보면 됩니다.',
  footer: '스페이스X · 스타십 14차',
}, {
  badge: 'SPCX', title: 'Starship Flight 14 moved from Sept 22 to Monday Sept 28',
  breaking: 'First orbital attempt · date slip',
  heroBig: 'Sep 28', heroSub: 'Target is 8:15 a.m. Eastern. This flight is Starship’s first trip to orbit and a revenue launch of 26 Starlink V3 satellites.',
  grid: [
    { icon:'\u{1F680}', big:'F14', mid:'14th test flight', sub:'Prior target was Sept 22' },
    { icon:'\u{1F6F0}\u{FE0F}', big:'26 sats', mid:'Starlink V3', sub:'Payload on this flight' },
    { icon:'\u{1F4C5}', big:'Mon 28', mid:'8:15 a.m. ET', sub:'Still pending approvals' },
    { icon:'\u{1F30D}', big:'First orbit', mid:'Orbit then reentry', sub:'Harder than prior flights' },
  ],
  ctx1: 'Official notes say the date can slip further until approvals land.',
  ctx2: 'One V3 satellite carries several Falcon 9 flights’ worth of capacity.',
  quote: 'Earlier Starship tests stayed suborbital. Flight 14 aims to reach orbit, circle, come home, and deploy satellites — the first flight that looks like a commercial launch.',
  noteHead: 'Why it matters', noteSub: 'A five-day slip is about difficulty, not just the calendar. Success would jump Starlink capacity; a miss would stretch the next attempt. Watch the license paperwork and the actual countdown together.',
  footer: 'SpaceX · Starship Flight 14',
});

add('model-y-spain-275', 'L5', 'TSLA', {
  badge: '테슬라', title: '스페인에서 테슬라 모델Y 판매가 2위 비테슬라 전기차보다 275% 많았습니다',
  heroIcon: '\u{1F697}', heroBig: '스페인 모델Y 독주',
  heroSub: '모델Y는 테슬라의 중형 전기 스포츠유틸리티차량입니다. 스페인 최근 집계에서 2위 비테슬라 전기차보다 판매가 약 2.75배 많았습니다.',
  before: { label: '2위 비테슬라 EV', big: '기준 1', sub: '같은 기간 판매량을 1로 두면' },
  after: { label: '테슬라 모델Y', big: '+275%', sub: '2위보다 약 2.75배 더 팔렸습니다' },
  cards: [
    { icon:'\u{1F1EA}\u{1F1F8}', big:'스페인', mid:'최근 판매 집계', sub:'한 나라 안의 전기차 순위입니다' },
    { icon:'\u{1F3C6}', big:'1위 격차', mid:'모델Y 단독 선두', sub:'2위와의 차이가 세 배에 가깝습니다' },
    { icon:'\u{1F4CA}', big:'브랜드 힘', mid:'보조금이 줄어도', sub:'실판매가 따라오는지 보는 지표입니다' },
  ],
  quote: '한 나라에서 한 차종이 2위보다 세 배 가까이 팔렸다는 것은, 가격표만으로 설명이 안 되는 브랜드·충전·소프트웨어 묶음이 통하고 있다는 뜻입니다.',
  noteHead: '왜 중요한가', noteSub: '유럽은 보조금이 줄어드는 시장입니다. 스페인처럼 보조금 환경이 다른 나라에서 모델Y가 압도하면, 다른 유럽 시장에서도 같은 차종이 버틸 수 있는지를 가늠하는 참고가 됩니다. 다음 달 순위가 유지되는지를 보면 됩니다.',
  footer: '테슬라 · 스페인 모델Y',
}, {
  badge: 'TSLA', title: 'In Spain, Tesla Model Y sold 275% more than the next non-Tesla EV',
  heroIcon: '\u{1F697}', heroBig: 'Spain Model Y lead',
  heroSub: 'Model Y is Tesla’s midsize electric SUV. Latest Spain tallies show it sold about 2.75 times as many units as the second-place non-Tesla EV.',
  before: { label: 'No.2 non-Tesla EV', big: 'Base 1', sub: 'Same-period sales set to 1' },
  after: { label: 'Tesla Model Y', big: '+275%', sub: 'About 2.75× the runner-up' },
  cards: [
    { icon:'\u{1F1EA}\u{1F1F8}', big:'Spain', mid:'Latest sales tally', sub:'One-country EV ranking' },
    { icon:'\u{1F3C6}', big:'Gap at No.1', mid:'Model Y alone in front', sub:'Lead is nearly threefold' },
    { icon:'\u{1F4CA}', big:'Brand test', mid:'As subsidies fade', sub:'A read on real demand' },
  ],
  quote: 'When one model outsells the next non-Tesla EV by nearly 3× in a single country, the mix of brand, charging, and software is doing work the sticker price alone cannot explain.',
  noteHead: 'Why it matters', noteSub: 'Europe is trimming EV subsidies. A blowout Model Y lead in Spain is a useful check on whether the same car can hold share elsewhere. Watch whether next month’s ranking stays this wide.',
  footer: 'Tesla · Spain Model Y',
});

add('foreign-us-stocks-vs-bonds', 'L1', 'MACRO', {
  badge: '매크로', title: '외국인이 미국 주식을 국채보다 더 산 것은 이번 세기 들어 세 번째입니다',
  heroIcon: '\u{1F30E}', heroBig: '주식 > 국채',
  heroSub: '해외 투자자가 미국 국채보다 미국 주식을 더 많이 순매수한 기록이 이번 세기 세 번째로 잡혔습니다. 평소에는 안전자산인 국채를 더 사는 흐름이 일반적입니다.',
  cards: [
    { icon:'\u{1F4C8}', big:'세 번째', mid:'이번 세기 기록', sub:'주식 순매수가 국채를 앞선 횟수' },
    { icon:'\u{1F3E6}', big:'국채', mid:'평소의 안전 선택', sub:'이자와 원금이 비교적 확실한 자산' },
    { icon:'\u{1F4BC}', big:'미국 주식', mid:'기업 지분 매수', sub:'성장 기대를 사고 있다는 뜻입니다' },
  ],
  quote: '국채는 정부가 이자를 주는 빚문서이고, 주식은 회사의 일부를 사는 일입니다. 외국인이 빚문서보다 회사 지분을 더 골랐다는 것은, 미국 기업 이익이 금리를 이긴다고 본 자금이 늘었다는 신호입니다.',
  noteHead: '왜 중요한가', noteSub: '이런 전환은 100년에 세 번 꼴로 드뭅니다. 해외 자금이 주식으로 붙으면 달러 자산 수요가 채권에서 증시로 옮겨 갑니다. 다음 분기 국제자금 통계에서 같은 방향이 이어지는지를 보면 됩니다.',
  footer: '매크로 · 외국인 자금',
}, {
  badge: 'MACRO', title: 'Foreigners bought more US stocks than Treasuries for only the third time this century',
  heroIcon: '\u{1F30E}', heroBig: 'Stocks > bonds',
  heroSub: 'Overseas investors booked more net buying of US equities than Treasuries for only the third time this century. In most years the safer bond bid is larger.',
  cards: [
    { icon:'\u{1F4C8}', big:'3rd time', mid:'This century', sub:'Equity buying beat Treasuries' },
    { icon:'\u{1F3E6}', big:'Treasuries', mid:'The usual safe pick', sub:'Interest and principal are clearer' },
    { icon:'\u{1F4BC}', big:'US stocks', mid:'Buying company shares', sub:'A bet on earnings growth' },
  ],
  quote: 'A Treasury is a government IOU; a stock is a slice of a company. Foreigners choosing shares over IOUs is a sign more money thinks US profits can outrun the rate on bonds.',
  noteHead: 'Why it matters', noteSub: 'This mix is rare — three times in a century. If it lasts, foreign demand rotates from bonds into equities. Watch the next quarterly cross-border flow print for the same tilt.',
  footer: 'Macro · Foreign flows',
});

add('tesla-solar-shade-3x', 'L3', 'TSLA', {
  badge: '테슬라 에너지', title: '테슬라 태양광 패널이 그늘에서도 출력을 최대 33% 더 끌어올리는 방식으로 바뀌고 있습니다',
  heroIcon: '\u{2600}\u{FE0F}', heroBig: '그늘 대응 +33%',
  heroSub: '태양광 패널은 햇빛을 전기로 바꾸는 판입니다. 테슬라는 패널을 전력 구역 세 개로 나눠, 한쪽이 그늘져도 나머지 구역이 더 많이 발전하도록 설계를 바꿨습니다.',
  cards: [
    { icon:'\u{1F4A1}', big:'3배 구역', mid:'전력 구역을 세 칸으로', sub:'한 칸이 가려져도 나머지가 돕습니다' },
    { icon:'\u{1F319}', big:'+25%', mid:'부분 그늘 개선', sub:'약한 그늘에서 출력이 늘어납니다' },
    { icon:'\u{2601}\u{FE0F}', big:'+33%', mid:'강한 그늘 개선', sub:'나무가 가려도 손실이 줄어듭니다' },
  ],
  quote: '지붕 한쪽이 나뭇잎에 가려지면 예전에는 패널 전체 출력이 같이 떨어졌습니다. 구역을 나누면 그늘 난 칸만 쉬고, 햇볕 칸은 계속 전기를 만듭니다. 이것이 가정용 태양광의 실사용 효율입니다.',
  noteHead: '왜 중요한가', noteSub: '메가팩 공장 소식과 별개로, 테슬라 에너지의 지붕 사업은 그늘이라는 일상 문제를 숫자로 줄이려 합니다. 설치 가정에서 실제 발전량이 따라오는지가 다음 확인입니다. 전력요금이 오를수록 이 개선의 가치가 커집니다.',
  footer: '테슬라 · 태양광 그늘',
}, {
  badge: 'TESLA ENERGY', title: 'Tesla solar panels are being split into three power zones so shade cuts output less',
  heroIcon: '\u{2600}\u{FE0F}', heroBig: 'Shade gain +33%',
  heroSub: 'Solar panels turn sunlight into electricity. Tesla now splits a panel into three power zones so a shaded strip does not drag down the whole sheet.',
  cards: [
    { icon:'\u{1F4A1}', big:'3× zones', mid:'Three power sections', sub:'Shade on one still leaves two working' },
    { icon:'\u{1F319}', big:'+25%', mid:'Light-shade gain', sub:'More output in partial shade' },
    { icon:'\u{2601}\u{FE0F}', big:'+33%', mid:'Heavy-shade gain', sub:'Less loss when trees cover a strip' },
  ],
  quote: 'If leaves cover one edge, older panels lost power across the whole sheet. Zoning lets the shaded strip rest while sunny strips keep making power — that is real-world rooftop efficiency.',
  noteHead: 'Why it matters', noteSub: 'Separate from Megapack factories, Tesla Energy is attacking everyday shade with a number. Next is whether household generation actually rises. Higher power bills make this gain more valuable.',
  footer: 'Tesla · Solar shade',
});

add('tesla-megapack-77gwh', 'L2', 'TSLA', {
  badge: '테슬라', title: '테슬라 메가팩이 65개국 이상에 77기가와트시 넘게 설치됐습니다',
  heroIcon: '\u{1F50B}', heroBig: '77+ GWh',
  heroSub: '메가팩은 발전소·공장 옆에 두는 대형 배터리 컨테이너입니다. 지금까지 77기가와트시 이상이 깔렸고, 가동률은 99.3%로 집계됐습니다.',
  cards: [
    { label: '라스롭 공장', big: '연 40GWh', mid: '캘리포니아 기존 공장', sub: '이미 돌아가며 물량을 뽑고 있습니다' },
    { label: '텍사스 3공장', big: '연 50GWh', mid: '메가팩토리 3', sub: '두 공장을 합치면 연 90GWh입니다' },
    { label: '2분기 출하', big: '+13.5GWh', mid: '한 분기 설치량', sub: '65개국 이상으로 퍼졌습니다' },
  ],
  detailHead: '메가팩이 하는 일',
  detailLines: ['남는 전기를 모아 두었다가 저녁·피크 시간에 다시 내보냅니다', '가동률 99.3%는 거의 항상 켜져 있다는 뜻입니다', '공장 사진에는 캘리포니아·텍사스·상하이 라인의 대형 컨테이너가 보입니다'],
  quote: '기가와트시는 한 시간에 쓸 수 있는 전기의 큰 단위입니다. 77기가와트시면 수백만 가정이 몇 시간 버틸 수 있는 양이고, 테슬라는 이 재고를 공장 두 곳에서 더 빨리 채우려 합니다.',
  noteHead: '왜 중요한가', noteSub: '자동차 판매와 다른, 에너지 저장 매출의 바닥 숫자입니다. 공장 증설이 출하로 이어지면 분기 에너지 매출이 커질 수 있습니다. 다음 분기 출하가 13.5기가와트시를 넘기는지를 보면 됩니다.',
  footer: '테슬라 · 메가팩',
}, {
  badge: 'TSLA', title: 'Tesla Megapacks have been installed in 65+ countries, totaling over 77 GWh',
  heroIcon: '\u{1F50B}', heroBig: '77+ GWh',
  heroSub: 'A Megapack is a warehouse-size battery container for grids and factories. More than 77 GWh is in the field, with 99.3% uptime.',
  cards: [
    { label: 'Lathrop plant', big: '~40 GWh/yr', mid: 'California factory', sub: 'Already shipping volume' },
    { label: 'Texas plant 3', big: '~50 GWh/yr', mid: 'Megafactory 3', sub: 'Together ~90 GWh a year' },
    { label: 'Q2 deployments', big: '+13.5 GWh', mid: 'One-quarter installs', sub: 'Now in 65+ countries' },
  ],
  detailHead: 'What Megapack does',
  detailLines: ['Stores spare electricity and sends it back at peak hours', '99.3% uptime means the units are almost always available', 'Factory photos show large containers from California, Texas and Shanghai lines'],
  quote: 'A gigawatt-hour is a large unit of electricity. 77 GWh can cover millions of homes for hours, and Tesla is trying to refill that stock faster from two factories.',
  noteHead: 'Why it matters', noteSub: 'This is the floor number for energy-storage sales, separate from cars. If factory ramp shows up in shipments, quarterly energy revenue can grow. Watch whether the next quarter beats 13.5 GWh.',
  footer: 'Tesla · Megapack',
});

add('spacex-156-startup-data', 'L1', 'SPCX', {
  badge: '스페이스X', title: '스페이스X 장외가가 154.81달러로 오르며 시가총액이 하루 약 510억 달러 늘었습니다',
  heroIcon: '\u{1F680}', heroBig: '154.81달러',
  heroSub: '장외가는 거래소에 상장되기 전 장외에서 오가는 가격입니다. 전일보다 2.60% 오른 154.81달러로, 한 달 고점 156.87달러에 가깝습니다.',
  cards: [
    { icon:'\u{1F4B0}', big:'+510억불', mid:'오늘 시총 증가', sub:'스타십 일정 소식과 겹쳤습니다' },
    { icon:'\u{1F4C8}', big:'156.87달러', mid:'한 달 고점', sub:'현재가는 고점 바로 아래입니다' },
    { icon:'\u{1F4DA}', big:'데이터 매입', mid:'실패 스타트업 자료', sub:'인공지능 학습용으로 논의 중입니다' },
  ],
  quote: '스페이스X는 로켓 회사인 동시에 인공지능 학습 데이터를 사들이려는 논의도 하고 있습니다. 문을 닫은 스타트업이 남긴 내부 자료를 모델 훈련에 쓰려는 이야기입니다. 주가 급등과 데이터 매입은 같은 날 화면에 같이 올라왔습니다.',
  noteHead: '왜 중요한가', noteSub: '시총이 하루에 500억 달러 넘게 움직이면 상장 전 몸값이 다시 매겨지는 중입니다. 데이터 매입은 로켓과 별개인 인공지능 재료입니다. 실제 계약과 다음 스타십 비행이 이 가격을 받치는지 보면 됩니다.',
  footer: '스페이스X · 장외가',
}, {
  badge: 'SPCX', title: 'SpaceX shares rose to $154.81, adding about $51 billion of market cap in a day',
  heroIcon: '\u{1F680}', heroBig: '$154.81',
  heroSub: 'This is the pre-IPO secondary price. Shares were up 2.60% at $154.81, just under the one-month high of $156.87.',
  cards: [
    { icon:'\u{1F4B0}', big:'+$51B', mid:'Market-cap jump today', sub:'Landed with Starship calendar news' },
    { icon:'\u{1F4C8}', big:'$156.87', mid:'One-month high', sub:'Spot price sits just below' },
    { icon:'\u{1F4DA}', big:'Data talks', mid:'Failed-startup files', sub:'Being discussed for AI training' },
  ],
  quote: 'SpaceX is a rocket company that is also talking about buying data from failed startups to train AI models. The cap jump and the data talks showed up on the same screen.',
  noteHead: 'Why it matters', noteSub: 'A $50B one-day cap move reprices the company before any IPO. Data buying is a separate AI story from rockets. Watch whether real contracts and the next Starship flight support this tape.',
  footer: 'SpaceX · Secondary tape',
});

add('openai-millennium-prize', 'L4', 'AI', {
  badge: 'OpenAI', title: 'OpenAI가 수학 밀레니엄 난제 하나를 또 풀어가는 단계에 들어섰다는 소식이 나왔습니다',
  badgeLine: '밀레니엄 난제 · 인공지능 수학',
  heroIcon: '\u{1F4D0}', heroBig: '난제 접근',
  heroSub: '밀레니엄 난제는 2000년에 지정된 수학 문제 일곱 개로, 하나당 상금 100만 달러가 걸려 있습니다. OpenAI 모델이 또 하나의 문제에 근접했다는 설명이 퍼졌습니다.',
  cards: [
    { icon:'\u{1F3AF}', big:'7개 중', mid:'밀레니엄 문제', sub:'아직 대부분 미해결입니다' },
    { icon:'\u{1F4B5}', big:'100만불', mid:'문제당 상금', sub:'증명 자체보다 신뢰가 중요합니다' },
    { icon:'\u{1F916}', big:'모델', mid:'인공지능 추론', sub:'계산기가 아니라 증명 보조입니다' },
  ],
  quote: '밀레니엄 난제는 클레이수학연구소가 고른 일곱 문제입니다. 인공지능이 답을 냈다고 해서 수학계가 바로 인정하는 것은 아니고, 사람이 검증해야 증명이 됩니다. 지금은 모델이 그 문턱 근처에 왔다는 단계입니다.',
  noteHead: '왜 중요한가', noteSub: '챗봇 대화를 넘어, 모델이 오랜 수학 난제에 손을 댄다는 것은 추론 능력이 연구 도구로 쓰이기 시작했다는 뜻입니다. 공식 검증이 나오면 이야기가 사실이 됩니다. 그 전까지는 접근 단계로 적어 두면 됩니다.',
  footer: 'OpenAI · 수학 난제',
}, {
  badge: 'OpenAI', title: 'OpenAI is said to be close to solving another Millennium Prize math problem',
  badgeLine: 'Millennium Prize · AI math',
  heroIcon: '\u{1F4D0}', heroBig: 'Near a prize problem',
  heroSub: 'The Millennium Prize Problems are seven math questions named in 2000, each with a $1 million bounty. Reports say an OpenAI model is nearing another of them.',
  cards: [
    { icon:'\u{1F3AF}', big:'7 problems', mid:'Millennium list', sub:'Most are still unsolved' },
    { icon:'\u{1F4B5}', big:'$1M', mid:'Prize per problem', sub:'Human verification still rules' },
    { icon:'\u{1F916}', big:'The model', mid:'AI reasoning', sub:'A proof helper, not a calculator' },
  ],
  quote: 'The Clay Mathematics Institute named seven problems. An AI draft is not a proof until people check it. Today’s news is that a model is near that door, not that the prize is already won.',
  noteHead: 'Why it matters', noteSub: 'This is past chatbot chat — models are being tried on century-class math. A verified write-up would make it real. Until then, treat it as an approach, not a trophy.',
  footer: 'OpenAI · Millennium math',
});

add('tesla-ai5-samsung-taylor', 'L2', 'TSLA', {
  badge: '테슬라', title: '삼성 텍사스 테일러 공장에서 테슬라 AI5 칩 시험생산이 시작됐습니다',
  heroIcon: '\u{1F4BE}', heroBig: '2나노 시험생산',
  heroSub: 'AI5는 테슬라가 자율주행·로봇에 쓰려고 설계한 자체 인공지능 칩입니다. 삼성전자의 새 테일러 공장에서 2나노 공정 웨이퍼가 나와 양산 검증에 들어갔습니다.',
  cards: [
    { label: '공정', big: '2nm', mid: '첨단 미세 공정', sub: '회로 선폭이 더 가늘어 전력 대비 성능이 올라갑니다' },
    { label: '장소', big: '테일러 TX', mid: '삼성 신규 팹', sub: '웨이퍼가 실제로 생산되고 있습니다' },
    { label: '공급 목표', big: '2027', mid:'칩 양산 시점', sub: '시험생산 다음 단계가 대량 공급입니다' },
  ],
  detailHead: '지금 공장에서 일어나는 일',
  detailLines: ['웨이퍼는 칩이 만들어지기 전 둥근 실리콘 원판입니다', '양산 검증은 불량률을 낮춰 대량으로 찍어낼 수 있는지 확인하는 단계입니다', '테슬라 자체 공장 이야기가 아니라 삼성 팹 라인을 쓰는 소식입니다'],
  quote: '2나노는 회로를 아주 얇게 그리는 공정 이름입니다. 같은 전력으로 더 많은 계산을 할 수 있어 자동차·로봇 칩에 유리합니다. 2027년 공급은 시험생산이 수율을 통과한 뒤의 목표입니다.',
  noteHead: '왜 중요한가', noteSub: '테슬라가 엔비디아 칩만 기다리지 않고 삼성 최선단 라인에서 자기 칩을 검증하는 단계입니다. 수율이 나오면 원가와 성능 이야기가 동시에 좋아질 수 있습니다. 2027년 탑재 차종이 공개되는지를 보면 됩니다.',
  footer: '테슬라 · AI5 삼성',
}, {
  badge: 'TSLA', title: 'Tesla AI5 trial production started at Samsung’s new Taylor, Texas fab',
  heroIcon: '\u{1F4BE}', heroBig: '2nm trial run',
  heroSub: 'AI5 is Tesla’s custom chip for driving and robots. Samsung’s new Taylor fab has produced advanced 2nm wafers and is in mass-production verification.',
  cards: [
    { label: 'Process', big: '2nm', mid: 'Leading-edge node', sub: 'Thinner traces mean more compute per watt' },
    { label: 'Site', big: 'Taylor TX', mid: 'Samsung’s new fab', sub: 'Wafers are already coming off the line' },
    { label: 'Chip target', big: '2027', mid: 'Volume supply window', sub: 'Trial run is the step before mass output' },
  ],
  detailHead: 'What is happening on the line',
  detailLines: ['A wafer is the round silicon disc before chips are cut out', 'Mass-production checks test whether defect rates can support volume', 'This is Samsung’s fab line, not Tesla’s own foundry story'],
  quote: '2nm is a name for drawing circuits extremely fine. More compute per watt helps car and robot chips. 2027 supply is the goal after yields clear the trial.',
  noteHead: 'Why it matters', noteSub: 'Tesla is proving its own chip on Samsung’s newest line instead of waiting only on Nvidia. If yields land, cost and performance can improve together. Watch which 2027 vehicles get the chip.',
  footer: 'Tesla · AI5 Samsung',
});

add('nebius-gpu-plus20', 'L1', 'AI', {
  badge: 'Nebius', title: 'Nebius가 10월 1일부터 GPU 임대료를 약 20% 올린다고 알렸습니다',
  heroIcon: '\u{1F4BB}', heroBig: '+20%',
  heroSub: 'Nebius는 데이터센터에서 그래픽처리장치를 빌려주는 회사입니다. GPU 임대는 칩을 사지 않고 시간 단위로 빌려 인공지능 모델을 돌리는 서비스입니다.',
  cards: [
    { icon:'\u{1F4C5}', big:'10월 1일', mid:'인상 시행일', sub:'기존 임대 계약부터 적용됩니다' },
    { icon:'\u{1F4B0}', big:'약 20%', mid:'임대료 인상폭', sub:'연산 수요가 가격을 밀어 올렸습니다' },
    { icon:'\u{1F3E2}', big:'렌탈', mid:'칩을 사지 않고 빌림', sub:'클라우드 GPU 시장의 체감 물가입니다' },
  ],
  quote: '인공지능 회사는 칩을 수만 장 단위로 사지 못하면 임대로 버팁니다. 임대료가 20% 오르면 모델 학습 비용이 바로 올라갑니다. 엔비디아 칩 판매와 별개로, 이미 깔린 칩의 사용료가 오르는 소식입니다.',
  noteHead: '왜 중요한가', noteSub: '칩 품귀가 렌탈 가격으로 나타나는 장면입니다. Nebius 인상이 다른 임대 업체에도 퍼지면 인공지능 운영비가 한 단계 올라갑니다. 10월 이후 재계약 공지가 이어지는지를 보면 됩니다.',
  footer: 'Nebius · GPU 임대',
}, {
  badge: 'Nebius', title: 'Nebius said GPU rental prices will rise about 20% from October 1',
  heroIcon: '\u{1F4BB}', heroBig: '+20%',
  heroSub: 'Nebius rents graphics processors from its data centers. GPU rental means paying by the hour to train AI models instead of buying the chips.',
  cards: [
    { icon:'\u{1F4C5}', big:'Oct 1', mid:'Effective date', sub:'Hits existing rental contracts' },
    { icon:'\u{1F4B0}', big:'~20%', mid:'Price increase', sub:'Compute demand is lifting rents' },
    { icon:'\u{1F3E2}', big:'Rental', mid:'Use, don’t buy', sub:'A street price for cloud GPUs' },
  ],
  quote: 'AI shops that cannot buy chips by the million rent them instead. A 20% rent hike lifts training costs immediately. This is the price of chips already installed, separate from Nvidia’s sales tally.',
  noteHead: 'Why it matters', noteSub: 'Chip scarcity is showing up in rental prices. If other landlords follow Nebius, AI running costs step up. Watch whether more October renewal notices land.',
  footer: 'Nebius · GPU rental',
});

add('cybercab-dallas-atlanta', 'L6', 'TSLA', {
  badge: '테슬라', title: '테슬라 사이버캡이 텍사스 댈러스와 조지아 애틀랜타에서도 목격됐습니다',
  breaking: '신규 목격 도시',
  heroBig: '댈러스·애틀랜타', heroSub: '사이버캡은 운전대와 페달이 없는 전용 로보택시입니다. 오스틴 시험에 더해 댈러스와 애틀랜타 도로에서도 차량이 포착됐습니다.',
  grid: [
    { icon:'\u{1F4CD}', big:'댈러스', mid:'텍사스', sub:'오스틴과 같은 주, 다른 도시' },
    { icon:'\u{1F4CD}', big:'애틀랜타', mid:'조지아', sub:'동남부 허브 도시입니다' },
    { icon:'\u{1F698}', big:'무핸들', mid:'전용 차체', sub:'모델Y 개조가 아닌 로보택시 전용' },
    { icon:'\u{1F30E}', big:'확장', mid:'검증 도시 증가', sub:'유료 서비스 전 데이터 수집 단계' },
  ],
  ctx1: '목격은 서비스 개시가 아니라, 그 도시 도로 데이터를 모으는 단계입니다.',
  ctx2: '텍사스 안에서도 오스틴 다음 도시를 여는 모습이 처음 뚜렷해졌습니다.',
  quote: '로보택시는 한 도시 도로에 익숙해진 뒤 옆 도시로 지도를 넓힙니다. 댈러스는 같은 주 확장이고, 애틀랜타는 다른 주 동남부 축입니다. 두 도시가 같은 화면에 올라왔다는 점이 오늘 장면입니다.',
  noteHead: '왜 중요한가', noteSub: '서비스 도시가 늘수록 이동 매출 이야기가 구체적해집니다. 다만 목격과 유료 운행 사이에는 시차가 있습니다. 두 도시에서 승객을 태우는 허가가 나오는지를 다음에 보면 됩니다.',
  footer: '테슬라 · 사이버캡 도시',
}, {
  badge: 'TSLA', title: 'Tesla Cybercabs were spotted in Dallas, Texas and Atlanta, Georgia',
  breaking: 'New city sightings',
  heroBig: 'Dallas · Atlanta', heroSub: 'Cybercab is the wheel-and-pedal-free robotaxi. On top of Austin tests, units were caught on Dallas and Atlanta roads.',
  grid: [
    { icon:'\u{1F4CD}', big:'Dallas', mid:'Texas', sub:'Same state as Austin, new city' },
    { icon:'\u{1F4CD}', big:'Atlanta', mid:'Georgia', sub:'A Southeast hub city' },
    { icon:'\u{1F698}', big:'No wheel', mid:'Dedicated body', sub:'Not a Model Y conversion' },
    { icon:'\u{1F30E}', big:'Expansion', mid:'More test cities', sub:'Data gathering before paid rides' },
  ],
  ctx1: 'A sighting is road-data work, not a launch of paid service.',
  ctx2: 'Inside Texas, a city after Austin is now clearly on the board.',
  quote: 'Robotaxis learn one city, then widen the map. Dallas is same-state expansion; Atlanta is a different-state Southeast axis. Both landing on the same day’s feed is the story.',
  noteHead: 'Why it matters', noteSub: 'More cities make the mobility-revenue story more concrete. Sightings still lead paid rides by weeks or months. Next is whether passenger permits show up in either city.',
  footer: 'Tesla · Cybercab cities',
});

add('tesla-megacharger-1.2mw', 'L3', 'TSLA', {
  badge: '테슬라', title: '테슬라가 세미 트럭용 메가차저를 공장에서 미리 조립해 현장으로 보내기 시작했습니다',
  heroIcon: '\u{26A1}', heroBig: '1.2MW/포스트',
  heroSub: '메가차저는 전기 세미 트럭을 아주 빠르게 충전하는 설비입니다. 이번이 공장에서 미리 조립한 첫 출하로, V4 캐비닛 하나에 충전 기둥 두 개가 붙습니다.',
  cards: [
    { icon:'\u{1F69A}', big:'세미용', mid:'대형 트럭 충전', sub:'승용 슈퍼차저보다 출력이 훨씬 큽니다' },
    { icon:'\u{1F3ED}', big:'사전 조립', mid:'공장에서 붙여 출하', sub:'현장에서 조립 시간을 줄입니다' },
    { icon:'\u{1F50C}', big:'1.2MW', mid:'기둥 하나 최대 출력', sub:'V4 캐비닛이 기둥 두 개를 먹입니다' },
  ],
  quote: '메가와트는 전기 출력의 큰 단위입니다. 기둥 하나가 1.2메가와트면 세미 배터리를 휴게소 정차 시간에 가깝게 채울 수 있습니다. 공장에서 미리 붙이면 설치 비용과 공사 기간이 같이 줄어듭니다.',
  noteHead: '왜 중요한가', noteSub: '세미 판매는 충전망이 따라와야 커집니다. 공장에서 미리 조립한 1.2메가와트 기둥이 그 지도를 더 빨리 넓히는 방법입니다. 이번 출하 이후 실제 충전소가 몇 곳 열리는지를 보면 됩니다.',
  footer: '테슬라 · 메가차저',
}, {
  badge: 'TSLA', title: 'Tesla began shipping the first factory pre-assembled Megachargers for Semi trucks',
  heroIcon: '\u{26A1}', heroBig: '1.2 MW per post',
  heroSub: 'A Megacharger is a high-power stall for electric Semi trucks. This is the first pre-assembled shipment: one V4 cabinet feeds two posts.',
  cards: [
    { icon:'\u{1F69A}', big:'Semi duty', mid:'Heavy-truck charging', sub:'Far higher power than car Superchargers' },
    { icon:'\u{1F3ED}', big:'Pre-built', mid:'Assembled at the factory', sub:'Cuts time spent building on site' },
    { icon:'\u{1F50C}', big:'1.2 MW', mid:'Max per charging post', sub:'A V4 cabinet drives two posts' },
  ],
  quote: 'A megawatt is a large unit of electric power. 1.2 MW per post can refill a Semi closer to a rest-stop stop. Building the cabinet in the factory trims both install cost and calendar time.',
  noteHead: 'Why it matters', noteSub: 'Semi sales need a charging map that keeps up. Pre-assembled 1.2 MW stalls are how that map gets built faster. Watch how many sites go live after this first shipment.',
  footer: 'Tesla · Megacharger',
});

add('optimus-china-audit-rumor', 'L4', 'TSLA', {
  badge: '테슬라', title: '테슬라 로봇 담당이 10월 양산을 앞두고 중국 공급망을 점검 중이라는 미확인 소식이 나왔습니다',
  badgeLine: '미확인 · 공급망 점검 관측',
  heroIcon: '\u{1F916}', heroBig: '미확인 관측',
  heroSub: '옵티머스는 테슬라가 만드는 인간형 로봇입니다. 상하이·항저우·닝보·샤먼 공장 감사가 10월 양산 전에 이뤄지고 있다는 이야기는 아직 회사가 확인하지 않은 단계입니다.',
  cards: [
    { icon:'\u{1F4CB}', big:'미확인', mid:'공식 발표 아님', sub:'현장 소문을 사실과 구분해 적습니다' },
    { icon:'\u{1F30F}', big:'중국 4곳', mid:'상하이·항저우·닝보·샤먼', sub:'부품 공급사 점검으로 거론됩니다' },
    { icon:'\u{1F4C5}', big:'10월', mid:'양산 목표 관측', sub:'감사 목적이 대량 생산 준비라는 해석입니다' },
  ],
  quote: '공급망 감사는 부품이 제때, 제 품질로 오는지 공장을 도는 일입니다. 로봇 양산 전에는 흔한 절차입니다. 다만 오늘 숫자는 회사가 올린 일정이 아니라, 확인되지 않은 관측입니다.',
  noteHead: '왜 중요한가', noteSub: '옵티머스 양산이 가까워지면 공급망 소식이 먼저 나옵니다. 미확인 단계에서는 도시 이름만 외우지 말고, 테슬라가 10월 전후로 생산 사진을 공개하는지를 보면 됩니다. 확인되면 로봇 일정이 달력으로 내려옵니다.',
  footer: '테슬라 · 옵티머스 관측',
}, {
  badge: 'TSLA', title: 'Unconfirmed reports say Tesla robotics staff are auditing China suppliers before October mass production',
  badgeLine: 'Unconfirmed · supply-chain checks',
  heroIcon: '\u{1F916}', heroBig: 'Unconfirmed',
  heroSub: 'Optimus is Tesla’s humanoid robot. Talk of factory audits in Shanghai, Hangzhou, Ningbo and Xiamen ahead of October mass production has not been confirmed by the company.',
  cards: [
    { icon:'\u{1F4CB}', big:'Unconfirmed', mid:'Not an official note', sub:'Keep rumor and fact on separate lines' },
    { icon:'\u{1F30F}', big:'Four cities', mid:'Shanghai to Xiamen', sub:'Described as supplier plant checks' },
    { icon:'\u{1F4C5}', big:'October', mid:'Mass-prod rumor', sub:'Audits framed as a ramp prelude' },
  ],
  quote: 'A supply-chain audit is a walk through plants to see if parts arrive on time and on spec. That is normal before robot volume. Today’s list is still an unconfirmed observation, not a Tesla calendar.',
  noteHead: 'Why it matters', noteSub: 'Supplier chatter often leads Optimus volume news. Until Tesla posts production photos around October, treat city names as a watchlist, not a launch. Confirmation would drop the robot onto a real calendar.',
  footer: 'Tesla · Optimus rumor',
});

add('openai-mccarthy-spacex', 'L4', 'AI', {
  badge: 'OpenAI', title: 'OpenAI가 스페이스X에서 브라이언 매카시를 전 세계 영업 부사장으로 영입했습니다',
  badgeLine: '영업 수장 이동',
  heroIcon: '\u{1F91D}', heroBig: '영업 부사장 영입',
  heroSub: '전 세계 영업 부사장은 기업 고객에게 제품 계약을 따오는 자리입니다. 로켓·위성 판매를 맡던 인물이 인공지능 회사의 기업 영업을 맡게 됐습니다.',
  cards: [
    { icon:'\u{1F680}', big:'스페이스X', mid:'이전 직장', sub:'발사·위성 계약을 다루던 자리입니다' },
    { icon:'\u{1F4BC}', big:'OpenAI', mid:'새 직장', sub:'기업용 인공지능 계약을 넓히는 역할입니다' },
    { icon:'\u{1F30D}', big:'전 세계', mid:'영업 범위', sub:'한 나라가 아니라 글로벌 수주입니다' },
  ],
  quote: '인공지능 회사도 이제는 연구소가 아니라 영업 조직을 키우고 있습니다. 스페이스X처럼 큰 기업 계약을 닫아 본 사람을 앉힌 것은, 챗봇 구독보다 연 단위 기업 계약을 노린다는 신호입니다.',
  noteHead: '왜 중요한가', noteSub: '인재 이동은 실적 숫자보다 한 박자 빠른 힌트입니다. 우주 쪽 영업 경험을 인공지능 수주에 옮기면 대기업 계약 속도가 달라질 수 있습니다. 다음 분기 기업 매출 공지가 이 인사를 뒷받침하는지를 보면 됩니다.',
  footer: 'OpenAI · 인사',
}, {
  badge: 'OpenAI', title: 'OpenAI hired Brian McCarthy from SpaceX as vice president of worldwide sales',
  badgeLine: 'Sales-lead move',
  heroIcon: '\u{1F91D}', heroBig: 'VP of worldwide sales',
  heroSub: 'Worldwide sales is the job of closing company contracts. Someone who sold rockets and satellites will now sell enterprise AI.',
  cards: [
    { icon:'\u{1F680}', big:'SpaceX', mid:'Prior seat', sub:'Launch and satellite deals' },
    { icon:'\u{1F4BC}', big:'OpenAI', mid:'New seat', sub:'Widening enterprise AI contracts' },
    { icon:'\u{1F30D}', big:'Worldwide', mid:'Sales scope', sub:'Global bookings, not one country' },
  ],
  quote: 'AI labs are building sales forces, not just research benches. Hiring someone who closed huge industrial contracts is a signal that annual enterprise deals matter more than chatbot subs.',
  noteHead: 'Why it matters', noteSub: 'People moves often lead the revenue print. Space sales skills applied to AI could change how fast large companies sign. Watch whether the next enterprise-revenue update backs this hire.',
  footer: 'OpenAI · Hire',
});

add('google-spirit-10m', 'L4', 'GOOGL', {
  badge: '구글', title: '구글이 스피릿항공 내부 자료를 1,000만 달러에 사들이는 쪽으로 이야기가 모이고 있습니다',
  badgeLine: '항공사 데이터 · 인수 아님',
  heroIcon: '\u{2708}\u{FE0F}', heroBig: '1,000만 달러',
  heroSub: '스피릿항공은 미국 저비용 항공사로, 회사를 통째로 사는 인수가 아니라 쪼개 파는 과정에 있습니다. 구글이 사려는 것은 비행기 회사가 아니라 내부 운항·고객 데이터입니다.',
  cards: [
    { icon:'\u{1F4B5}', big:'1,000만불', mid:'데이터 대금', sub:'항공사 전체 몸값보다 훨씬 작은 금액입니다' },
    { icon:'\u{1F4C1}', big:'내부 자료', mid:'운항·고객 기록', sub:'검색·지도·여행 모델에 쓰일 수 있습니다' },
    { icon:'\u{274C}', big:'인수 아님', mid:'SAVE 해체 과정', sub:'항공사를 삼키는 거래가 아닙니다' },
  ],
  quote: '데이터 매입은 회사 지분을 사는 것과 다릅니다. 문을 닫거나 쪼개지는 기업이 남긴 운항 기록을 사면, 검색·지도 서비스가 현실 이동 패턴을 더 잘 배울 수 있습니다. 금액이 1,000만 달러인 이유입니다.',
  noteHead: '왜 중요한가', noteSub: '구글이 항공사를 사는 뉴스가 아닙니다. 실패한·해체되는 회사에서 학습 데이터를 건지는 흐름이고, 스페이스X의 스타트업 데이터 논의와 같은 줄에 있습니다. 계약 종결 여부가 다음 확인입니다.',
  footer: '구글 · 항공 데이터',
}, {
  badge: 'GOOGL', title: 'Google is lining up a $10 million purchase of Spirit Airlines internal data',
  badgeLine: 'Airline data · not an airline buy',
  heroIcon: '\u{2708}\u{FE0F}', heroBig: '$10 million',
  heroSub: 'Spirit is a US low-cost airline being broken up, not taken over whole. Google would be buying operations and customer files, not the airline itself.',
  cards: [
    { icon:'\u{1F4B5}', big:'$10M', mid:'Data price', sub:'Far below an airline takeover' },
    { icon:'\u{1F4C1}', big:'Internal files', mid:'Ops and customer records', sub:'Useful for search, maps and travel models' },
    { icon:'\u{274C}', big:'Not a takeover', mid:'SAVE breakup path', sub:'Google is not swallowing the airline' },
  ],
  quote: 'Buying data is not buying equity. Files from a carrier being broken up can teach search and maps how people actually fly. That is why the check is $10 million, not billions.',
  noteHead: 'Why it matters', noteSub: 'This is not Google buying an airline. It is the same salvage-the-training-data pattern as SpaceX’s failed-startup talks. Next is whether the contract actually closes.',
  footer: 'Google · Airline data',
});

add('us-japan-550b-chips', 'L6', 'MACRO', {
  badge: '매크로', title: '미국과 일본이 550억 달러 규모 반도체 공장 지원을 놓고 협의에 들어갔습니다',
  breaking: '미·일 반도체 공장',
  heroBig: '550억 달러', heroSub: '반도체 공장은 칩을 찍어내는 대형 제조 시설입니다. 두 나라가 이 정도 규모의 공장 투자를 어떻게 나눌지를 협의하기 시작했습니다.',
  grid: [
    { icon:'\u{1F1FA}\u{1F1F8}', big:'미국', mid:'공장 유치', sub:'자국 안에 생산 라인을 늘리려 합니다' },
    { icon:'\u{1F1EF}\u{1F1F5}', big:'일본', mid:'장비·소재', sub:'반도체 소재 강국이 자금을 맞춥니다' },
    { icon:'\u{1F3ED}', big:'550억불', mid:'협의 규모', sub:'아직 서명된 최종 계약은 아닙니다' },
    { icon:'\u{1F4E6}', big:'공급망', mid:'동맹 생산', sub:'한 나라에만 공장을 두지 않으려는 움직임입니다' },
  ],
  ctx1: '숫자는 협의안이라 의회·내각 승인을 거쳐야 집행됩니다.',
  ctx2: '한국 메모리 업체와 대만 파운드리 투자 흐름과도 겹치는 큰 그림입니다.',
  quote: '칩 공장은 짓는 데 수년이 걸리고 전기·물이 많이 듭니다. 국가가 보조금을 넣는 이유는 안보와 일자리 때문입니다. 550억 달러는 공장 몇 개를 동시에 밀어 올릴 수 있는 큰 봉투입니다.',
  noteHead: '왜 중요한가', noteSub: '미·일이 공장 돈을 같이 쓰면 아시아 공급망 지도가 바뀝니다. 한국 장비·소재 회사에도 주문이 올 수 있습니다. 양해각서나 부지 발표가 나오는지를 보면 협의가 계약으로 바뀝니다.',
  footer: '매크로 · 미일 반도체',
}, {
  badge: 'MACRO', title: 'The US and Japan opened talks on a $550 billion semiconductor factory package',
  breaking: 'US-Japan chip plants',
  heroBig: '$550 billion', heroSub: 'A chip factory is a giant plant that prints semiconductors. The two countries started talking about how to split an investment of this size.',
  grid: [
    { icon:'\u{1F1FA}\u{1F1F8}', big:'US', mid:'Hosting plants', sub:'Wants more lines onshore' },
    { icon:'\u{1F1EF}\u{1F1F5}', big:'Japan', mid:'Tools and materials', sub:'A materials power matching funds' },
    { icon:'\u{1F3ED}', big:'$550B', mid:'Talks scale', sub:'Not a signed final contract yet' },
    { icon:'\u{1F4E6}', big:'Supply', mid:'Allied plants', sub:'Avoiding a single-country plant map' },
  ],
  ctx1: 'The figure is a negotiating envelope; legislatures still have to fund it.',
  ctx2: 'It sits beside Korean memory and Taiwan foundry investment flows.',
  quote: 'Chip plants take years and huge amounts of power and water. Governments write subsidies for security and jobs. $550 billion is a large envelope that could stand up several plants at once.',
  noteHead: 'Why it matters', noteSub: 'Shared US-Japan factory money redraws the Asian supply map. Korean tool and materials firms could see orders too. An MOU or site announcement would turn talks into a contract.',
  footer: 'Macro · US-Japan chips',
});

add('musk-starship-million-tons', 'L1', 'SPCX', {
  badge: '스페이스X', title: '일론 머스크가 스타십으로 매년 100만~1,000만 톤을 궤도에 올리겠다고 말했습니다',
  heroIcon: '\u{269B}', heroBig: '100만~1,000만 톤',
  heroSub: '궤도에 올리는 톤수는 로켓이 한 해에 우주로 실어 나르는 화물 무게입니다. 지금의 전 세계 발사량을 수십 배에서 수백 배로 키우겠다는 목표입니다.',
  cards: [
    { icon:'\u{1F680}', big:'스타십', mid:'초대형 재사용 로켓', sub:'한 번에 많이, 자주 쏘는 게 핵심입니다' },
    { icon:'\u{1F4CA}', big:'연 100만톤+', mid:'제시한 하한', sub:'지금은 전 세계가 이 규모의 일부입니다' },
    { icon:'\u{1F30C}', big:'연 1,000만톤', mid:'제시한 상한', sub:'위성·기지·연료까지 실어 나르는 그림입니다' },
  ],
  quote: '지금은 전 세계 로켓이 한 해에 올리는 화물이 수천 톤 수준입니다. 100만 톤은 그 세계를 완전히 다른 산업으로 바꾸는 숫자입니다. 발언은 목표이지, 내년 실적이 아닙니다.',
  noteHead: '왜 중요한가', noteSub: '발사 원가가 떨어질수록 위성 인터넷과 우주 물류 매출이 커질 수 있습니다. 14차 비행이 궤도를 열면 이 목표의 첫 칸이 채워집니다. 연간 발사 횟수가 실제로 늘는지가 확인 포인트입니다.',
  footer: '스페이스X · 궤도 톤수',
}, {
  badge: 'SPCX', title: 'Elon Musk said Starship could put 1 to 10 million tons into orbit each year',
  heroIcon: '\u{269B}', heroBig: '1–10 million tons',
  heroSub: 'Tons to orbit is the cargo weight rockets lift in a year. The target is tens to hundreds of times today’s global launch mass.',
  cards: [
    { icon:'\u{1F680}', big:'Starship', mid:'Giant reusable rocket', sub:'More mass, more often is the point' },
    { icon:'\u{1F4CA}', big:'1M tons/yr', mid:'Low end of the range', sub:'The world today lifts a fraction of that' },
    { icon:'\u{1F30C}', big:'10M tons/yr', mid:'High end of the range', sub:'Sats, bases and fuel in the same picture' },
  ],
  quote: 'The whole planet currently lifts thousands of tons a year. A million tons would turn launch into a different industry. The remark is a target, not next year’s result.',
  noteHead: 'Why it matters', noteSub: 'Cheaper mass to orbit can grow satellite internet and space logistics. Flight 14 reaching orbit would fill the first square. Watch whether yearly flight counts actually climb.',
  footer: 'SpaceX · Mass to orbit',
});

add('jensen-nvda-double-chips', 'L2', 'NVDA', {
  badge: '엔비디아', title: '젠슨 황이 엔비디아가 내년에 칩을 올해의 두 배 팔 것으로 본다고 말했습니다',
  heroIcon: '\u{1F4E6}', heroBig: '내년 2배',
  heroSub: '엔비디아 최고경영자가 내년 판매 칩 수량이 올해의 두 배가 될 것이라고 전망했습니다. 인공지능 데이터센터 수요가 그만큼 남아 있다는 평가입니다.',
  cards: [
    { label: '전망 주체', big: '젠슨 황', mid: '최고경영자 발언', sub: '실적 가이던스가 아니라 방향 제시입니다' },
    { label: '판매량', big: '×2', mid: '내년 대비 올해', sub: '금액이 아니라 칩 개수 이야기입니다' },
    { label: '배경', big: 'AI 수요', mid: '데이터센터 증설', sub: '임대료 인상 소식과도 같은 줄입니다' },
  ],
  detailHead: '이 발언이 가리키는 것',
  detailLines: ['칩 개수가 두 배면 공급 능력과 고객 주문이 같이 따라와야 합니다', '금액 성장은 가격 믹스에 따라 두 배보다 크거나 작을 수 있습니다', 'Nebius 임대료 인상은 이미 깔린 칩의 사용료가 오르는 옆 장면입니다'],
  quote: '최고경영자가 내년 물량을 두 배로 말하면, 공장이 그 물량을 만들 수 있다고 본다는 뜻에 가깝습니다. 실제 실적은 분기마다 확인하면 됩니다.',
  noteHead: '왜 중요한가', noteSub: '인공지능 투자가 정점이라면 물량 두 배는 말하기 어렵습니다. 이 발언은 수요가 아직 공장을 채운다는 쪽에 가깝습니다. 다음 분기 GPU 출하가 그 경로를 가리키는지를 보면 됩니다.',
  footer: '엔비디아 · 판매 전망',
}, {
  badge: 'NVDA', title: 'Jensen Huang said Nvidia expects to sell twice as many chips next year',
  heroIcon: '\u{1F4E6}', heroBig: '2× next year',
  heroSub: 'Nvidia’s chief executive said unit sales next year could double this year’s. That is a read that data-center AI demand still has room.',
  cards: [
    { label: 'Who said it', big: 'Jensen Huang', mid: 'CEO comment', sub: 'A direction, not a filed guide' },
    { label: 'Units', big: '×2', mid: 'Next year vs this year', sub: 'About chip count, not dollars' },
    { label: 'Backdrop', big: 'AI demand', mid: 'Data-center buildout', sub: 'Sits beside GPU rental hikes' },
  ],
  detailHead: 'What the comment points to',
  detailLines: ['Doubling units needs both factory output and customer orders', 'Dollar growth can run above or below 2× depending on mix', 'Nebius rent hikes are the price of chips already in racks'],
  quote: 'When a CEO talks about doubling units, it usually means the company thinks it can build that volume. Quarterly results still have to prove it.',
  noteHead: 'Why it matters', noteSub: 'If AI capex is peaking, unit doubling would be hard to say out loud. The comment argues demand is still filling fabs. Watch whether the next quarter’s GPU shipments step toward that path.',
  footer: 'Nvidia · Unit outlook',
});

add('cathie-starship-1b-launch', 'L2', 'SPCX', {
  badge: '스페이스X', title: '캐시 우드가 스타십 발사 한 번에 약 10억 달러 매출이 가능하다고 계산했습니다',
  heroIcon: '\u{1F4B0}', heroBig: '발사당 10억불',
  heroSub: '아크인베스트 캐시 우드는 스타십이 연 1만 회 뜨면 2030년께 매출이 10조 달러에 닿을 수 있다고 봤습니다. 그 가정 아래 1.75조 달러 상장은 오히려 싸다는 평가입니다.',
  cards: [
    { label: '발사당 매출', big: '약 10억불', mid: '한 번 쏠 때', sub: '위성·화물 운임을 크게 잡은 시나리오입니다' },
    { label: '연 발사', big: '1만 회', mid: '2030년 가정', sub: '지금은 시험 비행이 몇 달에 한 번입니다' },
    { label: '상장 평가', big: '1.75조불', mid: 'IPO가 싸다?', sub: '발사 횟수 가정이 맞을 때의 이야기입니다' },
  ],
  detailHead: '숫자를 나누어 보면',
  detailLines: ['10억×1만 회=10조 달러는 산술이지 수주 장부가 아닙니다', '14차가 궤도에 성공해야 이 그림의 첫 칸이 열립니다', '지금은 시험 비행이 한 해에 열 번 남짓입니다'],
  quote: '조 단위 매출 시나리오는 스타십이 항공사처럼 자주 떠야 성립합니다. 2030년 이야기이지 올해 수주가 아닙니다. 발사당 10억 달러는 천장 가정으로 두고, 실제 발사 횟수를 세면 됩니다.',
  noteHead: '왜 중요한가', noteSub: '낙관적인 상장 계산은 장외가를 움직일 수 있지만, 증명은 발사 횟수입니다. 연간 비행이 십수 회에 머무르면 10조 달러 그림은 슬라이드에 남습니다. 배수보다 발사 횟수를 먼저 세면 됩니다.',
  footer: '스페이스X · 발사 매출 시나리오',
}, {
  badge: 'SPCX', title: 'Cathie Wood said each Starship launch could generate about $1 billion of revenue',
  heroIcon: '\u{1F4B0}', heroBig: '$1B per launch',
  heroSub: 'ARK’s Cathie Wood argued 10,000 flights a year could mean $10 trillion of revenue by 2030, which would make a $1.75 trillion IPO look cheap.',
  cards: [
    { label: 'Per launch', big: '~$1B', mid: 'One flight', sub: 'A large sat-and-cargo fare case' },
    { label: 'Flights / year', big: '10,000', mid: '2030 assumption', sub: 'Tests still fly months apart today' },
    { label: 'IPO view', big: '$1.75T', mid: 'Called inexpensive', sub: 'Only if the cadence case holds' },
  ],
  detailHead: 'Split the arithmetic',
  detailLines: ['$1B times 10,000 is math, not a booked backlog', 'Flight 14 has to reach orbit before this picture even starts', 'Today’s tape is still a handful of test flights a year'],
  quote: 'A trillion-dollar sales case needs Starship to fly like an airline. That is a 2030 story, not a 2026 booking. Treat the $1 billion-per-launch line as a ceiling case, then watch actual flight cadence.',
  noteHead: 'Why it matters', noteSub: 'Bullish IPO math can move the secondary tape, but cadence is the proof. If yearly flights stay in the teens, the $10 trillion case stays on a slide. Count launches, not just the headline multiple.',
  footer: 'SpaceX · Launch-revenue case',
});

add('harvard-spcx-51pct', 'L5', 'SPCX', {
  badge: '스페이스X', title: '하버드 기부금 펀드가 2분기 42억 달러 주식 중 스페이스X를 51.5% 담았습니다',
  heroIcon: '\u{1F393}', heroBig: 'SPCX 51.5%',
  heroSub: '기부금 펀드는 대학이 오래 굴리는 큰 투자 주머니입니다. 하버드가 공개한 2분기 미국 상장 주식 약 42억 달러 가운데 스페이스X가 절반을 넘었습니다.',
  before: { label: '2위 TSMC', big: '7.9%', sub: '대만 파운드리 비중' },
  after: { label: '1위 스페이스X', big: '51.5%', sub: '한 종목이 포트의 절반' },
  cards: [
    { icon:'\u{1F4B0}', big:'42억불', mid:'2분기 상장 주식', sub:'2026년 6월 30일 공시 기준입니다' },
    { icon:'\u{1F3E6}', big:'TSMC 7.9%', mid:'두 번째 비중', sub:'파운드리 대장과 비교해도 격차가 큽니다' },
    { icon:'\u{1F4CA}', big:'CBRS 5.9%', mid:'Cerebras 3위', sub:'상위 세 종목이 포트의 65%를 넘습니다' },
  ],
  quote: '대학 기부금은 보통 여러 자산에 나눠 담습니다. 6월에 상장한 스페이스X가 공시 주식 포트의 절반을 넘는 것은 이례적입니다. 상장 후 처음 잡힌 공시라, 이전 분기 표에는 이 줄이 없었습니다.',
  noteHead: '왜 중요한가', noteSub: '대형 대학 자금이 이 비중을 유지하면 공개 시장 수요가 받쳐 집니다. 반대로 비중을 줄이면 차익 실현 신호가 됩니다. 다음 분기 공시에서 51.5%가 유지되는지를 보면 됩니다.',
  footer: '스페이스X · 하버드 포트',
}, {
  badge: 'SPCX', title: 'Harvard’s endowment held SpaceX as 51.5% of a $4.2 billion Q2 equity book',
  heroIcon: '\u{1F393}', heroBig: 'SPCX 51.5%',
  heroSub: 'An endowment is a university’s long-term investment pool. Harvard’s published Q2 U.S. listed-equity book of about $4.2 billion had SpaceX as more than half.',
  before: { label: 'No.2 TSMC', big: '7.9%', sub: 'Taiwan foundry weight' },
  after: { label: 'No.1 SpaceX', big: '51.5%', sub: 'One name, half the book' },
  cards: [
    { icon:'\u{1F4B0}', big:'$4.2B', mid:'Q2 listed book', sub:'As of the June 30, 2026 filing' },
    { icon:'\u{1F3E6}', big:'TSMC 7.9%', mid:'Second-largest line', sub:'Still a wide gap versus SpaceX' },
    { icon:'\u{1F4CA}', big:'CBRS 5.9%', mid:'Cerebras third', sub:'Top three names exceed 65%' },
  ],
  quote: 'Endowments usually spread bets. SpaceX listed in June, then showed up as more than half of Harvard’s disclosed equity book. Prior filings could not show that line because the shares were not yet listed.',
  noteHead: 'Why it matters', noteSub: 'If a large university keeps this weight, public-market demand has a bid. A cut would look like profit-taking. Watch whether 51.5% still prints in the next quarterly filing.',
  footer: 'SpaceX · Harvard book',
});

add('cybercab-cabin-30cents', 'L3', 'TSLA', {
  badge: '테슬라', title: '오스틴 사이버캡 실차에 운전대가 없고, 요금은 마일당 30~40센트로 거론됐습니다',
  heroIcon: '\u{1F697}', heroBig: '30~40¢/마일',
  heroSub: '오전 7시 40분 오스틴에서 촬영된 실차에는 운전대와 페달이 없었습니다. 객실 조명은 음악에 맞춰 움직였고, 일론 머스크는 마일당 30~40센트면 약 1달러 승차가 가능하다고 말했습니다.',
  cards: [
    { icon:'\u{1F6AA}', big:'무핸들', mid:'운전대·페달 없음', sub:'처음부터 로보택시로 만든 차체입니다' },
    { icon:'\u{1F3B5}', big:'7:40 AM', mid:'오스틴 객실', sub:'조명이 음악에 맞춰 바뀌는 장면입니다' },
    { icon:'\u{1F4B0}', big:'~1달러', mid:'짧은 구간 요금', sub:'마일당 30~40센트를 곱한 예시입니다' },
  ],
  quote: '마일당 30~40센트는 지금 미국 일반 택시보다 훨씬 싼 구간입니다. 차량에 운전자가 없으면 인건비가 빠지고, 그 자리가 요금에 반영된다는 설명입니다. 실차 사진과 요금 발언이 같은 제품 이야기입니다.',
  noteHead: '왜 중요한가', noteSub: '로보택시의 핵심은 요금이 택시보다 싸질 수 있는지입니다. 30~40센트는 목표 단가이지 오늘 앱 요금표가 아닙니다. 오스틴에서 실제 결제 화면이 나오는지를 보면 됩니다.',
  footer: '테슬라 · 사이버캡 요금',
}, {
  badge: 'TSLA', title: 'An Austin Cybercab cabin had no wheel, and fares of 30-40 cents a mile were cited',
  heroIcon: '\u{1F697}', heroBig: '30-40¢/mile',
  heroSub: 'A 7:40 a.m. Austin cabin clip showed no steering wheel or pedals. Cabin lights moved with the music, and Elon Musk said 30-40 cents a mile could make ~$1 rides.',
  cards: [
    { icon:'\u{1F6AA}', big:'No wheel', mid:'No pedals either', sub:'A body built as a robotaxi from day one' },
    { icon:'\u{1F3B5}', big:'7:40 AM', mid:'Austin cabin', sub:'Lights tracking the music' },
    { icon:'\u{1F4B0}', big:'~$1', mid:'Short-hop example', sub:'30-40 cents times a few miles' },
  ],
  quote: 'Thirty to forty cents a mile is far below a typical US taxi. No driver means labor drops out of the fare. The cabin clip and the price comment are the same product story.',
  noteHead: 'Why it matters', noteSub: 'Robotaxi math lives or dies on beating taxi fares. 30-40 cents is a target, not today’s app sticker. Watch for a real Austin checkout screen.',
  footer: 'Tesla · Cybercab fare',
});

add('ron-baron-fsd-chip', 'L4', 'TSLA', {
  badge: '테슬라', title: '론 배런 앞에서 머스크는 자체 칩이 엔비디아보다 싸고 강하고, FSD가 100억 마일을 달렸다고 말했습니다',
  badgeLine: '칩 · FSD · 생산 속도',
  heroIcon: '\u{1F9E0}', heroBig: '칩 원가 10%',
  heroSub: 'FSD는 테슬라의 자율주행 소프트웨어입니다. 머스크는 론 배런과의 대화에서 자체 칩이 엔비디아보다 성능은 2~3배, 원가는 약 10%라 했고, FSD가 100억 마일을 달려 사고 위험이 4분의 1이라고 했습니다.',
  cards: [
    { icon:'\u{1F4BE}', big:'2~3배', mid:'칩 성능 주장', sub:'원가는 엔비디아의 약 10%라고 했습니다' },
    { icon:'\u{1F697}', big:'100억 마일', mid:'FSD 누적 주행', sub:'사람이 운전할 때보다 4배 안전하다는 설명' },
    { icon:'\u{23F1}', big:'35초→10초', mid:'생산 사이클', sub:'차 한 대 만드는 시간을 줄이겠다는 목표입니다' },
  ],
  quote: '같은 자리에서 대만 TSMC가 공장 하나를 짓는 데 5년이 걸린다고 비교하며, 테슬라는 1·2·3년 단위로 라인을 세우겠다고 했습니다. 칩·안전·공장 속도를 한 인터뷰에 묶은 발언입니다.',
  noteHead: '왜 중요한가', noteSub: '원가 10%와 100억 마일은 회사가 그리는 그림입니다. 삼성 테일러 AI5 시험생산이 이 칩 이야기의 공장 쪽 증거입니다. 다음 실적에서 자율주행 주행거리와 칩 원가가 숫자로 나오는지를 보면 됩니다.',
  footer: '테슬라 · 배런 인터뷰',
}, {
  badge: 'TSLA', title: 'Musk told Ron Baron Tesla’s chip is cheaper and stronger than Nvidia’s, with FSD at 10 billion miles',
  badgeLine: 'Chips · FSD · cycle time',
  heroIcon: '\u{1F9E0}', heroBig: 'Chip cost ~10%',
  heroSub: 'FSD is Tesla’s self-driving software. Musk said Tesla’s chip is 2-3× Nvidia at about 10% of the cost, with 10 billion FSD miles.',
  cards: [
    { icon:'\u{1F4BE}', big:'2-3×', mid:'Claimed chip performance', sub:'Cost about 10% of Nvidia’s, he said' },
    { icon:'\u{1F697}', big:'10B miles', mid:'FSD miles driven', sub:'Described as 4× safer than humans' },
    { icon:'\u{23F1}', big:'35s→10s', mid:'Factory cycle', sub:'Time to build one car, as a target' },
  ],
  quote: 'He also contrasted TSMC’s five-year fab clock with Tesla putting up lines on a 1-2-3 year cadence. Chips, safety and factory speed were one interview, not three stories.',
  noteHead: 'Why it matters', noteSub: '10% cost and 10 billion miles are the company’s picture. Samsung’s Taylor AI5 trial is the factory-side exhibit. Watch whether the next print puts FSD miles and chip cost into numbers.',
  footer: 'Tesla · Baron interview',
});

add('starlink-v3-1000-sats', 'L2', 'SPCX', {
  badge: '스페이스X', title: '머스크는 스타링크 V3 위성 약 1,000기가 궤도에 올라야 가입자가 다시 늘 것이라고 했습니다',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: 'V3 1,000기',
  heroSub: '스타링크 V3는 기존보다 통신 용량이 큰 새 위성입니다. 가입자 증가가 다시 가팔라지는 시점을 2027년 2분기로 봤고, 14차에 26기를 실은 뒤 비행당 60기 체제로 가면 약 18번이면 1,000기에 닿습니다.',
  cards: [
    { label: '가입자 재가속', big: '2027 Q2', mid: '예상 시점', sub: '1,000기가 뜬 뒤로 그렸습니다' },
    { label: '14차 탑재', big: '26기', mid: '이번 비행', sub: '첫 V3 매출 비행입니다' },
    { label: '이후 페이스', big: '60기/회', mid:'나머지 17회', sub: '한 달에 약 1.9회면 18회입니다' },
  ],
  detailHead: '숫자를 이어 보면',
  detailLines: ['26 + (60×17) = 1,046기로 1,000기 목표를 넘깁니다', '18회를 한 달에 1.9회로 나누면 약 9~10개월입니다', '일정이 9월 28일로 밀린 만큼 2027년 2분기도 같이 미끄러질 수 있습니다'],
  quote: '위성 인터넷은 하늘에 남는 용량이 있어야 신규 가입자를 받습니다. V3 1,000기는 그 용량을 한 단계 올리는 임계치로 제시됐습니다.',
  noteHead: '왜 중요한가', noteSub: '스페이스X 매출의 큰 축이 스타링크 구독입니다. 1,000기 전에는 가입자가 숨 고르기를 할 수 있습니다. 14차 26기 배치 성공 여부가 이 달력의 첫 칸입니다.',
  footer: '스페이스X · 스타링크 V3',
}, {
  badge: 'SPCX', title: 'Musk said about 1,000 Starlink V3 satellites must be in orbit before subscriber growth re-accelerates',
  heroIcon: '\u{1F6F0}\u{FE0F}', heroBig: '1,000 V3 sats',
  heroSub: 'Starlink V3 is the higher-capacity satellite. He put the subscriber re-acceleration around Q2 2027. Flight 14 flies 26, then about 60 per flight — roughly 18 flights to 1,000.',
  cards: [
    { label: 'Re-acceleration', big: 'Q2 2027', mid: 'Timing he sketched', sub: 'After ~1,000 V3s are up' },
    { label: 'Flight 14 load', big: '26 sats', mid: 'This mission', sub: 'First V3 revenue flight' },
    { label: 'Later cadence', big: '60/flight', mid: '17 more flights', sub: '~1.9 flights a month, 18 total' },
  ],
  detailHead: 'Do the arithmetic',
  detailLines: ['26 + (60×17) = 1,046, clearing the 1,000-sat mark', '18 flights at 1.9 a month is about nine to ten months', 'The slip to Sept 28 can also slide the Q2 2027 line'],
  quote: 'Satellite internet needs spare capacity in the sky before it can take new customers. 1,000 V3s was offered as the step-change in that capacity.',
  noteHead: 'Why it matters', noteSub: 'Starlink subscriptions are a large slice of SpaceX revenue. Until 1,000 V3s fly, subscriber growth can pause. Flight 14’s 26-sat deploy is the first square on that calendar.',
  footer: 'SpaceX · Starlink V3',
});

add('huawei-2-ai-chips', 'L6', 'NVDA', {
  badge: '엔비디아', title: '화웨이가 2027년에 엔비디아에 도전할 인공지능 칩 두 종류를 내놓겠다고 했습니다',
  breaking: '2027년 신칩 예고',
  heroBig: '칩 2종 · 2027', heroSub: '화웨이는 중국의 통신·반도체 회사입니다. 엔비디아 그래픽처리장치를 대체할 인공지능 칩 두 개를 2027년에 선보이겠다는 계획이 공개됐습니다.',
  grid: [
    { icon:'\u{1F4E6}', big:'2종', mid:'새 AI 칩', sub:'한 제품이 아니라 라인업입니다' },
    { icon:'\u{1F4C5}', big:'2027', mid:'출시 목표', sub:'삼성 테일러 AI5와 같은 해입니다' },
    { icon:'\u{1F30F}', big:'중국', mid:'내수 연산망', sub:'수출 통제 아래 자체 칩을 키우는 흐름입니다' },
    { icon:'\u{1F4CA}', big:'도전', mid:'엔비디아 대비', sub:'성능·공급이 따라오는지가 관건입니다' },
  ],
  ctx1: '발표는 로드맵이지, 지금 벤치마크 승리가 아닙니다.',
  ctx2: '젠슨 황의 내년 물량 두 배 발언과 같은 화면에 올라온 경쟁 소식입니다.',
  quote: '인공지능 칩 시장은 한 회사가 오래 독주해 왔습니다. 2027년에 중국 업체가 두 제품을 내놓겠다는 것은, 그 독주가 지역별로 갈라질 수 있다는 신호입니다. 실제 성능표가 나오기 전에는 일정만 적으면 됩니다.',
  noteHead: '왜 중요한가', noteSub: '엔비디아 수요가 세계 한 시장만은 아닙니다. 중국이 자체 칩으로 돌아서면 그 지역 점유율 이야기는 달라집니다. 2027년 시제품 성능이 공개되는지를 보면 됩니다.',
  footer: '엔비디아 · 화웨이 칩',
}, {
  badge: 'NVDA', title: 'Huawei said it will launch two AI chips in 2027 to challenge Nvidia',
  breaking: '2027 chip roadmap',
  heroBig: 'Two chips · 2027', heroSub: 'Huawei is China’s telecom and semiconductor group. It outlined two AI processors aimed at Nvidia graphics chips, targeted for 2027.',
  grid: [
    { icon:'\u{1F4E6}', big:'Two SKUs', mid:'New AI chips', sub:'A lineup, not a single part' },
    { icon:'\u{1F4C5}', big:'2027', mid:'Launch window', sub:'Same year as Tesla AI5 from Samsung Taylor' },
    { icon:'\u{1F30F}', big:'China', mid:'Domestic compute', sub:'Building local silicon under export controls' },
    { icon:'\u{1F4CA}', big:'Challenge', mid:'Versus Nvidia', sub:'Performance and supply still have to show up' },
  ],
  ctx1: 'This is a roadmap, not a benchmark win today.',
  ctx2: 'It shares a screen with Jensen Huang’s comment about doubling units next year.',
  quote: 'AI chips have been a one-company story for years. Two Huawei parts in 2027 are a signal that the story can split by region. Until performance sheets print, only the calendar is real.',
  noteHead: 'Why it matters', noteSub: 'Nvidia demand is not one global pool. If China shifts to local silicon, share in that region can change. Watch for 2027 prototype numbers.',
  footer: 'Nvidia · Huawei chips',
});

add('musk-optimus-cool', 'L4', 'TSLA', {
  badge: '테슬라', title: '일론 머스크가 옵티머스를 가리켜 멋지다고 짧게 평했습니다',
  badgeLine: '옵티머스 코멘트',
  heroIcon: '\u{1F916}', heroBig: '“멋지다”',
  heroSub: '옵티머스는 테슬라의 인간형 로봇입니다. 공급망 감사 소문과 같은 날, 최고경영자가 제품 자체를 긍정적으로 평한 한 줄이 올라왔습니다.',
  cards: [
    { icon:'\u{1F4AC}', big:'짧은 평', mid:'제품 자체 언급', sub:'일정 숫자보다 태도 신호입니다' },
    { icon:'\u{1F916}', big:'옵티머스', mid:'인간형 로봇', sub:'공장 노동과 가정 보조가 목표입니다' },
    { icon:'\u{1F50D}', big:'같은 날', mid:'중국 감사 관측', sub:'미확인 소문과 본인 발언을 구분해 적습니다' },
  ],
  quote: '최고경영자가 로봇을 멋지다고 한 것은 양산 일정이 아닙니다. 다만 내부에서 제품을 숨기지 않고 있다는 온도는 됩니다. 숫자 있는 소식은 공장 사진과 공급 계약입니다.',
  noteHead: '왜 중요한가', noteSub: '로봇 사업은 아직 매출보다 기대가 큰 칸입니다. 짧은 칭찬은 방향만 알려 주고, 중국 공급망 소식은 따로 확인이 필요합니다. 10월 전후 생산 장면이 나오면 두 줄이 만납니다.',
  footer: '테슬라 · 옵티머스 발언',
}, {
  badge: 'TSLA', title: 'Elon Musk called Optimus “cool” in a short remark',
  badgeLine: 'Optimus comment',
  heroIcon: '\u{1F916}', heroBig: '“Cool”',
  heroSub: 'Optimus is Tesla’s humanoid robot. On the same day as unconfirmed China audit talk, the chief executive posted a positive one-liner on the product itself.',
  cards: [
    { icon:'\u{1F4AC}', big:'One line', mid:'About the product', sub:'A tone signal, not a date' },
    { icon:'\u{1F916}', big:'Optimus', mid:'Humanoid robot', sub:'Aimed at factory and home work' },
    { icon:'\u{1F50D}', big:'Same day', mid:'China audit chatter', sub:'Keep rumor and his words apart' },
  ],
  quote: 'Calling a robot cool is not a mass-production calendar. It does show he is not hiding the product. The numbered news remains factory photos and supply contracts.',
  noteHead: 'Why it matters', noteSub: 'The robot story is still more expectation than sales. A compliment only sets direction; China supply talk still needs confirmation. Production footage around October would join the two lines.',
  footer: 'Tesla · Optimus remark',
});
}