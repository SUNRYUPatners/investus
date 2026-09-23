#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1774", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 23일 한장 요약입니다. 세미 2,500대·나스닥 27,226·그록 46점을 모았습니다",
    summary: "화물 동맹이 전기 대형 트럭 2,500대를 주문하고 테슬라를 주 공급사로 골랐습니다. 나스닥 차트 종가는 27,226.40으로 사상 최고입니다. 그록 4.7은 지능 지수 46점이고, 미국 모델3·모델Y 2026년 새 주문은 거의 소진됐다고 알려졌습니다.",
    titleEn: "2026.09.23 snapshot: Semi 2,500, Nasdaq 27,226, Grok 46",
    summaryEn: "Watch: ZET SCALE 2,500 · Nasdaq 27,226.40 · Grok 46 · US 3/Y sold out · Cybercab $12.16 · 715 acres · household stocks 39.9%.",
  },
];
REPORTS.push(...require('./fix-reports-20260923-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260923 source loaded', REPORTS.length);
}
