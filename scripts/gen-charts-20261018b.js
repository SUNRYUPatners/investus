#!/usr/bin/env node
// 한장 요약 카드 — 2026-10-18 (KO + EN)  · 6 topics
const fs   = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '../public/charts');
const W = 1080, H = 1350;

async function save(slug, svg) {
  fs.writeFileSync(path.join(OUT, slug + '.svg'), svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, slug + '.png'));
  console.log('✓', slug + '.png');
}

function topDefs(c1, c2) {
  return `<defs>
  <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0D1117"/><stop offset="100%" stop-color="#080C14"/>
  </linearGradient>
  <linearGradient id="tBar" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="50%" stop-color="#8B5CF6"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <linearGradient id="divG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}" stop-opacity="0"/><stop offset="30%" stop-color="${c1}"/>
    <stop offset="70%" stop-color="${c2}"/><stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bgG)"/>
<rect x="0" y="0" width="${W}" height="12" fill="url(#tBar)"/>`;
}

function topicRow(y, num, accent, title, desc) {
  return `<rect x="54" y="${y}" width="${W-108}" height="136" rx="16" fill="#0F1520" stroke="${accent}33" stroke-width="1.5"/>
<text x="82" y="${y+44}" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="${accent}" font-weight="900">${num}</text>
<text x="130" y="${y+44}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#E6EDF3" font-weight="900">${title}</text>
<text x="82" y="${y+84}" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">${desc}</text>
<rect x="82" y="${y+102}" width="60" height="3" rx="2" fill="${accent}" opacity="0.5"/>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// KO 한장요약
// ─────────────────────────────────────────────────────────────────────────────
async function summaryKo() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topDefs('#EF4444', '#60A5FA')}

<!-- 헤더 -->
<rect x="54" y="28" width="200" height="38" rx="8" fill="#EF444422" stroke="#EF4444" stroke-width="1.5"/>
<text x="154" y="53" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#EF4444" text-anchor="middle" font-weight="900">2026.10.18</text>
<rect x="270" y="28" width="200" height="38" rx="8" fill="#60A5FA22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="370" y="53" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#60A5FA" text-anchor="middle" font-weight="900">6 TOPICS</text>
<rect x="486" y="28" width="200" height="38" rx="8" fill="#8B5CF622" stroke="#8B5CF6" stroke-width="1.5"/>
<text x="586" y="53" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#8B5CF6" text-anchor="middle" font-weight="900">한장요약</text>

<!-- 히어로 -->
<text x="54" y="148" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#fff" font-weight="900">오늘의 핵심</text>
<text x="54" y="226" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">로드스터 공개 · Terafab · Q3 실적 · Meta · AAPL · NVDA</text>
<rect x="54" y="248" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>

<!-- 6 topics -->
${topicRow(262, '①', '#EF4444', 'Tesla Roadster 공개', '3트림 확정 · SpaceX 스러스터 · 0→100 1.8초 · TSLA +4%')}
${topicRow(410, '②', '#60A5FA', 'Terafab 합병 논의', 'Barclays $3.5T · Terafab $16.8T · 12월 6일 AGM · 헤지 전략')}
${topicRow(558, '③', '#34D399', 'SPCX/TSLA Q3 실적 프리뷰', 'SPCX 10/20 · TSLA 10/21 · 차량마진 · FSD 전환율 · 에너지')}
${topicRow(706, '④', '#A78BFA', 'Meta Muse Spark Open 816B', '42B 활성 · 1M 컨텍스트 · Mac Studio 2대 · 오픈 웨이트 최초')}
${topicRow(854, '⑤', '#6366F1', 'Apple iPhone Duo 완판', '$1,999~ 완판 · Jan 2027 배송 · FY2027 Q1 집중 인식')}
${topicRow(1002, '⑥', '#76C442', 'NVDA -1.84% · AMD 하향', 'AMD 75% 하향 ≠ NVDA 수요 부정 · CoWoS 우선배분 · Jevons 유지')}

<!-- 푸터 -->
<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W-54}" y="${H-30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">2026.10.18 · 6 topics</text>
</svg>`;
  await save('summary-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// EN summary
// ─────────────────────────────────────────────────────────────────────────────
async function summaryEn() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topDefs('#EF4444', '#60A5FA')}

<!-- header badges -->
<rect x="54" y="28" width="200" height="38" rx="8" fill="#EF444422" stroke="#EF4444" stroke-width="1.5"/>
<text x="154" y="53" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#EF4444" text-anchor="middle" font-weight="900">Oct 18, 2026</text>
<rect x="270" y="28" width="200" height="38" rx="8" fill="#60A5FA22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="370" y="53" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#60A5FA" text-anchor="middle" font-weight="900">6 TOPICS</text>
<rect x="486" y="28" width="200" height="38" rx="8" fill="#8B5CF622" stroke="#8B5CF6" stroke-width="1.5"/>
<text x="586" y="53" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#8B5CF6" text-anchor="middle" font-weight="900">DAILY BRIEF</text>

<!-- hero -->
<text x="54" y="148" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#fff" font-weight="900">TODAY'S BRIEF</text>
<text x="54" y="226" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Roadster · Terafab · Q3 Earnings · Meta · AAPL · NVDA</text>
<rect x="54" y="248" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>

<!-- 6 topics -->
${topicRow(262, '①', '#EF4444', 'Tesla Roadster Revealed', '3 trims · SpaceX thruster · 0–60 in 1.8s · TSLA +4%')}
${topicRow(410, '②', '#60A5FA', 'Terafab Merger Thesis', 'Barclays $3.5T · Terafab $16.8T · Dec 6 AGM · hedge strategy')}
${topicRow(558, '③', '#34D399', 'SPCX/TSLA Q3 Earnings Preview', 'SPCX Oct 20 · TSLA Oct 21 · margins · FSD conversion · energy')}
${topicRow(706, '④', '#A78BFA', 'Meta Muse Spark Open 816B', '42B active · 1M context · runs on 2 Mac Studios · first open-weight GPT-5 tier')}
${topicRow(854, '⑤', '#6366F1', 'Apple iPhone Duo Sold Out', 'From $1,999 · Jan 2027 delivery · FY2027 Q1 revenue recognition')}
${topicRow(1002, '⑥', '#76C442', 'NVDA -1.84% · AMD Forecast Cut', "AMD 75% cut ≠ NVDA demand signal · CoWoS priority · Jevons intact")}

<!-- footer -->
<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W-54}" y="${H-30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">Oct 18, 2026 · 6 topics</text>
</svg>`;
  await save('summary-20261018-en', svg);
}

async function main() {
  await summaryKo();
  await summaryEn();
  console.log('\n✅ 한장요약 카드 2장 완료 (KO + EN)');
}
main().catch(console.error);
