/* KR / Safe / KR-RE topics for 2026-09-14 */
module.exports = function registerTopics(add) {

add("summary-kr", "ROWS", "KOSPI", {
  headline: "2026.09.14 한국주식 한장 요약",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,910", title:"코스피가 6,909.91(−1.76%)로 마감하며 7,000선을 다시 내줬습니다",
      sub:"아스트라 효과로 7,000을 넘었다가 유가·금리 부담에 되돌림이 나왔습니다." },
    { color:"#22d3ee", fill:"#06171c", right:"FOMC", title:"이번 주 15~16일 미국 FOMC 결과가 17일 새벽 공개됩니다",
      sub:"인상 확률 추정은 증권사별로 57~87%로 차이가 큽니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"33%", title:"삼성전자 HBM 점유율이 21%에서 33%로 오르며 격차가 좁혀졌습니다",
      sub:"1위 SK하이닉스는 50%로 전분기(58%)보다 낮아졌습니다." },
    { color:"#f59e0b", fill:"#1a1205", right:"50%", title:"SK하이닉스는 HBM 점유율 50%로 1위를 지켰습니다",
      sub:"1년 전(64%)보다는 낮아졌지만 여전히 압도적 1위입니다." },
    { color:"#a78bfa", fill:"#180f28", right:"아스트라", title:"오픈AI의 'GPT-6 아스트라' 공개가 국내 반도체 투자심리를 살렸습니다",
      sub:"이 효과로 지난 9일 코스피가 한 달 반 만에 7,000선을 넘었습니다." },
    { color:"#4ade80", fill:"#061209", right:"엔솔", title:"LG에너지솔루션이 테슬라 메가팩 증설로 ESS 수주를 늘리고 있습니다",
      sub:"약 6조 원 규모 계약을 맺고 북미 ESS 생산능력을 키우고 있습니다." },
    { color:"#fb7185", fill:"#1a0a10", right:"2029", title:"현대차그룹이 2029년 자체 자율주행차 양산 계획을 밝혔습니다",
      sub:"2028년엔 엔비디아 기술을 먼저 적용하는 투 트랙 전략입니다." },
  ],
  caption: "더 볼 것: 코스피 6,910 · FOMC 9/17 · 삼성 HBM 33% · 하이닉스 50% · 엔솔 ESS · 현대차 2029",
}, {
  headline: "2026.09.14 Korea Market Snapshot",
  rows: [
    { color:"#38bdf8", fill:"#061520", right:"6,910", title:"KOSPI closed at 6,909.91 (−1.76%), losing the 7,000 level",
      sub:"AI-driven gains above 7,000 reversed on oil and yield pressure." },
    { color:"#22d3ee", fill:"#06171c", right:"FOMC", title:"This week's Sep 15-16 FOMC result lands early Sep 17 KST",
      sub:"Hike-odds estimates range widely, from 57% to 87% across brokers." },
    { color:"#60a5fa", fill:"#0a1420", right:"33%", title:"Samsung's HBM share jumped to 33% from 21%, narrowing the gap",
      sub:"Leader SK Hynix held 50%, down from 58% the prior quarter." },
    { color:"#f59e0b", fill:"#1a1205", right:"50%", title:"SK Hynix kept the No.1 HBM spot with a 50% share",
      sub:"Down from 64% a year ago, but still the dominant leader." },
    { color:"#a78bfa", fill:"#180f28", right:"Astra", title:"OpenAI's 'GPT-6 Astra' launch lifted Korean chip sentiment",
      sub:"It helped KOSPI clear 7,000 on Sep 9 for the first time in weeks." },
    { color:"#4ade80", fill:"#061209", right:"LGES", title:"LG Energy Solution wins more ESS orders on Tesla's Megapack",
      sub:"It signed a roughly ₩6T deal and is expanding North American ESS capacity." },
    { color:"#fb7185", fill:"#1a0a10", right:"2029", title:"Hyundai outlined a 2029 in-house autonomous-vehicle plan",
      sub:"A 2028 NVIDIA-based launch comes first under its two-track strategy." },
  ],
  caption: "Watch: KOSPI 6,910 · FOMC Sep 17 · Samsung HBM 33% · Hynix 50% · LGES ESS · Hyundai 2029",
});

add("samsung-hbm-share-up", "L1", "SEC", {
  badge: "삼성전자", title: "삼성전자 HBM 점유율이 21%에서 33%로 오르며 SK하이닉스와 격차가 17%포인트로 좁혀졌습니다",
  heroIcon: "💠", heroBig: "33%",
  heroSub: "2026년 2분기 글로벌 HBM(고대역폭메모리) 매출 점유율입니다. 1분기 21%보다 12%포인트 올랐습니다.",
  cards: [
    { icon:"📊", big:"33%", mid:"2분기 점유율", sub:"1분기는 21%" },
    { icon:"📉", big:"17%p", mid:"1위와 격차", sub:"1분기엔 37%p였음" },
    { icon:"🏭", big:"HBM4", mid:"하반기 확대", sub:"6세대 출하 본격화" },
  ],
  quote: "카운터포인트리서치는 이번 상승을 수율(불량 없이 만드는 비율) 개선과 공급 확대의 결과로 설명했습니다.",
  noteSub: "HBM은 인공지능 반도체와 함께 붙어 데이터를 빠르게 주고받는 특수 메모리입니다. 삼성전자가 수율을 끌어올려 실제로 팔 수 있는 물량이 늘었다는 뜻입니다. 다음 분기 HBM4 출하가 본격화될 때 점유율이 더 오르는지 확인하면 됩니다.",
  footer: "삼성전자 · HBM 점유율",
}, {
  badge: "SMSN", title: "Samsung's HBM market share jumped to 33% from 21%, narrowing the gap with SK Hynix to 17 points",
  heroIcon: "💠", heroBig: "33%",
  heroSub: "That's Samsung's Q2 2026 global HBM revenue share, up 12 points from 21% in Q1.",
  cards: [
    { icon:"📊", big:"33%", mid:"Q2 share", sub:"Q1 was 21%" },
    { icon:"📉", big:"17pp", mid:"Gap to leader", sub:"Was 37pp in Q1" },
    { icon:"🏭", big:"HBM4", mid:"H2 ramp", sub:"6th-gen output scaling up" },
  ],
  quote: "Counterpoint Research credited the jump to improved yields and expanded supply.",
  noteSub: "HBM sits right beside AI chips to move data fast. A better yield means Samsung can actually ship more units, not just design them. Next: watch whether share keeps rising as HBM4 output ramps this half.",
  footer: "Samsung · HBM share",
});

add("hynix-hbm-lead", "L5", "HYNIX", {
  badge: "SK하이닉스", title: "SK하이닉스가 HBM 점유율 50%로 1위를 지켰지만 전분기 58%보다는 낮아졌습니다",
  heroIcon: "🥇", heroBig: "50%",
  heroSub: "2026년 2분기 HBM 매출 점유율로 여전히 1위입니다. 1분기 58%, 1년 전 64%와 비교하면 낮아진 수치입니다.",
  before: { label:"1분기", big:"58%", sub:"SK하이닉스 점유율" },
  after: { label:"2분기", big:"50%", sub:"SK하이닉스 점유율" },
  cards: [
    { icon:"🥇", big:"1위 유지", mid:"압도적 선두", sub:"삼성전자 33%" },
    { icon:"📦", big:"물량 증가", mid:"시장 전체 성장", sub:"파이가 커지는 중" },
    { icon:"🔬", big:"HBM4 검증", mid:"다음 라운드", sub:"양산 경쟁 승부처" },
  ],
  quote: "점유율 하락은 시장 전체가 커지는 가운데 삼성전자가 성장분을 더 많이 가져간 결과로 풀이됩니다.",
  noteSub: "SK하이닉스는 엔비디아의 주요 HBM 협력사로 먼저 신제품을 검증받아 온 위치를 지켜 왔습니다. 매출 자체가 줄어든 게 아니라 상대적 비중이 줄어든 것입니다. 다음엔 HBM4 신제품을 먼저 대량 공급하는 데 성공하는지가 확인 포인트입니다.",
  footer: "SK하이닉스 · HBM 점유율",
}, {
  badge: "HYNIX", title: "SK Hynix held the No.1 HBM spot with a 50% share, down from 58% the prior quarter",
  heroIcon: "🥇", heroBig: "50%",
  heroSub: "That's SK Hynix's Q2 2026 HBM revenue share — still No.1, though down from 58% in Q1 and 64% a year ago.",
  before: { label:"Q1", big:"58%", sub:"SK Hynix share" },
  after: { label:"Q2", big:"50%", sub:"SK Hynix share" },
  cards: [
    { icon:"🥇", big:"Still No.1", mid:"Clear leader", sub:"Samsung at 33%" },
    { icon:"📦", big:"Market growing", mid:"Overall pie expands", sub:"Not a revenue decline" },
    { icon:"🔬", big:"HBM4 next", mid:"Next battleground", sub:"Production-ramp race" },
  ],
  quote: "The share drop reflects Samsung capturing more of the market's growth, not SK Hynix losing revenue.",
  noteSub: "SK Hynix has been NVIDIA's lead HBM partner, validating new products first. Its revenue base hasn't shrunk — its relative share has. Next: watch whether it wins the race to ship HBM4 at scale first.",
  footer: "SK Hynix · HBM share",
});

add("kospi-fomc-week", "L2", "KOSPI", {
  badge: "코스피", title: "코스피가 이번 주 FOMC와 유가·금리 삼중 변수를 앞두고 6,400~7,400 밴드에서 힘겨루기를 이어갈 전망입니다",
  heroIcon: "📊", heroBig: "6,400~7,400",
  heroSub: "증권사가 제시한 이번 주 코스피 예상 범위입니다. 지난 금요일 종가는 6,909.91(−1.76%)이었습니다.",
  cards: [
    { label:"지난 금요일", big:"6,909.91", mid:"−1.76%", sub:"7,000선 재차 이탈" },
    { label:"이번 주 일정", big:"FOMC", mid:"9/15~16", sub:"결과 17일 새벽" },
    { label:"인상 확률", big:"57~87%", mid:"증권사별 차이", sub:"CME 페드워치 기준" },
  ],
  detailHead: "이번 주 코스피를 흔드는 세 가지",
  detailLines: [
    "미국 FOMC 점도표·의장 발언이 매파적인지 비둘기파적인지가 핵심입니다.",
    "국제유가가 배럴당 100달러 위에서 안정되는지가 부담을 좌우합니다.",
    "미 10년물 금리가 4.9%대에서 더 오르는지 지켜봐야 합니다.",
  ],
  noteSub: "금리가 오르면 미래 기업이익의 지금 가치가 낮게 평가돼 성장주가 눌립니다. 오픈AI의 아스트라 공개로 살아난 반도체 투자심리가 이 부담을 얼마나 견디는지가 관전 포인트입니다. FOMC 결과 발표 직후 반응을 확인하면 다음 방향이 보입니다.",
  footer: "코스피 · 이번 주 전망",
}, {
  badge: "KOSPI", title: "KOSPI is expected to fight for direction in a 6,400-7,400 band this week as the Fed, oil and yields collide",
  heroIcon: "📊", heroBig: "6,400-7,400",
  heroSub: "That's the brokerage-forecast range for this week. Friday's close was 6,909.91 (-1.76%).",
  cards: [
    { label:"Last Friday", big:"6,909.91", mid:"-1.76%", sub:"Lost 7,000 again" },
    { label:"This week", big:"FOMC", mid:"Sep 15-16", sub:"Result early Sep 17" },
    { label:"Hike odds", big:"57-87%", mid:"Wide broker range", sub:"Per CME FedWatch" },
  ],
  detailHead: "Three things moving KOSPI this week",
  detailLines: [
    "Whether the Fed's dot plot and chair's tone read hawkish or dovish.",
    "Whether oil stabilizes above $100 a barrel or keeps climbing.",
    "Whether the 10-year yield pushes past its recent 4.9% level.",
  ],
  noteSub: "Higher rates discount future earnings more heavily, pressuring growth names. The chip-sentiment lift from OpenAI's Astra launch is being tested against that pressure. Next: watch the market's reaction right after the FOMC decision.",
  footer: "KOSPI · This week's outlook",
});

add("gpt6-astra-ai-capex", "L4", "AI", {
  badge: "코스피", badgeLine: "\"아스트라 공개 이후 반도체 투자심리가 살아났습니다\"",
  title: "오픈AI의 새 모델 'GPT-6 아스트라' 공개가 국내 반도체 투자심리를 살려 코스피를 7000선으로 밀어 올렸습니다",
  heroIcon: "🤖", heroBig: "7,000선",
  heroSub: "아스트라 공개 이후 인공지능 설비투자 기대가 커지며 코스피가 지난 9일 한 달 반 만에 7,000선을 넘었습니다. 이후 유가·금리 부담으로 되돌림이 나왔습니다.",
  cards: [
    { icon:"🚀", big:"모델 공개", mid:"오픈AI 아스트라", sub:"설비투자 기대 확산" },
    { icon:"📈", big:"7/23 이후", mid:"약 한 달 반 만", sub:"9일 7,000선 회복" },
    { icon:"↩️", big:"되돌림", mid:"유가·금리 부담", sub:"6,909.91로 마감" },
  ],
  quote: "새 인공지능 모델이 나올 때마다 이를 학습·운영할 반도체·데이터센터 투자 기대가 함께 커지는 경우가 많습니다.",
  noteSub: "한국은 세계 메모리 반도체 시장에서 큰 비중을 차지해, 해외 인공지능 회사의 신제품 발표가 국내 증시에 직접 영향을 줍니다. 이번 기대감이 실제 반도체 수주로 이어지는지가 다음 확인 포인트입니다. 아스트라 효과가 이번 주 FOMC 이후 다시 살아나는지 지켜보면 됩니다.",
  footer: "코스피 · AI 투자심리",
}, {
  badge: "KOSPI", badgeLine: "\"Chip sentiment revived after the Astra reveal\"",
  title: "OpenAI's new 'GPT-6 Astra' model lifted Korean chip sentiment and pushed KOSPI above 7,000",
  heroIcon: "🤖", heroBig: "7,000",
  heroSub: "AI capex hopes grew after the Astra reveal, helping KOSPI clear 7,000 on Sep 9 for the first time in about six weeks, before oil and rate pressure pulled it back.",
  cards: [
    { icon:"🚀", big:"New model", mid:"OpenAI's Astra", sub:"Capex optimism spreads" },
    { icon:"📈", big:"Since Jul 23", mid:"About six weeks", sub:"7,000 regained Sep 9" },
    { icon:"↩️", big:"Pullback", mid:"Oil and rate pressure", sub:"Closed at 6,909.91" },
  ],
  quote: "Each new AI model release tends to lift expectations for the chips and data centers needed to run it.",
  noteSub: "Korea's large share of the global memory-chip market means overseas AI announcements feed directly into local stocks. Next: watch whether this optimism turns into real chip orders. Also watch if the Astra effect revives once this week's FOMC uncertainty clears.",
  footer: "KOSPI · AI sentiment",
});

add("lges-tesla-megapack-ess", "L3", "TSLA", {
  badge: "LG에너지솔루션", title: "테슬라 메가팩 증설 훈풍에 LG에너지솔루션·삼성SDI가 북미 ESS 시장으로 성장 축을 옮기고 있습니다",
  heroIcon: "🔋", heroBig: "약 6조 원",
  heroSub: "LG에너지솔루션이 테슬라와 맺은 ESS(에너지저장장치) 배터리 공급 계약 규모입니다. 연내 북미에서 50GWh 이상의 생산능력을 확보할 계획입니다.",
  cards: [
    { icon:"📈", big:"4.6배", mid:"ESS 매출 성장", sub:"1년 전 대비 2분기 기준" },
    { icon:"🏭", big:"5곳", mid:"북미 생산 거점", sub:"미시간주 등으로 확대" },
    { icon:"🔄", big:"라인 전환", mid:"전기차→ESS", sub:"캐즘 보완 전략" },
  ],
  quote: "전기차 수요 정체(캐즘) 국면을 ESS 사업이 보완하는 흐름이 이어지고 있습니다.",
  noteSub: "ESS는 전기를 미리 저장해 뒀다가 필요할 때 꺼내 쓰는 대형 배터리 시스템입니다. 인공지능 데이터센터 확산으로 이 수요가 새롭게 커지고 있습니다. 다음 실적 발표에서 ESS 매출 비중이 계속 늘어나는지 확인하면 됩니다.",
  footer: "LG에너지솔루션 · ESS",
}, {
  badge: "LGES", title: "Tesla's Megapack expansion is pulling LG Energy Solution and Samsung SDI toward North American ESS growth",
  heroIcon: "🔋", heroBig: "~₩6T",
  heroSub: "That's LG Energy Solution's ESS battery supply deal with Tesla. It plans 50+ GWh of North American ESS capacity by year-end.",
  cards: [
    { icon:"📈", big:"4.6x", mid:"ESS revenue growth", sub:"Q2 vs. a year earlier" },
    { icon:"🏭", big:"5 sites", mid:"North American plants", sub:"Expanding into Michigan, etc." },
    { icon:"🔄", big:"Line conversion", mid:"EV to ESS", sub:"Offsetting the EV chasm" },
  ],
  quote: "ESS is helping offset the slowdown (chasm) in EV battery demand.",
  noteSub: "ESS stores electricity in advance so it can be released when needed. Demand is growing fast as AI data centers spread. Next: watch whether ESS revenue share keeps climbing in the next earnings report.",
  footer: "LG Energy Solution · ESS",
});

add("hyundai-autonomous-2029", "L6", "AUTO", {
  badge: "BREAKING", breaking: "현대차 자율주행 투 트랙",
  title: "현대차그룹이 2028년 엔비디아 기술을 먼저 쓰고 2029년 자체 개발 자율주행차를 양산하는 투 트랙 전략을 밝혔습니다",
  heroBig: "2029년",
  heroSub: "자체 자율주행 '아트리아 AI' 양산 목표 시점입니다. 2028년엔 엔비디아 기술 차량을 먼저 냅니다.",
  grid: [
    { icon:"🅰️", big:"아트리아 AI", mid:"자체 기술", sub:"포티투닷과 공동 개발" },
    { icon:"🖥", big:"엔비디아", mid:"2028년 먼저", sub:"검증된 기술 우선 적용" },
    { icon:"🚗", big:"레벨 2++", mid:"도심 핸즈프리", sub:"2029년 하반기 목표" },
    { icon:"📊", big:"5년 내", mid:"데이터 추월 목표", sub:"제조 역량으로 승부" },
  ],
  ctx1: "포티투닷은 \"양산이 시작되면 5년 안에 데이터양을 추월할 수 있다\"고 말했습니다.",
  ctx2: "지금은 자율주행 전용차가 10~20대 수준이지만 SDV 페이스카 공개 후 크게 늘어날 전망입니다.",
  quote: "\"눈앞의 것을 빨리하려다 인력이 소진되는 실패를 피하려고 투 트랙을 택했다\"고 설명했습니다.",
  noteSub: "검증된 외부 기술로 먼저 시장에 진입하고 그 사이 자체 기술을 완성하는 전략입니다. 현대차그룹은 대량 생산 능력이 강해 데이터 축적 속도에서 유리할 수 있습니다. 2028년 첫 출시 모델과 실제 주행 데이터가 다음 확인 포인트입니다.",
  footer: "현대차 · 자율주행 전략",
}, {
  badge: "BREAKING", breaking: "HYUNDAI TWO-TRACK AV",
  title: "Hyundai Motor Group plans to launch NVIDIA-based autonomous vehicles in 2028, then its own tech in 2029",
  heroBig: "2029",
  heroSub: "That's the mass-production target for Atria AI, its in-house system.",
  grid: [
    { icon:"🅰️", big:"Atria AI", mid:"In-house tech", sub:"Co-developed with 42dot" },
    { icon:"🖥", big:"NVIDIA", mid:"First, in 2028", sub:"Proven tech deployed early" },
    { icon:"🚗", big:"Level 2++", mid:"Hands-free in cities", sub:"H2 2029 target" },
    { icon:"📊", big:"5-yr goal", mid:"Data catch-up plan", sub:"Leaning on manufacturing scale" },
  ],
  ctx1: "42dot said mass output could beat rivals' data within 5 years.",
  ctx2: "Only 10-20 test vehicles run today, but the fleet should grow once the SDV pace car debuts.",
  quote: "\"We chose two tracks to avoid burning out the team by rushing the near-term goal,\" the company said.",
  noteSub: "The plan enters the market early with proven outside tech while finishing in-house tech in parallel. Hyundai's manufacturing scale could give it an edge in accumulating driving data. Next: watch the 2028 launch model and real-world driving data.",
  footer: "Hyundai · AV strategy",
});

add("summary-safe", "ROWS", "BTC", {
  headline: "2026.09.14 안전자산 한장 요약",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$77K", title:"비트코인이 7만 7천 달러권에서 이번 주 FOMC를 기다립니다",
      sub:"코인마켓캡 7만 7,255달러, OKX 기준 7만 6,985달러로 갈렸습니다." },
    { color:"#818cf8", fill:"#15162a", right:"$2,505", title:"이더리움이 2,505달러로 비트코인보다 더 크게 밀렸습니다",
      sub:"비트코인 점유율은 커지고 이더리움 점유율은 낮아졌습니다." },
    { color:"#facc15", fill:"#1a1600", right:"$4,330", title:"금이 실질금리 부담에도 4,330~4,350달러권을 지키고 있습니다",
      sub:"미 10년물 금리 4.96%, 중동 긴장이 하락을 막고 있습니다." },
    { color:"#f97316", fill:"#1a0d02", right:"$100", title:"국제유가가 호르무즈 기대에 2%대 내렸지만 100달러대를 지킵니다",
      sub:"브렌트 104.61달러, WTI 100.05달러로 마감했습니다." },
    { color:"#a78bfa", fill:"#180f28", right:"국채", title:"코인베이스 CEO \"스테이블코인은 미 국채 구조적 매수자\"",
      sub:"준비금의 상당 부분이 미국 단기 국채로 몰리고 있습니다." },
    { color:"#94a3b8", fill:"#111827", right:"FOMC", title:"이번 주 FOMC 결과가 안전자산 전체의 다음 방향을 정합니다",
      sub:"17일 새벽 결과가 공개되며 달러·금리 반응이 핵심입니다." },
  ],
  caption: "더 볼 것: BTC $77K · ETH $2,505 · 금 $4,330 · 유가 $100 · 스테이블코인 국채 · FOMC 9/17",
}, {
  headline: "2026.09.14 Safe Assets Snapshot",
  rows: [
    { color:"#f7931a", fill:"#1a0f00", right:"$77K", title:"Bitcoin slipped near $77K awaiting this week's FOMC",
      sub:"CoinMarketCap showed $77,255; OKX showed $76,985." },
    { color:"#818cf8", fill:"#15162a", right:"$2,505", title:"Ether underperformed Bitcoin, falling to about $2,505",
      sub:"Bitcoin's market share rose while Ether's edged lower." },
    { color:"#facc15", fill:"#1a1600", right:"$4,330", title:"Gold held $4,330-4,350 despite rising real yields",
      sub:"The 10-year yield hit 4.96%; Mideast tension is capping the drop." },
    { color:"#f97316", fill:"#1a0d02", right:"$100", title:"Oil fell about 2% on Hormuz talks but held above $100",
      sub:"Brent settled at $104.61, WTI at $100.05." },
    { color:"#a78bfa", fill:"#180f28", right:"Treasuries", title:"Coinbase's CEO: stablecoins are structural Treasury buyers",
      sub:"Much of their reserves sit in short-term Treasuries." },
    { color:"#94a3b8", fill:"#111827", right:"FOMC", title:"This week's FOMC will set the tone for safe assets",
      sub:"The result lands early Sep 17; the dollar and rate reaction matter most." },
  ],
  caption: "Watch: BTC $77K · ETH $2,505 · gold $4,330 · oil $100 · stablecoin Treasuries · FOMC Sep 17",
});

add("btc-77k-monday", "L1", "BTC", {
  badge: "비트코인", title: "비트코인이 7만 7천 달러 선 아래로 내려오며 이번 주 FOMC를 기다리고 있습니다",
  heroIcon: "₿", heroBig: "7만 7천 달러",
  heroSub: "월요일 새벽 코인마켓캡 기준 시세입니다. 오전 중 OKX 기준으로는 7만 6,985달러까지 내려 7만 7천 달러 선을 밑돌았습니다.",
  cards: [
    { icon:"📊", big:"−0.19%", mid:"하루 등락률", sub:"거래소마다 시세 차이" },
    { icon:"📉", big:"이더리움", mid:"더 크게 하락", sub:"−0.56~1.6%" },
    { icon:"🏦", big:"FOMC", mid:"이번 주 최대 변수", sub:"17일 새벽 결과" },
  ],
  quote: "일부 이용자는 파생상품 거래량이 늘어난 점을 두고 단기 매매 수요가 커졌다고 짚었습니다.",
  noteSub: "비트코인 점유율(전체 가상자산 중 비중)이 커지고 이더리움 점유율은 낮아졌습니다. 금리가 오르면 이자 없는 자산인 비트코인의 기회비용이 커져 부담이 됩니다. FOMC 결과가 나온 뒤 7만 7천 달러 선을 다시 회복하는지 확인하면 됩니다.",
  footer: "비트코인 · 시세",
}, {
  badge: "BTC", title: "Bitcoin slipped below $77,000 as markets await this week's FOMC decision",
  heroIcon: "₿", heroBig: "$77,000",
  heroSub: "That was the CoinMarketCap price early Monday. By mid-morning, OKX showed it dipping to $76,985, below the $77K level.",
  cards: [
    { icon:"📊", big:"-0.19%", mid:"Daily move", sub:"Prices vary by exchange" },
    { icon:"📉", big:"Ether", mid:"Fell further", sub:"-0.56% to -1.6%" },
    { icon:"🏦", big:"FOMC", mid:"Biggest risk this week", sub:"Result early Sep 17" },
  ],
  quote: "Some users flagged rising derivatives volume as a sign of growing short-term trading demand.",
  noteSub: "Bitcoin's share of the total crypto market rose while Ether's share slipped. Higher rates raise the opportunity cost of holding a no-yield asset like Bitcoin. Next: watch whether it retakes $77K once the FOMC result lands.",
  footer: "Bitcoin · Price",
});

add("gold-4330-real-yield", "L5", "GOLD", {
  badge: "금", title: "금값이 온스당 4,330~4,350달러권에서 실질금리 상승 부담과 안전자산 수요 사이에서 힘겨루기를 하고 있습니다",
  heroIcon: "🥇", heroBig: "$4,330~4,350",
  heroSub: "국제 금값 구간입니다. 미 10년물 금리 4.96%·실질금리 2.3%대가 부담이지만 중동 긴장이 하락을 막고 있습니다.",
  before: { label:"지지선", big:"$4,300", sub:"단기 하단" },
  after: { label:"저항선", big:"$4,350~4,400", sub:"단기 상단" },
  cards: [
    { icon:"📈", big:"4.96%", mid:"미 10년물 금리", sub:"금값에는 부담" },
    { icon:"🌍", big:"중동 긴장", mid:"안전자산 수요", sub:"하락 상쇄 요인" },
    { icon:"💵", big:"DXY 99", mid:"달러인덱스", sub:"중립적 구간" },
  ],
  quote: "금은 이자를 주지 않는 자산이라 실질금리가 오르면 매력이 떨어지는 성격을 갖고 있습니다.",
  noteSub: "그런데도 지정학적 긴장과 재정 우려로 안전자산 수요가 실질금리 부담을 상쇄하고 있습니다. 이번 주 FOMC에서 매파적 신호가 나오면 금값에 추가 부담이 될 수 있습니다. 4,300달러 지지선과 4,400달러 저항선 중 어느 쪽이 먼저 뚫리는지 확인하면 됩니다.",
  footer: "금 · 시세 구간",
}, {
  badge: "GOLD", title: "Gold is holding around $4,330-4,350/oz, caught between rising real yields and safe-haven demand",
  heroIcon: "🥇", heroBig: "$4,330-4,350",
  heroSub: "That's the current gold range. A 4.96% 10-year yield and 2.3% real yield are headwinds, but Mideast tension is limiting the drop.",
  before: { label:"Support", big:"$4,300", sub:"Near-term floor" },
  after: { label:"Resistance", big:"$4,350-4,400", sub:"Near-term ceiling" },
  cards: [
    { icon:"📈", big:"4.96%", mid:"10-yr Treasury yield", sub:"A headwind for gold" },
    { icon:"🌍", big:"Mideast tension", mid:"Safe-haven demand", sub:"Offsetting the pressure" },
    { icon:"💵", big:"DXY ~99", mid:"Dollar index", sub:"A neutral zone" },
  ],
  quote: "Gold pays no yield, so it typically loses appeal when real interest rates rise.",
  noteSub: "Even so, geopolitical tension and fiscal worries are offsetting that real-yield pressure. A hawkish FOMC signal this week could add further pressure. Next: watch whether $4,300 support or $4,400 resistance breaks first.",
  footer: "Gold · Price range",
});

add("eth-2500-underperform", "L4", "ETH", {
  badge: "이더리움", badgeLine: "\"비트코인보다 더 크게 밀린 알트코인 약세\"",
  title: "이더리움이 2,500달러권에서 비트코인보다 더 크게 밀리며 약세를 보였습니다",
  heroIcon: "Ξ", heroBig: "$2,505",
  heroSub: "월요일 새벽 이더리움 시세로, 0.56%에서 최대 1.6%까지 내려 비트코인(−0.19%)보다 더 크게 밀렸습니다.",
  cards: [
    { icon:"📉", big:"−1.6%", mid:"국내 시장 기준", sub:"338만 원 안팎" },
    { icon:"📊", big:"점유율 하락", mid:"비트코인 강세", sub:"자금 이동 신호" },
    { icon:"⚡", big:"파생상품", mid:"거래량 증가", sub:"단기 매매 수요" },
  ],
  quote: "시장이 불안하거나 방향이 뚜렷하지 않을 때 투자자들이 상대적으로 안전한 비트코인 쪽으로 옮기는 경향이 있습니다.",
  noteSub: "이더리움은 결제 수단을 넘어 디파이·NFT 등 다양한 서비스가 돌아가는 플랫폼입니다. 비트코인보다 가격 변동성(베타)이 크다는 특성도 이번 약세에 영향을 줬습니다. 이더리움 위 스테이블코인·디파이 이용량이 가격과 별개로 늘어나는지 지켜보면 좋습니다.",
  footer: "이더리움 · 시세",
}, {
  badge: "ETH", badgeLine: "\"Ether underperformed Bitcoin in this pullback\"",
  title: "Ether underperformed Bitcoin, slipping to around $2,505 as its market share edged lower",
  heroIcon: "Ξ", heroBig: "$2,505",
  heroSub: "That was Monday's early price, down 0.56% to 1.6% — a bigger drop than Bitcoin's -0.19%.",
  cards: [
    { icon:"📉", big:"-1.6%", mid:"Domestic exchange", sub:"About ₩3.38M" },
    { icon:"📊", big:"Share drop", mid:"Bitcoin strength", sub:"Signals capital rotation" },
    { icon:"⚡", big:"Derivatives", mid:"Volume rising", sub:"More short-term trading" },
  ],
  quote: "When markets get uncertain, traders tend to rotate toward the relatively safer Bitcoin.",
  noteSub: "Ether is more than a payment token — it's a platform for DeFi and NFTs. Its higher volatility (beta) versus Bitcoin also played into this pullback. Next: watch whether on-chain stablecoin and DeFi activity keeps growing regardless of price.",
  footer: "Ether · Price",
});

add("oil-100-hormuz", "L2", "OIL", {
  badge: "원유", title: "국제유가가 호르무즈 협상 기대에 2%대 내렸지만 여전히 배럴당 100달러대를 지키고 있습니다",
  heroIcon: "🛢", heroBig: "$100/배럴",
  heroSub: "WTI 종가로 지난 금요일 2.37% 내렸습니다. 브렌트유는 104.61달러로 6거래일 만에 하락 마감했습니다.",
  cards: [
    { label:"브렌트유", big:"$104.61", mid:"−2.81%", sub:"6거래일 만에 하락" },
    { label:"WTI", big:"$100.05", mid:"−2.37%", sub:"9거래일 만에 하락" },
    { label:"이번 주", big:"+8%", mid:"주간 상승률", sub:"하루 내림 전 기준" },
  ],
  detailHead: "왜 유가가 내렸나",
  detailLines: [
    "걸프협력회의 6개국과 이란이 호르무즈 해협 통항 임시 합의를 추진 중입니다.",
    "2월 갈등 이후 양측 고위급이 한자리에 모인 것은 이번이 처음입니다.",
    "다만 이번 주 오른 8% 상승분이 하루 내림으로 다 꺾인 것은 아닙니다.",
  ],
  noteSub: "유가는 올여름 최저점(68.55달러)에서 지금까지 약 50% 급등했습니다. 4월 전쟁 기간 최고가(112.95달러)보다는 여전히 낮은 수준입니다. 호르무즈 임시 합의가 실제로 성사되는지가 다음 유가 방향을 정할 핵심 확인 포인트입니다.",
  footer: "원유 · 국제유가",
}, {
  badge: "OIL", title: "Oil fell about 2% on hopes for a Hormuz Strait deal but is still holding above $100 a barrel",
  heroIcon: "🛢", heroBig: "$100/bbl",
  heroSub: "WTI settled down 2.37% Friday. Brent fell 2.81% to $104.61, its first down day in six sessions.",
  cards: [
    { label:"Brent", big:"$104.61", mid:"-2.81%", sub:"First drop in 6 sessions" },
    { label:"WTI", big:"$100.05", mid:"-2.37%", sub:"First drop in 9 sessions" },
    { label:"This week", big:"+8%", mid:"Weekly gain", sub:"Before Friday's dip" },
  ],
  detailHead: "Why oil pulled back",
  detailLines: [
    "GCC's six nations and Iran are pursuing an interim Hormuz transit deal.",
    "It's the first high-level meeting between the two sides since February.",
    "The week's 8% rally wasn't erased by one day's decline.",
  ],
  noteSub: "Oil has surged roughly 50% from this summer's low of $68.55. It's still below April's wartime peak of $112.95. Next: watch whether the interim Hormuz deal is actually finalized — that will set the next direction for prices.",
  footer: "Oil · Prices",
});

add("stablecoin-treasury-buyer", "L3", "POLICY", {
  badge: "달러", title: "코인베이스 최고경영자가 규제된 스테이블코인이 이제 미국 국채의 '구조적 매수자'가 됐다고 밝혔습니다",
  heroIcon: "💵", heroBig: "구조적 매수자",
  heroSub: "코인베이스 CEO의 표현입니다. 스테이블코인 발행사는 발행량만큼의 달러 준비금을 보관해야 하는데, 그 상당 부분이 미국 국채입니다.",
  cards: [
    { icon:"🪙", big:"1:1 준비금", mid:"발행량=보관금", sub:"현금·단기 국채로 보관" },
    { icon:"🏛", big:"국채 매수", mid:"정부 자금조달", sub:"새로운 매수층 등장" },
    { icon:"🔗", big:"연결 강화", mid:"가상자산↔채권", sub:"양방향 영향 관계" },
  ],
  quote: "스테이블코인 시장이 커질수록 준비금으로 미국 국채를 사들이는 수요도 함께 계속 늘어납니다.",
  noteSub: "스테이블코인은 1개당 항상 1달러 가치를 유지하도록 관리되는 가상자산입니다. 시장이 커질수록 준비금도 커지고, 그 상당 부분이 안전한 미국 단기 국채로 몰립니다. 발행사들이 공개하는 준비금 내역에서 국채 비중이 얼마나 되는지 확인하면 됩니다.",
  footer: "달러 · 스테이블코인",
}, {
  badge: "USD", title: "Coinbase's CEO says regulated stablecoins are now \"structural buyers\" of U.S. government debt",
  heroIcon: "💵", heroBig: "Structural buyer",
  heroSub: "Stablecoin issuers must hold dollar reserves matching every coin issued, and much of that sits in U.S. Treasuries.",
  cards: [
    { icon:"🪙", big:"1:1 reserves", mid:"Issuance = backing", sub:"Held in cash and T-bills" },
    { icon:"🏛", big:"Treasury buying", mid:"Government funding", sub:"A new class of buyer" },
    { icon:"🔗", big:"Tighter link", mid:"Crypto & bond markets", sub:"A two-way relationship" },
  ],
  quote: "As the stablecoin market grows, so does its reserve-driven demand for U.S. Treasuries.",
  noteSub: "A stablecoin is designed to always hold $1 of value per coin. As the market grows, so do reserves, much of which sits in safe short-term Treasuries. Next: check issuer disclosures for exactly how much of their reserves are Treasuries.",
  footer: "USD · Stablecoins",
});

add("summary-krre", "ROWS", "JEONSE", {
  headline: "2026.09.14 한국부동산 한장 요약",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"−12.2%", title:"서울 전세 매물이 1년 새 12.2% 줄어 2만 357건에 그쳤습니다",
      sub:"노도강·중랑 등 외곽 지역에서 감소 폭이 가장 컸습니다." },
    { color:"#a78bfa", fill:"#180f28", right:"−60%", title:"8월 서울 아파트 매매가 2,322건으로 전월보다 60% 급감했습니다",
      sub:"강남3구 거래 비중이 9.1%로 역대 최저치를 기록했습니다." },
    { color:"#a78bfa", fill:"#180f28", right:"−34.8%", title:"8월 토지거래허가 신청이 3,012건으로 34.8% 줄었습니다",
      sub:"토허구역 지정 이후 월간 기준 가장 낮은 수치입니다." },
    { color:"#fb923c", fill:"#1a0d02", right:"160만", title:"전세의 월세화가 빨라지며 서울 월세가 160만 원대에 이르렀습니다",
      sub:"세제개편안 발표 이후 집주인들의 절세 전환이 늘었습니다." },
    { color:"#60a5fa", fill:"#0a1420", right:"7.1억", title:"8월 서울 평균 전셋값 7억 1,178만 원으로 또 최고치입니다",
      sub:"7월 처음 7억 원을 넘긴 뒤 계속 최고치를 갈아치우고 있습니다." },
  ],
  caption: "더 볼 것: 전세 매물 −12.2% · 매매 −60% · 토허 −34.8% · 월세 160만 · 전셋값 7.1억",
}, {
  headline: "2026.09.14 Korea Real Estate Snapshot",
  rows: [
    { color:"#fb923c", fill:"#1a0d02", right:"-12.2%", title:"Seoul jeonse listings fell 12.2% YoY to 20,357",
      sub:"Outer districts like Nowon and Jungnang saw the sharpest drops." },
    { color:"#a78bfa", fill:"#180f28", right:"-60%", title:"Seoul apartment sales plunged 60% MoM to 2,322 units",
      sub:"Gangnam 3's transaction share hit a record-low 9.1%." },
    { color:"#a78bfa", fill:"#180f28", right:"-34.8%", title:"Land-permit applications fell 34.8% to 3,012 in August",
      sub:"The lowest monthly total since the district-wide designation." },
    { color:"#fb923c", fill:"#1a0d02", right:"₩1.6M", title:"Faster jeonse-to-rent shift pushed Seoul rent to ₩1.6M",
      sub:"Landlords are converting units after the new tax overhaul." },
    { color:"#60a5fa", fill:"#0a1420", right:"₩712M", title:"August's Seoul jeonse price hit a record ₩711.78M",
      sub:"It first topped ₩700M in July and keeps climbing." },
  ],
  caption: "Watch: jeonse -12.2% · sales -60% · permits -34.8% · rent ₩1.6M · jeonse price ₩712M",
});

add("jeonse-listing-down12", "L1", "JEONSE", {
  badge: "전세", title: "서울 아파트 전세 매물이 1년 새 12.2% 줄며 노도강·중랑 등 외곽 지역에서 감소가 가장 컸습니다",
  heroIcon: "🏠", heroBig: "2만 357건",
  heroSub: "이달 기준 서울 아파트 전세 매물 수로, 1년 전(2만 3,164건)보다 12.2% 줄었습니다. 중랑구는 71.6% 줄어 감소 폭이 가장 컸습니다.",
  cards: [
    { icon:"📉", big:"−12.2%", mid:"1년간 변화", sub:"2만 357건으로 감소" },
    { icon:"🏘", big:"중랑 −71.6%", mid:"최대 감소 지역", sub:"동대문·구로 뒤이음" },
    { icon:"💰", big:"7.1억 원", mid:"8월 평균 전셋값", sub:"또다시 최고치" },
  ],
  quote: "성북구(11.89%)·노원구(10.92%) 등 강북 지역의 전세 가격 상승세가 두드러졌습니다.",
  noteSub: "전세 매물이 줄어드는 배경에는 신규 입주 물량 감소와 갭투자 규제, 다주택자 실거주 강화가 겹쳐 있습니다. 서울에서 전세를 못 구한 임차인이 경기 지역으로 옮기며 그 지역 전셋값도 함께 밀려 올랐습니다. 다음 달 통계에서도 이 흐름이 이어지는지 확인하면 됩니다.",
  footer: "전세 · 매물 감소",
}, {
  badge: "JEONSE", title: "Seoul apartment jeonse listings fell 12.2% year over year, led by declines in outer districts",
  heroIcon: "🏠", heroBig: "20,357",
  heroSub: "That's this month's Seoul jeonse listing count, down 12.2% from 23,164 a year ago. Jungnang district led with a 71.6% drop.",
  cards: [
    { icon:"📉", big:"-12.2%", mid:"Year-over-year", sub:"Down to 20,357 listings" },
    { icon:"🏘", big:"Jungnang -71.6%", mid:"Biggest decline", sub:"Dongdaemun, Guro follow" },
    { icon:"💰", big:"₩711.78M", mid:"August avg. jeonse", sub:"Another record high" },
  ],
  quote: "Jeonse price gains were sharpest in northern districts like Seongbuk (11.89%) and Nowon (10.92%).",
  noteSub: "Fewer new completions plus tighter gap-investment and landlord occupancy rules are shrinking supply. Renters priced out of Seoul are moving to nearby Gyeonggi, pushing prices up there too. Next: watch whether next month's data shows the same trend.",
  footer: "Jeonse · Listing decline",
});

add("seoul-sales-down60", "L2", "POLICY", {
  badge: "매매", title: "8월 서울 아파트 매매가 2,322건으로 전월보다 60% 급감하며 강남3구 거래 비중이 9.1%로 역대 최저를 찍었습니다",
  heroIcon: "🏢", heroBig: "2,322건",
  heroSub: "8월 서울 아파트 매매량입니다. 4~5월 정점(8,600~9,000건대) 대비 4분의 1 수준으로, 전월(5,800건)보다 60% 줄었습니다.",
  cards: [
    { label:"8월 거래량", big:"2,322건", mid:"전월 대비 −60%", sub:"국토부 실거래가 기준" },
    { label:"강남3구 비중", big:"9.1%", mid:"연중 최저", sub:"5월엔 16.1%였음" },
    { label:"비강남 비중", big:"90.9%", mid:"연중 최고", sub:"대출 문턱 낮은 지역" },
  ],
  detailHead: "왜 거래가 급감했나",
  detailLines: [
    "5월 다주택자 양도세 중과 유예 종료로 급매물이 먼저 소진됐습니다.",
    "강도 높은 대출 규제와 두 차례 금리 인상이 겹쳤습니다.",
    "8·3 세제개편안 확정 지연으로 매수·매도자가 관망 중입니다.",
  ],
  noteSub: "실제 1년간 시세가 가장 많이 오른 곳은 분당(29.5%)·광명(28.4%) 등 비강남·수도권이었습니다. 대출 규제 부담이 고가 주택이 몰린 강남권에 더 크게 작용한 결과로 풀이됩니다. 8·3 세제개편안이 국회에서 어떤 형태로 확정되는지가 다음 확인 포인트입니다.",
  footer: "매매 · 거래량 급감",
}, {
  badge: "SALES", title: "Seoul apartment sales plunged 60% MoM to 2,322 units in August, with Gangnam 3's share at a record-low 9.1%",
  heroIcon: "🏢", heroBig: "2,322",
  heroSub: "That's August's Seoul apartment sales count — a quarter of the April-May peak of 8,600-9,000 and down 60% from July's 5,800.",
  cards: [
    { label:"August volume", big:"2,322", mid:"-60% MoM", sub:"Per MOLIT filings" },
    { label:"Gangnam 3 share", big:"9.1%", mid:"Yearly low", sub:"Was 16.1% in May" },
    { label:"Non-Gangnam share", big:"90.9%", mid:"Yearly high", sub:"Lower loan barriers" },
  ],
  detailHead: "Why sales collapsed",
  detailLines: [
    "A May capital-gains-tax grace period ending pulled forward quick sales.",
    "Tighter mortgage rules and two rate hikes hit at the same time.",
    "Delay in finalizing the Aug. 3 tax overhaul left buyers and sellers waiting.",
  ],
  noteSub: "Over the past year, prices actually rose most in non-Gangnam and Gyeonggi areas like Bundang (29.5%) and Gwangmyeong (28.4%). Loan restrictions hit high-priced Gangnam homes harder. Next: watch how the Aug. 3 tax overhaul is finalized in the National Assembly.",
  footer: "Sales · Volume drop",
});

add("toheo-permit-drop35", "L5", "AI", {
  badge: "정책", title: "8월 서울 토지거래허가 신청이 3,012건으로 34.8% 줄며 토허구역 지정 이후 가장 낮은 수치를 기록했습니다",
  heroIcon: "📋", heroBig: "3,012건",
  heroSub: "8월 서울 아파트 토지거래허가 신청 건수로 전월(4,618건)보다 34.8% 줄었습니다. 4월(8,896건) 최고치 이후 4개월 연속 감소세입니다.",
  before: { label:"4월 최고치", big:"8,896건", sub:"토허 신청" },
  after: { label:"8월", big:"3,012건", sub:"4개월 연속 감소" },
  cards: [
    { icon:"🏙", big:"강북 48.8%", mid:"신청 비중 절반", sub:"중저가 지역 주도" },
    { icon:"🏠", big:"4.5%", mid:"실거주 유예 신청", sub:"정책 효과 아직 미미" },
    { icon:"⏳", big:"세제개편", mid:"국회 심사 중", sub:"확정 지연이 배경" },
  ],
  quote: "다주택자 양도세 중과 유예 종료와 대출 규제, 세제개편안 지연이 겹쳐 관망세가 이어지고 있습니다.",
  noteSub: "토지거래허가제는 투기가 우려되는 지역에서 집을 살 때 미리 허가를 받아야 하는 규제입니다. 신청 감소는 실제 매매 거래량 감소(8월 −60%)와 같은 방향으로 움직이고 있습니다. 8·3 세제개편안이 확정된 뒤 대기 수요가 한꺼번에 움직이는지 다음에 확인하면 됩니다.",
  footer: "정책 · 토지거래허가",
}, {
  badge: "POLICY", title: "Seoul's land-permit applications fell 34.8% to 3,012 in August, the lowest since the district designation",
  heroIcon: "📋", heroBig: "3,012",
  heroSub: "That's August's application count, down 34.8% from July's 4,618 — a fourth straight monthly decline since April's peak of 8,896.",
  before: { label:"April peak", big:"8,896", sub:"Permit applications" },
  after: { label:"August", big:"3,012", sub:"4th straight decline" },
  cards: [
    { icon:"🏙", big:"North Seoul 48.8%", mid:"Nearly half of total", sub:"Led by lower-priced areas" },
    { icon:"🏠", big:"4.5%", mid:"Occupancy-waiver requests", sub:"Policy impact still small" },
    { icon:"⏳", big:"Tax overhaul", mid:"Pending in Assembly", sub:"Delay is the backdrop" },
  ],
  quote: "The end of a capital-gains grace period, tighter loans, and the delayed tax overhaul are keeping buyers on the sidelines.",
  noteSub: "The land-transaction permit system requires pre-approval for home purchases in speculation-prone zones. This decline tracks with August's 60% sales drop. Next: watch whether pending demand moves once the Aug. 3 tax overhaul is finalized.",
  footer: "Policy · Land permits",
});

add("monthly-rent-160", "L6", "JEONSE", {
  badge: "BREAKING", breaking: "서울 월세 160만원 시대",
  title: "전세가 사라질수록 월세가 오르며 서울은 월세 160만 원 시대에 들어섰습니다",
  heroBig: "160만 원",
  heroSub: "서울의 최근 월세 시세입니다. 세제개편 발표 이후 집주인들의 월세 전환이 늘었습니다.",
  grid: [
    { icon:"📉", big:"매물 감소", mid:"전세 물량 축소", sub:"집주인 직접 거주 증가" },
    { icon:"💵", big:"월세 전환", mid:"절세 목적", sub:"세제개편 부담 회피" },
    { icon:"📊", big:"7.18%", mid:"연초 대비 전세가", sub:"작년 1.45%보다 5배" },
    { icon:"🏛", big:"국정감사", mid:"대책 요구", sub:"국회입법조사처 지적" },
  ],
  ctx1: "국회입법조사처는 정부에 별도의 전월세 종합대책이 필요하다고 지적했습니다.",
  ctx2: "성북(11.89%)·노원(10.92%) 등 강북 지역 전세가 상승률이 특히 높았습니다.",
  quote: "전세는 계약 종료 시 보증금을 돌려받지만, 월세는 매달 고정 비용이 나가는 구조입니다.",
  noteSub: "전세가 줄고 월세가 늘면 목돈 마련이 어려운 청년·신혼부부의 부담이 매달 반복되는 형태로 바뀝니다. 저금리 시대가 끝나며 집주인들이 확실한 월수입을 선호하게 된 것이 구조적 배경입니다. 다음 달 국정감사에서 정부가 어떤 대책을 내놓는지 확인하면 됩니다.",
  footer: "전세 · 월세화",
}, {
  badge: "BREAKING", breaking: "SEOUL RENT HITS ₩1.6M",
  title: "As jeonse disappears, monthly rents keep climbing — Seoul has entered the era of ₩1.6M monthly rent",
  heroBig: "₩1.6M",
  heroSub: "That's Seoul's rent level after the tax overhaul pushed more landlords to convert units.",
  grid: [
    { icon:"📉", big:"Less supply", mid:"Jeonse supply shrinks", sub:"More owner move-ins" },
    { icon:"💵", big:"Rent shift", mid:"Tax avoidance", sub:"Dodging the new tax burden" },
    { icon:"📊", big:"7.18%", mid:"YTD jeonse-price rise", sub:"5x last year's 1.45%" },
    { icon:"🏛", big:"Nat'l audit", mid:"Policy demand", sub:"Flagged by the Assembly" },
  ],
  ctx1: "The Assembly's research office says a rental-stabilization plan is still missing.",
  ctx2: "Northern districts like Seongbuk (11.89%) and Nowon (10.92%) saw the sharpest jeonse gains.",
  quote: "Jeonse returns the deposit at the end of the lease; monthly rent is a recurring fixed cost instead.",
  noteSub: "As jeonse shrinks and rent rises, the burden shifts to recurring monthly costs for young renters who can't raise a lump-sum deposit. Landlords now prefer guaranteed monthly income as the low-rate era ends. Next: watch what policy response emerges from next month's audit.",
  footer: "Jeonse · Rent shift",
});

};
