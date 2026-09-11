#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1610", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "mint", subject: "한장요약",
    title: "2026년 9월 12일 한장 요약입니다. 스타십 9월 18일·FSD 15·사이버캡 15대·주택 매도 57.9%를 모았습니다",
    summary: "스타십 14번째 비행이 9월 18일 아침 7시 15분부터 9시 14분(미국 중부)으로 잡혔고, 첫 매출 비행에 스타링크 3세대 위성을 싣는다고 했습니다. 테슬라 완전자율주행 감독 모드 15번은 위험 예측이 더 빠르고 충돌을 더 잘 피한다고 나왔습니다. 펜실베이니아 주차장에 사이버캡 15대가 대기 중이고, 미국 집 시장은 8월 기준 매도자가 매수자보다 57.9% 많습니다. 스페이스엑스 재무책임자는 인공지능 연산 계약이 12월부터 한 달에 11억 1천만 달러를 낸다고 했습니다.",
    titleEn: "2026.09.12 snapshot: Starship Sep 18, FSD v15, 15 Cybercabs, housing 57.9%",
    summaryEn: "Watch: Flight 14 Sep 18 · FSD v15 · 15 Cybercabs · housing 57.9% · $1.11B/mo compute",
  },
];
REPORTS.push(...require('./fix-reports-20260912-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260912 source loaded', REPORTS.length);
}
