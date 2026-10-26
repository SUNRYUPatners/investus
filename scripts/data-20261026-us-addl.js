// 2026-10-26 (월) US 추가 — META FCF 첫 적자 · Cybercab 텍사스 970대 · SpaceX 네오클라우드 · Gerstner 인수 발언 · Starlink 1360만
const { detailBody } = require("./lib-report-bodies");
const { applyPad } = require("./lib-apply-pad");

function D(what, more, house) {
  return detailBody({ what, more, house });
}

function spacexHouse(why) {
  return `모건스탠리 아담 조너스는 스페이스X에 오버웨이트와 목표 주가 300달러를 유지합니다. ${why}

씨티증권의 존 고딘은 주당 900달러, 기업가치 12조 달러를 말해 온 하우스입니다. 두 목표를 평균 내지 않고 나란히 둡니다.`;
}

function teslaHouse(why) {
  return `웨드부시는 테슬라에 아웃퍼폼 의견과 목표 주가 600달러를 유지합니다. ${why}

모건스탠리의 기본 목표 주가는 415달러이고, TSLA Q3 이후 강세 시나리오 상향을 검토 중입니다. 두 집을 한 숫자로 섞지 않습니다.`;
}

const US = [];
function push(row) {
  US.push(applyPad(row));
}

push({
  id: "seed-2106",
  slug: "meta-fcf-negative-first-time",
  category: "어닝",
  color: "blue",
  subject: "Meta",
  tickers: ["META"],
  title: "META Q3 2026 — 잉여현금흐름 사상 첫 적자 -12억 달러 · AI 자본지출이 현금 돌파",
  summary:
    "Meta Platforms의 Q3 2026 잉여현금흐름이 -12억 달러로, 2012년 상장 이후 처음으로 마이너스를 기록했습니다. 분기 AI 자본지출 349억 달러가 영업현금흐름을 초과한 결과입니다. 매출 646억(+26%)과 adj EPS 7.40달러는 컨센서스를 상회했으나, 현금이 실제로 빠져나간 건 처음입니다.",
  titleEn: "META Q3 2026 — free cash flow negative for first time ever at -$1.2B · AI capex exceeds operating cash",
  summaryEn: "Meta Q3 FCF -$1.2B — first negative quarter since IPO in 2012. AI capex of $34.9B in a single quarter exceeded operating cash flow. Revenue $64.6B (+26%), adj EPS $7.40 beat estimates. Cash generation turned negative for the first time.",
  body: D(
    `Meta Platforms의 Q3 2026 잉여현금흐름(FCF)이 -12억 달러를 기록했습니다. 2012년 나스닥 상장 이후 처음으로 분기 FCF가 마이너스가 된 것입니다.

직전까지 Meta의 분기 FCF 최고치는 2024년 Q4의 165억 달러였습니다. Q3 2026에는 영업현금흐름이 AI 자본지출에 의해 완전히 흡수됐습니다.

Q3 AI 설비투자(capex)는 349억 달러로, 전년 동기 194억 달러 대비 80% 증가했습니다. 데이터센터 확장, 엔비디아 GPU 구매, AI 인프라 구축이 한 분기에 집중되면서 현금 유출이 유입을 넘어섰습니다.`,
    `FCF 적자는 영업이 나빠진 게 아니라 투자 사이클이 정점에 있다는 신호입니다. 매출 646억 달러(+26%), adj EPS 7.40달러(컨센서스 6.54달러)는 모두 시장 기대를 웃돌았습니다.

문제는 투자 규모입니다. 연간 capex 가이던스는 1,350~1,450억 달러로 상향됐습니다. Q4 하나에만 최소 390억 달러 이상을 쏟겠다는 뜻입니다. FCF 마이너스가 일회성이 될지, 아니면 AI 투자 사이클이 끝나는 2027년까지 지속될지가 다음 관전 포인트입니다.

Google·Microsoft 등 다른 하이퍼스케일러도 AI capex를 늘리는 방향입니다. 빅테크 4개사 합산 AI capex는 연간 7,250억 달러 수준으로, 이 규모가 유지될수록 GPU·AI 인프라 수요는 구조적입니다.`,
    `AI 투자에 베팅한 하우스들은 단기 FCF 부진보다 광고 수익·AI 모델 수익화 장기 가정을 기준으로 봅니다. 현재 컨센서스 목표 주가 범위는 700~800달러 대입니다.

FCF 마이너스를 부정적으로 읽는 시각은 자본비용 상승(10Y 5%) 환경에서 대규모 투자 사이클이 얼마나 지속 가능한지를 묻습니다. 두 시각을 섞지 않고 각각의 가정 위에서 봅니다.`,
  ),
  nick: "메타FCF첫적자",
  wall: "메타 Q3 잉여현금흐름 -12억달러. 상장 이후 처음으로 FCF 마이너스ㄷㄷ AI 설비투자 349억달러가 현금흐름을 다 잡아먹은 거래. 매출은 +26%인데 현금이 빠져나가는 상황이면 투자자가 어떻게 봐야 하는 거야",
  c1: "FCF 적자는 투자 집중 때문이야. 영업이익은 229억 달러 났음",
  c2: "capex가 매출보다 빠르게 늘면 언젠가는 현금 회수 확인해야 함",
  analyst: "FCF -12억달러는 AI 투자 사이클이 현금흐름 흡수 단계에 진입했다는 신호입니다. 매출 +26%·EPS 서프라이즈는 유지되고 있어, capex 회수 속도가 다음 관전 포인트입니다.",
});

push({
  id: "seed-2107",
  slug: "cybercab-texas-970-austin-f1-record",
  category: "종목분석",
  color: "mint",
  subject: "Tesla",
  tickers: ["TSLA"],
  title: "Tesla 텍사스 로보택시 970대 · Cybercab 463대(47.7%) · 오스틴 F1 예선 1,250건 목격 신기록",
  summary:
    "텍사스 DMV 데이터 기준 10월 25일 현재 Tesla 로보택시가 970대 등록됐습니다. 그 중 Cybercab이 463대로 47.7%를 차지합니다. 6월 9일 59대에서 16배 성장했고, 10월 한 달만 +78%(+424대) 증가했습니다. 오스틴 F1 예선날 Cybercab 목격 건수가 1,250건(역대 최다)을 기록했고, 무인 주행은 1,159건으로 기존 기록(921건)을 26% 초과했습니다.",
  titleEn: "Tesla Texas robotaxi fleet 970 vehicles · 463 Cybercabs (47.7%) · Austin F1 qualifying: 1,250 sightings all-time record",
  summaryEn: "Texas DMV data (Oct 25): 970 Tesla robotaxis registered. 463 Cybercabs (47.7% of fleet). 16x growth from 59 on Jun 9. October alone +78% (+424 units). Waymo leads with 1,207 (237 ahead). Austin F1 qualifying day: record 1,250 Cybercab sightings, 1,159 driverless — up 26% over previous driverless record of 921.",
  body: D(
    `텍사스 DMV(차량국) 무인자동차 등록 데이터 기준으로, 10월 25일 현재 Tesla 로보택시가 970대 등록됐습니다.

차종 구성을 보면 Cybercab이 463대(47.7%)이고, Model Y가 507대(52.3%)입니다. 6월 9일 59대에서 4개월 반 만에 16배로 성장했습니다. 10월 한 달만 놓고 보면 +78% 증가(+424대)로, 월간 증가폭으로는 최대입니다.

같은 기간 웨이모(Waymo)는 1,207대로 테슬라보다 237대 앞서 있습니다. 텍사스 전체 무인차 등록 비율에서는 웨이모 55%, 테슬라 44% 수준입니다.

오스틴 F1 예선(10월 25일 토요일)에서 Cybercab 목격 건수가 1,250건으로 집계됐습니다. 이전 최고치였던 10월 16일 1,072건을 넘어선 역대 최다입니다. 이 중 무인 주행은 1,159건으로, 기존 무인 기록 921건을 26% 초과했습니다. 비무인은 91건으로 역대 최저를 기록해, 오스틴 Cybercab 운행의 절대 다수가 무인화됐음을 보여줍니다.`,
    `DMV 등록 대수는 운행 대수가 아닙니다. 등록된 970대 중 실제로 매일 운행하는 비율은 공개되지 않습니다. 그러나 월 78% 증가 속도와 오스틴 F1 예선날 1,250건 목격은 플리트 가동률이 높아지고 있음을 간접적으로 보여줍니다.

웨이모와의 차이(237대)는 절댓값으로는 좁혀지고 있습니다. 4개월 전에는 텍사스에 Tesla 로보택시가 59대였으니, 현재 추세가 유지되면 연말~내년 초 역전 가능성도 있습니다.

Cybercab이 전체의 47.7%까지 올라온 것은 Model Y(기존 차종 전용) 비율을 빠르게 따라잡는 중이라는 뜻입니다. 오스틴 VIN 데이터베이스에서도 2026년식 Cybercab이 연속된 번호로 등록된 것이 확인됩니다.

다음 확인할 것은 11월 중 새로 발표된 라스베이거스·피닉스 등 4개 도시에서 Cybercab 등록이 시작되는 시점입니다.`,
    teslaHouse("텍사스 DMV 970대와 오스틴 무인 비율 급등은 Cybercab 로보택시 가정이 현실 데이터로 확인되는 첫 번째 이정표로 읽힙니다. 목표 주가 600달러의 Cybercab 수익화 가정은 이 데이터가 계속 쌓여야 정당화됩니다."),
  ),
  nick: "오스틴천이백오십건",
  wall: "텍사스 DMV 데이터보면 테슬라 로보택시 970대인데 사이버캡이 463대래. 6월에 59대였다는게 4개월만에 16배임ㄷㄷ 웨이모가 아직 237대 앞서있긴한데 10월에 78% 증가속도면 연말쯤 역전하는 거 아님?",
  c1: "DMV 등록이랑 실제 운행은 다름. 가동률이 핵심",
  c2: "오스틴은 지오펜스 확장된 특수 지역이야. 다른 도시 데이터도 나와야 함",
  analyst: "DMV 970대와 F1 예선 무인 1,159건은 Cybercab 양산-운행 사이클이 데이터로 확인되는 단계입니다. 주간 목격 트렌드와 신규 4개 도시 등록 개시 시점을 다음 지표로 봅니다.",
});

push({
  id: "seed-2108",
  slug: "spacex-neoclouds-dying-40b-gpu-13gw",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX", "NVDA"],
  title: "SpaceX — 네오클라우드 200개 이상 붕괴 예고 · $400억 GPU 부채 · GB300 월 20만대",
  summary:
    "머스크는 10월 25일 부채 시장이 AI 데이터센터 외 기업에 자금줄을 거의 끊었다고 밝혔습니다. SpaceX는 엔비디아 GPU 구매를 위해 400억 달러 부채를 조달했으며, 투자등급 신용과 스타링크 매출이 뒷받침입니다. 200개 이상의 네오클라우드 사업자가 붕괴 예정이며, SpaceX가 이들 GPU를 흡수해 13GW 컴퓨트를 확보할 전망입니다. 베스 킨딕에 따르면 올해 남은 기간 GB300을 월 20만 대씩 배포합니다.",
  titleEn: "SpaceX — 200+ neoclouds to collapse · $40B GPU debt closed · 200K GB300s online per month",
  summaryEn: "Musk (Oct 25): debt markets have largely shut off for non-AI-datacenter companies. SpaceX closed $40B in debt for Nvidia GPUs — investment grade + Starlink/launch revenue backing. 200+ neoclouds facing guppy-level death. SpaceX will buy their GPU scraps. Panke: SpaceX reaches 13 GW guaranteed compute. Beth Kindig: 200,000 GB300s coming online per month through year-end.",
  body: D(
    `일론 머스크는 10월 25일 X에 이렇게 적었습니다. "지난 몇 주 사이 채권 시장이 AI 데이터센터 외 실질 매출이 없는 기업에는 자금을 거의 완전히 끊었다. SpaceX는 GPU용 400억 달러 부채를 조달했다. 우리는 투자등급이고 스타링크·발사 매출이 있다. 그 말은 200개 이상의 네오클라우드가 구피 수준의 죽음과 통합을 맞게 된다는 뜻이다. 일부는 살아남겠지만 많지 않을 것이다."

SpaceX는 엔비디아 GPU 대규모 구매를 위해 400억 달러 부채를 이미 조달 완료했습니다. 아폴로 글로벌이 주도하는 구조로, 은행 대출 100억 달러와 투자등급 채권 300억 달러로 구성된 것으로 알려졌습니다.

베스 킨딕은 머스크의 SpaceX 슈퍼인텔리전스(구 xAI) 사업이 올해 남은 기간 매달 GB300(엔비디아 블랙웰 울트라)을 20만 대씩 온라인에 올릴 것이라고 분석했습니다. 관련 티커로 $SPCX와 $NVDA를 함께 거론했습니다.`,
    `네오클라우드는 직접 데이터센터를 구축해 GPU 컴퓨팅 용량을 임대하는 소규모 사업자들입니다. AI 붐 초기에 수백 개가 생겨났지만, 채권 시장이 투자등급 신용 없는 사업자에 자금 공급을 끊기 시작하면서 운영 자금이 말라붑니다.

머스크의 주장은 이 과정에서 네오클라우드가 보유한 GPU를 SpaceX가 헐값에 흡수하겠다는 것입니다. 이미 채권 시장 접근성에서 투자등급인 SpaceX와 수신용 미달 네오클라우드의 격차가 벌어졌습니다.

Panke(@spacesGOD)는 이 구도를 수치로 정리했습니다. SpaceX는 200개 이상 네오클라우드에서 7GW 컴퓨트를 확보해 총 13GW를 달성합니다. 그 비용은 스크랩 가격 수준이라는 분석입니다. 월 20만 대 GB300 배포가 현실화되면 SpaceX AI 사업 매출 성장 궤도는 현 컨센서스를 크게 상회합니다.

카마스 팔리하피티야는 네오클라우드 업계를 "조직화되지 못하고 자본력도 부족하다"고 평가했습니다. 일부는 다른 곳보다 낫지만 구조적 열세라는 입장입니다.`,
    spacexHouse("$40B GPU 부채와 GB300 월 20만대 배포는 씨티 900달러 가정의 AI 컴퓨팅 수익 전제가 구체화되는 경로입니다. 모건스탠리 300달러는 우주·스타링크 중심 가정이어서 AI 수익 확대 시 재검토 대상입니다. 두 목표를 합산하지 않고 각각의 전제 위에서 봅니다."),
  ),
  nick: "이백개네오클라우드붕괴",
  wall: "머스크가 네오클라우드 200개 이상 다 죽는다고 직접 말했네. 채권시장이 AI 데이터센터 외 기업에 돈 안 빌려준대. 스페이스엑스는 투자등급이라 40조원 빌렸다고ㄷㄷ 죽어가는 네오클라우드 GPU를 헐값에 사겠다는 거잖아",
  c1: "네오클라우드 붕괴는 NVDA 기존 고객 이탈로 보는 시각도 있음",
  c2: "13GW는 예상치야. 실제 조달 확인은 SpaceX 다음 어닝에서",
  analyst: "$40B GPU 부채 조달 완료와 네오클라우드 붕괴-흡수 구도는 SpaceX AI 컴퓨트 독점 가설의 실행 단계로 봅니다. GB300 월 20만대 배포 속도가 Q1 2027 가이던스 330~370억달러 가정과 일치하는지 확인합니다.",
});

push({
  id: "seed-2109",
  slug: "gerstner-spacex-acquire-tsla-420-550",
  category: "애널분석",
  color: "mint",
  subject: "Tesla·SpaceX",
  tickers: ["TSLA", "SPCX"],
  title: "Brad Gerstner: SpaceX가 Tesla를 주당 $420~$550에 인수할 수 있다",
  summary:
    "Benchmark Capital 파트너 브래드 거스트너가 CNBC에서 SpaceX가 Tesla를 주당 420~550달러에 인수하는 시나리오를 제시했습니다. 이는 합병위원회가 다루는 대등 합병과 다른 구도로, SpaceX가 인수 주체가 됩니다. 당시 TSLA 주가는 379달러였습니다.",
  titleEn: "Brad Gerstner: SpaceX could acquire Tesla at $420–$550 per share",
  summaryEn: "Benchmark Capital's Brad Gerstner told CNBC that SpaceX could acquire Tesla at $420–$550 per share. This is a distinct scenario from the independent merger committee (which explores a merger of equals). SpaceX would be the acquirer. TSLA was at $379 when the comment aired.",
  body: D(
    `브래드 거스트너 Benchmark Capital 파트너가 CNBC에 출연해 SpaceX가 Tesla를 주당 420~550달러에 인수하는 시나리오를 언급했습니다.

거스트너는 두 회사가 합쳐지면 자율주행·AI·로봇 사업의 시너지가 극대화된다는 논리를 제시했습니다. 그가 제시한 420~550달러 범위는 발언 시점 TSLA 주가(약 379달러)에 11~45% 프리미엄에 해당합니다.

Benchmark Capital은 SpaceX의 초기 기관 투자자 중 하나로, 거스트너는 SpaceX에 대한 구조적 장기 투자 논리를 여러 차례 공개적으로 밝혀온 인물입니다.`,
    `거스트너의 발언은 현재 양사 이사회가 구성한 독립위원회가 검토 중인 시나리오와 다릅니다. 독립위원회는 두 회사가 대등하게 합쳐지는 합병(merger of equals) 가능성을 탐색하는 것이고, 거스트너가 말한 것은 SpaceX가 Tesla를 매수하는 인수(acquisition) 구도입니다.

인수 프리미엄이 붙으면 Tesla 주주 입장에서 단기 주가 상승 이벤트가 됩니다. 반면 SpaceX(SPCX) 주주 입장에서는 대규모 자금 조달이 필요하고, Tesla 부채와 EV 사업 리스크를 떠안는다는 우려가 있습니다.

두 시나리오(합병 vs 인수)가 동시에 거론되는 상황이지만, 현재 공식 절차는 독립위원회 탐색 단계입니다. 확정된 조건은 없고 성사 보장도 없습니다.`,
    `웨드부시는 두 시나리오 모두에서 Tesla의 FSD·로보틱스 가치가 독립 존속보다 합산 시 더 크게 평가받는다고 봅니다. 현 목표 주가 600달러는 독립 기준이어서, 합병·인수 프리미엄이 더해지면 상향 검토 대상입니다.

씨티증권 존 고딘은 SpaceX 기업가치 12조 달러 가정에서 Tesla 인수를 진행할 경우 재무 부담은 감당 가능하다고 봐 온 하우스입니다. 두 목표 주가를 섞지 않고 각각의 인수·합병 가정 위에서 읽습니다.`,
  ),
  nick: "거스트너사백이십달러",
  wall: "CNBC에서 Gerstner가 스페이스엑스가 테슬라를 420~550달러에 인수할 수 있다고 했네. 지금 주가 379달러면 최대 45% 프리미엄이잖아. 근데 독립위원회는 대등합병 검토하는 건데 이건 인수야? 구도가 다르네",
  c1: "인수랑 합병은 다름. 합병은 비율 협상이고 인수는 현금 매수",
  c2: "420~550은 Gerstner의 시나리오 레인지야. 확정 조건 아님",
  analyst: "Gerstner의 $420~$550 인수 시나리오는 독립위원회의 합병 탐색과 별개 구도입니다. Tesla 주주에 프리미엄이지만, SpaceX 주주는 인수 자금 조달과 EV 사업 리스크를 검토해야 합니다.",
});

push({
  id: "seed-2110",
  slug: "starlink-13-6m-subscribers-89pct",
  category: "종목분석",
  color: "purple",
  subject: "스페이스X",
  tickers: ["SPCX"],
  title: "Starlink 구독자 1,360만 — 전년 720만에서 1년 만에 89% 증가",
  summary:
    "10월 25일 Kalshi Finance에 따르면 Starlink 구독자가 1,360만 명에 달했습니다. 1년 전 720만 명에서 89% 증가했습니다. Starlink는 SpaceX 전체 매출에서 비중이 크며, AI 사업 성장과 함께 구독 기반 반복 매출을 뒷받침합니다.",
  titleEn: "Starlink hits 13.6M subscribers — up 89% from 7.2M a year ago",
  summaryEn: "Starlink subscriber count reached 13.6M as of late October, up from 7.2M a year ago (+89% YoY). Recurring subscription revenue underpins SpaceX's investment-grade credit profile and complements the AI business growth.",
  body: D(
    `10월 25일 기준 Starlink 구독자 수가 1,360만 명에 도달했습니다. 정확히 1년 전에는 720만 명이었으므로, 연간 기준 89% 증가입니다.

Starlink는 저궤도 위성 인터넷 서비스로, SpaceX 전체 매출에서 가장 큰 반복 수익원입니다. 주요 시장은 농촌·원격지·항공·해상 등 기존 통신 인프라가 부족한 영역으로, 아프리카·라틴아메리카·동남아시아에서 가입자 성장이 빠릅니다.

SpaceX Q3 2026 전체 매출 145.8억 달러(+161%) 중 AI 사업이 거의 절반을 차지하지만, Starlink 구독 기반이 투자등급 신용 유지와 $40B GPU 부채 조달의 현금흐름 근거로 작용했습니다.`,
    `Starlink 월 구독료는 현재 120달러(가정용 기준)입니다. 1,360만 구독자 기준 단순 월 환산 매출은 약 16.3억 달러, 연환산 195억 달러 수준입니다. 실제 매출은 요금제 믹스(항공·해상·기업용 프리미엄 포함)에 따라 다릅니다.

AI 사업 매출이 빠르게 성장하는 중에도 Starlink 반복 매출이 늘고 있다는 것은 SpaceX의 수익 구조가 이중으로 확장되고 있음을 의미합니다. 채권 시장에서 투자등급을 유지할 수 있는 이유 중 하나도 이 안정적 구독 매출입니다.

다음 확인할 것은 Q4 2026에서 Starlink 가입자가 1,500만을 돌파하는지, 그리고 항공·해상용 고가 요금제 비율이 올라가는지입니다.`,
    spacexHouse("Starlink 1,360만 구독자는 모건스탠리 300달러 가정의 핵심 근거 중 하나입니다. 씨티 900달러 가정은 Starlink 성장에 AI 컴퓨팅 수익을 더한 구조여서, 두 티어가 함께 성장하는 현재 추세가 지속되면 씨티 가정 쪽으로 무게 이동이 생길 수 있습니다."),
  ),
  nick: "스타링크천삼백육십만",
  wall: "스타링크 구독자 1360만이래. 1년전엔 720만이었는데 89% 증가ㄷㄷ 월 구독료 120달러면 단순 계산해도 연 195억달러야. 스페이스엑스 AI 사업도 크지만 이 구독 기반이 신용등급 유지하는 거 아니야?",
  c1: "195억달러는 가정용 요금제 기준 추산이야. 실제 믹스는 달라",
  c2: "가입자 증가는 좋은데 해지율 데이터는 공개 안 됨",
  analyst: "1,360만 구독자는 SpaceX AI 사업과 병행해 구독 기반 반복 매출이 확장되고 있음을 보여줍니다. $40B 부채 조달의 신용 근거로서 다음 분기 가입자 트렌드를 확인합니다.",
});

module.exports = { US };
