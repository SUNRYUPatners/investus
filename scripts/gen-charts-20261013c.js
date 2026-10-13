#!/usr/bin/env node
// SVG chart generator — 2026-10-13 batch part C (charts 17-32: macro+summary)
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

  // ── 1. tsla-megapack-apollo-20261013 (KO) ───────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#F97316')}
${badge(54, 30, '종목분석', '#EF4444')}
${badge(190, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, '메가팩', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 아폴로 파워 $840M 메가팩 1GW 계약 — 호주</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#EF4444" font-weight="900">$840M</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">메가팩 계약 규모</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">1GW 에너지저장 · 호주 시드니거래소 · 2029년 완공</text>
${divider(378, '#EF4444', '#F97316')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">계약 핵심 내용</text>
<rect x="54" y="438" width="${W-108}" height="100" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="478" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">아폴로 파워 — 호주 대형 에너지저장 개발사</text>
<text x="82" y="518" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">시드니거래소 상장 · 2029년 1GW 메가팩 배터리 완공 목표</text>
${statCard(54, 558, 306, '계약 규모', '$840M', '8억 4천만 달러', '#EF4444')}
${statCard(384, 558, 306, '설치 용량', '1GW', '기가와트급 규모', '#F97316')}
${statCard(714, 558, 312, '완공 목표', '2029년', '호주 시드니거래소', '#DC2626')}
<rect x="54" y="718" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="762" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">테슬라 에너지 사업 시사점</text>
<line x1="82" y1="776" x2="${W-82}" y2="776" stroke="#30363D" stroke-width="1"/>
${bullet(82, 792, '호주 에너지저장 수요 = 테슬라 에너지 부문 성장 확인', '#EF4444')}
${bullet(82, 852, '1GW 단일 계약 — 메가팩 수주 규모가 기가와트급으로 도약', '#F97316')}
${bullet(82, 912, '재생에너지 확대 → 에너지저장 수요 구조적 증가', '#DC2626')}
${bullet(82, 972, '테슬라 에너지 부문 — 차량 부문 마진 압박 상쇄 역할', '#B91C1C')}
<rect x="82" y="1092" width="${W-164}" height="80" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1120" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">ARK 인베스트 — 에너지 부문 테슬라 밸류 핵심</text>
<text x="110" y="1152" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">메가팩 수주 가속 → 에너지 EPS 독립 성장</text>
${footer()}`);
    await save('tsla-megapack-apollo-20261013', svg);
  }

  // ── 2. tsla-megapack-apollo-20261013-en (EN) ────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#F97316')}
${badge(54, 30, 'Stock Analysis', '#EF4444')}
${badge(254, 30, 'TSLA', '#B91C1C')}
${badge(334, 30, 'Megapack', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Apollo Power $840M Megapack 1GW deal — Australia</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#EF4444" font-weight="900">$840M</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Megapack Contract</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">1GW energy storage · Sydney Exchange · 2029 completion</text>
${divider(378, '#EF4444', '#F97316')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">Contract Details</text>
<rect x="54" y="438" width="${W-108}" height="100" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="478" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Apollo Power — major Australian energy storage developer</text>
<text x="82" y="518" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Sydney Exchange listed · 1GW Megapack battery target by 2029</text>
${statCard(54, 558, 306, 'Deal Size', '$840M', '840 million USD', '#EF4444')}
${statCard(384, 558, 306, 'Capacity', '1GW', 'gigawatt-scale', '#F97316')}
${statCard(714, 558, 312, 'Completion', '2029', 'Sydney Exchange', '#DC2626')}
<rect x="54" y="718" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="762" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">Tesla Energy Business Takeaways</text>
<line x1="82" y1="776" x2="${W-82}" y2="776" stroke="#30363D" stroke-width="1"/>
${bullet(82, 792, 'Australia storage demand = Tesla Energy growth confirmed', '#EF4444')}
${bullet(82, 852, '1GW single deal — Megapack orders scaling to gigawatt tier', '#F97316')}
${bullet(82, 912, 'Renewables expansion → structurally growing storage demand', '#DC2626')}
${bullet(82, 972, 'Tesla Energy — offsetting vehicle margin pressure', '#B91C1C')}
<rect x="82" y="1092" width="${W-164}" height="80" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1120" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">ARK Invest — Energy segment core to Tesla valuation</text>
<text x="110" y="1152" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Megapack order acceleration → Energy EPS independent growth</text>
${footer()}`);
    await save('tsla-megapack-apollo-20261013-en', svg);
  }

  // ── 3. kospi-foreign14-20261013 (KO) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FB923C', '#F97316')}
${badge(54, 30, '한국시장', '#FB923C')}
${badge(190, 30, '코스피', '#EA580C')}
${badge(282, 30, '외국인순매도', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 외국인 14거래일 연속 순매도 — 누계 20.93조</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#EF4444" font-weight="900">14일</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">외국인 연속 순매도</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">누계 20.93조 원 · 달러 강세·고금리 지속 영향</text>
${divider(380, '#FB923C', '#EF4444')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">연속 순매도 일수 추이</text>
<text x="54" y="464" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">1~5거래일</text>
<rect x="230" y="442" width="700" height="28" rx="5" fill="#21262D"/>
<rect x="230" y="442" width="250" height="28" rx="5" fill="#F97316"/>
<text x="488" y="464" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">7.40조</text>
<text x="54" y="506" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">6~10거래일</text>
<rect x="230" y="484" width="700" height="28" rx="5" fill="#21262D"/>
<rect x="230" y="484" width="420" height="28" rx="5" fill="#EA580C"/>
<text x="658" y="506" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">13.22조</text>
<text x="54" y="548" font-family="Arial,sans-serif" font-size="22" fill="#EF4444">11~14거래일</text>
<rect x="230" y="526" width="700" height="28" rx="5" fill="#21262D"/>
<rect x="230" y="526" width="700" height="28" rx="5" fill="#EF4444"/>
<text x="938" y="548" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">20.93조</text>
${statCard(54, 576, 306, '연속 기간', '14거래일', '최근 최장 기록', '#EF4444')}
${statCard(384, 576, 306, '누계 순매도', '20.93조', '원화 기준', '#F97316')}
${statCard(714, 576, 312, '달러 인덱스', '102.21', '달러 강세 지속', '#FB923C')}
<rect x="54" y="736" width="${W-108}" height="482" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="780" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">수급 악화 배경과 전망</text>
<line x1="82" y1="794" x2="${W-82}" y2="794" stroke="#30363D" stroke-width="1"/>
${bullet(82, 810, '달러 강세·고금리 지속 — 신흥국 자본 유출 구조 지속', '#EF4444')}
${bullet(82, 870, '미 국채 10Y 5.24% — 원화자산 매력 상대적 약화', '#F97316')}
${bullet(82, 930, '10월 14일 CPI가 달러·금리 방향 결정 — 핵심 분기점', '#FB923C')}
${bullet(82, 990, '수급 반전 조건: 달러 약세 또는 금리 인하 신호 필요', '#EA580C')}
<rect x="82" y="1104" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#FB923C" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="19" fill="#FB923C">📅 다음 체크포인트</text>
<text x="110" y="1158" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">10월 14일 CPI — 외국인 수급 반전 촉매</text>
${footer()}`);
    await save('kospi-foreign14-20261013', svg);
  }

  // ── 4. kospi-foreign14-20261013-en (EN) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FB923C', '#F97316')}
${badge(54, 30, 'Korea Market', '#FB923C')}
${badge(242, 30, 'KOSPI', '#EA580C')}
${badge(328, 30, 'Foreign Sell', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Foreigners net sell 14 straight sessions — ₩20.93T</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#EF4444" font-weight="900">14 days</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Consecutive Net Selling</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Cumulative ₩20.93T · Strong dollar + high rates</text>
${divider(380, '#FB923C', '#EF4444')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">Cumulative Selling by Period</text>
<text x="54" y="464" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Days 1–5</text>
<rect x="200" y="442" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="442" width="258" height="28" rx="5" fill="#F97316"/>
<text x="466" y="464" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">₩7.40T</text>
<text x="54" y="506" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Days 6–10</text>
<rect x="200" y="484" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="484" width="460" height="28" rx="5" fill="#EA580C"/>
<text x="668" y="506" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">₩13.22T</text>
<text x="54" y="548" font-family="Arial,sans-serif" font-size="22" fill="#EF4444">Days 11–14</text>
<rect x="200" y="526" width="730" height="28" rx="5" fill="#21262D"/>
<rect x="200" y="526" width="730" height="28" rx="5" fill="#EF4444"/>
<text x="938" y="548" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" font-weight="900">₩20.93T</text>
${statCard(54, 576, 306, 'Streak', '14 sessions', 'recent record', '#EF4444')}
${statCard(384, 576, 306, 'Cumulative', '₩20.93T', 'net sold', '#F97316')}
${statCard(714, 576, 312, 'DXY', '102.21', 'dollar strength', '#FB923C')}
<rect x="54" y="736" width="${W-108}" height="482" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="780" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">Backdrop and Outlook</text>
<line x1="82" y1="794" x2="${W-82}" y2="794" stroke="#30363D" stroke-width="1"/>
${bullet(82, 810, 'Strong dollar + high rates = EM capital outflow structure ongoing', '#EF4444')}
${bullet(82, 870, 'US 10Y at 5.24% — Korean won assets relatively less attractive', '#F97316')}
${bullet(82, 930, 'Oct 14 CPI = key catalyst for dollar/rate direction reversal', '#FB923C')}
${bullet(82, 990, 'Flow reversal condition: dollar weakness or rate cut signal needed', '#EA580C')}
<rect x="82" y="1104" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#FB923C" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="19" fill="#FB923C">📅 Next checkpoint</text>
<text x="110" y="1158" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Oct 14 CPI — catalyst for foreign flow reversal</text>
${footer()}`);
    await save('kospi-foreign14-20261013-en', svg);
  }

  // ── 5. samsung-skhynix-supp-20261013 (KO) ───────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FB923C', '#F59E0B')}
${badge(54, 30, '한국시장', '#FB923C')}
${badge(190, 30, '삼성전자', '#B45309')}
${badge(306, 30, 'SK하이닉스', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 삼성·SK하이닉스 외국인 수급 14일 연속 압박</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#FB923C" font-weight="900">수급 압박</text>
<text x="54" y="288" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">반도체 양대축 동반 하락</text>
<text x="54" y="346" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">코스피 시총 1·2위 — 지수 하락 견인 지속</text>
${divider(370, '#FB923C', '#F59E0B')}
<text x="54" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">10월 13일 현재가 및 낙폭</text>
${statCard(54, 430, 480, '삼성전자', '250,500원', '10일 고점 대비 -6%', '#FB923C')}
${statCard(558, 430, 468, 'SK하이닉스', '198,000원', '10일 고점 대비 -7%', '#F59E0B')}
<text x="54" y="598" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">수급 악화 원인 분석</text>
<rect x="54" y="612" width="${W-108}" height="100" rx="14" fill="#1A0C00" stroke="#FB923C" stroke-width="1.5"/>
<text x="82" y="652" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">달러 강세·미국채 수익률 5.24% → 원화 약세</text>
<text x="82" y="692" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">신흥국 위험자산 회피 — 반도체 섹터 집중 매도</text>
<rect x="54" y="726" width="${W-108}" height="100" rx="14" fill="#1A0C00" stroke="#F59E0B" stroke-width="1.5"/>
<text x="82" y="766" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">자사주 매입 종료 → 기술적 지지 주체 소멸</text>
<text x="82" y="806" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">기관 매수 규모가 외국인 매도 흡수에 역부족</text>
<rect x="54" y="856" width="${W-108}" height="362" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="900" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">반등 조건</text>
<line x1="82" y1="914" x2="${W-82}" y2="914" stroke="#30363D" stroke-width="1"/>
${bullet(82, 930, '달러 약세 전환 — 원화 강세 시 외국인 복귀 가능성↑', '#FB923C')}
${bullet(82, 990, 'CPI 결과 금리 인하 기대 → 신흥국 자금 재유입', '#F59E0B')}
${bullet(82, 1050, 'HBM·DDR5 단가 반등 확인 → 이익 전망 상향 필요', '#EA580C')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#FB923C" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#FB923C">미래에셋·KB증권 공통 뷰</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">수급 정상화까지 주가 회복 제한적 — 인내 필요</text>
${footer()}`);
    await save('samsung-skhynix-supp-20261013', svg);
  }

  // ── 6. samsung-skhynix-supp-20261013-en (EN) ────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#FB923C', '#F59E0B')}
${badge(54, 30, 'Korea Market', '#FB923C')}
${badge(242, 30, 'Samsung', '#B45309')}
${badge(354, 30, 'SK Hynix', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Samsung + SK Hynix under 14-day foreign selling pressure</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#FB923C" font-weight="900">Supply Pressure</text>
<text x="54" y="288" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Korea Semi Dual Decline</text>
<text x="54" y="346" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">KOSPI #1 and #2 by market cap dragging index lower</text>
${divider(370, '#FB923C', '#F59E0B')}
<text x="54" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">Current Price vs 10-Day High</text>
${statCard(54, 430, 480, 'Samsung', '₩250,500', '-6% from 10-day high', '#FB923C')}
${statCard(558, 430, 468, 'SK Hynix', '₩198,000', '-7% from 10-day high', '#F59E0B')}
<text x="54" y="598" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FB923C" font-weight="900">Root Causes</text>
<rect x="54" y="612" width="${W-108}" height="100" rx="14" fill="#1A0C00" stroke="#FB923C" stroke-width="1.5"/>
<text x="82" y="652" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Strong dollar + US 10Y 5.24% → KRW weakness</text>
<text x="82" y="692" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">EM risk-off — semiconductor sector taking concentrated hits</text>
<rect x="54" y="726" width="${W-108}" height="100" rx="14" fill="#1A0C00" stroke="#F59E0B" stroke-width="1.5"/>
<text x="82" y="766" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Share buyback ended → technical price support gone</text>
<text x="82" y="806" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Domestic institutional buying insufficient to absorb foreign sales</text>
<rect x="54" y="856" width="${W-108}" height="362" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="900" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">Recovery Conditions</text>
<line x1="82" y1="914" x2="${W-82}" y2="914" stroke="#30363D" stroke-width="1"/>
${bullet(82, 930, 'Dollar weakening → KRW strength → foreigners may return', '#FB923C')}
${bullet(82, 990, 'CPI triggers rate cut hopes → EM capital re-inflow', '#F59E0B')}
${bullet(82, 1050, 'HBM/DDR5 price recovery confirms earnings estimate revision', '#EA580C')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#1A0808" stroke="#FB923C" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#FB923C">Mirae Asset · KB Securities consensus</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Recovery capped until supply normalizes — patience needed</text>
${footer()}`);
    await save('samsung-skhynix-supp-20261013-en', svg);
  }

  // ── 7. safe-assets-cpi-20261013 (KO) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#0D9488')}
${badge(54, 30, '안전자산', '#10B981')}
${badge(162, 30, '금·채권·달러', '#0D9488')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · CPI 앞두고 금 $4,168 · 10Y 5.24% · DXY 102.21</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#F59E0B" font-weight="900">$4,168</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">금 온스당 현재가</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">-0.60% · 10월 14일 CPI 관망 · 역대 최고권 근접</text>
${divider(378, '#10B981', '#F59E0B')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">주요 안전자산 현황 (2026.10.13)</text>
${statCard(54, 438, 306, '금 (XAU)', '$4,168', '-0.60% 소폭 조정', '#F59E0B')}
${statCard(384, 438, 306, '미 10Y 국채', '5.24%', '고금리 지속', '#EF4444')}
${statCard(714, 438, 312, '달러 인덱스', '102.21', 'DXY 강세 유지', '#3B82F6')}
<rect x="54" y="598" width="${W-108}" height="120" rx="14" fill="#0A1A10" stroke="#10B981" stroke-width="1.5"/>
<text x="82" y="638" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">금 — 10월 14일 CPI 앞두고 소폭 조정</text>
<text x="82" y="678" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">물가 높으면 금리 추가 인상 압박 → 금 단기 하방 / 물가 둔화 → 반등</text>
<rect x="54" y="732" width="${W-108}" height="120" rx="14" fill="#0A0A1A" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="772" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">미 10Y 5.24% — 달러 강세·신흥국 자본 유출 구조</text>
<text x="82" y="812" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">CPI 결과에 따라 5.4%~4.9% 범위로 급변동 가능</text>
<rect x="54" y="882" width="${W-108}" height="336" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="926" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">CPI 시나리오별 안전자산 방향</text>
<line x1="82" y1="940" x2="${W-82}" y2="940" stroke="#30363D" stroke-width="1"/>
${bullet(82, 956, 'CPI 높음 → 달러↑ 금리↑ → 금 단기 조정·채권 추가 하락', '#EF4444')}
${bullet(82, 1016, 'CPI 둔화 → 달러↓ 금리↓ → 금 반등·채권 회복', '#10B981')}
${bullet(82, 1076, '엔화 — 달러 강세 시 152엔 돌파 여부 주목', '#3B82F6')}
<rect x="82" y="1156" width="${W-164}" height="50" rx="10" fill="#0A1A10" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1188" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">골드만·JP모건: 연내 금 $4,200 돌파 전망 유지</text>
${footer()}`);
    await save('safe-assets-cpi-20261013', svg);
  }

  // ── 8. safe-assets-cpi-20261013-en (EN) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#0D9488')}
${badge(54, 30, 'Safe Assets', '#10B981')}
${badge(196, 30, 'Gold·Bonds·USD', '#0D9488')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Gold $4,168 · US10Y 5.24% · DXY 102.21 — CPI eve</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#F59E0B" font-weight="900">$4,168</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Gold per oz</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">-0.60% · CPI watch mode · near all-time high</text>
${divider(378, '#10B981', '#F59E0B')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">Safe Asset Snapshot (2026.10.13)</text>
${statCard(54, 438, 306, 'Gold (XAU)', '$4,168', '-0.60% minor pullback', '#F59E0B')}
${statCard(384, 438, 306, 'US 10Y Yield', '5.24%', 'high-rate regime', '#EF4444')}
${statCard(714, 438, 312, 'DXY', '102.21', 'dollar strength', '#3B82F6')}
<rect x="54" y="598" width="${W-108}" height="120" rx="14" fill="#0A1A10" stroke="#10B981" stroke-width="1.5"/>
<text x="82" y="638" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Gold — minor pullback ahead of Oct 14 CPI</text>
<text x="82" y="678" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Hot CPI = more rate pressure → gold near-term down / cool CPI → rebound</text>
<rect x="54" y="732" width="${W-108}" height="120" rx="14" fill="#0A0A1A" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="772" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">US 10Y 5.24% — dollar strength, EM capital outflow</text>
<text x="82" y="812" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">CPI result could swing yield between 4.9% and 5.4%</text>
<rect x="54" y="882" width="${W-108}" height="336" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="926" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">CPI Scenario Map — Safe Assets</text>
<line x1="82" y1="940" x2="${W-82}" y2="940" stroke="#30363D" stroke-width="1"/>
${bullet(82, 956, 'Hot CPI → dollar↑ rates↑ → gold dips, bonds fall further', '#EF4444')}
${bullet(82, 1016, 'Cool CPI → dollar↓ rates↓ → gold rebounds, bonds recover', '#10B981')}
${bullet(82, 1076, 'JPY — watch if dollar strength pushes past ¥152', '#3B82F6')}
<rect x="82" y="1156" width="${W-164}" height="50" rx="10" fill="#0A1A10" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1188" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Goldman · JPM: Gold $4,200 year-end target maintained</text>
${footer()}`);
    await save('safe-assets-cpi-20261013-en', svg);
  }

  // ── 9. oil-squeeze-20261013 (KO) ─────────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#F59E0B')}
${badge(54, 30, '안전자산', '#10B981')}
${badge(162, 30, '유가', '#B45309')}
${badge(228, 30, '공급위기', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 아람코 CEO "재고 60억 배럴 이하 — 마지막 완충재"</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#F59E0B" font-weight="900">6B bbl</text>
<text x="54" y="290" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">글로벌 재고 마지막 완충재</text>
<text x="54" y="348" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">상업 재고 60억 배럴 이하 — 공급 충격 시 즉각 가격 급등</text>
${divider(372, '#10B981', '#F59E0B')}
<text x="54" y="418" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F59E0B" font-weight="900">공급 경고 핵심 수치</text>
${statCard(54, 432, 306, '현재 유가', '$107/bbl', '브렌트 기준', '#F59E0B')}
${statCard(384, 432, 306, '상업 재고', '6B bbl↓', '마지막 완충재', '#EF4444')}
${statCard(714, 432, 312, '리스크 시나리오', '$115↑', '골드만 전망', '#DC2626')}
<rect x="54" y="592" width="${W-108}" height="120" rx="14" fill="#1A100A" stroke="#F59E0B" stroke-width="1.5"/>
<text x="82" y="632" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">사우디 아람코 CEO 공개 경고 — 이례적 강도</text>
<text x="82" y="672" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">재고 완충 부족 → 지정학 충격 시 가격 급등 구조적 취약점</text>
<rect x="54" y="726" width="${W-108}" height="120" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="766" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">인플레이션 재점화 리스크 — 금리 인하 지연 연계</text>
<text x="82" y="806" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">유가 $115 돌파 시 연방준비제도 금리 인하 2027년으로 이연</text>
<rect x="54" y="876" width="${W-108}" height="344" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="920" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F59E0B" font-weight="900">투자 시사점</text>
<line x1="82" y1="934" x2="${W-82}" y2="934" stroke="#30363D" stroke-width="1"/>
${bullet(82, 950, '유가 급등 = 인플레 재점화 → 금리 인하 후퇴 → 전반 하방', '#EF4444')}
${bullet(82, 1010, '에너지 섹터 — 유가 강세 수혜 / 나머지 섹터 역풍', '#F59E0B')}
${bullet(82, 1070, '한국 — 달러 강세·수입 에너지 비용↑ 이중 압박', '#10B981')}
<rect x="82" y="1104" width="${W-164}" height="80" rx="12" fill="#1A100A" stroke="#F59E0B" stroke-width="1.5"/>
<text x="110" y="1132" font-family="Arial,sans-serif" font-size="20" fill="#F59E0B" font-weight="700">골드만삭스 연내 유가 $115 시나리오</text>
<text x="110" y="1164" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">JP모건: 추가 충격 없으면 $102~104 박스권 전망</text>
${footer()}`);
    await save('oil-squeeze-20261013', svg);
  }

  // ── 10. oil-squeeze-20261013-en (EN) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#F59E0B')}
${badge(54, 30, 'Safe Assets', '#10B981')}
${badge(196, 30, 'Oil', '#B45309')}
${badge(264, 30, 'Supply Crisis', '#92400E')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Aramco CEO: inventories below 6B barrels — last buffer</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#F59E0B" font-weight="900">6B bbl</text>
<text x="54" y="290" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Global Inventory Last Buffer</text>
<text x="54" y="348" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">Below 6B barrels — any supply shock = immediate price spike</text>
${divider(372, '#10B981', '#F59E0B')}
<text x="54" y="418" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#F59E0B" font-weight="900">Supply Warning Key Figures</text>
${statCard(54, 432, 306, 'Oil Price', '$107/bbl', 'Brent crude', '#F59E0B')}
${statCard(384, 432, 306, 'Inventories', '&lt;6B bbl', 'last buffer level', '#EF4444')}
${statCard(714, 432, 312, 'Risk Scenario', '$115+', 'Goldman forecast', '#DC2626')}
<rect x="54" y="592" width="${W-108}" height="120" rx="14" fill="#1A100A" stroke="#F59E0B" stroke-width="1.5"/>
<text x="82" y="632" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Saudi Aramco CEO public warning — unusually strong tone</text>
<text x="82" y="672" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Thin buffer = structurally vulnerable to geopolitical supply shock</text>
<rect x="54" y="726" width="${W-108}" height="120" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="766" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Re-inflation risk — rate cut delay linkage</text>
<text x="82" y="806" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Oil above $115 = Fed rate cuts pushed to 2027</text>
<rect x="54" y="876" width="${W-108}" height="344" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="920" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F59E0B" font-weight="900">Investment Takeaways</text>
<line x1="82" y1="934" x2="${W-82}" y2="934" stroke="#30363D" stroke-width="1"/>
${bullet(82, 950, 'Oil spike = re-inflation → rate cut retreat → broad market headwind', '#EF4444')}
${bullet(82, 1010, 'Energy sector benefits / rest of market faces headwinds', '#F59E0B')}
${bullet(82, 1070, 'Korea: double hit — dollar strength + import energy cost up', '#10B981')}
<rect x="82" y="1104" width="${W-164}" height="80" rx="12" fill="#1A100A" stroke="#F59E0B" stroke-width="1.5"/>
<text x="110" y="1132" font-family="Arial,sans-serif" font-size="20" fill="#F59E0B" font-weight="700">Goldman Sachs: $115/bbl risk scenario this year</text>
<text x="110" y="1164" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">JPMorgan: $102–104 range if no further shock</text>
${footer()}`);
    await save('oil-squeeze-20261013-en', svg);
  }

  // ── 11. btc-cpi-wait-20261013 (KO) ──────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#7C3AED', '#6D28D9')}
${badge(54, 30, '가상자산', '#7C3AED')}
${badge(162, 30, 'BTC', '#5B21B6')}
${badge(228, 30, 'CPI관망', '#4C1D95')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 비트코인 $82,929 -0.70% — CPI 앞두고 관망</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#7C3AED" font-weight="900">$82,929</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">비트코인 현재가</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">-0.70% · 시총 1.67조 달러 · 10월 14일 CPI 대기</text>
${divider(378, '#7C3AED', '#6D28D9')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#7C3AED" font-weight="900">CPI 시나리오별 비트코인 방향</text>
<rect x="54" y="438" width="462" height="130" rx="14" fill="#140A2A" stroke="#7C3AED" stroke-width="1.5"/>
<text x="82" y="472" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">물가 둔화 시나리오</text>
<text x="82" y="506" font-family="Arial,sans-serif" font-size="20" fill="#E6EDF3">달러↓ · 금리 기대↑</text>
<text x="82" y="540" font-family="Arial,sans-serif" font-size="20" fill="#10B981">비트코인 $85,000+ 반등 가능</text>
<rect x="564" y="438" width="462" height="130" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="592" y="472" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">물가 강세 시나리오</text>
<text x="592" y="506" font-family="Arial,sans-serif" font-size="20" fill="#E6EDF3">달러↑ · 금리 인하 후퇴</text>
<text x="592" y="540" font-family="Arial,sans-serif" font-size="20" fill="#EF4444">$80,000 이하 하방 압력</text>
${statCard(54, 590, 306, '시총', '$1.67T', '1조 6700억 달러', '#7C3AED')}
${statCard(384, 590, 306, 'CPI 발표', '10월 14일', 'D-1 대기', '#6D28D9')}
${statCard(714, 590, 312, 'FOMC', '10월 28일', '금리 결정일', '#5B21B6')}
<rect x="54" y="750" width="${W-108}" height="468" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="794" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#7C3AED" font-weight="900">구조적 수급은 견고</text>
<line x1="82" y1="808" x2="${W-82}" y2="808" stroke="#30363D" stroke-width="1"/>
${bullet(82, 824, '현물 ETF 주간 5연속 순유입 — 기관 전략적 배분 유지', '#7C3AED')}
${bullet(82, 884, '$83,000 하단 지지 — 기관 배분이 구조적 지지선 형성', '#6D28D9')}
${bullet(82, 944, '단기 변동성 불가피 — CPI 충격 후 방향 재설정', '#5B21B6')}
${bullet(82, 1004, '번스타인: 연말 반등 전망 유지 · 블랙록: 1~2% 배분 권장', '#A78BFA')}
<rect x="82" y="1108" width="${W-164}" height="50" rx="10" fill="#0A0420" stroke="#7C3AED" stroke-width="1.5"/>
<text x="110" y="1142" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">CPI 결과가 단기 방향 결정 — 구조적 수급은 지지</text>
${footer()}`);
    await save('btc-cpi-wait-20261013', svg);
  }

  // ── 12. btc-cpi-wait-20261013-en (EN) ───────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#7C3AED', '#6D28D9')}
${badge(54, 30, 'Crypto', '#7C3AED')}
${badge(152, 30, 'BTC', '#5B21B6')}
${badge(220, 30, 'CPI Watch', '#4C1D95')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Bitcoin $82,929 -0.70% — wait-and-see before CPI</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#7C3AED" font-weight="900">$82,929</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Bitcoin Price</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#EF4444">-0.70% · Market cap $1.67T · Oct 14 CPI incoming</text>
${divider(378, '#7C3AED', '#6D28D9')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#7C3AED" font-weight="900">CPI Scenario Map for Bitcoin</text>
<rect x="54" y="438" width="462" height="130" rx="14" fill="#140A2A" stroke="#7C3AED" stroke-width="1.5"/>
<text x="82" y="472" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">Cool CPI Scenario</text>
<text x="82" y="506" font-family="Arial,sans-serif" font-size="20" fill="#E6EDF3">Dollar↓ · Rate cut hopes↑</text>
<text x="82" y="540" font-family="Arial,sans-serif" font-size="20" fill="#10B981">Bitcoin $85,000+ rebound possible</text>
<rect x="564" y="438" width="462" height="130" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="592" y="472" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">Hot CPI Scenario</text>
<text x="592" y="506" font-family="Arial,sans-serif" font-size="20" fill="#E6EDF3">Dollar↑ · Rate cut retreats</text>
<text x="592" y="540" font-family="Arial,sans-serif" font-size="20" fill="#EF4444">$80,000 downside pressure</text>
${statCard(54, 590, 306, 'Market Cap', '$1.67T', '1.67 trillion USD', '#7C3AED')}
${statCard(384, 590, 306, 'CPI Release', 'Oct 14', 'tomorrow', '#6D28D9')}
${statCard(714, 590, 312, 'FOMC', 'Oct 28', 'rate decision', '#5B21B6')}
<rect x="54" y="750" width="${W-108}" height="468" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="794" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#7C3AED" font-weight="900">Structural Supply Remains Firm</text>
<line x1="82" y1="808" x2="${W-82}" y2="808" stroke="#30363D" stroke-width="1"/>
${bullet(82, 824, 'Spot ETF 5-week consecutive inflows — institutional allocation holds', '#7C3AED')}
${bullet(82, 884, '$83,000 floor — institutional demand forming structural support', '#6D28D9')}
${bullet(82, 944, 'Near-term volatility unavoidable — direction resets after CPI', '#5B21B6')}
${bullet(82, 1004, 'Bernstein: year-end rebound intact · BlackRock: 1-2% alloc', '#A78BFA')}
<rect x="82" y="1108" width="${W-164}" height="50" rx="10" fill="#0A0420" stroke="#7C3AED" stroke-width="1.5"/>
<text x="110" y="1142" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">CPI decides near-term direction — structural supply supports</text>
${footer()}`);
    await save('btc-cpi-wait-20261013-en', svg);
  }

  // ── 13. crypto-sol-eth-20261013 (KO) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#7C3AED', '#6D28D9')}
${badge(54, 30, '가상자산', '#7C3AED')}
${badge(162, 30, 'SOL', '#5B21B6')}
${badge(224, 30, 'ETH', '#4C1D95')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · SOL $110.80 · ETH $2,500 — CPI 관망 속 약보합</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#9945FF" font-weight="900">$110.80</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">솔라나 현재가</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">소폭 하락 · ETH $2,500 보합 · BTC 동반 약세</text>
${divider(378, '#7C3AED', '#9945FF')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#7C3AED" font-weight="900">알트코인 현황 (2026.10.13)</text>
${statCard(54, 438, 306, 'SOL (솔라나)', '$110.80', '소폭 하락', '#9945FF')}
${statCard(384, 438, 306, 'ETH (이더리움)', '$2,500', '보합세', '#627EEA')}
${statCard(714, 438, 312, 'BTC 동조', '-0.70%', '알트코인 동반', '#7C3AED')}
<rect x="54" y="598" width="${W-108}" height="120" rx="14" fill="#140A2A" stroke="#9945FF" stroke-width="1.5"/>
<text x="82" y="638" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">솔라나 — DeFi 예치 자산·수수료 수입 이더리움 수준 근접</text>
<text x="82" y="678" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">매크로 개선 시 가장 빠른 반응 패턴 반복 — 알트코인 선도 역할</text>
<rect x="54" y="732" width="${W-108}" height="120" rx="14" fill="#0A0A2A" stroke="#627EEA" stroke-width="1.5"/>
<text x="82" y="772" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">이더리움 — 스테이킹·L2 생태계 구조적 수요 뒷받침</text>
<text x="82" y="812" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">현물 ETF 기관 유입은 비트코인 대비 상대적 느린 속도</text>
<rect x="54" y="882" width="${W-108}" height="336" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="926" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#7C3AED" font-weight="900">기관·하우스 전망</text>
<line x1="82" y1="940" x2="${W-82}" y2="940" stroke="#30363D" stroke-width="1"/>
${bullet(82, 956, '모건스탠리: SOL, ETH 시총 재위협 가능 — CPI 후 촉매', '#9945FF')}
${bullet(82, 1016, '번스타인: 현물 ETF 자금 ETH로 이동 순서 전망 유지', '#627EEA')}
${bullet(82, 1076, '핵심: 10월 14일 CPI·10월 28일 FOMC가 방향 결정', '#7C3AED')}
<rect x="82" y="1156" width="${W-164}" height="50" rx="10" fill="#0A0420" stroke="#7C3AED" stroke-width="1.5"/>
<text x="110" y="1188" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">매크로 완화 신호 시 SOL·ETH 동반 반등 전망</text>
${footer()}`);
    await save('crypto-sol-eth-20261013', svg);
  }

  // ── 14. crypto-sol-eth-20261013-en (EN) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#7C3AED', '#6D28D9')}
${badge(54, 30, 'Crypto', '#7C3AED')}
${badge(152, 30, 'SOL', '#5B21B6')}
${badge(216, 30, 'ETH', '#4C1D95')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · SOL $110.80 · ETH $2,500 — weak ahead of CPI</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#9945FF" font-weight="900">$110.80</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Solana Current Price</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Minor decline · ETH $2,500 flat · BTC correlated weakness</text>
${divider(378, '#7C3AED', '#9945FF')}
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#7C3AED" font-weight="900">Altcoin Snapshot (2026.10.13)</text>
${statCard(54, 438, 306, 'SOL (Solana)', '$110.80', 'minor decline', '#9945FF')}
${statCard(384, 438, 306, 'ETH (Ethereum)', '$2,500', 'flat', '#627EEA')}
${statCard(714, 438, 312, 'BTC Correlation', '-0.70%', 'alts tracking', '#7C3AED')}
<rect x="54" y="598" width="${W-108}" height="120" rx="14" fill="#140A2A" stroke="#9945FF" stroke-width="1.5"/>
<text x="82" y="638" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Solana — DeFi TVL and fee revenue nearing Ethereum level</text>
<text x="82" y="678" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Macro improvement → SOL leads altcoin recovery — pattern repeating</text>
<rect x="54" y="732" width="${W-108}" height="120" rx="14" fill="#0A0A2A" stroke="#627EEA" stroke-width="1.5"/>
<text x="82" y="772" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Ethereum — staking + L2 ecosystem structural demand intact</text>
<text x="82" y="812" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Spot ETF institutional inflow slower vs BTC — relative underperform</text>
<rect x="54" y="882" width="${W-108}" height="336" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="926" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#7C3AED" font-weight="900">Institutional Views</text>
<line x1="82" y1="940" x2="${W-82}" y2="940" stroke="#30363D" stroke-width="1"/>
${bullet(82, 956, 'Morgan Stanley: SOL may rethreat ETH mkt cap — post-CPI catalyst', '#9945FF')}
${bullet(82, 1016, 'Bernstein: spot ETF rotation from BTC to ETH order intact', '#627EEA')}
${bullet(82, 1076, 'Key: Oct 14 CPI + Oct 28 FOMC decide direction', '#7C3AED')}
<rect x="82" y="1156" width="${W-164}" height="50" rx="10" fill="#0A0420" stroke="#7C3AED" stroke-width="1.5"/>
<text x="110" y="1188" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Macro easing signal → SOL + ETH joint rebound expected</text>
${footer()}`);
    await save('crypto-sol-eth-20261013-en', svg);
  }

  // ── 15. summary-20261013 (KO) ────────────────────────────────────────
  {
    const topicCount = 16;
    const svg = svgWrap(`
${gradBar('#7C3AED', '#3B82F6')}
${badge(54, 30, '한장요약', '#7C3AED')}
${badge(172, 30, '2026.10.13', '#4C1D95')}
${badge(330, 30, `TODAY ${topicCount}`, '#1D4ED8')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026년 10월 13일 월요일 · investus.kr 오늘의 큰 그림</text>
<text x="54" y="188" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#fff" font-weight="900">오늘의 5대 뉴스</text>
${divider(208, '#7C3AED', '#3B82F6')}
<rect x="54" y="222" width="${W-108}" height="100" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="258" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">① TSLA — 제프리스 $420 상향 + 사이버캡 500대</text>
<text x="82" y="300" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">3분기 실적 D-8 · 중국 9월 최고치 64,837대 · 오스틴 1분 대기</text>
<rect x="54" y="336" width="${W-108}" height="100" rx="14" fill="#0A1525" stroke="#3B82F6" stroke-width="1.5"/>
<text x="82" y="372" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">② 스타링크 — 위성 총질량 세계 초과 6,197t</text>
<text x="82" y="414" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">ISS×15배 · 나머지 전체 5,222t 추월 · 우주 인프라 패권 전환</text>
<rect x="54" y="450" width="${W-108}" height="100" rx="14" fill="#050E1A" stroke="#60A5FA" stroke-width="1.5"/>
<text x="82" y="486" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#60A5FA" font-weight="900">③ MSFT Maia 300 — 40% 효율 · 멀티기가와트 2027</text>
<text x="82" y="528" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">엔비디아 GPU 의존 축소 가속 · Azure AI 원가 혁신</text>
<rect x="54" y="564" width="${W-108}" height="100" rx="14" fill="#041A10" stroke="#10B981" stroke-width="1.5"/>
<text x="82" y="600" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">④ 안전자산 — 금 $4,168 · 아람코 재고 경고</text>
<text x="82" y="642" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">10Y 5.24% · DXY 102.21 · 원유 재고 마지막 완충재</text>
<rect x="54" y="678" width="${W-108}" height="100" rx="14" fill="#1A080A" stroke="#FB923C" stroke-width="1.5"/>
<text x="82" y="714" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">⑤ 한국·가상자산 — 외국인 14일 순매도 20.93조</text>
<text x="82" y="756" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">BTC $82,929 · SOL $110.80 · 14일 CPI가 방향 결정</text>
${divider(792, '#7C3AED', '#3B82F6')}
<text x="54" y="836" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" font-weight="900">핵심 일정</text>
<rect x="54" y="850" width="462" height="110" rx="14" fill="#140A2A" stroke="#7C3AED" stroke-width="1.5"/>
<text x="82" y="886" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#7C3AED" font-weight="900">10월 14일 (내일)</text>
<text x="82" y="920" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">미국 9월 CPI 발표</text>
<text x="82" y="950" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">금리·달러·가상자산 방향 결정</text>
<rect x="564" y="850" width="462" height="110" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="592" y="886" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#EF4444" font-weight="900">10월 21일 (8일 후)</text>
<text x="592" y="920" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">테슬라 3분기 실적</text>
<text x="592" y="950" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">차량 마진·FSD·로보택시 업데이트</text>
<rect x="54" y="980" width="${W-108}" height="90" rx="14" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="1016" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">오늘 리포트 ${topicCount}개 — 전체 보기: investus.kr</text>
<text x="82" y="1052" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">TSLA 5건 · SPCX 2건 · MSFT 1건 · AI 1건 · 에너지 1건 · 한국·안전자산·가상자산 5건</text>
${footer()}`);
    await save('summary-20261013', svg);
  }

  // ── 16. summary-20261013-en (EN) ─────────────────────────────────────
  {
    const topicCount = 16;
    const svg = svgWrap(`
${gradBar('#7C3AED', '#3B82F6')}
${badge(54, 30, 'Daily Summary', '#7C3AED')}
${badge(242, 30, '2026.10.13', '#4C1D95')}
${badge(400, 30, `TODAY ${topicCount}`, '#1D4ED8')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Monday, Oct 13 2026 · investus.kr Today's Big Picture</text>
<text x="54" y="188" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#fff" font-weight="900">Today's Top 5 Stories</text>
${divider(208, '#7C3AED', '#3B82F6')}
<rect x="54" y="222" width="${W-108}" height="100" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="82" y="258" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">① TSLA — Jefferies $420 raise + Cybercab 500 fleet</text>
<text x="82" y="300" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Q3 earnings in 8 days · China Sep record 64,837 · Austin 1-min wait</text>
<rect x="54" y="336" width="${W-108}" height="100" rx="14" fill="#0A1525" stroke="#3B82F6" stroke-width="1.5"/>
<text x="82" y="372" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">② Starlink — satellite mass exceeds rest of world at 6,197t</text>
<text x="82" y="414" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">15× ISS · surpassed all other satellites · space infra dominance</text>
<rect x="54" y="450" width="${W-108}" height="100" rx="14" fill="#050E1A" stroke="#60A5FA" stroke-width="1.5"/>
<text x="82" y="486" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#60A5FA" font-weight="900">③ MSFT Maia 300 — +40% efficiency · multi-GW in 2027</text>
<text x="82" y="528" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Nvidia GPU dependency accelerating down · Azure AI cost revolution</text>
<rect x="54" y="564" width="${W-108}" height="100" rx="14" fill="#041A10" stroke="#10B981" stroke-width="1.5"/>
<text x="82" y="600" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">④ Safe Assets — Gold $4,168 · Aramco inventory warning</text>
<text x="82" y="642" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">US10Y 5.24% · DXY 102.21 · crude inventory at last buffer</text>
<rect x="54" y="678" width="${W-108}" height="100" rx="14" fill="#1A080A" stroke="#FB923C" stroke-width="1.5"/>
<text x="82" y="714" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FB923C" font-weight="900">⑤ Korea + Crypto — 14-day foreign sell ₩20.93T</text>
<text x="82" y="756" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">BTC $82,929 · SOL $110.80 · Oct 14 CPI decides direction</text>
${divider(792, '#7C3AED', '#3B82F6')}
<text x="54" y="836" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" font-weight="900">Key Dates</text>
<rect x="54" y="850" width="462" height="110" rx="14" fill="#140A2A" stroke="#7C3AED" stroke-width="1.5"/>
<text x="82" y="886" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#7C3AED" font-weight="900">Oct 14 (Tomorrow)</text>
<text x="82" y="920" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">US September CPI</text>
<text x="82" y="950" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Sets direction for rates, dollar, crypto</text>
<rect x="564" y="850" width="462" height="110" rx="14" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="592" y="886" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#EF4444" font-weight="900">Oct 21 (8 days)</text>
<text x="592" y="920" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Tesla Q3 Earnings</text>
<text x="592" y="950" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Vehicle margins · FSD · Robotaxi update</text>
<rect x="54" y="980" width="${W-108}" height="90" rx="14" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="1016" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">Today ${topicCount} reports — read all at investus.kr</text>
<text x="82" y="1052" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">TSLA 5 · SPCX 2 · MSFT 1 · AI 1 · Energy 1 · Korea/Safe Assets/Crypto 5</text>
${footer()}`);
    await save('summary-20261013-en', svg);
  }

  console.log('\nPart C complete (16 charts × KO+EN = 32 PNGs total for 2026-10-13)');
}

main().catch(console.error);
