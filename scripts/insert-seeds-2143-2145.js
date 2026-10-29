#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");

const reportsPath = path.join(__dirname, "../lib/reports.ts");

function bodyKo({ what, more, house }) {
  return [
    "■ 무슨 일인가요",
    "",
    what.trim(),
    "",
    "■ 조금만 더 알려드리면",
    "",
    more.trim(),
    "",
    "■ 기관·하우스 뷰",
    "",
    house.trim(),
    "",
    "investus.kr SRP 최고투자책임자 발행",
  ].join("\n");
}

function bodyEn({ what, more, house }) {
  return [
    "■ What happened",
    "",
    what.trim(),
    "",
    "■ What it means for investors",
    "",
    more.trim(),
    "",
    "■ House views — bull and bear",
    "",
    house.trim(),
    "",
    "investus.kr SRP Chief Investment Officer",
  ].join("\n");
}

const seed2143 = {
  id: "seed-2143",
  title:
    "테슬라 Semi가 충돌 없이 헤이워드에서 불이 났고, 같은 주 대형 휴게소에 1.2MW 충전기가 열렸습니다",
  summary:
    "2026년 10월 27일 저녁 캘리포니아 헤이워드 I-880에서 테슬라 Semi가 충돌 없이 화재가 났습니다. 운전자는 다치지 않았고 고속도로는 약 10시간 통제됐으며 원인은 조사 중입니다. 같은 주 Pilot·Flying J가 조지아 엘라벨과 캘리포니아 툴레어에서 일반 트럭 휴게소 첫 1.2MW Megacharger를 열었습니다. 충전 인프라가 열리는 주에 배터리 안전 질문이 겹쳤습니다.",
  body: bodyKo({
    what: `캘리포니아 고속도로순찰대(CHP) 헤이워드 지부에 따르면, 2026년 10월 27일 저녁 약 오후 5시 35분(태평양 시간) 헤이워드 I-880 남쪽 차로에서 테슬라 Semi가 불이 났습니다. Electrek(2026년 10월 28일, Fred Lambert) 보도에 따르면 사고 차량끼리의 충돌은 없었고, 운전자는 차에서 내려 다치지 않았습니다. CHP는 유해 화학 연기 가능성을 이유로 남·북 방향을 모두 막았습니다.

북쪽 차로는 화요일 밤에 다시 열렸고, 남쪽 차로는 더 오래 걸렸습니다. CHP는 처음에 배터리가 15~18시간 탈 수 있다고 경고했으나 현장 작업이 그보다 빨리 끝났고, 수요일 새벽 약 3시 30분께 전 차로가 재개됐습니다. 저녁 발화부터 재개까지가 약 10시간입니다. 소방대가 탄 트랙터 주변에 포말을 사용했고, 뒤쪽 Premier Trailer Leasing 트레일러 앞부분도 탔습니다. Electrek은 CHP 헤이워드가 공개한 현장 자료를 인용했습니다.

같은 주, 충전 쪽에서는 다른 소식이 나왔습니다. The Drive(2026년 10월 28일, Andrew P. Collins)에 따르면 Pilot(Flying J 운영)이 조지아 엘라벨 Pilot에 1.2MW Megacharger 6스톨을 열었고, 다음날 캘리포니아 툴레어 Flying J가 이어졌습니다. 다음 후보는 텍사스 포트 스톡턴과 네바다 노스 라스베이거스이며, 12곳이 공사 중입니다. 캘리포니아 밖 일반 휴게소에서 Semi가 공개 충전하는 첫 사례입니다.`,
    more: `지금까지 Semi 충전은 기가 네바다, 롱비치 항 인근 플릿 기지, 그리고 남캘리포니아의 소수 고객 사이트에 묶여 있었습니다. 온타리오 TA 휴게소는 3월부터 열려 있었으나 출력이 750kW에 그쳤습니다. Electrek이 엘라벨 개장 시점에 센 고객용 사이트는 4곳·26스톨입니다. 테슬라는 2026년 약 37곳, Semi 프로그램 책임자 Dan Priestley는 2027년 초 46곳을 목표로 말했고, 2월 지도에는 15개 주 64곳이 ‘곧 개장’으로 표시돼 있었습니다(텍사스 19, 캘리포니아 17). 1.2MW 스톨은 30분에 약 60%를 채운다고 테슬라는 설명합니다. 이는 미국 트럭 운전자가 8시간 운행 뒤 의무적으로 쉬는 시간과 맞춘 설계입니다. 다만 지금은 테슬라만 꽂을 수 있습니다. 커넥터는 업계가 쓰는 MCS(메가와트 충전 시스템)이지만, 타사 트럭 개방 시점은 테슬라도 Pilot도 밝히지 않았습니다. Pilot은 미국·캐나다에 900곳이 넘는 거점을 갖고 있어, 이 네트워크가 열리면 디젤 노선을 그대로 따라가려는 플릿 담당자의 ‘닭과 달걀’ 문제가 한 칸 줄어듭니다.

안전 쪽 질문은 반대 방향입니다. 2024년 8월 에미グラント 갭 I-80에서도 Semi 화재로 캘리포니아주 고속도로가 막힌 적이 있습니다. 당시에는 충돌이 없다고 알려졌으나, 이후 NTSB는 곡선에서 도로를 이탈해 말뚝과 나무를 받은 뒤 배터리가 불이 붙었다고 정리했고 최대 15시간 통제·물 약 5만 갤런이 쓰였습니다. 이번에는 충돌이 보고되지 않아 타이어·브레이크·트레일러에서 옮아왔는지, 팩 자체 열폭주인지가 쟁점입니다. Electrek이 인용한 NFPA 집계로는 2018~2022년 미국 대형 트럭 화재가 연평균 15,462건(하루 약 42건)이고, 기계 결함 요인이 44%, 충돌 관련은 약 2%입니다. 휘발유·디젤 승용차의 주행거리당 화재 빈도가 전기차보다 높다는 정부·테슬라 주장(테슬라 자체는 1.4억 마일당 1건)도 같은 글에 나옵니다. 그러나 Semi 인도 대수는 공시되지 않았고, 출시 고객 PepsiCo가 2024년 약 86대, 네바다 양산은 올해 시작된 수준입니다. 플릿이 작을수록 무충돌 화재 한 건의 통계적 무게는 커집니다. 같은 I-880 위쪽 오클랜드 항 연안 운송용으로 WattEV가 5월 370대를 주문했고, 9월에는 2,500대 ZET SCALE 주문의 주 공급사로 테슬라가 거론됐습니다. 원인 발표 전에 안전 담당자가 발주를 멈추는 것과, 충전망이 열렸으니 발주를 늘리는 것이 동시에 가능해집니다.`,
    house: `테슬라 Q3 2026 투자자 자료는 네바다 Semi를 연 25,000대 캐파의 양산(Production)으로 적었습니다. 골드만삭스는 같은 분기 실적 직후 TSLA 목표주가 $360, 투자의견 Neutral을 유지한 커버리지 하우스 가운데 가장 보수적인 쪽에 있습니다. 그 프레임에서는 Semi가 로보택시·에너지 스토리의 주인공이 아니라, 상용 트럭이라는 실행 리스크 칸입니다. 공개 1.2MW 충전이 열리면 그 칸의 상방 전제가 조금 두꺼워지고, 원인 미상의 무충돌 화재는 같은 칸의 하방 전제가 됩니다. 목표주가 숫자 자체가 바뀌었다는 공시는 없습니다.

웨드부시(Dan Ives)는 테슬라의 에너지·상용 전개를 더 건설적으로 보는 쪽에 가깝습니다. Pilot 900곳 이상에 MCS 고출력이 깔리면 장거리 전기 트럭의 운영 시나리오가 휴게소 지도 위에 올라온다는 점이 강세 논거입니다. 약세 논거는 명확합니다. 양산 초기에 충돌 없는 화재가 고속도로를 반나절 닫으면, 보험·안전 감사·지방 소방 매뉴얼이 디젤보다 까다로워질 수 있습니다. 원인은 아직 모릅니다. 타이어에서 옮아온 일반 트럭 화재라면 이야기가 달라지고, 팩 열폭주라면 셀 화학·열관리를 다시 봐야 합니다. 이 글은 정보 정리이며 매수·매도 권유나 수익 보장이 아닙니다.`,
  }),
  titleEn:
    "A Tesla Semi burned on I-880 with no crash — the same week public 1.2 MW Megachargers opened at Pilot stops",
  summaryEn:
    "On the evening of Oct. 27, 2026 a Tesla Semi caught fire on I-880 in Hayward, California, with no crash. The driver was unhurt; the freeway stayed closed about 10 hours; the cause is under investigation. The same week, Pilot/Flying J opened its first 1.2 MW Megachargers for the Semi at Ellabell, Georgia and Tulare, California, with Fort Stockton, Texas and North Las Vegas next. Infrastructure progress and battery-safety risk arrived in the same news cycle.",
  bodyEn: bodyEn({
    what: `California Highway Patrol's Hayward office said a Tesla Semi caught fire in the southbound lanes of Interstate 880 near Route 92 at about 5:35 p.m. Pacific Time on Tuesday, Oct. 27, 2026. Electrek (Fred Lambert, Oct. 28) reported there was no collision. The driver got out unhurt and told officers the truck caught fire for reasons they did not know. CHP closed both directions, citing the risk of hazardous chemical smoke.

Northbound reopened Tuesday night. Southbound took longer. CHP initially warned the pack could burn 15 to 18 hours; crews beat that estimate, and all lanes were posted open around 3:30 a.m. Wednesday — roughly 10 hours after the fire started. Photos from the scene show foam around a burned-out tractor and the front of a Premier Trailer Leasing trailer charred behind it. The operator has not been identified. Tesla, which does not run a conventional press office, had not commented. The cause is under investigation.

The same news week, the charging map moved. The Drive (Andrew P. Collins, Oct. 28) reported that Pilot, which also runs Flying J and is the largest U.S. truck-stop operator, opened its first Tesla Semi Megachargers: six 1.2-megawatt stalls at a Pilot in Ellabell, Georgia, and a Flying J in Tulare, California, the next day. Fort Stockton, Texas and North Las Vegas are next, with 12 more sites under construction. Until now, public Semi charging outside Tesla's own sites was essentially a Southern California story. Ellabell is the first public customer-facing Megacharger outside the state.`,
    more: `For fleet buyers, charging — not the truck brochure — has been the bottleneck. Tesla-owned sites at Giga Nevada and a depot near the Port of Long Beach, plus a handful of customer sites in Southern California, do not look like a national diesel network. A TA stop in Ontario, California has been open since March, but at 750 kW. Electrek counted four customer-facing sites and 26 stalls once Ellabell turned on. Tesla has talked about roughly 37 Megacharger sites in 2026; Semi program lead Dan Priestley has cited 46 by early 2027. As of February the company's map showed 64 more "coming soon" pins across 15 states, led by Texas (19) and California (17). Tesla says a 1.2 MW stall can restore about 60% of a Semi's charge in 30 minutes, which is the length of the federally required break after eight hours on the wheel. That is the bull case in one sentence: the rest-break window now has a public plug, at the kind of stop diesel already uses. Pilot has more than 900 locations in the U.S. and Canada.

The catch is exclusivity and evidence. The stalls use the Megawatt Charging System connector that Daimler, Volvo and others are also building toward, and Priestley has said other trucks will eventually use them. Neither Tesla nor Pilot has said when. Tesla ran Superchargers as a walled garden for years. And there are not many Semis on the road yet. Tesla does not disclose Semi deliveries. PepsiCo, the launch customer, was around 86 trucks in 2024; volume production in Nevada only started this year. On a fleet that small, a no-crash fire is a loud data point. It is also the second Semi fire to shut a California interstate in about two years. The August 2024 I-80 fire near Emigrant Gap was first described as no-crash; the NTSB later found the truck left the road, hit a delineator and a tree, and the pack ignited after the impact. Firefighters used about 50,000 gallons of water and lanes were closed up to 15 hours. Hayward, with no crash reported, shifts attention onto the truck — pack, high-voltage system, drive units, or an ordinary tire or brake fire that spread. Electrek notes NFPA figures of 15,462 large-truck fires a year in 2018–2022, about 42 a day, in a fleet that is still overwhelmingly diesel. That is context, not a hall pass. WattEV ordered 370 Semis in May, mostly for Oakland drayage a few miles up the same I-880 corridor. In September Tesla was named lead supplier on a 2,500-truck ZET SCALE order. Safety officers at those fleets will want a cause before they treat Megachargers as the all-clear.`,
    house: `Tesla's Q3 2026 investor materials already list the Nevada Semi line at 25,000 units of annual capacity in "Production." That is the installed-capacity number, not a delivery print. Goldman Sachs, among the houses that updated after the Q3 report, kept a $360 target and a Neutral rating — the low end of that day's spread (Cantor Fitzgerald $485 Overweight was the high; the average of the 10 houses that raised targets was about $436). In a Neutral frame, Semi is an execution line, not the robotaxi thesis. Public 1.2 MW stalls at Pilot support the execution line. An unexplained freeway fire leans against it. No house has published a Semi-specific target change on this fire.

The constructive view, closer to how Wedbush has talked about Tesla's energy and commercial ramp, is that chicken-and-egg charging is the thing fleet CFOs actually underwrite. A 30-minute, 60% session at a Flying J is how you argue a diesel lane can go electric without building a private depot on every corridor. The cautious view is reputational and actuarial. Class 8 buyers run safety committees. A thermal event with no crash, on a product that has barely entered volume, will show up in those rooms before it shows up in a price-target note. If the origin is a tire or a trailer, this is a trucking problem Tesla can document and move past. If the origin is the pack, the 25,000-unit capacity figure becomes a reminder of how many more packs would be on the road. This is editorial research, not investment advice, and it does not guarantee any return.`,
  }),
  category: "종목분석",
  categoryColor: "red",
  subject: "테슬라",
  date: "2026.10.29",
  updatedAt: "2026.10.29 21:10",
  images: ["/charts/tsla-semi-hayward-20261029.svg"],
  imagesEn: ["/charts/tsla-semi-hayward-20261029-en.svg"],
};

const seed2144 = {
  id: "seed-2144",
  title:
    "스페이스X AI 사업부가 미시시피 주택을 시세에 사되, 소음 소송 청구권은 내려놓으라는 제안을 하고 있습니다",
  summary:
    "가디언과 포브스(2026년 10월 28일)에 따르면, 옛 xAI·현재 SpaceXSI 측이 미시시피 사우스헤이븐 콜로니얼힐스에서 주택을 시세에 사겠다고 제안하고 있습니다. 조건은 가스터빈 소음 집단소송 청구권을 포기하는 것입니다. 중개인 녹취에는 418채 목표가 등장하고, 회사는 그 숫자를 확인하지 않았습니다. AI 컴퓨트가 스페이스X 최대 매출 부문이 된 뒤, 전력·인허가·지역 갈등이 그 부문의 속도 제한으로 보입니다.",
  body: bodyKo({
    what: `영국 가디언(Oliver Milman, 2026년 10월 28일)은 미시시피주 사우스헤이븐 콜로니얼힐스 주민들이, 머스크의 AI 회사 측으로부터 집을 팔라는 제안을 받았다고 전했습니다. 회사 공식 명칭은 7월 SpaceXAI를 거쳐 최근 SpaceXSI로 바뀌었으나, 동네에서는 여전히 xAI로 불립니다. 부동산 중개인이 문을 두드리며 시세에 사겠다고 했고, 조건은 인근 가스터빈 발전소 소음 소송에 참여하지 않는 것이었습니다. 포브스(Mary Whitfill Roeloffs, 같은 날)는 회사 변호인이 문을 두드리며 “소송과 관련된 모든 청구권 포기”를 대가로 시세 매입을 제시했다고 썼습니다. 두 보도 모두 조건부 매입이라는 뼈대는 같습니다.

가디언이 청취한 중개인 녹취에는 418채를 사겠다는 목표가 나옵니다. 콜로니얼힐스 거의 전체입니다. 18가구가 이미 팔기로 했다고 중개인은 말했고, xAI 쪽은 이 숫자에 응답하지 않았습니다. 데소토 카운티 등기에 따르면 10월 9일 이후 자회사 MZX 명의로 동네 주택 5채가 넘어갔습니다. 인근 평균 주택 가격은 약 18만 달러입니다. 포브스는 418채를 그 시세로 사면 약 7,524만 달러라고 계산했습니다.

소음의 진원으로 지목된 곳은 예전에 듀크에너지 부지이던 임시 가스 발전 단지입니다. 데이터센터에 전력을 대기 위해 이동식 가스터빈 69기가 돌아가고 있습니다. 피아노 교사 Elizabeth Rose는 집에서 약 3km 떨어진 이 설비가 “비행기 엔진처럼 끊이지 않는다”고 했고, 원고 중 한 명 Jason Haley는 침실에서 약 800m 거리의 고주파 윙윙거림 때문에 집을 비우거나 음악을 틀어야 잠든다고 했습니다. 회사는 모든 주장을 부인하며 “좋은 이웃”이 되겠다고 밝혀 왔고, 출력을 조절하고 방음벽을 쌓았다고 합니다.`,
    more: `2024년 7월 이후 멤피스·사우스헤이븐 경계에 Colossus I, Colossus II, Macrohardrr 세 데이터센터가 올라왔습니다. 머스크는 최근 스페이스X 어닝콜에서 Grok 성장이 자신이 본 가운데 가장 빠르다고 했고, 멤피스 일대 트레일러에서 주 최대 나흘을 보내며 현장을 본다고 알려졌습니다. 전력은 그 속도의 제약입니다. 미국 EPA는 이 임시 터빈들이 연방 청정대기법이 요구하는 허가 없이 돌아간다고 판단했고, 허가 집행은 주 권한이라고 봤습니다. 현장 대기 모니터링은 이뤄지지 않았고, Southern Environmental Law Center는 터빈 배출의 연간 건강 비용을 4,400만 달러로 추정했습니다. 올해 4월 환경단체와 NAACP가 터빈 가동을 멈춰 달라는 연방 소송을 냈고, 법무부는 이란전에서 쓰인 기술이라 국가안보에 필요하다는 논리로 소송을 막으려다 실패했습니다.

7월 회사는 주 규제 당국과, 내년 여름까지 임시 터빈을 정규 가스 발전소로 바꾸기로 합의했습니다. 소음이 줄어들 수 있는 경로입니다. 사우스헤이븐 시장 Darren Musselwhite는 매입이 “회사 도시”가 목적이 아니라 직원 주택과, 산업 개발을 부담으로 느끼는 주민에 대한 선의라고 했습니다. 시 측정으로는 지역 소음 조례 70데시벨을 넘긴 기록이 없다고 했습니다. 비판 쪽은 50데시벨대 지속음도 건강에 영향을 줄 수 있다고 반박합니다. 포브스가 인용한 Data Center Watch 집계로는 2026년 반기 분기에만 데이터센터 프로젝트 120건 이상이 지역 반대로 지연·무산됐고, 규모는 1,500억 달러가 넘습니다. 콜로니얼힐스 매입은 그 전국 패턴의 미시시피 버전입니다. 팔고 떠나는 주민에게는 현금 출구이고, 남는 원고에게는 집단의 균열입니다.`,
    house: `스페이스X Q3 2026 실적에서 AI 솔루션 매출은 70.2억 달러로 전체 146억 달러의 약 48%를 차지하며 처음으로 최대 부문이 됐습니다. JP모건은 같은 실적 구간에 SPCX 목표주가 $500을 제시하고, 2027년 말 AI 컴퓨트 10GW 가정 아래 약 4,000억 달러 ARR을 거론했습니다. 도이치뱅크는 슈퍼인텔리전스(네오클라우드) 사업이 2027년 연간 700~800억 달러 매출을 낼 수 있다고 봤습니다. 그 숫자들의 공통 전제는 전력이 제때 붙는다는 것입니다. 7,524만 달러 주택 매입은 분기 AI 매출에 비하면 작습니다. 문제는 수표 크기가 아니라, 허가 없는 터빈·NAACP 소송·집단 소음 소송·‘청구권 포기’ 조건이 같은 전제에 구멍을 낸다는 점입니다.

강세 논거는 회사가 방음·정규 발전소 전환·시세 매입으로 갈등을 현금으로 닫으려 한다는 것입니다. 시장은 세금과 고용을 환영하는 쪽도 있습니다. 약세 논거는 ESG와 전력 인허가가 이제 부차 이슈가 아니라는 점입니다. AI가 최대 매출 부문인 이상, 멤피스·사우스헤이븐 클러스터의 지연은 발사체나 스타링크 이야기가 아니라 전사 성장률 이야기입니다. 목표주가 $500과 10GW는 그 클러스터가 돈다는 가정 위에 있습니다. 가정은 아직 실적이 아니고, 이 글은 매수 권유가 아닙니다.`,
  }),
  titleEn:
    "SpaceX's AI unit is offering to buy Southaven homes — if owners drop a noise lawsuit",
  summaryEn:
    "The Guardian and Forbes (Oct. 28, 2026) report that SpaceXSI, formerly xAI, is offering market-value buyouts in Southaven, Mississippi's Colonial Hills neighborhood, conditioned on releasing claims in a gas-turbine noise class action. A realtor recording cites a target of 418 homes; the company has not confirmed that figure. With AI compute now SpaceX's largest revenue segment, legal, ESG and power-supply risk sits on the growth engine.",
  bodyEn: bodyEn({
    what: `The Guardian (Oliver Milman, Oct. 28, 2026) reported that residents of Colonial Hills, on the west side of Southaven, Mississippi, have been offered a chance to sell their houses to Elon Musk's AI company — and to make way. The company became SpaceXAI in July and has since been restyled SpaceXSI; neighbors still call it xAI. Real-estate agents have gone door to door with a market-value offer that, residents say, requires them not to join a class action over noise from a nearby gas-turbine plant. Forbes (Mary Whitfill Roeloffs, the same day) described company lawyers making the same rounds, with a release of "all claims related to a lawsuit" as the price of the check. The two accounts disagree on who knocked; they agree on the condition.

A realtor recording heard by The Guardian put the target at 418 homes, nearly the whole subdivision, with 18 owners already willing to sell. xAI did not answer questions about those numbers. DeSoto County records show five neighborhood homes purchased by MZX, the operating subsidiary, since Oct. 9. Average house prices in the area are about $180,000. Forbes multiplied 418 by that average and got roughly $75.24 million.

The plant at issue is a former Duke Energy site. Sixty-nine temporary gas turbines were installed to feed new data centers. Piano teacher Elizabeth Rose, about two miles away, described a continuous airplane-engine sound that wakes her at 2 a.m. Plaintiff Jason Haley, whose house sits about half a mile from the turbines, said a high-pitched hum has been "so torturous" he leaves or turns on music until he is exhausted. Three locals filed a federal nuisance suit in June over "near-constant noise, vibrations and other nuisance-level harms." SpaceXSI denies the claims. It has said it "care[s] deeply about being good neighbors," has varied power output, and has built sound-dampening walls. A letter from MZX told Colonial Hills that it "requires property for its business purposes."`,
    more: `Since July 2024 the company has put up three large data centers — Colossus I, Colossus II and Macrohardrr — across the Memphis–Southaven line. Musk said on this month's SpaceX earnings call that Grok is growing faster than anything he has seen, and reporting has him spending up to four nights a week in an Airstream in the area to watch the build. Power is the constraint that story runs into. The U.S. EPA has determined the turbines have been running without Clean Air Act permits that federal law requires, while treating enforcement as a state matter. No on-site air monitoring has been done. The Southern Environmental Law Center estimated $44 million a year in health costs from the units' emissions. In April, environmental groups and the NAACP sued in federal court to stop the turbines. The Justice Department tried to block that case by arguing the technology had been used in the war on Iran and was therefore a national-security need; the effort failed.

In July, xAI agreed with state regulators to turn the temporary plant into a permanent gas-fired facility by next summer, which should cut the noise from the truck-sized turbines. Southaven Mayor Darren Musselwhite said the buyout is not a company town: homes for some employees, and a "goodwill gesture" for neighbors who experience industrial development as a negative. City monitors, he said, have not recorded a breach of the local 70-decibel ordinance. Critics answer that persistent sound in the 50-decibel range can still matter for health. Data Center Watch, cited by Forbes, counted more than 120 U.S. data-center projects blocked or delayed in a half-quarter of 2026 on local opposition, more than $150 billion of planned spend. Colonial Hills is one neighborhood in that national argument. For owners who want out, a market check is an exit. For plaintiffs who stay, it is a thinning of the class.`,
    house: `SpaceX's Q3 2026 results already recast the company. AI Solutions revenue of $7.02 billion was about 48% of $14.6 billion in total sales — the largest segment, ahead of launch and Starlink. JPMorgan's $500 SPCX target in that print assumed roughly 10 GW of AI compute by the end of 2027 and spoke of on the order of $400 billion of ARR if that build lands. Deutsche Bank has sketched SuperIntelligence / neocloud revenue of $70–80 billion in 2027. Those figures are power figures wearing a sales coat. Seventy-five million dollars of optional real estate is rounding error next to a $7 billion AI quarter. The risk is not the check. The risk is that unpermitted turbines, an NAACP emissions case, a noise class action, and buyouts conditioned on dropping claims all sit on the same assumption: that Memphis–Southaven megawatts arrive on the slide-deck calendar.

The bull reading is that the company is doing what a well-capitalized operator does — pay market, build walls, convert to a permanent plant, hire locally, and keep GPUs on. The mayor is talking tax base and jobs. The bear reading is that once AI is the largest segment, ESG and interconnection are not a CSR footnote. They are a revenue-timing variable. A $500 target and a 10 GW path both need the cluster to stay on. This article does not recommend buying or selling SPCX and does not guarantee any return. It asks whether the legal and community file is now part of the compute file.`,
  }),
  category: "종목분석",
  categoryColor: "purple",
  subject: "스페이스X",
  date: "2026.10.29",
  updatedAt: "2026.10.29 21:20",
  images: ["/charts/spcx-southaven-homes-20261029.svg"],
  imagesEn: ["/charts/spcx-southaven-homes-20261029-en.svg"],
};

const seed2145 = {
  id: "seed-2145",
  title:
    "테슬라가 베트남 진출을 확인하며 판매·서비스·충전 인력을 뽑기 시작했습니다. 빈패스트는 신차의 약 36%를 갖고 있습니다",
  summary:
    "테슬라 채용 담당자가 2026년 10월 28일 베트남에 ‘공식적으로 온다’고 알리며 판매 매니저, 서비스 매니저, 충전 프로젝트 개발자를 포함한 다섯 자리를 공개했습니다. 법인 Tesla Motors Vietnam은 9월 11일 호찌민에 등록됐습니다. 현지 전기차 업체인 빈패스트는 올해 1~9월 베트남 신차의 약 36%를 팔았습니다. 동남아 확장 문이 열렸고, 가격·관세·충전망이 기회의 크기를 정합니다.",
  body: bodyKo({
    what: `Electrek(Fred Lambert, 2026년 10월 28일)에 따르면 테슬라 채용 담당 Ricky Ip가 이날 “테슬라가 공식적으로 베트남에 온다”며 채용을 알렸습니다. 공개된 다섯 자리는 판매 매니저, 서비스 매니저, HR 비즈니스 파트너, 구매 매니저, 그리고 충전 프로젝트 개발자입니다. 충전 개발자를 뽑는다는 것은 광고만 하려는 진출이 아니라 슈퍼차저를 땅에 심을 계획이 있다는 신호로 읽힙니다. 가격, 트림, 매장 위치는 아직 없습니다. 채용 그래픽에는 차세대 로드스터가 들어 있었으나 ‘예시 이미지’라는 작은 글씨가 붙어 있었습니다.

법인은 채용 공고보다 먼저 만들어져 있었습니다. Tesla Motors Vietnam LLC는 9월 11일 호찌민에 등록됐고, 정관 자본금은 약 777억 동(보도 기준 약 300만 달러), 사업 범위는 수입·도매·소매입니다. 당시 테슬라는 입을 열지 않았습니다. 내부 채용 담당자의 확인이 나온 것은 이번이 처음입니다.

빈 시장이 아닙니다. 빈패스트는 2026년 1~9월 베트남에서 177,697대를 인도했고, 같은 기간 국가 신차는 약 49만 5,000대입니다. 점유율은 약 36%로, 가솔린 차를 포함한 전체 신차 기준입니다. 9월 한 달만 보면 37.7%입니다. 같은 9개월 토요타 53,978, 현대 35,412, 미쓰비시 31,932, 포드 30,353, 기아 23,461대를 더하면 175,136대로, 빈패스트 한 회사가 다섯 브랜드 합보다 많습니다. 빈패스트는 9월이 베트남 최다 판매 브랜드 25개월째라고 밝혔고, 초소형 전기 크로스오버 VF 3(출시가 1만 3천 달러 미만)가 올해 베트남 최다 판매 차입니다. 9월 판매 상위 다섯 자리도 빈패스트 모델이 차지했습니다.`,
    more: `테슬라는 이 순서를 동남아에서 해본 적이 있습니다. 2022년 9월 태국에서 채용을 늘린 뒤 석 달 만에 주문을 열었고, 2024년 9월 필리핀에서 채용을 시작한 뒤 2025년 초에 출시했습니다. 같은 템포라면 베트남 주문 개방은 앞으로 몇 달 안이 됩니다. 다만 태국·필리핀에는 빈패스트 같은, 내수 신차 3분의 1을 가져간 토종 전기차 공장이 없었습니다.

원가와 세금 구조가 다릅니다. 빈패스트는 하이퐁에서 차를 만들고, 테슬라는 대부분 상하이 기가에서 들여와야 합니다. 베트남은 아세안-중국 자유무역협정에서도 승용차를 고관세 목록에 남겨 두었습니다. 정확한 세율은 트림·원산지 증명에 따라 달라지므로 여기서 숫자를 단정하지 않습니다. 반대로 베트남은 배터리 전기차 등록세 면제를 2030년 말까지 연장했고, 이 혜택은 수입 전기차에도 적용됩니다. 충전은 빈패스트 계열 V-Green이 사실상 표준망이고, 올해 약 3.8억 달러를 들여 초급속 충전소 99곳을 짓겠다고 했습니다. 제3자 망은 아직 얇습니다. 빈패스트 물량 상당수는 회장 팜낫브엉이 만든 전기 택시·호출 회사 GSM(Xanh SM)으로 들어갑니다. 2024년 인도 약 10만 대 때도 베트남 비중이 절대적이었습니다. 내수 점유 36%는 소비자 브랜드 힘과 계열 플릿 수요가 겹친 숫자입니다. 테슬라가 파고들 틈은 ‘수입 프리미엄 + 슈퍼차저 + 소프트웨어’이지, VF 3 가격대 전체가 아닙니다.`,
    house: `골드만삭스는 테슬라 Q3 2026 이후에도 목표주가 $360, Neutral을 유지했습니다. 그 시각에서 자동차 인도는 이미 성숙한 축이고, 주가 설명의 큰 부분은 로보택시·에너지·로보틱스에 있습니다. 베트남 채용은 그 Neutral 프레임을 깨는 사건이 아닙니다. 다만 상하이 공장의 수출 채널이 하나 더 열린다는 뜻은 됩니다. 같은 분기 테슬라 인도는 486,532대로 컨센서스 461,974대를 웃돌았습니다. 동남아에서 인도가 더해질지는 가격표와 관세, 그리고 충전 프로젝트 개발자가 실제로 부지를 계약하는지가 가릅니다.

웨드부시는 테슬라의 국제 볼륨을 더 긍정적으로 보는 편입니다. 등록세 면제가 2030년까지 수입 전기차에도 적용되면, 모델 Y 같은 차가 빈패스트 중형과 비교될 수 있는 창이 열립니다. 약세는 단순합니다. 최다 판매 차가 1만 3천 달러 미만인 시장에서, 고관세로 들어오는 수입 전기차가 점유율을 크게 가져가려면 가격 인하나 현지 생산이 필요합니다. 둘 다 아직 발표되지 않았습니다. 기회는 동남아 지도에 점이 하나 더 생긴 것이고, 크기는 미정입니다. 이 글은 투자 자문이 아니며 수익을 보장하지 않습니다.`,
  }),
  titleEn:
    "Tesla confirms a Vietnam launch — into a market where VinFast already holds about 36% of new cars",
  summaryEn:
    "A Tesla recruiter said on Oct. 28, 2026 that the company is “officially coming” to Vietnam and posted five jobs, including sales manager, service manager, and charging-project developer. Tesla Motors Vietnam LLC was registered in Ho Chi Minh City on Sept. 11. VinFast has taken about 36% of Vietnam’s new-car market in the first nine months of 2026. Southeast Asia is opening; tariffs, price, and charging will decide how large the opening is.",
  bodyEn: bodyEn({
    what: `Tesla has started hiring in Vietnam, and a recruiter inside the company says it is now "officially coming." Electrek (Fred Lambert, Oct. 28, 2026) reported that Ricky Ip posted five openings: sales manager, service manager, HR business partner, purchasing manager, and project developer, charging. That last title is the tell. Companies do not hire charging-project developers to run a pop-up booth. They hire them to put Superchargers in the ground. Pricing, model mix, and store locations have not been announced. Oddly, the recruiting graphic featured the next-generation Roadster, with fine print that the vehicle was "for illustration purposes only."

The legal shell was already there. Tesla Motors Vietnam LLC was registered in Ho Chi Minh City on Sept. 11 with about 77.7 billion dong of charter capital — roughly $3 million — and a business scope covering car imports, wholesale, and retail. Tesla did not comment then. The recruiter post is the first on-the-record confirmation from someone at the company.

It is not an empty market. VinFast, the local all-electric automaker, delivered 177,697 vehicles in Vietnam in the first nine months of 2026, out of a national total of about 495,000 new cars. That is roughly 36% of the entire car market, gasoline included. In September alone the share was 37.7%. The next five brands — Toyota 53,978, Hyundai 35,412, Mitsubishi 31,932, Ford 30,353, Kia 23,461 — sum to 175,136. VinFast alone beat all five. It has already passed its full-year 2025 volume with a quarter still to run, and it says September was its 25th straight month as Vietnam's best-selling car brand. The mix is the tell: the VF 3, a tiny two-door electric crossover launched at under $13,000, is the country's best-selling vehicle this year, and VinFast models held the top five spots in September.`,
    more: `Tesla has run this sequence in Southeast Asia before. It hired heavily in Thailand in September 2022 and opened orders three months later. It started hiring in the Philippines in September 2024 and launched in early 2025. A Vietnam order book in the next few months would fit that template. What those markets did not have is a homegrown EV maker sitting on a third of all new-car sales, with a factory in Haiphong and a sister charging company.

Cost and policy cut the other way. Tesla would import, most likely from Giga Shanghai. Vietnam kept passenger cars on its high-tariff list under the ASEAN-China free-trade agreement; the exact duty depends on trim and origin paperwork, so this article does not invent a rate. In Tesla's favor, Hanoi extended the registration-fee exemption for battery-electric cars through the end of 2030, and the holiday applies to imported EVs as well. Charging is the other home-field advantage. VinFast sister V-Green runs the dominant network and this year outlined about $380 million for 99 ultra-fast stations. Third-party networks remain thin. A meaningful slice of VinFast's volume also goes to GSM (Xanh SM), the electric taxi and ride-hail company founded by VinFast chairman Pham Nhat Vuong — the same domestic flywheel Electrek flagged when VinFast delivered nearly 100,000 EVs in 2024. A 36% share is brand strength plus a captive fleet. The wedge for Tesla, if there is one, is imported premium hardware plus Superchargers plus software, not the VF 3 price band.`,
    house: `Goldman Sachs stayed at a $360 target and Neutral after Tesla's Q3 2026 print. In that frame the auto delivery line is mature; the equity story leans on robotaxi, energy, and robotics. A Vietnam hiring wave does not rewrite a Neutral note. It does add an export spigot for Shanghai. Tesla already delivered 486,532 vehicles in Q3 against a 461,974 consensus. Whether Southeast Asia becomes a visible increment depends on a price list that does not exist yet, a tariff line that still sits on the "high" list, and whether the charging-project developer actually signs land.

Wedbush has generally been more constructive on Tesla's international volume. A registration-fee holiday that runs to 2030 and covers imports is the kind of policy that lets a Model Y show up in a mid-size comparison — if Tesla chooses to price for the comparison. The bear case is arithmetic. In a market whose best-selling car costs less than $13,000, an imported EV on a high tariff does not take a 36% share without either a much lower sticker or local production. Neither has been announced. The opportunity is a new dot on the Southeast Asia map. The size of the dot is unknown. This is not a recommendation to buy or sell TSLA and it does not guarantee any return.`,
  }),
  category: "종목분석",
  categoryColor: "mint",
  subject: "테슬라",
  date: "2026.10.29",
  updatedAt: "2026.10.29 21:30",
  images: ["/charts/tsla-vietnam-entry-20261029.svg"],
  imagesEn: ["/charts/tsla-vietnam-entry-20261029-en.svg"],
};

function serialize(r) {
  const order = [
    "id",
    "title",
    "summary",
    "body",
    "titleEn",
    "summaryEn",
    "bodyEn",
    "category",
    "categoryColor",
    "subject",
    "date",
    "updatedAt",
    "images",
    "imagesEn",
  ];
  const lines = ["  {"];
  for (const k of order) {
    const v = r[k];
    lines.push(`    ${k}: ${JSON.stringify(v)},`);
  }
  lines.push("  },");
  return lines.join("\n");
}

function main() {
  let src = fs.readFileSync(reportsPath, "utf8");
  const marker = "export const SEED_REPORTS: Report[] = [\n";
  const idx = src.indexOf(marker);
  if (idx < 0) throw new Error("SEED_REPORTS marker not found");
  if (src.includes('id: "seed-2143"')) {
    console.log("seeds 2143-2145 already present, skip insert");
    return;
  }
  const block =
    marker +
    "  // ── 2026-10-29 (목) 저녁 뉴스 3편 (Semi · SpaceXSI 주택 · 베트남) ──\n" +
    serialize(seed2145) +
    "\n" +
    serialize(seed2144) +
    "\n" +
    serialize(seed2143) +
    "\n";
  src = src.slice(0, idx) + block + src.slice(idx + marker.length);

  const tickerMarker = '  "seed-2142": ["MSFT","GOOGL","TSLA","SPCX","AMZN"],\n';
  if (!src.includes(tickerMarker)) throw new Error("ticker marker not found");
  src = src.replace(
    tickerMarker,
    tickerMarker +
      '  "seed-2145": ["TSLA"],\n' +
      '  "seed-2144": ["SPCX"],\n' +
      '  "seed-2143": ["TSLA"],\n',
  );

  fs.writeFileSync(reportsPath, src);
  console.log("inserted seed-2145, seed-2144, seed-2143");
}

main();
