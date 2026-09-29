#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1818", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 30일 한장 요약입니다. 크로아티아 승인·845억 달러 연산·200기가와트 태양광을 모았습니다",
    summary: "테슬라 감독 완전자율주행이 크로아티아에서 승인돼 유럽은 여덟 나라입니다. 앤트로픽은 2029년까지 스페이스X 연산에 최대 845억 달러를 쓰겠다고 밝혔습니다. 테슬라와 스페이스X는 태양광 모듈 연 200기가와트를 겨냥한다고 적혔습니다.",
    titleEn: "2026.09.30 snapshot: Croatia FSD, $84.5B compute, 200 GW solar",
    summaryEn: "Watch: Croatia approval · $84.5B · 200 GW · 15 billion miles · Austin $8.33.",
  },
];
REPORTS.push(...require('./fix-reports-20260930-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260930 source loaded', REPORTS.length);
}
