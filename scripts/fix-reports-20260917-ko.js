#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1690", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 17일 한장 요약입니다. 연준 금리 0.25%p 인상·스타십 시총 500억불 급등·노르웨이 20만대를 모았습니다",
    summary: "연준이 새 의장 케빈 워시 취임 첫 회의에서 12명 전원 찬성으로 기준금리를 3.75~4.00%로 올렸습니다. 스페이스X는 스타십 14차 비행(9/22) 발표에 장외 시가총액이 500억 달러 넘게 뛰었고, 테슬라는 노르웨이에서 등록 차량 20만대를 돌파했습니다. 모건스탠리는 엔비디아의 HBM 수요 점유율을 37.3%로 추산했고, SK하이닉스는 인텔 오하이오 공장을 빌려 미국 내 첫 메모리 생산을 검토합니다.",
    titleEn: "2026.09.17 snapshot: Fed hikes 25bp, SpaceX cap jumps $50B on Starship news, Tesla tops 200K in Norway",
    summaryEn: "Watch: the Fed's first hike since 2023 · SpaceX's Starship flight 14 market reaction · Tesla's Norway milestone · Nvidia's HBM demand share · SK Hynix's US production talks.",
  },
];
REPORTS.push(...require('./fix-reports-20260917-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260917 source loaded', REPORTS.length);
}
