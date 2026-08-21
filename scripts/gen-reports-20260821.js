// 2026-08-21 리포트 SVG 생성기 · 14 topics · 폰트 고정 · 폭 초과 시만 wrap
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'charts');
const DATE = '2026.08.21';

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

const T=[
// 1. Tesla + Harmony Energy 15 Megapack UK 계약
{file:'tsla-harmony-energy-15-megapack-uk-battery-deal',symbol:'TSLA',
 ko:{title:'Tesla가 영국 Harmony Energy와 15개 Megapack 배터리 시스템 계약·재생 에너지 유연성 지원',heroIcon:'🔋',heroBig:'15개',heroSub:'Tesla가 영국의 Harmony Energy에 15개 Megapack 배터리 저장 시스템을 공급하는 계약을 확보했다. 이 시스템은 재생 에너지 유연성을 지원하고 낮에 저렴한 전기를 저장했다가 필요할 때 다시 방출하는 방식으로 소비자·기업이 에너지를 효율적으로 사용할 수 있게 한다.',
  cards:[{icon:'🔋',big:'15개',mid:'Megapack 배터리 시스템 계약',sub:'Harmony Energy 대상'},{icon:'🇬🇧',big:'영국',mid:'재생 에너지 인프라 강화',sub:'Tesla·Harmony 파트너십'},{icon:'⚡',big:'저·방전 사이클',mid:'낮 저장·필요 시 방출',sub:'소비자·기업 효율화'}],
  quote:'"Tesla가 영국 Harmony Energy와 15개 Megapack 배터리 저장 시스템 계약을 확보했다. 재생 에너지 유연성을 지원하고 낮에 저렴한 전기를 저장했다가 필요할 때 방출하는 방식으로 사용자가 에너지를 효율적으로 소비할 수 있게 한다."',
  noteHead:'왜 중요한가',noteSub:'Tesla 에너지 사업의 유럽 확장 실체다. 8/17 호주 PLUS·Grid Storage 2GW Megapack 계약 이후 국제 대량 배터리 저장 계약이 지속되는 흐름이다.',footer:'TSLA · Harmony Energy 15 Megapack',brand:BK},
 en:{title:'Tesla Signs 15 Megapack Battery Deal With UK Harmony Energy · Renewable Energy Flexibility Support',heroIcon:'🔋',heroBig:'15 UNITS',heroSub:'Tesla secured a contract to supply 15 Megapack battery storage systems to Harmony Energy in the UK. The systems support renewable energy flexibility by storing cheap electricity during the day and releasing it when needed, allowing consumers and businesses to use energy efficiently.',
  cards:[{icon:'🔋',big:'15 units',mid:'Megapack battery contract',sub:'Harmony Energy target'},{icon:'🇬🇧',big:'UK',mid:'Renewable energy infra',sub:'Tesla-Harmony partnership'},{icon:'⚡',big:'Store & release',mid:'Day store · demand release',sub:'Consumer/business efficiency'}],
  quote:'"Tesla secured a 15 Megapack battery storage system contract with Harmony Energy in the UK. The systems support renewable energy flexibility, storing cheap electricity during the day and releasing it when needed for efficient energy use."',
  noteHead:'Why this matters',noteSub:'Real European expansion of Tesla energy business. Following 8/17 Australia PLUS/Grid Storage 2GW Megapack deal, international mass battery storage contracts continue.',footer:'TSLA · Harmony Energy 15 Megapack',brand:BE}},

// 2. Australian Space Agency assists Starship recovery
{file:'australia-space-agency-starship-recovery-assist',symbol:'SPCX',
 ko:{title:'호주 우주국이 SpaceX Starship 회수 시도 지원·크리스마스 섬 방문·물체 검사',heroIcon:'🇦🇺',heroBig:'호주 지원',heroSub:'호주 우주국이 SpaceX Starship 회수 시도를 지원했다. 크리스마스 섬에서 국제 조사관들이 파도에 밀려온 물체를 검사할 예정이며, 이번 지원은 SpaceX Flight 13 이후 진행됐다.',
  cards:[{icon:'🇦🇺',big:'호주 우주국',mid:'Starship 회수 지원',sub:'국가급 파트너십'},{icon:'🏝️',big:'크리스마스 섬',mid:'국제 조사관 방문',sub:'물체 검사 진행'},{icon:'📅',big:'Flight 13 이후',mid:'회수 노력 지속',sub:'SpaceX 국제 협력'}],
  quote:'"호주 우주국이 SpaceX Starship 회수 시도를 지원한다. 크리스마스 섬에서 국제 조사관들이 파도에 밀려온 물체를 검사할 예정이며, 이번 지원은 SpaceX Flight 13 이후 진행됐다."',
  noteHead:'왜 중요한가',noteSub:'국가 우주국이 SpaceX 재사용 시스템 회수를 지원하는 국제 협력 사례다. 8/19 Falcon 9 24일 8발사 프레임과 결합해 재사용·회수 기술의 실 진전을 뜻한다.',footer:'SPCX · 호주 국제 협력',brand:BK},
 en:{title:'Australian Space Agency Assists SpaceX Starship Recovery · Christmas Island Inspection',heroIcon:'🇦🇺',heroBig:'AUS SUPPORT',heroSub:'Australian Space Agency is assisting SpaceX Starship recovery attempts. International inspectors will examine objects washed ashore at Christmas Island. This support follows SpaceX Flight 13.',
  cards:[{icon:'🇦🇺',big:'AUS Space Agency',mid:'Starship recovery support',sub:'National partnership'},{icon:'🏝️',big:'Christmas Island',mid:'International inspector visit',sub:'Object examination'},{icon:'📅',big:'Post Flight 13',mid:'Recovery effort continues',sub:'SPCX international coop'}],
  quote:'"Australian Space Agency is assisting SpaceX Starship recovery attempts. International inspectors will examine objects washed ashore at Christmas Island. This support follows SpaceX Flight 13."',
  noteHead:'Why this matters',noteSub:'International cooperation case where a national space agency supports SpaceX reusability system recovery. Combined with 8/19 Falcon 9 8 launches in 24 days frame, signals real progress in reusability/recovery tech.',footer:'SPCX · AUS International Coop',brand:BE}},

// 3. Treasury Q4 record bond buybacks
{file:'treasury-q4-record-bond-buybacks-17b-added-jpm',symbol:'MACRO',
 ko:{title:'미국 재무부 Q4 국채 환매 사상 최대 규모로 확대·170억 달러 추가 buyback·JPM 지적 노트',heroIcon:'🏛️',heroBig:'+170억',heroSub:'미국 재무부가 4분기에 사상 최대 규모의 국채 환매를 실시하고 있으며, 4분기에만 170억 달러의 추가 buyback을 예상한다는 JPM의 노트다. 재무부가 시장 유동성 개선을 위해 개입 규모를 대폭 확대하는 조치이며, 이는 이자 부담 감소와 시장 안정 목적으로 진행되고 있다.',
  cards:[{icon:'🏛️',big:'+170억',mid:'Q4 추가 buyback',sub:'JPM 노트 예상'},{icon:'📊',big:'사상 최대',mid:'분기 환매 규모',sub:'유동성 개선 목적'},{icon:'💧',big:'시장 안정',mid:'재무부 개입 확대',sub:'이자 부담 감소'}],
  quote:'"미국 재무부가 4분기에 사상 최대 규모의 국채 환매를 실시할 것으로 예상된다. JPM 노트에 따르면 4분기에만 170억 달러의 추가 buyback이 예상되며, 재무부는 유동성 개선과 이자 부담 감소를 위해 시장에 매수측으로 개입한다."',
  noteHead:'왜 중요한가',noteSub:'재무부 개입 규모가 정량으로 확인됐다. 8/20 국채 환매 40-50억 상한 확대·다중 십년 최고 수익률 배경 이후 실 규모가 사상 최대급이라는 사후 확인이다.',footer:'매크로 · Q4 재무부 환매 +170억',brand:BK},
 en:{title:'US Treasury Q4 Bond Buybacks at Record Levels · $17B Added Per JPM Note',heroIcon:'🏛️',heroBig:'+$17 B',heroSub:'US Treasury is conducting record-level bond buybacks in Q4, with JPM notes expecting an additional $17B in buybacks in Q4 alone. Treasury is expanding intervention scale to improve market liquidity, aimed at reducing interest burden and market stabilization.',
  cards:[{icon:'🏛️',big:'+$17 B',mid:'Q4 additional buyback',sub:'Per JPM note'},{icon:'📊',big:'Record',mid:'Quarterly buyback scale',sub:'Liquidity improvement'},{icon:'💧',big:'Market stability',mid:'Treasury intervention expanded',sub:'Interest burden reduction'}],
  quote:'"US Treasury is expected to conduct record-level bond buybacks in Q4. Per JPM note, an additional $17B in buybacks is expected in Q4 alone. Treasury is intervening as buyer to improve liquidity and reduce interest burden."',
  noteHead:'Why this matters',noteSub:'Treasury intervention scale quantified. Following 8/20 buyback cap raised to $4-5B and multi-decade high yields backdrop, this is post-confirmation that actual scale is record-level.',footer:'MACRO · Q4 Treasury Buyback +$17B',brand:BE}},

// 4. Anthropic S-1 August end filing
{file:'anthropic-s1-filing-august-end-ipo-preparation',symbol:'MACRO',
 ko:{title:'Anthropic 8월 말까지 S-1 IPO 신청 파일 준비·상장 절차 급속 진전',heroIcon:'📋',heroBig:'8월 말',heroSub:'Anthropic이 이번 달 안에 S-1 IPO 신청 파일을 제출할 준비를 하고 있다는 보도다. 8월 말이 실 신청 시점이며, 이는 8/14의 10월 상장 목표·2조 달러 밸류 프레임의 실 절차 진전이다.',
  cards:[{icon:'📋',big:'S-1 파일',mid:'IPO 신청 준비',sub:'8월 말 예상'},{icon:'📅',big:'8월 말',mid:'실 신청 시점',sub:'상장 절차 시작'},{icon:'🎯',big:'10월 상장',mid:'목표 진전 확인',sub:'2조 밸류 잠재'}],
  quote:'"Anthropic이 이번 달 안에 S-1 IPO 신청 파일을 제출할 준비를 하고 있다. 8월 말이 실 신청 시점이며 회사가 상장 절차 초기 단계에 진입하고 있다는 신호다."',
  noteHead:'왜 중요한가',noteSub:'8/14 Anthropic 10월 상장 2조 달러 프레임의 실 절차 진전이다. S-1 신청은 상장의 첫 공식 단계이며 8월 말 신청이면 10월 상장 timeline이 실현될 가능성이 있다.',footer:'Anthropic · S-1 8월 말',brand:BK},
 en:{title:'Anthropic Preparing to File S-1 by End of August · IPO Process Rapid Progress',heroIcon:'📋',heroBig:'END AUG',heroSub:'Reports indicate Anthropic is preparing to file S-1 IPO registration by end of August. End of August is the actual filing timing · this is real procedural progress on the 8/14 October IPO target / $2T valuation frame.',
  cards:[{icon:'📋',big:'S-1 filing',mid:'IPO registration prep',sub:'End August expected'},{icon:'📅',big:'End August',mid:'Actual filing timing',sub:'IPO process start'},{icon:'🎯',big:'October IPO',mid:'Target progress confirmed',sub:'$2T valuation potential'}],
  quote:'"Anthropic is preparing to file S-1 IPO registration by end of August. End of August is the actual filing timing · this signals the company entering the initial official phase of the IPO process."',
  noteHead:'Why this matters',noteSub:'Real procedural progress on 8/14 Anthropic October IPO / $2T valuation frame. S-1 filing is the first official step for listing · end-August filing means October IPO timeline is achievable.',footer:'Anthropic · S-1 End August',brand:BE}},

// 5. Waymo 자체 AI ASIC chip
{file:'waymo-custom-asic-chip-nvidia-partnership',symbol:'GOOGL',
 ko:{title:'Waymo 자체 AI ASIC chip 개발·Nvidia와 병행 자체 실리콘 전략·업계 새 hotchip 발표 예정',heroIcon:'💾',heroBig:'자체 chip',heroSub:'Waymo가 자체 AI ASIC chip 개발을 위해 자체 실리콘 파트너십을 강화한다는 관측이다. Nvidia 파트너와 병행하며, 이는 하이퍼스케일러의 자체 chip 흐름과 유사한 방향이다. 다음 주 새로운 hotchip이 발표될 예정이다.',
  cards:[{icon:'💾',big:'자체 ASIC',mid:'Waymo 커스텀 chip',sub:'AI 처리 특화'},{icon:'🤝',big:'Nvidia 병행',mid:'파트너십 유지',sub:'자체 실리콘 병행'},{icon:'📅',big:'다음 주',mid:'새 hotchip 발표',sub:'업계 이벤트'}],
  quote:'"Waymo가 자체 AI ASIC chip 개발을 진행 중이며, Nvidia와의 파트너십을 유지하면서 자체 실리콘 전략을 병행한다는 관측이다. 다음 주 새로운 hotchip이 발표될 예정이며 이는 자체 chip 트렌드의 확장을 뜻한다."',
  noteHead:'왜 중요한가',noteSub:'8/11 MSFT Maia 300 2백만 개 생산·오늘 별개 리포트의 Musk MacHarder 100K GPU 프레임과 결합해 자체 chip 흐름이 하이퍼스케일러·자율주행 회사 전체로 확산된다.',footer:'GOOGL · Waymo 자체 ASIC',brand:BK},
 en:{title:'Waymo Developing Custom AI ASIC Chip · Parallel Nvidia Partnership · New Hot Chip Announcement Next Week',heroIcon:'💾',heroBig:'CUSTOM CHIP',heroSub:'Waymo is reportedly strengthening custom silicon partnerships to develop its own AI ASIC chip. Parallel with Nvidia partnership · similar direction to hyperscaler custom chip trend. New hotchip to be announced next week.',
  cards:[{icon:'💾',big:'Custom ASIC',mid:'Waymo custom chip',sub:'AI processing specialized'},{icon:'🤝',big:'Nvidia parallel',mid:'Partnership maintained',sub:'Own silicon parallel'},{icon:'📅',big:'Next week',mid:'New hot chip announcement',sub:'Industry event'}],
  quote:'"Waymo is developing its own AI ASIC chip while maintaining Nvidia partnership · custom silicon strategy in parallel. New hot chip to be announced next week · signals expansion of custom chip trend."',
  noteHead:'Why this matters',noteSub:'Combined with 8/11 MSFT Maia 300 2M production and today Musk MacHarder 100K GPU frame, custom chip trend expanding across hyperscalers and autonomous driving companies.',footer:'GOOGL · Waymo Custom ASIC',brand:BE}},

// 6. SPCX 39M-share lockup expiration + JPM buyback 500K shares
{file:'spcx-39m-share-lockup-jpm-buyback-500k-vest-13094',symbol:'SPCX',
 ko:{title:'SPCX 두 번째 소규모 lockup 만료 완료·직원·투자자 약 39M주 매도·주가 -7% 하락 $130.94',heroIcon:'🔓',heroBig:'39M주 매도',heroSub:'SPCX가 두 번째 소규모 lockup 만료 이벤트 이후 주가가 7% 이상 하락했다. 직원과 투자자가 약 39M주를 매도해 시장에 유입시켰고 현재 SPCX 주가는 $130.94이다. 별개로 Cognition CEO가 Bloomberg의 인수 협상 보도를 부인했다.',
  cards:[{icon:'🔓',big:'만료 완료',mid:'두 번째 소규모 lockup',sub:'이벤트 종료'},{icon:'📉',big:'-7%',mid:'주가 하락',sub:'약 39M주 매도 유입'},{icon:'💵',big:'$130.94',mid:'현재 SPCX 주가',sub:'-$8.71 세션 하락'}],
  quote:'"SPCX 두 번째 소규모 lockup 만료 이벤트 이후 직원과 투자자가 약 39M주를 매도해 시장에 유입시켰다. 주가는 7% 이상 하락해 현재 $130.94이며 Cognition CEO는 Bloomberg의 인수 협상 보도를 부인했다."',
  noteHead:'왜 중요한가',noteSub:'8/8 첫 락업 unlock 이후 두 번째 lockup 이벤트가 실 완료됐다. 약 39M주 매도로 시세 -7% 하락 실 반영됐고, Cognition 인수 협상 부인이 별도 부정 요인이다.',footer:'SPCX · 39M 매도 · -7% $130.94',brand:BK},
 en:{title:'SPCX 2nd Smaller Lockup Expiration Completed · Employees/Investors Sold ~39M Shares · Stock -7% at $130.94',heroIcon:'🔓',heroBig:'-7%',heroSub:'SPCX dropped over 7% after a second smaller lockup expiration event. Employees and investors sold ~39M shares into the trading market. Current SPCX price is $130.94. Separately, Cognition CEO denied a Bloomberg report of acquisition talks.',
  cards:[{icon:'🔓',big:'Completed',mid:'2nd smaller lockup expiration',sub:'Event finished'},{icon:'📉',big:'-7%',mid:'Stock drop',sub:'~39M shares sold into market'},{icon:'💵',big:'$130.94',mid:'Current SPCX price',sub:'-$8.71 session decline'}],
  quote:'"SPCX dropped over 7% after 2nd smaller lockup expiration · employees and investors sold ~39M shares into trading market · current $130.94 · Cognition CEO denied Bloomberg acquisition talks report."',
  noteHead:'Why this matters',noteSub:'Second lockup event completed since 8/8 first unlock. Real -7% price reaction to ~39M shares sold · Cognition acquisition denial is separate negative factor.',footer:'SPCX · 39M 매도 · -7% $130.94',brand:BE}},

// 7. Musk: X stablecoins for creators
{file:'musk-x-stablecoins-creators-payment-frame',symbol:'MACRO',
 ko:{title:'Musk "X가 인플루언서·콘텐츠 크리에이터 결제용 stablecoin 인프라 될 것"',heroIcon:'💳',heroBig:'X stablecoins',heroSub:'Musk가 X 플랫폼이 인플루언서와 콘텐츠 크리에이터를 위한 stablecoin 결제 인프라가 될 것이라고 밝혔다. 이는 X를 소셜 미디어에서 결제·금융 플랫폼으로 확장하는 프레임이며, 크리에이터 경제와 stablecoin 인프라의 통합 시도다.',
  cards:[{icon:'💳',big:'stablecoins',mid:'X 결제 인프라 프레임',sub:'Musk 발언'},{icon:'👥',big:'크리에이터',mid:'주 대상 사용자',sub:'인플루언서·콘텐츠 제작자'},{icon:'🔗',big:'금융 확장',mid:'소셜 → 결제 플랫폼',sub:'X 사업 다각화'}],
  quote:'"X가 인플루언서와 콘텐츠 크리에이터를 위한 stablecoin 결제 인프라가 될 것이다. X를 소셜 미디어에서 결제·금융 플랫폼으로 확장하는 프레임이며, 크리에이터 경제와 stablecoin 인프라의 통합 시도다."',
  noteHead:'왜 중요한가',noteSub:'X의 사업 확장 프레임이 결제·stablecoin으로 명확해졌다. 8/19 SEC 24/7 블록체인·NASDAQ 24/5 도입 등 매크로 흐름과 정합하며 크립토·전통 금융 통합 방향이다.',footer:'X · stablecoin 크리에이터',brand:BK},
 en:{title:'Musk "X Will Become Stablecoin Infrastructure for Influencers and Content Creators"',heroIcon:'💳',heroBig:'X STABLECOINS',heroSub:'Musk stated that X platform will become stablecoin payment infrastructure for influencers and content creators. This is the frame extending X from social media to payment/finance platform · attempt to integrate creator economy with stablecoin infrastructure.',
  cards:[{icon:'💳',big:'Stablecoins',mid:'X payment infra frame',sub:'Musk statement'},{icon:'👥',big:'Creators',mid:'Main target users',sub:'Influencers/content creators'},{icon:'🔗',big:'Finance expansion',mid:'Social → payment platform',sub:'X business diversification'}],
  quote:'"X will become stablecoin payment infrastructure for influencers and content creators · extending X from social media to payment/finance platform · attempt to integrate creator economy with stablecoin infrastructure."',
  noteHead:'Why this matters',noteSub:'X business expansion frame becomes clear on payment/stablecoins. Aligns with macro flow of 8/19 SEC 24/7 blockchain and NASDAQ 24/5 introduction · direction of crypto/traditional finance integration.',footer:'X · Stablecoin Creators',brand:BE}},

// 8. US 10Y bond yield 5.22%
{file:'us-10y-yield-522pct-bond-yields-drop-treasury',symbol:'MACRO',
 ko:{title:'미국 10년 국채 수익률 5.22%로 큰 폭 하락·재무부 환매 확대 이후 시장 반응',heroIcon:'📉',heroBig:'5.22%',heroSub:'미국 10년 국채 수익률이 5.22%로 크게 하락했다. 재무부가 국채 환매를 대폭 확대하면서 이자 부담이 감소하고 시장이 반응한 결과다. 30년 국채 수익률도 함께 하락했다.',
  cards:[{icon:'📉',big:'5.22%',mid:'미국 10년 국채 수익률',sub:'큰 폭 하락'},{icon:'📊',big:'수익률 하락',mid:'재무부 환매 반응',sub:'이자 부담 감소'},{icon:'💰',big:'30년물 동반',mid:'장기 채권 하락',sub:'시장 안정 신호'}],
  quote:'"미국 10년 국채 수익률이 5.22%로 큰 폭 하락했다. 재무부가 국채 환매를 대폭 확대하면서 이자 부담이 감소했고 시장이 이에 반응했다. 30년 국채도 함께 하락했다."',
  noteHead:'왜 중요한가',noteSub:'재무부 환매 확대가 실 시장 반응으로 확인된 첫 지표다. 8/20 재무부 환매 40-50억·Q4 170억 프레임의 실 효과가 나타나는 시점이다.',footer:'매크로 · US 10Y 5.22%',brand:BK},
 en:{title:'US 10-Year Treasury Yield Drops Sharply to 5.22% · Market Reaction After Treasury Buyback Expansion',heroIcon:'📉',heroBig:'5.22%',heroSub:'US 10-year Treasury yield dropped sharply to 5.22%. Interest burden decreased and market reacted as Treasury expanded bond buybacks significantly. 30-year yield also declined together.',
  cards:[{icon:'📉',big:'5.22%',mid:'US 10Y Treasury yield',sub:'Sharp decline'},{icon:'📊',big:'Yield drop',mid:'Treasury buyback reaction',sub:'Interest burden decrease'},{icon:'💰',big:'30Y also',mid:'Long bonds decline',sub:'Market stability signal'}],
  quote:'"US 10-year Treasury yield dropped sharply to 5.22%. Interest burden decreased and market reacted as Treasury expanded bond buybacks significantly. 30-year Treasury also declined together."',
  noteHead:'Why this matters',noteSub:'First indicator confirming Treasury buyback expansion in real market reaction. Real effect of 8/20 buyback $4-5B / Q4 $17B frame emerges.',footer:'MACRO · US 10Y 5.22%',brand:BE}},

// 9. Grok Bot AI Coworker
{file:'grok-bot-ai-coworker-personal-life-changer',symbol:'SPCX',
 ko:{title:'Grok Bot이 개인 삶을 변화시키는 AI 코워커 프레임·2년간 함께한 어시스턴트',heroIcon:'🤖',heroBig:'AI 코워커',heroSub:'Grok Bot이 개인 삶을 변화시킬 수 있는 AI 코워커 형태의 어시스턴트로 자리 잡고 있다는 관측이다. Grok Bot이 대답에 답하고 이슈를 처리하고, 무엇이 필요한지 파악해 준다는 프레임이다. 지난 2년간 개발자·전문가들에게 실 어시스턴트 역할을 해왔다.',
  cards:[{icon:'🤖',big:'AI 코워커',mid:'Grok Bot 역할',sub:'개인 어시스턴트'},{icon:'📅',big:'2년간',mid:'개발자·전문가 사용',sub:'실 활용 기록'},{icon:'💡',big:'삶 변화',mid:'개인 생산성 도구',sub:'AI 상용 확장'}],
  quote:'"Grok Bot이 개인 삶을 변화시킬 수 있는 AI 코워커 어시스턴트로 자리 잡고 있다. 개발자와 전문가들에게 지난 2년간 실 어시스턴트 역할을 해왔고, 대답에 답하고 이슈를 처리하며 무엇이 필요한지 파악한다."',
  noteHead:'왜 중요한가',noteSub:'8/11 xAI Grok Bot 클라우드 자율 에이전트 팀·8/13 All-Hands Grok 4.5·5·4.7 로드맵의 실 사용 경험이 개인 코워커 프레임으로 확장된다.',footer:'xAI · Grok Bot 코워커',brand:BK},
 en:{title:'Grok Bot as AI Coworker That Can Change Personal Life · 2-Year Assistant Track Record',heroIcon:'🤖',heroBig:'AI COWORKER',heroSub:'Grok Bot is emerging as an AI coworker-form assistant that can change personal life. Grok Bot responds to questions, handles issues, and identifies what is needed. For the past 2 years it has served as a real assistant to developers and professionals.',
  cards:[{icon:'🤖',big:'AI coworker',mid:'Grok Bot role',sub:'Personal assistant'},{icon:'📅',big:'2 years',mid:'Dev/professional use',sub:'Real usage record'},{icon:'💡',big:'Life change',mid:'Personal productivity tool',sub:'AI commercial expansion'}],
  quote:'"Grok Bot is emerging as an AI coworker assistant that can change personal life. For the past 2 years it has served as a real assistant to developers and professionals · it responds, handles issues, and identifies what is needed."',
  noteHead:'Why this matters',noteSub:'Real usage experience of 8/11 xAI Grok Bot cloud autonomous agent team and 8/13 All-Hands Grok 4.5/5/4.7 roadmap expands to personal coworker frame.',footer:'xAI · Grok Bot Coworker',brand:BE}},

// 10. Cybercab launch imminent
{file:'cybercab-launch-imminent-tesla-fsd-15-ramp',symbol:'TSLA',
 ko:{title:'Cybercab 공개 launch 임박·FSD v15 대기 중·Tesla 상용 로보택시 확장 사이클',heroIcon:'🚕',heroBig:'launch 임박',heroSub:'Cybercab 공개 launch가 임박한 상황에서 FSD v15가 곧 등장할 것으로 보인다. Tesla가 상용 로보택시 확장 사이클에 들어가면서 FSD·Cybercab·Robotaxi가 동시 진전하는 국면이다.',
  cards:[{icon:'🚕',big:'launch 임박',mid:'Cybercab 공개',sub:'8/23 확정'},{icon:'🤖',big:'FSD v15',mid:'대기 중·곧 등장',sub:'unsupervised 준비'},{icon:'📊',big:'상용 확장',mid:'Robotaxi·Cybercab 통합',sub:'실 서비스 사이클'}],
  quote:'"Cybercab 공개 launch가 임박한 상황에서 FSD v15가 곧 등장할 것으로 보인다. Tesla가 상용 로보택시 확장 사이클에 들어가면서 FSD·Cybercab·Robotaxi가 동시 진전하는 국면이다."',
  noteHead:'왜 중요한가',noteSub:'8/20 Cybercab 공개 launch 8/23 확정·Cybertruck 100 보디쉘·8/17 Robotaxi 200일 무사고와 결합해 실 상용 배치가 급속하다.',footer:'TSLA · Cybercab launch·FSD v15',brand:BK},
 en:{title:'Cybercab Public Launch Imminent · FSD v15 Pending · Tesla Commercial Robotaxi Expansion Cycle',heroIcon:'🚕',heroBig:'LAUNCH NEAR',heroSub:'With Cybercab public launch imminent, FSD v15 appears to be near release. Tesla enters commercial robotaxi expansion cycle with FSD, Cybercab, and Robotaxi progressing simultaneously.',
  cards:[{icon:'🚕',big:'Launch near',mid:'Cybercab public',sub:'8/23 confirmed'},{icon:'🤖',big:'FSD v15',mid:'Pending · near release',sub:'Unsupervised ready'},{icon:'📊',big:'Commercial expansion',mid:'Robotaxi/Cybercab integration',sub:'Real service cycle'}],
  quote:'"Cybercab public launch is imminent and FSD v15 appears near release. Tesla enters commercial robotaxi expansion cycle with FSD, Cybercab, and Robotaxi progressing simultaneously."',
  noteHead:'Why this matters',noteSub:'Combined with 8/20 Cybercab public launch 8/23 confirmed / Cybertruck 100 bodyshells / 8/17 Robotaxi 200-day incident-free, real commercial deployment is rapid.',footer:'TSLA · Cybercab launch/FSD v15',brand:BE}},

// 11. Louisiana multi-billion spaceport
{file:'louisiana-multi-billion-spaceport-spacex-mobilization',symbol:'SPCX',
 ko:{title:'루이지애나 주 다중 십억 달러 규모 우주항 개발 승인·SpaceX 참여 예상',heroIcon:'🚀',heroBig:'루이지애나 우주항',heroSub:'미국 루이지애나 주가 다중 십억 달러 규모의 우주항 개발을 승인하고 있으며 SpaceX가 이 개발에 참여할 예정이다. 이는 SpaceX 발사 사업의 미국 지역 확장이며, 텍사스 Boca Chica 외 다른 주로의 확장 시도다.',
  cards:[{icon:'🚀',big:'우주항 개발',mid:'루이지애나 주 승인',sub:'다중 십억 규모'},{icon:'🇺🇸',big:'SpaceX 참여',mid:'발사 사업 확장',sub:'미국 지역 다각화'},{icon:'📍',big:'Boca Chica 외',mid:'다른 주 확장 시도',sub:'인프라 다각화'}],
  quote:'"루이지애나 주가 다중 십억 달러 규모의 우주항 개발을 승인하고 있으며 SpaceX가 이 개발에 참여할 예정이다. SpaceX 발사 사업의 미국 지역 확장이며 Boca Chica 외 다른 주로의 확장 시도다."',
  noteHead:'왜 중요한가',noteSub:'8/19 Falcon 9 24일 8발사·오늘 별개 리포트의 Australian Space Agency Starship 회수 지원과 결합해 SpaceX 인프라의 미국·국제 다각 확장이 진행된다.',footer:'SPCX · 루이지애나 우주항',brand:BK},
 en:{title:'Louisiana Approves Multi-Billion Dollar Spaceport Development · SpaceX Participation Expected',heroIcon:'🚀',heroBig:'LA SPACEPORT',heroSub:'US state of Louisiana is approving multi-billion dollar spaceport development, with SpaceX expected to participate. This is US regional expansion of SpaceX launch business, an attempt to expand beyond Texas Boca Chica to other states.',
  cards:[{icon:'🚀',big:'Spaceport dev',mid:'Louisiana state approval',sub:'Multi-billion scale'},{icon:'🇺🇸',big:'SpaceX participation',mid:'Launch business expansion',sub:'US regional diversification'},{icon:'📍',big:'Beyond Boca Chica',mid:'Other state expansion',sub:'Infra diversification'}],
  quote:'"Louisiana is approving multi-billion dollar spaceport development with SpaceX expected to participate. US regional expansion of SpaceX launch business · attempt to expand beyond Texas Boca Chica to other states."',
  noteHead:'Why this matters',noteSub:'Combined with 8/19 Falcon 9 8 launches in 24 days and today Australian Space Agency Starship recovery support, SpaceX infrastructure expands multi-axis across US and internationally.',footer:'SPCX · Louisiana Spaceport',brand:BE}},

// 12. JPM Analyst SPCX 500K + AI CAPEX 2027 $185B
{file:'jpm-ai-capex-2027-185b-cybercab-spx-analyst',symbol:'MACRO',
 ko:{title:'AI CAPEX 2027년 1,850억 달러 예상·주요 하이퍼스케일러 인프라 확장 지속',heroIcon:'💻',heroBig:'1,850억',heroSub:'애널리스트들이 2027년 AI CAPEX 규모를 1,850억 달러로 전망한다. 주요 하이퍼스케일러와 파트너 회사들이 데이터센터·GPU·전력 인프라에 지속 대량 투자하는 흐름이며, 이는 2026년 대비 대폭 증가한 수치다.',
  cards:[{icon:'💻',big:'1,850억 달러',mid:'2027년 AI CAPEX',sub:'전망 규모'},{icon:'📈',big:'대폭 증가',mid:'2026 대비',sub:'인프라 확장 지속'},{icon:'🏢',big:'하이퍼스케일러',mid:'데이터센터·GPU·전력',sub:'주요 투자 대상'}],
  quote:'"애널리스트들이 2027년 AI CAPEX 규모를 1,850억 달러로 전망한다. 주요 하이퍼스케일러와 파트너 회사들이 데이터센터·GPU·전력 인프라에 지속 대량 투자한다는 프레임이다."',
  noteHead:'왜 중요한가',noteSub:'8/12 NVDA + SPCX 2,600억 GPU 딜·8/11 NVDA 5,000억 컨소시엄·오늘 별개 리포트의 Musk MacHarder 100K GPU와 결합해 AI CAPEX 사이클이 2027년까지 확장된다.',footer:'매크로 · AI CAPEX 2027 · 1,850억',brand:BK},
 en:{title:'AI CAPEX Expected to Reach $185B in 2027 · Major Hyperscaler Infrastructure Expansion Continues',heroIcon:'💻',heroBig:'$185 B',heroSub:'Analysts forecast 2027 AI CAPEX to reach $185B. Major hyperscalers and partner companies continue heavy investment in data centers, GPUs, and power infrastructure · significantly larger than 2026.',
  cards:[{icon:'💻',big:'$185 B',mid:'2027 AI CAPEX',sub:'Forecast scale'},{icon:'📈',big:'Big increase',mid:'vs 2026',sub:'Infra expansion continues'},{icon:'🏢',big:'Hyperscalers',mid:'DC/GPU/power',sub:'Main investment targets'}],
  quote:'"Analysts forecast 2027 AI CAPEX to reach $185B. Major hyperscalers and partner companies continue heavy investment in data centers, GPUs, and power infrastructure."',
  noteHead:'Why this matters',noteSub:'Combined with 8/12 NVDA + SPCX $260B GPU deal / 8/11 NVDA $500B consortium / today Musk MacHarder 100K GPU, AI CAPEX cycle expands through 2027.',footer:'MACRO · AI CAPEX 2027 · $185B',brand:BE}},

// 13. WTI oil doubling · gas prices
{file:'wti-oil-double-order-gas-prices-385-gallon',symbol:'MACRO',
 ko:{title:'미국 휘발유 가격 갤런당 $3.85·유가 급등 압력 지속·2028년 이후 최고 수준',heroIcon:'⛽',heroBig:'$3.85/gal',heroSub:'미국 국내 평균 휘발유 가격이 갤런당 $3.85까지 오르면서 소비자 지출 부담이 증가하고 있다. 유가 급등 압력이 지속되면서 2028년 이후 최고 수준이며, 원유·정제 시장의 공급 부족이 요인으로 지적된다.',
  cards:[{icon:'⛽',big:'$3.85/gal',mid:'미국 휘발유 가격',sub:'2028 이후 최고'},{icon:'📈',big:'유가 급등',mid:'원유·정제 공급 부족',sub:'가격 압력 지속'},{icon:'💵',big:'소비자 부담',mid:'지출 증가 요인',sub:'매크로 리스크'}],
  quote:'"미국 국내 평균 휘발유 가격이 갤런당 $3.85까지 오르며 2028년 이후 최고 수준을 기록했다. 원유·정제 시장의 공급 부족이 요인이며, 소비자 지출 부담이 증가하고 있다."',
  noteHead:'왜 중요한가',noteSub:'매크로 리스크의 실 신호다. 8/17 미국 국가 부채 39.94조·오늘 별개 리포트의 재무부 환매 확대와 결합해 소비자·기업 비용 부담이 다층 확장된다.',footer:'매크로 · 휘발유 $3.85/gal',brand:BK},
 en:{title:'US Gasoline Prices Hit $3.85/Gallon · Sustained Oil Price Pressure · Highest Since 2028',heroIcon:'⛽',heroBig:'$3.85/GAL',heroSub:'US national average gasoline price rose to $3.85 per gallon, increasing consumer spending burden. Oil price pressure sustains at highest level since 2028, with crude oil and refining market supply shortage as cited factor.',
  cards:[{icon:'⛽',big:'$3.85/gal',mid:'US gasoline price',sub:'Highest since 2028'},{icon:'📈',big:'Oil surge',mid:'Crude/refining supply shortage',sub:'Price pressure sustains'},{icon:'💵',big:'Consumer burden',mid:'Spending increase factor',sub:'Macro risk'}],
  quote:'"US national average gasoline price rose to $3.85 per gallon, reaching highest level since 2028. Crude oil and refining supply shortage is cited factor · consumer spending burden increasing."',
  noteHead:'Why this matters',noteSub:'Real signal of macro risk. Combined with 8/17 US debt $39.94T and today Treasury buyback expansion, consumer and business cost burden expands multi-layer.',footer:'MACRO · Gasoline $3.85/gal',brand:BE}},

// 14. Model Y sales surge 200% MoM
{file:'tsla-model-y-sales-surge-200pct-mom-strongest',symbol:'TSLA',
 ko:{title:'Tesla Model Y 판매 전월 대비 200% 급증·최근 개월 중 최강 판매 실적',heroIcon:'📈',heroBig:'+200%',heroSub:'Tesla Model Y 판매가 전월 대비 200% 급증했다는 관측이다. 최근 개월 중 가장 강한 판매 실적이며, 이는 8/17 중국 7월 +33%·오늘 별개 리포트의 Model Y 한국 1위와 결합해 아시아·미국 시장에서 Model Y 판매가 다각 회복되고 있다는 신호다.',
  cards:[{icon:'📈',big:'+200%',mid:'Model Y 전월 대비',sub:'MoM 급증'},{icon:'📅',big:'최근 개월',mid:'가장 강한 판매 실적',sub:'회복 확인'},{icon:'🌏',big:'다각 회복',mid:'중국·한국·미국',sub:'국제 확장 정합'}],
  quote:'"Tesla Model Y 판매가 전월 대비 200% 급증했다. 최근 개월 중 가장 강한 판매 실적이며 아시아·미국 시장에서 Model Y가 다각 회복되고 있다는 신호다."',
  noteHead:'왜 중요한가',noteSub:'8/17 Tesla China 7월 +33%·8/19 Model Y 한국 1위와 결합해 Model Y 판매가 국제 다각 회복 실체다. Robotaxi·Cybercab 프레임과 별개로 자동차 사업 실 매출도 강세다.',footer:'TSLA · Model Y +200% MoM',brand:BK},
 en:{title:'Tesla Model Y Sales Surge 200% MoM · Strongest Sales Result in Recent Months',heroIcon:'📈',heroBig:'+200%',heroSub:'Tesla Model Y sales surged 200% month-over-month. Strongest sales result in recent months. Combined with 8/17 China July +33% and today Model Y Korea #1, Model Y sales are recovering multi-axis across Asia and US.',
  cards:[{icon:'📈',big:'+200%',mid:'Model Y MoM',sub:'MoM surge'},{icon:'📅',big:'Recent months',mid:'Strongest sales result',sub:'Recovery confirmed'},{icon:'🌏',big:'Multi-axis recovery',mid:'China/Korea/US',sub:'International expansion aligned'}],
  quote:'"Tesla Model Y sales surged 200% month-over-month. Strongest sales result in recent months · signals Model Y recovering multi-axis across Asia and US."',
  noteHead:'Why this matters',noteSub:'Combined with 8/17 Tesla China July +33% and 8/19 Model Y Korea #1, Model Y sales real recovery multi-axis internationally. Real auto business revenue strong despite Robotaxi/Cybercab frame separately.',footer:'TSLA · Model Y +200% MoM',brand:BE}},

// 15. Whale Wall Street: Sensor architecture Cybercab robotaxi
{file:'cybercab-sensor-architecture-tesla-robotaxi-first',symbol:'TSLA',
 ko:{title:'Cybercab 센서 아키텍처 확인·Tesla Robotaxi 대비 인건비 제거·최초 상용 로보택시 사양',heroIcon:'📡',heroBig:'센서 아키텍처',heroSub:'Cybercab의 센서 아키텍처가 관측되고 있다. Tesla가 이전 Robotaxi (Model Y 개조)에서 인건비를 제거한 첫 상용 사양이며, 자체 개발한 Cybercab이 상용 로보택시로 전환되는 국면을 뜻한다.',
  cards:[{icon:'📡',big:'센서 아키텍처',mid:'Cybercab 관측',sub:'상용 사양 확인'},{icon:'💼',big:'인건비 제거',mid:'Robotaxi 대비',sub:'완전 자율 사양'},{icon:'🎯',big:'첫 상용',mid:'전용 로보택시',sub:'Tesla 자체 개발'}],
  quote:'"Cybercab의 센서 아키텍처가 관측되고 있다. Tesla가 이전 Robotaxi (Model Y 개조)에서 인건비를 제거한 첫 상용 사양이며, 자체 개발한 Cybercab이 상용 로보택시로 전환되는 국면이다."',
  noteHead:'왜 중요한가',noteSub:'8/20 Cybercab Agentic Coding·4-5x 저렴 LLM·48V 시스템과 결합해 Cybercab의 기술 세부가 다층 확인된다. 완전 자율·인건비 제거가 상용 서비스 원가 우위의 근본이다.',footer:'TSLA · Cybercab 센서·상용 사양',brand:BK},
 en:{title:'Cybercab Sensor Architecture Confirmed · Removes Labor Cost vs Prior Robotaxi · First Commercial Robotaxi Spec',heroIcon:'📡',heroBig:'SENSOR ARCH',heroSub:'Cybercab sensor architecture is being observed. First commercial specification from Tesla that removes labor cost compared to prior Robotaxi (Model Y modified) · signals Tesla-developed Cybercab transitioning to commercial robotaxi.',
  cards:[{icon:'📡',big:'Sensor arch',mid:'Cybercab observed',sub:'Commercial spec confirmed'},{icon:'💼',big:'Labor cost removed',mid:'vs prior Robotaxi',sub:'Full autonomy spec'},{icon:'🎯',big:'First commercial',mid:'Dedicated robotaxi',sub:'Tesla in-house'}],
  quote:'"Cybercab sensor architecture is being observed. First commercial specification from Tesla that removes labor cost compared to prior Robotaxi (Model Y modified) · Tesla-developed Cybercab transitioning to commercial robotaxi."',
  noteHead:'Why this matters',noteSub:'Combined with 8/20 Cybercab Agentic Coding / 4-5x cheaper LLMs / 48V system, Cybercab technical details are confirmed multi-layer. Full autonomy and labor cost removal are foundations of commercial service cost advantage.',footer:'TSLA · Cybercab Sensor/Commercial Spec',brand:BE}},
];

let n=0;
for(const t of T){
  const koWith={...t.ko,symbol:t.symbol};
  const enWith={...t.en,symbol:t.symbol};
  fs.writeFileSync(path.join(OUT,`${t.file}-20260821.svg`),tpl(koWith));
  fs.writeFileSync(path.join(OUT,`${t.file}-20260821-en.svg`),tpl(enWith));
  n+=2;
}
console.log(`✅ ${n} SVG (${T.length} topics × KO/EN)`);
