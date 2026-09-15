#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1669", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 16일 한장 요약입니다. 테슬라·스페이스X 합병설 52%·스타십 9월 22일 발사·국채금리 5%대를 모았습니다",
    summary: "예측시장 폴리마켓에서 테슬라·스페이스X 합병 가능성에 52%가 걸렸고, 일론 머스크는 합병 질문에 즉답을 피했습니다. 스페이스X는 스타십 14번째 시험비행을 9월 22일로 확정해 처음으로 지구 궤도에 들어갑니다. 테슬라는 FSD 이용자 보험료를 최대 60% 깎아주기 시작했고 유럽 판매는 한 주 만에 88% 넘게 반등했습니다. 미국 10년물 국채금리는 2007년 이후 최고치인 5.04%까지 올랐습니다.",
    titleEn: "2026.09.16 snapshot: Tesla-SpaceX merger odds hit 52%, Starship set for Sept 22, 10-year yield tops 5%",
    summaryEn: "Watch: Polymarket's Tesla-SpaceX merger odds · Starship's first orbital flight · Tesla's FSD insurance discount and European sales rebound · the 10-year Treasury yield's highest level since 2007.",
  },
];
REPORTS.push(...require('./fix-reports-20260916-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260916 source loaded', REPORTS.length);
}
