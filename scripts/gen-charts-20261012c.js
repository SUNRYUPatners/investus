#!/usr/bin/env node
// SVG chart generator — 2026-10-12 batch-3
// New topics: 한국시장(KOSPI, 삼성전자) · 안전자산(미국채, 금) · 가상자산(BTC prices, BTC macro)
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

function hbar(x, y, label, value, maxVal, barW, h, color) {
  const filled = Math.round((value / maxVal) * barW);
  return `
<text x="${x}" y="${y + 22}" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">${label}</text>
<rect x="${x + 200}" y="${y}" width="${barW}" height="${h}" rx="5" fill="#21262D"/>
<rect x="${x + 200}" y="${y}" width="${filled}" height="${h}" rx="5" fill="${color}"/>
<text x="${x + 200 + filled + 10}" y="${y + 22}" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">${value}</text>`;
}

function bullet(x, y, text, color) {
  return `<circle cx="${x+14}" cy="${y+14}" r="7" fill="${color}"/>
<text x="${x+34}" y="${y+22}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${text}</text>`;
}

function footer(dateStr = '2026.10.12') {
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

  // ── 1. kospi-drop-20261012 (KO) ─────────────────────────────────────
  {
    const barW = 530;
    const svg = svgWrap(`
${gradBar('#FB923C', '#F97316')}
<!-- 헤더 배지 -->
${badge(54, 30, '한국시장', '#FB923C')}
${badge(190, 30, '코스피', '#EA580C')}
${badge(282, 30, '급락', '#991B1B')}
<!-- 아이브로우 -->
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 코스피 3.65% 폭락 — 외국인 10일 연속 순매도</text>
<!-- HUGE 히어로 -->
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FB923C" font-weight="900">-3.65%</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="60" fill="#fff" font-weight="900">코스피 6,384</text>
<!-- 서브헤드 -->
<text x="54" y="360" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">외국인 2조 200억 순매도 · 10월 누계 10조 원 돌파</text>
<!-- 구분선 -->
${divider(384, '#FB923C', '#F97316')}
<!-- 시각요소 — 주요 종목 낙폭 바차트 -->
<text x="54" y="428" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">시가총액 상위 낙폭 (2026.10.12)</text>
${hbar(54, 446, '코스피 지수', 3.65, 5, barW, 28, '#FB923C')}
${hbar(54, 486, '삼성전자', 4.39, 5, barW, 28, '#F97316')}
${hbar(54, 526, 'SK하이닉스', 4.52, 5, barW, 28, '#EA580C')}
${hbar(54, 566, '코스닥 지수', 4.83, 5, barW, 28, '#C2410C')}
<!-- 3 스탯카드 -->
${statCard(54, 630, 306, '외국인 순매도', '2.02조', '10일 연속', '#FB923C')}
${statCard(384, 630, 306, '10월 누계', '10조↑', '외국인 순매도', '#F97316')}
${statCard(714, 630, 312, '코스피 종가', '6,384', '-241pt', '#EA580C')}
<!-- 메시지박스 -->
<rect x="54" y="790" width="${W-108}" height="430" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="834" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">오늘 핵심 요약</text>
<line x1="82" y1="848" x2="${W-82}" y2="848" stroke="#30363D" stroke-width="1"/>
${bullet(82, 864, '코스피 241p 급락 — 지수가 6,400선 아래 두 달 만', '#FB923C')}
${bullet(82, 924, '삼성 역대최대 실적에도 주가 -4.4% — 수급이 실적 압도', '#F97316')}
${bullet(82, 984, 'SK하이닉스 -4.52% 동반 하락 — 메모리 섹터 전반 매도', '#EA580C')}
${bullet(82, 1044, '자사주 매입 종료 후 매수 주체 공백 — 구조적 취약점', '#C2410C')}
<rect x="82" y="1128" width="${W-164}" height="66" rx="12" fill="#1A1208" stroke="#FB923C" stroke-width="1.5"/>
<text x="110" y="1154" font-family="Arial,sans-serif" font-size="19" fill="#FB923C">📅 다음 체크포인트</text>
<text x="110" y="1182" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">10월 말 — 환율 안정·외국인 복귀 여부 확인</text>
${footer()}`);
    await save('kospi-drop-20261012', svg);
  }

  // ── 2. kospi-drop-20261012-en (EN) ──────────────────────────────────
  {
    const barW = 530;
    const svg = svgWrap(`
${gradBar('#FB923C', '#F97316')}
${badge(54, 30, 'Korea Market', '#FB923C')}
${badge(242, 30, 'KOSPI', '#EA580C')}
${badge(328, 30, 'Plunge', '#991B1B')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · KOSPI -3.65% — Foreigners sell 10th straight session</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FB923C" font-weight="900">-3.65%</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="60" fill="#fff" font-weight="900">KOSPI 6,384</text>
<text x="54" y="360" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Foreigners net sold ₩2.02T · Oct cumulative tops ₩10T</text>
${divider(384, '#FB923C', '#F97316')}
<text x="54" y="428" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">Key Declines — 2026.10.12</text>
${hbar(54, 446, 'KOSPI Index', 3.65, 5, barW, 28, '#FB923C')}
${hbar(54, 486, 'Samsung', 4.39, 5, barW, 28, '#F97316')}
${hbar(54, 526, 'SK Hynix', 4.52, 5, barW, 28, '#EA580C')}
${hbar(54, 566, 'KOSDAQ', 4.83, 5, barW, 28, '#C2410C')}
${statCard(54, 630, 306, 'Foreign Net Sell', '₩2.02T', '10 consecutive days', '#FB923C')}
${statCard(384, 630, 306, 'Oct Cumulative', '₩10T+', 'foreign selling', '#F97316')}
${statCard(714, 630, 312, 'KOSPI Close', '6,384', '-241 pts', '#EA580C')}
<rect x="54" y="790" width="${W-108}" height="430" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="834" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">Key Takeaways</text>
<line x1="82" y1="848" x2="${W-82}" y2="848" stroke="#30363D" stroke-width="1"/>
${bullet(82, 864, 'KOSPI dropped 241pts — first close below 6,400 in 2 months', '#FB923C')}
${bullet(82, 924, 'Samsung record earnings but -4.4% — supply overwhelms beats', '#F97316')}
${bullet(82, 984, 'SK Hynix -4.52% — broad memory sector foreign selling', '#EA580C')}
${bullet(82, 1044, 'Share buyback ended — structural support gone, bears moved in', '#C2410C')}
<rect x="82" y="1128" width="${W-164}" height="66" rx="12" fill="#1A1208" stroke="#FB923C" stroke-width="1.5"/>
<text x="110" y="1154" font-family="Arial,sans-serif" font-size="19" fill="#FB923C">📅 Next checkpoint</text>
<text x="110" y="1182" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Late Oct — FX stabilization · foreign flow reversal</text>
${footer()}`);
    await save('kospi-drop-20261012-en', svg);
  }

  // ── 3. samsung-q3-20261012 (KO) ─────────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FB923C', '#F59E0B')}
${badge(54, 30, '한국시장', '#FB923C')}
${badge(190, 30, '삼성전자', '#B45309')}
${badge(302, 30, '어닝', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 삼성전자 3Q 역대최대 실적 → 주가 역대 아이러니</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="68" fill="#F59E0B" font-weight="900">107조 4천억</text>
<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="54" fill="#FB923C" font-weight="900">역대 최대 영업이익</text>
<text x="54" y="340" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">그런데 주가는 -4.39% ↓ 250,500원</text>
${divider(368, '#FB923C', '#F59E0B')}
<!-- 실적 구성 시각화 -->
<text x="54" y="412" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F59E0B" font-weight="900">3Q 영업이익 구성 — 107.4조 원</text>
<rect x="54" y="428" width="756" height="42" rx="8" fill="#92400E"/>
<rect x="54" y="428" width="529" height="42" rx="8" fill="#F59E0B"/>
<text x="286" y="458" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#000" font-weight="900">반도체 70%</text>
<text x="600" y="458" font-family="Arial,sans-serif" font-size="19" fill="#8B949E"> 기타 30%</text>
<text x="54" y="495" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">HBM 수요 강세 · 낸드 가격 반등 · 반도체 74.98조 원 추정</text>
<!-- 3 스탯카드 -->
${statCard(54, 530, 306, '3Q 영업이익', '107.4조', '분기 역대 최대', '#F59E0B')}
${statCard(384, 530, 306, '주가 낙폭', '-4.39%', '250,500원 마감', '#EF4444')}
${statCard(714, 530, 312, '외국인 매도', '10일', '연속 · 1조+ 순매도', '#FB923C')}
<!-- 메시지박스 -->
<rect x="54" y="696" width="${W-108}" height="524" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="740" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F59E0B" font-weight="900">실적·수급 디커플링 핵심</text>
<line x1="82" y1="754" x2="${W-82}" y2="754" stroke="#30363D" stroke-width="1"/>
${bullet(82, 770, '역대 최대 실적 발표일에 4.4% 급락 — 선반영 후 차익실현', '#F59E0B')}
${bullet(82, 830, '자사주 매입 종료 → 하단 지지 매수 주체 소멸', '#FB923C')}
${bullet(82, 890, 'SK하이닉스도 -4.52% — 메모리 섹터 전반 수급 악화', '#EA580C')}
${bullet(82, 950, '4Q 메모리 단가 방향·中 규제 추가 강화가 다음 변수', '#F97316')}
<rect x="82" y="1026" width="${W-164}" height="80" rx="12" fill="#1A150A" stroke="#F59E0B" stroke-width="1.5"/>
<text x="110" y="1054" font-family="Arial,sans-serif" font-size="20" fill="#F59E0B" font-weight="700">미래에셋증권 목표주가 350,000원 유지</text>
<text x="110" y="1086" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">외국인 수급 안정 → 반등 분기점</text>
${footer()}`);
    await save('samsung-q3-20261012', svg);
  }

  // ── 4. samsung-q3-20261012-en (EN) ──────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FB923C', '#F59E0B')}
${badge(54, 30, 'Korea Market', '#FB923C')}
${badge(242, 30, 'Samsung', '#B45309')}
${badge(354, 30, 'Earnings', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · Samsung record Q3 profit — stock falls 4.4% anyway</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="68" fill="#F59E0B" font-weight="900">₩107.4 Trillion</text>
<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="54" fill="#FB923C" font-weight="900">Record Q3 Op Profit</text>
<text x="54" y="340" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">But stock -4.39% ↓ to ₩250,500</text>
${divider(368, '#FB923C', '#F59E0B')}
<text x="54" y="412" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F59E0B" font-weight="900">Q3 OP Profit Mix — ₩107.4T</text>
<rect x="54" y="428" width="756" height="42" rx="8" fill="#92400E"/>
<rect x="54" y="428" width="529" height="42" rx="8" fill="#F59E0B"/>
<text x="240" y="458" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#000" font-weight="900">Semiconductors 70%</text>
<text x="600" y="458" font-family="Arial,sans-serif" font-size="19" fill="#8B949E"> Others 30%</text>
<text x="54" y="495" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">HBM demand strong · NAND price recovery · Semi ≈₩75T</text>
${statCard(54, 530, 306, 'Q3 Op Profit', '₩107.4T', 'All-time quarterly record', '#F59E0B')}
${statCard(384, 530, 306, 'Stock Drop', '-4.39%', '₩250,500 close', '#EF4444')}
${statCard(714, 530, 312, 'Foreign Selling', '10 days', 'consecutive · ₩1T+', '#FB923C')}
<rect x="54" y="696" width="${W-108}" height="524" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="740" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F59E0B" font-weight="900">Earnings vs Supply Decoupling</text>
<line x1="82" y1="754" x2="${W-82}" y2="754" stroke="#30363D" stroke-width="1"/>
${bullet(82, 770, 'Record earnings day → -4.4% — buy-the-rumor sell-the-news', '#F59E0B')}
${bullet(82, 830, 'Share buyback ended → no structural price floor support', '#FB923C')}
${bullet(82, 890, 'SK Hynix -4.52% — broad memory sector foreign selling', '#EA580C')}
${bullet(82, 950, 'Q4 DRAM pricing + China export rules = next catalyst', '#F97316')}
<rect x="82" y="1026" width="${W-164}" height="80" rx="12" fill="#1A150A" stroke="#F59E0B" stroke-width="1.5"/>
<text x="110" y="1054" font-family="Arial,sans-serif" font-size="20" fill="#F59E0B" font-weight="700">Mirae Asset TP ₩350,000 maintained</text>
<text x="110" y="1086" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Foreign flow reversal = inflection point</text>
${footer()}`);
    await save('samsung-q3-20261012-en', svg);
  }

  // ── 5. us-treasury-yield-20261012 (KO) ──────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#34D399', '#10B981')}
${badge(54, 30, '안전자산', '#10B981')}
${badge(190, 30, '미국채', '#059669')}
${badge(282, 30, '금리급등', '#065F46')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 미국채 10년 5.24% — 글로벌 채권 긴장 최고조</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#34D399" font-weight="900">5.24%</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="60" fill="#fff" font-weight="900">미국채 10년</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">장중 5.34% — 2002년 이후 24년 만 최고</text>
${divider(376, '#34D399', '#10B981')}
<!-- 금리 비교 바 -->
<text x="54" y="420" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#34D399" font-weight="900">글로벌 주요 금리 비교</text>
${hbar(54, 436, '미국채 10년', 5.24, 7, 550, 28, '#34D399')}
${hbar(54, 476, '영국 30년', 6.0, 7, 550, 28, '#10B981')}
${hbar(54, 516, '달러(DXY)', 102.21, 110, 550, 28, '#6EE7B7')}
${hbar(54, 556, '국제 유가', 107, 120, 550, 28, '#059669')}
${statCard(54, 610, 306, '미국채 10년', '5.24%', '장중 5.34% 터치', '#34D399')}
${statCard(384, 610, 306, '영국 30년', '6.0%', '주요국 동반 급등', '#10B981')}
${statCard(714, 610, 312, '달러(DXY)', '102.21', '강세 유지', '#6EE7B7')}
<rect x="54" y="770" width="${W-108}" height="450" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="814" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#34D399" font-weight="900">오늘 핵심 요약</text>
<line x1="82" y1="828" x2="${W-82}" y2="828" stroke="#30363D" stroke-width="1"/>
${bullet(82, 844, '5%대 금리 장기화 — 연내 금리인하 기대 2회→1회 이하로', '#34D399')}
${bullet(82, 904, '영국 30년 6% 돌파 — 글로벌 채권시장 긴장 고조', '#10B981')}
${bullet(82, 964, '달러 강세 102 — 신흥국 부채 부담·원화 약세 압력', '#6EE7B7')}
${bullet(82, 1024, '유가 107달러 — 인플레 재점화 우려 + 헤지 수요 길항', '#059669')}
<rect x="82" y="1102" width="${W-164}" height="80" rx="12" fill="#061812" stroke="#34D399" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="20" fill="#34D399" font-weight="700">모건스탠리: 5.5% 돌파 시 연준 긴급 개입 신호</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">5.5% = 연내 미국 주식 핵심 임계점</text>
${footer()}`);
    await save('us-treasury-yield-20261012', svg);
  }

  // ── 6. us-treasury-yield-20261012-en (EN) ───────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#34D399', '#10B981')}
${badge(54, 30, 'Safe Assets', '#10B981')}
${badge(212, 30, 'Treasuries', '#059669')}
${badge(342, 30, 'Yield Surge', '#065F46')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · US 10Y at 5.24% — global bond stress at peak</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#34D399" font-weight="900">5.24%</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="60" fill="#fff" font-weight="900">US 10Y Yield</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Intraday high 5.34% — highest since 2002</text>
${divider(376, '#34D399', '#10B981')}
<text x="54" y="420" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#34D399" font-weight="900">Global Rate Comparison</text>
${hbar(54, 436, 'US 10Y', 5.24, 7, 550, 28, '#34D399')}
${hbar(54, 476, 'UK 30Y', 6.0, 7, 550, 28, '#10B981')}
${hbar(54, 516, 'DXY', 102.21, 110, 550, 28, '#6EE7B7')}
${hbar(54, 556, 'Crude Oil', 107, 120, 550, 28, '#059669')}
${statCard(54, 610, 306, 'US 10Y Yield', '5.24%', 'Intraday 5.34%', '#34D399')}
${statCard(384, 610, 306, 'UK 30Y Gilt', '6.0%', 'Global rates surge', '#10B981')}
${statCard(714, 610, 312, 'Dollar (DXY)', '102.21', 'Dollar strength', '#6EE7B7')}
<rect x="54" y="770" width="${W-108}" height="450" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="814" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#34D399" font-weight="900">Key Takeaways</text>
<line x1="82" y1="828" x2="${W-82}" y2="828" stroke="#30363D" stroke-width="1"/>
${bullet(82, 844, 'Sustained 5%+ rates — market cuts rate cut expectations to ≤1', '#34D399')}
${bullet(82, 904, 'UK 30Y broke 6% — bond stress is global, not just US', '#10B981')}
${bullet(82, 964, 'Dollar at 102 — EM debt pressure, Korean won weakens', '#6EE7B7')}
${bullet(82, 1024, 'Oil $107 — inflation re-ignition fears vs hedge demand', '#059669')}
<rect x="82" y="1102" width="${W-164}" height="80" rx="12" fill="#061812" stroke="#34D399" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="20" fill="#34D399" font-weight="700">Morgan Stanley: 5.5% triggers Fed emergency signal</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">5.5% = key risk threshold for US equities</text>
${footer()}`);
    await save('us-treasury-yield-20261012-en', svg);
  }

  // ── 7. gold-safe-haven-20261012 (KO) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FBBF24', '#F59E0B')}
${badge(54, 30, '안전자산', '#F59E0B')}
${badge(190, 30, '금', '#D97706')}
${badge(246, 30, '안전자산 길항', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 금 $4,172 (-0.52%) — 고금리 vs 지정학 헤지 길항</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FBBF24" font-weight="900">$4,172</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="62" fill="#fff" font-weight="900">금 트로이온스</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">-0.52% · 중동 긴장이 낙폭 제한</text>
${divider(380, '#FBBF24', '#F59E0B')}
<!-- 안전자산 복합 지표 -->
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">안전자산 대비 지표</text>
<rect x="54" y="440" width="460" height="130" rx="14" fill="#1A1208" stroke="#FBBF24" stroke-width="1.5"/>
<text x="74" y="472" font-family="Arial,sans-serif" font-size="20" fill="#FBBF24" font-weight="700">상방 압력 (지정학)</text>
<text x="74" y="500" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">중동 긴장 · 유가 $107</text>
<text x="74" y="526" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">인플레이션 헤지 수요 ↑</text>
<text x="74" y="554" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">중앙은행 매입 연 1,000톤+</text>
<rect x="566" y="440" width="460" height="130" rx="14" fill="#1A0A0A" stroke="#EF4444" stroke-width="1.5"/>
<text x="586" y="472" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">하방 압력 (고금리)</text>
<text x="586" y="500" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">미국채 10년 5.24%</text>
<text x="586" y="526" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">달러 강세 DXY 102</text>
<text x="586" y="554" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">이자 없는 금 기회비용 ↑</text>
${statCard(54, 606, 306, '금 현재가', '$4,172', '-0.52% (1개월 -2.95%)', '#FBBF24')}
${statCard(384, 606, 306, '국제 유가', '$107', '배럴 · 중동 긴장', '#F97316')}
${statCard(714, 606, 312, '달러(DXY)', '102.21', '강세 유지', '#6EE7B7')}
<rect x="54" y="766" width="${W-108}" height="454" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="810" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">오늘 핵심 요약</text>
<line x1="82" y1="824" x2="${W-82}" y2="824" stroke="#30363D" stroke-width="1"/>
${bullet(82, 840, '미국채 5.24% → 금 이자 없는 자산 기회비용 상승', '#FBBF24')}
${bullet(82, 900, '중동 유가 $107 → 인플레 헤지 수요가 낙폭 제한', '#F97316')}
${bullet(82, 960, '중앙은행 연간 1,000톤+ 매입 — 구조적 수요 지지선', '#F59E0B')}
${bullet(82, 1020, '달러 강세 → 비달러권 금 매수 비용 상승, 수요 제한', '#D97706')}
<rect x="82" y="1098" width="${W-164}" height="80" rx="12" fill="#1A150A" stroke="#FBBF24" stroke-width="1.5"/>
<text x="110" y="1126" font-family="Arial,sans-serif" font-size="20" fill="#FBBF24" font-weight="700">골드만삭스 12개월 목표가 $4,500</text>
<text x="110" y="1158" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">JP모건 연내 $4,300 회복 전망 유지</text>
${footer()}`);
    await save('gold-safe-haven-20261012', svg);
  }

  // ── 8. gold-safe-haven-20261012-en (EN) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FBBF24', '#F59E0B')}
${badge(54, 30, 'Safe Assets', '#F59E0B')}
${badge(212, 30, 'Gold', '#D97706')}
${badge(290, 30, 'Tug of War', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · Gold $4,172 (-0.52%) — rates vs geopolitical hedge</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FBBF24" font-weight="900">$4,172</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="62" fill="#fff" font-weight="900">Gold per troy oz</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">-0.52% · Geopolitics capping downside</text>
${divider(380, '#FBBF24', '#F59E0B')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">Push vs Pull on Gold</text>
<rect x="54" y="440" width="460" height="130" rx="14" fill="#1A1208" stroke="#FBBF24" stroke-width="1.5"/>
<text x="74" y="472" font-family="Arial,sans-serif" font-size="20" fill="#FBBF24" font-weight="700">Upward (Geopolitics)</text>
<text x="74" y="500" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Middle East · Oil $107</text>
<text x="74" y="526" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Inflation hedge demand ↑</text>
<text x="74" y="554" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">Central bank buying 1,000t+/yr</text>
<rect x="566" y="440" width="460" height="130" rx="14" fill="#1A0A0A" stroke="#EF4444" stroke-width="1.5"/>
<text x="586" y="472" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">Downward (High Rates)</text>
<text x="586" y="500" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">US 10Y at 5.24%</text>
<text x="586" y="526" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Strong dollar DXY 102</text>
<text x="586" y="554" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">Opportunity cost of gold rises</text>
${statCard(54, 606, 306, 'Gold Spot', '$4,172', '-0.52% (1mo -2.95%)', '#FBBF24')}
${statCard(384, 606, 306, 'Crude Oil', '$107', '/barrel · ME tensions', '#F97316')}
${statCard(714, 606, 312, 'Dollar (DXY)', '102.21', 'Dollar strength', '#6EE7B7')}
<rect x="54" y="766" width="${W-108}" height="454" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="810" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Key Takeaways</text>
<line x1="82" y1="824" x2="${W-82}" y2="824" stroke="#30363D" stroke-width="1"/>
${bullet(82, 840, '5.24% Treasury yield → higher opportunity cost for gold', '#FBBF24')}
${bullet(82, 900, 'Oil $107 → inflation hedge demand limits the downside', '#F97316')}
${bullet(82, 960, 'Central bank buying 1,000t+/yr = structural support floor', '#F59E0B')}
${bullet(82, 1020, 'Strong dollar → higher non-USD cost to buy gold', '#D97706')}
<rect x="82" y="1098" width="${W-164}" height="80" rx="12" fill="#1A150A" stroke="#FBBF24" stroke-width="1.5"/>
<text x="110" y="1126" font-family="Arial,sans-serif" font-size="20" fill="#FBBF24" font-weight="700">Goldman Sachs 12-month target $4,500</text>
<text x="110" y="1158" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">JPMorgan: year-end $4,300 recovery in view</text>
${footer()}`);
    await save('gold-safe-haven-20261012-en', svg);
  }

  // ── 9. crypto-prices-20261012 (KO) ──────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#A855F7', '#7C3AED')}
${badge(54, 30, '가상자산', '#A855F7')}
${badge(190, 30, 'BTC·ETH·SOL', '#7C3AED')}
${badge(356, 30, '소폭반등', '#5B21B6')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 미국채 5.24% 부담에도 가상자산 저항력 확인</text>
<text x="54" y="208" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#F7931A" font-weight="900">$83,280</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="58" fill="#fff" font-weight="900">BTC +0.9%</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">ETH $2,543 +1.2% · SOL $112.33 +3.17%</text>
${divider(376, '#A855F7', '#7C3AED')}
<!-- 코인별 가격 카드 -->
<text x="54" y="420" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#A855F7" font-weight="900">주요 가상자산 현황 — 2026.10.12</text>
<rect x="54" y="436" width="300" height="140" rx="14" fill="#161B22" stroke="#F7931A" stroke-width="1.5"/>
<text x="204" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F7931A" text-anchor="middle" font-weight="900">BTC</text>
<text x="204" y="516" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">$83,280</text>
<text x="204" y="550" font-family="Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle">+0.9%</text>
<text x="204" y="572" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">시총 1.65조 달러</text>
<rect x="390" y="436" width="300" height="140" rx="14" fill="#161B22" stroke="#627EEA" stroke-width="1.5"/>
<text x="540" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#627EEA" text-anchor="middle" font-weight="900">ETH</text>
<text x="540" y="516" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">$2,543</text>
<text x="540" y="550" font-family="Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle">+1.2%</text>
<text x="540" y="572" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">시총 3,064억 달러</text>
<rect x="726" y="436" width="300" height="140" rx="14" fill="#161B22" stroke="#9945FF" stroke-width="1.5"/>
<text x="876" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#9945FF" text-anchor="middle" font-weight="900">SOL</text>
<text x="876" y="516" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">$112.33</text>
<text x="876" y="550" font-family="Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle">+3.17%</text>
<text x="876" y="572" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">시총 662억 달러</text>
${statCard(54, 612, 306, 'BTC 현물 ETF', '5일', '연속 순유입', '#A855F7')}
${statCard(384, 612, 306, '일평균 유입', '$3억', 'ETF 기관 수급 유지', '#7C3AED')}
${statCard(714, 612, 312, 'SOL 강세', '+3.17%', 'BTC·ETH 상회', '#9945FF')}
<rect x="54" y="776" width="${W-108}" height="444" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="820" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#A855F7" font-weight="900">오늘 핵심 요약</text>
<line x1="82" y1="834" x2="${W-82}" y2="834" stroke="#30363D" stroke-width="1"/>
${bullet(82, 850, '미국채 5.24% 고금리에도 주요 3종목 동반 소폭 반등', '#A855F7')}
${bullet(82, 910, '솔라나 3.17% 강세 — 네트워크 수수료 이더리움에 근접', '#9945FF')}
${bullet(82, 970, 'BTC ETF 기관 순유입 5일 연속 — 낙폭 제한 구조', '#7C3AED')}
${bullet(82, 1030, '채권 5% 넘어도 기관 포트폴리오 배분 수요 유지', '#8B5CF6')}
<rect x="82" y="1102" width="${W-164}" height="80" rx="12" fill="#13091A" stroke="#A855F7" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="20" fill="#A855F7" font-weight="700">번스타인: BTC 8만 달러 초반이 구조적 지지선</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">5%대 6개월 이상 지속 안 하면 약세 전환 낮음</text>
${footer()}`);
    await save('crypto-prices-20261012', svg);
  }

  // ── 10. crypto-prices-20261012-en (EN) ──────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#A855F7', '#7C3AED')}
${badge(54, 30, 'Crypto', '#A855F7')}
${badge(152, 30, 'BTC·ETH·SOL', '#7C3AED')}
${badge(318, 30, 'Bounce', '#5B21B6')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · Crypto holds ground despite 5.24% Treasury yield</text>
<text x="54" y="208" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#F7931A" font-weight="900">$83,280</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="58" fill="#fff" font-weight="900">BTC +0.9%</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">ETH $2,543 +1.2% · SOL $112.33 +3.17%</text>
${divider(376, '#A855F7', '#7C3AED')}
<text x="54" y="420" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#A855F7" font-weight="900">Major Crypto Prices — 2026.10.12</text>
<rect x="54" y="436" width="300" height="140" rx="14" fill="#161B22" stroke="#F7931A" stroke-width="1.5"/>
<text x="204" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F7931A" text-anchor="middle" font-weight="900">BTC</text>
<text x="204" y="516" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">$83,280</text>
<text x="204" y="550" font-family="Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle">+0.9%</text>
<text x="204" y="572" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">Mkt cap $1.65T</text>
<rect x="390" y="436" width="300" height="140" rx="14" fill="#161B22" stroke="#627EEA" stroke-width="1.5"/>
<text x="540" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#627EEA" text-anchor="middle" font-weight="900">ETH</text>
<text x="540" y="516" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">$2,543</text>
<text x="540" y="550" font-family="Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle">+1.2%</text>
<text x="540" y="572" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">Mkt cap $306.4B</text>
<rect x="726" y="436" width="300" height="140" rx="14" fill="#161B22" stroke="#9945FF" stroke-width="1.5"/>
<text x="876" y="472" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#9945FF" text-anchor="middle" font-weight="900">SOL</text>
<text x="876" y="516" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="#fff" text-anchor="middle" font-weight="900">$112.33</text>
<text x="876" y="550" font-family="Arial,sans-serif" font-size="20" fill="#34D399" text-anchor="middle">+3.17%</text>
<text x="876" y="572" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">Mkt cap $66.2B</text>
${statCard(54, 612, 306, 'BTC Spot ETF', '5 days', 'consecutive inflows', '#A855F7')}
${statCard(384, 612, 306, 'Daily Inflow', '$300M', 'institutional demand holds', '#7C3AED')}
${statCard(714, 612, 312, 'SOL Leads', '+3.17%', 'outperforms BTC/ETH', '#9945FF')}
<rect x="54" y="776" width="${W-108}" height="444" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="820" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#A855F7" font-weight="900">Key Takeaways</text>
<line x1="82" y1="834" x2="${W-82}" y2="834" stroke="#30363D" stroke-width="1"/>
${bullet(82, 850, 'All 3 majors bounced despite 5.24% Treasury headwind', '#A855F7')}
${bullet(82, 910, 'SOL +3.17% — network fees approaching ETH levels', '#9945FF')}
${bullet(82, 970, 'BTC ETF 5-day inflow streak — institutional bid limits drops', '#7C3AED')}
${bullet(82, 1030, 'Portfolio allocation demand persists above 5% bond yields', '#8B5CF6')}
<rect x="82" y="1102" width="${W-164}" height="80" rx="12" fill="#13091A" stroke="#A855F7" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="20" fill="#A855F7" font-weight="700">Bernstein: low $80Ks is structural support for BTC</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Bear case unlikely unless 5%+ lasts 6+ months</text>
${footer()}`);
    await save('crypto-prices-20261012-en', svg);
  }

  // ── 11. crypto-macro-20261012 (KO) ──────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#A855F7', '#6D28D9')}
${badge(54, 30, '가상자산', '#A855F7')}
${badge(190, 30, 'BTC 전망', '#6D28D9')}
${badge(306, 30, '연말 $10만', '#4C1D95')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · 펀드스트랫 BTC 연말 $100K 전망 — 유동성 전환 촉매</text>
<text x="54" y="208" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#A855F7" font-weight="900">$100,000</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="54" fill="#fff" font-weight="900">BTC 연말 목표가</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">펀드스트랫 · 미국 유동성 전환이 핵심 촉매</text>
${divider(376, '#A855F7', '#6D28D9')}
<!-- ETF 유입 시각화 -->
<text x="54" y="420" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#A855F7" font-weight="900">BTC 현물 ETF 일일 순유입 — 최근 5일</text>
${hbar(54, 436, '10.06(월)', 280, 400, 560, 26, '#A855F7')}
${hbar(54, 474, '10.07(화)', 310, 400, 560, 26, '#9333EA')}
${hbar(54, 512, '10.08(수)', 295, 400, 560, 26, '#7C3AED')}
${hbar(54, 550, '10.09(목)', 320, 400, 560, 26, '#6D28D9')}
${hbar(54, 588, '10.10(금)', 305, 400, 560, 26, '#5B21B6')}
<text x="680" y="516" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#A855F7" font-weight="900">($M)</text>
${statCard(54, 642, 306, 'BTC 현재가', '$83,280', '+0.9% (2026.10.12)', '#F7931A')}
${statCard(384, 642, 306, 'ETF 일평균', '$300M', '5일 연속 순유입', '#A855F7')}
${statCard(714, 642, 312, '연말 목표', '$100,000', '펀드스트랫 전망', '#6D28D9')}
<rect x="54" y="800" width="${W-108}" height="420" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="844" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#A855F7" font-weight="900">오늘 핵심 요약</text>
<line x1="82" y1="858" x2="${W-82}" y2="858" stroke="#30363D" stroke-width="1"/>
${bullet(82, 874, '미국 국채 이자 부담 급증 → 유동성 확대 압력 → BTC 촉매', '#A855F7')}
${bullet(82, 934, 'BTC ETF 5일 연속 유입 $3억/일 — 채권 5%에도 기관 유지', '#9333EA')}
${bullet(82, 994, '솔라나 네트워크 일일 수수료 이더리움 근접 — 생태계 성장', '#7C3AED')}
${bullet(82, 1054, '블랙록: 포트폴리오 1~2% 배분 — 분산효과 유효 유지', '#6D28D9')}
<rect x="82" y="1114" width="${W-164}" height="66" rx="12" fill="#13091A" stroke="#A855F7" stroke-width="1.5"/>
<text x="110" y="1140" font-family="Arial,sans-serif" font-size="19" fill="#A855F7">📅 핵심 모니터링</text>
<text x="110" y="1168" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">미국 재무부 이자 비용 증가 속도 + 연준 완화 신호</text>
${footer()}`);
    await save('crypto-macro-20261012', svg);
  }

  // ── 12. crypto-macro-20261012-en (EN) ───────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#A855F7', '#6D28D9')}
${badge(54, 30, 'Crypto', '#A855F7')}
${badge(152, 30, 'BTC Outlook', '#6D28D9')}
${badge(300, 30, 'Year-end $100K', '#4C1D95')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.12 · Fundstrat $100K year-end target — US liquidity pivot catalyst</text>
<text x="54" y="208" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#A855F7" font-weight="900">$100,000</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="54" fill="#fff" font-weight="900">BTC Year-End Target</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Fundstrat · US liquidity pivot is the key trigger</text>
${divider(376, '#A855F7', '#6D28D9')}
<text x="54" y="420" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#A855F7" font-weight="900">BTC Spot ETF Daily Net Inflows — Past 5 Days</text>
${hbar(54, 436, 'Oct 06 (Mon)', 280, 400, 520, 26, '#A855F7')}
${hbar(54, 474, 'Oct 07 (Tue)', 310, 400, 520, 26, '#9333EA')}
${hbar(54, 512, 'Oct 08 (Wed)', 295, 400, 520, 26, '#7C3AED')}
${hbar(54, 550, 'Oct 09 (Thu)', 320, 400, 520, 26, '#6D28D9')}
${hbar(54, 588, 'Oct 10 (Fri)', 305, 400, 520, 26, '#5B21B6')}
<text x="660" y="516" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#A855F7" font-weight="900">($M)</text>
${statCard(54, 642, 306, 'BTC Price', '$83,280', '+0.9% (2026.10.12)', '#F7931A')}
${statCard(384, 642, 306, 'ETF Daily Avg', '$300M', '5 consecutive inflows', '#A855F7')}
${statCard(714, 642, 312, 'Year-end Target', '$100,000', 'Fundstrat forecast', '#6D28D9')}
<rect x="54" y="800" width="${W-108}" height="420" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="844" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#A855F7" font-weight="900">Key Takeaways</text>
<line x1="82" y1="858" x2="${W-82}" y2="858" stroke="#30363D" stroke-width="1"/>
${bullet(82, 874, 'US Treasury interest costs surge → liquidity expansion → BTC', '#A855F7')}
${bullet(82, 934, 'BTC ETF 5-day streak $300M/day — institutional stays put at 5%', '#9333EA')}
${bullet(82, 994, 'Solana daily fees approach ETH — DeFi ecosystem growing', '#7C3AED')}
${bullet(82, 1054, 'BlackRock: 1-2% portfolio allocation still improves risk-adj returns', '#6D28D9')}
<rect x="82" y="1114" width="${W-164}" height="66" rx="12" fill="#13091A" stroke="#A855F7" stroke-width="1.5"/>
<text x="110" y="1140" font-family="Arial,sans-serif" font-size="19" fill="#A855F7">📅 Key monitor</text>
<text x="110" y="1168" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">US Treasury interest cost growth + Fed dovish signals</text>
${footer()}`);
    await save('crypto-macro-20261012-en', svg);
  }

  console.log('\nAll 12 charts generated for batch-3 (한국시장·안전자산·가상자산)');
}

main().catch(console.error);
