#!/usr/bin/env node
// SVG chart generator — 2026-10-12 (Cybercab Paris, FSD→TAD, SpaceX $40B, AAPL iPhone cut)
// Also generates summary-20261012 KO + EN (4 new topics listed)
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

  // ── 1. summary-20261012 (KO) — 4 new topics ──────────────────────
  {
    const topics = [
      { num: '1', text: '사이버캡 파리 모터쇼 유럽 첫 공개 — 10/12~18 실운행 차량 전시, TSLA +0.6%', color: '#FF4D6D' },
      { num: '2', text: 'FSD → TAD 유럽 9개국 리브랜딩 — 독일 교통부 압박 6주 만, EU 투표 12월', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX $400억 엔비디아 칩 차입 — 아폴로 선도·핌코 참여, 2027 완료', color: '#60A5FA' },
      { num: '4', text: 'AAPL 아이폰18 프로 부품 주문 15~20% 삭감 — AI 메모리 원가↑, 주가 -2.5%', color: '#C084FC' },
    ];
    const inner = `
${gradBar(['#FF4D6D','#FB923C','#60A5FA','#C084FC'])}
${badge(54, 28, '한장요약', '#6366F1')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="48" fill="#fff" font-weight="900">2026.10.12  총 4토픽</text>
<text x="54" y="158" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">테슬라 · 스페이스X · 애플</text>
<line x1="54" y1="182" x2="${W-54}" y2="182" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = 280 + i * 220;
  const lines = wrapText(t.text, W - 170, 26, 0.56);
  return `<rect x="54" y="${y-50}" width="${W-108}" height="${lines.length * 34 + 80}" rx="16" fill="#161B22" stroke="${t.color}" stroke-width="1.5"/>
<text x="90" y="${y}" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="140" y1="${y-30}" x2="140" y2="${y+14}" stroke="${t.color}" stroke-width="3"/>
${lines.map((l, li) => `<text x="156" y="${y - (lines.length-1-li)*34}" font-family="Arial,sans-serif" font-size="26" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1270" x2="${W-54}" y2="1270" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1302" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">핵심일정: 10.15 로드스터 공개  10.18 파리모터쇼 종료  10.21 테슬라 3Q 실적</text>
${footer()}`;
    await save('summary-20261012', svgWrap(inner));
  }

  // ── 2. summary-20261012-en (EN) — 4 new topics ───────────────────
  {
    const topics = [
      { num: '1', text: 'Cybercab European debut at Paris Motor Show — Oct 12–18, operational fleet car, TSLA +0.6%', color: '#FF4D6D' },
      { num: '2', text: 'FSD rebranded to TAD in 9 EU countries — 6 weeks after German pressure, EU vote Dec', color: '#FF4D6D' },
      { num: '3', text: 'SpaceX seeks $40B to buy Nvidia chips — Apollo leads, PIMCO in talks, close 2027', color: '#60A5FA' },
      { num: '4', text: 'Apple cut iPhone 18 Pro component orders 15–20% — AI memory costs hit demand, AAPL -2.5%', color: '#C084FC' },
    ];
    const inner = `
${gradBar(['#FF4D6D','#FB923C','#60A5FA','#C084FC'])}
${badge(54, 28, 'SUMMARY', '#6366F1')}
<text x="54" y="110" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">2026.10.12  4 Topics</text>
<text x="54" y="158" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Tesla · SpaceX · Apple</text>
<line x1="54" y1="182" x2="${W-54}" y2="182" stroke="#30363D" stroke-width="2"/>
${topics.map((t, i) => {
  const y = 280 + i * 220;
  const lines = wrapText(t.text, W - 170, 24, 0.56);
  return `<rect x="54" y="${y-50}" width="${W-108}" height="${lines.length * 32 + 80}" rx="16" fill="#161B22" stroke="${t.color}" stroke-width="1.5"/>
<text x="90" y="${y}" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="${t.color}" font-weight="900">${t.num}</text>
<line x1="140" y1="${y-30}" x2="140" y2="${y+14}" stroke="${t.color}" stroke-width="3"/>
${lines.map((l, li) => `<text x="156" y="${y - (lines.length-1-li)*32}" font-family="Arial,sans-serif" font-size="24" fill="#E6EDF3">${l}</text>`).join('\n')}`;
}).join('\n')}
<line x1="54" y1="1270" x2="${W-54}" y2="1270" stroke="#30363D" stroke-width="1"/>
<text x="54" y="1302" font-family="Arial,sans-serif" font-size="20" fill="#8B949E">Key dates: Oct 15 Roadster reveal  Oct 18 Paris show ends  Oct 21 Tesla Q3 earnings</text>
${footer()}`;
    await save('summary-20261012-en', svgWrap(inner));
  }

  // ── 3. tsla-cybercab-paris-20261012 (KO) ──────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF6B6B','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#FF4D6D" font-weight="900">사이버캡</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">파리 모터쇼</text>
<text x="54" y="222" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">유럽 첫 공개</text>
<text x="54" y="268" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">2026년 10월 12일~18일 · 7.1홀 C25 부스</text>
<line x1="54" y1="296" x2="${W-54}" y2="296" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="316" width="${W-108}" height="200" rx="20" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="370" font-family="Arial Black,Arial,sans-serif" font-size="28" fill="#FF4D6D" text-anchor="middle" font-weight="900">스티어링 휠 없는 완전 자율 로보택시</text>
<text x="${W/2}" y="410" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">미국 실운행 플릿 차량 직접 전시</text>
<text x="${W/2}" y="450" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">FSD 탑재 6개 차종 시승 병행</text>
<text x="${W/2}" y="490" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">프로토타입 아닌 실제 운행 차량</text>
${statCard(54, 540, 300, 130, '전시 기간', '7일', 'Oct 12~18', '#FF4D6D')}
${statCard(390, 540, 300, 130, '주가 반응', '+0.6%', '개막일 상승', '#22C55E')}
${statCard(726, 540, 300, 130, '시승 모델', '6종', 'FSD 탑재', '#FF4D6D')}
<rect x="54" y="700" width="${W-108}" height="360" rx="20" fill="#161B22"/>
<text x="82" y="748" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">왜 중요한가</text>
<line x1="82" y1="762" x2="${W-82}" y2="762" stroke="#30363D" stroke-width="1"/>
<text x="82" y="800" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">유럽은 자율주행 규제 심사 최중요 시장</text>
<text x="82" y="836" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">전시 → 미디어·규제당국 반응 선행 수집</text>
<text x="82" y="872" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">사이버캡 유럽 형식 인증 협상 포석</text>
<text x="82" y="908" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">운전석 없는 차량 → 별도 인증 카테고리 필요</text>
<text x="82" y="960" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="998" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">웨드부시 목표가 350달러 — 로보택시 반복수익 모델</text>
<text x="82" y="1034" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">JP모건 목표가 280달러 — 유럽 인증 지연이 핵심 리스크</text>
${footer()}`;
    await save('tsla-cybercab-paris-20261012', svgWrap(inner));
  }

  // ── 4. tsla-cybercab-paris-20261012-en (EN) ───────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#FF6B6B','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="56" fill="#FF4D6D" font-weight="900">Cybercab</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">Paris Motor Show</text>
<text x="54" y="222" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">European Debut</text>
<text x="54" y="268" font-family="Arial,sans-serif" font-size="24" fill="#8B949E">October 12–18, 2026 · Hall 7.1, Stand C25</text>
<line x1="54" y1="296" x2="${W-54}" y2="296" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="316" width="${W-108}" height="200" rx="20" fill="#161B22" stroke="#FF4D6D" stroke-width="1.5"/>
<text x="${W/2}" y="370" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" text-anchor="middle" font-weight="900">No steering wheel, no pedals — full autonomy</text>
<text x="${W/2}" y="410" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">Operational US fleet car, not a prototype</text>
<text x="${W/2}" y="450" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">FSD test drives offered on 6 Tesla models</text>
<text x="${W/2}" y="490" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3" text-anchor="middle">Optimus Gen 2 and Tesla Energy also on display</text>
${statCard(54, 540, 300, 130, 'Show Duration', '7 days', 'Oct 12–18', '#FF4D6D')}
${statCard(390, 540, 300, 130, 'Stock Reaction', '+0.6%', 'Opening day', '#22C55E')}
${statCard(726, 540, 300, 130, 'Test Drive', '6 models', 'FSD equipped', '#FF4D6D')}
<rect x="54" y="700" width="${W-108}" height="360" rx="20" fill="#161B22"/>
<text x="82" y="748" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">Why it matters</text>
<line x1="82" y1="762" x2="${W-82}" y2="762" stroke="#30363D" stroke-width="1"/>
<text x="82" y="800" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Europe is the critical regulatory approval market</text>
<text x="82" y="836" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Public display tests media and regulator reaction</text>
<text x="82" y="872" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Groundwork for Cybercab type approval in EU</text>
<text x="82" y="908" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">No driver seat requires a new certification category</text>
<text x="82" y="960" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="998" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Wedbush PT $350 — robotaxi recurring revenue model</text>
<text x="82" y="1034" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">JPMorgan PT $280 — EU certification delay is key risk</text>
${footer()}`;
    await save('tsla-cybercab-paris-20261012-en', svgWrap(inner));
  }

  // ── 5. tsla-assisted-driving-20261012 (KO) ────────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#F97316','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="118" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">FSD → TAD</text>
<text x="54" y="172" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#FF4D6D" font-weight="900">유럽 9개국 명칭 교체</text>
<text x="54" y="224" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">독일 교통부 압박 6주 만 · 2026년 10월 9일</text>
<line x1="54" y1="254" x2="${W-54}" y2="254" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="274" width="${W-108}" height="120" rx="20" fill="#1A1A2E" stroke="#FF4D6D" stroke-width="2"/>
<text x="${W/2}" y="326" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#FF4D6D" text-anchor="middle" font-weight="900">Full Self-Driving</text>
<text x="${W/2}" y="362" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">→  테슬라 어시스티드 드라이빙 (TAD)</text>
${statCard(54, 424, 300, 130, '적용 국가', '9개국', 'EU 회원국', '#FF4D6D')}
${statCard(390, 424, 300, 130, '라이선스 가격', '€6,400', '영구 라이선스', '#F97316')}
${statCard(726, 424, 300, 130, 'EU 규정 투표', '12월', '예정', '#FBBF24')}
<rect x="54" y="584" width="${W-108}" height="460" rx="20" fill="#161B22"/>
<text x="82" y="632" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">리브랜딩 배경과 의미</text>
<line x1="82" y1="646" x2="${W-82}" y2="646" stroke="#30363D" stroke-width="1"/>
<text x="82" y="686" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">독일 장관: 완전 자율주행 수행 못하면서 명칭 오도</text>
<text x="82" y="722" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">독일·스페인·네덜란드·슬로바키아 등 웹사이트 반영</text>
<text x="82" y="758" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">향상형 오토파일럿 → TAD 베이직으로 동시 변경</text>
<text x="82" y="794" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">미국·한국 FSD 명칭은 유지</text>
<text x="82" y="844" font-family="Arial Black,arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">전략적 의미</text>
<text x="82" y="882" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">EU 12월 자율주행 규정 투표 전 마찰 제거</text>
<text x="82" y="918" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">사이버캡 유럽 형식 인증 협상 환경 조성</text>
<text x="82" y="954" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">소비자 보호법 손해배상 리스크 구조적 축소</text>
<text x="82" y="1004" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="1042" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">번스타인 360달러 — 사이버캡 인증 속도 가속 포석</text>
${footer()}`;
    await save('tsla-assisted-driving-20261012', svgWrap(inner));
  }

  // ── 6. tsla-assisted-driving-20261012-en (EN) ─────────────────────
  {
    const inner = `
${gradBar(['#FF4D6D','#F97316','#FF4D6D'])}
${badge(54, 28, 'TSLA', '#FF4D6D')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="118" font-family="Arial Black,Arial,sans-serif" font-size="44" fill="#fff" font-weight="900">FSD → TAD</text>
<text x="54" y="172" font-family="Arial Black,Arial,sans-serif" font-size="36" fill="#FF4D6D" font-weight="900">9 EU Countries Rebranded</text>
<text x="54" y="224" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">6 weeks after German pressure · October 9, 2026</text>
<line x1="54" y1="254" x2="${W-54}" y2="254" stroke="#30363D" stroke-width="2"/>
<rect x="54" y="274" width="${W-108}" height="120" rx="20" fill="#1A1A2E" stroke="#FF4D6D" stroke-width="2"/>
<text x="${W/2}" y="326" font-family="Arial Black,Arial,sans-serif" font-size="30" fill="#FF4D6D" text-anchor="middle" font-weight="900">Full Self-Driving</text>
<text x="${W/2}" y="362" font-family="Arial,sans-serif" font-size="26" fill="#8B949E" text-anchor="middle">→  Tesla Assisted Driving (TAD)</text>
${statCard(54, 424, 300, 130, 'Countries', '9 EU', 'member states', '#FF4D6D')}
${statCard(390, 424, 300, 130, 'License Price', '€6,400', 'permanent', '#F97316')}
${statCard(726, 424, 300, 130, 'EU Vote', 'Dec 2026', 'scheduled', '#FBBF24')}
<rect x="54" y="584" width="${W-108}" height="460" rx="20" fill="#161B22"/>
<text x="82" y="632" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#FF4D6D" font-weight="900">Rebranding Context</text>
<line x1="82" y1="646" x2="${W-82}" y2="646" stroke="#30363D" stroke-width="1"/>
<text x="82" y="686" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">German minister: name misleads if not fully autonomous</text>
<text x="82" y="722" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Live on Germany, Spain, Netherlands, Slovakia + 5 more</text>
<text x="82" y="758" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Enhanced Autopilot renamed TAD Basic simultaneously</text>
<text x="82" y="794" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">FSD name unchanged in US, Korea and other markets</text>
<text x="82" y="844" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Strategic Significance</text>
<text x="82" y="882" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Removes friction before EU autonomous driving vote</text>
<text x="82" y="918" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Paves way for Cybercab type approval negotiations</text>
<text x="82" y="954" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Structurally reduces consumer protection liability risk</text>
<text x="82" y="1004" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="1042" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Bernstein PT $360 — accelerates Cybercab cert path</text>
${footer()}`;
    await save('tsla-assisted-driving-20261012-en', svgWrap(inner));
  }

  // ── 7. spacex-nvidia-40b-20261012 (KO) ───────────────────────────
  {
    const inner = `
${gradBar(['#1D4ED8','#2563EB','#60A5FA'])}
${badge(54, 28, 'SPCX', '#2563EB')}
${badge(54+13*4+24+16, 28, '종목분석', '#7C3AED')}
<text x="54" y="124" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#60A5FA" font-weight="900">$400억</text>
<text x="54" y="178" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">엔비디아 칩 차입</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">아폴로 선도 · 핌코 참여 · 2027년 완료 목표</text>
<line x1="54" y1="258" x2="${W-54}" y2="258" stroke="#30363D" stroke-width="2"/>
${statCard(54, 278, 462, 130, '은행 대출', '$100억', '시니어 론', '#60A5FA')}
${statCard(564, 278, 462, 130, '투자등급 채권', '$300억', '아폴로 주도', '#60A5FA')}
<rect x="54" y="440" width="${W-108}" height="560" rx="20" fill="#161B22"/>
<text x="82" y="490" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#60A5FA" font-weight="900">차입 목적과 규모</text>
<line x1="82" y1="504" x2="${W-82}" y2="504" stroke="#30363D" stroke-width="1"/>
<text x="82" y="544" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">AI 인프라 확장 — 스타링크·스타쉴드 연산 수요</text>
<text x="82" y="580" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">블랙웰 기준 H100 등가 수십만 장 규모</text>
<text x="82" y="616" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">미국 기업 AI 목적 단일 차입 사상 최대</text>
<text x="82" y="652" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">MS 오픈AI $130억·아마존 앤트로픽 $40억 상회</text>
<text x="82" y="704" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">IPO 관점 해석</text>
<text x="82" y="742" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">투자등급 채권 → 공모 채권시장 진입 준비 신호</text>
<text x="82" y="778" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">사모 신용 → 자기자본 희석 없이 성장 자금 확보</text>
<text x="82" y="814" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">AI 서비스 매출 가시화 시 IPO 밸류 $1,100~$1,200억</text>
<text x="82" y="860" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">주가 반응</text>
<text x="82" y="898" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">엔비디아 +0.5%  /  스페이스X 시간 외 -1.0%</text>
<text x="82" y="934" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">모건스탠리: 부채비율↑ but 이자 충당 범위 내 긍정적</text>
${footer()}`;
    await save('spacex-nvidia-40b-20261012', svgWrap(inner));
  }

  // ── 8. spacex-nvidia-40b-20261012-en (EN) ────────────────────────
  {
    const inner = `
${gradBar(['#1D4ED8','#2563EB','#60A5FA'])}
${badge(54, 28, 'SPCX', '#2563EB')}
${badge(54+13*4+24+16, 28, 'Analysis', '#7C3AED')}
<text x="54" y="124" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#60A5FA" font-weight="900">$40B</text>
<text x="54" y="178" font-family="Arial Black,Arial,sans-serif" font-size="40" fill="#fff" font-weight="900">Nvidia Chip Financing</text>
<text x="54" y="228" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">Apollo leads · PIMCO in talks · Close target 2027</text>
<line x1="54" y1="258" x2="${W-54}" y2="258" stroke="#30363D" stroke-width="2"/>
${statCard(54, 278, 462, 130, 'Bank Loans', '$10B', 'senior facility', '#60A5FA')}
${statCard(564, 278, 462, 130, 'IG Bonds', '$30B', 'Apollo-led', '#60A5FA')}
<rect x="54" y="440" width="${W-108}" height="560" rx="20" fill="#161B22"/>
<text x="82" y="490" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#60A5FA" font-weight="900">Deal Scale and Purpose</text>
<line x1="82" y1="504" x2="${W-82}" y2="504" stroke="#30363D" stroke-width="1"/>
<text x="82" y="544" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">AI infra expansion — Starlink and Starshield compute</text>
<text x="82" y="580" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Hundreds of thousands of H100-equivalent GPUs</text>
<text x="82" y="616" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Largest single AI-purpose debt raise by a US company</text>
<text x="82" y="652" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Exceeds Microsoft OpenAI $13B and Amazon Anthropic $4B</text>
<text x="82" y="704" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">IPO Signal</text>
<text x="82" y="742" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Investment-grade bonds = SpaceX testing public debt market</text>
<text x="82" y="778" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Private credit avoids equity dilution before IPO</text>
<text x="82" y="814" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">AI service revenue visibility supports $110–120B valuation</text>
<text x="82" y="860" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Market Reaction</text>
<text x="82" y="898" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Nvidia +0.5%  /  SpaceX -1.0% after-hours</text>
<text x="82" y="934" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Morgan Stanley: leverage rises but coverable from AI revenue</text>
${footer()}`;
    await save('spacex-nvidia-40b-20261012-en', svgWrap(inner));
  }

  // ── 9. aapl-iphone18-cut-20261012 (KO) ───────────────────────────
  {
    const inner = `
${gradBar(['#7C3AED','#A855F7','#C084FC'])}
${badge(54, 28, 'AAPL', '#7C3AED')}
${badge(54+13*4+24+16, 28, '종목분석', '#1D4ED8')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#C084FC" font-weight="900">-15~20%</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" font-weight="900">아이폰18 프로 부품 삭감</text>
<text x="54" y="226" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">AI 메모리 원가↑ → 가격 인상 → 수요 둔화</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 300, 130, '시작가', '$1,199', '+$100 인상', '#C084FC')}
${statCard(390, 276, 300, 130, '주가 반응', '-2.5%', '보도 직후', '#EF4444')}
${statCard(726, 276, 300, 130, '교체 주기', '3.8년', '미국 평균', '#F97316')}
<rect x="54" y="438" width="${W-108}" height="580" rx="20" fill="#161B22"/>
<text x="82" y="488" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#C084FC" font-weight="900">원인 분석</text>
<line x1="82" y1="502" x2="${W-82}" y2="502" stroke="#30363D" stroke-width="1"/>
<text x="82" y="542" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">AI 인프라 메모리 수요↑ → 낸드·D램 단가 상승</text>
<text x="82" y="578" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">부품 원가 → 아이폰18 프로 $100 소비자 전가</text>
<text x="82" y="614" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">마이크론: 타이트함 2027년 상반기까지 지속 예고</text>
<text x="82" y="650" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">최근 3년 평균보다 삭감 폭 큼 → 구조적 수요 부진</text>
<text x="82" y="700" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">연쇄 영향</text>
<text x="82" y="738" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">디스플레이 공급사 · TSMC 3nm 일정 조정 가능</text>
<text x="82" y="774" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">프리미엄 스마트폰 전반 구조적 원가 부담 공유</text>
<text x="82" y="810" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">아이폰19 가격 전략 수정 논의 불가피</text>
<text x="82" y="860" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">하우스 뷰</text>
<text x="82" y="898" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">JP모건 목표가 210달러 ↓ (230달러에서) — 출하 5~7% 하향</text>
<text x="82" y="934" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">바클레이 목표가 225달러 유지 — 2027H2 회복 전망</text>
${footer()}`;
    await save('aapl-iphone18-cut-20261012', svgWrap(inner));
  }

  // ── 10. aapl-iphone18-cut-20261012-en (EN) ───────────────────────
  {
    const inner = `
${gradBar(['#7C3AED','#A855F7','#C084FC'])}
${badge(54, 28, 'AAPL', '#7C3AED')}
${badge(54+13*4+24+16, 28, 'Analysis', '#1D4ED8')}
<text x="54" y="120" font-family="Arial Black,Arial,sans-serif" font-size="72" fill="#C084FC" font-weight="900">-15–20%</text>
<text x="54" y="176" font-family="Arial Black,Arial,sans-serif" font-size="38" fill="#fff" font-weight="900">iPhone 18 Pro Order Cut</text>
<text x="54" y="226" font-family="Arial,sans-serif" font-size="26" fill="#8B949E">AI memory costs → $100 price hike → demand softness</text>
<line x1="54" y1="256" x2="${W-54}" y2="256" stroke="#30363D" stroke-width="2"/>
${statCard(54, 276, 300, 130, 'Starting Price', '$1,199', '+$100 increase', '#C084FC')}
${statCard(390, 276, 300, 130, 'Stock Move', '-2.5%', 'on report', '#EF4444')}
${statCard(726, 276, 300, 130, 'Upgrade Cycle', '3.8 yrs', 'US average', '#F97316')}
<rect x="54" y="438" width="${W-108}" height="580" rx="20" fill="#161B22"/>
<text x="82" y="488" font-family="Arial Black,Arial,sans-serif" font-size="26" fill="#C084FC" font-weight="900">Root Cause</text>
<line x1="82" y1="502" x2="${W-82}" y2="502" stroke="#30363D" stroke-width="1"/>
<text x="82" y="542" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">AI infra demand spiked NAND and DRAM component costs</text>
<text x="82" y="578" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Higher BOM passed through to consumers as $100 hike</text>
<text x="82" y="614" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Micron: memory tightness persists into H1 2027</text>
<text x="82" y="650" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Cut is larger than 3-year average — structural demand issue</text>
<text x="82" y="700" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">Downstream Impact</text>
<text x="82" y="738" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Display suppliers and TSMC 3nm schedule may adjust</text>
<text x="82" y="774" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Structural cost headwind shared across premium smartphone OEMs</text>
<text x="82" y="810" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">iPhone 19 pricing strategy reconsideration likely</text>
<text x="82" y="860" font-family="Arial Black,Arial,sans-serif" font-size="24" fill="#FBBF24" font-weight="900">House Views</text>
<text x="82" y="898" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">JPMorgan PT $210 ↓ (from $230) — 5–7% shipment cut</text>
<text x="82" y="934" font-family="Arial,sans-serif" font-size="22" fill="#E6EDF3">Barclays PT $225 maintained — recovery expected H2 2027</text>
${footer()}`;
    await save('aapl-iphone18-cut-20261012-en', svgWrap(inner));
  }

  console.log('\n✅  gen-charts-20261012 완료 — 10개 PNG 생성');
}

main().catch(err => { console.error(err); process.exit(1); });
