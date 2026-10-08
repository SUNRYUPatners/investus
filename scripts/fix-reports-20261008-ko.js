#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1914", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 10월 7일 한장 요약입니다. 스페이스X 172.38달러, 메타 목표 1,000달러, 테슬라 3분기 48만 6,532대를 모았습니다",
    summary: "스페이스X는 일주일 17.52% 오른 172.38달러입니다. 웰스파고는 메타 목표 주가를 1,000달러로 올렸습니다. 테슬라는 3분기에 48만 6,532대를 인도했고, 일본 상반기 외국차에서 모델Y가 1위입니다.",
    titleEn: "2026.10.08 snapshot: SpaceX $172.38, Meta $1,000 target, Tesla Q3 486,532",
    summaryEn: "Watch: SPCX $172.38 +17.52% week, Wells Fargo Meta $1,000, Tesla Q3 deliveries, Japan Model Y No.1, S&P record and $71T.",
  },
];
REPORTS.push(...require('./fix-reports-20261008-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20261008 source loaded', REPORTS.length);
}
