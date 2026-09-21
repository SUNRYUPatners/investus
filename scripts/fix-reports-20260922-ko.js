#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1756", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 22일 한장 요약입니다. 스타십 궤도·체코 감독 주행·그록 4.7을 모았습니다",
    summary: "머스크는 첫 궤도 스타십이 운영용 스타링크 3세대 26기를 싣는다고 했습니다. 체코에서 감독 주행이 승인됐고, 그록 4.7이 입력 2달러·출력 6달러로 나왔습니다. 메타 페탈 해저망은 초당 1페타비트, 사이버캡 원가 인터뷰는 마일당 1.20달러입니다.",
    titleEn: "2026.09.22 snapshot: orbital Starship, Czech FSD, Grok 4.7",
    summaryEn: "Watch: Flight 14 V3 · Czech FSD · Grok 4.7 $2/$6 · Petal 1 Pbps · Cybercab $1.20/mi · S&P breadth 49.5% · reuse 2027.",
  },
];
REPORTS.push(...require('./fix-reports-20260922-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260922 source loaded', REPORTS.length);
}
