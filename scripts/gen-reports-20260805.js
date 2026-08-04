// 2026-08-05 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.05';

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
// 1. SPCX Q2 대박 종합
{file:'spcx-q2-earnings-blowout-92yoy',symbol:'SPCX',
 ko:{title:'SPCX Q2 실적 대박 — Revenue +92% YoY·$10B 현금·EBITDA +191%·순손실 -$147M(개선)·Starship V3 2회 성공',heroIcon:'🚀',heroBig:'+92 % YoY',heroSub:'SpaceX 공식 Q2 실적: Revenue +92% YoY(vs 전분기)·$10B 현금 + 마켓 증권·$4.7B backlog 서명·순손실 -$147M(작년 -$844M에서 $697M 개선)·Adjusted EBITDA +191%·Starship V3 2회 성공·$30B+ 미 정부 다년 계약',
  cards:[{icon:'📈',big:'+92 %',mid:'Revenue YoY',sub:'Falcon 9·Starlink·Starship'},{icon:'💰',big:'$10 B',mid:'현금 + 마켓',sub:'+$4.7B backlog'},{icon:'📊',big:'+191 %',mid:'Adjusted EBITDA',sub:'$3.5B·순손실 개선'}],
  quoteLabel:'SPACEX 공식',quoteKo:'"Q2 매출 +92% YoY 성장·순손실 $697M 개선·EBITDA +191%·Starship V3 2회 성공·$30B+ 미 정부 계약"',quoteEn:'"Q2 revenue +92% YoY · net loss improved $697M · Adjusted EBITDA +191% · 2 successful Starship V3 flights · $30B+ US government contracts"',
  source:'출처: SpaceX 공식 · DogeDesigner · WOLF · unusual_whales · 2026.08.04',
  noteHead:'왜 중요한가: 8/4 락업 해제·-50% ATH 시세에도 실적 대박·매출 폭발 프레임 실체·Musk 12-24개월 +TSLA 매출의 물리 근거',noteSub:'앞으로 볼 것: 매출 성장률 지속·V3 상용화·$30B 정부 계약 실 매출 반영·시세 반응',footer:'SPCX Q2 · +92% YoY · $10B 현금',brand:BK},
 en:{title:'SPCX Q2 Blowout — Revenue +92% YoY · $10B Cash · EBITDA +191% · Net Loss -$147M (Improved) · Starship V3 2× Success',heroIcon:'🚀',heroBig:'+92 % YoY',heroSub:'SpaceX official Q2: Revenue +92% YoY · $10B cash + marketable securities · $4.7B signed backlog · net loss -$147M ($697M improvement from prior -$844M) · Adjusted EBITDA +191% · 2 successful Starship V3 flights · $30B+ multi-year US government contracts',
  cards:[{icon:'📈',big:'+92 %',mid:'Revenue YoY',sub:'Falcon 9 / Starlink / Starship'},{icon:'💰',big:'$10 B',mid:'Cash + marketable',sub:'+$4.7B backlog'},{icon:'📊',big:'+191 %',mid:'Adjusted EBITDA',sub:'$3.5B · net loss improved'}],
  quoteLabel:'SPACEX OFFICIAL',quoteKo:'"Q2 매출 +92% YoY·EBITDA +191%·V3 2회 성공·$30B+ 정부 계약"',quoteEn:'"Q2 revenue +92% YoY · net loss improved $697M · Adjusted EBITDA +191% · 2 successful Starship V3 flights · $30B+ US government contracts"',
  source:'Source: SpaceX official · DogeDesigner · WOLF · unusual_whales · 2026.08.04',
  noteHead:'Why: Despite 8/4 lockup opening / -50% ATH price, earnings blowout substantiates revenue-explosion frame · physical basis for Musk 12-24 mo +TSLA revenue',noteSub:'Watch: Revenue growth continuity · V3 commercialization · $30B govt contracts revenue reflection · price reaction',footer:'SPCX Q2 · +92% YoY · $10B cash',brand:BE}},

// 2. SPCX-NVDA Starmind exclusive partnership
{file:'spcx-nvda-starmind-exclusive-partnership',symbol:'SPCX',
 ko:{title:'SPCX-NVDA — Starmind AI 위성 컴퓨트 exclusive 파트너십·Rubin GPU·Vera CPU·250 kW·Musk "NVDA에 exclusive"',heroIcon:'🛰️',heroBig:'EXCLUSIVE',heroSub:'SPCX + NVIDIA 공식: Starmind AI satellite compute payload·각 Starmind 위성이 NVIDIA Rubin GPU + Vera CPU로 datacenter class 우주 컴퓨트 · SPCX 위성 컴퓨트 용량 250 kW · Musk가 실적 콜에서 "AI 컴퓨트는 NVDA에 exclusive"로 발표',
  cards:[{icon:'🛰️',big:'Starmind',mid:'AI 위성 컴퓨트',sub:'Rubin GPU + Vera CPU'},{icon:'⚡',big:'250 kW',mid:'위성 컴퓨트 용량',sub:'datacenter class 우주'},{icon:'🎯',big:'EXCLUSIVE',mid:'NVDA 전용',sub:'Musk 실적 콜 발표'}],
  quoteLabel:'ELON MUSK · SPCX · NVIDIA',quoteKo:'"우리는 앞으로 NVIDIA에 exclusive하게 build하기로 결정 · Vera 아키텍처가 최고 · 최고의 AI 컴퓨터"',quoteEn:'"We\'ve decided to build exclusively on Nvidia because we think the Vera architecture is the best · best AI computer · exclusive to Nvidia"',
  source:'출처: SPCX Q2 실적 콜 · NVIDIA · Kobeissi Letter · 2026.08.04',
  noteHead:'왜 중요한가: 8/1 99.99% 컴퓨트 우주 프레임의 물리 실체·NVDA-SPCX 결합 공식화·Musk 99.99% 우주 프레임 확정',noteSub:'앞으로 볼 것: Starmind 위성 실 발사 시점·250 kW 컴퓨트 상용화·다른 궤도 DC 파트너십',footer:'SPCX·NVDA Starmind · Rubin·Vera',brand:BK},
 en:{title:'SPCX-NVDA — Starmind AI Satellite Compute Exclusive Partnership · Rubin GPU · Vera CPU · 250 kW · Musk "NVDA Exclusive"',heroIcon:'🛰️',heroBig:'EXCLUSIVE',heroSub:'SPCX + NVIDIA official: Starmind AI satellite compute payload · each Starmind satellite includes NVIDIA Rubin GPUs + Vera CPUs for datacenter class space compute · SPCX satellite compute capacity 250 kW · Musk announced on earnings call "AI compute exclusive to NVDA"',
  cards:[{icon:'🛰️',big:'Starmind',mid:'AI satellite compute',sub:'Rubin GPU + Vera CPU'},{icon:'⚡',big:'250 kW',mid:'Satellite compute capacity',sub:'Datacenter class space'},{icon:'🎯',big:'EXCLUSIVE',mid:'NVDA dedicated',sub:'Musk earnings call'}],
  quoteLabel:'ELON MUSK · SPCX · NVIDIA',quoteKo:'"NVIDIA에 exclusive build·Vera 아키텍처 최고·최고 AI 컴퓨터"',quoteEn:'"We\'ve decided to build exclusively on Nvidia because we think the Vera architecture is the best · best AI computer · exclusive to Nvidia"',
  source:'Source: SPCX Q2 earnings call · NVIDIA · Kobeissi Letter · 2026.08.04',
  noteHead:'Why: Physical substance of 8/1 "99.99% compute to space" frame · NVDA-SPCX combination formalized · Musk 99.99% space frame confirmed',noteSub:'Watch: Starmind satellite actual launch timing · 250 kW compute commercialization · other orbital DC partnerships',footer:'SPCX·NVDA Starmind · Rubin·Vera',brand:BE}},

// 3. SPCX Starlink 90% revenue
{file:'spcx-starlink-90pct-revenue-6b-contracts',symbol:'SPCX',
 ko:{title:'SPCX — Starlink 총 매출 90% 지배 (2020 54%→) · subscribers 2배·$6B+ 계약·Falcon 9 미션 대부분 Starlink',heroIcon:'📡',heroBig:'90 %',heroSub:'DogeDesigner: SpaceX Starlink가 총 매출 90% 차지 (2020 54%에서 확대) · Q2 subscribers 2배·connectivity revenue +64%·operating income +79%·$6B+ Starlink 계약·Falcon 9 미션 대부분 Starlink 전용 발사',
  cards:[{icon:'📡',big:'90 %',mid:'SPCX 총 매출',sub:'2020 54% → 90%'},{icon:'📈',big:'2 배',mid:'Subscribers YoY',sub:'connectivity +64%'},{icon:'💵',big:'$6 B+',mid:'Starlink 계약',sub:'op income +79%'}],
  quoteLabel:'DOGEDESIGNER · SPCX Q2',quoteKo:'"Starlink가 총 매출 90% 지배·subscribers 2배·$6B+ 계약·Falcon 9 미션 대부분 Starlink"',quoteEn:'"Starlink dominates 90% of SpaceX total revenue · subscribers doubled · $6B+ contracts · most Falcon 9 missions are Starlink"',
  source:'출처: DogeDesigner · SpaceX Q2 · 2026.08.04',
  noteHead:'왜 중요한가: 8/4 IAG 50% 항공기·Hughesnet 파산과 결합·Starlink 시장 지배 실체·8/3 12-24개월 +TSLA 매출의 주 축',noteSub:'앞으로 볼 것: Starlink Aviation·주거·기업 확대·다른 항공사·시장 침투 지속',footer:'SPCX Starlink · 90% 매출',brand:BK},
 en:{title:'SPCX — Starlink Dominates 90% of Total Revenue (from 54% in 2020) · Subscribers Doubled · $6B+ Contracts · Most Falcon 9 Missions',heroIcon:'📡',heroBig:'90 %',heroSub:'DogeDesigner: SpaceX Starlink accounts for 90% of total revenue (up from 54% in 2020) · Q2 subscribers doubled · connectivity revenue +64% · operating income +79% · $6B+ Starlink contracts · most Falcon 9 missions dedicated to Starlink launches',
  cards:[{icon:'📡',big:'90 %',mid:'SPCX total revenue',sub:'2020 54% → 90%'},{icon:'📈',big:'2×',mid:'Subscribers YoY',sub:'Connectivity +64%'},{icon:'💵',big:'$6 B+',mid:'Starlink contracts',sub:'Op income +79%'}],
  quoteLabel:'DOGEDESIGNER · SPCX Q2',quoteKo:'"Starlink 90% 매출·subscribers 2배·$6B+·Falcon 9 대부분"',quoteEn:'"Starlink dominates 90% of SpaceX total revenue · subscribers doubled · $6B+ contracts · most Falcon 9 missions are Starlink"',
  source:'Source: DogeDesigner · SpaceX Q2 · 2026.08.04',
  noteHead:'Why: Combined with 8/4 IAG 50% aircraft · Hughesnet bankruptcy · Starlink market dominance substance · main axis of 8/3 12-24 mo +TSLA revenue',noteSub:'Watch: Starlink Aviation / residential / enterprise expansion · other airlines · market penetration continuity',footer:'SPCX Starlink · 90% rev',brand:BE}},

// 4. SPCX AI compute $2.32B Q2
{file:'spcx-ai-compute-232b-anthropic-google-reflection',symbol:'SPCX',
 ko:{title:'SPCX AI 컴퓨트 Q2 $2.32B — Anthropic $1.25B·Google $920M·Reflection $150M·연 $2.6B 페이스',heroIcon:'💻',heroBig:'$2.32 B',heroSub:'DogeDesigner: SpaceX Q2 AI 컴퓨트 계약 합계 $2.32B · Anthropic $1.25B (54%) · Google $920M (40%) · Reflection $150M (6%) · 연 페이스 $2.6B · Starmind exclusive NVDA 파트너십의 실 매출 실체',
  cards:[{icon:'💻',big:'$2.32 B',mid:'AI 컴퓨트 Q2',sub:'3사 합계'},{icon:'🏛️',big:'$1.25 B',mid:'Anthropic 계약',sub:'54% 비중'},{icon:'🔍',big:'$920 M',mid:'Google 계약',sub:'40% 비중'}],
  quoteLabel:'DOGEDESIGNER · SPCX Q2',quoteKo:'"SPCX Q2 AI 컴퓨트 $2.32B · Anthropic $1.25B·Google $920M·Reflection $150M · 연 $2.6B 페이스"',quoteEn:'"SpaceX Q2 AI compute $2.32B · Anthropic $1.25B · Google $920M · Reflection $150M · $2.6B annual pace"',
  source:'출처: DogeDesigner · SPCX Q2 · 2026.08.04',
  noteHead:'왜 중요한가: 궤도 DC 프레임의 실 매출 실체·Anthropic·Google이 SPCX AI 인프라 이용 확인·Musk +TSLA 매출 근거',noteSub:'앞으로 볼 것: 3사 계약 확대·다른 하이퍼(MSFT·AMZN·NVDA) 유사 계약·Starmind 상용화',footer:'SPCX AI 컴퓨트 · $2.32B Q2',brand:BK},
 en:{title:'SPCX AI Compute Q2 $2.32B — Anthropic $1.25B · Google $920M · Reflection $150M · $2.6B Annual Pace',heroIcon:'💻',heroBig:'$2.32 B',heroSub:'DogeDesigner: SpaceX Q2 AI compute contracts total $2.32B · Anthropic $1.25B (54%) · Google $920M (40%) · Reflection $150M (6%) · $2.6B annual pace · substance of Starmind exclusive NVDA partnership',
  cards:[{icon:'💻',big:'$2.32 B',mid:'AI compute Q2',sub:'3-company total'},{icon:'🏛️',big:'$1.25 B',mid:'Anthropic contract',sub:'54% share'},{icon:'🔍',big:'$920 M',mid:'Google contract',sub:'40% share'}],
  quoteLabel:'DOGEDESIGNER · SPCX Q2',quoteKo:'"SPCX Q2 AI $2.32B·Anthropic·Google·Reflection"',quoteEn:'"SpaceX Q2 AI compute $2.32B · Anthropic $1.25B · Google $920M · Reflection $150M · $2.6B annual pace"',
  source:'Source: DogeDesigner · SPCX Q2 · 2026.08.04',
  noteHead:'Why: Real revenue substance of orbital DC frame · Anthropic/Google confirmed using SPCX AI infra · basis for Musk +TSLA revenue',noteSub:'Watch: 3-company contract expansion · other hyper (MSFT/AMZN/NVDA) similar contracts · Starmind commercialization',footer:'SPCX AI Compute · $2.32B Q2',brand:BE}},

// 5. Musk 'SPCX insane $100' + 'Starship reusability solved'
{file:'musk-spcx-insane-100-starship-reusability',symbol:'SPCX',
 ko:{title:'Musk — "SPCX 주식 insane 매수 기회 ~$100" + "Starship rapid reusability 해결·기술 장벽 없음"',heroIcon:'💎',heroBig:'INSANE',heroSub:'Kalshi: Musk가 실적 콜에서 "SPCX 주식이 ~$100 근처에서 insane 매수 기회" 발언 · Sawyer Merritt: Musk가 "Starship rapid reusability 기술적으로 해결·데이터·시각 검사로 확인·기술 장벽 없음" 발언 · 사상 최저 종가 시세에서 극단 강세',
  cards:[{icon:'💎',big:'~$100',mid:'insane 매수 기회',sub:'Musk 실적 콜'},{icon:'🔁',big:'해결',mid:'Rapid reusability',sub:'기술 장벽 없음'},{icon:'📉',big:'최저 종가',mid:'-50% ATH 시세',sub:'극단 강세 발언'}],
  quoteLabel:'ELON MUSK · KALSHI · SAWYER MERRITT',quoteKo:'"SPCX 주식이 ~$100에서 insane 매수 기회 · Starship rapid reusability 해결·데이터/시각 검사로 확인·기술 장벽 없음"',quoteEn:'"SpaceX stock is an insane buying opportunity around $100 · Starship rapid reusability solved · confirmed by data / visual inspection · no technical obstacles"',
  source:'출처: Kalshi · Sawyer Merritt · Elon Musk · 2026.08.04',
  noteHead:'왜 중요한가: Q2 실적 대박 + 락업 해제 상황에서 CEO가 매수 기회로 프레임·Starship reusability 해결로 완전 재사용 실체 가까움',noteSub:'앞으로 볼 것: 시세 반응·Starship 실 재사용 페이스·kg당 발사비 감소·상용 매출 실체',footer:'SPCX Musk · $100 insane · reusability 해결',brand:BK},
 en:{title:'Musk — "SPCX Stock Insane Buying Opportunity ~$100" + "Starship Rapid Reusability Solved · No Technical Obstacles"',heroIcon:'💎',heroBig:'INSANE',heroSub:'Kalshi: Musk on earnings call: "SPCX stock is an insane buying opportunity around ~$100" · Sawyer Merritt: Musk says "Starship rapid reusability technically solved · confirmed by data / visual inspection · no technical obstacles" · extreme bull statements at record-low close',
  cards:[{icon:'💎',big:'~$100',mid:'Insane buy opportunity',sub:'Musk earnings call'},{icon:'🔁',big:'Solved',mid:'Rapid reusability',sub:'No technical obstacles'},{icon:'📉',big:'Record low',mid:'-50% ATH price',sub:'Extreme bull statement'}],
  quoteLabel:'ELON MUSK · KALSHI · SAWYER MERRITT',quoteKo:'"$100 insane 매수·Starship reusability 해결"',quoteEn:'"SpaceX stock is an insane buying opportunity around $100 · Starship rapid reusability solved · confirmed by data / visual inspection · no technical obstacles"',
  source:'Source: Kalshi · Sawyer Merritt · Elon Musk · 2026.08.04',
  noteHead:'Why: CEO frames as buying opportunity in Q2 blowout + lockup situation · Starship reusability solved brings full-reuse substance close',noteSub:'Watch: Price reaction · Starship actual reuse pace · per-kg launch cost drop · commercial revenue substance',footer:'SPCX Musk · $100 insane · reusability solved',brand:BE}},

// 6. PLTR Q2 blowout
{file:'pltr-q2-blowout-revenue-63-netincome-225',symbol:'PLTR',
 ko:{title:'PLTR Q2 실적 대박 — Revenue $1.94B(+63%)·Op Income +34%·Net Income +225%·EPS $0.14(컨센 $0.12)',heroIcon:'🎯',heroBig:'+225 %',heroSub:'Investing visuals: Palantir Q2 실적 · Revenue $1.94B(+63% YoY, 컨센 $1.87B) · Gross Profit $1.54B(+61%) · Operating Income $612M(+34%) · Net Income +225% · EPS $0.14(컨센 $0.12) · US Commercial $764M(vs $786M) · Government segment 강세',
  cards:[{icon:'💵',big:'$1.94 B',mid:'Revenue Q2',sub:'+63% YoY'},{icon:'📈',big:'+225 %',mid:'Net Income',sub:'YoY 급증'},{icon:'💰',big:'$0.14',mid:'EPS (컨센 $0.12)',sub:'+17% 비트'}],
  quoteLabel:'INVESTING VISUALS · PALANTIR',quoteKo:'"PLTR Q2 매출 +63%·Net Income +225%·EPS $0.14·US Commercial $764M·정부 강세"',quoteEn:'"PLTR Q2 Revenue +63% · Net Income +225% · EPS $0.14 · US Commercial $764M · government strength"',
  source:'출처: Investing visuals · Palantir · 2026.08.04',
  noteHead:'왜 중요한가: AI 소프트웨어 매출 폭발 실체·Government + Commercial 이중 축 확인·오늘 AMD·PLTR 대박이 하이퍼 사이클 확인',noteSub:'앞으로 볼 것: US Commercial 성장 지속·Government 계약 확대·AI 소프트웨어 이익률',footer:'PLTR Q2 · +63%·+225%',brand:BK},
 en:{title:'PLTR Q2 Blowout — Revenue $1.94B (+63%) · Op Income +34% · Net Income +225% · EPS $0.14 (est $0.12)',heroIcon:'🎯',heroBig:'+225 %',heroSub:'Investing visuals: Palantir Q2 · Revenue $1.94B (+63% YoY, est $1.87B) · Gross Profit $1.54B (+61%) · Operating Income $612M (+34%) · Net Income +225% · EPS $0.14 (est $0.12) · US Commercial $764M (vs $786M) · Government segment strong',
  cards:[{icon:'💵',big:'$1.94 B',mid:'Revenue Q2',sub:'+63% YoY'},{icon:'📈',big:'+225 %',mid:'Net Income',sub:'YoY surge'},{icon:'💰',big:'$0.14',mid:'EPS (est $0.12)',sub:'+17% beat'}],
  quoteLabel:'INVESTING VISUALS · PALANTIR',quoteKo:'"PLTR Q2 매출 +63%·Net Income +225%"',quoteEn:'"PLTR Q2 Revenue +63% · Net Income +225% · EPS $0.14 · US Commercial $764M · government strength"',
  source:'Source: Investing visuals · Palantir · 2026.08.04',
  noteHead:'Why: AI software revenue explosion substance · Government + Commercial dual-axis confirmed · today\'s AMD/PLTR blowout confirms hyper cycle',noteSub:'Watch: US Commercial growth continuity · Government contract expansion · AI software margins',footer:'PLTR Q2 · +63% · +225%',brand:BE}},

// 7. AMD Q2 blowout Data Center +107%
{file:'amd-q2-blowout-datacenter-107yoy',symbol:'AMD',
 ko:{title:'AMD Q2 실적 대박 — Revenue $7.68B(+32%)·EPS $1.66(컨센 $1.19, +40% 비트)·Data Center $6.78B(+107% YoY)',heroIcon:'🔥',heroBig:'+107 %',heroSub:'Investing visuals: AMD Q2 실적 · Revenue $7.68B(+32% YoY) · EPS $1.66(컨센 $1.19, +40% 비트) · **Data Center Revenue $6.78B(+107% YoY 2배)** · 데이터센터 매출 가속 지속 · MI300·MI400 AI GPU 채택 확대 확인',
  cards:[{icon:'🔥',big:'+107 %',mid:'Data Center YoY',sub:'$6.78B'},{icon:'💵',big:'$7.68 B',mid:'Total Revenue',sub:'+32% YoY'},{icon:'📈',big:'+40 %',mid:'EPS 비트',sub:'$1.66 vs $1.19'}],
  quoteLabel:'INVESTING VISUALS · AMD',quoteKo:'"AMD Q2 매출 +32%·EPS +40% 비트·Data Center +107% YoY 2배 성장·MI300 채택 확대"',quoteEn:'"AMD Q2 Revenue +32% · EPS +40% beat · Data Center +107% YoY doubling · MI300 adoption expanding"',
  source:'출처: Investing visuals · AMD · 2026.08.04',
  noteHead:'왜 중요한가: NVDA 대안 AMD MI300/MI400 실 매출 폭발·하이퍼스케일러 다변화·오늘 SPCX-NVDA exclusive와 대비',noteSub:'앞으로 볼 것: MI400 채택 확대·NVDA vs AMD 시장 점유율·CoWoS 캐파',footer:'AMD Q2 · Data Center +107%',brand:BK},
 en:{title:'AMD Q2 Blowout — Revenue $7.68B (+32%) · EPS $1.66 (est $1.19, +40% Beat) · Data Center $6.78B (+107% YoY)',heroIcon:'🔥',heroBig:'+107 %',heroSub:'Investing visuals: AMD Q2 · Revenue $7.68B (+32% YoY) · EPS $1.66 (est $1.19, +40% beat) · **Data Center Revenue $6.78B (+107% YoY doubling)** · datacenter revenue continues acceleration · MI300/MI400 AI GPU adoption expansion confirmed',
  cards:[{icon:'🔥',big:'+107 %',mid:'Data Center YoY',sub:'$6.78B'},{icon:'💵',big:'$7.68 B',mid:'Total Revenue',sub:'+32% YoY'},{icon:'📈',big:'+40 %',mid:'EPS beat',sub:'$1.66 vs $1.19'}],
  quoteLabel:'INVESTING VISUALS · AMD',quoteKo:'"AMD Q2 매출 +32%·EPS +40%·Data Center +107%"',quoteEn:'"AMD Q2 Revenue +32% · EPS +40% beat · Data Center +107% YoY doubling · MI300 adoption expanding"',
  source:'Source: Investing visuals · AMD · 2026.08.04',
  noteHead:'Why: NVDA alternative AMD MI300/MI400 real revenue explosion · hyperscaler diversification · contrast with today\'s SPCX-NVDA exclusive',noteSub:'Watch: MI400 adoption expansion · NVDA vs AMD market share · CoWoS capacity',footer:'AMD Q2 · Data Center +107%',brand:BE}},

// 8. TSLA China 93,579 July
{file:'tsla-china-july-93579-378yoy',symbol:'TSLA',
 ko:{title:'TSLA — China 7월 배송 93,579대·+37.8% YoY·2026 최고월·9개월 연속 성장 (CPCA)',heroIcon:'🇨🇳',heroBig:'93,579',heroSub:'Sawyer Merritt·CPCA(China Passenger Car Association) 데이터: Tesla China 7월 배송 93,579대·+37.8% YoY·2026 최고월·9개월 연속 성장 · China 7월 "massive" 93,175대 배송 표현 (TheSonOfWisley·소폭 다름) · 상하이 기가팩토리 성장 축 지속',
  cards:[{icon:'🇨🇳',big:'93,579 대',mid:'China 7월 배송',sub:'+37.8% YoY'},{icon:'📈',big:'9개월',mid:'연속 성장',sub:'꾸준한 상승'},{icon:'🏆',big:'2026 최고월',mid:'월간 신 기록',sub:'상하이 기가'}],
  quoteLabel:'SAWYER MERRITT · CPCA · POLYMARKET',quoteKo:'"Tesla China 7월 93,579대·+37.8% YoY·2026 최고월·9개월 연속 성장"',quoteEn:'"Tesla China July 93,579 deliveries · +37.8% YoY · best 2026 month · 9 straight months of growth"',
  source:'출처: Sawyer Merritt · CPCA · Polymarket · 2026.08.04',
  noteHead:'왜 중요한가: 8/3 상하이 400+ 중국 협업사·95% 부품 데이터의 실 판매 실체·글로벌 다각 회복 확인 (France·Colombia·China)',noteSub:'앞으로 볼 것: 8월 배송 지속·연말 배송 목표·CPCA 데이터 지속·상하이 캐파 확장',footer:'TSLA China 7월 · 93,579·+37.8%',brand:BK},
 en:{title:'TSLA — China July Deliveries 93,579 · +37.8% YoY · Best 2026 Month · 9 Straight Months of Growth (CPCA)',heroIcon:'🇨🇳',heroBig:'93,579',heroSub:'Sawyer Merritt · CPCA (China Passenger Car Association) data: Tesla China July 93,579 deliveries · +37.8% YoY · best 2026 month · 9 straight months of growth · China July "massive" 93,175 (TheSonOfWisley, minor diff) · Shanghai Gigafactory growth axis sustained',
  cards:[{icon:'🇨🇳',big:'93,579 units',mid:'China July deliveries',sub:'+37.8% YoY'},{icon:'📈',big:'9 months',mid:'Straight growth',sub:'Steady rise'},{icon:'🏆',big:'2026 best',mid:'Monthly record',sub:'Shanghai Giga'}],
  quoteLabel:'SAWYER MERRITT · CPCA · POLYMARKET',quoteKo:'"China 7월 93,579·+37.8%·9개월 연속"',quoteEn:'"Tesla China July 93,579 deliveries · +37.8% YoY · best 2026 month · 9 straight months of growth"',
  source:'Source: Sawyer Merritt · CPCA · Polymarket · 2026.08.04',
  noteHead:'Why: Real sales substance of 8/3 Shanghai 400+ Chinese suppliers / 95% parts data · confirms global multi-axis recovery (France/Colombia/China)',noteSub:'Watch: August deliveries continuity · year-end delivery targets · CPCA data continuity · Shanghai capacity expansion',footer:'TSLA China July · 93,579 · +37.8%',brand:BE}},

// 9. TSLA Terafab Grimes County $10M
{file:'tsla-terafab-grimes-10m-property-tax',symbol:'TSLA',
 ko:{title:'TSLA/Musk — Grimes County(Terafab) $10M 조기 지불·2026 지방세 26.5M의 40%·인프라 대규모 확대',heroIcon:'🏗️',heroBig:'$10 M',heroSub:'DogeDesigner: Musk가 Grimes County에 $10M 조기 지불 · Terafab agreement의 일환 · County 2026 예상 지방세 $26.5M의 40% 규모 · County 리더가 인프라 개선에 활용 예정 · Terafab 프로젝트의 대규모 실체 확대',
  cards:[{icon:'🏗️',big:'$10 M',mid:'조기 지불',sub:'Grimes County · Terafab'},{icon:'📊',big:'40 %',mid:'County 2026 지방세',sub:'$26.5M 중'},{icon:'🚧',big:'인프라 확대',mid:'County 리더 활용',sub:'대규모 개선'}],
  quoteLabel:'DOGEDESIGNER · GRIMES COUNTY',quoteKo:'"Musk가 Terafab agreement에 따라 Grimes County에 $10M 조기 지불·2026 지방세 40% 규모"',quoteEn:'"Elon Musk paid Grimes County $10M ahead of schedule under Terafab agreement · 40% of county 2026 expected property tax"',
  source:'출처: DogeDesigner · Grimes County · 2026.08.04',
  noteHead:'왜 중요한가: Terafab(Tesla 신 프로젝트) 실 진전·Grimes County 인프라 확대·2026 세수 크게 기여',noteSub:'앞으로 볼 것: Terafab 프로젝트 세부·완공 시점·다른 지역 유사 딜',footer:'TSLA Terafab · $10M 조기 지불',brand:BK},
 en:{title:'TSLA/Musk — $10M Ahead-of-Schedule Payment to Grimes County · 40% of 2026 Property Tax · Infrastructure Expansion',heroIcon:'🏗️',heroBig:'$10 M',heroSub:'DogeDesigner: Musk paid Grimes County $10M ahead of schedule · part of Terafab agreement · 40% of County\'s $26.5M expected 2026 property tax · County leaders to use for infrastructure improvements · Terafab project large-scale substance expansion',
  cards:[{icon:'🏗️',big:'$10 M',mid:'Ahead-of-schedule payment',sub:'Grimes County · Terafab'},{icon:'📊',big:'40 %',mid:'County 2026 property tax',sub:'of $26.5M'},{icon:'🚧',big:'Infrastructure',mid:'County leaders use',sub:'Large-scale improvement'}],
  quoteLabel:'DOGEDESIGNER · GRIMES COUNTY',quoteKo:'"Terafab agreement·$10M 조기 지불·40% 지방세"',quoteEn:'"Elon Musk paid Grimes County $10M ahead of schedule under Terafab agreement · 40% of county 2026 expected property tax"',
  source:'Source: DogeDesigner · Grimes County · 2026.08.04',
  noteHead:'Why: Terafab (new Tesla project) real progress · Grimes County infrastructure expansion · significant 2026 tax revenue contribution',noteSub:'Watch: Terafab project details · completion timing · similar deals in other regions',footer:'TSLA Terafab · $10M early payment',brand:BE}},

// 10. TSLA Netherlands/Belgium FSD trial
{file:'tsla-netherlands-belgium-fsd-2month-trial',symbol:'TSLA',
 ko:{title:'TSLA — Netherlands·Belgium 2개월 FSD(Supervised) 트라이얼 시작·Model Y·10월 초 종료·데이터 flywheel 확대',heroIcon:'🇳🇱',heroBig:'2 개월',heroSub:'Tesla Netherlands 공식: Nederland·Belgium 대상 2개월 FSD(Supervised) 무료 트라이얼 시작 · Model Y 오너 대상 · 10월 초 종료 · Real-world 경험 확대·이슈 개선·데이터 flywheel 강화 목적 · EU FSD 확대의 실체 축',
  cards:[{icon:'🇳🇱',big:'2 개월',mid:'FSD 무료 트라이얼',sub:'Netherlands·Belgium'},{icon:'🚗',big:'Model Y',mid:'대상 차량',sub:'오너'},{icon:'📅',big:'10월 초',mid:'트라이얼 종료',sub:'2개월 후'}],
  quoteLabel:'TESLA NETHERLANDS 공식',quoteKo:'"Netherlands·Belgium 오늘부터 2개월 FSD 무료 트라이얼·Model Y·10월 초 종료·데이터 flywheel 확대"',quoteEn:'"Netherlands and Belgium start 2-month FSD (Supervised) trial today · Model Y · ends early October · data flywheel expansion"',
  source:'출처: Tesla Netherlands 공식 · Ruttenl · 2026.08.04',
  noteHead:'왜 중요한가: 8/4 WMC 프레임 (EU FSD 승인 vs 로컬 자동차 회사)의 실 확장·8/3 France +86% 회복과 결합',noteSub:'앞으로 볼 것: 트라이얼 후 유료 전환율·다른 EU 국가 확대·Germany·France 언제',footer:'TSLA Netherlands · 2개월 FSD',brand:BK},
 en:{title:'TSLA — Netherlands/Belgium 2-Month FSD (Supervised) Trial Starts · Model Y · Ends Early October · Data Flywheel Expansion',heroIcon:'🇳🇱',heroBig:'2 months',heroSub:'Tesla Netherlands official: 2-month FSD (Supervised) free trial starts in Netherlands/Belgium · for Model Y owners · ends early October · real-world experience expansion · issue improvement · data flywheel strengthening · substance axis of EU FSD expansion',
  cards:[{icon:'🇳🇱',big:'2 months',mid:'FSD free trial',sub:'Netherlands·Belgium'},{icon:'🚗',big:'Model Y',mid:'Target vehicles',sub:'Owners'},{icon:'📅',big:'Early Oct',mid:'Trial end',sub:'After 2 months'}],
  quoteLabel:'TESLA NETHERLANDS OFFICIAL',quoteKo:'"Netherlands·Belgium 2개월 FSD 트라이얼·Model Y·10월 초"',quoteEn:'"Netherlands and Belgium start 2-month FSD (Supervised) trial today · Model Y · ends early October · data flywheel expansion"',
  source:'Source: Tesla Netherlands official · Ruttenl · 2026.08.04',
  noteHead:'Why: Real expansion of 8/4 WMC frame (EU FSD approval vs local auto makers) · combines with 8/3 France +86% recovery',noteSub:'Watch: Post-trial paid conversion rate · other EU country expansion · Germany/France timing',footer:'TSLA Netherlands · 2-month FSD',brand:BE}},

// 11. WMC TSLA FSD 1.5M MAU
{file:'tsla-fsd-15m-mau-wmc-1000x-frame',symbol:'TSLA',
 ko:{title:'TSLA — FSD 월 활성 사용자 150만·연 2,600만 마일·세계 인구 0.02%·1,000배 성장 여력 프레임 (WMC)',heroIcon:'👥',heroBig:'1.5 M',heroSub:'Whole Mars Catalog: Tesla Self-Driving 월 활성 사용자 150만 (1-2M 추정·연 2,600만 마일 기반) · 세계 인구 80억 대비 0.02% 수준 · 향후 1,000배 성장 여력 프레임 · 8/4 FSD 130억 마일과 결합',
  cards:[{icon:'👥',big:'1.5 M',mid:'FSD 월 활성 사용자',sub:'1-2M 추정'},{icon:'📊',big:'0.02 %',mid:'세계 인구 대비',sub:'80억 중'},{icon:'🚀',big:'1,000 배',mid:'성장 여력',sub:'WMC 프레임'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"Tesla Self-Driving 월 활성 사용자 150만·세계 인구 0.02%·1,000배 빠르게 성장 예상"',quoteEn:'"Tesla Self-Driving 1.5M monthly active users · 0.02% of world population · going to grow 1,000× very quickly"',
  source:'출처: Whole Mars Catalog · 2026.08.04',
  noteHead:'왜 중요한가: 8/4 FSD 130억 마일 데이터의 사용자 관점·8/4 Wood $10T·오늘 Netherlands 트라이얼과 결합',noteSub:'앞으로 볼 것: MAU 증가 속도·유료 사용자 비율·글로벌 확장 페이스',footer:'TSLA FSD MAU · 1.5M · 1,000배 여력',brand:BK},
 en:{title:'TSLA — FSD Monthly Active Users 1.5M · Annual 26M Miles · 0.02% of World Population · 1,000× Growth Runway Frame (WMC)',heroIcon:'👥',heroBig:'1.5 M',heroSub:'Whole Mars Catalog: Tesla Self-Driving monthly active users 1.5M (1-2M estimated · based on 26M annual miles) · 0.02% vs 8B world population · 1,000× growth runway frame · combines with 8/4 FSD 13B miles',
  cards:[{icon:'👥',big:'1.5 M',mid:'FSD monthly active',sub:'1-2M estimated'},{icon:'📊',big:'0.02 %',mid:'vs world population',sub:'of 8B'},{icon:'🚀',big:'1,000×',mid:'Growth runway',sub:'WMC frame'}],
  quoteLabel:'WHOLE MARS CATALOG',quoteKo:'"FSD MAU 150만·세계 인구 0.02%·1,000배 성장"',quoteEn:'"Tesla Self-Driving 1.5M monthly active users · 0.02% of world population · going to grow 1,000× very quickly"',
  source:'Source: Whole Mars Catalog · 2026.08.04',
  noteHead:'Why: User perspective of 8/4 FSD 13B miles data · combines with 8/4 Wood $10T · today Netherlands trial',noteSub:'Watch: MAU growth pace · paid-user ratio · global expansion pace',footer:'TSLA FSD MAU · 1.5M · 1,000× runway',brand:BE}},

// 12. AMZN Bezos $4.07B sale
{file:'amzn-bezos-4b-sale-15m-shares',symbol:'AMZN',
 ko:{title:'AMZN — Jeff Bezos가 15M주 $4.07B 매도 계획 filed·1994년 설립자 지분',heroIcon:'💰',heroBig:'$4.07 B',heroSub:'Evan D·Barchart: Amazon Jeff Bezos가 15M주 매도 계획을 어제 filed · 총액 ~$4.07B 규모 · 1994년 7월 Amazon 창립 시 취득한 설립자 stock · 오늘 AMZN OpenAI $50B 완료 시점에 나온 매도 뉴스',
  cards:[{icon:'💰',big:'$4.07 B',mid:'매도 금액',sub:'15M주'},{icon:'📅',big:'1994년',mid:'설립자 취득',sub:'창립 시'},{icon:'📢',big:'filed',mid:'어제 계획 공시',sub:'SEC Form 144'}],
  quoteLabel:'EVAN D · BARCHART · SEC',quoteKo:'"Jeff Bezos가 15M주 매도 계획 filed·총액 ~$4.07B·1994년 창립 시 설립자 stock"',quoteEn:'"Jeff Bezos filed to sell up to 15M shares of Amazon · ~$4.07B · founder stock from July 1994"',
  source:'출처: Evan D · Barchart · SEC Form 144 · 2026.08.04',
  noteHead:'왜 중요한가: 오늘 AMZN OpenAI $50B 완료 시점에 나온 대규모 매도·insider 매도 30년 최고 흐름 지속',noteSub:'앞으로 볼 것: 실 매도 시점·AMZN 시세 반응·Bezos 후속 매도 가능성',footer:'AMZN Bezos · $4.07B 매도 filed',brand:BK},
 en:{title:'AMZN — Jeff Bezos Files to Sell 15M Shares Worth $4.07B · Founder Stock from 1994',heroIcon:'💰',heroBig:'$4.07 B',heroSub:'Evan D · Barchart: Amazon Jeff Bezos filed yesterday to sell up to 15M shares · ~$4.07B total · founder stock acquired at Amazon founding in July 1994 · sale news arriving at today\'s AMZN OpenAI $50B completion',
  cards:[{icon:'💰',big:'$4.07 B',mid:'Sale value',sub:'15M shares'},{icon:'📅',big:'1994',mid:'Founder acquisition',sub:'At founding'},{icon:'📢',big:'Filed',mid:'Yesterday plan',sub:'SEC Form 144'}],
  quoteLabel:'EVAN D · BARCHART · SEC',quoteKo:'"Bezos 15M주·$4.07B 매도 filed"',quoteEn:'"Jeff Bezos filed to sell up to 15M shares of Amazon · ~$4.07B · founder stock from July 1994"',
  source:'Source: Evan D · Barchart · SEC Form 144 · 2026.08.04',
  noteHead:'Why: Large sale at today\'s AMZN OpenAI $50B completion · continues insider selling 30-yr high flow',noteSub:'Watch: Actual sale timing · AMZN price reaction · Bezos follow-on sale possibility',footer:'AMZN Bezos · $4.07B sale filed',brand:BE}},

// 13. Citadel 7월 강세장 재정
{file:'macro-citadel-july-reset-bull-market',symbol:'MACRO',
 ko:{title:'매크로 — Citadel Scott Rutner "7월 매도는 강세장 재정·종료 아님"·AI/반도체 heavy sold·레버리지 ETF -$10B',heroIcon:'🔄',heroBig:'RESET',heroSub:'Walter Bloomberg: Citadel Scott Rutner "7월 sharp selloff·sector rotation이 excessive positioning을 정리했지만 broader bull market은 유지" · AI·반도체 heavy sold·leveraged ETF assets -$10B (6월 정점에서) · 이제 투자자는 positioning보다 기본에 focus 가능',
  cards:[{icon:'🔄',big:'RESET',mid:'강세장 재정',sub:'종료 아님'},{icon:'📉',big:'-$10 B',mid:'레버리지 ETF',sub:'6월 정점 대비'},{icon:'🎯',big:'기본 focus',mid:'positioning 정리 후',sub:'기업 fundamentals'}],
  quoteLabel:'CITADEL SCOTT RUTNER · WALTER BLOOMBERG',quoteKo:'"7월은 구조적 강세장을 바꾸지 않았다·재정했을 뿐이다·투자자는 이제 positioning보다 기본에 focus"',quoteEn:'"July did not change the structural bull market · it reset it · investors can now focus more on company fundamentals than positioning"',
  source:'출처: Walter Bloomberg · Citadel Scott Rutner · 2026.08.04',
  noteHead:'왜 중요한가: 8/4 매크로 완화·헤지 US 순매수 최대와 정합·8/1 매크로 부담이 정리·강세장 지속 프레임 확정',noteSub:'앞으로 볼 것: 8월 지속 반등·기본 focus 실 반영·PLTR·AMD·SPCX·MSFT 실적 반응',footer:'MACRO Citadel · 7월 강세 재정',brand:BK},
 en:{title:'MACRO — Citadel Scott Rutner "July Selloff Reset the Bull Market, Not Ended It" · AI/Semi Heavy Sold · Leveraged ETF -$10B',heroIcon:'🔄',heroBig:'RESET',heroSub:'Walter Bloomberg: Citadel Scott Rutner "July sharp selloff / sector rotation cleared out excessive positioning without breaking broader bull market" · AI/semi heavy sold · leveraged ETF assets -$10B (from June peak) · investors can now focus on fundamentals over positioning',
  cards:[{icon:'🔄',big:'RESET',mid:'Bull market reset',sub:'Not ended'},{icon:'📉',big:'-$10 B',mid:'Leveraged ETF',sub:'vs June peak'},{icon:'🎯',big:'Focus fundamentals',mid:'After positioning cleared',sub:'company basics'}],
  quoteLabel:'CITADEL SCOTT RUTNER · WALTER BLOOMBERG',quoteKo:'"7월이 구조 강세를 바꾸지 않고 재정했을 뿐"',quoteEn:'"July did not change the structural bull market · it reset it · investors can now focus more on company fundamentals than positioning"',
  source:'Source: Walter Bloomberg · Citadel Scott Rutner · 2026.08.04',
  noteHead:'Why: Consistent with 8/4 macro relief / hedge US net long max · 8/1 macro burden cleared · bull-market-continuity frame confirmed',noteSub:'Watch: August continued rebound · fundamentals-focus actual reflection · PLTR/AMD/SPCX/MSFT earnings reaction',footer:'MACRO Citadel · July Bull Reset',brand:BE}},

// 14. Apple vs OpenAI preliminary injunction
{file:'aapl-openai-preliminary-injunction-trade-secrets',symbol:'AAPL',
 ko:{title:'AAPL — OpenAI 상대 preliminary injunction 청구·trade secrets 도난 소송·전 Apple 직원 Chang Liu OpenAI 이직 후 수천 페이지 절도 주장',heroIcon:'⚖️',heroBig:'INJUNCTION',heroSub:'unusual_whales BREAKING: Apple이 OpenAI 상대로 preliminary injunction·permanent supervision 청구 · 9개 진술서·28페이지 memorandum·expedited discovery 요구 · Chang Liu (8년 Apple 근무, 현 OpenAI "Member of Technical Staff")가 Apple trade secrets 2000+ 페이지 노출 주장·2020 Feb에 Apple 근무 중 다운로드 정황',
  cards:[{icon:'⚖️',big:'INJUNCTION',mid:'Preliminary',sub:'+ Permanent supervision'},{icon:'📄',big:'2,000 +',mid:'Trade secrets 페이지',sub:'Chang Liu 노출 주장'},{icon:'👤',big:'Chang Liu',mid:'8년 Apple → OpenAI',sub:'Member of Tech Staff'}],
  quoteLabel:'UNUSUAL_WHALES · APPLE SEC FILING',quoteKo:'"Apple이 OpenAI에 대해 preliminary injunction 청구·trade secrets 절도 주장·9개 진술서·2000+ 페이지 노출"',quoteEn:'"Apple filed preliminary injunction against OpenAI · trade secrets theft allegations · 9 sworn declarations · 2,000+ pages exposed"',
  source:'출처: unusual_whales · Apple SEC filing · 2026.08.04',
  noteHead:'왜 중요한가: 하이퍼-프런티어 AI 갈등 실체·Apple-OpenAI 관계 파열·Chang Liu 개별 케이스가 대규모 노출 시나리오',noteSub:'앞으로 볼 것: 법원 판결·OpenAI 대응·Apple-OpenAI 협업 재검토·다른 AI 회사 인력 이동 규제',footer:'AAPL vs OpenAI · Injunction 청구',brand:BK},
 en:{title:'AAPL — Files Preliminary Injunction Against OpenAI · Trade Secrets Theft Lawsuit · Former Apple Employee Chang Liu Alleged Theft of Thousands of Pages After OpenAI Move',heroIcon:'⚖️',heroBig:'INJUNCTION',heroSub:'unusual_whales BREAKING: Apple filed preliminary injunction + permanent supervision request against OpenAI · 9 sworn declarations · 28-page memorandum · expedited discovery motion · Chang Liu (8 years Apple, now OpenAI "Member of Technical Staff") alleged to have exposed 2,000+ pages of Apple trade secrets · downloaded during Feb 2020 Apple employment',
  cards:[{icon:'⚖️',big:'INJUNCTION',mid:'Preliminary',sub:'+ Permanent supervision'},{icon:'📄',big:'2,000 +',mid:'Trade secret pages',sub:'Chang Liu alleged'},{icon:'👤',big:'Chang Liu',mid:'8-year Apple → OpenAI',sub:'Member of Tech Staff'}],
  quoteLabel:'UNUSUAL_WHALES · APPLE SEC FILING',quoteKo:'"Apple → OpenAI preliminary injunction·2000+ 페이지 노출 주장"',quoteEn:'"Apple filed preliminary injunction against OpenAI · trade secrets theft allegations · 9 sworn declarations · 2,000+ pages exposed"',
  source:'Source: unusual_whales · Apple SEC filing · 2026.08.04',
  noteHead:'Why: Substance of hyper-frontier AI conflict · Apple-OpenAI relationship rupture · Chang Liu individual case as large-exposure scenario',noteSub:'Watch: Court ruling · OpenAI response · Apple-OpenAI collab re-evaluation · other AI companies personnel-movement regulation',footer:'AAPL vs OpenAI · Injunction filed',brand:BE}},

// 15. Oracle default risk + US China AI DC ban
{file:'macro-oracle-cds-record-china-ai-dc-ban',symbol:'MACRO',
 ko:{title:'매크로 — Oracle 부도 리스크(CDS) 2008 정점 초과 사상 최고 + 미국 중국 AI 데이터센터 운영 금지 초안',heroIcon:'⚠️',heroBig:'CDS ATH',heroSub:'Barchart: Oracle의 부도 리스크가 2008 Global Financial Crisis 정점을 넘어 사상 최고·"Oracle Warning of 2008" 프레임 · Evan D: 미국이 중국 AI 데이터센터 운영 금지 초안 준비 · Oracle CAPEX 매출 50%(8/3)와 결합해 하이퍼 CAPEX 우려 강화',
  cards:[{icon:'⚠️',big:'CDS ATH',mid:'Oracle 부도 리스크',sub:'2008 정점 초과'},{icon:'🇨🇳',big:'BAN 초안',mid:'중국 AI DC 운영',sub:'미국 준비'},{icon:'📊',big:'50 % CAPEX',mid:'Oracle 매출 대비',sub:'8/3 리포트'}],
  quoteLabel:'BARCHART · EVAN D',quoteKo:'"Oracle 부도 리스크(CDS)가 2008 정점 초과 사상 최고 · 미국 중국 AI 데이터센터 운영 금지 초안 준비"',quoteEn:'"Oracle default risk (CDS) surpassed 2008 GFC peak to record high · US drafting ban on China AI datacenter operation"',
  source:'출처: Barchart · Evan D · 2026.08.04',
  noteHead:'왜 중요한가: 8/3 Oracle CAPEX 50% 매출 우려의 실 부도 리스크 실체·미-중 AI 갈등 확대·8/4 매크로 반전과 대비',noteSub:'앞으로 볼 것: Oracle 실 부도 리스크 vs AI 매출 회수·중국 AI DC 금지 실 발효 시점',footer:'MACRO Oracle CDS · China AI DC 금지',brand:BK},
 en:{title:'MACRO — Oracle Default Risk (CDS) Surpasses 2008 Peak to Record High + US Drafting Ban on China AI Datacenter Operation',heroIcon:'⚠️',heroBig:'CDS ATH',heroSub:'Barchart: Oracle default risk surpassed 2008 Global Financial Crisis peak to record high · "Oracle Warning of 2008" frame · Evan D: US preparing ban draft on China AI datacenter operation · combines with Oracle CAPEX 50% of revenue (8/3) to strengthen hyper CAPEX concerns',
  cards:[{icon:'⚠️',big:'CDS ATH',mid:'Oracle default risk',sub:'Surpasses 2008 peak'},{icon:'🇨🇳',big:'BAN Draft',mid:'China AI DC operation',sub:'US preparing'},{icon:'📊',big:'50 % CAPEX',mid:'Oracle rev basis',sub:'8/3 report'}],
  quoteLabel:'BARCHART · EVAN D',quoteKo:'"Oracle CDS 2008 초과·중국 AI DC 금지 초안"',quoteEn:'"Oracle default risk (CDS) surpassed 2008 GFC peak to record high · US drafting ban on China AI datacenter operation"',
  source:'Source: Barchart · Evan D · 2026.08.04',
  noteHead:'Why: Real default-risk substance of 8/3 Oracle CAPEX 50% revenue concerns · US-China AI conflict expansion · contrast with 8/4 macro reversal',noteSub:'Watch: Oracle real default risk vs AI revenue recovery · China AI DC ban actual effect timing',footer:'MACRO Oracle CDS · China AI DC ban',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260805.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260805-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
