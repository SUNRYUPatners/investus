// 2026-08-03 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.03';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  INTC: { fg:'#0071c5', fg2:'#00558a', bg2:'#06121f', card:'#0a1420' },
  AMD:  { fg:'#ed1c24', fg2:'#c00000', bg2:'#1a0606', card:'#200a0a' },
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
// 1. TSLA·SPCX merger multi-source
{file:'tsla-spcx-merger-jimmy-kalshi-lf',symbol:'TSLA',
 ko:{title:'TSLA·SPCX 합병 다층 축적 — Jimmy 프리미엄 $600-$630·Kalshi 60%·Limiting Factor 2027 하반기',heroIcon:'🔀',heroBig:'$600-$630',heroSub:'Jimmy 두 소식통 근거로 Tesla 프리미엄 인수 $600-$630/주 프레임 · Kalshi는 2028 이전 합병 확률 60% (7/27 74%에서 하향) · Limiting Factor는 2027 하반기 시점 논거 · 다층 축적',
  cards:[{icon:'💰',big:'$600-$630',mid:'TSLA 프리미엄 인수',sub:'Jimmy · 두 소식통'},{icon:'🎯',big:'60 %',mid:'Kalshi 확률',sub:'2028 이전·7/27 74%→하향'},{icon:'📅',big:'2027 하반기',mid:'Limiting Factor 시점',sub:'"양사 강세일 때"'}],
  quoteLabel:'JIMMY · KALSHI · LIMITING FACTOR',quoteKo:'"Musk가 Tesla·SpaceX 전략적 결합 검토·프리미엄 인수 구조·필요 표 확보 가능"',quoteEn:'"Elon exploring Tesla-SpaceX strategic combination · premium acquisition · will secure necessary votes"',
  source:'출처: Jimmy · Kalshi · The Limiting Factor · 2026.08.02',
  noteHead:'왜 중요한가: 8/1 Musk의 fake news 부인에도 합병 시나리오 다층 축적 지속 · Kalshi 확률 하향은 부인 반영',noteSub:'앞으로 볼 것: 소식통 신뢰도·Kalshi 확률 변동·2027 하반기 이벤트',footer:'TSLA·SPCX 합병 다층',brand:BK},
 en:{title:'TSLA·SPCX Merger Multi-Layer — Jimmy $600-$630 Premium · Kalshi 60% · Limiting Factor H2 2027',heroIcon:'🔀',heroBig:'$600-$630',heroSub:'Jimmy cites two sources on Tesla premium acquisition $600-$630/share frame · Kalshi merger probability before 2028 at 60% (down from 74% on 7/27) · Limiting Factor argues H2 2027 timing · multi-layer accumulation',
  cards:[{icon:'💰',big:'$600-$630',mid:'TSLA premium acq',sub:'Jimmy · 2 sources'},{icon:'🎯',big:'60 %',mid:'Kalshi probability',sub:'before 2028 · from 74%'},{icon:'📅',big:'H2 2027',mid:'Limiting Factor timing',sub:'"when both strong"'}],
  quoteLabel:'JIMMY · KALSHI · LIMITING FACTOR',quoteKo:'"Musk가 전략적 결합 검토·필요 표 확보"',quoteEn:'"Elon exploring Tesla-SpaceX strategic combination · premium acquisition · will secure necessary votes"',
  source:'Source: Jimmy · Kalshi · The Limiting Factor · 2026.08.02',
  noteHead:'Why: Despite 8/1 Musk fake-news denial, merger scenario multi-layer accumulation continues · Kalshi downgrade reflects denial',noteSub:'Watch: Source credibility · Kalshi odds shift · H2 2027 event triggers',footer:'TSLA·SPCX Merger Multi',brand:BE}},

// 2. AMZN OpenAI $50B stake + 20% growth
{file:'amzn-openai-50b-anthropic-16b',symbol:'AMZN',
 ko:{title:'AMZN — OpenAI $50B 투자·5% 지분·$500B IPO 밸류 + Anthropic $16B와 결합 · 매출 20% 성장 재개',heroIcon:'🤝',heroBig:'$50 B',heroSub:'Shay Boloor: AMZN이 OpenAI에 $50B 투자·5% 지분·$500B 밸류로 IPO 앞두고 · Anthropic $16B와 결합해 세계 최대 2개 프런티어 AI 랩 지분 보유 · In America 별개: AMZN 매출 20% 성장 재개',
  cards:[{icon:'🤝',big:'$50 B',mid:'OpenAI 투자',sub:'5% 지분·$500B 밸류'},{icon:'🏛️',big:'2 대 랩',mid:'OpenAI + Anthropic',sub:'$50B + $16B = $66B'},{icon:'📈',big:'+20 %',mid:'매출 성장 재개',sub:'In America'}],
  quoteLabel:'SHAY BOLOOR · IN AMERICA',quoteKo:'"AMZN이 세계 최대 2개 AI 랩에서 대규모 지분 보유 · IPO 앞두고 OpenAI $500B 밸류"',quoteEn:'"AMZN now holds major stakes in two of the world\'s leading AI labs · OpenAI $500B ahead of IPO"',
  source:'출처: Shay Boloor · In America · 2026.08.02',
  noteHead:'왜 중요한가: AMZN이 GOOGL의 Anthropic 지분(오늘 $53.4B 증가)과 다른 축으로 프런티어 AI 지분 게임 진입',noteSub:'앞으로 볼 것: OpenAI IPO 시점·$500B 밸류 실현·AMZN 지분 매출 반영',footer:'AMZN OpenAI $50B · Anthropic $16B',brand:BK},
 en:{title:'AMZN — OpenAI $50B Investment · 5% Stake · $500B IPO Val + Anthropic $16B · Revenue 20% Growth Resumed',heroIcon:'🤝',heroBig:'$50 B',heroSub:'Shay Boloor: AMZN invested $50B in OpenAI · 5% stake · $500B valuation ahead of IPO · combined with Anthropic $16B, AMZN holds major stakes in two of the world\'s leading frontier AI labs · In America separately: AMZN revenue 20% growth resumed',
  cards:[{icon:'🤝',big:'$50 B',mid:'OpenAI investment',sub:'5% stake · $500B val'},{icon:'🏛️',big:'2 leading labs',mid:'OpenAI + Anthropic',sub:'$50B + $16B = $66B'},{icon:'📈',big:'+20 %',mid:'Revenue growth resumes',sub:'In America'}],
  quoteLabel:'SHAY BOLOOR · IN AMERICA',quoteKo:'"AMZN이 세계 최대 2개 AI 랩 지분·OpenAI $500B IPO 밸류"',quoteEn:'"AMZN now holds major stakes in two of the world\'s leading AI labs · OpenAI $500B ahead of IPO"',
  source:'Source: Shay Boloor · In America · 2026.08.02',
  noteHead:'Why: AMZN enters frontier-AI-stake game on different axis vs GOOGL\'s Anthropic stake ($53.4B raise today)',noteSub:'Watch: OpenAI IPO timing · $500B val realization · AMZN stake earnings reflection',footer:'AMZN OpenAI $50B · Anthropic $16B',brand:BE}},

// 3. TSLA Robotaxi Cole Grinde
{file:'tsla-robotaxi-half-million-rides',symbol:'TSLA',
 ko:{title:'TSLA — Robotaxi 월 50만 라이드 접근·주간 double-digit 성장·Cybercab/Semi/Cybersedan 매입 계획 (Cole Grinde)',heroIcon:'🚕',heroBig:'500 K/월',heroSub:'Cole Grinde의 Tesla Q2 실적 요약: 월 50만 라이드 접근·연초 대비 매주 double-digit 성장·Robotaxi 성장이 "literally exponential"·Cybercab·Semi·Cybersedan 매입 계획으로 unmanufactured miles 캐파 성장에 매칭',
  cards:[{icon:'🚕',big:'500 K/월',mid:'라이드 접근',sub:'월 half million'},{icon:'📈',big:'주간 double',mid:'digit 성장',sub:'연초 이후'},{icon:'🚗',big:'3 차종',mid:'Cybercab · Semi · Cybersedan',sub:'매입 계획'}],
  quoteLabel:'COLE GRINDE',quoteKo:'"Robotaxi 성장이 문자 그대로 exponential · Cybercab·Semi·Cybersedan 매입으로 캐파 성장에 매칭"',quoteEn:'"Robotaxi growth has been literally exponential · buying Cybercabs and Semis and Cybersedans to align with capacity growth"',
  source:'출처: Cole Grinde · Tesla Q2 실적 요약 · 2026.08.02',
  noteHead:'왜 중요한가: TSLA Robotaxi 사업이 초기 수치 공개·2026 하반기 매출 축 확대 시사',noteSub:'앞으로 볼 것: Cybercab 실 상용 가동·Semi 배치·수익화 지표',footer:'TSLA Robotaxi 500K/월',brand:BK},
 en:{title:'TSLA — Robotaxi Approaching 500K Rides/Month · Weekly Double-Digit Growth · Cybercab/Semi/Cybersedan Buy Plan (Cole Grinde)',heroIcon:'🚕',heroBig:'500 K/mo',heroSub:'Cole Grinde\'s Tesla Q2 summary: approaching half-million rides/month · weekly double-digit growth since year-start · Robotaxi growth "literally exponential" · Cybercab/Semi/Cybersedan buy plan to match unmanufactured-miles capacity growth',
  cards:[{icon:'🚕',big:'500 K/mo',mid:'Rides approaching',sub:'half million monthly'},{icon:'📈',big:'Weekly double-digit',mid:'growth',sub:'since year-start'},{icon:'🚗',big:'3 vehicles',mid:'Cybercab · Semi · Cybersedan',sub:'buy plan'}],
  quoteLabel:'COLE GRINDE',quoteKo:'"Robotaxi 성장이 exponential"',quoteEn:'"Robotaxi growth has been literally exponential · buying Cybercabs and Semis and Cybersedans to align with capacity growth"',
  source:'Source: Cole Grinde · Tesla Q2 recap · 2026.08.02',
  noteHead:'Why: TSLA Robotaxi discloses early metrics · signals H2 2026 revenue-axis expansion',noteSub:'Watch: Cybercab commercial operation · Semi deployment · monetization metrics',footer:'TSLA Robotaxi 500K/mo',brand:BE}},

// 4. NVDA Jensen supports Musk AI 3 pillars
{file:'nvda-jensen-musk-ai-3-pillars',symbol:'NVDA',
 ko:{title:'NVDA — Jensen Huang "Musk가 AI·자율주행·휴머노이드 로봇 3대 축 리더 위치"',heroIcon:'👑',heroBig:'3 대 축',heroSub:'DogeDesigner: Jensen이 Musk가 AI 미래·자율주행·휴머노이드 로봇 3대 축을 이끌 phenomenal position · Tesla가 대량 차량으로 세계 데이터 수집 우위·Optimus·cognitive AI 3개 영역 리더',
  cards:[{icon:'🧠',big:'AI 미래',mid:'Musk 리더 위치',sub:'Jensen "phenomenal"'},{icon:'🚗',big:'자율주행',mid:'대량 차량 데이터',sub:'세계 수집 우위'},{icon:'🤖',big:'휴머노이드',mid:'Optimus · cognitive AI',sub:'3개 영역 리더'}],
  quoteLabel:'JENSEN HUANG · DOGEDESIGNER',quoteKo:'"Elon Musk는 AI·자율주행·휴머노이드 로봇의 미래를 이끌 phenomenal position에 있다"',quoteEn:'"Elon Musk is in a phenomenal position to lead the future of AI, autonomous vehicles, and humanoid robotics"',
  source:'출처: DogeDesigner · Jensen Huang · 2026.08.02',
  noteHead:'왜 중요한가: NVDA-xAI 심화(7/31 Jensen "xAI 더 못 준 것 유일한 후회")에 이어 Musk의 3대 축 리더 프레임 공식 지지',noteSub:'앞으로 볼 것: NVDA-Tesla·xAI 협업 확장·GPU 공급 우선순위',footer:'NVDA Jensen · Musk 3 축',brand:BK},
 en:{title:'NVDA — Jensen Huang "Musk in Phenomenal Position to Lead AI, Autonomous Vehicles, Humanoid Robotics"',heroIcon:'👑',heroBig:'3 pillars',heroSub:'DogeDesigner: Jensen says Musk in phenomenal position to lead the future of AI, autonomous vehicles, humanoid robotics · Tesla has data-collection edge from massive fleet · Optimus · cognitive AI three-area leader',
  cards:[{icon:'🧠',big:'AI future',mid:'Musk leader',sub:'Jensen "phenomenal"'},{icon:'🚗',big:'Autonomous',mid:'Massive fleet data',sub:'world collection edge'},{icon:'🤖',big:'Humanoid',mid:'Optimus · cognitive AI',sub:'3-area leader'}],
  quoteLabel:'JENSEN HUANG · DOGEDESIGNER',quoteKo:'"Musk는 AI 3대 축의 phenomenal 위치"',quoteEn:'"Elon Musk is in a phenomenal position to lead the future of AI, autonomous vehicles, and humanoid robotics"',
  source:'Source: DogeDesigner · Jensen Huang · 2026.08.02',
  noteHead:'Why: Follows 7/31 Jensen "only regret is not giving more to xAI" · formalizes Musk 3-pillar leadership frame',noteSub:'Watch: NVDA-Tesla/xAI collab expansion · GPU-supply priority',footer:'NVDA Jensen · Musk 3 pillars',brand:BE}},

// 5. Musk SPCX 12-24 months add entire TSLA revenue
{file:'musk-spcx-add-entire-tsla-revenue',symbol:'SPCX',
 ko:{title:'Musk — "SPCX가 12-24개월 내 TSLA 전체 매출 규모 추가 가능"',heroIcon:'🚀',heroBig:'+TSLA',heroSub:'Ely 인용: Elon Musk가 SPCX가 12-24개월 내에 TSLA 전체 매출에 해당하는 규모를 새로 추가할 수 있다고 발언 · SPCX 매출 확장 속도의 극단 프레임 · 8/1 "99.99% 컴퓨트 우주로" 프레임과 결합',
  cards:[{icon:'💵',big:'+ TSLA',mid:'전체 매출 규모',sub:'12-24개월 내 추가'},{icon:'⚡',big:'12-24 개월',mid:'추가 시점',sub:'단기 급성장'},{icon:'🌌',big:'궤도 DC',mid:'8/1 99.99% 프레임',sub:'money printer 축'}],
  quoteLabel:'ELON MUSK · ELY',quoteKo:'"SPCX가 12-24개월 안에 TSLA 전체 매출에 해당하는 규모의 매출을 새로 추가할 수 있다"',quoteEn:'"SPCX could add entire TSLA of revenue in 12-24 months"',
  source:'출처: Ely · Elon Musk · 2026.08.02',
  noteHead:'왜 중요한가: SPCX Starlink·NSSL·Starship 매출 폭발 프레임의 극단 강세 · 8/4 실적 앞두고 나온 발언',noteSub:'앞으로 볼 것: 8/4 SPCX 첫 실적 · 실 매출 성장률·궤도 DC 상용화',footer:'SPCX 12-24개월 +TSLA 매출',brand:BK},
 en:{title:'Musk — "SPCX Could Add Entire TSLA of Revenue in 12-24 Months"',heroIcon:'🚀',heroBig:'+TSLA',heroSub:'Per Ely: Elon Musk says SPCX could add revenue equivalent to entire TSLA in 12-24 months · extreme frame of SPCX revenue expansion pace · combines with 8/1 "99.99% compute to space"',
  cards:[{icon:'💵',big:'+ TSLA',mid:'Entire revenue scale',sub:'add in 12-24 months'},{icon:'⚡',big:'12-24 months',mid:'Add timing',sub:'short-term growth'},{icon:'🌌',big:'Orbital DC',mid:'8/1 99.99% frame',sub:'money-printer axis'}],
  quoteLabel:'ELON MUSK · ELY',quoteKo:'"SPCX가 12-24개월 안에 TSLA 전체 매출 추가"',quoteEn:'"SPCX could add entire TSLA of revenue in 12-24 months"',
  source:'Source: Ely · Elon Musk · 2026.08.02',
  noteHead:'Why: Extreme bull frame of Starlink/NSSL/Starship revenue explosion · statement ahead of Aug 4 earnings',noteSub:'Watch: Aug 4 SPCX first earnings · actual revenue growth · orbital-DC commercialization',footer:'SPCX 12-24 mo +TSLA rev',brand:BE}},

// 6. SPCX Starship Flight 14 upper stage tower catch attempt
{file:'spcx-starship-flight14-upper-tower-catch',symbol:'SPCX',
 ko:{title:'SPCX — Starship Flight 14에서 첫 upper stage tower catch 시도 (Musk 확인)',heroIcon:'🗼',heroBig:'FIRST TRY',heroSub:'Space and Technology + Elon Musk 확인: SpaceX가 Starship Flight 14에서 첫 upper stage(2단) tower catch 시도 · Flight 13 착륙 성공 후 다음 마일스톤 · 완전 재사용 로드맵 진전',
  cards:[{icon:'🗼',big:'Upper stage',mid:'첫 tower catch 시도',sub:'Flight 14'},{icon:'🔁',big:'완전 재사용',mid:'로드맵 진전',sub:'2단도 회수'},{icon:'✅',big:'Flight 13 성공',mid:'착륙 확인 후',sub:'다음 마일스톤'}],
  quoteLabel:'ELON MUSK · SPACE AND TECHNOLOGY',quoteKo:'"SpaceX가 Starship Flight 14에서 첫 upper stage tower catch 시도"',quoteEn:'"SpaceX will attempt its first Starship upper stage tower catch on Flight 14"',
  source:'출처: Space and Technology · Elon Musk · 2026.08.02',
  noteHead:'왜 중요한가: Booster catch만 성공했던 SPCX가 upper stage catch로 확장 시 완전 재사용 실현·kg당 발사비 대폭 감소',noteSub:'앞으로 볼 것: Flight 14 발사 시점·2단 catch 성공 여부·2029 유인 화성 계획 연계',footer:'SPCX Flight 14 · upper catch',brand:BK},
 en:{title:'SPCX — Starship Flight 14 to Attempt First Upper Stage Tower Catch (Musk Confirms)',heroIcon:'🗼',heroBig:'FIRST TRY',heroSub:'Space and Technology + Elon Musk confirm: SpaceX to attempt first upper-stage (2nd stage) tower catch on Starship Flight 14 · next milestone after Flight 13 landing success · full-reusability roadmap progress',
  cards:[{icon:'🗼',big:'Upper stage',mid:'First tower-catch attempt',sub:'Flight 14'},{icon:'🔁',big:'Full reuse',mid:'Roadmap progress',sub:'2nd stage recovery'},{icon:'✅',big:'Flight 13 success',mid:'After landing confirmed',sub:'next milestone'}],
  quoteLabel:'ELON MUSK · SPACE AND TECHNOLOGY',quoteKo:'"Flight 14 upper stage tower catch 첫 시도"',quoteEn:'"SpaceX will attempt its first Starship upper stage tower catch on Flight 14"',
  source:'Source: Space and Technology · Elon Musk · 2026.08.02',
  noteHead:'Why: SPCX booster catch already succeeded · upper-stage catch extension = full reusability · drastic per-kg launch cost cut',noteSub:'Watch: Flight 14 launch timing · 2nd-stage catch success · 2029 crewed Mars connection',footer:'SPCX Flight 14 · upper catch',brand:BE}},

// 7. TSLA Shanghai 400+ Chinese suppliers 95%
{file:'tsla-shanghai-400-china-95pct',symbol:'TSLA',
 ko:{title:'TSLA — 상하이 기가팩토리 400+ 중국 협업사·M3/MY 95% 중국 부품·해외 공장 공급 (Ming/Tao Lin)',heroIcon:'🇨🇳',heroBig:'400 +',heroSub:'Tesla VP Tao Lin(Ming 인용): 상하이 기가팩토리가 400+ 중국 기업과 협업·2018년부터 일부는 Tesla 해외 공장에도 부품 공급·상하이 제조 Model 3·Model Y의 95%가 중국 공급망 부품',
  cards:[{icon:'🏭',big:'400 +',mid:'중국 협업사',sub:'상하이 기가'},{icon:'📊',big:'95 %',mid:'M3/MY 부품',sub:'중국 공급망'},{icon:'🌐',big:'해외 공장',mid:'일부 공급 확장',sub:'2018년부터'}],
  quoteLabel:'TESLA VP TAO LIN · MING',quoteKo:'"상하이 기가팩토리 400+ 중국 기업 협업·M3/MY 95% 중국 부품·해외 공장에도 공급"',quoteEn:'"Shanghai works with 400+ Chinese enterprises · 95% of parts for Shanghai-built M3/MY · also supply Tesla\'s international plants"',
  source:'출처: Ming · Tesla VP Tao Lin · 2026.08.02',
  noteHead:'왜 중요한가: 어제 US LFP Megapack 국산화 확장에도 상하이는 중국 공급망 의존 지속 · 관세·규제 리스크 이슈',noteSub:'앞으로 볼 것: 미-중 무역 정책 변화·상하이 부품 US 대체 시나리오',footer:'TSLA 상하이 400+ · 95%',brand:BK},
 en:{title:'TSLA — Shanghai Gigafactory Works with 400+ Chinese Suppliers · 95% of M3/MY Parts · Also Supplies International (Ming/Tao Lin)',heroIcon:'🇨🇳',heroBig:'400 +',heroSub:'Tesla VP Tao Lin (per Ming): Shanghai Gigafactory works with 400+ Chinese enterprises · since 2018 some supply Tesla international plants · Chinese suppliers provide 95% of parts for Shanghai-built Model 3 and Model Y',
  cards:[{icon:'🏭',big:'400 +',mid:'Chinese suppliers',sub:'Shanghai Giga'},{icon:'📊',big:'95 %',mid:'M3/MY parts',sub:'China supply chain'},{icon:'🌐',big:'Intl plants',mid:'Some export supply',sub:'since 2018'}],
  quoteLabel:'TESLA VP TAO LIN · MING',quoteKo:'"상하이 400+·95% 중국 부품·해외 공장 공급"',quoteEn:'"Shanghai works with 400+ Chinese enterprises · 95% of parts for Shanghai-built M3/MY · also supply Tesla\'s international plants"',
  source:'Source: Ming · Tesla VP Tao Lin · 2026.08.02',
  noteHead:'Why: Despite yesterday\'s US LFP Megapack domestication expansion, Shanghai China supply-chain dependency continues · tariff/regulation risk',noteSub:'Watch: US-China trade policy shift · Shanghai-parts US-substitution scenarios',footer:'TSLA Shanghai 400+ · 95%',brand:BE}},

// 8. TSLA France July +26%
{file:'tsla-france-july-26pct-2429',symbol:'TSLA',
 ko:{title:'TSLA — France 7월 판매 +26%·2,429대·유럽 시장 회복 (Ming/CCFA)',heroIcon:'🇫🇷',heroBig:'+26 %',heroSub:'Ming (French Automobile Industry Association CCFA 인용): Tesla의 France 7월 판매 +26% 증가·2,429대·2024 -30~-50% 급감 후 회복 시작·유럽 시장 반등 시그널',
  cards:[{icon:'🇫🇷',big:'+26 %',mid:'France 7월 판매',sub:'YoY 증가'},{icon:'🚗',big:'2,429 대',mid:'절대 판매량',sub:'월간'},{icon:'📈',big:'회복 시작',mid:'2024 급감 후',sub:'유럽 반등'}],
  quoteLabel:'MING · CCFA',quoteKo:'"Tesla의 France 7월 판매가 +26% 증가·2,429대"',quoteEn:'"Tesla\'s sales in France jumped 26% in July to 2,429 vehicles"',
  source:'출처: Ming · French Automobile Industry Association · 2026.08.02',
  noteHead:'왜 중요한가: 2024년 Musk 정치 견해로 유럽 판매 급감 후 회복 시그널 · 반Musk 배경에서 회복은 제품·서비스 우위 반영',noteSub:'앞으로 볼 것: 유럽 다른 국가(독일·이탈리아) 8월 판매·전년 대비 회복 지속',footer:'TSLA France 7월 +26%',brand:BK},
 en:{title:'TSLA — France July Sales +26% · 2,429 Vehicles · European Market Recovery (Ming/CCFA)',heroIcon:'🇫🇷',heroBig:'+26 %',heroSub:'Ming (per French Automobile Industry Association CCFA): Tesla France July sales +26% · 2,429 vehicles · recovery starts after 2024 -30~-50% plunge · European market rebound signal',
  cards:[{icon:'🇫🇷',big:'+26 %',mid:'France July sales',sub:'YoY increase'},{icon:'🚗',big:'2,429 units',mid:'Absolute sales',sub:'monthly'},{icon:'📈',big:'Recovery starts',mid:'After 2024 plunge',sub:'Europe rebound'}],
  quoteLabel:'MING · CCFA',quoteKo:'"Tesla France 7월 +26%·2,429대"',quoteEn:'"Tesla\'s sales in France jumped 26% in July to 2,429 vehicles"',
  source:'Source: Ming · French Automobile Industry Association · 2026.08.02',
  noteHead:'Why: Recovery signal after 2024 Europe sales plunge from Musk political-view backlash · recovery amid anti-Musk backdrop = product/service edge',noteSub:'Watch: European other countries (Germany/Italy) August sales · YoY recovery continuity',footer:'TSLA France July +26%',brand:BE}},

// 9. TSLA Supercharger 7¢/kWh
{file:'tsla-supercharger-7cents-333day',symbol:'TSLA',
 ko:{title:'TSLA — Supercharger 7¢/kWh·하루 $3.33·미국 커피 한 잔 값 미만',heroIcon:'⚡',heroBig:'7 ¢/kWh',heroSub:'Tesla 🇺🇸: Supercharger 사용 요금이 kWh당 7센트·일반 사용자의 도로 이용 비용 하루 약 $3.33·미국 평균 커피 한 잔 값보다 저렴',
  cards:[{icon:'⚡',big:'7 ¢/kWh',mid:'Supercharger 요금',sub:'kWh 기준'},{icon:'💵',big:'$3.33/일',mid:'도로 이용 비용',sub:'일반 사용자'},{icon:'☕',big:'< 커피 값',mid:'미국 평균',sub:'비용 비교 프레임'}],
  quoteLabel:'TESLA 🇺🇸',quoteKo:'"Tesla Supercharger 7¢/kWh·도로 이용 하루 $3.33·미국 커피 한 잔 값보다 저렴"',quoteEn:'"Tesla Supercharger 7¢/kWh · road use ~$3.33/day · less than avg cost of a coffee in the US"',
  source:'출처: Tesla · 2026.08.02',
  noteHead:'왜 중요한가: EV 총 소유 비용(TCO) 프레임 강화 · 어제 US LFP Megapack + 오늘 저비용 Supercharger로 재생 에너지 결합',noteSub:'앞으로 볼 것: EV 채택률 · 유가 상승 시 상대 매력 증가',footer:'TSLA Supercharger 7¢ · $3.33/일',brand:BK},
 en:{title:'TSLA — Supercharger 7¢/kWh · $3.33/Day · Less Than Average Coffee in the US',heroIcon:'⚡',heroBig:'7 ¢/kWh',heroSub:'Tesla 🇺🇸: Supercharger use rate is 7¢ per kWh · average road use costs ~$3.33/day · less than the average cost of a coffee in the US',
  cards:[{icon:'⚡',big:'7 ¢/kWh',mid:'Supercharger rate',sub:'per kWh'},{icon:'💵',big:'$3.33/day',mid:'Road-use cost',sub:'typical user'},{icon:'☕',big:'< Coffee',mid:'US average',sub:'cost comparison'}],
  quoteLabel:'TESLA 🇺🇸',quoteKo:'"7¢/kWh · $3.33/일 · 커피 값 미만"',quoteEn:'"Tesla Supercharger 7¢/kWh · road use ~$3.33/day · less than avg cost of a coffee in the US"',
  source:'Source: Tesla · 2026.08.02',
  noteHead:'Why: Strengthens EV total-cost-of-ownership frame · combines with yesterday\'s US LFP Megapack + today\'s low-cost Supercharger for renewables integration',noteSub:'Watch: EV adoption rates · relative attractiveness increases with fuel prices',footer:'TSLA Supercharger 7¢ · $3.33/day',brand:BE}},

// 10. Trump Iran deal
{file:'macro-trump-iran-deal-strait-nukes',symbol:'MACRO',
 ko:{title:'매크로 — Trump가 이란 공격 취소·중동 딜 진행 (Strait 개방·핵무기 없이·8월 시작 개선)',heroIcon:'🕊️',heroBig:'IRAN DEAL',heroSub:'Investing visuals 인용: Trump가 이란과 중동 국가 요청에 응해 공격 취소 · 딜은 호르무즈 해협 개방·핵무기 없이 조건 포함 · 대통령이 8월을 7월보다 낫게 시작하려는 신호',
  cards:[{icon:'🕊️',big:'공격 취소',mid:'이란·중동 요청',sub:'Trump 응답'},{icon:'⚓',big:'해협 개방',mid:'호르무즈 조건',sub:'딜 요구'},{icon:'☢️',big:'No 핵무기',mid:'딜 조건',sub:'비확산'}],
  quoteLabel:'DONALD J TRUMP · INVESTING VISUALS',quoteKo:'"미국은 이란에 대한 공격을 취소하는 것에 동의 · 호르무즈 해협 개방 + 핵무기 없이 조건"',quoteEn:'"US agreed to cancel attack on Iran · deal to include opening the Strait and no nuclear weapons"',
  source:'출처: Investing visuals · Donald J Trump · 2026.08.02',
  noteHead:'왜 중요한가: 지정학 리스크 완화·유가 안정 시나리오 · 그러나 오늘 헤지펀드 원유 강세 포지션과 대비',noteSub:'앞으로 볼 것: 실 딜 체결·이란 응답·유가 반응·중동 안정성',footer:'MACRO Trump Iran 딜',brand:BK},
 en:{title:'MACRO — Trump Cancels Iran Attack · Middle East Deal Progress (Strait Open · No Nukes · Better August)',heroIcon:'🕊️',heroBig:'IRAN DEAL',heroSub:'Per Investing visuals: Trump agreed to cancel attack on Iran after request from Iran and Middle Eastern countries · deal to include opening the Strait and no nuclear weapons · President signaling better start to August than July',
  cards:[{icon:'🕊️',big:'Cancel attack',mid:'Iran·ME request',sub:'Trump response'},{icon:'⚓',big:'Strait open',mid:'Hormuz condition',sub:'deal requirement'},{icon:'☢️',big:'No nukes',mid:'Deal condition',sub:'non-proliferation'}],
  quoteLabel:'DONALD J TRUMP · INVESTING VISUALS',quoteKo:'"공격 취소·해협 개방·핵무기 없이"',quoteEn:'"US agreed to cancel attack on Iran · deal to include opening the Strait and no nuclear weapons"',
  source:'Source: Investing visuals · Donald J Trump · 2026.08.02',
  noteHead:'Why: Geopolitical risk relief · oil-price stabilization scenario · but contrasts with today\'s hedge-fund crude bull positioning',noteSub:'Watch: Actual deal signing · Iran response · oil reaction · Middle East stability',footer:'MACRO Trump Iran deal',brand:BE}},

// 11. Goldman $155B forced selling
{file:'macro-goldman-155b-forced-selling',symbol:'MACRO',
 ko:{title:'매크로 — Goldman Sachs, 이번 달 글로벌 시장에 $155B 강제 매도 경고',heroIcon:'⚠️',heroBig:'$155 B',heroSub:'⚡: Goldman Sachs가 이번 달 글로벌 시장에 $155B 강제 매도(forced selling)가 올 수 있다고 경고 · 리밸런싱·마진콜·모멘텀 unwind 등 복합 요인',
  cards:[{icon:'⚠️',big:'$155 B',mid:'강제 매도 경고',sub:'이번 달'},{icon:'🌐',big:'글로벌 시장',mid:'복합 요인',sub:'리밸런싱·마진콜'},{icon:'📉',big:'변동성 리스크',mid:'8월 심리 부담',sub:'추가 조정 가능'}],
  quoteLabel:'GOLDMAN SACHS · ⚡',quoteKo:'"이번 달 글로벌 시장에 $155B 강제 매도가 올 수 있다"',quoteEn:'"$155 billion in forced selling could hit global markets this month"',
  source:'출처: Goldman Sachs · ⚡ · 2026.08.02',
  noteHead:'왜 중요한가: 어제 하이퍼 CAPEX $155B (같은 숫자)와 대비되는 매크로 리스크 · Aschenbrenner 청산·insider 매도 30년 최고 연장',noteSub:'앞으로 볼 것: 실 매도 규모·리밸런싱 시점·8월 시장 방향',footer:'MACRO Goldman $155B 매도',brand:BK},
 en:{title:'MACRO — Goldman Sachs Warns $155B Forced Selling Could Hit Global Markets This Month',heroIcon:'⚠️',heroBig:'$155 B',heroSub:'⚡: Goldman Sachs warns $155B in forced selling could hit global markets this month · rebalancing / margin calls / momentum unwind composite factors',
  cards:[{icon:'⚠️',big:'$155 B',mid:'Forced-sell warning',sub:'This month'},{icon:'🌐',big:'Global markets',mid:'Composite factors',sub:'rebalance·margin calls'},{icon:'📉',big:'Volatility risk',mid:'August sentiment',sub:'further correction possible'}],
  quoteLabel:'GOLDMAN SACHS · ⚡',quoteKo:'"이번 달 $155B 강제 매도"',quoteEn:'"$155 billion in forced selling could hit global markets this month"',
  source:'Source: Goldman Sachs · ⚡ · 2026.08.02',
  noteHead:'Why: Contrasts with yesterday\'s hyperscaler CAPEX $155B (same number) · extends Aschenbrenner liquidation and 30-yr high insider selling',noteSub:'Watch: Actual sell volume · rebalancing timing · August market direction',footer:'MACRO Goldman $155B sell',brand:BE}},

// 12. Hedge funds crude oil bull fastest since March
{file:'macro-hedge-crude-oil-bull-march',symbol:'MACRO',
 ko:{title:'매크로 — 헤지펀드 원유 강세 포지션 3월 이후 최대 속도로 추가 (Barchart)',heroIcon:'🛢️',heroBig:'3월 이후 최대',heroSub:'Barchart: 헤지펀드가 원유(crude oil) 강세(bullish) 포지션을 3월 이후 가장 빠른 속도로 추가 · WTI·Brent 기관 flow 방향 반전 시그널',
  cards:[{icon:'🛢️',big:'원유 강세',mid:'포지션 추가',sub:'헤지펀드'},{icon:'⚡',big:'3월 이후',mid:'가장 빠른 속도',sub:'최대 속도'},{icon:'📊',big:'기관 flow',mid:'방향 반전',sub:'WTI·Brent'}],
  quoteLabel:'BARCHART',quoteKo:'"헤지펀드가 원유 강세 포지션을 3월 이후 가장 빠른 속도로 추가"',quoteEn:'"Hedge Funds just added bullish crude oil positions at the fastest pace since March"',
  source:'출처: Barchart · 2026.08.02',
  noteHead:'왜 중요한가: 오늘 Trump 이란 딜(지정학 완화 = 유가 하락 시그널)과 반대 방향 · 두 시그널 divergence',noteSub:'앞으로 볼 것: 유가·중동 상황·헤지펀드 flow 지속',footer:'MACRO 헤지 원유 강세 · 3월 이후',brand:BK},
 en:{title:'MACRO — Hedge Funds Added Bullish Crude Oil Positions at Fastest Pace Since March (Barchart)',heroIcon:'🛢️',heroBig:'FASTEST SINCE MARCH',heroSub:'Barchart: Hedge funds added bullish crude oil positions at the fastest pace since March · WTI/Brent institutional flow direction-reversal signal',
  cards:[{icon:'🛢️',big:'Oil bull',mid:'Position added',sub:'hedge funds'},{icon:'⚡',big:'Since March',mid:'Fastest pace',sub:'max speed'},{icon:'📊',big:'Institutional flow',mid:'Direction reverses',sub:'WTI·Brent'}],
  quoteLabel:'BARCHART',quoteKo:'"헤지 원유 강세 3월 이후 최대"',quoteEn:'"Hedge Funds just added bullish crude oil positions at the fastest pace since March"',
  source:'Source: Barchart · 2026.08.02',
  noteHead:'Why: Opposite direction vs today\'s Trump Iran deal (geo relief = oil down signal) · two-signal divergence',noteSub:'Watch: Oil price · Middle East situation · hedge-fund flow continuity',footer:'MACRO Hedge crude bull · fastest since Mar',brand:BE}},

// 13. Oracle CAPEX 50% revenue
{file:'orcl-capex-50pct-revenue',symbol:'ORCL',
 ko:{title:'ORCL — Oracle CAPEX가 매출 50% 지출 · "미쳤다" 코멘트',heroIcon:'💸',heroBig:'50 %',heroSub:'GURGAVN: Oracle이 매출의 50%를 CAPEX에 지출하는 상황 · "Oracle 미쳤다"는 개인 코멘트 · 하이퍼스케일러 CAPEX 사이클에 Oracle도 극단 참여 시그널',
  cards:[{icon:'💸',big:'50 %',mid:'매출 대비 CAPEX',sub:'Oracle 지출'},{icon:'🏗️',big:'AI 인프라',mid:'Oracle 확장',sub:'하이퍼 사이클 참여'},{icon:'⚠️',big:'"미쳤다"',mid:'개인 코멘트',sub:'과잉 우려'}],
  quoteLabel:'GURGAVN',quoteKo:'"Oracle이 매출의 50%를 CAPEX에 지출 중 · Oracle 미쳤다고 생각하는 사람 나뿐인가"',quoteEn:'"Oracle is now spending 50% of its entire revenue on capex · am I the only one who thinks Oracle has gone crazy"',
  source:'출처: GURGAVN · 2026.08.02',
  noteHead:'왜 중요한가: 어제 하이퍼 4사(AMZN·META·GOOGL·MSFT) $155B Q2 CAPEX에 Oracle도 상대적 대규모 참여 확인',noteSub:'앞으로 볼 것: Oracle 실적·FCF 압박·다른 non-hyperscaler CAPEX 확산',footer:'ORCL CAPEX 매출 50%',brand:BK},
 en:{title:'ORCL — Oracle Spending 50% of Entire Revenue on CAPEX · "Gone Crazy" Comment',heroIcon:'💸',heroBig:'50 %',heroSub:'GURGAVN: Oracle spending 50% of entire revenue on CAPEX · "Oracle has gone crazy" personal comment · Oracle also extreme participation signal in hyperscaler CAPEX cycle',
  cards:[{icon:'💸',big:'50 %',mid:'CAPEX / Revenue',sub:'Oracle spend'},{icon:'🏗️',big:'AI infra',mid:'Oracle expansion',sub:'hyper cycle join'},{icon:'⚠️',big:'"Crazy"',mid:'Personal comment',sub:'excess concern'}],
  quoteLabel:'GURGAVN',quoteKo:'"Oracle이 매출 50% CAPEX·미쳤다"',quoteEn:'"Oracle is now spending 50% of its entire revenue on capex · am I the only one who thinks Oracle has gone crazy"',
  source:'Source: GURGAVN · 2026.08.02',
  noteHead:'Why: Confirms Oracle relative-large participation alongside yesterday\'s hyper-4 (AMZN/META/GOOGL/MSFT) $155B Q2 CAPEX',noteSub:'Watch: Oracle earnings · FCF pressure · other non-hyperscaler CAPEX spread',footer:'ORCL CAPEX 50% rev',brand:BE}},

// 14. SPCX excludes Chinese nationals & parts
{file:'spcx-china-influence-nikkei-exclude',symbol:'SPCX',
 ko:{title:'SPCX — 중국인·부품 배제로 미 우주 프로그램에서 China influence 제거 (Nikkei)',heroIcon:'🚫',heroBig:'CHINA OUT',heroSub:'Whale Insider (Nikkei 인용): SPCX가 미 수십억 달러 우주 프로그램에서 중국인(nationals)과 중국산 부품을 배제해 China influence 제거 조치 · 지정학·안보 우려 대응',
  cards:[{icon:'🚫',big:'중국인 배제',mid:'우주 프로그램',sub:'미 수십억 달러'},{icon:'🔩',big:'부품 배제',mid:'중국산 제외',sub:'공급망 재편'},{icon:'🇺🇸',big:'안보 대응',mid:'China influence 제거',sub:'Nikkei 보도'}],
  quoteLabel:'WHALE INSIDER · NIKKEI',quoteKo:'"SPCX가 대형 미 우주 프로그램에서 중국인·부품 배제해 China 영향력 제거"',quoteEn:'"SPCX moves to keep Chinese nationals, parts out of a large multi-billion U.S. space program from China influence"',
  source:'출처: Whale Insider · Nikkei · 2026.08.02',
  noteHead:'왜 중요한가: 어제 SPCX 미 우주군 $3.4B 계약 + NASA V3 풍동과 결합 · 안보·정치 축 강화',noteSub:'앞으로 볼 것: 다른 미 정부 계약 유사 조치·공급망 재편 비용·중국 반응',footer:'SPCX China 배제 · Nikkei',brand:BK},
 en:{title:'SPCX — Excludes Chinese Nationals & Parts to Remove China Influence from US Space Program (Nikkei)',heroIcon:'🚫',heroBig:'CHINA OUT',heroSub:'Whale Insider (per Nikkei): SPCX moves to keep Chinese nationals and Chinese-made parts out of a large multi-billion US space program from China influence · geopolitical/security concern response',
  cards:[{icon:'🚫',big:'Nationals out',mid:'Space program',sub:'multi-billion US'},{icon:'🔩',big:'Parts out',mid:'China-made excluded',sub:'supply-chain rework'},{icon:'🇺🇸',big:'Security response',mid:'China-influence removal',sub:'per Nikkei'}],
  quoteLabel:'WHALE INSIDER · NIKKEI',quoteKo:'"SPCX 중국인·부품 배제·China 영향력 제거"',quoteEn:'"SPCX moves to keep Chinese nationals, parts out of a large multi-billion U.S. space program from China influence"',
  source:'Source: Whale Insider · Nikkei · 2026.08.02',
  noteHead:'Why: Combines with yesterday\'s SPCX US Space Force $3.4B contract + NASA V3 wind tunnel · security/political axis strengthens',noteSub:'Watch: Similar measures in other US-govt contracts · supply-chain rework cost · China response',footer:'SPCX China exclude · Nikkei',brand:BE}},

// 15. Google Search vs Amazon 1P 85%
{file:'googl-search-85pct-amzn-1p',symbol:'GOOGL',
 ko:{title:'GOOGL — Google Search 매출이 AMZN 1P 온라인 매출의 ~85% 규모 (Quartix)',heroIcon:'🔍',heroBig:'~85 %',heroSub:'Quartix: Google Search 매출이 Amazon 1P(1st-party) 온라인 매출 사업의 약 85% 규모 · Search 사업이 AMZN 리테일 근접 규모 · 광고의 실 규모 확인',
  cards:[{icon:'🔍',big:'~85 %',mid:'AMZN 1P 대비',sub:'GOOGL Search 매출'},{icon:'💰',big:'광고 규모',mid:'리테일 근접',sub:'실 규모 확인'},{icon:'📊',big:'단일 사업',mid:'Search 하나로',sub:'AMZN 1P 근접'}],
  quoteLabel:'QUARTIX',quoteKo:'"Google Search 매출이 AMZN 첫자사 온라인 매출 사업의 약 85% 규모"',quoteEn:'"Google Search revenue is approximately 85% of Amazon\'s first-party online sales business"',
  source:'출처: Quartix · 2026.08.02',
  noteHead:'왜 중요한가: GOOGL Search가 AI 챗봇 위협에도 여전히 mega-cap 사업 · 어제 AMZN OpenAI $50B와 대비되는 GOOGL 기존 강자 프레임',noteSub:'앞으로 볼 것: Search 매출 성장률 · AI 챗봇 대체율 · GOOGL Anthropic 파트너십 확장',footer:'GOOGL Search · AMZN 1P 85%',brand:BK},
 en:{title:'GOOGL — Google Search Revenue ~85% of AMZN 1P Online Sales Business (Quartix)',heroIcon:'🔍',heroBig:'~85 %',heroSub:'Quartix: Google Search revenue is approximately 85% of Amazon 1P (first-party) online sales business · Search alone approaches AMZN retail scale · confirms ads real scale',
  cards:[{icon:'🔍',big:'~85 %',mid:'vs AMZN 1P',sub:'GOOGL Search rev'},{icon:'💰',big:'Ads scale',mid:'Retail-adjacent',sub:'real scale confirmed'},{icon:'📊',big:'Single line',mid:'Search alone',sub:'near AMZN 1P'}],
  quoteLabel:'QUARTIX',quoteKo:'"Search 매출 AMZN 1P 85%"',quoteEn:'"Google Search revenue is approximately 85% of Amazon\'s first-party online sales business"',
  source:'Source: Quartix · 2026.08.02',
  noteHead:'Why: GOOGL Search still mega-cap business despite AI chatbot threats · GOOGL incumbent-strength frame vs yesterday\'s AMZN OpenAI $50B',noteSub:'Watch: Search revenue growth · AI chatbot substitution rate · GOOGL Anthropic partnership expansion',footer:'GOOGL Search · AMZN 1P 85%',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260803.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260803-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
