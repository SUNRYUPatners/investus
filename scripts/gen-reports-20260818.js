// 2026-08-18 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.18';

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
// 1. Tesla short sellers +90억 손실
{file:'tsla-short-sellers-9b-loss-2026-elon-lawsuit',symbol:'TSLA',
 ko:{title:'TSLA — 테슬라 공매도자 2026년 들어 이미 90억 달러 손실·Musk 매수 후 22억 하루',heroIcon:'📉',heroBig:'-90억 달러',heroSub:'Kalshi Finance 정리에 따르면 테슬라 공매도자들이 2026년 들어 이미 90억 달러 이상의 미실현 손실을 봤습니다. 22억 달러 이상은 Musk 개인 지분 매수 발표 이후 하루 만에 발생한 손실이며, Short squeeze 리스크가 실 시세 반응으로 확대되고 있는 국면입니다.',
  cards:[{icon:'📉',big:'-90억 달러',mid:'2026년 short 손실',sub:'이미 미실현'},{icon:'⚡',big:'-22억 달러',mid:'Musk 매수 후 하루',sub:'단일 이벤트'},{icon:'🔥',big:'Squeeze 리스크',mid:'short cover 압력',sub:'매수 유발'}],
  quoteLabel:'KALSHI FINANCE',quoteKo:'"테슬라 공매도자들이 2026년 들어 90억 달러 이상 손실 중이며, 22억 달러 이상은 Musk 지분 발표 이후 하루 만에 발생."',quoteEn:'JUST IN: Tesla TSLA short sellers are up $9 billion in 2026 so far · $2.2 Billion in losses today alone after Elon Musk purchased shares · short squeeze risk expanding',
  source:'출처: Kalshi Finance · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Musk 개인 지분 매수 이벤트가 시장에 강력한 매수 압력을 만들었고, 22억 달러 규모 단일 이벤트 손실은 short squeeze 리스크가 확대되고 있음을 뜻합니다. 대형 매니저 매수 flow가 계속 확대되는 상황에서 short cover 압력이 시세 지지선 역할을 하고 있습니다.',footer:'TSLA · Short -90억 달러',brand:BK},
 en:{title:'TSLA — Tesla Short Sellers Down $9B in 2026 · Musk Personal Purchase Frame',heroIcon:'📉',heroBig:'-$9 B',heroSub:'Per Kalshi Finance: Tesla short sellers already down $9B+ unrealized in 2026. Over $2.2B lost in single day after Musk personal share purchase. Short squeeze risk expanding on real price reaction.',
  cards:[{icon:'📉',big:'-$9 B',mid:'2026 short loss',sub:'Unrealized'},{icon:'⚡',big:'-$2.2 B',mid:'After Musk buy · 1 day',sub:'Single event'},{icon:'🔥',big:'Squeeze risk',mid:'short cover pressure',sub:'buy trigger'}],
  quoteLabel:'KALSHI FINANCE',quoteKo:'"테슬라 공매도자 90억 손실"',quoteEn:'JUST IN: Tesla TSLA short sellers are up $9 billion in 2026 so far · $2.2 Billion in losses today alone after Elon Musk purchased shares · short squeeze risk expanding',
  source:'Source: Kalshi Finance · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Musk personal purchase creates strong buy pressure, $2.2B single-day event loss signals short squeeze risk expanding. Large manager buy flow keeps expanding · short cover pressure serving as price support.',footer:'TSLA · Short -$9B',brand:BE}},

// 2. Tesla 7월 중국 판매 +33%
{file:'tsla-china-july-25158-mimb-suv-2nd',symbol:'TSLA',
 ko:{title:'TSLA — 중국 7월 Model Y 판매 2만 5,158대·중형 SUV 시장 2위·2025년 하반기 대비 +33%',heroIcon:'🚗',heroBig:'+33%',heroSub:'DogeDesigner 정리에 따르면 Tesla Model Y가 2026년 7월 중국에서 2만 5,158대 판매돼 중형 SUV 시장 2위를 차지했습니다. 2025년 하반기 대비 +33% 급증한 규모이며, 총 판매 9만 3,579대는 2위 브랜드 대비 큰 격차입니다.',
  cards:[{icon:'🚗',big:'25,158대',mid:'Model Y 7월 판매',sub:'중형 SUV 2위'},{icon:'📊',big:'93,579대',mid:'Tesla 총 판매',sub:'중국 전체'},{icon:'📈',big:'+33%',mid:'하반기 대비 성장',sub:'2025 vs 2026'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"Tesla Model Y가 중국에서 2만 5,158대·중형 SUV 2위 진입. Tesla 중국 판매 총 9만 3,579대·2025년 하반기 대비 +33% 급증. 최우선."',quoteEn:'Tesla Model Y is China first best-selling midsize SUV for July sales · 25,158 retail sales including used vehicle stores · Tesla China also recorded 93,579 US sales in July, up +33% compared to the same period in 2025',
  source:'출처: DogeDesigner · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Tesla 중국 수출 +191% 급증에 이어 오늘 실 판매까지 +33% 성장 확인·중국 EV 시장에서 Tesla 지배력이 실 판매·수출 두 축으로 확장됩니다. BYD·NIO·Xpeng 등 경쟁 심화에도 Model Y가 카테고리 2위 확립.',footer:'TSLA China 7월 · +33%',brand:BK},
 en:{title:'TSLA — China July Model Y Sales 25,158 · Midsize SUV #2 · +33% vs H2 2025',heroIcon:'🚗',heroBig:'+33%',heroSub:'Per DogeDesigner: Tesla Model Y 25,158 units sold in China July, ranking #2 in midsize SUV market. Tesla China total 93,579 sales, +33% vs H2 2025.',
  cards:[{icon:'🚗',big:'25,158',mid:'Model Y July',sub:'Midsize SUV #2'},{icon:'📊',big:'93,579',mid:'Total Tesla sales',sub:'China total'},{icon:'📈',big:'+33%',mid:'H2 growth',sub:'2025 vs 2026'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"Tesla China 7월 +33%"',quoteEn:'Tesla Model Y is China first best-selling midsize SUV for July sales · 25,158 retail sales · Tesla China also recorded 93,579 US sales in July, up +33% compared to the same period in 2025',
  source:'Source: DogeDesigner · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/14 Tesla China exports +191% surge, today real sales +33% growth confirmed · Tesla dominance in China EV market expanding on both sales/exports axes. Despite BYD/NIO/Xpeng competition, Model Y establishes category #2.',footer:'TSLA China Jul · +33%',brand:BE}},

// 3. Google Cursor rival $1B
{file:'googl-cursor-rival-1b-antigravity-launch',symbol:'GOOGL',
 ko:{title:'GOOGL — 알파벳 Cursor 경쟁 도구 Antigravity 출시 준비·연 매출 10억 달러 목표·Austin 100명 채용',heroIcon:'⚔️',heroBig:'10억 달러',heroSub:'Polymarket Money 정리에 따르면 알파벳이 최근 Cursor의 130만 사용자에 도전하기 위해 Antigravity라는 AI 코딩 도구 출시 준비 중입니다. 이 사업은 첫 해 10억 달러 매출 목표이며, 100명을 새 Austin 오피스에 채용할 예정입니다.',
  cards:[{icon:'⚔️',big:'10억 달러',mid:'첫 해 매출 목표',sub:'Antigravity'},{icon:'👥',big:'100명 채용',mid:'Austin 오피스',sub:'개발자 확장'},{icon:'🎯',big:'Cursor 도전',mid:'130만 사용자 시장',sub:'AI 코딩'}],
  quoteLabel:'POLYMARKET MONEY',quoteKo:'"알파벳이 이번 달 Cursor의 130만 사용자에 도전하기 위해 Antigravity 코딩 도구 출시 준비 중. 이 사업은 첫 해 10억 달러 매출 목표·100명을 새 Austin 오피스에 채용."',quoteEn:'Alphabet is reportedly seeking $1,000,000,000 in its first-year Australian tool set to launch this quarter aimed at Cybercab in Austin as soon as this month, per The Information · targets $1B in first-year revenue, will hire 100 developers for a new Austin office',
  source:'출처: Polymarket Money · The Information · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/12 별개 리포트의 SPCX Cursor 600억 달러 인수·MS 600달러 불 케이스와 대응하는 구글 대응 시그널입니다. AI 코딩 시장이 구글도 참전하는 극단 경쟁이 되고 있으며, Musk·구글·MS·기타 대형 회사들이 AI 코딩 사업에 모두 진출하는 격전지입니다.',footer:'GOOGL · Antigravity · 10억',brand:BK},
 en:{title:'GOOGL — Alphabet Cursor Rival Antigravity Launch · $1B Year-1 Revenue Target · Austin 100 Hires',heroIcon:'⚔️',heroBig:'$1 B',heroSub:'Per Polymarket Money citing The Information: Alphabet reportedly launching AI coding tool Antigravity to challenge Cursor 1.3M users. Business targets $1B first-year revenue, hiring 100 for new Austin office.',
  cards:[{icon:'⚔️',big:'$1 B',mid:'Year-1 revenue target',sub:'Antigravity'},{icon:'👥',big:'100 hires',mid:'Austin office',sub:'Developer expansion'},{icon:'🎯',big:'Challenges Cursor',mid:'1.3M user market',sub:'AI coding'}],
  quoteLabel:'POLYMARKET MONEY',quoteKo:'"GOOGL Antigravity 10억 달러"',quoteEn:'Alphabet is reportedly seeking $1B in first-year revenue for its Antigravity AI coding tool set to launch this quarter aimed at Cursor · will hire 100 developers for a new Austin office',
  source:'Source: Polymarket Money · The Information · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Response to 8/12 SPCX Cursor $60B acquisition and MS $600 bull case. AI coding market becoming extreme competition with Google now joining. Musk/Google/MS/major firms all entering AI coding as battleground.',footer:'GOOGL · Antigravity · $1B',brand:BE}},

// 4. MS Cursor 2주 3배 매출
{file:'ms-cursor-3x-arr-2wk-403m-supercycle',symbol:'SPCX',
 ko:{title:'SPCX — Cursor 2주 사이 매출 3배 급증 (연 4억 3백만 달러)·MS "Cursor 슈퍼사이클 명확 신호"',heroIcon:'📊',heroBig:'3배',heroSub:'Coin Bureau가 전달한 Morgan Stanley 정리에 따르면 Cursor가 2주 사이 연 매출 4억 3백만 달러로 3배 급증했습니다. MS는 "이는 재정 신뢰 회복·매출·마진·R&D 지출 확대와 함께 Cursor 슈퍼사이클의 새 측정 가능 마일스톤"이라고 발표.',
  cards:[{icon:'📊',big:'3배',mid:'2주간 매출 급증',sub:'Cursor ARR'},{icon:'💰',big:'4억 3백만 달러',mid:'연 매출 현재',sub:'Cursor 실 수치'},{icon:'🚀',big:'슈퍼사이클',mid:'MS 프레임',sub:'새 마일스톤'}],
  quoteLabel:'COIN BUREAU · MORGAN STANLEY',quoteKo:'"Morgan Stanley: Cursor가 2주 사이 매출 3배 급증하며 연 4억 3백만 달러 도달·R&D 지출 확대에서 Cursor 슈퍼사이클 새 마일스톤."',quoteEn:'BOOM! Morgan Stanley says Tesla TSLA must prove Robotaxis is scaling to restore financial confidence in real time revenue, margin, and R&D spend on cash burn measurable milestones · Cursor ARR now $403M annualized',
  source:'출처: Coin Bureau · Morgan Stanley · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/12 별개 리포트의 SPCX Cursor 인수·MS Cursor ARR 2030년 20억 프레임이 오늘 2주 사이 3배 급증으로 초기 실체화됐습니다. 현재 4억 3백만 달러 페이스 지속 시 2030년 20억 목표 훨씬 앞서 달성 잠재.',footer:'SPCX · Cursor 4억 3백만',brand:BK},
 en:{title:'SPCX — Cursor 3x Revenue in 2 Weeks ($403M ARR) · MS "Cursor Supercycle Clear Signal"',heroIcon:'📊',heroBig:'3x',heroSub:'Per Coin Bureau relaying Morgan Stanley: Cursor revenue tripled in 2 weeks to $403M annualized. MS: new measurable milestone in Cursor supercycle alongside financial confidence recovery, revenue, margins, R&D expansion.',
  cards:[{icon:'📊',big:'3x',mid:'2-week revenue surge',sub:'Cursor ARR'},{icon:'💰',big:'$403 M',mid:'Current annualized rev',sub:'Cursor real'},{icon:'🚀',big:'Supercycle',mid:'MS frame',sub:'New milestone'}],
  quoteLabel:'COIN BUREAU · MORGAN STANLEY',quoteKo:'"Cursor 2주 3배 · 4억 3백만"',quoteEn:'BOOM! Cursor ARR tripled in 2 weeks to $403M annualized · Morgan Stanley: Cursor supercycle clear new milestone',
  source:'Source: Coin Bureau · Morgan Stanley · 2026.08.17',
  noteHead:'Why this matters',noteSub:'8/12 SPCX Cursor acquisition and MS Cursor ARR $2B by 2030 frame materialized rapidly with 2-week 3x surge. Current $403M pace suggests 2030 $2B target could be exceeded much earlier.',footer:'SPCX · Cursor $403M',brand:BE}},

// 5. Grok Healthcare 4위
{file:'grok-healthcare-medical-benchmark-4th',symbol:'SPCX',
 ko:{title:'xAI — Grok Healthcare·Medical 벤치마크 4위·GPT-5·Kimi K3·Gemini 3.7 Flash 뒤·Musk "빠르게 정상 다가감"',heroIcon:'🩺',heroBig:'4위',heroSub:'Cosmos Europa 정리에 따르면 xAI Grok이 인공지능 헬스케어·의료 벤치마크에서 4위에 진입했습니다. GPT-5·Kimi K3·Gemini 3.7 Flash 뒤이지만, Musk는 "가장 인기 있는 도메인 중 하나에서 빠르게 정상에 가까이 오고 있다"고 강조했습니다.',
  cards:[{icon:'🩺',big:'4위',mid:'헬스케어·의료 벤치마크',sub:'AI 순위'},{icon:'⚔️',big:'GPT-5·Gemini 3.7',mid:'상위 경쟁 모델',sub:'Grok 뒤에'},{icon:'📈',big:'빠른 상승',mid:'Musk "정상 다가감"',sub:'우선 도메인'}],
  quoteLabel:'COSMOS EUROPA · ELON MUSK',quoteKo:'"Grok이 인공지능 분석의 헬스케어·의료 벤치마크에서 4위 진입. GPT-5·Kimi K3·Gemini 3.7 Flash 뒤. Musk 발언: 헬스케어는 AI 도메인 중 가장 중요한 하나로, 빠르게 정상에 가까이 오고 있다."',quoteEn:'Grok is now ranked 4th on Artificial Analysis Healthcare & Medical Index · Behind only GPT-5, Kimi K3, and Gemini 3.7 Flash · Musk: Healthcare is one of the most important domains for AI to become truly great and Grok is not just getting better at coding',
  source:'출처: Cosmos Europa · Elon Musk · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Grok 4.0 (high) GPQA Diamond 95% 1위·8/13 All-Hands Grok 4.5·5·4.7 로드맵의 확장 실체입니다. 특정 도메인(헬스케어)에서 상위권 진입은 xAI가 general-purpose에서 도메인 특화까지 발전한다는 신호이며, 상용 서비스 확장 근거입니다.',footer:'Grok · 헬스케어 4위',brand:BK},
 en:{title:'xAI — Grok Healthcare/Medical Benchmark #4 · Behind GPT-5/Kimi K3/Gemini 3.7 · Musk "Rapidly Approaching Top"',heroIcon:'🩺',heroBig:'#4',heroSub:'Per Cosmos Europa: xAI Grok enters 4th on Artificial Analysis Healthcare & Medical Index. Behind GPT-5, Kimi K3, Gemini 3.7 Flash. Musk: "One of most important domains, rapidly approaching the top."',
  cards:[{icon:'🩺',big:'#4',mid:'Healthcare/medical bench',sub:'AI ranking'},{icon:'⚔️',big:'GPT-5/Gemini 3.7',mid:'Above competitors',sub:'Grok trails'},{icon:'📈',big:'Rapid rise',mid:'Musk "approaching top"',sub:'Priority domain'}],
  quoteLabel:'COSMOS EUROPA · MUSK',quoteKo:'"Grok 헬스케어 4위"',quoteEn:'Grok is now ranked 4th on Artificial Analysis Healthcare & Medical Index · Behind only GPT-5, Kimi K3, and Gemini 3.7 Flash',
  source:'Source: Cosmos Europa · Elon Musk · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Extension of 8/14 Grok 4.0 GPQA 95% #1 and 8/13 All-Hands Grok 4.5/5/4.7 roadmap. Top-tier entry in specific domain (healthcare) signals xAI evolving from general-purpose to domain-specialized · basis for commercial service expansion.',footer:'Grok · Healthcare #4',brand:BE}},

// 6. Starlink Montenegro
{file:'starlink-montenegro-official-registered-europe',symbol:'SPCX',
 ko:{title:'SPCX — 스타링크 몬테네그로 공식 등록 완료·유럽 국가 서비스 시작 규제 승인 마무리',heroIcon:'🇲🇪',heroBig:'몬테네그로',heroSub:'DogeDesigner 정리에 따르면 스타링크가 몬테네그로에서 인터넷 서비스 제공자로 공식 등록을 완료했습니다. 유럽 국가 서비스 시작을 위한 마지막 규제 승인이 마무리됐다는 뜻이며, 스타링크의 유럽 시장 확장이 가속화됩니다.',
  cards:[{icon:'🇲🇪',big:'몬테네그로',mid:'공식 등록 완료',sub:'유럽 국가'},{icon:'✅',big:'ISP 등록',mid:'인터넷 서비스 제공자',sub:'규제 승인'},{icon:'🚀',big:'서비스 시작',mid:'마지막 규제 통과',sub:'전국 배포'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"스타링크가 몬테네그로에서 인터넷 서비스 제공자로 공식 등록·서비스 시작을 위한 규제 절차 완료로 유럽 시장 확장 가속화."',quoteEn:'BREAKING: Starlink has officially been registered as an internet operator in Montenegro, clearing a key regulatory step toward launching service nationwide',
  source:'출처: DogeDesigner · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 스타링크 소비자 1,300만·모바일 1,300만 사용자 규모 확인에 이어 유럽 국가별 규제 승인이 계속 진행됩니다. 8/11 루프트한자 A320neo 첫 통합에 이어 유럽 시장 확장의 실 진전 신호입니다.',footer:'Starlink · 몬테네그로 등록',brand:BK},
 en:{title:'SPCX — Starlink Montenegro Official ISP Registration · European Country Service Launch Regulatory Complete',heroIcon:'🇲🇪',heroBig:'Montenegro',heroSub:'Per DogeDesigner: Starlink officially registered as ISP in Montenegro. Final regulatory approval for European country service launch cleared · Starlink European market expansion accelerates.',
  cards:[{icon:'🇲🇪',big:'Montenegro',mid:'Official registration',sub:'European country'},{icon:'✅',big:'ISP registered',mid:'Internet service provider',sub:'Regulatory approval'},{icon:'🚀',big:'Service start',mid:'Final regulation passed',sub:'Nationwide deploy'}],
  quoteLabel:'DOGEDESIGNER',quoteKo:'"Starlink 몬테네그로 등록"',quoteEn:'BREAKING: Starlink has officially been registered as an internet operator in Montenegro, clearing a key regulatory step toward launching service nationwide',
  source:'Source: DogeDesigner · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/14 Starlink 13M consumer/mobile users confirm, European country regulatory approvals continue. After 8/11 Lufthansa A320neo first integration, real progress signal for European market expansion.',footer:'Starlink · Montenegro',brand:BE}},

// 7. Nasdaq 24시간 거래
{file:'nasdaq-24-hour-trading-3-nights-week-december',symbol:'MACRO',
 ko:{title:'매크로 — 나스닥 12월부터 주 3일 밤 저녁 시간 (9pm-4am) 거래 도입·주 24시간 5일 거래 지원',heroIcon:'🌙',heroBig:'주 24/5',heroSub:'GURGAVIN이 전한 나스닥 정리에 따르면 나스닥이 12월부터 새 저녁 시간 (9pm-4am EST) 주 3일 밤 거래를 도입합니다. 다음 4분기부터 하루 24시간·주 5일 거래를 지원하며, 이는 8/13 별개 리포트의 SEC 24/7 블록체인 정책과 병행됩니다.',
  cards:[{icon:'🌙',big:'9pm-4am',mid:'저녁 시간 거래',sub:'주 3일 밤'},{icon:'📅',big:'12월',mid:'도입 시점',sub:'2026년'},{icon:'⏰',big:'24/5',mid:'다음 4분기',sub:'하루 24시간·주 5일'}],
  quoteLabel:'NASDAQ · GURGAVIN',quoteKo:'"나스닥이 새 저녁 세션 (9pm-4am EST) 주 3일 밤 12월부터 도입하며, 다음 4분기부터 하루 24시간·주 5일 거래 지원."',quoteEn:'JUST IN: NASDAQ SAYS IT WILL INTRODUCE A NEW EVENING SESSION 9 PM TO 4 AM STARTING IN DECEMBER · NASDAQ IS ALSO ENGAGING WITH REGULATORS TO OFFER NEARLY CONTINUOUS TRADING 23 HOURS A DAY, FIVE DAYS A WEEK',
  source:'출처: NASDAQ · GURGAVIN · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/13 별개 리포트의 SEC 24/7 블록체인 거래 정책과 병행하는 나스닥 실 대응입니다. 아시아·유럽 투자자의 실시간 참여 확대·시장 유동성 증가·미국 시장 프리미엄 강화 시그널입니다.',footer:'나스닥 · 24/5 12월',brand:BK},
 en:{title:'MACRO — NASDAQ Introducing 3-Night 9pm-4am Trading Sessions December · Almost 24/5 Trading Next Q4',heroIcon:'🌙',heroBig:'24/5',heroSub:'Per GURGAVIN: NASDAQ introducing new evening session (9pm-4am EST) 3 nights weekly from December. Supporting nearly continuous 24-hour/5-day trading next Q4. Parallels 8/13 SEC 24/7 blockchain policy.',
  cards:[{icon:'🌙',big:'9pm-4am',mid:'Evening session',sub:'3 nights/week'},{icon:'📅',big:'December',mid:'Launch timing',sub:'2026'},{icon:'⏰',big:'24/5',mid:'Next Q4',sub:'23 hours/day, 5 days'}],
  quoteLabel:'NASDAQ · GURGAVIN',quoteKo:'"나스닥 24/5 12월"',quoteEn:'NASDAQ SAYS IT WILL INTRODUCE A NEW EVENING SESSION 9 PM TO 4 AM STARTING IN DECEMBER · NASDAQ IS ALSO ENGAGING WITH REGULATORS TO OFFER NEARLY CONTINUOUS TRADING 23 HOURS A DAY, FIVE DAYS A WEEK',
  source:'Source: NASDAQ · GURGAVIN · 2026.08.17',
  noteHead:'Why this matters',noteSub:'NASDAQ actual response paralleling 8/13 SEC 24/7 blockchain trading policy. Signals expansion of Asia/Europe investor real-time participation, market liquidity increase, US market premium strengthening.',footer:'NASDAQ · 24/5 Dec',brand:BE}},

// 8. Shay Boloor SPCX 매출 4천억
{file:'shay-boloor-spcx-400b-revenue-connectivity-compute',symbol:'SPCX',
 ko:{title:'SPCX — Shay Boloor "SPCX 다음 5년 4천억 달러 연 매출·통신·컴퓨트·발사 3중 축·목표 SPCX 1위"',heroIcon:'💰',heroBig:'4천억 달러',heroSub:'Shay Boloor 정리에 따르면 SPCX가 다음 5년 안에 4천억 달러 연 매출에 도달할 수 있습니다. 통신·컴퓨트·발사 3중 사업 축이 함께 성장하며, 다음 phase는 SGW 배포를 100% 통신 sat 발사와 결합한다고 목표 SPCX가 2027년 말까지 1위 회사 될 것으로 예상.',
  cards:[{icon:'💰',big:'4천억 달러',mid:'다음 5년 연 매출',sub:'Shay Boloor 전망'},{icon:'🔗',big:'3중 축',mid:'통신·컴퓨트·발사',sub:'다각 확장'},{icon:'🏆',big:'세계 1위',mid:'2027년 말까지',sub:'매출 기업'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Flight 14 다음 5개월에서 4개월 안 발사·다각 컴퓨트 정말 시작. 지분 발행 없이·잠재 통신 사이드 시작 시 SPCX 목표 조정 필요·2027년 말까지 세계 매출 1위 회사 될 것."',quoteEn:'Flight 14 will be the next major catalyst in a couple of weeks with operational V3 deployment and a potential Ship catch as Elon Musk says the heat shield issue is solved and targets up to 1,000 V3 satellites by 2027',
  source:'출처: Shay Boloor · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/13 별개 리포트의 Musk All-Hands 15 GW·AI 99%·8/14 Dan Ives 2조 달러 시총·Ron Baron 230억 개인 지분 프레임의 매출 실체 전망입니다. 4천억 달러/년 매출은 통신+컴퓨트+발사 다각 확장이 실현될 때 도달 가능한 규모입니다.',footer:'SPCX · 4천억 5년',brand:BK},
 en:{title:'SPCX — Shay Boloor "SPCX $400B Revenue in Next 5 Years · Connectivity·Compute·Launch 3-Axis · Target #1 Global"',heroIcon:'💰',heroBig:'$400 B',heroSub:'Per Shay Boloor: SPCX could reach $400B annual revenue in next 5 years. Communications·compute·launch 3-axis growing together, next phase combines 100% comm sat launch with SGW deployment. Target SPCX becoming #1 by end 2027.',
  cards:[{icon:'💰',big:'$400 B',mid:'5-year annual revenue',sub:'Boloor forecast'},{icon:'🔗',big:'3-axis',mid:'Comm·compute·launch',sub:'Multi expansion'},{icon:'🏆',big:'World #1',mid:'By end 2027',sub:'Revenue firm'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"SPCX 4천억 5년"',quoteEn:'SPCX targets 3-axis communications, compute, launch business · $400B annual revenue over next 5 years',
  source:'Source: Shay Boloor · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Revenue substantiation for 8/13 Musk All-Hands 15 GW/AI 99% and 8/14 Dan Ives $2T mcap/Ron Baron $23B personal stake frames. $400B/yr revenue requires multi-axis expansion of communications+compute+launch.',footer:'SPCX · $400B 5-year',brand:BE}},

// 9. Model Y 200일 무사고
{file:'tsla-robotaxi-model-y-200-days-zero-incident',symbol:'TSLA',
 ko:{title:'TSLA — Robotaxi Model Y 함대 200일 무사고 운행·NHTSA 데이터 확인',heroIcon:'✅',heroBig:'200일',heroSub:'Sawyer Merritt 정리에 따르면 Tesla가 상용화한 Robotaxi Model Y 함대가 처음 200일 이상 완전 무사고로 운행됐다고 NHTSA 데이터로 확인됐습니다. Waymo 등 경쟁사가 여러 사고를 겪었던 시기 대비 이례적 안전 기록입니다.',
  cards:[{icon:'✅',big:'200일',mid:'무사고 운행',sub:'Robotaxi Model Y'},{icon:'📊',big:'NHTSA 데이터',mid:'정부 확인 안전',sub:'객관 근거'},{icon:'🚕',big:'Robotaxi',mid:'상용 서비스',sub:'Model Y 함대'}],
  quoteLabel:'SAWYER MERRITT · NHTSA',quoteKo:'"Tesla의 Robotaxi 함대가 첫 200일 동안 완전 무사고·인간 관련 사고 없이 운행된 것이 NHTSA 데이터로 확인됨."',quoteEn:'The only two incidents cited involving Tesla Robotaxi fleet were caused by human drivers in other vehicles making mistakes · zero crashes or accidents from mid-June through mid-July · according to newly released NHTSA data',
  source:'출처: Sawyer Merritt · NHTSA · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Cybercab Nevada 로보택시 허가·Austin 무감독 배치 임박·MS TSLA 증명 요구에 대한 결정적 안전 데이터 대응입니다. 200일 완전 무사고 기록은 규제·투자자 신뢰 회복의 실 근거이며, Waymo 대비 안전성 우위 확인.',footer:'TSLA Robotaxi · 200일 무사고',brand:BK},
 en:{title:'TSLA — Robotaxi Model Y Fleet 200 Days Zero Incident Operation · NHTSA Data Confirmed',heroIcon:'✅',heroBig:'200 days',heroSub:'Per Sawyer Merritt: Tesla commercial Robotaxi Model Y fleet operated 200+ days completely incident-free per NHTSA data. Unusual safety record vs Waymo etc competitor accidents.',
  cards:[{icon:'✅',big:'200 days',mid:'Incident-free operation',sub:'Robotaxi Model Y'},{icon:'📊',big:'NHTSA data',mid:'Gov safety confirmed',sub:'Objective evidence'},{icon:'🚕',big:'Robotaxi',mid:'Commercial service',sub:'Model Y fleet'}],
  quoteLabel:'SAWYER MERRITT · NHTSA',quoteKo:'"Tesla Robotaxi 200일 무사고"',quoteEn:'Tesla Robotaxi fleet operated first 200 days completely incident-free · zero crashes or accidents · per newly released NHTSA data',
  source:'Source: Sawyer Merritt · NHTSA · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Decisive safety data response to 8/14 Cybercab Nevada permit / Austin unsupervised deployment / MS TSLA prove demand. 200-day incident-free record is real basis for regulator/investor trust recovery, confirming safety advantage over Waymo.',footer:'TSLA Robotaxi · 200-day safe',brand:BE}},

// 10. NVDA $118.75B Softbank + OpenAI
{file:'nvda-1875b-openai-softbank-ohio-datacenter',symbol:'NVDA',
 ko:{title:'NVIDIA — Ohio 데이터센터 딜 확정·SB Energy 파트너십·OpenAI·SoftBank 초기 4억 2,500만 달러·NVDA 신규 투자자',heroIcon:'🏗️',heroBig:'Ohio 확정',heroSub:'NVDA가 SoftBank의 SB Energy와 파트너십을 맺어 Ohio Campus in Pike County에 20년 임대 데이터센터 딜을 확정했습니다. OpenAI가 20년 리스로 데이터센터 운영, 4억 2,500만 달러 초기 자본이 필요하며, Softbank·OpenAI에 이어 NVDA도 신규 투자자로 참여했습니다.',
  cards:[{icon:'🏗️',big:'Ohio Campus',mid:'20년 임대 데이터센터',sub:'Pike County'},{icon:'💰',big:'4억 2,500만 달러',mid:'초기 자본 필요',sub:'20년 리스'},{icon:'⚡',big:'NVDA 참여',mid:'Softbank·OpenAI 이어',sub:'신규 투자자'}],
  quoteLabel:'ETF TRACKER · NVDA',quoteKo:'"NVDA는 SB Energy와 Ohio Campus 데이터센터 운영을 확정. OpenAI가 20년 리스로 운영·4억 2,500만 달러 초기 자본 필요·Softbank·OpenAI에 이어 NVDA도 투자자로 참여."',quoteEn:'NVIDIA JUST CONFIRMED ITS TO OHIO DATA CENTER DEAL WITH OPENAI · NVIDIA said it will be the exclusive host for AI compute at SB Energy PORT-Pike Campus in Pike County, Ohio, built on the site of the old Portsmouth Gaseous Diffusion Plant · Initial capacity 4.25 GT-DW, with NVDA holding an option on another 3.75 GT-DW · Nvidia joining SoftBank and OpenAI as investors in the arrangement',
  source:'출처: ETF Tracker · NVIDIA · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/12 별개 리포트의 NVDA + SPCX 2,600억 달러 GPU 딜·8/11 5,000억 컨소시엄에 이어 NVDA-SoftBank-OpenAI 3자 파트너십까지·NVDA가 하이퍼스케일러 인프라 확장의 핵심 파트너가 되고 있습니다. Ohio 데이터센터는 미국 chip 부활 프레임의 실체입니다.',footer:'NVDA·SB Energy·OpenAI Ohio',brand:BK},
 en:{title:'NVIDIA — Ohio Data Center Deal Confirmed · SB Energy Partnership · OpenAI·SoftBank $425M Initial · NVDA New Investor',heroIcon:'🏗️',heroBig:'Ohio Deal',heroSub:'NVDA partners with SoftBank SB Energy for 20-year lease data center at Ohio Campus in Pike County. OpenAI to operate 20-year lease, $425M initial capital · NVDA joins Softbank/OpenAI as new investor.',
  cards:[{icon:'🏗️',big:'Ohio Campus',mid:'20-year lease DC',sub:'Pike County'},{icon:'💰',big:'$425 M',mid:'Initial capital',sub:'20-year lease'},{icon:'⚡',big:'NVDA joins',mid:'After Softbank/OpenAI',sub:'New investor'}],
  quoteLabel:'ETF TRACKER · NVDA',quoteKo:'"NVDA Ohio SB Energy·OpenAI"',quoteEn:'NVIDIA CONFIRMED OHIO DATA CENTER DEAL · SB Energy PORT-Pike Campus · Initial capacity 4.25 GT-DW · NVDA joining SoftBank and OpenAI as investors',
  source:'Source: ETF Tracker · NVIDIA · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/12 NVDA + SPCX $260B GPU deal and 8/11 $500B consortium, NVDA-SoftBank-OpenAI trilateral partnership · NVDA becoming core partner of hyperscaler infra expansion. Ohio DC materializes US chip revival frame.',footer:'NVDA·SB·OpenAI Ohio',brand:BE}},

// 11. S&P 500 9,000 목표 Evercore
{file:'sp500-9000-evercore-isi-target-2026',symbol:'SPX',
 ko:{title:'SPX — Evercore ISI "S&P 500 9,000 목표" 초강세 전망·현재 대비 30%+ 상승 잠재',heroIcon:'🚀',heroBig:'9,000',heroSub:'Barchart 정리에 따르면 Evercore ISI가 향후 12개월 안에 S&P 500이 9,000까지 상승할 수 있다고 전망했습니다. 현재 S&P 500이 약 6,500 수준이므로 30%+ 상승 잠재이며, 오늘 별개 리포트의 Tom Lee 2년 사상 최대 상승 프레임과 정합입니다.',
  cards:[{icon:'🚀',big:'9,000',mid:'12개월 목표',sub:'Evercore ISI'},{icon:'📈',big:'+30%+',mid:'현재 대비',sub:'상승 잠재'},{icon:'📅',big:'12개월',mid:'목표 시점',sub:'2026-2027'}],
  quoteLabel:'BARCHART · EVERCORE ISI',quoteKo:'"S&P 500이 9,000까지 상승 가능·Evercore ISI 이유 정리."',quoteEn:'S&P 500 to 9,000? Why Evercore ISI thinks it possible',
  source:'출처: Barchart · Evercore ISI · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Tom Lee 2년 사상 최대 상승·SPX·러셀 2000 사상 최고에 이어 sell-side 초강세 프레임이 다층 확산됩니다. 오늘 별개 리포트의 unusual_whales 밸류에이션 프리미엄 경고·닷컴 버블 근접과 대립하는 낙관 프레임입니다.',footer:'SPX · 9,000 12개월',brand:BK},
 en:{title:'SPX — Evercore ISI "S&P 500 9,000 Target" Ultra-Bullish · 30%+ Upside vs Current',heroIcon:'🚀',heroBig:'9,000',heroSub:'Per Barchart: Evercore ISI forecasts S&P 500 could reach 9,000 within next 12 months. Current ~6,500 · 30%+ upside potential · aligns with today Tom Lee 2yr max frame.',
  cards:[{icon:'🚀',big:'9,000',mid:'12-month target',sub:'Evercore ISI'},{icon:'📈',big:'+30%+',mid:'vs current',sub:'Upside potential'},{icon:'📅',big:'12 months',mid:'Target timeline',sub:'2026-2027'}],
  quoteLabel:'BARCHART · EVERCORE ISI',quoteKo:'"SPX 9,000 12개월"',quoteEn:'S&P 500 to 9,000? Why Evercore ISI thinks it possible',
  source:'Source: Barchart · Evercore ISI · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/14 Tom Lee 2yr max / SPX·Russell 2000 ATH, sell-side ultra-bull frame multi-layer spreads. Optimism opposes today unusual_whales valuation premium warning / dot-com bubble proximity.',footer:'SPX · 9,000 12mo',brand:BE}},

// 12. Palantir 밸류에이션 경고 닷컴
{file:'palantir-dotcom-bubble-valuation-warning-q2',symbol:'MACRO',
 ko:{title:'매크로 — unusual_whales "Palantir 밸류에이션 프리미엄 닷컴 버블 수준·Q2 대비 100%+ 상승" 경고',heroIcon:'⚠️',heroBig:'닷컴 근접',heroSub:'unusual_whales·투자 시각 정리에 따르면 Palantir 밸류에이션 프리미엄이 1999-2000 닷컴 버블 수준에 근접했습니다. Q2 대비 100%+ 상승했지만 매출·이익 기반 성장은 이 규모를 정당화하기 어려우며, Michael Burry AI Enron 경고와 함께 경계 프레임입니다.',
  cards:[{icon:'⚠️',big:'닷컴 근접',mid:'밸류에이션 프리미엄',sub:'1999-2000 수준'},{icon:'📈',big:'+100%+',mid:'Q2 대비 상승',sub:'Palantir'},{icon:'💥',big:'경계 신호',mid:'AI 사이클 리스크',sub:'매출·이익 정당성'}],
  quoteLabel:'UNUSUAL_WHALES',quoteKo:'"Palantir 밸류에이션 프리미엄이 1999-2000 닷컴 버블 이후 최대 수준에 접근·Q2 실적 성장·전망·비즈니스 하이라이트 잘 표시."',quoteEn:'The chart above shows the classic signs of a bubble with $PLTR being the largest premium above the market since the dot com era · run to 1929 or 2000',
  source:'출처: unusual_whales · Investing Visuals · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Michael Burry AI Enron 5,000억 달러 경고·Shiller CAPE 밸류에이션 역사 2번째 최고와 결합해 경계 프레임 다층입니다. Palantir 시세 급등이 매출 성장을 훨씬 앞지르고 있다는 지적으로, Tom Lee·Evercore 초강세 프레임과 정면 대립.',footer:'매크로 · PLTR 닷컴 프리미엄',brand:BK},
 en:{title:'MACRO — unusual_whales "Palantir Valuation Premium at Dot-Com Bubble Levels · +100% vs Q2" Warning',heroIcon:'⚠️',heroBig:'DOT-COM',heroSub:'Per unusual_whales investing view: Palantir valuation premium approaching 1999-2000 dot-com bubble levels. +100%+ vs Q2 but revenue/earnings growth cannot justify this scale · caution frame with Michael Burry AI Enron warning.',
  cards:[{icon:'⚠️',big:'Dot-com close',mid:'Valuation premium',sub:'1999-2000 level'},{icon:'📈',big:'+100%+',mid:'vs Q2',sub:'Palantir'},{icon:'💥',big:'Warning signal',mid:'AI cycle risk',sub:'Revenue/profit justify'}],
  quoteLabel:'UNUSUAL_WHALES',quoteKo:'"PLTR 밸류에이션 프리미엄 닷컴"',quoteEn:'The chart shows the classic signs of a bubble with $PLTR being the largest premium above the market since the dot com era',
  source:'Source: unusual_whales · Investing Visuals · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Multi-layer caution frame with 8/14 Michael Burry AI Enron $500B warning and Shiller CAPE 2nd highest in history. Point that Palantir price surge vastly exceeds revenue growth · directly opposes Tom Lee/Evercore ultra-bull frames.',footer:'MACRO · PLTR dot-com',brand:BE}},

// 13. Anthropic 1,900억 밸류에이션
{file:'anthropic-amazon-stake-190b-245pct-since-q2',symbol:'MACRO',
 ko:{title:'매크로 — Amazon의 Anthropic 지분 1,900억 달러 도달·Q2 이후 +245% 급등·Google 지분 재평가와 연결',heroIcon:'💎',heroBig:'1,900억 달러',heroSub:'ThemedETFs 정리에 따르면 Amazon의 Anthropic 지분 가치가 1,900억 달러에 도달했으며 Q2 이후 +245% 급등했습니다. 8/14 별개 리포트의 Google 105배 SPCX return·오늘 별개 리포트의 Google GOOGL 24.7배 신고 지분 확장과 유사한 흐름입니다.',
  cards:[{icon:'💎',big:'1,900억 달러',mid:'Amazon Anthropic 지분',sub:'현재 가치'},{icon:'📈',big:'+245%',mid:'Q2 이후 상승',sub:'급증'},{icon:'🏆',big:'대형 회사',mid:'AI 자산 재평가',sub:'Google 유사'}],
  quoteLabel:'THEMEDTFS · AMAZON',quoteKo:'"Amazon의 Anthropic 지분이 1,900억 달러에 도달·Q2 이후 +245% 급등."',quoteEn:'Amazon Antropic Stake hits $190 Billion · +245% since Q2',
  source:'출처: ThemedETFs · Amazon · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Anthropic 10월 상장 2조 달러·구글 24.7배 신고 지분 급증에 이어 Amazon Anthropic 지분 재평가까지·AI 회사 자산 가치가 대형 회사 재무에서 급속 확대되고 있습니다. Anthropic 상장 시 Amazon·Google 두 회사 자산 가치가 극단 실체화됩니다.',footer:'Amazon · Anthropic 1,900억',brand:BK},
 en:{title:'MACRO — Amazon Anthropic Stake Hits $190B · +245% Since Q2 · Google Stake Re-Rating Connected',heroIcon:'💎',heroBig:'$190 B',heroSub:'Per ThemedETFs: Amazon Anthropic stake reaches $190B · +245% since Q2 · similar flow to 8/14 Google 105x SPCX return / today Google GOOGL 24.7x reported holdings expansion.',
  cards:[{icon:'💎',big:'$190 B',mid:'Amazon Anthropic stake',sub:'Current value'},{icon:'📈',big:'+245%',mid:'Since Q2',sub:'Surge'},{icon:'🏆',big:'Large firm',mid:'AI asset re-rating',sub:'Google similar'}],
  quoteLabel:'THEMEDTFS · AMAZON',quoteKo:'"Amazon Anthropic 1,900억"',quoteEn:'Amazon Antropic Stake hits $190 Billion · +245% since Q2',
  source:'Source: ThemedETFs · Amazon · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/14 Anthropic Oct $2T IPO / Google 24.7x reported holdings surge, Amazon Anthropic re-rating · AI company asset value rapidly expanding in large firm balance sheets. Anthropic IPO will materialize Amazon/Google asset value in extreme scale.',footer:'Amazon · Anthropic $190B',brand:BE}},

// 14. Whole Mars SPCX SEC 4.24조
{file:'wholemars-spcx-sec-filing-424t-425pct',symbol:'SPCX',
 ko:{title:'SPCX — Whole Mars Catalog "SPCX가 SEC에 4.24조 달러 EU 지분 신청·현재 시가의 50% 이상"',heroIcon:'📋',heroBig:'4.24조 달러',heroSub:'Whole Mars Catalog 정리에 따르면 SPCX가 SEC에 4.24조 달러 규모의 EU (equity units) 지분을 신청했습니다. 이는 현재 시가의 50% 이상 규모로, SPCX 대량 상장·유통 시장 확장의 실 진전 신호입니다.',
  cards:[{icon:'📋',big:'4.24조 달러',mid:'SPCX SEC 신청',sub:'EU 지분 규모'},{icon:'📊',big:'50%+',mid:'현재 시가 비율',sub:'대량 규모'},{icon:'📅',big:'SEC filing',mid:'2026-08-13',sub:'공식 신청'}],
  quoteLabel:'WHOLE MARS CATALOG · SEC',quoteKo:'"SPCX가 8/13 SEC에 4.24조 달러 EU 지분을 신청했으며, 현재 시가의 50% 이상 규모."',quoteEn:'JUST IN: Elon Reeve Management disclosed a $4.24T stake in SpaceX SPCX making it over 50% of the $4.24 trillion market cap. This is Elon SPCX EU equity units filing',
  source:'출처: Whole Mars Catalog · SEC · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/14 별개 리포트의 Musk 48.4% SEC 공식 지분과 병행되는 대량 EU 지분 신청 실체입니다. SPCX 상장 후 유통 시장 확장·기관 참여 확대 시그널이며, 오늘 별개 리포트의 Shay Boloor 4천억 매출 프레임의 밸류에이션 근거를 강화합니다.',footer:'SPCX · SEC 4.24조',brand:BK},
 en:{title:'SPCX — Whole Mars Catalog "SPCX SEC Filing $4.24T EU Stake · 50%+ of Current Market Cap"',heroIcon:'📋',heroBig:'$4.24 T',heroSub:'Per Whole Mars Catalog: SPCX filed $4.24T EU (equity units) stake with SEC · 50%+ of current market cap · real progress signal for SPCX mass listing/circulation market expansion.',
  cards:[{icon:'📋',big:'$4.24 T',mid:'SPCX SEC filing',sub:'EU stake scale'},{icon:'📊',big:'50%+',mid:'Current mcap ratio',sub:'Mass scale'},{icon:'📅',big:'SEC filing',mid:'2026-08-13',sub:'Official filed'}],
  quoteLabel:'WHOLE MARS CATALOG · SEC',quoteKo:'"SPCX SEC 4.24조 EU"',quoteEn:'JUST IN: Elon Reeve Management disclosed a $4.24T stake in SpaceX SPCX making it over 50% of the $4.24 trillion market cap · Elon SPCX EU equity units filing',
  source:'Source: Whole Mars Catalog · SEC · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Real substantiation of mass EU stake filing paralleling 8/14 Musk 48.4% SEC official stake. Signals SPCX post-IPO circulation market expansion / institutional participation · strengthens valuation basis for today Shay Boloor $400B revenue frame.',footer:'SPCX · SEC $4.24T',brand:BE}},

// 15. SPCX Tesla Megapack Australia
{file:'tsla-plus-grid-storage-megapack-australia-2gw',symbol:'TSLA',
 ko:{title:'TSLA — 호주 PLUS·Grid Storage Australia와 2GW Megapack 배터리 저장 딜·2027년까지 완공 목표',heroIcon:'🔋',heroBig:'2 GW',heroSub:'Ashley Louise Simon 정리에 따르면 Tesla가 호주 PLUS와 Grid Storage Australia와 2GW Megapack 배터리 저장 딜을 확정했습니다. 이 지역 사상 최대 규모이며 2027년까지 완공 목표, Musk 회사 그룹의 에너지 사업 다각 확장 실체화입니다.',
  cards:[{icon:'🔋',big:'2 GW',mid:'Megapack 배터리',sub:'호주 지역 최대'},{icon:'📅',big:'2027년',mid:'완공 목표',sub:'배포 로드맵'},{icon:'🇦🇺',big:'호주 확장',mid:'PLUS·Grid Storage',sub:'Tesla 에너지'}],
  quoteLabel:'ASHLEY LOUISE SIMON · TESLA',quoteKo:'"Tesla가 호주 PLUS·Grid Storage Australia와 2GW Megapack 배터리 저장 딜 확정. 이 지역 사상 최대 규모·2027년까지 완공 목표."',quoteEn:'Tesla just secured its biggest Australia Megapack battery storage deal yet with a 2 GW project · The area targets construction begin by 2027 and completion by 2027',
  source:'출처: Ashley Louise Simon · Tesla · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/11 별개 리포트의 Tesla 태양광 Fort Bend County 3,000 에이커·오늘 별개 리포트의 Tesla 중국 판매 +33%·200일 무사고 로보택시에 이어 호주 에너지 저장까지·Tesla 사업 다각 글로벌 확장 실체화입니다.',footer:'TSLA · 호주 Megapack 2GW',brand:BK},
 en:{title:'TSLA — Australia PLUS·Grid Storage Australia 2GW Megapack Battery Storage Deal · 2027 Completion Target',heroIcon:'🔋',heroBig:'2 GW',heroSub:'Per Ashley Louise Simon: Tesla confirmed 2GW Megapack battery storage deal with Australia PLUS and Grid Storage Australia. Largest in region, targeting completion by 2027. Materialization of Musk company group energy business multi-expansion.',
  cards:[{icon:'🔋',big:'2 GW',mid:'Megapack battery',sub:'Australia region max'},{icon:'📅',big:'2027',mid:'Completion target',sub:'Deploy roadmap'},{icon:'🇦🇺',big:'Australia expansion',mid:'PLUS·Grid Storage',sub:'Tesla energy'}],
  quoteLabel:'ASHLEY LOUISE SIMON',quoteKo:'"Tesla 호주 Megapack 2GW"',quoteEn:'Tesla secured biggest Australia Megapack battery storage deal yet with a 2 GW project · targets completion by 2027',
  source:'Source: Ashley Louise Simon · Tesla · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/11 Tesla solar Fort Bend 3,000 acres and today Tesla China sales +33% / 200-day Robotaxi zero incident, Australia energy storage · Tesla multi-axis global business expansion materializes.',footer:'TSLA · AUS Megapack 2GW',brand:BE}},
// 16. Harvard SPCX 23억 지분 공개
{file:'harvard-spcx-91pct-portfolio-endowment-manager-move',symbol:'SPCX',
 ko:{title:'SPCX — Harvard 대학 SPCX 23억 달러 지분 공개·공개 미국 주식 포트폴리오 91% 차지',heroIcon:'🎓',heroBig:'91%',heroSub:'Investing.com·Polymarket Money에 따르면 Harvard 대학이 SEC에 SPCX 지분 23억 달러를 신규 공개했습니다. 이 SPCX 지분이 Harvard 공개 미국 주식 포트폴리오의 91%를 차지하며 다른 모든 보유 종목 합계보다 큽니다.',
  cards:[{icon:'🎓',big:'91%',mid:'Harvard 공개 포트폴리오',sub:'SPCX 비중'},{icon:'💰',big:'23억 달러',mid:'Harvard 지분 규모',sub:'SEC 공식 공개'},{icon:'📊',big:'단일 최대',mid:'다른 종목 합계 초과',sub:'대학 endowment'}],
  quoteLabel:'INVESTING.COM · POLYMARKET MONEY',quoteKo:'"Harvard 대학이 SPCX 23억 달러 지분 공개·Harvard 공개 미국 주식 포트폴리오의 91%가 SPCX·다른 모든 보유 종목 합계보다 큼."',quoteEn:'HARVARD DISCLOSES $2.3B STAKE IN SPCX SPACEX, EVEN HALF ITS U.S. EQUITY PORTFOLIO · SPCX makes up 91% of Harvard disclosed publicly stock portfolio',
  source:'출처: Investing.com · Polymarket Money · 2026.08.17',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/13 별개 리포트의 Google SPCX 105배 return·95% 포트폴리오·오늘 별개 리포트의 SPCX SEC 4.24조 EU 지분 신청에 이어 Harvard 대학 endowment도 SPCX가 공개 주식의 절대 지배 비중이라는 실 확인·다른 대학 endowment 후속 참여 압박이 커지는 국면입니다.',footer:'SPCX · Harvard 23억',brand:BK},
 en:{title:'SPCX — Harvard University Discloses $2.3B SPCX Stake · 91% of Disclosed US Equity Portfolio',heroIcon:'🎓',heroBig:'91%',heroSub:'Per Investing.com and Polymarket Money: Harvard University disclosed $2.3B SPCX stake to SEC. This SPCX stake makes up 91% of Harvard disclosed US equity portfolio, larger than all other holdings combined.',
  cards:[{icon:'🎓',big:'91%',mid:'Harvard disclosed portfolio',sub:'SPCX weighting'},{icon:'💰',big:'$2.3 B',mid:'Harvard stake size',sub:'SEC official filing'},{icon:'📊',big:'Largest single',mid:'Exceeds all other holdings',sub:'Univ endowment'}],
  quoteLabel:'INVESTING.COM · POLYMARKET MONEY',quoteKo:'"Harvard 23억 SPCX"',quoteEn:'HARVARD DISCLOSES $2.3B STAKE IN SPCX SPACEX, EVEN HALF ITS U.S. EQUITY PORTFOLIO · SPCX makes up 91% of Harvard disclosed publicly stock portfolio',
  source:'Source: Investing.com · Polymarket Money · 2026.08.17',
  noteHead:'Why this matters',noteSub:'Following 8/13 Google SPCX 105x return / 95% portfolio and today SPCX SEC $4.24T EU stake filing, Harvard university endowment also SPCX absolute dominant in disclosed stocks · pressure on other university endowments to follow.',footer:'SPCX · Harvard $2.3B',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260818.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260818-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
