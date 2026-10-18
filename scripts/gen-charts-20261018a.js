#!/usr/bin/env node
// 개별 토픽 카드 — 2026-10-18 (KO + EN)
// seed-2029 로드스터 / 2028 합병 / 2027 Q3 preview / 2026 Meta / 2025 AAPL / 2024 NVDA
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

function topBar(c1, c2) {
  return `<defs>
  <linearGradient id="bgG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#0D1117"/><stop offset="100%" stop-color="#0A0E1A"/>
  </linearGradient>
  <linearGradient id="tBar" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <linearGradient id="divG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}" stop-opacity="0"/><stop offset="30%" stop-color="${c1}"/>
    <stop offset="70%" stop-color="${c2}"/><stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="heroG" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bgG)"/>
<rect x="0" y="0" width="${W}" height="12" fill="url(#tBar)"/>`;
}

function badge(x, label, color) {
  const w = label.length * 14 + 24;
  return `<rect x="${x}" y="30" width="${w}" height="36" rx="8" fill="${color}"/>
<text x="${x + w/2}" y="54" font-family="Arial Black,Arial,sans-serif" font-size="20" fill="#fff" text-anchor="middle" font-weight="900">${label}</text>`;
}

function hbar(x, y, label, value, maxVal, barW, h, color, unit = '') {
  const filled = Math.max(4, Math.round((value / maxVal) * barW));
  return `<text x="${x}" y="${y + 22}" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">${label}</text>
<rect x="${x + 240}" y="${y}" width="${barW}" height="${h}" rx="6" fill="#21262D"/>
<rect x="${x + 240}" y="${y}" width="${filled}" height="${h}" rx="6" fill="${color}"/>
<text x="${x + 240 + filled + 10}" y="${y + 22}" font-family="Arial Black,Arial,sans-serif" font-size="21" fill="#fff" font-weight="900">${value}${unit}</text>`;
}

function stat(x, y, w, label, big, sub, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="130" rx="16" fill="#161B22" stroke="${accent}" stroke-width="2"/>
<text x="${x + w/2}" y="${y + 36}" font-family="Arial,sans-serif" font-size="18" fill="${accent}" text-anchor="middle" font-weight="700">${label}</text>
<text x="${x + w/2}" y="${y + 84}" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#fff" text-anchor="middle" font-weight="900">${big}</text>
<text x="${x + w/2}" y="${y + 114}" font-family="Arial,sans-serif" font-size="17" fill="#8B949E" text-anchor="middle">${sub}</text>`;
}

function bullet(x, y, text, color, line2 = '') {
  const l2 = line2 ? `<text x="${x+34}" y="${y+50}" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">${line2}</text>` : '';
  return `<circle cx="${x+14}" cy="${y+14}" r="7" fill="${color}"/>
<text x="${x+34}" y="${y+22}" font-family="Arial,sans-serif" font-size="21" fill="#E6EDF3">${text}</text>${l2}`;
}

function footer(date, site = 'investus.kr') {
  return `<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">${site}</text>
<text x="${W-54}" y="${H-30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">${date}</text>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Tesla Roadster 공개 — KO
// ─────────────────────────────────────────────────────────────────────────────
async function roadsterKo() {
  const BW = 480;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#EF4444', '#8B5CF6')}
${badge(54,  'TSLA', '#EF4444')}
${badge(180, 'ROADSTER', '#8B5CF6')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.18 · 테슬라 로드스터 공개 완료</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#fff" font-weight="900">TSLA</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="url(#heroG)" font-weight="900">로드스터</text>
<text x="54" y="368" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">SpaceX 스러스터 · 3트림 · +4%</text>
<rect x="54" y="392" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="434" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">트림별 가격 구조</text>
${hbar(54, 452, 'Founders', 250, 260, BW, 28, '#EF4444', 'K$')}
${hbar(54, 492, 'Performance', 180, 260, BW, 28, '#8B5CF6', 'K$')}
${hbar(54, 532, 'Sport', 99, 260, BW, 28, '#60A5FA', 'K$')}
<rect x="740" y="452" width="296" height="40" rx="8" fill="#1A0D0D" stroke="#EF4444" stroke-width="1.5"/>
<text x="888" y="478" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="#EF4444" text-anchor="middle" font-weight="900">TSLA +4% 반응</text>
${stat(54,  600, 306, '0→100km', '1.8초', '하이퍼카 수준', '#EF4444')}
${stat(384, 600, 306, '최고속도', '400km/h', 'Sport 기준 추정', '#8B5CF6')}
${stat(714, 600, 312, 'SpaceX', '스러스터', '맥그리거 테스트 완료', '#60A5FA')}
<rect x="54" y="758" width="${W-108}" height="476" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="804" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">핵심 포인트</text>
<line x1="82" y1="818" x2="${W-82}" y2="818" stroke="#30363D" stroke-width="1"/>
${bullet(82, 832, 'Founders 에디션 25만 달러 한정 수량 — 스러스터 패키지 옵션', '#EF4444')}
${bullet(82, 894, 'SpaceX 맥그리거 기지 로켓 부스터 테스트 완료 → 차량 통합 최초', '#8B5CF6')}
${bullet(82, 956, '0→100 1.8초 · 최고속 400km/h · 1회 충전 항속 1,000km+', '#60A5FA')}
${bullet(82, 1018, 'TSLA 당일 +4% — 실적 발표(21일) 앞두고 합병 옵션 선반영', '#34D399')}
${bullet(82, 1080, '테슬라-SpaceX 기술 융합 최초 가시화 → Terafab 합병 논리 강화', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('tsla-roadster-reveal-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Tesla Roadster — EN
// ─────────────────────────────────────────────────────────────────────────────
async function roadsterEn() {
  const BW = 480;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#EF4444', '#8B5CF6')}
${badge(54,  'TSLA', '#EF4444')}
${badge(180, 'ROADSTER', '#8B5CF6')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 18, 2026 · Tesla Roadster Unveiled</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#fff" font-weight="900">TSLA</text>
<text x="54" y="310" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="url(#heroG)" font-weight="900">ROADSTER</text>
<text x="54" y="368" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">SpaceX Thruster · 3 Trims · +4% Stock</text>
<rect x="54" y="392" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="434" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#EF4444" font-weight="900">Trim Pricing</text>
${hbar(54, 452, 'Founders', 250, 260, BW, 28, '#EF4444', 'K')}
${hbar(54, 492, 'Performance', 180, 260, BW, 28, '#8B5CF6', 'K')}
${hbar(54, 532, 'Sport', 99, 260, BW, 28, '#60A5FA', 'K')}
<rect x="740" y="452" width="296" height="40" rx="8" fill="#1A0D0D" stroke="#EF4444" stroke-width="1.5"/>
<text x="888" y="478" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="#EF4444" text-anchor="middle" font-weight="900">TSLA +4% Reaction</text>
${stat(54,  600, 306, '0–60 mph', '1.8s', 'Hypercar territory', '#EF4444')}
${stat(384, 600, 306, 'Top Speed', '250mph', 'Sport estimate', '#8B5CF6')}
${stat(714, 600, 312, 'SpaceX', 'Thruster', 'McGregor test done', '#60A5FA')}
<rect x="54" y="758" width="${W-108}" height="476" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="804" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Key Points</text>
<line x1="82" y1="818" x2="${W-82}" y2="818" stroke="#30363D" stroke-width="1"/>
${bullet(82, 832, 'Founders Edition at $250K limited qty — SpaceX Thruster Package option', '#EF4444')}
${bullet(82, 894, 'SpaceX McGregor thruster test complete — first rocket tech in consumer car', '#8B5CF6')}
${bullet(82, 956, '0–60 in 1.8s · Top speed 250mph · 620+ mile range per charge', '#60A5FA')}
${bullet(82, 1018, 'TSLA +4% same day — partial Terafab merger option pricing pre-Oct 21', '#34D399')}
${bullet(82, 1080, 'Tesla-SpaceX tech convergence visualized → strengthens merger thesis', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('tsla-roadster-reveal-20261018-en', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Tesla-SpaceX 합병 Terafab — KO
// ─────────────────────────────────────────────────────────────────────────────
async function mergerKo() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#EF4444', '#60A5FA')}
${badge(54,  'TSLA', '#EF4444')}
${badge(180, 'SPCX', '#60A5FA')}
${badge(306, 'TERAFAB', '#8B5CF6')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.18 · 테슬라-SpaceX 합병 논의</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="86" fill="#fff" font-weight="900">TERAFAB</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="70" fill="url(#heroG)" font-weight="900">합병 시나리오</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Barclays $3.5T · Terafab $16.8T · 12월 6일 AGM</text>
<rect x="54" y="378" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#60A5FA" font-weight="900">밸류에이션 시나리오 (합병 성사 가정)</text>
${stat(54,  440, 306, '테슬라 단독', '$382', '현재 주가', '#EF4444')}
${stat(384, 440, 306, 'Barclays 목표', '$3.5T', '통합 시총 목표', '#60A5FA')}
${stat(714, 440, 312, 'Terafab 추산', '$16.8T', '바클레이스 모델', '#8B5CF6')}
<rect x="54" y="604" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="648" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">합병 일정 · 주요 변수</text>
<rect x="54" y="668" width="${W-108}" height="60" rx="12" fill="#1A1A2E" stroke="#8B5CF6" stroke-width="1.5"/>
<text x="${W/2}" y="705" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B5CF6" text-anchor="middle" font-weight="900">12월 6일 정기 주주총회 — 합병 의제 포함 여부 미확정</text>
<rect x="54" y="756" width="${W-108}" height="476" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="802" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">투자 판단 포인트</text>
<line x1="82" y1="816" x2="${W-82}" y2="816" stroke="#30363D" stroke-width="1"/>
${bullet(82, 830, 'Terafab = Tesla + SpaceX 통합 법인 · AI·로켓·EV 원플랫폼', '#EF4444')}
${bullet(82, 892, 'Barclays $3.5T는 합병 성사 가정 목표 — 현재가 대비 업사이드 계산 필요', '#60A5FA')}
${bullet(82, 954, '12월 6일 AGM 합병 안건 공식 공시 없음 — 이사회 결의 전 단계', '#8B5CF6')}
${bullet(82, 1016, 'TSLA + SPCX 동시 보유 = 합병 성사·불성사 양방향 헤지', '#34D399')}
${bullet(82, 1078, '로드스터 스러스터 = 기술 융합 이미 진행 중 → 합병 시너지 가정→실증 전환', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('tsla-spcx-merger-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Tesla-SpaceX Merger — EN
// ─────────────────────────────────────────────────────────────────────────────
async function mergerEn() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#EF4444', '#60A5FA')}
${badge(54,  'TSLA', '#EF4444')}
${badge(180, 'SPCX', '#60A5FA')}
${badge(306, 'TERAFAB', '#8B5CF6')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 18, 2026 · Tesla-SpaceX Merger Discussion</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="86" fill="#fff" font-weight="900">TERAFAB</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="68" fill="url(#heroG)" font-weight="900">MERGER THESIS</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Barclays $3.5T · Terafab $16.8T · Dec 6 AGM</text>
<rect x="54" y="378" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="422" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#60A5FA" font-weight="900">Valuation Scenario (Merger Assumed)</text>
${stat(54,  440, 306, 'TSLA Current', '$382', 'Current share price', '#EF4444')}
${stat(384, 440, 306, 'Barclays Target', '$3.5T', 'Combined mkt cap', '#60A5FA')}
${stat(714, 440, 312, 'Terafab', '$16.8T', 'Barclays model est.', '#8B5CF6')}
<rect x="54" y="604" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="648" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">Timeline &amp; Key Variables</text>
<rect x="54" y="668" width="${W-108}" height="60" rx="12" fill="#1A1A2E" stroke="#8B5CF6" stroke-width="1.5"/>
<text x="${W/2}" y="705" font-family="Arial Black,Arial,sans-serif" font-size="21" fill="#8B5CF6" text-anchor="middle" font-weight="900">Dec 6 AGM — merger agenda NOT yet officially confirmed</text>
<rect x="54" y="756" width="${W-108}" height="476" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="802" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Investment Takeaways</text>
<line x1="82" y1="816" x2="${W-82}" y2="816" stroke="#30363D" stroke-width="1"/>
${bullet(82, 830, 'Terafab = Tesla + SpaceX unified entity · AI, rockets &amp; EVs on one platform', '#EF4444')}
${bullet(82, 892, "Barclays $3.5T assumes merger success — standalone Tesla price today is $382", '#60A5FA')}
${bullet(82, 954, 'No official Dec 6 merger agenda filing — still pre-board resolution stage', '#8B5CF6')}
${bullet(82, 1016, 'Owning both TSLA + SPCX = natural hedge for both merger outcomes', '#34D399')}
${bullet(82, 1078, 'Roadster thruster = live proof of tech convergence → synergy thesis validated', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('tsla-spcx-merger-20261018-en', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. Q3 실적 Preview — KO
// ─────────────────────────────────────────────────────────────────────────────
async function q3Ko() {
  const BW = 480;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#34D399', '#60A5FA')}
${badge(54,  'TSLA', '#EF4444')}
${badge(180, 'SPCX', '#60A5FA')}
${badge(306, 'Q3 실적', '#34D399')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.18 · Q3 실적 프리뷰</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="#fff" font-weight="900">Q3 실적</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="68" fill="url(#heroG)" font-weight="900">프리뷰</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">SPCX Oct 20 · TSLA Oct 21 · 핵심 지표</text>
<rect x="54" y="380" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#34D399" font-weight="900">TSLA 핵심 지표 — 컨센서스 vs 실제</text>
${hbar(54, 442, '차량 마진 2Q', 15.2, 22, BW, 28, '#8B949E', '%')}
${hbar(54, 482, '마진 목표(3Q)', 16.2, 22, BW, 28, '#34D399', '%')}
${hbar(54, 522, '중국 9월 소매', 64837, 70000, BW, 28, '#60A5FA', '')}
${hbar(54, 562, '에너지 GWh', 13.7, 18, BW, 28, '#FBBF24', 'GWh')}
<rect x="740" y="562" width="122" height="28" rx="6" fill="#0D2A1A" stroke="#34D399" stroke-width="1.5"/>
<text x="801" y="581" font-family="Arial Black,Arial,sans-serif" font-size="17" fill="#34D399" text-anchor="middle" font-weight="900">분기 최대</text>
${stat(54,  614, 306, 'SPCX 실적', 'Oct 20', '스타링크 ARPU·DIC', '#60A5FA')}
${stat(384, 614, 306, 'TSLA 실적', 'Oct 21', '차량마진·FSD전환', '#EF4444')}
${stat(714, 614, 312, 'FSD 목표', '20%+', '유료 전환율 임계점', '#34D399')}
<rect x="54" y="772" width="${W-108}" height="462" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="818" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">체크리스트</text>
<line x1="82" y1="832" x2="${W-82}" y2="832" stroke="#30363D" stroke-width="1"/>
${bullet(82, 846, 'SPCX 10/20: DIC 계약 건수·ARPU 개선 폭 공개 여부 → 목표가 상향 트리거', '#60A5FA')}
${bullet(82, 908, 'TSLA 10/21: 차량 마진 15.8~16.2% 달성 여부 — 인센티브 비용이 변수', '#EF4444')}
${bullet(82, 970, '아폴로 840M 메가팩 계약 3Q 인식 여부 → 에너지 매출 서프라이즈 가능성', '#FBBF24')}
${bullet(82, 1032, 'FSD 전환율 20% 돌파 시 리커링 수익 모델 공식화 → 밸류에이션 리레이팅', '#34D399')}
${bullet(82, 1094, '사이버캡 단위 경제성 공식 언급 시 로보택시 멀티플 확장 트리거', '#8B5CF6')}
${footer('2026.10.18')}
</svg>`;
  await save('tsla-spcx-q3-preview-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Q3 Earnings Preview — EN
// ─────────────────────────────────────────────────────────────────────────────
async function q3En() {
  const BW = 480;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#34D399', '#60A5FA')}
${badge(54,  'TSLA', '#EF4444')}
${badge(180, 'SPCX', '#60A5FA')}
${badge(306, 'Q3 EARNINGS', '#34D399')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 18, 2026 · Q3 Earnings Preview</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="#fff" font-weight="900">Q3 EARN</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="68" fill="url(#heroG)" font-weight="900">PREVIEW</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">SPCX Oct 20 · TSLA Oct 21 · Key Metrics</text>
<rect x="54" y="380" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#34D399" font-weight="900">TSLA Consensus vs. Target</text>
${hbar(54, 442, 'Vehicle Mgn Q2', 15.2, 22, BW, 28, '#8B949E', '%')}
${hbar(54, 482, 'Target Q3', 16.2, 22, BW, 28, '#34D399', '%')}
${hbar(54, 522, 'China Sept Retail', 64837, 70000, BW, 28, '#60A5FA', '')}
${hbar(54, 562, 'Energy GWh', 13.7, 18, BW, 28, '#FBBF24', ' GWh')}
<rect x="740" y="562" width="122" height="28" rx="6" fill="#0D2A1A" stroke="#34D399" stroke-width="1.5"/>
<text x="801" y="581" font-family="Arial Black,Arial,sans-serif" font-size="17" fill="#34D399" text-anchor="middle" font-weight="900">Qtrly Record</text>
${stat(54,  614, 306, 'SPCX Earnings', 'Oct 20', 'Starlink ARPU · DIC', '#60A5FA')}
${stat(384, 614, 306, 'TSLA Earnings', 'Oct 21', 'Margins · FSD conv.', '#EF4444')}
${stat(714, 614, 312, 'FSD Target', '20%+', 'Paid conversion rate', '#34D399')}
<rect x="54" y="772" width="${W-108}" height="462" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="818" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Checklist</text>
<line x1="82" y1="832" x2="${W-82}" y2="832" stroke="#30363D" stroke-width="1"/>
${bullet(82, 846, 'SPCX 10/20: DIC contract count + ARPU improvement disclosed → upgrade trigger', '#60A5FA')}
${bullet(82, 908, 'TSLA 10/21: Vehicle margin 15.8–16.2% target — incentive cost is the wildcard', '#EF4444')}
${bullet(82, 970, 'Apollo $840M Megapack recognition timing → potential Q3 energy revenue beat', '#FBBF24')}
${bullet(82, 1032, 'FSD conversion 20%+ → recurring revenue model formalized → valuation re-rate', '#34D399')}
${bullet(82, 1094, 'Official Cybercab unit economics on the call → robotaxi multiple expansion', '#8B5CF6')}
${footer('2026.10.18')}
</svg>`;
  await save('tsla-spcx-q3-preview-20261018-en', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Meta Muse Spark — KO
// ─────────────────────────────────────────────────────────────────────────────
async function metaKo() {
  const BW = 460;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#6366F1', '#A78BFA')}
${badge(54,  'META', '#6366F1')}
${badge(180, 'MUSE SPARK', '#A78BFA')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.18 · 메타 Muse Spark Open 공개</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#fff" font-weight="900">META</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="74" fill="url(#heroG)" font-weight="900">816B 오픈</text>
<text x="54" y="358" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">42B 활성 · 1M 컨텍스트 · Mac Studio 2대</text>
<rect x="54" y="382" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="426" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#A78BFA" font-weight="900">모델 스펙 비교</text>
${hbar(54, 444, '총 파라미터', 816, 900, BW, 28, '#A78BFA', 'B')}
${hbar(54, 484, '활성 파라미터', 42, 900, BW, 28, '#6366F1', 'B')}
${hbar(54, 524, '컨텍스트', 1000, 1000, BW, 28, '#34D399', 'K tok')}
${hbar(54, 564, '소비전력', 2, 4, BW, 28, '#F59E0B', 'Mac St.')}
<rect x="740" y="444" width="296" height="40" rx="8" fill="#1A1A2E" stroke="#A78BFA" stroke-width="1.5"/>
<text x="888" y="470" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="#A78BFA" text-anchor="middle" font-weight="900">오픈 웨이트 공개</text>
${stat(54,  612, 306, '성능 수준', 'GPT-5급', '오픈 웨이트 최초', '#6366F1')}
${stat(384, 612, 306, '구동 환경', 'Mac×2', '일반 하드웨어 가능', '#A78BFA')}
${stat(714, 612, 312, '컨텍스트', '1M', '토큰 업계 최대', '#34D399')}
<rect x="54" y="770" width="${W-108}" height="462" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="816" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">전략 포인트</text>
<line x1="82" y1="830" x2="${W-82}" y2="830" stroke="#30363D" stroke-width="1"/>
${bullet(82, 844, '오픈 웨이트 공개 = 폐쇄형 GPT-5·Claude 4와 성능 격차 사실상 소멸', '#6366F1')}
${bullet(82, 906, '메타 직접 수익 없음 — 광고 AI 고도화 + 개발자 생태계 락인이 진짜 목적', '#A78BFA')}
${bullet(82, 968, '오픈 웨이트 확산 = GPU 클라우드 수요 증가 → NVDA 간접 수혜 구조', '#34D399')}
${bullet(82, 1030, 'Llama 2 공개 후 메타 광고 ROAS 개선 선례 → 816B에도 동일 전략 적용', '#FBBF24')}
${bullet(82, 1092, '기업 자체 서버 운영 → AWS/GCP/Azure GPU 인스턴스 수요 구조적 증가', '#F59E0B')}
${footer('2026.10.18')}
</svg>`;
  await save('meta-muse-spark-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. Meta Muse Spark — EN
// ─────────────────────────────────────────────────────────────────────────────
async function metaEn() {
  const BW = 460;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#6366F1', '#A78BFA')}
${badge(54,  'META', '#6366F1')}
${badge(180, 'MUSE SPARK', '#A78BFA')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 18, 2026 · Meta Muse Spark Open Released</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#fff" font-weight="900">META</text>
<text x="54" y="300" font-family="Arial Black,Arial,sans-serif" font-size="68" fill="url(#heroG)" font-weight="900">816B OPEN</text>
<text x="54" y="358" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">42B active · 1M context · 2 Mac Studios</text>
<rect x="54" y="382" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="426" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#A78BFA" font-weight="900">Model Specs</text>
${hbar(54, 444, 'Total Params', 816, 900, BW, 28, '#A78BFA', 'B')}
${hbar(54, 484, 'Active Params', 42, 900, BW, 28, '#6366F1', 'B')}
${hbar(54, 524, 'Context Window', 1000, 1000, BW, 28, '#34D399', 'K tok')}
${hbar(54, 564, 'Run Hardware', 2, 4, BW, 28, '#F59E0B', 'Mac St.')}
<rect x="740" y="444" width="296" height="40" rx="8" fill="#1A1A2E" stroke="#A78BFA" stroke-width="1.5"/>
<text x="888" y="470" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="#A78BFA" text-anchor="middle" font-weight="900">Open Weights Released</text>
${stat(54,  612, 306, 'Performance', 'GPT-5 tier', 'First open-weight', '#6366F1')}
${stat(384, 612, 306, 'Hardware', 'Mac×2', 'Commodity compute', '#A78BFA')}
${stat(714, 612, 312, 'Context', '1M tok', 'Industry largest', '#34D399')}
<rect x="54" y="770" width="${W-108}" height="462" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="816" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Strategy Points</text>
<line x1="82" y1="830" x2="${W-82}" y2="830" stroke="#30363D" stroke-width="1"/>
${bullet(82, 844, 'Open weights close the performance gap with GPT-5 and Claude 4 — now structural', '#6366F1')}
${bullet(82, 906, 'No direct revenue — ad AI enhancement and developer ecosystem lock-in is the real goal', '#A78BFA')}
${bullet(82, 968, 'Open-weight proliferation = more GPU cloud demand → indirect NVDA tailwind', '#34D399')}
${bullet(82, 1030, 'Llama 2 open release drove Meta ad ROAS improvement — same playbook at 816B scale', '#FBBF24')}
${bullet(82, 1092, 'Enterprise self-hosting → structural AWS/GCP/Azure GPU instance demand increase', '#F59E0B')}
${footer('2026.10.18')}
</svg>`;
  await save('meta-muse-spark-20261018-en', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. Apple iPhone Duo — KO
// ─────────────────────────────────────────────────────────────────────────────
async function aaplKo() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#6366F1', '#34D399')}
${badge(54,  'AAPL', '#6366F1')}
${badge(180, 'IPHONE DUO', '#34D399')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.18 · 애플 iPhone Duo 완판</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#fff" font-weight="900">AAPL</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="url(#heroG)" font-weight="900">DUO 완판</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">$1,999~ · 2027년 1월 배송 · 접이식 최초</text>
<rect x="54" y="380" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#34D399" font-weight="900">브랜드 프리미엄 확인</text>
${stat(54,  442, 306, '시작 가격', '$1,999', '아이폰 역대 최고가', '#6366F1')}
${stat(384, 442, 306, '경쟁사 대비', '+$400+', '갤럭시 Z폴드 대비', '#34D399')}
${stat(714, 442, 312, '배송 시작', 'Jan 2027', '3개월 대기', '#F59E0B')}
<rect x="54" y="606" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="650" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">실적 영향 구조</text>
<rect x="54" y="670" width="${W-108}" height="60" rx="12" fill="#1A1A2E" stroke="#34D399" stroke-width="1.5"/>
<text x="${W/2}" y="707" font-family="Arial Black,Arial,sans-serif" font-size="21" fill="#34D399" text-anchor="middle" font-weight="900">Jan 배송 → FY2027 Q1에 집중 인식 → Q1 기대치 상향 구조</text>
<rect x="54" y="758" width="${W-108}" height="476" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="804" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">투자 포인트</text>
<line x1="82" y1="818" x2="${W-82}" y2="818" stroke="#30363D" stroke-width="1"/>
${bullet(82, 832, '2,000달러 장벽 돌파 완판 = 애플 브랜드 프리미엄 400달러+ 실증', '#6366F1')}
${bullet(82, 894, '완판 = 공급 &lt; 수요 → Q1 FY2027 출고량 집중 → EPS 가시성 상승', '#34D399')}
${bullet(82, 956, 'ASP 상승 → 앱스토어·애플케어·iCloud ARPU 구조적 동반 상승', '#F59E0B')}
${bullet(82, 1018, '폴더블 시장 애플 진입 = 삼성 갤럭시 Z폴드 점유율 직접 경쟁 국면', '#EF4444')}
${bullet(82, 1080, 'Q4 FY2026 실적에는 미반영 — Jan 인식 구조로 내년 Q1이 서프라이즈 구간', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('aapl-iphone-duo-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. Apple iPhone Duo — EN
// ─────────────────────────────────────────────────────────────────────────────
async function aaplEn() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#6366F1', '#34D399')}
${badge(54,  'AAPL', '#6366F1')}
${badge(180, 'IPHONE DUO', '#34D399')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 18, 2026 · Apple iPhone Duo Sold Out</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#fff" font-weight="900">AAPL</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="url(#heroG)" font-weight="900">SOLD OUT</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">From $1,999 · Jan 2027 delivery · First foldable iPhone</text>
<rect x="54" y="380" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#34D399" font-weight="900">Brand Premium Confirmed</text>
${stat(54,  442, 306, 'Starting Price', '$1,999', 'Most expensive iPhone ever', '#6366F1')}
${stat(384, 442, 306, 'vs. Samsung', '+$400+', 'vs Galaxy Z Fold', '#34D399')}
${stat(714, 442, 312, 'Ships', 'Jan 2027', '3-month wait', '#F59E0B')}
<rect x="54" y="606" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="650" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#FBBF24" font-weight="900">Earnings Impact Structure</text>
<rect x="54" y="670" width="${W-108}" height="60" rx="12" fill="#1A1A2E" stroke="#34D399" stroke-width="1.5"/>
<text x="${W/2}" y="707" font-family="Arial Black,Arial,sans-serif" font-size="21" fill="#34D399" text-anchor="middle" font-weight="900">Jan delivery → FY2027 Q1 recognition → Q1 earnings beat setup</text>
<rect x="54" y="758" width="${W-108}" height="476" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="804" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Investment Takeaways</text>
<line x1="82" y1="818" x2="${W-82}" y2="818" stroke="#30363D" stroke-width="1"/>
${bullet(82, 832, 'Selling out above $2,000 confirms $400+ Apple brand premium vs. foldable rivals', '#6366F1')}
${bullet(82, 894, 'Sold out = supply &lt; demand → concentrated Q1 FY2027 shipments → EPS visibility', '#34D399')}
${bullet(82, 956, 'Higher ASP → structural co-rise in App Store, AppleCare &amp; iCloud ARPU', '#F59E0B')}
${bullet(82, 1018, 'Apple enters foldable market → direct share competition with Galaxy Z Fold', '#EF4444')}
${bullet(82, 1080, 'No Q4 FY2026 impact — Jan recognition means Q1 FY2027 is the earnings surprise qtr', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('aapl-iphone-duo-20261018-en', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. NVDA/AMD — KO
// ─────────────────────────────────────────────────────────────────────────────
async function nvdaKo() {
  const BW = 480;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#76C442', '#F59E0B')}
${badge(54,  'NVDA', '#76C442')}
${badge(180, 'AMD', '#F59E0B')}
${badge(306, 'AI반도체', '#60A5FA')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.18 · NVDA -1.84% · AMD 예측 하향</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#fff" font-weight="900">NVDA</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="url(#heroG)" font-weight="900">-1.84%</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">AMD AI GPU 예측 75% 하향 · CoWoS 병목 분석</text>
<rect x="54" y="380" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#76C442" font-weight="900">AI GPU 시장 점유율 구조</text>
${hbar(54, 442, 'NVDA AI GPU', 90, 100, BW, 28, '#76C442', '%')}
${hbar(54, 482, 'AMD AI GPU', 5, 100, BW, 28, '#F59E0B', '%')}
${hbar(54, 522, '기타', 5, 100, BW, 28, '#8B949E', '%')}
${hbar(54, 562, 'AMD 예측 하향', 75, 100, BW, 28, '#EF4444', '%')}
<rect x="740" y="442" width="296" height="40" rx="8" fill="#0D1A0D" stroke="#76C442" stroke-width="1.5"/>
<text x="888" y="468" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="#76C442" text-anchor="middle" font-weight="900">NVDA 비구분 가능</text>
${stat(54,  614, 306, 'NVDA H100', '$2.50/hr', 'Jevons 유지', '#76C442')}
${stat(384, 614, 306, 'AMD 점유율', '&lt;5%', 'NVDA 수요 반영 안됨', '#F59E0B')}
${stat(714, 614, 312, 'CoWoS', 'NVDA 우선', 'AMD 배분 축소 가설', '#60A5FA')}
<rect x="54" y="772" width="${W-108}" height="462" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="818" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">NVDA 하락 해석</text>
<line x1="82" y1="832" x2="${W-82}" y2="832" stroke="#30363D" stroke-width="1"/>
${bullet(82, 846, 'AMD AI GPU 5% 미만 → AMD 하향이 NVDA 수요 반영 안함', '#76C442')}
${bullet(82, 908, 'TSMC CoWoS-L 패키징 → NVDA B200/H200 우선 배분 → AMD 축소 가설', '#F59E0B')}
${bullet(82, 970, '추론 이동 시나리오 → H200 추론 최적화 수요 증가 → NVDA 오히려 수혜', '#60A5FA')}
${bullet(82, 1032, 'a16z Jevons 역설: H100 $2.50/hr 강세 유지 — AI 수요 구조적 증가 실증', '#34D399')}
${bullet(82, 1094, 'NVDA -1.84% = 노이즈 판단 · Q4 실적(11월) 전 매수 구간 분류 적절', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('nvda-amd-20261018', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
// 12. NVDA/AMD — EN
// ─────────────────────────────────────────────────────────────────────────────
async function nvdaEn() {
  const BW = 480;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${topBar('#76C442', '#F59E0B')}
${badge(54,  'NVDA', '#76C442')}
${badge(180, 'AMD', '#F59E0B')}
${badge(306, 'AI CHIPS', '#60A5FA')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Oct 18, 2026 · NVDA -1.84% · AMD Forecast Cut</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#fff" font-weight="900">NVDA</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="url(#heroG)" font-weight="900">-1.84%</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">AMD AI GPU Forecast Cut 75% · CoWoS Bottleneck</text>
<rect x="54" y="380" width="${W-108}" height="3" fill="url(#divG)" rx="2"/>
<text x="54" y="424" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#76C442" font-weight="900">AI GPU Market Share Structure</text>
${hbar(54, 442, 'NVDA AI GPU', 90, 100, BW, 28, '#76C442', '%')}
${hbar(54, 482, 'AMD AI GPU', 5, 100, BW, 28, '#F59E0B', '%')}
${hbar(54, 522, 'Others', 5, 100, BW, 28, '#8B949E', '%')}
${hbar(54, 562, 'AMD Est Cut', 75, 100, BW, 28, '#EF4444', '%')}
<rect x="740" y="442" width="296" height="40" rx="8" fill="#0D1A0D" stroke="#76C442" stroke-width="1.5"/>
<text x="888" y="468" font-family="Arial Black,Arial,sans-serif" font-size="19" fill="#76C442" text-anchor="middle" font-weight="900">NVDA unaffected</text>
${stat(54,  614, 306, 'NVDA H100', '$2.50/hr', 'Jevons holds', '#76C442')}
${stat(384, 614, 306, 'AMD Share', '&lt;5%', "AMD ≠ NVDA proxy", '#F59E0B')}
${stat(714, 614, 312, 'CoWoS', 'NVDA First', 'AMD alloc cut theory', '#60A5FA')}
<rect x="54" y="772" width="${W-108}" height="462" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="818" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Reading the NVDA Drop</text>
<line x1="82" y1="832" x2="${W-82}" y2="832" stroke="#30363D" stroke-width="1"/>
${bullet(82, 846, 'AMD AI GPU market share &lt;5% → AMD estimate cut does NOT proxy NVDA demand', '#76C442')}
${bullet(82, 908, 'TSMC CoWoS-L allocation → NVDA B200/H200 gets priority → AMD volume cut', '#F59E0B')}
${bullet(82, 970, 'Inference shift scenario → H200 inference-optimized demand rises → NVDA net beneficiary', '#60A5FA')}
${bullet(82, 1032, 'a16z Jevons Paradox: H100 $2.50/hr holding while token prices fall — demand proven structural', '#34D399')}
${bullet(82, 1094, 'NVDA -1.84% = noise · Pre-Q4 earnings (Nov) entry window is the rational classification', '#FBBF24')}
${footer('2026.10.18')}
</svg>`;
  await save('nvda-amd-20261018-en', svg);
}

// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  await roadsterKo();
  await roadsterEn();
  await mergerKo();
  await mergerEn();
  await q3Ko();
  await q3En();
  await metaKo();
  await metaEn();
  await aaplKo();
  await aaplEn();
  await nvdaKo();
  await nvdaEn();
  console.log('\n✅ 개별 토픽 카드 12장 완료 (KO×6 + EN×6)');
}

main().catch(console.error);
