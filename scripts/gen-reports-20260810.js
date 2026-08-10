// 2026-08-10 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.10';

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
// 1. Terafab scale comparison
{file:'terafab-scale-giga-pentagon-boeing-apple',symbol:'SPCX',
 ko:{title:'Terafab 규모 비교 — Giga Texas 10x·Pentagon 10x·Boeing Everett 23x·Apple Park 55x',heroIcon:'📏',heroBig:'100 M sqft',heroSub:'World of Statistics: Terafab 100M sqft는 Giga Texas 10배·Pentagon 10배·Boeing Everett Factory 23배·Apple Park 55배·"세계 최대 factory"·Musk 프레임의 실 규모 실감',
  cards:[{icon:'🏭',big:'10 x',mid:'Giga Texas 대비',sub:'Tesla 최대 공장'},{icon:'🏛️',big:'10 x',mid:'Pentagon 대비',sub:'세계 최대 오피스'},{icon:'🍎',big:'55 x',mid:'Apple Park 대비',sub:'Boeing 23배'}],
  quoteLabel:'WORLD OF STATISTICS',quoteKo:'"Terafab 100M sqft·Giga Texas 10x·Pentagon 10x·Boeing Everett 23x·Apple Park 55x·scale is insane"',quoteEn:'"Terafab 100M sqft · 10x Giga Texas · 10x Pentagon · 23x Boeing Everett Factory · 55x Apple Park · scale is insane"',
  source:'출처: World of Statistics · 2026.08.09',
  noteHead:'왜 중요한가: 8/8 Musk "most valuable building" 프레임의 실 규모 확인·세계 최대 건물·chip 산업 재편 심체',noteSub:'앞으로 볼 것: 착공·완공 timeline·다음 phase 확장·실 chip 생산',footer:'Terafab · 100M sqft · 10-55x',brand:BK},
 en:{title:'Terafab Scale Comparison — 10x Giga Texas · 10x Pentagon · 23x Boeing Everett · 55x Apple Park',heroIcon:'📏',heroBig:'100 M sqft',heroSub:'World of Statistics: Terafab 100M sqft = 10x Giga Texas · 10x Pentagon · 23x Boeing Everett Factory · 55x Apple Park · "world\'s largest factory" · Musk frame\'s real scale',
  cards:[{icon:'🏭',big:'10 x',mid:'vs Giga Texas',sub:'Tesla largest factory'},{icon:'🏛️',big:'10 x',mid:'vs Pentagon',sub:'World largest office'},{icon:'🍎',big:'55 x',mid:'vs Apple Park',sub:'Boeing 23x'}],
  quoteLabel:'WORLD OF STATISTICS',quoteKo:'"Terafab 100M sqft·insane scale"',quoteEn:'"Terafab 100M sqft · 10x Giga Texas · 10x Pentagon · 23x Boeing Everett Factory · 55x Apple Park · scale is insane"',
  source:'Source: World of Statistics · 2026.08.09',
  noteHead:'Why: Real scale confirmation of 8/8 Musk "most valuable building" frame · world\'s largest building · chip industry reshaping substance',noteSub:'Watch: Groundbreaking/completion timeline · next phase expansion · real chip production',footer:'Terafab · 100M sqft · 10-55x',brand:BE}},

// 2. TSLA California MyFirstEV 4-day sold out
{file:'tsla-california-myfirstev-4days-sold-out',symbol:'TSLA',
 ko:{title:'TSLA — California MyFirstEV $3,500 rebate 자금 4일 만에 소진·EV 채택 강력',heroIcon:'🇺🇸',heroBig:'4 DAYS',heroSub:'Sawyer Merritt: California MyFirstEV program 자금 4일 만에 완전 소진·8/3 launch·22시간 전만 해도 30% 잔여·$3,500 point-of-sale rebate 첫 EV 구매자 대상·EV 채택 강력 시그널',
  cards:[{icon:'⚡',big:'4 일',mid:'전액 소진',sub:'8/3 launch → 오늘'},{icon:'💰',big:'$3,500',mid:'rebate/차량',sub:'first-time EV 구매자'},{icon:'📈',big:'EV 채택',mid:'수요 폭발 증거',sub:'22시간 만에 30% → 0%'}],
  quoteLabel:'SAWYER MERRITT · CALIFORNIA MYFIRSTEV',quoteKo:'"California MyFirstEV 자금 4일 만에 소진·$3,500 rebate·22시간 만에 30% 잔여 → 완전 소진"',quoteEn:'"California MyFirstEV funds sold out in 4 days · $3,500 rebate · 30% remaining just 22 hours ago"',
  source:'출처: Sawyer Merritt · California MyFirstEV program · 2026.08.09',
  noteHead:'왜 중요한가: EV 수요 실 시그널·8/7 Tesla 태양광 시설·오늘 Robotaxi 대량 배치와 결합·CA EV 시장 회복 확인',noteSub:'앞으로 볼 것: 다른 주 유사 프로그램·Tesla CA 매출·연방 EV 인센티브',footer:'TSLA CA MyFirstEV · 4일 소진',brand:BK},
 en:{title:'TSLA — California MyFirstEV $3,500 Rebate Funds Sold Out in 4 Days · Strong EV Adoption Signal',heroIcon:'🇺🇸',heroBig:'4 DAYS',heroSub:'Sawyer Merritt: California MyFirstEV program funds fully depleted in 4 days · launched Aug 3 · 30% remaining just 22 hours ago · $3,500 point-of-sale rebate for first-time EV buyers · strong EV adoption signal',
  cards:[{icon:'⚡',big:'4 days',mid:'Fully depleted',sub:'Aug 3 launch → today'},{icon:'💰',big:'$3,500',mid:'Rebate/vehicle',sub:'First-time EV buyers'},{icon:'📈',big:'EV adoption',mid:'Demand surge proof',sub:'30% → 0% in 22 hours'}],
  quoteLabel:'SAWYER MERRITT · CALIFORNIA MYFIRSTEV',quoteKo:'"MyFirstEV 4일 소진·$3,500"',quoteEn:'"California MyFirstEV funds sold out in 4 days · $3,500 rebate · 30% remaining just 22 hours ago"',
  source:'Source: Sawyer Merritt · California MyFirstEV program · 2026.08.09',
  noteHead:'Why: Real EV demand signal · combined with 8/7 Tesla solar facility and today Robotaxi mass deployment · CA EV market recovery confirmed',noteSub:'Watch: Other states similar programs · Tesla CA revenue · federal EV incentives',footer:'TSLA CA MyFirstEV · 4-Day Sold Out',brand:BE}},

// 3. TSLA Robotaxi Houston army
{file:'tsla-robotaxi-houston-army-model-y-cybercab',symbol:'TSLA',
 ko:{title:'TSLA — Robotaxi Houston 배치 대량 확대·Model Y + Cybercab army 조성',heroIcon:'🚕',heroBig:'ARMY',heroSub:'Robotaxi Radar: Houston Robotaxi deployment lot에 Model Y Robotaxi + Cybercab 대량 배치·"army 조성 중"·8/6 Cybercab 삼성·LG 카메라 $500M·8/7 Optimus 채용 상업 시그널과 결합',
  cards:[{icon:'🚕',big:'Army',mid:'Robotaxi 대량 배치',sub:'Houston lot'},{icon:'🚗',big:'Model Y + Cybercab',mid:'혼합 배치',sub:'Robotaxi fleet'},{icon:'📅',big:'배치 확대',mid:'상업 서비스 임박',sub:'Houston lot 관측'}],
  quoteLabel:'ROBOTAXI RADAR',quoteKo:'"Houston Robotaxi deployment lot이 Model Y Robotaxi + Cybercab army 조성 중"',quoteEn:'"Houston Robotaxi deployment lot is building a massive army of Model Y Robotaxis and Cybercabs"',
  source:'출처: Robotaxi Radar · 2026.08.09',
  noteHead:'왜 중요한가: 8/3 Cole Grinde 월 50만 라이드·8/6 Cybercab 카메라·8/8 Optimus 채용에 이어 실 상용 배치 규모 확대',noteSub:'앞으로 볼 것: 실 상용 개시·다른 도시 배치·Robotaxi 매출 반영',footer:'TSLA Robotaxi · Houston army',brand:BK},
 en:{title:'TSLA — Robotaxi Houston Mass Deployment · Model Y + Cybercab Army Building',heroIcon:'🚕',heroBig:'ARMY',heroSub:'Robotaxi Radar: Houston Robotaxi deployment lot has massive Model Y Robotaxi + Cybercab army building · combines with 8/6 Cybercab Samsung/LG camera $500M and 8/7 Optimus hiring commercial signals',
  cards:[{icon:'🚕',big:'Army',mid:'Robotaxi mass deploy',sub:'Houston lot'},{icon:'🚗',big:'Model Y + Cybercab',mid:'Mixed deployment',sub:'Robotaxi fleet'},{icon:'📅',big:'Deployment scale',mid:'Commercial imminent',sub:'Houston lot observed'}],
  quoteLabel:'ROBOTAXI RADAR',quoteKo:'"Houston Model Y + Cybercab army"',quoteEn:'"Houston Robotaxi deployment lot is building a massive army of Model Y Robotaxis and Cybercabs"',
  source:'Source: Robotaxi Radar · 2026.08.09',
  noteHead:'Why: After 8/3 Cole Grinde 500K/mo rides · 8/6 Cybercab camera · 8/8 Optimus hiring, real commercial deployment scale expansion',noteSub:'Watch: Commercial launch · other city deployment · Robotaxi revenue reflection',footer:'TSLA Robotaxi · Houston Army',brand:BE}},

// 4. Musk 'Starlink alone $1T/year'
{file:'musk-starlink-alone-1t-year-revenue',symbol:'SPCX',
 ko:{title:'Musk — "Starlink만으로 $1T/year 매출 가능" 발언 (8/8 $100B ARR 상향)',heroIcon:'📡',heroBig:'$1 T/yr',heroSub:'unusual_trades: Musk가 Starlink 서비스만으로 연 $1T 매출을 창출 가능하다고 발언·8/8 SPCX $100B ARR 프레임의 상향·오늘 Starlink V3 +100X bandwidth·$200B/year 매출 계획과 결합',
  cards:[{icon:'📡',big:'$1 T/yr',mid:'Starlink 만',sub:'Musk 발언'},{icon:'📈',big:'Upgrade',mid:'8/8 $100B ARR에서',sub:'10배 상향'},{icon:'🌐',big:'단일 축',mid:'Starlink만으로',sub:'SPCX 전체 아닌'}],
  quoteLabel:'ELON MUSK · UNUSUAL_TRADES',quoteKo:'"Starlink만으로 연 $1T 매출 생성 가능"',quoteEn:'"Starlink alone could eventually generate $1 trillion in revenue per year"',
  source:'출처: unusual_trades · Elon Musk · 2026.08.09',
  noteHead:'왜 중요한가: 8/8 $100B ARR·오늘 V3 +100X·$200B/yr·Aaron Barrett $300B ARR 2029-2030에 이어 극단 upgrade',noteSub:'앞으로 볼 것: Starlink 실 매출 성장·V3 배치·Aviation·Mobile 실체',footer:'Musk · Starlink 만 $1T/yr',brand:BK},
 en:{title:'Musk — "Starlink Alone Could Generate $1T/Year Revenue" (Upgrade from 8/8 $100B ARR)',heroIcon:'📡',heroBig:'$1 T/yr',heroSub:'unusual_trades: Musk says Starlink alone could eventually generate $1 trillion in revenue per year · upgrade from 8/8 SPCX $100B ARR frame · combined with today\'s Starlink V3 +100X bandwidth / $200B/year revenue plan',
  cards:[{icon:'📡',big:'$1 T/yr',mid:'Starlink alone',sub:'Musk statement'},{icon:'📈',big:'Upgrade',mid:'From 8/8 $100B ARR',sub:'10x higher'},{icon:'🌐',big:'Single axis',mid:'Starlink alone',sub:'Not entire SPCX'}],
  quoteLabel:'ELON MUSK · UNUSUAL_TRADES',quoteKo:'"Starlink만 $1T/yr"',quoteEn:'"Starlink alone could eventually generate $1 trillion in revenue per year"',
  source:'Source: unusual_trades · Elon Musk · 2026.08.09',
  noteHead:'Why: After 8/8 $100B ARR · today V3 +100X / $200B/yr · Aaron Barrett $300B ARR 2029-2030 · extreme upgrade',noteSub:'Watch: Starlink actual revenue growth · V3 deployment · Aviation/Mobile substance',footer:'Musk · Starlink Alone $1T/yr',brand:BE}},

// 5. Brett Winton open weight vs frontier
{file:'brett-winton-open-weight-frontier-defense',symbol:'MACRO',
 ko:{title:'ARK Brett Winton — Open weight models이 오히려 frontier AI 랩 채택 가속·enterprise 방어 필수',heroIcon:'🛡️',heroBig:'FRONTIER',heroSub:'Brett Winton: 오픈 가중치 모델이 프런티어 AI 랩 매출을 뺏을 것이라는 통념이 반대·실제로는 open weight로 exploit하는 공격이 enterprise에게 frontier defense 필수화·프런티어 랩 채택 가속',
  cards:[{icon:'🛡️',big:'Defense 필수',mid:'Enterprise 보호',sub:'Frontier 필요'},{icon:'🔄',big:'반대 프레임',mid:'통념 뒤집기',sub:'Open weight → Frontier 가속'},{icon:'🏛️',big:'Frontier 채택',mid:'채택 가속',sub:'프런티어 AI 랩 수혜'}],
  quoteLabel:'BRETT WINTON · ARK INVEST',quoteKo:'"Open weight models로 exploit 시도가 오히려 enterprise가 frontier AI 랩에 의존하게 만들어 채택 가속"',quoteEn:'"Open weight models being used to exploit enterprises will force companies to rely on frontier AI labs, accelerating adoption"',
  source:'출처: Brett Winton · ARK Invest · 2026.08.09',
  noteHead:'왜 중요한가: 8/4 AMZN OpenAI $50B·8/5 Anthropic $50B·오늘 Winton 프레임 = 프런티어 AI 랩 (OpenAI·Anthropic·xAI) 매출 지속 논거',noteSub:'앞으로 볼 것: 실 open weight exploit 사례·enterprise frontier 채택률·OpenAI IPO',footer:'Winton · Frontier 채택 가속',brand:BK},
 en:{title:'ARK Brett Winton — Open Weight Models Accelerate Frontier AI Lab Adoption · Enterprise Defense Required',heroIcon:'🛡️',heroBig:'FRONTIER',heroSub:'Brett Winton: Contrary to belief that open weight models will steal frontier AI lab revenue, they actually accelerate frontier adoption · open-weight exploits force enterprises to rely on frontier defense · frontier AI labs benefit',
  cards:[{icon:'🛡️',big:'Defense required',mid:'Enterprise protection',sub:'Frontier needed'},{icon:'🔄',big:'Reverse frame',mid:'Overturns conventional',sub:'Open weight → Frontier accel'},{icon:'🏛️',big:'Frontier adoption',mid:'Accelerated',sub:'Frontier AI labs benefit'}],
  quoteLabel:'BRETT WINTON · ARK INVEST',quoteKo:'"Open weight exploit이 frontier 채택 가속"',quoteEn:'"Open weight models being used to exploit enterprises will force companies to rely on frontier AI labs, accelerating adoption"',
  source:'Source: Brett Winton · ARK Invest · 2026.08.09',
  noteHead:'Why: 8/4 AMZN OpenAI $50B · 8/5 Anthropic $50B · today Winton frame = revenue continuity argument for frontier AI labs (OpenAI/Anthropic/xAI)',noteSub:'Watch: Real open weight exploit cases · enterprise frontier adoption rate · OpenAI IPO',footer:'Winton · Frontier Accel',brand:BE}},

// 6. Peter Thiel SPCX mission
{file:'peter-thiel-spcx-mission-mars-only-place',symbol:'SPCX',
 ko:{title:'SPCX — Peter Thiel 투자 이유 "mission-oriented·화성 갈 유일 곳"',heroIcon:'🎯',heroBig:'MARS',heroSub:'jasonwvn: Peter Thiel이 SpaceX에 투자한 이유 - "extremely mission-oriented·화성 갈 유일 곳"·"우리가 이 문제를 안 풀면 안 됐음"·mega-investor Thiel의 SPCX 강세 이유 프레임화',
  cards:[{icon:'🎯',big:'Mission-oriented',mid:'Thiel 투자 이유',sub:'다른 회사 없음'},{icon:'🚀',big:'화성 갈 유일 곳',mid:'Thiel 프레임',sub:'SPCX만이 가능'},{icon:'🏛️',big:'Mega-investor',mid:'Peter Thiel',sub:'PayPal 공동창립·Palantir'}],
  quoteLabel:'PETER THIEL · JASONWVN',quoteKo:'"There\'s a strong counterfactual sense of mission·SpaceX는 화성 갈 유일 곳"',quoteEn:'"There\'s a strong counterfactual sense of mission · SpaceX: this is the only place where we\'re going to go to Mars"',
  source:'출처: jasonwvn · Peter Thiel · 2026.08.09',
  noteHead:'왜 중요한가: 8/7 Ackman·8/8 JPM $180·Gerber·오늘 Thiel = 대형 investor 프레임 다각 확대',noteSub:'앞으로 볼 것: Thiel 실 지분 규모·Founders Fund 포지션·다른 대형 매니저 참여',footer:'SPCX · Thiel · Mission',brand:BK},
 en:{title:'SPCX — Peter Thiel Investment Reason "Mission-Oriented · Only Place We Go to Mars"',heroIcon:'🎯',heroBig:'MARS',heroSub:'jasonwvn: Peter Thiel invested in SpaceX because it\'s "extremely mission-oriented · only place we go to Mars" · "we\'d have to do this problem" · frames mega-investor Thiel\'s SPCX bull view',
  cards:[{icon:'🎯',big:'Mission-oriented',mid:'Thiel invest reason',sub:'No other company'},{icon:'🚀',big:'Only place for Mars',mid:'Thiel frame',sub:'Only SPCX capable'},{icon:'🏛️',big:'Mega-investor',mid:'Peter Thiel',sub:'PayPal co-founder·Palantir'}],
  quoteLabel:'PETER THIEL · JASONWVN',quoteKo:'"화성 갈 유일 곳"',quoteEn:'"There\'s a strong counterfactual sense of mission · SpaceX: this is the only place where we\'re going to go to Mars"',
  source:'Source: jasonwvn · Peter Thiel · 2026.08.09',
  noteHead:'Why: 8/7 Ackman · 8/8 JPM $180/Gerber · today Thiel = large investor frame multi-axis expansion',noteSub:'Watch: Thiel actual stake · Founders Fund position · other large manager participation',footer:'SPCX · Thiel · Mission',brand:BE}},

// 7. Musk AI speed exponential
{file:'musk-ai-speed-silicon-valley-exponential',symbol:'SPCX',
 ko:{title:'Musk — "AI 발전 속도가 실리콘 밸리 상상 초월·기하급수적" 프레임',heroIcon:'⚡',heroBig:'EXP',heroSub:'Elonpsyc (Musk 인용): "대부분 사람이 AI 발전 속도를 이해 못 함·거의 모든 사람 상상보다 빨라·실리콘 밸리 내부도·외부는 더 심함·people really don\'t have a clue"',
  cards:[{icon:'⚡',big:'상상 초월',mid:'AI 발전 속도',sub:'실리콘 밸리도 못 알아'},{icon:'📈',big:'기하급수',mid:'exponential 성장',sub:'선형 프레임 아님'},{icon:'⚠️',big:'People don\'t have a clue',mid:'대중 인식 부족',sub:'격차 확대'}],
  quoteLabel:'ELON MUSK · ELONPSYC',quoteKo:'"AI 발전 속도가 실리콘 밸리·외부 상상 초월·people really don\'t have a clue"',quoteEn:'"Machine intelligence is advancing much faster than almost anyone realizes · people really don\'t have a clue"',
  source:'출처: Elonpsyc · Elon Musk · 2026.08.09',
  noteHead:'왜 중요한가: 8/8 Musk AI 10-20% 종말 유지·오늘 AI 속도 상향 인정 = AI 리스크와 확장 지속 프레임',noteSub:'앞으로 볼 것: AI 안전 규제·Musk xAI 후속 발표·AGI 도래 시점',footer:'Musk AI · exponential · clue',brand:BK},
 en:{title:'Musk — "AI Advancing Faster Than Silicon Valley Realizes · Exponential Growth"',heroIcon:'⚡',heroBig:'EXP',heroSub:'Elonpsyc (per Musk): "Most people don\'t understand how quickly machine intelligence is advancing · much faster than almost anyone realizes · even within Silicon Valley · outside more so · people really don\'t have a clue"',
  cards:[{icon:'⚡',big:'Beyond expectation',mid:'AI advancement speed',sub:'Silicon Valley doesn\'t know'},{icon:'📈',big:'Exponential',mid:'Not linear growth',sub:'Extreme frame'},{icon:'⚠️',big:'People clueless',mid:'Public awareness gap',sub:'Gap expands'}],
  quoteLabel:'ELON MUSK · ELONPSYC',quoteKo:'"AI 상상 초월·people clueless"',quoteEn:'"Machine intelligence is advancing much faster than almost anyone realizes · people really don\'t have a clue"',
  source:'Source: Elonpsyc · Elon Musk · 2026.08.09',
  noteHead:'Why: 8/8 Musk AI 10-20% ends humanity maintained · today AI speed upgrade acknowledgment = AI risk + expansion continuity frame',noteSub:'Watch: AI safety regulation · Musk xAI follow-up · AGI arrival timing',footer:'Musk AI · Exponential · Clue',brand:BE}},

// 8. Aaron Barrett SPCX $1T 2030 real revenue
{file:'aaron-barrett-spcx-1t-real-annual-arr-300b',symbol:'SPCX',
 ko:{title:'SPCX — Aaron Barrett "$1T revenue 2030 = 실 매출(annual)·ARR 2029-2030 ~$300B+ 예상"',heroIcon:'💵',heroBig:'$1 T ANNUAL',heroSub:'Aaron Barrett + Musk 재확인: SPCX 내부 $1T 매출 목표는 cumulative 아닌 annual (2030 그 해 실 매출)·Musk가 명시적 재확인·이론적으로 ARR 2029/2030에 ~$300B+ 예상',
  cards:[{icon:'💵',big:'$1 T ANNUAL',mid:'2030 실 매출',sub:'cumulative 아님'},{icon:'📊',big:'$300 B+ ARR',mid:'2029-2030 예상',sub:'Aaron Barrett 계산'},{icon:'🔎',big:'Musk 명시',mid:'annual revenue 확인',sub:'혼동 해소'}],
  quoteLabel:'ELON MUSK · AARON BARRETT',quoteKo:'"Actual revenue in 2030 itself, not cumulative·ARR 2029/2030에 $300B+ 예상"',quoteEn:'"Actual revenue in year 2030 itself, not cumulative · ARR in 2029/2030 estimated ~$300B+ range"',
  source:'출처: Aaron Barrett·Elon Musk·2026.08.09',
  noteHead:'왜 중요한가: 8/7 $1T 2030 pull-forward·8/8 $100B ARR·오늘 $1T annual + $300B ARR 확인 = 매출 프레임 크기 재확인',noteSub:'앞으로 볼 것: 매출 성장률·$300B ARR 2029/2030 도달·다음 실적',footer:'SPCX $1T annual · $300B ARR',brand:BK},
 en:{title:'SPCX — Aaron Barrett "$1T Revenue 2030 = Actual Annual · ARR 2029-2030 ~$300B+ Expected"',heroIcon:'💵',heroBig:'$1 T ANNUAL',heroSub:'Aaron Barrett + Musk reconfirmation: SPCX internal $1T revenue target is annual (2030 actual revenue in that year), not cumulative · Musk explicit confirmation · theoretically ARR 2029/2030 estimated ~$300B+',
  cards:[{icon:'💵',big:'$1 T ANNUAL',mid:'2030 actual revenue',sub:'Not cumulative'},{icon:'📊',big:'$300 B+ ARR',mid:'2029-2030 estimate',sub:'Aaron Barrett calc'},{icon:'🔎',big:'Musk explicit',mid:'Annual revenue confirm',sub:'Confusion resolved'}],
  quoteLabel:'ELON MUSK · AARON BARRETT',quoteKo:'"2030 실 매출·ARR $300B+"',quoteEn:'"Actual revenue in year 2030 itself, not cumulative · ARR in 2029/2030 estimated ~$300B+ range"',
  source:'Source: Aaron Barrett · Elon Musk · 2026.08.09',
  noteHead:'Why: 8/7 $1T 2030 pull-forward · 8/8 $100B ARR · today $1T annual + $300B ARR confirmation = revenue frame size reconfirmation',noteSub:'Watch: Revenue growth · $300B ARR 2029/2030 arrival · next earnings',footer:'SPCX $1T Annual · $300B ARR',brand:BE}},

// 9. Shotwell All-In Summit 2026
{file:'shotwell-all-in-summit-2026-jensen-nadella',symbol:'SPCX',
 ko:{title:'SPCX — Shotwell All-In Summit 2026(9/13-15) 참석·Jensen·Nadella·Isaacman 스택',heroIcon:'🎤',heroBig:'ALL-IN 2026',heroSub:'Muskonomy: SPCX President & COO Gwynne Shotwell이 All-In Summit 2026(9월 13-15) 참석·Nvidia CEO Jensen Huang·MSFT CEO Satya Nadella·NASA Admin Jared Isaacman 등 스택된 라인업·mega 이벤트',
  cards:[{icon:'🎤',big:'All-In 2026',mid:'9/13-15',sub:'대형 컨퍼런스'},{icon:'👥',big:'Shotwell + Jensen',mid:'+ Nadella + Isaacman',sub:'stacked lineup'},{icon:'🚀',big:'SPCX 노출',mid:'주요 investor 관심',sub:'Musk 회사 프레임'}],
  quoteLabel:'MUSKONOMY',quoteKo:'"Shotwell All-In Summit 2026(9/13-15)·Jensen·Nadella·Isaacman 스택된 라인업"',quoteEn:'"Shotwell speaks All-In Summit 2026 (Sep 13-15) · Jensen · Nadella · Isaacman stacked lineup"',
  source:'출처: Muskonomy · 2026.08.09',
  noteHead:'왜 중요한가: SPCX·NVDA·MSFT·NASA CEO/리더 동시 참석 = AI·우주 축의 mega 이벤트·investor 노출 극대',noteSub:'앞으로 볼 것: 9월 컨퍼런스 발언·구체 발표·NVDA-SPCX 후속 파트너십',footer:'SPCX Shotwell · All-In 9월',brand:BK},
 en:{title:'SPCX — Shotwell at All-In Summit 2026 (Sep 13-15) · Jensen · Nadella · Isaacman Stacked Lineup',heroIcon:'🎤',heroBig:'ALL-IN 2026',heroSub:'Muskonomy: SPCX President & COO Gwynne Shotwell speaks at All-In Summit 2026 (Sep 13-15) · Nvidia CEO Jensen Huang · MSFT CEO Satya Nadella · NASA Admin Jared Isaacman stacked lineup · mega event',
  cards:[{icon:'🎤',big:'All-In 2026',mid:'Sep 13-15',sub:'Major conference'},{icon:'👥',big:'Shotwell + Jensen',mid:'+ Nadella + Isaacman',sub:'Stacked lineup'},{icon:'🚀',big:'SPCX exposure',mid:'Major investor interest',sub:'Musk company frame'}],
  quoteLabel:'MUSKONOMY',quoteKo:'"Shotwell All-In 2026·stacked lineup"',quoteEn:'"Shotwell speaks All-In Summit 2026 (Sep 13-15) · Jensen · Nadella · Isaacman stacked lineup"',
  source:'Source: Muskonomy · 2026.08.09',
  noteHead:'Why: SPCX/NVDA/MSFT/NASA CEO·leaders simultaneous participation = mega AI/space event · maximizes investor exposure',noteSub:'Watch: September conference statements · specific announcements · NVDA-SPCX follow-up partnerships',footer:'SPCX Shotwell · All-In Sep',brand:BE}},

// 10. Buffett BRK $357B cash deploy · GOOGL $10B
{file:'buffett-brk-357b-cash-googl-10b-net-buyer',symbol:'BRK',
 ko:{title:'BRK — Buffett $357.4B 현금 배치 시작·Q2 $19.8B 순매수·GOOGL $10B 투자·14분기 만에 강세 전환',heroIcon:'💰',heroBig:'$357 B',heroSub:'Kobeissi Letter: Berkshire Hathaway가 14분기 만에 $357.4B 현금 배치 시작·Q2 $19.8B 순매수·GOOGL $10B 투자·Taylor Morrison Home $6.8B 인수·매도 → 매수 프레임 전환',
  cards:[{icon:'💰',big:'$357.4 B',mid:'현금 pile 배치',sub:'14분기 만'},{icon:'📈',big:'$19.8 B',mid:'Q2 순매수',sub:'매도 → 매수 전환'},{icon:'🔍',big:'$10 B GOOGL',mid:'Buffett 신 투자',sub:'+Taylor Morrison $6.8B'}],
  quoteLabel:'KOBEISSI LETTER · BERKSHIRE',quoteKo:'"Berkshire가 $357.4B 현금 배치 시작·Q2 $19.8B 순매수·GOOGL $10B 투자·14분기 만에 강세"',quoteEn:'"Berkshire began deploying $357.4B cash pile · Q2 net buyer $19.8B · $10B GOOGL investment · bullish after 14 quarters"',
  source:'출처: Kobeissi Letter · Berkshire · 2026.08.09',
  noteHead:'왜 중요한가: 7/27 BRK 현금 $317B ATH·오늘 배치 시작 = 매크로 강세 시그널·GOOGL $10B가 mega 신규 포지션',noteSub:'앞으로 볼 것: 후속 매수 종목·현금 잔량 배치·다른 mega investor 반응',footer:'BRK $357B 배치 · GOOGL $10B',brand:BK},
 en:{title:'BRK — Buffett Begins Deploying $357.4B Cash · Q2 $19.8B Net Buyer · GOOGL $10B Investment · Bullish After 14 Quarters',heroIcon:'💰',heroBig:'$357 B',heroSub:'Kobeissi Letter: Berkshire Hathaway begins deploying $357.4B cash pile after 14 quarters · Q2 net buyer $19.8B · $10B GOOGL investment · Taylor Morrison Home $6.8B acquisition · sell → buy frame shift',
  cards:[{icon:'💰',big:'$357.4 B',mid:'Cash pile deploy',sub:'After 14 quarters'},{icon:'📈',big:'$19.8 B',mid:'Q2 net buyer',sub:'Sell → buy shift'},{icon:'🔍',big:'$10 B GOOGL',mid:'Buffett new invest',sub:'+Taylor Morrison $6.8B'}],
  quoteLabel:'KOBEISSI LETTER · BERKSHIRE',quoteKo:'"BRK $357B 배치·GOOGL $10B"',quoteEn:'"Berkshire began deploying $357.4B cash pile · Q2 net buyer $19.8B · $10B GOOGL investment · bullish after 14 quarters"',
  source:'Source: Kobeissi Letter · Berkshire · 2026.08.09',
  noteHead:'Why: 7/27 BRK cash $317B ATH · today deployment starts = macro bull signal · GOOGL $10B is mega new position',noteSub:'Watch: Follow-up buy stocks · remaining cash deployment · other mega investor reaction',footer:'BRK $357B Deploy · GOOGL $10B',brand:BE}},

// 11. Starlink Mobile hybrid EchoStar
{file:'starlink-mobile-hybrid-echostar-19b-spectrum',symbol:'SPCX',
 ko:{title:'SPCX — Starlink Mobile hybrid network·EchoStar $19.68B spectrum·small stations·dead-zone + populated',heroIcon:'🛰️',heroBig:'HYBRID',heroSub:'Nic Cruz Patane: SPCX Starlink Mobile 전략은 전통 cell tower 없이 위성 + small stations 혼합·EchoStar $19.68B spectrum (지상 rights)·dead zones 위성·populated 지역 small stations·비용 극단 절감·genius 프레임',
  cards:[{icon:'🛰️',big:'Hybrid',mid:'위성 + small stations',sub:'전통 tower 대안'},{icon:'📡',big:'$19.68 B',mid:'EchoStar spectrum',sub:'지상 rights'},{icon:'⚡',big:'Small stations',mid:'populated 지역',sub:'dead zone은 위성'}],
  quoteLabel:'NIC CRUZ PATANE',quoteKo:'"Starlink Mobile은 전통 tower 없이 위성+small stations 혼합·EchoStar $19.68B spectrum·dead zone+populated 통합"',quoteEn:'"Starlink Mobile uses satellites + small stations hybrid without traditional towers · EchoStar $19.68B spectrum · dead zone + populated integrated"',
  source:'출처: Nic Cruz Patane · 2026.08.09',
  noteHead:'왜 중요한가: 8/8 T-Mobile CEO 폄하 반박 근거·small stations로 populated 지역도 커버·전통 통신사 CAPEX 극단 절감',noteSub:'앞으로 볼 것: small stations 실 배치·EchoStar spectrum 활용·populated 지역 서비스 개시',footer:'Starlink Hybrid · EchoStar $19.68B',brand:BK},
 en:{title:'SPCX — Starlink Mobile Hybrid Network · EchoStar $19.68B Spectrum · Small Stations · Dead-Zone + Populated Integration',heroIcon:'🛰️',heroBig:'HYBRID',heroSub:'Nic Cruz Patane: SPCX Starlink Mobile uses satellites + small stations hybrid without traditional cell towers · EchoStar $19.68B spectrum (terrestrial rights) · satellites for dead zones · small stations for populated areas · extreme cost savings · genius frame',
  cards:[{icon:'🛰️',big:'Hybrid',mid:'Satellites + small stations',sub:'Traditional tower alt'},{icon:'📡',big:'$19.68 B',mid:'EchoStar spectrum',sub:'Terrestrial rights'},{icon:'⚡',big:'Small stations',mid:'Populated areas',sub:'Satellites for dead zone'}],
  quoteLabel:'NIC CRUZ PATANE',quoteKo:'"Hybrid network·EchoStar $19.68B"',quoteEn:'"Starlink Mobile uses satellites + small stations hybrid without traditional towers · EchoStar $19.68B spectrum · dead zone + populated integrated"',
  source:'Source: Nic Cruz Patane · 2026.08.09',
  noteHead:'Why: Counter to 8/8 T-Mobile CEO dismissal · small stations cover populated areas too · extreme CAPEX savings vs traditional telecom',noteSub:'Watch: Small stations actual deployment · EchoStar spectrum utilization · populated area service launch',footer:'Starlink Hybrid · EchoStar $19.68B',brand:BE}},

// 12. Starlink V3 +100X · $200B/yr · 100K sat
{file:'starlink-v3-100x-bandwidth-200b-year-100k-sats',symbol:'SPCX',
 ko:{title:'SPCX — Starlink V3 +100X bandwidth·$200B/year 매출 계획·100K 위성 배치 (Musk)',heroIcon:'📶',heroBig:'+100 X',heroSub:'Musk·Sawyer Merritt: Starlink V3 위성이 V2 대비 order of magnitude 더 capable·+100X bandwidth·궁극적으로 +200X·V3+beyond direct-to-cell 위성 대량 배치·매출 $200B/year 초과·100K 위성 계획',
  cards:[{icon:'📶',big:'+100 X',mid:'V3 bandwidth',sub:'V2 대비 100배'},{icon:'💰',big:'$200 B/yr',mid:'매출 계획',sub:'V3 완성 시'},{icon:'🛰️',big:'100 K',mid:'V3 위성 배치 계획',sub:'V2 10K에서 확장'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"V3 위성 +100X bandwidth·궁극 200X·direct-to-cell·연 매출 $200B 초과"',quoteEn:'"V3 satellites +100X bandwidth · ultimately 200X · direct-to-cell · revenue exceeds $200B/year"',
  source:'출처: Elon Musk·Sawyer Merritt·2026.08.09',
  noteHead:'왜 중요한가: 8/7 락업·8/8 락업 unlock에도 매출 프레임 지속·V3가 $200B/yr 실 매출 축·Starlink 만 $1T/yr (오늘 별개)의 근거',noteSub:'앞으로 볼 것: V3 첫 궤도 배치·직접-to-cell 상용·100K 배치 timeline',footer:'Starlink V3 · +100X · $200B/yr',brand:BK},
 en:{title:'SPCX — Starlink V3 +100X Bandwidth · $200B/Year Revenue Plan · 100K Satellites Deployment (Musk)',heroIcon:'📶',heroBig:'+100 X',heroSub:'Musk · Sawyer Merritt: Starlink V3 satellites order of magnitude more capable than V2 · +100X bandwidth · ultimately +200X · V3+beyond direct-to-cell mass deployment · revenue exceeds $200B/year · 100K satellite plan',
  cards:[{icon:'📶',big:'+100 X',mid:'V3 bandwidth',sub:'vs V2'},{icon:'💰',big:'$200 B/yr',mid:'Revenue plan',sub:'V3 completion'},{icon:'🛰️',big:'100 K',mid:'V3 satellite deployment',sub:'From V2 10K'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"V3 +100X·$200B/yr"',quoteEn:'"V3 satellites +100X bandwidth · ultimately 200X · direct-to-cell · revenue exceeds $200B/year"',
  source:'Source: Elon Musk · Sawyer Merritt · 2026.08.09',
  noteHead:'Why: Revenue frame continues despite 8/7 lockup / 8/8 unlock · V3 becomes real $200B/yr revenue axis · basis for today\'s Starlink alone $1T/yr',noteSub:'Watch: V3 first orbit deployment · direct-to-cell commercial · 100K deployment timeline',footer:'Starlink V3 · +100X · $200B/yr',brand:BE}},

// 13. Wood V2→V3 20X→50X ASTONISHING
{file:'wood-v2-v3-20-to-50x-astonishing',symbol:'SPCX',
 ko:{title:'SPCX — 캐시 우드 "V2→V3 20X 예상했는데 50X·astonishing" 놀람 표현',heroIcon:'🎯',heroBig:'50 X',heroSub:'Cathie Wood: "우리는 Starlink V2→V3 bandwidth 확장을 20배로 예상했는데 이제 50배·astonishing"·Wood ARK의 기존 예상 상향·SPCX 매출 프레임 upgrade',
  cards:[{icon:'🎯',big:'50 X',mid:'V2→V3 실 확장',sub:'ARK 예상 20X 상향'},{icon:'📊',big:'ASTONISHING',mid:'Wood 놀람 표현',sub:'예상 초과'},{icon:'📈',big:'upgrade',mid:'ARK 프레임',sub:'매출 상향 논거'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST',quoteKo:'"우리는 V2→V3 bandwidth 20X 예상했는데 50X·ASTONISHING"',quoteEn:'"We thought the increase in satellite bandwidth from V2 to V3 was 20X. NOW 50X. ASTONISHING."',
  source:'출처: Cathie Wood · ARK Invest · 2026.08.09',
  noteHead:'왜 중요한가: 8/8 Wood Robotaxi 마진 80-90%·오늘 V3 50X = Wood 프레임 다각 상향·SPCX·TSLA 밸류 재평가',noteSub:'앞으로 볼 것: ARK Invest 목표가 상향·다른 애널 반응',footer:'Wood · V3 50X · astonishing',brand:BK},
 en:{title:'SPCX — Cathie Wood "V2→V3 20X Expected but 50X · ASTONISHING" Surprise Expression',heroIcon:'🎯',heroBig:'50 X',heroSub:'Cathie Wood: "We thought Starlink V2→V3 bandwidth increase was 20X · now 50X · astonishing" · Wood ARK\'s prior estimate raised · SPCX revenue frame upgrade',
  cards:[{icon:'🎯',big:'50 X',mid:'V2→V3 real expansion',sub:'ARK expected 20X raised'},{icon:'📊',big:'ASTONISHING',mid:'Wood surprise',sub:'Beyond expectation'},{icon:'📈',big:'Upgrade',mid:'ARK frame',sub:'Revenue upgrade argument'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST',quoteKo:'"V3 20X→50X ASTONISHING"',quoteEn:'"We thought the increase in satellite bandwidth from V2 to V3 was 20X. NOW 50X. ASTONISHING."',
  source:'Source: Cathie Wood · ARK Invest · 2026.08.09',
  noteHead:'Why: 8/8 Wood Robotaxi margin 80-90% · today V3 50X = Wood frame multi-axis upgrade · SPCX/TSLA valuation re-rating',noteSub:'Watch: ARK Invest price target raises · other analyst reaction',footer:'Wood · V3 50X · Astonishing',brand:BE}},

// 14. GOOGL Shay Boloor $1.3B daily profit
{file:'googl-shay-boloor-13b-daily-profit-2026',symbol:'GOOGL',
 ko:{title:'GOOGL — Shay Boloor "Google 2026년 하루 $1.3B profit 생성 가능·강세 프레임"',heroIcon:'💵',heroBig:'$1.3 B/day',heroSub:'Shay Boloor: Google이 2026년 exit 시 하루 near $1.3B profit 생성 예상·연 ~$470B profit 페이스·8/6 시가총액 AAPL 초과 #2·8/7 $25B 채권·8/8 13-F SPCX $100M 결합',
  cards:[{icon:'💵',big:'$1.3 B/day',mid:'Google 예상 profit',sub:'2026 exit'},{icon:'📈',big:'~$470 B/yr',mid:'연 profit 페이스',sub:'세계 최대 mega-cap'},{icon:'🚀',big:'Multi-axis',mid:'Search·Cloud·YT·AI',sub:'다각 성장'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Google이 2026 exit 시 하루 near $1.3B profit 생성 가능"',quoteEn:'"Google could exit 2026 generating nearly $1.3B in profit every single day"',
  source:'출처: Shay Boloor · 2026.08.09',
  noteHead:'왜 중요한가: 8/6 GOOGL AAPL 초과 #2·8/7 $25B 채권·8/8 13-F SPCX $100M + AI 다각·오늘 BRK $10B 신 투자와 결합·GOOGL mega 강세',noteSub:'앞으로 볼 것: Google Q3 실적·profit 페이스·다음 실적',footer:'GOOGL · $1.3B/day · $470B/yr',brand:BK},
 en:{title:'GOOGL — Shay Boloor "Google Could Exit 2026 Generating $1.3B Profit Every Day · Bullish Frame"',heroIcon:'💵',heroBig:'$1.3 B/day',heroSub:'Shay Boloor: Google could exit 2026 generating near $1.3B profit every single day · annual ~$470B profit pace · 8/6 market cap AAPL surpass #2 · 8/7 $25B bond · 8/8 13-F SPCX $100M combined',
  cards:[{icon:'💵',big:'$1.3 B/day',mid:'Google expected profit',sub:'2026 exit'},{icon:'📈',big:'~$470 B/yr',mid:'Annual profit pace',sub:'World largest mega-cap'},{icon:'🚀',big:'Multi-axis',mid:'Search·Cloud·YT·AI',sub:'Multi-axis growth'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Google 2026 하루 $1.3B profit"',quoteEn:'"Google could exit 2026 generating nearly $1.3B in profit every single day"',
  source:'Source: Shay Boloor · 2026.08.09',
  noteHead:'Why: 8/6 GOOGL AAPL surpass #2 · 8/7 $25B bond · 8/8 13-F SPCX $100M + AI multi-axis · today BRK $10B new investment · GOOGL mega bull',noteSub:'Watch: Google Q3 earnings · profit pace · next earnings',footer:'GOOGL · $1.3B/day · $470B/yr',brand:BE}},

// 15. SPCX lockup detailed schedule Aug 21·Sep 25
{file:'spcx-lockup-schedule-aug21-sep25-oct-nov-dec',symbol:'SPCX',
 ko:{title:'SPCX — 락업 세부 일정 (Aug 21·Sep 25·Oct 8·Nov·Dec·Elon June 2027 46%·Sep 2027 +40%)',heroIcon:'📅',heroBig:'8/21',heroSub:'Evan D + Widget The Kid 정리: SPCX 락업 세부 일정 - 8/8 첫 5% + 8/21 5% + 9/25 5% + 10/8 5% + 11/8 5% + 12/8 5% = 12월까지 25%·Elon/Founder eligible 6월 2027 46%·9월 2027 +40% 확장',
  cards:[{icon:'📅',big:'12월까지 25 %',mid:'월별 5% unlock',sub:'8/21·9/25·10/8·11·12'},{icon:'👤',big:'Elon June 2027',mid:'46% eligible',sub:'Founder unlock'},{icon:'📈',big:'+40 % Sep 2027',mid:'최종 float 확장',sub:'전체 unlock 완료'}],
  quoteLabel:'EVAN D · WIDGET THE KID',quoteKo:'"8/21 5%·9/25 5%·10-12월 각 5%·6월 2027 Elon 46%·9월 2027 +40%"',quoteEn:'"Aug 21 5% · Sep 25 5% · Oct-Dec each 5% · Jun 2027 Elon 46% · Sep 2027 +40%"',
  source:'출처: Evan D · Widget The Kid · 2026.08.09',
  noteHead:'왜 중요한가: 8/8 첫 unlock 후 후속 계획·rolling releases·투자자 흡수 시험·6월 2027 Elon이 최대 이벤트',noteSub:'앞으로 볼 것: 각 unlock 시점 시세 반응·거래량·기관 flow',footer:'SPCX 락업 · 8/21·9/25 등',brand:BK},
 en:{title:'SPCX — Lockup Detailed Schedule (Aug 21 · Sep 25 · Oct 8 · Nov · Dec · Elon June 2027 46% · Sep 2027 +40%)',heroIcon:'📅',heroBig:'8/21',heroSub:'Evan D + Widget The Kid: SPCX lockup detailed schedule - Aug 8 first 5% + Aug 21 5% + Sep 25 5% + Oct 8 5% + Nov 8 5% + Dec 8 5% = 25% by December · Elon/Founder eligible Jun 2027 46% · Sep 2027 +40% expansion',
  cards:[{icon:'📅',big:'25 % by Dec',mid:'Monthly 5% unlock',sub:'Aug 21·Sep 25·Oct·Nov·Dec'},{icon:'👤',big:'Elon June 2027',mid:'46% eligible',sub:'Founder unlock'},{icon:'📈',big:'+40 % Sep 2027',mid:'Final float expansion',sub:'Full unlock complete'}],
  quoteLabel:'EVAN D · WIDGET THE KID',quoteKo:'"8/21·9/25·10-12월 각 5%·6월 2027·9월 2027"',quoteEn:'"Aug 21 5% · Sep 25 5% · Oct-Dec each 5% · Jun 2027 Elon 46% · Sep 2027 +40%"',
  source:'Source: Evan D · Widget The Kid · 2026.08.09',
  noteHead:'Why: Follow-up schedule after 8/8 first unlock · rolling releases · investor absorption test · Jun 2027 Elon is biggest event',noteSub:'Watch: Each unlock price reaction · volume · institutional flow',footer:'SPCX Lockup · Aug 21 · Sep 25 etc',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260810.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260810-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
