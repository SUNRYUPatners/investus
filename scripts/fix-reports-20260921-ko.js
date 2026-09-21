#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1740", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 21일 한장 요약입니다. 스타링크 10만 기·감독 주행 14.3.10·엔비디아 포트를 모았습니다",
    summary: "스페이스X가 스타링크 3세대 위성 최대 10만 기를 신청했고 통신위원회는 9월 18일 서류를 접수했습니다. 테슬라 감독 주행 14.3.10이 차에 내려오기 시작했고, 엔비디아 주식 포트 631억 달러의 80%가 인텔과 상장 스페이스X입니다. 오스틴 무인 사이버캡 등록 비율은 약 2주 만에 30%에서 70% 근처로 올라왔습니다.",
    titleEn: "2026.09.21 snapshot: Starlink 100k filing, FSD 14.3.10, Nvidia book in Intel and SpaceX",
    summaryEn: "Watch: Starlink Gen3 100k · FSD v14.3.10 · Nvidia $63.1B book · Austin driverless 70% · Roadster $5,000 · foreign inflows $942B · Boring tunnel.",
  },
];
REPORTS.push(...require('./fix-reports-20260921-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260921 source loaded', REPORTS.length);
}
