#!/usr/bin/env node
// SVG chart generator for 2026-10-11 weekend report update
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
  // Split at word/separator boundaries to avoid breaking XML entities like &amp;
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
  // ── 1. summary-20261011 (KO) ──────────────────────────────────
  {
    const topics = [
      { num: '1', text: '로드스터 10월 15일 공개 — 콜드가스 스러스터 공중부양 데모 예고', color: '#FF4D6D' },
      { num: '2', text: 'FSD v14.3.11 자동 충돌 회피 — HW4 전용, HW3 Lite 동시 배포', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX Grain 800MHz $80억 인수 — 독립 이통사 AT&amp;T 직접 경쟁', color: '#00B4D8' },
      { num: '4', text: '엔비디아 -6% 급락 — OpenAI $2,500억 보증, 순환 파이낸싱 우려', color: '#69FF97' },
      { num: '5', text: 'Google-SpaceX GPU $304억 계약 가동 — 月 $9.2억, 11만 기', color: '#00B4D8' },
      { num: '6', text: 'Crew-12 8개월 귀환 / Crew-13 7시간 50분 ISS 최단 도킹 기록', color: '#00B4D8' },
    ];
    const inner = `
${gradBar(['#A855F7','#EC4899','#F97316','#EAB308','#22C55E','#06B6D4'])}
${badge(54, 28, '한장요약', '#A855F7')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">2026.10.11</text>
<text x="54" y="168" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">테슬라 · 스페이스X · 빅테크</text>
<line x1="54" y1="192" x2="${W-54}" y2="192" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = 230 + i * 160;
  const lines = wrapText(t.text, W - 180, 26, 0.58);
  return `<text x="54" y="${y}" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="110" y1="${y-32}" x2="110" y2="${y+16}" stroke="${t.color}" stroke-width="3"/>
${lines.map((l, li) => `<text x="130" y="${y - (lines.length-1-li)*30}" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1196" x2="${W-54}" y2="1196" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1238" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">핵심일정: 10.15 로드스터 공개  10.21 테슬라 3Q 실적</text>
${footer()}`;
    await save('summary-20261011', svgWrap(inner));
  }

  // ── 2. summary-20261011-en (EN) ──────────────────────────────
  {
    const topics = [
      { num: '1', text: 'Roadster Oct 15 reveal — cold-gas thruster hover demo teased', color: '#FF4D6D' },
      { num: '2', text: 'FSD v14.3.11 Auto Collision Evasion — HW4 only, HW3 Lite simultaneous', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX $8B 800MHz spectrum buy — standalone carrier vs. AT&amp;T/Verizon', color: '#00B4D8' },
      { num: '4', text: 'Nvidia -6% — OpenAI $250B backstop sparks circular financing fears', color: '#69FF97' },
      { num: '5', text: 'Google-SpaceX $30.4B GPU deal live — $920M/month, 110K GPUs', color: '#00B4D8' },
      { num: '6', text: 'Crew-12 back after 8 months / Crew-13 sets US docking record: 7h 50m', color: '#00B4D8' },
    ];
    const inner = `
${gradBar(['#A855F7','#EC4899','#F97316','#EAB308','#22C55E','#06B6D4'])}
${badge(54, 28, 'WEEKLY', '#A855F7')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="52" fill="#fff" font-weight="900">OCT 11, 2026</text>
<text x="54" y="168" font-family="Arial,sans-serif" font-size="28" fill="#8B949E">Tesla · SpaceX · Big Tech</text>
<line x1="54" y1="192" x2="${W-54}" y2="192" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = 230 + i * 160;
  const lines = wrapText(t.text, W - 180, 26, 0.58);
  return `<text x="54" y="${y}" font-family="Arial Black,Arial,sans-serif" font-size="42" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="110" y1="${y-32}" x2="110" y2="${y+16}" stroke="${t.color}" stroke-width="3"/>
${lines.map((l, li) => `<text x="130" y="${y - (lines.length-1-li)*30}" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1196" x2="${W-54}" y2="1196" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1238" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Watch: Oct 15 Roadster reveal  |  Oct 21 Tesla Q3 earnings</text>
${footer()}`;
    await save('summary-20261011-en', svgWrap(inner));
  }

  // ── 3. roadster-reveal-20261011 (TSLA) ───────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF1A40','#FF6B35'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FF4D6D" text-anchor="middle" font-weight="900">OCT 15</text>
<text x="${W/2}" y="215" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" text-anchor="middle" font-weight="900">로드스터 공개</text>
<text x="${W/2}" y="262" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">텍사스 웨이코 · 야외 행사</text>
<line x1="54" y1="296" x2="${W-54}" y2="296" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="320" width="${W-108}" height="240" rx="16" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="370" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#FF4D6D" text-anchor="middle" font-weight="900">🚀 스페이스X 콜드가스 스러스터</text>
<text x="${W/2}" y="420" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">압축 질소 분사 추진력</text>
<text x="${W/2}" y="460" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">원격 제어 공중부양 데모 예정</text>
<text x="${W/2}" y="500" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">탑승자 없이 · 짧은 호버링 시연</text>
<text x="${W/2}" y="538" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">2017년 예고 이후 수차례 연기</text>

${statCard(54, 590, 300, 140, '연기 이유', '악천후', '야외 전용 행사', '#FF4D6D')}
${statCard(390, 590, 300, 140, '원래 날짜', 'OCT 1', '텍사스 웨이코', '#FF4D6D')}
${statCard(726, 590, 300, 140, '다음 이벤트', 'OCT 21', '3Q 실적 발표', '#FF8C42')}

<rect x="54" y="762" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="808" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="${W/2}" y="848" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">웨드부시: 스페이스X 기술 통합 브랜드 서사 강화</text>
<text x="${W/2}" y="882" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">10월 21일 실적 전 촉매 가능성</text>
<text x="${W/2}" y="922" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">목표가: 웨드부시 $600 · 모건스탠리 강세 $840</text>
<text x="${W/2}" y="954" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">로드스터는 소량 생산 — 수익 기여 제한적</text>

<rect x="54" y="996" width="${W-108}" height="160" rx="16" fill="#1A1F2E" stroke="#FF4D6D" stroke-width="2"/>
<text x="${W/2}" y="1046" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">📅 KEY DATE</text>
<text x="${W/2}" y="1090" font-family="Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">10월 15일 공개는 시연 — 양산 일정 별도</text>
<text x="${W/2}" y="1130" font-family="Arial,sans-serif" font-size="24" fill="#8B949E" text-anchor="middle">가격·옵션·인도 일정이 이날 공개 전망</text>

<line x1="54" y1="1186" x2="${W-54}" y2="1186" stroke="#30363D" stroke-width="1"/>
${footer()}`;
    await save('roadster-reveal-20261011', svgWrap(inner));
  }

  // ── 3-EN. roadster-reveal-20261011-en ────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF1A40','#FF6B35'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="110" fill="#FF4D6D" text-anchor="middle" font-weight="900">OCT 15</text>
<text x="${W/2}" y="215" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" text-anchor="middle" font-weight="900">ROADSTER REVEAL</text>
<text x="${W/2}" y="262" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Waco, Texas · Outdoor Event</text>
<line x1="54" y1="296" x2="${W-54}" y2="296" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="320" width="${W-108}" height="240" rx="16" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="370" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#FF4D6D" text-anchor="middle" font-weight="900">🚀 SpaceX Cold-Gas Thruster System</text>
<text x="${W/2}" y="420" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Compressed nitrogen propulsion</text>
<text x="${W/2}" y="460" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Remote-controlled hover demo planned</text>
<text x="${W/2}" y="500" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">No passengers · Brief levitation only</text>
<text x="${W/2}" y="538" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">First announced 2017 — multiple delays</text>

${statCard(54, 590, 300, 140, 'DELAY REASON', 'WEATHER', 'Outdoor only event', '#FF4D6D')}
${statCard(390, 590, 300, 140, 'ORIGINAL DATE', 'OCT 1', 'Waco, Texas', '#FF4D6D')}
${statCard(726, 590, 300, 140, 'NEXT CATALYST', 'OCT 21', 'Q3 Earnings', '#FF8C42')}

<rect x="54" y="762" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="808" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="${W/2}" y="848" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Wedbush: SpaceX integration amplifies brand narrative</text>
<text x="${W/2}" y="882" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Pre-earnings catalyst possible</text>
<text x="${W/2}" y="922" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Wedbush $600 · Morgan Stanley bull $840</text>
<text x="${W/2}" y="954" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Roadster is low-volume — limited revenue impact</text>

<rect x="54" y="996" width="${W-108}" height="160" rx="16" fill="#1A1F2E" stroke="#FF4D6D" stroke-width="2"/>
<text x="${W/2}" y="1046" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">📅 KEY DATE</text>
<text x="${W/2}" y="1090" font-family="Arial,sans-serif" font-size="26" fill="#fff" text-anchor="middle">Oct 15 is a demo — production timeline separate</text>
<text x="${W/2}" y="1130" font-family="Arial,sans-serif" font-size="24" fill="#8B949E" text-anchor="middle">Pricing, options, delivery to be announced</text>

<line x1="54" y1="1186" x2="${W-54}" y2="1186" stroke="#30363D" stroke-width="1"/>
${footer()}`;
    await save('roadster-reveal-20261011-en', svgWrap(inner));
  }

  // ── 4. fsd-collision-20261011 (TSLA) ─────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF8C42','#FFC107'])}
${badge(54, 28, 'TSLA · FSD', '#FF4D6D')}
<text x="${W/2}" y="140" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#FF4D6D" text-anchor="middle" font-weight="900">v14.3.11</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="900">자동 충돌 회피 추가</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">업데이트 2026.33.5 · 10월 7일 배포 시작</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="314" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="362" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">⚡ Automatic Collision Evasion</text>
<text x="${W/2}" y="406" font-family="Arial,sans-serif" font-size="25" fill="#E6EDF3" text-anchor="middle">수동 주행 중 충돌 감지 시 FSD 자동 개입</text>
<text x="${W/2}" y="444" font-family="Arial,sans-serif" font-size="25" fill="#E6EDF3" text-anchor="middle">스티어링 또는 제동 자동 조작</text>
<text x="${W/2}" y="482" font-family="Arial,sans-serif" font-size="22" fill="#FFC107" text-anchor="middle">HW4(AI4) 탑재 차량 전용</text>
<text x="${W/2}" y="508" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">HW3 차량은 v14.3 Lite 동시 배포</text>

${statCard(54, 546, 460, 140, 'HW4 신기능', '자동충돌회피', 'Collision Evasion', '#FF4D6D')}
${statCard(566, 546, 460, 140, 'HW3 버전', 'v14.3 Lite', '동시 배포', '#FF8C42')}

<rect x="54" y="722" width="${W-108}" height="160" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="766" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FFC107" text-anchor="middle" font-weight="900">Vehicle-to-Home 추가</text>
<text x="${W/2}" y="806" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">정전 시 차량 배터리 → 파워월 연동 → 집 전력 공급</text>
<text x="${W/2}" y="842" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">플러그 연결 상태에서 자동 작동</text>
<text x="${W/2}" y="874" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">v14.3.10과 출시 노트 동일 — 버그 수정·안정화 주</text>

<rect x="54" y="918" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="962" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="${W/2}" y="1002" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">웨드부시: 사고율↓ → 규제 설득 강화 → 구독 갱신↑</text>
<text x="${W/2}" y="1040" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">모건스탠리: 21일 실적서 구독자 수 확인이 관건</text>
<text x="${W/2}" y="1078" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">HW4 비중 증가 속도 = 구독 전환 분모</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">목표: 웨드부시 $600 · 모건스탠리 OW</text>

<line x1="54" y1="1150" x2="${W-54}" y2="1150" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1194" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">다음 확인: 10.21 실적 FSD 구독자 공개 여부</text>
${footer()}`;
    await save('fsd-collision-20261011', svgWrap(inner));
  }

  // ── 5. spacex-grain-spectrum-20261011 (SPCX) ─────────────────
  {
    const inner = `
${gradBar(['#023E8A','#0096C7','#00B4D8','#48CAE4'])}
${badge(54, 28, 'SPCX', '#00B4D8')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#00B4D8" text-anchor="middle" font-weight="900">$8B</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">800MHz 스펙트럼 인수</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Grain Management · 미국 전역 · FCC 승인 대기</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="314" width="${W-108}" height="210" rx="16" fill="#161B22" stroke="#00B4D8" stroke-width="1.5"/>
<text x="${W/2}" y="360" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#00B4D8" text-anchor="middle" font-weight="900">📡 독립 이동통신사 진출</text>
<text x="${W/2}" y="402" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">AT&amp;T · 버라이즌 · T-모바일과 직접 경쟁</text>
<text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">800MHz 저주파 → 실내 벽 투과 강함</text>
<text x="${W/2}" y="478" font-family="Arial,sans-serif" font-size="22" fill="#48CAE4" text-anchor="middle">페어 14MHz · 미국 전역 커버</text>
<text x="${W/2}" y="514" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">현재는 T-모바일 주파수 임대 → 자체 스펙트럼 확보</text>

${statCard(54, 560, 300, 140, '인수금액', '$8B', '80억 달러', '#00B4D8')}
${statCard(390, 560, 300, 140, '주파수대', '800MHz', '저주파 전국', '#48CAE4')}
${statCard(726, 560, 300, 140, '대역폭', '14MHz', '페어 전역', '#0096C7')}

<rect x="54" y="736" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="780" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">위성 + 지상 스펙트럼 동시 확보</text>
<text x="${W/2}" y="820" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">FCC 승인 Starlink V2 15,000기 위성</text>
<text x="${W/2}" y="858" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">+ 이번 800MHz 지상 스펙트럼</text>
<text x="${W/2}" y="896" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">지상 기지국 없이 위성으로 이통사 최초 시도</text>

<rect x="54" y="952" width="${W-108}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="996" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="${W/2}" y="1036" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">모건스탠리: 구독 수익 천장 상향 재평가 이벤트</text>
<text x="${W/2}" y="1074" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">씨티: 주당 $900 유지 · FCC 승인 후 가입자 확인</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">거래 종결 이후 가입자 지표가 진짜 논거</text>

<line x1="54" y1="1152" x2="${W-54}" y2="1152" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1196" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">다음 확인: FCC 승인 · 가입자 수 · 서비스 단가</text>
${footer()}`;
    await save('spacex-grain-spectrum-20261011', svgWrap(inner));
  }

  // ── 6. nvda-circular-20261011 (NVDA) ──────────────────────────
  {
    const inner = `
${gradBar(['#003300','#00AA44','#69FF97','#00FF88'])}
${badge(54, 28, 'NVDA', '#69FF97', '#000')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="130" fill="#69FF97" text-anchor="middle" font-weight="900">-6%</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">순환 파이낸싱 우려 재점화</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">반도체 섹터 $1조 증발 · AMD Micron Qualcomm -9%</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="314" width="${W-108}" height="210" rx="16" fill="#161B22" stroke="#69FF97" stroke-width="1.5"/>
<text x="${W/2}" y="360" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#69FF97" text-anchor="middle" font-weight="900">🔄 순환 파이낸싱이란?</text>
<text x="${W/2}" y="402" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">엔비디아 → OpenAI $2,500억 보증 검토</text>
<text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">OpenAI가 그 돈으로 엔비디아 칩 구매</text>
<text x="${W/2}" y="478" font-family="Arial,sans-serif" font-size="22" fill="#FFC107" text-anchor="middle">수요가 유기적인지 구분 불가 → 우려</text>
<text x="${W/2}" y="514" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">젠슨 황: 순환 파이낸싱 표현은 잘못됐다</text>

${statCard(54, 560, 300, 140, 'NVDA 낙폭', '-6%', '하루 급락', '#69FF97')}
${statCard(390, 560, 300, 140, '섹터 손실', '-$1T', '반도체 지수', '#FF4D6D')}
${statCard(726, 560, 300, 140, 'OpenAI 보증', '$2,500억', '검토 규모', '#FFC107')}

<rect x="54" y="736" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="780" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#69FF97" text-anchor="middle" font-weight="900">젠슨 황 입장</text>
<text x="${W/2}" y="820" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">OpenAI가 임대료 직접 부담 구조</text>
<text x="${W/2}" y="858" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">2030년 OpenAI 컴퓨팅 구매: $6,000억</text>
<text x="${W/2}" y="896" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">별도 OpenAI 칩 $3,500억 자금 조달도 검토 중</text>

<rect x="54" y="952" width="${W-108}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="996" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#69FF97" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="${W/2}" y="1036" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">씨티: 매수 $315 유지 — 수요 체력 아닌 구조 불안</text>
<text x="${W/2}" y="1074" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">ARK: 연평균 40%+ 인프라 지출 전망 유지</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">금리 추가 상승 시 같은 우려 재점화 가능</text>

<line x1="54" y1="1152" x2="${W-54}" y2="1152" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1196" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">주의: 국채 금리+유가 동시 상승 → 반도체 추가 압박 리스크</text>
${footer()}`;
    await save('nvda-circular-20261011', svgWrap(inner));
  }

  // ── 7. google-spacex-gpu-20261011 (SPCX) ─────────────────────
  {
    const inner = `
${gradBar(['#023E8A','#0096C7','#00B4D8','#48CAE4'])}
${badge(54, 28, 'SPCX · NVDA · GOOGL', '#00B4D8')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="#00B4D8" text-anchor="middle" font-weight="900">$30.4B</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">Google-SpaceX GPU 계약 가동</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">월 $9.2억 · 11만 Nvidia GPU · 2029년 6월까지</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="314" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#00B4D8" stroke-width="1.5"/>
<text x="${W/2}" y="360" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#00B4D8" text-anchor="middle" font-weight="900">💡 계약 구조</text>
<text x="${W/2}" y="402" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">스페이스X: Nvidia GPU 구매 → 구글에 임대</text>
<text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">구글: Gemini Enterprise 추론 작업에 활용</text>
<text x="${W/2}" y="478" font-family="Arial,sans-serif" font-size="22" fill="#48CAE4" text-anchor="middle">2026.10 가동 개시 · 12개월 램프업 후 풀 가동</text>
<text x="${W/2}" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">스페이스X IPO 신청서에 계약 공개</text>

${statCard(54, 550, 300, 140, '월 임차료', '$920M', '9억 2천만 달러', '#00B4D8')}
${statCard(390, 550, 300, 140, 'GPU 수', '110,000', 'Nvidia GPU', '#48CAE4')}
${statCard(726, 550, 300, 140, '총 계약', '$30.4B', '~2029.06', '#0096C7')}

<rect x="54" y="726" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="770" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">엔비디아 수혜 구조</text>
<text x="${W/2}" y="810" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">스페이스X가 GPU 매입 → 엔비디아가 판매 수익 선취</text>
<text x="${W/2}" y="848" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">구글은 스페이스X에 임차료 납부</text>
<text x="${W/2}" y="886" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">빅테크·위성사 동시 GPU 구매 → 고객 기반 분산</text>

<rect x="54" y="940" width="${W-108}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="984" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="${W/2}" y="1024" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">모건스탠리: 데이터센터 임대 수익 아직 목표가 미반영</text>
<text x="${W/2}" y="1062" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">씨티 SPCX $900 · 2029 계약 갱신 여부가 핵심</text>
<text x="${W/2}" y="1098" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">구글 자체 용량 확보 전까지 갱신 가능성 높음</text>

<line x1="54" y1="1142" x2="${W-54}" y2="1142" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1186" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">다음: 2027.09.30 풀가동 후 월 $920M 기준 적용</text>
${footer()}`;
    await save('google-spacex-gpu-20261011', svgWrap(inner));
  }

  // ── 8. crew12-return-20261011 (SPCX) ─────────────────────────
  {
    const inner = `
${gradBar(['#023E8A','#0096C7','#00B4D8','#90E0EF'])}
${badge(54, 28, 'SPCX', '#00B4D8')}
<text x="${W/2}" y="128" font-family="Arial Black,Arial,sans-serif" font-size="86" fill="#00B4D8" text-anchor="middle" font-weight="900">7H 50M</text>
<text x="${W/2}" y="205" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="900">미국 유인 ISS 도킹 최단 기록</text>
<text x="${W/2}" y="252" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Crew-13 · 2026년 10월 1일 발사</text>
<line x1="54" y1="284" x2="${W-54}" y2="284" stroke="#30363D" stroke-width="2"/>

<rect x="54" y="308" width="${W-108}" height="220" rx="16" fill="#161B22" stroke="#00B4D8" stroke-width="1.5"/>
<text x="${W/2}" y="354" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#00B4D8" text-anchor="middle" font-weight="900">🚀 Crew-13 승무원 구성</text>
<text x="${W/2}" y="396" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">지휘관 Jessica Watkins (NASA 2회 탑승)</text>
<text x="${W/2}" y="434" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">조종사 Luke Delaney (NASA)</text>
<text x="${W/2}" y="472" font-family="Arial,sans-serif" font-size="22" fill="#48CAE4" text-anchor="middle">+ Joshua Kutryk (캐나다) · Sergey Teteryatnikov (러시아)</text>
<text x="${W/2}" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">ISS 약 6개월 체류 예정</text>

${statCard(54, 564, 460, 140, 'Crew-13 도킹', '7H 50M', '미국 최단 기록', '#00B4D8')}
${statCard(566, 564, 460, 140, 'Crew-12 귀환', '8개월', '10월 8일 착수', '#48CAE4')}

<rect x="54" y="740" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="784" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">10월 발사 스케줄</text>
<text x="${W/2}" y="824" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">10.10: SDA 위성 21기 성공 (4일 취소 후 재시도)</text>
<text x="${W/2}" y="862" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">10.12: 스타링크 · 10.13: CRS-35 화물</text>
<text x="${W/2}" y="900" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">10.15: USSF-481 예정</text>

<rect x="54" y="956" width="${W-108}" height="160" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1000" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">하우스 뷰</text>
<text x="${W/2}" y="1040" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">모건스탠리: 도킹 효율↑ → NASA 계약 갱신 근거</text>
<text x="${W/2}" y="1078" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">씨티: 발사 빈도·성공 기록 = IPO 멀티플 기반</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">목표: 모건스탠리 $300 · 씨티 $900</text>

<line x1="54" y1="1150" x2="${W-54}" y2="1150" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1194" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Falcon Heavy NRO-97 10.01 성공 · NRO 첫 Falcon Heavy 임무</text>
${footer()}`;
    await save('crew12-return-20261011', svgWrap(inner));
  }

  // ── 9. EN versions for remaining charts ──────────────────────
  // fsd-collision-en
  {
    const inner = `
${gradBar(['#FF4D6D','#FF8C42','#FFC107'])}
${badge(54, 28, 'TSLA · FSD', '#FF4D6D')}
<text x="${W/2}" y="140" font-family="Arial Black,Arial,sans-serif" font-size="100" fill="#FF4D6D" text-anchor="middle" font-weight="900">v14.3.11</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="900">Auto Collision Evasion Added</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Update 2026.33.5 · Rolling out October 7</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="314" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="362" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">⚡ Automatic Collision Evasion</text>
<text x="${W/2}" y="406" font-family="Arial,sans-serif" font-size="25" fill="#E6EDF3" text-anchor="middle">FSD intervenes during manual driving</text>
<text x="${W/2}" y="444" font-family="Arial,sans-serif" font-size="25" fill="#E6EDF3" text-anchor="middle">Auto steering/braking on imminent collision</text>
<text x="${W/2}" y="482" font-family="Arial,sans-serif" font-size="22" fill="#FFC107" text-anchor="middle">HW4 (AI4) vehicles only</text>
<text x="${W/2}" y="508" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">HW3 receives v14.3 Lite simultaneously</text>
${statCard(54, 546, 460, 140, 'HW4 FEATURE', 'Auto Collision', 'Evasion', '#FF4D6D')}
${statCard(566, 546, 460, 140, 'HW3 VERSION', 'v14.3 Lite', 'Simultaneous', '#FF8C42')}
<rect x="54" y="722" width="${W-108}" height="160" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="766" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FFC107" text-anchor="middle" font-weight="900">Vehicle-to-Home Added</text>
<text x="${W/2}" y="806" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Car battery → Powerwall → Home during outage</text>
<text x="${W/2}" y="844" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Auto-activates when plugged in</text>
<rect x="54" y="920" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="964" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="${W/2}" y="1004" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Wedbush: Safety data strengthens regulator case</text>
<text x="${W/2}" y="1042" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">MS: Q3 earnings FSD subscriber count is the key</text>
<text x="${W/2}" y="1080" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">HW4 penetration rate = subscription denominator</text>
<text x="${W/2}" y="1112" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Wedbush PT $600 · MS Overweight</text>
<line x1="54" y1="1150" x2="${W-54}" y2="1150" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1194" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Watch: Oct 21 earnings — FSD subscriber disclosure</text>
${footer()}`;
    await save('fsd-collision-20261011-en', svgWrap(inner));
  }

  // spacex-grain-spectrum-en
  {
    const inner = `
${gradBar(['#023E8A','#0096C7','#00B4D8','#48CAE4'])}
${badge(54, 28, 'SPCX', '#00B4D8')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="96" fill="#00B4D8" text-anchor="middle" font-weight="900">$8B</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">800MHz Spectrum Acquisition</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Grain Management · Nationwide · FCC approval pending</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="314" width="${W-108}" height="210" rx="16" fill="#161B22" stroke="#00B4D8" stroke-width="1.5"/>
<text x="${W/2}" y="360" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#00B4D8" text-anchor="middle" font-weight="900">📡 Standalone Mobile Carrier</text>
<text x="${W/2}" y="402" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Direct competition: AT&amp;T · Verizon · T-Mobile</text>
<text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">800MHz penetrates walls — indoor coverage</text>
<text x="${W/2}" y="478" font-family="Arial,sans-serif" font-size="22" fill="#48CAE4" text-anchor="middle">14MHz paired · Nationwide coverage</text>
<text x="${W/2}" y="514" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Currently relies on T-Mobile spectrum — this ends that</text>
${statCard(54, 560, 300, 140, 'DEAL VALUE', '$8B', '$8 Billion', '#00B4D8')}
${statCard(390, 560, 300, 140, 'FREQUENCY', '800MHz', 'Low-band nationwide', '#48CAE4')}
${statCard(726, 560, 300, 140, 'BANDWIDTH', '14MHz', 'Paired nationwide', '#0096C7')}
<rect x="54" y="736" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="780" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">Satellite + Ground Spectrum Together</text>
<text x="${W/2}" y="820" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">FCC-approved Starlink V2: 15,000 satellites</text>
<text x="${W/2}" y="858" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">+ This 800MHz terrestrial spectrum</text>
<text x="${W/2}" y="896" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">First carrier via satellite — no ground towers</text>
<rect x="54" y="952" width="${W-108}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="996" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="${W/2}" y="1036" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">MS: Subscription ceiling re-rating event</text>
<text x="${W/2}" y="1074" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Citi SPCX $900 · FCC approval + subscribers needed</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Post-close subscriber metrics are the real thesis</text>
<line x1="54" y1="1152" x2="${W-54}" y2="1152" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1196" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Next: FCC approval · Subscriber count · ARPU</text>
${footer()}`;
    await save('spacex-grain-spectrum-20261011-en', svgWrap(inner));
  }

  // nvda-circular-en
  {
    const inner = `
${gradBar(['#003300','#00AA44','#69FF97','#00FF88'])}
${badge(54, 28, 'NVDA', '#69FF97', '#000')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="130" fill="#69FF97" text-anchor="middle" font-weight="900">-6%</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">Circular Financing Fears Return</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Chip sector loses $1 trillion · AMD Micron Qualcomm -9%+</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="314" width="${W-108}" height="210" rx="16" fill="#161B22" stroke="#69FF97" stroke-width="1.5"/>
<text x="${W/2}" y="360" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#69FF97" text-anchor="middle" font-weight="900">🔄 What is Circular Financing?</text>
<text x="${W/2}" y="402" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Nvidia backs $250B for OpenAI Ohio data center</text>
<text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">OpenAI uses that money to buy Nvidia chips</text>
<text x="${W/2}" y="478" font-family="Arial,sans-serif" font-size="22" fill="#FFC107" text-anchor="middle">Organic demand becomes indistinguishable → concern</text>
<text x="${W/2}" y="514" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Jensen Huang: circular financing label is wrong</text>
${statCard(54, 560, 300, 140, 'NVDA DROP', '-6%', 'Single-day', '#69FF97')}
${statCard(390, 560, 300, 140, 'SECTOR LOSS', '-$1T', 'Chip index', '#FF4D6D')}
${statCard(726, 560, 300, 140, 'OPENAI BACKSTOP', '$250B', 'Under review', '#FFC107')}
<rect x="54" y="736" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="780" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#69FF97" text-anchor="middle" font-weight="900">Jensen Huang Response</text>
<text x="${W/2}" y="820" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">OpenAI pays rent directly — not a revenue guarantee</text>
<text x="${W/2}" y="858" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">OpenAI compute purchases through 2030: $600B</text>
<text x="${W/2}" y="896" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Separate $350B chip financing also under review</text>
<rect x="54" y="952" width="${W-108}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="996" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#69FF97" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="${W/2}" y="1036" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Citi: Buy $315 — structure anxiety, not demand weakness</text>
<text x="${W/2}" y="1074" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">ARK: 40%+ annual AI infra growth through 2030</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Rising rates will re-ignite same concerns</text>
<line x1="54" y1="1152" x2="${W-54}" y2="1152" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1196" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Risk: Treasury yield + oil rising simultaneously → more pressure</text>
${footer()}`;
    await save('nvda-circular-20261011-en', svgWrap(inner));
  }

  // google-spacex-gpu-en
  {
    const inner = `
${gradBar(['#023E8A','#0096C7','#00B4D8','#48CAE4'])}
${badge(54, 28, 'SPCX · NVDA · GOOGL', '#00B4D8')}
<text x="${W/2}" y="130" font-family="Arial Black,Arial,sans-serif" font-size="88" fill="#00B4D8" text-anchor="middle" font-weight="900">$30.4B</text>
<text x="${W/2}" y="210" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" text-anchor="middle" font-weight="900">Google-SpaceX GPU Deal Live</text>
<text x="${W/2}" y="258" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">$920M/month · 110K Nvidia GPUs · Through June 2029</text>
<line x1="54" y1="290" x2="${W-54}" y2="290" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="314" width="${W-108}" height="200" rx="16" fill="#161B22" stroke="#00B4D8" stroke-width="1.5"/>
<text x="${W/2}" y="360" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#00B4D8" text-anchor="middle" font-weight="900">💡 Deal Structure</text>
<text x="${W/2}" y="402" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">SpaceX buys Nvidia GPUs → leases to Google</text>
<text x="${W/2}" y="440" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Google: bridge capacity for Gemini Enterprise</text>
<text x="${W/2}" y="478" font-family="Arial,sans-serif" font-size="22" fill="#48CAE4" text-anchor="middle">Live Oct 2026 · 12-month ramp to full capacity</text>
<text x="${W/2}" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">Disclosed in SpaceX S-1 IPO filing</text>
${statCard(54, 550, 300, 140, 'MONTHLY', '$920M', 'per month', '#00B4D8')}
${statCard(390, 550, 300, 140, 'GPU COUNT', '110,000', 'Nvidia GPUs', '#48CAE4')}
${statCard(726, 550, 300, 140, 'TOTAL VALUE', '$30.4B', 'through 2029', '#0096C7')}
<rect x="54" y="726" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="770" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">Nvidia Is the Silent Winner</text>
<text x="${W/2}" y="810" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">SpaceX buys GPUs → Nvidia gets paid first</text>
<text x="${W/2}" y="848" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Google pays rent to SpaceX separately</text>
<text x="${W/2}" y="886" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Customer base diversification — less single-buyer risk</text>
<rect x="54" y="940" width="${W-108}" height="170" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="984" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="${W/2}" y="1024" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">MS: Data center revenue not yet fully priced in</text>
<text x="${W/2}" y="1062" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Citi SPCX $900 · 2029 renewal is the long-run key</text>
<text x="${W/2}" y="1098" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">High renewal odds until Google builds own capacity</text>
<line x1="54" y1="1142" x2="${W-54}" y2="1142" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1186" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Full $920M/month rate from Sept 30, 2027 onward</text>
${footer()}`;
    await save('google-spacex-gpu-20261011-en', svgWrap(inner));
  }

  // crew12-return-en
  {
    const inner = `
${gradBar(['#023E8A','#0096C7','#00B4D8','#90E0EF'])}
${badge(54, 28, 'SPCX', '#00B4D8')}
<text x="${W/2}" y="128" font-family="Arial Black,Arial,sans-serif" font-size="86" fill="#00B4D8" text-anchor="middle" font-weight="900">7H 50M</text>
<text x="${W/2}" y="205" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#fff" text-anchor="middle" font-weight="900">Fastest US Crewed ISS Docking</text>
<text x="${W/2}" y="252" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">Crew-13 · Launched October 1, 2026</text>
<line x1="54" y1="284" x2="${W-54}" y2="284" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="308" width="${W-108}" height="220" rx="16" fill="#161B22" stroke="#00B4D8" stroke-width="1.5"/>
<text x="${W/2}" y="354" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#00B4D8" text-anchor="middle" font-weight="900">🚀 Crew-13 Members</text>
<text x="${W/2}" y="396" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">CDR Jessica Watkins (NASA — 2nd Dragon flight)</text>
<text x="${W/2}" y="434" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Pilot Luke Delaney (NASA)</text>
<text x="${W/2}" y="472" font-family="Arial,sans-serif" font-size="22" fill="#48CAE4" text-anchor="middle">+ Joshua Kutryk (Canada) · Sergey Teteryatnikov (Russia)</text>
<text x="${W/2}" y="510" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">~6 months aboard the ISS</text>
${statCard(54, 564, 460, 140, 'CREW-13 DOCK', '7H 50M', 'US record', '#00B4D8')}
${statCard(566, 564, 460, 140, 'CREW-12 BACK', '8 MONTHS', 'Splashdown Oct 8', '#48CAE4')}
<rect x="54" y="740" width="${W-108}" height="180" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="784" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">October Launch Schedule</text>
<text x="${W/2}" y="824" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Oct 10: SDA 21 satellites (after Oct 4 scrub)</text>
<text x="${W/2}" y="862" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3" text-anchor="middle">Oct 12: Starlink · Oct 13: CRS-35 cargo</text>
<text x="${W/2}" y="900" font-family="Arial,sans-serif" font-size="22" fill="#8B949E" text-anchor="middle">Oct 15: USSF-481 planned</text>
<rect x="54" y="956" width="${W-108}" height="160" rx="16" fill="#161B22" stroke="#30363D" stroke-width="1"/>
<text x="${W/2}" y="1000" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#00B4D8" text-anchor="middle" font-weight="900">HOUSE VIEWS</text>
<text x="${W/2}" y="1040" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">MS: Docking efficiency → NASA contract renewal case</text>
<text x="${W/2}" y="1078" font-family="Arial,sans-serif" font-size="23" fill="#E6EDF3" text-anchor="middle">Citi: Launch cadence = IPO valuation credibility</text>
<text x="${W/2}" y="1110" font-family="Arial,sans-serif" font-size="21" fill="#8B949E" text-anchor="middle">MS PT $300 · Citi PT $900</text>
<line x1="54" y1="1150" x2="${W-54}" y2="1150" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1194" font-family="Arial,sans-serif" font-size="22" fill="#8B949E">Also: Falcon Heavy NROL-97 Oct 1 — first NRO Falcon Heavy</text>
${footer()}`;
    await save('crew12-return-20261011-en', svgWrap(inner));
  }

  console.log('\n✅ All charts generated for 2026-10-11');
}

main().catch(console.error);
