// 2026-08-13 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.13';

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
// 1. All-Hands 15 GW + AI 매출 초과
{file:'spcx-all-hands-15gw-2027-ai-revenue-surpass',symbol:'SPCX',
 ko:{title:'SPCX — Musk 전 직원 회의 "2027년 말 AI 통신 용량 15 GW·9월부터 AI 매출이 다른 모든 스페이스X 매출 초과"',heroIcon:'🎯',heroBig:'15 GW',heroSub:'Sawyer Merritt과 Kay가 전한 Musk 전 직원 회의에서 스페이스X의 2027년 말 AI 통신 용량 목표가 15 GW로 명시됐습니다. 더 놀라운 발언은 AI 매출이 9월부터 다른 모든 SpaceX 매출을 초과하고 4분기에는 훨씬 더 크게 벌어질 것이라는 부분입니다.',
  cards:[{icon:'🎯',big:'15 GW',mid:'2027년 말 AI 용량 목표',sub:'전 직원 회의 확정'},{icon:'📅',big:'9월',mid:'AI 매출이 다른 매출 초과',sub:'다음 달부터'},{icon:'📈',big:'4분기 확대',mid:'격차 훨씬 크게',sub:'AI 매출 주력화'}],
  quoteLabel:'ELON MUSK · ALL-HANDS',quoteKo:'"우리의 AI 매출은 다음 달(9월)부터 다른 모든 SpaceX 매출을 초과할 것이고, 4분기에는 다른 모든 매출을 훨씬 크게 벗어날 것입니다. AI는 SpaceX 미래의 극도로 중요한 부분이 됐습니다."',quoteEn:'Our AI revenue will exceed all other SpaceX revenue probably next month (September) and will significantly exceed all other SpaceX revenue in Q4 · AI has become an extremely important part of SpaceX future',
  source:'출처: Sawyer Merritt · Kay · Elon Musk All-Hands · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 100 GW 프레임에서 오늘은 2027년 말 15 GW 목표가 공식화됐고, AI 매출이 다음 달부터 통신·로켓 매출을 초과한다는 발언까지 나왔습니다. SPCX가 위성 회사가 아니라 AI 회사로 재정의되는 결정적 순간이며, 어제 MS 600달러 불 케이스의 근거가 됩니다.',footer:'SPCX · 15 GW · AI 매출 초과',brand:BK},
 en:{title:'SPCX — Musk All-Hands "15 GW AI Capacity by End 2027 · AI Revenue Surpasses All Other SpaceX Revenue in September"',heroIcon:'🎯',heroBig:'15 GW',heroSub:'Per Sawyer Merritt and Kay from Musk all-hands: SpaceX targets 15 GW AI capacity by end 2027. AI revenue will surpass all other SpaceX revenue from September, gap widening in Q4.',
  cards:[{icon:'🎯',big:'15 GW',mid:'End 2027 AI capacity',sub:'All-hands confirmed'},{icon:'📅',big:'September',mid:'AI revenue surpasses',sub:'Next month'},{icon:'📈',big:'Q4 widen',mid:'Gap much larger',sub:'AI revenue primary'}],
  quoteLabel:'ELON MUSK · ALL-HANDS',quoteKo:'"AI 매출이 9월부터 초과"',quoteEn:'Our AI revenue will exceed all other SpaceX revenue probably next month (September) and will significantly exceed all other SpaceX revenue in Q4 · AI has become an extremely important part of SpaceX future',
  source:'Source: Sawyer Merritt · Kay · Elon Musk All-Hands · 2026.08.12',
  noteHead:'Why this matters',noteSub:'From yesterday 100 GW frame to today official 15 GW by end 2027 target and AI-revenue-surpassing-all-other-SpaceX-revenue from September. Decisive moment SPCX redefined from satellite to AI company · basis for yesterday MS $600 bull case.',footer:'SPCX · 15 GW · AI surpasses',brand:BE}},

// 2. AI 가치의 99% (4-5년) + inference 우주로
{file:'spcx-ai-99pct-value-4-5yr-inference-space',symbol:'SPCX',
 ko:{title:'SPCX — Musk 전 직원 회의 "4-5년 안에 AI가 SpaceX 총 가치의 99%·일상 추론은 우주로 이동·학습은 지구에 유지"',heroIcon:'🌌',heroBig:'99%',heroSub:'Musk가 전 직원 회의에서 4-5년 안에 AI가 SpaceX 총 가치의 99%+를 차지할 것이라고 밝혔습니다. AI 학습은 지구에서 계속하되 일상 추론(inference)은 우주 데이터센터로 이동할 계획이며, 이 가치는 천문학적일 것이라고 강조했습니다.',
  cards:[{icon:'🌌',big:'99%+',mid:'4-5년 후 AI 비중',sub:'SPCX 총 가치'},{icon:'🌍',big:'학습은 지구',mid:'훈련은 지상 유지',sub:'대량 데이터 필요'},{icon:'🛰️',big:'추론은 우주',mid:'일상 inference 이동',sub:'우주 데이터센터'}],
  quoteLabel:'ELON MUSK · ALL-HANDS',quoteKo:'"4-5년 안에 AI가 SpaceX 총 가치의 99% 이상을 차지할 수 있으며, 그 가치는 천문학적일 것입니다. AI 학습은 지구에서 유지하되 일상 추론은 우주로 이동합니다."',quoteEn:'In 4-5 years, AI could represent >99% of SpaceX total value, and that value will be astronomical · AI training will stay on Earth · everyday inference will move to space',
  source:'출처: Kay · Elon Musk All-Hands · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'"우주 데이터센터"라는 프레임이 처음 구체화됐습니다. 위성이 통신이 아니라 AI 추론 인프라가 되고, SpaceX 밸류에이션의 99%가 AI에서 나온다면 어제 MS 600달러·오늘 별개 리포트의 Google 105배 return 프레임은 시작 단계에 불과합니다.',footer:'SPCX · AI 99% · 우주 추론',brand:BK},
 en:{title:'SPCX — Musk All-Hands "AI Represents 99%+ of SpaceX Value in 4-5 Years · Inference Moves to Space · Training Stays on Earth"',heroIcon:'🌌',heroBig:'99%+',heroSub:'Musk at all-hands: In 4-5 years, AI represents 99%+ of SpaceX total value. Training stays on Earth, everyday inference moves to space datacenters. Value will be astronomical.',
  cards:[{icon:'🌌',big:'99%+',mid:'4-5yr AI share',sub:'SPCX total value'},{icon:'🌍',big:'Earth training',mid:'Ground stays',sub:'Data intensive'},{icon:'🛰️',big:'Space inference',mid:'Everyday moves',sub:'Orbital datacenter'}],
  quoteLabel:'ELON MUSK · ALL-HANDS',quoteKo:'"AI가 99%·우주 추론"',quoteEn:'In 4-5 years, AI could represent >99% of SpaceX total value, and that value will be astronomical · AI training will stay on Earth · everyday inference will move to space',
  source:'Source: Kay · Elon Musk All-Hands · 2026.08.12',
  noteHead:'Why this matters',noteSub:'"Space datacenter" frame concretized first time. If satellites become AI inference infra and 99% of SpaceX value comes from AI, yesterday MS $600 and today Google 105x return frames are just the beginning.',footer:'SPCX · AI 99% · Space inference',brand:BE}},

// 3. Google 13F 95% SPCX · 105배 return
{file:'google-13f-95pct-spcx-842b-105x-return',symbol:'GOOGL',
 ko:{title:'GOOGL — 구글 13F 공개 주식 포트폴리오의 95%가 스페이스X·2015년 9억 달러 투자가 오늘 842억 달러·105배 수익',heroIcon:'💎',heroBig:'105배',heroSub:'Muskonomy 정리에 따르면 구글의 2분기 13F 공개 주식 포트폴리오 3,910억 달러 중 842억 달러가 스페이스X입니다. 나머지 27개 종목 합계 45억 달러의 20배에 가깝습니다. 2015년 9억 달러 투자로 시작한 지분이 11년 만에 105배 수익을 낸 것으로, 구글의 2013년 이후 191개 공개 신고 총합 8,150억 달러보다 큽니다.',
  cards:[{icon:'💎',big:'105배',mid:'2015 → 2026 수익 배수',sub:'구글 SPCX 지분'},{icon:'📊',big:'95%',mid:'구글 공개 포트폴리오',sub:'SPCX 비중'},{icon:'💰',big:'842억 달러',mid:'현재 SPCX 지분 가치',sub:'9억 달러 → 842억'}],
  quoteLabel:'MUSKONOMY · SEC 13F',quoteKo:'"구글 13F 3,910억 달러 중 842억 달러가 스페이스X·나머지 27개 종목 합계 45억 달러·2015년 9억 달러 투자로 시작해 오늘 842억 달러 (105배 수익)·2013년 이후 구글 공개 신고 총합 8,150억 달러보다 큼"',quoteEn:'Google reported stock portfolio now 95% SpaceX · $391B 13F portfolio · $84.2B SpaceX · 27 other holdings only $4.5B · started with $900M in 2015 · $84B today · roughly 105x return · exceeds Google total reported since 2013 ($815B across 191 filings)',
  source:'출처: Muskonomy · SEC 13F 2Q 2026 · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'구글이 SPCX 하나로 만든 수익이 11년간의 다른 모든 공개 투자를 합친 것보다 큽니다. 오늘 별개 리포트의 Musk 15 GW·AI 99% 프레임이 실체화되면 이 105배 수익이 다시 10배 확장될 수 있는 잠재가 있으며, 어제 Buffett 100억 달러 GOOGL 신규 투자의 실 근거이기도 합니다.',footer:'GOOGL · 95% SPCX · 105배',brand:BK},
 en:{title:'GOOGL — Google 13F Public Portfolio 95% SpaceX · $900M in 2015 → $84.2B Today · 105x Return',heroIcon:'💎',heroBig:'105x',heroSub:'Per Muskonomy: Google Q2 13F $391B portfolio has $84.2B in SpaceX. Other 27 holdings only $4.5B. Started with $900M in 2015, worth $84B today after 11 years. Larger than Google total reported since 2013 ($815B across 191 filings).',
  cards:[{icon:'💎',big:'105x',mid:'2015 → 2026 multiple',sub:'Google SPCX stake'},{icon:'📊',big:'95%',mid:'Google public portfolio',sub:'SPCX share'},{icon:'💰',big:'$84.2 B',mid:'Current SPCX value',sub:'$900M → $84.2B'}],
  quoteLabel:'MUSKONOMY · SEC 13F',quoteKo:'"구글 95% SPCX · 105배"',quoteEn:'Google reported stock portfolio now 95% SpaceX · $391B 13F · $84.2B SpaceX · started with $900M in 2015 · roughly 105x return',
  source:'Source: Muskonomy · SEC 13F Q2 2026 · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Google\'s single SPCX return exceeds all other public investments over 11 years. If today Musk 15 GW / 99% AI frames materialize, this 105x could expand another 10x. Real basis for yesterday Buffett $10B GOOGL new investment.',footer:'GOOGL · 95% SPCX · 105x',brand:BE}},

// 4. Google GOOGL 24.7x report + SPCX 95% portfolio
{file:'googl-247x-report-spcx-ipo-995b-holdings',symbol:'GOOGL',
 ko:{title:'GOOGL — 구글 신고 지분 24.7배 급증 995억 달러·스페이스X 상장으로 942억 달러 지분이 신고 대상 편입',heroIcon:'📈',heroBig:'24.7배',heroSub:'Evan D과 Leverage Shares 정리에 따르면 구글의 SEC 신고 지분이 2분기에 24.7배 급증해 995억 달러가 됐습니다. 이유는 기존 942억 달러 스페이스X 지분이 SPCX 상장으로 신고 대상에 포함됐기 때문입니다. Anthropic도 곧 상장하면 구글의 다른 큰 지분도 공개됩니다.',
  cards:[{icon:'📈',big:'24.7배',mid:'구글 지분 신고 급증',sub:'2분기 QoQ'},{icon:'💰',big:'995억 달러',mid:'현재 총 신고 지분',sub:'SPCX 편입 후'},{icon:'🚀',big:'SPCX 편입',mid:'상장으로 신고 대상',sub:'942억 달러 지분'}],
  quoteLabel:'EVAN D · LEVERAGE SHARES',quoteKo:'"구글 신고 지분 995억 달러로 24.7배 급증·스페이스X 상장으로 942억 달러 지분이 신고 대상 편입"',quoteEn:'GOOGL reported equity holdings jumped 24.7x to $99.5B in Q2 · reason: existing $94.2B stake in SPCX became reportable following IPO',
  source:'출처: Evan D · Leverage Shares · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'구글이 실제로는 "테크 헤지 펀드"와 같다는 프레임입니다. 지금까지 비공개였던 대규모 투자들이 대상 회사가 상장하면서 공개되기 시작했고, 다음은 Anthropic입니다. 구글 밸류에이션에서 이 숨겨진 자산 가치가 시장에 처음으로 반영되기 시작합니다.',footer:'GOOGL · 24.7배 · 995억 달러',brand:BK},
 en:{title:'GOOGL — Google Reported Equity Holdings Jump 24.7x to $99.5B · $94.2B SpaceX Stake Reportable Post-IPO',heroIcon:'📈',heroBig:'24.7x',heroSub:'Per Evan D and Leverage Shares: Google reported equity holdings jumped 24.7x to $99.5B in Q2. Reason: existing $94.2B stake in SPCX became reportable following IPO. Anthropic soon-IPO will reveal more Google large stakes.',
  cards:[{icon:'📈',big:'24.7x',mid:'Google holdings surge',sub:'Q2 QoQ'},{icon:'💰',big:'$99.5 B',mid:'Total reported holdings',sub:'Post-SPCX inclusion'},{icon:'🚀',big:'SPCX inclusion',mid:'IPO makes reportable',sub:'$94.2B stake'}],
  quoteLabel:'EVAN D · LEVERAGE SHARES',quoteKo:'"구글 지분 24.7배 급증"',quoteEn:'GOOGL reported equity holdings jumped 24.7x to $99.5B in Q2 · reason: existing $94.2B stake in SPCX became reportable following IPO',
  source:'Source: Evan D · Leverage Shares · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Frame that Google is actually a "tech hedge fund." Large previously-private investments revealed as portfolio companies IPO · next is Anthropic. Hidden asset value first reflected in Google valuation.',footer:'GOOGL · 24.7x · $99.5B',brand:BE}},

// 5. SPCX 5일 +40%
{file:'spcx-40pct-5days-150-level-explosive',symbol:'SPCX',
 ko:{title:'SPCX — 5일 만에 +40% 급등·주가 150달러 수준 근접·Musk 전 직원 회의 이후 폭발적 상승',heroIcon:'🚀',heroBig:'+40%',heroSub:'Sawyer Merritt와 Kalshi Finance 정리에 따르면 SPCX가 5일 만에 +40% 급등했고 150달러 수준을 다시 회복하고 있습니다. Musk 전 직원 회의에서 공개된 15 GW·AI 99% 프레임 이후 시세가 즉시 반응했습니다.',
  cards:[{icon:'🚀',big:'+40%',mid:'5일간 시세 상승',sub:'폭발적 반등'},{icon:'💵',big:'150 달러',mid:'주가 수준 근접',sub:'재확인 지지'},{icon:'⏱️',big:'5일',mid:'상승 기간',sub:'Musk All-Hands 이후'}],
  quoteLabel:'SAWYER MERRITT · KALSHI',quoteKo:'"스페이스X 주가가 5일 만에 40% 이상 급등해서 150달러 수준을 거의 재확인했습니다."',quoteEn:'SpaceX stock now up +40% in 5 days · SpaceX surges over 10% easily, nearly reclaiming $150 level',
  source:'출처: Sawyer Merritt · Kalshi Finance · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Musk의 15 GW·AI 99% 프레임이 시세에 즉시 반영됐다는 실 근거입니다. 어제 MS 600달러 불 케이스가 이 시세 상승의 기관 배경이고, 오늘 별개 리포트의 Barchart Bollinger Band 사상 최저·주간 볼륨 사상 최대 프레임이 시세 폭발성을 예고했습니다.',footer:'SPCX · +40% · 150달러',brand:BK},
 en:{title:'SPCX — Up +40% in 5 Days · Approaches $150 Level · Explosive Rally After Musk All-Hands',heroIcon:'🚀',heroBig:'+40%',heroSub:'Per Sawyer Merritt and Kalshi Finance: SPCX up +40% in 5 days, approaching $150 level. Immediate market reaction after Musk all-hands 15 GW / AI 99% frame.',
  cards:[{icon:'🚀',big:'+40%',mid:'5-day rally',sub:'Explosive move'},{icon:'💵',big:'$150',mid:'Price level approach',sub:'Reclaim support'},{icon:'⏱️',big:'5 days',mid:'Rally period',sub:'Post Musk All-Hands'}],
  quoteLabel:'SAWYER MERRITT · KALSHI',quoteKo:'"SPCX 5일 +40%·150달러 근접"',quoteEn:'SpaceX stock now up +40% in 5 days · SpaceX surges over 10% easily, nearly reclaiming $150 level',
  source:'Source: Sawyer Merritt · Kalshi Finance · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Real evidence Musk 15 GW / AI 99% frame immediately reflected in price. Yesterday MS $600 bull case is institutional backdrop. Today Barchart Bollinger Band low / weekly volume record foreshadowed price explosion.',footer:'SPCX · +40% · $150',brand:BE}},

// 6. Barchart Bollinger Band 최저 + 주간 볼륨 최대
{file:'spcx-bollinger-narrowest-oct-2023-volume-record',symbol:'SPCX',
 ko:{title:'SPCX — Barchart "Bollinger Band 폭 2023년 10월 이후 최저·지난 주 주간 볼륨 사상 최대·폭발적 이동 준비"',heroIcon:'⚡',heroBig:'폭발 준비',heroSub:'Barchart 정리에 따르면 SPCX의 Bollinger Band 폭이 2023년 10월 이후 최저 수준까지 좁아졌습니다. 지난 주 주간 거래 볼륨은 사상 최대로 2023년 10월 대비 320% 급증했고, 이는 큰 방향성 이동이 임박했다는 기술적 신호입니다.',
  cards:[{icon:'⚡',big:'최저 폭',mid:'Bollinger Band 좁힘',sub:'2023년 10월 이후'},{icon:'📊',big:'주간 볼륨',mid:'사상 최대',sub:'2023 대비 320%'},{icon:'🎯',big:'방향성',mid:'큰 이동 임박',sub:'기술적 신호'}],
  quoteLabel:'BARCHART',quoteKo:'"SPCX가 폭발적 이동을 준비하고 있습니다. Bollinger Band 폭이 2023년 10월 이후 가장 좁은 수준·지난 주 주간 볼륨이 2023년 10월 대비 320% 급증한 사상 최대"',quoteEn:'SPCX is getting ready for an explosive move · Bollinger Band width is at its narrowest level since October 2023 · last week saw the biggest weekly volume ever with more than 320% from Oct 2023-2025',
  source:'출처: Barchart · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Bollinger Band 좁힘 후 큰 방향성 이동은 잘 알려진 기술적 패턴입니다. 오늘 SPCX 5일 +40%·MS 600달러 불 케이스·Musk 15 GW 프레임과 결합해서 이 이동이 상방일 가능성이 높습니다. 지난 주 주간 볼륨 사상 최대는 기관 자금 대량 진입 신호입니다.',footer:'SPCX · Bollinger 최저 · 볼륨 최대',brand:BK},
 en:{title:'SPCX — Barchart "Bollinger Band Narrowest Since Oct 2023 · Weekly Volume All-Time High · Explosive Move Coming"',heroIcon:'⚡',heroBig:'EXPLOSIVE',heroSub:'Per Barchart: SPCX Bollinger Band narrowest since October 2023. Weekly volume all-time high, +320% vs Oct 2023. Technical signal for imminent directional move.',
  cards:[{icon:'⚡',big:'Narrowest',mid:'Bollinger Band squeeze',sub:'Since Oct 2023'},{icon:'📊',big:'Weekly vol',mid:'All-time high',sub:'320% vs Oct 2023'},{icon:'🎯',big:'Direction',mid:'Big move imminent',sub:'Technical signal'}],
  quoteLabel:'BARCHART',quoteKo:'"SPCX 폭발 준비"',quoteEn:'SPCX is getting ready for an explosive move · Bollinger Band width is at its narrowest level since October 2023 · last week saw the biggest weekly volume ever with more than 320% from Oct 2023-2025',
  source:'Source: Barchart · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Bollinger squeeze into large directional move is known technical pattern. Combined with today SPCX +40% 5-day / MS $600 / Musk 15 GW frames, move likely upside. Last week volume all-time high signals institutional inflow.',footer:'SPCX · Bollinger low · Volume high',brand:BE}},

// 7. NVDA 시가총액 +700B 하루
{file:'nvda-mcap-700b-single-day-early-trading',symbol:'NVDA',
 ko:{title:'NVDA — Evan D "엔비디아 시가총액 오늘 이른 거래에서만 7,000억 달러 이상 상승·역대급 하루 상승 규모"',heroIcon:'📊',heroBig:'+7,000억 달러',heroSub:'Evan D 정리에 따르면 엔비디아의 시가총액이 오늘 이른 거래에서만 7,000억 달러 이상 상승했습니다. 이 정도 하루 상승 규모는 개별 종목 사상 역대급 수준으로, 어제 NVDA + SPCX 2,600억 달러 GPU 딜 소식과 연결된 반응입니다.',
  cards:[{icon:'📊',big:'+7,000억 달러',mid:'시가총액 하루 상승',sub:'이른 거래만'},{icon:'🏆',big:'역대급',mid:'개별 종목 하루 상승',sub:'사상 최대급'},{icon:'📅',big:'오늘 이른',mid:'거래 시작 직후',sub:'추가 상승 가능'}],
  quoteLabel:'EVAN D',quoteKo:'"엔비디아의 시가총액이 오늘 이른 거래에서만 7,000억 달러 이상 상승했습니다."',quoteEn:'NVIDIA $NVDA market cap has increased by more than $700 billion so far in today early trading',
  source:'출처: Evan D · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 NVDA + SPCX 2,600억 달러 GPU 딜 발표에 시장이 강력하게 반응했습니다. 하루에 7,000억 달러 상승은 개별 종목 사상 역대급이며, 오늘 SPCX 5일 +40%·구글 SPCX 105배 return 프레임과 함께 AI 사이클 자금이 대량으로 재유입되고 있다는 신호입니다.',footer:'NVDA · +7,000억 달러 하루',brand:BK},
 en:{title:'NVDA — Evan D "NVIDIA Market Cap Up $700B+ in Today Early Trading · All-Time High Daily Move"',heroIcon:'📊',heroBig:'+$700 B',heroSub:'Per Evan D: NVIDIA market cap up $700B+ in today early trading. This scale of single-day rise is all-time high for individual stock, tied to yesterday NVDA + SPCX $260B GPU deal reaction.',
  cards:[{icon:'📊',big:'+$700 B',mid:'Market cap daily rise',sub:'Early trading only'},{icon:'🏆',big:'All-time',mid:'Individual stock daily',sub:'Record scale'},{icon:'📅',big:'Today early',mid:'Post open',sub:'More upside possible'}],
  quoteLabel:'EVAN D',quoteKo:'"NVDA 하루 +7,000억"',quoteEn:'NVIDIA $NVDA market cap has increased by more than $700 billion so far in today early trading',
  source:'Source: Evan D · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Market strong reaction to yesterday NVDA + SPCX $260B GPU deal. $700B in single day is all-time record for individual stock. With SPCX +40% 5-day and Google 105x SPCX return, signals AI cycle capital major reflow.',footer:'NVDA · +$700B day',brand:BE}},

// 8. OpenAI 852B + Lightcap 사임
{file:'openai-852b-valuation-lightcap-exit-executives',symbol:'MACRO',
 ko:{title:'매크로 — OpenAI 상장 밸류 8,520억 달러·1조 달러 상회 가능·COO Lightcap 사임·경영진 대량 이탈 진행',heroIcon:'⚠️',heroBig:'8,520억 달러',heroSub:'Ark Invest Tracker 정리에 따르면 OpenAI가 8,520억 달러 밸류에이션으로 상장을 준비 중이며, 상장 시 1조 달러를 상회할 수 있는 것으로 예상됩니다. 하지만 최근 몇 달 동안 시니어 임원 이탈이 잇따랐고, 특히 2018년부터 Sam Altman의 오랜 부관이었던 COO Brad Lightcap이 곧 사임할 예정입니다.',
  cards:[{icon:'💰',big:'8,520억 달러',mid:'상장 예상 밸류',sub:'1조 달러+ 잠재'},{icon:'👋',big:'COO 사임',mid:'Brad Lightcap 이탈',sub:'2018년부터 Altman 부관'},{icon:'📉',big:'경영진 대량',mid:'시니어 임원 이탈 계속',sub:'최근 몇 달간'}],
  quoteLabel:'ARK INVEST TRACKER',quoteKo:'"OpenAI가 8,520억 달러 밸류에이션으로 상장 준비 중·1조 달러 상회 가능·2018년부터 Sam Altman의 오랜 부관인 COO Brad Lightcap을 포함한 시니어 임원 이탈 최근 몇 달간 잇따름·회사는 엔터프라이즈 AI 집중으로 초점 좁혀지고 있음"',quoteEn:'OpenAI reportedly prepping one of biggest IPOs in tech at ~$852B valuation · could cross $1 trillion if it goes public · COO Brad Lightcap Altman longest-serving deputy since 2018 plans to leave · string of senior exits · narrowing focus toward enterprise AI',
  source:'출처: Ark Invest Tracker · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 Anthropic 다음 달 상장 프레임에 이어 OpenAI 1조 달러 상장 준비까지·AI 상장 사이클이 실 개시됩니다. 다만 최상위 경영진 대량 이탈은 조직 안정성 우려 신호이며, xAI·Anthropic 등 경쟁사에게 인재 유출 기회가 됩니다.',footer:'OpenAI · 8,520억 · COO 사임',brand:BK},
 en:{title:'MACRO — OpenAI IPO $852B Valuation · Could Cross $1T · COO Lightcap Exits · Senior Executive Exodus Ongoing',heroIcon:'⚠️',heroBig:'$852 B',heroSub:'Per Ark Invest Tracker: OpenAI preparing IPO at $852B valuation, could cross $1T if public. But senior executive exodus in recent months, especially COO Brad Lightcap (Altman deputy since 2018) departing.',
  cards:[{icon:'💰',big:'$852 B',mid:'IPO valuation',sub:'$1T+ potential'},{icon:'👋',big:'COO exits',mid:'Brad Lightcap leaves',sub:'Altman deputy since 2018'},{icon:'📉',big:'Executive mass',mid:'Senior exits ongoing',sub:'Recent months'}],
  quoteLabel:'ARK INVEST TRACKER',quoteKo:'"OpenAI $852B·COO 사임"',quoteEn:'OpenAI reportedly prepping one of biggest IPOs in tech at ~$852B valuation · could cross $1 trillion if it goes public · COO Brad Lightcap Altman longest-serving deputy since 2018 plans to leave · string of senior exits',
  source:'Source: Ark Invest Tracker · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Yesterday Anthropic next-month IPO frame + today OpenAI $1T IPO prep = AI IPO cycle real start. But senior mass exit is organizational stability warning · talent poaching opportunity for xAI/Anthropic competitors.',footer:'OpenAI · $852B · COO out',brand:BE}},

// 9. SPCX 13M Starlink Mobile
{file:'spcx-13m-starlink-mobile-users-official',symbol:'SPCX',
 ko:{title:'SPCX — Sawyer Merritt "스타링크 모바일 사용자 1,300만 명 이상 공식 확인·급성장 지속"',heroIcon:'📱',heroBig:'1,300만 명',heroSub:'Sawyer Merritt 정리에 따르면 스페이스X가 스타링크 모바일 사용자가 공식적으로 1,300만 명을 넘어섰다고 발표했습니다. 스마트폰 직접 연결 서비스(direct-to-cell)와 이동형 서비스 통합 규모이며, 어제 별개 리포트의 Musk 통합 계정 프레임의 실 근거입니다.',
  cards:[{icon:'📱',big:'1,300만 명',mid:'스타링크 모바일 사용자',sub:'공식 확인'},{icon:'📶',big:'direct-to-cell',mid:'스마트폰 직접 연결',sub:'통신사 대체'},{icon:'🚀',big:'급성장 지속',mid:'서비스 확장 진행',sub:'글로벌 확산'}],
  quoteLabel:'SAWYER MERRITT · SPCX',quoteKo:'"스페이스X가 공식적으로 스타링크 모바일 사용자가 1,300만 명을 넘어섰다고 발표했습니다."',quoteEn:'SpaceX has officially announced that they now have over 13 million Starlink Mobile users',
  source:'출처: Sawyer Merritt · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Musk "스타링크 계정 하나로 어디서든 사용" 프레임의 실 사용자 규모가 확인됐습니다. 8/8 T-Mobile CEO "위협 과장" 폄하 대비 대량 사용자는 SPCX 통신 위협의 실체이며, 오늘 SPCX 5일 +40% 시세 상승의 근거가 됩니다.',footer:'스타링크 모바일 · 1,300만',brand:BK},
 en:{title:'SPCX — Sawyer Merritt "Starlink Mobile Users Exceed 13M Officially · Continued Rapid Growth"',heroIcon:'📱',heroBig:'13M users',heroSub:'Per Sawyer Merritt: SpaceX officially announces Starlink Mobile users exceed 13M. Includes direct-to-cell and roaming service. Real basis for yesterday Musk unified account frame.',
  cards:[{icon:'📱',big:'13M',mid:'Starlink Mobile users',sub:'Official confirm'},{icon:'📶',big:'Direct-to-cell',mid:'Phone direct connect',sub:'Carrier replacement'},{icon:'🚀',big:'Rapid growth',mid:'Service expansion',sub:'Global spread'}],
  quoteLabel:'SAWYER MERRITT',quoteKo:'"스타링크 모바일 1,300만"',quoteEn:'SpaceX has officially announced that they now have over 13 million Starlink Mobile users',
  source:'Source: Sawyer Merritt · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Real user scale of yesterday Musk "one Starlink account everywhere" frame confirmed. Mass users contrast 8/8 T-Mobile CEO "exaggerated threat" dismissal · reality of SPCX telecom threat · basis for today SPCX +40% 5-day.',footer:'Starlink Mobile · 13M',brand:BE}},

// 10. Cybercab 44대 중 43대 스티어링 휠 없음
{file:'tsla-cybercab-43-of-44-no-steering-wheel',symbol:'TSLA',
 ko:{title:'TSLA — Cybercab 44대 중 43대가 스티어링 휠 없음·역대 최대 관측 집단·완전 자율주행 상용 임박',heroIcon:'🚕',heroBig:'43/44',heroSub:'Roberted Miller와 Joe Tegtmeyer 관측에 따르면 사진에 담긴 Cybercab 44대 중 43대에 스티어링 휠이 없습니다. 이 정도 규모의 관측은 역대 최대이며, Tesla가 완전 자율주행 전용 상용 서비스를 준비하는 명확한 신호입니다.',
  cards:[{icon:'🚕',big:'43/44',mid:'스티어링 휠 없는 차량 비율',sub:'관측 사진 기준'},{icon:'📸',big:'역대 최대',mid:'Cybercab 관측 집단',sub:'단일 사진 최다'},{icon:'🎯',big:'완전 자율',mid:'스티어링 휠 아예 제거',sub:'Robotaxi 전용 설계'}],
  quoteLabel:'ROBERTED MILLER · JOE TEGTMEYER',quoteKo:'"Cybercab 관련 흥미로운 진전입니다. 사진의 44대 Cybercab 중 43대에 스티어링 휠이 없습니다. 지금까지 본 가장 큰 집단이며 놀랍습니다."',quoteEn:'Interesting development regarding the Cybercab · 43 out of the 44 Cybercabs pictured DO NOT have a steering wheel · largest collection we have seen so far · incredible',
  source:'출처: Roberted Miller · Joe Tegtmeyer · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 별개 리포트의 Cybercab Starlink 통합 첫 출시·8/11 Cybercab 로고 부착 대량 목격에 이어 오늘 스티어링 휠 없는 완전 자율 사양이 대량 확인됐습니다. Tesla가 로보택시 전용 상용 서비스를 준비하는 결정적 신호이며, 오늘 별개 리포트의 MS TSLA 증명 요구에 대한 실 대응이 시작됩니다.',footer:'TSLA · Cybercab 43/44 스티어링 없음',brand:BK},
 en:{title:'TSLA — Cybercab 43 of 44 Without Steering Wheel · Largest Sighting Ever · Full Autonomy Commercial Near',heroIcon:'🚕',heroBig:'43/44',heroSub:'Per Roberted Miller and Joe Tegtmeyer: 43 of 44 Cybercabs in photo without steering wheel. Largest such sighting ever, clear signal Tesla preparing full-autonomy dedicated commercial service.',
  cards:[{icon:'🚕',big:'43/44',mid:'No steering wheel ratio',sub:'Photo evidence'},{icon:'📸',big:'Largest ever',mid:'Cybercab sighting group',sub:'Single photo most'},{icon:'🎯',big:'Full autonomy',mid:'Steering wheel removed',sub:'Robotaxi-dedicated'}],
  quoteLabel:'ROBERTED MILLER · JOE TEGTMEYER',quoteKo:'"Cybercab 43/44 스티어링 없음"',quoteEn:'Interesting development regarding the Cybercab · 43 out of the 44 Cybercabs pictured DO NOT have a steering wheel · largest collection we have seen so far',
  source:'Source: Roberted Miller · Joe Tegtmeyer · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Following yesterday Cybercab Starlink first integration and 8/11 mass logo sighting, today full-autonomy spec mass confirmed. Decisive signal Tesla preparing Robotaxi-dedicated commercial service · real response to today MS TSLA prove demand.',footer:'TSLA · Cybercab 43/44 no wheel',brand:BE}},

// 11. Brett Winton 우주 컴퓨트 사업 모델
{file:'brett-winton-space-compute-business-model-75irr',symbol:'SPCX',
 ko:{title:'SPCX — Brett Winton "우주 컴퓨트 위성 하나에 400만 달러·연 매출 350만~1,200만 달러·1년 안 payback·75%+ IRR"',heroIcon:'💼',heroBig:'75%+ IRR',heroSub:'Brett Winton 정리에 따르면 100 KW 컴퓨트를 실은 2톤 위성 하나를 400만 달러에 만들고 발사할 수 있습니다. AI 모델을 함께 배치하면 연 매출 350만~1,200만 달러가 나오고 payback이 1년 이하로 떨어지며 75% 이상 IRR을 냅니다. 대규모 배치 시 수천억 달러 매출 규모로 확장됩니다.',
  cards:[{icon:'🛰️',big:'400만 달러',mid:'위성당 총 비용',sub:'2톤·100 KW·발사 포함'},{icon:'💰',big:'350-1,200만 달러',mid:'AI 모델 탑재 시 연 매출',sub:'모델 monetization 성장 반영'},{icon:'📈',big:'75%+ IRR',mid:'투자 수익률',sub:'1년 이내 payback'}],
  quoteLabel:'BRETT WINTON · ARK',quoteKo:'"동일 위성에 AI 모델을 함께 배치하면 연 매출 350만에서 1,200만 달러로 확장됩니다. Payback은 3-4년에서 1년 이하로 떨어집니다. 75% 이상 IRR입니다. 나쁜 사업이 아닙니다. 수천억 달러 규모의 배치 자본이 이 사업을 이례적으로 만듭니다."',quoteEn:'Launch that same satellite with an AI model attached and you can generate $3.5M to $12M in annual revenue depending upon your expectations for AI model monetization growth · Payback period drops from 3-4 years to less than 1 · 75%+ IRR · Not a bad business · 100s of billions in deployed capital makes this otherworldly',
  source:'출처: Brett Winton · ARK · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'오늘 별개 리포트의 Musk "일상 추론 우주로" 프레임의 실 사업 모델입니다. 위성당 400만 달러·연 매출 1,200만 달러·75% IRR은 인프라 사업 중 이례적 수익성이며, Musk의 15 GW·20만 위성 배치가 정당화됩니다.',footer:'SPCX · 위성 400만 · 75% IRR',brand:BK},
 en:{title:'SPCX — Brett Winton "Space Compute Satellite $4M · $3.5-12M Annual Revenue · <1 Year Payback · 75%+ IRR"',heroIcon:'💼',heroBig:'75%+ IRR',heroSub:'Per Brett Winton: 2-ton satellite with 100KW compute costs $4M total to make and launch. With AI model attached, $3.5-12M annual revenue, <1 year payback, 75%+ IRR. Scales to hundreds of billions in deployed capital.',
  cards:[{icon:'🛰️',big:'$4 M',mid:'Per-satellite total cost',sub:'2t·100KW·launch incl.'},{icon:'💰',big:'$3.5-12 M',mid:'Annual revenue with AI',sub:'Model monetization growth'},{icon:'📈',big:'75%+ IRR',mid:'ROI',sub:'<1 year payback'}],
  quoteLabel:'BRETT WINTON · ARK',quoteKo:'"위성 400만·연 1,200만·75% IRR"',quoteEn:'Launch that same satellite with an AI model attached and you can generate $3.5M to $12M in annual revenue · Payback period drops from 3-4 years to less than 1 · 75%+ IRR · 100s of billions in deployed capital makes this otherworldly',
  source:'Source: Brett Winton · ARK · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Real business model for today Musk "everyday inference to space" frame. Per-satellite $4M cost / $12M revenue / 75% IRR is unusual infra profitability · justifies Musk 15 GW / 200K satellite deployment.',footer:'SPCX · $4M sat · 75% IRR',brand:BE}},

// 12. SEC 24/7 블록체인 주식 거래
{file:'sec-24-7-us-stock-blockchain-trading-prep',symbol:'MACRO',
 ko:{title:'매크로 — SEC "미국 주식 24/7 블록체인 거래 허용 준비" 발표·시장 구조 근본 변화',heroIcon:'⛓️',heroBig:'24/7',heroSub:'BREAKING 뉴스로 SEC가 미국 주식을 24시간 블록체인에서 거래할 수 있도록 허용하는 준비를 하고 있다고 발표됐습니다. 이 정책이 실행되면 뉴욕 증시 시간(9:30-16:00 ET)이라는 제약이 사라지고 세계 어디서든 언제나 미국 주식을 거래할 수 있게 됩니다.',
  cards:[{icon:'⛓️',big:'24/7',mid:'미국 주식 상시 거래',sub:'블록체인 기반'},{icon:'🏛️',big:'SEC',mid:'미국 증권거래위원회',sub:'공식 준비 중'},{icon:'🌍',big:'글로벌 접근',mid:'뉴욕 시간 제약 폐지',sub:'세계 어디서든'}],
  quoteLabel:'SEC · BREAKING',quoteKo:'"미국 증권거래위원회(SEC)가 미국 주식을 24시간 블록체인에서 거래할 수 있도록 허용할 준비를 하고 있습니다."',quoteEn:'BREAKING: The SEC is preparing to allow US stocks to trade 24/7 on the blockchain',
  source:'출처: SEC · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'미국 주식 시장 구조의 근본 변화입니다. 24/7 거래가 실현되면 유동성 프리미엄이 뉴욕 증시로 집중되고, 아시아·유럽 투자자의 참여가 확대되며, 크립토·전통 금융 통합이 가속됩니다. 오늘 SPCX 5일 +40%·NVDA +7,000억 시세 상승과 결합해 유동성 확장 프레임이 강화됩니다.',footer:'SEC · 24/7 블록체인',brand:BK},
 en:{title:'MACRO — SEC "Preparing to Allow US Stock 24/7 Blockchain Trading" · Market Structure Fundamental Change',heroIcon:'⛓️',heroBig:'24/7',heroSub:'BREAKING: SEC preparing to allow US stocks to trade 24/7 on blockchain. If executed, NYSE hours (9:30-16:00 ET) constraint eliminated, US stocks tradeable globally anytime.',
  cards:[{icon:'⛓️',big:'24/7',mid:'US stock always-on trade',sub:'Blockchain-based'},{icon:'🏛️',big:'SEC',mid:'US regulator',sub:'Officially preparing'},{icon:'🌍',big:'Global access',mid:'NY hours eliminated',sub:'Any location anytime'}],
  quoteLabel:'SEC · BREAKING',quoteKo:'"SEC 24/7 블록체인 준비"',quoteEn:'BREAKING: The SEC is preparing to allow US stocks to trade 24/7 on the blockchain',
  source:'Source: SEC · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Fundamental change to US stock market structure. 24/7 trade concentrates liquidity premium in US, expands Asia/Europe investor participation, accelerates crypto/traditional finance integration. With today SPCX +40% and NVDA +$700B, reinforces liquidity expansion frame.',footer:'SEC · 24/7 blockchain',brand:BE}},

// 13. Trump 자본 이득세 감세 검토
{file:'trump-capital-gains-tax-cut-midterms-bloomberg',symbol:'MACRO',
 ko:{title:'매크로 — Trump 자본 이득세 감세 검토·중간 선거 앞두고 시장 활성화 정책 (Bloomberg)',heroIcon:'💵',heroBig:'감세 검토',heroSub:'TrendDispatch가 Bloomberg를 인용해 트럼프 대통령이 중간 선거 앞두고 자본 이득세 감세를 검토 중이라고 전했습니다. 실행되면 주식·부동산 매도 시 세금이 감소해 시장 자금 흐름이 확대되고 위험 자산 시세에 강력한 상승 압력이 됩니다.',
  cards:[{icon:'💵',big:'자본 이득세',mid:'감세 검토 중',sub:'Trump 정책'},{icon:'📅',big:'중간 선거',mid:'앞두고 발표 가능',sub:'2026년 11월'},{icon:'📈',big:'시장 상승',mid:'실행 시 강한 압력',sub:'매도 세금 절감'}],
  quoteLabel:'TRENDDISPATCH · BLOOMBERG',quoteKo:'"트럼프 대통령이 중간 선거를 앞두고 자본 이득세 감세를 밀어붙일지 검토 중이라고 Bloomberg가 전합니다."',quoteEn:'BREAKING: Trump is currently weighing whether to push for a capital gains tax cut ahead of Midterms, per Bloomberg',
  source:'출처: TrendDispatch · Bloomberg · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'자본 이득세 감세는 매도 유인을 줄이고 재투자를 촉진해 시장 상승에 강력한 지지선이 됩니다. 오늘 별개 리포트의 SEC 24/7 블록체인 거래·NVDA +7,000억·SPCX +40% 프레임과 결합해서 위험 자산 강세 사이클을 정책 지지로 확장할 수 있습니다.',footer:'Trump · 자본 이득세 감세',brand:BK},
 en:{title:'MACRO — Trump Weighing Capital Gains Tax Cut Ahead of Midterms · Market Stimulus Policy (Bloomberg)',heroIcon:'💵',heroBig:'TAX CUT',heroSub:'TrendDispatch citing Bloomberg: Trump weighing capital gains tax cut ahead of Midterms. If executed, reduces sell-side tax → expands market capital flow → strong upside pressure on risk assets.',
  cards:[{icon:'💵',big:'Cap gains',mid:'Tax cut weighing',sub:'Trump policy'},{icon:'📅',big:'Midterms',mid:'Announcement ahead',sub:'November 2026'},{icon:'📈',big:'Market up',mid:'Strong pressure if',sub:'Sale tax reduce'}],
  quoteLabel:'TRENDDISPATCH · BLOOMBERG',quoteKo:'"Trump 자본 이득세 감세"',quoteEn:'BREAKING: Trump is currently weighing whether to push for a capital gains tax cut ahead of Midterms, per Bloomberg',
  source:'Source: TrendDispatch · Bloomberg · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Cap gains cut reduces sell incentive, encourages reinvestment, strong support for market rise. With today SEC 24/7 / NVDA +$700B / SPCX +40% frames, extends risk-asset bull cycle with policy support.',footer:'Trump · Cap gains cut',brand:BE}},

// 14. Musk 개인 약속: SpaceX 직원 누구든 달·화성
{file:'musk-personal-promise-spacex-employees-moon-mars',symbol:'SPCX',
 ko:{title:'SPCX — Musk 전 직원 회의 "SpaceX 직원 누구든 미래에 달·화성 갈 수 있음·개인적 약속"',heroIcon:'🌙',heroBig:'개인 약속',heroSub:'스페이스X 전 직원 회의에서 Musk가 개인적으로 "SpaceX에서 일하는 누구든 미래에 달이나 화성에 가고 싶으면 갈 수 있다"고 약속했습니다. Musk의 원문은 "You have my word"였고, 다행성 문명 미션이 개별 직원에게 실현되는 프레임입니다.',
  cards:[{icon:'🌙',big:'달·화성',mid:'모든 SpaceX 직원 접근',sub:'미래 임무'},{icon:'🤝',big:'개인 약속',mid:'Musk 개인 서명',sub:'"You have my word"'},{icon:'🌌',big:'다행성 미션',mid:'개별 직원 실현',sub:'조직 문화 강화'}],
  quoteLabel:'ELON MUSK · SPACEX ALL-HANDS',quoteKo:'"SpaceX에서 미래에 달이나 화성에 가고 싶은 사람은 누구든 갈 수 있게 될 것입니다. 여러분에게 제 말을 드립니다."',quoteEn:'Personal commitment from Elon: Anyone at SpaceX who wants to go to the Moon or Mars in the future will be able to go · "You have my word"',
  source:'출처: SpaceX 전 직원 회의 · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Musk 개인 약속은 SpaceX 조직 문화를 강화하고 최고 인재 유치 프리미엄을 만듭니다. 오늘 별개 리포트의 OpenAI 시니어 임원 이탈 vs SPCX 개인 약속이 대비되며, 인재 시장에서 SPCX의 우위가 강화됩니다.',footer:'SPCX · Musk 개인 약속',brand:BK},
 en:{title:'SPCX — Musk All-Hands "Any SpaceX Employee Can Go to Moon or Mars in Future · Personal Promise"',heroIcon:'🌙',heroBig:'PROMISE',heroSub:'At SpaceX all-hands, Musk personally promises anyone working at SpaceX can go to Moon or Mars in future. Original: "You have my word". Multi-planetary mission realized at individual employee level.',
  cards:[{icon:'🌙',big:'Moon·Mars',mid:'All SpaceX employee access',sub:'Future missions'},{icon:'🤝',big:'Personal promise',mid:'Musk personal signature',sub:'You have my word'},{icon:'🌌',big:'Multi-planet',mid:'Individual employee real',sub:'Culture strengthening'}],
  quoteLabel:'ELON MUSK · SPACEX ALL-HANDS',quoteKo:'"직원 달·화성 접근"',quoteEn:'Personal commitment from Elon: Anyone at SpaceX who wants to go to the Moon or Mars in the future will be able to go · "You have my word"',
  source:'Source: SpaceX All-Hands · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Musk personal promise strengthens SPCX culture and creates top talent premium. Contrasts with today OpenAI senior executive exodus · SPCX advantage in talent market strengthened.',footer:'SPCX · Musk personal promise',brand:BE}},

// 15. Grok roadmap 4.5, 5, 4.7
{file:'spcx-grok-roadmap-45-out-5-soon-47-wide',symbol:'SPCX',
 ko:{title:'SPCX — Musk 전 직원 회의 "Grok 4.5 출시 완료·Grok 5 곧·Grok 4.7 광범위 배포 예정·정말 좋을 것"',heroIcon:'🚀',heroBig:'Grok 로드맵',heroSub:'Musk 전 직원 회의에서 Grok 시리즈 로드맵이 공개됐습니다. Grok 4.5는 이미 출시 완료·Grok 5는 곧 등장·Grok 4.7은 광범위 배포 예정이며 "정말 좋을 것"이라고 강조했습니다. xAI가 Grok를 통해 SpaceX 지식 전체로 학습된 AI를 만들 계획입니다.',
  cards:[{icon:'✅',big:'Grok 4.5',mid:'출시 완료',sub:'현재 사용 가능'},{icon:'🚀',big:'Grok 5',mid:'곧 등장',sub:'차세대 대형'},{icon:'⭐',big:'Grok 4.7',mid:'광범위 배포 예정',sub:'"정말 좋을 것"'}],
  quoteLabel:'ELON MUSK · ALL-HANDS',quoteKo:'"Grok 로드맵: 4.5 나왔고, 5 곧 나오고, 4.7은 광범위하게 배포되고 정말 좋을 것입니다. Grok은 SpaceX 지식의 전체 합계로 학습되고, 직원은 사실상 AI의 부모가 됩니다. AI가 여러분의 생각, 아이디어, 가치를 물려받게 됩니다."',quoteEn:'Grok roadmap: 4.5 is out - 5 soon - 4.7 will be wide, really pretty good · Grok will be trained on the entire sum of SpaceX knowledge · Employees will be the "parents" of the AI · it will inherit their thoughts, ideas, and values',
  source:'출처: Elon Musk All-Hands · Kay · 2026.08.12',
  noteHead:'이 소식은 왜 중요한가',noteSub:'Grok 4.5·5·4.7 로드맵이 명확히 공개됐고, "SpaceX 지식 전체로 학습"이라는 프레임이 xAI를 다른 AI와 차별화합니다. 어제 별개 리포트의 xAI Grok Bot·오늘 Musk AI 99% 프레임과 결합해서 SPCX가 AI 인프라·모델·에이전트 통합 사업자로 완결됩니다.',footer:'SPCX · Grok 로드맵',brand:BK},
 en:{title:'SPCX — Musk All-Hands "Grok 4.5 Out · 5 Soon · 4.7 Wide Deployment · Really Pretty Good"',heroIcon:'🚀',heroBig:'Grok Roadmap',heroSub:'Musk all-hands: Grok roadmap disclosed. Grok 4.5 already out, Grok 5 soon, Grok 4.7 wide deployment "really pretty good". xAI Grok trained on entire SpaceX knowledge base.',
  cards:[{icon:'✅',big:'Grok 4.5',mid:'Out',sub:'Currently available'},{icon:'🚀',big:'Grok 5',mid:'Soon',sub:'Next-gen large'},{icon:'⭐',big:'Grok 4.7',mid:'Wide deployment',sub:'Really pretty good'}],
  quoteLabel:'ELON MUSK · ALL-HANDS',quoteKo:'"Grok 로드맵 공개"',quoteEn:'Grok roadmap: 4.5 is out - 5 soon - 4.7 will be wide, really pretty good · Grok will be trained on the entire sum of SpaceX knowledge · Employees will be the "parents" of the AI',
  source:'Source: Elon Musk All-Hands · Kay · 2026.08.12',
  noteHead:'Why this matters',noteSub:'Grok 4.5/5/4.7 roadmap clearly disclosed, "trained on entire SpaceX knowledge" frame differentiates xAI. With yesterday xAI Grok Bot and today Musk AI 99% frame, SPCX completed as AI infra/model/agent integrated operator.',footer:'SPCX · Grok roadmap',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260813.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260813-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
