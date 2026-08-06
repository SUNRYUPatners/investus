// 2026-08-07 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.07';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  INTC: { fg:'#0071c5', fg2:'#00558a', bg2:'#06121f', card:'#0a1420' },
  AMD:  { fg:'#ed1c24', fg2:'#c00000', bg2:'#1a0606', card:'#200a0a' },
  PLTR: { fg:'#00b4d8', fg2:'#0077b6', bg2:'#050f14', card:'#0a1520' },
  LMT:  { fg:'#facc15', fg2:'#eab308', bg2:'#1a1408', card:'#1e1a0a' },
  PARA: { fg:'#f97316', fg2:'#ea580c', bg2:'#1a0f06', card:'#1e1408' },
  VZ:   { fg:'#ef4444', fg2:'#dc2626', bg2:'#1a0808', card:'#1e0a0a' },
  CMCSA:{ fg:'#0089cf', fg2:'#005a8f', bg2:'#050f1a', card:'#0a1a26' },
  OAI:  { fg:'#10a37f', fg2:'#0d8465', bg2:'#061a15', card:'#0a2018' },
  AAPL: { fg:'#a1a1aa', fg2:'#71717a', bg2:'#0f0f10', card:'#141416' },
  AVGO: { fg:'#c62828', fg2:'#8f1d20', bg2:'#180505', card:'#1e0808' },
  BRK:  { fg:'#0891b2', fg2:'#0e7490', bg2:'#061219', card:'#0a1520' },
  SSNLF:{ fg:'#1f4e9d', fg2:'#163d7c', bg2:'#050c19', card:'#0a1420' },
  META: { fg:'#1877f2', fg2:'#1266d6', bg2:'#050c19', card:'#0a1420' },
  BLK:  { fg:'#000000', fg2:'#374151', bg2:'#0c0c0c', card:'#141416' },
  AMZN: { fg:'#ff9900', fg2:'#e58600', bg2:'#1a0e00', card:'#201408' },
  KO:   { fg:'#f40009', fg2:'#c00007', bg2:'#1a0505', card:'#200a0a' },
  UBER: { fg:'#22c55e', fg2:'#16a34a', bg2:'#061a0d', card:'#0a2014' },
  V:    { fg:'#1a1f71', fg2:'#0f1447', bg2:'#050614', card:'#0a0c1e' },
  JPY:  { fg:"#dc2626", fg2:"#991b1b", bg2:"#1a0505", card:"#200a0a" },
  ORCL: { fg:"#f80000", fg2:"#c00000", bg2:"#0f0505", card:"#1a0808" },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

// === 새 wrap 로직 (2026-07-30~) ===
// 폰트 고정 · 폭 초과 시에만 문맥 기반 wrap
function estimatePxWidth(text, fontSize, isBold){
  // Arial Black(bold) 계수 상향 · 소문자·괄호 등도 상향 조정으로 실 렌더링 근사
  const b = isBold ? 1.15 : 1.0;
  let w=0;
  for(const c of String(text)){
    if(/[가-힣一-龥]/.test(c)) w += fontSize * b;
    else if(/\s/.test(c)) w += fontSize * 0.32;
    else if(/[·—:]/.test(c)) w += fontSize * 0.42;
    else if(/[A-Z0-9]/.test(c)) w += fontSize * 0.68 * b;
    else if(/[iljI!.,;'"`]/.test(c)) w += fontSize * 0.32 * b;
    else if(/[mwMW]/.test(c)) w += fontSize * 0.85 * b;
    else w += fontSize * 0.58 * b;
  }
  return w;
}

// 폭 초과 시에만 wrap · (1) 절 구분자(·—) → (2) 공백 → (3) 문자 강제 분할
function multilineIfOverflow(text, x, y, fontSize, maxPxWidth, maxLines, lh, attrs){
  const isBold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, isBold);
  const px = est(text);
  if(px <= maxPxWidth){
    return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  }
  // 1단계: 절 구분자로 분리
  const rawParts = String(text).split(/(\s·\s|\s—\s|·|—)/).filter(p=>p!==undefined&&p!=='');
  // 2단계: 각 절이 폭 초과 시 공백으로 재분할 (그래도 초과하면 문자 단위)
  const parts = [];
  for(const p of rawParts){
    if(est(p, fontSize) <= maxPxWidth){ parts.push(p); continue; }
    const subs = p.split(/(\s+)/).filter(s=>s!=='');
    for(const s of subs){
      if(est(s, fontSize) <= maxPxWidth){ parts.push(s); continue; }
      // 초긴 단일 토큰 → 문자 단위 강제 분할
      let tmp = s;
      while(est(tmp, fontSize) > maxPxWidth){
        let cutAt = 1;
        while(cutAt < tmp.length && est(tmp.slice(0, cutAt+1), fontSize) <= maxPxWidth) cutAt++;
        parts.push(tmp.slice(0, cutAt));
        tmp = tmp.slice(cutAt);
      }
      if(tmp) parts.push(tmp);
    }
  }
  // 3단계: 라인 조립
  const lines=[]; let cur='';
  for(const p of parts){
    const test = cur + p;
    if(est(test, fontSize) <= maxPxWidth) cur = test;
    else{
      if(cur.trim()) lines.push(cur.trim());
      cur = p.replace(/^[·—\s]+/,'').trim();
      if(lines.length >= maxLines) break;
    }
  }
  if(cur.trim() && lines.length < maxLines){
    if(est(cur, fontSize) > maxPxWidth){
      // 마지막 줄이 여전히 초과하면 잘라내고 …
      let cutAt = 1;
      while(cutAt < cur.length && est(cur.slice(0, cutAt+1) + '…', fontSize) <= maxPxWidth) cutAt++;
      cur = cur.slice(0, cutAt) + '…';
    }
    lines.push(cur);
  }
  return lines.slice(0, maxLines).map((l,i) =>
    `  <text x="${x}" y="${y+i*lh}" ${attrs}>${esc(l)}</text>`
  ).join('\n');
}

// === 고정 폰트 사이즈 (모바일 가독성 우선) ===
const F = {
  TITLE: 28, HERO_BIG: 42, HERO_SUB: 20,
  QUOTE_KO: 20, QUOTE_EN: 17,
  NOTE_HEAD: 19, NOTE_SUB: 17,
  CARD_BIG: 22, CARD_MID: 18, CARD_SUB: 16
};
// 실제 사용 폭 (양쪽 여백 40px씩 · 카드 300px)
const MAX_W = { WIDE: 980, CARD: 260 };

function tpl(oRaw){
  const o=E(oRaw);
  const p=PSYM[oRaw.symbol]||PSYM.MACRO;
  const badge=o.badge||o.symbol;
  const cards=oRaw.cards.map((cRaw,i)=>{
    const c=E(cRaw);const x=[60,390,720][i];
    return`
  <rect x="${x}" y="402" width="300" height="220" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="${x+150}" y="450" font-family="Arial" font-size="36" text-anchor="middle">${c.icon}</text>
  <text x="${x+150}" y="494" font-family="Arial Black,Arial" font-size="${F.CARD_BIG}" font-weight="900" fill="${p.fg}" text-anchor="middle">${c.big}</text>
${multilineIfOverflow(cRaw.mid, x+150, 528, F.CARD_MID, MAX_W.CARD, 2, 22, `font-family="Arial" font-size="${F.CARD_MID}" fill="#9ca3af" text-anchor="middle"`)}
${multilineIfOverflow(cRaw.sub, x+150, 588, F.CARD_SUB, MAX_W.CARD, 2, 20, `font-family="Arial" font-size="${F.CARD_SUB}" fill="#6b7280" text-anchor="middle"`)}`;
  }).join('');
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="150" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="115" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">${badge}</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
${multilineIfOverflow(oRaw.title, 540, 108, F.TITLE, MAX_W.WIDE, 2, 36, `font-family="Arial Black,Arial" font-size="${F.TITLE}" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="90" font-weight="900" fill="${p.fg}" text-anchor="middle" opacity=".15">${o.heroIcon}</text>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="76" font-weight="900" fill="${p.fg}" text-anchor="middle">${o.heroIcon}</text>
  <text x="540" y="300" font-family="Arial Black,Arial" font-size="${F.HERO_BIG}" font-weight="900" fill="#f9fafb" text-anchor="middle">${o.heroBig}</text>
${multilineIfOverflow(oRaw.heroSub, 540, 340, F.HERO_SUB, MAX_W.WIDE, 3, 26, `font-family="Arial" font-size="${F.HERO_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${cards}
  <rect x="60" y="642" width="960" height="180" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="682" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.quoteLabel}</text>
${multilineIfOverflow(oRaw.quoteKo, 540, 714, F.QUOTE_KO, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.QUOTE_KO}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.quoteEn, 540, 772, F.QUOTE_EN, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.QUOTE_EN}" fill="#e5e7eb" text-anchor="middle"`)}
  <text x="540" y="826" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${o.source}</text>
  <rect x="60" y="850" width="960" height="110" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
${multilineIfOverflow(oRaw.noteHead, 540, 884, F.NOTE_HEAD, MAX_W.WIDE, 2, 26, `font-family="Arial" font-size="${F.NOTE_HEAD}" fill="${p.fg}" text-anchor="middle"`)}
${multilineIfOverflow(oRaw.noteSub, 540, 930, F.NOTE_SUB, MAX_W.WIDE, 2, 24, `font-family="Arial" font-size="${F.NOTE_SUB}" fill="#9ca3af" text-anchor="middle"`)}
  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${o.footer} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${o.brand}</text>
</svg>`;
}

const BK='INVESTUS · SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE';
const BE='INVESTUS · SRP CHIEF INVESTMENT OFFICER · NOT FINANCIAL ADVICE';
const T=[
// 1. Terafab 공식 발표
{file:'terafab-official-spcx-tesla-grimes-16b',symbol:'SPCX',
 ko:{title:'SPCX·TSLA — Terafab 공식 발표·Grimes County TX·초기 $16.8B·100M sqft·1 TW compute·세계 최대 chip 팹',heroIcon:'🏭',heroBig:'TERAFAB',heroSub:'SpaceX·Tesla 공식 성명: 세계 최대 chip 제조 시설 Terafab을 Texas Grimes County에 건설 · advanced semiconductor fab · 100M sqft · 초기 $16.8B 투자 · 1 TW compute 초과 필요 · Optimus·Cybercab·궤도 DC용 chip 생산 · 3,000+ 직원',
  cards:[{icon:'🏭',big:'$16.8 B',mid:'초기 투자',sub:'SPCX + Tesla 공동'},{icon:'📏',big:'100 M sqft',mid:'제조 공간',sub:'세계 최대'},{icon:'⚡',big:'1 TW+',mid:'compute 필요',sub:'현 공급 초과'}],
  quoteLabel:'SPACEX·TESLA 공식',quoteKo:'"Terafab은 mission과 sheer size에서 epic·세계 최대 chip 팹·Optimus·Cybercab·SPCX 궤도 DC용 chip 생산·미국 제조업 재건"',quoteEn:'"Terafab will be epic in both mission and sheer size · largest chip fab · chips for Optimus/Cybercab/SPCX space DC · rebuilding American manufacturing"',
  source:'출처: SpaceX 공식 성명 · Tesla 공식 · 2026.08.06',
  noteHead:'왜 중요한가: 8/5 Musk +TSLA 매출·8/6 Moon factory·오늘 chip 인프라 자체 구축 = 우주부터 지상까지 완전 vertical integration',noteSub:'앞으로 볼 것: 착공·완공 시점·다른 phase 확장·삼성 파트너십 진전·chip 실 상용',footer:'Terafab · $16.8B · 100M sqft · 1 TW',brand:BK},
 en:{title:'SPCX·TSLA — Terafab Official Announcement · Grimes County TX · Initial $16.8B · 100M sqft · 1 TW Compute · World\'s Largest Chip Fab',heroIcon:'🏭',heroBig:'TERAFAB',heroSub:'SpaceX·Tesla official: World\'s largest chip fab Terafab in Texas Grimes County · advanced semiconductor fab · 100M sqft · initial $16.8B investment · 1 TW compute needed exceeds current global supply · chips for Optimus/Cybercab/orbital DC · 3,000+ employees',
  cards:[{icon:'🏭',big:'$16.8 B',mid:'Initial investment',sub:'SPCX + Tesla joint'},{icon:'📏',big:'100 M sqft',mid:'Manufacturing space',sub:'World\'s largest'},{icon:'⚡',big:'1 TW+',mid:'Compute needed',sub:'Exceeds current supply'}],
  quoteLabel:'SPACEX·TESLA OFFICIAL',quoteKo:'"Terafab epic in mission and size · Optimus·Cybercab·space DC chips"',quoteEn:'"Terafab will be epic in both mission and sheer size · largest chip fab · chips for Optimus/Cybercab/SPCX space DC · rebuilding American manufacturing"',
  source:'Source: SpaceX official · Tesla official · 2026.08.06',
  noteHead:'Why: 8/5 Musk +TSLA revenue · 8/6 Moon factory · today chip infra self-build = complete vertical integration from space to ground',noteSub:'Watch: Groundbreaking/completion timing · phase expansion · Samsung partnership progress · chip real commercial',footer:'Terafab · $16.8B · 100M sqft · 1 TW',brand:BE}},

// 2. Musk '전 세계 fabs 필요의 2%'
{file:'musk-world-fabs-2pct-terafab-samsung',symbol:'SPCX',
 ko:{title:'Musk — "전 세계 fabs 합계가 Terafab 필요의 2%밖에 안 됨" + 삼성 파트너십·chip 모두 구매',heroIcon:'📊',heroBig:'2 %',heroSub:'DogeDesigner (Musk 인용): 전 세계 fabs를 다 합쳐도 Terafab이 필요로 하는 규모의 2%밖에 안 됨 · Musk가 삼성 파트너십에 감사 표명·삼성이 생산하는 chip 모두 구매 예정·"최대 확장 페이스로 부탁"',
  cards:[{icon:'📊',big:'2 %',mid:'세계 fabs / Terafab 필요',sub:'전례 없는 규모'},{icon:'🇰🇷',big:'삼성',mid:'파트너 확대',sub:'incredible investment'},{icon:'🛒',big:'모두 구매',mid:'삼성 생산 chip',sub:'maximum rate'}],
  quoteLabel:'ELON MUSK · DOGEDESIGNER',quoteKo:'"전 세계 fabs 다 합쳐도 우리 필요의 2%·삼성 파트너십 감사·삼성이 생산하는 chip 모두 구매"',quoteEn:'"All fabs on Earth combined are only 2% of what we need for Terafab · grateful for Samsung partnership · will buy all their chips"',
  source:'출처: DogeDesigner · Elon Musk · 2026.08.06',
  noteHead:'왜 중요한가: Terafab의 규모 실감·삼성전자 최대 수혜·8/6 Cybercab 카메라(삼성전기·LG이노텍)에 이어 chip까지·한국 반도체 파급',noteSub:'앞으로 볼 것: 삼성전자 chip 계약 규모·삼성 파운드리 캐파 확장·TSMC 등 다른 팹 대응',footer:'Musk 2% · 삼성 모두 구매',brand:BK},
 en:{title:'Musk — "All Fabs on Earth Combined Are Only 2% of Terafab Needs" + Samsung Partnership · Buy All Their Chips',heroIcon:'📊',heroBig:'2 %',heroSub:'DogeDesigner (per Musk): World\'s combined fabs = only 2% of what Terafab needs · Musk expresses gratitude for Samsung partnership · will buy all chips Samsung produces · "at maximum rate they\'re comfortable"',
  cards:[{icon:'📊',big:'2 %',mid:'World fabs / Terafab need',sub:'Unprecedented scale'},{icon:'🇰🇷',big:'Samsung',mid:'Partnership expand',sub:'Incredible investment'},{icon:'🛒',big:'Buy all',mid:'Samsung chips',sub:'Maximum rate'}],
  quoteLabel:'ELON MUSK · DOGEDESIGNER',quoteKo:'"세계 fabs 2%·삼성 파트너십·chip 모두 구매"',quoteEn:'"All fabs on Earth combined are only 2% of what we need for Terafab · grateful for Samsung partnership · will buy all their chips"',
  source:'Source: DogeDesigner · Elon Musk · 2026.08.06',
  noteHead:'Why: Realizes Terafab scale · Samsung Electronics biggest beneficiary · after 8/6 Cybercab camera (Samsung Electro-Mechanics/LG Innotek), now chips too · Korean semi ripple',noteSub:'Watch: Samsung Electronics chip deal size · Samsung Foundry capacity expansion · TSMC and other fabs response',footer:'Musk 2% · Samsung buy all',brand:BE}},

// 3. Tesla·SPCX 공동 성명 chip 부족
{file:'tesla-spcx-joint-chip-shortage-frame',symbol:'TSLA',
 ko:{title:'TSLA·SPCX 공동 성명 — "현재·미래 글로벌 chip 생산이 필요량 감당 불가·Terafab이 답"',heroIcon:'⚠️',heroBig:'CHIP GAP',heroSub:'Ely (Tesla·SpaceX 공동 발표 인용): "Tesla·SpaceX 둘 다 현재·미래 글로벌 chip 생산량으로 감당할 수 없을 만큼 많은 chip이 필요"·Terafab 필요성 공식 명시·자체 vertical integration 필수',
  cards:[{icon:'⚠️',big:'감당 불가',mid:'현재·미래 글로벌 chip',sub:'Tesla+SPCX 필요량'},{icon:'🔗',big:'공동 성명',mid:'Tesla·SPCX 동시',sub:'첫 공식 협업'},{icon:'🏗️',big:'Terafab',mid:'해결 인프라',sub:'자체 구축 필수'}],
  quoteLabel:'TESLA · SPCX 공동',quoteKo:'"Tesla·SpaceX 둘 다 현재·미래 글로벌 chip 생산이 필요량 감당 불가"',quoteEn:'"Both Tesla and SpaceX will need far more chips than current and future global production can supply"',
  source:'출처: Ely·Tesla·SPCX 공동 성명·2026.08.06',
  noteHead:'왜 중요한가: 두 회사 공식 공동 발표는 이례적·8/3 Kalshi 60% 합병 확률·8/6 SPCX $295M Tesla 지분과 결합해 통합 그림',noteSub:'앞으로 볼 것: 추가 공동 발표·합병 확률 재평가·chip 조달 세부 계획',footer:'TSLA·SPCX 공동 · chip gap',brand:BK},
 en:{title:'TSLA·SPCX Joint Statement — "Current/Future Global Chip Production Cannot Supply Needs · Terafab Is Answer"',heroIcon:'⚠️',heroBig:'CHIP GAP',heroSub:'Ely (Tesla·SpaceX joint statement): "Both Tesla and SpaceX will need far more chips than current and future global production can supply" · Terafab necessity officially stated · self vertical integration required',
  cards:[{icon:'⚠️',big:'Cannot supply',mid:'Current/future global chip',sub:'Tesla+SPCX needs'},{icon:'🔗',big:'Joint statement',mid:'Tesla·SPCX together',sub:'First official collab'},{icon:'🏗️',big:'Terafab',mid:'Solution infra',sub:'Self-build required'}],
  quoteLabel:'TESLA · SPCX JOINT',quoteKo:'"Tesla·SpaceX 필요량 chip 생산 불가"',quoteEn:'"Both Tesla and SpaceX will need far more chips than current and future global production can supply"',
  source:'Source: Ely · Tesla·SPCX joint statement · 2026.08.06',
  noteHead:'Why: Two companies\' official joint statement is unusual · combines with 8/3 Kalshi 60% merger probability and 8/6 SPCX $295M Tesla stake for integration picture',noteSub:'Watch: Additional joint announcements · merger probability re-rating · chip procurement detailed plan',footer:'TSLA·SPCX Joint · Chip Gap',brand:BE}},

// 4. SPCX $1T 매출 목표 2030으로 pull-forward
{file:'spcx-1t-revenue-2030-pullforward',symbol:'SPCX',
 ko:{title:'SPCX — $1T 매출 목표 2031→2030 pull-forward·2029 가능성 언급 (Q2 콜)',heroIcon:'🎯',heroBig:'2030',heroSub:'Sawyer Merritt (SPCX Q2 콜 인용): SPCX 내부 $1T 매출 목표 시점이 2031→2030으로 앞당김 · "2029에 달성될 가능성도 nonzero" · 8/5 실적 대박 + 오늘 Terafab 공식 발표가 매출 폭발 프레임 강화',
  cards:[{icon:'🎯',big:'2030',mid:'$1T 매출 목표',sub:'기존 2031 pull-forward'},{icon:'⚡',big:'2029 가능',mid:'nonzero chance',sub:'Musk 발언'},{icon:'📈',big:'매출 폭발',mid:'프레임 강화',sub:'Terafab + Q2 실적'}],
  quoteLabel:'SAWYER MERRITT · SPCX Q2 콜',quoteKo:'"$1T 매출 목표 2031→2030 pull-forward·2029 가능성도 nonzero"',quoteEn:'"$1T revenue target pulled forward from 2031 to 2030 · nonzero chance of 2029"',
  source:'출처: Sawyer Merritt·SPCX Q2 콜·2026.08.06',
  noteHead:'왜 중요한가: 8/3 Musk 12-24개월 +TSLA 매출·8/5 Munster 5배 초과·오늘 Terafab·2030 $1T = 매출 폭발 프레임 다층 확정',noteSub:'앞으로 볼 것: 실 매출 성장률·연말 $10B run rate(8/5 Munster) 실체·2029/2030 이정표',footer:'SPCX $1T · 2030 pull-forward',brand:BK},
 en:{title:'SPCX — $1T Revenue Target Pulled Forward from 2031 to 2030 · Nonzero 2029 Chance (Q2 Call)',heroIcon:'🎯',heroBig:'2030',heroSub:'Sawyer Merritt (SPCX Q2 call): SPCX internal $1T revenue target pulled forward from 2031 to 2030 · "nonzero chance of 2029 achievement" · 8/5 earnings blowout + today Terafab announcement strengthen revenue explosion frame',
  cards:[{icon:'🎯',big:'2030',mid:'$1T revenue target',sub:'Pulled from 2031'},{icon:'⚡',big:'2029 possible',mid:'Nonzero chance',sub:'Musk statement'},{icon:'📈',big:'Revenue surge',mid:'Frame strengthened',sub:'Terafab + Q2'}],
  quoteLabel:'SAWYER MERRITT · SPCX Q2 CALL',quoteKo:'"$1T 2031→2030 pull-forward·2029 nonzero"',quoteEn:'"$1T revenue target pulled forward from 2031 to 2030 · nonzero chance of 2029"',
  source:'Source: Sawyer Merritt · SPCX Q2 call · 2026.08.06',
  noteHead:'Why: 8/3 Musk 12-24 mo +TSLA revenue · 8/5 Munster 5× · today Terafab · 2030 $1T = revenue explosion frame multi-layer confirmed',noteSub:'Watch: Actual revenue growth · year-end $10B run rate substance · 2029/2030 milestones',footer:'SPCX $1T · 2030 pull-forward',brand:BE}},

// 5. SPCX 락업 $100B unlock
{file:'spcx-lockup-100b-unlock-14x-float',symbol:'SPCX',
 ko:{title:'SPCX — 락업 해제 ~$100B unlock·free float 1.4배 규모·시장 흡수 시험대',heroIcon:'🔓',heroBig:'$100 B',heroSub:'Bull Theory: SPCX 락업 만료로 ~$100B 규모 shares unlock·현재 free float ~$39B의 1.4배·시장 흡수 능력 시험·8/6 blackout 71.5M 상환으로 사전 완화됐지만 여전 대규모',
  cards:[{icon:'🔓',big:'~$100 B',mid:'unlock 규모',sub:'shares 해제'},{icon:'📊',big:'1.4 ×',mid:'현 free float 대비',sub:'$39B 기준'},{icon:'🎢',big:'흡수 시험',mid:'시장 소화 능력',sub:'유동성 관찰'}],
  quoteLabel:'BULL THEORY',quoteKo:'"SPCX 락업 unlock 규모 ~$100B·현 free float $39B의 1.4배"',quoteEn:'"SPCX lockup unlock ~$100B · 1.4× current free float of ~$39B"',
  source:'출처: Bull Theory·2026.08.06',
  noteHead:'왜 중요한가: 8/6 blackout 71.5M 상환·free float 11.8% 확대와 함께 이번 락업이 시장 흡수 시험대·오늘 +6% 반등이 첫 답',noteSub:'앞으로 볼 것: 후속 매도 volume·40% 유통까지 12월 페이스·기관 flow',footer:'SPCX 락업 $100B · 1.4× float',brand:BK},
 en:{title:'SPCX — Lockup Unlock ~$100B · 1.4× Free Float · Market Absorption Test',heroIcon:'🔓',heroBig:'$100 B',heroSub:'Bull Theory: SPCX lockup expiration unlocks ~$100B in shares · 1.4× current free float of ~$39B · market absorption capacity tested · 8/6 blackout 71.5M redemption eased pre-emptively but still massive',
  cards:[{icon:'🔓',big:'~$100 B',mid:'Unlock size',sub:'Shares released'},{icon:'📊',big:'1.4 ×',mid:'vs current free float',sub:'$39B basis'},{icon:'🎢',big:'Absorption test',mid:'Market digestion',sub:'Liquidity watch'}],
  quoteLabel:'BULL THEORY',quoteKo:'"SPCX unlock $100B·1.4× float"',quoteEn:'"SPCX lockup unlock ~$100B · 1.4× current free float of ~$39B"',
  source:'Source: Bull Theory · 2026.08.06',
  noteHead:'Why: With 8/6 blackout 71.5M redemption/free float 11.8% expansion, this lockup is market absorption test · today\'s +6% rebound is first answer',noteSub:'Watch: Follow-through sell volume · 40% float by December pace · institutional flow',footer:'SPCX Lockup $100B · 1.4× Float',brand:BE}},

// 6. SPCX +6% rebound
{file:'spcx-6pct-rebound-earnings-recovery',symbol:'SPCX',
 ko:{title:'SPCX — 실적 대박 후 +6% 반등·전일 -10% 하락에서 회복 시작',heroIcon:'📈',heroBig:'+6 %',heroSub:'Bull Theory: SPCX가 첫 실적 콜 이후 +6% 반등·8/6 -10% 하락에서 회복 시작·Revenue $7.8B(컨센 $6.81B)·CAPEX 우려 완화되지 않았지만 매출 폭발 프레임이 다시 우세',
  cards:[{icon:'📈',big:'+6 %',mid:'오늘 반등',sub:'8/6 -10%에서 회복'},{icon:'💰',big:'$7.8 B',mid:'Q2 매출',sub:'컨센 $6.81B 초과'},{icon:'🔄',big:'프레임 전환',mid:'CAPEX 우려 → 매출 폭발',sub:'시장 재평가'}],
  quoteLabel:'BULL THEORY',quoteKo:'"SPCX +6% 반등·실적 후 CAPEX 우려에서 매출 폭발 프레임으로 전환"',quoteEn:'"SPCX +6% rebound · frame shift from CAPEX concerns to revenue explosion after earnings"',
  source:'출처: Bull Theory·2026.08.06',
  noteHead:'왜 중요한가: 8/6 -10%·8/6 blackout 71.5M 상환·8/5 Musk $100 insane 발언 조합이 반등 트리거·오늘 Terafab 발표가 추가 지지',noteSub:'앞으로 볼 것: 반등 지속·40% 유통까지 12월·다음 실적',footer:'SPCX +6% · 실적 후 반등',brand:BK},
 en:{title:'SPCX — +6% Rebound After Earnings · Recovery Starts from Prior Day -10%',heroIcon:'📈',heroBig:'+6 %',heroSub:'Bull Theory: SPCX +6% rebound after first earnings call · recovery from 8/6 -10% · Revenue $7.8B (est $6.81B) · CAPEX concerns not fully resolved but revenue explosion frame regains upper hand',
  cards:[{icon:'📈',big:'+6 %',mid:'Today rebound',sub:'From 8/6 -10%'},{icon:'💰',big:'$7.8 B',mid:'Q2 revenue',sub:'Exceeds est $6.81B'},{icon:'🔄',big:'Frame shift',mid:'CAPEX → revenue surge',sub:'Market re-rating'}],
  quoteLabel:'BULL THEORY',quoteKo:'"SPCX +6% 반등·매출 프레임 우세"',quoteEn:'"SPCX +6% rebound · frame shift from CAPEX concerns to revenue explosion after earnings"',
  source:'Source: Bull Theory · 2026.08.06',
  noteHead:'Why: Combination of 8/6 -10% / 8/6 blackout 71.5M redemption / 8/5 Musk $100 insane triggers rebound · today\'s Terafab adds support',noteSub:'Watch: Rebound continuity · 40% float by December · next earnings',footer:'SPCX +6% · Post-earnings rebound',brand:BE}},

// 7. Bluebird 3 satellites deployed
{file:'spcx-bluebird-3-satellites-direct-phone',symbol:'SPCX',
 ko:{title:'SPCX — Bluebird 위성 3개 배치 완료·direct-to-phone 상용 시작·지상 기지국 없는 통신',heroIcon:'🛰️',heroBig:'3 위성',heroSub:'SpaceX 공식: Bluebird 위성 3개 배치 확인 · 8/6 Starlink Mobile 100+ 국가와 결합 · Garry Tan "direct-to-phone broadband from orbit·no ground towers required·doing God\'s work"·궤도에서 폰 직접 연결',
  cards:[{icon:'🛰️',big:'3',mid:'Bluebird 위성',sub:'궤도 배치 완료'},{icon:'📱',big:'Direct-to-phone',mid:'지상 기지국 X',sub:'상용 시작'},{icon:'🌐',big:'100+ 국가',mid:'Starlink Mobile',sub:'8/6 리포트'}],
  quoteLabel:'SPACEX·GARRY TAN',quoteKo:'"Bluebird 위성 3개 배치·궤도에서 폰 직접 연결·지상 기지국 없이·God\'s work"',quoteEn:'"3 Bluebird satellites deployed · direct-to-phone from orbit · no ground towers · doing God\'s work"',
  source:'출처: SpaceX 공식·Garry Tan·2026.08.06',
  noteHead:'왜 중요한가: 8/6 Shotwell "V·T·TMO $600B 도전"의 실 하드웨어 근거·Bluebird = 위성 통신 핵심 위성',noteSub:'앞으로 볼 것: 서비스 상용 개시·초기 가입자·V·T·TMO 반응·다음 Bluebird 발사',footer:'SPCX Bluebird 3·direct-to-phone',brand:BK},
 en:{title:'SPCX — 3 Bluebird Satellites Deployed · Direct-to-Phone Commercial Start · No Ground Towers Required',heroIcon:'🛰️',heroBig:'3 sats',heroSub:'SpaceX official: 3 Bluebird satellites deployment confirmed · combines with 8/6 Starlink Mobile 100+ countries · Garry Tan "direct-to-phone broadband from orbit · no ground towers required · doing God\'s work" · direct phone connection from orbit',
  cards:[{icon:'🛰️',big:'3',mid:'Bluebird satellites',sub:'Orbital deployment done'},{icon:'📱',big:'Direct-to-phone',mid:'No ground towers',sub:'Commercial start'},{icon:'🌐',big:'100+ countries',mid:'Starlink Mobile',sub:'8/6 report'}],
  quoteLabel:'SPACEX · GARRY TAN',quoteKo:'"Bluebird 3배치·direct-to-phone"',quoteEn:'"3 Bluebird satellites deployed · direct-to-phone from orbit · no ground towers · doing God\'s work"',
  source:'Source: SpaceX official · Garry Tan · 2026.08.06',
  noteHead:'Why: Real hardware basis for 8/6 Shotwell "V/T/TMO $600B challenge" · Bluebird = satellite comms core satellites',noteSub:'Watch: Service commercial launch · initial subscribers · V/T/TMO reaction · next Bluebird launches',footer:'SPCX Bluebird 3 · Direct-to-phone',brand:BE}},

// 8. SPCX 2026 orbital mass 80-95%
{file:'spcx-2026-orbital-mass-80-95pct-china-8pct',symbol:'SPCX',
 ko:{title:'SPCX — 2026년 세계 궤도 mass의 80-95% 발사·중국 8-10%·Falcon 90% flights zero failure',heroIcon:'🌍',heroBig:'80-95 %',heroSub:'Musk·SpaceX 공식: SPCX가 2026년 세계 궤도 mass의 80-95% 발사 · 중국은 8-10% (참고) · Falcon 9 90% flights zero failure · 재사용 boosters 30+ times · 궤도 발사 시장 극단 지배',
  cards:[{icon:'🌍',big:'80-95 %',mid:'세계 궤도 mass',sub:'SPCX 발사 비중'},{icon:'🇨🇳',big:'8-10 %',mid:'중국 (참고)',sub:'SPCX 대비 소수'},{icon:'✅',big:'90 % zero failure',mid:'Falcon flights',sub:'재사용 30+ times'}],
  quoteLabel:'ELON MUSK · SPACEX',quoteKo:'"SPCX 2026 세계 궤도 mass 80-95% 발사·중국 8-10%·Falcon 90% flights zero failure·재사용 30+ times"',quoteEn:'"SPCX launched 80-95% of ALL mass to orbit in 2026 · China 8-10% · Falcon 90% flights zero failure · reusable boosters 30+ times"',
  source:'출처: Elon Musk·SpaceX·2026.08.06',
  noteHead:'왜 중요한가: SPCX 궤도 발사 시장 극단 지배 실체 확인·8/6 Starship 1/day 목표의 근거·오늘 Terafab·Bluebird·궤도 DC 인프라 다각 지원',noteSub:'앞으로 볼 것: 중국 발사 추격·다른 경쟁사(Blue Origin·Rocket Lab)·Starship 상용화',footer:'SPCX 궤도 80-95% · 지배',brand:BK},
 en:{title:'SPCX — Launched 80-95% of All 2026 Orbital Mass · China 8-10% · Falcon 90% Flights Zero Failure',heroIcon:'🌍',heroBig:'80-95 %',heroSub:'Musk·SpaceX official: SPCX launched 80-95% of world orbital mass in 2026 · China 8-10% (reference) · Falcon 9 90% flights zero failure · reusable boosters 30+ times · extreme orbital launch market dominance',
  cards:[{icon:'🌍',big:'80-95 %',mid:'World orbital mass',sub:'SPCX launch share'},{icon:'🇨🇳',big:'8-10 %',mid:'China (reference)',sub:'Small vs SPCX'},{icon:'✅',big:'90 % zero failure',mid:'Falcon flights',sub:'Reusable 30+ times'}],
  quoteLabel:'ELON MUSK · SPACEX',quoteKo:'"SPCX 2026 80-95% mass·중국 8-10%·Falcon 90% zero failure"',quoteEn:'"SPCX launched 80-95% of ALL mass to orbit in 2026 · China 8-10% · Falcon 90% flights zero failure · reusable boosters 30+ times"',
  source:'Source: Elon Musk · SpaceX · 2026.08.06',
  noteHead:'Why: SPCX orbital launch market extreme dominance substance · basis for 8/6 Starship 1/day target · today\'s Terafab/Bluebird/orbital DC infra support',noteSub:'Watch: China launch catch-up · other competitors (Blue Origin/Rocket Lab) · Starship commercialization',footer:'SPCX Orbital 80-95% · Dominance',brand:BE}},

// 9. Tesla Megapack 3 Brookshire
{file:'tesla-megapack-3-brookshire-50gwh',symbol:'TSLA',
 ko:{title:'TSLA — Megapack 3 공장 (Brookshire TX)·16개월 만에 착공→가동·연 50 GWh 캐파',heroIcon:'🔋',heroBig:'50 GWh/yr',heroSub:'Tesla Megapack 공식: Brookshire Texas Megapack 3 공장이 16개월 만에 착공에서 가동으로·designed capacity 연 50 GWh·Tesla 에너지 사업 대규모 캐파 확장·8/6 SPCX Megapacks $500M 매출과 결합',
  cards:[{icon:'🏗️',big:'16개월',mid:'착공→가동',sub:'Brookshire TX'},{icon:'⚡',big:'50 GWh/yr',mid:'Designed capacity',sub:'Megapack 3'},{icon:'💰',big:'매출 확장',mid:'SPCX $500M 계약',sub:'8/6 리포트'}],
  quoteLabel:'TESLA MEGAPACK 공식',quoteKo:'"Brookshire Megapack 3 공장·16개월 착공→가동·연 50 GWh 캐파"',quoteEn:'"Brookshire Megapack 3 factory · 16 months groundbreaking to operation · 50 GWh/year designed capacity"',
  source:'출처: Tesla Megapack 공식·2026.08.06',
  noteHead:'왜 중요한가: Tesla 에너지 사업 매출 확장·8/6 SPCX $500M Megapacks 계약의 공급 근거·오늘 SPCX Q2 $296M Megapacks 지출과 정합',noteSub:'앞으로 볼 것: Megapack 3 실 생산·다음 공장 착공·SPCX 외 대량 계약',footer:'Tesla Megapack 3 · 50 GWh/yr',brand:BK},
 en:{title:'TSLA — Megapack 3 Factory (Brookshire TX) · 16 Months Groundbreaking to Operation · 50 GWh/yr Capacity',heroIcon:'🔋',heroBig:'50 GWh/yr',heroSub:'Tesla Megapack official: Brookshire Texas Megapack 3 factory went from groundbreaking to operation in 16 months · designed capacity 50 GWh/year · Tesla energy business large-scale capacity expansion · combines with 8/6 SPCX Megapacks $500M',
  cards:[{icon:'🏗️',big:'16 months',mid:'Groundbreak → operation',sub:'Brookshire TX'},{icon:'⚡',big:'50 GWh/yr',mid:'Designed capacity',sub:'Megapack 3'},{icon:'💰',big:'Revenue expansion',mid:'SPCX $500M deal',sub:'8/6 report'}],
  quoteLabel:'TESLA MEGAPACK OFFICIAL',quoteKo:'"Brookshire Megapack 3·16개월·50 GWh/yr"',quoteEn:'"Brookshire Megapack 3 factory · 16 months groundbreaking to operation · 50 GWh/year designed capacity"',
  source:'Source: Tesla Megapack official · 2026.08.06',
  noteHead:'Why: Tesla energy revenue expansion · supply basis for 8/6 SPCX $500M Megapacks deal · consistent with today\'s SPCX Q2 $296M Megapacks spend',noteSub:'Watch: Megapack 3 actual production · next factory groundbreaking · large deals beyond SPCX',footer:'Tesla Megapack 3 · 50 GWh/yr',brand:BE}},

// 10. Starship next flight V3 satellites + ship catch
{file:'spcx-starship-next-flight-v3-satellites-ship-catch',symbol:'SPCX',
 ko:{title:'SPCX — 다음 Starship 발사 시 Starlink V3 위성 첫 궤도 배치·Ship catch 시도',heroIcon:'🚀',heroBig:'V3 궤도',heroSub:'Sawyer Merritt (Musk 발표): 다음 Starship 발사에서 Starlink V3 위성 첫 궤도 배치·상용 시작 · Ship catch(2단 회수) 시도·8/3 Flight 14 upper catch·8/5 rapid reusability 해결과 결합',
  cards:[{icon:'🛰️',big:'V3 궤도 첫',mid:'Starlink 배치',sub:'상용 시작'},{icon:'🏗️',big:'Ship catch',mid:'2단 회수 시도',sub:'완전 재사용'},{icon:'🔗',big:'다음 발사',mid:'V3 + catch 동시',sub:'2중 마일스톤'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"다음 Starship 발사에서 Starlink V3 첫 궤도 배치·상용 시작·Ship catch 시도"',quoteEn:'"Next Starship flight will deploy Starlink V3 satellites to orbit first time · commercial start · attempting ship catch"',
  source:'출처: Sawyer Merritt·Elon Musk·2026.08.06',
  noteHead:'왜 중요한가: 8/3 Flight 14 upper catch·8/5 Musk reusability 해결·8/6 Starlink V3 gigabit 발언의 실 발사 실체·궤도 DC·direct-to-phone 다중 지원',noteSub:'앞으로 볼 것: 발사 시점·Ship catch 성공 여부·V3 상용 서비스 개시·Starship 1/day 로드맵',footer:'Starship 다음 · V3 · Ship catch',brand:BK},
 en:{title:'SPCX — Next Starship Flight to Deploy Starlink V3 Satellites First Time to Orbit + Ship Catch Attempt',heroIcon:'🚀',heroBig:'V3 orbit',heroSub:'Sawyer Merritt (Musk announcement): Next Starship flight deploys Starlink V3 satellites to orbit first time · commercial start · attempting Ship catch (2nd stage recovery) · combines with 8/3 Flight 14 upper catch and 8/5 rapid reusability solved',
  cards:[{icon:'🛰️',big:'V3 first orbit',mid:'Starlink deploy',sub:'Commercial start'},{icon:'🏗️',big:'Ship catch',mid:'2nd stage recovery',sub:'Full reusability'},{icon:'🔗',big:'Next flight',mid:'V3 + catch together',sub:'Dual milestone'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"V3 첫 궤도·Ship catch 시도"',quoteEn:'"Next Starship flight will deploy Starlink V3 satellites to orbit first time · commercial start · attempting ship catch"',
  source:'Source: Sawyer Merritt · Elon Musk · 2026.08.06',
  noteHead:'Why: Real launch substance of 8/3 Flight 14 upper catch / 8/5 Musk reusability solved / 8/6 Starlink V3 gigabit · supports orbital DC and direct-to-phone',noteSub:'Watch: Launch timing · Ship catch success · V3 commercial service start · Starship 1/day roadmap',footer:'Starship next · V3 · Ship catch',brand:BE}},

// 11. SPCX Q2 Megapacks $296M · Q1 $329M · 2025 $506M
{file:'spcx-megapacks-cumulative-tesla-1b-plus',symbol:'SPCX',
 ko:{title:'SPCX — Q2 Tesla Megapacks $296M 지출·Q1 $329M·2025 총 $506M·누적 $1.1B',heroIcon:'💰',heroBig:'$1.1 B+',heroSub:'Ming (SPCX 10-Q 공시): SPCX가 Tesla Megapacks에 Q2 $296M·Q1 $329M·2025 총 $506M 지출·누적 $1.1B+·Tesla 에너지 최대 고객·8/6 리포트 $500M보다 실 규모 훨씬 큼',
  cards:[{icon:'💰',big:'$296 M',mid:'Q2 2026',sub:'Megapacks 신 지출'},{icon:'📊',big:'$329 M',mid:'Q1 2026',sub:'전분기'},{icon:'📈',big:'$506 M',mid:'2025 총합',sub:'전년 누적'}],
  quoteLabel:'MING · SPCX 10-Q',quoteKo:'"SPCX Q2 Tesla Megapacks $296M·Q1 $329M·2025 $506M·누적 $1.1B+"',quoteEn:'"SPCX Q2 Tesla Megapacks $296M · Q1 $329M · 2025 total $506M · cumulative $1.1B+"',
  source:'출처: Ming·SPCX 10-Q·2026.08.06',
  noteHead:'왜 중요한가: 오늘 Terafab·Tesla Megapack 3 공장·Tesla-SPCX 통합 실체가 $1.1B 누적 지출로 이미 확인·8/3 Kalshi 60% 합병 확률의 재정 근거',noteSub:'앞으로 볼 것: Q3 지출·누적 증가·Tesla-SPCX 재정 통합 심화·합병 시나리오',footer:'SPCX·Tesla Megapacks · $1.1B+',brand:BK},
 en:{title:'SPCX — Q2 Tesla Megapacks $296M · Q1 $329M · 2025 Total $506M · Cumulative $1.1B+',heroIcon:'💰',heroBig:'$1.1 B+',heroSub:'Ming (SPCX 10-Q filing): SPCX spent Q2 $296M · Q1 $329M · 2025 total $506M on Tesla Megapacks · cumulative $1.1B+ · Tesla Energy\'s biggest customer · far larger than 8/6\'s reported $500M',
  cards:[{icon:'💰',big:'$296 M',mid:'Q2 2026',sub:'Megapacks new spend'},{icon:'📊',big:'$329 M',mid:'Q1 2026',sub:'Prior quarter'},{icon:'📈',big:'$506 M',mid:'2025 total',sub:'Prior year cumulative'}],
  quoteLabel:'MING · SPCX 10-Q',quoteKo:'"Q2 $296M·Q1 $329M·2025 $506M·누적 $1.1B+"',quoteEn:'"SPCX Q2 Tesla Megapacks $296M · Q1 $329M · 2025 total $506M · cumulative $1.1B+"',
  source:'Source: Ming · SPCX 10-Q · 2026.08.06',
  noteHead:'Why: Today\'s Terafab / Tesla Megapack 3 factory / Tesla-SPCX integration substance already confirmed by $1.1B cumulative · financial basis for 8/3 Kalshi 60% merger probability',noteSub:'Watch: Q3 spend · cumulative growth · Tesla-SPCX financial integration deepening · merger scenario',footer:'SPCX·Tesla Megapacks · $1.1B+',brand:BE}},

// 12. Aschenbrenner $500M new investment
{file:'aschenbrenner-500m-return-private-company',symbol:'MACRO',
 ko:{title:'매크로 — Leopold Aschenbrenner $500M 신 투자·private company (7/31 강제 청산 후 return)',heroIcon:'🎯',heroBig:'$500 M',heroSub:'Leopold Stock Tracker (Bloomberg): Leopold Aschenbrenner가 7/31 Situational Awareness Fund 강제 청산 후 $500M private company에 신 투자·리턴 시작·AI 관련 자산 유동성 우려 완화 시그널 가능',
  cards:[{icon:'🎯',big:'$500 M',mid:'신 투자 규모',sub:'Aschenbrenner return'},{icon:'🏢',big:'Private company',mid:'투자 대상',sub:'구체 미공개'},{icon:'🔄',big:'Return',mid:'7/31 청산 후',sub:'AI 시장 복귀'}],
  quoteLabel:'LEOPOLD STOCK TRACKER · BLOOMBERG',quoteKo:'"Leopold Aschenbrenner가 $500M private company 투자·7/31 강제 청산 후 return"',quoteEn:'"Leopold Aschenbrenner returns to investing with $500M bet in private company · after 7/31 forced liquidation"',
  source:'출처: Leopold Stock Tracker·Bloomberg·2026.08.06',
  noteHead:'왜 중요한가: 7/31 Aschenbrenner 강제 청산이 AI 유동성 우려의 상징이었지만 오늘 return이 심리 회복 시그널·매크로 완화 프레임과 정합',noteSub:'앞으로 볼 것: private company 정체·다른 AI 헤지펀드 회복·AI 자산 유동성',footer:'Aschenbrenner return · $500M',brand:BK},
 en:{title:'MACRO — Leopold Aschenbrenner $500M New Investment in Private Company · Returns After 7/31 Forced Liquidation',heroIcon:'🎯',heroBig:'$500 M',heroSub:'Leopold Stock Tracker (Bloomberg): Leopold Aschenbrenner returns to investing with $500M in private company after 7/31 Situational Awareness Fund forced liquidation · AI-related asset liquidity concern relief signal possible',
  cards:[{icon:'🎯',big:'$500 M',mid:'New investment size',sub:'Aschenbrenner return'},{icon:'🏢',big:'Private company',mid:'Investment target',sub:'Specifics undisclosed'},{icon:'🔄',big:'Return',mid:'After 7/31 liquidation',sub:'AI market comeback'}],
  quoteLabel:'LEOPOLD STOCK TRACKER · BLOOMBERG',quoteKo:'"Aschenbrenner return·$500M private company"',quoteEn:'"Leopold Aschenbrenner returns to investing with $500M bet in private company · after 7/31 forced liquidation"',
  source:'Source: Leopold Stock Tracker · Bloomberg · 2026.08.06',
  noteHead:'Why: 7/31 Aschenbrenner forced liquidation symbolized AI liquidity concerns · today\'s return signals sentiment recovery · consistent with macro relief frame',noteSub:'Watch: Private company identity · other AI hedge fund recovery · AI asset liquidity',footer:'Aschenbrenner Return · $500M',brand:BE}},

// 13. Bill Ackman SPCX shareholder
{file:'bill-ackman-spcx-shareholder-xai-personal',symbol:'SPCX',
 ko:{title:'SPCX — Bill Ackman "SPCX 주주·xAI 투자자·대규모 개인 투자·amazing company"',heroIcon:'🏛️',heroBig:'ACKMAN IN',heroSub:'Bill Ackman (Pershing Square) 발언: "SpaceX is an amazing company·저는 SpaceX 주주가 됐고 xAI에 이미 투자자였음·회사에 상당한 규모의 개인 투자"·mega 헤지펀드 매니저 SPCX 참여 실체',
  cards:[{icon:'🏛️',big:'SPCX 주주',mid:'Ackman 개인',sub:'Pershing Square 매니저'},{icon:'🤖',big:'xAI 투자자',mid:'기존 포지션',sub:'AI 축 다각'},{icon:'💼',big:'대규모',mid:'개인 투자 규모',sub:'"decent size"'}],
  quoteLabel:'BILL ACKMAN',quoteKo:'"SPCX는 amazing company·저는 SPCX 주주·xAI 이미 투자자·회사에 decent size 개인 투자"',quoteEn:'"SpaceX is an amazing company · I definitely became a SpaceX shareholder · was investor in xAI · decent size personal investment"',
  source:'출처: Bill Ackman·2026.08.06',
  noteHead:'왜 중요한가: 대형 헤지펀드 매니저 개인 참여·8/5 Wood·Baron 매수와 함께 SPCX 기관 flow 다각 확대·-10% 시세 후 반등 지지',noteSub:'앞으로 볼 것: Pershing Square 공식 포지션·다른 대형 매니저 참여·기관 flow 지속',footer:'SPCX · Bill Ackman 주주',brand:BK},
 en:{title:'SPCX — Bill Ackman "SpaceX Shareholder · xAI Investor · Decent Size Personal Investment · Amazing Company"',heroIcon:'🏛️',heroBig:'ACKMAN IN',heroSub:'Bill Ackman (Pershing Square): "SpaceX is an amazing company · I definitely became a SpaceX shareholder · was investor in xAI · decent size personal investment" · mega hedge fund manager SPCX participation substance',
  cards:[{icon:'🏛️',big:'SPCX shareholder',mid:'Ackman personal',sub:'Pershing Square mgr'},{icon:'🤖',big:'xAI investor',mid:'Existing position',sub:'AI axis diversified'},{icon:'💼',big:'Decent size',mid:'Personal investment',sub:'Own words'}],
  quoteLabel:'BILL ACKMAN',quoteKo:'"SPCX amazing·주주·xAI 투자자"',quoteEn:'"SpaceX is an amazing company · I definitely became a SpaceX shareholder · was investor in xAI · decent size personal investment"',
  source:'Source: Bill Ackman · 2026.08.06',
  noteHead:'Why: Mega hedge fund manager personal participation · with 8/5 Wood/Baron buying, SPCX institutional flow multi-axis expansion · supports post -10% rebound',noteSub:'Watch: Pershing Square official position · other large manager participation · institutional flow continuity',footer:'SPCX · Bill Ackman In',brand:BE}},

// 14. GOOGL $25B bond
{file:'googl-25b-bond-issuance-40yr-155bps',symbol:'GOOGL',
 ko:{title:'GOOGL — $25B 채권 발행·10 tranche·40년물 T+1.55% (Alphabet 대규모 자본 조달)',heroIcon:'📜',heroBig:'$25 B',heroSub:'Evan D·unusual_whales (Bloomberg): Alphabet이 US investment-grade 채권 발행 준비·최대 $25B 조달·10 tranche·3-40년 만기·40년물 초기 pricing T+1.55%·mega-cap 신용도',
  cards:[{icon:'📜',big:'$25 B',mid:'채권 발행',sub:'US IG bond'},{icon:'🔟',big:'10 tranche',mid:'만기 3-40년',sub:'다각 tenor'},{icon:'📊',big:'T+1.55 %',mid:'40년물 초기',sub:'mega-cap 신용'}],
  quoteLabel:'EVAN D · UNUSUAL_WHALES · BLOOMBERG',quoteKo:'"Alphabet이 최대 $25B 채권 발행·10 tranche·40년물 T+1.55%"',quoteEn:'"Alphabet marketing up to $25B IG bond in 10 tranches · 40-yr pricing T+1.55%"',
  source:'출처: Evan D·unusual_whales·Bloomberg·2026.08.06',
  noteHead:'왜 중요한가: 8/6 GOOGL AAPL 초과 #2·오늘 $25B 채권 = 대규모 자본 조달로 AI·Cloud CAPEX 지원·mega-cap 강세 확인',noteSub:'앞으로 볼 것: 실 발행 조건·자금 사용처(CAPEX·자사주·인수)·다른 하이퍼 유사 발행',footer:'GOOGL $25B · 40년 T+155',brand:BK},
 en:{title:'GOOGL — $25B Bond Issuance · 10 Tranches · 40-Year T+1.55% (Alphabet Large Capital Raise)',heroIcon:'📜',heroBig:'$25 B',heroSub:'Evan D · unusual_whales (Bloomberg): Alphabet preparing US IG bond issuance · up to $25B · 10 tranches · 3-40 year maturities · 40-year initial pricing T+1.55% · mega-cap credit',
  cards:[{icon:'📜',big:'$25 B',mid:'Bond issuance',sub:'US IG bond'},{icon:'🔟',big:'10 tranches',mid:'3-40 yr maturities',sub:'Multi-tenor'},{icon:'📊',big:'T+1.55 %',mid:'40-yr initial',sub:'Mega-cap credit'}],
  quoteLabel:'EVAN D · UNUSUAL_WHALES · BLOOMBERG',quoteKo:'"Alphabet $25B 채권·10 tranche"',quoteEn:'"Alphabet marketing up to $25B IG bond in 10 tranches · 40-yr pricing T+1.55%"',
  source:'Source: Evan D · unusual_whales · Bloomberg · 2026.08.06',
  noteHead:'Why: 8/6 GOOGL AAPL surpass #2 · today $25B bond = large capital raise supports AI/Cloud CAPEX · mega-cap strength confirmed',noteSub:'Watch: Actual issue terms · fund usage (CAPEX/buyback/M&A) · other hyper similar issuance',footer:'GOOGL $25B · 40Y T+155',brand:BE}},

// 15. Macro US Treasury $4B buyback + SanDisk Q2
{file:'macro-us-treasury-4b-buyback-sandisk',symbol:'MACRO',
 ko:{title:'매크로 — 미 재무부 $4B 자체 부채 매입 예정 + SanDisk Q2 대박 (Data Center $3.03B)',heroIcon:'💵',heroBig:'$4 B',heroSub:'Barchart: 미 재무부가 이번 주 $4B 자체 부채 매입 예정·유동성 관리 조치 · 별개 Investing visuals: SanDisk Q2 대박·Revenue $9.68B(+42%)·EPS $1.28(컨센 $0.42, +205% 비트)·Data Center $3.03B (컨센 $2.68B)',
  cards:[{icon:'💵',big:'$4 B',mid:'미 재무부 매입',sub:'이번 주 자체 부채'},{icon:'💾',big:'$3.03 B',mid:'SanDisk Data Center',sub:'컨센 $2.68B 초과'},{icon:'📈',big:'+205 %',mid:'SanDisk EPS 비트',sub:'$1.28 vs $0.42'}],
  quoteLabel:'BARCHART · INVESTING VISUALS',quoteKo:'"미 재무부 $4B 자체 부채 매입·SanDisk Q2 Data Center $3.03B·EPS +205% 비트"',quoteEn:'"US Treasury buying back $4B debt this week · SanDisk Q2 Data Center $3.03B · EPS +205% beat"',
  source:'출처: Barchart·Investing visuals·2026.08.06',
  noteHead:'왜 중요한가: 미 재무부 매입 = 유동성 공급·8/6 Burry 1987 경고에도 실 매크로 완화 조치·SanDisk 대박은 AI DC 사이클 지속',noteSub:'앞으로 볼 것: 재무부 후속 매입·MMF $2.3T 유출·SanDisk·NVDA·AMD DC 매출 지속',footer:'매크로 재무부 $4B + SanDisk 대박',brand:BK},
 en:{title:'MACRO — US Treasury $4B Debt Buyback This Week + SanDisk Q2 Blowout (Data Center $3.03B)',heroIcon:'💵',heroBig:'$4 B',heroSub:'Barchart: US Treasury forecasted to buy back $4B own debt this week · liquidity management · Investing visuals separately: SanDisk Q2 blowout · Revenue $9.68B (+42%) · EPS $1.28 (est $0.42, +205% beat) · Data Center $3.03B (est $2.68B)',
  cards:[{icon:'💵',big:'$4 B',mid:'US Treasury buyback',sub:'This week own debt'},{icon:'💾',big:'$3.03 B',mid:'SanDisk Data Center',sub:'Exceeds est $2.68B'},{icon:'📈',big:'+205 %',mid:'SanDisk EPS beat',sub:'$1.28 vs $0.42'}],
  quoteLabel:'BARCHART · INVESTING VISUALS',quoteKo:'"재무부 $4B 매입·SanDisk +205% EPS"',quoteEn:'"US Treasury buying back $4B debt this week · SanDisk Q2 Data Center $3.03B · EPS +205% beat"',
  source:'Source: Barchart · Investing visuals · 2026.08.06',
  noteHead:'Why: US Treasury buyback = liquidity supply · real macro relief measure despite 8/6 Burry 1987 warning · SanDisk blowout = AI DC cycle continuity',noteSub:'Watch: Treasury follow-up buybacks · MMF $2.3T outflows · SanDisk/NVDA/AMD DC revenue sustain',footer:'MACRO Treasury $4B + SanDisk Blowout',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260807.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260807-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
