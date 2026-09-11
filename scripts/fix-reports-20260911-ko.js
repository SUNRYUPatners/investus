#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1588", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "mint", subject: "한장요약",
    title: "2026년 9월 11일 한장 요약입니다. 스타링크 라우터 4·사이버캡 전비 165·10년물 4.92%·보링 230억 달러를 모았습니다",
    summary: "스타링크가 집 안에서 쓰는 새 공유기 라우터 4를 공개했습니다. 최신 무선 규격 와이파이 7로 기기 510대, 면적 약 3,500평방피트까지 커버한다고 적혀 있습니다. 테슬라 로보택시 사이버캡은 공기저항 0.2 미만, 1마일에 165와트시, 첫 전륜구동으로 소개됐습니다. 미국 10년 국채 금리는 4.92%로 2023년 10월 이후 가장 높은 구간입니다. 보링컴퍼니는 30억 달러를 모으고 회사 가치를 230억 달러로 적었습니다. 슬로베니아에서는 완전자율주행을 두 달 무료로 쓸 수 있고, 다음 스타십은 돈을 받는 비행이 될 수 있다는 확신이 나왔습니다.",
    titleEn: "2026.09.11 snapshot: Router 4, Cybercab 165 Wh/mi, 10-year 4.92%, Boring $23B",
    summaryEn: "Watch: Router 4 · Cd<0.2 · 10y 4.92% · Boring $23B · Slovenia FSD · Starship revenue",
  },
];
REPORTS.push(...require('./fix-reports-20260911-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260911 source loaded', REPORTS.length);
}
