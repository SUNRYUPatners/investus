#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1889", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 10월 6일 한장 요약입니다. 스페이스X 171.09달러, 엔비디아 6조 달러, 네덜란드 테슬라 1·2위를 모았습니다",
    summary: "스페이스X는 7.63% 오른 171.09달러입니다. 모건스탠리 목표 주가는 300달러입니다. 엔비디아는 세계에서 처음 시가총액 6조 달러를 넘긴 회사입니다. 네덜란드 9월 신차에서 모델Y와 모델3가 전체 1·2위입니다.",
    titleEn: "2026.10.06 snapshot: SpaceX $171.09, Nvidia $6T, Tesla 1-2 in the Netherlands",
    summaryEn: "Watch: SPCX $171.09 +7.63%, MS $300, Nvidia first $6T, Dutch Model Y and Model 3, Texas Cybercab 45 to 169.",
  },
];
REPORTS.push(...require('./fix-reports-20261006-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20261006 source loaded', REPORTS.length);
}
