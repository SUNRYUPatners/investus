// 2026-08-19 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.19';

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
// 1. Musk 우주 경제 $1.8T 훨씬 초과 (Dima Zeniuk quoting Musk)
{file:'musk-space-economy-bigger-18t-2035-datacenters',symbol:'SPCX',
 ko:{title:'SPCX — Musk "우주 경제 2035년 1.8조 달러보다 훨씬 클 것"·Starships·우주 AI 데이터센터·궤도 인프라 포함',heroIcon:'🌌',heroBig:'≫ 1.8조',heroSub:'Dima Zeniuk가 인용한 Musk 발언에 따르면 세계 우주 경제가 2035년까지 1.8조 달러를 훨씬 넘어설 것이라고 밝혔습니다. 이는 Starships만이 아니라 우주 기반 AI 데이터센터와 그 주변에 구축되는 대규모 인프라까지 포함하는 규모입니다.',
  cards:[{icon:'📅',big:'2035년',mid:'우주 경제 시점',sub:'예상 규모'},{icon:'🚀',big:'≫ 1.8조 달러',mid:'Musk 발언',sub:'훨씬 크다'},{icon:'🛰️',big:'인프라 포함',mid:'Starships·AI DC·인프라',sub:'우주 기반'}],
  quoteLabel:'ELON MUSK · DIMA ZENIUK',quoteKo:'"2035년까지 1.8조 달러보다 훨씬 클 것"',quoteEn:'It will be much bigger than $1.8T by 2035',
  source:'출처: Dima Zeniuk · Elon Musk · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Musk가 우주 경제 규모를 다시 확장 프레임으로 언급했습니다. Dima Zeniuk의 원 트윗은 우주 경제가 1.8조 달러를 넘을 것이라 예상했고, Musk는 그 값이 훨씬 클 것이라 답했습니다.',footer:'SPCX · 우주 경제 2035',brand:BK},
 en:{title:'SPCX — Musk "Space Economy Will Be Much Bigger Than $1.8T by 2035" · Starships/Space AI Data Centers/Orbital Infrastructure',heroIcon:'🌌',heroBig:'≫ $1.8 T',heroSub:'Per Dima Zeniuk quoting Musk: global space economy will be much bigger than $1.8T by 2035. Includes not just Starships but space-based AI data centers and the massive infrastructure built around them.',
  cards:[{icon:'📅',big:'2035',mid:'Space economy timing',sub:'Expected scale'},{icon:'🚀',big:'≫ $1.8 T',mid:'Musk statement',sub:'Much bigger'},{icon:'🛰️',big:'Infra included',mid:'Starships/AI DC/infra',sub:'Space-based'}],
  quoteLabel:'ELON MUSK · DIMA ZENIUK',quoteKo:'"1.8T보다 훨씬 클 것"',quoteEn:'It will be much bigger than $1.8T by 2035',
  source:'Source: Dima Zeniuk · Elon Musk · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Musk again expands space economy scale framing. Dima Zeniuk original tweet expected space economy above $1.8T, Musk replied "much bigger".',footer:'SPCX · Space Economy 2035',brand:BE}},

// 2. UBS Starlink US 성장 (Cosmos Europa citing UBS)
{file:'ubs-starlink-us-20m-subs-2031-forecast',symbol:'SPCX',
 ko:{title:'SPCX — Cosmos Europa "UBS: Starlink US 가입자 3백만 → 2,000만 (2031년)·미국 최대 광대역 네트워크의 20%+ 차지 예상"',heroIcon:'📊',heroBig:'2,000만',heroSub:'Cosmos Europa가 인용한 UBS 리포트에 따르면 Starlink 미국 가입자가 현재 약 300만 명에서 2031년까지 약 2,000만 명으로 증가할 것으로 예상됩니다. 2028년까지 매출 60억 달러 예상이며, V3 위성 확장 시점에 주요 성장 가속 예상됩니다.',
  cards:[{icon:'📅',big:'2028년',mid:'US 매출 60억 달러',sub:'UBS 전망'},{icon:'📈',big:'6M → 20M',mid:'US 가입자 확장',sub:'2028 → 2031'},{icon:'🛰️',big:'20%+',mid:'미국 최대 광대역 네트워크',sub:'궤도 기반'}],
  quoteLabel:'COSMOS EUROPA · UBS',quoteKo:'"UBS: Starlink US 가입자 3백만 → 2,000만 (2031년)·2028년까지 60억 달러 매출·V3 위성 확장 시 주요 성장 가속"',quoteEn:'UBS forecasts U.S. subscribers to grow from roughly 3 million today to 20 million by 2031 · $6M subscribers by end of 2028 · $6B in revenue by end of 2028 · Major growth acceleration as V3 satellites reach scale · Starlink to power over 20% of America largest broadband networks — built in orbit',
  source:'출처: Cosmos Europa · UBS · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'UBS가 Starlink의 미국 성장 전망을 정량화했습니다. V3 위성 확장이 성장 가속의 축이라는 프레임입니다.',footer:'Starlink US · 3M → 20M',brand:BK},
 en:{title:'SPCX — Cosmos Europa "UBS: Starlink US Subscribers 3M → 20M by 2031 · Powering 20%+ of America Largest Broadband Networks"',heroIcon:'📊',heroBig:'20M',heroSub:'Per Cosmos Europa citing UBS: Starlink US subscribers to grow from ~3M today to ~20M by 2031. $6B revenue by end of 2028. Major growth acceleration as V3 satellites reach scale.',
  cards:[{icon:'📅',big:'End 2028',mid:'US $6B revenue',sub:'UBS forecast'},{icon:'📈',big:'6M → 20M',mid:'US subscriber growth',sub:'2028 → 2031'},{icon:'🛰️',big:'20%+',mid:'America largest broadband',sub:'Orbital'}],
  quoteLabel:'COSMOS EUROPA · UBS',quoteKo:'"UBS Starlink US 프레임"',quoteEn:'UBS forecasts U.S. subscribers to grow from roughly 3 million today to 20 million by 2031 · $6M subscribers by end of 2028 · $6B in revenue by end of 2028 · Starlink to power over 20% of America largest broadband networks',
  source:'Source: Cosmos Europa · UBS · 2026.08.18',
  noteHead:'Why this matters',noteSub:'UBS quantified Starlink US growth outlook. V3 satellite expansion is the growth acceleration axis.',footer:'Starlink US · 3M → 20M',brand:BE}},

// 3. Cybercab Giga Texas 대량 테스트 (Joe Tegtmeyer)
{file:'cybercab-giga-texas-test-track-mass-conga-line',symbol:'TSLA',
 ko:{title:'TSLA — Cybercab Giga Texas 테스트 트랙에 대량 배치·해치 열린 상태 관측·Supercharger 설치',heroIcon:'🚕',heroBig:'대량',heroSub:'Joe Tegtmeyer 관측에 따르면 Giga Texas 테스트 트랙 & 운영 센터에 지금까지 본 것보다 훨씬 많은 Cybercab이 트랙과 스테이징에 배치되어 있고 conga line처럼 줄지어 서 있습니다. Supercharger도 함께 설치되고 있고, 일부 차량은 해치가 열린 상태로 목격됩니다.',
  cards:[{icon:'🚕',big:'대량 배치',mid:'테스트 트랙 & 스테이징',sub:'역대 최다'},{icon:'⚡',big:'Supercharger',mid:'함께 설치',sub:'Giga Texas'},{icon:'📸',big:'해치 개방',mid:'일부 차량 관측',sub:'용도 미확인'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"Cybercab이 지금까지 본 것보다 훨씬 많이 트랙과 스테이징에 있음·conga line처럼 줄지어 있고 Supercharger도 함께 설치되는 중"',quoteEn:'Cybercab action today at the Giga Texas Test Track Operations Center · more Cybercabs on the track and in staging than I have ever seen! Superchargers are also being installed · Also, we see a long line of these with their hatches open',
  source:'출처: Joe Tegtmeyer · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'테스트 트랙 배치 규모가 역대 최대라는 관측입니다. 해치가 열린 상태로 목격된 차량의 용도는 미확인입니다.',footer:'TSLA · Cybercab Giga Texas 대량',brand:BK},
 en:{title:'TSLA — Cybercab Giga Texas Test Track Mass Deployment · Hatches Open Observation · Superchargers Installing',heroIcon:'🚕',heroBig:'MASS',heroSub:'Per Joe Tegtmeyer: Cybercab action at Giga Texas Test Track & Operations Center · more Cybercabs on track and in staging than ever seen · conga line · Superchargers being installed · hatches open on some vehicles.',
  cards:[{icon:'🚕',big:'Mass',mid:'Test track & staging',sub:'Record'},{icon:'⚡',big:'Supercharger',mid:'Installing',sub:'Giga Texas'},{icon:'📸',big:'Hatches open',mid:'Some vehicles',sub:'Purpose unclear'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"Cybercab 대량 배치"',quoteEn:'Cybercab action today at the Giga Texas Test Track Operations Center · more Cybercabs on the track and in staging than I have ever seen · Superchargers are also being installed · hatches open',
  source:'Source: Joe Tegtmeyer · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Test track deployment scale is the largest ever observed. Purpose of hatch-open vehicles remains unclear.',footer:'TSLA · Cybercab Giga Texas Mass',brand:BE}},

// 4. Musk 개인 Starlink 지분 unlock 목요일 (Donald Miles)
{file:'musk-personal-starlink-unlock-thursday-620m',symbol:'SPCX',
 ko:{title:'SPCX — Donald Miles "Musk 개인 지분 목요일 unlock 대기·아무도 안 팔 때 놀란 척하겠다"',heroIcon:'🔓',heroBig:'목요일',heroSub:'Donald Miles가 목요일 SPCX 관련 unlock을 대기 중이라고 언급하며 아무도 팔지 않을 때 놀란 척할 준비를 하겠다고 표현했습니다.',
  cards:[{icon:'📅',big:'목요일',mid:'unlock 대기',sub:'SPCX 관련'},{icon:'🎭',big:'놀란 척',mid:'아무도 안 팔 때',sub:'Miles 표현'},{icon:'📊',big:'매도 없음',mid:'예상 반응',sub:'Miles 프레임'}],
  quoteLabel:'DONALD MILES',quoteKo:'"목요일 SPCX 관련 다음 unlock을 기다리고 있고 아무도 팔지 않을 때 다시 놀란 척할 수 있게 준비 중"',quoteEn:'Just waiting for SpaceX next unlock on Thursday as I can act surprised when no one sells again',
  source:'출처: Donald Miles · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'unlock 이벤트 대기 관측·매도 없음이 반복 패턴이라는 Miles 개인 관측입니다.',footer:'SPCX · 목요일 unlock',brand:BK},
 en:{title:'SPCX — Donald Miles "Waiting for Musk Next Unlock on Thursday · Will Act Surprised When No One Sells"',heroIcon:'🔓',heroBig:'THU',heroSub:'Per Donald Miles: waiting for next SPCX unlock on Thursday, will act surprised again when no one sells.',
  cards:[{icon:'📅',big:'Thu',mid:'Unlock waiting',sub:'SPCX related'},{icon:'🎭',big:'Act surprised',mid:'When no one sells',sub:'Miles expression'},{icon:'📊',big:'No sell',mid:'Expected pattern',sub:'Miles frame'}],
  quoteLabel:'DONALD MILES',quoteKo:'"목요일 unlock 대기"',quoteEn:'Just waiting for SpaceX next unlock on Thursday as I can act surprised when no one sells again',
  source:'Source: Donald Miles · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Observation on unlock event · Miles personal view that "no sell" is a repeating pattern.',footer:'SPCX · Thursday Unlock',brand:BE}},

// 5. SPCX secondary $6B filings breaks down (Herbert Ong)
{file:'spcx-6b-filing-breakdown-institutional-holders',symbol:'SPCX',
 ko:{title:'SPCX — Herbert Ong "새 filing 60억 달러 세부: Musk 48.7%·GIC 27억·PIF 25억·NVIDIA 17.5억·AMD 10.5억"',heroIcon:'📋',heroBig:'60억',heroSub:'Herbert Ong 정리에 따르면 새 filing에서 Musk가 약 48.7% 지분을 보유하며, 주요 기관 보유자로 GIC 27억 달러, PIF 25억 달러, NVIDIA 17.5억 달러, AMD 10.5억 달러가 포함되었다고 밝혔습니다. Sequoia·Fidelity·Vanguard·Ron Baron 등도 포함되었으며, "5-10년 후 SpaceX가 어떻게 될지 이 사람들이 기대하는 것이 무엇일지" 프레임을 던졌습니다.',
  cards:[{icon:'👑',big:'48.7%',mid:'Musk 지분',sub:'새 filing 확인'},{icon:'🏛️',big:'GIC 27억',mid:'싱가포르 국부펀드',sub:'PIF 25억 (사우디)'},{icon:'💻',big:'NVIDIA·AMD',mid:'17.5억·10.5억',sub:'반도체 회사 지분'}],
  quoteLabel:'HERBERT ONG',quoteKo:'"$6B 새 filing에서 Musk 48.7%·주요 보유자: Growth: $27B·PIF: $25B·NVIDIA: $17.5B·AMD: $10.5B·Sequoia·Fidelity·Vanguard·Ron Baron 등·5-10년 후 SpaceX가 어떻게 될지 이 사람들이 기대하는 것이 무엇일지"',quoteEn:'$6B breaks down new filings showing Elon Musk at roughly 48.7%, while major holders reportedly include: Growth: $27B · PIF: $25B · NVIDIA: $17.5B · AMD: $10.5B · Then you have Sequoia, Fidelity, artist, Vanguard, Ron Baron and others · At some point, you have to wonder what these people expecting SpaceX to look like 5-10 years from now',
  source:'출처: Herbert Ong · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'SPCX 주요 기관 보유자가 세부적으로 공개됐습니다. 반도체 회사(NVIDIA·AMD), 국부펀드(GIC·PIF), VC(Sequoia), 자산운용사(Fidelity·Vanguard·Baron)까지 다층 참여가 확인됩니다.',footer:'SPCX · 60억 달러 filing',brand:BK},
 en:{title:'SPCX — Herbert Ong "New Filings $6B Breakdown: Musk 48.7% · GIC $27B · PIF $25B · NVIDIA $17.5B · AMD $10.5B"',heroIcon:'📋',heroBig:'$6 B',heroSub:'Per Herbert Ong: new filing shows Musk ~48.7%. Major holders: Growth: $27B, PIF: $25B, NVIDIA: $17.5B, AMD: $10.5B. Also Sequoia, Fidelity, Vanguard, Ron Baron. Frame: "wonder what these people expecting SpaceX to look like 5-10 years from now".',
  cards:[{icon:'👑',big:'48.7%',mid:'Musk stake',sub:'New filing'},{icon:'🏛️',big:'GIC $27B',mid:'Singapore sovereign',sub:'PIF $25B (Saudi)'},{icon:'💻',big:'NVIDIA/AMD',mid:'$17.5B/$10.5B',sub:'Chip firms'}],
  quoteLabel:'HERBERT ONG',quoteKo:'"60억 filing breakdown"',quoteEn:'$6B breaks down new filings showing Elon Musk at roughly 48.7% · Growth: $27B · PIF: $25B · NVIDIA: $17.5B · AMD: $10.5B · Sequoia, Fidelity, Vanguard, Ron Baron',
  source:'Source: Herbert Ong · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Major institutional holders disclosed in detail. Chip firms (NVIDIA/AMD), sovereign funds (GIC/PIF), VCs (Sequoia), asset managers (Fidelity/Vanguard/Baron) — multi-layer participation confirmed.',footer:'SPCX · $6B filing',brand:BE}},

// 6. Tesla Semi Amrise 500대 SAMZN 9월 (Shay Boloor)
{file:'tsla-semi-amrise-500-samzn-september-rollout',symbol:'TSLA',
 ko:{title:'TSLA — Shay Boloor "Tesla Semi 사상 최대 계약·Amrise가 미국 주요 화물 회랑에 500대 배치·9월 SAMZN에 첫 인도"',heroIcon:'🚛',heroBig:'500대',heroSub:'Shay Boloor 정리에 따르면 Tesla Semi가 사상 최대의 상용 계약을 확보했습니다. Amrise가 미국 주요 화물 회랑에 500대 배치 계획이며, 9월부터 SAMZN 등에 인도가 시작되고 2년 rollout이 Amrise 전기 트럭 fleet을 3배로 확장할 것으로 예상됩니다.',
  cards:[{icon:'🚛',big:'500대',mid:'Amrise 배치 계획',sub:'미국 주요 회랑'},{icon:'📅',big:'9월',mid:'SAMZN 인도 시작',sub:'첫 고객'},{icon:'📈',big:'3배 확장',mid:'2년 rollout',sub:'Amrise EV fleet'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Tesla Semi가 사상 최대 상용 계약 확보·Amrise가 500대를 미국 주요 화물 회랑에 배치 계획·9월 SAMZN 등에 인도·2년 rollout이 Amrise 전기 트럭 fleet 3배 확장 예상"',quoteEn:'Just landed its largest Semi commitment yet with Amrise planning to deploy 500 trucks across major U.S. freight corridors · Deliveries begin in September for SAMZN and other customers with the 2-year rollout expected to triple Amrise electric-truck fleet',
  source:'출처: Shay Boloor · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Tesla Semi 상용 배치의 최대 계약이 확인됐습니다. 9월 인도 시작이 실 매출 반영 시점입니다.',footer:'TSLA Semi · Amrise 500대',brand:BK},
 en:{title:'TSLA — Shay Boloor "Tesla Semi Largest Commitment · Amrise 500 Trucks Across US Freight Corridors · September SAMZN Delivery"',heroIcon:'🚛',heroBig:'500',heroSub:'Per Shay Boloor: Tesla Semi landed its largest commercial commitment. Amrise plans to deploy 500 trucks across major US freight corridors. Deliveries begin September for SAMZN and others. 2-year rollout to triple Amrise EV fleet.',
  cards:[{icon:'🚛',big:'500',mid:'Amrise deployment plan',sub:'US freight corridors'},{icon:'📅',big:'Sep',mid:'SAMZN delivery start',sub:'First customer'},{icon:'📈',big:'3x',mid:'2-year rollout',sub:'Amrise EV fleet'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Semi Amrise 500대"',quoteEn:'Just landed its largest Semi commitment yet with Amrise planning to deploy 500 trucks across major U.S. freight corridors · Deliveries begin in September for SAMZN · 2-year rollout expected to triple Amrise electric-truck fleet',
  source:'Source: Shay Boloor · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Largest commercial Semi commitment confirmed. September deliveries mark actual revenue reflection timing.',footer:'TSLA Semi · Amrise 500',brand:BE}},

// 7. Cybercab 8/23 public launch (TheSonOfWakley · Kalshi · Evan)
{file:'cybercab-public-launch-823-kalshi-info',symbol:'TSLA',
 ko:{title:'TSLA — Kalshi/TheSonOfWakley "Tesla가 Cybercab 공개 launch 준비 중"·Evan D "8월 안 Austin에서 launch" (The Information)',heroIcon:'🎉',heroBig:'준비 중',heroSub:'TheSonOfWakley와 Kalshi Finance 정리에 따르면 Tesla가 Cybercab을 대중에게 launch할 준비를 하고 있다고 보도됐습니다. Kalshi Finance: Tesla가 직원들에게 스티어링 휠·브레이크 페달 없는 첫 차량인 Cybercab의 공개 launch를 준비 중이라고 알렸다. Evan D는 The Information을 인용해 Tesla가 이번 달 안에 Austin에서 Cybercab을 대중에게 launch할 계획이라고 전했습니다.',
  cards:[{icon:'🎉',big:'준비 중',mid:'Cybercab 공개 launch',sub:'Kalshi 보도'},{icon:'🏙️',big:'Austin',mid:'launch 도시',sub:'이번 달 안'},{icon:'🎨',big:'스티어링 없음',mid:'첫 차량',sub:'브레이크 페달도 없음'}],
  quoteLabel:'THESONOFWAKLEY · KALSHI · EVAN D',quoteKo:'"Kalshi Finance: Tesla가 직원에게 Cybercab 공개 launch 준비 알림·스티어링 휠·브레이크 페달 없는 첫 차량·Evan D: The Information은 Tesla가 이번 달 안에 Austin에서 Cybercab을 launch할 계획이라 보도"',quoteEn:'JUST IN: Tesla reportedly getting ready to launch the Cybercab to the public · Tesla has reportedly told staff it is gearing up for a public launch of the Cybercab, its first vehicle designed without a steering wheel or brake pedal · Tesla aims to launch the Cybercab to the public in the city as soon as this month, per The Information',
  source:'출처: TheSonOfWakley · Kalshi Finance · Evan D · The Information · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Cybercab 공개 launch가 이번 달 안 Austin에서 나올 수 있다는 The Information 보도입니다. 사내 소식 프레임이며 Tesla의 공식 발표는 아직 없습니다.',footer:'TSLA · Cybercab launch Austin',brand:BK},
 en:{title:'TSLA — Kalshi/TheSonOfWakley "Tesla Reportedly Getting Ready to Launch Cybercab to Public" · Evan D "In Austin This Month" (The Information)',heroIcon:'🎉',heroBig:'READY',heroSub:'Per TheSonOfWakley and Kalshi Finance: Tesla reportedly getting ready to launch Cybercab to the public. Tesla told staff gearing up for public launch of Cybercab, first vehicle without steering wheel or brake pedal. Evan D citing The Information: Tesla aims to launch in Austin this month.',
  cards:[{icon:'🎉',big:'Ready',mid:'Cybercab public launch',sub:'Kalshi report'},{icon:'🏙️',big:'Austin',mid:'Launch city',sub:'This month'},{icon:'🎨',big:'No steering',mid:'First vehicle',sub:'No brake pedal'}],
  quoteLabel:'THESONOFWAKLEY · KALSHI · EVAN D',quoteKo:'"Cybercab 공개 launch 준비"',quoteEn:'JUST IN: Tesla reportedly getting ready to launch the Cybercab to the public · Kalshi: Tesla told staff gearing up for public launch, first vehicle without steering wheel or brake pedal · Evan D: Tesla aims to launch in Austin this month, per The Information',
  source:'Source: TheSonOfWakley · Kalshi Finance · Evan D · The Information · 2026.08.18',
  noteHead:'Why this matters',noteSub:'The Information reports Cybercab public launch possible in Austin this month. Internal news frame; no official Tesla announcement yet.',footer:'TSLA · Cybercab launch Austin',brand:BE}},

// 8. NASDAQ short ATH (Macro Charts · unusual_whales)
{file:'nasdaq-short-position-all-time-high-warning',symbol:'SPX',
 ko:{title:'SPX — Macro Charts/unusual_whales "자산운용사·헤지펀드가 나스닥 선물에 사상 최대 short 포지션 구축·역대 최대 short"',heroIcon:'📉',heroBig:'사상 최대',heroSub:'Macro Charts와 unusual_whales 정리에 따르면 자산운용사와 헤지펀드가 나스닥 선물에 사상 최대의 short 포지션을 구축했습니다. Macro Charts는 이를 "사상 최대 나스닥 short"라고 표기했습니다.',
  cards:[{icon:'📉',big:'사상 최대',mid:'나스닥 short 포지션',sub:'Macro Charts'},{icon:'🏢',big:'자산운용·헤지',mid:'구축 주체',sub:'unusual_whales'},{icon:'⚠️',big:'역대 최대',mid:'선물 short',sub:'경계 신호 vs 반대 매수 잠재'}],
  quoteLabel:'MACRO CHARTS · UNUSUAL_WHALES',quoteKo:'"자산운용사와 헤지펀드가 이제 사상 최대의 나스닥 선물 short 포지션 구축·Macro Charts: 사상 최대 나스닥 short"',quoteEn:'Asset Managers and Hedge Funds have now built the largest Nasdaq futures short position in history · Biggest Nasdaq Short of all time',
  source:'출처: Macro Charts · unusual_whales · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'선물 short 포지션 사상 최대는 조정 우려의 신호이지만, 동시에 상승 시 short cover로 인한 매수 압력 잠재도 큽니다. 두 방향 해석이 가능합니다.',footer:'SPX · 나스닥 short 사상 최대',brand:BK},
 en:{title:'SPX — Macro Charts/unusual_whales "Asset Managers & Hedge Funds Now Have Largest Nasdaq Futures Short in History"',heroIcon:'📉',heroBig:'ATH',heroSub:'Per Macro Charts and unusual_whales: Asset Managers and Hedge Funds have built the largest Nasdaq futures short position in history. Macro Charts: "Biggest Nasdaq Short of all time".',
  cards:[{icon:'📉',big:'ATH',mid:'Nasdaq short position',sub:'Macro Charts'},{icon:'🏢',big:'AM & HF',mid:'Building parties',sub:'unusual_whales'},{icon:'⚠️',big:'Record',mid:'Futures short',sub:'Warning vs squeeze potential'}],
  quoteLabel:'MACRO CHARTS · UNUSUAL_WHALES',quoteKo:'"나스닥 short 사상 최대"',quoteEn:'Asset Managers and Hedge Funds have now built the largest Nasdaq futures short position in history · Biggest Nasdaq Short of all time',
  source:'Source: Macro Charts · unusual_whales · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Record futures short is correction warning signal but simultaneously carries squeeze upside potential. Two-way interpretation.',footer:'SPX · Nasdaq Short ATH',brand:BE}},

// 9. Terafab 3,020 hectares (Joe Tegtmeyer)
{file:'terafab-3020-hectares-7464-acres-land-update',symbol:'SPCX',
 ko:{title:'SPCX·TSLA — Joe Tegtmeyer "Terafab 총 부지 3,020 헥타르(7,464 에이커)·2,000-3,000 에이커 추가 매입 필요"',heroIcon:'🏗️',heroBig:'3,020 ha',heroSub:'Joe Tegtmeyer의 Terafab 건설 부지 & 토지 업데이트에 따르면 사이트 총 부지가 약 7,464 에이커(3,020 헥타르)로 최종 기록 절차 중이며, 최종 사이트를 위해 추가 약 2,000-3,000 에이커(810-1,500 헥타르) 매입이 필요합니다. Gibbons Creek Reservoir 동쪽 지역에서 이미 토지 정리가 진행 중이고, Terafab의 척추를 따라 동쪽에 최근 매입된 여러 녹색 지역이 표시되고 있습니다.',
  cards:[{icon:'🏗️',big:'3,020 ha',mid:'총 부지 (7,464 에이커)',sub:'최종 기록 중'},{icon:'📈',big:'2,000-3,000 에이커',mid:'추가 매입 필요',sub:'최종 사이트용'},{icon:'🌊',big:'Gibbons Creek',mid:'동쪽 토지 정리 시작',sub:'실 착공 지역'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"Terafab 총 사이트 약 7,464 에이커(3,020 헥타르)·최종 기록 중·최종 사이트 위해 약 2,000-3,000 에이커(810-1,500 헥타르) 추가 매입 필요·Gibbons Creek Reservoir 동쪽 토지 정리 진행 중"',quoteEn:'Total site area is estimated at 7,464 acres or 3,020 hectares · in the final process of being recorded · around 2,000 to 3,000 acres (810 to 1,500 hectares) will need to be purchased for the final site · On the east side of the Gibbons Creek Reservoir are the areas where land clearing is already underway',
  source:'출처: Joe Tegtmeyer · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Terafab 부지 규모의 세부 수치가 확인됐습니다. 최종 사이트를 위해 추가 매입이 필요한 상태이며 실 착공 지역이 명시됐습니다.',footer:'Terafab · 3,020 헥타르',brand:BK},
 en:{title:'SPCX·TSLA — Joe Tegtmeyer "Terafab Total Site 3,020 Hectares (7,464 Acres) · 2,000-3,000 More Acres Needed"',heroIcon:'🏗️',heroBig:'3,020 ha',heroSub:'Per Joe Tegtmeyer Terafab construction site & land plot update: total site ~7,464 acres (3,020 hectares) in final recording process. About 2,000-3,000 more acres (810-1,500 hectares) needed for final site. Land clearing already underway on east side of Gibbons Creek Reservoir.',
  cards:[{icon:'🏗️',big:'3,020 ha',mid:'Total site (7,464 acres)',sub:'Final recording'},{icon:'📈',big:'2,000-3,000 ac',mid:'More acres needed',sub:'For final site'},{icon:'🌊',big:'Gibbons Creek',mid:'East land clearing',sub:'Actual construction area'}],
  quoteLabel:'JOE TEGTMEYER',quoteKo:'"Terafab 3,020 헥타르"',quoteEn:'Total site area is estimated at 7,464 acres or 3,020 hectares · around 2,000 to 3,000 acres will need to be purchased for the final site · East side of Gibbons Creek Reservoir land clearing already underway',
  source:'Source: Joe Tegtmeyer · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Detailed Terafab site scale numbers confirmed. More land purchases needed for final site; actual construction area identified.',footer:'Terafab · 3,020 ha',brand:BE}},

// 10. Musk Optimus vs Boston Dynamics (Elonagg)
{file:'musk-optimus-boston-dynamics-safety-frame',symbol:'TSLA',
 ko:{title:'TSLA — Musk "로봇은 오는데 Boston Dynamics 영상이 보여줌·다른 회사 로봇 안전은 보장 못하지만 Tesla에서는 최선을 다한다"',heroIcon:'🤖',heroBig:'안전',heroSub:'Elonagg가 전한 Musk 발언: "로봇은 어차피 오고 있고 Boston Dynamics 영상들이 이를 명확히 보여준다. 다른 회사가 만드는 로봇이 안전한지는 내가 보장할 수 없지만, 나는 Tesla에서 최선을 다해 그렇게 하려 한다."',
  cards:[{icon:'🤖',big:'로봇 도래',mid:'Boston Dynamics 시각화',sub:'어차피 오는 흐름'},{icon:'🛡️',big:'Tesla 안전',mid:'Musk 개인 보증',sub:'다른 회사는 보장 못함'},{icon:'💬',big:'개인 발언',mid:'Elonagg 인용',sub:'프레임 선언'}],
  quoteLabel:'ELON MUSK · ELONAGG',quoteKo:'"로봇은 어차피 오는데 Boston Dynamics 영상이 명확히 보여준다·다른 회사가 만드는 로봇이 안전한지는 내가 보장할 수 없지만 나는 Tesla에서 최선을 다해 그렇게 하려 한다"',quoteEn:'The robots are coming anyway, as Boston Dynamics videos clearly show · I will not be able to ensure that robots made by other companies are safe, but I can try my best to do so at Tesla',
  source:'출처: Elonagg · Elon Musk · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Musk가 Tesla의 로봇 안전을 개인 미션으로 프레임했습니다. 다른 회사가 만드는 로봇의 안전은 보장할 수 없다는 뉘앙스입니다.',footer:'TSLA · Optimus 안전 프레임',brand:BK},
 en:{title:'TSLA — Musk "Robots Coming Anyway as Boston Dynamics Videos Show · I Cannot Ensure Other Companies Robots Safe, But Will Try My Best at Tesla"',heroIcon:'🤖',heroBig:'SAFETY',heroSub:'Per Elonagg relaying Musk: "The robots are coming anyway, as Boston Dynamics videos clearly show. I will not be able to ensure that robots made by other companies are safe, but I can try my best to do so at Tesla."',
  cards:[{icon:'🤖',big:'Robots coming',mid:'Boston Dynamics visual',sub:'Inevitable flow'},{icon:'🛡️',big:'Tesla safety',mid:'Musk personal promise',sub:'Others cannot guarantee'},{icon:'💬',big:'Personal statement',mid:'Elonagg citation',sub:'Frame declaration'}],
  quoteLabel:'ELON MUSK · ELONAGG',quoteKo:'"Optimus 안전"',quoteEn:'The robots are coming anyway, as Boston Dynamics videos clearly show · I will not be able to ensure that robots made by other companies are safe, but I can try my best to do so at Tesla',
  source:'Source: Elonagg · Elon Musk · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Musk frames Tesla robot safety as personal mission. Nuance: cannot guarantee safety of robots made by other companies.',footer:'TSLA · Optimus Safety Frame',brand:BE}},

// 11. Intesa Sanpaolo SPCX 지분 (Reuters · Evan D)
{file:'intesa-sanpaolo-spcx-stake-largest-italian-bank',symbol:'SPCX',
 ko:{title:'SPCX — Evan D "Reuters: 이탈리아 최대 은행 Intesa Sanpaolo가 6월 30일 기준 SPCX 지분 보유·566만 주·미국 주식 포트폴리오 최대 포지션·15.5% 비중"',heroIcon:'🇮🇹',heroBig:'566만 주',heroSub:'Evan D가 인용한 Reuters 보도(8/17)에 따르면 이탈리아 최대 은행 Intesa Sanpaolo가 6월 30일 기준 SPCX에 지분을 보유하고 있으며, 약 566만 주를 소유하고 있습니다. 이는 이들의 미국 주식 포트폴리오에서 단일 최대 포지션이며, 총 미국 보유액의 약 15.5%를 차지합니다.',
  cards:[{icon:'🇮🇹',big:'566만 주',mid:'Intesa Sanpaolo 지분',sub:'6월 30일 기준'},{icon:'📊',big:'15.5%',mid:'미국 포트폴리오 비중',sub:'단일 최대'},{icon:'🏛️',big:'이탈리아 최대 은행',mid:'Intesa Sanpaolo',sub:'유럽 대형 기관'}],
  quoteLabel:'EVAN D · REUTERS',quoteKo:'"Reuters 8월 17일 보도: 이탈리아 최대 은행 Intesa Sanpaolo가 6월 30일 기준 SPCX에 지분·약 566만 주 보유·미국 주식 포트폴리오 단일 최대 포지션·총 미국 보유의 약 15.5% 비중"',quoteEn:'Reuters reported on August 17th that Italy largest bank, Intesa Sanpaolo, held a stake in SpaceX as of June 30th · They owned nearly 5.66 million shares · This is the single largest position in their U.S. stock portfolio, making up about 15.5% of their total U.S. holdings',
  source:'출처: Evan D · Reuters · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'유럽 대형 기관 참여의 실 확인입니다. 이탈리아 최대 은행이 미국 포트폴리오의 15.5%를 SPCX 단일 종목에 배치한 사실이 Reuters로 확인됐습니다.',footer:'SPCX · Intesa Sanpaolo 566만 주',brand:BK},
 en:{title:'SPCX — Evan D "Reuters: Italy Largest Bank Intesa Sanpaolo Held SPCX Stake as of June 30 · 5.66M Shares · Largest US Position · 15.5% of Portfolio"',heroIcon:'🇮🇹',heroBig:'5.66M sh',heroSub:'Per Evan D citing Reuters (Aug 17): Italy largest bank Intesa Sanpaolo held stake in SPCX as of June 30. Owned nearly 5.66M shares. Single largest position in their US stock portfolio, about 15.5% of total US holdings.',
  cards:[{icon:'🇮🇹',big:'5.66M sh',mid:'Intesa Sanpaolo stake',sub:'As of June 30'},{icon:'📊',big:'15.5%',mid:'US portfolio weight',sub:'Single largest'},{icon:'🏛️',big:'Italy largest bank',mid:'Intesa Sanpaolo',sub:'European large institution'}],
  quoteLabel:'EVAN D · REUTERS',quoteKo:'"Intesa Sanpaolo 566만 주"',quoteEn:'Reuters reported that Italy largest bank, Intesa Sanpaolo, held a stake in SpaceX as of June 30 · nearly 5.66 million shares · single largest position in their U.S. stock portfolio, about 15.5% of total U.S. holdings',
  source:'Source: Evan D · Reuters · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Real confirmation of European large institution participation. Reuters confirmed Italy largest bank placed 15.5% of US portfolio in single SPCX position.',footer:'SPCX · Intesa Sanpaolo 5.66M',brand:BE}},

// 12. AI Rally ECB warning (Kalshi Finance · ECB Blog)
{file:'ai-rally-ecb-blog-correction-warning-stock-market',symbol:'MACRO',
 ko:{title:'매크로 — Kalshi Finance "ECB 블로그: AI 랠리가 주식 시장 조정을 트리거할 수 있다"',heroIcon:'⚠️',heroBig:'조정 경고',heroSub:'Kalshi Finance가 인용한 ECB 블로그: "AI 랠리가 주식 시장 조정을 트리거할 준비가 됐다"고 게시했습니다. 유럽중앙은행 블로그가 AI 관련 시세 상승이 조정의 원인이 될 수 있다는 경계 프레임을 제시했습니다.',
  cards:[{icon:'⚠️',big:'조정 준비',mid:'AI 랠리 트리거',sub:'ECB 블로그'},{icon:'🏦',big:'ECB',mid:'유럽중앙은행',sub:'공식 블로그'},{icon:'💥',big:'주식 조정 경고',mid:'AI 시세 우려',sub:'매크로 기관 경계'}],
  quoteLabel:'KALSHI FINANCE · ECB BLOG',quoteKo:'"AI 랠리가 주식 시장 조정을 트리거할 준비·ECB 블로그"',quoteEn:'AI Rally Set to Trigger Stock-Market Correction, ECB Blog Says',
  source:'출처: Kalshi Finance · ECB Blog · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'매크로 기관(ECB)이 AI 랠리 조정 리스크를 공식 언급했습니다. Michael Burry AI Enron 경고·Shiller CAPE 밸류에이션 경고에 이어 매크로 경계 신호 다층 축적입니다.',footer:'매크로 · ECB AI 조정 경고',brand:BK},
 en:{title:'MACRO — Kalshi Finance "AI Rally Set to Trigger Stock-Market Correction, ECB Blog Says"',heroIcon:'⚠️',heroBig:'CORRECTION',heroSub:'Per Kalshi Finance citing ECB Blog: "AI Rally Set to Trigger Stock-Market Correction". European Central Bank blog presents caution frame that AI-driven price rally could cause correction.',
  cards:[{icon:'⚠️',big:'Ready',mid:'AI rally trigger',sub:'ECB blog'},{icon:'🏦',big:'ECB',mid:'European Central Bank',sub:'Official blog'},{icon:'💥',big:'Stock warning',mid:'AI price concern',sub:'Macro institutional caution'}],
  quoteLabel:'KALSHI FINANCE · ECB BLOG',quoteKo:'"ECB AI 조정 경고"',quoteEn:'AI Rally Set to Trigger Stock-Market Correction, ECB Blog Says',
  source:'Source: Kalshi Finance · ECB Blog · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Macro institution (ECB) officially raised AI rally correction risk. Multi-layer macro warning signal following Michael Burry AI Enron warning and Shiller CAPE valuation warning.',footer:'MACRO · ECB AI Warning',brand:BE}},

// 13. Falcon 9 24일 8발사 (Cosmos Europa)
{file:'falcon-9-8-launches-24-days-shortest-gap',symbol:'SPCX',
 ko:{title:'SPCX — Cosmos Europa "SpaceX가 24일 만에 Falcon 9 8발사·궤도 발사 사이 최단 간격"',heroIcon:'🚀',heroBig:'24일·8발사',heroSub:'Cosmos Europa 정리에 따르면 SpaceX가 8번의 Falcon 9 발사를 24일 만에 완료했으며, 이는 궤도 발사 간 최단 간격입니다. 궤도 발사가 반복 가능한 운송 운영에 가까워지는 무언가로 변하고 있는 신호입니다. "발사 + 착륙 + 재급유 + 재발사·그리고 아직 가속화 중"이라고 표기했습니다.',
  cards:[{icon:'🚀',big:'8발사',mid:'Falcon 9',sub:'24일 만에'},{icon:'⏱️',big:'최단 간격',mid:'궤도 발사 사이',sub:'사상 최단'},{icon:'♾️',big:'반복 운송',mid:'launch·land·refuel·launch',sub:'가속화 중'}],
  quoteLabel:'COSMOS EUROPA',quoteKo:'"SpaceX가 24일 만에 Falcon 9 8발사·궤도 발사 사이 최단 간격·반복 운송 운영에 가까워짐·발사+착륙+재급유+재발사·아직 가속화 중"',quoteEn:'SpaceX has just completed 8 Falcon 9 launches in 2026 so far in the last 24 days · This is the shortest gap between orbital launches · Orbital launches are turning into something closer to a repeatable transportation operation · Launch + land + refuel + launch again · And they are still accelerating',
  source:'출처: Cosmos Europa · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Falcon 9 발사 빈도가 반복 운송 수준에 가까워지고 있다는 정량 관측입니다. 24일 8발사는 궤도 발사 사이 사상 최단 간격입니다.',footer:'SPCX · Falcon 9 · 24일·8발사',brand:BK},
 en:{title:'SPCX — Cosmos Europa "SpaceX Completes 8 Falcon 9 Launches in 24 Days · Shortest Gap Between Orbital Launches"',heroIcon:'🚀',heroBig:'8 in 24 d',heroSub:'Per Cosmos Europa: SpaceX completed 8 Falcon 9 launches in the last 24 days. Shortest gap between orbital launches. Orbital launches turning into something closer to a repeatable transportation operation. "Launch + land + refuel + launch again · And they are still accelerating."',
  cards:[{icon:'🚀',big:'8 launches',mid:'Falcon 9',sub:'In 24 days'},{icon:'⏱️',big:'Shortest gap',mid:'Between orbital launches',sub:'Historic'},{icon:'♾️',big:'Repeat transport',mid:'Launch·land·refuel·launch',sub:'Accelerating'}],
  quoteLabel:'COSMOS EUROPA',quoteKo:'"Falcon 9 24일 8발사"',quoteEn:'SpaceX has just completed 8 Falcon 9 launches in the last 24 days · This is the shortest gap between orbital launches · Launch + land + refuel + launch again · And they are still accelerating',
  source:'Source: Cosmos Europa · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Quantitative observation that Falcon 9 launch cadence is approaching repeatable transportation level. 8 launches in 24 days is shortest gap between orbital launches in history.',footer:'SPCX · Falcon 9 · 8 in 24d',brand:BE}},

// 14. Starlink 48 airlines (zerohedge BREAKING)
{file:'starlink-48-airlines-7000-aircraft-worldwide',symbol:'SPCX',
 ko:{title:'SPCX — zerohedge "BREAKING: Starlink 이제 세계 48개 항공사와 파트너·7,000대 이상 항공기 이미 장착·설치 중·계약 중"',heroIcon:'✈️',heroBig:'48 항공사',heroSub:'zerohedge BREAKING에 따르면 Starlink가 이제 세계 48개 항공사와 파트너십을 맺었으며, 7,000대 이상의 항공기가 이미 장착 완료, 설치 진행 중, 또는 계약 상태에 있습니다.',
  cards:[{icon:'✈️',big:'48개 항공사',mid:'세계 파트너십',sub:'zerohedge BREAKING'},{icon:'🛬',big:'7,000대+',mid:'항공기 대상',sub:'장착·설치·계약'},{icon:'🌐',big:'세계 커버리지',mid:'Aviation Starlink',sub:'실 규모'}],
  quoteLabel:'ZEROHEDGE',quoteKo:'"BREAKING: Starlink가 세계 48개 항공사와 파트너·7,000대 이상 항공기가 이미 장착·설치 중·계약 중"',quoteEn:'BREAKING: Starlink has now partnered with 48 airlines worldwide, covering more than 7,000 aircraft that are already equipped, undergoing installation, or under contract',
  source:'출처: zerohedge · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Starlink Aviation 사업 규모가 세계 48개 항공사·7,000대+ 항공기로 실 확인됐습니다. 8/11 루프트한자 A320neo 첫 통합에 이은 실 규모 정량입니다.',footer:'Starlink · 48 항공사',brand:BK},
 en:{title:'SPCX — zerohedge "BREAKING: Starlink Now Partnered With 48 Airlines Worldwide · Over 7,000 Aircraft Equipped/Installing/Under Contract"',heroIcon:'✈️',heroBig:'48 AIRLINES',heroSub:'Per zerohedge BREAKING: Starlink now partnered with 48 airlines worldwide, covering more than 7,000 aircraft already equipped, undergoing installation, or under contract.',
  cards:[{icon:'✈️',big:'48 airlines',mid:'Worldwide partnership',sub:'zerohedge BREAKING'},{icon:'🛬',big:'7,000+',mid:'Aircraft target',sub:'Equipped/installing/contract'},{icon:'🌐',big:'Global coverage',mid:'Aviation Starlink',sub:'Real scale'}],
  quoteLabel:'ZEROHEDGE',quoteKo:'"Starlink 48 항공사"',quoteEn:'BREAKING: Starlink has now partnered with 48 airlines worldwide, covering more than 7,000 aircraft that are already equipped, undergoing installation, or under contract',
  source:'Source: zerohedge · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Starlink Aviation business scale confirmed at 48 airlines/7,000+ aircraft. Real scale quantification following 8/11 Lufthansa A320neo first integration.',footer:'Starlink · 48 airlines',brand:BE}},

// 15. Model Y Korea 최고 판매 (Sawyer Merritt · Carconpolic Korea)
{file:'tsla-model-y-korea-best-selling-car',symbol:'TSLA',
 ko:{title:'TSLA — Sawyer Merritt "Model Y가 한국 최고 판매 신차·CarConfolic Korea·미국이 아니라 한국"',heroIcon:'🇰🇷',heroBig:'한국 1위',heroSub:'Sawyer Merritt이 CarConfolic Korea를 인용해 전한 바에 따르면 Tesla Model Y가 지금 미국이 아닌 한국에서 최고 판매 신차입니다.',
  cards:[{icon:'🇰🇷',big:'한국',mid:'Model Y 1위',sub:'최고 판매 신차'},{icon:'🚗',big:'Model Y',mid:'테슬라 SUV',sub:'실 판매 확장'},{icon:'📊',big:'미국 아님',mid:'해외 시장',sub:'글로벌 확장'}],
  quoteLabel:'SAWYER MERRITT · CARCONFOLIC KOREA',quoteKo:'"CarConfolic Korea: Model Y가 한국에서 최고 판매 신차·미국이 아님"',quoteEn:'Korea Best-Selling New Car Right Now is American, Not Korean · Tesla Model Y is now the best-selling new car in the country · about 10,000 units in Korea in each of the past few months',
  source:'출처: Sawyer Merritt · CarConfolic Korea · 2026.08.18',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Tesla Model Y가 한국 시장에서 최고 판매 신차라는 관측입니다. 아시아 매출 다각 회복의 실 시장 데이터 확인입니다.',footer:'TSLA · Model Y 한국 1위',brand:BK},
 en:{title:'TSLA — Sawyer Merritt "Model Y Best-Selling New Car in Korea Right Now · American, Not Korean"',heroIcon:'🇰🇷',heroBig:'#1 KOREA',heroSub:'Per Sawyer Merritt citing CarConfolic Korea: Tesla Model Y is now the best-selling new car in Korea, not the US.',
  cards:[{icon:'🇰🇷',big:'Korea',mid:'Model Y #1',sub:'Best-selling new car'},{icon:'🚗',big:'Model Y',mid:'Tesla SUV',sub:'Real sales expansion'},{icon:'📊',big:'Not US',mid:'Overseas market',sub:'Global expansion'}],
  quoteLabel:'SAWYER MERRITT · CARCONFOLIC KOREA',quoteKo:'"Model Y 한국 1위"',quoteEn:'Korea Best-Selling New Car Right Now is American, Not Korean · Tesla Model Y is now the best-selling new car in the country',
  source:'Source: Sawyer Merritt · CarConfolic Korea · 2026.08.18',
  noteHead:'Why this matters',noteSub:'Observation that Tesla Model Y is best-selling new car in Korea. Real market data confirmation of Asian revenue multi-axis recovery.',footer:'TSLA · Model Y Korea #1',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260819.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260819-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
