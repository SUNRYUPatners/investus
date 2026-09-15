// 2026-09-15 SVG topic data — screenshot/news facts, beginner Korean, positive long view
// Layout mix: ROWS×1 L1×2 L2×4 L3×3 L4×4 L5×3 L6×4
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.15 한장 요약',
  rows: [
    { color:'#a78bfa', fill:'#180f28', right:'137억', title:'앤스로픽이 럼 그룹과 137억 달러 6년 컴퓨팅 계약을 맺었습니다',
      sub:'조지아주 데이터센터 GPU를 6년간 3개 구간으로 나눠 공급받습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'2개분기', title:'앤스로픽이 2개 분기 연속 흑자를 내며 나스닥 상장을 준비 중입니다',
      sub:'2분기 매출은 1년 전보다 14배 늘어난 115억 달러였습니다.' },
    { color:'#4ade80', fill:'#061209', right:'1,001대', title:'테슬라 로보택시(사이버캡) 차량이 1,001대로 늘었습니다',
      sub:'8개 도시에서 누적 트립 7,345회를 기록했습니다.' },
    { color:'#94a3b8', fill:'#111827', right:'60%', title:'해외 투자자의 미국 증시 비중이 60%로 역대 최고치를 찍었습니다',
      sub:'1953년 집계 이후 가장 높은 수준입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'1.7조', title:'미국 국채 이자 비용이 연 1.7조 달러까지 늘어날 수 있습니다',
      sub:'금리가 유지되면 2028년 11월까지 사회보장 지출을 넘어설 수 있습니다.' },
    { color:'#fb7185', fill:'#1a0a10', right:'+80%', title:'그록봇 하루 이용자 수가 닷새 만에 80% 넘게 늘었습니다',
      sub:'같은 시기 그록 4.8도 학습을 마쳐가고 있습니다.' },
    { color:'#60a5fa', fill:'#0a1420', right:'15번째', title:'구글 웨이모가 라스베이거스에서 15번째 서비스 도시로 확장했습니다',
      sub:'같은 지역에서 테슬라·우버도 곧 서비스를 시작할 예정입니다.' },
  ],
  caption: '더 볼 것: 앤스로픽 137억 · 나스닥 상장 · 사이버캡 1,001대 · 해외자금 60% · 국채이자 1.7조 · 그록봇 +80% · 웨이모 15번째',
}, {
  headline: '2026.09.15 Daily Snapshot',
  rows: [
    { color:'#a78bfa', fill:'#180f28', right:'$13.7B', title:'Anthropic is the customer in RUM Group\u2019s $13.7B compute deal',
      sub:'Covers GPU capacity at a Georgia data center in three tranches.' },
    { color:'#60a5fa', fill:'#0a1420', right:'2 quarters', title:'Anthropic posted its second straight profitable quarter',
      sub:'Q2 revenue surged 14x year over year to $11.5B, ahead of a Nasdaq listing.' },
    { color:'#4ade80', fill:'#061209', right:'1,001', title:'Tesla\u2019s robotaxi (Cybercab) fleet grew to 1,001 vehicles',
      sub:'Logging 7,345 trips across 8 cities.' },
    { color:'#94a3b8', fill:'#111827', right:'60%', title:'Foreign ownership of US equities hit a record 60% share',
      sub:'The highest level since records began in 1953.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'$1.7T', title:'US Treasury interest costs could hit $1.7T a year',
      sub:'That would surpass Social Security spending by Nov 2028 if rates hold.' },
    { color:'#fb7185', fill:'#1a0a10', right:'+80%', title:'Grok Bot\u2019s daily active users jumped more than 80% in five days',
      sub:'Grok 4.8 is also nearing the end of training.' },
    { color:'#60a5fa', fill:'#0a1420', right:'15th city', title:'Google\u2019s Waymo launched paid service in Las Vegas, its 15th city',
      sub:'Tesla and Uber are expected to launch there soon too.' },
  ],
  caption: 'Watch: Anthropic $13.7B · Nasdaq listing · Cybercab 1,001 · foreign share 60% · Treasury $1.7T · Grok +80% · Waymo 15th city',
});

add('foreign-equity-60pct', 'L1', 'MACRO', {
  badge: '미국증시', title: '해외 투자자가 보유한 미국 금융자산 중 주식 비중이 60%로 역대 최고치를 기록했습니다',
  heroIcon: '\u{1F30E}', heroBig: '60%',
  heroSub: '해외 투자자가 미국에 투자한 돈 가운데 주식이 차지하는 비율입니다. 1953년 집계 이후 가장 높은 수치입니다.',
  cards: [
    { icon:'\u{1F4C8}', big:'60%', mid:'역대 최고치', sub:'1953년 집계 이후 최고' },
    { icon:'\u{1F4BB}', big:'닷컴버블', mid:'2000년 약 53%', sub:'그때보다도 높은 수준' },
    { icon:'\u{1F3E6}', big:'금융위기', mid:'2007년 약 40%', sub:'위기 직전보다도 높음' },
  ],
  quote: '해외 중앙은행·연금·개인 자금이 안전자산(국채)보다 주식 쪽으로 계속 옮겨갔다는 뜻입니다. "미국 예외주의"로 불리는 흐름입니다.',
  noteSub: '해외자금의 주식 쏠림이 역사적 고점 두 번을 모두 넘어섰습니다. 과거 두 고점 모두 이후 시장이 크게 흔들렸다는 점은 참고할 대목입니다. 다음 분기 자료에서 이 비율이 더 오르는지 지켜보면 됩니다.',
  footer: '미국증시 · 해외자금',
}, {
  badge: 'US EQUITIES', title: "Foreign investors' allocation to US equities hit a record 60% of their US financial holdings",
  heroIcon: '\u{1F30E}', heroBig: '60%',
  heroSub: "The equity share of foreign-held US financial assets, the highest level since records began in 1953.",
  cards: [
    { icon:'\u{1F4C8}', big:'60%', mid:'All-time high', sub:'Highest since 1953 records' },
    { icon:'\u{1F4BB}', big:'Dot-com era', mid:'~53% in 2000', sub:'Already above that peak' },
    { icon:'\u{1F3E6}', big:'2008 crisis', mid:'~40% in 2007', sub:'Above that peak too' },
  ],
  quote: 'Foreign central banks, pensions and individuals keep shifting money from safer Treasuries toward US stocks — often called "US exceptionalism."',
  noteSub: "Foreign capital's tilt toward equities has now cleared two historic peaks, both of which were followed by sharp market swings. Watch whether the ratio keeps climbing next quarter.",
  footer: 'US Equities · Foreign Flows',
});

add('treasury-interest-1-7t', 'L5', 'RATES', {
  badge: '미국국채', title: '미국 국채 이자 비용이 금리 유지 시 2028년 11월까지 연 1.7조 달러로 늘어 사회보장 지출을 넘어설 수 있습니다',
  heroIcon: '\u{1F4B5}', heroBig: '1.7조 달러',
  heroSub: '미국 정부가 국채에 매년 지급하는 이자 총액 전망입니다. 지금 금리가 유지되면 2028년 11월까지 이 수준까지 늘어날 수 있습니다.',
  before: { label:'금리 인하 시', big:'1.4조 달러', sub:'5년물 금리 3.25%까지 내려갈 때' },
  after: { label:'금리 유지 시', big:'1.7조 달러', sub:'지금 금리 수준이 그대로일 때' },
  cards: [
    { icon:'\u{1F4CA}', big:'사회보장', mid:'정부 최대 지출', sub:'이자비용이 이를 넘어설 수 있음' },
    { icon:'\u{1F3DB}', big:'롤오버', mid:'옛 저금리 국채', sub:'새 고금리 국채로 교체 중' },
    { icon:'\u{1F5D3}', big:'9월 FOMC', mid:'이번 주 결정', sub:'금리 경로의 다음 신호' },
  ],
  quote: '정부도 개인처럼 빌린 돈에 이자를 냅니다. 부채가 크고 금리가 높으면 이자 총액도 함께 불어납니다.',
  noteSub: '1.7조 달러와 1.4조 달러의 차이 3,000억 달러가 금리 수준이 만드는 부담입니다. 이번 주 FOMC 결정이 이 격차를 좌우하는 다음 변수입니다.',
  footer: '미국국채 · 이자비용',
}, {
  badge: 'US TREASURY', title: 'US Treasury interest costs could hit $1.7 trillion a year by Nov 2028, topping Social Security spending',
  heroIcon: '\u{1F4B5}', heroBig: '$1.7T',
  heroSub: "BofA's projection for annual US government interest costs if current rates persist through November 2028.",
  before: { label:'If rates fall', big:'$1.4T', sub:'5-yr yield down to ~3.25%' },
  after: { label:'If rates hold', big:'$1.7T', sub:'At current rate levels' },
  cards: [
    { icon:'\u{1F4CA}', big:'Social Security', mid:'Largest outlay', sub:'Interest could exceed it' },
    { icon:'\u{1F3DB}', big:'Rollover', mid:'Old low-rate debt', sub:'Replaced with high-rate debt' },
    { icon:'\u{1F5D3}', big:'Sept FOMC', mid:'This week', sub:'Next signal on rate path' },
  ],
  quote: 'Governments pay interest on borrowed money just like individuals. Bigger debt plus higher rates means a bigger total bill.',
  noteSub: 'The $300B gap between the two scenarios is the cost of keeping rates elevated. This week\u2019s FOMC decision is the next variable to watch.',
  footer: 'US Treasury · Interest Costs',
});

add('grok-bot-dau-surge', 'L2', 'XAI', {
  badge: '그록', title: '그록봇 하루 이용자 수가 닷새 만에 80% 넘게 늘었습니다',
  heroIcon: '\u{1F680}', heroBig: '+80%',
  heroSub: '9월 6일 약 6만 9천 명이던 그록봇 하루 이용자가 9월 11일 약 12만 2천 명까지 늘었습니다.',
  cards: [
    { label:'9/6', big:'6.9만', mid:'하루 이용자', sub:'닷새 전 시작점' },
    { label:'9/9', big:'9.9만', mid:'잠시 주춤', sub:'며칠간 정체 구간' },
    { label:'9/11', big:'12.2만', mid:'다시 급증', sub:'닷새 누적 80%↑' },
  ],
  detailHead: '닷새간 하루 이용자 추이',
  detailLines: [
    '9/6 약 6.9만 명 → 9/7 약 9.7만 명 → 9/8 약 10.4만 명으로 늘었습니다.',
    '9/9 약 9.9만 명으로 잠깐 주춤했다가 9/10 약 10.6만 명으로 다시 올랐습니다.',
    '9/11 약 12.2만 명을 기록하며 닷새 사이 80% 넘게 늘었습니다.',
  ],
  noteSub: '그록봇은 일론 머스크의 xAI가 만든 챗봇입니다. 같은 시기 다음 모델 그록 4.8도 학습을 마쳐가고 있어, 이용자 증가와 신모델 개발이 동시에 진행되고 있습니다.',
  footer: '그록 · 이용자 증가',
}, {
  badge: 'GROK', title: "Grok Bot's daily active users jumped more than 80% in five days",
  heroIcon: '\u{1F680}', heroBig: '+80%',
  heroSub: 'DAU rose from about 69,000 on Sept 6 to roughly 122,000 on Sept 11, per Similarweb.',
  cards: [
    { label:'Sep 6', big:'69K', mid:'Daily users', sub:'Starting point' },
    { label:'Sep 9', big:'99K', mid:'Brief pause', sub:'Few-day plateau' },
    { label:'Sep 11', big:'122K', mid:'Surging again', sub:'+80% over 5 days' },
  ],
  detailHead: 'Five-day DAU trend',
  detailLines: [
    'Sep 6 ~69K \u2192 Sep 7 ~97K \u2192 Sep 8 ~104K.',
    'Sep 9 dipped to ~99K, then rose again to ~106K on Sep 10.',
    'Sep 11 hit ~122K, up over 80% across the five days.',
  ],
  noteSub: 'Grok Bot is xAI\u2019s chatbot. Grok 4.8 is also nearing the end of training around the same time, so user growth and model development are happening in parallel.',
  footer: 'Grok · User Growth',
});

add('mcd-26mo-low', 'L1', 'MCD', {
  badge: 'MCD', title: '맥도날드 주가가 252달러대로 내려 26개월 만에 가장 낮은 가격을 기록했습니다',
  heroIcon: '\u{1F354}', heroBig: '252.53달러',
  heroSub: '지난 9월 11일 종가로, 최근 26개월(약 2년 2개월) 사이 가장 낮은 가격입니다.',
  cards: [
    { icon:'\u{1F4C9}', big:'-0.21%', mid:'9월 11일 종가', sub:'전일 대비 소폭 하락' },
    { icon:'\u{1F550}', big:'26개월', mid:'최저가 구간', sub:'2024년 이후 가장 낮음' },
    { icon:'\u{1F4CA}', big:'335달러', mid:'2025년 3월 고점', sub:'그때보다 약 25% 낮은 가격' },
  ],
  quote: '맥도날드처럼 오래된 외식기업 주가가 오래 밀리는 배경에는 외식 지출 둔화와 원가 부담이 자주 꼽힙니다.',
  noteSub: '주가와 회사 사업 기반은 시차를 두고 움직이는 경우가 많습니다. 다음 실적에서 미국 내 동일점포매출이 개선되는지가 핵심 확인 포인트입니다.',
  footer: '맥도날드 · 주가 흐름',
}, {
  badge: 'MCD', title: "McDonald's stock fell to $252.53, its lowest price in 26 months",
  heroIcon: '\u{1F354}', heroBig: '$252.53',
  heroSub: "The Sept 11 closing price, the lowest level on Barchart's chart in roughly 26 months.",
  cards: [
    { icon:'\u{1F4C9}', big:'-0.21%', mid:'Sept 11 close', sub:'Slight daily decline' },
    { icon:'\u{1F550}', big:'26 months', mid:'Multi-year low', sub:'Lowest since 2024' },
    { icon:'\u{1F4CA}', big:'$335', mid:'March 2025 peak', sub:'About 25% below that high' },
  ],
  quote: "Legacy dining chains often see prolonged share weakness from softer discretionary spend and rising cost pressure.",
  noteSub: 'Stock price and business fundamentals often move on a lag. Whether US same-store sales improve next quarter is the key thing to watch.',
  footer: "McDonald's · Share Trend",
});

add('anthropic-profitable-2q', 'L2', 'ANTHROPIC', {
  badge: '앤스로픽', title: '앤스로픽이 2개 분기 연속 조정영업이익 흑자를 내며 나스닥 상장을 준비하고 있습니다',
  heroIcon: '\u{1F4C8}', heroBig: '14배',
  heroSub: '2분기 매출이 1년 전보다 14배 늘어난 115억 달러를 기록했습니다.',
  cards: [
    { label:'매출', big:'115억달러', mid:'2분기 매출', sub:'1년 전보다 14배' },
    { label:'이익', big:'2개 분기', mid:'연속 흑자', sub:'조정영업이익 기준' },
    { label:'마진', big:'80%+', mid:'매출총이익률', sub:'학습비용 제외 후' },
  ],
  detailHead: '상장 준비 현황',
  detailLines: [
    '상장 거래소로 나스닥을 정했고 10월 상장을 계획 중입니다.',
    '기업가치는 2조 달러 안팎이 거론되며, 스페이스X(862억 달러)보다 훨씬 큽니다.',
    '상장 신고서(S-1)는 아직 공개 전으로, 소수 투자자에게만 자료를 공유했습니다.',
  ],
  noteSub: '매출총이익률(매출-원가)이 80%를 넘는다는 것은 사업 자체 수익성이 좋다는 뜻입니다. 상장 신고서가 나오면 추정치가 실제 회계자료로 확인됩니다.',
  footer: '앤스로픽 · 상장 준비',
}, {
  badge: 'ANTHROPIC', title: "Anthropic's adjusted operating income was positive for a second straight quarter, ahead of a planned Nasdaq listing",
  heroIcon: '\u{1F4C8}', heroBig: '14x',
  heroSub: 'Q2 revenue reportedly surged 14-fold year over year to about $11.5 billion.',
  cards: [
    { label:'Revenue', big:'$11.5B', mid:'Q2 revenue', sub:'14x year over year' },
    { label:'Profit', big:'2 quarters', mid:'Straight profitable', sub:'Adjusted operating basis' },
    { label:'Margin', big:'80%+', mid:'Gross margin', sub:'After training costs' },
  ],
  detailHead: 'IPO readiness',
  detailLines: [
    'Nasdaq chosen as the listing venue; an October IPO is being planned.',
    "Valuation talk centers on ~$2T, well above SpaceX's $86.2B listing.",
    "The S-1 hasn't been filed publicly yet — only shared with a few investors.",
  ],
  noteSub: 'Gross margins above 80% suggest a genuinely profitable core business. The S-1 filing will confirm these figures with audited numbers.',
  footer: 'Anthropic · IPO Prep',
});

add('cybercab-fleet-1001', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: '사이버캡 1,001대',
  title: '테슬라 로보택시(사이버캡) 차량이 1,001대로 늘며 8개 도시에서 트립 7,345회를 기록했습니다',
  heroBig: '1,001대',
  heroSub: '차량 추적 사이트 오토레인 집계 기준입니다. 8개 도시에서 운영 중이며 누적 트립은 7,345회입니다.',
  grid: [
    { icon:'\u{1F335}', big:'197대', mid:'오스틴', sub:'무감독 서비스' },
    { icon:'\u{1F309}', big:'696대', mid:'베이에어리어', sub:'안전요원 동승' },
    { icon:'\u{1F920}', big:'48+32대', mid:'댈러스·휴스턴', sub:'확장 중인 도시' },
    { icon:'\u{1F4CD}', big:'7,345회', mid:'누적 트립', sub:'최근 30일 260대 운행' },
  ],
  ctx1: '며칠 전 994대였던 차량 수가 1,001대로 더 늘었습니다.',
  ctx2: '뉴저지·캘리포니아 등 여러 주에서도 검증 장비를 단 차량이 목격되고 있습니다.',
  quote: '사이버캡은 운전대와 페달이 없는 전용 로보택시 차량입니다. 도시별로 무감독(안전요원 없음)과 감독 방식이 나뉩니다.',
  noteSub: '1,001대는 아직 웨이모(15개 도시)보다 작은 규모지만 늘어나는 속도가 빠릅니다. 다음 집계에서 차량 수와 무감독 전환 도시가 늘어나는지 보면 됩니다.',
  footer: '테슬라 · 로보택시 확장',
}, {
  badge: 'BREAKING', breaking: 'CYBERCAB 1,001',
  title: "Tesla's robotaxi (Cybercab) fleet has grown to 1,001 vehicles across 8 cities, logging 7,345 trips",
  heroBig: '1,001',
  heroSub: 'Per tracking site Autolane, the fleet now spans 8 cities with 7,345 cumulative trips.',
  grid: [
    { icon:'\u{1F335}', big:'197', mid:'Austin', sub:'Unsupervised service' },
    { icon:'\u{1F309}', big:'696', mid:'Bay Area', sub:'Safety monitor onboard' },
    { icon:'\u{1F920}', big:'48+32', mid:'Dallas & Houston', sub:'Expanding cities' },
    { icon:'\u{1F4CD}', big:'7,345', mid:'Total trips', sub:'260 active in 30 days' },
  ],
  ctx1: 'The count rose from 994 vehicles just days earlier.',
  ctx2: 'Vehicles with verification gear have also been spotted in New Jersey and California.',
  quote: 'Cybercab is a purpose-built robotaxi with no steering wheel or pedals. Cities differ between unsupervised and supervised operation.',
  noteSub: 'At 1,001 vehicles, the fleet is still smaller than Waymo\u2019s (15 cities), but growing fast. Watch the next count and which cities go unsupervised.',
  footer: 'Tesla · Robotaxi Expansion',
});

add('fsd-slovenia-global', 'L3', 'TSLA', {
  badge: '테슬라', title: '테슬라 FSD가 슬로베니아에서 승인된 뒤 해외 곳곳에서 좋은 반응을 얻고 있습니다',
  heroIcon: '\u{1F3D4}', heroBig: '슬로베니아 승인',
  heroSub: '감독형 완전자율주행(FSD)이 지난주 슬로베니아에서 정식 승인됐습니다. 좁고 굽은 절벽길 주행 영상이 화제가 됐습니다.',
  cards: [
    { icon:'\u2705', big:'정식 승인', mid:'지난주 발효', sub:'슬로베니아 규제당국' },
    { icon:'\u{1F3A5}', big:'절벽길 주행', mid:'SNS 화제', sub:'좁고 굽은 도로도 안정적' },
    { icon:'\u{1F504}', big:'인식 전환', mid:'평가자 사례', sub:'슈퍼크루즈 선호→FSD14 호평' },
  ],
  quote: 'FSD는 운전자가 계속 주의를 기울여야 하는 감독형 자율주행 소프트웨어입니다. 나라마다 별도 승인이 필요합니다.',
  noteSub: '유럽연합은 10월 6일 FSD 승인 표결을 앞두고 있습니다. 슬로베니아 사례가 이 표결에 긍정적 참고자료가 될 수 있다는 시각이 있습니다.',
  footer: '테슬라 · FSD 해외 확산',
}, {
  badge: 'TESLA', title: 'Tesla\u2019s FSD (Supervised) won approval in Slovenia last week and is drawing praise for handling narrow cliff roads',
  heroIcon: '\u{1F3D4}', heroBig: 'Slovenia Approved',
  heroSub: 'FSD (Supervised) was formally approved in Slovenia last week, with footage of it handling narrow cliff roads going viral.',
  cards: [
    { icon:'\u2705', big:'Approved', mid:'Took effect last week', sub:'Slovenian regulator' },
    { icon:'\u{1F3A5}', big:'Cliff-road driving', mid:'Viral on social media', sub:'Stable on narrow, winding roads' },
    { icon:'\u{1F504}', big:'Changed mind', mid:'Reviewer case', sub:'Once favored Super Cruise, now praises FSD v14' },
  ],
  quote: 'FSD is a supervised driver-assist software requiring the driver\u2019s attention at all times. Each country needs its own approval.',
  noteSub: 'The EU has a vote on FSD approval scheduled for Oct 6. Slovenia\u2019s case could serve as a positive reference point for that vote.',
  footer: 'Tesla · FSD Abroad',
});

add('anthropic-rum-137b', 'L6', 'ANTHROPIC', {
  badge: 'BREAKING', breaking: '137억 달러 계약',
  title: '앤스로픽이 트럼프 측과 연계된 럼 그룹과 137억 달러 규모 6년 컴퓨팅 계약을 맺은 것으로 확인됐습니다',
  heroBig: '137억 달러',
  heroSub: '조지아주 데이터센터의 GPU 서비스를 6년간 3개 구간으로 나눠 공급하는 계약입니다.',
  grid: [
    { icon:'\u{1F4C4}', big:'6년', mid:'3개 트랜치', sub:'각 45.7억 달러씩' },
    { icon:'\u{1F3AF}', big:'5,100만주', mid:'워런트 포함', sub:'주당 1센트 매수권' },
    { icon:'\u{1F4C8}', big:'+17%', mid:'럼그룹 급등', sub:'9/14 장전 거래' },
    { icon:'\u{1F4C9}', big:'-9%', mid:'경쟁사 하락', sub:'코어위브·네비우스' },
  ],
  ctx1: '지난달 럼 그룹은 상대방 이름을 밝히지 않은 채 이 계약을 공시했습니다.',
  ctx2: '정보매체 디인포메이션이 이 상대방을 앤스로픽으로 특정해 보도했습니다.',
  quote: '이 보도는 앤스로픽 CEO가 AI 개발 속도 조절을 촉구한 다음 날 나와, 안전 메시지와 확장 전략 사이의 긴장으로 해석됐습니다.',
  noteSub: '럼 그룹과 앤스로픽 모두 아직 공식 확인은 하지 않았습니다. 두 회사가 계약을 공식화하는지가 다음 확인 포인트입니다.',
  footer: '앤스로픽 · 컴퓨팅 계약',
}, {
  badge: 'BREAKING', breaking: '$13.7B DEAL',
  title: 'Anthropic was confirmed as the customer in Trump-linked RUM Group\u2019s $13.7 billion, six-year GPU deal',
  heroBig: '$13.7B',
  heroSub: 'The deal covers GPU services at a Georgia data center, split into three tranches over six years.',
  grid: [
    { icon:'\u{1F4C4}', big:'6 years', mid:'3 tranches', sub:'~$4.57B each' },
    { icon:'\u{1F3AF}', big:'51M shares', mid:'Warrants included', sub:'$0.01 strike price' },
    { icon:'\u{1F4C8}', big:'+17%', mid:'RUM surged', sub:'Sept 14 premarket' },
    { icon:'\u{1F4C9}', big:'-9%', mid:'Rivals fell', sub:'CoreWeave, Nebius' },
  ],
  ctx1: "RUM Group's August filing didn't name the counterparty.",
  ctx2: 'The Information reported it was Anthropic.',
  quote: 'The report landed a day after Anthropic\u2019s CEO urged slowing AI development, drawing attention to the tension with its expansion strategy.',
  noteSub: 'Neither company has officially confirmed the deal yet. Watch whether both sides confirm it formally.',
  footer: 'Anthropic · Compute Deal',
});

add('nvidia-cuda-q-logical', 'L3', 'NVDA', {
  badge: '엔비디아', title: '엔비디아가 양자컴퓨터 오류를 스스로 고치는 연구를 돕는 CUDA-Q Logical을 내놓았습니다',
  heroIcon: '\u269B', heroBig: 'CUDA-Q Logical',
  heroSub: '양자컴퓨터의 잦은 오류를 스스로 감지하고 고치는 시스템 설계를 돕는 소프트웨어입니다.',
  cards: [
    { icon:'\u{1F9E9}', big:'오류 교정', mid:'핵심 과제', sub:'양자컴퓨터 상용화의 관문' },
    { icon:'\u{1F6E0}', big:'CUDA 확장', mid:'기존 플랫폼', sub:'AI학습에도 쓰이는 도구' },
    { icon:'\u{1F91D}', big:'생태계 지원', mid:'직접 제작 아닌', sub:'도구 제공자 역할' },
  ],
  quote: '큐비트는 외부 환경에 민감해 오류가 잦습니다. 이를 자동으로 고치는 기술이 양자컴퓨터 실용화의 핵심 과제로 꼽힙니다.',
  noteSub: '엔비디아는 직접 양자컴퓨터를 만들지 않고 소프트웨어 플랫폼으로 업계를 지원합니다. 이 도구를 쓰는 연구기관이 늘어나는지가 다음 확인 지점입니다.',
  footer: '엔비디아 · 양자컴퓨팅',
}, {
  badge: 'NVIDIA', title: 'Nvidia is easing quantum computing error correction with a new tool, CUDA-Q Logical',
  heroIcon: '\u269B', heroBig: 'CUDA-Q Logical',
  heroSub: 'Software that helps researchers design systems that detect and fix quantum computing errors on their own.',
  cards: [
    { icon:'\u{1F9E9}', big:'Error correction', mid:'The key hurdle', sub:'Gateway to practical quantum' },
    { icon:'\u{1F6E0}', big:'CUDA extended', mid:'Existing platform', sub:'Also used for AI training' },
    { icon:'\u{1F91D}', big:'Ecosystem role', mid:'Not building hardware', sub:'Nvidia as tool provider' },
  ],
  quote: 'Qubits are highly sensitive to their environment and error-prone. Automated correction is seen as the key hurdle for practical quantum machines.',
  noteSub: 'Nvidia supports the industry with software rather than building quantum hardware itself. Watch how many research labs adopt this tool.',
  footer: 'Nvidia · Quantum Computing',
});

add('coreweave-gpu-demand', 'L4', 'CRWV', {
  badge: '코어위브', badgeLine: '"매일 수요를 맞추기가 힘들다" — CEO 마이클 인트레이터',
  heroIcon: '\u{1F5A5}', heroBig: 'GPU 전량 판매 가능',
  heroSub: '코어위브 CEO가 골드만삭스 콘퍼런스에서 보유 GPU 전부를 여러 고객에게 팔 수 있다고 말했습니다.',
  cards: [
    { icon:'\u{1F4CA}', big:'+112%', mid:'2분기 매출성장', sub:'1년 전 대비' },
    { icon:'\u{1F4B0}', big:'15억달러', mid:'조정영업이익', sub:'2배 넘게 증가' },
    { icon:'\u{1F4CB}', big:'1,040억달러', mid:'수주잔고', sub:'앞으로 받을 매출 계약' },
  ],
  quote: '"우리는 매일 수요를 맞추기가 힘든 상황이다. 가진 GPU 하나하나를 여러 고객에게 각각 팔 수 있을 정도다."',
  noteSub: '엔비디아는 코어위브 지분 11.5%를 가진 주주이기도 합니다. 늘어난 자본지출(350억~390억 달러)을 실제 데이터센터로 얼마나 빨리 옮기는지가 다음 확인 포인트입니다.',
  footer: '코어위브 · GPU 수요',
}, {
  badge: 'COREWEAVE', badgeLine: '"Demand outstrips supply every day" — CEO Michael Intrator',
  heroIcon: '\u{1F5A5}', heroBig: 'GPUs Sold Out',
  heroSub: "CoreWeave's CEO told a Goldman Sachs conference every GPU could be sold to multiple clients.",
  cards: [
    { icon:'\u{1F4CA}', big:'+112%', mid:'Q2 revenue growth', sub:'Year over year' },
    { icon:'\u{1F4B0}', big:'$1.5B', mid:'Adj. operating income', sub:'More than doubled' },
    { icon:'\u{1F4CB}', big:'$104B', mid:'Backlog', sub:'Future contracted revenue' },
  ],
  quote: '"We\u2019re struggling to meet demand every day. Every GPU we have could be sold to multiple clients."',
  noteSub: 'Nvidia is also a shareholder with an 11.5% stake in CoreWeave. Watch how fast the raised capex ($35-39B) turns into actual data centers.',
  footer: 'CoreWeave · GPU Demand',
});

add('jensen-ai-safety-trump-call', 'L4', 'NVDA', {
  badge: '엔비디아', badgeLine: '"AI 위협론은 과학적 근거가 없다" — 젠슨 황',
  heroIcon: '\u260E', heroBig: '젠슨 황 발언',
  heroSub: '내부고발자의 안전 우려는 용기있다고 평가하면서도, AI 종말론에는 과학적 근거가 없다고 선을 그었습니다.',
  cards: [
    { icon:'\u{1F399}', big:'용기 있음', mid:'내부고발자 평가', sub:'제이콥 콕슨의 우려 존중' },
    { icon:'\u{1F6AB}', big:'선 긋기', mid:'AI 종말론', sub:'과학적 근거 없다고 밝힘' },
    { icon:'\u260E', big:'트럼프 전화', mid:'생방송 통화', sub:'스피커폰 농담 주고받음' },
  ],
  quote: '트럼프 대통령은 인터뷰 중 젠슨 황에게 전화를 걸어 "세계 최고 AI칩은 만들면서 스피커폰 연결법은 모른다"고 농담했습니다.',
  noteSub: '안전 우려를 존중하되 극단적 위협론은 거부하는 입장입니다. 실제 규제·정책으로 이어지는지가 다음 확인 포인트입니다.',
  footer: '엔비디아 · AI 안전 논쟁',
}, {
  badge: 'NVIDIA', badgeLine: '"AI doom claims aren\u2019t grounded in science" — Jensen Huang',
  heroIcon: '\u260E', heroBig: 'Huang Speaks Out',
  heroSub: 'Huang called a whistleblower\u2019s safety concerns courageous while rejecting AI existential-risk claims.',
  cards: [
    { icon:'\u{1F399}', big:'Courageous', mid:'Whistleblower praised', sub:'Jacob Coxon\u2019s concerns respected' },
    { icon:'\u{1F6AB}', big:'Draws a line', mid:'AI doom thesis', sub:'Called unscientific' },
    { icon:'\u260E', big:'Trump call', mid:'Live on air', sub:'Traded speakerphone jokes' },
  ],
  quote: 'President Trump called Huang live during an interview, joking he "can build the world\u2019s best AI chip but doesn\u2019t know how to use speakerphone."',
  noteSub: 'Huang respects safety concerns but rejects extreme doom narratives. Watch whether this translates into actual policy or regulation.',
  footer: 'Nvidia · AI Safety Debate',
});

add('spacex-revenue-10b-month', 'L5', 'SPCX', {
  badge: '스페이스X', title: '스페이스X가 12월 월간 매출 100억 달러를 목표로 하며 AI 컴퓨팅 사업을 빠르게 키우고 있습니다',
  heroIcon: '\u{1F680}', heroBig: '월 100억 달러 전망',
  heroSub: '애널리스트 모델링에 따른 12월 목표치입니다. 스타링크·AI 컴퓨팅 임대가 함께 쌓이는 구조입니다.',
  before: { label:'8월 추정', big:'월 44억달러', sub:'애널리스트 모델 매출' },
  after: { label:'12월 목표', big:'월 100억달러', sub:'구글 계약 전면가동 포함' },
  cards: [
    { icon:'\u{1F4E1}', big:'170억달러', mid:'스타링크 연환산', sub:'2분기 매출 66% 증가' },
    { icon:'\u{1F916}', big:'67억달러', mid:'6개월 클라우드', sub:'10월부터 본격가동' },
    { icon:'\u{1F5A5}', big:'월11.1억', mid:'12월 AI호스팅', sub:'새 계약 연환산 130억' },
  ],
  quote: '이 추정은 확정된 회사 가이던스가 아니라 공개된 계약들을 이어붙인 애널리스트 모델링입니다.',
  noteSub: '실제 스타링크 2분기 매출은 42.9억 달러입니다. 10-K나 다음 실적에서 확정 숫자가 이 추정과 얼마나 가까운지 확인하면 됩니다.',
  footer: '스페이스X · 매출 전망',
}, {
  badge: 'SPACEX', title: 'SpaceX is reportedly targeting roughly $10 billion in monthly revenue by December',
  heroIcon: '\u{1F680}', heroBig: '$10B/mo Target',
  heroSub: 'An analyst model\u2019s December estimate, built from Starlink and AI compute leasing revenue stacking up.',
  before: { label:'Aug estimate', big:'$4.4B/mo', sub:'Modeled revenue' },
  after: { label:'Dec target', big:'$10B/mo', sub:'Google deal at full rate' },
  cards: [
    { icon:'\u{1F4E1}', big:'$17B', mid:'Starlink annualized', sub:'Q2 revenue up 66%' },
    { icon:'\u{1F916}', big:'$6.7B', mid:'6-month cloud deal', sub:'Ramping from October' },
    { icon:'\u{1F5A5}', big:'$1.11B/mo', mid:'Dec AI hosting', sub:'New deal, ~$13B annualized' },
  ],
  quote: 'This isn\u2019t confirmed company guidance — it\u2019s analyst modeling stitched together from disclosed contracts.',
  noteSub: "Actual Q2 Starlink revenue was $4.29B. Watch how close the 10-K or next earnings comes to this estimate.",
  footer: 'SpaceX · Revenue Outlook',
});

add('roadster-oct1-reveal-locked', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: '로드스터 10월 1일',
  title: '테슬라가 9년 만에 새 로드스터를 10월 1일 공개하기로 확정했고 머스크는 실제로 날 것이라 암시했습니다',
  heroBig: '10/1',
  heroSub: '9년 넘게 미뤄온 2세대 로드스터 공개일이 확정됐습니다. 스페이스X 추진기·탄소섬유 차체 탑재 관측이 나옵니다.',
  grid: [
    { icon:'\u{1F5D3}', big:'10/1', mid:'공개 확정', sub:'9년 만의 공개' },
    { icon:'\u23F0', big:'9/16', mid:'신청 마감', sub:'태평양시간 밤 12시' },
    { icon:'\u{1F680}', big:'추진기설', mid:'스페이스X 기술', sub:'탄소섬유 차체 관측' },
    { icon:'\u{1F3AC}', big:'BTTF인용', mid:'날아다니는 차', sub:'2019년 예고 재점화' },
  ],
  ctx1: '머스크는 드로리안 이미지를 공유하며 "새 로드스터는 이런 걸 할 것"이라 적었습니다.',
  ctx2: '2019년 첫 공개 때도 머스크는 로드스터가 "날 것"이라 예고한 바 있습니다.',
  quote: '모델S·모델X가 빠진 라인업에서 로드스터가 테슬라의 새로운 플래그십이 될 수 있다는 관측이 나옵니다.',
  noteSub: '"난다"는 표현이 실제 비행인지 비유인지는 아직 불명확합니다. 10월 1일 행사에서 구체적 기능과 가격이 나오는지 지켜보면 됩니다.',
  footer: '테슬라 · 로드스터',
}, {
  badge: 'BREAKING', breaking: 'ROADSTER OCT 1',
  title: 'Tesla locked in October 1 for the long-delayed Roadster reveal after nine years, and Musk hinted it will actually fly',
  heroBig: 'Oct 1',
  heroSub: 'The second-gen Roadster, delayed for over nine years, finally has a reveal date, with speculation of SpaceX thrusters and a carbon-fiber body.',
  grid: [
    { icon:'\u{1F5D3}', big:'Oct 1', mid:'Reveal locked', sub:'After 9 years' },
    { icon:'\u23F0', big:'Sep 16', mid:'RSVP deadline', sub:'Midnight Pacific time' },
    { icon:'\u{1F680}', big:'Thrusters?', mid:'SpaceX tech', sub:'Carbon-fiber body rumored' },
    { icon:'\u{1F3AC}', big:'BTTF nod', mid:'Flying car', sub:'2019 promise reignited' },
  ],
  ctx1: 'Musk shared a DeLorean image, saying the new Roadster "will actually do this."',
  ctx2: 'Musk first promised the Roadster would "fly" back at its 2019 reveal.',
  quote: 'With the Model S and X off the lineup, the Roadster could become Tesla\u2019s new flagship model.',
  noteSub: 'Whether "flying" means literal flight or a figure of speech remains unclear. Watch for concrete specs and pricing at the Oct 1 event.',
  footer: 'Tesla · Roadster',
});

add('starlink-subscribers-double', 'L5', 'SPCX', {
  badge: '스페이스X', title: '미국 위성 인터넷 가입자가 89% 급증했고 스타링크 글로벌 가입자는 1년 만에 2배로 늘었습니다',
  heroIcon: '\u{1F6F0}', heroBig: '2배 증가',
  heroSub: '미국 연방통신위원회 자료 기준, 스타링크 전 세계 가입자가 1년 사이 2배로 늘었습니다.',
  before: { label:'2025년 6월', big:'600만명', sub:'1년 전 글로벌 가입자' },
  after: { label:'2026년 6월', big:'1,200만명', sub:'지금 글로벌 가입자' },
  cards: [
    { icon:'\u{1F1FA}\u{1F1F8}', big:'+89%', mid:'미국 가입 급증', sub:'2025.1~2026.6 기준' },
    { icon:'\u{1F4B0}', big:'42.9억달러', mid:'2분기 매출', sub:'1년 전보다 66% 증가' },
    { icon:'\u{1F4F6}', big:'38.8%', mid:'영업이익률', sub:'스페이스X 유일 흑자사업' },
  ],
  quote: '위성 인터넷은 케이블·통신탑 없이 인공위성을 거쳐 인터넷에 연결하는 방식입니다.',
  noteSub: '기업·정부용 매출이 108% 늘어 소비자용(44%)보다 훨씬 빠릅니다. 다음 분기 성장률이 2분기 수준을 유지하는지 지켜보면 됩니다.',
  footer: '스타링크 · 가입자 확대',
}, {
  badge: 'SPACEX', title: 'US satellite internet subscriptions surged 89% while Starlink\u2019s global base doubled to 12 million in a year',
  heroIcon: '\u{1F6F0}', heroBig: '2x Growth',
  heroSub: "Starlink's global subscriber base doubled in a year, per FCC data.",
  before: { label:'June 2025', big:'6 million', sub:'Global subscribers, a year ago' },
  after: { label:'June 2026', big:'12 million', sub:'Global subscribers, now' },
  cards: [
    { icon:'\u{1F1FA}\u{1F1F8}', big:'+89%', mid:'US subscriptions', sub:'Jan 2025 to Jun 2026' },
    { icon:'\u{1F4B0}', big:'$4.29B', mid:'Q2 revenue', sub:'Up 66% year over year' },
    { icon:'\u{1F4F6}', big:'38.8%', mid:'Operating margin', sub:"SpaceX's only profitable segment" },
  ],
  quote: 'Satellite internet connects users through orbiting satellites, skipping cables and cell towers entirely.',
  noteSub: "Enterprise/government revenue grew 108%, far outpacing consumer growth (44%). Watch whether next quarter's growth holds up.",
  footer: 'Starlink · Subscriber Growth',
});

add('zurich-fsd-insurance-discount', 'L3', 'TSLA', {
  badge: '테슬라', title: '호주 취리히 보험이 테슬라 FSD 탑재 차량에 보험료를 할인해주는 호주 첫 사례를 시작했습니다',
  heroIcon: '\u{1F6E1}', heroBig: '7배 더 적은 사고',
  heroSub: '취리히가 인용한 테슬라 데이터로, FSD를 켠 차량은 일반 전기차보다 주요·경미 사고가 7배 적었습니다.',
  cards: [
    { icon:'\u{1F1E6}\u{1F1FA}', big:'호주 첫 사례', mid:'전 세계 두번째', sub:'FSD를 보험 요소로 반영' },
    { icon:'\u{1F4CF}', big:'916만km', mid:'주요사고 1건당', sub:'115억km 주행 데이터 기반' },
    { icon:'\u{1F697}', big:'모델3·Y', mid:'적용 대상', sub:'인슈어마이테슬라 상품' },
  ],
  quote: '취리히 임원은 "사람은 실수를 한다. 피곤해지고 주의가 흐트러질 수 있다"며 FSD가 사고 빈도에서 사람보다 나은 성과를 보인다고 말했습니다.',
  noteSub: '나무 낙하·도난 같은 사고는 할인과 무관합니다. 운전자 실수로 인한 위험에만 적용됩니다. 다른 나라 보험사가 뒤따르는지 지켜보면 됩니다.',
  footer: '테슬라 · FSD 보험할인',
}, {
  badge: 'TESLA', title: 'Zurich Australia began offering discounted premiums for Teslas with FSD enabled, an Australian first',
  heroIcon: '\u{1F6E1}', heroBig: '7x Fewer Crashes',
  heroSub: 'Zurich cited Tesla data showing FSD-equipped vehicles get into seven times fewer major or minor collisions than regular EVs.',
  cards: [
    { icon:'\u{1F1E6}\u{1F1FA}', big:'Aussie first', mid:'Global second', sub:'FSD factored into premiums' },
    { icon:'\u{1F4CF}', big:'9.16M km', mid:'Per major crash', sub:'Based on 11.5B km of data' },
    { icon:'\u{1F697}', big:'Model 3/Y', mid:'Eligible models', sub:'InsureMyTesla product' },
  ],
  quote: '"People make mistakes, get tired, and get distracted," a Zurich exec said, noting FSD outperforms humans on crash frequency.',
  noteSub: 'The discount doesn\u2019t cover falling trees or theft — only driver-error risk. Watch whether other insurers follow.',
  footer: 'Tesla · FSD Insurance',
});

add('tesla-semi-europe-specs', 'L2', 'TSLA', {
  badge: '테슬라', title: '테슬라 세미의 유럽형 모델이 독일 하노버에서 처음 공개됐고 2027년부터 유럽 인도가 시작됩니다',
  heroIcon: '\u{1F69A}', heroBig: '550km',
  heroSub: '1회 충전 주행거리입니다. 30분 충전으로 최대거리의 60%까지 채울 수 있습니다.',
  cards: [
    { label:'주행거리', big:'550km', mid:'1회 충전', sub:'km당 1.0kWh 소비' },
    { label:'충전', big:'30분/60%', mid:'급속충전', sub:'최대출력 800kW' },
    { label:'중량', big:'40톤', mid:'최대 총중량', sub:'공차 9.1톤 미만' },
  ],
  detailHead: '유럽형 세미 주요 특징',
  detailLines: [
    '사이드미러 없이 카메라 10대로 360도 시야를 확보했습니다.',
    '유럽 트레일러 규정에 맞춰 마커등 위치와 캡 높이를 조정했습니다.',
    'CCS2→메가차저(MCS) 변환 어댑터를 제공해 기존 충전소도 이용 가능합니다.',
  ],
  noteSub: '유럽은 배출 규제가 엄격해 전기 대형트럭 수요가 늘어날 여지가 있습니다. 2027년 실제 인도와 초기 고객사가 다음 확인 포인트입니다.',
  footer: '테슬라 · 세미 유럽',
}, {
  badge: 'TESLA', title: 'Tesla unveiled the European version of its Semi electric truck in Hannover, with deliveries starting in 2027',
  heroIcon: '\u{1F69A}', heroBig: '550km',
  heroSub: 'Range per charge, with up to 60% of max range restored in a 30-minute fast charge.',
  cards: [
    { label:'Range', big:'550km', mid:'Per charge', sub:'1.0 kWh per km' },
    { label:'Charging', big:'30min/60%', mid:'Fast charging', sub:'Up to 800kW output' },
    { label:'Weight', big:'40t', mid:'Max gross weight', sub:'Under 9.1t curb weight' },
  ],
  detailHead: 'European Semi highlights',
  detailLines: [
    'No side mirrors — 10 cameras provide 360-degree visibility.',
    'Marker lights and cab height adjusted to match EU trailer rules.',
    'A CCS2-to-Megacharger adapter lets it use existing charging stations.',
  ],
  noteSub: "Europe's strict emissions rules could drive demand for electric heavy trucks. Watch for 2027 deliveries and early customers.",
  footer: 'Tesla · Semi Europe',
});

add('waymo-vegas-15th-city', 'L6', 'GOOGL', {
  badge: 'BREAKING', breaking: '웨이모 15번째 도시',
  title: '구글 웨이모가 라스베이거스에서 유료 로보택시 서비스를 시작하며 15번째 서비스 도시로 확장했습니다',
  heroBig: '15번째 도시',
  heroSub: '라스베이거스 스트립·앨리전트 스타디움을 포함한 약 24마일 구역에서 서비스가 시작됐습니다.',
  grid: [
    { icon:'\u{1F3B0}', big:'24마일', mid:'서비스 구역', sub:'라스베이거스 스트립 포함' },
    { icon:'\u{1F690}', big:'오제이', mid:'신형 미니밴', sub:'6세대 웨이모 드라이버' },
    { icon:'\u{1F4DD}', big:'10만명+', mid:'대기자 등록', sub:'순차 초청 발송 중' },
    { icon:'\u{1F3C1}', big:'3사 경쟁', mid:'웨이모·테슬라·우버', sub:'같은 지역 승인받음' },
  ],
  ctx1: '지난달 네바다주 교통당국의 승인을 받아 시작된 서비스입니다.',
  ctx2: '라스베이거스에서 로보택시를 가장 먼저 시작한 것은 아마존 계열 죽스로, 작년 9월부터 운영해 왔습니다.',
  quote: '웨이모 마케팅 총괄은 "라스베이거스 대로를 웨이모로 달리면 누구나 특별한 기분을 느낄 것"이라고 말했습니다.',
  noteSub: '같은 도시에서 여러 로보택시가 경쟁하는 첫 사례가 될 수 있습니다. 대기자 10만 명이 모두 이용 가능해지는 시점을 지켜보면 됩니다.',
  footer: '웨이모 · 라스베이거스',
}, {
  badge: 'BREAKING', breaking: 'WAYMO 15TH CITY',
  title: "Google's Waymo launched paid robotaxi service in Las Vegas, its 15th US commercial market",
  heroBig: '15th City',
  heroSub: 'The roughly 24-mile service area covers the Strip and Allegiant Stadium.',
  grid: [
    { icon:'\u{1F3B0}', big:'24 miles', mid:'Service area', sub:'Includes the Strip' },
    { icon:'\u{1F690}', big:'Ojai', mid:'New minivan', sub:'6th-gen Waymo Driver' },
    { icon:'\u{1F4DD}', big:'100K+', mid:'Waitlist signups', sub:'Invites rolling out' },
    { icon:'\u{1F3C1}', big:'3-way race', mid:'Waymo, Tesla, Uber', sub:'All approved for the area' },
  ],
  ctx1: 'The launch follows approval from Nevada transportation authorities last month.',
  ctx2: 'Amazon-owned Zoox was actually first in Vegas, operating there since last September.',
  quote: 'Waymo\u2019s marketing lead said riding down the Vegas Strip in a Waymo will feel special to everyone.',
  noteSub: 'This could become the first city where multiple robotaxi services compete head-to-head. Watch how fast the 100K-person waitlist clears.',
  footer: 'Waymo · Las Vegas',
});

add('spacex-nvidia-space-computers', 'L4', 'SPCX', {
  badge: '스페이스X', badgeLine: '"매우 확신한다" — 일론 머스크, 우주 AI컴퓨터 발사',
  heroIcon: '\u{1F6F0}', heroBig: '2027년 목표',
  heroSub: '스페이스X가 내년 엔비디아의 AI 컴퓨터를 우주로 쏘아 올릴 것이라고 머스크가 밝혔습니다.',
  cards: [
    { icon:'\u2600', big:'끊임없는 태양광', mid:'우주 데이터센터 장점', sub:'지상보다 전력 제약 적음' },
    { icon:'\u2744', big:'진공 냉각', mid:'다른 방식 설계', sub:'지상과 다른 열관리' },
    { icon:'\u{1F3D7}', big:'부지 제약 없음', mid:'지상 대안', sub:'전력·부지 병목 회피' },
  ],
  quote: '구글도 최근 우주 AI연산 위성 프로젝트를 검토하고 있어, 우주 데이터센터는 업계 전반의 흐름입니다.',
  noteSub: '아직 구체적 발사 일정·기체는 공개되지 않은 청사진 단계입니다. 실제 발사 계획으로 이어지는지가 다음 확인 포인트입니다.',
  footer: '스페이스X · 우주 데이터센터',
}, {
  badge: 'SPACEX', badgeLine: '"Highly confident" — Elon Musk, on launching AI computers to space',
  heroIcon: '\u{1F6F0}', heroBig: '2027 Target',
  heroSub: 'Musk said SpaceX will launch Nvidia AI computers into space next year.',
  cards: [
    { icon:'\u2600', big:'Constant solar', mid:'Space datacenter perk', sub:'Fewer power constraints' },
    { icon:'\u2744', big:'Vacuum cooling', mid:'Different design', sub:'Heat managed differently' },
    { icon:'\u{1F3D7}', big:'No land limits', mid:'Ground-based alternative', sub:'Sidesteps power & land bottlenecks' },
  ],
  quote: 'Google is reportedly also exploring space-based AI compute satellites, making this an industry-wide idea.',
  noteSub: 'No concrete launch date or hardware has been disclosed yet — it\u2019s still a blueprint. Watch for a firm launch plan.',
  footer: 'SpaceX · Space Data Centers',
});

add('grok-4-8-training', 'L4', 'XAI', {
  badge: '그록', badgeLine: '그록 4.8, 2.5조 매개변수로 이번 주 학습 완료',
  heroIcon: '\u{1F9E0}', heroBig: '2.5조 매개변수',
  heroSub: '새 C++ 소프트웨어 스택으로 학습한 그록 4.8 규모입니다. 이번 주 학습을 마치고 강화학습에 들어갑니다.',
  cards: [
    { icon:'\u{1F524}', big:'그록 4.7', mid:'클로드 오퍼스급', sub:'머스크의 평가' },
    { icon:'\u{1F3AF}', big:'그록 4.9', mid:'아스트라·페이블급', sub:'다음 모델 목표' },
    { icon:'\u2753', big:'그록 5', mid:'AGI 후보', sub:'"무엇보다 나을 수도"' },
  ],
  quote: '머스크는 "그록 4.8은 2.5조개 매개변수 모델로, 새 C++스택으로 학습됐다. 이번 주 학습을 마치고 강화학습을 시작할 것"이라 밝혔습니다.',
  noteSub: '매개변수는 모델 크기를 가늠하는 지표입니다. 강화학습·안전검토를 거쳐야 실제 공개되므로, 그록 4.7처럼 출시가 늦춰질 수 있습니다.',
  footer: '그록 · 4.8 학습',
}, {
  badge: 'GROK', badgeLine: 'Grok 4.8: 2.5T parameters, training finishing this week',
  heroIcon: '\u{1F9E0}', heroBig: '2.5T Parameters',
  heroSub: 'Grok 4.8, trained on a new C++ software stack, will finish training this week and move to reinforcement learning.',
  cards: [
    { icon:'\u{1F524}', big:'Grok 4.7', mid:'Claude Opus-class', sub:'Musk\u2019s own comparison' },
    { icon:'\u{1F3AF}', big:'Grok 4.9', mid:'Astra/Fable-class', sub:'Next model target' },
    { icon:'\u2753', big:'Grok 5', mid:'AGI candidate', sub:'"Could be better than anything"' },
  ],
  quote: 'Musk said Grok 4.8 is a 2.5-trillion-parameter model trained on a new C++ stack, finishing training this week before starting RL.',
  noteSub: 'Parameters gauge model size. Since RL and safety review still lie ahead, release could slip like Grok 4.7 did.',
  footer: 'Grok · 4.8 Training',
});

add('xai-datacenter-capacity-model', 'L2', 'XAI', {
  badge: 'xAI', title: 'AI 데이터센터 전력·칩 증설 추정 모델에서 2027년 말 전력 규모가 18.4기가와트까지 커질 것으로 나왔습니다',
  heroIcon: '\u26A1', heroBig: '18.4GW',
  heroSub: 'SNS에 공개된 추정 모델 기준, 2027년 4분기 AI데이터센터 전력 용량 전망입니다.',
  cards: [
    { label:'2026 3Q', big:'1.85GW', mid:'현재 용량', sub:'추정 모델 시작점' },
    { label:'2027 2Q', big:'9.05GW', mid:'중간 지점', sub:'빠르게 증가 중' },
    { label:'2027 4Q', big:'18.4GW', mid:'전망치', sub:'칩 용량은 10.2GW' },
  ],
  detailHead: '전력 용량이 칩 설치보다 앞서는 이유',
  detailLines: [
    '전력 인프라는 짓는 데 오래 걸려 미래 수요를 미리 준비해 둡니다.',
    '실제 설치되는 칩 용량(10.2GW)은 전력 용량보다 적은 여유분입니다.',
    '이 차트는 공식 공시가 아닌 추정 재구성 모델임을 명시하고 있습니다.',
  ],
  noteSub: '전력은 AI산업 최대 병목 중 하나로 꼽힙니다. 실제 회사의 전력 계약·투자 발표가 이 추정과 비슷한 궤적을 그리는지 지켜보면 됩니다.',
  footer: 'xAI · 데이터센터 전망',
}, {
  badge: 'xAI', title: 'A modeled estimate of AI data-center buildout shows total power capacity reaching 18.4 GW by end-2027',
  heroIcon: '\u26A1', heroBig: '18.4GW',
  heroSub: 'A projection circulating on social media for AI data-center power capacity by Q4 2027.',
  cards: [
    { label:'2026 Q3', big:'1.85GW', mid:'Current capacity', sub:'Model\u2019s starting point' },
    { label:'2027 Q2', big:'9.05GW', mid:'Midpoint', sub:'Rapidly increasing' },
    { label:'2027 Q4', big:'18.4GW', mid:'Projected', sub:'Chip capacity: 10.2GW' },
  ],
  detailHead: 'Why power capacity leads chip installs',
  detailLines: [
    'Power infrastructure takes years to build, so capacity is added ahead of demand.',
    'Actual installed chip capacity (10.2GW) is smaller than total power capacity.',
    'The chart notes it\u2019s a reconstructed estimate, not an official company filing.',
  ],
  noteSub: 'Power is seen as one of the AI industry\u2019s biggest bottlenecks. Watch whether real power contracts and investments track this projected curve.',
  footer: 'xAI · Data Center Outlook',
});

};
