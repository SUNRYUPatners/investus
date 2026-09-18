// 2026-09-18 US individuals continued (seed-1717~)
const { detailBody } = require("./lib-report-bodies");
const { padBody } = require("./data-20260918-us-pads");


module.exports = [
  {
    id: "seed-1717",
    slug: "model-y-spain-275",
    category: "종목분석",
    color: "mint",
    subject: "테슬라",
    tickers: ["TSLA"],
    title: "스페인에서 테슬라 모델Y 판매가 2위 비테슬라 전기차보다 275% 많았습니다",
    summary:
      "스페인 최근 집계에서 테슬라 모델Y 판매가 2위 비테슬라 전기차보다 약 275% 많았습니다. 모델Y는 테슬라의 중형 전기 스포츠유틸리티차량입니다. 보조금이 줄어드는 유럽에서 한 차종이 2위와 세 배 가까이 벌어진 사례입니다.",
    titleEn: "In Spain, Tesla Model Y sold 275% more than the next non-Tesla EV",
    summaryEn: "The midsize Tesla SUV nearly tripled the second-place non-Tesla electric car in the latest Spain tally.",
    body: detailBody(padBody("model-y-spain-275", {
      what: `모델Y는 테슬라가 가장 많이 파는 중형 전기 스포츠유틸리티차량입니다. 스페인 최근 판매 집계에서 이 차종이 2위 비테슬라 전기차보다 약 275% 더 팔렸습니다.\n\n275%는 2위 판매량을 100으로 두면 모델Y가 375가 된다는 뜻입니다. 한 나라 전기차 순위에서 1위와 2위 격차가 세 배에 가깝다는 이야기입니다.\n\n스페인은 유럽 안에서도 보조금과 충전 환경이 다른 시장입니다. 그 시장에서 한 차종이 이 정도로 벌어졌다는 점이 오늘 화면의 핵심입니다.`,
      more: `유럽 여러 나라는 전기차 보조금을 줄이고 있습니다. 보조금이 줄면 가격만으로 승부하는 차종은 흔들리기 쉽습니다.\n\n모델Y가 스페인에서 압도했다는 것은 충전망·소프트웨어·잔존가치 같은 묶음이 가격표 이상으로 통하고 있다는 해석으로 이어집니다.`,
      longTerm: `유럽은 테슬라 판매의 중요한 축입니다. 보조금이 사라져도 한 차종이 버틴다면 다른 나라 점유율 이야기도 덜 불안해집니다.\n\n장기적으로는 모델Y 후속과 사이버캡이 같은 브랜드 신뢰를 이어받는지가 다음 질문입니다. 스페인 독주는 그 신뢰가 아직 살아 있다는 신호입니다.`,
      invest: `다음에 확인하면 좋은 것은 다음 달 스페인 전기차 순위입니다. 격차가 유지되는지가 일회성인지 추세인지를 가릅니다.\n\n보조금이 더 줄어드는 나라에서 모델Y 점유율이 따라오는지도 함께 보시면 됩니다.`,
    })),
  },
  {
    id: "seed-1718",
    slug: "foreign-us-stocks-vs-bonds",
    category: "매크로",
    color: "red",
    subject: "자금흐름",
    tickers: ["MACRO"],
    title: "외국인이 미국 주식을 국채보다 더 산 것은 이번 세기 들어 세 번째입니다",
    summary:
      "해외 투자자가 미국 국채보다 미국 주식을 더 많이 순매수한 기록이 이번 세기 세 번째로 집계됐습니다. 국채는 정부가 이자를 주는 빚문서이고, 주식은 회사 지분입니다. 평소에는 안전자산인 국채를 더 사는 흐름이 일반적입니다.",
    titleEn: "Foreigners bought more US stocks than Treasuries for only the third time this century",
    summaryEn: "Overseas investors preferred American equities over the usual safe Treasury bid in a rare mix.",
    body: detailBody(padBody("foreign-us-stocks-vs-bonds", {
      what: `외국인 투자자는 미국 밖에서 미국 자산에 돈을 넣는 주체입니다. 이번 세기 들어 세 번째로, 이들이 미국 국채보다 미국 주식을 더 많이 순매수했습니다.\n\n국채는 미국 정부가 이자를 주기로 한 빚문서라 비교적 안전합니다. 주식은 회사 이익이 나야 값이 오르는 자산입니다.\n\n평소 해외 자금은 위기나 금리 상승기에 국채 쪽으로 붙습니다. 주식이 국채를 이긴 날은 그래서 드뭅니다.`,
      more: `이런 전환은 100년에 세 번 꼴로 드뭅니다. 해외 자금이 미국 기업 이익이 금리를 이길 것이라고 봤다는 해석이 나옵니다.\n\n달러 자산 수요가 채권에서 증시로 옮겨 가면, 주가지수와 환율이 같은 방향으로 움직일 수 있습니다.`,
      longTerm: `미국 기업이 세계 이윤의 큰 몫을 가져가는 한, 해외 자금이 주식을 택하는 장면은 다시 나올 수 있습니다.\n\n장기적으로는 이 흐름이 지속되면 미국 증시의 수급 바닥이 두꺼워집니다. 한 분기만으로 단정할 수는 없지만 방향은 긍정적입니다.`,
      invest: `다음에 확인하면 좋은 것은 다음 분기 국제자금 통계입니다. 같은 방향으로 한 번 더 나오면 추세가 됩니다.\n\n미국 국채 금리와 주가지수가 같이 가는지도 함께 보시면, 자금이 어디에 머무는지 가늠하기 쉽습니다.`,
    })),
  },
  {
    id: "seed-1719",
    slug: "tesla-solar-shade-3x",
    category: "종목분석",
    color: "mint",
    subject: "테슬라 에너지",
    tickers: ["TSLA"],
    title: "테슬라 태양광 패널이 그늘에서도 출력을 최대 33% 더 끌어올리는 방식으로 바뀌고 있습니다",
    summary:
      "테슬라가 가정용 태양광 패널을 전력 구역 세 개로 나눠, 한쪽이 그늘져도 나머지가 더 발전하도록 바꿨습니다. 약한 그늘에서는 출력이 약 25%, 강한 그늘에서는 약 33% 개선됩니다. 지붕 나뭇잎 같은 일상 그늘을 숫자로 줄이려는 설계입니다.",
    titleEn: "Tesla solar panels are being split into three power zones so shade cuts output less",
    summaryEn: "Zoning lifts output about 25% in light shade and 33% in heavier shade instead of dragging the whole sheet down.",
    body: detailBody(padBody("tesla-solar-shade-3x", {
      what: `태양광 패널은 햇빛을 전기로 바꾸는 판입니다. 테슬라는 패널을 전력 구역 세 개로 나눠, 한쪽이 가려져도 나머지 구역이 계속 발전하도록 설계를 바꿨습니다.\n\n예전에는 지붕 한쪽이 나뭇잎에 가려지면 패널 전체 출력이 같이 떨어졌습니다. 구역을 나누면 그늘 난 칸만 쉬고, 햇볕 칸은 전기를 만듭니다.\n\n회사 설명으로는 약한 그늘에서 약 25%, 강한 그늘에서 약 33% 출력이 개선됩니다. 메가팩 공장 사진과 같은 화면에 올라온, 가정용 에너지 쪽 소식입니다.`,
      more: `가정용 태양광의 실사용 효율은 실험실 최대치가 아니라 그늘·먼지·각도에서 갈립니다. 나무와 굴뚝이 있는 지붕일수록 이 설계의 가치가 커집니다.\n\n전력 요금이 오를수록 같은 지붕에서 더 많은 전기를 뽑는 일이 가계에 바로 와닿습니다. 테슬라 에너지는 배터리 메가팩과 지붕 사업을 함께 키우는 회사입니다.`,
      longTerm: `자동차만으로 테슬라를 보면 에너지 매출을 놓칩니다. 지붕과 대형 배터리가 같이 커지면 전력 회사와 겹치는 사업이 됩니다.\n\n그늘 대응은 작은 개선처럼 보여도, 설치 가정이 늘어날수록 합산 발전량이 쌓입니다. 장기 그림은 그 합입니다.`,
      invest: `다음에 확인하면 좋은 것은 설치 가정에서 실제 발전량이 따라오는지입니다. 설계 숫자와 월별 발전량 차이가 줄어드는지가 증거입니다.\n\n에너지 분기 매출에서 솔라 비중이 같이 오르는지도 함께 보시면 됩니다.`,
    })),
  },
  {
    id: "seed-1720",
    slug: "tesla-megapack-77gwh",
    category: "종목분석",
    color: "mint",
    subject: "테슬라",
    tickers: ["TSLA"],
    title: "테슬라 메가팩이 65개국 이상에 77기가와트시 넘게 설치됐습니다",
    summary:
      "메가팩은 발전소·공장 옆에 두는 대형 배터리 컨테이너입니다. 지금까지 77기가와트시 이상이 65개국 이상에 깔렸고 가동률은 99.3%입니다. 라스롭 공장은 연 40기가와트시, 텍사스 3공장은 연 50기가와트시 규모이며 2분기에는 13.5기가와트시가 나갔습니다.",
    titleEn: "Tesla Megapacks have been installed in 65+ countries, totaling over 77 GWh",
    summaryEn: "Uptime is 99.3%; Lathrop and Texas factories target about 90 GWh a year after 13.5 GWh in the second quarter.",
    body: detailBody(padBody("tesla-megapack-77gwh", {
      what: `메가팩은 남는 전기를 모아 두었다가 저녁이나 피크 시간에 다시 내보내는 대형 배터리입니다. 지금까지 전 세계 65개국 이상에 77기가와트시 넘게 설치됐습니다.\n\n가동률 99.3%는 거의 항상 켜져 있다는 뜻입니다. 공장 사진에는 캘리포니아·텍사스·상하이 라인의 큰 컨테이너가 나란히 보입니다.\n\n라스롭 기존 공장은 연 약 40기가와트시, 텍사스 메가팩토리 3는 연 약 50기가와트시를 목표로 합니다. 두 곳을 합치면 연 90기가와트시입니다. 2분기 한 분기에만 13.5기가와트시가 나갔습니다.`,
      more: `기가와트시는 한 시간에 쓸 수 있는 전기의 큰 단위입니다. 77기가와트시면 수백만 가정이 몇 시간 버틸 수 있는 양입니다.\n\n전력망이 태양광·풍력처럼 들쭉날쭉한 발전을 더 받을수록, 이런 대형 배터리가 필요합니다. 테슬라 자동차 판매와 별개인 에너지 저장 매출의 바닥 숫자입니다.`,
      longTerm: `공장 증설이 출하로 이어지면 분기 에너지 매출이 자동차와 다른 축으로 커질 수 있습니다. 65개국으로 이미 퍼진 점은 특정 지역 규제 하나에 덜 묶인다는 뜻이기도 합니다.\n\n장기적으로 전력 요금과 재생에너지 비중이 오를수록 메가팩 수요는 구조적으로 남습니다.`,
      invest: `다음에 확인하면 좋은 것은 다음 분기 출하가 13.5기가와트시를 넘기는지입니다. 공장 목표 90기가와트시와 실제 출하 사이 간격이 줄어드는지가 핵심입니다.\n\n에너지 영업이익이 자동차와 따로 커지는지도 같이 보시면 됩니다.`,
    })),
  },
  {
    id: "seed-1721",
    slug: "spacex-156-startup-data",
    category: "종목분석",
    color: "purple",
    subject: "스페이스X",
    tickers: ["SPCX"],
    title: "스페이스X 장외가가 154.81달러로 오르며 시가총액이 하루 약 510억 달러 늘었습니다",
    summary:
      "스페이스X 장외가가 전일보다 2.60% 오른 154.81달러로, 한 달 고점 156.87달러에 가깝습니다. 시가총액은 하루에 약 510억 달러 늘었습니다. 실패한 스타트업 데이터를 인공지능 학습에 쓰려는 논의가 같은 화면에 올랐습니다.",
    titleEn: "SpaceX shares rose to $154.81, adding about $51 billion of market cap in a day",
    summaryEn: "The pre-IPO tape sat just under a $156.87 one-month high as talks surfaced about buying failed-startup data for AI.",
    body: detailBody(padBody("spacex-156-startup-data", {
      what: `장외가는 거래소에 상장되기 전 장외에서 오가는 가격입니다. 스페이스X는 154.81달러로 2.60% 올랐고, 한 달 고점은 156.87달러입니다.\n\n시가총액은 하루에 약 510억 달러 늘었습니다. 스타십 일정이 28일로 옮겨진 소식과 같은 화면에 겹쳤습니다.\n\n동시에 문을 닫은 스타트업이 남긴 내부 자료를 인공지능 학습에 쓰려는 논의가 나왔습니다. 로켓 회사인 동시에 데이터 매입 이야기도 하고 있는 셈입니다.`,
      more: `상장 전 몸값이 하루에 500억 달러 넘게 움직이면, 이후 가격의 기준점이 다시 매겨집니다. 고점 바로 아래라는 것은 매수세가 아직 붙어 있다는 뜻입니다.\n\n데이터 매입은 구글이 스피릿항공 내부 자료를 사려는 이야기와 같은 줄입니다. 실패한 회사의 기록이 모델 훈련 재료가 되는 흐름입니다.`,
      longTerm: `스페이스X의 장기 축은 발사 원가와 스타링크 구독입니다. 인공지능 데이터는 그 위에 얹히는 새 칸입니다.\n\n장외가가 고점권에 있으면 상장 전 기대가 이미 크게 반영된 상태입니다. 실제 비행과 계약이 그 기대를 받쳐 줘야 합니다.`,
      invest: `다음에 확인하면 좋은 것은 데이터 매입이 실제 계약으로 나오는지입니다. 논의와 서명 사이에는 거리가 있습니다.\n\n스타십 14차 비행 결과가 이 가격을 받치는지가 더 가까운 시험입니다.`,
    })),
  },
];
