#!/usr/bin/env node
/**
 * Patch 2026-08-27 report SVGs — enrich thin noteSub / card footers (KO only).
 */
const fs = require('fs');
const path = require('path');

const chartsDir = path.join(__dirname, '../public/charts');

const patches = {
  'anthropic-nscale-45b-vera-rubin-20260827.svg': [
    [
      `<text x="540" y="350" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">6년 460MW, Vera Rubin 칩. Nscale 인프라에 앤트로픽 compute commitment.</text>`,
      `<text x="540" y="350" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">6년 460MW 규모 AI 전용 공장입니다. 베라 루빈(엔비디아 차세대 GPU)을 쓰고,</text>
  <text x="540" y="376" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">내년 말 첫 가동을 목표로 잡혀 있습니다. 칩 주문만이 아니라 전력·부지·냉각까지 묶은 패키지입니다.</text>`,
    ],
    [
      `<text x="210" y="706" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">6-year</text>`,
      `<text x="210" y="706" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">6년 장기 계약</text>`,
    ],
    [
      `<text x="540" y="706" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">AI factory</text>`,
      `<text x="540" y="706" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">460MW 전력 규모</text>`,
    ],
    [
      `<text x="870" y="706" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">NVDA next-gen</text>`,
      `<text x="870" y="706" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">차세대 GPU 루빈</text>`,
    ],
    [
      `<rect x="60" y="760" width="960" height="200" rx="14" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="800" font-family="Arial" font-size="18" fill="#a78bfa" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="840" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">Anthropic growth와 NVDA supply의 접점입니다. MW online과 Rubin 출하가 관건입니다.</text>`,
      `<rect x="60" y="760" width="960" height="200" rx="14" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="788" font-family="Arial" font-size="18" fill="#a78bfa" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="822" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">앤트로픽은 클로드 수요를 키우려면 데이터센터 전력·칩·부지가 한 세트로 잡혀야 합니다. 450억 달러·460MW는</text>
  <text x="540" y="846" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">그 규모를 숫자로 고정한 계약입니다. 단순 GPU 주문이 아니라 6년·전력·냉각까지 포함한 인프라 패키지입니다.</text>
  <text x="540" y="870" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">베라 루빈은 엔비디아 차세대 GPU로, 공식 출시 전 수요를 미리 묶는 신호입니다. 다음에는 MW 상선 일정·</text>
  <text x="540" y="894" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">루빈 칩 납품·할당, 부지 착공 소식을 단계별로 확인하시면 됩니다.</text>`,
    ],
  ],
  'anthropic-nscale-45b-vera-rubin-20260827-en.svg': [
    [
      `<text x="540" y="840" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">Anthropic growth와 NVDA supply의 접점입니다. MW online과 Rubin 출하가 관건입니다.</text>`,
      `<text x="540" y="822" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">Anthropic needs power, chips, and land as one package to scale Claude. The $45B / 460MW deal locks that</text>
  <text x="540" y="846" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">scale in writing—not a GPU order alone but a 6-year infrastructure bundle. Vera Rubin pre-books next-gen</text>
  <text x="540" y="870" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">NVIDIA supply. Watch MW online dates, Rubin allocation, and site groundbreaking in phases.</text>`,
    ],
  ],
  'tsla-grok-think-fast-2-20260827.svg': [
    [
      `<text x="540" y="820" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">차량 OS·AI assistant 경쟁력입니다. 로보택시와 별도 monetization leg. OTA 배포 범위를 확인하세요.</text>`,
      `<text x="540" y="788" font-family="Arial" font-size="18" fill="#4ade80" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="822" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">차 안 AI는 단순 음성 비서가 아니라 차량 설정·내비·음악까지 제어하는 OS 기능입니다. 그록 Think Fast 2.0은</text>
  <text x="540" y="846" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">음성 대화 벤치마크 1위로 잡혀, 소프트웨어 업데이트만으로 차량 경험이 바뀐다는 메시지입니다.</text>
  <text x="540" y="870" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">로보택시와 별개로 구독·프리미엄 AI 수익 축이 생길 수 있습니다. OTA 배포 차종·지역·유료 여부를 확인하세요.</text>`,
    ],
    [
      `<text x="760" y="680" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">broader market</text>`,
      `<text x="760" y="680" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">차량·내비·음악 제어</text>`,
    ],
  ],
  'googl-tpu-v8-broader-market-20260827.svg': [
    [
      `<text x="760" y="680" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">broader market</text>`,
      `<text x="760" y="680" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">외부 AI 시장 겨냥</text>`,
    ],
    [
      `<text x="540" y="820" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">hyperscaler custom silicon이 외부 매출로 나올 수 있습니다. GCP TPU 가격·대형 계약을 확인하세요.</text>`,
      `<text x="540" y="788" font-family="Arial" font-size="18" fill="#4285f4" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="822" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">TPU는 구글이 AI 연산용으로 만든 전용 칩입니다. v8을 사내용을 넘어 외부에 판다는 뜻은, 클라우드·엔터프라이즈</text>
  <text x="540" y="846" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">고객에게 엔비디아 GPU 대신 TPU 옵션을 주겠다는 신호입니다. 메타·아마zon 자체칩과 같은 축입니다.</text>
  <text x="540" y="870" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">GCP TPU 시간당 가격, 대형 기업 계약, v8 출시 일정을 함께 보시면 수요가 실제 매출로 이어지는지 알 수 있습니다.</text>`,
    ],
  ],
  'macro-dc-debt-jll-700b-20260827.svg': [
    [
      `<text x="870" y="588" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">hyperscaler</text>`,
      `<text x="870" y="588" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">빅테크 5社</text>`,
    ],
    [
      `<text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">AI CAPEX와 부채 발행이 동시에 커집니다. GW 착공과 bond issuance를 숫자로 확인하세요.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#94a3b8" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">66GW 파이프라인은 아직 짓지 않은 데이터센터 전력 용량입니다. 2028년까지 7,000억 달러+ 영구 부채는</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">그 건설을 회사채·대출로 돌린다는 뜻입니다. MSFT·META·GOOG·AMZN·ORCL 설비투자와 금리 시장이 같이 움직입니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">다음에는 GW 착공·준공 일정과 실제 채권 발행 규모를 분기별로 대조하시면 됩니다.</text>`,
    ],
  ],
  'spcx-terafab-texas-48b-20260827.svg': [
    [
      `<text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">AI 실리콘 vertical integration 옵션입니다. committed 금액과 착공이 나오기 전까지는 계획으로 두세요.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#c084fc" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">테라팹은 칩 설계·웨이퍼·패키징·시스템을 한 캠퍼스에서 묶는 수직 통합 공장입니다. 서브2nm AI 칩을</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">목표로, 외부 파운드리 의존을 줄이겠다는 그림입니다. 1단계 168억 달러만 확정이고 나머지는 로드맵입니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">2026년 12월 착공·세금 협약 이행, 실제 공사 시작 여부를 계획과 분리해 추적하시면 됩니다.</text>`,
    ],
  ],
  'tsla-robotaxi-16h-6cities-20260827.svg': [
    [
      `<text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">지리·시간·무인이 동시에 늘면 실물 진전입니다. 유료 전환과 사고율을 함께 보시면 됩니다.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#4ade80" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">로보택시는 6개 도시·하루 16시간(오전 6시~밤 10시) 운행으로 범위가 넓어졌습니다. 무인(안전요원 없음) 함대도</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">늘었다는 설명입니다. 도시 수·운행 시간·무인 비율이 동시에 늘어야 ‘규모’ 주장이 실물로 연결됩니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">다음에는 유료 결제 전환, 대기 시간, 사고·개입률을 도시별로 확인하시면 됩니다.</text>`,
    ],
  ],
  'nvda-q2-earnings-20260827.svg': [
    [
      `<text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">AI CAPEX 허브 실적입니다. 숫자는 강하지만 기대치가 더 높았을 수 있습니다. 3분기 가이던스와 데이터센터 믹스를 추적하시면</text>
  <text x="540" y="930" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">됩니다.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#60a5fa" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">매출 961억·주당순이익 2.22달러·데이터센터 890억·총마진 75%로 예상을 모두 넘겼습니다. 그런데 시간외 약 -2%는</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">‘beat’보다 더 높은 기대가 깔려 있었다는 뜻입니다. AI 설비투자 허브 실적이라 빅테크 캡엑스와 같이 봅니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">3분기 가이던스, 데이터센터 믹스, 베라 루빈 출하 코멘트를 다음 확인 포인트로 두시면 됩니다.</text>`,
    ],
  ],
  'spcx-starbase-louisiana-cadence-20260827.svg': [
    [
      `<text x="210" y="588" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">tower</text>`,
      `<text x="210" y="588" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">발사 타워</text>`,
    ],
    [
      `<text x="540" y="588" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">cadence</text>`,
      `<text x="540" y="588" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">하루 발사 빈도</text>`,
    ],
    [
      `<text x="540" y="900" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">위성·화물 비용의 상류입니다. 목표 cadence와 실제 flight rate를 분리해 추적하세요.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#c084fc" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">루이지애나 스타베이스는 스타십 전용 고빈도 발사 기지입니다. 발사대 12개 이상·하루 30척 이상은 위성·화물</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">kg당 비용을 줄이겠다는 목표치입니다. 스타십 4대는 연 200만 톤 이상 궤도 투입을 겨냥합니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">허가·자금·실제 비행률을 계획 숫자와 분리해 추적하시면, 내러티브와 실적의 간격을 알 수 있습니다.</text>`,
    ],
  ],
  'spcx-valuation-1826b-20260827.svg': [
    [
      `<text x="540" y="900" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">우주·위성 내러티브의 밸류 anchor입니다. 상장 전까지 mark discount를 유지하시면 됩니다.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#c084fc" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">시가총액 1조 8,260억 달러로 1조 달러 이상을 51거래일 연속 유지했습니다. 발행가 135달러(+2%) 대비</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">최초 표기 150달러(-8%), 사상 최고 226달러(-70%)입니다. 거래대금 약 70억 달러로 유동성도 함께 봅니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">비상장 mark는 공개 시장과 다를 수 있습니다. 상장 전까지 할인·프리미엄 변동을 발행가와 함께 추적하세요.</text>`,
    ],
  ],
  'macro-us-banks-unrealized-511b-20260827.svg': [
    [
      `<text x="540" y="900" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">macro overlay입니다. 실현 손실과 예금 이탈을 분리해 보시고, 분기 은행 보고서를 확인하세요.</text>`,
      `<text x="540" y="878" font-family="Arial" font-size="18" fill="#94a3b8" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="908" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">미실현 손실 5,117억 달러는 은행이 아직 팔지 않은 채권의 평가 손실입니다. 2분기 연속 늘었다는 점이</text>
  <text x="540" y="932" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">중요합니다. 금리가 높을수록 채권 가격이 내려가 평가손이 커질 수 있습니다.</text>
  <text x="540" y="956" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">AI·데이터센터 부채 확대와 같은 화면의 ‘금융 여력’ 이슈입니다. 실현 손실·예금 이탈을 분리해 분기 보고서를 보세요.</text>`,
    ],
  ],
  'tsla-cybertruck-price-5000-20260827.svg': [
    [
      `<text x="870" y="696" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">EV pickup</text>`,
      `<text x="870" y="696" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">전기 픽업</text>`,
    ],
    [
      `<rect x="60" y="970" width="960" height="0" fill="none"/>`,
      `<rect x="60" y="970" width="960" height="110" rx="14" fill="#061209" stroke="#4ade80" stroke-width="1"/>
  <text x="540" y="998" font-family="Arial" font-size="18" fill="#4ade80" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="1028" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">5,000달러 인상은 원가·마진·수요를 동시에 조정하는 레버입니다. 전기 픽업 시장에서 리비안·포드 등과</text>
  <text x="540" y="1052" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">가격 경쟁이 치열할 때 인상은 수요 테스트이기도 합니다. 인상 후 주문·취소·재고를 함께 보세요.</text>`,
    ],
  ],
  'meta-compute-resale-wf-20260827.svg': [
    [
      `<rect x="60" y="970" width="960" height="0" fill="none"/>`,
      `<rect x="60" y="970" width="960" height="110" rx="14" fill="#0a1420" stroke="#1877f2" stroke-width="1"/>
  <text x="540" y="998" font-family="Arial" font-size="18" fill="#1877f2" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="1028" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">메타는 광고용 GPU를 넘어 2030년 5GW ‘잉여’ 컴퓨트를 다른 기업에 재판매할 수 있다는 시나리오입니다.</text>
  <text x="540" y="1052" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">GW당 380억 투자·200억 매출·73% 마진·38% ROI는 계산 모델이며 실적 가이던스와 다릅니다. 재판매 계약·</text>
  <text x="540" y="1076" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">실제 잉여 전력(MW) 공개 여부를 확인하시면 됩니다.</text>`,
    ],
  ],
  'anthropic-ipo-odds-polymarket-20260827.svg': [
    [
      `<rect x="60" y="970" width="960" height="0" fill="none"/>`,
      `<rect x="60" y="970" width="960" height="110" rx="14" fill="#1a1030" stroke="#a78bfa" stroke-width="1"/>
  <text x="540" y="998" font-family="Arial" font-size="18" fill="#a78bfa" text-anchor="middle">왜 중요한가</text>
  <text x="540" y="1028" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">예측시장 63% vs 37%는 ‘2026년 최대 IPO’에 대한 상대 확률입니다. 7월 말 스페이스X 우세에서 8월</text>
  <text x="540" y="1052" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">앤트로픽 쪽으로 기울었습니다. 확률은 확정이 아니라 기대치입니다. 상장 일정·조달 규모·증권신고서가</text>
  <text x="540" y="1076" font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle">나오면 숫자가 바뀔 수 있습니다.</text>`,
    ],
  ],
};

let changed = 0;
for (const [file, reps] of Object.entries(patches)) {
  const fp = path.join(chartsDir, file);
  if (!fs.existsSync(fp)) {
    console.warn('skip missing', file);
    continue;
  }
  let s = fs.readFileSync(fp, 'utf8');
  for (const [from, to] of reps) {
    if (!s.includes(from)) {
      console.warn('pattern miss in', file);
      continue;
    }
    s = s.replace(from, to);
  }
  fs.writeFileSync(fp, s);
  changed++;
  console.log('patched', file);
}
console.log('done', changed, 'files');
