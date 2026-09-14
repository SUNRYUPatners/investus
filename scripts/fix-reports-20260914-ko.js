#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1628", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 14일 한장 요약입니다. 오라클 5조 매도 취소·로드스터 10월 1일·앤스로픽 5,180억 달러를 모았습니다",
    summary: "래리 엘리슨이 75억 달러 규모 오라클 주식 매도 계획을 하루 만에 취소했습니다. 테슬라는 10월 1일 텍사스 웨이코에서 새 로드스터 공개 행사를 엽니다. 앤스로픽은 구글·아마존·스페이스X 등에 걸쳐 총 5,170억~5,180억 달러 규모 연산 계약을 맺었고 엔비디아도 앤스로픽 대형 투자를 검토한다는 보도가 나왔습니다. 오스틴에서는 사이버캡 대기시간이 모델Y의 최대 40배로 치솟았고, 유럽연합은 10월 6일 완전자율주행 승인 표결을 앞두고 있습니다.",
    titleEn: "2026.09.14 snapshot: Oracle's canceled $7.5B sale, Roadster Oct 1, Anthropic's $517B build-out",
    summaryEn: "Watch: Ellison's canceled ORCL sale · Roadster Oct 1 in Waco · Anthropic's ~$517B compute deals · Cybercab demand in Austin · EU FSD vote Oct 6.",
  },
];
REPORTS.push(...require('./fix-reports-20260914-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260914 source loaded', REPORTS.length);
}
