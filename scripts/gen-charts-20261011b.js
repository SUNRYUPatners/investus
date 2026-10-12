#!/usr/bin/env node
// SVG chart generator — 2026-10-11 batch 2 (Q3 deliveries, RTX Spark, Reflection AI, SDA, Meta, Google Finland)
// Also regenerates summary-20261011 / -en with all 12 topics
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

function footer() {
  return `<rect x="0" y="${H-72}" width="${W}" height="72" fill="#161B22"/>
<text x="54" y="${H-30}" font-family="Arial Black,Arial,sans-serif" font-size="22" fill="#58A6FF" font-weight="900">investus.kr</text>
<text x="${W-54}" y="${H-30}" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="end">2026.10.11</text>`;
}

async function save(filename, svgContent) {
  const svgPath = path.join(OUT, filename + '.svg');
  const pngPath = path.join(OUT, filename + '.png');
  fs.writeFileSync(svgPath, svgContent, 'utf8');
  await sharp(Buffer.from(svgContent)).png().toFile(pngPath);
  console.log('✓', filename + '.png');
}

async function main() {

  // ── 1. summary-20261011 (KO) — 12 topics ─────────────────────────
  {
    const topics = [
      { num: '1', text: '로드스터 10월 15일 공개 — 콜드가스 스러스터 공중부양 데모 예고', color: '#FF4D6D' },
      { num: '2', text: 'FSD v14.3.11 자동 충돌 회피 — HW4 전용, HW3 Lite 동시 배포', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX Grain 800MHz $80억 인수 — 독립 이통사 AT&amp;T 직접 경쟁', color: '#60A5FA' },
      { num: '4', text: '엔비디아 -6% — OpenAI 순환 파이낸싱 우려, 섹터 1조 달러 증발', color: '#5EEAD4' },
      { num: '5', text: 'Google-SpaceX GPU $304억 계약 — 月 $9.2억, 엔비디아 GPU 11만 기', color: '#60A5FA' },
      { num: '6', text: 'Crew-12 8개월 귀환 / Crew-13 ISS 최단 도킹 7시간 50분', color: '#60A5FA' },
      { num: '7', text: '테슬라 3Q 인도 486,532대 — 예상치 25,000대 초과, 에너지 13.7GWh', color: '#FF4D6D' },
      { num: '8', text: 'MS 서피스 울트라 — 엔비디아 RTX Spark, AI 추론 맥북 M5 대비 2배', color: '#5EEAD4' },
      { num: '9', text: '엔비디아, Reflection AI 인수 협상 — 기업가치 $25B, 기투자 $8억', color: '#5EEAD4' },
      { num:'10', text: 'SpaceX 팔콘9, 美 군사위성 21기 발사 — PWSA 4번째 궤도면 완성', color: '#60A5FA' },
      { num:'11', text: '메타 개인 에이전트 프로토콜 공개 — AI가 콘텐츠 심사 인력 90% 대체', color: '#FB923C' },
      { num:'12', text: '구글 핀란드 데이터센터 공사 중단 — €130억 투자 환경영향평가 장벽', color: '#FCD34D' },
    ];
    const inner = `
${gradBar(['#A855F7','#EC4899','#FF4D6D','#FB923C','#5EEAD4','#60A5FA'])}
${badge(54, 28, '한장요약', '#A855F7')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="48" fill="#fff" font-weight="900">2026.10.11  총 12토픽</text>
<text x="54" y="158" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">테슬라 · 스페이스X · 엔비디아 · 메타 · 구글</text>
<line x1="54" y1="182" x2="${W-54}" y2="182" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = 214 + i * 88;
  const lines = wrapText(t.text, W - 170, 22, 0.58);
  return `<text x="54" y="${y}" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="102" y1="${y-20}" x2="102" y2="${y+12}" stroke="${t.color}" stroke-width="3"/>
${lines.map((l, li) => `<text x="118" y="${y - (lines.length-1-li)*24}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1280" x2="${W-54}" y2="1280" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1310" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">핵심일정: 10.15 로드스터 공개  10.21 테슬라 3Q 실적</text>
${footer()}`;
    await save('summary-20261011', svgWrap(inner));
  }

  // ── 2. summary-20261011-en (EN) — 12 topics ────────────────────
  {
    const topics = [
      { num: '1', text: 'Roadster Oct 15 reveal — cold-gas thruster hover demo teased', color: '#FF4D6D' },
      { num: '2', text: 'FSD v14.3.11 Auto Collision Evasion — HW4 only, HW3 Lite simultaneous', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX $8B 800MHz spectrum buy — standalone carrier vs. AT&amp;T/Verizon', color: '#60A5FA' },
      { num: '4', text: 'Nvidia -6% — OpenAI $250B backstop, circular financing fears', color: '#5EEAD4' },
      { num: '5', text: 'Google-SpaceX $30.4B GPU deal live — $920M/month, 110K GPUs', color: '#60A5FA' },
      { num: '6', text: 'Crew-12 back after 8 months / Crew-13 US record: 7h 50m to ISS', color: '#60A5FA' },
      { num: '7', text: 'Tesla Q3 deliveries 486,532 — beats estimate by 25K, energy 13.7 GWh', color: '#FF4D6D' },
      { num: '8', text: 'Microsoft Surface Ultra — Nvidia RTX Spark, 2x AI vs MacBook Pro M5', color: '#5EEAD4' },
      { num: '9', text: 'Nvidia eyes Reflection AI — $25B valuation, $800M already invested', color: '#5EEAD4' },
      { num:'10', text: 'SpaceX Falcon 9 launches 21 SDA satellites — PWSA 4th orbital plane', color: '#60A5FA' },
      { num:'11', text: 'Meta personal agent protocol — AI to replace 90% of content reviewers', color: '#FB923C' },
      { num:'12', text: 'Google Finland data center halted — €13B plan hits environmental wall', color: '#FCD34D' },
    ];
    const inner = `
${gradBar(['#A855F7','#EC4899','#FF4D6D','#FB923C','#5EEAD4','#60A5FA'])}
${badge(54, 28, 'WEEKLY', '#A855F7')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="48" fill="#fff" font-weight="900">OCT 11, 2026  12 TOPICS</text>
<text x="54" y="158" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Tesla · SpaceX · Nvidia · Meta · Google</text>
<line x1="54" y1="182" x2="${W-54}" y2="182" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = 214 + i * 88;
  const lines = wrapText(t.text, W - 170, 22, 0.58);
  return `<text x="54" y="${y}" font-family="Arial Black,Arial,sans-serif" font-size="32" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="102" y1="${y-20}" x2="102" y2="${y+12}" stroke="${t.color}" stroke-width="3"/>
${lines.map((l, li) => `<text x="118" y="${y - (lines.length-1-li)*24}" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1280" x2="${W-54}" y2="1280" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1310" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Watch: Oct 15 Roadster reveal  |  Oct 21 Tesla Q3 earnings</text>
${footer()}`;
    await save('summary-20261011-en', svgWrap(inner));
  }

  // ── 3. tsla-q3-deliveries-20261011 (KO) ──────────────────────────
  {
    const bars = [
      { label: 'Q3 2025', val: 497099, pct: 100 },
      { label: 'Q2 2026', val: 480126, pct: 96.6 },
      { label: 'Q3 2026', val: 486532, pct: 97.9 },
    ];
    const bw = W - 108;
    const barH = 60;
    const inner = `
${gradBar(['#FF4D6D','#FF1A40','#FF6B35'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
<text x="${W/2}" y="135" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#FF4D6D" text-anchor="middle" font-weight="900">486K</text>
<text x="${W/2}" y="200" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">3분기 차량 인도</text>
<text x="${W/2}" y="248" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">월가 예상치(461,974대) 대비 +5.3%</text>
<line x1="54" y1="276" x2="${W-54}" y2="276" stroke="#30363D" stroke-width="2"/>

${bars.map((b, i) => {
  const y = 310 + i * 110;
  const fillW = Math.round(b.pct / 100 * (bw - 180));
  const isHero = i === 2;
  return `<text x="54" y="${y+40}" font-family="Arial,sans-serif" font-size="22" fill="${isHero ? '#FF4D6D' : '#8B949E'}">${b.label}</text>
<rect x="54" y="${y+50}" width="${bw - 180}" height="${barH}" rx="8" fill="#161B22"/>
<rect x="54" y="${y+50}" width="${fillW}" height="${barH}" rx="8" fill="${isHero ? '#FF4D6D' : '#30363D'}"/>
<text x="${bw - 118}" y="${y+89}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="${isHero ? '#fff' : '#8B949E'}" font-weight="900">${b.val.toLocaleString()}</text>`;
}).join('\n')}

<rect x="54" y="660" width="${bw}" height="2" fill="#30363D"/>
<text x="54" y="700" font-family="Arial,sans-serif" font-size="22" fill="#FCD34D">예상치 461,974 ─────── 예상 초과 △24,558대</text>

${statCard(54, 740, 300, 140, '에너지 저장', '13.7GWh', '분기 최대', '#FF4D6D')}
${statCard(390, 740, 300, 140, 'QoQ 변화', '+1.3%', '2Q 480,126대 대비', '#FF8C42')}
${statCard(726, 740, 300, 140, 'YoY 변화', '-2.1%', '25Q3 497,099대 대비', '#8B949E')}

<rect x="54" y="918" width="${bw}" height="228" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="964" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">10월 21일 실적 관전 포인트</text>
<text x="84" y="1010" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• 차량 부문 총이익률 — 18.2% 회복 여부</text>
<text x="84" y="1054" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• FSD 구독자 수 첫 공개 가능성</text>
<text x="84" y="1098" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• 메가팩 수요 가이던스 업데이트</text>
<text x="84" y="1130" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 10월 21일 (수) 3분기 어닝 콜 예정</text>

<rect x="54" y="1178" width="${bw}" height="100" rx="16" fill="#1A1F2E" stroke="#FF4D6D" stroke-width="2"/>
<text x="${W/2}" y="1226" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">웨드부시 $600 목표  ·  MS 강세 $840</text>
<text x="${W/2}" y="1264" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">마진 18% 상회 시 웨드부시 목표가 재조정 시사</text>

${footer()}`;
    await save('tsla-q3-deliveries-20261011', svgWrap(inner));
  }

  // ── 4. tsla-q3-deliveries-20261011-en ────────────────────────────
  {
    const bars = [
      { label: 'Q3 2025', val: 497099, pct: 100 },
      { label: 'Q2 2026', val: 480126, pct: 96.6 },
      { label: 'Q3 2026', val: 486532, pct: 97.9 },
    ];
    const bw = W - 108;
    const barH = 60;
    const inner = `
${gradBar(['#FF4D6D','#FF1A40','#FF6B35'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
<text x="${W/2}" y="135" font-family="Arial Black,Arial,sans-serif" font-size="108" fill="#FF4D6D" text-anchor="middle" font-weight="900">486K</text>
<text x="${W/2}" y="200" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">Q3 DELIVERIES</text>
<text x="${W/2}" y="248" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Beat consensus (461,974) by +5.3%</text>
<line x1="54" y1="276" x2="${W-54}" y2="276" stroke="#30363D" stroke-width="2"/>

${bars.map((b, i) => {
  const y = 310 + i * 110;
  const fillW = Math.round(b.pct / 100 * (bw - 180));
  const isHero = i === 2;
  return `<text x="54" y="${y+40}" font-family="Arial,sans-serif" font-size="22" fill="${isHero ? '#FF4D6D' : '#8B949E'}">${b.label}</text>
<rect x="54" y="${y+50}" width="${bw - 180}" height="${barH}" rx="8" fill="#161B22"/>
<rect x="54" y="${y+50}" width="${fillW}" height="${barH}" rx="8" fill="${isHero ? '#FF4D6D' : '#30363D'}"/>
<text x="${bw - 118}" y="${y+89}" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="${isHero ? '#fff' : '#8B949E'}" font-weight="900">${b.val.toLocaleString()}</text>`;
}).join('\n')}

<rect x="54" y="660" width="${bw}" height="2" fill="#30363D"/>
<text x="54" y="700" font-family="Arial,sans-serif" font-size="22" fill="#FCD34D">Consensus 461,974 ─── Beat by △24,558 vehicles</text>

${statCard(54, 740, 300, 140, 'ENERGY', '13.7GWh', 'Quarterly record', '#FF4D6D')}
${statCard(390, 740, 300, 140, 'QoQ', '+1.3%', 'vs Q2 480,126', '#FF8C42')}
${statCard(726, 740, 300, 140, 'YoY', '-2.1%', 'vs Q3\'25 497,099', '#8B949E')}

<rect x="54" y="918" width="${bw}" height="228" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="964" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">OCT 21 EARNINGS WATCH</text>
<text x="84" y="1010" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• Vehicle gross margin — can it recover to 18.2%?</text>
<text x="84" y="1054" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• FSD subscriber count — first public disclosure?</text>
<text x="84" y="1098" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• Megapack demand guidance for 2027</text>
<text x="84" y="1130" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 October 21 (Wed) Q3 earnings call</text>

<rect x="54" y="1178" width="${bw}" height="100" rx="16" fill="#1A1F2E" stroke="#FF4D6D" stroke-width="2"/>
<text x="${W/2}" y="1226" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">Wedbush $600  ·  Morgan Stanley bull $840</text>
<text x="${W/2}" y="1264" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Wedbush hints upward revision if margin &gt;18%</text>

${footer()}`;
    await save('tsla-q3-deliveries-20261011-en', svgWrap(inner));
  }

  // ── 5. msft-surface-rtx-spark-20261011 (KO) ──────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#5EEAD4','#22D3EE','#93C5FD'])}
${badge(54, 28, 'NVDA', '#5EEAD4', '#000')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="90" fill="#5EEAD4" text-anchor="middle" font-weight="900">RTX Spark</text>
<text x="${W/2}" y="200" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">MS 서피스 울트라 탑재</text>
<text x="${W/2}" y="250" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">엔비디아 AI PC 칩 — 10월 7일 발표</text>
<line x1="54" y1="278" x2="${W-54}" y2="278" stroke="#30363D" stroke-width="2"/>

<text x="54" y="328" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" font-weight="900">AI 추론 성능 비교</text>
<rect x="54" y="344" width="${bw}" height="80" rx="12" fill="#161B22"/>
<rect x="54" y="344" width="${Math.round(bw * 0.5)}" height="80" rx="12" fill="#30363D"/>
<text x="54" y="392" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">  MacBook Pro M5  (1×)</text>
<rect x="54" y="444" width="${bw}" height="80" rx="12" fill="#161B22"/>
<rect x="54" y="444" width="${bw}" height="80" rx="12" fill="#5EEAD4" opacity="0.2"/>
<rect x="54" y="444" width="${bw}" height="80" rx="12" fill="none" stroke="#5EEAD4" stroke-width="2"/>
<text x="74" y="492" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#5EEAD4" font-weight="900">  서피스 울트라  2× 빠름</text>

<text x="54" y="564" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" font-weight="900">영상 생성 성능 비교</text>
<rect x="54" y="580" width="${Math.round(bw / 6)}" height="70" rx="12" fill="#30363D"/>
<text x="${54 + Math.round(bw/12)}" y="622" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle">M5</text>
<rect x="54" y="668" width="${bw}" height="70" rx="12" fill="#5EEAD4" opacity="0.2"/>
<rect x="54" y="668" width="${bw}" height="70" rx="12" fill="none" stroke="#5EEAD4" stroke-width="2"/>
<text x="${W/2}" y="710" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#5EEAD4" text-anchor="middle" font-weight="900">서피스 울트라  6× 빠름</text>

${statCard(54, 768, 300, 140, '기본 가격', '$2,599', 'N1X CPU + RTX GPU', '#5EEAD4')}
${statCard(390, 768, 300, 140, '최상위 구성', '$5,899', '128GB 통합 메모리', '#93C5FD')}
${statCard(726, 768, 300, 140, '출하 시작', 'OCT 16', '사전 주문 개시', '#22D3EE')}

<rect x="54" y="940" width="${bw}" height="220" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="986" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">엔비디아 전략 의미</text>
<text x="84" y="1028" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• 데이터센터 → PC 시장 동시 수요 기반 확장</text>
<text x="84" y="1068" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• RTX Spark = 수십 와트 로컬 AI 추론 전용 칩</text>
<text x="84" y="1108" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• 메타 Muse 에이전트 윈도우 전용 앱 동시 출시</text>
<text x="84" y="1142" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 10월 16일 출하 → 초기 수요 데이터 관찰</text>

<rect x="54" y="1192" width="${bw}" height="86" rx="16" fill="#1A1F2E" stroke="#5EEAD4" stroke-width="2"/>
<text x="${W/2}" y="1238" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">시티: 매출 다각화 긍정적 — 목표주가 $315 유지</text>
<text x="${W/2}" y="1268" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">MS 수요 실적 확인 전 PC 매출 기여분 추정 보수적</text>

${footer()}`;
    await save('msft-surface-rtx-spark-20261011', svgWrap(inner));
  }

  // ── 6. msft-surface-rtx-spark-20261011-en ────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#5EEAD4','#22D3EE','#93C5FD'])}
${badge(54, 28, 'NVDA', '#5EEAD4', '#000')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="90" fill="#5EEAD4" text-anchor="middle" font-weight="900">RTX Spark</text>
<text x="${W/2}" y="200" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">Microsoft Surface Ultra</text>
<text x="${W/2}" y="250" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Nvidia AI PC chip — revealed Oct 7, ships Oct 16</text>
<line x1="54" y1="278" x2="${W-54}" y2="278" stroke="#30363D" stroke-width="2"/>

<text x="54" y="328" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" font-weight="900">AI Inference Speed vs MacBook Pro M5</text>
<rect x="54" y="344" width="${Math.round((W-108) * 0.5)}" height="80" rx="12" fill="#30363D"/>
<text x="74" y="392" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">MacBook Pro M5  (baseline 1×)</text>
<rect x="54" y="444" width="${W-108}" height="80" rx="12" fill="#5EEAD4" opacity="0.2"/>
<rect x="54" y="444" width="${W-108}" height="80" rx="12" fill="none" stroke="#5EEAD4" stroke-width="2"/>
<text x="74" y="492" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#5EEAD4" font-weight="900">Surface Ultra  2× FASTER</text>

<text x="54" y="564" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" font-weight="900">Video Generation Speed</text>
<rect x="54" y="580" width="${Math.round((W-108) / 6)}" height="70" rx="12" fill="#30363D"/>
<text x="${54 + Math.round((W-108)/12)}" y="622" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle">M5</text>
<rect x="54" y="668" width="${W-108}" height="70" rx="12" fill="#5EEAD4" opacity="0.2"/>
<rect x="54" y="668" width="${W-108}" height="70" rx="12" fill="none" stroke="#5EEAD4" stroke-width="2"/>
<text x="${W/2}" y="710" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#5EEAD4" text-anchor="middle" font-weight="900">Surface Ultra  6× FASTER</text>

${statCard(54, 768, 300, 140, 'BASE PRICE', '$2,599', '24GB/512GB config', '#5EEAD4')}
${statCard(390, 768, 300, 140, 'TOP CONFIG', '$5,899', '128GB unified RAM', '#93C5FD')}
${statCard(726, 768, 300, 140, 'SHIPS', 'OCT 16', 'Pre-orders live', '#22D3EE')}

<rect x="54" y="940" width="${bw}" height="220" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="986" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">NVIDIA STRATEGIC SIGNIFICANCE</text>
<text x="84" y="1028" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• Expands beyond data center into PC revenue stream</text>
<text x="84" y="1068" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• RTX Spark: local LLM inference at tens of watts</text>
<text x="84" y="1108" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">• Meta Muse personal agent ships as Windows app</text>
<text x="84" y="1142" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 Ships Oct 16 — watch early demand signal</text>

<rect x="54" y="1192" width="${bw}" height="86" rx="16" fill="#1A1F2E" stroke="#5EEAD4" stroke-width="2"/>
<text x="${W/2}" y="1238" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">Citi: revenue diversification positive — PT $315</text>
<text x="${W/2}" y="1268" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Morgan Stanley holds PC contribution estimate conservative</text>

${footer()}`;
    await save('msft-surface-rtx-spark-20261011-en', svgWrap(inner));
  }

  // ── 7. nvda-reflection-ai-20261011 (KO) ──────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#5EEAD4','#22D3EE','#A855F7'])}
${badge(54, 28, 'NVDA', '#5EEAD4', '#000')}
<text x="${W/2}" y="120" font-family="Arial Black,Arial,sans-serif" font-size="90" fill="#5EEAD4" text-anchor="middle" font-weight="900">$25B</text>
<text x="${W/2}" y="190" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="#fff" text-anchor="middle" font-weight="900">Reflection AI 인수 협상</text>
<text x="${W/2}" y="240" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">기업가치 25조 원 · 딥마인드 출신 창업</text>
<line x1="54" y1="268" x2="${W-54}" y2="268" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="288" width="${bw}" height="220" rx="16" fill="#161B22" stroke="#5EEAD4" stroke-width="1.5"/>
<text x="${W/2}" y="334" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">Reflection AI 프로필</text>
<text x="84" y="374" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">창업: 2024년 · 전 딥마인드 연구원 미샤 라스킨</text>
<text x="84" y="414" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">기업가치: 2026년 3월 $250억 (한화 약 34조 원)</text>
<text x="84" y="454" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">모델: Beam — 오픈웨이트 기업용 LLM 출시</text>
<text x="84" y="490" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">엔비디아 기투자: $8억 달러 (주요 전략 투자자)</text>

${statCard(54, 534, 300, 140, '기투자', '$8억', '엔비디아 기존 지분', '#5EEAD4')}
${statCard(390, 534, 300, 140, '기업가치', '$25B', '2026.03 라운드', '#22D3EE')}
${statCard(726, 534, 300, 140, '타임라인', '수주 내', 'FT 보도 기준', '#A855F7')}

<rect x="54" y="706" width="${bw}" height="200" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="752" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">딜 구조 시나리오</text>
<text x="84" y="792" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">① 완전 인수 — 규제 심사 수개월 소요 예상</text>
<text x="84" y="832" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">② 인재 확보형(acqui-hire) — 빠른 완료 가능</text>
<text x="84" y="868" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">미국 법무부 칩 독점 조사 병행 중 — ②가 유력</text>
<text x="84" y="900" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 수주 내 구조 확정 예상 (FT 인용)</text>

<rect x="54" y="934" width="${bw}" height="190" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="978" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">전략 의미</text>
<text x="84" y="1016" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">오픈웨이트 모델 → 온프레미스 GPU 수요 증가</text>
<text x="84" y="1056" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">칩 벤더에서 AI 플랫폼 기업으로 포지션 전환</text>
<text x="84" y="1094" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Beam 채택 기업들의 GPU 수요도 엔비디아에 귀속</text>
<text x="84" y="1120" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">골드만 EU 독점 우려 경고 · 목표주가 $290</text>

<rect x="54" y="1154" width="${bw}" height="122" rx="16" fill="#1A1F2E" stroke="#5EEAD4" stroke-width="2"/>
<text x="${W/2}" y="1196" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#fff" text-anchor="middle">시티 $315 목표  ·  딜 확정 시 재평가 가능</text>
<text x="${W/2}" y="1236" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">칩 공급 + 모델 개발 동시 장악 → EU 심사 리스크</text>
<text x="${W/2}" y="1268" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle">거래 구조 확정 전까지 골드만 보수적 시각 유지</text>

${footer()}`;
    await save('nvda-reflection-ai-20261011', svgWrap(inner));
  }

  // ── 8. nvda-reflection-ai-20261011-en ────────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#5EEAD4','#22D3EE','#A855F7'])}
${badge(54, 28, 'NVDA', '#5EEAD4', '#000')}
<text x="${W/2}" y="120" font-family="Arial Black,Arial,sans-serif" font-size="90" fill="#5EEAD4" text-anchor="middle" font-weight="900">$25B</text>
<text x="${W/2}" y="190" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="#fff" text-anchor="middle" font-weight="900">Reflection AI Deal Talks</text>
<text x="${W/2}" y="240" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Ex-DeepMind founders · $800M already invested</text>
<line x1="54" y1="268" x2="${W-54}" y2="268" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="288" width="${bw}" height="220" rx="16" fill="#161B22" stroke="#5EEAD4" stroke-width="1.5"/>
<text x="${W/2}" y="334" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">REFLECTION AI PROFILE</text>
<text x="84" y="374" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Founded 2024 · Misha Laskin (ex-DeepMind)</text>
<text x="84" y="414" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Valuation: $25B (March 2026 funding round)</text>
<text x="84" y="454" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Product: Beam — open-weight enterprise LLM</text>
<text x="84" y="490" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Nvidia existing stake: $800M (lead strategic investor)</text>

${statCard(54, 534, 300, 140, 'INVESTED', '$800M', 'Nvidia current stake', '#5EEAD4')}
${statCard(390, 534, 300, 140, 'VALUATION', '$25B', 'March 2026 round', '#22D3EE')}
${statCard(726, 534, 300, 140, 'TIMELINE', 'Weeks', 'Per FT sources', '#A855F7')}

<rect x="54" y="706" width="${bw}" height="200" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="752" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">DEAL STRUCTURE SCENARIOS</text>
<text x="84" y="792" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">① Full acquisition — months of antitrust review</text>
<text x="84" y="832" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">② Acqui-hire — faster close, avoids full review</text>
<text x="84" y="868" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">DOJ chip monopoly probe ongoing — ② more likely</text>
<text x="84" y="900" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 Deal structure expected within weeks</text>

<rect x="54" y="934" width="${bw}" height="190" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="978" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#5EEAD4" text-anchor="middle" font-weight="900">STRATEGIC SIGNIFICANCE</text>
<text x="84" y="1016" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Open-weight Beam drives on-prem GPU demand</text>
<text x="84" y="1056" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Shifts Nvidia from chip vendor to AI platform</text>
<text x="84" y="1094" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Beam enterprise adopters still buy Nvidia GPUs</text>
<text x="84" y="1120" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Goldman warns EU antitrust risk · PT $290</text>

<rect x="54" y="1154" width="${bw}" height="122" rx="16" fill="#1A1F2E" stroke="#5EEAD4" stroke-width="2"/>
<text x="${W/2}" y="1196" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#fff" text-anchor="middle">Citi PT $315  ·  re-rate possible on deal close</text>
<text x="${W/2}" y="1236" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Chip + model control raises EU structural concern</text>
<text x="${W/2}" y="1268" font-family="Arial,sans-serif" font-size="20" fill="#8B949E" text-anchor="middle">Goldman stays conservative until deal terms confirmed</text>

${footer()}`;
    await save('nvda-reflection-ai-20261011-en', svgWrap(inner));
  }

  // ── 9. spacex-sda-20261011 (KO) ──────────────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#60A5FA','#3B82F6','#1D4ED8'])}
${badge(54, 28, 'SPCX', '#60A5FA')}
<text x="${W/2}" y="125" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#60A5FA" text-anchor="middle" font-weight="900">21기</text>
<text x="${W/2}" y="198" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="#fff" text-anchor="middle" font-weight="900">미군 SDA 위성 발사 성공</text>
<text x="${W/2}" y="248" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">밴든버그 · 10월 10일 · PWSA 4번째 궤도면 완성</text>
<line x1="54" y1="276" x2="${W-54}" y2="276" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="296" width="${bw}" height="260" rx="16" fill="#161B22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="${W/2}" y="342" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#60A5FA" text-anchor="middle" font-weight="900">PWSA — 증식전투우주구조</text>
<text x="84" y="384" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">저궤도 광학링크 메시 위성 네트워크</text>
<text x="84" y="422" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">전 세계 군사 전술 통신 + 미사일 경보·추적</text>
<text x="84" y="460" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">노스럽그루먼 제작 데이터 전송 위성 21기</text>
<text x="84" y="498" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">10월 4일 스크럽(자동 시퀀스 직전 중단) → 5일 후 성공</text>
<text x="84" y="534" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">팔콘9 1단 해상 드론쉽 착륙·회수 완료</text>

${statCard(54, 586, 300, 140, '발사 위성', '21기', 'SDA 전송 위성', '#60A5FA')}
${statCard(390, 586, 300, 140, '궤도면', '4/N', 'PWSA 4번째 완성', '#3B82F6')}
${statCard(726, 586, 300, 140, '2026 발사', '51회', '팔콘9 누적', '#1D4ED8')}

<rect x="54" y="758" width="${bw}" height="190" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="804" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#60A5FA" text-anchor="middle" font-weight="900">계약 구조</text>
<text x="84" y="844" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">발사당 추정 단가: $7,000만~$9,000만 달러</text>
<text x="84" y="884" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">2026~2027년 추가 트란체 발사 예정</text>
<text x="84" y="924" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">재사용 횟수 증가 → 발사당 원가 지속 하락</text>
<text x="84" y="942" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 USSF-481 다음 예정 (10월 15일 전후)</text>

<rect x="54" y="978" width="${bw}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1022" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#60A5FA" text-anchor="middle" font-weight="900">IPO 시사점</text>
<text x="84" y="1062" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">군사 계약 수주 능력 추가 증거</text>
<text x="84" y="1102" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">발사 횟수 51회 → S-1 운용 실적 섹션 강화</text>
<text x="84" y="1142" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">발사 수익·위성 수·군용 계약 동시 개선</text>

<rect x="54" y="1178" width="${bw}" height="100" rx="16" fill="#1A1F2E" stroke="#60A5FA" stroke-width="2"/>
<text x="${W/2}" y="1224" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">IPO 전 밸류에이션 $90B~$110B 구간 상단 압력</text>
<text x="${W/2}" y="1262" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">아크: 군용 매출 비중↑ → 상장 후 주가 안정성↑</text>

${footer()}`;
    await save('spacex-sda-20261011', svgWrap(inner));
  }

  // ── 10. spacex-sda-20261011-en ────────────────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#60A5FA','#3B82F6','#1D4ED8'])}
${badge(54, 28, 'SPCX', '#60A5FA')}
<text x="${W/2}" y="125" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#60A5FA" text-anchor="middle" font-weight="900">21 SATS</text>
<text x="${W/2}" y="198" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="#fff" text-anchor="middle" font-weight="900">SDA SATELLITE LAUNCH</text>
<text x="${W/2}" y="248" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Vandenberg · Oct 10 · PWSA 4th orbital plane</text>
<line x1="54" y1="276" x2="${W-54}" y2="276" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="296" width="${bw}" height="260" rx="16" fill="#161B22" stroke="#60A5FA" stroke-width="1.5"/>
<text x="${W/2}" y="342" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#60A5FA" text-anchor="middle" font-weight="900">PWSA — Proliferated Warfighter Space Architecture</text>
<text x="84" y="384" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Low-orbit mesh network via optical links</text>
<text x="84" y="422" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Global military tactical comms + missile warning</text>
<text x="84" y="460" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">21 data transport satellites by Northrop Grumman</text>
<text x="84" y="498" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Oct 4 scrub (automated sequence abort) → success Oct 10</text>
<text x="84" y="534" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Falcon 9 booster landed on droneship successfully</text>

${statCard(54, 586, 300, 140, 'LAUNCHED', '21 SATS', 'SDA data transport', '#60A5FA')}
${statCard(390, 586, 300, 140, 'PLANES', '4 DONE', 'PWSA 4th orbital', '#3B82F6')}
${statCard(726, 586, 300, 140, 'F9 LAUNCHES', '51 in 2026', 'cumulative count', '#1D4ED8')}

<rect x="54" y="758" width="${bw}" height="190" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="804" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#60A5FA" text-anchor="middle" font-weight="900">CONTRACT ECONOMICS</text>
<text x="84" y="844" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Estimated ~$70M–$90M per Falcon 9 launch</text>
<text x="84" y="884" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Additional tranches scheduled 2026–2027</text>
<text x="84" y="924" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Higher reuse count → lower per-launch cost</text>
<text x="84" y="942" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 USSF-481 next (around Oct 15)</text>

<rect x="54" y="978" width="${bw}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1022" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#60A5FA" text-anchor="middle" font-weight="900">IPO IMPLICATIONS</text>
<text x="84" y="1062" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">More proof of military contract execution ability</text>
<text x="84" y="1102" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">51 F9 launches strengthen S-1 operations section</text>
<text x="84" y="1142" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Launch revenue + satellite count + DoD contracts all rising</text>

<rect x="54" y="1178" width="${bw}" height="100" rx="16" fill="#1A1F2E" stroke="#60A5FA" stroke-width="2"/>
<text x="${W/2}" y="1224" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">Pre-IPO range $90B–$110B upper-end pressure</text>
<text x="${W/2}" y="1262" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">ARK: higher DoD % → post-IPO price stability rises</text>

${footer()}`;
    await save('spacex-sda-20261011-en', svgWrap(inner));
  }

  // ── 11. meta-agent-protocol-20261011 (KO) ────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#FB923C','#F97316','#EA580C'])}
${badge(54, 28, 'META', '#FB923C')}
<text x="${W/2}" y="120" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FB923C" text-anchor="middle" font-weight="900">90%</text>
<text x="${W/2}" y="192" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">콘텐츠 심사 AI 대체</text>
<text x="${W/2}" y="244" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">개인 에이전트 프로토콜 동시 공개 · 2026년 연말 목표</text>
<line x1="54" y1="272" x2="${W-54}" y2="272" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="292" width="${bw}" height="220" rx="16" fill="#161B22" stroke="#FB923C" stroke-width="1.5"/>
<text x="${W/2}" y="338" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FB923C" text-anchor="middle" font-weight="900">조직 재편 수치</text>
<text x="84" y="380" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">⬇ 8,000명 정리</text>
<text x="84" y="420" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">↗ 7,000명 AI 프로젝트 재배치</text>
<text x="84" y="460" font-family="Arial,sans-serif" font-size="26" fill="#FB923C">90% 콘텐츠 심사 인력 AI 자동화 (2026 연말)</text>
<text x="84" y="500" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">콘텐츠 심사 인건비 연간 $15억~$20억 → AI 전환</text>

${statCard(54, 540, 300, 140, '해고', '8,000명', '조직 슬림화', '#FB923C')}
${statCard(390, 540, 300, 140, 'AI재배치', '7,000명', 'AI 기반 프로젝트', '#F97316')}
${statCard(726, 540, 300, 140, '심사 AI화', '90%', '연말까지 목표', '#EA580C')}

<rect x="54" y="712" width="${bw}" height="240" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="758" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FB923C" text-anchor="middle" font-weight="900">개인 에이전트 프로토콜(PAP)</text>
<text x="84" y="798" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">메타 + 월마트 + 스트라이프 공동 발표</text>
<text x="84" y="838" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">AI 에이전트 ↔ 비즈니스 상호작용 개방형 표준</text>
<text x="84" y="878" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">쇼핑·결제·예약 데이터 → 광고 타겟팅 확장</text>
<text x="84" y="918" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">구글 쇼핑 광고와 경쟁하는 신규 광고 상품 기반</text>
<text x="84" y="946" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 광고주 AI 도구 구글 워크스페이스 연동 출시</text>

<rect x="54" y="980" width="${bw}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1026" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FB923C" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="84" y="1066" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">모건스탠리: 2027년 영업이익률 45% 초과 가능</text>
<text x="84" y="1106" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">에버코어ISI: PAP → 광고 데이터 네트워크 확장</text>
<text x="84" y="1144" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">모건스탠리 목표주가 $650 · 에버코어 $680</text>

<rect x="54" y="1180" width="${bw}" height="98" rx="16" fill="#1A1F2E" stroke="#FB923C" stroke-width="2"/>
<text x="${W/2}" y="1226" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">비용 절감 + 에이전트 광고 수익 동시 반영</text>
<text x="${W/2}" y="1264" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">AI 심사 오탐률 관리가 규제 리스크 핵심 변수</text>

${footer()}`;
    await save('meta-agent-protocol-20261011', svgWrap(inner));
  }

  // ── 12. meta-agent-protocol-20261011-en ──────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#FB923C','#F97316','#EA580C'])}
${badge(54, 28, 'META', '#FB923C')}
<text x="${W/2}" y="120" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FB923C" text-anchor="middle" font-weight="900">90%</text>
<text x="${W/2}" y="192" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">CONTENT REVIEW AI SHIFT</text>
<text x="${W/2}" y="244" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Personal Agent Protocol launch · Target: end of 2026</text>
<line x1="54" y1="272" x2="${W-54}" y2="272" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="292" width="${bw}" height="220" rx="16" fill="#161B22" stroke="#FB923C" stroke-width="1.5"/>
<text x="${W/2}" y="338" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FB923C" text-anchor="middle" font-weight="900">WORKFORCE RESTRUCTURING</text>
<text x="84" y="380" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">⬇ 8,000 employees laid off</text>
<text x="84" y="420" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">↗ 7,000 reassigned to AI projects</text>
<text x="84" y="460" font-family="Arial,sans-serif" font-size="26" fill="#FB923C">90% content review → AI automation by year-end</text>
<text x="84" y="500" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Content review labor cost ~$1.5B–$2B/yr → AI shift</text>

${statCard(54, 540, 300, 140, 'LAID OFF', '8,000', 'Cost reduction', '#FB923C')}
${statCard(390, 540, 300, 140, 'AI REORG', '7,000', 'Moved to AI roles', '#F97316')}
${statCard(726, 540, 300, 140, 'REVIEW AI', '90%', 'By end of 2026', '#EA580C')}

<rect x="54" y="712" width="${bw}" height="240" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="758" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FB923C" text-anchor="middle" font-weight="900">PERSONAL AGENT PROTOCOL (PAP)</text>
<text x="84" y="798" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Meta + Walmart + Stripe co-authored open standard</text>
<text x="84" y="838" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Defines AI agent ↔ business service interaction</text>
<text x="84" y="878" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Shopping/payment data → ad targeting expansion</text>
<text x="84" y="918" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Positions Meta to compete with Google Shopping ads</text>
<text x="84" y="946" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">📅 Advertiser AI tools with Workspace integration now live</text>

<rect x="54" y="980" width="${bw}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1026" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FB923C" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="84" y="1066" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Morgan Stanley: 2027 op. margin can exceed 45%</text>
<text x="84" y="1106" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Evercore ISI: PAP expands ad data network moat</text>
<text x="84" y="1144" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Morgan Stanley PT $650  ·  Evercore PT $680</text>

<rect x="54" y="1180" width="${bw}" height="98" rx="16" fill="#1A1F2E" stroke="#FB923C" stroke-width="2"/>
<text x="${W/2}" y="1226" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">Cost cuts + agent ad revenue = margin expansion</text>
<text x="${W/2}" y="1264" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">AI review false-positive rate = key regulatory risk</text>

${footer()}`;
    await save('meta-agent-protocol-20261011-en', svgWrap(inner));
  }

  // ── 13. google-finland-20261011 (KO) ─────────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#FCD34D','#F59E0B','#D97706'])}
${badge(54, 28, 'GOOGL', '#FCD34D', '#000')}
<text x="${W/2}" y="120" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#FCD34D" text-anchor="middle" font-weight="900">€13B</text>
<text x="${W/2}" y="196" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">핀란드 공사 즉각 중단</text>
<text x="${W/2}" y="248" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">환경영향평가 미완료 · 300헥타르 산림 벌채 혐의</text>
<line x1="54" y1="276" x2="${W-54}" y2="276" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="296" width="${bw}" height="240" rx="16" fill="#161B22" stroke="#FCD34D" stroke-width="1.5"/>
<text x="${W/2}" y="342" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FCD34D" text-anchor="middle" font-weight="900">타임라인</text>
<text x="84" y="382" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026년 9월 ─── 구글, 핀란드 €130억 투자 발표</text>
<text x="84" y="426" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">2026.10.07 ─── 핀란드 LVV 공사 즉각 중단 명령</text>
<text x="84" y="470" font-family="Arial,sans-serif" font-size="24" fill="#FCD34D">EIA 완료까지 ─── 추정 6~18개월 소요</text>
<text x="84" y="514" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">부지: 북핀란드 무오스 + 카야니 2곳</text>

${statCard(54, 564, 300, 140, '투자 계획', '€130억', '유럽 최대 단일', '#FCD34D')}
${statCard(390, 564, 300, 140, '벌채 면적', '300ha+', '741에이커 산림', '#F59E0B')}
${statCard(726, 564, 300, 140, 'EIA 소요', '6~18개월', '추정 지연 기간', '#D97706')}

<rect x="54" y="736" width="${bw}" height="230" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="782" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FCD34D" text-anchor="middle" font-weight="900">유럽 데이터센터 규제 패턴</text>
<text x="84" y="822" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">아일랜드 — 전력망 용량 부족 → 신규 제한</text>
<text x="84" y="860" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">네덜란드 — 전력 부족 + 물 사용 규제</text>
<text x="84" y="898" font-family="Arial,sans-serif" font-size="23" fill="#FCD34D">핀란드 — 환경영향평가 절차 위반 → 공사 중단</text>
<text x="84" y="938" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">유럽 AI 인프라 확장 속도에 구조적 상한선 형성 중</text>
<text x="84" y="958" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">핀란드: 차가운 기후 + 재생에너지 85% 비중 선택 이유</text>

<rect x="54" y="994" width="${bw}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1040" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FCD34D" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="84" y="1078" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">알파벳 애널: CAPEX $500억 가이던스 내 재조정 가능</text>
<text x="84" y="1116" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">번스타인: 유럽 내 공급 증가 속도 구조적 제한</text>
<text x="84" y="1154" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">알파벳 목표주가 $210 수준 유지</text>

<rect x="54" y="1202" width="${bw}" height="76" rx="16" fill="#1A1F2E" stroke="#FCD34D" stroke-width="2"/>
<text x="${W/2}" y="1248" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">미국 클라우드 리전 중심 AI 지속 → 유럽 지연 리스크</text>

${footer()}`;
    await save('google-finland-20261011', svgWrap(inner));
  }

  // ── 14. google-finland-20261011-en ───────────────────────────────
  {
    const bw = W - 108;
    const inner = `
${gradBar(['#FCD34D','#F59E0B','#D97706'])}
${badge(54, 28, 'GOOGL', '#FCD34D', '#000')}
<text x="${W/2}" y="120" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#FCD34D" text-anchor="middle" font-weight="900">€13B</text>
<text x="${W/2}" y="196" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" text-anchor="middle" font-weight="900">FINLAND CONSTRUCTION HALT</text>
<text x="${W/2}" y="248" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">EIA not completed · 300+ ha of forest cleared</text>
<line x1="54" y1="276" x2="${W-54}" y2="276" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="296" width="${bw}" height="240" rx="16" fill="#161B22" stroke="#FCD34D" stroke-width="1.5"/>
<text x="${W/2}" y="342" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FCD34D" text-anchor="middle" font-weight="900">TIMELINE</text>
<text x="84" y="382" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">Sept 2026 ─── Google announces €13B Finland investment</text>
<text x="84" y="426" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">Oct 07 2026 ─── Finnish LVV orders immediate halt</text>
<text x="84" y="470" font-family="Arial,sans-serif" font-size="24" fill="#FCD34D">Until EIA complete ─── estimated 6–18 months delay</text>
<text x="84" y="514" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Sites: Muhos + Kajaani in northern Finland</text>

${statCard(54, 564, 300, 140, 'INVESTMENT', '€13B', "Google's largest EU deal", '#FCD34D')}
${statCard(390, 564, 300, 140, 'CLEARED', '300ha+', '741 acres of forest', '#F59E0B')}
${statCard(726, 564, 300, 140, 'EIA DELAY', '6–18mo', 'Estimated duration', '#D97706')}

<rect x="54" y="736" width="${bw}" height="230" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="782" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FCD34D" text-anchor="middle" font-weight="900">EUROPE DATA CENTER PATTERN</text>
<text x="84" y="822" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Ireland — grid capacity shortfall → new limits</text>
<text x="84" y="860" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Netherlands — power + water usage restrictions</text>
<text x="84" y="898" font-family="Arial,sans-serif" font-size="23" fill="#FCD34D">Finland — EIA violation → construction halted</text>
<text x="84" y="938" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Structural ceiling forming on EU AI infra expansion rate</text>
<text x="84" y="958" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Finland chosen for cold climate + 85% renewables mix</text>

<rect x="54" y="994" width="${bw}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1040" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FCD34D" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="84" y="1078" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Alphabet analysts: within $50B CAPEX guide, re-plannable</text>
<text x="84" y="1116" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3">Bernstein: EU supply growth has structural speed cap</text>
<text x="84" y="1154" font-family="Arial,sans-serif" font-size="21" fill="#8B949E">Alphabet PT ~$210 maintained</text>

<rect x="54" y="1202" width="${bw}" height="76" rx="16" fill="#1A1F2E" stroke="#FCD34D" stroke-width="2"/>
<text x="${W/2}" y="1248" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">US cloud regions continue AI leadership; EU lags</text>

${footer()}`;
    await save('google-finland-20261011-en', svgWrap(inner));
  }

  console.log('\n✅ All 14 charts generated for 2026-10-11 batch 2');
}

main().catch(console.error);
