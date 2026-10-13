#!/usr/bin/env node
// SVG chart generator — 2026-10-13 batch part B (charts 9-16)
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

  // ── 1. spcx-starlink-mass-20261013 (KO) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#1D4ED8')}
${badge(54, 30, '종목분석', '#3B82F6')}
${badge(190, 30, 'SPCX', '#1D4ED8')}
${badge(270, 30, '스타링크', '#1E3A8A')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 스타링크 위성 총질량 — 세계 나머지 위성 초과</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#3B82F6" font-weight="900">6,197t</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">스타링크 위성 총질량</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">세계 나머지 위성 5,222t 초과 · ISS×15배</text>
${divider(376, '#3B82F6', '#1D4ED8')}
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">질량 비교 (2026.10.13)</text>
<text x="54" y="462" font-family="Arial,sans-serif" font-size="22" fill="#3B82F6">스타링크</text>
<rect x="240" y="440" width="690" height="34" rx="5" fill="#21262D"/>
<rect x="240" y="440" width="690" height="34" rx="5" fill="#3B82F6"/>
<text x="940" y="464" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">6,197t</text>
<text x="54" y="514" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">나머지 전체</text>
<rect x="240" y="492" width="690" height="34" rx="5" fill="#21262D"/>
<rect x="240" y="492" width="582" height="34" rx="5" fill="#374151"/>
<text x="830" y="514" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#8B949E" font-weight="900">5,222t</text>
<text x="54" y="566" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">ISS(국제우주정거장)</text>
<rect x="240" y="544" width="690" height="34" rx="5" fill="#21262D"/>
<rect x="240" y="544" width="46" height="34" rx="5" fill="#1D4ED8"/>
<text x="294" y="566" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#8B949E" font-weight="900">420t</text>
${statCard(54, 600, 306, '스타링크 총질량', '6,197t', '세계 1위', '#3B82F6')}
${statCard(384, 600, 306, '초과 비율', '+18.7%', '나머지 대비', '#1D4ED8')}
${statCard(714, 600, 312, 'ISS 대비', '×15배', '국제우주정거장', '#60A5FA')}
<rect x="54" y="760" width="${W-108}" height="458" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="804" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">우주 인프라 패권 전환</text>
<line x1="82" y1="818" x2="${W-82}" y2="818" stroke="#30363D" stroke-width="1"/>
${bullet(82, 834, '스타링크 — 단일 기업이 전 세계 위성망 절반 이상 보유', '#3B82F6')}
${bullet(82, 894, '질량 세계 초과 = 우주 인프라 패권 수치로 확인된 순간', '#1D4ED8')}
${bullet(82, 954, 'SPCX ETF — 스페이스X 간접투자 유일 상장 상품', '#60A5FA')}
${bullet(82, 1014, '스타링크 IPO 시 시가총액 급등 잠재력 반영 중', '#2563EB')}
<rect x="82" y="1098" width="${W-164}" height="66" rx="12" fill="#0A1020" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1124" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6">📅 다음 체크포인트</text>
<text x="110" y="1152" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">스타링크 IPO 타임라인 업데이트</text>
${footer()}`);
    await save('spcx-starlink-mass-20261013', svg);
  }

  // ── 2. spcx-starlink-mass-20261013-en (EN) ──────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#1D4ED8')}
${badge(54, 30, 'Stock Analysis', '#3B82F6')}
${badge(254, 30, 'SPCX', '#1D4ED8')}
${badge(334, 30, 'Starlink', '#1E3A8A')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Starlink satellite mass exceeds rest of world combined</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#3B82F6" font-weight="900">6,197t</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Starlink Total Mass</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">vs rest of world 5,222t · 15× ISS weight</text>
${divider(376, '#3B82F6', '#1D4ED8')}
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">Mass Comparison (2026.10.13)</text>
<text x="54" y="462" font-family="Arial,sans-serif" font-size="22" fill="#3B82F6">Starlink</text>
<rect x="200" y="440" width="730" height="34" rx="5" fill="#21262D"/>
<rect x="200" y="440" width="730" height="34" rx="5" fill="#3B82F6"/>
<text x="940" y="464" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">6,197t</text>
<text x="54" y="514" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Rest of world</text>
<rect x="200" y="492" width="730" height="34" rx="5" fill="#21262D"/>
<rect x="200" y="492" width="615" height="34" rx="5" fill="#374151"/>
<text x="823" y="514" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#8B949E" font-weight="900">5,222t</text>
<text x="54" y="566" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">ISS (space station)</text>
<rect x="200" y="544" width="730" height="34" rx="5" fill="#21262D"/>
<rect x="200" y="544" width="49" height="34" rx="5" fill="#1D4ED8"/>
<text x="257" y="566" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#8B949E" font-weight="900">420t</text>
${statCard(54, 600, 306, 'Starlink Mass', '6,197t', '#1 in world', '#3B82F6')}
${statCard(384, 600, 306, 'Excess', '+18.7%', 'vs rest combined', '#1D4ED8')}
${statCard(714, 600, 312, 'vs ISS', '×15', 'space station wt', '#60A5FA')}
<rect x="54" y="760" width="${W-108}" height="458" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="804" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">Space Infrastructure Dominance</text>
<line x1="82" y1="818" x2="${W-82}" y2="818" stroke="#30363D" stroke-width="1"/>
${bullet(82, 834, 'Single company now owns majority of orbital mass worldwide', '#3B82F6')}
${bullet(82, 894, 'Mass milestone = space infrastructure leadership proven by data', '#1D4ED8')}
${bullet(82, 954, 'SPCX ETF — only listed vehicle for SpaceX exposure', '#60A5FA')}
${bullet(82, 1014, 'Starlink IPO event would unlock massive valuation re-rate', '#2563EB')}
<rect x="82" y="1098" width="${W-164}" height="66" rx="12" fill="#0A1020" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1124" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6">📅 Next checkpoint</text>
<text x="110" y="1152" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Starlink IPO timeline update</text>
${footer()}`);
    await save('spcx-starlink-mass-20261013-en', svg);
  }

  // ── 3. spcx-starlink-rescue-20261013 (KO) ───────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#1D4ED8')}
${badge(54, 30, '종목분석', '#3B82F6')}
${badge(190, 30, 'SPCX', '#1D4ED8')}
${badge(270, 30, '스타링크', '#1E3A8A')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 스타링크 — 캘리포니아 산불 구조 통신 핵심 역할</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#3B82F6" font-weight="900">재난 인프라</text>
<text x="54" y="286" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">스타링크 캘리포니아 구조</text>
<text x="54" y="346" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">지상 통신 두절 구역에서 위성 연결 유지 — 구조대 통신 제공</text>
${divider(370, '#3B82F6', '#1D4ED8')}
<text x="54" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">스타링크 재난 대응 역할</text>
<rect x="54" y="430" width="${W-108}" height="100" rx="14" fill="#0A1525" stroke="#3B82F6" stroke-width="1.5"/>
<text x="82" y="470" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">지상 통신 기반시설 손상 → 스타링크만 작동</text>
<text x="82" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">산불 피해 구역 구조대·피해자 통신 연결 유지</text>
<rect x="54" y="544" width="${W-108}" height="100" rx="14" fill="#0A1525" stroke="#1D4ED8" stroke-width="1.5"/>
<text x="82" y="584" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">이동형 터미널 — 차량·드론 탑재 현장 배치</text>
<text x="82" y="624" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">기존 위성 대비 저지연·고속 연결 — 실시간 지휘 가능</text>
${statCard(54, 662, 306, '재난 배치 사례', '캘리포니아', '산불 구조', '#3B82F6')}
${statCard(384, 662, 306, '지연 시간', '~20ms', '기존 위성 600ms↓', '#1D4ED8')}
${statCard(714, 662, 312, '서비스 국가', '100+', '전 세계 커버', '#60A5FA')}
<rect x="54" y="822" width="${W-108}" height="396" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="866" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">SPCX 투자 시사점</text>
<line x1="82" y1="880" x2="${W-82}" y2="880" stroke="#30363D" stroke-width="1"/>
${bullet(82, 896, '재난 통신 역할 = 국방·공공 계약 확장 근거', '#3B82F6')}
${bullet(82, 956, '미국·EU 정부 재난 대응 인프라 계약 가속화 전망', '#1D4ED8')}
${bullet(82, 1016, 'SPCX — 스페이스X 기업가치 상승을 추종하는 ETF', '#60A5FA')}
<rect x="82" y="1100" width="${W-164}" height="66" rx="12" fill="#0A1020" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1126" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6">재난 인프라 = 구조적 성장 테마</text>
<text x="110" y="1154" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">기후 위기 심화 → 스타링크 수요 구조적 확대</text>
${footer()}`);
    await save('spcx-starlink-rescue-20261013', svg);
  }

  // ── 4. spcx-starlink-rescue-20261013-en (EN) ────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#1D4ED8')}
${badge(54, 30, 'Stock Analysis', '#3B82F6')}
${badge(254, 30, 'SPCX', '#1D4ED8')}
${badge(334, 30, 'Starlink', '#1E3A8A')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Starlink — critical comms in California wildfire rescue</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#3B82F6" font-weight="900">Disaster Infra</text>
<text x="54" y="286" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Starlink California Rescue</text>
<text x="54" y="346" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Ground comms failed — Starlink kept rescue teams connected</text>
${divider(370, '#3B82F6', '#1D4ED8')}
<text x="54" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">Disaster Response Role</text>
<rect x="54" y="430" width="${W-108}" height="100" rx="14" fill="#0A1525" stroke="#3B82F6" stroke-width="1.5"/>
<text x="82" y="470" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Ground infrastructure destroyed → only Starlink worked</text>
<text x="82" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Rescue teams and survivors maintained comms via satellite</text>
<rect x="54" y="544" width="${W-108}" height="100" rx="14" fill="#0A1525" stroke="#1D4ED8" stroke-width="1.5"/>
<text x="82" y="584" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Mobile terminals — vehicle/drone-mounted field deployment</text>
<text x="82" y="624" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Low latency vs legacy satellites — real-time command possible</text>
${statCard(54, 662, 306, 'Disaster Deploy', 'California', 'wildfire rescue', '#3B82F6')}
${statCard(384, 662, 306, 'Latency', '~20ms', 'vs 600ms legacy sat', '#1D4ED8')}
${statCard(714, 662, 312, 'Countries', '100+', 'global coverage', '#60A5FA')}
<rect x="54" y="822" width="${W-108}" height="396" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="866" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">SPCX Investment Case</text>
<line x1="82" y1="880" x2="${W-82}" y2="828" stroke="#30363D" stroke-width="1"/>
${bullet(82, 896, 'Disaster comms role = government/defense contract expansion', '#3B82F6')}
${bullet(82, 956, 'US/EU emergency infra contracts accelerating', '#1D4ED8')}
${bullet(82, 1016, 'SPCX ETF tracks SpaceX valuation appreciation', '#60A5FA')}
<rect x="82" y="1100" width="${W-164}" height="66" rx="12" fill="#0A1020" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1126" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6">Disaster infra = structural growth theme</text>
<text x="110" y="1154" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Climate intensification → Starlink demand structurally growing</text>
${footer()}`);
    await save('spcx-starlink-rescue-20261013-en', svg);
  }

  // ── 5. msft-maia300-20261013 (KO) ───────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#06B6D4')}
${badge(54, 30, '섹터', '#3B82F6')}
${badge(140, 30, 'MSFT', '#0284C7')}
${badge(222, 30, 'Maia 300', '#0E7490')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · 마이크로소프트 Maia 300 — 멀티기가와트 2027 배포</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#3B82F6" font-weight="900">+40%</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Maia 300 AI 효율 향상</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">동일 전력 대비 40% 더 많은 AI 연산 · 2027 멀티기가와트</text>
${divider(376, '#3B82F6', '#06B6D4')}
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">GPU 대비 성능 비교</text>
<text x="54" y="462" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">기존 GPU (엔비디아)</text>
<rect x="320" y="440" width="610" height="32" rx="5" fill="#21262D"/>
<rect x="320" y="440" width="435" height="32" rx="5" fill="#374151"/>
<text x="763" y="462" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B949E" font-weight="900">100%</text>
<text x="54" y="514" font-family="Arial,sans-serif" font-size="22" fill="#3B82F6">Maia 300</text>
<rect x="320" y="492" width="610" height="32" rx="5" fill="#21262D"/>
<rect x="320" y="492" width="610" height="32" rx="5" fill="#3B82F6"/>
<text x="938" y="514" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">140%</text>
${statCard(54, 546, 306, '효율 향상', '+40%', '동일 전력 기준', '#3B82F6')}
${statCard(384, 546, 306, '배포 규모', '멀티GW', '2027년부터', '#0284C7')}
${statCard(714, 546, 312, '칩 전략', 'NVDA 탈피', 'Azure 자체칩', '#06B6D4')}
<rect x="54" y="706" width="${W-108}" height="512" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="750" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">투자 시사점</text>
<line x1="82" y1="764" x2="${W-82}" y2="764" stroke="#30363D" stroke-width="1"/>
${bullet(82, 780, 'Maia 300 배포 = 엔비디아 GPU 의존 축소 속도 예상 이상', '#3B82F6')}
${bullet(82, 840, '40% 효율 = 동일 데이터센터 전력으로 AI 처리량 1.4배', '#0284C7')}
${bullet(82, 900, '멀티기가와트 배포 = Azure AI 서비스 원가 구조 혁신', '#06B6D4')}
${bullet(82, 960, 'MSFT 자체칩 성숙 → 구글 TPU·아마존 트레이니움 경쟁', '#60A5FA')}
${bullet(82, 1020, '에너지 효율↑ = 데이터센터 전력 제약 완화 — 핵심 병목 해소', '#1D4ED8')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#050E1A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6">엔비디아 의존도 탈피 가속</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">MSFT AI 마진 개선 → 2027 EPS 상향 조정 전망</text>
${footer()}`);
    await save('msft-maia300-20261013', svg);
  }

  // ── 6. msft-maia300-20261013-en (EN) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#06B6D4')}
${badge(54, 30, 'Sector', '#3B82F6')}
${badge(152, 30, 'MSFT', '#0284C7')}
${badge(240, 30, 'Maia 300', '#0E7490')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · Microsoft Maia 300 — multi-gigawatt deploy in 2027</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#3B82F6" font-weight="900">+40%</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Maia 300 AI Efficiency</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">40% more AI ops/watt vs GPU · Multi-GW scale from 2027</text>
${divider(376, '#3B82F6', '#06B6D4')}
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#3B82F6" font-weight="900">Performance vs GPU</text>
<text x="54" y="462" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Nvidia GPU (baseline)</text>
<rect x="320" y="440" width="610" height="32" rx="5" fill="#21262D"/>
<rect x="320" y="440" width="435" height="32" rx="5" fill="#374151"/>
<text x="763" y="462" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B949E" font-weight="900">100%</text>
<text x="54" y="514" font-family="Arial,sans-serif" font-size="22" fill="#3B82F6">Maia 300</text>
<rect x="320" y="492" width="610" height="32" rx="5" fill="#21262D"/>
<rect x="320" y="492" width="610" height="32" rx="5" fill="#3B82F6"/>
<text x="938" y="514" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">140%</text>
${statCard(54, 546, 306, 'Efficiency Gain', '+40%', 'per watt vs GPU', '#3B82F6')}
${statCard(384, 546, 306, 'Deploy Scale', 'Multi-GW', 'from 2027', '#0284C7')}
${statCard(714, 546, 312, 'Chip Strategy', 'NVDA exit', 'Azure custom silicon', '#06B6D4')}
<rect x="54" y="706" width="${W-108}" height="512" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="750" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">Investment Takeaways</text>
<line x1="82" y1="764" x2="${W-82}" y2="764" stroke="#30363D" stroke-width="1"/>
${bullet(82, 780, 'Maia 300 = Nvidia GPU dependency reducing faster than expected', '#3B82F6')}
${bullet(82, 840, '+40% efficiency = 1.4× AI throughput on same datacenter power', '#0284C7')}
${bullet(82, 900, 'Multi-GW rollout = Azure AI unit economics transformation', '#06B6D4')}
${bullet(82, 960, 'MSFT custom silicon maturation → competes with Google TPU', '#60A5FA')}
${bullet(82, 1020, 'Energy efficiency↑ = datacenter power bottleneck easing', '#1D4ED8')}
<rect x="82" y="1108" width="${W-164}" height="66" rx="12" fill="#050E1A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1134" font-family="Arial,sans-serif" font-size="19" fill="#3B82F6">Nvidia dependency reduction accelerating</text>
<text x="110" y="1162" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">MSFT AI margin improvement → 2027 EPS upgrade cycle</text>
${footer()}`);
    await save('msft-maia300-20261013-en', svg);
  }

  // ── 7. ai-jevons-20261013 (KO) ──────────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#0D9488')}
${badge(54, 30, '매크로', '#10B981')}
${badge(154, 30, 'AI인프라', '#0D9488')}
${badge(272, 30, 'Jevons역설', '#065F46')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · a16z 차트 — AI 컴퓨트 가격 역설</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#10B981" font-weight="900">Jevons</text>
<text x="54" y="290" font-family="Arial Black,Arial,sans-serif" font-size="60" fill="#fff" font-weight="900">역설 실증됐다</text>
<text x="54" y="348" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">수요↑ → 가격↑ — H100 $2.50/hr 강보합 · 토큰 가격 하락</text>
${divider(372, '#10B981', '#0D9488')}
<text x="54" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">AI 컴퓨트 vs 토큰 가격 방향</text>
<text x="54" y="458" font-family="Arial,sans-serif" font-size="22" fill="#10B981">H100 임대가 (시간당)</text>
<rect x="330" y="436" width="600" height="32" rx="5" fill="#21262D"/>
<rect x="330" y="436" width="486" height="32" rx="5" fill="#10B981"/>
<text x="824" y="458" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">$2.50 강보합</text>
<text x="54" y="510" font-family="Arial,sans-serif" font-size="22" fill="#EF4444">AI 토큰 가격</text>
<rect x="330" y="488" width="600" height="32" rx="5" fill="#21262D"/>
<rect x="330" y="488" width="240" height="32" rx="5" fill="#EF4444"/>
<text x="578" y="510" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">여름 이후 하락</text>
${statCard(54, 542, 306, 'H100 임대가', '$2.50/hr', '수요 강세 유지', '#10B981')}
${statCard(384, 542, 306, '토큰 가격', '하락세', '2026년 여름↓', '#EF4444')}
${statCard(714, 542, 312, '역설 핵심', '수요↑→가격↑', 'Jevons 실증', '#0D9488')}
<rect x="54" y="702" width="${W-108}" height="516" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="746" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">Jevons 역설이란?</text>
<line x1="82" y1="760" x2="${W-82}" y2="760" stroke="#30363D" stroke-width="1"/>
${bullet(82, 776, '효율↑ → 사용량 폭발적 증가 → 총 자원 소비 오히려↑', '#10B981')}
${bullet(82, 836, 'AI 토큰 가격 내려가도 컴퓨트 수요 더 빨리 늘어남', '#0D9488')}
${bullet(82, 896, 'H100 수요 감소 없음 — AI 모델 복잡도·크기 계속 증가', '#34D399')}
${bullet(82, 956, '엔비디아·TSMC·전력 인프라 구조적 수혜 지속 근거', '#065F46')}
${bullet(82, 1016, 'AI 유틸리티화 = 컴퓨트 단가 하방 저항 — 투자 논리 유지', '#10B981')}
<rect x="82" y="1104" width="${W-164}" height="66" rx="12" fill="#041A10" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="19" fill="#10B981">결론: 컴퓨트는 줄어들지 않는다</text>
<text x="110" y="1158" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">AI 인프라 투자 테마 — 역설이 지지하는 근거</text>
${footer()}`);
    await save('ai-jevons-20261013', svg);
  }

  // ── 8. ai-jevons-20261013-en (EN) ────────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#0D9488')}
${badge(54, 30, 'Macro', '#10B981')}
${badge(156, 30, 'AI Infra', '#0D9488')}
${badge(266, 30, "Jevons Paradox", '#065F46')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.13 · a16z chart — AI compute pricing paradox</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#10B981" font-weight="900">Jevons</text>
<text x="54" y="290" font-family="Arial Black,Arial,sans-serif" font-size="60" fill="#fff" font-weight="900">Paradox Proven</text>
<text x="54" y="348" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Demand↑ → Price↑ — H100 $2.50/hr holding · token price falling</text>
${divider(372, '#10B981', '#0D9488')}
<text x="54" y="416" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#10B981" font-weight="900">AI Compute vs Token Price Direction</text>
<text x="54" y="458" font-family="Arial,sans-serif" font-size="22" fill="#10B981">H100 rental (per hour)</text>
<rect x="330" y="436" width="600" height="32" rx="5" fill="#21262D"/>
<rect x="330" y="436" width="486" height="32" rx="5" fill="#10B981"/>
<text x="824" y="458" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">$2.50 holding</text>
<text x="54" y="510" font-family="Arial,sans-serif" font-size="22" fill="#EF4444">AI token price</text>
<rect x="330" y="488" width="600" height="32" rx="5" fill="#21262D"/>
<rect x="330" y="488" width="240" height="32" rx="5" fill="#EF4444"/>
<text x="578" y="510" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Falling since summer</text>
${statCard(54, 542, 306, 'H100 Rental', '$2.50/hr', 'demand staying firm', '#10B981')}
${statCard(384, 542, 306, 'Token Price', 'Falling', 'since summer 2026', '#EF4444')}
${statCard(714, 542, 312, 'The Paradox', 'Demand↑→Price↑', 'Jevons proven', '#0D9488')}
<rect x="54" y="702" width="${W-108}" height="516" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="746" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">What is the Jevons Paradox?</text>
<line x1="82" y1="760" x2="${W-82}" y2="760" stroke="#30363D" stroke-width="1"/>
${bullet(82, 776, 'Efficiency↑ → usage explosion → total resource consumption↑', '#10B981')}
${bullet(82, 836, 'Token prices fall but compute demand grows even faster', '#0D9488')}
${bullet(82, 896, 'H100 demand not shrinking — model scale keeps growing', '#34D399')}
${bullet(82, 956, 'Nvidia·TSMC·power infra structural tailwind sustained', '#065F46')}
${bullet(82, 1016, 'AI commoditization = compute price floor — thesis intact', '#10B981')}
<rect x="82" y="1104" width="${W-164}" height="66" rx="12" fill="#041A10" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1130" font-family="Arial,sans-serif" font-size="19" fill="#10B981">Conclusion: compute demand does not shrink</text>
<text x="110" y="1158" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">AI infra investment thesis — paradox provides the support</text>
${footer()}`);
    await save('ai-jevons-20261013-en', svg);
  }

  console.log('\nPart B complete (8 charts × KO+EN = 16 PNGs)');
}

main().catch(console.error);
