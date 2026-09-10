#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1562", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "mint", subject: "한장요약",
    title: "2026년 9월 10일 한장 요약입니다. 경제 두 배 발언·텍사스 437대·NVL72 7,100억 달러·국채 바이백 60억 달러를 모았습니다",
    summary: "인공지능·로봇이 10년 안에 세계 경제를 두 배로 키울 수 있다는 발언이 나왔습니다 텍사스 자율차 집계는 437대(오늘 +5, 사이버캡 49)입니다 엔비디아 NVL72 랙 매출은 2027년 7,100억 달러 이상(+214%)으로 전망됐습니다 재무부는 장기 바이백을 60억 달러로 세 배 키웠고 10년물은 약 4.83%입니다 스페이스X 락업 약 3.19억 주(7%)가 90일 창에 들어왔고 S&P EPS 2026년 추정은 367(+34%)입니다 구글 핀란드 인프라는 150억 달러 이상입니다 더 볼 것: 경제2배 · 437대 · 7100억 · 바이백60억 · 락업3.19억 · EPS367 · 핀란드150억",
    titleEn: "2026.09.10 snapshot: AI-robot doubling, Texas 437, NVL72 $710B, $6B Treasury buyback",
    summaryEn: "Watch: 2× economy · TX 437 · NVL72 $710B · $6B buyback · 319M unlock · EPS 367 · Finland $15B+",
  },
];
REPORTS.push(...require('./fix-reports-20260910-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260910 source loaded', REPORTS.length);
}
