#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const REPORTS = [
  { id: 'seed-1476', slug: 'summary', pinned: true, bodyOnly: true,
    category: '특집', color: 'mint', subject: '한장요약',
    title: "2026년 9월 4일 한장 요약입니다. 사이버캡 행사·요금 4.20달러·한국 1만 400대·엔비디아 129억 달러 인수·스페이스X 150달러를 모았습니다",
    summary: "9월 3일 밤에 열린 오스틴 사이버캡 행사 다음 날입니다. 테슬라 주가는 376.37달러로 5.42% 올랐고, 앱은 요금 4.20달러와 사이버캡 2인승·모델와이 4인승을 보여 줬습니다. 전비 165와트시/마일, 텍사스 420대 중 무인 인가 45대, 한국 8월 1만 400대가 같은 주에 겹칩니다.\n\n엔비디아는 허깅페이스를 약 129억 달러에 사는 공시를 냈고, 스페이스X 비상장 호가는 약 150달러에 시가총액 2조 달러 서사가 붙었습니다. 연산 전력 1.4기가와트, 배스트롭 830에이커, 사우스헤이븐 60만 평방피트도 같은 축입니다.\n\n오늘 밤 미국 8월 비농업 고용과 9월 15~16일 연준 회의가 금리·성장주 공통 변수입니다.",
    titleEn: "Daily snapshot September 4, 2026: Cybercab event, $4.20 fare, Korea 10,400, Nvidia $12.93B, SpaceX $150",
    summaryEn: "Post-Cybercab: TSLA $376.37 +5.42%, $4.20 fare, 165 Wh/mi, Korea 10,400, NVDA $12.93B Hugging Face, SPCX ~$150 / 1.4 GW. NFP tonight.",
  },
];
REPORTS.push(...require('./fix-reports-20260904-ko-reports.js'));
module.exports = { REPORTS };
if (require.main === module) {
  console.log('fix-reports-20260904 source loaded', REPORTS.length);
}
