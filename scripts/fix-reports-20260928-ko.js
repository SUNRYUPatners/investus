#!/usr/bin/env node
const REPORTS = [
  { id: "seed-1792", slug: "summary", pinned: true, bodyOnly: true,
    category: "특집", color: "purple", subject: "한장요약",
    title: "2026년 9월 28일 한장 요약입니다. 노르웨이 98%·중국 RTX 5500·스타십 오늘 밤을 모았습니다",
    summary: "노르웨이 새 차의 98%가 전기차라는 화면이 올랐고, 중국이 알리바바·바이트댄스에 엔비디아 RTX 프로 5500을 풀 수 있다는 소식이 나왔습니다. 스타십 14번째 비행은 오늘 밤 한국 9시 15분에 창을 엽니다. 세계 시총 상위 10곳은 30.66조 달러입니다.",
    titleEn: "2026.09.28 snapshot: Norway 98%, China RTX 5500, Starship tonight",
    summaryEn: "Watch: Norway 98% · China RTX 5500 · Starship 21:15 KST · Blue $30B · Grok $500 · top 10 $30.66T · Tesla 471k.",
  },
];
REPORTS.push(...require('./fix-reports-20260928-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260928 source loaded', REPORTS.length);
}
