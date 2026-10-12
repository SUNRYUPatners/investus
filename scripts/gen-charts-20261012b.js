#!/usr/bin/env node
// SVG chart generator — 2026-10-12 batch-2
// New topics: Cybercab Austin 8x, Starcloud $41.2B, Optimus V3, Starship factory, AI $10.3T
// Also updates summary-20261012 KO+EN to list all 9 topics
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

function gradBar(colors) {
  const stops = colors.map((c,i) => `<stop offset="${Math.round(i/(colors.length-1)*100)}%" stop-color="${c}"/>`).join('');
  return `<defs><linearGradient id="gb" x1="0%" y1="0%" x2="100%" y2="0%">${stops}</linearGradient></defs>
<rect x="0" y="0" width="${W}" height="12" fill="url(#gb)"/>`;
}

function wrapText(text, maxWidth, fontSize, fontFactor = 0.6) {
  const charWidth = fontSize * fontFactor;
  const charsPerLine = Math.floor(maxWidth / charWidth);
  const tokens = text.split(/(\s+|(?<=·)|(?=·))/);
  const lines = [];
  let line = '';
  for (const tok of tokens) {
    if (!tok) continue;
    if (line.length + tok.length > charsPerLine && line.trim().length > 0) {
      lines.push(line.trimEnd());
      line = tok.trimStart();
    } else {
      line += tok;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines.length ? lines : [text];
}

function statCard(x, y, w, h, label, value, sub, accent) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#161B22" stroke="${accent}" stroke-width="1.5"/>
<text x="${x+w/2}" y="${y+38}" font-family="Arial,sans-serif" font-size="20" fill="${accent}" text-anchor="middle" font-weight="700">${label}</text>
<text x="${x+w/2}" y="${y+80}" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#fff" text-anchor="middle" font-weight="900">${value}</text>
<text x="${x+w/2}" y="${y+108}" font-family="Arial,sans-serif" font-size="18" fill="#8B949E" text-anchor="middle">${sub}</text>`;
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

  // ── 1. summary-20261012 (KO) — 9 topics ───────────────────────────
  {
    const topics = [
      { num: '1', text: '사이버캡 파리 모터쇼 유럽 첫 공개 — 실운행 차량 전시, TSLA +0.6%', color: '#FF4D6D' },
      { num: '2', text: 'FSD → TAD 유럽 9개국 리브랜딩 — 독일 압박 6주 만, EU 규정 투표 12월', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX $400억 엔비디아 칩 차입 — 아폴로 선도·핌코 참여', color: '#60A5FA' },
      { num: '4', text: 'AAPL 아이폰18 프로 부품 15~20% 삭감 — AI 메모리 원가↑, AAPL -2.5%', color: '#C084FC' },
      { num: '5', text: '사이버캡 오스틴 30일 만에 8배 성장 — 달라스 확장, 앱 $16.59', color: '#FF4D6D' },
      { num: '6', text: '스타클라우드 연환산 $412억 — 앤트로픽·구글·리플렉션AI, 93% 프리미엄', color: '#60A5FA' },
      { num: '7', text: '옵티머스 V3 나사 조립 정밀 데모 — 자석 수출 규제가 생산 병목', color: '#FF4D6D' },
      { num: '8', text: '스타쉽 1,000기/년 스타팩토리 착공 — 2028년 완전 가동 목표', color: '#60A5FA' },
      { num: '9', text: 'AI 인프라 10년 누적 $10.3조 전망 — Brookings, 전력 수요 2배 급등', color: '#34D399' },
    ];
    const cardH = 100;
    const startY = 230;
    const inner = `
${gradBar(['#FF4D6D','#FB923C','#60A5FA','#C084FC','#34D399'])}
${badge(54, 28, '한장요약', '#6366F1')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">2026.10.12  총 9토픽</text>
<text x="54" y="155" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">테슬라 · 스페이스X · 애플 · AI 인프라</text>
<line x1="54" y1="178" x2="${W-54}" y2="178" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = startY + i * (cardH + 8);
  const lines = wrapText(t.text, W - 200, 22, 0.56);
  const h = Math.max(cardH, lines.length * 30 + 50);
  return `<rect x="54" y="${y}" width="${W-108}" height="${h}" rx="12" fill="#161B22" stroke="${t.color}" stroke-width="1.5"/>
<text x="90" y="${y + h/2 + 10}" font-family="Arial Black,Arial,sans-serif" font-size="34" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="134" y1="${y+14}" x2="134" y2="${y+h-14}" stroke="${t.color}" stroke-width="2.5"/>
${lines.map((l, li) => `<text x="150" y="${y + h/2 - (lines.length-1)*15 + li*30}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1270" x2="${W-54}" y2="1270" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1302" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">핵심일정: 10.18 파리모터쇼 종료  10.21 테슬라 3Q 실적  10월 EU 자율주행 규정</text>
${footer()}`;
    await save('summary-20261012', svgWrap(inner));
  }

  // ── 2. summary-20261012-en (EN) — 9 topics ────────────────────────
  {
    const topics = [
      { num: '1', text: 'Cybercab European debut at Paris — operational fleet car, TSLA +0.6%', color: '#FF4D6D' },
      { num: '2', text: 'FSD rebranded to TAD in 9 EU countries — after 6-week German pressure', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX seeks $40B to buy Nvidia chips — Apollo leads, PIMCO in talks', color: '#60A5FA' },
      { num: '4', text: 'Apple cut iPhone 18 Pro orders 15–20% — AI memory costs, AAPL -2.5%', color: '#C084FC' },
      { num: '5', text: 'Cybercab Austin fleet 8x in 30 days — Dallas confirmed, app $16.59', color: '#FF4D6D' },
      { num: '6', text: 'Starcloud $41.2B annualized — Anthropic+Google+Reflection AI, 93% premium', color: '#60A5FA' },
      { num: '7', text: 'Optimus V3 precision screw demo — magnet export rules = bottleneck', color: '#FF4D6D' },
      { num: '8', text: 'Starship factory 1,000/yr — Starfactory groundwork, full ops 2028', color: '#60A5FA' },
      { num: '9', text: 'AI infrastructure $10.3T over 10 yrs — Brookings; power demand 2x', color: '#34D399' },
    ];
    const cardH = 100;
    const startY = 230;
    const inner = `
${gradBar(['#FF4D6D','#FB923C','#60A5FA','#C084FC','#34D399'])}
${badge(54, 28, 'SUMMARY', '#6366F1')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">2026.10.12  9 Topics</text>
<text x="54" y="155" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Tesla · SpaceX · Apple · AI Infrastructure</text>
<line x1="54" y1="178" x2="${W-54}" y2="178" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = startY + i * (cardH + 8);
  const lines = wrapText(t.text, W - 200, 22, 0.56);
  const h = Math.max(cardH, lines.length * 30 + 50);
  return `<rect x="54" y="${y}" width="${W-108}" height="${h}" rx="12" fill="#161B22" stroke="${t.color}" stroke-width="1.5"/>
<text x="90" y="${y + h/2 + 10}" font-family="Arial Black,Arial,sans-serif" font-size="34" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="134" y1="${y+14}" x2="134" y2="${y+h-14}" stroke="${t.color}" stroke-width="2.5"/>
${lines.map((l, li) => `<text x="150" y="${y + h/2 - (lines.length-1)*15 + li*30}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1270" x2="${W-54}" y2="1270" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1302" font-family="Arial,sans-serif" font-size="19" fill="#8B949E">Key dates: Oct 18 Paris show ends  Oct 21 Tesla Q3 earnings  Oct EU AV regulation</text>
${footer()}`;
    await save('summary-20261012-en', svgWrap(inner));
  }

  // ── 3. tsla-cybercab-austin-20261012 (KO) ─────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF6B6B','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#FF4D6D" font-weight="900">사이버캡</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">오스틴 8배 성장</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">30일 사이 300대 돌파 · 달라스 론칭 확정</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 310, 130, '성장률', '8배', '30일 이내', '#FF4D6D')}
${statCard(384, 276, 310, 130, '앱 호출 시간', '6분', '도착 보장', '#F97316')}
${statCard(714, 276, 312, 130, '앱 요금', '$16.59', '1회 호출', '#FBBF24')}
<rect x="54" y="430" width="${W-108}" height="240" rx="20" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="82" y="478" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">머스크: 안전 최우선 확장 원칙</text>
<line x1="82" y1="492" x2="${W-82}" y2="492" stroke="#30363D" stroke-width="1"/>
<text x="82" y="530" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">"사고 한 건이 전 세계 헤드라인이 된다"</text>
<text x="82" y="566" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">밤 회색 아스팔트 위 회색 고양이 인식 — 실제 해결</text>
<text x="82" y="602" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">달라스: 미국 9위 도시, 대중교통 빈약 → 수요 최적지</text>
<text x="82" y="638" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">프랑스 우버: 모델Y 1위 · 모델3 2위 — 로보택시 포석</text>
<rect x="54" y="696" width="${W-108}" height="360" rx="20" fill="#161B22"/>
<text x="82" y="744" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">왜 중요한가</text>
<line x1="82" y1="758" x2="${W-82}" y2="758" stroke="#30363D" stroke-width="1"/>
<text x="82" y="796" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">8배 성장 = 소프트웨어 승인이 하드웨어보다 빨리 해소</text>
<text x="82" y="832" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">각 지역 확장마다 규제 당국 별도 협의 필요</text>
<text x="82" y="868" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">달라스 데이터 → 10/21 3Q 실적 컨퍼런스콜 공개 가능성</text>
<text x="82" y="920" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="958" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">ARK 목표가 750달러 이상 — 로보택시 채택 기하급수 전망</text>
<text x="82" y="994" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">웨드부시 — 21일 실적에 오스틴 데이터 공개 시 350달러↑</text>
${footer()}`;
    await save('tsla-cybercab-austin-20261012', svgWrap(inner));
  }

  // ── 4. tsla-cybercab-austin-20261012-en (EN) ──────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF6B6B','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#FF4D6D" font-weight="900">Cybercab Austin</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">8× Growth in 30 Days</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Fleet surpassed 300 · Dallas service confirmed</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 310, 130, 'Fleet Growth', '8×', '30 days', '#FF4D6D')}
${statCard(384, 276, 310, 130, 'App ETA', '6 min', 'guaranteed', '#F97316')}
${statCard(714, 276, 312, 130, 'App Fare', '$16.59', 'per ride', '#FBBF24')}
<rect x="54" y="430" width="${W-108}" height="240" rx="20" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="82" y="478" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">Musk: Safety-First Expansion</text>
<line x1="82" y1="492" x2="${W-82}" y2="492" stroke="#30363D" stroke-width="1"/>
<text x="82" y="530" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">"One accident becomes worldwide headline news"</text>
<text x="82" y="566" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Grey cat on grey asphalt at night — actually solved</text>
<text x="82" y="602" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Dallas: 9th largest US city, weak transit = high demand</text>
<text x="82" y="638" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">France Uber: Model Y #1, Model 3 #2 — robotaxi foundation</text>
<rect x="54" y="696" width="${W-108}" height="360" rx="20" fill="#161B22"/>
<text x="82" y="744" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">Why it matters</text>
<line x1="82" y1="758" x2="${W-82}" y2="758" stroke="#30363D" stroke-width="1"/>
<text x="82" y="796" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">8× growth = software approvals outpacing hardware</text>
<text x="82" y="832" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Each new city requires separate regulator negotiations</text>
<text x="82" y="868" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Dallas data likely previewed at Oct 21 Q3 earnings call</text>
<text x="82" y="920" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="958" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">ARK PT $750+ — exponential robotaxi adoption thesis</text>
<text x="82" y="994" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Wedbush — Austin data at Q3 call = next PT catalyst above $350</text>
${footer()}`;
    await save('tsla-cybercab-austin-20261012-en', svgWrap(inner));
  }

  // ── 5. spacex-starcloud-20261012 (KO) ─────────────────────────────
  {
    const inner = `
${gradBar(['#60A5FA','#818CF8','#60A5FA'])}
${badge(54, 28, 'SPCX', '#60A5FA')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#60A5FA" font-weight="900">스타클라우드</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">연환산 $412억</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">4개 계약 합산 · 네오클라우드 대비 93% 프리미엄</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="276" width="${W-108}" height="200" rx="20" fill="#161B22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="82" y="322" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#60A5FA" font-weight="900">4대 계약 고객 연환산 매출</text>
<line x1="82" y1="336" x2="${W-82}" y2="336" stroke="#30363D" stroke-width="1"/>
<text x="82" y="372" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">앤트로픽 $150억  ·  신규 호스팅 $133억</text>
<text x="82" y="408" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">구글 $110억  ·  리플렉션AI $18억</text>
<text x="82" y="444" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#34D399" font-weight="900">= 합산 $412억/년</text>
${statCard(54, 506, 310, 130, '단가 프리미엄', '+93%', '네오클라우드比', '#60A5FA')}
${statCard(384, 506, 310, 130, 'GW당 단가', '$50.5', 'vs 경쟁 $26.2', '#818CF8')}
${statCard(714, 506, 312, 130, '밸류에이션', '$900B~', '~1,100억 달러', '#34D399')}
<rect x="54" y="666" width="${W-108}" height="360" rx="20" fill="#161B22"/>
<text x="82" y="714" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#60A5FA" font-weight="900">왜 93% 프리미엄이 가능한가</text>
<line x1="82" y1="728" x2="${W-82}" y2="728" stroke="#30363D" stroke-width="1"/>
<text x="82" y="766" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">스타링크 위성 + 스타클라우드 지상 컴퓨팅 통합 구조</text>
<text x="82" y="802" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">지리 제약 없는 AI 컴퓨팅 — 일반 데이터센터 불가</text>
<text x="82" y="838" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">엔비디아 리플렉션AI 인수 → SPCX와 파트너·경쟁 중첩</text>
<text x="82" y="886" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="924" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">ARK — 93% 프리미엄 지속 시 2037년 밸류에이션 $1조 전망</text>
<text x="82" y="960" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">모건스탠리 — IPO 공모가 산정 기준 상향 불가피 전망</text>
<text x="82" y="996" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">골드만삭스 확인: SPCX 단기 계약 $50+ — 업계 최고 단가</text>
${footer()}`;
    await save('spacex-starcloud-20261012', svgWrap(inner));
  }

  // ── 6. spacex-starcloud-20261012-en (EN) ──────────────────────────
  {
    const inner = `
${gradBar(['#60A5FA','#818CF8','#60A5FA'])}
${badge(54, 28, 'SPCX', '#60A5FA')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#60A5FA" font-weight="900">Starcloud</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">$41.2B Annualized</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">4 contracts combined · 93% premium vs neocloud avg</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="276" width="${W-108}" height="200" rx="20" fill="#161B22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="82" y="322" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#60A5FA" font-weight="900">Annualized Revenue by Customer</text>
<line x1="82" y1="336" x2="${W-82}" y2="336" stroke="#30363D" stroke-width="1"/>
<text x="82" y="372" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Anthropic $15B  ·  New hosting customer $13.3B</text>
<text x="82" y="408" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Google $11B  ·  Reflection AI $1.8B</text>
<text x="82" y="444" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#34D399" font-weight="900">= $41.2B/yr combined</text>
${statCard(54, 506, 310, 130, 'Price Premium', '+93%', 'vs neocloud avg', '#60A5FA')}
${statCard(384, 506, 310, 130, 'GW-year Rate', '$50.5', 'vs rival $26.2', '#818CF8')}
${statCard(714, 506, 312, 130, 'Valuation', '$90B–', '–$110B range', '#34D399')}
<rect x="54" y="666" width="${W-108}" height="360" rx="20" fill="#161B22"/>
<text x="82" y="714" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#60A5FA" font-weight="900">Why the 93% premium holds</text>
<line x1="82" y1="728" x2="${W-82}" y2="758" stroke="#30363D" stroke-width="1"/>
<text x="82" y="766" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Starlink satellite + Starcloud ground compute integration</text>
<text x="82" y="802" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Geography-agnostic AI compute — no rival offers this</text>
<text x="82" y="838" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Nvidia acquiring Reflection AI = customer/partner/rival overlap</text>
<text x="82" y="886" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="924" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">ARK — 93% premium sustained = $1T valuation by 2037</text>
<text x="82" y="960" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Morgan Stanley — IPO pricing baseline will need to be revised up</text>
<text x="82" y="996" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Goldman Sachs confirmed SPCX at $50+/GW-yr — highest in industry</text>
${footer()}`;
    await save('spacex-starcloud-20261012-en', svgWrap(inner));
  }

  // ── 7. tsla-optimus-v3-20261012 (KO) ──────────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#F97316','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#FF4D6D" font-weight="900">옵티머스 V3</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" font-weight="900">초정밀 나사 조립 공개</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">X 테이크오버 · 2026년 10월 9일</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="276" width="${W-108}" height="180" rx="20" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="330" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">수mm 나사 → 구멍 삽입 정밀 조작 성공</text>
<text x="${W/2}" y="370" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">수십 개 부품 협응 + 손가락 압력·각도 동시 제어</text>
<text x="${W/2}" y="406" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">이전 버전 대비 정밀도 눈에 띄게 향상</text>
<text x="${W/2}" y="442" font-family="Arial,sans-serif" font-size="22" fill="#FBBF24" text-anchor="middle">병목: 전기 모터용 자석 수출 규제 — 2~3개월 내 해결 목표</text>
${statCard(54, 488, 460, 130, '외부 판매 예상가', '$10만+', '정밀 조립 공장용', '#FF4D6D')}
${statCard(546, 488, 480, 130, '칩 설계 주기 목표', '2년→1년', '도조 경쟁력 핵심', '#F97316')}
<rect x="54" y="646" width="${W-108}" height="390" rx="20" fill="#161B22"/>
<text x="82" y="694" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">왜 중요한가</text>
<line x1="82" y1="708" x2="${W-82}" y2="708" stroke="#30363D" stroke-width="1"/>
<text x="82" y="746" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">자동차 조립 라인 나사 조임 → 테슬라 공장 인건비 대체 속도↑</text>
<text x="82" y="782" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">전자제품·반도체 조립 공장 판매 시 $10만 이상 시장가 형성</text>
<text x="82" y="818" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">칩 설계 주기 단축 → AI 학습 비용 절감이 연간 누적 효과</text>
<text x="82" y="854" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">자석 수출 규제 해소 시 2025년 말 생산 가속 가시화</text>
<text x="82" y="904" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="942" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">모건스탠리 — 외부 판매 타임라인 앞당기는 신호, 목표주가 $400</text>
<text x="82" y="978" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">웨드부시 — 칩 자체 설계 가속화가 도조 2세대 경쟁력 전환 핵심</text>
<text x="82" y="1014" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">로봇 모멘텀 반영 350달러 시나리오 유지</text>
${footer()}`;
    await save('tsla-optimus-v3-20261012', svgWrap(inner));
  }

  // ── 8. tsla-optimus-v3-20261012-en (EN) ───────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#F97316','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#FF4D6D" font-weight="900">Optimus V3</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" font-weight="900">Sub-mm Screw Assembly Demo</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">X Takeover Event · October 9, 2026</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="276" width="${W-108}" height="180" rx="20" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="330" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" text-anchor="middle" font-weight="900">Inserted sub-mm screw into hole — precision manipulation</text>
<text x="${W/2}" y="370" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">Requires multi-joint coordination + fingertip force control</text>
<text x="${W/2}" y="406" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">Marked improvement in dexterity vs prior versions</text>
<text x="${W/2}" y="442" font-family="Arial,sans-serif" font-size="22" fill="#FBBF24" text-anchor="middle">Bottleneck: magnet export restrictions — resolution in 2–3 months</text>
${statCard(54, 488, 460, 130, 'External Sale Price', '$100K+', 'precision factories', '#FF4D6D')}
${statCard(546, 488, 480, 130, 'Chip Design Cycle', '2yr→1yr', 'Dojo v2 key metric', '#F97316')}
<rect x="54" y="646" width="${W-108}" height="390" rx="20" fill="#161B22"/>
<text x="82" y="694" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">Why it matters</text>
<line x1="82" y1="708" x2="${W-82}" y2="708" stroke="#30363D" stroke-width="1"/>
<text x="82" y="746" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Screw-tightening is the highest-frequency task in car assembly</text>
<text x="82" y="782" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">External sales to electronics/semiconductor fabs at $100K+</text>
<text x="82" y="818" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Shorter chip design cycle = compounding AI training cost savings</text>
<text x="82" y="854" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Magnet supply fix → production ramp visible by end of 2025</text>
<text x="82" y="904" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="942" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Morgan Stanley — external sale timeline pulled forward, PT $400</text>
<text x="82" y="978" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Wedbush — chip design acceleration = Dojo v2 competitive edge</text>
<text x="82" y="1014" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Robot momentum supports $350 scenario</text>
${footer()}`;
    await save('tsla-optimus-v3-20261012-en', svgWrap(inner));
  }

  // ── 9. spacex-starship-factory-20261012 (KO) ──────────────────────
  {
    const inner = `
${gradBar(['#60A5FA','#34D399','#60A5FA'])}
${badge(54, 28, 'SPCX', '#60A5FA')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#60A5FA" font-weight="900">스타팩토리</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">스타쉽 1,000기/년</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">테오스 프로젝트 · 2028년 완전 가동 목표</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 310, 130, '목표 생산량', '1,000기', '연간', '#60A5FA')}
${statCard(384, 276, 310, 130, '현재 생산량', '~12기', '연간', '#34D399')}
${statCard(714, 276, 312, 130, '완전 가동', '2028년', '목표', '#FBBF24')}
<rect x="54" y="436" width="${W-108}" height="240" rx="20" fill="#161B22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="82" y="482" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#60A5FA" font-weight="900">스타팩토리 핵심 스펙</text>
<line x1="82" y1="496" x2="${W-82}" y2="496" stroke="#30363D" stroke-width="1"/>
<text x="82" y="532" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">플로리다 케이프 커내버럴 인근 부지 착공</text>
<text x="82" y="568" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">스타쉽 1기당 제조 비용 현재 $9,500만 → $2천만 목표</text>
<text x="82" y="604" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">로켓당 재사용 횟수 현재 3회 → 100회+ 목표</text>
<text x="82" y="640" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">2030년 화성 화물 임무 일정 뒷받침하는 생산 목표</text>
<rect x="54" y="704" width="${W-108}" height="350" rx="20" fill="#161B22"/>
<text x="82" y="752" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#60A5FA" font-weight="900">왜 중요한가</text>
<line x1="82" y1="766" x2="${W-82}" y2="766" stroke="#30363D" stroke-width="1"/>
<text x="82" y="804" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">연간 12기→1,000기 = 80배 생산량 목표</text>
<text x="82" y="840" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">스타링크 V3 위성 대규모 교체 수요 자체 충당 가능</text>
<text x="82" y="876" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">스타쉴드 군용 임무 + 상업 발사 시장 지배력 강화</text>
<text x="82" y="924" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="962" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">모건스탠리 — 생산 원가 $2천만 달성 시 발사 단가 혁명 전망</text>
<text x="82" y="998" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">ARK — 대량 생산 체계 확립이 2037년 $1조 밸류에이션 필요 조건</text>
${footer()}`;
    await save('spacex-starship-factory-20261012', svgWrap(inner));
  }

  // ── 10. spacex-starship-factory-20261012-en (EN) ───────────────────
  {
    const inner = `
${gradBar(['#60A5FA','#34D399','#60A5FA'])}
${badge(54, 28, 'SPCX', '#60A5FA')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#60A5FA" font-weight="900">Starfactory</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">1,000 Starships / Year</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Project Theos · Full capacity target 2028</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 310, 130, 'Target Output', '1,000/yr', 'Starships', '#60A5FA')}
${statCard(384, 276, 310, 130, 'Current Output', '~12/yr', 'Starships', '#34D399')}
${statCard(714, 276, 312, 130, 'Full Ops', '2028', 'target', '#FBBF24')}
<rect x="54" y="436" width="${W-108}" height="240" rx="20" fill="#161B22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="82" y="482" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#60A5FA" font-weight="900">Starfactory Key Specs</text>
<line x1="82" y1="496" x2="${W-82}" y2="496" stroke="#30363D" stroke-width="1"/>
<text x="82" y="532" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Site near Cape Canaveral, Florida — breaking ground now</text>
<text x="82" y="568" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Per-vehicle cost target: $95M today → $20M goal</text>
<text x="82" y="604" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Reuse target: 3 flights today → 100+ flights per vehicle</text>
<text x="82" y="640" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Supports Mars cargo mission schedule starting 2030</text>
<rect x="54" y="704" width="${W-108}" height="350" rx="20" fill="#161B22"/>
<text x="82" y="752" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#60A5FA" font-weight="900">Why it matters</text>
<line x1="82" y1="766" x2="${W-82}" y2="766" stroke="#30363D" stroke-width="1"/>
<text x="82" y="804" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">12 to 1,000 vehicles/yr = 80× production scale-up target</text>
<text x="82" y="840" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Self-sufficient Starlink v3 satellite replenishment cadence</text>
<text x="82" y="876" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Starshield military missions + commercial launch dominance</text>
<text x="82" y="924" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="962" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Morgan Stanley — $20M cost target = launch price revolution</text>
<text x="82" y="998" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">ARK — mass production is a prerequisite for $1T by 2037</text>
${footer()}`;
    await save('spacex-starship-factory-20261012-en', svgWrap(inner));
  }

  // ── 11. ai-infra-boom-20261012 (KO) ───────────────────────────────
  {
    const inner = `
${gradBar(['#34D399','#10B981','#34D399'])}
${badge(54, 28, 'AI인프라', '#10B981')}
${badge(54+13*6+24+16, 28, '매크로', '#6366F1')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="50" fill="#34D399" font-weight="900">AI 인프라 투자</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">10년 $10.3조</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Brookings Institution 분석 · 전력 수요 2배 전망</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 310, 130, '10년 투자 총액', '$10.3조', '2024~2034', '#34D399')}
${statCard(384, 276, 310, 130, '전력 수요 증가', '2배', '2030년까지', '#FBBF24')}
${statCard(714, 276, 312, 130, '데이터센터 비중', '3→10%', '미국 전력 소비', '#60A5FA')}
<rect x="54" y="436" width="${W-108}" height="280" rx="20" fill="#161B22" stroke="#34D399" stroke-width="1.5"/>
<text x="82" y="482" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#34D399" font-weight="900">주요 투자 플레이어</text>
<line x1="82" y1="496" x2="${W-82}" y2="496" stroke="#30363D" stroke-width="1"/>
<text x="82" y="532" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">마이크로소프트 $800억 · 구글 $750억 · 아마존 $1,050억</text>
<text x="82" y="568" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">메타 $650억 · 스페이스X 스타클라우드 $412억(연환산)</text>
<text x="82" y="604" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">엔비디아 AI 칩 수요: 블랙웰 GPU 분기당 6만장 → 30만장</text>
<text x="82" y="640" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">원자력·LNG 등 비재생에너지 재조명 — AI 전력 안정성 필요</text>
<text x="82" y="680" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">반도체·냉각·전력망 인프라 섹터 수혜 연쇄 확대</text>
<rect x="54" y="744" width="${W-108}" height="310" rx="20" fill="#161B22"/>
<text x="82" y="792" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#34D399" font-weight="900">왜 중요한가</text>
<line x1="82" y1="806" x2="${W-82}" y2="806" stroke="#30363D" stroke-width="1"/>
<text x="82" y="844" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">$10.3조는 인터넷 인프라 전체 투자 10년치의 4배</text>
<text x="82" y="880" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">전력망 2배 확장은 전통 유틸리티·원전 재가동 정책 가속</text>
<text x="82" y="916" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">스페이스X 위성 백홀로 데이터센터 지역 분산 가능</text>
<text x="82" y="964" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="1002" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">골드만삭스 — 전력 인프라 수혜 섹터 비중 확대 전망</text>
<text x="82" y="1038" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">모건스탠리 — AI 인프라 과잉 투자 리스크보다 수요 부족 리스크 우세</text>
${footer()}`;
    await save('ai-infra-boom-20261012', svgWrap(inner));
  }

  // ── 12. ai-infra-boom-20261012-en (EN) ────────────────────────────
  {
    const inner = `
${gradBar(['#34D399','#10B981','#34D399'])}
${badge(54, 28, 'AI Infra', '#10B981')}
${badge(54+13*7+24+16, 28, 'Macro', '#6366F1')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="50" fill="#34D399" font-weight="900">AI Infrastructure</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">$10.3T Over 10 Years</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Brookings Institution · Power demand forecast 2×</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 310, 130, '10-Year Capex', '$10.3T', '2024–2034', '#34D399')}
${statCard(384, 276, 310, 130, 'Power Growth', '2×', 'by 2030', '#FBBF24')}
${statCard(714, 276, 312, 130, 'DC Power Share', '3→10%', 'US electricity', '#60A5FA')}
<rect x="54" y="436" width="${W-108}" height="280" rx="20" fill="#161B22" stroke="#34D399" stroke-width="1.5"/>
<text x="82" y="482" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#34D399" font-weight="900">Key Investors</text>
<line x1="82" y1="496" x2="${W-82}" y2="496" stroke="#30363D" stroke-width="1"/>
<text x="82" y="532" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Microsoft $80B · Google $75B · Amazon $105B</text>
<text x="82" y="568" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Meta $65B · SpaceX Starcloud $41.2B (annualized)</text>
<text x="82" y="604" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Nvidia Blackwell GPU demand: 60K → 300K units/quarter</text>
<text x="82" y="640" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Nuclear &amp; LNG back in focus — AI needs reliable baseload power</text>
<text x="82" y="680" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Chip, cooling, and grid infrastructure sectors benefit broadly</text>
<rect x="54" y="744" width="${W-108}" height="310" rx="20" fill="#161B22"/>
<text x="82" y="792" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#34D399" font-weight="900">Why it matters</text>
<line x1="82" y1="806" x2="${W-82}" y2="806" stroke="#30363D" stroke-width="1"/>
<text x="82" y="844" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">$10.3T = 4× the entire 10-year build-out of the internet</text>
<text x="82" y="880" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">2× power grid = nuclear restarts and utility policy fast-tracked</text>
<text x="82" y="916" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">SpaceX satellite backhaul enables distributed data center geography</text>
<text x="82" y="964" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="1002" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Goldman Sachs — overweight power infrastructure beneficiaries</text>
<text x="82" y="1038" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Morgan Stanley — demand shortage risk greater than overinvestment risk</text>
${footer()}`;
    await save('ai-infra-boom-20261012-en', svgWrap(inner));
  }

}

main().catch(console.error);
