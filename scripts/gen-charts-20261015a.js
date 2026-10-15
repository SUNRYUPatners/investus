#!/usr/bin/env node
// SVG chart generator — 2026-10-15 batch (individual topic cards)
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
  const id = `gb${Math.random().toString(36).slice(2,6)}`;
  return `<defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient></defs>
<rect x="0" y="0" width="${W}" height="12" fill="url(#${id})"/>`;
}

function divider(y, c1, c2) {
  const id = `dg${y}`;
  return `<defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="${c1}" stop-opacity="0"/>
    <stop offset="30%" stop-color="${c1}"/>
    <stop offset="70%" stop-color="${c2}"/>
    <stop offset="100%" stop-color="${c2}" stop-opacity="0"/>
  </linearGradient></defs>
<rect x="54" y="${y}" width="${W-108}" height="3" fill="url(#${id})" rx="2"/>`;
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

  // ── 1. tsla-roadster-live-20261015 (KO) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, 'BREAKING', '#EF4444')}
${badge(194, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, '로드스터', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 테슬라 로드스터 공개 이벤트 오늘 저녁</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="#EF4444" font-weight="900">TODAY</text>
<text x="54" y="316" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#fff" font-weight="900">7:55 PM CT</text>
<text x="54" y="378" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">테슬라 X 계정 생중계 · 한국 시각 10월 16일 09:55</text>
${divider(404, '#EF4444', '#DC2626')}
<rect x="54" y="424" width="${W-108}" height="110" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="2"/>
<text x="82" y="465" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">머스크 발언: "흥분은 보장, 성공은 미보장"</text>
<text x="82" y="507" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">tesla.com 카운트다운 타이머 10월 14일 첫 공개</text>
${statCard(54, 558, 310, '이벤트 시각', '7:55PM', 'Central Time', '#EF4444')}
${statCard(388, 558, 310, '동부 시각', '8:55PM', 'Eastern Time', '#DC2626')}
${statCard(722, 558, 304, '한국 시각', '09:55', '10월 16일 오전', '#B91C1C')}
<rect x="54" y="718" width="${W-108}" height="480" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="762" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">로드스터 핵심 스펙 예고</text>
<line x1="82" y1="776" x2="${W-82}" y2="776" stroke="#30363D" stroke-width="1"/>
${bullet(82, 792, '0-60mph(0-97km/h) 1.9초 이하 — 기본형 목표', '#EF4444')}
${bullet(82, 852, 'SpaceX 쓰러스터 패키지 — 0-60mph 1초 이하 목표', '#DC2626')}
${bullet(82, 912, '세계에서 가장 빠른 양산형 전기 스포츠카 목표', '#B91C1C')}
${bullet(82, 972, '10월 21일 Q3 실적 발표 앞두고 이벤트 연속성 확인', '#EF4444')}
<rect x="82" y="1082" width="${W-164}" height="80" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1113" font-family="Arial,sans-serif" font-size="21" fill="#EF4444" font-weight="700">공개 성공 여부보다 사양·가격 발표가 주가 핵심 변수</text>
<text x="110" y="1148" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">발표 후 단기 변동성 유의 · 21일 실적 함께 주시</text>
${footer()}`);
    await save('tsla-roadster-live-20261015', svg);
  }

  // ── 2. tsla-roadster-live-20261015-en (EN) ───────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#DC2626')}
${badge(54, 30, 'BREAKING', '#EF4444')}
${badge(194, 30, 'TSLA', '#B91C1C')}
${badge(270, 30, 'Roadster', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · Tesla Roadster reveal event tonight</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="140" fill="#EF4444" font-weight="900">TODAY</text>
<text x="54" y="316" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#fff" font-weight="900">7:55 PM CT</text>
<text x="54" y="378" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">Live on Tesla X · 8:55PM ET · 5:55PM PT</text>
${divider(404, '#EF4444', '#DC2626')}
<rect x="54" y="424" width="${W-108}" height="110" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="2"/>
<text x="82" y="465" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Musk: "Excitement guaranteed. Success is not."</text>
<text x="82" y="507" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">tesla.com countdown timer appeared Oct 14</text>
${statCard(54, 558, 310, 'Event Time', '7:55PM', 'Central Time', '#EF4444')}
${statCard(388, 558, 310, 'Eastern', '8:55PM', 'Eastern Time', '#DC2626')}
${statCard(722, 558, 304, 'Korea', '09:55', 'Oct 16 morning', '#B91C1C')}
<rect x="54" y="718" width="${W-108}" height="480" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="762" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">Expected Specs</text>
<line x1="82" y1="776" x2="${W-82}" y2="776" stroke="#30363D" stroke-width="1"/>
${bullet(82, 792, '0-60mph sub-1.9s base model target', '#EF4444')}
${bullet(82, 852, 'SpaceX thruster package — sub-1 second 0-60 goal', '#DC2626')}
${bullet(82, 912, 'World\'s fastest production electric sports car target', '#B91C1C')}
${bullet(82, 972, 'Q3 earnings Oct 21 — back-to-back momentum events', '#EF4444')}
<rect x="82" y="1082" width="${W-164}" height="80" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1113" font-family="Arial,sans-serif" font-size="21" fill="#EF4444" font-weight="700">Key watch: announced specs &amp; price vs. prior promises</text>
<text x="110" y="1148" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Short-term volatility likely · Q3 earnings Oct 21</text>
${footer()}`);
    await save('tsla-roadster-live-20261015-en', svg);
  }

  // ── 3. xai-grok-voice30-20261015 (KO) ───────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#1D4ED8')}
${badge(54, 30, '종목분석', '#3B82F6')}
${badge(190, 30, 'TSLA', '#1D4ED8')}
${badge(266, 30, 'xAI', '#2563EB')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · xAI Grok Voice 3.0 공식 출시</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#3B82F6" font-weight="900">$0.08</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">분당 API 가격</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">음성 에이전트 앱 탑재 · "세계 최고 TTS 모델"</text>
${divider(378, '#3B82F6', '#1D4ED8')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#0D1F3A" stroke="#3B82F6" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">테슬라 차량에서 하루 수백만 건 대화 처리</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">스타링크 고객 2만 건/일 — 70% 사람 없이 자동 해결</text>
${statCard(54, 534, 310, '스타링크 통화', '2만건', '하루 처리량', '#3B82F6')}
${statCard(388, 534, 310, '자동 해결율', '70%', '사람 개입 불필요', '#1D4ED8')}
${statCard(722, 534, 304, '구매 전환율', '1/4건', '영업통화 성과', '#2563EB')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">Grok Voice 3.0 핵심 기능</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'Connectors — 달력·이메일 등 단순 업무 핸즈프리 처리', '#3B82F6')}
${bullet(82, 828, 'Grok Bot — 커피 주문·저녁 예약 등 복잡한 멀티스텝', '#1D4ED8')}
${bullet(82, 888, '단일 에이전트: 고객 확인→문제 해결→크레딧→배송', '#2563EB')}
${bullet(82, 948, 'xAI 외부 API — 개발자 생태계 수익 모델 공식화', '#3B82F6')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#0D1F3A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" font-weight="700">테슬라·스타링크 실사용 검증된 AI 음성 인프라</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">xAI 외부 API 판매 = 새로운 수익 스트림 개막</text>
${footer()}`);
    await save('xai-grok-voice30-20261015', svg);
  }

  // ── 4. xai-grok-voice30-20261015-en (EN) ────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#1D4ED8')}
${badge(54, 30, 'Stock Analysis', '#3B82F6')}
${badge(254, 30, 'TSLA', '#1D4ED8')}
${badge(330, 30, 'xAI', '#2563EB')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · xAI Grok Voice 3.0 official launch</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#3B82F6" font-weight="900">$0.08</text>
<text x="54" y="296" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">per minute API</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Voice agent apps · "World's most impressive TTS"</text>
${divider(378, '#3B82F6', '#1D4ED8')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#0D1F3A" stroke="#3B82F6" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Handles millions of Tesla in-car convos per day</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Starlink: 20k customer calls/day — 70% resolved hands-free</text>
${statCard(54, 534, 310, 'Starlink Calls', '20k/day', 'daily volume', '#3B82F6')}
${statCard(388, 534, 310, 'Auto-Resolve', '70%', 'no human needed', '#1D4ED8')}
${statCard(722, 534, 304, 'Sales Convert', '1 in 4', 'purchase before hangup', '#2563EB')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">Key Capabilities</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'Connectors — calendar, email, simple tasks fully hands-free', '#3B82F6')}
${bullet(82, 828, 'Grok Bot — order coffee, book dinner, complex multi-step', '#1D4ED8')}
${bullet(82, 888, 'Single agent: verify → troubleshoot → credit → ship', '#2563EB')}
${bullet(82, 948, 'External API now open — new revenue stream for xAI', '#3B82F6')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#0D1F3A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" font-weight="700">Battle-tested at scale inside Tesla &amp; Starlink</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">xAI external API = formal monetization begins</text>
${footer()}`);
    await save('xai-grok-voice30-20261015-en', svg);
  }

  // ── 5. tsla-cybercab-fleet-20261015 (KO) ────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#059669')}
${badge(54, 30, '종목분석', '#10B981')}
${badge(190, 30, 'TSLA', '#059669')}
${badge(266, 30, '사이버캡', '#047857')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 오스틴 자율주행 플릿 현황</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="#10B981" font-weight="900">399</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">총 플릿 대수</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Model Y 224대 + Cybercab 175대 · 오스틴 배치</text>
${divider(378, '#10B981', '#059669')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#052e1c" stroke="#10B981" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">화요일 무인 주행 490회 — 지난주 대비 18% 증가</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">최근 30일 라이드의 ~90%가 사이버캡으로 확인</text>
${statCard(54, 534, 310, '무인 주행', '490회', '화요일 목격', '#10B981')}
${statCard(388, 534, 310, '전체 목격', '757회', '10월 13일 기준', '#059669')}
${statCard(722, 534, 304, '주간 증가', '+18%', '전주 418회 대비', '#047857')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">플릿 성장 분석</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'Model Y 224대: 6월 22일 이후 점진적 증가', '#10B981')}
${bullet(82, 828, 'Cybercab 175대: 최근 급격한 플릿 확대 주도', '#059669')}
${bullet(82, 888, '무인 비율 72% — 월요일 54%에서 빠른 회복', '#047857')}
${bullet(82, 948, '사이버캡 30일 목격 252→397 (+58%) 폭발적 증가', '#10B981')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#052e1c" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#10B981" font-weight="700">오스틴 다음 = 다른 도시 확장 시점이 핵심 모멘텀</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">로보택시 기술 타당성 실증 완료 · 스케일업 단계 진입</text>
${footer()}`);
    await save('tsla-cybercab-fleet-20261015', svg);
  }

  // ── 6. tsla-cybercab-fleet-20261015-en (EN) ─────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#059669')}
${badge(54, 30, 'Stock Analysis', '#10B981')}
${badge(254, 30, 'TSLA', '#059669')}
${badge(330, 30, 'Cybercab', '#047857')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · Austin autonomous fleet update</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="#10B981" font-weight="900">399</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">total fleet size</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Model Y 224 + Cybercab 175 · deployed in Austin TX</text>
${divider(378, '#10B981', '#059669')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#052e1c" stroke="#10B981" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">490 driverless sightings Tuesday — up 18% week-over-week</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">~90% of recent 30-day rides were Cybercab</text>
${statCard(54, 534, 310, 'Driverless', '490', 'Tuesday sightings', '#10B981')}
${statCard(388, 534, 310, 'Total', '757', 'Oct 13 count', '#059669')}
${statCard(722, 534, 304, 'WoW Growth', '+18%', 'vs 418 prior week', '#047857')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">Fleet Growth Breakdown</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'Model Y 224: steady growth since Jun 22 launch', '#10B981')}
${bullet(82, 828, 'Cybercab 175: driving most recent fleet expansion', '#059669')}
${bullet(82, 888, 'Driverless share 72% Tue vs 54% Mon — fast recovery', '#047857')}
${bullet(82, 948, 'Cybercab sightings 30d: 252 → 397 (+58%) surge', '#10B981')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#052e1c" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#10B981" font-weight="700">Next catalyst: multi-city expansion announcement</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Robotaxi viability proven · scaling phase has begun</text>
${footer()}`);
    await save('tsla-cybercab-fleet-20261015-en', svg);
  }

  // ── 7. macro-cpi-sep-20261015 (KO) ──────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#F97316', '#EF4444')}
${badge(54, 30, '매크로', '#F97316')}
${badge(168, 30, 'CPI', '#EF4444')}
${badge(230, 30, '인플레이션', '#DC2626')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 미국 9월 소비자물가지수 발표</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="#EF4444" font-weight="900">3.7%</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">전년 대비 CPI</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">예상 3.6% 상회 · 2023년 이후 최고치</text>
${divider(378, '#F97316', '#EF4444')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#1c0a00" stroke="#EF4444" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">파월 의장: "현재 물가 수준은 용납할 수 없다"</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">이란 전쟁 → 유가 급등 → 휘발유 9.1% 상승이 주원인</text>
${statCard(54, 534, 310, '헤드라인 CPI', '3.7%', '예상 3.6% 상회', '#EF4444')}
${statCard(388, 534, 310, '코어 CPI', '2.6%', '예상 2.5% 상회', '#F97316')}
${statCard(722, 534, 304, '월간 CPI', '+0.6%', '8월 대비', '#DC2626')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F97316" font-weight="900">인플레이션 세부 항목</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, '휘발유 +9.1% — 9월 CPI 상승의 절반 이상 기여', '#EF4444')}
${bullet(82, 828, '에너지 전체 월간 +5.2% · 주거비 +0.4%', '#F97316')}
${bullet(82, 888, '코어 물가(음식·에너지 제외) +2.6% — 예상 상회', '#DC2626')}
${bullet(82, 948, '금리 조기 인하 기대 약화 · 연준 동결 가능성↑', '#EF4444')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#1c0a00" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">공급 쇼크(유가) → 금리 올려도 원인 통제 불가 딜레마</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">이란 분쟁 추이 + 연준 다음 액션 동시 주시 필요</text>
${footer()}`);
    await save('macro-cpi-sep-20261015', svg);
  }

  // ── 8. macro-cpi-sep-20261015-en (EN) ───────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#F97316', '#EF4444')}
${badge(54, 30, 'Macro', '#F97316')}
${badge(152, 30, 'CPI', '#EF4444')}
${badge(214, 30, 'Inflation', '#DC2626')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · US September Consumer Price Index</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="#EF4444" font-weight="900">3.7%</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">YoY CPI</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Beat 3.6% estimate · Highest since 2023</text>
${divider(378, '#F97316', '#EF4444')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#1c0a00" stroke="#EF4444" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Powell: "Current inflation levels are unacceptable"</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Iran war → oil spike → gasoline +9.1% is primary driver</text>
${statCard(54, 534, 310, 'Headline CPI', '3.7%', 'beat 3.6% est', '#EF4444')}
${statCard(388, 534, 310, 'Core CPI', '2.6%', 'beat 2.5% est', '#F97316')}
${statCard(722, 534, 304, 'Monthly CPI', '+0.6%', 'vs August', '#DC2626')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#F97316" font-weight="900">Inflation Breakdown</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'Gasoline +9.1% — over half of monthly CPI increase', '#EF4444')}
${bullet(82, 828, 'Energy overall +5.2% monthly · Shelter +0.4%', '#F97316')}
${bullet(82, 888, 'Core CPI +2.6% — food &amp; energy stripped, still hot', '#DC2626')}
${bullet(82, 948, 'Rate cut hopes fade · Fed pause or hike more likely', '#EF4444')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#1c0a00" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">Supply shock (oil) — rate hikes can't fix the root cause</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Watch: Iran conflict + Fed next move simultaneously</text>
${footer()}`);
    await save('macro-cpi-sep-20261015-en', svg);
  }

  // ── 9. spcx-ms300-20261015 (KO) ─────────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#8B5CF6', '#7C3AED')}
${badge(54, 30, '종목분석', '#8B5CF6')}
${badge(190, 30, 'SPCX', '#7C3AED')}
${badge(272, 30, '모건스탠리', '#6D28D9')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 모건스탠리 SPCX 목표주가 재확인</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="#8B5CF6" font-weight="900">$300</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">목표주가 (강력 매수)</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">현재가 ~$152 대비 약 2배 · 아담 존스 애널리스트</text>
${divider(378, '#8B5CF6', '#7C3AED')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#1a0a3d" stroke="#8B5CF6" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">핵심 성장 동력: 분산 추론 클라우드 (DIC)</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">스타링크 망을 AI 에이전트 연산 공유 플랫폼으로 진화</text>
${statCard(54, 534, 310, '목표주가', '$300', '강력 매수', '#8B5CF6')}
${statCard(388, 534, 310, '현재주가', '~$152', '업사이드 97%', '#7C3AED')}
${statCard(722, 534, 304, 'ROIC 2030E', '~25%', 'AWS 16% 상회', '#6D28D9')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#8B5CF6" font-weight="900">DIC (분산 추론 클라우드) 이해하기</text>
<line x1="82" y1="752" x2="${W-82}" y2="776" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'DIC = 스타링크 위성망이 AI 추론 연산을 분산 처리', '#8B5CF6')}
${bullet(82, 828, '지구 어디서나 저지연 AI 접근 — 기존 클라우드 대체', '#7C3AED')}
${bullet(82, 888, 'SpaceX ROIC 2026E → 2030E: -5% → +25% 급상승 궤도', '#6D28D9')}
${bullet(82, 948, '머스크 X 답변: "This is a very big deal"', '#8B5CF6')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#1a0a3d" stroke="#8B5CF6" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#8B5CF6" font-weight="700">AWS·GCP 대비 ROIC 역전 예상 — 우주 규모 경제 실현</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">DIC = SpaceX 다음 10년의 핵심 밸류에이션 드라이버</text>
${footer()}`);
    await save('spcx-ms300-20261015', svg);
  }

  // ── 10. spcx-ms300-20261015-en (EN) ─────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#8B5CF6', '#7C3AED')}
${badge(54, 30, 'Stock Analysis', '#8B5CF6')}
${badge(254, 30, 'SPCX', '#7C3AED')}
${badge(336, 30, 'Morgan Stanley', '#6D28D9')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · Morgan Stanley reiterates SPCX target</text>
<text x="54" y="220" font-family="Arial Black,Arial,sans-serif" font-size="160" fill="#8B5CF6" font-weight="900">$300</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Price Target · Strong Buy</text>
<text x="54" y="354" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">vs ~$152 current · 97% upside · Adam Jones</text>
${divider(378, '#8B5CF6', '#7C3AED')}
<rect x="54" y="400" width="${W-108}" height="110" rx="16" fill="#1a0a3d" stroke="#8B5CF6" stroke-width="2"/>
<text x="82" y="441" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Top Growth Driver: Distributed Inference Cloud (DIC)</text>
<text x="82" y="483" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Starlink network evolves into AI agent compute-sharing platform</text>
${statCard(54, 534, 310, 'Price Target', '$300', 'Strong Buy', '#8B5CF6')}
${statCard(388, 534, 310, 'Current', '~$152', '97% upside', '#7C3AED')}
${statCard(722, 534, 304, 'ROIC 2030E', '~25%', 'beats AWS 16%', '#6D28D9')}
<rect x="54" y="694" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="738" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#8B5CF6" font-weight="900">Understanding DIC</text>
<line x1="82" y1="752" x2="${W-82}" y2="752" stroke="#30363D" stroke-width="1"/>
${bullet(82, 768, 'DIC = Starlink satellites as distributed AI inference nodes', '#8B5CF6')}
${bullet(82, 828, 'Any device, anywhere — low-latency AI access via orbit', '#7C3AED')}
${bullet(82, 888, 'SpaceX AI ROIC: -5% (2026E) → +25% (2030E) trajectory', '#6D28D9')}
${bullet(82, 948, 'Musk on X replied: "This is a very big deal"', '#8B5CF6')}
<rect x="82" y="1058" width="${W-164}" height="90" rx="12" fill="#1a0a3d" stroke="#8B5CF6" stroke-width="1.5"/>
<text x="110" y="1092" font-family="Arial,sans-serif" font-size="20" fill="#8B5CF6" font-weight="700">ROIC reversal vs AWS &amp; GCP by 2030 — space-scale economics</text>
<text x="110" y="1130" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">DIC = the core valuation driver for SpaceX next decade</text>
${footer()}`);
    await save('spcx-ms300-20261015-en', svg);
  }

  // ── 11. tsla-optimus-xinjian-20261015 (KO) ──────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#6366F1')}
${badge(54, 30, '종목분석', '#3B82F6')}
${badge(190, 30, 'TSLA', '#1D4ED8')}
${badge(266, 30, '옵티머스', '#4338CA')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 신젠트 트랜스미션 선전거래소 IPO 신청</text>
<text x="54" y="196" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#3B82F6" font-weight="900">IPO 신청</text>
<text x="54" y="290" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">행성 롤러 스크류</text>
<text x="54" y="350" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">옵티머스 V3 핵심 부품 · 선전거래소 · 2026년 말 목표</text>
${divider(374, '#3B82F6', '#6366F1')}
<rect x="54" y="396" width="${W-108}" height="110" rx="16" fill="#0D1F3A" stroke="#3B82F6" stroke-width="2"/>
<text x="82" y="437" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">테슬라 옵티머스 V3 T1 공급사 — 사실상 유일 공급처</text>
<text x="82" y="479" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">기존 사다리꼴 스크류 대비 고토크·고밀도·경량화 실현</text>
${statCard(54, 530, 466, '생산 목표', '100만개/년', '연간 생산 역량', '#3B82F6')}
${statCard(544, 530, 482, '상장 목표', '2026년 말', '선전거래소', '#6366F1')}
<rect x="54" y="690" width="${W-108}" height="510" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="734" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">행성 롤러 스크류 기술 이해</text>
<line x1="82" y1="748" x2="${W-82}" y2="748" stroke="#30363D" stroke-width="1"/>
${bullet(82, 764, '볼 스크류보다 힘 밀도 훨씬 높음 — 로봇 관절 필수', '#3B82F6')}
${bullet(82, 824, '소형·경량이면서 고부하 견딤 — 고관절·무릎 관절 사용', '#6366F1')}
${bullet(82, 884, '옵티머스 1대에 다수 유닛 필요 → 대량생산 시 수요 폭증', '#4338CA')}
${bullet(82, 944, '옵티머스 공급망 IPO 흐름 = 휴머노이드 산업 급성장 신호', '#3B82F6')}
<rect x="82" y="1054" width="${W-164}" height="100" rx="12" fill="#0D1F3A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1088" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" font-weight="700">옵티머스 수천→수만 대 확대 시 신젠트 수요 수직 상승</text>
<text x="110" y="1126" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">IPO 완료 시 공급망 밸류에이션 공개 기준점 형성</text>
${footer()}`);
    await save('tsla-optimus-xinjian-20261015', svg);
  }

  // ── 12. tsla-optimus-xinjian-20261015-en (EN) ───────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#6366F1')}
${badge(54, 30, 'Stock Analysis', '#3B82F6')}
${badge(254, 30, 'TSLA', '#1D4ED8')}
${badge(330, 30, 'Optimus', '#4338CA')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · Xinjian Transmission Shenzhen IPO filing</text>
<text x="54" y="196" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#3B82F6" font-weight="900">IPO Filing</text>
<text x="54" y="290" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Planetary Roller Screw</text>
<text x="54" y="350" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Optimus V3 Tier-1 · Shenzhen Exchange · end-2026 target</text>
${divider(374, '#3B82F6', '#6366F1')}
<rect x="54" y="396" width="${W-108}" height="110" rx="16" fill="#0D1F3A" stroke="#3B82F6" stroke-width="2"/>
<text x="82" y="437" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Tesla Optimus V3 T1 supplier — sole viable source</text>
<text x="82" y="479" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Higher torque density than ball screws · light &amp; compact</text>
${statCard(54, 530, 466, 'Production Target', '1M units/yr', 'annual capacity goal', '#3B82F6')}
${statCard(544, 530, 482, 'Listing Target', 'End 2026', 'Shenzhen Exchange', '#6366F1')}
<rect x="54" y="690" width="${W-108}" height="510" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="734" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">Planetary Roller Screw Explained</text>
<line x1="82" y1="748" x2="${W-82}" y2="748" stroke="#30363D" stroke-width="1"/>
${bullet(82, 764, 'Far higher force density than ball screws — robot joints need it', '#3B82F6')}
${bullet(82, 824, 'Small, light, handles high loads — hip &amp; knee actuators', '#6366F1')}
${bullet(82, 884, 'Multiple units per Optimus → demand scales with production', '#4338CA')}
${bullet(82, 944, 'Humanoid supply chain IPO wave = industry growth signal', '#3B82F6')}
<rect x="82" y="1054" width="${W-164}" height="100" rx="12" fill="#0D1F3A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1088" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" font-weight="700">Xinjian demand skyrockets as Optimus scales to 10k+ units</text>
<text x="110" y="1126" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">IPO completion = public valuation anchor for supply chain</text>
${footer()}`);
    await save('tsla-optimus-xinjian-20261015-en', svg);
  }

  // ── 13. tsla-model-y-japan-20261015 (KO) ────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#0EA5E9')}
${badge(54, 30, '종목분석', '#10B981')}
${badge(190, 30, 'TSLA', '#059669')}
${badge(266, 30, '일본', '#0EA5E9')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 2026년 9월 일본 외국차 판매 순위</text>
<text x="540" y="240" font-family="Arial Black,Arial,sans-serif" font-size="220" fill="#10B981" font-weight="900" text-anchor="middle">No.1</text>
<text x="54" y="316" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">외국차 차종별 1위</text>
<text x="54" y="374" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">테슬라 모델 Y · 2026년 9월 도 · 테슬라 재팬 공식 발표</text>
${divider(398, '#10B981', '#0EA5E9')}
<rect x="54" y="420" width="${W-108}" height="110" rx="16" fill="#052e1c" stroke="#10B981" stroke-width="2"/>
<text x="82" y="461" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">독일 프리미엄 브랜드 제치고 외국차 베스트셀러 달성</text>
<text x="82" y="503" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">일본 자국 브랜드 90% 시장에서 수입 전기차가 1위 달성</text>
<rect x="54" y="560" width="${W-108}" height="560" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="604" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">의미 분석</text>
<line x1="82" y1="618" x2="${W-82}" y2="618" stroke="#30363D" stroke-width="1"/>
${bullet(82, 634, '일본: 도요타·혼다·닛산이 전체 판매의 90% 이상 차지', '#10B981')}
${bullet(82, 694, '외국차 1위 = 벤츠·BMW 꺾은 것 — 브랜드 프리미엄 확인', '#059669')}
${bullet(82, 754, '일본 2035년 신차 100% 전기차·하이브리드 목표 추진 중', '#0EA5E9')}
${bullet(82, 814, '테슬라 재팬 슈퍼차저·딜리버리센터 지속 확대 중', '#10B981')}
${bullet(82, 874, '볼륨보다 상징성 — 전동화 리더십 글로벌 재확인', '#059669')}
<rect x="82" y="994" width="${W-164}" height="90" rx="12" fill="#052e1c" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1028" font-family="Arial,sans-serif" font-size="21" fill="#10B981" font-weight="700">판매 대수보다 브랜드 지위 — 프리미엄 이미지 재확인</text>
<text x="110" y="1066" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">일본 전동화 수요 확대 → 테슬라 점유율 추가 상승 기대</text>
${footer()}`);
    await save('tsla-model-y-japan-20261015', svg);
  }

  // ── 14. tsla-model-y-japan-20261015-en (EN) ─────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#10B981', '#0EA5E9')}
${badge(54, 30, 'Stock Analysis', '#10B981')}
${badge(254, 30, 'TSLA', '#059669')}
${badge(330, 30, 'Japan', '#0EA5E9')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · Japan Sept 2026 foreign car sales ranking</text>
<text x="540" y="240" font-family="Arial Black,Arial,sans-serif" font-size="220" fill="#10B981" font-weight="900" text-anchor="middle">No.1</text>
<text x="54" y="316" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">Foreign Car #1</text>
<text x="54" y="374" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Tesla Model Y · Sept 2026 · Official Tesla Japan announcement</text>
${divider(398, '#10B981', '#0EA5E9')}
<rect x="54" y="420" width="${W-108}" height="110" rx="16" fill="#052e1c" stroke="#10B981" stroke-width="2"/>
<text x="82" y="461" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Beat German premium brands to claim top import position</text>
<text x="82" y="503" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">In a market where domestic brands hold 90%+ share</text>
<rect x="54" y="560" width="${W-108}" height="560" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="604" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">Why It Matters</text>
<line x1="82" y1="618" x2="${W-82}" y2="618" stroke="#30363D" stroke-width="1"/>
${bullet(82, 634, 'Japan: Toyota/Honda/Nissan dominate 90%+ of total sales', '#10B981')}
${bullet(82, 694, 'Topping import list = beating Mercedes &amp; BMW — brand validated', '#059669')}
${bullet(82, 754, 'Japan targets 100% EV/hybrid new car sales by 2035', '#0EA5E9')}
${bullet(82, 814, 'Tesla Japan expanding Superchargers &amp; delivery centers', '#10B981')}
${bullet(82, 874, 'Symbolic milestone — global EV leadership reaffirmed', '#059669')}
<rect x="82" y="994" width="${W-164}" height="90" rx="12" fill="#052e1c" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1028" font-family="Arial,sans-serif" font-size="21" fill="#10B981" font-weight="700">Prestige over volume — premium brand position confirmed</text>
<text x="110" y="1066" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Japan EV adoption growing → more market share ahead</text>
${footer()}`);
    await save('tsla-model-y-japan-20261015-en', svg);
  }

  // ── 15. tsla-china-nev4-20261015 (KO) ───────────────────────────────
  {
    const bw = 700;
    const svg = svgWrap(`
${gradBar('#10B981', '#DC2626')}
${badge(54, 30, '종목분석', '#10B981')}
${badge(190, 30, 'TSLA', '#059669')}
${badge(266, 30, '중국 NEV', '#DC2626')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 중국 2026년 9월 NEV 소매 점유율 (CPCA)</text>
<text x="54" y="218" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#10B981" font-weight="900">테슬라 차이나 4위 6.0%</text>
<text x="54" y="280" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">BYD 22.8% · Geely 11.0% · Leapmotor 7.2% · Tesla 6.0%</text>
${divider(304, '#10B981', '#DC2626')}
<text x="54" y="360" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B949E" font-weight="700">2026년 9월 중국 NEV 소매 순위</text>
<rect x="54" y="376" width="${bw}" height="44" rx="8" fill="#DC2626"/>
<text x="72" y="405" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">1. BYD — 22.8%</text>
<rect x="54" y="430" width="${Math.round(bw*11/22.8)}" height="44" rx="8" fill="#3B82F6"/>
<text x="72" y="459" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">2. Geely — 11.0%</text>
<rect x="54" y="484" width="${Math.round(bw*7.2/22.8)}" height="44" rx="8" fill="#8B5CF6"/>
<text x="72" y="513" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">3. Leapmotor — 7.2%</text>
<rect x="54" y="538" width="${Math.round(bw*6/22.8)}" height="44" rx="8" fill="#10B981"/>
<text x="72" y="567" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">4. Tesla China — 6.0% ★</text>
<rect x="54" y="592" width="${Math.round(bw*5.7/22.8)}" height="44" rx="8" fill="#F97316"/>
<text x="72" y="621" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">5. Changan — 5.7%</text>
<rect x="54" y="646" width="${Math.round(bw*5.1/22.8)}" height="44" rx="8" fill="#6B7280"/>
<text x="72" y="675" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">6. SAIC-GM-Wuling — 5.1%</text>
${divider(706, '#10B981', '#DC2626')}
<rect x="54" y="724" width="${W-108}" height="470" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="768" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">테슬라 차이나 분석</text>
<line x1="82" y1="782" x2="${W-82}" y2="782" stroke="#30363D" stroke-width="1"/>
${bullet(82, 798, 'Model 3·Y 라인업으로 6.0% — 절대 점유율 4위 유지', '#10B981')}
${bullet(82, 858, 'FSD 중국 출시 = 점유율 회복의 핵심 변수', '#059669')}
${bullet(82, 918, 'Leapmotor 7.2% — Stellantis 합작 유럽 진출 교두보', '#DC2626')}
${bullet(82, 978, 'Xiaomi Auto 3.7% — 스마트폰 기업의 10위권 안착', '#8B5CF6')}
<rect x="82" y="1078" width="${W-164}" height="80" rx="12" fill="#052e1c" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#10B981" font-weight="700">중국 NEV 시장 성장 중 → 상위 브랜드 동반 성장 가능</text>
<text x="110" y="1148" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">FSD 허가 + 옵티머스 중국 생산이 차기 모멘텀</text>
${footer()}`);
    await save('tsla-china-nev4-20261015', svg);
  }

  // ── 16. tsla-china-nev4-20261015-en (EN) ────────────────────────────
  {
    const bw = 700;
    const svg = svgWrap(`
${gradBar('#10B981', '#DC2626')}
${badge(54, 30, 'Stock Analysis', '#10B981')}
${badge(254, 30, 'TSLA', '#059669')}
${badge(330, 30, 'China NEV', '#DC2626')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · China Sept 2026 NEV retail ranking (CPCA)</text>
<text x="54" y="218" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#10B981" font-weight="900">Tesla China 4th — 6.0%</text>
<text x="54" y="280" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">BYD 22.8% · Geely 11.0% · Leapmotor 7.2% · Tesla 6.0%</text>
${divider(304, '#10B981', '#DC2626')}
<text x="54" y="360" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#8B949E" font-weight="700">China NEV Retail Share — September 2026</text>
<rect x="54" y="376" width="${bw}" height="44" rx="8" fill="#DC2626"/>
<text x="72" y="405" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">1. BYD — 22.8%</text>
<rect x="54" y="430" width="${Math.round(bw*11/22.8)}" height="44" rx="8" fill="#3B82F6"/>
<text x="72" y="459" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">2. Geely — 11.0%</text>
<rect x="54" y="484" width="${Math.round(bw*7.2/22.8)}" height="44" rx="8" fill="#8B5CF6"/>
<text x="72" y="513" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">3. Leapmotor — 7.2%</text>
<rect x="54" y="538" width="${Math.round(bw*6/22.8)}" height="44" rx="8" fill="#10B981"/>
<text x="72" y="567" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">4. Tesla China — 6.0% ★</text>
<rect x="54" y="592" width="${Math.round(bw*5.7/22.8)}" height="44" rx="8" fill="#F97316"/>
<text x="72" y="621" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">5. Changan — 5.7%</text>
<rect x="54" y="646" width="${Math.round(bw*5.1/22.8)}" height="44" rx="8" fill="#6B7280"/>
<text x="72" y="675" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#fff" font-weight="900">6. SAIC-GM-Wuling — 5.1%</text>
${divider(706, '#10B981', '#DC2626')}
<rect x="54" y="724" width="${W-108}" height="470" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="768" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#10B981" font-weight="900">Tesla China Analysis</text>
<line x1="82" y1="782" x2="${W-82}" y2="782" stroke="#30363D" stroke-width="1"/>
${bullet(82, 798, 'Model 3/Y lineup holds 6.0% — 4th rank maintained', '#10B981')}
${bullet(82, 858, 'FSD China approval = the key catalyst for share recovery', '#059669')}
${bullet(82, 918, 'Leapmotor 7.2% — Stellantis JV building Europe bridge', '#DC2626')}
${bullet(82, 978, 'Xiaomi Auto 3.7% — smartphone brand enters top 10', '#8B5CF6')}
<rect x="82" y="1078" width="${W-164}" height="80" rx="12" fill="#052e1c" stroke="#10B981" stroke-width="1.5"/>
<text x="110" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#10B981" font-weight="700">Growing NEV market = top players grow together</text>
<text x="110" y="1148" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">FSD permit + Optimus China production = next catalysts</text>
${footer()}`);
    await save('tsla-china-nev4-20261015-en', svg);
  }

  // ── 17. tsla-430c-flow-20261015 (KO) ────────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#F97316')}
${badge(54, 30, '종목분석', '#EF4444')}
${badge(190, 30, 'TSLA', '#B91C1C')}
${badge(266, 30, '옵션플로우', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · TSLA 430C 04/16/2027 대형 옵션 플로우</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#EF4444" font-weight="900">$13.3M</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">하루 프리미엄 규모</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">4,846 계약 · 평균 $27.45 · 10월 13일 발생</text>
${divider(380, '#EF4444', '#F97316')}
<rect x="54" y="402" width="${W-108}" height="110" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="2"/>
<text x="82" y="443" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">행사가 $430 — 현재가 $375.61 대비 14.5% OTM</text>
<text x="82" y="485" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">만기까지 잔여 185일 (2027년 4월 16일 만기)</text>
${statCard(54, 536, 310, '거래량', '4,846계약', '하루 비정상 대량', '#EF4444')}
${statCard(388, 536, 310, '총 프리미엄', '$13.3M', '10월 13일', '#F97316')}
${statCard(722, 536, 304, '평균가', '$27.45', '계약당', '#DC2626')}
<rect x="54" y="696" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="740" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">대형 옵션 플로우 해석 3가지</text>
<line x1="82" y1="754" x2="${W-82}" y2="754" stroke="#30363D" stroke-width="1"/>
${bullet(82, 770, '헤지 — 숏 포지션 보유자의 상방 리스크 방어용 매수', '#EF4444')}
${bullet(82, 830, '강세 베팅 — $430 돌파 확신 기반 방향성 레버리지', '#F97316')}
${bullet(82, 890, '기관 포지션 — 로드스터·Q3 실적 앞두고 포지션 구축', '#DC2626')}
${bullet(82, 950, '내재변동성(IV) 46% — 일반 옵션 대비 높은 변동성', '#EF4444')}
<rect x="82" y="1060" width="${W-164}" height="90" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1094" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">옵션 플로우 ≠ 방향성 보장 · 헤지·스프레드 가능성 포함</text>
<text x="110" y="1132" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">21일 Q3 실적 + 오늘 로드스터 이벤트 함께 주시</text>
${footer()}`);
    await save('tsla-430c-flow-20261015', svg);
  }

  // ── 18. tsla-430c-flow-20261015-en (EN) ─────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#EF4444', '#F97316')}
${badge(54, 30, 'Stock Analysis', '#EF4444')}
${badge(254, 30, 'TSLA', '#B91C1C')}
${badge(330, 30, 'Options Flow', '#C2410C')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · TSLA 430C 04/16/2027 unusual flow</text>
<text x="54" y="210" font-family="Arial Black,Arial,sans-serif" font-size="120" fill="#EF4444" font-weight="900">$13.3M</text>
<text x="54" y="298" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">single-day premium</text>
<text x="54" y="356" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">4,846 contracts · avg $27.45 · Oct 13, 2026</text>
${divider(380, '#EF4444', '#F97316')}
<rect x="54" y="402" width="${W-108}" height="110" rx="16" fill="#1A0808" stroke="#EF4444" stroke-width="2"/>
<text x="82" y="443" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Strike $430 — 14.5% OTM vs current TSLA $375.61</text>
<text x="82" y="485" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">185 DTE (days to expiration) — April 16, 2027</text>
${statCard(54, 536, 310, 'Volume', '4,846 ctrs', '1-day unusual', '#EF4444')}
${statCard(388, 536, 310, 'Total Premium', '$13.3M', 'Oct 13 session', '#F97316')}
${statCard(722, 536, 304, 'Avg Fill', '$27.45', 'per contract', '#DC2626')}
<rect x="54" y="696" width="${W-108}" height="500" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="740" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#EF4444" font-weight="900">3 Ways to Read This Flow</text>
<line x1="82" y1="754" x2="${W-82}" y2="754" stroke="#30363D" stroke-width="1"/>
${bullet(82, 770, 'Hedge — short seller buying calls to cover upside risk', '#EF4444')}
${bullet(82, 830, 'Directional bet — conviction TSLA breaks $430 before Apr', '#F97316')}
${bullet(82, 890, 'Institutional position — ahead of Roadster reveal &amp; Q3 earnings', '#DC2626')}
${bullet(82, 950, 'IV 46% — elevated volatility priced into this contract', '#EF4444')}
<rect x="82" y="1060" width="${W-164}" height="90" rx="12" fill="#1A0808" stroke="#EF4444" stroke-width="1.5"/>
<text x="110" y="1094" font-family="Arial,sans-serif" font-size="20" fill="#EF4444" font-weight="700">Flow ≠ guaranteed direction · could be hedge or spread</text>
<text x="110" y="1132" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Watch: Q3 earnings Oct 21 + Roadster reveal tonight</text>
${footer()}`);
    await save('tsla-430c-flow-20261015-en', svg);
  }

  // ── 19. nvda-jensen-unsafe-20261015 (KO) ────────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#22C55E', '#16A34A')}
${badge(54, 30, '종목분석', '#22C55E')}
${badge(190, 30, 'NVDA', '#16A34A')}
${badge(266, 30, 'AI 안전', '#15803D')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · 젠슨 황 CEO 블룸버그 인터뷰</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="64" fill="#22C55E" font-weight="900">"칩 공급 중단"</text>
<text x="54" y="278" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">불안전한 AI 개발사에</text>
<text x="54" y="348" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">엔비디아 젠슨 황 CEO — 블룸버그 발언 · 전례 없는 수준</text>
${divider(374, '#22C55E', '#16A34A')}
<rect x="54" y="396" width="${W-108}" height="130" rx="16" fill="#052e16" stroke="#22C55E" stroke-width="2"/>
<text x="82" y="437" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">반도체 공급사가 AI 소프트웨어 안전성 기준으로</text>
<text x="82" y="475" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">하드웨어 공급 여부 결정 선언 — 업계 최초</text>
<text x="82" y="513" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">AI 칩 수출 통제 강화 시점에 자율 안전 기준 선제 표명</text>
<rect x="54" y="556" width="${W-108}" height="550" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="600" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#22C55E" font-weight="900">배경 및 의미 분석</text>
<line x1="82" y1="614" x2="${W-82}" y2="614" stroke="#30363D" stroke-width="1"/>
${bullet(82, 630, '기존 AI 안전 논의는 소프트웨어 레이어에 국한됐음', '#22C55E')}
${bullet(82, 690, '하드웨어 공급사 직접 개입 = 거버넌스 주체로 진화 신호', '#16A34A')}
${bullet(82, 750, '실제 집행 어려움 — 클라우드 경유 간접 접근 차단 불가', '#15803D')}
${bullet(82, 810, '미국 AI 칩 수출 규제 강화 배경 속 전략적 선점 포지셔닝', '#22C55E')}
${bullet(82, 870, '정부·규제기관과의 관계에서 우호적 위치 점유 의도', '#16A34A')}
<rect x="82" y="980" width="${W-164}" height="90" rx="12" fill="#052e16" stroke="#22C55E" stroke-width="1.5"/>
<text x="110" y="1014" font-family="Arial,sans-serif" font-size="21" fill="#22C55E" font-weight="700">단기 주가 영향 제한적 · 장기 거버넌스 리스크 부각 가능</text>
<text x="110" y="1052" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">AI 칩 규제 논의에서 엔비디아 중재자 포지셔닝 강화</text>
${footer()}`);
    await save('nvda-jensen-unsafe-20261015', svg);
  }

  // ── 20. nvda-jensen-unsafe-20261015-en (EN) ─────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#22C55E', '#16A34A')}
${badge(54, 30, 'Stock Analysis', '#22C55E')}
${badge(254, 30, 'NVDA', '#16A34A')}
${badge(330, 30, 'AI Safety', '#15803D')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · Jensen Huang Bloomberg interview</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#22C55E" font-weight="900">"Would Halt Chips"</text>
<text x="54" y="274" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">for unsafe AI developers</text>
<text x="54" y="348" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Nvidia CEO Jensen Huang — Bloomberg · unprecedented stance</text>
${divider(374, '#22C55E', '#16A34A')}
<rect x="54" y="396" width="${W-108}" height="130" rx="16" fill="#052e16" stroke="#22C55E" stroke-width="2"/>
<text x="82" y="437" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">A chip supplier making hardware supply decisions based</text>
<text x="82" y="475" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">on AI software safety — first of its kind statement</text>
<text x="82" y="513" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Timed with tightening US AI chip export controls</text>
<rect x="54" y="556" width="${W-108}" height="550" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="600" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#22C55E" font-weight="900">Context &amp; Implications</text>
<line x1="82" y1="614" x2="${W-82}" y2="614" stroke="#30363D" stroke-width="1"/>
${bullet(82, 630, 'Prior AI safety debate was software-layer only — not hardware', '#22C55E')}
${bullet(82, 690, 'Chip supplier stepping in = signal of governance role evolution', '#16A34A')}
${bullet(82, 750, 'Hard to enforce — cloud-routed indirect access hard to block', '#15803D')}
${bullet(82, 810, 'Strategic pre-positioning amid US AI chip export tightening', '#22C55E')}
${bullet(82, 870, 'Intent: build goodwill with governments &amp; regulators', '#16A34A')}
<rect x="82" y="980" width="${W-164}" height="90" rx="12" fill="#052e16" stroke="#22C55E" stroke-width="1.5"/>
<text x="110" y="1014" font-family="Arial,sans-serif" font-size="21" fill="#22C55E" font-weight="700">Limited near-term price impact · governance risk longer-term</text>
<text x="110" y="1052" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Nvidia positioning as AI safety arbiter in policy debates</text>
${footer()}`);
    await save('nvda-jensen-unsafe-20261015-en', svg);
  }

  // ── 21. tsla-energy-bocamno2-20261015 (KO) ──────────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#0EA5E9')}
${badge(54, 30, '종목분석', '#3B82F6')}
${badge(190, 30, 'TSLA', '#1D4ED8')}
${badge(266, 30, '메가팩', '#0284C7')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · NightHawk Bocamno 2 · 텍사스 브라조리아</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#3B82F6" font-weight="900">Bocamno 2</text>
<text x="54" y="288" font-family="Arial Black,Arial,sans-serif" font-size="50" fill="#fff" font-weight="900">Megapack BESS 완공</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">텍사스 브라조리아 카운티 · NightHawk Energy · 휴스턴 인근</text>
${divider(376, '#3B82F6', '#0EA5E9')}
<rect x="54" y="398" width="${W-108}" height="110" rx="16" fill="#0D1F3A" stroke="#3B82F6" stroke-width="2"/>
<text x="82" y="439" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Bocamno 1은 2026년 8월 상업 운전 시작 완료</text>
<text x="82" y="481" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Bocamno 2 = 동일 지역 두 번째 단계 대규모 BESS</text>
${statCard(54, 532, 466, 'Bocamno 1', '2026.08', '상업 운전 시작', '#3B82F6')}
${statCard(544, 532, 482, 'Bocamno 2', '완공', 'NightHawk Phase 2', '#0EA5E9')}
<rect x="54" y="692" width="${W-108}" height="510" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="736" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">테슬라 에너지 사업 시사점</text>
<line x1="82" y1="750" x2="${W-82}" y2="750" stroke="#30363D" stroke-width="1"/>
${bullet(82, 766, '텍사스 ERCOT — 여름 폭염·겨울 한파 수요 급등 반복', '#3B82F6')}
${bullet(82, 826, '메가팩 단위당 ~3.9MWh · 재생에너지 간헐성 보완 핵심', '#0EA5E9')}
${bullet(82, 886, '1→2단계 순차 확장 방식이 대형 BESS 표준으로 정착 중', '#1D4ED8')}
${bullet(82, 946, '테슬라 에너지 부문 — 차량 마진 압박 상쇄 성장 엔진', '#3B82F6')}
<rect x="82" y="1056" width="${W-164}" height="100" rx="12" fill="#0D1F3A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1090" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" font-weight="700">에너지 부문 → 차량 부문 독립적 성장 드라이버로 부상</text>
<text x="110" y="1128" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">메가팩 수주 급증 → 2027년 에너지 EPS 비중 확대 전망</text>
${footer()}`);
    await save('tsla-energy-bocamno2-20261015', svg);
  }

  // ── 22. tsla-energy-bocamno2-20261015-en (EN) ───────────────────────
  {
    const svg = svgWrap(`
${gradBar('#3B82F6', '#0EA5E9')}
${badge(54, 30, 'Stock Analysis', '#3B82F6')}
${badge(254, 30, 'TSLA', '#1D4ED8')}
${badge(330, 30, 'Megapack', '#0284C7')}
<text x="54" y="104" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026.10.15 · NightHawk Bocamno 2 · Brazoria County TX</text>
<text x="54" y="200" font-family="Arial Black,Arial,sans-serif" font-size="80" fill="#3B82F6" font-weight="900">Bocamno 2</text>
<text x="54" y="288" font-family="Arial Black,Arial,sans-serif" font-size="50" fill="#fff" font-weight="900">Megapack BESS Complete</text>
<text x="54" y="352" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Brazoria County TX · NightHawk Energy · near Houston</text>
${divider(376, '#3B82F6', '#0EA5E9')}
<rect x="54" y="398" width="${W-108}" height="110" rx="16" fill="#0D1F3A" stroke="#3B82F6" stroke-width="2"/>
<text x="82" y="439" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" font-weight="700">Bocamno 1 began commercial operation August 2026</text>
<text x="82" y="481" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Phase 2 = second large-scale BESS in same county</text>
${statCard(54, 532, 466, 'Bocamno 1', 'Aug 2026', 'commercial op start', '#3B82F6')}
${statCard(544, 532, 482, 'Bocamno 2', 'Complete', 'NightHawk Phase 2', '#0EA5E9')}
<rect x="54" y="692" width="${W-108}" height="510" rx="20" fill="#161B22" stroke="#30363D" stroke-width="1.5"/>
<text x="82" y="736" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#3B82F6" font-weight="900">Tesla Energy Business Implications</text>
<line x1="82" y1="750" x2="${W-82}" y2="750" stroke="#30363D" stroke-width="1"/>
${bullet(82, 766, 'Texas ERCOT — repeated summer heat &amp; winter cold demand spikes', '#3B82F6')}
${bullet(82, 826, 'Each Megapack ~3.9MWh · critical buffer for renewable intermittency', '#0EA5E9')}
${bullet(82, 886, 'Phase 1→2 sequential expansion becoming BESS industry standard', '#1D4ED8')}
${bullet(82, 946, 'Tesla Energy = independent growth driver offsetting auto margin', '#3B82F6')}
<rect x="82" y="1056" width="${W-164}" height="100" rx="12" fill="#0D1F3A" stroke="#3B82F6" stroke-width="1.5"/>
<text x="110" y="1090" font-family="Arial,sans-serif" font-size="20" fill="#3B82F6" font-weight="700">Energy business rising as standalone growth engine</text>
<text x="110" y="1128" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#fff" font-weight="900">Megapack backlog growing → Energy EPS weight expands 2027</text>
${footer()}`);
    await save('tsla-energy-bocamno2-20261015-en', svg);
  }

  console.log('\n✅ All individual topic cards done.');
}

main().catch(console.error);
