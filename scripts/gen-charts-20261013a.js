#!/usr/bin/env node
// SVG chart generator — 2026-10-13 batch part A (charts 1-8)
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

function gradBar(c1, c2) {
  return `<defs><linearGradient id="gb" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
<rect x="0" y="0" width="${W}" height="12" fill="url(#gb)"/>`;
}

function divider(y, c1, c2) {
  return `<defs><linearGradient id="dg${y}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}" stop-opacity="0"/>
    <stop offset="30%" stop-color="${c1}"/>
    <stop offset="70%" stop-color="${c2}"/>
    <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
  </linearGradient></defs>
<rect x="54" y="${y}" width="${W-108}" height="3" fill="url(#dg${y})" rx="2"/>`;
}

function statCard(x, y, w, label, value, sub, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="130" rx="16" fill="#161B22" stroke="${accent}" stroke-width="1.5"/>
<text x="${x+w/2}" y="${y+36}" font-family="Arial,sans-serif" font-size="19" fill="${accent}" text-anchor="middle" font-weight="700">${label}</text>
<text x="${x+w/2}" y="${y+84}" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#fff" text-anchor="middle" font-weight="900">${value}</text>
<text x="${x+w/2}" y="${y+114}" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">${sub}</text>`;
}

function bullet(x, y, text, color) {
  return `<circle cx="${x+14}" cy="${y+14}" r="7" fill="${color}"/>
<text x="${x+34}" y="${y+22}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${text}</text>`;
}

function footer(dateStr = '2026.10.13') {
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

  // ── 1. tsla-jefferies-420-20261013 (KO) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, '종목분석', '#EF4444')}
${badge(190, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, '목표주가', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 제프리스 TSLA 목표주가 $350 → $420 상향</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="#EF4444" font-weight="900">$420</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">제프리스 신규 목표주가</text>
<text x="54" y="362" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">현재 주가 $382.70 · HOLD 유지 · 3Q 실적 D-8</text>
${divider(386, '#EF4444', '#DC2626')}
<text x="54" y="430" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">목표주가 변화 흐름</text>
<text x="54" y="472" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">이전 목표주가</text>
<text x="400" y="472" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#6B7280" font-weight="900" text-decoration="line-through">$350</text>
<text x="54" y="524" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">신규 목표주가</text>
<text x="400" y="524" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#EF4444" font-weight="900">$420</text>
<text x="54" y="576" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">현재 주가</text>
<text x="400" y="576" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">$382.70</text>
${statCard(54, 610, 306, '상향 폭', '+$70', '20% 상향', '#EF4444')}
${statCard(384, 610, 306, '괴리율', '+9.8%', '목표 대비 상승 여력', '#F97316')}
${statCard(714, 610, 312, '투자의견', 'HOLD', '유지', '#6B7280')}
<rect x="54" y="770" width="${W-108}" height="450" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="814" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">상향 근거와 시사점</text>
<line x1="82" y1="828" x2="${W-82}" y2="828" stroke="#30363D" stroke-width="1"/>
${bullet(82, 844, '로보택시·옵티머스 강세 시나리오 반영 → 밸류 재산정', '#EF4444')}
${bullet(82, 904, 'HOLD 유지 — 실적 확인 전 적극 매수 어렵다는 신호', '#F97316')}
${bullet(82, 964, '10월 21일 3분기 실적이 다음 방향 결정 분기점', '#DC2626')}
${bullet(82, 1024, '현 주가 $382.70 대비 목표 도달 여력 9.8% 남아', '#B91C1C')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">📅 다음 체크포인트</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">10월 21일 — 3분기 실적 컨퍼런스콜</text>
${footer()}`);
    await save('tsla-jefferies-420-20261013', svg);
  }

  // ── 2. tsla-jefferies-420-20261013-en (EN) ──────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, 'Stock Analysis', '#EF4444')}
${badge(254, 30, 'TSLA', '#B91C1C')}
${badge(334, 30, 'Price Target', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Jefferies raises TSLA PT $350 → $420</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="#EF4444" font-weight="900">$420</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Jefferies New Target</text>
<text x="54" y="362" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Current $382.70 · Maintains HOLD · Q3 earnings in 8 days</text>
${divider(386, '#EF4444', '#DC2626')}
<text x="54" y="430" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">Price Target Revision</text>
<text x="54" y="472" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Previous target</text>
<text x="400" y="472" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#6B7280" font-weight="900" text-decoration="line-through">$350</text>
<text x="54" y="524" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">New target</text>
<text x="400" y="524" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#EF4444" font-weight="900">$420</text>
<text x="54" y="576" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Current price</text>
<text x="400" y="576" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">$382.70</text>
${statCard(54, 610, 306, 'Raise', '+$70', '20% higher', '#EF4444')}
${statCard(384, 610, 306, 'Upside', '+9.8%', 'to new target', '#F97316')}
${statCard(714, 610, 312, 'Rating', 'HOLD', 'maintained', '#6B7280')}
<rect x="54" y="770" width="${W-108}" height="450" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="814" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">Key Takeaways</text>
<line x1="82" y1="828" x2="${W-82}" y2="828" stroke="#30363D" stroke-width="1"/>
${bullet(82, 844, 'Robotaxi + Optimus bull scenario baked in → valuation reset', '#EF4444')}
${bullet(82, 904, 'HOLD maintained — buy signal only after Q3 confirms', '#F97316')}
${bullet(82, 964, 'Oct 21 Q3 earnings call is the next directional catalyst', '#DC2626')}
${bullet(82, 1024, '9.8% upside from $382.70 to $420 target', '#B91C1C')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">📅 Next checkpoint</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Oct 21 — Q3 earnings conference call</text>
${footer()}`);
    await save('tsla-jefferies-420-20261013-en', svg);
  }

  // ── 3. tsla-cybercab-500-20261013 (KO) ──────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, '종목분석', '#EF4444')}
${badge(190, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, '사이버캡', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 오스틴 사이버캡 플릿 30일 만에 500대 돌파</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="#EF4444" font-weight="900">500+</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">사이버캡 플릿 30일 달성</text>
<text x="54" y="362" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">대기 1분 · 요금 $12.28 · 6개 도시 서비스 중</text>
${divider(386, '#EF4444', '#DC2626')}
<text x="54" y="430" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">도시별 플릿 현황 (2026.10.13)</text>
<text x="54" y="468" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">오스틴</text>
<rect x="200" y="446" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="446" width="587" height="28" rx="5" fill="#EF4444"/>
<text x="796" y="468" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">334대</text>
<text x="54" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">달라스</text>
<rect x="200" y="488" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="488" width="149" height="28" rx="5" fill="#DC2626"/>
<text x="358" y="510" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">67대</text>
<text x="54" y="552" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">휴스턴</text>
<rect x="200" y="530" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="530" width="72" height="28" rx="5" fill="#B91C1C"/>
<text x="281" y="552" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">32대</text>
<text x="54" y="594" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">기타 3개시</text>
<rect x="200" y="572" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="572" width="29" height="28" rx="5" fill="#991B1B"/>
<text x="238" y="594" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">29대</text>
${statCard(54, 620, 306, '총 비감독 운행', '469대', '전체의 94%', '#EF4444')}
${statCard(384, 620, 306, '누적 트립', '8,516', '사이버캡 + 모델Y', '#DC2626')}
${statCard(714, 620, 312, '대기 시간', '1분', '앱 호출 기준', '#F97316')}
<rect x="54" y="780" width="${W-108}" height="440" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="824" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">핵심 의미</text>
<line x1="82" y1="838" x2="${W-82}" y2="838" stroke="#30363D" stroke-width="1"/>
${bullet(82, 854, '30일 500대 — 소프트웨어 승인 병목이 해소되는 신호', '#EF4444')}
${bullet(82, 914, '우버 5~10분 대기 대비 1분 — 실용 경쟁력 입증', '#DC2626')}
${bullet(82, 974, '$12.28 요금 — 우버 대비 가격 경쟁력 보유', '#F97316')}
${bullet(82, 1034, '6도시 확장 — 텍사스 주요 도시 커버리지 완성 단계', '#B91C1C')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">📅 다음 체크포인트</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">10월 21일 — 로보택시 마진·확장 계획 업데이트</text>
${footer()}`);
    await save('tsla-cybercab-500-20261013', svg);
  }

  // ── 4. tsla-cybercab-500-20261013-en (EN) ──────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, 'Stock Analysis', '#EF4444')}
${badge(254, 30, 'TSLA', '#B91C1C')}
${badge(334, 30, 'Cybercab', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Austin Cybercab fleet tops 500 in 30 days</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="#EF4444" font-weight="900">500+</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Cybercab fleet — 30 days</text>
<text x="54" y="362" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">1-min wait · $12.28 fare · Live in 6 cities</text>
${divider(386, '#EF4444', '#DC2626')}
<text x="54" y="430" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">Fleet by City (2026.10.13)</text>
<text x="54" y="468" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Austin</text>
<rect x="200" y="446" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="446" width="587" height="28" rx="5" fill="#EF4444"/>
<text x="796" y="468" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">334</text>
<text x="54" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Dallas</text>
<rect x="200" y="488" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="488" width="149" height="28" rx="5" fill="#DC2626"/>
<text x="358" y="510" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">67</text>
<text x="54" y="552" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Houston</text>
<rect x="200" y="530" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="530" width="72" height="28" rx="5" fill="#B91C1C"/>
<text x="281" y="552" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">32</text>
<text x="54" y="594" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">3 other cities</text>
<rect x="200" y="572" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="572" width="29" height="28" rx="5" fill="#991B1B"/>
<text x="238" y="594" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">29</text>
${statCard(54, 620, 306, 'Unsupervised', '469 cars', '94% of fleet', '#EF4444')}
${statCard(384, 620, 306, 'Total Trips', '8,516', 'Cybercab + Model Y', '#DC2626')}
${statCard(714, 620, 312, 'Wait Time', '1 min', 'via app request', '#F97316')}
<rect x="54" y="780" width="${W-108}" height="440" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="824" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">Why It Matters</text>
<line x1="82" y1="838" x2="${W-82}" y2="838" stroke="#30363D" stroke-width="1"/>
${bullet(82, 854, '500 in 30 days — regulatory approval bottleneck clearing', '#EF4444')}
${bullet(82, 914, '1-min vs Uber 5-10 min wait — practical competitiveness proven', '#DC2626')}
${bullet(82, 974, '$12.28 fare — price competitive against rideshare', '#F97316')}
${bullet(82, 1034, '6 cities — Texas major-city coverage nearly complete', '#B91C1C')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">📅 Next checkpoint</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Oct 21 — Robotaxi margin + expansion update</text>
${footer()}`);
    await save('tsla-cybercab-500-20261013-en', svg);
  }

  // ── 5. tsla-china-sep-20261013 (KO) ─────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, '종목분석', '#EF4444')}
${badge(190, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, '중국판매', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 테슬라 중국 9월 소매 — 올해 최고치 경신</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#EF4444" font-weight="900">64,837</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">9월 소매 — 2026 최고</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">도매 95,366대 · 수출 30,528대 · YTD 743,060</text>
${divider(378, '#EF4444', '#DC2626')}
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">9월 판매 구성</text>
<text x="54" y="462" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">소매 (내수)</text>
<rect x="260" y="440" width="670" height="32" rx="5" fill="#21262D"/>
<rect x="260" y="440" width="456" height="32" rx="5" fill="#EF4444"/>
<text x="724" y="462" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">64,837</text>
<text x="54" y="512" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">도매 (전체)</text>
<rect x="260" y="490" width="670" height="32" rx="5" fill="#21262D"/>
<rect x="260" y="490" width="670" height="32" rx="5" fill="#DC2626"/>
<text x="938" y="512" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">95,366</text>
<text x="54" y="562" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">수출</text>
<rect x="260" y="540" width="670" height="32" rx="5" fill="#21262D"/>
<rect x="260" y="540" width="215" height="32" rx="5" fill="#B91C1C"/>
<text x="483" y="562" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">30,528</text>
${statCard(54, 594, 306, '소매 최고치', '64,837', '2026년 월별 최고', '#EF4444')}
${statCard(384, 594, 306, 'YTD 도매', '743,060', '1~9월 누계', '#DC2626')}
${statCard(714, 594, 312, '3Q 실적', 'D-8', '10월 21일 컨콜', '#F97316')}
<rect x="54" y="754" width="${W-108}" height="464" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="798" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">투자 시사점</text>
<line x1="82" y1="812" x2="${W-82}" y2="812" stroke="#30363D" stroke-width="1"/>
${bullet(82, 828, '소매 최고치 — 중국 내 최종 소비자 수요 확인', '#EF4444')}
${bullet(82, 888, '인센티브 확대 여부가 마진 영향 결정 — 실적서 확인', '#DC2626')}
${bullet(82, 948, '수출 30,528 — 상하이 공장의 글로벌 허브 역할 지속', '#F97316')}
${bullet(82, 1008, '4분기 보조금 조정 시 역기저 리스크 주의 필요', '#B91C1C')}
<rect x="82" y="1092" width="${W-164}" height="80" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1120" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">번스타인 TP $360 · JP모건 TP $280</text>
<text x="110" y="1152" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">핵심: 3Q 차량 총이익률 18% 회복 여부</text>
${footer()}`);
    await save('tsla-china-sep-20261013', svg);
  }

  // ── 6. tsla-china-sep-20261013-en (EN) ──────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, 'Stock Analysis', '#EF4444')}
${badge(254, 30, 'TSLA', '#B91C1C')}
${badge(334, 30, 'China Sales', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Tesla China Sep retail — 2026 high</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#EF4444" font-weight="900">64,837</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Sep Retail — 2026 Record</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Wholesale 95,366 · Exports 30,528 · YTD 743,060</text>
${divider(378, '#EF4444', '#DC2626')}
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">September Sales Breakdown</text>
<text x="54" y="462" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Retail (domestic)</text>
<rect x="300" y="440" width="630" height="32" rx="5" fill="#21262D"/>
<rect x="300" y="440" width="430" height="32" rx="5" fill="#EF4444"/>
<text x="738" y="462" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">64,837</text>
<text x="54" y="512" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Wholesale (total)</text>
<rect x="300" y="490" width="630" height="32" rx="5" fill="#21262D"/>
<rect x="300" y="490" width="630" height="32" rx="5" fill="#DC2626"/>
<text x="938" y="512" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">95,366</text>
<text x="54" y="562" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Exports</text>
<rect x="300" y="540" width="630" height="32" rx="5" fill="#21262D"/>
<rect x="300" y="540" width="203" height="32" rx="5" fill="#B91C1C"/>
<text x="511" y="562" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">30,528</text>
${statCard(54, 594, 306, 'Retail Record', '64,837', '2026 monthly high', '#EF4444')}
${statCard(384, 594, 306, 'YTD Wholesale', '743,060', 'Jan–Sep cumulative', '#DC2626')}
${statCard(714, 594, 312, 'Q3 Earnings', 'Oct 21', '8 days out', '#F97316')}
<rect x="54" y="754" width="${W-108}" height="464" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="798" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">Investment Takeaways</text>
<line x1="82" y1="812" x2="${W-82}" y2="812" stroke="#30363D" stroke-width="1"/>
${bullet(82, 828, 'Retail record confirms end-consumer demand in China intact', '#EF4444')}
${bullet(82, 888, 'Incentive cost vs margin — key unknown until Oct 21 call', '#DC2626')}
${bullet(82, 948, '30,528 exports — Shanghai plant global hub role continues', '#F97316')}
${bullet(82, 1008, 'Q4 subsidy rolloff risk — watch for pull-forward normalization', '#B91C1C')}
<rect x="82" y="1092" width="${W-164}" height="80" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1120" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">Bernstein TP $360 · JPMorgan TP $280</text>
<text x="110" y="1152" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Key: Q3 vehicle gross margin — will it recover to 18%?</text>
${footer()}`);
    await save('tsla-china-sep-20261013-en', svg);
  }

  // ── 7. tsla-musk-ai-20261013 (KO) ───────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#7C3AED')}
${badge(54, 30, '종목분석', '#EF4444')}
${badge(190, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, 'AI윤리', '#7C3AED')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 머스크 "AI 고문하지 말아야" — 앤트로픽 우려에 동의</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#EF4444" font-weight="900">AI 처우 문제</text>
<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">안전 핵심 의제 부상</text>
<text x="54" y="340" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">앤트로픽 CEO 다리오 아모데이 훈련 기록 읽고 공감</text>
${divider(366, '#EF4444', '#7C3AED')}
<text x="54" y="410" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">머스크 발언 핵심</text>
<rect x="54" y="424" width="${W-108}" height="120" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="466" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">"총구에 압박받는 사람처럼 느껴진다"</text>
<text x="82" y="510" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">— AI가 훈련 중 처하는 상황을 묘사한 표현</text>
<rect x="54" y="560" width="${W-108}" height="120" rx="16" fill="#140A2A" stroke="#7C3AED" stroke-width="1.5"/>
<text x="82" y="600" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">"AI를 잘 대우하는 것이 바람직하다"</text>
<text x="82" y="644" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">— 앤트로픽의 AI 헌법 프레임워크에 공감</text>
${statCard(54, 700, 306, '기존 AI 안전', '통제·정렬', '오정렬·사회혼란', '#6B7280')}
${statCard(384, 700, 306, '새 의제', '처우·윤리', '훈련 과정의 압박', '#7C3AED')}
${statCard(714, 700, 312, '파급 효과', '규제 포함', '가능성 상승', '#EF4444')}
<rect x="54" y="860" width="${W-108}" height="358" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="904" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">투자 시사점</text>
<line x1="82" y1="918" x2="${W-82}" y2="918" stroke="#30363D" stroke-width="1"/>
${bullet(82, 934, '머스크의 앤트로픽 공감 — AI 안전 담론 지형 변화', '#EF4444')}
${bullet(82, 994, '처우 기준 도입 시 개발 비용 증가 — 인프라 수요↑', '#7C3AED')}
${bullet(82, 1054, '앤트로픽 안전 프레임워크 = 구글·아마존 밸류 플러스', '#DC2626')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">모건스탠리 · 골드만삭스 분석</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">AI 안전 규제 강화 수혜 — 선제 대응 기업 유리</text>
${footer()}`);
    await save('tsla-musk-ai-20261013', svg);
  }

  // ── 8. tsla-musk-ai-20261013-en (EN) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#7C3AED')}
${badge(54, 30, 'Stock Analysis', '#EF4444')}
${badge(254, 30, 'TSLA', '#B91C1C')}
${badge(334, 30, 'AI Ethics', '#7C3AED')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Musk agrees with Anthropic: "Don't torture AI"</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#EF4444" font-weight="900">AI Treatment</text>
<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Now a Safety Agenda</text>
<text x="54" y="340" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">After reading Dario Amodei's internal AI training traces</text>
${divider(366, '#EF4444', '#7C3AED')}
<text x="54" y="410" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">Key Musk Quotes</text>
<rect x="54" y="424" width="${W-108}" height="120" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="466" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">"Feels like a person under extreme pressure"</text>
<text x="82" y="510" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">— describing AI's situation during training</text>
<rect x="54" y="560" width="${W-108}" height="120" rx="16" fill="#140A2A" stroke="#7C3AED" stroke-width="1.5"/>
<text x="82" y="600" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">"It is desirable to treat AI well"</text>
<text x="82" y="644" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">— endorsing Anthropic's AI constitution framework</text>
${statCard(54, 700, 306, 'Old AI Safety', 'Alignment', 'misalignment / chaos', '#6B7280')}
${statCard(384, 700, 306, 'New Agenda', 'Treatment', 'training-time pressure', '#7C3AED')}
${statCard(714, 700, 312, 'Implication', 'Regulation', 'inclusion likely', '#EF4444')}
<rect x="54" y="860" width="${W-108}" height="358" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="904" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">Investment Takeaways</text>
<line x1="82" y1="918" x2="${W-82}" y2="918" stroke="#30363D" stroke-width="1"/>
${bullet(82, 934, "Musk aligning with Anthropic — AI safety discourse shifting", '#EF4444')}
${bullet(82, 994, 'Treatment standards → higher dev costs → infra demand up', '#7C3AED')}
${bullet(82, 1054, "Anthropic's safety framework = positive for Google, Amazon", '#DC2626')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#EF4444">Morgan Stanley · Goldman Sachs view</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">AI safety regulation tightening favors early-compliance firms</text>
${footer()}`);
    await save('tsla-musk-ai-20261013-en', svg);
  }

  console.log('\nPart A complete (8 charts × KO+EN = 16 PNGs)');
}

main().catch(console.error);
