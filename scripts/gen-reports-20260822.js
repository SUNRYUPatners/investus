// 2026-08-22 리포트 SVG 생성기 · 14 topics + summary · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.22';
const DATETAG = '20260822';

const PSYM = {
  TSLA: { fg:'#4ade80', fg2:'#22c55e', bg2:'#061209', card:'#0a1a0a' },
  NVDA: { fg:'#60a5fa', fg2:'#3b82f6', bg2:'#06121f', card:'#0a1420' },
  SPCX: { fg:'#c084fc', fg2:'#a78bfa', bg2:'#140b1f', card:'#1a0f2a' },
  GOOGL:{ fg:'#4285f4', fg2:'#34a853', bg2:'#06121f', card:'#0a1420' },
  MSFT: { fg:'#00a4ef', fg2:'#0078d4', bg2:'#061219', card:'#0a1520' },
  META: { fg:'#1877f2', fg2:'#1266d6', bg2:'#050c19', card:'#0a1420' },
  AMZN: { fg:'#ff9900', fg2:'#e58600', bg2:'#1a0e00', card:'#201408' },
  AAPL: { fg:'#a1a1aa', fg2:'#71717a', bg2:'#0f0f10', card:'#141416' },
  MACRO:{ fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
  SPX:  { fg:'#94a3b8', fg2:'#64748b', bg2:'#0c1017', card:'#111827' },
};

function esc(s){return String(s).replace(/&(?!(amp|lt|gt|quot|apos);)/g,'&amp;').replace(/</g,'&lt;');}
function E(o){const r={};for(const k in o)r[k]=typeof o[k]==='string'?esc(o[k]):o[k];return r;}

function estimatePxWidth(text, fontSize, isBold){
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

function multilineIfOverflow(text, x, y, fontSize, maxPxWidth, maxLines, lh, attrs){
  const isBold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, isBold);
  const px = est(text);
  if(px <= maxPxWidth){
    return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  }
  const rawParts = String(text).split(/(\s·\s|\s—\s|·|—)/).filter(p=>p!==undefined&&p!=='');
  const parts = [];
  for(const p of rawParts){
    if(est(p) <= maxPxWidth){ parts.push(p); continue; }
    const subs = p.split(/(\s+)/).filter(s=>s!=='');
    for(const s of subs){
      if(est(s) <= maxPxWidth){ parts.push(s); continue; }
      let tmp = s;
      while(est(tmp) > maxPxWidth){
        let cutAt = 1;
        while(cutAt < tmp.length && est(tmp.slice(0, cutAt+1)) <= maxPxWidth) cutAt++;
        parts.push(tmp.slice(0, cutAt));
        tmp = tmp.slice(cutAt);
      }
      if(tmp) parts.push(tmp);
    }
  }
  const lines=[]; let cur='';
  for(const p of parts){
    const test = cur + p;
    if(est(test) <= maxPxWidth) cur = test;
    else{
      if(cur.trim()) lines.push(cur.trim());
      cur = p.replace(/^[·—\s]+/,'').trim();
      if(lines.length >= maxLines) break;
    }
  }
  if(cur.trim() && lines.length < maxLines){
    if(est(cur) > maxPxWidth){
      let cutAt = 1;
      while(cutAt < cur.length && est(cur.slice(0, cutAt+1) + '…') <= maxPxWidth) cutAt++;
      cur = cur.slice(0, cutAt) + '…';
    }
    lines.push(cur);
  }
  return lines.slice(0, maxLines).map((l,i) =>
    `  <text x="${x}" y="${y+i*lh}" ${attrs}>${esc(l)}</text>`
  ).join('\n');
}

const F = {
  TITLE: 28, HERO_BIG: 42, HERO_SUB: 20,
  QUOTE_KO: 20, QUOTE_EN: 17,
  NOTE_HEAD: 19, NOTE_SUB: 17,
  CARD_BIG: 22, CARD_MID: 18, CARD_SUB: 16
};
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
${multilineIfOverflow(oRaw.quote, 540, 700, F.QUOTE_KO, MAX_W.WIDE, 4, 30, `font-family="Arial" font-size="${F.QUOTE_KO}" fill="${p.fg}" text-anchor="middle"`)}
  <text x="540" y="808" font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle">${o.dateLabel||DATE}</text>
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

function summarySvg(lang){
  const ko = lang==='ko';
  const brand = ko ? 'investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE' : 'investus.kr SRP Chief Investment Officer · NOT FINANCIAL ADVICE';
  const title = ko ? `${DATE} · 오늘의 한장 요약` : `${DATE} · Daily Snapshot`;
  const heroSub1 = ko
    ? 'JPM FSD V15 step-change·$450 PT·Nevada AV 허가·Austin Cybercab'
    : 'JPM FSD V15 step-change · $450 PT · Nevada AV · Austin Cybercab';
  const heroSub2 = ko
    ? 'SPCX Q2 $7.8B·+2,090%·FLT-14 9/15·Gold 4,643·30Y 5.282%'
    : 'SPCX Q2 $7.8B · +2,090% · FLT-14 9/15 · Gold 4,643 · 30Y 5.282%';
  const c = [
    {icon:'🤖', big: ko?'JPM FSD V15':'$450 PT', mid: ko?'step-change·$450 PT':'JPM step-change', sub: ko?'Kalshi 노트':'FSD V15 frame', stroke:'#4ade80', card:'#0a1a0a'},
    {icon:'🚕', big: ko?'Nevada AV':'Nevada AV', mid: ko?'풀 AV Network 허가':'Full AV Network', sub: ko?'Vegas 유료 Robotaxi':'Paid Vegas Robotaxi', stroke:'#4ade80', card:'#0a1a0a'},
    {icon:'🚀', big: ko?'Q2 $7.8B':'Q2 $7.8B', mid: ko?'매출 +93% YoY':'Revenue +93% YoY', sub: ko?'Starlink $4.3B 55%':'Starlink $4.3B 55%', stroke:'#c084fc', card:'#1a0f2a'},
    {icon:'📈', big: '+2,090%', mid: ko?'SPCX 5년 매출 성장':'SPCX 5yr rev growth', sub: ko?'Musk 초과 전망':'Musk: exceed est.', stroke:'#c084fc', card:'#1a0f2a'},
    {icon:'🥇', big: '4,643', mid: ko?'Gold Dec\'26':'Gold Dec\'26', sub: ko?'BTC 77,840 (+7.17%)':'BTC 77,840 (+7.17%)', stroke:'#94a3b8', card:'#111827'},
    {icon:'📉', big: '5.282%', mid: ko?'US 30Y 수익률':'US 30Y yield', sub: ko?'환매 급락 완전 소멸':'Buyback crash erased', stroke:'#94a3b8', card:'#111827'},
  ];
  const extra1 = ko
    ? 'Solar Roof 중단 · Optimus Berlin Gen2 · AST $6B 스펙트럼 · Waymo $20K HW · META Mag7 최하 52%'
    : 'Solar Roof discontinued · Optimus Berlin Gen2 · AST $6B spectrum · Waymo $20K HW · META Mag7 worst 52%';
  const extra2 = ko
    ? 'Dalio 금 15% · FLT-14 NET 9/15 · Austin Cybercab 임박 · Starship/FSD 축 동시 진전'
    : 'Dalio gold 15% · FLT-14 NET 9/15 · Austin Cybercab imminent · Starship/FSD axes advance';
  const topCards = c.slice(0,3).map((x,i)=>{
    const xpos=[60,390,720][i];
    return `
  <rect x="${xpos}" y="402" width="300" height="220" rx="16" fill="${x.card}" stroke="${x.stroke}" stroke-width="2"/>
  <text x="${xpos+150}" y="450" font-family="Arial" font-size="36" text-anchor="middle">${x.icon}</text>
  <text x="${xpos+150}" y="494" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${x.stroke}" text-anchor="middle">${esc(x.big)}</text>
  <text x="${xpos+150}" y="530" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">${esc(x.mid)}</text>
  <text x="${xpos+150}" y="590" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(x.sub)}</text>`;
  }).join('');
  const botCards = c.slice(3,6).map((x,i)=>{
    const xpos=[60,390,720][i];
    return `
  <rect x="${xpos}" y="642" width="300" height="180" rx="16" fill="${x.card}" stroke="${x.stroke}" stroke-width="2"/>
  <text x="${xpos+150}" y="694" font-family="Arial" font-size="36" text-anchor="middle">${x.icon}</text>
  <text x="${xpos+150}" y="738" font-family="Arial Black,Arial" font-size="22" font-weight="900" fill="${x.stroke}" text-anchor="middle">${esc(x.big)}</text>
  <text x="${xpos+150}" y="768" font-family="Arial" font-size="18" fill="#9ca3af" text-anchor="middle">${esc(x.mid)}</text>
  <text x="${xpos+150}" y="796" font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle">${esc(x.sub)}</text>`;
  }).join('');
  return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:#061209"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#4ade80"/><stop offset="100%" style="stop-color:#22c55e"/></linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="150" height="38" rx="19" fill="rgba(74,222,128,.18)" stroke="#4ade80" stroke-width="1.5"/>
  <text x="115" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="#4ade80" text-anchor="middle">DAILY</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>
  <text x="540" y="108" font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(title)}</text>
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="90" font-weight="900" fill="#4ade80" text-anchor="middle" opacity=".15">14</text>
  <text x="540" y="240" font-family="Arial Black,Arial" font-size="70" font-weight="900" fill="#4ade80" text-anchor="middle">TOP 14</text>
  <text x="540" y="300" font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="#f9fafb" text-anchor="middle">${esc(heroSub1)}</text>
  <text x="540" y="342" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">${esc(heroSub2)}</text>
  <line x1="80" y1="390" x2="1000" y2="390" stroke="#1f2937" stroke-width="1"/>
${topCards}
${botCards}
  <rect x="60" y="842" width="960" height="120" rx="16" fill="#0f172a" stroke="#374151"/>
  <text x="540" y="880" font-family="Arial" font-size="18" fill="#6b7280" text-anchor="middle" letter-spacing="2">EXTRA COVERAGE</text>
  <text x="540" y="912" font-family="Arial" font-size="17" fill="#e5e7eb" text-anchor="middle">${esc(extra1)}</text>
  <text x="540" y="940" font-family="Arial" font-size="17" fill="#e5e7eb" text-anchor="middle">${esc(extra2)}</text>
  <text x="540" y="994" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">INVESTUS · TOP 14 STORIES · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${esc(brand)}</text>
</svg>`;
}

const T=[
// 1. JPM FSD V15 · $450 PT
{file:'tsla-jpm-fsd-v15-450',symbol:'TSLA',
 ko:{title:'JPMorgan "Tesla FSD V15는 성능의 step-change"·Kalshi 노트 JPM $450 목표가',heroIcon:'🤖',heroBig:'$450 PT',heroSub:'JPMorgan이 Tesla FSD V15를 성능의 step-change로 평가했다. Kalshi 노트에 JPM $450 Tesla 목표주가가 언급됐다.',
  cards:[{icon:'🤖',big:'FSD V15',mid:'성능 step-change',sub:'JPMorgan 평가'},{icon:'💵',big:'$450',mid:'JPM 목표가',sub:'Kalshi 노트'},{icon:'📈',big:'TSLA',mid:'자율주행 재평가',sub:'소프트웨어 축'}],
  quote:'"JPMorgan은 Tesla FSD V15를 성능의 step-change로 본다. Kalshi 노트에 JPM $450 목표주가가 함께 언급됐다."',
  noteHead:'왜 중요한가',noteSub:'FSD 소프트웨어 성능 도약이 애널리스트 목표주가와 동시에 부각됐다. Robotaxi·Cybercab 상용 프레임의 밸류에이션 논거를 강화한다.',footer:'TSLA · JPM FSD V15 · $450',brand:BK},
 en:{title:'JPMorgan: Tesla FSD V15 Is a Step-Change in Performance · Kalshi Notes JPM $450 PT',heroIcon:'🤖',heroBig:'$450 PT',heroSub:'JPMorgan called Tesla FSD V15 a step-change in performance. Kalshi notes reference JPM $450 Tesla price target.',
  cards:[{icon:'🤖',big:'FSD V15',mid:'Performance step-change',sub:'JPMorgan view'},{icon:'💵',big:'$450',mid:'JPM price target',sub:'Kalshi note'},{icon:'📈',big:'TSLA',mid:'Autonomy re-rating',sub:'Software axis'}],
  quote:'"JPMorgan sees Tesla FSD V15 as a step-change in performance. Kalshi notes also reference a JPM $450 Tesla price target."',
  noteHead:'Why this matters',noteSub:'Software performance leap lands alongside analyst PT. Strengthens valuation case for Robotaxi/Cybercab commercialization.',footer:'TSLA · JPM FSD V15 · $450',brand:BE}},

// 2. Solar Roof discontinued
{file:'tsla-solar-roof-discontinued',symbol:'TSLA',
 ko:{title:'Tesla Solar Roof 타일 단종·경제성 부족 (First Squawk)',heroIcon:'☀️',heroBig:'단종',heroSub:'Tesla가 Solar Roof 타일 제품을 단종했다. First Squawk에 따르면 경제적으로 타당하지 않다는 판단이다.',
  cards:[{icon:'☀️',big:'Solar Roof',mid:'타일 제품 단종',sub:'First Squawk'},{icon:'📉',big:'경제성',mid:'viable 아님',sub:'원가·마진 한계'},{icon:'🔋',big:'에너지 축',mid:'Megapack 집중',sub:'포트폴리오 재편'}],
  quote:'"Tesla가 Solar Roof 타일을 단종했다. First Squawk: 경제적으로 타당하지 않다."',
  noteHead:'왜 중요한가',noteSub:'에너지 사업이 주택 태양광 타일에서 대용량 저장·유틸리티로 무게중심을 옮기는 신호다. Megapack 등 스케일 제품 우선 배치와 정합한다.',footer:'TSLA · Solar Roof 단종',brand:BK},
 en:{title:'Tesla Discontinues Solar Roof Tiles · Not Economically Viable (First Squawk)',heroIcon:'☀️',heroBig:'ENDED',heroSub:'Tesla discontinued Solar Roof tiles. Per First Squawk, the product was not economically viable.',
  cards:[{icon:'☀️',big:'Solar Roof',mid:'Tiles discontinued',sub:'First Squawk'},{icon:'📉',big:'Economics',mid:'Not viable',sub:'Cost/margin limit'},{icon:'🔋',big:'Energy axis',mid:'Megapack focus',sub:'Portfolio shift'}],
  quote:'"Tesla discontinued Solar Roof tiles. First Squawk: not economically viable."',
  noteHead:'Why this matters',noteSub:'Signals energy business weight shifting from residential solar tiles toward scaled storage/utility products like Megapack.',footer:'TSLA · Solar Roof Discontinued',brand:BE}},

// 3. Optimus Giga Berlin Gen2
{file:'tsla-optimus-giga-berlin-gen2',symbol:'TSLA',
 ko:{title:'미확인·Optimus Gen2가 Giga Berlin 테스트에서 가동 중 (8/21)·4680 셀 물류·FSD HW E2E',heroIcon:'🦾',heroBig:'Berlin Gen2',heroSub:'미확인 보도: Optimus Gen2가 2026.08.21 기준 Giga Berlin 테스트에서 이미 가동 중. 배터리 셀 생산·내부 물류·4680 분류·검사·적재·FSD 하드웨어 end-to-end·제한 파일럿 (Alex @alex_avoigt).',
  cards:[{icon:'🦾',big:'Gen2',mid:'Giga Berlin 테스트',sub:'미확인·8/21 기준'},{icon:'🔋',big:'4680',mid:'분류·검사·적재',sub:'셀 물류 파일럿'},{icon:'🧠',big:'FSD HW',mid:'end-to-end',sub:'제한 파일럿'}],
  quote:'"미확인: Optimus Gen2가 Giga Berlin 테스트에서 가동. 4680 셀 물류·FSD 하드웨어 end-to-end·제한 파일럿."',
  noteHead:'왜 중요한가',noteSub:'공장 내부 물류·셀 핸들링이 Optimus 실 배치의 첫 현장이다. 확인되면 휴머노이드 상용 일정의 구체 데이터포인트가 된다. 미확인이므로 교차검증 필요.',footer:'TSLA · Optimus Berlin Gen2',brand:BK},
 en:{title:'Unconfirmed: Optimus Gen2 Already Operating in Test at Giga Berlin as of Aug 21',heroIcon:'🦾',heroBig:'Berlin Gen2',heroSub:'Unconfirmed: Optimus Gen2 already operating in test at Giga Berlin as of Aug 21, 2026 — battery cell production & internal logistics; sorting/inspection/loading for 4680 cells; FSD hardware end-to-end; limited pilot (Alex @alex_avoigt).',
  cards:[{icon:'🦾',big:'Gen2',mid:'Giga Berlin test',sub:'Unconfirmed · Aug 21'},{icon:'🔋',big:'4680',mid:'Sort/inspect/load',sub:'Cell logistics pilot'},{icon:'🧠',big:'FSD HW',mid:'End-to-end',sub:'Limited pilot'}],
  quote:'"Unconfirmed: Optimus Gen2 operating in Giga Berlin test — 4680 cell logistics, FSD hardware end-to-end, limited pilot."',
  noteHead:'Why this matters',noteSub:'Factory logistics/cell handling is the first real Optimus deployment theater. If confirmed, a concrete humanoid commercialization datapoint — needs cross-check.',footer:'TSLA · Optimus Berlin Gen2',brand:BE}},

// 4. Nevada AV permit Vegas Robotaxi
{file:'tsla-nevada-av-permit-vegas-robotaxi',symbol:'TSLA',
 ko:{title:'Tesla 네바다 풀 Autonomous Vehicle Network Company 허가 취득·라스베이거스 유료 공개 Robotaxi 길 열려',heroIcon:'🚕',heroBig:'Nevada AV',heroSub:'Tesla가 네바다에서 풀 Autonomous Vehicle Network Company 허가를 받았다. 라스베이거스 유료 공개 Robotaxi의 길이 열렸다 (Evan / Sawyer Merritt).',
  cards:[{icon:'✅',big:'풀 허가',mid:'AV Network Company',sub:'네바다 주'},{icon:'🎰',big:'Vegas',mid:'유료 공개 Robotaxi',sub:'상용 경로 개방'},{icon:'🚕',big:'Robotaxi',mid:'네트워크 확장',sub:'주 단위 승인'}],
  quote:'"Tesla가 네바다 풀 AV Network Company 허가를 취득. 라스베이거스 유료 공개 Robotaxi의 길이 열렸다."',
  noteHead:'왜 중요한가',noteSub:'주 단위 네트워크 허가는 도시별 파일럿을 넘어 유료 상용 서비스의 규제 관문이다. Vegas는 Austin·Florida 확장에 이은 서부 상용 축이 된다.',footer:'TSLA · Nevada AV · Vegas Robotaxi',brand:BK},
 en:{title:'Tesla Receives Full Autonomous Vehicle Network Company Permit in Nevada · Clears Paid Public Robotaxi in Las Vegas',heroIcon:'🚕',heroBig:'Nevada AV',heroSub:'Tesla received approval for a full Autonomous Vehicle Network Company permit in Nevada — clearing the way for paid public Robotaxi in Las Vegas (Evan / Sawyer Merritt).',
  cards:[{icon:'✅',big:'Full permit',mid:'AV Network Company',sub:'Nevada state'},{icon:'🎰',big:'Vegas',mid:'Paid public Robotaxi',sub:'Commercial path open'},{icon:'🚕',big:'Robotaxi',mid:'Network expansion',sub:'State-level approval'}],
  quote:'"Tesla received a full AV Network Company permit in Nevada — clearing paid public Robotaxi in Las Vegas."',
  noteHead:'Why this matters',noteSub:'State network permits are the regulatory gate beyond city pilots into paid commercial service. Vegas becomes a western commercial axis after Austin/Florida.',footer:'TSLA · Nevada AV · Vegas Robotaxi',brand:BE}},

// 5. Austin Cybercab imminent
{file:'tsla-austin-cybercab-imminent',symbol:'TSLA',
 ko:{title:'Tesla 네바다 교통당국 회의에서 Austin 첫 공개 Cybercab 라이드 임박 계획 언급',heroIcon:'🚕',heroBig:'Austin 임박',heroSub:'Tesla가 네바다 교통당국(Transportation Authority) 회의에서 Austin에서 첫 공개 Cybercab 라이드를 임박해 시작할 계획이라고 밝혔다 (Sawyer Merritt).',
  cards:[{icon:'🚕',big:'Cybercab',mid:'첫 공개 라이드',sub:'Austin'},{icon:'📅',big:'임박',mid:'imminent launch',sub:'NTA 회의 발언'},{icon:'🗺️',big:'Vegas+Austin',mid:'이중 상용 축',sub:'규제·런치 병행'}],
  quote:'"Tesla가 네바다 교통당국 회의에서 Austin 첫 공개 Cybercab 라이드가 임박하다고 밝혔다."',
  noteHead:'왜 중요한가',noteSub:'Cybercab 전용 차량의 공개 라이드는 Model Y 개조 Robotaxi와 다른 유닛 이코노믹스 검증이다. Nevada 허가와 같은 날 축에서 상용 타임라인이 압축된다.',footer:'TSLA · Austin Cybercab 임박',brand:BK},
 en:{title:'Tesla Says at Nevada Transportation Authority Meeting It Plans First Public Cybercab Rides in Austin Imminently',heroIcon:'🚕',heroBig:'Austin Near',heroSub:'Tesla said at a Nevada Transportation Authority meeting it plans to launch first public Cybercab rides in Austin imminently (Sawyer Merritt).',
  cards:[{icon:'🚕',big:'Cybercab',mid:'First public rides',sub:'Austin'},{icon:'📅',big:'Imminent',mid:'Launch near',sub:'NTA meeting remark'},{icon:'🗺️',big:'Vegas+Austin',mid:'Dual commercial axis',sub:'Permit + launch'}],
  quote:'"Tesla said at Nevada Transportation Authority meeting that first public Cybercab rides in Austin are imminent."',
  noteHead:'Why this matters',noteSub:'Dedicated Cybercab public rides validate unit economics distinct from Model Y-based Robotaxi. Same-day Nevada permit compresses commercial timeline.',footer:'TSLA · Austin Cybercab Imminent',brand:BE}},

// 6. Starship FLT-14 Sep 15
{file:'spcx-starship-flt14-sep15',symbol:'SPCX',
 ko:{title:'SpaceX Starship Flight 14 · NET 9월 15일 (CADENA/COMPASS Space Operations)',heroIcon:'🚀',heroBig:'NET 9/15',heroSub:'CADENA/COMPASS Space Operations 프레젠테이션 기준 Starship FLT-14는 NET 2026년 9월 15일이다.',
  cards:[{icon:'🚀',big:'FLT-14',mid:'Starship 비행',sub:'다음 시험'},{icon:'📅',big:'NET 9/15',mid:'발사 목표',sub:'No Earlier Than'},{icon:'🛰️',big:'COMPASS',mid:'Space Ops 발표',sub:'스케줄 공개'}],
  quote:'"Starship Flight 14는 NET 9월 15일. CADENA/COMPASS Space Operations 프레젠테이션 기준."',
  noteHead:'왜 중요한가',noteSub:'Starship 재사용·궤도 대량 수송 로드맵의 다음 마일스톤이다. 발사 성공 여부가 Starlink 배치·화성 일정 신뢰도에 직결된다.',footer:'SPCX · Starship FLT-14 · 9/15',brand:BK},
 en:{title:'SpaceX Starship Flight 14 · NET September 15 (CADENA/COMPASS Space Operations)',heroIcon:'🚀',heroBig:'NET 9/15',heroSub:'Per CADENA/COMPASS Space Operations presentation, Starship FLT-14 is NET September 15, 2026.',
  cards:[{icon:'🚀',big:'FLT-14',mid:'Starship flight',sub:'Next test'},{icon:'📅',big:'NET 9/15',mid:'Launch target',sub:'No Earlier Than'},{icon:'🛰️',big:'COMPASS',mid:'Space Ops briefing',sub:'Schedule disclosed'}],
  quote:'"Starship Flight 14 is NET September 15 — per CADENA/COMPASS Space Operations presentation."',
  noteHead:'Why this matters',noteSub:'Next milestone on Starship reuse and mass-to-orbit roadmap. Launch outcome feeds Starlink deployment and Mars timeline credibility.',footer:'SPCX · Starship FLT-14 · 9/15',brand:BE}},

// 7. Revenue growth +2090% Musk exceed
{file:'spcx-revenue-growth-2090-musk-exceed',symbol:'SPCX',
 ko:{title:'애널 평균 향후 5년 매출 성장·SpaceX +2,090%·Musk "SpaceX·Tesla 모두 추정치 초과"',heroIcon:'📈',heroBig:'+2,090%',heroSub:'애널리스트 평균 향후 5년 예상 매출 성장: SpaceX +2,090%·NVDA +288%·Samsung +244%·GOOGL +140%·MSFT +136%·META +133%·TSLA +119%·AMZN +81%·AAPL +54%. Musk: SpaceX와 Tesla 모두 이 추정치를 초과할 것.',
  cards:[{icon:'🚀',big:'+2,090%',mid:'SpaceX 5년 매출',sub:'애널 평균 1위'},{icon:'💚',big:'+119%',mid:'Tesla 5년 매출',sub:'Mag7 대비 중간'},{icon:'🗣️',big:'Musk',mid:'둘 다 초과',sub:'추정치 상회 발언'}],
  quote:'"애널 평균 5년 매출 성장 SpaceX +2,090%로 압도 1위. Musk: SpaceX와 Tesla 모두 이 추정치를 초과할 것."',
  noteHead:'왜 중요한가',noteSub:'상장 후 SpaceX 성장 기대치가 다른 Mag7을 압도하는 프레임이다. Musk 초과 발언은 컨센서스 대비 상방 스탠스다.',footer:'SPCX · 5년 +2,090% · Musk exceed',brand:BK},
 en:{title:'Analyst Avg Next-5yr Revenue Growth: SpaceX +2,090% · Musk: Both SpaceX and Tesla Will Exceed',heroIcon:'📈',heroBig:'+2,090%',heroSub:'Expected revenue growth next 5 years (analyst avg): SpaceX +2,090%; NVDA +288%; Samsung +244%; GOOGL +140%; MSFT +136%; META +133%; TSLA +119%; AMZN +81%; AAPL +54%. Musk: both SpaceX and Tesla will exceed these estimates.',
  cards:[{icon:'🚀',big:'+2,090%',mid:'SpaceX 5yr revenue',sub:'Analyst avg #1'},{icon:'💚',big:'+119%',mid:'Tesla 5yr revenue',sub:'Mid vs Mag7'},{icon:'🗣️',big:'Musk',mid:'Both exceed',sub:'Above consensus'}],
  quote:'"Analyst-avg 5yr revenue growth: SpaceX +2,090% leads by far. Musk: both SpaceX and Tesla will exceed these estimates."',
  noteHead:'Why this matters',noteSub:'Post-IPO SpaceX growth expectations dwarf other Mag7 frames. Musk exceed comment is an upside stance vs consensus.',footer:'SPCX · 5yr +2,090% · Musk exceed',brand:BE}},

// 8. AST $6B spectrum
{file:'spcx-ast-6b-spectrum',symbol:'SPCX',
 ko:{title:'SpaceX·AST SpaceMobile $60억 스펙트럼 기회 추구·미국 거의 전역 direct-to-device 확장',heroIcon:'📡',heroBig:'$6B',heroSub:'SpaceX와 AST SpaceMobile이 $6,000,000,000 스펙트럼 기회를 추구한다. 미국 거의 전역으로 direct-to-device를 확장하는 프레임이다 (Polymarket Money).',
  cards:[{icon:'📡',big:'$6B',mid:'스펙트럼 기회',sub:'SpaceX · AST'},{icon:'📱',big:'D2D',mid:'direct-to-device',sub:'거의 전 미국'},{icon:'🛰️',big:'Starlink',mid:'모바일 확장',sub:'지상망 보완'}],
  quote:'"SpaceX와 AST SpaceMobile이 $60억 스펙트럼 기회를 추구. 미국 거의 전역 direct-to-device 확장."',
  noteHead:'왜 중요한가',noteSub:'위성 직접 단말 연결은 Starlink 소비자·모바일 매출의 다음 층이다. 스펙트럼 확보가 커버리지·요금제 경쟁력의 병목이다.',footer:'SPCX · AST $6B spectrum',brand:BK},
 en:{title:'SpaceX and AST SpaceMobile Pursuing $6B Spectrum Opportunity · Expand Direct-to-Device Across Nearly Entire US',heroIcon:'📡',heroBig:'$6B',heroSub:'SpaceX and AST SpaceMobile are pursuing a $6,000,000,000 spectrum opportunity — expand direct-to-device across nearly the entire US (Polymarket Money).',
  cards:[{icon:'📡',big:'$6B',mid:'Spectrum opportunity',sub:'SpaceX · AST'},{icon:'📱',big:'D2D',mid:'Direct-to-device',sub:'Nearly all US'},{icon:'🛰️',big:'Starlink',mid:'Mobile expansion',sub:'Terrestrial complement'}],
  quote:'"SpaceX and AST SpaceMobile pursuing a $6B spectrum opportunity — expand direct-to-device across nearly the entire US."',
  noteHead:'Why this matters',noteSub:'Satellite direct-to-device is the next layer of Starlink consumer/mobile revenue. Spectrum access is the bottleneck for coverage and pricing power.',footer:'SPCX · AST $6B Spectrum',brand:BE}},

// 9. Q2 2026 $7.8B revenue
{file:'spcx-q2-2026-78b-revenue',symbol:'SPCX',
 ko:{title:'SpaceX Q2 2026 매출 $7.8B (+93% YoY)·총이익 $4.3B·Starlink $4.3B 55%·AI $2.2B·순손실·시총 $100B+ 소실 맥락',heroIcon:'💰',heroBig:'$7.8B',heroSub:'Q2 2026: 매출 $7.8B (+93%)·총이익 $4.3B (+141%)·매출원가 $3.5B (+53%)·순손실. Starlink $4.3B 55% (+68%)·AI Solutions $2.2B 28% (+572%)·Launches $1.0B 13% (+29%)·Advertising $0.3B 4% (-2%). OpEx $4.5B (+62%)=R&D $2.5B (+81%)+SG&A $2.0B (+35%). 소셜 맥락: 당일 시총 $100B+ 소실.',
  cards:[{icon:'💵',big:'$7.8B',mid:'매출 +93% YoY',sub:'Q2 2026'},{icon:'🛰️',big:'$4.3B',mid:'Starlink 55%',sub:'+68% YoY'},{icon:'🧠',big:'$2.2B',mid:'AI 28% · +572%',sub:'고성장 축'}],
  quote:'"SpaceX Q2 매출 $7.8B (+93%)·총이익 $4.3B (+141%). Starlink $4.3B·AI $2.2B (+572%). 순손실·OpEx $4.5B. 당일 시총 $100B+ 소실 맥락."',
  noteHead:'왜 중요한가',noteSub:'매출·총이익 고성장과 순손실·시총 급락이 동시에 드러난 분기 스냅샷이다. AI Solutions +572%가 발사·Starlink 다음 성장 축으로 확인된다.',footer:'SPCX · Q2 $7.8B · +93%',brand:BK},
 en:{title:'SpaceX Q2 2026 Revenue $7.8B (+93% YoY) · GP $4.3B · Starlink $4.3B 55% · AI $2.2B · Net Loss · >$100B Mcap Lost Context',heroIcon:'💰',heroBig:'$7.8B',heroSub:'Q2 2026: Revenue $7.8B (+93%); Gross Profit $4.3B (+141%); Cost of Sales $3.5B (+53%); Net Income loss. Starlink $4.3B 55% (+68%); AI Solutions $2.2B 28% (+572%); Launches $1.0B 13% (+29%); Advertising $0.3B 4% (-2%). OpEx $4.5B (+62%) = R&D $2.5B (+81%) + SG&A $2.0B (+35%). Social context: market cap lost over $100B today.',
  cards:[{icon:'💵',big:'$7.8B',mid:'Revenue +93% YoY',sub:'Q2 2026'},{icon:'🛰️',big:'$4.3B',mid:'Starlink 55%',sub:'+68% YoY'},{icon:'🧠',big:'$2.2B',mid:'AI 28% · +572%',sub:'High-growth axis'}],
  quote:'"SpaceX Q2 revenue $7.8B (+93%) · GP $4.3B (+141%). Starlink $4.3B · AI $2.2B (+572%). Net loss · OpEx $4.5B. Context: >$100B mcap lost today."',
  noteHead:'Why this matters',noteSub:'High growth in revenue/GP lands alongside net loss and mcap drawdown. AI Solutions +572% confirms the next growth axis after launch/Starlink.',footer:'SPCX · Q2 $7.8B · +93%',brand:BE}},

// 10. Waymo $20K hardware 5nm 1000 TOPS
{file:'waymo-20k-hardware-5nm-1000tops',symbol:'GOOGL',
 ko:{title:'Waymo 하드웨어 원가 ~$115K → ~$20K (6세대)·커스텀 5nm 칩 1,000 TOPS',heroIcon:'💾',heroBig:'~$20K',heroSub:'Waymo 하드웨어 원가가 ~$115K에서 6세대로 ~$20K까지 내려간다. 커스텀 5nm 칩은 카메라·라이다·레이더용 1,000 TOPS (Shay Boloor).',
  cards:[{icon:'📉',big:'$115K→$20K',mid:'HW 원가 하락',sub:'6세대'},{icon:'💾',big:'5nm',mid:'커스텀 칩',sub:'1,000 TOPS'},{icon:'🚕',big:'AV 원가',mid:'스케일 경쟁',sub:'vs Tesla'}],
  quote:'"Waymo HW 원가 ~$115K → ~$20K (6세대). 커스텀 5nm 칩 1,000 TOPS — 카메라·라이다·레이더."',
  noteHead:'왜 중요한가',noteSub:'자율주행 유닛 이코노믹스의 핵심 병목이 하드웨어 원가다. $20K 수준은 로보택시 스케일 경쟁에서 Tesla 대비 Waymo의 원가 궤적을 보여준다.',footer:'GOOGL · Waymo HW ~$20K · 1,000 TOPS',brand:BK},
 en:{title:'Waymo Hardware Cost ~$115K → ~$20K With 6th-Gen · Custom 5nm Chip 1,000 TOPS',heroIcon:'💾',heroBig:'~$20K',heroSub:'Waymo hardware cost falls from ~$115K to ~$20K with 6th-gen. Custom 5nm chip delivers 1,000 TOPS for camera/lidar/radar (Shay Boloor).',
  cards:[{icon:'📉',big:'$115K→$20K',mid:'HW cost drop',sub:'6th generation'},{icon:'💾',big:'5nm',mid:'Custom chip',sub:'1,000 TOPS'},{icon:'🚕',big:'AV cost',mid:'Scale race',sub:'vs Tesla'}],
  quote:'"Waymo HW cost ~$115K → ~$20K (6th-gen). Custom 5nm chip 1,000 TOPS for camera/lidar/radar."',
  noteHead:'Why this matters',noteSub:'Hardware cost is the core AV unit-economics bottleneck. ~$20K shows Waymo cost trajectory in the robotaxi scale race vs Tesla.',footer:'GOOGL · Waymo HW ~$20K · 1,000 TOPS',brand:BE}},

// 11. META Mag7 worst 52% 5yr
{file:'meta-mag7-worst-52pct-5yr',symbol:'META',
 ko:{title:'META 5년 수익률 52%·Mag7 최하·S&P500 73% 대비 20%p 저조·성장은 NVDA 제외 최상위',heroIcon:'📊',heroBig:'52%',heroSub:'5년 수익률: META 52%(Mag7 최하)·MSFT 58%·TSLA 59%·AMZN 61%·S&P500 73%·AAPL 108%·GOOGL 146%·NVDA 936%. SPX 대비 20%p 저조. 성장 속도는 NVDA 제외 전 Mag7 대비 빠르다.',
  cards:[{icon:'📉',big:'52%',mid:'5년 수익률',sub:'Mag7 최하'},{icon:'📊',big:'-20%p',mid:'vs S&P500 73%',sub:'상대 저조'},{icon:'📈',big:'성장',mid:'NVDA 제외 최고',sub:'펀더 vs 주가'}],
  quote:'"META 5년 +52%로 Mag7 최하·SPX 73% 대비 20%p 저조. 성장은 NVDA 제외 전 Mag7 중 가장 빠르다."',
  noteHead:'왜 중요한가',noteSub:'펀더멘털 성장과 주가 성과의 괴리다. AI CAPEX·광고 회복이 주가에 아직 충분히 반영되지 않았다는 재평가 논쟁의 출발점이다.',footer:'META · Mag7 최하 52% · vs SPX',brand:BK},
 en:{title:'META 5yr Return 52% — Worst Mag7 · Underperforms S&P500 73% by 20pp · Growing Faster Than All Except NVDA',heroIcon:'📊',heroBig:'52%',heroSub:'5yr returns: META 52% (worst Mag7); MSFT 58%; TSLA 59%; AMZN 61%; S&P500 73%; AAPL 108%; GOOGL 146%; NVDA 936%. Underperforming SPX by 20pp. Growing faster than all except NVDA.',
  cards:[{icon:'📉',big:'52%',mid:'5yr return',sub:'Worst Mag7'},{icon:'📊',big:'-20pp',mid:'vs S&P500 73%',sub:'Relative lag'},{icon:'📈',big:'Growth',mid:'Fastest ex-NVDA',sub:'Fund vs price'}],
  quote:'"META +52% over 5yrs — worst Mag7; 20pp behind SPX 73%. Growing faster than all Mag7 except NVDA."',
  noteHead:'Why this matters',noteSub:'Gap between fundamental growth and stock performance. Starting point for re-rating debate if AI CAPEX/ad recovery is underpriced.',footer:'META · Mag7 Worst 52% · vs SPX',brand:BE}},

// 12. Dalio gold 15% bonds
{file:'dalio-gold-15pct-bonds',symbol:'MACRO',
 ko:{title:'Ray Dalio — 채권 비중 축소·금 최대 15%·부채 위기 앞두고 채권 매도·금 매수',heroIcon:'🥇',heroBig:'금 15%',heroSub:'Ray Dalio가 채권을 줄이고 포트폴리오의 최대 15%까지 금으로 옮기라고 권고했다. 부채 위기가 다가온다는 프레임에서 채권 매도·금 매수다.',
  cards:[{icon:'🥇',big:'15%',mid:'금 비중 상향',sub:'Dalio 권고'},{icon:'📉',big:'채권↓',mid:'비중 축소',sub:'부채 위기 대비'},{icon:'🔄',big:'로테이션',mid:'dump bonds·buy gold',sub:'헤지 프레임'}],
  quote:'"Dalio: 채권을 줄이고 금으로 최대 15%. 부채 위기가 다가오면 dump bonds, buy gold."',
  noteHead:'왜 중요한가',noteSub:'대형 매크로 투자자의 채권→금 로테이션 신호다. 장기 수익률·달러·재정 리스크 국면에서 안전자산 수요 프레임을 강화한다.',footer:'MACRO · Dalio 금 15%',brand:BK},
 en:{title:'Ray Dalio — Reduce Bonds, Move Up to 15% Into Gold · Dump Bonds Buy Gold as Debt Crisis Looms',heroIcon:'🥇',heroBig:'Gold 15%',heroSub:'Ray Dalio advises reducing bonds and moving up to 15% of portfolio into gold. Frame: dump bonds, buy gold as a debt crisis looms.',
  cards:[{icon:'🥇',big:'15%',mid:'Gold allocation up',sub:'Dalio advice'},{icon:'📉',big:'Bonds↓',mid:'Reduce weight',sub:'Debt-crisis hedge'},{icon:'🔄',big:'Rotation',mid:'Dump bonds · buy gold',sub:'Hedge frame'}],
  quote:'"Dalio: cut bonds and move up to 15% into gold. Dump bonds, buy gold as debt crisis looms."',
  noteHead:'Why this matters',noteSub:'Signal of bond→gold rotation from a major macro investor. Reinforces safe-haven demand amid long yields, dollar, and fiscal risk.',footer:'MACRO · Dalio Gold 15%',brand:BE}},

// 13. Gold 4643 · BTC 77840
{file:'gold-4643-btc-77840',symbol:'MACRO',
 ko:{title:'Gold COMEX Dec\'26 4,643.70 (+72.30·+1.58%)·Bitcoin 77,840.65 (+5,207.63·+7.17%) — El-Erian',heroIcon:'🥇',heroBig:'4,643',heroSub:'Gold COMEX December 2026 계약 4,643.70 (+72.30, +1.58%). Bitcoin 77,840.65 (+5,207.63, +7.17%). El-Erian 맥락의 동시 랠리.',
  cards:[{icon:'🥇',big:'4,643.70',mid:'Gold Dec\'26',sub:'+72.30 · +1.58%'},{icon:'🪙',big:'77,840',mid:'Bitcoin',sub:'+5,207 · +7.17%'},{icon:'📈',big:'동시 랠리',mid:'금·BTC',sub:'El-Erian'}],
  quote:'"Gold Dec\'26 4,643.70 (+1.58%)·Bitcoin 77,840.65 (+7.17%). El-Erian 맥락의 안전자산·크립토 동시 강세."',
  noteHead:'왜 중요한가',noteSub:'금과 비트코인이 같은 세션에 동반 상승하면 달러·실질금리·리스크 헤지 수요가 동시에 작동 중일 수 있다. Dalio 금 15% 프레임과 정합.',footer:'MACRO · Gold 4,643 · BTC 77,840',brand:BK},
 en:{title:'Gold COMEX Dec\'26 4,643.70 (+72.30, +1.58%) · Bitcoin 77,840.65 (+5,207.63, +7.17%) — El-Erian',heroIcon:'🥇',heroBig:'4,643',heroSub:'Gold COMEX December 2026 at 4,643.70 (+72.30, +1.58%). Bitcoin 77,840.65 (+5,207.63, +7.17%). Concurrent rally in El-Erian context.',
  cards:[{icon:'🥇',big:'4,643.70',mid:'Gold Dec\'26',sub:'+72.30 · +1.58%'},{icon:'🪙',big:'77,840',mid:'Bitcoin',sub:'+5,207 · +7.17%'},{icon:'📈',big:'Joint rally',mid:'Gold · BTC',sub:'El-Erian'}],
  quote:'"Gold Dec\'26 4,643.70 (+1.58%) · Bitcoin 77,840.65 (+7.17%). Concurrent safe-haven/crypto strength in El-Erian context."',
  noteHead:'Why this matters',noteSub:'Same-session gold+BTC strength can signal concurrent dollar/real-rate/risk-hedge demand. Aligns with Dalio gold-15% frame.',footer:'MACRO · Gold 4,643 · BTC 77,840',brand:BE}},

// 14. US 30Y 5.282% erase buyback
{file:'us-30y-yield-5282-erase-buyback',symbol:'MACRO',
 ko:{title:'미국 30Y 수익률 5.282%·재무부 환매 급락 완전 소멸·발표 1시간 내 5.18%였던 수준이 48시간 만에 회복',heroIcon:'📉',heroBig:'5.282%',heroSub:'미국 30년 국채 수익률이 재무부 환매 발표 급락을 완전히 지웠다. 발표 1시간 내 5.18%까지 내려갔으나 48시간 만에 5.282%로 회복. Bessent: 환매가 $4B 초과 가능. 수익률: 10Y 4.727 (+0.029)·5Y 4.419·30Y 5.265·2Y 4.232·20Y 5.251.',
  cards:[{icon:'📈',big:'5.282%',mid:'30Y 회복',sub:'환매 급락 소멸'},{icon:'⏱️',big:'48h',mid:'5.18%→회복',sub:'발표 후 반등'},{icon:'🏛️',big:'>$4B',mid:'Bessent 환매',sub:'상한 초과 가능'}],
  quote:'"30Y가 환매 급락을 완전 소멸. 1시간 내 5.18% → 48시간 만에 5.282% 회복. Bessent: 환매 $4B 초과 가능."',
  noteHead:'왜 중요한가',noteSub:'재무부 개입의 시장 효과가 일시적이었음을 보여준다. 장기 금리 재상승은 밸류에이션·모기지·AI CAPEX 할인율에 재차 압력을 가한다.',footer:'MACRO · 30Y 5.282% · buyback erased',brand:BK},
 en:{title:'US 30Y Fully Erased Treasury Buyback Crash — Back at 5.282% · Was 5.18% Within Hour · Recovered in 48h',heroIcon:'📉',heroBig:'5.282%',heroSub:'US 30Y fully erased the Treasury buyback crash — back at 5.282% (was 5.18% within an hour of announcement, recovered in 48h). Bessent: buybacks could exceed $4B. Yields: 10Y 4.727 +0.029; 5Y 4.419; 30Y 5.265; 2Y 4.232; 20Y 5.251.',
  cards:[{icon:'📈',big:'5.282%',mid:'30Y recovered',sub:'Buyback crash erased'},{icon:'⏱️',big:'48h',mid:'5.18%→recover',sub:'Post-announcement'},{icon:'🏛️',big:'>$4B',mid:'Bessent buybacks',sub:'Could exceed cap'}],
  quote:'"30Y fully erased the buyback crash. 5.18% within an hour → 5.282% recovered in 48h. Bessent: buybacks could exceed $4B."',
  noteHead:'Why this matters',noteSub:'Shows Treasury intervention market effect was temporary. Long-rate rebound re-pressures valuations, mortgages, and AI CAPEX discount rates.',footer:'MACRO · 30Y 5.282% · Buyback Erased',brand:BE}},
];

let n=0;
fs.writeFileSync(path.join(OUT,`summary-${DATETAG}.svg`), summarySvg('ko'));
fs.writeFileSync(path.join(OUT,`summary-${DATETAG}-en.svg`), summarySvg('en'));
n+=2;

for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-${DATETAG}.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-${DATETAG}-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics + summary × KO/EN)`);
