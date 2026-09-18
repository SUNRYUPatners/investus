// 2026-09-16 SVG topic data — screenshot/news facts, beginner Korean, positive long view
// Layout mix: ROWS×1 L1×6 L2×3 L3×2 L4×3 L5×3 L6×3
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.16 한장 요약',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'52%', title:'폴리마켓에서 테슬라·스페이스X 합병 가능성에 52%가 걸렸습니다',
      sub:'머스크는 두 회사의 협업이 깊다며 합병 질문에 즉답을 피했습니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'9/22', title:'스페이스X가 스타십 14번째 시험비행을 9월 22일로 확정했습니다',
      sub:'처음으로 지구 궤도에 들어가 스타링크 V3 위성 26기를 배치합니다.' },
    { color:'#4ade80', fill:'#061209', right:'60%', title:'테슬라가 FSD 이용자에게 보험료를 최대 60% 깎아주기 시작했습니다',
      sub:'월 175달러였던 보험료가 구독료를 더해도 실질 40달러대로 낮아집니다.' },
    { color:'#4ade80', fill:'#061209', right:'+88%', title:'테슬라 유럽 판매가 한 주 만에 88% 넘게 반등했습니다',
      sub:'다만 분기 누적으로는 아직 지난해보다 낮은 수준입니다.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'5.04%', title:'미국 10년물 국채금리가 2007년 이후 가장 높은 수준까지 올랐습니다',
      sub:'국제유가 상승과 물가 우려가 겹치며 금리를 밀어올렸습니다.' },
    { color:'#94a3b8', fill:'#111827', right:'10분마다', title:'중국이 휴머노이드 로봇을 10분마다 한 대씩 찍어내는 공장을 열었습니다',
      sub:'세계 최초의 대량생산 체제로 알려졌습니다.' },
    { color:'#f97316', fill:'#1a0d02', right:'100만불', title:'초대형 유조선 하루 용선료가 사상 처음 100만 달러를 넘었습니다',
      sub:'해상 운임이 치솟으며 물류 비용 부담이 커지고 있습니다.' },
  ],
  caption: '더 볼 것: 테슬라·스페이스X 합병설 · 스타십 9/22 발사 · FSD 보험할인 · 유럽판매 반등 · 국채금리 5%대 · 중국 로봇공장 · 유조선 운임',
}, {
  headline: '2026.09.16 Daily Snapshot',
  rows: [
    { color:'#4ade80', fill:'#061209', right:'52%', title:'Polymarket puts 52% odds on a Tesla-SpaceX merger by end-2027',
      sub:'Musk dodged a direct answer, citing how closely the two firms already collaborate.' },
    { color:'#c084fc', fill:'#140b1f', right:'Sept 22', title:'SpaceX locked in Sept 22 for Starship\u2019s 14th test flight',
      sub:'The first flight to reach orbit, deploying 26 new Starlink V3 satellites.' },
    { color:'#4ade80', fill:'#061209', right:'60%', title:'Tesla now discounts insurance up to 60% for FSD drivers',
      sub:'A $175/mo premium plus the FSD subscription nets out near $40/mo effectively.' },
    { color:'#4ade80', fill:'#061209', right:'+88%', title:'Tesla\u2019s European weekly sales rebounded more than 88%',
      sub:'Still, the quarter-to-date total remains below last year\u2019s pace.' },
    { color:'#ef4444', fill:'#1a0a0a', right:'5.04%', title:'The US 10-year Treasury yield hit its highest level since 2007',
      sub:'Rising oil prices and inflation worries pushed yields higher.' },
    { color:'#94a3b8', fill:'#111827', right:'every 10min', title:'China opened a factory making a humanoid robot every 10 minutes',
      sub:'Described as the world\u2019s first mass-production line of its kind.' },
    { color:'#f97316', fill:'#1a0d02', right:'$1M/day', title:'Supertanker charter rates topped $1 million a day for the first time',
      sub:'Surging freight costs are adding to global shipping expenses.' },
  ],
  caption: 'Watch: Tesla-SpaceX merger odds · Starship 9/22 · FSD insurance discount · Europe sales rebound · 10Y yield 5%+ · China robot factory · Tanker rates',
});

// 1) L4 — TSLA-SpaceX merger speculation
add('tsla-spcx-merger-speculation', 'L4', 'TSLA', {
  badge: '테슬라·스페이스X', title: '일론 머스크가 테슬라와 스페이스X의 합병 여부를 묻는 질문에 즉답을 피하며 합병설이 다시 떠올랐습니다',
  badgeLine: '"질문 참 좋네요, 이렇게 협업이 많은데 말이죠" — 일론 머스크',
  heroIcon: '\u{1F91D}', heroBig: '합병설 재점화',
  heroSub: '테슬라와 스페이스X를 하나로 합치는 합병설이 다시 떠올랐습니다. 두 회사는 지금 각자 다른 주인이 나눠 가진 별도 회사입니다.',
  cards: [
    { icon:'\u{1F4CA}', big:'52%', mid:'폴리마켓 확률', sub:'2027년 말까지 발표 기준' },
    { icon:'\u{1F399}', big:'"협업이 많죠"', mid:'올인서밋 발언', sub:'합병 여부엔 즉답 피함' },
    { icon:'\u{1F4C9}', big:'143.49달러', mid:'스페이스X 주가', sub:'같은 날 3.15% 하락' },
  ],
  quote: '예측시장 폴리마켓은 머스크가 내년 말까지 두 회사의 합병을 공식 발표할 확률을 52%로 매겼습니다. 머스크는 행사에서 합병 여부를 직접 확인하지는 않았습니다.',
  noteSub: '두 회사는 로켓과 자동차라는 다른 사업이지만 최근 우주 데이터센터·자율주행 등에서 접점이 늘고 있습니다. 실제 합병 신청 서류가 나오는지가 다음 확인 포인트입니다.',
  footer: '테슬라·스페이스X · 합병설',
}, {
  badge: 'TSLA / SPCX', title: 'Elon Musk dodged a direct answer on whether Tesla and SpaceX might merge, reviving merger speculation',
  badgeLine: '"Great question there, with all this collaboration" — Elon Musk',
  heroIcon: '\u{1F91D}', heroBig: 'Merger Talk Returns',
  heroSub: 'Speculation about combining Tesla and SpaceX into one company is back. Today the two remain separately owned businesses.',
  cards: [
    { icon:'\u{1F4CA}', big:'52%', mid:'Polymarket odds', sub:'Merger announced by end-2027' },
    { icon:'\u{1F399}', big:'"So much collaboration"', mid:'All-In Summit remark', sub:'Musk stopped short of confirming' },
    { icon:'\u{1F4C9}', big:'$143.49', mid:'SpaceX share price', sub:'Down 3.15% same day' },
  ],
  quote: 'Prediction market Polymarket puts 52% odds on Musk formally announcing a Tesla-SpaceX merger by the end of next year. Musk didn\u2019t confirm it directly at the summit.',
  noteSub: 'The two firms build different products, but overlap is growing in areas like space-based computing and self-driving. Watch for any actual merger filing next.',
  footer: 'Tesla · SpaceX · Merger Talk',
});

// 2) L3 — Grok texting feature
add('grok-text-while-driving', 'L3', 'TSLA', {
  badge: '테슬라', title: '테슬라 차량에서 그록에게 말로 문자와 전화를 시킬 수 있는 기능이 곧 추가됩니다',
  heroIcon: '\u{1F4AC}', heroBig: '말로 문자 보내기',
  heroSub: '그록(Grok)은 일론 머스크의 인공지능 비서입니다. 모델Y 사용설명서에 운전 중 음성으로 문자·전화를 시키는 기능이 담겼습니다.',
  cards: [
    { icon:'\u{1F4DE}', big:'전화 걸기', mid:'"존에게 전화해줘"', sub:'연락처·번호로 호출' },
    { icon:'\u{1F4E9}', big:'문자 보내기', mid:'"엄마한테 문자해줘"', sub:'음성으로 받아쓰기' },
    { icon:'\u{1F3B5}', big:'미디어·설정', mid:'음악 재생·공조 조절', sub:'좌석열선까지 음성 제어' },
  ],
  quote: '사용설명서에는 그록이 연락처 전화 걸기, 문자 받아쓰기, 미디어 검색, 차량 설정 검색, 냉난방·열선 같은 차량 제어까지 대답할 수 있다고 적혀 있습니다.',
  noteSub: '운전 중 손으로 문자를 치지 않고 말로만 시킬 수 있으면 주의 분산을 줄일 수 있습니다. 실제 출시 시점과 지원 국가가 다음 확인 포인트입니다.',
  footer: '테슬라 · 그록 음성비서',
}, {
  badge: 'TESLA', title: 'Tesla owners will soon be able to ask Grok to text and call hands-free while driving',
  heroIcon: '\u{1F4AC}', heroBig: 'Voice Texting',
  heroSub: 'Grok is Elon Musk\u2019s AI assistant. A Model Y owner\u2019s manual reveals voice-based texting and calling features while driving.',
  cards: [
    { icon:'\u{1F4DE}', big:'Phone calls', mid:'"Call John Doe"', sub:'By contact or number' },
    { icon:'\u{1F4E9}', big:'Text messaging', mid:'"Text Mom I\u2019m on my way"', sub:'Dictate messages by voice' },
    { icon:'\u{1F3B5}', big:'Media & settings', mid:'Play music, adjust climate', sub:'Even seat heating by voice' },
  ],
  quote: 'The manual says Grok can make calls, dictate texts, search media, search vehicle settings, and adjust climate and seat heating \u2014 all by voice.',
  noteSub: 'Hands-free texting could reduce distraction during driving. Watch for the official rollout date and which regions get it first.',
  footer: 'Tesla · Grok Voice Assistant',
});

// 3) L6 — China humanoid robot factory
add('china-humanoid-robot-factory', 'L6', 'MACRO', {
  badge: 'BREAKING', breaking: '10분마다 로봇 1대',
  title: '중국이 휴머노이드 로봇을 10분마다 한 대씩 찍어내는 세계 최초 양산 공장을 공식 열었습니다',
  heroBig: '10분 = 1대',
  heroSub: '휴머노이드(사람 모양) 로봇을 자동차처럼 컨베이어벨트에서 대량생산하는 공장입니다. 지금까지는 대부분 수작업 조립이었습니다.',
  grid: [
    { icon:'\u{1F916}', big:'양산 1호', mid:'세계 최초', sub:'컨베이어벨트 조립' },
    { icon:'\u23F1', big:'10분', mid:'대당 생산 시간', sub:'자동차 공정과 비슷한 속도' },
    { icon:'\u{1F3ED}', big:'컨베이어', mid:'자동화 라인', sub:'수작업 조립 탈피' },
    { icon:'\u{1F30F}', big:'가격 경쟁', mid:'다음 관전 포인트', sub:'대당 원가 얼마나 낮아지나' },
  ],
  ctx1: '지금까지 휴머노이드 로봇은 대부분 소수의 숙련공이 손으로 조립해 대당 가격이 비쌌습니다.',
  ctx2: '컨베이어벨트 방식이 자리 잡으면 자동차처럼 대량생산 단가가 빠르게 낮아질 수 있습니다.',
  quote: '휴머노이드 로봇은 팔다리와 손이 있어 사람이 쓰던 공간·도구를 그대로 쓸 수 있는 로봇입니다. 테슬라 옵티머스 등 다른 회사들도 같은 시장을 노리고 있습니다.',
  noteSub: '생산 속도가 빨라지면 로봇 가격이 내려가 공장·물류 현장에 더 빨리 퍼질 수 있습니다. 실제 판매량과 해외 수출 여부가 다음에 볼 지표입니다.',
  footer: '휴머노이드 로봇 · 중국 양산',
}, {
  badge: 'BREAKING', breaking: 'A ROBOT EVERY 10 MIN',
  title: 'China officially opened what it calls the world\u2019s first mass-production plant making a humanoid robot every 10 minutes',
  heroBig: '10 min = 1 unit',
  heroSub: 'The factory builds humanoid (human-shaped) robots on a conveyor belt, like a car assembly line, instead of mostly manual assembly.',
  grid: [
    { icon:'\u{1F916}', big:'First of its kind', mid:'World-first claim', sub:'Conveyor-belt assembly' },
    { icon:'\u23F1', big:'10 minutes', mid:'Per-unit build time', sub:'Comparable to auto plants' },
    { icon:'\u{1F3ED}', big:'Automated line', mid:'Assembly automation', sub:'Moving beyond hand assembly' },
    { icon:'\u{1F30F}', big:'Cost race', mid:'Next thing to watch', sub:'How low per-unit cost falls' },
  ],
  ctx1: 'Until now, most humanoid robots were hand-assembled by small skilled teams, keeping unit costs high.',
  ctx2: 'A true conveyor-belt process could drive costs down quickly, the way it did for cars.',
  quote: 'Humanoid robots have arms, legs and hands so they can use spaces and tools built for humans. Tesla\u2019s Optimus and others are chasing the same market.',
  noteSub: 'Faster production could push robot prices down and speed adoption in factories and warehouses. Watch actual unit sales and export orders next.',
  footer: 'Humanoid Robots · China Scale-Up',
});

// 4) L6 — Cybercab US expansion
add('cybercab-us-expansion', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: '사이버캡 신규 도시',
  title: '테슬라 사이버캡이 피츠버그에 18대 등장하는 등 미국 여러 도시로 눈에 띄게 퍼지고 있습니다',
  heroBig: '피츠버그 18대',
  heroSub: '펜실베이니아주 피츠버그에서 처음으로 사이버캡 18대가 한꺼번에 목격됐습니다. 사계절이 뚜렷한 지역에서의 첫 등장이라는 의미가 있습니다.',
  grid: [
    { icon:'\u{1F3D9}', big:'18대', mid:'피츠버그', sub:'첫 대규모 목격' },
    { icon:'\u{1F5FD}', big:'올버니·유타', mid:'신규 목격 지역', sub:'파사데나·롱비치도 포함' },
    { icon:'\u{1F6E3}', big:'하이랜드빌리지', mid:'댈러스 인근', sub:'차로 약 30분 거리' },
    { icon:'\u{1F4CD}', big:'확장 속도', mid:'매주 새 도시', sub:'목격 지역이 계속 늘어남' },
  ],
  ctx1: '피츠버그는 눈·비 등 사계절 날씨가 뚜렷한 지역이라 자율주행 검증에 의미 있는 곳으로 꼽힙니다.',
  ctx2: '같은 주에 올버니(뉴욕)·유타·캘리포니아 파사데나·롱비치에서도 신규 목격이 이어졌습니다.',
  quote: '사이버캡은 운전대와 페달이 없는 전용 로보택시 차량입니다. 도시마다 안전요원 탑승 여부와 서비스 개시 시점이 다릅니다.',
  noteSub: '목격 도시가 늘어난다고 바로 유료 서비스가 시작되는 것은 아닙니다. 다음에는 이 도시들에서 실제 승차 서비스가 언제 열리는지 확인하면 됩니다.',
  footer: '테슬라 · 사이버캡 확장',
}, {
  badge: 'BREAKING', breaking: 'CYBERCAB NEW CITIES',
  title: 'Tesla\u2019s Cybercab is visibly spreading to more US cities, with 18 units spotted at once in Pittsburgh',
  heroBig: 'Pittsburgh: 18',
  heroSub: 'Eighteen Cybercabs were spotted together in Pittsburgh, Pennsylvania for the first time \u2014 notable as a four-season climate city.',
  grid: [
    { icon:'\u{1F3D9}', big:'18 units', mid:'Pittsburgh, PA', sub:'First large sighting' },
    { icon:'\u{1F5FD}', big:'Albany & Utah', mid:'New sighting areas', sub:'Pasadena, Long Beach too' },
    { icon:'\u{1F6E3}', big:'Highland Village', mid:'Near Dallas', sub:'About 30 min away' },
    { icon:'\u{1F4CD}', big:'Expansion pace', mid:'New cities weekly', sub:'Sighting list keeps growing' },
  ],
  ctx1: 'Pittsburgh sees all four seasons, making it a meaningful spot for testing self-driving in varied weather.',
  ctx2: 'The same week brought new sightings in Albany NY, Utah, Pasadena CA and Long Beach CA.',
  quote: 'Cybercab is a purpose-built robotaxi with no steering wheel or pedals. Whether a safety monitor rides along and when paid service starts differ by city.',
  noteSub: 'More sightings don\u2019t mean paid service starts right away. Watch when these cities actually open rides to the public next.',
  footer: 'Tesla · Cybercab Expansion',
});

// 5) L4 — Jensen Huang / Musk Terafab comment
add('jensen-terafab-musk-comment', 'L4', 'NVDA', {
  badge: '엔비디아', title: '엔비디아 CEO 젠슨 황이 일론 머스크의 초대형 반도체 구상 테라팹을 두고 그가 하면 해낼 것이라고 말했습니다',
  badgeLine: '"할 수 있는 사람이 있다면 머스크다" — 젠슨 황',
  heroIcon: '\u2708', heroBig: '테라팹 응원',
  heroSub: '테라팹은 일론 머스크가 구상 중인 초대형 반도체·데이터센터 프로젝트로 알려져 있습니다. 엔비디아 CEO가 이 구상을 공개 지지했습니다.',
  cards: [
    { icon:'\u2708', big:'같은 비행기', mid:'장시간 대화', sub:'젠슨 황·머스크 동승' },
    { icon:'\u{1F4AA}', big:'"막을 수 없다"', mid:'머스크 실행력 평가', sub:'젠슨 황의 발언' },
    { icon:'\u{1F91D}', big:'엔비디아·테슬라', mid:'협력 가능성', sub:'구체 계약은 미확정' },
  ],
  quote: '"할 수 있는 사람이 있다면 그건 머스크다. 우리는 비행기에서 오랫동안 이 얘기를 나눴다. 그가 뭔가 하기로 결심하면 막기 어렵다. 그게 그의 초능력 중 하나다."',
  noteSub: '테라팹은 아직 공식 부지·규모가 확정되지 않은 구상 단계입니다. 실제 착공이나 엔비디아와의 공급 계약이 나오는지가 다음 확인 포인트입니다.',
  footer: '엔비디아 · 머스크 테라팹',
}, {
  badge: 'NVIDIA', title: 'Nvidia CEO Jensen Huang said if anyone could pull off Elon Musk\u2019s giant Terafab chip project, it\u2019s Musk',
  badgeLine: '"If anybody could do it, he can" — Jensen Huang',
  heroIcon: '\u2708', heroBig: 'Terafab Endorsed',
  heroSub: 'Terafab is reportedly Elon Musk\u2019s vision for a massive chip and data-center project. Nvidia\u2019s CEO publicly backed the idea.',
  cards: [
    { icon:'\u2708', big:'Same flight', mid:'Long conversation', sub:'Huang and Musk together' },
    { icon:'\u{1F4AA}', big:'"Hard to stop"', mid:'On Musk\u2019s execution', sub:'Huang\u2019s comment' },
    { icon:'\u{1F91D}', big:'Nvidia x Tesla', mid:'Possible cooperation', sub:'No formal deal confirmed yet' },
  ],
  quote: '"If anybody could do it, he can. We were on a flight together and spent a lot of time talking about it. Once he decides to do something, it\u2019s hard to stop him \u2014 that\u2019s one of his superpowers."',
  noteSub: 'Terafab has no confirmed site or scale yet. Watch for an actual groundbreaking or a supply deal with Nvidia next.',
  footer: 'Nvidia · Musk\u2019s Terafab',
});

// 6) L1 — Jensen Huang AI safety + open models
add('jensen-ai-safety-open-models', 'L1', 'NVDA', {
  badge: '엔비디아', title: '엔비디아 CEO가 세일즈포스 행사에서 AI에 새 규제가 필요 없다고 말하며 오픈모델 확산 통계를 공개했습니다',
  heroIcon: '\u{1F5A5}', heroBig: '80%',
  heroSub: '최근 벤처 투자를 받은 AI 스타트업 가운데 오픈모델(공개된 AI모델)을 쓰는 곳의 비율입니다.',
  cards: [
    { icon:'\u{1F4CA}', big:'80%', mid:'오픈모델 채택', sub:'최근 투자받은 AI 스타트업 기준' },
    { icon:'\u{1F6E1}', big:'"새 규제 불필요"', mid:'AI 안전 관련 발언', sub:'세일즈포스 행사에서' },
    { icon:'\u23F1', big:'"준비되면 출시"', mid:'속도 조절 반대', sub:'회사 스스로 페이스 조절 권고' },
  ],
  quote: '"AI 안전을 위해 새 법이나 규제가 필요하지 않다. 회사들은 시장이 받아들일 준비가 될 때까지 스스로 출시 속도를 조절해야 한다."',
  noteSub: '오픈모델은 누구나 내려받아 쓸 수 있게 공개된 AI 모델을 뜻합니다. 80%라는 채택률은 폐쇄형 모델보다 오픈모델 생태계가 커지고 있다는 신호입니다.',
  footer: '엔비디아 · AI 정책 발언',
}, {
  badge: 'NVIDIA', title: "Nvidia's CEO said AI doesn't need new regulations at a Salesforce event, and cited a stat on open-model adoption",
  heroIcon: '\u{1F5A5}', heroBig: '80%',
  heroSub: 'The share of recently venture-funded AI startups using open models, according to Huang.',
  cards: [
    { icon:'\u{1F4CA}', big:'80%', mid:'Open-model adoption', sub:'Among recently funded AI startups' },
    { icon:'\u{1F6E1}', big:'"No new laws needed"', mid:'On AI safety', sub:'Said at the Salesforce event' },
    { icon:'\u23F1', big:'"Ship when ready"', mid:'Against forced slowdowns', sub:'Says firms should pace themselves' },
  ],
  quote: '"We do not need new laws or regulations for AI safety. Companies should pace themselves until they are confident they are releasing something the market would appreciate."',
  noteSub: 'Open models are AI models anyone can download and use. An 80% adoption rate signals the open ecosystem is outgrowing closed alternatives.',
  footer: 'Nvidia · AI Policy Remarks',
});

// 7) L1 — AI token usage forecast 4 quintillion
add('ai-token-usage-4-quintillion', 'L1', 'AI', {
  badge: 'AI', title: '2030년까지 AI가 처리하는 토큰량이 연간 4경 개까지 늘어날 것이라는 전망이 나왔습니다',
  heroIcon: '\u{1F4C8}', heroBig: '4경 개',
  heroSub: '토큰은 AI가 글을 읽고 쓸 때 나누는 단어 조각의 최소 단위입니다. 리서치업체 에버코어의 2030년 연간 토큰 사용량 전망치입니다.',
  cards: [
    { icon:'\u{1F916}', big:'에이전틱 AI', mid:'급증 주요 원인', sub:'스스로 여러 단계를 처리하는 AI' },
    { icon:'\u{1F4BB}', big:'MSFT·AMZN', mid:'클라우드 인프라', sub:'토큰 처리량 대부분 담당' },
    { icon:'\u26A1', big:'NVDA·GOOGL', mid:'칩·모델 공급', sub:'수요 증가의 직접 수혜' },
  ],
  quote: '에이전틱 AI는 질문 하나에 답하는 데 그치지 않고 검색·계산·실행까지 스스로 여러 단계를 밟는 AI입니다. 단계가 늘수록 처리하는 토큰 수도 함께 늘어납니다.',
  noteSub: '토큰 사용량이 늘어난다는 것은 그만큼 컴퓨팅 수요(그래픽칩·데이터센터)가 커진다는 뜻입니다. 실제 분기별 사용량이 이 전망치 궤적을 따라가는지가 다음 확인 포인트입니다.',
  footer: 'AI · 토큰 사용량 전망',
}, {
  badge: 'AI', title: 'Annual AI token usage is forecast to reach 4 quintillion by 2030',
  heroIcon: '\u{1F4C8}', heroBig: '4 Quintillion',
  heroSub: 'A token is the smallest unit of text an AI model reads or writes. This is Evercore\u2019s 2030 annual usage forecast.',
  cards: [
    { icon:'\u{1F916}', big:'Agentic AI', mid:'Main growth driver', sub:'AI that runs multi-step tasks' },
    { icon:'\u{1F4BB}', big:'MSFT & AMZN', mid:'Cloud infrastructure', sub:'Handle most of the processing' },
    { icon:'\u26A1', big:'NVDA & GOOGL', mid:'Chips & models', sub:'Direct beneficiaries of demand' },
  ],
  quote: 'Agentic AI doesn\u2019t just answer one question \u2014 it searches, calculates and executes multiple steps on its own, using far more tokens per task.',
  noteSub: 'Rising token usage means rising compute demand for chips and data centers. Watch whether actual quarterly usage tracks this forecast path.',
  footer: 'AI · Token Usage Forecast',
});

// 8) L5 — UBS raises Palantir PT
add('ubs-palantir-pt-250', 'L5', 'PLTR', {
  badge: '팔란티어', title: 'UBS가 팔란티어 목표주가를 220달러에서 250달러로 올리며 매수 의견을 유지했습니다',
  heroIcon: '\u{1F3AF}', heroBig: '목표가 상향',
  heroSub: '데이터 분석 회사 팔란티어(PLTR)에 대한 UBS의 목표주가 조정 소식입니다. 매수(Buy) 투자의견은 그대로 유지됐습니다.',
  before: { label:'기존 목표가', big:'220달러', sub:'UBS 이전 추정치' },
  after: { label:'새 목표가', big:'250달러', sub:'약 14% 상향' },
  cards: [
    { icon:'\u2705', big:'매수 유지', mid:'투자의견', sub:'상향 조정에도 등급은 그대로' },
    { icon:'\u{1F3E2}', big:'UBS', mid:'글로벌 투자은행', sub:'스위스계 대형 증권사' },
    { icon:'\u{1F4C8}', big:'+14%', mid:'목표가 상승폭', sub:'220 → 250달러' },
  ],
  quote: 'UBS는 팔란티어의 정부·기업용 데이터 분석 수요가 계속 견조하다고 보고 목표주가를 올렸습니다.',
  noteSub: '목표주가는 증권사가 앞으로 1년 안팎을 두고 예상하는 적정 주가입니다. 다음 분기 실적에서 실제 매출 성장률이 이 눈높이를 뒷받침하는지 지켜보면 됩니다.',
  footer: '팔란티어 · 목표주가 상향',
}, {
  badge: 'PLTR', title: "UBS raised Palantir's price target from $220 to $250 while maintaining its Buy rating",
  heroIcon: '\u{1F3AF}', heroBig: 'PT Raised',
  heroSub: "UBS adjusted its price target for data analytics firm Palantir (PLTR), keeping its Buy rating unchanged.",
  before: { label:'Prior target', big:'$220', sub:'UBS\u2019s earlier estimate' },
  after: { label:'New target', big:'$250', sub:'About 14% higher' },
  cards: [
    { icon:'\u2705', big:'Buy maintained', mid:'Rating', sub:'Unchanged despite the hike' },
    { icon:'\u{1F3E2}', big:'UBS', mid:'Global investment bank', sub:'Swiss-based major brokerage' },
    { icon:'\u{1F4C8}', big:'+14%', mid:'Target increase', sub:'$220 to $250' },
  ],
  quote: 'UBS raised the target citing steady demand for Palantir\u2019s government and enterprise data analytics work.',
  noteSub: 'A price target is a broker\u2019s estimate of fair value roughly a year out. Watch whether next quarter\u2019s revenue growth supports this higher bar.',
  footer: 'Palantir · Price Target Hike',
});

// 9) L6 — Starship Flight 14 launch date / orbital plan / heat shield
add('starship-flight14-launch', 'L6', 'SPCX', {
  badge: 'BREAKING', breaking: '스타십 14차 비행 9/22',
  title: '스페이스X가 스타십 14번째 시험비행을 9월 22일로 확정했습니다. 처음으로 지구 궤도에 들어갑니다',
  heroBig: '9월 22일',
  heroSub: '발사 시각은 미국 동부 기준 오전 8시 15분(한국시간 밤 9시 15분)입니다. 고도 약 275km에서 6바퀴를 돌고 약 10시간 뒤 태평양에 착수합니다.',
  grid: [
    { icon:'\u{1F680}', big:'275km', mid:'궤도 고도', sub:'첫 지구 궤도 진입' },
    { icon:'\u{1F504}', big:'6바퀴', mid:'궤도 회전 수', sub:'약 10시간 비행' },
    { icon:'\u{1F6E1}', big:'열차폐 개선', mid:'타일 재설계', sub:'40호기 타일 41호기 재사용' },
    { icon:'\u{1F4CD}', big:'멕시코만', mid:'부스터 착륙 목표', sub:'해상 착륙 지점' },
  ],
  ctx1: '이번 비행에서는 재진입 시 뜨거워지는 부위의 타일 고정 방식과 곡면 설계를 새로 바꿔 신뢰성을 높였습니다.',
  ctx2: '13번째 비행에서 회수한 타일 일부를 41호기에 그대로 재사용해, 부품을 재활용하는 실험도 함께 진행합니다.',
  quote: '궤도 진입 뒤에는 이르면 조기 이탈, 늦으면 예정된 경로로 대기권에 재진입합니다. 재진입 지점은 인도양과 태평양 두 곳으로 나뉘어 있습니다.',
  noteSub: '이번이 스타십의 첫 지구 궤도 비행입니다. 발사·궤도 진입·재진입이 모두 계획대로 되는지가 다음 확인 포인트이며, 성공하면 이후 비행부터는 로켓 회수까지 시도할 계획입니다.',
  footer: '스페이스X · 스타십 14차 비행',
}, {
  badge: 'BREAKING', breaking: 'STARSHIP FLIGHT 14: SEPT 22',
  title: "SpaceX locked in Sept 22 for Starship's 14th test flight, its first to reach orbit",
  heroBig: 'Sept 22',
  heroSub: "Launch is set for 8:15 AM ET. The vehicle will orbit at roughly 275km for about 6 orbits before splashing down in the Pacific after ~10 hours.",
  grid: [
    { icon:'\u{1F680}', big:'275km', mid:'Orbital altitude', sub:'First true orbital flight' },
    { icon:'\u{1F504}', big:'6 orbits', mid:'Around Earth', sub:'About a 10-hour mission' },
    { icon:'\u{1F6E1}', big:'Heat shield upgrade', mid:'Redesigned tiles', sub:'Ship 40 tiles reflown on Ship 41' },
    { icon:'\u{1F4CD}', big:'Gulf of America', mid:'Booster landing target', sub:'Offshore landing point' },
  ],
  ctx1: 'This flight tests new tile-retention hardware and curved tile designs in the hottest reentry zones for better reliability.',
  ctx2: 'Some heat shield tiles recovered from Flight 13 are being reflown on Ship 41 \u2014 the first reuse of flown Starship tiles.',
  quote: 'After orbit, the ship can either deorbit early at set checkpoints or continue to a planned reentry, with splashdown zones over the Indian and Pacific Oceans.',
  noteSub: 'This is Starship\u2019s first true orbital flight. Watch whether launch, orbit and reentry all go as planned \u2014 success would set up recovery attempts on future flights.',
  footer: 'SpaceX · Starship Flight 14',
});

// 10) L2 — Starlink V3 10x capacity on Flight 14
add('starlink-v3-flight14-capacity', 'L2', 'SPCX', {
  badge: '스페이스X', title: '스타십 14차 비행에서 처음 배치되는 스타링크 V3 위성이 기존보다 10배 많은 용량을 실어 나릅니다',
  heroIcon: '\u{1F6F0}', heroBig: '10배 용량',
  heroSub: '위성 1기당 1테라비피에스(Tbps)를 더하는 스타링크 V3가 이번에 26기 배치되면, 이번 한 번의 발사로만 26Tbps가 늘어납니다.',
  cards: [
    { label:'V1.5', big:'기본형', mid:'초기 세대', sub:'가장 작은 용량' },
    { label:'V2 미니', big:'팰컨9용', mid:'기존 주력', sub:'V3의 약 10분의 1 용량' },
    { label:'V3', big:'26Tbps', mid:'이번 발사분', sub:'26기 × 1Tbps' },
  ],
  detailHead: '배치 이후 절차',
  detailLines: [
    '위성들이 분리 뒤 안테나·태양전지판을 펼치고 전파·레이저로 지상·다른 위성과 첫 교신을 합니다.',
    '자체 추진기로 궤도를 서서히 끌어올리며, 궤도 점검을 마치면 몇 주 안에 실제 서비스를 시작합니다.',
    '이 가운데 3기는 카메라를 달아 스타십 열차폐 상태를 촬영해 지상으로 전송하는 임무도 함께 맡습니다.',
  ],
  noteSub: '테라비피에스(Tbps)는 초당 전송할 수 있는 데이터 용량의 단위입니다. 위성 1기의 용량이 10배로 늘면 같은 발사 횟수로 훨씬 많은 인터넷 이용자를 감당할 수 있습니다.',
  footer: '스페이스X · 스타링크 V3',
}, {
  badge: 'SPACEX', title: 'Starlink V3 satellites, debuting on Starship Flight 14, carry 10x the capacity of the previous generation',
  heroIcon: '\u{1F6F0}', heroBig: '10x Capacity',
  heroSub: 'Each Starlink V3 satellite adds 1 Tbps of capacity; with 26 deployed on this flight, the mission alone adds 26 Tbps.',
  cards: [
    { label:'V1.5', big:'Base model', mid:'Early generation', sub:'Smallest capacity' },
    { label:'V2 Mini', big:'Falcon 9', mid:'Current workhorse', sub:'~1/10th V3\u2019s capacity' },
    { label:'V3', big:'26 Tbps', mid:'This launch', sub:'26 sats x 1 Tbps each' },
  ],
  detailHead: 'What happens after deployment',
  detailLines: [
    'Satellites unfold their antennas and solar arrays, then make first contact via radio and laser links.',
    'They raise their own orbits with onboard thrusters and begin serving customers within a few weeks of checkout.',
    'Three satellites carry cameras to image Starship\u2019s heat shield and beam that data back to engineers.',
  ],
  noteSub: 'Tbps (terabits per second) measures how much data can move per second. A 10x jump per satellite means far more internet capacity per launch.',
  footer: 'SpaceX · Starlink V3',
});

// 11) L4 — SpaceX AI compute demand (Shotwell)
add('spacex-ai-compute-demand', 'L4', 'SPCX', {
  badge: '스페이스X', title: '스페이스X 사장 궤인 숏웰이 AI 컴퓨팅 수요가 매우 강하다며 조만간 관련 발표를 예고했습니다',
  badgeLine: '"컴퓨팅 임대는 정말 좋은 사업이다" — 궤인 숏웰 사장',
  heroIcon: '\u{1F5A5}', heroBig: 'AI 컴퓨팅 수요',
  heroSub: '스페이스X 사장 궤인 숏웰이 인공지능 연산(컴퓨팅) 수요가 매우 강하다고 말하며 조만간 새 발표가 있을 것이라고 예고했습니다.',
  cards: [
    { icon:'\u{1F4AC}', big:'"수요 전혀 안 줄어"', mid:'숏웰 발언', sub:'컴퓨팅 임대 사업 관련' },
    { icon:'\u{1F4E2}', big:'"조만간 발표"', mid:'구체 계획 예고', sub:'세부 내용은 아직 미공개' },
    { icon:'\u{1F6F0}', big:'스타링크·궤도', mid:'연계 가능 사업', sub:'우주 데이터센터 구상과 맞물림' },
  ],
  quote: '"컴퓨팅 임대는 정말 좋은 사업이다. 수요가 전혀 줄어들지 않는 것을 보고 있다. 조만간 관련 발표를 하게 될 것 같다."',
  noteSub: '스페이스X는 최근 우주 궤도에 데이터센터를 올리는 구상을 여러 차례 언급해왔습니다. 실제 어떤 사업으로 구체화되는지가 다음 확인 포인트입니다.',
  footer: '스페이스X · AI 컴퓨팅 사업',
}, {
  badge: 'SPACEX', title: 'SpaceX President Gwynne Shotwell said AI compute demand remains extremely strong and hinted at an upcoming announcement',
  badgeLine: '"Compute rental is a heck of a business" — President Gwynne Shotwell',
  heroIcon: '\u{1F5A5}', heroBig: 'AI Compute Demand',
  heroSub: 'SpaceX President Gwynne Shotwell said demand for AI compute remains extremely strong and hinted at an upcoming announcement.',
  cards: [
    { icon:'\u{1F4AC}', big:'"No drop in demand"', mid:'Shotwell\u2019s comment', sub:'On the compute rental business' },
    { icon:'\u{1F4E2}', big:'"Announcement soon"', mid:'Plans teased', sub:'Details not yet disclosed' },
    { icon:'\u{1F6F0}', big:'Starlink & orbit', mid:'Possible tie-in', sub:'Fits space-datacenter ambitions' },
  ],
  quote: '"Compute rental is a heck of a business. We see no drop in demand at all. I think we\u2019ll probably do some announcement quickly."',
  noteSub: 'SpaceX has repeatedly floated the idea of orbital data centers. Watch what concrete business this turns into next.',
  footer: 'SpaceX · AI Compute Business',
});

// 12) L5 — Tesla Europe weekly sales rebound
add('tesla-europe-sales-rebound', 'L5', 'TSLA', {
  badge: '테슬라', title: '테슬라의 유럽 주간 판매가 88% 넘게 반등했지만 분기 누적으로는 여전히 지난해보다 낮습니다',
  heroIcon: '\u{1F1EA}\u{1F1FA}', heroBig: '6,400대',
  heroSub: '9월 7일부터 13일까지 한 주간 유럽 10개국에서 집계된 테슬라 판매량입니다. 전주 대비로는 크게 늘었지만 분기 전체로 보면 아직 회복 전입니다.',
  before: { label:'분기 누적(QTD)', big:'-26.0%', sub:'전분기 대비 여전히 감소' },
  after: { label:'주간 반등', big:'+88.2%', sub:'전주 대비 판매량 급증' },
  cards: [
    { icon:'\u{1F4C8}', big:'+45.6%', mid:'작년 동주 대비', sub:'1년 전 같은 주보다 증가' },
    { icon:'\u{1F4C5}', big:'+9.6%', mid:'연초 대비(YTD)', sub:'올해 누적 판매는 여전히 플러스' },
    { icon:'\u{1F30D}', big:'10개국', mid:'집계 대상', sub:'유럽 판매의 약 60% 커버' },
  ],
  quote: '집계 대상 10개국은 영국·노르웨이·네덜란드·스웨덴·덴마크·이탈리아·스페인·스위스·체코·아이슬란드로, 유럽 전체 테슬라 판매의 약 60%를 차지합니다.',
  noteSub: '한 주간의 반등이 분기 말까지 이어져야 분기 전체 감소폭이 줄어듭니다. 다음 주간·월간 집계에서 이 회복세가 계속되는지가 핵심 확인 포인트입니다.',
  footer: '테슬라 · 유럽 판매 동향',
}, {
  badge: 'TESLA', title: "Tesla's European weekly sales rebounded more than 88%, though the quarter-to-date total is still below last year",
  heroIcon: '\u{1F1EA}\u{1F1FA}', heroBig: '6.4K units',
  heroSub: "Tesla's reported sales across 10 European countries for the week of Sept 7-13. The weekly jump is sharp, but the quarter overall hasn't recovered yet.",
  before: { label:'Quarter-to-date', big:'-26.0%', sub:'Still down vs. prior quarter' },
  after: { label:'Weekly rebound', big:'+88.2%', sub:'Sharp jump vs. prior week' },
  cards: [
    { icon:'\u{1F4C8}', big:'+45.6%', mid:'Vs. same week last year', sub:'Up year over year' },
    { icon:'\u{1F4C5}', big:'+9.6%', mid:'Year-to-date', sub:'Still positive for the year so far' },
    { icon:'\u{1F30D}', big:'10 countries', mid:'Coverage', sub:'~60% of European Tesla sales' },
  ],
  quote: 'The 10 tracked countries \u2014 UK, Norway, Netherlands, Sweden, Denmark, Italy, Spain, Switzerland, Czechia, Iceland \u2014 represent about 60% of Tesla\u2019s European sales.',
  noteSub: 'A single-week rebound needs to hold through quarter-end to narrow the overall decline. Watch the next weekly and monthly readings for whether this continues.',
  footer: 'Tesla · Europe Sales Trend',
});

// 13) L2 — Tesla Semi Europe Hannover + megacharger
add('tesla-semi-europe-hannover', 'L2', 'TSLA', {
  badge: '테슬라', title: '테슬라 세미 트럭이 하노버 IAA 상용차 박람회에서 유럽 확장 계획과 메가차저 네트워크를 공개했습니다',
  heroIcon: '\u{1F69B}', heroBig: '1,900만km',
  heroSub: '테슬라 세미 트럭이 고객사 운행으로 지금까지 누적 1,900만km(약 1,180만 마일)를 달렸다고 밝혔습니다.',
  cards: [
    { label:'누적 주행', big:'1,900만km', mid:'고객 운행분', sub:'파일럿 40만km 별도' },
    { label:'충전망', big:'100기 이상', mid:'메가차저', sub:'독일·프랑스·영국 등 6개국' },
    { label:'생산능력', big:'주 1,000대', mid:'설계 목표', sub:'북미·유럽 초기 수요 대응' },
  ],
  detailHead: '유럽 확장 핵심 내용',
  detailLines: [
    '충전은 30분에 배터리 60%를 채우는 초고속 방식으로, 출력은 1.2메가와트급입니다.',
    '독일·프랑스·영국·스웨덴·네덜란드·벨기에 등 6개국에 우선 설치를 시작합니다.',
    '담당 임원은 "공격적인 증설 계획이 있다"며 북미·유럽 초기 수요에 맞춘 생산 목표를 제시했습니다.',
  ],
  noteSub: '메가차저는 일반 승용차 슈퍼차저보다 훨씬 큰 전력으로 대형 트럭을 빠르게 충전하는 전용 설비입니다. 실제 물류회사와의 초기 고객 계약이 나오는지가 다음 확인 포인트입니다.',
  footer: '테슬라 · 세미 유럽 확장',
}, {
  badge: 'TESLA', title: 'Tesla Semi outlined its European expansion and Megacharger network at the Hannover IAA commercial vehicle show',
  heroIcon: '\u{1F69B}', heroBig: '19M km',
  heroSub: 'Tesla says customer-run Semi trucks have logged 19 million km (about 11.8 million miles) to date.',
  cards: [
    { label:'Miles driven', big:'19M km', mid:'Customer fleet', sub:'Plus 400k km in pilot runs' },
    { label:'Charging network', big:'100+', mid:'Megachargers', sub:'Germany, France, UK & more' },
    { label:'Capacity', big:'1,000/week', mid:'Design target', sub:'For early NA & EU demand' },
  ],
  detailHead: 'Key points from the Europe rollout',
  detailLines: [
    'Ultra-fast charging adds 60% range in 30 minutes at roughly 1.2 megawatts of power.',
    'Initial rollout covers Germany, France, UK, Sweden, Netherlands and Belgium.',
    'Tesla\u2019s Semi program lead said the company has \u201ca plan for an aggressive ramp\u201d to meet early demand.',
  ],
  noteSub: 'Megachargers deliver far more power than a car Supercharger to fast-charge heavy trucks. Watch for confirmed logistics-company customer contracts next.',
  footer: 'Tesla · Semi Europe Rollout',
});

// 14) L5 — Tesla FSD insurance discount
add('tesla-fsd-insurance-discount', 'L5', 'TSLA', {
  badge: '테슬라', title: '테슬라가 FSD 이용자에게 보험료를 최대 60% 깎아주는 견적을 주문 페이지에 바로 보여주기 시작했습니다',
  heroIcon: '\u{1F6E1}', heroBig: '월 최대 60달러 절약',
  heroSub: '테슬라 보험이 있는 미국 일부 주에서, 완전자율주행(FSD) 사용 여부에 따른 보험료 견적을 차량 주문 화면에서 바로 보여줍니다.',
  before: { label:'FSD 없이', big:'월 235달러', sub:'2026년형 모델Y AWD 기준' },
  after: { label:'FSD 95% 사용', big:'월 175달러', sub:'약 25% 할인 적용' },
  cards: [
    { icon:'\u{1F4B0}', big:'40달러대', mid:'구독료 반영 실질가', sub:'월 99달러 구독료 상쇄분 계산' },
    { icon:'\u{1F4CD}', big:'콜로라도 등', mid:'테슬라 보험 가능 주', sub:'전국 확대는 아직' },
    { icon:'\u{1F4CA}', big:'연 1만마일', mid:'견적 기준 주행거리', sub:'표준 커버리지 기준' },
  ],
  quote: '테슬라 보험은 실제 주행 습관과 FSD 사용 비율을 반영해 보험료를 산정합니다. FSD를 많이 쓸수록 사고 위험이 낮다고 보고 할인폭이 커지는 구조입니다.',
  noteSub: '월 99달러인 FSD 구독료에서 보험 할인분(최대 60달러)을 빼면 실질 부담은 40달러 안팎까지 낮아집니다. 다른 보험사·다른 주로 이 할인이 확대되는지가 다음 확인 포인트입니다.',
  footer: '테슬라 · FSD 보험 할인',
}, {
  badge: 'TESLA', title: "Tesla now shows FSD-linked insurance discounts of up to 60% right on its ordering page",
  heroIcon: '\u{1F6E1}', heroBig: 'Save up to $60/mo',
  heroSub: "In US states with Tesla Insurance, buyers now see an FSD-based premium estimate directly on the vehicle order page.",
  before: { label:'Without FSD', big:'$235/mo', sub:'2026 Model Y AWD estimate' },
  after: { label:'With 95% FSD use', big:'$175/mo', sub:'About 25% lower' },
  cards: [
    { icon:'\u{1F4B0}', big:'~$40/mo', mid:'Net of subscription', sub:'After offsetting the $99 FSD fee' },
    { icon:'\u{1F4CD}', big:'Colorado & more', mid:'Where Tesla Insurance exists', sub:'Not yet nationwide' },
    { icon:'\u{1F4CA}', big:'10K mi/yr', mid:'Estimate basis', sub:'Standard coverage assumption' },
  ],
  quote: 'Tesla Insurance prices premiums based on actual driving habits and how much FSD is used \u2014 more FSD usage is treated as lower accident risk.',
  noteSub: "Subtracting the discount (up to $60) from the $99 FSD subscription brings the net cost to roughly $40/mo. Watch whether this spreads to more insurers and states.",
  footer: 'Tesla · FSD Insurance Discount',
});

// 15) L3 — Tesla accessibility (John Foppe)
add('tesla-fsd-accessibility-foppe', 'L3', 'TSLA', {
  badge: '테슬라', title: '팔 없이 태어난 존 포피 씨가 FSD 감독형 자율주행으로 일상 운전을 하고 있는 사례가 소개됐습니다',
  heroIcon: '\u2764', heroBig: '팔 없이 운전',
  heroSub: '존 포피 씨는 팔이 없이 태어나 7년 넘게 발로 운전해 온 인물입니다. 지금은 FSD(감독형)로 통근과 장거리 이동을 하고 있습니다.',
  cards: [
    { icon:'\u{1F697}', big:'7년+', mid:'발로 운전한 기간', sub:'전통적 방식으로 운전' },
    { icon:'\u{1F3E2}', big:'비영리단체 출근', mid:'매일 이동', sub:'FSD로 편하게 통근' },
    { icon:'\u{1F4CD}', big:'500마일', mid:'딸 만나러 가는 거리', sub:'장거리도 FSD로 이동' },
  ],
  quote: '"저는 팔이 없이 태어나 평생 발로 운전해 왔습니다. FSD(감독형)는 제 삶을 바꿔놓았습니다."',
  noteSub: 'FSD는 운전자가 여전히 주의를 기울여야 하는 감독형 자율주행 소프트웨어입니다. 이런 사례는 자율주행 기술이 이동이 불편한 사람들에게 실질적 도움이 될 수 있음을 보여줍니다.',
  footer: '테슬라 · FSD 접근성 사례',
}, {
  badge: 'TESLA', title: 'John Foppe, born without arms, is now driving daily using FSD (Supervised)',
  heroIcon: '\u2764', heroBig: 'Driving Without Arms',
  heroSub: 'John Foppe was born without arms and has driven with his feet for over seven years. He now uses FSD (Supervised) for commuting and long trips.',
  cards: [
    { icon:'\u{1F697}', big:'7+ years', mid:'Driving with his feet', sub:'His traditional method' },
    { icon:'\u{1F3E2}', big:'Non-profit job', mid:'Daily commute', sub:'Now handled by FSD' },
    { icon:'\u{1F4CD}', big:'500 miles', mid:'Visiting his daughter', sub:'Long trips via FSD too' },
  ],
  quote: '"I was born without arms and have driven with my feet my entire life. FSD (Supervised) is life-changing accessibility."',
  noteSub: "FSD is supervised software that still requires driver attention. Stories like this show self-driving tech can meaningfully help people with mobility challenges.",
  footer: 'Tesla · FSD Accessibility',
});

// 16) L1 — Model Y L aerodynamics
add('model-y-l-aero-cd', 'L1', 'TSLA', {
  badge: '테슬라', title: '6인승 모델Y L이 5인승 모델Y보다 공기저항이 더 낮게 설계된 것으로 확인됐습니다',
  heroIcon: '\u{1F4A8}', heroBig: '0.216',
  heroSub: '차체가 얼마나 매끈하게 공기를 가르는지 보여주는 공기저항계수(Cd)입니다. 숫자가 낮을수록 공기 저항이 적습니다.',
  cards: [
    { icon:'\u{1F697}', big:'0.216', mid:'모델Y L(6인승)', sub:'새로 설계된 롱바디' },
    { icon:'\u{1F699}', big:'0.220', mid:'모델Y(5인승)', sub:'기존 모델 대비 비교' },
    { icon:'\u{1F527}', big:'스포일러·휠', mid:'개선 부위', sub:'후면 스포일러·휠 디자인' },
  ],
  quote: '차체가 더 길고 커졌는데도 공기저항계수는 오히려 낮아졌습니다. 재설계된 후면 스포일러와 휠, 최적화된 차체 라인이 함께 작용한 결과입니다.',
  noteSub: '공기저항이 낮을수록 고속 주행 시 배터리 소모가 줄어 주행거리에 유리합니다. 실제 공인 주행거리 수치가 공개되는지가 다음 확인 포인트입니다.',
  footer: '테슬라 · 모델Y L 공기역학',
}, {
  badge: 'TESLA', title: 'The 6-seat Model Y L is aerodynamically more efficient than the 5-seat Model Y, Tesla confirmed',
  heroIcon: '\u{1F4A8}', heroBig: '0.216',
  heroSub: "The drag coefficient (Cd) measures how smoothly a car cuts through air. Lower numbers mean less resistance.",
  cards: [
    { icon:'\u{1F697}', big:'0.216', mid:'Model Y L (6-seat)', sub:'Newly designed long-body' },
    { icon:'\u{1F699}', big:'0.220', mid:'Model Y (5-seat)', sub:'For comparison' },
    { icon:'\u{1F527}', big:'Spoiler & wheels', mid:'What improved', sub:'Redesigned rear spoiler, wheel design' },
  ],
  quote: 'Despite being longer and taller, the Model Y L achieved a lower drag coefficient thanks to a redesigned rear spoiler, wheel design, and optimized body lines.',
  noteSub: 'Lower drag typically means less battery drain at highway speed, which helps range. Watch for the official EPA-style range figures next.',
  footer: 'Tesla · Model Y L Aerodynamics',
});

// 17) L1 — 10-year yield 5.041%
add('treasury-10y-5-percent', 'L1', 'RATES', {
  badge: '미국국채', title: '미국 10년물 국채금리가 장중 5.041%까지 오르며 2007년 이후 가장 높은 수준을 기록했습니다',
  heroIcon: '\u{1F4C8}', heroBig: '5.041%',
  heroSub: '10년 만기 미국 국채의 장중 금리로, 2007년 7월 이후 약 19년 만에 가장 높은 수준입니다. 30년물 금리도 2007년 6월 이후 최고치를 찍었습니다.',
  cards: [
    { icon:'\u{1F6E2}', big:'유가 급등', mid:'주요 배경', sub:'물가 상승 우려 자극' },
    { icon:'\u{1F4CA}', big:'CPI·PPI', mid:'예상보다 강세', sub:'인플레이션 압력 재부각' },
    { icon:'\u{1F5D3}', big:'9/17 FOMC', mid:'다음 금리 결정', sub:'한국시간 새벽 3시 발표' },
  ],
  quote: '10년물 금리가 5%를 넘어선 것은 2023년 10월 이후 약 3년 만입니다. 장중 최고치는 2007년 7월 이후 가장 높은 수준으로 집계됐습니다.',
  noteSub: '국채 금리가 오르면 기업의 자금 조달 비용과 주택담보대출 금리도 함께 오르는 경향이 있습니다. 9월 17일 새벽 FOMC 결정이 이 금리 흐름의 다음 분수령입니다.',
  footer: '미국국채 · 10년물 금리',
}, {
  badge: 'US TREASURY', title: "The US 10-year Treasury yield hit an intraday high of 5.041%, its highest level since 2007",
  heroIcon: '\u{1F4C8}', heroBig: '5.041%',
  heroSub: "The 10-year Treasury's intraday yield, the highest in roughly 19 years since July 2007. The 30-year yield also hit its highest since June 2007.",
  cards: [
    { icon:'\u{1F6E2}', big:'Oil surge', mid:'Key driver', sub:'Stoking inflation worries' },
    { icon:'\u{1F4CA}', big:'CPI & PPI', mid:'Hotter than expected', sub:'Inflation pressure resurfaces' },
    { icon:'\u{1F5D3}', big:'Sept 17 FOMC', mid:'Next rate decision', sub:'3 AM KST announcement' },
  ],
  quote: 'This is the first time the 10-year yield has topped 5% since October 2023. The intraday high is the highest reading since July 2007.',
  noteSub: 'Higher Treasury yields tend to push up corporate borrowing costs and mortgage rates too. The Sept 17 FOMC decision is the next turning point to watch.',
  footer: 'US Treasury · 10-Year Yield',
});

// 18) L1 — Oil tanker freight record
add('oil-tanker-freight-record', 'L1', 'OIL', {
  badge: '유가·해운', title: '초대형 유조선을 하루 빌리는 비용이 사상 처음으로 100만 달러를 넘어섰습니다',
  heroIcon: '\u{1F6E2}', heroBig: '하루 100만 달러',
  heroSub: '중동에서 중국·일본으로 원유를 실어나르는 기준 항로에서, 초대형 유조선(VLCC) 하루 용선료가 사상 처음 이 수준에 도달했습니다.',
  cards: [
    { icon:'\u{1F4C8}', big:'사상 최고', mid:'집계 이후 최고치', sub:'과거 최고 기록 경신' },
    { icon:'\u{1F6E2}', big:'중동→아시아', mid:'기준 항로', sub:'사우디-중국·일본 노선' },
    { icon:'\u{1F4B8}', big:'물류비 부담', mid:'원유 운송 비용', sub:'정제사·수입국 비용 상승' },
  ],
  quote: '초대형 유조선(VLCC)은 원유 200만 배럴 안팎을 실을 수 있는 가장 큰 등급의 유조선입니다. 용선료 급등은 선박 공급 부족과 물동량 증가가 함께 맞물린 결과로 풀이됩니다.',
  noteSub: '운임이 오르면 원유를 사들이는 정제사·국가의 물류 비용이 늘어나 최종 유가에도 영향을 줄 수 있습니다. 이 운임이 앞으로 며칠간 더 오르는지가 다음 확인 포인트입니다.',
  footer: '유가·해운 · 유조선 운임',
}, {
  badge: 'OIL & SHIPPING', title: 'The cost of chartering a supertanker for a day topped $1 million for the first time in history',
  heroIcon: '\u{1F6E2}', heroBig: '$1M / Day',
  heroSub: 'On the benchmark Middle East-to-Asia route, VLCC (very large crude carrier) day rates hit this level for the first time on record.',
  cards: [
    { icon:'\u{1F4C8}', big:'Record high', mid:'Highest on record', sub:'Surpassing the prior peak' },
    { icon:'\u{1F6E2}', big:'Mideast to Asia', mid:'Benchmark route', sub:'Saudi Arabia to China/Japan' },
    { icon:'\u{1F4B8}', big:'Shipping costs', mid:'Crude transport expense', sub:'Higher costs for refiners' },
  ],
  quote: 'A VLCC (very large crude carrier) can hold around 2 million barrels of oil. The rate spike reflects tight ship supply meeting rising cargo volumes.',
  noteSub: 'Higher freight rates raise logistics costs for refiners and importing countries, which can feed through to final oil prices. Watch whether rates keep climbing.',
  footer: 'Oil & Shipping · Tanker Rates',
});

// 19) L2 — Moody's AI power plants $110B
add('moody-ai-power-plants-110b', 'L2', 'AI', {
  badge: 'AI', title: '무디스가 미국의 AI 붐을 뒷받침하려면 1,100억 달러 규모의 새 발전소가 필요하다고 분석했습니다',
  heroIcon: '\u26A1', heroBig: '1,100억 달러',
  heroSub: '신용평가사 무디스가 추산한, 미국 내 AI 데이터센터 전력 수요를 감당하기 위해 새로 지어야 할 발전 설비 투자 규모입니다.',
  cards: [
    { label:'투자 규모', big:'1,100억달러', mid:'신규 발전소', sub:'무디스 추산' },
    { label:'수요 주체', big:'AI 데이터센터', mid:'전력 소비 급증', sub:'그래픽칩 가동 전력' },
    { label:'공급 제약', big:'건설 기간', mid:'발전소는 수년 소요', sub:'수요 증가 속도보다 느림' },
  ],
  detailHead: '전력 수요 급증의 배경',
  detailLines: [
    'AI 데이터센터는 대형 그래픽칩(GPU) 수만~수십만 개를 24시간 가동해 일반 시설보다 훨씬 많은 전력을 씁니다.',
    '새 발전소는 인허가·건설에 수년이 걸려, 수요 증가 속도를 단기간에 따라잡기 어렵습니다.',
    '전력 부족은 전기요금 상승과 데이터센터 신규 착공 지연으로 이어질 수 있다는 우려가 함께 제기됩니다.',
  ],
  noteSub: '전력망 확충은 AI 산업 확장의 숨은 병목으로 꼽힙니다. 실제 발전소 착공·전력구매계약(PPA) 발표가 늘어나는지가 다음 확인 포인트입니다.',
  footer: 'AI · 전력 인프라 투자',
}, {
  badge: 'AI', title: "Moody's says the US AI boom needs $110 billion worth of new power plants",
  heroIcon: '\u26A1', heroBig: '$110 Billion',
  heroSub: "Moody's estimate of new US power-generation investment needed to meet AI data center electricity demand.",
  cards: [
    { label:'Investment size', big:'$110B', mid:'New power plants', sub:'Moody\u2019s estimate' },
    { label:'Demand source', big:'AI data centers', mid:'Surging power use', sub:'Running GPUs around the clock' },
    { label:'Supply constraint', big:'Build time', mid:'Plants take years', sub:'Slower than demand growth' },
  ],
  detailHead: 'Why power demand is surging',
  detailLines: [
    'AI data centers run tens or hundreds of thousands of GPUs 24/7, using far more power than typical facilities.',
    'New power plants take years to permit and build, making it hard to keep pace with fast-rising demand.',
    'Power shortages could raise electricity prices and delay new data center construction, analysts warn.',
  ],
  noteSub: 'Grid capacity is seen as a hidden bottleneck for AI industry growth. Watch for more power plant groundbreakings and power purchase agreements next.',
  footer: 'AI · Power Infrastructure',
});

// 20) L1 — Morgan Stanley TSLA bull case PT $840
add('morgan-stanley-tsla-pt-840', 'L1', 'TSLA', {
  badge: '테슬라', title: '모건스탠리가 테슬라의 강세 시나리오 목표주가를 840달러로 올리며 로보택시·세미트럭 사업에 주목했습니다',
  heroIcon: '\u{1F4C8}', heroBig: '840달러',
  heroSub: '모건스탠리가 제시한 테슬라의 강세 시나리오(불케이스) 목표주가입니다. 로보택시와 세미트럭 사업 확장이 주요 근거로 꼽혔습니다.',
  cards: [
    { icon:'\u{1F695}', big:'로보택시', mid:'강세 근거 ①', sub:'사이버캡 확장 가속' },
    { icon:'\u{1F69B}', big:'세미트럭', mid:'강세 근거 ②', sub:'유럽·북미 동시 확장' },
    { icon:'\u{1F4CA}', big:'불케이스', mid:'시나리오 성격', sub:'낙관적 가정 기반 상단 추정치' },
  ],
  quote: '불케이스(강세 시나리오)는 여러 사업이 계획대로 잘 풀렸을 때를 가정한 목표주가로, 기본 시나리오보다 높게 잡히는 경우가 많습니다.',
  noteSub: '840달러는 여러 사업이 동시에 잘 풀린다는 낙관적 가정 위의 상단 추정치입니다. 실제 로보택시 도시 확장 속도와 세미트럭 인도량이 이 가정을 뒷받침하는지가 다음 확인 포인트입니다.',
  footer: '테슬라 · 모건스탠리 목표가',
}, {
  badge: 'TESLA', title: "Morgan Stanley raised Tesla's bull-case price target to $840, citing its robotaxi and Semi truck businesses",
  heroIcon: '\u{1F4C8}', heroBig: '$840',
  heroSub: "Morgan Stanley's bull-case price target for Tesla, driven mainly by robotaxi and Semi truck expansion.",
  cards: [
    { icon:'\u{1F695}', big:'Robotaxi', mid:'Bull case driver #1', sub:'Cybercab expansion accelerating' },
    { icon:'\u{1F69B}', big:'Semi truck', mid:'Bull case driver #2', sub:'Expanding in Europe and NA' },
    { icon:'\u{1F4CA}', big:'Bull case', mid:'What this means', sub:'An optimistic upper-bound estimate' },
  ],
  quote: 'A bull-case target assumes multiple businesses execute well simultaneously, and is typically set well above the base-case target.',
  noteSub: '$840 assumes several businesses go right at once. Watch whether actual robotaxi city expansion and Semi delivery volumes support that optimism.',
  footer: 'Tesla · Morgan Stanley Target',
});

};
