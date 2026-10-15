#!/usr/bin/env node
// SVG chart generator — 2026-10-15 summary cards (KO + EN)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '../public/charts');
const W = 1080, H = 1350;

function svgWrap(inner, bg = '#0D1117') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${bg}"/>
${inner}
</svg>`;
}

function badge(x, y, text, fill, textColor = '#fff') {
  const pw = text.length * 13 + 24;
  return `<rect x="${x}" y="${y}" width="${pw}" height="36" rx="8" fill="${fill}"/>
<text x="${x + pw/2}" y="${y + 24}" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="20" fill="${textColor}" text-anchor="middle">${text}</text>`;
}

function footer(dateStr = '2026.10.15') {
  return `<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W-54}" y="${H-30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">${dateStr}</text>`;
}

async function save(filename, svgContent) {
  const svgPath = path.join(OUT, filename + '.svg');
  const pngPath = path.join(OUT, filename + '.png');
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  await sharp(Buffer.from(svgContent)).png().toFile(pngPath);
  console.log('✓', filename + '.png');
}

async function main() {

  // ── summary-20261015 (KO) ─────────────────────────────────────────
  {
    const svg = svgWrap(`
<defs>
  <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#EF4444"/>
    <stop offset="50%" stop-color="#8B5CF6"/>
    <stop offset="100%" stop-color="#10B981"/>
  </linearGradient>
</defs>
<rect x="0" y="0" width="${W}" height="10" fill="url(#hg)"/>
${badge(54, 28, '한장요약', '#8B5CF6')}
${badge(182, 28, '2026.10.15', '#374151')}
${badge(344, 28, '11 TOPICS', '#1F2937')}
<text x="54" y="108" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">오늘의 핵심 11가지</text>
<text x="54" y="152" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026년 10월 15일 · investus.kr 선별 요약</text>

<rect x="54" y="172" width="${W-108}" height="3" fill="#1F2937" rx="2"/>

<text x="54" y="218" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">① BREAKING</text>
<text x="54" y="252" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">테슬라 로드스터, 오늘 오후 7:55 CT 생중계 공개</text>
<rect x="54" y="268" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="308" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">② xAI</text>
<text x="54" y="342" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Grok Voice 3.0 출시 — 스타링크 2만 통화/일 70% 자동 해결</text>
<rect x="54" y="358" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="398" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">③ 사이버캡</text>
<text x="54" y="432" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">오스틴 플릿 399대 · 화요일 무인 490회 (+18% WoW)</text>
<rect x="54" y="448" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="488" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F97316" font-weight="900">④ CPI</text>
<text x="54" y="522" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">미국 9월 CPI 3.7% — 예상 3.6% 상회, 휘발유 +9.1%</text>
<rect x="54" y="538" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="578" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B5CF6" font-weight="900">⑤ SPCX</text>
<text x="54" y="612" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">모건스탠리 목표주가 $300 재확인 · DIC 핵심 성장 동력</text>
<rect x="54" y="628" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="668" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">⑥ 옵티머스</text>
<text x="54" y="702" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">신젠트 트랜스미션 선전 IPO 신청 — 행성 롤러 스크류 공급</text>
<rect x="54" y="718" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="758" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">⑦ 일본</text>
<text x="54" y="792" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">모델 Y, 2026년 9월 일본 외국차 차종별 판매 1위</text>
<rect x="54" y="808" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="848" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">⑧ 중국 NEV</text>
<text x="54" y="882" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">테슬라 차이나 9월 4위 6.0% · BYD 22.8% · Leapmotor 3위</text>
<rect x="54" y="898" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="938" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">⑨ 옵션</text>
<text x="54" y="972" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">TSLA 430C 04/16/2027 — 4,846계약 $13.3M 하루 플로우</text>
<rect x="54" y="988" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="1028" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#22C55E" font-weight="900">⑩ NVDA</text>
<text x="54" y="1062" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">젠슨 황 — 불안전 AI 개발사에 칩 공급 중단 선언</text>
<rect x="54" y="1078" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="1118" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">⑪ 테슬라 에너지</text>
<text x="54" y="1152" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">NightHawk Bocamno 2 Megapack · 텍사스 브라조리아 완공</text>
<rect x="54" y="1168" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="${W/2}" y="1220" font-family="Arial,sans-serif" font-size="20" fill="#4B5563" text-anchor="middle">로드스터 공개 + Q3 실적(10/21) — 변동성 높은 구간</text>
${footer()}`);
    await save('summary-20261015', svg);
  }

  // ── summary-20261015-en (EN) ──────────────────────────────────────
  {
    const svg = svgWrap(`
<defs>
  <linearGradient id="hgen" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#EF4444"/>
    <stop offset="50%" stop-color="#8B5CF6"/>
    <stop offset="100%" stop-color="#10B981"/>
  </linearGradient>
</defs>
<rect x="0" y="0" width="${W}" height="10" fill="url(#hgen)"/>
${badge(54, 28, 'Daily Snapshot', '#8B5CF6')}
${badge(230, 28, '2026.10.15', '#374151')}
${badge(392, 28, '11 TOPICS', '#1F2937')}
<text x="54" y="108" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">Today's 11 Key Stories</text>
<text x="54" y="152" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">October 15, 2026 · Selected by investus.kr</text>

<rect x="54" y="172" width="${W-108}" height="3" fill="#1F2937" rx="2"/>

<text x="54" y="218" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">① BREAKING</text>
<text x="54" y="252" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Tesla Roadster reveal livestreams tonight at 7:55PM CT</text>
<rect x="54" y="268" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="308" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">② xAI</text>
<text x="54" y="342" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Grok Voice 3.0 launches — Starlink 20k calls/day, 70% auto-resolved</text>
<rect x="54" y="358" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="398" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">③ Cybercab</text>
<text x="54" y="432" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Austin fleet 399 vehicles · 490 driverless sightings Tue (+18% WoW)</text>
<rect x="54" y="448" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="488" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F97316" font-weight="900">④ CPI</text>
<text x="54" y="522" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">US Sept CPI 3.7% YoY — beat 3.6% est, gasoline +9.1%</text>
<rect x="54" y="538" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="578" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B5CF6" font-weight="900">⑤ SPCX</text>
<text x="54" y="612" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Morgan Stanley reiterates $300 PT · DIC as top growth driver</text>
<rect x="54" y="628" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="668" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">⑥ Optimus</text>
<text x="54" y="702" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Xinjian Transmission files Shenzhen IPO — planetary roller screw T1</text>
<rect x="54" y="718" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="758" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">⑦ Japan</text>
<text x="54" y="792" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Model Y tops Japan foreign car sales ranking in September 2026</text>
<rect x="54" y="808" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="848" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">⑧ China NEV</text>
<text x="54" y="882" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Tesla China Sept: 4th at 6.0% · BYD 22.8% · Leapmotor 3rd 7.2%</text>
<rect x="54" y="898" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="938" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">⑨ Options</text>
<text x="54" y="972" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">TSLA 430C Apr-2027 — 4,846 contracts, $13.3M single-day flow</text>
<rect x="54" y="988" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="1028" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#22C55E" font-weight="900">⑩ NVDA</text>
<text x="54" y="1062" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">Jensen Huang: would halt chip supply to unsafe AI developers</text>
<rect x="54" y="1078" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="54" y="1118" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">⑪ Tesla Energy</text>
<text x="54" y="1152" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">NightHawk Bocamno 2 Megapack complete · Brazoria County TX</text>
<rect x="54" y="1168" width="${W-108}" height="2" fill="#1F2937" rx="1"/>

<text x="${W/2}" y="1220" font-family="Arial,sans-serif" font-size="20" fill="#4B5563" text-anchor="middle">Roadster reveal + Q3 earnings (Oct 21) — expect elevated volatility</text>
${footer()}`);
    await save('summary-20261015-en', svg);
  }

  console.log('\n✅ Summary cards done.');
}

main().catch(console.error);
