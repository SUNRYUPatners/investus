#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1810", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 29일 한장 요약입니다. 스타십 첫 궤도·아랍에미리트 검증·할부 이율 인상을 모았습니다",
    summary: "스타십 14번째 비행이 첫 궤도에 들어간 뒤 하와이 북쪽 태평양에 떨어졌고, 스타링크 3세대 26기가 전개됐습니다. 아랍에미리트는 테슬라 감독 완전자율주행 검증을 올렸고, 미국 할부 이율은 트림마다 0.50%포인트 올랐습니다. 로드스터는 10월 15일, 소비심리는 48.1입니다.",
    titleEn: "2026.09.29 snapshot: Starship first orbit, UAE FSD check, Tesla APR lift",
    summaryEn: "Watch: Flight 14 orbit · 26 V3s · UAE FSD Supervised · APR +50bps · Roadster Oct 15 · sentiment 48.1.",
  },
];
REPORTS.push(...require('./fix-reports-20260929-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260929 source loaded', REPORTS.length);
}
