// 2026-08-04 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.04';

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
// 1. Musk SPCX +TSLA revenue detail (COULD not WILL)
{file:'musk-spcx-tsla-revenue-could-not-will',symbol:'SPCX',
 ko:{title:'SPCX — Musk 재확인 "12-24개월 내 TSLA 전체 매출($103.6B) 추가 가능 · WILL 아닌 COULD"',heroIcon:'💵',heroBig:'+$103.6 B',heroSub:'AI Investment Research가 Musk 발언 상세 정리 · TSLA 지난 12개월 매출 $103.6B가 참고치·Musk가 "SpaceX가 그 규모의 매출을 추가할 수 있다"고 발언 · Musk 본인이 "WILL(할 것)이 아닌 COULD(가능하다)"로 표현 강조 · 회의론자는 이해 못 한다는 프레임',
  cards:[{icon:'💵',big:'+$103.6 B',mid:'TSLA 12개월 매출 규모',sub:'참고치·SPCX가 그 규모 추가'},{icon:'⚡',big:'COULD',mid:'WILL 아님',sub:'Musk가 직접 구분'},{icon:'📅',big:'12-24개월',mid:'추가 시점',sub:'8/3 발언의 상세 재확인'}],
  quoteLabel:'ELON MUSK · AI INVESTMENT RESEARCH',quoteKo:'"SpaceX가 12-24개월 안에 Tesla 규모의 매출을 새로 추가할 수 있다 · WILL이 아니고 COULD"',quoteEn:'"SpaceX could add an entire Tesla\'s worth of revenue in the next 12-24 months · I\'m not saying they WILL · I\'m saying they COULD"',
  source:'출처: AI Investment Research · Elon Musk · 2026.08.03',
  noteHead:'왜 중요한가: 8/3 상세 재확인·표현 완화(WILL→COULD)로 극단 프레임 균형 · 8/4 실적 앞두고 기대치 관리',noteSub:'앞으로 볼 것: 8/4 SPCX 첫 실적 · 실 매출 성장률·12-24개월 내 실현 가능성 검증',footer:'SPCX Musk · +TSLA 매출 재확인',brand:BK},
 en:{title:'SPCX — Musk Reconfirms "Could Add Entire TSLA ($103.6B) of Revenue in 12-24 Months · COULD, Not WILL"',heroIcon:'💵',heroBig:'+$103.6 B',heroSub:'AI Investment Research details Musk statement · TSLA past-12-month revenue $103.6B as reference · Musk said "SpaceX could add revenue of that scale" · Musk himself emphasized "WILL, not COULD" distinction · skeptics don\'t understand frame',
  cards:[{icon:'💵',big:'+$103.6 B',mid:'TSLA 12-mo rev scale',sub:'reference · SPCX to add'},{icon:'⚡',big:'COULD',mid:'Not WILL',sub:'Musk explicitly distinguishes'},{icon:'📅',big:'12-24 months',mid:'Add timing',sub:'8/3 statement detail'}],
  quoteLabel:'ELON MUSK · AI INVESTMENT RESEARCH',quoteKo:'"12-24개월 안 Tesla 규모 매출 추가·WILL 아닌 COULD"',quoteEn:'"SpaceX could add an entire Tesla\'s worth of revenue in the next 12-24 months · I\'m not saying they WILL · I\'m saying they COULD"',
  source:'Source: AI Investment Research · Elon Musk · 2026.08.03',
  noteHead:'Why: 8/3 statement detail reconfirmation · softening (WILL→COULD) balances extreme frame · expectation management ahead of Aug 4 earnings',noteSub:'Watch: Aug 4 SPCX first earnings · actual revenue growth · realization in 12-24 months',footer:'SPCX Musk · +TSLA rev reconfirm',brand:BE}},

// 2. TSLA FSD 13 billion miles milestone
{file:'tsla-fsd-13-billion-miles-milestone',symbol:'TSLA',
 ko:{title:'TSLA — FSD(Supervised) 사상 최초 130억 마일 돌파 · 1개월 만에 10억 추가 · City 50억 마일',heroIcon:'🛣️',heroBig:'13 B',heroSub:'Sawyer Merritt (Tesla 공식 데이터): FSD Supervised 누적 주행 13,001,268,141 마일 돌파 · July 4th 120억 도달 후 1개월 만에 10억 추가 · City Miles 5,017,257,687 (50억+)',
  cards:[{icon:'🛣️',big:'13 B',mid:'FSD 총 마일',sub:'13,001,268,141'},{icon:'⚡',big:'+1 B / 월',mid:'가속 페이스',sub:'July 4th 120억→오늘 130억'},{icon:'🏙️',big:'5 B',mid:'City Miles',sub:'전체의 38% 도시 주행'}],
  quoteLabel:'SAWYER MERRITT · TESLA',quoteKo:'"FSD(Supervised)이 130억 마일 돌파 · 1개월 만에 10억 추가 · 26 lifetimes worth of miles"',quoteEn:'"FSD (Supervised) crossed 13 billion miles · added 1 billion in a month · 26 lifetimes worth of miles"',
  source:'출처: Sawyer Merritt · Tesla · 2026.08.03',
  noteHead:'왜 중요한가: FSD 데이터 수집 규모 = AI 훈련 우위 · 오늘 Jensen "Musk 데이터 우위" 프레임 실체화',noteSub:'앞으로 볼 것: FSD Unsupervised 상용 시점·1M 마일당 사고율 지속 개선',footer:'TSLA FSD · 13B 마일',brand:BK},
 en:{title:'TSLA — FSD (Supervised) Crosses 13 Billion Miles Ever First Time · +1B in a Month · City 5B',heroIcon:'🛣️',heroBig:'13 B',heroSub:'Sawyer Merritt (Tesla official): FSD Supervised cumulative 13,001,268,141 miles · added 1B in the month since July 4th (12B) · City Miles 5,017,257,687 (5B+)',
  cards:[{icon:'🛣️',big:'13 B',mid:'FSD total miles',sub:'13,001,268,141'},{icon:'⚡',big:'+1 B / mo',mid:'Accelerating pace',sub:'July 4th 12B → today 13B'},{icon:'🏙️',big:'5 B',mid:'City Miles',sub:'38% urban driving'}],
  quoteLabel:'SAWYER MERRITT · TESLA',quoteKo:'"FSD 130억 마일 돌파·1개월 만에 10억 추가"',quoteEn:'"FSD (Supervised) crossed 13 billion miles · added 1 billion in a month · 26 lifetimes worth of miles"',
  source:'Source: Sawyer Merritt · Tesla · 2026.08.03',
  noteHead:'Why: FSD data-collection scale = AI training edge · substantiates today\'s Jensen "Musk data edge" frame',noteSub:'Watch: FSD Unsupervised commercial timing · sustained accident-rate improvement per 1M miles',footer:'TSLA FSD · 13B miles',brand:BE}},

// 3. Cathie Wood Robotaxi $10T · Tesla margin 60% · 2030 Waymo
{file:'wood-robotaxi-10t-tesla-margin-60',symbol:'TSLA',
 ko:{title:'TSLA — 캐시 우드 "Robotaxi 시장 $1B→$10T (5-10년)·Tesla 마진 10%→60%·2030 Waymo 50% 낮게"',heroIcon:'🌊',heroBig:'$1 B → $10 T',heroSub:'CATHIE WOOD: 자율주행 택시 시장이 5-10년 내 $1B에서 $10T으로 10,000배 성장 · Tesla가 이 흐름에서 마진을 자동차 10%에서 서비스 60%로 6배 확장 · 2030년까지 Tesla 자율주행 팩스가 Waymo보다 50% 낮은 가격',
  cards:[{icon:'🌊',big:'$1B→$10T',mid:'Robotaxi 시장',sub:'5-10년 · 10,000배'},{icon:'📈',big:'10%→60%',mid:'Tesla 마진 확장',sub:'자동차→서비스'},{icon:'💰',big:'-50%',mid:'2030 vs Waymo',sub:'Tesla 팩스 저비용'}],
  quoteLabel:'CATHIE WOOD',quoteKo:'"자율주행 택시 시장이 $1B에서 $10T로 · Tesla 마진 10%→60%·2030년 Tesla가 Waymo 대비 50% 낮은 팩스"',quoteEn:'"Autonomous taxi market from $1B to $10T in 5-10 years · Tesla margin flips from 10% to 60% · Tesla fares 50% lower than Waymo by 2030"',
  source:'출처: Cathie Wood · 2026.08.03',
  noteHead:'왜 중요한가: 오늘 Cole Grinde Robotaxi 월 50만 라이드·Ops 6개 시도 채용과 정합 · Wood의 극단 강세 프레임 실체',noteSub:'앞으로 볼 것: Robotaxi 실 성장률·Tesla 마진 개선·Waymo 220M vs Tesla 400K 격차 축소',footer:'TSLA Wood · Robotaxi $10T',brand:BK},
 en:{title:'TSLA — Cathie Wood "Robotaxi Market $1B→$10T (5-10 yrs) · Tesla Margin 10%→60% · Tesla Fares 50% Lower vs Waymo by 2030"',heroIcon:'🌊',heroBig:'$1 B → $10 T',heroSub:'CATHIE WOOD: autonomous taxi market scales from $1B to $10T in 5-10 years (10,000×) · Tesla flips margin from auto 10% to service 60% (6×) · Tesla autonomous fares 50% lower vs Waymo by 2030',
  cards:[{icon:'🌊',big:'$1B→$10T',mid:'Robotaxi market',sub:'5-10 yrs · 10,000×'},{icon:'📈',big:'10%→60%',mid:'Tesla margin flip',sub:'auto → service'},{icon:'💰',big:'-50%',mid:'2030 vs Waymo',sub:'Tesla lower fares'}],
  quoteLabel:'CATHIE WOOD',quoteKo:'"Robotaxi $1B→$10T·Tesla 마진 10→60%·2030 Waymo 50% 낮게"',quoteEn:'"Autonomous taxi market from $1B to $10T in 5-10 years · Tesla margin flips from 10% to 60% · Tesla fares 50% lower than Waymo by 2030"',
  source:'Source: Cathie Wood · 2026.08.03',
  noteHead:'Why: Consistent with today\'s Cole Grinde Robotaxi 500K/mo · Ops 6-city hiring · substantiates Wood extreme-bull frame',noteSub:'Watch: Robotaxi actual growth · Tesla margin improvement · Waymo 220M vs Tesla 400K gap closing',footer:'TSLA Wood · Robotaxi $10T',brand:BE}},

// 4. SPCX Lockup Expiration Aug 6
{file:'spcx-lockup-expiration-aug6-40pct',symbol:'SPCX',
 ko:{title:'SPCX — 락업 해제 8/6 시작·20-25%→12월까지 40%·IPO 가 아래·8/4 실적 대기',heroIcon:'🔓',heroBig:'8/6',heroSub:'Adam Bloomberg: SPCX 락업 만료가 8월 6일부터 시작 · 초기 20-25% 판매 가능 · 12월까지 순차 해제로 총 40% 유통 확대 · 주가는 이미 IPO 가 아래·8/4 첫 실적 발표 대기 중',
  cards:[{icon:'🔓',big:'8/6',mid:'락업 해제 시작',sub:'첫 20-25% 유통'},{icon:'📈',big:'40 %',mid:'12월까지 유통',sub:'단계적 해제'},{icon:'📊',big:'IPO 가 아래',mid:'현재 시세',sub:'8/4 실적 대기'}],
  quoteLabel:'ADAM BLOOMBERG',quoteKo:'"락업 만료 8/6부터 · 초기 20-25% · 12월까지 40% 유통 확대 · 8/4 실적 대기"',quoteEn:'"SPCX lockup expirations begin August 6 · 20-25% initially · 40% by December · awaiting Tuesday earnings"',
  source:'출처: Adam Bloomberg · 2026.08.03',
  noteHead:'왜 중요한가: 오늘 사상 최저 종가·-50% ATH 시세에 락업 매도 압박 추가 · 8/4 실적이 방향 결정',noteSub:'앞으로 볼 것: 8/4 실적 결과·락업 후 실 매도 규모·12월까지 40% 유통 반영',footer:'SPCX 락업 · 8/6·40% by Dec',brand:BK},
 en:{title:'SPCX — Lockup Expiration Begins Aug 6 · 20-25% → 40% by Dec · Below IPO Price · Awaiting Aug 4 Earnings',heroIcon:'🔓',heroBig:'8/6',heroSub:'Adam Bloomberg: SPCX lockup expirations begin August 6 · 20-25% initially eligible for sale · staggered unlocks lifting to ~40% by December · already below IPO price · awaiting first earnings on Aug 4',
  cards:[{icon:'🔓',big:'8/6',mid:'Lockup begins',sub:'20-25% first tranche'},{icon:'📈',big:'40 %',mid:'By December',sub:'staggered unlocks'},{icon:'📊',big:'< IPO',mid:'Current price',sub:'awaiting Aug 4'}],
  quoteLabel:'ADAM BLOOMBERG',quoteKo:'"락업 8/6 시작·20-25%·40% by Dec"',quoteEn:'"SPCX lockup expirations begin August 6 · 20-25% initially · 40% by December · awaiting Tuesday earnings"',
  source:'Source: Adam Bloomberg · 2026.08.03',
  noteHead:'Why: Adds lockup-sell pressure to already record-low close · -50% ATH · Aug 4 earnings decides direction',noteSub:'Watch: Aug 4 earnings result · actual post-lockup sell volume · 40%-by-Dec reflection',footer:'SPCX Lockup · 8/6 · 40% by Dec',brand:BE}},

// 5. Trump Iran duplicitous · Oil -7% · SPY near ATH
{file:'macro-trump-iran-duplicitous-oil-7',symbol:'MACRO',
 ko:{title:'매크로 — Trump "이란 지도부 duplicitous·대화 중이지만 이란 부인"·Oil -7%·SPY ATH 1% 근접',heroIcon:'🕊️',heroBig:'ATH 근접',heroSub:'andrewwring 정리 Trump 발언: 이란 지도부가 "duplicitous"·"우리는 대화 중이지만 이란은 부인 중" · 지난 주 "이란 폭격" 발언에서 180도 전환·시장 반응: Oil -7%·SPY ATH 1% 근접·매크로 완화 시나리오 실체화',
  cards:[{icon:'🛢️',big:'-7 %',mid:'Oil 하락',sub:'지정학 완화 반영'},{icon:'📈',big:'1 % 근접',mid:'SPY ATH',sub:'8월 반등 시작'},{icon:'🔄',big:'180° 전환',mid:'지난 주 vs 오늘',sub:'"폭격"→"대화"'}],
  quoteLabel:'DONALD J TRUMP · @andrewwring',quoteKo:'"이란 지도부는 duplicitous · 우리는 대화 중이지만 이란은 부인 · 그들이 뭐라 말하든 우리는 해법을 찾기 위해 대화 중"',quoteEn:'"Iranian leadership is duplicitous · they say we aren\'t talking but they know we are · no matter what they say, we are talking to find a solution"',
  source:'출처: andrewwring · Donald J Trump · 2026.08.03',
  noteHead:'왜 중요한가: 8/3 Trump 이란 딜 후속 · Oil -7% + SPY ATH 근접으로 매크로 실 완화·헤지 원유 강세와 정면 대립',noteSub:'앞으로 볼 것: 이란 응답·실 딜 진전·유가·SPY ATH 돌파 여부',footer:'MACRO Trump 이란·Oil -7%·SPY ATH',brand:BK},
 en:{title:'MACRO — Trump "Iranian Leadership Duplicitous · Talking But They Deny" · Oil -7% · SPY 1% From ATH',heroIcon:'🕊️',heroBig:'NEAR ATH',heroSub:'@andrewwring on Trump: Iranian leadership "duplicitous" · "they say we aren\'t talking but they know we are" · 180° turn from last week\'s "bombing Iran" remarks · market reaction: Oil -7% · SPY 1% from ATH · macro relief scenario materializes',
  cards:[{icon:'🛢️',big:'-7 %',mid:'Oil drop',sub:'geopolitical relief'},{icon:'📈',big:'1 % from ATH',mid:'SPY',sub:'August rebound starts'},{icon:'🔄',big:'180° turn',mid:'Last week vs today',sub:'"bombing" → "talking"'}],
  quoteLabel:'DONALD J TRUMP · @andrewwring',quoteKo:'"이란 duplicitous·대화 중이지만 이란 부인"',quoteEn:'"Iranian leadership is duplicitous · they say we aren\'t talking but they know we are · no matter what they say, we are talking to find a solution"',
  source:'Source: @andrewwring · Donald J Trump · 2026.08.03',
  noteHead:'Why: 8/3 Trump Iran deal follow-through · Oil -7% + SPY near ATH = macro relief realized · direct clash with hedge crude bull',noteSub:'Watch: Iran response · actual deal progress · oil price · SPY ATH breakout',footer:'MACRO Trump Iran · Oil -7% · SPY ATH',brand:BE}},

// 6. MSFT 3-day +25% · $489.41
{file:'msft-3day-25pct-48941',symbol:'MSFT',
 ko:{title:'MSFT — 지난 3일간 +25% 이상·시가 $489.41·8/1 +15.85% 반등 지속 확대',heroIcon:'🚀',heroBig:'+25 %',heroSub:'GURGAVN: MSFT가 지난 3거래일간 +25% 이상 상승 · 현재 시가 $489.41 · 8/1 +15.85%·시총 +$400B 반등 흐름이 지속 확대·Q1 강세 실적 반응 + 자사주 $15B 매입 + 클라우드 수요 초과 3중 촉매',
  cards:[{icon:'🚀',big:'+25 %',mid:'3일간 상승',sub:'8/1부터 확장'},{icon:'💰',big:'$489.41',mid:'현재 시가',sub:'MSFT'},{icon:'📈',big:'Mag 7 반등',mid:'YTD -8.2% 극복',sub:'하위그룹→상위'}],
  quoteLabel:'GURGAVN · MICROSOFT',quoteKo:'"MSFT가 지난 3일간 +25% 이상 상승·$489.41"',quoteEn:'"MSFT is now up over 25% in the last 3 days · $489.41"',
  source:'출처: GURGAVN · Microsoft · 2026.08.03',
  noteHead:'왜 중요한가: 8/1 +15.85%·+$400B 시총 반등의 지속·Mag 7 YTD -8.2% 하위에서 회복 확인',noteSub:'앞으로 볼 것: MSFT Mag 7 상위 회복·다른 하이퍼(GOOGL·META·AMZN) 유사 반등 확대',footer:'MSFT +25% · 3일',brand:BK},
 en:{title:'MSFT — Up Over 25% in Last 3 Days · $489.41 · 8/1 +15.85% Rebound Extending',heroIcon:'🚀',heroBig:'+25 %',heroSub:'GURGAVN: MSFT gained over 25% in last 3 trading days · currently $489.41 · 8/1 +15.85% / +$400B cap rebound flow extending · Q1 bull print + $15B buyback + cloud demand exceeding = triple catalyst',
  cards:[{icon:'🚀',big:'+25 %',mid:'3-day gain',sub:'extending since 8/1'},{icon:'💰',big:'$489.41',mid:'Current price',sub:'MSFT'},{icon:'📈',big:'Mag 7 rebound',mid:'YTD -8.2% overcome',sub:'bottom → top group'}],
  quoteLabel:'GURGAVN · MICROSOFT',quoteKo:'"MSFT 3일 +25%·$489.41"',quoteEn:'"MSFT is now up over 25% in the last 3 days · $489.41"',
  source:'Source: GURGAVN · Microsoft · 2026.08.03',
  noteHead:'Why: 8/1 +15.85% / +$400B cap rebound continues · Mag 7 YTD -8.2% bottom recovery confirmed',noteSub:'Watch: MSFT Mag 7 top recovery · other hyper (GOOGL/META/AMZN) similar rebound expansion',footer:'MSFT +25% · 3-day',brand:BE}},

// 7. AMZN OpenAI $50B officially completed
{file:'amzn-openai-50b-completed',symbol:'AMZN',
 ko:{title:'AMZN — OpenAI $50B 투자 공식 완료 확정 (8/3 예상 실체)',heroIcon:'✅',heroBig:'DONE',heroSub:'Kalshi (JUST IN): Amazon이 OpenAI $50B 투자를 공식 완료 · 8/3 Shay Boloor 리포트한 $500B 밸류·5% 지분·IPO 앞두고 프레임이 실체 확정 · Anthropic $16B와 결합해 세계 최대 2개 프런티어 AI 랩 지분 보유',
  cards:[{icon:'✅',big:'DONE',mid:'$50B 완료',sub:'JUST IN · Kalshi'},{icon:'🏛️',big:'2 대 랩',mid:'OpenAI + Anthropic',sub:'$50B + $16B'},{icon:'📊',big:'5 %',mid:'OpenAI 지분',sub:'$500B 밸류 기준'}],
  quoteLabel:'KALSHI',quoteKo:'"Amazon이 OpenAI에 $50B 투자를 공식 완료했다"',quoteEn:'"Amazon has officially completed its $50 billion investment in OpenAI"',
  source:'출처: Kalshi · 2026.08.03',
  noteHead:'왜 중요한가: 8/3 Shay Boloor 보고 프레임이 실 딜 완료·프런티어 AI 지분 게임 실체 확정',noteSub:'앞으로 볼 것: OpenAI IPO 시점·AMZN 지분 매출 반영·MSFT-OpenAI 파트너십과 관계 재편',footer:'AMZN OpenAI $50B · 완료',brand:BK},
 en:{title:'AMZN — OpenAI $50B Investment Officially Completed (8/3 Frame Materialized)',heroIcon:'✅',heroBig:'DONE',heroSub:'Kalshi (JUST IN): Amazon officially completed OpenAI $50B investment · 8/3 Shay Boloor reported $500B valuation / 5% stake / ahead-of-IPO frame materialized · combined with Anthropic $16B, AMZN holds major stakes in two of the world\'s leading frontier AI labs',
  cards:[{icon:'✅',big:'DONE',mid:'$50B completed',sub:'JUST IN · Kalshi'},{icon:'🏛️',big:'2 leading labs',mid:'OpenAI + Anthropic',sub:'$50B + $16B'},{icon:'📊',big:'5 %',mid:'OpenAI stake',sub:'$500B val basis'}],
  quoteLabel:'KALSHI',quoteKo:'"Amazon이 OpenAI $50B 공식 완료"',quoteEn:'"Amazon has officially completed its $50 billion investment in OpenAI"',
  source:'Source: Kalshi · 2026.08.03',
  noteHead:'Why: 8/3 Shay Boloor report frame becomes actual completed deal · frontier-AI-stake game substance confirmed',noteSub:'Watch: OpenAI IPO timing · AMZN stake earnings reflection · MSFT-OpenAI partnership relationship restructuring',footer:'AMZN OpenAI $50B · Complete',brand:BE}},

// 8. SPCX Starlink IAG deal (BA/Iberia/Aer Lingus/LEVEL)
{file:'spcx-starlink-iag-airlines-50pct',symbol:'SPCX',
 ko:{title:'SPCX — Starlink IAG(British Airways·Iberia·Aer Lingus·LEVEL) 50% 장거리 항공기 연말까지 설치',heroIcon:'✈️',heroBig:'50 %',heroSub:'DogeDesigner: International Airlines Group($IAG)가 SpaceX Starlink WiFi를 50% 장거리 항공기에 연말까지 설치 계획 · British Airways·Iberia·Aer Lingus·LEVEL 4개 항공사 그룹 rollout · SPCX Starlink 항공기 채택 대규모 확대',
  cards:[{icon:'✈️',big:'50 %',mid:'장거리 항공기',sub:'연말까지 설치'},{icon:'🏢',big:'IAG 4 사',mid:'BA·Iberia·Aer Lingus·LEVEL',sub:'그룹 rollout'},{icon:'📅',big:'연말',mid:'2026 완료 목표',sub:'단계적 배치'}],
  quoteLabel:'DOGEDESIGNER · INTERNATIONAL AIRLINES GROUP',quoteKo:'"IAG가 SpaceX Starlink를 50% 장거리 항공기에 연말까지 설치 · BA·Iberia·Aer Lingus·LEVEL 그룹 전체"',quoteEn:'"International Airlines Group ($IAG) plans to add SpaceX Starlink WiFi across 50% of long-haul fleet by year-end · group-wide includes British Airways, Iberia, Aer Lingus, LEVEL"',
  source:'출처: DogeDesigner · International Airlines Group · 2026.08.03',
  noteHead:'왜 중요한가: 오늘 Hughesnet 파산·SPCX 매출 프레임 확대·Starlink Aviation 사업 대규모 계약 확인',noteSub:'앞으로 볼 것: 다른 대형 항공사 그룹 유사 계약·Starlink Aviation ARR·SPCX 8/4 실적 반영',footer:'SPCX Starlink · IAG 50%',brand:BK},
 en:{title:'SPCX — Starlink for IAG (British Airways/Iberia/Aer Lingus/LEVEL) 50% Long-Haul Fleet by Year-End',heroIcon:'✈️',heroBig:'50 %',heroSub:'DogeDesigner: International Airlines Group ($IAG) plans to add SpaceX Starlink WiFi across 50% of long-haul fleet by year-end · British Airways / Iberia / Aer Lingus / LEVEL 4-airline group rollout · SPCX Starlink airline adoption large-scale expansion',
  cards:[{icon:'✈️',big:'50 %',mid:'Long-haul fleet',sub:'By year-end'},{icon:'🏢',big:'IAG 4 airlines',mid:'BA·Iberia·Aer Lingus·LEVEL',sub:'Group rollout'},{icon:'📅',big:'Year-end',mid:'2026 target',sub:'Staged deployment'}],
  quoteLabel:'DOGEDESIGNER · INTERNATIONAL AIRLINES GROUP',quoteKo:'"IAG가 Starlink 50% 장거리 항공기 연말"',quoteEn:'"International Airlines Group ($IAG) plans to add SpaceX Starlink WiFi across 50% of long-haul fleet by year-end · group-wide includes British Airways, Iberia, Aer Lingus, LEVEL"',
  source:'Source: DogeDesigner · International Airlines Group · 2026.08.03',
  noteHead:'Why: Combined with today\'s Hughesnet bankruptcy · SPCX revenue frame expands · Starlink Aviation large-contract confirmation',noteSub:'Watch: Other major airline-group similar deals · Starlink Aviation ARR · SPCX Aug 4 earnings reflection',footer:'SPCX Starlink · IAG 50%',brand:BE}},

// 9. TSLA France +86% YoY (Sawyer Merritt / Schmidt) — revision from 8/3 +26%
{file:'tsla-france-86pct-july-revision',symbol:'TSLA',
 ko:{title:'TSLA — France 7월 registrations +86% YoY·2026 두 번째 최고월·Model 3/Y Norway 신 기록',heroIcon:'🇫🇷',heroBig:'+86 %',heroSub:'Sawyer Merritt (Schmidt Automotive 인용): Tesla France 7월 registrations +86% YoY·2026 두 번째 최고월 · Model 3/Y Norway 신 기록·유럽 인센티브 rich 시장(France·Germany) 하반기 급증 예상·Sweden·Norway·Spain 약세는 segment 반영',
  cards:[{icon:'🇫🇷',big:'+86 %',mid:'France 7월 registrations',sub:'YoY · 2026 2위 최고월'},{icon:'🇳🇴',big:'신 기록',mid:'Model 3/Y Norway',sub:'월별 신규'},{icon:'📊',big:'하반기 급증',mid:'France·Germany 예상',sub:'인센티브 rich 시장'}],
  quoteLabel:'SAWYER MERRITT · SCHMIDT AUTOMOTIVE',quoteKo:'"Tesla France 7월 registrations +86%·Model 3/Y Norway 신 기록·인센티브 rich 시장 하반기 급증 예상"',quoteEn:'"Tesla registrations up 86% in France in July · second best month for 2026 · Model 3/Y in Norway registered a new record · France/Germany volumes could rise sharply in H2 2026"',
  source:'출처: Sawyer Merritt · Schmidt Automotive · 2026.08.03',
  noteHead:'왜 중요한가: 8/3 Ming/CCFA +26%(sales) 대비 registrations 기준 +86%로 유럽 회복 실체 확대·인센티브 정책 반영',noteSub:'앞으로 볼 것: 8월 France·Germany 데이터·다른 유럽 국가 반등·인센티브 정책 지속',footer:'TSLA France +86% · Norway 신 기록',brand:BK},
 en:{title:'TSLA — France July Registrations +86% YoY · 2026 2nd Best Month · Model 3/Y Norway New Record',heroIcon:'🇫🇷',heroBig:'+86 %',heroSub:'Sawyer Merritt (citing Schmidt Automotive): Tesla France July registrations +86% YoY · second best month for 2026 · Model 3/Y Norway new record · European incentive-rich markets (France/Germany) H2 sharp rise expected · Sweden/Norway/Spain weakness reflects segments',
  cards:[{icon:'🇫🇷',big:'+86 %',mid:'France Jul registrations',sub:'YoY · 2026 2nd best'},{icon:'🇳🇴',big:'New record',mid:'Model 3/Y Norway',sub:'monthly new'},{icon:'📊',big:'H2 sharp rise',mid:'France·Germany',sub:'incentive-rich markets'}],
  quoteLabel:'SAWYER MERRITT · SCHMIDT AUTOMOTIVE',quoteKo:'"France 7월 +86%·Model 3/Y Norway 신 기록·인센티브 시장 하반기 급증"',quoteEn:'"Tesla registrations up 86% in France in July · second best month for 2026 · Model 3/Y in Norway registered a new record · France/Germany volumes could rise sharply in H2 2026"',
  source:'Source: Sawyer Merritt · Schmidt Automotive · 2026.08.03',
  noteHead:'Why: vs 8/3 Ming/CCFA +26% (sales), registrations +86% expands European recovery substance · reflects incentive policy',noteSub:'Watch: August France/Germany data · other European countries rebound · incentive policy continuity',footer:'TSLA France +86% · Norway new record',brand:BE}},

// 10. TSLA Colombia July 1,911 · +18% · BEV 40%
{file:'tsla-colombia-july-1911-bev-40',symbol:'TSLA',
 ko:{title:'TSLA — Colombia 7월 1,911대·YoY +18%·BEV 시장 40% 점유·4위 브랜드·Model Y 최다',heroIcon:'🇨🇴',heroBig:'40 %',heroSub:'Roland Pircher: Tesla Colombia 7월 1,911대 판매·+12% 시장 점유율·BEV 침투율 18.2% 중 Tesla 40% 점유 · Tesla가 Colombia 4위 브랜드·Model Y 최다 판매 차량·94% Model Y·6% Model 3',
  cards:[{icon:'🇨🇴',big:'1,911 대',mid:'Colombia 7월 판매',sub:'+18% YoY'},{icon:'⚡',big:'40 %',mid:'BEV 시장 점유',sub:'중형 시장 지배'},{icon:'🏆',big:'4 위',mid:'Colombia 브랜드 순위',sub:'Model Y 최다'}],
  quoteLabel:'ROLAND PIRCHER',quoteKo:'"Tesla Colombia 7월 1,911대·시장 점유율 12%·BEV 시장 40% 점유·Model Y 최다"',quoteEn:'"Colombia reported 1,911 Tesla sales in July, +12% market share, BEV penetration 18.2% with Tesla 40% BEV share, Tesla 4th best-selling brand, Model Y best-selling"',
  source:'출처: Roland Pircher · 2026.08.03',
  noteHead:'왜 중요한가: 오늘 France +86%·Norway 신 기록에 더해 신흥 시장 Colombia 지배 확인 · TSLA 글로벌 다각 회복',noteSub:'앞으로 볼 것: 다른 남미(브라질·멕시코) 유사 성장·BEV 침투 확대·Colombia 브랜드 순위 상승',footer:'TSLA Colombia · 1,911대 · BEV 40%',brand:BK},
 en:{title:'TSLA — Colombia July 1,911 Sales · +18% YoY · BEV 40% Share · 4th Best-Selling Brand · Model Y #1',heroIcon:'🇨🇴',heroBig:'40 %',heroSub:'Roland Pircher: Tesla Colombia July 1,911 sales · +12% market share · BEV penetration 18.2% with Tesla 40% share · Tesla 4th best-selling brand · Model Y best-selling vehicle · 94% Model Y · 6% Model 3',
  cards:[{icon:'🇨🇴',big:'1,911 units',mid:'Colombia July sales',sub:'+18% YoY'},{icon:'⚡',big:'40 %',mid:'BEV market share',sub:'mid-market dominance'},{icon:'🏆',big:'#4',mid:'Colombia brand rank',sub:'Model Y #1'}],
  quoteLabel:'ROLAND PIRCHER',quoteKo:'"Colombia 7월 1,911대·시장 점유율 12%·BEV 40%·Model Y 최다"',quoteEn:'"Colombia reported 1,911 Tesla sales in July, +12% market share, BEV penetration 18.2% with Tesla 40% BEV share, Tesla 4th best-selling brand, Model Y best-selling"',
  source:'Source: Roland Pircher · 2026.08.03',
  noteHead:'Why: On top of today\'s France +86% / Norway new record · confirms emerging-market Colombia dominance · TSLA global multi-axis recovery',noteSub:'Watch: Other Latin American (Brazil/Mexico) similar growth · BEV penetration expansion · Colombia brand rank ascent',footer:'TSLA Colombia · 1,911 · BEV 40%',brand:BE}},

// 11. TSLA Robotaxi Ops 6-city hiring
{file:'tsla-robotaxi-ops-6-cities-hiring',symbol:'TSLA',
 ko:{title:'TSLA — Robotaxi Operations Manager 6개 시도 채용 확대 (Las Vegas·Phoenix·Austin·Dallas·Houston·SA)',heroIcon:'👥',heroBig:'6 CITIES',heroSub:'Yolo: Tesla가 Robotaxi Operations Manager 채용을 Las Vegas·Phoenix Arizona·Austin·Dallas·Houston Fort Worth·San Antonio Texas 6개 시도에서 대량 확대 · Associate Roles도 다수·Robotaxi 상용 확장 실 준비',
  cards:[{icon:'👥',big:'6 시도',mid:'채용 확대',sub:'LV·PHX·Austin·Dallas·HTX·SA'},{icon:'📍',big:'TX 4 시도',mid:'Austin·Dallas·Houston·SA',sub:'텍사스 확장'},{icon:'⚡',big:'상용 확장',mid:'실 준비',sub:'Cybercab 배치 지원'}],
  quoteLabel:'YOLO · TESLA',quoteKo:'"Tesla가 Robotaxi Operations Manager를 6개 시도에서 채용 확대 · Cybercab 상용 배치 지원"',quoteEn:'"Tesla hiring Robotaxi Operations Managers in Las Vegas, Phoenix, Austin, Dallas, Houston, San Antonio"',
  source:'출처: Yolo · Tesla · 2026.08.03',
  noteHead:'왜 중요한가: 8/3 Cole Grinde 월 50만 라이드 + 오늘 Wood $10T 프레임과 정합·실 상용 인력 준비',noteSub:'앞으로 볼 것: 실 배치 시점·다른 시도 확장·Ops 채용 규모·수익화 지표',footer:'TSLA Robotaxi Ops · 6 시도',brand:BK},
 en:{title:'TSLA — Robotaxi Operations Manager Hiring Expands to 6 Cities (Las Vegas · Phoenix · Austin · Dallas · Houston · SA)',heroIcon:'👥',heroBig:'6 CITIES',heroSub:'Yolo: Tesla hiring Robotaxi Operations Manager mass expansion in Las Vegas / Phoenix Arizona / Austin / Dallas / Houston Fort Worth / San Antonio Texas 6 cities · also multiple Associate Roles · real Robotaxi commercial expansion prep',
  cards:[{icon:'👥',big:'6 cities',mid:'Hiring expansion',sub:'LV·PHX·Austin·Dallas·HTX·SA'},{icon:'📍',big:'TX 4 cities',mid:'Austin·Dallas·Houston·SA',sub:'Texas expansion'},{icon:'⚡',big:'Commercial expansion',mid:'Real prep',sub:'Cybercab deployment support'}],
  quoteLabel:'YOLO · TESLA',quoteKo:'"Tesla Robotaxi Ops 6개 시도 채용"',quoteEn:'"Tesla hiring Robotaxi Operations Managers in Las Vegas, Phoenix, Austin, Dallas, Houston, San Antonio"',
  source:'Source: Yolo · Tesla · 2026.08.03',
  noteHead:'Why: Consistent with 8/3 Cole Grinde 500K/mo rides + today\'s Wood $10T frame · real commercial staffing prep',noteSub:'Watch: Actual deployment timing · other city expansion · Ops hiring scale · monetization metrics',footer:'TSLA Robotaxi Ops · 6 cities',brand:BE}},

// 12. MSFT $10B cybersecurity Palo Alto
{file:'msft-cybersecurity-10b-palo-alto',symbol:'MSFT',
 ko:{title:'MSFT — $10B 사이버보안 투자·Palo Alto Networks 파트너십·AI 보안 축 확대',heroIcon:'🛡️',heroBig:'$10 B',heroSub:'Gaia: MSFT가 사이버보안에 $10B 투자·Palo Alto Networks와 파트너십 · 8/1 리포트한 MSFT AI 모델 사이버 공격 3개 조직 침입 이슈에 대한 실 대응·AI 보안 축 대규모 확대',
  cards:[{icon:'🛡️',big:'$10 B',mid:'사이버보안 투자',sub:'MSFT 대규모'},{icon:'🤝',big:'Palo Alto',mid:'Networks 파트너십',sub:'AI 보안 협업'},{icon:'📢',big:'AI 보안 대응',mid:'8/1 AI 사이버 이슈',sub:'실 대응 조치'}],
  quoteLabel:'GAIA · MICROSOFT · PALO ALTO NETWORKS',quoteKo:'"MSFT가 사이버보안에 $10B 투자 · Palo Alto Networks와 파트너십"',quoteEn:'"MSFT announces $10B investment in cybersecurity via BizCore partnership with Palo Alto Networks"',
  source:'출처: Gaia · Microsoft · 2026.08.03',
  noteHead:'왜 중요한가: 8/1 MSFT AI 사이버 3개 조직 침입 사건 후 실 대응 · AI 보안 규제 압박에 선제 대응',noteSub:'앞으로 볼 것: Palo Alto 통합 시점·AI 보안 규제 완화·다른 하이퍼 유사 조치',footer:'MSFT 보안 $10B · Palo Alto',brand:BK},
 en:{title:'MSFT — $10B Cybersecurity Investment · Palo Alto Networks Partnership · AI Security Axis Expands',heroIcon:'🛡️',heroBig:'$10 B',heroSub:'Gaia: MSFT invests $10B in cybersecurity · partnership with Palo Alto Networks · real response to 8/1 reported MSFT AI models used in cyber attacks breaching 3 organizations · AI security axis large-scale expansion',
  cards:[{icon:'🛡️',big:'$10 B',mid:'Cybersecurity investment',sub:'MSFT large-scale'},{icon:'🤝',big:'Palo Alto',mid:'Networks partnership',sub:'AI security collab'},{icon:'📢',big:'AI security response',mid:'vs 8/1 AI cyber issue',sub:'Actual response measure'}],
  quoteLabel:'GAIA · MICROSOFT · PALO ALTO NETWORKS',quoteKo:'"MSFT 사이버보안 $10B·Palo Alto 파트너십"',quoteEn:'"MSFT announces $10B investment in cybersecurity via BizCore partnership with Palo Alto Networks"',
  source:'Source: Gaia · Microsoft · 2026.08.03',
  noteHead:'Why: Real response after 8/1 MSFT AI cyber 3-organization breach · preemptive response to AI-security regulatory pressure',noteSub:'Watch: Palo Alto integration timing · AI-security regulation relief · other hyper similar measures',footer:'MSFT Security $10B · Palo Alto',brand:BE}},

// 13. Macro hedge US stocks net long fastest since 2020.12
{file:'macro-hedge-us-stocks-net-long-2020',symbol:'MACRO',
 ko:{title:'매크로 — 헤지펀드가 US 주식 순매수를 2020년 12월 이후 가장 빠른 속도로 (Barchart)',heroIcon:'📈',heroBig:'2020.12 이후 최대',heroSub:'Barchart: 헤지펀드가 지난 주 US 주식 순매수(net long)를 2020년 12월 이후 가장 빠른 속도로 확대 · 8월 매크로 반전 시그널 · MSFT +25% + Trump 이란 딜 완화 + SPY ATH 근접의 종합 반응',
  cards:[{icon:'📈',big:'US 순매수',mid:'헤지펀드',sub:'2020.12 이후 최대'},{icon:'⚡',big:'가장 빠른 속도',mid:'주간 flow',sub:'매크로 반전 신호'},{icon:'📊',big:'3중 촉매',mid:'MSFT·Trump·SPY',sub:'실적+지정학+ATH'}],
  quoteLabel:'BARCHART',quoteKo:'"헤지펀드가 지난 주 US 주식 순매수를 2020년 12월 이후 가장 빠른 속도로 확대"',quoteEn:'"Hedge Funds went net long US Stocks last week at the fastest pace since December 2020"',
  source:'출처: Barchart · 2026.08.03',
  noteHead:'왜 중요한가: 8/1 Aschenbrenner 청산·insider 매도 30년 최고와 정반대 방향·매크로 심리 반전 확인',noteSub:'앞으로 볼 것: 헤지 flow 지속·Goldman $155B 강제 매도 vs 순매수 실체 확인',footer:'MACRO 헤지 US 순매수 · 2020.12 이후',brand:BK},
 en:{title:'MACRO — Hedge Funds Net Long US Stocks at Fastest Pace Since December 2020 (Barchart)',heroIcon:'📈',heroBig:'FASTEST SINCE DEC 2020',heroSub:'Barchart: Hedge funds went net long US Stocks last week at fastest pace since December 2020 · August macro reversal signal · combined reaction to MSFT +25% + Trump Iran deal relief + SPY near ATH',
  cards:[{icon:'📈',big:'US net long',mid:'Hedge funds',sub:'Fastest since Dec 2020'},{icon:'⚡',big:'Fastest pace',mid:'Weekly flow',sub:'Macro reversal signal'},{icon:'📊',big:'Triple catalyst',mid:'MSFT · Trump · SPY',sub:'Earnings + geo + ATH'}],
  quoteLabel:'BARCHART',quoteKo:'"헤지 US 순매수 2020.12 이후 최대"',quoteEn:'"Hedge Funds went net long US Stocks last week at the fastest pace since December 2020"',
  source:'Source: Barchart · 2026.08.03',
  noteHead:'Why: Opposite direction of 8/1 Aschenbrenner liquidation / insider selling 30-yr high · macro sentiment reversal confirmed',noteSub:'Watch: Hedge flow continuity · Goldman $155B forced sell vs net long substance confirmation',footer:'MACRO Hedge US Net Long · Since Dec 2020',brand:BE}},

// 14. SPCX implied market cap $1,435B · 34-day $1T
{file:'spcx-implied-cap-1435b-34day-1t',symbol:'SPCX',
 ko:{title:'SPCX — 시가총액 implied $1,435B · 34 거래일 연속 $1T 돌파 유지',heroIcon:'💎',heroBig:'$1,435 B',heroSub:'AI Investment Research: SPCX 현재 주가 implied 시가총액이 $1,435B · 34 거래일 연속 $1T 이상 유지 · Ron Baron $30-40T·Musk +TSLA 매출 프레임의 실 시장 반영·-50% ATH 시세에도 mega-cap 지위 확인',
  cards:[{icon:'💎',big:'$1,435 B',mid:'implied 시총',sub:'현재 주가 기준'},{icon:'📅',big:'34 거래일',mid:'$1T 연속 유지',sub:'mega-cap 지위'},{icon:'🎯',big:'Ron Baron $30-40T',mid:'장기 전망',sub:'실 시장 시세'}],
  quoteLabel:'AI INVESTMENT RESEARCH',quoteKo:'"SPCX 현재 시가총액 implied $1,435B · 34 거래일 연속 $1T 돌파 유지"',quoteEn:'"SPCX current share price implied market value $1,435B · sustained over $1T for 34 consecutive trading days"',
  source:'출처: AI Investment Research · 2026.08.03',
  noteHead:'왜 중요한가: -50% ATH·사상 최저 종가에도 $1T mega-cap 지위 유지 · 8/4 실적 앞두고 실 밸류 확인',noteSub:'앞으로 볼 것: 8/4 실적 후 시세 반응·34 거래일 $1T 지속 여부·Ron Baron 프레임 재확인',footer:'SPCX $1,435B · 34 거래일 $1T',brand:BK},
 en:{title:'SPCX — Implied Market Cap $1,435B · 34 Consecutive Trading Days Above $1T',heroIcon:'💎',heroBig:'$1,435 B',heroSub:'AI Investment Research: SPCX current share price implied market cap $1,435B · sustained over $1T for 34 consecutive trading days · substance of Ron Baron $30-40T / Musk +TSLA revenue frames · mega-cap status confirmed despite -50% ATH',
  cards:[{icon:'💎',big:'$1,435 B',mid:'Implied market cap',sub:'Current price basis'},{icon:'📅',big:'34 trading days',mid:'Above $1T continuous',sub:'Mega-cap status'},{icon:'🎯',big:'Ron Baron $30-40T',mid:'Long-term outlook',sub:'Actual market price'}],
  quoteLabel:'AI INVESTMENT RESEARCH',quoteKo:'"SPCX implied $1,435B·34일 $1T"',quoteEn:'"SPCX current share price implied market value $1,435B · sustained over $1T for 34 consecutive trading days"',
  source:'Source: AI Investment Research · 2026.08.03',
  noteHead:'Why: Sustains $1T mega-cap status despite -50% ATH / record-low close · confirms real valuation ahead of Aug 4 earnings',noteSub:'Watch: Post-Aug-4 earnings reaction · 34-day $1T continuity · Ron Baron frame reconfirmation',footer:'SPCX $1,435B · 34-day $1T',brand:BE}},

// 15. Hughesnet Chapter 11 · Starlink competition
{file:'hughesnet-chapter11-starlink-competition',symbol:'SPCX',
 ko:{title:'SPCX Starlink — 경쟁사 Hughesnet Chapter 11 파산·Starlink에 가입자 상실·Q2 -59K',heroIcon:'📉',heroBig:'CHAPTER 11',heroSub:'Sawyer Merritt: US 위성 인터넷 Hughesnet이 Chapter 11 파산 신청 · 현금 부족 + $Starlink에 가입자 상실 · EchoStar Q2 broadband 가입자 632K로 -59K 감소 · Starlink Aviation·주거·기업 다각 경쟁 강화',
  cards:[{icon:'📉',big:'CHAPTER 11',mid:'Hughesnet 파산',sub:'현금 부족·가입자 상실'},{icon:'📊',big:'-59 K',mid:'EchoStar Q2 broadband',sub:'632K로 감소'},{icon:'🚀',big:'Starlink 우위',mid:'경쟁사 이탈',sub:'반사이익 확대'}],
  quoteLabel:'SAWYER MERRITT · ECHOSTAR',quoteKo:'"Hughesnet이 Chapter 11 파산 · $Starlink에 가입자 상실 · EchoStar Q2 broadband 632K로 -59K"',quoteEn:'"US satellite internet provider Hughesnet has filed for Chapter 11 bankruptcy · running low on cash and losing subscribers to $Starlink · EchoStar Q2 broadband 632K, -59K"',
  source:'출처: Sawyer Merritt · EchoStar Q2 · 2026.08.03',
  noteHead:'왜 중요한가: 오늘 IAG 계약(50% 장거리 항공기)과 결합 · Starlink 실 매출 성장 프레임 · SPCX 8/4 실적 앞두고 강세 신호',noteSub:'앞으로 볼 것: 다른 위성 인터넷 경쟁사 상황·Starlink 매출 성장률·SPCX 8/4 실적 반영',footer:'SPCX Starlink · Hughesnet 파산',brand:BK},
 en:{title:'SPCX Starlink — Competitor Hughesnet Files Chapter 11 · Lost Subscribers to Starlink · Q2 -59K',heroIcon:'📉',heroBig:'CHAPTER 11',heroSub:'Sawyer Merritt: US satellite internet Hughesnet filed for Chapter 11 bankruptcy · running low on cash + losing subscribers to $Starlink · EchoStar Q2 broadband subscribers 632K (loss of 59K) · Starlink Aviation / residential / enterprise multi-axis competition strengthens',
  cards:[{icon:'📉',big:'CHAPTER 11',mid:'Hughesnet bankruptcy',sub:'Cash-poor / subs loss'},{icon:'📊',big:'-59 K',mid:'EchoStar Q2 broadband',sub:'Down to 632K'},{icon:'🚀',big:'Starlink edge',mid:'Competitor exit',sub:'Windfall expansion'}],
  quoteLabel:'SAWYER MERRITT · ECHOSTAR',quoteKo:'"Hughesnet Chapter 11·Starlink 가입자 상실·EchoStar Q2 -59K"',quoteEn:'"US satellite internet provider Hughesnet has filed for Chapter 11 bankruptcy · running low on cash and losing subscribers to $Starlink · EchoStar Q2 broadband 632K, -59K"',
  source:'Source: Sawyer Merritt · EchoStar Q2 · 2026.08.03',
  noteHead:'Why: Combined with today\'s IAG deal (50% long-haul fleet) · Starlink real revenue-growth frame · bull signal ahead of SPCX Aug 4 earnings',noteSub:'Watch: Other satellite-internet competitor status · Starlink revenue growth rate · SPCX Aug 4 earnings reflection',footer:'SPCX Starlink · Hughesnet bankruptcy',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260804.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260804-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
