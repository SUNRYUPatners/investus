#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1588", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "mint", subject: "한장요약",
    title: "2026년 9월 11일 한장 요약입니다. 스타링크 라우터 4·사이버캡 전비 165·10년물 4.92%·보링 230억 달러를 모았습니다",
    summary: "스타링크 라우터 4가 와이파이 7에 기기 510대·면적 3,500평방피트를 표기했습니다 사이버캡은 공기저항 0.2 미만·전비 165와트시/마일·첫 전륜구동입니다 미국 10년물이 4.92%(+0.08%포인트)로 2023년 10월 이후 최고권입니다 보링컴퍼니는 30억 달러 조달에 기업가치 230억 달러입니다 슬로베니아 완전자율주행 두 달 무상과 다음 스타십 매출 비행 확신이 붙었습니다 더 볼 것: 라우터4 · Cd0.2 · 4.92% · 보링230억 · 슬로베니아 · 스타십매출",
    titleEn: "2026.09.11 snapshot: Router 4, Cybercab 165 Wh/mi, 10-year 4.92%, Boring $23B",
    summaryEn: "Watch: Router 4 · Cd<0.2 · 10y 4.92% · Boring $23B · Slovenia FSD · Starship revenue",
  },
];
REPORTS.push(...require('./fix-reports-20260911-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260911 source loaded', REPORTS.length);
}
