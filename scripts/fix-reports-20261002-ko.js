#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1864", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 10월 2일 한장 요약입니다. 슈퍼차저 2.4테라와트시, 스타링크 1만 1,153기, 연준 동결 76.2%를 모았습니다",
    summary: "테슬라 충전망은 3분기에 2.4테라와트시를 흘렸고 세션은 6,900만 번입니다. 스타링크는 지구 궤도에 약 1만 1,153기가 있습니다. 10월 28일 연준은 동결 76.2%, 인상 23.8%입니다. 일본 10년 금리는 3.1299%입니다.",
    titleEn: "2026.10.02 snapshot: 2.4 TWh Supercharging, 11,153 Starlinks, 76.2% Fed hold",
    summaryEn: "Watch: 2.4 TWh, 69M sessions, 11,153 satellites, Fed hold 76.2%, Japan 10-year 3.1299%.",
  },
];
REPORTS.push(...require('./fix-reports-20261002-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20261002 source loaded', REPORTS.length);
}
