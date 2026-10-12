#!/usr/bin/env node
// 카드뉴스 — 2026-10-12 TSLA × SPCX 인스타 카드 스타일
// 레이아웃: 헤더 → 아이브로우 → HUGE 히어로 → 서브헤드 → 시각요소 → 3 스탯카드 → 메시지박스 → 푸터
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUT = path.join(__dirname, '../public/charts');
const W = 1080, H = 1350;

async function save(filename, svg) {
  const svgPath = path.join(OUT, filename + '.svg');
  const pngPath = path.join(OUT, filename + '.png');
  fs.writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  console.log('✓', filename + '.png');
}

// ── 바차트 헬퍼 ──────────────────────────────────────────────────────────
function hbar(x, y, label, value, maxVal, barW, h, color) {
  const filled = Math.round((value / maxVal) * barW);
  return `
<text x="${x}" y="${y + 22}" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">${label}</text>
<rect x="${x + 220}" y="${y}" width="${barW}" height="${h}" rx="6" fill="#21262D"/>
<rect x="${x + 220}" y="${y}" width="${filled}" height="${h}" rx="6" fill="${color}"/>
<text x="${x + 220 + filled + 10}" y="${y + 22}" font-family="Arial Black,Arial,sans-serif" font-size="21" fill="#fff" font-weight="900">${value}B</text>`;
}

// ── 스탯카드 ──────────────────────────────────────────────────────────────
function stat(x, y, w, label, big, sub, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="130" rx="16" fill="#161B22" stroke="${accent}" stroke-width="2"/>
<text x="${x+w/2}" y="${y+36}" font-family="Arial,sans-serif" font-size="19" fill="${accent}" text-anchor="middle" font-weight="700">${label}</text>
<text x="${x+w/2}" y="${y+84}" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">${big}</text>
<text x="${x+w/2}" y="${y+114}" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">${sub}</text>`;
}

// ── 불릿 ──────────────────────────────────────────────────────────────────
function bullet(x, y, dot, text, color) {
  return `<circle cx="${x+14}" cy="${y+14}" r="7" fill="${color}"/>
<text x="${x+34}" y="${y+22}" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">${text}</text>`;
}

async function main() {

  // ── KO 카드뉴스 ────────────────────────────────────────────────────────
  const barW = 540;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0D1117"/>
    <stop offset="100%" stop-color="#0A0E1A"/>
  </linearGradient>
  <linearGradient id="topBar" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#FF4D6D"/>
    <stop offset="50%" stop-color="#A855F7"/>
    <stop offset="100%" stop-color="#60A5FA"/>
  </linearGradient>
  <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#FF4D6D" stop-opacity="0"/>
    <stop offset="30%" stop-color="#FF4D6D"/>
    <stop offset="70%" stop-color="#60A5FA"/>
    <stop offset="100%" stop-color="#60A5FA" stop-opacity="0"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

<!-- ① 상단 그라디언트 바 -->
<rect x="0" y="0" width="${W}" height="12" fill="url(#topBar)"/>

<!-- ② 헤더 배지 -->
<rect x="54" y="30" width="88" height="36" rx="8" fill="#FF4D6D"/>
<text x="98" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">TSLA</text>
<rect x="156" y="30" width="88" height="36" rx="8" fill="#60A5FA"/>
<text x="200" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">SPCX</text>
<rect x="258" y="30" width="108" height="36" rx="8" fill="#6366F1"/>
<text x="312" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">카드뉴스</text>

<!-- ③ 아이브로우 -->
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 테슬라 &amp; 스페이스X 핵심 업데이트</text>

<!-- ④ HUGE 히어로 -->
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#fff" font-weight="900">TESLA</text>
<text x="54" y="318" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="url(#topBar)" font-weight="900">× SPACEX</text>

<!-- ⑤ 서브헤드 -->
<text x="54" y="364" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">로보택시 현실화 · AI 우주 인프라 도약</text>

<!-- ⑥ 구분선 -->
<rect x="54" y="390" width="${W-108}" height="3" fill="url(#divGrad)" rx="2"/>

<!-- ⑦ 시각요소 — SPCX 스타클라우드 고객별 바차트 -->
<text x="54" y="432" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#60A5FA" font-weight="900">스타클라우드 연환산 매출 — $41.2B</text>
<rect x="740" y="410" width="286" height="40" rx="8" fill="#0D2A1A" stroke="#34D399" stroke-width="1.5"/>
<text x="883" y="436" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle" font-weight="900">네오클라우드比 +93% 프리미엄</text>
${hbar(54, 452, '앤트로픽', 15, 15, barW, 28, '#60A5FA')}
${hbar(54, 492, '신규 고객', 13.3, 15, barW, 28, '#818CF8')}
${hbar(54, 532, '구글', 11, 15, barW, 28, '#60A5FA')}
${hbar(54, 572, '리플렉션AI', 1.8, 15, barW, 28, '#38BDF8')}

<!-- ⑧ 3 스탯카드 -->
${stat(54,  630, 306, '사이버캡 오스틴', '8배', '30일 · 300대+ · 달라스', '#FF4D6D')}
${stat(384, 630, 306, '스타클라우드', '$41.2B', '연환산 4개 계약', '#60A5FA')}
${stat(714, 630, 312, '스타팩토리', '1,000기', '연간 목표 · 2028', '#34D399')}

<!-- ⑨ 메시지박스 -->
<rect x="54" y="786" width="${W-108}" height="430" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="830" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">오늘 핵심 요약</text>
<line x1="82" y1="844" x2="${W-82}" y2="844" stroke="#30363D" stroke-width="1"/>

${bullet(82, 860, '●', '사이버캡 파리 유럽 첫 공개 — 실운행 차량 전시, TSLA +0.6%', '#FF4D6D')}
${bullet(82, 924, '●', 'FSD → TAD 유럽 9개국 리브랜딩 — 독일 압박 6주 만', '#FF4D6D')}
${bullet(82, 988, '●', '옵티머스 V3 나사 조립 성공 — 자석 수출 규제가 생산 병목', '#FF4D6D')}
${bullet(82, 1052, '●', 'SPCX $40B 엔비디아 칩 차입 — 아폴로 주도·핌코 참여', '#60A5FA')}

<!-- 달력 -->
<rect x="82" y="1128" width="${W-164}" height="66" rx="12" fill="#1A2233" stroke="#FBBF24" stroke-width="1.5"/>
<text x="110" y="1154" font-family="Arial,sans-serif" font-size="19" fill="#FBBF24">📅 다음 체크포인트</text>
<text x="110" y="1182" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">10월 21일 — 테슬라 3Q 실적 컨퍼런스콜</text>

<!-- ⑩ 푸터 -->
<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W-54}" y="${H-30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">2026.10.12</text>

</svg>`;

  await save('tsla-spcx-card-20261012', svg);
}

main().catch(console.error);
