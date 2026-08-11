// 2026-08-12 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.12';

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
// 1. NVDA-SPCX $260B GPU deal
{file:'nvda-spcx-260b-gpu-deal-q1-2027',symbol:'NVDA',
 ko:{title:'NVIDIA — 스페이스X와 약 2,600억 달러 규모 GPU 공급·네트워킹 10년 계약 · 2027년 1분기 첫 배치 예정',heroIcon:'🤝',heroBig:'2,600억 달러',heroSub:'Evan D 정리에 따르면 엔비디아가 스페이스X와 GPU·SpecTrum·이더넷 네트워킹을 포함한 약 2,600억 달러 규모의 10년 장기 공급 계약을 맺었습니다. 첫 배치는 2027년 1분기부터 예정이며, 이 계약이 IBM과 엔비디아 조합의 규모를 이어받는 초대형 하이퍼스케일러 딜입니다.',
  cards:[{icon:'💰',big:'2,600억 달러',mid:'10년 총 계약 규모',sub:'GPU + 네트워킹'},{icon:'📅',big:'Q1 2027',mid:'첫 GPU 배치 시점',sub:'초기 인도 시작'},{icon:'⚡',big:'400조 토큰',mid:'예상 처리 규모',sub:'AI 학습 인프라'}],
  quoteLabel:'EVAN D · X 정리',quoteKo:'"엔비디아가 스페이스X와 GPU와 네트워킹까지 포함한 2,600억 달러 10년 계약을 맺었고, 2027년 1분기부터 첫 배치가 시작됩니다."',quoteEn:'Nvidia has ~$260B multi-year GPU deal with SpaceX incl. Spectrum/Ethernet networking · 10-year · first deployment Q1 2027',
  source:'출처: Evan D · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'스페이스X 인프라 확장 규모가 2,600억 달러 계약으로 실체가 됐습니다. 어제 언급된 5,000억 달러 컨소시엄과 별개로 엔비디아 개별 딜만 이 규모라면, xAI/Grok/Colossus 확장의 재무·부품 근거가 매우 견고해집니다.',footer:'NVDA·SPCX · 2,600억 달러 10년',brand:BK},
 en:{title:'NVIDIA — ~$260B GPU/Networking 10-Year Deal With SpaceX · First Deployment Q1 2027',heroIcon:'🤝',heroBig:'$260 B',heroSub:'Per Evan D: NVIDIA signed ~$260B multi-year GPU + Spectrum + Ethernet networking deal with SpaceX · 10-year contract · first deployment expected Q1 2027 · largest hyperscaler-scale deal succeeding the IBM+NVIDIA era.',
  cards:[{icon:'💰',big:'$260 B',mid:'10-year contract',sub:'GPU + networking'},{icon:'📅',big:'Q1 2027',mid:'First GPU delivery',sub:'Initial deployment'},{icon:'⚡',big:'400T tokens',mid:'Processing scale',sub:'AI training infra'}],
  quoteLabel:'EVAN D',quoteKo:'"NVDA + SPCX 2,600억 달러 10년 계약"',quoteEn:'Nvidia has ~$260B multi-year GPU deal with SpaceX incl. Spectrum/Ethernet networking · 10-year · first deployment Q1 2027',
  source:'Source: Evan D · 2026.08.11',
  noteHead:'Why this matters',noteSub:'SpaceX infra scale becomes concrete with $260B contract. Separate from yesterday $500B consortium, if NVDA individual deal is this size, financial/component basis for xAI/Grok/Colossus expansion is very solid.',footer:'NVDA·SPCX · $260B 10-year',brand:BE}},

// 2. SPCX 1.4 GW → 100 GW 2027
{file:'spcx-14gw-to-100gw-2027-300-500b-revenue',symbol:'SPCX',
 ko:{title:'SPCX — Musk "현재 통신 용량 1.4 GW → 2027년 말 100 GW로 확장·연 매출 3,000~5,000억 달러"',heroIcon:'⚡',heroBig:'100 GW',heroSub:'Sawyer Merritt이 전한 Musk 발언에 따르면 스페이스X가 현재 1.4 GW 통신 용량을 2027년 말까지 100 GW로 확장할 계획입니다. 이 정도 규모의 AI 컴퓨트를 온라인 서비스로 제공하면 연 매출 3,000억~5,000억 달러 수준이라고 Musk가 직접 밝혔습니다.',
  cards:[{icon:'📊',big:'1.4 → 100 GW',mid:'현재 → 2027년 말 목표',sub:'약 70배 확장'},{icon:'💵',big:'3,000~5,000억 달러',mid:'연 매출 잠재',sub:'100 GW AI 서비스 기준'},{icon:'📅',big:'2027년 말',mid:'목표 달성 시점',sub:'약 2년 반 남음'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"스페이스X는 현재 1.4 GW의 통신 용량을 가지고 있고 2027년 말까지 100 GW를 목표로 하고 있습니다. 이 정도 AI 컴퓨트를 온라인 서비스로 만들면 연 매출은 3,000억에서 5,000억 달러가 될 것입니다."',quoteEn:'SpaceX has 1.4 GW nameplate draw today · aiming to hit 100 GW by end of next year (2027) · if we bring 100 GW of AI online by end of next year revenue $300-500B a year · big numbers',
  source:'출처: Elon Musk · Sawyer Merritt · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'스페이스X가 통신 회사가 아니라 세계 최대급 AI 컴퓨트 사업자로 전환한다는 뜻입니다. 어제까지의 5,000억 달러 컨소시엄·오늘 엔비디아 2,600억 달러 딜의 실 용도는 바로 이 100 GW 확장 자금과 부품이며, Wood 프레임(50X astonishing)·samuel AI backbone 프레임의 실 수치 근거가 됩니다.',footer:'SPCX · 100 GW · 5,000억 달러',brand:BK},
 en:{title:'SPCX — Musk "1.4 GW Today → 100 GW by End of 2027 · $300-500B Annual Revenue"',heroIcon:'⚡',heroBig:'100 GW',heroSub:'Per Sawyer Merritt: Musk says SpaceX has 1.4 GW nameplate draw today, aiming for 100 GW by end of 2027. If 100 GW AI comes online, annual revenue $300-500B.',
  cards:[{icon:'📊',big:'1.4 → 100 GW',mid:'Current → 2027 target',sub:'~70x expansion'},{icon:'💵',big:'$300-500 B',mid:'Annual revenue potential',sub:'100 GW AI service basis'},{icon:'📅',big:'End 2027',mid:'Target timeline',sub:'~2.5 years remaining'}],
  quoteLabel:'ELON MUSK · SAWYER MERRITT',quoteKo:'"1.4 GW → 100 GW · 매출 3,000-5,000억 달러"',quoteEn:'SpaceX has 1.4 GW nameplate draw today · aiming to hit 100 GW by end of next year (2027) · if we bring 100 GW of AI online by end of next year revenue $300-500B a year · big numbers',
  source:'Source: Elon Musk · Sawyer Merritt · 2026.08.11',
  noteHead:'Why this matters',noteSub:'SPCX transforming from telecom company into world-largest AI compute operator. Yesterday $500B consortium + today $260B NVDA deal actually fund this 100 GW expansion · substantiates Wood 50X frame and samuel AI backbone.',footer:'SPCX · 100 GW · $500B',brand:BE}},

// 3. MS $600 bull SPCX + Cursor ARR
{file:'ms-600-bull-spcx-top-pick-cursor-arr-2b',symbol:'SPCX',
 ko:{title:'SPCX — 모건스탠리 목표가 300달러·불 케이스 600달러·Top Pick 지정·Cursor 연간 반복 매출 2030년 20억 달러 전망',heroIcon:'🎯',heroBig:'600 달러',heroSub:'Walter Bloomberg 정리에 따르면 모건스탠리가 SPCX 목표가를 300달러로 유지하고 불 케이스는 600달러로 설정했습니다. Cursor 인수에 따른 실리콘 통합을 근거로 SPCX를 Top Pick으로 지정했으며, Cursor 연간 반복 매출이 연말 8,800만 달러·2030년 20억 달러에 이를 것으로 전망했습니다.',
  cards:[{icon:'🎯',big:'600 달러',mid:'모건스탠리 불 케이스',sub:'기본 300 달러'},{icon:'⭐',big:'Top Pick',mid:'우선순위 매수 종목',sub:'Cursor 인수 근거'},{icon:'💰',big:'20억 달러',mid:'Cursor ARR 2030 전망',sub:'연말 8,800만 달러'}],
  quoteLabel:'MORGAN STANLEY · WALTER BLOOMBERG',quoteKo:'"모건스탠리가 SPCX Top Pick·목표 300달러·불 케이스 600달러·Cursor ARR 연말 8,800만 달러·2030년 20억 달러 전망"',quoteEn:'MORGAN STANLEY SEES $300 TARGET · $600 BULL · maintains SPCX target · adds SpaceX as Top Pick after planned Silicon integration of Cursor deal · Cursor joined by 84% of Fortune 500 and 50,000 enterprise customers · MS expects Cursor ARR to hit $88M year-end and $2B by 2030',
  source:'출처: Walter Bloomberg · Morgan Stanley · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 8/11 리포트의 SPCX Cursor 600억 달러 인수 뉴스가 하루 만에 모건스탠리 Top Pick 상향과 매출 전망으로 실체화됐습니다. Cursor가 포춘 500 기업 84%와 5만 개 기업 고객을 이미 확보한 상태에서 SPCX 소속이 되면 매출 확장 속도가 극단으로 빨라집니다.',footer:'SPCX · MS Top Pick · 600달러',brand:BK},
 en:{title:'SPCX — Morgan Stanley $300 Target · $600 Bull Case · Top Pick · Cursor ARR $2B by 2030',heroIcon:'🎯',heroBig:'$600',heroSub:'Per Walter Bloomberg: Morgan Stanley sees $300 SPCX target, $600 bull case. Adds SPCX as Top Pick after Cursor deal. Cursor ARR expected to hit $88M year-end and $2B by 2030.',
  cards:[{icon:'🎯',big:'$600',mid:'MS bull case',sub:'Base $300'},{icon:'⭐',big:'Top Pick',mid:'Priority buy',sub:'Cursor rationale'},{icon:'💰',big:'$2 B',mid:'Cursor ARR by 2030',sub:'$88M year-end'}],
  quoteLabel:'MORGAN STANLEY',quoteKo:'"MS Top Pick·600달러·Cursor ARR $2B"',quoteEn:'MORGAN STANLEY SEES $300 TARGET · $600 BULL · adds SPCX as Top Pick after planned Silicon integration of Cursor deal · Cursor joined by 84% of Fortune 500 and 50,000 enterprise customers · MS expects Cursor ARR to hit $88M year-end and $2B by 2030',
  source:'Source: Walter Bloomberg · Morgan Stanley · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Yesterday 8/11 SPCX Cursor $60B acquisition becomes concrete overnight with MS Top Pick upgrade and revenue forecast. Cursor already has 84% Fortune 500 and 50K enterprise customers · SPCX ownership will accelerate revenue rapidly.',footer:'SPCX · MS Top Pick · $600',brand:BE}},

// 4. TSLA Optimus 100 → 1M 프레임
{file:'tsla-optimus-100-units-2029-1m-2035',symbol:'TSLA',
 ko:{title:'TSLA — Shay Boloor "Optimus 2029년 100대 · 2035년 100만 대 확장 프레임"',heroIcon:'🤖',heroBig:'100만 대',heroSub:'Shay Boloor 정리에 따르면 Tesla Optimus 로봇이 2029년까지 100대 생산으로 시작해서 2035년까지 연 100만 대 수준으로 확장될 것이라고 프레임했습니다. Musk가 "physical bot이 로봇의 최상단"이라고 발언한 배경과 함께 나온 장기 로드맵입니다.',
  cards:[{icon:'🤖',big:'100대',mid:'2029년 생산 규모',sub:'초기 상용화'},{icon:'📈',big:'100만 대',mid:'2035년 연간 목표',sub:'대량 생산 확장'},{icon:'⏱️',big:'6년',mid:'100대 → 100만 대',sub:'10,000배 확장'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Tesla Optimus는 2029년에 100대 생산에서 시작해 2035년까지 연 100만 대 수준으로 확장될 것입니다."',quoteEn:'Tesla Optimus scale 100 units by 2029, 1M units by 2035 · Musk says physical bot is #1 inside those robots',
  source:'출처: Shay Boloor · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'6년 만에 10,000배 확장 로드맵입니다. 어제 Tesla Cybercab Giga Texas 상업 생산 임박·앱 1천만 사용자·모든 차량 스타링크 프레임에 이어 Optimus까지 확장되면, Tesla가 자동차 회사에서 로봇·자율주행·인프라 회사로 재정의됩니다.',footer:'TSLA Optimus · 100 → 100만 대',brand:BK},
 en:{title:'TSLA — Shay Boloor "Optimus 100 Units by 2029 · 1M Units by 2035"',heroIcon:'🤖',heroBig:'1M units',heroSub:'Per Shay Boloor: Tesla Optimus scales from 100 units by 2029 to 1M units by 2035. Musk says physical bot is #1 inside those robots.',
  cards:[{icon:'🤖',big:'100',mid:'2029 production',sub:'Initial commercial'},{icon:'📈',big:'1M',mid:'2035 annual target',sub:'Mass production'},{icon:'⏱️',big:'6 years',mid:'100 → 1M units',sub:'10,000x expansion'}],
  quoteLabel:'SHAY BOLOOR',quoteKo:'"Optimus 100 → 100만"',quoteEn:'Tesla Optimus scale 100 units by 2029, 1M units by 2035 · Musk says physical bot is #1 inside those robots',
  source:'Source: Shay Boloor · 2026.08.11',
  noteHead:'Why this matters',noteSub:'10,000x expansion in 6 years. Following yesterday Cybercab commercial production near, 10M app users, all-cars-Starlink frame, Optimus scaling redefines Tesla from car company to robotics/autonomy/infra.',footer:'TSLA Optimus · 100 → 1M',brand:BE}},

// 5. META Muse Glimmer + Treasury 지원
{file:'meta-muse-glimmer-30b-openweight-treasury',symbol:'META',
 ko:{title:'META — Muse Glimmer 300억 파라미터 3D AI 모델 오픈웨이트 공개·재무부 장관이 미국 AI 리더십 사례로 공식 지지',heroIcon:'🌐',heroBig:'300억',heroSub:'저커버그가 Muse Glimmer라는 300억 파라미터 규모의 3D 생성 AI 모델을 오픈웨이트로 공개했다고 발표했습니다. 이례적으로 재무부 장관이 "미국 AI 리더십을 유지하는 사례"라고 공식 지지 성명을 냈으며, 곧 Muse Spark 1.2 최신 기반 모델도 공개할 예정입니다.',
  cards:[{icon:'🌐',big:'300억',mid:'Muse Glimmer 파라미터',sub:'로컬 실행 가능'},{icon:'🏛️',big:'재무부 지지',mid:'미국 AI 리더십 사례',sub:'Scott 장관 공식 성명'},{icon:'📦',big:'Muse Spark 1.2',mid:'차기 기반 모델',sub:'곧 오픈웨이트 공개'}],
  quoteLabel:'MARK ZUCKERBERG · TREASURY SECRETARY',quoteKo:'"Muse Glimmer 300억 파라미터 dense 모델·로컬 실행 가능·오픈소스 지지·Meta의 개방형·폐쇄형 모델 동시 진화가 미국 AI 리더십을 유지시킨다"',quoteEn:'Zuckerberg opens weights for Muse Glimmer, great 30B parameter dense model that can run locally · Treasury Secretary Scott: Meta open-source is win for American innovation · sustaining US AI leadership requires advancing both open and closed weight models',
  source:'출처: Mark Zuckerberg · Treasury Secretary Scott · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'중국 오픈웨이트 모델(DeepSeek·Qwen)이 세계 AI 기반이 되어가는 상황에서, 미국 정부가 처음으로 오픈웨이트를 공식 지지했습니다. 오늘 별개 리포트의 NVIDIA Nemotron 3.5 Lightning 오픈 모델과 결합해서 미국 AI 진영이 오픈웨이트로 대응한다는 신호입니다.',footer:'META · Muse Glimmer 오픈',brand:BK},
 en:{title:'META — Muse Glimmer 30B Parameter 3D AI Open-Weight Release · Treasury Secretary Endorses',heroIcon:'🌐',heroBig:'30B',heroSub:'Zuckerberg opens Muse Glimmer 30B parameter 3D generation model as open weight. Unusually, Treasury Secretary publicly endorses as sustaining US AI leadership. Muse Spark 1.2 foundation model to follow.',
  cards:[{icon:'🌐',big:'30B',mid:'Muse Glimmer params',sub:'Runs locally'},{icon:'🏛️',big:'Treasury backs',mid:'US AI leadership case',sub:'Scott official statement'},{icon:'📦',big:'Muse Spark 1.2',mid:'Next foundation',sub:'Open weight soon'}],
  quoteLabel:'ZUCKERBERG · TREASURY',quoteKo:'"META Muse Glimmer 30B 오픈"',quoteEn:'Zuckerberg opens weights for Muse Glimmer 30B dense model · Treasury Secretary Scott: sustaining US AI leadership requires advancing both open and closed weight models',
  source:'Source: Zuckerberg · Treasury Secretary Scott · 2026.08.11',
  noteHead:'Why this matters',noteSub:'With Chinese open-weight models (DeepSeek/Qwen) becoming global AI foundation, US government publicly endorses open-weight for first time. Combined with NVIDIA Nemotron open model today, signals US AI camp responding with open weights.',footer:'META · Muse Glimmer',brand:BE}},

// 6. NVDA Nemotron 3.5 Lightning
{file:'nvda-nemotron-35-lightning-open-ai-model',symbol:'NVDA',
 ko:{title:'NVIDIA — 자체 오픈 AI 모델 Nemotron 3.5 Lightning 출시·Switchyard 라우터로 Opus 4.8 대비 1/3 비용·중국 오픈 모델에 대응',heroIcon:'⚙️',heroBig:'1/3 비용',heroSub:'Bull Theory 정리에 따르면 엔비디아가 자체 오픈 AI 모델 Nemotron 3.5 Lightning을 출시했습니다. Meta의 강력한 모델 지식을 작게 압축한 형태로 일반 작업 비용이 저렴합니다. 단순 작업은 작은 모델로, 복잡 작업은 강력한 모델로 자동 배분하는 Switchyard 라우터도 함께 공개했고, Opus 4.8 대비 1/3 비용으로 유사한 정확도를 냅니다.',
  cards:[{icon:'⚙️',big:'Nemotron 3.5',mid:'엔비디아 오픈 모델',sub:'Lightning 버전'},{icon:'🔀',big:'Switchyard',mid:'자동 라우터',sub:'단순·복잡 작업 배분'},{icon:'💰',big:'1/3 비용',mid:'Opus 4.8 대비',sub:'유사 정확도'}],
  quoteLabel:'BULL THEORY · NVIDIA',quoteKo:'"엔비디아가 오픈 AI 모델 Nemotron 3.5 Lightning 출시·Switchyard 라우터로 Opus 4.8 대비 1/3 비용에 유사한 정확도"',quoteEn:'NVIDIA launches Nemotron 3.5 Lightning open AI model · packaged smaller in size cheaper for routine tasks · Switchyard router · similar accuracy at 1/3 cost of Opus 4.8',
  source:'출처: Bull Theory · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'엔비디아는 GPU 하드웨어 회사인데 오픈 소프트웨어 모델까지 출시하는 이유는 하드웨어 판매 유지·중국 오픈 모델 대응·자체 하드웨어 최적화 소프트웨어 확대입니다. 오늘 별개 리포트의 META Muse Glimmer 오픈과 함께 미국 AI 진영의 오픈 대응 흐름입니다.',footer:'NVDA · Nemotron 3.5 · 1/3 비용',brand:BK},
 en:{title:'NVIDIA — Nemotron 3.5 Lightning Open AI Model · Switchyard Router · 1/3 Cost of Opus 4.8',heroIcon:'⚙️',heroBig:'1/3 cost',heroSub:'Per Bull Theory: NVIDIA launches Nemotron 3.5 Lightning open AI model. Compressed knowledge from Meta powerful models, cheaper routine tasks. Switchyard router auto-routes simple tasks to small model, complex to powerful. 1/3 cost of Opus 4.8, similar accuracy.',
  cards:[{icon:'⚙️',big:'Nemotron 3.5',mid:'NVDA open model',sub:'Lightning version'},{icon:'🔀',big:'Switchyard',mid:'Auto router',sub:'Simple/complex split'},{icon:'💰',big:'1/3 cost',mid:'vs Opus 4.8',sub:'Similar accuracy'}],
  quoteLabel:'BULL THEORY · NVIDIA',quoteKo:'"NVIDIA Nemotron 3.5"',quoteEn:'NVIDIA launches Nemotron 3.5 Lightning open AI model · Switchyard router · similar accuracy at 1/3 cost of Opus 4.8',
  source:'Source: Bull Theory · 2026.08.11',
  noteHead:'Why this matters',noteSub:'NVIDIA is hardware company but releases open software model to sustain hardware sales, respond to Chinese open models, expand own hardware-optimized software. Combined with META Muse Glimmer open today, US AI open response flow.',footer:'NVDA · Nemotron 3.5',brand:BE}},

// 7. TSLA Cybercab first Starlink Integration
{file:'tsla-cybercab-first-starlink-integration',symbol:'TSLA',
 ko:{title:'TSLA — Cybercab 첫 "Starlink 통합" 차량 정식 출시·차량 내 상시 인터넷 실현',heroIcon:'🛰️',heroBig:'첫 통합',heroSub:'TheSonOfWakley 전달에 따르면 테슬라가 Cybercab에 "Starlink 통합" 기능을 정식으로 탑재해 첫 차량을 출시했습니다. 어제 Musk가 발언한 "미래에 모든 차량에 스타링크 탑재" 프레임이 하루 만에 Cybercab에서 실체화됐고, 차량 내 상시 위성 인터넷이 실현됩니다.',
  cards:[{icon:'🛰️',big:'첫 통합',mid:'Cybercab + Starlink',sub:'정식 출시'},{icon:'🚕',big:'Cybercab',mid:'첫 적용 차종',sub:'로보택시 전용'},{icon:'📶',big:'상시 인터넷',mid:'차량 내 위성 연결',sub:'셀룰러 대체'}],
  quoteLabel:'THESONOFWAKLEY',quoteKo:'"테슬라가 Cybercab에 Starlink 통합을 정식 탑재한 첫 차량을 출시했습니다. 놀라운 통합입니다."',quoteEn:'TESLA LAUNCHES FIRST CYBERCAB WITH "STARLINK INTEGRATION" · Amazing integration!',
  source:'출처: TheSonOfWakley · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'어제 Musk 발언 "미래에 모든 차량 Starlink 탑재"가 하루 만에 Cybercab에서 실체화됐습니다. 어제 별개 리포트의 Cybercab Giga Texas 상업 생산 임박·앱 1천만 사용자와 결합해서, Robotaxi 상용 서비스가 스타링크 인프라 위에서 작동하는 그림이 완성됩니다.',footer:'TSLA · Cybercab + Starlink',brand:BK},
 en:{title:'TSLA — First Cybercab with "Starlink Integration" Launches · In-Car Always-On Satellite Internet',heroIcon:'🛰️',heroBig:'FIRST',heroSub:'Per TheSonOfWakley: Tesla launches first Cybercab with official "Starlink Integration" feature. Yesterday Musk "all cars will have Starlink" statement materializes overnight in Cybercab. Always-on in-vehicle satellite internet realized.',
  cards:[{icon:'🛰️',big:'FIRST',mid:'Cybercab + Starlink',sub:'Official launch'},{icon:'🚕',big:'Cybercab',mid:'First adopting model',sub:'Robotaxi-dedicated'},{icon:'📶',big:'Always-on',mid:'In-vehicle satellite',sub:'Cellular replacement'}],
  quoteLabel:'THESONOFWAKLEY',quoteKo:'"Cybercab 첫 Starlink 통합"',quoteEn:'TESLA LAUNCHES FIRST CYBERCAB WITH "STARLINK INTEGRATION" · Amazing integration!',
  source:'Source: TheSonOfWakley · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Yesterday Musk "all cars Starlink future" materializes overnight in Cybercab. Combined with Cybercab commercial production near and 10M app users, Robotaxi commercial service operating on Starlink infrastructure completes picture.',footer:'TSLA · Cybercab+Starlink',brand:BE}},

// 8. TSLA $10.1B 태양광 flyover
{file:'tsla-101b-solar-fort-bend-flyover-3000acres',symbol:'TSLA',
 ko:{title:'TSLA — Fort Bend County 101억 달러 태양광 셀 공장 현장 항공 사진 첫 공개·3,000 에이커 규모·수직 통합 에너지 확장',heroIcon:'☀️',heroBig:'3,000 에이커',heroSub:'Cosmos Europa가 공개한 항공 사진에 따르면 어제까지 발표만 있었던 텍사스 Fort Bend County 태양광 셀 공장 부지가 실체로 확인됐습니다. FM 1994와 FM 762 도로 근처 3,000 에이커 규모이고 W.A. Parish 발전소 근처의 전력 인프라와 인접한 위치입니다. 태양광 셀과 모듈을 대량 생산해서 테슬라 수직 통합 에너지 사업을 강화합니다.',
  cards:[{icon:'☀️',big:'3,000 에이커',mid:'부지 규모',sub:'FM 1994·FM 762 인접'},{icon:'⚡',big:'W.A. Parish',mid:'인접 발전소',sub:'전력 인프라 시너지'},{icon:'💰',big:'101억 달러',mid:'투자 규모',sub:'수직 통합 확장'}],
  quoteLabel:'COSMOS EUROPA',quoteKo:'"Fort Bend County 텍사스 SpaceX 태양광 부지가 실체를 드러냈습니다. 3,000 에이커 규모·태양광 셀과 모듈을 대량 생산·테슬라 수직 통합 에너지 사업 강화. 테슬라는 이제 자동차와 배터리만 만드는 게 아니라 텍사스에 완전한 에너지 생태계를 짓고 있습니다."',quoteEn:'SPACEX $10.1B solar project taking shape in Texas · flyover proposed site in Fort Bend County · 3,000+ acres near FM 1994 and FM 762 · would manufacture solar cells and modules at massive scale · strengthening Tesla vertically integrated energy business · near WA Parish Generating Station · building entire energy ecosystem',
  source:'출처: Cosmos Europa · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'8/7 발표 시점에는 규모만 있었지만 이제 항공 사진으로 3,000 에이커 실 부지가 확인됐습니다. Terafab 규모(Pentagon 10배)와 함께 텍사스가 미국 AI·에너지·chip 인프라의 중심지가 되고 있으며, Tesla가 에너지 회사로도 확장한다는 실체입니다.',footer:'TSLA · Fort Bend · 3,000 에이커',brand:BK},
 en:{title:'TSLA — Fort Bend County $10.1B Solar Cell Factory Aerial Photos First Revealed · 3,000+ Acres · Vertical Energy Expansion',heroIcon:'☀️',heroBig:'3,000 acres',heroSub:'Per Cosmos Europa: Aerial photos reveal Texas Fort Bend County solar cell factory site announced but not seen. 3,000+ acres near FM 1994/762 roads, adjacent to WA Parish Generating Station power infra. Mass produces solar cells/modules, strengthens Tesla vertical energy business.',
  cards:[{icon:'☀️',big:'3,000 acres',mid:'Site size',sub:'FM 1994/762 area'},{icon:'⚡',big:'WA Parish',mid:'Adjacent plant',sub:'Power infra synergy'},{icon:'💰',big:'$10.1 B',mid:'Investment',sub:'Vertical expansion'}],
  quoteLabel:'COSMOS EUROPA',quoteKo:'"Fort Bend 3,000 에이커 태양광"',quoteEn:'SPACEX $10.1B solar project taking shape in Texas · flyover proposed site in Fort Bend County · 3,000+ acres near FM 1994 and FM 762 · would manufacture solar cells and modules at massive scale',
  source:'Source: Cosmos Europa · 2026.08.11',
  noteHead:'Why this matters',noteSub:'8/7 announcement had scale only, now aerial photos confirm 3,000-acre real site. With Terafab (10x Pentagon), Texas becoming center of US AI/energy/chip infrastructure. Tesla real extension into energy company.',footer:'TSLA · Fort Bend · 3,000 acres',brand:BE}},

// 9. GOOGL Gemini 18억
{file:'googl-gemini-18b-monthly-users-14th-1b-product',symbol:'GOOGL',
 ko:{title:'GOOGL — Sundar Pichai "Gemini 월간 사용자 18억 명 돌파·구글 사상 가장 빠른 성장 상품·14번째 10억 사용자 상품"',heroIcon:'🚀',heroBig:'18억',heroSub:'구글 CEO Sundar Pichai가 공식 발표한 바에 따르면 Gemini의 월간 사용자가 18억 명을 돌파했습니다. Gemini는 구글 역사상 가장 빠르게 성장한 상품이며, 구글이 만든 상품 중 14번째로 10억 사용자 마일스톤을 돌파한 케이스입니다.',
  cards:[{icon:'🚀',big:'18억',mid:'Gemini 월간 사용자',sub:'모든 구글 상품 중'},{icon:'⚡',big:'가장 빠름',mid:'구글 사상 최고 속도',sub:'상품 성장'},{icon:'🏆',big:'14번째',mid:'10억 사용자 상품',sub:'구글 마일스톤'}],
  quoteLabel:'SUNDAR PICHAI · GOOGLE CEO',quoteKo:'"18억 명 이상이 매달 Gemini를 사용해서 새로운 아이디어를 얻고 일을 처리하고 있습니다. Gemini는 우리의 가장 빠르게 성장하는 상품이며, 10억 사용자를 돌파한 14번째 상품입니다."',quoteEn:'"1.8B+ people are now using Gemini every month to spark new ideas and get things done · fastest growing product ever · 14th to hit 1B-user mark" — Sundar Pichai',
  source:'출처: Sundar Pichai · Google · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'ChatGPT 사용자 규모(약 5-7억 월간)를 크게 뛰어넘는 수치입니다. 어제 GOOGL 현금 사상 최대 2,425억 달러·순현금 1,440억 달러 프레임과 결합해서, 구글이 AI 사이클의 실 수혜자이며 AI CAPEX 정당화 실체가 확인됩니다.',footer:'GOOGL · Gemini 18억 사용자',brand:BK},
 en:{title:'GOOGL — Sundar Pichai "Gemini 1.8B Monthly Users · Fastest Growing Google Product · 14th to Hit 1B"',heroIcon:'🚀',heroBig:'1.8B',heroSub:'Per Google CEO Sundar Pichai: Gemini monthly users exceeded 1.8B. Fastest growing product in Google history, 14th product to hit 1B user milestone.',
  cards:[{icon:'🚀',big:'1.8B',mid:'Gemini monthly users',sub:'All Google products'},{icon:'⚡',big:'Fastest',mid:'Google history growth',sub:'Product scale'},{icon:'🏆',big:'14th',mid:'To hit 1B users',sub:'Google milestone'}],
  quoteLabel:'SUNDAR PICHAI',quoteKo:'"Gemini 18억 사용자"',quoteEn:'1.8B+ people are now using Gemini every month · fastest growing product ever · 14th to hit 1B-user mark',
  source:'Source: Sundar Pichai · Google · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Far exceeds ChatGPT user scale (~500-700M monthly). Combined with yesterday GOOGL record cash $242.5B / net $144B, confirms Google as real AI cycle beneficiary and AI CAPEX justification.',footer:'GOOGL · Gemini 1.8B',brand:BE}},

// 10. Anthropic IPO next month
{file:'anthropic-ipo-next-month-kalshi',symbol:'MACRO',
 ko:{title:'매크로 — Anthropic 다음 달 상장 가능성 보도·주요 AI 기업 첫 공모 흐름',heroIcon:'📈',heroBig:'다음 달',heroSub:'Kalshi Finance가 전한 바에 따르면 Anthropic이 다음 달 상장(IPO) 가능성이 있는 것으로 보도됐습니다. 이 계획이 실현되면 OpenAI에 이은 주요 AI 기업의 첫 공모이며, AI 기업 밸류에이션 재평가와 시장 전체 위험 자산 흐름을 결정하는 사건이 될 수 있습니다.',
  cards:[{icon:'📅',big:'다음 달',mid:'상장 가능 시점',sub:'2026년 9월 예상'},{icon:'🤖',big:'Anthropic',mid:'대표 AI 기업',sub:'Claude 개발사'},{icon:'💵',big:'수백억 달러',mid:'예상 밸류에이션',sub:'AI 첫 상장 규모'}],
  quoteLabel:'KALSHI FINANCE',quoteKo:'"Anthropic이 다음 달 이르면 상장할 수 있다고 보도됐습니다."',quoteEn:'JUST IN: Anthropic could reportedly launch its IPO as early as next month',
  source:'출처: Kalshi Finance · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'구글이 Anthropic에 이미 대규모 투자한 상태에서 Anthropic 상장은 구글 재무 강세를 실체화할 사건입니다. SPCX·xAI 같은 비상장 AI 기업 밸류에이션 기준점 역할도 하며, 8/11 SPCX Cursor 600억 인수·오늘 Cursor ARR 2030년 20억 프레임과 결합해서 AI 상장 사이클의 개시 신호일 수 있습니다.',footer:'Anthropic IPO · 다음 달',brand:BK},
 en:{title:'MACRO — Anthropic IPO as Early as Next Month · Major AI Company First Public Listing',heroIcon:'📈',heroBig:'Next month',heroSub:'Per Kalshi Finance: Anthropic could reportedly launch IPO as early as next month. If realized, first major AI IPO after OpenAI. Would trigger AI company valuation re-rating and market-wide risk asset flow.',
  cards:[{icon:'📅',big:'Next month',mid:'Possible IPO timing',sub:'September 2026'},{icon:'🤖',big:'Anthropic',mid:'Major AI company',sub:'Claude developer'},{icon:'💵',big:'Tens of B',mid:'Expected valuation',sub:'AI first IPO scale'}],
  quoteLabel:'KALSHI FINANCE',quoteKo:'"Anthropic IPO 다음 달"',quoteEn:'JUST IN: Anthropic could reportedly launch its IPO as early as next month',
  source:'Source: Kalshi Finance · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Google already heavily invested in Anthropic, so Anthropic IPO materializes Google financial strength. Anchor for private AI valuations (SPCX/xAI). Combined with 8/11 SPCX $60B Cursor and today Cursor ARR $2B by 2030, may signal start of AI IPO cycle.',footer:'Anthropic IPO · Next month',brand:BE}},

// 11. S&P 500 +32% Bilello
{file:'sp500-2026-earnings-32pct-ai-driven-bilello',symbol:'SPX',
 ko:{title:'S&P 500 — Charlie Bilello "2026년 이익 +32% 급증 예상·연초 예상 대비 2배·AI 사이클이 유일한 원인"',heroIcon:'📊',heroBig:'+32%',heroSub:'Charlie Bilello 분석에 따르면 S&P 500의 2026년 이익 성장률이 +32%로 예상됩니다. 연초 예상치 +15% 대비 2배 이상이며, 이 수준의 이익 성장은 역사적으로 경기 침체 후 회복기에만 나온 규모입니다. 이번에는 경기 침체 없이 AI 사이클 하나가 이 성장을 만들고 있습니다.',
  cards:[{icon:'📈',big:'+32%',mid:'2026년 이익 성장 예상',sub:'S&P 500 전체'},{icon:'📅',big:'2배 상향',mid:'연초 예상 +15% 대비',sub:'예상 확대'},{icon:'🤖',big:'AI 사이클',mid:'유일한 원인',sub:'경기 침체 회복 아님'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"S&P 500 이익이 2026년 +32% 급증 예상·연초 +15% 예상의 2배·경기 침체 회복 아닌 이 수준 이익 성장은 사상 처음·AI 사이클이 유일한 원인"',quoteEn:'S&P 500 earnings now expected to surge 32% in 2026 · more than double 15% growth expected at start of year · never seen earnings growth this strong outside post-recession rebounds · this time no recession · unprecedented AI-driven boom',
  source:'출처: Charlie Bilello · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'주가 상승이 밸류에이션 확장(P/E 상승)이 아닌 실 이익 성장으로 정당화되고 있다는 뜻입니다. 어제 나스닥 100의 70%+ 200일 이평 위·오늘 별개 리포트의 Shiller CAPE 밸류에이션 경고와 결합해서, 이익 성장이 밸류에이션 프리미엄을 정당화하는지가 관건입니다.',footer:'SPX · 2026 이익 +32%',brand:BK},
 en:{title:'S&P 500 — Charlie Bilello "2026 Earnings Surge +32% · Double Start-of-Year · AI-Driven Only Cause"',heroIcon:'📊',heroBig:'+32%',heroSub:'Per Charlie Bilello: S&P 500 2026 earnings growth expected +32% · double start-of-year +15% · this level of earnings growth historically only in post-recession rebounds · no recession this time · AI cycle alone driving.',
  cards:[{icon:'📈',big:'+32%',mid:'2026 earnings growth',sub:'S&P 500 total'},{icon:'📅',big:'2x raise',mid:'vs start-of-year +15%',sub:'Estimate expansion'},{icon:'🤖',big:'AI cycle',mid:'Only cause',sub:'Not recession recovery'}],
  quoteLabel:'CHARLIE BILELLO',quoteKo:'"SPX 2026 이익 +32%"',quoteEn:'S&P 500 earnings now expected to surge 32% in 2026 · unprecedented AI-driven boom',
  source:'Source: Charlie Bilello · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Stock rally justified by real earnings growth (not multiple expansion). Combined with yesterday Nasdaq 100 70%+ above 200DMA and today Shiller CAPE valuation warning, question is whether earnings growth justifies valuation premium.',footer:'SPX · 2026 EPS +32%',brand:BE}},

// 12. Shiller CAPE 2nd most expensive
{file:'macro-shiller-cape-1929-dotcom-valuation-warn',symbol:'MACRO',
 ko:{title:'매크로 — Shiller CAPE 밸류에이션 역사상 2번째 최고·1929 폭락 넘어·닷컴 버블에 근접',heroIcon:'⚠️',heroBig:'2번째 최고',heroSub:'Barchart 정리에 따르면 미국 주식 시장 Shiller CAPE(경기 조정 P/E)가 역사상 2번째로 가장 비싼 수준입니다. 1929년 대공황 폭락 직전보다 훨씬 높고, 오직 2000년 닷컴 버블만 이보다 더 높았습니다. 밸류에이션 극단 경계 신호입니다.',
  cards:[{icon:'⚠️',big:'2번째 최고',mid:'역사상 valuation 순위',sub:'Shiller CAPE 기준'},{icon:'📉',big:'1929 초과',mid:'대공황 직전 대비',sub:'훨씬 더 비쌈'},{icon:'💻',big:'닷컴 근접',mid:'2000 버블만이 높음',sub:'유일한 상위 사례'}],
  quoteLabel:'BARCHART',quoteKo:'"미국 주식 시장이 역사상 2번째로 가장 비싼 밸류에이션에 도달·1929년 폭락 훨씬 초과·닷컴 버블에만 살짝 밀림"',quoteEn:'Stock Market hits 2nd most expensive valuation in history · far surpassing the Crash of 1929 · only slightly behind the Dot Com Bubble',
  source:'출처: Barchart · 2026.08.10',
  noteHead:'이 소식은 왜 중요한가',noteSub:'오늘 별개 리포트의 S&P 500 2026 이익 +32% 프레임과 이 밸류에이션 경고는 정면 대립입니다. AI 사이클이 이익 성장으로 밸류에이션을 정당화하면 지속 강세이지만, 이익 성장이 예상에 못 미치면 닷컴 버블 후속 급락 리스크도 실체입니다.',footer:'매크로 · 밸류에이션 경고',brand:BK},
 en:{title:'MACRO — Shiller CAPE 2nd Most Expensive in History · Past 1929 · Approaching Dot Com Bubble',heroIcon:'⚠️',heroBig:'2nd highest',heroSub:'Per Barchart: US stock market Shiller CAPE (cyclically adjusted P/E) is 2nd most expensive in history · far surpassing 1929 crash · only 2000 Dot Com Bubble higher · extreme valuation warning signal.',
  cards:[{icon:'⚠️',big:'2nd highest',mid:'Historical valuation rank',sub:'Shiller CAPE'},{icon:'📉',big:'Past 1929',mid:'vs pre-crash',sub:'Much more expensive'},{icon:'💻',big:'Near dotcom',mid:'Only 2000 higher',sub:'Sole exception'}],
  quoteLabel:'BARCHART',quoteKo:'"밸류에이션 역사 2번째"',quoteEn:'Stock Market hits 2nd most expensive valuation in history · far surpassing the Crash of 1929 · only slightly behind the Dot Com Bubble',
  source:'Source: Barchart · 2026.08.10',
  noteHead:'Why this matters',noteSub:'Today S&P 500 +32% earnings frame and this valuation warning directly oppose. If AI cycle earnings justify multiple, bull continues · if earnings miss, dotcom-style crash risk is real.',footer:'MACRO · Valuation Warning',brand:BE}},

// 13. X Trace 달 base SPCX+Tesla+Optimus
{file:'spcx-tesla-lunar-base-frame-xtrace',symbol:'SPCX',
 ko:{title:'SPCX — X Trace "SPCX + Tesla가 달 첫 상업 기지 만들 유일한 조합·Starship 100톤·Optimus 화물 하역·Tesla 에너지 시스템"',heroIcon:'🌙',heroBig:'달 기지',heroSub:'X Trace 분석에 따르면 중국이 달 첫 기지 건설 준비 중인 상황에서 SPCX가 이 방정식을 지배할 유일한 조합이라고 프레임했습니다. Starship이 달 표면까지 100톤 배송·서식지·로버·전력·건설 장비 운반·Tesla Optimus 로봇이 화물 하역과 위험한 건설 작업 수행·Tesla 태양광·배터리·자율주행 기술이 달 에너지·운송 시스템을 담당하는 구조입니다.',
  cards:[{icon:'🚀',big:'100톤',mid:'Starship 달 배송량',sub:'대형 화물 가능'},{icon:'🤖',big:'Optimus 하역',mid:'로봇 화물 처리',sub:'인간 이전 진입'},{icon:'⚡',big:'Tesla 에너지',mid:'태양광·배터리·자율',sub:'달 인프라 시스템'}],
  quoteLabel:'X TRACE',quoteKo:'"SpaceX가 운송을 담당하고 Tesla가 에너지·자율성·로봇을 담당하고 Starship이 규모를 제공하면, 갑자기 달에 기지를 짓는 게 극단으로 쉬워집니다."',quoteEn:'SpaceX provides transportation · Tesla provides energy, autonomy and robotics · Starship provides the scale · suddenly building a lunar base becomes dramatically easier',
  source:'출처: X Trace · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'우주 사업이 위성 통신을 넘어 행성 인프라 사업으로 확장한다는 프레임입니다. Musk 회사 그룹(SPCX·Tesla)이 유일한 지배적 조합이라는 근거이며, 어제까지 samuel AI backbone·Musk 100 GW·오늘 Optimus 100만 대 프레임과 결합해서 다행성 인프라 회사로의 재정의 흐름입니다.',footer:'SPCX·Tesla · 달 기지',brand:BK},
 en:{title:'SPCX — X Trace "SpaceX + Tesla Only Combination for Lunar Base · Starship 100t · Optimus Cargo · Tesla Energy"',heroIcon:'🌙',heroBig:'Lunar base',heroSub:'Per X Trace: With China preparing lunar base, SPCX dominates equation as sole combination. Starship 100t delivery to surface · Optimus cargo unloading + dangerous construction · Tesla solar/battery/autonomy for lunar energy/transport system.',
  cards:[{icon:'🚀',big:'100t',mid:'Starship lunar payload',sub:'Large cargo capable'},{icon:'🤖',big:'Optimus cargo',mid:'Robot handling',sub:'Pre-human entry'},{icon:'⚡',big:'Tesla energy',mid:'Solar/battery/autonomy',sub:'Lunar infra system'}],
  quoteLabel:'X TRACE',quoteKo:'"SPCX·Tesla·Starship 달 기지"',quoteEn:'SpaceX provides transportation · Tesla provides energy, autonomy and robotics · Starship provides the scale · suddenly building a lunar base becomes dramatically easier',
  source:'Source: X Trace · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Space business expanding beyond satellite comms to planetary infrastructure. Musk company group (SPCX/Tesla) as sole dominant combination. Combined with samuel AI backbone, Musk 100 GW, today Optimus 1M frame, redefinition as multi-planetary infra company.',footer:'SPCX·Tesla · Lunar Base',brand:BE}},

// 14. MS urges Tesla to prove robotaxi
{file:'ms-tesla-prove-robotaxi-scaling-investor',symbol:'TSLA',
 ko:{title:'TSLA — Kalshi "모건스탠리, 테슬라에게 로보택시 확장 증명 요구·투자자 신뢰 회복 필요"',heroIcon:'🚦',heroBig:'증명 요구',heroSub:'Kalshi 정리에 따르면 모건스탠리가 테슬라에게 로보택시가 실제로 확장되고 있다는 증거를 보여줄 것을 요구했습니다. 투자자 신뢰 회복을 위해서라는 이유이며, 어제 별개 리포트에서 MS가 SPCX Top Pick으로 지정한 것과 대비되어 TSLA는 아직 증명 단계라는 프레임입니다.',
  cards:[{icon:'🚦',big:'증명 요구',mid:'MS → TSLA 요구',sub:'실 확장 증거'},{icon:'📊',big:'투자자 신뢰',mid:'회복 필요 사항',sub:'MS 지적'},{icon:'⚖️',big:'SPCX vs TSLA',mid:'MS 상반된 입장',sub:'Top Pick vs 증명 요구'}],
  quoteLabel:'MORGAN STANLEY · KALSHI',quoteKo:'"모건스탠리가 테슬라에게 로보택시가 실제로 확장되고 있다는 것을 투자자 신뢰를 위해 증명하라고 요구했습니다."',quoteEn:'JUST IN: Morgan Stanley urges Tesla to "prove" robotaxis are scaling for investor confidence',
  source:'출처: Kalshi · Morgan Stanley · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'같은 모건스탠리가 오늘 SPCX는 600달러 불 케이스·Top Pick으로 강세인 반면, TSLA는 증명 요구라는 것이 상반된 입장입니다. 어제 별개 리포트의 Cybercab 로고 부착 대량 목격·오늘 Cybercab Starlink 통합 첫 출시와 결합해서, 실 상용 서비스 데이터 공개가 TSLA 다음 catalyst입니다.',footer:'TSLA · MS 증명 요구',brand:BK},
 en:{title:'TSLA — Kalshi "Morgan Stanley Urges Tesla to Prove Robotaxi Scaling for Investor Confidence"',heroIcon:'🚦',heroBig:'PROVE',heroSub:'Per Kalshi: Morgan Stanley urges Tesla to prove robotaxis actually scaling. For investor confidence recovery. Contrasts with same MS designating SPCX as Top Pick yesterday · TSLA still at proving stage frame.',
  cards:[{icon:'🚦',big:'Prove',mid:'MS → TSLA demand',sub:'Real scaling evidence'},{icon:'📊',big:'Investor conf.',mid:'Recovery needed',sub:'MS point'},{icon:'⚖️',big:'SPCX vs TSLA',mid:'MS opposite stances',sub:'Top Pick vs Prove'}],
  quoteLabel:'MORGAN STANLEY · KALSHI',quoteKo:'"TSLA 로보택시 증명 요구"',quoteEn:'JUST IN: Morgan Stanley urges Tesla to "prove" robotaxis are scaling for investor confidence',
  source:'Source: Kalshi · Morgan Stanley · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Same MS bull SPCX $600/Top Pick today while demanding TSLA prove is opposite stances. Combined with yesterday Cybercab logo mass sighting and today Cybercab Starlink first, real commercial service data disclosure is next TSLA catalyst.',footer:'TSLA · MS Prove',brand:BE}},

// 15. Andrew Curran xAI Grok Bot
{file:'xai-grok-bot-cloud-autonomous-agent-team',symbol:'SPCX',
 ko:{title:'xAI — Andrew Curran "Grok Bot 클라우드 자율 에이전트 팀 출시·복잡 다단계 작업 훈련·Colossus GPU 클러스터에서 자율 관리"',heroIcon:'🤖',heroBig:'자율 에이전트',heroSub:'Andrew Curran이 전달한 바에 따르면 xAI가 Grok Bot이라는 클라우드 호스팅 자율 에이전트 팀을 출시했습니다. 여러 단계 협조 작업에 훈련됐고, 서로 독립적으로 관리하며 Colossus GPU 클러스터를 사용해서 2분 20초 안에 결과를 낸다고 밝혔습니다.',
  cards:[{icon:'🤖',big:'자율 팀',mid:'클라우드 호스팅 에이전트',sub:'Grok Bot 명칭'},{icon:'⚡',big:'Colossus 사용',mid:'xAI GPU 클러스터',sub:'실 인프라 활용'},{icon:'⏱️',big:'2분 20초',mid:'복잡 작업 완료',sub:'다단계 협조'}],
  quoteLabel:'ANDREW CURRAN · xAI',quoteKo:'"xAI가 Grok Bot 출시·클라우드 호스팅 에이전트 팀·복잡 다단계 협조 작업 훈련·서로 독립 관리·Colossus GPU 클러스터 사용·2분 20초 완료"',quoteEn:'xAI just launched Grok Bot · cloud hosted agent team that never stops working · trained on complex multi-step coordinated jobs · independently manage each other · use Colossus GPU cluster · 2 minutes 20 seconds',
  source:'출처: Andrew Curran · 2026.08.11',
  noteHead:'이 소식은 왜 중요한가',noteSub:'오늘 별개 리포트의 samuel AI backbone·Musk 100 GW·NVDA 2,600억 GPU 딜 프레임의 실 사용 사례입니다. SPCX 100 GW 인프라와 xAI Grok Bot 서비스가 결합하면 SPCX가 AI 인프라·플랫폼·에이전트 서비스까지 통합 사업자로 확장됩니다.',footer:'xAI · Grok Bot 자율',brand:BK},
 en:{title:'xAI — Andrew Curran "Grok Bot Cloud Autonomous Agent Team · Complex Multi-Step Training · Runs on Colossus GPU Cluster"',heroIcon:'🤖',heroBig:'AUTONOMOUS',heroSub:'Per Andrew Curran: xAI launches Grok Bot cloud-hosted autonomous agent team. Trained on multi-step coordinated jobs, independently manage each other, use Colossus GPU cluster, completes in 2 minutes 20 seconds.',
  cards:[{icon:'🤖',big:'Autonomous',mid:'Cloud agent team',sub:'Grok Bot name'},{icon:'⚡',big:'Colossus use',mid:'xAI GPU cluster',sub:'Real infra utilization'},{icon:'⏱️',big:'2m 20s',mid:'Complex task done',sub:'Multi-step coord.'}],
  quoteLabel:'ANDREW CURRAN · xAI',quoteKo:'"xAI Grok Bot 자율 에이전트"',quoteEn:'xAI just launched Grok Bot · cloud hosted agent team · Colossus GPU cluster · 2 minutes 20 seconds',
  source:'Source: Andrew Curran · 2026.08.11',
  noteHead:'Why this matters',noteSub:'Real use case for today samuel AI backbone / Musk 100 GW / NVDA $260B GPU deal frames. Combined SPCX 100 GW infra + xAI Grok Bot service = SPCX expanding to AI infra/platform/agent service integrated operator.',footer:'xAI · Grok Bot',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260812.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260812-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
