#!/usr/bin/env node
const REPORTS = [
  { id: 'seed-1501', slug: 'summary', pinned: true, bodyOnly: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: "2026년 9월 7일 한장 요약입니다. 사이버캡 출시 다음 주 테슬라 354.08달러·로보택시 앱 1위·전비 6.1마일 이상·웨이모 30억 달러 부채를 모았습니다",
    summary: "사이버캡 공개 다음 주 월요일입니다. 테슬라 주가는 354.08달러로 5.92% 빠졌고, 로보택시 앱은 여행 카테고리 1위, 전비는 킬로와트시당 6.1마일 이상이라는 현장이 겹칩니다. 웨이모는 첫 부채 조달로 30억 달러를 넘는 규모가 거론됐고, 엔비디아 지분 투자는 990억 달러까지 쌓였다는 집계가 나왔습니다.\n\n스타십 14번째 비행은 선박 41호기·부스터 21호기 시험이 끝났고, 연준은 주요국 가운데 9월에 올리지 않을 수 있다는 대비가 퍼졌습니다. 비트코인은 약 8만 달러권, 「집을 살 수 없다」 검색은 사상 최고로 집계됐습니다.\n\n고용은 8월 비농업 +16만 2천 명, 미국 부채는 약 40조 달러 대 경제 약 30조 달러 대비가 같은 화면에 있습니다.",
    titleEn: "Daily snapshot September 7, 2026: Cybercab week pullback, Robotaxi app #1, 6.1+ mi/kWh, Waymo $3B debt",
    summaryEn: "Post-Cybercab week: TSLA $354.08 -5.92%; Robotaxi app #1 travel; 6.1+ mi/kWh; Waymo >$3B debt; NVDA $99B stakes; F14 tests done; Fed vs peers; BTC ~80k; housing affordability ATH searches.",
  },
];
REPORTS.push(...require('./fix-reports-20260907-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260907 source loaded', REPORTS.length);
}
