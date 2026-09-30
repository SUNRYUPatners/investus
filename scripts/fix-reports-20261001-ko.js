#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1840", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 10월 1일 한장 요약입니다. 스타십 300기가와트, 마이크론 실적, 노르웨이 모델Y를 모았습니다",
    summary: "스타십은 해마다 인공지능 연산 300기가와트 이상을 올리겠다고 했습니다. 씨티는 스페이스X 가치를 12조 달러로 말했습니다. 마이크론 매출은 542억 달러, 노르웨이 9월 모델Y는 4,796대입니다.",
    titleEn: "2026.10.01 snapshot: Starship 300 GW, Micron beat, Norway Model Y",
    summaryEn: "Watch: 300 GW, Citi $12T, Micron $54.2B, Norway 4,796 Model Ys.",
  },
];
REPORTS.push(...require('./fix-reports-20261001-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20261001 source loaded', REPORTS.length);
}
