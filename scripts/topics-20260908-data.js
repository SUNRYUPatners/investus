// 2026-09-08 SVG topic data — consumed by gen-reports-20260908.js
// Layout mix: L1×4 L2×3 L3×4 L4×3 L5×2 L6×2 ROWS×1
// KO cards: mid+sub = full beginner context (never 1-word dumps)
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.08 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'노동절 오스틴 사이버캡이 대기 약 15분·요금 6.15달러로 찍혔습니다',
      sub:'모델Y 로보택시보다 약 3달러 저렴하고, 언박스트는 10초 미만·목표 5초입니다.' },
    { color:'#22d3ee', fill:'#06171c', right:'FSD', title:'완전 자율주행 감독이 슬로베니아에서 승인돼 유럽이 여섯 나라가 됐습니다',
      sub:'10월 유럽연합 표결 서사와 베를린 주당 약 7,500대·21개 도시 채용이 겹칩니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'MACRO', title:'장기국채 10년 롤링이 −2%, 일본은 해외증권 약 880억 달러를 팔았습니다',
      sub:'구리는 사상 최고·전년 대비 약 17%, 비트코인은 증폭된 금처럼 해석됩니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'선박 42호기 극저온이 끝났고 루이지애나 운하를 약 16피트로 준설합니다',
      sub:'다음은 랩터 장착·15번째 비행, 스타십 바지선 수송 통로입니다.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'칩 접근권이 평화 협상 카드가 됐고 암·삼성 2나노 가속기가 나왔습니다',
      sub:'옵티머스 발주는 미확인 보도, 목표주가 500달러·레벨4 문서 정렬도 같은 표입니다.' },
  ],
  caption: '더 볼 것: 6.15달러·10초·슬로베니아·880억·구리ATH·베를린7500·옵티머스미확인·Ship42·NVDA외교·500달러',
}, {
  headline: '2026.09.08 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'TSLA', title:'Labor Day Austin Cybercab: ~15 min wait, $6.15 fare',
      sub:'About $3 cheaper than Model Y robotaxi; unboxed under 10s (goal 5s).' },
    { color:'#22d3ee', fill:'#06171c', right:'FSD', title:'FSD Supervised approved in Slovenia—Europe’s sixth country',
      sub:'October EU vote narrative; Berlin ~7,500/wk; 21-city night hiring.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'MACRO', title:'Long Treasury 10y rolling −2%; Japan sold ~$88B foreign securities',
      sub:'Copper ATH ~+17% YoY; Bitcoin framed as amplified gold.' },
    { color:'#c084fc', fill:'#140b1f', right:'SPCX', title:'Ship 42 cryo done; Louisiana canal dredged to ~16 ft',
      sub:'Raptor install next; Flight 15 nears; Starship barge path.' },
    { color:'#60a5fa', fill:'#06121f', right:'NVDA', title:'Chip access used in peace diplomacy; Arm–Samsung 2nm AI accelerator',
      sub:'Optimus PO unverified; $500 PT; NHTSA L4 language aligns with Cybercab.' },
  ],
  caption: 'Watch: $6.15 · <10s · Slovenia · $88B · copper ATH · Berlin 7.5k · Optimus unverified · Ship42 · NVDA diplomacy · $500',
});

add('treasury-10yr-entry', 'L1', 'RATES', {
  badge: 'MACRO', title: '미국 15년 이상 국채 10년 롤링 수익률이 2026년 8월 −2%로 사상 최저권입니다',
  heroIcon: '📉', heroBig: '−2%',
  heroSub: '만기가 15년 넘는 국채를 10년 동안 들고 있을 때 나온 연율화 수익률입니다. 장기 진입을 말하는 논평이 같은 차트에 붙었습니다.',
  cards: [
    { icon:'📅', big:'2026.8', mid:'저점이 찍힌 달', sub:'긴 시계열에서 최저권' },
    { icon:'📜', big:'1959', mid:'이전 저점 연도', sub:'당시엔 0% 근처 비교' },
    { icon:'⏱', big:'10년', mid:'롤링 보유 창', sub:'쿠폰 대비 가격 성과' },
  ],
  quote: '롤링 −2%는 지난 10년 가격 손실이 이자(쿠폰)를 압도했다는 뜻입니다. 앞으로의 시작 수익률이 높아질 수 있어 장기 진입 논평이 나오지만, 물가·재정은 여전히 변수입니다.',
  noteSub: '−2%가 앞으로 10년 수익을 보장하지는 않습니다. 명목·실질 10년물과 근원 물가를 같은 표에 두고, 레버리지 듀레이션은 별도 칸에 두시기 바랍니다. 성장주 할인율과 연결하면 포트폴리오 의미가 커집니다. 장기적으로는 시작 수익률이 높은 구간이 복리의 출발점이 될 수 있습니다.',
  footer: '매크로 · 장기국채',
}, {
  badge: 'MACRO', title: 'US 15y+ Treasuries 10-year rolling return near −2% in Aug 2026',
  heroIcon: '📉', heroBig: '−2%',
  heroSub: 'Worst print in the long series for 15y+ holdings. Same chart frames a long-horizon entry window.',
  cards: [
    { icon:'📅', big:'Aug’26', mid:'Trough month', sub:'Series low zone' },
    { icon:'📜', big:'1959', mid:'Prior low year', sub:'Near 0% then' },
    { icon:'⏱', big:'10y', mid:'Rolling window', sub:'Holding vs coupons' },
  ],
  quote: 'A −2% rolling return means price losses dominated coupons over the prior decade. Starting yields may look better ahead—but inflation and fiscal risk still decide real outcomes.',
  noteSub: 'It does not guarantee the next decade. Pair nominal/real 10y and core inflation, keep leveraged duration separate, and link the print to equity discount rates. Long-horizon investors often care more about entry yield than last decade’s scar.',
  footer: 'Macro · long Treasuries',
});

add('cybercab-austin-fare', 'L5', 'TSLA', {
  badge: 'TSLA', title: '노동절 오스틴 사이버캡 요금 6.15달러·대기 약 15분입니다',
  heroIcon: '🚕', heroBig: '$6.15',
  heroSub: '앱에 찍힌 표시 요금이 6.15달러이고 대기는 약 15분이었습니다. 같은 아침 모델Y 로보택시보다 약 3달러 저렴해 보였습니다.',
  before: { label:'모델Y 로보택시', big:'+$3', sub:'상대적으로 더 비쌈' },
  after: { label:'사이버캡', big:'$6.15', sub:'앱 표시 요금' },
  cards: [
    { icon:'⏱', big:'~15분', mid:'호출 후 대기 시간', sub:'노동절 아침 오스틴' },
    { icon:'💵', big:'$6.15', mid:'앱에 표시된 요금', sub:'특정 구간 한 건' },
    { icon:'🚕', big:'~$3', mid:'모델Y보다 저렴', sub:'같은 아침 비교' },
  ],
  quote: '6.15달러는 특정 구간의 표시가이고, 15분 대기는 그날 공급·회전율 신호입니다. 사이버캡은 운전석 없는 전용 로보택시 차량입니다. 연휴와 평일 피크를 한 숫자로 합치지 마시고 마일당·시간당 표로 옮기시면 됩니다.',
  noteSub: '모델Y는 4인승·사이버캡은 2인승이라 좌석·보험 원가가 다릅니다. 다음 확인할 것은 평일 중앙값 대기·요금과 지오펜스(운행 가능 구역) 차량 대수입니다. 마진은 전기·보험이 비기 전까지 빈칸으로 두시기 바랍니다. 장기적으로는 요금이 반복 측정되면 유닛 이코노믹스 논쟁이 숫자로 내려옵니다.',
  footer: '테슬라 · 오스틴 요금',
}, {
  badge: 'TSLA', title: 'Labor Day Austin: Cybercab $6.15 with ~15 min waits',
  heroIcon: '🚕', heroBig: '$6.15',
  heroSub: 'In-app quote near $6.15 and about 15 minutes wait. Roughly $3 cheaper than Model Y robotaxi that morning.',
  before: { label:'Model Y robotaxi', big:'+$3', sub:'Relatively higher' },
  after: { label:'Cybercab', big:'$6.15', sub:'Quoted fare' },
  cards: [
    { icon:'⏱', big:'~15m', mid:'Wait after request', sub:'Holiday morning Austin' },
    { icon:'💵', big:'$6.15', mid:'In-app fare quote', sub:'One segment print' },
    { icon:'🚕', big:'~$3', mid:'Cheaper vs Model Y', sub:'Same-morning compare' },
  ],
  quote: '$6.15 is one segment quote; a 15-minute wait is a supply/utilization signal. Cybercab is the wheel-free dedicated robotaxi vehicle. Do not blend holiday and weekday peaks—move both into per-mile and per-hour tables.',
  noteSub: 'Model Y seats four; Cybercab seats two—insurance and cost stacks differ. Next: weekday median wait/fare and geofence fleet size. Keep margin blank until energy and insurance are measured. Over time, repeated fare prints turn unit-economics debates into numbers.',
  footer: 'TSLA · Austin fare',
});

add('unboxed-under-10s', 'L5', 'TSLA', {
  badge: 'TSLA', title: '사이버캡 언박스트 사이클이 10초 미만, 목표는 5초입니다',
  heroIcon: '🏭', heroBig: '<10s',
  heroSub: '언박스트는 차체를 큰 모듈로 조립해 라인 택트(한 대당 시간)를 줄이는 방식입니다. 장기 목표는 5초, 모델Y 비교는 약 34초입니다.',
  before: { label:'모델Y', big:'~34초', sub:'비교용 사이클' },
  after: { label:'사이버캡', big:'<10초', sub:'설계 목표 5초' },
  cards: [
    { icon:'🏭', big:'<10s', mid:'지금 설계 사이클', sub:'라인에서 한 대당 시간' },
    { icon:'🎯', big:'5s', mid:'장기 택트 목표', sub:'더 빠른 처리량' },
    { icon:'📦', big:'모듈', mid:'언박스트 조립', sub:'원가·속도 레버' },
  ],
  quote: '차량당 10초는 이론상 시간당 수백 대 산술로 이어집니다. 수율·물류가 빠지면 실출력은 줄므로, 설계 사이클과 주간 완성 대수를 반드시 나눠 적으시기 바랍니다. 언박스트는 공장 처리량의 핵심 레버입니다.',
  noteSub: '모델Y 34초와 정의(게이트)가 같은지 확인이 필요합니다. 속도만 올리고 수율이 낮으면 재작업비가 늘어납니다. 다음 게이트는 양산 주간 출력입니다. 장기적으로 처리량이 안정되면 로보택시 원가 논쟁이 유리해질 수 있습니다.',
  footer: '테슬라 · 언박스트',
}, {
  badge: 'TSLA', title: 'Cybercab unboxed cycle under 10 seconds, targeting 5',
  heroIcon: '🏭', heroBig: '<10s',
  heroSub: 'Unboxed means large modular body assembly to cut takt time. Long-term goal 5s versus about 34s cited for Model Y.',
  before: { label:'Model Y', big:'~34s', sub:'Compare cycle' },
  after: { label:'Cybercab', big:'<10s', sub:'Goal 5s' },
  cards: [
    { icon:'🏭', big:'<10s', mid:'Design cycle now', sub:'Seconds per vehicle' },
    { icon:'🎯', big:'5s', mid:'Long-term takt', sub:'Higher throughput' },
    { icon:'📦', big:'Modules', mid:'Unboxed assembly', sub:'Cost and speed lever' },
  ],
  quote: 'Ten seconds per vehicle implies hundreds per hour on paper. Yield and logistics cut real output—always split design cycle from weekly finished units.',
  noteSub: 'Confirm the Model Y 34s definition matches. Speed without yield raises rework. Next gate: weekly production output. Over time, stable throughput softens robotaxi cost debates.',
  footer: 'TSLA · unboxed',
});

add('fsd-slovenia-6th', 'L3', 'TSLA', {
  badge: 'TSLA', title: '완전 자율주행 감독 모드가 슬로베니아에서 승인됐습니다',
  heroIcon: '✅', heroBig: '6번째',
  heroSub: '벨기에·네덜란드·덴마크·리투아니아·에스토니아에 이어 슬로베니아입니다. 감독 모드란 사람이 개입할 수 있는 상태로 소프트웨어를 켜는 허가입니다.',
  cards: [
    { icon:'🇸🇮', big:'슬로베니아', mid:'이번에 새로 승인', sub:'유럽 지도에 추가' },
    { icon:'🗺', big:'6개국', mid:'승인 국가 합계', sub:'아직 소국 파일럿 맵' },
    { icon:'📅', big:'10월', mid:'EU 표결 서사', sub:'확정 일정은 아님' },
  ],
  quote: '국가 승인은 소프트웨어를 켜는 법적 스위치입니다. 소국 여섯은 파일럿에 가깝고, 독일·프랑스 등 대형국은 아직 별도 칸입니다. 자동차 비중이 큰 슬로베니아에서 허가가 나온 점이 주목됩니다.',
  noteSub: '10월 유럽연합 표결은 전망이지 확정이 아닙니다. 출시일·구독 가격·개입률이 나오면 승인 헤드라인을 매출 표로 옮기시면 됩니다. 대형국 일정을 소국 숫자와 섞지 마시기 바랍니다. 장기적으로는 국가가 늘어날수록 유럽 구독 서사가 두꺼워집니다.',
  footer: '테슬라 · 유럽 FSD',
}, {
  badge: 'TSLA', title: 'FSD Supervised approved in Slovenia—Europe’s sixth',
  heroIcon: '✅', heroBig: '6th',
  heroSub: 'After Belgium, Netherlands, Denmark, Lithuania, and Estonia. Supervised means the software may run with a human ready to intervene.',
  cards: [
    { icon:'🇸🇮', big:'Slovenia', mid:'Newly approved', sub:'Added on the map' },
    { icon:'🗺', big:'6', mid:'Countries approved', sub:'Still a pilot map' },
    { icon:'📅', big:'Oct', mid:'EU vote story', sub:'Not a locked date' },
  ],
  quote: 'Country approval is the legal switch for software. Six smaller markets are still a pilot map—Germany and France remain separate cells. Slovenia’s auto-heavy GDP share drew notice.',
  noteSub: 'An October EU vote story is not a decision. Move launch dates, subscription price, and intervention rates into the revenue table when they print. Do not blend large-market timing with the count of six. Over time, more countries thicken the European subscription story.',
  footer: 'TSLA · Europe FSD',
});

add('japan-88b-securities', 'L1', 'JPY', {
  badge: 'MACRO', title: '일본이 8월 해외증권 약 880억 달러를 매각해 개입 자금을 댔습니다',
  heroIcon: '💴', heroBig: '$88B',
  heroSub: '월간 기준 사상 최대 규모의 해외증권 매각으로 집계됐습니다. 엔화 방어(환율 개입) 자금을 대기 위해 해외에 둔 증권을 판 것으로 읽힙니다.',
  cards: [
    { icon:'📊', big:'$88B', mid:'해외증권 매각액', sub:'2026년 8월 한 달' },
    { icon:'💱', big:'엔 급등', mid:'같은 주 차트', sub:'개입 관측과 겹침' },
    { icon:'🏦', big:'자금 조달', mid:'예금·증권 구분', sub:'개입 실탄 마련' },
  ],
  quote: '환율 개입 자금을 대기 위해 해외자산을 현금화한 규모가 약 880억 달러로 이례적으로 컸습니다. 미 국채 수급·엔캐리(저금리 엔 차입)·위험자산 변동성이 같은 주에 연결될 수 있습니다.',
  noteSub: '한 달 숫자가 매일 반복된다고 가정하면 과합니다. 재무성 월보·달러-엔·미 10년물을 같이 보고, 연속 개입 여부로 시나리오를 나누시기 바랍니다. 일회성이면 수급 충격으로만 기록하면 됩니다. 장기적으로는 엔·달러 균형이 글로벌 리스크 자산의 배경 금리가 됩니다.',
  footer: '매크로 · 엔·개입',
}, {
  badge: 'MACRO', title: 'Japan sold a record ~$88B of foreign securities in August',
  heroIcon: '💴', heroBig: '$88B',
  heroSub: 'Largest monthly sale in the series, framed as FX-intervention funding. Yen spiked on the same chart.',
  cards: [
    { icon:'📊', big:'$88B', mid:'Foreign securities sold', sub:'August 2026 month' },
    { icon:'💱', big:'Yen spike', mid:'Same-week chart', sub:'Intervention watch' },
    { icon:'🏦', big:'Funding mix', mid:'Deposits vs bonds', sub:'Cash for FX defense' },
  ],
  quote: 'Authorities monetized overseas assets at an unusual ~$88B scale to fund FX defense. U.S. Treasury supply, yen carry, and risk-asset volatility can move together that week.',
  noteSub: 'Do not assume every month repeats. Pair MoF flows, USD/JPY, and U.S. 10y, and split one-off versus repeat intervention scenarios. If one-off, log it as a supply shock only. Over time, yen–dollar balance stays a backdrop rate for global risk assets.',
  footer: 'Macro · yen intervention',
});

add('ship-42-cryo-done', 'L3', 'SPCX', {
  badge: 'SPCX', title: '선박 42호기 극저온 시험이 끝나고 생산 사이트로 돌아왔습니다',
  heroIcon: '🚀', heroBig: '극저온 완료',
  heroSub: '극저온(크라이오)은 연료 탱크·배관을 아주 낮은 온도로 검증하는 발사 전 게이트입니다. 다음은 랩터 엔진 장착입니다.',
  cards: [
    { icon:'❄️', big:'극저온', mid:'탱크·배관 시험 끝', sub:'발사 전 하드웨어 게이트' },
    { icon:'🏭', big:'생산지', mid:'사이트로 롤백', sub:'조립 라인으로 복귀' },
    { icon:'🔧', big:'랩터', mid:'엔진 장착 차례', sub:'다음 체크리스트' },
  ],
  quote: '극저온 통과는 발사 전 하드웨어 게이트입니다. 「비행이 곧」은 현장 톤이지 확정일이 아니므로, 정적 화염·스택·허가 창을 체크리스트로 두시기 바랍니다. 15번째 비행 서사가 가까워진 구간입니다.',
  noteSub: '15번째 비행은 케이던스(발사 리듬) 고리의 다음 칸입니다. 엔진·용접 재시험이 붙으면 수개월 밀릴 수 있습니다. 스타링크 배치 계획과 발사 성공을 같은 표에 연결하되, 테슬라 주가와 일대일 이식은 피하시기 바랍니다. 장기적으로는 케이던스가 쌓일수록 재사용 경제가 설득력을 얻습니다.',
  footer: '스페이스X · Ship 42',
}, {
  badge: 'SPCX', title: 'Ship 42 finished cryo testing and rolled to production',
  heroIcon: '🚀', heroBig: 'Cryo done',
  heroSub: 'Cryo validates tanks and lines at ultra-low temperature before flight. Raptor installation is next; Flight 15 is described as approaching.',
  cards: [
    { icon:'❄️', big:'Cryo', mid:'Tanks/lines complete', sub:'Pre-flight hardware gate' },
    { icon:'🏭', big:'Prod site', mid:'Rolled back', sub:'Back to assembly' },
    { icon:'🔧', big:'Raptor', mid:'Install next', sub:'Next checklist item' },
  ],
  quote: 'Cryo pass is a pre-flight hardware gate. “Flight soon” is field tone, not a dated window—keep static fire, stack, and license slots on a checklist.',
  noteSub: 'Flight 15 is the next cadence link. Engine or weld retests can slip months. Tie Starlink deployment plans to launch success, but do not map SpaceX milestones one-for-one onto Tesla shares. Over time, cadence builds the reuse economics story.',
  footer: 'SpaceX · Ship 42',
});

add('copper-ath', 'L1', 'GOLD', {
  badge: 'MACRO', title: '구리가 런던금속거래소 사상 최고, 전년 대비 약 17% 올랐습니다',
  heroIcon: '🟠', heroBig: '사상최고',
  heroSub: '런던금속거래소(LME) 기준 사상 최고가입니다. 관세·공급 부족 서사가 붙었고, 톤당 약 1만 4,533달러권이 9월 초 보도로 언급됩니다.',
  cards: [
    { icon:'📈', big:'+17%', mid:'전년 대비 상승', sub:'약 1년 누적 상승률' },
    { icon:'🏛', big:'LME', mid:'가격 기준 거래소', sub:'런던 금속 시세' },
    { icon:'⚡', big:'전기화', mid:'전력·EV 수요', sub:'배선 금속의 구조 수요' },
  ],
  quote: '구리는 전력·모터 배선의 기초 금속입니다. 사상 최고는 투기와 구조 수요가 겹칠 수 있어 재고·중국 수입·기간구조(선물 곡선)를 같이 보셔야 합니다. 톤당 약 1만 4,533달러권이 거론됐습니다.',
  noteSub: '관세 프리미엄은 확정 전에 먼저 붙었다가 빠질 수 있습니다. 광산 리드타임이 길어 공급이 즉시 늘지 않는 점이 장기 타이트 논쟁의 근거입니다. 현물과 광산 주식을 열로 나누시기 바랍니다. 장기적으로 전기화 투자가 이어지면 구리 수요 서사는 구조적으로 남습니다.',
  footer: '섹터 · 구리',
}, {
  badge: 'MACRO', title: 'Copper hit an LME all-time high, up about 17% YoY',
  heroIcon: '🟠', heroBig: 'ATH',
  heroSub: 'London Metal Exchange all-time high with tariff and shortage narratives. About $14,533/t cited in early September reports.',
  cards: [
    { icon:'📈', big:'+17%', mid:'Year-over-year gain', sub:'About one-year rise' },
    { icon:'🏛', big:'LME', mid:'Price venue', sub:'London metal benchmark' },
    { icon:'⚡', big:'Electrify', mid:'Power and EV demand', sub:'Structural wiring metal' },
  ],
  quote: 'Copper is the wiring metal for power and motors. ATHs can mix speculation and structural demand—pair inventories, China imports, and the forward curve. About $14,533/t was cited.',
  noteSub: 'Tariff premia can arrive before rules and fade after. Mine lead times keep supply sticky—that underpins long tightness debates. Split spot versus miners. Over time, electrification capex keeps a structural demand story.',
  footer: 'Sector · copper',
});

add('arm-samsung-2nm', 'L2', 'AI', {
  badge: 'SEMI', title: '암이 삼성 2나노(SF2)로 인공지능 가속기를 설계·양산합니다',
  heroIcon: '💾', heroBig: 'SF2',
  heroSub: '2나노급 공정에서 칩 설계(암)와 생산(삼성 팹)이 한 패키지로 붙습니다. 고객·물량은 추가 확인이 필요합니다.',
  cards: [
    { label:'공정', big:'2nm', mid:'삼성 SF2 노드', sub:'최선단 양산 후보' },
    { label:'역할', big:'설계+팹', mid:'한 패키지로 묶음', sub:'암 IP + 삼성 생산' },
    { label:'목적', big:'AI', mid:'연산 가속기 칩', sub:'인공지능 서버용' },
  ],
  detailHead: '왜 묶이나',
  detailLines: ['🧠 암에 인공지능 연산 스택 확장','🏭 삼성에 2나노 실전 레퍼런스','🌐 파운드리 선택지 다양화'],
  noteSub: '발표는 옵션이지 확정 수주가 아닙니다. 샘플·양산 분기와 벤치마크가 다음 게이트입니다. TSMC·자체 칩 일정과 같은 표에 두고, 로열티·웨이퍼 매출 코멘트를 실적에서 확인하시기 바랍니다. 장기적으로는 선단 노드 선택지가 늘면 구매자 협상력이 커집니다.',
  footer: '반도체 · 암·삼성',
}, {
  badge: 'SEMI', title: 'Arm pairs with Samsung SF2 2nm for an AI accelerator',
  heroIcon: '💾', heroBig: 'SF2',
  heroSub: 'Design plus fab on a leading-edge node. Customers and volumes still need confirmation.',
  cards: [
    { label:'Node', big:'2nm', mid:'Samsung SF2', sub:'Leading-edge candidate' },
    { label:'Stack', big:'IP+Fab', mid:'One package', sub:'Arm design + SEC fab' },
    { label:'Chip', big:'AI', mid:'Accelerator silicon', sub:'AI compute servers' },
  ],
  detailHead: 'Why it matters',
  detailLines: ['🧠 Deeper Arm presence in AI compute','🏭 Real 2nm proving ground for Samsung','🌐 More foundry choice for buyers'],
  noteSub: 'A partnership is an option, not booked wafers. Next gates: sample/volume quarters and benchmarks. Keep TSMC and captive silicon on the same table and watch royalty and foundry commentary. Over time, more leading-edge choices raise buyer bargaining power.',
  footer: 'Semis · Arm/Samsung',
});

add('tsla-china-sep-offers', 'L2', 'TSLA', {
  badge: 'TSLA', title: '테슬라 중국 9월 재고 할인·무이자 패키지가 강화됐습니다',
  heroIcon: '🇨🇳', heroBig: '9월',
  heroSub: '모델3 재고 5천 위안·모델Y 1만 위안, 도장·보험·최장 5년 무이자가 붙습니다. 도매 10개월 연속 성장 유지가 목표로 읽힙니다.',
  cards: [
    { label:'모델3', big:'¥5k', mid:'재고차 할인 폭', sub:'9월 프로모션' },
    { label:'모델Y', big:'¥10k', mid:'재고차 할인 폭', sub:'9월 프로모션' },
    { label:'금융', big:'0%', mid:'최장 5년 무이자', sub:'할부 이자 부담 완화' },
  ],
  detailHead: '패키지 구성',
  detailLines: ['🎨 도장 혜택 최대 8,000위안','🛡 일부 모델3 보험 8,000위안','📈 도매 전년 대비 10개월 연속'],
  noteSub: '할인은 볼륨 방어와 마진 압력의 동시 신호입니다. 월간 도매·소매·재고 일수를 보고 ASP(평균판매가격) 가정을 조정하시기 바랍니다. 무이자 잔고의 신용 비용도 공시에서 찾으시면 됩니다. 장기적으로는 중국 수요 유지가 글로벌 인도 안정에 중요합니다.',
  footer: '테슬라 · 중국 판매',
}, {
  badge: 'TSLA', title: 'Tesla China strengthens September inventory offers',
  heroIcon: '🇨🇳', heroBig: 'Sep',
  heroSub: '¥5k Model 3 / ¥10k Model Y inventory; paint, insurance, 0% up to 5 years. Aimed at defending a 10th YoY wholesale growth month.',
  cards: [
    { label:'M3', big:'¥5k', mid:'Inventory discount', sub:'September promo' },
    { label:'MY', big:'¥10k', mid:'Inventory discount', sub:'September promo' },
    { label:'Finance', big:'0%', mid:'Interest-free ≤5 yrs', sub:'Lower monthly burden' },
  ],
  detailHead: 'Package',
  detailLines: ['🎨 Paint benefits up to ¥8,000','🛡 Insurance ¥8,000 on some Model 3','📈 Ten straight YoY wholesale growth months'],
  noteSub: 'Discounts defend volume and pressure ASP together. Adjust ASP with monthly wholesale/retail/days of inventory, and look for financing credit costs in disclosures. Over time, China demand stability still matters for global deliveries.',
  footer: 'TSLA · China offers',
});

add('btc-amplified-gold', 'L4', 'BTC', {
  badge: 'BTC', badgeLine: '⚖️ 금 상관 · 높은 베타',
  title: '비트코인이 금의 움직임을 증폭해 따라가는 구간으로 읽힙니다',
  heroIcon: '⚖️', heroBig: '증폭된 금',
  heroSub: '방향은 금과 비슷한데 등락 폭은 더 큰 구간입니다. 상관(같이 움직이는 정도)은 국면마다 달라집니다.',
  cards: [
    { icon:'🥇', big:'금', mid:'방향의 공통 팩터', sub:'실질금리·달러와 연결' },
    { icon:'₿', big:'BTC', mid:'더 큰 진폭(베타)', sub:'같은 뉴스에 더 크게 반응' },
    { icon:'📈', big:'상관', mid:'90일 국면 점검', sub:'분산 효과 재계산' },
  ],
  quote: '실질금리·달러가 공통 동인인 구간에서 비트코인은 금보다 빠르게, 더 크게 반응하는 경우가 많습니다. 분산 효과가 줄어들면 비중 합산 리스크를 다시 계산해야 합니다. 증폭은 상승과 낙폭 모두에 적용됩니다.',
  noteSub: '위험선호가 돌아오면 나스닥 베타로 돌아갈 수 있습니다. 금·비트코인·DXY(달러지수)·실질금리를 한 표에 두고, 안전자산 바스켓 상한을 미리 정하시기 바랍니다. 장기적으로는 디지털 희소 자산과 실물 헤지를 역할별로 나누는 편이 읽기 쉽습니다.',
  footer: '비트코인 · 금 상관',
}, {
  badge: 'BTC', badgeLine: '⚖️ Gold link · high beta',
  title: 'Bitcoin is trading like an amplified version of gold',
  heroIcon: '⚖️', heroBig: 'Amp gold',
  heroSub: 'Same direction as gold, larger swings. Correlation depends on the regime.',
  cards: [
    { icon:'🥇', big:'Gold', mid:'Shared direction factor', sub:'Tied to real rates/USD' },
    { icon:'₿', big:'BTC', mid:'Wider beta moves', sub:'Bigger reaction to same news' },
    { icon:'📈', big:'Corr', mid:'90-day regime check', sub:'Recheck diversification' },
  ],
  quote: 'When real rates and the dollar drive both, Bitcoin often moves faster and larger than gold. If diversification shrinks, recalculate combined risk weights. Amplification cuts both ways.',
  noteSub: 'Risk-on regimes can restore Nasdaq beta. Keep gold, Bitcoin, DXY, and real yields on one sheet and pre-set a ceiling for the haven basket. Over time, split digital scarcity and physical hedge by role.',
  footer: 'Bitcoin · gold link',
});

add('optimus-mass-po', 'L2', 'TSLA', {
  badge: 'TSLA', title: '옵티머스 초기 약 5,000대 발주·연 1만 5,000대 목표 보도(미확인)',
  heroIcon: '🤖', heroBig: '미확인',
  heroSub: '공급망·언론 보도 기준이며 공식 공시는 아닙니다. 9월 협력사 감사, 주당 1,000→연말 2,000~2,500대 가이던스가 언급됐습니다.',
  cards: [
    { label:'발주', big:'~5k', mid:'초기 발주 규모', sub:'보도·미확인' },
    { label:'연간', big:'15k', mid:'연간 목표 숫자', sub:'보도·미확인' },
    { label:'런레이트', big:'2.5k', mid:'연말 주당 속도', sub:'가이던스 보도' },
  ],
  detailHead: '라벨',
  detailLines: ['⚠️ 공식 공시 전·미확인','🔍 9월 국내 협력사 감사 관문','🏭 파일럿→양산 언어로 전환 시도'],
  noteSub: '주당 2,500대는 연말 속도이지 연간 누적과 다릅니다. 모델에는 하한 0을 기본으로 두고, 실적·공시에 같은 숫자가 나오는지 확인하시기 바랍니다. 보도만으로 레버리지 추격은 피하시기 바랍니다. 장기적으로 휴머노이드가 공장 노동을 대체하면 원가 구조가 바뀔 수 있습니다.',
  footer: '테슬라 · 옵티머스(미확인)',
}, {
  badge: 'TSLA', title: 'Optimus ~5k PO / 15k year target in supply-chain press (unverified)',
  heroIcon: '🤖', heroBig: 'Unverified',
  heroSub: 'Supply-chain press, not a filing. Sept supplier audits; ~1,000/wk Sept → 2,000–2,500/wk by year-end in the same reports.',
  cards: [
    { label:'PO', big:'~5k', mid:'Initial order size', sub:'Press / unverified' },
    { label:'Year', big:'15k', mid:'Annual target cited', sub:'Press / unverified' },
    { label:'Rate', big:'2.5k', mid:'Week rate by year-end', sub:'Exit-rate guide' },
  ],
  detailHead: 'Labels',
  detailLines: ['⚠️ Not a company filing','🔍 September vendor audits as gate','🏭 Pilot language shifting to volume'],
  noteSub: '2,500/week is an exit rate, not annual cumulative. Keep a zero base case until earnings or filings rhyme, and avoid chasing with leverage on press alone. Over time, humanoids in factories could reshape cost stacks if volumes stick.',
  footer: 'TSLA · Optimus (unverified)',
});

add('robotaxi-hire-21', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '채용 · 21도시',
  title: '로보택시 플릿 지원 감독자(야간)를 21개 도시에서 뽑습니다',
  heroBig: '21',
  heroSub: '야간 교대는 24시간 운행을 전제로 한 인력 신호입니다. 채용 공고는 의도이지 즉시 유료 오픈이 아닙니다.',
  grid: [
    { icon:'🌃', big:'야간', mid:'교대 근무', sub:'24시간 운행 전제' },
    { icon:'🗺', big:'21', mid:'공고 도시 수', sub:'채용 규모 신호' },
    { icon:'🔧', big:'플릿', mid:'현장 지원·감독', sub:'장애·점검 대응' },
    { icon:'🚕', big:'확대', mid:'로보택시 해석', sub:'허가·차량이 따라와야' },
  ],
  ctx1: '공고 도시 ≠ 유료 서비스 도시',
  ctx2: '허가·차량 배치가 따라와야 매출',
  quote: '플릿 지원 감독은 장애 대응·점검·교대를 현장에서 묶는 역할입니다. 도시 수가 늘수록 인건비 총액은 커지지만, 차량이 더 빨리 늘면 대당 비용은 내려갑니다. 21개 도시는 운영 확대 의도로 읽힙니다.',
  noteSub: '벨뷰·샌디에이고·토런스·샌안토니오·댈러스 등이 목록에 보입니다. 월간으로 공고 도시와 실제 지오펜스를 대조하고, 인건비가 남는 구간에서는 완전 무인 마진 가정을 할인하시기 바랍니다. 장기적으로는 인력이 줄고 차량이 늘면 유닛 마진이 개선되는 경로입니다.',
  footer: '테슬라 · 플릿 채용',
}, {
  badge: 'TSLA', breaking: 'HIRING · 21 CITIES',
  title: 'Robotaxi Fleet Support Supervisors (night) across 21 cities',
  heroBig: '21',
  heroSub: 'Night shift implies 24/7 ops intent. A job post is intent, not a paying launch.',
  grid: [
    { icon:'🌃', big:'Night', mid:'Overnight shifts', sub:'24/7 ops premise' },
    { icon:'🗺', big:'21', mid:'Posted cities', sub:'Hiring scale signal' },
    { icon:'🔧', big:'Fleet', mid:'On-site support', sub:'Incidents and checks' },
    { icon:'🚕', big:'Expand', mid:'Robotaxi framing', sub:'Needs permits and cars' },
  ],
  ctx1: 'Posted city ≠ paying service city',
  ctx2: 'Permits and cars must follow',
  quote: 'Fleet support supervisors stitch incidents, inspections, and shifts on the ground. More cities raise headcount dollars—unless vehicles scale faster per city.',
  noteSub: 'Bellevue, San Diego, Torrance, San Antonio, Dallas appear in the board. Contrast postings with live geofences monthly, and haircut full-driverless margin assumptions while labor remains in the stack. Over time, fewer humans per car improves unit margins.',
  footer: 'TSLA · fleet hiring',
});

add('starbase-la-dredge', 'L3', 'SPCX', {
  badge: 'SPCX', title: '루이지애나 인근 운하를 약 16피트로 준설해 스타십 바지선을 준비합니다',
  heroIcon: '🚢', heroBig: '16ft',
  heroSub: '담수 바이유 운하를 깊게 파서 대형 선체(바지선)가 지나가게 하는 작업입니다. 약 1,000억 달러급 거점 서사의 물류 입구입니다.',
  cards: [
    { icon:'🌊', big:'16ft', mid:'목표 회복 수심', sub:'운하 준설 깊이' },
    { icon:'🏗', big:'$100B', mid:'거점 스케일 서사', sub:'당기 집행액은 아님' },
    { icon:'📦', big:'바지선', mid:'텍사스→루이지애나', sub:'대형 선체 해상 수송' },
  ],
  quote: '대형 선체는 도로보다 해상·운하가 효율적입니다. 준설은 발사 사진보다 덜 화려하지만 케이던스의 지상 병목을 푸는 작업입니다. 목표 수심은 약 16피트입니다.',
  noteSub: '환경·허가 지연이 있으면 램프가 밀립니다. 바지선 시험 운항과 수심 측정이 다음 확인 포인트입니다. 1,000억 달러를 당기 집행액으로 오인하지 마시기 바랍니다. 장기적으로 물류가 열리면 발사 빈도를 올릴 여지가 생깁니다.',
  footer: '스페이스X · 루이지애나 준설',
}, {
  badge: 'SPCX', title: 'Canal dredging to ~16 ft near Starbase Louisiana',
  heroIcon: '🚢', heroBig: '16ft',
  heroSub: 'Freshwater Bayou work so Starship barges can pass. Logistics door to a ~$100B-scale site story—not current-year spend.',
  cards: [
    { icon:'🌊', big:'16ft', mid:'Target canal depth', sub:'Dredge recovery goal' },
    { icon:'🏗', big:'$100B', mid:'Site scale story', sub:'Not this year’s spend' },
    { icon:'📦', big:'Barge', mid:'Texas → Louisiana', sub:'Heavy stage by water' },
  ],
  quote: 'Large stages move better by water than by road. Dredging is less photogenic than launches but clears a ground bottleneck for cadence. Target depth is about 16 feet.',
  noteSub: 'Environmental or permit slips delay the ramp. Next checks: trial barge runs and depth surveys. Do not read $100B as current-year spend. Over time, open logistics can raise launch frequency.',
  footer: 'SpaceX · LA dredge',
});

add('berlin-7500-week', 'L1', 'TSLA', {
  badge: 'TSLA', title: '기가 베를린이 10월 중순부터 주당 약 7,500대 모델Y를 목표로 합니다',
  heroIcon: '🏭', heroBig: '7,500',
  heroSub: '특별 교대로 공장 가동 시간을 늘려 주당 약 7,500대 모델Y를 맞추려는 목표입니다. 유럽 공급 상한을 가늠하는 숫자입니다.',
  cards: [
    { icon:'📅', big:'10월', mid:'중순부터 목표', sub:'가동 확대 시점' },
    { icon:'🚗', big:'MY', mid:'주력 차종 모델Y', sub:'유럽 볼륨 차' },
    { icon:'⏱', big:'교대', mid:'특별 근무 확대', sub:'가동 시간 늘리기' },
  ],
  quote: '주당 7,500대는 연환산 약 39만 대 산술(52주)로 읽히지만 휴가·수율로 연간은 낮아질 수 있습니다. 2~3주 평균 실적이 나오기 전에 연간 가이던스를 올리지 마시기 바랍니다.',
  noteSub: '증산이 대기 기간을 줄이면 인도에 도움이 되고, 재고가 쌓이면 할인 압력이 붙을 수 있습니다. 상하이·텍사스 출력과 합산해 글로벌 공급을 보시기 바랍니다. 장기적으로 유럽 생산 능력이 커지면 로컬 공급 리스크가 줄어듭니다.',
  footer: '테슬라 · 기가 베를린',
}, {
  badge: 'TSLA', title: 'Giga Berlin targets ~7,500 Model Y per week from mid-October',
  heroIcon: '🏭', heroBig: '7,500',
  heroSub: 'Special shifts extend runtime toward ~7,500 Model Y per week. A read on Europe’s supply ceiling.',
  cards: [
    { icon:'📅', big:'Mid-Oct', mid:'Target start window', sub:'When volume ramps' },
    { icon:'🚗', big:'MY', mid:'Model Y volume car', sub:'Europe’s main EV' },
    { icon:'⏱', big:'Shifts', mid:'Special overtime', sub:'More plant hours' },
  ],
  quote: '7,500/week annualizes near ~390k on 52 weeks, but holidays and yield cut the year. Do not raise annual guides before a 2–3 week average prints.',
  noteSub: 'If output cuts wait times, deliveries benefit; if inventory stacks, discounts may follow. Add Shanghai and Texas when you size global supply. Over time, more European capacity lowers local supply risk.',
  footer: 'TSLA · Giga Berlin',
});

add('cybercab-ux-rain', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '🌧 악천후 · 거실 UX',
  title: '빗속 사이버캡 승차가 차분했고 5시간 피드백이 정리됐습니다',
  heroIcon: '🌧', heroBig: '차분한 승차',
  heroSub: '핸들·페달 없는 거실형 실내에서 빗속 승차가 차분했다는 후기입니다. 순환·지도·와이퍼·목적지·시트·후방카메라 요청이 5시간 분량으로 모였습니다.',
  cards: [
    { icon:'🛡', big:'악천후', mid:'비 오는 날 체감', sub:'안전하고 차분했다는 평가' },
    { icon:'🛋', big:'거실형', mid:'무핸들 실내 UX', sub:'탑승만 하는 공간' },
    { icon:'📝', big:'5시간', mid:'피드백 목록', sub:'소프트웨어·시트 개선점' },
  ],
  quote: '악천후에서도 재이용 의향이 남으면 연간 가동률이 올라갑니다. 소프트웨어로 고칠 항목(지도·순환·목적지)과 하드웨어(시트)를 나눠 일정을 보시면 됩니다. 사이버캡은 운전석 없는 전용 로보택시입니다.',
  noteSub: '감성 후기는 수요의 질이지 즉시 매출이 아닙니다. OTA(무선 업데이트) 반영 여부와 악천후 운행률을 표로 옮긴 뒤에야 가정을 올리시기 바랍니다. 세차·정비 자동화 이미지도 같은 주 운영 맥락입니다. 장기적으로 편안한 UX는 반복 호출을 늘리는 해자입니다.',
  footer: '테슬라 · 사이버캡 UX',
}, {
  badge: 'TSLA', badgeLine: '🌧 Weather · lounge UX',
  title: 'Calm Cybercab rides in rain plus a five-hour feedback list',
  heroIcon: '🌧', heroBig: 'Calm ride',
  heroSub: 'No-wheel living-room cabin felt calm in rain. Requests span recirculation, map, wipe, destination, seat, and rear cam over about five hours.',
  cards: [
    { icon:'🛡', big:'Weather', mid:'Rain-day feel', sub:'Calm and safe reviews' },
    { icon:'🛋', big:'Lounge', mid:'No-wheel cabin UX', sub:'Passenger-only space' },
    { icon:'📝', big:'5 hrs', mid:'Feedback list', sub:'Software and seat fixes' },
  ],
  quote: 'If riders still rebook in storms, annual utilization rises. Split software fixes (map, air, destination) from hardware (seat) when you schedule. Cybercab is the wheel-free dedicated robotaxi.',
  noteSub: 'Sentiment is demand quality, not instant revenue. Raise assumptions only after OTA notes and foul-weather uptime hit the table. Autowash visuals sit in the same ops week. Over time, comfortable UX is a moat for repeat rides.',
  footer: 'TSLA · Cybercab UX',
});

add('nvda-peace-chips', 'L4', 'NVDA', {
  badge: 'NVDA', badgeLine: '🕊️ 칩 접근권 · 외교',
  title: '엔비디아 칩 접근권이 평화 협상 카드로 쓰였다는 보도입니다',
  heroIcon: '🕊️', heroBig: '외교 카드',
  heroSub: '아르메니아·아제르바이잔 협상 맥락에서 선단 AI 칩 접근권이 지렛대로 거론됐습니다. 파이어버드 인공지능 공장 개막이 같이 보입니다.',
  cards: [
    { icon:'🧠', big:'AI 칩', mid:'접근권 = 협상 지렛대', sub:'수출통제 아래 희소 자원' },
    { icon:'🏭', big:'Firebird', mid:'AI 공장 인프라', sub:'연산 시설 개막 서사' },
    { icon:'🌐', big:'전략재', mid:'외교·안보 지위', sub:'매출 가이던스는 아님' },
  ],
  quote: '수출 통제하에서 선단 연산 접근 자체가 국가 자산이 됐습니다. 매출 가이던스는 아니지만 동맹 수요·라이선스 변동성이라는 옵션과 리스크를 동시에 남깁니다. 칩이 외교 카드로 쓰였다는 보도입니다.',
  noteSub: '외교 헤드라인을 즉시 데이터센터 매출로 환산하지 마시기 바랍니다. 라이선스 승인 사례와 제한 지역 노출을 실적 코멘트에서 확인하고, 전략재 프리미엄과 규제 리스크를 한 쌍으로 관리하시기 바랍니다. 장기적으로 AI 인프라는 국가 경쟁력의 핵심 축으로 남습니다.',
  footer: '엔비디아 · 칩 외교',
}, {
  badge: 'NVDA', badgeLine: '🕊️ Chip access · diplomacy',
  title: 'Reports: Nvidia chip access used in peace diplomacy',
  heroIcon: '🕊️', heroBig: 'Chip leverage',
  heroSub: 'Armenia–Azerbaijan context where leading-edge AI chip access was framed as leverage. Firebird AI Factory opening appears alongside.',
  cards: [
    { icon:'🧠', big:'AI chips', mid:'Access as leverage', sub:'Scarce under export rules' },
    { icon:'🏭', big:'Firebird', mid:'AI factory infra', sub:'Compute site narrative' },
    { icon:'🌐', big:'Strategic', mid:'Security status', sub:'Not a revenue guide' },
  ],
  quote: 'Under export controls, leading-edge compute access is a national asset. Not a guide print—but it adds ally-demand optionality and license volatility together.',
  noteSub: 'Do not convert diplomacy headlines into datacenter revenue overnight. Check license approvals and restricted-region exposure in earnings, and manage strategic premium with regulatory risk as a pair. Over time, AI infrastructure stays a national competitiveness pillar.',
  footer: 'NVDA · chip diplomacy',
});

add('gs-tsla-500', 'L6', 'TSLA', {
  badge: 'TSLA', breaking: '목표가 · $500',
  title: '월가 보고서가 사이버캡을 근거로 목표주가 500달러를 제시했습니다',
  heroBig: '$500',
  heroSub: '애널리스트 의견이며 확정이 아닙니다. 로보택시·사이버캡 가정이 커진 숫자로 읽히며, 허가·이용률이 리스크입니다.',
  grid: [
    { icon:'🎯', big:'$500', mid:'목표주가 의견', sub:'월가 리포트 숫자' },
    { icon:'🚕', big:'캡', mid:'사이버캡이 근거', sub:'로보택시 가정 확대' },
    { icon:'📊', big:'모델', mid:'마일·마진 가정', sub:'할인현금흐름 요약' },
    { icon:'⚠️', big:'리스크', mid:'실행·허가 변수', sub:'이용률이 핵심' },
  ],
  ctx1: '의견 ≠ 자동매매 신호',
  ctx2: '실측 표와 가정 괴리를 월간 점검',
  quote: '목표주가는 할인현금흐름과 시나리오 확률의 요약입니다. 같은 주 요금·생산·허가 뉴스가 있으면 설득력이 커지고, 실행이 늦으면 하향됩니다. 500달러는 사이버캡 가정이 커진 의견입니다.',
  noteSub: '컨센서스 분포를 보고 단일 보고서에 레버리지를 맞추지 마시기 바랍니다. 자동차만의 보수 시나리오 주가를 같이 적어 하방을 관리하시기 바랍니다. 장기적으로 로보택시 실측이 쌓이면 목표가 논쟁은 가정에서 데이터로 이동합니다.',
  footer: '테슬라 · 목표가',
}, {
  badge: 'TSLA', breaking: 'PT · $500',
  title: 'Street report sets $500 Tesla target on Cybercab',
  heroBig: '$500',
  heroSub: 'Analyst opinion with a larger robotaxi/Cybercab weight—not a guarantee. Permits and utilization remain the risk cells.',
  grid: [
    { icon:'🎯', big:'$500', mid:'Price-target opinion', sub:'Street report figure' },
    { icon:'🚕', big:'Cab', mid:'Cybercab thesis', sub:'Larger robotaxi weight' },
    { icon:'📊', big:'Model', mid:'Miles and margin', sub:'DCF summary' },
    { icon:'⚠️', big:'Risk', mid:'Execution and permits', sub:'Utilization is key' },
  ],
  ctx1: 'Opinion ≠ trade signal',
  ctx2: 'Check assumption gaps monthly',
  quote: 'A price target summarizes DCF and scenario odds. Same-week fare, factory, and permit prints raise credibility; slow execution cuts it. $500 embeds a larger Cybercab assumption.',
  noteSub: 'Read the consensus range and avoid sizing leverage to one note. Keep a autos-only bear price beside the bull case for downside control. Over time, robotaxi field data moves the debate from assumptions to prints.',
  footer: 'TSLA · price target',
});

add('nhtsa-l4-cybercab', 'L3', 'TSLA', {
  badge: 'TSLA', title: '당국이 레벨4를 「완전 자동화로 가는 길」로 설명하며 무핸들 그림을 올렸습니다',
  heroIcon: '📋', heroBig: '레벨4',
  heroSub: '레벨4(자율주행 4단계)는 켜지면 시스템이 운전하고 사람은 승객이며, 지정 구역에서만, 사람 운전자가 필요 없습니다. 오늘 소비자 개인 구매 상품은 아니라고 명시합니다.',
  cards: [
    { icon:'🛣', big:'레벨4', mid:'시스템이 운전', sub:'사람은 탑승만' },
    { icon:'🎛', big:'핸들 없음', mid:'당국이 올린 그림', sub:'페달도 없음' },
    { icon:'🚫', big:'개인 비매', mid:'오늘 기준 고지', sub:'플릿·호출 먼저' },
  ],
  quote: '당국이 「완전 자동화로 가는 길」 톤으로 레벨4를 설명하며, 핸들·페달 없는 그림을 올렸습니다. 이는 사이버캡(운전석 없는 전용 로보택시) 설계와 맞닿습니다. 동시에 오늘 소비자가 사서 탈 제품은 아니라고 명시해, 매출은 플릿·호출이 먼저입니다.',
  noteSub: '규제 언어가 차량 형태와 정렬되면 허가 협상 비용이 줄어들 수 있습니다. 지오펜스(지정 운행 구역) 확장이 곧 매출 속도이며, 당국 가이드·조사·리콜을 캘린더에 두시기 바랍니다. SAE 정의와 상용 허가는 별도 칸입니다. 장기적으로는 문서와 실제 운행이 겹칠수록 로보택시 상용 일정이 달력으로 내려옵니다.',
  footer: '테슬라 · 레벨4 규제',
}, {
  badge: 'TSLA', title: 'NHTSA Level 4 explainer matches wheel-free, limited-area ops',
  heroIcon: '📋', heroBig: 'Level 4',
  heroSub: 'Level 4 means the system drives when engaged; humans are passengers only, in a defined area, with no human driver required. Explicitly not a consumer purchase today.',
  cards: [
    { icon:'🛣', big:'Level 4', mid:'System drives', sub:'Humans only ride' },
    { icon:'🎛', big:'No wheel', mid:'Agency graphic', sub:'No pedals either' },
    { icon:'🚫', big:'Not retail', mid:'Banner for today', sub:'Fleet/ridehail first' },
  ],
  quote: 'Regulators framed Level 4 as a path toward full automation and posted a graphic with no steering wheel or pedals—matching Cybercab’s dedicated robotaxi design. The “not for consumer purchase today” banner blocks retail fantasy; fleet and ridehail print first.',
  noteSub: 'When regulator language aligns with vehicle form, permit talks can get cheaper. Geofence growth is revenue velocity—calendar guides, probes, and recalls. SAE definitions and commercial permits stay separate cells. Over time, overlapping documents and live ops move robotaxi dates onto a calendar.',
  footer: 'TSLA · L4 regulation',
});

};
