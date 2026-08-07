// 2026-08-08 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.08';

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
// 1. SPCX 락업 8/8 첫 unlock 일정
{file:'spcx-lockup-schedule-88-first-unlock',symbol:'SPCX',
 ko:{title:'SPCX — 락업 해제 8/8 첫 실행·10월까지 20% 유통·1월 Elon 46%·9월 2027 +40% 확장',heroIcon:'📅',heroBig:'8/8',heroSub:'Evan D: SPCX 락업 상세 일정 공개·IPO 초기 float 5%·8/8 첫 unlock ~5%·10월까지 20% 유통·1월 2027 Elon/Founder 46%·9월 2027 +40% 확장·다층 unlock 흐름 명확',
  cards:[{icon:'📅',big:'8/8',mid:'첫 unlock',sub:'~5% 유통'},{icon:'📊',big:'20 %',mid:'10월까지',sub:'단계적 유통 확대'},{icon:'👤',big:'1월 46 %',mid:'Elon·Founder unlock',sub:'2027'}],
  quoteLabel:'EVAN D · SPACEXNEWZ',quoteKo:'"8/8 첫 unlock ~5%·10월까지 20%·1월 2027 Elon 46%·9월 2027 +40%"',quoteEn:'"Aug 8 first unlock ~5% · 20% by Oct · Jan 2027 Elon/founder 46% · Sep 2027 +40%"',
  source:'출처: Evan D · spacexNewz · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 락업 unlock $100B·+6% 반등의 첫 실 시행일·시장 흡수 시험 실체 시작',noteSub:'앞으로 볼 것: 8/8 이후 실 매도 volume·10월까지 20% 흡수·1월 Elon unlock 반응',footer:'SPCX 락업 · 8/8 · 46% 1월',brand:BK},
 en:{title:'SPCX — Lockup Unlock First Execution on Aug 8 · 20% Float by Oct · Elon 46% in Jan · +40% Expansion in Sep 2027',heroIcon:'📅',heroBig:'8/8',heroSub:'Evan D: SPCX lockup schedule disclosed · IPO initial float 5% · Aug 8 first unlock ~5% · 20% float by October · Jan 2027 Elon/founder 46% · Sep 2027 +40% expansion · multi-stage unlock flow clear',
  cards:[{icon:'📅',big:'8/8',mid:'First unlock',sub:'~5% float'},{icon:'📊',big:'20 %',mid:'By October',sub:'Staged expansion'},{icon:'👤',big:'46 % Jan',mid:'Elon·Founder unlock',sub:'2027'}],
  quoteLabel:'EVAN D · SPACEXNEWZ',quoteKo:'"8/8 첫 unlock·10월 20%·1월 46%·9월 2027 +40%"',quoteEn:'"Aug 8 first unlock ~5% · 20% by Oct · Jan 2027 Elon/founder 46% · Sep 2027 +40%"',
  source:'Source: Evan D · spacexNewz · 2026.08.07',
  noteHead:'Why: First real execution day of 8/7 lockup unlock $100B / +6% rebound · market absorption test begins for real',noteSub:'Watch: Post-Aug-8 actual sell volume · 20% absorption by October · Jan Elon unlock reaction',footer:'SPCX Lockup · 8/8 · 46% Jan',brand:BE}},

// 2. SPCX 락업 $100B unlock · 34% shorts
{file:'spcx-lockup-100b-shorts-34pct-close',symbol:'SPCX',
 ko:{title:'SPCX — 락업 unlock $100B·$91.5M shares·34% float shorted·shorts close·시세 상승',heroIcon:'📈',heroBig:'34 %',heroSub:'Bull Theory: SPCX 락업 unlock 총 ~$100B·어제(8/7) $91.5M shares eligible·기존 free float 1.4배 규모·34% float shorted (unlock 앞두고 short 헤지)·이제 shorts close·시세 상승 시작',
  cards:[{icon:'📈',big:'34 %',mid:'float shorted',sub:'unlock 앞두고 헤지'},{icon:'🔄',big:'Shorts close',mid:'이제 청산 시작',sub:'매수 압력'},{icon:'📊',big:'$91.5 M',mid:'shares 유통',sub:'8/7 eligible'}],
  quoteLabel:'BULL THEORY',quoteKo:'"SPCX 락업 unlock $91.5M shares·34% float shorted·shorts close·시세 상승"',quoteEn:'"SPCX lockup unlock $91.5M shares · 34% float shorted · shorts close · stock rising"',
  source:'출처: Bull Theory · 2026.08.07',
  noteHead:'왜 중요한가: 34% shorts close = 강력한 매수 압력·8/7 +6% 반등의 실 근거·8/8 첫 unlock에도 시세 지속 상승 시나리오',noteSub:'앞으로 볼 것: shorts close 지속·40% 유통까지 12월 페이스·시세 반등 continuity',footer:'SPCX shorts 34% close · 반등',brand:BK},
 en:{title:'SPCX — Lockup Unlock $100B · $91.5M Shares Eligible · 34% Float Shorted · Shorts Close · Stock Rising',heroIcon:'📈',heroBig:'34 %',heroSub:'Bull Theory: SPCX lockup unlock total ~$100B · $91.5M shares eligible yesterday (8/7) · 1.4× free float · 34% float shorted (pre-unlock hedging) · shorts closing · stock rising',
  cards:[{icon:'📈',big:'34 %',mid:'Float shorted',sub:'Pre-unlock hedge'},{icon:'🔄',big:'Shorts close',mid:'Cover starts',sub:'Buy pressure'},{icon:'📊',big:'$91.5 M',mid:'Shares eligible',sub:'Aug 7'}],
  quoteLabel:'BULL THEORY',quoteKo:'"$91.5M shares·34% shorted·close"',quoteEn:'"SPCX lockup unlock $91.5M shares · 34% float shorted · shorts close · stock rising"',
  source:'Source: Bull Theory · 2026.08.07',
  noteHead:'Why: 34% shorts close = strong buy pressure · real basis for 8/7 +6% rebound · scenario for continued gains despite Aug 8 first unlock',noteSub:'Watch: Shorts close continuity · 40% float by December · rebound continuity',footer:'SPCX Shorts 34% Close · Rebound',brand:BE}},

// 3. JPMorgan SPCX $180 target
{file:'jpmorgan-spcx-180-target-raise',symbol:'SPCX',
 ko:{title:'SPCX — JPMorgan 목표가 $180 상향·mega bank 신규 커버리지·기관 flow 촉진',heroIcon:'💎',heroBig:'$180',heroSub:'Kalshi: JPMorgan이 SPCX 목표가 $180으로 상향·현재 시가 $111 대비 +62% upside·mega bank의 강력 buy 신호·8/6 -10%·8/7 +6% 반등 흐름에 강한 기관 추가 지원',
  cards:[{icon:'💎',big:'$180',mid:'JPM 목표가',sub:'현재 $111 대비 +62%'},{icon:'🏦',big:'Mega bank',mid:'JPMorgan buy 신호',sub:'기관 flow 촉진'},{icon:'📈',big:'+62 %',mid:'upside potential',sub:'시가 기준'}],
  quoteLabel:'KALSHI · JPMORGAN',quoteKo:'"JPMorgan이 SpaceX 목표가 $180 상향"',quoteEn:'"JPMorgan raises price target on SpaceX to $180"',
  source:'출처: Kalshi · JPMorgan · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Ackman 개인 매수·오늘 JPM $180 = 대형 매니저 + mega bank 동시 강세 시그널·기관 flow 다각 확대',noteSub:'앞으로 볼 것: 다른 sell-side 목표가·Goldman·MS 등 커버리지·기관 flow 실체',footer:'SPCX JPM $180 · +62% upside',brand:BK},
 en:{title:'SPCX — JPMorgan Raises Price Target to $180 · Mega Bank New Coverage · Institutional Flow Catalyst',heroIcon:'💎',heroBig:'$180',heroSub:'Kalshi: JPMorgan raises SPCX target to $180 · vs current $111 = +62% upside · mega bank strong buy signal · after 8/6 -10% / 8/7 +6% rebound flow · institutional support strengthens',
  cards:[{icon:'💎',big:'$180',mid:'JPM target',sub:'vs $111 = +62%'},{icon:'🏦',big:'Mega bank',mid:'JPMorgan buy signal',sub:'Institutional catalyst'},{icon:'📈',big:'+62 %',mid:'Upside potential',sub:'From current price'}],
  quoteLabel:'KALSHI · JPMORGAN',quoteKo:'"JPMorgan SPCX $180 상향"',quoteEn:'"JPMorgan raises price target on SpaceX to $180"',
  source:'Source: Kalshi · JPMorgan · 2026.08.07',
  noteHead:'Why: 8/7 Ackman personal buy + today JPM $180 = large manager + mega bank simultaneous bull signal · institutional flow multi-axis expansion',noteSub:'Watch: Other sell-side targets · Goldman/MS coverage · actual institutional flow',footer:'SPCX JPM $180 · +62% Upside',brand:BE}},

// 4. GOOGL Q2 13-F SPCX $100M + AST + Anthropic
{file:'googl-q2-13f-spcx-100m-ast-anthropic',symbol:'GOOGL',
 ko:{title:'GOOGL — Q2 13-F filing 공개·SPCX 102M shares(~$100M) 신규·Planet·AST SpaceMobile·Anthropic·AI 다각 지분',heroIcon:'📊',heroBig:'13-F',heroSub:'Evan D·Quiver Quantitative: Google이 Q2 13-F filing에서 SpaceX 102M shares(~$100M)·Planet Labs 71M·AST SpaceMobile 17M·Anthropic 15M·Palantir·ARM·Cerebras 등 우주·AI 종목 다각 보유·mega-cap이 SPCX에 실 지분 확인',
  cards:[{icon:'🚀',big:'102 M shares',mid:'SPCX ~$100M',sub:'Google 신규 보유'},{icon:'🛰️',big:'AST SpaceMobile',mid:'17M shares',sub:'우주 통신'},{icon:'🤖',big:'Anthropic',mid:'15M shares',sub:'AI 축'}],
  quoteLabel:'EVAN D · QUIVER QUANTITATIVE',quoteKo:'"Google Q2 13-F: SpaceX $100M·AST·Planet·Anthropic·Palantir·Cerebras 등 우주·AI 다각 지분"',quoteEn:'"Google Q2 13-F: SpaceX $100M · AST SpaceMobile · Planet · Anthropic · Palantir · Cerebras multi-axis stakes"',
  source:'출처: Evan D · Quiver Quantitative · 2026.08.07',
  noteHead:'왜 중요한가: 8/6 GOOGL AAPL 초과 #2·8/7 $25B 채권 발행에 이어 오늘 우주·AI 지분 다각화 확인·mega-cap 투자 전략 실체',noteSub:'앞으로 볼 것: SPCX 지분 확대·다른 하이퍼 유사 filing·13-F 다음 분기 변화',footer:'GOOGL 13-F · SPCX·AI 다각',brand:BK},
 en:{title:'GOOGL — Q2 13-F Filing Discloses SpaceX 102M Shares (~$100M) · Planet · AST SpaceMobile · Anthropic · Multi-Axis AI Stakes',heroIcon:'📊',heroBig:'13-F',heroSub:'Evan D · Quiver Quantitative: Google Q2 13-F filing shows SpaceX 102M shares (~$100M) · Planet Labs 71M · AST SpaceMobile 17M · Anthropic 15M · Palantir · ARM · Cerebras multi-axis space/AI holdings · mega-cap confirms real SPCX stake',
  cards:[{icon:'🚀',big:'102 M shares',mid:'SPCX ~$100M',sub:'Google new holding'},{icon:'🛰️',big:'AST SpaceMobile',mid:'17M shares',sub:'Space comms'},{icon:'🤖',big:'Anthropic',mid:'15M shares',sub:'AI axis'}],
  quoteLabel:'EVAN D · QUIVER QUANTITATIVE',quoteKo:'"Google Q2 13-F: SPCX·AST·Anthropic 다각"',quoteEn:'"Google Q2 13-F: SpaceX $100M · AST SpaceMobile · Planet · Anthropic · Palantir · Cerebras multi-axis stakes"',
  source:'Source: Evan D · Quiver Quantitative · 2026.08.07',
  noteHead:'Why: After 8/6 GOOGL AAPL surpass #2 and 8/7 $25B bond, today space/AI stake diversification confirmed · mega-cap investment strategy substance',noteSub:'Watch: SPCX stake expansion · other hyper similar filings · 13-F next quarter changes',footer:'GOOGL 13-F · SPCX·AI Multi',brand:BE}},

// 5. SPCX $100B ARR · 2 nuclear reactors · NuScale
{file:'spcx-100b-arr-2-nuclear-reactors-nuscale',symbol:'SPCX',
 ko:{title:'SPCX — $100B ARR 목표·내년까지 2 large nuclear reactors 규모 compute·Terafab-xAI-NuScale 확장',heroIcon:'☢️',heroBig:'$100 B ARR',heroSub:'ARK Invest: SpaceX가 $100B annual recurring revenue 목표 공유·내년까지 2 large nuclear reactors 규모 전력·compute 캐파 구축·Terafab·xAI·NuScale 확장 결합·capital speed로 Starship 다음 test flight',
  cards:[{icon:'☢️',big:'2 large NR',mid:'nuclear reactors 규모',sub:'내년까지 compute'},{icon:'💰',big:'$100 B ARR',mid:'annual recurring rev',sub:'목표 공유'},{icon:'🔗',big:'Terafab+xAI+NuScale',mid:'3중 확장',sub:'capital speed'}],
  quoteLabel:'ARK INVEST',quoteKo:'"SPCX $100B ARR 목표·내년까지 2 large nuclear reactors 규모 compute·Terafab-xAI-NuScale"',quoteEn:'"SPCX $100B ARR target · 2 large nuclear reactors compute capacity by next year · Terafab-xAI-NuScale expansion"',
  source:'출처: ARK Invest · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Terafab $16.8B·오늘 $100B ARR·2 nuclear reactors compute = SPCX 매출 축이 재정·전력·compute 3중 결합으로 확장',noteSub:'앞으로 볼 것: 2 nuclear reactors compute 실 배치·Terafab 착공·xAI 통합',footer:'SPCX $100B ARR · 2 nuclear',brand:BK},
 en:{title:'SPCX — $100B ARR Target · 2 Large Nuclear Reactors Compute Capacity by Next Year · Terafab-xAI-NuScale Expansion',heroIcon:'☢️',heroBig:'$100 B ARR',heroSub:'ARK Invest: SpaceX shared $100B annual recurring revenue target · building compute capacity equivalent to 2 large nuclear reactors by next year · Terafab-xAI-NuScale expansion combined · capital speed to Starship\'s next test flight',
  cards:[{icon:'☢️',big:'2 large NR',mid:'Nuclear reactors scale',sub:'Compute by next year'},{icon:'💰',big:'$100 B ARR',mid:'Annual recurring rev',sub:'Target shared'},{icon:'🔗',big:'Terafab+xAI+NuScale',mid:'3-fold expansion',sub:'Capital speed'}],
  quoteLabel:'ARK INVEST',quoteKo:'"$100B ARR·2 nuclear·Terafab-xAI-NuScale"',quoteEn:'"SPCX $100B ARR target · 2 large nuclear reactors compute capacity by next year · Terafab-xAI-NuScale expansion"',
  source:'Source: ARK Invest · 2026.08.07',
  noteHead:'Why: 8/7 Terafab $16.8B · today $100B ARR · 2 nuclear reactor compute = SPCX revenue axis expands via 3-fold combo of capital+power+compute',noteSub:'Watch: 2 nuclear reactor compute actual deployment · Terafab groundbreaking · xAI integration',footer:'SPCX $100B ARR · 2 Nuclear',brand:BE}},

// 6. Musk AI risk 10-20% self-accelerated
{file:'musk-ai-risk-10-20-pct-self-accelerated',symbol:'SPCX',
 ko:{title:'Musk — "AI가 인류 위협 확률 10-20%·본인이 AI 리스크 가속화한 것 인정"',heroIcon:'⚠️',heroBig:'10-20 %',heroSub:'Ark Invest Tracker: Musk가 AI가 인류 종말 가능성 10-20% 유지·본인 회피 시도 이후 오히려 OpenAI 공동 창립 등이 AI 가속화·"내 행동이 AI를 늦추기보다 오히려 가속화한 것 같다" 인정',
  cards:[{icon:'⚠️',big:'10-20 %',mid:'AI 인류 종말 확률',sub:'Musk 유지'},{icon:'🔄',big:'가속화 인정',mid:'본인 행동 인정',sub:'OpenAI 공동 창립'},{icon:'🎯',big:'차선책',mid:'AI 완전 정지 불가',sub:'리스크 최소화 시도'}],
  quoteLabel:'ELON MUSK · ARK INVEST TRACKER',quoteKo:'"AI 인류 종말 10-20%·본인 행동이 AI를 늦추기보다 오히려 가속화한 것 같다"',quoteEn:'"AI ending humanity chance 10-20% · my actions may have accelerated AI rather than slowed it down"',
  source:'출처: Ark Invest Tracker · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Terafab·오늘 $100B ARR·2 nuclear compute 확장의 반대편 · AI 안전 리스크 정직 인정',noteSub:'앞으로 볼 것: AI 안전 규제·Musk 후속 대응·OpenAI 관계 재편',footer:'Musk AI 10-20% · 가속 인정',brand:BK},
 en:{title:'Musk — "10-20% AI Ends Humanity Chance · Admits Own Actions May Have Accelerated AI Risk"',heroIcon:'⚠️',heroBig:'10-20 %',heroSub:'Ark Invest Tracker: Musk maintains 10-20% AI ends humanity probability · after avoiding AI, co-founded OpenAI as countermeasure · admits "my actions may have accelerated AI rather than slowed it down"',
  cards:[{icon:'⚠️',big:'10-20 %',mid:'AI ends humanity',sub:'Musk maintains'},{icon:'🔄',big:'Accelerated admits',mid:'Own actions',sub:'OpenAI co-founded'},{icon:'🎯',big:'Second best',mid:'Cannot fully stop AI',sub:'Risk minimization'}],
  quoteLabel:'ELON MUSK · ARK INVEST TRACKER',quoteKo:'"AI 10-20% 종말·가속화 인정"',quoteEn:'"AI ending humanity chance 10-20% · my actions may have accelerated AI rather than slowed it down"',
  source:'Source: Ark Invest Tracker · 2026.08.07',
  noteHead:'Why: Opposite side of 8/7 Terafab · today $100B ARR · 2 nuclear compute expansion · honest AI safety risk admission',noteSub:'Watch: AI safety regulation · Musk follow-up response · OpenAI relationship restructuring',footer:'Musk AI 10-20% · Accel Admit',brand:BE}},

// 7. Musk quantum computing = AI origin
{file:'musk-quantum-computing-ai-origin',symbol:'SPCX',
 ko:{title:'Musk — "quantum computing이 AI가 나오는 근원(where AI comes from)"',heroIcon:'⚛️',heroBig:'QUANTUM',heroSub:'Kalshi: Musk가 SPCX 관련 발언에서 "quantum computing이 where AI comes from"이라고 발언·quantum이 AI의 core 프레임·SPCX가 궤도 DC·chip·quantum까지 확장 가능성 시사',
  cards:[{icon:'⚛️',big:'Quantum',mid:'AI 발원지 프레임',sub:'Musk 발언'},{icon:'🔗',big:'AI core',mid:'quantum이 core',sub:'미래 계산 축'},{icon:'🚀',big:'SPCX 확장',mid:'quantum도 잠재',sub:'궤도 DC+chip+quantum'}],
  quoteLabel:'ELON MUSK · KALSHI',quoteKo:'"quantum computing이 where AI comes from"',quoteEn:'"quantum computing is where AI comes from"',
  source:'출처: Kalshi · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Terafab·8/5 NVDA Starmind exclusive·오늘 $100B ARR·2 nuclear compute·quantum까지 = SPCX compute 스택 완결 프레임',noteSub:'앞으로 볼 것: SPCX quantum 관련 후속 발표·IBM·Google·D-Wave 등 quantum 회사 관계',footer:'Musk quantum = AI 발원지',brand:BK},
 en:{title:'Musk — "Quantum Computing Is Where AI Comes From"',heroIcon:'⚛️',heroBig:'QUANTUM',heroSub:'Kalshi: Musk on SPCX-related remarks: "quantum computing is where AI comes from" · quantum as AI\'s core frame · signals possible SPCX expansion into orbital DC / chip / quantum stack',
  cards:[{icon:'⚛️',big:'Quantum',mid:'AI origin frame',sub:'Musk statement'},{icon:'🔗',big:'AI core',mid:'Quantum is core',sub:'Future compute axis'},{icon:'🚀',big:'SPCX expansion',mid:'Quantum potential',sub:'Orbital DC+chip+quantum'}],
  quoteLabel:'ELON MUSK · KALSHI',quoteKo:'"quantum이 AI 발원지"',quoteEn:'"quantum computing is where AI comes from"',
  source:'Source: Kalshi · 2026.08.07',
  noteHead:'Why: 8/7 Terafab · 8/5 NVDA Starmind exclusive · today $100B ARR / 2 nuclear compute / quantum = SPCX compute stack complete frame',noteSub:'Watch: SPCX quantum follow-up · IBM/Google/D-Wave quantum company relationships',footer:'Musk Quantum = AI Origin',brand:BE}},

// 8. Musk Terafab most valuable building
{file:'musk-terafab-most-valuable-building',symbol:'TSLA',
 ko:{title:'Musk — "Terafab이 세계에서 most valuable building이 될 것"',heroIcon:'🏛️',heroBig:'#1 BUILDING',heroSub:'TheSonOfWisley·Kalshi: Musk가 Tesla·SPCX Terafab이 세계에서 가장 valuable한 건물이 될 것이라고 발언·100M sqft·초기 $16.8B·1 TW compute·chip 생산 인프라의 극단 프레임·"most valuable building in the world"',
  cards:[{icon:'🏛️',big:'#1 building',mid:'세계 most valuable',sub:'Musk 발언'},{icon:'📏',big:'100 M sqft',mid:'Terafab 규모',sub:'전례 없는 크기'},{icon:'💰',big:'$16.8 B',mid:'초기 투자',sub:'phase 확장 예상'}],
  quoteLabel:'ELON MUSK · THESONOFWISLEY · KALSHI',quoteKo:'"Terafab이 세계에서 most valuable building이 될 것"',quoteEn:'"Terafab will be the most valuable building in the world"',
  source:'출처: TheSonOfWisley · Kalshi · Elon Musk · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Terafab $16.8B 공식 발표·오늘 세계 최대 valuable 프레임 강화·chip 자체 구축의 극단 강세',noteSub:'앞으로 볼 것: 착공·완공 시점·다음 phase 확장·실 chip 생산',footer:'Terafab most valuable · Musk',brand:BK},
 en:{title:'Musk — "Terafab Will Be the Most Valuable Building in the World"',heroIcon:'🏛️',heroBig:'#1 BUILDING',heroSub:'TheSonOfWisley · Kalshi: Musk says Tesla-SPCX Terafab will be the most valuable building in the world · 100M sqft · initial $16.8B · 1 TW compute · chip production infrastructure extreme frame · "most valuable building in the world"',
  cards:[{icon:'🏛️',big:'#1 building',mid:'World most valuable',sub:'Musk statement'},{icon:'📏',big:'100 M sqft',mid:'Terafab scale',sub:'Unprecedented size'},{icon:'💰',big:'$16.8 B',mid:'Initial investment',sub:'Phase expansion expected'}],
  quoteLabel:'ELON MUSK · THESONOFWISLEY · KALSHI',quoteKo:'"Terafab most valuable building 세계 #1"',quoteEn:'"Terafab will be the most valuable building in the world"',
  source:'Source: TheSonOfWisley · Kalshi · Elon Musk · 2026.08.07',
  noteHead:'Why: 8/7 Terafab $16.8B official announcement · today world most-valuable frame strengthens · extreme bull frame for chip self-construction',noteSub:'Watch: Groundbreaking / completion timing · next phase expansion · actual chip production',footer:'Terafab Most Valuable · Musk',brand:BE}},

// 9. Wood Tesla Robotaxi margin 10→80-90%
{file:'wood-tesla-robotaxi-margin-10-90',symbol:'TSLA',
 ko:{title:'TSLA — 캐시 우드 "Robotaxi로 Tesla 마진 10%→80-90% 급증·애널 재평가 필수"',heroIcon:'📊',heroBig:'80-90 %',heroSub:'ARK Wood: Tesla 마진이 EV 판매 10%에서 Robotaxi 상용 시 80-90%로 급증·"애널들이 이 모델 전환을 봐야 한다"·8/5 Wood $10T Robotaxi 시장 프레임 연장·오늘 Robotaxi 마진 상세 강조',
  cards:[{icon:'📊',big:'80-90 %',mid:'Robotaxi 마진',sub:'EV 10% → 8배 확장'},{icon:'🚕',big:'Robotaxi',mid:'매출 축 전환',sub:'자동차 → 서비스'},{icon:'🎯',big:'재평가 필수',mid:'애널 프레임 변화',sub:'Wood 프레임'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST',quoteKo:'"애널들이 Tesla 모델 전환을 봐야·EV 마진 10%에서 Robotaxi 마진 80-90%로 급증"',quoteEn:'"Analysts are being forced to look at Tesla model shift from 10% EV margins to 80-90% Robotaxi margins"',
  source:'출처: WOLF · Cathie Wood · ARK Invest · 2026.08.07',
  noteHead:'왜 중요한가: 8/5 Wood $10T·8/6 Wood 지속 매수와 결합·Tesla 밸류 재평가 논거 강화·오늘 Optimus 채용·태양광 시설 등 다각 확장',noteSub:'앞으로 볼 것: Robotaxi 실 매출·마진 실체·애널 컨센 상향·Tesla 밸류 재평가',footer:'Wood Robotaxi 마진 80-90%',brand:BK},
 en:{title:'TSLA — Cathie Wood "Robotaxi Shifts Tesla Margin from 10% to 80-90% · Analysts Must Re-Rate"',heroIcon:'📊',heroBig:'80-90 %',heroSub:'ARK Wood: Tesla margin shifts from 10% EV sales to 80-90% Robotaxi commercial · "analysts being forced to look at this model shift" · extends 8/5 Wood $10T Robotaxi market frame · today emphasizes Robotaxi margin detail',
  cards:[{icon:'📊',big:'80-90 %',mid:'Robotaxi margin',sub:'8× vs EV 10%'},{icon:'🚕',big:'Robotaxi',mid:'Revenue axis shift',sub:'Auto → Service'},{icon:'🎯',big:'Re-rate required',mid:'Analyst frame change',sub:'Wood frame'}],
  quoteLabel:'CATHIE WOOD · ARK INVEST',quoteKo:'"Robotaxi 마진 80-90% 급증"',quoteEn:'"Analysts are being forced to look at Tesla model shift from 10% EV margins to 80-90% Robotaxi margins"',
  source:'Source: WOLF · Cathie Wood · ARK Invest · 2026.08.07',
  noteHead:'Why: 8/5 Wood $10T + 8/6 Wood sustained buying · Tesla valuation re-rating argument strengthens · today Optimus hiring / solar facility etc multi-axis expansion',noteSub:'Watch: Robotaxi actual revenue/margin substance · analyst consensus raise · Tesla valuation re-rating',footer:'Wood Robotaxi Margin 80-90%',brand:BE}},

// 10. Ross Gerber "Only SpaceX can do it"
{file:'ross-gerber-only-spacex-starship-optimus',symbol:'SPCX',
 ko:{title:'SPCX — Ross Gerber "Only SpaceX can do it·Starship·Optimus·투자 매력"',heroIcon:'🎯',heroBig:'ONLY SPCX',heroSub:'DogeDesigner (Ross Gerber): "Only SpaceX can do it. 오늘 하는 일이 아니라 Starship·Optimus·Musk가 factory 짓는 능력이 investment compelling·Musk가 이 모든 것을 super good at 하고 있다"',
  cards:[{icon:'🎯',big:'Only SPCX',mid:'다른 회사 불가',sub:'Gerber 프레임'},{icon:'🚀',big:'Starship+Optimus',mid:'미래 매출 축',sub:'투자 매력'},{icon:'🏭',big:'Factory 능력',mid:'Musk super good',sub:'실행력 프레임'}],
  quoteLabel:'ROSS GERBER · DOGEDESIGNER',quoteKo:'"Only SpaceX can do it·Starship·Optimus·Musk가 factory 짓는 능력이 투자 매력"',quoteEn:'"Only SpaceX can do it · Starship · Optimus · Musk building factories is what makes it compelling"',
  source:'출처: DogeDesigner · Ross Gerber · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Ackman SPCX 주주·오늘 JPMorgan $180·Gerber 프레임 = 대형 매니저·investor 다각 강세',noteSub:'앞으로 볼 것: Gerber·Ackman 실 매수 규모·다른 저명 투자자 참여',footer:'Gerber Only SPCX · 매력',brand:BK},
 en:{title:'SPCX — Ross Gerber "Only SpaceX Can Do It · Starship·Optimus · Compelling Investment"',heroIcon:'🎯',heroBig:'ONLY SPCX',heroSub:'DogeDesigner (Ross Gerber): "Only SpaceX can do it. It isn\'t really what it\'s doing today, but Starship·Optimus·Musk\'s factory-building ability makes it investment compelling · Musk is super good at all of this stuff"',
  cards:[{icon:'🎯',big:'Only SPCX',mid:'No other company',sub:'Gerber frame'},{icon:'🚀',big:'Starship+Optimus',mid:'Future revenue axis',sub:'Investment appeal'},{icon:'🏭',big:'Factory ability',mid:'Musk super good',sub:'Execution frame'}],
  quoteLabel:'ROSS GERBER · DOGEDESIGNER',quoteKo:'"Only SpaceX can do it"',quoteEn:'"Only SpaceX can do it · Starship · Optimus · Musk building factories is what makes it compelling"',
  source:'Source: DogeDesigner · Ross Gerber · 2026.08.07',
  noteHead:'Why: 8/7 Ackman SPCX shareholder + today JPMorgan $180 + Gerber frame = large managers/investors multi-axis bull',noteSub:'Watch: Gerber/Ackman actual buy size · other prominent investor participation',footer:'Gerber Only SPCX · Appeal',brand:BE}},

// 11. TSLA $10.1B solar cell facility Texas
{file:'tsla-101b-solar-cell-kent-bend-texas',symbol:'TSLA',
 ko:{title:'TSLA — $10.1B 태양광 셀 제조 시설·Kent Bend County TX·vertically integrated·10,000+ 직원',heroIcon:'☀️',heroBig:'$10.1 B',heroSub:'Cole Grinde·Sawyer Merritt: Tesla가 Texas Kent Bend County (Houston 45분)에 $10.1B 태양광 셀 제조 시설 건설 계획·vertically integrated·미국 태양광 대안·10,000+ 정규 직원·미국 전력 인프라 강화',
  cards:[{icon:'☀️',big:'$10.1 B',mid:'태양광 셀 시설',sub:'Kent Bend County TX'},{icon:'🏭',big:'Vertically integrated',mid:'미국 태양광 대안',sub:'전력 인프라'},{icon:'👥',big:'10,000+',mid:'정규 직원',sub:'지역 경제 영향'}],
  quoteLabel:'COLE GRINDE · SAWYER MERRITT',quoteKo:'"Tesla가 Kent Bend County TX에 $10.1B vertically integrated 태양광 셀 시설·10,000+ 직원"',quoteEn:'"Tesla plans $10.1B vertically integrated solar cell facility in Kent Bend County TX · 10,000+ jobs"',
  source:'출처: Cole Grinde · Sawyer Merritt · 2026.08.07',
  noteHead:'왜 중요한가: 8/7 Terafab $16.8B·오늘 태양광 $10.1B·Megapack 3·Robotaxi Ops = Tesla·SPCX Texas 전 사업 확장',noteSub:'앞으로 볼 것: 착공·가동·미국 태양광 시장 점유율·전력 인프라 통합',footer:'TSLA $10.1B 태양광 · Kent Bend TX',brand:BK},
 en:{title:'TSLA — $10.1B Solar Cell Facility · Kent Bend County TX · Vertically Integrated · 10,000+ Jobs',heroIcon:'☀️',heroBig:'$10.1 B',heroSub:'Cole Grinde · Sawyer Merritt: Tesla plans $10.1B solar cell manufacturing facility in Texas Kent Bend County (45 min from Houston) · vertically integrated · US solar alternative · 10,000+ permanent jobs · US power infrastructure strengthening',
  cards:[{icon:'☀️',big:'$10.1 B',mid:'Solar cell facility',sub:'Kent Bend County TX'},{icon:'🏭',big:'Vertically integrated',mid:'US solar alternative',sub:'Power infrastructure'},{icon:'👥',big:'10,000+',mid:'Permanent jobs',sub:'Regional economic impact'}],
  quoteLabel:'COLE GRINDE · SAWYER MERRITT',quoteKo:'"$10.1B 태양광 셀·Kent Bend TX·10,000+"',quoteEn:'"Tesla plans $10.1B vertically integrated solar cell facility in Kent Bend County TX · 10,000+ jobs"',
  source:'Source: Cole Grinde · Sawyer Merritt · 2026.08.07',
  noteHead:'Why: 8/7 Terafab $16.8B · today solar $10.1B · Megapack 3 · Robotaxi Ops = Tesla-SPCX Texas full business expansion',noteSub:'Watch: Groundbreaking/operation · US solar market share · power infrastructure integration',footer:'TSLA $10.1B Solar · Kent Bend TX',brand:BE}},

// 12. TSLA Optimus manufacturing engineer hiring
{file:'tsla-optimus-manufacturing-engineer-hiring',symbol:'TSLA',
 ko:{title:'TSLA — Optimus Staff Manufacturing Engineer 채용 시작·robot hands 생산 라인·상업 제조 전환 시그널',heroIcon:'🤖',heroBig:'HIRING',heroSub:'Ming: Tesla가 Optimus 로봇 hands 생산을 위한 Staff Manufacturing Engineer 채용·hands는 로봇의 가장 vital·complex parts·targeted hiring이 Optimus 개념 → 상업 제조 실 전환 신호',
  cards:[{icon:'🤖',big:'Robot hands',mid:'생산 라인 채용',sub:'Optimus vital parts'},{icon:'🏭',big:'Manufacturing',mid:'Staff Engineer',sub:'상업 제조 시그널'},{icon:'⚡',big:'전환',mid:'개념 → 상업',sub:'실 배치 임박'}],
  quoteLabel:'MING',quoteKo:'"Tesla가 Optimus robot hands 생산 Staff Manufacturing Engineer 채용·상업 제조 실 전환 신호"',quoteEn:'"Tesla hires Staff Manufacturing Engineer for Optimus robot hands production · signals real transition from concept to commercial manufacturing"',
  source:'출처: Ming · 2026.08.07',
  noteHead:'왜 중요한가: 8/3 Jensen "Musk 3대 축 리더"·8/6 Cybercab 삼성 카메라와 같은 상업 시그널·Optimus 실 배치 임박',noteSub:'앞으로 볼 것: Optimus 생산 라인 착공·실 배치·8/5 Musk "Optimus epic" 실체화',footer:'TSLA Optimus 채용 · 상업 시그널',brand:BK},
 en:{title:'TSLA — Optimus Staff Manufacturing Engineer Hiring · Robot Hands Production Line · Commercial Manufacturing Transition Signal',heroIcon:'🤖',heroBig:'HIRING',heroSub:'Ming: Tesla hires Staff Manufacturing Engineer for Optimus robot hands production · hands are robot\'s most vital/complex parts · targeted hiring signals real transition from Optimus concept to commercial manufacturing',
  cards:[{icon:'🤖',big:'Robot hands',mid:'Production line hiring',sub:'Optimus vital parts'},{icon:'🏭',big:'Manufacturing',mid:'Staff Engineer',sub:'Commercial signal'},{icon:'⚡',big:'Transition',mid:'Concept → commercial',sub:'Real deployment near'}],
  quoteLabel:'MING',quoteKo:'"Optimus robot hands Manufacturing 채용"',quoteEn:'"Tesla hires Staff Manufacturing Engineer for Optimus robot hands production · signals real transition from concept to commercial manufacturing"',
  source:'Source: Ming · 2026.08.07',
  noteHead:'Why: Same commercial signal as 8/3 Jensen "Musk 3-pillar leader" and 8/6 Cybercab Samsung camera · Optimus real deployment imminent',noteSub:'Watch: Optimus production line groundbreaking · real deployment · 8/5 Musk "Optimus epic" substance',footer:'TSLA Optimus Hiring · Commercial',brand:BE}},

// 13. TSLA battery recycling 50%+ landfill zero
{file:'tsla-battery-recycling-50-landfill-zero',symbol:'TSLA',
 ko:{title:'TSLA — 미국 배터리 재활용 50%+ 니켈·코발트 회수·landfill zero 목표',heroIcon:'♻️',heroBig:'50 %+',heroSub:'Tesla North America: 미국 operations에서 EV·에너지 스토리지 등 사용 배터리의 key 재료(니켈·코발트) 50%+ 회수·"어떤 Tesla 배터리도 landfill에 가지 않게" 목표·2025 Impact Report',
  cards:[{icon:'♻️',big:'50 %+',mid:'재활용률',sub:'니켈·코발트 회수'},{icon:'🎯',big:'Landfill zero',mid:'Tesla 목표',sub:'환경 인프라'},{icon:'📊',big:'2025 Impact',mid:'공식 리포트',sub:'ESG 축'}],
  quoteLabel:'TESLA NORTH AMERICA',quoteKo:'"미국 operations 배터리 재활용 50%+ 니켈·코발트 회수·landfill zero 목표"',quoteEn:'"US operations recovering 50%+ key battery materials like nickel/cobalt · goal: no Tesla battery in landfill"',
  source:'출처: Tesla North America · 2025 Impact Report · 2026.08.07',
  noteHead:'왜 중요한가: 8/1 US LFP Megapack·오늘 태양광 시설·배터리 재활용 = Tesla 에너지 사업 순환 인프라 완결',noteSub:'앞으로 볼 것: 재활용률 상향 목표·다른 지역 확대·ESG 프레임',footer:'TSLA 배터리 재활용 50%+',brand:BK},
 en:{title:'TSLA — US Battery Recycling 50%+ Nickel/Cobalt Recovery · Landfill Zero Goal',heroIcon:'♻️',heroBig:'50 %+',heroSub:'Tesla North America: Across US operations recovering 50%+ key battery materials (nickel/cobalt) from EV/energy storage used cells · "no Tesla battery to end up in landfill" goal · 2025 Impact Report',
  cards:[{icon:'♻️',big:'50 %+',mid:'Recycling rate',sub:'Nickel/cobalt recovery'},{icon:'🎯',big:'Landfill zero',mid:'Tesla goal',sub:'Environmental infra'},{icon:'📊',big:'2025 Impact',mid:'Official report',sub:'ESG axis'}],
  quoteLabel:'TESLA NORTH AMERICA',quoteKo:'"배터리 재활용 50%+·landfill zero"',quoteEn:'"US operations recovering 50%+ key battery materials like nickel/cobalt · goal: no Tesla battery in landfill"',
  source:'Source: Tesla North America · 2025 Impact Report · 2026.08.07',
  noteHead:'Why: 8/1 US LFP Megapack · today solar facility · battery recycling = Tesla energy business circular infrastructure complete',noteSub:'Watch: Recycling rate upgrade goal · other region expansion · ESG frame',footer:'TSLA Battery Recycle 50%+',brand:BE}},

// 14. Starlink Aviation Shotwell shorter hops
{file:'starlink-aviation-shorter-hops-shotwell',symbol:'SPCX',
 ko:{title:'SPCX — Starlink Aviation·항공사 고객이 shorter hop 선호·direct 피함·Starlink 있는 비행기 필수 (Shotwell)',heroIcon:'✈️',heroBig:'SHORTER',heroSub:'Sawyer Merritt (Shotwell): 항공사 고객이 direct flight 피하고 Starlink 있는 shorter hop 선호·"connectivity 확보 위해 Starlink 있는 비행기 필수"·이 pattern 이전에 없던 것·Aviation 시장 근본 변화',
  cards:[{icon:'✈️',big:'Shorter hop',mid:'Starlink 있는 비행기',sub:'direct보다 선호'},{icon:'📡',big:'Connectivity',mid:'필수 요구',sub:'고객 필수'},{icon:'🔄',big:'근본 변화',mid:'Aviation 시장',sub:'이전 없던 pattern'}],
  quoteLabel:'GWYNNE SHOTWELL · SAWYER MERRITT',quoteKo:'"항공사 고객이 connectivity 위해 Starlink 있는 shorter hop 선호·direct 피함·이 pattern 이전 없었음"',quoteEn:'"Airline customers choose shorter hop flights instead of direct so they\'re on a Starlink flight · never seen this in business before"',
  source:'출처: Sawyer Merritt · Gwynne Shotwell · 2026.08.07',
  noteHead:'왜 중요한가: 8/4 IAG 50% 장거리·8/6 Bluebird·오늘 Aviation 실 수요 확인·Starlink 사업 축 완성',noteSub:'앞으로 볼 것: 다른 항공사 유사 관측·Aviation 매출 세부·서비스 확대',footer:'Starlink Aviation · shorter hop 필수',brand:BK},
 en:{title:'SPCX — Starlink Aviation · Airline Customers Prefer Shorter Hops with Starlink · Avoid Direct · Starlink Flights Essential (Shotwell)',heroIcon:'✈️',heroBig:'SHORTER',heroSub:'Sawyer Merritt (Shotwell): Airline customers choose shorter hop flights over direct to be on Starlink flight · "essential Starlink flight for connectivity" · never seen this pattern before · Aviation market fundamental shift',
  cards:[{icon:'✈️',big:'Shorter hop',mid:'Starlink flights',sub:'Preferred over direct'},{icon:'📡',big:'Connectivity',mid:'Essential demand',sub:'Customer must-have'},{icon:'🔄',big:'Fundamental shift',mid:'Aviation market',sub:'Never seen before'}],
  quoteLabel:'GWYNNE SHOTWELL · SAWYER MERRITT',quoteKo:'"항공사가 Starlink 있는 shorter hop 선호"',quoteEn:'"Airline customers choose shorter hop flights instead of direct so they\'re on a Starlink flight · never seen this in business before"',
  source:'Source: Sawyer Merritt · Gwynne Shotwell · 2026.08.07',
  noteHead:'Why: 8/4 IAG 50% long-haul · 8/6 Bluebird · today Aviation real demand confirmed · Starlink business axis complete',noteSub:'Watch: Other airline similar observations · Aviation revenue detail · service expansion',footer:'Starlink Aviation · Shorter Hop Essential',brand:BE}},

// 15. T-Mobile CEO dismisses Starlink + Mobile V2 2027
{file:'tmobile-ceo-dismisses-starlink-mobile-v2-2027',symbol:'SPCX',
 ko:{title:'통신 대립 — T-Mobile CEO "Starlink 위협 exaggerated·보완적" + SPCX Mobile V2 2027 상용 계획',heroIcon:'⚔️',heroBig:'DISMISSED',heroSub:'Sawyer Merritt: T-Mobile CEO "Starlink 위협 exaggerated·소비자 문제 해결 없이 시장 진입·기존 네트워크에 보완적" 폄하 발언·별개 Shotwell "SPCX가 Starlink Mobile V2 위성 내년 발사·2027 말 상용 시작"',
  cards:[{icon:'⚔️',big:'Dismissed',mid:'T-Mobile CEO 폄하',sub:'"exaggerated·보완적"'},{icon:'🚀',big:'V2 위성',mid:'내년 발사',sub:'Starlink Mobile'},{icon:'📅',big:'2027 말',mid:'상용 서비스 시작',sub:'Shotwell 계획'}],
  quoteLabel:'T-MOBILE CEO · GWYNNE SHOTWELL',quoteKo:'"T-Mobile CEO: Starlink 위협 exaggerated·complementary·Shotwell: Mobile V2 내년 발사·2027 말 상용"',quoteEn:'"T-Mobile CEO: Starlink threat exaggerated·complementary·Shotwell: Mobile V2 next year launch·2027 end commercial"',
  source:'출처: Sawyer Merritt · Shotwell · T-Mobile CEO · 2026.08.07',
  noteHead:'왜 중요한가: 통신사 vs SPCX 직접 대립·8/4 IAG·8/6 Shotwell $600B 도전·오늘 Bluebird·V2 2027 상용 = 대립 실체 확인',noteSub:'앞으로 볼 것: V2 실 발사·2027 상용 개시·T-Mobile 반응 재확인',footer:'T-Mobile vs Starlink · V2 2027',brand:BK},
 en:{title:'Telecom Clash — T-Mobile CEO "Starlink Threat Exaggerated · Complementary" + SPCX Mobile V2 2027 Commercial Plan',heroIcon:'⚔️',heroBig:'DISMISSED',heroSub:'Sawyer Merritt: T-Mobile CEO "Starlink threat exaggerated·struggle to see which consumer problems they solve·remains complementary to existing networks"·separately Shotwell "SPCX will launch Starlink Mobile V2 next year·plan service end of 2027"',
  cards:[{icon:'⚔️',big:'Dismissed',mid:'T-Mobile CEO',sub:'"Exaggerated·Complementary"'},{icon:'🚀',big:'V2 satellites',mid:'Next year launch',sub:'Starlink Mobile'},{icon:'📅',big:'End of 2027',mid:'Commercial start',sub:'Shotwell plan'}],
  quoteLabel:'T-MOBILE CEO · GWYNNE SHOTWELL',quoteKo:'"T-Mobile 폄하·Shotwell V2 2027"',quoteEn:'"T-Mobile CEO: Starlink threat exaggerated·complementary·Shotwell: Mobile V2 next year launch·2027 end commercial"',
  source:'Source: Sawyer Merritt · Shotwell · T-Mobile CEO · 2026.08.07',
  noteHead:'Why: Telecom vs SPCX direct clash · 8/4 IAG · 8/6 Shotwell $600B challenge · today Bluebird / V2 2027 commercial = clash substance confirmed',noteSub:'Watch: V2 actual launch · 2027 commercial start · T-Mobile response reaffirmation',footer:'T-Mobile vs Starlink · V2 2027',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260808.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260808-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
