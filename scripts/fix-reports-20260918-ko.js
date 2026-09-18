#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1715", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 18일 한장 요약입니다. 스타십 9월 28일·메가팩 77기가와트시·삼성 테일러 AI5를 모았습니다",
    summary: "스타십 14차 비행이 9월 22일에서 28일로 미뤄졌고, 테슬라 메가팩은 전 세계 77기가와트시를 넘겼습니다. 삼성 텍사스 테일러 공장에서는 테슬라 AI5 칩 2나노 시험생산이 시작됐고, 스페이스X 주가는 154.81달러로 시총이 하루 약 510억 달러 늘었습니다. Nebius는 10월 1일부터 GPU 임대료를 약 20% 올린다고 알렸습니다.",
    titleEn: "2026.09.18 snapshot: Starship slips to Sept 28, Megapack tops 77 GWh, Samsung Taylor starts Tesla AI5",
    summaryEn: "Watch: Starship Flight 14 on Sept 28 · Megapack 77+ GWh · Samsung 2nm AI5 · SpaceX $154.81 · Nebius GPU rents +20% · Cybercab 30-40 cents a mile.",
  },
];
REPORTS.push(...require('./fix-reports-20260918-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260918 source loaded', REPORTS.length);
}
