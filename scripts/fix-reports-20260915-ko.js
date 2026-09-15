#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1648", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 15일 한장 요약입니다. 앤스로픽 137억 달러 컴퓨트 계약·로보택시 1,001대·해외자금 미국증시 60%를 모았습니다",
    summary: "인공지능 회사 앤스로픽이 트럼프 측과 연계된 럼 그룹과 137억 달러 규모 컴퓨트 계약을 맺은 사실이 알려졌고, 2개 분기 연속 흑자와 나스닥 상장도 함께 보도됐습니다. 테슬라의 로보택시(사이버캡) 차량은 1,001대로 늘며 트립 7,345회를 기록했습니다. 해외 투자자의 미국 증시 비중은 60%로 역대 최고치를 찍었고, 미국 국채 이자 비용은 연 1.7조 달러로 늘어날 수 있다는 전망도 나왔습니다.",
    titleEn: "2026.09.15 snapshot: Anthropic's $13.7B compute deal, robotaxi fleet passes 1,001, foreign holdings hit 60%",
    summaryEn: "Watch: Anthropic-RUM Group compute deal · Tesla robotaxi fleet at 1,001 vehicles · foreign ownership of US equities at a record 60% · Treasury interest costs.",
  },
];
REPORTS.push(...require('./fix-reports-20260915-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260915 source loaded', REPORTS.length);
}
