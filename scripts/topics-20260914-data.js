// 2026-09-14 SVG topic data — screenshot facts, beginner Korean, positive long view
// Layout mix: ROWS×1 L1×3 L2×4 L3×3 L4×2 L5×4 L6×3
module.exports = function (add) {

add('summary', 'ROWS', 'MACRO', {
  headline: '2026.09.14 한장 요약',
  rows: [
    { color:'#60a5fa', fill:'#0a1420', right:'75억', title:'오라클 창업자가 75억 달러 주식 매도 계획을 하루 만에 취소했습니다',
      sub:'5,000만 주 매도 신탁을 공시 다음 날 스스로 접었습니다.' },
    { color:'#4ade80', fill:'#061209', right:'10/1', title:'테슬라가 새 로드스터를 10월 1일 텍사스 웨이코에서 공개합니다',
      sub:'참석 신청 마감은 9월 16일 밤 12시(태평양시간)입니다.' },
    { color:'#a78bfa', fill:'#180f28', right:'5,170억', title:'앤스로픽이 여러 회사와 맺은 연산 계약을 더하면 5,170억 달러입니다',
      sub:'전력 용량 약 1만 5천 메가와트, 엔비디아 투자설도 나왔습니다.' },
    { color:'#4ade80', fill:'#061209', right:'40배', title:'오스틴 사이버캡 대기시간이 모델Y의 최대 40배로 치솟았습니다',
      sub:'서지 요금까지 붙어 모델Y보다 요금이 더 비쌌습니다.' },
    { color:'#4ade80', fill:'#061209', right:'10/6', title:'유럽연합이 10월 6일 완전자율주행 승인 표결을 앞두고 있습니다',
      sub:'6개국 찬성, 6개국 찬성 신호로 인구 기준 62%까지 왔습니다.' },
    { color:'#94a3b8', fill:'#111827', right:'2,120억', title:'연방준비제도가 최근 3년간 운영 손실 2,120억 달러를 냈습니다',
      sub:'고금리로 지급 이자가 보유 자산 이자보다 커진 결과입니다.' },
    { color:'#c084fc', fill:'#140b1f', right:'700회', title:'스페이스X가 팰컨 로켓 통산 700번째 발사를 마쳤습니다',
      sub:'2025년 165회로 발사 속도가 해마다 빨라지고 있습니다.' },
  ],
  caption: '더 볼 것: 오라클 75억 · 로드스터 10/1 · 앤스로픽 5,170억 · 사이버캡 40배 · EU 10/6 · 연준 2,120억 · 발사 700회',
}, {
  headline: '2026.09.14 Daily Snapshot',
  rows: [
    { color:'#60a5fa', fill:'#0a1420', right:'$7.5B', title:"Ellison canceled his $7.5B Oracle stock-sale plan a day after filing",
      sub:'The 50M-share trading plan was scrapped by the founder himself.' },
    { color:'#4ade80', fill:'#061209', right:'Oct 1', title:'Tesla will unveil the new Roadster on Oct 1 in Waco, Texas',
      sub:'RSVP deadline is Sep 16 midnight Pacific time.' },
    { color:'#a78bfa', fill:'#180f28', right:'$517B', title:"Anthropic's stacked compute deals now total $517B",
      sub:'About 15,000 MW secured; Nvidia is reportedly weighing an investment.' },
    { color:'#4ade80', fill:'#061209', right:'40x', title:'Cybercab wait times in Austin spiked to 40x Model Y at times',
      sub:'Surge pricing made it cost more than a Model Y ride.' },
    { color:'#4ade80', fill:'#061209', right:'Oct 6', title:'The EU is set to vote on Tesla FSD approval on Oct 6',
      sub:'6 countries approved, 6 more signaling yes — 62% of EU population.' },
    { color:'#94a3b8', fill:'#111827', right:'$212B', title:'The Fed has posted $212B in operating losses over three years',
      sub:'High rates made its interest payouts exceed its asset income.' },
    { color:'#c084fc', fill:'#140b1f', right:'700', title:"SpaceX completed its 700th Falcon-family launch",
      sub:'2025 alone saw 165 launches as the cadence keeps accelerating.' },
  ],
  caption: 'Watch: Oracle $7.5B · Roadster Oct 1 · Anthropic $517B · Cybercab 40x · EU Oct 6 · Fed $212B · 700 launches',
});

add('oracle-ellison-cancel', 'L1', 'MSFT', {
  badge: 'ORCL', title: '오라클 창업자 래리 엘리슨이 75억 달러 규모 주식 매도 계획을 공시 하루 만에 취소했습니다',
  heroIcon: '💰', heroBig: '75억 달러',
  heroSub: '최대 5,000만 주를 팔 수 있는 매도 계획(트레이딩 플랜)이었습니다. 오라클이 이를 공시로 알린 지 하루 만에 스스로 취소했습니다.',
  cards: [
    { icon:'📄', big:'공시', mid:'하루 전 신고', sub:'규제 당국에 매도 계획 신고' },
    { icon:'🔁', big:'취소', mid:'다음 날 철회', sub:'실제 매도는 이뤄지지 않음' },
    { icon:'🏛', big:'창업자', mid:'큰 지분 유지', sub:'오라클 창업 때부터 보유' },
  ],
  quote: '트레이딩 플랜은 내부자가 미리 날짜·물량을 정해 투명하게 파는 제도입니다. 팔기 전에 계획 자체를 접은 것이 이번 취소입니다.',
  noteSub: '대주주 매도 계획은 보통 회사에 대한 신뢰 변화로 해석됩니다. 이번엔 계획을 취소해 오히려 지분을 계속 지키겠다는 신호로 읽힙니다. 다음에는 새 매도 계획이 다시 신고되는지 확인하면 됩니다.',
  footer: '오라클 · 창업자 지분',
}, {
  badge: 'ORCL', title: "Oracle founder Larry Ellison canceled his $7.5B stock-sale plan a day after it was disclosed",
  heroIcon: '💰', heroBig: '$7.5B',
  heroSub: 'The trading plan covered up to 50 million shares. Oracle disclosed it in a filing, and Ellison scrapped it the very next day.',
  cards: [
    { icon:'📄', big:'Filed', mid:'Disclosed first', sub:'Regulatory filing on the plan' },
    { icon:'🔁', big:'Canceled', mid:'Reversed next day', sub:'No shares were actually sold' },
    { icon:'🏛', big:'Founder', mid:'Stake intact', sub:'Held since Oracle\u2019s founding' },
  ],
  quote: 'A 10b5-1 trading plan lets insiders sell on a pre-set schedule. This time, the plan was pulled before any sale happened.',
  noteSub: 'Large insider sale plans are often read as a confidence signal. Canceling one instead suggests the founder still wants to hold. Watch for whether a new plan gets filed next.',
  footer: 'Oracle · Founder stake',
});

add('roadster-oct1', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: '로드스터 10월 1일',
  title: '테슬라가 새 로드스터를 10월 1일 텍사스 웨이코에서 공개하며 초청장에 숨은 문구를 남겼습니다',
  heroBig: '10/1',
  heroSub: '텍사스 웨이코에서 열립니다. 참석 신청 마감은 9월 16일 밤 12시(태평양시간)이며, 제출 후에는 바꿀 수 없습니다.',
  grid: [
    { icon:'🗓', big:'10/1', mid:'공개 행사', sub:'텍사스 웨이코' },
    { icon:'⏰', big:'9/16', mid:'신청 마감', sub:'태평양시간 밤 12시' },
    { icon:'🔍', big:'숨은 문구', mid:'초청장 안', sub:'밝기 조정하면 나타남' },
    { icon:'🎬', big:'BTTF', mid:'영화 대사풍', sub:'팬들이 발견해 화제' },
  ],
  ctx1: '일론 머스크는 이 행사가 "확실히 재미있을 것"이라고 적었습니다.',
  ctx2: '테슬라 공식 계정은 "발사 준비"라는 문구와 로드스터 후미등 사진을 올렸습니다.',
  quote: '초청장 이미지를 밝게 조정하면 영화 「백 투 더 퓨처」 명대사를 떠올리게 하는 문구가 나타납니다. 팬들은 새 기능을 기대하고 있습니다.',
  noteSub: '로드스터는 2017년 처음 공개된 뒤 여러 번 미뤄진 한정판 스포츠카입니다. 이번엔 날짜가 확정됐다는 점이 다릅니다. 다음엔 실제 성능·가격이 공개되는지 지켜보면 됩니다.',
  footer: '테슬라 · 로드스터',
}, {
  badge: 'BREAKING', breaking: 'ROADSTER OCT 1',
  title: 'Tesla will unveil the new Roadster on Oct 1 in Waco, Texas, with a hidden message in the invite',
  heroBig: 'Oct 1',
  heroSub: 'The event is in Waco, Texas. RSVP deadline is Sep 16 midnight Pacific time, and submissions can\u2019t be changed after.',
  grid: [
    { icon:'🗓', big:'Oct 1', mid:'Unveil event', sub:'Waco, Texas' },
    { icon:'⏰', big:'Sep 16', mid:'RSVP deadline', sub:'Midnight Pacific time' },
    { icon:'🔍', big:'Hidden line', mid:'Inside invite', sub:'Appears when brightened' },
    { icon:'🎬', big:'BTTF-style', mid:'Movie-style quote', sub:'Fans spotted it first' },
  ],
  ctx1: 'Elon Musk wrote that the event is "excitement guaranteed."',
  ctx2: 'Tesla\u2019s official account posted "Go for launch" with a Roadster taillight photo.',
  quote: 'Brightening the invite image reveals a line evoking Back to the Future\u2019s famous quote. Fans are speculating about a new feature.',
  noteSub: 'The Roadster was first shown in 2017 and delayed repeatedly since. This time a firm date is set. Next: watch for real performance figures and pricing at the event.',
  footer: 'Tesla · Roadster',
});

add('fed-loss-212b', 'L2', 'RATES', {
  badge: 'MACRO', title: '연방준비제도가 최근 3년간 운영 손실 2,120억 달러를 냈다는 집계가 나왔습니다',
  heroIcon: '📉', heroBig: '2,120억 달러',
  heroSub: '2023~2025년 3년 연속 적자입니다. 2000~2022년에는 해마다 200억~1,170억 달러 이익을 냈습니다.',
  cards: [
    { label:'2023년', big:'적자', mid:'첫 적자 전환', sub:'금리 인상 여파 시작' },
    { label:'2024년', big:'적자', mid:'두 해째 지속', sub:'고금리 유지 구간' },
    { label:'2025년', big:'적자', mid:'세 해째 지속', sub:'합산 2,120억 달러' },
  ],
  detailHead: '연준 손익이 왜 바뀌었나',
  detailLines: [
    '보유 국채·모기지 채권은 예전 저금리 시절 이자를 받습니다.',
    '은행 예치금에는 지금의 높은 기준금리로 이자를 지급합니다.',
    '받는 이자보다 주는 이자가 커지면서 적자가 났습니다.',
  ],
  noteSub: '중앙은행 적자는 정부 재정과는 다른 회계로, 세금 부담이 곧바로 생기진 않습니다. 다만 최근 금리 인상이 얼마나 크고 빨랐는지를 보여 주는 숫자입니다. 이번 주 FOMC 결정이 다음 방향을 정합니다.',
  footer: '매크로 · 연준 손익',
}, {
  badge: 'MACRO', title: 'The Federal Reserve has posted $212B in operating losses over the last three years',
  heroIcon: '📉', heroBig: '$212B',
  heroSub: 'Losses ran from 2023 through 2025. From 2000-2022 it posted annual profits of $20B-$117B.',
  cards: [
    { label:'2023', big:'Loss', mid:'First loss year', sub:'Rate-hike effect begins' },
    { label:'2024', big:'Loss', mid:'Second straight year', sub:'High-rate regime holds' },
    { label:'2025', big:'Loss', mid:'Third straight year', sub:'Cumulative $212B' },
  ],
  detailHead: 'Why the Fed\u2019s income flipped',
  detailLines: [
    'Its bond holdings still earn interest set in the old low-rate era.',
    'It pays banks interest on reserves at today\u2019s high policy rate.',
    'When payouts exceed asset income, the Fed runs a loss.',
  ],
  noteSub: 'A central-bank loss is accounted differently than government deficits and doesn\u2019t create a direct tax bill. But it shows how large and fast this hiking cycle was. This week\u2019s FOMC decision will shape what comes next.',
  footer: 'Macro · Fed P&L',
});

add('starlink-48-airlines', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스타링크를 선택한 항공사가 48곳으로 늘었고 장착 예정 항공기가 7,000대를 넘었습니다',
  heroIcon: '✈️', heroBig: '48개 항공사',
  heroSub: '스페이스X 위성 인터넷 스타링크를 도입했거나 계약한 항공사입니다. 장착 완료·진행 중인 항공기는 7,000대가 넘습니다.',
  cards: [
    { label:'항공사', big:'48곳', mid:'세계 주요사', sub:'아메리칸·유나이티드 등' },
    { label:'항공기', big:'7,000대+', mid:'장착·계약 중', sub:'전체 항공사 합산' },
    { label:'선택 이유', big:'와이파이', mid:'속도·지연 개선', sub:'승객 만족도 조사 반영' },
  ],
  detailHead: '왜 항공사들이 스타링크로 몰리나',
  detailLines: [
    '스타링크는 지구에 가까운 저궤도 위성으로 속도가 빠릅니다.',
    '기존 위성 인터넷보다 지연이 적어 화상 회의도 가능합니다.',
    '승객들이 와이파이 품질로 항공사를 고르기 시작했습니다.',
  ],
  noteSub: '기내 와이파이는 예전엔 느리고 비싸다는 불만이 많았던 서비스입니다. 스타링크는 지상 인터넷과 비슷한 속도를 하늘에서 낼 수 있다는 점이 다릅니다. 다음 분기 계약 항공사 수가 얼마나 더 늘어나는지 지켜보면 됩니다.',
  footer: '스페이스X · 스타링크 항공',
}, {
  badge: 'SPCX', title: '48 airlines have chosen Starlink, with more than 7,000 aircraft equipped or under contract',
  heroIcon: '✈️', heroBig: '48 airlines',
  heroSub: "That's how many carriers have adopted or contracted for SpaceX's Starlink internet. Aircraft equipped or committed now top 7,000.",
  cards: [
    { label:'Airlines', big:'48', mid:'Major global carriers', sub:'American, United, and more' },
    { label:'Aircraft', big:'7,000+', mid:'Equipped or contracted', sub:'Across all carriers' },
    { label:'Why', big:'Wi-Fi', mid:'Speed and latency', sub:'Reflected in satisfaction surveys' },
  ],
  detailHead: 'Why airlines keep choosing Starlink',
  detailLines: [
    'Starlink uses low-orbit satellites closer to Earth for higher speed.',
    'Lower latency than legacy satellite internet enables video calls.',
    'Passengers are starting to pick airlines based on Wi-Fi quality.',
  ],
  noteSub: 'In-flight Wi-Fi used to mean slow and expensive. Starlink can match ground-level speeds in the sky. Next: watch how many more airlines sign on next quarter.',
  footer: 'SpaceX · Starlink airlines',
});

add('tsla-q3-delivery-492k', 'L1', 'TSLA', {
  badge: 'TSLA', title: '테슬라 3분기 인도량 예측 시장이 49만 2천 대로 올라오며 최근 한 주 새 1만 3천 대가 늘었습니다',
  heroIcon: '🚗', heroBig: '49만 2천 대',
  heroSub: '예측 거래 플랫폼 칼시의 3분기 인도량 예측치입니다. 마감(10월 21일)까지 38일 남은 시점 기준 최근 한 주 새 1만 3천 대가 올랐습니다.',
  cards: [
    { icon:'📊', big:'49.2만', mid:'현재 예측치', sub:'2분기는 38.4만 대' },
    { icon:'📈', big:'+1.3만', mid:'한 주 변동', sub:'우상향 흐름' },
    { icon:'⏳', big:'38일', mid:'마감까지', sub:'10월 21일 발표' },
  ],
  quote: '예측 시장은 실제 돈을 걸고 인도량을 맞히는 곳입니다. 일부 이용자는 "수요·대기시간이 높아 50만 대에 이를 것"이라고 적었습니다.',
  noteSub: '이 숫자는 테슬라가 직접 확인한 것이 아니라 참가자들의 베팅 평균입니다. 예측 시장은 새 뉴스가 나올 때마다 빠르게 움직입니다. 10월 초 실제 발표가 나오면 이 예측이 맞았는지 확인할 수 있습니다.',
  footer: '테슬라 · 3분기 인도량',
}, {
  badge: 'TSLA', title: "Prediction markets moved Tesla's Q3 delivery forecast up to 492K, up 13K in a week",
  heroIcon: '🚗', heroBig: '492K',
  heroSub: "That's Kalshi's current Q3 delivery forecast. With 38 days left until the Oct 21 deadline, it rose 13K in just one week.",
  cards: [
    { icon:'📊', big:'492K', mid:'Current forecast', sub:'Q2 delivered 384K' },
    { icon:'📈', big:'+13K', mid:'Weekly move', sub:'Trending upward' },
    { icon:'⏳', big:'38 days', mid:'Until deadline', sub:'Report due Oct 21' },
  ],
  quote: "Prediction markets let traders bet real money on the number. Some users wrote demand and wait times are high enough to reach 500K.",
  noteSub: "This figure is a crowd-sourced average, not a number Tesla has confirmed. Prediction markets move fast on fresh news. The early-October report will show whether this forecast held up.",
  footer: 'Tesla · Q3 deliveries',
});

add('anthropic-517b-compute', 'L6', 'NVDA', {
  badge: 'BREAKING', breaking: '앤스로픽 5,170억 달러',
  title: '앤스로픽이 구글·아마존·스페이스X 등에 걸쳐 총 5,170억 달러 규모 연산 계약을 맺었습니다',
  heroBig: '5,170억 달러',
  heroSub: '지난 10개월 사이 12건의 계약을 더한 총액입니다. 확보한 전력 용량은 약 1만 5,000메가와트에 이릅니다.',
  grid: [
    { icon:'☁️', big:'AWS', mid:'1,000억 달러', sub:'5,000메가와트' },
    { icon:'🔍', big:'구글', mid:'2,000억 달러', sub:'5,000메가와트' },
    { icon:'🚀', big:'스페이스X', mid:'450억 달러', sub:'300메가와트' },
    { icon:'💻', big:'AMD', mid:'2,000메가와트', sub:'2026년 7월 계약' },
  ],
  ctx1: '엔비디아가 앤스로픽의 대형 기업공개(IPO)에 투자를 논의 중이라는 로이터 보도도 나왔습니다.',
  ctx2: '메가와트는 데이터센터가 쓸 수 있는 전력 용량으로, 인공지능 모델 학습·운영 규모를 가늠하는 단위입니다.',
  quote: '5,170억 달러는 여러 회사와 나눠 쓰기로 한 계약을 모두 더한 총액입니다. 앤스로픽이 오늘 다 쓴 돈은 아닙니다.',
  noteSub: '앤스로픽은 챗봇 클로드를 만드는 인공지능 회사로, 오픈AI와 경쟁 관계입니다. 이번 집계는 인공지능 업계 전체의 계약 규모가 얼마나 커졌는지 보여 줍니다. 실제 계약 체결 공시가 이어지는지 다음에 확인하면 됩니다.',
  footer: '앤스로픽 · 연산 계약',
}, {
  badge: 'BREAKING', breaking: 'ANTHROPIC $517B',
  title: 'Anthropic has committed to roughly $517B in compute deals across Google, Amazon, SpaceX and more',
  heroBig: '$517B',
  heroSub: 'That is the sum of 12 deals signed over the last 10 months, securing about 15,000 MW of power capacity.',
  grid: [
    { icon:'☁️', big:'AWS', mid:'$100B', sub:'5,000 MW' },
    { icon:'🔍', big:'Google', mid:'$200B', sub:'5,000 MW' },
    { icon:'🚀', big:'SpaceX', mid:'$45B', sub:'300 MW' },
    { icon:'💻', big:'AMD', mid:'2,000 MW', sub:'Signed Jul 2026' },
  ],
  ctx1: 'Reuters also reported Nvidia is in talks to invest in Anthropic\u2019s upcoming mega IPO.',
  ctx2: 'A megawatt (MW) measures data-center power — a proxy for AI compute scale.',
  quote: 'The $517B figure sums deals paid out over many years, not money Anthropic has spent today.',
  noteSub: 'Anthropic makes the Claude chatbot and competes with OpenAI. This tally shows how large AI-industry contracts have grown overall. Next: watch whether each partner confirms the spending in its own earnings.',
  footer: 'Anthropic · Compute deals',
});

add('tsla-us-ev-share', 'L5', 'TSLA', {
  badge: 'TSLA', title: '테슬라가 미국 전기차 시장 점유율 52%로 되살아나며 다른 완성차 업체들의 자리를 되찾아 왔습니다',
  heroIcon: '🔋', heroBig: '52%',
  heroSub: '2026년 1~8월 미국 전기차 판매 점유율입니다. 1년 전 43%보다 올랐지만, 배경은 전체 시장이 30% 더 크게 줄어든 결과입니다.',
  before: { label:'1년 전', big:'43%', sub:'테슬라 점유율' },
  after: { label:'지금', big:'52%', sub:'테슬라 점유율' },
  cards: [
    { icon:'📉', big:'-16%', mid:'테슬라 판매', sub:'1년 전보다 감소' },
    { icon:'📉', big:'-30%', mid:'전체 시장', sub:'세액공제 축소 영향' },
    { icon:'🛣', big:'FSD', mid:'구매 이유 1위', sub:'완전자율주행 체감' },
  ],
  quote: '한 소비자는 완전자율주행을 거의 항상 쓴다며 "이렇게 잘 되는데 왜 직접 운전하겠느냐"고 말했습니다.',
  noteSub: '테슬라 판매도 줄었지만 경쟁사들이 훨씬 더 크게 줄어 점유율이 오른 것입니다. 세액공제(정부 보조금) 축소가 전기차 수요 전체를 눌렀습니다. 다음 분기 시장 전체가 다시 커질 때도 52%를 지키는지가 핵심입니다.',
  footer: '테슬라 · 미국 EV 점유율',
}, {
  badge: 'TSLA', title: 'Tesla is reclaiming the U.S. EV market as legacy automakers retreat further',
  heroIcon: '🔋', heroBig: '52%',
  heroSub: "That's Tesla's Jan-Aug 2026 U.S. EV share, up from 43% a year ago — but the market itself shrank 30% faster than Tesla's own sales.",
  before: { label:'A year ago', big:'43%', sub:'Tesla EV share' },
  after: { label:'Now', big:'52%', sub:'Tesla EV share' },
  cards: [
    { icon:'📉', big:'-16%', mid:'Tesla sales', sub:'Down from a year ago' },
    { icon:'📉', big:'-30%', mid:'Overall market', sub:'Tax-credit rollback hit' },
    { icon:'🛣', big:'FSD', mid:'Top reason to buy', sub:'Felt daily by owners' },
  ],
  quote: 'One buyer said he uses Full Self-Driving nearly all the time, asking "why would I drive myself" when it works this well.',
  noteSub: "Tesla's sales fell too, but rivals fell much further, lifting its share. A federal EV tax-credit rollback hit overall demand. Next: watch whether Tesla holds 52% once the market grows again.",
  footer: 'Tesla · U.S. EV share',
});

add('tsla-98yo-driver', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '"80년 운전했고, 이제 신기함이 사라졌습니다"',
  title: '1931년식 포드로 운전을 배운 98세 남성이 이제는 테슬라 완전자율주행에 운전을 맡긴다고 말했습니다',
  heroIcon: '👴', heroBig: '98세',
  heroSub: '80년 넘게 운전해 온 이 남성은 최근 테슬라를 사서 완전자율주행이 대신 운전하게 하고 있습니다. 차가 다람쥐를 보고 스스로 멈추는 장면도 함께 전해졌습니다.',
  cards: [
    { icon:'🚙', big:'1931년식', mid:'첫 운전 차량', sub:'포드 모델A' },
    { icon:'🤖', big:'FSD', mid:'감독 모드', sub:'손을 얹고 지켜보는 방식' },
    { icon:'🐿', big:'자동 정지', mid:'다람쥐 인식', sub:'스스로 멈춘 장면' },
  ],
  quote: '"80년 동안 운전을 해 왔고 신기함이 사라졌다. 차가 스스로 운전하고 실수하지 않아서 이 차를 샀다"고 말했습니다.',
  noteSub: '완전자율주행은 운전자가 지켜보며 소프트웨어가 조향·가속·차선 변경을 대신하는 감독 모드입니다. 고령 운전자는 반응 속도가 느려질 수 있어 사고 위험이 상대적으로 높다고 알려져 있습니다. 이런 개인 경험이 쌓이면 소프트웨어에 대한 신뢰가 넓어질 수 있습니다.',
  footer: '테슬라 · 완전자율주행 사례',
}, {
  badge: 'TSLA', badgeLine: '"80 years behind the wheel, and the novelty wore off"',
  title: 'A 98-year-old who learned to drive on a 1931 Model A Ford now lets Tesla FSD drive him everywhere',
  heroIcon: '👴', heroBig: '98',
  heroSub: 'After 80-plus years of driving, he bought a Tesla and now lets Full Self-Driving take over. The car even stopped itself for a chipmunk.',
  cards: [
    { icon:'🚙', big:'1931', mid:'First car he drove', sub:'A Ford Model A' },
    { icon:'🤖', big:'FSD', mid:'Supervised mode', sub:'Hands on, watching closely' },
    { icon:'🐿', big:'Auto-stop', mid:'Spotted a chipmunk', sub:'Braked on its own' },
  ],
  quote: '"I\u2019ve driven for 80 years, and the novelty wore off. I bought this because it drives itself and doesn\u2019t make mistakes."',
  noteSub: 'FSD is a supervised mode where software handles steering, speed, and lane changes while the driver watches. Older drivers can face higher crash risk from slower reflexes. Stories like this can build broader trust in the software over time.',
  footer: 'Tesla · FSD story',
});

add('starship-v3-thrust-eiffel', 'L5', 'SPCX', {
  badge: 'SPCX', title: '스타십 3세대 부스터의 추력이 에펠탑 전체 무게를 들어 올릴 만큼 크다는 비교가 나왔습니다',
  heroIcon: '🚀', heroBig: '2천만 파운드',
  heroSub: '스타십 3세대 수퍼헤비 부스터의 추력입니다. 무게 약 7,300톤인 에펠탑 전체 철골 구조를 들어 올릴 수 있는 힘과 맞먹습니다.',
  before: { label:'에펠탑', big:'7,300톤', sub:'전체 철골 무게' },
  after: { label:'수퍼헤비', big:'2천만 파운드', sub:'부스터 추력' },
  cards: [
    { icon:'🔥', big:'랩터', mid:'30개 넘는 엔진', sub:'1단 부스터에 집중' },
    { icon:'🛰', big:'화성', mid:'설계 목표', sub:'대형 화물·인원 수송' },
    { icon:'♻️', big:'재사용', mid:'부스터·우주선 모두', sub:'발사 비용 절감 목표' },
  ],
  quote: '엔진 30개 넘는 랩터가 한꺼번에 불을 뿜으면서 인류가 만든 로켓 중 가장 큰 추력을 냅니다.',
  noteSub: '추력이 클수록 한 번에 실어 나를 수 있는 위성·화물·사람의 양이 늘어납니다. 스타십은 화성까지 사람과 화물을 실어 나르겠다는 목표로 설계됐습니다. 다음엔 이 추력을 실제 비행에서 안정적으로 내는지, 부스터가 계획대로 회수되는지가 확인 포인트입니다.',
  footer: '스페이스X · 스타십 추력',
}, {
  badge: 'SPCX', title: "Starship V3's booster thrust is compared to lifting the Eiffel Tower's entire steel structure",
  heroIcon: '🚀', heroBig: '20M lbs',
  heroSub: "That's the thrust of Starship V3's Super Heavy booster — comparable to lifting the Eiffel Tower's roughly 7,300-ton steel frame.",
  before: { label:'Eiffel Tower', big:'7,300t', sub:'Total steel weight' },
  after: { label:'Super Heavy', big:'20M lbs', sub:'Booster thrust' },
  cards: [
    { icon:'🔥', big:'Raptor', mid:'30+ engines', sub:'Clustered on booster' },
    { icon:'🛰', big:'Mars', mid:'Design goal', sub:'Heavy cargo and crew' },
    { icon:'♻️', big:'Reusable', mid:'Booster and ship', sub:'Goal: cut launch cost' },
  ],
  quote: 'More than 30 Raptor engines firing together produce the largest thrust of any rocket humans have built.',
  noteSub: 'More thrust means more satellites, cargo, and people per launch. Starship was designed to carry crew and cargo all the way to Mars. Next: watch whether this thrust holds up in flight and the booster is recovered as planned.',
  footer: 'SpaceX · Starship thrust',
});

add('eu-fsd-vote-oct6', 'L6', 'TSLA', {
  badge: 'BREAKING', breaking: 'EU FSD 표결 D-23',
  title: '유럽연합이 23일 뒤인 10월 6일 테슬라 완전자율주행 승인을 표결에 부칩니다',
  heroBig: '10/6',
  heroSub: '27개 회원국 가운데 6개국이 이미 찬성했습니다. 통과에는 인구 기준 65%·국가 15개 이상이 필요합니다.',
  grid: [
    { icon:'✅', big:'6개국', mid:'이미 찬성', sub:'인구 9.4%' },
    { icon:'👍', big:'6개국', mid:'찬성 신호', sub:'인구 52.5%' },
    { icon:'📊', big:'61.9%', mid:'현재 합산', sub:'목표 65%' },
    { icon:'🕐', big:'8개국', mid:'승인 후보', sub:'시험 진행 중' },
  ],
  ctx1: '프랑스·독일·스웨덴·이탈리아·핀란드·그리스가 찬성 신호를 보내고 있습니다.',
  ctx2: '스페인·아일랜드·포르투갈 등 8개국이 추가 승인 후보로 꼽혔습니다.',
  quote: '통과에는 인구 65%·국가 15개 이상이 필요합니다. 지금은 인구 61.9%·국가 12개로 아직 문턱에 못 미칩니다.',
  noteSub: '유럽연합은 여러 나라가 동시에 합의해야 하는 구조라 시간이 걸릴 수 있습니다. 안전 규제가 엄격한 유럽에서 승인받으면 국제적인 신뢰를 얻는 상징적인 사건이 됩니다. 표결 결과와 통과 후 각국 서비스 개시 일정을 함께 확인하면 됩니다.',
  footer: '테슬라 · EU FSD 표결',
}, {
  badge: 'BREAKING', breaking: 'EU FSD VOTE D-23',
  title: 'The EU is set to vote on Tesla FSD approval in 23 days, on Oct 6',
  heroBig: 'Oct 6',
  heroSub: 'Six of 27 member states have already approved it. Passage needs 65% of population and at least 15 countries.',
  grid: [
    { icon:'✅', big:'6', mid:'Already approved', sub:'9.4% of population' },
    { icon:'👍', big:'6', mid:'Signaling yes', sub:'52.5% of population' },
    { icon:'📊', big:'61.9%', mid:'Current combined', sub:'Target is 65%' },
    { icon:'🕐', big:'8', mid:'Candidate countries', sub:'Currently testing' },
  ],
  ctx1: 'France, Germany, Sweden, Italy, Finland, and Greece are signaling approval.',
  ctx2: 'Spain, Ireland, Portugal and five others are seen as additional approval candidates.',
  quote: "Passage requires 65% of population and 15+ countries. It's currently at 61.9% and 12 countries — still short.",
  noteSub: "EU approval requires many countries to agree at once, so it can take time. Winning approval in Europe's strict safety environment would be a symbolic win. Watch the vote outcome and each country's rollout timeline after passage.",
  footer: 'Tesla · EU FSD vote',
});

add('spacex-700-launches', 'L2', 'SPCX', {
  badge: 'SPCX', title: '스페이스X가 팰컨 계열 통산 700번째 발사를 마쳤고 발사 속도는 해마다 빨라지고 있습니다',
  heroIcon: '🚀', heroBig: '700회 발사',
  heroSub: '팰컨9·팰컨헤비를 합친 통산 발사 횟수입니다. 같은 날 케이프커내버럴 40번 발사대에서 400번째 궤도 발사도 함께 나왔습니다.',
  cards: [
    { label:'2023년', big:'96회', mid:'연간 발사', sub:'꾸준한 증가 시작' },
    { label:'2025년', big:'165회', mid:'연간 최고치', sub:'재사용 성숙 효과' },
    { label:'2026년', big:'107회', mid:'현재까지', sub:'연말까지 진행 중' },
  ],
  detailHead: '발사 속도가 빨라진 이유',
  detailLines: [
    '1단 부스터를 회수해 다시 쓰면서 발사 비용이 낮아졌습니다.',
    '스타링크 위성 발사 수요가 꾸준히 늘고 있습니다.',
    '같은 부스터로 더 짧은 간격을 두고 반복 발사합니다.',
  ],
  noteSub: '2010년대에는 10년 동안 80회에 불과했지만 지금은 한 해에도 100회를 훌쩍 넘습니다. 로켓 재사용 기술이 자리 잡으며 발사가 점차 일상적인 산업 활동이 되고 있습니다. 2026년 남은 기간 165회를 넘어설 수 있는지가 다음 확인 포인트입니다.',
  footer: '스페이스X · 발사 700회',
}, {
  badge: 'SPCX', title: 'SpaceX completed its 700th Falcon-family launch as its cadence keeps accelerating year after year',
  heroIcon: '🚀', heroBig: '700 launches',
  heroSub: "That's the combined Falcon 9 and Falcon Heavy total. The same day marked the 400th orbital launch from Cape Canaveral's SLC-40.",
  cards: [
    { label:'2023', big:'96', mid:'Annual launches', sub:'Steady growth begins' },
    { label:'2025', big:'165', mid:'Annual record', sub:'Reuse hits maturity' },
    { label:'2026', big:'107', mid:'So far this year', sub:'Still counting up' },
  ],
  detailHead: 'Why the cadence is speeding up',
  detailLines: [
    'Recovering and reflying boosters cut the cost per launch.',
    'Starlink satellite launch demand keeps growing steadily.',
    'The same booster flies again after shorter turnaround times.',
  ],
  noteSub: 'The 2010s totaled just 80 launches in ten years; now a single year tops 100. Reusable-rocket technology has made launches an increasingly routine industrial activity. Next: can 2026 top last year\u2019s record of 165?',
  footer: 'SpaceX · 700 launches',
});

add('optimus-v3-reveal-delay', 'L4', 'TSLA', {
  badge: 'TSLA', badgeLine: '"경쟁사들이 사진을 보고 프레임별로 베낄 수 있습니다"',
  title: '일론 머스크가 옵티머스 3세대 로봇의 모습을 아직 공개하지 않는 이유가 경쟁사의 베끼기를 막기 위해서라고 설명했습니다',
  heroIcon: '🤖', heroBig: '3세대',
  heroSub: '테슬라는 인간형 로봇 옵티머스의 뼈대(프레임) 디자인을 일부러 자세히 공개하지 않고 있습니다. 양산에 더 가까워졌을 때 공개하는 쪽을 택했다는 설명입니다.',
  cards: [
    { icon:'🛡', big:'비공개', mid:'프레임 디자인', sub:'경쟁사 참고 방지' },
    { icon:'🏭', big:'양산 대기', mid:'공개 시점 조절', sub:'완성도 우선' },
    { icon:'👍', big:'"똑똑함"', mid:'반응', sub:'전략에 대한 평가' },
  ],
  quote: '"테슬라는 로봇 프레임을 일부러 자세히 공개하지 않는다. 경쟁사가 그것을 베낄 수 있기 때문"이라고 머스크가 설명했습니다.',
  noteSub: '인간형 로봇 업계는 최근 여러 회사가 동시에 뛰어들며 경쟁이 치열해진 분야입니다. 자동차 신차를 위장막으로 가리고 시험하는 것과 비슷한 전략입니다. 다음엔 실제 공개 시점과 회사가 밝힌 생산 목표가 얼마나 맞아떨어지는지 지켜보면 됩니다.',
  footer: '테슬라 · 옵티머스 3세대',
}, {
  badge: 'TSLA', badgeLine: '"Competitors could copy it frame by frame from photos"',
  title: 'Elon Musk said Tesla is deliberately withholding the Optimus V3 robot frame to stop rivals from copying it',
  heroIcon: '🤖', heroBig: 'V3',
  heroSub: "Tesla is intentionally not fully revealing Optimus's frame design. Musk said he'd rather show it once it's closer to production.",
  cards: [
    { icon:'🛡', big:'Withheld', mid:'Frame design', sub:'To block copying' },
    { icon:'🏭', big:'Awaiting', mid:'production readiness', sub:'Polish over speed' },
    { icon:'👍', big:'"Smart"', mid:'Reaction', sub:'To the strategy' },
  ],
  quote: '"Tesla deliberately doesn\u2019t show the robot frame in detail because competitors could copy it," Musk explained.',
  noteSub: 'The humanoid-robot industry has grown fiercely competitive as many companies jump in. It\u2019s similar to camouflaging a new car during testing. Next: watch when it\u2019s actually revealed and whether it matches stated production goals.',
  footer: 'Tesla · Optimus V3',
});

add('cybercab-austin-demand', 'L5', 'TSLA', {
  badge: 'TSLA', title: '오스틴에서 사이버캡 대기시간이 모델Y보다 훨씬 길어졌고 서지 요금까지 붙었습니다',
  heroIcon: '🚕', heroBig: '30~40분',
  heroSub: '토요일 밤 사이버캡 대기시간입니다. 같은 시각 모델Y는 1분에 그쳤습니다. 일요일 아침엔 사이버캡에 서지(수요 급증) 요금까지 붙었습니다.',
  before: { label:'모델Y', big:'1분', sub:'9.51달러' },
  after: { label:'사이버캡', big:'30~40분', sub:'13.85달러(서지 포함)' },
  cards: [
    { icon:'⏱', big:'40배', mid:'대기시간 차이', sub:'토요일 밤 기준' },
    { icon:'💵', big:'+4.34달러', mid:'서지 요금 차', sub:'기본 요금은 더 낮음' },
    { icon:'🆕', big:'초기 단계', mid:'차량 대수 적음', sub:'수요가 공급 앞서' },
  ],
  quote: '"모두가 사이버캡을 타고 싶어 한다. 이런 상황이 이어지면 회사가 사이버캡을 더 늘려야 할 것"이라는 반응이 나왔습니다.',
  noteSub: '서지 요금은 호출이 몰릴 때 요금을 올려 수요·공급 균형을 맞추는 장치입니다. 새 차량 초기에는 흔히 공급이 수요를 못 따라가 대기시간이 길어집니다. 다음엔 오스틴 배치 대수가 늘면서 대기시간·요금이 얼마나 안정되는지 지켜보면 됩니다.',
  footer: '테슬라 · 사이버캡 수요',
}, {
  badge: 'TSLA', title: 'Cybercab wait times in Austin stretched far beyond Model Y, and surge pricing has already kicked in',
  heroIcon: '🚕', heroBig: '30-40 min',
  heroSub: 'That was the Saturday-night Cybercab wait time, versus just 1 minute for Model Y. By Sunday morning, surge pricing hit Cybercab too.',
  before: { label:'Model Y', big:'1 min', sub:'$9.51' },
  after: { label:'Cybercab', big:'30-40 min', sub:'$13.85 (with surge)' },
  cards: [
    { icon:'⏱', big:'40x', mid:'Wait-time gap', sub:'Saturday night data' },
    { icon:'💵', big:'+$4.34', mid:'Surge premium', sub:'Despite a lower base fare' },
    { icon:'🆕', big:'Early days', mid:'Few vehicles deployed', sub:'Demand outpacing supply' },
  ],
  quote: '"Everyone wants to ride the Cybercab. If this keeps up on weekends, they\u2019ll need to add more," one rider wrote.',
  noteSub: 'Surge pricing raises fares when demand spikes to balance supply. New-vehicle launches often see wait times stretch while fleets are small. Next: watch whether wait times and fares stabilize as Austin\u2019s fleet grows.',
  footer: 'Tesla · Cybercab demand',
});

add('vycap-spacex-10t', 'L1', 'SPCX', {
  badge: 'SPCX', title: '스페이스X 초기 투자자 바이캐피탈이 앞으로 5~7년 안에 기업가치 10조 달러를 넘길 것이라고 밝혔습니다',
  heroIcon: '🌌', heroBig: '10조 달러',
  heroSub: '바이캐피탈이 내놓은 스페이스X의 5~7년 뒤 기업가치 전망입니다. 이 회사는 2016년 150억 달러 가치일 때 처음 투자했습니다.',
  cards: [
    { icon:'📅', big:'2016년', mid:'첫 투자 시점', sub:'기업가치 150억 달러' },
    { icon:'📈', big:'3.4%', mid:'현재 보유 지분', sub:'약 400억 달러 규모' },
    { icon:'🔮', big:'5~7년', mid:'전망 시점', sub:'10조 달러 목표' },
  ],
  quote: '바이캐피탈은 일론 머스크를 "역사상 가장 위대한 엔지니어이자 기업가"라고 평가했습니다.',
  noteSub: '10조 달러는 지금 세계 최대 기업들의 몇 배에 이르는 규모로, 실현되면 지구에서 가장 가치 있는 회사가 됩니다. 다만 이는 비상장 회사 대주주의 자체 전망일 뿐 확정된 사실은 아닙니다. 다음 투자 라운드나 상장 때 실제 가치가 어떻게 매겨지는지 확인하면 됩니다.',
  footer: '스페이스X · 기업가치 전망',
}, {
  badge: 'SPCX', title: "Vy Capital says SpaceX will pass a $10 trillion valuation within the next 5 to 7 years",
  heroIcon: '🌌', heroBig: '$10T',
  heroSub: "That's Vy Capital's 5-to-7-year valuation forecast for SpaceX. The firm first invested in 2016 at a roughly $15B valuation.",
  cards: [
    { icon:'📅', big:'2016', mid:'First invested', sub:'At a $15B valuation' },
    { icon:'📈', big:'3.4%', mid:'Current stake', sub:'Worth about $40B' },
    { icon:'🔮', big:'5-7 yrs', mid:'Forecast horizon', sub:'$10T target' },
  ],
  quote: "Vy Capital called Elon Musk \"the greatest engineer and entrepreneur in history.\"",
  noteSub: "$10T would exceed today's largest public companies several times over, making SpaceX the most valuable company on Earth. But this is one major shareholder's own forecast for a private company, not a confirmed fact. Next: watch what valuation the next funding round or IPO actually sets.",
  footer: 'SpaceX · Valuation outlook',
});

add('gigatexas-robot-factory', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라의 텍사스 기가팩토리 로봇 공장 건설이 기록적인 속도로 진행되고 있는 항공 사진이 공개됐습니다',
  heroIcon: '🏗', heroBig: '기록적 속도',
  heroSub: '텍사스 기가팩토리 부지에 짓는 인간형 로봇 옵티머스 생산 공장입니다. 드론 촬영 영상에는 크레인이 철골을 빠르게 올리는 모습이 담겼습니다.',
  cards: [
    { icon:'🏭', big:'전용 공장', mid:'옵티머스 생산', sub:'자동차 공장 옆 부지' },
    { icon:'🏗', big:'크레인', mid:'철골 시공 중', sub:'뼈대가 상당 부분 완성' },
    { icon:'🚗', big:'F 차량', mid:'FSD 시험 차량', sub:'출고 대기 구역에 대거 포착' },
  ],
  quote: '"테슬라 로봇 공장이 기록적인 속도로 진행되고 있다"고 게시물은 설명했습니다.',
  noteSub: '공장은 로봇 대량 생산의 첫 단추입니다. 자동차 공장 바로 옆에 지으면 부품·전기 조달망을 함께 쓸 수 있어 시간과 비용을 아낄 수 있습니다. 다음엔 공장 가동 시작 시점과 초기 생산 목표가 얼마나 되는지 확인하면 됩니다.',
  footer: '테슬라 · 로봇 공장',
}, {
  badge: 'TSLA', title: "Aerial footage shows Tesla's Optimus robot factory at Giga Texas advancing at a record pace",
  heroIcon: '🏗', heroBig: 'Record pace',
  heroSub: "It's the Optimus humanoid-robot factory being built at the Giga Texas site. Drone footage shows cranes rapidly raising steel framing.",
  cards: [
    { icon:'🏭', big:'Dedicated plant', mid:'Optimus production', sub:'Next to the car factory' },
    { icon:'🏗', big:'Cranes', mid:'Steel underway', sub:'Frame largely up' },
    { icon:'🚗', big:'FSD test cars', mid:'Test vehicles', sub:'Clustered in the outbound lot' },
  ],
  quote: '"Tesla\u2019s robot factory is progressing at a record pace," the post said.',
  noteSub: "A factory is the first step toward mass-producing robots. Building next to the car plant lets Tesla share parts and power infrastructure, saving time and cost. Next: watch for the startup date and initial production targets.",
  footer: 'Tesla · Robot factory',
});

add('ms-semi-6x-profit', 'L2', 'TSLA', {
  badge: 'TSLA', title: '모건스탠리가 테슬라 세미 트럭이 운전자가 필요 없어지면 수익성이 6배로 커질 수 있다고 분석했습니다',
  heroIcon: '🚛', heroBig: '수익성 6배',
  heroSub: '증권사 모건스탠리가 자율주행 트럭 세미의 수익성 시나리오를 분석했습니다. 가동률 상승·비용 절감·소프트웨어 매출을 합친 결과입니다.',
  cards: [
    { label:'가동률', big:'2.3배', mid:'상승 가정', sub:'휴식 시간 제약 없음' },
    { label:'운영비', big:'-20%', mid:'마일당 절감', sub:'인건비 감소 반영' },
    { label:'SW 매출', big:'월 1.5만 달러', mid:'트럭 한 대당', sub:'완전자율주행 이용료' },
  ],
  detailHead: '6배 시나리오의 근거',
  detailLines: [
    '자율주행 트럭은 법정 휴식 없이 더 오래 달릴 수 있습니다.',
    '운전자가 없어지면 인건비가 크게 줄어듭니다.',
    '완전자율주행 소프트웨어 이용료가 매달 추가됩니다.',
  ],
  noteSub: '화물 운송업은 인건비 비중이 크고 운전자 휴식 시간이 법으로 정해져 있는 산업입니다. 이 분석은 자율주행이 완전히 적용된다는 가정 위의 시나리오이며, 아직 실현되지 않았습니다. 세미 트럭의 실제 자율주행 승인 진행 상황을 다음에 확인하면 됩니다.',
  footer: '테슬라 · 세미 트럭 분석',
}, {
  badge: 'TSLA', title: 'Morgan Stanley thinks the Tesla Semi could become 6x more profitable once it no longer needs a driver',
  heroIcon: '🚛', heroBig: '6x profit',
  heroSub: "That's Morgan Stanley's autonomy scenario for the Semi truck, combining higher utilization, lower costs, and software revenue.",
  cards: [
    { label:'Utilization', big:'2.3x', mid:'Assumed increase', sub:'No mandated rest breaks' },
    { label:'Operating cost', big:'-20%', mid:'Per mile', sub:'Reflects lower labor cost' },
    { label:'Software rev', big:'$15K/mo', mid:'Per truck', sub:'From FSD subscription' },
  ],
  detailHead: 'What underlies the 6x scenario',
  detailLines: [
    'Autonomous trucks can run longer without mandated rest breaks.',
    'Removing the driver sharply cuts labor costs.',
    'A monthly FSD software subscription adds recurring revenue.',
  ],
  noteSub: 'Trucking is a labor-heavy industry with legally mandated driver rest periods. This is a scenario assuming full autonomy, not something achieved yet. Next: watch how regulatory approval for autonomous Semi trucks progresses.',
  footer: 'Tesla · Semi truck analysis',
});

add('spacex-nasdaq100-weight', 'L5', 'SPCX', {
  badge: 'SPCX', title: '스페이스X의 나스닥100 잠정 비중이 1.28%에서 2.82%로 늘어날 예정이라는 소식이 나왔습니다',
  heroIcon: '📊', heroBig: '2.82%',
  heroSub: '이달 말 예정된 스페이스X의 나스닥100 잠정 비중입니다. 락업(보호예수) 해제가 겹치면 수십억 달러 규모 수동적 매수가 일어날 수 있습니다.',
  before: { label:'현재', big:'1.28%', sub:'나스닥100 잠정 비중' },
  after: { label:'이달 말', big:'2.82%', sub:'비중 확대 예정' },
  cards: [
    { icon:'🔓', big:'락업 해제', mid:'동시 진행', sub:'물량 출회 가능성' },
    { icon:'🤖', big:'패시브 매수', mid:'지수 추종 펀드', sub:'기계적 비중 맞춤' },
    { icon:'📈', big:'2배 이상', mid:'비중 증가율', sub:'1.28→2.82%' },
  ],
  quote: '블룸버그는 락업 해제와 지수 비중 확대가 겹치면 수십억 달러 규모 매수가 나올 수 있다고 보도했습니다.',
  noteSub: '락업(보호예수)은 일정 기간 주식을 못 팔게 막아 둔 약속으로, 기간이 끝나면 물량이 새로 시장에 나올 수 있습니다. 지수 추종 펀드는 비중이 커지면 그만큼 기계적으로 더 사야 합니다. 이달 말 실제 조정이 확정된 뒤 관련 거래량이 어떻게 움직이는지 다음에 확인하면 됩니다.',
  footer: '스페이스X · 지수 비중',
}, {
  badge: 'SPCX', title: "SpaceX's preliminary Nasdaq-100 weighting is set to rise to about 2.82% from about 1.28%",
  heroIcon: '📊', heroBig: '2.82%',
  heroSub: "That's SpaceX's preliminary Nasdaq-100 weighting due later this month. A lockup expiration overlapping it could trigger billions in passive buying.",
  before: { label:'Now', big:'1.28%', sub:'Preliminary Nasdaq-100 weight' },
  after: { label:'Later this month', big:'2.82%', sub:'Expected new weight' },
  cards: [
    { icon:'🔓', big:'Lockup expiry', mid:'Overlapping timing', sub:'More shares could hit market' },
    { icon:'🤖', big:'Passive buying', mid:'Index-tracking funds', sub:'Mechanical rebalancing' },
    { icon:'📈', big:'2x+', mid:'Weight increase', sub:'1.28% to 2.82%' },
  ],
  quote: 'Bloomberg reported that overlapping lockup expirations and index-weight increases could trigger billions in buying.',
  noteSub: 'A lockup is a promise not to sell shares for a set period; once it ends, more shares can hit the market. Index funds must mechanically buy more as a weighting rises. Next: watch trading volume once the reweighting is confirmed later this month.',
  footer: 'SpaceX · Index weighting',
});

add('tesla-xai-memphis-battery', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라가 xAI의 멤피스 부지에 메가팩 720대를 배치해 미국에서 가장 큰 그리드용 배터리를 지었다고 밝혔습니다',
  heroIcon: '🔋', heroBig: '720대',
  heroSub: 'xAI 데이터센터 부지에 설치된 테슬라 메가팩 대수입니다. 미국에서 가장 큰 전력망(그리드)용 배터리 저장 시설이라고 회사는 설명했습니다.',
  cards: [
    { icon:'🔋', big:'720대', mid:'메가팩 배치', sub:'테네시주 멤피스' },
    { icon:'⚡', big:'전력망 완충', mid:'순간 수요 흡수', sub:'데이터센터 전력 급증 대응' },
    { icon:'🤖', big:'xAI', mid:'그록 데이터센터', sub:'일론 머스크의 AI 회사' },
  ],
  quote: '메가팩은 전기를 미리 저장해 두고 필요할 때 한꺼번에 꺼내 쓰는 대형 배터리입니다.',
  noteSub: '인공지능 데이터센터는 전력 사용량이 순간적으로 크게 요동치는데, 이는 지역 전력망에 부담을 줄 수 있습니다. 메가팩 720대는 이 부담을 데이터센터 부지 안에서 먼저 흡수해 전력망 전체의 안정을 돕습니다. 메가팩 사업 매출 비중이 다음 실적에서 얼마나 커지는지 지켜보면 좋습니다.',
  footer: '테슬라 · 메가팩',
}, {
  badge: 'TSLA', title: "Tesla said it built the largest grid battery in the U.S. at xAI's Memphis site, with 720 Megapacks",
  heroIcon: '🔋', heroBig: '720 units',
  heroSub: "That's how many Tesla Megapacks were installed at xAI's data-center site. Tesla calls it the largest grid-scale battery in the U.S.",
  cards: [
    { icon:'🔋', big:'720', mid:'Megapacks deployed', sub:'Memphis, Tennessee' },
    { icon:'⚡', big:'Grid buffer', mid:'Absorbs power spikes', sub:'Smooths data-center draw' },
    { icon:'🤖', big:'xAI', mid:'Grok data center', sub:"Elon Musk's AI company" },
  ],
  quote: 'A Megapack stores electricity in advance so it can be released all at once when needed.',
  noteSub: "AI data centers see sudden swings in power draw that can strain a local grid. 720 Megapacks absorb that strain on-site, helping keep the broader grid stable. Watch how much the energy-storage business grows in Tesla's next earnings.",
  footer: 'Tesla · Megapack',
});

add('tesla-4680-charging', 'L3', 'TSLA', {
  badge: 'TSLA', title: '테슬라 자체 4680 배터리 셀이 500킬로와트 최고 충전 속도를 더 오래 유지하도록 개선됐습니다',
  heroIcon: '⚡', heroBig: '500킬로와트',
  heroSub: '테슬라 4680 배터리의 최고 충전 속도입니다. 이번 개선으로 이 속도를 더 오래 유지하며 잔량 10%에서 80%까지 채우는 시간이 몇 분 더 줄었습니다.',
  cards: [
    { icon:'🔋', big:'4680', mid:'자체 생산 셀', sub:'지름 46mm·높이 80mm' },
    { icon:'⏱', big:'10→80%', mid:'충전 시간 단축', sub:'몇 분 더 빨라짐' },
    { icon:'🛣', big:'분당 회복 마일', mid:'실도로 지표', sub:'체감 충전 속도 개선' },
  ],
  quote: '"최고 충전 속도뿐 아니라 실제 도로 여행에서 체감하는 회복 거리도 함께 늘었다"고 설명했습니다.',
  noteSub: '전기차는 배터리가 어느 정도 차오르면 보호를 위해 충전 속도가 자동으로 줄어드는 특성이 있습니다. 이번 개선은 그 최고 속도 구간을 더 오래 유지하는 데 초점을 맞췄습니다. 실제 차량에 이 개선이 무선 업데이트로 적용되는 시점을 다음에 확인하면 됩니다.',
  footer: '테슬라 · 4680 배터리',
}, {
  badge: 'TSLA', title: "Tesla's in-house 4680 battery cells got better at sustaining a 500 kW peak charge rate for longer",
  heroIcon: '⚡', heroBig: '500 kW',
  heroSub: "That's the 4680 battery's peak charge rate. The upgrade sustains it longer, shaving minutes off the 10%-to-80% charge time.",
  cards: [
    { icon:'🔋', big:'4680', mid:'In-house cell', sub:'46mm diameter, 80mm tall' },
    { icon:'⏱', big:'10\u219280%', mid:'Faster charging', sub:'A few minutes quicker' },
    { icon:'🛣', big:'Miles/min', mid:'Real-world metric', sub:'Better road-trip feel' },
  ],
  quote: '"It\u2019s not just the peak charge rate — real-world miles recovered per minute on road trips also improved."',
  noteSub: 'EV charging naturally slows down as the battery fills, to protect the cells. This upgrade focuses on holding peak speed longer before that slowdown. Next: watch for the over-the-air rollout to real vehicles.',
  footer: 'Tesla · 4680 battery',
});

};
